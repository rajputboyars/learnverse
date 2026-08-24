'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

export default function ThreadPage() {
  const { slug, id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { pick } = useLang();
  const [data, setData] = useState(null);
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);

  async function load() {
    const res = await fetch(`/api/discussions/${id}`);
    if (res.status === 404) { setData('missing'); return; }
    setData(await res.json());
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

  if (!data) return <p className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12 text-slate-400">Loading…</p>;
  if (data === 'missing') {
    return (
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-slate-500">{pick('Thread nahi mila ya delete ho gaya.', 'Thread not found or deleted.')}</p>
        <Link href={`/courses/${slug}/discuss`} className="mt-4 inline-block font-semibold text-indigo-600 underline">{pick('Discussions pe wapas', 'Back to discussions')}</Link>
      </div>
    );
  }

  const { thread, replies, isAdmin } = data;

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
      <Link href={`/courses/${slug}/discuss`} className="text-sm text-slate-500 hover:text-indigo-600">← {pick('Saari discussions', 'All discussions')}</Link>

      <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5">
        <h1 className="text-xl font-bold">{thread.title}</h1>
        <p className="prose-content mt-2 text-sm text-slate-700">{thread.body}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
          <span className="font-medium text-slate-600">{thread.userName}</span>
          <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
          <button onClick={() => vote(thread._id)} className={thread.voted ? 'font-semibold text-indigo-600' : 'hover:text-indigo-600'}>▲ {thread.votes}</button>
          {(thread.mine || isAdmin) && <button onClick={() => remove(thread._id, true)} className="text-red-400 hover:text-red-600">{pick('Delete', 'Delete')}</button>}
        </div>
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-400">{replies.length} {pick('replies', 'replies')}</h2>
      <div className="mt-3 space-y-3">
        {replies.map((r) => (
          <div key={r._id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="prose-content text-sm text-slate-700">{r.body}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="font-medium text-slate-600">{r.userName}</span>
              <span>{new Date(r.createdAt).toLocaleDateString()}</span>
              <button onClick={() => vote(r._id)} className={r.voted ? 'font-semibold text-indigo-600' : 'hover:text-indigo-600'}>▲ {r.votes}</button>
              {(r.mine || isAdmin) && <button onClick={() => remove(r._id, false)} className="text-red-400 hover:text-red-600">{pick('Delete', 'Delete')}</button>}
            </div>
          </div>
        ))}
      </div>

      {session?.user ? (
        <form onSubmit={postReply} className="mt-6 flex gap-2">
          <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder={pick('Reply likho…', 'Write a reply…')} className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-indigo-400" />
          <button disabled={busy} className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">{pick('Reply', 'Reply')}</button>
        </form>
      ) : (
        <p className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <Link href="/login" className="font-semibold text-indigo-600 underline">Login</Link>{' '}
          {pick('karke reply karo.', 'to reply.')}
        </p>
      )}
    </div>
  );
}
