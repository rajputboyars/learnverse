import Link from 'next/link';
import { connectDB } from '@/lib/db';
import InterviewQuestion from '@/models/InterviewQuestion';
import Course from '@/models/Course';
import L from '@/components/L';
import InterviewQuestionsBrowser from '@/components/InterviewQuestionsBrowser';

export const revalidate = 3600;

export const metadata = {
  title: 'Interview Questions',
  description: 'Common developer interview questions with answers in English and Hinglish — filter by course and difficulty level.',
};

const LEVELS = ['all', 'easy', 'medium', 'hard'];

// Questions are always presented easy → medium → hard.
const DIFFICULTY_RANK = { easy: 0, medium: 1, hard: 2 };

async function getData(courseSlug, difficulty) {
  try {
    await connectDB();
    const courses = await Course.find({ status: 'published' })
      .sort({ order: 1 })
      .select('title slug icon description')
      .lean();

    // Question count per course for the cards
    const agg = await InterviewQuestion.aggregate([
      { $match: { status: { $in: ['approved', 'published'] } } },
      { $group: { _id: '$courseId', count: { $sum: 1 } } },
    ]);
    const countMap = {};
    for (const row of agg) countMap[row._id?.toString()] = row.count;

    // Default (no course) → return just courses for card grid
    if (!courseSlug || courseSlug === 'all') {
      return { courses, questions: null, courseById: {}, countMap, activeCourse: null };
    }

    const courseById = {};
    for (const c of courses) courseById[c._id.toString()] = c;
    const activeCourse = courses.find((c) => c.slug === courseSlug) || null;

    const filter = { status: { $in: ['approved', 'published'] } };
    if (activeCourse) filter.courseId = activeCourse._id;
    if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;

    const rows = await InterviewQuestion.find(filter).sort({ createdAt: -1 }).lean();

    // Order easy → medium → hard, then serialise for the client component.
    const questions = rows
      .sort(
        (a, b) =>
          (DIFFICULTY_RANK[a.difficulty] ?? 1) - (DIFFICULTY_RANK[b.difficulty] ?? 1)
      )
      .map((q) => ({
        id: q._id.toString(),
        question: q.question,
        difficulty: q.difficulty || 'medium',
        frequency: q.frequency || 'common',
        english: q.answer?.english || '',
        hinglish: q.answer?.hinglish || '',
        codeExample: q.codeExample?.code
          ? { code: q.codeExample.code, output: q.codeExample.output || '' }
          : null,
        visual: q.visual || '',
        deepDive: (q.deepDive || [])
          .filter((d) => d?.body?.en || d?.body?.hi || d?.code || d?.diagram)
          .map((d) => ({
            heading: { en: d.heading?.en || '', hi: d.heading?.hi || '' },
            body: { en: d.body?.en || '', hi: d.body?.hi || '' },
            code: d.code || '',
            diagram: d.diagram || '',
          })),
      }));

    return { courses, questions, courseById, countMap, activeCourse };
  } catch {
    return { courses: [], questions: null, courseById: {}, countMap: {}, activeCourse: null };
  }
}

function hrefFor({ course, difficulty }) {
  const params = new URLSearchParams();
  if (course && course !== 'all') params.set('course', course);
  if (difficulty && difficulty !== 'all') params.set('difficulty', difficulty);
  const qs = params.toString();
  return qs ? `/interview-questions?${qs}` : '/interview-questions';
}

export default async function InterviewQuestionsPage({ searchParams }) {
  const sp = await searchParams;
  const course    = sp?.course     || 'all';
  const difficulty = sp?.difficulty || 'all';
  const { courses, questions, countMap, activeCourse } = await getData(course, difficulty);

  /* ── Default view: course cards ── */
  if (!questions) {
    return (
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold">Interview Questions</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          <L
            hi="Course choose karo, phir apni preparation shuru karo."
            en="Pick a course below to browse questions or jump straight into a mock interview."
          />
        </p>

        {courses.length === 0 ? (
          <p className="mt-10 text-center text-slate-500">
            <L hi="Abhi koi course nahi hai." en="No courses available yet." />
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => {
              const qCount = countMap[c._id.toString()] || 0;
              return (
                <div
                  key={c.slug}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                >
                  {/* Icon */}
                  <div className="text-5xl">{c.icon || '📘'}</div>

                  {/* Title + count */}
                  <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {qCount}{' '}
                    <L hi="questions" en="questions" />
                  </p>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Actions */}
                  <div className="mt-5 flex gap-2">
                    <Link
                      href={`/interview-questions?course=${c.slug}`}
                      className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      <L hi="Questions Dekho" en="View Questions" />
                    </Link>
                    <Link
                      href={`/mock-interview/${c.slug}`}
                      className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      🎤 Mock
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* ── Course view: questions grid ── */
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
      {/* Back + breadcrumb */}
      <Link
        href="/interview-questions"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600"
      >
        ← <L hi="Saare courses" en="All courses" />
      </Link>

      {/* Heading */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">
            {activeCourse ? `${activeCourse.icon} ${activeCourse.title}` : 'Interview Questions'}
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            <L
              hi="Real questions, asaan jawab — English aur Hinglish dono mein."
              en="Real questions, simple answers — in both English and Hinglish."
            />
          </p>
        </div>
        {activeCourse && (
          <Link
            href={`/mock-interview/${activeCourse.slug}`}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            🎤 <L hi="Mock Interview Shuru Karo" en="Start Mock Interview" />
          </Link>
        )}
      </div>

      {/* Level filter */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Level</p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <Link
              key={l}
              href={hrefFor({ course, difficulty: l })}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
                difficulty === l
                  ? 'bg-indigo-600 text-white'
                  : 'border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400'
              }`}
            >
              {l === 'all' ? <L hi="Sab" en="All" /> : l}
            </Link>
          ))}
        </div>
      </div>

      {questions.length > 0 && <InterviewQuestionsBrowser questions={questions} />}

      {questions.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">
          <L
            hi="Is filter ke liye koi question nahi mila. Doosra level try karo."
            en="No questions for this filter. Try another level."
          />
        </p>
      ) : null}
    </div>
  );
}
