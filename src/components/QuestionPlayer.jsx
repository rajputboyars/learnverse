'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import ConceptAnimation from './ConceptAnimation';
import Icon from '@/components/Icon';

const ORDER = ['easy', 'medium', 'hard'];

const DIFF = {
  easy: { dot: 'bg-emerald-500', chip: 'bg-emerald-50 text-emerald-700' },
  medium: { dot: 'bg-amber-500', chip: 'bg-amber-50 text-amber-700' },
  hard: { dot: 'bg-red-500', chip: 'bg-red-50 text-red-700' },
};

const MILESTONE_EVERY = 10;
const AUTOPLAY_MS = 9000;

// Split-pane bounds: below MIN the titles stop being readable, above MAX the
// answer column drops under its comfortable measure.
const MIN_W = 240;
const MAX_W = 560;
const DEFAULT_W = 340;

const seenKey = (slug) => `learnverse_seen_${slug}`;
const WIDTH_KEY = 'learnverse_qplayer_width';

export default function QuestionPlayer({ course, questions, sources = [], startId = null }) {
  const { lang, pick } = useLang();

  const startIndex = Math.max(0, questions.findIndex((q) => q.id === startId));
  const [index, setIndex] = useState(startIndex);
  const [listWidth, setListWidth] = useState(DEFAULT_W);
  const [dragging, setDragging] = useState(false);
  const [mobileList, setMobileList] = useState(false);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [seen, setSeen] = useState(() => new Set());
  const [run, setRun] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [milestone, setMilestone] = useState(null);
  const [deep, setDeep] = useState(false);

  const shellRef = useRef(null);
  const cardRef = useRef(null);
  const listRef = useRef(null);
  const searchRef = useRef(null);

  const current = questions[index] || null;

  useEffect(() => {
    try {
      setSeen(new Set(JSON.parse(localStorage.getItem(seenKey(course.slug)) || '[]')));
      const w = Number(localStorage.getItem(WIDTH_KEY));
      if (Number.isFinite(w) && w >= MIN_W && w <= MAX_W) setListWidth(w);
    } catch {}
  }, [course.slug]);

  /* ── the divider you drag ── */
  const startDrag = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    document.body.classList.add('resizing');

    const move = (ev) => {
      const left = shellRef.current?.getBoundingClientRect().left ?? 0;
      setListWidth(Math.min(MAX_W, Math.max(MIN_W, Math.round(ev.clientX - left))));
    };
    const stop = () => {
      setDragging(false);
      document.body.classList.remove('resizing');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
      setListWidth((w) => {
        try { localStorage.setItem(WIDTH_KEY, String(w)); } catch {}
        return w;
      });
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
  }, []);

  // A real separator: focusable, and resizable from the keyboard too.
  const dividerKey = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    e.stopPropagation();
    setListWidth((w) => {
      const next = Math.min(MAX_W, Math.max(MIN_W, w + (e.key === 'ArrowRight' ? 24 : -24)));
      try { localStorage.setItem(WIDTH_KEY, String(next)); } catch {}
      return next;
    });
  };

  const resetWidth = () => {
    setListWidth(DEFAULT_W);
    try { localStorage.setItem(WIDTH_KEY, String(DEFAULT_W)); } catch {}
  };

  useEffect(() => {
    if (!current) return;
    setSeen((prev) => {
      if (prev.has(current.id)) return prev;
      const next = new Set(prev).add(current.id);
      try { localStorage.setItem(seenKey(course.slug), JSON.stringify([...next])); } catch {}
      return next;
    });
  }, [current, course.slug]);

  const go = useCallback((delta) => {
    setIndex((i) => {
      const next = Math.min(questions.length - 1, Math.max(0, i + delta));
      if (next !== i) {
        setDeep(false);
        cardRef.current?.scrollTo?.({ top: 0 });
      }
      return next;
    });
    if (delta > 0) {
      setRun((r) => {
        const next = r + 1;
        if (next % MILESTONE_EVERY === 0) setMilestone(next);
        return next;
      });
    }
  }, [questions.length]);

  const jump = useCallback((id) => {
    const i = questions.findIndex((q) => q.id === id);
    if (i >= 0) { setIndex(i); setDeep(false); setMobileList(false); }
  }, [questions]);

  useEffect(() => {
    if (milestone === null) return;
    const t = setTimeout(() => setMilestone(null), 4000);
    return () => clearTimeout(t);
  }, [milestone]);

  useEffect(() => {
    if (!autoplay || !current) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [autoplay, current, go]);

  useEffect(() => {
    function onKey(e) {
      const typing = ['INPUT', 'TEXTAREA'].includes(e.target?.tagName);
      if (e.key === '/' && !typing) { e.preventDefault(); searchRef.current?.focus(); return; }
      if (typing || e.target?.getAttribute?.('role') === 'separator') return;
      if (e.code === 'Space' || e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  useEffect(() => {
    if (!current) return;
    listRef.current?.querySelector(`[data-qid="${current.id}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [current]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return questions.filter((q) => {
      if (level !== 'all' && q.difficulty !== level) return false;
      if (!term) return true;
      return q.question.toLowerCase().includes(term);
    });
  }, [questions, search, level]);

  const grouped = useMemo(
    () => ORDER
      .map((l) => ({ level: l, items: filtered.filter((q) => q.difficulty === l) }))
      .filter((g) => g.items.length),
    [filtered]
  );

  const seenCount = seen.size;
  const pct = questions.length ? Math.round((seenCount / questions.length) * 100) : 0;
  const questionSources = current?.sources?.length ? current.sources : sources;

  if (!current) return null;

  const answer = lang === 'hi' && current.hinglish ? current.hinglish : current.english;

  /* The same list markup serves the desktop pane and the mobile sheet. */
  const listBody = (
    <>
      <div className="flex flex-col gap-2.5 border-b border-slate-200 p-3">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
          <Icon name="search" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <input
            ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={pick('Dhundo…', 'Search…')}
            className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <span className="shrink-0 font-mono text-[10px] text-slate-300">/</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {['all', ...ORDER].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize transition ${
                level === l
                  ? 'bg-slate-900 text-white dark:bg-slate-700'
                  : 'border border-slate-200 text-slate-600 hover:border-indigo-300'
              }`}
            >
              {l === 'all' ? pick('Sab', 'All') : l}
            </button>
          ))}
        </div>
      </div>

      {/* overflow-y-scroll, not auto: a long list should look scrollable */}
      <div ref={listRef} className="thin-scroll min-h-0 flex-1 overflow-y-scroll">
        {grouped.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-slate-400">
            {pick('Kuch nahi mila.', 'Nothing matched.')}
          </p>
        )}
        {grouped.map((g) => (
          <div key={g.level}>
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-slate-100 bg-slate-50/95 px-4 py-1.5 backdrop-blur">
              <span className={`h-1.5 w-1.5 rounded-full ${DIFF[g.level].dot}`} />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{g.level}</span>
              <span className="ml-auto font-mono text-[10.5px] text-slate-400">{g.items.length}</span>
            </div>
            {g.items.map((q) => {
              const on = q.id === current.id;
              const done = seen.has(q.id);
              return (
                <button
                  key={q.id}
                  type="button"
                  data-qid={q.id}
                  onClick={() => jump(q.id)}
                  className={`flex w-full items-start gap-2.5 border-b border-slate-100 px-4 py-2.5 text-left transition ${
                    on ? 'bg-indigo-50 shadow-[inset_3px_0_0_0_#4f46e5]' : 'hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                      done ? 'bg-green-100' : on ? 'bg-indigo-600' : 'bg-slate-100'
                    }`}
                  >
                    {done && <Icon name="check" className="h-2 w-2 text-green-700" />}
                  </span>
                  <span
                    className={`flex-1 text-[13px] leading-snug ${
                      on ? 'font-semibold text-indigo-700' : done ? 'text-slate-400' : 'text-slate-700'
                    }`}
                  >
                    {q.question}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 px-4 py-3">
        <p className="mb-1.5 flex items-baseline text-[11px]">
          <span className="font-bold uppercase tracking-wider text-slate-400">{pick('Aaj', 'Today')}</span>
          <span className="ml-auto font-mono text-slate-500">{seenCount} / {questions.length}</span>
        </p>
        <span className="block h-1.5 overflow-hidden rounded-full bg-slate-100">
          <span className="block h-1.5 rounded-full bg-indigo-600 transition-all" style={{ width: `${pct}%` }} />
        </span>
      </div>
    </>
  );

  return (
    <div ref={shellRef} className="flex h-[calc(100vh-7rem)] bg-slate-50">

      {/* ══════════ List pane ══════════ */}
      <aside
        className="hidden min-h-0 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex dark:bg-slate-900"
        style={{ width: listWidth }}
      >
        {listBody}
      </aside>

      {/* ══════════ Drag to resize ══════════ */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label={pick('List ka size badlo', 'Resize the list')}
        aria-valuenow={listWidth}
        aria-valuemin={MIN_W}
        aria-valuemax={MAX_W}
        tabIndex={0}
        onPointerDown={startDrag}
        onKeyDown={dividerKey}
        onDoubleClick={resetWidth}
        title={pick('Kheencho · double-click se reset', 'Drag to resize · double-click to reset')}
        className={`group relative hidden w-1.5 shrink-0 cursor-col-resize transition-colors lg:block ${
          dragging ? 'bg-indigo-500' : 'bg-slate-200 hover:bg-indigo-300'
        } focus:outline-none focus-visible:bg-indigo-500`}
      >
        {/* a grab area wider than the visible line, so it is easy to catch */}
        <span className="absolute inset-y-0 -left-2 -right-2" />
        <span
          className={`pointer-events-none absolute left-1/2 top-1/2 h-8 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
            dragging ? 'bg-white' : 'bg-slate-400 group-hover:bg-white'
          }`}
        />
      </div>

      {/* ══════════ Reader ══════════ */}
      <main className="relative flex min-w-0 flex-1 flex-col">

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-200 bg-white px-4 py-2.5 sm:px-6 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setMobileList(true)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-500 lg:hidden"
            aria-label={pick('List kholo', 'Open the list')}
          >
            <Icon name="bars" className="h-4 w-4" />
          </button>

          <span className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5">
            <Icon name="fire" className="h-3.5 w-3.5 text-orange-500" />
            <span className="text-[13px] font-bold text-orange-700">
              {run} {pick('in a row', 'in a row')}
            </span>
          </span>

          <span className="hidden gap-[3px] sm:flex">
            {Array.from({ length: MILESTONE_EVERY }, (_, i) => (
              <span
                key={i}
                className={`h-1 w-5 rounded-full ${i < run % MILESTONE_EVERY ? 'bg-orange-400' : 'bg-slate-200'}`}
              />
            ))}
          </span>

          <span className="font-mono text-[11.5px] text-slate-400">
            +{seenCount * 5} XP {pick('is session mein', 'this session')}
          </span>

          <span className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAutoplay((a) => !a)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition ${
                autoplay ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500'
              }`}
            >
              <span className={`relative h-3.5 w-6 rounded-full transition ${autoplay ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                <span className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-all ${autoplay ? 'right-0.5' : 'left-0.5'}`} />
              </span>
              Autoplay
            </button>
            <Link
              href={`/mock-interview/${course.slug}`}
              className="hidden rounded-xl border border-slate-200 px-3.5 py-2 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 sm:block"
            >
              {pick('Mock', 'Mock')}
            </Link>
          </span>
        </div>

        {milestone !== null && (
          <div className="pointer-events-none absolute left-1/2 top-16 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-green-200 bg-green-50 px-5 py-2.5 shadow-sm">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-green-600">
              <Icon name="check" className="h-3 w-3 text-white" />
            </span>
            <span className="text-[13.5px] font-semibold text-green-800">
              {pick(`${milestone} ho gaye — chalte raho.`, `${milestone} done — keep going.`)}
            </span>
          </div>
        )}

        {/* the reader scrolls on its own, so the controls below stay put */}
        <div ref={cardRef} className="thin-scroll flex min-h-0 flex-1 justify-center overflow-y-auto px-4 py-6 sm:px-8">
          <div className="flex w-full max-w-[720px] flex-col gap-5">

            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${DIFF[current.difficulty]?.chip}`}>
                {current.difficulty}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold capitalize text-slate-600">
                {current.frequency}
              </span>
              <span className="ml-auto font-mono text-[11px] text-slate-400">
                {index + 1} / {questions.length}
              </span>
            </div>

            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-[32px]">{current.question}</h1>

            {answer && <p className="text-[17px] leading-relaxed text-slate-700">{answer}</p>}

            {current.codeExample?.code && (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <pre className="thin-scroll overflow-x-auto bg-slate-900 px-4 py-3.5 font-mono text-[12.5px] leading-relaxed text-slate-200">
                  <code>{current.codeExample.code}</code>
                </pre>
                {current.codeExample.output && (
                  <div className="border-t border-slate-700 bg-slate-950 px-4 py-2 font-mono text-[11.5px]">
                    <span className="text-slate-500">output › </span>
                    <span className="whitespace-pre-wrap text-emerald-400">{current.codeExample.output}</span>
                  </div>
                )}
              </div>
            )}

            {current.deepDive?.length > 0 && (
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setDeep((d) => !d)}
                  className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50/60 px-4 py-3 text-left transition hover:border-indigo-300"
                >
                  <Icon name="file" className="h-4 w-4 shrink-0 text-indigo-600" />
                  <span className="flex-1 text-sm font-semibold text-indigo-900">
                    {pick(
                      `Poora samajhna hai? ${current.deepDive.length} steps mein`,
                      `Want the full walkthrough? ${current.deepDive.length} steps`
                    )}
                  </span>
                  <Icon name="chevron-down" className={`h-3.5 w-3.5 text-indigo-500 transition ${deep ? 'rotate-180' : ''}`} />
                </button>

                {deep && (
                  <ol className="flex flex-col gap-5 border-l-2 border-indigo-100 pl-5">
                    {current.deepDive.map((sec, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[27px] top-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                          {i + 1}
                        </span>
                        {(sec.heading?.en || sec.heading?.hi) && (
                          <h3 className="text-[15px] font-bold">
                            {pick(sec.heading.hi || sec.heading.en, sec.heading.en || sec.heading.hi)}
                          </h3>
                        )}
                        {(sec.body?.en || sec.body?.hi) && (
                          <p className="mt-1.5 whitespace-pre-line text-[14.5px] leading-relaxed text-slate-700">
                            {pick(sec.body.hi || sec.body.en, sec.body.en || sec.body.hi)}
                          </p>
                        )}
                        {sec.diagram && (
                          <pre className="thin-scroll mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 font-mono text-[11.5px] leading-[1.55] text-slate-600">
                            <code>{sec.diagram}</code>
                          </pre>
                        )}
                        {sec.code && (
                          <pre className="thin-scroll mt-3 overflow-x-auto rounded-lg bg-slate-900 px-3.5 py-3 font-mono text-[12px] leading-relaxed text-slate-200">
                            <code>{sec.code}</code>
                          </pre>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}

            {deep && current.visual && <ConceptAnimation type={current.visual} />}

            {(current.conceptSlug || questionSources.length > 0) && (
              <div className="flex flex-col gap-2.5 border-t border-slate-200 pt-4">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                  {pick('Aur gehrai mein padho', 'Read deeper')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.conceptSlug && (
                    <Link
                      href={`/concepts/${current.conceptSlug}`}
                      className="flex items-center gap-2.5 rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-2 transition hover:border-indigo-300"
                    >
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-indigo-600 text-[9.5px] font-extrabold text-white">L</span>
                      <span className="flex flex-col">
                        <span className="text-[12.5px] font-semibold text-indigo-900">
                          {current.conceptTitle || pick('Concept padho', 'Read the concept')}
                        </span>
                        <span className="font-mono text-[9.5px] text-slate-400">learnverse</span>
                      </span>
                    </Link>
                  )}
                  {questionSources.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:border-indigo-300"
                    >
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-slate-100 text-[9.5px] font-extrabold text-slate-500">
                        {s.mark}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[12.5px] font-semibold text-slate-700">{s.label}</span>
                        <span className="font-mono text-[9.5px] text-slate-400">{s.host}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 justify-center border-t border-slate-200 bg-white px-4 py-4 sm:px-8 dark:bg-slate-900">
          <div className="flex w-full max-w-[720px] items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              className="flex items-center gap-2.5 rounded-2xl border border-slate-200 px-5 text-[14.5px] font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 sm:px-6"
              style={{ height: 52 }}
            >
              <Icon name="arrow-left" className="h-4 w-4" />
              <span className="hidden sm:inline">{pick('Peeche', 'Back')}</span>
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              disabled={index >= questions.length - 1}
              className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-indigo-600 text-[17px] font-bold text-white transition hover:bg-indigo-700 disabled:opacity-40"
              style={{ height: 52 }}
            >
              {pick('Keep going', 'Keep going')}
              <Icon name="arrow-right" className="h-4 w-4" />
              <span className="hidden font-mono text-[11px] font-medium opacity-70 sm:inline">space</span>
            </button>
          </div>
        </div>
      </main>

      {/* ══════════ Mobile sheet ══════════ */}
      {mobileList && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setMobileList(false)}
            className="absolute inset-0 bg-slate-900/40"
          />
          <div className="relative ml-auto flex h-full w-[88%] max-w-sm flex-col border-l border-slate-200 bg-white dark:bg-slate-900">
            <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 py-3.5">
              <span className="flex-1 font-bold">{course.title}</span>
              <button
                type="button"
                onClick={() => setMobileList(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200"
              >
                <Icon name="x" className="h-3.5 w-3.5 text-slate-500" />
              </button>
            </div>
            {listBody}
          </div>
        </div>
      )}
    </div>
  );
}
