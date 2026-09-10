'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '../Icon';
import { useLang } from '../LanguageProvider';
import CourseRoadmap from './CourseRoadmap';
import { CHALLENGE_STORE } from './Challenge';
import { readStore, useTx, writeStore } from './useTx';

const LEVEL_TAGS = new Set(['beginner', 'intermediate', 'advanced']);
const MODE_STORE = 'course:mode';

function Bar({ label, done, total, tone = 'bg-indigo-600' }) {
  if (!total) return null;
  const pct = Math.round((done / total) * 100);
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

function search(index, query, groups, per = 5) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const words = q.split(/\s+/);
  const scored = index
    .filter((it) => words.every((w) => it.hay.includes(w)))
    .map((it) => ({ ...it, score: (it.key.includes(q) ? 10 : 0) + (it.key.startsWith(q) ? 5 : 0) }));
  return groups
    .map((g) => ({ group: g, items: scored.filter((s) => s.group === g).sort((a, b) => b.score - a.score).slice(0, per) }))
    .filter((g) => g.items.length > 0);
}

/**
 * The top of an upgraded course page: roadmap, beginner / developer mode,
 * the progress breakdown the course is graded on, course-wide search, tag
 * filter, an optional daily plan and toolkit links. Everything comes from
 * the course's toolkit config (data/courses) plus its lessons.
 */
export default function CourseHub({ course, levels, config }) {
  const { pick } = useLang();
  const tx = useTx();
  const { status } = useSession();
  const [prog, setProg] = useState(null);
  const [solved, setSolved] = useState(0);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState(null);
  const [mode, setMode] = useState('beginner');

  useEffect(() => {
    setSolved(Object.keys(readStore(CHALLENGE_STORE, {})).length);
    setMode(readStore(MODE_STORE, 'beginner'));
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
        const band = t.band || lvl.key;
        stages.push({ id: t.id, stage: t.stage, title: t.title, band, level: lvl.key, estimatedMinutes: t.estimatedMinutes, concepts, done: concepts.filter((c) => c.read).length, total: concepts.length });
        for (const c of concepts) lessons.push({ ...c, level: lvl.key, band, topicTitle: t.title });
      }
    }
    stages.sort((a, b) => (a.stage ?? 99) - (b.stage ?? 99));
    return { stages, lessons };
  }, [levels, prog, tracking]);

  const index = useMemo(
    () => [
      ...lessons.map((l) => ({
        group: 'Lessons',
        title: l.title,
        sub: l.topicTitle,
        href: `/concepts/${l.slug}`,
        hay: [l.title, l.topicTitle, ...(l.tags || []), ...(l.searchTerms || [])].join(' ').toLowerCase(),
        key: l.title.toLowerCase(),
      })),
      ...config.search,
    ],
    [lessons, config.search]
  );
  const results = useMemo(() => search(index, query, config.groups), [index, query, config.groups]);

  const count = (pred) => {
    const list = lessons.filter(pred);
    return { total: list.length, done: list.filter((c) => c.read).length };
  };
  const core = count((c) => !['lab', 'project', 'assessment'].includes(c.kind));
  const labs = count((c) => c.kind === 'lab');
  const project = count((c) => c.kind === 'project' || c.band === 'project');
  const assessment = count((c) => c.kind === 'assessment');
  const quizzes = lessons.filter((c) => c.hasQuiz);
  const quizzesPassed = tracking ? quizzes.filter((c) => prog.passed.has(c.id)).length : 0;
  const all = count(() => true);
  const pct = all.total ? Math.round((all.done / all.total) * 100) : 0;

  const tagged = tag ? lessons.filter((c) => (LEVEL_TAGS.has(tag) ? c.level === tag : (c.tags || []).includes(tag))) : [];
  const byTitle = (title) => lessons.find((l) => l.title === title);
  const firstUnread = lessons.find((l) => !l.read) || lessons[0];
  const firstLab = lessons.find((l) => l.kind === 'lab');
  const skipTo = lessons.find((l) => !['prerequisites', 'fundamentals', 'beginner'].includes(l.band));
  const errorsTool = config.toolkit.find((t) => /debug|error/i.test(t.title));

  function chooseMode(m) {
    setMode(m);
    writeStore(MODE_STORE, m);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Mode + start */}
      <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-bold">{pick('Kaise seekhna hai?', 'How do you want to learn?')}</p>
          <span role="tablist" className="ml-auto flex gap-1 rounded-full bg-slate-100 p-1">
            {[
              { key: 'beginner', en: 'Beginner', hi: 'Beginner' },
              { key: 'developer', en: 'Developer', hi: 'Developer' },
            ].map((m) => (
              <button
                key={m.key}
                type="button"
                role="tab"
                aria-selected={mode === m.key}
                onClick={() => chooseMode(m.key)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${mode === m.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                {pick(m.hi, m.en)}
              </button>
            ))}
          </span>
        </div>

        {mode === 'beginner' ? (
          <ol className="grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-3">
            {[
              { label: pick('Yahan se shuru', 'Start here'), lesson: lessons[0], icon: 'flag' },
              { label: tracking && firstUnread?.read === false ? pick('Aage yahan se', 'Continue') : pick('Pehla lesson', 'Lesson 1'), lesson: tracking ? firstUnread : lessons[1] || lessons[0], icon: 'book-open' },
              { label: pick('Practice', 'Practice'), lesson: firstLab, icon: 'flask' },
            ]
              .filter((s) => s.lesson)
              .map((s, i) => (
                <li key={s.label}>
                  <Link href={`/concepts/${s.lesson.slug}`} className="flex h-full items-start gap-3 rounded-2xl border border-slate-200 p-3.5 transition hover:border-indigo-300">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-700">{i + 1}</span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{s.label}</span>
                      <span className="text-sm font-semibold">{s.lesson.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
          </ol>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skipTo && (
              <Link href={`/concepts/${skipTo.slug}`} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold transition hover:border-indigo-300">
                <Icon name="bolt" className="h-3.5 w-3.5 text-indigo-600" />
                {pick('Basics skip karo', 'Skip basics')}
              </Link>
            )}
            {config.toolkit.slice(0, 3).map((t) => (
              <Link key={t.href} href={t.href} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold transition hover:border-indigo-300">
                <Icon name={t.icon} className="h-3.5 w-3.5 text-indigo-600" />
                {t.title}
              </Link>
            ))}
            {errorsTool && !config.toolkit.slice(0, 3).includes(errorsTool) && (
              <Link href={errorsTool.href} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold transition hover:border-indigo-300">
                <Icon name="bug" className="h-3.5 w-3.5 text-indigo-600" />
                {pick('Debugging', 'Debugging')}
              </Link>
            )}
            <button type="button" onClick={() => setTag('advanced')} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold transition hover:border-indigo-300">
              <Icon name="rocket" className="h-3.5 w-3.5 text-indigo-600" />
              {pick('Advanced lessons', 'Advanced lessons')}
            </button>
            {firstLab && (
              <Link href={`/concepts/${firstLab.slug}`} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold transition hover:border-indigo-300">
                <Icon name="flask" className="h-3.5 w-3.5 text-indigo-600" />
                {pick('Labs & challenges', 'Labs & challenges')}
              </Link>
            )}
          </div>
        )}
      </section>

      <CourseRoadmap stages={stages} bands={config.bands} tracking={tracking} title={`${course.title} roadmap`} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Search + tags */}
        <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5">
            <Icon name="search" className="h-4 w-4 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={pick(`${course.title} mein search karo — lessons, reference, errors…`, `Search ${course.title} — lessons, reference, errors…`)}
              className="h-11 w-full bg-transparent text-sm outline-none"
              aria-label={`Search the ${course.title} course`}
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="text-xs text-slate-400 hover:text-slate-600" aria-label="Clear search">
                <Icon name="x" className="h-3 w-3" />
              </button>
            )}
          </div>

          {query.trim().length >= 2 && (
            <div className="flex flex-col gap-4" role="region" aria-live="polite">
              {results.length === 0 && <p className="text-sm text-slate-500">{pick('Kuch nahi mila. Doosra word try karo.', 'Nothing found. Try another word.')}</p>}
              {results.map((g) => (
                <div key={g.group} className="flex flex-col gap-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{g.group}</p>
                  {g.items.map((it) => (
                    <Link key={it.href + it.title} href={it.href} className="flex flex-col rounded-xl border border-slate-200 px-3.5 py-2.5 transition hover:border-indigo-300">
                      <span className="text-sm font-semibold">{it.title}</span>
                      {it.sub && <span className="truncate font-mono text-xs text-slate-500">{it.sub}</span>}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          {config.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {config.tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(tag === t ? null : t)}
                  aria-pressed={tag === t}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${tag === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50'}`}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}

          {tag && (
            <div className="flex flex-col gap-1.5">
              <p className="text-xs text-slate-400">{tagged.length} {pick('lessons', 'lessons')} · #{tag}</p>
              {tagged.map((c) => (
                <Link key={c.id} href={`/concepts/${c.slug}`} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm transition hover:border-indigo-300">
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${c.read ? 'bg-green-100' : 'bg-slate-100'}`}>
                    {c.read && <Icon name="check" className="h-2.5 w-2.5 text-green-700" />}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium">{c.title}</span>
                  <span className="hidden shrink-0 text-xs text-slate-400 sm:inline">{c.topicTitle}</span>
                </Link>
              ))}
            </div>
          )}

          {config.dailyPlan && (
            <details className="group rounded-2xl border border-slate-200 p-4">
              <summary className="flex cursor-pointer items-center gap-2 font-semibold">
                <Icon name="calendar" className="h-4 w-4 text-indigo-600" />
                {tx(config.dailyPlan.title)}
                <span className="ml-auto text-xs font-normal text-slate-400">{pick('optional', 'optional')}</span>
                <Icon name="chevron-down" className="h-3 w-3 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <ol className="mt-3 flex flex-col gap-2">
                {config.dailyPlan.days.map((d, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="w-14 shrink-0 font-bold text-indigo-600">Day {i + 1}</span>
                    <span className="flex flex-col gap-0.5">
                      <span className="font-semibold text-slate-800">{tx(d.title)}</span>
                      <span className="flex flex-wrap gap-x-3 text-xs">
                        {(d.lessons || []).map((t) => {
                          const l = byTitle(t);
                          return l ? (
                            <Link key={t} href={`/concepts/${l.slug}`} className="text-indigo-600 hover:underline">{t}</Link>
                          ) : (
                            <span key={t} className="text-slate-500">{t}</span>
                          );
                        })}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </details>
          )}
        </section>

        {/* Progress breakdown */}
        <section className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="flex items-baseline gap-2 font-bold">
            {pick('Course progress', 'Course progress')}
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
            <Bar label={pick('Assessment', 'Assessment')} done={assessment.done} total={assessment.total} tone="bg-amber-500" />
          </div>
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <Icon name="puzzle" className="h-3.5 w-3.5 text-indigo-600" />
            {solved} {pick('challenges solve kiye (is browser mein)', 'challenges solved (in this browser)')}
          </p>
          {!tracking && (
            <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
              <Link href={`/login?callbackUrl=/courses/${course.slug}`} className="font-semibold text-indigo-600 underline">
                {pick('Login karo', 'Log in')}
              </Link>{' '}
              {pick('taaki progress save ho.', 'to track your progress.')}
            </p>
          )}
          {config.certificationNote && (
            <p className="mt-auto flex items-start gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
              <Icon name="graduation" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
              {tx(config.certificationNote)}
            </p>
          )}
        </section>
      </div>

      {/* Toolkit */}
      {config.toolkit.length > 0 && (
        <section className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {config.toolkit.map((t) => (
            <Link key={t.href} href={t.href} className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50">
                <Icon name={t.icon} className="h-4 w-4 text-indigo-600" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="font-semibold">{t.title}</span>
                {t.sub && <span className="truncate text-xs text-slate-500">{t.sub}</span>}
              </span>
              <Icon name="arrow-right" className="ml-auto h-3 w-3 shrink-0 text-slate-400" />
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
