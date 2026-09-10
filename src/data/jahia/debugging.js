// Jahia Debugging Lab — ten realistic failures, each walked the same way:
// problem → possible cause → where to check → fix → prevention.
//
// Exact error text differs between Jahia versions and between JSP and
// JavaScript modules, so `symptom` quotes what you typically see and the lab
// teaches you to recognise the shape rather than one literal string.

export const DEBUG_ERRORS = [
  {
    id: 'no-view',
    title: '"No render set / no view" for a node',
    tags: ['views', 'rendering'],
    symptom:
      'The component box in Page Composer shows an error instead of content. The log mentions a template or view it could not find — often "Unable to find the template for resource" (JSP) or a missing-view message (JavaScript modules).',
    problem: {
      english: 'Jahia found the node but has no view that can render its type.',
      hinglish: 'Jahia ko node mil gaya, par uske type ko render karne wala koi view nahi mila.',
    },
    causes: [
      'View file is in the wrong folder — the folder must match the node type (lv_article/html/article.jsp for lv:article)',
      'Typo in the node type name between the CND and the view registration',
      'The view exists under a name ("card") but the page asks for "default"',
      'Module with the view is not deployed, or not enabled on this site',
    ],
    where: [
      'Log: tomcat/logs/catalina.out, or docker compose logs -f jahia',
      'Jahia Tools → Modules: is the module started?',
      'Your module: src/main/resources/lv_article/html/',
    ],
    fix: {
      english: 'Put a default view where Jahia looks for it, matching the node type exactly, redeploy, and reload the page.',
      hinglish: 'Default view wahan rakho jahan Jahia dhoondhta hai, node type bilkul match karke, redeploy karo aur page reload karo.',
    },
    code: { filename: 'src/main/resources/lv_article/html/article.jsp', language: 'jsp', code: '<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>\n<h2>${currentNode.properties[\'jcr:title\'].string}</h2>' },
    prevention: 'Create the default view in the same commit as the node type. Every type authors can create needs one.',
    lesson: 'Debugging a Missing View',
  },
  {
    id: 'cnd-syntax',
    title: 'CND syntax error — module will not start',
    tags: ['cnd', 'deployment'],
    symptom: 'Deploy looks successful but the module stays "Installed" / "Resolved", not "Started". The log shows a parse error pointing at a line of definitions.cnd.',
    problem: {
      english: 'Jahia could not parse your CND, so the module (and every type in it) is unavailable.',
      hinglish: 'Jahia tumhari CND parse nahi kar paaya, isliye module (aur usme ke saare types) available nahi hain.',
    },
    causes: [
      'Namespace prefix used but never declared (<lv = ...> missing)',
      'Missing ">" before supertypes, or a stray comma',
      'Unknown property type ("text" instead of string)',
      'Quotes not closed in a default value or constraint',
    ],
    where: ['Log at deploy time — search for "definitions.cnd" and a line number', 'Jahia Tools → Modules → your module state'],
    fix: {
      english: 'Go to the line the log names, fix the syntax, redeploy. Compare against a known-good type from the CND reference.',
      hinglish: 'Log jo line bataye wahan jaao, syntax theek karo, redeploy karo. CND reference ke ek sahi type se compare karo.',
    },
    code: { filename: 'META-INF/definitions.cnd', language: 'cnd', code: "<lv = 'http://learnverse.dev/jahia/nt/1.0'>\n\n[lv:article] > jnt:content, jmix:editorialContent\n - jcr:title (string) i18n mandatory" },
    prevention: 'Change one type at a time and deploy often; a small diff makes the broken line obvious.',
    lesson: 'Reading and Writing a CND File',
  },
  {
    id: 'not-in-picker',
    title: 'Component does not appear in the CMS',
    tags: ['components', 'authoring'],
    symptom: 'You deployed lv:hero, but "New content" in Page Composer or jContent does not list it.',
    problem: {
      english: 'The type exists, but Jahia is not offering it to authors here.',
      hinglish: 'Type exist karta hai, par Jahia yahan authors ko offer nahi kar raha.',
    },
    causes: [
      'Missing a droppable/category mixin (jmix:editorialContent etc.)',
      'Module not enabled on this site (deployed ≠ enabled)',
      'The area has a restriction list that excludes your type',
      'Type marked jmix:hiddenType, or is abstract',
    ],
    where: ['Site settings → Modules: is lv-news enabled for this site?', 'definitions.cnd: the supertype line', 'Template: area restrictions'],
    fix: {
      english: 'Add jmix:editorialContent (or another category mixin), enable the module on the site, redeploy, reopen the editor.',
      hinglish: 'jmix:editorialContent (ya koi category mixin) add karo, site pe module enable karo, redeploy karo, editor dobara kholo.',
    },
    code: { filename: 'META-INF/definitions.cnd', language: 'cnd', code: '[lv:hero] > jnt:content, jmix:editorialContent' },
    prevention: 'Keep a checklist per new type: category mixin, default view, labels, enabled on site.',
    lesson: 'From Node Type to Component — Making It Droppable',
  },
  {
    id: 'field-missing',
    title: 'Property does not appear in the editor',
    tags: ['cnd', 'authoring'],
    symptom: 'You added - subtitle (string) and redeployed, but the Content Editor form has no Subtitle field.',
    problem: {
      english: 'The editor is showing the old definition, or the field is deliberately hidden.',
      hinglish: 'Editor purani definition dikha raha hai, ya field jaan-boojh ke hidden hai.',
    },
    causes: [
      'Redeploy failed silently (CND error) so the old definition is still active',
      'Property marked hidden or protected',
      'Browser holding an old editor bundle — the form is cached client-side',
      'You edited a different module than the one deployed',
    ],
    where: ['Jahia Tools → Definitions browser: does lv:article list subtitle?', 'definitions.cnd for hidden/protected', 'Hard-reload the editor'],
    fix: {
      english: 'Confirm the new definition is registered, remove hidden if it was accidental, then hard-reload the editor.',
      hinglish: 'Pehle confirm karo ki nayi definition register hui, galti se hidden laga ho toh hatao, phir editor hard-reload karo.',
    },
    code: { filename: 'META-INF/definitions.cnd', language: 'cnd', code: ' - subtitle (string) i18n' },
    prevention: 'After each deploy, check the Definitions browser, not just the build output.',
    lesson: 'Property Attributes — mandatory, i18n, multiple, hidden, protected, defaults',
  },
  {
    id: 'image-broken',
    title: 'Image is not rendering',
    tags: ['media', 'rendering'],
    symptom: 'The article renders, but the image is a broken icon, or the <img> has an empty src.',
    problem: {
      english: 'The view is not turning the image reference into a URL the visitor can load.',
      hinglish: 'View image reference ko aise URL mein nahi badal raha jo visitor load kar sake.',
    },
    causes: [
      'Printing the property value (a UUID) instead of following the reference to the file node',
      'Image not published — the article is live, the image is only in default',
      'Visitor lacks read permission on the file',
      'Reference target deleted (weakreference) and the view does not guard for null',
    ],
    where: ['Browser dev tools → Network: status of the image request', 'jContent → Media: is the image published?', 'The view code'],
    fix: {
      english: 'Resolve the reference to the node, build its URL, guard for a missing target, and publish the image.',
      hinglish: 'Reference ko node tak resolve karo, uska URL banao, missing target ke liye guard lagao, aur image publish karo.',
    },
    code: {
      filename: 'lv_article/html/article.jsp',
      language: 'jsp',
      code: '<c:set var="img" value="${currentNode.properties[\'image\'].node}"/>\n<c:if test="${not empty img}">\n  <img src="${img.url}" alt="${fn:escapeXml(img.displayableName)}"/>\n</c:if>',
    },
    prevention: 'Publish with "Publish all" / including references, and always null-check references in views.',
    lesson: 'How Images Work in Jahia',
  },
  {
    id: 'graphql-fails',
    title: 'GraphQL query fails or returns null',
    tags: ['graphql'],
    symptom: 'The response has an "errors" array, or data.jcr.nodeByPath is null.',
    problem: {
      english: 'The query is wrong for the schema, points at the wrong workspace, or the user cannot read the node.',
      hinglish: 'Query schema ke hisaab se galat hai, galat workspace pe point kar rahi hai, ya user node padh nahi sakta.',
    },
    causes: [
      'Querying LIVE for content that is only in EDIT (default)',
      'Wrong path — site key or language missing',
      'Asking for an i18n property without a language argument',
      'Anonymous user without permission for that node',
      'Field name does not exist in your Jahia version',
    ],
    where: ['GraphiQL in Jahia Tools: run the same query and read the errors', 'The Docs panel for the exact field names', 'jContent: publication status'],
    fix: {
      english: 'Reproduce in GraphiQL, fix the first error, check workspace and language, then paste back into your code.',
      hinglish: 'GraphiQL mein reproduce karo, pehla error theek karo, workspace aur language check karo, phir code mein wapas paste karo.',
    },
    code: { filename: 'query.graphql', language: 'graphql', code: 'query {\n  jcr(workspace: EDIT) {\n    nodeByPath(path: "/sites/learnverse/contents/articles/welcome") {\n      title: property(name: "jcr:title", language: "en") { value }\n    }\n  }\n}' },
    prevention: 'Keep queries in files, test them in GraphiQL, and always pass language for i18n fields.',
    lesson: 'The GraphQL API',
  },
  {
    id: 'not-published',
    title: 'Content is not published',
    tags: ['publication', 'workflow'],
    symptom: 'Editors see the new article in Page Composer; visitors and the live site do not.',
    problem: {
      english: 'The change exists only in the default (edit) workspace. The live site reads the live workspace.',
      hinglish: 'Change sirf default (edit) workspace mein hai. Live site live workspace padhti hai.',
    },
    causes: [
      'Saved but never published',
      'Publication request waiting in a workflow for a reviewer',
      'Published in English only — the Hindi version is still unpublished',
      'The parent page itself is unpublished',
    ],
    where: ['jContent: publication status badge on the node', 'Workflow / tasks dashboard for pending requests', 'Language switcher — check each language'],
    fix: {
      english: 'Publish the node (and its references and parent if needed), or get the pending request approved.',
      hinglish: 'Node publish karo (zaroorat ho toh references aur parent bhi), ya pending request approve karwao.',
    },
    code: null,
    prevention: 'Teach authors to read the status badge; use "publish all languages" deliberately.',
    lesson: 'Two Workspaces — default and live',
  },
  {
    id: 'stale-content',
    title: 'Old content is still displayed',
    tags: ['caching'],
    symptom: 'You published a change (or redeployed a view) and the page still shows the old version.',
    problem: {
      english: 'Something between the repository and your eyes is serving a stored copy: browser, CDN, or Jahia\'s HTML fragment cache.',
      hinglish: 'Repository aur tumhari aankhon ke beech koi stored copy serve kar raha hai: browser, CDN, ya Jahia ka HTML fragment cache.',
    },
    causes: [
      'Browser cache — you are looking at your own old copy',
      'A fragment depends on content it did not declare as a dependency (a referenced author changed)',
      'Changed a view without redeploying, or the fragment has a long expiration',
      'CDN in front of Jahia',
    ],
    where: ['Private window / hard reload first', 'Administration → Cache management', 'View properties: cache.expiration / dependencies'],
    fix: {
      english: 'Rule out the browser, then flush the relevant cache, then fix the root cause: declare the dependency so it invalidates itself next time.',
      hinglish: 'Pehle browser rule out karo, phir relevant cache flush karo, phir asli wajah theek karo: dependency declare karo taaki agli baar khud invalidate ho.',
    },
    code: { filename: 'lv_article/html/article.jsp', language: 'jsp', code: '<%-- the author is a referenced node: tell the cache --%>\n<template:addCacheDependency node="${currentNode.properties[\'author\'].node}"/>' },
    prevention: 'Declare cache dependencies for every referenced node a view prints.',
    lesson: 'Why Am I Still Seeing the Old Content?',
  },
  {
    id: 'permission-denied',
    title: 'Permission denied',
    tags: ['permissions'],
    symptom: 'A user gets "access denied", sees a greyed-out action, or the node simply is not there for them.',
    problem: {
      english: "The user's roles on that node (or an ancestor) do not grant the permission the action needs.",
      hinglish: 'Us node (ya uske parent) pe user ke roles wo permission nahi dete jo action ko chahiye.',
    },
    causes: [
      'Role granted on a sibling folder, not an ancestor of this node',
      'Inheritance broken on a subtree',
      'Role granted to a group the user is not in',
      'The role lacks the permission (e.g. an editor role without publish)',
    ],
    where: ['The node\'s roles / permissions panel in jContent', 'Administration → Roles: what the role contains', 'User\'s group membership'],
    fix: {
      english: 'Grant the right role to the right group at the right level of the tree — usually the highest folder that should inherit it.',
      hinglish: 'Sahi role, sahi group ko, tree ke sahi level pe do — aam taur pe sabse upar ka folder jisse inherit hona chahiye.',
    },
    code: null,
    prevention: 'Assign roles to groups, at folder level, and document the matrix.',
    lesson: 'Lab — Create Five Users and Their Roles',
  },
  {
    id: 'deploy-fails',
    title: 'Module deployment fails',
    tags: ['deployment', 'modules'],
    symptom: 'mvn jahia:deploy or yarn deploy errors, or the module appears but never starts.',
    problem: {
      english: 'The build, the upload, or the start of the module in Jahia is failing.',
      hinglish: 'Build, upload, ya Jahia mein module ka start — inme se kuch fail ho raha hai.',
    },
    causes: [
      'Jahia not running / wrong URL or credentials in the deploy config',
      'Build error (compile, TypeScript, CND) before the upload',
      'Missing dependency on another module (declared but not installed)',
      'Version conflict with an already-deployed version',
    ],
    where: ['The deploy command output', 'Jahia Tools → Modules: state and error of your module', 'Jahia log right after the upload'],
    fix: {
      english: 'Read the first error, not the last. Check Jahia is up, the build is green, and dependencies are installed.',
      hinglish: 'Pehla error padho, aakhri nahi. Check karo Jahia chal raha hai, build green hai, aur dependencies installed hain.',
    },
    code: { filename: 'terminal', language: 'bash', code: 'docker compose ps\nmvn clean install jahia:deploy\ndocker compose logs -f jahia' },
    prevention: 'Keep the local loop short and deploy small changes.',
    lesson: 'The Build and Deploy Loop',
  },
];
