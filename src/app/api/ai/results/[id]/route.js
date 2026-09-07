import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import AIResult from '@/models/AIResult';
import { requireUser } from '@/lib/guards';
import { getTemplate } from '@/lib/ai/templates';

async function ownResult(userId, id) {
  await connectDB();
  return AIResult.findOne({ _id: id, userId });
}

export async function GET(_req, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const doc = await ownResult(session.user.id, id).catch(() => null);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    id: doc._id.toString(),
    templateId: doc.templateId,
    title: doc.title,
    category: doc.category,
    inputs: doc.inputs,
    provider: doc.provider,
    model: doc.model,
    source: doc.source,
    outputFormat: doc.outputFormat,
    resultView: getTemplate(doc.templateId)?.resultView || 'text',
    data: doc.data,
    text: doc.text,
    saved: doc.saved,
    createdAt: doc.createdAt,
  });
}

// Only `saved` is editable — the model output itself is kept as it came back.
export async function PATCH(req, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { id } = await params;
  const { saved } = (await req.json().catch(() => ({}))) || {};

  const doc = await ownResult(session.user.id, id).catch(() => null);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (typeof saved === 'boolean') {
    doc.saved = saved;
    await doc.save();
  }
  return NextResponse.json({ id: doc._id.toString(), saved: doc.saved });
}

export async function DELETE(_req, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  await connectDB();
  const removed = await AIResult.findOneAndDelete({ _id: id, userId: session.user.id }).catch(
    () => null
  );
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
