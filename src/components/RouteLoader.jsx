'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);
  const showTimer = useRef(null);
  const failsafeTimer = useRef(null);

  // Start loader 120ms after an internal link click that will actually
  // navigate (skips fast/prefetched navigations).
  useEffect(() => {
    function onLinkClick(e) {
      // Only a primary, unmodified click triggers an in-app navigation.
      // Modified/middle clicks, new-tab links and already-handled clicks either
      // open a new tab or do nothing — showing the loader for them leaves it
      // stuck because the pathname never changes.
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const a = e.target.closest('a[href]');
      if (!a) return;
      if (a.target && a.target !== '_self') return; // opens a new tab/window
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('/') || href.startsWith('//')) return;
      // Same-page link → no navigation will happen, so there is nothing to wait
      // for (this was the main cause of the badge getting stuck on screen).
      const dest = href.split('#')[0].split('?')[0] || '/';
      if (dest === window.location.pathname) return;

      clearTimeout(showTimer.current);
      showTimer.current = setTimeout(() => {
        setVisible(true);
        // Safety net: never let the badge linger if a navigation stalls or is
        // aborted before the pathname changes.
        clearTimeout(failsafeTimer.current);
        failsafeTimer.current = setTimeout(() => setVisible(false), 10000);
      }, 120);
    }
    document.addEventListener('click', onLinkClick);
    return () => {
      document.removeEventListener('click', onLinkClick);
      clearTimeout(showTimer.current);
      clearTimeout(failsafeTimer.current);
    };
  }, []);

  // Hide when navigation completes (pathname changes).
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    clearTimeout(showTimer.current);
    clearTimeout(failsafeTimer.current);
    setVisible(false);
  }, [pathname]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes lv-bar-fill {
          0%   { width: 0%; }
          60%  { width: 75%; }
          100% { width: 92%; }
        }
        @keyframes lv-badge-pulse {
          0%, 100% { transform: scale(1);    box-shadow: 0 0 0   0  rgba(79,70,229,0.50); }
          50%       { transform: scale(1.15); box-shadow: 0 0 16px 6px rgba(79,70,229,0.25); }
        }
      `}</style>

      {/* Thin top progress bar */}
      <div className="fixed inset-x-0 top-0 z-[9999] h-[3px] bg-indigo-100 dark:bg-indigo-950">
        <div
          className="h-full rounded-r-full bg-indigo-600"
          style={{ animation: 'lv-bar-fill 2.5s ease-out forwards' }}
        />
      </div>

      {/* Pulsing L badge (bottom-right) */}
      <div
        className="fixed bottom-6 right-6 z-[9998] grid h-11 w-11 place-items-center rounded-xl bg-indigo-600 text-xl font-extrabold text-white shadow-lg shadow-indigo-300/50 dark:shadow-indigo-900/50"
        style={{ animation: 'lv-badge-pulse 1s ease-in-out infinite' }}
        aria-hidden="true"
      >
        L
      </div>
    </>
  );
}
