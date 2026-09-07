'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import BarChart from '@/components/analytics/BarChart';
import { EmptyState, ErrorState, SkeletonCard } from '@/components/ui/States';

export default function AdminAnalyticsPage() {
  const [state, setState] = useState({ loading: true, error: '', data: null });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    fetch('/api/admin/analytics')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load analytics'))))
      .then((data) => setState({ loading: false, error: '', data }))
      .catch((e) => setState({ loading: false, error: e.message, data: null }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (state.loading) {
    return (
      <div className="space-y-4">
        <SkeletonCard lines={2} />
        <SkeletonCard lines={5} />
      </div>
    );
  }
  if (state.error) return <ErrorState message={state.error} onRetry={load} />;

  const d = state.data;
  const demoShare = d.ai.runs ? Math.round(((d.ai.bySource.demo || 0) / d.ai.runs) * 100) : 0;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Platform analytics</h1>
          <p className="mt-1 text-slate-500">
            Aggregate numbers only — usage is counted, never itemised against a person.
          </p>
        </div>
        <button onClick={load} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          <Icon name="rotate" className="mr-1.5 h-3.5 w-3.5" />Refresh
        </button>
      </div>

      {/* Headline */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Users" value={d.content.users} sub={`${d.content.newUsers30} joined in 30 days`} />
        <Tile label="Active (30 days)" value={d.engagement.activeUsers30} sub={`${d.engagement.activeUsers7} in the last 7`} />
        <Tile label="AI runs" value={d.ai.runs} sub={`${d.ai.runs30} in 30 days`} />
        <Tile
          label="Open reports"
          value={d.prompts.openReports}
          sub={d.prompts.openReports ? 'needs attention' : 'nothing waiting'}
          tone={d.prompts.openReports ? 'amber' : 'default'}
        />
      </div>

      {/* AI usage */}
      <section className="mt-10">
        <h2 className="font-semibold">AI usage</h2>
        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          <Panel title="Runs per day (30 days)">
            {d.ai.runs30 ? (
              <BarChart data={d.ai.daily} height={120} />
            ) : (
              <p className="py-6 text-center text-sm text-slate-500">No runs in the last 30 days.</p>
            )}
          </Panel>

          <Panel title="Real vs demo">
            <div className="space-y-3">
              <Row label="Live model runs" value={d.ai.bySource.ai || 0} />
              <Row label="Demo-mode runs" value={d.ai.bySource.demo || 0} />
              <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                {demoShare}% of all runs returned sample data because no provider was connected.
                {demoShare > 50 && ' Worth making the connection step more obvious.'}
              </p>
            </div>
          </Panel>

          <Panel title="Most used actions">
            {!d.ai.byTemplate.length ? (
              <p className="py-6 text-center text-sm text-slate-500">Nothing run yet.</p>
            ) : (
              <div className="space-y-2">
                {d.ai.byTemplate.map((t) => (
                  <div key={t.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate">{t.label}</span>
                    <span className="shrink-0 text-slate-500">
                      {t.runs} run{t.runs === 1 ? '' : 's'} · {t.avgSeconds}s avg
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Providers">
            {!d.ai.connections.length ? (
              <p className="py-6 text-center text-sm text-slate-500">
                Nobody has connected a provider yet.
              </p>
            ) : (
              <div className="space-y-2">
                {d.ai.connections.map((c) => (
                  <div key={c.provider} className="flex items-center justify-between text-sm">
                    <span className="capitalize">{c.provider}</span>
                    <span className="text-slate-500">
                      {c.connected} connected · {c.working} tested working
                    </span>
                  </div>
                ))}
                <div className="mt-3 border-t border-slate-100 pt-3">
                  {d.ai.byProvider.map((p) => (
                    <div key={p.provider} className="flex items-center justify-between text-sm">
                      <span className="capitalize text-slate-500">{p.provider} runs</span>
                      <span className="text-slate-500">{p.runs}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Panel>
        </div>
      </section>

      {/* Library */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Prompt library</h2>
          <Link href="/admin/prompts" className="text-sm font-medium text-indigo-600 hover:underline">
            Moderation queue →
          </Link>
        </div>
        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          <Panel title="By status">
            <div className="space-y-2">
              {['verified', 'ai_reviewed', 'pending', 'rejected'].map((s) => (
                <Row key={s} label={s.replace('_', ' ')} value={d.prompts.byStatus[s] || 0} />
              ))}
            </div>
          </Panel>
          <Panel title="Most used prompts">
            {!d.prompts.top.length ? (
              <p className="py-6 text-center text-sm text-slate-500">Nothing published yet.</p>
            ) : (
              <div className="space-y-2">
                {d.prompts.top.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/prompts/${p.slug}`}
                    className="flex items-center justify-between gap-3 text-sm hover:text-indigo-600"
                  >
                    <span className="truncate">
                      {p.title}
                      {p.origin === 'official' && <span className="ml-1.5 text-xs text-slate-400">official</span>}
                    </span>
                    <span className="shrink-0 text-slate-500">
                      {p.usageCount} runs{p.rating ? ` · ${p.rating}★` : ''}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </Panel>
        </div>
      </section>

      {/* Engagement */}
      <section className="mt-10">
        <h2 className="font-semibold">Engagement</h2>
        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          <Panel title="Streak distribution">
            {d.engagement.streakBuckets.length ? (
              <BarChart data={d.engagement.streakBuckets} valueKey="count" height={120} />
            ) : (
              <p className="py-6 text-center text-sm text-slate-500">No streak data yet.</p>
            )}
          </Panel>
          <Panel title="Recorded learning time">
            <div className="space-y-2">
              <Row label="Hours tracked" value={d.engagement.trackedHours} />
              <Row label="Sessions" value={d.engagement.trackedSessions} />
              <Row label="Posts generated" value={d.posts.total} />
              <Row label="Trend snapshots" value={d.trends.snapshots} />
              {!!d.posts.byPlatform.length && (
                <div className="mt-3 border-t border-slate-100 pt-3">
                  {d.posts.byPlatform.map((p) => (
                    <Row key={p.platform} label={`${p.platform} posts`} value={p.n} muted />
                  ))}
                </div>
              )}
            </div>
          </Panel>
        </div>
      </section>

      {!d.ai.runs && !d.content.users && (
        <div className="mt-10">
          <EmptyState
            icon="chart"
            title="Nothing to report yet"
            description="These numbers fill in as people use the platform."
          />
        </div>
      )}
    </div>
  );
}

function Tile({ label, value, sub, tone }) {
  return (
    <div className={`rounded-2xl border p-5 ${tone === 'amber' ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Row({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={`capitalize ${muted ? 'text-slate-500' : ''}`}>{label}</span>
      <span className={muted ? 'text-slate-500' : 'font-medium'}>{value}</span>
    </div>
  );
}
