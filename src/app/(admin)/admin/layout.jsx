import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function AdminLayout({ children }) {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/admin/dashboard');
  if (session.user.role !== 'admin') redirect('/');

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r border-slate-200 bg-slate-50 p-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-sm text-white">L</span>
          Learnverse
        </Link>
        <p className="mt-1 text-xs text-slate-400">Admin</p>
        <nav className="mt-6 space-y-1 text-sm font-medium text-slate-600">
          <Link href="/admin/dashboard" className="block rounded-md px-3 py-2 hover:bg-slate-100">Dashboard</Link>
          <Link href="/admin/courses" className="block rounded-md px-3 py-2 hover:bg-slate-100">Courses</Link>
          <Link href="/admin/concepts" className="block rounded-md px-3 py-2 hover:bg-slate-100">Concepts</Link>
          <Link href="/admin/concepts/new" className="block rounded-md px-3 py-2 hover:bg-slate-100">+ New concept</Link>
          <Link href="/admin/interview-questions" className="block rounded-md px-3 py-2 hover:bg-slate-100">Interview Qs</Link>
          <Link href="/" className="mt-4 block rounded-md px-3 py-2 text-slate-400 hover:bg-slate-100">← Back to site</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-white p-6 sm:p-8">{children}</main>
    </div>
  );
}
