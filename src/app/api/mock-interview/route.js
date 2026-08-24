import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import InterviewQuestion from '@/models/InterviewQuestion';

// GET /api/mock-interview?courseSlug=...&limit=10
export async function GET(request) {
  await connectDB();
  const slug = request.nextUrl.searchParams.get('courseSlug');
  const limit = Math.min(20, parseInt(request.nextUrl.searchParams.get('limit') || '10', 10));
  if (!slug) return NextResponse.json({ error: 'courseSlug required' }, { status: 400 });

  const course = await Course.findOne({ slug, status: 'published' }).select('_id title icon').lean();
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

  const all = await InterviewQuestion.find({
    courseId: course._id,
    status: { $in: ['approved', 'published'] },
  })
    .select('question answer difficulty')
    .lean();

  // shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  return NextResponse.json({
    course: { title: course.title, icon: course.icon },
    total: all.length,
    questions: all.slice(0, limit).map((q) => ({
      question: q.question,
      difficulty: q.difficulty,
      english: q.answer?.english || '',
      hinglish: q.answer?.hinglish || '',
    })),
  });
}
