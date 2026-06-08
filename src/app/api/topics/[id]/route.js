import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Topic from '@/models/Topic';
import { requireAdmin } from '@/lib/guards';

export async function PUT(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  const body = await request.json();
  const topic = await Topic.findByIdAndUpdate(id, body, { new: true });
  if (!topic) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(topic);
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
