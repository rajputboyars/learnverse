import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ROADMAPS, COURSE_META, ROADMAP_COLORS } from '@/data/roadmaps';

export function generateStaticParams() {
  return ROADMAPS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const roadmap = ROADMAPS.find((r) => r.slug === slug);
  if (!roadmap) return {};
  return {
    title: `${roadmap.title} Roadmap — Learnverse`,
    description: roadmap.description,
  };
}

const DIFFICULTY_CLASS = {
  beginner:     'bg-green-100 text-green-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced:     'bg-red-100   text-red-700',
};

const LEVEL_META = {
  beginner:     { label: 'Beginner',     icon: '🌱' },
  intermediate: { label: 'Intermediate', icon: '🚀' },
  advanced:     { label: 'Advanced',     icon: '🏆' },
};

export default async function RoadmapDetailPage({ params }) {
  const { slug } = await params;
  const roadmap = ROADMAPS.find((r) => r.slug === slug);
  if (!roadmap) notFound();

  const colors = ROADMAP_COLORS[roadmap.color] ?? ROADMAP_COLORS.indigo;
  const allSteps = roadmap.phases.flatMap((p) => p.steps);
  const totalSteps = allSteps.filter((s) => !s.isExternal).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">

      {/* Breadcrumb */}
      <Link href="/roadmaps" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600">
        ← All Roadmaps
      </Link>

      {/* Hero */}
      <div className={`mt-6 rounded-2xl border p-8 ${colors.bg} ${colors.border}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-5xl">{roadmap.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{roadmap.title}</h1>
                <p className={`mt-0.5 text-sm font-medium italic ${colors.text}`}>"{roadmap.tagline}"</p>
              </div>
            </div>
            <p className="mt-4 text-slate-700 leading-relaxed">{roadmap.description}</p>
          </div>
        </div>

        {/* Meta pills */}
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <span className={`rounded-full px-3 py-1 font-medium ${DIFFICULTY_CLASS[roadmap.difficulty]}`}>
            {roadmap.difficulty === 'beginner' ? '🌱' : roadmap.difficulty === 'advanced' ? '🏆' : '🚀'} {roadmap.difficulty}
          </span>
          <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700 border border-slate-200">
            🗓️ {roadmap.duration}
          </span>
          <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700 border border-slate-200">
            📚 {totalSteps} courses
          </span>
          <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700 border border-slate-200">
            📈 {roadmap.phases.length} phases
          </span>
        </div>

        {/* Outcomes */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-700 mb-2">Is roadmap ke baad tum kar sakoge:</p>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {roadmap.outcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className={`mt-0.5 shrink-0 font-bold ${colors.text}`}>✓</span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full Roadmap Timeline */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Complete Roadmap</h2>
        <p className="mt-1 text-sm text-slate-500">
          Har phase ek building block hai — sequence follow karo for best results.
        </p>

        <div className="mt-8 space-y-12">
          {roadmap.phases.map((phase, phaseIdx) => {
            const levelMeta = LEVEL_META[phase.level] ?? LEVEL_META.beginner;
            return (
              <div key={phaseIdx}>
                {/* Phase header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${colors.dot}`}>
                    {phaseIdx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">{phase.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${DIFFICULTY_CLASS[phase.level]}`}>
                        {levelMeta.icon} {levelMeta.label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{phase.description}</p>
                  </div>
                </div>

                {/* Steps */}
                <div className="ml-5 space-y-4 border-l-2 pl-6 pb-2" style={{ borderColor: 'rgb(226 232 240)' }}>
                  {phase.steps.map((step, stepIdx) => {
                    if (step.isExternal) {
                      return (
                        <ExternalStepCard
                          key={stepIdx}
                          step={step}
                          colors={colors}
                          globalOrder={step.order}
                        />
                      );
                    }
                    const meta = COURSE_META[step.courseSlug];
                    if (!meta) return null;
                    return (
                      <StepCard
                        key={stepIdx}
                        step={step}
                        meta={meta}
                        colors={colors}
                        globalOrder={step.order}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-2xl font-bold text-slate-900">Ready ho? Shuru karo! 🚀</p>
        <p className="mt-2 text-slate-600">
          Phase 1 se start karo — ek step ek time. Consistency hi key hai.
        </p>
        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/courses/${roadmap.phases[0]?.steps[0]?.courseSlug}`}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 transition"
          >
            Start Phase 1 →
          </Link>
          <Link
            href="/courses"
            className="rounded-xl border border-slate-200 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, meta, colors, globalOrder }) {
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
      {/* Step number dot on the timeline */}
      <div className={`absolute -left-[1.95rem] top-5 h-3.5 w-3.5 rounded-full border-2 border-white ${colors.dot}`} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Icon + order */}
        <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-1 sm:w-14">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl ${colors.bg} shrink-0`}>
            {meta.icon}
          </div>
          <span className="text-xs font-medium text-slate-400">Step {globalOrder}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-bold text-slate-900">{meta.title}</h4>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${DIFFICULTY_CLASS[meta.difficulty]}`}>
              {meta.difficulty}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
              ⏱ {step.duration}
            </span>
          </div>

          {/* Why this course */}
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            <span className="font-medium text-slate-700">Kyun zaroori hai: </span>
            {step.why}
          </p>

          {/* Skills */}
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
              Skills tum seekhoge
            </p>
            <div className="flex flex-wrap gap-1.5">
              {step.skills.map((s) => (
                <span key={s} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.badge}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4">
            <Link
              href={`/courses/${step.courseSlug}`}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-white transition ${colors.dot} hover:opacity-90`}
            >
              {meta.icon} Start {meta.title} <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExternalStepCard({ step, colors, globalOrder }) {
  return (
    <div className="relative rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
      <div className="absolute -left-[1.95rem] top-5 h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-400" />

      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{step.externalIcon ?? '📖'}</span>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-slate-900">{step.externalTitle ?? 'External Resource'}</h4>
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600">External</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">⏱ {step.duration}</span>
          </div>
          <p className="text-xs text-slate-400">Step {globalOrder}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">
        <span className="font-medium text-slate-700">Kyun zaroori hai: </span>
        {step.why}
      </p>

      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.externalDescription}</p>

      {step.skills && (
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {step.skills.map((s) => (
              <span key={s} className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
