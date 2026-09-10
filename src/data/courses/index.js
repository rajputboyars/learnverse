// Course toolkit registry.
//
// A course is content (scripts/content/<slug>.mjs — lessons with a `lesson`
// block) plus, optionally, a toolkit config here: roadmap bands, tags, a
// daily plan, and tools — references, a cheat sheet, an error database, a
// project board, or a course-specific custom tool. Nothing in this folder is
// a client module, so server routes can read it directly.
//
// Adding a course's toolkit = add a file next to jahia.js and list it below.

import jahia from './jahia';
import javascript from './javascript';

const CONFIGS = { jahia, javascript };

export function getCourseConfig(slug) {
  return CONFIGS[slug] || null;
}

export function coursesWithToolkit() {
  return Object.keys(CONFIGS);
}

/** Universal roadmap bands (Level 0–10). Courses may use a subset. */
export const UNIVERSAL_BANDS = [
  { key: 'prerequisites', label: 'Prerequisites', tone: 'text-slate-600' },
  { key: 'fundamentals', label: 'Fundamentals', tone: 'text-green-700' },
  { key: 'core', label: 'Core Concepts', tone: 'text-green-700' },
  { key: 'practical', label: 'Practical Development', tone: 'text-indigo-700' },
  { key: 'advanced', label: 'Advanced', tone: 'text-indigo-700' },
  { key: 'real-world', label: 'Real-World', tone: 'text-indigo-700' },
  { key: 'debugging', label: 'Debugging', tone: 'text-red-700' },
  { key: 'performance', label: 'Performance & Security', tone: 'text-red-700' },
  { key: 'deployment', label: 'Deployment', tone: 'text-red-700' },
  { key: 'project', label: 'Final Project', tone: 'text-amber-700' },
  { key: 'interview', label: 'Interview Prep', tone: 'text-amber-700' },
];

function toolHref(slug, tool, hash = '') {
  return `/courses/${slug}/toolkit/${tool.id}${hash}`;
}

function textOf(v) {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return `${v.english || ''} ${v.hinglish || ''}`;
}

/** Search items contributed by a course's tools (lessons are added client-side). */
function searchItems(slug, config) {
  const items = [];
  for (const tool of config.tools) {
    if (tool.kind === 'reference') {
      for (const e of tool.entries) {
        items.push({
          group: tool.title,
          title: e.name,
          sub: e.syntax || '',
          href: toolHref(slug, tool, `#entry-${e.id}`),
          hay: [e.name, e.id, e.category, e.syntax, e.useCase, ...(e.tags || []), textOf(e.description)].join(' ').toLowerCase(),
          key: `${e.name} ${e.id}`.toLowerCase(),
        });
      }
    }
    if (tool.kind === 'errors') {
      for (const d of tool.entries) {
        items.push({
          group: tool.title,
          title: d.title,
          sub: textOf(d.problem).split('.')[0],
          href: toolHref(slug, tool, `#err-${d.id}`),
          hay: [d.title, d.symptom, ...(d.tags || []), ...(d.causes || []), textOf(d.problem)].join(' ').toLowerCase(),
          key: d.title.toLowerCase(),
        });
      }
    }
  }
  if (config.searchExtra) items.push(...config.searchExtra(slug));
  return items;
}

/** Everything the course hub needs, all serialisable. */
export function hubConfig(slug) {
  const c = getCourseConfig(slug);
  if (!c) return null;
  return {
    slug,
    bands: c.bands || UNIVERSAL_BANDS,
    tags: c.tags || [],
    dailyPlan: c.dailyPlan || null,
    certificationNote: c.certificationNote || null,
    toolkit: c.tools.flatMap((t) =>
      (t.links || [{ hash: '', title: t.title, sub: t.sub }]).map((l) => ({
        href: toolHref(slug, t, l.hash || ''),
        icon: l.icon || t.icon,
        title: l.title,
        sub: l.sub || '',
      }))
    ),
    search: searchItems(slug, c),
    groups: [...new Set(['Lessons', ...c.tools.filter((t) => ['reference', 'errors'].includes(t.kind)).map((t) => t.title), ...(c.searchGroups || [])])],
  };
}

/** Tool list for the toolkit tabs. */
export function toolMeta(slug) {
  const c = getCourseConfig(slug);
  return (c?.tools || []).map(({ id, title, icon, description }) => ({ id, title, icon, description }));
}

/** One tool's data, serialisable, for the toolkit page. */
export function toolData(slug, id) {
  const tool = getCourseConfig(slug)?.tools.find((t) => t.id === id);
  if (!tool) return null;
  const { links, ...rest } = tool; // eslint-disable-line no-unused-vars
  return rest;
}
