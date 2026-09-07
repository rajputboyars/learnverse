'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import { EmptyState, ErrorState, SkeletonCard } from '@/components/ui/States';
import AIResultView from './AIResultView';
import ResultActions from './ResultActions';
import SourceBadge from './SourceBadge';

/** Your past runs, newest first. Expanding one re-renders the full structured result. */
export default function RecentResults({ savedOnly = false, limit = 10 }) {
  const { status } = useSession();
  const [state, setState] = useState({ loading: true, error: '', results: [] });
  const [openId, setOpenId] = useState(null);

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    const params = new URLSearchParams({ limit: String(limit) });
    if (savedOnly) params.set('saved', '1');
    fetch(`/api/ai/results?${params}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load your results'))))
      .then((d) => setState({ loading: false, error: '', results: d.results }))
      .catch((e) => setState({ loading: false, error: e.message, results: [] }));
  }, [savedOnly, limit]);

  useEffect(() => {
    if (status === 'authenticated') load();
    else if (status === 'unauthenticated') setState({ loading: false, error: '', results: [] });
  }, [status, load]);

  if (status !== 'authenticated') return null;
  if (state.loading) return <div className="space-y-3"><SkeletonCard lines={1} /><SkeletonCard lines={1} /></div>;
  if (state.error) return <ErrorState message={state.error} onRetry={load} />;

  if (!state.results.length) {
    return (
      <EmptyState
        icon="sparkles"
        title={savedOnly ? 'Nothing saved yet' : 'No AI results yet'}
        description={
          savedOnly
            ? 'Run an action and hit Save to keep the ones worth coming back to.'
            : 'Run one of the quick actions above — every result you generate is kept here.'
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      {state.results.map((r) => {
        const open = openId === r.id;
        return (
          <div key={r.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <button
              onClick={() => setOpenId(open ? null : r.id)}
              className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-semibold">
                  {r.title}
                  {r.saved && <Icon name="bookmark" className="h-3 w-3 text-indigo-500" />}
                </p>
                <p className="mt-0.5 truncate text-sm text-slate-500">
                  {Object.values(r.inputs || {}).filter(Boolean).slice(0, 3).join(' · ') || 'No inputs'}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <SourceBadge source={r.source} />
                <span className="text-xs text-slate-400">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
                <Icon name="chevron-down" className={`h-3 w-3 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {open && (
              <div className="space-y-5 border-t border-slate-100 bg-slate-50/50 p-5">
                <AIResultView result={r} />
                <ResultActions result={r} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
