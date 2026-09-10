'use client';

import { useEffect, useMemo, useState } from 'react';
import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import { useLang } from '../LanguageProvider';
import { NODE_TYPES, NT_CATEGORIES, NT_SCOPES } from '@/data/jahia/nodeTypes';
import { ntAnchor } from '@/data/jahia/search';

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-1 border-t border-slate-100 py-2.5 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-4">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
      <span className="text-sm text-slate-700">{children}</span>
    </div>
  );
}

function Chips({ list }) {
  if (!list?.length) return <span className="text-slate-400">—</span>;
  return (
    <span className="flex flex-wrap gap-1.5">
      {list.map((x) => (
        <span key={x} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">{x}</span>
      ))}
    </span>
  );
}

export default function NodeTypeExplorer() {
  const { pick } = useLang();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [scope, setScope] = useState(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    function fromHash() {
      const h = window.location.hash.slice(1);
      const hit = NODE_TYPES.find((n) => ntAnchor(n.name) === h);
      if (hit) {
        setOpen(hit.name);
        setTimeout(() => document.getElementById(h)?.scrollIntoView({ block: 'start' }), 50);
      }
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NODE_TYPES.filter((n) => (!category || n.category === category) && (!scope || n.scope === scope)).filter((n) =>
      !q ? true : [n.name, n.purpose, n.whereUsed, n.cms, ...(n.properties || [])].join(' ').toLowerCase().includes(q)
    );
  }, [query, category, scope]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <Icon name="warning" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <p>
          {pick(
            'Jahia ke "saare node types" ki koi ek universal list nahi hai. Kaunse types available hain ye Jahia version aur installed modules pe depend karta hai — har module apne types register kar sakta hai. Ye explorer common core types, JCR standard types, module-provided types aur course ke custom types dikhata hai. Apne install ka sach: Jahia Tools → Definitions browser.',
            'There is no single universal list of "all Jahia node types". What is available depends on your Jahia version and installed modules — every module can register its own. This explorer covers common core types, JCR standard types, module-provided types and the course\'s custom types. For the truth about your install: Jahia Tools → Definitions browser.'
          )}
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5">
          <Icon name="search" className="h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="jnt:page, image, folder, category, lv:article…"
            className="h-11 w-full bg-transparent text-sm outline-none"
            aria-label="Search node types"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(NT_SCOPES).map(([key, s]) => (
            <button
              key={key}
              type="button"
              onClick={() => setScope(scope === key ? null : key)}
              aria-pressed={scope === key}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${scope === key ? 'bg-slate-900 text-white dark:bg-slate-700' : s.tone}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {NT_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(category === c ? null : c)}
              aria-pressed={category === c}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${category === c ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-400">{list.length} {pick('types', 'types')}</p>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-2">
        {list.map((n) => {
          const isOpen = open === n.name;
          const s = NT_SCOPES[n.scope];
          return (
            <div key={n.name} id={ntAnchor(n.name)} className={`scroll-mt-32 rounded-2xl border bg-white ${isOpen ? 'border-indigo-300 lg:col-span-2' : 'border-slate-200'}`}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : n.name)}
                aria-expanded={isOpen}
                className="flex w-full flex-col gap-2 p-4 text-left"
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold">{n.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.tone}`}>{s.label}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{n.category}</span>
                  <Icon name="chevron-down" className={`ml-auto h-3 w-3 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} />
                </span>
                <span className="text-sm text-slate-600">{n.purpose}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <Row label="Node type"><span className="font-mono">{n.name}</span></Row>
                  <Row label="Namespace"><span className="font-mono">{n.namespace}</span></Row>
                  <Row label="Inheritance"><Chips list={n.inheritance} /></Row>
                  <Row label="Mixins"><Chips list={n.mixins} /></Row>
                  <Row label="Properties"><Chips list={n.properties} /></Row>
                  <Row label="Purpose">{n.purpose}</Row>
                  <Row label="Where used">{n.whereUsed}</Row>
                  <Row label="CMS appearance">{n.cms}</Row>
                  {n.version && <Row label="Version note"><span className="text-amber-700">⚠ {n.version}</span></Row>}
                  <div className="border-t border-slate-100 pt-3">
                    <CodeBlock code={n.cnd} language="cnd" filename={n.scope === 'custom' ? 'lv-news/META-INF/definitions.cnd' : 'example'} lineNumbers />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
