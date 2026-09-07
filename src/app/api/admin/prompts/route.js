import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Prompt from '@/models/Prompt';
import PromptReport from '@/models/PromptReport';
import { requireAdmin } from '@/lib/guards';
import { extractVariables } from '@/lib/prompts/variables';

// The moderation queue. Unlike the public listing this returns the full body and
// the automated review — an admin cannot judge a prompt they cannot read.
export async function GET(req) {
  const { error } = await requireAdmin();
  if (error) return error;
  await connectDB();

  const params = new URL(req.url).searchParams;
  const filter = params.get('filter') || 'queue';

  const queries = {
    queue: { status: { $in: ['pending', 'ai_reviewed'] } },
    pending: { status: 'pending' },
    ai_reviewed: { status: 'ai_reviewed' },
    reported: { reportCount: { $gt: 0 } },
    rejected: { status: 'rejected' },
    verified: { status: 'verified', origin: 'community' },
    all: {},
  };

  const prompts = await Prompt.find(queries[filter] || queries.queue)
    .sort({ reportCount: -1, createdAt: 1 })
    .limit(100)
    .lean();

  // Open reports for the prompts on screen, in one query.
  const reports = await PromptReport.find({
    promptId: { $in: prompts.map((p) => p._id) },
    status: 'open',
  })
    .sort({ createdAt: -1 })
    .lean();

  const reportsByPrompt = {};
  for (const r of reports) {
    const key = r.promptId.toString();
    (reportsByPrompt[key] ||= []).push({
      id: r._id.toString(),
      reason: r.reason,
      detail: r.detail,
      createdAt: r.createdAt,
    });
  }

  const counts = await Prompt.aggregate([{ $group: { _id: '$status', n: { $sum: 1 } } }]);

  return NextResponse.json({
    counts: Object.fromEntries(counts.map((c) => [c._id, c.n])),
    reportedCount: await Prompt.countDocuments({ reportCount: { $gt: 0 } }),
    prompts: prompts.map((p) => ({
      id: p._id.toString(),
      slug: p.slug,
      title: p.title,
      description: p.description,
      content: p.content,
      category: p.category,
      tags: p.tags,
      difficulty: p.difficulty,
      origin: p.origin,
      authorName: p.authorName,
      status: p.status,
      reviewNote: p.reviewNote,
      aiReview: p.aiReview || null,
      variables: extractVariables(p.content),
      expectedResult: p.expectedResult,
      exampleOutput: p.exampleOutput,
      usageCount: p.usageCount,
      reportCount: p.reportCount,
      reports: reportsByPrompt[p._id.toString()] || [],
      createdAt: p.createdAt,
    })),
  });
}
