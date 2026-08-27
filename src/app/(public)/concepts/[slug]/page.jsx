import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import Topic from '@/models/Topic';
import InterviewQuestion from '@/models/InterviewQuestion';
import ConceptLayout from '@/components/concept/ConceptLayout';
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

  const [course, siblings, topics, interviewQuestions] = await Promise.all([
    Course.findById(concept.courseId).select('title slug icon').lean(),
    Concept.find({ courseId: concept.courseId, status: 'published' })
      .sort({ order: 1 })
      .select('title slug topicId')
      .lean(),
    Topic.find({ courseId: concept.courseId }).sort({ order: 1 }).select('title').lean(),
    InterviewQuestion.find({
      conceptId: concept._id,
      status: { $in: ['approved', 'published'] },
    })
      .select('question answer')
      .lean(),
  ]);

  // Course nav, grouped by topic — a flat list of 30 siblings tells the reader
  // nothing about where they are.
  const byTopic = {};
  for (const s of siblings) {
    const key = s.topicId?.toString() || 'none';
    (byTopic[key] ||= []).push({
      id: s._id.toString(),
      title: s.title,
      slug: s.slug,
    });
  }
  const nav = topics
    .map((t) => ({
      id: t._id.toString(),
      title: t.title,
      items: byTopic[t._id.toString()] || [],
    }))
    .filter((g) => g.items.length > 0);
  if (byTopic.none?.length) nav.push({ id: 'none', title: '', items: byTopic.none });

  // Position in the course, and the neighbours either side of it.
  const index = siblings.findIndex((s) => s.slug === concept.slug);
  const at = (i) =>
    i >= 0 && i < siblings.length
      ? { title: siblings[i].title, slug: siblings[i].slug }
      : null;

  return {
    concept: serialize({ ...concept, interviewQuestions }),
    course: course ? serialize(course) : null,
    nav,
    topicTitle: nav.find((g) => g.items.some((i) => i.slug === concept.slug))?.title || '',
    position: { index: index + 1, total: siblings.length },
    prev: at(index - 1),
    next: at(index + 1),
  };
}

export default async function ConceptPage({ params }) {
  const { slug } = await params;
  const data = await getData(slug).catch(() => null);
  if (!data) notFound();
  const { concept, course, nav, topicTitle, position, prev, next } = data;

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConceptLayout
        concept={concept}
        course={course}
        nav={nav}
        topicTitle={topicTitle}
        position={position}
        prev={prev}
        next={next}
      />
    </>
  );
}
