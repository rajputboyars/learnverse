import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Discussion from '@/models/Discussion';
import Course from '@/models/Course';
import { requireUser } from '@/lib/guards';
import { notify } from '@/lib/notify';

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

  // Notify the thread author.
  const course = await Course.findById(thread.courseId).select('slug').lean();
  if (course) {
    await notify(thread.userId, {
      actorId: session.user.id,
      actorName: session.user.name || 'Someone',
      type: 'reply',
      message: `replied to your thread "${thread.title}"`,
      link: `/courses/${course.slug}/discuss/${thread._id}`,
    });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
