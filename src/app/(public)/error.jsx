'use client';

import Link from 'next/link';

export default function Error({ reset }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="text-5xl">😵</p>
      <h1 className="mt-4 text-xl font-semibold">Kuch gadbad ho gayi</h1>
      <p className="mt-2 text-slate-500">
        Page load karte waqt ek error aaya. Dobara try karo.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
        >
          Try again
        </button>
        <Link href="/" className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50">
          Go home
        </Link>
      </div>
    </div>
  );
}
