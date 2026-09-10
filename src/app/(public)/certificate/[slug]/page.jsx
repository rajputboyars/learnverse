import Link from 'next/link';
import crypto from 'crypto';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Concept from '@/models/Concept';
import UserProgress from '@/models/UserProgress';
import PrintButton from '@/components/PrintButton';
import ShareButtons from '@/components/ShareButtons';
import L from '@/components/L';
import Icon from '@/components/Icon';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Certificate' };

export default async function CertificatePage({ params }) {
  const { slug } = await params;
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Certificate</h1>
        <p className="mt-2 text-slate-600"><L hi="Apna certificate dekhne ke liye login karo." en="Login to view your certificate." /></p>
        <Link href={`/login?callbackUrl=/certificate/${slug}`} className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
          Login
        </Link>
      </div>
    );
  }

  await connectDB();
  const course = await Course.findOne({ slug, status: 'published' }).lean();
  if (!course) notFound();

  // Most courses certify on "every concept read". A course can ask for more
  // through `certification.requireQuizzes`: every quiz passed as well, which is
  // how the Jahia path makes labs, the final project and the final assessment
  // count (each is a concept, the assessment's quiz must be passed).
  const cert = course.certification || null;
  const concepts = await Concept.find({ courseId: course._id, status: 'published' })
    .select('_id lesson.kind quiz.correctIndex')
    .lean();
  const total = concepts.length;
  const progress = await UserProgress.find({ userId: session.user.id, courseId: course._id })
    .select('conceptId read quizPassed updatedAt')
    .lean();
  const readProgress = progress.filter((p) => p.read);
  const readIds = new Set(readProgress.map((p) => String(p.conceptId)));
  const passedIds = new Set(progress.filter((p) => p.quizPassed).map((p) => String(p.conceptId)));
  const completed = readProgress.length;

  const withQuiz = concepts.filter((c) => c.quiz?.length);
  const quizzesPassed = withQuiz.filter((c) => passedIds.has(String(c._id))).length;
  const part = (kind) => {
    const list = concepts.filter((c) => (kind ? c.lesson?.kind === kind : !['lab', 'project', 'assessment'].includes(c.lesson?.kind)));
    return { total: list.length, done: list.filter((c) => readIds.has(String(c._id))).length };
  };
  const criteria = cert?.requireQuizzes
    ? [
        { label: 'Modules & lessons completed', ...part(null) },
        { label: 'Labs completed', ...part('lab') },
        { label: 'Quizzes passed', total: withQuiz.length, done: quizzesPassed },
        { label: 'Final project completed', ...part('project') },
        { label: 'Final assessment passed', ...part('assessment') },
      ].filter((c) => c.total > 0)
    : null;

  const isComplete = criteria
    ? total > 0 && criteria.every((c) => c.done >= c.total)
    : total > 0 && completed >= total;

  if (!isComplete) {
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="flex items-center gap-2 text-2xl font-bold"><Icon name={course.icon} brand className="h-6 w-6" />{course.title}</h1>
        <p className="mt-3 text-slate-600">
          <L hi="Certificate tab milega jab course 100% complete ho. Abhi " en="You’ll get the certificate when the course is 100% complete. Currently " /><b>{pct}%</b> ({completed}/{total}).
        </p>
        <div className="mx-auto mt-4 h-3 max-w-xs overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-indigo-600" style={{ width: `${pct}%` }} />
        </div>
        {criteria && (
          <ul className="mx-auto mt-5 flex max-w-xs flex-col gap-2 text-left text-sm">
            {criteria.map((c) => (
              <li key={c.label} className="flex items-center gap-2.5">
                <Icon name={c.done >= c.total ? 'check-circle' : 'circle'} className={`h-4 w-4 ${c.done >= c.total ? 'text-green-600' : 'text-slate-400'}`} />
                <span className="flex-1 text-slate-700">{c.label}</span>
                <span className="font-mono text-xs text-slate-500">{c.done}/{c.total}</span>
              </li>
            ))}
          </ul>
        )}
        <Link href={`/courses/${slug}`} className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
          <L hi="Course continue karo" en="Continue course" />
        </Link>
      </div>
    );
  }

  const completedAt = readProgress.reduce(
    (max, p) => (p.updatedAt && p.updatedAt > max ? p.updatedAt : max),
    new Date(0)
  );
  const dateStr = (completedAt > new Date(0) ? completedAt : new Date()).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const certId = crypto
    .createHash('sha1')
    .update(`${session.user.id}:${course._id}`)
    .digest('hex')
    .slice(0, 12)
    .toUpperCase();

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
      {/* Certificate card */}
      <div className="relative overflow-hidden rounded-2xl border-4 border-double border-indigo-300 bg-gradient-to-br from-indigo-50 to-white p-8 text-center shadow-sm sm:p-12">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative">
          <div className="flex items-center justify-center gap-2 text-indigo-600">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white">L</span>
            <span className="font-bold">Learnverse</span>
          </div>
          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-slate-400"><L hi="Certificate of Completion" en="Certificate of Completion" /></p>
          <p className="mt-6 text-slate-500"><L hi="Ye certify karta hai ki" en="This certifies that" /></p>
          <h1 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">{session.user.name}</h1>
          <p className="mt-4 text-slate-500"><L hi="ne successfully ye course complete kiya" en="has successfully completed the course" /></p>
          <h2 className="mt-2 flex items-center justify-center gap-2 text-2xl font-semibold text-indigo-700"><Icon name={course.icon} brand className="h-6 w-6" />{course.title}</h2>
          {cert?.title && (
            <p className="mt-3 text-lg font-bold text-slate-800">{cert.title}</p>
          )}
          {cert?.subtitle && <p className="text-sm font-semibold text-indigo-600">{cert.subtitle}</p>}
          {cert?.note && <p className="mt-1 text-sm text-slate-600">✓ {cert.note}</p>}
          <p className="mt-1 text-sm text-slate-500">{total} <L hi="concepts master kiye" en="concepts mastered" /></p>

          <div className="mt-10 flex items-end justify-between text-left text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">{dateStr}</p>
              <p><L hi="Date" en="Date" /></p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-slate-700">{certId}</p>
              <p><L hi="Certificate ID" en="Certificate ID" /></p>
            </div>
          </div>
        </div>
      </div>

      <div className="no-print"><ShareButtons title={`I completed ${course.title} on Learnverse!`} text={`I just earned my ${course.title} certificate on Learnverse`} /></div>

      <div className="no-print mt-2 flex flex-wrap items-center justify-center gap-3">
        <PrintButton />
        <Link href="/dashboard" className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">
          <L hi="Dashboard pe wapas" en="Back to dashboard" />
        </Link>
        <p className="w-full text-center text-xs text-slate-400">
          <L hi='Tip: Print → "Save as PDF" karke download karo, ya screenshot leke LinkedIn pe share karo.' en='Tip: Print → "Save as PDF" to download, or screenshot and share on LinkedIn.' />
        </p>
      </div>
    </div>
  );
}
