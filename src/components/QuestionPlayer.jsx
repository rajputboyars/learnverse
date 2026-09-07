'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import ConceptAnimation from './ConceptAnimation';
import Icon from '@/components/Icon';

const DIFF = {
  easy: { dot: 'bg-emerald-400', chip: 'bg-emerald-500/15 text-emerald-300' },
  medium: { dot: 'bg-amber-400', chip: 'bg-amber-500/15 text-amber-300' },
  hard: { dot: 'bg-red-400', chip: 'bg-red-500/15 text-red-300' },
};
const ORDER = ['easy', 'medium', 'hard'];
const MILESTONE_EVERY = 10;
const AUTOPLAY_MS = 9000;

const SEEN_KEY = (slug) => `learnverse_seen_${slug}`;

function loadSeen(slug) {
  try {
    return new Set(JSON.parse(localStorage.getItem(SEEN_KEY(slug)) || '[]'));
  } catch { return new Set(); }
}

export default function QuestionPlayer({ course, questions, sources = [], startId = null }) {
  const { lang, pick } = useLang();

  const startIndex = Math.max(0, questions.findIndex((q) => q.id === startId));
  const [index, setIndex] = useState(startIndex);
  const [drawer, setDrawer] = useState(true);
  const [mobileList, setMobileList] = useState(false);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [seen, setSeen] = useState(() => new Set());
  const [run, setRun] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [milestone, setMilestone] = useState(null);
  const [deep, setDeep] = useState(false);

  const cardRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => { setSeen(loadSeen(course.slug)); }, [course.slug]);

  const current = questions[index] || null;

  // Mark seen, grow the run. Both persist so the count means something across
  // a session rather than resetting on every render.
  useEffect(() => {
    if (!current) return;
    setSeen((prev) => {
      if (prev.has(current.id)) return prev;
      const next = new Set(prev).add(current.id);
      try { localStorage.setItem(SEEN_KEY(course.slug), JSON.stringify([...next])); } catch {}
      return next;
    });
  }, [current, course.slug]);

  const go = useCallback((delta) => {
    setIndex((i) => {
      const next = Math.min(questions.length - 1, Math.max(0, i + delta));
      if (next !== i) {
        setDeep(false);
        cardRef.current?.scrollTo?.({ top: 0 });
      }
      return next;
    });
    if (delta > 0) {
      setRun((r) => {
        const next = r + 1;
        if (next > 0 && next % MILESTONE_EVERY === 0) setMilestone(next);
        return next;
      });
    }
  }, [questions.length]);

  const jump = useCallback((id) => {
    const i = questions.findIndex((q) => q.id === id);
    if (i >= 0) { setIndex(i); setDeep(false); setMobileList(false); }
  }, [questions]);

  // The milestone is a beat, not a modal — it fades on its own.
  useEffect(() => {
    if (milestone === null) return;
    const t = setTimeout(() => setMilestone(null), 4000);
    return () => clearTimeout(t);
  }, [milestone]);

  // Autoplay is opt-in: reading costs attention, so advancing before someone
  // has finished reading breaks the flow rather than creating it.
  useEffect(() => {
    if (!autoplay || !current) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [autoplay, current, go]);

  useEffect(() => {
    function onKey(e) {
      const typing = ['INPUT', 'TEXTAREA'].includes(e.target?.tagName);
      if (e.key === '/' && !typing) { e.preventDefault(); setDrawer(true); searchRef.current?.focus(); return; }
      if (typing) return;
      if (e.code === 'Space' || e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
      else if (e.key.toLowerCase() === 'b') setDrawer((d) => !d);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return questions.filter((q) => {
      if (level !== 'all' && q.difficulty !== level) return false;
      if (!term) return true;
      return q.question.toLowerCase().includes(term);
    });
  }, [questions, search, level]);

  const seenCount = seen.size;
  const pct = questions.length ? Math.round((seenCount / questions.length) * 100) : 0;
  const questionSources = current?.sources?.length ? current.sources : sources;

  if (!current) return null;

  const answer = lang === 'hi' && current.hinglish ? current.hinglish : current.english;

  return (
    <div className="relative flex min-h-[calc(100vh-7rem)] bg-slate-950 text-slate-200">

      {/* faint grid, the same treatment as the other dark surfaces */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(#161d33 1px, transparent 1px), linear-gradient(90deg, #161d33 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ══════════ The slider ══════════ */}
      <aside
        className="relative z-10 hidden shrink-0 flex-col overflow-hidden border-r border-slate-800 bg-slate-900/80 transition-[width] duration-200 lg:flex"
        style={{ width: drawer ? 320 : 56 }}
      >
        {drawer ? (
          <>
            <div className="flex items-center gap-3 px-4 pb-3 pt-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-800">
                <Icon name={course.icon} brand className="h-4 w-4" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-bold text-slate-100">{course.title}</span>
                <span className="font-mono text-[10.5px] text-slate-500">
                  {questions.length} {pick('sawaal', 'questions')}
                </span>
              </span>
            </div>

            <label className="mx-4 mb-3 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-3">
              <Icon name="search" className="h-3.5 w-3.5 shrink-0 text-slate-500" />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={pick('Dhundo…', 'Search…')}
                className="h-9 w-full bg-transparent text-[13px] text-slate-200 outline-none placeholder:text-slate-600"
              />
              <span className="shrink-0 font-mono text-[10px] text-slate-600">/</span>
            </label>

            <div className="mb-3 flex gap-1.5 px-4">
              {['all', ...ORDER].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize transition ${
                    level === l ? 'bg-indigo-600 text-white' : 'border border-slate-800 text-slate-400'
                  }`}
                >
                  {l === 'all' ? pick('Sab', 'All') : l}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-2.5 pb-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-xs text-slate-600">
                  {pick('Kuch nahi mila.', 'Nothing matched.')}
                </p>
              )}
              {filtered.map((q) => {
                const on = q.id === current.id;
                const done = seen.has(q.id);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => jump(q.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition ${
                      on ? 'bg-indigo-600/20' : 'hover:bg-slate-800/60'
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                        done ? 'bg-emerald-400' : on ? 'bg-indigo-500' : 'bg-slate-800'
                      }`}
                    >
                      {done && <Icon name="check" className="h-2 w-2 text-slate-950" />}
                    </span>
                    <span
                      className={`flex-1 text-[12.5px] leading-snug ${
                        on ? 'font-semibold text-slate-100' : done ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {q.question}
                    </span>
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DIFF[q.difficulty]?.dot}`} />
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-800 px-4 py-3">
              <p className="mb-1.5 flex items-baseline">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
                  {pick('Aaj', 'Today')}
                </span>
                <span className="ml-auto font-mono text-[11px] text-slate-400">
                  {seenCount} / {questions.length}
                </span>
              </p>
              <span className="block h-1.5 overflow-hidden rounded-full bg-slate-800">
                <span className="block h-1.5 rounded-full bg-indigo-500" style={{ width: `${pct}%` }} />
              </span>
            </div>
          </>
        ) : (
          /* Collapsed: still shows where you are, so hiding costs nothing */
          <div className="flex flex-1 flex-col items-center gap-3 py-4">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-800">
              <Icon name={course.icon} brand className="h-4 w-4" />
            </span>
            <button
              type="button"
              onClick={() => { setDrawer(true); setTimeout(() => searchRef.current?.focus(), 60); }}
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-800"
            >
              <Icon name="search" className="h-3.5 w-3.5" />
            </button>
            <span className="relative mt-1 w-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
              <span className="absolute inset-x-0 top-0 rounded-full bg-indigo-500" style={{ height: `${pct}%` }} />
            </span>
            <span className="font-mono text-[9.5px] text-slate-600">{index + 1}/{questions.length}</span>
          </div>
        )}
      </aside>

      {/* the handle, on the seam */}
      <button
        type="button"
        onClick={() => setDrawer((d) => !d)}
        aria-label={drawer ? 'Hide list' : 'Show list'}
        className="fixed top-1/2 z-30 hidden w-7 -translate-y-1/2 place-items-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 shadow-lg transition-[left] duration-200 hover:text-slate-200 lg:grid"
        style={{ left: drawer ? 306 : 42, height: 52 }}
      >
        <Icon name={drawer ? 'arrow-left' : 'arrow-right'} className="h-3 w-3" />
      </button>

      {/* ══════════ The card ══════════ */}
      <main className="relative z-10 flex min-w-0 flex-1 flex-col">

        {/* momentum */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-800/70 px-4 py-3 sm:px-8">
          <button
            type="button"
            onClick={() => setMobileList(true)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-800 text-slate-400 lg:hidden"
            aria-label="Show list"
          >
            <Icon name="bars" className="h-4 w-4" />
          </button>

          <span className="flex items-center gap-2 rounded-full bg-orange-500/15 px-3 py-1.5">
            <Icon name="fire" className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-[13px] font-bold text-orange-300">
              {run} {pick('in a row', 'in a row')}
            </span>
          </span>

          <span className="hidden gap-[3px] sm:flex">
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                className={`h-1 w-5 rounded-full ${i < run % 12 || (run > 0 && run % 12 === 0) ? 'bg-orange-400' : 'bg-slate-800'}`}
              />
            ))}
          </span>

          <span className="font-mono text-[11.5px] text-slate-500">
            +{seenCount * 5} XP {pick('is session mein', 'this session')}
          </span>

          <span className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAutoplay((a) => !a)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11.5px] transition ${
                autoplay ? 'border-indigo-500 text-indigo-300' : 'border-slate-800 text-slate-500'
              }`}
            >
              <span className={`relative h-3.5 w-6 rounded-full ${autoplay ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                <span
                  className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-all ${
                    autoplay ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </span>
              Autoplay
            </button>
            <Link
              href={`/mock-interview/${course.slug}`}
              className="hidden rounded-xl border border-slate-800 px-3.5 py-2 text-[12px] font-semibold text-slate-300 hover:bg-slate-800 sm:block"
            >
              {pick('Mock', 'Mock')}
            </Link>
          </span>
        </div>

        {/* milestone beat */}
        {milestone !== null && (
          <div className="pointer-events-none absolute left-1/2 top-20 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-emerald-400/35 bg-emerald-600/15 px-5 py-2.5 backdrop-blur">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-green-600">
              <Icon name="check" className="h-3 w-3 text-white" />
            </span>
            <span className="text-[13.5px] font-semibold text-emerald-300">
              {pick(`${milestone} ho gaye — aise hi chalte raho.`, `${milestone} done — keep going.`)}
            </span>
          </div>
        )}

        {/* card stack */}
        <div className="relative flex flex-1 justify-center px-4 pt-8 sm:px-8">
          <span
            aria-hidden
            className="absolute top-2 hidden h-16 w-full max-w-[660px] rounded-3xl border border-slate-800 bg-slate-900/70 sm:block"
          />
          <div
            ref={cardRef}
            className="relative flex w-full max-w-[700px] flex-col gap-5 overflow-y-auto rounded-3xl border border-slate-700/70 bg-slate-900 p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${DIFF[current.difficulty]?.chip}`}>
                {current.difficulty}
              </span>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-semibold capitalize text-slate-400">
                {current.frequency}
              </span>
              <span className="ml-auto font-mono text-[11px] text-slate-600">
                {index + 1} / {questions.length}
              </span>
            </div>

            <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-50 sm:text-[32px]">
              {current.question}
            </h1>

            {answer && <p className="text-[17px] leading-relaxed text-slate-300">{answer}</p>}

            {current.codeExample?.code && (
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <pre className="overflow-x-auto bg-slate-950 px-4 py-3.5 font-mono text-[12.5px] leading-relaxed text-slate-300">
                  <code>{current.codeExample.code}</code>
                </pre>
                {current.codeExample.output && (
                  <div className="border-t border-slate-800 bg-slate-950/70 px-4 py-2 font-mono text-[11.5px]">
                    <span className="text-slate-600">output › </span>
                    <span className="whitespace-pre-wrap text-emerald-400">{current.codeExample.output}</span>
                  </div>
                )}
              </div>
            )}

            {/* the walkthrough stays opt-in so the card reads fast */}
            {current.deepDive?.length > 0 && (
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setDeep((d) => !d)}
                  className="flex items-center gap-3 rounded-xl border border-indigo-500/40 bg-indigo-600/10 px-4 py-3 text-left"
                >
                  <Icon name="file" className="h-4 w-4 shrink-0 text-indigo-400" />
                  <span className="flex-1 text-sm font-semibold text-indigo-200">
                    {pick(
                      `Poora samajhna hai? ${current.deepDive.length} steps mein`,
                      `Want the full walkthrough? ${current.deepDive.length} steps`
                    )}
                  </span>
                  <Icon name="chevron-down" className={`h-3.5 w-3.5 text-indigo-300 ${deep ? 'rotate-180' : ''}`} />
                </button>

                {deep && (
                  <ol className="flex flex-col gap-5 border-l-2 border-indigo-500/30 pl-5">
                    {current.deepDive.map((sec, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[27px] top-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                          {i + 1}
                        </span>
                        {(sec.heading?.en || sec.heading?.hi) && (
                          <h3 className="text-[15px] font-bold text-slate-100">
                            {pick(sec.heading.hi || sec.heading.en, sec.heading.en || sec.heading.hi)}
                          </h3>
                        )}
                        {(sec.body?.en || sec.body?.hi) && (
                          <p className="mt-1.5 whitespace-pre-line text-[14.5px] leading-relaxed text-slate-400">
                            {pick(sec.body.hi || sec.body.en, sec.body.en || sec.body.hi)}
                          </p>
                        )}
                        {sec.diagram && (
                          <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-3 font-mono text-[11.5px] leading-[1.55] text-slate-500">
                            <code>{sec.diagram}</code>
                          </pre>
                        )}
                        {sec.code && (
                          <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 px-3.5 py-3 font-mono text-[12px] leading-relaxed text-slate-300">
                            <code>{sec.code}</code>
                          </pre>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}

            {deep && current.visual && <ConceptAnimation type={current.visual} />}

            {/* read more — the concept first, then the canonical references */}
            {(current.conceptSlug || questionSources.length > 0) && (
              <div className="flex flex-col gap-2.5 border-t border-slate-800 pt-4">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
                  {pick('Aur gehrai mein padho', 'Read deeper')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.conceptSlug && (
                    <Link
                      href={`/concepts/${current.conceptSlug}`}
                      className="flex items-center gap-2.5 rounded-xl border border-indigo-500/40 bg-indigo-600/10 px-3 py-2"
                    >
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-indigo-600 text-[9.5px] font-extrabold text-white">L</span>
                      <span className="flex flex-col">
                        <span className="text-[12.5px] font-semibold text-indigo-200">
                          {current.conceptTitle || pick('Concept padho', 'Read the concept')}
                        </span>
                        <span className="font-mono text-[9.5px] text-slate-500">learnverse</span>
                      </span>
                    </Link>
                  )}
                  {questionSources.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 hover:border-slate-700"
                    >
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-slate-800 text-[9.5px] font-extrabold text-slate-400">
                        {s.mark}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[12.5px] font-semibold text-slate-300">{s.label}</span>
                        <span className="font-mono text-[9.5px] text-slate-500">{s.host}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══ back / keep going ══ */}
        <div className="relative flex justify-center px-4 py-5 sm:px-8">
          <div className="flex w-full max-w-[700px] items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              className="flex h-14 items-center gap-2.5 rounded-2xl border border-slate-800 px-5 text-[14.5px] font-semibold text-slate-400 transition hover:text-slate-200 disabled:opacity-40 sm:px-6"
            >
              <Icon name="arrow-left" className="h-4 w-4" />
              <span className="hidden sm:inline">{pick('Peeche', 'Back')}</span>
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              disabled={index >= questions.length - 1}
              className="flex h-14 flex-1 items-center justify-center gap-3 rounded-2xl bg-indigo-600 text-[17px] font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 disabled:opacity-40"
            >
              {pick('Keep going', 'Keep going')}
              <Icon name="arrow-right" className="h-4 w-4" />
              <span className="hidden font-mono text-[11px] font-medium opacity-70 sm:inline">space</span>
            </button>
          </div>
        </div>
      </main>

      {/* ══ mobile list sheet ══ */}
      {mobileList && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setMobileList(false)}
            className="absolute inset-0 bg-slate-950/70"
          />
          <div className="relative ml-auto flex h-full w-[86%] max-w-sm flex-col border-l border-slate-800 bg-slate-900">
            <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3.5">
              <span className="flex-1 font-bold text-slate-100">{course.title}</span>
              <button type="button" onClick={() => setMobileList(false)} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-800">
                <Icon name="x" className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
            <label className="mx-4 my-3 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-3">
              <Icon name="search" className="h-3.5 w-3.5 shrink-0 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={pick('Dhundo…', 'Search…')}
                className="h-10 w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
              />
            </label>
            <div className="flex-1 overflow-y-auto px-2.5 pb-4">
              {filtered.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => jump(q.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-3 text-left ${
                    q.id === current.id ? 'bg-indigo-600/20' : ''
                  }`}
                >
                  <span className={`h-4 w-4 shrink-0 rounded-full ${seen.has(q.id) ? 'bg-emerald-400' : 'bg-slate-800'}`} />
                  <span className="flex-1 text-[13.5px] leading-snug text-slate-300">{q.question}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
