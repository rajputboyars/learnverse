import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import Course from '@/models/Course';
import InterviewQuestion from '@/models/InterviewQuestion';

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim();

  if (q.length < 2) return NextResponse.json({ concepts: [], questions: [], courses: [] });

  try {
    await connectDB();
    const rx = new RegExp(escapeRegex(q), 'i');

    const [concepts, questions, courses] = await Promise.all([
      Concept.find({ status: 'published', $or: [{ title: rx }, { tags: rx }] })
        .select('title slug difficulty courseId tags')
        .limit(6)
        .lean(),
      InterviewQuestion.find({ status: { $in: ['approved', 'published'] }, question: rx })
        .select('question slug difficulty courseId')
        .limit(4)
        .lean(),
      Course.find({ status: 'published', $or: [{ title: rx }, { tags: rx }] })
        .select('title slug icon')
        .limit(3)
        .lean(),
    ]);

    // Resolve course info for concepts and questions
    const allCourseIds = [
      ...concepts.map((c) => c.courseId?.toString()),
      ...questions.map((q) => q.courseId?.toString()),
    ].filter(Boolean);

    const courseMap = {};
    if (allCourseIds.length) {
      const allCourses = await Course.find({ status: 'published' }).select('title slug icon').lean();
      for (const c of allCourses) courseMap[c._id.toString()] = c;
    }

    return NextResponse.json({
      concepts: concepts.map((c) => {
        const course = courseMap[c.courseId?.toString()];
        return {
          title: c.title,
          slug: c.slug,
          difficulty: c.difficulty,
          course: course ? { icon: course.icon, title: course.title, slug: course.slug } : null,
        };
      }),
      questions: questions.map((qn) => {
        const course = courseMap[qn.courseId?.toString()];
        return {
          question: qn.question,
          courseSlug: course?.slug || null,
          courseIcon: course?.icon || null,
        };
      }),
      courses: courses.map((c) => ({ title: c.title, slug: c.slug, icon: c.icon })),
    });
  } catch {
    return NextResponse.json({ concepts: [], questions: [], courses: [] });
  }
}
