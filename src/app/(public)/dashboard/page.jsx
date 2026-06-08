'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/me/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, [status]);

  if (status === 'loading') {
    return <p className="mx-auto max-w-4xl px-4 py-12 text-slate-400">Loading…</p>;
  }

  if (status !== 'authenticated') {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Your dashboard</h1>
        <p className="mt-2 text-slate-600">Login karke apni progress dekho.</p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Login
        </Link>
      </div>
    );
  }

  const cards = stats
    ? [
        { label: 'Total XP', value: stats.totalXP, icon: '⚡' },
        { label: 'Level', value: stats.level, icon: '🏆' },
        { label: 'Current streak', value: `${stats.currentStreak} 🔥`, icon: '' },
        { label: 'Concepts done', value: stats.conceptsCompleted, icon: '✅' },
      ]
    : [];

  const pct = stats
    ? Math.min(100, Math.round((stats.totalXP / stats.nextLevelAt) * 100))
    : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">
        Hi {session.user.name?.split(' ')[0]} 👋
      </h1>
      <p className="mt-2 text-slate-600">Aaj kuch naya seekha?</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="mt-1 text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      {stats && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Level {stats.level}</span>
            <span className="text-slate-500">
              {stats.totalXP} / {stats.nextLevelAt} XP
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <Link href="/courses" className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">
          Keep learning
        </Link>
        <Link href="/leaderboard" className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">
          Leaderboard
        </Link>
      </div>
    </div>
  );
}
