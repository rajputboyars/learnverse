// Curated reference links per course, shown on every question as "read more".
//
// Deliberately COURSE-level, not question-level. A per-question deep link
// cannot be guessed reliably, and a wrong link is worse than no link — so a
// question only ever gets links we know are correct for its subject, plus the
// concept it came from when that link exists.
//
// To go finer later, add a `sources` array to a question in the content module
// and render that instead; the component prefers question-level links when
// they are present.

export const COURSE_SOURCES = {
  javascript: [
    { label: 'JavaScript Guide', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', host: 'developer.mozilla.org', mark: 'M' },
    { label: 'The Modern JavaScript Tutorial', href: 'https://javascript.info/', host: 'javascript.info', mark: 'JS' },
  ],
  'dsa-javascript': [
    { label: 'JavaScript Guide', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', host: 'developer.mozilla.org', mark: 'M' },
  ],
  html: [
    { label: 'HTML reference', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML', host: 'developer.mozilla.org', mark: 'M' },
  ],
  html5: [
    { label: 'HTML reference', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML', host: 'developer.mozilla.org', mark: 'M' },
  ],
  css: [
    { label: 'CSS reference', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS', host: 'developer.mozilla.org', mark: 'M' },
    { label: 'A Complete Guide to Flexbox', href: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', host: 'css-tricks.com', mark: 'CT' },
  ],
  tailwind: [
    { label: 'Tailwind docs', href: 'https://tailwindcss.com/docs', host: 'tailwindcss.com', mark: 'TW' },
  ],
  react: [
    { label: 'React docs', href: 'https://react.dev/learn', host: 'react.dev', mark: 'R' },
  ],
  nextjs: [
    { label: 'Next.js docs', href: 'https://nextjs.org/docs', host: 'nextjs.org', mark: 'N' },
  ],
  nodejs: [
    { label: 'Node.js docs', href: 'https://nodejs.org/docs/latest/api/', host: 'nodejs.org', mark: 'N' },
  ],
  express: [
    { label: 'Express guide', href: 'https://expressjs.com/en/guide/routing.html', host: 'expressjs.com', mark: 'E' },
  ],
  mongodb: [
    { label: 'MongoDB manual', href: 'https://www.mongodb.com/docs/manual/', host: 'mongodb.com', mark: 'DB' },
  ],
  typescript: [
    { label: 'TypeScript handbook', href: 'https://www.typescriptlang.org/docs/handbook/intro.html', host: 'typescriptlang.org', mark: 'TS' },
  ],
  python: [
    { label: 'Python docs', href: 'https://docs.python.org/3/', host: 'docs.python.org', mark: 'PY' },
  ],
  git: [
    { label: 'Pro Git', href: 'https://git-scm.com/book/en/v2', host: 'git-scm.com', mark: 'G' },
  ],
  docker: [
    { label: 'Docker docs', href: 'https://docs.docker.com/', host: 'docs.docker.com', mark: 'D' },
  ],
  eds: [
    { label: 'AEM Edge Delivery docs', href: 'https://www.aem.live/docs/', host: 'aem.live', mark: 'AEM' },
  ],
  restapi: [
    { label: 'HTTP reference', href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP', host: 'developer.mozilla.org', mark: 'M' },
  ],
};

export function sourcesForCourse(slug) {
  return COURSE_SOURCES[slug] || [];
}
