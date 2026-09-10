// Course-wide search for the Jahia hub: one index over lessons, the CND
// reference, the node types explorer and the debugging lab.

import { CND_ENTRIES } from './cnd';
import { NODE_TYPES } from './nodeTypes';
import { DEBUG_ERRORS } from './debugging';

const BASE = '/courses/jahia/toolkit';

export function ntAnchor(name) {
  return `nt-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

function text(v) {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return `${v.english || ''} ${v.hinglish || ''}`;
}

/** @param lessons [{ title, slug, tags, searchTerms, topicTitle }] */
export function buildIndex(lessons) {
  const items = [];
  for (const l of lessons) {
    items.push({
      group: 'Lessons',
      title: l.title,
      sub: l.topicTitle,
      href: `/concepts/${l.slug}`,
      hay: [l.title, l.topicTitle, ...(l.tags || []), ...(l.searchTerms || [])].join(' ').toLowerCase(),
      key: l.title.toLowerCase(),
    });
  }
  for (const e of CND_ENTRIES) {
    items.push({
      group: 'CND Reference',
      title: e.name,
      sub: e.syntax,
      href: `${BASE}/cnd#entry-${e.id}`,
      hay: [e.name, e.id, e.category, e.syntax, e.useCase, e.cmsNote, ...(e.tags || []), text(e.description)].join(' ').toLowerCase(),
      key: `${e.name} ${e.id}`.toLowerCase(),
    });
  }
  for (const n of NODE_TYPES) {
    items.push({
      group: 'Node types',
      title: n.name,
      sub: n.purpose,
      href: `${BASE}/node-types#${ntAnchor(n.name)}`,
      hay: [n.name, n.category, n.purpose, n.whereUsed, n.cms, ...(n.properties || []), n.cnd].join(' ').toLowerCase(),
      key: n.name.toLowerCase(),
    });
  }
  for (const d of DEBUG_ERRORS) {
    items.push({
      group: 'Debugging Lab',
      title: d.title,
      sub: text(d.problem).split('.')[0],
      href: `${BASE}/debugging#err-${d.id}`,
      hay: [d.title, d.symptom, ...(d.tags || []), ...(d.causes || []), text(d.problem)].join(' ').toLowerCase(),
      key: d.title.toLowerCase(),
    });
  }
  return items;
}

export const SEARCH_GROUPS = ['Lessons', 'CND Reference', 'Node types', 'Debugging Lab'];

/** Results grouped, title matches first, at most `per` per group. */
export function searchIndex(index, query, per = 5) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const words = q.split(/\s+/);
  const scored = [];
  for (const it of index) {
    if (!words.every((w) => it.hay.includes(w))) continue;
    const score = (it.key.includes(q) ? 10 : 0) + (it.key.startsWith(q) ? 5 : 0);
    scored.push({ ...it, score });
  }
  return SEARCH_GROUPS.map((g) => ({
    group: g,
    items: scored.filter((s) => s.group === g).sort((a, b) => b.score - a.score).slice(0, per),
  })).filter((g) => g.items.length > 0);
}
