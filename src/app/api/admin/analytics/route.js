import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import AIResult from '@/models/AIResult';
import AIProviderConnection from '@/models/AIProviderConnection';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import LearningSession from '@/models/LearningSession';
import Prompt from '@/models/Prompt';
import PromptReport from '@/models/PromptReport';
import SocialPost from '@/models/SocialPost';
import TrendSnapshot from '@/models/TrendSnapshot';
import User from '@/models/User';
import UserProgress from '@/models/UserProgress';
import UserStats from '@/models/UserStats';
import { requireAdmin } from '@/lib/guards';
import { getTemplate } from '@/lib/ai/templates';

const DAY = 24 * 60 * 60 * 1000;

/**
 * Platform-wide numbers for the admin dashboard.
 *
 * Everything here is aggregate. Moderation needs to know that a prompt was
 * reported and by whom, but nobody needs a per-user readout of what people are
 * asking AI about — so usage is counted, never itemised against a name.
 */
export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  await connectDB();

  const now = Date.now();
  const since = (days) => new Date(now - days * DAY);

  const [
    courses,
    concepts,
    users,
    newUsers30,
    aiRuns,
    aiRuns30,
    byTemplate,
    byProvider,
    bySource,
    connections,
    promptCounts,
    topPrompts,
    openReports,
    posts,
    byPlatform,
    snapshots,
    activeUsers7,
    activeUsers30,
    streaks,
    trackedTime,
  ] = await Promise.all([
    Course.countDocuments({ status: 'published' }),
    Concept.countDocuments({ status: 'published' }),
    User.countDocuments(),
    User.countDocuments({ createdAt: { $gte: since(30) } }),
    AIResult.countDocuments(),
    AIResult.countDocuments({ createdAt: { $gte: since(30) } }),
    AIResult.aggregate([
      { $group: { _id: '$templateId', runs: { $sum: 1 }, avgMs: { $avg: '$durationMs' } } },
      { $sort: { runs: -1 } },
      { $limit: 15 },
    ]),
    AIResult.aggregate([{ $group: { _id: '$provider', runs: { $sum: 1 } } }, { $sort: { runs: -1 } }]),
    AIResult.aggregate([{ $group: { _id: '$source', runs: { $sum: 1 } } }]),
    AIProviderConnection.aggregate([
      { $group: { _id: '$provider', connected: { $sum: 1 }, working: { $sum: { $cond: [{ $eq: ['$status', 'ok'] }, 1, 0] } } } },
      { $sort: { connected: -1 } },
    ]),
    Prompt.aggregate([{ $group: { _id: '$status', n: { $sum: 1 } } }]),
    Prompt.find({ status: 'verified' })
      .sort({ usageCount: -1, saveCount: -1 })
      .limit(10)
      .select('title slug usageCount saveCount ratingSum ratingCount origin')
      .lean(),
    PromptReport.countDocuments({ status: 'open' }),
    SocialPost.countDocuments(),
    SocialPost.aggregate([{ $group: { _id: '$platform', n: { $sum: 1 } } }, { $sort: { n: -1 } }]),
    TrendSnapshot.countDocuments(),
    // "Active" means they did something the platform recorded, not that they
    // loaded a page.
    UserProgress.distinct('userId', { updatedAt: { $gte: since(7) } }),
    UserProgress.distinct('userId', { updatedAt: { $gte: since(30) } }),
    UserStats.aggregate([
      {
        $bucket: {
          groupBy: '$currentStreak',
          boundaries: [0, 1, 3, 7, 14, 30, 1000],
          default: 'other',
          output: { n: { $sum: 1 } },
        },
      },
    ]),
    LearningSession.aggregate([
      { $group: { _id: null, seconds: { $sum: '$seconds' }, sessions: { $sum: 1 } } },
    ]),
  ]);

  // Daily AI runs for the last 30 days, zero-filled so quiet days are visible
  // rather than missing.
  const runsByDay = await AIResult.aggregate([
    { $match: { createdAt: { $gte: since(30) } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, n: { $sum: 1 } } },
  ]);
  const runsMap = Object.fromEntries(runsByDay.map((r) => [r._id, r.n]));
  const daily = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now - (29 - i) * DAY);
    const key = d.toISOString().slice(0, 10);
    return { label: d.getDate() === 1 || i % 7 === 0 ? `${d.getDate()}/${d.getMonth() + 1}` : '', count: runsMap[key] || 0 };
  });

  const STREAK_LABELS = { 0: 'none', 1: '1-2 days', 3: '3-6 days', 7: '1-2 weeks', 14: '2-4 weeks', 30: '30+ days' };

  return NextResponse.json({
    content: { courses, concepts, users, newUsers30 },

    ai: {
      runs: aiRuns,
      runs30: aiRuns30,
      daily,
      byTemplate: byTemplate.map((t) => ({
        // Library prompts run under a namespaced id; resolve the built-ins to
        // their human title and label the rest as library runs.
        id: t._id,
        label: getTemplate(t._id)?.title || (String(t._id).startsWith('library:') ? 'Library prompt' : t._id),
        runs: t.runs,
        avgSeconds: Math.round((t.avgMs || 0) / 100) / 10,
      })),
      byProvider: byProvider.map((p) => ({ provider: p._id || 'unknown', runs: p.runs })),
      bySource: Object.fromEntries(bySource.map((s) => [s._id, s.runs])),
      connections: connections.map((c) => ({ provider: c._id, connected: c.connected, working: c.working })),
    },

    prompts: {
      byStatus: Object.fromEntries(promptCounts.map((p) => [p._id, p.n])),
      openReports,
      top: topPrompts.map((p) => ({
        title: p.title,
        slug: p.slug,
        origin: p.origin,
        usageCount: p.usageCount,
        saveCount: p.saveCount,
        rating: p.ratingCount ? Number((p.ratingSum / p.ratingCount).toFixed(1)) : 0,
      })),
    },

    posts: { total: posts, byPlatform: byPlatform.map((p) => ({ platform: p._id, n: p.n })) },

    trends: { snapshots },

    engagement: {
      activeUsers7: activeUsers7.length,
      activeUsers30: activeUsers30.length,
      streakBuckets: streaks.map((b) => ({
        label: STREAK_LABELS[b._id] ?? String(b._id),
        count: b.n,
      })),
      trackedHours: Math.round(((trackedTime[0]?.seconds || 0) / 3600) * 10) / 10,
      trackedSessions: trackedTime[0]?.sessions || 0,
    },
  });
}
