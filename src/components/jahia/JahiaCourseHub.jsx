'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '../Icon';
import { useLang } from '../LanguageProvider';
import JahiaRoadmap from './JahiaRoadmap';
import { CHALLENGE_STORE } from './CndChallenge';
import { readStore } from './useTx';
import { buildIndex, searchIndex } from '@/data/jahia/search';

const TAGS = ['cnd', 'authoring', 'jcr', 'graphql', 'react', 'cms', 'debugging', 'production', 'beginner', 'intermediate', 'advanced'];
const LEVEL_TAGS = new Set(['beginner', 'intermediate', 'advanced']);

const TOOLKIT = [
  { href: '/courses/jahia/toolkit/cnd', icon: 'code', en: 'CND Reference', hi: 'CND Reference', sub: 'Searchable, every type & attribute' },
  { href: '/courses/jahia/toolkit/cnd#cheatsheet', icon: 'list-check', en: 'CND Cheat Sheet', hi: 'CND Cheat Sheet', sub: 'One click per keyword' },
  { href: '/courses/jahia/toolkit/cnd#explorer', icon: 'sliders', en: 'Field → CMS Explorer', hi: 'Field → CMS Explorer', sub: 'See what a CND line becomes' },
  { href: '/courses/jahia/toolkit/node-types', icon: 'layers', en: 'Node Types Explorer', hi: 'Node Types Explorer', sub: 'Core, module and custom types' },
  { href: '/courses/jahia/toolkit/debugging', icon: 'bug', en: 'Debugging Lab', hi: 'Debugging Lab', sub: 'Ten real errors, fixed' },
  { href: '/courses/jahia/toolkit/project', icon: 'project', en: 'Final Project', hi: 'Final Project', sub: 'Learnverse News Portal' },
];

function Bar({ label, done, total, tone = 'bg-indigo-600' }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <p className="flex items-center gap-3 text-xs text-slate-500">
      <span className="w-24 shrink-0">{label}</span>
      <span className="block h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <span className={`block h-1.5 rounded-full ${pct === 100 ? 'bg-green-600' : tone}`} style={{ width: `${pct}%` }} />
      </span>
      <span className="w-12 shrink-0 text-right font-mono text-slate-400">{done}/{total}</span>
    </p>
  );
}

/**
 * The top of the Jahia course page: roadmap, the progress breakdown the
 * course is graded on, course-wide search, tag filter and toolkit links.
 */
export default function JahiaCourseHub({ levels }) {
  const { pick } = useLang();
  const { status } = useSession();
  const [prog, setProg] = useState(null);
  const [solved, setSolved] = useState(0);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState(null);

  useEffect(() => {
    setSolved(Object.keys(readStore(CHALLENGE_STORE, {})).length);
  }, []);

  useEffect(() => {
    if (status !== 'authenticated') return;
    let alive = true;
    fetch('/api/me/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d?.progress) return;
        setProg({
          read: new Set(d.progress.filter((p) => p.read).map((p) => p.conceptId)),
          passed: new Set(d.progress.filter((p) => p.quizPassed).map((p) => p.conceptId)),
        });
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [status]);

  const tracking = prog !== null;

  const { stages, lessons } = useMemo(() => {
    const stages = [];
    const lessons = [];
    for (const lvl of levels) {
      for (const t of lvl.topics) {
        const concepts = t.concepts.map((c) => ({ ...c, read: tracking && prog.read.has(c.id) }));
        stages.push({
          id: t.id,
          stage: t.stage,
          title: t.title,
          level: lvl.key,
          estimatedMinutes: t.estimatedMinutes,
          concepts,
          done: concepts.filter((c) => c.read).length,
          total: concepts.length,
        });
        for (const c of concepts) lessons.push({ ...c, level: lvl.key, topicTitle: t.title });
      }
    }
    stages.sort((a, b) => (a.stage ?? 99) - (b.stage ?? 99));
    return { stages, lessons };
  }, [levels, prog, tracking]);

  const index = useMemo(() => buildIndex(lessons), [lessons]);
  const results = useMemo(() => searchIndex(index, query), [index, query]);

  const count = (pred) => {
    const list = lessons.filter(pred);
    return { total: list.length, done: list.filter((c) => c.read).length };
  };
  const core = count((c) => !['lab', 'project', 'assessment'].includes(c.kind));
  const labs = count((c) => c.kind === 'lab');
  const project = count((c) => c.kind === 'project' || c.level === 'project');
  const quizzes = lessons.filter((c) => c.hasQuiz);
  const quizzesPassed = tracking ? quizzes.filter((c) => prog.passed.has(c.id)).length : 0;
  const all = count(() => true);
  const pct = all.total ? Math.round((all.done / all.total) * 100) : 0;

  const tagged = tag
    ? lessons.filter((c) => (LEVEL_TAGS.has(tag) ? c.level === tag : (c.tags || []).includes(tag)))
    : [];

  return (
    <div className="flex flex-col gap-5">
      <JahiaRoadmap stages={stages} tracking={tracking} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Search + tags */}
        <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5">
            <Icon name="search" className="h-4 w-4 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={pick('Course mein search karo — image, weakreference, workflow…', 'Search the course — image, weakreference, workflow…')}
              className="h-11 w-full bg-transparent text-sm outline-none"
              aria-label="Search the Jahia course"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="text-xs text-slate-400 hover:text-slate-600" aria-label="Clear search">
                <Icon name="x" className="h-3 w-3" />
              </button>
            )}
          </div>

          {query.trim().length >= 2 && (
            <div className="flex flex-col gap-4" role="region" aria-live="polite">
              {results.length === 0 && (
                <p className="text-sm text-slate-500">{pick('Kuch nahi mila. Doosra word try karo.', 'Nothing found. Try another word.')}</p>
              )}
              {results.map((g) => (
                <div key={g.group} className="flex flex-col gap-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{g.group}</p>
                  {g.items.map((it) => (
                    <Link
                      key={it.href + it.title}
                      href={it.href}
                      className="flex flex-col rounded-xl border border-slate-200 px-3.5 py-2.5 transition hover:border-indigo-300"
                    >
                      <span className="text-sm font-semibold">{it.title}</span>
                      {it.sub && <span className="truncate font-mono text-xs text-slate-500">{it.sub}</span>}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(tag === t ? null : t)}
                aria-pressed={tag === t}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  tag === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50'
                }`}
              >
                #{t}
              </button>
            ))}
          </div>

          {tag && (
            <div className="flex flex-col gap-1.5">
              <p className="text-xs text-slate-400">
                {tagged.length} {pick('lessons', 'lessons')} · #{tag}
              </p>
              {tagged.map((c) => (
                <Link
                  key={c.id}
                  href={`/concepts/${c.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm transition hover:border-indigo-300"
                >
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${c.read ? 'bg-green-100' : 'bg-slate-100'}`}>
                    {c.read && <Icon name="check" className="h-2.5 w-2.5 text-green-700" />}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium">{c.title}</span>
                  <span className="hidden shrink-0 text-xs text-slate-400 sm:inline">{c.topicTitle}</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Progress breakdown */}
        <section className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="flex items-baseline gap-2 font-bold">
            {pick('Jahia progress', 'Jahia progress')}
            <span className="ml-auto text-2xl font-extrabold text-indigo-600">{tracking ? `${pct}%` : '—'}</span>
          </p>
          <span className="block h-2 overflow-hidden rounded-full bg-slate-100">
            <span className="block h-2 rounded-full bg-indigo-600" style={{ width: `${tracking ? pct : 0}%` }} />
          </span>
          <div className="mt-1 flex flex-col gap-2">
            <Bar label={pick('Lessons', 'Lessons')} done={core.done} total={core.total} />
            <Bar label={pick('Labs', 'Labs')} done={labs.done} total={labs.total} />
            <Bar label={pick('Quizzes', 'Quizzes')} done={quizzesPassed} total={quizzes.length} tone="bg-amber-500" />
            <Bar label={pick('Project', 'Project')} done={project.done} total={project.total} tone="bg-amber-500" />
          </div>
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <Icon name="puzzle" className="h-3.5 w-3.5 text-indigo-600" />
            {solved} {pick('code challenges solve kiye (is browser mein)', 'code challenges solved (in this browser)')}
          </p>
          {!tracking && (
            <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
              <Link href="/login?callbackUrl=/courses/jahia" className="font-semibold text-indigo-600 underline">
                {pick('Login karo', 'Log in')}
              </Link>{' '}
              {pick('taaki progress save ho.', 'to track your progress.')}
            </p>
          )}
          <p className="mt-auto flex items-start gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <Icon name="graduation" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
            {pick(
              'Certificate: saare modules, labs, quizzes, final project aur final assessment complete karo.',
              'Certificate unlocks when every module, lab, quiz, the final project and the final assessment are complete.'
            )}
          </p>
        </section>
      </div>

      {/* Toolkit */}
      <section className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {TOOLKIT.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50">
              <Icon name={t.icon} className="h-4 w-4 text-indigo-600" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-semibold">{pick(t.hi, t.en)}</span>
              <span className="truncate text-xs text-slate-500">{t.sub}</span>
            </span>
            <Icon name="arrow-right" className="ml-auto h-3 w-3 shrink-0 text-slate-400" />
          </Link>
        ))}
      </section>
    </div>
  );
}
