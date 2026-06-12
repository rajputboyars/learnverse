'use client';

import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

export default function Error({ reset }) {
  const { pick } = useLang();
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="text-5xl">😵</p>
      <h1 className="mt-4 text-xl font-semibold">{pick('Kuch gadbad ho gayi', 'Something went wrong')}</h1>
      <p className="mt-2 text-slate-500">
        {pick('Page load karte waqt ek error aaya. Dobara try karo.', 'An error occurred while loading the page. Please try again.')}
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
        >
          {pick('Dobara try karo', 'Try again')}
        </button>
        <Link href="/" className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">
          {pick('Home jao', 'Go home')}
        </Link>
      </div>
    </div>
  );
}
