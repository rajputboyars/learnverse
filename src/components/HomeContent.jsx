'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';
import LanguageToggle from './LanguageToggle';
import ContinueLearning from './ContinueLearning';

// Bento tile sizes, applied by index so the layout holds for any number of
// highlights: one hero tile, then alternating small/wide rows.
// `col-span-2` reads as full-width in the 2-col mobile grid and as a half-width
// wide tile in the 4-col desktop grid, so one set of spans serves both.
const BENTO_SPAN = [
  'col-span-2 sm:row-span-2',
  '', '',
  'col-span-2',
  '', '',
  'col-span-2',
];
function spanFor(i) {
  return BENTO_SPAN[i] ?? '';
}

function CheckIcon({ className = '' }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`}>
      <path d="M20.3 5.7a1 1 0 010 1.4l-10 10a1 1 0 01-1.42 0l-5-5a1 1 0 111.42-1.4L9.6 15l9.3-9.3a1 1 0 011.4 0z" />
    </svg>
  );
}

export default function HomeContent({ courses, daily }) {
  const { t } = useLang();

  const features = t('home.features');
  const highlights = t('home.highlights');

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-[120px] -top-[160px] h-[560px] w-[560px] rounded-full"
          style={{ background: 'radial-gradient(circle,var(--color-brand-tint-2) 0%,transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-[200px] -left-[160px] h-[480px] w-[480px] rounded-full"
          style={{ background: 'radial-gradient(circle,var(--color-amber-tint-2) 0%,transparent 70%)' }}
        />

        <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-10 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-16 lg:pt-[88px]">
          <div>
            <span className="lv-pill bg-brand-tint text-brand-dark">{t('home.badge')}</span>
            <h1 className="mt-5 text-[40px] font-bold leading-[1.05] text-ink sm:text-[56px]">
              {t('home.title.prefix')}
              <span className="relative text-brand">
                {t('home.title.highlight')}
                <svg
                  viewBox="0 0 230 14"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-2.5 w-full"
                >
                  <path d="M2 10C40 2 190 2 228 10" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              {t('home.title.suffix')}
            </h1>
            <p className="mt-7 max-w-[520px] text-[17px] leading-relaxed text-ink-soft sm:text-[18px]">
              {t('home.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link href="/courses" className="lv-btn lv-btn-primary">{t('home.cta.explore')}</Link>
              <Link href="/interview-questions" className="lv-btn lv-btn-ghost">{t('home.cta.interview')}</Link>
            </div>

            {/* Language picker — visible right on landing */}
            <div className="mt-7 flex items-center gap-2 text-sm text-muted">
              <span>🌐 {t('home.langPick')}</span>
              <LanguageToggle />
            </div>
          </div>

          {/* Floating card collage — decorative product illustration */}
          <div className="relative hidden h-[440px] lg:block" aria-hidden="true">
            <div className="lv-card absolute left-[30px] top-0 w-[300px] -rotate-[4deg] p-5 shadow-[0_24px_50px_-20px_rgba(11,17,32,.2)]">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-dark">{t('home.cotd.label')}</div>
              <h3 className="mt-2 text-[19px] font-bold text-ink">{daily?.title || 'Merge Sort'}</h3>
              <div className="mt-3.5 flex h-[34px] items-end gap-[3px]">
                {[14, 26, 10, 34, 20, 30].map((h, i) => (
                  <div
                    key={i}
                    className={`w-2.5 rounded-[3px] ${i % 2 ? 'bg-brand' : 'bg-brand-tint-2'}`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <span className="lv-pill mt-3 bg-brand-tint text-[11px] text-brand-dark">
                {daily?.course ? `${daily.course.icon} ${daily.course.title}` : '🧩 DSA'}
                {daily?.difficulty ? ` · ${daily.difficulty}` : ' · Medium'}
              </span>
            </div>

            <div className="lv-card absolute right-0 top-[60px] w-[220px] rotate-[5deg] p-[18px] shadow-[0_24px_50px_-20px_rgba(11,17,32,.2)]">
              <pre className="rounded-[10px] p-3 font-mono text-xs leading-relaxed text-[#d9f99d]" style={{ background: 'var(--color-ink)' }}>
{`function merge(a,b) {
  return [...a,...b]
    .sort();
}`}
              </pre>
            </div>

            <div className="lv-card absolute bottom-10 left-0 flex -rotate-[3deg] items-center gap-2.5 border-amber-tint-2 px-5 py-4 shadow-[0_20px_40px_-18px_rgba(245,158,11,.35)]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#f59e0b">
                <path d="M12 2c1 4 5 6 5 11a5 5 0 11-10 0c0-2 1-3 2-4-.3 2 .5 3 1 3 .5-3-.5-6 2-10z" />
              </svg>
              <div>
                <div className="text-lg font-bold text-ink">{t('home.hero.streak')}</div>
                <div className="text-[11px] text-muted">{t('home.hero.streakLabel')}</div>
              </div>
            </div>

            <div className="absolute bottom-0 right-[30px] rotate-[3deg] rounded-2xl bg-violet px-[18px] py-3 text-sm font-bold text-white shadow-[0_20px_40px_-16px_rgba(139,92,246,.5)]">
              {t('home.hero.xp')}
            </div>
          </div>
        </div>
      </section>

      {/* Continue learning (logged-in users) */}
      <ContinueLearning />

      {/* Concept of the Day */}
      {daily && (
        <section className="mx-auto w-full max-w-[1240px] px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={`/concepts/${daily.slug}`}
            className="lv-card group block border-brand-tint-2 p-6 transition hover:border-brand/40"
            style={{ background: 'linear-gradient(155deg,var(--color-brand-tint),var(--color-card))' }}
          >
            <div className="flex items-center gap-2 text-sm font-bold text-brand-dark">
              {t('home.cotd.label')}
            </div>
            <h2 className="mt-2 text-xl font-bold text-ink group-hover:text-brand">{daily.title}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{daily.hint}…</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-soft">
              {daily.course && <span>{daily.course.icon} {daily.course.title}</span>}
              <span className="capitalize">· {daily.difficulty}</span>
              <span className="ml-auto font-bold text-brand">{t('home.cotd.go')}</span>
            </div>
          </Link>
        </section>
      )}

      {/* ── Feature strip ── */}
      <section className="mx-auto w-full max-w-[1240px] px-4 pb-[70px] pt-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="lv-card p-[22px] transition hover:-translate-y-[3px] hover:shadow-[0_16px_32px_-18px_rgba(11,17,32,.25)]"
            >
              <div className="text-[28px]">{f.icon}</div>
              <h3 className="mt-3.5 text-base font-bold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Toolkit bento (dark) ── */}
      <section className="py-16 lg:py-20" style={{ background: 'var(--color-ink)' }}>
        <div className="mx-auto w-full max-w-[1240px] px-4 text-center sm:px-6 lg:px-8">
          <span className="lv-pill bg-white/10 text-white">{t('home.showcase.badge')}</span>
          <h2 className="mt-4 text-[28px] font-bold text-white sm:text-[36px]">{t('home.showcase.title')}</h2>
          <p className="mx-auto mt-3.5 max-w-[560px] text-slate-400">{t('home.showcase.sub')}</p>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[1240px] grid-cols-2 gap-3 px-4 sm:auto-rows-[150px] sm:grid-cols-4 sm:gap-4 sm:px-6 lg:mt-12 lg:px-8">
          {highlights.map((f, i) => (
            <Link
              key={f.title}
              href={f.href}
              className={`flex flex-col justify-end rounded-3xl border border-white/10 p-[22px] transition hover:border-white/25 ${spanFor(i)}`}
              style={{ background: i === 0 ? 'linear-gradient(150deg,#1e1b4b,var(--color-dark-card))' : 'var(--color-dark-card)' }}
            >
              <div className="text-2xl">{f.icon}</div>
              <h3 className={`mt-2.5 font-bold text-white ${i === 0 ? 'text-[19px]' : 'text-[15px]'}`}>{f.title}</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-400">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Career toolkit ── */}
      <section className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <span className="lv-pill bg-amber-tint text-amber-ink">{t('home.career.badge')}</span>
          <h2 className="mt-4 text-[28px] font-bold text-ink sm:text-[34px]">{t('home.career.title')}</h2>
          <p className="mx-auto mt-3 max-w-[520px] text-muted">{t('home.career.sub')}</p>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-2">
          {/* Resume Builder */}
          <div
            className="lv-card flex flex-col border-brand-tint-2 p-8 sm:p-9"
            style={{ background: 'linear-gradient(155deg,var(--color-brand-tint),var(--color-card) 60%)' }}
          >
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-card text-2xl shadow-[0_8px_20px_-8px_rgba(79,70,229,.3)]">📄</div>
            <h3 className="mt-[18px] text-[22px] font-bold text-ink">{t('home.resume.title')}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{t('home.resume.desc')}</p>
            <ul className="mt-[18px] flex flex-col gap-2 text-[13.5px] text-ink-soft">
              {t('home.resume.bullets').map((b) => (
                <li key={b} className="flex items-center gap-2"><CheckIcon className="text-brand" /> {b}</li>
              ))}
            </ul>
            <Link href="/resume" className="lv-btn lv-btn-primary mt-6 w-fit">{t('home.resume.cta')}</Link>
          </div>

          {/* Certificates */}
          <div
            className="lv-card flex flex-col border-amber-tint-2 p-8 sm:p-9"
            style={{ background: 'linear-gradient(155deg,var(--color-amber-tint),var(--color-card) 60%)' }}
          >
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-card text-2xl shadow-[0_8px_20px_-8px_rgba(245,158,11,.3)]">🎓</div>
            <h3 className="mt-[18px] text-[22px] font-bold text-ink">{t('home.cert.title')}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{t('home.cert.desc')}</p>
            <ul className="mt-[18px] flex flex-col gap-2 text-[13.5px] text-ink-soft">
              {t('home.cert.bullets').map((b) => (
                <li key={b} className="flex items-center gap-2"><CheckIcon className="text-amber-ink" /> {b}</li>
              ))}
            </ul>
            <Link href="/certificates" className="lv-btn lv-btn-amber mt-6 w-fit">{t('home.cert.cta')}</Link>
          </div>
        </div>
      </section>

      {/* ── Courses ── */}
      <section className="mx-auto w-full max-w-[1240px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-ink sm:text-[28px]">{t('home.courses.title')}</h2>
          <Link href="/courses" className="text-sm font-bold text-brand hover:underline">
            {t('home.courses.viewAll')}
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line p-10 text-center text-muted">
            <p>{t('home.courses.empty')}</p>
            <code className="mt-2 inline-block rounded bg-line-soft px-2 py-1 text-sm">npm run seed</code>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.slug}`}
                className="lv-card group p-6 transition hover:-translate-y-[3px] hover:border-brand/40"
              >
                <div className="text-3xl">{c.icon}</div>
                <h3 className="mt-3 font-bold text-ink group-hover:text-brand">{c.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{c.description}</p>
                <span className="mt-3 inline-block text-xs font-semibold capitalize text-muted-soft">{c.difficulty}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
