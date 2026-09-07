import { connectDB } from '@/lib/db';
import AIProviderConnection from '@/models/AIProviderConnection';
import { decryptSecret, encryptionAvailable } from './crypto';
import { DemoProvider } from './providers/demo';
import { providerClass, serverKeyFor } from './registry';

/**
 * Pick the provider instance to run a request with, in this order:
 *
 *   1. the connection the caller explicitly asked for (must be theirs, enabled)
 *   2. the user's default connection, then any enabled connection
 *   3. a server-wide key from env (deployments that pay for AI centrally)
 *   4. demo mode — no network, template sample data, clearly labelled
 *
 * Returns { provider, providerId, model, source }. Never throws for "no key":
 * demo mode is always a valid answer so the UI has something to render.
 */
export async function resolveProvider(userId, preferredId) {
  await connectDB();

  const query = { userId, enabled: true };
  if (preferredId && preferredId !== DemoProvider.id) query.provider = preferredId;

  const connections = await AIProviderConnection.find(query)
    .select('+encryptedKey')
    .sort({ isDefault: -1, updatedAt: -1 })
    .lean();

  if (preferredId !== DemoProvider.id && encryptionAvailable()) {
    for (const conn of connections) {
      const P = providerClass(conn.provider);
      if (!P) continue;
      let apiKey;
      try {
        apiKey = decryptSecret(conn.encryptedKey);
      } catch {
        continue; // key was encrypted under a different AI_ENCRYPTION_KEY
      }
      return {
        provider: new P({ apiKey, model: conn.model || P.defaultModel }),
        providerId: P.id,
        model: conn.model || P.defaultModel,
        source: 'ai',
      };
    }
  }

  // Server-side fallback key.
  const envCandidates = preferredId && preferredId !== DemoProvider.id ? [preferredId] : ['anthropic', 'openai', 'gemini'];
  for (const id of envCandidates) {
    const key = serverKeyFor(id);
    if (!key) continue;
    const P = providerClass(id);
    return {
      provider: new P({ apiKey: key }),
      providerId: P.id,
      model: P.defaultModel,
      source: 'ai',
    };
  }

  return {
    provider: new DemoProvider(),
    providerId: DemoProvider.id,
    model: 'demo',
    source: 'demo',
  };
}
