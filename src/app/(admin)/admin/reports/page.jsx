'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { EmptyState, ErrorState, SkeletonCard, SuccessNote } from '@/components/ui/States';

const FILTERS = [
  { id: 'open', label: 'Open' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'dismissed', label: 'Dismissed' },
  { id: 'all', label: 'All' },
];

const REASON_TONE = {
  harmful: 'border-red-300 bg-red-50 text-red-700',
  spam: 'border-amber-300 bg-amber-50 text-amber-900',
  misleading: 'border-amber-300 bg-amber-50 text-amber-900',
  'low-quality': 'border-slate-300 bg-slate-50 text-slate-600',
  other: 'border-slate-300 bg-slate-50 text-slate-600',
};

export default function AdminReportsPage() {
  const [filter, setFilter] = useState('open');
  const [state, setState] = useState({ loading: true, error: '', reports: [], counts: {} });
  const [note, setNote] = useState('');

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    fetch(`/api/admin/reports?status=${filter}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load reports'))))
      .then((d) => setState({ loading: false, error: '', ...d }))
      .catch((e) => setState((s) => ({ ...s, loading: false, error: e.message })));
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  async function close(id, status) {
    const res = await fetch(`/api/admin/reports/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setNote('That did not work');
    } else {
      setNote(status === 'resolved' ? 'Marked resolved.' : 'Dismissed.');
      load();
    }
    setTimeout(() => setNote(''), 2500);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Reported content</h1>
          <p className="mt-1 max-w-2xl text-slate-500">
            A report is one person&rsquo;s opinion until someone looks at it — nothing is hidden
            automatically. Resolve after acting on the prompt, dismiss when the complaint does not
            hold.
          </p>
        </div>
        <Link href="/admin/prompts" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          Moderation queue
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${
              filter === f.id
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f.label}
            {state.counts[f.id] > 0 && <span className="ml-1.5 text-xs opacity-60">{state.counts[f.id]}</span>}
          </button>
        ))}
      </div>

      {note && <div className="mt-4"><SuccessNote>{note}</SuccessNote></div>}

      <div className="mt-6 space-y-3">
        {state.loading ? (
          <>
            <SkeletonCard lines={2} />
            <SkeletonCard lines={2} />
          </>
        ) : state.error ? (
          <ErrorState message={state.error} onRetry={load} />
        ) : !state.reports.length ? (
          <EmptyState
            icon="check-circle"
            title={filter === 'open' ? 'Nothing reported' : 'Nothing here'}
            description={
              filter === 'open'
                ? 'No open reports waiting on you.'
                : 'No reports match this filter.'
            }
          />
        ) : (
          state.reports.map((r) => (
            <div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${REASON_TONE[r.reason] || REASON_TONE.other}`}>
                      {r.reason.replace('-', ' ')}
                    </span>
                    {r.status !== 'open' && (
                      <span className="rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-xs capitalize text-slate-600">
                        {r.status}
                      </span>
                    )}
                    <span className="text-xs text-slate-400">
                      reported by {r.reporter} · {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {r.prompt ? (
                    <p className="mt-2 font-semibold">
                      <Link href={`/prompts/${r.prompt.slug}`} target="_blank" className="hover:text-indigo-600">
                        {r.prompt.title}
                      </Link>
                      <span className="ml-2 text-sm font-normal text-slate-500">
                        by {r.prompt.authorName} · {r.prompt.status.replace('_', ' ')}
                      </span>
                    </p>
                  ) : (
                    <p className="mt-2 font-medium text-slate-500">
                      The prompt this referred to has been deleted.
                    </p>
                  )}

                  {r.detail && <p className="mt-1.5 text-sm text-slate-600">“{r.detail}”</p>}
                </div>

                {r.status === 'open' && (
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      onClick={() => close(r.id, 'resolved')}
                      className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      <Icon name="check" className="mr-1.5 h-3.5 w-3.5" />Resolved
                    </button>
                    <button
                      onClick={() => close(r.id, 'dismissed')}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
