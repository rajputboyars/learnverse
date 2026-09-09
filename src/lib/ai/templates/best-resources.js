import { LEARNER_SYSTEM, inputBlock, jsonInstruction } from './shared';

const SHAPE = {
  summary: 'the shortest honest answer to "where do I learn this?"',
  confidence: 'high | medium | low',
  resources: [
    {
      name: '…',
      kind: 'docs | course | video | book | article | practice | community',
      cost: 'free | freemium | paid',
      level: 'beginner | intermediate | advanced',
      whyGood: 'one sentence',
      timeToValue: 'e.g. "a weekend"',
      url: 'official link if confident, else ""',
    },
  ],
  order: ['what to use first, second, third'],
  avoid: [{ name: '…', why: '…' }],
};

const template = {
  id: 'best-resources',
  title: 'Best Learning Resources',
  titleHi: 'Sabse achhe Learning Resources',
  short: 'Find the docs, courses, videos and practice worth your time.',
  shortHi: 'Wo docs, courses, videos aur practice dhoondho jo tumhare time ke layak hain.',
  description:
    'Pulls together the resources that actually teach a topic well, sorted into the order you should use them.',
  descriptionHi:
    'Un resources ko ek jagah laata hai jo kisi topic ko sach mein achhe se sikhate hain, us order mein jismein tumhe unhe use karna chahiye.',
  category: 'learning',
  icon: 'book-open',
  cta: 'Find Best Resources',
  ctaHi: 'Sabse achhe Resources dhoondho',
  version: '1.0',
  status: 'active',
  outputFormat: 'structured',
  resultView: 'resources',
  inputs: [
    {
      name: 'topic',
      label: 'Topic',
      labelHi: 'Topic',
      type: 'text',
      required: true,
      placeholder: 'JavaScript closures, Kubernetes, SQL joins…',
      placeholderHi: 'JavaScript closures, Kubernetes, SQL joins…',
    },
    {
      name: 'level',
      label: 'Your level',
      labelHi: 'Tumhara level',
      type: 'select',
      options: ['Complete beginner', 'Some basics', 'Intermediate', 'Advanced'],
      default: 'Some basics',
    },
    {
      name: 'format',
      label: 'Preferred format',
      labelHi: 'Kaunsa format pasand hai',
      type: 'select',
      options: ['Any', 'Reading', 'Video', 'Hands-on practice'],
      default: 'Any',
    },
    { name: 'language', label: 'Language', type: 'select', options: ['English', 'Hindi / Hinglish', 'Either'], default: 'Either' },
  ],
  system: LEARNER_SYSTEM,

  build(inputs) {
    return [
      'Recommend the best resources for learning this topic — eight at most, quality over quantity.',
      '',
      inputBlock(template, inputs),
      '',
      'Mix formats unless one was requested. Say plainly why each resource is worth it and roughly',
      'how long before it pays off. Give the order to work through them.',
      'Include an "avoid" list only for things genuinely outdated or misleading — never to be snarky.',
      'Only include a URL when you are confident it is correct; an empty string is better than a guess.',
      jsonInstruction(SHAPE),
    ].join('\n');
  },

  demo(inputs) {
    const topic = inputs?.topic || 'JavaScript';
    return {
      summary: `Sample list for ${topic}. Start with the official reference, then build something small before touching a course.`,
      confidence: 'low',
      resources: [
        {
          name: 'MDN Web Docs',
          kind: 'docs',
          cost: 'free',
          level: 'beginner',
          whyGood: 'Accurate, exhaustive, and the examples run.',
          timeToValue: 'an afternoon',
          url: 'https://developer.mozilla.org',
        },
        {
          name: 'Learnverse concepts',
          kind: 'course',
          cost: 'free',
          level: 'beginner',
          whyGood: 'Same idea explained twice — English and Hinglish — with a desi example.',
          timeToValue: 'a weekend',
          url: '/courses',
        },
      ],
      order: ['Skim the docs', 'Build one small thing', 'Go back for the parts that broke'],
      avoid: [],
    };
  },
};

export default template;
