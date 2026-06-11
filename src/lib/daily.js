import { connectDB } from '@/lib/db';
import Concept from '@/models/Concept';
import Course from '@/models/Course';

// Deterministic "concept of the day" — same for everyone, rotates daily.
export async function getDailyConcept() {
  try {
    await connectDB();
    const count = await Concept.countDocuments({ status: 'published' });
    if (!count) return null;
    const day = Math.floor(Date.now() / 86_400_000);
    const index = day % count;
    const concept = await Concept.findOne({ status: 'published' })
      .sort({ _id: 1 })
      .skip(index)
      .select('title slug explanation difficulty courseId')
      .lean();
    if (!concept) return null;
    const course = await Course.findById(concept.courseId).select('title icon').lean();
    return {
      title: concept.title,
      slug: concept.slug,
      difficulty: concept.difficulty,
      hint: (concept.explanation?.english || '').slice(0, 130),
      course: course ? { title: course.title, icon: course.icon } : null,
    };
  } catch {
    return null;
  }
}
