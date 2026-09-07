import { connectDB } from '@/lib/db';
import UserStats from '@/models/UserStats';
import UserProgress from '@/models/UserProgress';
import Concept from '@/models/Concept';
import Course from '@/models/Course';

const DAY = 24 * 60 * 60 * 1000;

/**
 * The learner's real recorded activity, shaped for a prompt.
 *
 * Only data the platform actually stores goes in here — no estimates, no
 * placeholder numbers — because the templates instruct the model to ground
 * every observation in these fields.
 */
export async function buildLearningContext(userId) {
  await connectDB();

  const [stats, progress, courses] = await Promise.all([
    UserStats.findOne({ userId }).lean(),
    UserProgress.find({ userId }).select('courseId conceptId read quizPassed updatedAt').lean(),
    Course.find({ status: 'published' }).select('title slug').lean(),
  ]);

  const now = Date.now();
  const readDocs = progress.filter((p) => p.read);
  const inLast = (days) => progress.filter((p) => now - new Date(p.updatedAt).getTime() <= days * DAY).length;

  // Per-course completion, same definition the dashboard uses.
  const totals = await Concept.aggregate([
    { $match: { status: 'published' } },
    { $group: { _id: '$courseId', total: { $sum: 1 } } },
  ]);
  const totalByCourse = Object.fromEntries(totals.map((t) => [t._id?.toString(), t.total]));
  const doneByCourse = {};
  for (const p of readDocs) {
    const key = p.courseId?.toString();
    if (key) doneByCourse[key] = (doneByCourse[key] || 0) + 1;
  }

  const courseProgress = courses
    .map((c) => {
      const id = c._id.toString();
      const total = totalByCourse[id] || 0;
      const completed = doneByCourse[id] || 0;
      return { course: c.title, completed, total, pct: total ? Math.round((completed / total) * 100) : 0 };
    })
    .filter((c) => c.completed > 0)
    .sort((a, b) => b.pct - a.pct);

  // Activity by weekday, from the days progress rows were last touched.
  const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const byWeekday = {};
  for (const p of progress) {
    const d = WEEKDAYS[new Date(p.updatedAt).getDay()];
    byWeekday[d] = (byWeekday[d] || 0) + 1;
  }

  return {
    totalXP: stats?.totalXP || 0,
    weeklyXP: stats?.weeklyXP || 0,
    level: stats?.level || 1,
    currentStreak: stats?.currentStreak || 0,
    longestStreak: stats?.longestStreak || 0,
    conceptsCompleted: stats?.conceptsCompleted || 0,
    quizzesPassed: progress.filter((p) => p.quizPassed).length,
    activityLast7Days: inLast(7),
    activityLast30Days: inLast(30),
    activityPrevious30Days: progress.filter((p) => {
      const age = now - new Date(p.updatedAt).getTime();
      return age > 30 * DAY && age <= 60 * DAY;
    }).length,
    coursesStarted: courseProgress.length,
    coursesCompleted: courseProgress.filter((c) => c.pct === 100).length,
    courseProgress,
    activityByWeekday: byWeekday,
    accountAgeDays: stats?.createdAt ? Math.round((now - new Date(stats.createdAt).getTime()) / DAY) : 0,
  };
}
