'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '../LanguageProvider';

export default function CommentsSection({ conceptId }) {
  const { data: session } = useSession();
  const { pick } = useLang();
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
    if (!confirm(pick('Ye comment delete karein?', 'Delete this comment?'))) return;
    const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
    if (res.ok) load();
  }

  const tops = comments.filter((c) => !c.parentId).sort((a, b) => b.votes - a.votes);
  const repliesOf = (id) => comments.filter((c) => c.parentId === id);

  function Comment({ c, isReply }) {
    return (
      <div className={isReply ? 'mt-3 ml-6 border-l-2 border-line-soft pl-4' : 'lv-card p-4'}>
        <div className="flex items-center justify-between text-xs text-muted-soft">
          <span className="font-medium text-ink-soft">{c.userName}</span>
          <span>{new Date(c.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="prose-content mt-1.5 text-sm text-ink-soft">{c.body}</p>
        <div className="mt-2 flex items-center gap-4 text-xs">
          <button
            onClick={() => (session?.user ? vote(c._id) : null)}
            className={`inline-flex items-center gap-1 ${c.voted ? 'font-semibold text-brand' : 'text-muted hover:text-brand'}`}
          >
            ▲ {c.votes}
          </button>
          {!isReply && session?.user && (
            <button onClick={() => setReplyTo(replyTo === c._id ? null : c._id)} className="text-muted hover:text-brand">
              {pick('Reply', 'Reply')}
            </button>
          )}
          {(c.mine || isAdmin) && (
            <button onClick={() => remove(c._id)} className="text-red-400 hover:text-red-600">{pick('Delete', 'Delete')}</button>
          )}
        </div>

        {replyTo === c._id && (
          <div className="mt-3 flex gap-2">
            <input
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              placeholder={pick('Reply likho…', 'Write a reply…')}
              className="flex-1 rounded-lg border border-line px-3 py-1.5 text-sm text-ink outline-none focus:border-brand"
            />
            <button onClick={() => add(replyBody, c._id)} className="lv-btn lv-btn-primary py-1.5 text-sm">
              {pick('Reply', 'Reply')}
            </button>
          </div>
        )}

        {!isReply && repliesOf(c._id).map((r) => <Comment key={r._id} c={r} isReply />)}
      </div>
    );
  }

  return (
    <section className="my-8">
      <h2 className="mb-4 text-lg font-bold text-ink">💬 {pick('Community Q&A', 'Community Q&A')}</h2>

      {session?.user ? (
        <div className="mb-6 flex gap-2">
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={pick('Doubt poochho ya kuch share karo…', 'Ask a doubt or share something…')}
            className="flex-1 rounded-xl border border-line px-4 py-2.5 text-ink outline-none focus:border-brand"
            onKeyDown={(e) => e.key === 'Enter' && add(body)}
          />
          <button onClick={() => add(body)} className="lv-btn lv-btn-primary">
            {pick('Post', 'Post')}
          </button>
        </div>
      ) : (
        <p className="mb-6 rounded-xl bg-line-soft px-4 py-3 text-sm text-ink-soft">
          <Link href="/login" className="font-semibold text-brand underline">Login</Link>{' '}
          {pick('karke sawaal poochho ya discussion mein judo.', 'to ask a question or join the discussion.')}
        </p>
      )}

      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : tops.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line p-6 text-center text-muted">
          {pick('Abhi koi sawaal nahi. Pehle tum poochho! 🙌', 'No questions yet. Be the first to ask! 🙌')}
        </p>
      ) : (
        <div className="space-y-4">
          {tops.map((c) => <Comment key={c._id} c={c} />)}
        </div>
      )}
    </section>
  );
}
