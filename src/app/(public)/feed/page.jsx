'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import LearningFeed from '@/components/feed/LearningFeed';

const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

export default function FeedPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/me/dashboard')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStats(d))
      .catch(() => {});
  }, [status]);

  return (
    <div className="bg-slate-50">
      <div className={`${SHELL} py-8`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          {/* The feed itself, on the left where the eye starts. */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold">Your feed</h1>
                <p className="mt-1 text-sm text-slate-600">
                  One idea per card, a question to try, and something to do next. Scroll as long as
                  you like — it ends.
                </p>
              </div>
              <Link
                href="/swipe"
                className="shrink-0 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 hover:border-indigo-300"
              >
                <Icon name="layers" className="mr-1.5 h-3 w-3" />Swipe cards
              </Link>
            </div>
            <div className="mt-6">
              <LearningFeed />
            </div>
          </div>

          {/* A quiet rail: your own numbers, not other people's. */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              {status === 'authenticated' ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="font-semibold">{session.user.name?.split(' ')[0]}</p>
                  {stats ? (
                    <>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-xl font-bold">{stats.currentStreak}</p>
                          <p className="text-xs text-slate-500">day streak</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-xl font-bold">{stats.conceptsCompleted}</p>
                          <p className="text-xs text-slate-500">concepts</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Level {stats.level}</span>
                          <span>{stats.totalXP} / {stats.nextLevelAt} XP</span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-indigo-600"
                            style={{ width: `${Math.min(100, (stats.totalXP / stats.nextLevelAt) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-slate-400">Loading your progress…</p>
                  )}
                  <Link href="/analytics" className="mt-4 block text-sm font-semibold text-indigo-600 hover:underline">
                    See your analytics <Icon name="arrow-right" className="h-3 w-3" />
                  </Link>
                </div>
              ) : (
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
                  <p className="font-semibold text-indigo-900">Track what you learn</p>
                  <p className="mt-1 text-sm text-indigo-800">
                    Answer questions here without an account. Sign up to keep the XP, the streak and
                    the progress.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Link href="/register" className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">
                      Sign up free
                    </Link>
                    <Link href="/login" className="rounded-lg border border-indigo-300 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100">
                      Login
                    </Link>
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold">Jump somewhere</p>
                <div className="mt-3 space-y-2 text-sm">
                  {[
                    { href: '/ai', icon: 'sparkles', label: 'AI quick actions' },
                    { href: '/prompts', icon: 'book-open', label: 'Prompt library' },
                    { href: '/create', icon: 'share', label: 'Create a post' },
                    { href: '/cards', icon: 'medal', label: 'Share cards' },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600">
                      <Icon name={l.icon} className="h-3.5 w-3.5" />
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
