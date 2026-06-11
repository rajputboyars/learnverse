import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Discussion from '@/models/Discussion';
import Course from '@/models/Course';
import { requireUser } from '@/lib/guards';
import { notify } from '@/lib/notify';

// POST /api/discussions/:id/vote → toggle an upvote
export async function POST(request, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  const doc = await Discussion.findById(id);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const uid = session.user.id;
  const has = doc.voters.some((v) => v.toString() === uid);
  if (has) doc.voters = doc.voters.filter((v) => v.toString() !== uid);
  else doc.voters.push(uid);
  doc.votes = doc.voters.length;
  await doc.save();

  if (!has) {
    const course = await Course.findById(doc.courseId).select('slug').lean();
    const threadId = doc.parentId || doc._id;
    if (course) {
      await notify(doc.userId, {
        actorId: uid,
        actorName: session.user.name || 'Someone',
        type: 'upvote',
        message: doc.parentId ? 'upvoted your reply' : `upvoted your thread "${doc.title}"`,
        link: `/courses/${course.slug}/discuss/${threadId}`,
      });
    }
  }

  return NextResponse.json({ voted: !has, votes: doc.votes });
}
