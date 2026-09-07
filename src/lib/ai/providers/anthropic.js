import { AIProvider, AIProviderError, readError } from './base';

export class AnthropicProvider extends AIProvider {
  static id = 'anthropic';
  static label = 'Claude (Anthropic)';
  static icon = 'heart';
  static defaultModel = 'claude-sonnet-4-5';
  static models = ['claude-sonnet-4-5', 'claude-opus-4-1', 'claude-haiku-4-5'];
  static baseUrl = 'https://api.anthropic.com/v1';
  static docsUrl = 'https://docs.anthropic.com';
  static keysUrl = 'https://console.anthropic.com/settings/keys';
  static envKey = 'ANTHROPIC_API_KEY';

  async complete({ system, prompt, json = false, maxTokens = 2000, temperature = 0.4, signal }) {
    if (!this.apiKey) throw new AIProviderError('No Anthropic API key configured', 400);

    // Claude has no JSON response mode. Prefilling the assistant turn with an
    // opening brace is the documented way to get a bare JSON object back, so
    // the brace is stitched onto the reply below.
    const messages = [{ role: 'user', content: prompt }];
    if (json) messages.push({ role: 'assistant', content: '{' });

    const res = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: maxTokens,
        temperature,
        ...(system ? { system } : {}),
        messages,
      }),
    });

    if (!res.ok) throw await readError(res, AnthropicProvider.label);
    const data = await res.json();
    const body = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');
    return {
      text: json ? `{${body}` : body,
      model: data.model || this.model,
      usage: data.usage || null,
    };
  }
}
