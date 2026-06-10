import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Comment from '@/models/Comment';
import { auth } from '@/auth';
import { requireUser } from '@/lib/guards';

// GET /api/comments?conceptId=...  → all comments for a concept (+ your vote state)
export async function GET(request) {
  await connectDB();
  const conceptId = request.nextUrl.searchParams.get('conceptId');
  if (!conceptId) {
    return NextResponse.json({ error: 'conceptId required' }, { status: 400 });
  }
  const session = await auth();
  const myId = session?.user?.id;

  const comments = await Comment.find({ conceptId }).sort({ createdAt: 1 }).lean();
  const out = comments.map((c) => ({
    _id: c._id.toString(),
    userId: c.userId.toString(),
    userName: c.userName,
    body: c.body,
    parentId: c.parentId ? c.parentId.toString() : null,
    votes: c.votes || 0,
    voted: myId ? (c.voters || []).some((v) => v.toString() === myId) : false,
    mine: myId ? c.userId.toString() === myId : false,
    createdAt: c.createdAt,
  }));
  return NextResponse.json({ comments: out, isAdmin: session?.user?.role === 'admin' });
}

// POST /api/comments  { conceptId, body, parentId? }  → create
export async function POST(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { conceptId, body, parentId } = await request.json();
  if (!conceptId || !body?.trim()) {
    return NextResponse.json({ error: 'conceptId and body required' }, { status: 400 });
  }
  const comment = await Comment.create({
    conceptId,
    userId: session.user.id,
    userName: session.user.name || 'Learner',
    body: body.trim().slice(0, 2000),
    parentId: parentId || null,
  });
  return NextResponse.json({ id: comment._id.toString() }, { status: 201 });
}
