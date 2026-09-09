'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon';
import { useLang } from '@/components/LanguageProvider';

/**
 * The phone navigation bar.
 *
 * Five destinations, thumb-height, always in reach — the pattern people already
 * know from every app on their phone. It replaces hunting through the drawer
 * for the things they open most.
 *
 * Hidden from `sm` up, where the header nav does this job better.
 */
const TABS = [
  { href: '/feed', icon: 'bars', hi: 'Feed', en: 'Feed' },
  { href: '/swipe?deck=concepts', icon: 'layers', hi: 'Cards', en: 'Cards', match: (p, d) => p === '/swipe' && d !== 'quiz' },
  { href: '/swipe?deck=quiz', icon: 'question', hi: 'Quiz', en: 'Quiz', match: (p, d) => p === '/swipe' && d === 'quiz' },
  { href: '/ai', icon: 'sparkles', hi: 'AI', en: 'AI' },
  { href: '/dashboard', icon: 'chart', hi: 'Tum', en: 'You' },
];

export default function MobileTabBar() {
  const { pick } = useLang();
  const pathname = usePathname();
  const params = useSearchParams();
  const deck = params.get('deck');

  // Reading a concept, filling a form, or working through the admin area are
  // all full-attention tasks; a bar of exits across the bottom is noise there.
  const hidden =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/concepts/') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/certificate/');
  if (hidden) return null;

  return (
    <nav
      aria-label={pick('Main', 'Main')}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur sm:hidden dark:border-slate-800 dark:bg-slate-900/95"
      // Keep the bar clear of the home indicator on iPhones.
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <ul className="flex items-stretch">
        {TABS.map((tab) => {
          // Every href is fixed. Pointing "You" at /login for signed-out
          // visitors would differ between the server render (where the session
          // is still loading) and the client, which React reports as a
          // hydration mismatch — and the dashboard already greets a signed-out
          // visitor with a sign-up panel, so there is nothing to branch on.
          const href = tab.href;
          const active = tab.match
            ? tab.match(pathname, deck)
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                // 56px of height keeps every target above the 44px minimum a
                // thumb needs.
                className={`flex h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                  active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon name={tab.icon} className="h-4 w-4" />
                {pick(tab.hi, tab.en)}
                <span
                  aria-hidden
                  className={`h-0.5 w-6 rounded-full ${active ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-transparent'}`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
