'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';

const NAV_LINKS = [
  { href: '/courses', label: 'Courses' },
  { href: '/challenges', label: 'Challenges' },
  { href: '/roadmaps', label: 'Roadmaps' },
  { href: '/interview-questions', label: 'Interview' },
  { href: '/leaderboard', label: 'Leaderboard' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white">L</span>
          <span>Learnverse</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 text-sm font-medium text-slate-600 sm:flex sm:gap-4">
          <form action="/search" className="hidden md:block">
            <input
              name="q"
              placeholder="Search…"
              className="w-40 rounded-full border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-indigo-400 lg:w-52"
            />
          </form>
          <Link href="/courses" className="hover:text-indigo-600">Courses</Link>
          <Link href="/challenges" className="hidden md:block hover:text-indigo-600">Challenges</Link>
          <Link href="/roadmaps" className="hidden lg:block hover:text-indigo-600">Roadmaps</Link>
          <Link href="/interview-questions" className="hidden lg:block hover:text-indigo-600">Interview</Link>
          {session?.user && <Link href="/revise" className="hover:text-indigo-600">Revise</Link>}
          <Link href="/leaderboard" className="hidden lg:block hover:text-indigo-600">Leaderboard</Link>
          <NotificationBell />
          <ThemeToggle />

          {session?.user ? (
            <div className="flex items-center gap-3">
              {session.user.role === 'admin' && (
                <Link href="/admin/dashboard" className="rounded-md px-2 py-1 text-indigo-600 hover:bg-indigo-50">Admin</Link>
              )}
              <Link href="/dashboard" className="hover:text-indigo-600">{session.user.name?.split(' ')[0] || 'Me'}</Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="rounded-md border border-slate-200 px-3 py-1.5 hover:bg-slate-50">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-md px-3 py-1.5 hover:bg-slate-50">Login</Link>
              <Link href="/register" className="rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700">Sign up</Link>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 sm:hidden">
          <NotificationBell />
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="rounded-md p-2 text-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:hidden">
          <form action="/search" className="mb-3">
            <input name="q" placeholder="Search…" className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-400" />
          </form>
          <div className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">{l.label}</Link>
            ))}
            {session?.user && (
              <Link href="/revise" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">Revise</Link>
            )}
            <div className="my-2 border-t border-slate-100 dark:border-slate-800" />
            {session?.user ? (
              <>
                {session.user.role === 'admin' && (
                  <Link href="/admin/dashboard" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-indigo-600 hover:bg-indigo-50">Admin</Link>
                )}
                <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">Dashboard</Link>
                <button onClick={() => { setOpen(false); signOut({ callbackUrl: '/' }); }} className="rounded-md px-2 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800">Logout</button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-center">Login</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-center text-white">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
