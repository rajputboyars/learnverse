/*
 * Step-by-step walkthroughs for the JavaScript interview questions.
 *
 * The short `answer` on each question tells you WHAT the answer is — that is
 * what you say out loud in an interview. This file is the follow-up: it walks
 * the same ground slowly, one step at a time, so you actually understand the
 * mechanism instead of memorising a paragraph.
 *
 * Keyed by the EXACT question text in `generalInterviewQuestions`. Any key
 * that does not match a question is reported at import time (see the bottom
 * of javascript.mjs), so a typo never silently drops content.
 *
 * Each value is an ordered list of sections:
 *   heading { en, hi }  the step's title
 *   body    { en, hi }  what happens at this step, and why
 *   diagram             optional ASCII sketch, rendered as-is in monospace
 *   code                optional snippet
 *
 * Depth is proportional to the question: an easy one gets three or four
 * steps, a hard one gets eight or nine. Every step should earn its place.
 */

export const deepDives = {
  /* ─── Engine, runtime and the async model ─────────────────── */

  'Is JavaScript synchronous or asynchronous, single or multi-threaded?': [
    {
      heading: {
        en: 'Separate the language from the runtime',
        hi: 'Language aur runtime ko alag karo',
      },
      body: {
        en: 'This question trips people up because it mixes two different things. The JavaScript LANGUAGE — what the engine executes — is synchronous and single-threaded. The RUNTIME around it, the browser or Node, is neither. Almost every "JavaScript is async" claim is really a claim about the runtime.',
        hi: 'Ye question isliye confuse karta hai kyunki isme do alag cheezein mix ho jaati hain. JavaScript LANGUAGE — jo engine chalata hai — synchronous aur single-threaded hai. Uske aas-paas ka RUNTIME, browser ya Node, dono mein se kuch bhi nahi hai. "JavaScript async hai" wala har claim asal mein runtime ke baare mein hota hai.',
      },
      diagram: `┌─────────── Browser / Node ───────────┐
│                                      │
│   JS Engine           Runtime        │
│   ┌────────┐        ┌──────────┐     │
│   │ 1 call │        │ timers   │     │
│   │ stack  │  ←──→  │ network  │     │
│   │ 1 heap │        │ file I/O │     │
│   └────────┘        │ threads  │     │
│   synchronous       └──────────┘     │
│   single-threaded   concurrent       │
└──────────────────────────────────────┘`,
    },
    {
      heading: { en: 'One call stack means one thing at a time', hi: 'Ek call stack matlab ek time pe ek kaam' },
      body: {
        en: "The engine has exactly one call stack. Whatever sits on top runs to completion before anything else gets a turn. There is no pre-emption: the engine will never pause your function halfway to run someone else's. This is called run-to-completion, and it is why a long loop freezes the whole page.",
        hi: 'Engine ke paas bilkul ek hi call stack hai. Jo upar hai wo poora khatam hone ke baad hi kisi aur ka number aata hai. Koi pre-emption nahi: engine tumhare function ko beech mein rok kar kisi aur ka code nahi chalayega. Ise run-to-completion kehte hain, aur isiliye ek lamba loop poora page freeze kar deta hai.',
      },
      code: `// Nothing — not a click, not a timer — runs during this loop.
const end = Date.now() + 3000;
while (Date.now() < end) {}
// The tab is frozen for 3 seconds. One stack, one thing at a time.`,
    },
    {
      heading: { en: 'So where does the concurrency come from?', hi: 'Toh concurrency aati kahan se hai?' },
      body: {
        en: 'From the runtime. When you call setTimeout or fetch, the engine hands the work to the browser and immediately returns. The browser does that work on its own threads — a timer thread, a network thread. Your JavaScript is not waiting; it has already moved on.',
        hi: 'Runtime se. Jab tum setTimeout ya fetch call karte ho, engine wo kaam browser ko de deta hai aur turant wapas aa jaata hai. Browser wo kaam apne threads pe karta hai — timer thread, network thread. Tumhara JavaScript wait nahi kar raha; wo aage badh chuka hai.',
      },
      code: `console.log('1');
fetch('/api/user');   // handed to the browser's network stack
console.log('2');     // runs immediately — no waiting

// 1
// 2   ← the request is still in flight here`,
    },
    {
      heading: { en: 'The callback comes back through a queue', hi: 'Callback ek queue ke through wapas aata hai' },
      body: {
        en: 'When the runtime finishes it cannot just interrupt you — remember, no pre-emption. It puts your callback in a queue instead. The event loop waits until the call stack is empty, then pushes one callback onto it. That handoff is the entire async model.',
        hi: 'Jab runtime ka kaam khatam hota hai, wo tumhe beech mein rok nahi sakta — yaad rakho, koi pre-emption nahi. Wo tumhara callback ek queue mein daal deta hai. Event loop tab tak wait karta hai jab tak call stack khaali na ho, phir ek callback usme push karta hai. Yahi poora async model hai.',
      },
      diagram: `runtime finishes → [ queue ] → event loop → call stack
                                  ↑
                    only when the stack is EMPTY`,
    },
    {
      heading: { en: 'True multi-threading is opt-in', hi: 'Asli multi-threading opt-in hai' },
      body: {
        en: 'If you genuinely need JavaScript running in parallel, you use Web Workers in the browser or worker_threads in Node. Each worker gets its OWN engine instance — its own stack and its own heap. They cannot share variables; they exchange copies through postMessage. So even then, no single stack is ever shared.',
        hi: 'Agar tumhe sach mein JavaScript parallel chalani hai, toh browser mein Web Workers ya Node mein worker_threads use karo. Har worker ko apna ALAG engine instance milta hai — apna stack aur apna heap. Wo variables share nahi kar sakte; postMessage se copies bhejte hain. Toh tab bhi koi single stack share nahi hota.',
      },
      code: `// main.js
const w = new Worker('heavy.js');
w.postMessage(bigArray);          // a COPY is sent, not a reference
w.onmessage = (e) => console.log(e.data);
// The main thread stays responsive the whole time.`,
    },
    {
      heading: { en: 'The answer to give out loud', hi: 'Bol kar dene wala jawab' },
      body: {
        en: '"The JavaScript engine is single-threaded and synchronous — one call stack, run to completion. Concurrency comes from the runtime, which does async work on other threads and returns callbacks through queues that the event loop drains. Real parallel JS needs workers, and each of those gets its own isolated engine."',
        hi: '"JavaScript engine single-threaded aur synchronous hai — ek call stack, run to completion. Concurrency runtime se aati hai, jo async kaam doosre threads pe karta hai aur callbacks queues ke through wapas bhejta hai jinhe event loop drain karta hai. Asli parallel JS ke liye workers chahiye, aur har ek ko apna alag isolated engine milta hai."',
      },
    },
  ],

  'What is the difference between null and undefined?': [
    {
      heading: { en: 'Who sets it — that is the whole difference', hi: 'Kaun set karta hai — bas yahi farq hai' },
      body: {
        en: 'undefined is what JavaScript gives you when it has nothing to give. null is what YOU write when you deliberately mean "no value here". Same emptiness, different author. Every other difference follows from this one.',
        hi: 'undefined wo hai jo JavaScript tab deta hai jab uske paas dene ko kuch nahi hota. null wo hai jo TUM jaan-boojh kar likhte ho, matlab "yahan koi value nahi". Khaalipan same, likhne wala alag. Baaki saare differences isi se nikalte hain.',
      },
      code: `let a;                  // undefined — JS had nothing to assign
const b = null;         // null — you chose emptiness

function f(x) { return x; }
f();                    // undefined — you never passed x

({}).missing;           // undefined — no such key`,
    },
    {
      heading: { en: 'Four places undefined appears on its own', hi: 'Chaar jagah undefined apne aap aata hai' },
      body: {
        en: 'Learn these four and you will never be surprised: a declared-but-unassigned variable, a missing function parameter, a missing object property, and a function with no return statement. JavaScript never produces null on its own in any of them.',
        hi: 'Ye chaar yaad kar lo aur kabhi surprise nahi hoga: declare kiya par assign nahi kiya variable, na diya gaya function parameter, na milne wali object property, aur bina return wala function. In mein se kisi mein bhi JavaScript apne aap null nahi banata.',
      },
      code: `let v;                          // 1. declared, not assigned
function g(p) { return p; }     // 2. p is undefined when called as g()
const o = {}; o.nope;           // 3. missing property
function h() {} h();            // 4. no return → undefined`,
    },
    {
      heading: { en: 'typeof null is "object" — a real bug', hi: 'typeof null "object" hai — ek asli bug' },
      body: {
        en: 'In the very first JavaScript implementation, values carried a small type tag. Objects were tag 000, and the null pointer was all zeroes — so it read as an object. It was never fixed, because fixing it would break the web. A historical accident, not a design decision.',
        hi: 'Sabse pehle wale JavaScript implementation mein values ke saath ek chhota type tag hota tha. Objects ka tag 000 tha, aur null pointer poora zeroes tha — toh wo object jaisa padha gaya. Isse kabhi theek nahi kiya kyunki theek karne se poora web toot jaata. Ek historical accident hai, design decision nahi.',
      },
      code: `typeof undefined;   // "undefined"  ✓ correct
typeof null;        // "object"     ✗ the famous bug

// So to actually test for null:
const isNull = (x) => x === null;`,
    },
    {
      heading: { en: 'Loosely equal, but not strictly equal', hi: 'Loosely equal, par strictly nahi' },
      body: {
        en: 'The spec has a special rule: null == undefined is true, and they equal nothing else. That is genuinely useful — one == null check catches both. Everywhere else, use ===.',
        hi: 'Spec mein ek special rule hai: null == undefined true hai, aur ye kisi aur ke barabar nahi hote. Ye sach mein useful hai — ek == null check dono ko pakad leta hai. Baaki har jagah === use karo.',
      },
      code: `null == undefined;    // true  (special-cased in the spec)
null === undefined;   // false (different types)

null == 0;            // false — NOT coerced to a number
null >= 0;            // true  — relational ops DO coerce. Avoid.

// The one idiom worth keeping:
if (value == null) { /* catches null AND undefined */ }`,
    },
    {
      heading: { en: 'Defaults fire for undefined only', hi: 'Defaults sirf undefined pe chalte hain' },
      body: {
        en: 'Default parameters trigger on undefined but NOT on null — passing null explicitly keeps the null. The ?? operator, on the other hand, treats both as empty. This mismatch catches people constantly.',
        hi: 'Default parameters undefined pe trigger hote hain par null pe NAHI — null explicitly pass karo toh null hi rehta hai. Doosri taraf ?? operator dono ko khaali maanta hai. Ye mismatch logon ko baar baar phasata hai.',
      },
      code: `function greet(name = 'guest') { return name; }
greet(undefined);   // 'guest'  ← default fires
greet(null);        // null     ← default does NOT fire

null ?? 'fallback';       // 'fallback'  ✓ ?? treats both as empty
undefined ?? 'fallback';  // 'fallback'`,
    },
    {
      heading: { en: 'JSON keeps null and drops undefined', hi: 'JSON null rakhta hai, undefined hata deta hai' },
      body: {
        en: 'This one bites in real APIs. JSON has null but no undefined, so JSON.stringify silently removes any key whose value is undefined. If the key must survive the wire, use null.',
        hi: 'Ye real APIs mein pareshan karta hai. JSON mein null hota hai par undefined nahi, isliye JSON.stringify chup-chaap wo keys hata deta hai jinki value undefined hai. Agar key ko network ke paar bhejna zaroori hai toh null use karo.',
      },
      code: `JSON.stringify({ a: null, b: undefined });
// '{"a":null}'   ← b vanished completely

JSON.stringify([null, undefined]);
// '[null,null]'  ← inside arrays it becomes null instead`,
    },
    {
      heading: { en: 'The rule to follow in your own code', hi: 'Apne code mein ye rule follow karo' },
      body: {
        en: 'Never assign undefined yourself — let the language own it as "absent". Use null when you are deliberately saying "empty on purpose": clearing a field, representing a database NULL. Then the two words carry real information when you read them back.',
        hi: 'Khud kabhi undefined assign mat karo — usse language ke paas rehne do "absent" ke liye. null tab use karo jab jaan-boojh kar keh rahe ho "jaan-boojh kar khaali": koi field clear karna, database NULL represent karna. Phir dono words padhne pe asli information dete hain.',
      },
    },
  ],

  'What are the different ways to copy an object in JavaScript?': [
    {
      heading: { en: 'First understand what you are copying', hi: 'Pehle samjho copy kya kar rahe ho' },
      body: {
        en: 'An object variable does not hold the object. It holds a reference — an address. Assigning it copies the address, not the thing at that address. That is why two variables can point at one object, and edits through either are visible to both.',
        hi: 'Object variable object ko nahi rakhta. Wo ek reference rakhta hai — ek address. Assign karne se address copy hota hai, us address pe padi cheez nahi. Isiliye do variables ek hi object ko point kar sakte hain, aur kisi se bhi edit karo dono ko dikhta hai.',
      },
      diagram: `const a = { n: 1 };
const b = a;             // NOT a copy

   a ──┐
       ├──→  { n: 1 }
   b ──┘

b.n = 99;  →  a.n is 99 too`,
    },
    {
      heading: { en: 'Spread and Object.assign — shallow, one level', hi: 'Spread aur Object.assign — shallow, ek level' },
      body: {
        en: 'These are the everyday tools. Both create a genuinely new top-level object and copy each own enumerable property across. But a property whose value is an object copies as a reference — so nested objects are still shared.',
        hi: 'Ye roz ke tools hain. Dono sach mein ek naya top-level object banate hain aur har own enumerable property copy karte hain. Par jis property ki value object hai wo reference ke roop mein copy hoti hai — toh nested objects abhi bhi share hote hain.',
      },
      code: `const user = { name: 'Asha', addr: { city: 'Pune' } };

const c1 = { ...user };
const c2 = Object.assign({}, user);

c1.name = 'Ravi';             // ✓ safe — top level is a real copy
console.log(user.name);       // 'Asha'

c1.addr.city = 'Delhi';       // ✗ shared! addr copied by reference
console.log(user.addr.city);  // 'Delhi'`,
    },
    {
      heading: { en: 'structuredClone — the built-in deep copy', hi: 'structuredClone — built-in deep copy' },
      body: {
        en: 'This is the modern answer, and the one most candidates forget. It is built into browsers and Node, handles nesting, and correctly clones Date, Map, Set, RegExp, ArrayBuffer and even circular references. It cannot clone functions, DOM nodes, or class prototypes.',
        hi: 'Ye modern jawab hai, aur wahi jo zyadatar candidates bhool jaate hain. Browsers aur Node mein built-in hai, nesting handle karta hai, aur Date, Map, Set, RegExp, ArrayBuffer aur circular references tak sahi clone karta hai. Functions, DOM nodes ya class prototypes clone nahi kar sakta.',
      },
      code: `const deep = structuredClone(user);
deep.addr.city = 'Delhi';
console.log(user.addr.city);   // 'Pune' ✓ truly independent

// Circular references are fine:
const o = {}; o.self = o;
structuredClone(o);            // ✓ works

// But:
structuredClone({ fn: () => {} });  // ✗ DataCloneError`,
    },
    {
      heading: { en: 'The JSON trick — and everything it destroys', hi: 'JSON wala jugaad — aur wo sab jo ye tod deta hai' },
      body: {
        en: 'JSON.parse(JSON.stringify(obj)) was the old deep-copy hack. It works, but it silently mangles data: Dates become strings, undefined and functions vanish, Map and Set become empty objects, NaN and Infinity become null, and circular references throw.',
        hi: 'JSON.parse(JSON.stringify(obj)) purana deep-copy jugaad tha. Chalta hai, par chup-chaap data bigaad deta hai: Dates strings ban jaate hain, undefined aur functions gayab, Map aur Set khaali objects, NaN aur Infinity null, aur circular references pe error.',
      },
      code: `const src = { d: new Date(), u: undefined, n: NaN, s: new Set([1]) };
JSON.parse(JSON.stringify(src));
// { d: '2026-08-19T…' (a string!), n: null, s: {} }
//   u disappeared entirely

// Use it only for plain JSON-shaped data you control.`,
    },
    {
      heading: { en: 'What every method loses: the prototype', hi: 'Har method jo khota hai: prototype' },
      body: {
        en: 'Spread, Object.assign, structuredClone and JSON all produce a plain object. If the original was a class instance, the copy is no longer an instance of that class — its methods are gone. Object.create with getOwnPropertyDescriptors keeps both the prototype and any getters.',
        hi: 'Spread, Object.assign, structuredClone aur JSON — sab ek plain object banate hain. Agar original ek class instance tha, toh copy us class ka instance nahi rahega — uske methods chale gaye. Object.create with getOwnPropertyDescriptors prototype aur getters dono bacha leta hai.',
      },
      code: `class User { constructor(n) { this.n = n; } hi() { return 'hi ' + this.n; } }
const u = new User('Asha');

const bad = { ...u };
bad instanceof User;   // false — bad.hi is not a function

const good = Object.create(
  Object.getPrototypeOf(u),
  Object.getOwnPropertyDescriptors(u)
);
good instanceof User;  // true ✓  and getters stay getters`,
    },
    {
      heading: { en: 'Choosing, in one table', hi: 'Chunna, ek table mein' },
      body: {
        en: 'Flat object, quick copy → spread. Nested data you own → structuredClone. Prototypes and getters must survive → Object.create with descriptors. Functions must be cloned, or you need full control → a small recursive clone or a library. Reach for JSON only as a last resort.',
        hi: 'Flat object, jaldi copy → spread. Nested data jo tumhara hai → structuredClone. Prototypes aur getters bachane hain → Object.create with descriptors. Functions clone karne hain ya poora control chahiye → chhota recursive clone ya library. JSON sirf last resort ke roop mein.',
      },
      diagram: `method              deep?   Date/Map/Set   prototype   functions
──────────────────────────────────────────────────────────────
{ ...obj }           no          n/a            lost        kept*
Object.assign        no          n/a            lost        kept*
structuredClone      YES         kept           lost        throws
JSON round-trip      YES         MANGLED        lost        dropped
Object.create+desc   no          n/a            KEPT        kept*

* kept by reference, at the top level only`,
    },
  ],

  'What is the "temporal dead zone"?': [
    {
      heading: { en: 'let and const ARE hoisted — that is the setup', hi: 'let aur const hoist HOTE hain — yahi setup hai' },
      body: {
        en: 'The common myth is that only var is hoisted. Wrong. let and const are hoisted too — the binding is created the moment the scope is entered. The difference is that a var binding is initialised to undefined, while a let or const binding is left uninitialised.',
        hi: 'Aam galatfehmi ye hai ki sirf var hoist hota hai. Galat. let aur const bhi hoist hote hain — scope mein ghuste hi binding ban jaati hai. Farq itna hai ki var binding undefined se initialise hoti hai, jabki let/const binding uninitialised chhod di jaati hai.',
      },
      diagram: `scope entered
    │
    ├─ var x     → binding created, value = undefined
    ├─ let y     → binding created, value = <uninitialised>
    └─ const z   → binding created, value = <uninitialised>

the TDZ is that "<uninitialised>" state`,
    },
    {
      heading: { en: 'The TDZ is a span of time, not a place', hi: 'TDZ samay ka ek hissa hai, jagah nahi' },
      body: {
        en: 'The temporal dead zone is the stretch between entering the scope and the engine actually evaluating the declaration line. Inside that stretch the name exists, but touching it throws. "Temporal" is the important word — it is about when execution reaches the line, not where the line sits in the file.',
        hi: 'Temporal dead zone wo hissa hai scope mein ghusne se lekar engine ke declaration line evaluate karne tak. Us beech naam maujood hota hai, par usse chhoote hi error aata hai. "Temporal" important word hai — ye is baare mein hai ki execution line tak kab pahunchta hai, na ki line file mein kahan hai.',
      },
      code: `{
  // ── TDZ for y starts here ──────────
  console.log(typeof x);  // 'undefined'  (var is initialised)
  console.log(y);         // ✗ ReferenceError: Cannot access 'y'
                          //   before initialization
  // ── TDZ for y ends on the next line ─
  let y = 10;
  console.log(y);         // 10 ✓
  var x = 5;
}`,
    },
    {
      heading: { en: 'Why this error differs from "not defined"', hi: 'Ye error "not defined" se alag kyun hai' },
      body: {
        en: 'Read the two messages carefully — they tell you two different things. "Cannot access before initialization" means the binding exists and you are early. "y is not defined" means there is no binding at all. Knowing which one you got tells you whether you have a TDZ problem or a typo.',
        hi: 'Dono messages dhyaan se padho — wo do alag cheezein bata rahe hain. "Cannot access before initialization" matlab binding hai aur tum jaldi aa gaye. "y is not defined" matlab binding hai hi nahi. Kaunsa mila ye jaan kar pata chalta hai TDZ ki problem hai ya spelling ki.',
      },
      code: `console.log(a); let a;   // ReferenceError: Cannot access 'a'
                         //   before initialization   ← TDZ
console.log(nope);       // ReferenceError: nope is not defined
                         //   ← no such binding anywhere`,
    },
    {
      heading: { en: 'typeof is no longer safe', hi: 'typeof ab safe nahi raha' },
      body: {
        en: 'Before ES6, typeof was the one operator that never threw — typeof anythingAtAll returned "undefined" for unknown names. The TDZ broke that guarantee. typeof on a name inside its TDZ throws like any other access.',
        hi: 'ES6 se pehle typeof ek aisa operator tha jo kabhi error nahi deta tha — kisi bhi unknown naam pe "undefined" return karta tha. TDZ ne wo guarantee tod di. TDZ mein pade naam pe typeof bhi baaki access ki tarah error deta hai.',
      },
      code: `typeof neverDeclared;   // 'undefined'  ✓ still safe
typeof laterLet;        // ✗ ReferenceError
let laterLet = 1;`,
    },
    {
      heading: { en: 'It is a feature, not an inconvenience', hi: 'Ye feature hai, pareshani nahi' },
      body: {
        en: 'The TDZ turns a class of silent bugs into loud errors. With var, reading too early gives you undefined and your code limps on with wrong data. With let, it stops at the real cause. It also makes const meaningful: a const is guaranteed to have exactly one value, because it is unreachable before assignment.',
        hi: 'TDZ chup-chaap wale bugs ko zor se bolne wale errors mein badal deta hai. var ke saath jaldi padho toh undefined milta hai aur code galat data ke saath limp karta rehta hai. let ke saath ye asli wajah pe ruk jaata hai. Isi se const meaningful banta hai: const ki bilkul ek hi value guarantee hoti hai, kyunki assignment se pehle wo reachable hi nahi.',
      },
      code: `// The bug the TDZ prevents:
function total() {
  const sum = base + 10;   // ✗ throws here — the real mistake
  const base = 5;
  return sum;
}
// With var you would get NaN and hunt for it for an hour.`,
    },
    {
      heading: { en: 'The subtle one: TDZ in default parameters', hi: 'Sookshm case: default parameters mein TDZ' },
      body: {
        en: 'Parameters are initialised left to right, and each sits in its own TDZ until its turn. So a default value may reference a parameter to its left, but not one to its right. This shows up in interviews as a trick question.',
        hi: 'Parameters left se right initialise hote hain, aur har ek apne number tak apne TDZ mein baitha hota hai. Toh koi default value apne left wale parameter ko use kar sakti hai, right wale ko nahi. Interviews mein ye trick question ban ke aata hai.',
      },
      code: `function ok(a, b = a + 1) { return b; }
ok(1);                    // 2 ✓ a is already initialised

function bad(a = b, b = 2) { return a; }
bad();                    // ✗ ReferenceError — b is still in its TDZ`,
    },
  ],

  'Explain event delegation and why it is useful.': [
    {
      heading: { en: 'The problem it solves', hi: 'Ye kis problem ko solve karta hai' },
      body: {
        en: 'You have a list of 500 rows and every row needs a click handler. The naive approach attaches 500 listeners: 500 function objects held in memory, 500 attachment operations on load, and — worse — a row added a minute later has no listener at all.',
        hi: 'Tumhare paas 500 rows ki list hai aur har row pe click handler chahiye. Seedha tareeka 500 listeners lagata hai: 500 function objects memory mein, load pe 500 attach operations, aur — isse bhi bura — ek minute baad add hui row pe koi listener hi nahi.',
      },
      code: `// The naive version
document.querySelectorAll('.row').forEach((row) => {
  row.addEventListener('click', handle);   // ×500
});

list.append(newRow);   // ✗ this row is dead — no listener`,
    },
    {
      heading: { en: 'Delegation rides on bubbling', hi: 'Delegation bubbling pe chalta hai' },
      body: {
        en: 'When you click a row the event does not stop there. It travels up through every ancestor: row, list, body, document. So a single listener on the list container sees every click inside it — including clicks on children that did not exist when the listener was attached.',
        hi: 'Jab tum row pe click karte ho, event wahin nahi rukta. Wo har ancestor se hokar upar jaata hai: row, list, body, document. Toh list container pe laga ek listener uske andar hone wala har click dekh leta hai — un children ke clicks bhi jo listener lagte waqt maujood hi nahi the.',
      },
      diagram: `click on <button> inside a row

  <button>   ← e.target
     ↑
   <li>
     ↑
   <ul>      ← ONE listener here sees them all
     ↑
  <body>
     ↑
 document`,
    },
    {
      heading: { en: 'The implementation, and the line that matters', hi: 'Implementation, aur wo line jo maayne rakhti hai' },
      body: {
        en: 'Attach one listener to the container. Inside it, event.target is the deepest element actually clicked — which may be a span inside a button inside the row. Use closest() to walk up from the target to the element you care about. Never compare target directly, or you will miss clicks on inner elements.',
        hi: 'Container pe ek listener lagao. Uske andar event.target wo sabse andar wala element hai jispe asal mein click hua — jo row ke andar button ke andar ka span bhi ho sakta hai. Target se upar chalne ke liye closest() use karo. Target ko seedha compare mat karo, warna andar ke elements ke clicks miss ho jaayenge.',
      },
      code: `list.addEventListener('click', (e) => {
  const row = e.target.closest('.row');

  if (!row) return;                 // clicked padding, not a row
  if (!list.contains(row)) return;  // guard against nested lists

  handle(row.dataset.id);
});

// Works for rows added a minute from now. No re-binding, ever.`,
    },
    {
      heading: { en: 'target vs currentTarget', hi: 'target vs currentTarget' },
      body: {
        en: 'This pair is the most common follow-up. event.target is where the click originated and changes with every click. event.currentTarget is the element whose listener is running — always the container in a delegated handler. Inside a regular (non-arrow) handler, this equals currentTarget.',
        hi: 'Ye jodi sabse common follow-up hai. event.target wahan hai jahan click shuru hua aur har click pe badalta hai. event.currentTarget wo element hai jiska listener chal raha hai — delegated handler mein hamesha container. Regular (non-arrow) handler ke andar this currentTarget ke barabar hota hai.',
      },
      code: `list.addEventListener('click', function (e) {
  e.target;         // the <span> you actually clicked
  e.currentTarget;  // the <ul> — always
  this;             // the <ul> too (regular function only)
});`,
    },
    {
      heading: { en: 'The events that do not bubble', hi: 'Wo events jo bubble nahi karte' },
      body: {
        en: 'Delegation needs bubbling, and a handful of events do not bubble: focus, blur, mouseenter, mouseleave, load. For focus and blur use their bubbling twins focusin and focusout. For mouseenter/leave, delegate mouseover/mouseout and check relatedTarget yourself.',
        hi: 'Delegation ko bubbling chahiye, aur kuch events bubble nahi karte: focus, blur, mouseenter, mouseleave, load. focus aur blur ke liye unke bubbling twins focusin aur focusout use karo. mouseenter/leave ke liye mouseover/mouseout delegate karo aur relatedTarget khud check karo.',
      },
      code: `form.addEventListener('focus',   fn);  // ✗ never fires for children
form.addEventListener('focusin', fn);  // ✓ bubbles`,
    },
    {
      heading: { en: 'What you actually gain', hi: 'Asal mein kya milta hai' },
      body: {
        en: 'One listener instead of N: less memory, faster first render. Dynamic content works with zero extra wiring. Removing a row leaks nothing, because there was never a listener on it. And teardown is a single removeEventListener instead of a loop.',
        hi: 'N ki jagah ek listener: kam memory, tez pehla render. Dynamic content bina extra wiring ke chalta hai. Row hatane pe kuch leak nahi hota, kyunki uspe listener kabhi tha hi nahi. Aur cleanup ek removeEventListener hai, loop nahi.',
      },
    },
    {
      heading: { en: 'When not to delegate', hi: 'Kab delegate nahi karna' },
      body: {
        en: 'For a handful of static elements a direct listener is simpler and reads better — delegation is indirection, and indirection has a cost. Also avoid delegating from document when a nearer container exists: every click on the page then runs your matcher.',
        hi: 'Kuch gine-chune static elements ke liye seedha listener simple aur padhne mein behtar hai — delegation indirection hai, aur indirection ki keemat hoti hai. Jab paas mein container maujood ho toh document se delegate mat karo: warna page ka har click tumhara matcher chalayega.',
      },
    },
  ],

  /* ─── Language surface: keywords, syntax, operators ───────── */

  'What is ECMAScript and how does it relate to JavaScript?': [
    {
      heading: { en: 'One is the spec, the other is the implementation', hi: 'Ek spec hai, doosra implementation' },
      body: {
        en: 'ECMAScript is the written standard — a document describing how the language must behave. JavaScript is what you actually write and run, in an engine that implements that standard. The relationship is exactly like HTML the spec versus Chrome the browser.',
        hi: 'ECMAScript likha hua standard hai — ek document jo batata hai language ko kaise behave karna chahiye. JavaScript wo hai jo tum asal mein likhte aur chalate ho, ek engine mein jo us standard ko implement karta hai. Rishta bilkul waisa hai jaise HTML spec aur Chrome browser.',
      },
      diagram: `TC39 committee
     │  writes
     ▼
ECMAScript spec  (ECMA-262)
     │  implemented by
     ├──→ V8         (Chrome, Edge, Node, Deno)
     ├──→ SpiderMonkey (Firefox)
     └──→ JavaScriptCore (Safari, Bun)`,
    },
    {
      heading: { en: 'Why the name is different at all', hi: 'Naam alag hai hi kyun' },
      body: {
        en: 'Netscape created the language in 1995 and called it JavaScript, partly to ride the popularity of Java. When they submitted it for standardisation, the trademark on "Java" belonged to Sun, so the standard needed a neutral name. "ECMAScript" was the compromise — a name Brendan Eich himself described as unappealing.',
        hi: 'Netscape ne 1995 mein language banayi aur usse JavaScript naam diya, thoda Java ki popularity ka fayda uthane ke liye. Jab standardisation ke liye bheja, "Java" ka trademark Sun ke paas tha, isliye standard ko ek neutral naam chahiye tha. "ECMAScript" wahi compromise tha — jise khud Brendan Eich ne bhadda naam kaha tha.',
      },
    },
    {
      heading: { en: 'Versions: ES6 was the turning point', hi: 'Versions: ES6 hi mod tha' },
      body: {
        en: 'ES5 (2009) gave us strict mode and the array methods. ES6, also called ES2015, was the enormous one: let, const, arrow functions, classes, template literals, destructuring, promises, modules. Since then the committee ships a small named release every June — ES2016, ES2017, and so on.',
        hi: 'ES5 (2009) ne strict mode aur array methods diye. ES6, jise ES2015 bhi kehte hain, sabse bada tha: let, const, arrow functions, classes, template literals, destructuring, promises, modules. Uske baad committee har June mein ek chhota named release nikalti hai — ES2016, ES2017, waghera.',
      },
      code: `// ES5 and earlier
var self = this;
var double = function (n) { return n * 2; };

// ES6 onwards
const double = (n) => n * 2;
class User {}
const { name } = user;
import fs from 'node:fs';`,
    },
    {
      heading: { en: 'How a feature actually gets in', hi: 'Koi feature andar aata kaise hai' },
      body: {
        en: 'TC39 runs a five-stage process. Stage 0 is a raw idea; stage 1 gets a champion; stage 2 has a draft spec; stage 3 is candidate, and engines start shipping it behind flags; stage 4 means two implementations shipped and tests pass, so it lands in the next yearly release.',
        hi: 'TC39 paanch stage ka process chalati hai. Stage 0 kachcha idea hai; stage 1 mein ek champion milta hai; stage 2 mein draft spec; stage 3 candidate hai, aur engines flags ke peeche ship karna shuru karte hain; stage 4 matlab do implementations ship ho gaye aur tests pass — toh agle yearly release mein aa jaata hai.',
      },
      diagram: `0 strawperson → 1 proposal → 2 draft → 3 candidate → 4 finished
                                          │              │
                              engines ship it       lands in ESxxxx`,
    },
    {
      heading: { en: 'What ECMAScript does NOT include', hi: 'ECMAScript mein kya SHAAMIL nahi hai' },
      body: {
        en: 'This is the part interviewers probe. The spec covers syntax, types, operators, built-in objects like Array and Promise, and the module system. It says nothing about document, window, fetch, localStorage or setTimeout — those are Web APIs defined by WHATWG and the W3C, or by Node.',
        hi: 'Interviewers yahi kurednte hain. Spec syntax, types, operators, Array aur Promise jaise built-in objects, aur module system cover karta hai. document, window, fetch, localStorage ya setTimeout ke baare mein kuch nahi kehta — wo Web APIs hain jo WHATWG aur W3C ne define ki hain, ya Node ne.',
      },
      code: `// ECMAScript — works everywhere JS runs
Array.prototype.map;  Promise;  JSON;  Math;

// NOT ECMAScript — environment-specific
document.querySelector;   // browser only
localStorage;             // browser only
require;                  // Node (CommonJS)
process.env;              // Node only`,
    },
  ],

  'What is the difference between let, const, and var?': [
    {
      heading: { en: 'Scope: function vs block', hi: 'Scope: function vs block' },
      body: {
        en: 'var is scoped to the nearest FUNCTION and ignores blocks entirely — an if or for block does not contain it. let and const are scoped to the nearest BLOCK, meaning any pair of curly braces. This single difference causes most var bugs.',
        hi: 'var sabse paas ke FUNCTION tak scoped hota hai aur blocks ko poori tarah ignore karta hai — if ya for block usse rok nahi paata. let aur const sabse paas ke BLOCK tak scoped hain, matlab kisi bhi curly braces ki jodi tak. Yahi ek farq zyadatar var bugs ki wajah hai.',
      },
      code: `function demo() {
  if (true) {
    var a = 1;
    let b = 2;
  }
  console.log(a);   // 1        ← var leaked out of the block
  console.log(b);   // ✗ ReferenceError — let stayed inside
}`,
    },
    {
      heading: { en: 'Hoisting: all three hoist, only var initialises', hi: 'Hoisting: teeno hoist hote hain, sirf var initialise hota hai' },
      body: {
        en: 'Saying "let is not hoisted" is wrong and interviewers listen for it. All three create their binding when the scope is entered. var is immediately set to undefined; let and const are left uninitialised, and reading them before their line throws. That gap is the temporal dead zone.',
        hi: '"let hoist nahi hota" kehna galat hai aur interviewers isi ko sunte hain. Teeno scope mein ghuste hi apni binding banate hain. var turant undefined set ho jaata hai; let aur const uninitialised rehte hain, aur unki line se pehle padhne pe error aata hai. Wahi gap temporal dead zone hai.',
      },
      diagram: `                 binding created    value before the line
var x = 1        yes                undefined
let y = 1        yes                <TDZ — throws>
const z = 1      yes                <TDZ — throws>`,
    },
    {
      heading: { en: 'Reassignment vs mutation — the const trap', hi: 'Reassignment vs mutation — const ka jaal' },
      body: {
        en: 'const freezes the BINDING, not the value. You cannot point the name at something else, but if it points at an object you can change that object all you like. const does not mean immutable; for that you need Object.freeze.',
        hi: 'const BINDING ko freeze karta hai, value ko nahi. Naam ko kisi aur cheez pe point nahi kar sakte, par agar wo kisi object pe point kar raha hai toh us object ko jitna chaho badal sakte ho. const ka matlab immutable nahi; uske liye Object.freeze chahiye.',
      },
      code: `const arr = [1, 2];
arr.push(3);        // ✓ fine — mutating the array
arr = [];           // ✗ TypeError: Assignment to constant variable

const o = { a: 1 };
o.a = 99;           // ✓ fine
Object.freeze(o);
o.a = 100;          // silently ignored (throws in strict mode)`,
    },
    {
      heading: { en: 'Redeclaration', hi: 'Redeclaration' },
      body: {
        en: 'var lets you declare the same name twice in one scope, which quietly hides typos and accidental overwrites. let and const make it a SyntaxError — caught before the program even runs.',
        hi: 'var ek hi scope mein same naam do baar declare karne deta hai, jo chup-chaap typos aur galti se hue overwrites chhupa deta hai. let aur const isse SyntaxError bana dete hain — program chalne se pehle hi pakda jaata hai.',
      },
      code: `var x = 1;
var x = 2;      // ✓ allowed — and that is the problem

let y = 1;
let y = 2;      // ✗ SyntaxError: Identifier 'y' has already been declared`,
    },
    {
      heading: { en: 'var attaches to window, let and const do not', hi: 'var window pe chipakta hai, let aur const nahi' },
      body: {
        en: 'A top-level var in a classic script becomes a property of the global object. A top-level let or const creates a binding in the script scope, which is global but not a window property. This matters when two scripts on the same page accidentally share a name.',
        hi: 'Classic script mein top-level var global object ki property ban jaata hai. Top-level let ya const script scope mein binding banata hai, jo global toh hai par window ki property nahi. Ye tab maayne rakhta hai jab ek page pe do scripts galti se same naam use kar lein.',
      },
      code: `var a = 1;
let b = 2;
window.a;   // 1
window.b;   // undefined`,
    },
    {
      heading: { en: 'The loop example that proves it all', hi: 'Wo loop example jo sab saabit kar deta hai' },
      body: {
        en: 'This is the classic. var creates ONE binding shared by every iteration, so all three callbacks read the same final value. let creates a FRESH binding per iteration, so each callback closes over its own copy.',
        hi: 'Ye classic hai. var EK binding banata hai jo har iteration share karta hai, isliye teeno callbacks same final value padhte hain. let har iteration mein NAYI binding banata hai, isliye har callback apni copy pe close karta hai.',
      },
      code: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));
// 3 3 3   ← one shared i, already 3 when the timers fire

for (let j = 0; j < 3; j++) setTimeout(() => console.log(j));
// 0 1 2   ← a new j per iteration`,
    },
    {
      heading: { en: 'The rule for real code', hi: 'Asli code ka rule' },
      body: {
        en: 'Default to const. Switch to let only when you actually reassign — and that switch is now a useful signal to the reader. Never write var in new code; it exists only for backwards compatibility.',
        hi: 'Default const rakho. let tabhi lo jab sach mein reassign kar rahe ho — aur wo switch ab padhne wale ke liye ek useful signal hai. Naye code mein var kabhi mat likho; wo sirf backwards compatibility ke liye bacha hai.',
      },
    },
  ],

  'What are the spread operator, rest operator, and default parameters?': [
    {
      heading: { en: 'Spread and rest are the same three dots, reversed', hi: 'Spread aur rest wahi teen dots hain, ulte' },
      body: {
        en: 'They look identical and do opposite things. Position tells you which is which: on the RIGHT of an assignment, or inside a call or literal, three dots UNPACK — that is spread. On the LEFT, in a parameter list or a destructuring pattern, they COLLECT — that is rest.',
        hi: 'Dono dikhne mein ek jaise hain aur ulta kaam karte hain. Position batati hai kaunsa kaunsa hai: assignment ke DAAYIN taraf, ya kisi call ya literal ke andar, teen dots KHOLTE hain — wo spread hai. BAAYIN taraf, parameter list ya destructuring pattern mein, wo IKATTHA karte hain — wo rest hai.',
      },
      diagram: `spread — unpacking, on the right
  f(...args)        [...arr]        { ...obj }

rest — collecting, on the left
  function f(...args)    const [a, ...rest] = arr`,
    },
    {
      heading: { en: 'Spread in arrays and calls', hi: 'Arrays aur calls mein spread' },
      body: {
        en: 'Spread copies elements out of any iterable into a new place. It gives you a clean way to concatenate, to copy, and to pass an array as separate arguments — replacing the old apply trick.',
        hi: 'Spread kisi bhi iterable se elements nikaal kar nayi jagah daal deta hai. Isse concatenate karna, copy karna, aur array ko alag-alag arguments ki tarah pass karna saaf ho jaata hai — purana apply wala jugaad khatam.',
      },
      code: `const a = [1, 2], b = [3, 4];
[...a, ...b];              // [1,2,3,4]
const copy = [...a];       // shallow copy

Math.max(...[5, 9, 2]);    // 9
// old way: Math.max.apply(null, [5, 9, 2])

[...'hey'];                // ['h','e','y'] — strings are iterable
[...new Set([1,1,2])];     // [1,2]`,
    },
    {
      heading: { en: 'Spread in objects — order decides the winner', hi: 'Objects mein spread — order jeet tay karta hai' },
      body: {
        en: 'Object spread copies own enumerable properties. When keys collide, the LAST one written wins. That single rule gives you both "apply defaults" and "apply overrides", depending on which side you put the spread.',
        hi: 'Object spread own enumerable properties copy karta hai. Keys takraayein toh AAKHRI likhi hui jeetti hai. Bas yahi ek rule "defaults lagao" aur "overrides lagao" dono de deta hai, depend karta hai spread kis taraf rakha.',
      },
      code: `const defaults = { theme: 'light', size: 'md' };
const user     = { theme: 'dark' };

{ ...defaults, ...user }   // { theme:'dark',  size:'md' } ← user wins
{ ...user, ...defaults }   // { theme:'light', size:'md' } ← defaults win

// Note: spread is SHALLOW. Nested objects are still shared.`,
    },
    {
      heading: { en: 'Rest parameters — a real array, unlike arguments', hi: 'Rest parameters — asli array, arguments ke ulat' },
      body: {
        en: 'Rest gathers every remaining argument into a genuine Array, so map, filter and reduce work directly. The old arguments object is array-LIKE, has no array methods, and does not exist in arrow functions. Rest must be the last parameter.',
        hi: 'Rest baaki saare arguments ko ek asli Array mein ikattha karta hai, toh map, filter, reduce seedhe chalte hain. Purana arguments object array-JAISA hai, usme array methods nahi hain, aur arrow functions mein wo hota hi nahi. Rest hamesha aakhri parameter hona chahiye.',
      },
      code: `function sum(first, ...rest) {
  return rest.reduce((t, n) => t + n, first);
}
sum(1, 2, 3, 4);     // 10
// first = 1, rest = [2,3,4] — a real array

function bad(...a, b) {}   // ✗ SyntaxError — rest must be last`,
    },
    {
      heading: { en: 'Rest in destructuring', hi: 'Destructuring mein rest' },
      body: {
        en: 'The same collecting behaviour works when pulling values apart. In objects it is the cleanest way to remove a key without mutating — pick off what you want to drop, keep the rest.',
        hi: 'Wahi ikattha karne wala behaviour values alag karte waqt bhi chalta hai. Objects mein bina mutate kiye key hatane ka sabse saaf tareeka yahi hai — jo hatana hai wo alag nikaal lo, baaki rakh lo.',
      },
      code: `const [head, ...tail] = [1, 2, 3];
// head = 1, tail = [2,3]

const { password, ...safeUser } = user;
// safeUser is user without password — original untouched`,
    },
    {
      heading: { en: 'Default parameters fire on undefined only', hi: 'Default parameters sirf undefined pe chalte hain' },
      body: {
        en: 'A default kicks in when the argument is undefined — whether you omitted it or passed undefined explicitly. It does NOT kick in for null, 0, empty string or false, because those are real values. That is the whole trap.',
        hi: 'Default tab chalta hai jab argument undefined ho — chahe tumne diya hi nahi ya explicitly undefined pass kiya. null, 0, khaali string ya false pe wo NAHI chalta, kyunki wo asli values hain. Bas yahi poora jaal hai.',
      },
      code: `function f(x = 10) { return x; }
f();            // 10
f(undefined);   // 10
f(null);        // null  ← not undefined, so no default
f(0);           // 0
f('');          // ''`,
    },
    {
      heading: { en: 'Defaults are evaluated lazily, left to right', hi: 'Defaults lazily evaluate hote hain, left se right' },
      body: {
        en: 'A default expression runs only when it is actually needed, and at call time — not once at definition. That means a fresh object per call, and a later parameter can safely reference an earlier one.',
        hi: 'Default expression tabhi chalta hai jab sach mein zaroorat ho, aur call ke waqt — definition pe ek baar nahi. Matlab har call pe naya object, aur baad wala parameter pehle wale ko safely use kar sakta hai.',
      },
      code: `function add(items = []) { items.push(1); return items; }
add(); add();        // [1] both times — a NEW array per call

function area(w, h = w) { return w * h; }
area(5);             // 25 — h defaults to w

function req(name = missing('name')) { return name; }
// missing() only runs when name is actually omitted`,
    },
  ],

  'What is the difference between deep copy and shallow copy in JavaScript?': [
    {
      heading: { en: 'The depth that matters is nesting depth', hi: 'Jo depth maayne rakhti hai wo nesting depth hai' },
      body: {
        en: 'A shallow copy duplicates the top level and copies everything below it as references. A deep copy duplicates every level, all the way down, so the two structures share nothing at all.',
        hi: 'Shallow copy sirf top level duplicate karti hai aur uske neeche sab kuch reference ke roop mein copy karti hai. Deep copy har level duplicate karti hai, poori neeche tak, toh dono structures kuch bhi share nahi karte.',
      },
      diagram: `original            SHALLOW copy         DEEP copy
{                   {                    {
  a: 1,   ────────►   a: 1,                a: 1,
  b: ●───┐            b: ●───┐             b: ●───► { c: 2 }
}        │          }        │           }          (new object)
         ▼                   ▼
     { c: 2 }  ◄─────────────┘
     one shared object       two separate objects`,
    },
    {
      heading: { en: 'Why primitives never cause this problem', hi: 'Primitives kabhi ye problem kyun nahi karte' },
      body: {
        en: 'Numbers, strings, booleans and the rest are copied by VALUE — each copy is its own independent thing. Only objects, arrays and functions are copied by reference. So a flat object of primitives is fully independent after a shallow copy; the distinction only appears once you nest.',
        hi: 'Numbers, strings, booleans waghera VALUE se copy hote hain — har copy apni alag cheez hai. Sirf objects, arrays aur functions reference se copy hote hain. Toh primitives ka flat object shallow copy ke baad poori tarah independent hai; farq tabhi dikhta hai jab nesting ho.',
      },
      code: `const flat = { a: 1, b: 'two' };
const s = { ...flat };
s.a = 99;
flat.a;            // 1 ✓ — a shallow copy was enough here`,
    },
    {
      heading: { en: 'The bug a shallow copy actually causes', hi: 'Shallow copy asal mein kaunsa bug karti hai' },
      body: {
        en: 'It is nearly always this: you copy state to "safely" edit it, change something nested, and the original changes with it. In React this shows up as a component that will not re-render, because the nested object is reference-equal to the old one.',
        hi: 'Lagbhag hamesha yahi hota hai: tum state copy karte ho taaki "safely" edit kar sako, kuch nested badalte ho, aur original bhi badal jaata hai. React mein ye aise dikhta hai ki component re-render hi nahi hota, kyunki nested object purane ke reference-equal hai.',
      },
      code: `const state  = { user: { name: 'Asha' }, count: 0 };
const draft  = { ...state };

draft.count = 1;              // ✓ isolated
draft.user.name = 'Ravi';     // ✗ mutated the original too

state.user.name;              // 'Ravi'
state.user === draft.user;    // true — the tell-tale sign`,
    },
    {
      heading: { en: 'Making a shallow copy', hi: 'Shallow copy banana' },
      body: {
        en: 'Spread and Object.assign for objects; spread, slice() or Array.from for arrays. All are one level deep, and all are fast — which is exactly why you should prefer them when one level is all you need.',
        hi: 'Objects ke liye spread aur Object.assign; arrays ke liye spread, slice() ya Array.from. Sab ek level tak hain, aur sab tez hain — isiliye jab ek level hi kaafi ho toh yahi use karo.',
      },
      code: `{ ...obj }              Object.assign({}, obj)
[...arr]                arr.slice()         Array.from(arr)`,
    },
    {
      heading: { en: 'Making a deep copy', hi: 'Deep copy banana' },
      body: {
        en: 'structuredClone is the built-in and should be your default: it handles nesting, Date, Map, Set, RegExp and circular references. Use a library like lodash cloneDeep when you need functions or class instances preserved. The JSON round-trip works but corrupts Dates, drops undefined and functions, and throws on cycles.',
        hi: 'structuredClone built-in hai aur yahi default hona chahiye: ye nesting, Date, Map, Set, RegExp aur circular references sambhaal leta hai. Jab functions ya class instances bachane hon toh lodash cloneDeep jaisi library lo. JSON round-trip chalta hai par Dates bigaadta hai, undefined aur functions gira deta hai, aur cycles pe error deta hai.',
      },
      code: `const deep = structuredClone(state);
deep.user.name = 'Ravi';
state.user.name;              // 'Asha' ✓ untouched

// Old hack, still seen everywhere:
JSON.parse(JSON.stringify(state));   // lossy — know what it eats`,
    },
    {
      heading: { en: 'Deep is not free — do not copy by reflex', hi: 'Deep muft nahi hai — aadat se copy mat karo' },
      body: {
        en: 'A deep copy walks the entire structure, so cost grows with total size, not top-level size. On a large tree in a hot path this is measurable. The usual right answer is neither: copy only the path you are changing, which is what immutable update patterns do.',
        hi: 'Deep copy poore structure pe chalti hai, toh cost total size ke saath badhti hai, top-level size ke saath nahi. Bade tree pe hot path mein ye napa ja sakta hai. Aam taur pe sahi jawab dono nahi hai: sirf wo path copy karo jo badal rahe ho — immutable update patterns yahi karte hain.',
      },
      code: `// Copy only along the path you touch — cheap AND safe
const next = {
  ...state,
  user: { ...state.user, name: 'Ravi' },
};
// state.user is untouched; everything else is shared, not copied.`,
    },
  ],

  'What are Promises, callbacks, and async/await in JavaScript?': [
    {
      heading: { en: 'Three generations of the same idea', hi: 'Ek hi idea ki teen peedhiyan' },
      body: {
        en: 'All three answer one question: how do I run code after something finishes? Callbacks were first, promises fixed their structural problems, and async/await is syntax over promises. They are layers, not alternatives — async/await IS promises underneath.',
        hi: 'Teeno ek hi sawaal ka jawab hain: kuch khatam hone ke baad code kaise chalayein? Callbacks pehle aaye, promises ne unki structural problems theek ki, aur async/await promises ke upar syntax hai. Ye layers hain, alternatives nahi — async/await andar se promises HI hai.',
      },
      diagram: `callbacks  (ES3)   →  promises (ES6)  →  async/await (ES2017)
   pass a fn          return an object      write it like
   to be called       you can chain         it is synchronous
        └──────────────── same machinery ───────────┘`,
    },
    {
      heading: { en: 'Callbacks: hand over a function to be called later', hi: 'Callbacks: baad mein bulane ke liye function de do' },
      body: {
        en: 'You pass a function in, and the async operation calls it when done. Node settled on the error-first convention: the first argument is the error, the rest is the result. Simple and still everywhere in older code.',
        hi: 'Tum ek function andar bhejte ho, aur async operation kaam khatam hone pe usse call karta hai. Node ne error-first convention apnaya: pehla argument error, baaki result. Simple hai aur purane code mein aaj bhi har jagah hai.',
      },
      code: `fs.readFile('a.txt', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});`,
    },
    {
      heading: { en: 'Why callbacks broke down', hi: 'Callbacks kyun toot gaye' },
      body: {
        en: 'Three real problems, not just ugliness. Nesting grows sideways once steps depend on each other. Error handling must be repeated by hand at every level, because try/catch cannot cross the async boundary. And you are trusting the library to call your function exactly once — nothing enforces it.',
        hi: 'Teen asli problems, sirf bhaddapan nahi. Steps ek doosre pe depend karein toh nesting bagal mein badhti jaati hai. Error handling har level pe haath se dohrana padta hai, kyunki try/catch async boundary paar nahi kar sakta. Aur tum library pe bharosa kar rahe ho ki wo tumhara function theek ek baar call karegi — isse koi enforce nahi karta.',
      },
      code: `getUser(id, (e, user) => {
  if (e) return done(e);
  getOrders(user, (e, orders) => {
    if (e) return done(e);
    getItems(orders[0], (e, items) => {
      if (e) return done(e);          // the same line, three times
      done(null, items);
    });
  });
});`,
    },
    {
      heading: { en: 'Promises: an object representing a future value', hi: 'Promises: bhavishya ki value ka ek object' },
      body: {
        en: 'A promise is a value you can hold and pass around right now, standing in for a result that has not arrived. It has three states — pending, fulfilled, rejected — and it settles exactly once. That "once" is guaranteed by the specification, not by the library author.',
        hi: 'Promise ek aisi value hai jo tum abhi pakad aur ghuma sakte ho, ek aise result ki jagah jo abhi aaya nahi. Iske teen states hain — pending, fulfilled, rejected — aur ye theek ek baar settle hota hai. Wo "ek baar" specification guarantee karti hai, library likhne wala nahi.',
      },
      diagram: `            ┌──► fulfilled (value)   .then
  pending ──┤
            └──► rejected  (reason)  .catch

  one-way, and only ever once`,
    },
    {
      heading: { en: 'Chaining flattens the pyramid', hi: 'Chaining pyramid ko chapta kar deti hai' },
      body: {
        en: 'The key rule: .then returns a NEW promise, and if your handler returns a promise the chain waits for it. That turns nesting into a flat sequence. One .catch at the end handles a rejection from any step above it.',
        hi: 'Asli rule: .then ek NAYA promise return karta hai, aur agar tumhara handler promise return kare toh chain uska intezaar karti hai. Isse nesting ek seedhi sequence ban jaati hai. Aakhir mein ek .catch upar ke kisi bhi step ki rejection sambhaal leta hai.',
      },
      code: `getUser(id)
  .then((user)   => getOrders(user))
  .then((orders) => getItems(orders[0]))
  .then((items)  => render(items))
  .catch(handleError)      // covers every step above
  .finally(hideSpinner);   // runs either way

// Forget the return and the chain does NOT wait:
.then((u) => { getOrders(u); })   // ✗ next .then gets undefined`,
    },
    {
      heading: { en: 'async/await: the same chain, written straight down', hi: 'async/await: wahi chain, seedhe neeche likhi hui' },
      body: {
        en: 'async marks a function as always returning a promise. await pauses only that function until a promise settles, unwrapping the value. Nothing else is blocked — the engine leaves the function and comes back. Now ordinary try/catch works, because the error surfaces at the await.',
        hi: 'async batata hai ki function hamesha promise return karega. await sirf usi function ko rokta hai jab tak promise settle na ho, aur value khol deta hai. Aur kuch block nahi hota — engine function chhod kar chala jaata hai aur wapas aata hai. Ab aam try/catch chalta hai, kyunki error await pe upar aata hai.',
      },
      code: `async function load(id) {
  try {
    const user   = await getUser(id);
    const orders = await getOrders(user);
    return await getItems(orders[0]);
  } catch (e) {
    handleError(e);        // catches ANY of the three
  } finally {
    hideSpinner();
  }
}
load(1);   // still returns a promise`,
    },
    {
      heading: { en: 'The mistake await makes easy', hi: 'Wo galti jo await aasaan kar deta hai' },
      body: {
        en: 'Because it reads like synchronous code, people await inside loops and serialise work that could have run together. If the calls do not depend on each other, start them all and await once with Promise.all.',
        hi: 'Kyunki ye synchronous code jaisa padha jaata hai, log loops ke andar await kar dete hain aur wo kaam serial bana dete hain jo saath chal sakta tha. Agar calls ek doosre pe depend nahi karte, toh sab shuru karo aur Promise.all se ek baar await karo.',
      },
      code: `// ✗ 3 seconds — one after another
for (const id of ids) results.push(await fetchOne(id));

// ✓ ~1 second — all in flight together
const results = await Promise.all(ids.map(fetchOne));`,
    },
    {
      heading: { en: 'Which to use', hi: 'Kaunsa use karein' },
      body: {
        en: 'Write async/await by default — it is the most readable and gives you real try/catch. Drop to raw promise methods when you need combinators like Promise.all, race or allSettled. Use callbacks only for genuinely repeating events, such as addEventListener, where a one-shot promise is the wrong shape.',
        hi: 'Default async/await likho — sabse padhne laayak hai aur asli try/catch deta hai. Jab Promise.all, race ya allSettled jaise combinators chahiye tab raw promise methods pe utro. Callbacks sirf un events ke liye jo sach mein baar-baar hote hain, jaise addEventListener, jahan ek baar wala promise galat shape hai.',
      },
    },
  ],

  'What is event bubbling and event capturing in JavaScript?': [
    {
      heading: { en: 'An event travels in three phases, not one', hi: 'Event teen phases mein chalta hai, ek mein nahi' },
      body: {
        en: 'A DOM event does not simply fire on the element you clicked. It makes a round trip: down from window to the target, a moment at the target, then back up to window. Those are the capturing phase, the target phase, and the bubbling phase.',
        hi: 'DOM event sirf us element pe fire nahi hota jispe click kiya. Wo ek poora chakkar lagata hai: window se neeche target tak, target pe ek pal, phir wapas upar window tak. Yahi capturing phase, target phase, aur bubbling phase hain.',
      },
      diagram: `           window
             │  ①  CAPTURING  (down)
          document
             │
           <body>
             │
            <ul>
             │
            <li>  ②  TARGET
             │
             │  ③  BUBBLING  (up)
             ▼  back to window`,
    },
    {
      heading: { en: 'Bubbling is the default', hi: 'Bubbling default hai' },
      body: {
        en: 'addEventListener listens on the bubbling phase unless you say otherwise. So handlers fire innermost first, then outward. This is what makes event delegation possible.',
        hi: 'addEventListener bubbling phase pe sunta hai jab tak tum kuch aur na kaho. Toh handlers pehle sabse andar wale chalte hain, phir bahar ki taraf. Isi wajah se event delegation mumkin hai.',
      },
      code: `ul.addEventListener('click', () => console.log('ul'));
li.addEventListener('click', () => console.log('li'));

// click the li →   li    then    ul`,
    },
    {
      heading: { en: 'Opting into capturing', hi: 'Capturing chunna' },
      body: {
        en: 'Pass true as the third argument, or { capture: true }. Now the outer handler runs BEFORE the inner one. Capturing exists so an ancestor can see — and if necessary stop — an event before the target ever gets it.',
        hi: 'Teesre argument mein true do, ya { capture: true }. Ab bahar wala handler andar wale se PEHLE chalega. Capturing isliye hai taaki koi ancestor event ko target tak pahunchne se pehle dekh sake — aur zaroorat ho toh rok sake.',
      },
      code: `ul.addEventListener('click', () => console.log('ul'), true);
li.addEventListener('click', () => console.log('li'));

// click the li →   ul    then    li   ← reversed`,
    },
    {
      heading: { en: 'stopPropagation vs preventDefault', hi: 'stopPropagation vs preventDefault' },
      body: {
        en: 'These are unrelated and constantly confused. stopPropagation halts the journey through the tree — other elements stop hearing about it. preventDefault cancels the browser action — following the link, submitting the form, ticking the checkbox — while the event keeps travelling.',
        hi: 'Ye do alag cheezein hain aur log inhe hamesha mila dete hain. stopPropagation tree ke through safar rok deta hai — baaki elements ko sunai dena band. preventDefault browser ka action cancel karta hai — link kholna, form submit karna, checkbox tick hona — jabki event chalta rehta hai.',
      },
      code: `link.addEventListener('click', (e) => {
  e.preventDefault();     // do not navigate; event still bubbles
  e.stopPropagation();    // stop the bubbling; navigation unaffected
});`,
    },
    {
      heading: { en: 'The one that also stops siblings', hi: 'Wo jo bhai-behno ko bhi rokta hai' },
      body: {
        en: 'stopPropagation still lets OTHER handlers on the SAME element run. stopImmediatePropagation stops those too. Reach for it rarely — it makes behaviour depend on listener registration order, which is hard to reason about later.',
        hi: 'stopPropagation usi element ke DOOSRE handlers ko phir bhi chalne deta hai. stopImmediatePropagation unhe bhi rok deta hai. Isse kabhi-kabhaar hi use karo — isse behaviour listener register hone ke order pe depend karne lagta hai, jise baad mein samajhna mushkil hai.',
      },
      code: `btn.addEventListener('click', (e) => { e.stopPropagation(); });
btn.addEventListener('click', () => console.log('still runs'));

btn.addEventListener('click', (e) => { e.stopImmediatePropagation(); });
btn.addEventListener('click', () => console.log('never runs'));`,
    },
    {
      heading: { en: 'Which events skip the trip', hi: 'Kaunse events safar nahi karte' },
      body: {
        en: 'Most events bubble. The exceptions worth memorising are focus, blur, mouseenter, mouseleave, load, unload and scroll on an element. Check event.bubbles when unsure. focusin and focusout are the bubbling versions of focus and blur.',
        hi: 'Zyadatar events bubble karte hain. Yaad rakhne laayak exceptions hain focus, blur, mouseenter, mouseleave, load, unload aur element pe scroll. Shak ho toh event.bubbles check karo. focusin aur focusout, focus aur blur ke bubbling versions hain.',
      },
      code: `el.addEventListener('click', (e) => console.log(e.bubbles));  // true
el.addEventListener('focus', (e) => console.log(e.bubbles));  // false`,
    },
    {
      heading: { en: 'Why any of this matters day to day', hi: 'Ye roz-marra mein kyun maayne rakhta hai' },
      body: {
        en: 'Two reasons. Bubbling is what event delegation is built on, so one listener can serve a whole list. And capturing lets a wrapper — a modal, an analytics layer — intercept events before the app sees them, which is the only clean way to build "click outside to close".',
        hi: 'Do wajah. Bubbling pe hi event delegation khada hai, toh ek listener poori list sambhaal leta hai. Aur capturing se koi wrapper — modal, analytics layer — app se pehle events pakad sakta hai, jo "bahar click karo toh band ho" banane ka ek hi saaf tareeka hai.',
      },
    },
  ],

  'What is a higher-order function in JavaScript?': [
    {
      heading: { en: 'The definition, and why JS gets it for free', hi: 'Definition, aur JS ko ye muft kaise mila' },
      body: {
        en: 'A higher-order function does one of two things: it takes a function as an argument, or it returns a function. Nothing more. JavaScript supports this because functions are first-class values — you can store them in variables, pass them, and return them like any number or string.',
        hi: 'Higher-order function do mein se ek kaam karta hai: ya toh function ko argument ki tarah leta hai, ya function return karta hai. Bas itna. JavaScript mein ye isliye chalta hai kyunki functions first-class values hain — unhe variables mein rakh sakte ho, pass kar sakte ho, aur kisi number ya string ki tarah return kar sakte ho.',
      },
      code: `// takes a function
[1, 2, 3].map((n) => n * 2);

// returns a function
const times = (n) => (x) => x * n;
times(3)(4);      // 12

// both
const wrap = (fn) => (...args) => fn(...args);`,
    },
    {
      heading: { en: 'You already use them constantly', hi: 'Tum inhe pehle se roz use karte ho' },
      body: {
        en: 'map, filter, reduce, forEach, sort, setTimeout, addEventListener, then — every one of these takes a function. Recognising the pattern is the point; you are not learning something new, you are naming something you already do.',
        hi: 'map, filter, reduce, forEach, sort, setTimeout, addEventListener, then — in sab mein function jaata hai. Pattern pehchanna hi asli baat hai; tum kuch naya nahi seekh rahe, jo pehle se karte ho usse naam de rahe ho.',
      },
    },
    {
      heading: { en: 'Why returning a function is the powerful half', hi: 'Function return karna zyada taakatwar hissa kyun hai' },
      body: {
        en: 'A returned function remembers the variables from where it was created — that is a closure. This lets you configure behaviour once and reuse it, instead of passing the same argument everywhere. Factories, curried helpers and middleware all rest on this.',
        hi: 'Return kiya gaya function un variables ko yaad rakhta hai jahan wo bana tha — yahi closure hai. Isse tum behaviour ek baar configure karke baar-baar use kar sakte ho, bajaye har jagah wahi argument pass karne ke. Factories, curried helpers aur middleware sab isi pe tike hain.',
      },
      code: `const withPrefix = (prefix) => (msg) => \`[\${prefix}] \${msg}\`;

const logError = withPrefix('ERROR');
const logInfo  = withPrefix('INFO');

logError('disk full');   // '[ERROR] disk full'`,
    },
    {
      heading: { en: 'Wrapping: adding behaviour without touching the original', hi: 'Wrapping: original ko chhue bina behaviour jodna' },
      body: {
        en: 'This is where HOFs earn their keep in real code. Take a function, return a new one that does something extra around it — timing, caching, retrying, logging. The original function never learns it was wrapped.',
        hi: 'Asli code mein HOFs yahin apni jagah banate hain. Ek function lo, ek naya return karo jo uske aas-paas kuch extra kare — timing, caching, retry, logging. Original function ko kabhi pata hi nahi chalta ki wo wrap hua.',
      },
      code: `const timed = (fn) => (...args) => {
  const t = performance.now();
  const out = fn(...args);
  console.log(fn.name, performance.now() - t, 'ms');
  return out;
};

const slowSort = timed(mySort);   // same signature, extra behaviour`,
    },
    {
      heading: { en: 'The everyday mistake: calling instead of passing', hi: 'Roz hone wali galti: pass karne ki jagah call kar dena' },
      body: {
        en: 'A HOF wants the function itself, not its result. Adding parentheses calls it immediately and hands over the return value — usually undefined. This is one of the most common beginner bugs with setTimeout and event listeners.',
        hi: 'HOF ko function chahiye, uska result nahi. Brackets lagate hi wo turant chal jaata hai aur uski return value chali jaati hai — aam taur pe undefined. setTimeout aur event listeners ke saath ye sabse common beginner bug hai.',
      },
      code: `setTimeout(greet, 1000);     // ✓ passes the function
setTimeout(greet(), 1000);   // ✗ calls it NOW, passes undefined

btn.addEventListener('click', handle);       // ✓
btn.addEventListener('click', handle(id));   // ✗ unless handle returns a fn`,
    },
    {
      heading: { en: 'One caution about method references', hi: 'Method reference pe ek chetavni' },
      body: {
        en: 'Passing obj.method detaches it from obj, so this is lost when the HOF calls it. Bind it, or wrap it in an arrow function that keeps the receiver.',
        hi: 'obj.method pass karne se wo obj se alag ho jaata hai, toh jab HOF usse call karta hai tab this kho jaata hai. Usse bind karo, ya ek arrow function mein lapet do jo receiver bacha le.',
      },
      code: `btn.addEventListener('click', user.greet);            // ✗ this is undefined
btn.addEventListener('click', user.greet.bind(user));  // ✓
btn.addEventListener('click', () => user.greet());     // ✓`,
    },
  ],

  'What are the different types of functions in JavaScript?': [
    {
      heading: { en: 'Declarations — hoisted whole', hi: 'Declarations — poore hoist hote hain' },
      body: {
        en: 'A function declaration is hoisted completely: both the name and the body are available before the line that defines them. This is the only form you can call before you write it.',
        hi: 'Function declaration poora hoist hota hai: naam aur body dono us line se pehle available hote hain jo unhe define karti hai. Sirf yahi form hai jise likhne se pehle call kar sakte ho.',
      },
      code: `greet();                       // ✓ works
function greet() { return 'hi'; }`,
    },
    {
      heading: { en: 'Expressions — the variable rules apply', hi: 'Expressions — variable ke rules lagte hain' },
      body: {
        en: 'A function expression assigns a function to a variable, so hoisting follows that variable. With const you get a TDZ error before the line; with var you get "not a function", because the name exists but holds undefined.',
        hi: 'Function expression ek function ko variable mein assign karta hai, toh hoisting us variable ke hisaab se hoti hai. const ke saath line se pehle TDZ error milta hai; var ke saath "not a function", kyunki naam maujood hai par usme undefined pada hai.',
      },
      code: `const greet = function () { return 'hi'; };

sayHi();   // ✗ TypeError: sayHi is not a function
var sayHi = function () {};`,
    },
    {
      heading: { en: 'Arrow functions — no this of their own', hi: 'Arrow functions — apna this nahi' },
      body: {
        en: 'Arrows are shorter, but the real difference is behavioural: no own this, arguments, super or new.target, and they cannot be constructed. They take this from the enclosing scope, which is exactly what you want in a callback and exactly wrong for an object method.',
        hi: 'Arrows chhote hain, par asli farq behaviour ka hai: apna this, arguments, super ya new.target nahi hota, aur inhe new se nahi bana sakte. Ye this bahar wale scope se lete hain — jo callback mein bilkul sahi hai aur object method ke liye bilkul galat.',
      },
      code: `const add = (a, b) => a + b;        // implicit return
const obj = () => ({ a: 1 });       // wrap object in parens

const user = {
  name: 'Asha',
  bad:  () => this.name,            // ✗ undefined — this is outer
  good() { return this.name; },     // ✓ 'Asha'
};`,
    },
    {
      heading: { en: 'Async functions — always return a promise', hi: 'Async functions — hamesha promise return karte hain' },
      body: {
        en: 'Marking a function async wraps whatever it returns in a resolved promise, and any throw inside it becomes a rejected promise. That uniformity is what lets await and try/catch work together.',
        hi: 'Function ko async likhne se jo bhi return kare wo resolved promise mein lapet jaata hai, aur andar ka koi bhi throw rejected promise ban jaata hai. Yahi ek-jaisapan await aur try/catch ko saath chalne deta hai.',
      },
      code: `async function f() { return 1; }
f();                     // Promise { 1 }, not 1

async function g() { throw new Error('x'); }
g();                     // a REJECTED promise, not a sync throw`,
    },
    {
      heading: { en: 'Generators — functions that pause', hi: 'Generators — rukne wale functions' },
      body: {
        en: 'A generator, written function*, can suspend at a yield and resume later. Calling it does not run the body; it returns an iterator you drive with next(). Useful for lazy sequences and for producing values on demand.',
        hi: 'Generator, jo function* likha jaata hai, yield pe ruk sakta hai aur baad mein aage chal sakta hai. Isse call karne se body nahi chalti; ye ek iterator return karta hai jise tum next() se chalate ho. Lazy sequences aur zaroorat pe value banane ke liye useful hai.',
      },
      code: `function* ids() { let i = 0; while (true) yield i++; }
const it = ids();
it.next().value;   // 0
it.next().value;   // 1   — infinite, but only computed on demand`,
    },
    {
      heading: { en: 'IIFEs, methods and constructors', hi: 'IIFEs, methods aur constructors' },
      body: {
        en: 'An IIFE runs the moment it is defined and was the old way to get a private scope — block scoping and modules have largely replaced it. A method is just a function stored on an object, with shorthand syntax. A constructor is any regular function called with new; classes are the modern form of the same thing.',
        hi: 'IIFE define hote hi chal jaata hai aur private scope paane ka purana tareeka tha — ab block scoping aur modules ne uski jagah le li hai. Method sirf ek function hai jo object pe rakha hai, shorthand syntax ke saath. Constructor koi bhi aam function hai jo new se call ho; classes usi cheez ka modern roop hain.',
      },
      code: `(function () { /* private scope */ })();     // IIFE
const o = { hi() { return 'hi'; } };         // method shorthand
class User { constructor(n) { this.n = n; } }`,
    },
    {
      heading: { en: 'The comparison worth memorising', hi: 'Yaad rakhne laayak tulna' },
      body: {
        en: 'When an interviewer asks for "types of functions", they usually want you to land on the arrow-versus-regular differences. Know these four rows and you are covered.',
        hi: 'Jab interviewer "types of functions" poochta hai, wo aam taur pe arrow-vs-regular ke differences sunna chahta hai. Ye chaar rows pata hon toh kaam ho gaya.',
      },
      diagram: `                    regular fn     arrow fn
own this               yes            no (lexical)
arguments object       yes            no (use ...rest)
usable with new        yes            no
hoisted                declarations   no (expressions)`,
    },
  ],

  'What is an arrow function and how does it differ from a regular function?': [
    {
      heading: { en: 'The syntax, shortest to longest', hi: 'Syntax, sabse chhote se sabse lambe tak' },
      body: {
        en: 'One parameter needs no parentheses; zero or two or more do. A single expression body returns implicitly; a braced body needs an explicit return. Returning an object literal needs parentheses, or the braces read as a block.',
        hi: 'Ek parameter ho toh brackets nahi chahiye; zero ya do-ya-zyada ho toh chahiye. Ek expression wali body apne aap return karti hai; curly braces wali body mein return likhna padta hai. Object literal return karna ho toh brackets chahiye, warna curly braces block padhe jaate hain.',
      },
      code: `n => n * 2                    // one param, implicit return
(a, b) => a + b               // two params
() => 42                      // none
(n) => { return n * 2; }      // block body — explicit return
() => ({ a: 1 })              // object literal needs ( )`,
    },
    {
      heading: { en: 'The real difference: this is lexical', hi: 'Asli farq: this lexical hai' },
      body: {
        en: 'An arrow function has no this of its own. When you write this inside one, the engine looks outward through enclosing scopes exactly like it would for any other variable. The value is fixed at definition time and can never be changed.',
        hi: 'Arrow function ka apna this hota hi nahi. Jab tum uske andar this likhte ho, engine bahar ke scopes mein waise hi dhoondta hai jaise kisi aur variable ke liye. Value define hote waqt tay ho jaati hai aur kabhi badli nahi ja sakti.',
      },
      code: `const timer = {
  count: 0,
  start() {
    setInterval(() => { this.count++; }, 1000);
    //           ↑ this is the timer object — taken from start()
  },
  broken() {
    setInterval(function () { this.count++; }, 1000);
    //           ↑ this is undefined / window — its own binding
  },
};`,
    },
    {
      heading: { en: 'call, apply and bind cannot override it', hi: 'call, apply aur bind isse badal nahi sakte' },
      body: {
        en: 'This surprises people. Since an arrow has no this slot, there is nothing for these methods to set. They accept the argument and ignore it entirely — no error, just no effect.',
        hi: 'Ye log ko chaunka deta hai. Arrow mein this ka slot hi nahi hai, toh in methods ke paas set karne ko kuch nahi. Wo argument le lete hain aur poori tarah ignore kar dete hain — koi error nahi, bas koi asar nahi.',
      },
      code: `const arrow = () => this;
arrow.call({ a: 1 });    // NOT { a: 1 } — the outer this, unchanged

function regular() { return this; }
regular.call({ a: 1 });  // { a: 1 } ✓`,
    },
    {
      heading: { en: 'No arguments, no new, no prototype', hi: 'Na arguments, na new, na prototype' },
      body: {
        en: 'Three more absences. There is no arguments object — use rest parameters instead. There is no [[Construct]] internal method, so new throws. And there is no prototype property, because an arrow can never be a constructor.',
        hi: 'Teen aur cheezein gaayab. arguments object nahi hai — uski jagah rest parameters lo. [[Construct]] internal method nahi hai, isliye new pe error aata hai. Aur prototype property nahi hai, kyunki arrow kabhi constructor ban hi nahi sakta.',
      },
      code: `const f = () => arguments;      // ✗ ReferenceError (or outer arguments)
const g = (...args) => args;    // ✓ use rest instead

const A = () => {};
new A();                        // ✗ TypeError: A is not a constructor
A.prototype;                    // undefined`,
    },
    {
      heading: { en: 'Where arrows are wrong', hi: 'Arrows kahan galat hain' },
      body: {
        en: 'Three places, and interviewers ask about all three. Object methods that need this. Prototype methods, for the same reason. And DOM handlers where you rely on this being the element — though event.currentTarget works fine either way.',
        hi: 'Teen jagah, aur interviewers teeno poochte hain. Object methods jinhe this chahiye. Prototype methods, wahi wajah. Aur DOM handlers jahan tum this ko element maan rahe ho — waise event.currentTarget dono mein chalta hai.',
      },
      code: `const o = { n: 1, get: () => this.n };   // ✗ undefined
const p = { n: 1, get() { return this.n; } };  // ✓ 1

btn.addEventListener('click', () => this);          // ✗ outer this
btn.addEventListener('click', function () { this }); // ✓ the button`,
    },
    {
      heading: { en: 'Where arrows are right', hi: 'Arrows kahan sahi hain' },
      body: {
        en: 'Callbacks, array methods, promise handlers, and anywhere a short expression reads better than a full function. Also class fields, where the lexical this gives you a permanently bound method for free.',
        hi: 'Callbacks, array methods, promise handlers, aur har wo jagah jahan chhota expression poore function se behtar padha jaaye. Class fields bhi, jahan lexical this muft mein hamesha ke liye bound method de deta hai.',
      },
      code: `class Btn {
  label = 'ok';
  handle = () => this.label;   // bound to the instance, always
}
const b = new Btn();
const detached = b.handle;
detached();                    // 'ok' ✓ still works`,
    },
  ],

  'Why do we use call, apply, and bind in JavaScript?': [
    {
      heading: { en: 'They exist because this is decided at call time', hi: 'Ye isliye hain kyunki this call ke waqt tay hota hai' },
      body: {
        en: 'In a regular function, this is not fixed when you write the function — it is whatever the caller supplies. Usually that is the object before the dot. call, apply and bind exist so YOU can supply it explicitly instead of relying on how the call happens to be written.',
        hi: 'Aam function mein this tab tay nahi hota jab tum function likhte ho — wo wahi hota hai jo caller de. Aam taur pe wo dot se pehle wala object hota hai. call, apply aur bind isliye hain taaki TUM usse khud de sako, na ki call kaise likha gaya uspe depend karo.',
      },
      code: `function greet() { return 'hi ' + this.name; }
const user = { name: 'Asha' };

greet();                // 'hi undefined' — no receiver
greet.call(user);       // 'hi Asha'      — you supplied one`,
    },
    {
      heading: { en: 'call vs apply — arguments, nothing else', hi: 'call vs apply — sirf arguments ka farq' },
      body: {
        en: 'Both invoke the function immediately with a this you choose. call takes the arguments listed out; apply takes them as one array. Remember it as A for Apply, A for Array. Modern spread has made apply largely unnecessary.',
        hi: 'Dono function ko turant chalate hain, tumhare diye hue this ke saath. call arguments alag-alag leta hai; apply unhe ek array mein leta hai. Yaad rakho A for Apply, A for Array. Modern spread ne apply ki zaroorat lagbhag khatam kar di hai.',
      },
      code: `function intro(city, job) { return this.name + ', ' + city + ', ' + job; }

intro.call(user, 'Pune', 'dev');      // arguments listed
intro.apply(user, ['Pune', 'dev']);   // arguments in an array
intro.call(user, ...['Pune', 'dev']); // modern equivalent`,
    },
    {
      heading: { en: 'bind does not call — it returns', hi: 'bind call nahi karta — return karta hai' },
      body: {
        en: 'This is the difference that matters. bind produces a NEW function with this permanently locked, and runs nothing. You then call it whenever you like. That is exactly what you need when handing a method to something that will call it later.',
        hi: 'Yahi wo farq hai jo maayne rakhta hai. bind ek NAYA function banata hai jisme this hamesha ke liye lock ho jaata hai, aur kuch chalata nahi. Phir tum jab chaho usse call karo. Jab kisi ko method dena ho jo baad mein usse call karega, tab yahi chahiye.',
      },
      code: `const bound = greet.bind(user);
bound();                 // 'hi Asha' — whenever you want

setTimeout(user.greet, 0);            // ✗ this is lost
setTimeout(user.greet.bind(user), 0); // ✓ locked to user`,
    },
    {
      heading: { en: 'The problem they actually solve: a lost receiver', hi: 'Ye asal mein kis problem ko theek karte hain: khoya hua receiver' },
      body: {
        en: 'Pull a method off its object and it forgets where it came from — a function reference carries no memory of the dot. Every "cannot read property of undefined" in a callback traces back to this.',
        hi: 'Method ko apne object se alag karo aur wo bhool jaata hai kahan se aaya — function reference ko dot ki koi yaad nahi hoti. Callback mein aane wala har "cannot read property of undefined" isi se aata hai.',
      },
      code: `const user = { name: 'Asha', greet() { return this.name; } };

const fn = user.greet;   // detached — the dot is gone
fn();                    // ✗ TypeError in strict mode

const ok = user.greet.bind(user);
ok();                    // 'Asha' ✓`,
    },
    {
      heading: { en: 'bind also does partial application', hi: 'bind partial application bhi karta hai' },
      body: {
        en: 'Any arguments you pass after the this value are pre-filled permanently. The bound function then takes only what is left. This is how you make a specialised version of a general function.',
        hi: 'this value ke baad jo bhi arguments doge wo hamesha ke liye pehle se bhar jaate hain. Bound function phir sirf bacha hua leta hai. Aise hi kisi general function ka specialised version banta hai.',
      },
      code: `function multiply(a, b) { return a * b; }

const double = multiply.bind(null, 2);
double(5);        // 10 — a is locked to 2

// null because multiply never uses this.`,
    },
    {
      heading: { en: 'Borrowing methods across types', hi: 'Alag types ke beech methods udhaar lena' },
      body: {
        en: 'The classic use before ES6: run an array method on something that merely looks like an array. Modern code uses Array.from or spread, but you will still meet the old form in libraries and in the Object.prototype.toString type check.',
        hi: 'ES6 se pehle ka classic use: array method ko kisi aisi cheez pe chalana jo bas array jaisi dikhti hai. Modern code Array.from ya spread use karta hai, par purana roop libraries mein aur Object.prototype.toString wale type check mein aaj bhi milega.',
      },
      code: `function f() {
  return Array.prototype.slice.call(arguments);  // old
  // return [...arguments];                      // modern
}

Object.prototype.toString.call([]);      // '[object Array]'
Object.prototype.toString.call(null);    // '[object Null]'`,
    },
    {
      heading: { en: 'Three things worth knowing about bind', hi: 'bind ke baare mein teen jaanne laayak baatein' },
      body: {
        en: 'Binding twice does nothing — the first binding wins forever. A bound function called with new ignores the bound this, because new always creates its own. And bind allocates a new function each call, so never bind inside a render or a loop.',
        hi: 'Do baar bind karne ka koi fayda nahi — pehla binding hamesha ke liye jeet jaata hai. Bound function ko new se call karo toh bound this ignore ho jaata hai, kyunki new hamesha apna banata hai. Aur bind har call pe naya function banata hai, isliye render ya loop ke andar kabhi bind mat karo.',
      },
      code: `const once = greet.bind(a).bind(b);
once();          // uses a — the second bind is ignored

// ✗ a new function every render → breaks memoisation
<Btn onClick={this.handle.bind(this)} />
// ✓ bind once in the constructor, or use a class field arrow`,
    },
  ],

  'How many ways can you create an object in JavaScript?': [
    {
      heading: { en: 'Object literal — the one you should reach for', hi: 'Object literal — jo tumhe uthana chahiye' },
      body: {
        en: 'Braces, done. It is the fastest to read, the fastest to write, and the engine optimises it well. Modern syntax adds shorthand properties, computed keys and methods, which cover most of what the older approaches were for.',
        hi: 'Curly braces, khatam. Sabse jaldi padha jaata hai, sabse jaldi likha jaata hai, aur engine isse achhe se optimise karta hai. Modern syntax shorthand properties, computed keys aur methods deta hai, jo purane tareekon ka zyadatar kaam khud kar leta hai.',
      },
      code: `const name = 'Asha', key = 'role';

const user = {
  name,                    // shorthand
  [key]: 'admin',          // computed key
  greet() { return this.name; },   // method shorthand
};`,
    },
    {
      heading: { en: 'Object.create — choose the prototype directly', hi: 'Object.create — prototype khud chuno' },
      body: {
        en: 'This is the only way to say explicitly what an object inherits from. Passing null gives you an object with NO prototype — no toString, no hasOwnProperty — which makes it a safe dictionary with no inherited-key surprises.',
        hi: 'Ye ek hi tareeka hai jisme tum saaf-saaf bata sakte ho ki object kisse inherit karega. null dene se aisa object milta hai jiska prototype hi NAHI — na toString, na hasOwnProperty — jo ek safe dictionary ban jaata hai, bina inherited-key ke surprise ke.',
      },
      code: `const proto = { greet() { return 'hi ' + this.name; } };
const u = Object.create(proto);
u.name = 'Asha';
u.greet();                  // 'hi Asha'

const dict = Object.create(null);
dict.toString;              // undefined — nothing inherited
'toString' in dict;         // false ✓ safe as a lookup table`,
    },
    {
      heading: { en: 'Constructor functions — the pre-class way', hi: 'Constructor functions — class se pehle ka tareeka' },
      body: {
        en: 'A normal function called with new. new does four things: creates an empty object, links it to the function\'s prototype, runs the body with this bound to it, and returns it. Shared methods go on the prototype so every instance points at one copy.',
        hi: 'Ek aam function jise new se call karte hain. new chaar kaam karta hai: khaali object banata hai, usse function ke prototype se jodta hai, body ko us this ke saath chalata hai, aur usse return karta hai. Common methods prototype pe rakhte hain taaki har instance ek hi copy pe point kare.',
      },
      code: `function User(name) { this.name = name; }
User.prototype.greet = function () { return 'hi ' + this.name; };

const u = new User('Asha');
u.greet();                            // 'hi Asha'
Object.getPrototypeOf(u) === User.prototype;   // true`,
    },
    {
      heading: { en: 'Classes — the same machinery, better syntax', hi: 'Classes — wahi machinery, behtar syntax' },
      body: {
        en: 'class is syntactic sugar over the constructor-plus-prototype pattern, not a new object model. What it adds is real: private #fields, static members, clean extends and super, and it refuses to run without new.',
        hi: 'class constructor-plus-prototype pattern ke upar syntactic sugar hai, naya object model nahi. Jo ye jodta hai wo asli hai: private #fields, static members, saaf extends aur super, aur ye bina new ke chalne se mana kar deta hai.',
      },
      code: `class User {
  #secret = 42;                 // genuinely private
  constructor(name) { this.name = name; }
  greet() { return 'hi ' + this.name; }
  static from(o) { return new User(o.name); }
}

User('Asha');   // ✗ TypeError — classes require new`,
    },
    {
      heading: { en: 'Factory functions — no new, no this', hi: 'Factory functions — na new, na this' },
      body: {
        en: 'A plain function that returns an object. You avoid this entirely, closures give you real privacy, and callers cannot forget new. The cost is memory: each object carries its own copy of every method rather than sharing them through a prototype.',
        hi: 'Ek saada function jo object return karta hai. this se poori tarah bach jaate ho, closures asli privacy dete hain, aur caller new lagana bhool hi nahi sakta. Keemat memory hai: har object har method ki apni copy rakhta hai, prototype se share nahi karta.',
      },
      code: `function createUser(name) {
  let loginCount = 0;                     // truly private
  return {
    name,
    login() { return ++loginCount; },
  };
}
const u = createUser('Asha');   // no new needed`,
    },
    {
      heading: { en: 'The rest, and when they matter', hi: 'Baaki, aur wo kab kaam aate hain' },
      body: {
        en: 'new Object() is the verbose literal — no reason to use it. JSON.parse builds objects from a string. Object.assign and spread build one from others. Object.fromEntries turns pairs into an object, which is the neat way to invert Object.entries after a map or filter.',
        hi: 'new Object() lamba literal hai — use karne ki koi wajah nahi. JSON.parse string se objects banata hai. Object.assign aur spread doosron se ek banate hain. Object.fromEntries pairs ko object bana deta hai, jo map ya filter ke baad Object.entries ko ulta karne ka saaf tareeka hai.',
      },
      code: `Object.fromEntries([['a', 1], ['b', 2]]);   // { a:1, b:2 }

const doubled = Object.fromEntries(
  Object.entries({ a: 1, b: 2 }).map(([k, v]) => [k, v * 2])
);   // { a:2, b:4 }`,
    },
    {
      heading: { en: 'How to answer this out loud', hi: 'Ye jawab bol kar kaise dena' },
      body: {
        en: 'Do not recite a list of eight. Group them: literal for data, class or constructor when you need many instances sharing methods, factory when you want privacy and no this, and Object.create when you care about the prototype specifically. Then name the rest as conversions.',
        hi: 'Aath ki list mat sunao. Group karo: data ke liye literal, jab bahut saare instances methods share karein toh class ya constructor, jab privacy chahiye aur this nahi toh factory, aur jab prototype hi asli baat ho toh Object.create. Phir baaki ko conversions keh do.',
      },
    },
  ],

  'What is prototype inheritance in JavaScript?': [
    {
      heading: { en: 'Objects inherit from objects, not from classes', hi: 'Objects, objects se inherit karte hain, classes se nahi' },
      body: {
        en: 'This is the core idea and it is genuinely different from Java or C++. There is no class blueprint at runtime. Every object simply holds a hidden link to another object — its prototype — and that object may link to another, and so on.',
        hi: 'Yahi asli idea hai aur ye Java ya C++ se sach mein alag hai. Runtime pe koi class ka blueprint hota hi nahi. Har object bas ek chhupi hui link rakhta hai kisi doosre object tak — apne prototype tak — aur wo object aage kisi aur se juda ho sakta hai.',
      },
      diagram: `const dog = { bark() {} }
      │  [[Prototype]]
      ▼
   animal = { eat() {} }
      │  [[Prototype]]
      ▼
 Object.prototype = { toString, hasOwnProperty, … }
      │
      ▼
    null            ← the chain always ends here`,
    },
    {
      heading: { en: 'Lookup walks the chain, assignment does not', hi: 'Lookup chain pe chalta hai, assignment nahi' },
      body: {
        en: 'When you read a property, the engine checks the object itself, then its prototype, then that prototype, until it finds the key or hits null. When you WRITE, there is no walking — the property is created on the object itself, shadowing whatever was above.',
        hi: 'Jab tum property padhte ho, engine pehle object khud dekhta hai, phir uska prototype, phir uska prototype, jab tak key mil na jaaye ya null aa jaaye. Jab tum LIKHTE ho, koi chalna nahi hota — property object pe hi ban jaati hai, upar wali ko dhak deti hai.',
      },
      code: `const proto = { greet: 'hi' };
const o = Object.create(proto);

o.greet;                       // 'hi' — found on proto
o.greet = 'hello';             // creates an OWN property on o
proto.greet;                   // 'hi' — untouched
Object.keys(o);                // ['greet'] — own keys only`,
    },
    {
      heading: { en: 'The three names for the same link', hi: 'Ek hi link ke teen naam' },
      body: {
        en: 'This is where people get lost. [[Prototype]] is the internal link every object has. __proto__ is the legacy accessor for it — deprecated, use Object.getPrototypeOf. And .prototype is something else entirely: a property on CONSTRUCTOR FUNCTIONS, holding the object that new will use as the instance\'s prototype.',
        hi: 'Yahin log kho jaate hain. [[Prototype]] wo internal link hai jo har object mein hai. __proto__ uska purana accessor hai — deprecated, Object.getPrototypeOf use karo. Aur .prototype bilkul alag cheez hai: CONSTRUCTOR FUNCTIONS pe ek property, jisme wo object hai jise new instance ka prototype banayega.',
      },
      code: `function User() {}
const u = new User();

Object.getPrototypeOf(u) === User.prototype;   // true
u.prototype;                                   // undefined ← instances
                                               //   have no .prototype`,
    },
    {
      heading: { en: 'Why methods live on the prototype', hi: 'Methods prototype pe kyun rehte hain' },
      body: {
        en: 'Memory. Ten thousand instances that each carry their own copy of a method waste ten thousand function objects. Put it on the prototype and there is exactly one, shared by lookup. This is the practical reason the whole mechanism exists.',
        hi: 'Memory. Dus hazaar instances jinme har ek apni method copy rakhe, dus hazaar function objects barbaad karte hain. Usse prototype pe rakho aur bilkul ek rehta hai, lookup se share hota hua. Poori machinery ki asli practical wajah yahi hai.',
      },
      code: `function User(n) { this.n = n; this.hi = () => 'hi'; }  // ✗ per instance
function User(n) { this.n = n; }
User.prototype.hi = () => 'hi';                          // ✓ one copy

new User('a').hi === new User('b').hi;   // true — same function`,
    },
    {
      heading: { en: 'class does not change any of this', hi: 'class isme kuch nahi badalta' },
      body: {
        en: 'A class body puts its methods on Constructor.prototype, and extends sets up the prototype link between the two prototype objects. Everything you know about the chain still applies — the syntax is nicer, the model is identical.',
        hi: 'Class body apne methods Constructor.prototype pe rakhti hai, aur extends dono prototype objects ke beech prototype link jodta hai. Chain ke baare mein jo bhi jaante ho wo sab lagoo rehta hai — syntax achha hai, model wahi hai.',
      },
      code: `class Animal { eat() {} }
class Dog extends Animal { bark() {} }

const d = new Dog();
Object.getPrototypeOf(d) === Dog.prototype;              // true
Object.getPrototypeOf(Dog.prototype) === Animal.prototype; // true
d.eat;   // found two links up`,
    },
    {
      heading: { en: 'hasOwnProperty and why for...in bites', hi: 'hasOwnProperty aur for...in kyun kaatta hai' },
      body: {
        en: 'for...in walks the whole chain and lists inherited enumerable keys too, which is almost never what you want. Object.keys sticks to own properties. When you must check, Object.hasOwn is the modern, safe form.',
        hi: 'for...in poori chain pe chalta hai aur inherited enumerable keys bhi ginta hai, jo lagbhag kabhi nahi chahiye hota. Object.keys sirf own properties pe rukta hai. Jab check karna zaroori ho toh Object.hasOwn modern aur safe roop hai.',
      },
      code: `const proto = { inherited: 1 };
const o = Object.create(proto); o.own = 2;

for (const k in o) console.log(k);   // 'own', 'inherited'  ✗
Object.keys(o);                      // ['own']             ✓
Object.hasOwn(o, 'inherited');       // false`,
    },
    {
      heading: { en: 'Never mutate a prototype at runtime', hi: 'Runtime pe prototype kabhi mat badlo' },
      body: {
        en: 'Object.setPrototypeOf and writing to __proto__ both force engines to throw away optimisations for every object involved — the deoptimisation is severe and well documented. Build the object with the right prototype from the start using Object.create or a class.',
        hi: 'Object.setPrototypeOf aur __proto__ pe likhna, dono engines ko har jude hue object ki optimisations phenkne pe majboor karte hain — ye deoptimisation gambhir hai aur achhe se documented hai. Shuru se hi sahi prototype ke saath object banao, Object.create ya class se.',
      },
      code: `Object.setPrototypeOf(obj, proto);   // ✗ slow, deoptimises
const obj = Object.create(proto);    // ✓ same result, fast`,
    },
  ],

  'What is throttling and debouncing in JavaScript?': [
    {
      heading: { en: 'Both limit how often a function runs — differently', hi: 'Dono function ki raftaar kam karte hain — alag tareeke se' },
      body: {
        en: 'Events like scroll, resize, mousemove and keystrokes fire far faster than you can usefully respond. Debounce waits for the storm to STOP and then runs once. Throttle runs at a steady maximum rate WHILE the storm continues.',
        hi: 'scroll, resize, mousemove aur typing jaise events itni tezi se fire hote hain ki tum kaam ke hisaab se jawab de hi nahi sakte. Debounce toofan RUKNE ka intezaar karta hai aur phir ek baar chalta hai. Throttle toofan ke DAURAAN ek tay raftaar se chalta rehta hai.',
      },
      diagram: `events   ││││││││        ││││││││
                 ↑                  ↑
debounce         run                run     (after quiet)

events   ││││││││││││││││││││││││││││
throttle █       █       █       █          (every 200ms)`,
    },
    {
      heading: { en: 'Debounce: run after things go quiet', hi: 'Debounce: shaanti hone ke baad chalo' },
      body: {
        en: 'Every call restarts the timer. Only when a full delay passes with no new calls does the function actually run. Search-as-you-type is the textbook case: you want one request after the user stops typing, not one per keystroke.',
        hi: 'Har call timer dobara shuru kar deta hai. Jab poori delay bina naye call ke nikal jaati hai, tabhi function chalta hai. Search-as-you-type isi ki kitaabi misaal hai: user ke rukne ke baad ek request chahiye, har keystroke pe ek nahi.',
      },
      code: `function debounce(fn, delay = 300) {
  let id;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => fn.apply(this, args), delay);
  };
}

input.addEventListener('input', debounce(search, 300));
// types "hello" fast → ONE search, 300ms after the last key`,
    },
    {
      heading: { en: 'Throttle: run at most once per interval', hi: 'Throttle: har interval mein zyada se zyada ek baar' },
      body: {
        en: 'The first call goes through immediately, then further calls are ignored until the interval elapses. Use it when you need steady updates DURING an event, not just at the end — a scroll progress bar has to move while you scroll.',
        hi: 'Pehla call turant chala jaata hai, phir interval khatam hone tak baaki calls ignore ho jaate hain. Isse tab use karo jab event ke DAURAAN lagataar updates chahiye, sirf aakhir mein nahi — scroll progress bar ko scroll karte waqt hilna hi padta hai.',
      },
      code: `function throttle(fn, limit = 200) {
  let waiting = false;
  return function (...args) {
    if (waiting) return;
    fn.apply(this, args);
    waiting = true;
    setTimeout(() => { waiting = false; }, limit);
  };
}

window.addEventListener('scroll', throttle(updateBar, 100));
// at most 10 updates per second, however fast you scroll`,
    },
    {
      heading: { en: 'Choosing between them', hi: 'Dono mein se chunna' },
      body: {
        en: 'Ask one question: do I need feedback while it is happening? If yes, throttle. If only the final state matters, debounce. Search input, form validation, autosave and resize-then-recalculate are debounce. Scroll position, drag, mousemove and infinite scroll are throttle.',
        hi: 'Ek sawaal poocho: kya mujhe hote waqt feedback chahiye? Haan toh throttle. Sirf aakhri state maayne rakhti hai toh debounce. Search input, form validation, autosave aur resize-ke-baad-recalculate debounce hain. Scroll position, drag, mousemove aur infinite scroll throttle hain.',
      },
    },
    {
      heading: { en: 'The details a real implementation needs', hi: 'Asli implementation mein kya-kya chahiye' },
      body: {
        en: 'A production version adds three things: leading and trailing options so you control whether it fires at the start, the end, or both; a cancel method for cleanup on unmount; and passing this through with apply so it works on methods. Lodash gives you all of it.',
        hi: 'Production version teen cheezein jodta hai: leading aur trailing options taaki tum tay karo ye shuru mein chale, aakhir mein, ya dono; unmount pe cleanup ke liye cancel method; aur apply se this aage bhejna taaki methods pe bhi chale. Lodash ye sab de deta hai.',
      },
      code: `const d = debounce(save, 500);
d.cancel = () => clearTimeout(id);   // stop a pending run

// In React, always clean up:
useEffect(() => {
  const h = throttle(onScroll, 100);
  window.addEventListener('scroll', h);
  return () => window.removeEventListener('scroll', h);
}, []);`,
    },
    {
      heading: { en: 'The mistake that silently breaks both', hi: 'Wo galti jo dono ko chup-chaap tod deti hai' },
      body: {
        en: 'Creating the debounced function inside a render or inside the handler. Each call then builds a fresh closure with a fresh timer, so nothing is ever throttled or debounced. Create it ONCE, outside, and reuse the same reference.',
        hi: 'Debounced function ko render ke andar ya handler ke andar banana. Phir har call naya closure aur naya timer banata hai, toh kuch bhi throttle ya debounce hota hi nahi. Isse EK BAAR, bahar banao, aur wahi reference dobara use karo.',
      },
      code: `// ✗ new debounced fn every keystroke — never fires late
input.oninput = (e) => debounce(search, 300)(e.target.value);

// ✓ one instance, reused
const run = debounce(search, 300);
input.oninput = (e) => run(e.target.value);`,
    },
  ],

  'What are falsy values in JavaScript?': [
    {
      heading: { en: 'There are exactly eight — memorise the list', hi: 'Bilkul aath hain — list yaad kar lo' },
      body: {
        en: 'false, 0, -0, 0n (BigInt zero), "" (empty string), null, undefined, and NaN. Everything else in the language is truthy, with no exceptions. Being able to recite these eight is the whole question.',
        hi: 'false, 0, -0, 0n (BigInt zero), "" (khaali string), null, undefined, aur NaN. Language mein baaki sab kuch truthy hai, bina kisi exception ke. Ye aath sunaa dena hi poora sawaal hai.',
      },
      code: `if (false)      {}   // no
if (0)          {}   // no
if (-0)         {}   // no
if (0n)         {}   // no
if ('')         {}   // no
if (null)       {}   // no
if (undefined)  {}   // no
if (NaN)        {}   // no`,
    },
    {
      heading: { en: 'The truthy ones that surprise people', hi: 'Wo truthy jo logon ko chaunkate hain' },
      body: {
        en: 'Empty arrays and empty objects are truthy — they are objects, and every object is truthy. The string "0" is truthy because it is a non-empty string. And "false" as a string is truthy too, which bites when you read a value out of localStorage.',
        hi: 'Khaali arrays aur khaali objects truthy hain — wo objects hain, aur har object truthy hai. String "0" truthy hai kyunki wo non-empty string hai. Aur "false" string bhi truthy hai, jo localStorage se value padhte waqt kaat leta hai.',
      },
      code: `if ([])       {}   // ✓ runs — empty array is truthy
if ({})       {}   // ✓ runs
if ('0')      {}   // ✓ runs — non-empty string
if ('false')  {}   // ✓ runs — the classic localStorage bug

localStorage.setItem('dark', false);
if (localStorage.getItem('dark')) {}   // ✓ runs! it is the string 'false'`,
    },
    {
      heading: { en: 'Falsy is not the same as == false', hi: 'Falsy aur == false ek nahi hain' },
      body: {
        en: 'These are two different mechanisms. Falsiness is a ToBoolean conversion; loose equality against false is a numeric coercion. null and undefined are falsy but are not == false, and an empty array is truthy yet == false. Never test with == false.',
        hi: 'Ye do alag mechanisms hain. Falsiness ek ToBoolean conversion hai; false ke saath loose equality ek numeric coercion hai. null aur undefined falsy hain par == false nahi hain, aur khaali array truthy hai phir bhi == false hai. == false se kabhi test mat karo.',
      },
      code: `Boolean(null);   // false — falsy
null == false;   // false — NOT loosely equal

Boolean([]);     // true  — truthy
[] == false;     // true  — [] → '' → 0, and false → 0`,
    },
    {
      heading: { en: 'Why || is dangerous for defaults', hi: 'Defaults ke liye || khatarnaak kyun hai' },
      body: {
        en: 'The || operator falls back on ANY falsy value, so a legitimate 0 or empty string gets replaced. ?? only falls back on null and undefined, which is almost always the behaviour you actually meant.',
        hi: '|| operator KISI BHI falsy value pe fallback le leta hai, toh sahi 0 ya khaali string bhi badal jaati hai. ?? sirf null aur undefined pe fallback leta hai, jo lagbhag hamesha wahi behaviour hai jo tum chahte the.',
      },
      code: `const count = 0;
count || 10;    // 10  ✗ zero was a real value
count ?? 10;    // 0   ✓

const name = '';
name || 'guest';   // 'guest' ✗
name ?? 'guest';   // ''      ✓`,
    },
    {
      heading: { en: 'Converting deliberately', hi: 'Jaan-boojh kar convert karna' },
      body: {
        en: 'Boolean(x) and !!x do the same thing; !! is just two negations. Prefer explicit checks in real code: value != null for existence, arr.length > 0 for a non-empty array, str.trim() !== "" for real text. A bare if (value) hides which case you meant.',
        hi: 'Boolean(x) aur !!x ek hi kaam karte hain; !! bas do negations hain. Asli code mein saaf checks behtar hain: maujoodgi ke liye value != null, non-empty array ke liye arr.length > 0, asli text ke liye str.trim() !== "". Khaali if (value) chhupa deta hai ki tumhara matlab kaunsa case tha.',
      },
      code: `Boolean('a');   // true
!!'a';          // true — same thing

if (arr && arr.length > 0) {}   // says what it means
if (str.trim() !== '') {}       // '   ' is truthy but blank`,
    },
  ],

  'What is the execution context, event loop, call stack, callback queue, and microtask queue?': [
    {
      heading: { en: 'Execution context: the box a piece of code runs in', hi: 'Execution context: wo dabba jisme code chalta hai' },
      body: {
        en: 'Every time code runs — the whole script, or one function call — the engine builds an execution context for it. It holds three things: the variable environment (its scope), the scope chain (where to look next), and the value of this.',
        hi: 'Jab bhi code chalta hai — poori script, ya ek function call — engine uske liye ek execution context banata hai. Usme teen cheezein hoti hain: variable environment (uska scope), scope chain (aage kahan dekhna hai), aur this ki value.',
      },
      diagram: `Execution Context
├── Variable Environment   the names declared here
├── Scope Chain            link to the enclosing context
└── this                   decided by HOW it was called`,
    },
    {
      heading: { en: 'It is built in two phases', hi: 'Ye do phases mein banta hai' },
      body: {
        en: 'First the CREATION phase: declarations are registered, function declarations get their full body, var gets undefined, let and const are created but left uninitialised, and this is determined. Then the EXECUTION phase runs the lines. Hoisting is just a name for what the first phase does.',
        hi: 'Pehle CREATION phase: declarations register hote hain, function declarations ko poori body milti hai, var ko undefined milta hai, let aur const bante hain par uninitialised rehte hain, aur this tay hota hai. Phir EXECUTION phase lines chalata hai. Hoisting sirf pehle phase ka naam hai.',
      },
      code: `console.log(a);   // undefined  — var registered in phase 1
console.log(f);   // [Function: f] — whole body available
console.log(b);   // ✗ TDZ error   — created but uninitialised
var a = 1;
let b = 2;
function f() {}`,
    },
    {
      heading: { en: 'Call stack: contexts stacked, last in first out', hi: 'Call stack: contexts ka dher, last in first out' },
      body: {
        en: 'Each call pushes its context on top; each return pops it. The engine only ever runs the top frame. One stack means one thing at a time, and overflowing it — usually via runaway recursion — is the RangeError you have seen.',
        hi: 'Har call apna context upar rakhta hai; har return usse hata deta hai. Engine hamesha sirf sabse upar wala frame chalata hai. Ek stack matlab ek time pe ek kaam, aur usse bhar dena — aam taur pe bina rukne wali recursion se — wahi RangeError hai jo tumne dekha hai.',
      },
      diagram: `one() → two() → three()

  │ three() │  ← running
  │ two()   │
  │ one()   │
  │ global  │
  └─────────┘`,
    },
    {
      heading: { en: 'Web APIs: where async work actually happens', hi: 'Web APIs: async kaam asal mein yahan hota hai' },
      body: {
        en: 'setTimeout, fetch and DOM events are not part of the JavaScript engine. The engine hands them to the runtime and pops the frame immediately. The runtime does the waiting on its own threads and, when finished, places your callback in a queue.',
        hi: 'setTimeout, fetch aur DOM events JavaScript engine ka hissa nahi hain. Engine unhe runtime ko de deta hai aur frame turant hata deta hai. Runtime apne threads pe intezaar karta hai aur kaam khatam hone pe tumhara callback ek queue mein rakh deta hai.',
      },
    },
    {
      heading: { en: 'Two queues, not one — and they are not equal', hi: 'Do queues, ek nahi — aur dono barabar nahi' },
      body: {
        en: 'The macrotask queue (also called the callback or task queue) holds setTimeout, setInterval and I/O callbacks. The microtask queue holds promise callbacks and queueMicrotask. The microtask queue has absolute priority, and this asymmetry is the whole exam question.',
        hi: 'Macrotask queue (jise callback ya task queue bhi kehte hain) mein setTimeout, setInterval aur I/O callbacks aate hain. Microtask queue mein promise callbacks aur queueMicrotask. Microtask queue ki priority sabse upar hai, aur yahi asymmetry poora exam question hai.',
      },
      diagram: `MICROtask queue          MACROtask queue
.then / .catch           setTimeout
await continuation       setInterval
queueMicrotask           I/O, DOM events
MutationObserver         requestAnimationFrame*

drained COMPLETELY       ONE per loop turn
* rAF is really its own render-phase step`,
    },
    {
      heading: { en: 'The event loop rule, stated exactly', hi: 'Event loop ka rule, bilkul theek-theek' },
      body: {
        en: 'Wait until the call stack is empty. Then drain the ENTIRE microtask queue — including microtasks added while draining. Then, and only then, take ONE macrotask and run it. Then repeat, draining microtasks again. Rendering happens between turns.',
        hi: 'Intezaar karo jab tak call stack khaali na ho. Phir POORI microtask queue khaali karo — un microtasks samet jo drain karte waqt add hue. Uske baad, aur tabhi, EK macrotask lo aur chalao. Phir dohrao, microtasks phir se drain karke. Rendering turns ke beech hoti hai.',
      },
      code: `while (true) {
  runUntilStackIsEmpty();
  while (microtasks.length) run(microtasks.shift());  // ALL of them
  if (shouldRender) render();
  if (macrotasks.length) run(macrotasks.shift());     // exactly ONE
}`,
    },
    {
      heading: { en: 'Trace it once and it sticks', hi: 'Ek baar trace karo, baith jayega' },
      body: {
        en: 'Synchronous lines run first, in order. Then every microtask. Then the first macrotask. Note that the promise logs before the zero-delay timer even though the timer was registered first — priority, not order of registration.',
        hi: 'Synchronous lines pehle chalti hain, order mein. Phir har microtask. Phir pehla macrotask. Dhyaan do ki promise, zero-delay timer se pehle log hota hai, jabki timer pehle register hua tha — priority ki baat hai, register hone ke order ki nahi.',
      },
      code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

// 1  sync
// 4  sync
// 3  microtask — drained first
// 2  macrotask — one per turn`,
    },
    {
      heading: { en: 'The starvation trap', hi: 'Starvation ka jaal' },
      body: {
        en: 'Because microtasks are drained completely, a microtask that schedules another microtask loops forever and no macrotask, no rendering and no user input ever gets a turn. The page hangs with an empty call stack, which makes it confusing to debug.',
        hi: 'Kyunki microtasks poori tarah drain hote hain, ek microtask jo doosra microtask schedule kare wo hamesha ke liye ghoomta rahega aur kisi macrotask, rendering ya user input ka number hi nahi aayega. Page khaali call stack ke saath hang ho jaata hai, jisse debug karna confusing hai.',
      },
      code: `function loop() { Promise.resolve().then(loop); }
loop();
// The tab freezes. The stack is empty the whole time.

function ok() { setTimeout(ok, 0); }
ok();   // ✓ fine — yields between turns`,
    },
  ],

  'What is the difference between setTimeout and setInterval?': [
    {
      heading: { en: 'Once versus repeatedly', hi: 'Ek baar vs baar-baar' },
      body: {
        en: 'setTimeout schedules a callback to run one time after a delay. setInterval schedules it to run again and again, roughly every delay milliseconds, until you cancel it. Both return an id you pass to clearTimeout or clearInterval.',
        hi: 'setTimeout callback ko delay ke baad ek baar chalane ke liye schedule karta hai. setInterval usse baar-baar chalata hai, lagbhag har delay millisecond pe, jab tak tum cancel na karo. Dono ek id return karte hain jise clearTimeout ya clearInterval ko dete ho.',
      },
      code: `const t = setTimeout(fn, 1000);    // runs once
clearTimeout(t);

const i = setInterval(fn, 1000);   // runs forever
clearInterval(i);`,
    },
    {
      heading: { en: 'The delay is a minimum, never a promise', hi: 'Delay kam se kam hai, vaada kabhi nahi' },
      body: {
        en: 'The delay says "not before this much time". The callback becomes eligible then, but it still has to wait for the call stack to empty and for its turn in the macrotask queue. Under load it will be late — sometimes very late.',
        hi: 'Delay kehti hai "itne samay se pehle nahi". Callback tab eligible ho jaata hai, par usse phir bhi call stack khaali hone aur macrotask queue mein apne number ka intezaar karna padta hai. Load mein wo late hoga — kabhi-kabhi bahut late.',
      },
      code: `setTimeout(() => console.log('later'), 0);
for (let i = 0; i < 1e9; i++) {}     // blocks for seconds
// 'later' prints only after the loop — 0 meant nothing`,
    },
    {
      heading: { en: 'setInterval does not wait for your callback', hi: 'setInterval tumhare callback ka intezaar nahi karta' },
      body: {
        en: 'This is the real problem with it. The interval keeps queuing regardless of how long the previous run took. If your work takes longer than the interval, invocations pile up and run back to back with no gap at all.',
        hi: 'Isi mein asli problem hai. Interval queue karta rehta hai, chahe pichhla run kitna bhi lamba ho. Agar tumhara kaam interval se zyada lamba hai, toh invocations jama ho jaate hain aur bina kisi gap ke ek ke baad ek chalte hain.',
      },
      diagram: `interval 100ms, work takes 300ms

want:  ██        ██        ██
get:   ███████████████████████   ← no breathing room`,
    },
    {
      heading: { en: 'The recursive setTimeout pattern', hi: 'Recursive setTimeout pattern' },
      body: {
        en: 'Schedule the next run only after the current one finishes. Now the gap between runs is guaranteed, the interval can change between runs, and an async task can be awaited properly. This is what you should use for polling.',
        hi: 'Agla run tabhi schedule karo jab maujooda khatam ho jaaye. Ab runs ke beech gap guarantee hai, interval har run pe badal sakta hai, aur async task ko theek se await kiya ja sakta hai. Polling ke liye yahi use karna chahiye.',
      },
      code: `async function poll() {
  await fetchUpdates();          // however long it takes
  setTimeout(poll, 1000);        // then wait a full second
}
poll();

// Bonus: back off on failure by changing the delay each time.`,
    },
    {
      heading: { en: 'Throttling in background tabs', hi: 'Background tabs mein throttling' },
      body: {
        en: 'Browsers clamp timers in hidden tabs to roughly once per second, and nested timeouts deeper than five levels are clamped to 4ms even in the foreground. Never use a timer to measure elapsed time — read the clock instead.',
        hi: 'Browsers chhupe hue tabs mein timers ko lagbhag ek second mein ek baar tak seemit kar dete hain, aur paanch level se gehre nested timeouts foreground mein bhi 4ms pe clamp ho jaate hain. Beeta hua samay naapne ke liye timer kabhi mat use karo — ghadi padho.',
      },
      code: `// ✗ drifts badly, and stalls in a background tab
let s = 0; setInterval(() => { s++; render(s); }, 1000);

// ✓ always correct — derive from the real clock
const start = Date.now();
setInterval(() => render(Math.floor((Date.now() - start) / 1000)), 250);`,
    },
    {
      heading: { en: 'Always clean up', hi: 'Cleanup hamesha karo' },
      body: {
        en: 'An interval keeps running after the component or page section that created it is gone, holding its closure — and everything that closure references — alive. That is a genuine memory leak and a common source of "why did this fire twice".',
        hi: 'Interval us component ya page ke hisse ke jaane ke baad bhi chalta rehta hai jisne usse banaya tha, apne closure ko — aur closure jo bhi reference karta hai usse — zinda rakhta hua. Ye asli memory leak hai aur "ye do baar kyun chala" ka common karan.',
      },
      code: `useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);   // ✓ never skip this
}, []);`,
    },
    {
      heading: { en: 'Use requestAnimationFrame for animation', hi: 'Animation ke liye requestAnimationFrame' },
      body: {
        en: 'Timers are the wrong tool for anything visual. requestAnimationFrame runs just before the browser paints, matches the display refresh rate, and pauses automatically in hidden tabs — so animation is smooth and costs nothing when unseen.',
        hi: 'Kisi bhi visual kaam ke liye timers galat auzaar hain. requestAnimationFrame browser ke paint karne se thik pehle chalta hai, display ke refresh rate se milta hai, aur chhupe tabs mein apne aap ruk jaata hai — toh animation smooth rehta hai aur na dikhne pe kuch kharch nahi hota.',
      },
      code: `function frame() {
  move();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`,
    },
  ],

  /* ─── Built-in objects and collections ────────────────────── */

  'What is the difference between Object.seal() and Object.freeze()?': [
    {
      heading: { en: 'Three separate locks, not two', hi: 'Teen alag taale, do nahi' },
      body: {
        en: 'There are three things you can restrict on an object: adding new properties, deleting existing ones, and changing their values. preventExtensions blocks the first. seal blocks the first two. freeze blocks all three.',
        hi: 'Object pe teen cheezein rok sakte ho: nayi properties jodna, purani hataana, aur unki values badalna. preventExtensions pehli rokta hai. seal pehli do. freeze teeno.',
      },
      diagram: `                    add   delete   modify
preventExtensions    ✗      ✓        ✓
seal                 ✗      ✗        ✓
freeze               ✗      ✗        ✗`,
    },
    {
      heading: { en: 'seal — the shape is fixed, the values are not', hi: 'seal — dhaancha pakka, values nahi' },
      body: {
        en: 'After sealing you can still assign to any existing property. What you cannot do is add a new key or remove an old one. Use it when an object must keep exactly the fields it has, but stay editable.',
        hi: 'Seal karne ke baad bhi kisi maujooda property mein assign kar sakte ho. Jo nahi kar sakte wo hai nayi key jodna ya purani hataana. Isse tab use karo jab object ke fields wahi rehne chahiye, par editable rahein.',
      },
      code: `const o = { a: 1 };
Object.seal(o);

o.a = 99;        // ✓ allowed
o.b = 2;         // ✗ silently ignored (throws in strict mode)
delete o.a;      // ✗ ignored

Object.isSealed(o);   // true`,
    },
    {
      heading: { en: 'freeze — read-only from then on', hi: 'freeze — uske baad sirf padho' },
      body: {
        en: 'Freezing makes every own property non-writable and non-configurable. Any assignment is silently ignored in sloppy mode and throws a TypeError in strict mode — and module code and class bodies are always strict, so in practice it throws.',
        hi: 'Freeze karne se har own property non-writable aur non-configurable ho jaati hai. Koi bhi assignment sloppy mode mein chup-chaap ignore hota hai aur strict mode mein TypeError deta hai — aur module code aur class bodies hamesha strict hain, toh asal mein error hi aata hai.',
      },
      code: `'use strict';
const o = Object.freeze({ a: 1 });
o.a = 99;             // ✗ TypeError: Cannot assign to read only property

Object.isFrozen(o);   // true`,
    },
    {
      heading: { en: 'Both are shallow — the big gotcha', hi: 'Dono shallow hain — sabse bada jaal' },
      body: {
        en: 'Freezing an object does nothing to the objects it references. A nested object stays fully mutable, and people are constantly caught by this. If you need it deep, recurse yourself.',
        hi: 'Object ko freeze karne se un objects pe kuch asar nahi hota jinhe wo reference karta hai. Nested object poori tarah mutable rehta hai, aur log isme baar-baar phasate hain. Deep chahiye toh khud recurse karo.',
      },
      code: `const o = Object.freeze({ nested: { a: 1 } });
o.nested.a = 99;      // ✓ works — nested was never frozen

function deepFreeze(obj) {
  for (const v of Object.values(obj)) {
    if (v && typeof v === 'object') deepFreeze(v);
  }
  return Object.freeze(obj);
}`,
    },
    {
      heading: { en: 'Arrays too, with one surprise', hi: 'Arrays bhi, ek surprise ke saath' },
      body: {
        en: 'Freezing an array blocks push, pop and index assignment, because length becomes non-writable. Sealing an array is more subtle: you can still change existing elements but not change its length, so push fails while arr[0] = x works.',
        hi: 'Array freeze karne se push, pop aur index assignment ruk jaate hain, kyunki length non-writable ho jaati hai. Array seal karna zyada sookshm hai: maujooda elements badal sakte ho par length nahi, toh push fail hota hai jabki arr[0] = x chalta hai.',
      },
      code: `const a = Object.freeze([1, 2]);
a.push(3);       // ✗ TypeError
a[0] = 9;        // ✗ ignored / throws

const b = Object.seal([1, 2]);
b[0] = 9;        // ✓ allowed
b.push(3);       // ✗ TypeError — cannot grow`,
    },
    {
      heading: { en: 'What neither of them does', hi: 'Dono mein se koi kya nahi karta' },
      body: {
        en: 'Neither is const, and neither is security. const locks the variable binding, freeze locks the object contents — they are orthogonal, and you often want both. Neither prevents a Proxy from intercepting, and neither hides data from anyone with a reference.',
        hi: 'Na koi const hai, na koi security. const variable binding ko lock karta hai, freeze object ke andar ko — ye alag-alag cheezein hain, aur aksar dono chahiye hote hain. Na koi Proxy ko rok sakta hai, na kisi se data chhupa sakta hai jiske paas reference ho.',
      },
      code: `let o = Object.freeze({ a: 1 });
o = { a: 2 };     // ✓ allowed — the BINDING is not const

const p = Object.freeze({ a: 1 });
// now both the binding and the contents are locked`,
    },
    {
      heading: { en: 'When to actually use them', hi: 'Inhe asal mein kab use karein' },
      body: {
        en: 'freeze for genuine constants — config objects, enums, lookup tables — where accidental mutation would be a bug. seal is rare in practice. Do not freeze large state trees in hot paths; the property-descriptor changes cost more than you save.',
        hi: 'freeze asli constants ke liye — config objects, enums, lookup tables — jahan galti se mutation ek bug hoga. seal asal mein kam hi kaam aata hai. Hot path mein bade state trees freeze mat karo; property-descriptor ke badlav utna kharch karte hain jitna bachate nahi.',
      },
      code: `export const STATUS = Object.freeze({
  IDLE: 'idle',
  BUSY: 'busy',
});
STATUS.IDLE = 'x';   // throws — the enum cannot drift`,
    },
  ],

  'What is the difference between Map and Set in JavaScript?': [
    {
      heading: { en: 'Pairs versus unique values', hi: 'Jodiyaan vs unique values' },
      body: {
        en: 'A Map stores key-value pairs, like an object but with better rules. A Set stores values only, and never the same value twice. If you find yourself asking "have I seen this before?", you want a Set; "what is stored under this key?" is a Map.',
        hi: 'Map key-value jodiyaan rakhta hai, object jaisa par behtar rules ke saath. Set sirf values rakhta hai, aur ek value do baar kabhi nahi. Agar tum pooch rahe ho "ye pehle dekha kya?", toh Set chahiye; "is key ke neeche kya rakha hai?" toh Map.',
      },
      code: `const m = new Map([['a', 1], ['b', 2]]);
m.get('a');        // 1
m.set('c', 3);
m.has('b');        // true

const s = new Set([1, 2, 2, 3]);
s;                 // Set(3) { 1, 2, 3 } — the duplicate is gone
s.has(2);          // true`,
    },
    {
      heading: { en: 'Shared API, one difference', hi: 'API ek jaisi, ek farq' },
      body: {
        en: 'Both have size, has, delete, clear, and both are iterable in insertion order. Map adds get and set for the value side; Set has add instead. Note size is a property, not a method — no parentheses.',
        hi: 'Dono mein size, has, delete, clear hain, aur dono insertion order mein iterable hain. Map value ke liye get aur set jodta hai; Set ke paas uski jagah add hai. Dhyaan do size property hai, method nahi — brackets nahi lagte.',
      },
      diagram: `                Map                 Set
add             set(k, v)           add(v)
read            get(k)              — (only has)
exists          has(k)              has(v)
remove          delete(k)           delete(v)
count           size                size
iterate         [k, v] pairs        values`,
    },
    {
      heading: { en: 'Why Map beats a plain object', hi: 'Map plain object se behtar kyun hai' },
      body: {
        en: 'Four concrete reasons. Keys can be any type, including objects and functions — object keys are coerced to strings. Insertion order is guaranteed. size is O(1) instead of Object.keys(o).length. And there is no prototype, so no inherited keys to trip over.',
        hi: 'Chaar thos wajah. Keys kisi bhi type ki ho sakti hain, objects aur functions samet — object ki keys strings mein badal jaati hain. Insertion order guarantee hai. size O(1) hai, Object.keys(o).length nahi. Aur prototype nahi hai, toh inherited keys se thokar nahi lagti.',
      },
      code: `const o = {};
o[1] = 'a'; o['1'] = 'b';
o;                    // { '1': 'b' } — the number became a string

const m = new Map();
m.set(1, 'a').set('1', 'b');
m.size;               // 2 ✓ genuinely different keys

const fn = () => {};
m.set(fn, 'meta');    // ✓ an object as a key`,
    },
    {
      heading: { en: 'Equality: SameValueZero', hi: 'Barabari: SameValueZero' },
      body: {
        en: 'Both use SameValueZero, which is === with one adjustment: NaN equals itself. Objects are still compared by reference, so two identical-looking literals are two different keys. This trips people trying to deduplicate objects with a Set.',
        hi: 'Dono SameValueZero use karte hain, jo === hi hai ek badlaav ke saath: NaN khud ke barabar hai. Objects abhi bhi reference se compare hote hain, toh do dikhne mein same literals do alag keys hain. Set se objects deduplicate karne wale yahin phasate hain.',
      },
      code: `new Set([NaN, NaN]).size;      // 1 ✓ unlike ===
new Set([0, -0]).size;         // 1

new Set([{a:1}, {a:1}]).size;  // 2 ✗ different references
// To dedupe by content, key on a string:
new Set([{a:1},{a:1}].map((o) => JSON.stringify(o))).size;  // 1`,
    },
    {
      heading: { en: 'What Set is genuinely good at', hi: 'Set kis cheez mein sach mein achha hai' },
      body: {
        en: 'Membership tests in O(1) instead of the O(n) of includes, deduplication in one line, and the classic set operations. On a large list, swapping includes for a Set inside a loop turns O(n²) into O(n) — one of the easiest real speedups there is.',
        hi: 'Membership test O(1) mein, includes ke O(n) ki jagah; ek line mein deduplication; aur classic set operations. Badi list pe loop ke andar includes ko Set se badalna O(n²) ko O(n) bana deta hai — sabse aasaan asli speedups mein se ek.',
      },
      code: `[...new Set(arr)];                              // dedupe

const A = new Set([1,2,3]), B = new Set([2,3,4]);
[...A].filter((x) => B.has(x));    // intersection [2,3]
[...A].filter((x) => !B.has(x));   // difference   [1]
new Set([...A, ...B]);             // union        {1,2,3,4}`,
    },
    {
      heading: { en: 'Neither is JSON-serialisable', hi: 'Dono JSON mein nahi jaate' },
      body: {
        en: 'JSON.stringify turns both into an empty object and loses everything. Convert explicitly before sending or storing, and rebuild on the other side.',
        hi: 'JSON.stringify dono ko khaali object bana deta hai aur sab kuch kho deta hai. Bhejne ya store karne se pehle explicitly convert karo, aur doosri taraf dobara bana lo.',
      },
      code: `JSON.stringify(new Map([['a',1]]));   // '{}'  ✗
JSON.stringify(new Set([1,2]));       // '{}'  ✗

JSON.stringify([...map]);             // '[["a",1]]' ✓
new Map(JSON.parse(str));             // rebuild`,
    },
    {
      heading: { en: 'Choosing in practice', hi: 'Asal mein chunna' },
      body: {
        en: 'Object for fixed, known, string-keyed records — and anything that must be JSON. Map for a dynamic dictionary, non-string keys, or when order and size matter. Set whenever you mean "a collection of distinct things".',
        hi: 'Object un records ke liye jinke string keys tay aur maloom hain — aur har wo cheez jo JSON banni hai. Map dynamic dictionary, non-string keys, ya jab order aur size maayne rakhein. Set jab bhi matlab ho "alag-alag cheezon ka ek group".',
      },
    },
  ],

  'What are WeakMap and WeakSet in JavaScript?': [
    {
      heading: { en: 'Start with what "weak" means', hi: 'Pehle samjho "weak" ka matlab kya hai' },
      body: {
        en: 'JavaScript frees an object when nothing can reach it any more. A normal Map holds a STRONG reference to its keys, so anything you put in a Map can never be collected while the Map lives. A WeakMap holds a WEAK reference: it does not count as a reason to keep the object alive.',
        hi: 'JavaScript object tab free karta hai jab usse koi pahunch hi na sake. Aam Map apni keys ko MAZBOOTI se pakadta hai, toh Map mein daali koi bhi cheez Map ke rehte kabhi collect nahi ho sakti. WeakMap KAMZOR reference rakhta hai: wo object ko zinda rakhne ki wajah nahi ginta.',
      },
      diagram: `Map                          WeakMap
 key ══════► object           key ─ ─ ─ ► object
 (strong: pinned in memory)   (weak: collectable)

 delete the last other        the entry disappears
 reference → still alive      along with the object`,
    },
    {
      heading: { en: 'The leak a normal Map causes', hi: 'Aam Map kaunsa leak karta hai' },
      body: {
        en: 'Store metadata about DOM nodes in a Map. Remove the nodes from the page. The Map still holds them, so the browser cannot free a single one, and your Map grows forever. This is one of the most common real memory leaks in front-end code.',
        hi: 'DOM nodes ka metadata Map mein rakho. Nodes page se hata do. Map unhe abhi bhi pakde hue hai, toh browser ek bhi free nahi kar sakta, aur tumhara Map badhta hi jaata hai. Front-end code ke sabse common asli memory leaks mein se ek yahi hai.',
      },
      code: `const meta = new Map();
meta.set(node, { clicks: 0 });
node.remove();
// ✗ node is off the page but alive — meta still points at it

const meta = new WeakMap();
meta.set(node, { clicks: 0 });
node.remove();
// ✓ node and its entry are both collectable`,
    },
    {
      heading: { en: 'Keys must be objects, and that is the point', hi: 'Keys objects honi chahiye, aur yahi asli baat hai' },
      body: {
        en: 'Primitives cannot be weakly held — a string has no identity to collect. So WeakMap keys must be objects (or non-registered symbols). Trying to use a string throws immediately.',
        hi: 'Primitives ko weakly nahi pakad sakte — string ki koi identity nahi jo collect ho. Isliye WeakMap ki keys objects honi chahiye (ya non-registered symbols). String use karne ki koshish turant error deti hai.',
      },
      code: `const wm = new WeakMap();
wm.set({}, 1);          // ✓
wm.set('key', 1);       // ✗ TypeError: Invalid value used as weak map key`,
    },
    {
      heading: { en: 'No size, no iteration, no clear', hi: 'Na size, na iteration, na clear' },
      body: {
        en: 'You get only get, set, has and delete on a WeakMap, and add, has and delete on a WeakSet. There is no size and you cannot loop over them. This is not an oversight: the contents can change at any moment when the collector runs, so exposing them would make garbage collection observable.',
        hi: 'WeakMap pe sirf get, set, has aur delete milte hain, aur WeakSet pe add, has aur delete. Na size hai, na inpe loop chala sakte ho. Ye bhool nahi hai: collector chalte hi contents kabhi bhi badal sakte hain, toh unhe dikhana garbage collection ko observable bana deta.',
      },
      code: `const wm = new WeakMap();
wm.size;              // undefined
for (const x of wm) {}  // ✗ not iterable
[...wm];                // ✗ TypeError`,
    },
    {
      heading: { en: 'Use one: private data for instances', hi: 'Ek upyog: instances ka private data' },
      body: {
        en: 'Before #private fields existed, this was the standard way to attach data to an object that outside code genuinely could not reach. The entry disappears when the instance does, with no cleanup code.',
        hi: 'Jab #private fields nahi the, tab object ke saath aisa data jodne ka yahi standard tareeka tha jahan bahar ka code sach mein pahunch hi na sake. Instance jaate hi entry gaayab ho jaati hai, bina kisi cleanup code ke.',
      },
      code: `const store = new WeakMap();

class Counter {
  constructor() { store.set(this, { n: 0 }); }
  inc() { return ++store.get(this).n; }
}
// Nothing outside this module can read store's contents for an instance.`,
    },
    {
      heading: { en: 'Use two: caching by object identity', hi: 'Doosra upyog: object identity se caching' },
      body: {
        en: 'Cache an expensive computation keyed on the object it was computed from. When the object is collected, the cache entry goes with it — a cache that cannot leak, and that needs no eviction policy at all.',
        hi: 'Kisi mehnga computation ko usi object pe key karke cache karo jisse wo bana tha. Object collect hote hi cache entry bhi chali jaati hai — aisa cache jo leak nahi kar sakta, aur jise koi eviction policy chahiye hi nahi.',
      },
      code: `const cache = new WeakMap();

function analyse(node) {
  if (cache.has(node)) return cache.get(node);
  const result = expensive(node);
  cache.set(node, result);
  return result;
}`,
    },
    {
      heading: { en: 'WeakSet: marking objects without holding them', hi: 'WeakSet: objects ko pakde bina nishaan lagana' },
      body: {
        en: 'Same idea with values only. Its natural use is tagging — "I have already processed this", "this one is visited" — during a traversal where you must not keep the nodes alive afterwards.',
        hi: 'Wahi idea, sirf values ke saath. Iska sahi upyog nishaan lagana hai — "ye process ho chuka", "ye visit ho gaya" — kisi aisi traversal mein jahan baad mein nodes ko zinda nahi rakhna.',
      },
      code: `const visited = new WeakSet();

function walk(node) {
  if (visited.has(node)) return;   // cycle guard
  visited.add(node);
  node.children.forEach(walk);
}`,
    },
    {
      heading: { en: 'When NOT to reach for them', hi: 'Inhe kab NAHI uthana' },
      body: {
        en: 'If you need to count, list or serialise the entries, a WeakMap simply cannot do it — use a Map. If your keys are strings or numbers, it is not even an option. And do not use one as a general-purpose Map "for performance"; the reason to choose it is lifetime, not speed.',
        hi: 'Agar entries ginni, list karni ya serialise karni hain toh WeakMap kar hi nahi sakta — Map lo. Agar keys strings ya numbers hain toh ye option hi nahi hai. Aur isse "performance ke liye" aam Map ki tarah mat use karo; chunne ki wajah lifetime hai, speed nahi.',
      },
    },
  ],

  'What is the difference between sessionStorage, localStorage, and cookies?': [
    {
      heading: { en: 'Lifetime is the first split', hi: 'Pehla farq umar ka hai' },
      body: {
        en: 'localStorage persists until code deletes it — closing the browser does nothing. sessionStorage lives only for that tab: close the tab and it is gone, and a second tab on the same site gets its OWN empty copy. Cookies expire on a date you set, or when the browser closes if you set none.',
        hi: 'localStorage tab tak rehta hai jab tak code usse delete na kare — browser band karne se kuch nahi hota. sessionStorage sirf us tab tak zinda hai: tab band karo aur gaya, aur usi site ka doosra tab APNI khaali copy paata hai. Cookies tumhari di hui date pe expire hoti hain, ya date na do toh browser band hone pe.',
      },
      diagram: `                 survives reload   survives tab close   shared across tabs
localStorage           yes                 yes                  yes
sessionStorage         yes                 no                   no
cookie (persistent)    yes                 yes                  yes
cookie (session)       yes                 no                   yes`,
    },
    {
      heading: { en: 'The one that goes to the server', hi: 'Jo server tak jaata hai' },
      body: {
        en: 'This is the difference that decides most designs. Cookies are attached to every single HTTP request to that domain, automatically. localStorage and sessionStorage never leave the browser unless your code sends them. So a 4KB cookie is 4KB added to every image and API call you make.',
        hi: 'Yahi wo farq hai jo zyadatar design tay karta hai. Cookies us domain ke har HTTP request ke saath apne aap chipak jaati hain. localStorage aur sessionStorage browser se tabhi nikalte hain jab tumhara code bheje. Toh 4KB ki cookie matlab har image aur API call mein 4KB extra.',
      },
      diagram: `browser ──── GET /api/x ────► server
             Cookie: session=abc     ← sent automatically
             (localStorage: not sent, ever)`,
    },
    {
      heading: { en: 'Size and shape', hi: 'Size aur shape' },
      body: {
        en: 'Cookies are capped around 4KB each with a limit of roughly 50 per domain. Web storage gives you 5 to 10MB. Both web storage APIs are strings only, so objects must be stringified — and parsed back, which will throw on corrupt data.',
        hi: 'Har cookie lagbhag 4KB tak seemit hai aur per domain lagbhag 50. Web storage 5 se 10MB deta hai. Dono web storage APIs sirf strings leti hain, toh objects ko stringify karna padta hai — aur wapas parse, jo kharaab data pe error dega.',
      },
      code: `localStorage.setItem('user', JSON.stringify({ id: 1 }));

const raw = localStorage.getItem('user');
const user = raw ? JSON.parse(raw) : null;   // guard — parse can throw

localStorage.setItem('n', 5);
typeof localStorage.getItem('n');   // 'string' — always`,
    },
    {
      heading: { en: 'Security: why tokens should not sit in localStorage', hi: 'Security: tokens localStorage mein kyun nahi rakhne chahiye' },
      body: {
        en: 'Any JavaScript on the page can read localStorage — including a script injected through XSS, or a compromised dependency. A cookie marked HttpOnly is invisible to JavaScript entirely, so the same XSS cannot steal it. Add Secure and SameSite and you have the standard session-token setup.',
        hi: 'Page ka koi bhi JavaScript localStorage padh sakta hai — XSS se ghusaya gaya script bhi, ya kharaab dependency bhi. HttpOnly cookie JavaScript ko dikhti hi nahi, toh wahi XSS usse chura nahi sakta. Secure aur SameSite jodo aur standard session-token setup ban jaata hai.',
      },
      code: `Set-Cookie: session=abc;
            HttpOnly;          // JS cannot read it
            Secure;            // HTTPS only
            SameSite=Lax;      // blocks most CSRF
            Max-Age=3600`,
    },
    {
      heading: { en: 'Everything is per origin', hi: 'Sab kuch origin ke hisaab se' },
      body: {
        en: 'Web storage is scoped to the exact origin — protocol, host and port must all match. Cookies are looser: they are scoped by domain and path, and can be shared across subdomains, which is how single sign-on across app and api subdomains works.',
        hi: 'Web storage bilkul origin tak seemit hai — protocol, host aur port teeno match hone chahiye. Cookies dheeli hain: wo domain aur path se scoped hain, aur subdomains ke beech share ho sakti hain, isi se app aur api subdomains pe single sign-on chalta hai.',
      },
      code: `// http://site.com and https://site.com → DIFFERENT localStorage
// .site.com cookie → visible to app.site.com AND api.site.com`,
    },
    {
      heading: { en: 'Two APIs worth knowing', hi: 'Do API jo jaanni chahiye' },
      body: {
        en: 'The storage event fires in OTHER tabs when localStorage changes, which is the simplest way to sync logout across tabs. And document.cookie is a single string you must parse by hand — use the modern Cookie Store API or a tiny helper.',
        hi: 'localStorage badalne pe storage event DOOSRE tabs mein fire hota hai, jo tabs ke beech logout sync karne ka sabse simple tareeka hai. Aur document.cookie ek hi string hai jise haath se parse karna padta hai — modern Cookie Store API ya chhota helper use karo.',
      },
      code: `window.addEventListener('storage', (e) => {
  if (e.key === 'token' && !e.newValue) location.reload();  // logged out
});
// Note: this does NOT fire in the tab that made the change.`,
    },
    {
      heading: { en: 'Choosing, and the failure mode to handle', hi: 'Chunna, aur wo failure jise sambhalna hai' },
      body: {
        en: 'Session tokens → HttpOnly cookie. UI preferences, theme, draft text → localStorage. Per-tab state like a multi-step form → sessionStorage. And always wrap writes in try/catch: Safari private mode and a full quota both throw on setItem.',
        hi: 'Session tokens → HttpOnly cookie. UI preferences, theme, draft text → localStorage. Per-tab state jaise multi-step form → sessionStorage. Aur writes ko hamesha try/catch mein lapeto: Safari private mode aur bhara hua quota dono setItem pe error dete hain.',
      },
      code: `try {
  localStorage.setItem(k, v);
} catch {
  // QuotaExceededError, or storage disabled — degrade gracefully
}`,
    },
  ],

  'What are map, filter, and reduce in JavaScript?': [
    {
      heading: { en: 'Three shapes of the same loop', hi: 'Ek hi loop ke teen roop' },
      body: {
        en: 'All three walk an array once and build something new. They differ only in what comes out. map gives you the same number of items, transformed. filter gives you fewer items, unchanged. reduce gives you a single value of any shape at all.',
        hi: 'Teeno array pe ek baar chalte hain aur kuch naya banate hain. Farq sirf itna hai ki bahar kya aata hai. map utne hi items deta hai, badle hue. filter kam items deta hai, waise ke waise. reduce ek hi value deta hai, kisi bhi shape ki.',
      },
      diagram: `[1, 2, 3, 4]

map(n => n * 2)      → [2, 4, 6, 8]     same length
filter(n => n > 2)   → [3, 4]           shorter
reduce((a,b) => a+b) → 10               one value`,
    },
    {
      heading: { en: 'map — transform every item', hi: 'map — har item badlo' },
      body: {
        en: 'The callback receives the item, its index and the whole array, and whatever it RETURNS becomes the element at that position. Forgetting the return is the single most common mistake — you get an array of undefined.',
        hi: 'Callback ko item, uska index aur poora array milta hai, aur wo jo RETURN karta hai wahi us jagah ka element ban jaata hai. Return bhool jaana sabse common galti hai — undefined ka array mil jaata hai.',
      },
      code: `[1, 2, 3].map((n) => n * 2);        // [2, 4, 6]
users.map((u) => u.name);           // ['Asha', 'Ravi']

[1, 2].map((n) => { n * 2; });      // ✗ [undefined, undefined]
[1, 2].map((n) => { return n * 2; }); // ✓`,
    },
    {
      heading: { en: 'filter — keep what passes the test', hi: 'filter — jo test paas kare wahi rakho' },
      body: {
        en: 'The callback returns a boolean. Truthy keeps the item, falsy drops it. The items themselves are untouched — filter never transforms, and for objects the survivors are the same references, not copies.',
        hi: 'Callback boolean return karta hai. Truthy item rakh leta hai, falsy gira deta hai. Items khud nahi badalte — filter kabhi transform nahi karta, aur objects ke liye bache hue wahi references hain, copies nahi.',
      },
      code: `[1, 2, 3, 4].filter((n) => n % 2 === 0);   // [2, 4]
users.filter((u) => u.active);

// Handy: drop falsy values in one go
['a', '', null, 'b'].filter(Boolean);      // ['a', 'b']`,
    },
    {
      heading: { en: 'reduce — fold the array into one thing', hi: 'reduce — array ko ek cheez mein modo' },
      body: {
        en: 'Reduce carries an accumulator across the whole array. Its callback takes the accumulator and the current item, and must RETURN the next accumulator. Always pass the initial value as the second argument — without it, reduce on an empty array throws, and the first item is used as the seed.',
        hi: 'Reduce poore array mein ek accumulator saath le kar chalta hai. Uska callback accumulator aur maujooda item leta hai, aur agla accumulator RETURN karna zaroori hai. Initial value hamesha doosre argument mein do — bina uske khaali array pe reduce error deta hai, aur pehla item hi seed ban jaata hai.',
      },
      code: `[1, 2, 3].reduce((sum, n) => sum + n, 0);     // 6
//                 ↑acc  ↑item          ↑initial

[].reduce((a, b) => a + b);      // ✗ TypeError: Reduce of empty array
[].reduce((a, b) => a + b, 0);   // ✓ 0`,
    },
    {
      heading: { en: 'reduce can build anything', hi: 'reduce kuch bhi bana sakta hai' },
      body: {
        en: 'This is why it feels harder than the other two: the accumulator does not have to be a number. Start with an object and you get grouping; start with an array and you can implement map and filter themselves.',
        hi: 'Isiliye ye baaki do se mushkil lagta hai: accumulator ka number hona zaroori nahi. Object se shuru karo toh grouping mil jaati hai; array se shuru karo toh map aur filter khud bana sakte ho.',
      },
      code: `// group by a key
users.reduce((acc, u) => {
  (acc[u.role] ||= []).push(u);
  return acc;
}, {});
// { admin: [...], user: [...] }

// count occurrences
'hello'.split('').reduce((c, ch) => (c[ch] = (c[ch] || 0) + 1, c), {});`,
    },
    {
      heading: { en: 'Chaining, and the cost of it', hi: 'Chaining, aur uski keemat' },
      body: {
        en: 'They compose beautifully because each returns an array. The trade-off is that every link walks the data again and allocates a new array. For a few thousand items that is irrelevant; for a million in a hot path, one reduce or one plain loop is measurably better.',
        hi: 'Ye khoobsurti se judte hain kyunki har ek array return karta hai. Sauda ye hai ki har kadi data pe dobara chalti hai aur naya array banati hai. Kuch hazaar items ke liye ye bemaani hai; hot path mein das lakh ke liye ek reduce ya ek saada loop naapne laayak behtar hai.',
      },
      code: `orders
  .filter((o) => o.paid)
  .map((o) => o.total)
  .reduce((s, t) => s + t, 0);
// three passes — clear, and fine for normal sizes`,
    },
    {
      heading: { en: 'They skip holes and never mutate', hi: 'Ye holes chhod dete hain aur mutate kabhi nahi karte' },
      body: {
        en: 'All three return a new array and leave the original alone — that is why they suit React state. They also skip empty slots in sparse arrays, which is why Array(3).map does nothing. And use forEach, not map, when you only want a side effect.',
        hi: 'Teeno naya array dete hain aur original ko chhodte hain — isiliye React state ke liye theek hain. Ye sparse arrays ke khaali slots bhi chhod dete hain, isiliye Array(3).map kuch nahi karta. Aur jab sirf side effect chahiye toh map nahi, forEach use karo.',
      },
      code: `Array(3).map((_, i) => i);        // [ <3 empty items> ] ✗
Array.from({ length: 3 }, (_, i) => i);   // [0, 1, 2] ✓

items.map((i) => console.log(i));  // ✗ misuse — returns undefineds
items.forEach((i) => console.log(i));     // ✓`,
    },
  ],

  'What is a generator function in JavaScript?': [
    {
      heading: { en: 'A function that can pause and resume', hi: 'Aisa function jo ruk kar phir chal sake' },
      body: {
        en: 'Every normal function runs to completion once you call it. A generator, written function*, can stop in the middle at a yield, hand a value back, and continue later from exactly that point with all its local state intact. Nothing else in the language does this.',
        hi: 'Har aam function call karte hi poora chal jaata hai. Generator, jo function* likha jaata hai, beech mein yield pe ruk sakta hai, ek value wapas de sakta hai, aur baad mein bilkul usi jagah se apne saare local state ke saath aage chal sakta hai. Language mein aur kuch ye nahi karta.',
      },
      code: `function* count() {
  console.log('start');
  yield 1;
  console.log('resumed');
  yield 2;
  return 3;
}`,
    },
    {
      heading: { en: 'Calling it runs nothing', hi: 'Isse call karne se kuch nahi chalta' },
      body: {
        en: 'This surprises everyone the first time. Calling a generator returns an iterator object and executes not a single line of the body. The body only advances when you call next(), and it runs exactly as far as the next yield.',
        hi: 'Pehli baar ye sabko chaunkata hai. Generator ko call karne se ek iterator object milta hai aur body ki ek bhi line nahi chalti. Body tabhi aage badhti hai jab tum next() call karo, aur wo bilkul agle yield tak chalti hai.',
      },
      code: `const it = count();          // nothing logged yet

it.next();   // logs 'start'    → { value: 1, done: false }
it.next();   // logs 'resumed'  → { value: 2, done: false }
it.next();   //                 → { value: 3, done: true }
it.next();   //                 → { value: undefined, done: true }`,
    },
    {
      heading: { en: 'The shape of what next returns', hi: 'next kya shape return karta hai' },
      body: {
        en: 'Always an object with value and done. done stays false while yields remain; the return value arrives with done: true, and every call after that gives undefined. This is the iterator protocol — generators are just the easy way to implement it.',
        hi: 'Hamesha ek object jisme value aur done hote hain. Jab tak yields bache hain done false rehta hai; return value done: true ke saath aati hai, aur uske baad har call undefined deta hai. Yahi iterator protocol hai — generators bas isse banane ka aasaan tareeka hain.',
      },
      diagram: `next()  →  { value: 1,         done: false }
next()  →  { value: 2,         done: false }
next()  →  { value: 3,         done: true  }   ← the return
next()  →  { value: undefined, done: true  }`,
    },
    {
      heading: { en: 'Laziness is the real payoff', hi: 'Asli fayda laziness hai' },
      body: {
        en: 'Values are computed only when asked for, so you can describe an infinite sequence and take just what you need. There is no array holding a million numbers — only the current one.',
        hi: 'Values tabhi banti hain jab maangi jaayein, toh tum ek anant sequence bata sakte ho aur sirf utna le sakte ho jitna chahiye. Das lakh numbers wala koi array nahi hota — sirf maujooda ek.',
      },
      code: `function* naturals() { let n = 1; while (true) yield n++; }

const it = naturals();
it.next().value;   // 1
it.next().value;   // 2
// Memory used: one number. The loop never actually ends.`,
    },
    {
      heading: { en: 'They are iterable, so for...of just works', hi: 'Ye iterable hain, toh for...of chal jaata hai' },
      body: {
        en: 'A generator object is both an iterator and an iterable, so it slots straight into for...of, spread and destructuring. Note that for...of ignores the returned value — it stops as soon as done is true.',
        hi: 'Generator object iterator bhi hai aur iterable bhi, toh wo seedha for...of, spread aur destructuring mein fit ho jaata hai. Dhyaan do ki for...of return ki hui value ko chhod deta hai — done true hote hi ruk jaata hai.',
      },
      code: `function* g() { yield 1; yield 2; return 99; }

for (const v of g()) console.log(v);   // 1, 2 — not 99
[...g()];                              // [1, 2]
const [a, b] = g();                    // a=1, b=2`,
    },
    {
      heading: { en: 'Communication goes both ways', hi: 'Baat dono taraf hoti hai' },
      body: {
        en: 'A value passed to next() becomes the result of the yield expression that is currently paused. That makes a generator a two-way channel, not just a producer. throw() and return() let you inject an error or finish it early — and finally blocks still run.',
        hi: 'next() ko di gayi value us yield expression ka result ban jaati hai jo abhi ruka hua hai. Isse generator ek do-tarfa channel ban jaata hai, sirf producer nahi. throw() aur return() se error bhej sakte ho ya jaldi khatam kar sakte ho — aur finally blocks phir bhi chalte hain.',
      },
      code: `function* chat() {
  const name = yield 'who are you?';
  yield 'hello ' + name;
}
const c = chat();
c.next().value;         // 'who are you?'
c.next('Asha').value;   // 'hello Asha'  ← the argument landed in name`,
    },
    {
      heading: { en: 'yield* delegates to another iterable', hi: 'yield* doosre iterable ko saunp deta hai' },
      body: {
        en: 'yield* hands control to another generator or any iterable and yields everything it produces, then continues. It is how you compose generators, and it makes recursive traversal of a tree very clean.',
        hi: 'yield* control doosre generator ya kisi bhi iterable ko de deta hai aur uska sab kuch yield karta hai, phir aage chalta hai. Isi se generators jodte hain, aur tree ki recursive traversal bahut saaf ho jaati hai.',
      },
      code: `function* walk(node) {
  yield node.value;
  for (const child of node.children) yield* walk(child);
}
[...walk(tree)];   // every value, depth first`,
    },
    {
      heading: { en: 'Where you will actually meet them', hi: 'Ye tumhe asal mein kahan milenge' },
      body: {
        en: 'Redux-Saga uses them to make async flows testable, because yielding a plain description means the test never performs real I/O. Historically they powered async/await before it existed — an async function is essentially a generator plus an automatic driver. And they are the clean way to write a custom Symbol.iterator.',
        hi: 'Redux-Saga inse async flows testable banata hai, kyunki ek saada description yield karne se test kabhi asli I/O nahi karta. Itihaas mein inhi se async/await chalta tha uske aane se pehle — async function asal mein generator plus ek automatic driver hai. Aur custom Symbol.iterator likhne ka saaf tareeka yahi hai.',
      },
      code: `class Range {
  constructor(a, b) { this.a = a; this.b = b; }
  *[Symbol.iterator]() { for (let i = this.a; i <= this.b; i++) yield i; }
}
[...new Range(1, 4)];   // [1, 2, 3, 4]`,
    },
  ],

  'What is closure in JavaScript?': [
    {
      heading: { en: 'A function plus the scope it was born in', hi: 'Ek function aur wo scope jisme wo paida hua' },
      body: {
        en: 'When a function is created, it keeps a hidden link to the scope around it. Call that function anywhere later — a different file, a callback, a year of runtime later — and it still reads and writes those original variables. The function and that captured scope together are the closure.',
        hi: 'Jab function banta hai, wo apne aas-paas ke scope se ek chhupi hui link rakh leta hai. Us function ko kahin bhi baad mein call karo — doosri file, callback, ek saal baad — wo phir bhi un asli variables ko padhta aur likhta hai. Function aur wo pakda hua scope milkar closure hai.',
      },
      code: `function outer() {
  let count = 0;              // lives in outer's scope
  return function inner() {
    return ++count;           // still reachable after outer returned
  };
}
const next = outer();
next();   // 1
next();   // 2   ← count survived`,
    },
    {
      heading: { en: 'Why the variable does not disappear', hi: 'Variable gaayab kyun nahi hota' },
      body: {
        en: 'Normally a function\'s local variables die when it returns. Here they cannot: inner still references count, so count is still reachable, so the collector must keep it. Closures are just ordinary garbage-collection rules applied to scopes.',
        hi: 'Aam taur pe function ke local variables return hote hi mar jaate hain. Yahan wo mar nahi sakte: inner abhi bhi count ko reference karta hai, toh count abhi bhi reachable hai, toh collector ko usse rakhna hi padega. Closures bas aam garbage-collection ke rules hain, scopes pe lagaye hue.',
      },
      diagram: `outer() returns
   │
   │  its scope would normally be freed…
   ▼
[ count: 0 ]  ◄────── inner still points here
   ▲
   └─ so it stays alive as long as inner does`,
    },
    {
      heading: { en: 'Each call creates a fresh, independent scope', hi: 'Har call naya, alag scope banati hai' },
      body: {
        en: 'This is the part people get wrong. Two calls to outer produce two entirely separate counts. Closures capture a scope, not a value, and each invocation gets its own.',
        hi: 'Yahi wo hissa hai jahan log galti karte hain. outer ke do calls do bilkul alag counts banate hain. Closures scope pakadte hain, value nahi, aur har invocation ko apna milta hai.',
      },
      code: `const a = outer();
const b = outer();
a(); a();   // 1, 2
b();        // 1  ← b has its own count, untouched by a`,
    },
    {
      heading: { en: 'They capture the variable, not a snapshot', hi: 'Ye variable pakadte hain, snapshot nahi' },
      body: {
        en: 'The closure sees the variable\'s CURRENT value whenever it runs, not the value at creation time. This is the whole explanation for the classic loop puzzle: var gives every callback the same binding, let gives each iteration its own.',
        hi: 'Closure jab bhi chalta hai variable ki MAUJOODA value dekhta hai, banne ke waqt ki value nahi. Classic loop puzzle ki poori wajah yahi hai: var har callback ko ek hi binding deta hai, let har iteration ko apni.',
      },
      code: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));
// 3 3 3 — one shared i, read after the loop ended

for (let j = 0; j < 3; j++) setTimeout(() => console.log(j));
// 0 1 2 — a fresh j captured each time`,
    },
    {
      heading: { en: 'Use one: real private state', hi: 'Ek upyog: asli private state' },
      body: {
        en: 'A variable inside a closure cannot be reached from outside — there is no syntax for it. That is stronger than an underscore-prefixed property, and it is the foundation of the module pattern and of factory functions.',
        hi: 'Closure ke andar ka variable bahar se pakda hi nahi ja sakta — uske liye koi syntax hi nahi hai. Ye underscore wale property naam se zyada mazboot hai, aur module pattern aur factory functions ki neev yahi hai.',
      },
      code: `function makeAccount(initial) {
  let balance = initial;                    // unreachable outside
  return {
    deposit: (n) => (balance += n),
    get: () => balance,
  };
}
const acc = makeAccount(100);
acc.balance;    // undefined — genuinely hidden
acc.get();      // 100`,
    },
    {
      heading: { en: 'Use two: remembering across calls', hi: 'Doosra upyog: calls ke beech yaad rakhna' },
      body: {
        en: 'Memoisation, debounce, throttle, once — every one of these works by keeping something between invocations, and a closure is where that something lives. If you have written any of them, you have written closures.',
        hi: 'Memoisation, debounce, throttle, once — in sab mein calls ke beech kuch yaad rakha jaata hai, aur wo kuch closure mein rehta hai. Agar tumne inme se koi bhi likha hai, toh closures likh chuke ho.',
      },
      code: `function once(fn) {
  let called = false, result;
  return (...args) => {
    if (!called) { called = true; result = fn(...args); }
    return result;
  };
}`,
    },
    {
      heading: { en: 'The leak they can cause', hi: 'Ye kaunsa leak kar sakte hain' },
      body: {
        en: 'A closure keeps its entire enclosing scope alive, not only the variables it uses — engines optimise this, but you should not rely on it. A handler that closes over a huge array keeps that array in memory for as long as the handler is attached. Null out large references you no longer need, and always remove listeners.',
        hi: 'Closure apna poora aas-paas ka scope zinda rakhta hai, sirf jo variables use karta hai wahi nahi — engines isse optimise karte hain, par uspe bharosa mat karo. Koi handler jo bade array pe close karta hai, us array ko tab tak memory mein rakhta hai jab tak handler juda hai. Bade references jinki zaroorat nahi unhe null karo, aur listeners hamesha hatao.',
      },
      code: `function attach() {
  const huge = new Array(1e6).fill('x');
  el.addEventListener('click', () => console.log('hi'));
  // huge may be retained by the handler's scope
}
// Fix: keep the closure small, and removeEventListener on teardown.`,
    },
  ],

  'What is hoisting in JavaScript?': [
    {
      heading: { en: 'Nothing actually moves', hi: 'Asal mein kuch upar nahi jaata' },
      body: {
        en: 'The usual picture — declarations being lifted to the top of the file — is a teaching metaphor, not what happens. Your code is not rearranged. What happens is that before running a scope, the engine walks it once and REGISTERS every declaration it finds. Hoisting is the name for that first pass.',
        hi: 'Aam tasveer — declarations file ke upar chale jaate hain — sikhane ka roopak hai, hakeekat nahi. Tumhara code dobara arrange nahi hota. Hota ye hai ki scope chalane se pehle engine ek baar usme ghoomta hai aur har declaration REGISTER karta hai. Us pehle chakkar ka naam hi hoisting hai.',
      },
      diagram: `entering a scope
  │
  ├─ PASS 1  register declarations   ← "hoisting"
  │            var        → undefined
  │            function   → whole body
  │            let/const  → uninitialised (TDZ)
  │            class      → uninitialised (TDZ)
  └─ PASS 2  run the statements`,
    },
    {
      heading: { en: 'Function declarations hoist completely', hi: 'Function declarations poore hoist hote hain' },
      body: {
        en: 'The name and the body are both available before the definition line. This is the only construct you can genuinely use before you write it, and it is why helper functions can sit at the bottom of a file.',
        hi: 'Naam aur body dono definition line se pehle available hote hain. Sirf yahi cheez hai jise sach mein likhne se pehle use kar sakte ho, aur isiliye helper functions file ke neeche baith sakte hain.',
      },
      code: `greet();                        // ✓ 'hi'
function greet() { return 'hi'; }`,
    },
    {
      heading: { en: 'var hoists the name, not the value', hi: 'var naam hoist karta hai, value nahi' },
      body: {
        en: 'A var binding is created and set to undefined. The assignment stays exactly where you wrote it. So reading early gives undefined rather than an error, which is precisely what makes var bugs so quiet.',
        hi: 'var binding banti hai aur undefined set ho jaati hai. Assignment wahin rehta hai jahan tumne likha. Toh jaldi padhne pe error ki jagah undefined milta hai, aur isiliye var ke bugs itne chup-chaap hote hain.',
      },
      code: `console.log(x);   // undefined — not an error
var x = 5;
console.log(x);   // 5

// what the engine effectively does:
// var x;  → undefined
// console.log(x)
// x = 5`,
    },
    {
      heading: { en: 'let, const and class hoist into the TDZ', hi: 'let, const aur class TDZ mein hoist hote hain' },
      body: {
        en: 'They are registered too, but deliberately left uninitialised. Touching them before their line throws "Cannot access before initialization" — a different error from "is not defined", and that difference is your clue.',
        hi: 'Ye bhi register hote hain, par jaan-boojh kar uninitialised chhod diye jaate hain. Inhe apni line se pehle chhoo lo toh "Cannot access before initialization" aata hai — jo "is not defined" se alag error hai, aur wahi farq tumhara suraag hai.',
      },
      code: `console.log(y);   // ✗ ReferenceError: Cannot access 'y' before…
let y = 1;

new Dog();        // ✗ same for classes
class Dog {}`,
    },
    {
      heading: { en: 'Function expressions follow their variable', hi: 'Function expressions apne variable ke peeche chalte hain' },
      body: {
        en: 'Only declarations hoist as functions. An expression assigned to a variable obeys that variable\'s rules, which produces the confusing "is not a function" error with var — the name exists but holds undefined.',
        hi: 'Sirf declarations function ki tarah hoist hote hain. Variable mein assign kiya gaya expression us variable ke rules maanta hai, jisse var ke saath confusing "is not a function" error aata hai — naam hai par usme undefined pada hai.',
      },
      code: `f();                      // ✗ TypeError: f is not a function
var f = function () {};

g();                      // ✗ ReferenceError (TDZ)
const g = function () {};`,
    },
    {
      heading: { en: 'The precedence rule people miss', hi: 'Wo precedence rule jo log chhod dete hain' },
      body: {
        en: 'When a var and a function declaration share a name, the function wins during the first pass. But a later ASSIGNMENT still overwrites it at runtime, because assignments are not hoisted.',
        hi: 'Jab var aur function declaration ka naam ek ho, pehle chakkar mein function jeetta hai. Par baad ka ASSIGNMENT runtime pe usse phir bhi badal deta hai, kyunki assignments hoist nahi hote.',
      },
      code: `console.log(typeof a);   // 'function' — the declaration won
var a = 1;
function a() {}
console.log(typeof a);   // 'number' — the assignment ran`,
    },
    {
      heading: { en: 'How to make it a non-issue', hi: 'Isse ek gair-masla kaise banayein' },
      body: {
        en: 'Use const by default and let when you reassign, declare things before you use them, and never write var. Then hoisting stops being something you have to reason about, and the TDZ turns any remaining mistake into an immediate, clear error.',
        hi: 'Default const rakho aur reassign karo toh let, cheezein use karne se pehle declare karo, aur var kabhi mat likho. Phir hoisting ke baare mein sochna hi nahi padta, aur TDZ bachi hui har galti ko turant, saaf error bana deta hai.',
      },
    },
  ],

  'What is function currying in JavaScript?': [
    {
      heading: { en: 'One function of N arguments becomes N functions of one', hi: 'N arguments ka ek function, ek argument ke N functions ban jaata hai' },
      body: {
        en: 'Currying rewrites f(a, b, c) as f(a)(b)(c). Each call takes exactly one argument and returns a function waiting for the next, until the last one has everything and computes the answer.',
        hi: 'Currying f(a, b, c) ko f(a)(b)(c) mein badal deta hai. Har call theek ek argument leta hai aur ek function return karta hai jo agle ka intezaar kar raha hai, jab tak aakhri ke paas sab kuch aa jaaye aur jawab nikal aaye.',
      },
      code: `// normal
const add = (a, b, c) => a + b + c;
add(1, 2, 3);        // 6

// curried
const cAdd = (a) => (b) => (c) => a + b + c;
cAdd(1)(2)(3);       // 6`,
    },
    {
      heading: { en: 'Closures are what make it work', hi: 'Ise chalata closures hain' },
      body: {
        en: 'Each returned function closes over the arguments collected so far. There is no hidden machinery — a is simply still in scope when the innermost function finally runs. Currying is an application of closures, nothing more.',
        hi: 'Har return kiya gaya function ab tak jama arguments pe close karta hai. Koi chhupi machinery nahi — jab sabse andar wala function aakhir mein chalta hai, tab a bas abhi bhi scope mein hai. Currying closures ka ek istemaal hai, bas.',
      },
      diagram: `cAdd(1)  → fn closing over { a: 1 }
     (2)  → fn closing over { a: 1, b: 2 }
     (3)  → has everything → returns 6`,
    },
    {
      heading: { en: 'Currying is not partial application', hi: 'Currying partial application nahi hai' },
      body: {
        en: 'Interviewers like this distinction. Currying always produces a chain of single-argument functions. Partial application fixes some arguments and leaves a function that takes ALL the rest at once. bind does partial application, not currying.',
        hi: 'Interviewers ko ye farq pasand hai. Currying hamesha ek-argument wale functions ki chain banati hai. Partial application kuch arguments tay kar deta hai aur aisa function chhodta hai jo BAAKI SAB ek saath leta hai. bind partial application karta hai, currying nahi.',
      },
      code: `// currying — one at a time
f(1)(2)(3);

// partial application — the rest together
const g = f.bind(null, 1);
g(2, 3);`,
    },
    {
      heading: { en: 'Why it is useful: configure once, reuse often', hi: 'Ye kaam ka kyun hai: ek baar configure, baar-baar use' },
      body: {
        en: 'A curried function lets you lock in the arguments you know now and hand the result around as a specialised, single-purpose function. It removes the repetition of passing the same value at every call site.',
        hi: 'Curried function tumhe abhi maloom arguments lock karne deta hai aur result ko ek khaas, ek-kaam wale function ki tarah ghumane deta hai. Har call jagah pe wahi value pass karne ki repetition khatam ho jaati hai.',
      },
      code: `const log = (level) => (module) => (msg) =>
  console.log('[' + level + '] ' + module + ': ' + msg);

const authError = log('error')('auth');
authError('token expired');
authError('bad password');   // level and module never repeated`,
    },
    {
      heading: { en: 'It makes functions compose cleanly', hi: 'Isse functions saaf tareeke se judte hain' },
      body: {
        en: 'map, filter and reduce all want a function of one argument. A curried helper fits directly, with no wrapper arrow in between. That is the real reason functional libraries curry everything.',
        hi: 'map, filter aur reduce sabko ek argument wala function chahiye. Curried helper seedha fit ho jaata hai, beech mein koi wrapper arrow nahi. Functional libraries sab kuch curry isiliye karti hain.',
      },
      code: `const prop = (key) => (obj) => obj[key];
const gt   = (n)   => (x)   => x > n;

users.map(prop('name'));
scores.filter(gt(50));
// no  (u) => u.name  wrappers needed`,
    },
    {
      heading: { en: 'A generic curry — the classic interview task', hi: 'Ek generic curry — classic interview task' },
      body: {
        en: 'Being asked to write curry() is common. The trick is fn.length, which reports how many parameters the function declares. Collect arguments until you have enough, then call through.',
        hi: 'curry() likhne ko kaha jaana aam hai. Chaal fn.length hai, jo batata hai function ne kitne parameters declare kiye hain. Arguments jama karte raho jab tak kaafi na ho jaayein, phir call kar do.',
      },
      code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...rest) => curried.apply(this, [...args, ...rest]);
  };
}

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);     // 6
add(1, 2)(3);     // 6  ← flexible grouping
add(1)(2, 3);     // 6`,
    },
    {
      heading: { en: 'The limits worth mentioning', hi: 'Zikr karne laayak seemayein' },
      body: {
        en: 'fn.length ignores default and rest parameters, so curry breaks on those — you must pass the arity explicitly. Each stage allocates a closure, so it is measurably slower in hot loops. And a long chain of parentheses is harder to debug than one call. Use it where it clarifies, not everywhere.',
        hi: 'fn.length default aur rest parameters ko nahi ginta, toh curry unpe toot jaata hai — arity khud batani padti hai. Har stage ek closure banata hai, toh hot loops mein ye naapne laayak dheema hai. Aur brackets ki lambi chain ek call se debug karna mushkil hai. Wahan use karo jahan baat saaf ho, har jagah nahi.',
      },
      code: `((a, b = 1) => a + b).length;   // 1 ✗ not 2
((...args) => args).length;      // 0 ✗`,
    },
  ],

  'What is memoization in JavaScript?': [
    {
      heading: { en: 'Trade memory for time', hi: 'Memory do, samay lo' },
      body: {
        en: 'Memoisation caches a function\'s result against its arguments. Call it again with the same input and you return the stored answer instead of recomputing. It is worth doing only when the function is expensive AND gets called repeatedly with repeating inputs.',
        hi: 'Memoisation function ka result uske arguments ke saath cache kar leta hai. Wahi input dobara aaye toh dobara calculate karne ki jagah rakha hua jawab wapas kar do. Ye tabhi karna chahiye jab function mehnga ho AUR wahi inputs baar-baar aayein.',
      },
      diagram: `first call   f(5) → compute (slow) → store 5:120 → 120
second call  f(5) → found in cache          → 120  (instant)`,
    },
    {
      heading: { en: 'The one hard requirement: purity', hi: 'Ek zaroori shart: purity' },
      body: {
        en: 'The function must be pure — same input always gives the same output, and it must not have side effects. Memoise something that reads a database, the clock or a mutable global, and you will serve stale answers forever. This is the mistake that actually causes bugs.',
        hi: 'Function pure hona chahiye — wahi input hamesha wahi output de, aur koi side effect na ho. Kisi aise cheez ko memoise karo jo database, ghadi ya badalte global ko padhti ho, aur tum hamesha purane jawab dete rahoge. Bugs asal mein isi galti se aate hain.',
      },
      code: `const pure   = (n) => n * 2;              // ✓ safe to memoise
const impure = (n) => n * Math.random();  // ✗ never
const alsoBad = (id) => db.find(id);      // ✗ data changes`,
    },
    {
      heading: { en: 'The minimal implementation', hi: 'Sabse chhota implementation' },
      body: {
        en: 'A closure holding a cache, plus a key derived from the arguments. Use a Map rather than a plain object so numeric keys stay numeric and there are no inherited keys to collide with.',
        hi: 'Ek closure jisme cache ho, aur arguments se bani ek key. Plain object ki jagah Map use karo taaki numeric keys numeric rahein aur inherited keys se takraav na ho.',
      },
      code: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`,
    },
    {
      heading: { en: 'The key is where it gets hard', hi: 'Mushkil key mein hai' },
      body: {
        en: 'JSON.stringify is the usual choice and it has real flaws: property order changes the key, it cannot handle functions or circular data, and it is slow enough that on a cheap function the key costs more than the work. For a single primitive argument, use the argument itself.',
        hi: 'JSON.stringify aam chunav hai aur usme asli kamiyan hain: property order key badal deta hai, functions ya circular data nahi sambhalta, aur itna dheema hai ki saste function pe key hi kaam se zyada kharch kar deti hai. Ek primitive argument ho toh usi ko key bana lo.',
      },
      code: `JSON.stringify([{a:1, b:2}]);   // '[{"a":1,"b":2}]'
JSON.stringify([{b:2, a:1}]);   // '[{"b":2,"a":1}]'  ← different key,
                                //   same logical input

// single primitive arg — much faster:
const memo1 = (fn) => { const c = new Map();
  return (x) => c.has(x) ? c.get(x) : (c.set(x, fn(x)), c.get(x)); };`,
    },
    {
      heading: { en: 'The textbook win: recursive fibonacci', hi: 'Kitaabi jeet: recursive fibonacci' },
      body: {
        en: 'Naive fib recomputes the same subproblems exponentially — fib(40) makes over a billion calls. Memoising collapses it to linear, because each n is computed exactly once. This is dynamic programming in two lines.',
        hi: 'Saada fib wahi subproblems exponentially dobara calculate karta hai — fib(40) ek arab se zyada calls karta hai. Memoise karo toh ye linear ho jaata hai, kyunki har n theek ek baar banta hai. Ye do line mein dynamic programming hai.',
      },
      code: `const fib = memoize((n) => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
fib(40);    // instant

// Note: fib must call the MEMOISED version, not an inner original,
// or the recursion never touches the cache.`,
    },
    {
      heading: { en: 'Cache growth is the thing people forget', hi: 'Cache ka badhna wahi hai jo log bhool jaate hain' },
      body: {
        en: 'A plain memo cache never shrinks. Memoise a function called with thousands of distinct inputs and you have built a memory leak. Real implementations add a size cap with LRU eviction, or key on objects with a WeakMap so entries vanish with their keys.',
        hi: 'Saada memo cache kabhi chhota nahi hota. Hazaaron alag inputs wale function ko memoise karo aur tumne ek memory leak bana diya. Asli implementations size ki seema aur LRU eviction jodte hain, ya WeakMap se objects pe key karte hain taaki entries apni keys ke saath gaayab ho jaayein.',
      },
      code: `// object arguments → WeakMap, and the cache self-cleans
const cache = new WeakMap();
const analyse = (node) =>
  cache.get(node) ?? (cache.set(node, compute(node)), cache.get(node));`,
    },
    {
      heading: { en: 'Where you meet it in frameworks', hi: 'Frameworks mein ye kahan milta hai' },
      body: {
        en: 'React.memo skips a re-render when props are shallow-equal; useMemo caches a computed value between renders; useCallback caches a function identity. Reselect memoises derived state. They are all this idea, specialised.',
        hi: 'React.memo props shallow-equal hon toh re-render chhod deta hai; useMemo renders ke beech computed value cache karta hai; useCallback function ki identity cache karta hai. Reselect derived state memoise karta hai. Ye sab yahi idea hai, khaas roop mein.',
      },
    },
    {
      heading: { en: 'Do not memoise by reflex', hi: 'Aadat se memoise mat karo' },
      body: {
        en: 'Every memoised call pays for key construction and a cache lookup. On a cheap function, or one whose inputs rarely repeat, that is pure overhead plus memory. Measure first — an unnecessary useMemo is slower than no useMemo.',
        hi: 'Har memoised call key banane aur cache lookup ki keemat deta hai. Saste function pe, ya jiske inputs kam hi dohraate hon, ye sirf overhead aur memory hai. Pehle naapo — bekaar ka useMemo bina useMemo se dheema hai.',
      },
    },
  ],

  'What is MutationObserver in JavaScript?': [
    {
      heading: { en: 'A way to be told when the DOM changes', hi: 'DOM badalne pe khabar paane ka tareeka' },
      body: {
        en: 'MutationObserver watches a DOM node and calls you back when its children, attributes or text change. Before it existed you either polled with setInterval or used the deprecated mutation events, which fired synchronously on every change and destroyed performance.',
        hi: 'MutationObserver ek DOM node pe nazar rakhta hai aur uske children, attributes ya text badalne pe tumhe callback deta hai. Iske aane se pehle ya toh setInterval se polling hoti thi ya deprecated mutation events use hote the, jo har badlaav pe synchronously chalte the aur performance kharaab kar dete the.',
      },
      code: `const observer = new MutationObserver((mutations) => {
  for (const m of mutations) console.log(m.type, m.target);
});

observer.observe(el, { childList: true, subtree: true });
observer.disconnect();   // always stop when done`,
    },
    {
      heading: { en: 'You must ask for what you want to see', hi: 'Jo dekhna hai wo maangna padta hai' },
      body: {
        en: 'The options object is not optional in spirit — observe throws if you do not enable at least one of childList, attributes or characterData. subtree extends whichever you enabled to all descendants, and the oldValue flags let you see what a value was before it changed.',
        hi: 'Options object bhaav se optional nahi hai — agar childList, attributes ya characterData mein se ek bhi chaalu na karo toh observe error deta hai. subtree jo chaalu kiya usse saare descendants tak badha deta hai, aur oldValue flags se badalne se pehle ki value dikhti hai.',
      },
      diagram: `childList          children added or removed
attributes         an attribute changed
characterData      text content changed
subtree            …and apply all of the above to descendants
attributeOldValue  include the previous attribute value
attributeFilter    only these attribute names`,
    },
    {
      heading: { en: 'Callbacks are batched, and asynchronous', hi: 'Callbacks batch hote hain, aur asynchronous hain' },
      body: {
        en: 'This is the design that makes it fast. Changes are collected and delivered once as an array, as a MICROTASK after the current script finishes. So ten appends in a loop produce one callback, not ten — and your callback never runs in the middle of someone else\'s DOM work.',
        hi: 'Yahi design isse tez banata hai. Badlaav jama hote hain aur ek array ke roop mein ek baar diye jaate hain, maujooda script khatam hone ke baad MICROTASK ki tarah. Toh loop mein das appends ek callback dete hain, das nahi — aur tumhara callback kisi aur ke DOM kaam ke beech mein kabhi nahi chalta.',
      },
      code: `for (let i = 0; i < 10; i++) list.append(document.createElement('li'));
// → ONE callback, with a records array describing all ten`,
    },
    {
      heading: { en: 'Reading a MutationRecord', hi: 'MutationRecord padhna' },
      body: {
        en: 'Each record tells you the type, the target node, and for childList the addedNodes and removedNodes lists. For attributes you get attributeName and, if you asked, oldValue. Note that addedNodes is a NodeList, so convert it before using array methods.',
        hi: 'Har record type, target node, aur childList ke liye addedNodes aur removedNodes lists batata hai. attributes ke liye attributeName milta hai aur, maanga ho toh, oldValue. Dhyaan do addedNodes ek NodeList hai, toh array methods se pehle convert karo.',
      },
      code: `new MutationObserver((records) => {
  for (const r of records) {
    if (r.type === 'childList') {
      [...r.addedNodes].forEach(init);
      [...r.removedNodes].forEach(cleanup);
    }
    if (r.type === 'attributes') console.log(r.attributeName, r.oldValue);
  }
}).observe(root, { childList: true, subtree: true,
                   attributes: true, attributeOldValue: true });`,
    },
    {
      heading: { en: 'The infinite loop it is easy to write', hi: 'Wo anant loop jo likhna aasaan hai' },
      body: {
        en: 'If your callback modifies the DOM inside the observed subtree, that modification queues another callback, which modifies again. Guard it: disconnect before you write and re-observe after, or use takeRecords to drain the pending queue.',
        hi: 'Agar tumhara callback observed subtree ke andar DOM badalta hai, toh wo badlaav ek aur callback queue karta hai, jo phir badalta hai. Isse rok lo: likhne se pehle disconnect karo aur baad mein dobara observe, ya takeRecords se pending queue khaali kar do.',
      },
      code: `const ob = new MutationObserver(() => {
  ob.disconnect();
  el.setAttribute('data-x', '1');   // safe now
  ob.takeRecords();                 // drop what we just caused
  ob.observe(el, { attributes: true });
});`,
    },
    {
      heading: { en: 'Real uses', hi: 'Asli upyog' },
      body: {
        en: 'Enhancing content injected by code you do not control — a third-party widget, a CMS, a chat embed. Auto-initialising components on nodes added later. Browser extensions reacting to a page they did not write. Detecting when an element you are waiting for finally appears.',
        hi: 'Aise content ko behtar banana jo tumhare control ke bahar ke code ne daala — third-party widget, CMS, chat embed. Baad mein aaye nodes pe components apne aap chaalu karna. Browser extensions jo aisi page pe react karte hain jo unhone nahi likhi. Ya jis element ka intezaar hai wo aakhir kab aaya, ye pata karna.',
      },
      code: `function waitFor(selector) {
  return new Promise((resolve) => {
    const found = document.querySelector(selector);
    if (found) return resolve(found);
    const ob = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) { ob.disconnect(); resolve(el); }
    });
    ob.observe(document.body, { childList: true, subtree: true });
  });
}`,
    },
    {
      heading: { en: 'Pick the right observer', hi: 'Sahi observer chuno' },
      body: {
        en: 'MutationObserver is often the wrong tool. Use IntersectionObserver for visibility and lazy loading, ResizeObserver for size changes, and plain events for anything your own code triggers. Reach for MutationObserver only when you genuinely cannot hook the code that makes the change.',
        hi: 'MutationObserver aksar galat auzaar hota hai. Dikhne aur lazy loading ke liye IntersectionObserver, size badalne ke liye ResizeObserver, aur jo tumhara apna code karta hai uske liye saade events. MutationObserver tabhi uthao jab tum sach mein badlaav karne wale code tak pahunch hi na sako.',
      },
    },
  ],

  'Write a program to find the occurrence count of elements in an array.': [
    {
      heading: { en: 'What the answer must be', hi: 'Jawab kya hona chahiye' },
      body: {
        en: 'A map from each distinct value to how many times it appears. One pass over the array is enough, so the target is O(n) time and O(k) space where k is the number of distinct values.',
        hi: 'Har alag value se ye map ki wo kitni baar aayi. Array pe ek chakkar kaafi hai, toh target O(n) time aur O(k) space hai jahan k alag values ki ginti hai.',
      },
      code: `['a','b','a','c','b','a']
// → { a: 3, b: 2, c: 1 }`,
    },
    {
      heading: { en: 'The reduce one-liner', hi: 'Reduce wali ek line' },
      body: {
        en: 'This is the version most interviewers expect. The accumulator is the counts object; for each item, bump its entry or start it at one. The ||= form reads cleanly and avoids the undefined case.',
        hi: 'Yahi version zyadatar interviewers chahte hain. Accumulator counts ka object hai; har item pe uski entry badhao ya ek se shuru karo. ||= wala roop saaf padha jaata hai aur undefined wala case bacha leta hai.',
      },
      code: `const counts = arr.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});`,
    },
    {
      heading: { en: 'Why a Map is the better answer', hi: 'Map behtar jawab kyun hai' },
      body: {
        en: 'A plain object coerces every key to a string, so the number 1 and the string "1" collide, and an item literally called "constructor" can collide with an inherited key. A Map keeps key types intact and has no prototype. Say this out loud — it is what separates a good answer from a correct one.',
        hi: 'Plain object har key ko string bana deta hai, toh number 1 aur string "1" takra jaate hain, aur "constructor" naam ka item inherited key se takra sakta hai. Map key ke types waise ke waise rakhta hai aur uska prototype hi nahi hota. Ye bol kar batao — yahi achhe jawab ko sahi jawab se alag karta hai.',
      },
      code: `const counts = new Map();
for (const item of arr) counts.set(item, (counts.get(item) ?? 0) + 1);

// the collision a plain object has:
const bad = {};
[1, '1'].forEach((x) => (bad[x] = (bad[x] || 0) + 1));
bad;          // { '1': 2 }  ✗ two different values merged`,
    },
    {
      heading: { en: 'Counting objects by a field', hi: 'Kisi field se objects ginna' },
      body: {
        en: 'The realistic version of this question. Two identical-looking objects are different keys, so you must count by some property. Object.groupBy is the modern built-in if the environment has it.',
        hi: 'Is sawaal ka asli roop. Dikhne mein same do objects alag keys hain, toh kisi property se ginna padega. Agar environment mein ho toh Object.groupBy modern built-in hai.',
      },
      code: `const byRole = users.reduce((a, u) => {
  a[u.role] = (a[u.role] || 0) + 1;
  return a;
}, {});

// modern:
Object.groupBy(users, (u) => u.role);   // groups, not counts`,
    },
    {
      heading: { en: 'The follow-ups to be ready for', hi: 'Jin follow-ups ke liye taiyaar raho' },
      body: {
        en: 'Most frequent element, elements appearing more than once, and the first non-repeating character are all built on the same count map. Know that the second pass is what finds the answer — the counting itself is the easy half.',
        hi: 'Sabse zyada aane wala element, ek se zyada baar aane wale elements, aur pehla na-dohraaya jaane wala character — sab isi count map pe bane hain. Yaad rakho jawab doosra chakkar nikalta hai — ginna aasaan hissa hai.',
      },
      code: `// most frequent
[...counts.entries()].reduce((a, b) => (b[1] > a[1] ? b : a))[0];

// duplicates only
[...counts].filter(([, n]) => n > 1).map(([v]) => v);

// first non-repeating character
[...str].find((ch) => counts.get(ch) === 1);`,
    },
  ],

  'Write a program to remove duplicates from an array.': [
    {
      heading: { en: 'The answer they want first', hi: 'Jo jawab wo pehle chahte hain' },
      body: {
        en: 'Spread a Set. A Set stores only distinct values and preserves insertion order, so one line gives you a deduplicated array in O(n). Anything longer needs a reason.',
        hi: 'Set ko spread kar do. Set sirf alag values rakhta hai aur insertion order bachaata hai, toh ek line O(n) mein deduplicated array de deti hai. Isse lamba kuch bhi ho toh wajah honi chahiye.',
      },
      code: `const unique = [...new Set(arr)];
// or
const unique = Array.from(new Set(arr));`,
    },
    {
      heading: { en: 'Know why the alternatives are worse', hi: 'Jaano baaki tareeke kyun kharaab hain' },
      body: {
        en: 'filter with indexOf and filter with includes both scan the array again for every element, so they are O(n²). On a thousand items you will not notice; on a hundred thousand it is seconds. Mention the complexity — that is the point of the question.',
        hi: 'filter with indexOf aur filter with includes dono har element ke liye array dobara scan karte hain, toh ye O(n²) hain. Hazaar items pe pata nahi chalega; ek laakh pe seconds lagenge. Complexity ka zikr karo — sawaal ka maqsad wahi hai.',
      },
      code: `arr.filter((v, i) => arr.indexOf(v) === i);   // O(n²)
[...new Set(arr)];                            // O(n) ✓`,
    },
    {
      heading: { en: 'Set equality has two quirks', hi: 'Set ki barabari mein do ajeeb baatein' },
      body: {
        en: 'Set uses SameValueZero: NaN equals itself, so duplicate NaNs collapse — unlike ===. And 0 and -0 are treated as the same value. Both differ from what a naive indexOf loop would do.',
        hi: 'Set SameValueZero use karta hai: NaN khud ke barabar hai, toh dohre NaN mil jaate hain — === ke ulat. Aur 0 aur -0 ek hi value maane jaate hain. Dono cheezein saade indexOf loop se alag hain.',
      },
      code: `[...new Set([NaN, NaN])];        // [NaN]     ✓ deduped
[NaN, NaN].filter((v,i,a) => a.indexOf(v) === i);  // [NaN, NaN] ✗

[...new Set([0, -0])];           // [0]`,
    },
    {
      heading: { en: 'Objects are the real question', hi: 'Asli sawaal objects ka hai' },
      body: {
        en: 'A Set compares objects by reference, so two identical-looking objects both survive. To dedupe by content you need a key: pick an id if there is one, or serialise. A Map keyed on that id is the cleanest form and keeps the first — or last — occurrence, whichever you want.',
        hi: 'Set objects ko reference se compare karta hai, toh dikhne mein same do objects dono bach jaate hain. Content se dedupe karna ho toh key chahiye: id ho toh wahi lo, ya serialise karo. Us id pe key kiya hua Map sabse saaf roop hai aur pehla — ya aakhri — jo chaho wo rakh leta hai.',
      },
      code: `[...new Set([{id:1}, {id:1}])].length;   // 2 ✗ different references

// keep the LAST of each id
[...new Map(users.map((u) => [u.id, u])).values()];

// keep the FIRST of each id
const seen = new Set();
users.filter((u) => !seen.has(u.id) && seen.add(u.id));`,
    },
    {
      heading: { en: 'Deduping by a computed key', hi: 'Kisi bane hue key se dedupe karna' },
      body: {
        en: 'The general helper: build a Set of keys as you go and keep an item the first time its key appears. This is what you write when the uniqueness rule is "same name and same city", not just an id.',
        hi: 'General helper: chalte-chalte keys ka Set banao aur item tab rakho jab uski key pehli baar aaye. Ye tab likhte ho jab uniqueness ka rule "same naam aur same city" ho, sirf id nahi.',
      },
      code: `const uniqueBy = (arr, keyFn) => {
  const seen = new Set();
  return arr.filter((item) => {
    const k = keyFn(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

uniqueBy(users, (u) => u.name + '|' + u.city);`,
    },
  ],

  'What will be the output when using let vs var inside setTimeout in a loop?': [
    {
      heading: { en: 'The two outputs', hi: 'Dono outputs' },
      body: {
        en: 'With var you get 3, 3, 3. With let you get 0, 1, 2. This is the most asked closure question in JavaScript interviews, and the explanation matters more than the answer.',
        hi: 'var se 3, 3, 3 milta hai. let se 0, 1, 2. JavaScript interviews ka sabse zyada poocha jaane wala closure question yahi hai, aur jawab se zyada wajah maayne rakhti hai.',
      },
      code: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));
// 3 3 3

for (let j = 0; j < 3; j++) setTimeout(() => console.log(j));
// 0 1 2`,
    },
    {
      heading: { en: 'Why var gives 3, 3, 3', hi: 'var 3, 3, 3 kyun deta hai' },
      body: {
        en: 'Two facts combine. var is function-scoped, so there is exactly ONE i for the whole loop, and all three arrow functions close over that same binding. And the callbacks are macrotasks, so none of them runs until the loop has finished — by which time the single i is 3.',
        hi: 'Do baatein milti hain. var function-scoped hai, toh poore loop ke liye bilkul EK i hai, aur teeno arrow functions usi ek binding pe close karte hain. Aur callbacks macrotasks hain, toh koi bhi loop khatam hone se pehle nahi chalta — aur tab tak wo ek i 3 ho chuki hai.',
      },
      diagram: `one binding, three closures

  cb1 ──┐
  cb2 ──┼──► [ i ]   loop ends, i = 3
  cb3 ──┘

  then all three run and read 3`,
    },
    {
      heading: { en: 'Why let gives 0, 1, 2', hi: 'let 0, 1, 2 kyun deta hai' },
      body: {
        en: 'The specification gives a let loop variable a FRESH binding for each iteration, and copies the value forward at the end of each pass. So there are three separate js, and each callback captured a different one.',
        hi: 'Specification let wale loop variable ko har iteration ke liye NAYI binding deti hai, aur har chakkar ke aakhir mein value aage copy kar deti hai. Toh teen alag j hain, aur har callback ne alag pakda.',
      },
      diagram: `three bindings, three closures

  cb1 ──► [ j = 0 ]
  cb2 ──► [ j = 1 ]
  cb3 ──► [ j = 2 ]`,
    },
    {
      heading: { en: 'Timing is the other half', hi: 'Doosra hissa timing hai' },
      body: {
        en: 'Even with a zero delay, every callback is a macrotask and waits for the call stack to empty. The whole loop is synchronous and finishes first. So the answer is not "the timer was too slow" — it is that async callbacks always run after the current script completes.',
        hi: 'Zero delay ke saath bhi har callback ek macrotask hai aur call stack khaali hone ka intezaar karta hai. Poora loop synchronous hai aur pehle khatam hota hai. Toh jawab "timer dheema tha" nahi hai — baat ye hai ki async callbacks hamesha maujooda script ke baad hi chalte hain.',
      },
      code: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);
console.log('loop done');
// loop done
// 3 3 3`,
    },
    {
      heading: { en: 'Fixing it without let', hi: 'let ke bina theek karna' },
      body: {
        en: 'The pre-ES6 fix was an IIFE that created a new scope per iteration and captured the value as a parameter. setTimeout\'s third argument also works, since extra arguments are passed on to the callback.',
        hi: 'ES6 se pehle ka ilaaj ek IIFE tha jo har iteration mein naya scope banata tha aur value ko parameter ki tarah pakad leta tha. setTimeout ka teesra argument bhi chalta hai, kyunki extra arguments callback ko aage bhej diye jaate hain.',
      },
      code: `for (var i = 0; i < 3; i++) {
  (function (n) { setTimeout(() => console.log(n)); })(i);
}                                    // 0 1 2

for (var i = 0; i < 3; i++) setTimeout(console.log, 0, i);
                                     // 0 1 2`,
    },
    {
      heading: { en: 'The follow-up: for...of and forEach', hi: 'Follow-up: for...of aur forEach' },
      body: {
        en: 'Both give 0, 1, 2 even with var-like habits, because each iteration of for...of creates a new binding and forEach calls a real function per element, so every callback gets its own parameter scope. Expect to be asked why.',
        hi: 'Dono 0, 1, 2 dete hain, kyunki for...of ka har iteration nayi binding banata hai aur forEach har element pe asli function call karta hai, toh har callback ko apna parameter scope milta hai. Kyun, ye poocha jaayega.',
      },
      code: `[0,1,2].forEach((n) => setTimeout(() => console.log(n)));   // 0 1 2

// and the classic variant — this one prints 3 3 3 too:
for (var i = 0; i < 3; i++) { setTimeout(function () { console.log(i); }); }`,
    },
  ],

  'Write a polyfill for Array.prototype.map.': [
    {
      heading: { en: 'Write down the contract first', hi: 'Pehle contract likho' },
      body: {
        en: 'Before typing, state what map guarantees: it returns a NEW array of the same length, does not mutate the original, calls the callback with (element, index, array), accepts an optional thisArg, and SKIPS holes in sparse arrays while keeping them in the result.',
        hi: 'Type karne se pehle batao map kya guarantee karta hai: wo usi length ka NAYA array deta hai, original ko badalta nahi, callback ko (element, index, array) ke saath bulata hai, ek optional thisArg leta hai, aur sparse arrays ke holes CHHOD deta hai par result mein unhe rakhta hai.',
      },
    },
    {
      heading: { en: 'The version that gets you most of the marks', hi: 'Wo version jo zyadatar number dila deta hai' },
      body: {
        en: 'Attach to the prototype, use this as the array, build a result, and call back with all three arguments. Getting the third argument and thisArg right is what distinguishes a real answer from a sketch.',
        hi: 'Prototype pe lagao, this ko array maano, ek result banao, aur callback ko teeno arguments do. Teesra argument aur thisArg sahi karna hi asli jawab ko khaake se alag karta hai.',
      },
      code: `Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const arr = Object(this);
  const len = arr.length >>> 0;          // ToUint32, as the spec says
  const out = new Array(len);

  for (let i = 0; i < len; i++) {
    if (i in arr) {                      // skip holes
      out[i] = callback.call(thisArg, arr[i], i, arr);
    }
  }
  return out;
};`,
    },
    {
      heading: { en: 'Why i in arr matters', hi: 'i in arr kyun zaroori hai' },
      body: {
        en: 'A sparse array has index positions that do not exist, not positions holding undefined. The real map does not invoke the callback for them, and leaves the hole in the output. Checking i in arr is the only way to tell a hole from a stored undefined.',
        hi: 'Sparse array mein kuch index positions hoti hi nahi, wahan undefined rakha hua nahi hota. Asli map unpe callback nahi chalata, aur output mein hole chhod deta hai. Hole aur rakhi hui undefined mein farq batane ka ek hi tareeka i in arr hai.',
      },
      code: `const a = [1, , 3];      // index 1 is a hole
a.map((x) => x * 2);     // [2, <hole>, 6] — callback ran twice

1 in a;                  // false — the hole
1 in [1, undefined, 3];  // true  — a stored undefined`,
    },
    {
      heading: { en: 'Why length >>> 0', hi: 'length >>> 0 kyun' },
      body: {
        en: 'The spec converts length with ToUint32. The unsigned right shift does exactly that in one operator: it turns undefined or a non-number into 0, and clamps negatives. It matters because map can be called on array-like objects, not just real arrays.',
        hi: 'Spec length ko ToUint32 se convert karta hai. Unsigned right shift ek hi operator mein wahi karta hai: undefined ya non-number ko 0 bana deta hai, aur negatives ko clamp karta hai. Ye isliye maayne rakhta hai kyunki map array-like objects pe bhi call ho sakta hai, sirf asli arrays pe nahi.',
      },
      code: `Array.prototype.myMap.call(
  { 0: 'a', 1: 'b', length: 2 },
  (x) => x.toUpperCase()
);   // ['A', 'B'] — array-like works`,
    },
    {
      heading: { en: 'The subtleties an interviewer may probe', hi: 'Wo bareekiyan jo interviewer kured sakta hai' },
      body: {
        en: 'length is read ONCE before the loop, so elements appended during iteration are never visited. Elements changed before they are reached ARE seen with their new value. And deleted elements become holes and get skipped.',
        hi: 'length loop se pehle EK BAAR padhi jaati hai, toh iteration ke dauraan jode gaye elements kabhi nahi dekhe jaate. Jo elements pahunchne se pehle badle jaayein wo NAYI value ke saath dikhte hain. Aur delete kiye gaye elements hole ban jaate hain aur chhod diye jaate hain.',
      },
      code: `const a = [1, 2, 3];
a.map((x, i) => { if (i === 0) a.push(4); return x; });
// [1, 2, 3] — the appended 4 is never mapped`,
    },
    {
      heading: { en: 'Define it properly if asked', hi: 'Poochha jaaye toh theek se define karo' },
      body: {
        en: 'A plain assignment makes the method enumerable, so it shows up in for...in over any array — a genuine bug. Real polyfills use defineProperty and guard against overwriting a native implementation.',
        hi: 'Saada assignment method ko enumerable bana deta hai, toh wo kisi bhi array ke for...in mein dikhne lagta hai — asli bug. Asli polyfills defineProperty use karte hain aur native implementation ko badalne se bachte hain.',
      },
      code: `if (!Array.prototype.myMap) {
  Object.defineProperty(Array.prototype, 'myMap', {
    value: fn, writable: true, configurable: true, enumerable: false,
  });
}`,
    },
  ],

  'Write a polyfill for Array.prototype.filter.': [
    {
      heading: { en: 'The contract', hi: 'Contract' },
      body: {
        en: 'filter returns a NEW array containing only the elements for which the callback returned a truthy value. Length is smaller or equal, the original is untouched, the callback gets (element, index, array) plus an optional thisArg, and holes are skipped.',
        hi: 'filter ek NAYA array deta hai jisme sirf wo elements hain jinpe callback ne truthy value di. Length chhoti ya barabar hoti hai, original nahi badalta, callback ko (element, index, array) aur optional thisArg milta hai, aur holes chhod diye jaate hain.',
      },
    },
    {
      heading: { en: 'The implementation', hi: 'Implementation' },
      body: {
        en: 'Almost identical to map, with two differences: the result is built with push rather than by index, because output positions do not line up with input positions, and the callback\'s return value is tested for truthiness rather than stored.',
        hi: 'Lagbhag map jaisa, do farq ke saath: result index se nahi, push se banta hai, kyunki output ki jagah input ki jagah se nahi milti, aur callback ki return value store hone ki jagah truthiness ke liye jaanchi jaati hai.',
      },
      code: `Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const arr = Object(this);
  const len = arr.length >>> 0;
  const out = [];

  for (let i = 0; i < len; i++) {
    if (i in arr) {
      const value = arr[i];                       // read once
      if (callback.call(thisArg, value, i, arr)) out.push(value);
    }
  }
  return out;
};`,
    },
    {
      heading: { en: 'Truthy, not strictly true', hi: 'Truthy, bilkul true nahi' },
      body: {
        en: 'The test is a ToBoolean conversion, so returning a non-empty string or any object keeps the element. Never write callback(...) === true; that would reject perfectly valid truthy returns.',
        hi: 'Test ek ToBoolean conversion hai, toh non-empty string ya koi bhi object return karo toh element ruk jaata hai. callback(...) === true kabhi mat likho; wo bilkul sahi truthy returns ko bhi nikaal dega.',
      },
      code: `[1, 2, 3].filter((n) => n % 2);   // [1, 3] — 1 is truthy, 0 is falsy
['a', '', 'b'].filter(Boolean);   // ['a', 'b']`,
    },
    {
      heading: { en: 'The result is not a copy of the items', hi: 'Result items ki copy nahi hai' },
      body: {
        en: 'The array is new, but for objects the surviving elements are the SAME references. Mutating one still affects the original array\'s element. filter gives you a shallow subset, never a clone.',
        hi: 'Array naya hai, par objects ke liye bache hue elements WAHI references hain. Ek ko mutate karo toh original array ke element pe bhi asar hota hai. filter shallow subset deta hai, clone kabhi nahi.',
      },
      code: `const out = users.filter((u) => u.active);
out[0].name = 'X';
users.find((u) => u.active).name;   // 'X' — same object`,
    },
    {
      heading: { en: 'Building filter out of reduce', hi: 'Reduce se filter banana' },
      body: {
        en: 'A common follow-up. It shows you understand that reduce is the general fold and the other two are special cases of it. Worth being able to write both directions on the spot.',
        hi: 'Ek aam follow-up. Isse dikhta hai ki tum samajhte ho reduce general fold hai aur baaki do uske khaas roop hain. Dono taraf turant likh paana kaam ka hai.',
      },
      code: `const myFilter = (arr, fn) =>
  arr.reduce((out, v, i, a) => (fn(v, i, a) ? [...out, v] : out), []);

// note: [...out, v] is O(n²). push into a preallocated array in real code.`,
    },
  ],

  'Write a polyfill for Array.prototype.reduce.': [
    {
      heading: { en: 'This one has real edge cases', hi: 'Isme asli edge cases hain' },
      body: {
        en: 'reduce is the hardest of the three to polyfill correctly, and that is exactly why it is asked. Two behaviours must be right: what happens when no initial value is given, and what happens on an empty array.',
        hi: 'Teeno mein sabse mushkil reduce hai theek se banana, aur isiliye ye poocha jaata hai. Do behaviours sahi hone chahiye: initial value na ho toh kya hota hai, aur khaali array pe kya hota hai.',
      },
      code: `[].reduce((a, b) => a + b);       // ✗ TypeError: Reduce of empty
                                  //   array with no initial value
[].reduce((a, b) => a + b, 0);    // ✓ 0`,
    },
    {
      heading: { en: 'The rule for a missing initial value', hi: 'Initial value na hone ka rule' },
      body: {
        en: 'If you omit it, reduce uses the FIRST existing element as the accumulator and starts iterating from the one after it — so the callback runs n-1 times, not n. If you supply one, the callback runs n times starting from index 0.',
        hi: 'Agar na do, toh reduce PEHLE maujood element ko accumulator bana leta hai aur uske agle se chalna shuru karta hai — toh callback n-1 baar chalta hai, n baar nahi. Agar do, toh callback index 0 se n baar chalta hai.',
      },
      diagram: `[10, 20, 30]

with 0:      0+10 → 10+20 → 30+30   3 calls
without:     10 is the seed
             10+20 → 30+30          2 calls`,
    },
    {
      heading: { en: 'The full implementation', hi: 'Poora implementation' },
      body: {
        en: 'Note the arguments.length check rather than testing initial for undefined — passing undefined explicitly IS supplying an initial value, and the two cases must behave differently. That detail is what interviewers look for.',
        hi: 'Dhyaan do initial ko undefined ke liye check karne ki jagah arguments.length dekha gaya hai — undefined explicitly dena bhi initial value dena HI hai, aur dono cases ka behaviour alag hona chahiye. Interviewers yahi bareeki dhoondhte hain.',
      },
      code: `Array.prototype.myReduce = function (callback, initial) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const arr = Object(this);
  const len = arr.length >>> 0;

  let i = 0;
  let acc;

  if (arguments.length >= 2) {
    acc = initial;
  } else {
    while (i < len && !(i in arr)) i++;          // find the first hole-free
    if (i >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    acc = arr[i++];
  }

  for (; i < len; i++) {
    if (i in arr) acc = callback(acc, arr[i], i, arr);
  }
  return acc;
};`,
    },
    {
      heading: { en: 'Four arguments, not two', hi: 'Chaar arguments, do nahi' },
      body: {
        en: 'The callback receives accumulator, current value, current index and the whole array. Most code uses the first two, but the polyfill must pass all four or you break any caller that uses the index.',
        hi: 'Callback ko accumulator, current value, current index aur poora array milta hai. Zyadatar code pehle do use karta hai, par polyfill ko chaaron dene hi hain warna index use karne wala har caller toot jaayega.',
      },
    },
    {
      heading: { en: 'reduceRight is the same, backwards', hi: 'reduceRight wahi hai, ulta' },
      body: {
        en: 'Start at len-1 and walk down. Worth knowing because it is the natural follow-up question, and because it matters for non-commutative operations like string concatenation or function composition.',
        hi: 'len-1 se shuru karo aur neeche chalo. Ye jaanna kaam ka hai kyunki yahi agla sawaal hota hai, aur string jodne ya function composition jaise non-commutative operations mein farq padta hai.',
      },
      code: `['a','b','c'].reduce((a, b) => a + b);        // 'abc'
['a','b','c'].reduceRight((a, b) => a + b);   // 'cba'`,
    },
    {
      heading: { en: 'Why reduce is the general one', hi: 'Reduce general kyun hai' },
      body: {
        en: 'Because the accumulator can be any type, map and filter are both special cases of reduce. Saying this shows you understand the shape of the operation rather than just its syntax.',
        hi: 'Accumulator kisi bhi type ka ho sakta hai, isliye map aur filter dono reduce ke khaas roop hain. Ye kehna dikhata hai ki tum operation ka dhaancha samajhte ho, sirf uska syntax nahi.',
      },
      code: `const map    = (a, f) => a.reduce((o, v, i) => (o.push(f(v, i)), o), []);
const filter = (a, f) => a.reduce((o, v, i) => (f(v, i) && o.push(v), o), []);`,
    },
  ],

  'Write a program to multiply two numbers without using the * operator.': [
    {
      heading: { en: 'The obvious answer, and its problem', hi: 'Saaf jawab, aur uski problem' },
      body: {
        en: 'Repeated addition: add a to itself b times. It is correct and it is what they expect first — but it is O(b), so multiplying by a million takes a million iterations. Say that out loud before they ask.',
        hi: 'Baar-baar jodna: a ko khud mein b baar jodo. Ye sahi hai aur wahi hai jo wo pehle chahte hain — par ye O(b) hai, toh das lakh se guna karne mein das lakh iterations lagenge. Poochhne se pehle khud bata do.',
      },
      code: `function multiply(a, b) {
  let result = 0;
  for (let i = 0; i < b; i++) result += a;
  return result;
}
multiply(4, 5);   // 20`,
    },
    {
      heading: { en: 'Handle the signs', hi: 'Signs sambhaalo' },
      body: {
        en: 'The naive loop breaks for a negative b — the loop never runs and you get 0. Take absolute values, count the sign separately, and apply it at the end. This is the first thing an interviewer will test.',
        hi: 'Saada loop negative b pe toot jaata hai — loop chalta hi nahi aur 0 mil jaata hai. Absolute values lo, sign alag se gino, aur aakhir mein laga do. Interviewer sabse pehle yahi test karega.',
      },
      code: `function multiply(a, b) {
  const negative = (a < 0) !== (b < 0);
  a = Math.abs(a); b = Math.abs(b);

  let result = 0;
  for (let i = 0; i < b; i++) result += a;
  return negative ? -result : result;
}
multiply(-4, 5);   // -20
multiply(-4, -5);  // 20`,
    },
    {
      heading: { en: 'The answer they are actually fishing for', hi: 'Asal mein wo kya sunna chahte hain' },
      body: {
        en: 'Russian peasant multiplication, also called doubling and halving. Shift left to double, shift right to halve, and add whenever the halved number is odd. This is O(log b) — thirty-odd steps instead of a million.',
        hi: 'Russian peasant multiplication, jise doubling aur halving bhi kehte hain. Double karne ke liye left shift, aadha karne ke liye right shift, aur jab aadha kiya number odd ho tab jodo. Ye O(log b) hai — das lakh ki jagah tees-baatees steps.',
      },
      code: `function multiply(a, b) {
  const negative = (a < 0) !== (b < 0);
  a = Math.abs(a); b = Math.abs(b);

  let result = 0;
  while (b > 0) {
    if (b & 1) result += a;      // b is odd → add this a
    a <<= 1;                     // double a
    b >>= 1;                     // halve b
  }
  return negative ? -result : result;
}`,
    },
    {
      heading: { en: 'Why the bit version works', hi: 'Bit wala version kyun chalta hai' },
      body: {
        en: 'It is just binary long multiplication. Every b is a sum of powers of two; for each set bit you add a shifted copy of a. Tracing one example makes it obvious.',
        hi: 'Ye bas binary long multiplication hai. Har b do ki powers ka jod hai; har set bit ke liye a ki ek shifted copy jodte ho. Ek example trace karo toh saaf ho jaata hai.',
      },
      diagram: `13 × 5   →   5 = 101 in binary

b=5 (101) odd  → result += 13      result = 13
                 a=26  b=2
b=2 (010) even → nothing
                 a=52  b=1
b=1 (001) odd  → result += 52      result = 65  ✓`,
    },
    {
      heading: { en: 'The recursive form', hi: 'Recursive roop' },
      body: {
        en: 'Same algorithm expressed as recursion. Some interviewers ask for it specifically, and it reads well — though the loop avoids the stack depth.',
        hi: 'Wahi algorithm recursion mein. Kuch interviewers khaas taur pe yahi maangte hain, aur ye achha padha jaata hai — waise loop stack depth se bacha leta hai.',
      },
      code: `function multiply(a, b) {
  if (b === 0) return 0;
  if (b % 2 === 0) return multiply(a + a, b / 2);
  return a + multiply(a + a, (b - 1) / 2);
}`,
    },
    {
      heading: { en: 'Mention the limits', hi: 'Seemaon ka zikr karo' },
      body: {
        en: 'Bitwise operators in JavaScript coerce to 32-bit signed integers, so this breaks above about 2.1 billion. It also only works for integers. If either matters, say so and reach for BigInt — showing you know the boundary is worth more than the code.',
        hi: 'JavaScript ke bitwise operators 32-bit signed integers mein badal dete hain, toh lagbhag 2.1 arab ke upar ye toot jaata hai. Aur ye sirf integers pe chalta hai. Inme se kuch bhi maayne rakhta ho toh bata do aur BigInt lo — seema jaanna code se zyada keemti hai.',
      },
      code: `(2 ** 31) << 1;    // 0 ✗ overflowed to 32 bits
// For big values: use BigInt, or repeated addition on Numbers.`,
    },
  ],

  'What will be the output when using objects as keys in another object?': [
    {
      heading: { en: 'Every object key is turned into a string', hi: 'Har object key string bana di jaati hai' },
      body: {
        en: 'A plain object can only have string or symbol keys. Use anything else and JavaScript converts it, which for a plain object means calling toString and getting "[object Object]" — the same string for every object.',
        hi: 'Plain object mein sirf string ya symbol keys ho sakti hain. Kuch aur do toh JavaScript usse convert kar deta hai, aur plain object ke liye iska matlab toString chalana aur "[object Object]" paana — har object ke liye wahi string.',
      },
      code: `const a = { id: 1 };
const b = { id: 2 };

const map = {};
map[a] = 'first';
map[b] = 'second';

console.log(map);        // { '[object Object]': 'second' }
console.log(map[a]);     // 'second'  ✗ b overwrote a
Object.keys(map).length; // 1`,
    },
    {
      heading: { en: 'The conversion rule, precisely', hi: 'Conversion ka rule, theek-theek' },
      body: {
        en: 'The engine runs ToPropertyKey. Symbols are kept as symbols; everything else goes through ToString. That is why numbers, booleans, null and arrays all become their string forms as keys.',
        hi: 'Engine ToPropertyKey chalata hai. Symbols symbol hi rehte hain; baaki sab ToString se guzarta hai. Isiliye numbers, booleans, null aur arrays sab keys ke roop mein apni string ban jaate hain.',
      },
      code: `const o = {};
o[1] = 'a';        o['1'];     // 'a'  — same key
o[true] = 'b';     o['true'];  // 'b'
o[null] = 'c';     o['null'];  // 'c'
o[[1,2]] = 'd';    o['1,2'];   // 'd'  — arrays join with commas
o[{}] = 'e';       o['[object Object]'];  // 'e'`,
    },
    {
      heading: { en: 'The one exception: symbols', hi: 'Ek apvaad: symbols' },
      body: {
        en: 'Symbols are the only non-string key type a plain object supports, and every symbol is unique. They also do not appear in Object.keys, JSON.stringify or for...in, which makes them useful for metadata you do not want enumerated.',
        hi: 'Symbols hi ek aisi non-string key type hain jo plain object sambhaalta hai, aur har symbol unique hai. Ye Object.keys, JSON.stringify ya for...in mein nahi aate, jo unhe aise metadata ke liye kaam ka banata hai jo ginne mein nahi aana chahiye.',
      },
      code: `const k1 = Symbol('id'), k2 = Symbol('id');
const o = { [k1]: 'a', [k2]: 'b' };
o[k1];                // 'a' — genuinely distinct keys
Object.keys(o);       // [] — symbols are hidden`,
    },
    {
      heading: { en: 'Map is the fix', hi: 'Ilaaj Map hai' },
      body: {
        en: 'A Map keeps keys exactly as given and compares them by reference, so two distinct objects are two distinct entries. This is the single strongest reason Map exists, and the answer the question is looking for.',
        hi: 'Map keys bilkul waise rakhta hai jaise di gayi aur unhe reference se compare karta hai, toh do alag objects do alag entries hain. Map ke hone ki sabse badi wajah yahi hai, aur sawaal isi jawab ki talaash mein hai.',
      },
      code: `const m = new Map();
m.set(a, 'first').set(b, 'second');

m.get(a);   // 'first'  ✓
m.get(b);   // 'second' ✓
m.size;     // 2`,
    },
    {
      heading: { en: 'Reference identity, not shape', hi: 'Reference ki pehchaan, shakal nahi' },
      body: {
        en: 'Even with a Map, a freshly written literal is a different object, so it will not find the entry. If you need lookup by content, you have to build a key from the content — an id, or a serialised string.',
        hi: 'Map ke saath bhi, naya likha literal alag object hai, toh wo entry nahi dhoondh paayega. Content se lookup chahiye toh content se hi key banani padegi — koi id, ya serialise ki hui string.',
      },
      code: `m.get({ id: 1 });    // undefined — a different object

// key by content instead:
const byId = new Map(users.map((u) => [u.id, u]));
byId.get(1);`,
    },
    {
      heading: { en: 'You can change the string an object produces', hi: 'Object jo string deta hai wo badal sakte ho' },
      body: {
        en: 'Defining toString changes the key an object collapses to. This is occasionally useful — and worth knowing so that a surprising key in a debug session makes sense — but a Map is almost always the better answer.',
        hi: 'toString define karne se wo string badal jaati hai jismein object simat ta hai. Ye kabhi-kabhi kaam ka hai — aur jaanna zaroori hai taaki debug ke waqt ajeeb key samajh aa jaaye — par lagbhag hamesha Map behtar jawab hai.',
      },
      code: `const u = { id: 7, toString() { return 'user-' + this.id; } };
const o = {};
o[u] = 'x';
o;            // { 'user-7': 'x' }`,
    },
  ],
};
