export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const course = {
  title: 'Claude AI',
  slug: 'claude-ai',
  icon: '🧡',
  description:
    'Master Anthropic\'s Claude — from conversational use to the API. Learn every plan tier, the full model family, 200K context, Projects, Artifacts, Extended Thinking, and prompt engineering with XML tags.',
  order: 35,
  level: 'beginner',
  status: 'published',
  tags: ['claude', 'anthropic', 'ai', 'llm', 'prompt-engineering'],
  category: 'AI Tools',
};

export const curriculum = [
  // ─────────────────────────────────────────────
  // Topic 1 — What is Claude?
  // ─────────────────────────────────────────────
  {
    title: 'Introduction to Claude',
    description: 'Understand what Claude is, how it differs from other LLMs, and the Constitutional AI training approach.',
    level: 'beginner',
    concepts: [
      {
        title: 'What is Claude?',
        explanation: {
          english:
            'Claude is a family of large language models (LLMs) built by Anthropic. Unlike a search engine that finds existing pages, Claude generates responses by predicting text based on patterns learned from a vast corpus of books, code, and web content. Every response is newly generated — Claude doesn\'t look things up; it reasons through them.\n\nAnthropic was founded in 2021 by former OpenAI researchers with a mission to build AI that is safe, beneficial, and understandable. Claude is their flagship product, available at claude.ai and via the Anthropic API.',
          hinglish:
            'Claude ek AI assistant hai jo Anthropic ne banaya hai. Ye search engine nahi hai — ye text generate karta hai apni training se. Claude.ai pe chat kar sakte ho ya API se apne apps mein integrate kar sakte ho. Anthropic ka focus hai safe aur helpful AI banana.',
        },
        dailyLifeExample:
          'You give Claude a 50-page legal contract and ask "summarise the key obligations". Claude reads every word and produces a structured summary — something a search engine can\'t do.',
        codeExample: `// Minimal Anthropic SDK call (Node.js)
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const message = await client.messages.create({
  model: 'claude-opus-4-8',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Explain photosynthesis in one sentence.' }
  ],
});

console.log(message.content[0].text);`,
        keyPoints: [
          'Claude is developed by Anthropic, an AI-safety company.',
          'It generates novel text — it does not retrieve from a database.',
          'Available as claude.ai (web/mobile) and via the Anthropic API.',
          'Trained on a diverse corpus: books, code, web, scientific papers.',
        ],
        quiz: [
          {
            question: 'Who builds Claude?',
            options: ['OpenAI', 'Google', 'Anthropic', 'Meta'],
            correct: 2,
          },
          {
            question: 'How does Claude produce answers?',
            options: [
              'Looks them up in a database',
              'Generates them based on trained patterns',
              'Copies from Wikipedia',
              'Runs a calculator',
            ],
            correct: 1,
          },
        ],
        tags: ['claude', 'anthropic', 'llm', 'introduction'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'What is Claude and who makes it?',
            answer: {
              english:
                'Claude is a large language model developed by Anthropic. It generates human-like text responses by predicting the next token based on patterns learned during training. Anthropic focuses heavily on AI safety, using a technique called Constitutional AI to align Claude\'s behaviour.',
              hinglish:
                'Claude ek LLM hai jo Anthropic ne banaya hai. Ye text generate karta hai training ke patterns se. Anthropic AI safety pe focus karti hai aur Constitutional AI se Claude ko align karti hai.',
            },
            difficulty: 'easy',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Constitutional AI and Safety',
        explanation: {
          english:
            'Constitutional AI (CAI) is Anthropic\'s training methodology. Instead of relying solely on human feedback, Claude is trained against a written "constitution" — a set of principles about helpfulness, harmlessness, and honesty. During training a separate AI model critiques Claude\'s responses against these principles and guides self-revision.\n\nThis makes Claude less likely to produce harmful content, manipulative text, or dangerous instructions, while remaining genuinely helpful. Claude is also trained to express uncertainty ("I\'m not sure about this") rather than confidently hallucinating.',
          hinglish:
            'Constitutional AI matlab Claude ko ek "constitution" ke against train kiya gaya hai — rules ki ek list jo batati hai kya helpful, harmless, aur honest hai. Claude apni responses ko khud critique karta hai in rules ke against. Iska result hai ki Claude zyada safe aur honest hota hai.',
        },
        dailyLifeExample:
          'If you ask Claude how to pick a lock, it balances helpfulness (you might be locked out of your own house) against harm potential, giving a measured response rather than a step-by-step guide.',
        codeExample: `// Claude naturally adds caveats when uncertain
const response = await client.messages.create({
  model: 'claude-opus-4-8',
  max_tokens: 256,
  messages: [{
    role: 'user',
    content: 'What is the population of Mars?'
  }],
});
// Claude will say something like:
// "Mars has no permanent human population as of my knowledge cutoff..."
// Rather than hallucinating a number.`,
        keyPoints: [
          'Constitutional AI uses a written set of principles to guide training.',
          'A secondary "critic" model scores responses against the constitution.',
          'Goal: helpful, harmless, honest — the "HHH" framework.',
          'Claude expresses uncertainty rather than confidently hallucinating.',
        ],
        quiz: [
          {
            question: 'What does "Constitutional AI" mean?',
            options: [
              'AI trained only on law books',
              'AI trained against a written set of principles',
              'AI with a legal API licence',
              'AI running on government servers',
            ],
            correct: 1,
          },
        ],
        tags: ['constitutional-ai', 'safety', 'anthropic', 'hhh'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'What is Constitutional AI?',
            answer: {
              english:
                'Constitutional AI is Anthropic\'s training method that uses a written set of principles (a "constitution") to guide model behaviour. A second AI model critiques responses against these principles, allowing iterative self-improvement without sole reliance on human labellers. The goal is for Claude to be Helpful, Harmless, and Honest.',
              hinglish:
                'Constitutional AI Anthropic ka training method hai jisme ek "constitution" — rules ki list — se model ko guide kiya jaata hai. Ek aur AI model responses ko critique karta hai in rules se. Goal hai HHH: Helpful, Harmless, Honest.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Claude Model Family: Haiku, Sonnet, Opus',
        explanation: {
          english:
            'Anthropic releases Claude in three tiers for different speed/intelligence trade-offs:\n\n**Haiku** — the fastest and most affordable. Ideal for high-volume tasks: classification, summarisation, simple Q&A, customer support routing. Response time is typically under 1 second.\n\n**Sonnet** — the balanced workhorse. Strong reasoning, coding, and writing with moderate latency. This is the default model for most applications.\n\n**Opus** — the most capable. Best for complex analysis, nuanced writing, hard coding problems, and research synthesis. Slowest and most expensive, but highest quality.\n\nModel versions (e.g. claude-opus-4-8, claude-sonnet-4-6, claude-haiku-4-5) add date-stamped capability improvements. Always use the latest version unless you need reproducibility.',
          hinglish:
            'Claude teen tiers mein aata hai:\n- Haiku: sabse fast, sabse sasta. Simple tasks ke liye.\n- Sonnet: balanced. Coding, writing, reasoning ke liye best.\n- Opus: sabse powerful. Complex analysis ke liye.\n\nHar tier ka ek version number hota hai jaise claude-opus-4-8. Latest version use karo unless reproducibility chahiye.',
        },
        dailyLifeExample:
          'Think of Haiku as a junior assistant who answers emails quickly, Sonnet as a senior developer who writes solid code, and Opus as a principal engineer who reviews architecture decisions.',
        codeExample: `// Choose model based on task complexity
const MODELS = {
  fast:     'claude-haiku-4-5-20251001',   // < 1s, cheapest
  balanced: 'claude-sonnet-4-6',            // best all-rounder
  best:     'claude-opus-4-8',              // highest quality
};

// Simple classification → Haiku
const classify = await client.messages.create({
  model: MODELS.fast,
  max_tokens: 10,
  messages: [{ role: 'user', content: 'Is this spam? "Win a prize!" Answer yes/no.' }],
});

// Complex code review → Opus
const review = await client.messages.create({
  model: MODELS.best,
  max_tokens: 2048,
  messages: [{ role: 'user', content: 'Review this 500-line Node.js service for security issues...' }],
});`,
        keyPoints: [
          'Haiku: fastest, cheapest — use for high-volume, simple tasks.',
          'Sonnet: balanced speed and intelligence — the everyday model.',
          'Opus: most intelligent — use for complex reasoning and coding.',
          'Version numbers (e.g. 4-8) indicate capability generation.',
          'Match the model to the task to control cost and latency.',
        ],
        quiz: [
          {
            question: 'Which Claude model is best for real-time customer support routing?',
            options: ['Opus', 'Sonnet', 'Haiku', 'All are equal'],
            correct: 2,
          },
          {
            question: 'Which model would you pick for complex architecture analysis?',
            options: ['Haiku', 'Sonnet', 'Opus', 'None — use GPT-4 instead'],
            correct: 2,
          },
        ],
        tags: ['haiku', 'sonnet', 'opus', 'model-selection'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'When would you choose Claude Haiku over Opus?',
            answer: {
              english:
                'Haiku is ideal when latency and cost matter more than raw intelligence: real-time classification, short summarisation, form validation, or high-throughput pipelines where sub-second responses are needed. Opus is reserved for tasks that genuinely require deep reasoning, like complex code review or multi-step research synthesis.',
              hinglish:
                'Haiku tab use karo jab speed aur cost priority ho: real-time classification, short summary, high-throughput pipelines. Opus tab use karo jab genuinely deep reasoning chahiye — complex code review ya research synthesis.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Topic 2 — Plans & Features
  // ─────────────────────────────────────────────
  {
    title: 'Claude Plans and Key Features',
    description: 'Compare Free, Pro, Team, and Enterprise tiers; understand Projects, Artifacts, and the 200K context window.',
    level: 'beginner',
    concepts: [
      {
        title: 'Free vs Pro vs Team vs Enterprise',
        explanation: {
          english:
            '**Free** — No credit card required. Access to Claude Sonnet with a daily message limit. Great for casual use, learning, and light tasks. No Projects, no priority access during peak hours.\n\n**Pro ($20/month)** — 5× more usage than Free. Access to all models including Opus. Priority access during peak hours. Projects with persistent memory, extended thinking, and voice mode. Best for individual power users.\n\n**Team ($30/user/month, min 5 users)** — Everything in Pro, plus a central admin console, usage analytics, shared Projects, and a higher context window for large codebases. Designed for small–medium teams.\n\n**Enterprise (custom pricing)** — SSO/SAML, audit logs, custom data retention, dedicated capacity, SLA guarantees, and Anthropic support SLAs. For regulated industries and large organisations.',
          hinglish:
            'Free plan mein limited messages milte hain, Claude Sonnet ke saath. Pro ($20/mo) mein Opus bhi milta hai, 5x zyada usage, Projects, Extended Thinking. Team ($30/user/mo) mein admin console aur shared Projects hote hain. Enterprise mein SSO, audit logs, aur custom pricing hoti hai.',
        },
        dailyLifeExample:
          'A freelance developer would pick Pro. A 20-person startup would use Team for shared prompts and admin oversight. A bank would need Enterprise for compliance and audit logs.',
        codeExample: `/* Plan features at a glance (not code — reference table)
┌─────────────┬────────┬────────┬────────┬───────────┐
│ Feature     │ Free   │ Pro    │ Team   │ Enterprise│
├─────────────┼────────┼────────┼────────┼───────────┤
│ Models      │ Sonnet │ All    │ All    │ All       │
│ Usage       │ Low    │ 5×     │ 5×+    │ Custom    │
│ Projects    │ ✗      │ ✓      │ ✓      │ ✓         │
│ Ext Thinking│ ✗      │ ✓      │ ✓      │ ✓         │
│ Admin panel │ ✗      │ ✗      │ ✓      │ ✓         │
│ SSO/SAML    │ ✗      │ ✗      │ ✗      │ ✓         │
│ Audit logs  │ ✗      │ ✗      │ ✗      │ ✓         │
│ Price/mo    │ $0     │ $20    │ $30/u  │ Custom    │
└─────────────┴────────┴────────┴────────┴───────────┘
*/`,
        keyPoints: [
          'Free: limited messages, Sonnet only, no Projects.',
          'Pro ($20): all models, 5× usage, Projects, Extended Thinking.',
          'Team ($30/user): shared Projects, admin console, analytics.',
          'Enterprise: SSO, audit logs, custom retention, SLA.',
          'All plans store conversation history in Projects (Pro+).',
        ],
        quiz: [
          {
            question: 'Which plan includes SSO/SAML authentication?',
            options: ['Free', 'Pro', 'Team', 'Enterprise'],
            correct: 3,
          },
          {
            question: 'What is the minimum team size for the Team plan?',
            options: ['1', '3', '5', '10'],
            correct: 2,
          },
        ],
        tags: ['plans', 'pricing', 'free', 'pro', 'enterprise'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'What does the Claude Pro plan add over the Free plan?',
            answer: {
              english:
                'Claude Pro ($20/month) gives access to all models including Opus, roughly 5× the usage allowance, priority access during peak hours, Projects with persistent memory, Extended Thinking mode, and voice mode. The Free plan is limited to Claude Sonnet with a lower daily message cap.',
              hinglish:
                'Pro plan mein Opus bhi milta hai, 5x zyada messages, Projects, Extended Thinking, aur peak hours pe priority access. Free plan mein sirf Sonnet hota hai aur messages limited hote hain.',
            },
            difficulty: 'easy',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Projects — Persistent Memory & Context',
        explanation: {
          english:
            'Projects (Pro+) let you create named workspaces that remember context across sessions. Each Project has:\n- A **system prompt** (custom instructions that apply to every conversation in the project)\n- **File uploads** (PDFs, code files, text docs up to 30MB that persist in the project)\n- **Conversation history** that Claude can reference\n\nUse cases: a "My Codebase" project where you upload key files so Claude always has context; a "Customer Support" project with your product docs and tone guidelines; a "Research" project where you dump papers.\n\nWithout Projects, Claude forgets everything when you start a new chat. With Projects, it remembers your preferences and documents.',
          hinglish:
            'Projects ek named workspace hota hai jisme memory rehti hai sessions ke across. Isme aap system prompt set kar sakte ho (permanent instructions), files upload kar sakte ho (PDFs, code), aur Claude ko context milta rehta hai. Bina Projects ke, Claude har naye chat mein sab bhool jaata hai.',
        },
        dailyLifeExample:
          'Create a "Learnverse" project, upload your schema files and CLAUDE.md, and set a system prompt: "You are an expert Next.js engineer working on this codebase." Now every chat in that project already knows your stack.',
        codeExample: `// Projects are a claude.ai feature — use the API system prompt to replicate
const response = await client.messages.create({
  model: 'claude-opus-4-8',
  max_tokens: 2048,
  system: \`You are an expert Next.js 16 engineer.
The project uses: MongoDB, Mongoose, NextAuth v5, Tailwind CSS.
Database: MongoDB Atlas cluster named "learnverse".
Always use TypeScript-compatible patterns.\`,
  messages: [
    {
      role: 'user',
      content: 'Add pagination to the /api/courses endpoint.'
    }
  ],
});`,
        keyPoints: [
          'Projects remember context across separate conversations.',
          'Set a system prompt once — it applies to all chats in the project.',
          'Upload PDFs, code, and docs (up to 30 MB) as persistent knowledge.',
          'Available on Pro, Team, and Enterprise plans.',
          'Replicate in the API using the system parameter.',
        ],
        quiz: [
          {
            question: 'What is the main benefit of Claude Projects?',
            options: [
              'Faster response speed',
              'Persistent memory across sessions',
              'Access to Opus model',
              'Cheaper API pricing',
            ],
            correct: 1,
          },
        ],
        tags: ['projects', 'memory', 'context', 'system-prompt'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'How do Claude Projects differ from regular conversations?',
            answer: {
              english:
                'Regular Claude conversations are ephemeral — context is lost when the session ends. Projects persist across sessions: they store a custom system prompt, uploaded files, and conversation history. This makes them ideal for ongoing work like code review, content creation, or customer support where Claude needs consistent context.',
              hinglish:
                'Regular chat mein Claude sab bhool jaata hai session ke baad. Projects mein system prompt, files, aur history persist hoti hai. Isse ongoing work jaise code review ya support ke liye Claude ko baar baar explain nahi karna padta.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Artifacts — Code, HTML, React in Side Panel',
        explanation: {
          english:
            'When Claude generates code, documents, or visual content, it can render them in an **Artifact** — a persistent side panel that appears next to the chat. Artifacts support:\n- **Code** (any language, with syntax highlighting and copy button)\n- **HTML/CSS** (rendered live — you can interact with the page)\n- **React components** (rendered live using an in-browser React environment)\n- **Markdown documents** (rendered as formatted text)\n- **SVG graphics** (rendered visually)\n\nArtifacts persist within the conversation, so you can iterate: "Add a dark mode toggle" → Claude updates the Artifact in place. You can also download the Artifact directly.\n\nNote: Artifacts are a claude.ai feature, not available in the raw API.',
          hinglish:
            'Jab Claude code ya HTML generate karta hai, to wo ek Artifact — side panel — mein show hota hai. HTML aur React components live render hote hain. Aap directly interact kar sakte ho. "Dark mode add karo" bolne pe Claude Artifact update kar deta hai. Artifact download bhi ho sakta hai.',
        },
        dailyLifeExample:
          '"Build a todo app in React" — Claude renders a working React todo app in the side panel. You click "Add item", it works. Then you say "add local storage persistence" and Claude updates the same Artifact.',
        codeExample: `/* Ask Claude to generate a React Artifact: */
// Prompt: "Create a React counter component with increment, decrement,
//          and reset buttons. Style it with Tailwind CSS."
//
// Claude will produce something like:
import { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <span className="text-6xl font-bold">{count}</span>
      <div className="flex gap-3">
        <button onClick={() => setCount(c => c - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-xl">−</button>
        <button onClick={() => setCount(0)}
          className="px-4 py-2 bg-slate-500 text-white rounded-xl">Reset</button>
        <button onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-xl">+</button>
      </div>
    </div>
  );
}
// — and it renders live in the Artifact panel`,
        keyPoints: [
          'Artifacts appear as a side panel with rendered output.',
          'HTML and React Artifacts are interactive — you can click buttons.',
          'Claude can update Artifacts iteratively in the same conversation.',
          'Supported types: code, HTML, React, Markdown, SVG.',
          'Download Artifacts directly from the side panel.',
        ],
        quiz: [
          {
            question: 'Which of these can Claude render live in an Artifact?',
            options: [
              'Python scripts',
              'React components',
              'SQL queries',
              'Shell scripts',
            ],
            correct: 1,
          },
        ],
        tags: ['artifacts', 'react', 'html', 'code-rendering'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'What are Claude Artifacts and what types do they support?',
            answer: {
              english:
                'Artifacts are a claude.ai side-panel feature that renders Claude\'s output visually. They support code (any language), HTML/CSS (live interactive rendering), React components (live in-browser environment), Markdown documents, and SVG graphics. Artifacts persist in the conversation and can be updated iteratively.',
              hinglish:
                'Artifacts claude.ai ka ek side panel feature hai jisme output visually dikhta hai. Code, HTML (live), React (live), Markdown, SVG — sab support hote hain. Conversation mein persist karte hain aur iteratively update ho sakte hain.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Extended Thinking',
        explanation: {
          english:
            'Extended Thinking (Pro+) is a mode where Claude thinks step-by-step before answering. You see Claude\'s internal reasoning displayed in an expandable "thinking" section before the final answer. This improves accuracy on:\n- Multi-step math and logic problems\n- Complex coding tasks\n- Ambiguous prompts where assumptions need to be declared\n- Research synthesis across multiple documents\n\nExtended Thinking uses more tokens (and thus more cost/time) but significantly reduces errors on hard problems. In the API, enable it with `thinking: { type: "enabled", budget_tokens: N }`.',
          hinglish:
            'Extended Thinking ek mode hai jisme Claude pehle step-by-step soochta hai, phir answer deta hai. Uski "thinking" process ek expandable section mein dikhti hai. Isse hard problems pe accuracy badh jaati hai — jaise complex math, multi-step coding, ya ambiguous prompts.',
        },
        dailyLifeExample:
          'Ask Claude to debug a race condition in an async Node.js function. With Extended Thinking, Claude lays out every execution path before suggesting a fix — catching an edge case you\'d have missed.',
        codeExample: `// Extended Thinking via the Anthropic API
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const response = await client.messages.create({
  model: 'claude-opus-4-8',
  max_tokens: 16000,
  thinking: {
    type: 'enabled',
    budget_tokens: 10000, // tokens reserved for internal reasoning
  },
  messages: [{
    role: 'user',
    content: \`Solve this step by step:
A train leaves City A at 9am travelling at 60km/h.
Another train leaves City B (300km away) at 10am at 90km/h.
At what time and distance from City A do they meet?\`,
  }],
});

// Response has two content blocks:
for (const block of response.content) {
  if (block.type === 'thinking') {
    console.log('Claude\'s reasoning:', block.thinking);
  } else if (block.type === 'text') {
    console.log('Final answer:', block.text);
  }
}`,
        keyPoints: [
          'Extended Thinking shows Claude\'s internal step-by-step reasoning.',
          'Improves accuracy on hard math, logic, and coding problems.',
          'Uses more tokens — enable only when depth matters.',
          'API: set thinking: { type: "enabled", budget_tokens: N }.',
          'Available on Pro, Team, and Enterprise plans.',
        ],
        quiz: [
          {
            question: 'What does Extended Thinking improve?',
            options: [
              'Response speed',
              'Accuracy on complex multi-step problems',
              'Image generation quality',
              'Voice recognition',
            ],
            correct: 1,
          },
        ],
        tags: ['extended-thinking', 'reasoning', 'chain-of-thought', 'api'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'How does Extended Thinking work in the Claude API?',
            answer: {
              english:
                'You enable Extended Thinking by passing `thinking: { type: "enabled", budget_tokens: N }` in the message creation call. Claude then allocates up to N tokens for internal chain-of-thought reasoning before generating the final answer. The response contains two content block types: "thinking" (the internal scratchpad) and "text" (the final answer). This significantly improves accuracy on hard, multi-step problems.',
              hinglish:
                'API mein `thinking: { type: "enabled", budget_tokens: N }` pass karo. Claude N tokens tak internal reasoning karta hai phir final answer deta hai. Response mein do blocks hote hain: "thinking" (internal reasoning) aur "text" (final answer). Hard problems pe accuracy improve hoti hai.',
            },
            difficulty: 'hard',
            frequency: 'common',
          },
        ],
      },
      {
        title: '200K Token Context Window',
        explanation: {
          english:
            'Claude supports a 200,000 token context window — roughly 150,000 words or ~500 pages of text. This is one of the largest context windows of any commercially available LLM.\n\nWhat this means in practice:\n- Paste an entire large codebase and ask questions about it\n- Upload a 400-page book and ask "what are the main arguments in Chapter 12?"\n- Maintain very long multi-turn conversations without losing early context\n- Analyse a full day of server logs in a single call\n\nCaveats: The model\'s attention is not perfectly uniform — content in the middle of very long contexts may receive slightly less attention than content at the start and end ("lost in the middle" problem). Keep critical instructions at the start or end of the prompt.',
          hinglish:
            '200K token context window matlab Claude ek baar mein ~500 pages tak ka text process kar sakta hai. Puri codebase paste karo, 400-page book upload karo, ya lambi conversation karo bina context lose kiye. Ek caveat: bahut lambe contexts mein middle content ko thoda less attention milta hai — isliye important instructions start ya end mein rakho.',
        },
        dailyLifeExample:
          'You paste your entire 20,000-line monorepo into Claude and ask "find all places where we call the /api/users endpoint without checking for authentication". Claude scans the whole thing.',
        codeExample: `// Estimate token count before sending large documents
// Rule of thumb: 1 token ≈ 4 characters ≈ 0.75 words (English)
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

const CONTEXT_LIMIT = 200_000; // Claude's limit

async function analyseDocument(documentText) {
  const estimated = estimateTokens(documentText);
  if (estimated > CONTEXT_LIMIT - 2000) { // leave 2K for response
    throw new Error(\`Document too large: ~\${estimated} tokens\`);
  }

  return await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: \`Analyse this document and summarise key findings:\n\n\${documentText}\`,
    }],
  });
}`,
        keyPoints: [
          '200K tokens ≈ 150,000 words ≈ ~500 pages.',
          'Largest commercially available context window at launch.',
          'Enables whole-codebase analysis in a single call.',
          '"Lost in the middle" effect: put key instructions at start/end.',
          '1 token ≈ 4 characters (rough estimate for English).',
        ],
        quiz: [
          {
            question: 'Approximately how many pages can Claude\'s 200K context window handle?',
            options: ['50 pages', '100 pages', '200 pages', '500 pages'],
            correct: 3,
          },
        ],
        tags: ['context-window', '200k', 'tokens', 'long-context'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'What is the "lost in the middle" problem with large context windows?',
            answer: {
              english:
                'When a very long context is provided, LLMs tend to attend more strongly to content near the beginning and end of the input. Content in the middle may receive less attention, leading to missed details. The practical fix is to place critical instructions or key context at the start or end of the prompt, not buried in the middle.',
              hinglish:
                '"Lost in the middle" matlab bahut lambe context mein, LLM beginning aur end pe zyada dhyan deta hai. Middle content miss ho sakta hai. Fix: important instructions ko start ya end mein rakho, middle mein nahi.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Topic 3 — Anthropic API & Prompt Engineering
  // ─────────────────────────────────────────────
  {
    title: 'Anthropic API and Prompt Engineering',
    description: 'Use the Anthropic SDK, craft effective prompts with XML tags, and build production Claude integrations.',
    level: 'intermediate',
    concepts: [
      {
        title: 'Anthropic API Basics',
        explanation: {
          english:
            'The Anthropic API lets you call Claude programmatically in your applications. Key concepts:\n\n**Authentication**: Pass your API key in the `x-api-key` header or via the SDK constructor.\n\n**Messages endpoint** (`POST /v1/messages`): The primary endpoint. You send a list of messages (with roles "user" and "assistant"), a model name, and `max_tokens`. Claude returns a response with content blocks.\n\n**Pricing** (approximate): Haiku ~$0.25/million input tokens; Sonnet ~$3/million; Opus ~$15/million. Output tokens cost ~3–5× input tokens.\n\n**Rate limits**: Vary by tier — API keys start with conservative limits and can be increased via the Console.\n\n**SDK support**: Official SDKs for Python (`anthropic`) and TypeScript/JavaScript (`@anthropic-ai/sdk`). Community SDKs exist for Go, Java, and others.',
          hinglish:
            'Anthropic API se Claude ko programmatically use kar sakte ho. SDK mein `ANTHROPIC_API_KEY` environment variable set karo. `client.messages.create()` call karo model, max_tokens, aur messages ke saath. Pricing: Haiku sabse sasta (~$0.25/M tokens), Opus sabse expensive (~$15/M tokens). Python aur TypeScript ke official SDKs hain.',
        },
        dailyLifeExample:
          'You build a study-card generator: students paste a paragraph, your app calls the Anthropic API with Claude Haiku (cheap, fast), and gets back 5 flashcard Q&A pairs in JSON.',
        codeExample: `// Install: npm install @anthropic-ai/sdk
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // never hardcode
});

// Basic call
const msg = await client.messages.create({
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 512,
  messages: [
    { role: 'user', content: 'List 3 benefits of TypeScript.' }
  ],
});
console.log(msg.content[0].text);
console.log('Input tokens:', msg.usage.input_tokens);
console.log('Output tokens:', msg.usage.output_tokens);

// Multi-turn conversation
const conversation = [
  { role: 'user', content: 'My name is Ravi.' },
  { role: 'assistant', content: 'Nice to meet you, Ravi!' },
  { role: 'user', content: 'What is my name?' },
];
const followUp = await client.messages.create({
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 64,
  messages: conversation,
});
console.log(followUp.content[0].text); // "Your name is Ravi."`,
        keyPoints: [
          'Set ANTHROPIC_API_KEY as an environment variable — never hardcode.',
          'client.messages.create() is the primary API call.',
          'Multi-turn: pass full conversation history as the messages array.',
          'usage.input_tokens + usage.output_tokens for cost tracking.',
          'Official SDKs: Python (anthropic) and TypeScript (@anthropic-ai/sdk).',
        ],
        quiz: [
          {
            question: 'Where should you store your Anthropic API key in a Node.js app?',
            options: [
              'Hardcoded in the source file',
              'In an environment variable',
              'In a public config file',
              'In a Git-tracked .env file',
            ],
            correct: 1,
          },
        ],
        tags: ['api', 'sdk', 'authentication', 'messages'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'How do you implement a multi-turn conversation with the Anthropic API?',
            answer: {
              english:
                'The Anthropic API is stateless — it does not remember previous calls. To build a multi-turn conversation, you maintain the conversation history yourself as an array of message objects (each with `role` and `content`). On each new turn you append the user\'s message, send the full array to the API, then append Claude\'s response to the history for the next turn.',
              hinglish:
                'Anthropic API stateless hai — wo pehle calls yaad nahi rakhta. Multi-turn ke liye aapko conversation history ek array mein manually maintain karni hoti hai. Har turn pe user message append karo, poora array send karo, Claude ka response append karo agle turn ke liye.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Prompt Engineering with XML Tags',
        explanation: {
          english:
            'Claude is trained to parse XML-style tags, making them the most reliable way to structure complex prompts. Common patterns:\n\n**<instructions>** — Wrap your main task description.\n**<context>** — Background information Claude should know.\n**<document>** or **<code>** — The content to analyse.\n**<example>** — Few-shot examples.\n**<output_format>** — Specify the exact response structure.\n\nAdvantages over plain text:\n1. Clear separation of sections — Claude doesn\'t confuse instructions with data.\n2. Reduces prompt injection risk — user input inside `<user_input>` tags is clearly demarcated.\n3. Enables precise references: "refer to the code in <code> tags".\n\nOther tips: Be explicit ("Return only JSON, no prose"), use positive framing ("Do X" not "Don\'t do Y"), and put variable content last.',
          hinglish:
            'Claude XML-style tags samajhta hai — ye best way hai complex prompts structure karne ka. <instructions> mein task likhao, <context> mein background, <document> mein content, <example> mein few-shot examples, <output_format> mein format specify karo. Isse Claude instructions aur data ko clearly alag samajhta hai.',
        },
        dailyLifeExample:
          'Instead of a wall of text, you wrap your system context in `<context>`, the user\'s pasted code in `<code>`, and the task in `<instructions>` — Claude understands each section without confusion.',
        codeExample: `const prompt = \`
<context>
You are a senior TypeScript developer reviewing pull requests for a Next.js 16 application.
The project uses Mongoose for MongoDB, NextAuth v5, and Tailwind CSS.
</context>

<code>
export async function GET(req: Request) {
  const users = await User.find({});
  return Response.json(users);
}
</code>

<instructions>
Review the code in the <code> tags for:
1. Security vulnerabilities
2. Performance issues
3. Missing error handling

Return your findings as a JSON array with fields:
{ issue: string, severity: "low" | "medium" | "high", suggestion: string }
</instructions>

<output_format>
Return ONLY the JSON array. No prose, no markdown fences.
</output_format>
\`;

const response = await client.messages.create({
  model: 'claude-opus-4-8',
  max_tokens: 1024,
  messages: [{ role: 'user', content: prompt }],
});

const issues = JSON.parse(response.content[0].text);`,
        keyPoints: [
          'Claude is trained to understand XML tags — use them for structure.',
          '<instructions>, <context>, <document>, <example>, <output_format> are common tags.',
          'Separating data from instructions reduces prompt injection risk.',
          'Be explicit: "Return only JSON" is better than hoping Claude infers it.',
          'Put fixed instructions first; variable content (user input) last.',
        ],
        quiz: [
          {
            question: 'What is the main advantage of using XML tags in Claude prompts?',
            options: [
              'They make prompts shorter',
              'They clearly separate instructions from data',
              'They enable image generation',
              'They reduce API costs',
            ],
            correct: 1,
          },
        ],
        tags: ['prompt-engineering', 'xml-tags', 'few-shot', 'structured-output'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'Why use XML tags in Claude prompts instead of plain text?',
            answer: {
              english:
                'Claude is specifically trained to parse XML-style tags, so they provide unambiguous boundaries between sections of a prompt. This prevents Claude from confusing instructions with the content it should analyse, reduces prompt injection risk (user input is clearly demarcated), and makes prompts more maintainable and reusable.',
              hinglish:
                'Claude XML tags ko clearly parse karta hai isliye instructions aur data ka confusion nahi hota. Prompt injection ka risk kam hota hai kyunki user input clearly demarcated hoti hai. Prompts zyada maintainable aur reusable bhi ho jaate hain.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Streaming, Tool Use, and JSON Mode',
        explanation: {
          english:
            '**Streaming**: Instead of waiting for the full response, Claude can stream tokens as they\'re generated. Use `client.messages.stream()`. This dramatically improves perceived responsiveness in chat UIs.\n\n**Tool Use (Function Calling)**: Define tools (functions) that Claude can call. Claude decides when to call a tool, you execute it, then return the result. Enables: web search, database queries, calculations, API calls.\n\n**Structured Output / JSON**: Ask Claude to return JSON by specifying the format in the prompt. For guaranteed valid JSON, combine with a validator or use tool use with a typed schema. Claude is very reliable at JSON output when explicitly asked.',
          hinglish:
            'Streaming mein tokens generate hote hi aate hain — chat UIs ke liye best. Tool Use mein aap functions define karte ho jo Claude call kar sakta hai (web search, DB query, etc). JSON mode ke liye prompt mein clearly likhao "return only valid JSON" aur Claude reliable JSON output deta hai.',
        },
        dailyLifeExample:
          'A chatbot streams Claude\'s response word-by-word so users see text appearing immediately. When the user asks "what\'s the weather?", Claude calls a `get_weather` tool, your server fetches the API, returns the data, and Claude incorporates it into its reply.',
        codeExample: `import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── 1. Streaming ──
process.stdout.write('Claude says: ');
const stream = await client.messages.stream({
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 256,
  messages: [{ role: 'user', content: 'Count to 5 slowly.' }],
});
for await (const event of stream) {
  if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
    process.stdout.write(event.delta.text);
  }
}
console.log();

// ── 2. Tool Use ──
const tools = [{
  name: 'get_course_count',
  description: 'Returns the number of published courses in the database.',
  input_schema: { type: 'object', properties: {}, required: [] },
}];

const toolResponse = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 512,
  tools,
  messages: [{ role: 'user', content: 'How many courses do we have?' }],
});

if (toolResponse.stop_reason === 'tool_use') {
  const toolUse = toolResponse.content.find(b => b.type === 'tool_use');
  // Execute the tool on your server:
  const count = await db.collection('courses').countDocuments({ status: 'published' });

  // Send result back to Claude:
  const finalResponse = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    tools,
    messages: [
      { role: 'user', content: 'How many courses do we have?' },
      { role: 'assistant', content: toolResponse.content },
      { role: 'user', content: [{ type: 'tool_result', tool_use_id: toolUse.id, content: String(count) }] },
    ],
  });
  console.log(finalResponse.content[0].text);
}`,
        keyPoints: [
          'Streaming: use client.messages.stream() for real-time token delivery.',
          'Tool use: define schemas, Claude calls them, you execute and return results.',
          'JSON output: explicit prompt instructions make Claude very reliable.',
          'stop_reason === "tool_use" means Claude wants to call a function.',
          'Always validate JSON from Claude before parsing in production.',
        ],
        quiz: [
          {
            question: 'What does stop_reason === "tool_use" indicate in a Claude API response?',
            options: [
              'Claude is done generating',
              'Claude wants to call a defined tool function',
              'An error occurred',
              'The context limit was reached',
            ],
            correct: 1,
          },
        ],
        tags: ['streaming', 'tool-use', 'function-calling', 'json', 'api'],
        difficulty: 'hard',
        interviewQuestions: [
          {
            question: 'How does tool use (function calling) work with the Anthropic API?',
            answer: {
              english:
                'You define tools as JSON schemas in the API call. Claude decides when a tool is needed and returns a response with `stop_reason: "tool_use"` plus a `tool_use` content block containing the tool name and arguments. Your server executes the tool, then sends the result back as a `tool_result` message. Claude incorporates the result into its final response. This enables Claude to take real-world actions like querying databases, calling APIs, or performing calculations.',
              hinglish:
                'API call mein tools ko JSON schemas ke roop mein define karo. Claude decide karta hai kab tool chahiye aur stop_reason: "tool_use" return karta hai. Aap tool execute karo, result tool_result message mein vapas bhejo. Claude result incorporate karke final response deta hai.',
            },
            difficulty: 'hard',
            frequency: 'common',
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What makes Claude different from GPT-4 or Gemini?',
    answer: {
      english:
        'Claude is differentiated by its Constitutional AI training methodology, which makes it more reliable at refusing harmful requests while remaining genuinely helpful. It has the largest commercially available context window (200K tokens), strong performance on long-document analysis, and a reputation for nuanced, careful writing. Anthropic\'s explicit focus on AI safety and interpretability research also sets it apart institutionally.',
      hinglish:
        'Claude Constitutional AI se train hua hai jisse wo harmful requests refuse karta hai aur genuinely helpful rehta hai. Sabse bada context window (200K tokens) hai. Long-document analysis mein strong hai. Anthropic ka AI safety focus bhi isko alag banata hai.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
  {
    question: 'What is the 200K token context window useful for?',
    answer: {
      english:
        'The 200K context window (≈150,000 words, ≈500 pages) enables: whole-codebase analysis in one call, reading full-length books and PDFs, maintaining very long multi-turn conversations without losing early context, and analysing large log files or datasets in a single request.',
      hinglish:
        '200K context window se puri codebase ek call mein analyse ho sakti hai, poori book ya PDF padh sakta hai, lambi conversations bina context lose kiye, aur bade log files ek request mein analyse ho sakte hain.',
    },
    difficulty: 'easy',
    frequency: 'common',
  },
  {
    question: 'When should you use Claude Opus vs Sonnet vs Haiku?',
    answer: {
      english:
        'Use Haiku for high-volume, low-complexity tasks where latency and cost are the priority (classification, routing, quick summarisation). Use Sonnet as the everyday workhorse — it handles coding, writing, and reasoning well at a moderate cost. Use Opus only when the task genuinely requires maximum intelligence: complex architecture review, hard math, multi-document research synthesis.',
      hinglish:
        'Haiku: high-volume, simple tasks jaise classification. Cost aur speed priority ho. Sonnet: everyday coding, writing, reasoning ke liye best all-rounder. Opus: tab jab genuinely maximum intelligence chahiye — complex code review, hard math, research synthesis.',
    },
    difficulty: 'medium',
    frequency: 'very-common',
  },
  {
    question: 'How do you structure a Claude prompt effectively?',
    answer: {
      english:
        'Use XML tags to separate sections: <context> for background, <instructions> for the task, <document>/<code> for content to analyse, <example> for few-shot demonstrations, <output_format> for the expected response structure. Put fixed instructions at the top, variable content (user input) at the bottom. Be explicit about output format ("return only valid JSON, no prose"). Use positive framing ("do X" rather than "don\'t do Y").',
      hinglish:
        'XML tags use karo: <context> background ke liye, <instructions> task ke liye, <document> content ke liye, <output_format> format ke liye. Fixed instructions pehle, user input baad mein. Output format explicitly specify karo ("only JSON, no prose"). Positive framing use karo.',
    },
    difficulty: 'medium',
    frequency: 'very-common',
  },
  {
    question: 'What is Extended Thinking and when should you enable it?',
    answer: {
      english:
        'Extended Thinking is a mode where Claude performs step-by-step internal reasoning before generating the final answer. Enable it (via `thinking: { type: "enabled", budget_tokens: N }` in the API) for tasks that require multi-step reasoning: complex debugging, mathematical problems, ambiguous requirements analysis, or research synthesis. It uses more tokens and increases latency, so disable it for simple tasks.',
      hinglish:
        'Extended Thinking mein Claude answer se pehle step-by-step reasoning karta hai. API mein `thinking: { type: "enabled", budget_tokens: N }` set karo. Complex debugging, math, ambiguous requirements ke liye enable karo. Simple tasks ke liye disable karo — zyada tokens aur time lagte hain.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
  {
    question: 'How does Claude handle long documents without losing context?',
    answer: {
      english:
        'Claude\'s 200K context window allows the full document to fit in a single request. However, the "lost in the middle" effect means content buried in the middle of a very long prompt may receive less attention. Best practices: place key instructions at the start and end of the prompt; chunk very long documents if analysis of specific sections is needed; use retrieval-augmented generation (RAG) for corpora larger than 200K tokens.',
      hinglish:
        'Claude ka 200K context window poore document ko ek request mein handle karta hai. Lekin "lost in the middle" effect se middle content ko kam attention milta hai. Best practice: key instructions start/end mein rakho; bahut bade corpora ke liye RAG use karo.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
  {
    question: 'What are Claude Projects and who needs them?',
    answer: {
      english:
        'Projects (Pro+ plan) are persistent workspaces with a custom system prompt, uploaded files, and cross-session memory. They\'re valuable for anyone doing ongoing, context-heavy work: developers maintaining a codebase project with schema files uploaded, content teams with brand guidelines, customer support with product documentation. Without Projects, Claude forgets everything when a chat ends.',
      hinglish:
        'Projects ek persistent workspace hai jisme system prompt, uploaded files, aur cross-session memory rehti hai. Developers ke liye jo codebase pe kaam karte hain, content teams ke liye jo brand guidelines rakhte hain — sabke liye useful hai. Bina Projects ke Claude chat end hone pe sab bhool jaata hai.',
    },
    difficulty: 'easy',
    frequency: 'common',
  },
  {
    question: 'How do you prevent prompt injection when using Claude in a user-facing app?',
    answer: {
      english:
        'Prompt injection happens when a user crafts input that overrides your system instructions. Mitigations: (1) Wrap user input in explicit XML tags like <user_input>…</user_input> and instruct Claude to treat that section as untrusted data; (2) validate and sanitise user input server-side before including it in the prompt; (3) use a strong system prompt that defines Claude\'s role and explicitly says to ignore instructions found in user content; (4) keep instructions and data clearly separated throughout the prompt.',
      hinglish:
        'Prompt injection mein user apna input craft karke aapke system instructions override kar sakta hai. Solutions: (1) user input ko <user_input> tags mein wrap karo; (2) server-side input sanitise karo; (3) strong system prompt likho jo Claude ko bataye ki user content ke instructions ignore kare; (4) instructions aur data clearly separate rakho.',
    },
    difficulty: 'hard',
    frequency: 'common',
  },
];
