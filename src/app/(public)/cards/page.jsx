'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import ShareCard from '@/components/share/ShareCard';
import { EmptyState, ErrorState, LoginGate, SkeletonCard } from '@/components/ui/States';

const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

/**
 * Builds the offered cards from real recorded milestones.
 *
 * Every card is a statement the user will publish under their own name, so each
 * one is assembled from a stored number. Nothing is rounded up, and nothing is
 * offered before it is true — a two-day streak produces no streak card.
 */
function buildCards({ achievements, insights, stats }) {
  const cards = [];

  if (stats.currentStreak >= 3) {
    cards.push({
      kind: 'streak',
      theme: 'amber',
      eyebrow: 'Learning streak',
      stat: String(stats.currentStreak),
      statLabel: `day${stats.currentStreak === 1 ? '' : 's'} in a row`,
      headline: 'Showing up, one day at a time',
      body: 'Consistency beats intensity. Built on Learnverse.',
      chips: ['#learning', '#consistency'],
    });
  }

  if (stats.conceptsCompleted >= 10) {
    cards.push({
      kind: 'milestone',
      theme: 'indigo',
      eyebrow: 'Concepts completed',
      stat: String(stats.conceptsCompleted),
      statLabel: 'concepts understood',
      headline: 'Chipping away at the fundamentals',
      body: 'Every one of these came with a daily-life example and a quiz.',
      chips: ['#webdev', '#learninpublic'],
    });
  }

  for (const a of achievements) {
    if (a.kind === 'course') {
      cards.push({
        kind: 'course',
        theme: 'green',
        eyebrow: 'Course completed',
        headline: a.title.replace(/^Finished the /, ''),
        body: a.detail,
        chips: ['#course', '#learninpublic'],
      });
    }
    if (a.kind === 'progress') {
      cards.push({
        kind: 'progress',
        theme: 'slate',
        eyebrow: 'In progress',
        headline: a.title,
        body: a.detail,
        chips: ['#learninpublic'],
      });
    }
  }

  for (const i of insights) {
    // A demo-mode result is sample data, so it never becomes a public claim.
    if (i.source === 'demo') continue;
    cards.push({
      kind: 'insight',
      theme: 'indigo',
      eyebrow: 'What I found out',
      headline: i.title,
      body: i.detail,
      chips: ['#ai', '#career'],
    });
  }

  return cards;
}

export default function CardsPage() {
  const { data: session, status } = useSession();
  const [state, setState] = useState({ loading: true, error: '', cards: [] });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/me/achievements')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load your milestones'))))
      .then((d) => {
        const cards = buildCards(d).map((c) => ({ ...c, name: session?.user?.name }));
        setState({ loading: false, error: '', cards });
        setSelected(cards[0] || null);
      })
      .catch((e) => setState({ loading: false, error: e.message, cards: [] }));
  }, [status, session?.user?.name]);

  if (status === 'loading') {
    return <div className={`${SHELL} py-12`}><SkeletonCard lines={4} /></div>;
  }
  if (status !== 'authenticated') {
    return (
      <div className={`${SHELL} py-12`}>
        <h1 className="text-3xl font-bold">Share cards</h1>
        <div className="mt-6 max-w-lg"><LoginGate message="Log in to make a card from your own progress." /></div>
      </div>
    );
  }

  return (
    <div className={`${SHELL} py-10`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Share cards</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            A clean image of something you actually did. Download it, or copy the caption and post
            it wherever you like — every number on a card comes from your own record.
          </p>
        </div>
        <Link href="/create" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          <Icon name="pen" className="mr-1.5 h-3.5 w-3.5" />Write a post instead
        </Link>
      </div>

      {state.loading ? (
        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <SkeletonCard lines={3} />
          <SkeletonCard lines={6} />
        </div>
      ) : state.error ? (
        <div className="mt-8"><ErrorState message={state.error} /></div>
      ) : !state.cards.length ? (
        <div className="mt-8">
          <EmptyState
            icon="medal"
            title="No cards to make yet"
            description="Cards are built from real milestones — a finished course, a streak of three days or more, ten concepts completed. Do the thing first and the card appears here."
            action={
              <Link href="/courses" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                Go and learn something
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {state.cards.length} card{state.cards.length === 1 ? '' : 's'} available
            </h2>
            {state.cards.map((c, i) => (
              <button
                key={`${c.kind}-${i}`}
                onClick={() => setSelected(c)}
                className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-left transition-colors ${
                  selected === c ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 bg-white hover:border-indigo-200'
                }`}
              >
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {c.eyebrow}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium">{c.headline}</span>
                </span>
                {c.stat && <span className="shrink-0 text-lg font-bold text-indigo-600">{c.stat}</span>}
              </button>
            ))}
          </div>

          <div>
            {selected && <ShareCard card={selected} />}
            <p className="mt-4 text-xs text-slate-400">
              Cards are generated in your browser and are not uploaded anywhere. Nothing is posted
              for you — downloading or copying is as far as this goes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
