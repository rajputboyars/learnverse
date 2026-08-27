'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import ConceptAnimation from './ConceptAnimation';
import Icon from '@/components/Icon';

const DIFF_ORDER = ['easy', 'medium', 'hard'];

const DIFF_META = {
  easy: {
    dot: 'bg-emerald-500',
    chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    bar: 'bg-emerald-500',
  },
  medium: {
    dot: 'bg-amber-500',
    chip: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    bar: 'bg-amber-500',
  },
  hard: {
    dot: 'bg-red-500',
    chip: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    bar: 'bg-red-500',
  },
};

function metaFor(d) {
  return DIFF_META[d] || { dot: 'bg-slate-400', chip: 'bg-slate-100 text-slate-500', bar: 'bg-slate-400' };
}

/* Runnable snippet shown under an answer, with its expected output. */
function CodeExample({ example, label, outputLabel }) {
  const [copied, setCopied] = useState(false);
  if (!example?.code) return null;

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3.5 py-1.5 dark:border-slate-700 dark:bg-slate-800/60">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(example.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          }}
          className="ml-auto rounded-md px-2 py-0.5 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
        >
          <Icon name={copied ? 'check' : 'copy'} className="h-3 w-3" />
        </button>
      </div>

      <pre className="overflow-x-auto bg-slate-900 px-3.5 py-3 font-mono text-[12px] leading-relaxed text-slate-200">
        <code>{example.code}</code>
      </pre>

      {example.output && (
        <div className="border-t border-slate-700 bg-slate-950 px-3.5 py-2 font-mono text-[11.5px] leading-relaxed">
          <span className="text-slate-500">{outputLabel} › </span>
          <span className="whitespace-pre-wrap text-emerald-400">{example.output}</span>
        </div>
      )}
    </div>
  );
}

/* The step-by-step walkthrough. This is the main answer, not an appendix, so
   it is always open and each step carries its own snippet or diagram right
   where it is explained. Questions with no deepDive simply render nothing. */
function DeepDive({ sections, pick }) {
  if (!sections?.length) return null;

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {pick(
            `Step by step — ${sections.length} steps`,
            `Step by step — ${sections.length} steps`
          )}
        </span>
        <span className="h-px flex-1 bg-indigo-100 dark:bg-indigo-900/60" />
      </div>

      <ol className="mt-4 space-y-6 border-l-2 border-indigo-100 pl-5 dark:border-indigo-900/50">
        {sections.map((sec, i) => (
          <li key={i} className="relative">
            {/* Step marker sitting on the timeline */}
            <span className="absolute -left-[27px] top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
              {i + 1}
            </span>

            {(sec.heading?.en || sec.heading?.hi) && (
              <h3 className="text-[15px] font-bold leading-snug text-slate-900 dark:text-slate-100">
                {pick(sec.heading.hi || sec.heading.en, sec.heading.en || sec.heading.hi)}
              </h3>
            )}

            {(sec.body?.en || sec.body?.hi) && (
              <p className="mt-1.5 whitespace-pre-line text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
                {pick(sec.body.hi || sec.body.en, sec.body.en || sec.body.hi)}
              </p>
            )}

            {sec.diagram && (
              <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 font-mono text-[11.5px] leading-[1.55] text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
                <code>{sec.diagram}</code>
              </pre>
            )}

            {sec.code && (
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 px-3.5 py-3 font-mono text-[12px] leading-relaxed text-slate-200">
                <code>{sec.code}</code>
              </pre>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* The prose answer. When a step-by-step exists above it this reads as a
   recap, so it gets a label saying so; on its own it IS the answer. */
function Answer({ english, hinglish, isRecap, pick, compact }) {
  if (!english && !hinglish) return null;

  return (
    <div className={compact ? '' : 'mt-6'}>
      {isRecap && (
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {pick('Ek line mein', 'In short')}
          </span>
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>
      )}

      {english && (
        <p className={`${compact ? 'text-sm' : 'text-[15px]'} leading-relaxed text-slate-700 dark:text-slate-300`}>
          {english}
        </p>
      )}

      {hinglish && (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200">
          <span className="font-semibold">Hinglish: </span>
          {hinglish}
        </div>
      )}
    </div>
  );
}

export default function InterviewQuestionsBrowser({ questions, levelLinks = [], initialQuestionId = null }) {
  const { pick } = useLang();

  // A question can be linked to directly from search or the start-here strip.
  const landed = initialQuestionId && questions.some((q) => q.id === initialQuestionId);

  const [search, setSearch] = useState('');
  const [freq, setFreq] = useState('all');
  const [selectedId, setSelectedId] = useState(
    landed ? initialQuestionId : questions[0]?.id || null
  );
  const [openId, setOpenId] = useState(landed ? initialQuestionId : null); // mobile accordion
  const listRef = useRef(null);

  // Filter (questions arrive already sorted easy → medium → hard)
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return questions.filter((q) => {
      if (freq !== 'all' && q.frequency !== freq) return false;
      if (!term) return true;
      return (
        q.question.toLowerCase().includes(term) ||
        q.english.toLowerCase().includes(term) ||
        q.hinglish.toLowerCase().includes(term)
      );
    });
  }, [questions, search, freq]);

  // Bring a deep-linked question into view on first paint.
  useEffect(() => {
    if (!landed) return;
    listRef.current
      ?.querySelector(`[data-qid="${initialQuestionId}"]`)
      ?.scrollIntoView({ block: 'center' });
  }, [landed, initialQuestionId]);

  // Keep selection valid as filters change
  useEffect(() => {
    if (filtered.length === 0) return;
    if (!filtered.some((q) => q.id === selectedId)) setSelectedId(filtered[0].id);
  }, [filtered, selectedId]);

  const selected = filtered.find((q) => q.id === selectedId) || filtered[0] || null;

  // Counts per difficulty within the current filter
  const counts = useMemo(() => {
    const c = { easy: 0, medium: 0, hard: 0 };
    for (const q of filtered) if (c[q.difficulty] !== undefined) c[q.difficulty] += 1;
    return c;
  }, [filtered]);

  // Keyboard navigation for the desktop list
  function onListKeyDown(e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const i = filtered.findIndex((q) => q.id === selectedId);
    const next = e.key === 'ArrowDown' ? Math.min(i + 1, filtered.length - 1) : Math.max(i - 1, 0);
    const q = filtered[next];
    if (!q) return;
    setSelectedId(q.id);
    listRef.current?.querySelector(`[data-qid="${q.id}"]`)?.scrollIntoView({ block: 'nearest' });
  }

  const freqChips = [
    { key: 'all', label: pick('Sab', 'All') },
    { key: 'common', label: pick('Common', 'Common') },
    { key: 'rare', label: pick('Rare', 'Rare') },
  ];

  return (
    <div className="mt-6">
      {/* ── Toolbar ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon name="search" className="h-[15px] w-[15px]" />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={pick(
              `${questions.length} questions mein search karo…`,
              `Search ${questions.length} questions…`
            )}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800/60 dark:focus:bg-slate-800"
          />
        </div>

        {levelLinks.length > 0 && (
          <div className="flex items-center gap-1.5">
            {levelLinks.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
                  l.active
                    ? 'bg-slate-900 text-white dark:bg-slate-700'
                    : 'border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400'
                }`}
              >
                {l.key === 'all' ? pick('Sab', 'All') : l.key}
              </Link>
            ))}
          </div>
        )}

        <span className="hidden h-6 w-px bg-slate-200 sm:block dark:bg-slate-700" />

        <div className="flex items-center gap-1.5">
          {freqChips.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFreq(f.key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                freq === f.key
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
                  : 'border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Result summary ────────────────────────────────── */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
        <span className="font-medium text-slate-500 dark:text-slate-400">
          {filtered.length} {filtered.length === 1 ? pick('question mila', 'question') : pick('questions mile', 'questions')}
        </span>
        {DIFF_ORDER.map((d) =>
          counts[d] > 0 ? (
            <span key={d} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className={`h-2 w-2 rounded-full ${metaFor(d).dot}`} />
              <span className="capitalize">{d}</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">{counts[d]}</span>
            </span>
          ) : null
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">
          {pick('Kuch nahi mila. Doosra search ya filter try karo.', 'Nothing matched. Try another search or filter.')}
        </p>
      ) : (
        <>
          {/* ── Desktop: two-pane ───────────────────────────── */}
          <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid lg:grid-cols-[minmax(300px,2fr)_3fr] dark:border-slate-700 dark:bg-slate-900">
            {/* List */}
            <div
              ref={listRef}
              tabIndex={0}
              onKeyDown={onListKeyDown}
              className="max-h-[70vh] overflow-y-auto border-r border-slate-200 outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500/30 dark:border-slate-700"
            >
              {DIFF_ORDER.map((level) => {
                const group = filtered.filter((q) => q.difficulty === level);
                if (group.length === 0) return null;
                return (
                  <div key={level}>
                    <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-slate-100 bg-slate-50/95 px-4 py-1.5 backdrop-blur dark:border-slate-800 dark:bg-slate-800/95">
                      <span className={`h-1.5 w-1.5 rounded-full ${metaFor(level).dot}`} />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {level}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">{group.length}</span>
                    </div>
                    {group.map((q) => {
                      const on = q.id === selectedId;
                      return (
                        <button
                          key={q.id}
                          type="button"
                          data-qid={q.id}
                          onClick={() => setSelectedId(q.id)}
                          className={`flex w-full items-start gap-2.5 border-b border-slate-100 px-4 py-3 text-left transition dark:border-slate-800 ${
                            on
                              ? 'bg-indigo-50 shadow-[inset_3px_0_0_0_#4f46e5] dark:bg-indigo-950/40'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <span className={`mt-1.5 h-1.5 w-1.5 flex-none rounded-full ${metaFor(q.difficulty).dot}`} />
                          <span
                            className={`text-sm leading-snug ${
                              on
                                ? 'font-semibold text-indigo-700 dark:text-indigo-300'
                                : 'text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {q.question}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Detail */}
            <div className="max-h-[70vh] overflow-y-auto bg-slate-50/40 p-7 dark:bg-slate-900/40">
              {selected && (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${metaFor(selected.difficulty).chip}`}>
                      {selected.difficulty}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {selected.frequency}
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl font-bold leading-snug text-slate-900 dark:text-slate-100">
                    {selected.question}
                  </h2>

                  <DeepDive sections={selected.deepDive} pick={pick} />

                  <Answer
                    english={selected.english}
                    hinglish={selected.hinglish}
                    isRecap={selected.deepDive?.length > 0}
                    pick={pick}
                  />

                  <CodeExample
                    example={selected.codeExample}
                    label={
                      selected.deepDive?.length > 0
                        ? pick('Poora example', 'Full example')
                        : pick('Example', 'Example')
                    }
                    outputLabel={pick('output', 'output')}
                  />

                  {selected.visual && <ConceptAnimation type={selected.visual} />}

                  <p className="mt-6 border-t border-slate-200 pt-3 text-xs text-slate-400 dark:border-slate-800">
                    {pick('Tip: list mein arrow keys use karo.', 'Tip: use the arrow keys in the list.')}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ── Mobile: accordion ───────────────────────────── */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:hidden dark:border-slate-700 dark:bg-slate-900">
            {DIFF_ORDER.map((level) => {
              const group = filtered.filter((q) => q.difficulty === level);
              if (group.length === 0) return null;
              return (
                <div key={level}>
                  <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-1.5 dark:border-slate-800 dark:bg-slate-800">
                    <span className={`h-1.5 w-1.5 rounded-full ${metaFor(level).dot}`} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {level}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">{group.length}</span>
                  </div>
                  {group.map((q) => {
                    const open = openId === q.id;
                    return (
                      <div key={q.id} className="border-b border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => setOpenId(open ? null : q.id)}
                          className={`flex w-full items-start gap-2.5 px-4 py-3 text-left transition ${
                            open ? 'bg-indigo-50 dark:bg-indigo-950/40' : ''
                          }`}
                        >
                          <span className={`mt-1.5 h-1.5 w-1.5 flex-none rounded-full ${metaFor(q.difficulty).dot}`} />
                          <span
                            className={`flex-1 text-sm font-medium leading-snug ${
                              open ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            {q.question}
                          </span>
                          <span
                            className={`mt-0.5 flex-none text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
                          >
                            <Icon name="chevron-down" className="h-[13px] w-[13px]" />
                          </span>
                        </button>
                        {open && (
                          <div className="bg-slate-50/60 px-4 pb-4 pt-1 dark:bg-slate-800/40">
                            <DeepDive sections={q.deepDive} pick={pick} />
                            <Answer
                              english={q.english}
                              hinglish={q.hinglish}
                              isRecap={q.deepDive?.length > 0}
                              pick={pick}
                              compact={!q.deepDive?.length}
                            />
                            <CodeExample
                              example={q.codeExample}
                              label={
                                q.deepDive?.length > 0
                                  ? pick('Poora example', 'Full example')
                                  : pick('Example', 'Example')
                              }
                              outputLabel={pick('output', 'output')}
                            />
                            {q.visual && <ConceptAnimation type={q.visual} />}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
