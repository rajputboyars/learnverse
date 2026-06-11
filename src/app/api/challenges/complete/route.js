import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ChallengeCompletion from '@/models/ChallengeCompletion';
import UserStats from '@/models/UserStats';
import User from '@/models/User';
import { requireUser } from '@/lib/guards';
import { getChallenge } from '@/lib/challenges';
import { levelFromXP } from '@/services/xp';
import { applyStreak } from '@/services/streak';

// GET /api/challenges/complete → which challenges the user has completed
export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const done = await ChallengeCompletion.find({ userId: session.user.id }).select('slug').lean();
  return NextResponse.json({ completed: done.map((d) => d.slug) });
}

// POST /api/challenges/complete  { slug }  → award XP once (client-graded)
export async function POST(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { slug } = await request.json();
  const challenge = getChallenge(slug);
  if (!challenge) return NextResponse.json({ error: 'Unknown challenge' }, { status: 400 });

  const existing = await ChallengeCompletion.findOne({ userId: session.user.id, slug });
  if (existing) return NextResponse.json({ gained: 0, already: true });

  await ChallengeCompletion.create({ userId: session.user.id, slug });

  let stats = await UserStats.findOne({ userId: session.user.id });
  if (!stats) {
    const user = await User.findById(session.user.id).lean();
    stats = await UserStats.create({ userId: session.user.id, name: user?.name || '' });
  }
  const gained = challenge.xp || 15;
  stats.totalXP += gained;
  stats.weeklyXP += gained;
  stats.level = levelFromXP(stats.totalXP);
  applyStreak(stats);
  await stats.save();

  return NextResponse.json({ gained, totalXP: stats.totalXP, already: false });
}
