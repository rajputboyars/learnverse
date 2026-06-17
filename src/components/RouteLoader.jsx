'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);
  const showTimer = useRef(null);

  // Start loader 120ms after any internal link click (skips fast/prefetched navigations)
  useEffect(() => {
    function onLinkClick(e) {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('/') || href.startsWith('//')) return;
      clearTimeout(showTimer.current);
      showTimer.current = setTimeout(() => setVisible(true), 120);
    }
    document.addEventListener('click', onLinkClick);
    return () => {
      document.removeEventListener('click', onLinkClick);
      clearTimeout(showTimer.current);
    };
  }, []);

  // Hide when navigation completes
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    clearTimeout(showTimer.current);
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
