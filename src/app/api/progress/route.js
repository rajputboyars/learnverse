import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/guards';
import { awardXP } from '@/services/xp';

// POST /api/progress  { conceptId }  → mark concept read + award XP
export async function POST(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { conceptId } = await request.json();
  if (!conceptId) {
    return NextResponse.json({ error: 'conceptId required' }, { status: 400 });
  }
  const result = await awardXP(session.user.id, conceptId, 'concept_read');
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }
  return NextResponse.json(result);
}
