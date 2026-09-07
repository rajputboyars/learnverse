'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { EmptyState, ErrorState, SkeletonCard, SuccessNote } from '@/components/ui/States';

const FILTERS = [
  { id: 'queue', label: 'Needs review' },
  { id: 'reported', label: 'Reported' },
  { id: 'verified', label: 'Published (community)' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'all', label: 'All' },
];

const VERDICT_STYLE = {
  clean: 'border-green-300 bg-green-50 text-green-800',
  concerns: 'border-amber-300 bg-amber-50 text-amber-900',
  reject: 'border-red-300 bg-red-50 text-red-700',
};

const SEVERITY_STYLE = {
  high: 'border-red-300 bg-red-50 text-red-700',
  medium: 'border-amber-300 bg-amber-50 text-amber-900',
  low: 'border-slate-300 bg-slate-50 text-slate-600',
};

export default function AdminPromptsPage() {
  const [filter, setFilter] = useState('queue');
  const [state, setState] = useState({ loading: true, error: '', prompts: [], counts: {}, reportedCount: 0 });
  const [openId, setOpenId] = useState(null);
  const [note, setNote] = useState('');

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    fetch(`/api/admin/prompts?filter=${filter}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load the review queue'))))
      .then((d) => setState({ loading: false, error: '', ...d }))
      .catch((e) => setState((s) => ({ ...s, loading: false, error: e.message })));
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  function flash(message) {
    setNote(message);
    setTimeout(() => setNote(''), 2500);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Prompt moderation</h1>
          <p className="mt-1 text-slate-500">
            Automated review is a first pass — it can reject, but only you can publish.
          </p>
        </div>
        <Link href="/prompts" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          View the public library
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const count =
            f.id === 'queue'
              ? (state.counts.pending || 0) + (state.counts.ai_reviewed || 0)
              : f.id === 'reported'
                ? state.reportedCount
                : f.id === 'all'
                  ? Object.values(state.counts).reduce((a, b) => a + b, 0)
                  : state.counts[f.id === 'verified' ? 'verified' : f.id] || 0;
          return (
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
              {count > 0 && <span className="ml-1.5 text-xs opacity-60">{count}</span>}
            </button>
          );
        })}
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
        ) : !state.prompts.length ? (
          <EmptyState
            icon="check-circle"
            title={filter === 'queue' ? 'Queue is empty' : 'Nothing here'}
            description={
              filter === 'queue'
                ? 'Every submission has been dealt with.'
                : 'No prompts match this filter.'
            }
          />
        ) : (
          state.prompts.map((p) => (
            <ReviewRow
              key={p.id}
              prompt={p}
              open={openId === p.id}
              onToggle={() => setOpenId(openId === p.id ? null : p.id)}
              onDone={(message) => {
                flash(message);
                load();
              }}
              verdictStyle={VERDICT_STYLE}
              severityStyle={SEVERITY_STYLE}
            />
          ))
        )}
      </div>
    </div>
  );
}

function ReviewRow({ prompt, open, onToggle, onDone, verdictStyle, severityStyle }) {
  const [note, setNote] = useState(prompt.reviewNote || '');
  const [edit, setEdit] = useState(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  async function act(action) {
    setBusy(action);
    setError('');
    try {
      const res = await fetch(`/api/admin/prompts/${prompt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, note, ...(edit || {}) }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'That did not work');
      onDone(
        action === 'verify'
          ? `Published “${prompt.title}”.`
          : action === 'reject'
            ? 'Rejected, and the author has been told.'
            : action === 'revalidate'
              ? `Re-checked: ${body.prompt.aiReview?.verdict}.`
              : 'Updated.'
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy('');
    }
  }

  async function remove() {
    setBusy('delete');
    try {
      const res = await fetch(`/api/admin/prompts/${prompt.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Could not delete that');
      onDone('Deleted.');
    } catch (e) {
      setError(e.message);
      setBusy('');
    }
  }

  const review = prompt.aiReview;
  const btn = 'rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50';

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <button onClick={onToggle} className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left hover:bg-slate-50">
        <div className="min-w-0">
          <p className="font-semibold">{prompt.title}</p>
          <p className="mt-0.5 text-sm text-slate-500">
            {prompt.authorName} · {prompt.category} · {new Date(prompt.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {prompt.reportCount > 0 && (
            <span className="rounded-full border border-red-300 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
              <Icon name="flag" className="mr-1 h-3 w-3" />{prompt.reportCount}
            </span>
          )}
          {review?.verdict ? (
            <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${verdictStyle[review.verdict]}`}>
              AI: {review.verdict}
            </span>
          ) : (
            <span className="rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-xs text-slate-500">
              not auto-checked
            </span>
          )}
          <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs capitalize text-slate-600">
            {prompt.status.replace('_', ' ')}
          </span>
          <Icon name="chevron-down" className={`h-3 w-3 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="space-y-5 border-t border-slate-100 bg-slate-50/50 p-5">
          {/* Automated review */}
          {review?.verdict ? (
            <div className={`rounded-xl border p-4 ${verdictStyle[review.verdict]}`}>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Icon name="robot" className="h-4 w-4" />
                Automated review — {review.verdict}
                {review.model && <span className="font-normal opacity-70">· {review.model}</span>}
              </p>
              <p className="mt-1.5 text-sm">{review.summary}</p>
              {!!Object.keys(review.scores || {}).length && (
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  {Object.entries(review.scores).map(([k, v]) => (
                    <span key={k} className="capitalize">{k}: <strong>{v}</strong>/10</span>
                  ))}
                </div>
              )}
              {!!review.flags?.length && (
                <ul className="mt-3 space-y-1.5">
                  {review.flags.map((f, i) => (
                    <li key={i} className="flex flex-wrap items-center gap-2 text-sm">
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${severityStyle[f.severity] || severityStyle.low}`}>
                        {f.type}
                      </span>
                      {f.detail}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-xs opacity-70">
                Advisory only. Read the prompt yourself before publishing it.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              <p className="font-medium">No automated review on this one.</p>
              <p className="mt-1">
                {review?.error || 'Set a server AI key (ANTHROPIC_API_KEY / OPENAI_API_KEY / GEMINI_API_KEY) to enable the first pass.'}
              </p>
            </div>
          )}

          {/* Reports */}
          {!!prompt.reports?.length && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-800">
                {prompt.reports.length} open report{prompt.reports.length > 1 ? 's' : ''}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-red-700">
                {prompt.reports.map((r) => (
                  <li key={r.id}>
                    <span className="font-medium capitalize">{r.reason}</span>
                    {r.detail ? ` — ${r.detail}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* The prompt */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">The prompt</p>
              <button
                onClick={() => setEdit(edit ? null : { title: prompt.title, content: prompt.content })}
                className="text-sm text-indigo-600 hover:underline"
              >
                {edit ? 'Cancel edit' : 'Edit before publishing'}
              </button>
            </div>
            {edit ? (
              <div className="mt-2 space-y-2">
                <input
                  value={edit.title}
                  onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
                />
                <textarea
                  rows={10}
                  value={edit.content}
                  onChange={(e) => setEdit({ ...edit, content: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 font-mono text-xs outline-none focus:border-indigo-400"
                />
              </div>
            ) : (
              <pre className="thin-scroll mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-700">
                {prompt.content}
              </pre>
            )}
            {!!prompt.variables.length && (
              <p className="mt-2 text-xs text-slate-500">
                Fields: {prompt.variables.map((v) => v.label).join(', ')}
              </p>
            )}
          </div>

          {/* Decision */}
          <div>
            <label htmlFor={`note-${prompt.id}`} className="block text-sm font-medium text-slate-700">
              Note to the author (sent with a rejection)
            </label>
            <input
              id={`note-${prompt.id}`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Why this decision — the author sees this."
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
          </div>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <div className="flex flex-wrap items-center gap-2">
            {prompt.status !== 'verified' && (
              <button
                onClick={() => act('verify')}
                disabled={Boolean(busy)}
                className="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                <Icon name={busy === 'verify' ? 'spinner' : 'check'} spin={busy === 'verify'} className="mr-1.5 h-3.5 w-3.5" />
                Publish
              </button>
            )}
            {prompt.status !== 'rejected' && (
              <button onClick={() => act('reject')} disabled={Boolean(busy)} className={`${btn} text-red-700`}>
                <Icon name="x" className="mr-1.5 h-3.5 w-3.5" />Reject
              </button>
            )}
            {['verified', 'rejected'].includes(prompt.status) && (
              <button onClick={() => act('requeue')} disabled={Boolean(busy)} className={btn}>
                <Icon name="rotate" className="mr-1.5 h-3.5 w-3.5" />Back to queue
              </button>
            )}
            <button onClick={() => act('revalidate')} disabled={Boolean(busy)} className={btn}>
              <Icon name={busy === 'revalidate' ? 'spinner' : 'robot'} spin={busy === 'revalidate'} className="mr-1.5 h-3.5 w-3.5" />
              Re-run automated review
            </button>
            <Link href={`/prompts/${prompt.slug}`} className={`${btn} ml-auto`} target="_blank">
              <Icon name="external-link" className="mr-1.5 h-3.5 w-3.5" />Open
            </Link>
            <button onClick={remove} disabled={Boolean(busy)} className={`${btn} text-red-700`}>
              <Icon name="trash" className="mr-1.5 h-3.5 w-3.5" />Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
