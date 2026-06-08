import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Topic from '@/models/Topic';
import Concept from '@/models/Concept';

export const revalidate = 3600;

async function getCourse(slug) {
  await connectDB();
  const course = await Course.findOne({ slug, status: 'published' }).lean();
  if (!course) return null;
  const [topics, concepts] = await Promise.all([
    Topic.find({ courseId: course._id }).sort({ order: 1 }).lean(),
    Concept.find({ courseId: course._id, status: 'published' })
      .sort({ order: 1 })
      .select('title slug topicId difficulty order')
      .lean(),
  ]);
  return { course, topics, concepts };
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const courses = await Course.find({ status: 'published' }).select('slug').lean();
    return courses.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await connectDB();
    const course = await Course.findOne({ slug }).lean();
    if (!course) return { title: 'Course not found' };
    return {
      title: course.title,
      description: course.description,
      alternates: { canonical: `/courses/${slug}` },
      openGraph: {
        type: 'website',
        title: course.title,
        description: course.description,
        url: `/courses/${slug}`,
      },
    };
  } catch {
    return { title: 'Course' };
  }
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const data = await getCourse(slug).catch(() => null);
  if (!data) notFound();
  const { course, topics, concepts } = data;

  const conceptsByTopic = {};
  for (const c of concepts) {
    const key = c.topicId?.toString() || 'none';
    (conceptsByTopic[key] ||= []).push(c);
  }

  // Group topics by level for a beginner → intermediate → advanced path.
  const LEVELS = [
    { key: 'beginner', label: 'Beginner', icon: '🌱' },
    { key: 'intermediate', label: 'Intermediate', icon: '🚀' },
    { key: 'advanced', label: 'Advanced', icon: '🧠' },
  ];
  const topicsByLevel = {};
  for (const t of topics) {
    const lvl = t.level || 'beginner';
    (topicsByLevel[lvl] ||= []).push(t);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/courses" className="text-sm text-slate-500 hover:text-indigo-600">
        ← All courses
      </Link>

      <div className="mt-4 flex items-start gap-4">
        <div className="text-5xl">{course.icon}</div>
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-2 text-slate-600">{course.description}</p>
          <span className="mt-2 inline-block text-sm capitalize text-slate-400">
            {course.difficulty} · {concepts.length} concepts
          </span>
        </div>
      </div>

      <div className="mt-10 space-y-12">
        {topics.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No topics added to this course yet.
          </p>
        )}
        {LEVELS.map((lvl) => {
          const levelTopics = topicsByLevel[lvl.key] || [];
          if (levelTopics.length === 0) return null;
          return (
            <div key={lvl.key}>
              <div className="mb-5 flex items-center gap-2">
                <span className="text-2xl">{lvl.icon}</span>
                <h2 className="text-2xl font-bold">{lvl.label}</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                  {levelTopics.length} topics
                </span>
              </div>
              <div className="space-y-8">
                {levelTopics.map((t) => {
                  const list = conceptsByTopic[t._id.toString()] || [];
                  return (
                    <section key={t._id.toString()}>
                      <h3 className="text-lg font-semibold">{t.title}</h3>
                      {t.description && (
                        <p className="mt-1 text-sm text-slate-500">{t.description}</p>
                      )}
                      <div className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                        {list.length === 0 && (
                          <p className="p-4 text-sm text-slate-400">Coming soon…</p>
                        )}
                        {list.map((c, i) => (
                          <Link
                            key={c._id.toString()}
                            href={`/concepts/${c.slug}`}
                            className="flex items-center justify-between px-4 py-3.5 transition hover:bg-slate-50"
                          >
                            <span className="flex items-center gap-3">
                              <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                                {i + 1}
                              </span>
                              <span className="font-medium">{c.title}</span>
                            </span>
                            <span className="text-xs capitalize text-slate-400">{c.difficulty}</span>
                          </Link>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
