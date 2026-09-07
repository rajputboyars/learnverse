import { LEARNER_SYSTEM, inputBlock, jsonInstruction } from './shared';

const SHAPE = {
  summary: 'what the recorded activity says about how this person learns',
  confidence: 'high | medium | low — lower it when there is little data',
  strengths: [{ title: '…', detail: '…' }],
  gaps: [{ title: '…', detail: '…' }],
  patterns: [{ observation: '…', basedOn: 'which numbers this came from' }],
  nextSteps: [{ action: '…', why: '…', effort: 'small | medium | large' }],
  encouragement: 'one honest, non-patronising sentence',
};

const template = {
  id: 'learning-analysis',
  title: 'My Learning Analysis',
  short: 'Read your own activity back: consistency, strengths, what is slipping.',
  description:
    'Looks at your recorded XP, streak, completed concepts and course progress, and says what the pattern suggests.',
  category: 'analytics',
  icon: 'chart',
  cta: 'Analyze My Progress',
  version: '1.0',
  status: 'active',
  outputFormat: 'structured',
  resultView: 'analysis',
  needsLearningContext: true,
  inputs: [
    {
      name: 'goal',
      label: 'What are you working towards?',
      type: 'text',
      placeholder: 'First developer job, switch to backend, clear interviews…',
    },
    {
      name: 'tone',
      label: 'How direct should it be?',
      type: 'select',
      options: ['Encouraging', 'Balanced', 'Blunt'],
      default: 'Balanced',
    },
  ],
  system: LEARNER_SYSTEM,

  build(inputs, ctx) {
    return [
      'Analyse this learner’s recorded activity on Learnverse.',
      '',
      inputBlock(template, inputs),
      '',
      'Recorded activity (this is the only data you have — do not assume anything beyond it):',
      '```json',
      JSON.stringify(ctx?.learning ?? {}, null, 2),
      '```',
      '',
      'Ground every observation in a number that is actually present above, and name that number',
      'in "basedOn". Where the data is too thin to support a claim, say so instead of guessing.',
      'Phrase observations as "your recorded activity shows…", never as certainties about the person.',
      jsonInstruction(SHAPE),
    ].join('\n');
  },

  demo(inputs, ctx) {
    const l = ctx?.learning || {};
    return {
      summary: `Sample analysis. Your recorded activity shows ${l.conceptsCompleted ?? 0} concepts completed and a ${l.currentStreak ?? 0}-day streak — connect an AI provider for a real read of this.`,
      confidence: 'low',
      strengths: [
        { title: 'You come back', detail: `A streak of ${l.currentStreak ?? 0} days is the hard part of learning, and you have it.` },
      ],
      gaps: [
        { title: 'Breadth over depth', detail: 'Progress is spread across courses rather than finishing one.' },
      ],
      patterns: [
        { observation: 'Most activity is concept reading rather than quizzes.', basedOn: 'conceptsCompleted vs quizzesPassed' },
      ],
      nextSteps: [
        { action: 'Finish the course you are furthest through', why: 'A completed course is worth more than three half-done ones.', effort: 'medium' },
      ],
      encouragement: 'Consistency is already there. Point it at one thing.',
    };
  },
};

export default template;
