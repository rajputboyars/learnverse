import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import InterviewQuestion from '@/models/InterviewQuestion';
import ConceptReader from '@/components/concept/ConceptReader';
import ConceptOutline from '@/components/concept/ConceptOutline';
import ConceptRightRail from '@/components/concept/ConceptRightRail';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

// Serialise a Mongoose lean doc so it can cross into a client component.
function serialize(doc) {
  return JSON.parse(JSON.stringify(doc));
}

// Pre-render every published concept at build time (SEO + speed).
export async function generateStaticParams() {
  try {
    await connectDB();
    const concepts = await Concept.find({ status: 'published' }).select('slug').lean();
    return concepts.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await connectDB();
    const concept = await Concept.findOne({ slug }).lean();
    if (!concept) return { title: 'Concept not found' };
    const desc =
      (concept.explanation?.english || '').slice(0, 155) ||
      `Learn ${concept.title} in English and Hinglish with examples, code and a quiz.`;
    const url = `${SITE_URL}/concepts/${slug}`;
    return {
      title: concept.title,
      description: desc,
      keywords: [concept.title, ...(concept.tags || []), 'hinglish', 'interview'],
      alternates: { canonical: `/concepts/${slug}` },
      openGraph: {
        type: 'article',
        title: concept.title,
        description: desc,
        url,
      },
      twitter: { card: 'summary_large_image', title: concept.title, description: desc },
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

  const index = siblings.findIndex((s) => s.slug === concept.slug);
  const prevSibling = index > 0 ? siblings[index - 1] : null;
  const nextSibling = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  // Structured data: the article + (if any) an FAQ from interview questions.
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: concept.title,
      description: (concept.explanation?.english || '').slice(0, 200),
      url: `${SITE_URL}/concepts/${concept.slug}`,
      inLanguage: ['en', 'hi'],
      educationalLevel: concept.difficulty,
      isPartOf: course
        ? { '@type': 'Course', name: course.title, url: `${SITE_URL}/courses/${course.slug}` }
        : undefined,
    },
  ];
  if (concept.interviewQuestions?.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: concept.interviewQuestions.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: q.answer?.english || '' },
      })),
    });
  }

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {course && (
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-muted">
          <Link href="/courses" className="hover:text-brand">Courses</Link>
          <span>›</span>
          <Link href={`/courses/${course.slug}`} className="hover:text-brand">{course.title}</Link>
          <span>›</span>
          <span className="text-ink">{concept.title}</span>
        </div>
      )}

      <div className="mt-5 grid gap-7 lg:grid-cols-[240px_1fr_280px] lg:items-start lg:gap-7">
        {/* Outline — course structure so the reader never feels lost */}
        {course && (
          <ConceptOutline course={course} siblings={siblings} currentSlug={concept.slug} />
        )}

        <div className="min-w-0">
          <ConceptReader concept={concept} course={course} />

          <div className="mt-8 flex items-center justify-between gap-3">
            {prevSibling ? (
              <Link href={`/concepts/${prevSibling.slug}`} className="lv-btn lv-btn-ghost">
                ← {prevSibling.title}
              </Link>
            ) : <span />}
            {nextSibling ? (
              <Link href={`/concepts/${nextSibling.slug}`} className="lv-btn lv-btn-primary">
                {nextSibling.title} →
              </Link>
            ) : <span />}
          </div>
        </div>

        {course && (
          <ConceptRightRail courseId={course._id} totalConcepts={siblings.length} conceptId={concept._id} />
        )}
      </div>
    </div>
  );
}
