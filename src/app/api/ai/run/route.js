import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/guards';
import { runTemplate } from '@/lib/ai/run';

// A model call can take a while; give it room on platforms that honour this.
export const maxDuration = 60;

export async function POST(req) {
  const { session, error } = await requireUser();
  if (error) return error;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { templateId, inputs, provider, parentId } = body || {};
  if (!templateId) {
    return NextResponse.json({ error: 'templateId is required' }, { status: 400 });
  }

  try {
    const result = await runTemplate({
      userId: session.user.id,
      templateId,
      inputs: inputs || {},
      providerId: provider,
      parentId: parentId || null,
    });
    return NextResponse.json(result);
  } catch (err) {
    const status = err?.status || 500;
    // Provider errors are already worded for a user; anything else stays vague
    // on purpose so an internal message never leaks out.
    const message =
      err?.name === 'AIProviderError' ? err.message : 'Something went wrong running this analysis.';
    if (err?.name !== 'AIProviderError') console.error('[ai/run]', err);
    return NextResponse.json({ error: message }, { status });
  }
}
