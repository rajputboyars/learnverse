'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { useLang } from './LanguageProvider';

// Weekly board, top three plus the caller's own row. Public — the board is
// readable signed out, `me` just comes back null.
export default function HomeWeeklyRank() {
  const { t } = useLang();
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/leaderboard?scope=weekly')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive) setData(d); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const top = data?.leaderboard?.slice(0, 3) || [];
  const me = data?.me;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center">
        <h2 className="font-bold">{t('home.rank.title')}</h2>
        <span className="ml-auto text-xs text-slate-400">{t('home.rank.resets')}</span>
      </div>

      {top.length === 0 ? (
        <p className="text-sm text-slate-500">{t('home.rank.empty')}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {top.map((r) => (
            <p key={r.rank} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm">
              <span className="w-5 font-semibold text-slate-400">{String(r.rank).padStart(2, '0')}</span>
              <span className="flex-1 truncate">{r.name}</span>
              <span className="text-slate-500">{r.xp.toLocaleString()}</span>
            </p>
          ))}
          {me && me.rank && (
            <p className="flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold">
              <span className="w-5 text-indigo-600">{String(me.rank).padStart(2, '0')}</span>
              <span className="flex-1 truncate">{t('home.rank.you')}</span>
              <span className="text-indigo-600">{me.xp.toLocaleString()}</span>
            </p>
          )}
        </div>
      )}

      <Link
        href="/leaderboard"
        className="mt-auto border-t border-slate-100 pt-3 text-sm font-semibold text-indigo-600 hover:underline"
      >
        <Icon name="medal" className="mr-1.5 h-3.5 w-3.5" />
        {t('nav.leaderboard')}
      </Link>
    </div>
  );
}
