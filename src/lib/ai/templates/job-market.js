import { LEARNER_SYSTEM, inputBlock, jsonInstruction } from './shared';

const SHAPE = {
  summary: 'what employers are actually asking for right now',
  confidence: 'high | medium | low',
  roles: [
    {
      title: 'Frontend Developer',
      demand: 'very high | high | moderate | low',
      trend: 'growing | stable | declining',
      mustHaveSkills: ['…'],
      niceToHaveSkills: ['…'],
      typicalStack: ['…'],
      entryDifficulty: 'easy | moderate | hard',
      note: 'one honest sentence about the competition for this role',
    },
  ],
  risingSkills: [{ name: '…', why: '…' }],
  fadingSkills: [{ name: '…', why: '…' }],
  advice: 'what to do about it, for this experience level',
};

const template = {
  id: 'job-market',
  title: 'Job Market Demand',
  short: 'Find out which roles and skills employers are hiring for.',
  description:
    'Breaks the market down by role: what each one demands, what is rising, what is fading, and how hard it is to break in.',
  category: 'career',
  icon: 'briefcase',
  cta: 'Check Job Market',
  version: '1.0',
  status: 'active',
  outputFormat: 'structured',
  resultView: 'jobs',
  inputs: [
    {
      name: 'role',
      label: 'Role or field',
      type: 'text',
      required: true,
      placeholder: 'Frontend, Backend, Data, DevOps…',
      default: 'Frontend',
    },
    { name: 'location', label: 'Location', type: 'text', default: 'India' },
    {
      name: 'experienceLevel',
      label: 'Experience level',
      type: 'select',
      options: ['Student / fresher', '0-2 years', '2-5 years', '5+ years'],
      default: '0-2 years',
    },
    {
      name: 'companyType',
      label: 'Company type',
      type: 'select',
      options: ['Any', 'Startup', 'Product company', 'Service company', 'Remote / global'],
      default: 'Any',
    },
  ],
  system: LEARNER_SYSTEM,

  build(inputs) {
    return [
      'Describe the current hiring market for this field. Cover four to six concrete job roles.',
      '',
      inputBlock(template, inputs),
      '',
      'For each role list the skills that are genuinely required versus merely nice to have,',
      'the stack it usually comes with, and how hard it is to enter at this experience level.',
      'Then list skills clearly rising and clearly fading in this market.',
      'You have no live job-board feed — set "confidence" honestly and avoid invented salary figures.',
      jsonInstruction(SHAPE),
    ].join('\n');
  },

  demo() {
    return {
      summary:
        'Sample data. Front-end hiring is steady but the bar moved: TypeScript and testing are assumed, and "React only" profiles get filtered out early.',
      confidence: 'low',
      roles: [
        {
          title: 'Frontend Developer',
          demand: 'high',
          trend: 'stable',
          mustHaveSkills: ['JavaScript', 'React', 'TypeScript', 'Git'],
          niceToHaveSkills: ['Next.js', 'Testing', 'Accessibility'],
          typicalStack: ['React', 'Next.js', 'Tailwind'],
          entryDifficulty: 'moderate',
          note: 'Crowded at fresher level — a portfolio of real projects is what separates candidates.',
        },
        {
          title: 'Full-stack Developer',
          demand: 'very high',
          trend: 'growing',
          mustHaveSkills: ['Node.js', 'React', 'MongoDB or SQL', 'REST APIs'],
          niceToHaveSkills: ['Docker', 'AWS', 'System design'],
          typicalStack: ['MERN', 'Next.js'],
          entryDifficulty: 'moderate',
          note: 'Small teams prefer one person who can ship end to end.',
        },
      ],
      risingSkills: [
        { name: 'AI API integration', why: 'Almost every product roadmap now has an AI feature on it.' },
      ],
      fadingSkills: [{ name: 'jQuery', why: 'Maintenance work only.' }],
      advice:
        'Ship two projects that touch a database, an API and a deploy. That covers most fresher interviews.',
    };
  },
};

export default template;
