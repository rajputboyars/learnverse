// The Jahia toolkit pages. Plain data (not in a 'use client' file) so the
// server route can read it: a server component importing a value from a
// client module gets a client reference, not the object.

export const TOOLS = {
  cnd: {
    title: 'CND Reference',
    icon: 'code',
    description: 'Every commonly used Jahia CND keyword, property type, attribute and selector — with the Content Editor field it produces.',
  },
  'node-types': {
    title: 'Node Types Explorer',
    icon: 'layers',
    description: 'Core Jahia, JCR, module-provided and custom node types: inheritance, properties, purpose and CMS appearance.',
  },
  debugging: {
    title: 'Debugging Lab',
    icon: 'bug',
    description: 'Ten real Jahia failures, each walked from problem to prevention.',
  },
  project: {
    title: 'Final Project',
    icon: 'project',
    description: 'The Learnverse News Portal — Jahia Edition: phases, data model, mini projects and requirements.',
  },
};
