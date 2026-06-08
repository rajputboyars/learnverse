import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import { requireAdmin } from '@/lib/guards';

// GET /api/courses → published courses (admins can pass ?all=1 for drafts too)
export async function GET(request) {
  await connectDB();
  const all = request.nextUrl.searchParams.get('all');
  const filter = all ? {} : { status: 'published' };
  const courses = await Course.find(filter).sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(courses);
}

// POST /api/courses → create (admin only)
export async function POST(request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    await connectDB();
    const body = await request.json();
    const course = await Course.create(body);
    return NextResponse.json(course, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
