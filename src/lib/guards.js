import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// Returns { session } or a NextResponse to return early.
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: NextResponse.json({ error: 'Login required' }, { status: 401 }) };
  }
  return { session };
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: NextResponse.json({ error: 'Login required' }, { status: 401 }) };
  }
  if (session.user.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Admin only' }, { status: 403 }) };
  }
  return { session };
}
