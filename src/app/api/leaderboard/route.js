import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import UserStats from '@/models/UserStats';
import { auth } from '@/auth';

// GET /api/leaderboard?scope=weekly|all
export async function GET(request) {
  await connectDB();
  const scope = request.nextUrl.searchParams.get('scope') || 'weekly';
  const sortField = scope === 'all' ? 'totalXP' : 'weeklyXP';

  const rows = await UserStats.find({ [sortField]: { $gt: 0 } })
    .sort({ [sortField]: -1 })
    .limit(50)
    .lean();

  const leaderboard = rows.map((r, i) => ({
    rank: i + 1,
    userId: r.userId.toString(),
    name: r.name || 'Learner',
    image: r.image || '',
    xp: scope === 'all' ? r.totalXP : r.weeklyXP,
    level: r.level,
    currentStreak: r.currentStreak,
  }));

  // Signed-in learner's own rank, even when they're outside the top 50 —
  // powers the "You" row the leaderboard pins at the bottom.
  let me = null;
  const session = await auth();
  if (session?.user) {
    const myStats = await UserStats.findOne({ userId: session.user.id }).lean();
    const myXP = myStats ? (scope === 'all' ? myStats.totalXP : myStats.weeklyXP) : 0;
    const higherCount = await UserStats.countDocuments({ [sortField]: { $gt: myXP } });
    me = {
      userId: session.user.id,
      rank: higherCount + 1,
      name: myStats?.name || session.user.name || 'You',
      xp: myXP,
      level: myStats?.level || 1,
      currentStreak: myStats?.currentStreak || 0,
    };
  }

  return NextResponse.json({ scope, leaderboard, me });
}
