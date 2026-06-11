import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Discussion from '@/models/Discussion';
import { auth } from '@/auth';
import { requireUser } from '@/lib/guards';

// GET /api/discussions/:id → a thread with its replies
export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  const session = await auth();
  const myId = session?.user?.id;

  const thread = await Discussion.findById(id).lean();
  if (!thread || thread.parentId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const replies = await Discussion.find({ parentId: id }).sort({ createdAt: 1 }).lean();

  const shape = (d) => ({
    _id: d._id.toString(),
    title: d.title,
    body: d.body,
    userName: d.userName,
    votes: d.votes || 0,
    voted: myId ? (d.voters || []).some((v) => v.toString() === myId) : false,
    mine: myId ? d.userId.toString() === myId : false,
    createdAt: d.createdAt,
  });

  return NextResponse.json({
    thread: shape(thread),
    replies: replies.map(shape),
    isAdmin: session?.user?.role === 'admin',
  });
}

// DELETE /api/discussions/:id → author or admin (thread + its replies, or a reply)
export async function DELETE(request, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  const doc = await Discussion.findById(id);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const isOwner = doc.userId.toString() === session.user.id;
  if (!isOwner && session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  if (doc.parentId) {
    // a reply — decrement the thread's count
    await Discussion.updateOne({ _id: doc.parentId }, { $inc: { replyCount: -1 } });
    await doc.deleteOne();
  } else {
    // a thread — remove it and all replies
    await Discussion.deleteMany({ $or: [{ _id: id }, { parentId: id }] });
  }
  return NextResponse.json({ success: true });
}
