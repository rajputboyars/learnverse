'use client';

import { useCallback, useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import SourceBadge from '@/components/ai/SourceBadge';
import { EmptyState, ErrorState, SkeletonCard } from '@/components/ui/States';

const PLATFORM_ICON = { linkedin: 'linkedin', instagram: 'palette', x: 'twitter', reddit: 'comments' };

export default function SavedDrafts() {
  const [state, setState] = useState({ loading: true, error: '', posts: [] });
  const [openId, setOpenId] = useState(null);
  const [draft, setDraft] = useState('');
  const [note, setNote] = useState('');

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    fetch('/api/posts')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load your drafts'))))
      .then((d) => setState({ loading: false, error: '', posts: d.posts }))
      .catch((e) => setState({ loading: false, error: e.message, posts: [] }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function flash(m) {
    setNote(m);
    setTimeout(() => setNote(''), 2000);
  }

  function open(post) {
    setOpenId(openId === post.id ? null : post.id);
    setDraft(post.body);
  }

  async function save(id) {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: draft }),
    });
    if (!res.ok) return flash('Could not save');
    flash('Saved');
    load();
  }

  async function remove(id) {
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) return flash('Could not delete');
    setOpenId(null);
    load();
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      flash('Copied');
    } catch {
      flash('Clipboard unavailable');
    }
  }

  if (state.loading) return <div className="space-y-3"><SkeletonCard lines={1} /><SkeletonCard lines={1} /></div>;
  if (state.error) return <ErrorState message={state.error} onRetry={load} />;
  if (!state.posts.length) {
    return (
      <EmptyState
        icon="pen"
        title="No drafts yet"
        description="Generate a post above and hit Save draft to keep it here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {note && <p className="text-sm text-green-700">{note}</p>}
      {state.posts.map((p) => (
        <div key={p.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <button onClick={() => open(p)} className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left hover:bg-slate-50">
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-medium">
                <Icon name={PLATFORM_ICON[p.platform]} brand className="h-3.5 w-3.5" />
                {p.topic || 'Untitled post'}
              </p>
              <p className="mt-0.5 truncate text-sm text-slate-500">{p.body.slice(0, 90)}…</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {p.edited && (
                <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
                  edited by you
                </span>
              )}
              <SourceBadge source={p.source} />
              <span className="text-xs text-slate-400">{new Date(p.updatedAt).toLocaleDateString()}</span>
            </div>
          </button>

          {openId === p.id && (
            <div className="space-y-3 border-t border-slate-100 bg-slate-50/50 p-4">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={Math.min(20, Math.max(6, draft.split('\n').length + 2))}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-relaxed outline-none focus:border-indigo-400"
              />
              {!!p.hashtags?.length && <p className="text-sm text-indigo-600">{p.hashtags.join(' ')}</p>}
              <div className="flex flex-wrap gap-2">
                <button onClick={() => copy(p.hashtags?.length ? `${draft}\n\n${p.hashtags.join(' ')}` : draft)} className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">
                  <Icon name="copy" className="mr-1.5 h-3.5 w-3.5" />Copy
                </button>
                <button onClick={() => save(p.id)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
                  <Icon name="save" className="mr-1.5 h-3.5 w-3.5" />Save changes
                </button>
                <button onClick={() => remove(p.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50">
                  <Icon name="trash" className="mr-1.5 h-3.5 w-3.5" />Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
