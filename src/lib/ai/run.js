import { connectDB } from '@/lib/db';
import AIResult from '@/models/AIResult';
import { buildLearningContext } from './context';
import { parseJSONLoose } from './json';
import { getTemplate } from './templates';
import { missingInputs, withDefaults } from './templates/shared';
import { AIProviderError } from './providers/base';
import { resolveProvider } from './resolve';

/**
 * The single path every AI feature goes through:
 *
 *   template → inputs validated → prompt built → provider resolved →
 *   model called → response parsed → result stored → structured result returned
 *
 * Nothing else in the app talks to a provider directly, so swapping providers,
 * adding logging or changing storage happens here alone.
 */
export async function runTemplate({ userId, templateId, inputs = {}, providerId, parentId = null, extraContext = {} }) {
  const template = getTemplate(templateId);
  if (!template) throw new AIProviderError(`Unknown prompt template: ${templateId}`, 404);
  if (template.status !== 'active') throw new AIProviderError('This prompt is not available', 410);

  const filled = withDefaults(template, inputs);
  const missing = missingInputs(template, filled);
  if (missing.length) {
    throw new AIProviderError(`Please fill in: ${missing.join(', ')}`, 400);
  }

  const ctx = { ...extraContext };
  if (template.needsLearningContext) {
    ctx.learning = await buildLearningContext(userId);
  }

  const prompt = template.build(filled, ctx);
  const wantsJSON = template.outputFormat === 'structured';

  const { provider, providerId: usedProvider, model, source } = await resolveProvider(userId, providerId);

  const startedAt = Date.now();
  const completion = await provider.complete({
    system: template.system,
    prompt,
    json: wantsJSON,
    maxTokens: template.maxTokens || 2500,
    temperature: template.temperature ?? 0.5,
    demoSample: source === 'demo' ? template.demo?.(filled, ctx) : undefined,
  });
  const durationMs = Date.now() - startedAt;

  const data = wantsJSON ? parseJSONLoose(completion.text) : null;
  const usage = completion.usage || {};

  await connectDB();
  const doc = await AIResult.create({
    userId,
    templateId: template.id,
    templateVersion: template.version,
    title: template.title,
    category: template.category,
    inputs: filled,
    prompt,
    provider: usedProvider,
    model: completion.model || model,
    source,
    outputFormat: template.outputFormat,
    data,
    text: completion.text,
    tokensIn: usage.input_tokens ?? usage.prompt_tokens ?? usage.promptTokenCount ?? 0,
    tokensOut: usage.output_tokens ?? usage.completion_tokens ?? usage.candidatesTokenCount ?? 0,
    durationMs,
    parentId,
  });

  return {
    id: doc._id.toString(),
    templateId: template.id,
    title: template.title,
    category: template.category,
    resultView: template.resultView,
    outputFormat: template.outputFormat,
    inputs: filled,
    provider: usedProvider,
    model: doc.model,
    source,
    /** true when structured output was expected but the model returned prose. */
    unparsed: wantsJSON && !data,
    data,
    text: completion.text,
    durationMs,
    createdAt: doc.createdAt,
  };
}
