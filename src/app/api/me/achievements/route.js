import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import AIResult from '@/models/AIResult';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import UserProgress from '@/models/UserProgress';
import UserStats from '@/models/UserStats';
import { requireUser } from '@/lib/guards';

/**
 * Real, postable things this account has actually done.
 *
 * This exists so the post composer has grounded material to work from. Every
 * item here is derived from a stored record — nothing is offered as a prompt
 * seed unless it genuinely happened, because the fastest way to make someone
 * look foolish publicly is to hand them a milestone they did not earn.
 */
export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();

  const userId = session.user.id;
  const [stats, progress, courses, results] = await Promise.all([
    UserStats.findOne({ userId }).lean(),
    UserProgress.find({ userId, read: true }).select('courseId conceptId createdAt').lean(),
    Course.find({ status: 'published' }).select('title slug').lean(),
    AIResult.find({ userId }).sort({ createdAt: -1 }).limit(8).select('title templateId data text source createdAt').lean(),
  ]);

  const items = [];

  // ── Completed courses ────────────────────────────────────────────────────
  const totals = await Concept.aggregate([
    { $match: { status: 'published' } },
    { $group: { _id: '$courseId', total: { $sum: 1 } } },
  ]);
  const totalByCourse = Object.fromEntries(totals.map((t) => [t._id?.toString(), t.total]));
  const doneByCourse = {};
  for (const p of progress) {
    const key = p.courseId?.toString();
    if (key) doneByCourse[key] = (doneByCourse[key] || 0) + 1;
  }

  for (const c of courses) {
    const id = c._id.toString();
    const total = totalByCourse[id] || 0;
    const done = doneByCourse[id] || 0;
    if (!total || !done) continue;

    if (done >= total) {
      items.push({
        id: `course-complete-${c.slug}`,
        kind: 'course',
        title: `Finished the ${c.title} course`,
        detail: `Completed all ${total} concepts.`,
        seed: `I finished the ${c.title} course on Learnverse — all ${total} concepts.`,
      });
    } else if (done >= 5) {
      items.push({
        id: `course-progress-${c.slug}`,
        kind: 'progress',
        title: `${done} concepts into ${c.title}`,
        detail: `${Math.round((done / total) * 100)}% of the course done.`,
        seed: `I am ${Math.round((done / total) * 100)}% through the ${c.title} course — ${done} of ${total} concepts.`,
      });
    }
  }

  // ── Streaks ──────────────────────────────────────────────────────────────
  // Only offered at a length worth mentioning; a two-day streak is not a post.
  if ((stats?.currentStreak || 0) >= 3) {
    items.push({
      id: 'streak-current',
      kind: 'streak',
      title: `${stats.currentStreak}-day learning streak`,
      detail:
        stats.currentStreak === stats.longestStreak
          ? 'Your longest streak so far.'
          : `Your best is ${stats.longestStreak} days.`,
      seed: `I am on a ${stats.currentStreak}-day learning streak.`,
    });
  }

  // ── Volume milestones, only when actually crossed ────────────────────────
  const done = progress.length;
  const milestone = [250, 100, 50, 25, 10].find((n) => done >= n);
  if (milestone) {
    items.push({
      id: `concepts-${milestone}`,
      kind: 'milestone',
      title: `${milestone}+ concepts completed`,
      detail: `${done} in total so far.`,
      seed: `I have worked through ${done} programming concepts on Learnverse.`,
    });
  }

  // ── Recent AI results worth writing about ────────────────────────────────
  const insights = results
    .filter((r) => r.templateId !== 'social-post')
    .slice(0, 5)
    .map((r) => ({
      id: `result-${r._id}`,
      kind: 'insight',
      title: r.title,
      detail: r.data?.summary
        ? String(r.data.summary).slice(0, 160)
        : String(r.text || '').slice(0, 160),
      // Demo output is sample data, so it is offered as a topic to write about
      // rather than as a finding to assert.
      source: r.source,
      seed:
        r.source === 'demo'
          ? `What I have been reading about: ${r.title.toLowerCase()}.`
          : `Something I learned from a ${r.title.toLowerCase()}: ${String(r.data?.summary || '').slice(0, 200)}`,
    }));

  return NextResponse.json({
    achievements: items,
    insights,
    stats: {
      currentStreak: stats?.currentStreak || 0,
      conceptsCompleted: progress.length,
      level: stats?.level || 1,
    },
  });
}
