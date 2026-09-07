// Helpers shared by every prompt template.

export const LEARNER_SYSTEM = [
  'You are the learning and career-intelligence engine inside Learnverse, a platform for',
  'developers in India who learn in English and Hinglish.',
  'Be concrete, current and honest. Never invent statistics, salaries, rankings or sources you',
  'are not confident about — when you are estimating, say so in the field provided for it.',
  'Keep language plain and free of hype.',
].join(' ');

/** Appends the "return exactly this JSON" instruction that structured templates rely on. */
export function jsonInstruction(shape) {
  return [
    '',
    'Return ONLY a JSON object, with no prose before or after it and no markdown fences.',
    'Use exactly this shape (omit nothing; use an empty array or "" when you have no value):',
    '',
    typeof shape === 'string' ? shape : JSON.stringify(shape, null, 2),
  ].join('\n');
}

/** Renders the user's answers as a labelled block the model can read cleanly. */
export function inputBlock(template, inputs) {
  return template.inputs
    .map((field) => {
      const value = inputs?.[field.name];
      if (value === undefined || value === '' || value === null) return null;
      return `- ${field.label}: ${value}`;
    })
    .filter(Boolean)
    .join('\n');
}

/** Fills missing optional inputs with their declared defaults. */
export function withDefaults(template, inputs = {}) {
  const out = { ...inputs };
  for (const field of template.inputs) {
    if ((out[field.name] === undefined || out[field.name] === '') && field.default !== undefined) {
      out[field.name] = field.default;
    }
  }
  return out;
}

/** Missing-required-input names, so a route can 400 before spending a token. */
export function missingInputs(template, inputs = {}) {
  return template.inputs
    .filter((f) => f.required && !String(inputs?.[f.name] ?? '').trim())
    .map((f) => f.label);
}
