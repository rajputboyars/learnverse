'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { ErrorState, LoginGate, SkeletonCard } from '@/components/ui/States';
import AIResultView from './AIResultView';
import PromptForm from './PromptForm';
import ResultActions from './ResultActions';
import SourceBadge from './SourceBadge';

/**
 * The one place a prompt gets run: configure → run → structured result → act.
 *
 * Opens as a dialog over whatever page launched it, so a quick action never
 * costs the user their place. Every phase has its own state: form, loading,
 * error, result.
 */
export default function PromptRunner({ template, templates = [], initialInputs = {}, authed = true, onClose }) {
  const [active, setActive] = useState(template);
  const [inputs, setInputs] = useState(initialInputs);
  const [status, setStatus] = useState('idle'); // idle | running | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Reset when the runner is pointed at a different prompt (e.g. "create a post
  // from this result").
  useEffect(() => {
    setActive(template);
    setInputs(initialInputs);
    setStatus('idle');
    setResult(null);
    setError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template?.id]);

  // Escape closes, and the page behind must not scroll under the dialog.
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  async function run(overrideInputs, overrideTemplateId) {
    setStatus('running');
    setError('');
    try {
      const res = await fetch('/api/ai/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: overrideTemplateId || active.id,
          inputs: overrideInputs || inputs,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'That did not work.');
      setResult(body);
      setStatus('done');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  // A follow-up runs the "Explain a Topic" prompt with the question plus the
  // result it came from, so the answer stays in context.
  async function askFollowUp(question) {
    const explain = templates.find((t) => t.id === 'explain-topic');
    if (!explain) return;
    setActive(explain);
    await run(
      {
        topic: question,
        depth: 'Normal',
        language: 'English',
        context: `This follows on from a "${result.title}" result. Its summary was: ${
          result.data?.summary || result.text?.slice(0, 600) || ''
        }`,
      },
      explain.id
    );
  }

  function createPostFromResult() {
    const post = templates.find((t) => t.id === 'social-post');
    if (!post) return;
    setActive(post);
    setStatus('idle');
    setInputs({
      platform: 'LinkedIn',
      topic: `What I learned from a ${result.title.toLowerCase()} analysis`,
      points: result.data?.summary || result.text?.slice(0, 500) || '',
      tone: 'Personal',
      audience: 'Other developers',
    });
    setResult(null);
  }

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm sm:p-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={active.title}
        className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div className="flex gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
              <Icon name={active.icon} className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-lg font-bold">{active.title}</h2>
              <p className="mt-0.5 text-sm text-slate-500">{active.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 thin-scroll">
          {!authed ? (
            <LoginGate message="Log in to run AI actions and keep your results." />
          ) : status === 'idle' || status === 'error' ? (
            <div className="space-y-5">
              <PromptForm template={active} values={inputs} onChange={setInputs} />
              {status === 'error' && <ErrorState message={error} onRetry={() => run()} />}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => run()}
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  <Icon name="sparkles" className="mr-1.5 h-3.5 w-3.5" />
                  {active.cta || 'Run'}
                </button>
                <Link href="/settings/ai" className="text-sm text-slate-500 hover:text-indigo-600">
                  <Icon name="plug" className="mr-1 h-3 w-3" />
                  AI connection settings
                </Link>
              </div>
            </div>
          ) : status === 'running' ? (
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-sm text-slate-500">
                <Icon name="spinner" spin className="h-4 w-4 text-indigo-500" />
                Writing the prompt, calling the model, and structuring the answer…
              </p>
              <SkeletonCard lines={2} />
              <SkeletonCard lines={4} />
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <SourceBadge source={result.source} model={result.model} />
                <button
                  onClick={() => {
                    setStatus('idle');
                    setResult(null);
                  }}
                  className="text-sm text-slate-500 hover:text-indigo-600"
                >
                  <Icon name="sliders" className="mr-1 h-3 w-3" />Change inputs
                </button>
              </div>

              {result.source === 'demo' && (
                <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  <Icon name="flask" className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    This is sample data — no AI provider is connected yet.{' '}
                    <Link href="/settings/ai" className="font-semibold underline">
                      Connect one
                    </Link>{' '}
                    to get a real analysis.
                  </span>
                </p>
              )}

              <AIResultView result={result} />

              <div className="border-t border-slate-100 pt-4">
                <ResultActions
                  result={result}
                  onRegenerate={() => run()}
                  onFollowUp={askFollowUp}
                  onCreatePost={createPostFromResult}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
