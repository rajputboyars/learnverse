import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/courses', label: 'Courses' },
  { href: '/admin/concepts', label: 'Concepts' },
  { href: '/admin/interview-questions', label: 'Interview Qs' },
  { href: '/admin/concepts/new', label: '+ New concept' },
];

export default async function AdminLayout({ children }) {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/admin/dashboard');
  if (session.user.role !== 'admin') redirect('/');

  const brand = (
    <Link href="/" className="flex items-center gap-2.5 font-bold text-ink">
      <span
        className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[9px] text-sm text-white"
        style={{ background: 'linear-gradient(150deg,var(--color-brand),var(--color-violet))' }}
      >
        L
      </span>
      Learnverse
      <span className="text-[11px] font-bold uppercase tracking-wide text-muted-soft">Admin</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-paper lg:flex">
      {/* Mobile: sticky header + horizontally scrolling nav chips.
          A fixed sidebar would leave almost no room for content at 375px. */}
      <header className="sticky top-0 z-30 border-b border-line bg-card/95 backdrop-blur lg:hidden">
        <div className="flex h-14 items-center px-5">{brand}</div>
        <div className="flex gap-2 overflow-x-auto px-5 pb-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="shrink-0 whitespace-nowrap rounded-full border border-line bg-card px-3.5 py-1.5 text-[13px] font-semibold text-ink-soft"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/" className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-muted-soft">
            ← Site
          </Link>
        </div>
      </header>

      {/* Desktop: persistent sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-line bg-card p-4 lg:block">
        {brand}
        <nav className="mt-6 space-y-1 text-sm font-semibold text-ink-soft">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="block rounded-xl px-3 py-2 hover:bg-brand-tint hover:text-brand-dark">
              {n.label}
            </Link>
          ))}
          <Link href="/" className="mt-4 block rounded-xl px-3 py-2 text-muted-soft hover:bg-line-soft">
            ← Back to site
          </Link>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
