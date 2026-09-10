// Small builders that keep the Jahia lesson files readable.
//
// A lesson file is mostly data; these helpers remove the repetition of the
// bilingual shape, the quiz shape and the sectioned interview answer.

import { legacy } from './legacy.mjs';

/** Bilingual string. */
export const t = (english, hinglish) => ({ english, hinglish: hinglish || english });

/** Quiz question. */
export const q = (question, options, correctIndex, explanation) => ({ question, options, correctIndex, explanation });

/**
 * Interview question in the course's five-part format: short answer (the
 * answer field), then deep answer, real-world example, code and an interview
 * tip as deep-dive sections — the existing interview UI renders them.
 */
export function iq({ question, difficulty = 'medium', short, deep, example, code, tip }) {
  const section = (en, hi, value, extra = {}) => ({
    heading: { en, hi },
    body: { en: value?.english || '', hi: value?.hinglish || value?.english || '' },
    code: '',
    diagram: '',
    ...extra,
  });
  return {
    question,
    difficulty,
    frequency: 'common',
    answer: short,
    deepDive: [
      deep && section('Deep answer', 'Detail mein', deep),
      example && section('Real-world example', 'Real-world example', example),
      code && section('Code example', 'Code example', t(code.note || '', code.noteHi || code.note || ''), { code: code.code }),
      tip && section('Interview tip', 'Interview tip', tip),
    ].filter(Boolean),
  };
}

/** Screenshot with its drawn fallback. */
export const shot = ({ src, title, description, mock, markers = [], caption }) => ({
  src,
  title,
  description,
  mock,
  markers: markers.map((label, i) => ({ number: i + 1, label })),
  caption,
});

/**
 * One of the original fifteen concepts, upgraded: same title (so same _id and
 * everyone's progress), original text kept, lesson block and extra practice
 * added.
 */
export function fromLegacy(title, extra = {}) {
  const base = legacy[title];
  if (!base) throw new Error(`No legacy Jahia concept titled "${title}"`);
  return {
    ...base,
    codeLanguage: extra.codeLanguage || base.codeLanguage,
    tags: [...new Set([...(base.tags || []), ...(extra.tags || [])])],
    keyPoints: [...(base.keyPoints || []), ...(extra.keyPoints || [])],
    quiz: [...(base.quiz || []), ...(extra.quiz || [])],
    interviewQuestions: [...(base.interviewQuestions || []), ...(extra.interviewQuestions || [])],
    lesson: extra.lesson,
  };
}

/** The chain the whole course is built on. */
export const CHAIN = {
  steps: [
    'CND',
    { label: 'Node type', sub: 'lv:article' },
    { label: 'CMS field', sub: 'Content Editor' },
    { label: 'Author input', sub: 'Save' },
    { label: 'JCR node', sub: '/sites/…' },
    { label: 'View', sub: 'article.jsp' },
    'Frontend',
  ],
};
