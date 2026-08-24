'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/components/LanguageProvider';

const MEDAL = ['🥇', '🥈', '🥉'];
const TINTS = ['bg-brand-tint', 'bg-accent-green-tint', 'bg-amber-tint', 'bg-violet-tint'];

function Row({ r, tintIndex, isMe }) {
  return (
    <div className={`flex items-center gap-3.5 px-[22px] py-4 ${isMe ? 'bg-brand-tint' : ''}`}>
      <span className={`w-[22px] shrink-0 text-center text-sm font-bold ${isMe ? 'text-brand-dark' : 'text-muted'}`}>
        {r.rank}
      </span>
      <span className={`h-[38px] w-[38px] shrink-0 rounded-full ${isMe ? 'bg-brand' : TINTS[tintIndex % TINTS.length]}`} />
      <div className="min-w-0 flex-1">
        <div className={`text-[14.5px] ${isMe ? 'font-bold text-brand-dark' : 'font-semibold text-ink'}`}>
          {isMe ? 'You' : r.name}
        </div>
        <span className={`mt-0.5 inline-block rounded-full px-2.5 py-0.5 text-[10.5px] ${isMe ? 'bg-card text-brand-dark' : 'bg-line-soft text-muted'}`}>
          Lvl {r.level}
        </span>
      </div>
      {r.currentStreak > 0 && (
        <span className="shrink-0 text-[12.5px] text-amber-ink">🔥 {r.currentStreak}</span>
      )}
      <span className={`shrink-0 text-sm font-bold ${isMe ? 'text-brand-dark' : 'text-brand'}`}>
        {r.xp.toLocaleString()} XP
      </span>
    </div>
  );
}

export default function LeaderboardPage() {
  const { pick } = useLang();
  const [scope, setScope] = useState('weekly');
  const [rows, setRows] = useState([]);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?scope=${scope}`)
      .then((r) => r.json())
      .then((d) => { setRows(d.leaderboard || []); setMe(d.me || null); })
      .catch(() => { setRows([]); setMe(null); })
      .finally(() => setLoading(false));
  }, [scope]);

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);
  const meInList = me && rows.some((r) => r.userId === me.userId);
  const showPinnedMe = me && !meInList && me.xp > 0;

  return (
    <div className="mx-auto w-full max-w-[680px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <h1 className="text-[28px] font-bold text-ink sm:text-[30px]">🏆 {pick('Leaderboard', 'Leaderboard')}</h1>
      <p className="mt-2 text-[14.5px] text-muted">
        {pick(
          'Top learners. Weekly board har Monday reset hota hai — naye log bhi compete kar sakte hain.',
          'Top learners. The weekly board resets every Monday — newcomers can compete too.'
        )}
      </p>

      <div className="mt-5 inline-flex gap-1 rounded-xl bg-line-soft p-1">
        {['weekly', 'all'].map((s) => (
          <button
            key={s}
            onClick={() => setScope(s)}
            className={`rounded-lg px-5 py-2 text-sm capitalize ${
              scope === s ? 'bg-card font-bold text-ink shadow-sm' : 'font-semibold text-muted'
            }`}
          >
            {s === 'all' ? pick('All time', 'All time') : pick('Is hafte', 'This week')}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-8 text-center text-muted">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 rounded-3xl border border-dashed border-line p-10 text-center text-muted">
          {pick('Abhi tak koi XP nahi. Padho, quiz do, top pe aao! 🚀', 'No XP earned yet. Learn, take quizzes, get to the top! 🚀')}
        </p>
      ) : (
        <>
          {top3.length > 0 && (
            <div
              className="mt-6 flex flex-col gap-2.5 rounded-3xl p-[22px]"
              style={{ background: 'linear-gradient(150deg,var(--color-violet),#a855f7)' }}
            >
              {top3.map((r, i) => {
                const isMe = me?.userId === r.userId;
                return (
                  <div
                    key={r.userId}
                    className="flex items-center gap-3.5 rounded-2xl px-4 py-3"
                    style={{ background: i === 0 ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.09)' }}
                  >
                    <span className="shrink-0 text-[22px]">{MEDAL[i]}</span>
                    <span className="h-[38px] w-[38px] shrink-0 rounded-full" style={{ background: `rgba(255,255,255,${isMe ? 0.6 : 0.3})` }} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[14.5px] font-bold text-white">{isMe ? 'You' : r.name}</div>
                      <div className="mt-0.5 text-xs text-violet-100">
                        Lvl {r.level}{r.currentStreak > 0 ? ` · 🔥 ${r.currentStreak}` : ''}
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-white">{r.xp.toLocaleString()} XP</span>
                  </div>
                );
              })}
            </div>
          )}

          {rest.length > 0 && (
            <div className="lv-card mt-5 divide-y divide-line-soft overflow-hidden">
              {rest.map((r, i) => (
                <Row key={r.userId} r={r} tintIndex={i} isMe={me?.userId === r.userId} />
              ))}
            </div>
          )}

          {showPinnedMe && (
            <>
              <div className="mt-3.5 text-center text-[13px] tracking-[0.2em] text-muted-soft">· · ·</div>
              <div className="lv-card mt-3.5 overflow-hidden border-2 border-brand bg-brand-tint">
                <Row r={me} tintIndex={0} isMe />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
