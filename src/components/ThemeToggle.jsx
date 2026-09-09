'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-lg hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <Icon name={dark ? 'sun' : 'moon'} className="h-4 w-4" />
    </button>
  );
}
