'use client';

import { cloneElement, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import NotificationBell from './NotificationBell';
import SearchBox from './SearchBox';
import { useLang } from './LanguageProvider';
import { ROADMAPS } from '@/data/roadmaps';
import Icon from '@/components/Icon';

// Shared site container — keep in sync with Footer & page wrappers so
// header, content and footer all line up at the same edges.
const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

export default function Navbar() {
  const { data: session } = useSession();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [qSummary, setQSummary] = useState(null);

  // Fetch courses once for the "Courses" / "Interview" hover dropdowns
  useEffect(() => {
    let alive = true;
    fetch('/api/courses')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => { if (alive && Array.isArray(data)) setCourses(data); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  // Counts for the Interview panel — fetched once, the first time it opens.
  function loadQuestionSummary() {
    if (qSummary) return;
    fetch('/api/interview-questions/summary')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.levels) setQSummary(d); })
      .catch(() => {});
  }

  const NAV_LINKS = [
    { href: '/courses',            label: t('nav.courses') },
    { href: '/challenges',         label: t('nav.challenges') },
    { href: '/roadmaps',           label: t('nav.roadmaps') },
    { href: '/interview-questions',label: t('nav.interview') },
    { href: '/leaderboard',        label: t('nav.leaderboard') },
    { href: '/resume',             label: t('nav.resume') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">

      {/* ══════════ Main header ══════════ */}
      <div className={`${SHELL} flex h-14 items-center gap-3`}>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2 text-base font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-sm text-white">L</span>
          <span className="hidden sm:block">Learnverse</span>
        </Link>

        {/* Search — full width, grows to fill the header */}
        <div className="hidden flex-1 sm:block">
          <SearchBox placeholder={t('nav.search')} className="w-full" />
        </div>

        {/* Right-side controls */}
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:ml-0">
          <NotificationBell />
          <LanguageToggle />
          <ThemeToggle />

          {session?.user ? (
            <div className="hidden items-center gap-1 sm:flex">
              {session.user.role === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  className="rounded-md px-2 py-1 text-xs text-indigo-600 hover:bg-indigo-50"
                >
                  {t('nav.admin')}
                </Link>
              )}
              <Link href="/dashboard" className="rounded-md px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                {session.user.name?.split(' ')[0] || 'Me'}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="whitespace-nowrap rounded-md border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-1 sm:flex">
              <Link
                href="/login"
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {t('nav.login')}
              </Link>
              <Link
                href="/register"
                className="whitespace-nowrap rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
              >
                {t('nav.signup')}
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="rounded-md p-2 text-lg hover:bg-slate-100 dark:hover:bg-slate-800 sm:hidden"
          >
            <Icon name={open ? 'x' : 'bars'} />
          </button>
        </div>
      </div>

      {/* ══════════ Sub header (secondary nav) ══════════ */}
      <div className="hidden border-t border-slate-100 bg-white/60 dark:border-slate-800 dark:bg-slate-900/60 sm:block">
        {/* `relative` makes this the positioning context for the full-width dropdowns */}
        <nav className={`${SHELL} relative flex h-11 items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300`}>

          {/* Courses — grouped by level, not 45 tiles in a scrolling grid */}
          <NavDropdown href="/courses" label={t('nav.courses')}>
            <CoursesPanel courses={courses} emptyLabel={t('home.courses.empty')} />
          </NavDropdown>

          <NavLink href="/challenges">{t('nav.challenges')}</NavLink>

          {/* Roadmaps */}
          <NavDropdown href="/roadmaps" label={t('nav.roadmaps')}>
            <DropdownGrid
              items={ROADMAPS}
              hrefFor={(r) => `/roadmaps/${r.slug}`}
              keyFor={(r) => r.slug}
              icon={(r) => r.icon}
              title={(r) => r.title}
              sub={(r) => r.duration}
              footerHref="/roadmaps"
              footerLabel={t('nav.roadmaps')}
            />
          </NavDropdown>

          {/* Interview — by level and by weight, not a copy of the course list */}
          <NavDropdown href="/interview-questions" label={t('nav.interview')} onOpen={loadQuestionSummary}>
            <InterviewPanel summary={qSummary} courses={courses} />
          </NavDropdown>

          <NavLink href="/leaderboard">{t('nav.leaderboard')}</NavLink>
          <NavLink href="/resume">{t('nav.resume')}</NavLink>
          {session?.user && <NavLink href="/revise">{t('nav.revise')}</NavLink>}
        </nav>
      </div>

      {/* ══════════ Mobile drawer ══════════ */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:hidden">
          <div className="mb-3">
            <SearchBox placeholder={t('nav.search')} className="w-full" />
          </div>
          <div className="flex flex-col gap-0.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {l.label}
              </Link>
            ))}
            {session?.user && (
              <Link href="/revise" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                {t('nav.revise')}
              </Link>
            )}

            <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

            {session?.user ? (
              <>
                {session.user.role === 'admin' && (
                  <Link href="/admin/dashboard" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-indigo-600 hover:bg-indigo-50">
                    {t('nav.admin')}
                  </Link>
                )}
                <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                  {t('nav.dashboard')}
                </Link>
                <button
                  onClick={() => { setOpen(false); signOut({ callbackUrl: '/' }); }}
                  className="rounded-md px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-center hover:bg-slate-50"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-center text-white hover:bg-indigo-700"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Sub-header nav link ── */
function NavLink({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`flex h-full items-center whitespace-nowrap rounded-md px-3 hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800 ${className}`}
    >
      {children}
    </Link>
  );
}

/* ── Hover dropdown (trigger + full-width mega panel) ──
   The panel is positioned against the sub-header <nav> (inset-x-0), so it always
   spans the shell width and can never push the page into a horizontal scroll.
   JS-controlled (not pure CSS :hover) so a click can close it immediately on
   navigation instead of leaving it hovering over the new page. */
function NavDropdown({ href, label, children, onOpen }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const pathname = usePathname();

  // Safety net: always close on route change, even if the mouse never left.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function openNow() {
    clearTimeout(closeTimer.current);
    onOpen?.();
    setOpen(true);
  }
  function closeSoon() {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }
  function closeNow() {
    clearTimeout(closeTimer.current);
    setOpen(false);
  }

  return (
    <div
      className="static flex h-full items-center"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <Link
        href={href}
        onClick={closeNow}
        aria-expanded={open}
        className={`flex h-full items-center gap-1 whitespace-nowrap rounded-md px-3 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400 ${
          open ? 'bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400' : ''
        }`}
      >
        {label}
        <Icon
          name="chevron-down"
          className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </Link>

      {/* Full-width panel, aligned to the sub-header row */}
      <div
        className={`absolute inset-x-0 top-full z-40 transition-all duration-200 ease-out ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-b-2xl border-t border-slate-200 bg-white shadow-2xl ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-900 dark:ring-white/10">
          <div className="px-4 py-5 sm:px-6 lg:px-8">
            {cloneElement(children, { onNavigate: closeNow })}
          </div>
        </div>
      </div>
    </div>
  );
}


/* -- Courses panel: three level columns of compact rows --
   45 courses in one flat grid is a search result, not a menu. Grouping by the
   level the learner is at makes the list scannable without scrolling a panel
   that closes the moment the pointer leaves it. */
const LEVEL_COLUMNS = [
  { key: 'beginner', label: 'Beginner', dot: 'bg-emerald-500' },
  { key: 'intermediate', label: 'Intermediate', dot: 'bg-amber-500' },
  { key: 'advanced', label: 'Advanced', dot: 'bg-red-500' },
];
const PER_COLUMN = 6;

function CoursesPanel({ courses = [], emptyLabel = '', onNavigate }) {
  if (courses.length === 0) {
    return <p className="px-2 py-6 text-center text-sm text-slate-400">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:pr-6">
        {LEVEL_COLUMNS.map((col) => {
          const all = courses.filter((c) => (c.difficulty || 'beginner') === col.key);
          if (all.length === 0) return null;
          const shown = all.slice(0, PER_COLUMN);
          const rest = all.length - shown.length;

          return (
            <div key={col.key} className="flex flex-col gap-0.5">
              <p className="flex items-center gap-2 px-2.5 pb-2">
                <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {col.label}
                </span>
                <span className="ml-auto text-[10.5px] text-slate-300">{all.length}</span>
              </p>

              {shown.map((c) => (
                <Link
                  key={c._id || c.slug}
                  href={`/courses/${c.slug}`}
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-indigo-50/70 dark:hover:bg-slate-800/70"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-slate-50 dark:bg-slate-800">
                    <Icon name={c.icon} brand className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate text-[13.5px] font-medium text-slate-700 dark:text-slate-300">
                    {c.title}
                  </span>
                </Link>
              ))}

              {rest > 0 && (
                <Link
                  href="/courses"
                  onClick={onNavigate}
                  className="px-2.5 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  + {rest} more
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2.5 lg:w-[280px] lg:shrink-0 lg:flex-col lg:border-l lg:border-slate-100 lg:pl-6 dark:lg:border-slate-800">
        <Link
          href="/courses"
          onClick={onNavigate}
          className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-3 transition hover:border-indigo-300 dark:border-slate-700"
        >
          <Icon name="book" className="h-4 w-4 shrink-0 text-indigo-600" />
          <span className="flex-1 truncate text-[13.5px] font-semibold">All {courses.length} courses</span>
          <Icon name="arrow-right" className="h-3 w-3 shrink-0 text-slate-300" />
        </Link>
        <Link
          href="/roadmaps"
          onClick={onNavigate}
          className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-3 transition hover:border-indigo-300 dark:border-slate-700"
        >
          <Icon name="map" className="h-4 w-4 shrink-0 text-indigo-600" />
          <span className="flex-1 truncate text-[13.5px] font-semibold">Follow a roadmap</span>
          <Icon name="arrow-right" className="h-3 w-3 shrink-0 text-slate-300" />
        </Link>
      </div>
    </div>
  );
}

/* -- Interview panel: by level, then by weight --
   It used to render the same 45 course tiles as the Courses panel. Counts come
   from /api/interview-questions/summary, fetched the first time the panel
   opens; until they land the rows still work, just without numbers. */
const Q_LEVELS = [
  { key: 'easy', label: 'Easy', dot: 'bg-emerald-500', tint: 'bg-emerald-50' },
  { key: 'medium', label: 'Medium', dot: 'bg-amber-500', tint: 'bg-amber-50' },
  { key: 'hard', label: 'Hard', dot: 'bg-red-500', tint: 'bg-red-50' },
];

function InterviewPanel({ summary, courses = [], onNavigate }) {
  const top = summary?.topCourses?.length
    ? summary.topCourses
    : courses.slice(0, 9).map((c) => ({ title: c.title, slug: c.slug, icon: c.icon, n: null }));

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="flex flex-col gap-0.5 lg:w-[300px] lg:shrink-0 lg:border-r lg:border-slate-100 lg:pr-6 dark:lg:border-slate-800">
        <p className="px-2.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          By level
        </p>
        {Q_LEVELS.map((l) => (
          <Link
            key={l.key}
            href={`/interview-questions?difficulty=${l.key}`}
            onClick={onNavigate}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-indigo-50/70 dark:hover:bg-slate-800/70"
          >
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg ${l.tint} dark:bg-slate-800`}>
              <span className={`h-2 w-2 rounded-full ${l.dot}`} />
            </span>
            <span className="flex-1 text-[13.5px] font-medium text-slate-700 dark:text-slate-300">{l.label}</span>
            {summary && (
              <span className="text-[11px] text-slate-400">{summary.levels[l.key].toLocaleString()}</span>
            )}
          </Link>
        ))}

        <p className="px-2.5 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Practice
        </p>
        <Link
          href="/courses"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-indigo-50/70 dark:hover:bg-slate-800/70"
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-indigo-50 dark:bg-slate-800">
            <Icon name="microphone" className="h-3.5 w-3.5 text-indigo-600" />
          </span>
          <span className="flex-1 text-[13.5px] font-medium text-slate-700 dark:text-slate-300">Mock interview</span>
        </Link>
        <Link
          href="/revise"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-indigo-50/70 dark:hover:bg-slate-800/70"
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-indigo-50 dark:bg-slate-800">
            <Icon name="repeat" className="h-3.5 w-3.5 text-indigo-600" />
          </span>
          <span className="flex-1 text-[13.5px] font-medium text-slate-700 dark:text-slate-300">Revision deck</span>
        </Link>
      </div>

      <div className={`flex-1 ${top.length === 0 ? 'hidden' : ''}`}>
        <p className="flex items-center gap-2 px-2.5 pb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Most questions
          </span>
          <Link
            href="/interview-questions"
            onClick={onNavigate}
            className="ml-auto text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            All {summary?.courseCount || courses.length} courses &rarr;
          </Link>
        </p>
        <div className="grid gap-x-4 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((c) => (
            <Link
              key={c.slug}
              href={`/interview-questions?course=${c.slug}`}
              onClick={onNavigate}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-indigo-50/70 dark:hover:bg-slate-800/70"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-slate-50 dark:bg-slate-800">
                <Icon name={c.icon} brand className="h-3.5 w-3.5" />
              </span>
              <span className="truncate text-[13.5px] font-medium text-slate-700 dark:text-slate-300">
                {c.title}
              </span>
              {c.n !== null && <span className="ml-auto text-[11px] text-slate-400">{c.n}</span>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -- Reusable dropdown grid -- */
function DropdownGrid({
  items = [], empty = false, emptyLabel = '',
  hrefFor, keyFor, icon, title, sub, subClass = '',
  footerHref, footerLabel, onNavigate,
}) {
  return (
    <>
      {empty ? (
        <p className="px-2 py-6 text-center text-sm text-slate-400">{emptyLabel}</p>
      ) : (
        <div className="grid max-h-[70vh] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((it) => (
            <Link
              key={keyFor(it)}
              href={hrefFor(it)}
              onClick={onNavigate}
              className="group/item flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-150 hover:border-indigo-100 hover:bg-indigo-50/70 hover:shadow-sm dark:hover:border-slate-700 dark:hover:bg-slate-800/70"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-lg leading-none ring-1 ring-indigo-100 transition-colors group-hover/item:bg-white group-hover/item:ring-indigo-300 dark:bg-slate-800 dark:ring-slate-700 dark:group-hover/item:bg-slate-900 dark:group-hover/item:ring-indigo-500/40">
                <Icon name={icon(it)} brand className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-slate-800 transition-colors group-hover/item:text-indigo-700 dark:text-slate-100 dark:group-hover/item:text-indigo-300">
                  {title(it)}
                </span>
                <span className={`block truncate text-xs text-slate-400 ${subClass}`}>{sub(it)}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
      {footerHref && (
        <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
          <Link
            href={footerHref}
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            {footerLabel}
            <Icon name="arrow-right" className="h-3 w-3" />
          </Link>
        </div>
      )}
    </>
  );
}
