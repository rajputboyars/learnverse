import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Discussion from '@/models/Discussion';
import { requireUser } from '@/lib/guards';

// POST /api/discussions/:id/reply  { body }  → add a reply to a thread
export async function POST(request, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  const { body } = await request.json();
  if (!body?.trim()) return NextResponse.json({ error: 'body required' }, { status: 400 });

  const thread = await Discussion.findById(id);
  if (!thread || thread.parentId) {
    return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
  }

  await Discussion.create({
    courseId: thread.courseId,
    userId: session.user.id,
    userName: session.user.name || 'Learner',
    body: body.trim().slice(0, 5000),
    parentId: thread._id,
  });
  thread.replyCount = (thread.replyCount || 0) + 1;
  thread.lastActivityAt = new Date();
  await thread.save();

  return NextResponse.json({ ok: true }, { status: 201 });
}
