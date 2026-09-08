'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import VerificationBadge from './VerificationBadge';

const CATEGORY_ICON = {
  learning: 'book-open',
  programming: 'code',
  career: 'briefcase',
  productivity: 'bolt',
  research: 'search',
  analysis: 'chart',
  social: 'share',
  interview: 'microphone',
};

export default function PromptCard({ prompt, onSaveToggled }) {
  const [saved, setSaved] = useState(prompt.saved);
  const [busy, setBusy] = useState(false);

  async function toggleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    setBusy(true);
    try {
      const res = await fetch(`/api/prompts/${prompt.id}/save`, { method: 'POST' });
      if (!res.ok) throw new Error();
      const body = await res.json();
      setSaved(body.saved);
      onSaveToggled?.(prompt.id, body.saved);
    } catch {
      /* leave the state as it was; the next click can retry */
    } finally {
      setBusy(false);
    }
  }

  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-300"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon name={CATEGORY_ICON[prompt.category] || 'sparkles'} className="h-4 w-4" />
        </span>
        <button
          onClick={toggleSave}
          disabled={busy}
          aria-label={saved ? 'Remove from saved' : 'Save prompt'}
          className={`rounded-lg p-2 transition-colors ${saved ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-500'}`}
        >
          <Icon name="bookmark" className="h-3.5 w-3.5" />
        </button>
      </div>

      <h3 className="mt-3 font-semibold group-hover:text-indigo-600">{prompt.title}</h3>
      <p className="mt-1 flex-1 text-sm text-slate-500">{prompt.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <VerificationBadge status={prompt.status} origin={prompt.origin} />
        <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs capitalize text-slate-600">
          {prompt.difficulty}
        </span>
        {prompt.variables.length > 0 && (
          <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-600">
            {prompt.variables.length} input{prompt.variables.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span><Icon name="play" className="mr-1 h-3 w-3" />{prompt.usageCount} runs</span>
        {prompt.ratingCount > 0 && (
          <span><Icon name="star" className="mr-1 h-3 w-3 text-amber-400" />{prompt.rating} ({prompt.ratingCount})</span>
        )}
        <span className="ml-auto truncate">by {prompt.authorName}</span>
      </div>
    </Link>
  );
}
