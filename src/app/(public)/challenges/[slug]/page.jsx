import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { connectDB } from '@/lib/db';
import ChallengeCompletion from '@/models/ChallengeCompletion';
import { getChallenge } from '@/lib/challenges';
import ChallengeRunner from '@/components/ChallengeRunner';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getChallenge(slug);
  return { title: c ? `${c.title} — Challenge` : 'Challenge' };
}

export default async function ChallengePage({ params }) {
  const { slug } = await params;
  const challenge = getChallenge(slug);
  if (!challenge) notFound();

  const session = await auth();
  let completed = false;
  if (session?.user) {
    try {
      await connectDB();
      completed = !!(await ChallengeCompletion.findOne({ userId: session.user.id, slug }));
    } catch {}
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/challenges" className="text-sm text-slate-500 hover:text-indigo-600">← All challenges</Link>
      <h1 className="mt-3 text-2xl font-bold">
        {challenge.title} <span className="text-sm font-normal capitalize text-slate-400">· {challenge.difficulty}</span>
      </h1>
      <div className="mt-6">
        <ChallengeRunner challenge={challenge} initiallyCompleted={completed} />
      </div>
    </div>
  );
}
