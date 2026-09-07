// Library prompts are plain text with {{variable}} placeholders. Reading those
// out is what lets any submitted prompt become a runnable form with no bespoke
// UI: the same declared-inputs idea as the built-in templates, inferred from the
// text instead of declared in code.

const VAR_PATTERN = /\{\{\s*([a-zA-Z0-9_ -]{1,40})\s*\}\}/g;

/** Placeholder names in the order they first appear, de-duplicated. */
export function extractVariables(content) {
  const seen = new Set();
  const out = [];
  for (const match of String(content || '').matchAll(VAR_PATTERN)) {
    const name = match[1].trim();
    const key = name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push({ name, label: humanise(name) });
    }
  }
  return out;
}

function humanise(name) {
  return name
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());
}

/**
 * Substitutes the user's values. Matching is case-insensitive on the name so
 * {{Topic}} and {{topic}} are the same field, and an unfilled placeholder is
 * left as-is rather than becoming the string "undefined".
 */
export function fillVariables(content, values = {}) {
  const lookup = new Map(Object.entries(values).map(([k, v]) => [k.toLowerCase(), v]));
  return String(content || '').replace(VAR_PATTERN, (whole, name) => {
    const value = lookup.get(name.trim().toLowerCase());
    return value === undefined || value === '' ? whole : String(value);
  });
}

/** Placeholder names the user has not filled in. */
export function missingVariables(content, values = {}) {
  return extractVariables(content)
    .filter(({ name }) => !String(values?.[name] ?? '').trim())
    .map(({ label }) => label);
}
