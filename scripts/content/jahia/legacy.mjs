// The original fifteen Jahia concepts, kept verbatim so their titles — and so
// their _ids and everyone's progress — survive the course upgrade. jahia.mjs
// regroups them into the new modules and attaches a hands-on `lesson` block.

/* ═══════════════════════ BEGINNER ═══════════════════════ */

const beginner = [
  {
    title: 'Jahia Fundamentals',
    level: 'beginner',
    description: {
      english: 'What Jahia is, and how a DXP differs from an ordinary CMS.',
      hinglish: 'Jahia kya hai, aur ek DXP normal CMS se alag kaise hai.',
    },
    concepts: [
      {
        title: 'What Jahia Is — CMS vs DXP',
        difficulty: 'easy',
        tags: ['jahia', 'dxp', 'cms', 'intro'],
        explanation: {
          english:
            "📖 THE STORY\n\nA company starts with a simple website. Marketing wants to edit text without calling a developer, so they install a CMS. It works.\n\nThen the requests grow. The site must run in four languages. A different homepage for logged-in customers. A mobile app that needs the same content over an API. Legal must approve a page before it goes live. A campaign must launch at midnight on Friday without anyone being awake.\n\nA plain CMS can do the first thing. A DXP is what you reach for when all of them arrive at once.\n\n──────────\n\n❓ WHAT is Jahia?\nJahia is a Java-based Digital Experience Platform. At its core is a content repository (the JCR) that stores every page, every component and every image as nodes in a tree. Around that core sit the things a large site actually needs: multilingual content, staging and publication, roles and permissions, workflows, personalisation, and a GraphQL API so the same content can feed a website, an app, or a kiosk.\n\n🤔 WHY does that matter?\nA CMS answers \"how do I edit this page?\". A DXP answers \"how do fifty people, in four languages, across three channels, edit and approve and schedule this safely?\". If your project is a blog, a DXP is overkill. If it is a bank's public site with legal review and six markets, it is the point.\n\n⚙️ HOW does it fit together?\nJahia runs as a Java server. Your work ships to it as MODULES — self-contained bundles of content definitions, views and code. Editors work in jContent, the authoring interface. Content lives in the repository, not in your module, which is why the same module can serve many sites.",
          hinglish:
            "📖 KAHANI\n\nEk company ek simple website se shuru karti hai. Marketing ko developer ko bulaye bina text edit karna hai, toh wo ek CMS install karte hain. Kaam chal jaata hai.\n\nPhir demands badhti hain. Site chaar languages mein chahiye. Logged-in customers ke liye alag homepage. Ek mobile app jise wahi content API se chahiye. Legal ko page live hone se pehle approve karna hai. Ek campaign Friday raat 12 baje launch hona chahiye, bina kisi ke jaage.\n\nEk simple CMS pehli cheez kar leta hai. DXP wahan chahiye jab ye saari cheezein ek saath aa jaayein.\n\n──────────\n\n❓ WHAT — Jahia hai kya?\nJahia ek Java-based Digital Experience Platform hai. Iske center mein ek content repository (JCR) hai jo har page, har component aur har image ko ek tree mein nodes ki tarah rakhta hai. Us core ke aas-paas wo cheezein hain jo ek bade site ko sach mein chahiye: multilingual content, staging aur publication, roles aur permissions, workflows, personalisation, aur GraphQL API taaki wahi content website, app ya kiosk sabko feed kare.\n\n🤔 WHY — ye matter kyun karta hai?\nCMS ye jawab deta hai ki \"is page ko edit kaise karun?\". DXP ye jawab deta hai ki \"pachaas log, chaar languages mein, teen channels pe, isko safely edit-approve-schedule kaise karein?\". Agar project ek blog hai toh DXP zyada hai. Agar ek bank ki public site hai legal review aur chhe markets ke saath, toh yahi point hai.\n\n⚙️ HOW — sab jodta kaise hai?\nJahia ek Java server ki tarah chalta hai. Tumhara kaam usko MODULES ki shakl mein jaata hai — self-contained bundles jisme content definitions, views aur code hote hain. Editors jContent mein kaam karte hain. Content repository mein rehta hai, tumhare module mein nahi — isiliye ek hi module kai sites ko serve kar sakta hai.",
        },
        dailyLifeExample: {
          english:
            "Think of a small roadside dhaba: one cook, one menu, change whatever you like. That is a CMS. Now think of a large restaurant chain: a different menu per city, food-safety approval on every dish, the kitchen app and the delivery app both needing the same menu, and a new menu that must go live at midnight on Diwali. That chain does not need a menu board — it needs a whole system. That is a DXP, and Jahia is the system.",
          hinglish:
            'Socho ek chhota dhaba: ek cook, ek menu, jo chahe wo badal do. Wahi CMS hai. Ab socho ek badi restaurant chain: har sheher ka alag menu, har dish ko FSSAI approval, kitchen-app aur Zomato dono ko wahi menu chahiye, aur naya menu Diwali ki raat 12 baje live hona chahiye. Us chain ko sirf ek menu-board nahi, ek poora system chahiye — wahi DXP hai. Jahia us chain ka system hai.',
        },
        codeExample:
          '# A Jahia site, from the outside in\n#\n#   Jahia server (Java)\n#     └── site: "brightpath.com"\n#           ├── pages          → nodes in the JCR\n#           ├── content        → nodes in the JCR\n#           └── uses modules   → your code + definitions\n#\n# Your module is the deployable unit:\n#\n#   my-module/\n#     settings/definition.cnd   # what content types exist\n#     src/components/           # how they render\n#     package.json              # module metadata\n#\n# Editors never touch this. They work in jContent, and the\n# content they create is stored in the repository.',
        keyPoints: [
          'Jahia is a Java DXP built on a JCR content repository',
          'A CMS edits pages; a DXP adds languages, roles, workflow, publication and APIs',
          'Your code ships as modules; content lives in the repository, separate from it',
          'Choose it for scale and governance, not for a simple blog',
        ],
        quiz: [
          {
            question: 'What is the core difference between a CMS and a DXP like Jahia?',
            options: [
              'A DXP is written in Java and a CMS is not',
              'A DXP adds the things large sites need — languages, roles, workflow, publication and APIs — on top of content editing',
              'A CMS cannot store images',
              'There is no difference, only the price',
            ],
            correctIndex: 1,
            explanation:
              'Both edit content. A DXP is what you reach for when governance, multiple languages and multiple channels arrive together.',
          },
          {
            question: 'Where does the content an editor creates actually live?',
            options: [
              'Inside your module, next to the code',
              'In the JCR content repository, separate from your module',
              'In the browser localStorage',
              'In the package.json file',
            ],
            correctIndex: 1,
            explanation:
              'Content and code are separate. That separation is why one module can serve many sites.',
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you NOT recommend Jahia for a project?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'When the governance features are not needed. A marketing blog, a small brochure site, or a product with one language, one editor and no approval step pays the full cost of a Java DXP — infrastructure, licensing, a slower local loop, a smaller hiring pool — for capability it will never use. Jahia earns its keep when several teams edit the same site, content must be translated and approved, and the same content feeds more than one channel.',
              hinglish:
                'Jab governance features ki zaroorat hi na ho. Ek marketing blog, chhoti brochure site, ya ek language-ek editor-koi approval nahi wala product Java DXP ki poori keemat chukata hai — infrastructure, licensing, dheema local loop, chhota hiring pool — un features ke liye jo wo kabhi use hi nahi karega. Jahia tab paisa vasool hai jab kai teams ek hi site edit karti hon, content translate aur approve hona ho, aur wahi content ek se zyada channel ko feed karta ho.',
            },
          },
        ],
      },
      {
        title: 'The JCR — Everything Is a Node',
        difficulty: 'easy',
        tags: ['jcr', 'repository', 'nodes', 'tree'],
        explanation: {
          english:
            "Jahia does not store pages in database tables the way WordPress stores posts in rows. It stores a TREE. That tree is the JCR — the Java Content Repository, a standard (JSR-283) for storing hierarchical content.\n\nEvery single thing is a NODE: a site is a node, a page is a node under it, a text component on that page is a node under the page, and an uploaded PDF is a node too. Each node has:\n\n• a PATH, like `/sites/mySite/home/banner`\n• a PRIMARY TYPE, which says what it is (`jnt:page`, `jnt:bigText`)\n• PROPERTIES, the actual values (a title, a body, a link)\n• CHILDREN, the nodes nested inside it\n\nOnce you see the tree, a lot of Jahia stops being mysterious. Moving a page is moving a node. Permissions are set on a node and inherited by its children, exactly like folders. A query is a walk over the tree.\n\nThe mental switch that costs people the most time: stop asking \"which table is this in?\" and start asking \"where does this sit in the tree, and what type is it?\".",
          hinglish:
            "Jahia pages ko database tables mein nahi rakhta jaise WordPress posts ko rows mein rakhta hai. Wo ek TREE rakhta hai. Wo tree hai JCR — Java Content Repository, hierarchical content rakhne ka ek standard (JSR-283).\n\nHar ek cheez ek NODE hai: site ek node hai, page uske neeche ek node, us page pe ek text component page ke neeche ek node, aur upload kiya PDF bhi ek node. Har node ke paas hota hai:\n\n• ek PATH, jaise `/sites/mySite/home/banner`\n• ek PRIMARY TYPE, jo batata hai wo hai kya (`jnt:page`, `jnt:bigText`)\n• PROPERTIES, asli values (title, body, link)\n• CHILDREN, uske andar ke nodes\n\nEk baar tree dikh gaya, toh Jahia ka bahut kuch samajh aa jaata hai. Page move karna matlab node move karna. Permissions ek node pe lagti hain aur children ko inherit hoti hain, bilkul folders ki tarah. Query matlab tree pe chalna.\n\nSabse zyada time ye switch leta hai: \"ye kis table mein hai?\" poochna band karo, aur \"ye tree mein kahan baithta hai aur iska type kya hai?\" poochna shuru karo.",
        },
        dailyLifeExample: {
          english:
            "Think of the file manager on your phone. A folder inside a folder, and a photo inside that. The photo has a path, a type (JPEG) and properties (date, size). Lock the folder above and everything inside is locked. The JCR is exactly this — only instead of photos it holds pages, banners and text components.",
          hinglish:
            'Apne phone ka file manager socho. Ek folder ke andar folder, uske andar photo. Photo ka ek path hai, ek type hai (JPEG), aur properties hain (date, size). Tum upar wale folder ko lock kar do toh andar sab lock. JCR bilkul yahi hai — bas photos ki jagah pages, banners aur text components rakhe hain.',
        },
        codeExample:
          "// A page and its content, as a tree\n//\n// /sites/brightpath\n//   └── home                    jnt:page\n//         ├── banner            jnt:bigText\n//         ├── intro             jnt:text\n//         └── cards             jnt:contentList\n//               ├── card-1      mynt:serviceCard\n//               └── card-2      mynt:serviceCard\n//\n// In a server component you receive the current node and read it:\n\nexport default function ServiceCard({ currentNode }) {\n  const title = currentNode.getProperty('jcr:title').getString();\n  const path = currentNode.getPath();      // /sites/brightpath/home/cards/card-1\n  const type = currentNode.getPrimaryNodeTypeName(); // mynt:serviceCard\n\n  return <h3>{title}</h3>;\n}",
        keyPoints: [
          'Jahia stores content as a tree of nodes, not as database rows',
          'Every node has a path, a primary type, properties and children',
          'Permissions and inheritance follow the tree, like folders',
          'Ask "where in the tree and what type?", not "which table?"',
        ],
        quiz: [
          {
            question: 'In the JCR, what is a page?',
            options: [
              'A row in a pages table',
              'A node in a tree, which can have child nodes of its own',
              'An HTML file on disk',
              'A JSON document in MongoDB',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why do permissions in Jahia feel like folder permissions?',
            options: [
              'Because they are stored in the operating system',
              'Because content is a tree, so a permission on a node is inherited by its children',
              'Because Jahia copies Windows',
              'They do not — every node must be set individually',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Two Workspaces — default and live',
        difficulty: 'easy',
        tags: ['workspace', 'publication', 'staging', 'live'],
        explanation: {
          english:
            "This is the single most useful thing to understand early, because it explains a whole category of \"but I changed it and nothing happened\" confusion.\n\nJahia keeps TWO copies of the content tree:\n\n• **default** — the editing workspace. Everything an author types lands here first. Nobody outside the editing team sees it.\n• **live** — the published workspace. This is what visitors get.\n\nAn edit changes `default` only. It reaches `live` when someone PUBLISHES it. Until then the public site keeps showing the previous version, which is exactly what you want: a half-written page never leaks.\n\nPublication is per node and can cascade to children. Jahia tracks which nodes have unpublished changes, which is why jContent can show you a page as \"modified\" with a coloured marker.\n\nSo when a change does not appear on the live site, the question is almost never \"is the code broken?\". It is: which workspace am I looking at, and has this node been published?",
          hinglish:
            "Ye sabse kaam ki cheez hai shuru mein samajhne ke liye, kyunki isse \"maine badla toh tha, kuch hua hi nahi\" wali poori category ki confusion khatam ho jaati hai.\n\nJahia content tree ki DO copies rakhta hai:\n\n• **default** — editing workspace. Author jo bhi likhta hai pehle yahan aata hai. Editing team ke bahar koi nahi dekhta.\n• **live** — published workspace. Visitors ko yahi milta hai.\n\nEk edit sirf `default` badalta hai. Wo `live` tab pahunchta hai jab koi use PUBLISH karta hai. Tab tak public site purana version dikhati rehti hai — aur yahi chahiye: aadha likha page kabhi leak nahi hota.\n\nPublication har node ke liye alag hoti hai aur children tak cascade ho sakti hai. Jahia track karta hai kaunse nodes mein unpublished changes hain, isiliye jContent page ko \"modified\" marker ke saath dikha paata hai.\n\nToh jab koi change live site pe nahi dikhta, sawaal lagbhag kabhi \"code toota hai kya?\" nahi hota. Sawaal ye hai: main kaunsa workspace dekh raha hoon, aur kya ye node publish hua hai?",
        },
        dailyLifeExample: {
          english:
            "Think of a newspaper. The reporter writes a draft and the editor cuts it about — all of it inside the office (default). Until someone presses print, the city still reads yesterday’s paper (live). Changing the draft does not change the city’s paper. Pressing publish does.",
          hinglish:
            'Ek newspaper socho. Reporter draft likhta hai, editor kaat-chhaant karta hai — ye sab andar office mein chalta hai (default). Jab tak print button nahi dabta, sheher ko kal ka hi akhbaar dikhta hai (live). Draft badalne se sheher ka akhbaar nahi badalta. Publish dabane se badalta hai.',
        },
        codeExample:
          "// Which workspace am I reading?\n//\n//   default → editing / preview\n//   live    → what the public sees\n//\n// In a server component the render context knows:\n\nexport default function Debug({ renderContext, currentNode }) {\n  const workspace = currentNode.getSession().getWorkspace().getName();\n  const isEditMode = renderContext.isEditMode();\n\n  // Handy while debugging \"why is my change not showing?\"\n  return <small>{workspace}{isEditMode ? ' (edit mode)' : ''}</small>;\n}\n\n// Checklist when a change does not appear on the live site:\n//   1. Did you publish the node?\n//   2. Did you publish its PARENT, if the node is new?\n//   3. Are you looking at live, or at a preview URL?\n//   4. Only then: is it a cache?",
        keyPoints: [
          'default = editing workspace, live = what visitors see',
          'Edits land in default and reach live only on publication',
          'Publication is per node and can cascade to children',
          '"Change not showing" is usually unpublished content, not broken code',
        ],
        quiz: [
          {
            question: 'An author edits a page but the public site is unchanged. What happened?',
            options: [
              'The server needs restarting',
              'The edit is in the default workspace and has not been published to live',
              'The database is corrupt',
              'Jahia only updates once a day',
            ],
            correctIndex: 1,
          },
          {
            question: 'A brand-new child page is published but still 404s. What is the likely cause?',
            options: [
              'Its parent was never published, so the path does not exist in live',
              'The page needs a different node type',
              'Jahia does not support child pages',
              'The browser cache',
            ],
            correctIndex: 0,
            explanation:
              'Live only contains what has been published. A child whose parent is missing has no path to live under.',
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain Jahia publication and one way it can surprise you.',
            difficulty: 'medium',
            frequency: 'very common',
            answer: {
              english:
                'Content is authored in the `default` workspace and copied to `live` on publication, so the public site only ever shows explicitly published states. The common surprise is partial publication: publishing a child node whose parent has never been published leaves the child unreachable in live, because the path above it does not exist there. The same applies to a referenced item — publish a page that links to an unpublished asset and the link breaks for visitors while working perfectly in preview. Publishing the parent, or using a cascading publication, is the fix.',
              hinglish:
                'Content `default` workspace mein banta hai aur publication pe `live` mein copy hota hai, isliye public site sirf jaan-boojhkar publish ki gayi state hi dikhati hai. Common surprise partial publication hai: aise child node ko publish karna jiska parent kabhi publish hua hi nahi, child ko live mein unreachable chhod deta hai kyunki uske upar ka path wahan hai hi nahi. Yahi referenced item pe lagu hota hai — ek page publish karo jo kisi unpublished asset se link karta ho, aur visitors ke liye link toot jaata hai jabki preview mein perfect chalta hai. Parent publish karna, ya cascading publication, iska hal hai.',
            },
          },
        ],
      },
    ],
  },

  {
    title: 'Your First Jahia Module',
    level: 'beginner',
    description: {
      english: 'Local setup, the shape of a module, and the build-deploy loop.',
      hinglish: 'Local setup, module ka structure, aur build-deploy loop.',
    },
    concepts: [
      {
        title: 'Running Jahia Locally with Docker',
        difficulty: 'easy',
        tags: ['docker', 'setup', 'local', 'environment'],
        explanation: {
          english:
            "Jahia is a Java server with a database behind it. Installing that by hand on a laptop is a bad first day. Docker Compose is how teams avoid it: one file describes the Jahia container and its database, and one command brings both up.\n\nThe loop you will live in:\n\n1. `docker compose up --wait` — start Jahia and wait until it reports healthy. The first run is slow; it is unpacking a whole platform.\n2. Open the local URL and log in with the credentials from the compose file.\n3. Build your module and deploy it into that running server.\n4. Edit, redeploy, refresh.\n\nTwo things worth knowing on day one. First, `--wait` matters: without it the command returns before Jahia is actually ready and your first deploy fails for no obvious reason. Second, Jahia keeps its state in a volume, so stopping the container does not lose your content — but `docker compose down -v` does, because `-v` deletes the volumes.",
          hinglish:
            "Jahia ek Java server hai jiske peeche ek database hota hai. Use haath se laptop pe install karna pehle din ke liye bura idea hai. Docker Compose isi se bachata hai: ek file Jahia container aur uska database describe karti hai, aur ek command dono uthata hai.\n\nJis loop mein tum rahoge:\n\n1. `docker compose up --wait` — Jahia start karo aur healthy hone tak wait karo. Pehla run dheema hota hai; poora platform khul raha hota hai.\n2. Local URL kholo aur compose file wale credentials se login karo.\n3. Apna module build karke us chalte server mein deploy karo.\n4. Edit, redeploy, refresh.\n\nPehle din do cheezein jaan lo. Ek, `--wait` matter karta hai: uske bina command Jahia ke ready hone se pehle hi return ho jaata hai aur tumhara pehla deploy bina wajah fail hota hai. Do, Jahia apni state ek volume mein rakhta hai, isliye container band karne se content nahi jaata — par `docker compose down -v` se jaata hai, kyunki `-v` volumes delete kar deta hai.",
        },
        dailyLifeExample: {
          english:
            "Docker Compose is like ordering the whole setup for a wedding: tent, chairs, lights, generator — it all arrives on one phone call, wired up correctly. You do not rent each piece separately. And `down -v` is sending the equipment back along with the tent — next time you start from nothing.",
          hinglish:
            'Docker Compose ek shaadi ka tent-house order hai: tent, kursi, light, generator — sab ek phone call pe lag jaata hai, sahi tareeke se juda hua. Tum ek-ek cheez alag se kirai pe nahi lete. Aur `down -v` matlab tent ke saath saara saamaan bhi wapas bhej dena — agli baar zero se.',
        },
        codeExample:
          '# Start the platform and wait until it is genuinely ready\ndocker compose up --wait\n\n# Watch it come up (the first boot takes a few minutes)\ndocker compose logs -f jahia\n\n# Stop, keeping your content\ndocker compose down\n\n# Stop AND delete the volumes — content is gone, fresh start\ndocker compose down -v\n\n# Common first-day errors\n#  "connection refused" on deploy → Jahia was not ready; use --wait\n#  port already in use            → something else holds 8080\n#  out of memory                  → give Docker Desktop more RAM',
        keyPoints: [
          'Docker Compose runs Jahia and its database together',
          '`--wait` blocks until healthy — without it, the first deploy fails',
          'Content lives in a Docker volume and survives a normal stop',
          '`down -v` deletes the volumes and therefore your local content',
        ],
        quiz: [
          {
            question: 'Why does `docker compose up --wait` matter for a first deploy?',
            options: [
              'It makes the build faster',
              'It blocks until Jahia reports healthy, so your deploy does not hit a server that is still starting',
              'It installs Java',
              'It publishes your content',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which command loses your local Jahia content?',
            options: ['docker compose stop', 'docker compose down', 'docker compose down -v', 'docker compose restart'],
            correctIndex: 2,
            explanation: 'The -v flag removes the volumes, and the volumes are where the repository lives.',
          },
        ],
      },
      {
        title: 'Anatomy of a Module',
        difficulty: 'easy',
        tags: ['module', 'structure', 'project', 'osgi'],
        explanation: {
          english:
            "A Jahia module is the unit you build and deploy. Everything you write lives inside one, and a site switches features on by enabling modules.\n\nA JavaScript module (Jahia 8.2 style) has three parts worth naming:\n\n• **Definitions** — a `.cnd` file declaring the content types your module adds. This is the contract: it says a `serviceCard` exists and has a title, an image and a link.\n• **Views** — the components that turn a node into HTML. In a Jahia JS module these are React components, split into server and client.\n• **Metadata** — `package.json` carries the module name, version and the Jahia-specific fields that tell the server what it is looking at.\n\nThe classic Java module is the same idea with different clothes: Maven instead of npm, JSP or Freemarker instead of React, a `definitions.cnd` in `src/main/resources`.\n\nThe rule that keeps modules clean: a module should own its content types AND their views together. If another module has to know the internals of your node type to render it, the boundary is in the wrong place.",
          hinglish:
            "Jahia module wo unit hai jise tum build aur deploy karte ho. Jo bhi tum likhte ho ek module ke andar rehta hai, aur ek site modules enable karke features on karti hai.\n\nEk JavaScript module (Jahia 8.2 style) ke teen hisse naam lene layak hain:\n\n• **Definitions** — ek `.cnd` file jo batati hai tumhara module kaunse content types add karta hai. Yahi contract hai: ki ek `serviceCard` hota hai aur uske paas title, image aur link hote hain.\n• **Views** — wo components jo ek node ko HTML banate hain. Jahia JS module mein ye React components hote hain, server aur client mein bante.\n• **Metadata** — `package.json` mein module ka naam, version aur Jahia-specific fields hote hain jo server ko batate hain ki wo dekh kya raha hai.\n\nClassic Java module wahi idea hai alag kapdon mein: npm ki jagah Maven, React ki jagah JSP ya Freemarker, `src/main/resources` mein `definitions.cnd`.\n\nJo rule modules ko saaf rakhta hai: ek module ko apne content types AUR unke views dono ka maalik hona chahiye. Agar doosre module ko tumhare node type ke andar ka pata hona pade render karne ke liye, toh boundary galat jagah hai.",
        },
        dailyLifeExample: {
          english:
            "A module is like a tiffin box from a lunch service: the food is inside and so is the label (\"dal, roti, sabzi\"). The label (the CND) says what is in there; the food (the views) is what you actually eat. Put the label on a different box and the whole system is confused — which is why a type and its views stay together.",
          hinglish:
            'Module ek tiffin service ke dabbe jaisa hai: dabbe ke andar khana bhi hai aur uska label bhi ("dal, roti, sabzi"). Label (CND) batata hai andar kya hai, khana (views) wo hai jo tum khaate ho. Agar label kisi aur dabbe mein rakha ho toh poora system confuse ho jaata hai — isiliye definition aur view saath rehte hain.',
        },
        codeExample:
          "// A JavaScript module, laid out\n//\n// my-module/\n//   package.json                  ← name, version, Jahia metadata\n//   settings/\n//     definition.cnd              ← the content types this module adds\n//     locales/\n//       en.json                   ← UI labels for editors\n//   src/\n//     components/\n//       ServiceCard.server.tsx    ← renders on the server\n//       Carousel.client.tsx       ← ships JS to the browser\n//   vite.config.ts\n//\n// The convention that carries the most meaning:\n//   *.server.tsx → runs in Jahia, can read the JCR, no browser JS\n//   *.client.tsx → hydrates in the browser, for real interactivity\n//\n// Reach for .client only when the component genuinely needs\n// state, events or browser APIs. Everything else is cheaper\n// and faster as a server component.",
        keyPoints: [
          'A module bundles content definitions, views and metadata together',
          'definition.cnd declares the types; components render them',
          '.server.tsx runs in Jahia; .client.tsx hydrates in the browser',
          'Keep a type and its views in the same module — that is the clean boundary',
        ],
        quiz: [
          {
            question: 'What belongs in a module alongside its React components?',
            options: [
              'The database credentials',
              'The .cnd file defining the content types those components render',
              "Every other module's views",
              'The editors’ user accounts',
            ],
            correctIndex: 1,
          },
          {
            question: 'When should a component be a .client component rather than .server?',
            options: [
              'Always — client components are faster',
              'Only when it genuinely needs state, events or browser APIs',
              'When it reads content from the JCR',
              'When it renders a list',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'The Build and Deploy Loop',
        difficulty: 'easy',
        tags: ['build', 'deploy', 'workflow', 'vite'],
        explanation: {
          english:
            "Editing a Jahia module is not like editing a plain React app, where the browser reloads the instant you save. Your code has to be packaged and handed to a running Java server before anything changes.\n\nThe loop:\n\n1. **Watch** — `yarn dev` (or `yarn watch`) rebuilds on save. This gets your source compiled, but does not by itself put it in Jahia.\n2. **Package** — the build produces a deployable artefact, typically a `.tgz`.\n3. **Deploy** — `yarn deploy` pushes that artefact into the running Jahia and the server picks up the new version of the module.\n4. **Refresh** — reload the page in Jahia.\n\nTwo habits save hours here. First, when a change does not show, check in order: did the build succeed, did the deploy succeed, is the module version in Jahia the one you just built, and only then suspect a cache. Second, keep the Jahia log open in a second terminal — a module that fails to start says so there and nowhere else, and a silent failure looks exactly like \"my change did nothing\".",
          hinglish:
            "Jahia module edit karna simple React app jaisa nahi hai jahan save karte hi browser reload ho jaata hai. Tumhara code package hokar ek chalte Java server ko dena padta hai, tab kuch badalta hai.\n\nLoop:\n\n1. **Watch** — `yarn dev` (ya `yarn watch`) save pe rebuild karta hai. Isse source compile ho jaata hai, par khud-ba-khud Jahia mein nahi jaata.\n2. **Package** — build ek deployable artefact banata hai, aam taur pe `.tgz`.\n3. **Deploy** — `yarn deploy` us artefact ko chalte Jahia mein bhejta hai aur server module ka naya version uthata hai.\n4. **Refresh** — Jahia mein page reload karo.\n\nDo aadatein yahan ghante bachati hain. Ek, jab change na dikhe toh iss order mein check karo: build pass hua, deploy pass hua, Jahia mein module ka version wahi hai jo abhi banaya, aur uske BAAD cache pe shak karo. Do, Jahia ka log ek doosre terminal mein khula rakho — jo module start hone mein fail hota hai wo wahin bolta hai, aur kahin nahi; aur silent failure bilkul \"mere change ne kuch nahi kiya\" jaisa dikhta hai.",
        },
        dailyLifeExample: {
          english:
            "This is like sending a tiffin, not cooking at home. At home you cook, you taste, done — immediately. Here you cook (build), pack the box (package), send the delivery (deploy), and only then does it reach the plate at the other end. If any step in between stalls, the other end is still eating yesterday’s food.",
          hinglish:
            'Ye tiffin bhejne jaisa hai, ghar pe khaana banane jaisa nahi. Ghar pe bana, chakh liya — turant. Yahan khana banao (build), dabba pack karo (package), delivery bhejo (deploy), tab jaake doosri taraf plate mein aata hai. Beech ka koi bhi step ruk gaya toh doosri taraf purana khana hi rehta hai.',
        },
        codeExample:
          '# Install once\nyarn install\n\n# Rebuild on every save\nyarn dev\n\n# Package the module (type-check + build + pack)\nyarn build\n\n# Push it into the running Jahia\nyarn deploy\n\n# Keep this open in another terminal — module start failures\n# appear here and nowhere in the browser\ndocker compose logs -f jahia\n\n# When a change does not appear, in this order:\n#   1. did the build actually succeed?\n#   2. did the deploy actually succeed?\n#   3. is the deployed version the one you just built?\n#   4. only now, suspect a cache',
        keyPoints: [
          'Code must be built, packaged and deployed before Jahia sees it',
          'yarn dev compiles; yarn deploy is what reaches the server',
          'Keep the Jahia log open — module start failures only appear there',
          'Debug order: build → deploy → version → cache, never cache first',
        ],
        quiz: [
          {
            question: 'You saved a component but Jahia shows the old output. What do you check FIRST?',
            options: [
              'Clear the Jahia HTML cache',
              'That the build and deploy actually succeeded and the deployed version is current',
              'Restart the database',
              'Reinstall Jahia',
            ],
            correctIndex: 1,
            explanation:
              'Cache is the last suspect, not the first. Most "nothing changed" cases are a failed build or deploy.',
          },
          {
            question: 'Where does a module that fails to start report the problem?',
            options: ['In the browser console', 'In the Jahia server log', 'In package.json', 'Nowhere'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

/* ═══════════════════════ INTERMEDIATE ═══════════════════════ */

const intermediate = [
  {
    title: 'Defining Content Types',
    level: 'intermediate',
    description: {
      english: 'The CND file, properties and mixins — building your own content model.',
      hinglish: 'CND file, properties, aur mixins — apna content model banao.',
    },
    concepts: [
      {
        title: 'Reading and Writing a CND File',
        difficulty: 'medium',
        tags: ['cnd', 'node-types', 'definition', 'content-model'],
        explanation: {
          english:
            "The `.cnd` file is where you declare what content exists. CND stands for Compact Node type Definition — a terse syntax for describing node types.\n\nA definition has four parts:\n\n• **Namespace** — `<mynt='http://example.com/mynt/1.0'>` gives your types a prefix so they never collide with Jahia's own.\n• **Node type name and supertypes** — `[mynt:serviceCard] > jnt:content` says your type IS a piece of content, inheriting everything that implies.\n• **Properties** — the fields, each with a type: `- title (string)`.\n• **Child node definitions** — when a type contains other nodes rather than plain values.\n\nTwo flags do most of the work in practice. `mandatory` refuses to save the node without that value. `i18n` makes the property translatable, so each language holds its own value — and forgetting it is the single most common content-model bug, because everything works perfectly until the second language arrives.\n\nTreat the CND as a schema migration, not a config file. Content already saved against the old shape does not rewrite itself when you change a definition.",
          hinglish:
            "`.cnd` file wahan hai jahan tum declare karte ho ki content hai kya. CND matlab Compact Node type Definition — node types describe karne ka ek chhota syntax.\n\nEk definition ke chaar hisse hote hain:\n\n• **Namespace** — `<mynt='http://example.com/mynt/1.0'>` tumhare types ko ek prefix deta hai taaki Jahia ke apne types se kabhi takraaye nahi.\n• **Node type name aur supertypes** — `[mynt:serviceCard] > jnt:content` kehta hai tumhara type ek content hai, aur uske saath aane wala sab inherit karta hai.\n• **Properties** — fields, har ek ka type: `- title (string)`.\n• **Child node definitions** — jab type ke andar plain values ki jagah doosre nodes hote hain.\n\nDo flags practice mein sabse zyada kaam karte hain. `mandatory` us value ke bina node save hone hi nahi deta. `i18n` property ko translatable banata hai, taaki har language apni value rakhe — aur ise bhoolna sabse common content-model bug hai, kyunki sab kuch perfect chalta hai jab tak doosri language nahi aati.\n\nCND ko schema migration ki tarah socho, config file ki tarah nahi. Purani shape pe save hua content definition badalne se khud ko dobara nahi likhta.",
        },
        dailyLifeExample: {
          english:
            "A CND is the design of a form — like a bank’s account opening form. It says which boxes exist (name, address, PAN), which must be filled (mandatory), and which need a version per language. Redesigning the form does not change the forms people already filled in; those have to be handled separately.",
          hinglish:
            'CND ek form ka design hai — jaise bank ka account opening form. Usme likha hota hai kaunse khaane hain (naam, pata, PAN), kaunsa bharna zaroori hai (mandatory), aur kaunsa har bhaasha mein alag chahiye. Form design badalne se pehle se bhare hue forms apne aap nahi badal jaate — unhe alag se handle karna padta hai.',
        },
        codeExample:
          "// settings/definition.cnd\n\n<mynt = 'http://example.com/mynt/1.0'>\n<jnt = 'http://www.jahia.org/jahia/nt/1.0'>\n<jmix = 'http://www.jahia.org/jahia/mix/1.0'>\n\n// A card the editor can drop on a page.\n[mynt:serviceCard] > jnt:content, jmix:droppableContent\n  // i18n → each language keeps its own value. Forget this and the\n  // French site silently shows English text.\n  - title (string) mandatory i18n\n  - summary (string, textarea) i18n\n  - link (weakreference, picker[type='page']) < 'jnt:page'\n  - featured (boolean) = false\n\n// A container that only accepts those cards.\n[mynt:serviceList] > jnt:content\n  + * (mynt:serviceCard)",
        keyPoints: [
          'CND declares node types: namespace, supertype, properties, children',
          'mandatory blocks saving without a value',
          'i18n makes a property per-language — omitting it breaks multilingual sites later',
          'Changing a CND is a migration; existing content does not rewrite itself',
        ],
        quiz: [
          {
            question: 'What does the i18n flag on a property do?',
            options: [
              'Translates the value automatically',
              'Stores a separate value per language, so each locale has its own content',
              'Makes the field mandatory',
              'Adds a language dropdown to the site',
            ],
            correctIndex: 1,
            explanation:
              'It does not translate anything. It gives each language its own slot to hold a translation.',
          },
          {
            question: 'Why is changing a CND definition risky on a live site?',
            options: [
              'CND files cannot be changed once deployed',
              'Content already saved against the old definition does not migrate itself',
              'It restarts the server',
              'It deletes all modules',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'A property was added without i18n and the site is already multilingual. What now?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'The property currently holds one shared value across every language, so switching the flag on does not distribute existing content into per-language slots — it changes where Jahia looks, and the previously shared value is not where the localised lookup expects it. Treat it as a migration: change the definition, then run a script that reads each node’s existing shared value and writes it into every active language as the starting translation, so nothing appears blank while translators catch up. Doing this on a copy of production first is worth the hour it costs.',
              hinglish:
                'Property abhi har language mein ek hi shared value rakhti hai, isliye flag on karne se purana content apne aap per-language slots mein nahi bat jaata — badal jaata hai ye ki Jahia dekhta kahan hai, aur pehle wali shared value wahan nahi hoti jahan localised lookup dhoondhta hai. Ise migration ki tarah lo: definition badlo, phir ek script chalao jo har node ki maujooda shared value padhkar use har active language mein starting translation ki tarah likh de, taaki translators ke pakadne tak kuch khaali na dikhe. Ye pehle production ki copy pe karna us ek ghante ke laayak hai.',
            },
          },
        ],
      },
      {
        title: 'Mixins — Adding Behaviour Without Rewriting',
        difficulty: 'medium',
        tags: ['mixins', 'jmix', 'composition', 'content-model'],
        explanation: {
          english:
            "A primary type says what a node IS. A mixin says what it CAN ALSO DO. A node has exactly one primary type and any number of mixins.\n\nThis matters because content models grow sideways. Someone asks for SEO fields on pages, articles and product listings. Adding the same three properties to three types means three places to change and three chances to drift. A mixin adds them once and each type declares it wants them.\n\nJahia ships plenty of its own, prefixed `jmix:`. Two you will meet immediately:\n\n• `jmix:droppableContent` — makes your type something an editor can actually drop onto a page. Forget it and your beautiful component never appears in the picker.\n• `jmix:navMenuItem` — marks a node as something navigation should show.\n\nYou can define your own the same way, and you can attach a mixin to types you do not own — which is how a module adds a field to a built-in Jahia type without forking it.\n\nThe design rule: if the answer to \"is this what the thing IS?\" is no, but \"is this something it also has?\" is yes, it is a mixin.",
          hinglish:
            "Primary type batata hai node HAI kya. Mixin batata hai wo aur KYA KAR SAKTA hai. Ek node ka ek hi primary type hota hai, aur mixins jitne chaaho.\n\nYe isliye matter karta hai kyunki content models bagal mein badhte hain. Koi SEO fields maangta hai pages, articles aur product listings pe. Wahi teen properties teen types mein daalna matlab teen jagah badalna aur teen jagah drift hone ka mauka. Mixin unhe ek baar add karta hai aur har type kehta hai mujhe chahiye.\n\nJahia ke apne kai mixins hain, `jmix:` prefix ke saath. Do se turant paala padega:\n\n• `jmix:droppableContent` — tumhare type ko aisi cheez banata hai jise editor sach mein page pe drop kar sake. Ise bhool jaao aur tumhara sundar component picker mein kabhi nahi aayega.\n• `jmix:navMenuItem` — node ko aisa mark karta hai jise navigation dikhaye.\n\nApne mixins bhi bana sakte ho, aur unhe un types pe laga sakte ho jo tumhare nahi hain — isi tarah ek module built-in Jahia type mein field jodta hai bina fork kiye.\n\nDesign rule: agar \"kya cheez YAHI hai?\" ka jawab nahi hai, par \"kya iske paas ye BHI hai?\" ka jawab haan hai — toh wo mixin hai.",
        },
        dailyLifeExample: {
          english:
            "A person is one thing — he is a \"doctor\" (primary type). He also plays cricket and drives a car (mixins). You do not invent a new category called \"doctor-who-plays-cricket\". In the same way a page stays a page, and simply gains an SEO capability.",
          hinglish:
            'Aadmi ek hai — wo "doctor" hai (primary type). Par wo cricket bhi khelta hai aur gaadi bhi chalata hai (mixins). Tum uske liye "doctor-jo-cricket-khelta-hai" naam ka naya category nahi banate. Waise hi page "page" hi rehta hai, bas usme SEO wali capability jud jaati hai.',
        },
        codeExample:
          "// One mixin, reused by three types\n\n[mymix:seo] mixin\n  - metaTitle (string) i18n\n  - metaDescription (string, textarea) i18n\n  - noIndex (boolean) = false\n\n[mynt:article]  > jnt:content, mymix:seo, jmix:droppableContent\n  - headline (string) mandatory i18n\n\n[mynt:landing]  > jnt:page, mymix:seo\n\n// Offer a mixin on a type you do NOT own, so a built-in\n// Jahia type gains your field without forking it:\n[mymix:pageSeo] mixin\n  extends = jnt:page\n  - metaTitle (string) i18n\n\n// Without jmix:droppableContent the type exists, validates,\n// and never shows up in the editor's content picker — a\n// confusing hour for everyone who has hit it.",
        keyPoints: [
          'One primary type per node; many mixins',
          'Mixins add shared capability without duplicating properties',
          'jmix:droppableContent is what lets editors add your component to a page',
          '"Is it what the thing IS?" → primary type. "Does it also have this?" → mixin',
        ],
        quiz: [
          {
            question: 'Your new component does not appear in the editor’s content picker. Likely cause?',
            options: [
              'The module is not deployed',
              'The type is missing jmix:droppableContent',
              'The CND has a syntax error',
              'Any of these — but droppableContent is the classic one',
            ],
            correctIndex: 3,
            explanation:
              'All three are worth checking, and a missing droppableContent mixin is the one that catches people repeatedly.',
          },
          {
            question: 'Three types need the same SEO fields. What is the right move?',
            options: [
              'Copy the properties into all three',
              'Define one mixin and have each type extend it',
              'Create a shared parent primary type for all three',
              'Store SEO in a separate database',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'How Jahia Picks a View',
        difficulty: 'medium',
        tags: ['views', 'rendering', 'resolution', 'templates'],
        explanation: {
          english:
            "When Jahia renders a node it has to choose which component draws it. That choice is view resolution, and understanding it turns rendering from magic into a lookup.\n\nJahia asks, in order:\n\n1. What is the node's type? (`mynt:serviceCard`)\n2. Which view was requested? A view has a NAME; the default one is literally called `default`. A template can ask for a named view instead — `hero`, `teaser`, `card`.\n3. Is there a component registered for that type and view name?\n4. If not, walk UP the type hierarchy. No view for `mynt:serviceCard`? Try its supertype. This is why a type with no view of its own still renders something.\n\nThis is what makes one node render three ways in three places without a single `if`. The article renders as a full page on its own URL, as a `teaser` in a list, and as a `card` in a carousel — same content node, three registered views.\n\nThe practical consequence: when the wrong markup appears, the question is which VIEW got resolved, not which component you think you wrote.",
          hinglish:
            "Jab Jahia ek node render karta hai toh use chunna padta hai ki kaunsa component use banaye. Wo choice view resolution hai, aur ise samajhne se rendering jaadu se lookup ban jaati hai.\n\nJahia ye poochta hai, isi order mein:\n\n1. Node ka type kya hai? (`mynt:serviceCard`)\n2. Kaunsa view maanga gaya? Har view ka ek NAAM hota hai; default wale ka naam literally `default` hai. Template koi naam wala view maang sakta hai — `hero`, `teaser`, `card`.\n3. Us type aur view naam ke liye koi component registered hai?\n4. Nahi hai toh type hierarchy mein UPAR jao. `mynt:serviceCard` ka view nahi? Uske supertype ka try karo. Isiliye bina apne view wala type bhi kuch na kuch render kar deta hai.\n\nYahi wo cheez hai jisse ek node teen jagah teen tarah se render hota hai bina ek bhi `if` ke. Article apne URL pe full page banta hai, list mein `teaser`, carousel mein `card` — wahi content node, teen registered views.\n\nPractical natija: jab galat markup aaye, sawaal ye hai ki kaunsa VIEW resolve hua, na ki kaunsa component tumhe lagta hai tumne likha tha.",
        },
        dailyLifeExample: {
          english:
            "Three photos of the same person: passport size (for an ID), a full family photo (for the album), and a thumbnail (for a chat profile). Same person, different presentation for each place. The view name is what decides which photo comes out.",
          hinglish:
            'Ek hi insaan ke teen photo: passport size (ID ke liye), full family photo (album ke liye), aur thumbnail (WhatsApp DP). Insaan wahi hai, presentation alag — jagah ke hisaab se. View naam wahi decide karta hai ki kaunsi photo nikalni hai.',
        },
        codeExample:
          "// Three views of one node type\n//\n//   ServiceCard.default.server.tsx  → full rendering\n//   ServiceCard.teaser.server.tsx   → compact, for lists\n//   ServiceCard.card.server.tsx     → image-led, for carousels\n//\n// The default view:\n\nexport default function ServiceCard({ currentNode }) {\n  const title = currentNode.getProperty('title').getString();\n  return (\n    <article className=\"service-card\">\n      <h3>{title}</h3>\n    </article>\n  );\n}\n\n// A parent asks for a specific view when rendering children.\n// Same node, different component, no conditional logic:\n//\n//   <Render node={child} view=\"teaser\" />\n//\n// If no view matches, Jahia walks UP the type hierarchy —\n// which is why an unstyled fallback appears instead of an error.",
        keyPoints: [
          'Rendering resolves by node type + view name',
          '`default` is the view used when none is named',
          'Unmatched views fall back up the type hierarchy, so something always renders',
          'One node can render many ways without conditionals — register more views',
        ],
        quiz: [
          {
            question: 'How does one content node render differently in a list and on its own page?',
            options: [
              'Duplicate the content for each place',
              'Register several named views and let each place request the one it needs',
              'Write if-statements in the component',
              'Use a different node type per place',
            ],
            correctIndex: 1,
          },
          {
            question: 'Your type has no matching view. What does Jahia do?',
            options: [
              'Throws a 500 error',
              'Renders nothing silently',
              'Walks up the type hierarchy and uses an inherited view',
              'Shows the raw JSON',
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },

  {
    title: 'Getting Content Out',
    level: 'intermediate',
    description: {
      english: 'GraphQL, queries and headless Jahia.',
      hinglish: 'GraphQL, queries aur headless Jahia.',
    },
    concepts: [
      {
        title: 'The GraphQL API',
        difficulty: 'medium',
        tags: ['graphql', 'api', 'headless', 'query'],
        explanation: {
          english:
            "Jahia exposes its repository over GraphQL, and this is what makes it usable as a headless backend. A mobile app, a Next.js front end or a partner system can read the same content the website renders, without a line of Java.\n\nBecause the repository is a tree, the API is shaped like one. You ask for a node by path or by id, then walk into its properties and children. You also choose the WORKSPACE — `LIVE` for published content, `EDIT` for the working copy — which is the same distinction as before, now as a query argument.\n\nThe part worth internalising early: GraphQL returns exactly the fields you ask for. That is the feature. A list of forty articles that needs a title and a link should ask for a title and a link, not for the whole node. On a tree-shaped repository the difference between a tight query and a lazy one is not small.\n\nAuthentication matters too. Published content can often be read anonymously; anything in the editing workspace needs credentials, because that is unpublished material.",
          hinglish:
            "Jahia apni repository ko GraphQL pe expose karta hai, aur yahi use headless backend ki tarah use karne layak banata hai. Ek mobile app, ek Next.js front end ya partner system wahi content padh sakta hai jo website render karti hai — bina ek line Java ke.\n\nKyunki repository ek tree hai, API bhi wahi shakl rakhti hai. Tum node maangte ho path ya id se, phir uske properties aur children mein andar jaate ho. Tum WORKSPACE bhi chunte ho — published content ke liye `LIVE`, working copy ke liye `EDIT` — wahi purana farak, ab query argument ki tarah.\n\nJo cheez jaldi samajh lena chahiye: GraphQL bilkul wahi fields deta hai jo tum maangte ho. Yahi uska faayda hai. Chalis articles ki list jise sirf title aur link chahiye, use title aur link maangna chahiye, poora node nahi. Tree-shaped repository pe tight query aur lazy query ka farak chhota nahi hota.\n\nAuthentication bhi matter karta hai. Published content aksar anonymously padha ja sakta hai; editing workspace ka kuch bhi credentials maangta hai, kyunki wo unpublished maal hai.",
        },
        dailyLifeExample: {
          english:
            "You do not tell a waiter \"bring me the entire kitchen\" — you order exactly what you want to eat. GraphQL is that waiter: it brings precisely what you asked for. With REST the whole thali often arrives and you leave half of it.",
          hinglish:
            'Restaurant mein waiter se "poora kitchen dikha do" nahi kehte — tum wahi mangwate ho jo khaana hai. GraphQL wahi waiter hai jo bilkul utna hi laata hai jitna tumne bola. REST mein aksar poori thali aa jaati hai aur tum aadhi chhod dete ho.',
        },
        codeExample:
          "# Read published children of a page\nquery ServiceCards {\n  jcr(workspace: LIVE) {\n    nodeByPath(path: \"/sites/brightpath/home/services\") {\n      children {\n        nodes {\n          uuid\n          name\n          # ask for exactly the fields you render, nothing more\n          title: property(name: \"title\", language: \"en\") { value }\n          summary: property(name: \"summary\", language: \"en\") { value }\n        }\n      }\n    }\n  }\n}\n\n# workspace: LIVE  → published, safe for the public API\n# workspace: EDIT  → unpublished drafts, requires credentials\n#\n# Fetch it from a front end like any GraphQL endpoint:\n#   POST /modules/graphql   { query, variables }",
        keyPoints: [
          'GraphQL turns Jahia into a headless backend for any front end',
          'The API is tree-shaped: nodes, properties, children',
          'Choose workspace LIVE (published) or EDIT (drafts, authenticated)',
          'Request only the fields you render — that is the whole point of GraphQL',
        ],
        quiz: [
          {
            question: 'Which workspace should a public mobile app query?',
            options: ['EDIT, to get the newest content', 'LIVE, because it holds published content only', 'Both at once', 'Neither — GraphQL ignores workspaces'],
            correctIndex: 1,
            explanation:
              'EDIT contains unpublished drafts. Serving it publicly would leak work in progress.',
          },
          {
            question: 'Why ask for specific fields rather than the whole node?',
            options: [
              'Jahia charges per field',
              'GraphQL returns exactly what you ask for, so a tight query is materially cheaper on a tree repository',
              'The whole node is not available',
              'It has no effect either way',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Fetching Content Inside a Component',
        difficulty: 'medium',
        tags: ['server-components', 'jcr', 'query', 'rendering'],
        explanation: {
          english:
            "Inside a Jahia module you often do not need GraphQL at all. A server component already runs inside Jahia with the repository in reach, so it can read nodes directly — no network hop, no serialisation.\n\nThe pieces a server component receives are the ones that matter:\n\n• `currentNode` — the node being rendered. Read its properties.\n• `renderContext` — the surrounding request: current site, language, edit mode or live.\n• The session — for reaching beyond the current node, when you genuinely need to.\n\nThe discipline that keeps pages fast: fetch narrowly. A component that walks the whole site tree to find three items will work on your laptop with test content and fall over on a real site with thousands of nodes. Ask for the subtree you need, filter in the query rather than in JavaScript, and cap the result.\n\nAnd remember which side you are on. A server component reading the JCR is cheap and cached. The same logic in a client component is impossible — the browser has no repository — so that data has to travel as props or as a GraphQL call.",
          hinglish:
            "Jahia module ke andar aksar GraphQL ki zaroorat hi nahi hoti. Server component pehle se Jahia ke andar chal raha hai aur repository uski pahunch mein hai, toh wo nodes seedha padh sakta hai — na network hop, na serialisation.\n\nServer component ko jo cheezein milti hain, wahi kaam ki hain:\n\n• `currentNode` — jo node render ho raha hai. Uski properties padho.\n• `renderContext` — aas-paas ka request: current site, language, edit mode ya live.\n• Session — jab sach mein current node se aage jaana ho.\n\nJo discipline pages ko tez rakhta hai: sankuchit fetch karo. Jo component teen items dhoondhne ke liye poora site tree chalta hai, wo tumhare laptop pe test content ke saath chal jaayega aur asli site pe hazaaron nodes ke saath baith jaayega. Utna hi subtree maango jitna chahiye, filter JavaScript mein nahi query mein karo, aur result pe cap lagao.\n\nAur yaad rakho tum kis taraf ho. Server component ka JCR padhna sasta hai aur cached hai. Wahi logic client component mein namumkin hai — browser ke paas repository hai hi nahi — toh wo data props ki tarah ya GraphQL call se jaana padega.",
        },
        dailyLifeExample: {
          english:
            "Picking up goods while standing inside the warehouse (a server component) and phoning an order in from outside (GraphQL) both get you the goods. If you are already standing inside, phoning is silly. But opening every box in the warehouse to find three items is silly too, even from the inside.",
          hinglish:
            'Godown ke andar khade hokar saamaan uthana (server component) aur bahar se phone karke mangwana (GraphQL) — dono se saamaan milta hai. Andar khade ho toh phone karna bewakoofi hai. Par poore godown ke har dabbe kholkar teen cheez dhoondhna, andar khade hokar bhi, bewakoofi hi hai.',
        },
        codeExample:
          "// ServiceList.server.tsx — reads directly, no network call\n\nexport default function ServiceList({ currentNode, renderContext }) {\n  const language = renderContext.getMainResourceLocale().getLanguage();\n\n  // Narrow: only this node's children, only what renders.\n  const cards = [];\n  const children = currentNode.getNodes();\n  while (children.hasNext()) {\n    const node = children.nextNode();\n    if (!node.isNodeType('mynt:serviceCard')) continue;\n    cards.push({\n      id: node.getIdentifier(),\n      title: node.getProperty('title').getString(),\n    });\n    if (cards.length >= 12) break; // cap it — real sites are big\n  }\n\n  return (\n    <ul>\n      {cards.map((c) => <li key={c.id}>{c.title}</li>)}\n    </ul>\n  );\n}\n\n// A client component cannot do this. Pass the data down as props:\n//   <Carousel client:load items={cards} />",
        keyPoints: [
          'Server components read the JCR directly — no GraphQL round trip needed',
          'currentNode is the node being rendered; renderContext carries site and language',
          'Fetch narrowly and cap results — test content hides performance problems',
          'Client components have no repository access; pass data as props',
        ],
        quiz: [
          {
            question: 'Why can a client component not read the JCR?',
            options: [
              'It needs a licence',
              'It runs in the browser, which has no access to the server-side repository',
              'The JCR is write-only',
              'It can, using localStorage',
            ],
            correctIndex: 1,
          },
          {
            question: 'A list component works locally but is slow in production. Most likely cause?',
            options: [
              'Production has a slower server',
              'It walks a large part of the tree — fine with a handful of test nodes, not with thousands',
              'GraphQL is disabled',
              'The CND is wrong',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Languages and Multi-site',
        difficulty: 'medium',
        tags: ['i18n', 'languages', 'multisite', 'locales'],
        explanation: {
          english:
            "Jahia treats language as a dimension of content, not as a copy of the site. One node holds a value per language for every `i18n` property. The page tree is shared; the words differ.\n\nThat design has consequences worth knowing before you meet them:\n\n• A node can exist in one language and not another. Jahia has a language fallback so a missing translation shows something rather than nothing — useful, and also how a French page quietly shows English text for months.\n• Publication is per language. Publishing the English version does not publish the French one.\n• UI labels for editors are separate from content. Those live in your module's locale files, not in the repository.\n\nMulti-site works alongside this. One Jahia can host several sites, each with its own tree, its own languages and its own enabled modules — while sharing the modules themselves. That is the payoff of keeping content out of the module: the same component code renders three brands.",
          hinglish:
            "Jahia language ko content ka ek dimension maanta hai, site ki copy nahi. Ek node har `i18n` property ke liye har language ki value rakhta hai. Page tree same rehta hai; shabd alag hote hain.\n\nIs design ke kuch natije hain jo milne se pehle jaan lena behtar hai:\n\n• Ek node ek language mein ho sakta hai aur doosri mein nahi. Jahia mein language fallback hai taaki missing translation pe kuch na kuch dikhe — kaam ka bhi hai, aur isi wajah se French page mahinon tak chupchaap English dikhata rehta hai.\n• Publication har language ki alag hoti hai. English publish karne se French publish nahi hota.\n• Editors ke UI labels content se alag hote hain. Wo tumhare module ki locale files mein rehte hain, repository mein nahi.\n\nMulti-site iske saath chalta hai. Ek Jahia kai sites host kar sakta hai, har ek ka apna tree, apni languages aur apne enabled modules — jabki modules khud share hote hain. Content ko module se bahar rakhne ka yahi faayda hai: wahi component code teen brands render karta hai.",
        },
        dailyLifeExample: {
          english:
            "Think of a railway station board with the same station name written in Hindi, English and Marathi. There is one station (the node) and three versions of the name (the i18n values). Leave the Marathi blank and people will read the English — it works, and somebody has left the job half done.",
          hinglish:
            'Ek train ka board socho jisme wahi station ka naam Hindi, English aur Marathi mein likha hai. Station ek hi hai (node), naam teen bhaasha mein (i18n values). Agar Marathi wala hissa khaali chhod diya jaaye toh log English padh lenge — kaam chal jaata hai, par kisi ne kaam adhoora chhoda hai.',
        },
        codeExample:
          "// Reading the current language in a server component\nexport default function Greeting({ renderContext }) {\n  const lang = renderContext.getMainResourceLocale().getLanguage(); // 'en' | 'fr'\n  return <p>{lang === 'fr' ? 'Bonjour' : 'Hello'}</p>;\n}\n\n// Editor-facing labels are NOT content — they live in the module:\n//\n//   settings/locales/en.json\n//   {\n//     \"mynt_serviceCard\": { \"name\": \"Service card\",\n//                           \"title\": \"Card title\" }\n//   }\n//\n// Publication is per language. Publishing 'en' leaves 'fr'\n// unpublished, and the fallback will keep showing English\n// until someone notices — check both before calling it done.",
        keyPoints: [
          'One node holds a value per language for each i18n property',
          'Language fallback prevents blanks — and hides missing translations',
          'Publication is per language: publishing English does not publish French',
          'Editor UI labels live in module locale files, not in the repository',
        ],
        quiz: [
          {
            question: 'The French page shows English text. What is the most likely explanation?',
            options: [
              'Jahia auto-translated it',
              'The French value is missing or unpublished, so language fallback served English',
              'The CND is broken',
              'French is not supported',
            ],
            correctIndex: 1,
          },
          {
            question: 'Where do the labels an editor sees for your custom type come from?',
            options: [
              'The CND file',
              'Your module’s locale files (e.g. settings/locales/en.json)',
              'The content repository',
              'Jahia generates them from the property names',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

/* ═══════════════════════ ADVANCED ═══════════════════════ */

const advanced = [
  {
    title: 'Caching and Performance',
    level: 'advanced',
    description: {
      english: "Jahia's HTML cache — how it works and how it catches you out.",
      hinglish: 'Jahia ka HTML cache — kaise kaam karta hai aur kaise phansata hai.',
    },
    concepts: [
      {
        title: 'The HTML Fragment Cache',
        difficulty: 'hard',
        tags: ['cache', 'performance', 'rendering', 'fragments'],
        explanation: {
          english:
            "Jahia does not cache whole pages. It caches FRAGMENTS — the rendered output of individual components — and assembles a page from them. That design is why a busy site stays fast while still showing per-user content: the expensive shared parts are cached once, the personal parts are not.\n\nA fragment's cache key is built from the things that should change its output: the node, the view, the language, the workspace, the user's permissions. Two visitors with different permissions get different keys, which is what stops a cached fragment leaking restricted content to the wrong person.\n\nThe failure mode to recognise: a component whose output depends on something NOT in the key. Read the current time, a request parameter, or a random value, and the first render is cached and served to everyone — your component is correct in isolation and wrong in production.\n\nSo the question to ask of any component is not \"is this fast?\" but \"what does its output depend on, and is every one of those things part of its cache key?\"",
          hinglish:
            "Jahia poore pages cache nahi karta. Wo FRAGMENTS cache karta hai — alag-alag components ka rendered output — aur unse page jodta hai. Isi design ki wajah se busy site tez rehti hai aur phir bhi per-user content dikha paati hai: mehnga shared hissa ek baar cache hota hai, personal hissa nahi.\n\nEk fragment ki cache key un cheezon se banti hai jinhe uska output badalna chahiye: node, view, language, workspace, user ki permissions. Alag permissions wale do visitors ko alag key milti hai — yahi cached fragment ko galat aadmi tak restricted content pahunchane se rokta hai.\n\nJo failure mode pehchanni hai: aisa component jiska output kisi aisi cheez pe depend karta hai jo key mein NAHI hai. Current time padho, request parameter padho, ya random value — pehla render cache ho jaata hai aur sabko wahi milta hai; tumhara component akele mein sahi hai aur production mein galat.\n\nToh har component se poochne wala sawaal ye nahi ki \"ye tez hai kya?\", balki ye ki \"iska output kis-kis pe depend karta hai, aur kya wo sab uski cache key ka hissa hai?\"",
        },
        dailyLifeExample: {
          english:
            "At a dhaba the dal is made in advance (a cached fragment) — everyone gets the same pot, instantly. Rotis are made per order. Now imagine the cook also pre-made \"today’s special\", but the special was meant to change every hour: everyone keeps getting the morning one. That is what happens when output depends on something the cache key does not know about.",
          hinglish:
            'Dhaba mein dal pehle se bani rakhi hoti hai (cached fragment) — sabko wahi milti hai, turant. Roti order pe banti hai. Ab socho cook ne "aaj ka special" bhi pehle se bana ke rakh diya, par special har ghante badalna tha — sabko subah wala hi milta rahega. Wahi hota hai jab output kisi aisi cheez pe depend kare jo key mein nahi hai.',
        },
        codeExample:
          "// ❌ Output depends on time, but time is not in the cache key.\n// The first render is cached and served to everyone, for hours.\nexport default function Countdown() {\n  const left = deadline - Date.now();\n  return <span>{left} ms left</span>;\n}\n\n// ✅ Options, in order of preference:\n//\n// 1. Move it to the client, where each visitor computes it\n//    <Countdown client:load deadline={deadline} />\n//\n// 2. Make the varying thing part of the key, if it is a real\n//    content dimension (node, view, language, permissions).\n//\n// 3. Only if neither fits: mark the fragment non-cacheable —\n//    and accept that it now costs a render on every request.\n//\n// Debugging: compare the SAME page as two users with different\n// permissions. Identical output where it should differ means a\n// key is missing a dimension.",
        keyPoints: [
          'Jahia caches component fragments, not whole pages',
          'The key includes node, view, language, workspace and permissions',
          'Output depending on anything outside the key gets served stale to everyone',
          'Prefer moving volatile logic to the client over disabling the cache',
        ],
        quiz: [
          {
            question: 'A component shows a live countdown but every visitor sees the same frozen number. Why?',
            options: [
              'The server clock is wrong',
              'Its output depends on time, which is not part of the cache key, so the first render is reused',
              'Countdowns are unsupported',
              'The browser cached it',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why do user permissions form part of the fragment cache key?',
            options: [
              'To make keys longer',
              'So a fragment cached for a privileged user is not served to someone without those rights',
              'For analytics',
              'They do not',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you debug a Jahia page that is fast for you and slow for editors?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Start from the difference: editors browse in edit mode, and edit mode largely bypasses the fragment cache so that authors see their changes immediately. What you are usually seeing is the page’s true uncached cost, which the cache hides from anonymous visitors. So the fix is rarely "make the cache better" — it is to find the component that is genuinely expensive to render and narrow what it does: a query walking too much of the tree, an unbounded child iteration, or a per-item lookup that should be one query. Confirm by timing the same page in live mode as an anonymous user with the cache cleared, which shows the same cost the editors feel.',
              hinglish:
                'Farak se shuru karo: editors edit mode mein browse karte hain, aur edit mode fragment cache ko lagbhag bypass karta hai taaki authors apne changes turant dekh sakein. Tum aam taur pe page ki asli bina-cache waali cost dekh rahe ho, jo cache anonymous visitors se chhupa leta hai. Isliye hal shayad hi "cache behtar karo" hota hai — hal ye hai ki wo component dhoondho jo sach mein mehnga hai aur uska kaam sankuchit karo: tree ka bahut bada hissa chalti query, bina limit ke children ka iteration, ya per-item lookup jo ek query honi chahiye. Confirm karne ke liye wahi page live mode mein anonymous user ki tarah cache clear karke time karo — wahi cost dikhegi jo editors mehsoos karte hain.',
            },
          },
        ],
      },
      {
        title: 'Permissions, Roles and Workflow',
        difficulty: 'hard',
        tags: ['permissions', 'acl', 'roles', 'workflow', 'governance'],
        explanation: {
          english:
            "Governance is most of why a project chooses a DXP, and in Jahia it rests on three ideas.\n\n**Permissions** are the individual rights — read this node, edit it, publish it.\n\n**Roles** bundle permissions into something you can hand to a person: editor, reviewer, site administrator. You assign roles, not raw permissions, because raw permissions across hundreds of nodes become unmanageable within a month.\n\n**ACLs** attach a role to a principal (a user or a group) at a point in the tree. And because content is a tree, that assignment INHERITS downward. Grant editing on a section and it applies to everything beneath, unless something below overrides it.\n\nWorkflow sits on top. Publication can require approval: an author submits, a reviewer approves, and only then does content reach live. That is the mechanism behind \"legal must see it first\", and it is why publication in a governed site is a request rather than a button.\n\nThe debugging instinct worth building: when someone cannot do something, do not start at the user. Start at the node, walk up the tree, and find where the inherited role actually comes from.",
          hinglish:
            "Governance hi zyadatar wajah hoti hai ki project DXP chunta hai, aur Jahia mein wo teen ideas pe tikta hai.\n\n**Permissions** alag-alag adhikaar hain — ye node padho, edit karo, publish karo.\n\n**Roles** permissions ko ek bundle mein baandhte hain jise kisi insaan ko diya ja sake: editor, reviewer, site administrator. Tum roles assign karte ho, kachchi permissions nahi, kyunki sau nodes pe kachchi permissions mahine bhar mein bekaabu ho jaati hain.\n\n**ACLs** ek role ko ek principal (user ya group) se tree ke ek point pe jodte hain. Aur kyunki content ek tree hai, wo assignment neeche tak INHERIT hota hai. Ek section pe editing do aur wo neeche sab pe lagu ho jaata hai, jab tak neeche koi use override na kare.\n\nWorkflow iske upar baithta hai. Publication approval maang sakti hai: author submit karta hai, reviewer approve karta hai, tabhi content live pahunchta hai. \"Legal ko pehle dekhna hai\" ke peeche yahi mechanism hai, aur isiliye governed site mein publication ek button nahi, ek request hai.\n\nJo debugging instinct banani chahiye: jab kisi se kuch na ho paaye, user se shuru mat karo. Node se shuru karo, tree mein upar chalo, aur dhoondho ki inherited role asal mein aa kahan se raha hai.",
        },
        dailyLifeExample: {
          english:
            "Think of access in a housing society: the gate key (a permission), the \"resident\" or \"guard\" tag (a role), and which floor a tag works on (an ACL on the tree). Give access to the fourth floor and it covers every flat on it — unless one flat has its own rule. And putting up a poster outside needs the secretary’s approval, which is the workflow.",
          hinglish:
            'Society ka access socho: gate ki chaabi (permission), "resident" ya "guard" ka tag (role), aur kis floor se kaunsa tag chalega (ACL tree pe). Fourth floor ka access diya toh uske saare flats pe lagu — jab tak kisi ek flat pe alag rule na ho. Aur society ke bahar poster lagane se pehle secretary ki approval chahiye — wahi workflow hai.',
        },
        codeExample:
          "// Permissions inherit down the tree\n//\n//   /sites/brightpath                 → 'reader' for everyone\n//     /home                       ↓ inherits\n//     /careers                    → 'editor' for hr-team\n//       /careers/jobs             ↓ inherits editor from /careers\n//       /careers/salaries         → override: hr-leads only\n//\n// Checking a right before rendering an action:\nexport default function EditLink({ currentNode, renderContext }) {\n  const canEdit = currentNode.hasPermission('jcr:write');\n  if (!canEdit) return null;\n  return <a href={editUrl}>Edit</a>;\n}\n\n// Never rely on hiding a control for security. The check that\n// matters is the one Jahia enforces on the node itself — hiding\n// the link is a courtesy to the user, not a protection.\n//\n// Debugging \"why can't they edit?\": start at the NODE, walk UP,\n// find where the role is granted or overridden.",
        keyPoints: [
          'Permissions are rights; roles bundle them; ACLs attach roles at a point in the tree',
          'Assignments inherit downward unless overridden lower down',
          'Workflow can gate publication behind approval',
          'Hiding a button is not security — the node-level check is what protects content',
        ],
        quiz: [
          {
            question: 'An editor can edit a section but not one page inside it. Where do you look?',
            options: [
              'The user’s profile',
              'That page’s own ACL — an override below the inherited grant',
              'The module code',
              'The GraphQL schema',
            ],
            correctIndex: 1,
          },
          {
            question: 'Is hiding an Edit button enough to protect content?',
            options: [
              'Yes, if the button is not rendered',
              'No — the enforced check is the permission on the node itself; hiding is only a courtesy',
              'Yes, in live mode',
              'Only for anonymous users',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Going to Production',
        difficulty: 'hard',
        tags: ['deployment', 'ci-cd', 'production', 'operations'],
        explanation: {
          english:
            "Shipping a Jahia change means shipping two things that move at different speeds: MODULES, which are code, and CONTENT, which belongs to editors. Confusing the two causes most deployment pain.\n\nModules follow ordinary software practice: version them, build them in CI, deploy the artefact, and be able to roll back by redeploying the previous version. Because a module carries its content definitions, deploying is also a schema change — which is why a definition that removes or renames a property deserves the same care as a database migration, including a plan for content already stored in the old shape.\n\nContent does not travel with the module. Environments diverge: production has real pages that staging never had. Copying a production content dump down to staging for testing is normal; pushing staging content up to production usually is not.\n\nA release checklist that earns its place: does the module version increment, has the CND change been reviewed for existing content, is there a rollback version, and have the caches been considered — because a stale fragment after a deploy looks exactly like a broken release.",
          hinglish:
            "Jahia ka change bhejne ka matlab hai do cheezein bhejna jo alag raftaar se chalti hain: MODULES, jo code hain, aur CONTENT, jo editors ka hai. In dono ko gadd-madd karna hi zyadatar deployment ka dard hai.\n\nModules aam software practice follow karte hain: version do, CI mein build karo, artefact deploy karo, aur pichhla version dobara deploy karke rollback kar sako. Kyunki module apne content definitions saath laata hai, deploy karna ek schema change bhi hai — isiliye jo definition koi property hataati ya rename karti hai, wo database migration jitni hi ehtiyaat maangti hai, us content ke plan ke saath jo purani shape mein pehle se pada hai.\n\nContent module ke saath safar nahi karta. Environments alag ho jaate hain: production mein asli pages hain jo staging ne kabhi dekhe hi nahi. Testing ke liye production ka content dump neeche staging pe laana normal hai; staging ka content upar production pe dhakelna aam taur pe nahi.\n\nEk release checklist jo apni jagah kamati hai: module version badha kya, CND change ko maujooda content ke hisaab se review kiya kya, rollback version hai kya, aur caches ka dhyan rakha kya — kyunki deploy ke baad ek purana fragment bilkul toote hue release jaisa dikhta hai.",
        },
        dailyLifeExample: {
          english:
            "Think of renovating a restaurant. You replace the kitchen equipment (the module) with a plan, overnight, keeping the old equipment aside so you can put it back. But you do not copy customers’ orders and bookings (the content) over from another branch. Two different things, with two different sets of rules.",
          hinglish:
            'Restaurant ka renovation socho. Kitchen ke equipment (module) tum badalte ho — plan ke saath, raat mein, purana equipment side mein rakhkar taaki wapas laga sako. Par grahakon ke orders aur bookings (content) tum staging se copy karke nahi laate. Dono alag cheezein hain, alag rules ke saath.',
        },
        codeExample:
          '# A CI pipeline for a Jahia module\n\n# 1. Verify\nyarn install --frozen-lockfile\nyarn lint\nyarn build          # type-check + build + package\n\n# 2. Version — the artefact must be identifiable\n#    1.4.2 → 1.4.3 on every deployable change\n\n# 3. Deploy to an environment\nyarn deploy --target staging\n\n# 4. Verify after deploy, in this order:\n#    - module version in Jahia matches the build\n#    - the Jahia log shows the module STARTED, not just installed\n#    - a page using the changed component renders in LIVE\n\n# Rollback = redeploy the previous version. Keep it to hand.\n\n# Content moves the other way:\n#   production → staging   (a realistic copy to test against)\n#   staging → production   (almost never)',
        keyPoints: [
          'Modules are code and follow CI, versioning and rollback',
          'A CND change is a schema change — plan for content already stored',
          'Content does not ship with modules; production content flows down, not up',
          'After deploying, verify the module STARTED, not merely that it installed',
        ],
        quiz: [
          {
            question: 'Why is deploying a module also a schema concern?',
            options: [
              'Modules contain the database',
              'A module carries its CND definitions, so deploying can change the content model that existing content was saved against',
              'Jahia rebuilds all content on deploy',
              'It is not — CND is only documentation',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which direction does content normally move between environments?',
            options: [
              'Staging up to production, on every release',
              'Production down to staging, so testing happens against realistic content',
              'Both ways continuously',
              'Content never moves',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'A deploy went out and one component renders the old markup. Walk through your diagnosis.',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Work outwards from the artefact rather than guessing. First, confirm the module version running in Jahia is the one that was just built — a failed deploy leaves the previous version happily serving. Second, check the server log for the module actually STARTING; an OSGi bundle can install and then fail to start, which looks identical to a no-op deploy from the browser. Third, compare edit mode with live: correct markup in edit mode and stale markup in live points squarely at the fragment cache, because edit mode largely bypasses it. Only then flush the cache — reaching for it first hides whichever of the earlier three actually failed, and you will meet the same bug again next release.',
              hinglish:
                'Andaaza lagane ke bajaye artefact se bahar ki taraf kaam karo. Pehle, confirm karo ki Jahia mein chal raha module version wahi hai jo abhi build hua — fail hua deploy pichhle version ko khushi se serve karta chhod deta hai. Doosra, server log mein dekho ki module sach mein START hua; ek OSGi bundle install hokar start hone mein fail ho sakta hai, jo browser se bilkul kuch-na-hua deploy jaisa dikhta hai. Teesra, edit mode aur live ki tulna karo: edit mode mein sahi markup aur live mein purana markup seedha fragment cache ki taraf ishara karta hai, kyunki edit mode use lagbhag bypass karta hai. Uske BAAD hi cache flush karo — pehle usi ko pakadna un teeno mein se asli failure ko chhupa deta hai, aur agli release mein wahi bug phir milega.',
            },
          },
        ],
      },
    ],
  },
];

/** Every original concept, keyed by its (unchanged) title. */
export const legacy = Object.fromEntries(
  [...beginner, ...intermediate, ...advanced].flatMap((t) => t.concepts).map((c) => [c.title, c])
);

export const generalInterviewQuestions = [
  {
    question: 'What is the JCR and why does Jahia build on it?',
    difficulty: 'easy',
    frequency: 'very common',
    answer: {
      english:
        'The JCR (Java Content Repository, JSR-283) is a standard for storing content as a tree of typed nodes rather than as rows in tables. Jahia builds on it because the model matches what a content platform actually needs: hierarchy for site structure, typed nodes for a content model, per-node permissions that inherit like folders, versioning, and multiple workspaces for staging and publication. Getting those from the storage layer rather than inventing them per project is the point.',
      hinglish:
        'JCR (Java Content Repository, JSR-283) content ko tables ki rows ki jagah typed nodes ke tree ki tarah rakhne ka standard hai. Jahia isi pe bana hai kyunki ye model wahi hai jo ek content platform ko sach mein chahiye: site structure ke liye hierarchy, content model ke liye typed nodes, folders ki tarah inherit hone waali per-node permissions, versioning, aur staging-publication ke liye kai workspaces. Inhe har project mein khud banane ke bajaye storage layer se paana hi asli baat hai.',
    },
  },
  {
    question: 'Explain the difference between a primary node type and a mixin.',
    difficulty: 'medium',
    frequency: 'very common',
    answer: {
      english:
        'A primary type says what a node IS and a node has exactly one — an article, a page, a card. A mixin says what it can ALSO do, and a node can carry any number. Mixins exist because content models grow sideways: three unrelated types all needing SEO fields is not a reason to invent a shared parent. Jahia’s own jmix:droppableContent is the one you meet first — it is what makes a custom type available to editors in the content picker.',
      hinglish:
        'Primary type batata hai node HAI kya aur node ke paas theek ek hota hai — article, page, card. Mixin batata hai wo aur KYA kar sakta hai, aur node kitne bhi rakh sakta hai. Mixins isliye hain kyunki content models bagal mein badhte hain: teen alag types ko SEO fields chahiye, ye ek shared parent banane ki wajah nahi hai. Jahia ka apna jmix:droppableContent sabse pehle milta hai — wahi custom type ko editors ke content picker mein laata hai.',
    },
  },
  {
    question: 'How does Jahia serve personalised content without losing the benefit of caching?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'By caching fragments rather than pages. A page is assembled from many independently cached component renders, and each fragment’s cache key includes the dimensions that should change its output — node, view, language, workspace and the user’s permissions. The shared, expensive parts are cached once and reused across everyone; only the genuinely per-user fragments are rendered per request. The failure mode is a component whose output depends on something outside its key, which is then computed once and served to everybody.',
      hinglish:
        'Pages ki jagah fragments cache karke. Ek page kai alag-alag cached component renders se banta hai, aur har fragment ki cache key mein wo dimensions hote hain jinhe uska output badalna chahiye — node, view, language, workspace aur user ki permissions. Shared aur mehnge hisse ek baar cache hokar sabke liye dobara use hote hain; sirf sach mein per-user fragments har request pe render hote hain. Failure tab hota hai jab component ka output kisi aisi cheez pe depend kare jo uski key mein nahi — wo ek baar compute hokar sabko mil jaata hai.',
    },
  },
  {
    question: 'When would you render on the server versus shipping a client component?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Default to the server. A server component runs inside Jahia, reads the repository directly without a network hop, produces cacheable HTML, and ships no JavaScript to the visitor. Reach for a client component only when the behaviour genuinely requires the browser: local state, event handling, or a browser API. The cost of getting this wrong in the other direction is quiet — a client component cannot read the JCR at all, so its data has to be passed down as props or fetched over GraphQL, which is a round trip you did not need.',
      hinglish:
        'Default server rakho. Server component Jahia ke andar chalta hai, repository seedha bina network hop ke padhta hai, cacheable HTML banata hai, aur visitor ko koi JavaScript nahi bhejta. Client component tabhi lo jab behaviour ko sach mein browser chahiye: local state, event handling, ya koi browser API. Ulti taraf galti karne ki keemat chupchaap aati hai — client component JCR padh hi nahi sakta, isliye uska data props se ya GraphQL se aana padega, jo ek round trip hai jiski zaroorat nahi thi.',
    },
  },
];
