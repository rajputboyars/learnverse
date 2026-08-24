import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Topic from '@/models/Topic';
import Concept from '@/models/Concept';
import L from '@/components/L';
import CourseDetailBody from '@/components/CourseDetailBody';

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

const LEVELS = [
  { key: 'beginner', label: 'Beginner', icon: '🌱' },
  { key: 'intermediate', label: 'Intermediate', icon: '🚀' },
  { key: 'advanced', label: 'Advanced', icon: '🧠' },
];

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

  const topicsByLevel = {};
  for (const t of topics) {
    const lvl = t.level || 'beginner';
    (topicsByLevel[lvl] ||= []).push(t);
  }

  // Serialize the whole tree for the client progress component in one shot —
  // it needs every concept's id/slug/difficulty to render checkmarks and
  // figure out which one is "next up" for the signed-in learner.
  const levels = LEVELS.map((lvl) => ({
    key: lvl.key,
    label: lvl.label,
    icon: lvl.icon,
    topics: (topicsByLevel[lvl.key] || []).map((t) => ({
      id: t._id.toString(),
      title: t.title,
      description: t.description,
      concepts: (conceptsByTopic[t._id.toString()] || []).map((c) => ({
        id: c._id.toString(),
        slug: c.slug,
        title: c.title,
        difficulty: c.difficulty,
      })),
    })),
  })).filter((lvl) => lvl.topics.length > 0);

  return (
    <div className="mx-auto w-full max-w-[840px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Link href="/courses" className="flex items-center gap-1.5 text-[13.5px] font-semibold text-muted hover:text-brand">
        ← <L hi="Saare courses" en="All courses" />
      </Link>

      <div className="mt-4 flex items-start gap-5">
        <div className="text-[44px] leading-none sm:text-[56px]">{course.icon}</div>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-ink sm:text-[32px]">{course.title}</h1>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted sm:text-[15px]">{course.description}</p>
          <p className="mt-2 text-[11.5px] capitalize text-muted-soft sm:text-[13px]">
            {course.difficulty} · {concepts.length} <L hi="concepts" en="concepts" />
          </p>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-0.5 sm:mt-[18px]">
            <Link href={`/practice/${slug}`} className="lv-pill border border-line bg-card text-ink-soft whitespace-nowrap">
              🧠 <L hi="Practice quiz" en="Practice quiz" />
            </Link>
            <Link href={`/mock-interview/${slug}`} className="lv-pill border border-line bg-card text-ink-soft whitespace-nowrap">
              🎤 <L hi="Mock interview" en="Mock interview" />
            </Link>
            <Link href={`/courses/${slug}/discuss`} className="lv-pill border border-line bg-card text-ink-soft whitespace-nowrap">
              💬 <L hi="Discussion board" en="Discussion board" />
            </Link>
          </div>
        </div>
      </div>

      {levels.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line p-8 text-center text-muted">
          <L hi="Is course mein abhi koi topic add nahi hua." en="No topics added to this course yet." />
        </p>
      ) : (
        <CourseDetailBody courseId={course._id.toString()} totalConcepts={concepts.length} levels={levels} />
      )}
    </div>
  );
}
