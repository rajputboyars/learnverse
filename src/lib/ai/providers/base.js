// The contract every AI provider implements. Feature code only ever talks to
// this shape, so adding a provider later means adding one file — no changes in
// the routes, the prompt templates or the UI.

export class AIProviderError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.name = 'AIProviderError';
    this.status = status;
  }
}

export class AIProvider {
  /** @param {{ apiKey?: string, model?: string, baseUrl?: string }} config */
  constructor(config = {}) {
    this.apiKey = config.apiKey || '';
    this.model = config.model || this.constructor.defaultModel;
    this.baseUrl = config.baseUrl || this.constructor.baseUrl;
  }

  static id = 'base';
  static label = 'Base';
  static defaultModel = '';
  static models = [];
  static docsUrl = '';
  static keysUrl = '';
  static envKey = '';

  /**
   * @param {{ system?: string, prompt: string, json?: boolean,
   *           maxTokens?: number, temperature?: number, signal?: AbortSignal }} req
   * @returns {Promise<{ text: string, model: string, usage: object|null }>}
   */
  async complete() {
    throw new Error('complete() not implemented');
  }

  /** Cheap round-trip behind the "Test connection" button. */
  async test() {
    const res = await this.complete({
      prompt: 'Reply with the single word: ok',
      maxTokens: 16,
      temperature: 0,
    });
    return { ok: true, model: res.model, sample: res.text.trim().slice(0, 40) };
  }
}

/** Turns a failed fetch into a message safe to show a user (never echoes the key). */
export async function readError(res, providerLabel) {
  let detail = '';
  try {
    const body = await res.json();
    detail = body?.error?.message || body?.error?.status || body?.message || '';
  } catch {
    detail = '';
  }
  const hint =
    res.status === 401 || res.status === 403
      ? 'API key rejected — check the key and its permissions.'
      : res.status === 429
        ? 'Rate limit or quota reached on your account.'
        : res.status >= 500
          ? 'The provider is having trouble right now.'
          : '';
  return new AIProviderError(
    [`${providerLabel} request failed (${res.status})`, hint, detail].filter(Boolean).join(' — '),
    res.status
  );
}
