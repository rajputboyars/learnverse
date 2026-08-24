import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import UserStats from '@/models/UserStats';
import Bookmark from '@/models/Bookmark';
import UserProgress from '@/models/UserProgress';
import Review from '@/models/Review';
import Notification from '@/models/Notification';
import { requireUser } from '@/lib/guards';

// GET /api/me → the signed-in user's own profile + preferences
export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const user = await User.findById(session.user.id).select('name email image emailNotifications').lean();
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({
    name: user.name,
    email: user.email,
    image: user.image,
    emailNotifications: user.emailNotifications !== false,
  });
}

// PATCH /api/me  { name?, emailNotifications? } → update profile/preferences
export async function PATCH(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  const body = await request.json();
  const update = {};
  if (typeof body.name === 'string') {
    const name = body.name.trim();
    if (!name) return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 });
    update.name = name;
  }
  if (typeof body.emailNotifications === 'boolean') {
    update.emailNotifications = body.emailNotifications;
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  await connectDB();
  const user = await User.findByIdAndUpdate(session.user.id, update, { new: true }).lean();
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // UserStats.name is denormalised for the leaderboard — keep it in sync.
  if (update.name) {
    await UserStats.updateOne({ userId: session.user.id }, { $set: { name: update.name } });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
    emailNotifications: user.emailNotifications !== false,
  });
}

// DELETE /api/me → permanently delete the account and its personal data.
// Public content the user posted (comments, discussion replies) is left in
// place, same as most platforms — only the account and its private records
// (stats, bookmarks, progress, reviews, notifications) are removed.
export async function DELETE() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const userId = session.user.id;

  await Promise.all([
    UserStats.deleteOne({ userId }),
    Bookmark.deleteMany({ userId }),
    UserProgress.deleteMany({ userId }),
    Review.deleteMany({ userId }),
    Notification.deleteMany({ userId }),
  ]);
  await User.findByIdAndDelete(userId);

  return NextResponse.json({ ok: true });
}
