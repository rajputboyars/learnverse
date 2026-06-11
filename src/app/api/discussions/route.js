import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Discussion from '@/models/Discussion';
import Course from '@/models/Course';
import { requireUser } from '@/lib/guards';

// GET /api/discussions?courseSlug=...  → threads for a course
export async function GET(request) {
  await connectDB();
  const slug = request.nextUrl.searchParams.get('courseSlug');
  if (!slug) return NextResponse.json({ error: 'courseSlug required' }, { status: 400 });
  const course = await Course.findOne({ slug }).select('_id title icon').lean();
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

  const threads = await Discussion.find({ courseId: course._id, parentId: null })
    .sort({ lastActivityAt: -1 })
    .limit(100)
    .lean();

  return NextResponse.json({
    course: { title: course.title, icon: course.icon },
    threads: threads.map((t) => ({
      _id: t._id.toString(),
      title: t.title,
      body: t.body,
      userName: t.userName,
      votes: t.votes || 0,
      replyCount: t.replyCount || 0,
      lastActivityAt: t.lastActivityAt,
      createdAt: t.createdAt,
    })),
  });
}

// POST /api/discussions  { courseSlug, title, body }  → create a thread
export async function POST(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { courseSlug, title, body } = await request.json();
  if (!courseSlug || !title?.trim() || !body?.trim()) {
    return NextResponse.json({ error: 'courseSlug, title and body required' }, { status: 400 });
  }
  const course = await Course.findOne({ slug: courseSlug }).select('_id').lean();
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

  const thread = await Discussion.create({
    courseId: course._id,
    userId: session.user.id,
    userName: session.user.name || 'Learner',
    title: title.trim().slice(0, 160),
    body: body.trim().slice(0, 5000),
    parentId: null,
    lastActivityAt: new Date(),
  });
  return NextResponse.json({ id: thread._id.toString() }, { status: 201 });
}
