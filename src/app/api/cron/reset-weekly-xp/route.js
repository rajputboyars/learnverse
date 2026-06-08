import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import UserStats from '@/models/UserStats';

// Weekly leaderboard reset. Vercel Cron calls this with an
// Authorization: Bearer <CRON_SECRET> header (set CRON_SECRET in Vercel env).
export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get('authorization');
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const res = await UserStats.updateMany({}, { $set: { weeklyXP: 0 } });
    return NextResponse.json({
      ok: true,
      reset: res.modifiedCount ?? res.nModified ?? 0,
      at: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
