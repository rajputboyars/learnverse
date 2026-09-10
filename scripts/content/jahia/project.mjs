// PROJECT — module 18: the Learnverse News Portal, mini projects and the
// final assessment.

import { t, q, iq, CHAIN } from './helpers.mjs';
import { MINI_PROJECTS, FINAL_REQUIREMENTS, PROJECT } from '../../../src/data/jahia/project.js';

const finalProject = {
  title: 'Final Project',
  stage: 18,
  level: 'project',
  estimatedMinutes: 360,
  description: t('Learnverse News Portal — Jahia Edition: the brief, five mini projects, the build, and the final assessment.', 'Learnverse News Portal — Jahia Edition: brief, paanch mini projects, build, aur final assessment.'),
  concepts: [
    {
      title: 'Final Project — Learnverse News Portal Brief',
      difficulty: 'medium',
      tags: ['project', 'advanced'],
      explanation: t(
        "You have built the News Portal in pieces across the course. The final project is to finish it, as one coherent application, to the brief below — the way a client would hand it to you.\n\nThe brief: a news portal for Learnverse on Jahia, with two sites (learnverse.com in English, learnverse.in in English and Hindi), authored by a small team with review before publication, and a React card on the home page fed by GraphQL.\n\nContent types: lv:article, lv:author, lv:category (or core categories), lv:video, lv:gallery, lv:hero, lv:cta.\nPages: Home, News, Article Details, Categories, About, Contact.\nFeatures: CMS authoring for every type, images, videos, rich text, references, categories, authors, search, English + Hindi, a review workflow, roles for five users, GraphQL, declared cache dependencies, and a responsive frontend.\n\nThe definition of done is the requirements checklist on the project board. Treat it like a client acceptance test: a feature is done when an author can use it and a visitor can see it — not when the code compiles.",
        "Tumne poore course mein News Portal tukdon mein banaya. Final project use khatam karna hai, ek coherent application ki tarah, neeche ke brief ke hisaab se — jaise client dega.\n\nBrief: Jahia pe Learnverse ka news portal, do sites ke saath (learnverse.com English mein, learnverse.in English aur Hindi mein), ek chhoti team author karti hai aur publication se pehle review hota hai, aur home page pe GraphQL se chalne wala React card.\n\nContent types: lv:article, lv:author, lv:category (ya core categories), lv:video, lv:gallery, lv:hero, lv:cta.\nPages: Home, News, Article Details, Categories, About, Contact.\nFeatures: har type ki CMS authoring, images, videos, rich text, references, categories, authors, search, English + Hindi, review workflow, paanch users ke roles, GraphQL, declared cache dependencies, aur responsive frontend.\n\nDefinition of done project board pe requirements checklist hai. Ise client acceptance test ki tarah lo: feature tab done hai jab author use kar sake aur visitor dekh sake — jab code compile ho jaaye tab nahi."
      ),
      dailyLifeExample: t(
        'A final-year project viva: you do not get marks for the parts you built in class; you get marks for the whole thing working in front of the examiner.',
        'Final-year project viva: class mein banaye tukdon ke marks nahi milte; examiner ke saamne poori cheez chalne ke marks milte hain.'
      ),
      keyPoints: ['Seven types, six pages, two sites', 'Review workflow and five roles', 'GraphQL card + server views', 'Done = an author can use it and a visitor can see it'],
      quiz: [
        q('When is a project feature "done"?', ['When the code compiles', 'When an author can use it and a visitor can see it live', 'When the CND deploys', 'When GraphiQL returns data'], 1, 'Acceptance is end to end.'),
      ],
      lesson: {
        kind: 'project',
        minutes: 30,
        badges: ['project'],
        scope: 'custom',
        searchTerms: ['final project', 'news portal', 'brief', 'requirements', 'capstone'],
        build: { text: t(PROJECT.name, PROJECT.name), flow: CHAIN },
        table: {
          title: t('Requirements', 'Requirements'),
          columns: ['Group', 'Items'],
          rows: FINAL_REQUIREMENTS.map((g) => [g.group, g.items.join(' · ')]),
        },
        where: [{ app: 'Browser', path: ['/courses/jahia/toolkit/project'], note: t('Phases, data model, checklist.', 'Phases, data model, checklist.') }],
      },
    },
    {
      title: 'Mini Projects — Five Smaller Builds',
      difficulty: 'medium',
      tags: ['project', 'lab', 'cnd', 'intermediate'],
      explanation: t(
        "Before the full portal, five smaller builds, each practising one slice of the course with less at stake: an Employee Directory (one type, one list), a Blog (rich text, dates, tags, detail page), a News Portal starter (references between types), a Media Library (images, video, PDFs, galleries with child nodes) and a Product Catalog (numbers, constraints, filtering and pagination over GraphQL).\n\nDo them in order. Each brief lists the CND to start from and the steps; the project board shows them in full. Finishing all five is the best preparation for the final build — and a good portfolio on its own.",
        "Poore portal se pehle, paanch chhote builds, har ek course ka ek hissa kam risk ke saath practice karata hai: Employee Directory (ek type, ek list), Blog (rich text, dates, tags, detail page), News Portal starter (types ke beech references), Media Library (images, video, PDFs, child nodes wali galleries) aur Product Catalog (numbers, constraints, GraphQL pe filtering aur pagination).\n\nOrder mein karo. Har brief mein shuru ki CND aur steps hain; project board unhe poora dikhata hai. Paancho khatam karna final build ki sabse achhi taiyaari hai — aur khud mein ek achha portfolio."
      ),
      dailyLifeExample: t('Nets practice before a match: short, focused sessions, one shot at a time.', 'Match se pehle nets practice: chhote, focused sessions, ek-ek shot.'),
      keyPoints: MINI_PROJECTS.map((m) => `${m.title} — ${m.goal}`),
      quiz: [
        q('Which mini project practises GraphQL filtering and pagination?', ['Employee Directory', 'Blog', 'Product Catalog', 'Media Library'], 2, 'The catalog filters by category and paginates.'),
        q('Which mini project uses child nodes with orderable?', ['Media Library (gallery items)', 'Blog', 'Employee Directory', 'News starter'], 0, 'Galleries hold orderable items.'),
      ],
      lesson: {
        kind: 'project',
        minutes: 60,
        badges: ['project', 'coding'],
        scope: 'custom',
        searchTerms: ['mini projects', 'employee directory', 'blog', 'media library', 'product catalog', 'portfolio'],
        files: MINI_PROJECTS.map((m) => ({ filename: `${m.title} — definitions.cnd`, language: 'cnd', code: m.types, explain: `${m.level} · ~${m.minutes} min · ${m.steps.join(' → ')}` })),
      },
    },
    {
      title: 'Final Project — Build, Review and Ship',
      difficulty: 'hard',
      tags: ['project', 'production', 'advanced'],
      explanation: t(
        "Build the portal against the requirements, then ship it the way you would ship to a client.\n\nBUILD in the order the course taught: module and types, views and components, authoring content for every page, second site and Hindi, users and workflow, GraphQL card, cache dependencies. Commit after each working step.\n\nREVIEW like a stranger: log in as author.priya and create an article from scratch with an image, a video, a category and a related article, and request publication. Log in as reviewer.sam and accept it. Open both sites in a private window on a phone-sized viewport. Change an author's name and confirm every card updates. Run your GraphQL query as an anonymous user.\n\nSHIP with the production checklist: a versioned module, notes on what to configure per environment, and a short handover for authors.\n\nMark this lesson done only when every requirement on the project board is ticked.",
        "Requirements ke hisaab se portal banao, phir waise ship karo jaise client ko karte.\n\nBUILD usi order mein jo course ne sikhaya: module aur types, views aur components, har page ka content author karna, doosri site aur Hindi, users aur workflow, GraphQL card, cache dependencies. Har working step ke baad commit.\n\nREVIEW ajnabi ki tarah: author.priya se login karke shuru se article banao — image, video, category aur related article ke saath — aur publication request karo. reviewer.sam se login karke accept karo. Dono sites private window mein phone-size viewport pe kholo. Author ka naam badlo aur confirm karo har card update hota hai. Apni GraphQL query anonymous user ki tarah chalao.\n\nSHIP production checklist ke saath: versioned module, har environment mein kya configure karna hai uske notes, aur authors ke liye chhota handover.\n\nYe lesson tabhi done mark karo jab project board ki har requirement tick ho."
      ),
      dailyLifeExample: t('Moving into a house you built: you check every tap, every switch and every lock yourself before you hand over the keys.', 'Khud banaye ghar mein shift hona: chaabi dene se pehle har nal, har switch aur har taala khud check karte ho.'),
      keyPoints: ['Build in course order, commit often', 'Review as author, reviewer and visitor', 'Ship with the production checklist'],
      quiz: [
        q('How do you verify the cache dependency work?', ['Flush all caches and look', 'Change an author\'s name, publish, and confirm every card updates', 'Restart Docker', 'Read the CND'], 1, 'Test the real invalidation path.'),
        q('Why test as author.priya rather than root?', ['Root is slower', 'Root bypasses the permissions and workflow you built', 'Authors see more', 'It is required by Jahia'], 1, 'Root hides permission and workflow bugs.'),
      ],
      interviewQuestions: [
        iq({
          question: 'Describe a Jahia project you built end to end.',
          difficulty: 'hard',
          short: t('Use the News Portal: content model (seven types with references), views and components, two sites with English/Hindi, roles and a review workflow, a GraphQL-fed React card, cache dependencies, and a production checklist.', 'News Portal use karo: content model (references wale saat types), views aur components, English/Hindi ke saath do sites, roles aur review workflow, GraphQL se chalne wala React card, cache dependencies, aur production checklist.'),
          deep: t('Structure the answer as decisions: why weakreferences for authors and images, what is i18n and what is shared, why server views by default and GraphQL only for the interactive card, how you proved permissions, and the stale-card bug you fixed with a cache dependency.', 'Jawab decisions ki tarah do: authors aur images ke liye weakreference kyun, kya i18n aur kya shared, default server views aur sirf interactive card ke liye GraphQL kyun, permissions kaise prove kiye, aur cache dependency se theek kiya stale-card bug.'),
          tip: t('Tell one bug story — interviewers remember those.', 'Ek bug ki kahani sunao — interviewers wahi yaad rakhte hain.'),
        }),
      ],
      lesson: {
        kind: 'project',
        minutes: 240,
        badges: ['project', 'coding', 'cms'],
        scope: 'custom',
        searchTerms: ['final build', 'ship', 'review', 'acceptance', 'news portal'],
        steps: [
          { title: t('Types: lv:article, lv:author, lv:video, lv:gallery, lv:hero, lv:cta (+ categories)', 'Types: lv:article, lv:author, lv:video, lv:gallery, lv:hero, lv:cta (+ categories)') },
          { title: t('Views: default + card for article; default for every other type', 'Views: article ke default + card; baaki har type ka default') },
          { title: t('Pages: Home, News, Article Details, Categories, About, Contact', 'Pages: Home, News, Article Details, Categories, About, Contact') },
          { title: t('Second site learnverse.in with Hindi', 'Doosri site learnverse.in, Hindi ke saath') },
          { title: t('Five users, groups, roles; review workflow', 'Paanch users, groups, roles; review workflow') },
          { title: t('GraphQL React card on Home', 'Home pe GraphQL React card') },
          { title: t('Cache dependencies on every referenced node you print', 'Print kiye har referenced node pe cache dependency') },
          { title: t('Review as author, reviewer and anonymous visitor on a phone viewport', 'Author, reviewer aur anonymous visitor ki tarah phone viewport pe review') },
          { title: t('Walk the production checklist; version the module', 'Production checklist chalo; module version karo') },
        ],
        expected: { checks: FINAL_REQUIREMENTS.flatMap((g) => g.items.map((i) => `✓ ${i}`)) },
      },
    },
    {
      title: 'Final Assessment',
      difficulty: 'hard',
      tags: ['assessment', 'advanced'],
      explanation: t(
        "Ten questions across the whole course: authoring, the JCR, CND, node types, views, GraphQL, languages, permissions, workflow and caching. Pass it (60% or more) to complete the final assessment requirement for the certificate.\n\nThey are scenario questions — each describes something you would meet on a project and asks what you would do. If you miss one, the explanation points at the lesson to revisit.",
        "Poore course pe das sawaal: authoring, JCR, CND, node types, views, GraphQL, languages, permissions, workflow aur caching. Certificate ki final assessment requirement ke liye pass karo (60% ya zyaada).\n\nYe scenario questions hain — har ek project pe milne wali situation batata hai aur poochta hai tum kya karoge. Koi galat ho toh explanation batata hai kaunsa lesson dobara dekhna hai."
      ),
      dailyLifeExample: t('The driving test after the lessons: not the rules on paper, but whether you can drive.', 'Lessons ke baad driving test: kaagaz pe rules nahi, balki kya tum chala sakte ho.'),
      keyPoints: ['Ten scenario questions', '60% to pass', 'Explanations name the lesson to revisit'],
      quiz: [
        q('An author says the "Featured" field is missing from the article form after your deploy. First check?', ['Flush caches', 'Is the new definition registered (Definitions browser) and is the property not hidden?', 'Restart Docker', 'GraphQL schema'], 1, 'Revisit: Property Attributes.'),
        q('You created:\n\n- image (weakreference)\n\nWhat will the author see, and what does the JCR store?', ['A text box; a URL', 'A picker; the target node\'s UUID', 'A checkbox; a boolean', 'Nothing; binary data'], 1, 'Revisit: References.'),
        q('The Hindi page shows the English headline. Which is NOT a possible cause?', ['Hindi value empty', 'Hindi not published', 'Property not i18n', 'The image is not i18n'], 3, 'Revisit: Languages and Multi-site.'),
        q('lv:news > lv:article has no views. What renders?', ['Error', 'lv:article\'s default view', 'Nothing', 'JSON'], 1, 'Revisit: How Jahia Picks a View.'),
        q('Component deployed, not in "New content". Two checks?', ['i18n and colour', 'Category/droppable mixin and module enabled on the site', 'Cache and CDN', 'Docker and Git'], 1, 'Revisit: Making It Droppable.'),
        q('A public React app queries EDIT. Problem?', ['None', 'It exposes unpublished content and needs credentials — use LIVE', 'EDIT is faster', 'EDIT has no language'], 1, 'Revisit: Two Workspaces.'),
        q('An author cannot publish; the button says "Request publication". Is this a bug?', ['Yes', 'No — without publish permission, publishing becomes a workflow request', 'Only in Hindi', 'Only on Sundays'], 1, 'Revisit: A Real Workflow.'),
        q('Article cards show an author\'s old name after the author was edited and published. Fix?', ['Flush all caches daily', 'Declare the author node as a cache dependency in the card view', 'Make the name i18n', 'Use GraphQL'], 1, 'Revisit: Why Am I Still Seeing the Old Content?'),
        q('Where does the JSP card view of lv:article live?', ['META-INF/card.jsp', 'lv_article/html/article.card.jsp', 'lv:article/card.jsp', 'resources/card.properties'], 1, 'Revisit: Anatomy of a Module.'),
        q('Best way to grant the news team edit rights?', ['Grant each person a role on each page', 'Grant a role to the news-authors group on the contents folder', 'Share the root password', 'Edit the CND'], 1, 'Revisit: Create Five Users and Their Roles.'),
      ],
      lesson: {
        kind: 'assessment',
        minutes: 30,
        badges: ['hands-on'],
        searchTerms: ['final assessment', 'exam', 'test', 'quiz', 'certificate'],
        objectives: [t('Pass the ten-question quiz below (60%)', 'Neeche ka das sawaal ka quiz pass karo (60%)'), t('Revisit any lesson named in a missed question', 'Galat sawaal mein bataya lesson dobara dekho')],
      },
    },
  ],
};

export const projectModules = [finalProject];
