'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function CommentsSection({ conceptId }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyBody, setReplyBody] = useState('');

  async function load() {
    setLoading(true);
    const d = await fetch(`/api/comments?conceptId=${conceptId}`).then((r) => r.json());
    setComments(d.comments || []);
    setIsAdmin(!!d.isAdmin);
    setLoading(false);
  }

  useEffect(() => { load(); }, [conceptId]);

  async function add(text, parentId = null) {
    if (!text.trim()) return;
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conceptId, body: text, parentId }),
    });
    if (res.ok) { setBody(''); setReplyBody(''); setReplyTo(null); load(); }
  }

  async function vote(id) {
    const res = await fetch(`/api/comments/${id}/vote`, { method: 'POST' });
    if (res.ok) load();
  }

  async function remove(id) {
    if (!confirm('Delete this comment?')) return;
    const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
    if (res.ok) load();
  }

  const tops = comments.filter((c) => !c.parentId).sort((a, b) => b.votes - a.votes);
  const repliesOf = (id) => comments.filter((c) => c.parentId === id);

  function Comment({ c, isReply }) {
    return (
      <div className={isReply ? 'mt-3 ml-6 border-l-2 border-slate-100 pl-4' : 'rounded-2xl border border-slate-200 bg-white p-4'}>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium text-slate-600">{c.userName}</span>
          <span>{new Date(c.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="prose-content mt-1.5 text-sm text-slate-700">{c.body}</p>
        <div className="mt-2 flex items-center gap-4 text-xs">
          <button
            onClick={() => (session?.user ? vote(c._id) : null)}
            className={`inline-flex items-center gap-1 ${c.voted ? 'font-semibold text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            ▲ {c.votes}
          </button>
          {!isReply && session?.user && (
            <button onClick={() => setReplyTo(replyTo === c._id ? null : c._id)} className="text-slate-500 hover:text-indigo-600">
              Reply
            </button>
          )}
          {(c.mine || isAdmin) && (
            <button onClick={() => remove(c._id)} className="text-red-400 hover:text-red-600">Delete</button>
          )}
        </div>

        {replyTo === c._id && (
          <div className="mt-3 flex gap-2">
            <input
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              placeholder="Write a reply…"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-indigo-400"
            />
            <button onClick={() => add(replyBody, c._id)} className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">
              Reply
            </button>
          </div>
        )}

        {!isReply && repliesOf(c._id).map((r) => <Comment key={r._id} c={r} isReply />)}
      </div>
    );
  }

  return (
    <section className="my-10">
      <h2 className="mb-4 text-lg font-semibold">💬 Community Q&amp;A</h2>

      {session?.user ? (
        <div className="mb-6 flex gap-2">
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Doubt poochho ya kuch share karo…"
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-indigo-400"
            onKeyDown={(e) => e.key === 'Enter' && add(body)}
          />
          <button onClick={() => add(body)} className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">
            Post
          </button>
        </div>
      ) : (
        <p className="mb-6 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <Link href="/login" className="font-semibold text-indigo-600 underline">Login</Link> to ask a question or join the discussion.
        </p>
      )}

      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : tops.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
          Abhi koi sawaal nahi. Pehle tum poochho! 🙌
        </p>
      ) : (
        <div className="space-y-4">
          {tops.map((c) => <Comment key={c._id} c={c} />)}
        </div>
      )}
    </section>
  );
}
