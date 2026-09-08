/**
 * Bilingual content fields.
 *
 * `explanation` was bilingual from the start ({ english, hinglish }), but three
 * fields were not: a course description, a topic description and a concept's
 * daily-life example. Those were authored in Hinglish and rendered as-is, so a
 * reader who had chosen English still met Hinglish on the course card, the
 * topic list and the example box.
 *
 * These helpers let a field hold either shape:
 *
 *   'Ek gaadi socho…'                        ← legacy, one language
 *   { english: 'Think of…', hinglish: 'Ek…' } ← bilingual
 *
 * Legacy strings keep working untouched, which matters because there are over a
 * thousand of them; they are treated as Hinglish, because that is what they
 * are, and English falls back to them rather than showing a blank box.
 */

/** True when a field has been authored in both languages. */
export function isBilingual(value) {
  return Boolean(value) && typeof value === 'object' && ('english' in value || 'hinglish' in value);
}

/**
 * The text for one language.
 *
 * @param {string|{english?:string,hinglish?:string}} value
 * @param {'en'|'hi'} lang
 */
export function pickText(value, lang) {
  if (!value) return '';
  if (typeof value === 'string') return value; // legacy: one language only
  const english = value.english || '';
  const hinglish = value.hinglish || '';
  return lang === 'hi' ? hinglish || english : english || hinglish;
}

/**
 * Both sides of a field, for handing to a client island from a server
 * component — the server cannot know the reader's language, since the choice
 * lives in their browser.
 *
 * @returns {{ en: string, hi: string }}
 */
export function bothLanguages(value) {
  if (!value) return { en: '', hi: '' };
  if (typeof value === 'string') return { en: value, hi: value };
  return { en: value.english || value.hinglish || '', hi: value.hinglish || value.english || '' };
}

/** True when the field only exists in one language — used to report coverage. */
export function isTranslated(value) {
  return isBilingual(value) && Boolean(value.english) && Boolean(value.hinglish);
}
