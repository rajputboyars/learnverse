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

export const curriculum = [...fundamentals, ...keyFeatures, ...developerIntegration];

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
];
