import { LEARNER_SYSTEM, inputBlock, jsonInstruction } from './shared';

const SHAPE = {
  summary: 'one paragraph on what is moving and why',
  asOf: 'the period this reflects, e.g. "2026 Q1"',
  confidence: 'high | medium | low — how sure you are, given you have no live feed',
  skills: [
    {
      name: 'AI Engineering',
      rank: 1,
      previousRank: 3,
      demand: 'very high | high | moderate | low',
      trend: 'growing | stable | declining',
      whyNow: 'one sentence',
      hiringIndustries: ['…'],
      commonRoles: ['…'],
      difficulty: 'beginner | intermediate | advanced',
      learnOrder: 1,
      resources: ['…'],
    },
  ],
  decliningSkills: [{ name: '…', why: '…' }],
  recommendation: 'what a learner at this level should do next',
};

const template = {
  id: 'trending-skills',
  title: 'Trending Skills',
  short: 'See which skills are growing in demand, and how the ranking has shifted.',
  description:
    'Ranks the skills currently in demand for an industry and location, and compares each one against where it stood earlier.',
  category: 'career',
  icon: 'chart-line',
  cta: 'Analyze Trending Skills',
  version: '1.0',
  status: 'active',
  outputFormat: 'structured',
  resultView: 'ranking',
  inputs: [
    {
      name: 'industry',
      label: 'Industry / field',
      type: 'text',
      required: true,
      placeholder: 'Web development, Data science, DevOps…',
      default: 'Web development',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: false,
      placeholder: 'India, Remote, Bangalore…',
      default: 'India',
    },
    {
      name: 'experienceLevel',
      label: 'Experience level',
      type: 'select',
      options: ['Student / fresher', '0-2 years', '2-5 years', '5+ years'],
      default: 'Student / fresher',
    },
    {
      name: 'period',
      label: 'Compare against',
      type: 'select',
      options: ['Last month', 'Last 3 months', 'Last year'],
      default: 'Last year',
    },
  ],
  system: LEARNER_SYSTEM,

  build(inputs) {
    return [
      `Analyse current demand for skills in this field and rank the top 10.`,
      '',
      inputBlock(template, inputs),
      '',
      'For every skill give: current rank, the rank it held in the comparison period,',
      'the demand level, the trend direction, why it is moving, the industries hiring for it,',
      'the common job titles, how hard it is to learn, a sensible position in a learning order,',
      'and two or three specific learning resources.',
      'Also list skills whose demand is clearly falling.',
      'You do not have a live job feed — set "confidence" honestly and keep numbers out of the',
      'summary unless you are sure of them.',
      jsonInstruction(SHAPE),
    ].join('\n');
  },

  demo() {
    return {
      summary:
        'Sample data. AI tooling keeps pulling ahead of everything else, while raw front-end framework skill on its own is worth less than it was — teams now expect it alongside TypeScript and testing.',
      asOf: 'Sample snapshot',
      confidence: 'low',
      skills: [
        {
          name: 'AI Engineering',
          rank: 1,
          previousRank: 3,
          demand: 'very high',
          trend: 'growing',
          whyNow: 'Every product team is trying to ship an AI feature and few people can do it well.',
          hiringIndustries: ['SaaS', 'Fintech', 'E-commerce'],
          commonRoles: ['AI Engineer', 'ML Engineer', 'Full-stack + AI'],
          difficulty: 'intermediate',
          learnOrder: 1,
          resources: ['Anthropic docs', 'DeepLearning.AI short courses'],
        },
        {
          name: 'TypeScript',
          rank: 2,
          previousRank: 2,
          demand: 'very high',
          trend: 'stable',
          whyNow: 'It is the default for new front-end and Node codebases.',
          hiringIndustries: ['Product startups', 'Agencies'],
          commonRoles: ['Frontend Developer', 'Full-stack Developer'],
          difficulty: 'beginner',
          learnOrder: 2,
          resources: ['TypeScript handbook', 'Learnverse TypeScript course'],
        },
        {
          name: 'Cloud & DevOps',
          rank: 3,
          previousRank: 1,
          demand: 'high',
          trend: 'stable',
          whyNow: 'Still core, but more of it is handled by platforms than three years ago.',
          hiringIndustries: ['Enterprise', 'Fintech'],
          commonRoles: ['DevOps Engineer', 'Platform Engineer'],
          difficulty: 'advanced',
          learnOrder: 4,
          resources: ['Docker docs', 'Learnverse Docker course'],
        },
      ],
      decliningSkills: [
        { name: 'jQuery', why: 'Legacy maintenance only — almost no new work starts here.' },
      ],
      recommendation:
        'Pair one strong language with AI tooling. Depth in one stack beats a shallow pass over five.',
    };
  },
};

export default template;
