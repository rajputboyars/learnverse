// INTERMEDIATE — modules 05 to 09: modules, CND, node types, components, views.

import { t, q, iq, shot, fromLegacy, CHAIN } from './helpers.mjs';

/* ═══════════════════ 05 · MODULES ═══════════════════ */

const MAVEN_TREE =
  'lv-news/\n│\n├── pom.xml                              ← Maven build: id, version, Jahia parent\n│\n└── src/\n    └── main/\n        ├── resources/\n        │   ├── META-INF/\n        │   │   └── definitions.cnd          ← node types (the content model)\n        │   ├── lv_article/                  ← views for lv:article\n        │   │   └── html/\n        │   │       ├── article.jsp          ← default view\n        │   │       └── article.card.jsp     ← "card" view\n        │   └── resources/\n        │       └── lv-news.properties       ← labels authors see (en)\n        └── java/                            ← optional Java (rules, actions, filters)';

const JS_TREE =
  'lv-news/\n├── package.json                   ← name, version, Jahia metadata\n├── settings/\n│   ├── definitions.cnd            ← node types\n│   └── locales/en.json            ← labels\n└── src/components/\n    └── Article/\n        ├── default.server.tsx     ← server-rendered view\n        └── Card.client.tsx        ← ships JS to the browser (only if needed)';

const modules = {
  title: 'Modules',
  stage: 5,
  level: 'intermediate',
  estimatedMinutes: 75,
  description: t('What a module is, every file in it, and the build → deploy loop.', 'Module kya hai, uski har file, aur build → deploy loop.'),
  concepts: [
    fromLegacy('Anatomy of a Module', {
      codeLanguage: 'text',
      tags: ['modules', 'react', 'intermediate'],
      quiz: [
        q('In a Maven (classic) module, where does definitions.cnd live?', ['src/main/java', 'src/main/resources/META-INF/', 'the site root in jContent', 'pom.xml'], 1, 'Classic modules keep the CND in META-INF under resources.'),
        q('Where is the default JSP view for lv:article?', ['lv:article/default.jsp', 'src/main/resources/lv_article/html/article.jsp', 'META-INF/article.jsp', 'views/article.html'], 1, 'Folder = type with ":" as "_", then template type "html", then <name>.jsp.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['coding'],
        searchTerms: ['module', 'pom.xml', 'meta-inf', 'definitions.cnd', 'resources', 'folder structure', 'maven', 'javascript module'],
        objectives: [t('Explain every file in a module', 'Module ki har file samjhao'), t('Know the two module flavours', 'Module ke do flavours jaano'), t('Find where a view for a type must live', 'Kisi type ka view kahan hona chahiye')],
        table: {
          title: t('Two module flavours', 'Module ke do flavours'),
          columns: ['', 'Java / Maven module', 'JavaScript module'],
          rows: [
            ['Build', 'Maven — pom.xml', 'yarn / Vite — package.json'],
            ['Content model', 'src/main/resources/META-INF/definitions.cnd', 'settings/definitions.cnd'],
            ['Views', 'JSP: <type>/html/<name>.jsp', 'React: *.server.tsx'],
            ['Labels', 'resources/<module>.properties', 'settings/locales/<lang>.json'],
            ['Jahia versions', '8.x (and 7.x)', '8.2+ (JavaScript modules)'],
          ],
        },
        files: [
          { filename: 'Java / Maven module', language: 'text', code: MAVEN_TREE, highlight: [9, 12, 15], explain: t('Line 9: the content model. Line 12: the default view — the folder name is the node type with ":" replaced by "_". Line 15: labels. This course\'s project uses this layout.', 'Line 9: content model. Line 12: default view — folder ka naam node type hai jisme ":" ki jagah "_". Line 15: labels. Course ka project yahi layout use karta hai.') },
          { filename: 'JavaScript module (Jahia 8.2+)', language: 'text', code: JS_TREE, highlight: [4, 7], explain: t('Same ideas, different files. The original lessons in this course show this layout; check your version\'s template for exact names.', 'Wahi ideas, alag files. Is course ke original lessons ye layout dikhate hain; exact naam apne version ke template se check karo.') },
        ],
        behind: {
          title: t('From module to author', 'Module se author tak'),
          steps: ['CND', 'Build', 'Deploy', { label: 'Jahia registers', sub: 'node type' }, { label: 'CMS editor', sub: 'generated' }, { label: 'Author', sub: 'creates content' }, { label: 'View', sub: 'renders it' }],
        },
        where: [
          { app: 'Module source', path: ['lv-news', 'src/main/resources', 'META-INF', 'definitions.cnd'] },
          { app: 'Module source', path: ['lv-news', 'src/main/resources', 'lv_article', 'html', 'article.jsp'] },
        ],
        challenge: {
          prompt: t('Where does the "card" view of lv:article go?', 'lv:article ka "card" view kahan jaayega?'),
          code: 'src/main/resources/____/html/article.card.jsp',
          options: ['lv:article', 'lv_article', 'META-INF', 'article'],
          answer: 1,
          explanation: t('The folder is the node type with ":" replaced by "_".', 'Folder node type hai jisme ":" ki jagah "_".'),
          language: 'text',
        },
      },
    }),
    fromLegacy('The Build and Deploy Loop', {
      codeLanguage: 'bash',
      tags: ['modules', 'deployment', 'intermediate'],
      lesson: {
        kind: 'lesson',
        minutes: 15,
        badges: ['coding', 'hands-on'],
        searchTerms: ['build', 'deploy', 'maven', 'yarn', 'jahia:deploy', 'loop'],
        files: [
          { filename: 'terminal — Maven module', language: 'bash', code: '# build and deploy into the running Jahia (jahia-maven-plugin)\nmvn clean install jahia:deploy\n\n# alternative: upload the built jar\n#   Administration → Modules → Upload → target/lv-news-1.0.0-SNAPSHOT.jar\n\n# always keep the log open\ndocker compose logs -f jahia', highlight: [2], explain: t('jahia:deploy needs the plugin configured with your Jahia URL/credentials (or a deploy target). Uploading the jar works on any install.', 'jahia:deploy ke liye plugin mein Jahia URL/credentials (ya deploy target) configured chahiye. Jar upload har install pe chalta hai.') },
        ],
        where: [
          { app: 'Administration', path: ['Server', 'Modules'], note: t('Shows every module, version and state (Started / Installed / Resolved).', 'Har module, version aur state (Started / Installed / Resolved) dikhata hai.') },
        ],
        debug: [
          {
            title: t('Deployed, but the module is not Started', 'Deploy hua, par module Started nahi'),
            problem: t('The module shows Installed or Resolved.', 'Module Installed ya Resolved dikha raha hai.'),
            causes: ['CND parse error', 'Missing dependency on another module', 'Java compile/runtime error'],
            where: ['Administration → Modules → module details', 'The log right after deploy'],
            fix: t('Read the first error in the log, fix it, redeploy.', 'Log ka pehla error padho, fix karo, redeploy karo.'),
            prevention: t('Deploy small changes often.', 'Chhote changes baar-baar deploy karo.'),
          },
        ],
      },
    }),
    {
      title: 'Project — Create the lv-news Module and Namespace',
      difficulty: 'medium',
      tags: ['project', 'modules', 'cnd', 'intermediate'],
      explanation: t(
        "Phases 1 and 2 of the Learnverse News Portal. You create an empty module called lv-news, give it a namespace, deploy it, and enable it on your site. Nothing visible happens for authors yet — that is correct. You are proving the pipe works before you push anything through it.\n\nThe NAMESPACE is the prefix every one of your types will carry: lv:article, lv:author. It must be declared at the top of definitions.cnd with a URI, alongside the Jahia namespaces you extend (jnt, jmix). The URI is just a unique string; it is never fetched. Pick it once — renaming a namespace after content exists means migrating every node.\n\nThen deploy and ENABLE: deployed means the server knows the module, enabled means a site uses it. Forgetting the second step is the most common reason a new component \"does not exist\".",
        "Learnverse News Portal ke Phase 1 aur 2. Tum lv-news naam ka khaali module banaoge, use namespace doge, deploy karoge, aur site pe enable karoge. Authors ko abhi kuch nahi dikhega — yahi sahi hai. Kuch bhi bhejne se pehle pipe ka kaam karna prove kar rahe ho.\n\nNAMESPACE wo prefix hai jo tumhara har type lagayega: lv:article, lv:author. Ise definitions.cnd ke top pe URI ke saath declare karna padta hai, un Jahia namespaces ke saath jinhe tum extend karte ho (jnt, jmix). URI bas ek unique string hai; koi fetch nahi karta. Ek baar chuno — content banne ke baad namespace badalna matlab har node migrate karna.\n\nPhir deploy aur ENABLE: deployed matlab server module ko jaanta hai, enabled matlab site use karti hai. Doosra step bhoolna sabse common wajah hai ki naya component \"exist hi nahi karta\"."
      ),
      dailyLifeExample: t(
        'Registering a company name before printing letterheads. The name (namespace) goes on everything you make afterwards, and changing it later means reprinting everything.',
        'Letterhead chhapne se pehle company ka naam register karna. Naam (namespace) baad mein har cheez pe jaayega, aur baad mein badla toh sab dobara chhapna padega.'
      ),
      keyPoints: ['Declare your namespace and the Jahia ones you extend', 'Choose the prefix once', 'Deploy ≠ enable', 'Prove the pipe before adding types'],
      quiz: [
        q('The module is deployed, but its components do not appear on your site. First check?', ['Rewrite the CND', 'Is the module enabled on that site?', 'Clear the browser', 'Restart Docker'], 1, 'Deployed on the server is not enabled on the site.'),
        q('Which line declares the course namespace?', ["[lv:article] > jnt:content", "<lv = 'http://learnverse.dev/jahia/nt/1.0'>", "- lv (string)", "+ lv (jnt:content)"], 1, 'Namespaces are declared with <prefix = \'uri\'>.'),
      ],
      lesson: {
        kind: 'project',
        minutes: 30,
        badges: ['project', 'coding', 'hands-on'],
        searchTerms: ['project', 'namespace', 'module', 'lv-news', 'phase 1', 'phase 2', 'enable module'],
        build: { text: t('Phase 1: the module. Phase 2: the namespace.', 'Phase 1: module. Phase 2: namespace.'), flow: { steps: ['Scaffold lv-news', 'Declare lv:', 'Build', 'Deploy', 'Enable on site'], highlight: 1 } },
        files: [
          { filename: 'pom.xml (excerpt)', path: 'lv-news/', language: 'xml', code: '<project>\n  <parent>\n    <groupId>org.jahia.modules</groupId>\n    <artifactId>jahia-modules</artifactId>\n    <version><!-- your Jahia version --></version>\n  </parent>\n  <groupId>dev.learnverse</groupId>\n  <artifactId>lv-news</artifactId>\n  <name>Learnverse News</name>\n  <version>1.0.0-SNAPSHOT</version>\n  <packaging>bundle</packaging>\n</project>', highlight: [8, 11], explain: t('Generate the real file from Jahia\'s module archetype or your team template; the parent version must match your Jahia.', 'Asli file Jahia ke module archetype ya team template se generate karo; parent version tumhare Jahia se match hona chahiye.') },
          { filename: 'definitions.cnd', path: 'lv-news/src/main/resources/META-INF/', language: 'cnd', code: "<jcr = 'http://www.jcp.org/jcr/1.0'>\n<nt = 'http://www.jcp.org/jcr/nt/1.0'>\n<mix = 'http://www.jcp.org/jcr/mix/1.0'>\n<jnt = 'http://www.jahia.org/jahia/nt/1.0'>\n<jmix = 'http://www.jahia.org/jahia/mix/1.0'>\n<lv = 'http://learnverse.dev/jahia/nt/1.0'>\n<lvmix = 'http://learnverse.dev/jahia/mix/1.0'>\n\n// types arrive in module 07", highlight: [6, 7], explain: t('Lines 6–7 are yours: lv for types, lvmix for mixins.', 'Lines 6–7 tumhari hain: types ke liye lv, mixins ke liye lvmix.') },
        ],
        steps: [
          { title: t('Generate a module project named lv-news', 'lv-news naam ka module project generate karo'), detail: t('Use the Jahia module archetype (Maven) or your team\'s template.', 'Jahia module archetype (Maven) ya team ka template use karo.') },
          { title: t('Create META-INF/definitions.cnd with the namespaces above', 'Upar wale namespaces ke saath META-INF/definitions.cnd banao') },
          { title: t('Build and deploy', 'Build aur deploy karo'), code: 'mvn clean install jahia:deploy', language: 'bash', filename: 'terminal' },
          { title: t('In Administration → Modules, confirm lv-news is Started', 'Administration → Modules mein confirm karo lv-news Started hai') },
          { title: t('Enable lv-news on the learnverse site', 'learnverse site pe lv-news enable karo'), detail: t('Site settings → Modules (label varies).', 'Site settings → Modules (label alag ho sakta hai).') },
        ],
        expected: { checks: ['✓ Module created', '✓ Namespace declared', '✓ Module Started', '✓ Enabled on learnverse'] },
        challenge: {
          prompt: t('Complete the namespace declaration.', 'Namespace declaration poora karo.'),
          code: "<lv ____ 'http://learnverse.dev/jahia/nt/1.0'>",
          options: ['=', ':', '>', '<'],
          answer: 0,
          explanation: t("<prefix = 'uri'>", "<prefix = 'uri'>"),
        },
      },
    },
  ],
};

/* ═══════════════════ 06 · CND ═══════════════════ */

const cnd = {
  title: 'CND',
  stage: 6,
  level: 'intermediate',
  estimatedMinutes: 150,
  description: t('The content definition language — every line connected to the CMS field it creates.', 'Content definition language — har line us CMS field se judi jo wo banati hai.'),
  concepts: [
    fromLegacy('Reading and Writing a CND File', {
      codeLanguage: 'cnd',
      tags: ['cnd', 'intermediate'],
      quiz: [
        q('Spot the error:\n\n[lv:article] jnt:content\n - title (string)', ['title needs i18n', 'Missing ">" before the supertype', 'string is not a type', 'Nothing is wrong'], 1, 'Supertypes follow ">".'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['coding'],
        searchTerms: ['cnd', 'definitions.cnd', 'syntax', 'node type', 'property', 'namespace'],
        files: [
          { filename: 'definitions.cnd', path: 'src/main/resources/META-INF/', language: 'cnd', code: "<lv = 'http://learnverse.dev/jahia/nt/1.0'>\n\n[lv:article] > jnt:content, jmix:editorialContent\n - jcr:title (string) i18n mandatory\n - summary (string, textarea) i18n\n - image (weakreference, picker[type='image']) < 'jmix:image'\n + * (jnt:content)", highlight: [3], explain: t('Anatomy of one line: [name] > supertypes, mixins. Then "-" lines are properties: name (type, selector) attributes < constraint. "+" lines are child nodes.', 'Ek line ki anatomy: [naam] > supertypes, mixins. Phir "-" wali lines properties: naam (type, selector) attributes < constraint. "+" wali lines child nodes.') },
        ],
        cmsVsCode: [
          { code: '[lv:article] > jnt:content, jmix:editorialContent', field: { kind: 'type', label: 'Article', value: 'New content → Article' }, note: t('The type appears in the picker.', 'Type picker mein aata hai.') },
          { code: '- jcr:title (string) i18n mandatory', field: { kind: 'text', label: 'Title', value: '', required: true, i18n: true } },
        ],
        mistakes: [
          { title: t('Undeclared prefix', 'Undeclared prefix'), fix: t('Every prefix used must be declared at the top.', 'Use kiya har prefix top pe declare hona chahiye.') },
          { title: t('Renaming a property after content exists', 'Content banne ke baad property rename karna'), detail: t('Old nodes keep the old property; views read the new name and find nothing.', 'Purane nodes purani property rakhte hain; views naya naam padhte hain aur kuch nahi milta.') },
        ],
        challenge: {
          prompt: t('Which character starts a child-node line?', 'Child-node line kis character se shuru hoti hai?'),
          code: '[lv:gallery] > jnt:content\n ____ * (lv:galleryItem)',
          options: ['-', '+', '>', '<'],
          answer: 1,
          explanation: t('"-" is a property, "+" is a child node.', '"-" property hai, "+" child node.'),
        },
      },
    }),
    {
      title: 'CND Property Types — From Declaration to CMS Field',
      difficulty: 'medium',
      tags: ['cnd', 'properties', 'cms', 'authoring', 'intermediate'],
      explanation: t(
        "A property type decides three things at once: how the value is stored, how it can be queried, and which control the author gets. Choose by what the value IS, not by what is convenient to type.\n\nstring — text; a text input. long — a whole number; a number field. double — a floating-point number; a decimal field. decimal — an exact decimal for money. boolean — true/false; a checkbox or toggle. date — a date-time; a date picker. weakreference — a pointer to another node; a picker. reference — a hard pointer that blocks deleting the target. binary — raw bytes, which you meet inside files rather than declaring.\n\nWhy it matters beyond the form: a price stored as a string sorts \"100\" before \"9\" and cannot be range-queried; a date stored as a string cannot be filtered by \"last 7 days\"; an image stored as a URL string breaks when the file is renamed. The right type makes the form, the query and the view correct together.\n\nThe Jahia documentation describes exactly this mapping — string, boolean, weakreference, date, double and long each map to a different editor control. Keep the CND reference open while you write types: it shows the control for every declaration.",
        "Property type ek saath teen cheezein decide karta hai: value kaise store hogi, kaise query hogi, aur author ko kaunsa control milega. Value KYA hai uske hisaab se chuno, jo type karne mein aasaan ho uske hisaab se nahi.\n\nstring — text; text input. long — poora number; number field. double — floating-point number; decimal field. decimal — paison ke liye exact decimal. boolean — true/false; checkbox ya toggle. date — date-time; date picker. weakreference — doosre node ka pointer; picker. reference — hard pointer jo target delete nahi hone deta. binary — raw bytes, jo files ke andar milte hain, khud declare nahi karte.\n\nForm se aage kyun zaroori: string mein store price \"100\" ko \"9\" se pehle sort karta hai aur range query nahi hoti; string mein date \"pichhle 7 din\" se filter nahi hoti; URL string mein image file rename hone pe toot jaati hai. Sahi type form, query aur view teeno ek saath sahi karta hai.\n\nJahia documentation bilkul yahi mapping batati hai — string, boolean, weakreference, date, double aur long har ek alag editor control banata hai. Types likhte waqt CND reference khula rakho: har declaration ka control dikhata hai."
      ),
      dailyLifeExample: t(
        'A government form: your name is a text box, your age is a number box, "married?" is a tick box, date of birth has DD/MM/YYYY boxes, and "attach photo" points to a separate document. Each box type exists so the office can process the answer correctly.',
        'Sarkari form: naam text box, umar number box, "shaadi hui?" tick box, janm tithi ke DD/MM/YYYY box, aur "photo attach karo" alag document ko point karta hai. Har box ka type isliye hai taaki office jawab sahi process kar sake.'
      ),
      keyPoints: ['Type decides storage, querying and the author\'s control', 'Numbers as long/double/decimal, never string', 'Dates as date', 'Links as weakreference'],
      quiz: [
        q('You created:\n\n- title (string)\n\nWhat will the author normally see?', ['A. Checkbox', 'B. Text field', 'C. Date picker', 'D. Node picker'], 1, 'string → text field.'),
        q('Which type for a product price?', ['string', 'double', 'decimal', 'boolean'], 2, 'decimal is exact — right for money.'),
        q('Why not store publishedDate as a string?', ['Strings are slow to type', 'You cannot filter or sort it as a date, and authors get no date picker', 'Strings cannot be i18n', 'Jahia forbids it'], 1, 'The right type gives correct queries and the right control.'),
        q('What does the author see for - image (weakreference)?', ['A text box to paste a URL', 'A picker to select a node', 'A checkbox', 'Nothing'], 1, 'References become pickers.'),
      ],
      interviewQuestions: [
        iq({
          question: 'How does a CND property declaration map to the Jahia authoring UI?',
          difficulty: 'medium',
          short: t('The Content Editor is generated from the definition: the property type picks a default control (string → text, boolean → checkbox, date → date picker, weakreference → picker), selectors override it, attributes add behaviour (mandatory, i18n, multiple), and labels come from the resource bundle.', 'Content Editor definition se generate hota hai: property type default control chunta hai (string → text, boolean → checkbox, date → date picker, weakreference → picker), selectors use badalte hain, attributes behaviour add karte hain (mandatory, i18n, multiple), aur labels resource bundle se aate hain.'),
          deep: t('So form design is data-model design. If authors find a form hard, you change the CND: tighten a type, add a choicelist, constrain a picker, add a default. Nothing about the form is drawn by hand.', 'Toh form design data-model design hai. Authors ko form mushkil lage toh CND badlo: type tight karo, choicelist add karo, picker constrain karo, default do. Form ka kuch bhi haath se draw nahi hota.'),
          code: { code: "- jcr:title (string) i18n mandatory      → required, translatable text input\n- isFeatured (boolean) = false autocreated → checkbox, unticked\n- image (weakreference, picker[type='image']) < 'jmix:image' → image picker" },
          tip: t('Mention that labels live in the resource bundle, not the CND.', 'Batao labels resource bundle mein hain, CND mein nahi.'),
        }),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 25,
        badges: ['coding', 'cms'],
        searchTerms: ['string', 'long', 'double', 'decimal', 'boolean', 'date', 'weakreference', 'reference', 'binary', 'property type', 'field type'],
        cmsVsCode: [
          { code: '- title (string)', field: { kind: 'text', label: 'Title', value: 'My Blog Article' } },
          { code: '- price (long)', field: { kind: 'number', label: 'Price', value: '499' } },
          { code: '- rating (double)', field: { kind: 'decimal', label: 'Rating', value: '4.5' } },
          { code: '- isFeatured (boolean)', field: { kind: 'checkbox', label: 'Featured', value: true } },
          { code: '- publishedDate (date)', field: { kind: 'date', label: 'Published date', value: '10 Sep 2026' } },
          { code: '- image (weakreference)', field: { kind: 'picker-content', label: 'Image', value: 'Select Image' }, note: t('Add picker[type=\'image\'] and < \'jmix:image\' for a proper image picker — next lessons.', "Sahi image picker ke liye picker[type='image'] aur < 'jmix:image' — agle lessons mein.") },
        ],
        views: {
          author: { text: t('The author sees six different controls and never types a UUID or a date format.', 'Author ko chhe alag controls dikhte hain aur kabhi UUID ya date format type nahi karta.') },
          developer: { text: t('The developer writes six lines.', 'Developer chhe lines likhta hai.'), code: '[lv:product] > jnt:content, jmix:editorialContent\n - title (string)\n - price (long)\n - rating (double)\n - isFeatured (boolean)\n - publishedDate (date)\n - image (weakreference)', language: 'cnd', filename: 'definitions.cnd' },
          jcr: { text: t('The JCR stores typed values.', 'JCR typed values store karta hai.'), code: 'title          String         "My Blog Article"\nprice          Long           499\nrating         Double         4.5\nisFeatured     Boolean        true\npublishedDate  Date           2026-09-10T00:00:00.000Z\nimage          WeakReference  9b1e…77a', language: 'text' },
        },
        where: [
          { app: 'Module source', path: ['META-INF', 'definitions.cnd'] },
          { app: 'Jahia CMS', path: ['jContent', '+ New content', 'Product'], note: t('Where the resulting form appears.', 'Jahan resulting form dikhta hai.') },
        ],
        mistakes: [
          { title: t('Numbers stored as strings', 'Numbers ko string mein store karna'), fix: t('Use long / double / decimal.', 'long / double / decimal use karo.') },
          { title: t('Changing a type after content exists', 'Content banne ke baad type badalna'), detail: t('Existing values may fail to convert and the module may refuse to start. Add a new property and migrate instead.', 'Purani values convert nahi hongi aur module start hone se mana kar sakta hai. Nayi property add karke migrate karo.') },
        ],
        challenge: {
          prompt: t('Pick the right type for a star rating like 4.5.', '4.5 jaisi star rating ke liye sahi type chuno.'),
          code: '[lv:article] > jnt:content\n - rating (____)',
          options: ['string', 'boolean', 'double', 'weakreference'],
          answer: 2,
          explanation: t('double holds decimals; string would sort wrongly.', 'double decimals rakhta hai; string galat sort karega.'),
        },
      },
    },
    {
      title: 'Property Attributes — mandatory, i18n, multiple, hidden, protected, defaults',
      difficulty: 'medium',
      tags: ['cnd', 'attributes', 'i18n', 'intermediate'],
      explanation: t(
        "After the type, attributes shape how a property behaves. There are a handful you will use constantly.\n\nmandatory — the author cannot save without a value; the field gets an asterisk. Use it for what your view cannot render without, not for everything.\n\ni18n (internationalized) — one value per language. Titles and body text: yes. Prices, booleans, image references: usually no, because they are the same in every language.\n\nmultiple — a list of values instead of one; the editor gets add/remove, your view reads an array.\n\nhidden — stored but never shown in the editor; set by code or import.\n\nprotected — cannot be changed through normal editing; system-managed.\n\nautocreated — the property is created with its default as soon as the node is created, so it always exists.\n\n= 'value' — a default value; with autocreated it is written to the node, without it it only pre-fills the form.\n\n< constraints — the allowed values: a list, a regex, a numeric range '[0, 5]', or for references the target node types.\n\nOrder on the line: name (type, selector) attributes = default < constraints. Jahia is tolerant about the order of attributes, but a consistent order makes files easy to read.",
        "Type ke baad, attributes batate hain property kaise behave karegi. Kuch aise hain jo tum baar-baar use karoge.\n\nmandatory — value ke bina author save nahi kar sakta; field pe star lagta hai. Use sirf wahan karo jiske bina view render nahi ho sakta, har cheez pe nahi.\n\ni18n (internationalized) — har language ki alag value. Title aur body text: haan. Price, boolean, image reference: aam taur pe nahi, kyunki wo har language mein same hote hain.\n\nmultiple — ek value ki jagah list; editor mein add/remove, view array padhta hai.\n\nhidden — store hota hai par editor mein kabhi nahi dikhta; code ya import se set.\n\nprotected — normal editing se badla nahi ja sakta; system-managed.\n\nautocreated — node bante hi property default ke saath ban jaati hai, toh hamesha rehti hai.\n\n= 'value' — default value; autocreated ke saath node mein likhi jaati hai, uske bina sirf form pre-fill karti hai.\n\n< constraints — allowed values: list, regex, numeric range '[0, 5]', ya references ke liye target node types.\n\nLine pe order: naam (type, selector) attributes = default < constraints. Jahia attributes ke order mein lenient hai, par consistent order se files padhne mein aasaan."
      ),
      dailyLifeExample: t(
        'A school admission form: some boxes are compulsory (mandatory), the name is written in both Hindi and English (i18n), "siblings" has room for several names (multiple), the office-use-only box is hidden from parents (hidden), the admission number is filled by the school and cannot be changed (protected), and nationality is pre-printed "Indian" (default).',
        'School admission form: kuch box compulsory (mandatory), naam Hindi aur English dono mein (i18n), "siblings" mein kai naam ki jagah (multiple), "office use only" box parents se chhupa (hidden), admission number school bharta hai aur badal nahi sakte (protected), aur nationality pe pehle se "Indian" chhapa (default).'
      ),
      keyPoints: ['mandatory: only for what the view needs', 'i18n: text yes, numbers/references usually no', 'multiple → arrays', 'autocreated + default → always present'],
      quiz: [
        q('Fix the CND so the Hindi site can have its own title:\n\n- jcr:title (string) mandatory', ['Add multiple', 'Add i18n', 'Add hidden', 'Change to long'], 1, 'i18n gives one value per language.'),
        q('Which attribute makes a list with add/remove in the editor?', ['mandatory', 'multiple', 'protected', 'autocreated'], 1, 'multiple.'),
        q('- isFeatured (boolean) = false — without autocreated, what happens on a node created by an import that never sets it?', ['It is false', 'The property does not exist', 'It is true', 'The import fails'], 1, 'Without autocreated, the default only pre-fills the form.'),
        q('Should price (decimal) be i18n?', ['Always', 'Usually no — the value is the same in every language', 'Only for Hindi', 'Jahia forbids decimals'], 1, 'Shared values should not be translated.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 25,
        badges: ['coding', 'cms'],
        searchTerms: ['mandatory', 'i18n', 'internationalized', 'multiple', 'hidden', 'protected', 'autocreated', 'default', 'constraint', 'required'],
        cmsVsCode: [
          { code: '- jcr:title (string) mandatory', field: { kind: 'text', label: 'Title', value: '', required: true, error: 'This field is required' } },
          { code: '- jcr:title (string) i18n', field: { kind: 'text', label: 'Title', value: 'Learnverse में आपका स्वागत है', i18n: true } },
          { code: '- keywords (string) multiple', field: { kind: 'multitext', label: 'Keywords', value: ['jahia', 'jcr'] } },
          { code: '- legacyId (string) hidden', field: { kind: 'hidden', label: 'legacyId' } },
          { code: '- importedAt (date) protected', field: { kind: 'readonly', label: 'Imported at', value: '02 Sep 2026' } },
          { code: "- status (string, choicelist) = 'draft' autocreated < 'draft', 'review', 'final'", field: { kind: 'select', label: 'Status', value: 'draft' } },
          { code: "- rating (long) < '[1, 5]'", field: { kind: 'number', label: 'Rating', value: '6', error: 'Value must be between 1 and 5' } },
        ],
        files: [
          { filename: 'definitions.cnd', language: 'cnd', code: "[lv:article] > jnt:content, jmix:editorialContent\n - jcr:title (string) i18n mandatory\n - keywords (string) multiple\n - isFeatured (boolean) = false autocreated\n - readingMinutes (long) < '[1, 60]'\n - legacyId (string) hidden", highlight: [2, 4], explain: t('Line 2: required and translatable. Line 4: always present, starts false.', 'Line 2: required aur translatable. Line 4: hamesha maujood, false se shuru.') },
        ],
        mistakes: [
          { title: t('Making everything mandatory', 'Har cheez mandatory kar dena'), detail: t('Authors cannot save drafts; they start typing "x" to get past the form.', 'Authors draft save nahi kar paate; form paar karne ke liye "x" type karne lagte hain.') },
          { title: t('Adding i18n to an existing property with content', 'Content wali property pe baad mein i18n lagana'), detail: t('Existing values do not move into languages automatically — plan a migration.', 'Purani values apne aap languages mein nahi jaati — migration plan karo.') },
        ],
        debug: [
          {
            title: t('The i18n field shows English on the Hindi page', 'Hindi page pe i18n field English dikha raha hai'),
            problem: t('Hindi was never filled, and the site falls back to the default language.', 'Hindi kabhi bhari nahi gayi, aur site default language pe fallback karti hai.'),
            causes: ['No Hindi value', 'Hindi not published', 'Property not i18n'],
            where: ['Content Editor with the language switcher on HI', 'Status per language'],
            fix: t('Fill and publish the Hindi value, or confirm the property is i18n.', 'Hindi value bharo aur publish karo, ya confirm karo property i18n hai.'),
            prevention: t('Make translatable text i18n from day one.', 'Translatable text ko pehle din se i18n rakho.'),
          },
        ],
        challenge: {
          prompt: t('Make the title required AND translatable.', 'Title ko required AUR translatable banao.'),
          code: '- jcr:title (string) ____ mandatory',
          options: ['multiple', 'hidden', 'i18n', 'protected'],
          answer: 2,
          explanation: t('i18n = one value per language.', 'i18n = har language ki alag value.'),
        },
      },
    },
    {
      title: 'Selectors — richtext, textarea, choicelist, datepicker, pickers',
      difficulty: 'medium',
      tags: ['cnd', 'selectors', 'cms', 'authoring', 'intermediate'],
      explanation: t(
        "A selector is the second word in the parentheses — (string, richtext) — and it changes the CONTROL without changing the stored type.\n\nrichtext — a rich text editor; stores HTML. For article bodies.\ntextarea — a multi-line plain text box. For summaries and teasers.\nchoicelist — a dropdown built from the constraint values; add [resourceBundle] to translate the labels while storing a stable key.\ndatepicker / datetimepicker — date-only or date-and-time.\npicker[type='image'] / picker[type='file'] / picker[type='page'] — pickers that open the media browser or the page tree for a weakreference.\ncolor — a colour picker (availability varies by version).\n\nThe decision rule: the type says what the value IS; the selector says how the author should ENTER it. A summary and a body are both strings, but a summary with a rich editor invites bold text and images where your card design has no room for them — that is a textarea.\n\nChoicelist is the most underused: any field where the answer is one of a few known values (layout, theme, alignment) should be a choicelist, not free text. Free text is how you end up with \"Wide\", \"wide\" and \"WIDE\" in the same site.",
        "Selector parentheses ka doosra shabd hai — (string, richtext) — aur ye stored type badle bina CONTROL badalta hai.\n\nrichtext — rich text editor; HTML store karta hai. Article body ke liye.\ntextarea — kai lines ka plain text box. Summary aur teaser ke liye.\nchoicelist — constraint values se bana dropdown; [resourceBundle] lagao toh labels translate hote hain aur stable key store hoti hai.\ndatepicker / datetimepicker — sirf date ya date-aur-time.\npicker[type='image'] / picker[type='file'] / picker[type='page'] — pickers jo weakreference ke liye media browser ya page tree kholte hain.\ncolor — colour picker (availability version pe depend).\n\nDecision rule: type batata hai value KYA hai; selector batata hai author use KAISE bharega. Summary aur body dono string hain, par summary pe rich editor diya toh author bold text aur images daalega jahan tumhare card design mein jagah nahi — wo textarea hai.\n\nChoicelist sabse kam use hota hai: jahan jawab kuch known values mein se ek ho (layout, theme, alignment) wahan choicelist, free text nahi. Free text se hi ek site mein \"Wide\", \"wide\" aur \"WIDE\" teeno aa jaate hain."
      ),
      dailyLifeExample: t(
        'The same question — "which city?" — asked on a paper form as a blank line, and on an app as a dropdown. The answer is text either way; the dropdown just stops people typing "Bombay", "Mumbai" and "mumbai".',
        'Wahi sawaal — "kaunsa sheher?" — paper form pe khaali line ki tarah, aur app pe dropdown ki tarah. Jawab dono mein text hai; dropdown bas logon ko "Bombay", "Mumbai" aur "mumbai" likhne se rokta hai.'
      ),
      keyPoints: ['Selector changes the control, not the type', 'richtext for bodies, textarea for summaries', 'choicelist for known values', 'pickers for weakreferences'],
      quiz: [
        q('Which selector gives a rich text editor?', ['textarea', 'richtext', 'choicelist', 'datepicker'], 1, 'richtext.'),
        q('A card has room for two plain lines of teaser. Which declaration?', ['- teaser (string, richtext)', '- teaser (string, textarea)', '- teaser (boolean)', '- teaser (weakreference)'], 1, 'textarea: multi-line plain text, no formatting.'),
        q('Authors type "Wide", "wide" and "WIDE" into layout. Fix?', ["- layout (string, choicelist[resourceBundle]) < 'wide', 'narrow'", '- layout (string) mandatory', '- layout (long)', '- layout (string) multiple'], 0, 'A choicelist restricts to known values.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 25,
        badges: ['coding', 'cms'],
        searchTerms: ['selector', 'richtext', 'textarea', 'choicelist', 'datepicker', 'datetimepicker', 'picker', 'color', 'dropdown', 'rich text'],
        cmsVsCode: [
          { code: '- description (string, richtext)', field: { kind: 'richtext', label: 'Description', value: 'Jahia stores every page as a <b>node</b>.' } },
          { code: '- summary (string, textarea)', field: { kind: 'textarea', label: 'Summary', value: 'Two plain lines for the card.' } },
          { code: "- layout (string, choicelist[resourceBundle]) < 'wide', 'narrow'", field: { kind: 'select', label: 'Layout', value: 'wide' } },
          { code: '- eventStart (date, datetimepicker)', field: { kind: 'datetime', label: 'Event start', value: '12 Sep 2026, 18:30' } },
          { code: "- image (weakreference, picker[type='image']) < 'jmix:image'", field: { kind: 'picker-image', label: 'Image', value: 'Select Image' } },
          { code: "- brochure (weakreference, picker[type='file']) < 'jnt:file'", field: { kind: 'picker-file', label: 'Brochure', value: 'Select file' } },
        ],
        files: [
          { filename: 'lv-news.properties', path: 'src/main/resources/resources/', language: 'properties', code: 'lv_article=Article\nlv_article.jcr_title=Title\nlv_article.layout=Layout\nlv_article.layout.wide=Wide\nlv_article.layout.narrow=Narrow', highlight: [4, 5], explain: t('Labels for a choicelist[resourceBundle]. The stored value stays "wide"; authors see "Wide" (or its translation). Key format: type with "_" for ":", then property; check your version\'s convention for property names containing ":".', 'choicelist[resourceBundle] ke labels. Store value "wide" rehti hai; authors ko "Wide" (ya translation) dikhta hai. Key format: type jisme ":" ki jagah "_", phir property; ":" wale property naam ka convention apne version mein check karo.') },
        ],
        mistakes: [
          { title: t('richtext everywhere', 'Har jagah richtext'), detail: t('Authors paste formatted text that breaks your design.', 'Authors formatted text paste karte hain jo design tod deta hai.') },
          { title: t('Rendering richtext as escaped text', 'Richtext ko escaped text ki tarah render karna'), detail: t('You get literal <p> tags on the page. Richtext is HTML — output it unescaped, and only from trusted richtext fields.', 'Page pe literal <p> tags aa jaate hain. Richtext HTML hai — unescaped output karo, aur sirf trusted richtext fields se.') },
        ],
        challenge: {
          prompt: t('Give the body a rich text editor.', 'Body ko rich text editor do.'),
          code: '- body (string, ____) i18n',
          options: ['textarea', 'richtext', 'choicelist', 'color'],
          answer: 1,
          explanation: t('richtext → CKEditor, stores HTML.', 'richtext → CKEditor, HTML store karta hai.'),
        },
      },
    },
    {
      title: 'Child Nodes and Inheritance',
      difficulty: 'medium',
      tags: ['cnd', 'inheritance', 'child nodes', 'intermediate'],
      explanation: t(
        "Two mechanisms let one type build on another.\n\nINHERITANCE is \"is a kind of\". [lv:news] > lv:article means a news item IS an article: it gets every article property, can be used wherever an article is accepted, and — importantly — if lv:news has no view of its own, Jahia renders it with lv:article's view. Use it for real specialisation, not to save typing.\n\nCHILD NODES are \"contains\". A gallery contains items; an FAQ contains questions. In the CND, lines starting with + declare what children a type may have: + * (lv:galleryItem) means \"any number of gallery items\". Add orderable to the type so authors control the order. Mark the child type jmix:hiddenType so it does not clutter the \"New content\" picker, because it only makes sense inside its parent.\n\nThe choice between a child node and a reference: a gallery item belongs to one gallery and dies with it — child. An author exists on their own and is shared by many articles — reference.",
        "Do tareeke hain jisse ek type doosre pe bana sakta hai.\n\nINHERITANCE matlab \"ek tarah ka\". [lv:news] > lv:article matlab news item EK article hai: use article ki har property milti hai, jahan article accept hota hai wahan use ho sakta hai, aur — zaroori — agar lv:news ka apna view nahi, toh Jahia use lv:article ke view se render karta hai. Asli specialisation ke liye use karo, typing bachane ke liye nahi.\n\nCHILD NODES matlab \"andar rakhta hai\". Gallery mein items; FAQ mein questions. CND mein + se shuru hone wali lines batati hain type ke kaunse children ho sakte hain: + * (lv:galleryItem) matlab \"kitne bhi gallery items\". Type pe orderable lagao taaki order author control kare. Child type ko jmix:hiddenType do taaki \"New content\" picker na bhare, kyunki wo sirf parent ke andar samajh aata hai.\n\nChild node ya reference: gallery item ek hi gallery ka hai aur uske saath khatam — child. Author khud mein exist karta hai aur kai articles share karte hain — reference."
      ),
      dailyLifeExample: t(
        'Inheritance: a sports car IS a car — it has everything a car has, plus more. Child nodes: a car CONTAINS seats — the seats belong to that car. References: a car has an OWNER — the owner exists independently and may own several cars.',
        'Inheritance: sports car EK car hai — car ka sab kuch, aur zyaada. Child nodes: car mein seats HAIN — seats usi car ki. References: car ka ek MAALIK hai — maalik alag se exist karta hai aur kai cars ka ho sakta hai.'
      ),
      keyPoints: ['> supertype: "is a kind of", inherits properties and views', '+ child: "contains", dies with the parent', 'orderable for author-controlled order', 'Shared things are references, owned things are children'],
      quiz: [
        q('lv:news > lv:article has no view of its own. What does Jahia render?', ['An error', 'lv:article\'s view', 'Nothing', 'Raw JSON'], 1, 'View resolution falls back up the supertype chain.'),
        q('An author profile shared by 40 articles should be…', ['A child node of each article', 'A separate node referenced by the articles', 'A string on each article', 'A mixin'], 1, 'Shared entities are referenced.'),
        q('Which keeps gallery items in the order the author chose?', ['mandatory', 'orderable on the gallery type', 'i18n', 'hidden'], 1, 'orderable.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['coding'],
        searchTerms: ['inheritance', 'supertype', 'child node', 'orderable', 'gallery', 'extends', 'contains'],
        files: [
          { filename: 'definitions.cnd', language: 'cnd', code: "[lv:gallery] > jnt:content, jmix:multimediaContent orderable\n - jcr:title (string) i18n\n + * (lv:galleryItem)\n\n[lv:galleryItem] > jnt:content, jmix:hiddenType\n - image (weakreference, picker[type='image']) < 'jmix:image'\n - caption (string) i18n\n\n[lv:news] > lv:article\n - breaking (boolean) = false autocreated", highlight: [1, 3, 9], explain: t('Line 1: orderable children. Line 3: any number of gallery items. Line 9: news inherits everything from article.', 'Line 1: orderable children. Line 3: kitne bhi gallery items. Line 9: news article se sab inherit karta hai.') },
        ],
        cmsVsCode: [
          { code: '+ * (lv:galleryItem)', field: { kind: 'children', label: 'Gallery items', value: ['⋮⋮ Sunrise over Pune', '⋮⋮ Team photo'] } },
          { code: '[lv:news] > lv:article', field: { kind: 'text', label: 'Title (inherited)', value: 'Jahia 8.2 released' } },
        ],
        behind: { title: t('View fallback', 'View fallback'), steps: [{ label: 'lv:news', sub: 'no view?' }, { label: 'lv:article', sub: 'article.jsp' }, { label: 'jnt:content', sub: 'fallback' }] },
        challenge: {
          prompt: t('Let a FAQ hold any number of questions.', 'FAQ ko kitne bhi questions rakhne do.'),
          code: '[lv:faq] > jnt:content, jmix:editorialContent orderable\n ____ * (lv:faqItem)',
          options: ['-', '+', '<', '='],
          answer: 1,
          explanation: t('"+" declares child nodes.', '"+" child nodes declare karta hai.'),
        },
      },
    },
    {
      title: 'Lab — Create Your First Content Type (lv:product)',
      difficulty: 'medium',
      tags: ['lab', 'cnd', 'authoring', 'intermediate'],
      explanation: t(
        "The whole chain, for real, with your own type. You will define lv:product, deploy it, enable it, author a product, publish it and see it render. Every later lab follows this exact loop, so do it slowly once.\n\nIf a step fails, do not skip ahead: every failure here is one of the Debugging Lab's ten errors, and finding it now is the cheapest lesson in the course.",
        "Poori chain, sach mein, tumhare apne type ke saath. Tum lv:product define karoge, deploy karoge, enable karoge, ek product author karoge, publish karoge aur render hote dekhoge. Aage har lab yahi loop follow karega, toh ek baar aaram se karo.\n\nKoi step fail ho toh aage mat bhaago: yahan har failure Debugging Lab ke das errors mein se ek hai, aur use abhi pakadna course ka sabse sasta sabak hai."
      ),
      dailyLifeExample: t(
        'Baking your first cake from a recipe: you follow every step exactly once, and after that you can improvise.',
        'Recipe se pehla cake banana: har step ek baar bilkul follow karo, uske baad improvise kar sakte ho.'
      ),
      keyPoints: ['Namespace → type → properties → deploy → enable → author → publish → render', 'A failure here is a Debugging Lab error — fix it now'],
      quiz: [
        q('You deployed lv:product but it is not in "New content". Two most likely causes?', ['Missing i18n and wrong colour', 'Missing a content-category mixin, or module not enabled on the site', 'Browser language', 'GraphQL cache'], 1, 'Droppable mixin + enabled module.'),
      ],
      lesson: {
        kind: 'lab',
        minutes: 40,
        badges: ['lab', 'coding', 'cms'],
        searchTerms: ['lab', 'first content type', 'product', 'lv:product', 'cnd lab'],
        build: {
          text: t('Goal: create this type and take it all the way to the page.', 'Goal: ye type banao aur page tak le jaao.'),
          flow: { steps: ['Deploy', 'Enable', 'Open CMS', 'Add product', 'Fill fields', 'Save', 'Publish', 'Render'] },
        },
        files: [
          { filename: 'definitions.cnd', path: 'lv-news/src/main/resources/META-INF/', language: 'cnd', code: "[lv:product] > jnt:content, jmix:editorialContent\n - title (string) mandatory\n - price (double)\n - isAvailable (boolean)", highlight: [1, 2, 3, 4] },
          { filename: 'product.jsp', path: 'lv-news/src/main/resources/lv_product/html/', language: 'jsp', code: '<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>\n<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>\n<c:set var="p" value="${currentNode.properties}"/>\n<article class="product">\n  <h3>${fn:escapeXml(p[\'title\'].string)}</h3>\n  <p>₹ ${p[\'price\'].double}</p>\n  <c:if test="${p[\'isAvailable\'].boolean}"><span>In stock</span></c:if>\n</article>', highlight: [5, 6, 7], explain: t('One line per property. escapeXml on text you did not write.', 'Har property ki ek line. Jo text tumne nahi likha us pe escapeXml.') },
          { filename: 'lv-news.properties', path: 'lv-news/src/main/resources/resources/', language: 'properties', code: 'lv_product=Product\nlv_product.title=Title\nlv_product.price=Price\nlv_product.isAvailable=Available' },
        ],
        steps: [
          { title: t('Add lv:product to definitions.cnd', 'definitions.cnd mein lv:product add karo') },
          { title: t('Add the default view product.jsp and the labels', 'Default view product.jsp aur labels add karo') },
          { title: t('Deploy', 'Deploy karo'), code: 'mvn clean install jahia:deploy', language: 'bash', filename: 'terminal' },
          { title: t('Confirm lv-news is enabled on the site', 'Confirm karo lv-news site pe enabled hai') },
          { title: t('Open the News page in Page Composer → main area → + Add content → Product', 'News page Page Composer mein kholo → main area → + Add content → Product') },
          { title: t('Fill title "Jahia Handbook", price 499, available ✓ — Save', 'Title "Jahia Handbook", price 499, available ✓ bharo — Save') },
          { title: t('Publish the page', 'Page publish karo') },
          { title: t('Open the live page in a private window', 'Live page private window mein kholo') },
        ],
        expected: {
          checks: ['✓ Namespace created', '✓ Node type created', '✓ Properties created', '✓ Module deployed', '✓ Component enabled', '✓ Content authored', '✓ Content published', '✓ Content rendered'],
        },
        cmsVsCode: [
          { code: '- title (string) mandatory', field: { kind: 'text', label: 'Title', value: 'Jahia Handbook', required: true } },
          { code: '- price (double)', field: { kind: 'decimal', label: 'Price', value: '499' } },
          { code: '- isAvailable (boolean)', field: { kind: 'checkbox', label: 'Available', value: true } },
        ],
        debug: [
          {
            title: t('Product renders as an error box', 'Product error box ki tarah render hota hai'),
            problem: t('No view found for lv:product.', 'lv:product ka view nahi mila.'),
            causes: ['Folder named lv:product instead of lv_product', 'File not under html/', 'Module not redeployed'],
            where: ['src/main/resources/lv_product/html/product.jsp', 'Jahia log'],
            fix: t('Fix the folder name and redeploy.', 'Folder ka naam theek karo aur redeploy karo.'),
            prevention: t('Create the view in the same commit as the type.', 'Type ke saath hi view banao, same commit mein.'),
          },
        ],
        challenge: {
          prompt: t('Price should be exact money. Improve the declaration.', 'Price exact paisa hona chahiye. Declaration sudhaaro.'),
          code: '- price (____) mandatory',
          options: ['string', 'double', 'decimal', 'long'],
          answer: 2,
          explanation: t('decimal avoids floating-point rounding for money.', 'decimal paison ke liye floating-point rounding se bachata hai.'),
        },
      },
    },
  ],
};

/* ═══════════════════ 07 · NODE TYPES ═══════════════════ */

const nodeTypes = {
  title: 'Node Types',
  stage: 7,
  level: 'intermediate',
  estimatedMinutes: 120,
  description: t('Core types you will meet, mixins, media types, and lv:article built field by field.', 'Core types jo milenge, mixins, media types, aur lv:article field-by-field.'),
  concepts: [
    {
      title: 'Core Node Types You Will Meet',
      difficulty: 'medium',
      tags: ['node types', 'jcr', 'cnd', 'intermediate'],
      explanation: t(
        "You will extend and read a small set of Jahia types every day. But first, an honest warning: there is no single universal list of \"all Jahia node types\". Which types exist depends on your Jahia version and on every module installed — modules register their own types, and uninstalling a module removes them. Treat any list, including the Node Types Explorer in this course, as a map of the common ones, and check your own install in the Definitions browser.\n\nThe ones that matter most:\n\n• JCR standard (every JCR): nt:base, mix:referenceable (gives the UUID), mix:title (jcr:title, jcr:description), mix:created / mix:lastModified.\n• Jahia core structure: jnt:virtualsite (a site), jnt:page, jnt:content (the base for all your types), jnt:contentFolder, jnt:contentList, jnt:area, jnt:file, jnt:folder, jnt:user, jnt:group, jnt:category.\n• Jahia core mixins: jmix:droppableContent and the category mixins (jmix:editorialContent, jmix:structuredContent, jmix:multimediaContent), jmix:image, jmix:categorized, jmix:tagged, jmix:hiddenType.\n• Module-provided: jnt:text, jnt:bigText, image and link components — present with the default module, shape may vary.\n• Custom: yours — lv:article and friends.\n\nYou rarely create core types directly; you extend jnt:content and add mixins.",
        "Tum roz Jahia ke kuch types extend karoge aur padhoge. Par pehle, seedhi warning: \"Jahia ke saare node types\" ki koi ek universal list nahi hai. Kaunse types hain ye tumhare Jahia version aur har installed module pe depend karta hai — modules apne types register karte hain, aur module uninstall karo toh wo chale jaate hain. Koi bhi list, is course ka Node Types Explorer samet, common types ka naksha samjho, aur apna install Definitions browser mein check karo.\n\nSabse zaroori:\n\n• JCR standard (har JCR mein): nt:base, mix:referenceable (UUID deta hai), mix:title (jcr:title, jcr:description), mix:created / mix:lastModified.\n• Jahia core structure: jnt:virtualsite (site), jnt:page, jnt:content (tumhare saare types ka base), jnt:contentFolder, jnt:contentList, jnt:area, jnt:file, jnt:folder, jnt:user, jnt:group, jnt:category.\n• Jahia core mixins: jmix:droppableContent aur category mixins (jmix:editorialContent, jmix:structuredContent, jmix:multimediaContent), jmix:image, jmix:categorized, jmix:tagged, jmix:hiddenType.\n• Module-provided: jnt:text, jnt:bigText, image aur link components — default module ke saath, shape alag ho sakta hai.\n• Custom: tumhare — lv:article aur saathi.\n\nCore types seedhe kam hi banate ho; jnt:content extend karke mixins lagate ho."
      ),
      dailyLifeExample: t(
        'Phone apps: every phone has Phone, Messages and Camera (core). Your carrier added a few (module-provided). You installed WhatsApp (custom). Asking "what apps does every phone have?" only makes sense for the first group.',
        'Phone apps: har phone mein Phone, Messages aur Camera (core). Carrier ne kuch daale (module-provided). Tumne WhatsApp daala (custom). "Har phone mein kaunse apps hain?" sirf pehle group ke liye sahi sawaal hai.'
      ),
      keyPoints: ['No universal list — version and modules decide', 'Extend jnt:content, add mixins', 'Know jnt:page, jnt:file, jnt:contentFolder, jmix:image', 'Check your install in the Definitions browser'],
      quiz: [
        q('Why can\'t a course list "all Jahia node types"?', ['There are too many to type', 'Available types depend on version and installed modules', 'Types are secret', 'Types are created by authors'], 1, 'Modules register (and remove) types.'),
        q('Which type do your custom content types usually extend?', ['jnt:page', 'jnt:content', 'nt:unstructured', 'jnt:user'], 1, 'jnt:content is the base for content.'),
        q('Which gives every referenceable node its UUID?', ['mix:title', 'mix:referenceable', 'jmix:image', 'jnt:area'], 1, 'mix:referenceable.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['coding'],
        scope: 'core',
        searchTerms: ['node types', 'jnt:page', 'jnt:content', 'jnt:file', 'jmix', 'core types', 'definitions browser'],
        where: [
          { app: 'Jahia Tools', path: ['Definitions browser'], note: t('The truth for YOUR install.', 'TUMHARE install ka sach.') },
          { app: 'Browser', path: ['/courses/jahia/toolkit/node-types'], note: t('The course\'s explorer, labelled by origin.', 'Course ka explorer, origin ke label ke saath.') },
        ],
        table: {
          title: t('Where types come from', 'Types kahan se aate hain'),
          columns: ['Origin', 'Examples', 'Always present?'],
          rows: [
            ['JCR standard', 'nt:base, mix:referenceable, mix:title', 'Yes'],
            ['Core Jahia', 'jnt:page, jnt:content, jnt:file, jmix:image', 'Yes, in Jahia 8.x'],
            ['Module-provided', 'jnt:text, jnt:bigText, link components', 'Only with that module'],
            ['Custom', 'lv:article, lv:author', 'Only with your module'],
          ],
        },
        challenge: {
          prompt: t('Which type is a site?', 'Site kaunsa type hai?'),
          code: '/sites/learnverse   (____)',
          options: ['jnt:page', 'jnt:virtualsite', 'jnt:folder', 'lv:site'],
          answer: 1,
          explanation: t('Sites are jnt:virtualsite nodes under /sites.', 'Sites /sites ke neeche jnt:virtualsite nodes hain.'),
          language: 'text',
        },
      },
    },
    fromLegacy('Mixins — Adding Behaviour Without Rewriting', {
      codeLanguage: 'cnd',
      tags: ['cnd', 'mixins', 'intermediate'],
      quiz: [
        q('Primary node type vs mixin?', ['Same thing', 'Exactly one primary type (what it is); any number of mixins (what it can also do)', 'Mixins replace the primary type', 'Only pages have mixins'], 1, 'One primary, many mixins.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['coding', 'cms'],
        searchTerms: ['mixin', 'jmix', 'seo', 'extends', 'primary type', 'reuse'],
        cmsVsCode: [
          { code: "[lvmix:seo] mixin\n - seoTitle (string) i18n\n - seoDescription (string, textarea) i18n", field: { kind: 'section', label: 'SEO', value: 'SEO title · SEO description' }, note: t('Its fields appear as a section on every type that uses it.', 'Iske fields har us type pe section ki tarah aate hain jo ise use kare.') },
          { code: "[lvmix:sponsored] mixin\n extends = lv:article\n - sponsor (string)", field: { kind: 'toggle-section', label: 'Sponsored', value: false }, note: t('Offered on lv:article as an optional section (presentation varies by version).', 'lv:article pe optional section ki tarah offer (presentation version pe depend).') },
        ],
        views: {
          author: { text: t('Author sees an extra "SEO" section on articles and pages alike.', 'Author ko articles aur pages dono pe extra "SEO" section dikhta hai.') },
          developer: { text: t('Developer declares the fields once and adds the mixin to types.', 'Developer fields ek baar declare karke types pe mixin lagata hai.'), code: '[lv:article] > jnt:content, jmix:editorialContent, lvmix:seo', language: 'cnd', filename: 'definitions.cnd' },
          jcr: { text: t('The node lists the mixin in jcr:mixinTypes and carries its properties.', 'Node jcr:mixinTypes mein mixin list karta hai aur uski properties rakhta hai.'), code: 'jcr:primaryType = lv:article\njcr:mixinTypes  = [lvmix:seo]\nseoTitle        = "Learn Jahia in Hinglish"', language: 'text' },
        },
        challenge: {
          prompt: t('Declare a reusable bundle of fields.', 'Fields ka reusable bundle declare karo.'),
          code: '[lvmix:seo] ____\n - seoTitle (string) i18n',
          options: ['mixin', 'orderable', 'abstract', 'mandatory'],
          answer: 0,
          explanation: t('"mixin" makes it a mixin rather than a primary type.', '"mixin" ise primary type ki jagah mixin banata hai.'),
        },
      },
    }),
    {
      title: 'How Images Work in Jahia',
      difficulty: 'medium',
      tags: ['media', 'images', 'cnd', 'authoring', 'cms', 'intermediate'],
      explanation: t(
        "An image in Jahia is always three layers, and most image bugs come from mixing them up.\n\nAUTHOR layer: the author uploads a file to Media once, then in an article clicks \"Select image\" and picks it. They see a thumbnail in the form.\n\nJCR layer: the uploaded file is a node — jnt:file with the jmix:image mixin — under /sites/<site>/files. Its bytes sit in a jcr:content child. The article does NOT contain the image; its image property holds the file node's UUID (a weakreference).\n\nDEVELOPER layer: the CND declares - image (weakreference, picker[type='image']) < 'jmix:image'. The view follows the reference to the file node, builds its URL (/files/live/sites/<site>/files/…), guards for a missing target, and writes an <img> with alt text.\n\nConsequences worth remembering: replace the file in Media and every article shows the new image; delete it and your view must cope; publish it, or visitors get a broken image even though the article is live.",
        "Jahia mein image hamesha teen layers hoti hai, aur zyaada image bugs inhe mix karne se aate hain.\n\nAUTHOR layer: author file ek baar Media mein upload karta hai, phir article mein \"Select image\" dabake use chunta hai. Form mein thumbnail dikhta hai.\n\nJCR layer: upload ki gayi file ek node hai — jnt:file jisme jmix:image mixin — /sites/<site>/files ke neeche. Uske bytes jcr:content child mein. Article ke andar image NAHI hai; uski image property file node ka UUID rakhti hai (weakreference).\n\nDEVELOPER layer: CND declare karti hai - image (weakreference, picker[type='image']) < 'jmix:image'. View reference follow karke file node tak jaata hai, uska URL banata hai (/files/live/sites/<site>/files/…), missing target ke liye guard lagata hai, aur alt text ke saath <img> likhta hai.\n\nYaad rakhne layak nateeje: Media mein file badlo toh har article nayi image dikhayega; delete karo toh view ko sambhalna hoga; publish karo, warna article live hote hue bhi visitors ko tooti image milegi."
      ),
      dailyLifeExample: t(
        'A photo on your phone and a WhatsApp group. The photo lives once in your gallery (Media). When you "share" it in five groups, the phone does not copy the photo five times in its own head — it points at the same file. Delete it from the gallery and those shares can no longer open it.',
        'Phone ki photo aur WhatsApp group socho. Photo gallery mein ek baar hai (Media). Paanch groups mein "share" karo toh phone apne andar paanch copies nahi banata — usi file ko point karta hai. Gallery se delete karo toh wo shares khul nahi paate.'
      ),
      keyPoints: ['Author picks, JCR stores a UUID, view resolves it', 'Constrain to jmix:image', 'Guard for a missing target', 'Publish the image too'],
      quiz: [
        q('What does the article\'s image property actually store?', ['The image bytes', 'A URL string', 'The UUID of the image file node', 'A base64 thumbnail'], 2, 'A weakreference stores the target UUID.'),
        q('Which constraint stops authors picking a PDF in an image field?', ["< 'jnt:page'", "< 'jmix:image'", 'mandatory', 'i18n'], 1, 'Image files carry jmix:image.'),
        q('The <img> src is empty on the live site. Which is NOT a likely cause?', ['Image unpublished', 'View prints the UUID instead of resolving the node', 'The article has i18n on its title', 'Target deleted and no guard'], 2, 'i18n on the title has nothing to do with the image.'),
      ],
      interviewQuestions: [
        iq({
          question: 'Walk me through how an image gets from an author to the page in Jahia.',
          difficulty: 'medium',
          short: t('The author uploads to Media and picks it in a weakreference image field; the JCR stores the file node\'s UUID on the content; the view resolves the reference, builds the file URL and renders an <img>.', 'Author Media mein upload karke weakreference image field mein chunta hai; JCR content pe file node ka UUID store karta hai; view reference resolve karke file URL banata hai aur <img> render karta hai.'),
          deep: t('Because content references the file, one upload is reused everywhere and replacing it updates every usage. Weak references allow deletion, so the view must null-check. Publication is separate for the file, and the fragment cache should declare the file as a dependency so a replaced image is not served stale.', 'Content file ko reference karta hai, isliye ek upload har jagah reuse hota hai aur badalne se har usage update. Weak references deletion allow karte hain, toh view ko null-check karna hai. File ki publication alag hai, aur fragment cache ko file ko dependency declare karni chahiye taaki badli hui image stale serve na ho.'),
          code: { code: "<c:set var=\"img\" value=\"${currentNode.properties['image'].node}\"/>\n<c:if test=\"${not empty img}\"><img src=\"${img.url}\" alt=\"...\"/></c:if>" },
          tip: t('Say all three layers: author, JCR, developer.', 'Teeno layers bolo: author, JCR, developer.'),
        }),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 25,
        badges: ['coding', 'cms', 'hands-on'],
        searchTerms: ['image', 'images', 'media', 'picker', 'jmix:image', 'img', 'thumbnail', 'image reference', 'image selector'],
        views: {
          author: { text: t('Author sees this:', 'Author ko ye dikhta hai:'), field: { kind: 'picker-image', label: 'Image', value: 'Select image' } },
          developer: { text: t('Developer sees this:', 'Developer ko ye dikhta hai:'), code: "- image (weakreference, picker[type='image']) < 'jmix:image'", language: 'cnd', filename: 'definitions.cnd' },
          jcr: { text: t('JCR stores this:', 'JCR ye store karta hai:'), code: 'welcome (lv:article)\n  image = 9b1e…77a  ──→  /sites/learnverse/files/images/hero.jpg\n                          (jnt:file + jmix:image)\n                          └── jcr:content  jcr:data, jcr:mimeType=image/jpeg', language: 'text' },
        },
        screenshots: [
          shot({
            src: '/images/jahia/content-editor/content-editor-image-field.png',
            title: t('The image field in the Content Editor', 'Content Editor mein image field'),
            description: t('Empty, then with an image chosen.', 'Khaali, phir image chunne ke baad.'),
            mock: {
              app: 'Content Editor',
              breadcrumb: ['contents', 'articles', 'welcome'],
              toolbar: [{ label: 'Save', primary: true }],
              panel: 'form',
              formTitle: 'Article',
              fields: [
                { label: 'Image', kind: 'picker-image', value: 'Select image', marker: 1 },
                { label: 'Image (chosen)', kind: 'picker-image', value: 'hero-welcome.jpg · 1600×900', marker: 2 },
              ],
            },
            markers: [t('Opens the media browser filtered to images', 'Images tak filtered media browser kholta hai'), t('Stores a reference; shows a thumbnail', 'Reference store karta hai; thumbnail dikhata hai')],
          }),
        ],
        files: [
          { filename: 'article.jsp', path: 'lv-news/src/main/resources/lv_article/html/', language: 'jsp', code: '<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>\n<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>\n<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>\n\n<c:set var="img" value="${currentNode.properties[\'image\'].node}"/>\n<c:if test="${not empty img}">\n  <template:addCacheDependency node="${img}"/>\n  <img src="${img.url}"\n       alt="${fn:escapeXml(currentNode.properties[\'jcr:title\'].string)}"\n       loading="lazy"/>\n</c:if>', highlight: [5, 6, 7, 8], explain: t('5: follow the reference. 6: guard. 7: re-render when the image changes. 8: the file URL.', '5: reference follow karo. 6: guard. 7: image badle toh dobara render. 8: file URL.') },
          { filename: 'Article.server.tsx (JavaScript module equivalent)', language: 'tsx', code: "// Illustrative — check the exact API of your javascript-modules version.\nexport default function Article({ currentNode }) {\n  const img = currentNode.hasProperty('image')\n    ? currentNode.getProperty('image').getNode()\n    : null;\n  return (\n    <article>\n      {img && <img src={img.getUrl()} alt={currentNode.getDisplayableName()} />}\n    </article>\n  );\n}", highlight: [3, 4, 5, 8] },
        ],
        behind: { title: t('Image: CND to frontend', 'Image: CND se frontend tak'), steps: ['CND weakreference', 'Image picker', 'Author selects hero.jpg', 'UUID stored', 'View resolves node', '<img src>'] },
        expected: { checks: ['✓ Image picker in the form', '✓ Thumbnail after choosing', '✓ <img> in the page', '✓ Image loads for an anonymous visitor'] },
        debug: [
          {
            title: t('Image isn\'t rendering', 'Image render nahi ho rahi'),
            problem: t('Broken image or empty src.', 'Tooti image ya khaali src.'),
            causes: ['Printing the UUID instead of the node URL', 'Image unpublished', 'Target deleted with no guard', 'Visitor lacks read permission on the file'],
            where: ['DevTools → Network', 'jContent → Media status', 'The view'],
            fix: t('Resolve .node, use its url, guard for null, publish the image.', '.node resolve karo, uska url use karo, null guard lagao, image publish karo.'),
            prevention: t('Publish with references; always guard.', 'References ke saath publish karo; hamesha guard.'),
          },
        ],
        challenge: {
          prompt: t('What must the view use to get a loadable URL?', 'Loadable URL ke liye view kya use kare?'),
          code: "<img src=\"${currentNode.properties['image'].____.url}\"/>",
          options: ['string', 'node', 'uuid', 'path'],
          answer: 1,
          explanation: t('.node follows the reference to the file node, which has the url.', '.node reference follow karke file node tak jaata hai, jiske paas url hai.'),
          language: 'jsp',
        },
      },
    },
    {
      title: 'Video, PDF, Audio, Links — Every Other Media',
      difficulty: 'medium',
      tags: ['media', 'cnd', 'authoring', 'cms', 'intermediate'],
      explanation: t(
        "Once images make sense, every other kind of media follows the same pattern with small differences.\n\nVIDEO: either an uploaded file (a jnt:file with a video MIME type, referenced through a file picker) or an external URL (YouTube/Vimeo, stored as a string). Many projects model both in one lv:video type with a poster image. There is no single core \"video component\" you can rely on across every install — video components are usually module-provided or custom, so treat them as such.\n\nPDF / DOCUMENTS / AUDIO: uploaded files referenced with picker[type='file'] < 'jnt:file'. The view decides the presentation: a download link with file size, an embedded viewer, or an <audio> player.\n\nINTERNAL LINK: a weakreference to a jnt:page with a page picker — survives renames. EXTERNAL LINK: a string URL, ideally validated with a regex constraint.\n\nTEXT and RICH TEXT: string, and string with richtext.\n\nThe rule: if it lives in Jahia, reference it; if it lives outside, store the URL.",
        "Images samajh aa gayi toh baaki har media wahi pattern follow karta hai, chhote farak ke saath.\n\nVIDEO: ya toh uploaded file (video MIME type wala jnt:file, file picker se referenced) ya external URL (YouTube/Vimeo, string mein). Kai projects dono ek lv:video type mein poster image ke saath rakhte hain. Har install mein bharosa karne layak ek core \"video component\" nahi hai — video components aam taur pe module-provided ya custom hote hain, unhe waise hi samjho.\n\nPDF / DOCUMENTS / AUDIO: picker[type='file'] < 'jnt:file' se referenced uploaded files. Presentation view decide karta hai: file size ke saath download link, embedded viewer, ya <audio> player.\n\nINTERNAL LINK: page picker ke saath jnt:page ka weakreference — rename jhel leta hai. EXTERNAL LINK: string URL, ho sake toh regex constraint se validated.\n\nTEXT aur RICH TEXT: string, aur richtext wala string.\n\nRule: jo Jahia mein rehta hai use reference karo; jo bahar rehta hai uska URL store karo."
      ),
      dailyLifeExample: t(
        'A college notice board: some notices are pinned papers (files in Media), some just say "see the website at …" (external URLs), and some say "see notice #14" (internal references). You treat each differently, but they all sit on the same board.',
        'College ka notice board: kuch notices pinned papers hain (Media mein files), kuch bas kehte hain "website dekho …" (external URLs), aur kuch kehte hain "notice #14 dekho" (internal references). Har ek alag treat hota hai, par sab ek hi board pe.'
      ),
      keyPoints: ['Files in Jahia → references; outside → URL strings', 'Video: file reference or external URL, usually custom/module type', 'Internal links as page references', 'The view decides presentation'],
      quiz: [
        q('A brochure PDF uploaded to Media should be stored on the content as…', ['A string URL', "A weakreference with picker[type='file'] < 'jnt:file'", 'A boolean', 'binary'], 1, 'Reference files that live in Jahia.'),
        q('Why is an internal link better as a page reference than a typed URL?', ['It is shorter', 'It survives the page being renamed or moved', 'It is faster to type', 'URLs are not allowed'], 1, 'UUIDs survive moves.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 25,
        badges: ['coding', 'cms'],
        scope: 'custom',
        searchTerms: ['video', 'pdf', 'audio', 'document', 'file', 'link', 'external url', 'media', 'download'],
        table: {
          title: t('Content · Author sees · Developer uses', 'Content · Author ko dikhta · Developer use karta'),
          columns: ['Content', 'Author sees', 'Developer uses'],
          rows: [
            ['Image', 'Image picker', "weakreference < 'jmix:image'"],
            ['Video (file)', 'Video/media selector', "weakreference < 'jnt:file'"],
            ['Video (external)', 'URL text field', 'string'],
            ['PDF / document', 'File picker', "weakreference < 'jnt:file'"],
            ['Audio', 'File picker', "weakreference < 'jnt:file'"],
            ['Internal link', 'Page / link selector', "weakreference < 'jnt:page'"],
            ['External URL', 'Text field', "string < '^https?://.+'"],
            ['Text', 'Text field', 'string'],
            ['Rich text', 'Rich editor', 'string, richtext'],
          ],
        },
        files: [
          { filename: 'definitions.cnd', language: 'cnd', code: "[lv:video] > jnt:content, jmix:multimediaContent\n - jcr:title (string) i18n\n - file (weakreference, picker[type='file']) < 'jnt:file'\n - externalUrl (string) < '^https://.+'\n - poster (weakreference, picker[type='image']) < 'jmix:image'\n\n[lv:download] > jnt:content, jmix:editorialContent\n - label (string) i18n mandatory\n - document (weakreference, picker[type='file']) < 'jnt:file'", highlight: [3, 4], explain: t('A video is either a file (line 3) or an external URL (line 4). The view prefers the file.', 'Video ya toh file (line 3) ya external URL (line 4). View file ko pehle leta hai.') },
          { filename: 'video.jsp', path: 'lv-news/src/main/resources/lv_video/html/', language: 'jsp', code: '<c:set var="f" value="${currentNode.properties[\'file\'].node}"/>\n<c:set var="poster" value="${currentNode.properties[\'poster\'].node}"/>\n<c:choose>\n  <c:when test="${not empty f}">\n    <video controls preload="metadata" poster="${poster.url}">\n      <source src="${f.url}"/>\n    </video>\n  </c:when>\n  <c:when test="${not empty currentNode.properties[\'externalUrl\']}">\n    <a href="${fn:escapeXml(currentNode.properties[\'externalUrl\'].string)}">Watch video</a>\n  </c:when>\n</c:choose>', highlight: [4, 9] },
        ],
        cmsVsCode: [
          { code: "- file (weakreference, picker[type='file']) < 'jnt:file'", field: { kind: 'picker-file', label: 'Video file', value: 'intro-to-jahia.mp4' } },
          { code: "- externalUrl (string) < '^https://.+'", field: { kind: 'text', label: 'External URL', value: 'https://www.youtube.com/watch?v=…' } },
          { code: "- ctaTarget (weakreference, picker[type='page']) < 'jnt:page'", field: { kind: 'picker-page', label: 'Links to page', value: 'Home › News' } },
        ],
        challenge: {
          prompt: t('Store a PDF that lives in Media.', 'Media mein rehne wala PDF store karo.'),
          code: "- brochure (weakreference, picker[type='____']) < 'jnt:file'",
          options: ['image', 'file', 'page', 'user'],
          answer: 1,
          explanation: t('Documents use the file picker.', 'Documents file picker use karte hain.'),
        },
      },
    },
    {
      title: 'Project — Build lv:article Field by Field',
      difficulty: 'medium',
      tags: ['project', 'cnd', 'intermediate'],
      explanation: t(
        "Phases 3 to 9 of the News Portal. You grow lv:article one property at a time, deploying after each step and opening the Content Editor to see the field appear. It is slower than writing the whole type at once, and that is the point: you will see exactly which line produced which field, and a mistake shows up in the step that caused it.\n\nOrder: the type itself, title, description (summary), image, rich text body, category (via jmix:categorized), author (a reference to a new lv:author type). Then you have the model the rest of the course renders, queries, translates, caches and publishes.",
        "News Portal ke Phase 3 se 9. Tum lv:article ko ek-ek property karke badhaoge, har step ke baad deploy karke Content Editor mein field aate dekhoge. Poora type ek saath likhne se dheema hai, aur yahi point hai: tumhe bilkul dikhega kis line ne kaunsa field banaya, aur galti usi step mein dikhegi jisne ki.\n\nOrder: type khud, title, description (summary), image, rich text body, category (jmix:categorized se), author (naye lv:author type ka reference). Phir tumhare paas wo model hoga jise baaki course render, query, translate, cache aur publish karega."
      ),
      dailyLifeExample: t(
        'Building a house floor by floor and inspecting each floor before adding the next, rather than inspecting only when the whole building is finished.',
        'Ghar manzil-dar-manzil banana aur agli se pehle har manzil check karna, na ki poori building banne ke baad hi check karna.'
      ),
      keyPoints: ['One property per deploy', 'Check the Content Editor after each step', 'References need the target type first (lv:author)'],
      quiz: [
        q('You add - author (weakreference) < \'lv:author\' before defining lv:author. What happens?', ['Works fine', 'The CND fails to load because lv:author is unknown', 'Author becomes a string', 'Nothing appears'], 1, 'Constraint types must exist.'),
        q('Which adds a category picker to lv:article?', ['jmix:image', 'jmix:categorized', 'jmix:hiddenType', 'mix:title'], 1, 'jmix:categorized.'),
      ],
      lesson: {
        kind: 'project',
        minutes: 45,
        badges: ['project', 'coding', 'cms'],
        scope: 'custom',
        searchTerms: ['project', 'lv:article', 'phase 3', 'article type', 'build article', 'lv:author'],
        build: {
          text: t('Blog/news article, the way the spec describes it:', 'Blog/news article, jaise spec kehta hai:'),
          flow: { steps: ['Jahia Studio', 'META-INF', 'definitions.cnd', 'Create lv:article', 'Add title', 'Add description', 'Add image', 'Deploy module', 'Open Jahia CMS', 'Enable component', 'Create Article', 'Author fills fields', 'Save', 'Publish', 'Render article'] },
        },
        steps: [
          { title: t('Phase 3 — the type', 'Phase 3 — type'), code: '[lv:article] > jnt:content, jmix:editorialContent', language: 'cnd', filename: 'definitions.cnd' },
          { title: t('Phase 4 — title', 'Phase 4 — title'), code: ' - jcr:title (string) i18n mandatory', language: 'cnd', filename: 'definitions.cnd' },
          { title: t('Phase 5 — description', 'Phase 5 — description'), code: ' - summary (string, textarea) i18n', language: 'cnd', filename: 'definitions.cnd' },
          { title: t('Phase 6 — image reference', 'Phase 6 — image reference'), code: " - image (weakreference, picker[type='image']) < 'jmix:image'", language: 'cnd', filename: 'definitions.cnd' },
          { title: t('Phase 7 — rich text', 'Phase 7 — rich text'), code: ' - body (string, richtext) i18n', language: 'cnd', filename: 'definitions.cnd' },
          { title: t('Phase 8 — category', 'Phase 8 — category'), code: '[lv:article] > jnt:content, jmix:editorialContent, jmix:categorized', language: 'cnd', filename: 'definitions.cnd' },
          { title: t('Phase 9 — author (define lv:author first)', 'Phase 9 — author (pehle lv:author define karo)'), code: "[lv:author] > jnt:content, jmix:structuredContent\n - name (string) mandatory\n - photo (weakreference, picker[type='image']) < 'jmix:image'\n - bio (string, textarea) i18n\n\n// then on lv:article:\n - author (weakreference) < 'lv:author'", language: 'cnd', filename: 'definitions.cnd' },
          { title: t('After every phase: deploy and open "New content → Article"', 'Har phase ke baad: deploy karo aur "New content → Article" kholo') },
        ],
        files: [
          { filename: 'definitions.cnd — end of phase 9', path: 'lv-news/src/main/resources/META-INF/', language: 'cnd', code: "<jnt = 'http://www.jahia.org/jahia/nt/1.0'>\n<jmix = 'http://www.jahia.org/jahia/mix/1.0'>\n<lv = 'http://learnverse.dev/jahia/nt/1.0'>\n\n[lv:author] > jnt:content, jmix:structuredContent\n - name (string) mandatory\n - role (string) i18n\n - photo (weakreference, picker[type='image']) < 'jmix:image'\n - bio (string, textarea) i18n\n\n[lv:article] > jnt:content, jmix:editorialContent, jmix:categorized, jmix:tagged\n - jcr:title (string) i18n mandatory\n - summary (string, textarea) i18n\n - image (weakreference, picker[type='image']) < 'jmix:image'\n - body (string, richtext) i18n\n - author (weakreference) < 'lv:author'\n - publishedDate (date, datepicker)\n - related (weakreference) multiple < 'lv:article'\n - isFeatured (boolean) = false autocreated", highlight: [12, 13, 14, 15, 16] },
        ],
        cmsVsCode: [
          { code: '- jcr:title (string) i18n mandatory', field: { kind: 'text', label: 'Title', value: 'Welcome to Learnverse', required: true, i18n: true } },
          { code: '- summary (string, textarea) i18n', field: { kind: 'textarea', label: 'Summary', value: 'Why we built a news portal on Jahia.' } },
          { code: "- image (weakreference, picker[type='image']) < 'jmix:image'", field: { kind: 'picker-image', label: 'Image', value: 'hero-welcome.jpg' } },
          { code: '- body (string, richtext) i18n', field: { kind: 'richtext', label: 'Body', value: 'Jahia stores <b>every</b> page as a node…' } },
          { code: 'jmix:categorized', field: { kind: 'category', label: 'Categories', value: ['Technology'] } },
          { code: "- author (weakreference) < 'lv:author'", field: { kind: 'picker-content', label: 'Author', value: 'Priya Sharma' } },
        ],
        expected: { checks: ['✓ lv:article in New content', '✓ Six fields in the form', '✓ lv:author exists', '✓ Author picker only offers authors'] },
        challenge: {
          prompt: t('Complete the article\'s author field.', 'Article ki author field poori karo.'),
          code: "- author (weakreference) < '____'",
          options: ['jnt:user', 'lv:author', 'jmix:image', 'jnt:page'],
          answer: 1,
          explanation: t('The constraint names the custom author type.', 'Constraint custom author type ka naam leta hai.'),
        },
      },
    },
  ],
};

/* ═══════════════════ 08 · COMPONENTS ═══════════════════ */

const components = {
  title: 'Components',
  stage: 8,
  level: 'intermediate',
  estimatedMinutes: 75,
  description: t('Turning types into things authors can drop on pages, and reading content inside them.', 'Types ko aisi cheez banana jo authors page pe drop kar sakein, aur unke andar content padhna.'),
  concepts: [
    {
      title: 'From Node Type to Component — Making It Droppable',
      difficulty: 'medium',
      tags: ['components', 'cnd', 'authoring', 'intermediate'],
      explanation: t(
        "A node type becomes a COMPONENT — something an author can find in \"New content\" and drop into an area — when four things are true.\n\n1. It is DROPPABLE: it carries jmix:droppableContent, usually through a category mixin such as jmix:editorialContent, jmix:structuredContent or jmix:multimediaContent. The category also decides which group of the picker it appears in.\n2. It has LABELS: a human name and field labels in the module's resource bundle, so authors see \"Article\", not lv_article.\n3. It has a VIEW: at least a default view, or the author drops it and sees an error.\n4. Its MODULE IS ENABLED on the site.\n\nAnd a fifth that is easy to forget: the TEMPLATE AREA must allow it. Areas can restrict which types they accept; if yours is not on the list it will not be offered there.\n\nTypes that should never be dropped on their own (a gallery item, an FAQ answer) do the opposite: jmix:hiddenType keeps them out of the picker while still usable as children.",
        "Node type COMPONENT tab banta hai — aisi cheez jo author \"New content\" mein dhoondh ke area mein drop kar sake — jab chaar baatein sach hon.\n\n1. DROPPABLE ho: jmix:droppableContent ho, aam taur pe category mixin jaise jmix:editorialContent, jmix:structuredContent ya jmix:multimediaContent ke through. Category ye bhi decide karti hai picker ke kis group mein dikhega.\n2. LABELS hon: module ke resource bundle mein insaani naam aur field labels, taaki authors ko \"Article\" dikhe, lv_article nahi.\n3. VIEW ho: kam se kam default view, warna author drop karega aur error dekhega.\n4. MODULE site pe ENABLED ho.\n\nAur paanchvi jo bhoolna aasaan hai: TEMPLATE AREA use allow kare. Areas restrict kar sakte hain kaunse types accept karein; tumhara list mein nahi toh wahan offer nahi hoga.\n\nJo types akele kabhi drop nahi hone chahiye (gallery item, FAQ answer) wo ulta karte hain: jmix:hiddenType unhe picker se bahar rakhta hai par children ki tarah use hote rehte hain."
      ),
      dailyLifeExample: t(
        'A product in a supermarket needs to be manufactured (type), labelled (labels), packed so it can be sold (view), stocked at this branch (module enabled), and allowed on this shelf (area). Miss any one and the customer cannot pick it up.',
        'Supermarket mein product ko banana (type), label lagana (labels), bechne layak pack karna (view), is branch mein stock (module enabled), aur is shelf pe allowed (area) hona chahiye. Ek bhi chhoota toh customer utha nahi sakta.'
      ),
      keyPoints: ['Droppable via a category mixin', 'Labels in the resource bundle', 'A default view', 'Module enabled; area allows it', 'jmix:hiddenType for child-only types'],
      quiz: [
        q('Component doesn\'t appear in the CMS. Which is NOT one of the usual causes?', ['No category/droppable mixin', 'Module not enabled on the site', 'The area restricts types', 'The title property is i18n'], 3, 'i18n on a property does not affect the picker.'),
        q('How do you keep lv:galleryItem out of "New content"?', ['Delete its view', 'Add jmix:hiddenType', 'Remove its namespace', 'Make it mandatory'], 1, 'jmix:hiddenType.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['coding', 'cms'],
        searchTerms: ['component', 'droppable', 'jmix:droppableContent', 'editorialContent', 'new content', 'picker', 'enable module', 'labels'],
        screenshots: [
          shot({
            src: '/images/jahia/authoring/new-content-picker.png',
            title: t('"New content" — where your component must appear', '"New content" — jahan tumhara component dikhna chahiye'),
            description: t('Grouped by the category mixin; named by the resource bundle.', 'Category mixin se grouped; resource bundle se named.'),
            mock: {
              app: 'Page Composer',
              breadcrumb: ['Home', 'main', 'New content'],
              panel: 'list',
              items: [
                { label: 'Editorial content', meta: 'group', marker: 1 },
                { label: '   Article', meta: 'lv:article', active: true, marker: 2 },
                { label: '   Hero', meta: 'lv:hero' },
                { label: 'Multimedia', meta: 'group' },
                { label: '   Video', meta: 'lv:video' },
                { label: 'Structured content', meta: 'group' },
                { label: '   Author', meta: 'lv:author' },
              ],
            },
            markers: [t('Group from the category mixin', 'Category mixin se group'), t('Name from lv-news.properties', 'lv-news.properties se naam')],
          }),
        ],
        cmsVsCode: [
          { code: '[lv:hero] > jnt:content, jmix:editorialContent', field: { kind: 'type', label: 'Hero', value: 'Editorial content → Hero' } },
          { code: '[lv:galleryItem] > jnt:content, jmix:hiddenType', field: { kind: 'hidden', label: 'Gallery item' }, note: t('Not in the picker; created inside a gallery.', 'Picker mein nahi; gallery ke andar banta hai.') },
        ],
        where: [
          { app: 'Module source', path: ['META-INF', 'definitions.cnd'], note: t('Category mixin.', 'Category mixin.') },
          { app: 'Module source', path: ['resources', 'lv-news.properties'], note: t('Labels.', 'Labels.') },
          { app: 'Administration', path: ['Sites', 'learnverse', 'Modules'], note: t('Enabled?', 'Enabled?') },
        ],
        debug: [
          {
            title: t('Component doesn\'t appear in the CMS', 'Component CMS mein nahi dikh raha'),
            problem: t('Type deployed, missing from New content.', 'Type deploy hua, New content mein gayab.'),
            causes: ['No droppable/category mixin', 'Module not enabled on this site', 'Area restrictions', 'jmix:hiddenType'],
            where: ['definitions.cnd supertype line', 'Site → Modules', 'Template area settings'],
            fix: t('Add jmix:editorialContent, enable lv-news, redeploy, reopen the editor.', 'jmix:editorialContent add karo, lv-news enable karo, redeploy karo, editor dobara kholo.'),
            prevention: t('New-type checklist: mixin, labels, view, enabled.', 'Naye type ki checklist: mixin, labels, view, enabled.'),
          },
        ],
        challenge: {
          prompt: t('Make lv:hero appear under Editorial content.', 'lv:hero ko Editorial content mein dikhao.'),
          code: '[lv:hero] > jnt:content, ____',
          options: ['jmix:hiddenType', 'jmix:editorialContent', 'mix:referenceable', 'jnt:page'],
          answer: 1,
          explanation: t('The category mixin makes it droppable and groups it.', 'Category mixin use droppable banata aur group karta hai.'),
        },
      },
    },
    fromLegacy('Fetching Content Inside a Component', {
      codeLanguage: 'tsx',
      tags: ['components', 'react', 'intermediate'],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['coding'],
        searchTerms: ['fetch', 'children', 'query', 'component data', 'server component', 'jsp', 'list'],
        files: [
          { filename: 'articleList.jsp (JSP equivalent)', path: 'lv-news/src/main/resources/lv_articleList/html/', language: 'jsp', code: '<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>\n<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>\n<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>\n\n<%-- children of type lv:article, rendered with their "card" view --%>\n<jcr:nodeProperty node="${currentNode}" name="jcr:title" var="title"/>\n<h2>${title.string}</h2>\n<c:forEach items="${jcr:getChildrenOfType(currentNode, \'lv:article\')}" var="a" end="11">\n  <template:module node="${a}" view="card"/>\n</c:forEach>', highlight: [8, 9], explain: t('Line 9 renders each child with its own view — the list does not know how an article looks. Tag names follow the classic Jahia taglibs; confirm against your version.', 'Line 9 har child ko uske apne view se render karti hai — list ko nahi pata article kaisa dikhta hai. Tag names classic Jahia taglibs ke hisaab se; apne version mein confirm karo.') },
        ],
      },
    }),
    {
      title: 'Project — The Article Card Component',
      difficulty: 'medium',
      tags: ['project', 'components', 'views', 'intermediate'],
      explanation: t(
        "Phases 10 and 11. lv:article becomes a real component with two faces: the DEFAULT view (the full article on its own page) and a CARD view (image, title, summary, author — for lists). You also build lv:articleList, a component that shows the latest articles from a folder, each rendered with the card view.\n\nThis is the pattern you will use constantly: one type, several views; containers render their items with a named view and never duplicate an item's markup.",
        "Phase 10 aur 11. lv:article do chehron wala asli component banta hai: DEFAULT view (apne page pe poora article) aur CARD view (image, title, summary, author — lists ke liye). Tum lv:articleList bhi banaoge, jo ek folder ke latest articles dikhata hai, har ek card view se.\n\nYe wo pattern hai jo baar-baar use hoga: ek type, kai views; containers apne items ko named view se render karte hain aur item ka markup kabhi duplicate nahi karte."
      ),
      dailyLifeExample: t(
        'A film has a poster (card view) and the full movie (default view). The cinema listing shows posters; you only see the full movie when you choose one.',
        'Film ka ek poster hai (card view) aur poori movie (default view). Cinema listing mein posters dikhte hain; poori movie tab dekhte ho jab ek chuno.'
      ),
      keyPoints: ['One type, many views', 'Containers render items with a named view', 'Card view: image, title, summary, author'],
      quiz: [
        q('Where is the card view file for lv:article?', ['lv_article/html/article.card.jsp', 'lv_article/card.jsp', 'META-INF/card.jsp', 'lv:article/html/card'], 0, '<type folder>/html/<name>.<view>.jsp.'),
      ],
      lesson: {
        kind: 'project',
        minutes: 40,
        badges: ['project', 'coding'],
        scope: 'custom',
        searchTerms: ['project', 'article card', 'card view', 'article list', 'phase 10', 'phase 11', 'component'],
        build: { text: t('An Article Card, and a list that renders cards.', 'Ek Article Card, aur ek list jo cards render kare.'), flow: { steps: ['lv:article', { label: 'default view', sub: 'article.jsp' }, { label: 'card view', sub: 'article.card.jsp' }, { label: 'lv:articleList', sub: 'renders cards' }] } },
        files: [
          { filename: 'article.card.jsp', path: 'lv-news/src/main/resources/lv_article/html/', language: 'jsp', code: '<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>\n<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>\n<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>\n<c:set var="p" value="${currentNode.properties}"/>\n<c:set var="img" value="${p[\'image\'].node}"/>\n<c:set var="author" value="${p[\'author\'].node}"/>\n<a class="lv-card" href="${currentNode.url}">\n  <c:if test="${not empty img}">\n    <template:addCacheDependency node="${img}"/>\n    <img src="${img.url}" alt="" loading="lazy"/>\n  </c:if>\n  <h3>${fn:escapeXml(p[\'jcr:title\'].string)}</h3>\n  <p>${fn:escapeXml(p[\'summary\'].string)}</p>\n  <c:if test="${not empty author}">\n    <template:addCacheDependency node="${author}"/>\n    <span>${fn:escapeXml(author.properties[\'name\'].string)}</span>\n  </c:if>\n</a>', highlight: [5, 6, 9, 15], explain: t('References resolved and guarded; each referenced node declared as a cache dependency (module 15 explains why).', 'References resolve aur guard kiye; har referenced node cache dependency declare (module 15 batayega kyun).') },
          { filename: 'definitions.cnd', language: 'cnd', code: "[lv:articleList] > jnt:content, jmix:editorialContent\n - jcr:title (string) i18n\n - folder (weakreference) < 'jnt:contentFolder'\n - limit (long) = 6 autocreated < '[1, 24]'", highlight: [3, 4] },
          { filename: 'articleList.jsp', path: 'lv-news/src/main/resources/lv_articleList/html/', language: 'jsp', code: '<c:set var="folder" value="${currentNode.properties[\'folder\'].node}"/>\n<c:if test="${not empty folder}">\n  <template:addCacheDependency node="${folder}"/>\n  <div class="lv-grid">\n    <c:forEach items="${jcr:getChildrenOfType(folder, \'lv:article\')}" var="a"\n               end="${currentNode.properties[\'limit\'].long - 1}">\n      <template:module node="${a}" view="card"/>\n    </c:forEach>\n  </div>\n</c:if>', highlight: [7] },
        ],
        steps: [
          { title: t('Add article.card.jsp', 'article.card.jsp add karo') },
          { title: t('Define lv:articleList and its view', 'lv:articleList aur uska view define karo') },
          { title: t('Add labels for both types', 'Dono types ke labels add karo') },
          { title: t('Deploy; on Home, add an Article list pointing at contents/articles', 'Deploy karo; Home pe contents/articles ko point karti Article list add karo') },
        ],
        expected: { checks: ['✓ Card view renders image, title, summary, author', '✓ Article list shows up to 6 cards', '✓ Deleting an author does not break the card'] },
        challenge: {
          prompt: t('Render each child with the card view.', 'Har child ko card view se render karo.'),
          code: '<template:module node="${a}" view="____"/>',
          options: ['default', 'card', 'html', 'list'],
          answer: 1,
          explanation: t('Named view "card" → article.card.jsp.', 'Named view "card" → article.card.jsp.'),
          language: 'jsp',
        },
      },
    },
  ],
};

/* ═══════════════════ 09 · VIEWS ═══════════════════ */

const views = {
  title: 'Views',
  stage: 9,
  level: 'intermediate',
  estimatedMinutes: 90,
  description: t('How Jahia turns a node into HTML — view resolution, templates, fallbacks and the missing-view error.', 'Jahia node ko HTML kaise banata hai — view resolution, templates, fallbacks aur missing-view error.'),
  concepts: [
    fromLegacy('How Jahia Picks a View', {
      codeLanguage: 'tsx',
      tags: ['views', 'rendering', 'intermediate'],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['coding'],
        searchTerms: ['view', 'view resolution', 'render', 'fallback', 'template type', 'default view'],
        behind: {
          title: t('Node → HTML', 'Node → HTML'),
          steps: ['Node', { label: 'Node type', sub: 'lv:article' }, { label: 'Template type', sub: 'html' }, { label: 'View name', sub: 'default / card' }, { label: 'View file', sub: 'article.jsp' }, 'HTML'],
        },
        table: {
          title: t('How the view file is found (JSP modules)', 'View file kaise milti hai (JSP modules)'),
          columns: ['Ask', 'Jahia looks for'],
          rows: [
            ['lv:article, default', 'lv_article/html/article.jsp'],
            ['lv:article, card', 'lv_article/html/article.card.jsp'],
            ['lv:news (no views), default', 'falls back to lv_article/html/article.jsp'],
            ['nothing matches', 'error / missing-view message'],
          ],
        },
        challenge: {
          prompt: t('A list asks lv:article for view "teaser", which does not exist. What does Jahia try next?', 'List lv:article se "teaser" view maangti hai jo nahi hai. Jahia aage kya try karega?'),
          code: '// requested: teaser → not found → ____',
          options: ['a random view', 'the default view / supertype views', 'GraphQL', 'the template'],
          answer: 1,
          explanation: t('Resolution falls back — to default and up the supertype chain — before failing. Exact order is version-dependent.', 'Fail hone se pehle resolution fallback karta hai — default aur supertype chain pe. Exact order version pe depend.'),
          language: 'javascript',
        },
      },
    }),
    {
      title: 'Views, Templates and Render Sets',
      difficulty: 'hard',
      tags: ['views', 'templates', 'rendering', 'intermediate'],
      explanation: t(
        "Three words, three jobs, and a lot of confusion.\n\nA VIEW renders ONE node: an article, a hero. It lives with the node type (lv_article/html/article.jsp). A node type can have many views — default, card, teaser.\n\nA TEMPLATE renders a PAGE's layout: header, footer, and the AREAS where authors drop content. Templates belong to a template set (a module the site is built on). A page names its template (j:templateName); the template's areas pull in child nodes, and each child is rendered with its own view. JavaScript modules define templates in code rather than as template nodes — same idea.\n\nThe TEMPLATE TYPE (html, json…) is the output format; views live under a folder per template type, which is why you see /html/ in every path.\n\n\"RENDER SET\" is not an everyday Jahia term, but people use it loosely for \"the set of views Jahia can choose from for a node\". The real mechanics: Jahia takes the node's type, the template type and the requested view name, looks for a matching view in enabled modules, then falls back to the default view and up the supertype chain. When nothing matches, you get the missing-view error — next lesson.\n\nServer-side rendering is the default in all of this: the HTML is produced inside Jahia, cached as fragments, and sent to the browser. React appears in two places: JavaScript-module views render React on the server, and client components hydrate in the browser when they need interactivity.",
        "Teen shabd, teen kaam, aur bahut confusion.\n\nVIEW EK node render karta hai: article, hero. Ye node type ke saath rehta hai (lv_article/html/article.jsp). Ek node type ke kai views ho sakte hain — default, card, teaser.\n\nTEMPLATE ek PAGE ka layout render karta hai: header, footer, aur wo AREAS jahan authors content drop karte hain. Templates ek template set ke hote hain (wo module jispe site bani hai). Page apna template batata hai (j:templateName); template ke areas child nodes laate hain, aur har child apne view se render hota hai. JavaScript modules templates ko nodes ki jagah code mein define karte hain — idea wahi.\n\nTEMPLATE TYPE (html, json…) output format hai; views har template type ke folder ke neeche rehte hain, isliye har path mein /html/ dikhta hai.\n\n\"RENDER SET\" roz ka Jahia term nahi hai, par log ise loosely \"node ke liye Jahia jin views mein se chun sakta hai\" ke liye bolte hain. Asli mechanics: Jahia node ka type, template type aur maanga gaya view naam leta hai, enabled modules mein matching view dhoondhta hai, phir default view aur supertype chain pe fallback karta hai. Kuch match na ho toh missing-view error — agla lesson.\n\nIsme sab kuch mein server-side rendering default hai: HTML Jahia ke andar banta hai, fragments ki tarah cache hota hai, aur browser ko jaata hai. React do jagah aata hai: JavaScript-module views server pe React render karte hain, aur client components browser mein hydrate hote hain jab interactivity chahiye."
      ),
      dailyLifeExample: t(
        'A newspaper page: the page layout (template) has fixed slots — masthead, main story, sidebar. Each story in a slot is typeset by its own style sheet (view): a headline story looks different from a brief. The printer (Jahia) matches each story to its style sheet.',
        'Akhbaar ka page: page layout (template) mein fixed slots — masthead, main story, sidebar. Har slot ki story apni style sheet (view) se typeset hoti hai: headline story brief se alag dikhti hai. Printer (Jahia) har story ko uski style sheet se match karta hai.'
      ),
      keyPoints: ['View renders one node; template renders a page layout', 'Template areas render children with their views', 'Template type = output format (html)', 'Resolution: type + template type + view name, then fallback'],
      quiz: [
        q('Which renders the header/footer layout of a page?', ['A view', 'A template', 'A mixin', 'A workspace'], 1, 'Templates define page layout and areas.'),
        q('Why does every JSP view path contain /html/?', ['Tradition', 'It is the template type (output format)', 'It is the namespace', 'Required by Maven'], 1, 'Views are grouped per template type.'),
      ],
      interviewQuestions: [
        iq({
          question: 'Explain how Jahia renders a page, from URL to HTML.',
          difficulty: 'hard',
          short: t('Jahia resolves the URL to a node and workspace, picks the page template, renders its areas, renders each child node with its resolved view, assembling cached HTML fragments into the page.', 'Jahia URL ko node aur workspace mein resolve karta hai, page template chunta hai, uske areas render karta hai, har child node ko resolved view se render karta hai, cached HTML fragments jodke page banata hai.'),
          deep: t('View resolution uses the node type, template type and requested view name, falls back to the default view and supertypes, and fails with a missing-view error if nothing matches. Each fragment is cached with a key covering node, view, language and permissions, which is why pages can be personalised yet mostly served from cache.', 'View resolution node type, template type aur maange gaye view naam se hota hai, default view aur supertypes pe fallback karta hai, aur kuch match na ho toh missing-view error. Har fragment node, view, language aur permissions wali key se cache hota hai, isliye pages personalised hote hue bhi zyaadatar cache se serve hote hain.'),
          example: t('The News page: template "list" → main area → lv:articleList (default view) → six lv:article nodes (card view).', 'News page: template "list" → main area → lv:articleList (default view) → chhe lv:article nodes (card view).'),
          tip: t('Mention fragment caching — it shows you connect rendering and performance.', 'Fragment caching ka zikr karo — dikhata hai tum rendering aur performance jodte ho.'),
        }),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 25,
        badges: ['coding'],
        searchTerms: ['template', 'render set', 'view', 'area', 'template set', 'server-side rendering', 'react', 'fallback view'],
        behind: {
          title: t('URL → page', 'URL → page'),
          steps: [{ label: 'URL', sub: '/sites/learnverse/home/news.html' }, { label: 'Node', sub: 'news (jnt:page)' }, { label: 'Template', sub: 'j:templateName' }, { label: 'Areas', sub: 'main' }, { label: 'Child views', sub: 'articleList → cards' }, { label: 'Fragments', sub: 'cached' }, 'HTML'],
        },
        files: [
          { filename: 'template (JSP, excerpt)', language: 'jsp', code: '<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>\n<header><template:area path="header"/></header>\n<main><template:area path="main"/></main>\n<footer><template:area path="footer"/></footer>', highlight: [3], explain: t('Each area is a drop zone; its children render with their own views. In template-set modules templates are usually created in the studio/UI; this shows the idea.', 'Har area ek drop zone hai; uske children apne views se render hote hain. Template-set modules mein templates aam taur pe studio/UI mein bante hain; ye bas idea dikhata hai.') },
        ],
        views: {
          author: { text: t('Author sees outlined areas in Page Composer and drops components into them.', 'Author Page Composer mein outlined areas dekhta hai aur unme components drop karta hai.') },
          developer: { text: t('Developer writes views per type and templates per page layout.', 'Developer har type ke views aur har page layout ke templates likhta hai.'), code: 'lv_article/html/article.jsp        ← view (one node)\nlv_article/html/article.card.jsp   ← view (one node, another face)\ntemplate "article-detail"          ← page layout with areas', language: 'text' },
          jcr: { text: t('JCR stores the page with j:templateName and its area children.', 'JCR page ko j:templateName aur uske area children ke saath store karta hai.'), code: 'news (jnt:page)\n  j:templateName = "list"\n  └── main\n       └── latest (lv:articleList)', language: 'text' },
        },
        challenge: {
          prompt: t('Which one renders exactly one node?', 'Kaunsa theek ek node render karta hai?'),
          code: '// renders one node → ____',
          options: ['template', 'view', 'area', 'workspace'],
          answer: 1,
          explanation: t('Views render nodes; templates render page layouts.', 'Views nodes render karte hain; templates page layouts.'),
          language: 'javascript',
        },
      },
    },
    {
      title: 'Debugging a Missing View',
      difficulty: 'medium',
      tags: ['views', 'debugging', 'intermediate'],
      explanation: t(
        "Sooner or later a component renders as an error box instead of content, and the log says Jahia could not find a template or view for the resource. People describe it as \"no render set for the node\"; the exact wording depends on your version and on whether you use JSP or JavaScript modules. The shape is always the same: Jahia found the node but no view that can render it.\n\nDiagnose it in this order, cheapest first:\n\n1. Which node and which view was requested? The log line names the node path and the view. If it asks for \"card\", having only a default view is not enough.\n2. Does the file exist exactly where Jahia looks? For lv:article in a JSP module: src/main/resources/lv_article/html/article.jsp. The folder uses \"_\" not \":\"; the file name is the type name without prefix.\n3. Is the deployed module the one containing the file? Check the version in Administration → Modules.\n4. Is the module enabled on the site rendering the page?\n5. Is there a typo between the CND type name and the folder name?\n\nMost of the time it is #2.",
        "Kabhi na kabhi component content ki jagah error box ki tarah render hoga, aur log kahega Jahia ko resource ka template ya view nahi mila. Log ise \"node ke liye koi render set nahi\" kehte hain; exact shabd tumhare version aur JSP ya JavaScript modules pe depend karte hain. Shape hamesha wahi: Jahia ko node mila par use render karne wala view nahi.\n\nIs order mein diagnose karo, saste se pehle:\n\n1. Kaunsa node aur kaunsa view maanga gaya? Log line node path aur view batati hai. Agar \"card\" maanga hai, toh sirf default view kaafi nahi.\n2. Kya file bilkul wahan hai jahan Jahia dhoondhta hai? JSP module mein lv:article ke liye: src/main/resources/lv_article/html/article.jsp. Folder mein \":\" nahi \"_\"; file ka naam prefix ke bina type ka naam.\n3. Kya deployed module wahi hai jisme file hai? Administration → Modules mein version check karo.\n4. Kya module us site pe enabled hai jo page render kar rahi hai?\n5. CND type name aur folder name mein typo?\n\nZyaadatar #2 hota hai."
      ),
      dailyLifeExample: t(
        'A courier with a parcel for "Flat 4B" standing in front of a building where the flats are numbered "4-B". The parcel (node) is real, the building (module) is real — the address format (folder name) is wrong.',
        'Courier "Flat 4B" ka parcel leke khada hai aur building mein flats "4-B" numbered hain. Parcel (node) asli, building (module) asli — address ka format (folder name) galat.'
      ),
      keyPoints: ['Read which node and view the log names', 'Check the exact path: lv_article/html/article.jsp', 'Check deployed version and enabled module', 'Usually the folder or file name'],
      quiz: [
        q('The log asks for view "card" on lv:article. You have article.jsp only. Fix?', ['Rename article.jsp', 'Add lv_article/html/article.card.jsp', 'Add i18n', 'Flush cache'], 1, 'Add the requested view (or request default).'),
        q('Which folder name is correct for lv:article?', ['lv:article', 'lv_article', 'lv-article', 'article'], 1, '":" becomes "_".'),
      ],
      lesson: {
        kind: 'debug',
        minutes: 20,
        badges: ['debugging', 'coding'],
        searchTerms: ['no render set', 'missing view', 'template not found', 'unable to find the template', 'error box', 'view error', 'debug'],
        debug: [
          {
            title: t('"No render set for node" / missing view', '"No render set for node" / missing view'),
            symptom: 'Unable to find the template for resource … /sites/learnverse/contents/articles/welcome (view: card)',
            problem: t('Jahia found the node but no view for its type and the requested view name.', 'Jahia ko node mila par uske type aur maange gaye view naam ka view nahi.'),
            causes: ['View file in the wrong folder or wrong name', 'Requested view name does not exist', 'Module not deployed / not enabled', 'Type-name typo'],
            where: ['Jahia log line (node + view)', 'src/main/resources/lv_article/html/', 'Administration → Modules'],
            fix: t('Create the file where Jahia looks, with the right name; redeploy; reload.', 'File wahan banao jahan Jahia dhoondhta hai, sahi naam se; redeploy; reload.'),
            code: { filename: 'src/main/resources/lv_article/html/article.card.jsp', language: 'jsp', code: '<h3>${currentNode.properties[\'jcr:title\'].string}</h3>' },
            prevention: t('Every droppable type ships with a default view; every view name used by a container exists.', 'Har droppable type default view ke saath ship ho; container jo view naam use kare wo exist kare.'),
          },
        ],
        steps: [
          { title: t('Break it on purpose: rename article.card.jsp to article.cards.jsp and deploy', 'Jaan-boojh ke todo: article.card.jsp ko article.cards.jsp rename karke deploy karo') },
          { title: t('Open the News page and find the error box', 'News page kholo aur error box dhoondo') },
          { title: t('Find the log line naming the node and view', 'Log line dhoondo jo node aur view batati hai'), code: 'docker compose logs jahia | grep -i "template"', language: 'bash', filename: 'terminal' },
          { title: t('Fix the name, redeploy, confirm the cards return', 'Naam theek karo, redeploy karo, confirm karo cards wapas aaye') },
        ],
        expected: { checks: ['✓ Reproduced the error', '✓ Found the log line', '✓ Identified the view name', '✓ Fixed and verified'] },
        challenge: {
          prompt: t('The log says view "teaser". Which file do you create?', 'Log view "teaser" kehta hai. Kaunsi file banaoge?'),
          code: 'src/main/resources/lv_article/html/____',
          options: ['teaser.jsp', 'article.teaser.jsp', 'lv_article.teaser.jsp', 'article.jsp'],
          answer: 1,
          explanation: t('<type>.<view>.jsp', '<type>.<view>.jsp'),
          language: 'text',
        },
      },
    },
    {
      title: 'Project — Deploy, Author, Publish, Render',
      difficulty: 'medium',
      tags: ['project', 'authoring', 'publication', 'intermediate'],
      explanation: t(
        "Phases 12 to 16: the first end-to-end run of the News Portal. You deploy lv-news with lv:article, lv:author and lv:articleList; enable it; switch to the author's chair and create an author and two articles with images and categories; build the News page with an article list; publish everything; and look at it as a visitor.\n\nThis is the moment the chain closes for the first time: CND → node type → CMS field → author input → JCR node → view → frontend. Phase 17, the React frontend over GraphQL, comes in module 10.",
        "Phase 12 se 16: News Portal ka pehla end-to-end run. Tum lv:article, lv:author aur lv:articleList ke saath lv-news deploy karoge; enable karoge; author ki kursi pe baith ke ek author aur images-categories wale do articles banaoge; article list ke saath News page banaoge; sab publish karoge; aur visitor ki tarah dekhoge.\n\nYe wo pal hai jab chain pehli baar poori judti hai: CND → node type → CMS field → author input → JCR node → view → frontend. Phase 17, GraphQL pe React frontend, module 10 mein aata hai."
      ),
      dailyLifeExample: t(
        'A restaurant\'s soft launch: the kitchen (developer) is ready, the waiters (authors) serve the first real customers (visitors), and everyone sees the whole thing work together for the first time.',
        'Restaurant ka soft launch: kitchen (developer) taiyaar, waiters (authors) pehle asli customers (visitors) ko serve karte hain, aur sab pehli baar poori cheez saath chalte dekhte hain.'
      ),
      keyPoints: ['The whole chain, end to end', 'Author as an author, not as root', 'Publish page, content and media', 'Verify as a visitor'],
      quiz: [
        q('Articles live in contents/articles and are listed on the News page. What must be published for visitors?', ['Only the News page', 'The News page, the articles, the authors and the images', 'Only the articles', 'Nothing — preview is enough'], 1, 'Everything the page renders must be live.'),
      ],
      lesson: {
        kind: 'project',
        minutes: 45,
        badges: ['project', 'cms', 'hands-on'],
        scope: 'custom',
        searchTerms: ['project', 'deploy', 'author', 'publish', 'render', 'phase 12', 'phase 16', 'end to end'],
        build: { text: t('The chain, closed.', 'Chain, poori judi hui.'), flow: CHAIN },
        steps: [
          { title: t('Phase 12 — deploy lv-news', 'Phase 12 — lv-news deploy karo'), code: 'mvn clean install jahia:deploy', language: 'bash', filename: 'terminal' },
          { title: t('Phase 13 — open Jahia, open the site in jContent', 'Phase 13 — Jahia kholo, site jContent mein kholo') },
          { title: t('Phase 14 — confirm lv-news is enabled on learnverse', 'Phase 14 — confirm karo lv-news learnverse pe enabled hai') },
          { title: t('Phase 15 — author: create contents/authors/priya and two articles in contents/articles', 'Phase 15 — author: contents/authors/priya aur contents/articles mein do articles banao'), detail: t('Give each an image, a category, the author, a summary and a body.', 'Har ek ko image, category, author, summary aur body do.') },
          { title: t('On the News page, add an Article list pointing at contents/articles', 'News page pe contents/articles ko point karti Article list add karo') },
          { title: t('Phase 16 — publish the page, the folders, and the media', 'Phase 16 — page, folders aur media publish karo') },
          { title: t('Open the live News page in a private window; click a card', 'Live News page private window mein kholo; ek card pe click karo') },
        ],
        expected: { checks: ['✓ Module deployed', '✓ Opened in Jahia', '✓ Component enabled', '✓ Author + 2 articles authored', '✓ Published', '✓ Cards render live', '✓ Article page renders'] },
        mistakes: [
          { title: t('Doing it all as root', 'Sab kuch root se karna'), detail: t('Root sees everything and can publish anything — you will miss permission and workflow problems. Module 13 fixes this.', 'Root sab dekhta aur kuch bhi publish kar sakta hai — permission aur workflow problems chhoot jaayengi. Module 13 ye theek karta hai.') },
        ],
      },
    },
  ],
};

export const intermediateModules = [modules, cnd, nodeTypes, components, views];
