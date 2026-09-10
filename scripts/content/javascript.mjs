// JavaScript — Beginner → Advanced, hands-on, built around one project (the
// Expense Tracker). Same export shape as every course module (course,
// curriculum, generalInterviewQuestions, slugify).
//
//   javascript/legacy.mjs   the original concepts, titles unchanged
//   javascript/modules.mjs  the banded roadmap, labs, debugging, project
//   src/data/courses/javascript.js   toolkit: reference, errors, project board

import { course as legacyCourse, generalInterviewQuestions, slugify } from './javascript/legacy.mjs';
import { MODULES } from './javascript/modules.mjs';
import { buildCurriculum } from './_shared/helpers.mjs';

export { slugify, generalInterviewQuestions };

export const course = {
  ...legacyCourse,
  description: {
    english:
      'JavaScript from zero to a deployed app: values and functions, arrays and objects, the DOM, fetch and async, closures and patterns — then debugging, performance, security, tooling and deployment, all while building an Expense Tracker. Labs in every module. In English and Hinglish.',
    hinglish:
      'JavaScript zero se deployed app tak: values aur functions, arrays aur objects, DOM, fetch aur async, closures aur patterns — phir debugging, performance, security, tooling aur deployment, saath mein Expense Tracker banate hue. Har module mein labs. English aur Hinglish mein.',
  },
  difficulty: 'beginner',
  certification: {
    requireQuizzes: true,
    title: 'JavaScript Developer',
    subtitle: 'Beginner → Advanced',
    note: 'Expense Tracker project completed',
  },
};

export const curriculum = buildCurriculum(MODULES, { version: 'ES2023 · modern browsers' });
