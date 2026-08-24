import Link from 'next/link';
import mongoose from 'mongoose';
import { auth } from '@/auth';
import { connectDB } from '@/lib/db';
import Course from '@/models/Course';
import Concept from '@/models/Concept';
import UserProgress from '@/models/UserProgress';
import { getOrCreateCertificate } from '@/services/certificates';
import L from '@/components/L';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Certificates' };

export default async function CertificatesPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[52px]">
        <h1 className="text-[28px] font-bold text-ink">🎓 <L hi="Certificates" en="Certificates" /></h1>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-brand-tint px-6 py-5">
          <p className="text-sm text-ink-soft">
            <L hi="Certificates dekhne ke liye login karo." en="Login to view your certificates." />
          </p>
          <div className="flex gap-2">
            <Link href="/login" className="lv-btn lv-btn-ghost">Login</Link>
            <Link href="/register" className="lv-btn lv-btn-primary">Sign up free</Link>
          </div>
        </div>
      </div>
    );
  }

  await connectDB();
  const userId = session.user.id;

  const [courses, conceptCounts, readCounts] = await Promise.all([
    Course.find({ status: 'published' }).sort({ order: 1 }).select('title slug icon').lean(),
    Concept.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$courseId', total: { $sum: 1 } } },
    ]),
    UserProgress.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), read: true } },
      { $group: { _id: '$courseId', completed: { $sum: 1 }, lastRead: { $max: '$updatedAt' } } },
    ]),
  ]);

  const totalByCourse = Object.fromEntries(conceptCounts.map((c) => [c._id?.toString(), c.total]));
  const progressByCourse = Object.fromEntries(readCounts.map((r) => [r._id?.toString(), r]));

  const earned = [];
  const inProgress = [];
  for (const c of courses) {
    const id = c._id.toString();
    const total = totalByCourse[id] || 0;
    const p = progressByCourse[id];
    const completed = p?.completed || 0;
    if (total > 0 && completed >= total) {
      const cert = await getOrCreateCertificate({
        userId,
        userName: session.user.name,
        course: c,
        totalConcepts: total,
        completedAt: p?.lastRead || new Date(),
      });
      earned.push({ course: c, cert });
    } else {
      inProgress.push({ course: c, total, completed, pct: total ? Math.round((completed / total) * 100) : 0 });
    }
  }

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[52px]">
      <h1 className="text-[28px] font-bold text-ink">🎓 <L hi="Certificates" en="Certificates" /></h1>
      <p className="mt-2 text-[14.5px] text-muted">
        <L hi="Course 100% complete karo aur certificate unlock karo." en="Complete a course 100% to unlock its certificate." />
      </p>

      <p className="mb-3 mt-7 text-[11.5px] font-bold uppercase tracking-wide text-muted">
        <L hi="Mile hue" en="Earned" /> · {earned.length}
      </p>
      {earned.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-line p-8 text-center text-muted">
          <L hi="Abhi tak koi certificate nahi mila." en="No certificates earned yet." />
        </p>
      ) : (
        <div className="flex flex-col gap-3.5">
          {earned.map(({ course, cert }) => (
            <Link
              key={cert.certId}
              href={`/certificate/${course.slug}`}
              className="rounded-[20px] p-0.5"
              style={{ background: 'linear-gradient(120deg,#f59e0b,var(--color-brand),var(--color-violet))' }}
            >
              <div className="flex items-center gap-[18px] rounded-[18px] bg-card px-7 py-6">
                <svg width="44" height="44" viewBox="0 0 24 24" className="shrink-0">
                  <path d="M9.1 12.9L7 21l5-2.6L17 21l-2.1-8.1-1.9.5L14.4 19l-2.4-1.3L9.6 19l1.4-6.6z" fill="#f59e0b" />
                  <circle cx="12" cy="9" r="6.5" fill="#f59e0b" />
                  <path d="M9.4 9.1l1.7 1.7 3.3-3.4 1.3 1.3-4.6 4.7-3-3z" fill="var(--color-amber-tint)" />
                </svg>
                <div className="min-w-0 flex-1">
                  <div className="text-[17px] font-bold text-ink">{course.icon} {course.title}</div>
                  <div className="mt-1 font-mono text-[12.5px] text-muted">
                    {cert.certId} · {new Date(cert.completedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <span className="shrink-0 text-sm font-bold text-amber-ink"><L hi="Certificate dekho" en="View certificate" /> →</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {inProgress.length > 0 && (
        <>
          <p className="mb-3 mt-8 text-[11.5px] font-bold uppercase tracking-wide text-muted">
            <L hi="Abhi lock hai" en="Not yet unlocked" /> · {inProgress.length}
          </p>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {inProgress.map(({ course, total, completed, pct }) => (
              <div key={course.slug} className={`lv-card p-5 ${completed === 0 ? 'opacity-70' : ''}`}>
                <div className="flex items-center gap-3.5">
                  <div className="text-[28px]">{course.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14.5px] font-semibold text-ink">{course.title}</div>
                    <div className="mt-0.5 text-xs text-muted">
                      {completed > 0 ? `${completed}/${total} concepts · ${pct}%` : <L hi="Shuru nahi kiya" en="Not started" />}
                    </div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-muted-soft">
                    <path d="M12 2a4 4 0 00-4 4v3H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 7V6a2 2 0 114 0v3h-4z" />
                  </svg>
                </div>
                {completed > 0 && (
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line-soft">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
