'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

export default function PracticePage() {
  const { slug } = useParams();
  const { pick } = useLang();
  const { status: authStatus } = useSession();
  const [data, setData] = useState(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [answers, setAnswers] = useState([]); // { correct, conceptId, conceptTitle }
  const [finished, setFinished] = useState(false);
  const [reward, setReward] = useState(null); // { gained, totalXP }

  function load() {
    setData(null); setIdx(0); setPicked(null); setAnswers([]); setFinished(false); setReward(null);
    fetch(`/api/practice?courseSlug=${slug}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ questions: [] }));
  }
  useEffect(() => { load(); }, [slug]);

  if (!data) {
    return <p className="mx-auto w-full max-w-[760px] px-4 sm:px-6 lg:px-8 py-12 text-muted">{pick('Quiz load ho raha hai…', 'Loading quiz…')}</p>;
  }

  if (!data.questions || data.questions.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">{pick('Practice Quiz', 'Practice Quiz')}</h1>
        <p className="mt-2 text-muted">{pick('Is course mein abhi quiz questions nahi hain.', 'This course has no quiz questions yet.')}</p>
        <Link href={`/courses/${slug}`} className="mt-6 inline-block font-bold text-brand underline">
          {pick('Course pe wapas', 'Back to course')}
        </Link>
      </div>
    );
  }

  const total = data.questions.length;
  const q = data.questions[idx];
  const isLast = idx + 1 >= total;
  const score = answers.filter((a) => a.correct).length;

  function choose(i) {
    if (picked !== null) return;
    setPicked(i);
    setAnswers((prev) => [
      ...prev,
      { correct: i === q.correctIndex, conceptId: q.conceptId, conceptTitle: q.conceptTitle },
    ]);
  }

  async function next() {
    if (!isLast) { setIdx(idx + 1); setPicked(null); return; }
    setFinished(true);
    // Award quiz XP for the concepts answered correctly (signed-in only).
    if (authStatus === 'authenticated') {
      // `answers` already includes this last question — choose() records it
      // before the Next button becomes reachable.
      const correctConceptIds = answers
        .filter((a) => a.correct && a.conceptId)
        .map((a) => a.conceptId);
      if (correctConceptIds.length) {
        try {
          const res = await fetch('/api/practice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conceptIds: correctConceptIds }),
          });
          const d = await res.json();
          if (res.ok && d.gained) setReward(d);
        } catch {}
      }
    }
  }

  /* ── Results ── */
  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="mx-auto max-w-[480px] px-4 py-14 text-center sm:px-6 lg:px-8">
        <p className="text-[52px] leading-none">{pct >= 70 ? '🎉' : pct >= 40 ? '👍' : '📚'}</p>
        <h1 className="mt-3.5 text-[44px] font-bold text-ink">{score}/{total}</h1>
        <p className="mt-1 text-[15px] text-muted">{pick('sahi', 'correct')}</p>

        <div className="mx-auto mt-[18px] h-2.5 w-[220px] overflow-hidden rounded-full bg-line-soft">
          <div className={`h-full rounded-full ${pct >= 70 ? 'bg-accent-green' : 'bg-brand'}`} style={{ width: `${pct}%` }} />
        </div>

        <h2 className="mt-6 text-[19px] font-bold text-ink">
          {pct >= 70 ? pick('Shaandaar! 🎉', 'Nice work! 🎉') : pct >= 40 ? pick('Achha! 👍', 'Good effort! 👍') : pick('Koi baat nahi 📚', 'Keep going 📚')}
        </h2>
        <p className="mt-1.5 text-[14px] text-muted">
          {pick(`Tumne ${data.course?.title} pe ${pct}% score kiya.`, `You scored ${pct}% on ${data.course?.title}.`)}
        </p>

        {reward?.gained > 0 && (
          <div
            className="mt-6 flex items-center gap-3.5 rounded-2xl p-5 text-left"
            style={{ background: 'linear-gradient(120deg,var(--color-violet),#a855f7)' }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" className="shrink-0">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
            <div>
              <div className="text-[17px] font-bold text-white">+{reward.gained} XP {pick('mile', 'earned')}</div>
              {reward.totalXP > 0 && (
                <div className="mt-0.5 text-[12.5px] text-violet-100">
                  {reward.totalXP - reward.gained} → {reward.totalXP} {pick('total XP', 'total XP')}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Question breakdown */}
        <div className="lv-card mt-6 overflow-hidden text-left">
          <p className="border-b border-line-soft px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-muted">
            {pick('Question breakdown', 'Question breakdown')}
          </p>
          <div className="divide-y divide-line-soft">
            {answers.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${a.correct ? 'bg-accent-green' : 'bg-red-400'}`}
                >
                  {a.correct ? '✓' : '✕'}
                </span>
                <span className="truncate text-[13.5px] text-ink-soft">
                  Q{i + 1} · {a.conceptTitle}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={load} className="lv-btn lv-btn-ghost flex-1 justify-center">↻ {pick('Retry quiz', 'Retry quiz')}</button>
          <Link href={`/courses/${slug}`} className="lv-btn lv-btn-primary flex-1 justify-center">
            {pick('Course pe wapas', 'Back to course')}
          </Link>
        </div>
      </div>
    );
  }

  /* ── Question ── */
  return (
    <div className="mx-auto w-full max-w-[760px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-[19px] font-bold text-ink sm:text-[22px]">
          🧠 {data.course?.icon} {data.course?.title} — {pick('Practice', 'Practice')}
        </h1>
        <span className="lv-pill shrink-0 bg-violet-tint text-violet-ink">⚡ {pick('Score', 'Score')} {score}</span>
      </div>

      {/* Segmented progress — one dash per question */}
      <div className="mt-4 flex gap-1.5">
        {data.questions.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < idx ? 'bg-brand' : i === idx ? 'bg-brand/50' : 'bg-line-soft'
            }`}
          />
        ))}
      </div>

      <div className="lv-card mt-6 p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="lv-pill bg-brand-tint text-brand-dark">
            {data.course?.icon} {data.course?.title} · {q.conceptTitle}
          </span>
          <span className="text-[13px] text-muted">
            {pick('Question', 'Question')} {idx + 1} {pick('of', 'of')} {total}
          </span>
        </div>

        <p className="mt-4 text-[17px] font-bold leading-snug text-ink">{q.question}</p>

        <div className="mt-5 grid gap-2.5">
          {q.options.map((opt, i) => {
            let cls = 'border-line bg-card text-ink-soft hover:border-brand/40';
            if (picked !== null) {
              if (i === q.correctIndex) cls = 'border-accent-green bg-accent-green-tint text-ink';
              else if (i === picked) cls = 'border-red-400 bg-red-50 text-ink';
              else cls = 'border-line bg-card text-ink-soft opacity-60';
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={picked !== null}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${cls}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className="mt-5">
            <div
              className={`rounded-2xl p-4 ${picked === q.correctIndex ? 'bg-accent-green-tint' : 'bg-amber-tint'}`}
            >
              <p className={`text-sm font-bold ${picked === q.correctIndex ? 'text-accent-green-ink' : 'text-amber-ink'}`}>
                {picked === q.correctIndex ? `✅ ${pick('Sahi!', 'Correct!')}` : `❌ ${pick('Galat', 'Not quite')}`}
              </p>
              {q.explanation && <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{q.explanation}</p>}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <Link href={`/concepts/${q.conceptSlug}`} className="text-xs text-muted-soft hover:text-brand">
                {pick('Source:', 'From:')} {q.conceptTitle}
              </Link>
              <button onClick={next} className="lv-btn lv-btn-primary py-2.5 text-sm">
                {isLast ? pick('Result dekho →', 'See results →') : pick('Agla question →', 'Next question →')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
