import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Prompt from '@/models/Prompt';
import PromptReport from '@/models/PromptReport';
import { requireUser } from '@/lib/guards';

const REASONS = ['harmful', 'spam', 'misleading', 'low-quality', 'other'];

// Flag a prompt. Reports queue for an admin — nothing is hidden automatically,
// because a report is one person's opinion until somebody looks at it.
export async function POST(req, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const body = (await req.json().catch(() => ({}))) || {};
  const reason = REASONS.includes(body.reason) ? body.reason : 'other';

  await connectDB();
  const prompt = await Prompt.findById(id).select('_id').lean().catch(() => null);
  if (!prompt) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  try {
    await PromptReport.create({
      promptId: id,
      userId: session.user.id,
      reason,
      detail: String(body.detail || '').trim().slice(0, 600),
    });
    await Prompt.updateOne({ _id: id }, { $inc: { reportCount: 1 } });
  } catch (err) {
    // Duplicate key = this user already reported it. Say so plainly instead of
    // failing, so the button does not look broken.
    if (err?.code === 11000) {
      return NextResponse.json({ ok: true, already: true });
    }
    throw err;
  }

  return NextResponse.json({ ok: true });
}
