import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';
import { GeminiProvider } from './providers/gemini';
import { DemoProvider } from './providers/demo';

// Adding a provider = import the class and drop it in this list. Everything
// else (settings UI, connection model, run route) reads from here.
export const PROVIDER_CLASSES = [AnthropicProvider, OpenAIProvider, GeminiProvider];

export const DEMO_PROVIDER_ID = DemoProvider.id;

export function providerClass(id) {
  if (id === DemoProvider.id) return DemoProvider;
  return PROVIDER_CLASSES.find((P) => P.id === id) || null;
}

/** Serialisable descriptions for the settings UI — no secrets, safe on the client. */
export function providerCatalog() {
  return PROVIDER_CLASSES.map((P) => ({
    id: P.id,
    label: P.label,
    icon: P.icon,
    models: P.models,
    defaultModel: P.defaultModel,
    docsUrl: P.docsUrl,
    keysUrl: P.keysUrl,
    /** True when the server has a fallback key in env for this provider. */
    serverKey: Boolean(process.env[P.envKey]),
  }));
}

/** The env fallback key for a provider, if the deployment set one. */
export function serverKeyFor(id) {
  const P = providerClass(id);
  return P?.envKey ? process.env[P.envKey] || '' : '';
}
