import Link from 'next/link';
import { connectDB } from '@/lib/db';
import InterviewQuestion from '@/models/InterviewQuestion';
import Course from '@/models/Course';
import L from '@/components/L';

export const revalidate = 3600;

export const metadata = {
  title: 'Interview Questions',
  description: 'Common developer interview questions with answers in English and Hinglish — filter by course and difficulty level.',
};

const LEVELS = ['all', 'easy', 'medium', 'hard'];

async function getData(courseSlug, difficulty) {
  try {
    await connectDB();
    const courses = await Course.find({ status: 'published' })
      .sort({ order: 1 })
      .select('title slug icon')
      .lean();

    const filter = { status: { $in: ['approved', 'published'] } };

    let activeCourse = null;
    if (courseSlug && courseSlug !== 'all') {
      activeCourse = courses.find((c) => c.slug === courseSlug) || null;
      if (activeCourse) filter.courseId = activeCourse._id;
    }
    if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;

    const questions = await InterviewQuestion.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    // Map courseId -> course for badges
    const courseById = {};
    for (const c of courses) courseById[c._id.toString()] = c;

    return { courses, questions, courseById };
  } catch {
    return { courses: [], questions: [], courseById: {} };
  }
}

// Build a URL preserving the other active filter.
function hrefFor({ course, difficulty }) {
  const params = new URLSearchParams();
  if (course && course !== 'all') params.set('course', course);
  if (difficulty && difficulty !== 'all') params.set('difficulty', difficulty);
  const qs = params.toString();
  return qs ? `/interview-questions?${qs}` : '/interview-questions';
}

export default async function InterviewQuestionsPage({ searchParams }) {
  const sp = await searchParams;
  const course = sp?.course || 'all';
  const difficulty = sp?.difficulty || 'all';
  const { courses, questions, courseById } = await getData(course, difficulty);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Interview Questions</h1>
      <p className="mt-2 text-slate-600">
        <L
          hi="Real questions, asaan jawab — English aur Hinglish dono mein. Course aur level se filter karo."
          en="Real questions, simple answers — in both English and Hinglish. Filter by course and level."
        />
      </p>

      {/* Coursewise filter */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Course</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={hrefFor({ course: 'all', difficulty })}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              course === 'all'
                ? 'bg-indigo-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <L hi="Saare courses" en="All courses" />
          </Link>
          {courses.map((c) => (
            <Link
              key={c.slug}
              href={hrefFor({ course: c.slug, difficulty })}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                course === c.slug
                  ? 'bg-indigo-600 text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c.icon} {c.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Level (difficulty) filter */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Level</p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <Link
              key={l}
              href={hrefFor({ course, difficulty: l })}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
                difficulty === l
                  ? 'bg-indigo-600 text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {l === 'all' ? <L hi="Sab" en="All" /> : l}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        {questions.length} {questions.length === 1 ? <L hi="question" en="question" /> : <L hi="questions" en="questions" />} <L hi="mile" en="found" />
      </p>

      {questions.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          <L hi="Is filter ke liye koi question nahi mila. Doosra course ya level try karo." en="No questions for this filter. Try another course or level." />
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {questions.map((q) => {
            const c = q.courseId ? courseById[q.courseId.toString()] : null;
            return (
              <details
                key={q._id.toString()}
                className="group rounded-2xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium">
                  <span>{q.question}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    {c && (
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600">
                        {c.icon} {c.title}
                      </span>
                    )}
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-500">
                      {q.difficulty}
                    </span>
                  </span>
                </summary>
                {q.answer?.english && (
                  <div className="prose-content mt-3 text-sm text-slate-700">
                    {q.answer.english}
                  </div>
                )}
                {q.answer?.hinglish && (
                  <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
                    <span className="font-semibold">Hinglish: </span>
                    {q.answer.hinglish}
                  </div>
                )}
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}
