'use client';

import { useState } from 'react';
import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import FieldMock from './FieldMock';
import { ResultView } from './CodeResult';
import { useLang } from '../LanguageProvider';
import { useTx } from './useTx';

// Known perspectives. A course uses whichever keys its lessons provide:
//   CMS:        author / developer / jcr
//   Everything: user / developer / technical   (or beginner / developer / professional)
const TABS = [
  { key: 'author', icon: 'pen', en: 'Author view', hi: 'Author view' },
  { key: 'user', icon: 'eye', en: 'User view', hi: 'User view' },
  { key: 'beginner', icon: 'seedling', en: 'Beginner', hi: 'Beginner' },
  { key: 'developer', icon: 'code', en: 'Developer view', hi: 'Developer view' },
  { key: 'jcr', icon: 'database', en: 'JCR stores', hi: 'JCR mein' },
  { key: 'technical', icon: 'gem', en: 'Technical view', hi: 'Technical view' },
  { key: 'professional', icon: 'briefcase', en: 'Professional', hi: 'Professional' },
];

/**
 * One concept, seen from several sides — e.g. login:
 *   User → a login form · Developer → POST /api/login · Technical → JWT, hashing, cookie
 *
 *   views = { user: { text, field, result }, developer: { text, code, language, filename }, technical: {…} }
 */
export default function PerspectiveTabs({ views }) {
  const { pick } = useLang();
  const tx = useTx();
  const tabs = TABS.filter((t) => views?.[t.key]);
  const [active, setActive] = useState(tabs[0]?.key);
  if (!tabs.length) return null;
  const v = views[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-slate-100 bg-slate-50 p-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={active === t.key}
            onClick={() => setActive(t.key)}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${active === t.key ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Icon name={t.icon} className="h-3.5 w-3.5" />
            {views[t.key].label ? tx(views[t.key].label) : pick(t.hi, t.en)}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="flex flex-col gap-3 p-4 sm:p-5">
        {v.text && <p className="text-[15px] leading-relaxed text-slate-700">{tx(v.text)}</p>}
        {v.field && (
          <div className="max-w-md">
            <FieldMock field={v.field} />
          </div>
        )}
        {v.result && <ResultView result={v.result} />}
        {v.code && <CodeBlock code={v.code} language={v.language || 'text'} filename={v.filename} lineNumbers={Boolean(v.filename)} />}
      </div>
    </div>
  );
}
