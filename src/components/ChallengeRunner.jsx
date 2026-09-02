'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import Icon from '@/components/Icon';

// Each assertion runs on its own so a failure in test 2 does not hide the
// result of test 3, and assertEqual reports structured expected/actual values
// rather than a formatted message the UI would have to parse back apart.
const HARNESS = `
function __eq(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

self.assertEqual = function (actual, expected) {
  if (!__eq(actual, expected)) {
    var err = new Error('mismatch');
    // JSON.stringify(undefined) returns undefined, not a string, and the
    // property would vanish over postMessage — so stringify defensively.
    err.__expected = expected === undefined ? 'undefined' : JSON.stringify(expected);
    err.__actual = actual === undefined ? 'undefined' : JSON.stringify(actual);
    throw err;
  }
};

self.onmessage = function (e) {
  var logs = [];
  console.log = function () {
    logs.push(Array.prototype.slice.call(arguments).map(String).join(' '));
  };

  try {
    (0, eval)(e.data.code);
  } catch (err) {
    self.postMessage({
      setupError: String((err && err.message) || err),
      results: [],
      logs: logs,
    });
    return;
  }

  var results = [];
  for (var i = 0; i < e.data.tests.length; i++) {
    try {
      (0, eval)(e.data.tests[i]);
      results.push({ pass: true });
    } catch (err) {
      results.push({
        pass: false,
        expected: err && err.__expected,
        actual: err && err.__actual,
        error: err && err.__expected === undefined ? String((err && err.message) || err) : null,
      });
    }
  }

  self.postMessage({ results: results, logs: logs });
};
`;

// "assertEqual(add(2, 3), 5)" → { call: "add(2, 3)", expected: "5" }, so the
// brief can show what is being checked. Falls back to the raw line.
function splitAssertion(line) {
  const m = line.trim().match(/^assertEqual\((.*)\);?$/s);
  if (!m) return null;
  const inner = m[1];
  let depth = 0;
  let quote = null;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (quote) {
      if (ch === quote && inner[i - 1] !== '\\') quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;
    else if (ch === ',' && depth === 0) {
      return { call: inner.slice(0, i).trim(), expected: inner.slice(i + 1).trim() };
    }
  }
  return null;
}

export default function ChallengeRunner({ challenge, initiallyCompleted = false, position, next }) {
  const { data: session } = useSession();
  const { pick } = useLang();

  const [code, setCode] = useState(challenge.starter || '');
  const [status, setStatus] = useState('idle'); // idle | running | passed | failed
  const [results, setResults] = useState([]);
  const [logs, setLogs] = useState([]);
  const [setupError, setSetupError] = useState('');
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [gainedXp, setGainedXp] = useState(0);
  const [mobileTab, setMobileTab] = useState('code');

  const textareaRef = useRef(null);

  const testLines = useMemo(
    () => (challenge.tests || '').split('\n').map((l) => l.trim()).filter(Boolean),
    [challenge.tests]
  );

  const cases = useMemo(
    () => testLines.map((line) => ({ line, ...(splitAssertion(line) || { call: line, expected: null }) })),
    [testLines]
  );

  const passedCount = results.filter((r) => r.pass).length;
  const firstFail = results.findIndex((r) => !r.pass);

  const run = useCallback(() => {
    setStatus('running');
    setResults([]);
    setLogs([]);
    setSetupError('');

    let worker;
    try {
      const url = URL.createObjectURL(new Blob([HARNESS], { type: 'application/javascript' }));
      worker = new Worker(url);

      const timer = setTimeout(() => {
        worker.terminate();
        URL.revokeObjectURL(url);
        setStatus('failed');
        setSetupError(pick('Time out — kahin infinite loop toh nahi?', 'Timed out — possible infinite loop.'));
      }, 2000);

      worker.onmessage = async (e) => {
        clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(url);

        const { results: res = [], logs: out = [], setupError: err } = e.data;
        setLogs(out);

        if (err) {
          setSetupError(err);
          setStatus('failed');
          return;
        }

        setResults(res);
        const allPass = res.length > 0 && res.every((r) => r.pass);
        setStatus(allPass ? 'passed' : 'failed');

        if (allPass && session?.user && !completed) {
          const r = await fetch('/api/challenges/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: challenge.slug }),
          });
          if (r.ok) {
            const d = await r.json();
            setCompleted(true);
            if (d.gained) setGainedXp(d.gained);
          }
        }
      };

      worker.onerror = (err) => {
        clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(url);
        setStatus('failed');
        setSetupError(err.message);
      };

      worker.postMessage({ code, tests: testLines });
    } catch {
      setStatus('failed');
      setSetupError(pick('Is browser mein runner start nahi hua.', 'Could not start the runner in this browser.'));
    }
  }, [code, testLines, session, completed, challenge.slug, pick]);

  // Cmd/Ctrl+Enter runs, from anywhere on the page.
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        run();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [run]);

  // Tab indents instead of tabbing out of the editor.
  function onEditorKeyDown(e) {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const el = e.target;
    const { selectionStart: s, selectionEnd: end } = el;
    const next = `${code.slice(0, s)}  ${code.slice(end)}`;
    setCode(next);
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = s + 2;
    });
  }

  function reset() {
    setCode(challenge.starter || '');
    setStatus('idle');
    setResults([]);
    setLogs([]);
    setSetupError('');
  }

  const lineCount = Math.max(8, code.split('\n').length);

  return (
    <div className="min-h-[80vh] bg-slate-50 pb-16">

      {/* ══════════ Task bar ══════════ */}
      <div className="border-b border-slate-200 bg-white dark:bg-slate-900">
        <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <Link
            href="/challenges"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600"
          >
            <Icon name="arrow-left" className="h-3 w-3" />
            <span className="hidden sm:inline">{pick('Challenges', 'Challenges')}</span>
          </Link>

          <span className="hidden h-5 w-px bg-slate-200 sm:block" />

          <span className="flex flex-wrap items-center gap-2.5">
            <span className="font-bold">{challenge.title}</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                challenge.difficulty === 'easy'
                  ? 'bg-green-50 text-green-700'
                  : challenge.difficulty === 'medium'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-red-50 text-red-700'
              }`}
            >
              {challenge.difficulty}
            </span>
            <span className="text-xs text-slate-400">{challenge.xp} XP</span>
            {completed && (
              <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                <Icon name="check" className="h-2.5 w-2.5" />
                {pick('Solved', 'Solved')}
              </span>
            )}
          </span>

          <span className="ml-auto flex items-center gap-2.5">
            {position && (
              <span className="hidden font-mono text-xs text-slate-400 sm:inline">
                {position.index} / {position.total}
              </span>
            )}
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              {pick('Reset', 'Reset')}
            </button>
            <button
              type="button"
              onClick={run}
              disabled={status === 'running'}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              <Icon name="play" className="h-2.5 w-2.5" />
              {status === 'running' ? pick('Chal raha hai…', 'Running…') : pick('Tests chalao', 'Run tests')}
              <span className="ml-0.5 hidden font-mono text-[10px] opacity-70 lg:inline">⌘↵</span>
            </button>
          </span>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="flex gap-1 border-b border-slate-200 bg-white p-1.5 lg:hidden dark:bg-slate-900">
        {['brief', 'code'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setMobileTab(t)}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition ${
              mobileTab === t ? 'bg-slate-900 text-white dark:bg-slate-700' : 'text-slate-500'
            }`}
          >
            {t === 'brief' ? pick('Brief', 'Brief') : pick('Code', 'Code')}
          </button>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start lg:flex-row">

        {/* ══════════ Brief: prompt + the test cases ══════════ */}
        <aside
          className={`w-full shrink-0 border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-32 lg:w-[400px] lg:border-r dark:bg-slate-900 ${
            mobileTab === 'brief' ? '' : 'hidden lg:block'
          }`}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {pick('Kya banana hai', 'What to build')}
              </p>
              <p className="leading-relaxed text-slate-700">{challenge.prompt}</p>
            </div>

            {/* The spec, which used to be invisible */}
            <div className="flex flex-col gap-2.5">
              <p className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {pick('Test cases', 'Test cases')}
                </span>
                {results.length > 0 && (
                  <span
                    className={`ml-auto text-xs font-semibold ${
                      passedCount === cases.length ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {passedCount} / {cases.length} {pick('pass', 'passing')}
                  </span>
                )}
              </p>

              <div className="flex flex-col gap-2">
                {cases.map((c, i) => {
                  const r = results[i];
                  const state = !r ? 'idle' : r.pass ? 'pass' : 'fail';
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 rounded-xl border p-3 ${
                        state === 'pass'
                          ? 'border-green-200 bg-green-50'
                          : state === 'fail'
                            ? 'border-red-200 bg-red-50'
                            : 'border-slate-200 bg-white'
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-[10px] font-bold text-white ${
                          state === 'pass' ? 'bg-green-600' : state === 'fail' ? 'bg-red-600' : 'bg-slate-300'
                        }`}
                      >
                        {state === 'pass' ? '✓' : state === 'fail' ? '✕' : ''}
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <code className="break-words font-mono text-xs text-slate-700">{c.call}</code>
                        {state === 'fail' && r.expected !== undefined && r.expected !== null ? (
                          <span className="font-mono text-[11px] text-red-700">
                            {pick('chahiye', 'expected')} {r.expected}, {pick('mila', 'got')} {r.actual}
                          </span>
                        ) : state === 'fail' ? (
                          <span className="font-mono text-[11px] text-red-700">{r.error}</span>
                        ) : (
                          <span className="font-mono text-[11px] text-slate-400">
                            {c.expected !== null ? `→ ${c.expected}` : ''}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-500">
              <Icon name="lock" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {pick(
                'Code tumhare browser ke sandboxed worker mein chalta hai — server pe kuch nahi jaata.',
                'Your code runs in a sandboxed worker in your own browser. Nothing is sent to a server.'
              )}
            </p>
          </div>
        </aside>

        {/* ══════════ Editor + output ══════════ */}
        <main className={`w-full min-w-0 flex-1 ${mobileTab === 'code' ? '' : 'hidden lg:block'}`}>

          <div className="bg-slate-900">
            <div className="flex items-center gap-2.5 border-b border-slate-800 px-4 py-2.5">
              <span className="font-mono text-[11px] text-slate-500">solution.js</span>
              <span className="ml-auto text-[11px] text-slate-600">JavaScript</span>
            </div>

            <div className="flex">
              <div
                aria-hidden
                className="shrink-0 select-none bg-slate-950 py-4 pr-3 text-right font-mono text-[12.5px] leading-[1.9] text-slate-700"
                style={{ width: 46 }}
              >
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={onEditorKeyDown}
                spellCheck={false}
                rows={lineCount}
                className="w-full resize-y bg-slate-900 px-4 py-4 font-mono text-[12.5px] leading-[1.9] text-slate-100 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 p-4 sm:p-5">

            {status === 'passed' && (
              <div className="relative overflow-hidden rounded-2xl bg-slate-900 dark:bg-slate-950">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-45"
                  style={{
                    backgroundImage:
                      'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                  }}
                />
                <div className="relative flex flex-wrap items-center gap-5 p-6">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-green-600">
                    <Icon name="check" className="h-6 w-6 text-white" />
                  </span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <h2 className="text-xl font-bold text-white">
                      {pick(`Saare ${cases.length} tests pass`, `All ${cases.length} tests passed`)}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {gainedXp > 0
                        ? pick(`+${gainedXp} XP account mein jud gaye.`, `+${gainedXp} XP added to your account.`)
                        : completed
                          ? pick('Ye pehle hi solve ho chuka tha.', 'You had already solved this one.')
                          : pick('Login karo toh XP milega.', 'Sign in to earn XP for this.')}
                    </p>
                  </div>
                  {gainedXp > 0 && (
                    <span className="shrink-0 rounded-full bg-green-900 px-4 py-2 font-mono text-sm font-semibold text-green-300">
                      +{gainedXp} XP
                    </span>
                  )}
                </div>
              </div>
            )}

            {status === 'failed' && setupError && (
              <div className="flex gap-3.5 rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">
                <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <div className="flex flex-col gap-1.5">
                  <p className="font-bold text-red-900">{pick('Code chala hi nahi', 'Your code did not run')}</p>
                  <code className="font-mono text-sm text-red-800">{setupError}</code>
                </div>
              </div>
            )}

            {status === 'failed' && !setupError && firstFail >= 0 && (
              <div className="flex gap-3.5 rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">
                <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-red-900">
                    {pick(`Test ${firstFail + 1} fail hua`, `Test ${firstFail + 1} failed`)}
                  </p>
                  <div className="flex flex-col gap-0.5 font-mono text-sm">
                    <span className="text-red-800">{cases[firstFail]?.call}</span>
                    {results[firstFail]?.expected !== undefined && results[firstFail]?.expected !== null ? (
                      <>
                        <span className="text-green-700">
                          {pick('chahiye', 'expected')}  {results[firstFail].expected}
                        </span>
                        <span className="text-red-700">
                          {pick('mila', 'got')}       {results[firstFail].actual}
                        </span>
                      </>
                    ) : (
                      <span className="text-red-700">{results[firstFail]?.error}</span>
                    )}
                  </div>
                  {passedCount > 0 && (
                    <p className="text-sm text-red-800">
                      {pick(
                        `${passedCount} test pehle hi pass ho rahe hain — baaki pe kaam karo.`,
                        `${passedCount} already passing — keep those working.`
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Console output the runner captured and used to discard */}
            {logs.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2.5 border-b border-slate-200 bg-white px-4 py-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Console</span>
                  <span className="ml-auto font-mono text-[10.5px] text-slate-300">
                    {logs.length} {logs.length === 1 ? 'line' : 'lines'}
                  </span>
                </div>
                <div className="bg-slate-950 px-4 py-3 font-mono text-xs leading-relaxed text-slate-400">
                  {logs.map((l, i) => (
                    <div key={i}>
                      <span className="text-slate-600">› </span>
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!session?.user && (
              <p className="text-sm text-slate-500">
                <Link href="/login" className="font-semibold text-indigo-600 underline">
                  {pick('Login karo', 'Sign in')}
                </Link>{' '}
                {pick('taaki solve karne pe XP mile.', 'to earn XP for solving challenges.')}
              </p>
            )}

            {/* Somewhere to go once it passes */}
            {(status === 'passed' || completed) && (
              <div className="grid gap-3.5 sm:grid-cols-2">
                {next && (
                  <Link
                    href={`/challenges/${next.slug}`}
                    className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50">
                      <Icon name="arrow-right" className="h-4 w-4 text-indigo-600" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-xs text-slate-400">{pick('Agla challenge', 'Next challenge')}</span>
                      <span className="font-semibold">{next.title}</span>
                    </span>
                    <span className="ml-auto shrink-0 font-mono text-xs text-slate-400">{next.xp} XP</span>
                  </Link>
                )}
                <Link
                  href="/challenges"
                  className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100">
                    <Icon name="bolt" className="h-4 w-4 text-slate-600" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-xs text-slate-400">{pick('Ya wapas', 'Or back to')}</span>
                    <span className="font-semibold">{pick('Saare challenges', 'All challenges')}</span>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
