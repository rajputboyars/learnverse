/**
 * Share cards, built as SVG strings.
 *
 * SVG rather than a screenshot library: it is a few hundred bytes, renders
 * identically everywhere, and converts to PNG through a canvas without pulling
 * in a dependency. Everything is drawn with system fonts — a webfont would not
 * load inside the canvas conversion and the card would silently fall back to
 * something else on download.
 *
 * The cards state real numbers only. Nothing here formats a value the caller
 * did not measure, and every card carries the same footer so a screenshot of one
 * can be traced back to where it came from.
 */

const W = 1080;
const H = 1080;

const THEMES = {
  indigo: { bg: '#1e1b4b', accent: '#818cf8', ink: '#f8fafc', muted: '#a5b4fc', panel: '#312e81' },
  slate: { bg: '#0f172a', accent: '#38bdf8', ink: '#f8fafc', muted: '#94a3b8', panel: '#1e293b' },
  amber: { bg: '#451a03', accent: '#fbbf24', ink: '#fffbeb', muted: '#fcd34d', panel: '#78350f' },
  green: { bg: '#052e16', accent: '#4ade80', ink: '#f0fdf4', muted: '#86efac', panel: '#14532d' },
};

/** XML-escapes text — a course title with an ampersand must not break the SVG. */
function esc(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Greedy wrap by estimated width. SVG has no text measurement outside a
 * browser layout pass, so this approximates from an average glyph width — close
 * enough for display copy at these sizes, and each line is clipped rather than
 * allowed to overflow the card.
 */
function wrap(text, maxChars, maxLines) {
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word.length > maxChars ? `${word.slice(0, maxChars - 1)}…` : word;
    }
    if (lines.length === maxLines) break;
  }
  if (line && lines.length < maxLines) lines.push(line);

  // Mark the truncation rather than silently dropping the rest.
  if (lines.length === maxLines) {
    const consumed = lines.join(' ').replace(/…$/, '');
    if (consumed.length < String(text ?? '').trim().length) {
      lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:]?$/, '')}…`;
    }
  }
  return lines;
}

function textLines(lines, { x, y, size, weight = '700', fill, lineHeight, anchor = 'start' }) {
  return lines
    .map(
      (line, i) =>
        `<text x="${x}" y="${y + i * lineHeight}" font-family="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(line)}</text>`
    )
    .join('');
}

/**
 * @param {{ kind: string, eyebrow: string, headline: string, stat?: string,
 *           statLabel?: string, body?: string, chips?: string[],
 *           name?: string, theme?: string }} card
 * @returns {string} a standalone SVG document
 */
export function buildCardSVG(card) {
  const t = THEMES[card.theme] || THEMES.indigo;
  // 20 characters is what fits across 920px of usable width at 68px bold, using
  // an average advance of ~0.6em. Measured against the widest realistic
  // headline rather than guessed — an overflowing card is unusable.
  const headline = wrap(card.headline, 20, card.stat ? 3 : 4);
  const body = card.body ? wrap(card.body, 46, 3) : [];

  const chips = (card.chips || []).slice(0, 3);
  const chipEls = chips
    .map((chip, i) => {
      const label = String(chip).slice(0, 28);
      const width = 28 + label.length * 15;
      const x = 80 + chips.slice(0, i).reduce((sum, c) => sum + 28 + String(c).slice(0, 28).length * 15 + 16, 0);
      return `<g><rect x="${x}" y="828" rx="28" width="${width}" height="56" fill="${t.panel}"/>${textLines(
        [label],
        { x: x + 14, y: 866, size: 26, weight: '600', fill: t.muted, lineHeight: 0 }
      )}</g>`;
    })
    .join('');

  const statBlock = card.stat
    ? `${textLines([card.stat], { x: 80, y: 320, size: 168, weight: '800', fill: t.accent, lineHeight: 0 })}
       ${textLines([card.statLabel || ''], { x: 80, y: 376, size: 30, weight: '600', fill: t.muted, lineHeight: 0 })}`
    : '';

  const headlineY = card.stat ? 500 : 340;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${t.bg}"/>
  <rect x="0" y="0" width="${W}" height="10" fill="${t.accent}"/>

  ${textLines([card.eyebrow], { x: 80, y: 150, size: 30, weight: '700', fill: t.accent, lineHeight: 0 })}

  ${statBlock}

  ${textLines(headline, { x: 80, y: headlineY, size: 68, weight: '800', fill: t.ink, lineHeight: 84 })}

  ${body.length ? textLines(body, { x: 80, y: headlineY + headline.length * 84 + 30, size: 34, weight: '400', fill: t.muted, lineHeight: 50 }) : ''}

  ${chipEls}

  <line x1="80" y1="936" x2="${W - 80}" y2="936" stroke="${t.panel}" stroke-width="2"/>
  ${textLines([card.name ? `${card.name} · Learnverse` : 'Learnverse'], { x: 80, y: 1000, size: 30, weight: '700', fill: t.ink, lineHeight: 0 })}
  ${textLines(['learnverse.dev'], { x: W - 80, y: 1000, size: 28, weight: '500', fill: t.muted, lineHeight: 0, anchor: 'end' })}
</svg>`;
}

/** The caption offered alongside the card — the user edits it before posting. */
export function buildCardCaption(card) {
  const parts = [card.stat ? `${card.stat} ${card.statLabel || ''}`.trim() : '', card.headline];
  if (card.body) parts.push(card.body);
  return parts.filter(Boolean).join('\n\n');
}
