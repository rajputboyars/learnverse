// AEM Edge Delivery Services (EDS) curriculum — zero to hero, beginner -> intermediate -> advanced.
// Same shape as docker.mjs / git.mjs, consumed by scripts/seed.mjs.

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
];
