import { connectDB } from '@/lib/db';
import AIResult from '@/models/AIResult';
import Prompt from '@/models/Prompt';
import { fillVariables, missingVariables } from '@/lib/prompts/variables';
import { LEARNER_SYSTEM } from './templates/shared';
import { AIProviderError } from './providers/base';
import { resolveProvider } from './resolve';

/**
 * Runs a library prompt through the same provider layer the built-in templates
 * use, so a community prompt gets identical treatment: the user's provider, the
 * same storage, the same demo fallback and the same source labelling.
 *
 * Library output is free text — the prompt author decides its shape — so it is
 * stored with outputFormat 'text' and rendered as prose.
 */
export async function runLibraryPrompt({ userId, promptId, values = {}, providerId }) {
  await connectDB();

  const prompt = await Prompt.findById(promptId).lean().catch(() => null);
  if (!prompt) throw new AIProviderError('Prompt not found', 404);
  if (prompt.status !== 'verified') {
    throw new AIProviderError('This prompt is not published yet', 403);
  }

  const missing = missingVariables(prompt.content, values);
  if (missing.length) {
    throw new AIProviderError(`Please fill in: ${missing.join(', ')}`, 400);
  }

  const filled = fillVariables(prompt.content, values);
  const { provider, providerId: usedProvider, model, source } = await resolveProvider(userId, providerId);

  const startedAt = Date.now();
  const completion = await provider.complete({
    system: LEARNER_SYSTEM,
    prompt: filled,
    json: false,
    maxTokens: 2500,
    temperature: 0.6,
    demoSample:
      source === 'demo'
        ? `Demo mode — this is not model output.\n\nThe prompt that would have been sent:\n\n${filled}\n\nConnect an AI provider under Settings → AI Connections to run it for real.`
        : undefined,
  });
  const durationMs = Date.now() - startedAt;
  const usage = completion.usage || {};

  const doc = await AIResult.create({
    userId,
    // Namespaced so library runs and built-in template runs never collide in
    // the results list or the usage analytics.
    templateId: `library:${prompt._id}`,
    templateVersion: '1.0',
    title: prompt.title,
    category: prompt.category,
    inputs: values,
    prompt: filled,
    provider: usedProvider,
    model: completion.model || model,
    source,
    outputFormat: 'text',
    data: null,
    text: completion.text,
    tokensIn: usage.input_tokens ?? usage.prompt_tokens ?? usage.promptTokenCount ?? 0,
    tokensOut: usage.output_tokens ?? usage.completion_tokens ?? usage.candidatesTokenCount ?? 0,
    durationMs,
  });

  // Usage count is the library's only popularity signal, so it tracks real runs
  // rather than page views.
  if (source !== 'demo') {
    await Prompt.updateOne({ _id: prompt._id }, { $inc: { usageCount: 1 } });
  }

  return {
    id: doc._id.toString(),
    templateId: doc.templateId,
    title: prompt.title,
    category: prompt.category,
    resultView: 'text',
    outputFormat: 'text',
    inputs: values,
    provider: usedProvider,
    model: doc.model,
    source,
    data: null,
    text: completion.text,
    durationMs,
    createdAt: doc.createdAt,
  };
}
