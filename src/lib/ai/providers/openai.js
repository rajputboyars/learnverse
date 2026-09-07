import { AIProvider, AIProviderError, readError } from './base';

export class OpenAIProvider extends AIProvider {
  static id = 'openai';
  static label = 'OpenAI';
  static icon = 'robot';
  static defaultModel = 'gpt-4o-mini';
  static models = ['gpt-4o-mini', 'gpt-4o', 'gpt-4.1-mini', 'gpt-4.1'];
  static baseUrl = 'https://api.openai.com/v1';
  static docsUrl = 'https://platform.openai.com/docs';
  static keysUrl = 'https://platform.openai.com/api-keys';
  static envKey = 'OPENAI_API_KEY';

  async complete({ system, prompt, json = false, maxTokens = 2000, temperature = 0.4, signal }) {
    if (!this.apiKey) throw new AIProviderError('No OpenAI API key configured', 400);

    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        max_completion_tokens: maxTokens,
        temperature,
        ...(json ? { response_format: { type: 'json_object' } } : {}),
        messages: [
          ...(system ? [{ role: 'system', content: system }] : []),
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!res.ok) throw await readError(res, OpenAIProvider.label);
    const data = await res.json();
    return {
      text: data.choices?.[0]?.message?.content || '',
      model: data.model || this.model,
      usage: data.usage || null,
    };
  }
}
