import { NextResponse } from 'next/server';
import { getSkillHistory } from '@/lib/trends/snapshots';

// Every recorded position of one skill in one scope. Two or fewer points is a
// perfectly valid answer — the chart says so rather than filling the gap.
export async function GET(req) {
  const params = new URL(req.url).searchParams;
  const scope = params.get('scope');
  const skill = params.get('skill');

  if (!scope || !skill) {
    return NextResponse.json({ error: 'scope and skill are required' }, { status: 400 });
  }

  const history = await getSkillHistory({ key: scope, skillSlug: skill });
  return NextResponse.json({ skillSlug: skill, history });
}
