'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function BookmarkButton({ conceptId }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!session?.user) return;
    fetch('/api/bookmarks')
      .then((r) => r.json())
      .then((d) => setBookmarked((d.conceptIds || []).includes(conceptId)))
      .catch(() => {});
  }, [session, conceptId]);

  async function toggle() {
    if (!session?.user) {
      router.push('/login');
      return;
    }
    setBusy(true);
    const res = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conceptId }),
    });
    const data = await res.json();
    setBusy(false);
    if (res.ok) setBookmarked(data.bookmarked);
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      title={bookmarked ? 'Remove bookmark' : 'Bookmark this concept'}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition disabled:opacity-50 ${
        bookmarked
          ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
      }`}
    >
      <span>{bookmarked ? '🔖' : '🏷️'}</span>
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}
