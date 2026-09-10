// Additive course install — adds or updates ONE whole course without touching
// anything else in the database.
//
// `npm run seed` wipes Courses, Topics, Concepts and InterviewQuestions and
// recreates them with fresh ObjectIds. UserProgress, Review, Bookmark, Reaction
// and Comment all reference concepts by _id, so re-seeding orphans every
// completion, bookmark and comment in the system. That is fine for a local
// reset and unacceptable on a database with real users.
//
// `sync-topic.mjs` is the additive path for one topic, but it requires the
// course to exist already. This script is the missing piece: it installs a
// course that is not in the database yet, and on a re-run it updates the
// content in place, keeping every _id so progress and bookmarks survive.
//
//   node scripts/add-course.mjs --course jahia --dry
//   node scripts/add-course.mjs --course jahia
//
// --dry prints the plan and writes nothing.

import mongoose from 'mongoose';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/* ── env ── */
const envPath = join(ROOT, '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
const MONGODB_URI = process.env.MONGODB_URI;

/* ── args ── */
const args = process.argv.slice(2);
function arg(name) {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? null : args[i + 1];
}
const COURSE_SLUG = arg('course');
const DRY = args.includes('--dry');

if (!COURSE_SLUG) {
  console.error('Usage: node scripts/add-course.mjs --course <slug> [--dry]');
  process.exit(1);
}
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set. Add it to .env.local or the environment.');
  process.exit(1);
}

/* ── models (kept loose; the app owns the real schemas) ── */
const loose = () => new mongoose.Schema({}, { strict: false, timestamps: true });
const Course = mongoose.models.Course || mongoose.model('Course', loose());
const Topic = mongoose.models.Topic || mongoose.model('Topic', loose());
const Concept = mongoose.models.Concept || mongoose.model('Concept', loose());
const InterviewQuestion =
  mongoose.models.InterviewQuestion || mongoose.model('InterviewQuestion', loose());

function safeUri(uri) {
  return String(uri).replace(/:[^:@/]*@/, ':***@');
}

/** A slug not already taken by a different document in that collection. */
async function freeSlug(slugify, base, Model, ownId = null) {
  const root = slugify(base) || 'item';
  let slug = root;
  for (let i = 2; ; i += 1) {
    const clash = await Model.findOne({ slug }).select('_id').lean();
    if (!clash || (ownId && String(clash._id) === String(ownId))) return slug;
    slug = `${root}-${i}`;
  }
}

const CODE_LANG = {
  jahia: 'jsx',
};

async function run() {
  const modPath = join(ROOT, 'scripts', 'content', `${COURSE_SLUG}.mjs`);
  if (!existsSync(modPath)) {
    console.error(`No content module at scripts/content/${COURSE_SLUG}.mjs`);
    process.exit(1);
  }
  const mod = await import(`./content/${COURSE_SLUG}.mjs`);
  const { course, curriculum, generalInterviewQuestions = [], slugify } = mod;

  console.log(`Connecting to ${safeUri(MONGODB_URI)}`);
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  } catch {
    console.error(`\nCould not reach MongoDB at ${safeUri(MONGODB_URI)}. Nothing was changed.`);
    process.exit(1);
  }

  const plan = { course: '', topics: 0, concepts: 0, updated: 0, questions: 0 };

  /* ── course ── */
  let courseDoc = await Course.findOne({ slug: course.slug });
  if (courseDoc) {
    plan.course = 'update';
    // $set, not Object.assign + save(). A bilingual description is an object on
    // a Mixed/unknown path, and Mongoose cannot detect a change there — save()
    // skips it and the write silently does nothing.
    if (!DRY) await Course.updateOne({ _id: courseDoc._id }, { $set: course });
  } else {
    plan.course = 'create';
    if (!DRY) courseDoc = await Course.create(course);
  }
  if (DRY && !courseDoc) {
    console.log(`\n[dry] would ${plan.course} course "${course.title}"`);
    console.log(`[dry] would add ${curriculum.length} topics and ` +
      `${curriculum.reduce((n, t) => n + t.concepts.length, 0)} concepts`);
    await mongoose.disconnect();
    return;
  }

  /* ── topics, concepts, questions ── */
  let topicOrder = 0;
  for (const topic of curriculum) {
    topicOrder += 1;

    let topicDoc = await Topic.findOne({ courseId: courseDoc._id, title: topic.title });
    if (!topicDoc) {
      plan.topics += 1;
      if (!DRY) {
        topicDoc = await Topic.create({
          courseId: courseDoc._id,
          title: topic.title,
          slug: await freeSlug(slugify, `${course.slug}-${topic.title}`, Topic),
          description: topic.description || '',
          level: topic.level || 'beginner',
          stage: topic.stage,
            band: topic.band,
          estimatedMinutes: topic.estimatedMinutes,
          order: topicOrder,
          status: 'published',
        });
      }
    } else if (!DRY) {
      await Topic.updateOne(
        { _id: topicDoc._id },
        {
          $set: {
            description: topic.description || '',
            level: topic.level || 'beginner',
            stage: topic.stage,
            band: topic.band,
            estimatedMinutes: topic.estimatedMinutes,
            order: topicOrder,
          },
        }
      );
    }
    if (DRY) {
      console.log(`[dry] topic: ${topic.title} (${topic.concepts.length} concepts)`);
      continue;
    }

    let conceptOrder = 0;
    for (const c of topic.concepts) {
      conceptOrder += 1;

      // Match on title within the course, so a re-run updates in place and the
      // _id — and therefore everyone's progress — is preserved.
      let conceptDoc = await Concept.findOne({ courseId: courseDoc._id, title: c.title });
      const fields = {
        courseId: courseDoc._id,
        topicId: topicDoc._id,
        title: c.title,
        explanation: c.explanation,
        dailyLifeExample: c.dailyLifeExample || '',
        codeExample: c.codeExample || '',
        codeLanguage: c.codeLanguage || CODE_LANG[course.slug] || 'javascript',
        keyPoints: c.keyPoints || [],
        quiz: c.quiz || [],
        lesson: c.lesson,
        tags: c.tags || [],
        difficulty: c.difficulty || 'easy',
        order: conceptOrder,
        xpReward: 10,
        status: 'published',
      };

      if (conceptDoc) {
        plan.updated += 1;
        await Concept.updateOne({ _id: conceptDoc._id }, { $set: fields });
      } else {
        plan.concepts += 1;
        conceptDoc = await Concept.create({
          ...fields,
          slug: await freeSlug(slugify, c.title, Concept),
        });
      }

      for (const iq of c.interviewQuestions || []) {
        const exists = await Concept.db
          .collection('interviewquestions')
          .findOne({ conceptId: conceptDoc._id, question: iq.question });
        if (exists) {
          // Refresh the answer in place — same _id, so bookmarks survive.
          await InterviewQuestion.updateOne(
            { _id: exists._id },
            {
              $set: {
                answer: iq.answer,
                difficulty: iq.difficulty || 'medium',
                codeExample: iq.codeExample || undefined,
                deepDive: iq.deepDive || [],
              },
            }
          );
          continue;
        }
        plan.questions += 1;
        await InterviewQuestion.create({
          conceptId: conceptDoc._id,
          topicId: topicDoc._id,
          courseId: courseDoc._id,
          question: iq.question,
          slug: await freeSlug(slugify, iq.question, InterviewQuestion),
          answer: iq.answer,
          difficulty: iq.difficulty || 'medium',
          frequency: iq.frequency || 'common',
          codeExample: iq.codeExample || undefined,
          deepDive: iq.deepDive || [],
          visual: iq.visual || '',
          tags: c.tags || [],
          status: 'published',
        });
      }
    }
  }

  /* ── topics the curriculum no longer names ── */
  // A restructure moves concepts into new topics and leaves the old topic
  // behind, empty. Remove only those that are genuinely empty: a topic still
  // holding a concept is never touched.
  if (!DRY) {
    const keep = new Set(curriculum.map((t) => t.title));
    const stale = await Topic.find({ courseId: courseDoc._id }).select('_id title').lean();
    for (const t of stale) {
      if (keep.has(t.title)) continue;
      const holding = await Concept.countDocuments({ topicId: t._id });
      if (holding === 0) {
        await Topic.deleteOne({ _id: t._id });
        console.log(`removed empty topic "${t.title}"`);
      }
    }
  }

  /* ── course-level interview questions ── */
  if (!DRY) {
    for (const iq of generalInterviewQuestions) {
      const exists = await InterviewQuestion.findOne({
        courseId: courseDoc._id,
        question: iq.question,
      }).select('_id').lean();
      if (exists) continue;
      plan.questions += 1;
      await InterviewQuestion.create({
        courseId: courseDoc._id,
        question: iq.question,
        slug: await freeSlug(slugify, iq.question, InterviewQuestion),
        answer: iq.answer,
        difficulty: iq.difficulty || 'medium',
        frequency: iq.frequency || 'common',
        tags: course.tags || [],
        status: 'published',
      });
    }
  }

  console.log(
    DRY
      ? '\n[dry] nothing was written.'
      : `\nDone. Course ${plan.course}d, ${plan.topics} topics added, ` +
        `${plan.concepts} concepts added, ${plan.updated} updated, ` +
        `${plan.questions} interview questions added.`
  );
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
