'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import PromptRunner from '@/components/ai/PromptRunner';
import { EmptyState, ErrorState, SkeletonCard } from '@/components/ui/States';
import { useLang } from '@/components/LanguageProvider';
import { ActionCard, ConceptCard, MilestoneCard, PromptCard } from './FeedCards';

const FILTERS = [
  { id: 'all', hi: 'Tumhare liye', en: 'For you' },
  { id: 'concepts', hi: 'Concepts', en: 'Concepts' },
  { id: 'community', hi: 'Community', en: 'Community' },
];

/**
 * The scrollable feed.
 *
 * Infinite scroll, with one difference from the feeds this borrows from: it
 * ends. When the content runs out it says so and offers somewhere to go, rather
 * than recycling cards to keep the scroll alive. A session here is supposed to
 * finish.
 *
 * The counter in the corner exists for the same reason — it tells you what the
 * last ten minutes actually produced, which is the opposite of losing track.
 */
export default function LearningFeed() {
  const { pick } = useLang();
  const { status } = useSession();
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answered, setAnswered] = useState({ tried: 0, right: 0 });
  const [runningTemplate, setRunningTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);

  const sentinel = useRef(null);
  const loadingRef = useRef(false);

  const load = useCallback(
    async (nextPage, replace = false) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/feed?page=${nextPage}&filter=${filter}`);
        if (!res.ok) throw new Error(pick('Feed load nahi ho paayi', 'Could not load the feed'));
        const body = await res.json();
        setItems((prev) => (replace ? body.items : [...prev, ...body.items]));
        setHasMore(body.hasMore);
        setPage(nextPage);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    },
    [filter]
  );

  // Reload from the top whenever the filter changes.
  useEffect(() => {
    setItems([]);
    setHasMore(true);
    load(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // Templates, so an inline action card can open the same runner the rest of
  // the app uses.
  useEffect(() => {
    fetch('/api/ai/templates')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setTemplates(d.templates))
      .catch(() => {});
  }, []);

  // Load the next page when the sentinel comes into view.
  useEffect(() => {
    const node = sentinel.current;
    if (!node || !hasMore) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) load(page + 1);
      },
      { rootMargin: '600px' } // start fetching before they reach the bottom
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, page, load]);

  function recordAnswer(correct) {
    setAnswered((a) => ({ tried: a.tried + 1, right: a.right + (correct ? 1 : 0) }));
  }

  const runner = templates.find((t) => t.id === runningTemplate);

  return (
    <div className="relative">
      {/* Filters */}
      <div className="sticky top-[6.5rem] z-20 -mx-4 mb-4 bg-slate-50/90 px-4 py-2 backdrop-blur sm:top-[6.75rem]">
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                filter === f.id
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {pick(f.hi, f.en)}
            </button>
          ))}

          {/* What this scroll has actually produced. */}
          {answered.tried > 0 && (
            <span className="ml-auto rounded-full border border-green-300 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-800">
              <Icon name="check-circle" className="mr-1.5 h-3 w-3" />
              {answered.right}/{answered.tried} {pick('sahi is session mein', 'right this session')}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4" aria-live="polite" aria-busy={loading}>
        {items.map((item) => {
          if (item.type === 'concept') {
            return <ConceptCard key={item.id} item={item} onOpenQuiz={recordAnswer} />;
          }
          if (item.type === 'milestone') return <MilestoneCard key={item.id} item={item} />;
          if (item.type === 'prompt') return <PromptCard key={item.id} item={item} />;
          if (item.type === 'action') {
            return <ActionCard key={item.id} item={item} onRun={setRunningTemplate} />;
          }
          return null;
        })}

        {loading && (
          <>
            <SkeletonCard lines={4} />
            <SkeletonCard lines={3} />
          </>
        )}

        {error && <ErrorState message={error} onRetry={() => load(page)} />}

        {/* The sentinel that drives the infinite scroll. */}
        <div ref={sentinel} aria-hidden className="h-1" />

        {/* Nothing matched the filter — which is not the same as reaching the
            end of the feed, and should not claim to be. */}
        {!loading && !error && items.length === 0 && (
          <EmptyState
            icon="filter"
            title={
              filter === 'community'
                ? pick('Abhi koi community activity nahi', 'No community activity yet')
                : pick('Abhi yahan kuch nahi hai', 'Nothing here yet')
            }
            description={
              filter === 'community'
                ? pick(
                    'Streak cards tab dikhte hain jab learners chalna shuru karte hain. Kuch din baad dekhna.',
                    'Streak cards appear once learners get going. Check back in a few days.'
                  )
                : pick(
                    'Is filter ke liye abhi koi content nahi hai.',
                    'There is no content for this filter right now.'
                  )
            }
          />
        )}

        {/* It ends, on purpose. */}
        {!hasMore && !loading && items.length > 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center">
            <Icon name="check-circle" className="mx-auto h-7 w-7 text-green-500" />
            <p className="mt-3 font-semibold text-slate-700">
              {pick('Bas, poori feed yahi thi.', 'That is the whole feed.')}
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
              {pick(
                'Wahi cards baar-baar nahi ghumenge — abhi jitna tha sab dekh liya.',
                'No infinite loop of the same cards — you have seen everything there is right now.'
              )}
              {answered.tried > 0 &&
                pick(
                  ` Raaste mein tumne ${answered.tried} mein se ${answered.right} sawaal sahi kiye.`,
                  ` You answered ${answered.right} of ${answered.tried} questions correctly along the way.`
                )}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link href="/courses" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                {pick('Dhang se ek course chuno', 'Pick a course properly')}
              </Link>
              <Link href="/dashboard" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                {pick('Tumhari progress', 'Your progress')}
              </Link>
            </div>
          </div>
        )}
      </div>

      {runner && (
        <PromptRunner
          template={runner}
          templates={templates}
          authed={status === 'authenticated'}
          onClose={() => setRunningTemplate(null)}
        />
      )}
    </div>
  );
}
