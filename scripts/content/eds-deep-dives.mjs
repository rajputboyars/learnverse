/*
 * Step-by-step walkthroughs for the EDS general interview questions.
 *
 * Same shape and intent as the nodejs/react/nextjs deep-dive files: the
 * short `answer` is what you say out loud, and this walks the mechanism
 * one step at a time.
 *
 * Keyed by the EXACT question text in `generalInterviewQuestions`. Unmatched
 * keys are reported at import time (see the bottom of eds.mjs).
 *
 * Each value is an ordered list of sections:
 *   heading { en, hi }  the step's title
 *   body    { en, hi }  what happens at this step, and why
 *   diagram             optional ASCII sketch, rendered as-is in monospace
 *   code                optional snippet
 *
 * The thread running through the whole file: EDS's speed comes from doing
 * almost nothing at runtime — no framework, no bundler, no server render.
 * Almost every deep question here is really asking "what did EDS choose
 * NOT to do, and what did that choice cost".
 */

export const deepDives = {
  /* ─── decorate() and the block lifecycle ─────────────────── */

  'What does the decorate() function receive as its argument, and what must it return?': [
    {
      heading: { en: 'One argument, no return value', hi: 'Ek argument, koi return value nahi' },
      body: {
        en: 'decorate(block) receives exactly one thing: the raw DOM element scripts.js already found on the page — the <div> whose class matched a folder under blocks/. There is no second "props" argument, no context object. Everything the function needs, it reads back out of that element.',
        hi: 'decorate(block) exactly ek cheez leta hai: wo raw DOM element jo scripts.js ne page pe pehle se dhoond liya tha — wo <div> jiska class blocks/ ke kisi folder se match kiya. Koi dusra "props" argument nahi, koi context object nahi. Function ko jo bhi chahiye, wo usi element se wapas padhta hai.',
      },
      code: `// scripts.js, simplified — this is what calls your decorate()
async function decorateBlock(block) {
  const name = block.classList[0];                 // e.g. "cards"
  const mod = await import(\`/blocks/\${name}/\${name}.js\`);
  await mod.default(block);                         // <- your decorate()
}`,
    },
    {
      heading: { en: 'Why no return value is expected', hi: 'Return value kyun expect nahi hoti' },
      body: {
        en: 'scripts.js already holds the reference to the same block element — it does not need decorate() to hand anything back. Your job is to MUTATE that element in place (clear it, rebuild its children), not to produce a new one. This is the biggest mental shift coming from React, where a component returns JSX and something else applies it to the DOM.',
        hi: 'scripts.js ke paas already usi block element ka reference hai — use decorate() se kuch wapas lene ki zaroorat nahi. Tumhara kaam hai us element ko in-place MUTATE karna (clear karo, uske children rebuild karo), naya element banana nahi. Ye sabse bada mental shift hai React se aane par, jahan ek component JSX return karta hai aur koi aur cheez use DOM pe apply karti hai.',
      },
    },
    {
      heading: { en: 'async is allowed and common', hi: 'async allowed hai aur common hai' },
      body: {
        en: 'decorate() can be an async function — scripts.js awaits it before moving on to the next block or the next loading phase. This is exactly how the Fragment block works: it fetches another document\'s HTML and only finishes decorating once that fetch resolves.',
        hi: 'decorate() ek async function ho sakta hai — scripts.js agle block ya agle loading phase pe badhne se pehle use await karta hai. Fragment block bilkul isi tarah kaam karta hai: ye ek doosre document ki HTML fetch karta hai aur decoration tabhi khatam karta hai jab wo fetch resolve ho.',
      },
      code: `export default async function decorate(block) {
  const res = await fetch('/some/fragment.plain.html');
  block.innerHTML = await res.text();
}`,
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"decorate(block) receives the raw block element scripts.js discovered on the page and mutates it in place — clearing and rebuilding its children into semantic, styled markup. It doesn\'t need to return anything because scripts.js already holds that same reference; it can be async, and scripts.js awaits it before continuing."',
        hi: '"decorate(block) wo raw block element leta hai jo scripts.js ne page pe dhoonda, aur use in-place mutate karta hai — uske children ko clear karke semantic, styled markup mein rebuild karta hai. Kuch return karne ki zaroorat nahi kyunki scripts.js ke paas already wahi reference hai; ye async ho sakta hai, aur scripts.js aage badhne se pehle use await karta hai."',
      },
    },
  ],

  'Why does EDS avoid a JavaScript framework like React for block code?': [
    {
      heading: { en: 'Every byte of JS delays the same two things', hi: 'JS ka har byte inhi do cheezon ko der karta hai' },
      body: {
        en: 'Before any JavaScript runs, the browser must download it, parse it, and execute it — and all three cost time on the main thread. A framework runtime adds this cost on top of your own code, for every single page load, whether or not that page needs the framework\'s features.',
        hi: 'Koi bhi JavaScript chalne se pehle, browser use download, parse, aur execute karna padta hai — aur teeno main thread pe time lete hain. Ek framework runtime tumhare khud ke code ke upar ye cost jodta hai, har single page load ke liye, chahe us page ko framework ke features chahiye ho ya na ho.',
      },
    },
    {
      heading: { en: 'This maps directly onto two Core Web Vitals', hi: 'Ye directly do Core Web Vitals pe map hota hai' },
      body: {
        en: 'A bigger JS payload delays when the largest visible element can paint — hurting LCP. And once loaded, a virtual-DOM diff-and-re-render cycle on every interaction adds latency between a click and the screen updating — hurting INP. EDS is designed around these two metrics specifically, so both costs are unacceptable by design, not by accident.',
        hi: 'Ek bada JS payload is baat ko der karta hai ki sabse bada visible element kab paint ho sakta hai — LCP ko hurt karte hue. Aur load hone ke baad, har interaction pe ek virtual-DOM diff-and-re-render cycle click aur screen update hone ke beech latency jodta hai — INP ko hurt karte hue. EDS specifically inhi do metrics ke around design hai, isliye dono costs jaan-boojh kar unacceptable hain, accident se nahi.',
      },
    },
    {
      heading: { en: 'Most blocks do not need what a framework buys you', hi: 'Zyadatar blocks ko wo nahi chahiye jo framework deta hai' },
      body: {
        en: 'Frameworks earn their weight when UI has deep, frequently-changing state — a chat app, a spreadsheet. Most EDS blocks render content once from a fixed structure and rarely change after that. Plain DOM manipulation is not a compromise here; it is the right-sized tool for a mostly-static page.',
        hi: 'Frameworks apna weight tab kamaate hain jab UI mein gehri, baar-baar badalti state ho — ek chat app, ek spreadsheet. Zyadatar EDS blocks ek fixed structure se content ek baar render karte hain aur uske baad rarely badalte hain. Plain DOM manipulation yahan compromise nahi hai; ye ek mostly-static page ke liye sahi-size ka tool hai.',
      },
    },
    {
      heading: { en: 'What you give up, honestly', hi: 'Imaandaari se, kya chhodte ho' },
      body: {
        en: 'You lose declarative rendering, a component ecosystem (npm UI libraries), and compile-time type safety on your markup. For a block that genuinely needs rich, stateful interactivity, teams sometimes mount a small framework ISLAND inside one block\'s decorate() — the rest of the page stays framework-free.',
        hi: 'Tum declarative rendering, ek component ecosystem (npm UI libraries), aur apni markup pe compile-time type safety kho dete ho. Ek block ke liye jise genuinely rich, stateful interactivity chahiye, teams kabhi-kabhi ek chhota framework ISLAND ek block ke decorate() ke andar mount karti hain — page ka baaki hissa framework-free rehta hai.',
      },
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"A framework runtime adds download/parse/execute cost to every page load and re-render cost to every interaction — directly hurting LCP and INP, the two metrics EDS is optimised around. Most blocks are simple, mostly-static content, so plain DOM manipulation is enough; for a block that genuinely needs rich interactivity, you can still mount a small framework island inside just that one block."',
        hi: '"Ek framework runtime har page load pe download/parse/execute cost jodta hai aur har interaction pe re-render cost — directly LCP aur INP ko hurt karte hue, wo do metrics jinke around EDS optimise hai. Zyadatar blocks simple, mostly-static content hote hain, isliye plain DOM manipulation kaafi hai; jis block ko genuinely rich interactivity chahiye, uske liye tum phir bhi sirf us ek block ke andar ek chhota framework island mount kar sakte ho."',
      },
    },
  ],

  /* ─── CSS scoping and debugging ──────────────────────────── */

  'What happens if two different blocks accidentally use the same, unscoped CSS class name?': [
    {
      heading: { en: 'Every block\'s CSS loads on every page, globally', hi: 'Har block ki CSS har page pe globally load hoti hai' },
      body: {
        en: 'There is no CSS Modules, no Shadow DOM, no automatic scoping in the default EDS pipeline. When scripts.js decorates a block, it also injects that block\'s <link rel="stylesheet"> into the page\'s <head> — as a normal, global stylesheet that applies to the whole document.',
        hi: 'Default EDS pipeline mein koi CSS Modules nahi, koi Shadow DOM nahi, koi automatic scoping nahi hai. Jab scripts.js ek block decorate karta hai, ye us block ka <link rel="stylesheet"> bhi page ke <head> mein inject karta hai — ek normal, global stylesheet ki tarah jo poore document pe apply hoti hai.',
      },
    },
    {
      heading: { en: 'A collision is silent — no error, just wrong styling', hi: 'Collision chup-chaap hota hai — koi error nahi, bas galat styling' },
      body: {
        en: 'If blocks/cards/cards.css and blocks/hero/hero.css both define a bare .title rule, both apply to every .title on the page, and normal CSS specificity/source-order rules decide the winner — silently, with no console warning. You only notice because something looks visually wrong.',
        hi: 'Agar blocks/cards/cards.css aur blocks/hero/hero.css dono ek bare .title rule define karte hain, to dono har .title pe page pe apply hote hain, aur normal CSS specificity/source-order rules winner decide karte hain — chup-chaap, bina kisi console warning ke. Tumhe pata tab chalta hai jab kuch visually galat lagta hai.',
      },
      code: `/* blocks/cards/cards.css */
.title { font-size: 1.5rem; }

/* blocks/hero/hero.css */
.title { font-size: 3rem; color: white; }   /* silently wins on later-loaded pages */`,
    },
    {
      heading: { en: 'The fix is a naming discipline, not a tool', hi: 'Fix ek naming discipline hai, koi tool nahi' },
      body: {
        en: 'Every selector in a block\'s CSS must be prefixed with that block\'s own class — .cards .title, .hero .title — so the two rules can never target the same element unless both blocks are literally the same block. This is enforced by convention and code review, not by the platform.',
        hi: 'Block ki CSS mein har selector us block ki apni class se prefixed hona chahiye — .cards .title, .hero .title — taaki dono rules kabhi ek hi element ko target na kar sakein, jab tak dono blocks literally same block na hon. Ye convention aur code review se enforce hota hai, platform se nahi.',
      },
      code: `/* correct */
.cards .title { font-size: 1.5rem; }
.hero .title  { font-size: 3rem; color: white; }`,
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"Because every block\'s CSS is injected globally with no automatic scoping, an unscoped rule in one block silently overrides or gets overridden by the same rule in another block, based on normal CSS cascade rules — with no error, just visually wrong output. The fix is a strict naming convention: every selector must be prefixed by the block\'s own class, enforced by code review since the platform doesn\'t enforce it."',
        hi: '"Kyunki har block ki CSS globally inject hoti hai bina kisi automatic scoping ke, ek block mein ek unscoped rule chup-chaap ek doosre block mein wahi rule se override ho jaata hai ya use override kar deta hai, normal CSS cascade rules ke hisaab se — koi error nahi, bas visually galat output. Fix ek strict naming convention hai: har selector block ki apni class se prefixed hona chahiye, jo code review se enforce hota hai kyunki platform khud enforce nahi karta."',
      },
    },
  ],

  'How would you debug a block that isn\'t rendering at all on a page?': [
    {
      heading: { en: 'Split the problem: content vs. code', hi: 'Problem ko baanto: content vs. code' },
      body: {
        en: 'A block that never appears has exactly two possible failure points: either the pipeline never generated the expected raw HTML from the author\'s doc, or your JS never ran on the HTML that WAS generated. Isolating which half is broken first saves you from debugging the wrong file.',
        hi: 'Ek block jo kabhi appear nahi hota uske exactly do possible failure points hain: ya to pipeline ne author ke doc se expected raw HTML generate hi nahi kiya, ya tumhari JS us HTML pe kabhi chali hi nahi jo generate HUI thi. Pehle ye isolate karna ki kaunsa half toota hai, tumhe galat file debug karne se bachaata hai.',
      },
    },
    {
      heading: { en: 'Step 1 — check the raw pipeline output directly', hi: 'Step 1 — raw pipeline output directly check karo' },
      body: {
        en: 'Every EDS page has a .plain.html version — the raw, undecorated HTML the pipeline generated, before scripts.js touches it. Requesting it directly tells you immediately whether the problem is upstream (the author\'s table, or the pipeline) or downstream (your code).',
        hi: 'Har EDS page ka ek .plain.html version hota hai — wo raw, undecorated HTML jo pipeline ne generate ki, scripts.js ke chhune se pehle. Ise directly request karna tumhe turant batata hai ki problem upstream hai (author ka table, ya pipeline) ya downstream (tumhara code).',
      },
      code: `curl https://main--repo--org.aem.page/some-page.plain.html
# Look for: <div class="cards">...</div>
# If it's missing/wrong -> the problem is the doc's table structure
# If it looks right      -> the problem is in your JS`,
    },
    {
      heading: { en: 'Step 2 — if the raw HTML is correct, check block detection', hi: 'Step 2 — agar raw HTML sahi hai, block detection check karo' },
      body: {
        en: 'scripts.js matches a block purely by class name against a folder under blocks/ — case-sensitively. A folder named Quote will not match a class named "quote". Confirm the exact spelling and casing line up between the doc\'s table name, the generated class, and your folder name.',
        hi: 'scripts.js ek block ko sirf class name ke through blocks/ ke kisi folder se match karta hai — case-sensitively. Quote naam ka folder "quote" naam ki class se match nahi karega. Confirm karo ki doc ke table naam, generated class, aur tumhare folder naam ki exact spelling aur casing match karti hai.',
      },
    },
    {
      heading: { en: 'Step 3 — check the browser console for an import/runtime error', hi: 'Step 3 — browser console mein import/runtime error check karo' },
      body: {
        en: 'If scripts.js does find the block but decorate() throws — a null reference from an unguarded assumption about row count, for instance — the block is left in whatever partial state it was in when the error fired, often looking like it "did nothing". The console will show the exact line.',
        hi: 'Agar scripts.js block dhoond leta hai par decorate() throw karta hai — jaise row count ke baare mein ek unguarded assumption se ek null reference — block jis bhi partial state mein tha wahin reh jaata hai jab error fire hui, aur aksar aisa lagta hai jaise "kuch hua hi nahi". Console exact line dikhayega.',
      },
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"First check the page\'s .plain.html to see if EDS even generated the expected raw block markup from the doc — that tells you if it\'s a content/authoring issue or a code issue. If the raw HTML looks right, check that the block\'s folder name exactly matches the class name, case-sensitively, and then check the browser console for a runtime error inside decorate() itself."',
        hi: '"Pehle page ki .plain.html check karo ye dekhne ke liye ki EDS ne doc se expected raw block markup generate bhi kiya ki nahi — ye batata hai ki ye content/authoring issue hai ya code issue. Agar raw HTML sahi lagti hai, check karo ki block ka folder naam exactly class name se match karta hai, case-sensitively, phir decorate() ke andar kisi runtime error ke liye browser console check karo."',
      },
    },
  ],

  /* ─── Local dev, authoring model, state ──────────────────── */

  'What is the "works on my machine" style problem that EDS\'s local dev server proxy setup solves?': [
    {
      heading: { en: 'The trap of hand-written test content', hi: 'Haath se likhe test content ka trap' },
      body: {
        en: 'If your local dev server served fake/mocked content, every developer would hand-craft their own sample docs to test against — clean, well-formatted, exactly the shape they expect. That is precisely the content real authors do NOT reliably produce.',
        hi: 'Agar tumhara local dev server fake/mocked content serve karta, to har developer apne khud ke sample docs haath se banata test karne ke liye — clean, well-formatted, exactly wahi shape jo wo expect karta. Ye exactly wo content hai jo real authors RELIABLY nahi banate.',
      },
    },
    {
      heading: { en: 'What the proxy actually does', hi: 'Proxy actually karta kya hai' },
      body: {
        en: 'aem-cli up serves your local blocks/styles/scripts from disk, but forwards every request for a page\'s content through to the project\'s real, configured Google Drive/SharePoint source — the exact same source production reads from.',
        hi: 'aem-cli up tumhare local blocks/styles/scripts disk se serve karta hai, par page ke content ke har request ko project ke real, configured Google Drive/SharePoint source tak forward karta hai — bilkul wahi source jise production padhta hai.',
      },
    },
    {
      heading: { en: 'The bug class this prevents', hi: 'Ye bug ki kaunsi class rokta hai' },
      body: {
        en: 'A block that works perfectly against your own tidy test doc but crashes the first time a real author leaves a cell empty, or types an extra row, is a bug that "works on my machine" testing would never catch — but proxying real content surfaces it during local development, before it ships.',
        hi: 'Ek block jo tumhare khud ke saaf-suthre test doc ke against perfectly kaam karta hai par pehli baar crash hota hai jab ek real author ek cell khaali chhodta hai, ya ek extra row type karta hai — ye ek aisa bug hai jise "works on my machine" testing kabhi nahi pakdegi — par real content proxy karna ise local development ke dauraan hi saamne le aata hai, ship hone se pehle.',
      },
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"Without the proxy, developers would test against hand-written mock content that\'s cleaner than what real authors actually produce, hiding bugs that only show up with real-world data — missing rows, odd formatting, long text. By always proxying live content from the actual document source while serving local code, the dev server guarantees you\'re testing against real content shapes from day one."',
        hi: '"Bina proxy ke, developers haath se likhe mock content ke against test karte jo real authors ke actual output se cleaner hota, aise bugs chhupate hue jo sirf real-world data ke saath dikhte hain — missing rows, ajeeb formatting, lambi text. Local code serve karte hue hamesha actual document source se live content proxy karke, dev server guarantee karta hai ki tum din ek se hi real content shapes ke against test kar rahe ho."',
      },
    },
  ],

  'A content author reports that a table for a "Cards" block isn\'t rendering as cards. What are the first things you check?': [
    {
      heading: { en: 'Casing and exact spelling in the first cell', hi: 'Pehle cell mein casing aur exact spelling' },
      body: {
        en: 'The block name is matched from the first cell of the table\'s first row, converted to a CSS class. "Cards", "cards ", or "Card" all produce a different class than the blocks/cards folder expects. This single typo is the most common cause by far.',
        hi: 'Block ka naam table ki pehli row ke pehle cell se match kiya jaata hai, ek CSS class mein convert karke. "Cards", "cards ", ya "Card" sab alag class banate hain jo blocks/cards folder expect karta hai. Ye ek single typo sabse common wajah hai.',
      },
    },
    {
      heading: { en: 'Nested tables confuse the doc-to-HTML conversion', hi: 'Nested tables doc-to-HTML conversion ko confuse karti hain' },
      body: {
        en: 'If the Cards table was accidentally pasted or typed inside another table or a bulleted list, the conversion pipeline can misinterpret its boundaries, producing malformed or missing markup. Ask the author to check the doc\'s outline view for accidental nesting.',
        hi: 'Agar Cards table galti se kisi doosri table ya bulleted list ke andar paste ya type ho gayi, conversion pipeline uske boundaries misinterpret kar sakti hai, malformed ya missing markup banate hue. Author se doc ka outline view check karne ko kaho accidental nesting ke liye.',
      },
    },
    {
      heading: { en: 'Check the raw .plain.html before touching any code', hi: 'Kisi bhi code ko chhune se pehle raw .plain.html check karo' },
      body: {
        en: 'This settles the question fast: fetch the page\'s .plain.html and search for the expected <div class="cards">. If it\'s absent, the fix is in the document, not the codebase — save yourself from debugging cards.js for a problem that isn\'t there.',
        hi: 'Ye sawaal jaldi settle karta hai: page ki .plain.html fetch karo aur expected <div class="cards"> dhoondo. Agar wo absent hai, fix document mein hai, codebase mein nahi — apne aap ko cards.js debug karne se bachao ek aise problem ke liye jo hai hi nahi.',
      },
    },
    {
      heading: { en: 'Cache — the oldest trick in web debugging', hi: 'Cache — web debugging ka sabse purana trick' },
      body: {
        en: 'Preview and CDN layers cache aggressively for speed. If the author published recently, confirm the page was actually re-fetched and not served stale — a hard refresh or a cache-busting query param rules this out before you go any deeper.',
        hi: 'Preview aur CDN layers speed ke liye aggressively cache karti hain. Agar author ne recently publish kiya, confirm karo ki page actually dobara fetch hua na ki stale serve hua — ek hard refresh ya cache-busting query param isse rule out kar deta hai aage jaane se pehle.',
      },
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"First, the exact spelling/casing of \'Cards\' in the table\'s first cell against the blocks/cards folder name — the single most common cause. Second, whether the table is accidentally nested inside another table or list. Then I\'d fetch the page\'s raw .plain.html directly to confirm whether EDS even generated the expected markup, before assuming the bug is in my JS or CSS — and rule out stale caching along the way."',
        hi: '"Pehle, table ke pehle cell mein \'Cards\' ki exact spelling/casing blocks/cards folder ke naam ke against — sabse common wajah. Doosra, kya table galti se kisi doosri table ya list ke andar nested hai. Phir main page ki raw .plain.html directly fetch karunga confirm karne ke liye ki EDS ne expected markup generate bhi kiya, ye assume karne se pehle ki bug mere JS ya CSS mein hai — aur raaste mein stale caching bhi rule out karunga."',
      },
    },
  ],

  'How is state management typically handled in EDS blocks, given there\'s no Redux/Context?': [
    {
      heading: { en: 'Most blocks genuinely have no state to manage', hi: 'Zyadatar blocks ko genuinely koi state manage karni hi nahi hoti' },
      body: {
        en: 'A Cards or Hero block renders once from content that does not change while the page is open. There is nothing to keep in sync, so the question of "which state library" often does not even arise — the honest first answer is "usually none is needed".',
        hi: 'Ek Cards ya Hero block ek baar render hota hai us content se jo page khule rehte hue nahi badalta. Sync mein rakhne ke liye kuch hai hi nahi, isliye "kaunsi state library" ka sawaal aksar uthta hi nahi — imaandaar pehla jawab hai "usually kisi ki zaroorat nahi".',
      },
    },
    {
      heading: { en: 'Local interactivity — closures over DOM state', hi: 'Local interactivity — DOM state pe closures' },
      body: {
        en: 'When a block needs simple interactivity — a tab switcher, an accordion — the "state" is just variables captured in a closure inside decorate(), plus classList toggles and data-attributes on the elements themselves, read directly from the DOM rather than a parallel JS object.',
        hi: 'Jab ek block ko simple interactivity chahiye — ek tab switcher, ek accordion — "state" bas decorate() ke andar ek closure mein capture hue variables hain, plus elements pe khud classList toggles aur data-attributes, jo directly DOM se padhe jaate hain, ek parallel JS object se nahi.',
      },
      code: `export default function decorate(block) {
  const tabs = [...block.querySelectorAll('[role="tab"]')];
  let active = 0;                       // "state" — a closure variable
  tabs.forEach((tab, i) => tab.addEventListener('click', () => {
    tabs[active].setAttribute('aria-selected', 'false');
    active = i;
    tabs[active].setAttribute('aria-selected', 'true');
  }));
}`,
    },
    {
      heading: { en: 'Cross-block communication is rare, and deliberately so', hi: 'Cross-block communication rare hai, aur jaan-boojh kar' },
      body: {
        en: 'Blocks are designed to be independent and reusable across any page, so tightly coupling two blocks through shared state works against that design. When two blocks genuinely must coordinate — a filter block and a results block — the usual escape hatch is a browser-native CustomEvent dispatched on a shared ancestor, not a JS state library.',
        hi: 'Blocks independent aur kisi bhi page pe reusable hone ke liye design hote hain, isliye do blocks ko shared state se tightly couple karna us design ke khilaaf jaata hai. Jab do blocks ko genuinely coordinate karna hi ho — ek filter block aur ek results block — usual escape hatch ek browser-native CustomEvent hai jo ek shared ancestor pe dispatch hota hai, koi JS state library nahi.',
      },
      code: `// filter block dispatches...
block.dispatchEvent(new CustomEvent('filter-changed', { bubbles: true, detail: { tag } }));

// ...results block listens, higher up the DOM
document.addEventListener('filter-changed', (e) => rerender(e.detail.tag));`,
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"Most blocks are stateless, content-driven UI, so they simply don\'t need shared state management. Local interactivity is handled with plain closures and DOM state (classList, data-attributes) scoped to that one block. Cross-block coordination is intentionally rare — when needed, teams typically reach for a browser-native CustomEvent rather than pulling in a state library, to keep blocks independent and reusable."',
        hi: '"Zyadatar blocks stateless, content-driven UI hote hain, isliye unhe shared state management ki zaroorat hi nahi hoti. Local interactivity plain closures aur DOM state (classList, data-attributes) se handle hoti hai us ek block tak scoped. Cross-block coordination jaan-boojh kar rare hai — jab chahiye ho, teams typically ek browser-native CustomEvent use karti hain ek state library laane ke bajaye, blocks ko independent aur reusable rakhne ke liye."',
      },
    },
  ],

  'Why is the sync-block-collection style tooling (syncing blocks from a shared "block collection" repo) useful across multiple EDS projects?': [
    {
      heading: { en: 'The same handful of blocks appear on almost every site', hi: 'Wahi mutthi bhar blocks lagbhag har site pe dikhte hain' },
      body: {
        en: 'Cards, Hero, Columns, Accordion, Tabs — these show up in nearly every marketing site regardless of the brand. Rebuilding them from scratch on every new EDS project is pure duplicated effort for code that has already been written, tested, and hardened elsewhere.',
        hi: 'Cards, Hero, Columns, Accordion, Tabs — ye lagbhag har marketing site pe dikhte hain chahe brand koi bhi ho. Har naye EDS project pe inhe zero se banana pure duplicated effort hai us code ke liye jo already kahin aur likha, tested, aur hardened ho chuka hai.',
      },
    },
    {
      heading: { en: 'A shared repo, pulled into each project as needed', hi: 'Ek shared repo, har project mein zaroorat ke hisaab se pull ki jaati hai' },
      body: {
        en: 'A sync script (like the boilerplate\'s sync-block-collection.sh) copies specific block folders from a shared "block collection" source repo into a project\'s own blocks/ directory — the project keeps a normal, independent codebase, it just started from proven code instead of a blank file.',
        hi: 'Ek sync script (jaise boilerplate ka sync-block-collection.sh) specific block folders ko ek shared "block collection" source repo se project ke apne blocks/ directory mein copy karta hai — project ka apna normal, independent codebase hi rehta hai, ye bas ek blank file ke bajaye proven code se shuru hota hai.',
      },
    },
    {
      heading: { en: 'It is a copy, not a live dependency — on purpose', hi: 'Ye ek copy hai, koi live dependency nahi — jaan-boojh kar' },
      body: {
        en: 'Unlike an npm package, the block is copied into the project\'s own repo, not installed as a versioned dependency. That means a project can freely customise its copy of Cards without affecting any other project, at the cost of not automatically getting upstream fixes — a deliberate trade favouring per-project autonomy over centralised updates.',
        hi: 'Ek npm package ke unlike, block project ke apne repo mein copy hota hai, ek versioned dependency ki tarah install nahi hota. Matlab ek project apni Cards ki copy freely customise kar sakta hai bina kisi doosre project ko affect kiye, iski cost hai ki upstream fixes automatically nahi milte — ek jaan-boojh kar liya gaya trade jo per-project autonomy ko centralised updates se zyada priority deta hai.',
      },
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"Most EDS sites need the same common blocks — Cards, Hero, Columns — so a shared block-collection repo lets teams pull battle-tested implementations into a new project\'s blocks/ folder instead of rebuilding them. It\'s a one-time copy rather than an npm-style dependency, so each project can freely customise its copy, trading automatic upstream updates for full per-project autonomy."',
        hi: '"Zyadatar EDS sites ko wahi common blocks chahiye hote hain — Cards, Hero, Columns — isliye ek shared block-collection repo teams ko battle-tested implementations ek naye project ke blocks/ folder mein pull karne deta hai, unhe dobara banane ke bajaye. Ye ek npm-style dependency ke bajaye ek one-time copy hai, isliye har project apni copy freely customise kar sakta hai, automatic upstream updates ko full per-project autonomy ke badle chhod kar."',
      },
    },
  ],

  /* ─── New, deeper advanced questions ─────────────────────── */

  'Walk through exactly what happens between an author clicking "Publish" and a user seeing the new content live.': [
    {
      heading: { en: 'Publish is a document-state change, not a code deploy', hi: 'Publish ek document-state change hai, koi code deploy nahi' },
      body: {
        en: 'Clicking publish tells EDS to promote a specific document from its PREVIEW state to its LIVE state. No git commit happens, no CI pipeline runs, no server restarts — the code serving the page was already live before and after this action.',
        hi: 'Publish click karna EDS ko batata hai ki ek specific document ko uski PREVIEW state se LIVE state mein promote karo. Koi git commit nahi hota, koi CI pipeline nahi chalti, koi server restart nahi hota — page serve karne wala code is action se pehle aur baad, dono mein already live tha.',
      },
    },
    {
      heading: { en: 'The pipeline re-converts the document into HTML', hi: 'Pipeline document ko dobara HTML mein convert karti hai' },
      body: {
        en: 'On publish, EDS\'s content pipeline re-reads the document from Google Drive/SharePoint and regenerates its HTML representation, then stores/serves that under the .live domain rather than .page.',
        hi: 'Publish pe, EDS ki content pipeline document ko Google Drive/SharePoint se dobara padhti hai aur uski HTML representation regenerate karti hai, phir use .page ke bajaye .live domain ke under store/serve karti hai.',
      },
    },
    {
      heading: { en: 'The CDN edge cache is invalidated for that path', hi: 'Us path ke liye CDN edge cache invalidate hoti hai' },
      body: {
        en: 'Because EDS serves pages from CDN edge caches for speed, the old cached HTML for that exact path must be purged, or the next visitor would still see stale content. This invalidation is scoped to the changed path(s), not the whole site.',
        hi: 'Kyunki EDS speed ke liye pages ko CDN edge caches se serve karta hai, us exact path ki purani cached HTML purge honi chahiye, warna agla visitor bhi stale content dekhega. Ye invalidation changed path(s) tak scoped hoti hai, poori site tak nahi.',
      },
    },
    {
      heading: { en: 'The next request re-fetches, decorates, and caches fresh', hi: 'Agli request dobara fetch, decorate, aur fresh cache karti hai' },
      body: {
        en: 'The next user request for that path misses the (now-invalidated) cache, the CDN fetches the freshly-regenerated HTML, the browser runs the same scripts.js/decorate() pipeline as always on that fresh HTML, and the edge caches the new response for subsequent visitors.',
        hi: 'Us path ke liye agli user request (ab-invalidated) cache ko miss karti hai, CDN freshly-regenerated HTML fetch karta hai, browser us fresh HTML pe wahi hamesha wali scripts.js/decorate() pipeline chalata hai, aur edge agle visitors ke liye naya response cache karta hai.',
      },
      diagram: `Author clicks Publish
      │
      ▼
Pipeline re-converts doc -> fresh HTML on .live
      │
      ▼
CDN cache invalidated for that path
      │
      ▼
Next visitor: cache miss -> fresh HTML served -> decorate() runs as usual`,
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"Publish moves a document from its preview state to its live state — a content operation, not a code deploy. EDS\'s pipeline re-converts the document into fresh HTML under the .live domain, invalidates the CDN edge cache for that specific path, and the next visitor gets the newly-cached, freshly-decorated page — all without touching the code repo or redeploying anything."',
        hi: '"Publish ek document ko uski preview state se live state mein move karta hai — ek content operation, koi code deploy nahi. EDS ki pipeline document ko fresh HTML mein .live domain ke under dobara convert karti hai, us specific path ke liye CDN edge cache invalidate karti hai, aur agla visitor naya cached, freshly-decorated page paata hai — code repo chhue bina ya kuch bhi redeploy kiye bina."',
      },
    },
  ],

  'What is the performance cost of putting too much JavaScript inside a single block\'s decorate(), and how would you diagnose it?': [
    {
      heading: { en: 'decorate() runs on the main thread, synchronously by default', hi: 'decorate() main thread pe chalta hai, default se synchronously' },
      body: {
        en: 'Unless you explicitly defer work, every line of decorate() blocks the main thread while it runs. A heavy block — one doing a lot of DOM creation, layout-triggering reads, or synchronous computation — delays every other block\'s decoration behind it, and delays the page becoming interactive.',
        hi: 'Jab tak tum explicitly kaam defer nahi karte, decorate() ki har line chalte waqt main thread ko block karti hai. Ek heavy block — jo bahut saari DOM creation, layout-trigger karne wale reads, ya synchronous computation karta hai — uske peeche har doosre block ki decoration ko der karta hai, aur page ke interactive banne ko der karta hai.',
      },
    },
    {
      heading: { en: 'A common trap — reading layout inside a loop', hi: 'Ek common trap — loop ke andar layout padhna' },
      body: {
        en: 'Calling something like offsetHeight or getBoundingClientRect() right after changing the DOM forces the browser to synchronously recompute layout ("layout thrashing"). Doing this inside a forEach over many cards multiplies a cheap-looking line into a real performance problem.',
        hi: 'DOM badalne ke turant baad offsetHeight ya getBoundingClientRect() jaisi cheez call karna browser ko synchronously layout recompute karne pe majboor karta hai ("layout thrashing"). Bahut saari cards pe ek forEach ke andar ye karna ek sasti dikhne wali line ko ek real performance problem mein multiply kar deta hai.',
      },
      code: `// BAD — forces a layout recalculation on every iteration
cards.forEach((card) => {
  card.style.height = 'auto';
  const h = card.offsetHeight;   // 💥 forces synchronous layout, N times
  card.dataset.h = h;
});`,
    },
    {
      heading: { en: 'Diagnosing it — the Performance panel, not guesswork', hi: 'Ise diagnose karna — Performance panel, guesswork nahi' },
      body: {
        en: 'Record a page load in the browser DevTools Performance panel and look at the Main track during the eager/lazy phases: a long, unbroken "Task" bar attributable to a block\'s decorate() call is the concrete symptom, and the flame chart shows exactly which lines inside it are expensive.',
        hi: 'Browser DevTools ke Performance panel mein ek page load record karo aur eager/lazy phases ke dauraan Main track ko dekho: ek lambi, unbroken "Task" bar jo kisi block ke decorate() call se attributable hai concrete symptom hai, aur flame chart exactly batata hai ki uske andar kaunsi lines expensive hain.',
      },
    },
    {
      heading: { en: 'The fix, once found: defer, batch, or move off the block', hi: 'Fix, mil jaane par: defer karo, batch karo, ya block se hatao' },
      body: {
        en: 'Batch DOM reads and writes separately instead of interleaving them, move genuinely non-critical setup (analytics hooks inside a block, for example) into scripts/delayed.js instead of the block\'s eager decorate(), and for very heavy computation consider a Web Worker so the main thread stays free.',
        hi: 'DOM reads aur writes ko interleave karne ke bajaye alag-alag batch karo, genuinely non-critical setup (jaise ek block ke andar analytics hooks) ko block ke eager decorate() ke bajaye scripts/delayed.js mein move karo, aur bahut heavy computation ke liye ek Web Worker consider karo taaki main thread free rahe.',
      },
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"decorate() runs synchronously on the main thread by default, so a heavy block delays every block behind it and delays interactivity — a common trap is reading layout properties like offsetHeight inside a DOM-writing loop, forcing repeated synchronous layout. I\'d diagnose it with the DevTools Performance panel, looking for a long main-thread task during the eager/lazy phases, then fix it by batching reads/writes, deferring non-critical work to delayed.js, or moving heavy computation to a Web Worker."',
        hi: '"decorate() default se main thread pe synchronously chalta hai, isliye ek heavy block uske peeche har block ko der karta hai aur interactivity ko der karta hai — ek common trap hai offsetHeight jaisi layout properties ko ek DOM-likhne wale loop ke andar padhna, jo baar-baar synchronous layout force karta hai. Main ise DevTools ke Performance panel se diagnose karunga, eager/lazy phases ke dauraan ek lambi main-thread task dhoondte hue, phir reads/writes batch karke, non-critical kaam delayed.js mein defer karke, ya heavy computation ko Web Worker mein move karke fix karunga."',
      },
    },
  ],

  'How would you implement a "Load More" / pagination pattern inside a block, given there\'s no framework state management?': [
    {
      heading: { en: 'Decide what the "full list" source actually is', hi: 'Decide karo ki "poori list" ka source actually kya hai' },
      body: {
        en: 'First question, before any code: does the author type ALL items directly into the doc\'s table (a bounded, small list), or does the data come from elsewhere (a spreadsheet-backed index, an external API)? The pattern differs — a doc-authored list is already fully in the DOM; an external source needs a fetch.',
        hi: 'Pehla sawaal, kisi code se pehle: kya author SAARE items directly doc ke table mein type karta hai (ek bounded, chhoti list), ya data kahin aur se aata hai (ek spreadsheet-backed index, ek external API)? Pattern alag hota hai — ek doc-authored list already poori DOM mein hai; ek external source ko fetch chahiye.',
      },
    },
    {
      heading: { en: 'The doc-authored case — hide, don\'t re-fetch', hi: 'Doc-authored case — chhupao, dobara-fetch mat karo' },
      body: {
        en: 'If every item already exists in the DOM (typed by the author), decorate() renders all of them once, hides everything past a page-size limit, and a plain click handler on a "Load more" button reveals the next batch by toggling a hidden attribute — no fetch, no re-render, just DOM visibility state.',
        hi: 'Agar har item already DOM mein exist karta hai (author dwara typed), decorate() unhe sab ek baar render karta hai, ek page-size limit ke aage sab chhupa deta hai, aur ek "Load more" button pe ek plain click handler agla batch ek hidden attribute toggle karke reveal karta hai — koi fetch nahi, koi re-render nahi, bas DOM visibility state.',
      },
      code: `export default function decorate(block) {
  const items = [...block.children];
  const pageSize = 6;
  items.forEach((item, i) => { if (i >= pageSize) item.hidden = true; });

  const btn = document.createElement('button');
  btn.textContent = 'Load more';
  let shown = pageSize;
  btn.addEventListener('click', () => {
    items.slice(shown, shown + pageSize).forEach((i) => { i.hidden = false; });
    shown += pageSize;
    if (shown >= items.length) btn.remove();
  });
  block.append(btn);
}`,
    },
    {
      heading: { en: 'The external-source case — fetch, append, track an offset', hi: 'External-source case — fetch, append, ek offset track karo' },
      body: {
        en: 'If items come from an external source, "state" is just one plain variable — an offset — captured in decorate()\'s closure. Each click fetches the next page, appends new elements (never re-renders existing ones), and advances the offset. No store, no reducer — a closure variable is the entire state management.',
        hi: 'Agar items ek external source se aate hain, "state" bas ek plain variable hai — ek offset — jo decorate() ke closure mein capture hota hai. Har click agla page fetch karta hai, naye elements append karta hai (existing ko kabhi re-render nahi karta), aur offset aage badhata hai. Koi store nahi, koi reducer nahi — ek closure variable hi poora state management hai.',
      },
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"It depends on where the data lives. If the author typed every item into the doc, all items are already in the DOM — decorate() just hides items past a page size, and a click handler reveals the next batch via a hidden attribute, no fetch needed. If items come from an external source, I\'d keep the \'state\' as a single offset variable captured in decorate()\'s closure, fetching and appending the next page on each click rather than re-rendering the whole list."',
        hi: '"Ye depend karta hai data kahan rehta hai. Agar author ne har item doc mein type kiya, sab items already DOM mein hain — decorate() bas ek page size ke aage items chhupa deta hai, aur ek click handler agla batch ek hidden attribute se reveal karta hai, koi fetch nahi chahiye. Agar items ek external source se aate hain, main \'state\' ko ek single offset variable rakhunga jo decorate() ke closure mein capture hai, har click pe agla page fetch aur append karte hue, poori list re-render karne ke bajaye."',
      },
    },
  ],

  'Why can\'t a block safely call fetch() to an external API inside decorate() without extra care?': [
    {
      heading: { en: 'It directly competes with the eager/lazy loading model', hi: 'Ye directly eager/lazy loading model se compete karta hai' },
      body: {
        en: 'If this fetch happens inside a block decorated in the eager phase, it can delay everything scripts.js is trying to protect — the visible, above-the-fold render — behind a network round-trip to a third-party API that may be slow or briefly down.',
        hi: 'Agar ye fetch eager phase mein decorate hue block ke andar hota hai, ye har us cheez ko der kar sakta hai jise scripts.js protect karne ki koshish kar raha hai — visible, above-the-fold render — ek third-party API tak ke network round-trip ke peeche jo slow ho sakta hai ya thodi der ke liye down ho sakta hai.',
      },
    },
    {
      heading: { en: 'An awaited fetch without a fallback blocks decoration entirely', hi: 'Bina fallback ke ek awaited fetch decoration ko poori tarah block karta hai' },
      body: {
        en: 'If decorate() awaits the fetch before rendering anything, and the request hangs or fails, the block renders NOTHING — not even the content the author already typed in the doc, which may have been perfectly renderable without the network call at all.',
        hi: 'Agar decorate() kuch bhi render karne se pehle fetch ko await karta hai, aur request hang ya fail ho jaati hai, block KUCH bhi render nahi karta — wo content bhi nahi jo author ne pehle se doc mein type kiya tha, jo shayad network call ke bina hi perfectly renderable tha.',
      },
      code: `// RISKY — the whole block renders nothing if this hangs or 404s
export default async function decorate(block) {
  const data = await fetch('https://third-party.example/api').then((r) => r.json());
  block.innerHTML = renderFromData(data);
}`,
    },
    {
      heading: { en: 'The safer pattern — render first, enhance after', hi: 'Safer pattern — pehle render karo, baad mein enhance karo' },
      body: {
        en: 'Decorate the block\'s own authored content synchronously first — so there is always something on screen immediately — then kick off the fetch separately and progressively enhance the block once (and if) the response arrives, with a visible loading state and a real error/fallback path.',
        hi: 'Pehle block ke apne authored content ko synchronously decorate karo — taaki screen pe hamesha turant kuch ho — phir fetch ko alag se shuru karo aur block ko progressively enhance karo jab (aur agar) response aaye, ek visible loading state aur ek real error/fallback path ke saath.',
      },
      code: `export default function decorate(block) {
  // 1) render authored content immediately, synchronously
  renderAuthoredContent(block);

  // 2) enhance later, without blocking the initial paint
  fetch('https://third-party.example/api')
    .then((r) => r.json())
    .then((data) => enhance(block, data))
    .catch(() => showFallback(block));
}`,
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"A blocking fetch inside decorate() competes directly with the eager/lazy loading model that protects the page\'s first paint, and if it\'s awaited with no fallback, a slow or failed third-party API means the block renders nothing at all — including content the author already typed in the doc. The safer pattern is to decorate the authored content synchronously first, then fetch and progressively enhance the block afterward, with a visible loading state and error handling."',
        hi: '"decorate() ke andar ek blocking fetch directly us eager/lazy loading model se compete karta hai jo page ke first paint ko protect karta hai, aur agar use bina fallback ke await kiya jaaye, ek slow ya failed third-party API ka matlab hai block kuch bhi render nahi karta — us content ko bhi nahi jo author ne already doc mein type kiya tha. Safer pattern hai pehle authored content ko synchronously decorate karna, phir baad mein fetch karke block ko progressively enhance karna, ek visible loading state aur error handling ke saath."',
      },
    },
  ],
};
