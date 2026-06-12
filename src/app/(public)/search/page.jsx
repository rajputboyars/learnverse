import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import InterviewQuestion from '@/models/InterviewQuestion';
import SearchView from '@/components/SearchView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Search',
  description: 'Search programming concepts and interview questions on Learnverse.',
};

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function search(q) {
  if (!q) return { concepts: [], questions: [], courseById: {} };
  try {
    await connectDB();
    const rx = new RegExp(escapeRegex(q), 'i');
    const [concepts, questions, courses] = await Promise.all([
      Concept.find({ status: 'published', $or: [{ title: rx }, { tags: rx }] })
        .select('title slug difficulty courseId')
        .limit(40)
        .lean(),
      InterviewQuestion.find({
        status: { $in: ['approved', 'published'] },
        question: rx,
      })
        .select('question difficulty courseId')
        .limit(20)
        .lean(),
      Course.find({ status: 'published' }).select('title slug icon').lean(),
    ]);
    const courseById = {};
    for (const c of courses) courseById[c._id.toString()] = c;
    return { concepts, questions, courseById };
  } catch {
    return { concepts: [], questions: [], courseById: {} };
  }
}

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const q = (sp?.q || '').trim();
  const { concepts, questions, courseById } = await search(q);

  // Serialise to plain objects with the course resolved, for the client view.
  const conceptItems = concepts.map((c) => {
    const course = courseById[c.courseId?.toString()];
    return {
      id: c._id.toString(),
      title: c.title,
      slug: c.slug,
      difficulty: c.difficulty,
      course: course ? { icon: course.icon, title: course.title, slug: course.slug } : null,
    };
  });
  const questionItems = questions.map((qn) => {
    const course = courseById[qn.courseId?.toString()];
    return {
      id: qn._id.toString(),
      question: qn.question,
      course: course ? { icon: course.icon, slug: course.slug } : null,
    };
  });

  return <SearchView q={q} concepts={conceptItems} questions={questionItems} />;
}
