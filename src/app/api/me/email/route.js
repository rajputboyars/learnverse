import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { requireUser } from '@/lib/guards';

// PATCH /api/me/email  { newEmail, password } → password confirms it's really you
export async function PATCH(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { newEmail, password } = await request.json();

  if (!newEmail || !password) {
    return NextResponse.json({ error: 'New email and password are required' }, { status: 400 });
  }
  const normalizedEmail = String(newEmail).toLowerCase().trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 });
  }

  await connectDB();
  const user = await User.findById(session.user.id);
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) return NextResponse.json({ error: 'Password is incorrect' }, { status: 400 });

  if (normalizedEmail !== user.email) {
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }
    user.email = normalizedEmail;
    await user.save();
  }

  return NextResponse.json({ email: user.email });
}
