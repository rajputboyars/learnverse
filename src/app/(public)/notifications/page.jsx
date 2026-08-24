'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

const TINTS = [
  { bg: 'bg-brand-tint', ink: 'text-brand-dark' },
  { bg: 'bg-amber-tint', ink: 'text-amber-ink' },
  { bg: 'bg-violet-tint', ink: 'text-violet-ink' },
  { bg: 'bg-accent-green-tint', ink: 'text-accent-green-ink' },
];

function UpvoteIcon({ className = '' }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 6.4a1 1 0 01.75.34l6 6.86A1 1 0 0118 15.2H6a1 1 0 01-.75-1.6l6-6.86A1 1 0 0112 6.4z" />
    </svg>
  );
}

function timeAgo(date) {
  const diffMs = Date.now() - new Date(date).getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} minute${min > 1 ? 's' : ''} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr > 1 ? 's' : ''} ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return 'Yesterday';
  if (day < 7) return `${day} days ago`;
  return new Date(date).toLocaleDateString();
}

export default function NotificationsPage() {
  const { status } = useSession();
  const { pick } = useLang();
  const [items, setItems] = useState(null);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/notifications')
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => setItems([]));
  }, [status]);

  async function markAllRead() {
    setMarking(true);
    await fetch('/api/notifications', { method: 'POST' }).catch(() => {});
    setItems((prev) => prev?.map((n) => ({ ...n, read: true })) || prev);
    setMarking(false);
  }

  if (status === 'loading') return <p className="mx-auto w-full max-w-[720px] px-4 sm:px-6 lg:px-8 py-12 text-muted">Loading…</p>;

  if (status !== 'authenticated') {
    return (
      <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[52px]">
        <h1 className="text-[28px] font-bold text-ink">🔔 {pick('Notifications', 'Notifications')}</h1>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-brand-tint px-6 py-5">
          <p className="text-sm text-ink-soft">
            {pick('Sign up karo taaki jab koi tumhare comments pe reply ya upvote kare, yahan notification aaye.', 'Sign up to get notified when someone replies to or upvotes your comments.')}
          </p>
          <div className="flex gap-2">
            <Link href="/login" className="lv-btn lv-btn-ghost">Login</Link>
            <Link href="/register" className="lv-btn lv-btn-primary">Sign up free</Link>
          </div>
        </div>
      </div>
    );
  }

  const hasUnread = items?.some((n) => !n.read);

  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[52px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-ink">🔔 {pick('Notifications', 'Notifications')}</h1>
        {hasUnread && (
          <button onClick={markAllRead} disabled={marking} className="text-[13.5px] font-bold text-brand disabled:opacity-50">
            {pick('Sab read karo', 'Mark all read')}
          </button>
        )}
      </div>

      {!items ? (
        <p className="mt-4 text-muted">{pick('Loading…', 'Loading…')}</p>
      ) : items.length === 0 ? (
        <p className="mt-6 rounded-3xl border border-dashed border-line p-10 text-center text-muted">
          {pick(
            'Abhi koi notification nahi. Jab koi tumhare comment/thread pe reply ya upvote kare, yahan dikhega.',
            'No notifications yet. When someone replies to or upvotes your comment/thread, it shows up here.'
          )}
        </p>
      ) : (
        <div className="lv-card mt-6 divide-y divide-line-soft overflow-hidden">
          {items.map((n, i) => {
            const tint = TINTS[i % TINTS.length];
            return (
              <Link
                key={n._id}
                href={n.link}
                className={`flex items-start gap-3.5 px-6 py-[18px] hover:bg-brand-tint/30 ${n.read ? '' : 'bg-brand-tint-2'}`}
              >
                <span className={`h-[34px] w-[34px] shrink-0 rounded-full ${tint.bg}`} />
                <div className="min-w-0 flex-1">
                  <p className={`text-[14.5px] leading-[1.55] ${n.read ? 'text-ink-soft' : 'text-ink'}`}>
                    <b>{n.actorName}</b> {n.message}
                  </p>
                  <p className="mt-1 text-[12.5px] text-muted">{timeAgo(n.createdAt)}</p>
                </div>
                <span className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl text-base ${tint.bg} ${tint.ink}`}>
                  {n.type === 'upvote' ? <UpvoteIcon /> : '💬'}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
