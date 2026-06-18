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

export const curriculum = [...basics, ...features, ...developerWorkflows];

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
];
