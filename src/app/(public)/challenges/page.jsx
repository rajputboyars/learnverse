import { auth } from '@/auth';
import { connectDB } from '@/lib/db';
import ChallengeCompletion from '@/models/ChallengeCompletion';
import { CHALLENGES } from '@/lib/challenges';
import ChallengesList from '@/components/ChallengesList';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Code Challenges',
  description: 'Solve JavaScript coding challenges in your browser and earn XP.',
};

export default async function ChallengesPage() {
  const session = await auth();
  let done = new Set();
  if (session?.user) {
    try {
      await connectDB();
      const rows = await ChallengeCompletion.find({ userId: session.user.id }).select('slug').lean();
      done = new Set(rows.map((r) => r.slug));
    } catch {}
  }

  const challenges = CHALLENGES.map((c) => ({
    slug: c.slug,
    title: c.title,
    difficulty: c.difficulty,
    xp: c.xp,
  }));

  return (
    <ChallengesList
      challenges={challenges}
      done={[...done]}
      loggedIn={!!session?.user}
      total={CHALLENGES.length}
    />
  );
}
