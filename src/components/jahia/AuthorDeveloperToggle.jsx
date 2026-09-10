'use client';

import { useState } from 'react';
import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import FieldMock from './FieldMock';
import { useLang } from '../LanguageProvider';
import { useTx } from './useTx';

const TABS = [
  { key: 'author', icon: 'pen', en: 'Author view', hi: 'Author view' },
  { key: 'developer', icon: 'code', en: 'Developer view', hi: 'Developer view' },
  { key: 'jcr', icon: 'database', en: 'JCR stores', hi: 'JCR mein' },
];

/**
 * The three layers of every Jahia concept, one tab each:
 *   Author    — what the CMS user does and sees
 *   Developer — the CND or code behind it
 *   JCR       — what actually lands in the repository
 *
 *   views = { author: { text, field }, developer: { text, code, language, filename }, jcr: { text, code } }
 */
export default function AuthorDeveloperToggle({ views }) {
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
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              active === t.key ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon name={t.icon} className="h-3.5 w-3.5" />
            {pick(t.hi, t.en)}
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
        {v.code && (
          <CodeBlock code={v.code} language={v.language || 'text'} filename={v.filename} lineNumbers={Boolean(v.filename)} />
        )}
      </div>
    </div>
  );
}
