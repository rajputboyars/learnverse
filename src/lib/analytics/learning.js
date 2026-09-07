import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import LearningSession from '@/models/LearningSession';
import UserProgress from '@/models/UserProgress';
import UserStats from '@/models/UserStats';
import ChallengeCompletion from '@/models/ChallengeCompletion';

const DAY = 24 * 60 * 60 * 1000;
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Everything the analytics page shows, computed only from records that exist.
 *
 * Two kinds of number live here and they are kept apart:
 *
 *   - Activity (concepts completed, quizzes passed, active days, streaks) comes
 *     from progress records the platform has always kept, so it covers a user's
 *     whole history.
 *   - Time (hours, hour-of-day, session length) comes from LearningSession,
 *     which only began recording when that feature shipped. `timeTracking.since`
 *     carries that start date so the UI can say what the totals actually cover
 *     instead of implying they are lifetime figures.
 */
export async function buildAnalytics(userId) {
  await connectDB();
  const now = new Date();

  const [stats, progress, sessions, courses, challenges] = await Promise.all([
    UserStats.findOne({ userId }).lean(),
    UserProgress.find({ userId }).select('courseId conceptId read quizPassed createdAt updatedAt').lean(),
    LearningSession.find({ userId }).select('seconds localDate localHour localWeekday startedAt kind').lean(),
    Course.find({ status: 'published' }).select('title slug icon').lean(),
    ChallengeCompletion.countDocuments({ userId }).catch(() => 0),
  ]);

  const read = progress.filter((p) => p.read);
  // A progress row is created when a concept is first completed, so createdAt
  // is the moment of the activity; updatedAt moves when a quiz is passed later.
  const activityDates = progress.map((p) => new Date(p.createdAt));

  // ── Activity over time ───────────────────────────────────────────────────
  const weeks = bucketByWeek(activityDates, 12, now);
  const months = bucketByMonth(activityDates, 12, now);

  const activeDayKeys = new Set(activityDates.map((d) => dayKey(d)));
  for (const s of sessions) if (s.localDate) activeDayKeys.add(s.localDate);

  const last30 = activityDates.filter((d) => now - d <= 30 * DAY).length;
  const previous30 = activityDates.filter((d) => now - d > 30 * DAY && now - d <= 60 * DAY).length;
  const last7 = activityDates.filter((d) => now - d <= 7 * DAY).length;
  const previous7 = activityDates.filter((d) => now - d > 7 * DAY && now - d <= 14 * DAY).length;

  // ── Weekday distribution, from completions ───────────────────────────────
  // Counts completions, not time — session time gets its own weekday breakdown
  // below, because the two answer different questions.
  const byWeekday = WEEKDAYS.map((label) => ({ label, count: 0 }));
  for (const d of activityDates) byWeekday[d.getDay()].count += 1;
  const busiestWeekday = [...byWeekday].sort((a, b) => b.count - a.count)[0];

  // ── Time, only from recorded sessions ────────────────────────────────────
  const totalSeconds = sessions.reduce((sum, s) => sum + (s.seconds || 0), 0);
  const byHour = Array.from({ length: 24 }, (_, hour) => ({ hour, seconds: 0 }));
  for (const s of sessions) {
    if (Number.isInteger(s.localHour)) byHour[s.localHour].seconds += s.seconds || 0;
  }
  const busiestHour = totalSeconds ? [...byHour].sort((a, b) => b.seconds - a.seconds)[0] : null;

  const sessionWeekday = WEEKDAYS.map((label) => ({ label, seconds: 0 }));
  for (const s of sessions) {
    if (Number.isInteger(s.localWeekday)) sessionWeekday[s.localWeekday].seconds += s.seconds || 0;
  }

  const firstSession = sessions.reduce(
    (earliest, s) => (!earliest || s.startedAt < earliest ? s.startedAt : earliest),
    null
  );

  // ── Per-course completion ────────────────────────────────────────────────
  const totals = await Concept.aggregate([
    { $match: { status: 'published' } },
    { $group: { _id: '$courseId', total: { $sum: 1 } } },
  ]);
  const totalByCourse = Object.fromEntries(totals.map((t) => [t._id?.toString(), t.total]));
  const doneByCourse = {};
  for (const p of read) {
    const key = p.courseId?.toString();
    if (key) doneByCourse[key] = (doneByCourse[key] || 0) + 1;
  }

  const courseProgress = courses
    .map((c) => {
      const id = c._id.toString();
      const total = totalByCourse[id] || 0;
      const completed = doneByCourse[id] || 0;
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

  const startedConcepts = progress.length;
  const quizzesPassed = progress.filter((p) => p.quizPassed).length;

  return {
    // Activity — full history
    totalXP: stats?.totalXP || 0,
    level: stats?.level || 1,
    currentStreak: stats?.currentStreak || 0,
    longestStreak: stats?.longestStreak || 0,
    conceptsCompleted: read.length,
    quizzesPassed,
    challengesCompleted: challenges,
    activeDays: activeDayKeys.size,
    completionRate: startedConcepts ? Math.round((read.length / startedConcepts) * 100) : 0,
    coursesStarted: courseProgress.length,
    coursesCompleted: courseProgress.filter((c) => c.total > 0 && c.pct === 100).length,
    courseProgress,

    weeks,
    months,
    byWeekday,
    busiestWeekday: busiestWeekday?.count ? busiestWeekday : null,

    // Self-comparison — this period against the one before it
    comparison: {
      last7,
      previous7,
      last30,
      previous30,
      week: changePct(last7, previous7),
      month: changePct(last30, previous30),
    },

    // Time — only since tracking began
    timeTracking: {
      since: firstSession || null,
      totalSeconds,
      sessionCount: sessions.length,
      byHour,
      byWeekday: sessionWeekday,
      busiestHour: busiestHour?.seconds ? busiestHour : null,
      averageSessionSeconds: sessions.length ? Math.round(totalSeconds / sessions.length) : 0,
    },
  };
}

/** Percent change, or null when there is no baseline to compare against. */
function changePct(current, previous) {
  if (!previous) return null;
  return Math.round(((current - previous) / previous) * 100);
}

function dayKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function bucketByWeek(dates, count, now) {
  const buckets = Array.from({ length: count }, (_, i) => {
    const end = new Date(now.getTime() - i * 7 * DAY);
    const start = new Date(end.getTime() - 7 * DAY);
    return { start, end, label: shortDate(start), count: 0 };
  }).reverse();

  for (const d of dates) {
    for (const b of buckets) {
      if (d > b.start && d <= b.end) {
        b.count += 1;
        break;
      }
    }
  }
  return buckets.map((b) => ({ label: b.label, count: b.count }));
}

function bucketByMonth(dates, count, now) {
  const buckets = Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return { year: d.getFullYear(), month: d.getMonth(), label: monthLabel(d), count: 0 };
  }).reverse();

  for (const d of dates) {
    const b = buckets.find((x) => x.year === d.getFullYear() && x.month === d.getMonth());
    if (b) b.count += 1;
  }
  return buckets.map((b) => ({ label: b.label, count: b.count }));
}

function shortDate(d) {
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

function monthLabel(d) {
  return d.toLocaleDateString(undefined, { month: 'short' });
}
