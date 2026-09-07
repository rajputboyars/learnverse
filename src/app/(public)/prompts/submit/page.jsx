'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import { ErrorState, LoginGate } from '@/components/ui/States';
import { extractVariables } from '@/lib/prompts/variables';

const SHELL = 'mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8';

const CATEGORIES = [
  'learning', 'programming', 'career', 'interview', 'productivity', 'research', 'analysis', 'social',
];
const PROVIDERS = [
  { id: 'any', label: 'Any provider' },
  { id: 'anthropic', label: 'Claude' },
  { id: 'openai', label: 'OpenAI' },
  { id: 'gemini', label: 'Gemini' },
];

export default function SubmitPromptPage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    category: 'learning',
    difficulty: 'beginner',
    tags: '',
    providers: ['any'],
    expectedResult: '',
    exampleOutput: '',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);

  const variables = extractVariables(form.content);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleProvider(id) {
    setForm((f) => ({
      ...f,
      providers: f.providers.includes(id)
        ? f.providers.filter((p) => p !== id)
        : [...f.providers, id],
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'Could not submit that');
      setDone({ ...body.prompt, review: body.review });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (status === 'loading') return <div className={`${SHELL} py-12`} />;
  if (status !== 'authenticated') {
    return (
      <div className={`${SHELL} py-12`}>
        <h1 className="text-3xl font-bold">Submit a prompt</h1>
        <div className="mt-6"><LoginGate message="Log in to share a prompt with the community." /></div>
      </div>
    );
  }

  if (done) {
    const rejected = done.status === 'rejected';
    return (
      <div className={`${SHELL} py-12`}>
        <div className={`rounded-2xl border p-6 ${rejected ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
          <p className={`flex items-center gap-2 text-lg font-bold ${rejected ? 'text-red-900' : 'text-green-900'}`}>
            <Icon name={rejected ? 'x-circle' : 'check-circle'} className="h-5 w-5" />
            {rejected ? 'Not accepted' : 'Submitted'}
          </p>
          <p className={`mt-2 text-sm ${rejected ? 'text-red-800' : 'text-green-800'}`}>
            {rejected ? (
              <>
                “{done.title}” did not pass the automated safety check, so it was not added to the
                queue. You can edit it and submit again.
              </>
            ) : (
              <>
                “{done.title}” is in the review queue. It gets checked for harmful content, spam and
                quality before it goes public — you will find it under <strong>My submissions</strong>
                {' '}in the library with its current status.
              </>
            )}
          </p>

          {done.review?.summary && (
            <div className="mt-3 rounded-xl border border-slate-200 bg-white/70 p-3 text-sm text-slate-700">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <Icon name="robot" className="h-3 w-3" />
                Automated check — {done.review.verdict}
              </p>
              <p className="mt-1.5">{done.review.summary}</p>
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/prompts" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              Back to the library
            </Link>
            <button
              onClick={() => {
                setDone(null);
                setForm((f) => ({ ...f, title: '', description: '', content: '', tags: '', expectedResult: '', exampleOutput: '' }));
              }}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Submit another
            </button>
          </div>
        </div>
      </div>
    );
  }

  const field = 'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400';
  const label = 'block text-sm font-medium text-slate-700';

  return (
    <div className={`${SHELL} py-10`}>
      <Link href="/prompts" className="text-sm text-slate-500 hover:text-indigo-600">
        <Icon name="arrow-left" className="mr-1 h-3 w-3" />Prompt Library
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Submit a prompt</h1>
      <p className="mt-2 text-slate-600">
        Share a prompt that genuinely helped you. Wrap anything the user should fill in with double
        braces — <code className="rounded bg-slate-100 px-1">{'{{topic}}'}</code> — and it becomes a
        form field automatically.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className={label}>Title <span className="text-red-500">*</span></label>
          <input id="title" value={form.title} onChange={(e) => set('title', e.target.value)} required minLength={6} className={field} placeholder="Explain any error message like I am new" />
        </div>

        <div>
          <label htmlFor="description" className={label}>Short description</label>
          <input id="description" value={form.description} onChange={(e) => set('description', e.target.value)} className={field} placeholder="What it does, in one line" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="category" className={label}>Category</label>
            <select id="category" value={form.category} onChange={(e) => set('category', e.target.value)} className={`${field} capitalize`}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className={label}>Complexity</label>
            <select id="difficulty" value={form.difficulty} onChange={(e) => set('difficulty', e.target.value)} className={field}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="tags" className={label}>Tags</label>
            <input id="tags" value={form.tags} onChange={(e) => set('tags', e.target.value)} className={field} placeholder="debugging, react" />
          </div>
        </div>

        <div>
          <span className={label}>Providers you have used it with</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => toggleProvider(p.id)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  form.providers.includes(p.id)
                    ? 'border-indigo-300 bg-indigo-50 font-medium text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="content" className={label}>The prompt <span className="text-red-500">*</span></label>
          <textarea
            id="content"
            rows={10}
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            required
            minLength={40}
            className={`${field} font-mono`}
            placeholder={'Explain this error to me like I am new to {{language}}:\n\n{{error}}\n\nTell me what causes it, how to fix it, and how to avoid it next time.'}
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span>{form.content.length} / 8000 characters</span>
            {variables.length > 0 && (
              <span className="text-indigo-600">
                Detected fields: {variables.map((v) => v.label).join(', ')}
              </span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="expectedResult" className={label}>What should the result look like?</label>
          <textarea id="expectedResult" rows={2} value={form.expectedResult} onChange={(e) => set('expectedResult', e.target.value)} className={field} placeholder="A plain-language cause, a fix, and one prevention tip." />
        </div>

        <div>
          <label htmlFor="exampleOutput" className={label}>Example output (optional)</label>
          <textarea id="exampleOutput" rows={4} value={form.exampleOutput} onChange={(e) => set('exampleOutput', e.target.value)} className={field} placeholder="Paste a real answer you got." />
        </div>

        {error && <ErrorState message={error} />}

        <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            <Icon name={busy ? 'spinner' : 'send'} spin={busy} className="mr-1.5 h-3.5 w-3.5" />
            {busy ? 'Submitting…' : 'Submit for review'}
          </button>
          <p className="text-sm text-slate-500">
            Submitted as {session.user.name}. Nothing goes public without review.
          </p>
        </div>
      </form>
    </div>
  );
}
