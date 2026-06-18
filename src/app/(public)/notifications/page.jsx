'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

export default function NotificationsPage() {
  const { status } = useSession();
  const { pick } = useLang();
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/notifications')
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items || []);
        // mark all read
        fetch('/api/notifications', { method: 'POST' }).catch(() => {});
      })
      .catch(() => setItems([]));
  }, [status]);

  if (status === 'loading') return <p className="mx-auto max-w-2xl px-4 py-12 text-slate-400">Loading…</p>;

  if (status !== 'authenticated') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold">🔔 {pick('Notifications', 'Notifications')}</h1>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-indigo-200 bg-indigo-50 px-6 py-4 dark:border-indigo-800 dark:bg-indigo-950/40">
          <p className="text-sm text-indigo-800 dark:text-indigo-300">
            {pick('Sign up karo taaki jab koi tumhare comments pe reply ya upvote kare, yahan notification aaye.', 'Sign up to get notified when someone replies to or upvotes your comments.')}
          </p>
          <div className="flex gap-2">
            <Link href="/login" className="rounded-lg border border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-700 dark:text-indigo-300">Login</Link>
            <Link href="/signup" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Sign up free</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">🔔 {pick('Notifications', 'Notifications')}</h1>
      {!items ? (
        <p className="mt-4 text-slate-400">{pick('Loading…', 'Loading…')}</p>
      ) : items.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          {pick(
            'Abhi koi notification nahi. Jab koi tumhare comment/thread pe reply ya upvote kare, yahan dikhega.',
            'No notifications yet. When someone replies to or upvotes your comment/thread, it shows up here.'
          )}
        </p>
      ) : (
        <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
          {items.map((n) => (
            <Link
              key={n._id}
              href={n.link}
              className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 ${n.read ? '' : 'bg-indigo-50/40'}`}
            >
              <span className="text-lg">{n.type === 'upvote' ? '▲' : '💬'}</span>
              <div className="min-w-0">
                <p className="text-sm text-slate-700">
                  <b>{n.actorName}</b> {n.message}
                </p>
                <p className="text-xs text-slate-400">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
