'use client';

import { useEffect, useState } from 'react';
import Icon from '../Icon';
import DebugCard from './DebugCard';
import { LessonLink } from './CourseToolkit';
import { useLang } from '../LanguageProvider';
import { useTx } from './useTx';

/**
 * Debugging lab / error database for any course — each entry opens into a
 * DebugCard (problem → symptoms → how to inspect → root cause → fix →
 * prevention). Searchable, filterable by tag, deep-linkable as #err-<id>.
 */
export default function ErrorDatabase({ data, lessons }) {
  const { pick } = useLang();
  const tx = useTx();
  const entries = data.entries;
  const tags = [...new Set(entries.flatMap((d) => d.tags || []))];
  const [tag, setTag] = useState(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(null);

  useEffect(() => {
    function fromHash() {
      const h = window.location.hash.slice(1);
      if (h.startsWith('err-')) {
        setOpen(h.slice(4));
        setTimeout(() => document.getElementById(h)?.scrollIntoView({ block: 'start' }), 50);
      }
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const q = query.trim().toLowerCase();
  const list = entries
    .filter((d) => !tag || (d.tags || []).includes(tag))
    .filter((d) => !q || [d.title, d.symptom, ...(d.causes || []), tx(d.problem)].join(' ').toLowerCase().includes(q));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <p className="text-[15px] text-slate-700">
          {data.intro
            ? tx(data.intro)
            : pick(
                'Har error ek hi tareeke se: Problem → Symptoms → Kaise inspect karein → Root cause → Fix → Prevention. Pehle khud socho ki kya galat hua, phir kholo.',
                'Every error, the same way: Problem → Symptoms → How to inspect → Root cause → Fix → Prevention. Guess the cause before you open it.'
              )}
        </p>
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5">
          <Icon name="search" className="h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={pick('Error message paste karo…', 'Paste an error message…')}
            className="h-11 w-full bg-transparent text-sm outline-none"
            aria-label="Search errors"
          />
        </div>
        {tags.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            <button type="button" onClick={() => setTag(null)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${!tag ? 'bg-slate-900 text-white dark:bg-slate-700' : 'bg-slate-100 text-slate-600'}`}>
              {pick('Sab', 'All')} · {entries.length}
            </button>
            {tags.map((t) => (
              <button key={t} type="button" onClick={() => setTag(tag === t ? null : t)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${tag === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                #{t}
              </button>
            ))}
          </div>
        )}
      </div>

      <ol className="flex flex-col gap-2.5">
        {list.map((d) => {
          const n = entries.indexOf(d) + 1;
          const isOpen = open === d.id;
          return (
            <li key={d.id} id={`err-${d.id}`} className="scroll-mt-32">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : d.id)}
                aria-expanded={isOpen}
                className={`flex w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 text-left transition ${isOpen ? 'border-indigo-300' : 'border-slate-200 hover:border-indigo-300'}`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-red-50 text-xs font-bold text-red-700">{String(n).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{d.title}</span>
                  <span className="block truncate text-xs text-slate-500">{tx(d.problem)}</span>
                </span>
                <Icon name="chevron-down" className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="mt-2 flex flex-col gap-2">
                  <DebugCard item={d} showTitle={false} />
                  {d.lesson && (
                    <p className="flex flex-wrap items-center gap-2 px-1 text-xs text-slate-500">
                      {pick('Seekho:', 'Learn it:')} <LessonLink title={d.lesson} lessons={lessons} />
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
