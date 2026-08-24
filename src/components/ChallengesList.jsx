'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';
import Icon from '@/components/Icon';

export default function ChallengesList({ challenges, done, loggedIn, total }) {
  const { pick } = useLang();
  const doneSet = new Set(done);

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="flex items-center gap-3 text-3xl font-bold"><Icon name="code" className="h-7 w-7 text-indigo-600" />{pick('Code Challenges', 'Code Challenges')}</h1>
      <p className="mt-2 text-slate-600">
        {pick('Browser mein hi code likho, tests pass karo, XP kamao. ', 'Write code right in the browser, pass the tests, earn XP. ')}
        {loggedIn
          ? `${doneSet.size}/${total} ${pick('solved.', 'solved.')}`
          : pick('Track aur XP ke liye login karo.', 'Login to track & earn XP.')}
      </p>

      <div className="mt-8 space-y-3">
        {challenges.map((c) => (
          <Link key={c.slug} href={`/challenges/${c.slug}`} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-300">
            <div className="flex items-center gap-3">
              <Icon name={doneSet.has(c.slug) ? 'check-circle' : 'circle'} className={`h-5 w-5 ${doneSet.has(c.slug) ? 'text-green-600' : 'text-slate-300'}`} />
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-xs capitalize text-slate-400">{c.difficulty} · {c.xp} XP</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-indigo-600">{pick('Solve', 'Solve')} <Icon name="arrow-right" className="h-3 w-3" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
