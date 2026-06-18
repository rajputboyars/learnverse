import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';
import Concept from '@/models/Concept';
import { requireUser } from '@/lib/guards';

// GET /api/revise → cards due for review now (+ counts)
// GET /api/revise?guest=true → random concepts for unauthenticated users
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isGuest = searchParams.get('guest') === 'true';

  if (isGuest) {
    await connectDB();
    const concepts = await Concept.aggregate([
      { $match: { status: 'published' } },
      { $sample: { size: 10 } },
      { $project: { title: 1, slug: 1, keyPoints: 1, dailyLifeExample: 1, explanation: 1, difficulty: 1 } },
    ]);
    const cards = concepts.map((c) => ({
      conceptId: c._id.toString(),
      title: c.title,
      slug: c.slug,
      difficulty: c.difficulty,
      keyPoints: c.keyPoints || [],
      dailyLifeExample: c.dailyLifeExample || '',
      hint: (c.explanation?.english || '').slice(0, 140),
    }));
    return NextResponse.json({ cards, dueCount: cards.length, total: cards.length });
  }

  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const userId = session.user.id;
  const now = new Date();

  const [dueReviews, dueCount, total] = await Promise.all([
    Review.find({ userId, dueAt: { $lte: now } }).sort({ dueAt: 1 }).limit(20).lean(),
    Review.countDocuments({ userId, dueAt: { $lte: now } }),
    Review.countDocuments({ userId }),
  ]);

  const ids = dueReviews.map((r) => r.conceptId);
  const concepts = await Concept.find({ _id: { $in: ids } })
    .select('title slug keyPoints dailyLifeExample explanation difficulty')
    .lean();
  const map = {};
  for (const c of concepts) map[c._id.toString()] = c;

  const cards = dueReviews
    .map((r) => {
      const c = map[r.conceptId.toString()];
      if (!c) return null;
      return {
        conceptId: r.conceptId.toString(),
        title: c.title,
        slug: c.slug,
        difficulty: c.difficulty,
        keyPoints: c.keyPoints || [],
        dailyLifeExample: c.dailyLifeExample || '',
        hint: (c.explanation?.english || '').slice(0, 140),
      };
    })
    .filter(Boolean);

  return NextResponse.json({ cards, dueCount, total });
}

// POST /api/revise  { conceptId, rating: 'forgot'|'hard'|'good'|'easy' }
export async function POST(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { conceptId, rating } = await request.json();
  const review = await Review.findOne({ userId: session.user.id, conceptId });
  if (!review) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  let { intervalDays, ease, reps } = review;
  switch (rating) {
    case 'forgot':
      reps = 0; intervalDays = 1; ease = Math.max(1.3, ease - 0.2); break;
    case 'hard':
      intervalDays = Math.max(1, Math.round(intervalDays * 1.2)); ease = Math.max(1.3, ease - 0.15); break;
    case 'good':
      intervalDays = Math.max(1, Math.round(intervalDays * ease)); reps += 1; break;
    case 'easy':
      intervalDays = Math.max(1, Math.round(intervalDays * ease * 1.3)); reps += 1; ease += 0.15; break;
    default:
      return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });
  }

  review.intervalDays = intervalDays;
  review.ease = ease;
  review.reps = reps;
  review.dueAt = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000);
  await review.save();

  return NextResponse.json({ ok: true, nextInDays: intervalDays });
}
