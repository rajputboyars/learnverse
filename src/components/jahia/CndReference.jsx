'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import FieldMock from '../course/FieldMock';
import CodeResult from '../course/CodeResult';
import { useLang } from '../LanguageProvider';
import { useTx } from '../course/useTx';
import { LessonLink } from '../course/CourseToolkit';
import { CND_CATEGORIES, CND_ENTRIES, CHEAT_SHEET, cndById } from '@/data/jahia/cnd';
import { ntAnchor } from '@/data/jahia/nodeTypes';

const TABS = [
  { key: 'reference', en: 'Reference', hi: 'Reference' },
  { key: 'cheatsheet', en: 'Cheat sheet', hi: 'Cheat sheet' },
  { key: 'explorer', en: 'Field → CMS explorer', hi: 'Field → CMS explorer' },
];

function EntryDetail({ entry, lessons }) {
  const { pick } = useLang();
  const tx = useTx();
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-mono text-lg font-bold">{entry.name}</h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{entry.category}</span>
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold capitalize text-indigo-700">{entry.difficulty}</span>
        {entry.version && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700" title="Version- or module-dependent">
            ⚠ {entry.version}
          </span>
        )}
      </div>
      <p className="text-[15px] leading-relaxed text-slate-700">{tx(entry.description)}</p>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Syntax</p>
          <CodeBlock code={entry.syntax} language="cnd" filename="definitions.cnd" lineNumbers />
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{pick('Example', 'Example')}</p>
          <CodeBlock code={entry.example} language="cnd" filename="definitions.cnd" lineNumbers />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{pick('CMS mein kaisa dikhta hai', 'In the CMS')}</p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            {entry.cms ? <FieldMock field={entry.cms} /> : <p className="text-sm text-slate-500">—</p>}
          </div>
          {entry.cmsNote && <p className="text-sm text-slate-600">{entry.cmsNote}</p>}
          <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Use case</p>
          <p className="text-sm text-slate-700">{entry.useCase}</p>
          {entry.relatedNodeTypes?.length > 0 && (
            <>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Related node types</p>
              <p className="flex flex-wrap gap-1.5">
                {entry.relatedNodeTypes.map((n) => (
                  <Link key={n} href={`/courses/jahia/toolkit/node-types#${ntAnchor(n)}`} className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700 hover:bg-indigo-50">
                    {n}
                  </Link>
                ))}
              </p>
            </>
          )}
          {entry.relatedLessons?.length > 0 && (
            <>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{pick('Lessons', 'Lessons')}</p>
              <div className="flex flex-col gap-1">
                {entry.relatedLessons.map((t) => (
                  <LessonLink key={t} title={t} lessons={lessons} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Build-a-line explorer ── */
const TYPES = ['string', 'long', 'double', 'boolean', 'date', 'weakreference'];
const SELECTORS = {
  string: ['none', 'textarea', 'richtext', 'choicelist'],
  long: ['none'],
  double: ['none'],
  boolean: ['none'],
  date: ['none', 'datepicker', 'datetimepicker'],
  weakreference: ["picker[type='image']", "picker[type='file']", "picker[type='page']", 'content'],
};

function buildLine({ name, type, selector, mandatory, multiple, i18n }) {
  const sel = selector && selector !== 'none' && selector !== 'content' ? `, ${selector === 'choicelist' ? 'choicelist[resourceBundle]' : selector}` : '';
  const attrs = [i18n && 'i18n', mandatory && 'mandatory', multiple && 'multiple'].filter(Boolean).join(' ');
  let constraint = '';
  if (selector === "picker[type='image']") constraint = " < 'jmix:image'";
  if (selector === "picker[type='file']") constraint = " < 'jnt:file'";
  if (selector === "picker[type='page']") constraint = " < 'jnt:page'";
  if (selector === 'content') constraint = " < 'lv:author'";
  if (selector === 'choicelist') constraint = " < 'news', 'opinion', 'guide'";
  return `- ${name || 'field'} (${type}${sel})${attrs ? ` ${attrs}` : ''}${constraint}`;
}

function buildField({ name, type, selector, mandatory, multiple, i18n }) {
  const label = (name || 'field').replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
  const base = { label, required: mandatory, i18n };
  if (multiple && ['string', 'long', 'double'].includes(type) && (!selector || selector === 'none')) {
    return { ...base, kind: 'multitext', value: ['first', 'second'] };
  }
  if (type === 'string') {
    if (selector === 'textarea') return { ...base, kind: 'textarea', value: 'Several lines of plain text…' };
    if (selector === 'richtext') return { ...base, kind: 'richtext', value: 'Formatted <b>rich</b> text' };
    if (selector === 'choicelist') return { ...base, kind: 'select', value: 'news' };
    return { ...base, kind: 'text', value: 'My Blog Article' };
  }
  if (type === 'long') return { ...base, kind: 'number', value: '42' };
  if (type === 'double') return { ...base, kind: 'decimal', value: '4.5' };
  if (type === 'boolean') return { ...base, kind: 'checkbox', value: true };
  if (type === 'date') return { ...base, kind: selector === 'datetimepicker' ? 'datetime' : 'date', value: selector === 'datetimepicker' ? '10 Sep 2026, 18:30' : '10 Sep 2026' };
  if (selector === "picker[type='image']") return { ...base, kind: 'picker-image', value: multiple ? '3 images selected' : 'Select image' };
  if (selector === "picker[type='file']") return { ...base, kind: 'picker-file', value: 'Select file' };
  if (selector === "picker[type='page']") return { ...base, kind: 'picker-page', value: 'Select page' };
  return { ...base, kind: 'picker-content', value: multiple ? '2 items selected' : 'Select content…' };
}

function Explorer() {
  const { pick } = useLang();
  const [spec, setSpec] = useState({ name: 'title', type: 'string', selector: 'none', mandatory: false, multiple: false, i18n: true });
  const set = (patch) => setSpec((s) => ({ ...s, ...patch }));
  const presets = CND_ENTRIES.filter((e) => e.cms && e.category !== 'Structure');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <p className="font-bold">{pick('Apni CND line banao', 'Build a CND line')}</p>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
            {pick('Property ka naam', 'Property name')}
            <input
              value={spec.name}
              onChange={(e) => set({ name: e.target.value.replace(/[^A-Za-z0-9_:]/g, '') })}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-mono text-sm text-slate-800"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
            Type
            <select
              value={spec.type}
              onChange={(e) => set({ type: e.target.value, selector: SELECTORS[e.target.value][0] })}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-mono text-sm text-slate-800"
            >
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
            Selector
            <select
              value={spec.selector}
              onChange={(e) => set({ selector: e.target.value })}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-mono text-sm text-slate-800"
            >
              {SELECTORS[spec.type].map((s) => <option key={s} value={s}>{s === 'content' ? "content (< 'lv:author')" : s}</option>)}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {['mandatory', 'multiple', 'i18n'].map((flag) => (
            <button
              key={flag}
              type="button"
              aria-pressed={spec[flag]}
              onClick={() => set({ [flag]: !spec[flag] })}
              className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold ${spec[flag] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              {flag}
            </button>
          ))}
        </div>
        <CodeResult rows={[{ code: buildLine(spec), field: buildField(spec) }]} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-bold">{pick('Har reference entry, CND → CMS', 'Every reference entry, CND → CMS')}</p>
        <CodeResult rows={presets.map((e) => ({ code: e.example.split('\n')[0], field: e.cms, note: e.cmsNote }))} />
      </div>
    </div>
  );
}

export default function CndReference({ lessons }) {
  const { pick } = useLang();
  const tx = useTx();
  const [tab, setTab] = useState('reference');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(null);

  // Deep links: #cheatsheet, #explorer, #entry-<id>. Read from the hash after
  // mount (never useSearchParams — see the mobile-layout notes).
  useEffect(() => {
    function fromHash() {
      const h = window.location.hash.slice(1);
      if (h === 'cheatsheet' || h === 'explorer') setTab(h);
      else if (h.startsWith('entry-') && cndById(h.slice(6))) {
        setTab('reference');
        setOpen(h.slice(6));
        setTimeout(() => document.getElementById(h)?.scrollIntoView({ block: 'start' }), 50);
      }
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CND_ENTRIES.filter((e) => (!category || e.category === category)).filter((e) => {
      if (!q) return true;
      const hay = [e.name, e.id, e.category, e.syntax, e.example, e.useCase, e.cmsNote, ...(e.tags || []), tx(e.description)]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, category, tx]);

  return (
    <div className="flex flex-col gap-5">
      <div role="tablist" className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => {
              setTab(t.key);
              history.replaceState(null, '', t.key === 'reference' ? window.location.pathname : `#${t.key}`);
            }}
            className={`flex-1 shrink-0 rounded-lg px-4 py-2 text-sm font-semibold ${tab === t.key ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            {pick(t.hi, t.en)}
          </button>
        ))}
      </div>

      {tab === 'reference' && (
        <>
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5">
              <Icon name="search" className="h-4 w-4 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="image, weakreference, richtext, mandatory, i18n, mixin…"
                className="h-11 w-full bg-transparent text-sm outline-none"
                aria-label="Search the CND reference"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button type="button" onClick={() => setCategory(null)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${!category ? 'bg-slate-900 text-white dark:bg-slate-700' : 'bg-slate-100 text-slate-600'}`}>
                {pick('Sab', 'All')} · {CND_ENTRIES.length}
              </button>
              {CND_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(category === c ? null : c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${category === c ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400">{list.length} {pick('entries', 'entries')}</p>

          <div className="flex flex-col gap-2">
            {list.map((e) => (
              <div key={e.id} id={`entry-${e.id}`} className="scroll-mt-32">
                <button
                  type="button"
                  onClick={() => setOpen(open === e.id ? null : e.id)}
                  aria-expanded={open === e.id}
                  className={`flex w-full flex-col gap-1 rounded-2xl border bg-white px-4 py-3 text-left transition sm:flex-row sm:items-center sm:gap-4 ${
                    open === e.id ? 'border-indigo-300' : 'border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <span className="w-48 shrink-0 font-mono text-sm font-bold">{e.name}</span>
                  <span className="min-w-0 flex-1 truncate font-mono text-xs text-slate-500">{e.syntax}</span>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">{e.category}</span>
                </button>
                {open === e.id && (
                  <div className="mt-2">
                    <EntryDetail entry={e} lessons={lessons} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'cheatsheet' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {CHEAT_SHEET.map((id) => {
              const e = cndById(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setOpen(open === id ? null : id)}
                  aria-pressed={open === id}
                  className={`flex flex-col gap-1 rounded-xl border p-3 text-left transition ${
                    open === id ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  <span className="font-mono text-sm font-bold">{e.name}</span>
                  <span className="truncate font-mono text-[11px] text-slate-500">{e.syntax}</span>
                </button>
              );
            })}
          </div>
          {open && cndById(open) && <EntryDetail entry={cndById(open)} lessons={lessons} />}
          {!open && (
            <p className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
              {pick('Kisi bhi keyword pe click karo — syntax, CMS field, example aur use case dikhega.', 'Click any keyword to see its syntax, CMS field, example and use case.')}
            </p>
          )}
        </div>
      )}

      {tab === 'explorer' && <Explorer />}
    </div>
  );
}
