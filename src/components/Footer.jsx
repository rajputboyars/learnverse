import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-800">Learnverse</p>
            <p className="mt-1 max-w-md">
              Bharat ke developers ke liye — concepts in Hinglish, with desi
              examples, code aur interview prep. Seekho easy way mein.
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/courses" className="hover:text-indigo-600">Courses</Link>
            <Link href="/interview-questions" className="hover:text-indigo-600">Interview</Link>
            <Link href="/leaderboard" className="hover:text-indigo-600">Leaderboard</Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          © {new Date().getFullYear()} Learnverse. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
