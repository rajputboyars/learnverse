import { AIProvider, AIProviderError, readError } from './base';

export class GeminiProvider extends AIProvider {
  static id = 'gemini';
  static label = 'Google Gemini';
  static icon = 'sparkles';
  static defaultModel = 'gemini-2.0-flash';
  static models = ['gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-2.5-pro'];
  static baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  static docsUrl = 'https://ai.google.dev/gemini-api/docs';
  static keysUrl = 'https://aistudio.google.com/app/apikey';
  static envKey = 'GEMINI_API_KEY';

  async complete({ system, prompt, json = false, maxTokens = 2000, temperature = 0.4, signal }) {
    if (!this.apiKey) throw new AIProviderError('No Gemini API key configured', 400);

    const res = await fetch(`${this.baseUrl}/models/${this.model}:generateContent`, {
      method: 'POST',
      signal,
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': this.apiKey },
      body: JSON.stringify({
        ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
          ...(json ? { responseMimeType: 'application/json' } : {}),
        },
      }),
    });

    if (!res.ok) throw await readError(res, GeminiProvider.label);
    const data = await res.json();
    const text = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('');
    return { text, model: this.model, usage: data.usageMetadata || null };
  }
}
