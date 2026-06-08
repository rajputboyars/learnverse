import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Topic from '@/models/Topic';
import { requireAdmin } from '@/lib/guards';

// GET /api/topics?courseId=...
export async function GET(request) {
  await connectDB();
  const courseId = request.nextUrl.searchParams.get('courseId');
  const filter = courseId ? { courseId } : {};
  const topics = await Topic.find(filter).sort({ order: 1 }).lean();
  return NextResponse.json(topics);
}

export async function POST(request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    await connectDB();
    const body = await request.json();
    const topic = await Topic.create(body);
    return NextResponse.json(topic, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
