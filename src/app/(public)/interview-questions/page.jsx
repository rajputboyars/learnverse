import Link from 'next/link';
import { connectDB } from '@/lib/db';
import InterviewQuestion from '@/models/InterviewQuestion';

export const revalidate = 3600;

export const metadata = {
  title: 'Interview Questions',
  description: 'Common developer interview questions with answers in English and Hinglish.',
};

const LEVELS = ['all', 'easy', 'medium', 'hard'];

async function getQuestions(difficulty) {
  try {
    await connectDB();
    const filter = { status: { $in: ['approved', 'published'] } };
    if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;
    return await InterviewQuestion.find(filter).sort({ createdAt: -1 }).lean();
  } catch {
    return [];
  }
}

export default async function InterviewQuestionsPage({ searchParams }) {
  const sp = await searchParams;
  const difficulty = sp?.difficulty || 'all';
  const questions = await getQuestions(difficulty);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Interview Questions</h1>
      <p className="mt-2 text-slate-600">
        Real questions, asaan jawab — English aur Hinglish dono mein.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {LEVELS.map((l) => (
          <Link
            key={l}
            href={l === 'all' ? '/interview-questions' : `/interview-questions?difficulty=${l}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
              difficulty === l
                ? 'bg-indigo-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {l}
          </Link>
        ))}
      </div>

      {questions.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          No questions yet. Run <code className="rounded bg-slate-100 px-1.5">npm run seed</code> for starter content.
        </p>
      ) : (
        <div className="mt-8 space-y-3">
          {questions.map((q) => (
            <details
              key={q._id.toString()}
              className="group rounded-2xl border border-slate-200 bg-white p-5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium">
                <span>{q.question}</span>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-500">
                  {q.difficulty}
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
          ))}
        </div>
      )}
    </div>
  );
}
