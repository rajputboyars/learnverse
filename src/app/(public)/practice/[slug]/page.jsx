'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

export default function PracticePage() {
  const { slug } = useParams();
  const { pick } = useLang();
  const [data, setData] = useState(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function load() {
    setData(null); setIdx(0); setPicked(null); setScore(0); setFinished(false);
    fetch(`/api/practice?courseSlug=${slug}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ questions: [] }));
  }
  useEffect(() => { load(); }, [slug]);

  if (!data) return <p className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12 text-slate-400">{pick('Quiz load ho raha hai…', 'Loading quiz…')}</p>;

  if (!data.questions || data.questions.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">{pick('Practice Quiz', 'Practice Quiz')}</h1>
        <p className="mt-2 text-slate-600">{pick('Is course mein abhi quiz questions nahi hain.', 'This course has no quiz questions yet.')}</p>
        <Link href={`/courses/${slug}`} className="mt-6 inline-block font-semibold text-indigo-600 underline">{pick('Course pe wapas', 'Back to course')}</Link>
      </div>
    );
  }

  const q = data.questions[idx];
  const isLast = idx + 1 >= data.questions.length;

  function choose(i) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  }
  function next() {
    if (isLast) { setFinished(true); return; }
    setIdx(idx + 1); setPicked(null);
  }

  if (finished) {
    const pct = Math.round((score / data.questions.length) * 100);
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-5xl">{pct >= 70 ? '🎉' : pct >= 40 ? '👍' : '📚'}</p>
        <h1 className="mt-4 text-3xl font-bold">{score} / {data.questions.length}</h1>
        <p className="mt-1 text-slate-600">{pct}% {pick('sahi', 'correct')}</p>
        <p className="mt-3 text-slate-500">
          {pct >= 70
            ? pick('Shaandaar! Concepts solid hain.', 'Excellent! Your concepts are solid.')
            : pct >= 40
            ? pick('Achha — thodi aur revision karo.', 'Good — revise a bit more.')
            : pick('Koi baat nahi — concepts dobara padho aur try karo.', 'No worries — re-read the concepts and try again.')}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={load} className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">{pick('Retry', 'Retry')}</button>
          <Link href={`/courses/${slug}`} className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">{pick('Course pe wapas', 'Back to course')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">🧠 {data.course?.icon} {data.course?.title} — {pick('Practice', 'Practice')}</h1>
        <span className="text-sm text-slate-500">Q {idx + 1}/{data.questions.length} · {pick('Score', 'Score')} {score}</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${((idx) / data.questions.length) * 100}%` }} />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="font-semibold">{q.question}</p>
        <div className="mt-4 grid gap-2">
          {q.options.map((opt, i) => {
            let cls = 'border-slate-200 bg-white hover:border-indigo-300';
            if (picked !== null) {
              if (i === q.correctIndex) cls = 'border-green-500 bg-green-50';
              else if (i === picked) cls = 'border-red-400 bg-red-50';
              else cls = 'border-slate-200 bg-white opacity-70';
            }
            return (
              <button key={i} onClick={() => choose(i)} disabled={picked !== null} className={`rounded-lg border px-4 py-2.5 text-left text-sm transition ${cls}`}>
                {opt}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="mt-4">
            {q.explanation && <p className="text-sm text-slate-600">💡 {q.explanation}</p>}
            <div className="mt-3 flex items-center justify-between">
              <Link href={`/concepts/${q.conceptSlug}`} className="text-xs text-slate-400 hover:text-indigo-600">{pick('Source:', 'From:')} {q.conceptTitle}</Link>
              <button onClick={next} className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                {isLast ? pick('Result dekho', 'See result') : pick('Aage →', 'Next →')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
