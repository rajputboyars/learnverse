'use client';

import { useEffect, useState } from 'react';

// Shared light/dark toggle logic (DOM class + localStorage), used by both
// the navbar's icon toggle and the Settings page's segmented control.
export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function setTheme(next) {
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  }

  return { dark, setTheme, toggle: () => setTheme(!dark) };
}
