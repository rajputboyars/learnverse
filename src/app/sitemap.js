import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Concept from '@/models/Concept';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap() {
  const staticRoutes = ['', '/courses', '/interview-questions', '/leaderboard'].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: path === '' ? 1 : 0.8,
    })
  );

  try {
    await connectDB();
    const [courses, concepts] = await Promise.all([
      Course.find({ status: 'published' }).select('slug updatedAt').lean(),
      Concept.find({ status: 'published' }).select('slug updatedAt').lean(),
    ]);

    const courseRoutes = courses.map((c) => ({
      url: `${SITE_URL}/courses/${c.slug}`,
      lastModified: c.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const conceptRoutes = concepts.map((c) => ({
      url: `${SITE_URL}/concepts/${c.slug}`,
      lastModified: c.updatedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.9, // concept pages are the SEO growth engine
    }));

    return [...staticRoutes, ...courseRoutes, ...conceptRoutes];
  } catch {
    return staticRoutes;
  }
}
