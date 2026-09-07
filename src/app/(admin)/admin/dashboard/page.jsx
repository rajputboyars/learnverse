import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Topic from '@/models/Topic';
import Concept from '@/models/Concept';
import InterviewQuestion from '@/models/InterviewQuestion';
import User from '@/models/User';
import Prompt from '@/models/Prompt';
import PromptReport from '@/models/PromptReport';

async function getCounts() {
  try {
    await connectDB();
    const [courses, topics, concepts, questions, users, queue, reports] = await Promise.all([
      Course.countDocuments(),
      Topic.countDocuments(),
      Concept.countDocuments(),
      InterviewQuestion.countDocuments(),
      User.countDocuments(),
      Prompt.countDocuments({ status: { $in: ['pending', 'ai_reviewed'] } }),
      PromptReport.countDocuments({ status: 'open' }),
    ]);
    return { courses, topics, concepts, questions, users, queue, reports };
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-slate-500">Content overview.</p>

      {!counts ? (
        <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          Could not connect to the database. Check MONGODB_URI in .env.local.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: 'Courses', value: counts.courses },
            { label: 'Topics', value: counts.topics },
            { label: 'Concepts', value: counts.concepts },
            { label: 'Interview Qs', value: counts.questions },
            { label: 'Users', value: counts.users },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">{c.label}</p>
              <p className="mt-1 text-3xl font-bold">{c.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Anything actually waiting on a human gets surfaced here rather than
          sitting unseen in a sub-page. */}
      {counts && (counts.queue > 0 || counts.reports > 0) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {counts.queue > 0 && (
            <Link
              href="/admin/prompts"
              className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900 hover:border-amber-400"
            >
              {counts.queue} prompt{counts.queue === 1 ? '' : 's'} waiting for review →
            </Link>
          )}
          {counts.reports > 0 && (
            <Link
              href="/admin/reports"
              className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 hover:border-red-400"
            >
              {counts.reports} open report{counts.reports === 1 ? '' : 's'} →
            </Link>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/analytics" className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">
          Platform analytics
        </Link>
        <Link href="/admin/concepts/new" className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">
          + Add concept
        </Link>
        <Link href="/admin/courses" className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">
          Manage courses
        </Link>
      </div>
    </div>
  );
}
