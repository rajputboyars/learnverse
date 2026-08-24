import { ROADMAPS } from '@/data/roadmaps';

// Pure helpers for the dashboard's "your roadmap" preview widget.
// No DB / server imports — safe to use from client components.

function flattenSteps(roadmap) {
  return roadmap.phases.flatMap((phase) => phase.steps);
}

// Learnverse doesn't track "the roadmap you're on" — so we infer it: whichever
// roadmap has the most course progress overlapping its steps wins. Falls
// back to the first roadmap (frontend) for brand-new users with no progress.
export function pickRoadmapForProgress(courseProgress) {
  const pctBySlug = Object.fromEntries((courseProgress || []).map((c) => [c.slug, c.pct]));
  let best = ROADMAPS[0];
  let bestScore = -1;
  for (const roadmap of ROADMAPS) {
    const score = flattenSteps(roadmap).reduce((sum, s) => sum + (pctBySlug[s.courseSlug] || 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = roadmap;
    }
  }
  return best;
}

// First N steps of a roadmap, each tagged with its real progress % and a
// 'done' | 'current' | 'locked' state (locked = comes after the first
// not-yet-finished step, matching the redesign's sequential-unlock look).
export function roadmapPreviewSteps(roadmap, courseProgress, count = 4) {
  const bySlug = Object.fromEntries((courseProgress || []).map((c) => [c.slug, c]));
  const steps = flattenSteps(roadmap)
    .slice(0, count)
    .map((s) => {
      const course = bySlug[s.courseSlug];
      return {
        courseSlug: s.courseSlug,
        title: course?.title || s.courseSlug,
        icon: course?.icon || '📘',
        pct: course?.pct ?? 0,
      };
    });
  const firstIncomplete = steps.findIndex((s) => s.pct < 100);
  return steps.map((s, i) => ({
    ...s,
    state: firstIncomplete === -1 || i < firstIncomplete ? 'done' : i === firstIncomplete ? 'current' : 'locked',
  }));
}
