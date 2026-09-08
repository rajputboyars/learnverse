import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import Prompt from '@/models/Prompt';
import UserProgress from '@/models/UserProgress';
import UserStats from '@/models/UserStats';
import { pickText } from '@/lib/content';

/**
 * The learning feed.
 *
 * The scroll is the point: short cards, one idea each, something to *do* on
 * most of them. What separates it from a social feed is what it is made of —
 * every card is a piece of learning, a real milestone or a prompt, so scrolling
 * for ten minutes leaves you with something rather than nothing.
 *
 * Two deliberate limits, because an endless feed is easy to make unhealthy:
 *   - It ends. `hasMore` goes false when the content runs out; there is no
 *     recycling of the same cards to keep the scroll alive forever.
 *   - Signed-in learners see concepts they have NOT read first, so the feed
 *     moves them forward instead of showing them their own past.
 *
 * The running order is decided over ids alone, and only the cards on the
 * requested page are hydrated. Reading every concept's text to return eight of
 * them would make each scroll cost megabytes.
 */

const PAGE = 8;

export async function GET(req) {
  await connectDB();
  const params = new URL(req.url).searchParams;
  const page = Math.max(0, Number(params.get('page')) || 0);
  const filter = params.get('filter') || 'all';

  const session = await auth();
  const userId = session?.user?.id;

  // ── Decide the running order over ids ────────────────────────────────────
  const conceptIds = (
    await Concept.find({ status: 'published' }).select('_id').sort({ _id: 1 }).lean()
  ).map((c) => c._id.toString());

  const readSet = new Set(
    userId
      ? (await UserProgress.find({ userId, read: true }).select('conceptId').lean()).map((p) =>
          p.conceptId.toString()
        )
      : []
  );

  // Unread first for a signed-in learner, so the feed moves them forward. Read
  // concepts still appear, just later — revisiting is allowed, it is only the
  // default that changes.
  const orderedIds = userId
    ? [...conceptIds.filter((id) => !readSet.has(id)), ...conceptIds.filter((id) => readSet.has(id))]
    : conceptIds;

  // Small, fixed-size sources. Cheap enough to load whole.
  const [streakers, prompts] = await Promise.all([
    UserStats.find({ currentStreak: { $gte: 3 } })
      .sort({ currentStreak: -1 })
      .limit(12)
      // userId matters here: without it a learner sees their own streak card
      // written about them in the third person.
      .select('userId name currentStreak longestStreak level conceptsCompleted')
      .lean(),
    Prompt.find({ status: 'verified' })
      .sort({ usageCount: -1 })
      .limit(12)
      .select('title slug description category difficulty usageCount')
      .lean(),
  ]);

  const milestoneCards = streakers.map((s) => ({
    type: 'milestone',
    id: `streak-${s._id}`,
    name: s.name || 'A learner',
    streak: s.currentStreak,
    level: s.level,
    conceptsCompleted: s.conceptsCompleted,
    isYou: Boolean(userId && s.userId?.toString() === userId),
  }));

  const promptCards = prompts.map((p) => ({
    type: 'prompt',
    id: p._id.toString(),
    title: p.title,
    slug: p.slug,
    description: p.description,
    category: p.category,
    difficulty: p.difficulty,
    usageCount: p.usageCount,
  }));

  const actionCards = [
    { type: 'action', id: 'action-trending', templateId: 'trending-skills', title: 'Which skills are actually in demand?', cta: 'Analyze Trending Skills', icon: 'chart-line' },
    { type: 'action', id: 'action-explain', templateId: 'explain-topic', title: 'Stuck on something? Get it explained your way.', cta: 'Explain a Topic', icon: 'lightbulb' },
    { type: 'action', id: 'action-roadmap', templateId: 'learning-roadmap', title: 'Turn your goal into a week-by-week plan', cta: 'Generate Roadmap', icon: 'map' },
  ];

  // ── Interleave, as placeholders ──────────────────────────────────────────
  // A rhythm rather than a random shuffle: mostly concepts, with a milestone,
  // a prompt or an AI action breaking the pattern often enough to stay
  // interesting but never so often that the feed stops being about learning.
  const running = [];
  let ci = 0;
  let mi = 0;
  let pi = 0;
  let ai = 0;

  while (ci < orderedIds.length) {
    running.push({ type: 'concept', id: orderedIds[ci++] });
    if (ci >= orderedIds.length) break;
    running.push({ type: 'concept', id: orderedIds[ci++] });

    if (mi < milestoneCards.length && running.length % 7 < 3) running.push(milestoneCards[mi++]);
    if (pi < promptCards.length && running.length % 11 < 3) running.push(promptCards[pi++]);
    if (ai < actionCards.length && running.length % 13 < 3) running.push(actionCards[ai++]);
  }

  const filtered =
    filter === 'concepts'
      ? running.filter((c) => c.type === 'concept')
      : filter === 'community'
        ? running.filter((c) => c.type === 'milestone')
        : running;

  const start = page * PAGE;
  const slice = filtered.slice(start, start + PAGE);

  // ── Hydrate only what this page actually shows ───────────────────────────
  const pageConceptIds = slice.filter((c) => c.type === 'concept').map((c) => c.id);

  const [concepts, courses] = await Promise.all([
    pageConceptIds.length
      ? Concept.find({ _id: { $in: pageConceptIds } })
          .select('title slug explanation dailyLifeExample keyPoints quiz difficulty courseId tags')
          .lean()
      : [],
    Course.find({ status: 'published' }).select('title slug icon').lean(),
  ]);

  const courseById = Object.fromEntries(courses.map((c) => [c._id.toString(), c]));
  const conceptById = Object.fromEntries(concepts.map((c) => [c._id.toString(), c]));

  const items = slice
    .map((entry) => {
      if (entry.type !== 'concept') return entry;

      const c = conceptById[entry.id];
      if (!c) return null; // deleted between ordering and hydration

      const course = courseById[c.courseId?.toString()];

      // Both languages go to the client, which picks by the reader's toggle.
      // Choosing here would freeze the card in whichever language the server
      // preferred — which is exactly what made the header switch look broken on
      // the feed.
      return {
        type: 'concept',
        id: c._id.toString(),
        title: c.title,
        slug: c.slug,
        teaser: {
          english: (pickText(c.dailyLifeExample, 'en') || c.explanation?.english || '').trim().slice(0, 260),
          // The daily-life example is a single field written in Hinglish, so it
          // leads the Hinglish card and never appears on the English one.
          hinglish: (pickText(c.dailyLifeExample, 'hi') || c.explanation?.hinglish || '').trim().slice(0, 260),
        },
        hasDailyLifeExample: Boolean(pickText(c.dailyLifeExample, 'hi').trim()),
        keyPoints: (c.keyPoints || []).slice(0, 3),
        difficulty: c.difficulty,
        tags: (c.tags || []).slice(0, 3),
        course: course ? { title: course.title, slug: course.slug, icon: course.icon } : null,
        read: readSet.has(c._id.toString()),
        // One question from the concept's own quiz, answerable inline. The
        // answer is never sent — grading happens in /api/feed/check.
        quickQuestion: c.quiz?.length
          ? { question: c.quiz[0].question, options: c.quiz[0].options }
          : null,
      };
    })
    .filter(Boolean);

  return NextResponse.json({
    items,
    page,
    hasMore: start + PAGE < filtered.length,
    total: filtered.length,
  });
}
