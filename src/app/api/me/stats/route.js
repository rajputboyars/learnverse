import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import UserStats from '@/models/UserStats';
import UserProgress from '@/models/UserProgress';
import { requireUser } from '@/lib/guards';
import { xpForNextLevel } from '@/services/xp';

// GET /api/me/stats → current user's XP, streak, completed concept ids
export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;

  await connectDB();
  const userId = session.user.id;
  const stats = await UserStats.findOne({ userId }).lean();
  const progress = await UserProgress.find({ userId }).select('conceptId read quizPassed').lean();

  return NextResponse.json({
    totalXP: stats?.totalXP || 0,
    weeklyXP: stats?.weeklyXP || 0,
    level: stats?.level || 1,
    currentStreak: stats?.currentStreak || 0,
    longestStreak: stats?.longestStreak || 0,
    conceptsCompleted: stats?.conceptsCompleted || 0,
    nextLevelAt: xpForNextLevel(stats?.totalXP || 0),
    progress: progress.map((p) => ({
      conceptId: p.conceptId.toString(),
      read: p.read,
      quizPassed: p.quizPassed,
    })),
  });
}
