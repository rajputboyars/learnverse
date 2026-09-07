import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import AIProviderConnection from '@/models/AIProviderConnection';
import { requireUser } from '@/lib/guards';
import { decryptSecret } from '@/lib/ai/crypto';
import { providerClass } from '@/lib/ai/registry';

export const maxDuration = 30;

// Sends the smallest possible request to the provider and records the outcome
// on the connection, so the settings page can show a real status.
export async function POST(req) {
  const { session, error } = await requireUser();
  if (error) return error;

  const { provider } = (await req.json().catch(() => ({}))) || {};
  const P = providerClass(provider);
  if (!P) return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });

  await connectDB();
  const conn = await AIProviderConnection.findOne({ userId: session.user.id, provider }).select(
    '+encryptedKey'
  );
  if (!conn) return NextResponse.json({ error: 'Not connected' }, { status: 404 });

  try {
    const instance = new P({ apiKey: decryptSecret(conn.encryptedKey), model: conn.model });
    const result = await instance.test();
    conn.status = 'ok';
    conn.lastError = '';
    conn.lastTestedAt = new Date();
    await conn.save();
    return NextResponse.json({ ok: true, model: result.model, testedAt: conn.lastTestedAt });
  } catch (err) {
    const message =
      err?.name === 'AIProviderError' ? err.message : 'Could not reach the provider.';
    if (err?.name !== 'AIProviderError') console.error('[ai/providers/test]', err);
    conn.status = 'failed';
    conn.lastError = message;
    conn.lastTestedAt = new Date();
    await conn.save();
    return NextResponse.json({ ok: false, error: message }, { status: 200 });
  }
}
