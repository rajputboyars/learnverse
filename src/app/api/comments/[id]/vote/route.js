import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Comment from '@/models/Comment';
import Concept from '@/models/Concept';
import { requireUser } from '@/lib/guards';
import { notify } from '@/lib/notify';

// POST /api/comments/:id/vote  → toggle an upvote
export async function POST(request, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { id } = await params;
  const comment = await Comment.findById(id);
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const uid = session.user.id;
  const has = comment.voters.some((v) => v.toString() === uid);
  if (has) {
    comment.voters = comment.voters.filter((v) => v.toString() !== uid);
  } else {
    comment.voters.push(uid);
  }
  comment.votes = comment.voters.length;
  await comment.save();

  if (!has) {
    const concept = await Concept.findById(comment.conceptId).select('slug title').lean();
    if (concept) {
      await notify(comment.userId, {
        actorId: uid,
        actorName: session.user.name || 'Someone',
        type: 'upvote',
        message: `upvoted your comment on "${concept.title}"`,
        link: `/concepts/${concept.slug}`,
      });
    }
  }

  return NextResponse.json({ voted: !has, votes: comment.votes });
}
