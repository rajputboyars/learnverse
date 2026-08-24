import Link from 'next/link';
import { ROADMAPS } from '@/data/roadmaps';
import L from '@/components/L';

export const metadata = {
  title: 'Roadmaps — Learnverse',
  description:
    'Step-by-step learning roadmaps for Frontend, Backend, Full Stack, MERN, PERN aur DevOps — sab Hinglish mein, desi examples ke saath.',
};

const DIFFICULTY_LABEL = { beginner: 'Beginner Friendly', intermediate: 'Intermediate', advanced: 'Advanced' };
const DIFFICULTY_CLASS = {
  beginner: 'bg-accent-green-tint text-accent-green-ink',
  intermediate: 'bg-amber-tint text-amber-ink',
  advanced: 'bg-red-100 text-red-700',
};

// One-off accent colors, keyed off each roadmap's `color`. indigo/green/amber/purple
// reuse the sitewide brand/accent-green/amber/violet tokens; blue/teal/fuchsia have
// no sitewide token (used only here) so they fall back to Tailwind's stock palette —
// chosen because their default shades already match the design canvas's own values.
const COLOR_ACCENT = {
  indigo: { border: 'hover:border-brand/40', ink: 'text-brand-dark', tag: 'bg-brand-tint text-brand-dark' },
  green: { border: 'hover:border-accent-green/40', ink: 'text-accent-green-ink', tag: 'bg-accent-green-tint text-accent-green-ink' },
  purple: { border: 'hover:border-violet/40', ink: 'text-violet-ink', tag: 'bg-violet-tint text-violet-ink' },
  amber: { border: 'hover:border-amber-500/40', ink: 'text-amber-ink', tag: 'bg-amber-tint text-amber-ink' },
  blue: { border: 'hover:border-blue-300', ink: 'text-blue-700', tag: 'bg-blue-50 text-blue-700' },
  teal: { border: 'hover:border-teal-300', ink: 'text-teal-700', tag: 'bg-teal-50 text-teal-700' },
  fuchsia: { border: 'hover:border-fuchsia-300', ink: 'text-fuchsia-700', tag: 'bg-fuchsia-50 text-fuchsia-700' },
};

export default function RoadmapsPage() {
  const totalCourses = [...new Set(ROADMAPS.flatMap(r => r.phases.flatMap(p => p.steps.map(s => s.courseSlug))))].length;

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[52px]">
      {/* Header */}
      <div className="text-center">
        <span className="lv-pill bg-brand-tint text-brand-dark">
          <L hi="Step-by-step paths" en="Step-by-step paths" />
        </span>
        <h1 className="mt-4 text-3xl font-bold text-ink sm:text-[38px]">Learning Roadmaps</h1>
        <p className="mx-auto mt-3 max-w-xl text-[15.5px] text-muted">
          <L
            hi="Confuse mat ho — choose karo apna path aur step-by-step aage badho. Har roadmap mein exact courses, skills aur timeline bataya gaya hai."
            en="Don't get confused — choose your path and progress step by step. Each roadmap lists the exact courses, skills and timeline."
          />
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {ROADMAPS.length} Roadmaps
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {totalCourses} <L hi="Courses covered" en="Courses covered" />
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            English + Hinglish
          </span>
        </div>
      </div>

      {/* Roadmap cards grid */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
        {ROADMAPS.map((r) => {
          const accent = COLOR_ACCENT[r.color] ?? COLOR_ACCENT.indigo;
          const totalSteps = r.phases.reduce((n, p) => n + p.steps.filter(s => !s.isExternal).length, 0);

          return (
            <Link
              key={r.slug}
              href={`/roadmaps/${r.slug}`}
              className={`lv-card group flex flex-col p-[26px] transition ${accent.border}`}
            >
              {/* Icon + difficulty */}
              <div className="flex items-start justify-between">
                <span className="text-[38px] leading-none">{r.icon}</span>
                <span className={`lv-pill ${DIFFICULTY_CLASS[r.difficulty]}`}>
                  {DIFFICULTY_LABEL[r.difficulty]}
                </span>
              </div>

              {/* Title & tagline */}
              <h2 className="mt-3.5 text-[19px] font-bold text-ink">{r.title}</h2>
              <p className="mt-1.5 text-[13px] italic text-muted">"{r.tagline}"</p>
              <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-ink-soft">{r.description}</p>

              {/* Stats row */}
              <div className="mt-3.5 flex flex-wrap items-center gap-3.5 text-[13px] text-muted">
                <span className="flex items-center gap-1">
                  📚 <strong className="text-ink-soft">{totalSteps}</strong> <L hi="courses" en="courses" />
                </span>
                <span className="flex items-center gap-1">🗓️ {r.duration}</span>
                <span className="flex items-center gap-1">
                  📈 {r.phases.length} <L hi="phases" en="phases" />
                </span>
              </div>

              {/* Tags */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {r.tags.slice(0, 4).map((t) => (
                  <span key={t} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${accent.tag}`}>
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-4">
                <span className={`inline-flex items-center gap-1 text-[13.5px] font-bold ${accent.ink}`}>
                  <L hi="Roadmap dekho" en="View roadmap" /> <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom explainer */}
      <div className="lv-card mt-12 p-8 lg:mt-14 lg:p-9">
        <h2 className="text-xl font-bold text-ink sm:text-[22px]"><L hi="Roadmap kaise use karein?" en="How to use a roadmap?" /></h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:gap-7">
          {[
            { step: '01', titleHi: 'Apna path choose karo', titleEn: 'Choose your path', descHi: 'Frontend, Backend, MERN — jo tumhara goal ho woh roadmap open karo.', descEn: 'Frontend, Backend, MERN — open the roadmap that matches your goal.' },
            { step: '02', titleHi: 'Phase by phase aage badho', titleEn: 'Progress phase by phase', descHi: 'Har phase ek building block hai — pehla phase complete karo tabhi agle pe jao.', descEn: 'Each phase is a building block — finish one before moving to the next.' },
            { step: '03', titleHi: 'Course open karo aur seekho', titleEn: 'Open a course and learn', descHi: 'Har step mein course link hai — wahan click karo aur concepts padhna shuru karo.', descEn: 'Each step links to a course — click it and start reading the concepts.' },
          ].map(({ step, titleHi, titleEn, descHi, descEn }) => (
            <div key={step} className="flex gap-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {step}
              </span>
              <div>
                <p className="text-[14.5px] font-bold text-ink"><L hi={titleHi} en={titleEn} /></p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted"><L hi={descHi} en={descEn} /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
