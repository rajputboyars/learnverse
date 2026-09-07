import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import AIProviderConnection from '@/models/AIProviderConnection';
import { requireUser } from '@/lib/guards';
import { encryptSecret, encryptionAvailable, maskKey } from '@/lib/ai/crypto';
import { providerCatalog, providerClass } from '@/lib/ai/registry';

// The stored key never leaves the server: responses carry only `keyHint`.
function publicConnection(c) {
  return {
    provider: c.provider,
    model: c.model,
    keyHint: c.keyHint,
    enabled: c.enabled,
    isDefault: c.isDefault,
    status: c.status,
    lastTestedAt: c.lastTestedAt,
    lastError: c.lastError,
  };
}

export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();

  const connections = await AIProviderConnection.find({ userId: session.user.id })
    .sort({ isDefault: -1, provider: 1 })
    .lean();

  return NextResponse.json({
    catalog: providerCatalog(),
    connections: connections.map(publicConnection),
    encryptionReady: encryptionAvailable(),
  });
}

export async function POST(req) {
  const { session, error } = await requireUser();
  if (error) return error;

  const { provider, apiKey, model, makeDefault } = (await req.json().catch(() => ({}))) || {};
  const P = providerClass(provider);
  if (!P || provider === 'demo') {
    return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
  }
  if (!apiKey || String(apiKey).trim().length < 8) {
    return NextResponse.json({ error: 'That does not look like a valid API key' }, { status: 400 });
  }
  if (!encryptionAvailable()) {
    return NextResponse.json(
      { error: 'Server is not configured to store keys securely (AI_ENCRYPTION_KEY missing).' },
      { status: 503 }
    );
  }
  if (model && !P.models.includes(model)) {
    return NextResponse.json({ error: 'Unknown model for this provider' }, { status: 400 });
  }

  await connectDB();
  const userId = session.user.id;
  const existing = await AIProviderConnection.countDocuments({ userId });

  const doc = await AIProviderConnection.findOneAndUpdate(
    { userId, provider },
    {
      $set: {
        encryptedKey: encryptSecret(String(apiKey).trim()),
        keyHint: maskKey(String(apiKey).trim()),
        model: model || P.defaultModel,
        enabled: true,
        status: 'untested',
        lastError: '',
        // First connection a user adds becomes their default automatically.
        ...(makeDefault || existing === 0 ? { isDefault: true } : {}),
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  if (makeDefault || existing === 0) {
    await AIProviderConnection.updateMany(
      { userId, provider: { $ne: provider } },
      { $set: { isDefault: false } }
    );
  }

  return NextResponse.json({ connection: publicConnection(doc) });
}

export async function PATCH(req) {
  const { session, error } = await requireUser();
  if (error) return error;

  const { provider, enabled, model, makeDefault } = (await req.json().catch(() => ({}))) || {};
  const P = providerClass(provider);
  if (!P) return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
  if (model && !P.models.includes(model)) {
    return NextResponse.json({ error: 'Unknown model for this provider' }, { status: 400 });
  }

  await connectDB();
  const userId = session.user.id;

  const update = {};
  if (typeof enabled === 'boolean') update.enabled = enabled;
  if (model) update.model = model;
  if (makeDefault) update.isDefault = true;

  const doc = await AIProviderConnection.findOneAndUpdate(
    { userId, provider },
    { $set: update },
    { new: true }
  ).lean();
  if (!doc) return NextResponse.json({ error: 'Not connected' }, { status: 404 });

  if (makeDefault) {
    await AIProviderConnection.updateMany(
      { userId, provider: { $ne: provider } },
      { $set: { isDefault: false } }
    );
  }

  return NextResponse.json({ connection: publicConnection(doc) });
}

export async function DELETE(req) {
  const { session, error } = await requireUser();
  if (error) return error;

  const provider = new URL(req.url).searchParams.get('provider');
  if (!provider) return NextResponse.json({ error: 'provider is required' }, { status: 400 });

  await connectDB();
  const userId = session.user.id;
  const removed = await AIProviderConnection.findOneAndDelete({ userId, provider }).lean();
  if (!removed) return NextResponse.json({ error: 'Not connected' }, { status: 404 });

  // Never leave the account without a default while another key is still there.
  if (removed.isDefault) {
    const next = await AIProviderConnection.findOne({ userId }).sort({ updatedAt: -1 });
    if (next) {
      next.isDefault = true;
      await next.save();
    }
  }

  return NextResponse.json({ ok: true });
}
