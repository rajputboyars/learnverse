import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Concept from '@/models/Concept';
import UserProgress from '@/models/UserProgress';
import { getOrCreateCertificate } from '@/services/certificates';
import PrintButton from '@/components/PrintButton';
import ShareButtons from '@/components/ShareButtons';
import L from '@/components/L';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Certificate' };

export default async function CertificatePage({ params }) {
  const { slug } = await params;
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">Certificate</h1>
        <p className="mt-2 text-muted"><L hi="Apna certificate dekhne ke liye login karo." en="Login to view your certificate." /></p>
        <Link href={`/login?callbackUrl=/certificate/${slug}`} className="lv-btn lv-btn-primary mt-6 inline-flex">
          Login
        </Link>
      </div>
    );
  }

  await connectDB();
  const course = await Course.findOne({ slug, status: 'published' }).lean();
  if (!course) notFound();

  const total = await Concept.countDocuments({ courseId: course._id, status: 'published' });
  const readProgress = await UserProgress.find({
    userId: session.user.id,
    courseId: course._id,
    read: true,
  })
    .select('updatedAt')
    .lean();
  const completed = readProgress.length;
  const isComplete = total > 0 && completed >= total;

  if (!isComplete) {
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">{course.icon} {course.title}</h1>
        <p className="mt-3 text-muted">
          <L hi="Certificate tab milega jab course 100% complete ho. Abhi " en="You'll get the certificate when the course is 100% complete. Currently " /><b className="text-ink">{pct}%</b> ({completed}/{total}).
        </p>
        <div className="mx-auto mt-4 h-3 max-w-xs overflow-hidden rounded-full bg-line-soft">
          <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
        </div>
        <Link href={`/courses/${slug}`} className="lv-btn lv-btn-primary mt-6 inline-flex">
          <L hi="Course continue karo" en="Continue course" />
        </Link>
      </div>
    );
  }

  const completedAt = readProgress.reduce(
    (max, p) => (p.updatedAt && p.updatedAt > max ? p.updatedAt : max),
    new Date(0)
  );
  const cert = await getOrCreateCertificate({
    userId: session.user.id,
    userName: session.user.name,
    course,
    totalConcepts: total,
    completedAt: completedAt > new Date(0) ? completedAt : new Date(),
  });
  const dateStr = new Date(cert.completedAt).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[52px]">
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Certificate card */}
        <div
          className="relative overflow-hidden rounded-3xl border-[3px] border-double border-brand p-8 text-center sm:p-12"
          style={{ background: 'linear-gradient(160deg,var(--color-brand-tint),var(--color-card))' }}
        >
          <div className="flex items-center justify-center gap-2.5 text-brand-dark">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-brand text-sm font-bold text-white">L</span>
            <span className="text-base font-bold">Learnverse</span>
          </div>
          <p className="mt-7 text-[11px] uppercase tracking-[0.28em] text-muted-soft"><L hi="Certificate of Completion" en="Certificate of Completion" /></p>
          <p className="mt-4 text-[14px] text-muted"><L hi="Ye certify karta hai ki" en="This certifies that" /></p>
          <h1 className="mt-2 text-[28px] font-bold text-ink sm:text-[34px]">{session.user.name}</h1>
          <p className="mt-3 text-[14px] text-muted"><L hi="ne successfully ye course complete kiya" en="has successfully completed the course" /></p>
          <h2 className="mt-2 text-2xl font-bold text-brand-dark">{course.icon} {course.title}</h2>
          <p className="mt-1.5 text-[13px] text-muted">{total} <L hi="concepts master kiye" en="concepts mastered" /></p>

          <div className="mt-10 flex items-end justify-between text-left text-[12.5px] text-muted">
            <div>
              <p className="font-bold text-ink-soft">{dateStr}</p>
              <p><L hi="Date" en="Date" /></p>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold text-ink-soft">{cert.certId}</p>
              <p><L hi="Certificate ID" en="Certificate ID" /></p>
            </div>
          </div>
        </div>

        {/* Share sidebar */}
        <div className="no-print">
          <h2 className="text-[19px] font-bold text-ink"><L hi="Apni achievement share karo" en="Share your achievement" /></h2>
          <p className="mt-1.5 text-[13px] text-muted"><L hi="Batao logon ko tumne kya seekha." en="Let people know what you just learned." /></p>

          <div className="mt-5"><ShareButtons title={`I completed ${course.title} on Learnverse!`} text={`I just earned my ${course.title} certificate on Learnverse 🎓`} /></div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <PrintButton />
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted-soft">
            <L hi='Tip: Print → "Save as PDF" karke download karo, ya screenshot leke LinkedIn pe share karo.' en='Tip: Print → "Save as PDF" to download, or screenshot and share on LinkedIn.' />
          </p>

          <Link href="/certificates" className="mt-5 inline-block text-[13px] font-bold text-brand">
            ← <L hi="Saare certificates" en="Back to certificates" />
          </Link>
        </div>
      </div>
    </div>
  );
}
