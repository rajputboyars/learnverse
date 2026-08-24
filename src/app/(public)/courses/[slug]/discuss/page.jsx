'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

const AVATAR_TINTS = ['bg-brand-tint', 'bg-violet-tint', 'bg-amber-tint', 'bg-accent-green-tint'];

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

export default function DiscussListPage() {
  const { slug } = useParams();
  const { data: session } = useSession();
  const { pick } = useLang();
  const [data, setData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const d = await fetch(`/api/discussions?courseSlug=${slug}`).then((r) => r.json());
      setData(d);
    } catch {
      // Never leave the page stuck on "Loading…" if the API errors out.
      setData({ threads: [] });
    }
  }
  useEffect(() => { load(); }, [slug]);

  async function create(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setBusy(true);
    const res = await fetch('/api/discussions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseSlug: slug, title, body }),
    });
    setBusy(false);
    if (res.ok) { setTitle(''); setBody(''); setShowForm(false); load(); }
  }

  return (
    <div className="mx-auto w-full max-w-[760px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Link href={`/courses/${slug}`} className="text-[13.5px] font-semibold text-muted hover:text-brand">
        ← {pick('Course pe wapas', 'Back to course')}
      </Link>

      <div className="mt-3 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink">
          💬 {data?.course ? `${data.course.icon} ${data.course.title}` : ''} {pick('Community Q&A', 'Community Q&A')}
        </h1>
        {data?.threads?.length > 0 && (
          <span className="lv-pill shrink-0 bg-brand-tint text-brand-dark">
            {data.threads.length} {pick('questions', 'questions')}
          </span>
        )}
      </div>

      {/* Composer */}
      {session?.user ? (
        showForm ? (
          <form onSubmit={create} className="lv-card mt-5 space-y-3 p-5">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={pick('Thread title (jaise Closures kab use karein?)', 'Thread title (e.g. When to use closures?)')}
              className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-ink outline-none focus:border-brand"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder={pick('Apni baat detail mein likho…', 'Write your point in detail…')}
              className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-ink outline-none focus:border-brand"
            />
            <div className="flex gap-2.5">
              <button type="button" onClick={() => setShowForm(false)} className="lv-btn lv-btn-ghost py-2.5 text-sm">
                {pick('Cancel', 'Cancel')}
              </button>
              <button disabled={busy} className="lv-btn lv-btn-primary py-2.5 text-sm disabled:opacity-50">
                {busy ? pick('Post ho raha hai…', 'Posting…') : pick('Thread post karo', 'Post thread')}
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="lv-card mt-5 flex w-full items-center gap-3.5 px-5 py-4 text-left transition hover:border-brand/40"
          >
            <span className="h-10 w-10 shrink-0 rounded-full bg-brand-tint" />
            <span className="flex-1 text-[14.5px] text-muted-soft">
              {pick('Doubt poochho ya kuch share karo…', 'Ask a doubt or share something…')}
            </span>
            <span className="lv-btn lv-btn-primary shrink-0 py-2.5 text-sm">{pick('Post', 'Post')}</span>
          </button>
        )
      ) : (
        <p className="mt-5 rounded-xl bg-line-soft px-4 py-3 text-sm text-ink-soft">
          <Link href="/login" className="font-bold text-brand underline">Login</Link>{' '}
          {pick('karke discussion shuru karo ya join karo.', 'to start or join a discussion.')}
        </p>
      )}

      {/* Threads */}
      <div className="mt-6 flex flex-col gap-4">
        {!data ? (
          <p className="text-muted">Loading…</p>
        ) : data.threads?.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-line p-8 text-center text-muted">
            {pick('Abhi koi discussion nahi. Pehla thread tum shuru karo! 🙌', 'No discussions yet. Start the first thread! 🙌')}
          </p>
        ) : (
          data.threads.map((t, i) => (
            <Link
              key={t._id}
              href={`/courses/${slug}/discuss/${t._id}`}
              className="lv-card block px-[22px] py-5 transition hover:border-brand/40"
            >
              <div className="flex gap-3.5">
                {/* Vote column */}
                <div className={`flex w-9 shrink-0 flex-col items-center gap-0.5 ${t.votes > 0 ? 'text-brand' : 'text-muted'}`}>
                  <UpvoteIcon />
                  <span className="text-[13px] font-bold">{t.votes}</span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className={`h-[30px] w-[30px] shrink-0 rounded-full ${AVATAR_TINTS[i % AVATAR_TINTS.length]}`} />
                      <span className="truncate text-sm font-bold text-ink">{t.userName}</span>
                    </div>
                    <span className="shrink-0 text-xs text-muted-soft">{timeAgo(t.lastActivityAt)}</span>
                  </div>
                  <h2 className="mt-2.5 font-bold text-ink">{t.title}</h2>
                  <p className="mt-1 line-clamp-2 text-[14.5px] leading-relaxed text-ink-soft">{t.body}</p>
                  <span className="mt-2.5 inline-block text-[13px] font-bold text-brand">
                    💬 {t.replyCount} {pick('replies', 'replies')}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
