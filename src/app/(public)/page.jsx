import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import { getDailyConcept } from '@/lib/daily';
import ContinueLearning from '@/components/ContinueLearning';

export const revalidate = 3600;

async function getCourses() {
  try {
    await connectDB();
    return await Course.find({ status: 'published' })
      .sort({ order: 1 })
      .limit(6)
      .lean();
  } catch {
    return [];
  }
}

const FEATURES = [
  {
    icon: '🇮🇳',
    title: 'English + Hinglish',
    desc: 'Har concept do languages mein — jaise dost samjha raha ho.',
  },
  {
    icon: '🪔',
    title: 'Daily-life examples',
    desc: '"Closure samjho jaise dabbawala tiffin system." Desi analogies jo yaad rahti hain.',
  },
  {
    icon: '💼',
    title: 'Concept → Interview bridge',
    desc: 'Har concept ke saath — ye interview mein kaise poochha jaata hai.',
  },
  {
    icon: '🧠',
    title: 'Quick quizzes + XP',
    desc: 'Padho, quiz do, XP lo, streak banao. Retention ke liye.',
  },
];

// Interactive features available across the platform.
const FEATURE_HIGHLIGHTS = [
  { icon: '🧠', title: 'Practice Quiz', desc: 'Har course ka timed quiz — khud ko test karo, score + retry.', href: '/courses' },
  { icon: '🎤', title: 'Mock Interview', desc: 'Course ke interview questions flip-card se practice karo.', href: '/courses' },
  { icon: '💬', title: 'Discussion Board', desc: 'Har course pe doubts discuss karo, community se seekho.', href: '/courses' },
  { icon: '💻', title: 'Code Playground', desc: 'Concept page pe code browser mein hi run karo.', href: '/courses' },
  { icon: '💪', title: 'Code Challenges', desc: 'Coding challenges solve karke XP kamao.', href: '/challenges' },
  { icon: '💼', title: 'Interview Questions', desc: 'EN + Hinglish answers, course aur level se filter.', href: '/interview-questions' },
  { icon: '🔁', title: 'Spaced Revision', desc: 'Seekha hua flashcards se revise — yaad rakho.', href: '/revise' },
  { icon: '🔥', title: 'XP, Streaks & Leaderboard', desc: 'Gamified learning — top rank ke liye compete karo.', href: '/leaderboard' },
  { icon: '🏅', title: 'Badges & Certificates', desc: 'Achievements unlock karo, certificate LinkedIn pe share karo.', href: '/dashboard' },
  { icon: '🗺️', title: 'Roadmaps', desc: 'Structured learning paths — kya, kis order mein padhna hai.', href: '/roadmaps' },
];

export default async function Home() {
  const [courses, daily] = await Promise.all([getCourses(), getDailyConcept()]);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 text-center sm:pt-24">
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
          Bharat ke developers ke liye 🇮🇳
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Concepts seekho{' '}
          <span className="text-indigo-600">easiest way</span> mein
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Programming concepts in English + Hinglish, daily-life examples ke
          saath, code, quizzes aur interview questions. Boring docs nahi — engaging
          learning.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/courses"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Explore courses
          </Link>
          <Link
            href="/interview-questions"
            className="rounded-lg border border-slate-200 px-6 py-3 font-semibold hover:bg-slate-50"
          >
            Interview questions
          </Link>
        </div>
      </section>

      {/* Continue learning (logged-in users) */}
      <ContinueLearning />

      {/* Concept of the Day */}
      {daily && (
        <section className="mx-auto max-w-6xl px-4 py-4">
          <Link
            href={`/concepts/${daily.slug}`}
            className="group block rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 transition hover:border-indigo-300"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
              🎯 Concept of the Day
            </div>
            <h2 className="mt-2 text-xl font-bold group-hover:text-indigo-600">{daily.title}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">{daily.hint}…</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              {daily.course && <span>{daily.course.icon} {daily.course.title}</span>}
              <span className="capitalize">· {daily.difficulty}</span>
              <span className="ml-auto font-semibold text-indigo-600">Aaj seekho →</span>
            </div>
          </Link>
        </section>
      )}

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Everything you get — interactive features showcase */}
      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Sirf padhna nahi — pura learning toolkit 🚀</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Har course ke andar interactive features — practice karo, code chalao,
              doubts poocho, aur progress track karo. Sab ek hi jagah.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_HIGHLIGHTS.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-sm"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-2xl">{f.icon}</span>
                <div>
                  <h3 className="font-semibold group-hover:text-indigo-600">{f.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Career toolkit — Resume Builder + Certificates */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="text-center">
          <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            Naukri-ready bano 💼
          </span>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Seekho, prove karo, job pao</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Sirf concepts nahi — course complete karke certificate kamao aur
            apna professional resume yahin bana ke PDF download karo.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* Resume Builder */}
          <div className="group flex flex-col overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-8 transition hover:border-indigo-300 hover:shadow-sm">
            <div className="text-4xl">📄</div>
            <h3 className="mt-4 text-xl font-bold">Resume Builder</h3>
            <p className="mt-2 text-sm text-slate-600">
              Live preview ke saath professional resume banao — experience, projects,
              skills sab add karo. Skills seedhe apne completed courses se import karo,
              theme choose karo, aur ek click mein PDF download.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
              <li>✓ Live A4 preview, 3 colour themes</li>
              <li>✓ Courses se skills auto-import</li>
              <li>✓ Print → Save as PDF</li>
            </ul>
            <Link
              href="/resume"
              className="mt-6 inline-block w-fit rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Build your resume →
            </Link>
          </div>

          {/* Certificates */}
          <div className="group flex flex-col overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 transition hover:border-amber-300 hover:shadow-sm">
            <div className="text-4xl">🎓</div>
            <h3 className="mt-4 text-xl font-bold">Certificates</h3>
            <p className="mt-2 text-sm text-slate-600">
              Koi bhi course 100% complete karo aur ek shareable Certificate of
              Completion pao — unique certificate ID ke saath. Download karo ya
              LinkedIn pe share karke apni learning dikhao.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
              <li>✓ Course complete pe auto-unlock</li>
              <li>✓ Unique verifiable certificate ID</li>
              <li>✓ Download / LinkedIn pe share</li>
            </ul>
            <Link
              href="/courses"
              className="mt-6 inline-block w-fit rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
            >
              Earn a certificate →
            </Link>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular courses</h2>
          <Link href="/courses" className="text-sm font-medium text-indigo-600 hover:underline">
            View all →
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            <p>No courses yet. Run the seed script to add starter content:</p>
            <code className="mt-2 inline-block rounded bg-slate-100 px-2 py-1 text-sm">
              npm run seed
            </code>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Link
                key={c._id.toString()}
                href={`/courses/${c.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-sm"
              >
                <div className="text-3xl">{c.icon}</div>
                <h3 className="mt-3 font-semibold group-hover:text-indigo-600">
                  {c.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {c.description}
                </p>
                <span className="mt-3 inline-block text-xs font-medium capitalize text-slate-400">
                  {c.difficulty}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
