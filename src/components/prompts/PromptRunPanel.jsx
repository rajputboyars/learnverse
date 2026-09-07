'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SourceBadge from '@/components/ai/SourceBadge';
import ResultActions from '@/components/ai/ResultActions';
import { ErrorState, LoginGate, SkeletonCard } from '@/components/ui/States';
import { fillVariables } from '@/lib/prompts/variables';

/**
 * Runs a library prompt. The form is generated from the {{placeholders}} in the
 * prompt body, and the filled prompt is shown before it is sent — a user should
 * be able to see exactly what will be asked on their behalf.
 */
export default function PromptRunPanel({ prompt, authed }) {
  const [values, setValues] = useState({});
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  const filled = fillVariables(prompt.content, values);

  async function run() {
    setStatus('running');
    setError('');
    try {
      const res = await fetch(`/api/prompts/${prompt.id}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'That did not work.');
      setResult(body);
      setStatus('done');
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  }

  if (!authed) return <LoginGate message="Log in to run this prompt with your AI provider." />;

  return (
    <div className="space-y-5">
      {prompt.variables.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {prompt.variables.map((v) => (
            <div key={v.name}>
              <label htmlFor={`var-${v.name}`} className="block text-sm font-medium text-slate-700">
                {v.label}
              </label>
              <input
                id={`var-${v.name}`}
                value={values[v.name] || ''}
                onChange={(e) => setValues({ ...values, [v.name]: e.target.value })}
                disabled={status === 'running'}
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400 disabled:opacity-60"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={run}
          disabled={status === 'running'}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          <Icon name={status === 'running' ? 'spinner' : 'play'} spin={status === 'running'} className="mr-1.5 h-3.5 w-3.5" />
          {status === 'running' ? 'Running…' : 'Run prompt'}
        </button>
        <button
          onClick={() => setShowPrompt((s) => !s)}
          className="text-sm text-slate-500 hover:text-indigo-600"
        >
          <Icon name="eye" className="mr-1 h-3 w-3" />
          {showPrompt ? 'Hide' : 'Preview'} what gets sent
        </button>
        <Link href="/settings/ai" className="text-sm text-slate-500 hover:text-indigo-600">
          <Icon name="plug" className="mr-1 h-3 w-3" />AI settings
        </Link>
      </div>

      {showPrompt && (
        <pre className="thin-scroll max-h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
          {filled}
        </pre>
      )}

      {status === 'running' && <SkeletonCard lines={5} />}
      {status === 'error' && <ErrorState message={error} onRetry={run} />}

      {status === 'done' && result && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <SourceBadge source={result.source} model={result.model} />
            <span className="text-xs text-slate-400">{(result.durationMs / 1000).toFixed(1)}s</span>
          </div>
          <div className="prose-content rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
            {result.text}
          </div>
          <ResultActions result={result} onRegenerate={run} />
        </div>
      )}
    </div>
  );
}
