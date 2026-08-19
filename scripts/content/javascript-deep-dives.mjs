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

  /* ─── Types, values and coercion ──────────────────────────── */

  'What is JavaScript?': [
    {
      heading: { en: 'The one-line definition', hi: 'Ek line ki definition' },
      body: {
        en: 'JavaScript is a high-level, dynamically typed, interpreted-and-JIT-compiled language that follows the ECMAScript standard. It is single-threaded, supports objects through prototypes, and treats functions as first-class values. Every word there is worth being able to defend.',
        hi: 'JavaScript ek high-level, dynamically typed, interpreted-aur-JIT-compiled language hai jo ECMAScript standard follow karti hai. Ye single-threaded hai, objects prototypes se sambhaalti hai, aur functions ko first-class values maanti hai. Har shabd ka bachaav kar paana zaroori hai.',
      },
    },
    {
      heading: { en: 'Dynamically typed, not untyped', hi: 'Dynamically typed, untyped nahi' },
      body: {
        en: 'Values have types; variables do not. A name can hold a number now and a string a line later, and the type is checked when the code runs rather than before. That is flexibility and it is also why a typo surfaces at runtime instead of at compile time.',
        hi: 'Values ke types hote hain; variables ke nahi. Ek naam abhi number rakh sakta hai aur agli line pe string, aur type code chalte waqt check hota hai, pehle nahi. Ye lachak hai aur isiliye koi typo compile time ki jagah runtime pe saamne aata hai.',
      },
      code: `let x = 42;      typeof x;   // 'number'
x = 'hello';     typeof x;   // 'string'  — no error`,
    },
    {
      heading: { en: 'Not interpreted line by line any more', hi: 'Ab line-by-line interpreted nahi' },
      body: {
        en: 'The old description is out of date. A modern engine parses the source into an AST, compiles it to bytecode, runs that, watches which functions run often, and recompiles those into optimised machine code. Calling it "just interpreted" in an interview is a small red flag.',
        hi: 'Purana varnan ab sahi nahi hai. Modern engine source ko AST mein parse karta hai, bytecode mein compile karta hai, use chalata hai, dekhta hai kaunse functions zyada chalte hain, aur unhe optimised machine code mein dobara compile karta hai. Interview mein isse "bas interpreted" kehna chhota sa red flag hai.',
      },
      diagram: `source → parser → AST → bytecode → run
                              │
                        hot code found
                              ▼
                      optimised machine code`,
    },
    {
      heading: { en: 'It runs far more than browsers now', hi: 'Ab ye browsers se kahin zyada jagah chalti hai' },
      body: {
        en: 'The language is separate from where it runs. Browsers give it the DOM and fetch; Node and Deno give it files and sockets; it also runs on servers, in mobile apps through React Native, on the desktop through Electron, and at the edge in Cloudflare Workers.',
        hi: 'Language uss jagah se alag hai jahan wo chalti hai. Browsers usse DOM aur fetch dete hain; Node aur Deno files aur sockets; ye servers pe bhi chalti hai, React Native se mobile apps mein, Electron se desktop pe, aur Cloudflare Workers mein edge pe.',
      },
    },
    {
      heading: { en: 'Nothing to do with Java', hi: 'Java se koi lena-dena nahi' },
      body: {
        en: 'The name was a marketing decision in 1995. The two languages differ in typing, in their object model, in threading and in how they compile. Being asked about the relationship is common, and the answer is simply that there is none.',
        hi: '1995 mein naam ek marketing faisla tha. Dono languages typing mein, object model mein, threading mein aur compile hone ke tareeke mein alag hain. Rishte ke baare mein poochha jaana aam hai, aur jawab bas itna hai ki koi rishta hai hi nahi.',
      },
    },
  ],

  'What are the data types in JavaScript?': [
    {
      heading: { en: 'Seven primitives and one object type', hi: 'Saat primitives aur ek object type' },
      body: {
        en: 'The primitives are string, number, boolean, undefined, null, symbol and bigint. Everything else — arrays, functions, dates, regexes, Maps — is an object. That is the entire type system, and being able to list all eight is half the question.',
        hi: 'Primitives hain string, number, boolean, undefined, null, symbol aur bigint. Baaki sab kuch — arrays, functions, dates, regexes, Maps — object hai. Yahi poora type system hai, aur aathon gina dena aadha sawaal hai.',
      },
      diagram: `PRIMITIVES (7)              OBJECTS (1 type, many forms)
string                      Object
number                      Array
boolean                     Function
undefined                   Date, RegExp
null                        Map, Set, WeakMap, WeakSet
symbol                      Promise, Error
bigint                      …`,
    },
    {
      heading: { en: 'Primitives are immutable and copied by value', hi: 'Primitives immutable hain aur value se copy hote hain' },
      body: {
        en: 'You cannot change a primitive; you can only replace it. String methods look like mutation but always return a new string. And assigning a primitive copies the value, so the two names are fully independent afterwards.',
        hi: 'Primitive ko badal nahi sakte; sirf badal kar naya rakh sakte ho. String methods mutation jaise dikhte hain par hamesha nayi string dete hain. Aur primitive assign karne se value copy hoti hai, toh dono naam uske baad poori tarah alag hain.',
      },
      code: `let s = 'hi';
s.toUpperCase();   // 'HI'
s;                 // 'hi' — unchanged

let a = 1, b = a;
b = 2;
a;                 // 1 — independent`,
    },
    {
      heading: { en: 'One number type, and what that costs', hi: 'Ek hi number type, aur uski keemat' },
      body: {
        en: 'There is no separate int and float — every number is a 64-bit IEEE-754 double. That gives exact integers only up to 2^53-1, and makes 0.1 + 0.2 famously not 0.3. bigint exists for integers beyond that range.',
        hi: 'Alag int aur float nahi hain — har number 64-bit IEEE-754 double hai. Isse theek integers sirf 2^53-1 tak milte hain, aur isi wajah se 0.1 + 0.2 mashhoor taur pe 0.3 nahi hota. Us range se aage ke integers ke liye bigint hai.',
      },
      code: `0.1 + 0.2;                    // 0.30000000000000004
Number.MAX_SAFE_INTEGER;      // 9007199254740991
9007199254740993;             // 9007199254740992  ✗ lost precision

9007199254740993n;            // ✓ exact, as a bigint
1n + 1;                       // ✗ TypeError — cannot mix with number`,
    },
    {
      heading: { en: 'typeof lies twice', hi: 'typeof do jagah jhooth bolta hai' },
      body: {
        en: 'typeof null returns "object" — a bug from the first implementation, kept for compatibility. And typeof a function returns "function" even though functions are objects. Know both, because they are asked constantly.',
        hi: 'typeof null "object" deta hai — pehle implementation ka bug, compatibility ke liye rakha gaya. Aur function pe typeof "function" deta hai, jabki functions objects hi hain. Dono jaano, kyunki ye lagataar poochhe jaate hain.',
      },
      code: `typeof null;         // 'object'    ✗ the famous bug
typeof function(){}; // 'function'  — a special case
typeof [];           // 'object'    — use Array.isArray
typeof NaN;          // 'number'    — it IS a number`,
    },
    {
      heading: { en: 'Why primitives seem to have methods', hi: 'Primitives ke paas methods kaise dikhte hain' },
      body: {
        en: 'A primitive has no properties. When you write "hi".length, the engine temporarily wraps it in a String object, reads the property, and throws the wrapper away. That is autoboxing, and it explains why assigning a property to a primitive silently does nothing.',
        hi: 'Primitive ke paas properties nahi hoti. Jab tum "hi".length likhte ho, engine usse thodi der ke liye String object mein lapetta hai, property padhta hai, aur wrapper phenk deta hai. Yahi autoboxing hai, aur isi se pata chalta hai ki primitive pe property assign karna chup-chaap kuch kyun nahi karta.',
      },
      code: `'hi'.length;        // 2 — a temporary String wrapper

let s = 'hi';
s.custom = 1;
s.custom;           // undefined — the wrapper was discarded`,
    },
    {
      heading: { en: 'Symbol and bigint in one line each', hi: 'Symbol aur bigint, ek-ek line mein' },
      body: {
        en: 'A symbol is a guaranteed-unique value used as a non-colliding property key — two symbols with the same description are still different. A bigint is an arbitrary-precision integer, written with an n suffix, and it never mixes with regular numbers in arithmetic.',
        hi: 'Symbol ek guaranteed-unique value hai jo bina takraav wali property key ki tarah use hoti hai — same description wale do symbols bhi alag hain. Bigint ek arbitrary-precision integer hai, n suffix ke saath likha jaata hai, aur arithmetic mein aam numbers ke saath kabhi nahi milta.',
      },
      code: `Symbol('id') === Symbol('id');   // false — always unique
typeof 10n;                      // 'bigint'`,
    },
  ],

  'What is the difference between == and ===?': [
    {
      heading: { en: 'One converts, the other does not', hi: 'Ek convert karta hai, doosra nahi' },
      body: {
        en: '=== compares type and value with no conversion: different types means false, immediately. == will convert one or both operands to a common type first, and only then compare. That single extra step is the entire difference.',
        hi: '=== type aur value dono compare karta hai, bina kisi conversion ke: types alag hue toh turant false. == pehle ek ya dono operands ko ek common type mein badal deta hai, aur tabhi compare karta hai. Bas wahi ek extra kadam poora farq hai.',
      },
      code: `5 === '5';   // false — number vs string, done
5 ==  '5';   // true  — '5' becomes 5, then 5 === 5`,
    },
    {
      heading: { en: 'The conversion rules, in the order they apply', hi: 'Conversion ke rules, jis kram mein lagte hain' },
      body: {
        en: 'Same type falls through to ===. null == undefined is true and neither equals anything else. Number versus string converts the string to a number. Boolean is converted to a number first. And object versus primitive converts the object with valueOf then toString.',
        hi: 'Same type ho toh seedha === chalta hai. null == undefined true hai aur ye kisi aur ke barabar nahi. Number aur string ho toh string number ban jaati hai. Boolean pehle number banta hai. Aur object aur primitive ho toh object valueOf phir toString se convert hota hai.',
      },
      diagram: `x == y

same type?          → use ===
null vs undefined?  → true
number vs string?   → ToNumber(string)
boolean involved?   → ToNumber(boolean) first
object vs primitive?→ ToPrimitive(object), then retry
otherwise           → false`,
    },
    {
      heading: { en: 'The results people cannot predict', hi: 'Wo nateeje jo log guess nahi kar paate' },
      body: {
        en: 'Every one of these follows the rules above, and every one of them looks wrong. This is the concrete argument for banning ==: the rules are learnable but nobody applies them correctly under pressure.',
        hi: 'In sabme upar wale rules hi lagte hain, aur ye sab galat dikhte hain. == band karne ki thos wajah yahi hai: rules seekhe ja sakte hain par dabaav mein koi bhi unhe theek se nahi lagata.',
      },
      code: `0 == '';           // true   '' → 0
0 == '0';          // true   '0' → 0
'' == '0';         // false  both strings, not equal
false == '0';      // true   both → 0
null == 0;         // false  null only equals undefined
[] == false;       // true   [] → '' → 0
[] == ![];         // true   ![] is false → 0, [] → 0`,
    },
    {
      heading: { en: 'The one place == earns its keep', hi: 'Ek jagah jahan == apni jagah banata hai' },
      body: {
        en: 'x == null is true for exactly null and undefined and nothing else. It is a genuinely useful shorthand, and most lint configs allow it explicitly while banning == everywhere else.',
        hi: 'x == null theek null aur undefined ke liye true hai, aur kisi aur ke liye nahi. Ye sach mein kaam ka shortcut hai, aur zyadatar lint configs isse chhoot dete hain jabki baaki har jagah == band kar dete hain.',
      },
      code: `if (value == null) { /* null or undefined */ }
// same as: value === null || value === undefined

// eslint: eqeqeq with { null: 'ignore' }`,
    },
    {
      heading: { en: 'Where === also surprises you', hi: 'Jahan === bhi chaunkata hai' },
      body: {
        en: 'Strict equality has two quirks of its own. NaN is not equal to itself, and 0 === -0 is true. Object.is fixes both, and Number.isNaN is the right test for NaN.',
        hi: 'Strict equality ki apni do ajeeb baatein hain. NaN khud ke barabar nahi hai, aur 0 === -0 true hai. Object.is dono theek karta hai, aur NaN ke liye sahi test Number.isNaN hai.',
      },
      code: `NaN === NaN;          // false
Number.isNaN(NaN);    // true  ✓

0 === -0;             // true
Object.is(0, -0);     // false
Object.is(NaN, NaN);  // true`,
    },
    {
      heading: { en: 'Objects compare by reference either way', hi: 'Objects dono tarah reference se compare hote hain' },
      body: {
        en: 'Neither operator looks inside an object. Two identical-looking literals are never equal, because they are two different references. Comparing contents needs your own check or a deep-equal helper.',
        hi: 'Koi bhi operator object ke andar nahi jhaankta. Dikhne mein same do literals kabhi barabar nahi, kyunki wo do alag references hain. Content compare karne ke liye apna check ya deep-equal helper chahiye.',
      },
      code: `{ a: 1 } === { a: 1 };   // false
[1] === [1];             // false

const x = { a: 1 };
x === x;                 // true — same reference`,
    },
  ],

  'What are truthy and falsy values?': [
    {
      heading: { en: 'Every value answers yes or no', hi: 'Har value haan ya na kehti hai' },
      body: {
        en: 'Wherever JavaScript needs a boolean — an if, a while, ||, &&, ! — it runs an internal ToBoolean conversion on whatever you gave it. Values that convert to false are falsy; everything else is truthy. There is no third option.',
        hi: 'Jahan bhi JavaScript ko boolean chahiye — if, while, ||, &&, ! — wo tumhari di hui cheez pe andar hi andar ToBoolean conversion chalata hai. Jo false banti hain wo falsy hain; baaki sab truthy. Teesra option hai hi nahi.',
      },
      code: `if (value)        { }    // ToBoolean(value)
while (value)     { }
value ? a : b;
!value;
Boolean(value);          // the same conversion, explicit`,
    },
    {
      heading: { en: 'The falsy list is short and closed', hi: 'Falsy ki list chhoti aur band hai' },
      body: {
        en: 'Eight values: false, 0, -0, 0n, "", null, undefined, NaN. Memorise them, because the truthy set is defined as "everything else" — you cannot learn it by listing.',
        hi: 'Aath values: false, 0, -0, 0n, "", null, undefined, NaN. Inhe yaad karo, kyunki truthy ka matlab hi "baaki sab" hai — usse gina kar nahi seekha ja sakta.',
      },
      diagram: `FALSY (exactly 8)        TRUTHY (everything else)
false                    true
0   -0   0n              any non-zero number
""                       any non-empty string, incl "0" "false"
null                     []   {}   function(){}
undefined                new Boolean(false)
NaN                      Infinity, -Infinity`,
    },
    {
      heading: { en: 'The truthy values that catch people', hi: 'Wo truthy values jo logon ko pakadti hain' },
      body: {
        en: 'Empty arrays and empty objects are truthy — they are objects, and every object is truthy without exception. The strings "0" and "false" are truthy because they are non-empty. So is a Boolean object wrapping false.',
        hi: 'Khaali arrays aur khaali objects truthy hain — wo objects hain, aur har object bina apvaad truthy hai. Strings "0" aur "false" truthy hain kyunki wo non-empty hain. false ko lapetne wala Boolean object bhi truthy hai.',
      },
      code: `if ([])                {}   // ✓ runs
if ({})                {}   // ✓ runs
if ('false')           {}   // ✓ runs
if (new Boolean(false)){}   // ✓ runs — it is an object

// So test what you mean:
if (arr.length)        {}   // ✓ non-empty array
if (Object.keys(o).length) {}`,
    },
    {
      heading: { en: 'Logical operators return values, not booleans', hi: 'Logical operators values dete hain, booleans nahi' },
      body: {
        en: 'This is the part most people only half know. || returns the first truthy operand, or the last one. && returns the first falsy operand, or the last one. Neither converts the result to a boolean — that is why they work as defaults and guards.',
        hi: 'Yahi wo hissa hai jo zyadatar log aadha hi jaante hain. || pehla truthy operand deta hai, ya aakhri. && pehla falsy operand deta hai, ya aakhri. Koi bhi result ko boolean nahi banata — isiliye ye defaults aur guards ki tarah kaam karte hain.',
      },
      code: `'a' || 'b';      // 'a'
''  || 'b';      // 'b'
0   || 'b';      // 'b'

'a' && 'b';      // 'b'
''  && 'b';      // ''
null && 'b';     // null`,
    },
    {
      heading: { en: 'Why ?? exists', hi: '?? kyun hai' },
      body: {
        en: '|| falls back on ANY falsy value, so a real 0 or an empty string gets replaced by your default. ?? only falls back on null and undefined. For defaults, ?? is almost always what you actually meant.',
        hi: '|| KISI BHI falsy value pe fallback le leta hai, toh asli 0 ya khaali string tumhare default se badal jaati hai. ?? sirf null aur undefined pe fallback leta hai. Defaults ke liye lagbhag hamesha ?? hi tumhara matlab tha.',
      },
      code: `const qty = 0;
qty || 1;     // 1  ✗ zero was meaningful
qty ?? 1;     // 0  ✓

// ??= is the assignment form
options.retries ??= 3;`,
    },
    {
      heading: { en: 'Converting on purpose', hi: 'Jaan-boojh kar convert karna' },
      body: {
        en: 'Boolean(x) and !!x are identical; !! is just two negations and is idiomatic in JSX and in return statements. In readable code, prefer a check that states the condition rather than relying on truthiness.',
        hi: 'Boolean(x) aur !!x bilkul ek hain; !! bas do negations hain aur JSX aur return statements mein aam hai. Padhne laayak code mein truthiness pe bharosa karne ki jagah aisa check likho jo shart saaf bataye.',
      },
      code: `!!'a';                 // true
Boolean('a');          // true

{items.length > 0 && <List />}   // ✓ in JSX
{items.length && <List />}       // ✗ renders a literal 0`,
    },
  ],

  'What is undefined?': [
    {
      heading: { en: 'The absence the language produces', hi: 'Wo khaalipan jo language khud banati hai' },
      body: {
        en: 'undefined is a primitive type with exactly one value, also called undefined. It means "no value was ever supplied here" — and crucially, it is what JAVASCRIPT hands you, not something you are meant to write yourself.',
        hi: 'undefined ek primitive type hai jiski bilkul ek value hai, jise undefined hi kehte hain. Iska matlab hai "yahan koi value di hi nahi gayi" — aur asli baat ye hai ki ye JAVASCRIPT deta hai, ye kuch aisa nahi jo tumhe khud likhna ho.',
      },
      code: `typeof undefined;   // 'undefined'
undefined === undefined;   // true — a single value`,
    },
    {
      heading: { en: 'The exact places it appears', hi: 'Ye bilkul kahan-kahan aata hai' },
      body: {
        en: 'Six of them, and knowing the list means you will never be surprised by one: an unassigned variable, a missing parameter, a missing property, a function with no return, a void expression, and an array hole.',
        hi: 'Chhah jagah, aur ye list pata ho toh kabhi surprise nahi hoga: bina assign kiya variable, na diya gaya parameter, na milne wali property, bina return wala function, void expression, aur array ka hole.',
      },
      code: `let a;                          // 1
function f(p) { return p; } f();// 2
({}).nope;                      // 3
function g() {} g();            // 4
void 0;                         // 5
[1, , 3][1];                    // 6`,
    },
    {
      heading: { en: 'Testing for it safely', hi: 'Isse safely test karna' },
      body: {
        en: 'Use === undefined, or typeof x === "undefined" when the variable might not be declared at all — typeof is the only form that will not throw on an undeclared name. Note that typeof does throw for a let or const still in its temporal dead zone.',
        hi: 'x === undefined use karo, ya typeof x === "undefined" jab variable declare hi na hua ho — undeclared naam pe sirf typeof error nahi deta. Dhyaan raho, TDZ mein pade let ya const pe typeof error deta hai.',
      },
      code: `x === undefined;              // ✓ when x is declared
typeof x === 'undefined';     // ✓ even when x does not exist

value == null;                // ✓ catches null AND undefined`,
    },
    {
      heading: { en: 'It used to be assignable', hi: 'Pehle isse assign kiya ja sakta tha' },
      body: {
        en: 'Before ES5, undefined was a writable global, so code could break it and old libraries used the void 0 trick or an unnamed parameter for safety. Today the global is read-only — but you can still shadow the name locally, which is why linters flag it.',
        hi: 'ES5 se pehle undefined ek writable global tha, toh code usse tod sakta tha aur purani libraries safety ke liye void 0 ya bina naam ka parameter use karti thi. Aaj global read-only hai — par local scope mein naam abhi bhi dhaka ja sakta hai, isiliye linters isse pakadte hain.',
      },
      code: `undefined = 5;      // ignored — the global is read-only
function f(undefined) { return undefined; }
f(1);               // 1 ✗ the name is shadowed`,
    },
    {
      heading: { en: 'JSON drops it', hi: 'JSON isse gira deta hai' },
      body: {
        en: 'JSON has no undefined. Stringify removes any object key whose value is undefined, and turns it into null inside arrays. If a field must survive the network, send null.',
        hi: 'JSON mein undefined hota hi nahi. Stringify har us object key ko hata deta hai jiski value undefined hai, aur arrays ke andar usse null bana deta hai. Agar koi field network paar karni hai toh null bhejo.',
      },
      code: `JSON.stringify({ a: 1, b: undefined });   // '{"a":1}'
JSON.stringify([undefined]);              // '[null]'`,
    },
  ],

  'What is null?': [
    {
      heading: { en: 'Deliberate emptiness', hi: 'Jaan-boojh kar rakha khaalipan' },
      body: {
        en: 'null is a primitive with a single value, meaning "there is intentionally nothing here". Unlike undefined, JavaScript almost never produces it on its own — it appears because a developer or an API chose to put it there.',
        hi: 'null ek primitive hai jiski ek hi value hai, matlab "yahan jaan-boojh kar kuch nahi hai". undefined ke ulat, JavaScript isse lagbhag kabhi khud nahi banata — ye isliye aata hai kyunki kisi developer ya API ne isse rakhne ka faisla kiya.',
      },
      code: `let selected = null;      // "nothing is selected yet"
user.deletedAt = null;    // "not deleted"`,
    },
    {
      heading: { en: 'typeof null is "object" — and why', hi: 'typeof null "object" hai — aur kyun' },
      body: {
        en: 'In the original 1995 implementation every value carried a small type tag, and objects used tag 000. The null pointer was all zero bits, so it matched the object tag. Fixing it was proposed and rejected because it would break existing sites.',
        hi: '1995 ke asli implementation mein har value ke saath ek chhota type tag hota tha, aur objects ka tag 000 tha. Null pointer poora zero bits tha, toh wo object tag se mil gaya. Isse theek karne ka prastaav aaya tha par thukra diya gaya kyunki isse maujooda sites toot jaati.',
      },
      code: `typeof null;          // 'object'  ✗
null instanceof Object;  // false — it is NOT an object

// the correct test:
value === null;`,
    },
    {
      heading: { en: 'It coerces in two different ways', hi: 'Ye do alag tareeke se coerce hota hai' },
      body: {
        en: 'This inconsistency is a favourite interview trap. For equality, null equals only undefined and is not converted to a number. But relational operators DO convert it, and null becomes 0. That is how null >= 0 is true while null == 0 is false.',
        hi: 'Ye asangati interview ka pasandeeda jaal hai. Equality mein null sirf undefined ke barabar hai aur number mein nahi badalta. Par relational operators isse BADALTE hain, aur null 0 ban jaata hai. Isi liye null >= 0 true hai jabki null == 0 false.',
      },
      code: `null == 0;    // false — equality does not convert null
null >= 0;    // true  — relational does: Number(null) is 0
null > 0;     // false
Number(null); // 0     (Number(undefined) is NaN)`,
    },
    {
      heading: { en: 'Defaults treat it as a real value', hi: 'Defaults isse asli value maante hain' },
      body: {
        en: 'A default parameter fires only for undefined, so passing null keeps the null. Optional chaining and ?? do treat null as empty. Mixing these up is a common source of "why is this null in production".',
        hi: 'Default parameter sirf undefined pe chalta hai, toh null dene se null hi rehta hai. Optional chaining aur ?? null ko khaali maante hain. Inhe aapas mein mila dena "production mein ye null kyun hai" ka aam karan hai.',
      },
      code: `function f(x = 5) { return x; }
f(null);          // null  ✗ the default did not fire
f(undefined);     // 5

null ?? 'x';      // 'x'  ✓
obj?.a;           // undefined when obj is null — no throw`,
    },
    {
      heading: { en: 'When to actually use it', hi: 'Isse asal mein kab use karein' },
      body: {
        en: 'Use null to say "empty on purpose": clearing a selection, representing a database NULL, marking a field the user explicitly blanked. Never assign undefined by hand — keeping the two meanings distinct is the whole benefit.',
        hi: 'null tab use karo jab kehna ho "jaan-boojh kar khaali": selection clear karna, database NULL represent karna, wo field mark karna jo user ne khud khaali kiya. undefined kabhi haath se assign mat karo — dono matlab alag rakhna hi poora fayda hai.',
      },
    },
  ],

  'What is NaN?': [
    {
      heading: { en: 'A number that means "not a valid number"', hi: 'Ek number jiska matlab hai "sahi number nahi"' },
      body: {
        en: 'NaN stands for Not-a-Number, and confusingly its type IS number. It is the IEEE-754 result for an arithmetic operation that has no meaningful numeric answer.',
        hi: 'NaN ka matlab hai Not-a-Number, aur uljhan ki baat ye hai ki iska type number HI hai. Ye IEEE-754 ka wo nateeja hai jo aise arithmetic operation se aata hai jiska koi matlab wala numeric jawab nahi.',
      },
      code: `typeof NaN;        // 'number'

0 / 0;             // NaN
Math.sqrt(-1);     // NaN
parseInt('abc');   // NaN
Number('12px');    // NaN
undefined + 1;     // NaN`,
    },
    {
      heading: { en: 'It is not equal to itself', hi: 'Ye khud ke barabar nahi hai' },
      body: {
        en: 'NaN is the only value in JavaScript for which x === x is false. That is mandated by IEEE-754: two computations that both failed are not thereby the same result. It also means every comparison involving NaN returns false.',
        hi: 'JavaScript mein NaN hi ek aisi value hai jiske liye x === x false hai. Ye IEEE-754 ka niyam hai: do computations jo dono fail hue, isse ek jaise nateeje nahi ban jaate. Iska matlab ye bhi hai ki NaN wali har comparison false deti hai.',
      },
      code: `NaN === NaN;   // false
NaN !== NaN;   // true   ← the only value where this holds
NaN > 1;       // false
NaN < 1;       // false
NaN >= NaN;    // false`,
    },
    {
      heading: { en: 'Testing for it — use Number.isNaN', hi: 'Isse test karna — Number.isNaN lo' },
      body: {
        en: 'The global isNaN coerces its argument first, so it says true for anything that is merely not numeric — including the string "abc" and undefined. Number.isNaN does no conversion and answers the question you actually asked.',
        hi: 'Global isNaN pehle apne argument ko coerce karta hai, toh ye har us cheez pe true kehta hai jo bas numeric nahi hai — string "abc" aur undefined samet. Number.isNaN koi conversion nahi karta aur wahi sawaal ka jawab deta hai jo tumne poochha.',
      },
      code: `isNaN('abc');            // true  ✗ misleading — it coerced first
Number.isNaN('abc');     // false ✓ the string is not NaN

isNaN(NaN);              // true
Number.isNaN(NaN);       // true  ✓ use this one

Object.is(x, NaN);       // also correct`,
    },
    {
      heading: { en: 'It spreads through a calculation', hi: 'Ye poori calculation mein phail jaata hai' },
      body: {
        en: 'Almost any arithmetic involving NaN produces NaN, so one bad value silently poisons everything downstream. This is why a total shows as NaN and the actual cause is fifty lines earlier — validate inputs at the boundary.',
        hi: 'NaN wali lagbhag har arithmetic NaN hi deti hai, toh ek kharaab value chup-chaap aage sab kuch zeher kar deti hai. Isiliye total NaN dikhta hai aur asli wajah pachaas line pehle hoti hai — inputs boundary pe hi jaancho.',
      },
      code: `[1, 2, undefined].reduce((a, b) => a + b, 0);   // NaN

// guard at the edge:
const n = Number(input);
if (Number.isNaN(n)) throw new Error('not a number');`,
    },
    {
      heading: { en: 'The two places it behaves like itself', hi: 'Do jagah jahan ye khud jaisa vyavhaar karta hai' },
      body: {
        en: 'includes and Set both use SameValueZero rather than ===, and under that rule NaN does equal NaN. indexOf still uses strict equality, so it cannot find NaN. Expect this as a follow-up.',
        hi: 'includes aur Set dono === ki jagah SameValueZero use karte hain, aur us rule ke tahat NaN, NaN ke barabar hai. indexOf abhi bhi strict equality use karta hai, isliye wo NaN dhoondh nahi paata. Ye follow-up ke roop mein aayega.',
      },
      code: `[NaN].includes(NaN);        // true  ✓
[NaN].indexOf(NaN);         // -1    ✗ uses ===
new Set([NaN, NaN]).size;   // 1`,
    },
  ],

  'What is the difference between primitive and reference data types?': [
    {
      heading: { en: 'What the variable actually holds', hi: 'Variable asal mein kya rakhta hai' },
      body: {
        en: 'A primitive variable holds the value itself. A reference variable holds an address pointing at an object stored elsewhere. Every difference between the two categories follows from this one fact.',
        hi: 'Primitive variable value khud rakhta hai. Reference variable ek address rakhta hai jo kahin aur pade object ko point karta hai. Dono categories ke saare farq isi ek baat se nikalte hain.',
      },
      diagram: `PRIMITIVE                 REFERENCE
let a = 5                 let o = { n: 5 }

  a │ 5 │                   o │ ●─┼──► { n: 5 }
    the value                 an address`,
    },
    {
      heading: { en: 'Copying: value versus address', hi: 'Copy: value vs address' },
      body: {
        en: 'Assigning a primitive duplicates the value, so the two names are independent afterwards. Assigning an object duplicates the ADDRESS, so both names point at one object and a change through either is visible through both.',
        hi: 'Primitive assign karne se value duplicate hoti hai, toh dono naam uske baad alag hain. Object assign karne se ADDRESS duplicate hota hai, toh dono naam ek hi object pe point karte hain aur kisi se bhi badlo dono ko dikhta hai.',
      },
      code: `let a = 1, b = a;
b = 2;  a;              // 1 — independent

let x = { n: 1 }, y = x;
y.n = 2;  x.n;          // 2 — same object`,
    },
    {
      heading: { en: 'Equality compares what is stored', hi: 'Barabari wahi compare karti hai jo rakha hai' },
      body: {
        en: 'Two primitives are equal when their values match. Two objects are equal only when they are the same reference, so identical-looking literals are never equal. Comparing contents needs your own logic.',
        hi: 'Do primitives tab barabar hain jab unki values milein. Do objects tabhi barabar hain jab wo ek hi reference hon, toh dikhne mein same literals kabhi barabar nahi. Content compare karne ke liye apna logic chahiye.',
      },
      code: `'a' === 'a';           // true
1 === 1;               // true

{} === {};             // false
[1] === [1];           // false
const o = {}; o === o; // true`,
    },
    {
      heading: { en: 'Passing to a function', hi: 'Function ko dena' },
      body: {
        en: 'JavaScript always passes by value — but for an object, the value being passed is the reference. So the function can mutate the object you gave it, yet reassigning the parameter does nothing outside. Both halves of that sentence matter.',
        hi: 'JavaScript hamesha value se pass karta hai — par object ke liye jo value pass hoti hai wo reference hai. Toh function tumhare diye object ko badal sakta hai, phir bhi parameter ko dobara assign karna bahar kuch nahi karta. Is vaakya ke dono hisse maayne rakhte hain.',
      },
      code: `function mutate(o) { o.n = 99; }      // ✓ visible outside
function reassign(o) { o = { n: 0 }; } // ✗ local only

const obj = { n: 1 };
mutate(obj);    obj.n;   // 99
reassign(obj);  obj.n;   // 99 — unchanged by the reassign`,
    },
    {
      heading: { en: 'Immutability', hi: 'Immutability' },
      body: {
        en: 'Primitives cannot be changed, only replaced — string methods always return a new string. Objects are mutable by default, and const does not change that: it locks the binding, not the contents.',
        hi: 'Primitives badle nahi ja sakte, sirf badal kar naye rakhe ja sakte hain — string methods hamesha nayi string dete hain. Objects default se mutable hain, aur const usse nahi badalta: wo binding lock karta hai, andar ka saamaan nahi.',
      },
      code: `let s = 'hi'; s.toUpperCase(); s;   // 'hi' — unchanged

const arr = [1];
arr.push(2);   // ✓ allowed — mutating
arr = [];      // ✗ TypeError — rebinding`,
    },
    {
      heading: { en: 'Where they live, and why it is a detail', hi: 'Ye kahan rehte hain, aur ye chhoti baat kyun hai' },
      body: {
        en: 'Textbooks say primitives go on the stack and objects on the heap. That is a useful mental model, but modern engines do escape analysis and may keep short-lived objects on the stack anyway. Give the model, then say it is an implementation detail — that reads as depth, not pedantry.',
        hi: 'Kitaabein kehti hain primitives stack pe aur objects heap pe jaate hain. Ye kaam ka mental model hai, par modern engines escape analysis karte hain aur kam umar wale objects stack pe bhi rakh sakte hain. Model batao, phir keh do ki ye implementation detail hai — ye gehrai lagti hai, chhichli baat nahi.',
      },
    },
  ],

  'What is type coercion?': [
    {
      heading: { en: 'Automatic conversion between types', hi: 'Types ke beech apne aap conversion' },
      body: {
        en: 'Coercion is JavaScript silently converting a value to the type an operation needs. It happens because operators are defined only for certain types, so the spec converts the operands first rather than throwing.',
        hi: 'Coercion matlab JavaScript ka chup-chaap kisi value ko us type mein badalna jo operation ko chahiye. Ye isliye hota hai kyunki operators sirf kuch types ke liye define hain, toh spec error dene ki jagah pehle operands convert kar deta hai.',
      },
      code: `'5' - 2;      // 3    — string becomes a number
'5' + 2;      // '52'  — number becomes a string
true + 1;     // 2     — true becomes 1
[] + {};      // '[object Object]'`,
    },
    {
      heading: { en: 'There are only three targets', hi: 'Sirf teen manzilein hain' },
      body: {
        en: 'Every coercion converts to string, to number, or to boolean. Nothing else. Once you know which one an operator asks for, the result stops being mysterious.',
        hi: 'Har coercion string, number ya boolean mein badalta hai. Aur kuch nahi. Ek baar pata chal jaaye ki operator kya maang raha hai, nateeja rahasya nahi rehta.',
      },
      diagram: `to STRING    +  with a string operand, template literals, String()
to NUMBER    -  *  /  %  **, unary +, <  >, Number()
to BOOLEAN   if, while, !, &&, ||, ternary, Boolean()`,
    },
    {
      heading: { en: 'Why + is the confusing one', hi: '+ hi uljhan wala kyun hai' },
      body: {
        en: '+ is the only operator with two jobs: numeric addition and string concatenation. Its rule is simple — if either operand becomes a string after ToPrimitive, it concatenates; otherwise it adds. Every other arithmetic operator always goes to number.',
        hi: '+ hi ek aisa operator hai jiske do kaam hain: number jodna aur strings jodna. Iska rule simple hai — ToPrimitive ke baad koi bhi operand string ban jaaye toh ye jodkar string banata hai; warna add karta hai. Baaki har arithmetic operator hamesha number pe jaata hai.',
      },
      code: `1 + '2';     // '12'  concatenation
1 - '2';     // -1    subtraction — no string option
'6' / '2';   // 3
+'5';        // 5     unary + is pure ToNumber`,
    },
    {
      heading: { en: 'Objects convert via ToPrimitive', hi: 'Objects ToPrimitive se convert hote hain' },
      body: {
        en: 'An object is first reduced to a primitive by calling valueOf and toString — valueOf first for a number hint, toString first for a string hint. This explains the famous array results: an empty array becomes an empty string, and [1,2] becomes "1,2".',
        hi: 'Object pehle valueOf aur toString bula kar primitive banaya jaata hai — number hint pe valueOf pehle, string hint pe toString pehle. Isse array ke mashhoor nateeje samajh aate hain: khaali array khaali string ban jaata hai, aur [1,2] "1,2".',
      },
      code: `[] + [];        // ''             both → ''
[] + {};        // '[object Object]'
[1,2] + '';     // '1,2'
+[];            // 0              '' → 0
+[1];           // 1
+[1,2];         // NaN            '1,2' is not numeric`,
    },
    {
      heading: { en: 'The famous puzzles, decoded', hi: 'Mashhoor pahelis, khol kar' },
      body: {
        en: 'These circulate as jokes, but each follows the rules step by step. Being able to walk through one calmly is worth more than knowing the answer.',
        hi: 'Ye mazaak ki tarah ghoomte hain, par har ek rules ko kadam-dar-kadam follow karta hai. Ek ko shaanti se samjha dena, jawab yaad rakhne se zyada keemti hai.',
      },
      code: `[] == false;
// [] → '' → 0 ;  false → 0 ;  0 == 0  → true

'5' - - '2';
// unary minus on '2' → -2 ;  5 - (-2) → 7

null + 1;      // 1   Number(null) is 0
undefined + 1; // NaN Number(undefined) is NaN`,
    },
    {
      heading: { en: 'How to keep it out of your code', hi: 'Isse apne code se kaise door rakhein' },
      body: {
        en: 'Use === everywhere except the == null idiom. Convert explicitly with Number, String and Boolean so the intent is visible. And validate at the boundary — coercion is only dangerous when a value of unknown type gets deep into your logic.',
        hi: '== null wale idiom ke alawa har jagah === use karo. Number, String aur Boolean se saaf-saaf convert karo taaki mansha dikhe. Aur boundary pe validate karo — coercion tabhi khatarnak hai jab anjaan type ki value tumhare logic mein gehre chali jaaye.',
      },
    },
  ],

  'What is implicit and explicit conversion?': [
    {
      heading: { en: 'Who asked for the conversion', hi: 'Conversion kisne maanga' },
      body: {
        en: 'Explicit conversion is you calling Number, String or Boolean — the intent is written down. Implicit conversion is the engine doing it because an operator needed a different type. Same conversion rules underneath; the only difference is whether a reader can see it.',
        hi: 'Explicit conversion matlab tum Number, String ya Boolean bula rahe ho — mansha likhi hui hai. Implicit conversion matlab engine ne kiya kyunki operator ko doosra type chahiye tha. Andar rules wahi hain; farq sirf itna hai ki padhne wale ko dikhta hai ya nahi.',
      },
      code: `Number('42');    // explicit
'42' * 1;        // implicit — same result, hidden intent`,
    },
    {
      heading: { en: 'Converting to number', hi: 'Number mein badalna' },
      body: {
        en: 'Number() is strict: the whole string must be numeric or you get NaN, and an empty string becomes 0. parseInt is lenient and reads as far as it can. Choose deliberately — they disagree on exactly the inputs you care about.',
        hi: 'Number() sakht hai: poori string numeric honi chahiye warna NaN, aur khaali string 0 ban jaati hai. parseInt narm hai aur jitna padh sake padh leta hai. Soch kar chuno — jin inputs ki tumhe fikr hai, unhi pe dono ka jawab alag hai.',
      },
      code: `Number('42');      // 42
Number('42px');    // NaN
Number('');        // 0
Number(' 42 ');    // 42  — whitespace trimmed

parseInt('42px');  // 42  — stops at the first non-digit
parseInt('px42');  // NaN
parseFloat('3.9m');// 3.9
parseInt('08');    // 8   — always pass a radix in old code`,
    },
    {
      heading: { en: 'Converting to string', hi: 'String mein badalna' },
      body: {
        en: 'String(x) is the safe form because it handles null and undefined. x.toString() throws on both. Template literals and concatenating with an empty string are the common implicit routes.',
        hi: 'String(x) safe roop hai kyunki ye null aur undefined dono sambhaal leta hai. x.toString() dono pe error deta hai. Template literals aur khaali string se jodna aam implicit raaste hain.',
      },
      code: `String(null);        // 'null'
null.toString();     // ✗ TypeError

String(123);         // '123'
123 + '';            // '123'  implicit
String([1,2]);       // '1,2'
String({});          // '[object Object]'`,
    },
    {
      heading: { en: 'Converting to boolean', hi: 'Boolean mein badalna' },
      body: {
        en: 'Boolean(x) and !!x are the same ToBoolean conversion. The implicit form happens every time a value lands in an if, a while, a ternary or a logical operator.',
        hi: 'Boolean(x) aur !!x ek hi ToBoolean conversion hain. Implicit roop tab hota hai jab koi value if, while, ternary ya logical operator mein pahunchti hai.',
      },
      code: `Boolean('');     // false
!!'a';           // true
if (value) {}    // implicit — the same conversion`,
    },
    {
      heading: { en: 'Prefer explicit, with one honest exception', hi: 'Explicit behtar, ek imaandaar apvaad ke saath' },
      body: {
        en: 'Explicit conversion documents intent and survives refactoring. The exception most teams accept is truthiness in a condition — if (list.length) reads fine. Everywhere a value crosses a boundary, from a form, an API or a URL, convert it explicitly and validate the result.',
        hi: 'Explicit conversion mansha likh deta hai aur refactor ke baad bhi tikta hai. Zyadatar teams ek apvaad maante hain: condition mein truthiness — if (list.length) theek padha jaata hai. Jahan bhi value kisi boundary se aaye, form, API ya URL se, usse explicitly convert karo aur nateeja validate karo.',
      },
      code: `const age = Number(form.age);
if (Number.isNaN(age)) return error('age must be a number');`,
    },
  ],

  'What is the typeof operator?': [
    {
      heading: { en: 'A string naming the value\'s type', hi: 'Ek string jo value ka type batati hai' },
      body: {
        en: 'typeof returns one of a fixed set of strings: "undefined", "boolean", "number", "bigint", "string", "symbol", "function" or "object". It is an operator, not a function, so the parentheses you often see are optional.',
        hi: 'typeof ek tay set mein se ek string deta hai: "undefined", "boolean", "number", "bigint", "string", "symbol", "function" ya "object". Ye operator hai, function nahi, isliye jo brackets aksar dikhte hain wo optional hain.',
      },
      code: `typeof 42;           // 'number'
typeof 'hi';         // 'string'
typeof true;         // 'boolean'
typeof undefined;    // 'undefined'
typeof Symbol();     // 'symbol'
typeof 10n;          // 'bigint'
typeof {};           // 'object'
typeof function(){}; // 'function'`,
    },
    {
      heading: { en: 'Two results that are not what you expect', hi: 'Do nateeje jo tumhari ummeed se alag hain' },
      body: {
        en: 'typeof null is "object", a bug preserved for compatibility. And "function" is not really a separate type — functions are objects, but they get their own typeof result because being callable is worth knowing.',
        hi: 'typeof null "object" hai, ek bug jo compatibility ke liye rakha gaya. Aur "function" sach mein alag type nahi hai — functions objects hi hain, par unhe apna typeof nateeja milta hai kyunki callable hona jaanna kaam ka hai.',
      },
      code: `typeof null;   // 'object'  ✗
null === null; // ✓ the correct test`,
    },
    {
      heading: { en: 'It cannot distinguish object kinds', hi: 'Ye object ke prakaar alag nahi bata sakta' },
      body: {
        en: 'Arrays, dates, regexes, Maps and plain objects all report "object". For arrays use Array.isArray. For anything else, Object.prototype.toString.call gives a precise tag and is the standard trick.',
        hi: 'Arrays, dates, regexes, Maps aur plain objects sab "object" batate hain. Arrays ke liye Array.isArray lo. Baaki kisi bhi cheez ke liye Object.prototype.toString.call sahi tag deta hai aur yahi standard jugaad hai.',
      },
      code: `typeof [];        typeof new Date();   // both 'object'

Array.isArray([]);                          // true ✓

const kind = (v) => Object.prototype.toString.call(v).slice(8, -1);
kind([]);          // 'Array'
kind(new Date());  // 'Date'
kind(null);        // 'Null'`,
    },
    {
      heading: { en: 'The one safe use: undeclared variables', hi: 'Ek safe upyog: undeclared variables' },
      body: {
        en: 'typeof is the only operator that does not throw on a name that was never declared. That made it the standard feature-detection idiom before modern module systems.',
        hi: 'typeof hi ek aisa operator hai jo kabhi declare na hue naam pe error nahi deta. Modern module systems se pehle yahi feature-detection ka standard idiom tha.',
      },
      code: `typeof neverDeclared;              // 'undefined' — no error
neverDeclared;                     // ✗ ReferenceError

if (typeof window !== 'undefined') { /* browser only */ }`,
    },
    {
      heading: { en: 'But it throws in the temporal dead zone', hi: 'Par TDZ mein ye error deta hai' },
      body: {
        en: 'ES6 broke the old guarantee. A let or const that has been hoisted but not yet initialised will throw on typeof, exactly like any other access. So typeof is safe for undeclared names, not for early ones.',
        hi: 'ES6 ne purani guarantee tod di. Jo let ya const hoist ho chuka hai par abhi initialise nahi hua, uspe typeof error dega, baaki kisi bhi access ki tarah. Toh typeof undeclared naamon ke liye safe hai, jaldi wale ke liye nahi.',
      },
      code: `typeof x;      // ✗ ReferenceError: Cannot access 'x' before…
let x = 1;`,
    },
  ],

  'What is the instanceof operator?': [
    {
      heading: { en: 'It walks the prototype chain', hi: 'Ye prototype chain pe chalta hai' },
      body: {
        en: 'a instanceof B asks whether B.prototype appears anywhere in a\'s prototype chain. It is not comparing constructors and it is not checking a type tag — it is a chain search, which is why inheritance works.',
        hi: 'a instanceof B poochta hai ki B.prototype, a ki prototype chain mein kahin bhi hai ya nahi. Ye constructors compare nahi karta aur na hi koi type tag dekhta hai — ye chain mein khoj hai, isiliye inheritance chalti hai.',
      },
      diagram: `d instanceof Animal

  d ──► Dog.prototype ──► Animal.prototype ──► Object.prototype ──► null
                                  ▲
                          found here → true`,
    },
    {
      heading: { en: 'What it is good for', hi: 'Ye kis kaam ka hai' },
      body: {
        en: 'Distinguishing object kinds that typeof flattens into "object", and checking class hierarchies. The most common real use is narrowing an error type in a catch block.',
        hi: 'Un objects ke prakaar alag karna jinhe typeof "object" mein chapta kar deta hai, aur class hierarchies check karna. Sabse aam asli upyog catch block mein error ka type pata karna hai.',
      },
      code: `class Animal {} class Dog extends Animal {}
const d = new Dog();
d instanceof Dog;      // true
d instanceof Animal;   // true ✓ inheritance
d instanceof Object;   // true

try { risky(); } catch (e) {
  if (e instanceof TypeError) handleType(e);
  else throw e;
}`,
    },
    {
      heading: { en: 'It fails on primitives', hi: 'Ye primitives pe fail hota hai' },
      body: {
        en: 'Primitives have no prototype chain of their own, so instanceof always returns false for them — even against their obvious wrapper. Use typeof for primitives; instanceof is only for objects.',
        hi: 'Primitives ki apni prototype chain hoti hi nahi, toh unke liye instanceof hamesha false deta hai — apne saaf wrapper ke against bhi. Primitives ke liye typeof lo; instanceof sirf objects ke liye hai.',
      },
      code: `'hi' instanceof String;          // false ✗
new String('hi') instanceof String;  // true

typeof 'hi' === 'string';        // ✓ the right check`,
    },
    {
      heading: { en: 'The realm problem', hi: 'Realm wali problem' },
      body: {
        en: 'Each iframe, worker or Node vm context has its OWN Array, Object and Error constructors. An array created in an iframe is not instanceof the parent page\'s Array, because the two Array.prototype objects are different. This is a real bug in libraries and in tests.',
        hi: 'Har iframe, worker ya Node vm context ke APNE Array, Object aur Error constructors hote hain. Iframe mein bana array parent page ke Array ka instanceof nahi hai, kyunki dono Array.prototype objects alag hain. Libraries aur tests mein ye asli bug hai.',
      },
      code: `const iframeArray = iframe.contentWindow.eval('[]');
iframeArray instanceof Array;   // false ✗
Array.isArray(iframeArray);     // true  ✓ works across realms`,
    },
    {
      heading: { en: 'It can be faked', hi: 'Isse nakli banaya ja sakta hai' },
      body: {
        en: 'Two things make instanceof unreliable as a guarantee. Reassigning a constructor\'s prototype changes the answer for existing objects, and Symbol.hasInstance lets a class define whatever answer it likes. Treat it as a hint, not proof.',
        hi: 'Do cheezein instanceof ko guarantee ke roop mein bharosemand nahi rehne deti. Constructor ka prototype badalne se maujooda objects ka jawab badal jaata hai, aur Symbol.hasInstance kisi bhi class ko manchaha jawab dene deta hai. Isse suraag maano, saboot nahi.',
      },
      code: `class Even {
  static [Symbol.hasInstance](n) { return n % 2 === 0; }
}
4 instanceof Even;   // true — nothing to do with prototypes`,
    },
    {
      heading: { en: 'Choosing a type check', hi: 'Type check chunna' },
      body: {
        en: 'typeof for primitives and functions. Array.isArray for arrays, always. instanceof for your own classes and for error types. Object.prototype.toString.call for a precise built-in tag. And duck typing — checking for the method you need — when you just want to know if something will work.',
        hi: 'Primitives aur functions ke liye typeof. Arrays ke liye hamesha Array.isArray. Apni classes aur error types ke liye instanceof. Built-in ka theek tag chahiye toh Object.prototype.toString.call. Aur duck typing — jo method chahiye wahi check karna — jab bas ye jaanna ho ki cheez chalegi ya nahi.',
      },
      code: `typeof v === 'function';
Array.isArray(v);
v instanceof MyError;
typeof v?.then === 'function';   // is it thenable?`,
    },
  ],

  /* ─── Collections, iteration and array methods ────────────── */

  'What is the difference between Object and Map?': [
    {
      heading: { en: 'Keys: strings only versus anything', hi: 'Keys: sirf strings vs kuch bhi' },
      body: {
        en: 'A plain object accepts only string and symbol keys — anything else is silently converted with ToString, so 1 and "1" become the same key and every object becomes "[object Object]". A Map stores keys exactly as given, of any type.',
        hi: 'Plain object sirf string aur symbol keys leta hai — baaki sab chup-chaap ToString se badal jaata hai, toh 1 aur "1" ek hi key ban jaate hain aur har object "[object Object]". Map keys bilkul waise rakhta hai jaise di gayi, kisi bhi type ki.',
      },
      code: `const o = {};
o[1] = 'a'; o['1'] = 'b';
Object.keys(o);        // ['1'] — collapsed into one

const m = new Map();
m.set(1, 'a').set('1', 'b');
m.size;                // 2 ✓ genuinely distinct`,
    },
    {
      heading: { en: 'Order is guaranteed only for one of them', hi: 'Order sirf ek mein guarantee hai' },
      body: {
        en: 'A Map iterates in insertion order, always. An object mostly does too, but integer-like keys are pulled to the front and sorted ascending — which surprises people using numeric ids as keys.',
        hi: 'Map hamesha insertion order mein iterate karta hai. Object bhi zyadatar karta hai, par integer-jaisi keys aage khinch kar badhte kram mein lag jaati hain — jo numeric ids ko keys banane walon ko chaunkata hai.',
      },
      code: `const o = { b: 1, 2: 2, a: 3, 1: 4 };
Object.keys(o);        // ['1', '2', 'b', 'a']  ← integers first

const m = new Map([['b',1],[2,2],['a',3],[1,4]]);
[...m.keys()];         // ['b', 2, 'a', 1]  ✓ as inserted`,
    },
    {
      heading: { en: 'Size, and the prototype', hi: 'Size, aur prototype' },
      body: {
        en: 'Map.size is a property and O(1). For an object you must build a key array first, which is O(n) and allocates. An object also inherits from Object.prototype, so keys like "constructor" and "toString" already appear to exist — a real bug source for user-supplied keys.',
        hi: 'Map.size ek property hai aur O(1). Object ke liye pehle keys ka array banana padta hai, jo O(n) hai aur memory leta hai. Object Object.prototype se inherit bhi karta hai, toh "constructor" aur "toString" jaisi keys pehle se maujood lagti hain — user ki di hui keys ke liye asli bug.',
      },
      code: `m.size;                        // O(1)
Object.keys(o).length;         // O(n)

const o = {};
o['toString'];                 // inherited function, not undefined ✗
'toString' in o;               // true ✗

Object.create(null);           // ✓ safe dictionary, no prototype`,
    },
    {
      heading: { en: 'Iterating', hi: 'Iterate karna' },
      body: {
        en: 'A Map is directly iterable, so for...of and spread just work and give you [key, value] pairs. An object is not iterable at all — you go through Object.keys, values or entries.',
        hi: 'Map seedha iterable hai, toh for...of aur spread chal jaate hain aur [key, value] jodiyan dete hain. Object iterable hai hi nahi — Object.keys, values ya entries se jaana padta hai.',
      },
      code: `for (const [k, v] of map) {}          // ✓ directly
for (const [k, v] of Object.entries(o)) {}   // object needs entries

[...map];                              // [[k,v], …]
JSON.stringify(map);                   // '{}'  ✗ not serialisable`,
    },
    {
      heading: { en: 'Performance for frequent changes', hi: 'Baar-baar badlaav pe performance' },
      body: {
        en: 'Maps are built as hash tables and are optimised for adding and deleting keys at runtime. Objects are optimised for a fixed, known shape — engines build hidden classes around that, and repeatedly adding or deleting keys forces them into a slower dictionary mode.',
        hi: 'Maps hash tables ki tarah bane hain aur runtime pe keys jodne-hataane ke liye optimised hain. Objects tay, maloom shape ke liye optimised hain — engines uske aas-paas hidden classes banate hain, aur baar-baar keys jodna ya hataana unhe dheeme dictionary mode mein dhakel deta hai.',
      },
    },
    {
      heading: { en: 'The rule for choosing', hi: 'Chunne ka rule' },
      body: {
        en: 'Use an object for a record with known fields, for anything that must become JSON, and for config. Use a Map for a dynamic dictionary, non-string keys, frequent insertion and deletion, or when order and size matter. If in doubt and the keys come from user data, Map.',
        hi: 'Maloom fields wale record ke liye, JSON banne wali har cheez ke liye, aur config ke liye object. Dynamic dictionary, non-string keys, baar-baar add-delete, ya jab order aur size maayne rakhein tab Map. Shak ho aur keys user data se aa rahi hon toh Map.',
      },
    },
  ],

  'What is the difference between Array and Object?': [
    {
      heading: { en: 'An array IS an object', hi: 'Array ek object HI hai' },
      body: {
        en: 'Start here, because it explains everything else. Arrays are objects with integer-like string keys, a special length property that updates itself, and Array.prototype for methods. typeof [] returning "object" is not a bug — it is the truth.',
        hi: 'Yahin se shuru karo, kyunki isse baaki sab samajh aata hai. Arrays wo objects hain jinki keys integer-jaisi strings hain, ek khaas length property hai jo khud update hoti hai, aur methods ke liye Array.prototype. typeof [] ka "object" dena bug nahi — sach hai.',
      },
      code: `typeof [];              // 'object'
[] instanceof Object;   // true

const a = ['x'];
Object.keys(a);         // ['0'] — string keys, as always
a.length;               // 1 — maintained by the engine`,
    },
    {
      heading: { en: 'Ordered positions versus named fields', hi: 'Kramwar jagah vs naam wale fields' },
      body: {
        en: 'That is the real design difference. An array models a sequence where position carries meaning and order is guaranteed. An object models a record where each value is reached by a meaningful name.',
        hi: 'Asli design ka farq yahi hai. Array ek sequence banata hai jahan jagah ka matlab hota hai aur order guarantee hai. Object ek record banata hai jahan har value ek matlab wale naam se milti hai.',
      },
      code: `const scores = [90, 85, 70];         // "the first, second, third"
const user = { name: 'Asha', age: 30 };  // "the name, the age"`,
    },
    {
      heading: { en: 'length is live, and writable', hi: 'length zinda hai, aur likhi ja sakti hai' },
      body: {
        en: 'An array\'s length always tracks the highest index plus one, and assigning to it truncates or extends the array. This is unique to arrays and is worth demonstrating.',
        hi: 'Array ki length hamesha sabse bade index plus ek ke barabar rehti hai, aur usme assign karne se array kat ya badh jaata hai. Ye sirf arrays mein hota hai aur dikhane laayak hai.',
      },
      code: `const a = [1, 2, 3];
a[9] = 10;   a.length;    // 10 — grew, with holes between
a.length = 1;  a;         // [1] — truncated, data gone
a.length = 0;             // the fastest way to empty in place`,
    },
    {
      heading: { en: 'Methods you get, and lose', hi: 'Jo methods milte hain, aur jo khote hain' },
      body: {
        en: 'Arrays bring map, filter, reduce, sort, slice, splice, find and the rest. Objects have almost nothing on the instance — you work through the static helpers Object.keys, values, entries, assign and fromEntries.',
        hi: 'Arrays map, filter, reduce, sort, slice, splice, find waghera laate hain. Objects ke instance pe lagbhag kuch nahi hota — kaam static helpers Object.keys, values, entries, assign aur fromEntries se chalta hai.',
      },
      code: `[1,2,3].map((n) => n * 2);
Object.entries(o).map(([k, v]) => [k, v * 2]);   // the object route`,
    },
    {
      heading: { en: 'Lookup cost', hi: 'Dhoondhne ki keemat' },
      body: {
        en: 'Finding a value by key in an object is O(1). Finding it in an array by scanning is O(n). If you look items up by id in a loop, build an object or Map first — this is one of the most common real performance fixes.',
        hi: 'Object mein key se value dhoondhna O(1) hai. Array mein scan karke dhoondhna O(n). Agar loop ke andar id se items dhoondh rahe ho toh pehle object ya Map bana lo — ye sabse aam asli performance fix mein se ek hai.',
      },
      code: `users.find((u) => u.id === id);     // O(n) each time

const byId = Object.fromEntries(users.map((u) => [u.id, u]));
byId[id];                            // O(1)`,
    },
    {
      heading: { en: 'Never use an object where you meant an array', hi: 'Jahan array chahiye tha wahan object mat lo' },
      body: {
        en: 'Adding numeric keys to an object gives you no length, no array methods, and no guaranteed order beyond the integer-key rule. And do not add named properties to an array either — they do not count towards length and are skipped by every array method.',
        hi: 'Object mein numeric keys daalne se na length milti hai, na array methods, aur integer-key rule ke aage koi guarantee order nahi. Aur array mein naam wali properties bhi mat jodo — wo length mein nahi ginti aur har array method unhe chhod deta hai.',
      },
      code: `const a = [1, 2];
a.total = 3;
a.length;        // 2 — total is invisible to length
a.map(f);        // ignores total
JSON.stringify(a);   // '[1,2]' — total is lost`,
    },
  ],

  'How do you check if a value is an array?': [
    {
      heading: { en: 'Array.isArray, and nothing else', hi: 'Array.isArray, aur kuch nahi' },
      body: {
        en: 'It is a single call, it is correct for every input, and it works across realms. Every other method has a failure case. This is one of the few questions with a genuinely one-line answer.',
        hi: 'Ek call hai, har input pe sahi hai, aur realms ke paar bhi chalta hai. Baaki har tareeke ka koi na koi failure case hai. Ye un gine-chune sawaalon mein hai jinka jawab sach mein ek line hai.',
      },
      code: `Array.isArray([]);        // true
Array.isArray({});        // false
Array.isArray('abc');     // false
Array.isArray(null);      // false
Array.isArray(arguments); // false — array-LIKE, not an array`,
    },
    {
      heading: { en: 'Why typeof cannot do it', hi: 'typeof ye kyun nahi kar sakta' },
      body: {
        en: 'Arrays are objects, so typeof reports "object" for arrays, plain objects, dates, null and everything else. It cannot distinguish among them, which is the whole reason isArray exists.',
        hi: 'Arrays objects hain, toh typeof arrays, plain objects, dates, null aur baaki sab pe "object" hi kehta hai. Ye unme farq nahi kar sakta, aur isArray ke hone ki poori wajah yahi hai.',
      },
      code: `typeof [];       // 'object'
typeof {};       // 'object'
typeof null;     // 'object'  — all the same`,
    },
    {
      heading: { en: 'Why instanceof fails across realms', hi: 'instanceof realms ke paar kyun fail hota hai' },
      body: {
        en: 'Each iframe, worker or Node vm context has its own Array constructor and its own Array.prototype. An array made in one is not instanceof the Array of another, so the check silently returns false on perfectly good data. Array.isArray checks the internal slot instead and is immune.',
        hi: 'Har iframe, worker ya Node vm context ka apna Array constructor aur apna Array.prototype hota hai. Ek mein bana array doosre ke Array ka instanceof nahi hai, toh check bilkul sahi data pe chup-chaap false de deta hai. Array.isArray internal slot dekhta hai aur isse bacha rehta hai.',
      },
      code: `const other = iframe.contentWindow.eval('[1,2]');
other instanceof Array;   // false ✗
Array.isArray(other);     // true  ✓`,
    },
    {
      heading: { en: 'The old pre-ES5 trick', hi: 'ES5 se pehle wala purana jugaad' },
      body: {
        en: 'Object.prototype.toString.call gives an exact internal tag and was the standard test before isArray existed. Worth knowing because it still works for Date, RegExp, Map and anything else typeof flattens.',
        hi: 'Object.prototype.toString.call theek internal tag deta hai aur isArray se pehle yahi standard test tha. Ye jaanna kaam ka hai kyunki Date, RegExp, Map aur har us cheez pe chalta hai jise typeof chapta kar deta hai.',
      },
      code: `Object.prototype.toString.call([]);   // '[object Array]'
Object.prototype.toString.call({});   // '[object Object]'

const kind = (v) => Object.prototype.toString.call(v).slice(8, -1);`,
    },
    {
      heading: { en: 'Array-like is a different question', hi: 'Array-like alag sawaal hai' },
      body: {
        en: 'A NodeList, the arguments object and a string all have a length and indexes but are not arrays. If what you actually need is "can I iterate or index this", test for that instead — and convert with Array.from when you want real array methods.',
        hi: 'NodeList, arguments object aur string sabme length aur indexes hain par ye arrays nahi hain. Agar tumhe sach mein ye jaanna hai ki "isse iterate ya index kar sakta hoon", toh wahi test karo — aur asli array methods chahiye toh Array.from se convert karo.',
      },
      code: `const isArrayLike = (v) =>
  v != null && typeof v !== 'function' && Number.isInteger(v.length);

Array.from(document.querySelectorAll('li'));   // ✓ a real array
[...arguments];`,
    },
  ],

  'What is the difference between slice() and splice()?': [
    {
      heading: { en: 'One reads, the other rewrites', hi: 'Ek padhta hai, doosra likhta hai' },
      body: {
        en: 'slice returns a copy of a section and leaves the original alone. splice changes the array in place — removing, inserting, or both — and returns the removed elements. That mutation difference is the whole answer.',
        hi: 'slice ek hisse ki copy deta hai aur original ko chhod deta hai. splice array ko wahin badal deta hai — hata kar, jod kar, ya dono — aur hataye gaye elements return karta hai. Wahi mutation ka farq poora jawab hai.',
      },
      code: `const a = [1, 2, 3, 4, 5];

a.slice(1, 3);    // [2, 3]   returned
a;                // [1,2,3,4,5]  ← untouched

a.splice(1, 2);   // [2, 3]   returned (the REMOVED items)
a;                // [1, 4, 5]    ← changed`,
    },
    {
      heading: { en: 'Their arguments mean different things', hi: 'Inke arguments ka matlab alag hai' },
      body: {
        en: 'This is the part people mix up. slice takes start and END index, and the end is exclusive. splice takes start and a COUNT of how many to delete. Same-looking call, completely different result.',
        hi: 'Yahi wo hissa hai jahan log gadbada jaate hain. slice start aur END index leta hai, aur end shaamil nahi hota. splice start aur kitne delete karne hain uski GINTI leta hai. Dikhne mein same call, bilkul alag nateeja.',
      },
      diagram: `slice(1, 3)   →  indexes 1 and 2      (end exclusive)
splice(1, 3)  →  3 items from index 1`,
    },
    {
      heading: { en: 'splice can insert too', hi: 'splice jod bhi sakta hai' },
      body: {
        en: 'Anything after the delete count is inserted at that position. Delete zero and you have a pure insertion; delete some and add some and you have a replacement. This is the only built-in that inserts into the middle of an array.',
        hi: 'Delete count ke baad jo bhi do wo us jagah jod diya jaata hai. Zero delete karo toh sirf insertion; kuch hatao aur kuch jodo toh replacement. Array ke beech mein jodne wala yahi ek built-in hai.',
      },
      code: `const a = [1, 2, 5];
a.splice(2, 0, 3, 4);    // insert only — deletes nothing
a;                       // [1, 2, 3, 4, 5]

a.splice(0, 1, 'x');     // replace
a;                       // ['x', 2, 3, 4, 5]`,
    },
    {
      heading: { en: 'Negative indexes and omitted arguments', hi: 'Negative indexes aur chhode gaye arguments' },
      body: {
        en: 'Both count negatives from the end. slice with no arguments is the idiomatic shallow copy. splice with only a start removes everything from there to the end — which is easy to do by accident.',
        hi: 'Dono negatives ko aakhir se ginte hain. Bina arguments ke slice hi shallow copy ka aam tareeka hai. Sirf start ke saath splice wahan se aakhir tak sab hata deta hai — jo galti se ho jaana aasaan hai.',
      },
      code: `a.slice(-2);       // last two items
a.slice();         // a full shallow copy

a.splice(1);       // ✗ removes EVERYTHING from index 1 onward
a.splice(1, 0);    // removes nothing`,
    },
    {
      heading: { en: 'Both copies are shallow', hi: 'Dono ki copy shallow hai' },
      body: {
        en: 'slice gives you a new array, but for objects the elements are the same references. Changing a nested object through the copy still affects the original. Worth stating — it is the follow-up question.',
        hi: 'slice naya array deta hai, par objects ke liye elements wahi references hain. Copy ke through nested object badlo toh original pe bhi asar hota hai. Ye batana chahiye — yahi agla sawaal hai.',
      },
      code: `const copy = users.slice();
copy[0].name = 'X';
users[0].name;      // 'X' — same object`,
    },
    {
      heading: { en: 'Prefer the non-mutating options', hi: 'Bina mutate wale options behtar hain' },
      body: {
        en: 'Mutation is a bug source in React and anywhere state is shared. toSpliced is the modern immutable twin of splice, and slice with spread covers the rest. Reach for splice only when in-place change is genuinely what you want.',
        hi: 'React mein aur jahan bhi state share hoti hai wahan mutation bug ki jad hai. toSpliced splice ka modern immutable joda hai, aur baaki kaam slice plus spread se ho jaata hai. splice tabhi lo jab wahin par badalna hi sach mein maqsad ho.',
      },
      code: `a.toSpliced(1, 2);            // ✓ returns a new array
[...a.slice(0, i), x, ...a.slice(i)];   // insert, immutably`,
    },
  ],

  'What is the difference between for, for...of, and for...in?': [
    {
      heading: { en: 'Index, value, key', hi: 'Index, value, key' },
      body: {
        en: 'The classic for gives you a counter you control. for...of gives you each VALUE of an iterable. for...in gives you each enumerable KEY of an object, including inherited ones. Pick by which of the three you actually need.',
        hi: 'Classic for tumhe ek counter deta hai jispe tumhara control hai. for...of kisi iterable ki har VALUE deta hai. for...in kisi object ki har enumerable KEY deta hai, inherited samet. Teeno mein se jo chahiye uske hisaab se chuno.',
      },
      code: `for (let i = 0; i < a.length; i++) a[i];   // index
for (const v of a) v;                      // value
for (const k in o) o[k];                   // key`,
    },
    {
      heading: { en: 'The rule: of for arrays, in for objects', hi: 'Rule: arrays pe of, objects pe in' },
      body: {
        en: 'Using for...in on an array is the classic mistake. It gives you string indexes, walks the prototype chain, includes any named properties someone added, and does not guarantee numeric order.',
        hi: 'Array pe for...in use karna classic galti hai. Ye string indexes deta hai, prototype chain pe chalta hai, kisi ki jodi hui naam wali properties bhi laata hai, aur numeric order guarantee nahi karta.',
      },
      code: `const a = ['x', 'y'];
a.extra = 'oops';

for (const i in a) console.log(i);   // '0', '1', 'extra'  ✗
                                     // and they are STRINGS
for (const v of a) console.log(v);   // 'x', 'y'  ✓`,
    },
    {
      heading: { en: 'for...of needs an iterable', hi: 'for...of ko iterable chahiye' },
      body: {
        en: 'It works on anything with a Symbol.iterator: arrays, strings, Map, Set, NodeList, arguments, generators. Plain objects have none, so for...of throws on them — use Object.entries.',
        hi: 'Ye har us cheez pe chalta hai jisme Symbol.iterator ho: arrays, strings, Map, Set, NodeList, arguments, generators. Plain objects mein ye hota hi nahi, toh for...of unpe error deta hai — Object.entries lo.',
      },
      code: `for (const c of 'hi') {}              // ✓ 'h', 'i'
for (const [k, v] of map) {}          // ✓
for (const x of { a: 1 }) {}          // ✗ not iterable

for (const [k, v] of Object.entries(o)) {}   // ✓ the object route`,
    },
    {
      heading: { en: 'Control flow: break, continue, await', hi: 'Control flow: break, continue, await' },
      body: {
        en: 'All three real loops support break and continue and can await inside. forEach supports none of them — you cannot break out of it, and it will not wait for an async callback. That is the main reason to prefer for...of for anything asynchronous.',
        hi: 'Teeno asli loops break aur continue sambhaalte hain aur andar await kar sakte hain. forEach inme se kuch nahi karta — usse break nahi kar sakte, aur wo async callback ka intezaar nahi karega. Kisi bhi async kaam ke liye for...of chunne ki asli wajah yahi hai.',
      },
      code: `for (const id of ids) {
  const r = await fetchOne(id);       // ✓ actually waits
  if (r.done) break;                  // ✓
}

ids.forEach(async (id) => { await fetchOne(id); });
// ✗ returns immediately; nothing is awaited`,
    },
    {
      heading: { en: 'When the classic for still wins', hi: 'Classic for kab abhi bhi jeetta hai' },
      body: {
        en: 'When you need the index, when you step by something other than one, when you iterate backwards, or when you are mutating the array as you go. It is also the fastest, though that rarely matters outside hot loops.',
        hi: 'Jab index chahiye, jab ek se alag step lena ho, jab ulta iterate karna ho, ya jab chalte-chalte array badal rahe ho. Ye sabse tez bhi hai, waise hot loops ke bahar ye kam hi maayne rakhta hai.',
      },
      code: `for (let i = a.length - 1; i >= 0; i--) {
  if (shouldRemove(a[i])) a.splice(i, 1);   // safe: going backwards
}

for (const [i, v] of a.entries()) {}   // if you want both, modern way`,
    },
    {
      heading: { en: 'Guarding for...in', hi: 'for...in ko sambhalna' },
      body: {
        en: 'If you must use it, filter to own properties. In practice Object.keys or Object.entries is clearer and does the same job, so for...in is rarely the right choice at all.',
        hi: 'Agar use karna hi hai toh sirf own properties chhaano. Asal mein Object.keys ya Object.entries saaf hai aur wahi kaam karta hai, toh for...in shaayad hi kabhi sahi chunav hota hai.',
      },
      code: `for (const k in o) {
  if (!Object.hasOwn(o, k)) continue;   // skip inherited
}
Object.keys(o).forEach((k) => {});      // ✓ simpler`,
    },
  ],

  'What is the difference between includes() and indexOf()?': [
    {
      heading: { en: 'A boolean versus a position', hi: 'Boolean vs jagah' },
      body: {
        en: 'includes answers "is it there?" with true or false. indexOf answers "where is it?" with the index, or -1 when it is missing. If you only care about presence, includes says so directly.',
        hi: 'includes "hai kya?" ka jawab true ya false mein deta hai. indexOf "kahan hai?" ka jawab index se deta hai, ya na mile toh -1. Sirf maujoodgi ki fikr ho toh includes seedha yahi kehta hai.',
      },
      code: `[1,2,3].includes(2);   // true
[1,2,3].indexOf(2);    // 1
[1,2,3].indexOf(9);    // -1

if (arr.indexOf(x) !== -1) {}   // the old idiom
if (arr.includes(x)) {}         // ✓ says what it means`,
    },
    {
      heading: { en: 'NaN is the behavioural difference', hi: 'Vyavhaar ka farq NaN hai' },
      body: {
        en: 'indexOf uses strict equality, and NaN !== NaN, so it can never find a NaN. includes uses SameValueZero, under which NaN does match itself. This is the reason includes was added and the answer interviewers want.',
        hi: 'indexOf strict equality use karta hai, aur NaN !== NaN, toh wo NaN kabhi dhoondh hi nahi sakta. includes SameValueZero use karta hai, jisme NaN khud se match karta hai. includes isiliye joda gaya tha aur interviewers yahi jawab chahte hain.',
      },
      code: `[NaN].indexOf(NaN);     // -1    ✗
[NaN].includes(NaN);    // true  ✓

[0].includes(-0);       // true — both treat 0 and -0 as equal
[0].indexOf(-0);        // 0`,
    },
    {
      heading: { en: 'Holes in sparse arrays', hi: 'Sparse arrays ke holes' },
      body: {
        en: 'A second, smaller difference. indexOf skips holes entirely; includes treats a hole as undefined and will find it. Rare in practice, but it is the kind of detail a thorough interviewer probes.',
        hi: 'Doosra, chhota farq. indexOf holes ko poori tarah chhod deta hai; includes hole ko undefined maan kar dhoondh leta hai. Asal mein ye kam aata hai, par gehra interviewer isi tarah ki bareeki kuredta hai.',
      },
      code: `[1, , 3].includes(undefined);   // true
[1, , 3].indexOf(undefined);    // -1`,
    },
    {
      heading: { en: 'Both compare by reference for objects', hi: 'Objects ke liye dono reference se compare karte hain' },
      body: {
        en: 'Neither looks inside an object, so a freshly written literal will never be found. To search by content you need find or some with your own predicate.',
        hi: 'Koi bhi object ke andar nahi jhaankta, toh abhi likha hua literal kabhi nahi milega. Content se dhoondhna ho toh apne predicate ke saath find ya some chahiye.',
      },
      code: `users.includes({ id: 1 });              // false ✗
users.some((u) => u.id === 1);          // true  ✓
users.findIndex((u) => u.id === 1);     // the index`,
    },
    {
      heading: { en: 'Both exist on strings too', hi: 'Dono strings pe bhi hain' },
      body: {
        en: 'String.includes checks for a substring and reads far better than the old indexOf comparison. Strings also have startsWith and endsWith, which are clearer still when that is what you mean.',
        hi: 'String.includes substring dhoondhta hai aur purane indexOf wale comparison se kahin behtar padha jaata hai. Strings pe startsWith aur endsWith bhi hain, jo aur bhi saaf hain jab wahi matlab ho.',
      },
      code: `'hello'.includes('ell');     // true
'hello'.indexOf('ell');      // 1
'hello'.startsWith('he');    // true`,
    },
    {
      heading: { en: 'Both are O(n)', hi: 'Dono O(n) hain' },
      body: {
        en: 'Each scans the array. Inside a loop that makes the whole thing O(n²). When you are testing membership repeatedly, build a Set once and use has — that is the answer to the performance follow-up.',
        hi: 'Dono array scan karte hain. Loop ke andar isse poora kaam O(n²) ho jaata hai. Jab baar-baar membership check karni ho toh ek baar Set banao aur has use karo — performance wale follow-up ka jawab yahi hai.',
      },
      code: `// ✗ O(n × m)
const dupes = a.filter((x) => b.includes(x));

// ✓ O(n + m)
const setB = new Set(b);
const dupes = a.filter((x) => setB.has(x));`,
    },
  ],

  'What is a function declaration?': [
    {
      heading: { en: 'The form and the rule', hi: 'Roop aur rule' },
      body: {
        en: 'A function declaration starts a statement with the function keyword and has a name. Because it is a statement rather than an expression, the engine registers it — name and full body — during the creation phase of the scope.',
        hi: 'Function declaration wo hai jo statement ki shuruaat function keyword se karta hai aur uska naam hota hai. Ye expression nahi statement hai, isliye engine usse scope ke creation phase mein register kar leta hai — naam aur poori body dono.',
      },
      code: `function greet(name) {
  return 'hello ' + name;
}`,
    },
    {
      heading: { en: 'Fully hoisted — you can call it first', hi: 'Poora hoisted — pehle call kar sakte ho' },
      body: {
        en: 'This is the property that distinguishes it. Both the name and the body are available before the definition line runs, which is why helper functions can sit at the bottom of a file and the main logic at the top.',
        hi: 'Yahi wo baat hai jo isse alag karti hai. Naam aur body dono definition line chalne se pehle available hote hain, isiliye helper functions file ke neeche baith sakte hain aur main logic upar.',
      },
      code: `console.log(add(2, 3));   // 5 ✓ works
function add(a, b) { return a + b; }`,
    },
    {
      heading: { en: 'It creates a binding in its scope', hi: 'Ye apne scope mein ek binding banata hai' },
      body: {
        en: 'The name becomes a variable in the enclosing scope, so it can be reassigned or shadowed like any other. At the top level of a classic script it also becomes a property of the global object, which modules do not do.',
        hi: 'Naam aas-paas ke scope mein ek variable ban jaata hai, toh usse kisi aur ki tarah reassign ya shadow kiya ja sakta hai. Classic script ke top level pe ye global object ki property bhi ban jaata hai, jo modules nahi karte.',
      },
      code: `function f() { return 1; }
f = 2;          // ✓ allowed — it is just a binding
typeof f;       // 'number'`,
    },
    {
      heading: { en: 'The name is visible inside itself', hi: 'Naam apne andar dikhta hai' },
      body: {
        en: 'A declaration can call itself by name, which is what makes plain recursion straightforward. Note that reassigning the outer binding breaks that, which is one argument for a named function expression in library code.',
        hi: 'Declaration khud ko naam se call kar sakta hai, isi se saadi recursion aasaan hoti hai. Dhyaan do bahar wali binding badal do toh ye toot jaata hai, aur library code mein named function expression chunne ki ek wajah yahi hai.',
      },
      code: `function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }`,
    },
    {
      heading: { en: 'Inside a block, behaviour gets murky', hi: 'Block ke andar vyavhaar dhundhla ho jaata hai' },
      body: {
        en: 'In strict mode a declaration inside a block is scoped to that block. In sloppy mode engines apply legacy web-compatibility rules that differ. Do not declare functions inside if statements — assign a const instead.',
        hi: 'Strict mode mein block ke andar ka declaration usi block tak seemit hai. Sloppy mode mein engines purane web-compatibility rules lagate hain jo alag hain. if ke andar functions declare mat karo — uski jagah const assign karo.',
      },
      code: `if (x) {
  function f() {}      // ✗ avoid — behaviour varies
}
const f = x ? () => 1 : () => 2;   // ✓ predictable`,
    },
  ],

  'What is a function expression?': [
    {
      heading: { en: 'A function used as a value', hi: 'Function jo value ki tarah use ho' },
      body: {
        en: 'A function expression appears where a value is expected — on the right of an assignment, as an argument, inside an object. The name is optional, and if you omit it the function is anonymous.',
        hi: 'Function expression wahan aata hai jahan value ki ummeed ho — assignment ke daayein, argument ke roop mein, object ke andar. Naam optional hai, aur na do toh function anonymous ho jaata hai.',
      },
      code: `const greet = function (name) { return 'hi ' + name; };
setTimeout(function () {}, 0);
const o = { run: function () {} };`,
    },
    {
      heading: { en: 'Hoisting follows the variable, not the function', hi: 'Hoisting variable ke peeche chalti hai, function ke nahi' },
      body: {
        en: 'The function itself is not hoisted — only the variable it is assigned to. With const you get a temporal dead zone error before the line; with var you get "is not a function", because the name exists but holds undefined.',
        hi: 'Function khud hoist nahi hota — sirf wo variable jisme wo assign hua. const ke saath line se pehle temporal dead zone error milta hai; var ke saath "is not a function", kyunki naam hai par usme undefined pada hai.',
      },
      code: `f();                     // ✗ TypeError: f is not a function
var f = function () {};

g();                     // ✗ ReferenceError (TDZ)
const g = function () {};`,
    },
    {
      heading: { en: 'Named function expressions', hi: 'Named function expressions' },
      body: {
        en: 'You can give an expression a name. That name is visible ONLY inside the function, which gives you safe recursion and a useful label in stack traces. It does not leak into the surrounding scope.',
        hi: 'Expression ko naam de sakte ho. Wo naam SIRF function ke andar dikhta hai, jisse safe recursion milti hai aur stack traces mein ek kaam ka label. Wo bahar wale scope mein nahi jaata.',
      },
      code: `const fact = function inner(n) {
  return n <= 1 ? 1 : n * inner(n - 1);   // ✓ safe self-reference
};
inner;    // ✗ ReferenceError — not visible outside`,
    },
    {
      heading: { en: 'Why this is the form to prefer', hi: 'Yahi roop kyun chunna chahiye' },
      body: {
        en: 'With const, a function cannot be used before it is defined and cannot be reassigned later. That turns two classes of mistake into immediate errors, and it forces a file to read top to bottom in dependency order.',
        hi: 'const ke saath function apni definition se pehle use nahi ho sakta aur baad mein badla nahi ja sakta. Isse do tarah ki galtiyan turant error ban jaati hain, aur file upar se neeche dependency ke kram mein padhni padti hai.',
      },
      code: `const handler = () => {};
handler = somethingElse;   // ✗ TypeError — caught immediately`,
    },
    {
      heading: { en: 'Where an expression is the only option', hi: 'Jahan expression hi ek option hai' },
      body: {
        en: 'Passing a function as an argument, returning one, storing one in an object or array, and IIFEs all require an expression. A declaration is a statement and cannot appear in those positions.',
        hi: 'Function ko argument dena, return karna, object ya array mein rakhna, aur IIFEs — in sabme expression hi chahiye. Declaration statement hai aur in jagahon pe aa hi nahi sakta.',
      },
      code: `arr.map(function (x) { return x * 2; });
return function () {};
(function () {})();`,
    },
  ],

  'What is a callback function?': [
    {
      heading: { en: 'A function you hand over to be called', hi: 'Ek function jo tum bulane ke liye de dete ho' },
      body: {
        en: 'A callback is simply a function passed as an argument, so that other code can invoke it at the right moment. It exists because functions are first-class values in JavaScript — nothing more exotic than that.',
        hi: 'Callback bas ek function hai jo argument ki tarah diya jaata hai, taaki doosra code usse sahi waqt pe chala sake. Ye isliye mumkin hai kyunki JavaScript mein functions first-class values hain — isse zyada kuch nahi.',
      },
      code: `[1,2,3].map((n) => n * 2);              // called per element
btn.addEventListener('click', handle);   // called on click
setTimeout(done, 1000);                  // called after a delay`,
    },
    {
      heading: { en: 'Synchronous and asynchronous callbacks', hi: 'Synchronous aur asynchronous callbacks' },
      body: {
        en: 'People assume callback means async. It does not. Array callbacks run immediately, in the same tick, before the method returns. Timer and I/O callbacks are queued and run later. Knowing which kind you have decides whether code after the call has run yet.',
        hi: 'Log maan lete hain callback matlab async. Aisa nahi hai. Array ke callbacks turant chalte hain, usi tick mein, method ke return hone se pehle. Timer aur I/O ke callbacks queue mein jaate hain aur baad mein chalte hain. Kaunsa hai ye jaan kar hi pata chalta hai ki call ke baad ka code chala ya nahi.',
      },
      code: `[1,2].forEach(() => console.log('a'));
console.log('b');
// a a b   ← synchronous

setTimeout(() => console.log('a'));
console.log('b');
// b a     ← asynchronous`,
    },
    {
      heading: { en: 'Pass the function, do not call it', hi: 'Function do, usse call mat karo' },
      body: {
        en: 'This is the most common beginner bug. Adding parentheses runs the function immediately and passes its return value — usually undefined. Pass the reference, or wrap the call in an arrow when you need to supply arguments.',
        hi: 'Ye sabse aam beginner bug hai. Brackets lagate hi function turant chal jaata hai aur uski return value chali jaati hai — aam taur pe undefined. Reference do, ya arguments dene hon toh call ko arrow mein lapet do.',
      },
      code: `setTimeout(greet, 1000);        // ✓
setTimeout(greet(), 1000);      // ✗ runs now

btn.onclick = () => greet('Asha');   // ✓ arguments, deferred`,
    },
    {
      heading: { en: 'The error-first convention', hi: 'Error-first convention' },
      body: {
        en: 'Node standardised on passing the error as the first argument and the result after it. It exists because try/catch cannot cross an async boundary, so the error has to travel as data instead.',
        hi: 'Node ne ye standard banaya ki error pehla argument ho aur result uske baad. Ye isliye hai kyunki try/catch async boundary paar nahi kar sakta, toh error ko data ki tarah safar karna padta hai.',
      },
      code: `fs.readFile('a.txt', (err, data) => {
  if (err) return handle(err);
  use(data);
});

try {
  setTimeout(() => { throw new Error('x'); });
} catch (e) {}      // ✗ never catches it`,
    },
    {
      heading: { en: 'Losing this', hi: 'this kho jaana' },
      body: {
        en: 'Passing a method detaches it from its object, so this is undefined when the callback finally runs. Bind it or wrap it in an arrow — this is behind a large share of "cannot read property of undefined" errors.',
        hi: 'Method pass karne se wo apne object se alag ho jaata hai, toh callback chalte waqt this undefined hota hai. Usse bind karo ya arrow mein lapet do — "cannot read property of undefined" ka bada hissa isi se aata hai.',
      },
      code: `btn.addEventListener('click', user.greet);             // ✗
btn.addEventListener('click', user.greet.bind(user));   // ✓
btn.addEventListener('click', () => user.greet());      // ✓`,
    },
    {
      heading: { en: 'When to move past callbacks', hi: 'Callbacks se aage kab badhein' },
      body: {
        en: 'For a one-shot async result, a promise is better: it guarantees a single settlement, chains without nesting, and works with try/catch through await. Callbacks remain the right shape for repeating events, where a promise simply does not fit.',
        hi: 'Ek baar aane wale async result ke liye promise behtar hai: wo ek hi settlement guarantee karta hai, bina nesting chain hota hai, aur await se try/catch ke saath chalta hai. Baar-baar hone wale events ke liye callbacks hi sahi shape hain, jahan promise fit hi nahi hota.',
      },
    },
  ],

  'What are first-class functions?': [
    {
      heading: { en: 'Functions are values like any other', hi: 'Functions baaki values jaise hi hain' },
      body: {
        en: 'A language has first-class functions when functions can be stored in variables, passed as arguments, returned from other functions, and kept in data structures. JavaScript can do all four, which is why so much of the language works the way it does.',
        hi: 'Kisi language mein first-class functions tab hote hain jab functions ko variables mein rakha ja sake, arguments ki tarah bheja ja sake, doosre functions se return kiya ja sake, aur data structures mein rakha ja sake. JavaScript chaaron kar sakti hai, aur isiliye language ka itna hissa aise chalta hai.',
      },
      code: `const f = function () {};        // stored
arr.map(f);                       // passed
const g = () => f;                // returned
const handlers = { click: f };    // in a data structure`,
    },
    {
      heading: { en: 'Functions are objects', hi: 'Functions objects hain' },
      body: {
        en: 'A function is a callable object, so it has properties and can be given more. That is how name and length work, and how libraries hang metadata on functions.',
        hi: 'Function ek callable object hai, toh uske paas properties hoti hain aur aur bhi di ja sakti hain. Isi se name aur length chalte hain, aur libraries functions pe metadata tangti hain.',
      },
      code: `function add(a, b) { return a + b; }

add.name;        // 'add'
add.length;      // 2 — declared parameters
add.cache = {};  // ✓ you can add your own
typeof add;      // 'function'`,
    },
    {
      heading: { en: 'This is what makes higher-order functions possible', hi: 'Isi se higher-order functions mumkin hain' },
      body: {
        en: 'A higher-order function takes or returns a function. Without first-class functions there is no map, no filter, no addEventListener, no promises. The concept is the foundation; higher-order functions are what you build on it.',
        hi: 'Higher-order function ek function leta ya deta hai. First-class functions ke bina na map hai, na filter, na addEventListener, na promises. Ye concept neev hai; higher-order functions uspe bani cheez hain.',
      },
      code: `const twice = (fn) => (x) => fn(fn(x));
twice((n) => n + 1)(5);   // 7`,
    },
    {
      heading: { en: 'Returning functions gives you closures', hi: 'Function return karne se closures milte hain' },
      body: {
        en: 'A returned function keeps access to the scope it was created in. That combination — first-class functions plus closures — is what makes factories, memoisation, currying, debounce and the module pattern possible.',
        hi: 'Return kiya gaya function us scope tak pahunch rakhta hai jisme wo bana tha. Yahi jodi — first-class functions aur closures — factories, memoisation, currying, debounce aur module pattern ko mumkin banati hai.',
      },
      code: `const counter = () => { let n = 0; return () => ++n; };
const next = counter();
next(); next();   // 1, 2`,
    },
    {
      heading: { en: 'The related terms, briefly', hi: 'Jude hue shabd, sankshep mein' },
      body: {
        en: 'First-class function means functions are values. Higher-order function means a function that takes or returns one. First-class citizen is the general term for any value with no restrictions. Interviewers often ask you to separate the first two.',
        hi: 'First-class function matlab functions values hain. Higher-order function matlab wo function jo function leta ya deta hai. First-class citizen har us value ke liye aam shabd hai jispe koi rok nahi. Interviewers aksar pehle do ko alag karne ko kehte hain.',
      },
    },
  ],

  'What is an IIFE?': [
    {
      heading: { en: 'Define and run in one go', hi: 'Ek saath define karo aur chalao' },
      body: {
        en: 'An Immediately Invoked Function Expression is a function that runs the moment it is defined. Wrap the function in parentheses to make it an expression, then call it. Nothing more to it.',
        hi: 'Immediately Invoked Function Expression wo function hai jo define hote hi chal jaata hai. Function ko brackets mein lapet kar expression banao, phir usse call kar do. Bas itni si baat hai.',
      },
      code: `(function () {
  console.log('runs now');
})();

(() => { console.log('arrow form'); })();

(async () => { await main(); })();   // the common modern use`,
    },
    {
      heading: { en: 'Why the wrapping parentheses are needed', hi: 'Lapetne wale brackets kyun chahiye' },
      body: {
        en: 'A statement beginning with the function keyword is parsed as a declaration, and a declaration cannot be invoked. The parentheses force the parser into expression position. Any operator that does the same works — a leading ! or + is sometimes used.',
        hi: 'Jo statement function keyword se shuru ho use declaration padha jaata hai, aur declaration ko invoke nahi kar sakte. Brackets parser ko expression position mein le aate hain. Wahi kaam karne wala koi bhi operator chalta hai — kabhi-kabhi shuruaat mein ! ya + use hota hai.',
      },
      code: `function () {}();      // ✗ SyntaxError
(function () {})();     // ✓
!function () {}();      // ✓ also works
void function () {}();  // ✓`,
    },
    {
      heading: { en: 'What it was for: a private scope', hi: 'Ye kis liye tha: ek private scope' },
      body: {
        en: 'Before ES6 there was no block scope, so var leaked out of every if and for. An IIFE was the only way to create a scope that did not pollute the global namespace. Library code was wrapped in one as a matter of course.',
        hi: 'ES6 se pehle block scope tha hi nahi, toh var har if aur for se bahar nikal jaata tha. IIFE hi ek aisa tareeka tha jisse aisa scope bane jo global namespace ganda na kare. Library code aadat ke taur pe isme lapet diya jaata tha.',
      },
      code: `var counter = (function () {
  var count = 0;                    // private
  return { inc: function () { return ++count; } };
})();
counter.count;   // undefined ✓ hidden`,
    },
    {
      heading: { en: 'Mostly obsolete now — say so', hi: 'Ab zyadatar bekaar — ye bata do' },
      body: {
        en: 'let and const give you block scope, and ES modules already have their own scope with nothing leaking to the global object. Reaching for an IIFE for isolation in modern code is a sign of dated habits.',
        hi: 'let aur const block scope dete hain, aur ES modules ka apna scope hota hai jisme se kuch bhi global object pe nahi jaata. Modern code mein isolation ke liye IIFE uthana purani aadat ka nishaan hai.',
      },
      code: `{ const secret = 1; }      // ✓ a block is enough
// and every ES module is already private by default`,
    },
    {
      heading: { en: 'Where it is still the right tool', hi: 'Ye ab bhi kahan sahi auzaar hai' },
      body: {
        en: 'Top-level await in a CommonJS file, where an async IIFE is the standard workaround. Running setup code exactly once for its side effects. And computing a value that needs several statements, without leaking the intermediates.',
        hi: 'CommonJS file mein top-level await, jahan async IIFE standard hal hai. Setup code ko side effects ke liye theek ek baar chalana. Aur aisi value banana jisme kai statements lagein, bina beech ke variables bahar bhejay.',
      },
      code: `const config = (() => {
  const raw = readFile();
  const parsed = JSON.parse(raw);
  return normalise(parsed);        // raw and parsed stay hidden
})();`,
    },
    {
      heading: { en: 'The semicolon trap', hi: 'Semicolon ka jaal' },
      body: {
        en: 'A missing semicolon on the previous line makes the parser read your parentheses as a function call on whatever came before. This is the classic argument for starting an IIFE line with a leading semicolon in code without a formatter.',
        hi: 'Pichhli line pe semicolon na ho toh parser tumhare brackets ko pehle wale par function call samajh leta hai. Formatter ke bina wale code mein IIFE ki line semicolon se shuru karne ki classic wajah yahi hai.',
      },
      code: `const a = 1
(function () {})()      // ✗ parsed as 1(function…) → TypeError

;(function () {})()     // ✓ defensive leading semicolon`,
    },
  ],

  'What is recursion?': [
    {
      heading: { en: 'A function that calls itself', hi: 'Aisa function jo khud ko bulaye' },
      body: {
        en: 'Recursion solves a problem by solving a smaller version of the same problem. Two parts are mandatory: a base case that stops, and a recursive case that moves strictly closer to it. Miss either and you get a stack overflow.',
        hi: 'Recursion kisi problem ko usi problem ke chhote roop ko hal karke sulajhata hai. Do hisse zaroori hain: ek base case jo rokta hai, aur ek recursive case jo uske aur kareeb le jaata hai. Ek bhi chhoot jaaye toh stack overflow milta hai.',
      },
      code: `function factorial(n) {
  if (n <= 1) return 1;              // base case
  return n * factorial(n - 1);       // recursive case
}
factorial(5);   // 120`,
    },
    {
      heading: { en: 'Watch it on the call stack', hi: 'Call stack pe isse dekho' },
      body: {
        en: 'Each call pushes a frame and waits. Nothing multiplies until the base case returns and the stack unwinds. Seeing this makes both the memory cost and the ordering obvious.',
        hi: 'Har call ek frame push karti hai aur intezaar karti hai. Kuch bhi guna nahi hota jab tak base case return na kare aur stack wapas na khule. Ye dekh lo toh memory ki keemat aur kram dono saaf ho jaate hain.',
      },
      diagram: `factorial(3)
  └ 3 * factorial(2)
        └ 2 * factorial(1)
              └ 1            ← base case returns
        └ 2 * 1 = 2
  └ 3 * 2 = 6`,
    },
    {
      heading: { en: 'The stack limit is real', hi: 'Stack ki seema asli hai' },
      body: {
        en: 'Every frame costs memory, and browsers cap the depth at roughly ten thousand. A recursive function over a large list will throw RangeError. Any recursion can be rewritten as a loop with an explicit stack, and for deep data you should.',
        hi: 'Har frame memory leta hai, aur browsers depth ko lagbhag das hazaar tak seemit karte hain. Badi list pe recursive function RangeError dega. Har recursion ko explicit stack wale loop mein badla ja sakta hai, aur gehre data ke liye badalna hi chahiye.',
      },
      code: `function count(n) { return n === 0 ? 0 : count(n - 1); }
count(100000);   // ✗ RangeError: Maximum call stack size exceeded`,
    },
    {
      heading: { en: 'Tail calls are not optimised in practice', hi: 'Tail calls asal mein optimise nahi hote' },
      body: {
        en: 'ES6 specified tail-call optimisation, which would reuse the frame when the recursive call is the last thing a function does. Only Safari ever shipped it. Do not rely on it — say this in an interview and it will land.',
        hi: 'ES6 ne tail-call optimisation specify ki thi, jo tab frame dobara use karti jab recursive call function ka aakhri kaam ho. Sirf Safari ne isse ship kiya. Ispe bharosa mat karo — interview mein ye keh doge toh asar padega.',
      },
      code: `function sum(n, acc = 0) {
  if (n === 0) return acc;
  return sum(n - 1, acc + n);   // a tail call — still overflows in V8
}`,
    },
    {
      heading: { en: 'Where recursion genuinely wins', hi: 'Recursion sach mein kahan jeetta hai' },
      body: {
        en: 'Anything tree-shaped: the DOM, a file system, nested JSON, a comment thread. A loop over a tree needs you to manage a stack by hand; recursion lets the call stack do it. That readability is the reason to choose it.',
        hi: 'Har wo cheez jo tree jaisi ho: DOM, file system, nested JSON, comment thread. Tree pe loop chalane ke liye stack khud sambhalna padta hai; recursion mein call stack wo kaam kar deta hai. Padhne mein aasaani hi isse chunne ki wajah hai.',
      },
      code: `function flatten(arr) {
  return arr.reduce(
    (out, v) => out.concat(Array.isArray(v) ? flatten(v) : v),
    []
  );
}
flatten([1, [2, [3, [4]]]]);   // [1,2,3,4]`,
    },
    {
      heading: { en: 'Memoise when subproblems repeat', hi: 'Jab subproblems dohraayein toh memoise karo' },
      body: {
        en: 'Naive fibonacci recomputes the same values exponentially. Caching results by input collapses it to linear time. This is the bridge between recursion and dynamic programming, and it is a very common follow-up.',
        hi: 'Saada fibonacci wahi values exponentially dobara nikalta hai. Input pe results cache karo toh ye linear time ho jaata hai. Yahi recursion aur dynamic programming ka pul hai, aur ye bahut aam follow-up hai.',
      },
      code: `const memo = new Map();
function fib(n) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const v = fib(n - 1) + fib(n - 2);
  memo.set(n, v);
  return v;
}
fib(50);   // instant; without the memo, effectively never`,
    },
  ],

  /* ─── Parameters, scope and closures ──────────────────────── */

  'What are default parameters?': [
    {
      heading: { en: 'A fallback written in the signature', hi: 'Signature mein likha hua fallback' },
      body: {
        en: 'Assign a value in the parameter list and it is used when that argument is undefined. Before ES6 you did this by hand with || inside the body, which broke on 0 and empty strings.',
        hi: 'Parameter list mein value assign kar do aur jab wo argument undefined ho tab wahi use hoti hai. ES6 se pehle ye body ke andar || se haath se hota tha, jo 0 aur khaali strings pe toot jaata tha.',
      },
      code: `function greet(name = 'guest') { return 'hi ' + name; }
greet();          // 'hi guest'
greet('Asha');    // 'hi Asha'

// the old way, and its bug:
function old(n) { n = n || 10; return n; }
old(0);           // 10 ✗ zero was a real value`,
    },
    {
      heading: { en: 'Only undefined triggers it', hi: 'Sirf undefined isse chalata hai' },
      body: {
        en: 'Not null, not 0, not "", not false, not NaN. Those are real values and are passed through. This is the single most-tested detail about defaults.',
        hi: 'Na null, na 0, na "", na false, na NaN. Ye asli values hain aur waise hi aage jaati hain. Defaults ke baare mein sabse zyada test kiya jaane wala detail yahi hai.',
      },
      code: `function f(x = 10) { return x; }
f();            // 10
f(undefined);   // 10  ← explicit undefined still triggers it
f(null);        // null
f(0);           // 0
f('');          // ''
f(NaN);         // NaN`,
    },
    {
      heading: { en: 'Evaluated at call time, every time', hi: 'Har call pe, call ke waqt evaluate hote hain' },
      body: {
        en: 'The default expression runs afresh on each invocation that needs it — not once when the function is defined. So a default of [] or {} gives you a brand new one per call, which is exactly the behaviour Python programmers expect and do not get.',
        hi: 'Default expression har us call pe naye sire se chalta hai jise uski zaroorat ho — function define hote waqt ek baar nahi. Toh [] ya {} ka default har call pe bilkul naya deta hai, jo Python walon ki ummeed hai par unhe milta nahi.',
      },
      code: `function push(item, list = []) { list.push(item); return list; }
push(1);   // [1]
push(2);   // [2]  ✓ a fresh array each time`,
    },
    {
      heading: { en: 'Later defaults can use earlier parameters', hi: 'Baad ke defaults pehle wale parameters use kar sakte hain' },
      body: {
        en: 'Parameters initialise left to right, so a default may reference anything already initialised. Referencing something to its right throws, because that parameter is still in its temporal dead zone.',
        hi: 'Parameters left se right initialise hote hain, toh koi bhi default un cheezon ko use kar sakta hai jo pehle initialise ho chuki hain. Apne right wali cheez use karo toh error aata hai, kyunki wo parameter abhi TDZ mein hai.',
      },
      code: `function area(w, h = w) { return w * h; }
area(5);                  // 25 ✓

function bad(a = b, b = 2) { return a; }
bad();                    // ✗ ReferenceError`,
    },
    {
      heading: { en: 'Two side effects worth knowing', hi: 'Do side effects jo jaanne laayak hain' },
      body: {
        en: 'A default makes that parameter and everything after it stop counting towards fn.length, which breaks naive currying. And a function with defaults gets its own parameter scope, so it cannot be in strict-mode-with-"use strict"-in-body form.',
        hi: 'Default lagate hi wo parameter aur uske baad ke sab fn.length mein ginna band ho jaate hain, jisse saadi currying toot jaati hai. Aur defaults wale function ko apna parameter scope milta hai, isliye body mein "use strict" wala roop uspe nahi chalta.',
      },
      code: `((a, b) => 0).length;         // 2
((a, b = 1) => 0).length;     // 1
((a = 1, b) => 0).length;     // 0`,
    },
    {
      heading: { en: 'Defaults on a destructured object', hi: 'Destructured object pe defaults' },
      body: {
        en: 'The common real-world pattern for options. Note you need TWO levels: a default for each property, and a default for the whole object so that calling with no argument at all still works.',
        hi: 'Options ke liye asli duniya ka aam pattern. Dhyaan do DO level chahiye: har property ka default, aur poore object ka default taaki bina kisi argument ke call karna bhi chale.',
      },
      code: `function init({ retries = 3, delay = 100 } = {}) {
  return [retries, delay];
}
init();                  // [3, 100] ✓ works thanks to the = {}
init({ retries: 5 });    // [5, 100]`,
    },
  ],

  'What are rest parameters?': [
    {
      heading: { en: 'Collect the leftovers into a real array', hi: 'Bache hue ko ek asli array mein ikattha karo' },
      body: {
        en: 'Three dots in a parameter list gather every remaining argument into an Array. Named parameters take their share first; rest takes whatever is left, and it is empty rather than undefined when there is nothing.',
        hi: 'Parameter list mein teen dots baaki saare arguments ko ek Array mein ikattha kar lete hain. Naam wale parameters pehle apna hissa lete hain; rest jo bache wo leta hai, aur kuch na ho toh wo khaali hota hai, undefined nahi.',
      },
      code: `function sum(first, ...rest) { return [first, rest]; }

sum(1, 2, 3);   // [1, [2, 3]]
sum(1);         // [1, []]   ← empty array, not undefined`,
    },
    {
      heading: { en: 'Why it replaced arguments', hi: 'Isne arguments ki jagah kyun li' },
      body: {
        en: 'The arguments object is array-LIKE: it has length and indexes but none of the array methods, so you had to convert it first. It also does not exist in arrow functions. Rest gives you a genuine Array with none of that friction.',
        hi: 'arguments object array-JAISA hai: usme length aur indexes hain par array methods koi nahi, toh pehle convert karna padta tha. Aur arrow functions mein wo hota hi nahi. Rest ek asli Array deta hai, bina kisi jhanjhat ke.',
      },
      code: `function old() {
  return Array.prototype.slice.call(arguments).map(f);   // ✗ clumsy
}
function modern(...args) { return args.map(f); }         // ✓

const arrow = (...args) => args;      // ✓ rest works in arrows
const bad = () => arguments;          // ✗ no arguments object`,
    },
    {
      heading: { en: 'It must come last, and there is only one', hi: 'Ye aakhri hona chahiye, aur ek hi ho sakta hai' },
      body: {
        en: 'Both rules are enforced at parse time, so you get a SyntaxError rather than a runtime surprise. It also cannot have a default value — an empty array already is the default.',
        hi: 'Dono rules parse ke waqt hi lagte hain, toh runtime surprise ki jagah SyntaxError milta hai. Iski default value bhi nahi ho sakti — khaali array pehle se hi default hai.',
      },
      code: `function a(...x, y) {}       // ✗ SyntaxError — must be last
function b(...x, ...y) {}    // ✗ only one
function c(...x = []) {}     // ✗ no default needed or allowed`,
    },
    {
      heading: { en: 'It does not count towards length', hi: 'Ye length mein nahi ginta' },
      body: {
        en: 'fn.length reports only the parameters before the first default or rest. This is why a generic curry implementation based on fn.length silently breaks on variadic functions — a good detail to mention.',
        hi: 'fn.length sirf pehle default ya rest se pehle wale parameters ginta hai. Isiliye fn.length pe bana generic curry variadic functions pe chup-chaap toot jaata hai — ye zikr karne laayak detail hai.',
      },
      code: `function f(a, b, ...rest) {}
f.length;    // 2`,
    },
    {
      heading: { en: 'Rest in destructuring', hi: 'Destructuring mein rest' },
      body: {
        en: 'The same collecting behaviour when pulling values apart. For objects it is the cleanest way to omit a key without mutating the original — very common for stripping a password or pulling props apart in React.',
        hi: 'Values alag karte waqt wahi ikattha karne wala behaviour. Objects mein bina original badle koi key hataane ka sabse saaf tareeka yahi hai — password nikalne ya React mein props alag karne mein bahut aam.',
      },
      code: `const [head, ...tail] = [1, 2, 3];          // 1, [2,3]
const { password, ...safe } = user;         // user is untouched
function Btn({ variant, ...domProps }) {}   // React idiom`,
    },
  ],

  'What is the spread operator?': [
    {
      heading: { en: 'Unpack an iterable into individual items', hi: 'Iterable ko alag-alag items mein kholo' },
      body: {
        en: 'Three dots in an expression position expand something into its parts: elements into an array literal, arguments into a call, properties into an object literal. Same syntax as rest, opposite direction.',
        hi: 'Expression ki jagah teen dots kisi cheez ko uske hisson mein khol dete hain: elements array literal mein, arguments call mein, properties object literal mein. Syntax rest jaisa hi, disha ulti.',
      },
      code: `Math.max(...[1, 5, 3]);   // 5
[...'abc'];               // ['a','b','c']
[...new Set([1,1,2])];    // [1,2]
{ ...{ a: 1 } };          // { a: 1 }`,
    },
    {
      heading: { en: 'In arrays: copy and concatenate', hi: 'Arrays mein: copy aur jodna' },
      body: {
        en: 'It reads better than concat and slice, and it works at any position — you can insert in the middle, which concat cannot do in one expression.',
        hi: 'Ye concat aur slice se behtar padha jaata hai, aur kisi bhi jagah chalta hai — beech mein daal sakte ho, jo concat ek expression mein nahi kar sakta.',
      },
      code: `const copy = [...a];
const joined = [...a, ...b];
const inserted = [...a.slice(0, 2), 'x', ...a.slice(2)];`,
    },
    {
      heading: { en: 'In objects: merge, with last one winning', hi: 'Objects mein: merge, aakhri jeetta hai' },
      body: {
        en: 'Object spread copies own enumerable properties. On a key collision the later spread overwrites the earlier. Put your overrides last and your defaults first — or reverse it, depending on which should win.',
        hi: 'Object spread own enumerable properties copy karta hai. Key takraaye toh baad wala spread pehle wale ko dhak deta hai. Overrides aakhir mein rakho aur defaults pehle — ya ulta, ye dekh kar ki kaun jeetna chahiye.',
      },
      code: `{ ...defaults, ...userOptions }     // user wins
{ ...userOptions, ...forced }       // forced wins
{ ...user, name: 'new' }            // override a single key`,
    },
    {
      heading: { en: 'It is always shallow', hi: 'Ye hamesha shallow hai' },
      body: {
        en: 'Only the top level is duplicated. Nested objects and arrays are copied as references and remain shared, which is the single most common bug when people use spread to make state "safe" to edit.',
        hi: 'Sirf top level duplicate hota hai. Nested objects aur arrays reference ke roop mein copy hote hain aur share hi rehte hain, aur jab log state ko "safe" banane ke liye spread use karte hain tab yahi sabse aam bug hai.',
      },
      code: `const copy = { ...state };
copy.user.name = 'X';
state.user.name;      // 'X' ✗ nested object is shared

const next = { ...state, user: { ...state.user, name: 'X' } };  // ✓`,
    },
    {
      heading: { en: 'What it can and cannot spread', hi: 'Ye kya spread kar sakta hai aur kya nahi' },
      body: {
        en: 'Array spread needs an ITERABLE, so a plain object throws. Object spread needs only an object-like value and simply copies own enumerable keys, so it works on arrays and strings too — giving you index keys.',
        hi: 'Array spread ko ITERABLE chahiye, toh plain object pe error aata hai. Object spread ko bas object-jaisi value chahiye aur wo own enumerable keys copy kar deta hai, toh ye arrays aur strings pe bhi chalta hai — index keys deta hua.',
      },
      code: `[...{ a: 1 }];        // ✗ TypeError: not iterable
{ ...[1, 2] };        // { 0: 1, 1: 2 }  ✓ index keys
{ ...'ab' };          // { 0: 'a', 1: 'b' }`,
    },
    {
      heading: { en: 'Two performance notes', hi: 'Performance pe do baatein' },
      body: {
        en: 'Spreading inside a reduce builds a new array every iteration, turning an O(n) fold into O(n²) — push instead. And spreading a very large array into a call can exceed the argument limit and throw.',
        hi: 'Reduce ke andar spread har iteration mein naya array banata hai, jisse O(n) fold O(n²) ban jaata hai — uski jagah push karo. Aur bahut bade array ko call mein spread karna argument limit paar kar ke error de sakta hai.',
      },
      code: `arr.reduce((out, v) => [...out, v], []);   // ✗ O(n²)
arr.reduce((out, v) => (out.push(v), out), []);   // ✓ O(n)

Math.max(...hugeArray);   // ✗ can throw on ~100k+ elements`,
    },
  ],

  'What is the difference between rest and spread?': [
    {
      heading: { en: 'Same three dots, opposite jobs', hi: 'Wahi teen dots, ulta kaam' },
      body: {
        en: 'Rest COLLECTS many things into one. Spread EXPANDS one thing into many. The syntax is identical, so the only way to tell them apart is where they appear.',
        hi: 'Rest bahut si cheezein EK mein ikattha karta hai. Spread ek cheez ko BAHUT SI mein khol deta hai. Syntax bilkul same hai, toh pehchanne ka ek hi tareeka hai — wo kahan aaya hai.',
      },
      diagram: `REST — collecting, on the LEFT
  function f(...args)
  const [a, ...rest] = arr
  const { x, ...others } = obj

SPREAD — expanding, on the RIGHT
  f(...args)
  [...arr]
  { ...obj }`,
    },
    {
      heading: { en: 'The positional rule, stated simply', hi: 'Jagah ka rule, saaf-saaf' },
      body: {
        en: 'If the dots are in a place that RECEIVES values — a parameter list or a destructuring pattern — it is rest. If they are in a place that PRODUCES values — a call, an array literal, an object literal — it is spread.',
        hi: 'Agar dots aisi jagah hain jo values LETI hai — parameter list ya destructuring pattern — toh wo rest hai. Agar aisi jagah hain jo values BANATI hai — call, array literal, object literal — toh wo spread hai.',
      },
      code: `function f(...args) {}    // rest: receiving
f(...args);                // spread: producing

const [a, ...b] = arr;     // rest
const c = [...arr];        // spread`,
    },
    {
      heading: { en: 'Both in one line', hi: 'Ek hi line mein dono' },
      body: {
        en: 'A wrapper function is the clearest demonstration: rest gathers whatever the caller passed, spread hands the same list on to the inner function. Being able to point at both in one example is a strong answer.',
        hi: 'Wrapper function sabse saaf misaal hai: rest wo sab ikattha karta hai jo caller ne diya, spread wahi list andar wale function ko de deta hai. Ek hi example mein dono dikha dena mazboot jawab hai.',
      },
      code: `const logged = (fn) => (...args) => {   // rest — collect
  console.log(args);
  return fn(...args);                    // spread — expand
};`,
    },
    {
      heading: { en: 'Rest has restrictions, spread does not', hi: 'Rest pe rok hai, spread pe nahi' },
      body: {
        en: 'Rest must be last, and there can be only one per list. Spread can appear anywhere, any number of times. That asymmetry follows from what they do — collecting needs an unambiguous endpoint.',
        hi: 'Rest aakhri hona chahiye, aur ek list mein ek hi ho sakta hai. Spread kahin bhi, kitni bhi baar aa sakta hai. Ye asantulan unke kaam se hi aata hai — ikattha karne ke liye ek saaf ant chahiye.',
      },
      code: `function a(...x, y) {}        // ✗ SyntaxError
const b = [...x, 'mid', ...y, ...z];   // ✓ spread anywhere`,
    },
    {
      heading: { en: 'Rest always gives an array; spread gives whatever fits', hi: 'Rest hamesha array deta hai; spread jo fit ho wo' },
      body: {
        en: 'Rest in a parameter list or array pattern produces an Array; in an object pattern it produces an Object. Spread has no type of its own — it just pours values into the surrounding literal or call.',
        hi: 'Parameter list ya array pattern mein rest ek Array banata hai; object pattern mein ek Object. Spread ka apna koi type nahi — wo bas values ko aas-paas ke literal ya call mein undel deta hai.',
      },
      code: `function f(...a) { Array.isArray(a); }   // true, always
const { x, ...rest } = o;                 // rest is an object`,
    },
  ],

  'What is function composition?': [
    {
      heading: { en: 'Feed the output of one into the next', hi: 'Ek ka output agle mein daalo' },
      body: {
        en: 'Composition builds a new function by chaining existing ones, so the result of each becomes the argument of the next. Instead of nesting calls by hand, you describe the pipeline once.',
        hi: 'Composition maujooda functions ko jod kar naya function banata hai, jisme har ek ka nateeja agle ka argument ban jaata hai. Haath se calls nest karne ki jagah tum pipeline ek baar likh dete ho.',
      },
      code: `const double = (n) => n * 2;
const inc    = (n) => n + 1;

inc(double(5));                 // 11 — nested by hand
const f = compose(inc, double); // same thing, named
f(5);                           // 11`,
    },
    {
      heading: { en: 'compose runs right to left, pipe runs left to right', hi: 'compose daayein se baayein, pipe baayein se daayein' },
      body: {
        en: 'compose matches mathematical notation, where f(g(x)) is written compose(f, g). pipe matches reading order and is usually easier to follow. Knowing which is which is the detail interviewers check.',
        hi: 'compose ganit ke notation se milta hai, jahan f(g(x)) ko compose(f, g) likhte hain. pipe padhne ke kram se milta hai aur aam taur pe samajhna aasaan hota hai. Kaun kaunsa hai, interviewers yahi detail dekhte hain.',
      },
      diagram: `compose(inc, double)(5)
        └────────┘ double first, then inc → 11

pipe(inc, double)(5)
     └───────┘ inc first, then double → 12`,
    },
    {
      heading: { en: 'Both are three lines of reduce', hi: 'Dono reduce ki teen lines hain' },
      body: {
        en: 'This is a standard whiteboard question. compose folds from the right, pipe folds from the left, and each step wraps the accumulated function. Write both and explain that they differ only in direction.',
        hi: 'Ye standard whiteboard sawaal hai. compose daayein se fold karta hai, pipe baayein se, aur har step jama function ko lapetta hai. Dono likho aur samjhao ki farq sirf disha ka hai.',
      },
      code: `const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
const pipe    = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

pipe(trim, toLower, slugify)('  Hello World  ');   // 'hello-world'`,
    },
    {
      heading: { en: 'Each function should take and return one value', hi: 'Har function ek value le aur ek de' },
      body: {
        en: 'Composition only works cleanly when every stage is unary — one argument in, one value out. Multi-argument functions need currying or partial application first, which is the practical reason functional libraries curry everything.',
        hi: 'Composition tabhi saaf chalta hai jab har stage unary ho — ek argument andar, ek value bahar. Multi-argument functions ko pehle currying ya partial application chahiye, aur functional libraries sab kuch curry isiliye karti hain.',
      },
      code: `const add = (a) => (b) => a + b;    // curried
pipe(add(1), double)(5);            // 12`,
    },
    {
      heading: { en: 'Why it is worth doing', hi: 'Ye karne laayak kyun hai' },
      body: {
        en: 'Each step is small, named, independently testable and reusable. The pipeline reads as a list of transformations rather than nested parentheses, and adding or removing a step is a one-line change.',
        hi: 'Har step chhota, naam wala, alag se test hone laayak aur dobara use hone laayak hai. Pipeline nested brackets ki jagah transformations ki list jaisi padhi jaati hai, aur ek step jodna ya hataana ek line ka kaam hai.',
      },
    },
    {
      heading: { en: 'The limits to acknowledge', hi: 'Maan lene laayak seemayein' },
      body: {
        en: 'Debugging is harder because there is no obvious place to put a breakpoint — a tap helper that logs and passes the value through solves that. Composition also does not handle async out of the box; for promises you need an async pipe that awaits each step.',
        hi: 'Debug karna mushkil hai kyunki breakpoint lagane ki koi saaf jagah nahi — ek tap helper jo log kare aur value aage bhej de, ye theek kar deta hai. Composition async bhi apne aap nahi sambhaalta; promises ke liye aisa async pipe chahiye jo har step await kare.',
      },
      code: `const tap = (label) => (v) => (console.log(label, v), v);
pipe(trim, tap('after trim'), toLower)(input);

const pipeAsync = (...fns) => (x) =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(x));`,
    },
  ],

  'What is scope?': [
    {
      heading: { en: 'Where a name is visible', hi: 'Kahan ek naam dikhta hai' },
      body: {
        en: 'Scope is the region of code in which a binding can be reached by name. It exists so that two functions can both use a variable called i without interfering, and so that internal details stay internal.',
        hi: 'Scope code ka wo hissa hai jisme kisi binding tak naam se pahuncha ja sakta hai. Ye isliye hai taaki do functions dono i naam ka variable use kar sakein bina takraaye, aur andar ki cheezein andar rahein.',
      },
      code: `function f() {
  const inside = 1;
  return inside;      // ✓ visible here
}
inside;               // ✗ ReferenceError — not visible here`,
    },
    {
      heading: { en: 'Three kinds, nested inside each other', hi: 'Teen prakaar, ek doosre ke andar' },
      body: {
        en: 'Global scope is everything outside any function or block. Function scope is created by every function call. Block scope is created by any pair of braces, but only for let, const and class — var ignores it.',
        hi: 'Global scope wo sab hai jo kisi function ya block ke bahar hai. Function scope har function call se banta hai. Block scope kisi bhi curly braces se banta hai, par sirf let, const aur class ke liye — var usse nahi maanta.',
      },
      diagram: `┌ global ─────────────────────────┐
│  const a = 1                    │
│  ┌ function ──────────────────┐ │
│  │  const b = 2               │ │
│  │  ┌ block ────────────────┐ │ │
│  │  │  const c = 3          │ │ │
│  │  │  sees a, b, c         │ │ │
│  │  └───────────────────────┘ │ │
│  │  sees a, b — not c         │ │
│  └────────────────────────────┘ │
│  sees a only                    │
└─────────────────────────────────┘`,
    },
    {
      heading: { en: 'Lookup goes outward, never inward', hi: 'Lookup bahar ki taraf jaata hai, andar kabhi nahi' },
      body: {
        en: 'When a name is used, the engine checks the current scope, then the one enclosing it, and so on to global. If it is never found you get a ReferenceError. An outer scope can never see into an inner one — that direction simply does not exist.',
        hi: 'Jab koi naam use hota hai, engine maujooda scope dekhta hai, phir uske bahar wala, aise global tak. Na mile toh ReferenceError. Bahar wala scope andar kabhi nahi dekh sakta — wo disha hoti hi nahi.',
      },
      code: `const a = 1;
function f() {
  const b = 2;
  return a + b;    // a found by walking outward ✓
}
b;                 // ✗ the outer scope cannot see in`,
    },
    {
      heading: { en: 'Scope is decided by where code is written', hi: 'Scope isse tay hota hai ki code kahan likha hai' },
      body: {
        en: 'JavaScript uses lexical (static) scope: a function\'s scope chain is fixed by its position in the source, not by where it is called from. This is why closures work and why moving a function changes what it can see.',
        hi: 'JavaScript lexical (static) scope use karti hai: function ki scope chain uski source mein jagah se tay hoti hai, ye nahi ki usse kahan se call kiya gaya. Isi wajah se closures chalte hain aur function ki jagah badalne se uski nazar badal jaati hai.',
      },
      code: `const x = 'outer';
function show() { return x; }
function run() { const x = 'inner'; return show(); }
run();     // 'outer' ✓ — where it was WRITTEN, not called`,
    },
    {
      heading: { en: 'The global scope is a hazard', hi: 'Global scope ek khatra hai' },
      body: {
        en: 'Anything global is reachable and overwritable by every script on the page, and it never gets garbage collected. In sloppy mode, assigning to an undeclared name creates a global by accident — which is one of the main things strict mode prevents.',
        hi: 'Global cheez page ke har script ke liye pahunch aur badalne laayak hoti hai, aur wo kabhi garbage collect nahi hoti. Sloppy mode mein undeclared naam pe assign karna galti se global bana deta hai — strict mode jinhe rokta hai unme ye mukhya hai.',
      },
      code: `function f() { leaked = 1; }   // ✗ creates a global
f(); window.leaked;             // 1

'use strict';
function g() { leaked = 1; }    // ✗ ReferenceError ✓ caught`,
    },
  ],

  'What are Global, Function, and Block scope?': [
    {
      heading: { en: 'Global — the outermost level', hi: 'Global — sabse bahar ka level' },
      body: {
        en: 'Anything declared outside every function and block. In a classic script, a top-level var or function declaration also becomes a property of window; let, const and class do not. In an ES module nothing goes to the global object at all.',
        hi: 'Wo sab jo har function aur block ke bahar declare ho. Classic script mein top-level var ya function declaration window ki property bhi ban jaata hai; let, const aur class nahi. ES module mein kuch bhi global object pe nahi jaata.',
      },
      code: `var a = 1;  let b = 2;
window.a;   // 1
window.b;   // undefined

// in a module, neither reaches window`,
    },
    {
      heading: { en: 'Function — created by every call', hi: 'Function — har call se banta hai' },
      body: {
        en: 'Each invocation gets a fresh scope containing its parameters and its local declarations. This is the only scope var respects: a var inside a function is invisible outside it, no matter how many blocks it sits in.',
        hi: 'Har invocation ko ek naya scope milta hai jisme uske parameters aur local declarations hote hain. var sirf isi scope ko maanta hai: function ke andar ka var bahar nahi dikhta, chahe wo kitne bhi blocks ke andar ho.',
      },
      code: `function f() {
  if (true) { var v = 1; let l = 2; }
  console.log(v);   // 1 ✓ var ignored the block
  console.log(l);   // ✗ ReferenceError
}
v;                  // ✗ but var is still trapped by the function`,
    },
    {
      heading: { en: 'Block — any pair of braces', hi: 'Block — koi bhi curly braces ki jodi' },
      body: {
        en: 'An if, a for, a while, a try, or a bare block all create a block scope for let, const and class. Introduced in ES6, this is what finally made loop variables behave the way people always expected.',
        hi: 'if, for, while, try, ya bas ek khaali block — sab let, const aur class ke liye block scope banate hain. ES6 mein aaya, aur isi ne aakhirkaar loop variables ko waise chalaya jaisa log hamesha se ummeed karte the.',
      },
      code: `{ const secret = 1; }
secret;              // ✗ ReferenceError ✓ contained

for (let i = 0; i < 3; i++) {}
i;                   // ✗ not leaked

for (var j = 0; j < 3; j++) {}
j;                   // 3 ✗ leaked`,
    },
    {
      heading: { en: 'Where each one lives, side by side', hi: 'Teeno ek saath, aamne-saamne' },
      body: {
        en: 'The table below is the whole answer in compressed form. The only surprising row is var, which skips block scope entirely — everything else behaves as you would guess.',
        hi: 'Neeche wali table poora jawab sanchipt roop mein hai. Sirf var wali line chaunkati hai, jo block scope ko poori tarah chhod deti hai — baaki sab waisa hi hai jaisa tum socho.',
      },
      diagram: `                global   function   block
var               yes      yes        NO
let / const       yes      yes        yes
function decl     yes      yes        yes (strict mode)
class             yes      yes        yes`,
    },
    {
      heading: { en: 'Module scope, the fourth one', hi: 'Module scope, chautha' },
      body: {
        en: 'Worth mentioning because it comes up constantly in modern code. Every ES module has its own top-level scope: nothing leaks to the global object, and a name is shared only through export and import.',
        hi: 'Zikr karne laayak hai kyunki modern code mein ye lagataar aata hai. Har ES module ka apna top-level scope hota hai: kuch bhi global object pe nahi jaata, aur naam sirf export aur import se share hota hai.',
      },
      code: `// a.js
var x = 1;          // NOT on window
export const y = 2; // shared only via import`,
    },
  ],

  'What is lexical scope?': [
    {
      heading: { en: 'Scope determined by position in the source', hi: 'Source mein jagah se tay hone wala scope' },
      body: {
        en: 'Lexical means "as written". A function\'s scope chain is fixed when the code is authored, based on where the function physically sits — not on where it is later called from. This is also called static scope.',
        hi: 'Lexical matlab "jaisa likha hai". Function ki scope chain code likhte waqt tay ho jaati hai, is aadhaar pe ki function kahan padha hai — na ki baad mein usse kahan se call kiya gaya. Isse static scope bhi kehte hain.',
      },
      code: `const name = 'outer';

function show() { return name; }          // captures the outer scope

function run() {
  const name = 'inner';
  return show();
}
run();    // 'outer' ✓ — position, not call site`,
    },
    {
      heading: { en: 'The alternative that JavaScript does not use', hi: 'Wo vikalp jo JavaScript use nahi karti' },
      body: {
        en: 'Under dynamic scope, show() would look at whoever called it and return "inner". A few languages work that way; JavaScript does not, for variables. Saying this out loud shows you know why the answer is "outer".',
        hi: 'Dynamic scope mein show() dekhta ki usse kisne bulaya aur "inner" deta. Kuch languages aise chalti hain; JavaScript variables ke liye nahi. Ye bol dena dikhata hai ki tumhe pata hai jawab "outer" kyun hai.',
      },
      diagram: `lexical (JS)     look OUTWARD through the source
dynamic          look BACKWARD through the call stack`,
    },
    {
      heading: { en: 'The one thing that IS dynamic: this', hi: 'Ek cheez jo dynamic HAI: this' },
      body: {
        en: 'Variables are lexical; this is not. In a regular function this is decided by how the call is made. Arrow functions opt out and take this lexically, which is exactly why they fixed the old self = this pattern.',
        hi: 'Variables lexical hain; this nahi. Aam function mein this isse tay hota hai ki call kaise hua. Arrow functions isse bahar nikal jaate hain aur this lexically lete hain, aur isiliye unhone purana self = this pattern theek kar diya.',
      },
      code: `const o = {
  n: 1,
  reg() { return this.n; },        // dynamic — depends on the call
  arr: () => this?.n,              // lexical — the enclosing this
};
o.reg();                 // 1
const f = o.reg; f();    // ✗ this is lost`,
    },
    {
      heading: { en: 'This is what makes closures possible', hi: 'Isi se closures mumkin hote hain' },
      body: {
        en: 'Because the scope chain is fixed at creation, a function that outlives its parent still has a working link to that parent\'s variables. Closures are lexical scope plus the garbage collector keeping the captured scope alive.',
        hi: 'Scope chain banne ke waqt tay ho jaati hai, isliye jo function apne parent se zyada jeeta hai uska link phir bhi kaam karta hai. Closures matlab lexical scope aur garbage collector ka pakde hue scope ko zinda rakhna.',
      },
      code: `function outer() {
  const secret = 42;
  return () => secret;     // the link is fixed here, at creation
}
outer()();                 // 42 — long after outer returned`,
    },
    {
      heading: { en: 'A practical consequence', hi: 'Ek vyavharik nateeja' },
      body: {
        en: 'Moving a function to a different file or a different nesting level changes what it can see, even if every call site stays the same. That is why extracting a helper sometimes breaks it — and why the fix is to pass the value in as an argument.',
        hi: 'Function ko doosri file ya doosre nesting level pe le jaana badal deta hai ki wo kya dekh sakta hai, chahe har call site waisa hi rahe. Isiliye helper alag karne pe kabhi-kabhi wo toot jaata hai — aur ilaaj yahi hai ki value ko argument bana kar bhejo.',
      },
    },
  ],

  'Give a real-world use case of closures.': [
    {
      heading: { en: 'Answer with a concrete case, not the definition', hi: 'Definition nahi, thos misaal se jawab do' },
      body: {
        en: 'The interviewer already knows what a closure is — they want to hear that you have used one. Pick a case, show ten lines, and point at the captured variable. Four cases below cover almost every real use.',
        hi: 'Interviewer ko pata hai closure kya hai — wo sunna chahta hai ki tumne use kiya hai. Ek misaal chuno, das line dikhao, aur pakde hue variable pe ungli rakho. Neeche ke chaar cases lagbhag har asli upyog cover karte hain.',
      },
    },
    {
      heading: { en: 'One: private state in a module or factory', hi: 'Ek: module ya factory mein private state' },
      body: {
        en: 'A variable inside the closure has no syntax to reach it from outside. This was the standard way to build encapsulation before #private fields, and it is still how factory functions work.',
        hi: 'Closure ke andar ke variable tak bahar se pahunchne ka koi syntax hi nahi hai. #private fields se pehle encapsulation banane ka yahi standard tareeka tha, aur factory functions aaj bhi aise hi chalte hain.',
      },
      code: `function createAccount(initial) {
  let balance = initial;                    // unreachable outside
  return {
    deposit: (n) => (balance += n),
    getBalance: () => balance,
  };
}
const acc = createAccount(100);
acc.balance;        // undefined ✓
acc.getBalance();   // 100`,
    },
    {
      heading: { en: 'Two: debounce, throttle, once', hi: 'Do: debounce, throttle, once' },
      body: {
        en: 'Every rate limiter needs to remember something between calls — a timer id, a flag, a timestamp. The closure is where that state lives, and this is the case most interviewers are hoping you name.',
        hi: 'Har rate limiter ko calls ke beech kuch yaad rakhna padta hai — timer id, flag, timestamp. Wo state closure mein rehti hai, aur zyadatar interviewers yahi misaal sunna chahte hain.',
      },
      code: `function debounce(fn, delay) {
  let id;                             // remembered across calls
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}
input.oninput = debounce(search, 300);`,
    },
    {
      heading: { en: 'Three: a memo cache', hi: 'Teen: ek memo cache' },
      body: {
        en: 'The cache belongs to the wrapped function and to nothing else. No global, no cleanup, no chance of another module reading or corrupting it.',
        hi: 'Cache sirf lapete gaye function ka hai aur kisi ka nahi. Na global, na cleanup, na kisi doosre module ke padhne ya bigaadne ka mauka.',
      },
      code: `function memoize(fn) {
  const cache = new Map();            // private to this wrapper
  return (x) => {
    if (!cache.has(x)) cache.set(x, fn(x));
    return cache.get(x);
  };
}`,
    },
    {
      heading: { en: 'Four: a configured function', hi: 'Chaar: configure kiya hua function' },
      body: {
        en: 'Capture configuration once and return a specialised function. This is how loggers, API clients and event handlers with a fixed id are built, and it removes the same argument from every call site.',
        hi: 'Configuration ek baar pakdo aur ek khaas function return karo. Loggers, API clients aur tay id wale event handlers aise hi bante hain, aur isse har call jagah se wahi argument hat jaata hai.',
      },
      code: `const makeLogger = (prefix) => (msg) => console.log(prefix, msg);
const authLog = makeLogger('[auth]');
authLog('token expired');

btn.onclick = ((id) => () => remove(id))(row.id);   // captured id`,
    },
    {
      heading: { en: 'Mention the cost', hi: 'Keemat ka zikr karo' },
      body: {
        en: 'A closure keeps its captured scope alive for as long as the function exists. A handler that closes over a large object holds that object in memory until the listener is removed. Naming this trade-off is what turns a good answer into a senior one.',
        hi: 'Closure apne pakde hue scope ko tab tak zinda rakhta hai jab tak function hai. Bade object pe close karne wala handler us object ko tab tak memory mein rakhta hai jab tak listener hata na diya jaaye. Is sauda ka naam lena hi achhe jawab ko senior jawab bana deta hai.',
      },
    },
  ],

  'What is variable shadowing?': [
    {
      heading: { en: 'An inner name hides an outer one', hi: 'Andar ka naam bahar wale ko chhupa deta hai' },
      body: {
        en: 'Declare a variable with the same name in a nested scope and the inner one wins for the whole of that scope. The outer variable still exists and is unchanged — it is simply unreachable by that name from inside.',
        hi: 'Kisi nested scope mein wahi naam declare karo aur us poore scope mein andar wala jeet jaata hai. Bahar wala variable maujood rehta hai aur badalta nahi — bas us naam se andar se pahuncha nahi ja sakta.',
      },
      code: `const name = 'outer';
function f() {
  const name = 'inner';    // shadows
  return name;
}
f();      // 'inner'
name;     // 'outer' ✓ untouched`,
    },
    {
      heading: { en: 'It is not the same as reassignment', hi: 'Ye reassignment nahi hai' },
      body: {
        en: 'Shadowing creates a NEW binding; reassignment changes the existing one. Miss the declaration keyword and you get the second, which mutates the outer variable — a common and hard-to-spot bug.',
        hi: 'Shadowing NAYI binding banata hai; reassignment maujooda ko badalta hai. Declaration keyword chhoot jaaye toh doosra ho jaata hai, jo bahar wale variable ko badal deta hai — aam aur mushkil se dikhne wala bug.',
      },
      code: `let n = 1;
function shadow()   { let n = 2; }   // new binding
function reassign() { n = 2; }       // changes the outer one

shadow();   n;   // 1
reassign(); n;   // 2`,
    },
    {
      heading: { en: 'Shadowing with let hits the TDZ', hi: 'let se shadowing TDZ mein takraati hai' },
      body: {
        en: 'This is the trap. Once a block declares a name with let, that name is in its temporal dead zone from the top of the block — so reading it before the declaration throws instead of finding the outer value.',
        hi: 'Yahi jaal hai. Jaise hi koi block let se naam declare karta hai, wo naam block ke shuru se hi apne TDZ mein aa jaata hai — toh declaration se pehle padho toh bahar wali value milne ki jagah error aata hai.',
      },
      code: `const x = 'outer';
{
  console.log(x);   // ✗ ReferenceError — NOT 'outer'
  let x = 'inner';
}`,
    },
    {
      heading: { en: 'var behaves differently in a block', hi: 'Block mein var alag chalta hai' },
      body: {
        en: 'Because var ignores block scope, a var inside a block does not shadow an outer var — it IS the same variable, and assigning to it overwrites the outer value. This is one of the clearest reasons to stop using var.',
        hi: 'var block scope nahi maanta, isliye block ke andar ka var bahar wale var ko shadow nahi karta — wo wahi variable HAI, aur usme assign karna bahar wali value badal deta hai. var chhodne ki sabse saaf wajahon mein se ek yahi hai.',
      },
      code: `var v = 'outer';
{ var v = 'inner'; }
v;      // 'inner' ✗ overwritten, not shadowed

let l = 'outer';
{ let l = 'inner'; }
l;      // 'outer' ✓ genuinely shadowed`,
    },
    {
      heading: { en: 'Parameters shadow too', hi: 'Parameters bhi shadow karte hain' },
      body: {
        en: 'A parameter name shadows an outer variable for the whole function body. This is the most common accidental shadowing in real code, and it is why linters warn about it.',
        hi: 'Parameter ka naam poore function body ke liye bahar wale variable ko shadow karta hai. Asli code mein galti se hone wali shadowing yahi sabse aam hai, aur isiliye linters iski chetavni dete hain.',
      },
      code: `const data = [1, 2, 3];
function process(data) {     // shadows the outer data
  return data.length;        // whichever was passed in
}`,
    },
    {
      heading: { en: 'When it is fine, and when it is not', hi: 'Ye kab theek hai, kab nahi' },
      body: {
        en: 'Short, obvious shadowing inside a small callback is normal and harmless. Shadowing across a long function, or shadowing an import or a well-known global, makes code genuinely hard to follow. Turn on no-shadow in eslint and rename instead.',
        hi: 'Chhote callback ke andar chhoti, saaf shadowing normal aur bekhatar hai. Lambe function mein shadowing, ya kisi import ya jaane-maane global ko shadow karna, code ko sach mein samajhna mushkil bana deta hai. eslint mein no-shadow chaalu karo aur naam badal do.',
      },
    },
  ],

  'What gets hoisted in JavaScript?': [
    {
      heading: { en: 'Declarations, never assignments', hi: 'Declarations, assignments kabhi nahi' },
      body: {
        en: 'This is the one-sentence answer. Before running a scope, the engine registers every declaration in it. The values you assign stay exactly where you wrote them and are applied when execution reaches that line.',
        hi: 'Ek line ka jawab yahi hai. Scope chalane se pehle engine usme har declaration register kar leta hai. Jo values tum assign karte ho wo wahin rehti hain jahan likhi hain aur tab lagti hain jab execution us line tak pahunche.',
      },
      code: `console.log(a);   // undefined — the declaration was registered
var a = 5;        // the assignment happens here`,
    },
    {
      heading: { en: 'The full table', hi: 'Poori table' },
      body: {
        en: 'Everything is registered; the difference is what value the binding starts with. Function declarations get their whole body, var gets undefined, and let, const and class get nothing at all — which is the temporal dead zone.',
        hi: 'Sab kuch register hota hai; farq itna hai ki binding kis value se shuru hoti hai. Function declarations ko poori body milti hai, var ko undefined, aur let, const aur class ko kuch nahi — yahi temporal dead zone hai.',
      },
      diagram: `                     registered   initial value
function declaration    yes        the whole function
var                     yes        undefined
let / const             yes        <uninitialised> → TDZ
class                   yes        <uninitialised> → TDZ
import                  yes        fully hoisted, live binding
function expression     as var/let/const, per its keyword`,
    },
    {
      heading: { en: 'Function declarations win over var', hi: 'Function declarations var se jeet jaate hain' },
      body: {
        en: 'When both declare the same name, the function is what the binding holds after the creation phase. A later assignment still overwrites it at runtime, because assignments are not hoisted.',
        hi: 'Jab dono wahi naam declare karein, creation phase ke baad binding mein function hi hota hai. Baad ka assignment runtime pe usse phir bhi badal deta hai, kyunki assignments hoist nahi hote.',
      },
      code: `console.log(typeof a);   // 'function'
var a = 1;
function a() {}
console.log(typeof a);   // 'number'`,
    },
    {
      heading: { en: 'Imports are hoisted completely', hi: 'Imports poore hoist hote hain' },
      body: {
        en: 'An ES module import is resolved and bound before any of the module body runs, so you can use an imported name above the import statement. It is also a live binding — if the exporting module reassigns it, you see the new value.',
        hi: 'ES module ka import module body chalne se pehle resolve aur bind ho jaata hai, toh import statement ke upar bhi imported naam use kar sakte ho. Ye live binding bhi hai — export karne wala module usse badle toh tumhe nayi value dikhti hai.',
      },
      code: `greet();                    // ✓ works
import { greet } from './a.js';`,
    },
    {
      heading: { en: 'What is NOT hoisted', hi: 'Kya hoist NAHI hota' },
      body: {
        en: 'Assignments of any kind, function expressions and arrow functions as values, and class expressions. In each case the name may be registered, but the function or class itself does not exist until that line runs.',
        hi: 'Kisi bhi tarah ke assignments, function expressions aur arrow functions as values, aur class expressions. Har case mein naam register ho sakta hai, par function ya class khud tab tak nahi hota jab tak wo line na chale.',
      },
      code: `f();   // ✗ TypeError: f is not a function
var f = () => {};

new C();  // ✗ ReferenceError (TDZ)
class C {}`,
    },
    {
      heading: { en: 'Say it precisely in the interview', hi: 'Interview mein isse theek se kaho' },
      body: {
        en: '"Nothing physically moves. Entering a scope, the engine registers all declarations first: functions with their bodies, var as undefined, and let, const and class uninitialised so that early access throws. Assignments always run in place."',
        hi: '"Kuch bhi jagah se hilta nahi. Scope mein ghuste hi engine pehle saare declarations register karta hai: functions apni body ke saath, var undefined ke roop mein, aur let, const aur class uninitialised taaki jaldi access pe error aaye. Assignments hamesha apni jagah chalte hain."',
      },
    },
  ],

  'Can let and const be hoisted?': [
    {
      heading: { en: 'Yes — and that is the whole point of the question', hi: 'Haan — aur sawaal ka poora maqsad yahi hai' },
      body: {
        en: 'The expected wrong answer is "no". They ARE hoisted: the binding is created when the scope is entered, exactly like var. What differs is initialisation, not registration.',
        hi: 'Ummeed ka galat jawab "nahi" hai. Ye hoist HOTE hain: scope mein ghuste hi binding ban jaati hai, bilkul var ki tarah. Farq initialisation ka hai, register hone ka nahi.',
      },
      code: `let a = 'outer';
{
  console.log(a);   // ✗ ReferenceError — NOT 'outer'
  let a = 'inner';
}
// If the inner a were not hoisted, the outer one would be found.`,
    },
    {
      heading: { en: 'The proof: shadowing', hi: 'Saboot: shadowing' },
      body: {
        en: 'That example is the strongest evidence. If the inner let were not registered at the top of the block, the lookup would walk outward and find the outer a. Instead it finds the inner binding, uninitialised, and throws. Registration must therefore have happened.',
        hi: 'Wahi example sabse mazboot saboot hai. Agar andar wala let block ke shuru mein register na hota, toh lookup bahar jaakar bahar wala a dhoondh leta. Uski jagah usse andar wali binding milti hai, uninitialised, aur error aata hai. Matlab registration hua zaroor.',
      },
    },
    {
      heading: { en: 'var is initialised, let and const are not', hi: 'var initialise hota hai, let aur const nahi' },
      body: {
        en: 'A var binding starts holding undefined, so reading it early is allowed and quietly wrong. A let or const binding starts in the "uninitialised" state, and any access throws until the declaration line assigns it.',
        hi: 'var binding undefined le kar shuru hoti hai, toh jaldi padhna allowed hai aur chup-chaap galat. let ya const binding "uninitialised" state mein shuru hoti hai, aur jab tak declaration line usse assign na kare, har access error deta hai.',
      },
      diagram: `scope entered
  var x   → [ undefined ]      readable
  let y   → [ uninitialised ]  reading throws  ← the TDZ
  const z → [ uninitialised ]  reading throws`,
    },
    {
      heading: { en: 'Read the error message', hi: 'Error message padho' },
      body: {
        en: 'The wording proves it. "Cannot access before initialization" means the binding exists and you are early. "is not defined" means there is no binding at all. Two different errors for two different situations.',
        hi: 'Shabd hi saabit karte hain. "Cannot access before initialization" matlab binding hai aur tum jaldi aa gaye. "is not defined" matlab binding hai hi nahi. Do alag halaat ke liye do alag errors.',
      },
      code: `console.log(x); let x;    // Cannot access 'x' before initialization
console.log(q);           // q is not defined`,
    },
    {
      heading: { en: 'How to phrase the answer', hi: 'Jawab kaise kehna hai' },
      body: {
        en: '"Yes, they are hoisted — the binding is created when the scope is entered. Unlike var, it is not initialised, so it sits in the temporal dead zone and any access before the declaration throws a ReferenceError. That makes early use a loud error instead of a silent undefined."',
        hi: '"Haan, ye hoist hote hain — scope mein ghuste hi binding ban jaati hai. var ke ulat ye initialise nahi hoti, toh wo temporal dead zone mein rehti hai aur declaration se pehle koi bhi access ReferenceError deta hai. Isse jaldi use karna chup-chaap undefined ki jagah zor se bolne wala error ban jaata hai."',
      },
    },
  ],

  'What is an object in JavaScript?': [
    {
      heading: { en: 'A collection of key-value pairs', hi: 'Key-value jodiyon ka ek sangrah' },
      body: {
        en: 'An object maps keys to values. Keys are strings or symbols; values can be anything, including other objects and functions. A value that is a function is called a method, but there is nothing structurally special about it.',
        hi: 'Object keys ko values se jodta hai. Keys strings ya symbols hoti hain; values kuch bhi ho sakti hain, doosre objects aur functions samet. Jo value function ho use method kehte hain, par dhaanche mein usme kuch khaas nahi hai.',
      },
      code: `const user = {
  name: 'Asha',                 // string value
  address: { city: 'Pune' },    // nested object
  greet() { return this.name; } // method
};`,
    },
    {
      heading: { en: 'Almost everything is one', hi: 'Lagbhag sab kuch object hai' },
      body: {
        en: 'Arrays, functions, dates, regexes, Maps, Sets, promises and errors are all objects. Only the seven primitives are not. That is why typeof reports "object" so often, and why arrays can hold named properties.',
        hi: 'Arrays, functions, dates, regexes, Maps, Sets, promises aur errors — sab objects hain. Sirf saat primitives nahi hain. Isiliye typeof itni baar "object" kehta hai, aur isiliye arrays naam wali properties rakh sakte hain.',
      },
      code: `typeof [];            // 'object'
typeof new Date();    // 'object'
typeof function(){};  // 'function' — but still an object
[] instanceof Object; // true`,
    },
    {
      heading: { en: 'Two ways to reach a property', hi: 'Property tak pahunchne ke do tareeke' },
      body: {
        en: 'Dot notation for fixed, valid identifier names. Bracket notation when the key is in a variable, has spaces or dashes, or is a number. Brackets are also what you need for computed keys.',
        hi: 'Tay, valid identifier naamon ke liye dot notation. Jab key kisi variable mein ho, usme spaces ya dashes hon, ya wo number ho tab bracket notation. Computed keys ke liye bhi brackets hi chahiye.',
      },
      code: `user.name;
user['first name'];
const key = 'name'; user[key];      // ✓ dynamic
user.key;                            // ✗ looks for a literal 'key'`,
    },
    {
      heading: { en: 'Held by reference', hi: 'Reference se pakde jaate hain' },
      body: {
        en: 'A variable holds an address, not the object. Copying the variable copies the address, so both names point at one object, and equality compares identity rather than contents.',
        hi: 'Variable ek address rakhta hai, object nahi. Variable copy karne se address copy hota hai, toh dono naam ek hi object pe point karte hain, aur barabari content ki jagah pehchaan compare karti hai.',
      },
      code: `const a = { n: 1 }, b = a;
b.n = 2;  a.n;        // 2 — same object
{ n: 1 } === { n: 1 };  // false — different references`,
    },
    {
      heading: { en: 'Every object has a prototype', hi: 'Har object ka ek prototype hota hai' },
      body: {
        en: 'A hidden link to another object, from which it inherits properties. That is why an empty object already has toString and hasOwnProperty. Object.create(null) is the way to opt out and get a clean dictionary.',
        hi: 'Ek chhupi hui link doosre object tak, jisse ye properties inherit karta hai. Isiliye khaali object ke paas pehle se toString aur hasOwnProperty hote hain. Object.create(null) se isse chhod kar saaf dictionary milti hai.',
      },
      code: `({}).toString;               // inherited from Object.prototype
Object.create(null).toString;  // undefined ✓ nothing inherited`,
    },
    {
      heading: { en: 'The syntax worth knowing', hi: 'Jaanne laayak syntax' },
      body: {
        en: 'Shorthand properties, computed keys, method shorthand, spread, destructuring and optional chaining cover almost everything you do with objects day to day.',
        hi: 'Shorthand properties, computed keys, method shorthand, spread, destructuring aur optional chaining — roz-marra ke lagbhag saare object ke kaam inhi se ho jaate hain.',
      },
      code: `const name = 'Asha', key = 'role';
const o = { name, [key]: 'admin', greet() {} };

const { name: n = 'guest', ...rest } = o;
const merged = { ...defaults, ...o };
o?.address?.city;`,
    },
  ],

  'What is object destructuring?': [
    {
      heading: { en: 'Pull properties out by name', hi: 'Properties ko naam se bahar nikalo' },
      body: {
        en: 'Destructuring lets you name the properties you want on the left of an assignment and bind them to variables in one statement. The pattern mirrors the shape of the object.',
        hi: 'Destructuring se tum assignment ke baayein taraf wo properties naam se likh sakte ho jo chahiye, aur ek hi statement mein unhe variables se bandh sakte ho. Pattern object ki shakal ki nakal karta hai.',
      },
      code: `const user = { name: 'Asha', age: 30, city: 'Pune' };

const { name, age } = user;
// instead of: const name = user.name; const age = user.age;`,
    },
    {
      heading: { en: 'Renaming and defaults', hi: 'Naam badalna aur defaults' },
      body: {
        en: 'A colon renames the binding; an equals sign supplies a default when the property is undefined. They combine, and the order reads as "take this property, call it that, or use this".',
        hi: 'Colon binding ka naam badalta hai; equals sign tab default deta hai jab property undefined ho. Dono saath chalte hain, aur kram aise padha jaata hai "ye property lo, use wo naam do, ya phir ye use karo".',
      },
      code: `const { name: userName } = user;          // rename
const { role = 'user' } = user;            // default
const { role: r = 'user' } = user;         // both

// defaults fire on undefined only — not on null:
const { x = 1 } = { x: null };             // null`,
    },
    {
      heading: { en: 'Nested patterns, and their trap', hi: 'Nested patterns, aur unka jaal' },
      body: {
        en: 'You can descend into nested objects, but the intermediate name is a PATH, not a binding — you do not get a variable for it. And if the intermediate is missing, destructuring throws, so give it a default.',
        hi: 'Nested objects ke andar ja sakte ho, par beech ka naam ek RAASTA hai, binding nahi — uska variable nahi milta. Aur beech wala na ho toh destructuring error deta hai, isliye usse default do.',
      },
      code: `const { address: { city } } = user;
city;       // 'Pune' ✓
address;    // ✗ ReferenceError — it was only a path

const { address: { city } = {} } = {};   // ✓ safe`,
    },
    {
      heading: { en: 'Rest collects what is left', hi: 'Rest bacha hua ikattha karta hai' },
      body: {
        en: 'This is the cleanest way to omit a key without mutating the original — take out what you want to drop, keep the rest. Very common for stripping a password or splitting props in React.',
        hi: 'Bina original badle koi key hataane ka sabse saaf tareeka yahi hai — jo hataana hai wo nikaal lo, baaki rakh lo. Password nikalne ya React mein props baantne mein bahut aam.',
      },
      code: `const { password, ...safeUser } = user;
function Button({ variant, ...domProps }) {}`,
    },
    {
      heading: { en: 'In parameters — the options pattern', hi: 'Parameters mein — options pattern' },
      body: {
        en: 'Destructuring in the parameter list gives you named arguments. Remember the trailing = {} so that calling with no argument does not throw — that is the detail people forget.',
        hi: 'Parameter list mein destructuring naam wale arguments deta hai. Aakhir mein = {} yaad rakho taaki bina argument ke call karne pe error na aaye — yahi detail log bhool jaate hain.',
      },
      code: `function init({ retries = 3, delay = 100 } = {}) {}
init();                         // ✓ works because of the = {}

function bad({ a }) {}
bad();                          // ✗ TypeError`,
    },
    {
      heading: { en: 'Two syntax gotchas', hi: 'Do syntax ke jhatke' },
      body: {
        en: 'Destructuring into already-declared variables needs the whole statement wrapped in parentheses, or the braces are parsed as a block. And swapping variables with array destructuring needs a semicolon on the previous line.',
        hi: 'Pehle se declare kiye variables mein destructure karna ho toh poore statement ko brackets mein lapetna padta hai, warna curly braces block padhe jaate hain. Aur array destructuring se variables swap karne ke liye pichhli line pe semicolon chahiye.',
      },
      code: `let a, b;
{ a, b } = obj;      // ✗ SyntaxError
({ a, b } = obj);    // ✓

let x = 1, y = 2;
[x, y] = [y, x];     // ✓ swap — needs a ; on the line before`,
    },
  ],

  /* ─── Objects, this and prototypes ────────────────────────── */

  'What is optional chaining (?.)?': [
    {
      heading: { en: 'Stop reading if the left side is nullish', hi: 'Baayin taraf nullish ho toh rukk jao' },
      body: {
        en: '?. checks whether the value to its left is null or undefined. If it is, the whole expression short-circuits to undefined instead of throwing. If it is not, the access proceeds normally.',
        hi: '?. dekhta hai ki uske baayein wali value null ya undefined hai kya. Agar hai, toh poora expression error dene ki jagah undefined pe simat jaata hai. Nahi hai toh access aam tareeke se aage badhta hai.',
      },
      code: `const user = { address: { city: 'Pune' } };

user.address.city;         // 'Pune'
user.profile.city;         // ✗ TypeError: Cannot read properties
                           //   of undefined
user.profile?.city;        // undefined ✓ no throw`,
    },
    {
      heading: { en: 'Three forms, not one', hi: 'Teen roop, ek nahi' },
      body: {
        en: 'It works for property access, for computed access, and for calls. The call form is genuinely useful — it invokes the function only if it exists, which replaces a whole family of typeof checks.',
        hi: 'Ye property access, computed access, aur calls — teeno pe chalta hai. Call wala roop sach mein kaam ka hai — wo function tabhi chalata hai jab wo maujood ho, jisse typeof checks ka poora kunba khatam ho jaata hai.',
      },
      code: `obj?.prop        // property
obj?.[key]       // computed — note the dot before the bracket
fn?.()           // call only if fn exists
arr?.[0]?.name   // chained`,
    },
    {
      heading: { en: 'It short-circuits the whole chain', hi: 'Ye poori chain ko rok deta hai' },
      body: {
        en: 'Once a ?. hits a nullish value, everything to its right is skipped entirely — including function calls and index lookups. Nothing after it is evaluated, so there are no side effects.',
        hi: 'Jaise hi koi ?. nullish value se takraaya, uske daayein ka sab kuch poori tarah chhod diya jaata hai — function calls aur index lookups samet. Uske baad kuch evaluate hi nahi hota, toh koi side effect nahi.',
      },
      code: `a?.b.c.d;      // if a is nullish → undefined, and b.c.d is never touched
a?.b().c();    // the calls do not happen either`,
    },
    {
      heading: { en: 'Only null and undefined trigger it', hi: 'Sirf null aur undefined isse chalate hain' },
      body: {
        en: 'Not 0, not "", not false. Those are real values and the access continues — which is correct, because 0.toFixed is a perfectly valid call.',
        hi: 'Na 0, na "", na false. Wo asli values hain aur access aage badhta hai — jo sahi hai, kyunki 0.toFixed bilkul valid call hai.',
      },
      code: `(0)?.toFixed(2);    // '0.00' — 0 is not nullish
''?.length;         // 0
null?.length;       // undefined`,
    },
    {
      heading: { en: 'What it cannot do', hi: 'Ye kya nahi kar sakta' },
      body: {
        en: 'You cannot assign through it, and you cannot use it with new or as a template-literal tag. It also does not protect against an undeclared variable — that is still a ReferenceError, because the variable itself does not exist.',
        hi: 'Iske through assign nahi kar sakte, aur na hi isse new ke saath ya template-literal tag ki tarah use kar sakte ho. Ye undeclared variable se bhi nahi bachaata — wo ab bhi ReferenceError hai, kyunki variable khud hai hi nahi.',
      },
      code: `a?.b = 1;           // ✗ SyntaxError — invalid assignment target
new a?.();          // ✗ SyntaxError

undeclared?.x;      // ✗ ReferenceError — the name does not exist
typeof undeclared;  // ✓ 'undefined'`,
    },
    {
      heading: { en: 'Do not scatter it everywhere', hi: 'Isse har jagah mat bikhero' },
      body: {
        en: 'A chain full of ?. hides genuine bugs: if user should always exist, user?.name silently returns undefined instead of telling you the data is wrong. Use it where a value is legitimately optional, and let real mistakes throw.',
        hi: '?. se bhari chain asli bugs chhupa deti hai: agar user hamesha hona chahiye, toh user?.name chup-chaap undefined de dega bajaye ye batane ke ki data galat hai. Isse wahan use karo jahan value sach mein optional ho, aur asli galtiyon ko error dene do.',
      },
      code: `// ✗ hides a bug — user must exist here
const name = user?.profile?.name ?? 'unknown';

// ✓ user is required, profile genuinely optional
const name = user.profile?.name ?? 'unknown';`,
    },
  ],

  'What is nullish coalescing (??)?': [
    {
      heading: { en: 'A default for null and undefined only', hi: 'Sirf null aur undefined ke liye default' },
      body: {
        en: '?? returns its right side when the left is null or undefined, and the left side otherwise. That narrow trigger is the entire reason it exists alongside ||.',
        hi: '?? tab daayin taraf deta hai jab baayin null ya undefined ho, warna baayin hi. Yahi tang trigger || ke saath iske hone ki poori wajah hai.',
      },
      code: `null ?? 'x';        // 'x'
undefined ?? 'x';   // 'x'
0 ?? 'x';           // 0
'' ?? 'x';          // ''
false ?? 'x';       // false`,
    },
    {
      heading: { en: 'Compared with ||', hi: '|| se tulna' },
      body: {
        en: '|| falls back on ANY falsy value, so a meaningful 0, empty string or false gets silently replaced by the default. That bug is common enough that ?? was added to the language specifically to fix it.',
        hi: '|| KISI BHI falsy value pe fallback le leta hai, toh matlab wala 0, khaali string ya false chup-chaap default se badal jaata hai. Ye bug itna aam tha ki ?? language mein khaas isi ko theek karne ke liye joda gaya.',
      },
      diagram: `value        ||  gives     ??  gives
null         default       default
undefined    default       default
0            default ✗     0       ✓
''           default ✗     ''      ✓
false        default ✗     false   ✓
'a'          'a'           'a'`,
    },
    {
      heading: { en: 'The concrete bug it prevents', hi: 'Ye kaunsa thos bug rokta hai' },
      body: {
        en: 'Any setting where zero, empty or false is a legitimate choice: a quantity of 0, a volume of 0, an empty search string, a disabled flag. With || the user\'s deliberate choice is thrown away.',
        hi: 'Har wo setting jahan zero, khaali ya false ek jaayaz chunav hai: 0 ki quantity, 0 volume, khaali search string, band kiya hua flag. || ke saath user ka jaan-boojh kar kiya chunav phenk diya jaata hai.',
      },
      code: `const volume = settings.volume ?? 50;
// user muted to 0 → stays 0  ✓
// with || it would jump back to 50  ✗`,
    },
    {
      heading: { en: 'It cannot be mixed with && or || unparenthesised', hi: 'Isse && ya || ke saath bina brackets nahi mila sakte' },
      body: {
        en: 'This is a deliberate SyntaxError. The precedence would be ambiguous to a reader, so the language forces you to add parentheses and say which grouping you meant.',
        hi: 'Ye jaan-boojh kar SyntaxError hai. Precedence padhne wale ke liye uljhan bhari hoti, isliye language tumse brackets lagwaati hai taaki tum batao kaunsi grouping chahiye thi.',
      },
      code: `a || b ?? c;       // ✗ SyntaxError
(a || b) ?? c;     // ✓
a || (b ?? c);     // ✓`,
    },
    {
      heading: { en: 'The assignment form', hi: 'Assignment wala roop' },
      body: {
        en: '??= assigns only when the target is nullish, and it short-circuits — the right side is not even evaluated otherwise. That matters when the default is expensive to compute.',
        hi: '??= tabhi assign karta hai jab target nullish ho, aur ye short-circuit karta hai — warna daayin taraf evaluate hi nahi hoti. Jab default banana mehnga ho tab ye maayne rakhta hai.',
      },
      code: `options.retries ??= 3;
cache[key] ??= expensiveCompute();   // computed at most once`,
    },
    {
      heading: { en: 'It pairs naturally with ?.', hi: 'Ye ?. ke saath swabhavik roop se jodta hai' },
      body: {
        en: 'Optional chaining produces undefined when a path is missing, and ?? turns that undefined into a default. Together they replace a whole nest of if statements with one readable line.',
        hi: 'Optional chaining raasta na milne pe undefined deta hai, aur ?? us undefined ko default bana deta hai. Dono milkar if statements ke poore jaal ki jagah ek padhne laayak line de dete hain.',
      },
      code: `const city = user?.address?.city ?? 'unknown';`,
    },
  ],

  'What is the difference between Object.keys(), Object.values(), and Object.entries()?': [
    {
      heading: { en: 'Three views of the same data', hi: 'Ek hi data ke teen nazariye' },
      body: {
        en: 'All three take an object and return an array. keys gives the property names, values gives the property values, entries gives [key, value] pairs. Same traversal, different projection.',
        hi: 'Teeno ek object lete hain aur array dete hain. keys property ke naam deta hai, values unki values, entries [key, value] jodiyaan. Ghoomna wahi, dikhaane ka tareeka alag.',
      },
      code: `const o = { a: 1, b: 2 };

Object.keys(o);      // ['a', 'b']
Object.values(o);    // [1, 2]
Object.entries(o);   // [['a', 1], ['b', 2]]`,
    },
    {
      heading: { en: 'All three: own, enumerable, string-keyed', hi: 'Teeno: own, enumerable, string-keyed' },
      body: {
        en: 'Those three words define exactly what is included. Inherited properties are excluded, non-enumerable properties are excluded, and symbol keys are excluded. This is why they are safer than for...in.',
        hi: 'Ye teen shabd bilkul batate hain kya shaamil hai. Inherited properties bahar, non-enumerable properties bahar, aur symbol keys bahar. Isiliye ye for...in se safe hain.',
      },
      code: `const proto = { inherited: 1 };
const o = Object.create(proto);
o.own = 2;
o[Symbol('s')] = 3;
Object.defineProperty(o, 'hidden', { value: 4, enumerable: false });

Object.keys(o);      // ['own'] — only one of the four`,
    },
    {
      heading: { en: 'Order: integer keys first', hi: 'Order: integer keys pehle' },
      body: {
        en: 'The specification orders integer-like keys ascending first, then string keys in insertion order. It surprises people using numeric ids as object keys — a Map preserves true insertion order instead.',
        hi: 'Specification pehle integer-jaisi keys ko badhte kram mein rakhti hai, phir string keys insertion order mein. Numeric ids ko object keys banane walon ko ye chaunkata hai — Map asli insertion order bachaata hai.',
      },
      code: `Object.keys({ b: 1, 2: 2, a: 3, 1: 4 });
// ['1', '2', 'b', 'a']  ← integers sorted and hoisted to the front`,
    },
    {
      heading: { en: 'entries is what makes objects iterable-ish', hi: 'entries hi objects ko iterable-jaisa banata hai' },
      body: {
        en: 'A plain object has no Symbol.iterator, so for...of throws on it. Object.entries is the standard bridge — and destructuring the pair in the loop head reads well.',
        hi: 'Plain object mein Symbol.iterator hota hi nahi, toh for...of uspe error deta hai. Object.entries hi standard pul hai — aur loop ke shuru mein jodi ko destructure karna achha padha jaata hai.',
      },
      code: `for (const [key, value] of Object.entries(o)) {
  console.log(key, value);
}`,
    },
    {
      heading: { en: 'The transform round trip', hi: 'Badalne ka poora chakkar' },
      body: {
        en: 'entries plus map plus fromEntries is the idiomatic way to transform an object, because objects have no map of their own. Filtering works the same way.',
        hi: 'entries plus map plus fromEntries hi object badalne ka aam tareeka hai, kyunki objects ka apna map hota hi nahi. Filter bhi aise hi hota hai.',
      },
      code: `Object.fromEntries(
  Object.entries(o).map(([k, v]) => [k, v * 2])
);   // { a: 2, b: 4 }

Object.fromEntries(
  Object.entries(o).filter(([, v]) => v > 1)
);   // { b: 2 }`,
    },
    {
      heading: { en: 'They work on arrays and strings too', hi: 'Ye arrays aur strings pe bhi chalte hain' },
      body: {
        en: 'Arrays are objects with index keys, so keys gives you string indexes and entries gives index-value pairs. Note that Array.prototype.entries gives real numbers instead — a difference worth knowing.',
        hi: 'Arrays index keys wale objects hain, toh keys string indexes deta hai aur entries index-value jodiyaan. Dhyaan do Array.prototype.entries asli numbers deta hai — ye farq jaanne laayak hai.',
      },
      code: `Object.keys(['a', 'b']);       // ['0', '1']  strings
[...['a','b'].entries()];       // [[0,'a'], [1,'b']]  numbers`,
    },
  ],

  'What is Object.freeze()?': [
    {
      heading: { en: 'Make every own property read-only', hi: 'Har own property ko sirf-padho banao' },
      body: {
        en: 'Freezing prevents adding, deleting and modifying properties, and makes the object non-extensible. Internally each own property becomes non-writable and non-configurable. It returns the same object, not a copy.',
        hi: 'Freeze karne se properties jodna, hataana aur badalna ruk jaata hai, aur object non-extensible ho jaata hai. Andar se har own property non-writable aur non-configurable ho jaati hai. Ye wahi object return karta hai, copy nahi.',
      },
      code: `const o = Object.freeze({ a: 1 });
o.a = 2;        // no effect
o.b = 3;        // no effect
delete o.a;     // no effect
Object.isFrozen(o);   // true`,
    },
    {
      heading: { en: 'Silent in sloppy mode, throwing in strict', hi: 'Sloppy mode mein chup, strict mein error' },
      body: {
        en: 'This catches people. A failed write is silently ignored in sloppy mode, which makes the bug invisible. In strict mode it throws a TypeError — and modules and class bodies are always strict, so in modern code it throws.',
        hi: 'Yahan log phasate hain. Fail hone wali write sloppy mode mein chup-chaap ignore hoti hai, jisse bug dikhta hi nahi. Strict mode mein TypeError aata hai — aur modules aur class bodies hamesha strict hain, toh modern code mein error hi aata hai.',
      },
      code: `'use strict';
const o = Object.freeze({ a: 1 });
o.a = 2;    // ✗ TypeError: Cannot assign to read only property 'a'`,
    },
    {
      heading: { en: 'It is shallow', hi: 'Ye shallow hai' },
      body: {
        en: 'Only the object\'s own properties are frozen. Anything they point at is untouched and stays fully mutable. This is the single most common misunderstanding about freeze.',
        hi: 'Sirf object ki apni properties freeze hoti hain. Wo jinpe point karti hain wo achhoote rehte hain aur poori tarah mutable. Freeze ke baare mein sabse aam galatfehmi yahi hai.',
      },
      code: `const o = Object.freeze({ nested: { a: 1 } });
o.nested.a = 99;    // ✓ works — nested was never frozen

function deepFreeze(obj) {
  Object.values(obj).forEach((v) => {
    if (v && typeof v === 'object') deepFreeze(v);
  });
  return Object.freeze(obj);
}`,
    },
    {
      heading: { en: 'freeze is not const', hi: 'freeze const nahi hai' },
      body: {
        en: 'They lock different things. const locks the variable binding so you cannot point the name elsewhere. freeze locks the object contents. They are orthogonal, and for a true constant you want both.',
        hi: 'Dono alag cheezein lock karte hain. const variable binding lock karta hai taaki naam kisi aur cheez pe na jaaye. freeze object ke andar ka saamaan lock karta hai. Ye alag hain, aur asli constant ke liye dono chahiye.',
      },
      code: `let o = Object.freeze({ a: 1 });
o = { a: 2 };      // ✓ the binding was never const

const p = Object.freeze({ a: 1 });   // ✓ both locked`,
    },
    {
      heading: { en: 'Arrays freeze too', hi: 'Arrays bhi freeze hote hain' },
      body: {
        en: 'Freezing an array blocks push, pop, sort and index assignment, because length becomes non-writable. Every mutating method throws in strict mode; the non-mutating ones like map and slice still work fine.',
        hi: 'Array freeze karne se push, pop, sort aur index assignment ruk jaate hain, kyunki length non-writable ho jaati hai. Har mutate karne wala method strict mode mein error deta hai; map aur slice jaise non-mutating methods theek chalte hain.',
      },
      code: `const a = Object.freeze([1, 2]);
a.push(3);      // ✗ TypeError
a.map((x) => x * 2);   // ✓ [2, 4] — returns a new array`,
    },
    {
      heading: { en: 'Where to actually use it', hi: 'Isse asal mein kahan use karein' },
      body: {
        en: 'Enums, configuration objects and lookup tables — anything that should never change, where an accidental write is a bug you want to hear about. Do not freeze large state trees in hot paths; changing property descriptors is not free.',
        hi: 'Enums, configuration objects aur lookup tables — har wo cheez jo kabhi badalni hi nahi chahiye, jahan galti se write karna aisa bug hai jiske baare mein tum sunna chahte ho. Hot path mein bade state trees freeze mat karo; property descriptors badalna muft nahi hai.',
      },
      code: `export const ROLES = Object.freeze({ ADMIN: 'admin', USER: 'user' });`,
    },
  ],

  'What is Object.seal()?': [
    {
      heading: { en: 'Lock the shape, keep the values editable', hi: 'Dhaancha lock karo, values editable rakho' },
      body: {
        en: 'Sealing prevents adding and deleting properties but still allows you to change the value of existing ones. Internally each own property becomes non-configurable, while writability is left alone.',
        hi: 'Seal karne se properties jodna aur hataana ruk jaata hai par maujooda properties ki value badalna abhi bhi chalta hai. Andar se har own property non-configurable ho jaati hai, jabki writability waisi hi rehti hai.',
      },
      code: `const o = Object.seal({ a: 1 });
o.a = 99;       // ✓ allowed
o.b = 2;        // ✗ ignored / throws in strict mode
delete o.a;     // ✗ ignored
Object.isSealed(o);   // true`,
    },
    {
      heading: { en: 'Where it sits between the three', hi: 'Teeno ke beech ye kahan baithta hai' },
      body: {
        en: 'preventExtensions blocks adding only. seal blocks adding and deleting. freeze blocks adding, deleting and modifying. Each is strictly stronger than the one before it.',
        hi: 'preventExtensions sirf jodna rokta hai. seal jodna aur hataana. freeze jodna, hataana aur badalna. Har ek pehle wale se sakht hai.',
      },
      diagram: `                    add   delete   modify
preventExtensions    ✗      ✓        ✓
seal                 ✗      ✗        ✓
freeze               ✗      ✗        ✗`,
    },
    {
      heading: { en: 'Also shallow', hi: 'Ye bhi shallow hai' },
      body: {
        en: 'Like freeze, seal applies only to the object\'s own properties. A nested object can still gain and lose keys freely.',
        hi: 'Freeze ki tarah, seal sirf object ki apni properties pe lagta hai. Nested object abhi bhi jitni chaahe keys jod aur hata sakta hai.',
      },
      code: `const o = Object.seal({ nested: {} });
o.nested.anything = 1;   // ✓ works`,
    },
    {
      heading: { en: 'On arrays it is oddly specific', hi: 'Arrays pe ye ajeeb tareeke se khaas hai' },
      body: {
        en: 'A sealed array lets you overwrite existing elements but not change its length, so push and pop throw while an index assignment works. Worth demonstrating — it makes the "shape versus value" distinction concrete.',
        hi: 'Sealed array maujooda elements overwrite karne deta hai par length badalne nahi deta, toh push aur pop error dete hain jabki index assignment chalta hai. Ye dikhane laayak hai — isse "dhaancha vs value" ka farq thos ho jaata hai.',
      },
      code: `const a = Object.seal([1, 2]);
a[0] = 9;       // ✓
a.push(3);      // ✗ TypeError — cannot grow
a.pop();        // ✗ TypeError — cannot shrink`,
    },
    {
      heading: { en: 'Why you rarely see it', hi: 'Ye kam kyun dikhta hai' },
      body: {
        en: 'Be honest about this in an interview. Most real cases want either full immutability, which is freeze, or nothing at all. seal fits the narrow case of a fixed-schema record whose fields must stay editable — and even there, TypeScript usually covers it at compile time instead.',
        hi: 'Interview mein ye imaandaari se kaho. Zyadatar asli cases mein ya toh poori immutability chahiye, matlab freeze, ya kuch bhi nahi. seal us tang case mein fit hota hai jahan record ka schema tay ho par fields editable rehni chahiye — aur wahan bhi TypeScript aam taur pe compile time pe hi ye kaam kar deta hai.',
      },
    },
  ],

  'What is the "this" keyword in JavaScript?': [
    {
      heading: { en: 'Decided by the call, not the definition', hi: 'Call se tay hota hai, definition se nahi' },
      body: {
        en: 'This is the entire idea. In a regular function, this is not fixed when you write the function — it is bound freshly on every invocation, based on HOW that invocation was made. The same function can see a different this each time.',
        hi: 'Poora idea yahi hai. Aam function mein this tab tay nahi hota jab tum function likhte ho — wo har invocation pe naye sire se bindta hai, is aadhaar pe ki wo call KAISE hui. Wahi function har baar alag this dekh sakta hai.',
      },
      code: `function show() { return this; }

const a = { show }, b = { show };
a.show();      // a
b.show();      // b — same function, different this`,
    },
    {
      heading: { en: 'The four binding rules, in priority order', hi: 'Chaar binding rules, priority ke kram mein' },
      body: {
        en: 'Check them from the top down and you can answer any this question. new wins over explicit binding, which wins over the object before the dot, which wins over the default.',
        hi: 'Inhe upar se neeche jaancho aur this ka koi bhi sawaal hal ho jaayega. new explicit binding se jeetta hai, wo dot se pehle wale object se, aur wo default se.',
      },
      diagram: `1  new Fn()        → the brand-new object
2  fn.call(obj)    → obj  (also apply, bind)
3  obj.fn()        → obj  (the thing before the dot)
4  fn()            → undefined in strict mode,
                     globalThis in sloppy mode`,
    },
    {
      heading: { en: 'Only the last dot matters', hi: 'Sirf aakhri dot maayne rakhta hai' },
      body: {
        en: 'In a chain like a.b.c(), this is b — not a. The rule is the object immediately before the final call, and nothing further left.',
        hi: 'a.b.c() jaisi chain mein this b hai — a nahi. Rule yahi hai: aakhri call se theek pehle wala object, usse baayein kuch nahi.',
      },
      code: `const a = { b: { c() { return this; } } };
a.b.c();      // a.b — not a`,
    },
    {
      heading: { en: 'Detaching a method loses it', hi: 'Method ko alag karna isse kho deta hai' },
      body: {
        en: 'A function reference carries no memory of the dot it was fetched through. Assigning a method to a variable, passing it as a callback, or destructuring it all break this. That is the origin of most "cannot read property of undefined" errors.',
        hi: 'Function reference ko us dot ki koi yaad nahi hoti jisse wo liya gaya. Method ko variable mein rakhna, callback ki tarah bhejna, ya destructure karna — sab this tod dete hain. Zyadatar "cannot read property of undefined" errors yahin se aate hain.',
      },
      code: `const user = { name: 'Asha', greet() { return this.name; } };

const f = user.greet;
f();                       // ✗ this is undefined

setTimeout(user.greet, 0);           // ✗
setTimeout(() => user.greet(), 0);   // ✓
setTimeout(user.greet.bind(user), 0);// ✓`,
    },
    {
      heading: { en: 'Arrow functions have no this at all', hi: 'Arrow functions ka this hota hi nahi' },
      body: {
        en: 'An arrow takes this from the scope it was written in, and none of the four rules apply to it — call, apply and bind cannot change it. That makes it perfect for callbacks and wrong for object methods.',
        hi: 'Arrow this us scope se leta hai jisme wo likha gaya, aur chaaron rules usme lagte hi nahi — call, apply aur bind usse badal nahi sakte. Isse wo callbacks ke liye bilkul sahi aur object methods ke liye galat ho jaata hai.',
      },
      code: `const timer = {
  n: 0,
  start() {
    setInterval(() => this.n++, 1000);   // ✓ this is timer
    setInterval(function () { this.n++ }, 1000);  // ✗ not timer
  },
};`,
    },
    {
      heading: { en: 'In the DOM and in classes', hi: 'DOM mein aur classes mein' },
      body: {
        en: 'In a regular event handler this is the element the listener is attached to — the same as event.currentTarget. In a class, method bodies are always strict, so a detached method gets undefined rather than the global object. A class field arrow is the standard fix.',
        hi: 'Aam event handler mein this wo element hai jispe listener laga hai — bilkul event.currentTarget jaisa. Class mein method bodies hamesha strict hoti hain, toh alag kiya gaya method global object ki jagah undefined paata hai. Class field arrow standard ilaaj hai.',
      },
      code: `class Btn {
  label = 'ok';
  handle = () => this.label;   // bound to the instance forever
}
const { handle } = new Btn();
handle();     // 'ok' ✓`,
    },
  ],

  'How does "this" work in arrow functions?': [
    {
      heading: { en: 'They do not have one', hi: 'Unke paas hota hi nahi' },
      body: {
        en: 'An arrow function has no this binding of its own. When you write this inside one, the engine resolves it the same way it resolves any other variable — by looking outward through the enclosing scopes until it finds one.',
        hi: 'Arrow function ka apna this binding hota hi nahi. Jab tum uske andar this likhte ho, engine usse waise hi resolve karta hai jaise kisi aur variable ko — bahar ke scopes mein tab tak dekhta hai jab tak mil na jaaye.',
      },
      code: `const o = {
  n: 1,
  reg() { return this.n; },      // its own this → o
  arr: () => this?.n,            // no own this → the outer one
};
o.reg();   // 1
o.arr();   // undefined — the module or global this`,
    },
    {
      heading: { en: 'Fixed at definition, forever', hi: 'Definition pe tay, hamesha ke liye' },
      body: {
        en: 'Because it comes from the surrounding scope, the value is decided when the arrow is created and can never change afterwards. How you call it is irrelevant.',
        hi: 'Ye aas-paas ke scope se aata hai, isliye value arrow banate waqt tay ho jaati hai aur uske baad kabhi badal nahi sakti. Tum usse kaise call karte ho, isse koi farq nahi padta.',
      },
      code: `const arrow = () => this;
const obj = { arrow };
obj.arrow();          // NOT obj — the outer this
arrow.call({ a: 1 }); // NOT { a: 1 } — still the outer this`,
    },
    {
      heading: { en: 'call, apply and bind are ignored', hi: 'call, apply aur bind ignore ho jaate hain' },
      body: {
        en: 'They do not throw — they simply have nothing to set. The arguments are accepted and the this value is discarded. Interviewers like this question because the silent no-op surprises people.',
        hi: 'Ye error nahi dete — inke paas set karne ko kuch hota hi nahi. Arguments le liye jaate hain aur this value phenk di jaati hai. Interviewers ko ye sawaal pasand hai kyunki chup-chaap kuch na karna logon ko chaunkata hai.',
      },
      code: `const arrow = () => this;
arrow.call({ a: 1 });    // outer this, no error
arrow.bind({ a: 1 })();  // outer this again`,
    },
    {
      heading: { en: 'This is what makes them right for callbacks', hi: 'Isi se ye callbacks ke liye sahi hote hain' },
      body: {
        en: 'A callback is invoked by someone else, who has no idea what this should be. An arrow sidesteps the problem entirely by keeping the this of the code that created it — which replaced the old self = this and .bind(this) patterns.',
        hi: 'Callback ko koi aur bulata hai, jise pata hi nahi ki this kya hona chahiye. Arrow us code ka this rakh kar problem hi khatam kar deta hai jisne usse banaya — jisne purane self = this aur .bind(this) patterns ki jagah le li.',
      },
      code: `// before
const self = this;
list.forEach(function (i) { self.add(i); });

// now
list.forEach((i) => this.add(i));`,
    },
    {
      heading: { en: 'Three places they are wrong', hi: 'Teen jagah jahan ye galat hain' },
      body: {
        en: 'Object methods that need this. Prototype methods, for the same reason. And DOM handlers where you rely on this being the element — though currentTarget works either way. Also remember: an arrow cannot be used with new.',
        hi: 'Object methods jinhe this chahiye. Prototype methods, wahi wajah. Aur DOM handlers jahan tum this ko element maan rahe ho — waise currentTarget dono mein chalta hai. Aur yaad rakho: arrow ko new ke saath use nahi kar sakte.',
      },
      code: `Btn.prototype.click = () => this.label;   // ✗ never the instance
const A = () => {}; new A();              // ✗ not a constructor`,
    },
    {
      heading: { en: 'The class field exception', hi: 'Class field wala apvaad' },
      body: {
        en: 'An arrow assigned as a class field is created per instance, inside the constructor\'s scope, so its this IS the instance. That gives you a permanently bound method with no bind call — the standard React pattern.',
        hi: 'Class field ki tarah assign kiya gaya arrow har instance ke liye banta hai, constructor ke scope ke andar, toh uska this instance HI hai. Isse bina bind call ke hamesha bandha hua method mil jaata hai — standard React pattern.',
      },
      code: `class Btn {
  label = 'ok';
  handle = () => this.label;   // ✓ this is the instance
}
const { handle } = new Btn();
handle();   // 'ok' — survives detaching`,
    },
  ],

  'What is a prototype in JavaScript?': [
    {
      heading: { en: 'A hidden link to another object', hi: 'Doosre object tak ek chhupi hui link' },
      body: {
        en: 'Every object carries an internal reference, written [[Prototype]], to another object. When a property is not found on the object itself, the engine follows that link and looks there. That is the whole mechanism.',
        hi: 'Har object ke andar ek reference hota hai, jise [[Prototype]] likhte hain, doosre object tak. Jab koi property object pe khud na mile, engine us link pe chal kar wahan dekhta hai. Poori machinery bas itni hai.',
      },
      diagram: `dog  ──►  Dog.prototype  ──►  Animal.prototype  ──►  Object.prototype  ──►  null

property lookup walks right until it finds the key, or hits null`,
    },
    {
      heading: { en: 'Three names, two different things', hi: 'Teen naam, do alag cheezein' },
      body: {
        en: 'This is where people get lost. [[Prototype]] is the internal link on every object. __proto__ is the deprecated accessor for it. But .prototype is unrelated: it is a property on CONSTRUCTOR FUNCTIONS holding the object that new will use.',
        hi: 'Yahin log kho jaate hain. [[Prototype]] har object pe wo internal link hai. __proto__ uska purana accessor hai. Par .prototype alag cheez hai: ye CONSTRUCTOR FUNCTIONS pe ek property hai jisme wo object hai jise new use karega.',
      },
      code: `function User() {}
const u = new User();

Object.getPrototypeOf(u) === User.prototype;   // true
u.prototype;      // undefined — instances have no .prototype
User.prototype;   // { constructor: User }`,
    },
    {
      heading: { en: 'Reading walks the chain, writing does not', hi: 'Padhna chain pe chalta hai, likhna nahi' },
      body: {
        en: 'A read searches up the chain. A write always creates or updates an OWN property on the object itself, shadowing whatever was above. This asymmetry is the single most useful fact about prototypes.',
        hi: 'Padhna chain mein upar dhoondhta hai. Likhna hamesha object pe hi OWN property banata ya badalta hai, upar wali ko dhakte hue. Prototypes ke baare mein sabse kaam ki baat yahi asantulan hai.',
      },
      code: `const proto = { greet: 'hi' };
const o = Object.create(proto);

o.greet;              // 'hi'  — from proto
o.greet = 'hello';    // creates an own property on o
proto.greet;          // 'hi'  — untouched
Object.hasOwn(o, 'greet');   // true`,
    },
    {
      heading: { en: 'Why methods live there', hi: 'Methods wahan kyun rehte hain' },
      body: {
        en: 'Memory. If a method sits on the prototype there is exactly one copy, shared by every instance through lookup. Put it in the constructor and every instance carries its own function object.',
        hi: 'Memory. Method prototype pe ho toh bilkul ek copy hoti hai, jise har instance lookup se share karta hai. Constructor mein rakho toh har instance apna function object rakhta hai.',
      },
      code: `function A(n) { this.n = n; this.hi = () => 'hi'; }   // ✗ per instance
new A(1).hi === new A(2).hi;    // false

function B(n) { this.n = n; }
B.prototype.hi = () => 'hi';                          // ✓ one copy
new B(1).hi === new B(2).hi;    // true`,
    },
    {
      heading: { en: 'class is the same thing with better syntax', hi: 'class wahi cheez hai, behtar syntax ke saath' },
      body: {
        en: 'Class methods go on Constructor.prototype, and extends links the two prototype objects together. Nothing about the underlying model changes — which is why JavaScript is called prototype-based even when you write classes.',
        hi: 'Class ke methods Constructor.prototype pe jaate hain, aur extends dono prototype objects ko jodta hai. Andar ke model mein kuch nahi badalta — isiliye JavaScript ko prototype-based kehte hain, chahe tum classes likho.',
      },
      code: `class Animal { eat() {} }
class Dog extends Animal { bark() {} }

Object.getPrototypeOf(Dog.prototype) === Animal.prototype;  // true`,
    },
    {
      heading: { en: 'Two practical cautions', hi: 'Do vyavharik chetavniyaan' },
      body: {
        en: 'Never modify built-in prototypes — adding to Array.prototype breaks for...in across the whole program and can collide with a future standard method. And never change an object\'s prototype at runtime; setPrototypeOf forces a severe deoptimisation.',
        hi: 'Built-in prototypes kabhi mat badlo — Array.prototype mein jodna poore program mein for...in tod deta hai aur aage aane wale standard method se takra sakta hai. Aur runtime pe object ka prototype kabhi mat badlo; setPrototypeOf gambhir deoptimisation karta hai.',
      },
      code: `Array.prototype.last = function () {};   // ✗ never
Object.setPrototypeOf(o, p);             // ✗ slow
const o = Object.create(p);              // ✓ same result, fast`,
    },
  ],

  /* ─── Array methods in detail ─────────────────────────────── */

  'What is the difference between map() and forEach()?': [
    {
      heading: { en: 'One returns, the other does not', hi: 'Ek deta hai, doosra nahi' },
      body: {
        en: 'map builds and returns a new array of the same length from whatever the callback returns. forEach returns undefined and exists purely for side effects. That is the whole difference, and everything else follows from it.',
        hi: 'map callback jo return kare usse usi length ka naya array banata aur deta hai. forEach undefined deta hai aur sirf side effects ke liye hai. Poora farq yahi hai, aur baaki sab isi se nikalta hai.',
      },
      code: `[1,2,3].map((n) => n * 2);       // [2, 4, 6]
[1,2,3].forEach((n) => n * 2);   // undefined — the values are discarded`,
    },
    {
      heading: { en: 'Choose by intent', hi: 'Mansha se chuno' },
      body: {
        en: 'Transforming data into a new shape is map. Doing something with each item — logging, appending to the DOM, pushing to an external store — is forEach. Using map and ignoring the result allocates an array for nothing, and it misleads whoever reads it next.',
        hi: 'Data ko naye roop mein badalna map hai. Har item ke saath kuch karna — log karna, DOM mein jodna, kisi bahar ke store mein daalna — forEach hai. map use karke result chhod dena bekaar mein array banata hai, aur agle padhne wale ko gumraah karta hai.',
      },
      code: `items.map((i) => console.log(i));   // ✗ builds [undefined, …]
items.forEach((i) => console.log(i));   // ✓ says what it means`,
    },
    {
      heading: { en: 'Only map chains', hi: 'Sirf map chain hota hai' },
      body: {
        en: 'Because map returns an array, you can carry on with filter, reduce or another map. forEach returns undefined, so the chain stops dead there.',
        hi: 'map array deta hai, isliye uske baad filter, reduce ya ek aur map chala sakte ho. forEach undefined deta hai, toh chain wahin ruk jaati hai.',
      },
      code: `users.map((u) => u.age).filter((a) => a > 18);   // ✓
users.forEach((u) => u.age).filter(f);           // ✗ TypeError`,
    },
    {
      heading: { en: 'Neither can break', hi: 'Dono break nahi kar sakte' },
      body: {
        en: 'break and continue are statements and do not work inside a callback. return only exits the current callback invocation, acting like continue. If you need to stop early, use for...of, or some, every or find depending on what you actually want.',
        hi: 'break aur continue statements hain aur callback ke andar nahi chalte. return sirf maujooda callback invocation se nikalta hai, continue jaisa. Jaldi rukna ho toh for...of use karo, ya some, every, find — jo tumhe sach mein chahiye.',
      },
      code: `[1,2,3].forEach((n) => { if (n === 2) return; });   // acts as continue
for (const n of [1,2,3]) { if (n === 2) break; }    // ✓ real break
[1,2,3].some((n) => n === 2);                        // ✓ stops at 2`,
    },
    {
      heading: { en: 'Neither awaits', hi: 'Dono await nahi karte' },
      body: {
        en: 'An async callback returns a promise, and both methods ignore it. forEach fires them all and returns immediately; map gives you an array of promises. Use Promise.all with map for parallel work, or for...of for sequential.',
        hi: 'Async callback promise return karta hai, aur dono methods usse ignore kar dete hain. forEach sabko chala kar turant lautta hai; map promises ka array de deta hai. Parallel kaam ke liye map ke saath Promise.all lo, ya sequential ke liye for...of.',
      },
      code: `ids.forEach(async (id) => await save(id));   // ✗ nothing is awaited

await Promise.all(ids.map(save));            // ✓ parallel
for (const id of ids) await save(id);        // ✓ sequential`,
    },
    {
      heading: { en: 'Everything else is identical', hi: 'Baaki sab kuch ek jaisa hai' },
      body: {
        en: 'Both call back with (element, index, array), accept a thisArg, skip holes in sparse arrays, read length once before starting, and neither mutates the original — although your callback certainly can.',
        hi: 'Dono callback ko (element, index, array) dete hain, thisArg lete hain, sparse arrays ke holes chhodte hain, shuru se pehle length ek baar padhte hain, aur koi bhi original ko nahi badalta — haan tumhara callback zaroor badal sakta hai.',
      },
    },
  ],

  'What is the difference between filter() and find()?': [
    {
      heading: { en: 'All matches versus the first match', hi: 'Saare match vs pehla match' },
      body: {
        en: 'filter returns an ARRAY of every element that passes the test, and an empty array when nothing does. find returns the ELEMENT itself for the first pass, and undefined when nothing does. Different return types, different questions.',
        hi: 'filter har us element ka ARRAY deta hai jo test paas kare, aur kuch na mile toh khaali array. find pehle paas hone wale ka ELEMENT khud deta hai, aur kuch na mile toh undefined. Alag return types, alag sawaal.',
      },
      code: `const users = [{ id: 1, active: true }, { id: 2, active: true }];

users.filter((u) => u.active);   // [{id:1…}, {id:2…}]  array
users.find((u) => u.active);     // {id:1…}              element

users.filter((u) => u.id === 9); // []          empty array
users.find((u) => u.id === 9);   // undefined`,
    },
    {
      heading: { en: 'find stops early', hi: 'find jaldi ruk jaata hai' },
      body: {
        en: 'find returns the moment the predicate is truthy and never touches the rest. filter always walks the entire array. For a unique lookup by id on a long list, that difference is real.',
        hi: 'Predicate truthy hote hi find laut jaata hai aur baaki ko chhoota tak nahi. filter hamesha poora array chalta hai. Lambi list mein id se unique lookup ke liye ye farq asli hai.',
      },
      code: `users.filter((u) => u.id === id)[0];   // ✗ scans everything
users.find((u) => u.id === id);        // ✓ stops at the match`,
    },
    {
      heading: { en: 'The falsy-result trap', hi: 'Falsy result ka jaal' },
      body: {
        en: 'find returns the element, so if the element itself is falsy — 0, "", false — you cannot distinguish "found a falsy value" from "found nothing". Use findIndex and compare against -1 when the array may hold falsy values.',
        hi: 'find element khud deta hai, toh agar element hi falsy ho — 0, "", false — toh "falsy value mili" aur "kuch nahi mila" mein farq nahi kar sakte. Jab array mein falsy values ho sakti hon tab findIndex use karo aur -1 se compare karo.',
      },
      code: `const nums = [0, 1, 2];
const found = nums.find((n) => n === 0);
if (found) {}                      // ✗ never runs — 0 is falsy

nums.findIndex((n) => n === 0) !== -1;   // ✓ correct`,
    },
    {
      heading: { en: 'The related family', hi: 'Isse juda kunba' },
      body: {
        en: 'findIndex gives the position, findLast and findLastIndex search from the end, some tells you whether any match exists, and includes checks for a value rather than running a predicate. Pick the one that names your actual question.',
        hi: 'findIndex jagah deta hai, findLast aur findLastIndex aakhir se dhoondhte hain, some batata hai koi match hai ya nahi, aur includes predicate chalane ki jagah value dhoondhta hai. Wahi chuno jo tumhare asli sawaal ka naam ho.',
      },
      code: `arr.findIndex(fn);       // where
arr.findLast(fn);        // last match
arr.some(fn);            // does any match?
arr.includes(v);         // is this value present?`,
    },
    {
      heading: { en: 'Both return references, not copies', hi: 'Dono references dete hain, copies nahi' },
      body: {
        en: 'For objects, the element you get back is the same object that is in the array. Mutating it changes the array\'s contents too. filter gives you a new array holding the same references — a shallow subset.',
        hi: 'Objects ke liye jo element milta hai wo wahi object hai jo array mein hai. Usse badlo toh array ka saamaan bhi badal jaata hai. filter naya array deta hai jisme wahi references hain — ek shallow subset.',
      },
      code: `const u = users.find((u) => u.id === 1);
u.name = 'X';
users[0].name;    // 'X' — the same object`,
    },
  ],

  'What is the difference between some() and every()?': [
    {
      heading: { en: 'Any versus all', hi: 'Koi ek vs sabhi' },
      body: {
        en: 'some returns true if at least ONE element passes the test. every returns true only if EVERY element passes. Both return a boolean and never build an array.',
        hi: 'some tab true deta hai jab kam se kam EK element test paas kare. every tabhi true deta hai jab HAR element paas kare. Dono boolean dete hain aur kabhi array nahi banate.',
      },
      code: `[1, 2, 3].some((n) => n > 2);    // true  — 3 passes
[1, 2, 3].every((n) => n > 2);   // false — 1 and 2 fail`,
    },
    {
      heading: { en: 'Both short-circuit', hi: 'Dono short-circuit karte hain' },
      body: {
        en: 'some stops at the first pass; every stops at the first failure. Neither walks the rest of the array, which makes them the efficient choice over filter followed by a length check.',
        hi: 'some pehle paas pe rukta hai; every pehle fail pe. Koi bhi baaki array nahi chalta, jisse ye filter-phir-length check se behtar chunav ban jaate hain.',
      },
      code: `arr.filter(fn).length > 0;    // ✗ walks everything
arr.some(fn);                  // ✓ stops early

arr.filter(fn).length === arr.length;   // ✗
arr.every(fn);                          // ✓`,
    },
    {
      heading: { en: 'The empty-array results', hi: 'Khaali array ke nateeje' },
      body: {
        en: 'some on an empty array is false; every on an empty array is TRUE. That second one surprises people, but it is correct — "all zero elements pass" is vacuously true, and it matches how mathematics defines it. Watch for it in validation code.',
        hi: 'Khaali array pe some false hai; khaali array pe every TRUE hai. Doosra logon ko chaunkata hai, par ye sahi hai — "zero elements sab paas hain" khaali taur pe sach hai, aur ganit bhi aise hi define karta hai. Validation code mein iska dhyaan rakho.',
      },
      code: `[].some(() => true);    // false
[].every(() => false);  // true  ← vacuous truth

// so guard when empty should mean invalid:
items.length > 0 && items.every(isValid);`,
    },
    {
      heading: { en: 'They are logical opposites', hi: 'Ye tark mein ek doosre ke ulat hain' },
      body: {
        en: 'De Morgan\'s laws apply: "not every" equals "some not", and "not some" equals "every not". Knowing this lets you pick whichever reads more naturally.',
        hi: 'De Morgan ke niyam lagte hain: "har nahi" barabar hai "koi nahi hai", aur "koi nahi" barabar hai "har ek nahi". Ye jaan kar tum wo chun sakte ho jo zyada swabhavik padha jaaye.',
      },
      code: `!arr.every(fn)  ===  arr.some((x) => !fn(x));
!arr.some(fn)   ===  arr.every((x) => !fn(x));`,
    },
    {
      heading: { en: 'Common real uses', hi: 'Aam asli upyog' },
      body: {
        en: 'every is the natural shape for form validation and permission checks. some is the natural shape for "is anything selected", "has any error", or intersecting two lists.',
        hi: 'Form validation aur permission checks ke liye every swabhavik shape hai. "Kuch select hai kya", "koi error hai kya", ya do lists ka milaan — inke liye some.',
      },
      code: `const valid = fields.every((f) => f.value !== '');
const dirty = fields.some((f) => f.touched);
const overlaps = a.some((x) => b.includes(x));`,
    },
  ],

  'What is reduce() and how does it work?': [
    {
      heading: { en: 'Fold an array into a single value', hi: 'Array ko ek value mein modo' },
      body: {
        en: 'reduce carries an accumulator across the array. For each element it calls your function with the accumulator so far and the current item, and whatever you RETURN becomes the accumulator for the next step. The final accumulator is the result.',
        hi: 'reduce poore array mein ek accumulator saath le kar chalta hai. Har element pe wo tumhara function bulata hai ab tak ke accumulator aur maujooda item ke saath, aur tum jo RETURN karo wahi agle step ka accumulator ban jaata hai. Aakhri accumulator hi nateeja hai.',
      },
      code: `[1, 2, 3, 4].reduce((acc, n) => acc + n, 0);   // 10
//               ↑acc  ↑item              ↑initial`,
    },
    {
      heading: { en: 'Trace one to make it click', hi: 'Ek trace karo toh baith jayega' },
      body: {
        en: 'The mechanics are simple once you see the accumulator moving from one call to the next. Forgetting to return is the number one mistake — the accumulator becomes undefined immediately.',
        hi: 'Accumulator ko ek call se agle tak jaate dekh lo toh machinery simple hai. Return bhool jaana sabse badi galti hai — accumulator turant undefined ban jaata hai.',
      },
      diagram: `[1, 2, 3, 4]  with initial 0

acc=0  item=1  →  1
acc=1  item=2  →  3
acc=3  item=3  →  6
acc=6  item=4  →  10   ← result`,
    },
    {
      heading: { en: 'Always pass the initial value', hi: 'Initial value hamesha do' },
      body: {
        en: 'Without it, reduce uses the first element as the seed and starts from index 1 — and on an empty array it throws. Passing an initial value fixes the accumulator type, avoids the throw, and makes the code readable.',
        hi: 'Bina uske reduce pehle element ko seed bana leta hai aur index 1 se shuru karta hai — aur khaali array pe error deta hai. Initial value dene se accumulator ka type tay ho jaata hai, error nahi aata, aur code padhne laayak banta hai.',
      },
      code: `[].reduce((a, b) => a + b);      // ✗ TypeError
[].reduce((a, b) => a + b, 0);   // ✓ 0

[10, 20].reduce((a, b) => a + b);     // 30 — 2 calls become 1
[10, 20].reduce((a, b) => a + b, 0);  // 30 — 2 calls`,
    },
    {
      heading: { en: 'The accumulator can be any type', hi: 'Accumulator kisi bhi type ka ho sakta hai' },
      body: {
        en: 'This is what makes reduce general rather than just a summing tool. Seed it with an object and you get grouping or counting; seed it with an array and you can implement map and filter yourself.',
        hi: 'Isi se reduce sirf jodne ka auzaar nahi, ek general auzaar ban jaata hai. Object se seed karo toh grouping ya counting; array se seed karo toh map aur filter khud bana sakte ho.',
      },
      code: `// group by a field
users.reduce((acc, u) => {
  (acc[u.role] ||= []).push(u);
  return acc;
}, {});

// count occurrences
arr.reduce((c, x) => { c[x] = (c[x] || 0) + 1; return c; }, {});

// max
nums.reduce((m, n) => (n > m ? n : m), -Infinity);`,
    },
    {
      heading: { en: 'Four arguments, and reduceRight', hi: 'Chaar arguments, aur reduceRight' },
      body: {
        en: 'The callback receives accumulator, value, index and the whole array. reduceRight is identical but walks backwards, which matters for anything order-dependent such as string building or function composition.',
        hi: 'Callback ko accumulator, value, index aur poora array milta hai. reduceRight bilkul waisa hai par ulta chalta hai, jo order pe nirbhar cheezon mein maayne rakhta hai jaise string banana ya function composition.',
      },
      code: `['a','b','c'].reduce((a, b) => a + b);        // 'abc'
['a','b','c'].reduceRight((a, b) => a + b);   // 'cba'`,
    },
    {
      heading: { en: 'Do not spread inside it', hi: 'Iske andar spread mat karo' },
      body: {
        en: 'Spreading the accumulator each iteration allocates a new array or object every time, turning an O(n) fold into O(n²). Mutate the accumulator you own instead — it never escapes the reduce, so this is safe.',
        hi: 'Har iteration mein accumulator spread karna har baar naya array ya object banata hai, jisse O(n) fold O(n²) ban jaata hai. Uski jagah apne accumulator ko mutate karo — wo reduce se bahar jaata hi nahi, toh ye safe hai.',
      },
      code: `arr.reduce((acc, v) => ({ ...acc, [v.id]: v }), {});   // ✗ O(n²)
arr.reduce((acc, v) => { acc[v.id] = v; return acc; }, {});   // ✓ O(n)`,
    },
    {
      heading: { en: 'And do not force it', hi: 'Aur zabardasti mat karo' },
      body: {
        en: 'reduce can express anything, which is not a reason to use it for everything. A reduce that reimplements filter or map is harder to read than the method it replaced. Reach for it when you are genuinely folding to one value or building a new shape.',
        hi: 'reduce kuch bhi express kar sakta hai, par isliye har jagah use karna zaroori nahi. Jo reduce filter ya map ko dobara likhta hai wo us method se mushkil padha jaata hai jiski jagah aaya. Isse tab uthao jab sach mein ek value mein mod rahe ho ya naya roop bana rahe ho.',
      },
    },
  ],

  'How do you flatten a nested array?': [
    {
      heading: { en: 'flat() is the answer', hi: 'Jawab flat() hai' },
      body: {
        en: 'Array.prototype.flat takes a depth, defaulting to 1, and returns a new array with sub-array elements lifted into it. Pass Infinity to flatten completely, however deep the nesting goes.',
        hi: 'Array.prototype.flat ek depth leta hai, default 1, aur naya array deta hai jisme sub-array ke elements upar utha liye jaate hain. Poori tarah flatten karne ke liye Infinity do, nesting chahe kitni bhi gehri ho.',
      },
      code: `[1, [2, 3]].flat();                    // [1, 2, 3]
[1, [2, [3, [4]]]].flat();             // [1, 2, [3, [4]]]  depth 1
[1, [2, [3, [4]]]].flat(2);            // [1, 2, 3, [4]]
[1, [2, [3, [4]]]].flat(Infinity);     // [1, 2, 3, 4]`,
    },
    {
      heading: { en: 'flat also removes holes', hi: 'flat holes bhi hata deta hai' },
      body: {
        en: 'A useful side effect worth knowing: flat drops empty slots in sparse arrays. It is the shortest way to compact one.',
        hi: 'Ek kaam ka side effect: flat sparse arrays ke khaali slots gira deta hai. Array ko compact karne ka sabse chhota tareeka yahi hai.',
      },
      code: `[1, , 3].flat();     // [1, 3] — the hole is gone`,
    },
    {
      heading: { en: 'flatMap for map-then-flatten-one', hi: 'map-phir-ek-level-flatten ke liye flatMap' },
      body: {
        en: 'flatMap runs a callback and flattens the result by exactly one level. It is more efficient than map followed by flat, and it lets a callback emit zero, one or many items — which makes it a filter and a map at the same time.',
        hi: 'flatMap callback chalata hai aur nateeje ko bilkul ek level flatten karta hai. Ye map-phir-flat se behtar hai, aur callback ko zero, ek ya kai items dene deta hai — jisse wo ek saath filter aur map dono ban jaata hai.',
      },
      code: `['a b', 'c'].flatMap((s) => s.split(' '));   // ['a','b','c']

// emit nothing to drop an item
nums.flatMap((n) => (n > 0 ? [n] : []));     // filter + map in one`,
    },
    {
      heading: { en: 'Write it yourself with recursion', hi: 'Recursion se khud likho' },
      body: {
        en: 'The interviewer usually wants this next. Walk the array; if an element is itself an array, recurse into it, otherwise keep it. Array.isArray is the test, and reduce is the natural way to accumulate.',
        hi: 'Interviewer aam taur pe iske baad yahi chahta hai. Array pe chalo; agar koi element khud array hai toh usme recurse karo, warna usse rakh lo. Test Array.isArray hai, aur jama karne ka swabhavik tareeka reduce.',
      },
      code: `function flatten(arr) {
  return arr.reduce(
    (out, v) => out.concat(Array.isArray(v) ? flatten(v) : v),
    []
  );
}
flatten([1, [2, [3, [4]]]]);   // [1,2,3,4]`,
    },
    {
      heading: { en: 'The iterative version avoids the stack', hi: 'Iterative version stack se bachaata hai' },
      body: {
        en: 'Recursion overflows on very deep nesting. A stack-based loop handles any depth. Mention this if asked about limits — it is the follow-up to the recursive answer.',
        hi: 'Bahut gehri nesting pe recursion overflow ho jaata hai. Stack wala loop kisi bhi depth ko sambhaal leta hai. Seemaon ke baare mein poochha jaaye toh ye batao — recursive jawab ka yahi follow-up hai.',
      },
      code: `function flatten(input) {
  const stack = [...input];
  const out = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) stack.push(...next);
    else out.push(next);
  }
  return out.reverse();
}`,
    },
    {
      heading: { en: 'The one-liners, and why not to use them', hi: 'Ek-line wale, aur unhe kyun na use karein' },
      body: {
        en: 'The old concat-with-apply trick flattens one level. The JSON regex hack works only on arrays of numbers and destroys everything else. Know them so you recognise them in old code, and reach for flat instead.',
        hi: 'Purana concat-with-apply jugaad ek level flatten karta hai. JSON regex wala hack sirf numbers ke arrays pe chalta hai aur baaki sab bigaad deta hai. Inhe jaano taaki purane code mein pehchaan lo, aur khud flat use karo.',
      },
      code: `[].concat(...arr);                      // one level, old style
JSON.parse('[' + JSON.stringify(arr).replace(/\\[|\\]/g, '') + ']');
// ✗ numbers only, and unreadable`,
    },
  ],

  'What is the difference between push() and concat()?': [
    {
      heading: { en: 'One mutates, the other returns', hi: 'Ek badalta hai, doosra deta hai' },
      body: {
        en: 'push adds to the END of the existing array and returns the new LENGTH. concat leaves the original untouched and returns a NEW array. Watch the return values — they trip people up more than the mutation does.',
        hi: 'push maujooda array ke AAKHIR mein jodta hai aur nayi LENGTH deta hai. concat original ko chhod deta hai aur NAYA array deta hai. Return values dekho — mutation se zyada log inme phasate hain.',
      },
      code: `const a = [1, 2];

a.push(3);        // returns 3 (the new length)
a;                // [1, 2, 3]  ← changed

const b = [1, 2];
b.concat(3);      // returns [1, 2, 3]
b;                // [1, 2]     ← unchanged`,
    },
    {
      heading: { en: 'How they treat an array argument', hi: 'Array argument ko dono kaise lete hain' },
      body: {
        en: 'This is the difference that actually bites. push adds the array as ONE element, nesting it. concat spreads a top-level array\'s elements in. Getting this wrong gives you an unexpected nested array.',
        hi: 'Ye wo farq hai jo asal mein kaatta hai. push array ko EK element ki tarah jodta hai, nest karte hue. concat top-level array ke elements ko khol kar daal deta hai. Ye galat karo toh anchaha nested array mil jaata hai.',
      },
      code: `const a = [1];
a.push([2, 3]);      // [1, [2, 3]]     ← nested
a.push(...[2, 3]);   // [1, [2,3], 2, 3] ← spread to fix it

const b = [1];
b.concat([2, 3]);    // [1, 2, 3]  ✓ flattened one level
b.concat([[2]]);     // [1, [2]]   only ONE level`,
    },
    {
      heading: { en: 'Performance', hi: 'Performance' },
      body: {
        en: 'push appends in place and is O(1) amortised. concat allocates and copies the whole array, so it is O(n). Building a list with concat inside a loop is O(n²) — the classic slow pattern.',
        hi: 'push wahin jodta hai aur amortised O(1) hai. concat poora array banata aur copy karta hai, toh O(n). Loop ke andar concat se list banana O(n²) hai — classic dheema pattern.',
      },
      code: `// ✗ O(n²)
let out = [];
for (const x of items) out = out.concat(x);

// ✓ O(n)
const out = [];
for (const x of items) out.push(x);`,
    },
    {
      heading: { en: 'Immutability is why concat still exists', hi: 'concat ab bhi isliye hai: immutability' },
      body: {
        en: 'In React and Redux, mutating state means the component does not re-render, because the reference did not change. concat, or spread, gives you a new reference and the update is detected.',
        hi: 'React aur Redux mein state mutate karna matlab component re-render nahi hota, kyunki reference nahi badla. concat, ya spread, naya reference deta hai aur update pakda jaata hai.',
      },
      code: `state.items.push(x);            // ✗ no re-render
setItems(items.concat(x));      // ✓
setItems([...items, x]);        // ✓ the idiomatic modern form`,
    },
    {
      heading: { en: 'What to use today', hi: 'Aaj kya use karein' },
      body: {
        en: 'Spread has largely replaced concat: it reads better, works at any position and merges several arrays at once. Use push when you are deliberately building up a local array, and spread when you need a new one.',
        hi: 'Spread ne concat ki jagah lagbhag le li hai: wo behtar padha jaata hai, kisi bhi jagah chalta hai aur ek saath kai arrays jodta hai. Jab jaan-boojh kar local array bana rahe ho tab push, aur naya chahiye tab spread.',
      },
      code: `[...a, ...b, x];                 // ✓ clear and flexible
a.toSpliced(0, 0, x);            // modern immutable insert`,
    },
  ],

  'What is the difference between mutable and immutable array methods?': [
    {
      heading: { en: 'Does it change the original?', hi: 'Kya ye original ko badalta hai?' },
      body: {
        en: 'A mutable method modifies the array in place and usually returns something other than the array — a length, a removed element. An immutable method leaves the original alone and returns a new array. Knowing which is which prevents a whole class of bugs.',
        hi: 'Mutable method array ko wahin badal deta hai aur aam taur pe array ke alawa kuch deta hai — length, hataya gaya element. Immutable method original ko chhod deta hai aur naya array deta hai. Kaun kaunsa hai ye jaan lena bugs ki poori shreni rok deta hai.',
      },
    },
    {
      heading: { en: 'The list worth memorising', hi: 'Yaad rakhne laayak list' },
      body: {
        en: 'There are exactly nine mutating methods. Everything else on Array.prototype returns something new. Learning the short list is easier than learning the long one.',
        hi: 'Bilkul nau mutating methods hain. Array.prototype pe baaki sab kuch naya deta hai. Chhoti list yaad karna lambi se aasaan hai.',
      },
      diagram: `MUTATING (9)                  NON-MUTATING
push     pop                  map      filter
shift    unshift              slice    concat
splice   sort                 reduce   flat
reverse  fill                 flatMap  join
copyWithin                    every    some  find`,
    },
    {
      heading: { en: 'sort and reverse are the dangerous pair', hi: 'sort aur reverse khatarnak jodi hain' },
      body: {
        en: 'They mutate AND return the array, so a chain looks harmless while quietly rewriting the original. This is the single most common accidental mutation in real code. Copy first.',
        hi: 'Ye mutate karte HAIN aur array bhi dete hain, toh chain bekhatar dikhti hai jabki chup-chaap original badal rahi hoti hai. Asli code mein galti se hone wali mutation mein ye sabse aam hai. Pehle copy karo.',
      },
      code: `const sorted = users.sort(byName);
sorted === users;          // true ✗ the original was reordered

const sorted = [...users].sort(byName);   // ✓ safe
const sorted = users.toSorted(byName);    // ✓ modern built-in`,
    },
    {
      heading: { en: 'The new immutable twins', hi: 'Naye immutable joDe' },
      body: {
        en: 'ES2023 added toSorted, toReversed, toSpliced and with — non-mutating versions of sort, reverse, splice and index assignment. They make the safe option the shorter one for the first time.',
        hi: 'ES2023 ne toSorted, toReversed, toSpliced aur with jode — sort, reverse, splice aur index assignment ke non-mutating roop. Pehli baar safe option chhota bhi ho gaya hai.',
      },
      code: `arr.toSorted(fn);        // instead of [...arr].sort(fn)
arr.toReversed();
arr.toSpliced(1, 2);
arr.with(0, 'x');        // instead of copying then arr[0] = 'x'`,
    },
    {
      heading: { en: 'Why it matters in React', hi: 'React mein ye kyun maayne rakhta hai' },
      body: {
        en: 'React compares state by reference. Mutating an array keeps the same reference, so the component does not re-render even though the data changed. Every state update must produce a new array.',
        hi: 'React state ko reference se compare karta hai. Array mutate karo toh reference wahi rehta hai, toh data badalne ke baad bhi component re-render nahi hota. Har state update ko naya array banana hi chahiye.',
      },
      code: `items.push(x); setItems(items);      // ✗ same reference, no render
setItems([...items, x]);              // ✓
setItems(items.filter((i) => i.id !== id));   // ✓ filter is safe`,
    },
    {
      heading: { en: 'When mutation is the right call', hi: 'Mutation kab sahi hai' },
      body: {
        en: 'Inside a function on an array you created yourself, mutation is fine and faster — nothing outside can observe it. The rule is about SHARED data: never mutate an array you were handed.',
        hi: 'Apne banaye array pe kisi function ke andar mutation theek hai aur tez bhi — bahar se koi dekh nahi sakta. Rule SHARED data ke liye hai: jo array tumhe diya gaya hai usse kabhi mat badlo.',
      },
      code: `function build(n) {
  const out = [];                 // local — mine to mutate
  for (let i = 0; i < n; i++) out.push(i);
  return out;
}`,
    },
  ],

  'How do you sort numbers correctly in JavaScript?': [
    {
      heading: { en: 'The default sort is alphabetical', hi: 'Default sort alphabetical hai' },
      body: {
        en: 'With no comparator, sort converts every element to a string and compares those strings. So 10 sorts before 9, because "10" is less than "9". This is the entire question.',
        hi: 'Bina comparator ke sort har element ko string bana kar un strings ko compare karta hai. Toh 10, 9 se pehle aa jaata hai, kyunki "10" "9" se chhota hai. Poora sawaal yahi hai.',
      },
      code: `[10, 9, 1, 100].sort();
// [1, 10, 100, 9]   ✗ string order

[10, 9, 1, 100].sort((a, b) => a - b);
// [1, 9, 10, 100]   ✓`,
    },
    {
      heading: { en: 'The comparator contract', hi: 'Comparator ka contract' },
      body: {
        en: 'Return a negative number to put a first, positive to put b first, and zero to treat them as equal. a - b gives ascending and b - a gives descending — that is why the subtraction idiom works.',
        hi: 'Negative number do toh a pehle, positive do toh b pehle, aur zero do toh dono barabar. a - b badhta kram deta hai aur b - a ghatta kram — isiliye subtraction wala idiom chalta hai.',
      },
      diagram: `compare(a, b)
  < 0   a comes first
  = 0   leave their order alone
  > 0   b comes first`,
    },
    {
      heading: { en: 'sort mutates', hi: 'sort mutate karta hai' },
      body: {
        en: 'It sorts the array in place AND returns it, which makes accidental mutation easy to miss. Copy first, or use toSorted.',
        hi: 'Ye array ko wahin sort karta HAI aur usse return bhi karta hai, jisse galti se hui mutation dikhti nahi. Pehle copy karo, ya toSorted use karo.',
      },
      code: `const sorted = [...nums].sort((a, b) => a - b);   // ✓
const sorted = nums.toSorted((a, b) => a - b);    // ✓ modern`,
    },
    {
      heading: { en: 'Do not use subtraction for strings or booleans', hi: 'Strings ya booleans pe subtraction mat lo' },
      body: {
        en: 'Subtracting strings gives NaN, and a NaN comparator leaves the order undefined. Use localeCompare for strings, which also handles accents and case correctly.',
        hi: 'Strings ko ghatane pe NaN milta hai, aur NaN wala comparator order ko anischit chhod deta hai. Strings ke liye localeCompare lo, jo accents aur case bhi theek sambhaalta hai.',
      },
      code: `names.sort((a, b) => a.localeCompare(b));            // ✓
names.sort((a, b) => a.localeCompare(b, 'hi'));      // locale-aware
nums.sort((a, b) => a - b);                           // numbers only`,
    },
    {
      heading: { en: 'Sorting objects, and multi-key sorts', hi: 'Objects sort karna, aur multi-key sort' },
      body: {
        en: 'Compare the field you care about. For a tiebreak, fall through with || — the first non-zero result wins, which reads exactly like the rule you would state in words.',
        hi: 'Jis field ki fikr hai usse compare karo. Barabari toote toh || se aage badho — pehla non-zero nateeja jeet jaata hai, jo bilkul waisa padha jaata hai jaise tum shabdon mein rule bataoge.',
      },
      code: `users.sort((a, b) => a.age - b.age);

users.sort((a, b) =>
  a.lastName.localeCompare(b.lastName) ||
  a.firstName.localeCompare(b.firstName) ||
  a.age - b.age
);`,
    },
    {
      heading: { en: 'Two details worth mentioning', hi: 'Do details zikr karne laayak' },
      body: {
        en: 'sort is stable as of ES2019, so equal elements keep their original order — which is what makes chained multi-key sorting reliable. And undefined values are always moved to the end, without ever being passed to your comparator.',
        hi: 'ES2019 se sort stable hai, toh barabar elements apna asli order rakhte hain — isi se chained multi-key sorting bharosemand banti hai. Aur undefined values hamesha aakhir mein bhej di jaati hain, tumhare comparator tak pahunche bina.',
      },
      code: `[3, undefined, 1].sort((a, b) => a - b);
// [1, 3, undefined] — undefined is always last`,
    },
  ],

  /* ─── Asynchrony ──────────────────────────────────────────── */

  'What is synchronous programming?': [
    {
      heading: { en: 'One thing at a time, in order', hi: 'Ek time pe ek kaam, kram se' },
      body: {
        en: 'Synchronous code runs statement by statement, and each one finishes completely before the next begins. Nothing is interleaved, so you can read the source top to bottom and know exactly what order things happen in.',
        hi: 'Synchronous code statement dar statement chalta hai, aur har ek agle se pehle poora khatam hota hai. Kuch beech mein nahi ghusta, toh source ko upar se neeche padh kar tumhe bilkul pata hota hai kya kis kram mein hoga.',
      },
      code: `console.log('1');
const x = compute();     // finishes fully
console.log('2');        // only then
// 1, then compute, then 2 — always`,
    },
    {
      heading: { en: 'It is also blocking', hi: 'Ye blocking bhi hai' },
      body: {
        en: 'Because the call stack can only hold one thing, a slow synchronous operation stops everything. In a browser that means no clicks, no scrolling, no rendering — the tab is frozen until it returns.',
        hi: 'Call stack ek hi cheez rakh sakta hai, isliye dheema synchronous operation sab kuch rok deta hai. Browser mein iska matlab hai na clicks, na scrolling, na rendering — return hone tak tab jam jaata hai.',
      },
      code: `const end = Date.now() + 3000;
while (Date.now() < end) {}      // 3 seconds of frozen UI
alert('now the page responds');`,
    },
    {
      heading: { en: 'JavaScript is synchronous by default', hi: 'JavaScript default se synchronous hai' },
      body: {
        en: 'The engine itself runs everything synchronously on one call stack, with run-to-completion semantics: your function will never be paused halfway to run someone else\'s. Asynchrony is something the runtime adds around it, not a property of the language.',
        hi: 'Engine khud sab kuch ek call stack pe synchronously chalata hai, run-to-completion ke saath: tumhara function beech mein rok kar kisi aur ka code nahi chalaya jaayega. Asynchrony runtime uske aas-paas jodta hai, ye language ki khoobi nahi.',
      },
    },
    {
      heading: { en: 'The blocking APIs to recognise', hi: 'Pehchanne laayak blocking APIs' },
      body: {
        en: 'alert, confirm and prompt block the browser. So does a synchronous XMLHttpRequest, which is why it is deprecated. In Node, every fs method ending in Sync blocks the event loop, and using one in a server request handler stalls every other request.',
        hi: 'alert, confirm aur prompt browser rok dete hain. Synchronous XMLHttpRequest bhi, isiliye wo deprecated hai. Node mein har fs method jo Sync pe khatam hota hai event loop rokta hai, aur server ke request handler mein ek bhi use karna baaki har request atka deta hai.',
      },
      code: `fs.readFileSync('big.json');     // ✗ blocks the whole server
await fs.promises.readFile('big.json');   // ✓`,
    },
    {
      heading: { en: 'When synchronous is the right choice', hi: 'Synchronous kab sahi chunav hai' },
      body: {
        en: 'Almost all your code. Pure computation, transforming data, rendering logic — none of it should be async. Reach for asynchrony only when you are genuinely waiting on something outside the engine: the network, the disk, a timer, the user.',
        hi: 'Tumhara lagbhag saara code. Pure computation, data badalna, rendering logic — inme se kuch bhi async nahi hona chahiye. Asynchrony tabhi lo jab tum sach mein engine ke bahar kisi cheez ka intezaar kar rahe ho: network, disk, timer, user.',
      },
    },
  ],

  'What is asynchronous programming?': [
    {
      heading: { en: 'Start now, finish later, do not wait', hi: 'Abhi shuru karo, baad mein khatam, intezaar mat karo' },
      body: {
        en: 'An asynchronous operation is handed off and returns immediately. The rest of your code keeps running, and the result arrives later through a callback, a promise or an await. Nothing is blocked in the meantime.',
        hi: 'Asynchronous operation kisi aur ko saunp diya jaata hai aur turant laut aata hai. Tumhara baaki code chalta rehta hai, aur nateeja baad mein callback, promise ya await se aata hai. Beech mein kuch block nahi hota.',
      },
      code: `console.log('1');
fetch('/api');           // handed to the browser, returns at once
console.log('2');
// 1, 2 — and the response arrives sometime after`,
    },
    {
      heading: { en: 'Concurrency, not parallelism', hi: 'Concurrency, parallelism nahi' },
      body: {
        en: 'This distinction is worth stating. Your JavaScript still runs on one thread — only one piece of it executes at a time. What overlaps is the WAITING: the browser handles ten network requests at once while your single thread stays free.',
        hi: 'Ye farq batane laayak hai. Tumhara JavaScript ab bhi ek thread pe chalta hai — ek time pe uska ek hi hissa chalta hai. Jo overlap hota hai wo INTEZAAR hai: browser ek saath das network requests sambhaalta hai jabki tumhara ek thread khaali rehta hai.',
      },
      diagram: `parallel      ████████   two threads doing work at once
              ████████

concurrent    ██      ██   one thread, work interleaved
                ~~~~~~     waiting handled elsewhere`,
    },
    {
      heading: { en: 'How the result gets back to you', hi: 'Nateeja tum tak wapas kaise aata hai' },
      body: {
        en: 'The runtime cannot interrupt you, so it queues your callback. The event loop waits for the call stack to empty, drains all microtasks, then takes one macrotask. Promise callbacks are microtasks and therefore jump ahead of timers.',
        hi: 'Runtime tumhe beech mein rok nahi sakta, isliye wo tumhara callback queue kar deta hai. Event loop call stack khaali hone ka intezaar karta hai, saare microtasks khaali karta hai, phir ek macrotask leta hai. Promise callbacks microtasks hain isliye timers se aage nikal jaate hain.',
      },
      code: `console.log('a');
setTimeout(() => console.log('b'));
Promise.resolve().then(() => console.log('c'));
console.log('d');
// a d c b`,
    },
    {
      heading: { en: 'Three generations of syntax', hi: 'Syntax ki teen peedhiyan' },
      body: {
        en: 'Callbacks came first and nested badly. Promises made the flow chainable and guaranteed a single settlement. async/await is syntax over promises that lets you write the same logic top to bottom with ordinary try/catch.',
        hi: 'Callbacks pehle aaye aur buri tarah nest hue. Promises ne flow ko chainable banaya aur ek hi settlement guarantee ki. async/await promises ke upar syntax hai jo wahi logic upar se neeche, aam try/catch ke saath likhne deta hai.',
      },
      code: `getUser(id, (e, u) => { … });                    // callback
getUser(id).then(getOrders).catch(handle);        // promise
const u = await getUser(id);                      // async/await`,
    },
    {
      heading: { en: 'The mistake await makes easy', hi: 'Wo galti jo await aasaan bana deta hai' },
      body: {
        en: 'Because it reads synchronously, people await inside loops and serialise work that had no dependency between its steps. Start everything first, then await once with Promise.all.',
        hi: 'Ye synchronous jaisa padha jaata hai, isliye log loops ke andar await karte hain aur wo kaam serial bana dete hain jinke steps mein koi nirbharta thi hi nahi. Pehle sab shuru karo, phir Promise.all se ek baar await karo.',
      },
      code: `for (const id of ids) out.push(await load(id));   // ✗ serial
const out = await Promise.all(ids.map(load));      // ✓ parallel`,
    },
    {
      heading: { en: 'Async does not make CPU work faster', hi: 'Async CPU ka kaam tez nahi karta' },
      body: {
        en: 'Wrapping a heavy calculation in an async function changes nothing — it still runs on the one thread and still freezes the page. Asynchrony helps with WAITING. For heavy computation you need a Web Worker.',
        hi: 'Bhaari calculation ko async function mein lapetne se kuch nahi badalta — wo ab bhi usi ek thread pe chalega aur page ab bhi jam jaayega. Asynchrony INTEZAAR mein madad karti hai. Bhaari computation ke liye Web Worker chahiye.',
      },
    },
  ],

  'What are the Promise states?': [
    {
      heading: { en: 'Three states, one transition', hi: 'Teen states, ek badlaav' },
      body: {
        en: 'A promise begins pending. It then either becomes fulfilled with a value or rejected with a reason. That transition happens at most once and can never be undone — a settled promise keeps its result forever.',
        hi: 'Promise pending se shuru hota hai. Phir wo ya toh kisi value ke saath fulfilled hota hai ya kisi reason ke saath rejected. Ye badlaav zyada se zyada ek baar hota hai aur kabhi ulta nahi ho sakta — settled promise apna nateeja hamesha rakhta hai.',
      },
      diagram: `              ┌──► fulfilled (value)   → .then
   pending ───┤
              └──► rejected  (reason)  → .catch

   one-way, and at most once`,
    },
    {
      heading: { en: 'Settled is not a fourth state', hi: 'Settled chautha state nahi hai' },
      body: {
        en: 'People often say "settled" as though it were a state. It is an umbrella term meaning fulfilled OR rejected — that is, no longer pending. Getting this right is a small but noticed detail.',
        hi: 'Log aksar "settled" ko state ki tarah bolte hain. Ye ek chhatri shabd hai jiska matlab hai fulfilled YA rejected — yaani ab pending nahi. Ye theek bolna chhoti par dhyaan mein aane wali baat hai.',
      },
      code: `// pending → fulfilled            settled
// pending → rejected             settled
// there is no way back to pending`,
    },
    {
      heading: { en: 'The immutability guarantee', hi: 'Immutability ki guarantee' },
      body: {
        en: 'Once settled, further calls to resolve or reject are ignored. This is what makes promises safer than callbacks: a buggy library cannot call you twice, and a handler attached long after settlement still receives the stored result.',
        hi: 'Ek baar settle hone ke baad resolve ya reject ke aage ke calls ignore ho jaate hain. Isi se promises callbacks se safe hain: kharaab library tumhe do baar call nahi kar sakti, aur settle hone ke bahut baad laga handler bhi rakha hua nateeja pa leta hai.',
      },
      code: `const p = new Promise((resolve, reject) => {
  resolve('first');
  resolve('second');   // ignored
  reject('nope');      // ignored
});
p.then(console.log);   // 'first'

setTimeout(() => p.then(console.log), 1000);   // 'first' again`,
    },
    {
      heading: { en: 'You cannot read the state synchronously', hi: 'State ko synchronously nahi padh sakte' },
      body: {
        en: 'There is no p.state property. The only way to observe a promise is to attach a handler, and that handler always runs asynchronously as a microtask — even if the promise was already settled.',
        hi: 'p.state jaisi koi property nahi hai. Promise ko dekhne ka ek hi tareeka hai handler lagana, aur wo handler hamesha asynchronously microtask ki tarah chalta hai — chahe promise pehle se settled ho.',
      },
      code: `const p = Promise.resolve(1);
p.then(() => console.log('then'));
console.log('sync');
// sync
// then   ← always after the current script`,
    },
    {
      heading: { en: 'Resolved is not the same as fulfilled', hi: 'Resolved aur fulfilled ek nahi hain' },
      body: {
        en: 'A subtle point that impresses when you get it right. Resolving a promise with another promise makes it ADOPT that promise — it stays pending until the inner one settles. So "resolved" means "locked in", which may still mean pending.',
        hi: 'Ek sookshm baat jo theek bolne pe asar chhodti hai. Kisi promise ko doosre promise se resolve karo toh wo usse APNA leta hai — jab tak andar wala settle na ho wo pending rehta hai. Toh "resolved" matlab "tay ho gaya", jo abhi bhi pending ho sakta hai.',
      },
      code: `const p = Promise.resolve(new Promise((r) => setTimeout(r, 1000)));
// p is "resolved" but still PENDING for a second`,
    },
    {
      heading: { en: 'Handling both outcomes', hi: 'Dono nateeje sambhalna' },
      body: {
        en: 'then takes an optional second argument for rejection, but catch is clearer and also covers errors thrown inside earlier then handlers. finally runs on either outcome and passes the result through untouched.',
        hi: 'then rejection ke liye ek optional doosra argument leta hai, par catch saaf hai aur pehle wale then handlers ke andar phenke gaye errors bhi pakadta hai. finally dono nateejon pe chalta hai aur result waise ka waisa aage bhej deta hai.',
      },
      code: `p.then(onOk, onErr);              // does NOT catch onOk's own throw
p.then(onOk).catch(onErr);        // ✓ catches both
p.finally(hideSpinner);           // runs either way`,
    },
  ],

  'What is the difference between callbacks and promises?': [
    {
      heading: { en: 'Push versus pull', hi: 'Push vs pull' },
      body: {
        en: 'With a callback you hand your function to the operation and it calls you — you have no object to hold. A promise gives you back a VALUE representing the future result, which you can store, pass around, and attach handlers to whenever you like.',
        hi: 'Callback mein tum apna function operation ko de dete ho aur wo tumhe bulata hai — tumhare paas pakadne ko kuch nahi hota. Promise tumhe ek VALUE wapas deta hai jo bhavishya ka nateeja darshati hai, jise tum rakh sakte ho, ghuma sakte ho, aur jab chaaho handler laga sakte ho.',
      },
      code: `getUser(id, (e, u) => {});        // you give a function away

const p = getUser(id);            // you get an object back
p.then(use);                      // attach whenever you want`,
    },
    {
      heading: { en: 'Nesting versus chaining', hi: 'Nesting vs chaining' },
      body: {
        en: 'Dependent callbacks nest one inside the next and grow sideways. Because then returns a new promise and waits for any promise you return from it, the same sequence becomes a flat chain.',
        hi: 'Ek doosre pe nirbhar callbacks ek ke andar ek nest hote hain aur bagal mein badhte jaate hain. then naya promise deta hai aur tumhare return kiye promise ka intezaar karta hai, isliye wahi sequence ek seedhi chain ban jaati hai.',
      },
      code: `getUser(id, (e, u) => {
  getOrders(u, (e, o) => {
    getItems(o[0], (e, i) => { … });     // ✗ grows right
  });
});

getUser(id).then(getOrders).then((o) => getItems(o[0]));   // ✓`,
    },
    {
      heading: { en: 'Error handling is the biggest win', hi: 'Sabse badi jeet error handling hai' },
      body: {
        en: 'Callbacks force you to check the error argument at every level, and try/catch cannot cross the async boundary. A promise chain propagates rejection down to a single catch, and a throw inside any handler is caught there too.',
        hi: 'Callbacks har level pe error argument check karwate hain, aur try/catch async boundary paar nahi kar sakta. Promise chain rejection ko neeche ek hi catch tak pahuncha deti hai, aur kisi bhi handler ke andar phenka gaya error wahin pakda jaata hai.',
      },
      code: `getUser(id)
  .then(getOrders)
  .then(render)
  .catch(handle);       // ✓ any failure above lands here`,
    },
    {
      heading: { en: 'Promises guarantee things callbacks cannot', hi: 'Promises wo guarantee dete hain jo callbacks nahi de sakte' },
      body: {
        en: 'Three guarantees, all enforced by the specification. A handler is called at most once. It always runs asynchronously, even if the promise already settled — so timing is consistent. And the result is stored, so attaching late still works.',
        hi: 'Teen guarantees, sab specification se lagoo. Handler zyada se zyada ek baar chalta hai. Wo hamesha asynchronously chalta hai, chahe promise pehle se settle ho — toh timing ek jaisi rehti hai. Aur nateeja rakha jaata hai, toh der se handler lagana bhi chalta hai.',
      },
      code: `// A buggy callback API can do this:
function bad(cb) { cb(null, 1); cb(null, 2); }   // called twice ✗

// A promise cannot:
new Promise((r) => { r(1); r(2); }).then(console.log);   // 1 only`,
    },
    {
      heading: { en: 'Composition is only possible with promises', hi: 'Composition sirf promises se mumkin hai' },
      body: {
        en: 'Because a promise is a value, you can put promises in an array and combine them. There is no callback equivalent of Promise.all — you would have to hand-roll a counter and a results array, and get the error case right yourself.',
        hi: 'Promise ek value hai, isliye promises ko array mein daal kar jod sakte ho. Promise.all jaisa callback mein kuch nahi hai — tumhe khud counter aur results array banana padta, aur error wala case bhi khud theek karna padta.',
      },
      code: `await Promise.all([a(), b(), c()]);
await Promise.race([fetchIt(), timeout(5000)]);`,
    },
    {
      heading: { en: 'Where callbacks are still correct', hi: 'Callbacks abhi bhi kahan sahi hain' },
      body: {
        en: 'A promise settles exactly once, so it is the wrong shape for a repeating event. addEventListener, streams and observers are all callback-based for good reason. Use promisify or util.promisify to convert one-shot callback APIs.',
        hi: 'Promise theek ek baar settle hota hai, isliye baar-baar hone wale event ke liye wo galat shape hai. addEventListener, streams aur observers sab wajah se callback-based hain. Ek baar wale callback APIs badalne ke liye promisify ya util.promisify use karo.',
      },
      code: `const readFile = util.promisify(fs.readFile);
const data = await readFile('a.txt');`,
    },
  ],

  'What is the difference between async/await and plain Promises?': [
    {
      heading: { en: 'Same machinery, different syntax', hi: 'Wahi machinery, alag syntax' },
      body: {
        en: 'async/await is sugar over promises — nothing new happens underneath. An async function always returns a promise, and await simply pauses that function until a promise settles, then unwraps its value.',
        hi: 'async/await promises ke upar sugar hai — andar kuch naya nahi hota. Async function hamesha promise return karta hai, aur await bas us function ko rokta hai jab tak promise settle na ho, phir uski value khol deta hai.',
      },
      code: `async function f() { return 1; }
f();                    // Promise { 1 } — not 1

// these two are equivalent:
getUser(id).then((u) => u.name);
async () => (await getUser(id)).name;`,
    },
    {
      heading: { en: 'Error handling is the real gain', hi: 'Asli fayda error handling hai' },
      body: {
        en: 'With await, an ordinary try/catch works because the rejection surfaces as a thrown error at the await. You get one familiar construct instead of a chain of catch handlers, and you can catch a single step precisely.',
        hi: 'await ke saath aam try/catch chalta hai kyunki rejection await pe phenke gaye error ki tarah upar aata hai. catch handlers ki chain ki jagah ek jaana-pehchana construct milta hai, aur tum theek ek step ko pakad sakte ho.',
      },
      code: `try {
  const u = await getUser(id);
  const o = await getOrders(u);
} catch (e) {
  handle(e);          // covers both
} finally {
  hideSpinner();
}`,
    },
    {
      heading: { en: 'Conditionals and loops read normally', hi: 'Conditionals aur loops normal padhe jaate hain' },
      body: {
        en: 'Branching in a promise chain means returning different promises and threading values through, which gets awkward fast. With await, an if is just an if, and intermediate values stay in scope for the rest of the function.',
        hi: 'Promise chain mein branching ka matlab hai alag promises return karna aur values ko aage pirona, jo jaldi hi bhadda ho jaata hai. await ke saath if bas if hai, aur beech ki values poore function mein scope mein rehti hain.',
      },
      code: `// chain — value threading gets clumsy
getUser(id).then((u) => getOrders(u).then((o) => ({ u, o })));

// await — both stay in scope
const u = await getUser(id);
const o = await getOrders(u);
if (o.length === 0) return null;`,
    },
    {
      heading: { en: 'The serialisation trap', hi: 'Serialisation ka jaal' },
      body: {
        en: 'This is the cost of the nicer syntax. await in a loop waits for each iteration, so three one-second calls take three seconds. Promise chains made the parallel option obvious; await hides it. Start everything, then await once.',
        hi: 'Achhe syntax ki yahi keemat hai. Loop mein await har iteration ka intezaar karta hai, toh ek-ek second ke teen calls teen second lete hain. Promise chains mein parallel wala option saaf dikhta tha; await usse chhupa deta hai. Sab shuru karo, phir ek baar await.',
      },
      code: `for (const id of ids) out.push(await load(id));   // ✗ 3s
const out = await Promise.all(ids.map(load));      // ✓ ~1s

// independent calls — start both, then await
const [a, b] = await Promise.all([getA(), getB()]);`,
    },
    {
      heading: { en: 'Where you still need the promise API', hi: 'Promise API ab bhi kahan chahiye' },
      body: {
        en: 'Combinators — all, race, any, allSettled — have no await equivalent. You also cannot await at the top level of a CommonJS module, and attaching a handler to a promise you want to keep running in the background is cleaner with then.',
        hi: 'Combinators — all, race, any, allSettled — ka await mein koi joda nahi hai. CommonJS module ke top level pe await bhi nahi kar sakte, aur jis promise ko background mein chalte rehne dena hai uspe handler lagana then se saaf hota hai.',
      },
      code: `void trackAnalytics().catch(noop);      // fire and forget
await Promise.allSettled(tasks);        // no await-only form`,
    },
    {
      heading: { en: 'Two details worth knowing', hi: 'Do details jaanne laayak' },
      body: {
        en: 'await works on any thenable, not just real promises. And awaiting a non-promise still yields to the microtask queue, so it is not a no-op — the function still pauses and resumes.',
        hi: 'await kisi bhi thenable pe chalta hai, sirf asli promises pe nahi. Aur non-promise ko await karna bhi microtask queue ko mauka deta hai, toh ye bekaar nahi hai — function phir bhi rukta aur wapas chalta hai.',
      },
      code: `await 5;               // still defers to a microtask
console.log('after');   // runs later than you might expect`,
    },
  ],

  'What is Promise.all()?': [
    {
      heading: { en: 'Wait for every promise, in parallel', hi: 'Har promise ka intezaar, parallel mein' },
      body: {
        en: 'Promise.all takes an iterable of promises and returns one promise that fulfils with an array of all their values. The operations run concurrently, so the total time is roughly the slowest one, not the sum.',
        hi: 'Promise.all promises ka ek iterable leta hai aur ek promise deta hai jo un sabki values ke array ke saath fulfil hota hai. Operations saath chalte hain, toh kul samay lagbhag sabse dheeme ke barabar hai, jod nahi.',
      },
      code: `const [user, posts, tags] = await Promise.all([
  getUser(id),      // 300ms
  getPosts(id),     // 500ms
  getTags(),        // 200ms
]);
// total ≈ 500ms, not 1000ms`,
    },
    {
      heading: { en: 'Order is preserved regardless of timing', hi: 'Timing chahe kuch bhi ho, order bacha rehta hai' },
      body: {
        en: 'The results array matches the input order, not the order in which they finished. That is what makes destructuring the result safe.',
        hi: 'Results ka array input ke order se milta hai, na ki khatam hone ke order se. Isi se result ko destructure karna safe hota hai.',
      },
      code: `await Promise.all([slow(), fast()]);
// [slowResult, fastResult] — always in that order`,
    },
    {
      heading: { en: 'It fails fast, on the first rejection', hi: 'Ye pehli rejection pe hi fail ho jaata hai' },
      body: {
        en: 'One rejection rejects the whole thing immediately, with that single reason. You lose the results of everything that succeeded — this is the behaviour that surprises people and the reason allSettled exists.',
        hi: 'Ek rejection poore ko turant reject kar deti hai, usi ek reason ke saath. Jo safal hue unke nateeje kho jaate hain — yahi behaviour logon ko chaunkata hai aur isiliye allSettled hai.',
      },
      code: `await Promise.all([ok(), fails(), ok()]);
// ✗ rejects at once — the two successes are discarded

await Promise.allSettled([ok(), fails(), ok()]);
// ✓ all three outcomes, each tagged`,
    },
    {
      heading: { en: 'The other promises keep running', hi: 'Baaki promises chalte rehte hain' },
      body: {
        en: 'A rejection does not cancel anything. The remaining requests still complete and their handlers still run — the combined promise just stops reporting them. Promises have no cancellation; use AbortController if you need it.',
        hi: 'Rejection kuch cancel nahi karti. Baaki requests phir bhi poori hoti hain aur unke handlers bhi chalte hain — bas combined promise unke baare mein batana band kar deta hai. Promises mein cancellation hai hi nahi; chahiye toh AbortController use karo.',
      },
    },
    {
      heading: { en: 'Non-promise values pass straight through', hi: 'Non-promise values seedha nikal jaati hain' },
      body: {
        en: 'Anything in the array that is not a promise is wrapped with Promise.resolve. That makes it safe to mix plain values in, and Promise.all on an empty array fulfils immediately with an empty array.',
        hi: 'Array mein jo promise nahi hai wo Promise.resolve se lapet diya jaata hai. Toh saadi values milana safe hai, aur khaali array pe Promise.all turant khaali array ke saath fulfil ho jaata hai.',
      },
      code: `await Promise.all([1, Promise.resolve(2)]);   // [1, 2]
await Promise.all([]);                         // [] immediately`,
    },
    {
      heading: { en: 'The mistake: calling inside the array', hi: 'Galti: array ke andar call karna' },
      body: {
        en: 'You must pass promises that have ALREADY started. Wrapping already-awaited values, or awaiting inside a map callback, serialises the work and defeats the point entirely.',
        hi: 'Aise promises dene hain jo PEHLE SE shuru ho chuke hon. Pehle se await ki hui values lapetna, ya map callback ke andar await karna, kaam serial bana deta hai aur poora maqsad hi khatam kar deta hai.',
      },
      code: `// ✗ serial — each await finishes before the next starts
const a = await getA(); const b = await getB();
await Promise.all([a, b]);

// ✓ both in flight, then awaited together
await Promise.all([getA(), getB()]);`,
    },
  ],

  'What is the difference between Promise.all(), Promise.race(), Promise.any(), and Promise.allSettled()?': [
    {
      heading: { en: 'Four combinators, four questions', hi: 'Chaar combinators, chaar sawaal' },
      body: {
        en: 'Each answers a different question about a set of promises. all asks "did they all succeed?", allSettled asks "what happened to each?", race asks "what finished first?", any asks "did any succeed?".',
        hi: 'Har ek promises ke samooh ke baare mein alag sawaal ka jawab deta hai. all poochta hai "kya sab safal hue?", allSettled "har ek ka kya hua?", race "sabse pehle kya khatam hua?", any "koi safal hua kya?".',
      },
      diagram: `             fulfils when           rejects when
all          ALL fulfil             ANY rejects (fail fast)
allSettled   all settle             never
race         the FIRST settles      if the first settles as a rejection
any          the FIRST fulfils      ALL reject (AggregateError)`,
    },
    {
      heading: { en: 'all — everything or nothing', hi: 'all — sab kuch ya kuch nahi' },
      body: {
        en: 'Fulfils with an array of values in input order. One rejection rejects the whole thing immediately and throws away the successes. Use it when every piece is required to proceed.',
        hi: 'Input ke order mein values ka array de kar fulfil hota hai. Ek rejection poore ko turant reject kar deti hai aur safaltaayein phenk deti hai. Isse tab use karo jab aage badhne ke liye har tukda zaroori ho.',
      },
      code: `const [a, b] = await Promise.all([getA(), getB()]);`,
    },
    {
      heading: { en: 'allSettled — never rejects', hi: 'allSettled — kabhi reject nahi hota' },
      body: {
        en: 'Waits for every promise and fulfils with an array of result objects, each tagged with a status of "fulfilled" or "rejected". This is what you want when partial success is acceptable — a dashboard where one failing widget should not blank the page.',
        hi: 'Har promise ka intezaar karta hai aur result objects ka array deta hai, har ek pe "fulfilled" ya "rejected" ka status. Jab aadhi safalta bhi chalti ho tab yahi chahiye — aisa dashboard jahan ek widget fail ho toh poora page khaali na ho.',
      },
      code: `const results = await Promise.allSettled(tasks);
const ok = results.filter((r) => r.status === 'fulfilled')
                  .map((r) => r.value);
const failed = results.filter((r) => r.status === 'rejected')
                      .map((r) => r.reason);`,
    },
    {
      heading: { en: 'race — the first to settle, either way', hi: 'race — pehla jo settle ho, chahe jaise' },
      body: {
        en: 'Settles as soon as ANY promise settles, and adopts its outcome. A rejection wins the race just as readily as a fulfilment — which is exactly what makes it the timeout idiom.',
        hi: 'Jaise hi KOI promise settle hota hai ye settle ho jaata hai, aur uska nateeja apna leta hai. Rejection bhi utni hi aasaani se race jeet leti hai jitni fulfilment — aur isi se ye timeout ka idiom ban jaata hai.',
      },
      code: `const timeout = (ms) =>
  new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms));

await Promise.race([fetchData(), timeout(5000)]);`,
    },
    {
      heading: { en: 'any — the first SUCCESS', hi: 'any — pehli SAFALTA' },
      body: {
        en: 'Ignores rejections and waits for the first fulfilment. Only if every promise rejects does it reject, with an AggregateError whose errors array holds all the reasons. Use it to try several mirrors and take whichever answers first.',
        hi: 'Rejections ko ignore karta hai aur pehli fulfilment ka intezaar karta hai. Sirf tab reject karta hai jab har promise reject ho, ek AggregateError ke saath jiske errors array mein saare reasons hote hain. Kai mirrors try karke jo pehle jawab de wo lene ke liye isse use karo.',
      },
      code: `try {
  const data = await Promise.any([fromCDN(), fromOrigin(), fromCache()]);
} catch (e) {
  e.errors;   // an array of every rejection reason
}`,
    },
    {
      heading: { en: 'What none of them do', hi: 'Inme se koi kya nahi karta' },
      body: {
        en: 'None cancels anything. Once a combinator settles, the remaining promises keep running to completion — their side effects still happen. If you need real cancellation, pass an AbortSignal to each operation.',
        hi: 'Koi bhi kuch cancel nahi karta. Combinator settle hone ke baad bhi baaki promises poore chalte rehte hain — unke side effects hote hi hain. Asli cancellation chahiye toh har operation ko AbortSignal do.',
      },
      code: `const c = new AbortController();
const p = fetch(url, { signal: c.signal });
c.abort();     // ✓ actually stops the request`,
    },
    {
      heading: { en: 'Choosing, in one sentence each', hi: 'Chunna, ek-ek line mein' },
      body: {
        en: 'all when every result is required. allSettled when you want a report and partial success is fine. race for timeouts and for whichever-comes-first. any for fallbacks where only one needs to work.',
        hi: 'all jab har nateeja zaroori ho. allSettled jab report chahiye aur aadhi safalta chal jaaye. race timeouts ke liye aur jo-pehle-aaye ke liye. any fallbacks ke liye jahan sirf ek ka chalna kaafi ho.',
      },
    },
  ],

  'What is the difference between microtasks and macrotasks?': [
    {
      heading: { en: 'Two queues with unequal priority', hi: 'Do queues, alag-alag priority' },
      body: {
        en: 'Both hold callbacks waiting for the call stack to empty, but the event loop treats them very differently. The microtask queue is drained COMPLETELY on every turn; the macrotask queue gives up exactly ONE callback per turn.',
        hi: 'Dono mein wo callbacks hain jo call stack khaali hone ka intezaar kar rahe hain, par event loop dono ke saath bahut alag vyavhaar karta hai. Microtask queue har chakkar mein POORI khaali hoti hai; macrotask queue har chakkar mein theek EK callback deti hai.',
      },
      diagram: `MICROTASKS                  MACROTASKS
.then .catch .finally       setTimeout  setInterval
await continuations         setImmediate (Node)
queueMicrotask              I/O, DOM events
MutationObserver            MessageChannel

ALL of them per turn        exactly ONE per turn`,
    },
    {
      heading: { en: 'The loop, stated exactly', hi: 'Loop, bilkul theek-theek' },
      body: {
        en: 'Run the current script to completion. Drain the entire microtask queue, including microtasks queued while draining. Render if it is time. Take one macrotask and run it. Repeat.',
        hi: 'Maujooda script poori chalao. Poori microtask queue khaali karo, un microtasks samet jo khaali karte waqt aaye. Waqt ho toh render karo. Ek macrotask lo aur chalao. Dohrao.',
      },
      code: `while (true) {
  runUntilStackEmpty();
  while (microtasks.length) run(microtasks.shift());   // ALL
  maybeRender();
  if (macrotasks.length) run(macrotasks.shift());      // ONE
}`,
    },
    {
      heading: { en: 'What that priority looks like', hi: 'Wo priority dikhti kaisi hai' },
      body: {
        en: 'Every promise callback runs before any timer, even a timer registered first with zero delay. Trace this example once and the rule stops feeling arbitrary.',
        hi: 'Har promise callback kisi bhi timer se pehle chalta hai, us timer se bhi jo pehle zero delay ke saath register hua. Ye example ek baar trace kar lo toh rule mann-maana lagna band ho jaata hai.',
      },
      code: `setTimeout(() => console.log('timeout 1'));
Promise.resolve().then(() => console.log('promise 1'));
setTimeout(() => console.log('timeout 2'));
Promise.resolve().then(() => console.log('promise 2'));

// promise 1, promise 2, timeout 1, timeout 2`,
    },
    {
      heading: { en: 'Microtasks added during a drain still run', hi: 'Drain ke dauraan aaye microtasks bhi chalte hain' },
      body: {
        en: 'The queue is drained until it is empty, not to a snapshot of its length. A microtask that queues another gets its child processed in the same turn — before any macrotask.',
        hi: 'Queue tab tak khaali ki jaati hai jab tak wo khatam na ho, uski length ke snapshot tak nahi. Jo microtask doosra queue kare uska bachcha usi chakkar mein chalta hai — kisi bhi macrotask se pehle.',
      },
      code: `Promise.resolve().then(() => {
  console.log('a');
  Promise.resolve().then(() => console.log('b'));
});
setTimeout(() => console.log('c'));
// a, b, c   ← b jumps ahead of the timer`,
    },
    {
      heading: { en: 'Which is why starvation is possible', hi: 'Isiliye starvation mumkin hai' },
      body: {
        en: 'A microtask that endlessly queues another never lets the loop reach rendering or a macrotask. The page freezes with an empty call stack, which makes it confusing to diagnose. A recursive setTimeout has no such problem because it yields between turns.',
        hi: 'Jo microtask bina ruke doosra queue karta rahe wo loop ko rendering ya macrotask tak pahunchne hi nahi deta. Page khaali call stack ke saath jam jaata hai, jisse pehchanna mushkil ho jaata hai. Recursive setTimeout mein ye problem nahi kyunki wo chakkar ke beech mauka deta hai.',
      },
      code: `function loop() { Promise.resolve().then(loop); }
loop();                     // ✗ freezes the tab

function ok() { setTimeout(ok); }
ok();                       // ✓ fine`,
    },
    {
      heading: { en: 'Rendering sits between macrotasks', hi: 'Rendering macrotasks ke beech baithti hai' },
      body: {
        en: 'The browser can only paint after microtasks are drained, and it does so between macrotasks — typically about once every sixteen milliseconds. That is why requestAnimationFrame, which runs just before paint, is the right hook for animation rather than a timer.',
        hi: 'Browser tabhi paint kar sakta hai jab microtasks khaali ho jaayein, aur wo macrotasks ke beech karta hai — aam taur pe har solah millisecond mein ek baar. Isiliye animation ke liye timer nahi, requestAnimationFrame sahi hook hai, jo paint se theek pehle chalta hai.',
      },
    },
  ],

  'Explain the execution order of: console.log(1); setTimeout(() => console.log(2)); Promise.resolve().then(() => console.log(3)); console.log(4);': [
    {
      heading: { en: 'The answer is 1, 4, 3, 2', hi: 'Jawab hai 1, 4, 3, 2' },
      body: {
        en: 'Synchronous lines first in source order, then all microtasks, then macrotasks. Every question of this shape is answered by that one sentence — the rest is showing you can apply it.',
        hi: 'Pehle synchronous lines, source ke kram mein, phir saare microtasks, phir macrotasks. Is shakal ka har sawaal isi ek line se hal ho jaata hai — baaki bas ye dikhana hai ki tum isse laga sakte ho.',
      },
      code: `console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
console.log(4);

// 1
// 4
// 3
// 2`,
    },
    {
      heading: { en: 'Step one: the synchronous pass', hi: 'Pehla kadam: synchronous chakkar' },
      body: {
        en: 'The engine runs the script top to bottom. Line 1 logs immediately. Line 2 registers a timer with the runtime and returns — the callback does not run. Line 3 creates an already-resolved promise and queues its handler as a microtask. Line 4 logs.',
        hi: 'Engine script upar se neeche chalata hai. Line 1 turant log karti hai. Line 2 runtime ke paas timer register karke laut aati hai — callback nahi chalta. Line 3 pehle se resolved promise banati hai aur uska handler microtask ki tarah queue karti hai. Line 4 log karti hai.',
      },
      diagram: `after the script finishes:

call stack     empty
microtasks     [ log 3 ]
macrotasks     [ log 2 ]
output so far  1, 4`,
    },
    {
      heading: { en: 'Step two: drain the microtasks', hi: 'Doosra kadam: microtasks khaali karo' },
      body: {
        en: 'With the stack empty, the event loop empties the microtask queue completely before touching anything else. The promise handler logs 3.',
        hi: 'Stack khaali hote hi event loop kisi aur cheez ko chhoone se pehle microtask queue poori khaali karta hai. Promise handler 3 log karta hai.',
      },
    },
    {
      heading: { en: 'Step three: one macrotask', hi: 'Teesra kadam: ek macrotask' },
      body: {
        en: 'Only now does the loop take a macrotask. The timer callback logs 2. Note that the timer was registered BEFORE the promise, and it still runs last — priority beats registration order.',
        hi: 'Ab jaakar loop ek macrotask leta hai. Timer callback 2 log karta hai. Dhyaan do timer promise se PEHLE register hua tha, aur phir bhi aakhir mein chala — priority register hone ke kram se jeet jaati hai.',
      },
    },
    {
      heading: { en: 'The variant with await', hi: 'await wala roop' },
      body: {
        en: 'Interviewers usually follow up with this one. Everything up to the first await runs synchronously; the code after it becomes a microtask, exactly like a then handler.',
        hi: 'Interviewers aam taur pe iske baad yahi poochte hain. Pehle await tak ka sab kuch synchronously chalta hai; uske baad ka code microtask ban jaata hai, bilkul then handler ki tarah.',
      },
      code: `async function f() {
  console.log('a');
  await null;
  console.log('b');     // ← this is now a microtask
}
f();
console.log('c');
// a, c, b`,
    },
    {
      heading: { en: 'The variant with nested queueing', hi: 'Nested queueing wala roop' },
      body: {
        en: 'The hardest common version. A microtask queued from inside another microtask still runs in the same drain, before any timer. A microtask queued from inside a timer runs immediately after that timer, before the next one.',
        hi: 'Sabse mushkil aam version. Kisi microtask ke andar se queue hua microtask usi drain mein chalta hai, kisi bhi timer se pehle. Kisi timer ke andar se queue hua microtask us timer ke turant baad chalta hai, agle timer se pehle.',
      },
      code: `setTimeout(() => { console.log('t1');
  Promise.resolve().then(() => console.log('p-in-t1')); });
setTimeout(() => console.log('t2'));
Promise.resolve().then(() => console.log('p1'));

// p1, t1, p-in-t1, t2`,
    },
    {
      heading: { en: 'How to say it out loud', hi: 'Isse bol kar kaise kehna hai' },
      body: {
        en: '"All synchronous code runs first, so 1 and 4. Then the event loop drains the entire microtask queue, so the promise callback logs 3. Then it takes one macrotask, so the timer logs 2. Microtasks always beat macrotasks, regardless of registration order."',
        hi: '"Saara synchronous code pehle chalta hai, toh 1 aur 4. Phir event loop poori microtask queue khaali karta hai, toh promise callback 3 log karta hai. Phir wo ek macrotask leta hai, toh timer 2 log karta hai. Microtasks hamesha macrotasks se jeet jaate hain, register hone ke kram se koi farq nahi."',
      },
    },
  ],

  /* ─── Modules, strictness and the engine ──────────────────── */

  'What are iterators in JavaScript?': [
    {
      heading: { en: 'An object with a next method', hi: 'Ek object jisme next method ho' },
      body: {
        en: 'An iterator is any object with a next() method that returns { value, done }. Call next repeatedly to pull one value at a time; done becomes true when the sequence is exhausted. That is the whole protocol.',
        hi: 'Iterator koi bhi aisa object hai jiske paas next() method ho jo { value, done } deta hai. Ek-ek value nikalne ke liye next baar-baar bulao; sequence khatam hone pe done true ho jaata hai. Poora protocol bas itna hai.',
      },
      code: `const it = [1, 2].values();
it.next();   // { value: 1, done: false }
it.next();   // { value: 2, done: false }
it.next();   // { value: undefined, done: true }`,
    },
    {
      heading: { en: 'Iterable is a different thing', hi: 'Iterable alag cheez hai' },
      body: {
        en: 'An ITERABLE is an object with a Symbol.iterator method that RETURNS an iterator. for...of, spread and destructuring all work on iterables, not on iterators directly. Keeping the two words apart is what the question is really testing.',
        hi: 'ITERABLE wo object hai jisme Symbol.iterator method ho jo ek iterator DETA hai. for...of, spread aur destructuring iterables pe chalte hain, seedhe iterators pe nahi. Do shabdon ko alag rakhna hi asal mein test kiya jaa raha hai.',
      },
      diagram: `iterable            iterator
{                   {
  [Symbol.iterator]   next() → { value, done }
    → an iterator   }
}

for...of asks the iterable for an iterator, then calls next`,
    },
    {
      heading: { en: 'Which built-ins are iterable', hi: 'Kaunse built-ins iterable hain' },
      body: {
        en: 'Array, String, Map, Set, TypedArray, NodeList, arguments and generators. Plain objects are NOT — that is why for...of throws on them and you have to go through Object.entries.',
        hi: 'Array, String, Map, Set, TypedArray, NodeList, arguments aur generators. Plain objects NAHI hain — isiliye for...of unpe error deta hai aur Object.entries se jaana padta hai.',
      },
      code: `for (const c of 'hi') {}          // ✓
for (const x of { a: 1 }) {}      // ✗ not iterable
for (const [k, v] of Object.entries({ a: 1 })) {}   // ✓`,
    },
    {
      heading: { en: 'Making your own object iterable', hi: 'Apne object ko iterable banana' },
      body: {
        en: 'Add a Symbol.iterator method. Once you do, for...of, spread and array destructuring all start working on it for free — this is the payoff of it being a protocol rather than a class.',
        hi: 'Symbol.iterator method jodo. Jaise hi jodoge, for...of, spread aur array destructuring sab uspe muft mein chalne lagenge — protocol hone ka, class hone ka nahi, yahi fayda hai.',
      },
      code: `const range = {
  from: 1, to: 4,
  [Symbol.iterator]() {
    let n = this.from, last = this.to;
    return { next: () => (n <= last
      ? { value: n++, done: false }
      : { value: undefined, done: true }) };
  },
};
[...range];   // [1, 2, 3, 4]`,
    },
    {
      heading: { en: 'Generators are the easy way to write one', hi: 'Isse likhne ka aasaan tareeka generators hain' },
      body: {
        en: 'A generator function returns an object that is both an iterator and an iterable, so the boilerplate disappears. In practice you almost never hand-write the next method.',
        hi: 'Generator function aisa object deta hai jo iterator bhi hai aur iterable bhi, toh saara boilerplate gaayab ho jaata hai. Asal mein next method haath se likhne ki lagbhag kabhi zaroorat nahi padti.',
      },
      code: `const range = {
  from: 1, to: 4,
  *[Symbol.iterator]() {
    for (let n = this.from; n <= this.to; n++) yield n;
  },
};
[...range];   // [1, 2, 3, 4]`,
    },
    {
      heading: { en: 'Laziness, and the optional return', hi: 'Laziness, aur optional return' },
      body: {
        en: 'Values are produced only when next is called, so an infinite sequence is fine as long as you stop pulling. An iterator may also implement return(), which the runtime calls when a for...of exits early via break — that is where you put cleanup.',
        hi: 'Values tabhi banti hain jab next bulaya jaaye, toh anant sequence bhi theek hai jab tak tum kheenchna band kar do. Iterator return() bhi de sakta hai, jise runtime tab bulata hai jab for...of break se jaldi nikle — cleanup wahin rakho.',
      },
      code: `function* nums() {
  try { let n = 0; while (true) yield n++; }
  finally { console.log('cleaned up'); }   // runs on break
}
for (const n of nums()) { if (n > 2) break; }`,
    },
  ],

  'What are modules in JavaScript?': [
    {
      heading: { en: 'A file with its own scope', hi: 'Apne scope wali ek file' },
      body: {
        en: 'A module is a file whose top-level bindings are private to it. Nothing leaks to the global object, and other files can only see what you explicitly export. That single rule is what makes large codebases tractable.',
        hi: 'Module aisi file hai jiski top-level bindings usi tak seemit hain. Kuch bhi global object pe nahi jaata, aur doosri files sirf wahi dekh sakti hain jo tum explicitly export karo. Yahi ek rule bade codebases ko sambhalne laayak banata hai.',
      },
      code: `// utils.js
const secret = 1;                 // private to this file
export const double = (n) => n * 2;
export default function main() {}

// app.js
import main, { double } from './utils.js';`,
    },
    {
      heading: { en: 'Named and default exports', hi: 'Named aur default exports' },
      body: {
        en: 'Named exports can be many per file and must be imported by their exact name, which makes them refactor-friendly and tree-shakeable. A default export is one per file and can be imported under any name. Most style guides prefer named exports for exactly that reason.',
        hi: 'Named exports ek file mein kai ho sakte hain aur unhe theek unhi naamon se import karna padta hai, jisse refactor aasaan aur tree-shaking mumkin hoti hai. Default export har file mein ek hota hai aur kisi bhi naam se import ho sakta hai. Zyadatar style guides isi wajah se named exports pasand karte hain.',
      },
      code: `export { a, b };                  // named
export default thing;             // default

import thing, { a, b as bee } from './m.js';
import * as everything from './m.js';`,
    },
    {
      heading: { en: 'Imports are hoisted and static', hi: 'Imports hoisted aur static hain' },
      body: {
        en: 'The whole import graph is resolved before any module body runs, so you can use an imported name above its import statement. It also means paths must be static strings — you cannot build one at runtime, which is exactly what lets bundlers tree-shake.',
        hi: 'Poora import graph kisi bhi module body ke chalne se pehle resolve ho jaata hai, toh imported naam ko import statement ke upar bhi use kar sakte ho. Iska matlab paths static strings honi chahiye — runtime pe nahi bana sakte, aur isi se bundlers tree-shake kar paate hain.',
      },
      code: `greet();                          // ✓ works
import { greet } from './a.js';

import('./' + name + '.js');      // ✓ dynamic import, returns a promise`,
    },
    {
      heading: { en: 'Live bindings, not copies', hi: 'Live bindings, copies nahi' },
      body: {
        en: 'An import is a live view of the exporting module\'s binding. If the exporter reassigns it, you see the new value. This differs from CommonJS, where require copies the value at the moment of the call.',
        hi: 'Import export karne wale module ki binding ka zinda nazariya hai. Wo usse dobara assign kare toh tumhe nayi value dikhti hai. Ye CommonJS se alag hai, jahan require call ke us pal ki value copy kar leta hai.',
      },
      code: `// counter.js
export let count = 0;
export const inc = () => count++;

// app.js
import { count, inc } from './counter.js';
inc(); console.log(count);   // 1 ✓ live
count = 5;                   // ✗ TypeError — imports are read-only`,
    },
    {
      heading: { en: 'Modules run once, and are always strict', hi: 'Modules ek baar chalte hain, aur hamesha strict hain' },
      body: {
        en: 'A module body is evaluated the first time it is imported and the result is cached — later imports get the same instance, which is how a module becomes a singleton. Module code is also implicitly in strict mode, and top-level this is undefined rather than window.',
        hi: 'Module body pehli baar import hone pe evaluate hoti hai aur nateeja cache ho jaata hai — baad ke imports wahi instance paate hain, aur aise module singleton ban jaata hai. Module code apne aap strict mode mein hota hai, aur top-level this window nahi, undefined hota hai.',
      },
      code: `// config.js runs once no matter how many files import it
export const config = load();`,
    },
    {
      heading: { en: 'How to load one', hi: 'Isse load kaise karein' },
      body: {
        en: 'In the browser, a script tag with type="module" — which is deferred by default and requires CORS. In Node, either a .mjs extension or "type": "module" in package.json. And dynamic import() works anywhere for code splitting.',
        hi: 'Browser mein type="module" wala script tag — jo default se deferred hai aur CORS maangta hai. Node mein ya toh .mjs extension ya package.json mein "type": "module". Aur code splitting ke liye dynamic import() har jagah chalta hai.',
      },
      code: `<script type="module" src="app.js"></script>

const { heavy } = await import('./heavy.js');   // loaded on demand`,
    },
  ],

  'What is the difference between CommonJS and ES Modules?': [
    {
      heading: { en: 'Two module systems, different eras', hi: 'Do module systems, alag daur' },
      body: {
        en: 'CommonJS was invented for Node before the language had modules; it uses require and module.exports. ES Modules are the standard built into the language, using import and export. Node supports both, which is why the confusion persists.',
        hi: 'CommonJS Node ke liye tab bana jab language mein modules the hi nahi; ye require aur module.exports use karta hai. ES Modules language mein hi bane standard hain, import aur export ke saath. Node dono sambhaalta hai, isiliye uljhan bani rehti hai.',
      },
      code: `// CommonJS
const fs = require('fs');
module.exports = { a, b };

// ES Modules
import fs from 'node:fs';
export { a, b };`,
    },
    {
      heading: { en: 'Static versus dynamic — the root difference', hi: 'Static vs dynamic — jad wala farq' },
      body: {
        en: 'ESM imports are resolved before execution, so the dependency graph is known without running anything. require is a function call executed at runtime, so it can be conditional or built from a variable. Everything else follows from this.',
        hi: 'ESM imports execution se pehle resolve hote hain, toh bina kuch chalaye dependency graph pata chal jaata hai. require ek function call hai jo runtime pe chalta hai, toh wo shart pe ya variable se ban sakta hai. Baaki sab isi se nikalta hai.',
      },
      code: `if (dev) require('./devtools');       // ✓ CommonJS allows this
if (dev) import './devtools';         // ✗ SyntaxError in ESM
if (dev) await import('./devtools');  // ✓ dynamic import`,
    },
    {
      heading: { en: 'That is why tree shaking only works with ESM', hi: 'Isiliye tree shaking sirf ESM se hoti hai' },
      body: {
        en: 'Because a bundler can see the whole import graph statically, it can prove an export is never used and drop it. With require it cannot, since the call could resolve to anything at runtime. This is the most practically important consequence.',
        hi: 'Bundler poora import graph static dekh sakta hai, isliye wo saabit kar sakta hai ki koi export kabhi use nahi hua aur usse gira sakta hai. require ke saath ye mumkin nahi, kyunki call runtime pe kuch bhi bana sakti hai. Sabse zyada vyavharik nateeja yahi hai.',
      },
    },
    {
      heading: { en: 'Copies versus live bindings', hi: 'Copies vs live bindings' },
      body: {
        en: 'require returns the value at the moment of the call, so a later reassignment inside the module is invisible to you. An ESM import is a live, read-only view — reassignment in the exporter is visible, and you cannot write to it.',
        hi: 'require call ke us pal ki value deta hai, toh module ke andar baad mein hui reassignment tumhe nahi dikhti. ESM import ek zinda, sirf-padhne wala nazariya hai — export karne wale ki reassignment dikhti hai, aur tum usme likh nahi sakte.',
      },
      code: `// CommonJS: you hold a snapshot
let { count } = require('./counter');   // never updates

// ESM: you hold a live binding
import { count } from './counter.js';   // reflects changes`,
    },
    {
      heading: { en: 'Loading and this', hi: 'Loading aur this' },
      body: {
        en: 'require is synchronous and blocking. ESM loading is asynchronous, which is what enables top-level await — available in ESM only. Module code is always strict, and top-level this is undefined in ESM but module.exports in CommonJS.',
        hi: 'require synchronous aur blocking hai. ESM ki loading asynchronous hai, isi se top-level await mumkin hota hai — jo sirf ESM mein hai. Module code hamesha strict hai, aur top-level this ESM mein undefined hai par CommonJS mein module.exports.',
      },
      code: `// ESM only
const data = await fetch(url);   // top-level await ✓

// CommonJS workaround
(async () => { const data = await fetch(url); })();`,
    },
    {
      heading: { en: 'Interop, and what breaks', hi: 'Interop, aur kya tootta hai' },
      body: {
        en: 'ESM can import a CommonJS module — the whole module.exports arrives as the default. CommonJS cannot require an ESM module at all; it must use dynamic import. ESM also requires the file extension in relative paths, which trips people migrating.',
        hi: 'ESM CommonJS module import kar sakta hai — poora module.exports default ki tarah aata hai. CommonJS ESM module ko require kar hi nahi sakta; usse dynamic import chahiye. ESM relative paths mein file extension bhi maangta hai, jahan migrate karne wale phasate hain.',
      },
      code: `import cjs from './old.cjs';        // ✓ the whole exports object
const esm = await import('./new.mjs');   // ✓ from CommonJS

import './utils';        // ✗ ESM needs the extension
import './utils.js';     // ✓`,
    },
    {
      heading: { en: 'Which to use', hi: 'Kaunsa use karein' },
      body: {
        en: 'ESM for anything new — it is the standard, it works in browsers and Node alike, and it enables tree shaking. CommonJS remains only for legacy Node code and for packages that have not migrated. Do not mix them in one package without care.',
        hi: 'Kisi bhi naye kaam ke liye ESM — wahi standard hai, browsers aur Node dono mein chalta hai, aur tree shaking deta hai. CommonJS sirf purane Node code aur un packages ke liye bacha hai jo migrate nahi hue. Ek hi package mein dono ko bina dhyaan ke mat milao.',
      },
    },
  ],

  'What is strict mode in JavaScript?': [
    {
      heading: { en: 'An opt-in to stricter semantics', hi: 'Sakht semantics chunne ka vikalp' },
      body: {
        en: 'Adding the "use strict" directive at the top of a file or function switches the engine into a stricter variant of the language. It turns silent mistakes into errors, forbids some confusing syntax, and disallows a few things that make optimisation hard.',
        hi: 'File ya function ke upar "use strict" likhne se engine language ke sakht roop mein chala jaata hai. Ye chup-chaap hone wali galtiyon ko error bana deta hai, kuch uljhane wala syntax rok deta hai, aur kuch aisi cheezein mana kar deta hai jo optimisation mushkil karti hain.',
      },
      code: `'use strict';          // whole file — must be the FIRST statement

function f() {
  'use strict';        // or just this function
}`,
    },
    {
      heading: { en: 'Most of your code is already strict', hi: 'Tumhara zyadatar code pehle se strict hai' },
      body: {
        en: 'ES modules and class bodies are always strict, with no directive needed. Since most modern code is one or the other, you rarely write the directive by hand — but you should know why the rules apply.',
        hi: 'ES modules aur class bodies hamesha strict hote hain, bina kisi directive ke. Modern code zyadatar inme se ek hi hota hai, toh directive haath se likhna kam padta hai — par rules kyun lagte hain ye pata hona chahiye.',
      },
    },
    {
      heading: { en: 'It catches accidental globals', hi: 'Ye galti se bane globals pakadta hai' },
      body: {
        en: 'This is the single most valuable change. In sloppy mode, assigning to an undeclared name silently creates a global variable — a typo becomes a program-wide leak. Strict mode makes it a ReferenceError at the exact line.',
        hi: 'Sabse keemti badlaav yahi hai. Sloppy mode mein undeclared naam pe assign karna chup-chaap global variable bana deta hai — ek typo poore program mein leak ban jaata hai. Strict mode usse theek usi line pe ReferenceError bana deta hai.',
      },
      code: `function f() { conut = 1; }    // typo for count
f();
// sloppy: creates window.conut, no error ✗
// strict: ReferenceError: conut is not defined ✓`,
    },
    {
      heading: { en: 'Silent failures become throws', hi: 'Chup-chaap fail hona ab error hai' },
      body: {
        en: 'Writing to a frozen object, to a read-only property, or to a getter-only accessor all fail silently in sloppy mode. In strict mode each throws a TypeError, so a bug surfaces where it happens instead of three functions later.',
        hi: 'Frozen object mein likhna, read-only property mein likhna, ya sirf-getter wale accessor mein likhna — sloppy mode mein sab chup-chaap fail ho jaate hain. Strict mode mein har ek TypeError deta hai, toh bug wahin dikhta hai jahan hua, teen functions baad nahi.',
      },
      code: `'use strict';
const o = Object.freeze({ a: 1 });
o.a = 2;              // ✗ TypeError ✓ caught
delete Object.prototype;   // ✗ TypeError`,
    },
    {
      heading: { en: 'this is undefined instead of the global', hi: 'this global ki jagah undefined hai' },
      body: {
        en: 'In a plain function call, sloppy mode substitutes the global object for this, which hides detached-method bugs. Strict mode leaves it undefined, so the mistake throws immediately and points at the real cause.',
        hi: 'Saade function call mein sloppy mode this ki jagah global object rakh deta hai, jo alag hue method ke bugs chhupa deta hai. Strict mode usse undefined chhod deta hai, toh galti turant error deti hai aur asli wajah bata deti hai.',
      },
      code: `function f() { return this; }
f();     // sloppy: window ✗   strict: undefined ✓

const greet = user.greet;
greet();   // strict: TypeError on this.name — the real bug`,
    },
    {
      heading: { en: 'What else it forbids', hi: 'Aur kya mana hai' },
      body: {
        en: 'Duplicate parameter names, octal literals written with a leading zero, with statements, and deleting a plain variable. It also reserves future keywords like let, static and yield as identifiers.',
        hi: 'Dohre parameter naam, shuruaati zero wale octal literals, with statements, aur saade variable ko delete karna. Ye let, static aur yield jaise aane wale keywords ko identifiers ke roop mein bhi reserve kar deta hai.',
      },
      code: `'use strict';
function f(a, a) {}    // ✗ SyntaxError — duplicate parameter
const n = 010;         // ✗ SyntaxError — use 0o10
with (obj) {}          // ✗ SyntaxError`,
    },
    {
      heading: { en: 'Why it exists at all', hi: 'Ye hai hi kyun' },
      body: {
        en: 'Backwards compatibility. The web could never break existing pages, so the fixes had to be opt-in. Strict mode was the mechanism, and modules made it the default — which is why new code effectively never runs in sloppy mode.',
        hi: 'Backwards compatibility. Web maujooda pages tod nahi sakta tha, isliye sudhaar opt-in hi ho sakte the. Strict mode wahi zariya tha, aur modules ne usse default bana diya — isiliye naya code asal mein kabhi sloppy mode mein nahi chalta.',
      },
    },
  ],

  'What is garbage collection in JavaScript?': [
    {
      heading: { en: 'Memory is freed automatically', hi: 'Memory apne aap free hoti hai' },
      body: {
        en: 'You never call free. The engine tracks which objects your program can still reach and reclaims the rest. Your job is not to release memory but to stop referencing things you no longer need.',
        hi: 'Tum kabhi free nahi bulaate. Engine dekhta hai tumhara program kaunse objects tak abhi pahunch sakta hai aur baaki wapas le leta hai. Tumhara kaam memory chhodna nahi, un cheezon ko reference karna band karna hai jinki ab zaroorat nahi.',
      },
      code: `let user = { name: 'Asha' };   // reachable through user
user = null;                    // now unreachable → collectible`,
    },
    {
      heading: { en: 'Reachability, not reference counting', hi: 'Reachability, reference counting nahi' },
      body: {
        en: 'The engine starts from a set of ROOTS — the global object, the current call stack, active closures — and marks everything it can reach through references. Anything unmarked is swept away. This is the mark-and-sweep algorithm.',
        hi: 'Engine kuch ROOTS se shuru karta hai — global object, maujooda call stack, chaalu closures — aur references se jahan tak pahunch sake sab mark kar deta hai. Jo unmarked bacha wo saaf kar diya jaata hai. Yahi mark-and-sweep algorithm hai.',
      },
      diagram: `roots ──► A ──► B
             │
             └──► C        A, B, C are marked → kept

        D ──► E            unreachable → swept`,
    },
    {
      heading: { en: 'Which is why cycles are not a problem', hi: 'Isiliye cycles problem nahi hain' },
      body: {
        en: 'Two objects pointing at each other would keep a reference-counting collector alive forever. Under reachability they are collected normally, because nothing from the roots can reach them. This is a good detail to volunteer.',
        hi: 'Ek doosre ko point karte do objects reference-counting collector ke liye hamesha zinda rehte. Reachability mein wo aam tareeke se collect ho jaate hain, kyunki roots se unhe koi pahunch nahi sakta. Ye khud se batane laayak detail hai.',
      },
      code: `function cycle() {
  const a = {}, b = {};
  a.b = b; b.a = a;      // they reference each other
}
cycle();                 // ✓ both are still collected`,
    },
    {
      heading: { en: 'Generational collection', hi: 'Generational collection' },
      body: {
        en: 'V8 splits the heap into a small young generation and a large old one. Most objects die young, so the young space is scavenged frequently and cheaply; survivors are promoted to the old space, which is collected less often with a fuller mark-sweep-compact pass.',
        hi: 'V8 heap ko ek chhoti young generation aur ek badi old generation mein baant deta hai. Zyadatar objects jaldi mar jaate hain, toh young space baar-baar aur saste mein saaf hota hai; bache hue old space mein promote hote hain, jo kam baar aur poore mark-sweep-compact se saaf hota hai.',
      },
    },
    {
      heading: { en: 'The four leaks you actually cause', hi: 'Chaar leaks jo tum asal mein karte ho' },
      body: {
        en: 'A cache or global that only grows. Event listeners never removed. Timers never cleared. And closures holding a large object longer than needed. Every real-world leak is one of these — none is a garbage-collector failure.',
        hi: 'Aisa cache ya global jo sirf badhta hai. Kabhi na hataye gaye event listeners. Kabhi clear na kiye gaye timers. Aur closures jo bade object ko zaroorat se zyada der pakde rakhte hain. Har asli leak inme se ek hai — koi bhi garbage collector ki galti nahi.',
      },
      code: `el.addEventListener('click', fn);
el.removeEventListener('click', fn);    // ✓

const id = setInterval(tick, 1000);
clearInterval(id);                      // ✓

const cache = new Map();                // ✗ grows forever
const cache = new WeakMap();            // ✓ self-cleaning`,
    },
    {
      heading: { en: 'WeakMap and WeakSet opt out of keeping alive', hi: 'WeakMap aur WeakSet zinda rakhna chhod dete hain' },
      body: {
        en: 'A weak reference does not count as a reason to keep an object. Use them for metadata attached to objects you do not own — DOM nodes, class instances — and the entries disappear along with their keys, with no cleanup code.',
        hi: 'Weak reference object ko zinda rakhne ki wajah nahi ginta. Unhe aise objects ke metadata ke liye use karo jo tumhare nahi hain — DOM nodes, class instances — aur entries apni keys ke saath gaayab ho jaati hain, bina kisi cleanup code ke.',
      },
    },
    {
      heading: { en: 'You cannot force it, and should not try', hi: 'Isse zabardasti nahi karwa sakte, aur karna bhi nahi chahiye' },
      body: {
        en: 'There is no standard API to trigger collection. Collection also pauses your code briefly, so allocating less matters more than freeing more. Profile with the browser\'s memory tools and compare heap snapshots to find what is being retained.',
        hi: 'Collection chalane ki koi standard API nahi hai. Collection tumhara code thodi der ke liye rokta bhi hai, toh kam allocate karna zyada free karne se zyada maayne rakhta hai. Browser ke memory tools se profile karo aur heap snapshots compare karke dekho kya pakda hua hai.',
      },
    },
  ],

  'Explain the complete JavaScript execution process from writing code to browser execution.': [
    {
      heading: { en: 'The whole pipeline in one line', hi: 'Poori pipeline ek line mein' },
      body: {
        en: 'Source is downloaded, parsed into an AST, compiled to bytecode, run inside execution contexts on a call stack, with async work delegated to the runtime and returned through queues that the event loop drains — and the browser paints between turns.',
        hi: 'Source download hota hai, AST mein parse hota hai, bytecode mein compile hota hai, call stack pe execution contexts ke andar chalta hai, async kaam runtime ko saunpa jaata hai aur queues ke through wapas aata hai jinhe event loop khaali karta hai — aur browser chakkar ke beech paint karta hai.',
      },
      diagram: `source → parse → AST → bytecode → execution contexts → call stack
                                                     │
                              ┌──────────────────────┴────────┐
                         sync code                       Web APIs
                                                              │
                                                        task queues
                                                              │
                                                        event loop
                                                              │
                                                         rendering`,
    },
    {
      heading: { en: '1. Download and parse', hi: '1. Download aur parse' },
      body: {
        en: 'The browser fetches the script and hands the text to the engine. The parser tokenises it and builds an Abstract Syntax Tree — a structured representation of the code. Syntax errors are caught here, before a single line executes.',
        hi: 'Browser script laata hai aur text engine ko de deta hai. Parser usse tokens mein todta hai aur ek Abstract Syntax Tree banata hai — code ka ek dhaanche wala roop. Syntax errors yahin pakde jaate hain, ek bhi line chalne se pehle.',
      },
      code: `const age = 25;

// tokens: const | age | = | 25 | ;
//
// AST:  VariableDeclaration (const)
//         └ VariableDeclarator
//             ├ Identifier: age
//             └ Literal: 25`,
    },
    {
      heading: { en: '2. Compile — bytecode, then JIT', hi: '2. Compile — bytecode, phir JIT' },
      body: {
        en: 'Modern engines are not simple interpreters. V8\'s Ignition turns the AST into bytecode for fast startup. As the program runs, the engine watches which functions are hot and TurboFan recompiles those into optimised machine code, based on the types it has observed.',
        hi: 'Modern engines saade interpreters nahi hain. V8 ka Ignition AST ko bytecode mein badalta hai taaki shuruaat tez ho. Program chalte-chalte engine dekhta hai kaunse functions garam hain aur TurboFan unhe dekhe gaye types ke aadhaar pe optimised machine code mein dobara compile kar deta hai.',
      },
      diagram: `AST → Ignition → bytecode → run
                              │ this function is hot
                              ▼
                          TurboFan → optimised machine code
                              │ an assumption broke
                              ▼
                          deoptimise, back to bytecode`,
    },
    {
      heading: { en: '3. Execution contexts, in two phases', hi: '3. Execution contexts, do phases mein' },
      body: {
        en: 'Before running any scope, the engine builds an execution context holding its variable environment, scope chain and this. The CREATION phase registers declarations — that is hoisting. The EXECUTION phase then runs the statements.',
        hi: 'Kisi bhi scope ko chalane se pehle engine ek execution context banata hai jisme uska variable environment, scope chain aur this hote hain. CREATION phase declarations register karta hai — yahi hoisting hai. Phir EXECUTION phase statements chalata hai.',
      },
      code: `console.log(a);   // undefined — registered in the creation phase
console.log(f);   // [Function: f] — whole body available
console.log(b);   // ✗ TDZ — registered but uninitialised
var a = 1;
let b = 2;
function f() {}`,
    },
    {
      heading: { en: '4. The call stack', hi: '4. Call stack' },
      body: {
        en: 'Each call pushes its execution context; each return pops it. Only the top frame runs, which is what "single-threaded" means in practice. Overflow it with runaway recursion and you get a RangeError.',
        hi: 'Har call apna execution context push karti hai; har return usse hata deti hai. Sirf sabse upar wala frame chalta hai, aur asal mein "single-threaded" ka yahi matlab hai. Bina rukne wali recursion se isse bhar do toh RangeError milta hai.',
      },
      diagram: `first() → second() → third()

  │ third()  │  ← running
  │ second() │
  │ first()  │
  │ global   │
  └──────────┘`,
    },
    {
      heading: { en: '5. Web APIs take the async work', hi: '5. Web APIs async kaam le lete hain' },
      body: {
        en: 'setTimeout, fetch, DOM events and localStorage are not part of the language — they are browser capabilities. The engine hands the work over and pops the frame at once, so nothing blocks while the browser waits on its own threads.',
        hi: 'setTimeout, fetch, DOM events aur localStorage language ka hissa nahi hain — ye browser ki khoobiyan hain. Engine kaam saunp kar frame turant hata deta hai, toh browser apne threads pe intezaar karta hai aur kuch block nahi hota.',
      },
    },
    {
      heading: { en: '6. Queues and the event loop', hi: '6. Queues aur event loop' },
      body: {
        en: 'Finished work is queued, never injected. When the stack empties, the event loop drains the ENTIRE microtask queue — promises, await continuations — then takes exactly ONE macrotask such as a timer. That asymmetry is why a promise logs before a zero-delay timer.',
        hi: 'Khatam hua kaam queue mein jaata hai, seedhe ghusaya nahi jaata. Stack khaali hote hi event loop POORI microtask queue khaali karta hai — promises, await ke aage ka code — phir theek EK macrotask leta hai jaise koi timer. Isi asantulan se promise, zero-delay timer se pehle log hota hai.',
      },
      code: `console.log('Start');
setTimeout(() => console.log('Timer'));
Promise.resolve().then(() => console.log('Promise'));
console.log('End');

// Start, End, Promise, Timer`,
    },
    {
      heading: { en: '7. Rendering, between turns', hi: '7. Rendering, chakkar ke beech' },
      body: {
        en: 'The browser can only paint when the stack is empty and microtasks are drained. It then runs style calculation, layout, paint and compositing — usually about sixty times a second. This is why a long synchronous task freezes the page: the paint step simply never gets a turn.',
        hi: 'Browser tabhi paint kar sakta hai jab stack khaali ho aur microtasks khatam hon. Phir wo style calculation, layout, paint aur compositing chalata hai — aam taur pe second mein lagbhag saath baar. Isiliye lamba synchronous kaam page jam kar deta hai: paint ka number aata hi nahi.',
      },
      diagram: `JS → DOM change → style → layout → paint → composite → screen`,
    },
    {
      heading: { en: 'The one-line answer to give', hi: 'Dene laayak ek-line jawab' },
      body: {
        en: '"The browser hands the source to the engine, which parses it into an AST and compiles it to bytecode, optimising hot paths with a JIT. It creates execution contexts — a creation phase that hoists declarations, then an execution phase — and runs them on a single call stack. Async work goes to Web APIs and comes back through the microtask and macrotask queues, which the event loop drains with microtasks first. Rendering happens between turns."',
        hi: '"Browser source engine ko deta hai, jo usse AST mein parse karke bytecode mein compile karta hai aur hot paths ko JIT se optimise karta hai. Wo execution contexts banata hai — ek creation phase jo declarations hoist karta hai, phir execution phase — aur unhe ek call stack pe chalata hai. Async kaam Web APIs ko jaata hai aur microtask aur macrotask queues se wapas aata hai, jinhe event loop pehle microtasks se khaali karta hai. Rendering chakkar ke beech hoti hai."',
      },
    },
  ],
};
