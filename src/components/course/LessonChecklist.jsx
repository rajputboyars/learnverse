'use client';

import { useEffect, useState } from 'react';
import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import { useLang } from '../LanguageProvider';
import { readStore, useTx, writeStore } from './useTx';

/**
 * "Try it yourself" — numbered steps the learner ticks off as they do them in
 * their own Jahia. Ticks are remembered per lesson in this browser.
 */
export function StepList({ steps, storageKey }) {
  const { pick } = useLang();
  const tx = useTx();
  const key = `jahia:steps:${storageKey}`;
  const [done, setDone] = useState([]);

  useEffect(() => {
    setDone(readStore(key, []));
  }, [key]);

  function toggle(i) {
    const next = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
    setDone(next);
    writeStore(key, next);
  }

  if (!steps?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-slate-400">
        {done.length}/{steps.length} {pick('steps ho gaye', 'steps done')}
      </p>
      <ol className="flex flex-col gap-2">
        {steps.map((s, i) => {
          const step = typeof s === 'string' ? { title: s } : s;
          const ok = done.includes(i);
          return (
            <li key={i} className={`rounded-xl border p-3.5 transition ${ok ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-white'}`}>
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={ok}
                  aria-label={ok ? 'Mark step not done' : 'Mark step done'}
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    ok ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50'
                  }`}
                >
                  {ok ? <Icon name="check" className="h-3 w-3" /> : i + 1}
                </button>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className={`font-semibold ${ok ? 'text-slate-500' : 'text-slate-800'}`}>{tx(step.title)}</p>
                  {step.detail && <p className="text-sm leading-relaxed text-slate-600">{tx(step.detail)}</p>}
                  {step.code && (
                    <div className="mt-1">
                      <CodeBlock code={step.code} language={step.language || 'text'} filename={step.filename} lineNumbers={Boolean(step.filename)} />
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** "Expected result" — the ✓ list a learner checks their screen against. */
export function ExpectedResult({ expected }) {
  const tx = useTx();
  if (!expected) return null;
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 sm:p-5">
      {expected.text && <p className="text-[15px] leading-relaxed text-slate-700">{tx(expected.text)}</p>}
      {expected.checks?.length > 0 && (
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-1.5 sm:grid-cols-2">
          {expected.checks.map((c, i) => (
            <li key={i} className="flex items-start gap-2 font-mono text-[13px] text-green-800">
              <span className="font-bold text-green-600">✓</span>
              <span>{tx(c)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
