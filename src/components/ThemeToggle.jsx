'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
      className="rounded-md p-1.5 text-lg hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
