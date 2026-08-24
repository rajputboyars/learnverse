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
      <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-muted">Content overview.</p>

      {!counts ? (
        <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
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
            <div key={c.label} className="lv-card p-5">
              <p className="text-sm text-muted">{c.label}</p>
              <p className="mt-1 text-3xl font-bold text-ink">{c.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <Link href="/admin/concepts/new" className="lv-btn lv-btn-primary">
          + Add concept
        </Link>
        <Link href="/admin/courses" className="lv-btn lv-btn-ghost">
          Manage courses
        </Link>
      </div>
    </div>
  );
}
