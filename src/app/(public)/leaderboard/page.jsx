'use client';

import { useEffect, useState } from 'react';

export default function LeaderboardPage() {
  const [scope, setScope] = useState('weekly');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?scope=${scope}`)
      .then((r) => r.json())
      .then((d) => setRows(d.leaderboard || []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [scope]);

  const medal = ['🥇', '🥈', '🥉'];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      <p className="mt-2 text-slate-600">
        Top learners. Weekly board har Monday reset hota hai — naye log bhi compete kar sakte hain.
      </p>

      <div className="mt-6 inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm font-medium">
        {['weekly', 'all'].map((s) => (
          <button
            key={s}
            onClick={() => setScope(s)}
            className={`rounded-md px-4 py-1.5 capitalize ${
              scope === s ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
            }`}
          >
            {s === 'all' ? 'All time' : 'This week'}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        {loading ? (
          <p className="p-8 text-center text-slate-400">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-8 text-center text-slate-400">
            No XP earned yet. Padho, quiz do, top pe aao! 🚀
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {rows.map((r) => (
              <li key={r.rank} className="flex items-center justify-between px-5 py-3.5">
                <span className="flex items-center gap-3">
                  <span className="w-6 text-center font-semibold text-slate-400">
                    {medal[r.rank - 1] || r.rank}
                  </span>
                  <span className="font-medium">{r.name}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                    Lvl {r.level}
                  </span>
                </span>
                <span className="flex items-center gap-3 text-sm">
                  {r.currentStreak > 0 && (
                    <span className="text-orange-500">🔥 {r.currentStreak}</span>
                  )}
                  <span className="font-semibold text-indigo-600">{r.xp} XP</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
