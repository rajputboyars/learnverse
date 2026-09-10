'use client';

import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import { useLang } from '../LanguageProvider';
import { useTx } from './useTx';

const STAGES = [
  { key: 'problem', en: 'Problem', hi: 'Problem', icon: 'bug', tone: 'bg-red-50 text-red-700' },
  { key: 'symptoms', en: 'Symptoms', hi: 'Symptoms', icon: 'eye', tone: 'bg-red-50 text-red-700' },
  { key: 'where', en: 'How to inspect', hi: 'Kaise inspect karein', icon: 'search', tone: 'bg-indigo-50 text-indigo-700' },
  { key: 'causes', en: 'Root cause', hi: 'Asli wajah', icon: 'question', tone: 'bg-amber-50 text-amber-700' },
  { key: 'fix', en: 'Fix', hi: 'Fix', icon: 'wrench', tone: 'bg-green-50 text-green-700' },
  { key: 'prevention', en: 'Prevention', hi: 'Aage se bachao', icon: 'shield', tone: 'bg-slate-100 text-slate-700' },
];

/**
 * One failure, walked as a debugging process: problem → symptoms → how to
 * inspect → root cause → fix → prevention. Used inside lessons and by every
 * course's error database. `symptom` (one line, shown as a terminal strip) and
 * `symptoms` (a list) are both accepted.
 */
export default function DebugCard({ item, showTitle = true }) {
  const { pick } = useLang();
  const tx = useTx();
  if (!item) return null;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      {showTitle && item.title && (
        <p className="flex items-center gap-2 font-bold">
          <Icon name="bug" className="h-4 w-4 text-red-600" />
          {tx(item.title)}
        </p>
      )}
      {item.symptom && (
        <p className="rounded-xl bg-slate-900 px-3.5 py-2.5 font-mono text-[12.5px] leading-relaxed text-slate-200">
          {tx(item.symptom)}
        </p>
      )}
      <ol className="flex flex-col">
        {STAGES.filter((s) => item[s.key]).map((s, i, arr) => {
          const value = item[s.key];
          return (
            <li key={s.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${s.tone}`}>
                  <Icon name={s.icon} className="h-3.5 w-3.5" />
                </span>
                {i < arr.length - 1 && <span className="w-px flex-1 bg-slate-200" />}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 pb-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{pick(s.hi, s.en)}</p>
                {Array.isArray(value) ? (
                  <ul className="flex list-disc flex-col gap-1 pl-4 text-sm text-slate-700">
                    {value.map((x, j) => (
                      <li key={j}>{tx(x)}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-slate-700">{tx(value)}</p>
                )}
                {s.key === 'fix' && item.code && (
                  <div className="mt-2">
                    <CodeBlock code={item.code.code} language={item.code.language} filename={item.code.filename} lineNumbers />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
