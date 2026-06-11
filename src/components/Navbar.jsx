'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white">L</span>
          <span>Learnverse</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4 text-sm font-medium text-slate-600">
          <form action="/search" className="hidden md:block">
            <input
              name="q"
              placeholder="Search…"
              className="w-40 rounded-full border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-indigo-400 lg:w-52"
            />
          </form>
          <Link href="/courses" className="hidden sm:block hover:text-indigo-600">Courses</Link>
          <Link href="/roadmaps" className="hidden lg:block hover:text-indigo-600">Roadmaps</Link>
          <Link href="/interview-questions" className="hidden lg:block hover:text-indigo-600">Interview</Link>
          {session?.user && <Link href="/revise" className="hidden sm:block hover:text-indigo-600">Revise</Link>}
          <Link href="/leaderboard" className="hidden lg:block hover:text-indigo-600">Leaderboard</Link>
          <NotificationBell />
          <ThemeToggle />

          {session?.user ? (
            <div className="flex items-center gap-3">
              {session.user.role === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  className="rounded-md px-2 py-1 text-indigo-600 hover:bg-indigo-50"
                >
                  Admin
                </Link>
              )}
              <Link href="/dashboard" className="hover:text-indigo-600">
                {session.user.name?.split(' ')[0] || 'Me'}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-md border border-slate-200 px-3 py-1.5 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-md px-3 py-1.5 hover:bg-slate-50">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
