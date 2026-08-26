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
    name: r.name || 'Learner',
    image: r.image || '',
    xp: scope === 'all' ? r.totalXP : r.weeklyXP,
    level: r.level,
    currentStreak: r.currentStreak,
  }));

  // The caller's own standing, so the home page can show "you are here"
  // without shipping the whole board to the client. Signed out → null.
  let me = null;
  const session = await auth();
  if (session?.user?.id) {
    const mine = await UserStats.findOne({ userId: session.user.id })
      .select(`${sortField} name`)
      .lean();
    const xp = mine?.[sortField] || 0;
    const ahead = xp > 0 ? await UserStats.countDocuments({ [sortField]: { $gt: xp } }) : null;
    me = { name: mine?.name || 'You', xp, rank: ahead === null ? null : ahead + 1 };
  }

  return NextResponse.json({ scope, leaderboard, me });
}
