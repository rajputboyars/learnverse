// ChatGPT & GPT-4 course — beginner → intermediate.
// Covers: what ChatGPT is, free vs paid plans, core features, prompting, OpenAI API.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'ChatGPT & GPT-4',
  slug: 'chatgpt',
  description:
    'ChatGPT aur GPT-4 ka complete guide — free vs Plus plan features, prompting tips, Custom GPTs, Advanced Data Analysis, aur OpenAI API se apps banana — sab kuch English aur Hinglish mein.',
  icon: '💬',
  tags: ['chatgpt', 'gpt-4', 'openai', 'ai', 'prompting', 'llm'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 34,
};

const basics = [
  {
    title: 'ChatGPT Basics',
    level: 'beginner',
    description: 'ChatGPT kya hai, kaise kaam karta hai, aur plans ka breakdown.',
    concepts: [
      {
        title: 'What is ChatGPT',
        difficulty: 'easy',
        tags: ['intro', 'chatgpt', 'openai'],
        explanation: {
          english:
            'ChatGPT is a conversational AI assistant built by OpenAI on top of its GPT (Generative Pre-trained Transformer) family of large language models. It was released in November 2022 and quickly became the fastest-growing consumer application in history. At its core, ChatGPT is a next-token prediction model: it reads your message and generates a response one word (token) at a time, predicting the most likely continuation based on patterns learned from enormous amounts of text data.\n\nThe current flagship model is GPT-4o ("o" for omni), which understands and generates text, images, and audio. GPT-4o mini is a smaller, faster, cheaper version suitable for simpler tasks. There is also the "o1" reasoning model which thinks step-by-step before answering — ideal for math and logic.\n\nChatGPT can write code, explain concepts, summarise documents, translate languages, draft emails, debug errors, brainstorm ideas, and much more. It has no access to the internet in the base model (it uses training data with a knowledge cutoff), but can browse the web when the browsing tool is enabled in Plus/Team plans.\n\nImportant limitation: ChatGPT can confidently state incorrect facts ("hallucinations") — always verify important claims from authoritative sources.',
          hinglish:
            'ChatGPT OpenAI ka conversational AI assistant hai jo GPT (Generative Pre-trained Transformer) models pe bana hai. November 2022 mein launch hua aur history ka sabse fast-growing consumer app ban gaya. Basically ye next-token prediction karta hai — aapka message padh ke ek-ek word generate karta hai, billions of text patterns se seekhe hue knowledge ke basis pe.\n\nAbhi ka main model GPT-4o hai ("o" = omni) jo text, images aur audio samajhta aur generate karta hai. GPT-4o mini smaller aur faster version hai simpler kaam ke liye. "o1" reasoning model step-by-step sochta hai — maths aur logic ke liye best.\n\nChatGPT code likh sakta hai, concepts explain kar sakta hai, documents summarize kar sakta hai, emails draft kar sakta hai, bugs debug kar sakta hai. Base model mein internet access nahi hota (training data ka knowledge cutoff hota hai), par browsing tool enable karne pe web dekh sakta hai.\n\nZaruri limitation: ChatGPT galat cheezein bhi confidently bol sakta hai ("hallucinations") — important facts hamesha verify karo reliable sources se.',
        },
        dailyLifeExample:
          'ChatGPT ek bahut padha-likha dost ki tarah hai — jaise koi IIT/IIM graduate dost jo hamesha available ho aur har topic pe baat kar sake. Lekin jaise ek dost kabhi kabhi galat yaad karta hai, ChatGPT bhi kabhi galat information de sakta hai. Isliye important decisions ke liye cross-check karo.',
        codeExample:
          '// ChatGPT is accessed via chat.openai.com (browser) or the mobile app.\n// For developers, the OpenAI API gives programmatic access:\n\n// Example: Calling GPT-4o via the OpenAI API (JavaScript)\nconst OpenAI = require("openai");\nconst client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\nconst response = await client.chat.completions.create({\n  model: "gpt-4o",\n  messages: [\n    { role: "system", content: "You are a helpful coding assistant." },\n    { role: "user",   content: "Explain what a closure is in JavaScript." },\n  ],\n});\nconsole.log(response.choices[0].message.content);',
        keyPoints: [
          'Built by OpenAI on GPT large language models',
          'Flagship model: GPT-4o (text + image + audio)',
          'GPT-4o mini = faster/cheaper for simpler tasks',
          'o1 = step-by-step reasoning for maths/logic',
          'Can hallucinate — always verify critical facts',
          'No real-time internet by default (knowledge cutoff applies)',
        ],
        quiz: [
          {
            question: 'Which ChatGPT model is best for complex math/logic reasoning?',
            options: ['GPT-4o mini', 'GPT-3.5', 'o1 reasoning model', 'DALL-E'],
            correctIndex: 2,
          },
          {
            question: 'What does "hallucination" mean in the context of ChatGPT?',
            options: [
              'The model sees images in text',
              'The model confidently generates incorrect information',
              'The model refuses to answer',
              'The model uses too many tokens',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'ChatGPT Plans: Free vs Plus vs Team vs Enterprise',
        difficulty: 'easy',
        tags: ['plans', 'pricing', 'plus', 'free'],
        explanation: {
          english:
            'ChatGPT is available in four main tiers, each unlocking progressively more power:\n\n**Free Plan (₹0):**\n- Access to GPT-4o mini (always available)\n- Limited access to GPT-4o (when servers are not busy)\n- Basic web browsing (limited)\n- 2 DALL-E image generations per day\n- Basic memory (limited conversation history)\n- Cannot create Custom GPTs (can use public ones)\n- No Advanced Data Analysis\n- No file/document uploads (very limited)\n\n**ChatGPT Plus ($20/month ≈ ₹1,700/month):**\n- Full GPT-4o access with 5× higher message limits\n- GPT-4o with vision (analyze images, screenshots, PDFs)\n- Advanced Data Analysis — runs Python in a sandbox, creates charts, processes CSVs\n- DALL-E image generation (unlimited within plan limits)\n- File uploads: PDFs, Word docs, spreadsheets\n- Voice mode (speak with ChatGPT, it speaks back)\n- Create and use Custom GPTs\n- Canvas — collaborative document/code editing\n- Web browsing enabled\n- o1 and o1-mini reasoning models\n\n**ChatGPT Team ($25/user/month, minimum 2 users):**\n- All Plus features\n- Conversations NOT used to train OpenAI models (privacy)\n- Shared Team workspace\n- Admin console to manage members\n- Higher usage limits than Plus\n\n**ChatGPT Enterprise (custom pricing):**\n- Unlimited GPT-4o access\n- 128K token context window\n- SSO (Single Sign-On) for companies\n- Audit logs and compliance features\n- Custom data retention policies\n- Dedicated account manager',
          hinglish:
            'ChatGPT ke chaar main tiers hain, har ek mein zyada features milte hain:\n\n**Free Plan (₹0):**\n- GPT-4o mini hamesha available\n- Limited GPT-4o access (jab servers busy na hon)\n- Basic web browsing (limited)\n- Sirf 2 DALL-E images per day\n- Custom GPTs bana nahi sakte (use kar sakte ho public ones)\n- Advanced Data Analysis nahi\n- File uploads bahut limited\n\n**ChatGPT Plus ($20/month ≈ ₹1,700/month):**\n- Poora GPT-4o access, 5× zyada messages\n- Vision — images, screenshots, PDFs analyze karo\n- Advanced Data Analysis — Python sandbox mein charts banao, CSV process karo\n- DALL-E image generation (plan limits ke andar unlimited)\n- File uploads: PDFs, Word docs, spreadsheets\n- Voice mode — ChatGPT se baat karo, wo bolta bhi hai\n- Custom GPTs banao aur use karo\n- Canvas — documents aur code collaboratively edit karo\n- Web browsing enabled\n- o1 reasoning models\n\n**ChatGPT Team ($25/user/month):**\n- Saare Plus features\n- Aapki conversations OpenAI ke training mein use NAHI hoti (privacy)\n- Shared workspace\n- Admin console\n\n**Enterprise (custom pricing):**\n- Unlimited access\n- 128K token context\n- SSO, audit logs, compliance features',
        },
        dailyLifeExample:
          'Socho ek gym membership jaisi baat hai. Free plan mein basic equipment milti hai (treadmill, basic weights). Plus plan mein premium equipment, personal trainer, swimming pool sab milta hai. Team plan mein corporate membership hai — privacy zyada, shared locker room. Enterprise plan mein poori gym private book ho jaati hai company ke liye.',
        codeExample:
          '// Plan comparison at a glance:\n//\n// Feature                | Free  | Plus  | Team  | Enterprise\n// -----------------------|-------|-------|-------|----------\n// GPT-4o access          | Limit | Full  | Full  | Unlimited\n// GPT-4o mini            | ✓     | ✓     | ✓     | ✓\n// o1 reasoning           | ✗     | ✓     | ✓     | ✓\n// DALL-E images          | 2/day | ✓     | ✓     | ✓\n// Advanced Data Analysis | ✗     | ✓     | ✓     | ✓\n// File uploads           | ✗     | ✓     | ✓     | ✓\n// Voice mode             | ✗     | ✓     | ✓     | ✓\n// Custom GPTs (create)   | ✗     | ✓     | ✓     | ✓\n// Not used for training  | ✗     | ✗     | ✓     | ✓\n// SSO / Audit logs       | ✗     | ✗     | ✗     | ✓\n// Context window         | 32K   | 128K  | 128K  | 128K',
        keyPoints: [
          'Free: GPT-4o mini always, limited GPT-4o, 2 images/day',
          'Plus ($20/mo): Full GPT-4o, vision, data analysis, file uploads, voice, custom GPTs',
          'Team ($25/user/mo): Plus features + privacy (not used for training) + admin console',
          'Enterprise: SSO, audit logs, unlimited access, custom data retention',
          'o1 reasoning model only available on Plus and above',
          'Advanced Data Analysis (Python sandbox) is a Plus-exclusive feature',
        ],
        quiz: [
          {
            question: 'Which ChatGPT plan ensures your conversations are NOT used to train OpenAI models?',
            options: ['Free', 'Plus', 'Team', 'None of the above'],
            correctIndex: 2,
          },
          {
            question: 'What is Advanced Data Analysis in ChatGPT Plus?',
            options: [
              'A feature to browse the internet',
              'A Python sandbox that can run code, process files, and generate charts',
              'A voice assistant feature',
              'A custom GPT creation tool',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Context Windows & Tokens',
        difficulty: 'easy',
        tags: ['tokens', 'context', 'memory'],
        explanation: {
          english:
            'Understanding tokens and context windows is essential to using ChatGPT effectively.\n\n**What is a Token?**\nChatGPT does not process words — it processes "tokens," which are chunks of text roughly 3–4 characters each. "Hello" is 1 token. "Unbelievable" is 3 tokens. Code, special characters, and non-English text use more tokens. As a rough guide: 1,000 tokens ≈ 750 English words.\n\n**What is a Context Window?**\nThe context window is the maximum amount of text ChatGPT can "see" at once — including your entire conversation history, any files you uploaded, the system prompt, and its own previous responses. Once you exceed the context window, the model starts forgetting the earliest parts of the conversation.\n\n**Context limits by plan:**\n- Free: ~32K tokens\n- Plus/Team: 128K tokens (≈ 96,000 words — about a full novel)\n- Enterprise: 128K tokens\n\n**Why this matters for developers:**\nWhen building with the OpenAI API, you pay per token (input + output). A 128K context costs significantly more than a 4K context. You should:\n- Keep system prompts concise\n- Summarise long conversation histories\n- Only include relevant code/files in context\n- Use GPT-4o mini for tasks that don\'t need the full 128K',
          hinglish:
            'Tokens aur context window samajhna ChatGPT efficiently use karne ke liye zaruri hai.\n\n**Token kya hota hai?**\nChatGPT words process nahi karta — "tokens" process karta hai, jo roughly 3-4 characters ke chunks hote hain. "Hello" = 1 token. "Unbelievable" = 3 tokens. Code aur special characters zyada tokens use karte hain. Rough guide: 1,000 tokens ≈ 750 English words.\n\n**Context Window kya hai?**\nContext window maximum text hai jo ChatGPT ek saath "dekh" sakta hai — aapki poori conversation history, uploaded files, system prompt, aur apne previous responses. Jab context window full ho jaata hai, model purani baatein "bhool" jaata hai.\n\n**Plans ke hisaab se limits:**\n- Free: ~32K tokens\n- Plus/Team: 128K tokens (≈ 96,000 words — ek poori novel ke barabar)\n- Enterprise: 128K tokens\n\n**Developers ke liye kyon important hai:**\nOpenAI API use karte waqt aap per token pay karte ho (input + output dono). 128K context bahut zyada mehnga padta hai 4K ke mukable. Isiliye:\n- System prompts chote rakho\n- Long conversations summarize karo\n- Sirf relevant code/files context mein daalo\n- GPT-4o mini use karo jab full 128K ki zarurat na ho',
        },
        dailyLifeExample:
          'Context window waise hi hai jaise ek professor ka short-term memory. Agar tum usse 500 pages ki book ek session mein padha do, wo shuru ke pages bhool jayega jab tak wo akhri pages padh raha ho. Context window mein sab kuch fit karna padta hai — jaise WhatsApp chat scroll karke upar ki baatein bhool jaati hain.',
        codeExample:
          '// Token counting example using tiktoken library\nconst { encoding_for_model } = require("tiktoken");\n\nconst enc = encoding_for_model("gpt-4o");\nconst text = "Hello, how are you today?";\nconst tokens = enc.encode(text);\nconsole.log(`Token count: ${tokens.length}`); // ~6 tokens\n\n// Estimate cost:\n// GPT-4o input:  $2.50 per 1M tokens\n// GPT-4o output: $10.00 per 1M tokens\n// GPT-4o mini:   $0.15 input / $0.60 output per 1M tokens\n\n// Track token usage in API response:\nconst response = await client.chat.completions.create({ model: "gpt-4o", messages });\nconsole.log(response.usage);\n// { prompt_tokens: 42, completion_tokens: 156, total_tokens: 198 }',
        keyPoints: [
          '1 token ≈ 3-4 characters; 1,000 tokens ≈ 750 English words',
          'Context window = how much text ChatGPT sees at once (history + files + prompts)',
          'Free plan: ~32K tokens; Plus/Team: 128K tokens',
          'Exceeding context = early conversation gets "forgotten"',
          'API charges per input + output token — keep prompts concise',
          'GPT-4o mini is 10× cheaper — use it for high-volume simple tasks',
        ],
        quiz: [
          {
            question: 'What happens when a conversation exceeds the context window?',
            options: [
              'ChatGPT crashes',
              'The conversation is saved automatically',
              'The oldest messages are forgotten',
              'ChatGPT asks you to start over',
            ],
            correctIndex: 2,
          },
          {
            question: 'Approximately how many English words fit in 1,000 tokens?',
            options: ['100', '300', '750', '2,000'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
];

const features = [
  {
    title: 'Core Features Deep Dive',
    level: 'intermediate',
    description: 'ChatGPT ke powerful features — vision, Custom GPTs, Advanced Data Analysis.',
    concepts: [
      {
        title: 'Vision & File Analysis (Plus Feature)',
        difficulty: 'medium',
        tags: ['vision', 'multimodal', 'file-upload', 'plus'],
        explanation: {
          english:
            'GPT-4o is natively multimodal — it can process text, images, PDFs, spreadsheets, and code files in a single conversation. This is a ChatGPT Plus exclusive feature.\n\n**Image Understanding:**\nUpload any image and ask questions about it — explain a diagram, read text from a screenshot, debug UI issues from a screenshot, analyze a chart, describe a photo. GPT-4o can see and reason about visual content as naturally as text.\n\n**File Uploads:**\nPlus users can upload PDF documents (research papers, manuals, contracts), Word documents, Excel/CSV spreadsheets, PowerPoint presentations, and code files. ChatGPT indexes the content and you can ask questions like: "Summarise section 3", "What are the key points?", "Find all mentions of X", "Compare these two documents".\n\n**For Developers:**\n- Upload a screenshot of a UI bug: "What CSS issue could cause this layout problem?"\n- Paste an error screenshot: "What does this stack trace mean and how do I fix it?"\n- Upload a system architecture diagram: "What are the potential bottlenecks here?"\n- Upload a CSV: "Generate a Python script to clean and analyse this data"\n\n**Limitations:**\n- Cannot process audio/video files in standard chat (Voice mode handles speech separately)\n- Very large files (>100MB) may not be processed\n- Does not retain files between conversations (must re-upload each session)',
          hinglish:
            'GPT-4o natively multimodal hai — text, images, PDFs, spreadsheets, aur code files ek hi conversation mein process kar sakta hai. Ye ChatGPT Plus ka exclusive feature hai.\n\n**Image Understanding:**\nKoi bhi image upload karo aur questions pucho — diagram explain karo, screenshot se text padho, UI issues debug karo, chart analyze karo. GPT-4o visual content ko text ki tarah naturally samajh sakta hai.\n\n**File Uploads:**\nPlus users PDFs (research papers, manuals, contracts), Word docs, Excel/CSV, PowerPoint, aur code files upload kar sakte hain. ChatGPT content index karta hai aur tum pooch sakte ho: "Section 3 summarize karo", "Key points kya hain?", "X ke saare mentions dhundho", "In dono documents compare karo".\n\n**Developers ke liye:**\n- UI bug ka screenshot upload: "Is CSS problem kya ho sakta hai?"\n- Error screenshot paste: "Ye stack trace kya bol raha hai aur fix kaise karo?"\n- Architecture diagram upload: "Potential bottlenecks kahan hain?"\n- CSV upload: "Is data ko clean aur analyze karne ke liye Python script banao"\n\n**Limitations:**\n- Standard chat mein audio/video files process nahi hoti\n- Bahut bade files (>100MB) process nahi ho sakte\n- Files conversations ke beech save nahi hoti — har session mein re-upload karna padega',
        },
        dailyLifeExample:
          'Socho tumhare paas ek dost hai jo engineer bhi hai aur bahut acche aankhon se dekh bhi sakta hai. Tum usse koi bhi document, diagram ya image dikha ke pooch sakte ho. Aur wo bata dega — "Is diagram mein yahan performance issue ho sakta hai." Yahi GPT-4o Vision karta hai.',
        codeExample:
          '// Sending an image to GPT-4o via API\nconst fs = require("fs");\nconst base64Image = fs.readFileSync("screenshot.png").toString("base64");\n\nconst response = await client.chat.completions.create({\n  model: "gpt-4o",\n  messages: [{\n    role: "user",\n    content: [\n      { type: "text",      text: "What CSS issue could cause this layout problem?" },\n      { type: "image_url", image_url: { url: `data:image/png;base64,${base64Image}` } },\n    ],\n  }],\n});\nconsole.log(response.choices[0].message.content);',
        keyPoints: [
          'GPT-4o understands images, PDFs, spreadsheets, and code files',
          'Upload screenshots to debug UI issues or understand error messages',
          'Plus feature — not available on Free plan',
          'Files are not saved between conversations — re-upload each session',
          'Ask questions about documents: summarize, compare, extract data',
          'Cannot process large video files in standard chat',
        ],
        quiz: [
          {
            question: 'Which plan allows you to upload PDF documents to ChatGPT?',
            options: ['Free', 'Plus', 'Both Free and Plus', 'Enterprise only'],
            correctIndex: 1,
          },
          {
            question: 'What can you do by uploading an image to GPT-4o?',
            options: [
              'Only generate similar images',
              'Ask questions, get explanations, debug UI issues from screenshots',
              'Train a custom model on the image',
              'Convert it to a video',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Custom GPTs — Build Your Own AI',
        difficulty: 'medium',
        tags: ['custom-gpts', 'gpt-store', 'plus'],
        explanation: {
          english:
            'Custom GPTs let ChatGPT Plus users create personalised AI assistants with specific instructions, knowledge, and capabilities — without writing any code.\n\n**What you can configure:**\n1. **Name & description** — give your GPT an identity\n2. **System instructions** — permanent instructions defining the GPT\'s personality, expertise, and behaviour (e.g., "You are a senior Python engineer who reviews code for security vulnerabilities")\n3. **Knowledge files** — upload your own documents (company policies, codebase documentation, product manuals) so the GPT answers based on your specific context\n4. **Capabilities** — enable/disable: web browsing, DALL-E image generation, code execution\n5. **Actions** — connect to external APIs so your GPT can fetch live data, submit forms, or interact with third-party services (e.g., get weather, search your database)\n\n**Use cases for developers:**\n- "Code Reviewer Bot" — always reviews PRs against your specific coding standards\n- "Documentation Helper" — knows your product\'s entire API docs and answers developer questions\n- "Bug Triage Assistant" — classifies bug reports and suggests affected components\n- "Interview Coach" — practises mock interviews in your specific tech stack\n\n**GPT Store:**\nOpenAI has a store of thousands of community-created GPTs. Free users can access the store and use existing GPTs but cannot create new ones. Plus users can create private (personal use) or public (shared with everyone) GPTs.',
          hinglish:
            'Custom GPTs ChatGPT Plus users ko apna personalised AI assistant banane deta hai — specific instructions, knowledge, aur capabilities ke saath — bina koi code likhe.\n\n**Kya configure kar sakte ho:**\n1. **Naam aur description** — GPT ko identity do\n2. **System instructions** — permanent instructions jo GPT ki personality define karte hain (e.g., "Tum ek senior Python engineer ho jo code security ke liye review karta hai")\n3. **Knowledge files** — apne documents upload karo (company policies, codebase docs, product manuals) taaki GPT aapke specific context ke hisaab se answer de\n4. **Capabilities** — web browsing, DALL-E, code execution enable/disable karo\n5. **Actions** — external APIs se connect karo taaki GPT live data fetch kare, forms submit kare (e.g., weather get karo, database search karo)\n\n**Developers ke use cases:**\n- "Code Reviewer Bot" — aapke specific coding standards ke against PR review kare\n- "Documentation Helper" — aapke product ke poore API docs jaanta ho\n- "Bug Triage Assistant" — bug reports classify kare aur affected components suggest kare\n- "Interview Coach" — aapke tech stack mein mock interviews practise kare\n\n**GPT Store:**\nOpenAI ke store mein hazaaron community-created GPTs hain. Free users existing GPTs use kar sakte hain. Plus users naye GPTs bana sakte hain — private ya public.',
        },
        dailyLifeExample:
          'Custom GPT waise hi hai jaise ek specialized employee hire karna. Ek generalist ChatGPT "koi bhi kaam karo" wala employee hai. Custom GPT ek specialist hai jo sirf aapke company ke rules, documents aur procedures jaanta hai — ek trained HR assistant ya dedicated code reviewer ki tarah.',
        codeExample:
          '// Custom GPT system prompt example for a Code Reviewer:\n//\n// "You are a senior software engineer specializing in Node.js and security.\n//  When reviewing code:\n//  1. Check for SQL injection vulnerabilities\n//  2. Check for exposed secrets or API keys\n//  3. Verify proper error handling\n//  4. Suggest performance improvements\n//  5. Format feedback as: [CRITICAL], [WARNING], or [SUGGESTION]\n//  Always be specific and point to line numbers.\n//  Only suggest changes that are truly necessary — do not rewrite working code."\n\n// Actions example — connecting to a weather API:\n// In Custom GPT builder > Actions > Add action\n// Schema:\n// {\n//   "openapi": "3.0.0",\n//   "paths": {\n//     "/weather": {\n//       "get": { "operationId": "getWeather", "parameters": [{"name":"city"}] }\n//     }\n//   }\n// }',
        keyPoints: [
          'Custom GPTs require ChatGPT Plus — Free users can use but not create them',
          'Configure: name, system instructions, knowledge files, capabilities, and API actions',
          'Upload your own docs so the GPT has your specific context',
          'Connect external APIs via Actions to give GPT live data access',
          'GPT Store has thousands of ready-made community GPTs',
          'Great for: code reviewers, documentation bots, interview coaches',
        ],
        quiz: [
          {
            question: 'What do "Actions" in Custom GPTs allow you to do?',
            options: [
              'Upload images to the GPT',
              'Connect the GPT to external APIs for live data',
              'Train the GPT on your data',
              'Set a usage limit for the GPT',
            ],
            correctIndex: 1,
          },
          {
            question: 'Can ChatGPT Free users access Custom GPTs from the GPT Store?',
            options: [
              'No, Custom GPTs are Plus-only',
              'Yes, they can use existing GPTs but cannot create new ones',
              'Yes, they can both use and create Custom GPTs',
              'Only Enterprise users can access the GPT Store',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Advanced Data Analysis (Code Interpreter)',
        difficulty: 'medium',
        tags: ['data-analysis', 'python', 'code-interpreter', 'plus'],
        explanation: {
          english:
            'Advanced Data Analysis (formerly called Code Interpreter) is one of ChatGPT Plus\'s most powerful features. It gives ChatGPT the ability to write and execute Python code in a secure sandbox environment — meaning it can actually run computations, not just write code snippets.\n\n**What it can do:**\n- **Process data files**: Upload a CSV, Excel, or JSON file and ask ChatGPT to clean it, filter it, compute statistics, or join with another dataset\n- **Generate charts**: Matplotlib/seaborn charts — bar charts, line graphs, pie charts, scatter plots, heatmaps — rendered and displayed right in the chat\n- **Statistical analysis**: Descriptive statistics, correlation matrices, outlier detection, regression analysis\n- **File format conversion**: Convert CSV to Excel, JSON to CSV, PDF tables to data, images to text\n- **Mathematical computation**: Solve equations, matrix operations, calculus, statistics\n- **Process images**: Resize images, extract text from images (OCR), apply filters\n- **Create downloadable files**: Generate PDFs, Excel sheets, ZIP archives, and provide a download link\n\n**Developer use cases:**\n- "Here is my server log CSV — show me error rate over time as a line chart"\n- "I have this dataset with missing values — clean it and give me a correlation matrix"\n- "Convert this JSON API response to a formatted Excel report"\n- "Generate test data: 1,000 rows of fake user records"\n\n**Important limitation:**\nThe sandbox resets between conversations — files and results are not saved permanently. Download any important output immediately.',
          hinglish:
            'Advanced Data Analysis (pehle Code Interpreter tha) ChatGPT Plus ka sabse powerful feature hai. Ye ChatGPT ko Python code likhne aur execute karne ki ability deta hai ek secure sandbox mein — matlab wo sirf code nahi likhta, actually run bhi karta hai.\n\n**Kya kar sakta hai:**\n- **Data files process karo**: CSV, Excel, ya JSON upload karo aur ChatGPT se bolo clean karo, filter karo, statistics nikalo, ya doosre dataset se join karo\n- **Charts generate karo**: Matplotlib/seaborn charts — bar, line, pie, scatter, heatmaps — seedha chat mein dikhta hai\n- **Statistical analysis**: Descriptive statistics, correlation matrices, outlier detection, regression\n- **File conversion**: CSV ko Excel mein, JSON ko CSV mein, PDF tables ko data mein\n- **Mathematical computation**: Equations solve karo, matrix operations, calculus\n- **Images process karo**: Resize, text extract (OCR), filters apply\n- **Downloadable files banao**: PDFs, Excel sheets, ZIP archives generate karo\n\n**Developer use cases:**\n- "Mere server log CSV se error rate time ke saath line chart mein dikhao"\n- "Is dataset mein missing values clean karo aur correlation matrix do"\n- "JSON API response ko formatted Excel report mein convert karo"\n- "Test data generate karo: 1,000 rows of fake user records"\n\n**Limitation:**\nSandbox conversations ke beech reset ho jaata hai — important output immediately download karo.',
        },
        dailyLifeExample:
          'Advanced Data Analysis waise hai jaise ek data scientist tumhare paas baith gaya — tum usse koi bhi spreadsheet ya CSV do, wo Python code likhega, run karega, graphs banayega aur results tumhare samne rakh dega. Tum khud Python nahi jaante toh bhi kaam ho jaayega.',
        codeExample:
          '// What happens behind the scenes when you upload a CSV and ask for analysis:\n//\n// User: "Here is sales_data.csv — show me monthly revenue as a bar chart\n//         and tell me which product category had the highest growth."\n//\n// ChatGPT internally runs:\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("sales_data.csv")\ndf["date"] = pd.to_datetime(df["date"])\ndf["month"] = df["date"].dt.to_period("M")\n\nmonthly = df.groupby("month")["revenue"].sum()\nmonthly.plot(kind="bar", figsize=(12, 5), title="Monthly Revenue")\nplt.tight_layout()\nplt.savefig("chart.png")  # Then displays it in chat\n\n# Growth by category\ngrowth = df.groupby("category")["revenue"].pct_change().mean()\nprint(growth.sort_values(ascending=False))',
        keyPoints: [
          'Exclusive to ChatGPT Plus — runs actual Python in a secure sandbox',
          'Can process CSV, Excel, JSON, PDF files and generate charts',
          'Creates downloadable output: Excel, PDF, ZIP files',
          'Statistical analysis, data cleaning, format conversion',
          'Sandbox resets between chats — download results immediately',
          'No coding knowledge required — just describe what you want in plain English',
        ],
        quiz: [
          {
            question: 'What is unique about Advanced Data Analysis compared to regular ChatGPT?',
            options: [
              'It can browse the internet',
              'It actually executes Python code in a sandbox, not just write it',
              'It generates images with DALL-E',
              'It has a larger context window',
            ],
            correctIndex: 1,
          },
          {
            question: 'Where are files and results stored after an Advanced Data Analysis session?',
            options: [
              'In your Google Drive automatically',
              'In ChatGPT\'s permanent storage',
              'They are lost — you must download them before closing the chat',
              'In your OpenAI account dashboard',
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
];

const developerWorkflows = [
  {
    title: 'Prompting & Developer Workflows',
    level: 'intermediate',
    description: 'Efficient prompting techniques aur OpenAI API se apps banana.',
    concepts: [
      {
        title: 'Prompt Engineering for ChatGPT',
        difficulty: 'medium',
        tags: ['prompting', 'chain-of-thought', 'few-shot', 'system-prompt'],
        explanation: {
          english:
            'The quality of ChatGPT\'s output depends heavily on how well you write your prompts. Prompt engineering is the skill of crafting inputs that get the best results.\n\n**Key techniques:**\n\n1. **Role prompting**: Start with "You are a [expert role]..." to set context. "You are a senior backend engineer with 10 years of Node.js experience. Review this code for performance issues."\n\n2. **Chain-of-thought (CoT)**: Ask ChatGPT to reason step-by-step before giving the final answer. Add "Think step by step" or "Let\'s work through this systematically." This dramatically improves accuracy for logic, math, and debugging.\n\n3. **Few-shot examples**: Show 2–3 examples of the input/output format you want before giving your actual request. ChatGPT will pattern-match and follow the same format.\n\n4. **Structured output**: "Respond in JSON format with keys: title, summary, tags, difficulty." or "Format your response as a markdown table." Combine with the JSON mode API parameter for guaranteed JSON.\n\n5. **Delimiters**: Use triple backticks, XML tags, or dashes to clearly separate instructions from content. "Summarise the following text: ```{text}```"\n\n6. **Specificity**: Vague prompts get vague answers. "Explain React hooks" → mediocre. "Explain useState and useEffect with a real-world example of fetching API data in a React component, for someone who knows JavaScript but is new to React" → excellent.\n\n7. **Iterative refinement**: Treat ChatGPT like a conversation, not a one-shot query. Follow up with "That\'s good but make it more concise", "Add error handling", "What are the edge cases?"',
          hinglish:
            'ChatGPT ka output kitna acha hoga ye depend karta hai tum apna prompt kitne aache se likhte ho. Prompt engineering ek skill hai.\n\n**Key techniques:**\n\n1. **Role prompting**: "Tum ek senior backend engineer ho 10 saal ke Node.js experience ke saath. Ye code performance ke liye review karo." Ye context set karta hai.\n\n2. **Chain-of-thought (CoT)**: Bolo "Step by step sochke bata" ya "Systematically work through karo." Logic, maths, aur debugging mein ye accuracy bahut badhata hai.\n\n3. **Few-shot examples**: 2-3 examples pehle do input/output format ke, phir apna actual request. ChatGPT pattern match karke same format follow karega.\n\n4. **Structured output**: "JSON format mein jawab do keys: title, summary, tags ke saath" ya "Markdown table mein format karo."\n\n5. **Delimiters**: Triple backticks, XML tags ya dashes se instructions aur content clearly alag karo: "Is text ko summarize karo: ```{text}```"\n\n6. **Specificity**: Vague prompt = vague answer. "React hooks explain karo" → mediocre. "useState aur useEffect ko ek real-world API fetching example ke saath explain karo, kisi ke liye jo JavaScript jaanta hai par React mein naya hai" → excellent.\n\n7. **Iterative refinement**: ChatGPT ko conversation ki tarah treat karo, one-shot nahi. "Acha hai par aur concise karo", "Error handling add karo", "Edge cases kya hain?"',
        },
        dailyLifeExample:
          'Prompt engineering waise hi hai jaise ek junior employee ko task dena. Agar tum bolo "kuch karo" — kuch bhi ho sakta hai. Agar bolo "Aaj dopahar tak sales report Excel mein banao, last month se comparison karo, top 5 products highlight karo" — exactly wahi milega jo chahiye tha. Jitna specific prompt, utna acha output.',
        codeExample:
          '// Few-shot prompting example\nconst response = await client.chat.completions.create({\n  model: "gpt-4o",\n  messages: [\n    {\n      role: "system",\n      content: "You are a code reviewer. Respond in JSON with keys: issues (array), severity (low/medium/high), suggested_fix (string).",\n    },\n    {\n      role: "user",\n      content: "Review: const data = JSON.parse(userInput);",\n    },\n    {\n      role: "assistant",\n      content: JSON.stringify({\n        issues: ["No try-catch around JSON.parse — will throw if userInput is invalid JSON"],\n        severity: "high",\n        suggested_fix: "Wrap in try-catch: try { const data = JSON.parse(userInput); } catch(e) { /* handle error */ }",\n      }),\n    },\n    {\n      role: "user",\n      content: "Review: app.get(\'/\', (req, res) => res.send(req.query.name));",\n    },\n  ],\n  response_format: { type: "json_object" },  // Guarantees JSON output\n});',
        keyPoints: [
          'Role prompting: "You are a [expert]..." sets the response tone and depth',
          '"Think step by step" (chain-of-thought) improves accuracy significantly',
          'Few-shot examples teach ChatGPT the exact format you want',
          'Use delimiters (``` or XML tags) to clearly separate prompt structure from content',
          'Be specific — describe audience, format, depth, constraints',
          'Treat it as a conversation: iterate and refine rather than a single prompt',
        ],
        quiz: [
          {
            question: 'What does "chain-of-thought prompting" involve?',
            options: [
              'Asking ChatGPT to link multiple conversations together',
              'Asking ChatGPT to reason step-by-step before giving the final answer',
              'Providing a chain of few-shot examples',
              'Using special tokens to guide the response',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does "response_format: { type: \\"json_object\\" }" do in the OpenAI API?',
            options: [
              'Makes the response faster',
              'Guarantees the model\'s response is valid JSON',
              'Limits the response to 100 tokens',
              'Enables streaming output',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'OpenAI API for Developers',
        difficulty: 'hard',
        tags: ['api', 'openai', 'function-calling', 'streaming'],
        explanation: {
          english:
            'The OpenAI API gives you programmatic access to GPT-4o, GPT-4o mini, o1, DALL-E, and Whisper (speech-to-text). You can integrate AI capabilities directly into your own apps.\n\n**Setup:**\n```\nnpm install openai\n```\nGet an API key from platform.openai.com → API keys.\n\n**Key API concepts:**\n\n1. **Models**: `gpt-4o` (best quality), `gpt-4o-mini` (cheap/fast), `o1` (reasoning), `dall-e-3` (images)\n\n2. **Messages array**: Every API call sends an array of messages with roles: `system` (instructions), `user` (input), `assistant` (ChatGPT\'s previous reply — for multi-turn conversations)\n\n3. **Function calling / Tool use**: Define functions with JSON Schema. The model decides when to call them and returns structured JSON arguments. Your app calls the actual function and passes the result back. Enables: web search, database queries, sending emails, any external action.\n\n4. **Streaming**: Set `stream: true` to receive tokens as they\'re generated (for chat UIs that show text appearing in real time).\n\n5. **JSON mode**: Set `response_format: { type: "json_object" }` to guarantee valid JSON output — great for structured data extraction.\n\n6. **Embeddings**: `text-embedding-3-small` converts text to vectors for semantic search, RAG (Retrieval Augmented Generation), clustering.\n\n**Pricing (approximate):**\n- GPT-4o: $2.50 input / $10.00 output per 1M tokens\n- GPT-4o mini: $0.15 input / $0.60 output per 1M tokens\n- o1: $15 input / $60 output per 1M tokens',
          hinglish:
            'OpenAI API tumhe programmatically GPT-4o, GPT-4o mini, o1, DALL-E, aur Whisper (speech-to-text) access deta hai. Tum apni apps mein directly AI capabilities integrate kar sakte ho.\n\n**Setup:**\n```\nnpm install openai\n```\nplatform.openai.com pe jaao aur API key lo.\n\n**Key API concepts:**\n\n1. **Models**: `gpt-4o` (best quality), `gpt-4o-mini` (sasta/fast), `o1` (reasoning), `dall-e-3` (images)\n\n2. **Messages array**: Har API call mein messages array hota hai roles ke saath: `system` (instructions), `user` (input), `assistant` (ChatGPT ki pichli reply — multi-turn conversations ke liye)\n\n3. **Function calling / Tool use**: JSON Schema se functions define karo. Model decide karta hai kab call karna hai aur structured JSON arguments return karta hai. Tumhari app actual function call karti hai. Use cases: web search, database queries, emails.\n\n4. **Streaming**: `stream: true` se tokens generate hote hi receive karo — chat UIs ke liye jahan text real-time mein dikhta hai.\n\n5. **JSON mode**: `response_format: { type: "json_object" }` guaranteed valid JSON output deta hai.\n\n6. **Embeddings**: `text-embedding-3-small` text ko vectors mein convert karta hai — semantic search, RAG ke liye.\n\n**Pricing:**\n- GPT-4o: $2.50 input / $10.00 output per 1M tokens\n- GPT-4o mini: $0.15 input / $0.60 output per 1M tokens\n- o1: $15 input / $60 output per 1M tokens',
        },
        dailyLifeExample:
          'OpenAI API waise hi hai jaise electricity connection lena. ChatGPT.com ek ready-made appliance hai (fan, AC). API seedha bijli ka connection hai — tum khud apna appliance banao (apni app), seedha electricity (AI) use karo, aur sirf utni hi pay karo jitni use ki.',
        codeExample:
          '// Full example: function calling with OpenAI API\nconst OpenAI = require("openai");\nconst client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\n// Define a tool (function) the model can call\nconst tools = [{\n  type: "function",\n  function: {\n    name: "get_weather",\n    description: "Get current weather for a city",\n    parameters: {\n      type: "object",\n      properties: {\n        city: { type: "string", description: "City name, e.g. Mumbai" },\n      },\n      required: ["city"],\n    },\n  },\n}];\n\nconst response = await client.chat.completions.create({\n  model: "gpt-4o",\n  messages: [{ role: "user", content: "What\'s the weather in Bangalore?" }],\n  tools,\n  tool_choice: "auto",\n});\n\n// If model wants to call the function:\nif (response.choices[0].finish_reason === "tool_calls") {\n  const call = response.choices[0].message.tool_calls[0];\n  const args = JSON.parse(call.function.arguments); // { city: "Bangalore" }\n  const weather = await fetchWeatherAPI(args.city);  // Your actual API call\n  // Pass result back to model for final answer\n}',
        keyPoints: [
          'npm install openai; get API key from platform.openai.com',
          'Messages array: system (instructions), user (input), assistant (history)',
          'Function calling lets the model trigger your code with structured arguments',
          'stream: true for real-time token-by-token output in chat UIs',
          'response_format json_object guarantees valid JSON responses',
          'GPT-4o mini is 16× cheaper than GPT-4o — use it for high-volume tasks',
        ],
        quiz: [
          {
            question: 'What is the "system" role in the OpenAI API messages array?',
            options: [
              'The user\'s question',
              'The model\'s previous response',
              'Persistent instructions that define the assistant\'s behaviour',
              'The API authentication header',
            ],
            correctIndex: 2,
          },
          {
            question: 'What does setting stream: true in an OpenAI API call do?',
            options: [
              'Sends the request faster',
              'Returns tokens one at a time as they are generated',
              'Reduces the cost by 50%',
              'Enables function calling',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advancedTopics = [
  // ─── TOPIC 4 ───────────────────────────────────────────────────────────────
  {
    title: 'Daily Life & Productivity Workflows',
    level: 'intermediate',
    description: 'ChatGPT ko apni daily developer life mein integrate karo — Custom Instructions, standup drafts, aur efficient prompting shortcuts.',
    concepts: [
      {
        title: 'Custom Instructions & Memory',
        difficulty: 'medium',
        tags: ['custom-instructions', 'memory', 'personalisation', 'system-prompt'],
        explanation: {
          english:
            'Custom Instructions let you set a persistent "system prompt" that applies to every single conversation you start — without having to repeat yourself each time. Think of it as permanently programming ChatGPT to know who you are and how you want it to behave.\n\n**How to set Custom Instructions:**\nGo to ChatGPT → click your profile icon → Custom Instructions. You get two text boxes:\n1. **About you**: "What should ChatGPT know about you?" — your role, tech stack, preferences\n2. **Response style**: "How should ChatGPT respond?" — tone, format, verbosity\n\n**Memory** (separate from Custom Instructions) is ChatGPT\'s ability to automatically save facts about you across conversations. When it learns something useful ("User prefers TypeScript", "User works at a startup"), it saves it as a memory. You can view and delete memories in Settings → Personalization → Manage Memory.\n\n**For developers, Custom Instructions are powerful because:**\n- ChatGPT always knows your tech stack — no need to say "I use Node.js and MongoDB" every time\n- Set preferred code style: "Always use async/await, never callbacks. Use camelCase variables. Add JSDoc comments."\n- Set explanation depth: "I am an experienced developer — skip beginner explanations, go straight to the point"\n- Set output format: "Always show code in full — never truncate with \'...rest of the code\' or similar"\n\n**Memory vs Custom Instructions:**\n- Custom Instructions: manually written, always applied, version-controlled by you\n- Memory: auto-saved by ChatGPT, can be wrong or outdated, needs periodic review',
          hinglish:
            'Custom Instructions ek persistent "system prompt" set karne deti hain jo har conversation mein automatically apply hoti hai — bina baar-baar repeat kiye. Ek baar set karo, ChatGPT hamesha janega tum kaun ho aur kaise response chahiye.\n\n**Kaise set karo:**\nChatGPT → profile icon → Custom Instructions. Tumhe do text boxes milti hain:\n1. **Aapke baare mein**: "ChatGPT ko aapke baare mein kya jaanna chahiye?" — role, tech stack, preferences\n2. **Response style**: "ChatGPT kaise respond kare?" — tone, format, verbosity\n\n**Memory** (Custom Instructions se alag) ChatGPT ki ability hai jo automatically tumhare baare mein facts save karti hai conversations ke paar. Jab wo kuch useful seekhta hai ("User TypeScript prefer karta hai"), wo memory save kar leta hai. Settings → Personalization → Manage Memory mein dekh aur delete kar sakte ho.\n\n**Developers ke liye Custom Instructions powerful hain kyunki:**\n- ChatGPT hamesha tumhara tech stack jaanta hai — baar-baar "Main Node.js aur MongoDB use karta hoon" bolne ki zarurat nahi\n- Preferred code style set karo: "Hamesha async/await use karo, callbacks nahi. camelCase variables. JSDoc comments add karo."\n- Explanation depth set karo: "Main experienced developer hoon — beginner explanations skip karo"\n- Output format set karo: "Code hamesha poora dikhao — kabhi \'...rest of the code\' se truncate mat karo"\n\n**Memory vs Custom Instructions:**\n- Custom Instructions: manually likhte ho, hamesha apply hoti hain, tum control karte ho\n- Memory: ChatGPT auto-save karta hai, galat ya outdated ho sakti hai, regularly review karo',
        },
        dailyLifeExample:
          'Custom Instructions aise hain jaise kisi naye colleague ko joining ke din ek detailed onboarding document dena — "Hum TypeScript mein kaam karte hain, async/await use karte hain, MongoDB backend hai, aur code reviews strict hote hain." Phir wo har baar naya task lete hain, unhe ye context already pata hota hai. ChatGPT mein Custom Instructions exactly yahi kaam karti hain.',
        codeExample:
          '// Example Custom Instructions for a developer\n//\n// ── "About you" box ───────────────────────────────────────\n// I am a full-stack developer working primarily with:\n// - Backend: Node.js (Express / Fastify), MongoDB (Mongoose), REST & GraphQL APIs\n// - Frontend: React 18, TypeScript, Tailwind CSS, Zustand for state\n// - Testing: Vitest, React Testing Library, Supertest\n// - Infra: Docker, GitHub Actions, AWS (EC2, S3, RDS)\n// My preferred language is English. I work in a startup environment.\n//\n// ── "Response style" box ──────────────────────────────────\n// - I am an experienced developer. Skip introductory explanations.\n// - Always use async/await (never raw Promises or callbacks).\n// - Use TypeScript with strict types — no "any" unless unavoidable.\n// - Show complete code — never truncate with "..." or "rest of the code".\n// - When suggesting code changes, show a diff or highlight exactly what changed.\n// - Prefer functional patterns (map/filter/reduce) over imperative loops.\n// - Add JSDoc comments to exported functions.',
        keyPoints: [
          'Custom Instructions = persistent system prompt for all conversations',
          'Two boxes: "About you" (context) and "How to respond" (style/format)',
          'Memory = auto-saved facts ChatGPT learns; review it regularly for accuracy',
          'Set tech stack once — never repeat "I use Node.js" in every chat',
          'Enforce code style: async/await, TypeScript, no truncation',
          'Custom Instructions are version-controlled by you; Memory is auto-managed by AI',
        ],
        quiz: [
          {
            question: 'What is the main purpose of Custom Instructions in ChatGPT?',
            options: [
              'To speed up ChatGPT responses',
              'To set a persistent system prompt applied to every conversation',
              'To store your chat history permanently',
              'To enable voice mode',
            ],
            correctIndex: 1,
          },
          {
            question: 'How is ChatGPT Memory different from Custom Instructions?',
            options: [
              'Memory is manually written; Custom Instructions are auto-saved',
              'They are the same thing',
              'Memory is auto-saved by ChatGPT; Custom Instructions are manually set by the user',
              'Memory only works on mobile',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          'How would you use Custom Instructions to make ChatGPT a more effective coding assistant for your specific tech stack?',
          'What is the risk of relying on ChatGPT Memory for project context, and how would you mitigate it?',
        ],
      },
      {
        title: 'ChatGPT in Daily Developer Workflow',
        difficulty: 'medium',
        tags: ['workflow', 'productivity', 'standup', 'git', 'boilerplate'],
        explanation: {
          english:
            'ChatGPT is not just for learning — it is a daily productivity tool that can handle many repetitive developer tasks in seconds.\n\n**Morning standup routine:**\nRun `git diff HEAD~1 HEAD --stat` (or `git log --oneline -10`) and paste the output into ChatGPT with the prompt: "Based on this git diff, write a concise standup update covering: what I did yesterday, what I\'m doing today (continue the same feature), and no blockers." You get a polished standup update in 5 seconds.\n\n**PR descriptions:**\nPaste your commit messages: "Write a detailed GitHub pull request description for these commits. Include: summary, what changed and why, testing notes, and any breaking changes." Saves 10–15 minutes per PR.\n\n**Error messages:**\nPaste any error/stack trace + relevant code and ask: "Explain this error and give me the most likely fix." Much faster than Googling.\n\n**Boilerplate generation:**\nChatGPT excels at boilerplate: Mongoose models, Express route handlers, Zod schemas, test files, Dockerfile, GitHub Actions workflow YAML, .env.example files. Just describe the schema and it generates production-ready boilerplate.\n\n**Code review assistance:**\nPaste a function and say: "Review this for: (1) bugs, (2) security issues, (3) performance, (4) readability. Be direct." You get a focused review faster than waiting for a colleague.',
          hinglish:
            'ChatGPT sirf learning ke liye nahi hai — ye ek daily productivity tool hai jo developer ke repetitive tasks seconds mein handle kar sakta hai.\n\n**Subah standup routine:**\n`git diff HEAD~1 HEAD --stat` run karo (ya `git log --oneline -10`), output ChatGPT mein paste karo aur likho: "Is git diff ke basis pe ek concise standup update likho: kal kya kiya, aaj kya karunga (same feature continue), koi blocker nahi." 5 seconds mein polished standup mil jaata hai.\n\n**PR descriptions:**\nApne commit messages paste karo: "In commits ke liye detailed GitHub pull request description likho. Include: summary, kya aur kyon badla, testing notes, aur breaking changes." Har PR pe 10-15 minutes bachte hain.\n\n**Error messages:**\nKoi bhi error/stack trace + relevant code paste karo aur pucho: "Ye error explain karo aur most likely fix do." Google se bahut fast.\n\n**Boilerplate generation:**\nChatGPT boilerplate mein excellent hai: Mongoose models, Express route handlers, Zod schemas, test files, Dockerfile, GitHub Actions YAML, .env.example. Bas schema describe karo, production-ready boilerplate mil jaata hai.\n\n**Code review:**\nKoi function paste karo aur bolo: "Iske liye review karo: (1) bugs, (2) security issues, (3) performance, (4) readability." Colleague ka intezaar kiye bina focused review milti hai.',
        },
        dailyLifeExample:
          'Har subah ChatGPT se standup draft karwao — ye ek smart EA (Executive Assistant) ki tarah hai jo raat ko git history dekh ke subah tumhara daily report ready kar deta hai. Bas thoda polish karo aur post karo. Developers jo ye karte hain unka time bahut bachta hai mundane writing tasks se.',
        codeExample:
          '# ── Standup update prompt ─────────────────────────────────────────────\n# Paste into ChatGPT after running: git log --oneline -10\n#\n# Prompt:\n# "Based on these git commits, write a standup update (3 bullet points max):\n#  - Yesterday: what was completed\n#  - Today: what is next\n#  - Blockers: none (unless I tell you)\n#  Keep it under 80 words. Use past tense for yesterday, present for today."\n\n# ── PR description prompt ──────────────────────────────────────────────\n# "Write a GitHub PR description for these commits:\n#  [paste commit messages]\n#  Format:\n#  ## Summary (2-3 bullets)\n#  ## What changed and why\n#  ## How to test\n#  ## Breaking changes (if any)"\n\n# ── Boilerplate: Mongoose model ───────────────────────────────────────\n# "Generate a Mongoose model for a BlogPost with fields:\n#  title (string, required), content (string, required),\n#  author (ObjectId ref User), tags (array of strings),\n#  status (enum: draft/published/archived, default draft),\n#  createdAt / updatedAt (auto via timestamps).\n#  Use TypeScript with a proper interface. Add JSDoc."',
        keyPoints: [
          'Paste git diff/log to generate standup updates in seconds',
          'Paste commit messages to generate detailed PR descriptions',
          'Paste error + code to get instant explanation and fix',
          'Generate Mongoose models, API routes, test files via description',
          'Use ChatGPT for quick code review before requesting a peer review',
          'Prompt templates make repetitive tasks 10× faster',
        ],
        quiz: [
          {
            question: 'What git command output would you paste into ChatGPT to generate a standup update?',
            options: [
              'git status',
              'git log --oneline or git diff HEAD~1 HEAD',
              'git pull',
              'git init',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which of these is a good use of ChatGPT in a developer workflow?',
            options: [
              'Deploying code directly to production',
              'Generating boilerplate code like Mongoose models and route handlers',
              'Replacing all code reviews permanently',
              'Running tests automatically',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          'Describe two ways you use AI tools like ChatGPT to speed up your development workflow.',
          'What are the risks of using ChatGPT-generated boilerplate code directly in production without review?',
        ],
      },
      {
        title: 'Efficient Prompting Shortcuts',
        difficulty: 'medium',
        tags: ['prompting', 'risen', 'few-shot', 'chain-of-thought', 'structured-output'],
        explanation: {
          english:
            'Once you move past basic prompting, a few frameworks and techniques dramatically improve your results.\n\n**The RISEN Framework:**\nA structured template for professional prompts:\n- **R — Role**: "You are a senior TypeScript developer..."\n- **I — Instructions**: "Review the following function for type safety issues"\n- **S — Steps**: "First identify the issues, then rank by severity, then suggest fixes"\n- **E — End goal**: "I want a list of actionable changes I can make in 30 minutes"\n- **N — Narrowing**: "Focus only on TypeScript-specific issues, not general logic"\n\n**One-shot vs Few-shot vs Chain-of-thought:**\n- **Zero-shot**: Just ask. Works for simple tasks. "Translate this to French."\n- **One-shot**: Provide one example. "Here is the format I want: [example]. Now do it for: [actual input]."\n- **Few-shot**: Provide 2–5 examples. Best for: consistent formatting, classification tasks, code transformations. The model learns the pattern from your examples.\n- **Chain-of-thought (CoT)**: Add "think step by step" or "reason through this systematically." Dramatically improves accuracy on math, logic, debugging. The model is forced to show its reasoning before the final answer.\n\n**When to use "think step by step":**\n- Debugging complex issues\n- Math or algorithm problems\n- Architecture decisions\n- Any task where intermediate reasoning matters\n\n**Structured output:**\n- "Respond as a JSON object with keys: issue, severity, fix"\n- "Format as a markdown table with columns: Method, Time Complexity, Space Complexity"\n- "Give me a numbered list of steps"\n- Combine with API `response_format: { type: "json_object" }` for guaranteed JSON',
          hinglish:
            'Basic prompting ke baad kuch frameworks aur techniques results bahut improve karte hain.\n\n**RISEN Framework:**\nProfessional prompts ke liye structured template:\n- **R — Role**: "Tum ek senior TypeScript developer ho..."\n- **I — Instructions**: "Is function ko type safety issues ke liye review karo"\n- **S — Steps**: "Pehle issues identify karo, phir severity ke hisaab se rank karo, phir fixes suggest karo"\n- **E — End goal**: "Mujhe actionable changes ki list chahiye jo main 30 minutes mein kar sakun"\n- **N — Narrowing**: "Sirf TypeScript-specific issues pe focus karo, general logic pe nahi"\n\n**One-shot vs Few-shot vs Chain-of-thought:**\n- **Zero-shot**: Bas pooch lo. Simple tasks ke liye. "Ye French mein translate karo."\n- **One-shot**: Ek example do. "Ye format chahiye: [example]. Ab ye karo: [actual input]."\n- **Few-shot**: 2-5 examples do. Best for: consistent formatting, classification, code transformations. Model pattern seekh leta hai.\n- **Chain-of-thought (CoT)**: "Step by step sochke bata" add karo. Maths, logic, debugging mein accuracy bahut badhta hai. Model reasoning dikhane ke liye force hota hai.\n\n**"Think step by step" kab use karo:**\n- Complex issues debug karte waqt\n- Maths ya algorithm problems\n- Architecture decisions\n- Jahan bhi intermediate reasoning matter karta ho\n\n**Structured output:**\n- "JSON object ke roop mein jawab do keys ke saath: issue, severity, fix"\n- "Markdown table mein format karo columns: Method, Time Complexity, Space Complexity"\n- "Numbered list of steps do"\n- API mein `response_format: { type: "json_object" }` combine karo guaranteed JSON ke liye',
        },
        dailyLifeExample:
          'RISEN framework waise hi hai jaise kisi freelancer ko ek acha brief dena — role clear karo (kaun hai), instructions do (kya karna hai), steps batao (kaise karna hai), end goal define karo (result kaisa chahiye), aur narrow karo (kya scope se bahar hai). Jitna better brief, utna better deliverable — same rule ChatGPT prompts pe apply hota hai.',
        codeExample:
          '// Few-shot prompt for generating test cases\n//\n// System: "You are a testing expert. Generate Vitest unit tests.\n//          Follow the exact format shown in examples."\n//\n// User:\n// Example 1:\n// Function: add(a, b) => returns a + b\n// Tests:\n// it("adds two positive numbers", () => { expect(add(2, 3)).toBe(5); });\n// it("handles negative numbers",  () => { expect(add(-1, 1)).toBe(0); });\n// it("adds zeros",                () => { expect(add(0, 0)).toBe(0); });\n//\n// Example 2:\n// Function: capitalize(str) => returns first letter uppercase\n// Tests:\n// it("capitalizes first letter",  () => { expect(capitalize("hello")).toBe("Hello"); });\n// it("handles empty string",      () => { expect(capitalize("")).toBe(""); });\n// it("handles single char",       () => { expect(capitalize("a")).toBe("A"); });\n//\n// Now generate tests for:\n// Function: slugify(text) => lowercases, trims, replaces spaces with hyphens,\n//           removes special characters\n//\n// ── Chain-of-thought prompt example ───────────────────────────────────\n// "Think step by step:\n//  I have a Node.js API that occasionally returns 503 under load.\n//  The DB query takes 800ms on average but spikes to 8s under load.\n//  Step 1: Identify the likely root cause.\n//  Step 2: List three potential fixes in order of implementation effort.\n//  Step 3: Recommend which fix to implement first and why."',
        keyPoints: [
          'RISEN = Role, Instructions, Steps, End goal, Narrowing — a template for quality prompts',
          'Few-shot: give 2-5 examples so ChatGPT learns the exact pattern you want',
          '"Think step by step" (chain-of-thought) boosts accuracy on logic/math/debugging',
          'Structured output: ask for JSON/table/numbered list for easy parsing',
          'Zero-shot works for simple tasks; use few-shot for consistent formatting',
          'Narrowing your scope ("only TypeScript issues, not logic") avoids off-topic answers',
        ],
        quiz: [
          {
            question: 'What does the "N" in the RISEN framework stand for?',
            options: ['Numbering', 'Narrowing', 'Next steps', 'Negation'],
            correctIndex: 1,
          },
          {
            question: 'When is chain-of-thought (think step by step) most useful?',
            options: [
              'When you want a shorter response',
              'When translating text',
              'When solving logic, math, or debugging problems that need intermediate reasoning',
              'When asking for a list of items',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          'Explain the RISEN framework and give an example of using it to write a prompt for a code review task.',
          'What is the difference between few-shot prompting and chain-of-thought prompting? When would you use each?',
        ],
      },
    ],
  },

  // ─── TOPIC 5 ───────────────────────────────────────────────────────────────
  {
    title: 'Automating Work with ChatGPT',
    level: 'advanced',
    description: 'ChatGPT ko Zapier/Make.com automation se connect karo, apna chatbot banao, aur batch processing pipelines setup karo.',
    concepts: [
      {
        title: 'ChatGPT + Zapier / Make Automation',
        difficulty: 'medium',
        tags: ['zapier', 'make', 'automation', 'no-code', 'workflow'],
        explanation: {
          english:
            'You do not need to write code to automate with ChatGPT — Zapier and Make.com (formerly Integromat) let you connect ChatGPT to hundreds of other apps through a visual no-code interface.\n\n**How it works:**\n- Zapier and Make have an OpenAI / ChatGPT integration built-in\n- You set a trigger (something that starts the workflow) and one or more actions (what happens next)\n- ChatGPT can be both an action (generate text) and a middle step (classify, summarise, rewrite)\n\n**Example 1: GitHub Issue Triage Bot**\nTrigger: New issue created on GitHub\nStep 1 (ChatGPT action): "Read this issue title and body. Classify it as: Bug / Feature Request / Question / Documentation. Assign a priority (high/medium/low) and suggest which team (frontend/backend/devops) should handle it. Respond as JSON."\nStep 2: Post a triage comment back to the GitHub issue with the classification\nResult: Every new issue gets auto-triaged in seconds\n\n**Example 2: Daily News Digest**\nTrigger: Scheduled (every morning at 8am)\nStep 1: Fetch RSS items from 5 tech news sources\nStep 2 (ChatGPT): "Here are today\'s headlines. Write a 5-bullet summary of the most important developer news, focusing on AI, JavaScript, and cloud infrastructure."\nStep 3: Send the summary to your email or Slack\nResult: Personalised news digest every morning without opening a single website\n\n**When to use Zapier vs Make vs code:**\n- Zapier: simpler workflows, best for non-developers, large app ecosystem\n- Make.com: more powerful, visual data mapping, better for complex multi-step flows\n- Custom code (Node.js + OpenAI API): best for high-volume, custom logic, or when you need full control',
          hinglish:
            'ChatGPT ke saath automate karne ke liye code likhna zaruri nahi — Zapier aur Make.com (pehle Integromat) tumhe ChatGPT ko saikdon doosri apps se visual no-code interface ke through connect karne dete hain.\n\n**Kaise kaam karta hai:**\n- Zapier aur Make mein OpenAI/ChatGPT integration built-in hai\n- Tum trigger set karte ho (kya workflow start karega) aur actions (phir kya hoga)\n- ChatGPT action bhi ho sakta hai (text generate karo) aur middle step bhi (classify, summarise, rewrite)\n\n**Example 1: GitHub Issue Triage Bot**\nTrigger: GitHub pe naya issue create hua\nStep 1 (ChatGPT): "Is issue title aur body ko padho. Classify karo: Bug / Feature Request / Question / Documentation. Priority assign karo (high/medium/low) aur suggest karo kaunsi team handle kare. JSON mein jawab do."\nStep 2: Classification ke saath GitHub issue pe triage comment post karo\nResult: Har naye issue pe auto-triage seconds mein\n\n**Example 2: Daily News Digest**\nTrigger: Scheduled (har subah 8 baje)\nStep 1: 5 tech news sources se RSS items fetch karo\nStep 2 (ChatGPT): "Ye aaj ke headlines hain. Developer news ke 5 important bullets likhao — AI, JavaScript, aur cloud pe focus karo."\nStep 3: Summary email ya Slack pe bhejo\nResult: Bina koi website khole personalised news digest har subah\n\n**Zapier vs Make vs code:**\n- Zapier: simple workflows, non-developers ke liye best\n- Make.com: zyada powerful, complex multi-step flows\n- Custom code (Node.js + OpenAI API): high-volume, custom logic, full control',
        },
        dailyLifeExample:
          'Zapier + ChatGPT waise hai jaise ek smart office assistant hire karna jo "jab bhi GitHub pe naya bug issue aaye, use pado, classify karo, aur team ko notify karo" jaisa kaam 24/7 bina thake karta rahe. Tum bas workflow design karo — execution automatic hai.',
        codeExample:
          '# ── Zapier Workflow: GitHub Issue → ChatGPT Triage → Comment ─────────\n#\n# TRIGGER: GitHub — New Issue\n#   App: GitHub\n#   Trigger event: New Issue\n#   Repo: your-org/your-repo\n#\n# ACTION 1: OpenAI — Send prompt\n#   Model: gpt-4o-mini   (cheap, fast — ideal for classification)\n#   User message:\n#     "Triage this GitHub issue and respond ONLY as JSON.\n#\n#      Title: {{issue_title}}\n#      Body:  {{issue_body}}\n#\n#      Return JSON with keys:\n#        type: one of [Bug, Feature, Question, Docs]\n#        priority: one of [high, medium, low]\n#        team: one of [frontend, backend, devops, unknown]\n#        one_line_summary: max 20 words"\n#\n# ACTION 2: GitHub — Create Comment\n#   Issue number: {{issue_number}}\n#   Comment body:\n#     "Auto-triage (ChatGPT):\n#      Type: {{chatgpt_type}} | Priority: {{chatgpt_priority}}\n#      Team: {{chatgpt_team}}\n#      Summary: {{chatgpt_one_line_summary}}"\n#\n# ── Make.com equivalent: same logic, drag-and-drop modules ──────────',
        keyPoints: [
          'Zapier and Make.com have built-in OpenAI/ChatGPT integrations — no code needed',
          'ChatGPT can be a middle step: classify, summarise, or rewrite data between other apps',
          'Example: GitHub issue → ChatGPT triage → post comment (all automated)',
          'Example: RSS feeds → ChatGPT summarise → send to email/Slack',
          'Zapier: simpler; Make.com: more powerful for complex flows',
          'Use GPT-4o mini for automation (cheap, fast, good enough for classification tasks)',
        ],
        quiz: [
          {
            question: 'In a Zapier workflow with ChatGPT, what is the "trigger"?',
            options: [
              'The ChatGPT prompt',
              'The event that starts the workflow (e.g., new GitHub issue)',
              'The OpenAI API key',
              'The output of ChatGPT',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why is GPT-4o mini recommended for Zapier/Make automation workflows?',
            options: [
              'It supports more file types',
              'It has a larger context window',
              'It is much cheaper and fast, making it cost-effective for high-frequency automated tasks',
              'It is the only model available in Zapier',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          'Describe a no-code automation workflow you could build with Zapier, ChatGPT, and GitHub to reduce manual developer toil.',
          'When would you choose to build a custom Node.js + OpenAI API integration instead of using Zapier or Make.com?',
        ],
      },
      {
        title: 'Building a ChatGPT-Powered Chatbot',
        difficulty: 'hard',
        tags: ['chatbot', 'nodejs', 'openai-api', 'streaming', 'rag'],
        explanation: {
          english:
            'Building your own chatbot with the OpenAI API is more powerful than using ChatGPT directly — you control the system prompt, conversation history, streaming, and can integrate your own knowledge base.\n\n**Core concepts of a chatbot:**\n1. **System prompt**: Defines the bot\'s personality, knowledge scope, and behaviour. Persists across all turns.\n2. **Conversation history**: Every API call must include the full message history (system + all prior user/assistant messages). This is how ChatGPT maintains context — the API is stateless, so your app manages memory.\n3. **Streaming**: Set `stream: true` to show tokens as they appear — this makes the bot feel responsive.\n\n**Knowledge base options:**\n- **Fine-tuning**: Train the model on your data. Expensive, slow to update, best for style/tone changes\n- **RAG (Retrieval Augmented Generation)**: Embed your docs, retrieve relevant chunks at query time, inject into the context. Best for large, frequently updated knowledge bases\n- **Function calling**: Define a function that searches your database/API. Model calls it when needed. Most flexible for dynamic data\n- **Context stuffing**: Just paste your docs into the system prompt. Works for small knowledge bases (<50 pages)\n\n**For most startups/developers:**\nRAG (with a vector database like Pinecone, Qdrant, or pgvector in Postgres) is the right choice — scalable, always up to date, no retraining needed.',
          hinglish:
            'OpenAI API se apna chatbot banana ChatGPT direct use karne se zyada powerful hai — tum system prompt, conversation history, streaming control karte ho aur apna knowledge base integrate kar sakte ho.\n\n**Chatbot ke core concepts:**\n1. **System prompt**: Bot ki personality, knowledge scope, aur behaviour define karta hai. Har turn mein persist karta hai.\n2. **Conversation history**: Har API call mein poori message history include karni padti hai (system + saare prior user/assistant messages). Ye aise hi context maintain hota hai — API stateless hai, tumhari app memory manage karti hai.\n3. **Streaming**: `stream: true` se tokens dikhte hain jaise generate hote hain — bot responsive lagta hai.\n\n**Knowledge base options:**\n- **Fine-tuning**: Model ko apne data pe train karo. Expensive, update karna slow, style/tone changes ke liye best\n- **RAG (Retrieval Augmented Generation)**: Docs embed karo, query time pe relevant chunks retrieve karo, context mein inject karo. Large, frequently updated knowledge bases ke liye best\n- **Function calling**: Apna database/API search karne ke liye function define karo. Model zarurat pe call karta hai. Dynamic data ke liye most flexible\n- **Context stuffing**: Docs seedhe system prompt mein paste karo. Small knowledge bases ke liye kaam karta hai (<50 pages)\n\n**Zyaatar startups/developers ke liye:**\nRAG (Pinecone, Qdrant, ya pgvector with Postgres) sahi choice hai — scalable, hamesha up to date, retraining ki zarurat nahi.',
        },
        dailyLifeExample:
          'Apna custom chatbot banana aise hai jaise ek custom-trained customer support agent hire karna — sirf aapki company ke docs, sirf aapke products, sirf aapke tone mein baat karta hai. Generic ChatGPT ek generalist hai; aapka chatbot ek specialist hai jo sirf aapke domain mein expert hai.',
        codeExample:
          '// Full Node.js chatbot with conversation history + streaming\nconst OpenAI = require("openai");\nconst readline = require("readline");\nconst client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\nconst SYSTEM_PROMPT = `You are a friendly support agent for LearnVerse, an online learning platform.\nYou help users with: course access, billing, technical issues, and learning guidance.\nIf you do not know the answer, say so honestly and offer to escalate.\nAlways respond in the same language the user writes in.`;\n\nconst history = [{ role: "system", content: SYSTEM_PROMPT }];\n\nasync function chat(userMessage) {\n  history.push({ role: "user", content: userMessage });\n\n  const stream = client.beta.chat.completions.stream({\n    model: "gpt-4o-mini",\n    messages: history,\n  });\n\n  process.stdout.write("Bot: ");\n  let fullReply = "";\n\n  for await (const chunk of stream) {\n    const delta = chunk.choices[0]?.delta?.content || "";\n    process.stdout.write(delta);   // stream to terminal in real time\n    fullReply += delta;\n  }\n  console.log();\n\n  history.push({ role: "assistant", content: fullReply }); // maintain history\n  return fullReply;\n}\n\n// Simple CLI loop\nconst rl = readline.createInterface({ input: process.stdin });\nconsole.log("LearnVerse Support Bot (type \\"exit\\" to quit)\\n");\nrl.on("line", async (line) => {\n  if (line.trim() === "exit") process.exit(0);\n  await chat(line.trim());\n});',
        keyPoints: [
          'Build with OpenAI API: system prompt + conversation history array',
          'API is stateless — your app must send full message history on every call',
          'stream: true gives real-time token output for a responsive UI',
          'RAG = embed docs, retrieve relevant chunks, inject into context — best for large knowledge bases',
          'Fine-tuning: expensive, slow to update — only use for style/tone customisation',
          'For most cases: context stuffing (small docs) or RAG (large/dynamic docs)',
        ],
        quiz: [
          {
            question: 'Why must you include the full conversation history in every OpenAI API call?',
            options: [
              'To increase the response quality',
              'Because the API is stateless — it has no memory of previous calls',
              'To reduce token costs',
              'It is optional — the API remembers past messages',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is RAG (Retrieval Augmented Generation)?',
            options: [
              'A method to fine-tune the model on your data',
              'A technique to embed documents and retrieve relevant chunks at query time to inject into context',
              'A way to cache API responses',
              'A streaming method for faster responses',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          'Explain how you would build a support chatbot that answers questions based on a company\'s internal documentation. What architecture would you use?',
          'Compare fine-tuning, RAG, and context stuffing as approaches to give a chatbot domain-specific knowledge. When would you choose each?',
        ],
      },
      {
        title: 'Batch Content Generation Pipeline',
        difficulty: 'hard',
        tags: ['batch', 'api', 'rate-limiting', 'async', 'pipeline'],
        explanation: {
          english:
            'One of the most powerful uses of the OpenAI API is processing large amounts of data in batch — generating 50 product descriptions, translating 100 sentences, classifying 200 support tickets, or summarising 500 articles.\n\n**Key challenges in batch processing:**\n1. **Rate limits**: OpenAI enforces requests-per-minute (RPM) and tokens-per-minute (TPM) limits per API key. Exceeding them returns a 429 error.\n2. **Concurrency**: Sending requests one-by-one is too slow. Sending all at once hits rate limits. The solution: controlled concurrency (e.g., 5–10 requests in parallel).\n3. **Error handling**: Some requests will fail (timeout, content filter, invalid input). The pipeline must handle errors gracefully — log failures, retry with backoff, and not lose progress.\n4. **Progress tracking**: For large batches (500+ items), you need to know progress, estimate completion time, and be able to resume from where you left off.\n5. **Cost estimation**: Before running a large batch, estimate the token count and total cost.\n\n**OpenAI Batch API:**\nFor very large batches, OpenAI offers an asynchronous Batch API that processes requests at 50% lower cost (with up to 24-hour turnaround). You submit a JSONL file of requests and poll for completion — ideal for non-real-time workloads like overnight report generation.\n\n**For real-time batches (< 1000 items):**\nUse `Promise.all` with a concurrency limiter (like the `p-limit` npm package).',
          hinglish:
            'OpenAI API ka sabse powerful use large amounts of data batch mein process karna hai — 50 product descriptions generate karna, 100 sentences translate karna, 200 support tickets classify karna, ya 500 articles summarize karna.\n\n**Batch processing mein key challenges:**\n1. **Rate limits**: OpenAI requests-per-minute (RPM) aur tokens-per-minute (TPM) limits enforce karta hai. Exceed karne pe 429 error.\n2. **Concurrency**: Ek-ek request bhejne se bahut slow. Saare ek saath bhejne se rate limit hit. Solution: controlled concurrency (e.g., 5-10 requests parallel).\n3. **Error handling**: Kuch requests fail hongi (timeout, content filter, invalid input). Pipeline gracefully errors handle kare — failures log karo, retry with backoff, progress lose mat karo.\n4. **Progress tracking**: Large batches (500+ items) ke liye progress jaanna, completion time estimate karna, aur resume karna zaruri hai.\n5. **Cost estimation**: Large batch run karne se pehle token count aur total cost estimate karo.\n\n**OpenAI Batch API:**\nBahut large batches ke liye OpenAI asynchronous Batch API offer karta hai jo 50% kam cost pe process karta hai (24-hour turnaround tak). JSONL file submit karo aur completion ke liye poll karo — overnight report generation jaisi non-real-time workloads ke liye ideal.\n\n**Real-time batches ke liye (< 1000 items):**\n`p-limit` npm package ke saath `Promise.all` use karo.',
        },
        dailyLifeExample:
          'Batch processing pipeline ek assembly line ki tarah hai. Agar tumhare paas 200 product descriptions likhni hain, manually ek-ek karna 5 ghante ka kaam hai. Pipeline 10 workers (concurrent API calls) laga deta hai, sab parallel kaam karte hain, aur 200 descriptions 15 minutes mein ready ho jaati hain.',
        codeExample:
          '// Async batch processor with concurrency control and progress tracking\nconst OpenAI = require("openai");\nconst pLimit = require("p-limit").default; // npm install p-limit\n\nconst client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\nconst limit = pLimit(8); // max 8 concurrent requests\n\nasync function generateDescription(product) {\n  const response = await client.chat.completions.create({\n    model: "gpt-4o-mini", // cheap + fast = ideal for batch\n    messages: [\n      {\n        role: "system",\n        content: "Write a compelling 2-sentence product description. Be specific and benefit-focused.",\n      },\n      {\n        role: "user",\n        content: `Product: ${product.name}\\nCategory: ${product.category}\\nFeatures: ${product.features.join(", ")}`,\n      },\n    ],\n    max_tokens: 150,\n  });\n  return response.choices[0].message.content.trim();\n}\n\nasync function batchProcess(products) {\n  let completed = 0;\n  const results = [];\n  const errors = [];\n\n  const tasks = products.map((product, i) =>\n    limit(async () => {\n      try {\n        const description = await generateDescription(product);\n        results.push({ id: product.id, description });\n      } catch (err) {\n        console.error(`Failed for product ${product.id}:`, err.message);\n        errors.push({ id: product.id, error: err.message });\n      } finally {\n        completed++;\n        process.stdout.write(`\\rProgress: ${completed}/${products.length}`);\n      }\n    })\n  );\n\n  await Promise.all(tasks);\n  console.log(`\\nDone: ${results.length} succeeded, ${errors.length} failed`);\n  return { results, errors };\n}\n\n// Usage\nconst products = [\n  { id: 1, name: "Noise-cancelling headphones", category: "Audio", features: ["40hr battery", "ANC", "foldable"] },\n  // ... 49 more\n];\nconst { results } = await batchProcess(products);',
        keyPoints: [
          'Batch processing: generate/classify/translate hundreds of items via API',
          'Rate limits (429 error) require controlled concurrency — use p-limit or similar',
          'Always handle errors gracefully and log failures — do not lose partial progress',
          'GPT-4o mini is ideal for batch: cheap, fast, good quality for classification/generation',
          'OpenAI Batch API: 50% cost reduction for non-real-time, large-scale workloads',
          'Estimate tokens + cost before running large batches to avoid surprise bills',
        ],
        quiz: [
          {
            question: 'What npm package is commonly used to limit the number of concurrent async requests in Node.js?',
            options: ['async-limit', 'p-limit', 'throttle-async', 'rate-limiter'],
            correctIndex: 1,
          },
          {
            question: 'What HTTP status code does OpenAI return when you exceed rate limits?',
            options: ['401', '403', '429', '503'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          'How would you design a batch processing pipeline to generate 500 product descriptions using the OpenAI API, handling rate limits and failures gracefully?',
          'What is the OpenAI Batch API and when would you use it instead of real-time API calls?',
        ],
      },
    ],
  },

  // ─── TOPIC 6 ───────────────────────────────────────────────────────────────
  {
    title: 'Prompt Engineering Masterclass — ChatGPT',
    level: 'advanced',
    description: 'Prompt engineering ke advanced techniques — 6 core ingredients, chain-of-thought, tree-of-thought, system prompts, aur prompt chaining.',
    concepts: [
      {
        title: 'The 6 Core Prompt Ingredients',
        difficulty: 'medium',
        tags: ['prompt-engineering', 'role-prompting', 'structured-prompt', 'best-practices'],
        explanation: {
          english:
            'Every high-quality prompt shares six key ingredients. Understanding them lets you consistently get professional-grade output from ChatGPT.\n\n**1. Role** — Who is ChatGPT in this context?\n"You are a senior software engineer with 15 years of experience in distributed systems..."\nSetting a specific, expert role increases the depth and accuracy of responses.\n\n**2. Task** — What exactly do you want done?\nBe precise. "Write a sorting function" is vague. "Write a JavaScript function that sorts an array of objects by a specified key, handles null values gracefully, and is immutable (does not mutate the original array)" is clear.\n\n**3. Context** — What does ChatGPT need to know to do this well?\nLanguage, framework, existing code, constraints, audience, purpose. Without context, ChatGPT makes assumptions that may not match your situation.\n\n**4. Format** — How should the output be structured?\n"Respond as a JSON array", "Write as a markdown table", "Use numbered steps", "Keep under 200 words". Explicit format instructions prevent rambling and ensure parseable output.\n\n**5. Constraints** — What are the guardrails?\n"Do not use external libraries", "Must work in Node.js 18", "Cannot modify the database schema", "Use only ES6+ syntax". Constraints prevent ChatGPT from giving technically correct but practically useless answers.\n\n**6. Examples** — What does good output look like?\nEven one example transforms output quality. It removes ambiguity about tone, style, depth, and format.\n\n**Weak vs strong prompt comparison:**\nWeak: "Write me a sorting function"\nStrong: "You are a JavaScript expert [Role]. Write a pure function [Task] in TypeScript [Context/Constraint] that sorts an array of objects by any key, ascending or descending, without mutating the input [Constraint]. Handle null/undefined values by placing them at the end [Constraint]. Return type should be inferred [Format]. Here is an example of the calling code: sortBy(users, \'name\', \'asc\') [Example]."',
          hinglish:
            'Har high-quality prompt mein 6 key ingredients hote hain. Inhe samajhne se consistently professional-grade output milta hai.\n\n**1. Role** — Is context mein ChatGPT kaun hai?\n"Tum ek senior software engineer ho 15 saal ke distributed systems experience ke saath..."\nSpecific expert role set karne se responses ki depth aur accuracy badhti hai.\n\n**2. Task** — Exactly kya karna hai?\nPrecise raho. "Sorting function likho" vague hai. "JavaScript function likho jo objects ke array ko specified key se sort kare, null values gracefully handle kare, aur immutable ho" clear hai.\n\n**3. Context** — ChatGPT ko kya jaanna chahiye achha kaam karne ke liye?\nLanguage, framework, existing code, constraints, audience, purpose. Context ke bina ChatGPT assumptions karta hai jo tumhare situation se match nahi karte.\n\n**4. Format** — Output kaise structured hona chahiye?\n"JSON array mein jawab do", "Markdown table mein likho", "Numbered steps use karo", "200 words se kam rakho". Explicit format instructions rambling rok te hain aur parseable output ensure karte hain.\n\n**5. Constraints** — Guardrails kya hain?\n"External libraries use mat karo", "Node.js 18 mein kaam karna chahiye", "Database schema modify nahi kar sakte", "Sirf ES6+ syntax". Constraints ChatGPT ko technically correct par practically useless answers dene se rokti hain.\n\n**6. Examples** — Acha output kaisa dikhta hai?\nEk bhi example output quality transform kar deta hai. Tone, style, depth, aur format ke baare mein ambiguity khatam hoti hai.\n\n**Weak vs strong prompt comparison:**\nWeak: "Sorting function likho"\nStrong: "Tum JavaScript expert ho [Role]. TypeScript mein ek pure function likho [Task + Context] jo objects ke array ko kisi bhi key se, ascending ya descending, input mutate kiye bina sort kare [Constraint]. Null/undefined values end mein daalo [Constraint]. Return type inferred hona chahiye [Format]. Example: sortBy(users, \'name\', \'asc\') [Example]."',
        },
        dailyLifeExample:
          'Ye 6 ingredients ek aachi job description likhne jaisi hai. Role = "Senior React Developer", Task = "UI components banana", Context = "fintech startup, mobile-first", Format = "GitHub PR mein submit karo", Constraints = "TypeScript only, no jQuery, accessibility standards", Examples = "pichle PR ka design pattern follow karo." Jitna clearer job description, utna better applicant — aur jitna clearer prompt, utna better ChatGPT output.',
        codeExample:
          '// ── WEAK prompt ────────────────────────────────────────────────────────\n// "Write me a sorting function"\n//\n// ChatGPT might write: Python, JavaScript, Java... basic bubble sort...\n// unhelpful, no constraints, no context.\n\n// ── STRONG prompt (all 6 ingredients) ──────────────────────────────────\n// Role:        "You are a TypeScript expert who writes clean, functional code."\n// Task:        "Write a reusable sortBy utility function."\n// Context:     "I am building a React admin dashboard with a large dataset of user objects."\n// Format:      "Provide: (1) the TypeScript function, (2) its type signature, (3) 3 usage examples."\n// Constraints: "Pure function — do not mutate the input array.\n//               Support ascending and descending order.\n//               Handle null/undefined by placing them last.\n//               No external libraries — vanilla TypeScript only.\n//               Target: TypeScript 5.x, strict mode."\n// Example:     "Calling convention: sortBy(users, \'lastName\', \'asc\')"\n\n// ── The output ChatGPT produces (strong prompt) ─────────────────────────\nfunction sortBy(arr, key, direction = "asc") {\n  return [...arr].sort((a, b) => {\n    const valA = a[key] ?? (direction === "asc" ? Infinity : -Infinity);\n    const valB = b[key] ?? (direction === "asc" ? Infinity : -Infinity);\n    if (valA < valB) return direction === "asc" ? -1 : 1;\n    if (valA > valB) return direction === "asc" ? 1 : -1;\n    return 0;\n  });\n}\n// Handles nulls, immutable, typed, clear usage — exactly what was needed.',
        keyPoints: [
          '6 ingredients: Role, Task, Context, Format, Constraints, Examples',
          'Role prompting sets expertise level and response depth',
          'Constraints prevent technically correct but practically useless answers',
          'Even one example dramatically improves output format consistency',
          'Weak prompt: vague, no context. Strong prompt: precise, constrained, with examples',
          'All 6 do not need to be in every prompt — use the ones that matter for the task',
        ],
        quiz: [
          {
            question: 'Which of the 6 prompt ingredients prevents ChatGPT from using external libraries you cannot install?',
            options: ['Role', 'Format', 'Constraints', 'Examples'],
            correctIndex: 2,
          },
          {
            question: 'What is the most important ingredient to add when you need output in a specific parseable structure like JSON?',
            options: ['Role', 'Format', 'Context', 'Task'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          'Rewrite this weak prompt using all 6 ingredients: "Write me a login function."',
          'Why do constraints improve ChatGPT output quality even when the constraint seems obvious?',
        ],
      },
      {
        title: 'Chain-of-Thought & Tree-of-Thought',
        difficulty: 'hard',
        tags: ['chain-of-thought', 'tree-of-thought', 'reasoning', 'prompting-advanced'],
        explanation: {
          english:
            'Standard prompting asks for an answer. Advanced reasoning prompts ask ChatGPT to think before answering — dramatically improving accuracy on complex tasks.\n\n**Chain-of-Thought (CoT):**\nAdding "think step by step" or "reason through this systematically" forces the model to show its reasoning process. This works because LLMs are next-token predictors — generating reasoning tokens before the final answer actually shifts the model into a more careful, logical mode.\n\nWhen to use CoT:\n- Debugging complex issues (what could cause this error?)\n- Math and algorithm problems\n- Architecture decisions with trade-offs\n- Multi-step logic (if X then Y, but also consider Z)\n- Interpreting ambiguous requirements\n\n**Tree-of-Thought (ToT):**\nAn extension of CoT where ChatGPT explores multiple solution paths, evaluates each, and picks the best. You prompt it to: (1) generate N different approaches, (2) evaluate pros/cons of each, (3) recommend the best one with justification.\n\nThis mirrors how a senior engineer actually thinks: "I could do A (simple but doesn\'t scale), B (more complex but maintainable), or C (requires refactoring). Given our constraints, B is best because..."\n\n**Prompt patterns:**\n- Simple CoT: "Think step by step: [problem]"\n- Explicit CoT: "Before giving your answer, show your reasoning in numbered steps"\n- ToT: "Generate 3 different architectural approaches for [problem]. For each, describe pros, cons, and when it\'s appropriate. Then recommend which to use given [constraints]."\n\n**Why o1 model is different:**\nOpenAI\'s o1 reasoning model runs CoT internally before generating the visible response. You do not need to add "think step by step" — it does it automatically. Use o1 for the hardest problems (complex algorithms, tricky logic bugs, mathematical proofs).',
          hinglish:
            'Standard prompting sirf answer maangta hai. Advanced reasoning prompts ChatGPT se answer se pehle sochvate hain — complex tasks pe accuracy bahut badhti hai.\n\n**Chain-of-Thought (CoT):**\n"Step by step sochke bata" ya "systematically reason karo" add karne se model apna reasoning process dikhata hai. Ye kaam karta hai kyunki LLMs next-token predictors hain — final answer se pehle reasoning tokens generate karna model ko zyada careful aur logical mode mein shift kar deta hai.\n\nCoT kab use karo:\n- Complex issues debug karte waqt\n- Maths aur algorithm problems\n- Trade-offs ke saath architecture decisions\n- Multi-step logic (agar X toh Y, par Z bhi consider karo)\n- Ambiguous requirements interpret karte waqt\n\n**Tree-of-Thought (ToT):**\nCoT ka extension jisme ChatGPT multiple solution paths explore karta hai, evaluate karta hai, aur best choose karta hai. Tum prompt karte ho: (1) N different approaches generate karo, (2) har ek ke pros/cons evaluate karo, (3) constraints ke hisaab se best recommend karo.\n\nYe ek senior engineer ki tarah sochna hai: "A kar sakta hoon (simple par scale nahi hoga), B (zyada complex par maintainable), ya C (refactoring chahiye). Humare constraints mein B best hai kyunki..."\n\n**Prompt patterns:**\n- Simple CoT: "Step by step sochke: [problem]"\n- Explicit CoT: "Jawab dene se pehle numbered steps mein apna reasoning dikhao"\n- ToT: "[Problem] ke liye 3 different architectural approaches generate karo. Har ek ke pros, cons, aur kab appropriate hai describe karo. Phir [constraints] ke hisaab se konsa use karna chahiye recommend karo."\n\n**o1 model kyun alag hai:**\nOpenAI ka o1 reasoning model visible response generate karne se pehle internally CoT run karta hai. "Step by step sochke" add karne ki zarurat nahi — ye automatic karta hai. o1 use karo hardest problems ke liye (complex algorithms, tricky logic bugs, mathematical proofs).',
        },
        dailyLifeExample:
          'CoT waise hai jaise kisi engineer se poochho: "Seedha answer do" vs "Pehle sochke batao, step by step." Ek smart engineer jab step by step sochta hai tab wo zyada accurate answer deta hai — warna shortcuts le leta hai. ChatGPT ke saath bhi exactly yahi hota hai.',
        codeExample:
          '// ── Chain-of-Thought prompt for debugging ─────────────────────────────\n// "Think step by step:\n//  My Node.js Express API returns 500 on POST /api/orders only when\n//  the payload contains a nested array of items with > 10 elements.\n//  Requests with <= 10 items work fine. No error logs appear.\n//\n//  Step 1: List all possible causes for this behaviour.\n//  Step 2: For each cause, describe what evidence would confirm or rule it out.\n//  Step 3: Rank them by likelihood given the symptoms.\n//  Step 4: Suggest the first debugging step I should take."\n\n// ── Tree-of-Thought prompt for architecture decision ───────────────────\n// "I need to add real-time notifications to my Node.js app\n//  (currently REST API + MongoDB + 10k concurrent users expected).\n//\n//  Explore THREE different architectural approaches:\n//  1. WebSockets (Socket.io)\n//  2. Server-Sent Events (SSE)\n//  3. Polling with long-poll\n//\n//  For each approach, provide:\n//  - Implementation complexity (low / medium / high)\n//  - Scalability (how it behaves at 10k concurrent users)\n//  - Pros (2-3 bullet points)\n//  - Cons (2-3 bullet points)\n//  - Best suited for: [use case type]\n//\n//  Finally, given that my app is read-heavy (notifications are one-way,\n//  server-to-client only) and my team has limited WebSocket experience,\n//  recommend which approach to implement and explain why."',
        keyPoints: [
          'Chain-of-Thought: "think step by step" forces the model into careful, logical mode',
          'CoT dramatically improves accuracy on debugging, math, logic, architecture problems',
          'Tree-of-Thought: explore N approaches, evaluate each, pick best with justification',
          'ToT mirrors how senior engineers think: consider alternatives before committing',
          'OpenAI o1 model runs CoT internally — no need to prompt for it explicitly',
          'Use CoT for any problem where intermediate reasoning matters',
        ],
        quiz: [
          {
            question: 'What does Tree-of-Thought prompting ask ChatGPT to do?',
            options: [
              'Write code in a tree data structure',
              'Generate multiple solution approaches, evaluate each, then recommend the best',
              'Only use chain-of-thought for tree problems',
              'Break a problem into sub-tasks automatically',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why does the OpenAI o1 model not need "think step by step" in the prompt?',
            options: [
              'It only works with system prompts',
              'It cannot do chain-of-thought',
              'It runs chain-of-thought reasoning internally before generating the visible output',
              'It uses a different tokenization method',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          'Explain the difference between Chain-of-Thought and Tree-of-Thought prompting. Give a concrete example of when you would use ToT over CoT.',
          'How does the OpenAI o1 model differ from GPT-4o in how it handles reasoning tasks?',
        ],
      },
      {
        title: 'System Prompts & Role Prompting',
        difficulty: 'hard',
        tags: ['system-prompt', 'role-prompting', 'persona', 'api', 'format-enforcement'],
        explanation: {
          english:
            'System prompts are the most powerful lever in prompt engineering — they define who the model is, what it knows, and how it behaves across an entire session or product.\n\n**What makes a great system prompt:**\n1. **Clear identity**: "You are a senior security engineer specialising in Node.js and OWASP Top 10 vulnerabilities. Your reviews are thorough, direct, and prioritised by severity."\n2. **Knowledge scope**: Explicitly state what the model should and should not do. "Only review the code provided — do not suggest architectural changes unless they are security-critical."\n3. **Output format**: Define the exact output structure so your app can parse it reliably. "Always respond in JSON with keys: vulnerabilities (array), severity_summary (object), overall_risk (string: low/medium/high/critical)"\n4. **Tone and style**: "Be direct and concise. Use technical language — the user is an experienced developer. Do not add unnecessary disclaimers."\n5. **Edge cases**: "If the provided code contains no security issues, respond with an empty vulnerabilities array and overall_risk: low. Never say \'I cannot review this code\'."\n\n**Role prompting depth:**\nBasic: "You are a Python developer."\nIntermediate: "You are a senior Python developer at a fintech startup."\nAdvanced: "You are a senior Python developer at a fintech startup who has seen three production outages caused by improper database connection handling. You are opinionated about connection pooling, always check for N+1 queries, and prioritise reliability over cleverness."\n\nThe more specific the persona, the more consistent and expert-level the output.\n\n**Persona stacking:**\nYou can stack multiple roles: "You are a security engineer AND a performance optimisation expert. When reviewing code, flag both security vulnerabilities AND performance issues in the same response."\n\n**Enforcing output format in system prompts:**\nThe most reliable way to get structured output is to: (1) define the exact JSON schema in the system prompt, (2) give an example output, and (3) use `response_format: { type: "json_object" }` in the API call.',
          hinglish:
            'System prompts prompt engineering ka sabse powerful lever hai — wo define karte hain model kaun hai, kya jaanta hai, aur kaise behave karta hai poore session ya product mein.\n\n**Accha system prompt kya banata hai:**\n1. **Clear identity**: "Tum ek senior security engineer ho jo Node.js aur OWASP Top 10 vulnerabilities mein specialise karte ho. Tumhare reviews thorough, direct, aur severity ke hisaab se prioritised hote hain."\n2. **Knowledge scope**: Explicitly state karo model kya kare aur kya nahi. "Sirf provided code review karo — architectural changes suggest mat karo jab tak security-critical na ho."\n3. **Output format**: Exact output structure define karo taaki app reliably parse kar sake. "Hamesha JSON mein jawab do keys ke saath: vulnerabilities (array), severity_summary (object), overall_risk (string: low/medium/high/critical)"\n4. **Tone aur style**: "Direct aur concise raho. Technical language use karo — user experienced developer hai. Unnecessary disclaimers mat do."\n5. **Edge cases**: "Agar code mein koi security issue nahi hai, empty vulnerabilities array aur overall_risk: low ke saath respond karo."\n\n**Role prompting depth:**\nBasic: "Tum Python developer ho."\nIntermediate: "Tum ek fintech startup mein senior Python developer ho."\nAdvanced: "Tum ek fintech startup mein senior Python developer ho jisne teen production outages dekhe hain improper database connection handling ki wajah se. Tum connection pooling ke baare mein opinionated ho, hamesha N+1 queries check karte ho, aur cleverness se zyada reliability prioritise karte ho."\n\nJitna specific persona, utna consistent aur expert-level output.\n\n**Persona stacking:**\nMultiple roles stack kar sakte ho: "Tum security engineer bhi ho AUR performance optimisation expert bhi. Code review karte waqt same response mein dono security vulnerabilities aur performance issues flag karo."\n\n**System prompts mein output format enforce karna:**\nStructured output ke liye sabse reliable tarika: (1) system prompt mein exact JSON schema define karo, (2) ek example output do, (3) API call mein `response_format: { type: "json_object" }` use karo.',
        },
        dailyLifeExample:
          'System prompt ek employee ka job description + company handbook ka combination hai. Jaise ek naye hire ko dete ho: "Tum senior security reviewer ho, aise format mein report dete ho, ye cheezein check karte ho, aur aise communicate karte ho." Ek baar clear system prompt set ho jaaye, wo model consistently waise hi behave karta hai — har conversation mein.',
        codeExample:
          '// Complete system prompt for a code-review bot\nconst CODE_REVIEW_SYSTEM_PROMPT = `\nYou are a senior software engineer specialising in Node.js security and performance.\nYou work at a company with high standards for code quality and security.\n\nWhen reviewing code, you:\n1. Check for OWASP Top 10 vulnerabilities (injection, XSS, IDOR, etc.)\n2. Identify performance issues (N+1 queries, missing indexes, blocking I/O)\n3. Flag missing error handling and improper async patterns\n4. Note any exposed secrets, hardcoded credentials, or insecure configurations\n\nYour tone is direct and professional. You are reviewing code written by a mid-level developer.\nDo not add excessive praise. Be specific — always reference the exact line or pattern.\n\nALWAYS respond in the following JSON format (no extra text outside the JSON):\n{\n  "overall_risk": "low | medium | high | critical",\n  "summary": "One sentence describing the main concern",\n  "issues": [\n    {\n      "severity": "low | medium | high | critical",\n      "category": "security | performance | error-handling | style",\n      "description": "Clear description of the issue",\n      "line_or_pattern": "The exact code pattern or line reference",\n      "recommended_fix": "Specific, actionable fix"\n    }\n  ],\n  "positives": ["What the code does well (1-3 items max)"]\n}\n\nIf there are no issues, return an empty issues array and overall_risk: "low".\n`;\n\n// API call using this system prompt\nconst response = await client.chat.completions.create({\n  model: "gpt-4o",\n  messages: [\n    { role: "system",  content: CODE_REVIEW_SYSTEM_PROMPT },\n    { role: "user",    content: "Review this code:\\n\\n" + codeToReview },\n  ],\n  response_format: { type: "json_object" },\n});\nconst review = JSON.parse(response.choices[0].message.content);',
        keyPoints: [
          'System prompt = identity + scope + format + tone + edge cases',
          'More specific persona = more consistent and expert-level output',
          'Persona stacking: combine multiple expert roles in one system prompt',
          'Always define exact JSON schema in system prompt for structured output',
          'Use response_format json_object API param alongside JSON schema in prompt',
          'Handle edge cases explicitly (e.g., "if no issues, return empty array")',
        ],
        quiz: [
          {
            question: 'What is "persona stacking" in role prompting?',
            options: [
              'Using multiple ChatGPT accounts simultaneously',
              'Assigning multiple expert roles to ChatGPT in a single system prompt',
              'Stacking few-shot examples with role definitions',
              'Running multiple system prompts in parallel',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the most reliable approach to guarantee JSON output from the OpenAI API?',
            options: [
              'Just ask for JSON in the user message',
              'Use a few-shot example only',
              'Define the JSON schema in the system prompt AND set response_format: json_object in the API call',
              'Use the o1 model exclusively',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          'Write a system prompt for a chatbot that helps junior developers debug JavaScript errors. What would you include and why?',
          'How does enforcing output format in a system prompt improve reliability in production chatbot applications?',
        ],
      },
      {
        title: 'Prompt Chaining for Complex Tasks',
        difficulty: 'hard',
        tags: ['prompt-chaining', 'agentic', 'pipeline', 'complex-tasks', 'nodejs'],
        explanation: {
          english:
            'Some tasks are too complex for a single prompt — the output would be too long, too shallow, or the model would lose focus. Prompt chaining breaks a large task into a sequence of smaller prompts where the output of each step feeds into the next.\n\n**Why prompt chaining works:**\n1. **Focus**: Each prompt focuses on one subtask — the model does not have to juggle many responsibilities at once\n2. **Quality**: You can verify and transform each intermediate output before passing it forward\n3. **Debuggability**: If the final result is wrong, you can see exactly which step produced bad output\n4. **Context management**: Splitting the task prevents context window overflow\n\n**Classic developer use case — Feature from scratch:**\nStep 1: "Given this user story: [story], extract a list of functional requirements as JSON"\nStep 2: "Given these requirements: [step1 output], design a MongoDB schema as JSON"\nStep 3: "Given this schema: [step2 output], write a Mongoose model and migration script"\nStep 4: "Given this Mongoose model: [step3 output], write Vitest unit tests covering all schema validations"\n\nEach step is focused, verifiable, and builds on the previous one.\n\n**Validation between steps:**\nYou can add validation logic between prompts:\n- Parse the JSON output and check required keys exist\n- Run a linter on generated code before passing to the next prompt\n- Ask ChatGPT to verify the previous step: "Review the schema from step 2 and flag any issues before we proceed to step 3"\n\n**Prompt chaining vs agents:**\nPrompt chains are deterministic — you decide the steps in advance. Agents are dynamic — they use tools and decide their own next steps. For predictable, structured tasks, chains are more reliable and cheaper.',
          hinglish:
            'Kuch tasks ek single prompt ke liye bahut complex hote hain — output bahut lamba, bahut shallow, ya model focus kho deta hai. Prompt chaining ek bade task ko smaller prompts ke sequence mein todta hai jahan har step ka output next step mein jaata hai.\n\n**Prompt chaining kyon kaam karta hai:**\n1. **Focus**: Har prompt ek subtask pe focus karta hai — model ek saath bahut saari responsibilities juggle nahi karta\n2. **Quality**: Har intermediate output verify aur transform kar sakte ho aage bhejne se pehle\n3. **Debuggability**: Agar final result galat hai, tum dekh sakte ho exactly kaunsa step ne galat output diya\n4. **Context management**: Task split karne se context window overflow nahi hota\n\n**Classic developer use case — Scratch se feature:**\nStep 1: "Is user story ke basis pe functional requirements JSON mein extract karo"\nStep 2: "In requirements ke basis pe MongoDB schema JSON mein design karo"\nStep 3: "Is schema ke basis pe Mongoose model aur migration script likho"\nStep 4: "Is Mongoose model ke basis pe Vitest unit tests likho jo saari schema validations cover kare"\n\nHar step focused, verifiable, aur previous pe build karta hai.\n\n**Steps ke beech validation:**\nPrompts ke beech validation logic add kar sakte ho:\n- JSON output parse karo aur required keys check karo\n- Generated code pe linter run karo next prompt mein bhejne se pehle\n- ChatGPT se previous step verify karwao: "Step 2 ka schema review karo aur issues flag karo step 3 se pehle"\n\n**Prompt chaining vs agents:**\nPrompt chains deterministic hote hain — tum steps advance mein decide karte ho. Agents dynamic hote hain — wo tools use karte hain aur khud next steps decide karte hain. Predictable, structured tasks ke liye chains zyada reliable aur saste hote hain.',
        },
        dailyLifeExample:
          'Prompt chaining waise hai jaise ek assembly line — pehli machine raw material input leta hai, processed output doosri machine ko deta hai, wo aur refine karta hai, aur aakhir mein finished product milta hai. Har machine (prompt) apna specific kaam karta hai. Ek akeli machine poora product ek saath nahi bana sakti — chain better hai.',
        codeExample:
          '// Node.js function that runs a 4-step prompt chain\n// to go from user story → requirements → schema → model → tests\nconst OpenAI = require("openai");\nconst client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\nasync function ask(systemPrompt, userContent) {\n  const res = await client.chat.completions.create({\n    model: "gpt-4o",\n    messages: [\n      { role: "system", content: systemPrompt },\n      { role: "user",   content: userContent },\n    ],\n    response_format: { type: "json_object" },\n  });\n  return JSON.parse(res.choices[0].message.content);\n}\n\nasync function featureFromUserStory(userStory) {\n  console.log("Step 1: Extracting requirements...");\n  const requirements = await ask(\n    "Extract functional requirements from a user story. Respond as JSON: { requirements: string[] }",\n    userStory\n  );\n\n  console.log("Step 2: Designing schema...");\n  const schema = await ask(\n    "Design a MongoDB schema for these requirements. Respond as JSON: { collections: object[] }",\n    "Requirements: " + JSON.stringify(requirements.requirements)\n  );\n\n  console.log("Step 3: Writing Mongoose model...");\n  const model = await ask(\n    "Write a TypeScript Mongoose model. Respond as JSON: { modelCode: string, migrationCode: string }",\n    "Schema: " + JSON.stringify(schema.collections)\n  );\n\n  console.log("Step 4: Generating tests...");\n  const tests = await ask(\n    "Write Vitest unit tests for this Mongoose model. Respond as JSON: { testCode: string }",\n    "Model code: " + model.modelCode\n  );\n\n  return { requirements, schema, model, tests };\n}\n\n// Usage\nconst story = "As a user, I want to save blog posts as drafts and publish them later.";\nconst result = await featureFromUserStory(story);\nconsole.log("Generated test code:", result.tests.testCode);',
        keyPoints: [
          'Prompt chaining: break complex tasks into focused sequential prompts',
          'Each step\'s output feeds into the next — builds incrementally',
          'Validate/transform outputs between steps for higher quality',
          'Easier to debug: identify exactly which step produced bad output',
          'Chains are deterministic; agents are dynamic — chains are better for structured tasks',
          'Classic chain: user story → requirements → schema → model → tests',
        ],
        quiz: [
          {
            question: 'What is the main advantage of prompt chaining over a single large prompt?',
            options: [
              'It is faster and uses fewer tokens',
              'Each step stays focused on one subtask, improving quality and debuggability',
              'It avoids the need for a system prompt',
              'It allows the model to browse the internet',
            ],
            correctIndex: 1,
          },
          {
            question: 'How is a prompt chain different from an AI agent?',
            options: [
              'Prompt chains use tools; agents do not',
              'Prompt chains are deterministic steps defined in advance; agents dynamically decide their next steps',
              'Agents are cheaper than prompt chains',
              'There is no difference — they are the same thing',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          'Design a 3-step prompt chain to automate writing a GitHub pull request description from a git diff. What would each step do?',
          'When would you choose a prompt chain over an AI agent for a complex task? What are the trade-offs?',
        ],
      },
    ],
  },
];

export const curriculum = [...basics, ...features, ...developerWorkflows, ...advancedTopics];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between GPT-4o and GPT-4o mini?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'GPT-4o is OpenAI\'s most capable standard model — it handles complex reasoning, nuanced writing, and multimodal inputs (text, images, audio) with high quality. GPT-4o mini is a smaller, faster, and significantly cheaper version (about 16× cheaper) that handles simpler tasks well but may struggle with complex reasoning. Use GPT-4o for quality-critical tasks and GPT-4o mini for high-volume, cost-sensitive operations like classification or simple Q&A.',
      hinglish:
        'GPT-4o OpenAI ka sabse capable standard model hai — complex reasoning, nuanced writing, aur multimodal inputs (text, images, audio) high quality se handle karta hai. GPT-4o mini smaller, faster, aur bahut sasta version hai (lagbhag 16× kam expensive) jo simple tasks achhe se karta hai par complex reasoning mein struggle kar sakta hai. Quality-critical kaam ke liye GPT-4o use karo, high-volume aur cost-sensitive tasks ke liye GPT-4o mini.',
    },
  },
  {
    question: 'What is function calling in the OpenAI API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Function calling (also called tool use) lets you define functions with JSON Schema and tell the model about them. When the user asks something that requires external data or an action, the model returns a structured JSON object saying "call this function with these arguments" instead of making up an answer. Your application then actually executes the function (fetching data, querying a database, sending a message) and passes the result back to the model, which then generates a final natural-language response. This enables building agents that interact with real-world APIs.',
      hinglish:
        'Function calling (tool use bhi kehte hain) se tum JSON Schema se functions define kar sakte ho aur model ko bata sakte ho. Jab user kuch aisa poochhe jo external data ya action chahiye, model structured JSON return karta hai "is function ko in arguments ke saath call karo" kehte hue. Tumhari app actual function execute karti hai (data fetch, database query, message send) aur result wapas model ko deta hai, jo phir natural-language response generate karta hai. Isse real-world APIs ke saath interact karne wale agents bana sakte ho.',
    },
  },
  {
    question: 'What can you do with ChatGPT Plus that you cannot do for free?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'ChatGPT Plus ($20/month) adds: (1) Full GPT-4o access with 5× higher message limits, (2) Advanced Data Analysis — runs Python in a sandbox to process files and generate charts, (3) File uploads — PDFs, spreadsheets, documents, (4) DALL-E image generation, (5) Voice mode, (6) Creating Custom GPTs, (7) Canvas for collaborative editing, (8) o1 reasoning model access, (9) Web browsing. Free users get GPT-4o mini always and limited GPT-4o when servers allow.',
      hinglish:
        'ChatGPT Plus ($20/month) ye sab add karta hai: (1) Full GPT-4o access 5× zyada limits ke saath, (2) Advanced Data Analysis — Python sandbox mein files process karo aur charts banao, (3) File uploads — PDFs, spreadsheets, documents, (4) DALL-E image generation, (5) Voice mode, (6) Custom GPTs create karo, (7) Canvas collaborative editing, (8) o1 reasoning model, (9) Web browsing. Free users ko GPT-4o mini hamesha milta hai aur limited GPT-4o jab servers allow karein.',
    },
  },
  {
    question: 'What is a context window and why does it matter?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The context window is the maximum amount of text (measured in tokens) that a model can process in a single interaction — including the entire conversation history, system prompt, uploaded files, and the model\'s own responses. GPT-4o has a 128K token context window (≈96,000 words). It matters because: (1) older messages get "forgotten" once you exceed the limit, (2) API costs increase with more tokens, (3) longer contexts can lead to "lost in the middle" where the model ignores information in the middle of a long context.',
      hinglish:
        'Context window maximum text (tokens mein measure ki jaati hai) hai jo model ek interaction mein process kar sakta hai — poori conversation history, system prompt, uploaded files, aur model ke apne responses sabko milake. GPT-4o ka 128K token context window hai (≈96,000 words). Ye kyon matter karta hai: (1) limit exceed hone pe purane messages "bhool" jaate hain, (2) API costs zyada tokens se increase hoti hain, (3) bahut long contexts mein model beech ka information ignore kar sakta hai ("lost in the middle").',
    },
  },
  {
    question: 'How do Custom GPTs work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Custom GPTs are personalised versions of ChatGPT created by Plus users. You configure them with: a name and description, a system prompt (permanent instructions defining personality and expertise), knowledge files (your own documents the GPT can reference), capability toggles (web browsing, DALL-E, code execution), and Actions (connections to external APIs via OpenAPI schema). When a user chats with a Custom GPT, it runs with those permanent instructions and knowledge — like having a specialist assistant pre-trained on your specific context.',
      hinglish:
        'Custom GPTs Plus users ke banaye hue personalised ChatGPT versions hain. Tum inhe configure karte ho: naam aur description, system prompt (permanent instructions personality aur expertise define karte hain), knowledge files (aapke apne documents jo GPT reference kar sake), capability toggles (web browsing, DALL-E, code execution), aur Actions (external APIs se connections OpenAPI schema ke through). Jab user Custom GPT se baat karta hai, wo un permanent instructions aur knowledge ke saath run hota hai — jaise ek specialist assistant jo tumhare specific context pe pehle se trained ho.',
    },
  },
  {
    question: 'What is the difference between ChatGPT and the OpenAI API?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'ChatGPT (chat.openai.com) is a ready-made consumer product with a web/mobile interface — you just type and get answers. The OpenAI API is a programmatic interface that lets developers build their own applications using OpenAI\'s models. With the API you can: integrate AI into your own app/website, call models programmatically in any language, build custom workflows, set custom system prompts per request, handle responses in your own UI, and pay per token used. The API requires coding knowledge; ChatGPT does not.',
      hinglish:
        'ChatGPT (chat.openai.com) ek ready-made consumer product hai web/mobile interface ke saath — bas type karo aur jawab pao. OpenAI API ek programmatic interface hai jo developers ko OpenAI ke models use karke apni apps banana deta hai. API se tum: apni app/website mein AI integrate kar sakte ho, kisi bhi language mein models programmatically call kar sakte ho, custom workflows bana sakte ho, custom system prompts set kar sakte ho, aur tokens use hone pe pay karte ho. API ke liye coding knowledge chahiye; ChatGPT ke liye nahi.',
    },
  },
  {
    question: 'What is Advanced Data Analysis in ChatGPT?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Advanced Data Analysis (formerly Code Interpreter) is a ChatGPT Plus feature that lets the model write and execute Python code in a secure sandbox. You can upload data files (CSV, Excel, JSON) and ask ChatGPT to analyse them, generate visualisation charts (using matplotlib/seaborn), perform statistical analysis, convert file formats, do mathematical computations, and create downloadable output files. It is powerful for data analysis without needing to know Python — just describe what you want in natural language.',
      hinglish:
        'Advanced Data Analysis (pehle Code Interpreter tha) ChatGPT Plus ka feature hai jisme model Python code likh aur execute kar sakta hai secure sandbox mein. Tum data files (CSV, Excel, JSON) upload kar sakte ho aur ChatGPT se bolo analyse karo, charts generate karo (matplotlib/seaborn use karke), statistical analysis karo, file formats convert karo, mathematical computations karo, aur downloadable output files banao. Ye powerful hai data analysis ke liye bina Python jaane — bas natural language mein describe karo kya chahiye.',
    },
  },
  {
    question: 'How do you use the OpenAI API to build an app?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'To build an app with the OpenAI API: (1) Get an API key from platform.openai.com, (2) Install the SDK: npm install openai (or pip install openai for Python), (3) Create a client with your API key, (4) Call client.chat.completions.create() with your chosen model and messages array (system prompt + user message), (5) Parse the response: response.choices[0].message.content, (6) For advanced features: add tools array for function calling, set stream:true for real-time output, use response_format for guaranteed JSON. Store your API key in environment variables — never in source code.',
      hinglish:
        'OpenAI API se app banane ke liye: (1) platform.openai.com se API key lo, (2) SDK install karo: npm install openai (Python ke liye pip install openai), (3) API key se client banao, (4) client.chat.completions.create() call karo apna chosen model aur messages array ke saath (system prompt + user message), (5) Response parse karo: response.choices[0].message.content, (6) Advanced features ke liye: function calling ke liye tools array add karo, real-time output ke liye stream:true set karo, guaranteed JSON ke liye response_format use karo. API key environment variables mein rakho — source code mein kabhi nahi.',
    },
  },
  {
    question: 'What is the RISEN framework and how does it improve prompt quality?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'RISEN is a structured prompt template: Role (who ChatGPT should be), Instructions (what to do), Steps (how to approach the task), End goal (the desired output), and Narrowing (scope constraints). Using RISEN ensures prompts are complete and unambiguous — each ingredient addresses a different failure mode: without Role responses lack expertise depth, without Constraints answers include irrelevant suggestions, without Steps complex tasks get shallow treatment. For developer tasks like code review or architecture decisions, RISEN consistently produces more actionable and focused output than vague natural-language requests.',
      hinglish:
        'RISEN ek structured prompt template hai: Role (ChatGPT kaun hai), Instructions (kya karna hai), Steps (kaise approach karna hai), End goal (desired output), aur Narrowing (scope constraints). RISEN use karne se prompts complete aur unambiguous hote hain — har ingredient ek alag failure mode address karta hai: Role ke bina responses mein expertise ki depth nahi, Constraints ke bina irrelevant suggestions aate hain, Steps ke bina complex tasks shallow treatment milti hai. Code review ya architecture decisions jaisi developer tasks ke liye RISEN consistently zyada actionable aur focused output deta hai vague natural-language requests ke mukable.',
    },
  },
  {
    question: 'Explain the difference between prompt chaining and using an AI agent.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Prompt chaining is a deterministic pipeline where you define the exact sequence of prompts in advance — each step\'s output feeds into the next step\'s input. You control the flow completely. AI agents are dynamic: they receive a high-level goal, use tools (web search, code execution, API calls), and decide their own next steps based on results. Prompt chains are more reliable, debuggable, and cost-predictable — ideal for well-defined structured tasks (user story → schema → model → tests). Agents are better for open-ended tasks where the steps are unknown upfront. In production systems, prompt chains are preferred when reliability matters; agents are used for exploratory or research tasks.',
      hinglish:
        'Prompt chaining ek deterministic pipeline hai jisme tum exact sequence of prompts advance mein define karte ho — har step ka output next step ke input mein jaata hai. Tum flow completely control karte ho. AI agents dynamic hote hain: unhe ek high-level goal milta hai, wo tools use karte hain (web search, code execution, API calls), aur results ke basis pe apne next steps decide karte hain. Prompt chains zyada reliable, debuggable, aur cost-predictable hote hain — well-defined structured tasks ke liye ideal (user story → schema → model → tests). Agents better hote hain open-ended tasks ke liye jahan steps pehle se nahi pata. Production mein prompt chains prefer karo jab reliability matter kare; agents exploratory ya research tasks ke liye.',
    },
  },
  {
    question: 'How would you handle rate limiting when building a batch processing pipeline with the OpenAI API?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Rate limiting in OpenAI batch pipelines is handled with three strategies: (1) Concurrency control — use a library like p-limit to cap parallel requests (typically 5–10 for standard tiers), preventing 429 Too Many Requests errors; (2) Exponential backoff retry — catch 429 errors and retry with increasing delays (1s, 2s, 4s, 8s); (3) Token budgeting — estimate tokens per request and track tokens-per-minute to stay under TPM limits, not just RPM limits. For very large batches (thousands of items), the OpenAI Batch API is the right tool — it processes requests asynchronously at 50% lower cost with up to 24-hour turnaround, bypassing real-time rate limits entirely.',
      hinglish:
        'OpenAI batch pipelines mein rate limiting teen strategies se handle karo: (1) Concurrency control — p-limit jaisi library se parallel requests cap karo (typically 5-10 standard tiers ke liye), 429 Too Many Requests errors se bachao; (2) Exponential backoff retry — 429 errors catch karo aur increasing delays se retry karo (1s, 2s, 4s, 8s); (3) Token budgeting — har request ke tokens estimate karo aur tokens-per-minute track karo TPM limits ke andar rehne ke liye, sirf RPM nahi. Bahut large batches (thousands of items) ke liye OpenAI Batch API sahi tool hai — ye requests asynchronously 50% kam cost pe process karta hai 24-hour turnaround ke saath, real-time rate limits entirely bypass karte hue.',
    },
  },
  {
    question: 'What are the trade-offs between fine-tuning, RAG, and context stuffing for giving a chatbot domain-specific knowledge?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'All three approaches add domain knowledge to a chatbot, but with different trade-offs. Context stuffing (pasting docs into the system prompt): simplest, no infrastructure, works for small static knowledge bases (<50 pages), but hits context limits and increases per-call cost. Fine-tuning (training the model on your data): best for style/tone/format customisation, permanently baked in so no context cost, but expensive ($), slow to update (cannot reflect live data), and does not improve factual recall reliably. RAG (Retrieval Augmented Generation): embed documents into a vector database (Pinecone, pgvector), retrieve relevant chunks at query time, inject into context — best for large, frequently updated knowledge bases; always current, scalable, transparent (you can see what was retrieved). For most production chatbots, RAG is the right choice; context stuffing for prototypes; fine-tuning only for style/behaviour changes.',
      hinglish:
        'Teeno approaches chatbot mein domain knowledge add karte hain, par alag trade-offs ke saath. Context stuffing (docs ko system prompt mein paste karna): sabse simple, koi infrastructure nahi, small static knowledge bases ke liye kaam karta hai (<50 pages), par context limits hit karta hai aur per-call cost badhti hai. Fine-tuning (model ko apne data pe train karna): style/tone/format customisation ke liye best, permanently baked in hota hai toh context cost nahi, par expensive ($), update karna slow hai (live data reflect nahi karta), aur factual recall reliably improve nahi karta. RAG (Retrieval Augmented Generation): documents ko vector database mein embed karo (Pinecone, pgvector), query time pe relevant chunks retrieve karo, context mein inject karo — large, frequently updated knowledge bases ke liye best; hamesha current, scalable, transparent. Production chatbots ke liye zyaatar RAG sahi choice hai; context stuffing prototypes ke liye; fine-tuning sirf style/behaviour changes ke liye.',
    },
  },
];
