import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import { requireAdmin } from '@/lib/guards';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  const course = await Course.findById(id).lean();
  if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(course);
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  const body = await request.json();
  const course = await Course.findByIdAndUpdate(id, body, { new: true });
  if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(course);
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  await Course.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
