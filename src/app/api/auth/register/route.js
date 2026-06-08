import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import UserStats from '@/models/UserStats';

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      );
    }
    if (String(password).length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const role = adminEmails.includes(normalizedEmail) ? 'admin' : 'user';

    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = await User.create({
      name,
      email: normalizedEmail,
      passwordHash,
      role,
    });

    // Create the stats row up front (0 XP, 0 streak).
    await UserStats.create({ userId: user._id, name: user.name });

    return NextResponse.json(
      { id: user._id.toString(), name: user.name, role: user.role },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
