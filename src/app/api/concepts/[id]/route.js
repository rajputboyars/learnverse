import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import { requireAdmin } from '@/lib/guards';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  const concept = await Concept.findById(id).lean();
  if (!concept) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(concept);
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  const body = await request.json();
  const concept = await Concept.findByIdAndUpdate(id, body, { new: true });
  if (!concept) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(concept);
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  await Concept.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
