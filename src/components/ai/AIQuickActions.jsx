'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import { ErrorState, SkeletonCard } from '@/components/ui/States';
import { useLang } from '@/components/LanguageProvider';
import PromptRunner from './PromptRunner';

/**
 * The quick-action grid. Each card says what it does, what you have to provide
 * and what you get back, so clicking one is never a leap of faith.
 *
 * Cards are driven entirely by the server template registry — adding a prompt
 * template makes a card appear here with no change to this file.
 */
export default function AIQuickActions({ limit, category, heading, subheading }) {
  const { pick } = useLang();
  const { status } = useSession();
  const [templates, setTemplates] = useState(null);
  const [error, setError] = useState('');
  const [active, setActive] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/ai/templates')
      .then((r) =>
        r.ok
          ? r.json()
          : Promise.reject(new Error(pick('AI actions load nahi ho paaye', 'Could not load AI actions')))
      )
      .then((d) => alive && setTemplates(d.templates))
      .catch((e) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  // Resolved here rather than in the parameter list so they follow the
  // reader's language instead of freezing at module load.
  heading = heading || pick('Kya jaanna hai?', 'What do you want to know?');
  subheading =
    subheading || pick('Ek chuno. Prompt hum likh denge.', 'Pick one. We write the prompt for you.');

  const shown = (templates || [])
    .filter((t) => (category ? t.category === category : true))
    .slice(0, limit || undefined);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold">{heading}</h2>
          <p className="mt-1 text-sm text-slate-500">{subheading}</p>
        </div>
      </div>

      {error ? (
        <div className="mt-4">
          <ErrorState message={error} onRetry={() => location.reload()} />
        </div>
      ) : !templates ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit || 6 }).map((_, i) => (
            <SkeletonCard key={i} lines={2} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t)}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left transition-colors hover:border-indigo-300 hover:bg-indigo-50/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon name={t.icon} className="h-4 w-4" />
              </span>
              <h3 className="mt-3 font-semibold">{pick(t.titleHi || t.title, t.title)}</h3>
              <p className="mt-1 flex-1 text-sm text-slate-500">{pick(t.shortHi || t.short, t.short)}</p>
              <p className="mt-3 text-xs text-slate-500">
                {pick('Tum dete ho:', 'You give:')}{' '}
                {t.inputs
                  .slice(0, 3)
                  .map((i) => pick(i.labelHi || i.label, i.label).toLowerCase())
                  .join(', ')}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600">
                {pick(t.ctaHi || t.cta, t.cta)}
                <Icon name="arrow-right" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </div>
      )}

      {active && (
        <PromptRunner
          template={active}
          templates={templates || []}
          authed={status === 'authenticated'}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
