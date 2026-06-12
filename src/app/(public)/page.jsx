import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import { getDailyConcept } from '@/lib/daily';
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

export default async function Home() {
  const [courses, daily] = await Promise.all([getCourses(), getDailyConcept()]);
  return <HomeContent courses={courses} daily={daily} />;
}
