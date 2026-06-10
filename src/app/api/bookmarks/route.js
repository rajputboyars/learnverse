import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Bookmark from '@/models/Bookmark';
import Concept from '@/models/Concept';
import { requireUser } from '@/lib/guards';

// GET /api/bookmarks → current user's bookmarked concept ids (and optionally details)
export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const bookmarks = await Bookmark.find({ userId: session.user.id })
    .select('conceptId')
    .lean();
  return NextResponse.json({ conceptIds: bookmarks.map((b) => b.conceptId.toString()) });
}

// POST /api/bookmarks  { conceptId }  → toggle bookmark
export async function POST(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { conceptId } = await request.json();
  if (!conceptId) {
    return NextResponse.json({ error: 'conceptId required' }, { status: 400 });
  }

  const existing = await Bookmark.findOne({ userId: session.user.id, conceptId });
  if (existing) {
    await existing.deleteOne();
    return NextResponse.json({ bookmarked: false });
  }
  const concept = await Concept.findById(conceptId).select('courseId').lean();
  await Bookmark.create({
    userId: session.user.id,
    conceptId,
    courseId: concept?.courseId,
  });
  return NextResponse.json({ bookmarked: true });
}
