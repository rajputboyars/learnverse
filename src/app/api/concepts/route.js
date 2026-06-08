import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import { requireAdmin } from '@/lib/guards';

// GET /api/concepts?courseId=&topicId=&all=1
export async function GET(request) {
  await connectDB();
  const sp = request.nextUrl.searchParams;
  const filter = {};
  if (sp.get('courseId')) filter.courseId = sp.get('courseId');
  if (sp.get('topicId')) filter.topicId = sp.get('topicId');
  if (!sp.get('all')) filter.status = 'published';
  const concepts = await Concept.find(filter).sort({ order: 1 }).lean();
  return NextResponse.json(concepts);
}

export async function POST(request) {
  const { session, error } = await requireAdmin();
  if (error) return error;
  try {
    await connectDB();
    const body = await request.json();
    body.createdBy = session.user.id;
    const concept = await Concept.create(body);
    return NextResponse.json(concept, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
