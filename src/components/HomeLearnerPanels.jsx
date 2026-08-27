'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import { useLang } from './LanguageProvider';

// The two session-dependent cards of the home cockpit: the streak panel and
// "pick up where you left off". Signed out, the streak panel becomes the
// sign-up invite and the progress card is replaced by nothing — the courses
// section below already covers "start something".
//
// Everything rendered here comes from /api/me/dashboard; no placeholder or
// sample numbers, so a brand-new account shows real zeroes.
export default function HomeLearnerPanels() {
  const { status } = useSession();
  const { t } = useLang();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    let alive = true;
    fetch('/api/me/dashboard')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive) setData(d); })
      .catch(() => {});
    return () => { alive = false; };
  }, [status]);

  const signedIn = status === 'authenticated';
  const streak = data?.currentStreak ?? 0;
  const days = Array.from({ length: 7 }, (_, i) => i < Math.min(streak, 7));
  const levelPct = data?.nextLevelAt
    ? Math.min(100, Math.round(((data.totalXP || 0) / data.nextLevelAt) * 100))
    : 0;
  const courses = data?.courseProgress?.slice(0, 4) || [];

  return (
    <>
      {/* Streak / invite — sits in the right column of the cockpit grid */}
      {signedIn ? (
        <div className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-6 text-white dark:bg-slate-950">
          <p className="text-sm font-semibold text-slate-400">{t('home.streak.title')}</p>
          <p className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tight">{streak}</span>
            <span className="text-slate-400">{t('home.streak.days')}</span>
            <span className="ml-auto text-sm text-slate-400">
              {(data?.weeklyXP ?? 0).toLocaleString()} {t('home.streak.xp')}
            </span>
          </p>
          <div className="flex gap-1.5">
            {days.map((on, i) => (
              <span
                key={i}
                className={`h-8 flex-1 rounded-lg ${on ? 'bg-indigo-600' : 'bg-slate-800 dark:bg-slate-800'}`}
              />
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <p className="flex justify-between text-xs text-slate-400">
              <span>Level {data?.level ?? 1}</span>
              <span>{(data?.totalXP ?? 0).toLocaleString()} / {(data?.nextLevelAt ?? 0).toLocaleString()} XP</span>
            </p>
            <span className="block h-2 overflow-hidden rounded-full bg-slate-800">
              <span className="block h-2 rounded-full bg-indigo-600" style={{ width: `${levelPct}%` }} />
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 rounded-2xl bg-slate-900 p-6 text-white dark:bg-slate-950">
          <Icon name="fire" className="h-7 w-7 text-amber-400" />
          <p className="text-lg font-bold">{t('home.join.title')}</p>
          <p className="text-sm text-slate-400">{t('home.join.sub')}</p>
          <Link
            href="/register"
            className="mt-auto w-fit rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {t('home.join.cta')}
          </Link>
        </div>
      )}

      {/* Continue — only worth a card once there is progress to continue */}
      {signedIn && (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:col-span-2">
          <div className="flex items-center">
            <h2 className="font-bold">{t('home.continue.title')}</h2>
            <Link href="/courses" className="ml-auto text-sm font-semibold text-indigo-600 hover:underline">
              {t('home.continue.all')} <Icon name="arrow-right" className="h-3 w-3" />
            </Link>
          </div>

          {courses.length === 0 ? (
            <p className="text-sm text-slate-500">{t('home.continue.empty')}</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {courses.map((c) => (
                <Link
                  key={c.slug}
                  href={`/courses/${c.slug}`}
                  className="flex flex-col gap-2.5 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon name={c.icon} brand className="h-5 w-5" />
                    <span className="font-semibold">{c.title}</span>
                    <span className="ml-auto text-xs text-slate-400">{c.pct}%</span>
                  </span>
                  <span className="block h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <span className="block h-1.5 rounded-full bg-indigo-600" style={{ width: `${c.pct}%` }} />
                  </span>
                  <span className="text-xs text-slate-500">{c.completed} / {c.total}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
