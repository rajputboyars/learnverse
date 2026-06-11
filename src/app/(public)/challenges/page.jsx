import Link from 'next/link';
import { auth } from '@/auth';
import { connectDB } from '@/lib/db';
import ChallengeCompletion from '@/models/ChallengeCompletion';
import { CHALLENGES } from '@/lib/challenges';

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">💻 Code Challenges</h1>
      <p className="mt-2 text-slate-600">
        Browser mein hi code likho, tests pass karo, XP kamao. {session?.user ? `${done.size}/${CHALLENGES.length} solved.` : 'Login to track & earn XP.'}
      </p>

      <div className="mt-8 space-y-3">
        {CHALLENGES.map((c) => (
          <Link key={c.slug} href={`/challenges/${c.slug}`} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-300">
            <div className="flex items-center gap-3">
              <span className="text-xl">{done.has(c.slug) ? '✅' : '⚪'}</span>
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-xs capitalize text-slate-400">{c.difficulty} · {c.xp} XP</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-indigo-600">Solve →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
