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

// Shared site container — keep in sync with Footer & page wrappers so
// header, content and footer all line up at the same edges.
const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

export default function Navbar() {
  const { data: session } = useSession();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  // Fetch courses once for the "Courses" / "Interview" hover dropdowns
  useEffect(() => {
    let alive = true;
    fetch('/api/courses')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => { if (alive && Array.isArray(data)) setCourses(data); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

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
              <Link href="/settings" aria-label="Settings" title={t('nav.settings')} className="rounded-md p-1.5 text-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                ⚙️
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
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* ══════════ Sub header (secondary nav) ══════════ */}
      <div className="hidden border-t border-slate-100 bg-white/60 dark:border-slate-800 dark:bg-slate-900/60 sm:block">
        {/* `relative` makes this the positioning context for the full-width dropdowns */}
        <nav className={`${SHELL} relative flex h-11 items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300`}>

          {/* Courses */}
          <NavDropdown href="/courses" label={t('nav.courses')}>
            <DropdownGrid
              empty={courses.length === 0}
              emptyLabel={t('home.courses.empty')}
              items={courses}
              hrefFor={(c) => `/courses/${c.slug}`}
              keyFor={(c) => c._id || c.slug}
              icon={(c) => c.icon}
              title={(c) => c.title}
              sub={(c) => c.difficulty}
              subClass="capitalize"
              footerHref="/courses"
              footerLabel={t('home.courses.viewAll')}
            />
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
              footerLabel={`${t('nav.roadmaps')} →`}
            />
          </NavDropdown>

          {/* Interview — practice by course */}
          <NavDropdown href="/interview-questions" label={t('nav.interview')}>
            <DropdownGrid
              empty={courses.length === 0}
              emptyLabel={t('home.courses.empty')}
              items={courses}
              hrefFor={(c) => `/interview-questions?course=${c.slug}`}
              keyFor={(c) => c._id || c.slug}
              icon={(c) => c.icon}
              title={(c) => c.title}
              sub={(c) => c.difficulty}
              subClass="capitalize"
              footerHref="/interview-questions"
              footerLabel={`${t('nav.interview')} →`}
            />
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
                <Link href="/settings" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                  {t('nav.settings')}
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
function NavDropdown({ href, label, children }) {
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
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
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

/* ── Reusable dropdown grid ── */
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
                {icon(it)}
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
          </Link>
        </div>
      )}
    </>
  );
}
