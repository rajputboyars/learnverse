import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Concept from '@/models/Concept';
import JahiaToolkit from '@/components/jahia/JahiaToolkit';
import { TOOLS } from '@/data/jahia/tools';

export const revalidate = 3600;

// The Jahia course's reference tools live beside the course rather than inside
// a lesson: the CND reference, the node types explorer, the debugging lab and
// the project board. Only the Jahia course has them.
const COURSE = 'jahia';

export function generateStaticParams() {
  return Object.keys(TOOLS).map((tool) => ({ slug: COURSE, tool }));
}

export async function generateMetadata({ params }) {
  const { slug, tool } = await params;
  if (slug !== COURSE || !TOOLS[tool]) return { title: 'Not found' };
  return {
    title: `${TOOLS[tool].title} — Jahia`,
    description: TOOLS[tool].description,
    alternates: { canonical: `/courses/${slug}/toolkit/${tool}` },
  };
}

// Lesson title → { slug, id }, so reference entries can link to the lesson
// that teaches them, and the project board can match phases against the
// reader's progress (which is keyed by concept id), without hard-coding either.
async function lessonIndex() {
  try {
    await connectDB();
    const course = await Course.findOne({ slug: COURSE }).select('_id').lean();
    if (!course) return {};
    const concepts = await Concept.find({ courseId: course._id, status: 'published' }).select('title slug').lean();
    return Object.fromEntries(concepts.map((c) => [c.title, { slug: c.slug, id: c._id.toString() }]));
  } catch {
    return {};
  }
}

export default async function ToolkitPage({ params }) {
  const { slug, tool } = await params;
  if (slug !== COURSE || !TOOLS[tool]) notFound();
  const lessons = await lessonIndex();
  return <JahiaToolkit tool={tool} lessons={lessons} />;
}
