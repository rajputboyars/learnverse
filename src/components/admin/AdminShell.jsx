'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/Icon';

const LINKS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'chart' },
  { href: '/admin/courses', label: 'Courses', icon: 'book' },
  { href: '/admin/concepts', label: 'Concepts', icon: 'file' },
  { href: '/admin/concepts/new', label: 'New concept', icon: 'plus' },
  { href: '/admin/interview-questions', label: 'Interview Qs', icon: 'microphone' },
  { href: '/admin/prompts', label: 'Prompt moderation', icon: 'square-check' },
  { href: '/admin/trends', label: 'Trend snapshots', icon: 'chart-line' },
  { href: '/admin/reports', label: 'Reported content', icon: 'flag' },
  { href: '/admin/analytics', label: 'Platform analytics', icon: 'chart' },
];

/**
 * The admin chrome.
 *
 * The sidebar is permanent from `md` up and a drawer below it. A fixed 224px
 * rail beside the content left about 150px of usable width on a phone, which
 * made every table and form in here unreadable — moderation and snapshot
 * capture are things people do when they see a notification, wherever they are.
 */
export default function AdminShell({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on navigation, so following a link never leaves the drawer covering
  // the page it just opened.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes it, and the page behind must not scroll under the drawer.
  useEffect(() => {
    if (!open) return undefined;
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="min-h-screen md:flex">
      {/* Phone header — the only way to reach the nav below md */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4 md:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open admin menu"
          aria-expanded={open}
          className="-ml-2 rounded-lg p-2.5 text-slate-600 hover:bg-slate-100"
        >
          <Icon name="bars" className="h-4 w-4" />
        </button>
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-sm text-white">L</span>
          <span className="text-sm">Admin</span>
        </Link>
        <Link href="/" className="ml-auto text-sm text-slate-500 hover:text-indigo-600">
          Site
        </Link>
      </header>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50 p-4 transition-transform duration-200 md:static md:z-auto md:w-56 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-sm text-white">L</span>
            Learnverse
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close admin menu"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 md:hidden"
          >
            <Icon name="x" className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-400">Admin</p>

        <nav className="mt-6 space-y-0.5 text-sm font-medium text-slate-600">
          {LINKS.map((l) => {
            // `/admin/concepts` must not light up while on `/admin/concepts/new`.
            const active =
              pathname === l.href ||
              (l.href !== '/admin/concepts' && pathname.startsWith(`${l.href}/`));
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 ${
                  active ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-100'
                }`}
              >
                <Icon name={l.icon} className="h-3.5 w-3.5 shrink-0" />
                {l.label}
              </Link>
            );
          })}

          <Link href="/" className="mt-4 flex items-center gap-2.5 rounded-md px-3 py-2.5 text-slate-400 hover:bg-slate-100">
            <Icon name="arrow-left" className="h-3 w-3" />
            Back to site
          </Link>
        </nav>
      </aside>

      {/* min-w-0 lets wide tables scroll inside their own wrapper instead of
          stretching the flex row and pushing the page sideways. */}
      <main className="min-w-0 flex-1 bg-white p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
