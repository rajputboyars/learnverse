'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

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
    const d = await fetch(`/api/discussions?courseSlug=${slug}`).then((r) => r.json());
    setData(d);
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
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href={`/courses/${slug}`} className="text-sm text-slate-500 hover:text-indigo-600">← {pick('Course pe wapas', 'Back to course')}</Link>
      <div className="mt-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          💬 {data?.course ? `${data.course.icon} ${data.course.title}` : 'Course'} {pick('Discussion', 'Discussion')}
        </h1>
        {session?.user && (
          <button onClick={() => setShowForm((s) => !s)} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            {showForm ? pick('Cancel', 'Cancel') : pick('+ Naya thread', '+ New thread')}
          </button>
        )}
      </div>

      {!session?.user && (
        <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <Link href="/login" className="font-semibold text-indigo-600 underline">Login</Link>{' '}
          {pick('karke discussion shuru karo ya join karo.', 'to start or join a discussion.')}
        </p>
      )}

      {showForm && (
        <form onSubmit={create} className="mt-5 space-y-3 rounded-2xl border border-slate-200 p-5">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={pick('Thread title (jaise Closures kab use karein?)', 'Thread title (e.g. When to use closures?)')} className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-indigo-400" />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder={pick('Apni baat detail mein likho…', 'Write your point in detail…')} className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-indigo-400" />
          <button disabled={busy} className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
            {busy ? pick('Post ho raha hai…', 'Posting…') : pick('Thread post karo', 'Post thread')}
          </button>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {!data ? (
          <p className="text-slate-400">Loading…</p>
        ) : data.threads?.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            {pick('Abhi koi discussion nahi. Pehla thread tum shuru karo! 🙌', 'No discussions yet. Start the first thread! 🙌')}
          </p>
        ) : (
          data.threads.map((t) => (
            <Link key={t._id} href={`/courses/${slug}/discuss/${t._id}`} className="block rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-300">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold">{t.title}</h2>
                <span className="shrink-0 text-xs text-slate-400">{new Date(t.lastActivityAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{t.body}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                <span>{pick('by', 'by')} {t.userName}</span>
                <span>▲ {t.votes}</span>
                <span>💬 {t.replyCount} {pick('replies', 'replies')}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
