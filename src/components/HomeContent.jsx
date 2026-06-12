'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';
import LanguageToggle from './LanguageToggle';
import ContinueLearning from './ContinueLearning';

export default function HomeContent({ courses, daily }) {
  const { t } = useLang();

  const features = t('home.features');
  const highlights = t('home.highlights');

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 text-center sm:pt-24">
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
          {t('home.badge')}
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          {t('home.title.prefix')}
          <span className="text-indigo-600">{t('home.title.highlight')}</span>
          {t('home.title.suffix')}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">{t('home.subtitle')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/courses" className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
            {t('home.cta.explore')}
          </Link>
          <Link href="/interview-questions" className="rounded-lg border border-slate-200 px-6 py-3 font-semibold hover:bg-slate-50">
            {t('home.cta.interview')}
          </Link>
        </div>

        {/* Language picker — visible right on landing */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
          <span>🌐 {t('home.langPick')}</span>
          <LanguageToggle />
        </div>
      </section>

      {/* Continue learning (logged-in users) */}
      <ContinueLearning />

      {/* Concept of the Day */}
      {daily && (
        <section className="mx-auto max-w-6xl px-4 py-4">
          <Link
            href={`/concepts/${daily.slug}`}
            className="group block rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 transition hover:border-indigo-300"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
              {t('home.cotd.label')}
            </div>
            <h2 className="mt-2 text-xl font-bold group-hover:text-indigo-600">{daily.title}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">{daily.hint}…</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              {daily.course && <span>{daily.course.icon} {daily.course.title}</span>}
              <span className="capitalize">· {daily.difficulty}</span>
              <span className="ml-auto font-semibold text-indigo-600">{t('home.cotd.go')}</span>
            </div>
          </Link>
        </section>
      )}

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Everything you get — interactive features showcase */}
      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">{t('home.showcase.title')}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">{t('home.showcase.sub')}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-sm"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-2xl">{f.icon}</span>
                <div>
                  <h3 className="font-semibold group-hover:text-indigo-600">{f.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Career toolkit — Resume Builder + Certificates */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="text-center">
          <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            {t('home.career.badge')}
          </span>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{t('home.career.title')}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">{t('home.career.sub')}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* Resume Builder */}
          <div className="group flex flex-col overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-8 transition hover:border-indigo-300 hover:shadow-sm">
            <div className="text-4xl">📄</div>
            <h3 className="mt-4 text-xl font-bold">{t('home.resume.title')}</h3>
            <p className="mt-2 text-sm text-slate-600">{t('home.resume.desc')}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
              {t('home.resume.bullets').map((b) => <li key={b}>{b}</li>)}
            </ul>
            <Link href="/resume" className="mt-6 inline-block w-fit rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
              {t('home.resume.cta')}
            </Link>
          </div>

          {/* Certificates */}
          <div className="group flex flex-col overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 transition hover:border-amber-300 hover:shadow-sm">
            <div className="text-4xl">🎓</div>
            <h3 className="mt-4 text-xl font-bold">{t('home.cert.title')}</h3>
            <p className="mt-2 text-sm text-slate-600">{t('home.cert.desc')}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
              {t('home.cert.bullets').map((b) => <li key={b}>{b}</li>)}
            </ul>
            <Link href="/courses" className="mt-6 inline-block w-fit rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600">
              {t('home.cert.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t('home.courses.title')}</h2>
          <Link href="/courses" className="text-sm font-medium text-indigo-600 hover:underline">
            {t('home.courses.viewAll')}
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            <p>{t('home.courses.empty')}</p>
            <code className="mt-2 inline-block rounded bg-slate-100 px-2 py-1 text-sm">npm run seed</code>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-sm"
              >
                <div className="text-3xl">{c.icon}</div>
                <h3 className="mt-3 font-semibold group-hover:text-indigo-600">{c.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{c.description}</p>
                <span className="mt-3 inline-block text-xs font-medium capitalize text-slate-400">{c.difficulty}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
