'use client';

import { useTx } from './useTx';

/**
 * A chain of steps — the course's recurring picture:
 * CND → Node type → CMS field → Author input → JCR node → View → Frontend.
 * Flows left to right on wide screens, top to bottom on phones.
 *
 *   flow = { steps: ['CND', { label: 'Node type', sub: 'lv:article' }, …], highlight: 2 }
 */
export default function FlowDiagram({ flow }) {
  const tx = useTx();
  if (!flow?.steps?.length) return null;
  const steps = flow.steps;

  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      {flow.title && <p className="mb-3 text-sm font-bold">{tx(flow.title)}</p>}
      <ol className="flex flex-col items-stretch gap-1 md:flex-row md:flex-wrap md:items-center md:gap-y-2">
        {steps.map((s, i) => {
          const item = typeof s === 'string' ? { label: s } : s;
          const on = flow.highlight === i;
          return (
            <li key={i} className="flex flex-col items-center md:flex-row">
              <span
                className={`flex w-full flex-col items-center rounded-xl border px-3 py-2 text-center md:w-auto ${
                  on ? 'border-indigo-300 bg-indigo-600 text-white' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <span className={`text-sm font-semibold ${on ? 'text-white' : 'text-slate-800'}`}>{tx(item.label)}</span>
                {item.sub && (
                  <span className={`font-mono text-[11px] ${on ? 'text-indigo-100' : 'text-slate-500'}`}>{tx(item.sub)}</span>
                )}
              </span>
              {i < steps.length - 1 && (
                <span aria-hidden className="px-1.5 text-slate-400">
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {flow.caption && <figcaption className="mt-3 text-xs text-slate-500">{tx(flow.caption)}</figcaption>}
    </figure>
  );
}
