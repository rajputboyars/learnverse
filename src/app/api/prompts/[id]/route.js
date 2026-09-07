import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/lib/db';
import Prompt from '@/models/Prompt';
import SavedPrompt from '@/models/SavedPrompt';
import PromptRating from '@/models/PromptRating';
import { publicPrompt } from '@/lib/prompts/serialize';

/**
 * Accepts either a slug or an object id in the same segment. Next.js allows one
 * param name per dynamic segment, and the action routes below this one
 * (save/rate/report/run) address prompts by id — so the shared name is `id` and
 * this route resolves whichever form it is given.
 */
export async function findPrompt(idOrSlug) {
  return mongoose.isValidObjectId(idOrSlug)
    ? Prompt.findById(idOrSlug).lean()
    : Prompt.findOne({ slug: idOrSlug }).lean();
}

// Full detail, including the prompt body. Verified prompts are public; an
// unverified one is visible only to its author and to admins.
export async function GET(_req, { params }) {
  await connectDB();
  const { id } = await params;

  const doc = await findPrompt(id);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const session = await auth();
  const userId = session?.user?.id;
  const isOwner = userId && doc.authorId?.toString() === userId;
  const isAdmin = session?.user?.role === 'admin';

  if (doc.status !== 'verified' && !isOwner && !isAdmin) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const [saved, myRating] = userId
    ? await Promise.all([
        SavedPrompt.exists({ userId, promptId: doc._id }),
        PromptRating.findOne({ userId, promptId: doc._id }).select('value').lean(),
      ])
    : [null, null];

  return NextResponse.json({
    prompt: {
      ...publicPrompt(doc, { saved: Boolean(saved) }),
      content: doc.content,
      expectedResult: doc.expectedResult,
      exampleOutput: doc.exampleOutput,
      reviewNote: isOwner || isAdmin ? doc.reviewNote : '',
      myRating: myRating?.value || 0,
      isOwner: Boolean(isOwner),
    },
  });
}
