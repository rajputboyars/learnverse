import { NextResponse } from 'next/server';
import { CATEGORIES, publicTemplates } from '@/lib/ai/templates';

// Public: the quick-action cards are visible to signed-out visitors too, they
// just cannot run one. Prompt text stays server-side.
export async function GET() {
  return NextResponse.json({ templates: publicTemplates(), categories: CATEGORIES });
}
