'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLang } from './LanguageProvider';
import Icon from '@/components/Icon';

const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

const LEVEL_TINT = {
  beginner: 'bg-green-50 text-green-700',
  intermediate: 'bg-indigo-50 text-indigo-700',
  advanced: 'bg-red-50 text-red-700',
};

const DIFFICULTY_TINT = {
  easy: 'bg-green-50 text-green-700',
  medium: 'bg-amber-50 text-amber-700',
  hard: 'bg-red-50 text-red-700',
};

// The whole course page. It is a client component because everything that
// makes it useful — progress bars, read ticks, the resume point — depends on
// the caller's own progress, which arrives from /api/me/stats after mount.
// Signed out (or before that lands) it renders as a plain, honest syllabus.
export default function CourseView({ course, levels, totals, questions }) {
  const { pick } = useLang();
  const { status } = useSession();
  const [readIds, setReadIds] = useState(null);
  const [onlyUnread, setOnlyUnread] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated') return;
    let alive = true;
    fetch('/api/me/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d?.progress) return;
        setReadIds(new Set(d.progress.filter((p) => p.read).map((p) => p.conceptId)));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [status]);

  const tracking = readIds !== null;
  const isRead = (id) => (tracking ? readIds.has(id) : false);

  // Level/topic tallies and the resume point, all derived from one pass.
  const { levelStats, topicStats, readCount, resume } = useMemo(() => {
    const levelStats = {};
    const topicStats = {};
    let readCount = 0;
    let resume = null;

    for (const lvl of levels) {
      let lDone = 0;
      let lTotal = 0;
      for (const t of lvl.topics) {
        const done = t.concepts.filter((c) => isRead(c.id)).length;
        topicStats[t.id] = { done, total: t.concepts.length };
        lDone += done;
        lTotal += t.concepts.length;
        if (!resume) {
          const next = t.concepts.find((c) => !isRead(c.id));
          if (next) resume = next;
        }
      }
      levelStats[lvl.key] = { done: lDone, total: lTotal };
      readCount += lDone;
    }
    return { levelStats, topicStats, readCount, resume };
  }, [levels, readIds]); // eslint-disable-line react-hooks/exhaustive-deps

  const pct = totals.concepts ? Math.round((readCount / totals.concepts) * 100) : 0;
  const left = totals.concepts - readCount;
  const firstConcept = levels[0]?.topics[0]?.concepts[0] || null;

  return (
    <div className="bg-slate-50 pb-16">

      {/* ══════════ Breadcrumb ══════════ */}
      <nav className={`${SHELL} flex items-center gap-2 pt-5 text-sm text-slate-400`}>
        <Link href="/courses" className="hover:text-indigo-600">
          {pick('Saare courses', 'All courses')}
        </Link>
        <span>/</span>
        <span className="truncate font-medium text-slate-600">{course.title}</span>
      </nav>

      {/* ══════════ Hero ══════════ */}
      <header className={`${SHELL} pt-3.5`}>
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-40 right-44 h-[420px] w-[620px] rounded-full bg-indigo-600 opacity-25 blur-[150px]"
          />

          <div className="relative flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:gap-12">
            <div className="flex flex-col items-start gap-4 lg:flex-1">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-800">
                  <Icon name={course.icon} brand className="h-7 w-7" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">{course.title}</h1>
                  <p className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 font-semibold capitalize text-slate-300">
                      {course.difficulty}
                    </span>
                    <span>{totals.concepts} {pick('concepts', 'concepts')}</span>
                    <span>·</span>
                    <span>{totals.topics} {pick('topics', 'topics')}</span>
                    <span>·</span>
                    <span>English + Hinglish</span>
                  </p>
                </div>
              </div>

              <p className="max-w-3xl leading-relaxed text-slate-400">{course.description}</p>

              <div className="mt-1 flex flex-wrap items-center gap-3">
                {resume && tracking && readCount > 0 ? (
                  <>
                    <Link
                      href={`/concepts/${resume.slug}`}
                      className="flex items-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white hover:bg-indigo-700"
                    >
                      {pick('Continue', 'Continue')} — {resume.title}
                      <Icon name="arrow-right" className="h-3.5 w-3.5" />
                    </Link>
                    {firstConcept && (
                      <Link
                        href={`/concepts/${firstConcept.slug}`}
                        className="rounded-xl border border-slate-700 px-5 py-3.5 font-semibold text-slate-200 hover:bg-slate-800"
                      >
                        {pick('Shuru se', 'Start from the beginning')}
                      </Link>
                    )}
                  </>
                ) : (
                  firstConcept && (
                    <Link
                      href={`/concepts/${firstConcept.slug}`}
                      className="flex items-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white hover:bg-indigo-700"
                    >
                      {pick('Course shuru karo', 'Start the course')}
                      <Icon name="arrow-right" className="h-3.5 w-3.5" />
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Progress — only once we actually know it */}
            {tracking && (
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-800/40 p-5 lg:w-[340px] lg:shrink-0">
                <p className="flex items-baseline gap-2 text-sm font-semibold text-slate-400">
                  {pick('Tumhari progress', 'Your progress')}
                  <span className="ml-auto text-slate-300">{readCount} / {totals.concepts}</span>
                </p>
                <span className="block h-2 overflow-hidden rounded-full bg-slate-800">
                  <span className="block h-2 rounded-full bg-indigo-600" style={{ width: `${pct}%` }} />
                </span>

                <div className="flex flex-col gap-2.5">
                  {levels.map((lvl) => {
                    const s = levelStats[lvl.key];
                    const lp = s.total ? Math.round((s.done / s.total) * 100) : 0;
                    return (
                      <p key={lvl.key} className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="w-20 shrink-0">{lvl.label}</span>
                        <span className="block h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                          <span
                            className={`block h-1.5 rounded-full ${lp === 100 ? 'bg-green-500' : 'bg-indigo-600'}`}
                            style={{ width: `${lp}%` }}
                          />
                        </span>
                        <span className="w-10 shrink-0 text-right text-slate-500">{s.done}/{s.total}</span>
                      </p>
                    );
                  })}
                </div>

                <p className="mt-auto flex items-center gap-2.5 border-t border-slate-800 pt-3.5 text-xs text-slate-400">
                  <Icon name="graduation" className="h-4 w-4 text-amber-400" />
                  {left === 0
                    ? pick('Certificate unlock ho gaya!', 'Certificate unlocked!')
                    : pick(
                        `Certificate 100% pe — ${left} concepts baaki.`,
                        `Certificate unlocks at 100% — ${left} to go.`
                      )}
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ══════════ Toolbar ══════════ */}
      <div className={`${SHELL} flex flex-wrap items-center gap-2.5 pt-4`}>
        <Link
          href={`/practice/${course.slug}`}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-indigo-300"
        >
          <Icon name="brain" className="h-4 w-4 text-indigo-600" />
          {pick('Practice quiz', 'Practice quiz')}
        </Link>
        <Link
          href={`/mock-interview/${course.slug}`}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-indigo-300"
        >
          <Icon name="microphone" className="h-4 w-4 text-indigo-600" />
          {pick('Mock interview', 'Mock interview')}
        </Link>
        <Link
          href={`/courses/${course.slug}/discuss`}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-indigo-300"
        >
          <Icon name="comments" className="h-4 w-4 text-indigo-600" />
          {pick('Discussion board', 'Discussion board')}
        </Link>
        <Link
          href="/revise"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-indigo-300"
        >
          <Icon name="repeat" className="h-4 w-4 text-indigo-600" />
          {pick('Revise', 'Revise')}
        </Link>

        {tracking && readCount > 0 && (
          <button
            type="button"
            onClick={() => setOnlyUnread((v) => !v)}
            className={`ml-auto rounded-full px-3.5 py-2 text-xs font-semibold transition ${
              onlyUnread
                ? 'bg-slate-900 text-white dark:bg-slate-700'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-300'
            }`}
          >
            {pick('Sirf baaki wale', 'Unread only')}
          </button>
        )}
      </div>

      {/* ══════════ Curriculum + rail ══════════ */}
      <div className={`${SHELL} flex flex-col items-start gap-5 pt-5 lg:flex-row`}>

        <main className="flex w-full flex-col gap-8 lg:flex-1">
          {levels.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              {pick('Is course mein abhi koi topic add nahi hua.', 'No topics added to this course yet.')}
            </p>
          )}

          {levels.map((lvl, li) => {
            const s = levelStats[lvl.key];
            return (
              <section key={lvl.key} className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold ${
                      LEVEL_TINT[lvl.key] || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {li + 1}
                  </span>
                  <h2 className="text-xl font-bold tracking-tight">{lvl.label}</h2>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {lvl.topics.length} {pick('topics', 'topics')}
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                  {tracking && (
                    <span className="shrink-0 text-xs text-slate-400">{s.done}/{s.total}</span>
                  )}
                </div>

                {lvl.topics.map((t) => {
                  const ts = topicStats[t.id];
                  const tp = ts.total ? Math.round((ts.done / ts.total) * 100) : 0;
                  const rows = onlyUnread ? t.concepts.filter((c) => !isRead(c.id)) : t.concepts;
                  if (onlyUnread && rows.length === 0) return null;

                  return (
                    <div key={t.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <div className="flex flex-wrap items-start gap-4 px-5 pb-4 pt-5 sm:px-6">
                        <div className="flex flex-1 flex-col gap-1.5">
                          <h3 className="font-bold">{t.title}</h3>
                          {t.description && <p className="text-sm text-slate-500">{t.description}</p>}
                        </div>
                        {tracking && (
                          <span className="flex shrink-0 items-center gap-2.5 pt-1">
                            <span className="block h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                              <span className="block h-1.5 rounded-full bg-green-600" style={{ width: `${tp}%` }} />
                            </span>
                            <span className="text-xs text-slate-400">{ts.done}/{ts.total}</span>
                          </span>
                        )}
                      </div>

                      {rows.length === 0 ? (
                        <p className="border-t border-slate-100 px-5 py-4 text-sm text-slate-400 sm:px-6">
                          {pick('Jald aa raha hai…', 'Coming soon…')}
                        </p>
                      ) : (
                        rows.map((c, i) => {
                          const read = isRead(c.id);
                          const here = resume?.id === c.id && tracking && readCount > 0;
                          return (
                            <Link
                              key={c.id}
                              href={`/concepts/${c.slug}`}
                              className={`flex items-center gap-3.5 border-t border-slate-100 px-5 py-3.5 transition hover:bg-slate-50 sm:px-6 ${
                                here ? 'bg-indigo-50/60' : ''
                              }`}
                            >
                              <span
                                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                                  read
                                    ? 'bg-green-100 text-green-700'
                                    : here
                                      ? 'bg-indigo-600 text-white'
                                      : 'bg-slate-100 text-slate-500'
                                }`}
                              >
                                {read ? <Icon name="check" className="h-3 w-3" /> : i + 1}
                              </span>
                              <span className={`flex-1 font-medium ${read ? 'text-slate-500' : ''}`}>{c.title}</span>
                              {here && (
                                <span className="shrink-0 text-xs font-semibold text-indigo-600">
                                  {pick('Yahin se', 'Resume here')}
                                </span>
                              )}
                              <span
                                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                                  DIFFICULTY_TINT[c.difficulty] || 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {c.difficulty}
                              </span>
                            </Link>
                          );
                        })
                      )}
                    </div>
                  );
                })}
              </section>
            );
          })}

          {/* Close */}
          {totals.concepts > 0 && (
            <div className="relative flex flex-col gap-5 overflow-hidden rounded-2xl bg-slate-900 p-6 sm:flex-row sm:items-center sm:p-8 dark:bg-slate-950">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
              <div className="relative flex-1">
                <h3 className="text-xl font-bold text-white">
                  {pick('Padha hua yaad hai? Test karo.', 'Remember what you read? Test it.')}
                </h3>
                <p className="mt-1.5 text-sm text-slate-400">
                  {pick(
                    `Poore course ka timed quiz, aur ${questions.count} interview questions flip-cards mein.`,
                    `A timed quiz across the course, and ${questions.count} interview questions as flip-cards.`
                  )}
                </p>
              </div>
              <div className="relative flex flex-wrap gap-3">
                <Link
                  href={`/practice/${course.slug}`}
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {pick('Practice quiz', 'Practice quiz')}
                </Link>
                <Link
                  href={`/mock-interview/${course.slug}`}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                >
                  {pick('Mock interview', 'Mock interview')}
                </Link>
              </div>
            </div>
          )}
        </main>

        {/* ══════════ Right rail ══════════ */}
        <aside className="flex w-full flex-col gap-4 lg:sticky lg:top-20 lg:w-[340px] lg:shrink-0">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold">{pick('Is page par', 'On this page')}</h3>
            <div className="flex flex-col gap-0.5">
              {levels.flatMap((lvl) =>
                lvl.topics.map((t) => {
                  const ts = topicStats[t.id];
                  const complete = tracking && ts.done === ts.total && ts.total > 0;
                  const current = tracking && ts.done > 0 && ts.done < ts.total;
                  return (
                    <span
                      key={t.id}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm ${
                        current ? 'bg-indigo-50 font-semibold' : ''
                      }`}
                    >
                      <span
                        className={`h-3.5 w-0.5 shrink-0 rounded-full ${
                          complete ? 'bg-green-600' : current ? 'bg-indigo-600' : 'bg-slate-200'
                        }`}
                      />
                      <span className="flex-1 truncate text-slate-600">{t.title}</span>
                      {tracking && <span className="shrink-0 text-xs text-slate-400">{ts.done}/{ts.total}</span>}
                    </span>
                  );
                })
              )}
            </div>
          </div>

          {questions.count > 0 && (
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50">
                  <Icon name="briefcase" className="h-4 w-4 text-indigo-600" />
                </span>
                <h3 className="font-bold">{pick('Interview questions', 'Interview questions')}</h3>
                <span className="ml-auto text-sm text-slate-400">{questions.count}</span>
              </div>
              <p className="text-sm text-slate-500">
                {pick(
                  'Is course ke saare sawaal, dono zubaan mein.',
                  'Every question from this course, answered in both languages.'
                )}
              </p>
              {questions.preview.map((q) => (
                <p key={q.id} className="line-clamp-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
                  {q.question}
                </p>
              ))}
              <Link href="/interview-questions" className="text-sm font-semibold text-indigo-600 hover:underline">
                {pick(`Saare ${questions.count} dekho`, `See all ${questions.count}`)}{' '}
                <Icon name="arrow-right" className="h-3 w-3" />
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white">
                <Icon name="graduation" className="h-4 w-4 text-amber-500" />
              </span>
              <h3 className="font-bold">{pick('Certificate', 'Certificate')}</h3>
              {tracking && <span className="ml-auto text-sm text-amber-700">{pct}%</span>}
            </div>
            <p className="text-sm text-slate-600">
              {pick(
                `Saare ${totals.concepts} concepts complete karo aur verifiable ID ke saath certificate unlock karo.`,
                `Finish all ${totals.concepts} concepts to unlock a shareable certificate with a verifiable ID.`
              )}
            </p>
            {tracking && (
              <span className="block h-2 overflow-hidden rounded-full bg-amber-200">
                <span className="block h-2 rounded-full bg-amber-500" style={{ width: `${pct}%` }} />
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold">{pick('Aage kya', 'Where next')}</h3>
            <p className="text-sm text-slate-500">
              {pick(
                'Roadmaps batate hain kis order mein seekhna hai.',
                'Roadmaps show what to learn, and in what order.'
              )}
            </p>
            <Link href="/roadmaps" className="text-sm font-semibold text-indigo-600 hover:underline">
              {pick('Roadmaps dekho', 'Browse roadmaps')} <Icon name="arrow-right" className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
