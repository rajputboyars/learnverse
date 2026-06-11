import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import UserStats from '@/models/UserStats';
import UserProgress from '@/models/UserProgress';
import User from '@/models/User';
import Review from '@/models/Review';
import { applyStreak } from '@/services/streak';

export function levelFromXP(totalXP) {
  // 100 XP per level, level 1 at 0 XP.
  return Math.floor(totalXP / 100) + 1;
}

export function xpForNextLevel(totalXP) {
  const level = levelFromXP(totalXP);
  return level * 100;
}

async function ensureStats(userId) {
  let stats = await UserStats.findOne({ userId });
  if (!stats) {
    const user = await User.findById(userId).lean();
    stats = await UserStats.create({
      userId,
      name: user?.name || '',
      image: user?.image || '',
    });
  }
  return stats;
}

/**
 * Core engagement mutation. Idempotent per (user, concept, action):
 * a user can only earn the read/quiz XP for a concept once.
 *
 * action: 'concept_read' | 'quiz_passed'
 */
export async function awardXP(userId, conceptId, action) {
  await connectDB();

  const concept = await Concept.findById(conceptId).lean();
  if (!concept) return { error: 'Concept not found' };

  let progress = await UserProgress.findOne({ userId, conceptId });
  if (!progress) {
    progress = new UserProgress({
      userId,
      conceptId,
      courseId: concept.courseId,
    });
  }

  let gained = 0;
  const readXP = concept.xpReward || 10;
  const quizXP = 15;

  if (action === 'concept_read' && !progress.read) {
    progress.read = true;
    gained += readXP;
  }
  if (action === 'quiz_passed' && !progress.quizPassed) {
    progress.quizPassed = true;
    gained += quizXP;
  }

  progress.xpEarned += gained;
  await progress.save();

  const stats = await ensureStats(userId);
  if (gained > 0) {
    stats.totalXP += gained;
    stats.weeklyXP += gained;
    stats.level = levelFromXP(stats.totalXP);
    if (action === 'concept_read') stats.conceptsCompleted += 1;
  }
  applyStreak(stats); // any action keeps the streak alive
  await stats.save();

  // Schedule a spaced-repetition review for this concept (first time only).
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await Review.updateOne(
    { userId, conceptId },
    { $setOnInsert: { dueAt: tomorrow, intervalDays: 1, ease: 2.5, reps: 0 } },
    { upsert: true }
  );

  return {
    gained,
    totalXP: stats.totalXP,
    weeklyXP: stats.weeklyXP,
    level: stats.level,
    currentStreak: stats.currentStreak,
    nextLevelAt: xpForNextLevel(stats.totalXP),
    read: progress.read,
    quizPassed: progress.quizPassed,
  };
}
