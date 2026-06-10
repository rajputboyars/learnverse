import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Comment from '@/models/Comment';
import { requireUser } from '@/lib/guards';

// DELETE /api/comments/:id  → author or admin
export async function DELETE(request, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  const comment = await Comment.findById(id);
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const isOwner = comment.userId.toString() === session.user.id;
  const isAdmin = session.user.role === 'admin';
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  // Remove the comment and any direct replies.
  await Comment.deleteMany({ $or: [{ _id: id }, { parentId: id }] });
  return NextResponse.json({ success: true });
}
