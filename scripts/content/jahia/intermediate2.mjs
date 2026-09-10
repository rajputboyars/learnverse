// INTERMEDIATE — modules 10 to 12: GraphQL, multilingual, multi-site.

import { t, q, iq, shot, fromLegacy } from './helpers.mjs';

const ARTICLES_QUERY = `query LatestArticles($lang: String!, $limit: Int!, $offset: Int!) {
  jcr(workspace: LIVE) {
    nodesByCriteria(
      criteria: {
        nodeType: "lv:article"
        paths: ["/sites/learnverse/contents/articles"]
        language: $lang
        ordering: { property: "publishedDate", orderType: DESC }
      }
      limit: $limit
      offset: $offset
    ) {
      pageInfo { totalCount }
      nodes {
        uuid
        path
        title: property(name: "jcr:title", language: $lang) { value }
        summary: property(name: "summary", language: $lang) { value }
        image: property(name: "image") { refNode { path } }
        author: property(name: "author") {
          refNode { name: property(name: "name") { value } }
        }
      }
    }
  }
}`;

/* ═══════════════════ 10 · GRAPHQL ═══════════════════ */

const graphql = {
  title: 'GraphQL',
  stage: 10,
  level: 'intermediate',
  estimatedMinutes: 90,
  description: t('Jahia content over GraphQL into a React card — queries, references, pagination, filters, errors.', 'Jahia content GraphQL se React card tak — queries, references, pagination, filters, errors.'),
  concepts: [
    fromLegacy('The GraphQL API', {
      codeLanguage: 'graphql',
      tags: ['graphql', 'intermediate'],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['coding', 'hands-on'],
        version: 'Jahia 8.x (graphql-dxm-provider)',
        searchTerms: ['graphql', 'graphiql', 'query', 'api', 'headless', '/modules/graphql'],
        where: [
          { app: 'Jahia Tools', path: ['GraphQL', 'GraphiQL'], note: t('The in-browser query tool; its Docs panel lists every field your version supports.', 'Browser ka query tool; iska Docs panel tumhare version ke saare fields list karta hai.') },
          { app: 'Browser', path: ['POST /modules/graphql'], note: t('The endpoint your apps call.', 'Wo endpoint jise apps call karte hain.') },
        ],
        screenshots: [
          shot({
            src: '/images/jahia/graphql/graphiql-query.png',
            title: t('GraphiQL in Jahia', 'Jahia mein GraphiQL'),
            description: t('Query on the left, result on the right, Docs panel for field names.', 'Left mein query, right mein result, field names ke liye Docs panel.'),
            mock: {
              app: 'Jahia Tools · GraphiQL',
              panel: 'tree',
              toolbar: [{ label: '▶ Run', primary: true, marker: 1 }, { label: 'Docs', marker: 2 }],
              tree: ['query {                               {', '  jcr(workspace: LIVE) {                "data": {', '    nodeByPath(path: "/sites/…") {         "jcr": {', '      name                                   "nodeByPath": {', '    }                                          "name": "home"', '  }                                          } } } }', '}'],
            },
            markers: [t('Run the query', 'Query chalao'), t('Docs: the real schema of your install', 'Docs: tumhare install ka asli schema')],
          }),
        ],
        steps: [
          { title: t('Open GraphiQL from Jahia Tools', 'Jahia Tools se GraphiQL kholo') },
          { title: t('Run the legacy lesson\'s query against your site path', 'Legacy lesson ki query apne site path pe chalao') },
          { title: t('Switch LIVE ↔ EDIT and compare results for an unpublished article', 'LIVE ↔ EDIT badlo aur unpublished article ke results compare karo') },
          { title: t('Open Docs and find the fields of JCRNode', 'Docs kholo aur JCRNode ke fields dhoondo') },
        ],
        expected: { checks: ['✓ Query runs', '✓ LIVE hides unpublished content', '✓ Found fields in Docs'] },
      },
    }),
    {
      title: 'Query Articles for a React Card',
      difficulty: 'medium',
      tags: ['graphql', 'react', 'project', 'intermediate'],
      explanation: t(
        "Phase 17 of the News Portal: a React frontend that shows article cards from Jahia over GraphQL. This is the headless route — useful for a separate front end, a mobile app or a client component that loads more articles without a page reload.\n\nThe flow is: Jahia → GraphQL → article query → React → article card. You write one query that asks for exactly what the card shows: title and summary in the current language, the image path, the author's name. You call /modules/graphql with the query and variables, map the nodes to props, and render a card per node.\n\nThree details decide whether it works: query the LIVE workspace (only published content), pass the language for every i18n property, and follow references with refNode rather than printing UUIDs. Build the image URL from the file path: /files/live + path.\n\nField names here follow the Jahia 8 GraphQL provider; open GraphiQL's Docs panel to confirm them on your version before you trust any snippet, including this one.",
        "News Portal ka Phase 17: React frontend jo GraphQL se Jahia ke article cards dikhata hai. Ye headless raasta hai — alag front end, mobile app ya aise client component ke liye kaam ka jo page reload ke bina aur articles load kare.\n\nFlow: Jahia → GraphQL → article query → React → article card. Tum ek query likhte ho jo bilkul wahi maange jo card dikhata hai: current language mein title aur summary, image path, author ka naam. Query aur variables ke saath /modules/graphql call karo, nodes ko props mein map karo, aur har node ka ek card render karo.\n\nTeen details decide karti hain chalega ya nahi: LIVE workspace query karo (sirf published content), har i18n property ke liye language do, aur UUIDs print karne ki jagah refNode se references follow karo. Image URL file path se banao: /files/live + path.\n\nYahan field names Jahia 8 GraphQL provider ke hisaab se hain; kisi bhi snippet pe bharosa karne se pehle, is wale pe bhi, GraphiQL ke Docs panel mein apne version pe confirm karo."
      ),
      dailyLifeExample: t(
        'Ordering from a restaurant menu over the phone: you ask for exactly the dishes you want (fields), in the language you speak (language), from what is actually being served today (LIVE), and the restaurant sends only that.',
        'Phone pe restaurant se order karna: bilkul wahi dishes maango jo chahiye (fields), apni bhasha mein (language), aaj jo asli mein serve ho raha hai usme se (LIVE), aur restaurant sirf wahi bhejta hai.'
      ),
      keyPoints: ['LIVE for public data', 'Language on every i18n field', 'refNode to follow references', 'Image URL = /files/live + path'],
      quiz: [
        q('The card shows the title but not the Hindi title on the Hindi site. Likely cause?', ['Wrong workspace', 'The query does not pass the language for jcr:title', 'Image missing', 'CORS'], 1, 'i18n properties need a language argument.'),
        q('How do you get the author\'s name from the article in one query?', ['Print the UUID', 'property(name:"author") { refNode { … } }', 'A second REST call', 'Not possible'], 1, 'refNode follows a reference.'),
        q('Which workspace for a public React app?', ['EDIT', 'LIVE'], 1, 'Only LIVE is published.'),
      ],
      interviewQuestions: [
        iq({
          question: 'How would you fetch Jahia content into a React component?',
          difficulty: 'medium',
          short: t('Default to a server-side view that reads the JCR directly. When a client or separate app needs data, query /modules/graphql on the LIVE workspace, asking only for the rendered fields, with language, following references with refNode.', 'Default server-side view jo seedha JCR padhe. Jab client ya alag app ko data chahiye, /modules/graphql pe LIVE workspace query karo, sirf rendered fields, language ke saath, refNode se references follow karke.'),
          deep: t('Server rendering is cacheable and ships no JS; use GraphQL for interactivity (load more, filters) or for other channels. Paginate with limit/offset, handle errors from the errors array, and never expose EDIT to anonymous clients.', 'Server rendering cacheable hai aur JS nahi bhejta; GraphQL interactivity (load more, filters) ya doosre channels ke liye. limit/offset se paginate karo, errors array ke errors handle karo, aur anonymous clients ko kabhi EDIT expose mat karo.'),
          code: { code: "const res = await fetch('/modules/graphql', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ query, variables: { lang: 'en', limit: 6, offset: 0 } }),\n});" },
          tip: t('Say "server by default, GraphQL when a client genuinely needs it".', '"Default server, GraphQL jab client ko sach mein chahiye" bolo.'),
        }),
      ],
      lesson: {
        kind: 'project',
        minutes: 35,
        badges: ['project', 'coding'],
        version: 'Jahia 8.x (graphql-dxm-provider)',
        searchTerms: ['graphql', 'react', 'article card', 'fetch', 'phase 17', 'headless', 'query articles'],
        build: { text: t('A React grid of article cards fed by GraphQL.', 'GraphQL se chalne wala React article cards ka grid.'), flow: { steps: ['Jahia', 'GraphQL', { label: 'Article query', sub: 'nodesByCriteria' }, 'React', 'Article card'] } },
        files: [
          { filename: 'latestArticles.graphql', language: 'graphql', code: ARTICLES_QUERY, highlight: [2, 7, 20, 22, 23], explain: t('2: LIVE. 7: language for the criteria. 20: i18n property with language. 22–23: follow references.', '2: LIVE. 7: criteria ki language. 20: language ke saath i18n property. 22–23: references follow karo.') },
          { filename: 'ArticleGrid.client.tsx', language: 'tsx', code: "import { useEffect, useState } from 'react';\nimport query from './latestArticles.graphql?raw';\n\ntype Card = { uuid: string; title: string; summary: string; image?: string; author?: string };\n\nexport default function ArticleGrid({ lang }: { lang: string }) {\n  const [cards, setCards] = useState<Card[]>([]);\n  const [error, setError] = useState<string | null>(null);\n\n  useEffect(() => {\n    fetch('/modules/graphql', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ query, variables: { lang, limit: 6, offset: 0 } }),\n    })\n      .then((r) => r.json())\n      .then(({ data, errors }) => {\n        if (errors?.length) throw new Error(errors[0].message);\n        setCards(\n          data.jcr.nodesByCriteria.nodes.map((n: any) => ({\n            uuid: n.uuid,\n            title: n.title?.value ?? '',\n            summary: n.summary?.value ?? '',\n            image: n.image?.refNode ? `/files/live${n.image.refNode.path}` : undefined,\n            author: n.author?.refNode?.name?.value,\n          }))\n        );\n      })\n      .catch((e) => setError(e.message));\n  }, [lang]);\n\n  if (error) return <p role=\"alert\">Could not load articles: {error}</p>;\n  return (\n    <div className=\"lv-grid\">\n      {cards.map((c) => (\n        <article key={c.uuid} className=\"lv-card\">\n          {c.image && <img src={c.image} alt=\"\" loading=\"lazy\" />}\n          <h3>{c.title}</h3>\n          <p>{c.summary}</p>\n          {c.author && <span>{c.author}</span>}\n        </article>\n      ))}\n    </div>\n  );\n}", highlight: [18, 24], explain: t('18: GraphQL errors arrive with HTTP 200 — check the errors array. 24: build the file URL from the referenced path.', '18: GraphQL errors HTTP 200 ke saath aate hain — errors array check karo. 24: referenced path se file URL banao.') },
        ],
        steps: [
          { title: t('Paste the query into GraphiQL; set variables {"lang":"en","limit":6,"offset":0}', 'Query GraphiQL mein paste karo; variables {"lang":"en","limit":6,"offset":0} set karo') },
          { title: t('Fix any field the Docs panel does not know (versions differ)', 'Jo field Docs panel na jaane use theek karo (versions alag hain)') },
          { title: t('Add ArticleGrid to your module (or a separate React app)', 'ArticleGrid apne module (ya alag React app) mein add karo') },
          { title: t('Render it on the Home page and compare with the server-rendered list', 'Home page pe render karo aur server-rendered list se compare karo') },
        ],
        expected: { checks: ['✓ Query works in GraphiQL', '✓ Six cards', '✓ Images load', '✓ Author names shown', '✓ Errors displayed, not swallowed'] },
        challenge: {
          prompt: t('Follow the image reference in GraphQL.', 'GraphQL mein image reference follow karo.'),
          code: 'image: property(name: "image") { ____ { path } }',
          options: ['value', 'refNode', 'node', 'uuid'],
          answer: 1,
          explanation: t('refNode resolves a reference property to its target node.', 'refNode reference property ko target node tak resolve karta hai.'),
          language: 'graphql',
        },
      },
    },
    {
      title: 'References, Pagination and Filters in GraphQL',
      difficulty: 'hard',
      tags: ['graphql', 'debugging', 'intermediate'],
      explanation: t(
        "A real listing needs more than \"the latest six\": page 2, only Technology, only featured, in Hindi. All of it goes into the query, not into JavaScript after the fact — filtering 500 articles in the browser is slow and leaks unpublished logic to the client.\n\nPAGINATION: limit and offset on the connection, and pageInfo.totalCount to draw the pager. Page n is offset = (n − 1) × limit.\n\nFILTERS: criteria narrow by node type, paths and language; property constraints (a nodeConstraint in the criteria) narrow by value — isFeatured equals true, or a category reference. Ordering sorts by a property.\n\nREFERENCES: refNode for a single reference, refNodes for a multiple one (related articles). You can nest them — article → author → photo — but each level is more work for the server; ask for what you render.\n\nERRORS: GraphQL returns HTTP 200 with an errors array when the query is wrong. The common ones: unknown field (your version names it differently), missing language on an i18n property (null value), wrong workspace (null results), permission (null node). Always reproduce in GraphiQL first.\n\nThe exact argument names for constraints and ordering vary between provider versions — the Docs panel is authoritative.",
        "Asli listing ko \"latest chhe\" se zyaada chahiye: page 2, sirf Technology, sirf featured, Hindi mein. Ye sab query mein jaata hai, baad mein JavaScript mein nahi — browser mein 500 articles filter karna dheema hai aur logic client tak leak karta hai.\n\nPAGINATION: connection pe limit aur offset, aur pager ke liye pageInfo.totalCount. Page n matlab offset = (n − 1) × limit.\n\nFILTERS: criteria node type, paths aur language se narrow karte hain; property constraints (criteria mein nodeConstraint) value se — isFeatured equals true, ya category reference. Ordering property se sort karta hai.\n\nREFERENCES: ek reference ke liye refNode, multiple ke liye refNodes (related articles). Nest kar sakte ho — article → author → photo — par har level server pe zyaada kaam; wahi maango jo render karte ho.\n\nERRORS: query galat ho toh GraphQL HTTP 200 ke saath errors array deta hai. Common: unknown field (tumhara version alag naam deta hai), i18n property pe language missing (null value), galat workspace (null results), permission (null node). Hamesha pehle GraphiQL mein reproduce karo.\n\nConstraints aur ordering ke exact argument names provider versions mein alag hain — Docs panel hi authority hai."
      ),
      dailyLifeExample: t(
        'Searching a train on IRCTC: you pick the route (paths), class (node type), date (filter), sort by departure (ordering), and see 10 trains per page (pagination). The server does the searching; your phone just shows the page.',
        'IRCTC pe train dhoondhna: route (paths), class (node type), date (filter), departure se sort (ordering), aur har page pe 10 trains (pagination). Search server karta hai; phone bas page dikhata hai.'
      ),
      keyPoints: ['Filter and paginate in the query', 'offset = (page − 1) × limit', 'refNode / refNodes for references', 'Errors come in the errors array with HTTP 200'],
      quiz: [
        q('limit 6, page 3. offset?', ['3', '12', '18', '6'], 1, '(3 − 1) × 6 = 12.'),
        q('HTTP 200 but no data. Where do you look first?', ['The status code', 'The errors array in the response', 'The browser cache', 'The CND'], 1, 'GraphQL reports errors in the body.'),
        q('Which follows a multiple reference like related articles?', ['refNode', 'refNodes', 'children', 'value'], 1, 'refNodes for multi-valued references.'),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 30,
        badges: ['coding', 'debugging'],
        version: 'Jahia 8.x (graphql-dxm-provider) — argument names vary by version',
        searchTerms: ['pagination', 'filter', 'offset', 'limit', 'totalCount', 'refNodes', 'nodeConstraint', 'ordering', 'graphql errors'],
        files: [
          { filename: 'featuredTechnology.graphql', language: 'graphql', code: 'query Featured($lang: String!, $offset: Int!) {\n  jcr(workspace: LIVE) {\n    nodesByCriteria(\n      criteria: {\n        nodeType: "lv:article"\n        paths: ["/sites/learnverse/contents/articles"]\n        language: $lang\n        nodeConstraint: { property: "isFeatured", equals: "true" }\n        ordering: { property: "publishedDate", orderType: DESC }\n      }\n      limit: 6\n      offset: $offset\n    ) {\n      pageInfo { totalCount }\n      nodes {\n        title: property(name: "jcr:title", language: $lang) { value }\n        related: property(name: "related") {\n          refNodes { title: property(name: "jcr:title", language: $lang) { value } }\n        }\n      }\n    }\n  }\n}', highlight: [8, 11, 12, 14, 18] },
          { filename: 'error response', language: 'text', code: '{\n  "errors": [\n    { "message": "Validation error of type FieldUndefined: Field \'publishDate\' in type \'JCRNode\' is undefined" }\n  ],\n  "data": null\n}', explain: t('Typical shape of a schema error: read the field name it complains about, then check Docs.', 'Schema error ka typical shape: jis field ki shikayat hai uska naam padho, phir Docs check karo.') },
        ],
        debug: [
          {
            title: t('GraphQL query fails', 'GraphQL query fail'),
            problem: t('errors array, or null data.', 'errors array, ya null data.'),
            causes: ['Field name differs in your version', 'EDIT vs LIVE', 'Missing language for i18n', 'Anonymous user lacks permission'],
            where: ['GraphiQL', 'Docs panel', 'Publication status'],
            fix: t('Reproduce in GraphiQL, fix the first error, check workspace and language.', 'GraphiQL mein reproduce karo, pehla error theek karo, workspace aur language check karo.'),
            prevention: t('Keep queries in .graphql files and test them before wiring React.', 'Queries .graphql files mein rakho aur React jodne se pehle test karo.'),
          },
        ],
        challenge: {
          prompt: t('Page 2 with 6 per page.', 'Page 2, har page pe 6.'),
          code: 'nodesByCriteria(criteria: {…}, limit: 6, offset: ____)',
          options: ['2', '6', '12', '0'],
          answer: 1,
          explanation: t('(2 − 1) × 6 = 6.', '(2 − 1) × 6 = 6.'),
          language: 'graphql',
        },
      },
    },
  ],
};

/* ═══════════════════ 11 · MULTILINGUAL ═══════════════════ */

const multilingual = {
  title: 'Multilingual',
  stage: 11,
  level: 'intermediate',
  estimatedMinutes: 60,
  description: t('Languages, i18n properties, translation, fallback and language-specific queries — with a real English + Hindi demo.', 'Languages, i18n properties, translation, fallback aur language-specific queries — asli English + Hindi demo ke saath.'),
  concepts: [
    fromLegacy('Languages and Multi-site', {
      codeLanguage: 'tsx',
      tags: ['multilingual', 'i18n', 'intermediate'],
      lesson: {
        kind: 'lesson',
        minutes: 20,
        badges: ['cms', 'coding'],
        searchTerms: ['language', 'i18n', 'translation', 'fallback', 'hindi', 'multilingual', 'mix language'],
        behind: { title: t('One node, two languages', 'Ek node, do languages'), steps: [{ label: 'Node', sub: 'welcome' }, { label: 'jcr:title [en]', sub: 'Welcome to Learnverse' }, { label: 'jcr:title [hi]', sub: 'Learnverse में आपका स्वागत है' }, { label: 'View', sub: 'reads current locale' }] },
        where: [
          { app: 'Administration', path: ['Sites', 'learnverse', 'Languages'], note: t('Add languages, set default and mandatory ones, and (where your version offers it) the option to show the default language when a translation is missing.', 'Languages add karo, default aur mandatory set karo, aur (jahan version de) translation missing ho toh default language dikhane ka option.') },
          { app: 'Content Editor', path: ['Language switcher', 'HI'] },
        ],
        table: {
          title: t('Translate or share?', 'Translate ya share?'),
          columns: ['Property', 'i18n?', 'Why'],
          rows: [['jcr:title', 'Yes', 'Text'], ['body', 'Yes', 'Text'], ['image', 'Usually no', 'Same picture everywhere'], ['price', 'No', 'Same number'], ['isFeatured', 'No', 'Same flag'], ['alt text', 'Yes', 'It is text']],
        },
      },
    }),
    {
      title: 'Lab — English + Hindi Welcome Banner',
      difficulty: 'medium',
      tags: ['lab', 'multilingual', 'i18n', 'graphql', 'intermediate'],
      explanation: t(
        "A real multilingual demo on the News Portal. You add Hindi to learnverse, make the hero's text i18n, author \"Welcome to Learnverse\" in English and \"Learnverse में आपका स्वागत है\" in Hindi, publish each language separately, and see both on the live site. Then you query the Hindi version over GraphQL and watch the fallback when a translation is missing.\n\nNote what stays shared: the background image is the same in both languages, so it is not i18n. That decision — translate text, share everything else — is the heart of multilingual modelling.",
        "News Portal pe asli multilingual demo. Tum learnverse mein Hindi add karoge, hero ka text i18n banaoge, English mein \"Welcome to Learnverse\" aur Hindi mein \"Learnverse में आपका स्वागत है\" author karoge, har language alag se publish karoge, aur live site pe dono dekhoge. Phir GraphQL se Hindi version query karoge aur translation missing hone pe fallback dekhoge.\n\nDhyaan do kya shared rehta hai: background image dono languages mein same hai, isliye i18n nahi. Ye decision — text translate karo, baaki sab share — multilingual modelling ka dil hai."
      ),
      dailyLifeExample: t(
        'A railway station board: the station name is written in Hindi and English (i18n), but the platform number is the same digit for everyone (shared).',
        'Railway station ka board: station ka naam Hindi aur English mein likha (i18n), par platform number sabke liye same digit (shared).'
      ),
      keyPoints: ['Add the language to the site', 'i18n on text only', 'Publish each language', 'Query with language; know the fallback'],
      quiz: [
        q('Hindi page shows the English heading. Most likely?', ['GraphQL is down', 'The Hindi value is missing or unpublished, and the site falls back to English', 'The image is i18n', 'Docker memory'], 1, 'Missing/unpublished translation → fallback.'),
        q('Should the hero background image be i18n?', ['Yes, always', 'Usually no — the picture is the same in every language', 'Only in Hindi', 'Images cannot be references'], 1, 'Share non-text values.'),
      ],
      lesson: {
        kind: 'lab',
        minutes: 35,
        badges: ['lab', 'cms', 'coding'],
        searchTerms: ['lab', 'hindi', 'english', 'multilingual', 'welcome banner', 'translation', 'hero'],
        build: {
          text: t('The same hero in two languages:', 'Wahi hero do languages mein:'),
          flow: { steps: [{ label: 'EN', sub: 'Welcome to Learnverse' }, { label: 'HI', sub: 'Learnverse में आपका स्वागत है' }] },
        },
        files: [
          { filename: 'definitions.cnd', language: 'cnd', code: "[lv:hero] > jnt:content, jmix:editorialContent\n - heading (string) i18n mandatory\n - subheading (string, textarea) i18n\n - background (weakreference, picker[type='image']) < 'jmix:image'", highlight: [2, 3, 4], explain: t('Text is i18n; the image is shared.', 'Text i18n hai; image shared.') },
          { filename: 'hero-hi.graphql', language: 'graphql', code: 'query {\n  jcr(workspace: LIVE) {\n    nodeByPath(path: "/sites/learnverse/home/main/hero") {\n      en: property(name: "heading", language: "en") { value }\n      hi: property(name: "heading", language: "hi") { value }\n    }\n  }\n}', highlight: [4, 5] },
        ],
        cmsVsCode: [
          { code: '- heading (string) i18n mandatory', field: { kind: 'text', label: 'Heading (EN)', value: 'Welcome to Learnverse', required: true, i18n: true } },
          { code: '- heading (string) i18n mandatory', field: { kind: 'text', label: 'Heading (HI)', value: 'Learnverse में आपका स्वागत है', required: true, i18n: true } },
        ],
        steps: [
          { title: t('Add Hindi (hi) to the learnverse site', 'learnverse site mein Hindi (hi) add karo') },
          { title: t('Deploy lv:hero with i18n text', 'i18n text ke saath lv:hero deploy karo') },
          { title: t('Add a hero on Home; fill English; Save', 'Home pe hero add karo; English bharo; Save') },
          { title: t('Switch the editor to Hindi; fill the Hindi heading; Save', 'Editor ko Hindi pe switch karo; Hindi heading bharo; Save') },
          { title: t('Publish English only; open /hi/… — see the fallback', 'Sirf English publish karo; /hi/… kholo — fallback dekho') },
          { title: t('Publish Hindi; reload /hi/…', 'Hindi publish karo; /hi/… reload karo') },
          { title: t('Run the GraphQL query', 'GraphQL query chalao') },
        ],
        expected: { checks: ['✓ Hindi added to the site', '✓ Both headings authored', '✓ Fallback seen before publishing HI', '✓ Hindi live after publishing', '✓ GraphQL returns en and hi'] },
      },
    },
  ],
};

/* ═══════════════════ 12 · MULTI-SITE ═══════════════════ */

const multisite = {
  title: 'Multi-site',
  stage: 12,
  level: 'intermediate',
  estimatedMinutes: 50,
  description: t('Two demo sites from one module: learnverse.com and learnverse.in.', 'Ek module se do demo sites: learnverse.com aur learnverse.in.'),
  concepts: [
    {
      title: 'Two Sites, One Module — learnverse.com and learnverse.in',
      difficulty: 'medium',
      tags: ['multi-site', 'cms', 'administration', 'intermediate'],
      explanation: t(
        "A single Jahia server can host many sites, and a single module can serve all of them. You will run two: learnverse.com (global, English) and learnverse.in (India, English + Hindi).\n\nWhat is PER SITE: the content tree (/sites/learnverse and /sites/learnverse-in are separate), languages, the domain (server name), enabled modules, users/groups/roles granted at site level, categories if you keep them per site.\n\nWhat is SHARED: the module code — lv:article means the same thing on both sites, and a bug fix ships to both. Templates, if both sites use the same template set. Server-level users and roles.\n\nSHARED CONTENT is a deliberate choice. Options: reference nodes across sites (possible, but it couples the sites' publication and permissions), keep shared assets in a common place (Jahia has a system site for shared assets such as categories in some setups), or copy content per site and let it diverge. Choose per content type: legal pages might be shared, news almost never is.\n\nConfiguration that differs per site (a newsletter list ID, an analytics key) should be site properties or configuration, not constants in your module.",
        "Ek Jahia server kai sites host kar sakta hai, aur ek module sabko serve kar sakta hai. Tum do chalaoge: learnverse.com (global, English) aur learnverse.in (India, English + Hindi).\n\nPER SITE kya hai: content tree (/sites/learnverse aur /sites/learnverse-in alag), languages, domain (server name), enabled modules, site level pe granted users/groups/roles, aur categories agar per site rakho.\n\nSHARED kya hai: module code — lv:article dono sites pe ek hi matlab rakhta hai, aur bug fix dono ko ship hota hai. Templates, agar dono same template set use karein. Server-level users aur roles.\n\nSHARED CONTENT ek soch-samajh ka choice hai. Options: sites ke beech nodes reference karo (ho sakta hai, par dono sites ki publication aur permissions jud jaati hain), shared assets ek common jagah rakho (kuch setups mein categories jaise shared assets ke liye Jahia ki system site hoti hai), ya har site pe content copy karo aur alag hone do. Content type ke hisaab se chuno: legal pages share ho sakte hain, news lagbhag kabhi nahi.\n\nJo configuration site-site alag ho (newsletter list ID, analytics key) wo site properties ya configuration mein ho, module ke constants mein nahi."
      ),
      dailyLifeExample: t(
        'A restaurant chain with a branch in Delhi and one in Dubai: the same kitchen manual (module), different menus, prices and languages (content and settings per site), and a few dishes shared on both menus by choice.',
        'Restaurant chain ki ek branch Delhi mein, ek Dubai mein: same kitchen manual (module), alag menus, prices aur languages (per site content aur settings), aur kuch dishes jaan-boojh ke dono menus pe.'
      ),
      keyPoints: ['One module, many sites', 'Per site: content, languages, domain, modules, site roles', 'Shared: code, templates, server users', 'Shared content is a deliberate choice'],
      quiz: [
        q('A bug fix in lv:article\'s view is deployed. Which site gets it?', ['Only learnverse.com', 'Both sites using the module', 'Neither until republished', 'Only the default site'], 1, 'Code is shared across sites.'),
        q('learnverse.in needs Hindi, learnverse.com does not. Where?', ['In the CND', 'Per-site language settings', 'In Docker', 'In GraphQL'], 1, 'Languages are per site.'),
      ],
      interviewQuestions: [
        iq({
          question: 'How do you structure a multi-site Jahia platform?',
          difficulty: 'hard',
          short: t('Shared modules and template set for code; one site per brand/market for content, languages, domain and site roles; explicit decisions about what content is shared.', 'Code ke liye shared modules aur template set; content, languages, domain aur site roles ke liye har brand/market ki ek site; kaunsa content share hoga uske explicit decisions.'),
          deep: t('Keep types generic enough for all sites; put per-site differences in site configuration, not code forks. Share content sparingly — cross-site references couple publication and permissions. Govern with site-level roles so one market\'s authors cannot touch another.', 'Types itne generic rakho ki sab sites chalein; per-site differences site configuration mein, code forks mein nahi. Content kam share karo — cross-site references publication aur permissions jod dete hain. Site-level roles se govern karo taaki ek market ke authors doosre ko chhu na sakein.'),
          tip: t('Mention the cost of cross-site references — shows real-world experience.', 'Cross-site references ki keemat batao — asli experience dikhta hai.'),
        }),
      ],
      lesson: {
        kind: 'lesson',
        minutes: 30,
        badges: ['cms', 'hands-on'],
        searchTerms: ['multi-site', 'multisite', 'two sites', 'domain', 'server name', 'shared content', 'learnverse.in'],
        table: {
          title: t('Per site vs shared', 'Per site vs shared'),
          columns: ['Thing', 'learnverse.com', 'learnverse.in'],
          rows: [['Content tree', '/sites/learnverse', '/sites/learnverse-in'], ['Languages', 'en', 'en, hi'], ['Server name', 'learnverse.com', 'learnverse.in'], ['Modules', 'lv-news (shared code)', 'lv-news (shared code)'], ['Authors group', 'global-authors', 'india-authors']],
        },
        steps: [
          { title: t('Create a second site learnverse-in from the same template set', 'Usi template set se doosri site learnverse-in banao') },
          { title: t('Set its server name (learnverse.in) and languages (en, hi)', 'Server name (learnverse.in) aur languages (en, hi) set karo') },
          { title: t('Enable lv-news on it', 'Uspe lv-news enable karo') },
          { title: t('Create one article on each site; confirm they are independent', 'Har site pe ek article banao; confirm karo dono independent hain') },
          { title: t('Locally, map both names to 127.0.0.1 in your hosts file to test domains', 'Local pe dono names hosts file mein 127.0.0.1 pe map karke domains test karo') },
        ],
        expected: { checks: ['✓ Two sites', '✓ Different languages', '✓ Same module on both', '✓ Independent content'] },
        where: [{ app: 'Administration', path: ['Sites', 'Create site'] }],
      },
    },
  ],
};

export const intermediateModules2 = [graphql, multilingual, multisite];
