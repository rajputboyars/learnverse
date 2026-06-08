import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import InterviewQuestion from '@/models/InterviewQuestion';
import ConceptReader from '@/components/concept/ConceptReader';

export const revalidate = 3600;

// Serialise a Mongoose lean doc so it can cross into a client component.
function serialize(doc) {
  return JSON.parse(JSON.stringify(doc));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await connectDB();
    const concept = await Concept.findOne({ slug }).lean();
    if (!concept) return { title: 'Concept not found' };
    const desc = (concept.explanation?.english || '').slice(0, 155);
    return {
      title: concept.title,
      description: desc || `Learn ${concept.title} in English and Hinglish.`,
    };
  } catch {
    return { title: 'Concept' };
  }
}

async function getData(slug) {
  await connectDB();
  const concept = await Concept.findOne({ slug, status: 'published' }).lean();
  if (!concept) return null;

  const [course, siblings, interviewQuestions] = await Promise.all([
    Course.findById(concept.courseId).select('title slug icon').lean(),
    Concept.find({ courseId: concept.courseId, status: 'published' })
      .sort({ order: 1 })
      .select('title slug')
      .lean(),
    InterviewQuestion.find({
      conceptId: concept._id,
      status: { $in: ['approved', 'published'] },
    })
      .select('question answer')
      .lean(),
  ]);

  return {
    concept: serialize({ ...concept, interviewQuestions }),
    course: course ? serialize(course) : null,
    siblings: siblings.map(serialize),
  };
}

export default async function ConceptPage({ params }) {
  const { slug } = await params;
  const data = await getData(slug).catch(() => null);
  if (!data) notFound();
  const { concept, course, siblings } = data;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* Sidebar — course structure so the reader never feels lost */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            {course && (
              <Link
                href={`/courses/${course.slug}`}
                className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
              >
                <span>{course.icon}</span> {course.title}
              </Link>
            )}
            <nav className="space-y-1 border-l border-slate-200 pl-3 text-sm">
              {siblings.map((s) => {
                const active = s.slug === concept.slug;
                return (
                  <Link
                    key={s._id}
                    href={`/concepts/${s.slug}`}
                    className={`block rounded-md px-2 py-1.5 ${
                      active
                        ? 'bg-indigo-50 font-medium text-indigo-600'
                        : 'text-slate-600 hover:text-indigo-600'
                    }`}
                  >
                    {s.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="min-w-0">
          {course && (
            <Link
              href={`/courses/${course.slug}`}
              className="mb-4 inline-block text-sm text-slate-500 hover:text-indigo-600 lg:hidden"
            >
              ← {course.title}
            </Link>
          )}
          <ConceptReader concept={concept} />
        </div>
      </div>
    </div>
  );
}
