import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import TrendSnapshot from '@/models/TrendSnapshot';
import { requireAdmin } from '@/lib/guards';
import { deleteSnapshot } from '@/lib/trends/snapshots';

// Publish / unpublish, or edit the note.
export async function PATCH(req, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;

  const body = (await req.json().catch(() => ({}))) || {};
  await connectDB();

  const update = {};
  if (typeof body.published === 'boolean') update.published = body.published;
  if (typeof body.note === 'string') update.note = body.note.slice(0, 400);

  const doc = await TrendSnapshot.findByIdAndUpdate(id, { $set: update }, { new: true })
    .lean()
    .catch(() => null);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    snapshot: { id: doc._id.toString(), published: doc.published, note: doc.note },
  });
}

export async function DELETE(_req, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;

  const removed = await deleteSnapshot(id);
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
