import { AIProvider } from './base';

/**
 * The provider used when nobody has connected a key yet.
 *
 * It calls no network and invents nothing on its own: each prompt template
 * ships a `demo(inputs)` sample, and this provider simply echoes that sample
 * back through the same interface a real provider uses. Every result produced
 * this way is tagged `source: 'demo'` so the UI can label it as sample data
 * rather than passing it off as analysis.
 */
export class DemoProvider extends AIProvider {
  static id = 'demo';
  static label = 'Demo mode';
  static icon = 'flask';
  static defaultModel = 'demo';
  static models = ['demo'];
  static docsUrl = '';
  static keysUrl = '';
  static envKey = '';

  async complete({ demoSample, json = false }) {
    // A touch of latency so loading states are exercised in demo mode too.
    await new Promise((r) => setTimeout(r, 350));
    if (demoSample === undefined || demoSample === null) {
      return {
        text: json
          ? JSON.stringify({
              summary: 'Demo mode: connect an AI provider in Settings to get a real analysis.',
            })
          : 'Demo mode: connect an AI provider in Settings to get a real answer.',
        model: 'demo',
        usage: null,
      };
    }
    return {
      text: typeof demoSample === 'string' ? demoSample : JSON.stringify(demoSample),
      model: 'demo',
      usage: null,
    };
  }

  async test() {
    return { ok: true, model: 'demo', sample: 'ok' };
  }
}
