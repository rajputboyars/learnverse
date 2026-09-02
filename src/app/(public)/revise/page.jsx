'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import Icon from '@/components/Icon';

const STAGE = 'mx-auto w-full max-w-[680px] px-4 sm:px-6';

const RATINGS = [
  { key: 'forgot', label: 'Forgot', hi: 'Bhool gaya', color: 'bg-red-500 hover:bg-red-600' },
  { key: 'hard', label: 'Hard', hi: 'Mushkil', color: 'bg-amber-500 hover:bg-amber-600' },
  { key: 'good', label: 'Good', hi: 'Theek', color: 'bg-indigo-600 hover:bg-indigo-700' },
  { key: 'easy', label: 'Easy', hi: 'Aasaan', color: 'bg-green-600 hover:bg-green-700' },
];

// Mirrors the SM-2 step in POST /api/revise, so the buttons can say what they
// schedule before you press them.
function nextInterval(rating, intervalDays = 1, ease = 2.5) {
  switch (rating) {
    case 'forgot': return 1;
    case 'hard': return Math.max(1, Math.round(intervalDays * 1.2));
    case 'good': return Math.max(1, Math.round(intervalDays * ease));
    case 'easy': return Math.max(1, Math.round(intervalDays * ease * 1.3));
    default: return 1;
  }
}

export default function RevisePage() {
  const { status } = useSession();
  const { pick } = useLang();

  const [payload, setPayload] = useState(null);
  const [cards, setCards] = useState(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);

  const isGuest = status !== 'loading' && status !== 'authenticated';

  useEffect(() => {
    if (status === 'loading') return;
    fetch(isGuest ? '/api/revise?guest=true' : '/api/revise')
      .then((r) => r.json())
      .then((d) => { setPayload(d); setCards(d.cards || []); })
      .catch(() => { setPayload({}); setCards([]); });
  }, [status, isGuest]);

  const card = cards?.[idx];

  const rate = useCallback(async (rating) => {
    if (!card) return;
    if (!isGuest) {
      fetch('/api/revise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conceptId: card.conceptId, rating }),
      }).catch(() => {});
    }
    setDone((d) => d + 1);
    setRevealed(false);
    if (idx + 1 < cards.length) setIdx(idx + 1);
    else setCards([]);
  }, [card, isGuest, idx, cards]);

  // Space reveals, 1-4 rates.
  useEffect(() => {
    if (!card) return;
    function onKey(e) {
      if (!revealed && (e.code === 'Space' || e.key === 'Enter')) {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && e.key >= '1' && e.key <= '4') {
        rate(RATINGS[Number(e.key) - 1].key);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [card, revealed, rate]);

  if (status === 'loading' || cards === null) {
    return <div className={`${STAGE} py-20 text-center text-slate-400`}>{pick('Cards load ho rahe hain…', 'Loading cards…')}</div>;
  }

  /* ── Queue finished ── */
  if (cards.length === 0) {
    return (
      <div className="bg-slate-50 pb-16">
        <div className={`${STAGE} flex flex-col gap-5 pt-12`}>
          <div className="flex flex-col items-center gap-3.5 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-green-100">
              <Icon name="check" className="h-6 w-6 text-green-600" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-[26px]">
              {done > 0
                ? pick(`Aaj ke ${done} cards ho gaye`, `That is ${done} for today`)
                : pick('Abhi kuch due nahi', 'Nothing due right now')}
            </h1>
            <p className="max-w-md leading-relaxed text-slate-600">
              {pick(
                'Agla batch schedule ke hisaab se aayega — tab tak naye concepts padho, wo apne aap queue mein aa jaate hain.',
                'The next batch arrives on schedule — until then, read new concepts and they queue themselves up.'
              )}
            </p>
          </div>

          {!isGuest && (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
              <span className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white p-4">
                <span className="text-xl font-bold">{done}</span>
                <span className="text-xs text-slate-400">{pick('aaj review kiye', 'reviewed today')}</span>
              </span>
              <span className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white p-4">
                <span className="text-xl font-bold">{Math.max(0, (payload?.dueCount || 0) - done)}</span>
                <span className="text-xs text-slate-400">{pick('abhi bhi due', 'still due')}</span>
              </span>
              <span className="col-span-2 flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-1">
                <span className="text-xl font-bold">{payload?.total || 0}</span>
                <span className="text-xs text-slate-400">{pick('total cards', 'cards in total')}</span>
              </span>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="flex flex-1 items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white hover:bg-indigo-700"
            >
              {pick('Naya concept padho', 'Learn something new')}
            </Link>
            <Link
              href="/dashboard"
              className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-600 hover:bg-slate-50"
            >
              {pick('Dashboard', 'Dashboard')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = cards.length;

  return (
    <div className="min-h-[80vh] bg-slate-50 pb-16">

      {/* Task bar — the queue the page used to fetch and throw away */}
      <div className="border-b border-slate-200 bg-white dark:bg-slate-900">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 sm:px-6">
          <span className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-50">
              <Icon name="repeat" className="h-4 w-4 text-indigo-600" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-bold leading-tight">{pick('Revision', 'Revision')}</span>
              <span className="text-xs text-slate-400">
                {isGuest
                  ? pick('Guest mode', 'Guest mode')
                  : pick(`${payload?.dueCount || total} cards due`, `${payload?.dueCount || total} due`)}
              </span>
            </span>
          </span>

          <span className="flex items-center gap-3">
            <span className="text-xs text-slate-500">{idx + 1} / {total}</span>
            <span className="block h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 sm:w-40">
              <span
                className="block h-1.5 rounded-full bg-indigo-600 transition-all"
                style={{ width: `${(idx / total) * 100}%` }}
              />
            </span>
          </span>

          <span className="ml-auto flex items-center gap-2">
            {!isGuest && payload?.total > 0 && (
              <span className="hidden text-xs text-slate-400 sm:inline">
                {payload.total} {pick('total', 'total')}
              </span>
            )}
            <Link
              href="/dashboard"
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              {pick('Baad mein', 'Later')}
            </Link>
          </span>
        </div>
      </div>

      <div className={`${STAGE} flex flex-col gap-4 pt-8`}>

        {isGuest && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-3.5 text-sm">
            <p className="text-indigo-800">
              {pick(
                'Guest mode — progress save nahi hoga. Sign up karo spaced-repetition ke liye.',
                "Guest mode — progress won't be saved. Sign up for spaced-repetition tracking."
              )}
            </p>
            <Link
              href="/register"
              className="shrink-0 rounded-lg bg-indigo-600 px-3.5 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              {pick('Free account banao', 'Sign up free')}
            </Link>
          </div>
        )}

        {/* The card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/60 px-5 py-3.5">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
              {card.difficulty}
            </span>
            {!isGuest && card.reps > 0 && (
              <span className="ml-auto font-mono text-xs text-slate-400">
                {card.reps}× {pick('dekha', 'seen')}
              </span>
            )}
          </div>

          <div className="p-5 sm:p-7">
            <h1 className="text-2xl font-bold tracking-tight sm:text-[26px]">{card.title}</h1>

            {!revealed ? (
              <>
                <p className="mt-2.5 text-slate-500">
                  {pick('Yaad hai? Mann mein recall karo, phir reveal karo.', 'Remember it? Recall it in your head, then reveal.')}
                </p>
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="mt-6 w-full rounded-2xl border-2 border-dashed border-slate-300 py-10 font-semibold text-indigo-600 transition hover:border-indigo-300 hover:bg-slate-50"
                >
                  {pick('Answer dekhne ke liye tap karo', 'Tap to reveal the answer')}
                  <span className="mt-1.5 block font-mono text-[11px] font-normal text-slate-400">space</span>
                </button>
              </>
            ) : (
              <div className="mt-5 flex flex-col gap-4">
                {card.keyPoints?.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {pick('Key points', 'Key points')}
                      </span>
                      <span className="h-px flex-1 bg-slate-100" />
                    </span>
                    {card.keyPoints.map((k, i) => (
                      <span key={i} className="flex gap-3">
                        <span className="w-4 shrink-0 font-mono text-xs text-indigo-600">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 leading-relaxed text-slate-700">{k}</span>
                      </span>
                    ))}
                  </div>
                )}

                {card.dailyLifeExample && (
                  <div className="flex gap-3.5 rounded-2xl bg-amber-50 p-4">
                    <Icon name="lightbulb" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    <p className="leading-relaxed text-amber-900">{card.dailyLifeExample}</p>
                  </div>
                )}

                <Link
                  href={`/concepts/${card.slug}`}
                  className="flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-semibold text-indigo-600 hover:underline"
                >
                  {pick('Poora concept padho', 'Read the full concept')}
                  <Icon name="arrow-right" className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Ratings that say what they schedule */}
        {revealed && (
          <div className="flex flex-col gap-2.5">
            <p className="text-center text-sm text-slate-500">
              {pick('Kitna yaad tha?', 'How well did you remember?')}
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {RATINGS.map((r, i) => {
                const days = nextInterval(r.key, card.intervalDays, card.ease);
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => rate(r.key)}
                    className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-3.5 font-semibold text-white transition ${r.color}`}
                  >
                    {pick(r.hi, r.label)}
                    {!isGuest && (
                      <span className="text-[11px] font-normal opacity-90">
                        {days === 1
                          ? pick('kal phir', 'tomorrow')
                          : pick(`${days} din mein`, `in ${days} days`)}
                      </span>
                    )}
                    <span className="font-mono text-[10px] font-normal opacity-70">{i + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
