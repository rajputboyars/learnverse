// Jahia toolkit config — the first course on the shared system. Its CND and
// node-type tools stay course-specific (custom components); the debugging lab
// and project board use the generic error database and project board.

import { CND_ENTRIES } from '../jahia/cnd';
import { NODE_TYPES, ntAnchor } from '../jahia/nodeTypes';
import { DEBUG_ERRORS } from '../jahia/debugging';
import { DATA_MODEL, FINAL_REQUIREMENTS, MINI_PROJECTS, PHASES, PROJECT } from '../jahia/project';

const jahia = {
  name: 'Jahia DXP',
  // Jahia's roadmap keeps its four bands (it predates the universal ones).
  bands: [
    { key: 'beginner', label: 'Beginner', tone: 'text-green-700' },
    { key: 'intermediate', label: 'Intermediate', tone: 'text-indigo-700' },
    { key: 'advanced', label: 'Advanced', tone: 'text-red-700' },
    { key: 'project', label: 'Project', tone: 'text-amber-700' },
  ],
  tags: ['cnd', 'authoring', 'jcr', 'graphql', 'react', 'cms', 'debugging', 'production', 'beginner', 'intermediate', 'advanced'],
  certificationNote: {
    english: 'Certificate unlocks when every module, lab, quiz, the final project and the final assessment are complete.',
    hinglish: 'Certificate: saare modules, labs, quizzes, final project aur final assessment complete karo.',
  },
  searchGroups: ['CND Reference', 'Node types'],
  searchExtra: (slug) => [
    ...CND_ENTRIES.map((e) => ({
      group: 'CND Reference',
      title: e.name,
      sub: e.syntax,
      href: `/courses/${slug}/toolkit/cnd#entry-${e.id}`,
      hay: [e.name, e.id, e.category, e.syntax, e.useCase, e.cmsNote, ...(e.tags || []), e.description?.english, e.description?.hinglish].join(' ').toLowerCase(),
      key: `${e.name} ${e.id}`.toLowerCase(),
    })),
    ...NODE_TYPES.map((n) => ({
      group: 'Node types',
      title: n.name,
      sub: n.purpose,
      href: `/courses/${slug}/toolkit/node-types#${ntAnchor(n.name)}`,
      hay: [n.name, n.category, n.purpose, n.whereUsed, n.cms, ...(n.properties || []), n.cnd].join(' ').toLowerCase(),
      key: n.name.toLowerCase(),
    })),
  ],
  tools: [
    {
      id: 'cnd',
      kind: 'custom',
      component: 'jahia-cnd',
      title: 'CND Reference',
      icon: 'code',
      description: 'Every commonly used Jahia CND keyword, property type, attribute and selector — with the Content Editor field it produces.',
      links: [
        { title: 'CND Reference', sub: 'Searchable, every type & attribute' },
        { hash: '#cheatsheet', icon: 'list-check', title: 'CND Cheat Sheet', sub: 'One click per keyword' },
        { hash: '#explorer', icon: 'sliders', title: 'Field → CMS Explorer', sub: 'See what a CND line becomes' },
      ],
    },
    {
      id: 'node-types',
      kind: 'custom',
      component: 'jahia-node-types',
      title: 'Node Types Explorer',
      icon: 'layers',
      sub: 'Core, module and custom types',
      description: 'Core Jahia, JCR, module-provided and custom node types: inheritance, properties, purpose and CMS appearance.',
    },
    {
      id: 'debugging',
      kind: 'errors',
      title: 'Debugging Lab',
      icon: 'bug',
      sub: 'Ten real errors, fixed',
      description: 'Ten real Jahia failures, each walked from problem to prevention.',
      entries: DEBUG_ERRORS,
    },
    {
      id: 'project',
      kind: 'project',
      title: 'Final Project',
      icon: 'project',
      sub: 'Learnverse News Portal',
      description: 'The Learnverse News Portal — Jahia Edition: phases, data model, mini projects and requirements.',
      project: {
        brief: PROJECT,
        phases: PHASES,
        dataModel: DATA_MODEL,
        miniProjects: MINI_PROJECTS,
        requirements: FINAL_REQUIREMENTS,
        storageKey: 'jahia',
        codeLanguage: 'cnd',
      },
    },
  ],
};

export default jahia;
