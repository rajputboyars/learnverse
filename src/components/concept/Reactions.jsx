'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const TYPES = [
  { key: 'helpful', emoji: '👍', label: 'Helpful' },
  { key: 'understood', emoji: '💡', label: 'Samajh aaya' },
  { key: 'fire', emoji: '🔥', label: 'Best' },
];

export default function Reactions({ conceptId }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [counts, setCounts] = useState({ helpful: 0, understood: 0, fire: 0 });
  const [mine, setMine] = useState(null);

  useEffect(() => {
    fetch(`/api/reactions?conceptId=${conceptId}`)
      .then((r) => r.json())
      .then((d) => { setCounts(d.counts || {}); setMine(d.mine || null); })
      .catch(() => {});
  }, [conceptId]);

  async function react(type) {
    if (!session?.user) { router.push('/login'); return; }
    const res = await fetch('/api/reactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conceptId, type }),
    });
    if (res.ok) {
      const d = await res.json();
      setCounts(d.counts || {});
      setMine(d.mine || null);
    }
  }

  return (
    <div className="my-8 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
      <span className="mr-1 text-sm font-medium text-slate-500">Is concept ko rate karo:</span>
      {TYPES.map((t) => (
        <button
          key={t.key}
          onClick={() => react(t.key)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
            mine === t.key
              ? 'border-indigo-300 bg-indigo-50 font-semibold text-indigo-600'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>{t.emoji}</span> {t.label}
          {counts[t.key] > 0 && <span className="text-xs text-slate-400">{counts[t.key]}</span>}
        </button>
      ))}
    </div>
  );
}
