import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { connectDB } from '@/lib/db';
import ChallengeCompletion from '@/models/ChallengeCompletion';
import { CHALLENGES, getChallenge } from '@/lib/challenges';
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

  // Position in the set, and where to go once this one passes — the page used
  // to be a dead end after a green run.
  const idx = CHALLENGES.findIndex((c) => c.slug === slug);
  const nextChallenge = CHALLENGES[idx + 1] || null;

  const session = await auth();
  let completed = false;
  if (session?.user) {
    try {
      await connectDB();
      completed = !!(await ChallengeCompletion.findOne({ userId: session.user.id, slug }));
    } catch {}
  }

  return (
    <ChallengeRunner
      challenge={challenge}
      initiallyCompleted={completed}
      position={{ index: idx + 1, total: CHALLENGES.length }}
      next={nextChallenge ? { slug: nextChallenge.slug, title: nextChallenge.title, xp: nextChallenge.xp } : null}
    />
  );
}
