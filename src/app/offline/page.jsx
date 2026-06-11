import Link from 'next/link';

export const metadata = { title: 'Offline' };

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center dark:bg-slate-950">
      <p className="text-5xl">📡</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">You are offline</h1>
      <p className="mt-2 max-w-sm text-slate-500">
        Internet connection nahi mil raha. Jo pages tumne pehle khole hain wo offline bhi
        dikh sakte hain — phir se connect hone par sab kuch chalega.
      </p>
      <Link href="/" className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">
        Try home
      </Link>
    </div>
  );
}
