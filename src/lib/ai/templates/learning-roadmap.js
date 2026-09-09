import { LEARNER_SYSTEM, inputBlock, jsonInstruction } from './shared';

const SHAPE = {
  summary: 'the shape of the plan in two sentences',
  totalDuration: 'e.g. "about 4 months at 8 hours a week"',
  stages: [
    {
      title: 'Foundations',
      duration: 'e.g. "3 weeks"',
      goal: 'what you can do by the end of this stage',
      topics: ['…'],
      project: 'one thing to build that proves the stage is done',
      checkpoint: 'how to know you are ready to move on',
    },
  ],
  skipIf: [{ condition: 'you already know X', skip: 'stage name' }],
  risks: ['the usual ways people stall on this path'],
};

const template = {
  id: 'learning-roadmap',
  title: 'Create Learning Plan',
  titleHi: 'Learning Plan banao',
  short: 'Turn a goal into a staged plan with projects and checkpoints.',
  shortHi: 'Ek goal ko stages wale plan mein badlo, projects aur checkpoints ke saath.',
  description:
    'Builds a personal roadmap from where you are to where you want to be, with a project at every stage.',
  descriptionHi:
    'Tum jahan ho wahan se jahan pahunchna hai, wahan tak ka ek personal roadmap banata hai — har stage pe ek project ke saath.',
  category: 'learning',
  icon: 'map',
  cta: 'Generate Roadmap',
  ctaHi: 'Roadmap banao',
  version: '1.0',
  status: 'active',
  outputFormat: 'structured',
  resultView: 'roadmap',
  needsLearningContext: true,
  inputs: [
    {
      name: 'goal',
      label: 'Your goal',
      labelHi: 'Tumhara goal',
      type: 'text',
      required: true,
      placeholder: 'Become a full-stack developer, crack a backend interview…',
      placeholderHi: 'Full-stack developer banna, backend interview crack karna…',
    },
    {
      name: 'known',
      label: 'What you already know',
      labelHi: 'Jo tum pehle se jaante ho',
      type: 'textarea',
      placeholder: 'HTML, CSS, some JavaScript…',
      placeholderHi: 'HTML, CSS, thoda JavaScript…',
    },
    {
      name: 'hoursPerWeek',
      label: 'Hours per week',
      labelHi: 'Hafte mein kitne ghante',
      type: 'select',
      options: ['2-5', '5-10', '10-20', '20+'],
      default: '5-10',
    },
    {
      name: 'deadline',
      label: 'Target timeline',
      labelHi: 'Target timeline',
      type: 'select',
      options: ['1 month', '3 months', '6 months', '1 year', 'No deadline'],
      default: '3 months',
    },
  ],
  system: LEARNER_SYSTEM,

  build(inputs, ctx) {
    return [
      'Build a realistic, staged learning roadmap for this person.',
      '',
      inputBlock(template, inputs),
      '',
      'Their activity so far on Learnverse (use it to avoid re-teaching what they have done):',
      '```json',
      JSON.stringify(ctx?.learning ?? {}, null, 2),
      '```',
      '',
      'Four to seven stages. Each stage needs one buildable project and a checkpoint that is a',
      'concrete capability, not a feeling. Fit the plan to the hours and deadline given — if the',
      'deadline is unrealistic for the goal, say so in "risks" and plan the honest version anyway.',
      jsonInstruction(SHAPE),
    ].join('\n');
  },

  demo(inputs) {
    return {
      summary: `Sample roadmap for “${inputs?.goal || 'your goal'}”. Connect an AI provider to generate a real one.`,
      totalDuration: 'about 3 months at 5-10 hours a week',
      stages: [
        {
          title: 'Foundations',
          duration: '3 weeks',
          goal: 'Write JavaScript without copying from tutorials.',
          topics: ['Values and scope', 'Functions and closures', 'Arrays and objects', 'Async basics'],
          project: 'A small tool that fetches an API and renders the result.',
          checkpoint: 'You can explain closures to someone else.',
        },
        {
          title: 'Build for real',
          duration: '5 weeks',
          goal: 'Ship a full app with a database behind it.',
          topics: ['React', 'Routing', 'REST APIs', 'MongoDB'],
          project: 'A CRUD app with auth, deployed to a public URL.',
          checkpoint: 'A stranger can sign up and use it.',
        },
      ],
      skipIf: [{ condition: 'you already write JavaScript daily', skip: 'Foundations' }],
      risks: ['Tutorial loops — watching instead of building is the usual stall point.'],
    };
  },
};

export default template;
