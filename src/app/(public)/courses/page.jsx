import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import L from '@/components/L';

export const revalidate = 3600;

export const metadata = {
  title: 'All Courses',
  description: 'Browse all programming courses on Learnverse — JavaScript, MERN and more, in English and Hinglish.',
};

async function getCourses() {
  try {
    await connectDB();
    return await Course.find({ status: 'published' }).sort({ order: 1 }).lean();
  } catch {
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Courses</h1>
      <p className="mt-2 text-slate-600">
        <L
          hi="Structured learning paths — concepts, code aur interview prep, sab ek jagah."
          en="Structured learning paths — concepts, code and interview prep, all in one place."
        />
      </p>

      {courses.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          <L hi="Abhi koi course nahi. " en="No courses yet. Run " /><code className="rounded bg-slate-100 px-1.5">npm run seed</code><L hi=" chalao starter content ke liye." en=" to add starter content." />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link
              key={c._id.toString()}
              href={`/courses/${c.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-sm"
            >
              <div className="text-3xl">{c.icon}</div>
              <h2 className="mt-3 font-semibold group-hover:text-indigo-600">{c.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{c.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.tags?.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
