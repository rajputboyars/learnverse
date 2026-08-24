'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { useLang } from './LanguageProvider';
import ConceptAnimation from './ConceptAnimation';

const DIFF_ORDER = ['easy', 'medium', 'hard'];

const DIFF_META = {
  easy: {
    dot: 'bg-accent-green',
    chip: 'bg-accent-green-tint text-accent-green-ink',
    bar: 'bg-accent-green',
  },
  medium: {
    dot: 'bg-amber-500',
    chip: 'bg-amber-tint text-amber-ink',
    bar: 'bg-amber-500',
  },
  hard: {
    dot: 'bg-red-500',
    chip: 'bg-red-100 text-red-700',
    bar: 'bg-red-500',
  },
};

function metaFor(d) {
  return DIFF_META[d] || { dot: 'bg-muted-soft', chip: 'bg-line-soft text-muted', bar: 'bg-muted-soft' };
}

/* Runnable snippet shown under an answer, with its expected output. */
function CodeExample({ example, label, outputLabel }) {
  const [copied, setCopied] = useState(false);
  if (!example?.code) return null;

  return (
    <div className="mt-5 overflow-hidden rounded-2xl" style={{ background: 'var(--color-ink)' }}>
      <div className="flex items-center gap-2 border-b border-white/10 px-3.5 py-2.5">
        <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(example.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          }}
          className="ml-auto rounded-md px-2 py-0.5 text-[11px] font-semibold text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? '✓' : '⧉'}
        </button>
      </div>

      <pre className="overflow-x-auto px-3.5 py-3 font-mono text-[12px] leading-relaxed text-slate-200">
        <code>{example.code}</code>
      </pre>

      {example.output && (
        <div className="border-t border-white/10 px-3.5 py-2 font-mono text-[11.5px] leading-relaxed">
          <span className="text-slate-500">{outputLabel} › </span>
          <span className="whitespace-pre-wrap text-[#86efac]">{example.output}</span>
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
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
          {pick(
            `Step by step — ${sections.length} steps`,
            `Step by step — ${sections.length} steps`
          )}
        </span>
        <span className="h-px flex-1 bg-brand-tint" />
      </div>

      <ol className="mt-4 space-y-6 border-l-2 border-brand-tint pl-5">
        {sections.map((sec, i) => (
          <li key={i} className="relative">
            {/* Step marker sitting on the timeline */}
            <span className="absolute -left-[27px] top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
              {i + 1}
            </span>

            {(sec.heading?.en || sec.heading?.hi) && (
              <h3 className="text-[15px] font-bold leading-snug text-ink">
                {pick(sec.heading.hi || sec.heading.en, sec.heading.en || sec.heading.hi)}
              </h3>
            )}

            {(sec.body?.en || sec.body?.hi) && (
              <p className="mt-1.5 whitespace-pre-line text-[14px] leading-relaxed text-ink-soft">
                {pick(sec.body.hi || sec.body.en, sec.body.en || sec.body.hi)}
              </p>
            )}

            {sec.diagram && (
              <pre className="mt-3 overflow-x-auto rounded-lg border border-line bg-line-soft px-3.5 py-3 font-mono text-[11.5px] leading-[1.55] text-ink-soft">
                <code>{sec.diagram}</code>
              </pre>
            )}

            {sec.code && (
              <pre className="mt-3 overflow-x-auto rounded-lg px-3.5 py-3 font-mono text-[12px] leading-relaxed text-slate-200" style={{ background: 'var(--color-ink)' }}>
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
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            {pick('Ek line mein', 'In short')}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
      )}

      {english && (
        <p className={`${compact ? 'text-sm' : 'text-[15px]'} leading-relaxed text-ink-soft`}>
          {english}
        </p>
      )}

      {hinglish && (
        <div className="mt-3 rounded-xl border border-amber-tint-2 bg-amber-tint p-4 text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-amber-ink">Hinglish: </span>
          {hinglish}
        </div>
      )}
    </div>
  );
}

export default function InterviewQuestionsBrowser({ questions }) {
  const { pick } = useLang();

  const [search, setSearch] = useState('');
  const [freq, setFreq] = useState('all');
  const [selectedId, setSelectedId] = useState(questions[0]?.id || null);
  const [openId, setOpenId] = useState(null); // mobile accordion
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
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={pick(
              `${questions.length} questions mein search karo…`,
              `Search ${questions.length} questions…`
            )}
            className="w-full rounded-xl border border-line bg-card py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-muted-soft focus:border-brand focus:ring-4 focus:ring-brand-tint"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {freqChips.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFreq(f.key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                freq === f.key
                  ? 'bg-brand text-white'
                  : 'border border-line text-ink-soft hover:border-brand/40 hover:text-brand'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Result summary ────────────────────────────────── */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
        <span className="font-medium text-muted">
          {filtered.length} {filtered.length === 1 ? pick('question mila', 'question') : pick('questions mile', 'questions')}
        </span>
        {DIFF_ORDER.map((d) =>
          counts[d] > 0 ? (
            <span key={d} className="flex items-center gap-1.5 text-xs text-muted">
              <span className={`h-2 w-2 rounded-full ${metaFor(d).dot}`} />
              <span className="capitalize">{d}</span>
              <span className="font-semibold text-ink-soft">{counts[d]}</span>
            </span>
          ) : null
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-3xl border border-dashed border-line p-10 text-center text-muted">
          {pick('Kuch nahi mila. Doosra search ya filter try karo.', 'Nothing matched. Try another search or filter.')}
        </p>
      ) : (
        <>
          {/* ── Desktop: two-pane ───────────────────────────── */}
          <div className="lv-card mt-5 hidden overflow-hidden lg:grid lg:grid-cols-[minmax(300px,2fr)_3fr]">
            {/* List */}
            <div
              ref={listRef}
              tabIndex={0}
              onKeyDown={onListKeyDown}
              className="max-h-[70vh] overflow-y-auto border-r border-line outline-none focus:ring-2 focus:ring-inset focus:ring-brand/30"
            >
              {DIFF_ORDER.map((level) => {
                const group = filtered.filter((q) => q.difficulty === level);
                if (group.length === 0) return null;
                return (
                  <div key={level}>
                    <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-line-soft bg-line-soft/95 px-4 py-1.5 backdrop-blur">
                      <span className={`h-1.5 w-1.5 rounded-full ${metaFor(level).dot}`} />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                        {level}
                      </span>
                      <span className="text-[11px] font-semibold text-muted-soft">{group.length}</span>
                    </div>
                    {group.map((q) => {
                      const on = q.id === selectedId;
                      return (
                        <button
                          key={q.id}
                          type="button"
                          data-qid={q.id}
                          onClick={() => setSelectedId(q.id)}
                          className={`flex w-full items-start gap-2.5 border-b border-line-soft px-4 py-3 text-left transition ${
                            on
                              ? 'bg-brand-tint shadow-[inset_3px_0_0_0_var(--color-brand)]'
                              : 'hover:bg-line-soft'
                          }`}
                        >
                          <span className={`mt-1.5 h-1.5 w-1.5 flex-none rounded-full ${metaFor(q.difficulty).dot}`} />
                          <span
                            className={`text-sm leading-snug ${
                              on ? 'font-bold text-brand-dark' : 'text-ink-soft'
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
            <div className="max-h-[70vh] overflow-y-auto bg-brand-tint/25 p-7">
              {selected && (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${metaFor(selected.difficulty).chip}`}>
                      {selected.difficulty}
                    </span>
                    <span className="rounded-full bg-line-soft px-2.5 py-0.5 text-xs font-medium capitalize text-ink-soft">
                      {selected.frequency}
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl font-bold leading-snug text-ink">
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

                  <p className="mt-6 border-t border-line pt-3 text-xs text-muted-soft">
                    {pick('Tip: list mein ↑ ↓ arrow keys use karo.', 'Tip: use ↑ ↓ arrow keys in the list.')}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ── Mobile: accordion ───────────────────────────── */}
          <div className="lv-card mt-5 overflow-hidden lg:hidden">
            {DIFF_ORDER.map((level) => {
              const group = filtered.filter((q) => q.difficulty === level);
              if (group.length === 0) return null;
              return (
                <div key={level}>
                  <div className="flex items-center gap-2 border-b border-line-soft bg-line-soft px-4 py-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${metaFor(level).dot}`} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                      {level}
                    </span>
                    <span className="text-[11px] font-semibold text-muted-soft">{group.length}</span>
                  </div>
                  {group.map((q) => {
                    const open = openId === q.id;
                    return (
                      <div key={q.id} className="border-b border-line-soft">
                        <button
                          type="button"
                          onClick={() => setOpenId(open ? null : q.id)}
                          className={`flex w-full items-start gap-2.5 px-4 py-3 text-left transition ${
                            open ? 'bg-brand-tint' : ''
                          }`}
                        >
                          <span className={`mt-1.5 h-1.5 w-1.5 flex-none rounded-full ${metaFor(q.difficulty).dot}`} />
                          <span
                            className={`flex-1 text-sm font-medium leading-snug ${
                              open ? 'text-brand-dark' : 'text-ink'
                            }`}
                          >
                            {q.question}
                          </span>
                          <span
                            className={`mt-0.5 flex-none text-muted transition-transform ${open ? 'rotate-180' : ''}`}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </span>
                        </button>
                        {open && (
                          <div className="bg-brand-tint/40 px-4 pb-4 pt-1">
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
