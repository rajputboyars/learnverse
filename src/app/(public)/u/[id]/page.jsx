import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import UserStats from '@/models/UserStats';
import UserProgress from '@/models/UserProgress';
import Bookmark from '@/models/Bookmark';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import { evaluateBadges } from '@/lib/badges';
import ShareButtons from '@/components/ShareButtons';
import L from '@/components/L';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    await connectDB();
    const stats = await UserStats.findOne({ userId: id }).select('name totalXP').lean();
    if (!stats) return { title: 'Profile' };
    return {
      title: `${stats.name || 'Learner'}'s Profile`,
      description: `${stats.name || 'A learner'} has earned ${stats.totalXP || 0} XP on Learnverse.`,
    };
  } catch {
    return { title: 'Profile' };
  }
}

async function getProfile(id) {
  await connectDB();
  const stats = await UserStats.findOne({ userId: id }).lean();
  if (!stats) return null;

  const [quizzesPassed, bookmarks, progress, courses] = await Promise.all([
    UserProgress.countDocuments({ userId: id, quizPassed: true }),
    Bookmark.countDocuments({ userId: id }),
    UserProgress.find({ userId: id, read: true }).select('courseId').lean(),
    Course.find({ status: 'published' }).select('title icon').lean(),
  ]);

  const completedByCourse = {};
  for (const p of progress) {
    const k = p.courseId?.toString();
    if (k) completedByCourse[k] = (completedByCourse[k] || 0) + 1;
  }
  const totals = await Concept.aggregate([
    { $match: { status: 'published' } },
    { $group: { _id: '$courseId', total: { $sum: 1 } } },
  ]);
  const totalByCourse = {};
  for (const t of totals) totalByCourse[t._id?.toString()] = t.total;

  const completedCourses = courses.filter((c) => {
    const id2 = c._id.toString();
    const total = totalByCourse[id2] || 0;
    return total > 0 && (completedByCourse[id2] || 0) >= total;
  });

  const badges = evaluateBadges({
    totalXP: stats.totalXP || 0,
    longestStreak: stats.longestStreak || 0,
    conceptsCompleted: stats.conceptsCompleted || 0,
    quizzesPassed,
    bookmarks,
    completedCourses: completedCourses.length,
  });

  return { stats, badges, completedCourses };
}

export default async function PublicProfile({ params }) {
  const { id } = await params;
  const data = await getProfile(id).catch(() => null);
  if (!data) notFound();
  const { stats, badges, completedCourses } = data;
  const earned = badges.filter((b) => b.earned);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-white p-8 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-indigo-600 text-3xl font-bold text-white">
          {(stats.name || 'L').charAt(0).toUpperCase()}
        </div>
        <h1 className="mt-4 text-2xl font-bold">{stats.name || 'Learner'}</h1>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div><p className="text-2xl font-bold">{stats.totalXP || 0}</p><p className="text-slate-500">XP</p></div>
          <div><p className="text-2xl font-bold">{stats.level || 1}</p><p className="text-slate-500">Level</p></div>
          <div><p className="text-2xl font-bold">{stats.longestStreak || 0} 🔥</p><p className="text-slate-500"><L hi="Best streak" en="Best streak" /></p></div>
          <div><p className="text-2xl font-bold">{stats.conceptsCompleted || 0}</p><p className="text-slate-500"><L hi="Concepts" en="Concepts" /></p></div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold">🏅 Badges ({earned.length})</h2>
        {earned.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500"><L hi="Abhi koi badge nahi." en="No badges yet." /></p>
        ) : (
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {earned.map((b) => (
              <div key={b.id} title={b.desc} className="rounded-2xl border border-indigo-200 bg-indigo-50 p-3 text-center">
                <div className="text-2xl">{b.icon}</div>
                <p className="mt-1 text-xs font-semibold">{b.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {completedCourses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold">🎓 <L hi="Completed courses" en="Completed courses" /></h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {completedCourses.map((c) => (
              <span key={c._id.toString()} className="rounded-full bg-amber-50 px-3 py-1.5 text-sm text-amber-800">{c.icon} {c.title}</span>
            ))}
          </div>
        </div>
      )}

      <ShareButtons title={`${stats.name || 'A learner'} on Learnverse`} text={`Check out ${stats.name || 'this'} profile on Learnverse`} />

      <Link href="/courses" className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:underline"><L hi="Courses explore karo →" en="Explore courses →" /></Link>
    </div>
  );
}
