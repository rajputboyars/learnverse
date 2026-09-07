import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Prompt from '@/models/Prompt';
import PromptReport from '@/models/PromptReport';
import User from '@/models/User';
import { requireAdmin } from '@/lib/guards';

// The reports queue. Reporter identity is included because moderation needs to
// spot one account flagging everything in sight — it is not shown anywhere
// outside this admin view.
export async function GET(req) {
  const { error } = await requireAdmin();
  if (error) return error;
  await connectDB();

  const status = new URL(req.url).searchParams.get('status') || 'open';
  const query = status === 'all' ? {} : { status };

  const reports = await PromptReport.find(query).sort({ createdAt: -1 }).limit(100).lean();

  const [prompts, reporters] = await Promise.all([
    Prompt.find({ _id: { $in: reports.map((r) => r.promptId) } })
      .select('title slug status origin authorName reportCount')
      .lean(),
    User.find({ _id: { $in: reports.map((r) => r.userId) } }).select('name').lean(),
  ]);

  const promptById = Object.fromEntries(prompts.map((p) => [p._id.toString(), p]));
  const userById = Object.fromEntries(reporters.map((u) => [u._id.toString(), u.name]));

  const counts = await PromptReport.aggregate([{ $group: { _id: '$status', n: { $sum: 1 } } }]);

  return NextResponse.json({
    counts: Object.fromEntries(counts.map((c) => [c._id, c.n])),
    reports: reports.map((r) => {
      const p = promptById[r.promptId.toString()];
      return {
        id: r._id.toString(),
        reason: r.reason,
        detail: r.detail,
        status: r.status,
        createdAt: r.createdAt,
        reporter: userById[r.userId.toString()] || 'Deleted account',
        prompt: p
          ? {
              id: p._id.toString(),
              title: p.title,
              slug: p.slug,
              status: p.status,
              origin: p.origin,
              authorName: p.authorName,
              reportCount: p.reportCount,
            }
          : null, // the prompt was deleted; the report is kept as a record
      };
    }),
  });
}
