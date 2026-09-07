import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/guards';
import { buildAnalytics } from '@/lib/analytics/learning';

export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;

  const analytics = await buildAnalytics(session.user.id);
  return NextResponse.json(analytics);
}
