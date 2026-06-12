'use client';

import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

export default function NotFound() {
  const { pick } = useLang();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-indigo-600">404</p>
      <h1 className="mt-4 text-xl font-semibold">{pick('Page nahi mila', 'Page not found')}</h1>
      <p className="mt-2 text-slate-500">{pick('Jo dhoond rahe ho wo yahan nahi hai.', 'What you’re looking for isn’t here.')}</p>
      <Link href="/" className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">
        {pick('Home jao', 'Go home')}
      </Link>
    </div>
  );
}
