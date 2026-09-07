import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/lib/db';
import Prompt from '@/models/Prompt';
import SavedPrompt from '@/models/SavedPrompt';
import { requireUser } from '@/lib/guards';
import { slugify } from '@/lib/slug';
import { publicPrompt } from '@/lib/prompts/serialize';
import { statusFromReview, validatePrompt } from '@/lib/prompts/validate';

// Submissions run an automated review inline, which means a model call.
export const maxDuration = 60;

const SORTS = {
  popular: { usageCount: -1, createdAt: -1 },
  rating: { ratingSum: -1, usageCount: -1 },
  newest: { createdAt: -1 },
};

// Public listing — only verified prompts. ?q= search, ?category=, ?sort=,
// ?saved=1 (yours only), ?mine=1 (your submissions, any status).
export async function GET(req) {
  await connectDB();
  const params = new URL(req.url).searchParams;
  const session = await auth();
  const userId = session?.user?.id;

  const query = { status: 'verified' };
  if (params.get('category') && params.get('category') !== 'all') {
    query.category = params.get('category');
  }
  const q = params.get('q')?.trim();
  if (q) {
    // Regex rather than $text: it matches partial words, which is what someone
    // typing "inter" into a search box expects.
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    query.$or = [{ title: rx }, { description: rx }, { tags: rx }];
  }

  if (params.get('mine') === '1') {
    if (!userId) return NextResponse.json({ prompts: [] });
    delete query.status;
    query.authorId = userId;
  }

  if (params.get('saved') === '1') {
    if (!userId) return NextResponse.json({ prompts: [] });
    const saves = await SavedPrompt.find({ userId }).select('promptId').lean();
    query._id = { $in: saves.map((s) => s.promptId) };
  }

  const limit = Math.min(60, Number(params.get('limit')) || 30);
  const prompts = await Prompt.find(query)
    .sort(SORTS[params.get('sort')] || SORTS.popular)
    .limit(limit)
    .lean();

  // Which of these the caller has saved, in one query rather than per card.
  let savedSet = new Set();
  if (userId) {
    const saves = await SavedPrompt.find({
      userId,
      promptId: { $in: prompts.map((p) => p._id) },
    })
      .select('promptId')
      .lean();
    savedSet = new Set(saves.map((s) => s.promptId.toString()));
  }

  return NextResponse.json({
    prompts: prompts.map((p) => publicPrompt(p, { saved: savedSet.has(p._id.toString()) })),
  });
}

// Submit a prompt. It goes into the review queue — never straight to public.
export async function POST(req) {
  const { session, error } = await requireUser();
  if (error) return error;

  const body = (await req.json().catch(() => ({}))) || {};
  const title = String(body.title || '').trim();
  const content = String(body.content || '').trim();

  if (title.length < 6) {
    return NextResponse.json({ error: 'Give it a title of at least 6 characters' }, { status: 400 });
  }
  if (content.length < 40) {
    return NextResponse.json(
      { error: 'The prompt itself needs to be at least 40 characters — enough to be useful to someone else' },
      { status: 400 }
    );
  }
  if (content.length > 8000) {
    return NextResponse.json({ error: 'That prompt is too long (8000 characters max)' }, { status: 400 });
  }

  await connectDB();

  // Slugs must stay unique; a repeated title gets a short suffix rather than
  // failing the submission.
  const base = slugify(title).slice(0, 60) || 'prompt';
  let slug = base;
  for (let i = 2; await Prompt.exists({ slug }); i += 1) {
    slug = `${base}-${i}`;
  }

  const doc = await Prompt.create({
    title,
    slug,
    description: String(body.description || '').trim().slice(0, 400),
    content,
    category: body.category || 'learning',
    tags: (Array.isArray(body.tags) ? body.tags : String(body.tags || '').split(','))
      .map((t) => String(t).trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 8),
    difficulty: body.difficulty || 'beginner',
    providers: Array.isArray(body.providers) && body.providers.length ? body.providers : ['any'],
    expectedResult: String(body.expectedResult || '').trim().slice(0, 1000),
    exampleOutput: String(body.exampleOutput || '').trim().slice(0, 4000),
    origin: 'community',
    authorId: session.user.id,
    authorName: session.user.name || 'A learner',
    status: 'pending',
  });

  // Automated first pass. It runs inline so the author gets an immediate answer
  // when it rejects something obvious, and any failure simply leaves the prompt
  // pending for a human — a review that did not happen is never a pass.
  try {
    const review = await validatePrompt(doc);
    if (review) {
      doc.aiReview = review;
      doc.status = statusFromReview(review);
      if (review.verdict === 'reject') {
        doc.reviewNote = review.summary;
        doc.reviewedAt = new Date();
      }
      await doc.save();
    }
  } catch (err) {
    console.error('[prompts/validate]', err);
    doc.aiReview = { error: 'Automated review could not run', checkedAt: new Date() };
    await doc.save();
  }

  return NextResponse.json(
    {
      prompt: publicPrompt(doc),
      review: doc.aiReview?.verdict
        ? { verdict: doc.aiReview.verdict, summary: doc.aiReview.summary }
        : null,
    },
    { status: 201 }
  );
}
