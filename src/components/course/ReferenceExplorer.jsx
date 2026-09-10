'use client';

import { useEffect, useMemo, useState } from 'react';
import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import { ResultView } from './CodeResult';
import { useLang } from '../LanguageProvider';
import { useTx } from './useTx';
import { LessonLink } from './CourseToolkit';

/**
 * A searchable technical reference — array methods, git commands, SQL
 * clauses, hooks. One entry:
 *
 *   { id, name, category, syntax, description, example, language,
 *     output: string | { type: 'table'|'json'|'terminal'|'html'|'text', … },
 *     useCase, mistake: { wrong, why, right }, related: [ids],
 *     relatedLessons: [titles], version, tags }
 *
 * Tabs: Reference (search + category filter) and, when the tool lists
 * `cheatsheet` ids, a Cheat sheet grid. Deep links: #entry-<id>, #cheatsheet.
 */
function Detail({ entry, byId, lessons, onOpen }) {
  const { pick } = useLang();
  const tx = useTx();
  const output = typeof entry.output === 'string' ? { type: 'terminal', text: entry.output } : entry.output;
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-mono text-lg font-bold">{entry.name}</h3>
        {entry.category && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{entry.category}</span>}
        {entry.version && <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">⚠ {entry.version}</span>}
      </div>
      <p className="text-[15px] leading-relaxed text-slate-700">{tx(entry.description)}</p>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          {entry.syntax && (
            <>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Syntax</p>
              <CodeBlock code={entry.syntax} language={entry.language || 'text'} />
            </>
          )}
          {entry.example && (
            <>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{pick('Example', 'Example')}</p>
              <CodeBlock code={entry.example} language={entry.language || 'text'} lineNumbers filename={entry.filename} />
            </>
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          {output && (
            <>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{pick('Output / result', 'Output / result')}</p>
              <ResultView result={output} />
            </>
          )}
          {entry.useCase && (
            <>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">{pick('Kab use karein', 'Common use case')}</p>
              <p className="text-sm text-slate-700">{tx(entry.useCase)}</p>
            </>
          )}
          {entry.mistake && (
            <div className="mt-1 flex flex-col gap-1.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm">
              <p className="font-bold text-red-700">❌ {tx(entry.mistake.wrong)}</p>
              {entry.mistake.why && <p className="text-slate-700">{tx(entry.mistake.why)}</p>}
              {entry.mistake.right && <p className="font-mono text-[13px] text-green-800">✅ {tx(entry.mistake.right)}</p>}
            </div>
          )}
          {entry.related?.length > 0 && (
            <>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Related</p>
              <p className="flex flex-wrap gap-1.5">
                {entry.related.filter((id) => byId[id]).map((id) => (
                  <button key={id} type="button" onClick={() => onOpen(id)} className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700 hover:bg-indigo-50">
                    {byId[id].name}
                  </button>
                ))}
              </p>
            </>
          )}
          {entry.relatedLessons?.length > 0 && (
            <>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">{pick('Lessons', 'Lessons')}</p>
              <div className="flex flex-col gap-1">
                {entry.relatedLessons.map((t) => <LessonLink key={t} title={t} lessons={lessons} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReferenceExplorer({ data, lessons }) {
  const { pick } = useLang();
  const tx = useTx();
  const entries = data.entries;
  const byId = useMemo(() => Object.fromEntries(entries.map((e) => [e.id, e])), [entries]);
  const categories = data.categories || [...new Set(entries.map((e) => e.category).filter(Boolean))];
  const hasCheat = data.cheatsheet?.length > 0;
  const [tab, setTab] = useState('reference');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(null);

  function openEntry(id) {
    setTab('reference');
    setQuery('');
    setCategory(null);
    setOpen(id);
    setTimeout(() => document.getElementById(`entry-${id}`)?.scrollIntoView({ block: 'start' }), 50);
  }

  useEffect(() => {
    function fromHash() {
      const h = window.location.hash.slice(1);
      if (h === 'cheatsheet' && hasCheat) setTab('cheatsheet');
      else if (h.startsWith('entry-') && byId[h.slice(6)]) openEntry(h.slice(6));
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [byId, hasCheat]); // eslint-disable-line react-hooks/exhaustive-deps

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .filter((e) => !category || e.category === category)
      .filter((e) => !q || [e.name, e.id, e.category, e.syntax, e.example, tx(e.useCase), ...(e.tags || []), tx(e.description)].join(' ').toLowerCase().includes(q));
  }, [entries, query, category, tx]);

  return (
    <div className="flex flex-col gap-5">
      {data.intro && <p className="rounded-2xl border border-slate-200 bg-white p-4 text-[15px] text-slate-700">{tx(data.intro)}</p>}

      {hasCheat && (
        <div role="tablist" className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
          {[
            { key: 'reference', en: 'Reference', hi: 'Reference' },
            { key: 'cheatsheet', en: 'Cheat sheet', hi: 'Cheat sheet' },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => {
                setTab(t.key);
                history.replaceState(null, '', t.key === 'reference' ? window.location.pathname : '#cheatsheet');
              }}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold ${tab === t.key ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {pick(t.hi, t.en)}
            </button>
          ))}
        </div>
      )}

      {tab === 'reference' && (
        <>
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5">
              <Icon name="search" className="h-4 w-4 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={data.placeholder || pick('Search karo…', 'Search…')}
                className="h-11 w-full bg-transparent text-sm outline-none"
                aria-label={`Search ${data.title || 'reference'}`}
              />
            </div>
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-1.5">
                <button type="button" onClick={() => setCategory(null)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${!category ? 'bg-slate-900 text-white dark:bg-slate-700' : 'bg-slate-100 text-slate-600'}`}>
                  {pick('Sab', 'All')} · {entries.length}
                </button>
                {categories.map((c) => (
                  <button key={c} type="button" onClick={() => setCategory(category === c ? null : c)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${category === c ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-slate-400">{list.length} {pick('entries', 'entries')}</p>

          <div className="flex flex-col gap-2">
            {list.map((e) => (
              <div key={e.id} id={`entry-${e.id}`} className="scroll-mt-32">
                <button
                  type="button"
                  onClick={() => setOpen(open === e.id ? null : e.id)}
                  aria-expanded={open === e.id}
                  className={`flex w-full flex-col gap-1 rounded-2xl border bg-white px-4 py-3 text-left transition sm:flex-row sm:items-center sm:gap-4 ${open === e.id ? 'border-indigo-300' : 'border-slate-200 hover:border-indigo-300'}`}
                >
                  <span className="shrink-0 font-mono text-sm font-bold sm:w-48">{e.name}</span>
                  <span className="min-w-0 flex-1 truncate font-mono text-xs text-slate-500">{e.syntax}</span>
                  {e.category && <span className="shrink-0 self-start rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 sm:self-auto">{e.category}</span>}
                </button>
                {open === e.id && (
                  <div className="mt-2">
                    <Detail entry={e} byId={byId} lessons={lessons} onOpen={openEntry} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'cheatsheet' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {data.cheatsheet.filter((id) => byId[id]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setOpen(open === id ? null : id)}
                aria-pressed={open === id}
                className={`flex min-w-0 flex-col gap-1 rounded-xl border p-3 text-left transition ${open === id ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 bg-white hover:border-indigo-300'}`}
              >
                <span className="truncate font-mono text-sm font-bold">{byId[id].name}</span>
                <span className="truncate font-mono text-[11px] text-slate-500">{byId[id].syntax}</span>
              </button>
            ))}
          </div>
          {open && byId[open] ? (
            <Detail entry={byId[open]} byId={byId} lessons={lessons} onOpen={openEntry} />
          ) : (
            <p className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
              {pick('Kisi bhi item pe click karo — syntax, example aur output dikhega.', 'Click any item to see its syntax, example and output.')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
