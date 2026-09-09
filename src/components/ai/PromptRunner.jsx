'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { ErrorState, LoginGate, SkeletonCard } from '@/components/ui/States';
import { useLang } from '@/components/LanguageProvider';
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
  const { pick } = useLang();
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

  const dialogRef = useRef(null);

  // Escape closes, the page behind must not scroll, and focus belongs inside
  // the dialog while it is open — otherwise Tab walks the page underneath and a
  // keyboard or screen-reader user is silently operating a page they cannot see.
  useEffect(() => {
    const opener = document.activeElement;

    function focusables() {
      return [...(dialogRef.current?.querySelectorAll(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      ) || [])].filter((el) => el.offsetParent !== null);
    }

    // Move focus in, but to the dialog itself rather than the first control, so
    // a screen reader reads the title before the form.
    dialogRef.current?.focus();

    function onKey(e) {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }
      if (e.key !== 'Tab') return;

      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      // Wrap at both ends, and pull focus back if it has escaped the dialog.
      if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      // Put the caller back where they were.
      if (opener instanceof HTMLElement) opener.focus();
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
      if (!res.ok) throw new Error(body?.error || pick('Ye kaam nahi kiya.', 'That did not work.'));
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={pick(active.titleHi || active.title, active.title)}
        tabIndex={-1}
        className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-xl outline-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div className="flex gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
              <Icon name={active.icon} className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-lg font-bold">{pick(active.titleHi || active.title, active.title)}</h2>
              <p className="mt-0.5 text-sm text-slate-500">
                {pick(active.descriptionHi || active.description, active.description)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={pick('Band karo', 'Close')}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 thin-scroll">
          {!authed ? (
            <LoginGate
              message={pick(
                'AI actions chalane aur apne results rakhne ke liye login karo.',
                'Log in to run AI actions and keep your results.'
              )}
            />
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
                  {pick(active.ctaHi || active.cta, active.cta) || pick('Chalao', 'Run')}
                </button>
                <Link href="/settings/ai" className="text-sm text-slate-500 hover:text-indigo-600">
                  <Icon name="plug" className="mr-1 h-3 w-3" />
                  {pick('AI connection settings', 'AI connection settings')}
                </Link>
              </div>
            </div>
          ) : status === 'running' ? (
            <div className="space-y-4">
              <p className="flex items-center gap-2 text-sm text-slate-500">
                <Icon name="spinner" spin className="h-4 w-4 text-indigo-500" />
                {pick(
                  'Prompt likh rahe hain, model ko call kar rahe hain, aur jawab ko structure kar rahe hain…',
                  'Writing the prompt, calling the model, and structuring the answer…'
                )}
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
                  <Icon name="sliders" className="mr-1 h-3 w-3" />
                  {pick('Inputs badlo', 'Change inputs')}
                </button>
              </div>

              {result.source === 'demo' && (
                <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  <Icon name="flask" className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {pick(
                      'Ye sample data hai — abhi koi AI provider connected nahi hai.',
                      'This is sample data — no AI provider is connected yet.'
                    )}{' '}
                    <Link href="/settings/ai" className="font-semibold underline">
                      {pick('Ek connect karo', 'Connect one')}
                    </Link>{' '}
                    {pick('taaki asli analysis mile.', 'to get a real analysis.')}
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
