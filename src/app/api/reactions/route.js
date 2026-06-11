import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Reaction from '@/models/Reaction';
import { auth } from '@/auth';
import { requireUser } from '@/lib/guards';

const TYPES = ['helpful', 'understood', 'fire'];

async function snapshot(conceptId, myId) {
  const [helpful, understood, fire] = await Promise.all([
    Reaction.countDocuments({ conceptId, type: 'helpful' }),
    Reaction.countDocuments({ conceptId, type: 'understood' }),
    Reaction.countDocuments({ conceptId, type: 'fire' }),
  ]);
  let mine = null;
  if (myId) {
    const r = await Reaction.findOne({ conceptId, userId: myId }).select('type').lean();
    mine = r?.type || null;
  }
  return { counts: { helpful, understood, fire }, mine };
}

// GET /api/reactions?conceptId=...
export async function GET(request) {
  await connectDB();
  const conceptId = request.nextUrl.searchParams.get('conceptId');
  if (!conceptId) return NextResponse.json({ error: 'conceptId required' }, { status: 400 });
  const session = await auth();
  return NextResponse.json(await snapshot(conceptId, session?.user?.id));
}

// POST /api/reactions  { conceptId, type }  → set / toggle / change reaction
export async function POST(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const { conceptId, type } = await request.json();
  if (!conceptId || !TYPES.includes(type)) {
    return NextResponse.json({ error: 'conceptId and valid type required' }, { status: 400 });
  }
  const existing = await Reaction.findOne({ conceptId, userId: session.user.id });
  if (existing && existing.type === type) {
    await existing.deleteOne(); // toggle off
  } else if (existing) {
    existing.type = type; // change
    await existing.save();
  } else {
    await Reaction.create({ conceptId, userId: session.user.id, type });
  }
  return NextResponse.json(await snapshot(conceptId, session.user.id));
}
