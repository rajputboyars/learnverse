'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

/** Turns a structured result into readable Markdown for export and sharing. */
function toMarkdown(result) {
  const lines = [`# ${result.title}`, ''];
  const inputs = Object.entries(result.inputs || {}).filter(([, v]) => v);
  if (inputs.length) {
    lines.push(...inputs.map(([k, v]) => `- **${k}**: ${v}`), '');
  }
  lines.push(
    result.data ? '```json\n' + JSON.stringify(result.data, null, 2) + '\n```' : result.text || '',
    '',
    `_${result.source === 'demo' ? 'Demo data' : `AI analysis · ${result.model}`} · generated on Learnverse_`
  );
  return lines.join('\n');
}

export default function ResultActions({ result, onFollowUp, onCreatePost, onRegenerate }) {
  const [saved, setSaved] = useState(Boolean(result.saved));
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [asking, setAsking] = useState(false);

  function flash(message) {
    setNote(message);
    setTimeout(() => setNote(''), 2000);
  }

  async function toggleSave() {
    setBusy(true);
    try {
      const res = await fetch(`/api/ai/results/${result.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saved: !saved }),
      });
      if (!res.ok) throw new Error();
      setSaved(!saved);
      flash(!saved ? 'Saved' : 'Removed from saved');
    } catch {
      flash('Could not save that');
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(toMarkdown(result));
      flash('Copied to clipboard');
    } catch {
      flash('Clipboard unavailable');
    }
  }

  function exportFile() {
    const blob = new Blob([toMarkdown(result)], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.templateId}-${new Date(result.createdAt || Date.now()).toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function submitFollowUp(e) {
    e.preventDefault();
    if (!followUp.trim() || !onFollowUp) return;
    setAsking(true);
    await onFollowUp(followUp.trim());
    setAsking(false);
    setFollowUp('');
  }

  const btn =
    'inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50';

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={toggleSave} disabled={busy} className={btn}>
          <Icon name={saved ? 'check' : 'bookmark'} className="h-3.5 w-3.5" />
          {saved ? 'Saved' : 'Save'}
        </button>
        <button onClick={copy} className={btn}>
          <Icon name="copy" className="h-3.5 w-3.5" />Copy
        </button>
        <button onClick={exportFile} className={btn}>
          <Icon name="download" className="h-3.5 w-3.5" />Export
        </button>
        {onRegenerate && (
          <button onClick={onRegenerate} className={btn}>
            <Icon name="rotate" className="h-3.5 w-3.5" />Regenerate
          </button>
        )}
        {onCreatePost && result.templateId !== 'social-post' && (
          <button
            onClick={onCreatePost}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Icon name="share" className="h-3.5 w-3.5" />Create a post from this
          </button>
        )}
        {note && <span className="text-sm text-green-700">{note}</span>}
      </div>

      {onFollowUp && (
        <form onSubmit={submitFollowUp} className="flex gap-2">
          <input
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Ask a follow-up about this result…"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />
          <button
            type="submit"
            disabled={asking || !followUp.trim()}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
          >
            <Icon name={asking ? 'spinner' : 'send'} spin={asking} className="h-3.5 w-3.5" />
          </button>
        </form>
      )}
    </div>
  );
}
