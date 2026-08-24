import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Topic from '@/models/Topic';
import Concept from '@/models/Concept';
import InterviewQuestion from '@/models/InterviewQuestion';
import User from '@/models/User';

async function getCounts() {
  try {
    await connectDB();
    const [courses, topics, concepts, questions, users] = await Promise.all([
      Course.countDocuments(),
      Topic.countDocuments(),
      Concept.countDocuments(),
      InterviewQuestion.countDocuments(),
      User.countDocuments(),
    ]);
    return { courses, topics, concepts, questions, users };
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

      <div className="mt-8 flex gap-3">
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
