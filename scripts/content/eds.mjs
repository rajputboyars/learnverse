// AEM Edge Delivery Services (EDS) curriculum — zero to hero, beginner -> intermediate -> advanced.
// Same shape as docker.mjs / git.mjs, consumed by scripts/seed.mjs.

import { deepDives } from './eds-deep-dives.mjs';

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'AEM Edge Delivery Services (EDS)',
  slug: 'eds',
  description:
    'Adobe Experience Manager Edge Delivery Services (pehle Franklin/Helix) zero se seekho — blocks, decorate(), content-as-a-doc model, performance philosophy aur deployment. MERN devs ke liye analogies ke saath, English + Hinglish mein.',
  icon: '⚡',
  tags: ['aem', 'eds', 'edge-delivery-services', 'adobe', 'franklin', 'frontend'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 0,
};

const beginner = [
  {
    title: 'EDS Fundamentals',
    level: 'beginner',
    description: 'EDS kya hai, kyun bana, aur ye traditional AEM se kaise alag hai.',
    concepts: [
      {
        title: 'The Story of EDS — What, Why & How',
        difficulty: 'easy',
        tags: ['eds', 'story', 'intro', 'basics'],
        explanation: {
          english:
            "📖 THE STORY\n\nMeet Priya, a marketing writer at a big brand. She wants to publish a new landing page TODAY. In the old AEM world, she opens a heavy Java-powered Author instance, drags components onto a page, waits for it to save, and a developer is on standby for anything custom. Publishing takes a review cycle and the page itself takes 4+ seconds to load because of all the server-side rendering machinery in between.\n\nAdobe looked at this and asked: what if authoring was as simple as typing in a Google Doc, and what if the published page was so simple it could be served straight from a CDN edge, no server round-trip at all? That question became EDS (originally called 'Helix', then 'Franklin', now officially Edge Delivery Services).\n\n──────────\n\n❓ WHAT is EDS?\nEDS is Adobe's approach to building websites where CONTENT lives in a Google Doc or SharePoint document (not a database/JCR), and CODE lives in a plain GitHub repo of HTML/CSS/vanilla JS (no framework, no build step). A pipeline automatically turns the document into fast static-ish HTML, and your code decorates it into a styled page.\n\n🤔 WHY EDS? (the problem it solves)\n• Authors need ZERO training — they already know Google Docs/Word.\n• Pages are absurdly fast — EDS sites regularly hit 100/100 on Lighthouse because there's barely any JavaScript blocking the first paint.\n• Developers write plain HTML/CSS/JS — no build pipeline, no framework version upgrades to chase.\n• Preview and publish are just two different document states — no complex approval workflow software needed.\n\n⚙️ HOW does it work? (3 simple words)\n1. Document — the author's Google Doc/Word file = the content source of truth.\n2. Pipeline — Adobe's service converts that document into HTML automatically.\n3. Block — your code (HTML/CSS/JS) that turns generic HTML into a styled, interactive section.\n\nFlow: author writes a doc → EDS converts it to plain HTML → your `decorate()` code in a block turns a section into the real UI → the CDN serves the final page, edge-cached, in milliseconds.",
          hinglish:
            "📖 KAHANI\n\nMilo Priya se, ek badi brand ki marketing writer. Use AAJ hi ek naya landing page publish karna hai. Purani AEM duniya mein, wo ek heavy Java-powered Author instance kholti hai, components ko page pe drag karti hai, save hone ka wait karti hai, aur kisi bhi custom cheez ke liye ek developer standby pe hota hai. Publish karne mein ek review cycle lagta hai aur page khud 4+ second leta hai load hone mein — beech mein itni saari server-side rendering machinery ki wajah se.\n\nAdobe ne ye dekha aur socha: agar authoring bhi utni hi simple ho jitni Google Doc mein type karna, aur agar published page itna simple ho ki wo seedha CDN edge se serve ho jaaye, koi server round-trip hi nahi — to? Yahi sawal EDS bana (pehle naam tha 'Helix', phir 'Franklin', ab officially Edge Delivery Services).\n\n──────────\n\n❓ WHAT — EDS hai kya?\nEDS Adobe ka ek approach hai websites banane ka jisme CONTENT ek Google Doc ya SharePoint document mein rehta hai (database/JCR mein nahi), aur CODE ek plain GitHub repo mein rehta hai — HTML/CSS/vanilla JS (koi framework nahi, koi build step nahi). Ek pipeline automatically document ko fast static-jaisi HTML mein badal deti hai, aur tumhara code use decorate karke styled page banata hai.\n\n🤔 WHY — EDS kyun? (kaunsi problem solve karta hai)\n• Authors ko ZERO training chahiye — unhe already Google Docs/Word aata hai.\n• Pages bilkul crazy fast hote hain — EDS sites aksar Lighthouse pe 100/100 leti hain kyunki shuru mein bahut kam JavaScript first paint ko block karta hai.\n• Developers plain HTML/CSS/JS likhte hain — koi build pipeline nahi, koi framework version upgrade chase karne ki zaroorat nahi.\n• Preview aur publish sirf ek document ki do alag states hain — koi complex approval workflow software nahi chahiye.\n\n⚙️ HOW — kaise kaam karta hai? (3 simple shabd)\n1. Document — author ka Google Doc/Word file = content ka source of truth.\n2. Pipeline — Adobe ki service us document ko automatically HTML mein convert karti hai.\n3. Block — tumhara code (HTML/CSS/JS) jo generic HTML ko styled, interactive section banata hai.\n\nFlow: author ek doc likhta hai → EDS use plain HTML mein convert karta hai → tumhara `decorate()` code ek block mein section ko real UI banata hai → CDN final page serve karta hai, edge-cached, milliseconds mein.",
        },
        dailyLifeExample:
          'Socho ek dhaba ka menu card. Purane AEM mein, menu badalne ke liye tumhe printer ko call karna padta, design bhejna padta, print hone ka wait karna padta — slow aur developer-dependent. EDS mein, dhaba wala khud ek Google Doc mein menu likhta hai jaise Word mein likhta ho, aur wahi automatically website pe sundar dikh jaata hai — waiter (developer) ne bas ek baar "menu card ka design" (block ka CSS) bana diya tha, ab use bas content daalna hai.',
        codeExample:
          '# The EDS flow, in 3 words\n\n# 1) DOCUMENT — author writes in Google Docs / Word\n#    "Welcome to Acme Corp" + an image + a "Cards" table\n\n# 2) PIPELINE — EDS auto-generates plain HTML from the doc\n#    <div class="cards">...</div>  (generic, unstyled)\n\n# 3) BLOCK — your decorate() code + CSS style it\n#    blocks/cards/cards.js  ->  turns divs into <ul><li>\n#    blocks/cards/cards.css ->  grid layout, spacing, colors\n\n# Result: a fast, styled page served from the CDN edge',
        keyPoints: [
          'EDS = content in a Google Doc/SharePoint doc, code in a plain GitHub repo',
          'No database/JCR for content, no build step for code',
          'Optimised for two things: near-instant authoring AND near-100 Lighthouse scores',
          'Formerly called Helix, then Franklin — now Edge Delivery Services',
        ],
        quiz: [
          {
            question: 'In EDS, where does page content actually live?',
            options: [
              'A MongoDB/JCR database',
              'A Google Doc or SharePoint document',
              'Hardcoded inside the React components',
              'An AEM Author instance content tree',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the biggest reason EDS sites score so high on Lighthouse?',
            options: [
              'They use server-side caching only',
              'They ship very little blocking JavaScript and no heavy framework runtime',
              'They disable all images',
              'They are hosted on a faster country',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is AEM Edge Delivery Services, in one line, and what problem does it solve?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                "EDS is Adobe's content-as-a-document approach to building websites: authors write content in Google Docs/SharePoint (no CMS training needed) while developers write plain HTML/CSS/JS blocks (no build step); it solves both the 'authoring is slow and technical' problem and the 'websites are bloated and slow' problem at the same time.",
              hinglish:
                "EDS Adobe ka content-as-a-document approach hai websites banane ka: authors Google Docs/SharePoint mein content likhte hain (koi CMS training nahi chahiye) jabki developers plain HTML/CSS/JS blocks likhte hain (koi build step nahi); ye 'authoring slow aur technical hai' problem aur 'websites bloated aur slow hain' problem dono ek saath solve karta hai.",
            },
          },
        ],
      },
      {
        title: 'Content vs Code — The Two-Repo Model',
        difficulty: 'easy',
        tags: ['eds', 'architecture', 'content', 'code'],
        explanation: {
          english:
            "EDS strictly separates two things that live in different places. CONTENT lives in Google Drive/SharePoint as documents — one document per page, editable by non-technical authors, with its own versioning and permissions. CODE lives in a GitHub repo containing blocks (HTML/CSS/JS), global styles, and scripts — editable by developers, with normal git workflow (PRs, review, CI). A background pipeline watches the document source and regenerates HTML whenever a document changes; your code never touches content directly, it only decorates whatever HTML the pipeline hands it.\n\nThis split means authors can publish 10 times a day without ever opening a code editor, and developers can ship code changes without ever touching content — the two lifecycles are fully decoupled, unlike a typical CMS where content and template logic are tightly coupled in the same system.",
          hinglish:
            "EDS strictly do cheezon ko alag rakhta hai jo alag jagah rehti hain. CONTENT Google Drive/SharePoint mein documents ki tarah rehta hai — har page ke liye ek document, non-technical authors dwara editable, apni khud ki versioning aur permissions ke saath. CODE ek GitHub repo mein rehta hai jisme blocks (HTML/CSS/JS), global styles, aur scripts hote hain — developers dwara editable, normal git workflow ke saath (PRs, review, CI). Ek background pipeline document source ko dekhti rehti hai aur jab bhi document change hota hai HTML dobara generate karti hai; tumhara code kabhi content ko directly touch nahi karta, wo sirf jo bhi HTML pipeline deti hai use decorate karta hai.\n\nYe split matlab authors din mein 10 baar publish kar sakte hain bina kabhi code editor khole, aur developers content chhue bina code changes ship kar sakte hain — dono lifecycles poori tarah decoupled hain, unlike ek typical CMS jahan content aur template logic same system mein tightly coupled hote hain.",
        },
        dailyLifeExample:
          'Ye ek restaurant jaisa hai jahan chef (developer) kitchen ka setup aur recipe format design karta hai (code repo), aur menu-writer (content author) sirf naye dishes ka naam-price ek notebook (Google Doc) mein likhta rehta hai. Chef ko har naye dish ke liye kitchen dobara nahi banani padti, aur menu-writer ko kabhi kitchen mein ghusna nahi padta.',
        codeExample:
          '# Two separate "places"\n\n# CONTENT (Google Drive / SharePoint)\n#   /site/index.docx\n#   /site/about-us.docx\n#   -> owned by authors, no code inside\n\n# CODE (GitHub repo)\n#   blocks/cards/cards.js\n#   blocks/cards/cards.css\n#   styles/styles.css\n#   scripts/scripts.js\n#   -> owned by developers, normal git PR workflow\n\n# A background pipeline connects the two:\n# doc saved -> pipeline regenerates HTML -> your blocks decorate it',
        keyPoints: [
          'Content = documents in Drive/SharePoint, owned by authors',
          'Code = plain HTML/CSS/JS repo on GitHub, owned by developers',
          'The two lifecycles are fully decoupled — no build step ties them together',
          'A pipeline regenerates HTML automatically whenever a document changes',
        ],
        quiz: [
          {
            question: 'Why does the two-repo (content/code) split matter?',
            options: [
              'It makes the site slower on purpose',
              'It decouples author publishing speed from developer release cycles',
              'It is required by GitHub',
              'It removes the need for CSS entirely',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How does EDS keep content authors and developers from blocking each other?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                "By physically separating content (a Google Doc/SharePoint document, edited by authors) from code (an HTML/CSS/JS repo, edited by developers). A pipeline regenerates HTML whenever a document changes, so authors publish without touching code, and developers ship code changes without touching content — the two workflows never block each other.",
              hinglish:
                "Content (ek Google Doc/SharePoint document, authors dwara edited) ko code (ek HTML/CSS/JS repo, developers dwara edited) se physically alag rakh ke. Jab bhi document change hota hai, ek pipeline HTML regenerate karti hai, isliye authors code chhue bina publish karte hain, aur developers content chhue bina code changes ship karte hain — dono workflows kabhi ek doosre ko block nahi karte.",
            },
          },
        ],
      },
      {
        title: 'Anatomy of an EDS Project',
        difficulty: 'easy',
        tags: ['eds', 'project-structure', 'files'],
        explanation: {
          english:
            "Every EDS code repo follows a predictable shape. `blocks/` holds one folder per component, each with a `.js` (must export a default `decorate` function) and a `.css`. `scripts/scripts.js` is the core engine that scans the page, finds blocks, and calls their `decorate()` — you rarely edit it. `scripts/aem.js` is a vendored helper library (image optimisation, lazy-loading helpers) that you should never edit directly, since Adobe updates it upstream. `styles/styles.css` holds global styles and CSS custom properties (colors, fonts) shared by all blocks. `head.html` injects shared `<head>` content (meta tags, fonts) into every page. There is deliberately NO `package.json` build script that bundles anything for production — files are served to the browser largely as-is, which is exactly why there's no build step to configure.",
          hinglish:
            "Har EDS code repo ek predictable shape follow karta hai. `blocks/` mein har component ke liye ek folder hota hai, har ek ke andar `.js` (jisme default `decorate` function export hona chahiye) aur `.css`. `scripts/scripts.js` core engine hai jo page scan karta hai, blocks dhoondta hai, aur unka `decorate()` call karta hai — tum ise kam hi edit karte ho. `scripts/aem.js` ek vendored helper library hai (image optimisation, lazy-loading helpers) jise tumhe kabhi directly edit nahi karna chahiye, kyunki Adobe ise upstream update karta hai. `styles/styles.css` mein global styles aur CSS custom properties (colors, fonts) hote hain jo sab blocks share karte hain. `head.html` har page mein shared `<head>` content (meta tags, fonts) inject karta hai. Jaan-boojh kar koi `package.json` build script NAHI hota jo production ke liye kuch bundle kare — files browser ko mostly as-is serve hoti hain, isiliye koi build step configure karne ki zaroorat nahi.",
        },
        dailyLifeExample:
          'Ye ek almirah jaisa hai jisme har cheez ki apni fixed jagah hai — mojo ki drawer (`blocks/`), ghar ke rules ki list deewar pe (`scripts/scripts.js`), aur ek family photo frame jo har kamre mein same dikhta hai (`head.html`). Naye ghar (naya project) mein bhi ye hi structure milega, isliye tum kahin bhi jaake foran kaam shuru kar sakte ho.',
        codeExample:
          'my-eds-project/\n├── blocks/\n│   ├── cards/\n│   │   ├── cards.js\n│   │   └── cards.css\n│   └── hero/\n│       ├── hero.js\n│       └── hero.css\n├── styles/\n│   └── styles.css        # global CSS variables\n├── scripts/\n│   ├── scripts.js        # core engine — rarely edited\n│   └── aem.js             # vendored helpers — never edited\n├── icons/\n│   └── *.svg\n├── head.html              # shared <head> content\n└── 404.html',
        keyPoints: [
          '`blocks/<name>/<name>.js` must export a default decorate(block) function',
          '`scripts/aem.js` is vendored — never edit it directly',
          '`styles/styles.css` holds shared CSS variables (colors, fonts, spacing)',
          'No production build/bundle step — files ship close to as-written',
        ],
        quiz: [
          {
            question: 'Which file should you almost never directly edit in an EDS project?',
            options: ['blocks/cards/cards.css', 'scripts/aem.js', 'blocks/hero/hero.js', 'head.html'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What does a typical EDS repo structure look like, and why is scripts/aem.js special?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                "A typical repo has blocks/ (one folder per component with a .js decorate function + .css), scripts/scripts.js (the orchestration engine), styles/styles.css (global styles), and head.html (shared head content). scripts/aem.js is a vendored core library maintained by Adobe — you import helpers from it (like createOptimizedPicture) but never edit it, since upstream updates would overwrite or conflict with local changes.",
              hinglish:
                "Ek typical repo mein blocks/ (har component ke liye ek folder, .js decorate function + .css ke saath), scripts/scripts.js (orchestration engine), styles/styles.css (global styles), aur head.html (shared head content) hota hai. scripts/aem.js Adobe dwara maintained ek vendored core library hai — tum isse helpers import karte ho (jaise createOptimizedPicture) par kabhi edit nahi karte, kyunki upstream updates local changes ko overwrite ya conflict kar sakte hain.",
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Local Development',
    level: 'beginner',
    description: 'Local mein EDS project chalana, aur blocks/sections ka basic mental model.',
    concepts: [
      {
        title: 'Setting Up Local Dev with the AEM CLI',
        difficulty: 'easy',
        tags: ['eds', 'setup', 'aem-cli', 'local-dev'],
        explanation: {
          english:
            "To run an EDS project locally you don't need Java, Docker, or a database — just Node.js and Adobe's CLI. Clone (or fork) the boilerplate repo, run `npm install` for dev tooling (linting, not bundling), then run `npx -y @adobe/aem-cli up`. This starts a local server (default `http://localhost:3000`) that serves your local `blocks/`, `styles/`, and `scripts/` files directly from disk — but PROXIES actual page content from the remote document source (Google Drive/SharePoint) configured for that project. So you see real, live content styled by code you're editing locally, and every save to a block's `.js`/`.css` reflects on refresh with no rebuild step.",
          hinglish:
            "EDS project local mein chalane ke liye tumhe Java, Docker, ya database nahi chahiye — bas Node.js aur Adobe ka CLI. Boilerplate repo clone (ya fork) karo, dev tooling ke liye `npm install` chalao (linting, bundling nahi), phir `npx -y @adobe/aem-cli up` chalao. Ye ek local server start karta hai (default `http://localhost:3000`) jo tumhari local `blocks/`, `styles/`, aur `scripts/` files ko seedha disk se serve karta hai — par actual page content ko remote document source (Google Drive/SharePoint) se PROXY karta hai jo us project ke liye configure hai. Isliye tumhe real, live content dikhta hai jo tumhare locally edit kiye code se styled hai, aur block ki `.js`/`.css` mein har save refresh pe dikh jaata hai bina kisi rebuild step ke.",
        },
        dailyLifeExample:
          'Ye ek live TV rehearsal jaisa hai — actual show ka script (content) studio se aa raha hai (proxy), par stage decoration, lighting, camera angles (blocks/CSS/JS) tum apne local set pe test kar rahe ho. Change karo lighting, foran dikhega — bina show dobara record kiye.',
        codeExample:
          '# One-time setup\ngit clone https://github.com/adobe/aem-boilerplate.git my-project\ncd my-project\nnpm install\n\n# Start local dev server (proxies real content, serves local code)\nnpx -y @adobe/aem-cli up\n# -> http://localhost:3000\n\n# Edit blocks/cards/cards.css, save, refresh browser — no build needed',
        keyPoints: [
          'Only Node.js + `@adobe/aem-cli` needed for local dev — no Java/Docker/DB',
          '`aem-cli up` serves local blocks/styles/scripts but proxies remote content',
          'Changes to a block\'s JS/CSS show up on browser refresh, no rebuild step',
          'You are always previewing real content, styled by code you control',
        ],
        quiz: [
          {
            question: 'When you run the local AEM dev server, where does the page CONTENT come from?',
            options: [
              'A local JSON file you write',
              'A local MongoDB instance',
              'It is proxied from the remote Google Drive/SharePoint document source',
              'It is randomly generated',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you set up and run an EDS project locally, and what exactly gets proxied vs served locally?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                "Clone the boilerplate, run `npm install`, then `npx -y @adobe/aem-cli up`. The local server serves your code (blocks, styles, scripts) directly from disk, so edits are instantly visible on refresh, while actual page CONTENT is proxied live from the project's configured Google Drive/SharePoint document source — meaning you never need to fake or mock content locally.",
              hinglish:
                "Boilerplate clone karo, `npm install` chalao, phir `npx -y @adobe/aem-cli up`. Local server tumhara code (blocks, styles, scripts) seedha disk se serve karta hai, isliye edits refresh pe turant dikhte hain, jabki actual page CONTENT project ke configured Google Drive/SharePoint document source se live proxy hota hai — matlab tumhe kabhi local content fake ya mock nahi karna padta.",
            },
          },
        ],
      },
      {
        title: 'What is a Block?',
        difficulty: 'easy',
        tags: ['eds', 'blocks', 'components'],
        explanation: {
          english:
            "A Block is EDS's unit of reusable UI — conceptually a component, like a React component, but written in vanilla HTML/CSS/JS with no framework. An author signals 'I want a Cards block here' by typing a table into the Google Doc where the FIRST CELL of the first row names the block (e.g. \"Cards\"), and every following row is one item. The pipeline turns that table into a generic `<div class=\"cards\">...</div>` with nested divs. Your code in `blocks/cards/cards.js` then recognises that class name, runs its `decorate()` function on it, and produces real, semantic, styled markup. Blocks are self-contained: their JS and CSS only ever touch elements inside their own block, which is what makes them safely reusable across any page.",
          hinglish:
            "Block EDS ka reusable UI unit hai — conceptually ek component, React component jaisa, par vanilla HTML/CSS/JS mein likha, koi framework nahi. Ek author 'yahan mujhe Cards block chahiye' signal karta hai Google Doc mein ek table type karke jahan pehli row ka PEHLA CELL block ka naam batata hai (jaise \"Cards\"), aur uske baad ki har row ek item hai. Pipeline us table ko ek generic `<div class=\"cards\">...</div>` mein nested divs ke saath badal deti hai. Tumhara code `blocks/cards/cards.js` mein us class name ko pehchanta hai, uspar apna `decorate()` function chalata hai, aur real, semantic, styled markup banata hai. Blocks self-contained hote hain: unka JS aur CSS sirf apne block ke andar ke elements ko touch karte hain, isi wajah se wo kisi bhi page pe safely reuse ho sakte hain.",
        },
        dailyLifeExample:
          'Ek block wo hai jaise tumhare paas ek "chai banane ki tapri" ka fixed setup hai — kettle, cups, masala sab jagah pe. Customer (author) sirf order deta hai "ek adrak wali chai" (content), aur wahi fixed setup (block ka code) use hamesha same tarike se bana deta hai, chahe kitni baar order aaye.',
        codeExample:
          "// What the author typed in Google Docs becomes this raw HTML:\n// <div class=\"cards\">\n//   <div><div><picture>...</picture></div><div>Fast Performance</div></div>\n//   <div><div><picture>...</picture></div><div>Easy to Use</div></div>\n// </div>\n\n// blocks/cards/cards.js — your job: turn the raw divs above into semantic HTML\nexport default function decorate(block) {\n  const ul = document.createElement('ul');\n  [...block.children].forEach((row) => {\n    const li = document.createElement('li');\n    li.innerHTML = row.innerHTML;\n    ul.append(li);\n  });\n  block.textContent = '';\n  block.append(ul);\n}",
        keyPoints: [
          'A block = a reusable UI unit, authored via a named table in the doc',
          'The FIRST cell of the first row names the block (e.g. "Cards")',
          'The pipeline auto-generates raw, generic HTML for that table',
          'Your block\'s decorate() + CSS turn it into real, styled UI',
        ],
        quiz: [
          {
            question: 'How does an author tell EDS which block to render for a section?',
            options: [
              'By writing a special comment in the doc',
              'By naming the block in the first cell of a table in the Google Doc',
              'By emailing the developer',
              'Blocks cannot be triggered by authors',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the closest MERN/React equivalent of an EDS block?',
            options: ['A MongoDB schema', 'A React component, but written without JSX/a framework', 'An Express middleware', 'A Redux reducer'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain what a "block" is in EDS and how an author triggers one without writing any code.',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                "A block is EDS's reusable UI unit — conceptually like a component. An author triggers one by typing a table into their Google Doc whose first cell names the block (e.g. \"Cards\"); EDS converts that table into generic HTML with the block's name as a class, and the matching blocks/<name>/<name>.js file's decorate() function transforms that generic HTML into real, styled UI.",
              hinglish:
                "Block EDS ka reusable UI unit hai — conceptually ek component jaisa. Author isse trigger karta hai apne Google Doc mein ek table type karke jiska pehla cell block ka naam batata hai (jaise \"Cards\"); EDS us table ko generic HTML mein convert karta hai block ke naam ko class banake, aur matching blocks/<name>/<name>.js file ka decorate() function us generic HTML ko real, styled UI mein transform karta hai.",
            },
          },
        ],
      },
      {
        title: 'Sections, Metadata & Document-Based Authoring',
        difficulty: 'medium',
        tags: ['eds', 'sections', 'metadata', 'authoring'],
        explanation: {
          english:
            "Beyond blocks, an EDS document has two more authoring conventions. A SECTION is a group of content separated by a horizontal rule (`---` in the doc) — the pipeline wraps each section in its own `<div class=\"section\">`, so an author can stack a hero, then a cards block, then a text block, just by drawing lines between them. METADATA is a special table (first cell literally says \"Metadata\") anywhere in the doc that sets page-level values like title, description, and OpenGraph image — read by `scripts.js` and injected into `<head>` — so SEO fields are author-editable without touching code. Together, sections + blocks + metadata mean an entire page's structure, components, and SEO can be fully authored from a single Word-processor document.",
          hinglish:
            "Blocks ke alawa, ek EDS document mein do aur authoring conventions hoti hain. SECTION content ka ek group hota hai jo horizontal rule (doc mein `---`) se separate hota hai — pipeline har section ko apne khud ke `<div class=\"section\">` mein wrap karti hai, isliye ek author hero, phir ek cards block, phir ek text block stack kar sakta hai, bas unke beech line kheench ke. METADATA doc mein kahin bhi ek special table hota hai (pehla cell literally \"Metadata\" kehta hai) jo page-level values set karta hai jaise title, description, aur OpenGraph image — jo `scripts.js` padhta hai aur `<head>` mein inject karta hai — isliye SEO fields code chhue bina author-editable hote hain. Sections + blocks + metadata milke matlab poore page ka structure, components, aur SEO sab kuch ek single Word-processor document se hi author ho sakta hai.",
        },
        dailyLifeExample:
          'Ye ek shaadi ke card jaisa hai — har paragraph ke beech ek decorative line (section break) hoti hai jo alag-alag hisso ko divide karti hai (venue details, family names, RSVP), aur peeche ek chhota "printer ke liye note" (metadata) hota hai jo batata hai ki envelope pe kya likhna hai — bina poora card dobara design kiye.',
        codeExample:
          '# In the Google Doc, authors separate sections with a horizontal rule:\n\n# [Hero content]\n# ---\n# | Cards |\n# | ... |\n# ---\n# [closing text]\n\n# And add an SEO metadata table anywhere:\n# | Metadata |\n# | Title | Acme Corp — Home |\n# | Description | Fast, reliable widgets since 1999 |\n# | Image | (a hero image) |',
        keyPoints: [
          '`---` in the doc creates a new <div class="section"> wrapper',
          'A "Metadata" table sets page title/description/OG image — no code needed',
          'Sections let authors compose a page purely by stacking content and lines',
          'SEO becomes an authoring concern, not a developer task',
        ],
        quiz: [
          {
            question: 'How does an author create a new "section" boundary in an EDS document?',
            options: [
              'By pressing a special hotkey Adobe assigns',
              'By inserting a horizontal rule between groups of content',
              'By emailing the dev team',
              'Sections cannot be author-created',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How can a non-technical author control a page\'s SEO title/description in EDS without touching code?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "By adding a \"Metadata\" table anywhere in the document — its first cell literally reads \"Metadata\", followed by rows like Title/Description/Image. scripts.js reads this table when generating the page and injects the values into the <head>, so SEO fields are fully author-editable from the same document used for content.",
              hinglish:
                "Document mein kahin bhi ek \"Metadata\" table add karke — jiska pehla cell literally \"Metadata\" hota hai, uske baad Title/Description/Image jaisi rows. scripts.js page generate karte waqt is table ko padhta hai aur values ko <head> mein inject karta hai, isliye SEO fields uss hi document se fully author-editable hote hain jo content ke liye use hota hai.",
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Building Blocks',
    level: 'intermediate',
    description: 'decorate() ka deep dive aur ek real block khud banana.',
    concepts: [
      {
        title: 'The decorate() Function Explained',
        difficulty: 'medium',
        tags: ['eds', 'decorate', 'dom', 'blocks'],
        explanation: {
          english:
            "Every block's `.js` file must have a `default export`ed function that receives one argument — the block's own raw DOM element (e.g. the `<div class=\"cards\">` the pipeline generated) — and mutates it in place. This is called AUTOMATICALLY by `scripts/scripts.js` for every element on the page whose class matches a folder name in `blocks/`; you never call it yourself in production. Inside `decorate()`, you use plain DOM APIs — `document.createElement`, `.append()`, `.querySelectorAll()`, `.classList` — because there is no virtual DOM or framework doing this for you. The typical pattern is: read the raw child divs (each one is a 'row' from the author's table), rebuild them into semantic elements (`<ul><li>`, `<blockquote>`, etc.), assign meaningful class names, and replace the block's original content with the new structure.",
          hinglish:
            "Har block ki `.js` file mein ek `default export` hua function hona chahiye jo ek argument leta hai — block ka apna raw DOM element (jaise pipeline ne generate kiya `<div class=\"cards\">`) — aur use in-place mutate karta hai. Ise `scripts/scripts.js` AUTOMATICALLY call karta hai page ke har us element ke liye jiska class `blocks/` mein kisi folder-naam se match karta hai; production mein tum ise khud kabhi call nahi karte. `decorate()` ke andar, tum plain DOM APIs use karte ho — `document.createElement`, `.append()`, `.querySelectorAll()`, `.classList` — kyunki koi virtual DOM ya framework ye tumhare liye nahi kar raha. Typical pattern hai: raw child divs padho (har ek author ke table ki ek 'row' hai), unhe semantic elements mein rebuild karo (`<ul><li>`, `<blockquote>`, etc.), meaningful class names do, aur block ke original content ko naye structure se replace karo.",
        },
        dailyLifeExample:
          'Ye ek tailor jaisa hai jise ek bore-sa, plain kapda (raw HTML) mil raha hai, aur uska kaam hai use ek fitted, sundar kurta (styled block) bana dena — measurements khud lena (querySelectorAll), cut karna (createElement), aur final piece deliver karna (replaceChildren) — sab kuch by hand, koi automated sewing machine (framework) nahi.',
        codeExample:
          "// blocks/quote/quote.js\nexport default function decorate(block) {\n  const rows = [...block.children];\n  const quoteText = rows[0]?.textContent.trim();\n  const author = rows[1]?.textContent.trim();\n\n  block.innerHTML = '';\n\n  const blockquote = document.createElement('blockquote');\n  blockquote.textContent = quoteText;\n  block.append(blockquote);\n\n  if (author) {\n    const cite = document.createElement('cite');\n    cite.textContent = `— ${author}`;\n    block.append(cite);\n  }\n}\n// scripts.js calls decorate(blockElement) automatically — you never call it yourself",
        keyPoints: [
          'decorate(block) must be the default export of a block\'s .js file',
          'It is called automatically by scripts.js — never invoked manually in production',
          'You manipulate the DOM directly (createElement, append, classList) — no framework',
          'Typical job: turn raw author divs into semantic, styled markup',
        ],
        quiz: [
          {
            question: 'Who calls a block\'s decorate() function, and when?',
            options: [
              'The developer, manually, on every page load',
              'scripts.js, automatically, for every block-class element found on the page',
              'The author, by clicking a button in the Google Doc',
              'It runs once at build time',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why does EDS block code use document.createElement instead of JSX?',
            options: [
              'JSX is banned by Adobe',
              'There is no framework/virtual DOM — you manipulate the real DOM directly',
              'createElement is faster to type',
              'JSX cannot create <li> elements',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Walk through what happens, step by step, from an author saving a doc to a block\'s decorate() running.',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "1) The author saves a Google Doc containing a named table, e.g. \"Cards\". 2) EDS's pipeline converts the doc into generic HTML, turning the table into a <div class=\"cards\"> with nested, unstyled divs (one per row). 3) When a browser loads the page, scripts.js scans the DOM, finds every element whose class matches a folder under blocks/, dynamically imports that block's JS, and calls its default-exported decorate(block) function, passing the raw element. 4) decorate() rebuilds the raw divs into semantic markup and the block's CSS is loaded to style it.",
              hinglish:
                "1) Author ek Google Doc save karta hai jisme ek named table hai, jaise \"Cards\". 2) EDS ki pipeline doc ko generic HTML mein convert karti hai, table ko ek <div class=\"cards\"> banati hai jisme nested, unstyled divs hote hain (har row ke liye ek). 3) Jab browser page load karta hai, scripts.js DOM scan karta hai, har us element ko dhoondta hai jiska class blocks/ ke kisi folder se match karta hai, us block ki JS ko dynamically import karta hai, aur uska default-exported decorate(block) function call karta hai, raw element pass karke. 4) decorate() raw divs ko semantic markup mein rebuild karta hai aur block ka CSS use style karne ke liye load hota hai.",
            },
          },
        ],
      },
      {
        title: 'Building Your First Block, Step by Step',
        difficulty: 'medium',
        tags: ['eds', 'blocks', 'hands-on', 'tutorial'],
        explanation: {
          english:
            "Building a new block is a 3-file, 3-step process. STEP 1 — plan the doc shape: decide what the author's table will look like (e.g. a \"Quote\" block: row 1 = quote text, row 2 = author name). STEP 2 — write `blocks/<name>/<name>.js` exporting a default `decorate(block)` that reads `block.children` (each child = one row), extracts what you need with defensive optional chaining, clears the block, and appends new semantic elements. STEP 3 — write `blocks/<name>/<name>.css`, ALWAYS scoped under the block's own class (e.g. `.quote blockquote { ... }`) so it can never leak into other blocks. To verify locally without a real doc yet, you can drop a small standalone HTML file with the raw block markup, import the block's JS as a module, and call `decorate()` on the element manually — a fast way to iterate before wiring up real content.",
          hinglish:
            "Naya block banana ek 3-file, 3-step process hai. STEP 1 — doc ka shape plan karo: socho author ka table kaisa dikhega (jaise ek \"Quote\" block: row 1 = quote text, row 2 = author name). STEP 2 — `blocks/<name>/<name>.js` likho jo default `decorate(block)` export kare jo `block.children` padhe (har child = ek row), jo chahiye wo defensive optional chaining se nikaale, block ko clear kare, aur naye semantic elements append kare. STEP 3 — `blocks/<name>/<name>.css` likho, HAMESHA block ki apni class ke andar scoped (jaise `.quote blockquote { ... }`) taaki wo kabhi doosre blocks mein leak na ho. Bina real doc ke locally verify karne ke liye, tum ek chhoti standalone HTML file bana sakte ho raw block markup ke saath, block ki JS ko module ki tarah import karo, aur element pe manually `decorate()` call karo — real content wire karne se pehle fast iterate karne ka tarika.",
        },
        dailyLifeExample:
          'Ye bilkul nayi recipe test karne jaisa hai — pehle socho ingredients kya honge (doc shape), phir recipe likho (JS), phir plate/presentation decide karo (CSS), aur final serve karne se pehle ek chhoti batch ghar pe try karo (local test file) taaki restaurant mein serve karne se pehle pata chal jaaye sab sahi hai.',
        codeExample:
          "// STEP 1: doc shape (row 1 = quote, row 2 = author)\n// STEP 2: blocks/quote/quote.js\nexport default function decorate(block) {\n  const rows = [...block.children];\n  const text = rows[0]?.textContent.trim();\n  const author = rows[1]?.textContent.trim();\n  block.innerHTML = '';\n  const bq = document.createElement('blockquote');\n  bq.textContent = text;\n  block.append(bq);\n  if (author) {\n    const cite = document.createElement('cite');\n    cite.textContent = `— ${author}`;\n    block.append(cite);\n  }\n}\n\n// STEP 3: blocks/quote/quote.css\n// .quote blockquote { font-size: 1.5rem; font-style: italic; }\n// .quote cite { display: block; font-weight: 600; }\n\n// Quick local test (no real doc needed yet):\n// <div class=\"quote\"><div><div>Text</div></div><div><div>Author</div></div></div>\n// <script type=\"module\">\n//   import decorate from '/blocks/quote/quote.js';\n//   decorate(document.querySelector('.quote'));\n// </script>",
        keyPoints: [
          'Plan the author-facing table shape before writing any code',
          'decorate() reads block.children as "rows" and rebuilds semantic markup',
          'CSS must be scoped under the block\'s own class, always',
          'You can test decorate() locally with a small static HTML file, no real doc needed',
        ],
        quiz: [
          {
            question: 'What is the correct order of steps when building a new EDS block?',
            options: [
              'Write CSS, then JS, then plan the doc shape',
              'Plan the author\'s table shape, write decorate() in JS, then write scoped CSS',
              'Deploy first, then write the code',
              'Ask Adobe support to generate the block',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you build and locally verify a brand-new EDS block before any content author touches it?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "First design the doc table shape the author will type (which row means what). Then create blocks/<name>/<name>.js exporting a decorate(block) that defensively reads block.children and rebuilds semantic HTML, plus blocks/<name>/<name>.css scoped to the block's class. To verify before real content exists, write a small static HTML file with the raw block markup the pipeline would generate, import the block's JS as a module, and call decorate() on the element manually in a browser.",
              hinglish:
                "Pehle doc table ka shape design karo jo author type karega (kaunsi row ka kya matlab hai). Phir blocks/<name>/<name>.js banao jo ek decorate(block) export kare jo defensively block.children padhe aur semantic HTML rebuild kare, plus blocks/<name>/<name>.css jo block ki class tak scoped ho. Real content aane se pehle verify karne ke liye, ek chhoti static HTML file likho jisme wo raw block markup ho jo pipeline generate karti, block ki JS ko module ki tarah import karo, aur browser mein element pe manually decorate() call karo.",
            },
          },
        ],
      },
      {
        title: 'Defensive Coding & CSS Scoping Conventions',
        difficulty: 'medium',
        tags: ['eds', 'best-practices', 'css', 'conventions'],
        explanation: {
          english:
            "Two conventions separate a fragile EDS block from a production-ready one. DEFENSIVE CODING: because non-technical authors edit the underlying doc directly, they can — and will — omit rows, add extra rows, leave cells empty, or reorder things. Your `decorate()` must never assume a fixed shape; always use optional chaining (`rows[1]?.textContent`), check `if` a value exists before using it, and handle missing images/links gracefully instead of throwing. CSS SCOPING: every selector in a block's CSS file must be prefixed with the block's own class (`.quote blockquote`, never a bare `blockquote`), because all blocks' CSS files load on every page — an unscoped rule silently leaks and breaks unrelated blocks elsewhere on the page. The convention also reserves `-wrapper` and `-container` suffixes (e.g. `.quote-wrapper`) for the SECTION-level classes EDS adds automatically, not for your own block-internal classes, to avoid naming collisions.",
          hinglish:
            "Do conventions ek fragile EDS block ko ek production-ready block se alag karti hain. DEFENSIVE CODING: kyunki non-technical authors underlying doc ko directly edit karte hain, wo rows omit kar sakte hain, extra rows add kar sakte hain, cells khaali chhod sakte hain, ya cheezein reorder kar sakte hain — aur karenge bhi. Tumhara `decorate()` kabhi ek fixed shape assume nahi karna chahiye; hamesha optional chaining use karo (`rows[1]?.textContent`), koi value use karne se pehle check karo `if` wo exist karti hai, aur missing images/links ko gracefully handle karo, error throw karne ke bajaye. CSS SCOPING: block ki CSS file mein har selector block ki apni class se prefix hona chahiye (`.quote blockquote`, kabhi bare `blockquote` nahi), kyunki sab blocks ki CSS files har page pe load hoti hain — ek unscoped rule chupke se leak ho jaati hai aur page pe kahin aur ke unrelated blocks tod deti hai. Convention `-wrapper` aur `-container` suffixes (jaise `.quote-wrapper`) ko bhi SECTION-level classes ke liye reserve karta hai jo EDS automatically add karta hai, tumhare khud ke block-internal classes ke liye nahi, naming collisions avoid karne ke liye.",
        },
        dailyLifeExample:
          'Defensive coding ek achhe waiter jaisa hai jo customer se order lete waqt kabhi assume nahi karta ki wo "extra spicy" bolega hi — wo hamesha pooch leta hai ya default rakh leta hai. CSS scoping ek building mein har flat ka apna lock jaisa hai — tumhara sofa (CSS rule) sirf tumhare flat (`.quote`) ke andar rehta hai, padosi ke ghar mein nahi ghusta.',
        codeExample:
          "// BAD — assumes shape, will crash if author omits the author row\nfunction decorate(block) {\n  const author = block.children[1].textContent; // 💥 crashes if row 2 is missing\n}\n\n// GOOD — defensive\nfunction decorate(block) {\n  const author = block.children[1]?.textContent?.trim() || '';\n}\n\n/* BAD CSS — leaks to every <blockquote> on the page */\nblockquote { font-size: 1.5rem; }\n\n/* GOOD CSS — scoped to this block only */\n.quote blockquote { font-size: 1.5rem; }",
        keyPoints: [
          'Authors will omit/reorder/add rows — decorate() must never assume fixed shape',
          'Use optional chaining and fallback defaults instead of throwing on missing data',
          'Every CSS selector in a block file must be prefixed by the block\'s class',
          '`-wrapper` / `-container` suffixes are reserved for section-level classes',
        ],
        quiz: [
          {
            question: 'Why must every rule in a block\'s CSS file be scoped to that block\'s class?',
            options: [
              'It is required by CSS syntax',
              'Every block\'s CSS loads on every page, so an unscoped rule can break unrelated blocks',
              'It makes the file smaller',
              'It is only a stylistic preference with no real effect',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why is "defensive coding" especially important in EDS blocks compared to a typical React component?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "In React, the shape of props is usually controlled by other developers via TypeScript/PropTypes. In EDS, a block's \"input\" is a table typed by a non-technical author directly into a document — they can freely omit, reorder, or leave cells empty with no compile-time check. So decorate() must use optional chaining and sensible fallbacks everywhere instead of assuming a fixed row/column shape, or the page will visibly break for real users whenever an author's document deviates slightly from what the developer expected.",
              hinglish:
                "React mein, props ka shape usually doosre developers control karte hain TypeScript/PropTypes ke through. EDS mein, ek block ka \"input\" ek table hota hai jo ek non-technical author directly document mein type karta hai — wo freely rows omit, reorder, ya cells khaali chhod sakte hain bina kisi compile-time check ke. Isliye decorate() ko har jagah optional chaining aur sensible fallbacks use karne chahiye, ek fixed row/column shape assume karne ke bajaye, warna page visibly toot jaayega real users ke liye jab bhi author ka document developer ki expectation se thoda hat jaaye.",
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Content, Performance & Loading',
    level: 'intermediate',
    description: 'Loading phases, image optimization, aur Google Docs ko headless CMS ki tarah use karna.',
    concepts: [
      {
        title: 'Eager, Lazy & Delayed — The Three-Phase Loading Model',
        difficulty: 'medium',
        tags: ['eds', 'performance', 'loading', 'lcp'],
        explanation: {
          english:
            "`scripts.js` loads a page in three deliberate phases to keep the site fast. EAGER: the absolute minimum needed to render what's visible above the fold — critical CSS and the first section's blocks — decorated as fast as possible, because this determines the Largest Contentful Paint (LCP) metric. LAZY: everything else on the page — sections below the fold, remaining blocks — decorated shortly after, once the eager phase is done, so the user isn't waiting on content they can't see yet. DELAYED: run via `scripts/delayed.js`, fired ~3 seconds after load (or on user interaction) — analytics, chat widgets, non-critical third-party scripts — things that matter for the business but must never compete with the user's first meaningful paint. This staged model is EDS's main lever for near-100 Lighthouse scores, and interviewers often ask about it directly because it's the single biggest architectural difference from a typical React SPA that loads its whole bundle upfront.",
          hinglish:
            "`scripts.js` page ko teen jaan-boojh ke phases mein load karta hai site ko fast rakhne ke liye. EAGER: bilkul minimum jo fold ke upar visible cheez render karne ke liye chahiye — critical CSS aur pehle section ke blocks — jitni jaldi ho sake decorate kiya jaata hai, kyunki ye Largest Contentful Paint (LCP) metric decide karta hai. LAZY: page ka baaki sab kuch — fold ke neeche ke sections, baaki blocks — eager phase khatam hone ke thodi der baad decorate hote hain, taaki user us content ka wait na kare jo abhi dikh hi nahi raha. DELAYED: `scripts/delayed.js` ke through chalta hai, load ke ~3 second baad fire hota hai (ya user interaction pe) — analytics, chat widgets, non-critical third-party scripts — cheezein jo business ke liye matter karti hain par user ke pehle meaningful paint se kabhi compete nahi karni chahiye. Ye staged model EDS ka main lever hai near-100 Lighthouse scores ke liye, aur interviewers aksar isse directly poochte hain kyunki ye ek typical React SPA se sabse bada architectural farak hai jo apna poora bundle upfront load karta hai.",
        },
        dailyLifeExample:
          'Ye ek shaadi ke function jaisa hai — pehle stage decoration aur dulha-dulhan ki entry (eager, jo sab dekh rahe hain) ready honi chahiye turant. Phir dheere-dheere baaki hall ki decoration (lazy) set hoti hai. Aur DJ ka sound-check, photographer ka extra equipment setup (delayed) sabse aakhir mein hota hai — guests ke aane se pehle jaldi dikhne wali cheezon ko block nahi karta.',
        codeExample:
          '// Rough shape of scripts.js phases (simplified)\n\nasync function loadEager(doc) {\n  // load critical CSS + decorate first section only\n}\n\nasync function loadLazy(doc) {\n  // decorate remaining sections/blocks below the fold\n}\n\nfunction loadDelayed() {\n  // dynamically import scripts/delayed.js after ~3s\n  window.setTimeout(() => import(\'./delayed.js\'), 3000);\n}\n\nasync function loadPage() {\n  await loadEager(document);\n  await loadLazy(document);\n  loadDelayed();\n}',
        keyPoints: [
          'EAGER = above-the-fold content only, optimised for LCP',
          'LAZY = everything else, decorated right after eager finishes',
          'DELAYED (delayed.js) = analytics/third-party scripts, fired ~3s after load',
          'This staged model is the main reason EDS sites hit near-100 Lighthouse scores',
        ],
        quiz: [
          {
            question: 'Which loading phase directly determines the Largest Contentful Paint (LCP) metric?',
            options: ['Delayed', 'Lazy', 'Eager', 'None — LCP is unrelated to loading phases'],
            correctIndex: 2,
          },
          {
            question: 'Where do analytics and chat-widget scripts typically belong in an EDS project?',
            options: ['scripts/scripts.js, loaded eagerly', 'scripts/delayed.js, fired a few seconds after load', 'Inside every block\'s decorate()', 'head.html, loaded synchronously'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain EDS\'s eager/lazy/delayed loading model and why it exists.',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "EDS loads a page in three phases to protect perceived performance. Eager decorates only what's visible above the fold, directly optimising the LCP metric. Lazy decorates everything else on the page once eager is done. Delayed (via delayed.js) runs ~3 seconds after load, or on interaction, and is reserved for non-critical scripts like analytics or chat widgets, so they never compete with the user's first meaningful paint. It exists because a typical framework app loads its whole bundle upfront, which EDS deliberately avoids to hit near-100 Lighthouse scores.",
              hinglish:
                "EDS ek page ko teen phases mein load karta hai perceived performance protect karne ke liye. Eager sirf wo decorate karta hai jo fold ke upar visible hai, directly LCP metric ko optimise karte hue. Lazy page ka baaki sab kuch decorate karta hai jab eager khatam ho jaaye. Delayed (delayed.js ke through) load ke ~3 second baad, ya interaction pe chalta hai, aur non-critical scripts jaise analytics ya chat widgets ke liye reserved hai, taaki wo kabhi user ke pehle meaningful paint se compete na karein. Ye isliye exist karta hai kyunki ek typical framework app apna poora bundle upfront load karta hai, jise EDS jaan-boojh kar avoid karta hai near-100 Lighthouse scores hit karne ke liye.",
            },
          },
        ],
      },
      {
        title: 'Image Optimization with createOptimizedPicture',
        difficulty: 'medium',
        tags: ['eds', 'images', 'performance', 'aem.js'],
        explanation: {
          english:
            "Authors paste raw, often huge, images directly from Google Docs/SharePoint into their document. Serving those as-is would tank performance, so EDS provides a vendored helper, `createOptimizedPicture(src, alt, eager, breakpoints)`, imported from `scripts/aem.js`. It generates a proper `<picture>` element with multiple `<source>`s for different widths and modern formats (like WebP), so the browser downloads only the size it actually needs. You call it inside a block's `decorate()` right after finding an `<img>` the author inserted, replacing the original `<picture>` with the optimised one. The `eager` boolean tells it whether this image is above-the-fold (should load immediately, no lazy-loading) — which ties directly back into the eager/lazy loading model.",
          hinglish:
            "Authors raw, aksar bahut bade, images seedha Google Docs/SharePoint se apne document mein paste kar dete hain. Unhe as-is serve karna performance ko tank kar deta, isliye EDS ek vendored helper deta hai, `createOptimizedPicture(src, alt, eager, breakpoints)`, jo `scripts/aem.js` se import hota hai. Ye ek proper `<picture>` element banata hai multiple `<source>`s ke saath alag-alag widths aur modern formats (jaise WebP) ke liye, isliye browser sirf utna hi size download karta hai jitna use actually chahiye. Tum ise ek block ke `decorate()` ke andar call karte ho, wahan `<img>` dhoondhne ke turant baad jo author ne insert kiya tha, original `<picture>` ko optimised wale se replace karke. `eager` boolean batata hai ki ye image above-the-fold hai ya nahi (turant load hona chahiye, koi lazy-loading nahi) — jo directly eager/lazy loading model se judta hai.",
        },
        dailyLifeExample:
          'Ye ek darzi (tailor) jaisa hai jo ek bada kapde ka roll (huge raw image) leta hai aur customer ke exact size (screen width) ke hisaab se sahi size ka kapda kaat ke deta hai — poora roll bhejne ke bajaye, jisse transport (bandwidth) fizool waste hoti.',
        codeExample:
          "import { createOptimizedPicture } from '../../scripts/aem.js';\n\nexport default function decorate(block) {\n  block.querySelectorAll('picture > img').forEach((img) => {\n    const optimized = createOptimizedPicture(\n      img.src,\n      img.alt,\n      false,            // eager? false = lazy-load (below the fold)\n      [{ width: '750' }] // breakpoints to generate\n    );\n    img.closest('picture').replaceWith(optimized);\n  });\n}",
        keyPoints: [
          'createOptimizedPicture() comes from the vendored scripts/aem.js',
          'It generates a <picture> with multiple sizes/formats (e.g. WebP)',
          'The eager flag ties into the eager/lazy loading model',
          'Always run raw author images through it inside decorate()',
        ],
        quiz: [
          {
            question: 'What problem does createOptimizedPicture() solve?',
            options: [
              'It adds animations to images',
              'It serves appropriately-sized, modern-format images instead of one huge raw file',
              'It compresses text content',
              'It replaces images with icons',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why is image handling a bigger concern in EDS than in a typical CMS, and how is it solved?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "Because authors paste raw images directly from Google Docs/SharePoint, often unoptimised and oversized, straight into content — there's no CMS-side image pipeline enforcing sizes. EDS solves this in code: createOptimizedPicture() (from the vendored scripts/aem.js) is called inside a block's decorate() to replace the raw <img> with a <picture> containing multiple responsive sources/widths and modern formats, so the browser only downloads what it needs.",
              hinglish:
                "Kyunki authors raw images seedha Google Docs/SharePoint se, aksar unoptimised aur oversized, seedha content mein paste kar dete hain — koi CMS-side image pipeline sizes enforce nahi karti. EDS ise code mein solve karta hai: createOptimizedPicture() (vendored scripts/aem.js se) block ke decorate() ke andar call hota hai raw <img> ko ek <picture> se replace karne ke liye jisme multiple responsive sources/widths aur modern formats hote hain, taaki browser sirf utna hi download kare jitna use chahiye.",
            },
          },
        ],
      },
      {
        title: 'Google Docs / SharePoint as a Headless CMS',
        difficulty: 'medium',
        tags: ['eds', 'authoring', 'headless-cms', 'content-model'],
        explanation: {
          english:
            "Calling Google Docs/SharePoint a 'headless CMS' sounds odd at first, but it fits: a headless CMS is just a content source with no built-in rendering opinion, and that's exactly what a document is here — EDS's pipeline is the layer that turns it into structured HTML, the same role a REST/GraphQL API plays for a typical headless CMS feeding a React frontend. The practical implications: content has NO schema enforcement beyond 'a table names a block' — there's no field validation, so defensive coding (covered earlier) is mandatory. There's also no draft/preview distinction inside the document itself — EDS achieves preview vs. live through two separate deployment targets (a `.page` preview domain vs. a `.live` published domain) tied to source-document state, not a database flag. Authors get familiar tools and zero training; developers give up schema safety in exchange.",
          hinglish:
            "Google Docs/SharePoint ko 'headless CMS' kehna pehli baar ajeeb lagta hai, par ye fit baithta hai: ek headless CMS bas ek content source hota hai jiska koi built-in rendering opinion nahi hota, aur yahi exactly ek document hai — EDS ki pipeline wo layer hai jo use structured HTML mein badalti hai, wahi role jo ek REST/GraphQL API ek typical headless CMS ke liye play karta hai jab wo ek React frontend ko feed karta hai. Practical implications: content mein 'ek table ek block ka naam batati hai' se zyada koi schema enforcement NAHI hai — koi field validation nahi hai, isliye defensive coding (pehle cover kiya) mandatory hai. Document ke andar khud koi draft/preview distinction bhi nahi hota — EDS preview vs. live do alag deployment targets se achieve karta hai (`.page` preview domain vs `.live` published domain) jo source-document state se judte hain, na ki kisi database flag se. Authors ko familiar tools aur zero training milti hai; developers iske badle schema safety chhod dete hain.",
        },
        dailyLifeExample:
          'Ye ek open-kitchen restaurant jaisa hai jahan customer khud apni thali mein jo chahe daal sakta hai (no schema enforcement) — chef (decorate function) ko har combination handle karne ke liye ready rehna padta hai, kyunki koi menu-checker (validation layer) nahi hai jo customer ko rok sake.',
        codeExample:
          '# Mental model — same role, different "backend"\n\n# Typical MERN headless setup:\n#   MongoDB (content) --REST/GraphQL API--> React frontend\n\n# EDS setup:\n#   Google Doc (content) --EDS pipeline--> plain HTML --decorate()--> page\n\n# No schema validation on the "content source" in either the doc or the\n# pipeline — validation, if any, must happen in your decorate() code.',
        keyPoints: [
          'A document plays the same conceptual role as a headless CMS content source',
          'There is no schema/field validation — the pipeline just converts tables to divs',
          'Preview vs. live is two deployment domains (.page vs .live), not a DB draft flag',
          'The tradeoff: zero author training, but no schema safety for developers',
        ],
        quiz: [
          {
            question: 'What plays the equivalent role of a "content API" in an EDS architecture?',
            options: ['A REST endpoint you build yourself', "The pipeline that converts the author's document into HTML", 'MongoDB', 'The scripts/aem.js file'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'In what sense is a Google Doc "a headless CMS" in the EDS model, and what does a developer give up by using it that way?',
            difficulty: 'hard',
            frequency: 'rare',
            answer: {
              english:
                "It plays the same conceptual role: a content source decoupled from rendering, whose data is fetched/converted by another layer (EDS's pipeline instead of a REST/GraphQL API) and rendered by frontend code. What's given up is schema enforcement — a document has no field validation, so any content shape the author types is technically valid, pushing all correctness checking into defensive decorate() code rather than a CMS content model.",
              hinglish:
                "Ye wahi conceptual role play karta hai: ek content source jo rendering se decoupled hai, jiska data ek doosri layer (EDS ki pipeline, REST/GraphQL API ke bajaye) fetch/convert karti hai aur frontend code render karta hai. Jo chhoda jaata hai wo hai schema enforcement — ek document mein koi field validation nahi hoti, isliye author jo bhi content shape type kare wo technically valid hai, saari correctness checking defensive decorate() code mein push ho jaati hai, kisi CMS content model mein nahi.",
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Advanced Block Patterns',
    level: 'advanced',
    description: 'Block variations, auto-blocking, aur fragments se content reuse.',
    concepts: [
      {
        title: 'Block Variations & Configurable Blocks',
        difficulty: 'medium',
        tags: ['eds', 'blocks', 'variations', 'advanced'],
        explanation: {
          english:
            "A single block can support multiple visual variants without becoming multiple blocks. Authors add extra words after the block name in the table's first cell, separated by a space — e.g. \"Cards (dark)\" instead of just \"Cards\". EDS turns every extra word into an additional CSS class on the block's wrapper: `<div class=\"cards dark\">`. Your `cards.css` then simply adds rules scoped to the combination, like `.cards.dark { background: #111; color: #fff; }`, and your `decorate()` function can also branch on `block.classList.contains('dark')` if the variant needs different DOM structure, not just different styling. This pattern avoids duplicating an entire block just to offer a themed or layout variant, and is one of the most commonly asked 'how would you handle X' interview scenarios.",
          hinglish:
            "Ek single block multiple visual variants support kar sakta hai bina multiple blocks bane. Authors table ke pehle cell mein block ke naam ke baad extra words add karte hain, space se separate karke — jaise sirf \"Cards\" ke bajaye \"Cards (dark)\". EDS har extra word ko block ke wrapper pe ek additional CSS class bana deta hai: `<div class=\"cards dark\">`. Tumhara `cards.css` phir simply combination pe scoped rules add karta hai, jaise `.cards.dark { background: #111; color: #fff; }`, aur tumhara `decorate()` function `block.classList.contains('dark')` pe bhi branch kar sakta hai agar variant ko sirf alag styling nahi, alag DOM structure bhi chahiye. Ye pattern ek poora block duplicate karne se bachata hai sirf ek themed ya layout variant offer karne ke liye, aur sabse common 'how would you handle X' interview scenarios mein se ek hai.",
        },
        dailyLifeExample:
          'Ye ek hi kurta design ke do color variants jaisa hai — same cutting/stitching (block structure), bas fabric color alag (CSS class). Tailor (developer) ko poora naya design banane ki zaroorat nahi, sirf ek "variant tag" attach karna hai.',
        codeExample:
          "// Author types \"Cards (dark)\" -> EDS generates:\n// <div class=\"cards dark\">...</div>\n\n// blocks/cards/cards.js\nexport default function decorate(block) {\n  const isDark = block.classList.contains('dark');\n  // ...build the <ul> as usual...\n  if (isDark) {\n    // optionally branch DOM structure for the dark variant\n  }\n}\n\n/* blocks/cards/cards.css */\n.cards.dark {\n  background: #111;\n  color: #fff;\n}\n.cards.dark .cards-card-image { opacity: 0.9; }",
        keyPoints: [
          'Extra words after the block name in the doc become extra CSS classes',
          '"Cards (dark)" -> <div class="cards dark"> automatically',
          'Style variants with combined selectors: .cards.dark { ... }',
          'decorate() can also branch on classList for structural (not just visual) differences',
        ],
        quiz: [
          {
            question: 'How does an author create a "dark" variant of a Cards block without a developer building a new block?',
            options: [
              'They cannot — a new block must always be built',
              'By typing an extra word in parentheses after the block name, e.g. "Cards (dark)"',
              'By changing the document\'s font color',
              'By duplicating the whole document',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you support a themed variant of an existing block (e.g. a "dark" Cards block) without duplicating the block?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "Use EDS's block variation convention: the author adds an extra word in parentheses after the block name, e.g. \"Cards (dark)\", which EDS turns into an extra CSS class on the block wrapper (cards dark). Then extend the block's existing CSS with a combined selector like .cards.dark { ... }, and if the variant needs different DOM (not just styling), branch inside decorate() using block.classList.contains('dark') — no new block folder needed.",
              hinglish:
                "EDS ki block variation convention use karo: author block naam ke baad brackets mein ek extra word add karta hai, jaise \"Cards (dark)\", jise EDS block wrapper pe ek extra CSS class bana deta hai (cards dark). Phir block ke existing CSS ko ek combined selector se extend karo jaise .cards.dark { ... }, aur agar variant ko alag DOM chahiye (sirf styling nahi), to decorate() ke andar block.classList.contains('dark') use karke branch karo — koi naya block folder nahi chahiye.",
            },
          },
        ],
      },
      {
        title: 'Auto-Blocking with buildAutoBlocks',
        difficulty: 'hard',
        tags: ['eds', 'auto-blocking', 'advanced', 'scripts'],
        explanation: {
          english:
            "Not every block should require the author to type a table — some, like a page's Hero image, are better inferred automatically from convention (e.g. \"the first image + heading on the page\"). `buildAutoBlocks(main)`, a function you add to `scripts.js`'s eager phase, runs BEFORE the normal block-detection loop and can inspect the raw, un-decorated page content to synthesize a block programmatically — for instance, wrapping the page's first `<picture>` + following `<h1>` into a new `<div class=\"hero\">` element, as if the author had typed a Hero table, even though they didn't. This keeps authoring effortless for very common, structural patterns while still reusing the exact same block/decorate() machinery afterward. It's an advanced technique — most projects only need it for one or two conventions like the Hero.",
          hinglish:
            "Har block ke liye author ko table type karne ki zaroorat nahi honi chahiye — kuch, jaise ek page ki Hero image, convention se automatically infer karna behtar hota hai (jaise \"page ki pehli image + heading\"). `buildAutoBlocks(main)`, ek function jo tum `scripts.js` ke eager phase mein add karte ho, normal block-detection loop se PEHLE chalta hai aur raw, un-decorated page content ko inspect karke programmatically ek block synthesize kar sakta hai — for instance, page ki pehli `<picture>` + uske baad ka `<h1>` ko ek naye `<div class=\"hero\">` element mein wrap karke, jaise author ne khud Hero table type ki ho, jabki usne nahi ki. Ye authoring ko bahut common, structural patterns ke liye effortless rakhta hai jabki baad mein wahi block/decorate() machinery reuse hoti hai. Ye ek advanced technique hai — zyadatar projects ko iski zaroorat sirf ek ya do conventions ke liye padti hai jaise Hero.",
        },
        dailyLifeExample:
          'Ye ek smart darzi (tailor) jaisa hai jo customer se naap poochne ke bajaye, unke pehle se pehne hue kapdon (existing page content) ko dekh ke andaza laga leta hai ki kaunsa design chahiye — customer ko kuch explicitly bolna hi nahi padta.',
        codeExample:
          "// scripts.js — inside the eager phase, before decorateBlocks()\nfunction buildHeroBlock(main) {\n  const h1 = main.querySelector('h1');\n  const picture = main.querySelector('picture');\n  if (h1 && picture && h1.parentElement === main.firstElementChild) {\n    const section = document.createElement('div');\n    section.append(buildBlock('hero', { elems: [picture, h1] }));\n    main.prepend(section);\n  }\n}\n\nfunction buildAutoBlocks(main) {\n  try {\n    buildHeroBlock(main);\n  } catch (e) {\n    console.error('Auto-blocking failed', e);\n  }\n}\n// -> blocks/hero/hero.js's decorate() then runs on this synthesized block, same as any other",
        keyPoints: [
          'buildAutoBlocks() synthesizes a block from page structure, no author table needed',
          'It runs during the eager phase, before normal block detection',
          'Common use case: auto-detecting a Hero (first image + heading)',
          'The synthesized block still goes through the same decorate() machinery afterward',
        ],
        quiz: [
          {
            question: 'What is the main purpose of buildAutoBlocks()?',
            options: [
              'To speed up the build process',
              'To programmatically create a block from page structure without the author typing a table',
              'To automatically translate content into Hinglish',
              'To delete unused blocks',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you reach for auto-blocking instead of asking the author to type a block table?',
            difficulty: 'hard',
            frequency: 'rare',
            answer: {
              english:
                "When a block follows a highly predictable structural convention that's better inferred than typed — the classic example is a Hero: the first image + heading on a page. Instead of requiring every author to remember to type a \"Hero\" table, buildAutoBlocks() (run in scripts.js's eager phase, before normal block detection) inspects the raw page and synthesizes the block programmatically, and it then flows through the exact same decorate() pipeline as any manually-authored block.",
              hinglish:
                "Jab ek block ek highly predictable structural convention follow karta hai jise type karne se zyada infer karna behtar hai — classic example hai Hero: page ki pehli image + heading. Har author ko \"Hero\" table type karna yaad rakhne ke liye kehne ke bajaye, buildAutoBlocks() (scripts.js ke eager phase mein chalta hai, normal block detection se pehle) raw page ko inspect karta hai aur block ko programmatically synthesize karta hai, aur phir wo exact wahi decorate() pipeline se guzarta hai jaise koi bhi manually-authored block.",
            },
          },
        ],
      },
      {
        title: 'Fragments & Reusing Content Across Pages',
        difficulty: 'hard',
        tags: ['eds', 'fragments', 'reuse', 'advanced'],
        explanation: {
          english:
            "Some content — a promo banner, a shared FAQ, a recurring CTA — needs to live in ONE place and appear on many pages, so an update only has to happen once. EDS's answer is the FRAGMENT block: an author creates a separate document just for that reusable piece, then on any page where it should appear, adds a \"Fragment\" block whose single row is a link/path to that document. `blocks/fragment/fragment.js` is special-cased as the one block explicitly allowed to reach across into another block's territory — it fetches the fragment document's own generated HTML at render time and re-decorates its blocks in place, effectively splicing one document's content into another. This is the EDS equivalent of a shared/reusable component instance in React, except the 'component instance' is a link to a separate authored document rather than a prop-driven render.",
          hinglish:
            "Kuch content — ek promo banner, ek shared FAQ, ek recurring CTA — ko EK jagah rehna chahiye aur bahut saare pages pe appear hona chahiye, taaki update sirf ek baar karna pade. EDS ka jawab hai FRAGMENT block: author ek alag document banata hai sirf us reusable piece ke liye, phir jis bhi page pe wo appear hona chahiye, wahan ek \"Fragment\" block add karta hai jiski ek row us document ka link/path hoti hai. `blocks/fragment/fragment.js` special-cased hai — ye ek block hai jise explicitly ijaazat hai doosre block ke territory mein pahunchne ki — ye render time pe fragment document ki khud ki generated HTML fetch karta hai aur uske blocks ko in-place re-decorate karta hai, effectively ek document ka content doosre mein splice karte hue. Ye EDS ka equivalent hai ek shared/reusable component instance ka React mein, sivaay iske ki 'component instance' ek alag authored document ka link hai, prop-driven render nahi.",
        },
        dailyLifeExample:
          'Ye ek building ka common notice board jaisa hai — society office (ek document) mein ek notice likha jaata hai, aur har floor ke lift (multiple pages) mein sirf uska ek "yahan dekho" pointer (Fragment block) laga hota hai. Notice update karo ek jagah, har lift mein automatically naya notice dikhta hai.',
        codeExample:
          "# Author creates a separate document: /fragments/promo-banner\n# (its own Hero/CTA block content, authored once)\n\n# On any page where it should appear, add a Fragment block:\n# | Fragment |\n# | /fragments/promo-banner |\n\n# blocks/fragment/fragment.js (conceptually):\nexport default async function decorate(block) {\n  const link = block.querySelector('a');\n  const path = new URL(link.href).pathname;\n  const html = await fetch(`${path}.plain.html`).then((r) => r.text());\n  block.innerHTML = html;\n  // re-run block decoration on the newly-inserted fragment content\n}",
        keyPoints: [
          'Fragments let one authored document be reused across many pages',
          'An author links to the fragment document via a "Fragment" block',
          'fragment.js is the one block explicitly allowed to import/reach into other blocks',
          'It is EDS\'s closest equivalent to a reusable component instance',
        ],
        quiz: [
          {
            question: 'How does an author reuse the same promo banner across 20 different pages in EDS?',
            options: [
              'Copy-paste the banner content into all 20 documents',
              'Create one fragment document with the banner, then link to it via a Fragment block on each page',
              'Ask a developer to hardcode it into scripts.js',
              'It is not possible in EDS',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you implement a "shared FAQ section" that appears on 15 pages and must be editable from one place?',
            difficulty: 'hard',
            frequency: 'rare',
            answer: {
              english:
                "Create a single fragment document containing the FAQ content, authored once. On each of the 15 pages, add a Fragment block whose row links to that fragment document. fragment.js — the one block allowed to cross into other blocks' territory — fetches that document's generated HTML at render time and re-decorates it in place, so editing the single fragment document updates all 15 pages automatically, with no code change and no per-page duplication.",
              hinglish:
                "Ek single fragment document banao jisme FAQ content ho, ek baar authored. In 15 pages mein se har ek pe, ek Fragment block add karo jiski row us fragment document ko link karti hai. fragment.js — wo ek block jise doosre blocks ke territory mein jaane ki ijaazat hai — render time pe us document ki generated HTML fetch karta hai aur use in-place re-decorate karta hai, isliye single fragment document edit karne se sab 15 pages automatically update ho jaate hain, koi code change nahi, koi per-page duplication nahi.",
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Deployment, Performance & EDS vs Classic AEM',
    level: 'advanced',
    description: 'Git-based deployment flow, performance philosophy, aur kab classic AEM better hai.',
    concepts: [
      {
        title: 'Git-Based Deployment: Preview to Live',
        difficulty: 'medium',
        tags: ['eds', 'deployment', 'git', 'ci-cd'],
        explanation: {
          english:
            "Code deployment in EDS is just git: merging a PR into `main` publishes your CODE changes to the live CDN — no separate deploy step, no Jenkins pipeline to babysit, GitHub Actions handle checks (like a Lighthouse-score gate) automatically on every PR. CONTENT deployment is separate and author-driven: a document has a PREVIEW state (served from a `{branch}--{repo}--{owner}.aem.page` domain) and a PUBLISH/LIVE state (served from `.aem.live`), and moving between them is an explicit author action (or an API call), not a git operation. This means code and content genuinely ship on independent schedules — a developer can merge a new block today, and an author can publish new content using that block next week, with neither blocking the other. Interviewers like asking 'how would a PR even get reviewed' — the answer: every PR must include a link to its own live preview domain so reviewers see the actual rendered result, not just a diff.",
          hinglish:
            "EDS mein code deployment bas git hai: ek PR ko `main` mein merge karna tumhare CODE changes ko live CDN pe publish kar deta hai — koi alag deploy step nahi, koi Jenkins pipeline babysit karne ki zaroorat nahi, GitHub Actions har PR pe checks (jaise ek Lighthouse-score gate) automatically handle karte hain. CONTENT deployment alag aur author-driven hai: ek document ki ek PREVIEW state hoti hai (`{branch}--{repo}--{owner}.aem.page` domain se serve hoti hai) aur ek PUBLISH/LIVE state (`.aem.live` se serve hoti hai), aur dono ke beech move karna ek explicit author action hai (ya ek API call), koi git operation nahi. Iska matlab code aur content genuinely independent schedules pe ship hote hain — ek developer aaj ek naya block merge kar sakta hai, aur ek author agle hafte us block ko use karke naya content publish kar sakta hai, koi bhi doosre ko block nahi karta. Interviewers pooch te hain 'ek PR review kaise hoga' — jawab: har PR mein apni khud ki live preview domain ka link hona chahiye taaki reviewers actual rendered result dekh sakein, sirf ek diff nahi.",
        },
        dailyLifeExample:
          'Ye ek do-tier restaurant jaisa hai — kitchen staff (developers) apna naya recipe test-kitchen (preview) mein try karte hain aur manager approve karte hi menu mein permanently add ho jaata hai (main branch merge = live code). Alag se, restaurant manager (author) rozana specials ka board (content) khud publish/update karta hai, kitchen staff ko bulaye bina.',
        codeExample:
          '# CODE deployment — plain git\ngit checkout -b feature/new-hero-variant\n# ...make changes to blocks/hero/hero.css...\ngit push origin feature/new-hero-variant\n# open a PR -> CI runs (lint, Lighthouse gate) -> merge to main -> live instantly\n\n# Every PR must link its own preview:\n# https://feature-new-hero-variant--my-repo--my-org.aem.page/\n\n# CONTENT deployment — separate, author-driven\n# Preview:  https://main--my-repo--my-org.aem.page/some-page\n# Live:     https://main--my-repo--my-org.aem.live/some-page\n# (author explicitly publishes a document to move preview -> live)',
        keyPoints: [
          'Merging a PR to main deploys CODE instantly — no separate deploy pipeline',
          'GitHub Actions run checks (e.g. a Lighthouse gate) automatically on every PR',
          'CONTENT preview vs. live are two domains (.page vs .live), moved by author action',
          'Code and content ship on fully independent schedules',
        ],
        quiz: [
          {
            question: 'What actually happens when you merge a code PR into main in an EDS project?',
            options: [
              'Nothing until someone runs a manual deploy script',
              'It publishes the code change live, since deployment is just the git merge',
              'It publishes both code and all pending content changes',
              'It only updates the local preview',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How are code and content deployed differently in EDS, and why does that separation matter?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "Code deploys via a normal git merge to main — that alone publishes the change live, with GitHub Actions running checks like a Lighthouse gate on every PR. Content deploys separately: a document has a preview state (an .aem.page domain) and a live state (an .aem.live domain), and an author explicitly moves between them, independent of any git activity. This separation matters because it lets developers ship code and authors publish content on fully independent schedules, without either blocking the other.",
              hinglish:
                "Code ek normal git merge se main mein deploy hota hai — akela wahi change ko live publish kar deta hai, GitHub Actions har PR pe checks (jaise Lighthouse gate) chalate hain. Content alag deploy hota hai: ek document ki ek preview state hoti hai (.aem.page domain) aur ek live state (.aem.live domain), aur author explicitly dono ke beech move karta hai, kisi git activity se independent. Ye separation isliye matter karti hai kyunki ye developers ko code ship karne aur authors ko content publish karne deta hai fully independent schedules pe, koi bhi doosre ko block kiye bina.",
            },
          },
        ],
      },
      {
        title: 'Performance Philosophy: Core Web Vitals & Lighthouse',
        difficulty: 'medium',
        tags: ['eds', 'performance', 'core-web-vitals', 'lighthouse'],
        explanation: {
          english:
            "EDS treats performance as a hard requirement, not an afterthought — most boilerplates ship with a GitHub Action that fails a PR if its Lighthouse score regresses. This is achievable specifically because of choices covered earlier: no framework runtime shipped to the browser, no build-step bloat, the eager/lazy/delayed loading model protecting LCP, and mandatory image optimisation. The three Core Web Vitals map directly onto EDS design decisions: LCP (Largest Contentful Paint) is protected by the eager-phase-only-above-fold rule; CLS (Cumulative Layout Shift) is minimised because blocks reserve space via CSS before JS decorates them, avoiding content 'jumping'; INP (Interaction to Next Paint, replacing FID) stays low because there's very little JS running per interaction — no virtual DOM diffing, no large component tree re-renders. Knowing this mapping — which EDS mechanism protects which Core Web Vital — is a strong interview signal that you understand WHY the architecture looks the way it does, not just WHAT it does.",
          hinglish:
            "EDS performance ko ek hard requirement ki tarah treat karta hai, afterthought nahi — zyadatar boilerplates ek GitHub Action ke saath ship hote hain jo ek PR ko fail kar deta hai agar uska Lighthouse score regress ho. Ye specifically isliye achievable hai un choices ki wajah se jo pehle cover ki: browser ko koi framework runtime ship nahi hota, koi build-step bloat nahi, eager/lazy/delayed loading model LCP ko protect karta hai, aur mandatory image optimisation. Teen Core Web Vitals directly EDS design decisions pe map hote hain: LCP (Largest Contentful Paint) eager-phase-only-above-fold rule se protect hota hai; CLS (Cumulative Layout Shift) minimise hota hai kyunki blocks CSS se jagah reserve kar lete hain JS unhe decorate karne se pehle, content ke 'jump' karne se bachte hue; INP (Interaction to Next Paint, jo FID ki jagah leta hai) low rehta hai kyunki har interaction pe bahut kam JS chalta hai — koi virtual DOM diffing nahi, koi large component tree re-renders nahi. Ye mapping jaanna — kaunsa EDS mechanism kaunse Core Web Vital ko protect karta hai — ek strong interview signal hai ki tum samajhte ho architecture WAISI kyun hai, sirf WO kya karti hai wo nahi.",
        },
        dailyLifeExample:
          'Ye ek fast-food chain jaisa hai jo apna kitchen isliye design karta hai ki order 60 second se zyada na le (LCP), plate dekhne mein hamesha same jagah rakha jaaye taaki customer confuse na ho (CLS), aur waiter ko order lene mein bahut kam time lage kyunki menu simple hai (INP) — sab kuch jaan-boojh kar speed ke liye engineer kiya gaya hai, accident se nahi.',
        codeExample:
          '# .github/workflows/*.yml (typical EDS boilerplate)\n# runs Lighthouse CI on every PR preview URL and fails the PR\n# if performance/accessibility/best-practices/SEO scores regress\n\n# Core Web Vitals <-> EDS mechanism\n# LCP  -> eager phase decorates only the above-the-fold section first\n# CLS  -> block CSS reserves layout space before JS runs (no content jump)\n# INP  -> minimal JS per interaction, no virtual DOM / re-render overhead',
        keyPoints: [
          'Many EDS boilerplates fail a PR automatically on Lighthouse regression',
          'LCP is protected by the eager-phase above-the-fold rule',
          'CLS is minimised because CSS reserves layout space before JS decorates',
          'INP stays low because there is no framework/virtual-DOM overhead per interaction',
        ],
        quiz: [
          {
            question: 'Which EDS mechanism most directly protects the Largest Contentful Paint (LCP) metric?',
            options: ['The Fragment block', 'The eager loading phase decorating only above-the-fold content first', 'CSS scoping conventions', 'buildAutoBlocks()'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Map each Core Web Vital (LCP, CLS, INP) to the specific EDS mechanism that protects it.',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                "LCP is protected by the eager loading phase, which decorates only the above-the-fold section first, so the largest visible element renders as fast as possible. CLS is minimised because block CSS reserves layout space ahead of JS decoration, so content doesn't visibly shift as decorate() runs. INP stays low because EDS ships no framework runtime or virtual DOM — interactions run minimal, direct DOM-manipulation JS instead of a full component re-render cycle.",
              hinglish:
                "LCP eager loading phase se protect hota hai, jo sirf above-the-fold section ko pehle decorate karta hai, isliye sabse bada visible element jitni jaldi ho sake render hota hai. CLS minimise hota hai kyunki block CSS layout space JS decoration se pehle reserve kar leta hai, isliye content visibly shift nahi hota jab decorate() chalta hai. INP low rehta hai kyunki EDS koi framework runtime ya virtual DOM ship nahi karta — interactions minimal, direct DOM-manipulation JS chalate hain, na ki ek poora component re-render cycle.",
            },
          },
        ],
      },
      {
        title: 'EDS vs Traditional AEM — When to Use Which',
        difficulty: 'medium',
        tags: ['eds', 'aem', 'comparison', 'architecture-decision'],
        explanation: {
          english:
            "Traditional AEM (Sites/Sling/JCR/OSGi, running Author and Publish Java instances) and EDS solve overlapping but different problems, and interviewers often probe whether you know when each fits. TRADITIONAL AEM wins when you need: deep personalisation and complex workflows, tight integration with other AEM products (Assets/Forms/Target) at a level EDS doesn't natively reach, granular role-based content permissions inside a real content tree, or a very large, deeply nested site with complex component relationships that a flat document model struggles to express. EDS wins when you need: extreme page-load performance, extremely fast authoring for marketing-style pages, minimal infrastructure/hosting overhead (no Java app servers to run), and a low-code bar so any HTML/CSS/JS developer — not just an AEM specialist — can contribute. Many real organisations run BOTH: EDS for fast, high-traffic marketing pages, and classic AEM for a complex product catalog or portal experience behind a login — so this isn't strictly either/or in practice.",
          hinglish:
            "Traditional AEM (Sites/Sling/JCR/OSGi, jo Author aur Publish Java instances chalata hai) aur EDS overlapping par alag problems solve karte hain, aur interviewers aksar check karte hain ki tumhe pata hai ki kaunsa kab fit baithta hai. TRADITIONAL AEM jeetta hai jab tumhe chahiye: deep personalisation aur complex workflows, doosre AEM products (Assets/Forms/Target) ke saath tight integration jis level tak EDS natively nahi pahunchta, ek real content tree ke andar granular role-based content permissions, ya ek bahut bada, deeply nested site jisme complex component relationships hain jinhe ek flat document model express karne mein struggle karega. EDS jeetta hai jab tumhe chahiye: extreme page-load performance, marketing-style pages ke liye extremely fast authoring, minimal infrastructure/hosting overhead (koi Java app servers chalane ki zaroorat nahi), aur ek low-code bar taaki koi bhi HTML/CSS/JS developer — sirf AEM specialist nahi — contribute kar sake. Bahut saari real organisations DONO chalati hain: fast, high-traffic marketing pages ke liye EDS, aur ek complex product catalog ya login ke peeche wale portal experience ke liye classic AEM — isliye practically ye strictly either/or nahi hai.",
        },
        dailyLifeExample:
          'Ye ek business jaisa hai jo apni public-facing dukaan (marketing site) ke liye ek fast, self-service kiosk (EDS) rakhta hai jahan koi bhi jaldi order de sakta hai, jabki apne complex back-office operations (personalised banking portal) ke liye ek fully-staffed, trained-team wala office (traditional AEM) rakhta hai jahan detailed, role-based control chahiye.',
        codeExample:
          '# Rough decision heuristic\n\n# Choose EDS when:            Choose Traditional AEM when:\n# - Marketing/landing pages   - Deep personalisation/targeting\n# - Need near-100 Lighthouse  - Complex workflows/approvals\n# - Fast, low-code authoring  - Tight Assets/Forms/Target integration\n# - Small/lean dev team       - Large, deeply nested content tree\n\n# Many orgs run both:\n# EDS      -> public marketing site (aem.live)\n# Classic AEM -> logged-in portal / product catalog',
        keyPoints: [
          'Traditional AEM: deep personalisation, complex workflows, tight AEM-suite integration',
          'EDS: extreme performance, fast low-code authoring, minimal infra',
          'A flat document model struggles with very large, deeply nested sites',
          'Many real orgs run both side by side for different parts of their site',
        ],
        quiz: [
          {
            question: 'Which scenario is a stronger fit for traditional AEM over EDS?',
            options: [
              'A fast public marketing landing page',
              'A logged-in portal needing deep personalisation and complex approval workflows',
              'A site that must hit a near-100 Lighthouse score',
              'A site with a very small, lean dev team',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you recommend EDS over traditional AEM for a new project, and when would you recommend the opposite?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "Recommend EDS for high-traffic, performance-critical marketing/content pages authored by non-technical teams, built by a small dev team without deep AEM specialisation, where near-100 Lighthouse scores matter. Recommend traditional AEM when the project needs deep personalisation, complex approval workflows, granular role-based permissions, tight integration with AEM Assets/Forms/Target, or a very large, deeply-nested content structure that a flat document model can't express well. In practice, many organisations run both side by side for different parts of the same site.",
              hinglish:
                "EDS recommend karo high-traffic, performance-critical marketing/content pages ke liye jo non-technical teams authored karti hain, ek chhoti dev team banata hai bina deep AEM specialisation ke, jahan near-100 Lighthouse scores matter karte hain. Traditional AEM recommend karo jab project ko deep personalisation, complex approval workflows, granular role-based permissions, AEM Assets/Forms/Target ke saath tight integration, ya ek bahut bada, deeply-nested content structure chahiye jise ek flat document model achhe se express nahi kar sakta. Practically, bahut saari organisations dono ko side-by-side chalati hain same site ke alag-alag hisso ke liye.",
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Site-Wide Patterns: Nav, Footer & Redirects',
    level: 'advanced',
    description: 'Nav/Footer special blocks, redirects.json, 404 handling, aur accessibility defaults.',
    concepts: [
      {
        title: 'The Nav and Footer Blocks — Special, Site-Wide Fragments',
        difficulty: 'medium',
        tags: ['eds', 'nav', 'footer', 'fragments'],
        explanation: {
          english:
            "Nav and footer are the one case in EDS where content genuinely needs to be identical on every single page, so the boilerplate treats them as special-cased fragments rather than something an author repeats per-page. A document at a fixed path (e.g. `/nav` and `/footer`) holds the nav/footer content once; `scripts.js`'s eager phase explicitly fetches both, using the exact same fragment-loading mechanism covered earlier, and injects the results into the page's `<header>` and `<footer>` before the rest of decoration happens. This is why editing the nav document updates every page site-wide instantly on next publish, with zero code change and zero per-page duplication — the same fragment technique you'd use for a reusable FAQ, applied to the two pieces of content every page needs.",
          hinglish:
            "Nav aur footer EDS mein wo ek case hain jahan content ko genuinely har single page pe identical hona chahiye, isliye boilerplate unhe special-cased fragments ki tarah treat karta hai, na ki kuch jo author har page pe repeat kare. Ek fixed path pe ek document (jaise `/nav` aur `/footer`) nav/footer content ek baar hold karta hai; `scripts.js` ka eager phase explicitly dono fetch karta hai, wahi exact fragment-loading mechanism use karke jo pehle cover kiya, aur results ko page ke `<header>` aur `<footer>` mein inject karta hai baaki decoration hone se pehle. Isi wajah se nav document edit karne se agle publish pe poori site instantly update ho jaati hai, zero code change aur zero per-page duplication ke saath — wahi fragment technique jo tum ek reusable FAQ ke liye use karte, un do content pieces pe apply hoti hai jo har page ko chahiye.",
        },
        dailyLifeExample:
          'Ye ek mall ke har floor pe lagi common directory board jaisa hai — mall management (author) ek jagah board ka content update karta hai, aur har floor (page) ka apna board automatically wahi naya content dikhata hai, kisi ko har floor pe alag se jaake board badalna nahi padta.',
        codeExample:
          "// scripts.js — simplified nav/footer loading (eager phase)\nasync function loadHeader(header) {\n  const navPath = '/nav';\n  const html = await fetch(\`\${navPath}.plain.html\`).then((r) => r.text());\n  header.innerHTML = html;\n  // then decorate any blocks found inside the fetched nav content\n}\n\nasync function loadFooter(footer) {\n  const html = await fetch('/footer.plain.html').then((r) => r.text());\n  footer.innerHTML = html;\n}\n\n// Both run during the eager phase, alongside the page's own content",
        keyPoints: [
          'Nav/footer live in one fixed-path document each (e.g. /nav, /footer)',
          'scripts.js fetches and injects them during the eager phase',
          'It reuses the same fragment-loading mechanism as reusable content blocks',
          'Editing the nav/footer document updates the whole site on next publish',
        ],
        quiz: [
          {
            question: 'Why are nav and footer treated specially instead of being authored per-page?',
            options: [
              'Because EDS forbids editing them',
              'Because their content is genuinely identical on every page, so one document backs the whole site',
              'Because they are written in a different language',
              'They are not actually special — every block works this way',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How does EDS keep the navigation menu in sync across hundreds of pages when an author adds a new menu item?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "Nav content lives in a single document at a fixed path (e.g. /nav), not duplicated per page. scripts.js's eager phase fetches that document's generated HTML and injects it into every page's <header> before decoration continues — the same fragment-loading mechanism used for reusable content. So an author editing and publishing that one document updates the menu on every page site-wide immediately, with no code change.",
              hinglish:
                "Nav content ek single document mein rehta hai ek fixed path pe (jaise /nav), har page pe duplicate nahi hota. scripts.js ka eager phase us document ki generated HTML fetch karta hai aur use har page ke <header> mein inject karta hai decoration continue hone se pehle — wahi fragment-loading mechanism jo reusable content ke liye use hota hai. Isliye author us ek document ko edit aur publish karke poori site pe menu ko turant update kar deta hai, koi code change nahi.",
            },
          },
        ],
      },
      {
        title: 'redirects.json & 404 Handling',
        difficulty: 'medium',
        tags: ['eds', 'redirects', '404', 'routing'],
        explanation: {
          english:
            "Because content lives in documents rather than a database with stable IDs, pages get renamed or moved more often than in a traditional CMS — an author renaming a doc changes its URL. EDS's answer is a `redirects.json` document (or spreadsheet), authored the same way as content, with two columns: the old path and the new path. `scripts.js` checks incoming requests against this table early, before any block decoration, and issues the redirect. A request that matches nothing in redirects.json and has no matching document falls through to `404.html` — a normal static page in the code repo, styled like the rest of the site, that developers own and customise directly, since a 'page not found' is a code-repo concern, not a content-authoring one.",
          hinglish:
            "Kyunki content database mein stable IDs ke bajaye documents mein rehta hai, pages traditional CMS se zyada baar rename ya move hote hain — ek author ek doc rename karta hai to uska URL badal jaata hai. EDS ka jawab hai ek `redirects.json` document (ya spreadsheet), content jaise hi authored, do columns ke saath: purana path aur naya path. `scripts.js` incoming requests ko is table ke against jaldi check karta hai, kisi bhi block decoration se pehle, aur redirect issue karta hai. Ek request jo redirects.json mein kuch match nahi karti aur jiska koi matching document nahi hai `404.html` pe fall through hoti hai — code repo mein ek normal static page, baaki site jaisi styled, jise developers directly own aur customise karte hain, kyunki ek 'page not found' code-repo ka concern hai, content-authoring ka nahi.",
        },
        dailyLifeExample:
          'Ye ek dukaan ke shift hone jaisa hai — purane address pe ek chhota note chipka diya jaata hai "Hum yahan shift ho gaye, naya address ye hai" (redirect), taaki purane grahak bhatak na jaayen. Aur agar koi bilkul galat address pe pahunch jaaye jo kabhi exist hi nahi karta, ek "yahan koi dukaan nahi hai" board (404 page) dikhta hai.',
        codeExample:
          '// redirects.json (authored as a doc/sheet, converted like content)\n{\n  "data": [\n    { "Source": "/old-pricing", "Destination": "/pricing" },\n    { "Source": "/blog/old-post", "Destination": "/resources/old-post" }\n  ]\n}\n\n// scripts.js checks this table early, before block decoration:\n// request for /old-pricing -> 301/302 redirect to /pricing\n\n// No match anywhere -> falls through to 404.html\n// (a normal file in the code repo, developer-owned)',
        keyPoints: [
          'redirects.json maps old paths to new ones, authored like content',
          'Checked early in scripts.js, before any block decoration runs',
          'Handles the fact that renaming a document changes its URL',
          '404.html is a developer-owned code file, not an authored document',
        ],
        quiz: [
          {
            question: 'Why does EDS need a redirects mechanism more than a typical database-backed CMS might?',
            options: [
              'EDS pages never actually get renamed',
              'Because content lives in documents whose URLs change when an author renames the doc, unlike stable database IDs',
              'redirects.json is only used for external links',
              'It is purely a legal requirement with no technical reason',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'An author renames a published document, breaking bookmarked links and SEO rankings for the old URL. How do you handle this in EDS?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "Add an entry to the project's redirects.json (or the spreadsheet backing it) mapping the old path to the new one. scripts.js checks incoming requests against this table early, before any block decoration, and issues the redirect — preserving old bookmarks and passing SEO signal to the new URL, without needing a code change or a server-side rule.",
              hinglish:
                "Project ke redirects.json (ya use backing karne wali spreadsheet) mein ek entry add karo jo purane path ko naye se map kare. scripts.js incoming requests ko is table ke against jaldi check karta hai, kisi bhi block decoration se pehle, aur redirect issue karta hai — purane bookmarks preserve karte hue aur SEO signal ko naye URL tak pass karte hue, bina kisi code change ya server-side rule ke.",
            },
          },
        ],
      },
      {
        title: 'Accessibility Defaults in Blocks',
        difficulty: 'medium',
        tags: ['eds', 'accessibility', 'a11y', 'best-practices'],
        explanation: {
          english:
            "Because EDS blocks are hand-written HTML rather than framework components with built-in accessibility primitives, semantic correctness is entirely the block author's responsibility, and it's a common interview probe. Practical defaults: `decorate()` should produce real semantic elements (`<button>` not a `<div onclick>`, `<nav>`, `<ul><li>`) so screen readers and keyboard navigation work without extra ARIA; every image passed through `createOptimizedPicture()` needs a meaningful `alt` sourced from the author's doc, never empty unless the image is purely decorative; interactive elements you build (a custom accordion, a carousel) need keyboard handlers (Enter/Space, arrow keys) in addition to click handlers, since a `<div>` with only a click listener is invisible to keyboard/screen-reader users; and colour choices in a block's CSS should meet WCAG contrast ratios, since there's no linter enforcing this automatically the way some component libraries do.",
          hinglish:
            "Kyunki EDS blocks hand-written HTML hote hain, na ki built-in accessibility primitives wale framework components, semantic correctness poori tarah block author ki responsibility hai, aur ye ek common interview probe hai. Practical defaults: `decorate()` ko real semantic elements banane chahiye (`<div onclick>` nahi, `<button>`, `<nav>`, `<ul><li>`) taaki screen readers aur keyboard navigation bina extra ARIA ke kaam karein; `createOptimizedPicture()` se guzarne wali har image ko ek meaningful `alt` chahiye jo author ke doc se aaye, kabhi khaali nahi jab tak image purely decorative na ho; jo interactive elements tum khud banate ho (ek custom accordion, ek carousel) unhe keyboard handlers chahiye (Enter/Space, arrow keys) click handlers ke alawa, kyunki sirf click listener wala ek `<div>` keyboard/screen-reader users ke liye invisible hota hai; aur block ke CSS mein colour choices ko WCAG contrast ratios milne chahiye, kyunki koi linter ise automatically enforce nahi karta jaise kuch component libraries karti hain.",
        },
        dailyLifeExample:
          'Ye ek building mein ramp banane jaisa hai sirf stairs ke bajaye — koi automatically ise force nahi karta, par ek achha architect (developer) jaan-boojh kar ise design mein shaamil karta hai taaki har koi building use kar sake, na sirf wo log jo stairs chad sakte hain.',
        codeExample:
          "// BAD — invisible to keyboard/screen-reader users\nconst tab = document.createElement('div');\ntab.addEventListener('click', () => activate(tab));\n\n// GOOD — real semantics + keyboard support\nconst tab = document.createElement('button');\ntab.setAttribute('role', 'tab');\ntab.setAttribute('aria-selected', 'false');\ntab.addEventListener('click', () => activate(tab));\ntab.addEventListener('keydown', (e) => {\n  if (e.key === 'Enter' || e.key === ' ') activate(tab);\n});\n\n// Images — alt must come from the author's content, not be left empty\nconst pic = createOptimizedPicture(img.src, img.alt || '', false);",
        keyPoints: [
          'Accessibility in EDS blocks is entirely on the developer — no framework enforces it',
          'Prefer real semantic elements (<button>, <nav>) over div+onclick',
          'Every meaningful image needs an author-sourced alt attribute',
          'Custom interactive elements need keyboard handlers, not just click handlers',
        ],
        quiz: [
          {
            question: 'Why is accessibility a bigger manual responsibility in EDS block code than in many component libraries?',
            options: [
              'EDS blocks cannot be made accessible at all',
              'There is no framework enforcing semantic HTML or ARIA — the block author must build it in by hand',
              'Accessibility is handled entirely by the CDN',
              'Authors are responsible for accessibility, not developers',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'You built a custom "Accordion" block using divs with click handlers. A screen-reader user reports it doesn\'t work. What\'s wrong and how do you fix it?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "A div with only a click listener has no semantic meaning and isn't keyboard-focusable, so screen readers announce nothing useful and keyboard-only users can't reach it. Fix: use real interactive elements (<button>) for the accordion headers, add aria-expanded reflecting open/closed state, and add keydown handlers for Enter/Space so it works without a mouse — EDS gives no framework-level accessibility for free, so this has to be built into decorate() explicitly.",
              hinglish:
                "Sirf click listener wale div ka koi semantic meaning nahi hai aur wo keyboard-focusable nahi hai, isliye screen readers kuch useful announce nahi karte aur keyboard-only users wahan pahunch hi nahi sakte. Fix: accordion headers ke liye real interactive elements (<button>) use karo, open/closed state reflect karta hua aria-expanded add karo, aur Enter/Space ke liye keydown handlers add karo taaki ye bina mouse ke kaam kare — EDS koi framework-level accessibility free mein nahi deta, isliye ye decorate() mein explicitly build karna padta hai.",
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Monitoring, Testing & the Universal Editor',
    level: 'advanced',
    description: 'RUM analytics, block testing/CI, aur visual (WYSIWYG) authoring ke saath Universal Editor.',
    concepts: [
      {
        title: 'Real User Monitoring (RUM) — Built-in, Privacy-Friendly Analytics',
        difficulty: 'medium',
        tags: ['eds', 'rum', 'analytics', 'performance-monitoring'],
        explanation: {
          english:
            "Most EDS boilerplates ship with a lightweight RUM (Real User Monitoring) script loaded in the delayed phase — it samples a small percentage of real visitors and reports actual, field Core Web Vitals (LCP, CLS, INP) plus basic navigation/click events back to Adobe's collector, without cookies or personal data, so it doesn't need a cookie-consent banner the way most third-party analytics do. This matters for interviews because it closes the loop on EDS's whole performance philosophy: you're not just optimising for a lab score (Lighthouse, run once in CI) but continuously measuring what real users on real devices and real networks actually experience, and the sampling keeps the RUM script itself tiny enough that it doesn't meaningfully hurt the performance it's measuring.",
          hinglish:
            "Zyadatar EDS boilerplates ek lightweight RUM (Real User Monitoring) script ke saath ship hote hain jo delayed phase mein load hota hai — ye real visitors ka ek chhota percentage sample karta hai aur actual, field Core Web Vitals (LCP, CLS, INP) plus basic navigation/click events wapas Adobe ke collector ko report karta hai, bina cookies ya personal data ke, isliye ise cookie-consent banner ki zaroorat nahi padti jaise zyadatar third-party analytics ko padti hai. Ye interviews ke liye matter karta hai kyunki ye EDS ki poori performance philosophy ka loop band karta hai: tum sirf ek lab score (Lighthouse, CI mein ek baar chala hua) ke liye optimise nahi kar rahe, balki continuously measure kar rahe ho ki real devices aur real networks pe real users actually kya experience karte hain, aur sampling RUM script ko khud itna chhota rakhti hai ki ye us performance ko meaningfully hurt na kare jise ye measure kar raha hai.",
        },
        dailyLifeExample:
          'Ye ek restaurant ke quality-check jaisa hai jo sirf kitchen mein ek baar taste test (Lighthouse, lab test) karne ke bajaye, kabhi-kabhi asli customers se unka real feedback bhi leta hai (RUM) — bina unka naam-pata poochhe, bas anonymous feedback, taaki pata chale ki asli experience kaisa hai, na sirf controlled kitchen test mein.',
        codeExample:
          "// delayed.js — RUM is typically wired up here, in the delayed phase\nimport { sampleRUM } from './aem.js';\n\nsampleRUM('cwv');   // reports field Core Web Vitals for sampled visitors\nsampleRUM('click', { source: '.cards a' });  // basic interaction tracking\n\n// No cookies, no personal data -> no cookie-consent banner needed\n// Sampling keeps the script's own footprint small",
        keyPoints: [
          'RUM measures real, field performance data from actual visitors — not just a lab score',
          'It runs in the delayed phase and samples only a fraction of visitors',
          'No cookies/personal data, so no consent banner is required',
          'Closes the loop between "Lighthouse says it\'s fast" and "users actually experience it as fast"',
        ],
        quiz: [
          {
            question: 'Why doesn\'t EDS\'s built-in RUM typically require a cookie-consent banner?',
            options: [
              'It is illegal to require one',
              'It samples only a small percentage of visitors',
              'It reports aggregate performance data without cookies or personal data',
              'Consent banners are handled by the CDN automatically',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'Your Lighthouse CI score is 98, but you suspect real users on slow networks are having a worse experience. How would you find out in an EDS project?',
            difficulty: 'hard',
            frequency: 'rare',
            answer: {
              english:
                "Look at the project's RUM data rather than trusting Lighthouse alone. Lighthouse is a single, controlled lab run; RUM samples real visitors on their actual devices and networks and reports field Core Web Vitals (LCP, CLS, INP) back continuously. A gap between a high lab score and worse field data usually points to real-world conditions Lighthouse doesn't simulate — slow 3G, low-end devices, or a third-party script that only misbehaves for some users.",
              hinglish:
                "Sirf Lighthouse pe trust karne ke bajaye project ke RUM data ko dekho. Lighthouse ek single, controlled lab run hai; RUM real visitors ko unke actual devices aur networks pe sample karta hai aur field Core Web Vitals (LCP, CLS, INP) continuously wapas report karta hai. Ek high lab score aur worse field data ke beech gap usually un real-world conditions ki taraf ishara karta hai jinhe Lighthouse simulate nahi karta — slow 3G, low-end devices, ya ek third-party script jo sirf kuch users ke liye misbehave karti hai.",
            },
          },
        ],
      },
      {
        title: 'Testing Blocks — Linting, CI Checks & Visual Regression',
        difficulty: 'medium',
        tags: ['eds', 'testing', 'ci', 'linting'],
        explanation: {
          english:
            "Since there's no build step and no framework test-renderer, EDS testing leans on a few lighter-weight layers instead of a typical Jest/React Testing Library setup. ESLint and Stylelint (both included in the boilerplate) catch obvious JS/CSS mistakes on every commit via a pre-commit hook and in CI. A GitHub Action runs Lighthouse CI against each PR's own live preview URL, failing the PR on a performance/accessibility/SEO regression — this is EDS's substitute for a traditional 'does it still work' test, since a broken block usually also tanks the Lighthouse score. For genuine functional testing, teams write plain browser-based tests (e.g. Playwright) that load a real preview URL and assert on the rendered DOM after decoration — testing the OUTPUT of decorate() rather than unit-testing the function in isolation, since there's no virtual DOM to render against outside a real browser.",
          hinglish:
            "Kyunki koi build step nahi hai aur koi framework test-renderer nahi hai, EDS testing ek typical Jest/React Testing Library setup ke bajaye kuch lighter-weight layers pe leki hai. ESLint aur Stylelint (dono boilerplate mein included) har commit pe ek pre-commit hook aur CI mein obvious JS/CSS mistakes pakadte hain. Ek GitHub Action har PR ki apni live preview URL ke against Lighthouse CI chalata hai, ek performance/accessibility/SEO regression pe PR ko fail karte hue — ye EDS ka substitute hai ek traditional 'kya ye abhi bhi kaam karta hai' test ke liye, kyunki ek tuta hua block usually Lighthouse score bhi tank kar deta hai. Genuine functional testing ke liye, teams plain browser-based tests likhti hain (jaise Playwright) jo ek real preview URL load karte hain aur decoration ke baad rendered DOM pe assert karte hain — decorate() ke OUTPUT ko test karte hue na ki function ko isolation mein unit-test karte hue, kyunki ek real browser ke bahar render karne ke liye koi virtual DOM nahi hai.",
        },
        dailyLifeExample:
          'Ye ek bakery jaisa hai jo har din ke aakhir mein sirf recipe check nahi karti (unit test), balki asli oven mein bana hua asli cake taste karti hai (Lighthouse CI on live preview) — kyunki final result hi asli maayne rakhta hai, na ki recipe kitni "sahi" likhi gayi thi.',
        codeExample:
          "// .github/workflows/*.yml — runs on every PR\n# 1. ESLint + Stylelint — catches JS/CSS mistakes\n# 2. Lighthouse CI against the PR's own live preview URL\n#    fails the PR if performance/a11y/SEO regresses\n\n// A Playwright-style functional test — tests decorate()'s OUTPUT, not the function itself\ntest('cards block renders as a list', async ({ page }) => {\n  await page.goto('https://pr-123--repo--org.aem.page/test-page');\n  const items = await page.locator('.cards ul li').count();\n  expect(items).toBeGreaterThan(0);\n});",
        keyPoints: [
          'ESLint/Stylelint catch mistakes pre-commit and in CI',
          'Lighthouse CI on the PR\'s live preview URL substitutes for a "does it work" test',
          'Functional tests assert on decorate()\'s rendered DOM output, in a real browser',
          'There is no virtual-DOM unit-testing layer — EDS leans on real browser testing instead',
        ],
        quiz: [
          {
            question: 'Why do EDS projects typically use Lighthouse CI as a stand-in for a "does the page still work" check?',
            options: [
              'Lighthouse cannot detect performance issues',
              'A broken block usually also degrades the Lighthouse score, so it doubles as a regression signal',
              'Lighthouse replaces the need for any code review',
              'It is unrelated to functional correctness',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you write an automated test to catch a regression in a block, given EDS has no virtual DOM or component test-renderer?',
            difficulty: 'medium',
            frequency: 'rare',
            answer: {
              english:
                "Write a real-browser test (e.g. with Playwright) that loads the block's own live preview URL and asserts on the actual rendered DOM after decorate() has run — for example, checking that a Cards block produces a <ul> with the expected number of <li> items. Since there's no virtual DOM to test against, you test the genuine output in a genuine browser rather than unit-testing decorate() in isolation.",
              hinglish:
                "Ek real-browser test likho (jaise Playwright se) jo block ki khud ki live preview URL load kare aur decorate() chalne ke baad actual rendered DOM pe assert kare — for example, check karo ki ek Cards block expected number of <li> items wala ek <ul> produce karta hai. Kyunki test karne ke liye koi virtual DOM nahi hai, tum ek genuine browser mein genuine output test karte ho, decorate() ko isolation mein unit-test karne ke bajaye.",
            },
          },
        ],
      },
      {
        title: 'The Universal Editor — Visual, WYSIWYG Authoring',
        difficulty: 'hard',
        tags: ['eds', 'universal-editor', 'authoring', 'advanced'],
        explanation: {
          english:
            "Document-based authoring (Google Docs/SharePoint) is EDS's default, but it has a real limitation: an author can't see what a block will actually look like until they check the preview. The Universal Editor is Adobe's newer, optional visual authoring layer that sits on top of the same content/code model — it renders the real, decorated page in an iframe and lets an author click directly on a block to edit its fields in a side panel, WYSIWYG-style, closer to a traditional page builder. To support it, a block needs a small extra file — usually a component definition/model (JSON) describing its editable fields — alongside the existing `<name>.js`/`<name>.css`, so the Universal Editor knows what's editable and how. It's opt-in per project: document-based authoring and the Universal Editor can coexist, and many teams still default to documents for their simplicity while offering the Universal Editor for authors who want a more visual workflow.",
          hinglish:
            "Document-based authoring (Google Docs/SharePoint) EDS ka default hai, par isme ek real limitation hai: ek author ye nahi dekh sakta ki ek block actually kaisa dikhega jab tak wo preview check na kare. Universal Editor Adobe ka naya, optional visual authoring layer hai jo usi content/code model ke upar baithta hai — ye real, decorated page ko ek iframe mein render karta hai aur author ko seedha ek block pe click karke uske fields ko ek side panel mein edit karne deta hai, WYSIWYG-style, ek traditional page builder ke zyada kareeb. Ise support karne ke liye, ek block ko ek chhoti extra file chahiye — usually ek component definition/model (JSON) jo uske editable fields describe karti hai — existing `<name>.js`/`<name>.css` ke saath. Universal Editor ko pata chalta hai ki kya editable hai aur kaise. Ye per-project opt-in hai: document-based authoring aur Universal Editor saath reh sakte hain, aur bahut saari teams still documents ko unki simplicity ke liye default rakhti hain jabki un authors ko Universal Editor offer karti hain jinhe zyada visual workflow chahiye.",
        },
        dailyLifeExample:
          'Ye ek darzi ke paas kapda order karne ke do tarike jaisa hai — ek, tum ek kaagaz pe measurements likh ke bhej do (document-based authoring, fast par tum result tabhi dekhte ho jab kapda ban jaaye), doosra, tum khud shop mein jaake mirror ke saamne khade ho ke live adjustments dekhte ho (Universal Editor, WYSIWYG, dheema par visual).',
        codeExample:
          "// blocks/cards/_cards.json — a component model for the Universal Editor\n// (lives alongside cards.js and cards.css, describes editable fields)\n{\n  \"definitions\": [\n    {\n      \"title\": \"Cards\",\n      \"id\": \"cards\",\n      \"plugins\": {\n        \"xwalk\": {\n          \"page\": {\n            \"resourceType\": \"core/franklin/components/block/v1/block\",\n            \"template\": { \"name\": \"Cards\" }\n          }\n        }\n      }\n    }\n  ]\n}\n// The block's own decorate()/CSS stay exactly the same — this file only\n// teaches the Universal Editor what's editable and how to render the toolbar.",
        keyPoints: [
          'Document-based authoring is the default; the Universal Editor is an optional visual layer on top',
          'It renders the real decorated page and lets authors edit fields via a side panel, WYSIWYG-style',
          'A block needs an extra component-definition file to be Universal-Editor-aware',
          'decorate()/CSS stay unchanged — the model file only adds editability metadata',
        ],
        quiz: [
          {
            question: 'What real limitation of document-based authoring does the Universal Editor address?',
            options: [
              'Documents cannot hold images',
              'Authors can\'t see what a block will actually look like until they check the preview',
              'Documents are too slow to save',
              'It removes the need for developers entirely',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'A marketing team wants a more visual, "what you see is what you get" authoring experience than typing tables into a Google Doc. What EDS feature addresses this, and what does a developer need to add?',
            difficulty: 'hard',
            frequency: 'rare',
            answer: {
              english:
                "The Universal Editor — an optional visual authoring layer that renders the real, decorated page and lets authors edit a block's fields directly in a side panel. To support it, a developer adds a small component-definition file (a JSON model describing the block's editable fields) alongside the existing decorate()/CSS files; the block's rendering logic itself doesn't change.",
              hinglish:
                "Universal Editor — ek optional visual authoring layer jo real, decorated page render karta hai aur authors ko block ke fields directly ek side panel mein edit karne deta hai. Ise support karne ke liye, ek developer ek chhoti component-definition file add karta hai (ek JSON model jo block ke editable fields describe karta hai) existing decorate()/CSS files ke saath; block ka rendering logic khud nahi badalta.",
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Styling & Authoring Conventions Beyond Blocks',
    level: 'advanced',
    description: 'Icons, author-driven buttons, aur section-level styling — content jo blocks nahi hai.',
    concepts: [
      {
        title: 'Icons — the :icon-name: Convention',
        difficulty: 'medium',
        tags: ['eds', 'icons', 'conventions', 'authoring'],
        explanation: {
          english:
            "Not every visual element deserves a full block — a phone icon next to a number, a checkmark in a list, needs to be author-insertable without an image upload dialog. EDS's convention: an author types a name wrapped in colons directly in the text, like `:phone:`, and a `decorateIcons()` step (run during the eager phase, alongside block decoration) scans every text node on the page for that pattern and replaces it with an inline `<img>`/`<svg>` sourced from a matching file in the `icons/` folder (e.g. `icons/phone.svg`). This is emoji-like from the author's point of view — type a name between colons — but produces a real, developer-controlled SVG rather than relying on the OS's emoji font, so the icon's style stays consistent with the brand across every browser and device.",
          hinglish:
            "Har visual element ek poora block deserve nahi karta — ek number ke baaju mein phone icon, ek list mein ek checkmark, isse author ko bina image upload dialog ke insert karne layak hona chahiye. EDS ka convention: author text mein directly colons ke andar wrapped ek naam type karta hai, jaise `:phone:`, aur ek `decorateIcons()` step (eager phase mein chalta hai, block decoration ke saath) page ke har text node ko us pattern ke liye scan karta hai aur use ek inline `<img>`/`<svg>` se replace kar deta hai jo `icons/` folder mein ek matching file se aata hai (jaise `icons/phone.svg`). Ye author ke nazariye se emoji jaisa hai — colons ke beech ek naam type karo — par ek real, developer-controlled SVG produce karta hai, OS ke emoji font pe depend karne ke bajaye, isliye icon ka style har browser aur device pe brand ke saath consistent rehta hai.",
        },
        dailyLifeExample:
          'Ye ek WhatsApp mein `:smile:` type karke emoji laane jaisa hai — tumhe kabhi ek image file dhoondhni ya upload nahi karni padti, bas naam yaad rakhna hai. EDS mein bhi author ko sirf ye yaad rakhna hai ki `:phone:` type karne se ek professional-looking phone icon aa jaayega, image files se kabhi nahi jhoolna padta.',
        codeExample:
          "// Author types this directly in the Google Doc:\n//   Call us :phone: or email :email: anytime\n\n// scripts.js — simplified decorateIcons()\nexport function decorateIcons(element) {\n  element.querySelectorAll('span.icon').forEach((span) => {\n    // EDS's doc conversion already wraps :name: as <span class=\"icon icon-name\">\n    const name = [...span.classList].find((c) => c.startsWith('icon-'))?.replace('icon-', '');\n    const img = document.createElement('img');\n    img.src = `/icons/${name}.svg`;\n    img.loading = 'lazy';\n    span.append(img);\n  });\n}\n\n// icons/phone.svg — a developer-owned SVG file, one per icon name",
        keyPoints: [
          'Authors insert icons by typing :name: directly in the doc text, no image upload',
          'decorateIcons() scans for the pattern and swaps in an SVG from icons/<name>.svg',
          'Icons are real, developer-controlled SVGs — not OS emoji fonts',
          'Runs during the eager phase, alongside normal block decoration',
        ],
        quiz: [
          {
            question: 'How does a non-technical author add a phone icon to a line of text in EDS?',
            options: [
              'By uploading an SVG file through a code editor',
              'By typing :phone: directly in the document text',
              'By asking a developer to hardcode it',
              'Icons cannot be author-inserted in EDS',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you let a non-technical author insert a consistent, on-brand icon without giving them access to code or an asset library?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                "Use EDS's icon convention: the author types the icon's name wrapped in colons directly in the document text (e.g. :phone:). A decorateIcons() step, run during the eager phase, scans the page for that pattern and replaces it with an SVG from the icons/ folder — giving the author an emoji-like authoring experience while the actual visual asset stays fully developer-controlled.",
              hinglish:
                "EDS ka icon convention use karo: author icon ka naam colons ke andar wrapped directly document text mein type karta hai (jaise :phone:). Eager phase mein chalne wala ek decorateIcons() step us pattern ke liye page scan karta hai aur use icons/ folder se ek SVG se replace kar deta hai — author ko ek emoji jaisa authoring experience dete hue jabki actual visual asset poori tarah developer-controlled rehta hai.",
            },
          },
        ],
      },
      {
        title: 'Buttons & Links — Author-Driven Styling Without a Button Block',
        difficulty: 'medium',
        tags: ['eds', 'buttons', 'links', 'conventions'],
        explanation: {
          english:
            "A call-to-action button is common enough that requiring a dedicated \"Button\" block table for it would be authoring friction for something this simple. EDS's default boilerplate instead reads FORMATTING as intent: a link that is the ONLY content of its own paragraph is treated as a button; if that link text is bold, it becomes a primary (filled) button, and if italic, a secondary (outlined) button — styled via `.button` / `.button.primary` / `.button.secondary` classes added by a `decorateButtons()` step that runs alongside block decoration. This means an author creates a working, on-brand CTA button using formatting they already know from Word/Docs (bold, italic on a link) with zero new UI to learn, and a developer never has to build a Button block at all for the common case.",
          hinglish:
            "Ek call-to-action button itna common hota hai ki uske liye ek dedicated \"Button\" block table maangna itni simple cheez ke liye authoring friction hoga. EDS ka default boilerplate iske bajaye FORMATTING ko intent ki tarah padhta hai: ek link jo apne poore paragraph ka EKMATRA content hai use button treat kiya jaata hai; agar us link ka text bold hai, ye ek primary (filled) button ban jaata hai, aur agar italic hai, ek secondary (outlined) button — `.button` / `.button.primary` / `.button.secondary` classes se styled jo ek `decorateButtons()` step add karta hai jo block decoration ke saath chalta hai. Matlab ek author ek working, on-brand CTA button bana leta hai us formatting se jo use already Word/Docs se pata hai (bold, italic ek link pe), zero naya UI seekhne ki zaroorat nahi, aur ek developer ko common case ke liye kabhi ek Button block banana hi nahi padta.",
        },
        dailyLifeExample:
          'Ye restaurant ke menu mein "Today\'s Special" ko underline ya bold karke highlight karne jaisa hai — waiter (developer) ko ye samjhaane ki zaroorat nahi ki ye special hai, formatting khud hi signal de deti hai. Author bhi bas ek link ko bold kar deta hai aur wo automatically ek eye-catching button ban jaata hai.',
        codeExample:
          "// Author types a link as the ONLY content of its paragraph, in bold:\n//   **[Get Started](https://example.com/signup)**\n// -> becomes a PRIMARY button\n\n// scripts.js — simplified decorateButtons()\nexport function decorateButtons(element) {\n  element.querySelectorAll('p > a:only-child').forEach((a) => {\n    const p = a.parentElement;\n    a.classList.add('button');\n    if (p.querySelector('strong')) a.classList.add('button', 'primary');\n    else if (p.querySelector('em')) a.classList.add('button', 'secondary');\n    p.replaceWith(a);\n  });\n}\n\n/* styles/styles.css */\n.button.primary  { background: var(--brand-color); color: white; }\n.button.secondary { border: 2px solid var(--brand-color); background: transparent; }",
        keyPoints: [
          'A link alone in its own paragraph is auto-detected as a button — no Button block needed',
          'Bold link text -> primary (filled) button; italic -> secondary (outlined) button',
          'decorateButtons() runs alongside block decoration, reading formatting as intent',
          'Authors reuse formatting they already know (bold/italic) instead of learning new UI',
        ],
        quiz: [
          {
            question: 'How does an author create a "primary" styled CTA button in the default EDS boilerplate?',
            options: [
              'By typing a table with the word "Button"',
              'By putting a link alone in its own paragraph and making the link text bold',
              'By asking a developer to add custom CSS for that one link',
              'It is not possible without a dedicated Button block',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why doesn\'t the default EDS boilerplate ship a dedicated "Button" block, and how do authors still get styled CTA buttons?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "Because a button is common and simple enough that requiring a separate block table would be unnecessary authoring friction. Instead, decorateButtons() reads formatting as intent: a link alone in its own paragraph becomes a button, bold makes it primary, italic makes it secondary — reusing formatting authors already know from Word/Docs rather than teaching a new authoring pattern.",
              hinglish:
                "Kyunki ek button itna common aur simple hai ki ek alag block table maangna unnecessary authoring friction hoga. Iske bajaye, decorateButtons() formatting ko intent ki tarah padhta hai: apne poore paragraph mein akela link ek button ban jaata hai, bold use primary banata hai, italic secondary banata hai — us formatting ko reuse karte hue jo authors ko already Word/Docs se pata hai, ek naya authoring pattern sikhane ke bajaye.",
            },
          },
        ],
      },
      {
        title: 'Section Metadata — Per-Section Styling Variants',
        difficulty: 'medium',
        tags: ['eds', 'section-metadata', 'sections', 'styling'],
        explanation: {
          english:
            "Page Metadata (covered earlier) sets values for the WHOLE page — title, description. Section Metadata is a different, similarly-named table that an author places at the END of one specific section, and it only affects that one section's wrapper `<div class=\"section\">`. Its rows become extra classes or a background-image/colour on that section — e.g. a \"style: highlight\" row adds a `highlight-container` class, which a developer's CSS then styles (a tinted background, extra padding) — without needing a whole new block just to change one section's background. This is the section-level counterpart to block variations: block variations restyle ONE block, section metadata restyles the WRAPPER holding possibly several blocks and text together.",
          hinglish:
            "Page Metadata (pehle cover ki) POORE page ke liye values set karti hai — title, description. Section Metadata ek alag, similarly-named table hai jise author ek specific section ke AAKHIR mein rakhta hai, aur ye sirf us ek section ke wrapper `<div class=\"section\">` ko affect karti hai. Iski rows us section pe extra classes ya ek background-image/colour ban jaati hain — jaise ek \"style: highlight\" row ek `highlight-container` class add karti hai, jise ek developer ka CSS phir style karta hai (ek tinted background, extra padding) — bina ek poora naya block banaye sirf ek section ka background badalne ke liye. Ye block variations ka section-level counterpart hai: block variations ek AKELE block ko restyle karte hain, section metadata us WRAPPER ko restyle karta hai jo shaayad kai blocks aur text ko saath rakhta hai.",
        },
        dailyLifeExample:
          'Ye ek report mein ek poore paragraph ke around ek highlighter box lagane jaisa hai — tum har word ko alag se highlight nahi karte (block variations), tum poore hisse ke around ek box daal dete ho taaki wo standout kare (section metadata), chahe uske andar text ho ya ek table ho ya dono.',
        codeExample:
          '# In the doc, at the end of one section (before the next `---`):\n# | Section Metadata |\n# | Style | highlight |\n\n# EDS adds a class to that section\'s wrapper:\n# <div class="section highlight-container">...</div>\n\n/* styles/styles.css */\n.highlight-container {\n  background: var(--highlight-bg, #fef3c7);\n  padding: 48px 24px;\n}',
        keyPoints: [
          'Section Metadata is placed at the end of one section, unlike page-level Metadata',
          'Its rows become extra classes/background on that section\'s wrapper div only',
          'It restyles a whole section (possibly several blocks + text), not just one block',
          'A common use: a "highlight" or "narrow" style row without a new block',
        ],
        quiz: [
          {
            question: 'What is the key difference between "Metadata" and "Section Metadata" tables in an EDS document?',
            options: [
              'They are the same thing with two names',
              'Metadata sets page-wide values (title, description); Section Metadata styles only the section it\'s placed in',
              'Section Metadata is only for images',
              'Metadata is deprecated in favour of Section Metadata',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'An author wants one section of a page to have a tinted background while the rest of the page stays default, without a developer touching every block inside it. How would you support this?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                "Use a Section Metadata table placed at the end of that specific section — e.g. a \"Style: highlight\" row. EDS adds the resulting class (e.g. highlight-container) to that section's own wrapper div, not to the blocks inside it, so a single CSS rule styles the whole section's background regardless of how many blocks or text pieces it contains.",
              hinglish:
                "Us specific section ke aakhir mein ek Section Metadata table use karo — jaise ek \"Style: highlight\" row. EDS resulting class (jaise highlight-container) ko us section ke apne wrapper div pe add karta hai, uske andar ke blocks pe nahi, isliye ek single CSS rule poore section ke background ko style kar deti hai chahe usme kitne bhi blocks ya text pieces ho.",
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Scaling EDS: Localization, Experimentation & Author Tooling',
    level: 'advanced',
    description: 'Multi-language sites, A/B testing, aur Sidekick se author experience.',
    concepts: [
      {
        title: 'Multi-Language Sites — Locale-per-Folder Content Structure',
        difficulty: 'hard',
        tags: ['eds', 'localization', 'i18n', 'multi-language'],
        explanation: {
          english:
            "A global brand needs the same site in many languages, and EDS's document model handles this with a folder convention rather than any special i18n framework: content lives at paths like `/us/en/...`, `/fr/fr/...`, `/in/hi/...` — one document tree per locale — while the SAME code repo (same blocks, same scripts.js) serves all of them. A block's decorate() logic doesn't change per language; only the content it decorates does. The remaining pieces are conventional web i18n concerns layered on top: a language-switcher block that maps the current path to its sibling in another locale folder, `hreflang` tags injected via each page's Metadata, and locale-specific nav/footer documents (since nav/footer are fetched per the fragment mechanism, a French page's nav can point at a French nav document). The key insight for an interview: EDS doesn't need a dedicated localization FEATURE, because the content/code split already does most of the work — content naturally varies per folder, code naturally stays shared.",
          hinglish:
            "Ek global brand ko bahut saari languages mein wahi site chahiye hoti hai, aur EDS ka document model ise ek folder convention se handle karta hai, kisi special i18n framework se nahi: content aise paths pe rehta hai jaise `/us/en/...`, `/fr/fr/...`, `/in/hi/...` — har locale ke liye ek document tree — jabki WAHI code repo (same blocks, same scripts.js) sabko serve karta hai. Ek block ka decorate() logic language ke hisaab se nahi badalta; sirf wo content badalta hai jise wo decorate karta hai. Baaki pieces conventional web i18n concerns hain jo upar layer hote hain: ek language-switcher block jo current path ko doosre locale folder mein uske sibling se map karta hai, har page ke Metadata ke through inject hue `hreflang` tags, aur locale-specific nav/footer documents (kyunki nav/footer fragment mechanism ke through fetch hote hain, ek French page ka nav ek French nav document ko point kar sakta hai). Interview ke liye key insight: EDS ko ek dedicated localization FEATURE ki zaroorat nahi, kyunki content/code split already zyadatar kaam kar deta hai — content naturally folder ke hisaab se vary karta hai, code naturally shared rehta hai.",
        },
        dailyLifeExample:
          'Ye ek restaurant chain jaisa hai jiska ek hi kitchen design aur recipe book (code) har branch (locale) mein same hai, par har branch apne local zaike ke hisaab se menu likh leta hai apni khud ki language mein (content per folder) — kitchen dobara design nahi karni padti, sirf menu card alag hota hai.',
        codeExample:
          "# Content structure — one document tree per locale, same code repo\n/us/en/index      /fr/fr/index      /in/hi/index\n/us/en/about      /fr/fr/about      /in/hi/about\n\n# The SAME blocks/cards/cards.js decorates all of them —\n# only the content it reads differs per locale\n\n# A language switcher just maps path segments:\nfunction switchLocale(currentPath, newLocale) {\n  const parts = currentPath.split('/');\n  parts[1] = newLocale.split('-')[0];   // 'us' -> 'fr'\n  parts[2] = newLocale.split('-')[1];   // 'en' -> 'fr'\n  return parts.join('/');\n}",
        keyPoints: [
          'Locales are separated by folder path (/us/en/, /fr/fr/), not by a framework feature',
          'The exact same code repo/blocks serve every locale — only content differs',
          'Nav/footer fragments and hreflang metadata can be authored per-locale',
          'EDS\'s content/code split does most of the localization work "for free"',
        ],
        quiz: [
          {
            question: 'How does EDS typically support a multi-language site?',
            options: [
              'A special i18n framework built into scripts.js',
              'Separate document trees per locale (folder-based), served by the same shared code repo',
              'A completely separate code repo per language',
              'It does not support multiple languages',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you architect a 5-country, 5-language EDS site without maintaining 5 separate codebases?',
            difficulty: 'hard',
            frequency: 'rare',
            answer: {
              english:
                "One shared code repo (blocks, scripts, styles) serves all five, since decorate() logic doesn't depend on language — only the content it decorates does. Content is organised into one document tree per locale (e.g. /us/en/, /fr/fr/), each authored independently. A language-switcher block maps the current path to its sibling in another locale folder, and nav/footer/hreflang are authored per-locale using the same fragment and metadata mechanisms already used elsewhere.",
              hinglish:
                "Ek shared code repo (blocks, scripts, styles) sabhi paanch ko serve karta hai, kyunki decorate() logic language pe depend nahi karta — sirf wo content depend karta hai jise ye decorate karta hai. Content ko har locale ke liye ek document tree mein organise kiya jaata hai (jaise /us/en/, /fr/fr/), har ek independently authored. Ek language-switcher block current path ko doosre locale folder mein uske sibling se map karta hai, aur nav/footer/hreflang per-locale authored hote hain wahi fragment aur metadata mechanisms use karke jo kahin aur pehle se use hote hain.",
            },
          },
        ],
      },
      {
        title: 'A/B Testing & Personalization with Experiments',
        difficulty: 'hard',
        tags: ['eds', 'experimentation', 'ab-testing', 'personalization'],
        explanation: {
          english:
            "Marketing teams routinely want to A/B test a hero headline or a CTA without waiting on a developer. EDS's experimentation plugin keeps this document-native: instead of a separate variant-management tool, a variant is just another sibling document (e.g. `/campaign` and `/campaign/variant-b`), and a Metadata-like table on the control page declares the experiment — its name, which variant paths participate, and the traffic split. At runtime, a small script (loaded early, before render, to avoid a visible flash of the wrong variant) picks a variant per visitor, swaps in that variant's content, and tags the pageview so RUM can correlate which variant a user saw with what they did next — turning EDS's own built-in analytics into the experiment's measurement layer, with no separate tool like Optimizely required.",
          hinglish:
            "Marketing teams aksar chahti hain ki ek hero headline ya ek CTA A/B test ho jaaye bina kisi developer ka wait kiye. EDS ka experimentation plugin ise document-native rakhta hai: ek alag variant-management tool ke bajaye, ek variant bas ek aur sibling document hota hai (jaise `/campaign` aur `/campaign/variant-b`), aur control page pe ek Metadata-jaisi table experiment declare karti hai — uska naam, kaunse variant paths participate karte hain, aur traffic split. Runtime pe, ek chhota script (jaldi load hota hai, render se pehle, taaki galat variant ka visible flash na ho) har visitor ke liye ek variant chunta hai, us variant ka content swap karta hai, aur pageview ko tag karta hai taaki RUM correlate kar sake ki user ne kaunsa variant dekha aur usne aage kya kiya — EDS ke khud ke built-in analytics ko experiment ka measurement layer bana dete hue, koi alag tool jaise Optimizely ki zaroorat nahi.",
        },
        dailyLifeExample:
          'Ye ek dukaan ke do alag boards test karne jaisa hai — aadhe customers ko ek board dikhao, baaki aadhe ko doosra, aur dekho kaunsa zyada log andar aate hain. Har board (variant) already poori tarah bana hua hai (ek sibling document), tumhe bas kisko kaunsa board dikhana hai ye decide karna hai aur result track karna hai.',
        codeExample:
          '# Control page /campaign has an experiment declared via a table:\n# | Experiment |\n# | Experiment | homepage-hero-test |\n# | Variants   | /campaign/variant-b |\n# | Split      | 50 |\n\n# Runtime (simplified) — runs early, before the page paints:\nasync function runExperiment(config) {\n  const bucket = Math.random() < config.split / 100 ? \'variant-b\' : \'control\';\n  if (bucket !== \'control\') {\n    const html = await fetch(`${config.variants[0]}.plain.html`).then((r) => r.text());\n    document.querySelector(\'main\').innerHTML = html;\n  }\n  sampleRUM(\'experiment\', { source: config.name, target: bucket });\n}',
        keyPoints: [
          'A variant is just another sibling document, authored like any other page',
          'The experiment (name, variants, split) is declared via a Metadata-style table',
          'A variant-picking script runs early, before paint, to avoid a flash of the wrong content',
          'RUM tags which variant a visitor saw, doubling as the experiment\'s analytics — no separate tool needed',
        ],
        quiz: [
          {
            question: 'In EDS, what is an A/B test "variant" at the content level?',
            options: [
              'A special database record',
              'Just another sibling document, authored the same way as any page',
              'A separate deployment of the entire site',
              'A CSS-only change with no content difference',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'A marketing team wants to A/B test two versions of a landing page headline without any code changes. How does EDS support this?',
            difficulty: 'hard',
            frequency: 'rare',
            answer: {
              english:
                "The variant is authored as a sibling document (e.g. /campaign/variant-b), and the control page declares the experiment via a Metadata-style table naming the experiment, its variant paths, and the traffic split — no code change needed. A runtime script, loaded early to avoid a flash of the wrong content, buckets each visitor and swaps in the chosen variant's content, tagging the pageview so RUM can report which variant performed better.",
              hinglish:
                "Variant ek sibling document ki tarah authored hota hai (jaise /campaign/variant-b), aur control page ek Metadata-style table ke through experiment declare karta hai jo experiment ka naam, uske variant paths, aur traffic split batati hai — koi code change nahi chahiye. Ek runtime script, jaldi load hota hai galat content ka flash avoid karne ke liye, har visitor ko bucket karta hai aur chune hue variant ka content swap karta hai, pageview ko tag karte hue taaki RUM report kar sake ki kaunsa variant behtar perform kiya.",
            },
          },
        ],
      },
      {
        title: 'The Sidekick — Author Tooling for Preview, Publish & Bulk Actions',
        difficulty: 'medium',
        tags: ['eds', 'sidekick', 'authoring', 'tooling'],
        explanation: {
          english:
            "Authors shouldn't need to know EDS's URL structure (`.page` vs `.live`, branch names) to do their job. The Sidekick is a browser extension that gives them that workflow as buttons instead: opened from either the Google Doc itself or the live page, it offers one-click Preview (convert this doc and show the result), Publish (promote preview to live), and Reload/Edit shortcuts, plus bulk operations like previewing or publishing every document in a folder at once for a big content update. For developers, the Sidekick is also extensible — a project can register custom plugins (extra buttons) that call project-specific tooling, like a 'translate this page' action or a custom validation check, directly from the same toolbar authors already use.",
          hinglish:
            "Authors ko apna kaam karne ke liye EDS ki URL structure (`.page` vs `.live`, branch names) jaanne ki zaroorat nahi honi chahiye. Sidekick ek browser extension hai jo unhe ye workflow buttons ki tarah deta hai: ya to Google Doc se ya live page se khola jaata hai, ye one-click Preview (is doc ko convert karo aur result dikhao), Publish (preview ko live mein promote karo), aur Reload/Edit shortcuts offer karta hai, plus bulk operations jaise ek folder ki har document ko ek saath preview ya publish karna ek badi content update ke liye. Developers ke liye, Sidekick extensible bhi hai — ek project custom plugins (extra buttons) register kar sakta hai jo project-specific tooling call karte hain, jaise ek 'is page ko translate karo' action ya ek custom validation check, wahi toolbar se jo authors already use karte hain.",
        },
        dailyLifeExample:
          'Ye ek remote control jaisa hai jo tumhe TV ke andar ke complex circuits jaane bina channel badalne deta hai — author ko URL structure ya technical steps yaad rakhne ki zaroorat nahi, wo bas Sidekick ke "Publish" button pe click karta hai, jaise remote ke ek button se TV on ho jaata hai.',
        codeExample:
          "# What the Sidekick gives an author, as buttons — no URL knowledge needed:\n#   Preview   -> converts the current doc and opens its .page preview\n#   Publish   -> promotes that document from preview to live (.live)\n#   Edit      -> jumps from the live/preview page back to its source doc\n#   Bulk      -> preview/publish every doc in a selected folder at once\n\n# tools/sidekick/config.json — developers can register custom plugins\n{\n  \"plugins\": [\n    { \"id\": \"translate\", \"title\": \"Translate Page\", \"url\": \"https://internal-tool/translate\" }\n  ]\n}",
        keyPoints: [
          'The Sidekick is a browser extension giving authors Preview/Publish/Edit as buttons',
          'It works directly from either the Google Doc or the rendered page',
          'It supports bulk operations across a whole folder of documents',
          'Developers can extend it with custom plugins for project-specific author actions',
        ],
        quiz: [
          {
            question: 'What problem does the Sidekick solve for content authors?',
            options: [
              'It writes decorate() functions automatically',
              'It gives authors Preview/Publish/Edit as simple buttons, without needing to know EDS\'s URL structure',
              'It replaces the need for Google Docs entirely',
              'It is a code linter for developers only',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'An author asks how they\'re supposed to "publish" a page if they\'ve never seen a URL like .aem.live. What do you tell them, and what would you build for a project-specific action they need?',
            difficulty: 'medium',
            frequency: 'rare',
            answer: {
              english:
                "They don't need to know the URL structure at all — the Sidekick browser extension gives them Preview and Publish as one-click buttons, usable directly from their Google Doc or the rendered page. For a project-specific action (e.g. a translation trigger), a developer registers a custom Sidekick plugin in the project's config, which shows up as an extra button in the same toolbar the author already uses.",
              hinglish:
                "Unhe URL structure jaanne ki zaroorat hi nahi hai — Sidekick browser extension unhe Preview aur Publish one-click buttons ki tarah deta hai, directly unke Google Doc ya rendered page se usable. Ek project-specific action ke liye (jaise ek translation trigger), ek developer project ke config mein ek custom Sidekick plugin register karta hai, jo usi toolbar mein ek extra button ki tarah dikhta hai jo author already use karta hai.",
            },
          },
        ],
      },
    ],
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];

export const generalInterviewQuestions = [
  {
    question: 'What does the decorate() function receive as its argument, and what must it return?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        "It receives the block's own raw DOM element (the <div> whose class matches the block's folder name) and mutates it in place — it does not need to return anything, since scripts.js already holds a reference to the same element and simply continues once the function resolves.",
      hinglish:
        "Ye block ka apna raw DOM element leta hai (wo <div> jiska class block ke folder-naam se match karta hai) aur use in-place mutate karta hai — kuch return karne ki zaroorat nahi, kyunki scripts.js ke paas already usi element ka reference hai aur function resolve hote hi bas aage badh jaata hai.",
    },
  },
  {
    question: 'Why does EDS avoid a JavaScript framework like React for block code?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        "Shipping a framework runtime (plus a virtual DOM, hydration, and a build/bundle step) adds JavaScript weight and parse/execute time that directly hurts LCP and INP — the exact metrics EDS is optimised around. Since most blocks are relatively simple, content-driven UI rather than deeply interactive apps, plain DOM manipulation is enough, and skipping the framework keeps the total JS payload tiny and avoids needing a build pipeline at all.",
      hinglish:
        "Ek framework runtime ship karna (plus virtual DOM, hydration, aur ek build/bundle step) JavaScript weight aur parse/execute time add karta hai jo directly LCP aur INP ko hurt karta hai — exactly wahi metrics jinke around EDS optimise hai. Kyunki zyadatar blocks relatively simple, content-driven UI hote hain, deeply interactive apps nahi, plain DOM manipulation kaafi hai, aur framework skip karne se total JS payload chhota rehta hai aur build pipeline ki zaroorat hi nahi padti.",
    },
  },
  {
    question: 'What happens if two different blocks accidentally use the same, unscoped CSS class name?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        "Because every block's CSS file loads globally on every page (there's no CSS Modules-style automatic scoping), an unscoped rule in one block's CSS silently applies to any matching element from another block too — causing unexpected style leakage. This is exactly why the convention is to always prefix every selector with the block's own class name (e.g. `.cards .cards-card-image`, never a bare `.cards-card-image`).",
      hinglish:
        "Kyunki har block ki CSS file globally har page pe load hoti hai (koi CSS Modules-style automatic scoping nahi hai), ek block ke CSS mein ek unscoped rule chupke se doosre block ke matching element pe bhi apply ho jaati hai — unexpected style leakage cause karte hue. Isi wajah se convention hai ki hamesha har selector ko block ke apne class name se prefix karo (jaise `.cards .cards-card-image`, kabhi bare `.cards-card-image` nahi).",
    },
  },
  {
    question: 'How would you debug a block that isn\'t rendering at all on a page?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        "First check the raw generated HTML directly (e.g. by requesting the page's `.plain.html`) to confirm EDS actually produced a <div> with the expected block class from the author's table — if not, the issue is in how the doc's table was structured. If the raw HTML looks right, check the browser console for an import/runtime error in the block's decorate() function, and confirm the block folder name exactly matches the class name (case-sensitive) so scripts.js's block-detection loop actually picks it up.",
      hinglish:
        "Pehle raw generated HTML directly check karo (jaise page ka `.plain.html` request karke) ye confirm karne ke liye ki EDS ne author ke table se actually expected block class wala ek <div> banaya — agar nahi, to issue doc ke table ke structure mein hai. Agar raw HTML sahi lag raha hai, to browser console mein block ke decorate() function mein koi import/runtime error check karo, aur confirm karo ki block folder ka naam exactly class name se match karta hai (case-sensitive) taaki scripts.js ka block-detection loop use actually pick kare.",
    },
  },
  {
    question: 'What is the "works on my machine" style problem that EDS\'s local dev server proxy setup solves?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        "Without a proxy, developers would need to fake/mock realistic content locally to test blocks, which drifts from real production content over time and hides bugs that only show up with real author-entered data (missing rows, unusual formatting, long text). By proxying live content from the actual Google Drive/SharePoint source while serving local code, the local dev server guarantees you're always testing against real, current content shapes.",
      hinglish:
        "Bina proxy ke, developers ko blocks test karne ke liye locally realistic content fake/mock karna padta, jo time ke saath real production content se drift kar jaata aur wo bugs chhupa deta jo sirf real author-entered data (missing rows, unusual formatting, lambi text) ke saath dikhte hain. Actual Google Drive/SharePoint source se live content proxy karke jabki local code serve karte hue, local dev server guarantee karta hai ki tum hamesha real, current content shapes ke against test kar rahe ho.",
    },
  },
  {
    question: 'A content author reports that a table for a "Cards" block isn\'t rendering as cards. What are the first things you check?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        "Check the exact spelling/casing of the block name in the table's first cell against the blocks/cards folder name (they must match). Check whether the table is nested inside another table or list, which can confuse the doc-to-HTML conversion. Then inspect the raw .plain.html output for the page to see exactly what HTML EDS generated, before assuming the bug is in your JS/CSS.",
      hinglish:
        "Table ke pehle cell mein block ke naam ki exact spelling/casing check karo blocks/cards folder ke naam ke against (dono match hone chahiye). Check karo ki table kahin doosri table ya list ke andar nested to nahi, jo doc-to-HTML conversion ko confuse kar sakta hai. Phir page ke raw .plain.html output ko inspect karo ye dekhne ke liye ki EDS ne exactly kya HTML generate kiya, ye assume karne se pehle ki bug tumhare JS/CSS mein hai.",
    },
  },
  {
    question: 'How is state management typically handled in EDS blocks, given there\'s no Redux/Context?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        "Most EDS blocks are largely stateless, content-driven UI (marketing pages), so they simply don't need shared state management. When a block does need local interactivity — a tab switcher, an accordion, a carousel — it keeps state as plain DOM state (data attributes, classList toggles, closures inside decorate()) scoped to that one block instance. Cross-block shared state is rare in practice; when genuinely needed, developers typically reach for the browser's own primitives (a small pub/sub via CustomEvent, or localStorage) rather than a state library.",
      hinglish:
        "Zyadatar EDS blocks largely stateless, content-driven UI hote hain (marketing pages), isliye unhe shared state management ki zaroorat hi nahi padti. Jab ek block ko local interactivity chahiye — ek tab switcher, ek accordion, ek carousel — wo state ko plain DOM state ki tarah rakhta hai (data attributes, classList toggles, decorate() ke andar closures) us ek block instance tak scoped. Cross-block shared state practically rare hai; jab genuinely chahiye ho, developers typically browser ke apne primitives use karte hain (CustomEvent se ek chhota pub/sub, ya localStorage) ek state library ke bajaye.",
    },
  },
  {
    question: 'Why is the sync-block-collection style tooling (syncing blocks from a shared "block collection" repo) useful across multiple EDS projects?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        "Many EDS sites need the same common blocks (Cards, Hero, Columns, Accordion). Rather than every project reinventing them, teams maintain a shared block-collection repo and pull specific blocks into a project's own blocks/ folder as needed, keeping each project's repo lean while still benefiting from battle-tested, reusable implementations — conceptually similar to installing a shared component library, just via file copying rather than an npm package.",
      hinglish:
        "Bahut saari EDS sites ko same common blocks chahiye hote hain (Cards, Hero, Columns, Accordion). Har project inhe dobara banane ke bajaye, teams ek shared block-collection repo maintain karti hain aur specific blocks ko project ke apne blocks/ folder mein zaroorat ke hisaab se pull karti hain, har project ka repo lean rakhte hue phir bhi battle-tested, reusable implementations ka fayda uthate hue — conceptually ek shared component library install karne jaisa, bas npm package ke bajaye file copying ke through.",
    },
  },

  // ─── Deeper advanced questions (see eds-deep-dives.mjs) ────
  {
    question: 'Walk through exactly what happens between an author clicking "Publish" and a user seeing the new content live.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Publish moves the document from its preview state to its live state — a content operation, not a code deploy. The pipeline re-converts the document into fresh HTML under the .live domain, the CDN edge cache is invalidated for that specific path, and the next visitor gets the newly-cached, freshly-decorated page.',
      hinglish:
        'Publish document ko uski preview state se live state mein move karta hai — ek content operation, koi code deploy nahi. Pipeline document ko fresh HTML mein .live domain ke under dobara convert karti hai, us specific path ke liye CDN edge cache invalidate hoti hai, aur agla visitor naya cached, freshly-decorated page paata hai.',
    },
  },
  {
    question: 'What is the performance cost of putting too much JavaScript inside a single block\'s decorate(), and how would you diagnose it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'decorate() runs synchronously on the main thread by default, so a heavy block delays every block behind it and delays interactivity. Diagnose it with the DevTools Performance panel — look for a long main-thread task during the eager/lazy phases — then fix by batching DOM reads/writes, deferring non-critical work to delayed.js, or moving heavy computation to a Web Worker.',
      hinglish:
        'decorate() default se main thread pe synchronously chalta hai, isliye ek heavy block uske peeche har block ko der karta hai aur interactivity ko der karta hai. Ise DevTools ke Performance panel se diagnose karo — eager/lazy phases ke dauraan ek lambi main-thread task dhoondo — phir DOM reads/writes batch karke, non-critical kaam delayed.js mein defer karke, ya heavy computation ko Web Worker mein move karke fix karo.',
    },
  },
  {
    question: 'How would you implement a "Load More" / pagination pattern inside a block, given there\'s no framework state management?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'It depends on where the data lives. If every item is already authored in the doc, all items are already in the DOM — decorate() hides items past a page size and a click handler reveals the next batch. If items come from an external source, keep "state" as a single offset variable captured in decorate()\'s closure, fetching and appending the next page on each click.',
      hinglish:
        'Ye depend karta hai data kahan rehta hai. Agar har item pehle se doc mein authored hai, sab items already DOM mein hain — decorate() ek page size ke aage items chhupa deta hai aur ek click handler agla batch reveal karta hai. Agar items external source se aate hain, "state" ko ek single offset variable rakho jo decorate() ke closure mein capture hai, har click pe agla page fetch aur append karte hue.',
    },
  },
  {
    question: 'Why can\'t a block safely call fetch() to an external API inside decorate() without extra care?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A blocking fetch inside decorate() competes with the eager/lazy loading model protecting first paint, and if awaited with no fallback, a slow or failed API means the block renders nothing — including content the author already authored. The safer pattern: decorate the authored content synchronously first, then fetch and progressively enhance afterward, with a visible loading state and error handling.',
      hinglish:
        'decorate() ke andar ek blocking fetch us eager/lazy loading model se compete karta hai jo first paint ko protect karta hai, aur agar bina fallback ke await kiya jaaye, ek slow ya failed API ka matlab hai block kuch bhi render nahi karta — us content ko bhi nahi jo author ne pehle se authored kiya tha. Safer pattern: pehle authored content ko synchronously decorate karo, phir baad mein fetch karke progressively enhance karo, ek visible loading state aur error handling ke saath.',
    },
  },
];

// Attach the step-by-step walkthroughs, which live in their own file so this
// one stays navigable. Keys are matched on the exact question text; anything
// left over is a typo we want to hear about rather than silently lose.
const unmatched = new Set(Object.keys(deepDives));
for (const q of generalInterviewQuestions) {
  const sections = deepDives[q.question];
  if (!sections) continue;
  q.deepDive = sections;
  unmatched.delete(q.question);
}
if (unmatched.size > 0) {
  console.warn(`[eds] ${unmatched.size} deep-dive key(s) match no question:`);
  for (const key of unmatched) console.warn(`  ${key}`);
}
