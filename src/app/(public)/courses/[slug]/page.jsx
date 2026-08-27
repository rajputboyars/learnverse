import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Topic from '@/models/Topic';
import Concept from '@/models/Concept';
import InterviewQuestion from '@/models/InterviewQuestion';
import CourseView from '@/components/CourseView';

export const revalidate = 3600;

// Ordered levels — the page reads as a beginner → advanced path.
const LEVELS = [
  { key: 'beginner', label: 'Beginner' },
  { key: 'intermediate', label: 'Intermediate' },
  { key: 'advanced', label: 'Advanced' },
];

async function getCourse(slug) {
  await connectDB();
  const course = await Course.findOne({ slug, status: 'published' }).lean();
  if (!course) return null;

  const [topics, concepts, questionCount, questionPreview] = await Promise.all([
    Topic.find({ courseId: course._id }).sort({ order: 1 }).lean(),
    Concept.find({ courseId: course._id, status: 'published' })
      .sort({ order: 1 })
      .select('title slug topicId difficulty order')
      .lean(),
    InterviewQuestion.countDocuments({
      courseId: course._id,
      status: { $in: ['approved', 'published'] },
    }),
    InterviewQuestion.find({ courseId: course._id, status: { $in: ['approved', 'published'] } })
      .sort({ createdAt: -1 })
      .limit(2)
      .select('question')
      .lean(),
  ]);

  const conceptsByTopic = {};
  for (const c of concepts) {
    const key = c.topicId?.toString() || 'none';
    (conceptsByTopic[key] ||= []).push({
      id: c._id.toString(),
      title: c.title,
      slug: c.slug,
      difficulty: c.difficulty,
    });
  }

  // Group topics by level, dropping levels this course does not use.
  const levels = LEVELS.map((lvl) => ({
    ...lvl,
    topics: topics
      .filter((t) => (t.level || 'beginner') === lvl.key)
      .map((t) => ({
        id: t._id.toString(),
        title: t.title,
        description: t.description || '',
        concepts: conceptsByTopic[t._id.toString()] || [],
      })),
  })).filter((lvl) => lvl.topics.length > 0);

  return {
    course: {
      slug: course.slug,
      title: course.title,
      description: course.description,
      difficulty: course.difficulty,
      icon: course.icon,
    },
    levels,
    totals: { concepts: concepts.length, topics: topics.length },
    questions: {
      count: questionCount,
      preview: questionPreview.map((q) => ({ id: q._id.toString(), question: q.question })),
    },
  };
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

  return (
    <CourseView
      course={data.course}
      levels={data.levels}
      totals={data.totals}
      questions={data.questions}
    />
  );
}
