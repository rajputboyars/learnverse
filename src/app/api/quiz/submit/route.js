import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import { requireUser } from '@/lib/guards';
import { awardXP } from '@/services/xp';

// POST /api/quiz/submit  { conceptId, answers: [index,...] }
// Grades server-side (don't trust the client), awards XP on pass.
export async function POST(request) {
  const { session, error } = await requireUser();
  if (error) return error;

  await connectDB();
  const { conceptId, answers } = await request.json();
  if (!conceptId || !Array.isArray(answers)) {
    return NextResponse.json(
      { error: 'conceptId and answers[] required' },
      { status: 400 }
    );
  }

  const concept = await Concept.findById(conceptId).lean();
  if (!concept) {
    return NextResponse.json({ error: 'Concept not found' }, { status: 404 });
  }

  const quiz = concept.quiz || [];
  let correct = 0;
  const results = quiz.map((q, i) => {
    const ok = answers[i] === q.correctIndex;
    if (ok) correct += 1;
    return { correctIndex: q.correctIndex, correct: ok, explanation: q.explanation };
  });

  const total = quiz.length;
  const passed = total > 0 && correct / total >= 0.6; // 60% to pass

  let reward = null;
  if (passed) {
    reward = await awardXP(session.user.id, conceptId, 'quiz_passed');
  }

  return NextResponse.json({ correct, total, passed, results, reward });
}
