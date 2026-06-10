// Seeds Learnverse with all course curricula, interview questions, and an admin
// user. Add a course by importing its content module into COURSES below.
// Run with: npm run seed
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import * as javascriptCourse from './content/javascript.mjs';
import * as htmlCourse from './content/html.mjs';
import * as html5Course from './content/html5.mjs';
import * as cssCourse from './content/css.mjs';
import * as tailwindCourse from './content/tailwind.mjs';
import * as reactCourse from './content/react.mjs';
import * as nodejsCourse from './content/nodejs.mjs';
import * as expressCourse from './content/express.mjs';
import * as mongodbCourse from './content/mongodb.mjs';
import * as typescriptCourse from './content/typescript.mjs';
import * as nextjsCourse from './content/nextjs.mjs';
import * as reduxCourse from './content/redux.mjs';
import * as gitCourse from './content/git.mjs';
import * as restapiCourse from './content/restapi.mjs';
import * as dockerCourse from './content/docker.mjs';
import * as sqlCourse from './content/sql.mjs';
import * as mysqlCourse from './content/mysql.mjs';
import * as pythonCourse from './content/python.mjs';
import * as javaCourse from './content/java.mjs';
import * as phpCourse from './content/php.mjs';
import * as numpyCourse from './content/numpy.mjs';
import * as pandasCourse from './content/pandas.mjs';

const COURSES = [
  javascriptCourse,
  htmlCourse,
  html5Course,
  cssCourse,
  tailwindCourse,
  reactCourse,
  nodejsCourse,
  expressCourse,
  mongodbCourse,
  typescriptCourse,
  nextjsCourse,
  reduxCourse,
  gitCourse,
  restapiCourse,
  dockerCourse,
  sqlCourse,
  mysqlCourse,
  pythonCourse,
  javaCourse,
  phpCourse,
  numpyCourse,
  pandasCourse,
];

// Code-fence language label per course slug.
const CODE_LANG = {
  javascript: 'javascript',
  html: 'html',
  html5: 'html',
  css: 'css',
  tailwind: 'html',
  react: 'jsx',
  nodejs: 'javascript',
  express: 'javascript',
  mongodb: 'javascript',
  typescript: 'typescript',
  nextjs: 'jsx',
  redux: 'javascript',
  git: 'bash',
  restapi: 'javascript',
  docker: 'dockerfile',
  sql: 'sql',
  mysql: 'sql',
  python: 'python',
  java: 'java',
  php: 'php',
  numpy: 'python',
  pandas: 'python',
};

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- load .env.local manually (standalone script) ---
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

const S = mongoose.Schema;
const Course = mongoose.model('Course', new S({}, { strict: false, timestamps: true }));
const Topic = mongoose.model('Topic', new S({}, { strict: false, timestamps: true }));
const Concept = mongoose.model('Concept', new S({}, { strict: false, timestamps: true }));
const InterviewQuestion = mongoose.model('InterviewQuestion', new S({}, { strict: false, timestamps: true }));
const User = mongoose.model('User', new S({}, { strict: false, timestamps: true }));
const UserStats = mongoose.model('UserStats', new S({}, { strict: false, timestamps: true }));

// Ensure globally-unique slugs across all content.
const usedSlugs = new Set();
function uniqueSlug(slugify, base) {
  const slug = slugify(base) || 'item';
  let s = slug;
  let i = 2;
  while (usedSlugs.has(s)) s = `${slug}-${i++}`;
  usedSlugs.add(s);
  return s;
}

async function processCourse(mod, totals) {
  const { course, curriculum, generalInterviewQuestions = [], slugify } = mod;
  const courseDoc = await Course.create(course);

  let topicOrder = 0;
  for (const topic of curriculum) {
    topicOrder += 1;
    const topicDoc = await Topic.create({
      courseId: courseDoc._id,
      title: topic.title,
      slug: uniqueSlug(slugify, `${course.slug}-${topic.title}`),
      description: topic.description || '',
      level: topic.level || 'beginner',
      order: topicOrder,
      status: 'published',
    });

    let conceptOrder = 0;
    for (const c of topic.concepts) {
      conceptOrder += 1;
      const conceptDoc = await Concept.create({
        courseId: courseDoc._id,
        topicId: topicDoc._id,
        title: c.title,
        slug: uniqueSlug(slugify, c.title),
        explanation: c.explanation,
        dailyLifeExample: c.dailyLifeExample || '',
        codeExample: c.codeExample || '',
        codeLanguage: CODE_LANG[course.slug] || 'html',
        keyPoints: c.keyPoints || [],
        quiz: c.quiz || [],
        tags: c.tags || [],
        difficulty: c.difficulty || 'easy',
        order: conceptOrder,
        xpReward: 10,
        status: 'published',
      });
      totals.concepts += 1;

      for (const iq of c.interviewQuestions || []) {
        await InterviewQuestion.create({
          conceptId: conceptDoc._id,
          topicId: topicDoc._id,
          courseId: courseDoc._id,
          question: iq.question,
          slug: uniqueSlug(slugify, iq.question),
          answer: iq.answer,
          difficulty: iq.difficulty || 'medium',
          frequency: iq.frequency || 'common',
          tags: c.tags || [],
          status: 'published',
        });
        totals.iq += 1;
      }
    }
    totals.topics += 1;
  }

  for (const iq of generalInterviewQuestions) {
    await InterviewQuestion.create({
      courseId: courseDoc._id,
      question: iq.question,
      slug: uniqueSlug(slugify, iq.question),
      answer: iq.answer,
      difficulty: iq.difficulty || 'medium',
      frequency: iq.frequency || 'common',
      status: 'published',
    });
    totals.iq += 1;
  }

  console.log(`  ✓ ${course.title} seeded`);
}

async function run() {
  console.log('Connecting to', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    Course.deleteMany({}),
    Topic.deleteMany({}),
    Concept.deleteMany({}),
    InterviewQuestion.deleteMany({}),
  ]);
  console.log('Cleared existing content');

  const totals = { topics: 0, concepts: 0, iq: 0 };
  for (const mod of COURSES) {
    await processCourse(mod, totals);
  }
  console.log(`Inserted ${COURSES.length} courses, ${totals.topics} topics, ${totals.concepts} concepts, ${totals.iq} interview questions`);

  // Admin user
  const adminEmail = (process.env.ADMIN_EMAILS || 'admin@learnverse.dev').split(',')[0].trim().toLowerCase();
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = await User.create({ name: 'Admin', email: adminEmail, passwordHash, role: 'admin' });
    await UserStats.create({ userId: admin._id, name: 'Admin' });
    console.log(`Created admin: ${adminEmail} / admin123`);
  } else {
    console.log(`Admin already exists: ${adminEmail}`);
  }

  await mongoose.disconnect();
  console.log('✅ Seed complete');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
