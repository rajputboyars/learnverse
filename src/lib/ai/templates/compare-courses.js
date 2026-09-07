import { LEARNER_SYSTEM, inputBlock, jsonInstruction } from './shared';

const SHAPE = {
  summary: 'the short answer to "which one should I pick?"',
  confidence: 'high | medium | low',
  criteria: ['Beginner friendly', 'Depth', 'Projects', 'Price', 'Community', 'Certificate', 'Freshness'],
  options: [
    {
      name: 'freeCodeCamp',
      kind: 'platform | course | book | channel | docs | bootcamp',
      scores: { 'Beginner friendly': 5, Depth: 3, Projects: 5, Price: 5, Community: 4, Certificate: 3, Freshness: 4 },
      price: 'Free / ₹… per month / one-time',
      bestFor: 'who should pick this',
      strengths: ['…'],
      weaknesses: ['…'],
      url: 'official link if you are sure of it, else ""',
    },
  ],
  verdict: [{ profile: 'Complete beginner', pick: '…', why: '…' }],
  caution: 'anything the learner should verify themselves, e.g. current pricing',
};

const template = {
  id: 'compare-courses',
  title: 'Compare Courses',
  short: 'Compare platforms and courses on the things that actually matter.',
  description:
    'Scores learning options side by side — beginner friendliness, depth, projects, price, community — and says who each one suits.',
  category: 'learning',
  icon: 'table',
  cta: 'Compare Courses',
  version: '1.0',
  status: 'active',
  outputFormat: 'structured',
  resultView: 'comparison',
  inputs: [
    {
      name: 'topic',
      label: 'What do you want to learn?',
      type: 'text',
      required: true,
      placeholder: 'React, System design, Python for data…',
    },
    {
      name: 'options',
      label: 'Specific options to compare (optional)',
      type: 'text',
      placeholder: 'Udemy, freeCodeCamp, Scrimba — leave blank to let AI pick',
    },
    {
      name: 'budget',
      label: 'Budget',
      type: 'select',
      options: ['Free only', 'Under ₹1,000', 'Under ₹5,000', 'No limit'],
      default: 'Free only',
    },
    {
      name: 'level',
      label: 'Your level',
      type: 'select',
      options: ['Complete beginner', 'Some basics', 'Intermediate', 'Advanced'],
      default: 'Some basics',
    },
  ],
  system: LEARNER_SYSTEM,

  build(inputs) {
    return [
      'Compare the best ways to learn this topic. Cover five to seven options.',
      'If specific options are named, compare exactly those; otherwise choose the ones most worth a learner’s time.',
      '',
      inputBlock(template, inputs),
      '',
      'Score every option 1-5 on each criterion, using the same criteria list for all of them.',
      'Prices change often — give a rough band and flag in "caution" that it needs checking.',
      'Only include a URL when you are confident it is the official one.',
      jsonInstruction(SHAPE),
    ].join('\n');
  },

  demo(inputs) {
    const topic = inputs?.topic || 'React';
    return {
      summary: `Sample comparison for ${topic}. The free options are strong enough that paying only makes sense for structure and mentorship.`,
      confidence: 'low',
      criteria: ['Beginner friendly', 'Depth', 'Projects', 'Price', 'Community'],
      options: [
        {
          name: 'Official docs',
          kind: 'docs',
          scores: { 'Beginner friendly': 4, Depth: 5, Projects: 3, Price: 5, Community: 4 },
          price: 'Free',
          bestFor: 'Anyone who can read and build at the same time',
          strengths: ['Always current', 'Written by the maintainers'],
          weaknesses: ['No hand-holding'],
          url: '',
        },
        {
          name: 'freeCodeCamp',
          kind: 'platform',
          scores: { 'Beginner friendly': 5, Depth: 3, Projects: 5, Price: 5, Community: 4 },
          price: 'Free',
          bestFor: 'Complete beginners who want a fixed path',
          strengths: ['Project-driven', 'Large community'],
          weaknesses: ['Thin on advanced topics'],
          url: '',
        },
      ],
      verdict: [
        { profile: 'Complete beginner', pick: 'freeCodeCamp', why: 'A structured path beats freedom early on.' },
        { profile: 'Intermediate', pick: 'Official docs', why: 'Depth and accuracy, no filler.' },
      ],
      caution: 'Sample data — verify current pricing and course dates before you commit.',
    };
  },
};

export default template;
