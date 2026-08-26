import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Concept from '@/models/Concept';
import InterviewQuestion from '@/models/InterviewQuestion';
import { getDailyConcept } from '@/lib/daily';
import { CHALLENGES } from '@/lib/challenges';
import HomeContent from '@/components/HomeContent';

export const revalidate = 3600;

async function getCourses() {
  try {
    await connectDB();
    const courses = await Course.find({ status: 'published' })
      .sort({ order: 1 })
      .limit(6)
      .lean();
    // Serialise to plain objects for the client component.
    return courses.map((c) => ({
      id: c._id.toString(),
      slug: c.slug,
      icon: c.icon,
      title: c.title,
      description: c.description,
      difficulty: c.difficulty,
    }));
  } catch {
    return [];
  }
}

// Headline numbers for the hero. Real counts or nothing — never a guess.
async function getSiteStats() {
  try {
    await connectDB();
    const [concepts, questions] = await Promise.all([
      Concept.countDocuments({ status: 'published' }),
      InterviewQuestion.countDocuments({ status: { $in: ['approved', 'published'] } }),
    ]);
    return { concepts, questions, challenges: CHALLENGES.length };
  } catch {
    return null;
  }
}

// A few real questions for the interview-prep strip.
async function getQuestionPreview() {
  try {
    await connectDB();
    const rows = await InterviewQuestion.find({ status: { $in: ['approved', 'published'] } })
      .sort({ createdAt: -1 })
      .limit(4)
      .select('question difficulty courseId')
      .lean();
    if (!rows.length) return [];
    const courses = await Course.find({ _id: { $in: rows.map((r) => r.courseId) } })
      .select('title slug')
      .lean();
    const byId = {};
    for (const c of courses) byId[c._id.toString()] = c;
    return rows.map((r) => {
      const course = byId[r.courseId?.toString()];
      return {
        id: r._id.toString(),
        question: r.question,
        difficulty: r.difficulty,
        course: course ? { title: course.title, slug: course.slug } : null,
      };
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const [courses, daily, stats, questions] = await Promise.all([
    getCourses(),
    getDailyConcept(),
    getSiteStats(),
    getQuestionPreview(),
  ]);
  return <HomeContent courses={courses} daily={daily} stats={stats} questions={questions} />;
}
