'use client';

import { use, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import { ErrorState, SkeletonCard, SuccessNote } from '@/components/ui/States';
import PromptRunPanel from '@/components/prompts/PromptRunPanel';
import RatingStars from '@/components/prompts/RatingStars';
import VerificationBadge from '@/components/prompts/VerificationBadge';

const SHELL = 'mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8';

const REPORT_REASONS = [
  { id: 'harmful', label: 'Harmful or unsafe' },
  { id: 'misleading', label: 'Misleading or wrong' },
  { id: 'spam', label: 'Spam or self-promotion' },
  { id: 'low-quality', label: 'Low quality' },
  { id: 'other', label: 'Something else' },
];

export default function PromptDetailPage({ params }) {
  const { slug } = use(params);
  const { status: authStatus } = useSession();
  const [state, setState] = useState({ loading: true, error: '', prompt: null });
  const [note, setNote] = useState('');
  const [reporting, setReporting] = useState(false);

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    fetch(`/api/prompts/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('This prompt could not be found'))))
      .then((d) => setState({ loading: false, error: '', prompt: d.prompt }))
      .catch((e) => setState({ loading: false, error: e.message, prompt: null }));
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  function flash(message) {
    setNote(message);
    setTimeout(() => setNote(''), 2500);
  }

  const prompt = state.prompt;

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt.content);
      flash('Prompt copied — paste it into any AI tool.');
    } catch {
      flash('Clipboard unavailable');
    }
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: prompt.title, url });
        return;
      } catch {
        /* the user dismissed the sheet — fall through to copying */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      flash('Link copied');
    } catch {
      flash('Clipboard unavailable');
    }
  }

  async function toggleSave() {
    const res = await fetch(`/api/prompts/${prompt.id}/save`, { method: 'POST' });
    if (!res.ok) return flash('Could not save that');
    const body = await res.json();
    setState((s) => ({ ...s, prompt: { ...s.prompt, saved: body.saved } }));
    flash(body.saved ? 'Saved' : 'Removed from saved');
  }

  async function rate(value) {
    const res = await fetch(`/api/prompts/${prompt.id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
    if (!res.ok) return flash('Could not save your rating');
    const body = await res.json();
    setState((s) => ({ ...s, prompt: { ...s.prompt, ...body } }));
    flash('Thanks — rating saved.');
  }

  async function report(reason) {
    const res = await fetch(`/api/prompts/${prompt.id}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    });
    setReporting(false);
    const body = await res.json().catch(() => ({}));
    flash(body.already ? 'You already reported this one.' : 'Reported — an admin will take a look.');
  }

  if (state.loading) {
    return <div className={`${SHELL} py-12`}><SkeletonCard lines={6} /></div>;
  }
  if (state.error || !prompt) {
    return (
      <div className={`${SHELL} py-12`}>
        <ErrorState title="Prompt not found" message={state.error} onRetry={load} />
        <Link href="/prompts" className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:underline">
          ← Back to the library
        </Link>
      </div>
    );
  }

  const authed = authStatus === 'authenticated';

  return (
    <div className={`${SHELL} py-10`}>
      <Link href="/prompts" className="text-sm text-slate-500 hover:text-indigo-600">
        <Icon name="arrow-left" className="mr-1 h-3 w-3" />Prompt Library
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <VerificationBadge status={prompt.status} origin={prompt.origin} />
            <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs capitalize text-slate-600">
              {prompt.category}
            </span>
            <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs capitalize text-slate-600">
              {prompt.difficulty}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold">{prompt.title}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">{prompt.description}</p>
          <p className="mt-2 text-sm text-slate-400">
            by {prompt.authorName} · {prompt.usageCount} runs · updated{' '}
            {new Date(prompt.updatedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={copyPrompt} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
            <Icon name="copy" className="mr-1.5 h-3.5 w-3.5" />Copy
          </button>
          {authed && (
            <button onClick={toggleSave} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
              <Icon name="bookmark" className={`mr-1.5 h-3.5 w-3.5 ${prompt.saved ? 'text-indigo-600' : ''}`} />
              {prompt.saved ? 'Saved' : 'Save'}
            </button>
          )}
          <button onClick={share} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
            <Icon name="share" className="mr-1.5 h-3.5 w-3.5" />Share
          </button>
          {authed && (
            <button
              onClick={() => setReporting((r) => !r)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-50"
            >
              <Icon name="flag" className="mr-1.5 h-3.5 w-3.5" />Report
            </button>
          )}
        </div>
      </div>

      {note && <div className="mt-4"><SuccessNote>{note}</SuccessNote></div>}

      {reporting && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-medium">What is wrong with this prompt?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {REPORT_REASONS.map((r) => (
              <button
                key={r.id}
                onClick={() => report(r.id)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {prompt.status !== 'verified' && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <p className="font-semibold">
            {prompt.status === 'rejected' ? 'This submission was rejected.' : 'This prompt is still in review.'}
          </p>
          <p className="mt-1">
            {prompt.reviewNote || 'Only you and the admins can see it until it is verified.'}
          </p>
        </div>
      )}

      {/* Run */}
      <section className="mt-8">
        <h2 className="text-xl font-bold">Run it</h2>
        <p className="mt-1 text-sm text-slate-500">
          {prompt.variables.length
            ? 'Fill in the blanks — the full prompt is assembled for you.'
            : 'This prompt takes no inputs. Just run it.'}
        </p>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
          <PromptRunPanel prompt={prompt} authed={authed} />
        </div>
      </section>

      {/* The prompt itself */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">The prompt</h2>
        <pre className="thin-scroll mt-3 max-h-96 overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
          {prompt.content}
        </pre>
      </section>

      {(prompt.expectedResult || prompt.exampleOutput) && (
        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          {prompt.expectedResult && (
            <div>
              <h2 className="text-xl font-bold">What you should get</h2>
              <p className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
                {prompt.expectedResult}
              </p>
            </div>
          )}
          {prompt.exampleOutput && (
            <div>
              <h2 className="text-xl font-bold">Example output</h2>
              <pre className="thin-scroll mt-3 max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
                {prompt.exampleOutput}
              </pre>
            </div>
          )}
        </section>
      )}

      {/* Rating */}
      {prompt.status === 'verified' && (
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold">Did this prompt work for you?</h2>
          <div className="mt-3">
            <RatingStars
              value={prompt.rating}
              count={prompt.ratingCount}
              myRating={prompt.myRating}
              onRate={authed ? rate : undefined}
            />
          </div>
          {!authed && <p className="mt-2 text-sm text-slate-500">Log in to rate it.</p>}
        </section>
      )}

      {!!prompt.tags?.length && (
        <div className="mt-8 flex flex-wrap gap-1.5">
          {prompt.tags.map((t) => (
            <span key={t} className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-500">
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
