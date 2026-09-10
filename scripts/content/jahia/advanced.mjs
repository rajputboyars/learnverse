// ADVANCED — modules 13 to 17: permissions, workflow, caching,
// debugging & performance, production.

import { t, q, iq, shot, fromLegacy } from './helpers.mjs';
import { DEBUG_ERRORS } from '../../../src/data/jahia/debugging.js';

/* ═══════════════════ 13 · PERMISSIONS ═══════════════════ */

const permissions = {
  title: 'Permissions',
  stage: 13,
  level: 'advanced',
  estimatedMinutes: 60,
  description: t('Roles, permissions and inheritance — practised with five real users.', 'Roles, permissions aur inheritance — paanch asli users ke saath practice.'),
  concepts: [
    fromLegacy('Permissions, Roles and Workflow', {
      codeLanguage: 'jsx',
      tags: ['permissions', 'workflow', 'advanced'],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['cms'],
        searchTerms: ['permissions', 'roles', 'acl', 'inheritance', 'jcr:write', 'security'],
        behind: { title: t('How a permission is decided', 'Permission kaise decide hoti hai'), steps: ['User', { label: 'Groups', sub: 'membership' }, { label: 'Roles', sub: 'granted on nodes' }, { label: 'Inheritance', sub: 'walk up the tree' }, { label: 'Permission', sub: 'allowed / denied' }] },
        where: [
          { app: 'Administration', path: ['Users and Roles', 'Roles'], note: t('What each role contains.', 'Har role mein kya hai.') },
          { app: 'jContent', path: ['Select folder', '⋮', 'Manage roles / permissions'], note: t('Where roles are granted on a node (label varies).', 'Jahan node pe roles grant hote hain (label alag ho sakta hai).') },
        ],
      },
    }),
    {
      title: 'Lab — Create Five Users and Their Roles',
      difficulty: 'hard',
      tags: ['lab', 'permissions', 'advanced'],
      explanation: t(
        "Stop doing everything as root. You will create the five people of the News Portal team and give each one exactly the access their job needs:\n\n• Admin — server administrator (you already have root).\n• Developer — can deploy and inspect, does not publish content.\n• Editor — the site's editor-in-chief: edits everything, publishes.\n• Reviewer — approves publication requests.\n• Author — edits content in /contents/articles only, cannot publish; publishing becomes a request.\n\nRules that keep this manageable: grant roles to GROUPS, never to individuals; grant them at the highest folder that should inherit them; keep the list of roles short. Then log in as each user in a private window and try something they should not be able to do. A permission you have not tested is a permission you do not have.\n\nRole names shipped with Jahia (editor, reviewer, editor-in-chief, contributor, site-administrator…) vary by version — look at the Roles screen and pick the closest match.",
        "Sab kuch root se karna band karo. Tum News Portal team ke paanch log banaoge aur har ek ko bas utna access doge jitna kaam ko chahiye:\n\n• Admin — server administrator (root pehle se hai).\n• Developer — deploy aur inspect kar sake, content publish nahi.\n• Editor — site ka editor-in-chief: sab edit, publish bhi.\n• Reviewer — publication requests approve kare.\n• Author — sirf /contents/articles mein content edit, publish nahi; publish request ban jaata hai.\n\nRules jo ise sambhalne layak rakhte hain: roles GROUPS ko do, individuals ko kabhi nahi; sabse upar ke us folder pe do jahan se inherit hona chahiye; roles ki list chhoti rakho. Phir har user se private window mein login karke aisa kuch try karo jo unhe nahi karna chahiye. Jo permission test nahi ki, wo permission tumhare paas hai hi nahi.\n\nJahia ke saath aane wale role names (editor, reviewer, editor-in-chief, contributor, site-administrator…) version ke hisaab se badalte hain — Roles screen dekho aur sabse kareeb wala chuno."
      ),
      dailyLifeExample: t(
        'Office keycards: interns open the main door and the canteen; managers also open the meeting rooms; only IT opens the server room. Cards are issued by team (group), and every new intern gets the intern card automatically.',
        'Office keycards: interns main door aur canteen khol sakte hain; managers meeting rooms bhi; server room sirf IT. Cards team (group) ke hisaab se milte hain, aur har naye intern ko apne aap intern card.'
      ),
      keyPoints: ['Roles → groups, not people', 'Grant at the highest inheriting folder', 'Test every role in a private window', 'Role names vary by version'],
      quiz: [
        q('The author can edit articles but gets "access denied" on authors. Why?', ['Bug in Jahia', 'The role was granted on /contents/articles, not on a common ancestor', 'Wrong language', 'Cache'], 1, 'Roles inherit downwards from where they are granted.'),
        q('Best practice for granting roles?', ['To each user on each page', 'To groups, at folder level', 'To root only', 'In the CND'], 1, 'Groups at folder level.'),
      ],
      lesson: {
        kind: 'lab',
        minutes: 40,
        badges: ['lab', 'cms'],
        searchTerms: ['lab', 'users', 'roles', 'groups', 'author', 'reviewer', 'editor', 'permissions matrix'],
        cards: {
          heading: t('The five users', 'Paanch users'),
          items: [
            { label: 'Admin', icon: 'server', summary: t('Server administrator. Already exists (root).', 'Server administrator. Pehle se hai (root).'), does: ['Everything'], tools: ['Administration', 'Jahia Tools'] },
            { label: 'Developer', icon: 'code', summary: t('Deploys modules; reads content; does not publish.', 'Modules deploy karta hai; content padhta hai; publish nahi.'), does: ['Deploy modules (server role)', 'Read site content'], tools: ['Administration → Modules'] },
            { label: 'Editor', icon: 'pen', summary: t('Editor-in-chief of learnverse.', 'learnverse ka editor-in-chief.'), does: ['Edit everything on the site', 'Publish'], tools: ['jContent', 'Page Composer'] },
            { label: 'Reviewer', icon: 'eye', summary: t('Approves publication requests.', 'Publication requests approve karta hai.'), does: ['Receive tasks', 'Accept / reject'], tools: ['Workflow tasks'] },
            { label: 'Author', icon: 'pen', summary: t('Writes articles; cannot publish.', 'Articles likhta hai; publish nahi kar sakta.'), does: ['Edit /contents/articles', 'Request publication'], tools: ['jContent'] },
          ],
        },
        table: {
          title: t('Permission matrix', 'Permission matrix'),
          columns: ['Group', 'Granted on', 'Role (closest built-in)'],
          rows: [
            ['news-authors', '/sites/learnverse/contents', 'editor-like role without publish'],
            ['news-reviewers', '/sites/learnverse', 'reviewer'],
            ['news-editors', '/sites/learnverse', 'editor-in-chief'],
            ['developers', 'server', 'module / developer role'],
          ],
        },
        steps: [
          { title: t('Create users: dev.rahul, editor.anita, reviewer.sam, author.priya', 'Users banao: dev.rahul, editor.anita, reviewer.sam, author.priya') },
          { title: t('Create groups: developers, news-editors, news-reviewers, news-authors; add each user', 'Groups banao: developers, news-editors, news-reviewers, news-authors; har user add karo') },
          { title: t('Grant roles to groups following the matrix', 'Matrix ke hisaab se groups ko roles do') },
          { title: t('Private window: log in as author.priya, edit an article, try to publish', 'Private window: author.priya se login, article edit, publish try karo'), detail: t('Expected: publish becomes "request publication".', 'Expected: publish "request publication" ban jaata hai.') },
          { title: t('As author.priya, try to open Administration → Modules', 'author.priya se Administration → Modules kholne ki koshish karo'), detail: t('Expected: not available.', 'Expected: available nahi.') },
          { title: t('As editor.anita, publish directly', 'editor.anita se seedha publish karo') },
        ],
        expected: { checks: ['✓ 4 users + root', '✓ 4 groups', '✓ Roles on groups', '✓ Author cannot publish', '✓ Author cannot reach modules', '✓ Editor can publish'] },
        debug: [DEBUG_ERRORS.find((d) => d.id === 'permission-denied')],
      },
    },
  ],
};

/* ═══════════════════ 14 · WORKFLOW ═══════════════════ */

const workflow = {
  title: 'Workflow',
  stage: 14,
  level: 'advanced',
  estimatedMinutes: 45,
  description: t('Author → submit → reviewer → approve → publish, clicked through for real.', 'Author → submit → reviewer → approve → publish, sach mein click karke.'),
  concepts: [
    {
      title: 'Author → Reviewer → Publish — A Real Workflow',
      difficulty: 'medium',
      tags: ['workflow', 'publication', 'authoring', 'cms', 'advanced'],
      explanation: t(
        "With the users from the last lab, the publication workflow happens by itself: an author without the publish permission cannot publish, so the publish action becomes a REQUEST. That request starts a workflow — Jahia's default is a one-step review — which creates a TASK for users with the reviewer role. The reviewer opens the task, previews the change, and accepts (the content is published) or rejects with a comment (it goes back to the author).\n\nWhat to know as an author: where the request action is, how to add a comment for the reviewer, and where to see that your request is pending. As a reviewer: where tasks appear (the dashboard / tasks area — exact place varies by version), how to preview exactly what will change, and that rejecting with a reason is part of the job. As a developer: that workflows are configurable (steps, which roles), and that unpublished references still need publishing — a request for an article may need to include its new image.\n\nThe workflow is Jahia's answer to \"legal must approve before it goes live\". It is slower than publishing directly, and that is the point.",
        "Pichhle lab ke users ke saath, publication workflow apne aap hota hai: jiske paas publish permission nahi wo publish nahi kar sakta, toh publish action REQUEST ban jaata hai. Wo request ek workflow shuru karti hai — Jahia ka default one-step review hai — jo reviewer role wale users ke liye ek TASK banata hai. Reviewer task kholta hai, change preview karta hai, aur accept karta hai (content publish) ya comment ke saath reject (author ke paas wapas).\n\nAuthor ki tarah kya jaano: request action kahan hai, reviewer ke liye comment kaise do, aur kahan dikhta hai ki request pending hai. Reviewer ki tarah: tasks kahan aate hain (dashboard / tasks area — jagah version pe depend), bilkul kya badlega uska preview kaise karein, aur wajah ke saath reject karna bhi kaam ka hissa hai. Developer ki tarah: workflows configurable hain (steps, kaunse roles), aur unpublished references ko bhi publish chahiye — article ki request mein uski nayi image bhi shaamil karni pad sakti hai.\n\nWorkflow Jahia ka jawab hai \"live hone se pehle legal approve kare\". Seedha publish karne se dheema hai, aur yahi point hai."
      ),
      dailyLifeExample: t(
        'Submitting a leave application: you fill it (author), it goes to your manager\'s inbox (task), the manager approves or sends it back with a note (reviewer), and only then HR records it (publish).',
        'Chhutti ki application: tum bharte ho (author), manager ke inbox mein jaati hai (task), manager approve karta hai ya note ke saath wapas bhejta hai (reviewer), tabhi HR record karta hai (publish).'
      ),
      keyPoints: ['No publish permission → request', 'Request → workflow → task for reviewers', 'Accept publishes; reject returns with a comment', 'Include new references in the request'],
      quiz: [
        q('Where does the reviewer act on a publication request?', ['In the CND', 'In their workflow tasks', 'In Docker logs', 'In GraphiQL'], 1, 'Requests appear as tasks.'),
        q('The reviewer accepted, but the article\'s new image is broken live. Why?', ['Workflow bug', 'The image was not part of the publication', 'Language', 'Cache key'], 1, 'References must be published too.'),
      ],
      interviewQuestions: [
        iq({
          question: 'How does publication workflow work in Jahia?',
          difficulty: 'medium',
          short: t('Users without publish permission request publication; a workflow creates a task for reviewers; accepting publishes default → live, rejecting returns it with a comment.', 'Bina publish permission wale users publication request karte hain; workflow reviewers ke liye task banata hai; accept default → live publish karta hai, reject comment ke saath wapas.'),
          deep: t('It is driven by permissions and roles, so turning workflow on for a group is a matter of withholding publish and granting review to another group. Workflows can have more steps (e.g. legal then editorial). Publication includes choices about sub-pages, languages and references.', 'Ye permissions aur roles se chalta hai, toh kisi group pe workflow lagana matlab publish na dena aur doosre group ko review dena. Workflows mein zyaada steps ho sakte hain (jaise legal phir editorial). Publication mein sub-pages, languages aur references ke choices hote hain.'),
          example: t('A bank: authors write, legal reviews, marketing publishes.', 'Bank: authors likhte hain, legal review karta hai, marketing publish.'),
          tip: t('Connect it to permissions — workflow is a consequence of who may publish.', 'Ise permissions se jodo — workflow is baat ka nateeja hai ki kaun publish kar sakta hai.'),
        }),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 25,
        badges: ['cms', 'hands-on'],
        searchTerms: ['workflow', 'request publication', 'reviewer', 'task', 'approve', 'reject', 'one step'],
        build: { text: t('The review loop the News Portal uses.', 'News Portal ka review loop.'), flow: { steps: ['Author', 'Submit', 'Reviewer', 'Approve', 'Publish'], highlight: 3 } },
        screenshots: [
          shot({
            src: '/images/jahia/workflow/workflow-request-publication.png',
            title: t('Author: request publication', 'Author: request publication'),
            description: t('Shown instead of Publish when the author lacks the permission.', 'Jab author ke paas permission nahi toh Publish ki jagah dikhta hai.'),
            mock: {
              app: 'jContent', nav: ['Pages', 'Content Folders', 'Media'], active: 'Content Folders',
              breadcrumb: ['contents', 'articles', 'jahia-8-2-released'],
              panel: 'form', formTitle: 'Request publication',
              fields: [
                { label: 'Items', kind: 'children', value: ['jahia-8-2-released (article)', 'release-cover.jpg (image)'], marker: 1 },
                { label: 'Comment for the reviewer', kind: 'textarea', value: 'Ready — facts checked against the release notes.', marker: 2 },
              ],
              toolbar: [{ label: 'Start workflow', primary: true, marker: 3 }],
            },
            markers: [t('Include the new image in the request', 'Nayi image request mein shaamil karo'), t('Tell the reviewer what to check', 'Reviewer ko batao kya check kare'), t('Starts the workflow; a task goes to reviewers', 'Workflow shuru; reviewers ko task jaata hai')],
          }),
          shot({
            src: '/images/jahia/workflow/workflow-reviewer-task.png',
            title: t('Reviewer: the task', 'Reviewer: task'),
            description: t('Preview, then accept or reject with a reason.', 'Preview karo, phir accept ya wajah ke saath reject.'),
            mock: {
              app: 'Dashboard · Tasks', nav: ['My tasks', 'My workflows'], active: 'My tasks',
              panel: 'list',
              items: [{ label: 'Publication: jahia-8-2-released', meta: 'from author.priya', marker: 1, active: true }],
              toolbar: [{ label: 'Preview', marker: 2 }, { label: 'Accept', primary: true, marker: 3 }, { label: 'Reject' }],
            },
            markers: [t('The pending request', 'Pending request'), t('See exactly what will change', 'Bilkul kya badlega dekho'), t('Accept publishes to live', 'Accept live publish karta hai')],
          }),
        ],
        steps: [
          { title: t('As author.priya: edit an article and add a new image', 'author.priya: article edit karo aur nayi image lagao') },
          { title: t('Request publication; include the image; add a comment', 'Publication request karo; image shaamil karo; comment do') },
          { title: t('As reviewer.sam: open tasks, preview, REJECT with "please add a summary"', 'reviewer.sam: tasks kholo, preview, "please add a summary" ke saath REJECT') },
          { title: t('As author.priya: fix and request again', 'author.priya: theek karke dobara request') },
          { title: t('As reviewer.sam: ACCEPT', 'reviewer.sam: ACCEPT') },
          { title: t('Check the article and image live in a private window', 'Private window mein article aur image live check karo') },
        ],
        expected: { checks: ['✓ Request created', '✓ Task received', '✓ Rejected with a comment', '✓ Resubmitted', '✓ Accepted', '✓ Live, with image'] },
      },
    },
  ],
};

/* ═══════════════════ 15 · CACHING ═══════════════════ */

const caching = {
  title: 'Caching',
  stage: 15,
  level: 'advanced',
  estimatedMinutes: 75,
  description: t('Browser, CDN and Jahia fragment caches — learned through the "why is it still old?" problem.', 'Browser, CDN aur Jahia fragment caches — "abhi bhi purana kyun?" problem se seekho.'),
  concepts: [
    fromLegacy('The HTML Fragment Cache', {
      codeLanguage: 'jsx',
      tags: ['caching', 'performance', 'advanced'],
      lesson: {
        kind: 'lesson',
        minutes: 25,
        badges: ['coding'],
        searchTerms: ['cache', 'fragment cache', 'cache key', 'dependency', 'expiration', 'personalized', 'perUser'],
        behind: { title: t('A page is assembled from cached fragments', 'Page cached fragments se banta hai'), steps: [{ label: 'Page', sub: 'template' }, { label: 'Fragment: hero', sub: 'cached' }, { label: 'Fragment: article list', sub: 'cached' }, { label: 'Fragment: card × 6', sub: 'cached' }, 'HTML'] },
        files: [
          { filename: 'article.card.jsp', language: 'jsp', code: '<%-- The card prints the AUTHOR\'s name. The author is another node.\n     Without a dependency, editing the author does not invalidate this card. --%>\n<c:set var="author" value="${currentNode.properties[\'author\'].node}"/>\n<template:addCacheDependency node="${author}"/>', highlight: [4], explain: t('Declare every referenced node you print. Tag name from the classic template taglib; JavaScript modules have their own equivalent — check your version.', 'Jo bhi referenced node print karo use declare karo. Tag name classic template taglib ka; JavaScript modules ka apna equivalent hai — version check karo.') },
          { filename: 'article.card.properties', path: 'src/main/resources/lv_article/html/', language: 'properties', code: '# view-level cache settings (supported keys vary by version)\ncache.expiration=300\n# cache.perUser=true   ← only for truly per-user output', explain: t('Expiration is a safety net, not a strategy; dependencies are the strategy.', 'Expiration safety net hai, strategy nahi; dependencies strategy hain.') },
        ],
        table: {
          title: t('The caches between the repository and your eyes', 'Repository aur tumhari aankhon ke beech ke caches'),
          columns: ['Cache', 'Who controls it', 'Flush / bypass'],
          rows: [['Browser', 'The visitor', 'Private window / hard reload'], ['CDN / proxy', 'Ops', 'Purge in the CDN'], ['Jahia HTML fragment cache', 'Jahia + your views', 'Publication invalidates; Administration → Cache'], ['Module assets (JS/CSS)', 'Build + browser', 'New build hash / hard reload']],
        },
      },
    }),
    {
      title: 'Why Am I Still Seeing the Old Content?',
      difficulty: 'hard',
      tags: ['caching', 'debugging', 'advanced'],
      explanation: t(
        "The most common Jahia support question, and a debugging lesson in disguise. A developer changes a component, or an author publishes an edit, and the page still shows the old version.\n\nWork from the outside in, and do not flush anything until you know which layer it is:\n\n1. Is it published? Check the status badge — in the right language. Preview reads default; visitors read live.\n2. Is it YOUR browser? Open a private window. If it is fine there, it was your cache.\n3. Is there a CDN or proxy in front of Jahia? Request the page directly from Jahia (or check the cache headers).\n4. Is it Jahia's fragment cache? Classic sign: the article itself is updated, but a card elsewhere still shows the old AUTHOR name — because the card depends on the author node and never declared it. Or: you changed a view and did not redeploy; or the fragment has a long expiration.\n5. Did the deploy actually happen? Check the module version.\n\nFlushing all caches in Administration makes the symptom disappear and teaches you nothing; it will come back on the next edit. The real fix for (4) is a cache dependency in the view.",
        "Jahia ka sabse common support sawaal, aur chhupa hua debugging lesson. Developer component badalta hai, ya author edit publish karta hai, aur page abhi bhi purana version dikhata hai.\n\nBahar se andar kaam karo, aur jab tak layer pata na ho kuch flush mat karo:\n\n1. Publish hua? Status badge dekho — sahi language mein. Preview default padhta hai; visitors live.\n2. TUMHARA browser hai? Private window kholo. Wahan theek hai toh tumhara cache tha.\n3. Jahia ke aage CDN ya proxy hai? Page seedha Jahia se maango (ya cache headers dekho).\n4. Jahia ka fragment cache hai? Classic sign: article khud update hai, par kahin aur ek card abhi bhi purana AUTHOR naam dikhata hai — kyunki card author node pe depend karta hai aur kabhi declare nahi kiya. Ya: view badla aur redeploy nahi kiya; ya fragment ki lambi expiration.\n5. Deploy sach mein hua? Module version check karo.\n\nAdministration mein saare caches flush karne se symptom gayab hota hai aur kuch nahi sikhata; agle edit pe wapas aayega. (4) ka asli fix view mein cache dependency hai."
      ),
      dailyLifeExample: t(
        'You changed your phone number but friends still call the old one. Is it their phone\'s saved contact (browser)? The WhatsApp group description (CDN)? The printed visiting card you handed out (fragment cache)? You fix each differently — and reprinting every card on each change is not a plan.',
        'Tumne phone number badla par dost purane pe call karte hain. Unke phone ka saved contact (browser)? WhatsApp group description (CDN)? Jo visiting card baanta tha (fragment cache)? Har ek alag fix hota hai — aur har baar saare cards dobara chhapna koi plan nahi.'
      ),
      keyPoints: ['Published? → browser? → CDN? → fragment cache? → deploy?', 'Private window before anything else', 'Missing dependency = classic stale card', 'Flush-all is a symptom killer, not a fix'],
      quiz: [
        q('The author\'s new name shows on their profile but not on article cards. Most likely?', ['Browser cache', 'The card view did not declare the author as a cache dependency', 'GraphQL', 'Wrong language'], 1, 'The card depends on a node it did not declare.'),
        q('First step when "the page is still old"?', ['Flush all caches', 'Check publication status, then a private window', 'Restart Jahia', 'Rewrite the view'], 1, 'Rule out the cheap layers first.'),
        q('Why is "flush all caches" a poor fix?', ['It is slow', 'The stale content returns on the next edit — the cause is unfixed', 'It deletes content', 'It is not allowed'], 1, 'Fix the dependency.'),
      ],
      interviewQuestions: [
        iq({
          question: 'A published change is not visible on the live site. How do you debug it?',
          difficulty: 'hard',
          short: t('Outside in: publication status (per language) → private window → CDN → Jahia fragment cache (dependencies, expiration, deployed view) → module version. Fix the cause, not with a global flush.', 'Bahar se andar: publication status (har language) → private window → CDN → Jahia fragment cache (dependencies, expiration, deployed view) → module version. Cause theek karo, global flush se nahi.'),
          deep: t('Each fragment\'s cache entry is invalidated when its own node is published, and when declared dependencies change. Views that print data from referenced nodes must declare them, otherwise the fragment keeps stale data until it expires.', 'Har fragment ki cache entry tab invalidate hoti hai jab uska apna node publish ho, aur jab declared dependencies badlein. Jo views referenced nodes ka data print karte hain unhe declare karna padta hai, warna fragment expire hone tak stale data rakhta hai.'),
          code: { code: '<template:addCacheDependency node="${currentNode.properties[\'author\'].node}"/>' },
          tip: t('Explicitly say you would NOT start with flushing caches.', 'Saaf bolo ki tum cache flush se shuru NAHI karoge.'),
        }),
      ],
      lesson: {
        kind: 'debug',
        minutes: 30,
        badges: ['debugging', 'coding'],
        searchTerms: ['stale', 'old content', 'cache', 'still old', 'not updating', 'flush', 'dependency', 'browser cache', 'cdn'],
        behind: { title: t('Check, in this order', 'Is order mein check karo'), steps: ['Published?', 'Private window', 'CDN', 'Fragment cache', 'Deployed version'] },
        debug: [DEBUG_ERRORS.find((d) => d.id === 'stale-content')],
        steps: [
          { title: t('Reproduce: change an author\'s name and publish it', 'Reproduce: author ka naam badlo aur publish karo') },
          { title: t('Look at a page with that author\'s article cards — old name?', 'Us author ke article cards wala page dekho — purana naam?') },
          { title: t('Confirm in a private window (rules out the browser)', 'Private window mein confirm karo (browser rule out)') },
          { title: t('Add template:addCacheDependency for the author to article.card.jsp; deploy', 'article.card.jsp mein author ke liye template:addCacheDependency add karo; deploy') },
          { title: t('Change the name again; publish; the card updates', 'Naam dobara badlo; publish; card update ho jaata hai') },
        ],
        expected: { checks: ['✓ Stale card reproduced', '✓ Browser ruled out', '✓ Dependency added', '✓ Card updates on the next edit'] },
        challenge: {
          prompt: t('Declare the dependency.', 'Dependency declare karo.'),
          code: '<template:____ node="${author}"/>',
          options: ['module', 'addCacheDependency', 'area', 'include'],
          answer: 1,
          explanation: t('addCacheDependency ties this fragment to the author node.', 'addCacheDependency is fragment ko author node se jodta hai.'),
          language: 'jsp',
        },
      },
    },
  ],
};

/* ═══════════════════ 16 · DEBUGGING & PERFORMANCE ═══════════════════ */

const debugging = {
  title: 'Debugging',
  stage: 16,
  level: 'advanced',
  estimatedMinutes: 75,
  description: t('The Jahia Debugging Lab — ten real errors — and finding the slow component.', 'Jahia Debugging Lab — das asli errors — aur slow component dhoondhna.'),
  concepts: [
    {
      title: 'Jahia Debugging Lab — Ten Real Errors',
      difficulty: 'hard',
      tags: ['lab', 'debugging', 'advanced'],
      explanation: t(
        "Ten failures you will meet on real Jahia projects, each walked the same way: Problem → Possible cause → Where to check → Fix → Prevention.\n\nThe method matters more than the list. Read the symptom. Name the layer (content, publication, permissions, definitions, views, deployment, cache, API). Check the cheapest thing in that layer first. Read the log from the first error, not the last line. Change one thing, then re-test. And once it is fixed, write down the prevention — the checklist item that would have stopped it.\n\nThe full lab, with each error expandable and linked back to the lesson that teaches it, is in the course toolkit. This lesson walks all ten inline so you can practise before opening it.",
        "Das failures jo tumhe asli Jahia projects pe milenge, har ek same tareeke se: Problem → Possible cause → Kahan check karein → Fix → Prevention.\n\nList se zyaada method zaroori hai. Symptom padho. Layer ka naam lo (content, publication, permissions, definitions, views, deployment, cache, API). Us layer mein sabse sasti cheez pehle check karo. Log pehle error se padho, aakhri line se nahi. Ek cheez badlo, phir test karo. Aur fix ho jaaye toh prevention likh lo — wo checklist item jo ise rok deta.\n\nPoora lab, har error expandable aur sikhane wale lesson se juda, course toolkit mein hai. Ye lesson dason inline chalata hai taaki kholne se pehle practice kar lo."
      ),
      dailyLifeExample: t(
        'A car mechanic does not start by replacing the engine. Fuel? Battery? Spark plug? Cheapest check first, one change at a time — and then tells you what to watch so it does not happen again.',
        'Car mechanic engine badalne se shuru nahi karta. Petrol? Battery? Spark plug? Sabse sasta check pehle, ek baar mein ek change — aur phir batata hai kya dhyaan rakhna taaki dobara na ho.'
      ),
      keyPoints: ['Name the layer first', 'Cheapest check first', 'First error in the log', 'One change at a time', 'Write the prevention'],
      quiz: [
        q('The module stays "Resolved" after deploy. Most likely layer?', ['Cache', 'Definitions/deployment — e.g. a CND parse error', 'Permissions', 'Browser'], 1, 'A module that will not start is a deployment/definition problem.'),
        q('Where do you read a Jahia error first?', ['The last line of the log', 'The first error / first "Caused by"', 'The browser title', 'GraphiQL'], 1, 'Later errors are usually consequences.'),
        q('Content is visible to editors, missing for visitors. Layer?', ['Publication', 'CND', 'Docker', 'GraphQL schema'], 0, 'default vs live.'),
      ],
      lesson: {
        kind: 'lab',
        minutes: 45,
        badges: ['lab', 'debugging'],
        searchTerms: ['debugging lab', 'errors', 'troubleshooting', 'no render set', 'cnd syntax error', 'permission denied', 'deployment fails'],
        where: [{ app: 'Browser', path: ['/courses/jahia/toolkit/debugging'], note: t('The interactive Debugging Lab.', 'Interactive Debugging Lab.') }],
        debug: DEBUG_ERRORS,
      },
    },
    {
      title: 'Performance — Finding the Slow Component',
      difficulty: 'hard',
      tags: ['performance', 'caching', 'debugging', 'advanced'],
      explanation: t(
        "A slow Jahia page is almost always one of four things: a fragment that is never cached, a view that reads too much of the repository, a query without limits, or too much JavaScript shipped to the browser.\n\nFIND IT: compare the first and second load of the page (a big difference means caching works; no difference means something is uncached). Remove components one by one in a copy of the page to find the expensive one. Check the log for slow queries.\n\nFIX IT: make sure each fragment is cacheable — output that varies per user or per request must be isolated, not spread over the whole page. In views, read only the children you render and cap the count (the original lesson caps at 12). Never walk a whole subtree to count something; query for it with limits. For GraphQL, request only rendered fields and paginate. Keep client components small; render on the server by default. Keep large, never-searched properties out of the index (indexed=no).\n\nMEASURE, don't guess: fix the thing the numbers point at, re-measure, stop when it is fast enough.",
        "Dheema Jahia page lagbhag hamesha chaar mein se ek hota hai: fragment jo kabhi cache nahi hota, view jo repository ka bahut zyaada padhta hai, bina limit ki query, ya browser ko bahut zyaada JavaScript.\n\nDHOONDHO: page ka pehla aur doosra load compare karo (bada farak matlab caching chal rahi hai; koi farak nahi matlab kuch uncached hai). Page ki copy mein components ek-ek karke hatao aur mehenga wala dhoondho. Log mein slow queries dekho.\n\nTHEEK KARO: har fragment cacheable ho — jo output har user ya request pe badle use alag rakho, poore page pe mat phailao. Views mein sirf wahi children padho jo render karte ho aur count cap karo (original lesson 12 pe cap karta hai). Kuch ginne ke liye poora subtree mat ghoomo; limits ke saath query karo. GraphQL mein sirf rendered fields maango aur paginate karo. Client components chhote rakho; default server pe render. Bade, kabhi search na hone wale properties index se bahar (indexed=no).\n\nNAAPO, andaaza mat lagao: jo numbers batayein wo theek karo, dobara naapo, jab kaafi tez ho jaaye ruk jao."
      ),
      dailyLifeExample: t(
        'A slow billing queue at a shop: is one cashier slow (one component), is every customer being searched in the full stock register (unbounded query), or is no one using the ready price list (no cache)? Time each counter before hiring more staff.',
        'Dukaan pe billing ki dheemi line: ek cashier dheema hai (ek component), har customer ke liye poora stock register khangala ja raha hai (unbounded query), ya ready price list koi use nahi kar raha (no cache)? Zyaada staff rakhne se pehle har counter ka time naapo.'
      ),
      keyPoints: ['Uncached fragments, heavy views, unbounded queries, too much JS', 'First vs second load reveals caching', 'Cap and limit everything', 'Measure → fix → re-measure'],
      quiz: [
        q('First and second load take the same 3 seconds. Suggests?', ['Caching works', 'Something is not cached', 'Browser is fast', 'CDN is off'], 1, 'Cached pages get much faster on the second load.'),
        q('A view counts all articles by iterating the whole subtree. Better?', ['Cache it forever', 'Query with limits / use a count from a query', 'Use a client component', 'Add i18n'], 1, 'Never walk what you can query.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 30,
        badges: ['debugging', 'coding'],
        searchTerms: ['performance', 'slow', 'profiling', 'cache', 'query limit', 'optimization', 'indexed'],
        table: {
          title: t('Symptom → likely cause', 'Symptom → likely cause'),
          columns: ['Symptom', 'Likely cause', 'Fix'],
          rows: [
            ['Slow every time', 'Uncached fragment', 'Make it cacheable; isolate per-user bits'],
            ['Slow on big folders', 'View walks a subtree', 'Cap / query with limit'],
            ['Slow API', 'Unbounded GraphQL', 'Fields + pagination'],
            ['Slow in browser only', 'Too much client JS', 'Server-render by default'],
          ],
        },
        steps: [
          { title: t('Load the News page twice and time both (DevTools → Network)', 'News page do baar load karo aur dono ka time naapo (DevTools → Network)') },
          { title: t('In a copy of the page, remove components one by one until it is fast', 'Page ki copy mein components ek-ek hatao jab tak tez na ho') },
          { title: t('Open that component\'s view: does it cap its loop?', 'Us component ka view kholo: loop cap hai?') },
          { title: t('Fix, redeploy, re-measure', 'Fix, redeploy, dobara naapo') },
        ],
        expected: { checks: ['✓ Measured', '✓ Isolated the slow component', '✓ Fixed the cause', '✓ Re-measured'] },
      },
    },
  ],
};

/* ═══════════════════ 17 · PRODUCTION ═══════════════════ */

const production = {
  title: 'Production',
  stage: 17,
  level: 'advanced',
  estimatedMinutes: 60,
  description: t('Shipping a Jahia application safely — pipeline, environments and the production checklist.', 'Jahia application safely ship karna — pipeline, environments aur production checklist.'),
  concepts: [
    fromLegacy('Going to Production', {
      codeLanguage: 'bash',
      tags: ['production', 'deployment', 'advanced'],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['coding'],
        searchTerms: ['production', 'ci', 'pipeline', 'deploy', 'rollback', 'staging', 'environments'],
        behind: { title: t('Code and content move in opposite directions', 'Code aur content ulti dishaon mein chalte hain'), steps: [{ label: 'Code', sub: 'dev → staging → prod' }, { label: 'Content', sub: 'prod → staging (copies)' }] },
      },
    }),
    {
      title: 'The Production Checklist',
      difficulty: 'hard',
      tags: ['production', 'security', 'performance', 'advanced'],
      explanation: t(
        "Before a Jahia site goes live — and before every major release — walk the same checklist. It exists because each item has been the cause of a real outage somewhere.\n\nENVIRONMENT: separate dev, staging and production; production configuration outside the code (URLs, credentials, mail); JVM memory sized; time zone and locale set.\nDATABASE & REPOSITORY: supported database, sized and backed up; repository/datastore storage planned for media growth.\nMODULES: versioned releases, not snapshots; the same artefact tested in staging goes to production; dependencies declared; unused modules removed.\nDEPLOYMENT: scripted, repeatable, with a rollback (the previous version to hand).\nLOGS: centralised, retained, and someone reads the errors.\nCACHE: views declare dependencies; per-user output isolated; CDN rules agreed.\nPERMISSIONS: no shared accounts; roles on groups; developer tools (Jahia Tools, GraphiQL) restricted; anonymous GraphQL limited to LIVE.\nWORKFLOW: review steps configured for the teams who need them.\nBACKUPS: database and files, restore tested — a backup you have never restored is a hope.\nMONITORING: uptime, response time, error rate, JVM memory, disk.\nPERFORMANCE: load-tested the busiest pages; second-load timings healthy.\nSECURITY: HTTPS everywhere, default passwords changed, root not used day to day, security patches applied.\nPUBLISHING: authors trained; publication and translation process written down.",
        "Jahia site live hone se pehle — aur har bade release se pehle — yahi checklist chalo. Ye isliye hai kyunki har item kahin na kahin asli outage ki wajah bana hai.\n\nENVIRONMENT: dev, staging aur production alag; production configuration code ke bahar (URLs, credentials, mail); JVM memory sahi; time zone aur locale set.\nDATABASE & REPOSITORY: supported database, sahi size aur backed up; media badhne ke liye repository/datastore storage planned.\nMODULES: versioned releases, snapshots nahi; staging mein test hua wahi artefact production mein; dependencies declared; unused modules hatao.\nDEPLOYMENT: scripted, repeatable, rollback ke saath (pichla version haath mein).\nLOGS: centralised, retained, aur koi errors padhta hai.\nCACHE: views dependencies declare karein; per-user output alag; CDN rules tay.\nPERMISSIONS: shared accounts nahi; roles groups pe; developer tools (Jahia Tools, GraphiQL) restricted; anonymous GraphQL sirf LIVE.\nWORKFLOW: jin teams ko chahiye unke review steps configured.\nBACKUPS: database aur files, restore test kiya hua — jo backup kabhi restore nahi kiya wo bas ummeed hai.\nMONITORING: uptime, response time, error rate, JVM memory, disk.\nPERFORMANCE: sabse busy pages load-tested; second-load timings theek.\nSECURITY: har jagah HTTPS, default passwords badle, root roz use nahi, security patches lage.\nPUBLISHING: authors trained; publication aur translation process likha hua."
      ),
      dailyLifeExample: t(
        'A pilot\'s pre-flight checklist. Experienced pilots still read it item by item, because the one skipped item is the one that matters.',
        'Pilot ki pre-flight checklist. Anubhavi pilots bhi item-by-item padhte hain, kyunki jo ek item chhoota wahi zaroori nikalta hai.'
      ),
      keyPoints: ['Same artefact from staging to prod', 'Rollback ready', 'Developer tools locked down', 'Backups restored at least once', 'Monitor, then measure'],
      quiz: [
        q('Which is a production red flag?', ['Versioned module releases', 'GraphiQL and Jahia Tools open to the internet', 'Tested restores', 'Roles on groups'], 1, 'Developer tools must be restricted.'),
        q('"We have backups" — what makes that claim true?', ['A cron job exists', 'A restore has been tested', 'Disk is large', 'Snapshots are named'], 1, 'An untested backup is a hope.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 40,
        badges: ['hands-on'],
        searchTerms: ['production checklist', 'security', 'backup', 'monitoring', 'logs', 'go live', 'release'],
        steps: [
          { title: t('Environment configuration outside code; dev/staging/prod separated', 'Environment configuration code ke bahar; dev/staging/prod alag') },
          { title: t('Database supported, sized, backed up', 'Database supported, sahi size, backed up') },
          { title: t('Repository / file storage planned for growth', 'Repository / file storage badhne ke liye planned') },
          { title: t('Modules: versioned release, same artefact as staging', 'Modules: versioned release, staging wala hi artefact') },
          { title: t('Deployment scripted, rollback ready', 'Deployment scripted, rollback taiyaar') },
          { title: t('Logs centralised and watched', 'Logs centralised aur dekhe jaate hain') },
          { title: t('Cache: dependencies declared, per-user output isolated', 'Cache: dependencies declared, per-user output alag') },
          { title: t('Permissions: groups, no shared accounts, dev tools restricted', 'Permissions: groups, shared accounts nahi, dev tools restricted') },
          { title: t('Workflow configured for review teams', 'Review teams ke liye workflow configured') },
          { title: t('Backups restored at least once', 'Backups kam se kam ek baar restore kiye') },
          { title: t('Monitoring: uptime, latency, errors, memory, disk', 'Monitoring: uptime, latency, errors, memory, disk') },
          { title: t('Performance: busiest pages load-tested', 'Performance: sabse busy pages load-tested') },
          { title: t('Security: HTTPS, passwords changed, patches applied', 'Security: HTTPS, passwords badle, patches lage') },
          { title: t('Publishing: authors trained, process written', 'Publishing: authors trained, process likha hua') },
        ],
        expected: { text: t('All fourteen ticked — or a written reason for each that is not.', 'Chaudah ke chaudah tick — ya jo nahi uski likhi hui wajah.') },
      },
    },
  ],
};

export const advancedModules = [permissions, workflow, caching, debugging, production];
