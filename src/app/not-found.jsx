import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-indigo-600">404</p>
      <h1 className="mt-4 text-xl font-semibold">Page nahi mila</h1>
      <p className="mt-2 text-slate-500">Jo dhoond rahe ho wo yahan nahi hai.</p>
      <Link href="/" className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">
        Go home
      </Link>
    </div>
  );
}
