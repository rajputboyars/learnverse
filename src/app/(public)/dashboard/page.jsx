'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { t } = useLang();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/me/dashboard')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [status]);

  if (status === 'loading') {
    return <p className="mx-auto max-w-4xl px-4 py-12 text-slate-400">Loading…</p>;
  }

  const isGuest = status !== 'authenticated';
  const cards = data
    ? [
        { label: 'Total XP', value: data.totalXP },
        { label: 'Level', value: data.level },
        { label: 'Current streak', value: `${data.currentStreak} 🔥` },
        { label: 'Concepts done', value: data.conceptsCompleted },
      ]
    : [];

  const pct = data ? Math.min(100, Math.round((data.totalXP / data.nextLevelAt) * 100)) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {isGuest && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-indigo-200 bg-indigo-50 px-6 py-4 dark:border-indigo-800 dark:bg-indigo-950/40">
          <div>
            <p className="font-semibold text-indigo-900 dark:text-indigo-200">Track your progress</p>
            <p className="mt-0.5 text-sm text-indigo-700 dark:text-indigo-400">Sign up free to earn XP, unlock badges, and save your learning streak.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/login" className="rounded-lg border border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-700 dark:text-indigo-300">Login</Link>
            <Link href="/signup" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Sign up free</Link>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">{isGuest ? 'Dashboard' : `${t('dash.greeting')} ${session.user.name?.split(' ')[0]} 👋`}</h1>
          <p className="mt-2 text-slate-600">{isGuest ? 'Login karke apni progress dekho.' : t('dash.sub')}</p>
        </div>
        {!isGuest && (
          <Link href={`/u/${session.user.id}`} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            {t('dash.publicProfile')}
          </Link>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="mt-1 text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      {data && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Level {data.level}</span>
            <span className="text-slate-500">{data.totalXP} / {data.nextLevelAt} XP</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {/* Badges */}
      {data && data.badges && (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">🏅 Achievements</h2>
            <span className="text-sm text-slate-500">
              {data.badges.filter((b) => b.earned).length}/{data.badges.length} unlocked
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {data.badges.map((b) => (
              <div
                key={b.id}
                title={b.desc}
                className={`rounded-2xl border p-4 text-center ${
                  b.earned ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                <div className={`text-3xl ${b.earned ? '' : 'grayscale'}`}>{b.earned ? b.icon : '🔒'}</div>
                <p className="mt-2 text-sm font-semibold">{b.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificates */}
      {data && data.completedCourses && data.completedCourses.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold">🎓 Certificates</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {data.completedCourses.map((c) => (
              <Link
                key={c.slug}
                href={`/certificate/${c.slug}`}
                className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 p-4 hover:border-amber-300"
              >
                <span className="font-medium">{c.icon} {c.title}</span>
                <span className="text-sm font-semibold text-amber-700">View certificate →</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Course progress */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">Course progress</h2>
        {!data ? (
          <p className="mt-3 text-slate-400">Loading…</p>
        ) : data.courseProgress.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
            Abhi koi course start nahi kiya. <Link href="/courses" className="font-semibold text-indigo-600 underline">Explore courses</Link>
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {data.courseProgress.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="block rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-300"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c.icon} {c.title}</span>
                  <span className="text-slate-500">{c.completed}/{c.total} · {c.pct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-green-500" style={{ width: `${c.pct}%` }} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bookmarks */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">🔖 Bookmarks</h2>
        {!data ? (
          <p className="mt-3 text-slate-400">Loading…</p>
        ) : data.bookmarks.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
            Koi bookmark nahi. Kisi concept pe 🏷️ Bookmark dabao taaki yahan save ho.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
            {data.bookmarks.map((b) => (
              <Link key={b.slug} href={`/concepts/${b.slug}`} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                <span className="font-medium">{b.title}</span>
                <span className="text-xs capitalize text-slate-400">{b.difficulty}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 flex gap-3">
        <Link href="/courses" className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">
          {t('dash.keepLearning')}
        </Link>
        <Link href="/leaderboard" className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">
          {t('nav.leaderboard')}
        </Link>
        <Link href="/resume" className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">
          {t('dash.buildResume')}
        </Link>
      </div>
    </div>
  );
}
