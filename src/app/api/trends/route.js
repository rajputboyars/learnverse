import { NextResponse } from 'next/server';
import { getRanking, listScopes } from '@/lib/trends/snapshots';

// Public. Returns the published ranking for a scope plus the scopes available.
// ?scope=<scopeKey>&compare=previous|30|90
export async function GET(req) {
  const params = new URL(req.url).searchParams;
  const scopes = await listScopes();

  if (!scopes.length) {
    return NextResponse.json({ scopes: [], ranking: null });
  }

  const key = scopes.some((s) => s.scopeKey === params.get('scope'))
    ? params.get('scope')
    : scopes[0].scopeKey;

  const compare = params.get('compare') || 'previous';
  const minAgeDays = compare === '30' ? 30 : compare === '90' ? 90 : 0;

  const ranking = await getRanking({ key, minAgeDays });
  return NextResponse.json({ scopes, ranking, compare });
}
