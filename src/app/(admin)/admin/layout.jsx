import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AdminShell from '@/components/admin/AdminShell';

// The guard stays on the server: the check that matters is the one the browser
// cannot skip. AdminShell is only the chrome around it.
export default async function AdminLayout({ children }) {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/admin/dashboard');
  if (session.user.role !== 'admin') redirect('/');

  return <AdminShell>{children}</AdminShell>;
}
