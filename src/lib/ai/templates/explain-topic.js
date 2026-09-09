import { LEARNER_SYSTEM, inputBlock, jsonInstruction } from './shared';

const SHAPE = {
  title: 'the topic, named plainly',
  titleHi: 'Koi Topic samjhao',
  oneLiner: 'the whole idea in one sentence',
  explanation: 'the main explanation, in the requested depth and language',
  dailyLifeExample: 'an everyday Indian analogy, the way Learnverse concepts do it',
  keyPoints: ['3-6 things to actually remember'],
  code: { language: 'javascript', snippet: 'runnable example, or "" if code makes no sense here' },
  commonMistakes: [{ mistake: '…', fix: '…' }],
  checkYourself: [{ question: '…', answer: '…' }],
  nextTopics: ['what to read after this'],
};

const template = {
  id: 'explain-topic',
  title: 'Explain a Topic',
  short: 'Any topic, at the depth you ask for, with a desi example.',
  shortHi: 'Koi bhi topic, jitni gehrai maango utni, ek desi example ke saath.',
  description:
    'Explains a concept the Learnverse way — plain words, a daily-life analogy, code, and a couple of questions to test yourself.',
  descriptionHi:
    'Kisi concept ko Learnverse ke tareeke se samjhata hai — seedhe shabd, ek rozmarra ki misaal, code, aur khud ko parakhne ke liye do sawaal.',
  category: 'learning',
  icon: 'lightbulb',
  cta: 'Explain Topic',
  ctaHi: 'Topic samjhao',
  version: '1.0',
  status: 'active',
  outputFormat: 'structured',
  resultView: 'explain',
  inputs: [
    {
      name: 'topic',
      label: 'Topic',
      labelHi: 'Topic',
      type: 'text',
      required: true,
      placeholder: 'JavaScript event loop, database indexing, JWT…',
      placeholderHi: 'JavaScript event loop, database indexing, JWT…',
    },
    {
      name: 'depth',
      label: 'Depth',
      labelHi: 'Kitni gehrai',
      type: 'select',
      options: ['Explain like I am new', 'Normal', 'Deep dive', 'Interview answer'],
      default: 'Normal',
    },
    {
      name: 'language',
      label: 'Language',
      labelHi: 'Bhasha',
      type: 'select',
      options: ['English', 'Hinglish'],
      default: 'English',
    },
    {
      name: 'context',
      label: 'Anything specific you are stuck on? (optional)',
      labelHi: 'Kisi khaas cheez pe atke ho? (optional)',
      type: 'textarea',
      placeholder: 'I get why it is async but not why setTimeout(0) still runs late…',
      placeholderHi: 'Async kyun hai wo samajh aaya, par setTimeout(0) phir bhi late kyun chalta hai wo nahi…',
    },
  ],
  system: LEARNER_SYSTEM,

  build(inputs) {
    const hinglish = inputs?.language === 'Hinglish';
    return [
      'Explain this topic for a Learnverse learner.',
      '',
      inputBlock(template, inputs),
      '',
      hinglish
        ? 'Write the explanation in Hinglish — Hindi in Roman script, mixed naturally with English technical terms. Keep the JSON keys in English.'
        : 'Write in plain English. Short sentences.',
      'The daily-life example must be genuinely Indian and everyday (chai stall queue, local train, ration line),',
      'not a generic textbook analogy.',
      'If the learner said what they are stuck on, answer that specifically before anything else.',
      jsonInstruction(SHAPE),
    ].join('\n');
  },

  demo(inputs) {
    const topic = inputs?.topic || 'the JavaScript event loop';
    return {
      title: topic,
      oneLiner: `Sample explanation of ${topic} — connect an AI provider for the real one.`,
      explanation:
        'This is demo content so you can see how a result is laid out. Connect a provider in Settings → AI Connections and run it again for an actual explanation.',
      dailyLifeExample:
        'Think of a chai stall: one person makes the chai (the single thread) while orders queue up behind.',
      keyPoints: ['Demo data', 'Connect a provider for real output'],
      code: { language: 'javascript', snippet: '' },
      commonMistakes: [],
      checkYourself: [],
      nextTopics: [],
    };
  },
};

export default template;
