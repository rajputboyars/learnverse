import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import UserStats from '@/models/UserStats';

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
    name: r.name || 'Learner',
    image: r.image || '',
    xp: scope === 'all' ? r.totalXP : r.weeklyXP,
    level: r.level,
    currentStreak: r.currentStreak,
  }));

  return NextResponse.json({ scope, leaderboard });
}
