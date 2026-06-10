import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import UserStats from '@/models/UserStats';
import UserProgress from '@/models/UserProgress';
import Bookmark from '@/models/Bookmark';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import { requireUser } from '@/lib/guards';
import { xpForNextLevel } from '@/services/xp';

export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const userId = session.user.id;

  const [stats, progress, bookmarks, courses] = await Promise.all([
    UserStats.findOne({ userId }).lean(),
    UserProgress.find({ userId, read: true }).select('courseId conceptId').lean(),
    Bookmark.find({ userId }).sort({ createdAt: -1 }).select('conceptId').lean(),
    Course.find({ status: 'published' }).select('title slug icon').sort({ order: 1 }).lean(),
  ]);

  // Per-course progress: completed (read) / total published concepts.
  const completedByCourse = {};
  for (const p of progress) {
    const key = p.courseId?.toString();
    if (key) completedByCourse[key] = (completedByCourse[key] || 0) + 1;
  }
  const totals = await Concept.aggregate([
    { $match: { status: 'published' } },
    { $group: { _id: '$courseId', total: { $sum: 1 } } },
  ]);
  const totalByCourse = {};
  for (const t of totals) totalByCourse[t._id?.toString()] = t.total;

  const courseProgress = courses
    .map((c) => {
      const id = c._id.toString();
      const total = totalByCourse[id] || 0;
      const completed = completedByCourse[id] || 0;
      return {
        title: c.title,
        slug: c.slug,
        icon: c.icon,
        total,
        completed,
        pct: total ? Math.round((completed / total) * 100) : 0,
      };
    })
    .filter((c) => c.completed > 0)
    .sort((a, b) => b.pct - a.pct);

  // Bookmarked concept details.
  const bmIds = bookmarks.map((b) => b.conceptId);
  const bmConcepts = await Concept.find({ _id: { $in: bmIds } })
    .select('title slug difficulty')
    .lean();
  const bmMap = {};
  for (const c of bmConcepts) bmMap[c._id.toString()] = c;
  const bookmarkList = bookmarks
    .map((b) => bmMap[b.conceptId.toString()])
    .filter(Boolean)
    .map((c) => ({ title: c.title, slug: c.slug, difficulty: c.difficulty }));

  return NextResponse.json({
    totalXP: stats?.totalXP || 0,
    weeklyXP: stats?.weeklyXP || 0,
    level: stats?.level || 1,
    currentStreak: stats?.currentStreak || 0,
    longestStreak: stats?.longestStreak || 0,
    conceptsCompleted: stats?.conceptsCompleted || 0,
    nextLevelAt: xpForNextLevel(stats?.totalXP || 0),
    courseProgress,
    bookmarks: bookmarkList,
  });
}
