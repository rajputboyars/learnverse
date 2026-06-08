import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import InterviewQuestion from '@/models/InterviewQuestion';
import { requireAdmin } from '@/lib/guards';

// GET /api/interview-questions?courseId=&difficulty=
export async function GET(request) {
  await connectDB();
  const sp = request.nextUrl.searchParams;
  const filter = { status: { $in: ['approved', 'published'] } };
  if (sp.get('courseId')) filter.courseId = sp.get('courseId');
  if (sp.get('conceptId')) filter.conceptId = sp.get('conceptId');
  if (sp.get('difficulty')) filter.difficulty = sp.get('difficulty');
  const questions = await InterviewQuestion.find(filter)
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json(questions);
}

export async function POST(request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    await connectDB();
    const body = await request.json();
    const q = await InterviewQuestion.create(body);
    return NextResponse.json(q, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
