import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';

/**
 * Grades the one question shown on a feed card.
 *
 * Graded on the server because the answer is never sent to the client — the
 * card would be pointless if the right option were sitting in the page source.
 *
 * No XP here, deliberately. A single tapped answer is practice, not assessment,
 * and paying it the same XP as a completed quiz would both inflate the
 * leaderboard and reward skimming. Getting it right opens the concept, which is
 * where the XP actually lives — the question is the hook, not the reward.
 *
 * Open to signed-out visitors too: letting someone feel the loop before they
 * register is the best argument for registering.
 */
export async function POST(req) {
  const { conceptId, answer } = (await req.json().catch(() => ({}))) || {};
  if (!conceptId || !Number.isInteger(answer)) {
    return NextResponse.json({ error: 'conceptId and answer are required' }, { status: 400 });
  }

  await connectDB();
  const concept = await Concept.findById(conceptId).select('quiz slug').lean().catch(() => null);
  if (!concept?.quiz?.length) {
    return NextResponse.json({ error: 'No question on this concept' }, { status: 404 });
  }

  const q = concept.quiz[0];
  return NextResponse.json({
    correct: answer === q.correctIndex,
    correctIndex: q.correctIndex,
    explanation: q.explanation || '',
    slug: concept.slug,
  });
}
