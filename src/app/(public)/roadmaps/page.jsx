import Link from 'next/link';
import { ROADMAPS } from '@/data/roadmaps';

export const metadata = {
  title: 'Roadmaps — Learnverse',
  description:
    'Step-by-step learning roadmaps for Frontend, Backend, Full Stack, MERN, PERN aur DevOps — sab Hinglish mein, desi examples ke saath.',
};

const DIFFICULTY_LABEL = { beginner: 'Beginner Friendly', intermediate: 'Intermediate', advanced: 'Advanced' };
const DIFFICULTY_CLASS = {
  beginner:     'bg-green-100 text-green-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced:     'bg-red-100 text-red-700',
};

const COLOR_ACCENT = {
  indigo: 'hover:border-indigo-300 group-hover:text-indigo-600',
  green:  'hover:border-green-300  group-hover:text-green-600',
  purple: 'hover:border-purple-300 group-hover:text-purple-600',
  amber:  'hover:border-amber-300  group-hover:text-amber-600',
  blue:   'hover:border-blue-300   group-hover:text-blue-600',
  teal:   'hover:border-teal-300   group-hover:text-teal-600',
};

const COLOR_TAG = {
  indigo: 'bg-indigo-50 text-indigo-600',
  green:  'bg-green-50  text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  amber:  'bg-amber-50  text-amber-600',
  blue:   'bg-blue-50   text-blue-600',
  teal:   'bg-teal-50   text-teal-600',
};

export default function RoadmapsPage() {
  const totalCourses = [...new Set(ROADMAPS.flatMap(r => r.phases.flatMap(p => p.steps.map(s => s.courseSlug))))].length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          Step-by-step paths
        </span>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Learning Roadmaps</h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Confuse mat ho — choose karo apna path aur step-by-step aage badho.
          Har roadmap mein exact courses, skills aur timeline bataya gaya hai.
        </p>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            {ROADMAPS.length} Roadmaps
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            {totalCourses} Courses covered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            English + Hinglish
          </span>
        </div>
      </div>

      {/* Roadmap cards grid */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ROADMAPS.map((r) => {
          const accent = COLOR_ACCENT[r.color] ?? COLOR_ACCENT.indigo;
          const tag    = COLOR_TAG[r.color]    ?? COLOR_TAG.indigo;
          const totalSteps = r.phases.reduce((n, p) => n + p.steps.filter(s => !s.isExternal).length, 0);

          return (
            <Link
              key={r.slug}
              href={`/roadmaps/${r.slug}`}
              className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-md ${accent}`}
            >
              {/* Icon + difficulty */}
              <div className="flex items-start justify-between">
                <span className="text-4xl">{r.icon}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_CLASS[r.difficulty]}`}>
                  {DIFFICULTY_LABEL[r.difficulty]}
                </span>
              </div>

              {/* Title & tagline */}
              <h2 className={`mt-4 text-lg font-bold text-slate-900 transition`}>{r.title}</h2>
              <p className="mt-1 text-sm text-slate-500 italic">"{r.tagline}"</p>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{r.description}</p>

              {/* Stats row */}
              <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  📚 <strong>{totalSteps}</strong> courses
                </span>
                <span className="flex items-center gap-1">
                  🗓️ {r.duration}
                </span>
                <span className="flex items-center gap-1">
                  📈 {r.phases.length} phases
                </span>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.tags.slice(0, 4).map((t) => (
                  <span key={t} className={`rounded-full px-2 py-0.5 text-xs font-medium ${tag}`}>
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-5">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                  View roadmap <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom explainer */}
      <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-xl font-bold text-slate-900">Roadmap kaise use karein?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { step: '01', title: 'Apna path choose karo', desc: 'Frontend, Backend, MERN — jo tumhara goal ho woh roadmap open karo.' },
            { step: '02', title: 'Phase by phase aage badho', desc: 'Har phase ek building block hai — pehla phase complete karo tabhi agle pe jao.' },
            { step: '03', title: 'Course open karo aur seekho', desc: 'Har step mein course link hai — wahan click karo aur concepts padhna shuru karo.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {step}
              </span>
              <div>
                <p className="font-semibold text-slate-800">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
