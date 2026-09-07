import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import SocialPost from '@/models/SocialPost';
import { requireUser } from '@/lib/guards';

// Edit a saved draft. Editing the body marks the draft as edited, so a post the
// user has made their own is distinguishable from raw model output.
export async function PATCH(req, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const body = (await req.json().catch(() => ({}))) || {};
  await connectDB();

  const doc = await SocialPost.findOne({ _id: id, userId: session.user.id }).catch(() => null);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (typeof body.body === 'string') {
    if (body.body !== doc.body) doc.edited = true;
    doc.body = body.body.slice(0, 12000);
  }
  if (Array.isArray(body.hashtags)) doc.hashtags = body.hashtags.slice(0, 20);
  if (typeof body.topic === 'string') doc.topic = body.topic.slice(0, 300);

  await doc.save();
  return NextResponse.json({ post: { id: doc._id.toString(), body: doc.body, edited: doc.edited } });
}

export async function DELETE(_req, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  await connectDB();
  const removed = await SocialPost.findOneAndDelete({ _id: id, userId: session.user.id }).catch(
    () => null
  );
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
