import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Prompt from '@/models/Prompt';
import PromptReport from '@/models/PromptReport';
import { requireAdmin } from '@/lib/guards';

/**
 * Close one report.
 *
 *   'resolved'  — the complaint was valid and has been acted on
 *   'dismissed' — the complaint was not valid
 *
 * Either way the prompt's counter drops by one, so `reportCount` always means
 * "open complaints", not "complaints ever received".
 */
export async function PATCH(req, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;

  const { status } = (await req.json().catch(() => ({}))) || {};
  if (!['resolved', 'dismissed'].includes(status)) {
    return NextResponse.json({ error: 'status must be resolved or dismissed' }, { status: 400 });
  }

  await connectDB();
  const report = await PromptReport.findById(id).catch(() => null);
  if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const wasOpen = report.status === 'open';
  report.status = status;
  await report.save();

  if (wasOpen) {
    // Never let the counter go negative if the same prompt is closed twice.
    await Prompt.updateOne(
      { _id: report.promptId, reportCount: { $gt: 0 } },
      { $inc: { reportCount: -1 } }
    );
  }

  return NextResponse.json({ report: { id: report._id.toString(), status: report.status } });
}
