import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import InterviewQuestion from '@/models/InterviewQuestion';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Search',
  description: 'Search programming concepts and interview questions on Learnverse.',
};

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function search(q) {
  if (!q) return { concepts: [], questions: [], courseById: {} };
  try {
    await connectDB();
    const rx = new RegExp(escapeRegex(q), 'i');
    const [concepts, questions, courses] = await Promise.all([
      Concept.find({ status: 'published', $or: [{ title: rx }, { tags: rx }] })
        .select('title slug difficulty courseId')
        .limit(40)
        .lean(),
      InterviewQuestion.find({
        status: { $in: ['approved', 'published'] },
        question: rx,
      })
        .select('question difficulty courseId')
        .limit(20)
        .lean(),
      Course.find({ status: 'published' }).select('title slug icon').lean(),
    ]);
    const courseById = {};
    for (const c of courses) courseById[c._id.toString()] = c;
    return { concepts, questions, courseById };
  } catch {
    return { concepts: [], questions: [], courseById: {} };
  }
}

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const q = (sp?.q || '').trim();
  const { concepts, questions, courseById } = await search(q);
  const total = concepts.length + questions.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Search</h1>

      <form action="/search" className="mt-6">
        <input
          name="q"
          defaultValue={q}
          autoFocus
          placeholder="Search concepts, interview questions… (e.g. closure, flexbox)"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400"
        />
      </form>

      {!q ? (
        <p className="mt-8 text-slate-500">Type something to search across all courses.</p>
      ) : (
        <>
          <p className="mt-6 text-sm text-slate-500">
            {total} result{total === 1 ? '' : 's'} for &ldquo;{q}&rdquo;
          </p>

          {concepts.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Concepts</h2>
              <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                {concepts.map((c) => {
                  const course = courseById[c.courseId?.toString()];
                  return (
                    <Link key={c._id.toString()} href={`/concepts/${c.slug}`} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                      <span className="font-medium">{c.title}</span>
                      <span className="flex items-center gap-2 text-xs text-slate-400">
                        {course && <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-600">{course.icon} {course.title}</span>}
                        <span className="capitalize">{c.difficulty}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {questions.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Interview Questions</h2>
              <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                {questions.map((qn) => {
                  const course = courseById[qn.courseId?.toString()];
                  return (
                    <Link key={qn._id.toString()} href={course ? `/interview-questions?course=${course.slug}` : '/interview-questions'} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                      <span>{qn.question}</span>
                      {course && <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600">{course.icon}</span>}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {total === 0 && (
            <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
              Kuch nahi mila. Doosre keywords try karo.
            </p>
          )}
        </>
      )}
    </div>
  );
}
