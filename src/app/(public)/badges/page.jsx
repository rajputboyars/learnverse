'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

export default function BadgesPage() {
  const { status } = useSession();
  const { pick } = useLang();
  const [badges, setBadges] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/me/dashboard')
      .then((r) => r.json())
      .then((d) => setBadges(d.badges || []))
      .catch(() => setBadges([]));
  }, [status]);

  if (status === 'loading') {
    return <p className="mx-auto w-full max-w-[900px] px-4 sm:px-6 lg:px-8 py-12 text-muted">Loading…</p>;
  }

  if (status !== 'authenticated') {
    return (
      <div className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[52px]">
        <h1 className="text-[28px] font-bold text-ink">🏅 {pick('Achievements', 'Achievements')}</h1>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-brand-tint px-6 py-5">
          <p className="text-sm text-ink-soft">
            {pick('Sign up karo aur badges unlock karna shuru karo.', 'Sign up to start unlocking badges.')}
          </p>
          <div className="flex gap-2">
            <Link href="/login" className="lv-btn lv-btn-ghost">Login</Link>
            <Link href="/register" className="lv-btn lv-btn-primary">Sign up free</Link>
          </div>
        </div>
      </div>
    );
  }

  const earnedCount = badges?.filter((b) => b.earned).length ?? 0;
  const total = badges?.length ?? 0;
  const pct = total > 0 ? Math.round((earnedCount / total) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[52px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-ink">🏅 {pick('Achievements', 'Achievements')}</h1>
        {badges && (
          <span className="text-sm font-bold text-brand-dark">{earnedCount}/{total} {pick('unlock', 'unlocked')}</span>
        )}
      </div>
      <p className="mt-2 text-[14.5px] text-muted">
        {pick('Padhte, quiz dete aur streak banate hue badges unlock karo.', 'Unlock badges as you learn, quiz and build your streak.')}
      </p>

      {badges && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-line-soft">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg,var(--color-brand),var(--color-violet))' }}
          />
        </div>
      )}

      <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {!badges
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[132px] animate-pulse rounded-2xl bg-line-soft" />
            ))
          : badges.map((b) => (
              <div
                key={b.id}
                title={b.desc}
                className={`rounded-2xl px-4 py-[22px] text-center ${
                  b.earned
                    ? 'border border-brand-tint-2 bg-brand-tint'
                    : 'border border-line bg-line-soft opacity-60'
                }`}
              >
                <div className={`text-[34px] ${b.earned ? '' : 'grayscale'}`}>{b.earned ? b.icon : '🔒'}</div>
                <p className="mt-2.5 text-[13.5px] font-bold text-ink">{b.name}</p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{b.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
