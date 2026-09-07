/**
 * Models wrap JSON in prose or fences more often than anyone would like, so
 * parsing is done defensively: try the whole string, then the first fenced
 * block, then the outermost braces. Returns null when nothing parses — callers
 * fall back to showing the raw text rather than failing the run.
 */
export function parseJSONLoose(text) {
  if (!text) return null;
  const candidates = [];
  const trimmed = String(text).trim();
  candidates.push(trimmed);

  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) candidates.push(fence[1].trim());

  const first = trimmed.indexOf('{');
  const last = trimmed.lastIndexOf('}');
  if (first !== -1 && last > first) candidates.push(trimmed.slice(first, last + 1));

  const firstArr = trimmed.indexOf('[');
  const lastArr = trimmed.lastIndexOf(']');
  if (firstArr !== -1 && lastArr > firstArr) candidates.push(trimmed.slice(firstArr, lastArr + 1));

  for (const c of candidates) {
    try {
      const value = JSON.parse(c);
      if (value && typeof value === 'object') return value;
    } catch {
      // try the next shape
    }
  }
  return null;
}
