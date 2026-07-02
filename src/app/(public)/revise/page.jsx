'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

const RATINGS = [
  { key: 'forgot', label: 'Forgot', hi: 'Bhool gaya', color: 'bg-red-500 hover:bg-red-600' },
  { key: 'hard', label: 'Hard', hi: 'Mushkil', color: 'bg-amber-500 hover:bg-amber-600' },
  { key: 'good', label: 'Good', hi: 'Theek', color: 'bg-indigo-600 hover:bg-indigo-700' },
  { key: 'easy', label: 'Easy', hi: 'Aasaan', color: 'bg-green-600 hover:bg-green-700' },
];

export default function RevisePage() {
  const { status } = useSession();
  const { pick } = useLang();
  const [cards, setCards] = useState(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);

  const isGuest = status !== 'loading' && status !== 'authenticated';

  useEffect(() => {
    if (status === 'loading') return;
    const url = isGuest ? '/api/revise?guest=true' : '/api/revise';
    fetch(url)
      .then((r) => r.json())
      .then((d) => setCards(d.cards || []))
      .catch(() => setCards([]));
  }, [status]);

  if (status === 'loading') return <p className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12 text-slate-400">Loading…</p>;

  if (cards === null) return <p className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12 text-slate-400">{pick('Cards load ho rahe hain…', 'Loading cards…')}</p>;

  if (cards.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-5xl">✅</p>
        <h1 className="mt-4 text-2xl font-bold">{pick('Sab revise ho gaya!', 'All revised!')}</h1>
        <p className="mt-2 text-slate-600">
          {done > 0 ? pick(`${done} cards review ho gaye. `, `${done} cards reviewed. `) : ''}
          {pick('Abhi koi card due nahi. Naye concepts padho — wo automatically revision ke liye schedule honge.', 'No cards due right now. Learn new concepts — they get scheduled for revision automatically.')}
        </p>
        <Link href="/courses" className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
          {pick('Keep learning', 'Keep learning')}
        </Link>
      </div>
    );
  }

  const card = cards[idx];

  async function rate(rating) {
    if (!isGuest) {
      await fetch('/api/revise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conceptId: card.conceptId, rating }),
      }).catch(() => {});
    }
    setDone((d) => d + 1);
    setRevealed(false);
    if (idx + 1 < cards.length) setIdx(idx + 1);
    else setCards([]); // finished this batch
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
      {isGuest && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm dark:border-indigo-800 dark:bg-indigo-950/40">
          <p className="text-indigo-800 dark:text-indigo-300">
            {pick('Guest mode — progress save nahi hoga. Sign up karo spaced-repetition ke liye.', 'Guest mode — progress won\'t be saved. Sign up for spaced-repetition tracking.')}
          </p>
          <Link href="/signup" className="shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-700">Sign up free</Link>
        </div>
      )}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🔁 Revision</h1>
        <span className="text-sm text-slate-500">{idx + 1} / {cards.length}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-500">{card.difficulty}</span>
        <h2 className="mt-4 text-2xl font-bold">{card.title}</h2>
        <p className="mt-2 text-sm text-slate-500">{pick('Yaad hai? Mann mein recall karo, phir reveal karo.', 'Remember it? Recall in your head, then reveal.')}</p>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="mt-6 w-full rounded-xl border-2 border-dashed border-slate-300 py-8 font-semibold text-indigo-600 hover:bg-slate-50"
          >
            {pick('Answer reveal karne ke liye tap karo', 'Tap to reveal answer')}
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            {card.keyPoints.length > 0 && (
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-2 text-sm font-semibold">{pick('Key points', 'Key points')}</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  {card.keyPoints.map((k, i) => (
                    <li key={i} className="flex gap-2"><span className="text-indigo-600">→</span>{k}</li>
                  ))}
                </ul>
              </div>
            )}
            {card.dailyLifeExample && (
              <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                <span className="font-semibold">🪔 Example: </span>{card.dailyLifeExample}
              </div>
            )}
            <Link href={`/concepts/${card.slug}`} className="inline-block text-sm font-medium text-indigo-600 hover:underline">
              {pick('Poora concept padho →', 'Read full concept →')}
            </Link>
          </div>
        )}
      </div>

      {revealed && (
        <div className="mt-5">
          <p className="mb-2 text-center text-sm text-slate-500">{pick('Kitna yaad tha?', 'How well did you remember?')}</p>
          <div className="grid grid-cols-4 gap-2">
            {RATINGS.map((r) => (
              <button key={r.key} onClick={() => rate(r.key)} className={`rounded-lg py-2.5 text-sm font-semibold text-white ${r.color}`}>
                {pick(r.hi, r.label)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
