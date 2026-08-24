import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import UserProgress from '@/models/UserProgress';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import { requireUser } from '@/lib/guards';

// GET /api/me/continue → the most recently studied concept (resume point)
export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();

  const last = await UserProgress.findOne({ userId: session.user.id })
    .sort({ updatedAt: -1 })
    .select('conceptId courseId')
    .lean();
  if (!last) return NextResponse.json({ concept: null });

  const [concept, course] = await Promise.all([
    Concept.findById(last.conceptId).select('title slug').lean(),
    Course.findById(last.courseId).select('title icon').lean(),
  ]);
  if (!concept) return NextResponse.json({ concept: null });

  return NextResponse.json({
    concept: { title: concept.title, slug: concept.slug },
    course: course ? { title: course.title, icon: course.icon } : null,
  });
}
