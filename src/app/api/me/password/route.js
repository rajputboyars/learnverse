import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { requireUser } from '@/lib/guards';

// PATCH /api/me/password  { currentPassword, newPassword }
export async function PATCH(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Current and new password are required' }, { status: 400 });
  }
  if (String(newPassword).length < 6) {
    return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
  }

  await connectDB();
  const user = await User.findById(session.user.id);
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const ok = await bcrypt.compare(String(currentPassword), user.passwordHash);
  if (!ok) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });

  user.passwordHash = await bcrypt.hash(String(newPassword), 10);
  await user.save();

  return NextResponse.json({ ok: true });
}
