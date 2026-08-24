import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import InterviewQuestion from '@/models/InterviewQuestion';
import { requireUser } from '@/lib/guards';
import { awardXP } from '@/services/xp';

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
    .select('question answer difficulty conceptId')
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
      conceptId: q.conceptId ? q.conceptId.toString() : null,
    })),
  });
}

// POST /api/mock-interview  { conceptId }  → rating a question "Got it" counts
// as understanding that concept, so it awards the same XP as reading it
// (reuses awardXP's existing per-concept idempotency — no double-dipping).
export async function POST(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { conceptId } = await request.json();
  if (!conceptId) {
    return NextResponse.json({ error: 'conceptId required' }, { status: 400 });
  }
  const result = await awardXP(session.user.id, conceptId, 'concept_read');
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }
  return NextResponse.json(result);
}
