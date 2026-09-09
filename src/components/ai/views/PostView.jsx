'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { useLang } from '@/components/LanguageProvider';
import { Card, Pill, Section } from '../primitives';

/**
 * The generated post is editable in place — the model gives you a draft, you
 * make it yours, then copy. Edits stay local to this view; "Copy" always copies
 * exactly what is in the box.
 */
export default function PostView({ data }) {
  const { pick } = useLang();
  const [text, setText] = useState(data.post || '');
  const [copied, setCopied] = useState('');

  useEffect(() => setText(data.post || ''), [data.post]);

  async function copy(value, key) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(''), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  const hashtags = (data.hashtags || []).join(' ');

  return (
    <div className="space-y-8">
      {data.hook && (
        <Card className="border-indigo-200 bg-indigo-50">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
            {pick('Hook', 'Hook')}
          </p>
          <p className="mt-1 font-medium text-indigo-900">{data.hook}</p>
        </Card>
      )}

      <Section title={pick('Tumhari post', 'Your post')} icon="pen">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={Math.min(24, Math.max(8, text.split('\n').length + 2))}
          className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed outline-none focus:border-indigo-400"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={() => copy(hashtags ? `${text}\n\n${hashtags}` : text, 'post')}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Icon name={copied === 'post' ? 'check' : 'copy'} className="mr-1.5 h-3.5 w-3.5" />
            {copied === 'post' ? pick('Copy ho gaya', 'Copied') : pick('Post copy karo', 'Copy post')}
          </button>
          <span className="text-xs text-slate-400">
            {text.length} {pick('characters', 'characters')}
          </span>
        </div>
      </Section>

      {!!data.thread?.length && (
        <Section title={pick('Thread ki tarah', 'As a thread')} icon="comments">
          <div className="space-y-2">
            {data.thread.map((t, i) => (
              <Card key={i} className="flex items-start justify-between gap-3 p-4">
                <p className="text-sm">{t}</p>
                <button
                  onClick={() => copy(t, `t${i}`)}
                  className="shrink-0 text-xs font-medium text-indigo-600 hover:underline"
                >
                  {copied === `t${i}` ? pick('Copy ho gaya', 'Copied') : pick('Copy', 'Copy')}
                </button>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {!!data.slides?.length && (
        <Section title={pick('Carousel slides', 'Carousel slides')} icon="layers">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.slides.map((s, i) => (
              <Card key={i} className="flex aspect-square flex-col justify-center">
                <p className="text-xs font-semibold text-slate-400">
                  {pick('Slide', 'Slide')} {i + 1}
                </p>
                <p className="mt-2 text-base font-bold">{s.title}</p>
                <p className="mt-2 text-sm text-slate-600">{s.body}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {!!data.hashtags?.length && (
        <Section title={pick('Hashtags', 'Hashtags')} icon="hashtag">
          <div className="flex flex-wrap items-center gap-1.5">
            {data.hashtags.map((h) => (
              <Pill key={h} tone="indigo">{h}</Pill>
            ))}
            <button onClick={() => copy(hashtags, 'tags')} className="ml-1 text-xs font-medium text-indigo-600 hover:underline">
              {copied === 'tags' ? pick('Copy ho gaya', 'Copied') : pick('Sab copy karo', 'Copy all')}
            </button>
          </div>
        </Section>
      )}

      {data.notes && (
        <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Icon name="warning" className="mt-0.5 h-4 w-4 shrink-0" />
          {data.notes}
        </p>
      )}
    </div>
  );
}
