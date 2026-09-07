'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SourceBadge from '@/components/ai/SourceBadge';
import { EmptyState, ErrorState, SkeletonCard, SuccessNote } from '@/components/ui/States';

export default function AdminTrendsPage() {
  const [state, setState] = useState({ loading: true, error: '', snapshots: [], capturable: [] });
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState('');

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    fetch('/api/admin/trends')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load snapshots'))))
      .then((d) => setState({ loading: false, error: '', ...d }))
      .catch((e) => setState((s) => ({ ...s, loading: false, error: e.message })));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function flash(message) {
    setNote(message);
    setTimeout(() => setNote(''), 2500);
  }

  async function capture(resultId) {
    setBusy(resultId);
    try {
      const res = await fetch('/api/admin/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultId }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'Could not capture that');
      flash(`Captured ${body.snapshot.entryCount} skills.`);
      load();
    } catch (e) {
      flash(e.message);
    } finally {
      setBusy('');
    }
  }

  async function patch(id, update, message) {
    const res = await fetch(`/api/admin/trends/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    });
    if (!res.ok) return flash('That did not work');
    flash(message);
    load();
  }

  async function remove(id) {
    const res = await fetch(`/api/admin/trends/${id}`, { method: 'DELETE' });
    if (!res.ok) return flash('Could not delete that');
    flash('Snapshot deleted.');
    load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Trend snapshots</h1>
          <p className="mt-1 max-w-2xl text-slate-500">
            /trends is built from these. Movement between snapshots is measured, never generated —
            so a scope needs at least two captures before it can show any change.
          </p>
        </div>
        <Link href="/trends" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          View public trends
        </Link>
      </div>

      {note && <div className="mt-4"><SuccessNote>{note}</SuccessNote></div>}

      {state.loading ? (
        <div className="mt-6 space-y-3"><SkeletonCard lines={2} /><SkeletonCard lines={2} /></div>
      ) : state.error ? (
        <div className="mt-6"><ErrorState message={state.error} onRetry={load} /></div>
      ) : (
        <>
          {/* Capturable results */}
          <section className="mt-8">
            <h2 className="font-semibold">Ready to capture</h2>
            <p className="mt-1 text-sm text-slate-500">
              Trending-skills results that have not been captured yet. A demo-mode result stays
              labelled demo after capture — sample data never becomes real trend data.
            </p>
            {!state.capturable.length ? (
              <div className="mt-3">
                <EmptyState
                  icon="sparkles"
                  title="Nothing waiting"
                  description="Run a Trending Skills analysis from the AI Tools page, then come back to capture it."
                />
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                {state.capturable.map((r) => (
                  <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="min-w-0">
                      <p className="font-medium">
                        {r.inputs?.industry || 'Web development'} · {r.inputs?.location || 'India'} ·{' '}
                        {r.inputs?.experienceLevel || 'All levels'}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {r.skillCount} skills — {r.topSkills.join(', ')}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {new Date(r.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <SourceBadge source={r.source} model={r.model} />
                      <button
                        onClick={() => capture(r.id)}
                        disabled={busy === r.id}
                        className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                      >
                        <Icon name={busy === r.id ? 'spinner' : 'save'} spin={busy === r.id} className="mr-1.5 h-3.5 w-3.5" />
                        Capture
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Existing snapshots */}
          <section className="mt-10">
            <h2 className="font-semibold">Captured snapshots</h2>
            {!state.snapshots.length ? (
              <div className="mt-3">
                <EmptyState icon="clock" title="No snapshots yet" description="Capture one above to start the history." />
              </div>
            ) : (
              <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[46rem] text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Captured</th>
                      <th className="px-4 py-3">Scope</th>
                      <th className="px-4 py-3">Source</th>
                      <th className="px-4 py-3">Skills</th>
                      <th className="px-4 py-3">Visible</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {state.snapshots.map((s) => (
                      <tr key={s.id}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {new Date(s.capturedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          {s.scope.industry} · {s.scope.location}
                          <span className="block text-xs text-slate-400">{s.scope.experienceLevel}</span>
                        </td>
                        <td className="px-4 py-3"><SourceBadge source={s.source} model={s.model} /></td>
                        <td className="px-4 py-3 tabular-nums">{s.entryCount}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => patch(s.id, { published: !s.published }, s.published ? 'Hidden from /trends.' : 'Published to /trends.')}
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                              s.published
                                ? 'border-green-300 bg-green-50 text-green-800'
                                : 'border-slate-300 bg-slate-50 text-slate-600'
                            }`}
                          >
                            {s.published ? 'Published' : 'Hidden'}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => remove(s.id)} className="text-xs font-medium text-red-600 hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
