import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Prompt from '@/models/Prompt';
import SavedPrompt from '@/models/SavedPrompt';
import { requireUser } from '@/lib/guards';

// Toggle. The saveCount on the prompt is a denormalised counter kept in step
// here, so the library can sort without counting a collection every time.
export async function POST(_req, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  await connectDB();
  const userId = session.user.id;

  const existing = await SavedPrompt.findOneAndDelete({ userId, promptId: id }).catch(() => null);
  if (existing) {
    await Prompt.updateOne({ _id: id }, { $inc: { saveCount: -1 } });
    return NextResponse.json({ saved: false });
  }

  const prompt = await Prompt.findById(id).select('_id status').lean().catch(() => null);
  if (!prompt) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await SavedPrompt.create({ userId, promptId: id });
  await Prompt.updateOne({ _id: id }, { $inc: { saveCount: 1 } });
  return NextResponse.json({ saved: true });
}
