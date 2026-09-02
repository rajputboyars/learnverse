'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import Icon from '@/components/Icon';

const STAGE = 'mx-auto w-full max-w-[720px] px-4 sm:px-6';

export default function PracticePage() {
  const { slug } = useParams();
  const { pick } = useLang();

  const [data, setData] = useState(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [missed, setMissed] = useState([]); // questions answered wrong
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const load = useCallback(() => {
    setData(null); setIdx(0); setPicked(null); setScore(0); setMissed([]); setFinished(false);
    fetch(`/api/practice?courseSlug=${slug}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ questions: [] }));
  }, [slug]);

  useEffect(() => { load(); }, [load]);

  const questions = data?.questions || [];
  const q = questions[idx];
  const isLast = idx + 1 >= questions.length;

  const choose = useCallback((i) => {
    if (picked !== null || !q) return;
    setPicked(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
    else setMissed((m) => [...m, q]);
  }, [picked, q]);

  const next = useCallback(() => {
    if (picked === null) return;
    if (isLast) { setFinished(true); return; }
    setIdx((i) => i + 1);
    setPicked(null);
  }, [picked, isLast]);

  // Keyboard: 1-4 to answer, Enter to advance. The quiz was mouse-only before.
  useEffect(() => {
    if (finished || !q) return;
    function onKey(e) {
      if (e.key >= '1' && e.key <= String(Math.min(9, q.options.length))) {
        choose(Number(e.key) - 1);
      } else if (e.key === 'Enter') {
        next();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finished, q, choose, next]);

  /* ── Loading / empty ── */
  if (!data) {
    return (
      <div className={`${STAGE} py-20 text-center text-slate-400`}>
        {pick('Quiz load ho raha hai…', 'Loading quiz…')}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={`${STAGE} py-20 text-center`}>
        <Icon name="brain" className="mx-auto h-10 w-10 text-indigo-600" />
        <h1 className="mt-4 text-2xl font-bold">{pick('Practice quiz', 'Practice quiz')}</h1>
        <p className="mt-2 text-slate-600">
          {pick('Is course mein abhi quiz questions nahi hain.', 'This course has no quiz questions yet.')}
        </p>
        <Link href={`/courses/${slug}`} className="mt-6 inline-block font-semibold text-indigo-600 underline">
          {pick('Course pe wapas', 'Back to course')}
        </Link>
      </div>
    );
  }

  /* ── Result ── */
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-slate-50 pb-16">
        <div className={`${STAGE} flex flex-col gap-5 pt-8`}>

          <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-45"
              style={{
                backgroundImage:
                  'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <div className="relative flex flex-col items-center gap-5 p-7 sm:flex-row sm:items-center">
              <span
                className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(#4f46e5 0turn ${pct / 100}turn, #1e293b ${pct / 100}turn 1turn)`,
                }}
              >
                <span className="grid h-[76px] w-[76px] place-items-center rounded-full bg-slate-900 text-2xl font-bold text-white dark:bg-slate-950">
                  {pct}%
                </span>
              </span>
              <div className="flex flex-1 flex-col gap-2 text-center sm:text-left">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {score} / {questions.length} {pick('sahi', 'correct')}
                </h1>
                <p className="leading-relaxed text-slate-400">
                  {missed.length === 0
                    ? pick('Sab sahi. Concepts solid hain.', 'All correct. Your concepts are solid.')
                    : pick(
                        `${missed.length} concepts pe thoda kaam baaki hai — neeche wahi list hai.`,
                        `${missed.length} to work on — the list is below.`
                      )}
                </p>
              </div>
              <div className="flex shrink-0 gap-2.5 sm:flex-col">
                <button
                  type="button"
                  onClick={load}
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {pick('Phir se try karo', 'Try again')}
                </button>
                <Link
                  href={`/courses/${slug}`}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-200 hover:bg-slate-800"
                >
                  {pick('Course pe wapas', 'Back to course')}
                </Link>
              </div>
            </div>
          </div>

          {/* The score becomes a reading list */}
          {missed.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="mb-3.5 flex items-center gap-2.5">
                <h2 className="font-bold">{pick('Ye dobara padh lo', 'Read these again')}</h2>
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                  {missed.length} {pick('galat', missed.length === 1 ? 'missed' : 'missed')}
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {missed.map((m, i) => (
                  <Link
                    key={`${m.conceptSlug}-${i}`}
                    href={`/concepts/${m.conceptSlug}`}
                    className="flex items-center gap-3.5 rounded-xl border border-slate-200 px-4 py-3 transition hover:border-indigo-300"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-50">
                      <Icon name="x" className="h-2.5 w-2.5 text-red-600" />
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="text-sm font-medium">{m.question}</span>
                      <span className="text-xs text-slate-400">{m.conceptTitle}</span>
                    </span>
                    <span className="shrink-0 text-xs font-semibold text-indigo-600">
                      {pick('Padho', 'Read')} →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-3.5 sm:grid-cols-2">
            <Link
              href={`/mock-interview/${slug}`}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50">
                <Icon name="microphone" className="h-4 w-4 text-indigo-600" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">{pick('Mock interview', 'Mock interview')}</span>
                <span className="text-xs text-slate-400">{pick('Bol ke jawab do', 'Answer out loud')}</span>
              </span>
            </Link>
            <Link
              href="/revise"
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50">
                <Icon name="repeat" className="h-4 w-4 text-indigo-600" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">{pick('Revision', 'Revision')}</span>
                <span className="text-xs text-slate-400">{pick('Flashcards se dohrao', 'Drill with flashcards')}</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── The stage ── */
  const wrong = missed.length;
  return (
    <div className="min-h-[80vh] bg-slate-50 pb-16">

      {/* Task bar — the site chrome collapses to what the task needs */}
      <div className="border-b border-slate-200 bg-white dark:bg-slate-900">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 sm:px-6">
          <span className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 dark:bg-slate-800">
              <Icon name={data.course?.icon} brand className="h-4 w-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-bold leading-tight">{data.course?.title}</span>
              <span className="text-xs text-slate-400">{pick('Practice quiz', 'Practice quiz')}</span>
            </span>
          </span>

          <span className="flex items-center gap-3">
            <span className="text-xs text-slate-500">Q {idx + 1} / {questions.length}</span>
            <span className="block h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 sm:w-40">
              <span
                className="block h-1.5 rounded-full bg-indigo-600 transition-all"
                style={{ width: `${(idx / questions.length) * 100}%` }}
              />
            </span>
          </span>

          <span className="ml-auto flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              <Icon name="check" className="h-3 w-3" />
              {score}
            </span>
            {wrong > 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                <Icon name="x" className="h-3 w-3" />
                {wrong}
              </span>
            )}
            <Link
              href={`/courses/${slug}`}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              {pick('Chhodo', 'Leave')}
            </Link>
          </span>
        </div>
      </div>

      {/* The question, in a readable column */}
      <div className={`${STAGE} flex flex-col gap-6 pt-10`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
            {pick('Sawaal', 'Question')} {idx + 1}
          </span>
          <span className="ml-auto text-xs text-slate-400">{q.conceptTitle}</span>
        </div>

        <h1 className="text-2xl font-bold leading-snug tracking-tight sm:text-[27px]">{q.question}</h1>

        <div className="flex flex-col gap-2.5">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isPicked = i === picked;
            let box = 'border-slate-200 bg-white hover:border-indigo-300';
            let key = 'bg-slate-100 text-slate-500';
            let text = 'text-slate-700';
            if (picked !== null) {
              if (isCorrect) {
                box = 'border-green-600 bg-green-50';
                key = 'bg-green-600 text-white';
                text = 'text-green-900';
              } else if (isPicked) {
                box = 'border-red-400 bg-red-50';
                key = 'bg-red-500 text-white';
                text = 'text-red-900';
              } else {
                box = 'border-slate-200 bg-white opacity-60';
              }
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                disabled={picked !== null}
                className={`flex items-center gap-3.5 rounded-2xl border-[1.5px] px-4 py-4 text-left transition sm:px-5 ${box}`}
              >
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs ${key}`}>
                  {i + 1}
                </span>
                <span className={`flex-1 leading-snug ${text}`}>{opt}</span>
                {picked !== null && isCorrect && <Icon name="check" className="h-4 w-4 shrink-0 text-green-600" />}
                {picked !== null && isPicked && !isCorrect && <Icon name="x" className="h-4 w-4 shrink-0 text-red-500" />}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <>
            <div
              className={`flex gap-3.5 rounded-2xl border p-4 sm:p-5 ${
                picked === q.correctIndex ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
              }`}
            >
              <Icon
                name={picked === q.correctIndex ? 'check-circle' : 'lightbulb'}
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  picked === q.correctIndex ? 'text-green-600' : 'text-amber-600'
                }`}
              />
              <div className="flex flex-col gap-1.5">
                <p className={`font-bold ${picked === q.correctIndex ? 'text-green-900' : 'text-amber-900'}`}>
                  {picked === q.correctIndex ? pick('Sahi jawab', 'Correct') : pick('Galat', 'Not quite')}
                </p>
                {q.explanation && (
                  <p className={`leading-relaxed ${picked === q.correctIndex ? 'text-green-800' : 'text-amber-900'}`}>
                    {q.explanation}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/concepts/${q.conceptSlug}`}
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-600"
              >
                <Icon name="file" className="h-3.5 w-3.5" />
                {q.conceptTitle}
              </Link>
              <span className="ml-auto flex items-center gap-3">
                <span className="hidden font-mono text-xs text-slate-300 sm:inline">↵</span>
                <button
                  type="button"
                  onClick={next}
                  className="flex items-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white hover:bg-indigo-700"
                >
                  {isLast ? pick('Result dekho', 'See result') : pick('Aage', 'Next')}
                  <Icon name="arrow-right" className="h-3.5 w-3.5" />
                </button>
              </span>
            </div>
          </>
        )}

        <p className="flex justify-center gap-4 pt-1 font-mono text-[11px] text-slate-300">
          <span>{pick('1–4 option', '1–4 to answer')}</span>
          <span>{pick('↵ aage', '↵ next')}</span>
        </p>
      </div>
    </div>
  );
}
