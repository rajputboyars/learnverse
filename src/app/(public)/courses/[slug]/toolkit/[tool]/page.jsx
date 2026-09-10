import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Concept from '@/models/Concept';
import CourseToolkit from '@/components/course/CourseToolkit';
import { coursesWithToolkit, getCourseConfig, toolData, toolMeta } from '@/data/courses';

export const revalidate = 3600;

// A course's reference tools — references, cheat sheets, error databases,
// project boards and course-specific tools (Jahia's CND explorer). Any course
// with a toolkit config in data/courses gets them, with no new page.

export function generateStaticParams() {
  return coursesWithToolkit().flatMap((slug) => toolMeta(slug).map((t) => ({ slug, tool: t.id })));
}

export async function generateMetadata({ params }) {
  const { slug, tool } = await params;
  const config = getCourseConfig(slug);
  const meta = toolMeta(slug).find((t) => t.id === tool);
  if (!config || !meta) return { title: 'Not found' };
  return {
    title: `${meta.title} — ${config.name}`,
    description: meta.description,
    alternates: { canonical: `/courses/${slug}/toolkit/${tool}` },
  };
}

// Lesson title → { slug, id }, so reference entries can link to the lesson
// that teaches them and the project board can match milestones against the
// reader's progress (keyed by concept id), without hard-coding either.
async function lessonIndex(slug) {
  try {
    await connectDB();
    const course = await Course.findOne({ slug }).select('_id').lean();
    if (!course) return {};
    const concepts = await Concept.find({ courseId: course._id, status: 'published' }).select('title slug').lean();
    return Object.fromEntries(concepts.map((c) => [c.title, { slug: c.slug, id: c._id.toString() }]));
  } catch {
    return {};
  }
}

export default async function ToolkitPage({ params }) {
  const { slug, tool } = await params;
  const config = getCourseConfig(slug);
  const data = config ? toolData(slug, tool) : null;
  if (!data) notFound();
  const lessons = await lessonIndex(slug);
  return (
    <CourseToolkit
      course={{ slug, title: config.name }}
      tools={toolMeta(slug)}
      active={tool}
      data={JSON.parse(JSON.stringify(data))}
      lessons={lessons}
    />
  );
}
