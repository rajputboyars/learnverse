import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Concept from '@/models/Concept';
import L from '@/components/L';
import CourseCatalogClient from '@/components/CourseCatalogClient';

export const revalidate = 3600;

export const metadata = {
  title: 'All Courses',
  description: 'Browse all programming and English-speaking courses on Learnverse — JavaScript, MERN, AI and more, in English and Hinglish.',
};

const NEW_COURSE_DAYS = 30;

async function getCourses() {
  try {
    await connectDB();
    const [courses, counts] = await Promise.all([
      Course.find({ status: 'published' }).sort({ order: 1 }).lean(),
      Concept.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: '$courseId', total: { $sum: 1 } } },
      ]),
    ]);
    const conceptCountByCourse = Object.fromEntries(counts.map((c) => [c._id.toString(), c.total]));
    const newCutoff = Date.now() - NEW_COURSE_DAYS * 24 * 60 * 60 * 1000;

    return courses.map((c) => ({
      id: c._id.toString(),
      title: c.title,
      slug: c.slug,
      icon: c.icon,
      description: c.description,
      tags: c.tags || [],
      difficulty: c.difficulty,
      category: c.category,
      conceptCount: conceptCountByCourse[c._id.toString()] || 0,
      isNew: new Date(c.createdAt).getTime() > newCutoff,
    }));
  } catch {
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();
  const programming = courses.filter((c) => c.category !== 'english');
  const english = courses.filter((c) => c.category === 'english');

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
      <span className="lv-pill bg-brand-tint text-brand-dark">
        📚 {courses.length} <L hi="courses · har mahine badhte" en="courses · growing every month" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-ink lg:text-[38px]">
        <L hi="Jo master karna hai, wo chuno" en="Pick what you want to master" />
      </h1>
      <p className="mt-2.5 max-w-xl text-[15.5px] text-muted">
        <L
          hi="Har course mein analogies, code, quizzes aur interview questions hote hain — English aur Hinglish dono mein."
          en="Every course ships with analogies, code, quizzes and interview questions — in English and Hinglish."
        />
      </p>

      {courses.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-line p-10 text-center text-muted">
          <L hi="Abhi koi course nahi. " en="No courses yet. Run " /><code className="rounded bg-line-soft px-1.5">npm run seed</code><L hi=" chalao starter content ke liye." en=" to add starter content." />
        </div>
      ) : (
        <>
          <CourseCatalogClient courses={programming} />

          {/* English learning — separate section */}
          {english.length > 0 && (
            <section className="mt-14">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🗣️</span>
                <div>
                  <h2 className="text-2xl font-bold text-ink">
                    <L hi="English Learning" en="English Learning" />
                  </h2>
                  <p className="text-sm text-muted">
                    <L
                      hi="Sirf coding nahi — communication bhi. Spoken English seekho, easy Hinglish explanations ke saath."
                      en="Not just coding — communication too. Learn spoken English with easy Hinglish explanations."
                    />
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {english.map((c) => (
                  <Link
                    key={c.id}
                    href={`/courses/${c.slug}`}
                    className="group lv-card p-6 transition hover:border-brand/40"
                  >
                    <div className="text-3xl">{c.icon}</div>
                    <h3 className="mt-3 font-semibold text-ink group-hover:text-brand">{c.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{c.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
