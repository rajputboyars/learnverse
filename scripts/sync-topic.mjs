// Additive content sync — adds or updates ONE topic without touching anything
// else in the database.
//
// `npm run seed` wipes Courses, Topics, Concepts and InterviewQuestions and
// recreates them with fresh ObjectIds. UserProgress, Review, Bookmark, Reaction
// and Comment all reference concepts by _id, so re-seeding orphans every
// completion, revision schedule, bookmark, reaction and comment in the system.
// That is fine for a local reset and unacceptable on a database with real
// users, which is what this script is for.
//
// It upserts by slug: concepts that already exist keep their _id, so progress
// and bookmarks survive. Re-running it is safe and is how you publish edits to
// a topic's text.
//
//   node scripts/sync-topic.mjs --course eds --topic "Project Setup" --dry
//   node scripts/sync-topic.mjs --course eds --topic "Project Setup"
//
// --topic matches on the start of the topic title, case-insensitively.
// --dry prints the plan and writes nothing.

import mongoose from 'mongoose';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const raw = readFileSync(join(__dirname, '..', '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {}
}
loadEnv();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/learnverse';

/* ── args ── */
const args = process.argv.slice(2);
function arg(name, fallback = null) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
}
const COURSE_SLUG = arg('course');
const TOPIC_MATCH = arg('topic');
const DRY = args.includes('--dry');

if (!COURSE_SLUG || !TOPIC_MATCH) {
  console.error('Usage: node scripts/sync-topic.mjs --course <slug> --topic "<title prefix>" [--dry]');
  process.exit(1);
}

/* ── models: loose schemas, same as seed.mjs ── */
const S = mongoose.Schema;
const Course = mongoose.model('Course', new S({}, { strict: false, timestamps: true }));
const Topic = mongoose.model('Topic', new S({}, { strict: false, timestamps: true }));
const Concept = mongoose.model('Concept', new S({}, { strict: false, timestamps: true }));
const InterviewQuestion = mongoose.model('InterviewQuestion', new S({}, { strict: false, timestamps: true }));

const CODE_LANG = { eds: 'html' };

// Mirrors seed.mjs, but uniqueness is checked against the database rather than
// an in-process set, since we are inserting into existing content.
async function freeSlug(slugify, base, Model, keepId = null) {
  const root = slugify(base) || 'item';
  let slug = root;
  let i = 2;
  for (;;) {
    const clash = await Model.findOne({ slug }).select('_id').lean();
    if (!clash || (keepId && String(clash._id) === String(keepId))) return slug;
    slug = `${root}-${i++}`;
  }
}

async function run() {
  const mod = await import(`./content/${COURSE_SLUG}.mjs`);
  const { curriculum, slugify } = mod;

  const topic = curriculum.find((t) =>
    t.title.toLowerCase().startsWith(TOPIC_MATCH.toLowerCase())
  );
  if (!topic) {
    console.error(`No topic in ${COURSE_SLUG}.mjs starting with "${TOPIC_MATCH}". Available:`);
    for (const t of curriculum) console.error(`  ${t.title}`);
    process.exit(1);
  }

  console.log(`Connecting to ${MONGODB_URI}`);
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  } catch {
    console.error(
      [
        '',
        `Could not reach MongoDB at ${MONGODB_URI}.`,
        'Start it, or point MONGODB_URI at the right database, then run this again.',
        'Nothing was changed.',
      ].join('\n')
    );
    process.exit(1);
  }

  const course = await Course.findOne({ slug: COURSE_SLUG }).lean();
  if (!course) {
    console.error(`Course "${COURSE_SLUG}" is not in the database. Seed it first.`);
    await mongoose.disconnect();
    process.exit(1);
  }

  const plan = { topic: null, concepts: [], questions: [], shifted: 0 };

  /* ── topic ── */
  const topicSlug = await freeSlug(slugify, `${COURSE_SLUG}-${topic.title}`, Topic);
  let topicDoc = await Topic.findOne({ courseId: course._id, title: topic.title }).lean();

  // Position: keep the order it has in the content module. Existing topics at
  // or after that position shift down by one, but only on first insert — a
  // re-run must not shift anything again.
  const desiredOrder = curriculum.indexOf(topic) + 1;

  if (topicDoc) {
    plan.topic = `update  ${topic.title} (order ${topicDoc.order})`;
    if (!DRY) {
      await Topic.updateOne(
        { _id: topicDoc._id },
        { $set: { description: topic.description || '', level: topic.level || 'beginner', status: 'published' } }
      );
    }
  } else {
    const toShift = await Topic.countDocuments({ courseId: course._id, order: { $gte: desiredOrder } });
    plan.topic = `CREATE  ${topic.title} (order ${desiredOrder}, slug ${topicSlug})`;
    plan.shifted = toShift;
    if (!DRY) {
      await Topic.updateMany(
        { courseId: course._id, order: { $gte: desiredOrder } },
        { $inc: { order: 1 } }
      );
      const created = await Topic.create({
        courseId: course._id,
        title: topic.title,
        slug: topicSlug,
        description: topic.description || '',
        level: topic.level || 'beginner',
        order: desiredOrder,
        status: 'published',
      });
      topicDoc = created.toObject();
    }
  }

  if (DRY && !topicDoc) {
    // Nothing to hang concepts off in a dry run on a fresh topic — report and stop.
    console.log('\nPlan (dry run, nothing written):');
    console.log(`  ${plan.topic}`);
    console.log(`  shift   ${plan.shifted} existing topic(s) down by one`);
    for (const c of topic.concepts) console.log(`  CREATE  concept: ${c.title}`);
    const iqCount = topic.concepts.reduce((n, c) => n + (c.interviewQuestions || []).length, 0);
    console.log(`  CREATE  ${iqCount} interview question(s)`);
    await mongoose.disconnect();
    return;
  }

  /* ── concepts ── */
  let order = 0;
  for (const c of topic.concepts) {
    order += 1;
    const existing = await Concept.findOne({ courseId: course._id, title: c.title }).lean();
    const slug = await freeSlug(slugify, c.title, Concept, existing?._id);

    const fields = {
      courseId: course._id,
      topicId: topicDoc._id,
      title: c.title,
      slug,
      explanation: c.explanation,
      dailyLifeExample: c.dailyLifeExample || '',
      codeExample: c.codeExample || '',
      codeLanguage: CODE_LANG[COURSE_SLUG] || 'html',
      keyPoints: c.keyPoints || [],
      quiz: c.quiz || [],
      tags: c.tags || [],
      difficulty: c.difficulty || 'easy',
      order,
      xpReward: 10,
      status: 'published',
    };

    let conceptId = existing?._id;
    if (existing) {
      plan.concepts.push(`update  ${c.title}  (keeps _id, progress intact)`);
      if (!DRY) await Concept.updateOne({ _id: existing._id }, { $set: fields });
    } else {
      plan.concepts.push(`CREATE  ${c.title}  (${slug})`);
      if (!DRY) {
        const created = await Concept.create(fields);
        conceptId = created._id;
      }
    }

    /* ── interview questions attached to this concept ── */
    for (const iq of c.interviewQuestions || []) {
      const iqExisting = await InterviewQuestion.findOne({ question: iq.question }).lean();
      const iqSlug = await freeSlug(slugify, iq.question, InterviewQuestion, iqExisting?._id);
      const iqFields = {
        conceptId,
        topicId: topicDoc._id,
        courseId: course._id,
        question: iq.question,
        slug: iqSlug,
        answer: iq.answer,
        difficulty: iq.difficulty || 'medium',
        frequency: iq.frequency || 'common',
        codeExample: iq.codeExample || undefined,
        deepDive: iq.deepDive || [],
        visual: iq.visual || '',
        tags: c.tags || [],
        status: 'published',
      };

      if (iqExisting) {
        plan.questions.push(`update  ${iq.question.slice(0, 60)}…`);
        if (!DRY) await InterviewQuestion.updateOne({ _id: iqExisting._id }, { $set: iqFields });
      } else {
        plan.questions.push(`CREATE  ${iq.question.slice(0, 60)}…`);
        if (!DRY) await InterviewQuestion.create(iqFields);
      }
    }
  }

  /* ── report ── */
  console.log(`\n${DRY ? 'Plan (dry run, nothing written):' : 'Done:'}`);
  console.log(`  ${plan.topic}`);
  if (plan.shifted) console.log(`  shift   ${plan.shifted} existing topic(s) down by one`);
  for (const line of plan.concepts) console.log(`  ${line}`);
  for (const line of plan.questions) console.log(`  ${line}`);

  if (!DRY) {
    const total = await Concept.countDocuments({ courseId: course._id });
    const topics = await Topic.countDocuments({ courseId: course._id });
    console.log(`\n${course.title}: ${topics} topics, ${total} concepts`);
    console.log('No other content was touched. Existing progress, bookmarks and reviews are intact.');
  }

  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
