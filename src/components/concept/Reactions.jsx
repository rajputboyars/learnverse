'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLang } from '../LanguageProvider';

const TYPES = [
  { key: 'helpful', emoji: '👍', label: 'Helpful', hi: 'Helpful' },
  { key: 'understood', emoji: '💡', label: 'Understood', hi: 'Samajh aaya' },
  { key: 'fire', emoji: '🔥', label: 'Best', hi: 'Best' },
];

export default function Reactions({ conceptId }) {
  const { data: session } = useSession();
  const { pick } = useLang();
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
    <div className="my-6 flex flex-wrap items-center gap-2 border-t border-line pt-6">
      <span className="mr-1 text-sm font-medium text-muted">{pick('Is concept ko rate karo:', 'Rate this concept:')}</span>
      {TYPES.map((t) => (
        <button
          key={t.key}
          onClick={() => react(t.key)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
            mine === t.key
              ? 'border-brand-tint-2 bg-brand-tint font-semibold text-brand-dark'
              : 'border-line text-ink-soft hover:bg-brand-tint/40'
          }`}
        >
          <span>{t.emoji}</span> {pick(t.hi, t.label)}
          {counts[t.key] > 0 && <span className="text-xs text-muted-soft">{counts[t.key]}</span>}
        </button>
      ))}
    </div>
  );
}
