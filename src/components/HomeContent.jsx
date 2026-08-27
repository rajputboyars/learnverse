'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLang } from './LanguageProvider';
import HomeLearnerPanels from './HomeLearnerPanels';
import HomeWeeklyRank from './HomeWeeklyRank';
import Icon from '@/components/Icon';

// Keep in sync with Navbar/Footer so every edge lines up.
const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

const QUICK_ACTIONS = [
  { key: 'home.quick.challenges', href: '/challenges', icon: 'bolt' },
  { key: 'home.quick.revision', href: '/revise', icon: 'repeat' },
  { key: 'home.quick.discussions', href: '/courses', icon: 'comments' },
  { key: 'home.quick.resume', href: '/resume', icon: 'file' },
  { key: 'home.quick.certificates', href: '/dashboard', icon: 'graduation' },
];

const LEVELS = ['beginner', 'intermediate', 'advanced'];

export default function HomeContent({ courses, daily, stats, questions }) {
  const { t } = useLang();
  const { status } = useSession();
  const [level, setLevel] = useState('all');

  const signedIn = status === 'authenticated';
  const shown = level === 'all' ? courses : courses.filter((c) => c.difficulty === level);

  return (
    <div className="bg-slate-50 pb-16">

      {/* ══════════ Hero banner ══════════ */}
      <section className={`${SHELL} pt-5`}>
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950">
          {/* faint grid + glow, drawn in CSS so there is no image to load */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(#242836 1px, transparent 1px), linear-gradient(90deg, #242836 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-40 right-32 h-[420px] w-[620px] rounded-full bg-indigo-600 opacity-30 blur-[150px]"
          />

          <div className="relative flex flex-col gap-10 p-6 sm:p-10 lg:flex-row lg:items-center lg:gap-14">
            <div className="flex flex-col items-start gap-4 lg:w-[700px] lg:shrink-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                {t('home.badge')}
              </span>

              <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
                {t('home.hero.title')}
                <span className="text-indigo-300">{t('home.hero.titleHl')}</span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-400">{t('home.hero.sub')}</p>

              <div className="mt-1 flex flex-wrap items-center gap-3">
                <Link
                  href={signedIn ? '/courses' : '/register'}
                  className="rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white hover:bg-indigo-700"
                >
                  {signedIn ? t('home.cta.explore') : t('home.hero.ctaPrimary')}
                </Link>
                <Link
                  href="/roadmaps"
                  className="rounded-xl border border-slate-700 px-5 py-3.5 font-semibold text-slate-200 hover:bg-slate-800"
                >
                  {t('home.hero.ctaSecondary')}
                </Link>
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <Icon name="globe" className="h-3.5 w-3.5" />
                  {t('home.hero.readIn')}
                  <span className="rounded-full bg-slate-800 px-3 py-1 font-semibold text-slate-300">English</span>
                  <span className="rounded-full border border-slate-700 px-3 py-1">Hinglish</span>
                </span>
              </div>
            </div>

            {/* Real counts only — the block is dropped entirely if the DB is unreachable */}
            {stats && (
              <div className="grid flex-1 grid-cols-2 gap-3">
                <Stat value={stats.concepts} label={t('home.stats.concepts')} />
                <Stat value={stats.questions} label={t('home.stats.questions')} />
                <Stat value={stats.challenges} label={t('home.stats.challenges')} />
                <Stat value={t('home.stats.free')} label={t('home.stats.freeNote')} accent />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════ Greeting (returning learners only) ══════════ */}
      {signedIn && (
        <section className={`${SHELL} flex flex-wrap items-end justify-between gap-4 pt-8 pb-5`}>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('home.greet.title')}</h2>
            <p className="mt-1.5 text-slate-600">{t('home.greet.sub')}</p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {t('nav.dashboard')} <Icon name="arrow-right" className="h-3 w-3" />
          </Link>
        </section>
      )}

      {/* ══════════ Cockpit ══════════ */}
      <section className={`${SHELL} grid gap-4 ${signedIn ? 'pt-0' : 'pt-8'} sm:grid-cols-2 lg:grid-cols-3`}>

        {/* Concept of the day */}
        {daily && (
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:col-span-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                <Icon name="target" className="mr-1.5 h-3 w-3" />
                {t('home.today.label')}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
                {daily.difficulty}
              </span>
              {daily.course && (
                <span className="ml-auto text-xs text-slate-400">
                  <Icon name={daily.course.icon} brand className="mr-1.5 h-3 w-3" />
                  {daily.course.title}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold tracking-tight">{daily.title}</h2>
            <p className="line-clamp-3 text-slate-600">{daily.hint}…</p>

            <div className="mt-auto grid gap-2.5 sm:grid-cols-3">
              <Link
                href={`/concepts/${daily.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-semibold transition hover:border-indigo-300"
              >
                <Icon name="code" className="h-4 w-4 text-indigo-600" />
                {t('home.today.read')}
              </Link>
              <Link
                href={`/concepts/${daily.slug}#quiz`}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-semibold transition hover:border-indigo-300"
              >
                <Icon name="brain" className="h-4 w-4 text-indigo-600" />
                {t('home.today.quiz')}
              </Link>
              <Link
                href="/interview-questions"
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-semibold transition hover:border-indigo-300"
              >
                <Icon name="microphone" className="h-4 w-4 text-indigo-600" />
                {t('home.today.drill')}
              </Link>
            </div>
          </div>
        )}

        {/* Streak / sign-up + continue */}
        <HomeLearnerPanels />

        <HomeWeeklyRank />

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-3 lg:grid-cols-5">
          {QUICK_ACTIONS.map((a) => (
            <Link
              key={a.key}
              href={a.href}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold transition hover:border-indigo-300"
            >
              <Icon name={a.icon} className="h-5 w-5 text-indigo-600" />
              {t(a.key)}
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ Explore courses ══════════ */}
      <section className={`${SHELL} pt-12`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{t('home.explore.title')}</h2>
            <p className="mt-1.5 text-sm text-slate-600">{t('home.explore.sub')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', ...LEVELS].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold capitalize transition ${
                  level === l
                    ? 'bg-slate-900 text-white dark:bg-slate-700'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-300'
                }`}
              >
                {l === 'all' ? t('home.explore.all') : l}
              </button>
            ))}
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            <p>{t('home.courses.empty')}</p>
            <code className="mt-2 inline-block rounded bg-slate-100 px-2 py-1 text-sm">npm run seed</code>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-sm"
              >
                <span className="flex items-center gap-3">
                  <Icon name={c.icon} brand className="h-7 w-7" />
                  <span className="font-bold group-hover:text-indigo-600">{c.title}</span>
                  <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
                    {c.difficulty}
                  </span>
                </span>
                <span className="line-clamp-2 text-sm text-slate-600">{c.description}</span>
                <span className="mt-auto border-t border-slate-100 pt-3 text-xs font-semibold text-indigo-600">
                  {t('home.explore.open')} <Icon name="arrow-right" className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ══════════ Interview prep ══════════ */}
      <section className={`${SHELL} pt-12`}>
        <div className="flex flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:flex-row">
          <div className="flex flex-col gap-3 lg:w-[420px] lg:shrink-0">
            <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
              <Icon name="briefcase" className="mr-1.5 h-3 w-3" />
              {t('home.prep.badge')}
            </span>
            <h2 className="text-2xl font-bold tracking-tight">{t('home.prep.title')}</h2>
            <p className="text-sm leading-relaxed text-slate-600">{t('home.prep.sub')}</p>
            <div className="mt-1 flex flex-wrap gap-3">
              <Link
                href="/interview-questions"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {t('home.prep.browse')}
              </Link>
              <Link
                href="/courses"
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
              >
                {t('home.prep.mock')}
              </Link>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2.5">
            {questions.length === 0 ? (
              <p className="text-sm text-slate-500">{t('home.prep.empty')}</p>
            ) : (
              questions.map((q) => (
                <Link
                  key={q.id}
                  href="/interview-questions"
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-slate-200 px-4 py-3.5 transition hover:border-indigo-300"
                >
                  {q.course && (
                    <span className="w-28 shrink-0 truncate text-xs font-semibold text-indigo-600">{q.course.title}</span>
                  )}
                  <span className="flex-1 text-sm">{q.question}</span>
                  <span className="text-xs capitalize text-slate-400">{q.difficulty}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ══════════ Career ══════════ */}
      <section className={`${SHELL} grid gap-4 pt-4 md:grid-cols-2`}>
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50">
              <Icon name="file" className="h-5 w-5 text-indigo-600" />
            </span>
            <h2 className="text-xl font-bold">{t('home.resume.title')}</h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{t('home.resume.desc')}</p>
          <ul className="flex flex-col gap-2 text-sm text-slate-600">
            {t('home.resume.bullets').map((b) => (
              <li key={b}><Icon name="check" className="mr-2 h-3 w-3 text-green-600" />{b}</li>
            ))}
          </ul>
          <Link
            href="/resume"
            className="mt-auto w-fit rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {t('home.resume.cta')}
          </Link>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white">
              <Icon name="graduation" className="h-5 w-5 text-amber-500" />
            </span>
            <h2 className="text-xl font-bold">{t('home.cert.title')}</h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{t('home.cert.desc')}</p>
          <ul className="flex flex-col gap-2 text-sm text-slate-600">
            {t('home.cert.bullets').map((b) => (
              <li key={b}><Icon name="check" className="mr-2 h-3 w-3 text-green-600" />{b}</li>
            ))}
          </ul>
          <Link
            href="/courses"
            className="mt-auto w-fit rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-600"
          >
            {t('home.cert.cta')}
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label, accent = false }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-slate-800 p-5">
      <span className={`text-2xl font-bold tracking-tight ${accent ? 'text-indigo-400' : 'text-white'}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </span>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
}
