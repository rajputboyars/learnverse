import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import AIResult from '@/models/AIResult';
import { requireUser } from '@/lib/guards';
import { getTemplate } from '@/lib/ai/templates';

// List the caller's results. ?saved=1 for the saved ones, ?templateId= to filter.
export async function GET(req) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();

  const params = new URL(req.url).searchParams;
  const query = { userId: session.user.id };
  if (params.get('saved') === '1') query.saved = true;
  if (params.get('templateId')) query.templateId = params.get('templateId');

  const limit = Math.min(50, Number(params.get('limit')) || 20);
  const results = await AIResult.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('templateId title category inputs provider model source data text saved createdAt outputFormat')
    .lean();

  return NextResponse.json({
    results: results.map((r) => ({
      id: r._id.toString(),
      templateId: r.templateId,
      title: r.title,
      category: r.category,
      inputs: r.inputs,
      provider: r.provider,
      model: r.model,
      source: r.source,
      outputFormat: r.outputFormat,
      resultView: getTemplate(r.templateId)?.resultView || 'text',
      data: r.data,
      text: r.text,
      saved: r.saved,
      createdAt: r.createdAt,
    })),
  });
}
