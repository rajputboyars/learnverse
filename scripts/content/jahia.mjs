// Jahia CMS + Jahia Developer — Beginner → Advanced, hands-on.
// Same export shape as every course module (course, curriculum,
// generalInterviewQuestions, slugify), consumed by scripts/seed.mjs and
// scripts/add-course.mjs.
//
// The content lives in scripts/content/jahia/:
//   legacy.mjs         the original fifteen concepts, titles unchanged so their
//                      _ids (and everyone's progress) survive the upgrade
//   beginner.mjs       modules 00–04
//   intermediate.mjs   modules 05–09
//   intermediate2.mjs  modules 10–12
//   advanced.mjs       modules 13–17
//   project.mjs        module 18
//
// Every concept carries a `lesson` block (see components/jahia/JahiaLesson).
// Jahia moves between versions: lessons are written for Jahia 8.x and say so;
// anything version- or module-specific is labelled in the lesson itself.

import { generalInterviewQuestions as legacyQuestions } from './jahia/legacy.mjs';
import { beginnerModules } from './jahia/beginner.mjs';
import { intermediateModules } from './jahia/intermediate.mjs';
import { intermediateModules2 } from './jahia/intermediate2.mjs';
import { advancedModules } from './jahia/advanced.mjs';
import { projectModules } from './jahia/project.mjs';
import { iq, t } from './jahia/helpers.mjs';

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Jahia DXP',
  slug: 'jahia',
  description: {
    english:
      'From "I don\'t know Jahia" to shipping a Jahia application: CMS authoring, the JCR, modules, CND, node types, views, GraphQL, languages, multi-site, permissions, workflow, caching, debugging and production — built hands-on around one project, the Learnverse News Portal. In English and Hinglish.',
    hinglish:
      '"Mujhe Jahia nahi aata" se Jahia application ship karne tak: CMS authoring, JCR, modules, CND, node types, views, GraphQL, languages, multi-site, permissions, workflow, caching, debugging aur production — ek project, Learnverse News Portal, ke around hands-on. English aur Hinglish mein.',
  },
  icon: 'layers',
  tags: ['jahia', 'dxp', 'cms', 'jcr', 'cnd', 'graphql', 'java', 'headless'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 46,
  // Stricter certificate: every lesson read AND every quiz passed — which
  // covers labs, the final project and the final assessment.
  certification: {
    requireQuizzes: true,
    title: 'Jahia Developer',
    subtitle: 'Beginner → Advanced',
    note: 'Final Project Completed',
  },
};

const MODULES = [...beginnerModules, ...intermediateModules, ...intermediateModules2, ...advancedModules, ...projectModules];

// Stamp every lesson with where it sits in the path, so the lesson page can
// show LEVEL / MODULE without a second query.
export const curriculum = MODULES.map((m) => ({
  title: m.title,
  level: m.level,
  stage: m.stage,
  estimatedMinutes: m.estimatedMinutes,
  description: m.description,
  concepts: m.concepts.map((c) => ({
    ...c,
    lesson: {
      version: 'Jahia 8.x',
      minutes: 15,
      ...(c.lesson || {}),
      module: m.title,
      level: m.level,
      stage: m.stage,
    },
  })),
}));

export const generalInterviewQuestions = [
  ...legacyQuestions,
  iq({
    question: 'What is CND, and what does it control in Jahia?',
    difficulty: 'easy',
    short: t('Compact Namespace and Node type Definition — the file that declares node types, their properties, child nodes and mixins. It controls the content model and, through it, the authoring form.', 'Compact Namespace and Node type Definition — wo file jo node types, unki properties, child nodes aur mixins declare karti hai. Ye content model aur uske through authoring form control karti hai.'),
    deep: t('Each property\'s type, selector and attributes decide the Content Editor control, validation and translation behaviour; supertypes and mixins decide inheritance, droppability and view fallback.', 'Har property ka type, selector aur attributes Content Editor control, validation aur translation decide karte hain; supertypes aur mixins inheritance, droppability aur view fallback decide karte hain.'),
    code: { code: "[lv:article] > jnt:content, jmix:editorialContent\n - jcr:title (string) i18n mandatory\n - image (weakreference, picker[type='image']) < 'jmix:image'" },
    tip: t('Connect every CND line to what the author sees.', 'Har CND line ko author ko dikhne wali cheez se jodo.'),
  }),
  iq({
    question: 'How do you design a Jahia content model for a news site?',
    difficulty: 'hard',
    short: t('Entities as types (article, author, category, media), relations as weakreferences, owned parts as child nodes, shared behaviour as mixins, text as i18n and shared values not.', 'Entities types ki tarah (article, author, category, media), relations weakreferences, owned parts child nodes, shared behaviour mixins, text i18n aur shared values nahi.'),
    deep: t('Start from what authors create and what visitors see. Keep types generic enough for several sites. Put reusable content in content folders and reference it from pages. Give every droppable type a category mixin, labels and a default view. Plan cache dependencies for every reference a view prints.', 'Jo authors banate hain aur visitors dekhte hain wahan se shuru karo. Types itne generic rakho ki kai sites chalein. Reusable content content folders mein rakho aur pages se reference karo. Har droppable type ko category mixin, labels aur default view do. View jo bhi reference print kare uski cache dependency plan karo.'),
    tip: t('Draw the data model: ARTICLE → AUTHOR, CATEGORY, IMAGE.', 'Data model draw karo: ARTICLE → AUTHOR, CATEGORY, IMAGE.'),
  }),
];
