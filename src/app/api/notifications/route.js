import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Notification from '@/models/Notification';
import { requireUser } from '@/lib/guards';

// GET /api/notifications → recent notifications + unread count
export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const userId = session.user.id;
  const [items, unread] = await Promise.all([
    Notification.find({ userId }).sort({ createdAt: -1 }).limit(30).lean(),
    Notification.countDocuments({ userId, read: false }),
  ]);
  return NextResponse.json({
    unread,
    items: items.map((n) => ({
      _id: n._id.toString(),
      actorName: n.actorName,
      type: n.type,
      message: n.message,
      link: n.link,
      read: n.read,
      createdAt: n.createdAt,
    })),
  });
}

// POST /api/notifications  → mark all as read
export async function POST() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  await Notification.updateMany({ userId: session.user.id, read: false }, { $set: { read: true } });
  return NextResponse.json({ ok: true });
}
