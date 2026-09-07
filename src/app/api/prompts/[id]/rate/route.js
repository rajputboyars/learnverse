import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Prompt from '@/models/Prompt';
import PromptRating from '@/models/PromptRating';
import { requireUser } from '@/lib/guards';

// Rate 1-5. Changing your rating adjusts the running total by the difference
// rather than adding a second vote.
export async function POST(req, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const { value } = (await req.json().catch(() => ({}))) || {};
  const rating = Number(value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be a whole number from 1 to 5' }, { status: 400 });
  }

  await connectDB();
  const userId = session.user.id;

  const prompt = await Prompt.findById(id).catch(() => null);
  if (!prompt || prompt.status !== 'verified') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const previous = await PromptRating.findOne({ userId, promptId: id });
  if (previous) {
    prompt.ratingSum += rating - previous.value;
    previous.value = rating;
    await previous.save();
  } else {
    await PromptRating.create({ userId, promptId: id, value: rating });
    prompt.ratingSum += rating;
    prompt.ratingCount += 1;
  }
  await prompt.save();

  return NextResponse.json({
    myRating: rating,
    rating: prompt.ratingCount ? Number((prompt.ratingSum / prompt.ratingCount).toFixed(1)) : 0,
    ratingCount: prompt.ratingCount,
  });
}
