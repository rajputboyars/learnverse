// Builders shared by every upgraded course's content files.
//
// Upgrading a course keeps its concepts (same titles → same _ids → everyone's
// progress survives) and adds a hands-on `lesson` block, new labs, debugging,
// project and interview lessons. These helpers keep that data readable.

/** Bilingual string. */
export const t = (english, hinglish) => ({ english, hinglish: hinglish || english });

/** Quiz question. */
export const q = (question, options, correctIndex, explanation) => ({ question, options, correctIndex, explanation });

/**
 * Interview question in the five-part format: short answer (the `answer`
 * field), then deep answer, real-world example, code and interview tip as
 * deep-dive sections — rendered by the existing interview UI.
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

/** Console output as a CodeResult result. */
export const out = (text) => ({ type: 'terminal', text });

/**
 * Returns a function that upgrades one legacy concept by title: original
 * text kept, lesson block attached, extra practice appended.
 */
export function legacyUpgrader(legacyMap, courseName) {
  return function fromLegacy(title, extra = {}) {
    const base = legacyMap[title];
    if (!base) throw new Error(`No legacy ${courseName} concept titled "${title}"`);
    return {
      ...base,
      codeLanguage: extra.codeLanguage || base.codeLanguage,
      tags: [...new Set([...(base.tags || []), ...(extra.tags || [])])],
      keyPoints: [...(base.keyPoints || []), ...(extra.keyPoints || [])],
      quiz: [...(base.quiz || []), ...(extra.quiz || [])],
      interviewQuestions: [...(base.interviewQuestions || []), ...(extra.interviewQuestions || [])],
      lesson: extra.lesson,
    };
  };
}

/**
 * Turns modules into the curriculum shape add-course.mjs expects, stamping
 * each lesson with its module, band, level and stage so the lesson page can
 * show them without another query.
 */
export function buildCurriculum(modules, { version } = {}) {
  return modules.map((m) => ({
    title: m.title,
    level: m.level,
    band: m.band,
    stage: m.stage,
    estimatedMinutes: m.estimatedMinutes,
    description: m.description,
    concepts: m.concepts.map((c) => ({
      ...c,
      lesson: {
        ...(version ? { version } : {}),
        minutes: 15,
        ...(c.lesson || {}),
        module: m.title,
        level: m.levelLabel || m.level,
        stage: m.stage,
        band: m.band,
      },
    })),
  }));
}
