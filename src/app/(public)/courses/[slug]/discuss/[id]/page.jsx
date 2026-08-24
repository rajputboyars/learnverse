'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

const AVATAR_TINTS = ['bg-violet-tint', 'bg-amber-tint', 'bg-accent-green-tint', 'bg-brand-tint'];

function UpvoteIcon({ className = '' }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 6.4a1 1 0 01.75.34l6 6.86A1 1 0 0118 15.2H6a1 1 0 01-.75-1.6l6-6.86A1 1 0 0112 6.4z" />
    </svg>
  );
}

function timeAgo(date) {
  const min = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return 'Yesterday';
  if (day < 30) return `${day} days ago`;
  return new Date(date).toLocaleDateString();
}

export default function ThreadPage() {
  const { slug, id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { pick } = useLang();
  const [data, setData] = useState(null);
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const res = await fetch(`/api/discussions/${id}`);
      if (!res.ok) { setData('missing'); return; }
      setData(await res.json());
    } catch {
      // Never leave the page stuck on "Loading…" if the API errors out.
      setData('missing');
    }
  }
  useEffect(() => { load(); }, [id]);

  async function vote(targetId) {
    if (!session?.user) return;
    await fetch(`/api/discussions/${targetId}/vote`, { method: 'POST' });
    load();
  }
  async function postReply(e) {
    e.preventDefault();
    if (!reply.trim()) return;
    setBusy(true);
    const res = await fetch(`/api/discussions/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: reply }),
    });
    setBusy(false);
    if (res.ok) { setReply(''); load(); }
  }
  async function remove(targetId, isThread) {
    if (!confirm(pick('Ise delete karein?', 'Delete this?'))) return;
    const res = await fetch(`/api/discussions/${targetId}`, { method: 'DELETE' });
    if (res.ok) {
      if (isThread) router.push(`/courses/${slug}/discuss`);
      else load();
    }
  }

  if (!data) return <p className="mx-auto w-full max-w-[760px] px-4 sm:px-6 lg:px-8 py-12 text-muted">Loading…</p>;
  if (data === 'missing') {
    return (
      <div className="mx-auto w-full max-w-[760px] px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-muted">{pick('Thread nahi mila ya delete ho gaya.', 'Thread not found or deleted.')}</p>
        <Link href={`/courses/${slug}/discuss`} className="mt-4 inline-block font-bold text-brand underline">
          {pick('Discussions pe wapas', 'Back to discussions')}
        </Link>
      </div>
    );
  }

  const { thread, replies, isAdmin } = data;

  return (
    <div className="mx-auto w-full max-w-[760px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Link href={`/courses/${slug}/discuss`} className="text-[13.5px] font-semibold text-muted hover:text-brand">
        ← {pick('Saari discussions', 'All discussions')}
      </Link>

      {/* Thread */}
      <div className="lv-card mt-3 px-[22px] py-5">
        <div className="flex gap-3.5">
          <button
            onClick={() => vote(thread._id)}
            className={`flex w-9 shrink-0 flex-col items-center gap-0.5 ${thread.voted ? 'text-brand' : 'text-muted hover:text-brand'}`}
          >
            <UpvoteIcon />
            <span className="text-[13px] font-bold">{thread.votes}</span>
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="h-[30px] w-[30px] shrink-0 rounded-full bg-brand-tint" />
                <span className="truncate text-sm font-bold text-ink">{thread.userName}</span>
              </div>
              <span className="shrink-0 text-xs text-muted-soft">{timeAgo(thread.createdAt)}</span>
            </div>
            <h1 className="mt-2.5 text-xl font-bold text-ink">{thread.title}</h1>
            <p className="prose-content mt-2 text-[14.5px] leading-relaxed text-ink-soft">{thread.body}</p>
            {(thread.mine || isAdmin) && (
              <button onClick={() => remove(thread._id, true)} className="mt-2.5 text-xs text-red-400 hover:text-red-600">
                {pick('Delete', 'Delete')}
              </button>
            )}
          </div>
        </div>

        {/* Replies — nested under the thread, matching the design */}
        {replies.length > 0 && (
          <div className="ml-[31px] mt-3.5 flex flex-col gap-4 border-l-2 border-line-soft pl-4">
            {replies.map((r, i) => (
              <div key={r._id}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className={`h-[26px] w-[26px] shrink-0 rounded-full ${AVATAR_TINTS[i % AVATAR_TINTS.length]}`} />
                    <span className="truncate text-[13px] font-bold text-ink">{r.userName}</span>
                  </div>
                  <span className="shrink-0 text-[11.5px] text-muted-soft">{timeAgo(r.createdAt)}</span>
                </div>
                <p className="prose-content mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{r.body}</p>
                <div className="mt-1.5 flex items-center gap-4 text-xs">
                  <button
                    onClick={() => vote(r._id)}
                    className={`inline-flex items-center gap-1 ${r.voted ? 'font-bold text-brand' : 'text-muted hover:text-brand'}`}
                  >
                    ▲ {r.votes}
                  </button>
                  {(r.mine || isAdmin) && (
                    <button onClick={() => remove(r._id, false)} className="text-red-400 hover:text-red-600">
                      {pick('Delete', 'Delete')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <h2 className="mt-7 text-[11.5px] font-bold uppercase tracking-wide text-muted">
        {replies.length} {pick('replies', 'replies')}
      </h2>

      {session?.user ? (
        <form onSubmit={postReply} className="mt-3 flex gap-2">
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={pick('Reply likho…', 'Write a reply…')}
            className="flex-1 rounded-xl border border-line bg-card px-4 py-2.5 text-ink outline-none focus:border-brand"
          />
          <button disabled={busy} className="lv-btn lv-btn-primary py-2.5 text-sm disabled:opacity-50">
            {pick('Reply', 'Reply')}
          </button>
        </form>
      ) : (
        <p className="mt-3 rounded-xl bg-line-soft px-4 py-3 text-sm text-ink-soft">
          <Link href="/login" className="font-bold text-brand underline">Login</Link>{' '}
          {pick('karke reply karo.', 'to reply.')}
        </p>
      )}
    </div>
  );
}
