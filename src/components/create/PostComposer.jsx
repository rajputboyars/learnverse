'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SourceBadge from '@/components/ai/SourceBadge';
import { useLang } from '@/components/LanguageProvider';
import { ErrorState, SkeletonCard, SuccessNote } from '@/components/ui/States';

const PLATFORMS = [
  { id: 'LinkedIn', key: 'linkedin', icon: 'linkedin', hi: 'Professional, structured, aakhir mein ek sawaal.', en: 'Professional, structured, a question at the end.' },
  { id: 'Instagram', key: 'instagram', icon: 'palette', hi: 'Caption aur ek carousel, slide dar slide.', en: 'Caption plus a carousel, slide by slide.' },
  { id: 'X / Twitter', key: 'x', icon: 'twitter', hi: 'Ek post, ya ek chhota thread.', en: 'One post, or a short thread.' },
  { id: 'Reddit', key: 'reddit', icon: 'comments', hi: 'Ek insaan poochh raha ya share kar raha hai, marketing nahi.', en: 'A person asking or sharing, not marketing.' },
];

const TONES = ['Professional', 'Personal', 'Storytelling', 'Technical', 'Short and punchy', 'Achievement'];

/**
 * The post composer.
 *
 * Everything it offers as a starting point comes from something the user
 * actually did — a completed course, a real streak, an analysis they ran — or
 * from a topic they typed themselves. The generated text is always editable
 * before it goes anywhere, and Learnverse never posts on anyone's behalf: the
 * user copies it and publishes it themselves.
 */
export default function PostComposer({ initial }) {
  const { pick } = useLang();
  const [platform, setPlatform] = useState(initial?.platform || 'LinkedIn');
  const [tone, setTone] = useState('Personal');
  const [topic, setTopic] = useState(initial?.topic || '');
  const [points, setPoints] = useState(initial?.points || '');
  const [audience, setAudience] = useState('Other developers');

  const [seeds, setSeeds] = useState(null);
  const [seedsError, setSeedsError] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  // Draft state, so the user's edits survive a regenerate-and-undo.
  const [text, setText] = useState('');
  const [savedId, setSavedId] = useState(null);

  useEffect(() => {
    fetch('/api/me/achievements')
      .then((r) =>
        r.ok
          ? r.json()
          : Promise.reject(
              new Error(pick('Tumhare milestones load nahi ho paaye', 'Could not load your milestones'))
            )
      )
      .then(setSeeds)
      .catch((e) => setSeedsError(e.message));
  }, []);

  function flash(message) {
    setNote(message);
    setTimeout(() => setNote(''), 2500);
  }

  async function generate() {
    if (!topic.trim()) {
      setError(pick('Pehle batao post kis baare mein hai.', 'Say what the post is about first.'));
      setStatus('error');
      return;
    }
    setStatus('running');
    setError('');
    try {
      const res = await fetch('/api/ai/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: 'social-post',
          inputs: { platform, topic, points, tone, audience },
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || pick('Ye kaam nahi kiya.', 'That did not work.'));
      setResult(body);
      setText(body.data?.post || body.text || '');
      setSavedId(null);
      setStatus('done');
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  }

  async function saveDraft() {
    const d = result?.data || {};
    const payload = {
      platform: PLATFORMS.find((p) => p.id === platform)?.key || 'linkedin',
      topic,
      tone,
      hook: d.hook,
      body: text,
      thread: d.thread,
      slides: d.slides,
      hashtags: d.hashtags,
      notes: d.notes,
      resultId: result?.id,
      provider: result?.provider,
      model: result?.model,
      source: result?.source,
      edited: text !== (d.post || ''),
    };

    try {
      const res = savedId
        ? await fetch(`/api/posts/${savedId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ body: text }),
          })
        : await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || pick('Ye save nahi ho paaya', 'Could not save that'));
      if (!savedId) setSavedId(body.post.id);
      flash(
        savedId
          ? pick('Draft update ho gaya.', 'Draft updated.')
          : pick('Tumhare drafts mein save ho gaya.', 'Saved to your drafts.')
      );
    } catch (e) {
      flash(e.message);
    }
  }

  async function copy() {
    const tags = (result?.data?.hashtags || []).join(' ');
    try {
      await navigator.clipboard.writeText(tags ? `${text}\n\n${tags}` : text);
      flash(
        pick(`Copy ho gaya — ${platform} mein paste kar do.`, `Copied — paste it into ${platform}.`)
      );
    } catch {
      flash(pick('Clipboard available nahi hai', 'Clipboard unavailable'));
    }
  }

  function useSeed(seed) {
    setTopic(seed.title);
    setPoints(seed.seed);
    setStatus('idle');
    setResult(null);
  }

  const data = result?.data;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      {/* ── Left: what to write about ───────────────────────────────────── */}
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold">{pick('1. Platform chuno', '1. Pick a platform')}</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                  platform === p.id
                    ? 'border-indigo-300 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-indigo-200'
                }`}
              >
                <Icon name={p.icon} brand className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{p.id}</span>
                  {/* On the selected card the ground is an indigo tint, where
                      slate-500 falls under AA — the blurb follows the card. */}
                  <span className={`mt-0.5 block text-xs ${platform === p.id ? 'text-indigo-800' : 'text-slate-500'}`}>
                    {pick(p.hi, p.en)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold">{pick('2. Kis baare mein hai?', '2. What is it about?')}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {pick(
              'Apna topic likho, ya jo tumne sach mein kiya hai wahan se shuru karo.',
              'Write your own topic, or start from something you actually did.'
            )}
          </p>

          <label htmlFor="topic" className="mt-3 block text-sm font-medium text-slate-700">
            {pick('Topic', 'Topic')}
          </label>
          <input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={pick(
              'Maine seekha ki JavaScript ka event loop kaise chalta hai',
              'I learned how the JavaScript event loop works'
            )}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />

          <label htmlFor="points" className="mt-4 block text-sm font-medium text-slate-700">
            {pick('Kya kehna chahte ho (optional)', 'What you want to say (optional)')}
          </label>
          <textarea
            id="points"
            rows={4}
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder={pick(
              'Ek line mein ek — kya surprise laga, kya aakhir samajh aaya, kya banaya',
              'One per line — what surprised you, what finally clicked, what you built'
            )}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            {pick(
              'Jitni apni detail dogey, post utni hi kam generic hogi. Jo tum chhod dogey, model bhi chhod dega — wo tumhare liye achievements nahi bana dega.',
              'The more of your own detail you give, the less generic the post. Anything you leave out, the model leaves out — it will not invent achievements for you.'
            )}
          </p>
        </div>

        {/* Real milestones */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700">
            {pick('Jo tumne kiya hai wahan se shuru karo', 'Start from something you did')}
          </h3>
          {seedsError ? (
            <p className="mt-2 text-sm text-slate-400">{seedsError}</p>
          ) : !seeds ? (
            <div className="mt-2"><SkeletonCard lines={2} /></div>
          ) : !seeds.achievements.length && !seeds.insights.length ? (
            <p className="mt-2 rounded-xl border border-dashed border-slate-300 px-4 py-4 text-sm text-slate-500">
              {pick(
                'Abhi kuch nahi hai. Kuch concepts poore karo ya ek AI analysis chalao — tumhare asli milestones yahan starting points ban ke aa jaayenge.',
                'Nothing to draw on yet. Finish some concepts or run an AI analysis, and your real milestones will show up here as starting points.'
              )}
            </p>
          ) : (
            <div className="mt-2 space-y-2">
              {[...seeds.achievements, ...seeds.insights].map((s) => (
                <button
                  key={s.id}
                  onClick={() => useSeed(s)}
                  className="flex w-full items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-indigo-300"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{s.title}</span>
                    <span className="mt-0.5 block truncate text-xs text-slate-500">{s.detail}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    {s.source === 'demo' && <SourceBadge source="demo" />}
                    <Icon name="arrow-right" className="h-3 w-3 text-slate-300" />
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-semibold">{pick('3. Tone', '3. Tone')}</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  tone === t
                    ? 'border-indigo-300 bg-indigo-50 font-medium text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <label htmlFor="audience" className="mt-4 block text-sm font-medium text-slate-700">
            {pick('Kiske liye hai?', 'Who is it for?')}
          </label>
          <input
            id="audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />
        </div>

        <button
          onClick={generate}
          disabled={status === 'running'}
          className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          <Icon name={status === 'running' ? 'spinner' : 'sparkles'} spin={status === 'running'} className="mr-2 h-3.5 w-3.5" />
          {status === 'running'
            ? pick('Likh rahe hain…', 'Writing…')
            : result
              ? pick('Dobara banao', 'Regenerate')
              : pick('Post banao', 'Generate post')}
        </button>
      </div>

      {/* ── Right: the draft ────────────────────────────────────────────── */}
      <div className="space-y-4">
        {note && <SuccessNote>{note}</SuccessNote>}

        {status === 'idle' && !result && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 px-6 py-16 text-center">
            <Icon name="pen" className="mx-auto h-7 w-7 text-slate-300" />
            <p className="mt-3 font-semibold text-slate-700">
              {pick('Tumhara draft yahan aayega', 'Your draft appears here')}
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
              {pick(
                'Kahin kuch post nahi hota. Tumhe padhne, edit karne aur copy karne ke liye text milta hai — publish karna tumhara faisla rehta hai.',
                'Nothing is posted anywhere. You get text to read, edit and copy — publishing it stays your decision.'
              )}
            </p>
          </div>
        )}

        {status === 'running' && <SkeletonCard lines={8} />}
        {status === 'error' && <ErrorState message={error} onRetry={generate} />}

        {status === 'done' && result && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <SourceBadge source={result.source} model={result.model} />
              <span className="text-xs text-slate-400">{platform} · {tone}</span>
            </div>

            {result.source === 'demo' && (
              <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <Icon name="flask" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {pick('Demo output — asli post ke liye', 'Demo output — connect a provider in')}{' '}
                  <Link href="/settings/ai" className="font-semibold underline">
                    {pick('AI settings', 'AI settings')}
                  </Link>{' '}
                  {pick('mein ek provider connect karo.', 'for a real post.')}
                </span>
              </p>
            )}

            {data?.hook && (
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                  {pick('Hook', 'Hook')}
                </p>
                <p className="mt-1 font-medium text-indigo-900">{data.hook}</p>
              </div>
            )}

            <div>
              <label htmlFor="draft" className="block text-sm font-medium text-slate-700">
                {pick(
                  'Tumhari post — jab tak tumhari lagne na lage, edit karo',
                  'Your post — edit it until it sounds like you'
                )}
              </label>
              <textarea
                id="draft"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={Math.min(26, Math.max(10, text.split('\n').length + 3))}
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed outline-none focus:border-indigo-400"
              />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button onClick={copy} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                  <Icon name="copy" className="mr-1.5 h-3.5 w-3.5" />
                  {pick('Copy', 'Copy')}
                </button>
                <button onClick={saveDraft} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                  <Icon name={savedId ? 'check' : 'save'} className="mr-1.5 h-3.5 w-3.5" />
                  {savedId ? pick('Draft update karo', 'Update draft') : pick('Draft save karo', 'Save draft')}
                </button>
                <button onClick={generate} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                  <Icon name="rotate" className="mr-1.5 h-3.5 w-3.5" />
                  {pick('Dobara banao', 'Regenerate')}
                </button>
                <span className="text-xs text-slate-400">
                  {text.length} {pick('characters', 'characters')}
                </span>
              </div>
            </div>

            {!!data?.thread?.length && (
              <PostSection title={pick('Thread ki tarah', 'As a thread')} icon="comments">
                <div className="space-y-2">
                  {data.thread.map((t, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
                      <span className="mr-2 text-xs text-slate-400">{i + 1}</span>
                      {t}
                    </div>
                  ))}
                </div>
              </PostSection>
            )}

            {!!data?.slides?.length && (
              <PostSection title={pick('Carousel slides', 'Carousel slides')} icon="layers">
                <div className="grid gap-2 sm:grid-cols-2">
                  {data.slides.map((s, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-xs font-semibold text-slate-400">
                        {pick('Slide', 'Slide')} {i + 1}
                      </p>
                      <p className="mt-1.5 font-bold">{s.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{s.body}</p>
                    </div>
                  ))}
                </div>
              </PostSection>
            )}

            {!!data?.hashtags?.length && (
              <PostSection title={pick('Hashtags', 'Hashtags')} icon="hashtag">
                <p className="text-sm text-indigo-600">{data.hashtags.join(' ')}</p>
              </PostSection>
            )}

            {data?.notes && (
              <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <Icon name="warning" className="mt-0.5 h-4 w-4 shrink-0" />
                {data.notes}
              </p>
            )}

            <p className="text-xs text-slate-400">
              {pick(
                'Post karne se pehle ise padho. Ye tumhare likhe hue se bana hai — dekh lo ki har baat aisi hai jiske peechhe tum khade rah sako.',
                'Read it before you post it. It was written from what you typed — check that every claim in it is one you would stand behind.'
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function PostSection({ title, icon, children }) {
  return (
    <section>
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        <Icon name={icon} className="h-3.5 w-3.5" />
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}
