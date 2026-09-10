// BEGINNER — modules 00 to 04: prerequisites, fundamentals, CMS authoring,
// the JCR and local setup.

import { t, q, iq, shot, fromLegacy, CHAIN } from './helpers.mjs';

/* Reusable mock chrome for jContent screens. */
const JCONTENT_NAV = ['Pages', 'Content Folders', 'Media', 'Categories', 'Additional apps'];

/* ═══════════════════ 00 · BEFORE YOU START ═══════════════════ */

const prerequisites = {
  title: 'Before You Start',
  stage: 0,
  level: 'beginner',
  estimatedMinutes: 30,
  description: t(
    'A checklist of what to know before Jahia — not taught deeply here, with refreshers and links.',
    'Jahia se pehle kya aana chahiye — yahan detail mein nahi, bas refresher aur links.'
  ),
  concepts: [
    {
      title: 'Prerequisites — What You Need Before Jahia',
      difficulty: 'easy',
      tags: ['prerequisites', 'beginner', 'setup'],
      explanation: t(
        "Jahia sits on top of a lot of ordinary web technology. You do not need to be an expert in any of it, but you will move ten times faster if none of it is new.\n\nThis lesson is a checklist, not a course. For each item: what you should already be comfortable with, a one-line refresher, and where to learn it on Learnverse if it is shaky.\n\nThe honest minimum: you can write an HTML page with some CSS, read JavaScript and a small React component, run commands in a terminal, use Git, and start a Docker container. The Java item is lighter — you will not write Java in this course, but Jahia is a Java server and its errors arrive as Java stack traces, so you need to be able to read one without panicking.\n\nTick the checklist honestly. If three or more are shaky, spend a day on them first; it is cheaper than fighting Jahia and a gap at the same time.",
        "Jahia bahut saari normal web technology ke upar baitha hai. Kisi mein expert hone ki zaroorat nahi, par agar ye sab naya nahi hai toh tum das guna tez chaloge.\n\nYe lesson ek checklist hai, course nahi. Har item ke liye: tumhe kya pehle se aana chahiye, ek line ka refresher, aur agar kamzor hai toh Learnverse pe kahan seekhna hai.\n\nSeedhi baat, minimum ye hai: HTML page thodi CSS ke saath likh lo, JavaScript aur chhota React component padh lo, terminal mein commands chala lo, Git use kar lo, aur Docker container start kar lo. Java wala item halka hai — is course mein Java nahi likhoge, par Jahia ek Java server hai aur uske errors Java stack trace ki shakl mein aate hain, toh ek stack trace padhne mein ghabrana nahi chahiye.\n\nChecklist imaandari se tick karo. Teen ya zyada kamzor hain toh pehle ek din unpe lagao; Jahia aur gap dono se ek saath ladna mehenga padta hai."
      ),
      dailyLifeExample: t(
        'Before you learn to drive a truck you should already be able to ride a cycle and read road signs. Nobody teaches road signs in truck school — they assume it. Jahia assumes HTML, JavaScript, a terminal and Git the same way.',
        'Truck chalana seekhne se pehle cycle chalana aur road signs padhna aana chahiye. Truck school mein road signs koi nahi sikhata — maan ke chalte hain. Jahia bhi HTML, JavaScript, terminal aur Git ko aise hi maan ke chalta hai.'
      ),
      keyPoints: [
        'Comfort with HTML, CSS, JavaScript and basic React',
        'Able to use a terminal, npm/yarn, Git and Docker',
        'Able to read (not write) a Java stack trace',
        'Fix shaky basics first — it is cheaper than learning two things at once',
      ],
      quiz: [
        q('Do you need to write Java for this course?', ['Yes, every module is Java', 'No — but you must be able to read Java errors in the log', 'Only for CND files', 'Only for GraphQL'], 1, 'Jahia runs on Java and reports errors as stack traces; the course code is CND, JSP/JSX, GraphQL and config.'),
        q('Which tool starts your local Jahia in this course?', ['npm start', 'Docker Compose', 'A Java IDE', 'The browser'], 1, 'The local setup module runs Jahia with docker compose up --wait.'),
      ],
      lesson: {
        kind: 'checklist',
        minutes: 30,
        badges: ['hands-on'],
        searchTerms: ['prerequisites', 'html', 'css', 'javascript', 'react', 'git', 'docker', 'java'],
        prerequisites: [
          { title: 'HTML', icon: 'html', know: ['Elements, attributes, forms', 'Semantic tags: header, main, article'], refresher: t('A Jahia view outputs HTML — you must be able to write clean markup.', 'Jahia view HTML output karta hai — clean markup likhna aana chahiye.'), link: { href: '/courses/html', label: 'HTML course' } },
          { title: 'CSS', icon: 'css', know: ['Selectors, box model, flexbox, grid', 'Responsive media queries'], refresher: t('Components are styled like any site; Jahia adds nothing magic here.', 'Components normal site ki tarah style hote hain; Jahia yahan koi jaadu nahi karta.'), link: { href: '/courses/css', label: 'CSS course' } },
          { title: 'JavaScript', icon: 'javascript', know: ['Functions, arrays, objects, promises', 'fetch and JSON'], refresher: t('GraphQL calls and client components are plain JavaScript.', 'GraphQL calls aur client components plain JavaScript hi hain.'), link: { href: '/courses/javascript', label: 'JavaScript course' } },
          { title: 'React', icon: 'react', know: ['Components and props', 'Server vs client rendering, at a high level'], refresher: t('Jahia JavaScript modules render React on the server.', 'Jahia ke JavaScript modules server pe React render karte hain.'), link: { href: '/courses/react', label: 'React course' } },
          { title: 'Node / npm / yarn', icon: 'node', know: ['Install dependencies, run scripts', 'Read package.json'], refresher: t('yarn build and yarn deploy drive the JavaScript module loop.', 'yarn build aur yarn deploy JavaScript module ka loop chalate hain.'), link: { href: '/courses/nodejs', label: 'Node.js course' } },
          { title: 'Git', icon: 'git', know: ['Clone, branch, commit, push', 'Read a diff'], refresher: t('Modules live in Git; content lives in Jahia. Never commit content exports by accident.', 'Modules Git mein rehte hain; content Jahia mein. Galti se content export commit mat karo.'), link: { href: '/courses/git', label: 'Git course' } },
          { title: 'Docker', icon: 'docker', know: ['Images vs containers, volumes', 'docker compose up / down / logs'], refresher: t('Your local Jahia is a container; its content is a volume.', 'Tumhara local Jahia ek container hai; uska content ek volume hai.'), link: { href: '/courses/docker', label: 'Docker course' } },
          { title: 'Java & JCR ideas', icon: 'java', know: ['Read a stack trace: exception type, message, first "Caused by"', 'Know that the JCR is a tree of typed nodes (taught in module 03)'], refresher: t('Read the log from the first "Caused by", not the last line.', 'Log ko pehle "Caused by" se padho, aakhri line se nahi.'), link: { href: '/courses/java', label: 'Java course' } },
        ],
      },
    },
  ],
};

/* ═══════════════════ 01 · JAHIA FUNDAMENTALS ═══════════════════ */

const fundamentals = {
  title: 'Jahia Fundamentals',
  stage: 1,
  level: 'beginner',
  estimatedMinutes: 45,
  description: t(
    'What Jahia is, who does what in a Jahia project, and the vocabulary everyone uses.',
    'Jahia kya hai, Jahia project mein kaun kya karta hai, aur wo shabd jo sab use karte hain.'
  ),
  concepts: [
    fromLegacy('What Jahia Is — CMS vs DXP', {
      codeLanguage: 'text',
      tags: ['cms', 'beginner'],
      lesson: {
        kind: 'lesson',
        minutes: 15,
        badges: ['cms'],
        searchTerms: ['dxp', 'cms', 'architecture', 'overview'],
        build: {
          text: t(
            'By the end of the course you will have built the Learnverse News Portal on Jahia. Here is the whole system you will be working in — keep this picture in your head; every later lesson zooms into one box.',
            'Course ke end tak tum Jahia pe Learnverse News Portal bana chuke hoge. Ye poora system hai jisme kaam karoge — ye picture dimaag mein rakho; aage har lesson ek box pe zoom karega.'
          ),
          flow: {
            title: 'Jahia, end to end',
            steps: ['Developer', { label: 'Module', sub: 'lv-news' }, { label: 'Content definition', sub: 'definitions.cnd' }, { label: 'JCR', sub: 'repository' }, { label: 'Rendering', sub: 'views' }, { label: 'CMS author', sub: 'jContent' }, 'Published website'],
          },
        },
        objectives: [
          t('Explain CMS vs DXP in one sentence', 'CMS vs DXP ek line mein samjhao'),
          t('Name the parts of a Jahia system', 'Jahia system ke parts ke naam batao'),
          t('Say where code lives and where content lives', 'Batao code kahan rehta hai aur content kahan'),
        ],
        views: {
          author: { text: t('Authors log in to Jahia, open jContent or Page Composer, create and edit content, and publish it. They never see code.', 'Authors Jahia mein login karte hain, jContent ya Page Composer kholte hain, content banate-edit karte hain aur publish karte hain. Code kabhi nahi dekhte.') },
          developer: { text: t('Developers write modules: content definitions (CND), views and configuration, built and deployed to the Jahia server.', 'Developers modules likhte hain: content definitions (CND), views aur configuration, jo build hoke Jahia server pe deploy hote hain.'), code: 'lv-news/\n  src/main/resources/META-INF/definitions.cnd\n  src/main/resources/lv_article/html/article.jsp\n  pom.xml', language: 'text', filename: 'module layout' },
          jcr: { text: t('Everything authors create is stored as nodes in the JCR repository — separate from the module that defines its shape.', 'Authors jo bhi banate hain wo JCR repository mein nodes ki tarah store hota hai — us module se alag jo uska shape define karta hai.'), code: '/sites/learnverse/contents/articles/welcome   (lv:article)', language: 'text' },
        },
        mistakes: [
          { title: t('Thinking content lives in the module', 'Ye sochna ki content module mein rehta hai'), detail: t('Redeploying a module never deletes content, and deleting content never touches code. They are separate on purpose.', 'Module redeploy karne se content delete nahi hota, aur content delete karne se code nahi chhoota. Ye jaan-boojh ke alag hain.') },
        ],
      },
    }),
    {
      title: 'Who Does What — Roles in a Jahia Project',
      difficulty: 'easy',
      tags: ['roles', 'cms', 'authoring', 'beginner'],
      explanation: t(
        "A Jahia project is a team sport, and half of the confusion in your first weeks comes from not knowing whose job something is.\n\nThe DEVELOPER builds modules: content types, views, integrations. The AUTHOR (or editor) writes and updates content in the CMS. A REVIEWER approves content before it goes live. The WEBMASTER (or site administrator) runs one site: its languages, modules, users and settings. The ADMINISTRATOR runs the Jahia server itself: installation, server-wide users, modules, cache, backups. And the VISITOR is who all of this is for — they only ever see the published website.\n\nThese are not always different people. On a small project one developer is also the webmaster. But they are always different hats, and Jahia's permissions are designed around them: an author should not be able to install modules, and a developer does not need to publish content.\n\nWhen something breaks, the first question is \"whose hat is this?\" — a missing field is a developer problem, an unpublished page is an author problem, a module not enabled on the site is a webmaster problem.",
        "Jahia project ek team game hai, aur pehle hafton ka aadha confusion isse aata hai ki pata hi nahi kaunsa kaam kiska hai.\n\nDEVELOPER modules banata hai: content types, views, integrations. AUTHOR (ya editor) CMS mein content likhta aur update karta hai. REVIEWER content ko live jaane se pehle approve karta hai. WEBMASTER (ya site administrator) ek site chalata hai: uski languages, modules, users aur settings. ADMINISTRATOR poora Jahia server chalata hai: installation, server-wide users, modules, cache, backups. Aur VISITOR wo hai jiske liye ye sab hai — use sirf published website dikhti hai.\n\nZaroori nahi ye alag log hon. Chhote project mein ek developer hi webmaster bhi hota hai. Par topiyan hamesha alag hoti hain, aur Jahia ki permissions inhi ke hisaab se bani hain: author module install na kar paaye, aur developer ko content publish karne ki zaroorat nahi.\n\nKuch toote toh pehla sawaal: \"ye kiski topi hai?\" — field missing hai toh developer ki problem, page unpublished hai toh author ki, module site pe enabled nahi toh webmaster ki."
      ),
      dailyLifeExample: t(
        'A newspaper: printers build the press (developers), reporters write stories (authors), the editor approves them (reviewer), the bureau chief runs one city edition (webmaster), the owner runs the whole company (administrator), and readers just read the paper (visitors).',
        'Ek akhbaar socho: press banane wale (developers), khabar likhne wale reporter (authors), approve karne wala editor (reviewer), ek sheher ka edition chalane wala bureau chief (webmaster), poori company chalane wala maalik (administrator), aur bas akhbaar padhne wale log (visitors).'
      ),
      keyPoints: [
        'Developer, author, reviewer, webmaster, administrator, visitor',
        'One person can wear several hats; permissions follow the hat',
        'First debugging question: whose job is this?',
      ],
      quiz: [
        q('A new content type does not show a field authors need. Whose hat is this?', ['Author', 'Reviewer', 'Developer', 'Visitor'], 2, 'Fields come from the CND the developer writes.'),
        q('The module is installed on the server but the component is missing on one site. Who typically fixes it?', ['Visitor', 'Webmaster — enable the module on that site', 'Reviewer', 'Nobody — redeploy'], 1, 'Deployed on the server is not the same as enabled on a site; enabling is a site-admin job.'),
        q('Who approves content before it goes live in a workflow?', ['Reviewer', 'Developer', 'Visitor', 'Docker'], 0, 'The reviewer role accepts or rejects publication requests.'),
      ],
      interviewQuestions: [
        iq({
          question: 'What roles do you typically see on a Jahia project, and why does Jahia model them separately?',
          difficulty: 'easy',
          short: t('Developer, author/editor, reviewer, site administrator (webmaster), server administrator and visitor. Jahia separates them so each can be granted exactly the permissions their work needs.', 'Developer, author/editor, reviewer, site administrator (webmaster), server administrator aur visitor. Jahia inhe alag rakhta hai taaki har ek ko bas utni permission mile jitni kaam ko chahiye.'),
          deep: t('Permissions in Jahia are roles granted on nodes and inherited down the tree. Modelling the jobs separately lets you give an author write access to the news folder only, a reviewer publish rights, and keep module and server administration away from content staff — least privilege, which also limits the damage of a compromised account.', 'Jahia mein permissions nodes pe diye gaye roles hain jo tree mein neeche inherit hote hain. Kaam alag rakhne se author ko sirf news folder pe write access, reviewer ko publish rights, aur module/server admin content staff se door — least privilege, jo compromised account ka nuksaan bhi kam karta hai.'),
          example: t('A bank site: 20 authors per market, 3 legal reviewers, one webmaster per country site, one platform team.', 'Ek bank site: har market mein 20 authors, 3 legal reviewers, har country site ka ek webmaster, ek platform team.'),
          tip: t('Mention that roles are granted to groups at folder level, not to individuals page by page.', 'Batao ki roles groups ko folder level pe diye jaate hain, individuals ko page-by-page nahi.'),
        }),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 12,
        badges: ['cms'],
        searchTerms: ['roles', 'author', 'developer', 'webmaster', 'administrator', 'visitor', 'reviewer', 'who does what'],
        objectives: [t('Tell the six hats apart', 'Chhe topiyan alag pehchano'), t('Know which Jahia tool each one uses', 'Har ek kaunsa Jahia tool use karta hai')],
        cards: {
          heading: t('Who does what?', 'Kaun kya karta hai?'),
          title: t('Pick a role', 'Ek role chuno'),
          items: [
            { label: 'Developer', icon: 'code', summary: t('Builds modules — the shape of content and how it renders.', 'Modules banata hai — content ka shape aur wo render kaise hoga.'), does: ['Writes definitions.cnd', 'Writes views (JSP or React)', 'Builds and deploys modules', 'Writes GraphQL queries'], tools: ['IDE', 'Maven / yarn', 'Docker', 'Jahia Tools'] },
            { label: 'Author', icon: 'pen', summary: t('Creates and edits content in the CMS.', 'CMS mein content banata aur edit karta hai.'), does: ['Creates pages and content', 'Uploads images and files', 'Fills Content Editor forms', 'Publishes or requests publication'], tools: ['jContent', 'Page Composer', 'Content Editor'] },
            { label: 'Reviewer', icon: 'eye', summary: t('Approves or rejects content before it goes live.', 'Content live jaane se pehle approve ya reject karta hai.'), does: ['Receives workflow tasks', 'Previews changes', 'Accepts or rejects with a comment'], tools: ['Workflow tasks', 'Preview'] },
            { label: 'Webmaster', icon: 'sliders', summary: t('Runs one site.', 'Ek site chalata hai.'), does: ['Enables modules on the site', 'Configures languages', 'Manages site users, groups and roles', 'Manages categories'], tools: ['Site settings', 'Administration'] },
            { label: 'Administrator', icon: 'server', summary: t('Runs the Jahia server.', 'Jahia server chalata hai.'), does: ['Installs and upgrades Jahia', 'Deploys modules server-wide', 'Manages server users and roles', 'Cache, logs, backups'], tools: ['Administration', 'Jahia Tools', 'Server logs'] },
            { label: 'Visitor', icon: 'globe', summary: t('Sees only the published website.', 'Sirf published website dekhta hai.'), does: ['Reads the live workspace', 'May log in for personalised content'], tools: ['Browser'] },
          ],
        },
        where: [
          { app: 'Jahia CMS', path: ['Administration', 'Users and Roles'], note: t('Where roles are defined and granted (labels vary by version).', 'Yahan roles define aur grant hote hain (labels version ke hisaab se badalte hain).') },
        ],
        challenge: {
          prompt: t('The live site shows last week\'s headline even though the author edited it. Whose hat should check first?', 'Author ne headline edit ki, phir bhi live site pe pichhle hafte wali dikh rahi hai. Pehle kiski topi check kare?'),
          code: '// symptom: edited in jContent, old text on the live site\n// first check → ____',
          options: ['developer', 'author', 'administrator', 'visitor'],
          answer: 1,
          explanation: t('Most often it was saved but not published — the author checks the publication status before anyone suspects code or cache.', 'Zyaadatar save hua par publish nahi — code ya cache pe shak karne se pehle author publication status check kare.'),
          language: 'javascript',
        },
      },
    },
    {
      title: 'Content, Components, Pages, Templates and Modules',
      difficulty: 'easy',
      tags: ['vocabulary', 'cms', 'beginner', 'components'],
      explanation: t(
        "Five words carry most of Jahia, and they are easy to blur.\n\nCONTENT is any piece of information an author creates: an article, an author profile, a banner, a paragraph. In the repository it is a node with properties.\n\nA COMPONENT is a content type authors can drop onto a page — a hero, an article list, a video. \"Component\" is the author-facing word; under the hood it is a node type plus at least one view.\n\nA PAGE is a node in the site tree (jnt:page). Pages hold areas; areas hold components.\n\nA TEMPLATE decides the layout of a page — header, footer, where the main area sits. Authors pick a template when they create a page; developers build templates.\n\nA MODULE is the deployable package a developer ships: node types, views, templates, labels, config. Modules are enabled per site.\n\nHow they connect: a module defines a component → an author places that component on a page → the page uses a template for its layout → the component's content is stored as nodes. Hold that sentence and the rest of the course has somewhere to hang.",
        "Paanch shabd Jahia ka zyaada bojh uthaate hain, aur inhe mix karna aasaan hai.\n\nCONTENT koi bhi information hai jo author banata hai: article, author profile, banner, paragraph. Repository mein ye properties wala node hai.\n\nCOMPONENT ek content type hai jise author page pe drop kar sakta hai — hero, article list, video. \"Component\" author ki taraf ka shabd hai; andar se ye ek node type plus kam se kam ek view hai.\n\nPAGE site tree mein ek node hai (jnt:page). Pages mein areas hote hain; areas mein components.\n\nTEMPLATE page ka layout decide karta hai — header, footer, main area kahan. Author page banate waqt template chunta hai; templates developer banata hai.\n\nMODULE wo deployable package hai jo developer ship karta hai: node types, views, templates, labels, config. Modules har site pe alag se enable hote hain.\n\nJudte kaise hain: module ek component define karta hai → author use page pe rakhta hai → page layout ke liye template use karta hai → component ka content nodes ki tarah store hota hai. Ye ek line pakad lo, baaki course isi pe tikega."
      ),
      dailyLifeExample: t(
        'A thali restaurant. The module is the kitchen that knows how to cook dishes. A component is a dish on the menu. The template is the thali plate with fixed compartments. A page is one plate served to a customer, and the content is the actual food in each compartment today.',
        'Ek thali restaurant socho. Module wo kitchen hai jise dishes banana aata hai. Component menu ki ek dish hai. Template wo thali hai jisme fixed katoriyan hain. Page ek customer ko serve ki gayi ek thali hai, aur content aaj har katori mein asli khaana hai.'
      ),
      keyPoints: [
        'Content = nodes authors create',
        'Component = droppable content type with a view',
        'Page holds areas, areas hold components',
        'Template = page layout; module = what developers deploy',
      ],
      quiz: [
        q('An author creates a new "About" page and must choose its layout. What are they choosing?', ['A module', 'A template', 'A mixin', 'A workspace'], 1, 'Templates define page layout; authors choose one when creating a page.'),
        q('What is a component, technically?', ['A CSS class', 'A node type authors can drop, plus at least one view', 'A Docker container', 'A GraphQL query'], 1, 'Authors see a component; developers see a node type and its views.'),
        q('Which is deployed by a developer?', ['A page', 'Content', 'A module', 'A category'], 2, 'Modules are the developer\'s deployable unit.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 12,
        badges: ['cms'],
        searchTerms: ['component', 'page', 'template', 'module', 'content', 'area', 'vocabulary'],
        behind: {
          title: t('How the five words connect', 'Paancho shabd kaise judte hain'),
          steps: [{ label: 'Module', sub: 'lv-news' }, { label: 'Component', sub: 'lv:hero' }, { label: 'Page', sub: 'home' }, { label: 'Template', sub: 'home layout' }, { label: 'Area', sub: 'main' }, { label: 'Content node', sub: 'hero' }],
        },
        screenshots: [
          shot({
            src: '/images/jahia/authoring/page-composer-areas.png',
            title: t('A page, its areas and components', 'Ek page, uske areas aur components'),
            description: t('Page Composer shows the page with its template areas; each block inside an area is a component.', 'Page Composer page ko template areas ke saath dikhata hai; area ke andar har block ek component hai.'),
            mock: {
              app: 'Page Composer',
              nav: ['Home', 'News', 'About', 'Contact'],
              active: 'Home',
              breadcrumb: ['learnverse', 'Home'],
              toolbar: [{ label: 'Preview' }, { label: 'Publish', primary: true }],
              panel: 'page',
              areas: [
                { label: 'header (template)', items: ['Site logo', 'Main menu'] },
                { label: 'main area', marker: 1, items: [{ label: 'Hero — "Welcome to Learnverse"', marker: 2 }, 'Article list — latest 6'] },
                { label: 'footer (template)', items: ['Newsletter'] },
              ],
            },
            markers: [t('An area defined by the template', 'Template ka define kiya area'), t('A component placed by an author', 'Author ka rakha hua component')],
          }),
        ],
        where: [
          { app: 'Page Composer', path: ['Site', 'Page', 'Area', '+ Add content'], note: t('Where authors place components.', 'Yahan authors components rakhte hain.') },
          { app: 'Module source', path: ['src/main/resources', 'META-INF', 'definitions.cnd'], note: t('Where developers define them.', 'Yahan developers unhe define karte hain.') },
        ],
        challenge: {
          prompt: t('Fill in the chain.', 'Chain poori karo.'),
          code: 'module → component → page → ____ → area → content node',
          options: ['template', 'workspace', 'GraphQL', 'mixin'],
          answer: 0,
          explanation: t('The page uses a template, whose areas hold the components.', 'Page ek template use karta hai, jiske areas components rakhte hain.'),
          language: 'text',
        },
      },
    },
  ],
};

/* ═══════════════════ 02 · CMS AUTHORING ═══════════════════ */

const authoring = {
  title: 'CMS Authoring',
  stage: 2,
  level: 'beginner',
  estimatedMinutes: 100,
  description: t(
    'A complete authoring guide: where every screen is, what it does, and how to publish.',
    'Poora authoring guide: har screen kahan hai, kya karti hai, aur publish kaise karein.'
  ),
  concepts: [
    {
      title: 'Logging In — Dashboard, jContent and Page Composer',
      difficulty: 'easy',
      tags: ['authoring', 'cms', 'jcontent', 'beginner'],
      explanation: t(
        "Developers who skip the authoring side build components nobody can use. So before any code, learn the CMS as an author.\n\nAfter logging in you land on the DASHBOARD (in Jahia 8, a start page with your sites, recent work and tasks). From there you move between the main apps:\n\n• jCONTENT — the content manager. A left panel with Pages, Content Folders and Media; a list of what is inside; actions to create, edit, publish, move and delete. Most daily authoring happens here.\n• PAGE COMPOSER — visual page editing. You see the page as it will look, with its areas outlined, and you add components into the areas directly. In Jahia 7 this was called Edit mode.\n• CONTENT EDITOR — the form that opens whenever you create or edit a node, in either app.\n• ADMINISTRATION — site settings, users, roles, modules, server settings (depending on your rights).\n\nJahia 7 also had a Contribute mode for simplified editing; Jahia 8 replaced it with jContent. If you read old docs mentioning Contribute mode, map it to jContent.\n\nMenus are labelled slightly differently between 8.0, 8.1 and 8.2, so learn them by purpose, not by exact position.",
        "Jo developers authoring side skip karte hain, wo aise components banate hain jo koi use nahi kar paata. Toh code se pehle CMS ko author ki tarah seekho.\n\nLogin ke baad tum DASHBOARD pe aate ho (Jahia 8 mein ek start page: tumhari sites, recent kaam aur tasks). Wahan se main apps ke beech jaate ho:\n\n• jCONTENT — content manager. Left panel mein Pages, Content Folders aur Media; beech mein andar ki list; banane, edit, publish, move, delete ke actions. Roz ka zyaada authoring yahin hota hai.\n• PAGE COMPOSER — visual page editing. Page waise hi dikhta hai jaise live dikhega, areas outlined, aur components seedhe areas mein add karte ho. Jahia 7 mein isko Edit mode kehte the.\n• CONTENT EDITOR — wo form jo kisi bhi node ko banate ya edit karte waqt khulta hai, dono apps mein.\n• ADMINISTRATION — site settings, users, roles, modules, server settings (tumhare rights ke hisaab se).\n\nJahia 7 mein simplified editing ke liye Contribute mode bhi tha; Jahia 8 ne use jContent se replace kar diya. Purane docs mein Contribute mode dikhe toh use jContent samjho.\n\n8.0, 8.1 aur 8.2 mein menus ke labels thode alag hain, isliye unhe position se nahi, kaam se yaad rakho."
      ),
      dailyLifeExample: t(
        'A big office building: the reception is the dashboard, the records room is jContent (everything filed in folders), the showroom is Page Composer (see it as customers will), the form counter is the Content Editor, and the facilities office is Administration.',
        'Ek bada office building: reception dashboard hai, records room jContent (sab folders mein filed), showroom Page Composer (waise dekho jaise customer dekhega), form counter Content Editor, aur facilities office Administration.'
      ),
      keyPoints: [
        'Dashboard → jContent, Page Composer, Administration',
        'jContent manages content in a tree; Page Composer edits pages visually',
        'Content Editor is the form for every create/edit',
        'Contribute mode (Jahia 7) → jContent (Jahia 8)',
      ],
      quiz: [
        q('Where do you edit a page visually, adding components into its areas?', ['jContent', 'Page Composer', 'Jahia Tools', 'GraphiQL'], 1, 'Page Composer is the visual editor; jContent is the content manager.'),
        q('Old documentation mentions "Contribute mode". What is the Jahia 8 equivalent?', ['Page Composer', 'jContent', 'Administration', 'The Definitions browser'], 1, 'Contribute mode was replaced by jContent in Jahia 8.'),
        q('Which screen opens whenever you create or edit any node?', ['The Content Editor', 'The dashboard', 'Cache management', 'The JCR browser'], 0, 'The Content Editor is the form for editing a node\'s properties.'),
      ],
      interviewQuestions: [
        iq({
          question: 'What is the difference between jContent and Page Composer?',
          difficulty: 'easy',
          short: t('jContent manages content as a tree of pages, folders and media; Page Composer edits a page visually, in its layout. Both open the same Content Editor to edit a node.', 'jContent content ko pages, folders aur media ke tree ki tarah manage karta hai; Page Composer page ko uske layout mein visually edit karta hai. Dono node edit karne ke liye wahi Content Editor kholte hain.'),
          deep: t('They are two views over the same repository. jContent suits bulk and structured work — a folder of 200 articles, media management, moving things around. Page Composer suits page-building — arranging components in areas and seeing the result. Content reused on many pages is best managed in jContent content folders and referenced from pages.', 'Dono ek hi repository ke do views hain. jContent bulk aur structured kaam ke liye — 200 articles ka folder, media management, cheezein idhar-udhar. Page Composer page banane ke liye — areas mein components lagao aur result dekho. Kai pages pe reuse hone wala content jContent folders mein rakho aur pages se reference karo.'),
          tip: t('Mention that Page Composer replaced Jahia 7 Edit mode, and jContent replaced Contribute mode.', 'Batao ki Page Composer ne Jahia 7 ka Edit mode aur jContent ne Contribute mode replace kiya.'),
        }),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 15,
        badges: ['cms', 'hands-on'],
        searchTerms: ['login', 'dashboard', 'jcontent', 'page composer', 'edit mode', 'contribute mode', 'content editor', 'administration'],
        objectives: [t('Log in and find the dashboard', 'Login karke dashboard dhoondo'), t('Move between jContent, Page Composer and Administration', 'jContent, Page Composer aur Administration ke beech jaao'), t('Know which app to use for which job', 'Kaunse kaam ke liye kaunsa app')],
        where: [
          { app: 'Browser', path: ['http://localhost:8080', 'Log in'], note: t('Your local Jahia from module 04. Use the root account from your compose file.', 'Module 04 wala local Jahia. Compose file wala root account use karo.') },
          { app: 'Jahia CMS', path: ['Dashboard', 'jContent'] },
          { app: 'Jahia CMS', path: ['Dashboard', 'Page Composer'] },
        ],
        screenshots: [
          shot({
            src: '/images/jahia/jcontent/jcontent-pages-view.png',
            title: t('jContent — the content manager', 'jContent — content manager'),
            description: t('Left: what you are browsing. Middle: what is inside. Top: what you can do.', 'Left: kya browse kar rahe ho. Beech: andar kya hai. Upar: kya kar sakte ho.'),
            mock: {
              app: 'jContent',
              nav: [{ label: 'Pages', marker: 1 }, 'Content Folders', 'Media', 'Categories', 'Additional apps'],
              active: 'Pages',
              breadcrumb: ['learnverse', 'Home'],
              toolbar: [{ label: '+ New page', primary: true, marker: 2 }, { label: 'Publish' }, { label: '⋮' }],
              panel: 'list',
              items: [
                { label: 'Home', meta: 'jnt:page', status: 'Published' },
                { label: 'News', meta: 'jnt:page', status: 'Modified', marker: 3 },
                { label: 'About', meta: 'jnt:page', status: 'Published' },
                { label: 'Contact', meta: 'jnt:page', status: 'Not published' },
              ],
            },
            markers: [t('Accordion: Pages, Content Folders, Media', 'Accordion: Pages, Content Folders, Media'), t('Create actions for the current location', 'Current location ke create actions'), t('Publication status of each item', 'Har item ka publication status')],
          }),
          shot({
            src: '/images/jahia/authoring/page-composer-home.png',
            title: t('Page Composer — visual editing', 'Page Composer — visual editing'),
            description: t('The same Home page, edited in place.', 'Wahi Home page, apni jagah pe edit hota hua.'),
            mock: {
              app: 'Page Composer',
              nav: ['Home', 'News', 'About', 'Contact'],
              active: 'Home',
              breadcrumb: ['learnverse', 'Home'],
              toolbar: [{ label: 'Preview', marker: 2 }, { label: 'Publish', primary: true }],
              panel: 'page',
              areas: [{ label: 'main', marker: 1, items: ['Hero', 'Article list'] }],
            },
            markers: [t('An area — click "+ Add content" inside it', 'Ek area — iske andar "+ Add content" dabao'), t('Preview shows the page without editing chrome', 'Preview page ko editing chrome ke bina dikhata hai')],
          }),
        ],
        steps: [
          { title: t('Open http://localhost:8080 and log in as root', 'http://localhost:8080 kholo aur root se login karo') },
          { title: t('On the dashboard, open your site in jContent', 'Dashboard pe apni site jContent mein kholo') },
          { title: t('Click through Pages, Content Folders and Media in the left panel', 'Left panel mein Pages, Content Folders aur Media pe click karke dekho') },
          { title: t('Open the Home page in Page Composer', 'Home page Page Composer mein kholo'), detail: t('From jContent: select the page → the menu → edit in Page Composer (label varies by version).', 'jContent se: page select karo → menu → Page Composer mein edit (label version ke hisaab se).') },
          { title: t('Find one area and its "+ Add content" button — do not add anything yet', 'Ek area aur uska "+ Add content" button dhoondo — abhi kuch add mat karo') },
        ],
        expected: {
          text: t('You can reach every main app from the dashboard and back.', 'Dashboard se har main app tak jaake wapas aa sakte ho.'),
          checks: ['Logged in', 'Site open in jContent', 'Home open in Page Composer', 'Found an area'],
        },
        mistakes: [
          { title: t('"I don\'t see Administration"', '"Mujhe Administration nahi dikh raha"'), detail: t('Menus show only what your roles allow. Log in as root locally; on real projects, ask for the right role.', 'Menus sirf wahi dikhate hain jo tumhare roles allow karte hain. Local pe root se login karo; real project mein sahi role maango.') },
          { title: t('Following a Jahia 7 tutorial', 'Jahia 7 ka tutorial follow karna'), detail: t('Edit mode and Contribute mode screenshots will not match Jahia 8.', 'Edit mode aur Contribute mode ke screenshots Jahia 8 se match nahi karenge.'), fix: t('Map Edit mode → Page Composer, Contribute → jContent.', 'Edit mode → Page Composer, Contribute → jContent samjho.') },
        ],
        challenge: {
          prompt: t('You need to rename 40 articles in a content folder. Which app?', '40 articles ek content folder mein rename karne hain. Kaunsa app?'),
          code: '// bulk work on a folder of articles → ____',
          options: ['Page Composer', 'jContent', 'GraphiQL', 'Jahia Tools'],
          answer: 1,
          explanation: t('jContent lists folder contents and supports working through many items.', 'jContent folder ka content list karta hai aur kai items pe kaam karne deta hai.'),
          language: 'javascript',
        },
      },
    },
    {
      title: 'Creating Content in the Content Editor',
      difficulty: 'easy',
      tags: ['authoring', 'cms', 'content editor', 'cnd', 'beginner'],
      explanation: t(
        "Every time an author creates or edits content, the Content Editor opens: a form generated from the content type's definition. This is the single most important screen for a Jahia developer to understand, because you design it without ever drawing it.\n\nEach field in the form comes from one property in the CND. A string becomes a text input; a boolean becomes a checkbox; a weakreference to an image becomes an image picker; a mandatory property gets an asterisk and blocks Save; an i18n property follows the editor's language switcher. Labels come from the module's resource bundle, not from the CND itself.\n\nThe workflow for an author is always the same: choose where the content goes (a page area, or a content folder), choose the content type, fill the form, Save. Saving writes to the default workspace. Nothing is public until it is published.\n\nThe lesson for developers: when an author says a form is confusing, the fix is almost always in your CND — a better type, a selector, a constraint, a default, or a clearer label.",
        "Jab bhi author content banata ya edit karta hai, Content Editor khulta hai: content type ki definition se generate hua form. Jahia developer ke liye ye sabse zaroori screen hai, kyunki tum ise design karte ho bina kabhi draw kiye.\n\nForm ki har field CND ki ek property se aati hai. string → text input; boolean → checkbox; image ka weakreference → image picker; mandatory property pe star lagta hai aur Save block hota hai; i18n property editor ke language switcher ke saath chalti hai. Labels module ke resource bundle se aate hain, CND se nahi.\n\nAuthor ka workflow hamesha same: content kahan jaayega chuno (page ka area, ya content folder), content type chuno, form bharo, Save. Save default workspace mein likhta hai. Publish hone tak kuch public nahi.\n\nDevelopers ke liye seekh: jab author bole form confusing hai, fix lagbhag hamesha tumhari CND mein hota hai — behtar type, selector, constraint, default, ya saaf label."
      ),
      dailyLifeExample: t(
        'A bank account opening form. The bank decided what fields exist, which are compulsory (*), which are dropdowns and which need a document attached. The customer only fills it in. The CND is the bank\'s form design; the Content Editor is the printed form.',
        'Bank ka account opening form. Bank ne decide kiya kaunse fields hain, kaunse compulsory (*) hain, kaunse dropdown hain aur kahan document attach karna hai. Customer bas bharta hai. CND bank ka form design hai; Content Editor chhapa hua form.'
      ),
      keyPoints: [
        'The Content Editor form is generated from the CND',
        'Property type + selector decide the control',
        'mandatory blocks Save; i18n follows the language switcher',
        'Save writes to default; publishing makes it live',
      ],
      quiz: [
        q('You created:\n\n- title (string)\n\nWhat will the author normally see?', ['Checkbox', 'Text field', 'Date picker', 'Node picker'], 1, 'A plain string renders a text input.'),
        q('Where do the field LABELS in the Content Editor come from?', ['The CND file', 'The module resource bundle', 'The JCR', 'The template'], 1, 'The CND defines properties; human labels come from the resource bundle.'),
        q('An author clicks Save. Where is the content now?', ['Live workspace', 'Default workspace only', 'The browser', 'The module'], 1, 'Save writes to default; publication copies to live.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 18,
        badges: ['cms', 'hands-on'],
        searchTerms: ['content editor', 'form', 'field', 'save', 'create content', 'text field'],
        where: [
          { app: 'jContent', path: ['Content Folders', 'contents', '+ New content'] },
          { app: 'Page Composer', path: ['Page', 'Area', '+ Add content'] },
        ],
        screenshots: [
          shot({
            src: '/images/jahia/content-editor/content-editor-article-form.png',
            title: t('Content Editor — an article', 'Content Editor — ek article'),
            description: t('Every field here is one CND property.', 'Yahan har field ek CND property hai.'),
            mock: {
              app: 'Content Editor',
              breadcrumb: ['contents', 'articles', 'New Article'],
              toolbar: [{ label: 'Save', primary: true, marker: 5 }, { label: 'Cancel' }, { label: 'EN ▾', marker: 4 }],
              panel: 'form',
              formTitle: 'Article',
              fields: [
                { label: 'Title', kind: 'text', value: 'Welcome to Learnverse', required: true, i18n: true, marker: 1 },
                { label: 'Summary', kind: 'textarea', value: 'What this portal is for.', i18n: true },
                { label: 'Image', kind: 'picker-image', value: 'hero.jpg', marker: 2 },
                { label: 'Featured', kind: 'checkbox', value: true, marker: 3 },
              ],
            },
            markers: [t('Title — string, mandatory, i18n', 'Title — string, mandatory, i18n'), t('Image — weakreference with an image picker', 'Image — image picker wala weakreference'), t('Featured — boolean', 'Featured — boolean'), t('Language switcher for i18n fields', 'i18n fields ke liye language switcher'), t('Save writes to the default workspace', 'Save default workspace mein likhta hai')],
          }),
        ],
        cmsVsCode: [
          { code: '- jcr:title (string) i18n mandatory', field: { kind: 'text', label: 'Title', value: 'Welcome to Learnverse', required: true, i18n: true } },
          { code: '- summary (string, textarea) i18n', field: { kind: 'textarea', label: 'Summary', value: 'What this portal is for.', i18n: true } },
          { code: "- image (weakreference, picker[type='image']) < 'jmix:image'", field: { kind: 'picker-image', label: 'Image', value: 'hero.jpg' } },
          { code: '- isFeatured (boolean) = false autocreated', field: { kind: 'checkbox', label: 'Featured', value: true } },
        ],
        behind: {
          title: t('What happens when the author clicks Save', 'Author Save dabata hai toh kya hota hai'),
          steps: ['CMS UI', { label: 'Content definition', sub: 'lv:article' }, { label: 'Node', sub: 'welcome' }, { label: 'Properties', sub: 'jcr:title, image…' }, { label: 'JCR', sub: 'default workspace' }],
        },
        steps: [
          { title: t('In jContent, open Content Folders and create a folder "contents"', 'jContent mein Content Folders kholo aur "contents" folder banao') },
          { title: t('Inside it, click "+ New content" and choose a Rich text (or any available) type', 'Uske andar "+ New content" dabao aur Rich text (ya jo available ho) type chuno'), detail: t('Your own lv:article arrives in module 07; for now use a built-in type.', 'Tumhara apna lv:article module 07 mein aayega; abhi built-in type use karo.') },
          { title: t('Fill the form and try to Save with a required field empty', 'Form bharo aur ek required field khaali chhod ke Save try karo'), detail: t('Watch the validation message — that is `mandatory` in the CND.', 'Validation message dekho — wahi CND ka `mandatory` hai.') },
          { title: t('Fill it properly and Save', 'Theek se bharo aur Save karo') },
          { title: t('Check the status badge: it is not published yet', 'Status badge dekho: abhi publish nahi hua') },
        ],
        expected: { checks: ['Folder created', 'Validation seen on an empty mandatory field', 'Content saved', 'Status: not published'] },
        mistakes: [
          { title: t('Designing forms in your head instead of in the CND', 'Form dimaag mein design karna, CND mein nahi'), detail: t('Authors get whatever your CND produces. Open the Content Editor after every CND change.', 'Authors ko wahi milta hai jo tumhari CND banati hai. Har CND change ke baad Content Editor khol ke dekho.') },
        ],
        challenge: {
          prompt: t('Which type makes the author see a checkbox?', 'Kaunsa type author ko checkbox dikhata hai?'),
          code: '[lv:article] > jnt:content\n - isFeatured (____)',
          options: ['string', 'boolean', 'date', 'weakreference'],
          answer: 1,
          explanation: t('boolean renders a checkbox / toggle.', 'boolean checkbox / toggle banata hai.'),
        },
      },
    },
    {
      title: 'Media — Uploading Images, Videos and Documents',
      difficulty: 'easy',
      tags: ['authoring', 'media', 'cms', 'images', 'beginner'],
      explanation: t(
        "Images, videos, PDFs and other files live in the site's MEDIA library, not inside the content that uses them. You upload a file once to jContent → Media, and then any number of articles, heroes and galleries point at it with a reference.\n\nThis is why a Jahia image field is a picker, not an upload box: the article stores a reference to the file node, and the file node stores the bytes. Replace the file in Media and every page using it shows the new version.\n\nOrganise Media in folders by purpose (images/articles, images/authors, documents, videos). Give files meaningful names and fill in alt text where your setup supports it. Publish media: an article can be live while its image is still unpublished, and visitors then get a broken image — the most common first-week mistake.",
        "Images, videos, PDFs aur baaki files site ki MEDIA library mein rehti hain, us content ke andar nahi jo unhe use karta hai. File ek baar jContent → Media mein upload karo, phir kitne bhi articles, heroes aur galleries use reference se point karte hain.\n\nIsiliye Jahia ki image field picker hai, upload box nahi: article file node ka reference store karta hai, aur file node bytes store karta hai. Media mein file badlo toh use karne wale har page pe nayi dikhegi.\n\nMedia ko purpose ke hisaab se folders mein rakho (images/articles, images/authors, documents, videos). Files ke meaningful naam do aur jahan setup support kare wahan alt text bharo. Media publish karo: article live ho sakta hai jabki uski image abhi unpublished ho, aur visitors ko tooti image milti hai — pehle hafte ki sabse common galti."
      ),
      dailyLifeExample: t(
        'A school library. Books sit on library shelves (Media). Your notebook does not contain the book — it says "see Physics, shelf 3". If the library replaces the book with a new edition, every notebook reference now points at the new one.',
        'School library socho. Kitaabein library ki shelf pe (Media). Tumhari notebook mein kitaab nahi hai — likha hai "Physics dekho, shelf 3". Library naya edition rakh de, toh har notebook ka reference ab naye ko point karega.'
      ),
      keyPoints: [
        'Upload once to Media; reference from content',
        'Image fields are pickers because they store references',
        'Organise Media in folders; name files meaningfully',
        'Publish the media too, not just the article',
      ],
      quiz: [
        q('Why is a Jahia image field a picker rather than an upload box?', ['Uploads are not supported', 'The content stores a reference to a file node in Media', 'Pickers are faster', 'Images live in the module'], 1, 'Files live once in Media; content references them.'),
        q('The article is live but its image is broken for visitors. Most likely?', ['The CND is wrong', 'The image was never published', 'The browser is old', 'GraphQL is down'], 1, 'Unpublished media is the classic cause.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 15,
        badges: ['cms', 'hands-on'],
        searchTerms: ['media', 'image', 'upload', 'files', 'documents', 'video', 'pdf', 'images'],
        where: [
          { app: 'jContent', path: ['Media', 'files', 'images', 'Upload'], note: t('"To create an image": jContent → Media → folder → Upload (or drag and drop).', '"Image banana": jContent → Media → folder → Upload (ya drag and drop).') },
        ],
        screenshots: [
          shot({
            src: '/images/jahia/media/jcontent-media-library.png',
            title: t('jContent → Media', 'jContent → Media'),
            description: t('Folders on the left, files as thumbnails, upload at the top.', 'Left mein folders, files thumbnails ki tarah, upar upload.'),
            mock: {
              app: 'jContent',
              nav: JCONTENT_NAV,
              active: 'Media',
              breadcrumb: ['learnverse', 'files', 'images'],
              toolbar: [{ label: 'Upload', primary: true, marker: 1 }, { label: 'New folder', marker: 2 }],
              panel: 'grid',
              items: [{ label: 'hero-welcome.jpg', marker: 3 }, { label: 'author-priya.jpg' }, { label: 'jcr-tree.png' }, { label: 'brochure.pdf', icon: '📄' }],
            },
            markers: [t('Upload files (or drag and drop)', 'Files upload karo (ya drag and drop)'), t('Organise in folders', 'Folders mein organise karo'), t('One file, referenced from many places', 'Ek file, kai jagah se referenced')],
          }),
        ],
        views: {
          author: { text: t('Upload hero-welcome.jpg to Media, then in the article pick it with "Select image".', 'hero-welcome.jpg Media mein upload karo, phir article mein "Select image" se chuno.'), field: { kind: 'picker-image', label: 'Image', value: 'hero-welcome.jpg' } },
          developer: { text: t('The field is a weakreference constrained to images.', 'Field images tak limited ek weakreference hai.'), code: "- image (weakreference, picker[type='image']) < 'jmix:image'", language: 'cnd', filename: 'definitions.cnd' },
          jcr: { text: t('The article stores the file node\'s UUID; the file node holds the bytes in jcr:content.', 'Article file node ka UUID store karta hai; file node bytes jcr:content mein rakhta hai.'), code: '/sites/learnverse/files/images/hero-welcome.jpg   (jnt:file, jmix:image)\n  └── jcr:content   jcr:data (binary), jcr:mimeType = image/jpeg\n\n/sites/learnverse/contents/articles/welcome   (lv:article)\n  image = 3f2a…c91   ← UUID of hero-welcome.jpg', language: 'text' },
        },
        steps: [
          { title: t('Open jContent → Media', 'jContent → Media kholo') },
          { title: t('Create folders: images/articles, images/authors, documents, videos', 'Folders banao: images/articles, images/authors, documents, videos') },
          { title: t('Upload two images, one PDF and (optionally) a short MP4', 'Do images, ek PDF aur (optional) ek chhota MP4 upload karo') },
          { title: t('Open an image and look at its details: size, type, where it is used', 'Ek image kholo aur details dekho: size, type, kahan use hui') },
          { title: t('Publish the folder with its files', 'Folder ko files ke saath publish karo') },
        ],
        expected: { checks: ['Folders created', 'Files uploaded', 'Details inspected', 'Media published'] },
        mistakes: [
          { title: t('Uploading the same image into many places', 'Ek hi image kai jagah upload karna'), detail: t('Duplicates drift apart. Upload once, reference many times.', 'Duplicates alag-alag ho jaate hain. Ek baar upload, kai baar reference.') },
          { title: t('Forgetting to publish media', 'Media publish karna bhool jaana'), fix: t('Publish the media folder, or use publish options that include references.', 'Media folder publish karo, ya references include karne wale publish options use karo.') },
        ],
        challenge: {
          prompt: t('Complete the image field so the picker only offers images.', 'Image field poori karo taaki picker sirf images dikhaye.'),
          code: "- image (weakreference, picker[type='image']) < '____'",
          options: ['jnt:page', 'jmix:image', 'jnt:text', 'mix:title'],
          answer: 1,
          explanation: t("Image files carry jmix:image; constraining to it keeps PDFs out.", 'Image files pe jmix:image hota hai; usse constrain karne se PDFs bahar rehte hain.'),
        },
      },
    },
    {
      title: 'Preview, Publication and Workflow for Authors',
      difficulty: 'easy',
      tags: ['authoring', 'publication', 'workflow', 'cms', 'beginner'],
      explanation: t(
        "Saving and publishing are two different buttons in Jahia, and the difference is the whole safety model.\n\nSave writes to the DEFAULT workspace — authors and reviewers can see it, the public cannot. PREVIEW shows the page as the public would see it, but from default, so you can check before anything is live. PUBLISH copies the node (and, if you choose, its sub-pages and references) from default to LIVE. Only live is public.\n\nPublication is per language. Publishing English leaves the Hindi version where it was.\n\nWhen you do not have the publish permission, the button becomes a REQUEST: your change goes into a WORKFLOW, a reviewer gets a task, and it is published only when they accept. That is not an obstacle; it is the legal-approval step big organisations need.\n\nRead the status badge on every item: published, modified (live exists but default has newer changes), or never published. Nine out of ten \"my change is not showing\" questions are answered by that badge.",
        "Jahia mein Save aur Publish do alag buttons hain, aur yahi farak poora safety model hai.\n\nSave DEFAULT workspace mein likhta hai — authors aur reviewers dekh sakte hain, public nahi. PREVIEW page ko waise dikhata hai jaise public dekhega, par default se, taaki live hone se pehle check kar lo. PUBLISH node ko (aur chaho toh uske sub-pages aur references ko) default se LIVE mein copy karta hai. Sirf live public hai.\n\nPublication har language ki alag hoti hai. English publish karne se Hindi version wahin rehta hai.\n\nAgar tumhare paas publish permission nahi, toh button REQUEST ban jaata hai: tumhara change WORKFLOW mein jaata hai, reviewer ko task milta hai, aur wo accept kare tabhi publish hota hai. Ye rukawat nahi; ye wo legal-approval step hai jo badi companies ko chahiye.\n\nHar item ka status badge padho: published, modified (live hai par default mein naye changes), ya kabhi publish nahi hua. \"Mera change dikh nahi raha\" wale das mein se nau sawaalon ka jawab wahi badge hai."
      ),
      dailyLifeExample: t(
        'Writing an exam answer in rough first (default), showing it to your friend (preview), then copying it neatly onto the answer sheet you submit (publish). If a teacher must check it before submission, that is the workflow.',
        'Exam mein pehle rough mein likhna (default), dost ko dikhana (preview), phir answer sheet pe saaf likh ke jama karna (publish). Agar jama se pehle teacher check kare, wahi workflow hai.'
      ),
      keyPoints: [
        'Save → default; Publish → live; Preview reads default',
        'Publication is per language',
        'No publish permission → request → workflow → reviewer',
        'Read the status badge first',
      ],
      quiz: [
        q('An author without publish permission clicks the publish action. What happens?', ['Nothing', 'A publication request starts a workflow for a reviewer', 'It publishes anyway', 'The node is deleted'], 1, 'Without the permission, publishing becomes a workflow request.'),
        q('English is published. Is the Hindi version live?', ['Yes, automatically', 'Only if it was published too — publication is per language', 'Only on Sundays', 'Only in preview'], 1, 'Each language publishes separately.'),
        q('Status "modified" means…', ['Never published', 'Live exists, and default has newer changes', 'Deleted', 'Locked'], 1, 'Modified = published before, changed since.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 15,
        badges: ['cms', 'hands-on'],
        searchTerms: ['publish', 'publication', 'preview', 'workflow', 'status', 'live', 'unpublished'],
        where: [
          { app: 'jContent', path: ['Select item', '⋮ menu', 'Publish'], note: t('Also: "Publish in all languages", "Publish with sub-pages" — exact labels vary.', 'Aur: "Publish in all languages", "Publish with sub-pages" — labels thode badal sakte hain.') },
          { app: 'Page Composer', path: ['Toolbar', 'Preview'] },
        ],
        screenshots: [
          shot({
            src: '/images/jahia/workflow/workflow-publish.png',
            title: t('The publish menu', 'Publish menu'),
            description: t('Publish just this item, with sub-pages, or in all languages — or request publication when you lack the right.', 'Sirf ye item, sub-pages ke saath, ya saari languages mein publish — ya right na ho toh request.'),
            mock: {
              app: 'jContent',
              nav: JCONTENT_NAV,
              active: 'Pages',
              breadcrumb: ['learnverse', 'News'],
              panel: 'list',
              items: [
                { label: 'Publish', meta: 'this item, this language', marker: 1, active: true },
                { label: 'Publish in all languages', meta: 'EN + HI', marker: 2 },
                { label: 'Publish with sub-pages', meta: 'whole branch' },
                { label: 'Request publication', meta: 'starts a workflow', marker: 3 },
              ],
            },
            markers: [t('Publish the current language only', 'Sirf current language publish'), t('Every language at once', 'Saari languages ek saath'), t('Shown when you need approval', 'Jab approval chahiye tab dikhta hai')],
          }),
        ],
        behind: {
          title: t('Where your change travels', 'Tumhara change kahan-kahan jaata hai'),
          steps: [{ label: 'Save', sub: 'default' }, { label: 'Preview', sub: 'reads default' }, { label: 'Request', sub: 'optional workflow' }, { label: 'Publish', sub: 'default → live' }, { label: 'Visitor', sub: 'reads live' }],
        },
        steps: [
          { title: t('Edit the content you saved in the previous lesson', 'Pichhle lesson ka saved content edit karo') },
          { title: t('Open Preview and confirm the change', 'Preview kholo aur change confirm karo') },
          { title: t('Open the live URL in a private window — the change is not there', 'Live URL private window mein kholo — change wahan nahi hai') },
          { title: t('Publish, then reload the live URL', 'Publish karo, phir live URL reload karo') },
          { title: t('Watch the status badge go from modified to published', 'Status badge ko modified se published hote dekho') },
        ],
        expected: { checks: ['Preview shows the change', 'Live did not, before publish', 'Live does, after publish', 'Badge: published'] },
        debug: [
          {
            title: t('"I published but the page is still old"', '"Publish kiya par page purana hi hai"'),
            problem: t('The live site does not show the change.', 'Live site change nahi dikha rahi.'),
            causes: ['Published only one language', 'Parent page not published', 'Image/reference not published', 'Browser cache'],
            where: ['Status badges on node, parent and media', 'Language switcher', 'Private window'],
            fix: t('Publish what is missing — usually the parent or the media — then check in a private window.', 'Jo missing hai wo publish karo — aam taur pe parent ya media — phir private window mein check karo.'),
            prevention: t('Use "publish with sub-pages" for new sections; check every language.', 'Naye sections ke liye "publish with sub-pages"; har language check karo.'),
          },
        ],
        challenge: {
          prompt: t('Which workspace does a visitor read?', 'Visitor kaunsa workspace padhta hai?'),
          code: '// anonymous visitor on https://learnverse.com → workspace ____',
          options: ['default', 'live', 'preview', 'edit'],
          answer: 1,
          explanation: t('Only published content in live is public.', 'Sirf live mein published content public hai.'),
          language: 'javascript',
        },
      },
    },
    {
      title: 'Site Settings, Categories, Users and Administration',
      difficulty: 'easy',
      tags: ['authoring', 'administration', 'cms', 'categories', 'users', 'beginner'],
      explanation: t(
        "Beyond content, a site has settings, and there is a server behind all sites. Knowing where each lives saves hours.\n\nSITE-LEVEL (webmaster): languages the site uses and which are mandatory; the modules enabled on this site; the template set; the server name (domain); site users, groups and role assignments; vanity URLs.\n\nSERVER-LEVEL (administrator): server users and groups; roles and their permissions; modules installed on the server; cache management; mail and other system settings.\n\nCATEGORIES are a curated tree (Technology → CMS → Jahia) that content can be classified with through the jmix:categorized mixin. They are managed centrally and used everywhere; that is the difference from free-form tags.\n\nCONTENT SEARCH lets authors find content across the site by text and type — faster than browsing folders once the site is big.\n\nLabels and positions differ between Jahia 8.0, 8.1 and 8.2 — if a menu item is not where this lesson says, search the administration menu for the purpose.",
        "Content ke alawa, site ki settings hoti hain, aur saari sites ke peeche ek server hota hai. Kaun kahan rehta hai ye pata ho toh ghante bachte hain.\n\nSITE-LEVEL (webmaster): site ki languages aur kaunsi mandatory; is site pe enabled modules; template set; server name (domain); site users, groups aur role assignments; vanity URLs.\n\nSERVER-LEVEL (administrator): server users aur groups; roles aur unki permissions; server pe installed modules; cache management; mail aur baaki system settings.\n\nCATEGORIES ek curated tree hai (Technology → CMS → Jahia) jisse content ko jmix:categorized mixin ke through classify kiya jaata hai. Ye centrally manage hoti hain aur har jagah use hoti hain; free-form tags se yahi farak hai.\n\nCONTENT SEARCH se authors poori site mein text aur type se content dhoondh sakte hain — site badi ho jaaye toh folders browse karne se tez.\n\n8.0, 8.1 aur 8.2 mein labels aur positions alag hain — agar menu item wahan nahi jahan lesson keh raha, toh administration menu mein kaam ke naam se dhoondho."
      ),
      dailyLifeExample: t(
        'A housing society: each flat (site) decides its own curtains and nameplate (site settings), while the society office (server administration) decides water timings, security guards and who gets a gate pass. Categories are the society\'s official notice-board sections everyone files under.',
        'Housing society socho: har flat (site) apne parde aur nameplate khud decide karta hai (site settings), jabki society office (server administration) paani ka time, guards aur gate pass kise milega decide karta hai. Categories society ke official notice-board ke sections hain jisme sab file karte hain.'
      ),
      keyPoints: [
        'Site settings: languages, modules, template set, domain, site users/roles',
        'Server administration: server users, roles, modules, cache',
        'Categories = curated tree; tags = free-form',
        'Find menus by purpose — labels vary by version',
      ],
      quiz: [
        q('You need Hindi added to learnverse.in only. Where?', ['Server administration → Modules', 'Site settings → Languages for that site', 'The CND', 'Docker compose'], 1, 'Languages are configured per site.'),
        q('What is the key difference between categories and tags?', ['None', 'Categories are a curated, centrally managed tree; tags are free-form', 'Tags are faster', 'Categories are only for images'], 1, 'Categories are governed; tags are whatever authors type.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 15,
        badges: ['cms'],
        searchTerms: ['site settings', 'categories', 'users', 'roles', 'administration', 'languages', 'modules', 'search', 'files'],
        where: [
          { app: 'Administration', path: ['Sites', 'learnverse', 'Languages'], note: t('Site-level. Label varies by version.', 'Site-level. Label version ke hisaab se.') },
          { app: 'Administration', path: ['Sites', 'learnverse', 'Modules'] },
          { app: 'Administration', path: ['Server', 'Users and Roles', 'Users'] },
          { app: 'jContent', path: ['Categories'], note: t('In some versions categories are managed from Administration instead.', 'Kuch versions mein categories Administration se manage hoti hain.') },
        ],
        screenshots: [
          shot({
            src: '/images/jahia/administration/site-settings-languages.png',
            title: t('Site settings → Languages', 'Site settings → Languages'),
            description: t('Which languages this site has, which is default, which are mandatory.', 'Is site ki kaunsi languages, default kaunsi, mandatory kaunsi.'),
            mock: {
              app: 'Administration',
              nav: ['Sites', 'Users and Roles', 'Modules', 'Cache', 'System'],
              active: 'Sites',
              breadcrumb: ['Sites', 'learnverse', 'Languages'],
              toolbar: [{ label: 'Add language', marker: 1 }, { label: 'Save', primary: true }],
              panel: 'list',
              items: [
                { label: 'English (en)', meta: 'default · mandatory', marker: 2, status: 'Published' },
                { label: 'हिन्दी (hi)', meta: 'active in live', status: 'Published' },
              ],
            },
            markers: [t('Add a language to the site', 'Site mein language add karo'), t('Default and mandatory flags', 'Default aur mandatory flags')],
          }),
        ],
        steps: [
          { title: t('Open Administration and find your site\'s settings', 'Administration kholo aur apni site ki settings dhoondo') },
          { title: t('Look at Languages; note the default language', 'Languages dekho; default language note karo') },
          { title: t('Look at the Modules enabled for the site', 'Site ke liye enabled Modules dekho') },
          { title: t('Create categories: News → Technology, Business', 'Categories banao: News → Technology, Business') },
          { title: t('Use content search to find the content you created earlier', 'Content search se pehle banaya content dhoondo') },
        ],
        expected: { checks: ['Found site languages', 'Found enabled modules', 'Created two categories', 'Found content by search'] },
        challenge: {
          prompt: t('Which mixin lets an article be classified with categories?', 'Kaunsa mixin article ko categories se classify karne deta hai?'),
          code: '[lv:article] > jnt:content, jmix:editorialContent, ____',
          options: ['jmix:image', 'jmix:categorized', 'mix:title', 'jmix:hiddenType'],
          answer: 1,
          explanation: t('jmix:categorized adds the category picker.', 'jmix:categorized category picker add karta hai.'),
        },
      },
    },
    {
      title: 'Lab — Author Your First News Page',
      difficulty: 'easy',
      tags: ['lab', 'authoring', 'cms', 'beginner'],
      explanation: t(
        "Time to do an author's whole job, end to end, with nothing but built-in components. No code yet — this lab exists so that when you build components later, you know exactly what it is like to be the person using them.\n\nYou will create a News page from a template, add a heading, a rich text block and an image into its main area, upload the image to Media first, preview it, publish the page and its image, and confirm the result in a private browser window as an anonymous visitor.\n\nWhen you are done, write down two things that annoyed you as an author. You will fix exactly those kinds of annoyances as a developer in modules 06 to 09.",
        "Ab author ka poora kaam, shuru se aakhir tak, sirf built-in components ke saath. Abhi code nahi — ye lab isliye hai taaki baad mein jab tum components banao, tumhe pata ho unhe use karne wala kaisa mehsoos karta hai.\n\nTum ek template se News page banaoge, uske main area mein heading, rich text block aur image add karoge, image pehle Media mein upload karoge, preview karoge, page aur image publish karoge, aur private browser window mein anonymous visitor ki tarah result confirm karoge.\n\nKhatam hone pe do cheezein likho jo author ki tarah tumhe irritate kari. Module 06 se 09 mein developer ki tarah tum bilkul aisi hi cheezein fix karoge."
      ),
      dailyLifeExample: t(
        'A chef tasting their own dish before putting it on the menu. You author the page before you ever build a component, so you know how it feels from the other side of the counter.',
        'Chef menu pe daalne se pehle apni dish khud chakhta hai. Tum component banane se pehle khud page author karte ho, taaki counter ke doosri taraf ka anubhav pata ho.'
      ),
      keyPoints: ['Upload media first, then reference it', 'Preview before publishing', 'Publish the page AND its media', 'Verify as an anonymous visitor'],
      quiz: [
        q('Why check the result in a private window?', ['It is faster', 'It shows what an anonymous visitor sees, without your session or cache', 'Jahia requires it', 'To avoid publishing'], 1, 'Your logged-in session and browser cache can hide what the public really gets.'),
      ],
      lesson: {
        kind: 'lab',
        minutes: 30,
        badges: ['lab', 'hands-on', 'cms'],
        searchTerms: ['lab', 'first page', 'news page', 'publish', 'authoring'],
        build: {
          text: t('A published News page with a heading, a paragraph and an image.', 'Ek published News page jisme heading, paragraph aur image ho.'),
          flow: { steps: ['Upload image', 'Create page', 'Add components', 'Preview', 'Publish', 'Verify live'] },
        },
        where: [
          { app: 'jContent', path: ['Media', 'images', 'Upload'] },
          { app: 'jContent', path: ['Pages', 'Home', '+ New page'] },
          { app: 'Page Composer', path: ['News', 'main area', '+ Add content'] },
        ],
        steps: [
          { title: t('Upload news-cover.jpg to Media → images', 'news-cover.jpg Media → images mein upload karo') },
          { title: t('Under Home, create a page "News" from an available template', 'Home ke neeche ek available template se "News" page banao') },
          { title: t('Open News in Page Composer', 'News ko Page Composer mein kholo') },
          { title: t('In the main area, add a heading/text component: "Latest from Learnverse"', 'Main area mein heading/text component add karo: "Latest from Learnverse"') },
          { title: t('Add a rich text block with two sentences and one bold word', 'Rich text block add karo, do sentences aur ek bold word ke saath') },
          { title: t('Add an image component and pick news-cover.jpg', 'Image component add karo aur news-cover.jpg chuno') },
          { title: t('Preview the page', 'Page preview karo') },
          { title: t('Publish the page and the image', 'Page aur image publish karo') },
          { title: t('Open the live URL in a private window', 'Live URL private window mein kholo') },
        ],
        expected: {
          text: t('At the end:', 'End mein:'),
          checks: ['✓ Image uploaded to Media', '✓ News page created', '✓ Three components added', '✓ Previewed', '✓ Page published', '✓ Image published', '✓ Visible to an anonymous visitor'],
        },
        mistakes: [
          { title: t('Image shows for you, not in the private window', 'Image tumhe dikhti hai, private window mein nahi'), fix: t('The image is unpublished — publish it from Media.', 'Image unpublished hai — Media se publish karo.') },
          { title: t('Page 404s in the private window', 'Private window mein page 404'), fix: t('Publish the page (and its parent if it is new).', 'Page publish karo (aur naya hai toh parent bhi).') },
        ],
      },
    },
  ],
};

/* ═══════════════════ 03 · THE JCR ═══════════════════ */

const jcr = {
  title: 'The JCR',
  stage: 3,
  level: 'beginner',
  estimatedMinutes: 80,
  description: t(
    'The content repository underneath everything: nodes, properties, paths, UUIDs, references and workspaces.',
    'Sabke neeche ki content repository: nodes, properties, paths, UUIDs, references aur workspaces.'
  ),
  concepts: [
    fromLegacy('The JCR — Everything Is a Node', {
      codeLanguage: 'jsx',
      tags: ['jcr', 'beginner'],
      lesson: {
        kind: 'lesson',
        minutes: 15,
        badges: ['coding'],
        searchTerms: ['jcr', 'node', 'tree', 'repository', 'content tree'],
        build: {
          text: t('Map the News Portal onto a tree — the picture every later lesson assumes.', 'News Portal ko ek tree pe map karo — wo picture jo aage har lesson maan ke chalega.'),
        },
        files: [
          {
            filename: 'content tree',
            language: 'text',
            code: '/sites\n   └── learnverse                     jnt:virtualsite\n        ├── home                      jnt:page\n        │    ├── main                 jnt:contentList (area)\n        │    │    ├── hero            lv:hero\n        │    │    ├── text            jnt:bigText\n        │    │    └── image           jnt:imageReference\n        │    └── about                jnt:page\n        ├── contents                  jnt:contentFolder\n        │    └── articles\n        │         └── welcome         lv:article\n        └── files                     jnt:folder\n             └── images\n                  └── hero.jpg        jnt:file',
            highlight: [5, 6, 7, 8],
            explain: t('Each line is a node: its name, then its primary type. The components an author dropped on Home (lines 5–8) are children of the page\'s area. Area mechanics vary slightly between versions; the idea does not.', 'Har line ek node hai: naam, phir primary type. Author ne Home pe jo components daale (lines 5–8) wo page ke area ke children hain. Area mechanics versions mein thode alag hain; idea nahi.'),
          },
        ],
        views: {
          author: { text: t('Author sees: a Home page with a hero, some text and an image.', 'Author ko dikhta hai: Home page jisme hero, kuch text aur ek image.') },
          developer: { text: t('Developer sees: three child nodes of Home, each with a type that decides its form and its view.', 'Developer ko dikhta hai: Home ke teen child nodes, har ek ka type jo uska form aur view decide karta hai.'), code: "currentNode.getNodes()   // hero, text, image\nnode.getPrimaryNodeTypeName()   // 'lv:hero'", language: 'javascript' },
          jcr: { text: t('JCR stores: /sites/learnverse/home/main/hero with jcr:primaryType = lv:hero and its properties.', 'JCR store karta hai: /sites/learnverse/home/main/hero jiska jcr:primaryType = lv:hero aur uski properties.'), code: '/sites/learnverse/home/main/hero\n  jcr:primaryType = lv:hero\n  heading = "Welcome to Learnverse"', language: 'text' },
        },
        challenge: {
          prompt: t('What is the path of the welcome article?', 'Welcome article ka path kya hai?'),
          code: '/sites/learnverse/____/articles/welcome',
          options: ['home', 'contents', 'files', 'users'],
          answer: 1,
          explanation: t('Reusable content lives in content folders, here /contents.', 'Reusable content content folders mein rehta hai, yahan /contents.'),
          language: 'text',
        },
      },
    }),
    {
      title: 'Nodes, Properties, Paths and UUIDs',
      difficulty: 'easy',
      tags: ['jcr', 'nodes', 'properties', 'uuid', 'beginner'],
      explanation: t(
        "Four words describe every piece of content in Jahia.\n\nA NODE is one item in the tree. It has a PARENT (the node above it) and CHILD NODES (the nodes below). A page is a node; the article on it is a node; its image is a node in Media.\n\nA PROPERTY is a named value on a node: jcr:title = \"Welcome\", isFeatured = true, image = <a UUID>. Properties have types (string, long, boolean, date, weakreference…) and may be multi-valued or per-language.\n\nA PATH is a node's address by position: /sites/learnverse/contents/articles/welcome. Paths are readable, but they change when an author moves or renames something.\n\nA UUID (identifier) is a node's address by identity: 3f2a…c91. It never changes, however the node moves. That is why references store UUIDs and not paths.\n\nEvery node also has a PRIMARY NODE TYPE (exactly one — what it is) and optional MIXINS (extra capabilities). The type decides which properties and children are allowed.\n\nRule of thumb for developers: use paths to find a place (\"the articles folder\"), use UUIDs to point at a thing (\"this article's author\").",
        "Chaar shabd Jahia ke har content ko describe karte hain.\n\nNODE tree ka ek item hai. Iska ek PARENT hota hai (upar wala node) aur CHILD NODES (neeche wale). Page ek node hai; uspe article ek node; uski image Media mein ek node.\n\nPROPERTY node pe ek naam wali value hai: jcr:title = \"Welcome\", isFeatured = true, image = <ek UUID>. Properties ke types hote hain (string, long, boolean, date, weakreference…) aur multi-valued ya per-language ho sakti hain.\n\nPATH node ka position se address hai: /sites/learnverse/contents/articles/welcome. Padhne mein aasaan, par author move ya rename kare toh badal jaata hai.\n\nUUID (identifier) node ka identity se address hai: 3f2a…c91. Node kahin bhi jaaye, ye nahi badalta. Isiliye references UUID store karte hain, path nahi.\n\nHar node ka ek PRIMARY NODE TYPE hota hai (theek ek — wo hai kya) aur optional MIXINS (extra capabilities). Type decide karta hai kaunsi properties aur children allowed hain.\n\nDevelopers ke liye rule: jagah dhoondhne ke liye path (\"articles folder\"), cheez ko point karne ke liye UUID (\"is article ka author\")."
      ),
      dailyLifeExample: t(
        'Your home address is a path — it changes when you move house. Your Aadhaar number is a UUID — it stays the same wherever you live. The bank stores your Aadhaar, not your address, to be sure it is still you.',
        'Tumhare ghar ka address path hai — ghar badlo toh badal jaata hai. Aadhaar number UUID hai — kahin bhi raho same rehta hai. Bank tumhara Aadhaar rakhta hai, address nahi, taaki pakka tum hi ho.'
      ),
      keyPoints: [
        'Node: an item with a parent and children',
        'Property: a typed, named value on a node',
        'Path: address by position — changes on move/rename',
        'UUID: address by identity — never changes',
        'One primary type, any number of mixins',
      ],
      quiz: [
        q('An author renames the "articles" folder to "news". What breaks?', ['Anything that stored UUIDs', 'Anything that hard-coded the old path', 'Nothing ever', 'Every image'], 1, 'Paths change on rename; UUIDs do not.'),
        q('How many primary types can a node have?', ['Zero or more', 'Exactly one', 'Two', 'One per language'], 1, 'One primary type; any number of mixins.'),
        q('Why do references store a UUID?', ['It is shorter', 'It stays valid when the target moves or is renamed', 'Paths are not allowed', 'For caching'], 1, 'Identity survives moves.'),
      ],
      interviewQuestions: [
        iq({
          question: 'Path or UUID — when do you use each to address a JCR node?',
          difficulty: 'medium',
          short: t('Paths to find a place, UUIDs to point at a thing. Paths change on move or rename; UUIDs never do.', 'Jagah dhoondhne ke liye path, cheez ko point karne ke liye UUID. Move ya rename pe path badalta hai; UUID kabhi nahi.'),
          deep: t('Use a path for structural queries — "all articles under /sites/learnverse/contents/articles" — where position is the point. Store a UUID whenever one piece of content refers to another (author, image, related article), because authors move and rename things constantly and a stored path would silently break. Weakreference properties do exactly this.', 'Structural queries ke liye path — "/sites/learnverse/contents/articles ke neeche saare articles" — jahan position hi point hai. Jab ek content doosre ko refer kare (author, image, related article) toh UUID store karo, kyunki authors cheezein move-rename karte rehte hain aur stored path chupchaap toot jaata. Weakreference properties bilkul yahi karti hain.'),
          code: { code: "// GraphQL: by path\nnodeByPath(path: \"/sites/learnverse/contents/articles\") { name }\n// by identity\nnodeById(uuid: \"3f2a…c91\") { path }", note: 'Both lookups exist in Jahia GraphQL.' },
          tip: t('Say "weakreference stores the UUID" — it shows you understand why pickers survive renames.', '"weakreference UUID store karta hai" bolo — dikhata hai ki tum samajhte ho pickers rename kaise jhel lete hain.'),
        }),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 15,
        badges: ['coding'],
        searchTerms: ['node', 'property', 'path', 'uuid', 'identifier', 'parent', 'child', 'primary type'],
        files: [
          {
            filename: 'one node, fully described',
            language: 'text',
            code: 'path:          /sites/learnverse/contents/articles/welcome\nuuid:          3f2a8c10-…-c91\nprimary type:  lv:article\nmixins:        jmix:categorized, jmix:tagged\nparent:        /sites/learnverse/contents/articles\nchildren:      (none)\nproperties:\n  jcr:title       "Welcome to Learnverse"   (string, i18n: en)\n  jcr:title       "Learnverse में आपका स्वागत है"  (string, i18n: hi)\n  isFeatured      true                       (boolean)\n  image           9b1e…77a                   (weakreference → hero.jpg)\n  publishedDate   2026-09-10T00:00:00Z       (date)',
            highlight: [1, 2, 11],
            explain: t('Line 1 is where it is; line 2 is who it is. Line 11 points at another node by its UUID.', 'Line 1 batati hai kahan hai; line 2 batati hai kaun hai. Line 11 doosre node ko uske UUID se point karti hai.'),
          },
        ],
        where: [
          { app: 'Jahia Tools', path: ['JCR Browser', '/sites/learnverse/contents'], note: t('A developer tool that shows raw nodes and properties. Restrict it in production.', 'Developer tool jo raw nodes aur properties dikhata hai. Production mein restrict karo.') },
        ],
        challenge: {
          prompt: t('Which never changes when an author moves the node?', 'Author node move kare toh kya kabhi nahi badalta?'),
          code: '// after moving welcome to /contents/news/welcome\n// unchanged: ____',
          options: ['path', 'uuid', 'parent', 'name of parent'],
          answer: 1,
          explanation: t('The UUID is identity, not position.', 'UUID identity hai, position nahi.'),
          language: 'javascript',
        },
      },
    },
    {
      title: 'References — How One Node Points at Another',
      difficulty: 'medium',
      tags: ['jcr', 'references', 'weakreference', 'cnd', 'intermediate'],
      explanation: t(
        "Real content is connected: an article has an author, an image, a category, related articles. In Jahia these connections are REFERENCE properties — a property whose value is another node's UUID.\n\nThere are two kinds. A WEAKREFERENCE points at a node but does not protect it: the target can be deleted, and the reference then points at nothing. A REFERENCE (hard) protects the target — the repository refuses to delete a node that something still references.\n\nJahia content almost always uses weakreference, because authors must be free to delete an old image without hunting down every article that ever used it. The price is that your views must handle a missing target: if the author was deleted, render the article without an author box instead of crashing.\n\nIn the CND, a reference is constrained to the types it may point at — < 'lv:author' — and a selector decides the picker. In the Content Editor it becomes a picker; in the JCR it is a UUID; in your view you follow it to the target node and read that node's properties.",
        "Asli content juda hua hota hai: article ka author, image, category, related articles. Jahia mein ye connections REFERENCE properties hain — aisi property jiski value doosre node ka UUID hai.\n\nDo tarah ke hain. WEAKREFERENCE node ko point karta hai par bachata nahi: target delete ho sakta hai, aur reference phir kuch nahi point karta. REFERENCE (hard) target ko bachata hai — repository us node ko delete nahi karne deti jise koi abhi bhi refer kar raha ho.\n\nJahia content lagbhag hamesha weakreference use karta hai, kyunki authors ko purani image delete karne ki azaadi chahiye bina har us article ko dhoondhe jisne kabhi use kiya. Keemat ye hai ki tumhare views ko missing target handle karna padega: author delete ho gaya toh article ko author box ke bina render karo, crash mat karo.\n\nCND mein reference ko un types tak limit karte hain jinhe wo point kar sakta hai — < 'lv:author' — aur selector picker decide karta hai. Content Editor mein ye picker banta hai; JCR mein UUID; view mein tum usse target node tak jaake uski properties padhte ho."
      ),
      dailyLifeExample: t(
        'A phone contact saved as a number (weakreference): if your friend changes numbers, the contact now points nowhere, and your phone still works. A joint bank account (hard reference): the bank will not close it while the other holder still depends on it.',
        'Phone mein number se saved contact (weakreference): dost number badal de toh contact kahin point nahi karta, par phone chalta rehta hai. Joint bank account (hard reference): jab tak doosra holder depend hai, bank use band nahi karega.'
      ),
      keyPoints: [
        'A reference property stores the target UUID',
        'weakreference: target can be deleted — guard for null',
        'reference: blocks deleting the target — rarely right for content',
        'Constrain the target type with <',
      ],
      quiz: [
        q('Which reference type lets an author delete an image still used by an article?', ['reference', 'weakreference', 'binary', 'path'], 1, 'Weak references do not protect the target.'),
        q('The article\'s author was deleted. What should the view do?', ['Crash with an error', 'Render the article without the author block', 'Delete the article', 'Show the UUID'], 1, 'Always guard weak references for a missing target.'),
        q('Fix the CND so the picker only allows authors:\n\n- author (weakreference)', ["Add < 'lv:author'", 'Add mandatory', 'Add i18n', 'Change to string'], 0, 'The constraint restricts the target type.'),
      ],
      interviewQuestions: [
        iq({
          question: 'What is a weakreference in Jahia, and why is it preferred over reference?',
          difficulty: 'medium',
          short: t('A property storing another node\'s UUID without protecting it from deletion. Preferred because authors must be able to delete content freely; hard references block that.', 'Aisi property jo doosre node ka UUID store karti hai par use delete hone se nahi bachati. Isliye pasand ki jaati hai kyunki authors ko content azaadi se delete karna chahiye; hard references rok dete hain.'),
          deep: t('With hard references, deleting an image used by one forgotten article fails with a referential-integrity error, and authors cannot understand why. Weak references move that responsibility to rendering: views check the target exists. Jahia\'s pickers for images, files, pages and content are all weakreferences.', 'Hard references ke saath, ek bhooli hui article mein use hui image delete karna referential-integrity error se fail hota hai, aur authors ko samajh nahi aata kyun. Weak references ye zimmedaari rendering pe daal dete hain: views check karte hain target hai ya nahi. Jahia ke images, files, pages aur content ke saare pickers weakreference hain.'),
          code: { code: "- author (weakreference) < 'lv:author'\n\n<c:set var=\"a\" value=\"${currentNode.properties['author'].node}\"/>\n<c:if test=\"${not empty a}\">${a.properties['name'].string}</c:if>", note: 'Declare, then guard.' },
          tip: t('Mention the null-guard in the view — interviewers look for it.', 'View mein null-guard ka zikr karo — interviewers yahi dhoondhte hain.'),
        }),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 18,
        badges: ['coding', 'cms'],
        searchTerms: ['reference', 'weakreference', 'uuid', 'picker', 'link', 'relation', 'content reference', 'node picker'],
        views: {
          author: { text: t('Author sees a picker: "Select content…", chooses Priya Sharma.', 'Author ko picker dikhta hai: "Select content…", Priya Sharma chunta hai.'), field: { kind: 'picker-content', label: 'Author', value: 'Priya Sharma' } },
          developer: { text: t('Developer declares a weakreference constrained to lv:author.', 'Developer lv:author tak limited weakreference declare karta hai.'), code: "[lv:article] > jnt:content, jmix:editorialContent\n - author (weakreference) < 'lv:author'", language: 'cnd', filename: 'definitions.cnd' },
          jcr: { text: t('JCR stores the author node\'s UUID on the article.', 'JCR article pe author node ka UUID store karta hai.'), code: 'welcome (lv:article)\n  author = 5c77…e02   ──→   /sites/learnverse/contents/authors/priya (lv:author)', language: 'text' },
        },
        cmsVsCode: [
          { code: "- author (weakreference) < 'lv:author'", field: { kind: 'picker-content', label: 'Author', value: 'Priya Sharma' } },
          { code: "- related (weakreference) multiple < 'lv:article'", field: { kind: 'picker-content', label: 'Related articles', value: '2 items selected' } },
        ],
        files: [
          {
            filename: 'lv_article/html/article.jsp',
            path: 'src/main/resources/lv_article/html/',
            language: 'jsp',
            code: '<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>\n<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>\n\n<c:set var="author" value="${currentNode.properties[\'author\'].node}"/>\n<c:if test="${not empty author}">\n  <p class="byline">By ${author.properties[\'name\'].string}</p>\n</c:if>',
            highlight: [4, 5],
            explain: t('Line 4 follows the reference to the target node; line 5 guards for a deleted target.', 'Line 4 reference follow karke target node tak jaati hai; line 5 deleted target ke liye guard hai.'),
          },
        ],
        mistakes: [
          { title: t('Storing a path string instead of a reference', 'Reference ki jagah path string store karna'), detail: t('It breaks on rename and gives authors a text box instead of a picker.', 'Rename pe toot jaata hai aur authors ko picker ki jagah text box milta hai.'), fix: t('Use weakreference with a constraint.', 'Constraint ke saath weakreference use karo.') },
          { title: t('No null-guard in the view', 'View mein null-guard nahi'), fix: t('Always check the target exists before reading it.', 'Padhne se pehle hamesha check karo target hai.') },
        ],
        challenge: {
          prompt: t('Pick the type for "related articles" authors can delete freely.', '"Related articles" ke liye type chuno jise authors azaadi se delete kar sakein.'),
          code: "- related (____) multiple < 'lv:article'",
          options: ['reference', 'weakreference', 'string', 'binary'],
          answer: 1,
          explanation: t('weakreference keeps deletion free; guard in the view.', 'weakreference deletion free rakhta hai; view mein guard lagao.'),
        },
      },
    },
    fromLegacy('Two Workspaces — default and live', {
      codeLanguage: 'jsx',
      tags: ['jcr', 'publication', 'beginner'],
      quiz: [
        q('GraphQL for a public React app should query which workspace?', ['EDIT', 'LIVE', 'Either', 'None'], 1, 'Public data comes from LIVE; EDIT (default) holds unpublished drafts.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 12,
        badges: ['cms'],
        searchTerms: ['workspace', 'default', 'live', 'publish', 'edit', 'preview'],
        behind: {
          title: t('Two copies of the same tree', 'Ek hi tree ki do copies'),
          steps: [{ label: 'default', sub: 'authors edit here' }, { label: 'Publish', sub: 'copy node' }, { label: 'live', sub: 'visitors read here' }],
        },
        table: {
          title: t('default vs live', 'default vs live'),
          columns: ['', 'default', 'live'],
          rows: [
            ['Who writes', 'Authors (Save)', 'Publication only'],
            ['Who reads', 'Editors, preview', 'Visitors, public API'],
            ['GraphQL', 'workspace: EDIT', 'workspace: LIVE'],
            ['URL (typical)', '/cms/render/default/…', '/sites/… or /cms/render/live/…'],
          ],
        },
        where: [
          { app: 'jContent', path: ['Item', 'status badge'], note: t('Published / Modified / Not published.', 'Published / Modified / Not published.') },
        ],
        challenge: {
          prompt: t('A draft article must not appear in the public app. Which workspace does the app query?', 'Draft article public app mein nahi aana chahiye. App kaunsa workspace query kare?'),
          code: 'jcr(workspace: ____) { nodeByPath(path: "/sites/learnverse/contents/articles") { name } }',
          options: ['EDIT', 'LIVE'],
          answer: 1,
          explanation: t('LIVE only contains published content.', 'LIVE mein sirf published content hota hai.'),
          language: 'graphql',
        },
      },
    }),
    {
      title: 'Lab — Explore the Content Tree',
      difficulty: 'easy',
      tags: ['lab', 'jcr', 'beginner'],
      explanation: t(
        "Now look at the real repository behind the page you authored in module 02. You will find the page, its area and components, their types and properties, and the image they reference — and connect each node back to what you saw in the CMS.\n\nJahia ships developer tools for this (Jahia Tools, including a JCR browser). They show raw nodes, which is exactly what you want while learning and exactly what you must lock down in production. The same information is also available through GraphQL, which the lab uses as the second route.",
        "Ab us page ke peeche ki asli repository dekho jo tumne module 02 mein author kiya tha. Tum page, uska area aur components, unke types aur properties, aur jis image ko wo refer karte hain wo dhoondhoge — aur har node ko CMS mein dekhi cheez se jodoge.\n\nJahia iske liye developer tools deta hai (Jahia Tools, JCR browser samet). Ye raw nodes dikhate hain, jo seekhte waqt bilkul chahiye aur production mein bilkul lock hona chahiye. Yahi information GraphQL se bhi milti hai, jo lab ka doosra raasta hai."
      ),
      dailyLifeExample: t(
        'Opening the back panel of a TV you have been using for a month: now you see which wire goes to which button.',
        'Ek mahine se chal rahe TV ka peeche ka panel kholna: ab dikhta hai kaunsi wire kis button se judi hai.'
      ),
      keyPoints: ['Every CMS item has a node you can inspect', 'Types decide properties', 'References show up as UUIDs', 'Developer tools must be restricted in production'],
      quiz: [
        q('In the JCR browser, the image component shows a property holding "9b1e…77a". What is it?', ['A colour', 'The UUID of the referenced image file', 'A password', 'The page path'], 1, 'Reference properties hold UUIDs.'),
      ],
      lesson: {
        kind: 'lab',
        minutes: 25,
        badges: ['lab', 'hands-on'],
        searchTerms: ['lab', 'jcr browser', 'jahia tools', 'content tree', 'explore'],
        where: [
          { app: 'Jahia Tools', path: ['/tools', 'JCR Browser'], note: t('Location and name vary by version; requires a privileged account.', 'Location aur naam version ke hisaab se; privileged account chahiye.') },
          { app: 'Jahia Tools', path: ['GraphQL (GraphiQL)'] },
        ],
        steps: [
          { title: t('Open Jahia Tools and the JCR browser (as root, locally)', 'Jahia Tools aur JCR browser kholo (root, local pe)') },
          { title: t('Navigate to /sites/<your site>/home/news', '/sites/<tumhari site>/home/news tak jaao') },
          { title: t('Find the area node and list its children', 'Area node dhoondo aur uske children list karo') },
          { title: t('Open the image component; copy the UUID in its reference property', 'Image component kholo; uski reference property ka UUID copy karo') },
          { title: t('Run this query in GraphiQL with that UUID', 'Us UUID ke saath GraphiQL mein ye query chalao'), code: 'query {\n  jcr(workspace: EDIT) {\n    nodeById(uuid: "PASTE-UUID") {\n      path\n      primaryNodeType { name }\n    }\n  }\n}', language: 'graphql', filename: 'GraphiQL' },
          { title: t('Confirm the path points into /files', 'Confirm karo path /files mein point karta hai') },
        ],
        expected: { checks: ['✓ Found the page node', '✓ Listed area children', '✓ Found a reference UUID', '✓ Resolved it to the image file'] },
        mistakes: [
          { title: t('Editing properties in the JCR browser', 'JCR browser mein properties edit karna'), detail: t('It bypasses validation and workflow. Look, do not touch.', 'Ye validation aur workflow bypass karta hai. Dekho, chhuo mat.') },
        ],
      },
    },
  ],
};

/* ═══════════════════ 04 · LOCAL SETUP ═══════════════════ */

const setup = {
  title: 'Local Setup',
  stage: 4,
  level: 'beginner',
  estimatedMinutes: 45,
  description: t('Jahia running on your machine with Docker, and a checklist proving it works.', 'Tumhari machine pe Docker ke saath Jahia, aur checklist jo prove kare ki chal raha hai.'),
  concepts: [
    fromLegacy('Running Jahia Locally with Docker', {
      codeLanguage: 'bash',
      tags: ['setup', 'docker', 'beginner'],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['hands-on'],
        searchTerms: ['docker', 'compose', 'local', 'install', 'setup'],
        files: [
          {
            filename: 'docker-compose.yml',
            language: 'yaml',
            code: "services:\n  jahia:\n    # Use the image and tag from Jahia's current getting-started docs or\n    # your project template — they change between releases.\n    image: jahia/jahia-ee:8\n    ports:\n      - \"8080:8080\"\n    environment:\n      SUPER_USER_PASSWORD: root1234   # local only\n      MAX_RAM_PERCENTAGE: \"80\"\n    volumes:\n      - jahia-data:/var/jahia\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:8080/start\"]\n      interval: 30s\n      retries: 20\n\nvolumes:\n  jahia-data:",
            highlight: [5, 9, 12],
            explain: t('Line 5: the image — confirm the current name and tag in Jahia\'s docs. Line 9: the root password for local use only. Line 12: content survives restarts in a volume. Variable names can differ by image version.', 'Line 5: image — current naam aur tag Jahia docs mein confirm karo. Line 9: sirf local ke liye root password. Line 12: content volume mein restart ke baad bhi bachta hai. Variable names image version ke hisaab se alag ho sakte hain.'),
          },
        ],
        where: [
          { app: 'Terminal', path: ['project folder', 'docker compose up --wait'] },
          { app: 'Browser', path: ['http://localhost:8080'] },
        ],
        mistakes: [
          { title: t('Copying an old compose file from a blog', 'Blog se purani compose file copy karna'), fix: t('Take the compose file from Jahia\'s docs or your team\'s template.', 'Compose file Jahia docs ya team ke template se lo.') },
          { title: t('docker compose down -v by accident', 'Galti se docker compose down -v'), detail: t('-v deletes the volume — all local content.', '-v volume delete karta hai — saara local content.') },
        ],
      },
    }),
    {
      title: 'Lab — Your Local Jahia, Verified',
      difficulty: 'easy',
      tags: ['lab', 'setup', 'docker', 'beginner'],
      explanation: t(
        "A setup that \"mostly works\" costs you a day later, when you cannot tell whether a bug is in your code or your environment. This lab proves each layer, bottom up: the container is healthy, the server answers, you can log in, a site exists, the logs are readable, and a module can be deployed.\n\nKeep this checklist — rerun it whenever something strange happens before you debug your own code.",
        "Jo setup \"zyaadatar chalta hai\" wo baad mein ek din kha jaata hai, jab pata nahi chalta bug code mein hai ya environment mein. Ye lab har layer neeche se upar prove karta hai: container healthy hai, server jawab deta hai, login hota hai, site hai, logs padhe ja sakte hain, aur module deploy ho sakta hai.\n\nYe checklist sambhal ke rakho — kuch ajeeb ho toh apna code debug karne se pehle ise dobara chalao."
      ),
      dailyLifeExample: t(
        'Checking tyres, fuel and brakes before a long drive. Five minutes now, instead of a breakdown on the highway.',
        'Lambi drive se pehle tyre, petrol aur brake check karna. Abhi paanch minute, highway pe breakdown ki jagah.'
      ),
      keyPoints: ['Prove each layer bottom up', 'Keep a logs terminal open', 'Rerun the checklist before debugging code'],
      quiz: [
        q('Jahia answers on 8080 but your deploy fails with "connection refused". Most likely?', ['CND error', 'You deployed before Jahia had finished starting', 'Browser cache', 'Wrong language'], 1, 'Wait for readiness (docker compose up --wait).'),
      ],
      lesson: {
        kind: 'lab',
        minutes: 25,
        badges: ['lab', 'hands-on'],
        searchTerms: ['lab', 'setup', 'verify', 'docker', 'logs'],
        steps: [
          { title: t('Start and wait for health', 'Start karo aur health ka intezaar karo'), code: 'docker compose up --wait\ndocker compose ps', language: 'bash', filename: 'terminal' },
          { title: t('Open a second terminal on the logs', 'Doosre terminal mein logs kholo'), code: 'docker compose logs -f jahia', language: 'bash', filename: 'terminal' },
          { title: t('Log in at http://localhost:8080', 'http://localhost:8080 pe login karo') },
          { title: t('Create a site "learnverse" with English as default (from a template set that is available)', '"learnverse" site banao, English default (jo template set available ho)') },
          { title: t('Open Administration → Modules and find the list of installed modules', 'Administration → Modules kholo aur installed modules ki list dhoondo') },
          { title: t('Restart the container and confirm the site is still there', 'Container restart karo aur confirm karo site abhi bhi hai'), code: 'docker compose restart jahia', language: 'bash', filename: 'terminal' },
        ],
        expected: { checks: ['✓ Container healthy', '✓ Logs streaming', '✓ Logged in', '✓ Site created', '✓ Modules list found', '✓ Content survived restart'] },
        debug: [
          {
            title: t('Jahia never becomes healthy', 'Jahia kabhi healthy nahi hota'),
            problem: t('The container restarts or stays "starting".', 'Container restart hota rehta hai ya "starting" pe atka hai.'),
            causes: ['Not enough memory for Docker', 'Port 8080 already used', 'Wrong image tag'],
            where: ['docker compose logs jahia', 'Docker Desktop → Resources'],
            fix: t('Give Docker more RAM, free port 8080, and use the documented image.', 'Docker ko zyaada RAM do, port 8080 free karo, aur documented image use karo.'),
            prevention: t('Pin the image tag in the compose file.', 'Compose file mein image tag pin karo.'),
          },
        ],
      },
    },
  ],
};

export const beginnerModules = [prerequisites, fundamentals, authoring, jcr, setup];
export { CHAIN };
