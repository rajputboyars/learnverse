'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import NotificationBell from './NotificationBell';
import SearchBox from './SearchBox';
import { useLang } from './LanguageProvider';

export default function Navbar() {
  const { data: session } = useSession();
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { href: '/courses',            label: t('nav.courses') },
    { href: '/challenges',         label: t('nav.challenges') },
    { href: '/roadmaps',           label: t('nav.roadmaps') },
    { href: '/interview-questions',label: t('nav.interview') },
    { href: '/leaderboard',        label: t('nav.leaderboard') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4">

        {/* ── Logo ── */}
        <Link href="/" className="flex shrink-0 items-center gap-2 text-base font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-sm text-white">L</span>
          <span className="hidden sm:block">Learnverse</span>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden flex-1 items-center justify-between gap-1 text-sm font-medium text-slate-600 sm:flex">

          {/* Search — grows up to 200px on lg */}
          <SearchBox
            placeholder={t('nav.search')}
            className="w-36 lg:w-48"
          />

          {/* Primary links */}
          <div className="flex items-center gap-0.5">
            <NavLink href="/courses">{t('nav.courses')}</NavLink>
            <NavLink href="/challenges" className="hidden md:block">{t('nav.challenges')}</NavLink>
            <NavLink href="/roadmaps"   className="hidden lg:block">{t('nav.roadmaps')}</NavLink>
            <NavLink href="/interview-questions" className="hidden lg:block">{t('nav.interview')}</NavLink>
            <NavLink href="/resume"     className="hidden xl:block">{t('nav.resume')}</NavLink>
            <NavLink href="/leaderboard" className="hidden xl:block">{t('nav.leaderboard')}</NavLink>
            {session?.user && (
              <NavLink href="/revise"   className="hidden xl:block">{t('nav.revise')}</NavLink>
            )}
          </div>

          {/* Right-side controls */}
          <div className="flex shrink-0 items-center gap-1">
            <NotificationBell />
            <LanguageToggle />
            <ThemeToggle />

            {session?.user ? (
              <>
                {session.user.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    className="rounded-md px-2 py-1 text-xs text-indigo-600 hover:bg-indigo-50"
                  >
                    {t('nav.admin')}
                  </Link>
                )}
                <Link href="/dashboard" className="rounded-md px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">
                  {session.user.name?.split(' ')[0] || 'Me'}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="whitespace-nowrap rounded-md border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="whitespace-nowrap rounded-md px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/register"
                  className="whitespace-nowrap rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700"
                >
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ── Mobile right controls ── */}
        <div className="flex items-center gap-1 sm:hidden">
          <LanguageToggle />
          <NotificationBell />
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="rounded-md p-2 text-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
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
            <Link href="/resume" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">
              {t('nav.resume')}
            </Link>

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

/* ── Shared nav link ── */
function NavLink({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-md px-2.5 py-1.5 hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800 ${className}`}
    >
      {children}
    </Link>
  );
}
