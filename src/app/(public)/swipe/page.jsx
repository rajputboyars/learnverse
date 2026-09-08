'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import SwipeDeck from '@/components/swipe/SwipeDeck';
import { ConceptFace, QuizFace } from '@/components/swipe/SwipeFaces';
import { ErrorState, SkeletonCard } from '@/components/ui/States';

const SHELL = 'mx-auto w-full max-w-xl px-4 sm:px-6';

const SECTIONS = [
  { id: 'concepts', label: 'Concepts', icon: 'book-open', blurb: 'One idea per card, with a real-life example.' },
  { id: 'quiz', label: 'Quiz', icon: 'question', blurb: 'Answer first, read after. No XP — this is practice.' },
];

// The deck lives in the URL so the phone tab bar can point straight at either
// one, and so a shared link opens the deck it promised.
export default function SwipePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <Swipe />
    </Suspense>
  );
}

function Swipe() {
  const { status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const section = params.get('deck') === 'quiz' ? 'quiz' : 'concepts';

  function setSection(next) {
    router.replace(`/swipe?deck=${next}`, { scroll: false });
  }

  const [decks, setDecks] = useState({ concepts: null, quiz: null });
  const [error, setError] = useState('');
  const [score, setScore] = useState({ tried: 0, right: 0 });
  const [savedCount, setSavedCount] = useState(0);
  const [toast, setToast] = useState('');

  // Pages already pulled, so refilling the deck does not restart from the top.
  const pageRef = useRef(0);

  const loadMore = useCallback(async () => {
    try {
      const res = await fetch(`/api/feed?page=${pageRef.current}&filter=concepts`);
      if (!res.ok) throw new Error('Could not load cards');
      const body = await res.json();
      pageRef.current += 1;

      setDecks((d) => ({
        concepts: [...(d.concepts || []), ...body.items],
        // The quiz deck is the same material filtered to cards that actually
        // carry a question, so the two sections never disagree about content.
        quiz: [...(d.quiz || []), ...body.items.filter((i) => i.quickQuestion)],
      }));
      return body.hasMore;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }, []);

  useEffect(() => {
    // Two pages up front: enough to fill both decks before the first swipe.
    loadMore().then((more) => more && loadMore());
  }, [loadMore]);

  function flash(message) {
    setToast(message);
    setTimeout(() => setToast(''), 1800);
  }

  async function save(item) {
    setSavedCount((n) => n + 1);
    if (status !== 'authenticated') {
      flash('Saved for this session — log in to keep it');
      return;
    }
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conceptId: item.id }),
      });
      const body = await res.json();
      // The endpoint toggles, so a card already bookmarked would come back
      // false — say what actually happened rather than always claiming a save.
      flash(body.bookmarked ? 'Saved to favourites' : 'Removed from favourites');
    } catch {
      flash('Could not save that');
    }
  }

  const deck = decks[section];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className={`${SHELL} py-6`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Swipe to learn</h1>
            <p className="mt-1 text-sm text-slate-600">
              {SECTIONS.find((s) => s.id === section).blurb}
            </p>
          </div>
          <Link href="/feed" className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
            <Icon name="bars" className="mr-1.5 h-3 w-3" />List view
          </Link>
        </div>

        {/* Two decks, kept separate */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                section === s.id
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200'
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Icon name={s.icon} className="h-3.5 w-3.5" />
                {s.label}
              </span>
              <span className={`mt-0.5 block text-xs ${section === s.id ? 'text-indigo-700' : 'text-slate-500'}`}>
                {decks[s.id] ? `${decks[s.id].length} cards` : 'loading…'}
              </span>
            </button>
          ))}
        </div>

        {/* How the gesture works — stated, because left-to-save is not the
            convention people arrive with. */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-indigo-600">
            <Icon name="arrow-left" className="h-3 w-3" />
            Swipe left to save
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-500">
            Swipe right for next
            <Icon name="arrow-right" className="h-3 w-3" />
          </span>
        </div>

        {/* Session tally */}
        {(score.tried > 0 || savedCount > 0) && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {score.tried > 0 && (
              <span className="rounded-full border border-green-300 bg-green-50 px-3 py-1 font-medium text-green-800">
                <Icon name="check-circle" className="mr-1 h-3 w-3" />
                {score.right}/{score.tried} right
              </span>
            )}
            {savedCount > 0 && (
              <span className="rounded-full border border-indigo-300 bg-indigo-50 px-3 py-1 font-medium text-indigo-700">
                <Icon name="bookmark" className="mr-1 h-3 w-3" />
                {savedCount} saved
              </span>
            )}
          </div>
        )}

        <div className="mt-5">
          {error ? (
            <ErrorState message={error} onRetry={() => loadMore()} />
          ) : !deck ? (
            <SkeletonCard lines={8} />
          ) : (
            <SwipeDeck
              key={section}
              items={deck}
              onSave={save}
              onEmpty={loadMore}
              renderCard={(item) =>
                section === 'quiz' ? (
                  <QuizFace
                    item={item}
                    onAnswered={(correct) =>
                      setScore((s) => ({ tried: s.tried + 1, right: s.right + (correct ? 1 : 0) }))
                    }
                  />
                ) : (
                  <ConceptFace item={item} />
                )
              }
              emptyState={
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                  <Icon name="check-circle" className="mx-auto h-7 w-7 text-green-500" />
                  <p className="mt-3 font-semibold text-slate-700">Deck finished</p>
                  <p className="mx-auto mt-1 max-w-xs text-sm text-slate-500">
                    {score.tried > 0
                      ? `You answered ${score.right} of ${score.tried} correctly.`
                      : 'You have been through every card in this deck.'}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => loadMore()}
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      Load more cards
                    </button>
                    <Link href="/dashboard" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50">
                      Your progress
                    </Link>
                  </div>
                </div>
              }
            />
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
