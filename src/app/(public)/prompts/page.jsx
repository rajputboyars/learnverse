'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import PromptCard from '@/components/prompts/PromptCard';
import { EmptyState, ErrorState, SkeletonCard } from '@/components/ui/States';
import { useLang } from '@/components/LanguageProvider';


const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

const CATEGORIES = [
  { id: 'all', hi: 'Sab', en: 'All' },
  { id: 'learning', hi: 'Learning', en: 'Learning' },
  { id: 'programming', hi: 'Programming', en: 'Programming' },
  { id: 'career', hi: 'Career', en: 'Career' },
  { id: 'interview', hi: 'Interview', en: 'Interview' },
  { id: 'productivity', hi: 'Productivity', en: 'Productivity' },
  { id: 'research', hi: 'Research', en: 'Research' },
  { id: 'analysis', hi: 'Analysis', en: 'Analysis' },
  { id: 'social', hi: 'Social', en: 'Social' },
];

const SCOPES = [
  { id: 'library', hi: 'Library', en: 'Library' },
  { id: 'saved', hi: 'Saved', en: 'Saved' },
  { id: 'mine', hi: 'Meri submissions', en: 'My submissions' },
];

export default function PromptLibraryPage() {
  const { pick } = useLang();
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
      .then((r) =>
        r.ok
          ? r.json()
          : Promise.reject(new Error(pick('Prompt library load nahi ho paayi', 'Could not load the prompt library')))
      )
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
          <h1 className="text-3xl font-bold">{pick('Prompt Library', 'Prompt Library')}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            {pick(
              'Aise prompts jo kisi ke liye sach mein kaam kar chuke hain. Khaali jagah bharo aur apne AI provider se chalao — ya kahin aur copy kar lo.',
              'Prompts that actually worked for someone. Fill in the blanks and run them with your own AI provider — or copy them anywhere else.'
            )}
          </p>
        </div>
        <Link
          href="/prompts/submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Icon name="plus" className="mr-1.5 h-3.5 w-3.5" />
          {pick('Prompt bhejo', 'Submit a prompt')}
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
              {pick(s.hi, s.en)}
            </button>
          ))}
        </div>

        <div className="relative min-w-[14rem] flex-1">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={pick('Prompts dhoondho…', 'Search prompts…')}
            aria-label={pick('Prompts dhoondho', 'Search prompts')}
            type="search"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label={pick('Prompts sort karo', 'Sort prompts')}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
        >
          <option value="popular">{pick('Sabse zyada use hue', 'Most used')}</option>
          <option value="rating">{pick('Sabse achhi rating', 'Highest rated')}</option>
          <option value="newest">{pick('Sabse naye', 'Newest')}</option>
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
            {pick(c.hi, c.en)}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-8">
        <h2 className="sr-only">{pick('Prompts', 'Prompts')}</h2>
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
                ? pick('Abhi kuch saved nahi hai', 'Nothing saved yet')
                : scope === 'mine'
                  ? pick('Tumne abhi tak koi prompt nahi bheja', 'You have not submitted a prompt yet')
                  : debounced
                    ? pick(`“${debounced}” se koi prompt match nahi hua`, `No prompts match “${debounced}”`)
                    : pick('Abhi yahan koi prompt nahi hai', 'No prompts here yet')
            }
            description={
              scope === 'mine'
                ? pick(
                    'Koi prompt mila jo achha kaam karta hai? Share karo — public hone se pehle wo review se guzarta hai.',
                    'Found a prompt that works well? Share it — it goes through review before it becomes public.'
                  )
                : scope === 'saved'
                  ? pick(
                      'Kisi bhi prompt pe bookmark dabao — wo yahan rahega.',
                      'Hit the bookmark on any prompt to keep it here.'
                    )
                  : pick('Koi aur search ya category try karo.', 'Try a different search or category.')
            }
            action={
              scope === 'mine' ? (
                <Link href="/prompts/submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                  {pick('Prompt bhejo', 'Submit a prompt')}
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
