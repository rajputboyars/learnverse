'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import PromptCard from '@/components/prompts/PromptCard';
import { EmptyState, ErrorState, SkeletonCard } from '@/components/ui/States';

const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'learning', label: 'Learning' },
  { id: 'programming', label: 'Programming' },
  { id: 'career', label: 'Career' },
  { id: 'interview', label: 'Interview' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'research', label: 'Research' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'social', label: 'Social' },
];

const SCOPES = [
  { id: 'library', label: 'Library' },
  { id: 'saved', label: 'Saved' },
  { id: 'mine', label: 'My submissions' },
];

export default function PromptLibraryPage() {
  const { status } = useSession();
  const [scope, setScope] = useState('library');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('popular');
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [state, setState] = useState({ loading: true, error: '', prompts: [] });

  // Debounce so typing does not fire a request per keystroke.
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(id);
  }, [query]);

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    const params = new URLSearchParams({ sort, category });
    if (debounced) params.set('q', debounced);
    if (scope === 'saved') params.set('saved', '1');
    if (scope === 'mine') params.set('mine', '1');

    fetch(`/api/prompts?${params}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load the prompt library'))))
      .then((d) => setState({ loading: false, error: '', prompts: d.prompts }))
      .catch((e) => setState({ loading: false, error: e.message, prompts: [] }));
  }, [sort, category, debounced, scope]);

  useEffect(() => {
    load();
  }, [load]);

  const authed = status === 'authenticated';

  return (
    <div className={`${SHELL} py-10`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prompt Library</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Prompts that actually worked for someone. Fill in the blanks and run them with your own
            AI provider — or copy them anywhere else.
          </p>
        </div>
        <Link
          href="/prompts/submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Icon name="plus" className="mr-1.5 h-3.5 w-3.5" />Submit a prompt
        </Link>
      </div>

      {/* Scope + search */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          {SCOPES.map((s) => (
            <button
              key={s.id}
              onClick={() => setScope(s.id)}
              disabled={s.id !== 'library' && !authed}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium disabled:opacity-40 ${
                scope === s.id
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[14rem] flex-1">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts…"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
        >
          <option value="popular">Most used</option>
          <option value="rating">Highest rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Categories */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`rounded-full border px-3 py-1 text-sm ${
              category === c.id
                ? 'border-indigo-300 bg-indigo-50 font-medium text-indigo-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-8">
        {state.loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} lines={3} />
            ))}
          </div>
        ) : state.error ? (
          <ErrorState message={state.error} onRetry={load} />
        ) : !state.prompts.length ? (
          <EmptyState
            icon={scope === 'mine' ? 'pen' : 'search'}
            title={
              scope === 'saved'
                ? 'Nothing saved yet'
                : scope === 'mine'
                  ? 'You have not submitted a prompt yet'
                  : debounced
                    ? `No prompts match “${debounced}”`
                    : 'No prompts here yet'
            }
            description={
              scope === 'mine'
                ? 'Found a prompt that works well? Share it — it goes through review before it becomes public.'
                : scope === 'saved'
                  ? 'Hit the bookmark on any prompt to keep it here.'
                  : 'Try a different search or category.'
            }
            action={
              scope === 'mine' ? (
                <Link href="/prompts/submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                  Submit a prompt
                </Link>
              ) : null
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {state.prompts.map((p) => (
              <PromptCard
                key={p.id}
                prompt={p}
                onSaveToggled={() => scope === 'saved' && load()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
