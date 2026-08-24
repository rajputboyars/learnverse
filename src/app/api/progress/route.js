import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import UserProgress from '@/models/UserProgress';
import { requireUser } from '@/lib/guards';
import { awardXP } from '@/services/xp';

// GET /api/progress?courseId=xxx → completed concept ids for this user in this course
export async function GET(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  const courseId = request.nextUrl.searchParams.get('courseId');
  if (!courseId) {
    return NextResponse.json({ error: 'courseId required' }, { status: 400 });
  }
  await connectDB();
  const rows = await UserProgress.find({ userId: session.user.id, courseId, read: true })
    .select('conceptId')
    .lean();
  return NextResponse.json({ completedConceptIds: rows.map((r) => r.conceptId.toString()) });
}

// POST /api/progress  { conceptId }  → mark concept read + award XP
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
