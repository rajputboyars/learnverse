import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/guards';
import { runLibraryPrompt } from '@/lib/ai/runLibraryPrompt';

export const maxDuration = 60;

export async function POST(req, { params }) {
  const { session, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const { values, provider } = (await req.json().catch(() => ({}))) || {};

  try {
    const result = await runLibraryPrompt({
      userId: session.user.id,
      promptId: id,
      values: values || {},
      providerId: provider,
    });
    return NextResponse.json(result);
  } catch (err) {
    const status = err?.status || 500;
    const message =
      err?.name === 'AIProviderError' ? err.message : 'Something went wrong running this prompt.';
    if (err?.name !== 'AIProviderError') console.error('[prompts/run]', err);
    return NextResponse.json({ error: message }, { status });
  }
}
