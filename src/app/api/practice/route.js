import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Concept from '@/models/Concept';
import { requireUser } from '@/lib/guards';
import { awardXP } from '@/services/xp';

// GET /api/practice?courseSlug=...&limit=12
// Aggregates quiz questions across a course's concepts for a self-test.
export async function GET(request) {
  await connectDB();
  const slug = request.nextUrl.searchParams.get('courseSlug');
  const limit = Math.min(25, parseInt(request.nextUrl.searchParams.get('limit') || '12', 10));
  if (!slug) return NextResponse.json({ error: 'courseSlug required' }, { status: 400 });

  const course = await Course.findOne({ slug, status: 'published' }).select('_id title icon').lean();
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

  const concepts = await Concept.find({ courseId: course._id, status: 'published' })
    .select('title slug quiz')
    .lean();

  const pool = [];
  for (const c of concepts) {
    for (const q of c.quiz || []) {
      if (q.question && Array.isArray(q.options) && q.options.length) {
        pool.push({
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation || '',
          conceptId: c._id.toString(),
          conceptTitle: c.title,
          conceptSlug: c.slug,
        });
      }
    }
  }

  // shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return NextResponse.json({
    course: { title: course.title, icon: course.icon },
    total: pool.length,
    questions: pool.slice(0, limit),
  });
}

// POST /api/practice  { conceptIds: [...] } → award quiz XP for the concepts
// whose questions the learner answered correctly. awardXP is idempotent per
// (user, concept, 'quiz_passed'), so re-practising never double-awards.
export async function POST(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { conceptIds } = await request.json();
  if (!Array.isArray(conceptIds) || conceptIds.length === 0) {
    return NextResponse.json({ gained: 0 });
  }

  let gained = 0;
  let totalXP = 0;
  for (const conceptId of [...new Set(conceptIds)]) {
    const result = await awardXP(session.user.id, conceptId, 'quiz_passed');
    if (result?.gained) gained += result.gained;
    if (result?.totalXP) totalXP = result.totalXP;
  }
  return NextResponse.json({ gained, totalXP });
}
