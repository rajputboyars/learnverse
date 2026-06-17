'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DIFFICULTY_DOT = { easy: '#10b981', medium: '#f59e0b', hard: '#ef4444' };

export default function SearchBox({ placeholder = 'Search…', className = '' }) {
  const router = useRouter();
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState(null);  // null = idle, {} = loaded
  const [loading, setLoading] = useState(false);
  const [open, setOpen]       = useState(false);
  const [cursor, setCursor]   = useState(-1);    // keyboard nav index

  const containerRef = useRef(null);
  const inputRef     = useRef(null);
  const debounceRef  = useRef(null);

  // ── Fetch suggestions ────────────────────────────────────────────────────
  const fetchSuggestions = useCallback(async (q) => {
    if (q.length < 2) { setResults(null); setLoading(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce input → fetch
  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setCursor(-1);
    setOpen(true);
    clearTimeout(debounceRef.current);
    if (val.trim().length < 2) { setResults(null); return; }
    debounceRef.current = setTimeout(() => fetchSuggestions(val.trim()), 280);
  };

  // Close on outside click
  useEffect(() => {
    function onOutsideClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  // ── Build flat list for keyboard nav ─────────────────────────────────────
  const items = results
    ? [
        ...(results.courses   || []).map((c) => ({ type: 'course',   data: c })),
        ...(results.concepts  || []).map((c) => ({ type: 'concept',  data: c })),
        ...(results.questions || []).map((q) => ({ type: 'question', data: q })),
      ]
    : [];

  const hrefFor = (item) => {
    if (item.type === 'course')   return `/courses/${item.data.slug}`;
    if (item.type === 'concept')  return `/concepts/${item.data.slug}`;
    if (item.type === 'question') return item.data.courseSlug
      ? `/interview-questions?course=${item.data.courseSlug}`
      : '/interview-questions';
    return '/search';
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!open || !items.length) {
      if (e.key === 'Enter') {
        router.push(`/search?q=${encodeURIComponent(query)}`);
        setOpen(false);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (cursor >= 0 && items[cursor]) {
        router.push(hrefFor(items[cursor]));
        setOpen(false);
        setQuery('');
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setCursor(-1);
    }
  };

  const showDropdown = open && query.trim().length >= 2;
  const hasResults   = results && (items.length > 0);
  const isEmpty      = results && items.length === 0 && !loading;

  let globalIdx = -1; // track absolute index across sections

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input */}
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3 text-slate-400">
          {loading
            ? <Spinner />
            : <SearchIcon />
          }
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim().length >= 2 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-9 w-full rounded-full border border-slate-200 bg-white py-1.5 pl-9 pr-4 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-500"
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

          {/* Loading skeleton */}
          {loading && !results && (
            <div className="space-y-2 p-3">
              {[1,2,3].map((i) => (
                <div key={i} className="h-8 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
              ))}
            </div>
          )}

          {/* Empty state */}
          {isEmpty && (
            <p className="px-4 py-5 text-center text-sm text-slate-500">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {/* Results */}
          {hasResults && (
            <div className="max-h-[420px] overflow-y-auto">

              {/* Courses */}
              {results.courses?.length > 0 && (
                <Section label="Courses">
                  {results.courses.map((c) => {
                    globalIdx++;
                    const idx = globalIdx;
                    return (
                      <ResultRow
                        key={c.slug}
                        href={`/courses/${c.slug}`}
                        active={cursor === idx}
                        onHover={() => setCursor(idx)}
                        onSelect={() => { setOpen(false); setQuery(''); }}
                        left={<span className="text-xl">{c.icon}</span>}
                        label={c.title}
                        badge={<Badge color="indigo">Course</Badge>}
                      />
                    );
                  })}
                </Section>
              )}

              {/* Concepts */}
              {results.concepts?.length > 0 && (
                <Section label="Concepts">
                  {results.concepts.map((c) => {
                    globalIdx++;
                    const idx = globalIdx;
                    return (
                      <ResultRow
                        key={c.slug}
                        href={`/concepts/${c.slug}`}
                        active={cursor === idx}
                        onHover={() => setCursor(idx)}
                        onSelect={() => { setOpen(false); setQuery(''); }}
                        left={
                          <span
                            className="mt-1 h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: DIFFICULTY_DOT[c.difficulty] || '#94a3b8' }}
                          />
                        }
                        label={c.title}
                        badge={
                          c.course ? (
                            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
                              {c.course.icon} {c.course.title}
                            </span>
                          ) : null
                        }
                        sublabel={c.difficulty}
                      />
                    );
                  })}
                </Section>
              )}

              {/* Interview questions */}
              {results.questions?.length > 0 && (
                <Section label="Interview Questions">
                  {results.questions.map((q, qi) => {
                    globalIdx++;
                    const idx = globalIdx;
                    const href = q.courseSlug
                      ? `/interview-questions?course=${q.courseSlug}`
                      : '/interview-questions';
                    return (
                      <ResultRow
                        key={qi}
                        href={href}
                        active={cursor === idx}
                        onHover={() => setCursor(idx)}
                        onSelect={() => { setOpen(false); setQuery(''); }}
                        left={<span className="text-base">{q.courseIcon || '❓'}</span>}
                        label={q.question}
                        badge={<Badge color="amber">Q&amp;A</Badge>}
                      />
                    );
                  })}
                </Section>
              )}

              {/* See all link */}
              <div className="border-t border-slate-100 px-4 py-2.5 dark:border-slate-800">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => { setOpen(false); setQuery(''); }}
                  className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  <SearchIcon size={14} />
                  See all results for &ldquo;{query}&rdquo; →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function Section({ label, children }) {
  return (
    <div>
      <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {label}
      </p>
      {children}
    </div>
  );
}

function ResultRow({ href, active, onHover, onSelect, left, label, badge, sublabel }) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
        active
          ? 'bg-indigo-50 dark:bg-indigo-900/30'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800'
      }`}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-slate-400">
        {left}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-slate-800 dark:text-slate-100">
          {label}
        </span>
        {sublabel && (
          <span className="text-xs capitalize text-slate-400">{sublabel}</span>
        )}
      </span>
      {badge && <span className="shrink-0">{badge}</span>}
    </Link>
  );
}

function Badge({ color, children }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300',
    amber:  'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors[color] || colors.indigo}`}>
      {children}
    </span>
  );
}

function SearchIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width={15} height={15} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 20" strokeLinecap="round" />
    </svg>
  );
}
