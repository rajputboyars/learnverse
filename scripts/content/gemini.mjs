// Google Gemini course — beginner → intermediate.
// Covers: Gemini model family, free vs Advanced plans, Workspace integration, Gemini API.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Google Gemini',
  slug: 'gemini',
  description:
    'Google Gemini ka complete guide — Flash/Pro/Ultra models, free vs Advanced ($20/mo) plans, Google Workspace integration (Gmail/Docs/Drive), Deep Research, aur Gemini API se apps banana — English aur Hinglish mein.',
  icon: '✨',
  tags: ['gemini', 'google', 'ai', 'vertex-ai', 'google-workspace'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 37,
};

const fundamentals = [
  {
    title: 'Gemini Fundamentals',
    level: 'beginner',
    description: 'Google Gemini kya hai, model tiers, aur free vs Advanced plans.',
    concepts: [
      {
        title: 'What is Google Gemini',
        difficulty: 'easy',
        tags: ['intro', 'gemini', 'google-ai'],
        explanation: {
          english:
            'Google Gemini is Google\'s flagship AI assistant and model family, replacing the earlier Bard assistant. Launched in December 2023, Gemini is designed to be natively multimodal from the ground up — unlike models that learned text first and added vision later, Gemini was trained jointly on text, images, audio, video, and code simultaneously.\n\nGemini powers Google\'s consumer AI product (gemini.google.com), integrates with Google Workspace (Docs, Gmail, Drive, Slides, Meet), and is available to developers via the Gemini API through Google AI Studio and Vertex AI.\n\n**Why Gemini is significant:**\n- **Natively multimodal**: Can understand and reason across text, images, audio, and video in a single prompt\n- **Deep Google integration**: Powers Search (AI Overviews), Maps, Chrome, Android, Pixel, Workspace\n- **Long context**: Gemini 1.5 Pro and beyond support 1 million token context windows — the largest available\n- **Free generous tier**: Gemini Flash is available for free through Google AI Studio with generous rate limits for developers\n- **Google ecosystem**: If you already use Google Docs, Gmail, or Drive, Gemini integrates seamlessly\n\nGemini competes directly with ChatGPT (OpenAI) and Claude (Anthropic), and is especially strong in tasks that leverage Google\'s search and knowledge capabilities.',
          hinglish:
            'Google Gemini Google ka flagship AI assistant aur model family hai, jo pehle ke Bard assistant ki jagah liya hai. December 2023 mein launch hua, Gemini natively multimodal hai groundup se — unlike models jo pehle text seekha phir vision add kiya, Gemini ko text, images, audio, video, aur code simultaneously jointly train kiya gaya.\n\nGemini Google ke consumer AI product (gemini.google.com) ko power karta hai, Google Workspace (Docs, Gmail, Drive, Slides, Meet) mein integrate hota hai, aur developers ke liye Gemini API ke through Google AI Studio aur Vertex AI pe available hai.\n\n**Gemini kyon important hai:**\n- **Natively multimodal**: Ek hi prompt mein text, images, audio, aur video samajh aur reason kar sakta hai\n- **Deep Google integration**: Search (AI Overviews), Maps, Chrome, Android, Pixel, Workspace mein powers deta hai\n- **Long context**: Gemini 1.5 Pro aur uske baad 1 million token context windows support karte hain — sabse bada available\n- **Free generous tier**: Google AI Studio ke through Gemini Flash free hai developers ke liye generous rate limits ke saath\n- **Google ecosystem**: Agar tum pehle se Google Docs, Gmail, ya Drive use karte ho, Gemini seamlessly integrate hota hai',
        },
        dailyLifeExample:
          'Socho Google ek bahut bada library hai aur Gemini us library ka sabse intelligent librarian hai jo na sirf books (text) padhta hai, balki photos, videos aur audio bhi samajhta hai — aur Google ke tamam products mein uski access hai. ChatGPT alag building mein hai; Gemini directly Google ke sabse bade knowledge base ke saath juda hai.',
        codeExample:
          '// Accessing Gemini via Google AI JavaScript SDK\n// npm install @google/generative-ai\n\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\n\n// Use gemini-2.0-flash for fast, free-tier responses\nconst model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });\n\nconst result = await model.generateContent(\n  "Explain the difference between SQL and NoSQL databases in simple terms."\n);\nconsole.log(result.response.text());',
        keyPoints: [
          'Google\'s flagship AI replacing Bard — natively multimodal from the ground up',
          'Understands text, images, audio, and video in a single prompt',
          'Powers Google Search AI Overviews, Maps, Chrome, Android, Pixel, Workspace',
          'Gemini 1.5 Pro+ supports 1 million token context — the largest available',
          'Accessible via gemini.google.com, Google Workspace, and the Gemini API',
          'Competes with ChatGPT (OpenAI) and Claude (Anthropic)',
        ],
        quiz: [
          {
            question: 'What makes Gemini "natively multimodal" different from other AI models?',
            options: [
              'It only works with images, not text',
              'It was trained on text, images, audio, and video simultaneously from the start',
              'It uses multiple AI models chained together',
              'It requires separate plugins for each modality',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which product did Google Gemini replace?',
            options: ['Google Assistant', 'Google Bard', 'Google Duplex', 'Google Allo'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Gemini Plans: Free vs Advanced vs API',
        difficulty: 'easy',
        tags: ['plans', 'pricing', 'gemini-advanced', 'google-one'],
        explanation: {
          english:
            'Google Gemini is available in several tiers:\n\n**Free (Google Account):**\n- Access to Gemini 2.0 Flash at gemini.google.com\n- Basic text, image, and document understanding\n- Google One 15GB storage (standard Google account)\n- Limited Gemini in Google Workspace (basic Docs/Gmail suggestions)\n- Gemini mobile app (Android/iOS)\n- Standard usage limits\n\n**Gemini Advanced — Google One AI Premium ($20/month):**\n- Access to Google\'s most capable Gemini models (Ultra-class)\n- 1 million token context window\n- **Deep Research**: Gemini autonomously browses dozens of web pages, synthesises information, and produces multi-page research reports in minutes\n- **Full Workspace integration**: Gemini in Gmail (write, summarise email threads), Docs (write/rewrite content), Sheets (generate formulas, analyse data), Slides (create presentations), Meet (take notes, live summaries)\n- 2TB Google One storage (up from 15GB)\n- Priority access during high demand\n- Gemini in Google Photos (search/edit with natural language)\n- Gemini Live (real-time voice conversation)\n\n**Google Workspace Business Plans (separate from personal):**\n- Gemini for Workspace Business Starter: $12/user/month (includes basic AI features in Docs/Gmail)\n- Business Standard / Plus: More AI features, Meet summaries, Vids\n- Enterprise: Full Gemini integration, advanced security, data residency\n\n**Gemini API — for Developers:**\n- Free tier: Gemini 2.0 Flash, up to 15 requests/minute, for testing/development\n- Pay-as-you-go: $0.075 per 1M input tokens (Flash), $0.30 per 1M input tokens (Pro)\n- Available via Google AI Studio (free console) or Vertex AI (enterprise)',
          hinglish:
            'Google Gemini kaafi tiers mein available hai:\n\n**Free (Google Account):**\n- gemini.google.com pe Gemini 2.0 Flash access\n- Basic text, image, aur document understanding\n- Google One 15GB storage (standard Google account)\n- Limited Gemini in Google Workspace\n- Gemini mobile app (Android/iOS)\n\n**Gemini Advanced — Google One AI Premium ($20/month):**\n- Google ke sabse capable Gemini models (Ultra-class)\n- 1 million token context window\n- **Deep Research**: Gemini khud dozens of web pages browse karta hai, information synthesize karta hai, aur minutes mein multi-page research reports banata hai\n- **Full Workspace integration**: Gmail (emails likho, threads summarize karo), Docs (content write/rewrite karo), Sheets (formulas generate karo, data analyse karo), Slides (presentations banao), Meet (notes lo, live summaries)\n- 2TB Google One storage (15GB se badh ke)\n- High demand pe priority access\n- Gemini in Google Photos (natural language se search/edit)\n- Gemini Live (real-time voice conversation)\n\n**Google Workspace Business Plans:**\n- Business Starter: $12/user/month (basic AI features in Docs/Gmail)\n- Business Standard/Plus: Zyada AI features\n- Enterprise: Full Gemini integration, advanced security\n\n**Gemini API (Developers ke liye):**\n- Free tier: Gemini 2.0 Flash, 15 requests/minute, testing ke liye\n- Pay-as-you-go: $0.075 per 1M input tokens (Flash), $0.30 per 1M (Pro)\n- Google AI Studio (free console) ya Vertex AI (enterprise) ke through',
        },
        dailyLifeExample:
          'Google One AI Premium waise hai jaise ek premium newspaper subscription — free mein headlines milti hain (basic Gemini), par premium subscription mein detailed articles, analysis, aur archive tak access milta hai (Deep Research, Workspace integration, 1M context). Aur 2TB storage bonus mein — jaise subscription ke saath free locker.',
        codeExample:
          '// Plan comparison at a glance:\n//\n// Feature                    | Free  | Advanced | API Free | API Paid\n// ---------------------------|-------|----------|----------|----------\n// Model                      | Flash | Ultra    | Flash    | Flash/Pro\n// Context window             | 32K   | 1M       | 1M       | 1M\n// Deep Research              | ✗     | ✓        | ✗        | ✗\n// Gmail/Docs integration     | Basic | Full     | ✗        | ✗\n// Google One storage         | 15GB  | 2TB      | N/A      | N/A\n// Rate limit                 | Low   | High     | 15 RPM   | Per quota\n// Price                      | Free  | $20/mo   | Free     | Per token\n//\n// API Pricing (approx):\n// Gemini 2.0 Flash:  $0.075 / 1M input tokens\n// Gemini 1.5 Pro:    $1.25  / 1M input tokens (up to 128K)\n//                    $2.50  / 1M input tokens (>128K)',
        keyPoints: [
          'Free: Gemini Flash at gemini.google.com, basic features, 15GB storage',
          'Advanced ($20/mo via Google One): Most capable model, 1M context, Deep Research',
          'Advanced includes full Workspace integration: Gmail, Docs, Sheets, Slides, Meet',
          'Advanced gives 2TB Google One storage (huge bonus for most users)',
          'API free tier: 15 req/min on Flash — great for developers to start for free',
          'Workspace Business plans are separate for teams/companies',
        ],
        quiz: [
          {
            question: 'What is the context window size with Gemini Advanced?',
            options: ['32K tokens', '128K tokens', '1 million tokens', 'Unlimited'],
            correctIndex: 2,
          },
          {
            question: 'What additional benefit does Google One AI Premium give besides Gemini Advanced?',
            options: [
              '10 free DALL-E images per day',
              '2TB of Google One storage',
              'Free Pixel phone',
              'Unlimited Google Meet recording',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Gemini Model Tiers: Flash, Pro, Ultra',
        difficulty: 'medium',
        tags: ['gemini-flash', 'gemini-pro', 'models', 'comparison'],
        explanation: {
          english:
            'Google offers Gemini in multiple model tiers optimised for different use cases:\n\n**Gemini Flash (fastest, cheapest):**\n- Optimised for speed and cost-efficiency\n- Best for: high-volume tasks, real-time applications, chatbots, quick summaries, classification\n- Available on: Free tier, Gemini API free tier\n- Context: up to 1 million tokens\n- Pricing: ~$0.075 per 1M input tokens (very cheap)\n- Gemini 2.0 Flash is the current recommended free/cheap option\n\n**Gemini Pro (balanced):**\n- Balanced between capability and cost\n- Best for: complex reasoning, code generation, document analysis, multi-step tasks\n- Available on: Gemini API paid tier\n- Context: up to 1 million tokens (128K for some versions)\n- Pricing: ~$1.25–2.50 per 1M input tokens\n- Powers many Google Workspace features\n\n**Gemini Ultra (most capable):**\n- Google\'s top-tier model for the most demanding tasks\n- Best for: complex research, advanced coding, nuanced writing, multi-step reasoning\n- Available on: Gemini Advanced ($20/month plan)\n- Context: 1 million tokens\n- Powers Deep Research and full Workspace features\n- Not available as a standalone API option for developers (must use Advanced plan or Vertex AI enterprise)\n\n**Gemini Nano (on-device):**\n- Runs locally on Pixel phones and Android devices\n- Powers features like Smart Reply, Summarise in Recorder app, AI Wallpaper\n- No internet required — runs entirely on device\n- Not available via API\n\n**When to use which:**\n- High-volume apps → Flash (cheap, fast)\n- Quality coding/reasoning tasks → Pro\n- Consumer-facing research or heavy Workspace use → Advanced (Ultra)',
          hinglish:
            'Google different use cases ke liye multiple Gemini model tiers offer karta hai:\n\n**Gemini Flash (fastest, cheapest):**\n- Speed aur cost-efficiency ke liye optimized\n- Best for: high-volume tasks, real-time apps, chatbots, quick summaries, classification\n- Free tier aur Gemini API free tier pe available\n- Context: up to 1 million tokens\n- Pricing: ~$0.075 per 1M input tokens (bahut sasta)\n\n**Gemini Pro (balanced):**\n- Capability aur cost ke beech balance\n- Best for: complex reasoning, code generation, document analysis, multi-step tasks\n- Gemini API paid tier pe available\n- Pricing: ~$1.25–2.50 per 1M input tokens\n- Bahut saare Google Workspace features power karta hai\n\n**Gemini Ultra (most capable):**\n- Google ka top-tier model demanding tasks ke liye\n- Best for: complex research, advanced coding, nuanced writing, multi-step reasoning\n- Gemini Advanced ($20/month plan) pe available\n- Deep Research aur full Workspace features power karta hai\n\n**Gemini Nano (on-device):**\n- Pixel phones aur Android devices pe locally run karta hai\n- Smart Reply, Recorder app mein Summarise, AI Wallpaper power karta hai\n- Internet ki zarurat nahi — device pe hi run karta hai\n- API ke through available nahi\n\n**Kab kya use karo:**\n- High-volume apps → Flash (sasta, fast)\n- Quality coding/reasoning tasks → Pro\n- Consumer-facing research ya heavy Workspace use → Advanced (Ultra)',
        },
        dailyLifeExample:
          'Gemini models waise hain jaise auto, Uber, aur private car. Flash = auto rickshaw — sasta, fast, high volume ke liye perfect. Pro = Uber — better comfort, balanced price. Ultra = private car with driver — best experience, premium cost. Nano = apna cycle — bina internet, device pe hi kaam karta hai.',
        codeExample:
          '// Choosing the right Gemini model in your app\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\n\n// Flash: fast + cheap — for summaries, classification, simple Q&A\nconst flash = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });\n\n// Pro: for complex reasoning, code generation, detailed analysis\nconst pro = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });\n\n// Example: use Flash for quick categorisation\nasync function categoriseEmail(emailBody) {\n  const result = await flash.generateContent(\n    `Categorise this email as: urgent/normal/spam. Reply with only one word.\\n\\n${emailBody}`\n  );\n  return result.response.text().trim(); // "urgent"\n}\n\n// Use Pro for complex code review\nasync function reviewCode(code) {\n  const result = await pro.generateContent(\n    `Review this code for bugs, security issues, and performance problems:\\n\\n${code}`\n  );\n  return result.response.text();\n}',
        keyPoints: [
          'Flash: fastest/cheapest — use for high-volume, simple tasks ($0.075/1M tokens)',
          'Pro: balanced — complex reasoning, coding, detailed analysis ($1.25–2.50/1M tokens)',
          'Ultra: most powerful — available only via Gemini Advanced plan ($20/mo)',
          'Nano: on-device model for Pixel/Android — no internet needed, no API access',
          'All standard API models support up to 1 million token context window',
          'Start with Flash (free tier) for prototyping; upgrade to Pro for production quality',
        ],
        quiz: [
          {
            question: 'Which Gemini model is best for a high-volume email classification system that needs to be cheap?',
            options: ['Gemini Ultra', 'Gemini Pro', 'Gemini Flash', 'Gemini Nano'],
            correctIndex: 2,
          },
          {
            question: 'Which Gemini model runs locally on Android devices without an internet connection?',
            options: ['Gemini Flash', 'Gemini Pro', 'Gemini Ultra', 'Gemini Nano'],
            correctIndex: 3,
          },
        ],
      },
    ],
  },
];

const keyFeatures = [
  {
    title: 'Key Features of Gemini',
    level: 'intermediate',
    description: 'Deep Research, Google Workspace integration, aur multimodal capabilities.',
    concepts: [
      {
        title: 'Deep Research (Gemini Advanced Exclusive)',
        difficulty: 'medium',
        tags: ['deep-research', 'gemini-advanced', 'web-browsing'],
        explanation: {
          english:
            'Deep Research is one of Gemini Advanced\'s most impressive features. Instead of just answering a question with information it already knows, Gemini autonomously browses dozens of web pages, synthesises the information, cross-references sources, and produces a comprehensive, cited research report — typically 3–10 pages long — in just a few minutes.\n\n**How it works:**\n1. You provide a research topic or question\n2. Gemini creates a research plan (which you can edit)\n3. It autonomously browses relevant websites, articles, papers, and sources\n4. It synthesises the information across sources, identifies patterns and contradictions\n5. It produces a formatted report with citations and links\n\n**What Deep Research is great for:**\n- Competitive analysis (research competitors in a market)\n- Technology comparisons (which cloud provider should we choose?)\n- Learning a new technical domain quickly\n- Researching for blog posts, reports, or presentations\n- Investment/business due diligence\n- Academic literature surveys\n\n**Comparison with other tools:**\n- ChatGPT web browsing: Visits a few pages, more conversational\n- Perplexity AI: Similar concept but less depth\n- Gemini Deep Research: Visits 20–50+ sources, generates long-form report\n\n**Limitation:** Available only on Gemini Advanced ($20/month). Uses the 1M token context to hold all the research it collects before synthesising.',
          hinglish:
            'Deep Research Gemini Advanced ke sabse impressive features mein se ek hai. Sirf apni already-known information se answer dene ke bajaye, Gemini khud dozens of web pages browse karta hai, information synthesize karta hai, sources cross-reference karta hai, aur ek comprehensive, cited research report banata hai — typically 3–10 pages — sirf kuch minutes mein.\n\n**Kaise kaam karta hai:**\n1. Tum research topic ya question provide karte ho\n2. Gemini research plan banata hai (jo tum edit kar sakte ho)\n3. Wo khud relevant websites, articles, papers browse karta hai\n4. Sources ke across information synthesize karta hai, patterns aur contradictions identify karta hai\n5. Citations aur links ke saath formatted report produce karta hai\n\n**Deep Research kis cheez ke liye great hai:**\n- Competitive analysis (market mein competitors research karo)\n- Technology comparisons (kaun sa cloud provider choose karein?)\n- Naye technical domain mein quickly seekho\n- Blog posts, reports, presentations ke liye research\n- Investment/business due diligence\n- Academic literature surveys\n\n**Doosre tools se comparison:**\n- ChatGPT web browsing: Kuch pages visit karta hai, zyada conversational\n- Perplexity AI: Similar concept par kam depth\n- Gemini Deep Research: 20–50+ sources visit karta hai, long-form report generate karta hai\n\n**Limitation:** Sirf Gemini Advanced ($20/month) pe available hai.',
        },
        dailyLifeExample:
          'Deep Research waise hai jaise tum ek research assistant hire karo — wo library jaata hai, 40 books aur articles padhta hai, notes banata hai, aur ek detailed report likh ke deta hai. Tum ek line mein topic bolo, kuch minute baad complete research report ready. Normal ChatGPT ya Gemini se "Google karke 3 articles padhna" ke barabar hai, Deep Research "poori library search karke summarize karna" hai.',
        codeExample:
          '// Deep Research is a UI feature (not available in the Gemini API directly)\n// It is accessible at gemini.google.com with a Gemini Advanced subscription.\n//\n// Example prompt for Deep Research:\n//\n// "Research the current state of edge computing for IoT devices.\n//  Compare the top 3 platforms (AWS Greengrass, Azure IoT Edge, Google Cloud IoT).\n//  Include: architecture, pricing, strengths/weaknesses, and which industries\n//  are adopting each platform. Cite all sources."\n//\n// Gemini will:\n// 1. Create a research plan (editable)\n// 2. Browse 20-50 sources automatically\n// 3. Produce a 5-10 page cited report in ~3-5 minutes\n\n// For developers: you can approximate this with the Gemini API + Google Search\n// grounding (available in the paid API tier):\nconst result = await model.generateContent({\n  contents: [{ role: "user", parts: [{ text: "Research edge computing trends" }] }],\n  tools: [{ googleSearch: {} }],  // Enable Google Search grounding\n});',
        keyPoints: [
          'Gemini Advanced exclusive feature — requires $20/month plan',
          'Autonomously browses 20–50+ web pages to synthesise multi-page research reports',
          'You can edit the research plan before Gemini starts browsing',
          'Output is a formatted, cited report (3–10 pages) in ~3–5 minutes',
          'Best for: competitive research, tech comparisons, literature surveys',
          'Far deeper than ChatGPT browsing — visits more sources and goes longer',
        ],
        quiz: [
          {
            question: 'What does Gemini Deep Research do that regular web browsing in AI chatbots does not?',
            options: [
              'It saves results to Google Drive automatically',
              'It autonomously visits 20–50+ sources and synthesises a multi-page cited report',
              'It only uses Google Scholar academic sources',
              'It generates charts from the research data',
            ],
            correctIndex: 1,
          },
          {
            question: 'Deep Research is available on which Gemini plan?',
            options: ['Free (gemini.google.com)', 'Gemini API free tier', 'Gemini Advanced ($20/month)', 'All plans'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Gemini in Google Workspace',
        difficulty: 'medium',
        tags: ['workspace', 'gmail', 'docs', 'sheets', 'meet'],
        explanation: {
          english:
            'One of Gemini\'s biggest differentiators is its deep integration with Google Workspace. With Gemini Advanced or a Workspace Business plan, you get AI built directly into the apps you already use daily:\n\n**Gmail:**\n- Draft emails from bullet points or a brief description\n- Summarise long email threads ("What is this 50-email thread about?")\n- Smart Reply suggestions that sound like you\n- "Help me write" — generate full professional emails from a few words\n\n**Google Docs:**\n- "Help me write" — generate full documents from a prompt\n- Rewrite selected text to change tone (formal/casual/confident)\n- Summarise long documents\n- Create tables, lists, outlines from content\n- Proofread and improve writing\n\n**Google Sheets:**\n- Generate complex formulas from natural language ("Calculate the average of column B where column A is \'Revenue\'")\n- Analyse data and suggest insights\n- Create charts with a description\n- Auto-fill data patterns\n\n**Google Slides:**\n- Generate entire presentations from a topic\n- Add speaker notes automatically\n- Rewrite slide content for different audiences\n- Suggest design improvements\n\n**Google Meet:**\n- Real-time captions in multiple languages\n- Take notes and generate meeting summaries\n- Action item extraction from meetings\n- "Catch me up" — join late and get a summary of what was discussed\n\n**Access:**\n- Personal: Gemini Advanced ($20/month via Google One)\n- Business: Google Workspace Business Starter ($12/user/month) and above',
          hinglish:
            'Gemini ki sabse badi differentiator hai uski Google Workspace ke saath deep integration. Gemini Advanced ya Workspace Business plan ke saath, aapko AI directly un apps mein milta hai jo tum pehle se daily use karte ho:\n\n**Gmail:**\n- Bullet points ya brief description se emails draft karo\n- Long email threads summarize karo ("Ye 50-email thread kya baat kar raha hai?")\n- Smart Reply suggestions jo tumhari tarah sound kare\n- "Help me write" — kuch words se poori professional email generate karo\n\n**Google Docs:**\n- "Help me write" — prompt se poore documents generate karo\n- Selected text rewrite karo tone change karne ke liye (formal/casual/confident)\n- Long documents summarize karo\n- Content se tables, lists, outlines banao\n\n**Google Sheets:**\n- Natural language se complex formulas generate karo ("Column A mein \'Revenue\' ho wahan column B ka average nikalo")\n- Data analyse karo aur insights suggest karo\n- Charts description se banao\n\n**Google Slides:**\n- Topic se poori presentations generate karo\n- Speaker notes automatically add karo\n- Different audiences ke liye slide content rewrite karo\n\n**Google Meet:**\n- Multiple languages mein real-time captions\n- Notes lo aur meeting summaries generate karo\n- Action items extract karo\n- "Catch me up" — late join karo aur summary pao\n\n**Access:**\n- Personal: Gemini Advanced ($20/month)\n- Business: Google Workspace Business Starter ($12/user/month) aur upar',
        },
        dailyLifeExample:
          'Google Workspace mein Gemini waise hai jaise apne office ke har department mein ek AI assistant baith gaya ho — ek Gmail mein emails likhta hai, ek Docs mein content banata hai, ek Sheets mein formulas banata hai, aur ek Meet mein notes leta hai. Tum ek tool se doosre pe switch nahi karte — AI hamesha wahan hota hai jahan kaam ho raha hai.',
        codeExample:
          '// Gemini Workspace features are UI-based in Google apps.\n// For developers, you can replicate these with the Gemini API:\n\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\nconst model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });\n\n// Example: Email drafting helper\nasync function draftEmail(context) {\n  const prompt = `You are an email writing assistant.\n  Draft a professional email based on: "${context}"\n  Format: Subject line, then body. Keep it concise.`;\n  const result = await model.generateContent(prompt);\n  return result.response.text();\n}\n\n// Example: Google Sheets formula generator\nasync function generateFormula(description) {\n  const prompt = `Generate a Google Sheets formula for: "${description}"\n  Return only the formula, nothing else.`;\n  const result = await model.generateContent(prompt);\n  return result.response.text();\n}\n\n// Usage:\nconst email = await draftEmail("Politely follow up on invoice #1234 unpaid for 30 days");\nconst formula = await generateFormula("Sum column B where column A contains the word Revenue");',
        keyPoints: [
          'Workspace integration available with Gemini Advanced or Google Workspace Business plans',
          'Gmail: draft emails, summarise threads, smart replies',
          'Docs: write/rewrite content, summarise, create structured documents',
          'Sheets: generate complex formulas from natural language, data insights',
          'Slides: create full presentations, add speaker notes, rewrite for audience',
          'Meet: real-time captions, meeting summaries, action item extraction',
        ],
        quiz: [
          {
            question: 'What does "Catch me up" in Google Meet with Gemini do?',
            options: [
              'Speeds up playback of recorded meetings',
              'Summarises what was discussed before you joined late',
              'Translates the meeting to another language',
              'Generates a quiz from the meeting content',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which Google Workspace plan gives access to Gemini AI features for a team?',
            options: [
              'Free Google Account only',
              'Google One Basic',
              'Google Workspace Business Starter ($12/user/month) and above',
              'Gemini Advanced personal plan only',
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Multimodal Capabilities & Long Context',
        difficulty: 'medium',
        tags: ['multimodal', 'vision', 'audio', 'long-context', '1m-tokens'],
        explanation: {
          english:
            'Gemini\'s native multimodal training gives it unique capabilities that go beyond simple image understanding:\n\n**What Gemini can process in a single prompt:**\n- **Text**: Articles, code, documents, instructions\n- **Images**: Photos, diagrams, charts, screenshots, handwriting\n- **Audio**: Spoken speech, music, environmental sounds (identify, transcribe, analyse)\n- **Video**: Multiple frames across a video, events, actions, visual information over time\n- **Documents (PDF)**: Full PDF understanding including layout, tables, charts, and text\n- **Code**: Write, explain, debug, and review code across many languages\n\n**1 Million Token Context Window:**\nGemini 1.5 Pro and 2.0 support up to 1 million tokens in a single context — roughly 750,000 words, 1 hour of video, or 11 hours of audio. This enables:\n- Analysing entire codebases (paste all source files)\n- Processing long legal/technical documents without chunking\n- Reviewing a full book for themes, consistency, or errors\n- Answering questions about an hour-long video\n- Large-scale cross-document analysis\n\n**Practical developer examples:**\n- Upload a 2-hour meeting video: "List all decisions made and who is responsible"\n- Paste an entire 10,000-line codebase: "Where are the potential security vulnerabilities?"\n- Upload 50 PDF pages of API docs: "How do I implement authentication?"\n- Send a diagram image + code: "Does this implementation match the architecture diagram?"\n\n**Limitations:**\n- Gemini Ultra with 1M context is only available via Gemini Advanced or Vertex AI\n- Very large inputs take longer and cost more via the API\n- Audio/video support varies by API tier',
          hinglish:
            'Gemini ki native multimodal training unique capabilities deti hai:\n\n**Ek hi prompt mein Gemini kya process kar sakta hai:**\n- **Text**: Articles, code, documents, instructions\n- **Images**: Photos, diagrams, charts, screenshots, handwriting\n- **Audio**: Spoken speech, music, environmental sounds (identify, transcribe, analyse)\n- **Video**: Video ke across multiple frames, events, actions (timestamp ke saath)\n- **Documents (PDF)**: Layout, tables, charts, aur text sab samajhna\n- **Code**: Bahut saari languages mein likho, explain karo, debug karo, review karo\n\n**1 Million Token Context Window:**\nGemini 1.5 Pro aur 2.0 ek hi context mein up to 1 million tokens support karte hain — roughly 750,000 words, 1 ghante ka video, ya 11 ghante ka audio. Isse possible hota hai:\n- Poore codebases analyse karna (saari source files paste karo)\n- Bina chunking ke long legal/technical documents process karna\n- Poori book review karna themes, consistency, ya errors ke liye\n- Ek ghante ke video ke baare mein questions poochna\n\n**Practical developer examples:**\n- 2-ghante ki meeting video upload karo: "Saare decisions list karo aur kaun responsible hai"\n- Poora 10,000-line codebase paste karo: "Security vulnerabilities kahan hain?"\n- 50 PDF pages of API docs upload karo: "Authentication kaise implement karein?"\n- Diagram image + code bhejo: "Kya ye implementation architecture diagram se match karta hai?"\n\n**Limitations:**\n- 1M context ke saath Gemini Ultra sirf Gemini Advanced ya Vertex AI pe available hai\n- Bahut bade inputs API mein zyada time aur cost lete hain',
        },
        dailyLifeExample:
          'Gemini ka 1M token context waise hai jaise ek expert consultant jo ek saath poori company ki documentation padh sakta hai — sab PDFs, sab code files, sab meetings — aur phir kisi bhi question ka holistic answer de sakta hai. Doosre tools ek samay ek chapter padhte hain; Gemini poori library ek saath dekh sakta hai.',
        codeExample:
          '// Multimodal example: Send image + text in one request\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\nconst fs = require("fs");\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\nconst model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });\n\n// Image + text (vision)\nconst imageData = fs.readFileSync("architecture_diagram.png");\nconst result = await model.generateContent([\n  { inlineData: { data: imageData.toString("base64"), mimeType: "image/png" } },\n  "Identify potential bottlenecks in this architecture diagram and suggest improvements.",\n]);\nconsole.log(result.response.text());\n\n// PDF analysis (long context)\nconst pdfData = fs.readFileSync("api_docs.pdf");\nconst pdfResult = await model.generateContent([\n  { inlineData: { data: pdfData.toString("base64"), mimeType: "application/pdf" } },\n  "How do I implement OAuth 2.0 authentication using this API? Show me example code.",\n]);\nconsole.log(pdfResult.response.text());',
        keyPoints: [
          'Native multimodal: processes text, images, audio, video, PDFs in one prompt',
          '1M token context = 750K words / 1 hour video / entire codebase in one call',
          'Can analyse entire codebases, long documents, or hour-long videos',
          'Use for architecture diagram review, meeting transcription, multi-doc analysis',
          '1M context only available on Gemini Advanced or Vertex AI paid tier via API',
          'API supports inline data (base64) or file uploads for images/PDFs/audio',
        ],
        quiz: [
          {
            question: 'Approximately how many words fit in Gemini\'s 1 million token context window?',
            options: ['100,000', '350,000', '750,000', '5 million'],
            correctIndex: 2,
          },
          {
            question: 'What can you do with Gemini\'s multimodal capabilities that you could NOT do with text-only AI?',
            options: [
              'Ask it to write code',
              'Send a video and ask what decisions were made in the meeting',
              'Have a multi-turn conversation',
              'Generate JSON structured output',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const developerIntegration = [
  {
    title: 'Developer Integration',
    level: 'intermediate',
    description: 'Google AI Studio, Gemini API, aur apps mein integrate karna.',
    concepts: [
      {
        title: 'Google AI Studio & Gemini API Setup',
        difficulty: 'medium',
        tags: ['google-ai-studio', 'api', 'setup', 'developer'],
        explanation: {
          english:
            'Google AI Studio (aistudio.google.com) is a free, browser-based development environment for experimenting with and prototyping Gemini-powered applications. It\'s the starting point for all Gemini API development.\n\n**What Google AI Studio provides:**\n- **Prompt testing**: Test prompts with different Gemini models in a visual interface\n- **API key generation**: Get a free API key (no billing required for free tier)\n- **Model playground**: Try different models and compare responses side by side\n- **Tuning**: Fine-tune Gemini models on your own data (paid)\n- **Code export**: After testing a prompt, get ready-to-use code in Python, JavaScript, Android, Swift, cURL\n- **System instruction testing**: Configure and test system prompts before building\n- **Streaming demos**: See how streaming responses work in real time\n\n**Free tier limits (no credit card required):**\n- Gemini 2.0 Flash: 15 requests/minute, 1,500 requests/day, 1M tokens/minute\n- No charge for development and testing\n- Only enable billing when you need higher limits or production scale\n\n**Getting started (3 steps):**\n1. Go to aistudio.google.com\n2. Sign in with your Google account\n3. Click "Get API key" — free, no credit card needed\n4. Install SDK: `npm install @google/generative-ai`\n5. Use the key in your code via `GEMINI_API_KEY` environment variable\n\n**When to upgrade to Vertex AI:**\n- Vertex AI is Google Cloud\'s enterprise Gemini offering\n- Better for production apps needing SLAs, VPC networking, compliance\n- Integrates with Google Cloud services (BigQuery, Cloud Storage, etc.)\n- More expensive than direct Gemini API but better for enterprise needs',
          hinglish:
            'Google AI Studio (aistudio.google.com) ek free, browser-based development environment hai Gemini-powered applications experiment aur prototype karne ke liye. Ye sabhi Gemini API development ka starting point hai.\n\n**Google AI Studio kya provide karta hai:**\n- **Prompt testing**: Visual interface mein different Gemini models ke saath prompts test karo\n- **API key generation**: Free API key lo (free tier ke liye billing required nahi)\n- **Model playground**: Different models try karo aur responses side by side compare karo\n- **Tuning**: Apne data pe Gemini models fine-tune karo (paid)\n- **Code export**: Prompt test karne ke baad Python, JavaScript, Android, Swift, cURL mein ready-to-use code pao\n- **System instruction testing**: Build karne se pehle system prompts configure aur test karo\n\n**Free tier limits (credit card required nahi):**\n- Gemini 2.0 Flash: 15 requests/minute, 1,500 requests/day, 1M tokens/minute\n- Development aur testing ke liye koi charge nahi\n- Billing tab enable karo jab higher limits ya production scale chahiye\n\n**Getting started (3 steps):**\n1. aistudio.google.com pe jao\n2. Google account se sign in karo\n3. "Get API key" pe click karo — free, credit card nahi chahiye\n4. SDK install karo: `npm install @google/generative-ai`\n5. `GEMINI_API_KEY` environment variable mein key use karo\n\n**Vertex AI pe kab upgrade karein:**\n- Vertex AI Google Cloud ka enterprise Gemini offering hai\n- Production apps ke liye better jo SLAs, VPC networking, compliance chahte hain\n- Google Cloud services ke saath integrate hota hai (BigQuery, Cloud Storage)\n- Direct Gemini API se mehnga par enterprise ke liye better',
        },
        dailyLifeExample:
          'Google AI Studio waise hai jaise IKEA showroom — pehle wahan jaake furniture try karo (prompts test karo), design select karo (model choose karo), phir ghar le jaao (code export karo aur apni app mein use karo). Seedha online order karna (Vertex AI) enterprise ke liye hai jo bulk mein chahiye.',
        codeExample:
          '// Complete Gemini API setup in Node.js\n// Step 1: npm install @google/generative-ai\n// Step 2: Get API key from aistudio.google.com\n// Step 3: Set GEMINI_API_KEY in .env\n\nrequire("dotenv").config();\nconst { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\n\nconst model = genAI.getGenerativeModel({\n  model: "gemini-2.0-flash",\n  systemInstruction: "You are a helpful coding assistant specialising in JavaScript and Node.js.",\n  safetySettings: [\n    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },\n  ],\n  generationConfig: {\n    temperature: 0.7,       // 0 = deterministic, 1 = creative\n    maxOutputTokens: 2048,  // Limit response length\n    topP: 0.95,\n  },\n});\n\n// Simple generation\nconst result = await model.generateContent("Explain async/await in JavaScript with an example.");\nconsole.log(result.response.text());\n\n// Multi-turn chat\nconst chat = model.startChat();\nconst reply1 = await chat.sendMessage("What is a Promise?");\nconsole.log(reply1.response.text());\nconst reply2 = await chat.sendMessage("How is that different from async/await?");\nconsole.log(reply2.response.text());',
        keyPoints: [
          'Google AI Studio (aistudio.google.com) is free — no credit card to start',
          'Get a free API key, 15 req/min, 1,500 req/day on Gemini Flash',
          'Export working code in Python/JavaScript/Android/Swift from the playground',
          'Vertex AI is the enterprise path: SLAs, VPC, Google Cloud integration',
          'npm install @google/generative-ai; set GEMINI_API_KEY env variable',
          'Use temperature, maxOutputTokens, topP to control response style',
        ],
        quiz: [
          {
            question: 'Do you need a credit card to get a Gemini API key from Google AI Studio?',
            options: [
              'Yes, always required',
              'No — free tier API key with no billing required',
              'Only for Flash model',
              'Yes, but only $1 is charged to verify',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the main advantage of using Vertex AI over the direct Gemini API?',
            options: [
              'Lower cost per token',
              'Access to more models than the standard API',
              'Enterprise features: SLAs, VPC networking, Google Cloud integration, compliance',
              'Higher free tier limits',
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
];

const dailyProductivity = [
  {
    title: 'Daily Productivity with Gemini',
    level: 'intermediate',
    description: 'Google Workspace daily workflow, NotebookLM deep research, aur Gemini CLI aur AI Studio.',
    concepts: [
      {
        title: 'Gemini in Google Workspace Daily Workflow',
        difficulty: 'medium',
        tags: ['workspace', 'gmail', 'docs', 'sheets', 'meet', 'productivity'],
        explanation: {
          english:
            'Gemini\'s tightest value is felt when you stop treating it as a separate tool and start using it inside the apps you already live in every day. Here is what a practical daily workflow looks like for each Workspace app:\n\n**Gmail — Email that sounds like you, written in seconds:**\n- Prompt: "Help me write a professional reply to this email maintaining a firm but polite tone."\n- Summarise a 40-email thread with one click — "What is this thread about and what is the decision?"\n- Smart replies that match your voice, not a generic template\n\n**Google Docs — Turn rough notes into polished content:**\n- Prompt: "Summarise this 20-page report into 5 bullet points for an executive."\n- "Rewrite this paragraph in a more confident, direct tone."\n- "Create a table comparing the three options mentioned in this doc."\n- "Add a conclusion section based on the points discussed above."\n\n**Google Sheets — No more Googling formula syntax:**\n- Prompt: "Create a formula that calculates the 30-day rolling average of column B."\n- "Write a formula that flags any row where revenue dropped more than 10% vs last month."\n- "Analyse this sales data and suggest 3 insights."\n- "Auto-fill the category column based on patterns in the product names."\n\n**Google Meet — Never miss an action item again:**\n- Gemini takes automatic live notes as the meeting happens\n- After the meeting: action items list, decisions summary, who said what\n- "Catch me up" if you join late — get a 2-line summary of what was discussed\n- Translated captions in real time for multilingual teams',
          hinglish:
            'Gemini ki sabse zyada value tab feel hoti hai jab tum ise alag tool ki tarah treat karna band karo aur seedha un apps mein use karo jo tum pehle se daily use karte ho. Har Workspace app ke liye practical daily workflow kuch aisa dikhta hai:\n\n**Gmail — Email jo tumhari tarah sound kare, seconds mein likhI:**\n- Prompt: "Help me write a professional reply to this email maintaining a firm but polite tone." (Mujhe is email ka professional reply likhne mein help karo, firm par polite tone mein.)\n- 40-email thread ek click mein summarize karo — "Ye thread kya baat kar raha hai aur decision kya hai?"\n- Smart replies jo tumhari voice se match kare, generic template nahi\n- Real example: Boss ka email aaya hai project delay ke baare mein — Gemini se bolo firm but respectful reply chahiye\n\n**Google Docs — Rough notes ko polished content mein badlo:**\n- Prompt: "Summarise this 20-page report into 5 bullet points for an executive." (Is 20-page report ko executive ke liye 5 bullet points mein summarize karo.)\n- "Is paragraph ko zyada confident, direct tone mein rewrite karo."\n- "Is doc mein mention teenon options ki comparison table banao."\n- Real example: Client ke liye ek proposal draft karna ho — Gemini bullets deke poori doc generate kar sakta hai\n\n**Google Sheets — Ab formula ka syntax Google karna nahi padega:**\n- Prompt: "Create a formula that calculates the 30-day rolling average of column B." (Column B ka 30-day rolling average calculate karne wala formula banao.)\n- "Ek formula likho jo flag kare jab revenue last month se 10% se zyada gir jaye."\n- "Is sales data ko analyse karo aur 3 insights suggest karo."\n- Real example: Monthly sales report mein average nikalna ho — ek sentence mein formula ready\n\n**Google Meet — Koi action item miss nahi hogi:**\n- Gemini meeting ke dauran automatic live notes leta hai\n- Meeting ke baad: action items list, decisions summary, kisne kya kaha\n- Late join karo toh "Catch me up" — 2-line summary mil jaati hai\n- Multilingual teams ke liye real-time translated captions',
        },
        dailyLifeExample:
          'Soch lo tumhara ek busy weekday — subah 8 emails hain, ek 20-page report padhni hai, ek meeting mein join karna hai aur ek sales spreadsheet update karna hai. Gemini ke bina: 3 ghante. Gemini ke saath: pehle emails Gemini se handle karo (15 min), report summarize karwao (5 min), meeting mein Gemini notes leta hai (tum sirf participate karo), aur spreadsheet mein formula Gemini se generate karo (2 min). Same kaam, ek ghante mein. Ye "AI use karna" nahi hai — ye pehle se use ho rahe tools mein speed up hai.',
        codeExample:
          '// These are UI prompts for Google Workspace (no code needed).\n// For developers replicating these in your own app via Gemini API:\n\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\nconst model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });\n\n// Gmail: firm but polite reply\nasync function draftFirmReply(originalEmail) {\n  const result = await model.generateContent(\n    \'Draft a firm but polite professional reply to this email. \'\n    + \'Keep it under 100 words.\\n\\n\' + originalEmail\n  );\n  return result.response.text();\n}\n\n// Sheets: formula generation\nasync function generateSheetsFormula(description) {\n  const result = await model.generateContent(\n    \'Generate a Google Sheets formula for: \' + description\n    + \'\\nReturn only the formula text, no explanation.\'\n  );\n  return result.response.text().trim();\n}\n\n// Docs: executive summary\nasync function executiveSummary(reportText) {\n  const result = await model.generateContent(\n    \'Summarise the following report into exactly 5 bullet points for an executive audience:\'\n    + \'\\n\\n\' + reportText\n  );\n  return result.response.text();\n}\n\n// Usage:\nconst formula = await generateSheetsFormula(\n  "30-day rolling average of column B starting from row 2"\n);\nconsole.log(formula); // =AVERAGE(B2:B31)',
        keyPoints: [
          'Gmail: draft firm/polite replies, summarise long threads, smart replies that match your tone',
          'Docs: summarise long reports to bullet points, rewrite paragraphs, create comparison tables',
          'Sheets: generate complex formulas from natural language — no more formula Googling',
          'Meet: auto live notes, post-meeting action items, "Catch me up" for late joiners',
          'The key shift: AI is inside your existing tools — no copy-paste to a separate chat',
          'Requires Gemini Advanced ($20/month) or Google Workspace Business plan for full features',
        ],
        quiz: [
          {
            question: 'What does the "Catch me up" feature in Google Meet with Gemini do?',
            options: [
              'Records the entire meeting for download',
              'Gives you a summary of the meeting discussion when you join late',
              'Speeds up the audio playback',
              'Translates the meeting into another language',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which Google Workspace app can Gemini help you with formula generation?',
            options: ['Google Docs', 'Google Slides', 'Google Sheets', 'Google Forms'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'Name two ways Gemini improves daily productivity in Google Workspace.',
            answer: {
              english:
                '(1) Gmail: Gemini can draft replies in your tone, summarise long threads, and generate smart replies — saving time on routine email. (2) Google Sheets: You can describe a formula in plain English and Gemini generates it — eliminating the need to look up complex formula syntax like AVERAGEIF, ARRAYFORMULA, or rolling averages.',
              hinglish:
                '(1) Gmail: Gemini tumhari tone mein replies draft kar sakta hai, long threads summarize kar sakta hai, aur smart replies generate kar sakta hai — routine email pe time bachata hai. (2) Google Sheets: Tum plain English mein formula describe karo aur Gemini generate kar dega — complex formula syntax jaise AVERAGEIF, ARRAYFORMULA, ya rolling averages Google karne ki zarurat nahi.',
            },
          },
        ],
      },
      {
        title: 'NotebookLM for Deep Research',
        difficulty: 'medium',
        tags: ['notebooklm', 'research', 'pdf', 'sources', 'gemini'],
        explanation: {
          english:
            'NotebookLM (notebooklm.google.com) is a Google product powered by Gemini that lets you upload your own documents — PDFs, Google Docs, web URLs, YouTube videos, audio files — as "sources" and then have an intelligent conversation grounded entirely in those sources. It does not hallucinate facts from its training data; it only answers from what you uploaded.\n\n**How NotebookLM works:**\n1. Create a Notebook\n2. Upload sources: PDFs, Google Docs, URLs, YouTube links, audio files, text pastes\n3. NotebookLM indexes all sources and creates a shared knowledge base\n4. Chat with your sources: ask questions, compare content across documents\n5. Generate outputs: study guides, FAQs, briefing docs, timelines, outlines\n6. Audio Overview: generates a two-host podcast-style conversation summarising your sources in ~5 minutes\n\n**Key use cases:**\n- **Academic research**: Upload 10 research papers on a topic → "Compare the methodologies across these studies"\n- **Book study**: Upload a textbook → "Explain chapter 7 in simple terms" → "Create a quiz on chapters 1–5"\n- **Due diligence**: Upload contracts, annual reports, whitepapers → ask specific questions with source citations\n- **Content creation**: Upload your own notes → "Create a blog outline from these ideas"\n- **Legal/technical docs**: Upload product docs or legal agreements → "What are the key obligations in section 4?"\n\n**Workflow:**\n1. Upload sources → 2. Ask questions (with source citations shown) → 3. Generate outline → 4. Export notes/findings → 5. Generate Audio Overview for listening\n\n**NotebookLM vs Deep Research:**\n- Deep Research: Gemini browses the *web* autonomously\n- NotebookLM: You bring *your own sources*; Gemini works only within them',
          hinglish:
            'NotebookLM (notebooklm.google.com) ek Google product hai jo Gemini se powered hai. Isme tum apne khud ke documents — PDFs, Google Docs, web URLs, YouTube videos, audio files — "sources" ke roop mein upload kar sakte ho aur phir un hi sources ke andar intelligent conversation kar sakte ho. Ye training data se hallucinate nahi karta; sirf jo tumne upload kiya hai uspe answer deta hai.\n\n**NotebookLM kaise kaam karta hai:**\n1. Notebook create karo\n2. Sources upload karo: PDFs, Google Docs, URLs, YouTube links, audio files, text pastes\n3. NotebookLM saare sources index karta hai aur shared knowledge base banata hai\n4. Sources ke saath chat karo: questions poochho, documents ke across content compare karo\n5. Outputs generate karo: study guides, FAQs, briefing docs, timelines, outlines\n6. Audio Overview: tumhare sources ka ~5 minute ka two-host podcast-style conversation generate karta hai\n\n**Key use cases:**\n- **Academic research**: Ek topic ke 10 research papers upload karo → "In studies mein methodologies compare karo"\n- **Book study**: Textbook upload karo → "Chapter 7 simple terms mein explain karo" → "Chapters 1–5 pe quiz banao"\n- **Due diligence**: Contracts, annual reports, whitepapers upload karo → source citations ke saath specific questions poochho\n- **Content creation**: Apne khud ke notes upload karo → "In ideas se blog outline banao"\n- **Legal/technical docs**: Product docs ya legal agreements upload karo → "Section 4 mein key obligations kya hain?"\n\n**Workflow:**\n1. Sources upload karo → 2. Questions poochho (source citations ke saath) → 3. Outline generate karo → 4. Notes/findings export karo → 5. Sunne ke liye Audio Overview generate karo\n\n**NotebookLM vs Deep Research:**\n- Deep Research: Gemini khud *web* browse karta hai\n- NotebookLM: Tum *apne sources* laate ho; Gemini sirf unke andar kaam karta hai',
        },
        dailyLifeExample:
          'Imagine karo tum ek exam ke liye padhne ki koshish kar rahe ho — 8 different PDFs hain, 3 YouTube lecture videos hain, aur tumhare apne notes hain. Normal approach: har ek separately padhna, mentally compare karna. NotebookLM approach: sab kuch ek Notebook mein upload karo, phir poochho "In saare sources ke andar topic X ke baare mein main points kya hain?", "Source 3 aur Source 7 mein kya differences hain?", "Mujhe yahan se revision ke liye study guide banao." Aur end mein — Audio Overview se 10 minutes ki podcast bano jo dono tumhare notes aur papers discuss kare, gym jaate hue suno.',
        codeExample:
          '// NotebookLM is a UI product at notebooklm.google.com (no direct API).\n// For developers: replicate the "chat with documents" pattern via Gemini API.\n\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\nconst fs = require("fs");\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\n\n// Use gemini-1.5-pro for large document analysis (1M token context)\nconst model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });\n\nasync function chatWithDocuments(pdfPaths, question) {\n  const parts = [];\n\n  // Load each PDF as inline data\n  for (const pdfPath of pdfPaths) {\n    const data = fs.readFileSync(pdfPath);\n    parts.push({\n      inlineData: {\n        data: data.toString("base64"),\n        mimeType: "application/pdf",\n      },\n    });\n  }\n\n  // Add the user question\n  parts.push({ text: \'Answer only from the documents provided. \' + question });\n\n  const result = await model.generateContent(parts);\n  return result.response.text();\n}\n\n// Example: compare methodologies across 3 research papers\nconst answer = await chatWithDocuments(\n  ["paper1.pdf", "paper2.pdf", "paper3.pdf"],\n  "Compare the research methodologies used across these three papers."\n);\nconsole.log(answer);',
        keyPoints: [
          'NotebookLM lets you upload your own sources (PDFs, Docs, URLs, YouTube) and chat with them',
          'Answers are grounded only in your sources — no hallucination from training data',
          'Key outputs: study guides, FAQs, briefing docs, timelines, Audio Overview (podcast)',
          'Audio Overview creates a 5-min two-host podcast discussion from your sources',
          'Distinct from Deep Research: you supply the sources vs Gemini browsing the web',
          'Free at notebooklm.google.com with a Google account',
        ],
        quiz: [
          {
            question: 'What makes NotebookLM different from asking Gemini a general question?',
            options: [
              'NotebookLM uses a more powerful model',
              'NotebookLM answers only from the sources you upload, not from general training data',
              'NotebookLM can only handle text files, not PDFs',
              'NotebookLM requires Gemini Advanced',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the "Audio Overview" feature in NotebookLM?',
            options: [
              'A voice interface for entering prompts',
              'A podcast-style audio conversation between two AI hosts summarising your sources',
              'A feature that reads your documents aloud',
              'A tool to transcribe audio files you upload',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is NotebookLM and how does it differ from using Gemini directly?',
            answer: {
              english:
                'NotebookLM is a Google product powered by Gemini that lets you upload your own documents as sources and chat with them. The key difference: NotebookLM only answers from the sources you provide — it will not use its general training data — making it reliable for document-specific research with source citations. Gemini at gemini.google.com answers from its general training knowledge. NotebookLM is ideal for analysing a set of PDFs, comparing research papers, or studying a textbook without hallucinated facts.',
              hinglish:
                'NotebookLM ek Google product hai jo Gemini se powered hai, jisme tum apne documents sources ke roop mein upload karte ho aur unke saath chat karte ho. Key difference: NotebookLM sirf tumhare provide kiye sources se answer deta hai — general training data use nahi karta — jo ise document-specific research ke liye source citations ke saath reliable banata hai. gemini.google.com pe Gemini apni general training knowledge se answer deta hai. NotebookLM PDFs ka set analyse karne, research papers compare karne, ya hallucinated facts ke bina textbook study karne ke liye ideal hai.',
            },
          },
        ],
      },
      {
        title: 'Gemini CLI & Google AI Studio',
        difficulty: 'medium',
        tags: ['gemini-cli', 'ai-studio', 'api-key', 'developer', 'terminal'],
        explanation: {
          english:
            'Google AI Studio and the Gemini CLI are the two main developer entry points into Gemini for anyone who wants to go beyond the chat UI.\n\n**Google AI Studio (aistudio.google.com) — Free Playground:**\n- Test any prompt with any Gemini model in a visual UI — no code required\n- Compare model outputs side by side\n- Configure and test system instructions (system prompts) before writing any code\n- Tune generation parameters: temperature, top-P, max output tokens\n- Test multimodal inputs: upload images, PDFs, audio directly in the UI\n- Get your **free API key** — no credit card, works immediately\n- Export any prompt as ready-to-use code: Python, JavaScript, Android, Swift, cURL\n- Free tier: 15 req/min, 1,500 req/day on Gemini 2.0 Flash — enough to build and test\n\n**Gemini CLI (Terminal):**\n- Google\'s official open-source AI agent for your terminal: `npm install -g @google/gemini-cli`\n- After install, run `gemini` in any directory — it reads your codebase context\n- Use for: asking code questions, generating files, running agentic tasks in your project\n- Supports multi-turn conversation, file references (`@filename`), and shell commands\n- Configured with your AI Studio API key\n\n**Workflow from Zero to First API Call:**\n1. Go to aistudio.google.com → Get API key (free)\n2. `npm install @google/generative-ai` in your project\n3. Add `GEMINI_API_KEY=your_key` to `.env`\n4. Copy the exported JS code from AI Studio as a starting point\n5. Call `model.generateContent(prompt)` — first response in under 5 minutes total\n\n**AI Studio vs Vertex AI:**\n- AI Studio: fast, free, no infrastructure, perfect for prototyping\n- Vertex AI: production, SLAs, Google Cloud integration, enterprise security',
          hinglish:
            'Google AI Studio aur Gemini CLI developer ke liye do main entry points hain Gemini mein, jo chat UI se aage jaana chahte hain.\n\n**Google AI Studio (aistudio.google.com) — Free Playground:**\n- Visual UI mein kisi bhi Gemini model ke saath koi bhi prompt test karo — code ki zarurat nahi\n- Model outputs side by side compare karo\n- System instructions (system prompts) configure aur test karo koi bhi code likhne se pehle\n- Generation parameters tune karo: temperature, top-P, max output tokens\n- Multimodal inputs test karo: UI mein images, PDFs, audio seedha upload karo\n- **Free API key** pao — credit card nahi chahiye, immediately kaam karta hai\n- Kisi bhi prompt ko ready-to-use code ke roop mein export karo: Python, JavaScript, Android, Swift, cURL\n- Free tier: 15 req/min, 1,500 req/day on Gemini 2.0 Flash — build aur test karne ke liye kaafi\n\n**Gemini CLI (Terminal):**\n- Terminal ke liye Google ka official open-source AI agent: `npm install -g @google/gemini-cli`\n- Install ke baad, kisi bhi directory mein `gemini` run karo — ye tumhara codebase context padhta hai\n- Use for: code questions poochho, files generate karo, project mein agentic tasks run karo\n- Multi-turn conversation, file references (`@filename`), aur shell commands support karta hai\n- Tumhare AI Studio API key se configure hota hai\n\n**Zero se First API Call tak Workflow:**\n1. aistudio.google.com pe jao → API key lo (free)\n2. Project mein `npm install @google/generative-ai`\n3. `.env` mein `GEMINI_API_KEY=your_key` add karo\n4. AI Studio se exported JS code starting point ke roop mein copy karo\n5. `model.generateContent(prompt)` call karo — total 5 minute se kam mein pehla response\n\n**AI Studio vs Vertex AI:**\n- AI Studio: fast, free, koi infrastructure nahi, prototyping ke liye perfect\n- Vertex AI: production, SLAs, Google Cloud integration, enterprise security',
        },
        dailyLifeExample:
          'Google AI Studio waise hai jaise ek fully equipped test kitchen — tum wahan koi bhi recipe (prompt) try kar sakte ho, ingredients (parameters) adjust kar sakte ho, aur ek baar dish perfect ho jaye toh printed recipe (exported code) ghar le jao apni app mein use karne ke liye. Gemini CLI waise hai jaise wo hi chef seedhe tumhare kitchen (terminal) mein aa gaya — ab tum seedha apne codebase ke andar AI se baat kar sakte ho without browser khole.',
        codeExample:
          '// Complete setup: AI Studio API key to first working call\n// Step 1: Get free API key at aistudio.google.com (no credit card)\n// Step 2: npm install @google/generative-ai\n// Step 3: Create .env with GEMINI_API_KEY=your_api_key_here\n\nrequire("dotenv").config();\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\n\nconst model = genAI.getGenerativeModel({\n  model: "gemini-2.0-flash",           // Free tier model\n  systemInstruction:                    // Equivalent of a system prompt\n    "You are a concise technical assistant. Answer in plain English, no jargon.",\n  generationConfig: {\n    temperature: 0.5,                   // 0 = factual, 1 = creative\n    maxOutputTokens: 1024,\n  },\n});\n\nasync function ask(question) {\n  const result = await model.generateContent(question);\n  return result.response.text();\n}\n\n// First call\nask("What is the difference between REST and GraphQL?").then(console.log);\n\n// Gemini CLI setup (separate from SDK):\n// npm install -g @google/gemini-cli\n// gemini   (then set your API key when prompted)\n// In terminal: gemini "Explain the bug in @server.js"',
        keyPoints: [
          'AI Studio: free playground at aistudio.google.com — test prompts, compare models, get API key',
          'Free API key from AI Studio — no credit card, 15 req/min on Flash',
          'Export any tested prompt as Python/JS/Android/Swift code from AI Studio',
          'Gemini CLI: npm install -g @google/gemini-cli — AI agent in your terminal, reads codebase',
          'Path from zero to first API call: AI Studio key → npm install → .env → generateContent()',
          'AI Studio for prototyping; Vertex AI for enterprise production deployments',
        ],
        quiz: [
          {
            question: 'What is the fastest way to test a Gemini prompt without writing any code?',
            options: [
              'Install the Gemini CLI',
              'Use Google AI Studio at aistudio.google.com',
              'Sign up for Vertex AI',
              'Use Gemini Advanced on gemini.google.com',
            ],
            correctIndex: 1,
          },
          {
            question: 'How do you get a free Gemini API key?',
            options: [
              'Sign up for Google Cloud and add billing',
              'Buy a Google One AI Premium plan',
              'Visit aistudio.google.com, sign in, and click "Get API key"',
              'Request it from Google support',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the role of Google AI Studio in Gemini development?',
            answer: {
              english:
                'Google AI Studio is a free, browser-based playground for Gemini. It lets developers test prompts visually, compare models, configure system instructions, tune generation parameters, and export working code in Python/JavaScript/Swift/cURL — all without writing a line of code first. It is also where developers generate their free API key (no credit card required, 15 req/min on Flash). It is the recommended starting point before moving to Vertex AI for production.',
              hinglish:
                'Google AI Studio Gemini ke liye ek free, browser-based playground hai. Ye developers ko visually prompts test karne, models compare karne, system instructions configure karne, generation parameters tune karne, aur Python/JavaScript/Swift/cURL mein working code export karne ki suvidha deta hai — sab kuch bina pehle ek line code likhe. Ye wahan bhi hai jahan developers apni free API key generate karte hain (credit card required nahi, Flash pe 15 req/min). Ye production ke liye Vertex AI pe jaane se pehle recommended starting point hai.',
            },
          },
        ],
      },
    ],
  },
];

const automatingWithGemini = [
  {
    title: 'Automating with Gemini API',
    level: 'intermediate',
    description: 'Gemini-powered apps banana, multimodal automation pipelines, aur Google Search grounding.',
    concepts: [
      {
        title: 'Building a Gemini-Powered App',
        difficulty: 'medium',
        tags: ['api', 'nodejs', 'express', 'streaming', 'document-analysis'],
        explanation: {
          english:
            'The best way to understand the Gemini API is to build a real, working app. Here is a complete document analyser: the user uploads a PDF, Gemini extracts key structured information from it, and returns clean JSON.\n\n**Architecture:**\n- Frontend: simple HTML form with file upload\n- Backend: Node.js + Express\n- AI layer: @google/generative-ai SDK\n- Feature: Streaming responses (results appear progressively, not all at once)\n\n**Key concepts in this build:**\n\n**1. File uploads via the File API:**\nFor large files (PDFs, images), use Gemini\'s File API to upload first, then reference the file URI in your prompt. This avoids the base64 size limit.\n\n**2. Structured JSON output:**\nUse `generationConfig: { responseMimeType: "application/json" }` to force Gemini to return valid JSON every time. Combine with a JSON schema in the prompt for reliable extraction.\n\n**3. Streaming:**\nInstead of waiting for the entire response, stream it: `model.generateContentStream(prompt)`. Pipe the stream to the HTTP response so the user sees results as they arrive.\n\n**4. Error handling:**\n- Rate limit errors (429): implement exponential backoff\n- Safety filter blocks: check `result.response.promptFeedback`\n- File too large: check file size before upload, use File API for >20MB\n- Timeout: set a request timeout and show a fallback message',
          hinglish:
            'Gemini API samajhne ka sabse accha tarika hai ek real, working app banana. Yahan ek complete document analyser hai: user ek PDF upload karta hai, Gemini usme se key structured information extract karta hai, aur clean JSON return karta hai.\n\n**Architecture:**\n- Frontend: simple HTML form file upload ke saath\n- Backend: Node.js + Express\n- AI layer: @google/generative-ai SDK\n- Feature: Streaming responses (results progressively aate hain, ek saath nahi)\n\n**Is build mein key concepts:**\n\n**1. File API ke through file uploads:**\nBade files (PDFs, images) ke liye, pehle Gemini ke File API se upload karo, phir prompt mein file URI reference karo. Ye base64 size limit avoid karta hai.\n\n**2. Structured JSON output:**\n`generationConfig: { responseMimeType: "application/json" }` use karo Gemini ko har baar valid JSON return karne ke liye force karne ke liye. Reliable extraction ke liye prompt mein JSON schema ke saath combine karo.\n\n**3. Streaming:**\nPoore response ka intezaar karne ki jagah, stream karo: `model.generateContentStream(prompt)`. HTTP response pe stream pipe karo taaki user results aate hi dekhe.\n\n**4. Error handling:**\n- Rate limit errors (429): exponential backoff implement karo\n- Safety filter blocks: `result.response.promptFeedback` check karo\n- File too bada: upload se pehle file size check karo, >20MB ke liye File API use karo\n- Timeout: request timeout set karo aur fallback message dikhao',
        },
        dailyLifeExample:
          'Socho tum ek CA firm ke liye tool banana chahte ho jo clients ke GST invoices automatically analyse kare — vendor name, amount, GST number, date — sab extract kare aur ek clean spreadsheet mein dal de. Ye exactly uss type ka app hai: user PDF upload kare, Gemini structured data extract kare, JSON return kare, aur app sheet mein save kare. 100 invoices manually padhne ke bajaye — ek click.',
        codeExample:
          '// Document analyser: PDF upload -> Gemini extracts structured JSON\n// npm install express @google/generative-ai multer dotenv\n\nrequire("dotenv").config();\nconst express = require("express");\nconst multer  = require("multer");\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\nconst fs = require("fs");\n\nconst app    = express();\nconst upload = multer({ dest: "uploads/" });\nconst genAI  = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\nconst model  = genAI.getGenerativeModel({\n  model: "gemini-2.0-flash",\n  generationConfig: { responseMimeType: "application/json" },\n});\n\napp.post("/analyse", upload.single("document"), async (req, res) => {\n  const pdfData = fs.readFileSync(req.file.path);\n\n  const prompt = [\n    {\n      inlineData: {\n        data: pdfData.toString("base64"),\n        mimeType: "application/pdf",\n      },\n    },\n    {\n      text: \'Extract the following from this document as JSON:\\n\'\n           + \'{ "title": "", "date": "", "summary": "", \'\n           + \'"key_points": [], "action_items": [] }\',\n    },\n  ];\n\n  try {\n    // Streaming response\n    const stream = await model.generateContentStream(prompt);\n    res.setHeader("Content-Type", "application/json");\n    res.setHeader("Transfer-Encoding", "chunked");\n\n    for await (const chunk of stream.stream) {\n      const text = chunk.text();\n      if (text) res.write(text);\n    }\n    res.end();\n  } catch (err) {\n    if (err.status === 429) {\n      res.status(429).json({ error: "Rate limit hit. Retry in 60s." });\n    } else {\n      res.status(500).json({ error: err.message });\n    }\n  } finally {\n    fs.unlinkSync(req.file.path); // Clean up uploaded file\n  }\n});\n\napp.listen(3000, () => console.log("Document analyser running on :3000"));',
        keyPoints: [
          'Use responseMimeType: "application/json" in generationConfig for reliable structured output',
          'generateContentStream() streams the response — user sees results progressively',
          'File API handles large files; inline base64 works for files under ~20MB',
          'Always handle 429 (rate limit) with exponential backoff in production',
          'Check promptFeedback for safety filter blocks before processing the response',
          'Multimodal prompts: pass an array with inlineData parts + a text part',
        ],
        quiz: [
          {
            question: 'What generationConfig option forces Gemini to always return valid JSON?',
            options: [
              'outputFormat: "json"',
              'responseMimeType: "application/json"',
              'jsonMode: true',
              'temperature: 0',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the benefit of using generateContentStream() instead of generateContent()?',
            options: [
              'It is cheaper per token',
              'It allows the user to see results progressively as they are generated',
              'It returns more accurate results',
              'It bypasses rate limits',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you build a Gemini-powered app that extracts structured data from PDFs?',
            answer: {
              english:
                'Use the Gemini API with responseMimeType: "application/json" in generationConfig to force structured JSON output. Pass the PDF as base64 inline data (or via the File API for large files) alongside a prompt that specifies the exact JSON schema you want. Use generateContentStream() to stream the response to the user progressively. Implement 429 error handling with exponential backoff, and check promptFeedback to detect safety filter blocks. In Node.js: Express + multer handles the file upload; @google/generative-ai handles the AI call.',
              hinglish:
                'Gemini API ko generationConfig mein responseMimeType: "application/json" ke saath use karo structured JSON output force karne ke liye. PDF ko base64 inline data ke roop mein (ya bade files ke liye File API ke through) us prompt ke saath pass karo jo exact JSON schema specify kare. Response user ko progressively stream karne ke liye generateContentStream() use karo. Exponential backoff ke saath 429 error handling implement karo, aur safety filter blocks detect karne ke liye promptFeedback check karo. Node.js mein: Express + multer file upload handle karta hai; @google/generative-ai AI call handle karta hai.',
            },
          },
        ],
      },
      {
        title: 'Multimodal Automation Pipelines',
        difficulty: 'hard',
        tags: ['multimodal', 'vision', 'ocr', 'automation', 'pipeline', 'batch'],
        explanation: {
          english:
            'Gemini\'s vision capabilities go far beyond "describe this image." When combined with programmatic pipelines, they unlock powerful automation use cases at scale:\n\n**Screenshot-to-bug-report pipeline:**\n- QA team takes a screenshot of a UI bug\n- Pipeline sends it to Gemini: "Describe the visual bug in this screenshot. Include: what component it is, what looks wrong, and what the expected behaviour should be."\n- Output is a structured bug report automatically filed in Jira or GitHub Issues\n- Saves 5–10 minutes per bug report; scales to hundreds per day\n\n**Invoice OCR to structured data:**\n- Input: folder of invoice images (JPG, PNG, PDF)\n- Pipeline: for each file → send to Gemini with a JSON schema prompt → extract vendor, amount, date, GST number, line items\n- Output: CSV or database row per invoice\n- Replaces expensive dedicated OCR services; Gemini understands layout better than traditional OCR\n\n**Image classification at scale:**\n- E-commerce: classify product images into categories automatically\n- Medical: flag X-rays or scan images for review\n- Content moderation: categorise uploaded user images\n- Batch process: send 15 images/minute (free tier) or higher with paid API\n\n**Video summarisation:**\n- Upload a video file → Gemini can analyse frames across the entire video\n- "Summarise what happens in this video, timestamp key moments"\n- Use cases: meeting recordings, training videos, surveillance clips, product demos\n\n**Key pipeline patterns:**\n- Batch with rate limiting: queue jobs, send N requests/minute based on your API tier\n- Retry with backoff: handle 429 errors gracefully\n- Schema-enforced output: always use JSON mode for machine-readable results',
          hinglish:
            'Gemini ki vision capabilities "is image ko describe karo" se kaafi aage jaati hain. Jab programmatic pipelines ke saath combine kiya jata hai, ye scale pe powerful automation use cases unlock karte hain:\n\n**Screenshot-to-bug-report pipeline:**\n- QA team UI bug ka screenshot leta hai\n- Pipeline use Gemini pe bhejtI hai: "Is screenshot mein visual bug describe karo. Include karo: kaunsa component hai, kya galat lag raha hai, aur expected behaviour kya hona chahiye."\n- Output ek structured bug report hai jo automatically Jira ya GitHub Issues mein file hoti hai\n- Har bug report pe 5–10 minute bachta hai; hundreds per day scale hoti hai\n\n**Invoice OCR to structured data:**\n- Input: invoice images ka folder (JPG, PNG, PDF)\n- Pipeline: har file ke liye → JSON schema prompt ke saath Gemini pe bhejo → vendor, amount, date, GST number, line items extract karo\n- Output: har invoice ke liye CSV ya database row\n- Expensive dedicated OCR services replace karta hai; Gemini traditional OCR se layout better samajhta hai\n\n**Scale pe image classification:**\n- E-commerce: product images automatically categories mein classify karo\n- Medical: review ke liye X-rays ya scan images flag karo\n- Content moderation: uploaded user images categorize karo\n- Batch process: 15 images/minute (free tier) ya paid API ke saath zyada\n\n**Video summarisation:**\n- Video file upload karo → Gemini poore video ke across frames analyse kar sakta hai\n- "Is video mein kya hota hai summarize karo, key moments timestamp karo"\n- Use cases: meeting recordings, training videos, surveillance clips, product demos\n\n**Key pipeline patterns:**\n- Rate limiting ke saath batch: jobs queue karo, apne API tier ke hisaab se N requests/minute bhejo\n- Backoff ke saath retry: 429 errors gracefully handle karo\n- Schema-enforced output: machine-readable results ke liye hamesha JSON mode use karo',
        },
        dailyLifeExample:
          'Ek accounting firm ke paas 500 invoices hain jo manually enter karni padti hain. Ek developer ne ek script likhi: har invoice image ek loop mein Gemini pe jaati hai, structured JSON wapas aata hai, aur ek CSV mein save hota hai. Kaam jo 3 logon ko 2 din lagta tha, ab ek script 4 ghante mein kar deti hai. Multimodal automation ka matlab hai: jo bhi human aankhon se dekh ke enter karta tha, ab Gemini aankhon se dekh ke code se enter karta hai.',
        codeExample:
          '// Invoice OCR pipeline: folder of images -> CSV of extracted data\n// npm install @google/generative-ai csv-writer dotenv\n\nrequire("dotenv").config();\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\nconst { createObjectCsvWriter } = require("csv-writer");\nconst fs   = require("fs");\nconst path = require("path");\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\nconst model = genAI.getGenerativeModel({\n  model: "gemini-2.0-flash",\n  generationConfig: { responseMimeType: "application/json" },\n});\n\nconst RATE_LIMIT_MS = 4000; // ~15 req/min on free tier = 1 per 4 sec\n\nasync function extractInvoice(imagePath) {\n  const imageData = fs.readFileSync(imagePath);\n  const ext  = path.extname(imagePath).toLowerCase();\n  const mime = ext === ".pdf" ? "application/pdf" : "image/jpeg";\n\n  const result = await model.generateContent([\n    { inlineData: { data: imageData.toString("base64"), mimeType: mime } },\n    {\n      text: \'Extract invoice data as JSON: \'\n           + \'{ "vendor": "", "invoice_number": "", "date": "", \'\n           + \'"amount_total": "", "gst_number": "", "line_items": [] }\',\n    },\n  ]);\n\n  return JSON.parse(result.response.text());\n}\n\nasync function processInvoiceFolder(folderPath) {\n  const files = fs.readdirSync(folderPath)\n    .filter(f => /\\.(jpg|jpeg|png|pdf)$/i.test(f));\n\n  const csvWriter = createObjectCsvWriter({\n    path: "invoices_extracted.csv",\n    header: [\n      { id: "vendor",          title: "Vendor" },\n      { id: "invoice_number",  title: "Invoice No" },\n      { id: "date",            title: "Date" },\n      { id: "amount_total",    title: "Total Amount" },\n      { id: "gst_number",      title: "GST No" },\n    ],\n  });\n\n  const records = [];\n  for (const file of files) {\n    console.log("Processing:", file);\n    try {\n      const data = await extractInvoice(path.join(folderPath, file));\n      records.push(data);\n    } catch (err) {\n      console.error("Failed:", file, err.message);\n    }\n    await new Promise(r => setTimeout(r, RATE_LIMIT_MS)); // rate limit\n  }\n\n  await csvWriter.writeRecords(records);\n  console.log("Done. invoices_extracted.csv written.");\n}\n\nprocessInvoiceFolder("./invoices");',
        keyPoints: [
          'Gemini vision enables OCR pipelines that outperform traditional OCR on complex layouts',
          'Screenshot → structured bug report automation saves QA teams hours daily',
          'Rate limit your batch pipeline: free tier = ~15 req/min, add a delay between calls',
          'Always use JSON mode (responseMimeType) in pipelines for reliable machine-readable output',
          'Video analysis: upload video → Gemini analyses frames, timestamps key events',
          'Retry logic (exponential backoff) is essential for production batch pipelines',
        ],
        quiz: [
          {
            question: 'Why is Gemini vision preferred over traditional OCR for invoice extraction?',
            options: [
              'It is always faster',
              'It understands document layout, tables, and context — not just raw text characters',
              'It is free while OCR services cost money',
              'It only works with PDFs',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why should you add a delay between API calls in a batch pipeline on the free tier?',
            options: [
              'To avoid overloading the local machine',
              'To comply with the rate limit of ~15 requests per minute',
              'Because Gemini needs time to process each file',
              'To reduce API costs',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Describe a real-world automation pipeline you could build with Gemini\'s vision capabilities.',
            answer: {
              english:
                'An invoice OCR pipeline: iterate over a folder of invoice images, send each to Gemini with a JSON schema prompt specifying fields (vendor, date, amount, GST number), parse the returned JSON, and write all records to a CSV. Key implementation details: use responseMimeType: "application/json" for reliable structured output, add a 4-second delay between calls to respect the free tier rate limit (15 req/min), implement try/catch with retry logic for 429 errors, and clean up uploaded files after processing. This replaces manual data entry that previously took days.',
              hinglish:
                'Ek invoice OCR pipeline: invoice images ke folder ke upar iterate karo, har ek ko JSON schema prompt ke saath Gemini pe bhejo jo fields specify kare (vendor, date, amount, GST number), returned JSON parse karo, aur saare records CSV mein likho. Key implementation details: reliable structured output ke liye responseMimeType: "application/json" use karo, free tier rate limit (15 req/min) respect karne ke liye calls ke beech 4-second delay add karo, 429 errors ke liye retry logic ke saath try/catch implement karo, aur processing ke baad uploaded files clean up karo. Ye us manual data entry ko replace karta hai jo pehle days lagti thi.',
            },
          },
        ],
      },
      {
        title: 'Grounding with Google Search',
        difficulty: 'hard',
        tags: ['grounding', 'google-search', 'real-time', 'fact-checking', 'api'],
        explanation: {
          english:
            'By default, Gemini answers from its training data, which has a knowledge cutoff. Grounding with Google Search enables Gemini to search the web in real time before answering — giving you current, cited, accurate information.\n\n**How to enable:**\nPass `tools: [{ googleSearch: {} }]` in your API request. Gemini will decide when to search and will cite sources in its response.\n\n**What grounding enables:**\n- **Current pricing research**: "What is the current pricing for AWS Lambda vs Google Cloud Functions vs Azure Functions?"\n- **Fact-checking**: Verify whether a claim in a document is currently accurate\n- **News monitoring**: "What are the latest developments in the EU AI Act?"\n- **Competitive analysis**: "What features did Notion release in the last 3 months?"\n- **Real-time data**: Stock prices, sports scores, weather (when combined with search)\n\n**Response format with grounding:**\nThe response includes `groundingMetadata` with a list of sources, web search queries used, and grounding support annotations that link specific claims to their sources.\n\n**Availability:**\n- Grounding with Google Search is available on the Gemini API paid tier\n- It is NOT available on the free tier (15 req/min free plan)\n- Also available via AI Studio for testing\n\n**Pricing consideration:**\nGrounded requests cost slightly more than standard requests because Google Search queries are included. Check the current pricing at aistudio.google.com.\n\n**When NOT to use grounding:**\n- Tasks that do not need current information (code generation, math, writing)\n- High-volume automation pipelines (cost adds up quickly)\n- Private/internal document analysis (grounding only searches public web)',
          hinglish:
            'Default roop se, Gemini apne training data se jawab deta hai, jiska knowledge cutoff hota hai. Google Search ke saath Grounding Gemini ko jawaab dene se pehle real time mein web search karne ki suvidha deta hai — tumhe current, cited, accurate information milti hai.\n\n**Kaise enable karein:**\nApne API request mein `tools: [{ googleSearch: {} }]` pass karo. Gemini decide karega kab search karna hai aur apne response mein sources cite karega.\n\n**Grounding kya enable karta hai:**\n- **Current pricing research**: "AWS Lambda vs Google Cloud Functions vs Azure Functions ki current pricing kya hai?"\n- **Fact-checking**: Verify karo ki document mein koi claim abhi accurate hai ya nahi\n- **News monitoring**: "EU AI Act mein latest developments kya hain?"\n- **Competitive analysis**: "Notion ne last 3 months mein kya features release kiye?"\n- **Real-time data**: Stock prices, sports scores, weather (search ke saath combine karne pe)\n\n**Grounding ke saath response format:**\nResponse mein `groundingMetadata` shamil hota hai sources ki list ke saath, web search queries used, aur grounding support annotations jo specific claims ko unke sources se link karte hain.\n\n**Availability:**\n- Google Search ke saath Grounding Gemini API paid tier pe available hai\n- Free tier pe available NAHI hai (15 req/min free plan)\n- Testing ke liye AI Studio ke through bhi available hai\n\n**Pricing consideration:**\nGrounded requests standard requests se thoda zyada cost karte hain kyunki Google Search queries included hoti hain.\n\n**Grounding kab USE NA karein:**\n- Tasks jinhe current information ki zarurat nahi (code generation, math, writing)\n- High-volume automation pipelines (cost quickly add up hoti hai)\n- Private/internal document analysis (grounding sirf public web search karta hai)',
        },
        dailyLifeExample:
          'Bina grounding ke Gemini waise hai jaise ek bahut padha-likha friend jo 2024 tak ki news jaanta hai — baad ki koi update nahi. Grounding ke saath, wo pehle Google pe check karta hai, phir jawab deta hai. Practical example: "OpenAI ke GPT-4o aur Google Gemini ki current API pricing compare karo" — bina grounding ke outdated answer milega, grounding ke saath real-time prices ke saath cited answer milega.',
        codeExample:
          '// Grounded Gemini query — searches Google in real time before answering\n// Note: Grounding requires the paid API tier (not free tier)\n\nrequire("dotenv").config();\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\nconst model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });\n\nasync function groundedSearch(question) {\n  const result = await model.generateContent({\n    contents: [{ role: "user", parts: [{ text: question }] }],\n    tools: [{ googleSearch: {} }],   // Enable Google Search grounding\n  });\n\n  const response = result.response;\n  const text     = response.text();\n\n  // Extract grounding metadata (sources used)\n  const metadata = response.candidates?.[0]?.groundingMetadata;\n  const sources  = metadata?.groundingChunks?.map(chunk => ({\n    title: chunk.web?.title,\n    uri:   chunk.web?.uri,\n  })) || [];\n\n  return { answer: text, sources };\n}\n\n// Example: current API pricing comparison\ngroundedSearch(\n  "Compare the current API pricing of Gemini Flash, GPT-4o mini, and Claude Haiku per million tokens."\n).then(({ answer, sources }) => {\n  console.log("Answer:\\n", answer);\n  console.log("\\nSources used:");\n  sources.forEach(s => console.log("-", s.title, s.uri));\n});',
        keyPoints: [
          'tools: [{ googleSearch: {} }] enables real-time Google Search grounding in your API request',
          'Grounded responses include groundingMetadata with sources and search queries used',
          'Use cases: current pricing, fact-checking, news monitoring, competitive analysis',
          'Grounding is available only on the paid API tier — not on the free 15 req/min tier',
          'Grounded requests cost slightly more than standard requests',
          'Skip grounding for code, math, writing tasks — saves cost, no benefit',
        ],
        quiz: [
          {
            question: 'What does adding tools: [{ googleSearch: {} }] to a Gemini API request do?',
            options: [
              'Returns results from Google Scholar only',
              'Enables Gemini to search the web in real time and cite sources in its response',
              'Enables image search capabilities',
              'Unlocks the 1M context window',
            ],
            correctIndex: 1,
          },
          {
            question: 'On which Gemini API tier is Google Search grounding available?',
            options: [
              'Free tier (15 req/min)',
              'Both free and paid tiers',
              'Paid API tier only',
              'Only on Vertex AI',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is grounding in the Gemini API and when would you use it?',
            answer: {
              english:
                'Grounding connects Gemini to Google Search so it retrieves current web information before answering, rather than relying on its training data cutoff. Enable it by passing tools: [{ googleSearch: {} }] in the API request. The response includes groundingMetadata with the sources and search queries used. Use it for: current pricing comparisons, fact-checking documents, monitoring news and competitor updates, or any task where up-to-date information is critical. Avoid it for code generation, math, internal document analysis, or high-volume pipelines where the added cost per request is not justified.',
              hinglish:
                'Grounding Gemini ko Google Search se connect karta hai taaki wo training data cutoff pe rely karne ke bajaye answer karne se pehle current web information retrieve kare. Enable karne ke liye API request mein tools: [{ googleSearch: {} }] pass karo. Response mein use kiye gaye sources aur search queries ke saath groundingMetadata shamil hota hai. Use karo: current pricing comparisons, documents fact-checking, news aur competitor updates monitor karne, ya kisi bhi task ke liye jahan up-to-date information critical ho. Code generation, math, internal document analysis, ya high-volume pipelines ke liye avoid karo jahan per-request added cost justified nahi ho.',
            },
          },
        ],
      },
    ],
  },
];

const promptEngineeringForGemini = [
  {
    title: 'Prompt Engineering for Gemini',
    level: 'intermediate',
    description: 'System instructions, multimodal prompting, long-context strategies, aur few-shot/chain-of-thought techniques.',
    concepts: [
      {
        title: 'System Instructions & Role Setting',
        difficulty: 'medium',
        tags: ['system-instruction', 'system-prompt', 'persona', 'prompt-engineering'],
        explanation: {
          english:
            'In the Gemini API, the `systemInstruction` parameter is the equivalent of a system prompt — it sets the context, persona, task scope, and constraints for the entire conversation before the user says anything. Getting system instructions right is one of the highest-leverage skills in working with any LLM.\n\n**What makes a good system instruction:**\n\n**1. Persona** — Who is the model playing?\n> "You are a senior JavaScript engineer at a fintech company. You write clean, well-commented code and always flag security risks."\n\n**2. Task scope** — What is it allowed/expected to do?\n> "You only answer questions about JavaScript, TypeScript, Node.js, and related tooling. Politely decline other topics."\n\n**3. Output format** — How should it respond?\n> "Always structure your answers as: (1) Brief explanation, (2) Code example, (3) Caveats or edge cases."\n\n**4. Constraints** — What should it never do?\n> "Never suggest using eval(). Never write code without error handling. Never recommend deprecated APIs."\n\n**5. Examples (inline few-shot)** — Show the desired behaviour:\n> "When asked for a code review, reply in this format:\\nIssues found: [list]\\nSuggestions: [list]\\nRefactored code: [code block]"\n\n**Where systemInstruction lives in the API:**\nPassed as a top-level parameter when initialising the model with `getGenerativeModel()`. It persists across the entire conversation (unlike user messages which change per turn).\n\n**Common mistakes:**\n- Too vague: "Be helpful" — does nothing\n- Conflicting instructions: "Be concise" + "Always explain everything thoroughly"\n- Missing output format: model defaults to prose when you need JSON\n- No constraints: model may go off-topic or use unwanted approaches',
          hinglish:
            'Gemini API mein, `systemInstruction` parameter ek system prompt ke equivalent hai — ye poori conversation ke liye context, persona, task scope, aur constraints set karta hai user kuch bolne se pehle. System instructions sahi karna kisi bhi LLM ke saath kaam karne mein sabse zyada leverage wala skill hai.\n\n**Ek acchi system instruction kya banti hai:**\n\n**1. Persona** — Model kaun khel raha hai?\n> "Tum ek fintech company mein senior JavaScript engineer ho. Tum clean, well-commented code likhte ho aur hamesha security risks flag karte ho."\n\n**2. Task scope** — Use karne aur karne ki expect kya hai?\n> "Tum sirf JavaScript, TypeScript, Node.js, aur related tooling ke questions answer karte ho. Doosre topics politely decline karte ho."\n\n**3. Output format** — Kaise respond karna chahiye?\n> "Hamesha apne answers is tarah structure karo: (1) Brief explanation, (2) Code example, (3) Caveats ya edge cases."\n\n**4. Constraints** — Kya kabhi nahi karna chahiye?\n> "Kabhi eval() use karne ka suggest mat karo. Kabhi error handling ke bina code mat likho."\n\n**5. Examples (inline few-shot)** — Desired behaviour dikhao:\n> "Jab code review ke liye poochha jaye, is format mein reply karo:\\nIssues found: [list]\\nSuggestions: [list]\\nRefactored code: [code block]"\n\n**API mein systemInstruction kahan hoti hai:**\n`getGenerativeModel()` ke saath model initialize karte waqt top-level parameter ke roop mein pass ki jaati hai. Ye poori conversation mein persist karti hai (unlike user messages jo per turn change hote hain).\n\n**Common mistakes:**\n- Bahut vague: "Helpful raho" — kuch nahi karta\n- Conflicting instructions: "Concise raho" + "Hamesha sab kuch thoroughly explain karo"\n- Missing output format: model prose default karta hai jab JSON chahiye\n- Koi constraints nahi: model off-topic ja sakta hai ya unwanted approaches use kar sakta hai',
        },
        dailyLifeExample:
          'System instruction waise hai jaise ek naye employee ko orientation dena. "Tum hamare customer support team mein ho, sirf billing aur account questions answer karo, hamesha polite raho, koi bhi pricing discount khud se mat offer karo." Bina is briefing ke, employee (ya model) har question pe apne hisaab se respond karega — kabhi accha, kabhi galat. System instruction ek baar likho, poori conversation consistent rehti hai.',
        codeExample:
          '// System instruction for a coding assistant\n// Demonstrates: persona, scope, output format, and constraints\n\nrequire("dotenv").config();\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\n\nconst codingAssistant = genAI.getGenerativeModel({\n  model: "gemini-2.0-flash",\n\n  // This is where system instructions live\n  systemInstruction:\n    "You are a senior Node.js engineer specialising in REST APIs and security.\\n"\n    + "\\n"\n    + "SCOPE: Answer only Node.js, Express, and API-related questions. "\n    + "Politely redirect other topics.\\n"\n    + "\\n"\n    + "OUTPUT FORMAT for every code answer:\\n"\n    + "1. One-line explanation of what the code does\\n"\n    + "2. The code block (with comments)\\n"\n    + "3. Security or edge-case notes (if any)\\n"\n    + "\\n"\n    + "CONSTRAINTS:\\n"\n    + "- Never use eval() or Function() constructor\\n"\n    + "- Always include input validation\\n"\n    + "- Never write async code without try/catch\\n"\n    + "- Prefer named exports over default exports",\n\n  generationConfig: {\n    temperature: 0.3, // Low temperature for consistent, factual coding answers\n    maxOutputTokens: 2048,\n  },\n});\n\n// Multi-turn chat using the assistant\nconst chat = codingAssistant.startChat();\n\nasync function askCodingQuestion(question) {\n  const result = await chat.sendMessage(question);\n  return result.response.text();\n}\n\n// Test it\naskCodingQuestion(\n  "Write an Express middleware that validates a JWT token and attaches the user to req.user"\n).then(console.log);',
        keyPoints: [
          'systemInstruction sets persona, scope, output format, and constraints for the entire session',
          'Passed at model initialisation (getGenerativeModel), not per message',
          'Good system instructions: persona + task scope + output format + constraints + examples',
          'Low temperature (0.1–0.4) pairs well with system instructions for consistent output',
          'Missing output format is the most common mistake — model defaults to unstructured prose',
          'System instructions persist across the full conversation; user messages change per turn',
        ],
        quiz: [
          {
            question: 'Where in the Gemini API code do you set the systemInstruction?',
            options: [
              'As a prefix to every user message',
              'In the generationConfig object',
              'As a parameter in getGenerativeModel()',
              'As the first message in the chat history',
            ],
            correctIndex: 2,
          },
          {
            question: 'What is the most commonly missing element in poorly written system instructions?',
            options: [
              'A persona definition',
              'A specified output format',
              'The model name',
              'A list of allowed topics',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you write a system instruction for a Gemini-powered customer support bot?',
            answer: {
              english:
                'A good system instruction for a customer support bot should include: (1) Persona: "You are a friendly customer support agent for Acme Corp." (2) Scope: "Answer only questions about Acme products, billing, and shipping. Redirect anything else to human support." (3) Output format: "Always start with a greeting, provide a direct answer, and end with an offer to help further." (4) Constraints: "Never promise refunds without verification. Never share pricing that is not on the official pricing page. Never make up order status." (5) Tone: "Always be empathetic, concise, and professional."',
              hinglish:
                'Customer support bot ke liye ek acchi system instruction mein shamil hona chahiye: (1) Persona: "Tum Acme Corp ke liye ek friendly customer support agent ho." (2) Scope: "Sirf Acme products, billing, aur shipping ke baare mein questions answer karo. Baki sab human support pe redirect karo." (3) Output format: "Hamesha greeting se shuru karo, direct answer do, aur help karne ke offer ke saath khatam karo." (4) Constraints: "Verification ke bina refund promise mat karo. Official pricing page pe nahi hain aisi prices share mat karo. Order status mat banao." (5) Tone: "Hamesha empathetic, concise, aur professional raho."',
            },
          },
        ],
      },
      {
        title: 'Multimodal Prompting Techniques',
        difficulty: 'medium',
        tags: ['multimodal', 'vision', 'image', 'pdf', 'prompt-engineering'],
        explanation: {
          english:
            'Multimodal prompting — combining text with images, PDFs, or other media — requires different thinking compared to text-only prompting. The structure and specificity of your text instruction determines whether Gemini gives a vague description or exactly the structured output you need.\n\n**Key principles for multimodal prompts:**\n\n**1. Be specific about what part of the image to focus on:**\n- Weak: "What is in this image?"\n- Strong: "Look at the chart in the bottom-right corner. What trend does it show between 2020 and 2024?"\n\n**2. Reference elements by description:**\n- "The table in the upper half of page 2"\n- "The error message shown in the red dialog box"\n- "The third bar from the left in the bar chart"\n\n**3. Comparing two images:**\n- Pass both images as separate inlineData parts in the same request\n- "Compare image 1 and image 2. List the visual differences in a table with columns: Element | Image 1 | Image 2"\n\n**4. Asking about a chart or graph:**\n- "Extract the exact data values from this bar chart into a JSON array with keys: label, value"\n- "What is the trend? Is the metric increasing or decreasing over time? By what percentage?"\n\n**5. Extracting structured data from a form:**\n- Always specify the exact JSON schema you want\n- "Extract all fields from this form as JSON: { name, email, date_of_birth, address: { street, city, pin } }"\n\n**6. Describing what you expect:**\n- "Even if the image is blurry or partially obscured, make your best attempt and flag uncertainty with [uncertain]"\n- "If a field is not visible, return null for that key"',
          hinglish:
            'Multimodal prompting — text ko images, PDFs, ya dusre media ke saath combine karna — text-only prompting se alag thinking require karta hai. Tumhare text instruction ki structure aur specificity decide karti hai ki Gemini ek vague description dega ya exactly woh structured output jo tumhe chahiye.\n\n**Multimodal prompts ke key principles:**\n\n**1. Image ke kis part pe focus karna hai specific raho:**\n- Weak: "Is image mein kya hai?"\n- Strong: "Bottom-right corner mein chart dekho. 2020 aur 2024 ke beech kya trend dikhata hai?"\n\n**2. Elements ko description se reference karo:**\n- "Page 2 ke upper half mein table"\n- "Red dialog box mein dikhne wala error message"\n- "Bar chart mein left se teesra bar"\n\n**3. Do images compare karna:**\n- Dono images ko ek hi request mein alag alag inlineData parts ke roop mein pass karo\n- "Image 1 aur image 2 compare karo. Visual differences ek table mein list karo columns ke saath: Element | Image 1 | Image 2"\n\n**4. Chart ya graph ke baare mein poochna:**\n- "Is bar chart se exact data values ek JSON array mein extract karo keys ke saath: label, value"\n- "Trend kya hai? Metric time ke saath increase ya decrease ho raha hai? Kitne percent se?"\n\n**5. Form se structured data extract karna:**\n- Hamesha exact JSON schema specify karo jo chahiye\n- "Is form se saare fields JSON ke roop mein extract karo: { name, email, date_of_birth, address: { street, city, pin } }"\n\n**6. Kya expect karte ho wo describe karo:**\n- "Agar image blurry ya partially obscured bhi ho, best attempt karo aur uncertainty [uncertain] se flag karo"\n- "Agar koi field visible nahi hai, us key ke liye null return karo"',
        },
        dailyLifeExample:
          'Socho tum ek presentation screenshot se data nikalna chahte ho. "Is image mein kya hai?" poochho — milega ek generic description. "Is bar chart mein saare bars ke labels aur values JSON format mein extract karo" poochho — milega exactly JSON jisko code mein directly use kar sakte ho. Multimodal prompting mein specificity hi precision hai.',
        codeExample:
          '// Multimodal prompting: extract a table from a screenshot as structured JSON\n\nrequire("dotenv").config();\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\nconst fs = require("fs");\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\nconst model = genAI.getGenerativeModel({\n  model: "gemini-2.0-flash",\n  generationConfig: { responseMimeType: "application/json" },\n});\n\n// Example 1: Extract a table from a screenshot\nasync function extractTableFromImage(imagePath) {\n  const imageData = fs.readFileSync(imagePath);\n  const result = await model.generateContent([\n    { inlineData: { data: imageData.toString("base64"), mimeType: "image/png" } },\n    {\n      text: "Extract the table from this screenshot as a JSON array of objects. "\n           + "Each row should be one object with column headers as keys. "\n           + "If a cell is empty, use null. "\n           + "Return only the JSON array, no explanation.",\n    },\n  ]);\n  return JSON.parse(result.response.text());\n}\n\n// Example 2: Compare two design screenshots\nasync function compareDesigns(beforePath, afterPath) {\n  const img1 = fs.readFileSync(beforePath);\n  const img2 = fs.readFileSync(afterPath);\n  const result = await model.generateContent([\n    { inlineData: { data: img1.toString("base64"), mimeType: "image/png" } },\n    { inlineData: { data: img2.toString("base64"), mimeType: "image/png" } },\n    {\n      text: "Compare these two UI screenshots (image 1 = before, image 2 = after). "\n           + "List all visual differences as JSON: { differences: [{ element, before, after }] }",\n    },\n  ]);\n  return JSON.parse(result.response.text());\n}\n\n// Usage\nextractTableFromImage("quarterly_report_screenshot.png")\n  .then(data => console.log("Extracted table:", data));',
        keyPoints: [
          'Specify which part of the image to focus on — "bottom-right chart" not "what is in this image"',
          'For structured extraction, always include the exact JSON schema in the prompt',
          'Compare two images by passing both as separate inlineData parts in the same request',
          'Reference form fields, chart labels, table columns by name for precise extraction',
          'Add fallback instructions: "if unclear, return null" or "flag with [uncertain]"',
          'Use responseMimeType: "application/json" to get parseable output for automation',
        ],
        quiz: [
          {
            question: 'How do you ask Gemini to compare two images in the same API request?',
            options: [
              'Send two separate API requests and compare the responses',
              'Pass both images as separate inlineData parts in the same request\'s content array',
              'Combine both images into one image file first',
              'Use a special "comparison" model',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the most important addition to a multimodal prompt when you need machine-readable output?',
            options: [
              'A higher temperature setting',
              'Specifying the exact JSON schema and using responseMimeType: "application/json"',
              'Sending a larger image file',
              'Using Gemini Pro instead of Flash',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What are three best practices for writing multimodal prompts with Gemini?',
            answer: {
              english:
                '(1) Be specific about which part of the image to analyse — reference elements by location or description rather than asking generically. (2) Always provide the exact JSON schema when extracting structured data, and use responseMimeType: "application/json" so the output is reliably parseable. (3) Include fallback instructions — tell Gemini what to do if data is unclear, obscured, or missing (e.g., "return null for missing fields, flag uncertainty with [uncertain]"). These three practices transform vague, hard-to-use responses into precise, automation-ready outputs.',
              hinglish:
                '(1) Image ke kis part ko analyse karna hai specific raho — location ya description se elements reference karo, generically poochne ki bajaye. (2) Structured data extract karte waqt hamesha exact JSON schema provide karo, aur responseMimeType: "application/json" use karo taaki output reliably parseable ho. (3) Fallback instructions include karo — Gemini ko batao agar data unclear, obscured, ya missing ho toh kya kare (jaise "missing fields ke liye null return karo, uncertainty ko [uncertain] se flag karo"). Ye teen practices vague, hard-to-use responses ko precise, automation-ready outputs mein transform karti hain.',
            },
          },
        ],
      },
      {
        title: 'Long-Context Strategies with 1M Tokens',
        difficulty: 'hard',
        tags: ['long-context', '1m-tokens', 'context-window', 'chunking', 'needle-in-haystack'],
        explanation: {
          english:
            'Gemini\'s 1M token context window is a superpower — but using it effectively requires knowing how to structure your input so Gemini gives precise, relevant answers rather than getting lost in the noise.\n\n**Best practices for long-context prompts:**\n\n**1. Instruction first, content next, question last:**\nThis is the most important structural rule. Put your instructions and output format at the top, then the content (documents, code, transcripts), then the question at the very end. Gemini attends to the beginning and end of context more strongly.\n\n**2. Clearly delimit your sections:**\n```\n[INSTRUCTIONS]\nYou are a legal analyst. ...\n\n[DOCUMENTS]\n--- Contract 1 ---\n...\n--- Contract 2 ---\n...\n\n[QUESTION]\nWhich contract has the stricter liability clause?\n```\n\n**3. The "needle in a haystack" pattern:**\nWhen you need to find specific information buried in a large document: "In the following codebase, find every function that calls the database without using a transaction. Return function names, file paths, and line numbers."\n\n**4. Chunking strategy for corpora > 1M tokens:**\n- Split into chunks of ~800K tokens (leave buffer for prompt + response)\n- Process each chunk separately, ask for intermediate summaries\n- Merge summaries in a final pass\n- For retrieval tasks, use embeddings to find relevant chunks first (RAG pattern)\n\n**5. Explicit page/section references:**\n- "In page 47–52 of the uploaded document, what does the author argue about risk management?"\n- Referencing sections helps Gemini ground its answer to the correct part\n\n**6. Ask for citations:**\n- "Answer with quotes from the source material and page/section references"\n- Reduces hallucination in long-context tasks significantly',
          hinglish:
            'Gemini ka 1M token context window ek superpower hai — par ise effectively use karne ke liye jaanna padta hai ki input kaise structure karein taaki Gemini precise, relevant answers de rather than noise mein kho jaye.\n\n**Long-context prompts ke best practices:**\n\n**1. Pehle instruction, phir content, aakhir mein question:**\nYe sabse important structural rule hai. Top pe apni instructions aur output format rakho, phir content (documents, code, transcripts), phir question bilkul end mein. Gemini context ke beginning aur end ko zyada strongly attend karta hai.\n\n**2. Sections clearly delimit karo:**\n```\n[INSTRUCTIONS]\nTum ek legal analyst ho. ...\n\n[DOCUMENTS]\n--- Contract 1 ---\n...\n--- Contract 2 ---\n...\n\n[QUESTION]\nKis contract mein stricter liability clause hai?\n```\n\n**3. "Needle in a haystack" pattern:**\nJab bade document mein specific information dhundhni ho: "Niche diye codebase mein, har function dhundho jo database ko bina transaction ke call karta hai. Function names, file paths, aur line numbers return karo."\n\n**4. Corpora > 1M tokens ke liye chunking strategy:**\n- ~800K tokens ke chunks mein split karo (prompt + response ke liye buffer chhodo)\n- Har chunk alag process karo, intermediate summaries maango\n- Final pass mein summaries merge karo\n- Retrieval tasks ke liye, pehle relevant chunks dhundhne ke liye embeddings use karo (RAG pattern)\n\n**5. Explicit page/section references:**\n- "Uploaded document ke page 47–52 mein, author risk management ke baare mein kya argue karta hai?"\n- Sections reference karne se Gemini apna answer sahi part pe ground karta hai\n\n**6. Citations maango:**\n- "Source material se quotes aur page/section references ke saath answer do"\n- Long-context tasks mein hallucination significantly reduce karta hai',
        },
        dailyLifeExample:
          'Ek lawyer ne ek 900-page case file Gemini mein load ki aur poochha: "Kya koi clause hai jo defendant ko 6 months se pehle contract terminate karne ki suvidha deta hai?" Bina structure ke — vague ya incomplete answer. Structure ke saath (instructions pehle, document phir, question aakhir, aur citations maango) — Gemini ne clause 14.3 quote kiya, page number diya, aur related clauses bhi indicate kiye. 1M context power hai, par structure use power unleash karta hai.',
        codeExample:
          '// Loading 5 PDF files into a single Gemini request (long-context)\n// Demonstrates: instruction-first pattern, section delimiters, citations\n\nrequire("dotenv").config();\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\nconst fs = require("fs");\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\n// Use gemini-1.5-pro for 1M context window\nconst model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });\n\nasync function analyseMultiplePDFs(pdfPaths, question) {\n  const parts = [];\n\n  // 1. Instructions FIRST\n  parts.push({\n    text:\n      "[INSTRUCTIONS]\\n"\n      + "You are a document analyst. Read all documents carefully.\\n"\n      + "When answering, cite the document name and section/page.\\n"\n      + "If information conflicts across documents, note the conflict.\\n"\n      + "Format: Answer -> Supporting quotes with citations.\\n\\n"\n      + "[DOCUMENTS]\\n",\n  });\n\n  // 2. Content (all PDFs) in the middle\n  for (let i = 0; i < pdfPaths.length; i++) {\n    const pdfData = fs.readFileSync(pdfPaths[i]);\n    parts.push({\n      text: "--- Document " + (i + 1) + ": " + pdfPaths[i] + " ---\\n",\n    });\n    parts.push({\n      inlineData: {\n        data: pdfData.toString("base64"),\n        mimeType: "application/pdf",\n      },\n    });\n  }\n\n  // 3. Question LAST\n  parts.push({ text: "\\n[QUESTION]\\n" + question });\n\n  const result = await model.generateContent(parts);\n  return result.response.text();\n}\n\n// Usage: analyse 5 research papers\nanalyseMultiplePDFs(\n  ["paper1.pdf", "paper2.pdf", "paper3.pdf", "paper4.pdf", "paper5.pdf"],\n  "What do these papers collectively conclude about transformer attention mechanisms? "\n  + "Note any contradictions between papers."\n).then(console.log);',
        keyPoints: [
          'Structural rule: instructions first → content in the middle → question last',
          'Clearly delimit sections with [INSTRUCTIONS], [DOCUMENTS], [QUESTION] markers',
          '"Needle in haystack": ask Gemini to find specific information buried in large content',
          'For > 1M tokens: chunk to ~800K, process separately, merge summaries in final pass',
          'Always request citations — "quote the source and page number" — reduces hallucination',
          'Embeddings + RAG is more cost-effective than 1M context for retrieval-heavy workloads',
        ],
        quiz: [
          {
            question: 'What is the recommended order for structuring a long-context Gemini prompt?',
            options: [
              'Question first, then content, then instructions',
              'Content first, then question, then instructions',
              'Instructions first, content in the middle, question last',
              'Order does not matter with 1M context',
            ],
            correctIndex: 2,
          },
          {
            question: 'What is the "needle in a haystack" pattern in long-context prompting?',
            options: [
              'A method of compressing large documents before sending',
              'Asking Gemini to find a specific piece of information buried within a large document',
              'Using embeddings to split documents into smaller chunks',
              'A technique to reduce token usage',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What are the best practices for using Gemini\'s 1M token context window effectively?',
            answer: {
              english:
                'Key practices: (1) Structure order: put instructions at the top, all content (documents/code) in the middle, and the question last — Gemini attends more strongly to the beginning and end of context. (2) Use clear section delimiters like [INSTRUCTIONS], [DOCUMENTS], [QUESTION] to help the model navigate. (3) Always request citations — "quote the source and page number" — which significantly reduces hallucination in long-context tasks. (4) For corpora exceeding 1M tokens, chunk into ~800K pieces, process each separately, then merge summaries in a final pass. (5) Use RAG (embeddings + retrieval) for retrieval-heavy workloads instead of brute-forcing everything into context — it is more cost-effective.',
              hinglish:
                'Key practices: (1) Structure order: top pe instructions rakho, middle mein saara content (documents/code), aur aakhir mein question — Gemini context ke beginning aur end ko zyada strongly attend karta hai. (2) Model ko navigate karne mein help karne ke liye [INSTRUCTIONS], [DOCUMENTS], [QUESTION] jaise clear section delimiters use karo. (3) Hamesha citations maango — "source aur page number quote karo" — jo long-context tasks mein hallucination significantly reduce karta hai. (4) 1M tokens se zyada corpora ke liye, ~800K pieces mein chunk karo, har ek alag process karo, phir final pass mein summaries merge karo. (5) Retrieval-heavy workloads ke liye RAG (embeddings + retrieval) use karo instead of sab kuch context mein brute-force karne ke — ye zyada cost-effective hai.',
            },
          },
        ],
      },
      {
        title: 'Few-Shot and Chain-of-Thought for Gemini',
        difficulty: 'medium',
        tags: ['few-shot', 'chain-of-thought', 'cot', 'prompt-engineering', 'json'],
        explanation: {
          english:
            'Few-shot prompting and chain-of-thought (CoT) are two of the most reliable techniques for improving Gemini output quality — especially for structured output and reasoning tasks.\n\n**Few-Shot Prompting:**\nInstead of describing what you want, show Gemini 2–3 examples of the input and the expected output. The model learns the pattern from the examples and applies it to your actual input.\n\n**When few-shot works best:**\n- When you need a very specific output format (JSON, tables, code)\n- When the task is ambiguous and examples clarify it better than description\n- When Gemini\'s zero-shot output is close but slightly off in format or style\n- Classification tasks (e.g., sentiment analysis, category tagging)\n\n**Chain-of-Thought (CoT):**\nAdd "Think through this step by step before answering" or "Let\'s think step by step" to your prompt. This forces the model to reason through the problem before giving the final answer, which improves accuracy on:\n- Multi-step math or logic problems\n- Complex code generation\n- Tasks with multiple conditions\n- Ambiguous situations requiring inference\n\n**When CoT helps most:**\n- Reasoning problems (logic, math, cause-and-effect)\n- Tasks where the answer requires multiple steps of deduction\n- When Gemini gives a wrong answer on a reasoning task — add CoT and try again\n\n**When CoT hurts:**\n- Simple factual lookups (adds unnecessary tokens)\n- High-volume pipelines (adds latency and cost per request)\n\n**Combining few-shot + CoT:**\nProvide 1–2 examples that also show the reasoning chain, not just the final answer. The model then applies the same reasoning style to new inputs.',
          hinglish:
            'Few-shot prompting aur chain-of-thought (CoT) do sabse reliable techniques hain Gemini output quality improve karne ke liye — especially structured output aur reasoning tasks ke liye.\n\n**Few-Shot Prompting:**\nJo chahiye wo describe karne ki jagah, Gemini ko input aur expected output ke 2–3 examples dikhao. Model examples se pattern seekhta hai aur use actual input pe apply karta hai.\n\n**Few-shot kab best kaam karta hai:**\n- Jab bahut specific output format chahiye (JSON, tables, code)\n- Jab task ambiguous ho aur examples description se better clarify karte hain\n- Jab Gemini ka zero-shot output close but format ya style mein slightly off ho\n- Classification tasks (jaise sentiment analysis, category tagging)\n\n**Chain-of-Thought (CoT):**\nApne prompt mein "Think through this step by step before answering" ya "Let\'s think step by step" add karo. Ye model ko final answer dene se pehle problem ke through reason karne ke liye force karta hai, jo improve karta hai:\n- Multi-step math ya logic problems\n- Complex code generation\n- Multiple conditions wale tasks\n- Inference requiring ambiguous situations\n\n**CoT kab sabse zyada help karta hai:**\n- Reasoning problems (logic, math, cause-and-effect)\n- Tasks jahan answer ke liye multiple steps of deduction chahiye\n- Jab Gemini kisi reasoning task pe galat answer de — CoT add karo aur dobara try karo\n\n**CoT kab hurt karta hai:**\n- Simple factual lookups (unnecessary tokens add karta hai)\n- High-volume pipelines (per request latency aur cost add karta hai)\n\n**Few-shot + CoT combine karna:**\n1–2 examples provide karo jo reasoning chain bhi dikhate hain, sirf final answer nahi. Model phir same reasoning style nayi inputs pe apply karta hai.',
        },
        dailyLifeExample:
          'Few-shot waise hai jaise kisi naiye employee ko kuch examples dikhana: "Dekho pichle teen customer emails aur humare standard replies — ab is nayi email ka same style mein reply likho." Chain-of-thought waise hai jaise kisi se yeh kehna ki problem solve karne se pehle socho aur steps batao: "Pehle data dekho, phir trend identify karo, phir apna conclusion likho." Dono techniques ek saath use karo jab accuracy sabse zyada important ho.',
        codeExample:
          '// Few-shot prompt that consistently produces structured JSON output\n// + Chain-of-thought for a reasoning step\n\nrequire("dotenv").config();\nconst { GoogleGenerativeAI } = require("@google/generative-ai");\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\nconst model = genAI.getGenerativeModel({\n  model: "gemini-2.0-flash",\n  generationConfig: { responseMimeType: "application/json" },\n});\n\n// Few-shot prompt: classify support tickets into structured JSON\nconst fewShotPrompt =\n  "Classify each support ticket. Return JSON: "\n  + "{ \\"category\\": \\"billing|technical|general\\", \\"priority\\": \\"high|medium|low\\", \\"summary\\": \\"one sentence\\" }"\n  + "\\n\\n"\n  + "Think through each ticket step by step before classifying."\n  + "\\n\\n"\n  + "--- EXAMPLES ---"\n  + "\\nTicket: I was charged twice for my subscription last month."\n  + "\\nReasoning: Mentions charging/subscription = billing. Duplicate charge = high priority."\n  + "\\nOutput: { \\"category\\": \\"billing\\", \\"priority\\": \\"high\\", \\"summary\\": \\"Customer charged twice for subscription\\" }"\n  + "\\n\\n"\n  + "Ticket: How do I export my data to CSV?"\n  + "\\nReasoning: Asking how to use a feature = general/technical. No urgency = low priority."\n  + "\\nOutput: { \\"category\\": \\"general\\", \\"priority\\": \\"low\\", \\"summary\\": \\"Customer asking how to export data as CSV\\" }"\n  + "\\n\\n"\n  + "--- NOW CLASSIFY ---";\n\nasync function classifyTicket(ticketText) {\n  const prompt = fewShotPrompt + "\\nTicket: " + ticketText;\n  const result = await model.generateContent(prompt);\n  return JSON.parse(result.response.text());\n}\n\n// Test with a new ticket\nclassifyTicket(\n  "My account was locked after I changed my email address and I cannot log in."\n).then(result => console.log(result));\n// Expected: { category: "technical", priority: "high", summary: "..." }',
        keyPoints: [
          'Few-shot: provide 2–3 input→output examples to teach the pattern, not just describe it',
          'CoT: add "Think through this step by step" to improve accuracy on reasoning tasks',
          'Combine few-shot + CoT by including the reasoning chain in your examples',
          'Use responseMimeType: "application/json" with few-shot to lock in JSON output format',
          'CoT is most valuable for: logic, math, multi-condition, ambiguous reasoning tasks',
          'Skip CoT for simple lookups and high-volume pipelines where latency/cost matters',
        ],
        quiz: [
          {
            question: 'What does a few-shot prompt provide that a zero-shot prompt does not?',
            options: [
              'A system instruction',
              '2–3 examples of input and expected output that teach the model the desired pattern',
              'A higher temperature for more creative output',
              'Access to more Gemini model capabilities',
            ],
            correctIndex: 1,
          },
          {
            question: 'When is chain-of-thought prompting most beneficial?',
            options: [
              'Simple fact retrieval tasks',
              'High-volume classification pipelines',
              'Multi-step reasoning, logic, and math problems',
              'Image description tasks',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the difference between few-shot prompting and chain-of-thought prompting, and when to use each.',
            answer: {
              english:
                'Few-shot prompting provides 2–3 input→output examples in the prompt to teach the model a specific pattern without explicitly describing it — ideal for consistent output formats (JSON, tables), classification tasks, or when zero-shot output is almost right but off in style. Chain-of-thought (CoT) adds "Think through this step by step before answering" to force explicit reasoning before the final answer — ideal for multi-step logic, math problems, ambiguous tasks, or any reasoning that requires multiple deductions. They can be combined: include reasoning chains in your few-shot examples so the model learns both the reasoning style and the output format simultaneously.',
              hinglish:
                'Few-shot prompting prompt mein 2–3 input→output examples provide karta hai taaki model ek specific pattern seekhe explicitly describe kiye bina — ideal hai consistent output formats (JSON, tables), classification tasks, ya jab zero-shot output almost right ho par style mein off ho. Chain-of-thought (CoT) "Think through this step by step before answering" add karta hai final answer se pehle explicit reasoning force karne ke liye — ideal hai multi-step logic, math problems, ambiguous tasks, ya kisi bhi reasoning ke liye jo multiple deductions require kare. Inhe combine kiya ja sakta hai: apne few-shot examples mein reasoning chains include karo taaki model reasoning style aur output format dono simultaneously seekhe.',
            },
          },
        ],
      },
    ],
  },
];

export const curriculum = [
  ...fundamentals,
  ...keyFeatures,
  ...developerIntegration,
  ...dailyProductivity,
  ...automatingWithGemini,
  ...promptEngineeringForGemini,
];

export const generalInterviewQuestions = [
  {
    question: 'What makes Gemini different from ChatGPT?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Key differences: (1) Native multimodality — Gemini was trained on text, images, audio, and video simultaneously, while GPT-4o added these capabilities over time; (2) Google integration — Gemini is built into Search, Gmail, Docs, Drive, Meet; (3) Context window — Gemini 1.5 Pro supports 1M tokens vs GPT-4o\'s 128K; (4) Free API tier — Gemini Flash is very generous (15 req/min free) for developers; (5) Deep Research — Gemini Advanced can autonomously browse 50+ pages and produce a research report. ChatGPT has advantages in the GPT Store ecosystem, Custom GPTs, and DALL-E image generation.',
      hinglish:
        'Key differences: (1) Native multimodality — Gemini text, images, audio, aur video simultaneously train hua, GPT-4o ne baad mein add kiya; (2) Google integration — Gemini Search, Gmail, Docs, Drive, Meet mein built-in hai; (3) Context window — Gemini 1.5 Pro 1M tokens support karta hai vs GPT-4o ka 128K; (4) Free API tier — Gemini Flash bahut generous hai developers ke liye (15 req/min free); (5) Deep Research — Gemini Advanced 50+ pages browse karke research report banata hai. ChatGPT ka GPT Store ecosystem, Custom GPTs, aur DALL-E image generation mein advantage hai.',
    },
  },
  {
    question: 'What is included in Google One AI Premium (Gemini Advanced)?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Google One AI Premium ($20/month) includes: (1) Access to Google\'s most capable Gemini model (Ultra-class), (2) 1 million token context window, (3) Deep Research feature, (4) Full Gemini integration in all Google Workspace apps (Gmail, Docs, Sheets, Slides, Meet), (5) 2TB Google One storage (upgraded from 15GB), (6) Gemini Live (real-time voice conversation), (7) Gemini in Google Photos, (8) Priority access during high demand.',
      hinglish:
        'Google One AI Premium ($20/month) mein shamil hai: (1) Google ke sabse capable Gemini model (Ultra-class) access, (2) 1 million token context window, (3) Deep Research feature, (4) Saare Google Workspace apps mein full Gemini integration (Gmail, Docs, Sheets, Slides, Meet), (5) 2TB Google One storage (15GB se upgrade), (6) Gemini Live (real-time voice conversation), (7) Google Photos mein Gemini, (8) High demand pe priority access.',
    },
  },
  {
    question: 'What is Deep Research in Gemini?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Deep Research is a Gemini Advanced feature where Gemini autonomously browses 20–50+ web pages, synthesises the gathered information, and produces a comprehensive multi-page research report with citations — typically in 3–5 minutes. You provide a research topic, optionally edit Gemini\'s research plan, and it does the rest. It is far deeper than standard AI web browsing and is useful for competitive analysis, technology comparisons, literature surveys, and business research.',
      hinglish:
        'Deep Research ek Gemini Advanced feature hai jahan Gemini khud 20–50+ web pages browse karta hai, gathered information synthesize karta hai, aur citations ke saath comprehensive multi-page research report produce karta hai — typically 3–5 minutes mein. Tum research topic provide karte ho, optionally Gemini ke research plan edit karte ho, aur baaki Gemini karta hai. Ye standard AI web browsing se kaafi zyada deep hai aur competitive analysis, technology comparisons, literature surveys, aur business research ke liye useful hai.',
    },
  },
  {
    question: 'How do you access the Gemini API for free?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Go to aistudio.google.com, sign in with your Google account, and click "Get API key." No credit card is required. The free tier provides: Gemini 2.0 Flash at 15 requests per minute, 1,500 requests per day, and 1M tokens per minute — sufficient for development and small-scale apps. Install the SDK with npm install @google/generative-ai and use your key as the GEMINI_API_KEY environment variable.',
      hinglish:
        'aistudio.google.com pe jao, Google account se sign in karo, aur "Get API key" pe click karo. Credit card ki zarurat nahi hai. Free tier deta hai: Gemini 2.0 Flash 15 requests per minute, 1,500 requests per day, aur 1M tokens per minute — development aur small-scale apps ke liye kaafi. npm install @google/generative-ai se SDK install karo aur GEMINI_API_KEY environment variable ke roop mein key use karo.',
    },
  },
  {
    question: 'What is the difference between Gemini Flash and Gemini Pro?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Gemini Flash is optimised for speed and cost-efficiency — it is the cheapest Gemini model (~$0.075/1M input tokens) and best for high-volume tasks, real-time apps, simple summaries, and classification. It is available on the free tier. Gemini Pro is a balanced model optimised for complex reasoning, code generation, and detailed document analysis (~$1.25–2.50/1M input tokens). It offers higher quality than Flash for demanding tasks but costs more. Both support up to 1M token context windows.',
      hinglish:
        'Gemini Flash speed aur cost-efficiency ke liye optimized hai — ye sabse sasta Gemini model hai (~$0.075/1M input tokens) aur high-volume tasks, real-time apps, simple summaries, aur classification ke liye best hai. Free tier pe available hai. Gemini Pro balanced model hai complex reasoning, code generation, aur detailed document analysis ke liye optimized (~$1.25–2.50/1M input tokens). Ye demanding tasks ke liye Flash se higher quality deta hai par zyada costs hai. Dono up to 1M token context windows support karte hain.',
    },
  },
  {
    question: 'How does Gemini integrate with Google Workspace?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'With Gemini Advanced or a Google Workspace Business plan, Gemini integrates directly into: Gmail (draft emails, summarise email threads), Google Docs (write/rewrite content, summarise documents), Google Sheets (generate formulas from natural language, data insights), Google Slides (create full presentations, add speaker notes), and Google Meet (real-time captions, meeting summaries, action items, "Catch me up" for late joiners). This means you do not need to copy-paste between ChatGPT and your work apps — AI is built directly where you work.',
      hinglish:
        'Gemini Advanced ya Google Workspace Business plan ke saath, Gemini directly integrate hota hai: Gmail mein (emails draft karo, email threads summarize karo), Google Docs mein (content write/rewrite karo, documents summarize karo), Google Sheets mein (natural language se formulas generate karo, data insights), Google Slides mein (full presentations banao, speaker notes add karo), aur Google Meet mein (real-time captions, meeting summaries, action items, late joiners ke liye "Catch me up"). Iska matlab ye hai ki tum ChatGPT aur work apps ke beech copy-paste nahi karte — AI seedha wahan built hai jahan tum kaam karte ho.',
    },
  },
  {
    question: 'What is Google AI Studio?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Google AI Studio (aistudio.google.com) is a free, browser-based tool for developers to experiment with Gemini models. It lets you test prompts, compare models side by side, generate API keys (no credit card needed), configure system instructions, test multimodal inputs, and export ready-to-use code in Python, JavaScript, Android, Swift, or cURL. It is the fastest way to start building Gemini-powered apps without any setup — just sign in with a Google account.',
      hinglish:
        'Google AI Studio (aistudio.google.com) ek free, browser-based tool hai developers ke liye Gemini models ke saath experiment karne ke liye. Ye prompts test karne, models side by side compare karne, API keys generate karne (credit card nahi chahiye), system instructions configure karne, multimodal inputs test karne, aur Python, JavaScript, Android, Swift, ya cURL mein ready-to-use code export karne ki facility deta hai. Ye Gemini-powered apps build karne ka sabse fast way hai bina kisi setup ke — sirf Google account se sign in karo.',
    },
  },
  {
    question: 'What is the Gemini context window size and how does it compare to ChatGPT?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Gemini 1.5 Pro and 2.0 support a 1 million token context window, which is roughly 750,000 words, 1 hour of video, or 11 hours of audio. This is the largest context window among major AI models. ChatGPT Plus/Team/Enterprise uses GPT-4o with a 128K token context window (≈96,000 words). Gemini\'s 1M context enables processing entire codebases, long legal documents, or hour-long meeting videos in a single call — use cases that are impossible or require chunking with smaller context windows.',
      hinglish:
        'Gemini 1.5 Pro aur 2.0 ek 1 million token context window support karte hain, jo roughly 750,000 words, 1 ghante ka video, ya 11 ghante ka audio hai. Ye major AI models mein sabse bada context window hai. ChatGPT Plus/Team/Enterprise GPT-4o ke saath 128K token context window (≈96,000 words) use karta hai. Gemini ka 1M context entire codebases, long legal documents, ya hour-long meeting videos ek single call mein process karne ki suvidha deta hai — aisi use cases jo smaller context windows ke saath impossible ya chunking ki zarurat rakhti hain.',
    },
  },
  {
    question: 'How do you build a multimodal automation pipeline with Gemini?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A multimodal automation pipeline takes visual inputs (images, PDFs, screenshots) and extracts structured data at scale. The key steps: (1) Iterate over input files in a loop; (2) Read each file and encode as base64 inline data with the correct MIME type; (3) Call Gemini with a multimodal prompt — an array containing the file data part and a text part with the JSON schema to extract; (4) Use responseMimeType: "application/json" in generationConfig for reliable structured output; (5) Parse the returned JSON and write to CSV or a database; (6) Add rate-limit delays (4 seconds between calls on the free tier) and retry logic for 429 errors. This pattern replaces expensive dedicated OCR services and handles complex document layouts that traditional OCR misses.',
      hinglish:
        'Ek multimodal automation pipeline visual inputs (images, PDFs, screenshots) leta hai aur scale pe structured data extract karta hai. Key steps: (1) Loop mein input files ke upar iterate karo; (2) Har file padhke sahi MIME type ke saath base64 inline data ke roop mein encode karo; (3) Gemini ko multimodal prompt ke saath call karo — file data part aur extract karne ke liye JSON schema wale text part wala array; (4) Reliable structured output ke liye generationConfig mein responseMimeType: "application/json" use karo; (5) Returned JSON parse karo aur CSV ya database mein likho; (6) Rate-limit delays add karo (free tier pe calls ke beech 4 seconds) aur 429 errors ke liye retry logic. Ye pattern expensive dedicated OCR services replace karta hai aur complex document layouts handle karta hai jo traditional OCR miss karta hai.',
    },
  },
  {
    question: 'What is Google Search grounding in the Gemini API and when should you use it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Google Search grounding enables Gemini to search the web in real time before answering, overcoming its training data knowledge cutoff. Enable it by passing tools: [{ googleSearch: {} }] in your API request. The response includes groundingMetadata with sources and search queries used. Use it for: current pricing comparisons, fact-checking, news monitoring, competitive analysis, and any task where up-to-date information is critical. Avoid it for: code generation, internal document analysis, high-volume pipelines (the added cost per request adds up quickly). Grounding is available only on the paid API tier — not the free tier.',
      hinglish:
        'Google Search grounding Gemini ko jawaab dene se pehle real time mein web search karne ki suvidha deta hai, training data knowledge cutoff overcome karta hai. Enable karne ke liye apne API request mein tools: [{ googleSearch: {} }] pass karo. Response mein use kiye gaye sources aur search queries ke saath groundingMetadata shamil hota hai. Use karo: current pricing comparisons, fact-checking, news monitoring, competitive analysis, aur kisi bhi task ke liye jahan up-to-date information critical ho. Avoid karo: code generation, internal document analysis, high-volume pipelines (per request added cost quickly add up hoti hai). Grounding sirf paid API tier pe available hai — free tier pe nahi.',
    },
  },
  {
    question: 'What are few-shot prompting and chain-of-thought, and when does each technique help with Gemini?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Few-shot prompting provides 2–3 input→output examples directly in the prompt so the model learns the desired pattern rather than being told about it. It is most effective for: consistent output formats (JSON, tables), classification tasks, and when zero-shot output is structurally almost right but slightly off. Chain-of-thought (CoT) adds "Think through this step by step before answering" to force explicit reasoning before the final answer — most effective for: multi-step logic, math, and complex reasoning tasks where Gemini gives a wrong answer without guidance. They can be combined: include reasoning chains in your examples so the model learns both the reasoning style and the output format. Skip CoT for simple factual lookups and high-volume pipelines where latency and cost per token matter.',
      hinglish:
        'Few-shot prompting seedha prompt mein 2–3 input→output examples provide karta hai taaki model desired pattern seekhe rather than usके baare mein bataya jaye. Ye sabse effective hai: consistent output formats (JSON, tables), classification tasks, aur jab zero-shot output structurally almost right ho par thoda off ho. Chain-of-thought (CoT) "Think through this step by step before answering" add karta hai final answer se pehle explicit reasoning force karne ke liye — sabse effective hai: multi-step logic, math, aur complex reasoning tasks ke liye jahan Gemini bina guidance ke galat answer deta hai. Inhe combine kiya ja sakta hai: apne examples mein reasoning chains include karo taaki model reasoning style aur output format dono seekhe. Simple factual lookups aur high-volume pipelines ke liye CoT skip karo jahan latency aur cost per token matter karta hai.',
    },
  },
  {
    question: 'How does the systemInstruction parameter differ from a user message in the Gemini API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'systemInstruction is passed once when initialising the model with getGenerativeModel() and persists for the entire conversation — it sets the persona, task scope, output format, and constraints that apply to every response in that session. User messages change per turn and represent the actual conversation. A well-written system instruction includes: (1) Persona — who the model is playing; (2) Task scope — what it can and cannot answer; (3) Output format — how responses should be structured; (4) Constraints — what it must never do. The most common mistake is forgetting to specify an output format, which causes Gemini to default to unstructured prose even when JSON or a specific structure is needed.',
      hinglish:
        'systemInstruction ek baar getGenerativeModel() ke saath model initialize karte waqt pass kiya jaata hai aur poori conversation ke liye persist karta hai — ye persona, task scope, output format, aur constraints set karta hai jo us session ke har response pe apply hote hain. User messages per turn change hote hain aur actual conversation represent karte hain. Ek well-written system instruction mein shamil hai: (1) Persona — model kaun khel raha hai; (2) Task scope — kya answer kar sakta hai aur kya nahi; (3) Output format — responses kaise structured hone chahiye; (4) Constraints — kya kabhi nahi karna chahiye. Sabse common mistake output format specify karna bhool jaana hai, jo Gemini ko unstructured prose default karne ke liye cause karta hai tab bhi jab JSON ya specific structure chahiye.',
    },
  },
];
