'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function MockInterviewPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [lang, setLang] = useState('english');
  const [gotIt, setGotIt] = useState(0);
  const [finished, setFinished] = useState(false);

  function load() {
    setData(null); setIdx(0); setRevealed(false); setGotIt(0); setFinished(false);
    fetch(`/api/mock-interview?courseSlug=${slug}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ questions: [] }));
  }
  useEffect(() => { load(); }, [slug]);

  if (!data) return <p className="mx-auto max-w-2xl px-4 py-12 text-slate-400">Loading questions…</p>;

  if (!data.questions || data.questions.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Mock Interview</h1>
        <p className="mt-2 text-slate-600">Is course ke liye abhi interview questions nahi hain.</p>
        <Link href={`/courses/${slug}`} className="mt-6 inline-block font-semibold text-indigo-600 underline">Back to course</Link>
      </div>
    );
  }

  const q = data.questions[idx];
  const isLast = idx + 1 >= data.questions.length;

  function rate(got) {
    if (got) setGotIt((g) => g + 1);
    if (isLast) { setFinished(true); return; }
    setIdx(idx + 1); setRevealed(false);
  }

  if (finished) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-5xl">🎤</p>
        <h1 className="mt-4 text-3xl font-bold">{gotIt} / {data.questions.length}</h1>
        <p className="mt-1 text-slate-600">confidently answered</p>
        <p className="mt-3 text-slate-500">Jo "needs work" the, unke concepts dobara padho aur retry karo.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={load} className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">Retry</button>
          <Link href={`/courses/${slug}`} className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">Back to course</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">🎤 {data.course?.icon} {data.course?.title} — Mock Interview</h1>
        <span className="text-sm text-slate-500">Q {idx + 1}/{data.questions.length}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-500">{q.difficulty}</span>
        <p className="mt-4 text-lg font-semibold">{q.question}</p>
        <p className="mt-2 text-sm text-slate-500">Mann mein (ya bol ke) answer socho — interview jaisa. Phir reveal karo.</p>

        {!revealed ? (
          <button onClick={() => setRevealed(true)} className="mt-6 w-full rounded-xl border-2 border-dashed border-slate-300 py-8 font-semibold text-indigo-600 hover:bg-slate-50">
            Reveal model answer
          </button>
        ) : (
          <div className="mt-6">
            <div className="mb-3 inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm font-medium">
              <button onClick={() => setLang('english')} className={`rounded-md px-3 py-1 ${lang === 'english' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>English</button>
              <button onClick={() => setLang('hinglish')} className={`rounded-md px-3 py-1 ${lang === 'hinglish' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>Hinglish</button>
            </div>
            <div className="prose-content rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              {lang === 'hinglish' && q.hinglish ? q.hinglish : q.english}
            </div>
          </div>
        )}
      </div>

      {revealed && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button onClick={() => rate(false)} className="rounded-lg bg-amber-500 py-2.5 font-semibold text-white hover:bg-amber-600">Needs work</button>
          <button onClick={() => rate(true)} className="rounded-lg bg-green-600 py-2.5 font-semibold text-white hover:bg-green-700">Got it ✓</button>
        </div>
      )}
    </div>
  );
}
