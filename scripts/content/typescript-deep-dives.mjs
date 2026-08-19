/*
 * Step-by-step walkthroughs for the TypeScript interview questions.
 *
 * Same shape and intent as javascript-deep-dives.mjs and
 * react-deep-dives.mjs: the short `answer` is what you say out loud, and
 * this is the follow-up that walks the mechanism one step at a time.
 *
 * Keyed by the EXACT question text in `generalInterviewQuestions`. Unmatched
 * keys are reported at import time (see the bottom of typescript.mjs).
 *
 * Each value is an ordered list of sections:
 *   heading { en, hi }  the step's title
 *   body    { en, hi }  what happens at this step, and why
 *   diagram             optional ASCII sketch, rendered as-is in monospace
 *   code                optional snippet
 *
 * The running theme worth carrying through every answer: TypeScript is a
 * COMPILE-TIME tool. It erases completely, so no type ever protects you at
 * runtime — only a check you wrote yourself does.
 */

export const deepDives = {
  /* ─── Strictness and the core type set ────────────────────── */

  'Should you enable strict mode in TypeScript? What does it do?': [
    {
      heading: { en: 'Yes — and it is not really optional', hi: 'Haan — aur ye asal mein optional hai hi nahi' },
      body: {
        en: 'Without strict, TypeScript lets almost anything through and gives you a false sense of safety. strict is a single flag that turns on the whole family of soundness checks, and every modern starter template enables it by default.',
        hi: 'strict ke bina TypeScript lagbhag sab kuch guzar jaane deta hai aur jhoothi surakshit hone ki bhavna deta hai. strict ek hi flag hai jo soundness ke poore kunbe ko chaalu kar deta hai, aur har modern starter template isse default se on rakhta hai.',
      },
      code: `{ "compilerOptions": { "strict": true } }`,
    },
    {
      heading: { en: 'What the flag actually turns on', hi: 'Ye flag asal mein kya chaalu karta hai' },
      body: {
        en: 'strict is an umbrella. The two that change your code the most are strictNullChecks and noImplicitAny; the rest tighten functions, classes and this. You can enable them individually, which is how you migrate an existing codebase.',
        hi: 'strict ek chhatri hai. Jo do tumhara code sabse zyada badalte hain wo strictNullChecks aur noImplicitAny hain; baaki functions, classes aur this ko kasste hain. Inhe alag-alag bhi chaalu kar sakte ho, aur purane codebase ko aise hi migrate karte hain.',
      },
      diagram: `strict
├── strictNullChecks            null and undefined are separate types
├── noImplicitAny               an untyped parameter is an error
├── strictFunctionTypes         parameter positions checked contravariantly
├── strictBindCallApply         bind, call and apply are type-checked
├── strictPropertyInitialization class fields must be assigned
├── noImplicitThis              an untyped this is an error
└── useUnknownInCatchVariables  catch (e) is unknown, not any`,
    },
    {
      heading: { en: 'strictNullChecks is the one that matters most', hi: 'Sabse zyada maayne rakhne wala strictNullChecks hai' },
      body: {
        en: 'Without it, null and undefined are assignable to every type, so TypeScript cannot warn you about the single most common runtime error in JavaScript. With it, they become distinct types you must handle explicitly.',
        hi: 'Iske bina null aur undefined har type mein daale ja sakte hain, toh TypeScript JavaScript ki sabse aam runtime error ke baare mein chetavni de hi nahi sakta. Iske saath ye alag types ban jaate hain jinhe tumhe saaf-saaf sambhalna padta hai.',
      },
      code: `// off: this compiles, and crashes at runtime
function len(s: string) { return s.length; }
len(null);

// on:  Argument of type 'null' is not assignable to
//      parameter of type 'string'`,
    },
    {
      heading: { en: 'noImplicitAny stops silent holes', hi: 'noImplicitAny chup-chaap ke chhed rokta hai' },
      body: {
        en: 'An untyped parameter is implicitly any, which disables checking for everything it touches. The flag forces you to either annotate it or let inference do the work — turning an invisible hole into a visible error.',
        hi: 'Bina type wala parameter chup-chaap any hota hai, jo uske chhue har cheez ki jaanch band kar deta hai. Ye flag tumhe ya toh usse annotate karne pe majboor karta hai ya inference ko kaam karne deta hai — ek anadikhta chhed ko dikhne wale error mein badal kar.',
      },
      code: `function greet(name) { … }        // ✗ Parameter 'name' implicitly has
                                   //   an 'any' type
function greet(name: string) { … } // ✓`,
    },
    {
      heading: { en: 'The two worth adding on top', hi: 'Do jo upar se jodne laayak hain' },
      body: {
        en: 'strict does not include everything. noUncheckedIndexedAccess makes array and index access return T | undefined, which catches a whole class of bug. exactOptionalPropertyTypes stops you assigning undefined to an optional property that was only meant to be absent.',
        hi: 'strict mein sab kuch nahi hai. noUncheckedIndexedAccess array aur index access ko T | undefined bana deta hai, jo bugs ki poori shreni pakadta hai. exactOptionalPropertyTypes tumhe us optional property mein undefined daalne se rokta hai jise sirf gair-maujood hona tha.',
      },
      code: `{ "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true }`,
    },
    {
      heading: { en: 'Migrating an existing codebase', hi: 'Purane codebase ko migrate karna' },
      body: {
        en: 'Turning strict on across a large project produces thousands of errors at once, which nobody fixes. Enable the sub-flags one at a time, starting with noImplicitAny, and fix each wave before moving on. Or use strict with a per-file opt-out and shrink the list over time.',
        hi: 'Bade project pe strict chaalu karne se ek saath hazaaron errors aate hain, jinhe koi theek nahi karta. Sub-flags ek-ek karke chaalu karo, noImplicitAny se shuru karke, aur har lehar theek karke aage badho. Ya strict rakh kar har file ka opt-out do aur us list ko dhire-dhire chhota karo.',
      },
    },
    {
      heading: { en: 'The argument to make', hi: 'Jo tark dena hai' },
      body: {
        en: '"Always, on a new project. Without strictNullChecks TypeScript cannot catch the most common runtime error there is, and without noImplicitAny you get untyped holes that silently spread. On an existing codebase I would enable the sub-flags incrementally rather than all at once."',
        hi: '"Naye project pe hamesha. strictNullChecks ke bina TypeScript sabse aam runtime error pakad hi nahi sakta, aur noImplicitAny ke bina bina-type wale chhed ban jaate hain jo chup-chaap failte hain. Purane codebase pe main sub-flags dhire-dhire chaalu karunga, sab ek saath nahi."',
      },
    },
  ],

  'What is the difference between an interface and a type alias?': [
    {
      heading: { en: 'They overlap almost completely', hi: 'Ye lagbhag poori tarah ek jaise hain' },
      body: {
        en: 'For describing an object shape, both do the same job and both support extension and implementation. The honest answer starts by saying that, then names the three real differences.',
        hi: 'Object ki shakal batane ke liye dono ek hi kaam karte hain aur dono extension aur implementation sambhaalte hain. Imaandaar jawab isi se shuru hota hai, phir teen asli farq batata hai.',
      },
      code: `interface User { name: string; age: number }
type User = { name: string; age: number };   // interchangeable here`,
    },
    {
      heading: { en: 'Difference one: only interfaces merge', hi: 'Farq ek: sirf interfaces merge hote hain' },
      body: {
        en: 'Declaring the same interface twice combines the declarations. Declaring the same type alias twice is an error. This is the most important practical difference — it is what lets you augment a library\'s types from outside.',
        hi: 'Ek hi interface do baar declare karo toh dono jud jaate hain. Ek hi type alias do baar declare karo toh error aata hai. Ye sabse zaroori vyavharik farq hai — isi se tum kisi library ke types bahar se badha sakte ho.',
      },
      code: `interface Window { myApp: App }     // ✓ merges with the built-in Window

type A = { a: string };
type A = { b: number };             // ✗ Duplicate identifier 'A'`,
    },
    {
      heading: { en: 'Difference two: only type aliases name non-objects', hi: 'Farq do: sirf type alias non-objects ko naam de sakta hai' },
      body: {
        en: 'An interface can only describe an object shape or a function or construct signature. A type alias can name a union, an intersection, a primitive, a tuple, a template literal type, or the result of a conditional or mapped type.',
        hi: 'Interface sirf object ki shakal, ya function ya construct signature bata sakta hai. Type alias union, intersection, primitive, tuple, template literal type, ya kisi conditional ya mapped type ka nateeja naam de sakta hai.',
      },
      code: `type Status = 'idle' | 'busy';        // union — interface cannot
type Pair = [number, number];          // tuple
type ID = string;                      // primitive alias
type Keys = \`on\${Capitalize<string>}\`; // template literal`,
    },
    {
      heading: { en: 'Difference three: how errors read', hi: 'Farq teen: errors kaise padhe jaate hain' },
      body: {
        en: 'An interface is a named type and shows up by name in errors and tooltips. A complex type alias is often expanded inline, which makes messages long and hard to read. On a big object shape this matters more than people expect.',
        hi: 'Interface ek naam wala type hai aur errors aur tooltips mein apne naam se dikhta hai. Uljha hua type alias aksar khol kar dikhaya jaata hai, jisse messages lambe aur padhne mein mushkil ho jaate hain. Bade object shape pe ye ummeed se zyada maayne rakhta hai.',
      },
    },
    {
      heading: { en: 'Extends versus intersection', hi: 'Extends vs intersection' },
      body: {
        en: 'Both compose, but not identically. extends reports a conflicting property as an error at the point of declaration; an intersection silently produces never for that property, and you only find out at the use site. That makes extends the safer default.',
        hi: 'Dono jodte hain, par ek jaise nahi. extends takraati property ko wahin declaration pe error batata hai; intersection us property ko chup-chaap never bana deta hai, aur pata tab chalta hai jab use karo. Isiliye extends safe default hai.',
      },
      code: `interface A { x: string }
interface B extends A { x: number }   // ✗ error here, immediately

type C = { x: string } & { x: number };
declare const c: C;
c.x;                                  // never — discovered much later`,
    },
    {
      heading: { en: 'The rule most teams settle on', hi: 'Jo rule zyadatar teams apnaati hain' },
      body: {
        en: 'Interfaces for object shapes that other code implements or extends, especially public API surfaces where merging might be useful. Type aliases for everything else — unions, tuples, function types, and anything computed. Consistency matters more than the choice.',
        hi: 'Un object shapes ke liye interfaces jinhe doosra code implement ya extend karta hai, khaas kar public API jahan merging kaam aa sakti hai. Baaki har cheez ke liye type aliases — unions, tuples, function types, aur jo bhi banaya gaya ho. Chunav se zyada ek jaisa rehna maayne rakhta hai.',
      },
    },
  ],

  'What is the difference between any, unknown, and never?': [
    {
      heading: { en: 'Three positions on the type lattice', hi: 'Type lattice pe teen jagah' },
      body: {
        en: 'unknown is the top type — everything is assignable TO it, and it is assignable to nothing. never is the bottom type — nothing is assignable to it, and it is assignable to everything. any sits outside the system entirely and disables checking in both directions.',
        hi: 'unknown sabse upar wala type hai — sab kuch USME daala ja sakta hai, aur wo kisi mein nahi. never sabse neeche wala hai — usme kuch nahi daala ja sakta, aur wo har cheez mein ja sakta hai. any poore system ke bahar baithta hai aur dono taraf ki jaanch band kar deta hai.',
      },
      diagram: `        unknown          accepts everything, gives nothing
       /   |   \\
  string number …
       \\   |   /
         never            accepts nothing, fits everywhere

  any — outside the lattice; assignable both ways`,
    },
    {
      heading: { en: 'any switches TypeScript off', hi: 'any TypeScript ko band kar deta hai' },
      body: {
        en: 'A value typed any can be assigned anywhere, have any property read, and be called as a function — with no error. Worse, it is infectious: anything derived from an any is also any, so one annotation can silently disable checking across a whole module.',
        hi: 'any type ki value kahin bhi daali ja sakti hai, uski koi bhi property padhi ja sakti hai, aur usse function ki tarah bulaya ja sakta hai — bina error ke. Isse bura, ye failta hai: any se nikli har cheez bhi any hai, toh ek annotation chup-chaap poore module ki jaanch band kar sakta hai.',
      },
      code: `const a: any = 'hello';
a.foo.bar.baz();      // ✓ compiles
const n: number = a;  // ✓ compiles
n.toFixed();          // 💥 runtime error`,
    },
    {
      heading: { en: 'unknown is any with a seatbelt', hi: 'unknown seatbelt wala any hai' },
      body: {
        en: 'You can assign anything to unknown, but you cannot DO anything with it until you narrow it. That forces a check exactly where the uncertainty is, which is why it is the right type for JSON, external input and caught errors.',
        hi: 'unknown mein kuch bhi daal sakte ho, par usse kuch KAR nahi sakte jab tak narrow na karo. Isse jaanch theek wahin lagti hai jahan anischitta hai, aur isiliye JSON, bahari input aur pakde gaye errors ke liye yahi sahi type hai.',
      },
      code: `const u: unknown = getJson();
u.length;                      // ✗ 'u' is of type 'unknown'

if (typeof u === 'string') {
  u.length;                    // ✓ narrowed to string
}`,
    },
    {
      heading: { en: 'never means this cannot happen', hi: 'never matlab ye ho hi nahi sakta' },
      body: {
        en: 'It is the type of a value that never exists. A function that always throws or never returns has return type never. An impossible intersection collapses to never. And an exhausted union narrows to never, which is the basis of exhaustiveness checking.',
        hi: 'Ye us value ka type hai jo kabhi hoti hi nahi. Jo function hamesha throw kare ya kabhi laute hi na, uska return type never hai. Namumkin intersection never ban jaata hai. Aur poori tarah handle ki gayi union never mein simat jaati hai, aur exhaustiveness checking isi pe khadi hai.',
      },
      code: `function fail(msg: string): never { throw new Error(msg); }
function loop(): never { while (true) {} }
type Impossible = string & number;      // never`,
    },
    {
      heading: { en: 'The use for never that you will actually write', hi: 'never ka wo upyog jo tum sach mein likhoge' },
      body: {
        en: 'Exhaustiveness checking. In the default branch of a switch over a union, the value narrows to never. Assigning it to a never-typed variable makes adding a new union member a COMPILE error rather than a silent gap.',
        hi: 'Exhaustiveness checking. Kisi union pe switch ke default branch mein value never ban jaati hai. Usse never wale variable mein daalna, union mein naya member jodne ko COMPILE error bana deta hai, chup-chaap chhoot jaane ki jagah.',
      },
      code: `type Shape = { kind: 'circle' } | { kind: 'square' };

function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return 1;
    case 'square': return 2;
    default: {
      const _exhaustive: never = s;   // ✗ errors if you add a new kind
      throw new Error('unreachable');
    }
  }
}`,
    },
    {
      heading: { en: 'never disappears in a union', hi: 'Union mein never gayab ho jaata hai' },
      body: {
        en: 'A detail worth knowing because it powers filtering in mapped and conditional types. string | never is just string, so producing never for the cases you want to drop removes them from the result.',
        hi: 'Ye jaanne laayak hai kyunki mapped aur conditional types mein filtering isi se chalti hai. string | never bas string hai, toh jinhe hataana hai unke liye never dena unhe nateeje se nikaal deta hai.',
      },
      code: `type NonNullish<T> = T extends null | undefined ? never : T;
type R = NonNullish<string | null>;    // string`,
    },
    {
      heading: { en: 'The rule to state', hi: 'Batane laayak rule' },
      body: {
        en: '"Use unknown at every boundary where the type is not yet known, and narrow before use. Use never for impossible states and exhaustiveness checks. Treat any as a temporary escape hatch with a comment explaining why — and ban it with a lint rule otherwise."',
        hi: '"Har us boundary pe unknown lo jahan type abhi pata nahi, aur use karne se pehle narrow karo. Namumkin states aur exhaustiveness checks ke liye never. any ko ek astai chhoot maano, ek comment ke saath jo wajah bataye — aur baaki har jagah lint rule se band kar do."',
      },
    },
  ],

  'What is a union type and how do you narrow it?': [
    {
      heading: { en: 'A value that is one of several types', hi: 'Aisi value jo kai types mein se ek ho' },
      body: {
        en: 'A union says the value is A or B, not both. Until you prove which one it is, TypeScript only lets you access members that exist on EVERY member of the union — which is the constraint the whole question is about.',
        hi: 'Union kehta hai value A ya B hai, dono nahi. Jab tak tum saabit na karo kaunsa hai, TypeScript sirf un members tak pahunchne deta hai jo union ke HAR member pe maujood hon — aur poora sawaal isi bandhan ke baare mein hai.',
      },
      code: `type Id = string | number;

function f(id: Id) {
  id.toUpperCase();   // ✗ not available on number
  id.toString();      // ✓ available on both
}`,
    },
    {
      heading: { en: 'Narrowing is proving which member you have', hi: 'Narrowing matlab saabit karna kaunsa member hai' },
      body: {
        en: 'TypeScript follows your control flow. Inside a branch where a check has succeeded, it narrows the type automatically — no cast needed. This is called control-flow analysis and it is one of the best things about the language.',
        hi: 'TypeScript tumhare control flow ko follow karta hai. Jis branch mein koi jaanch safal ho gayi, wahan wo type apne aap narrow kar deta hai — kisi cast ki zaroorat nahi. Ise control-flow analysis kehte hain aur ye language ki sabse achhi cheezon mein hai.',
      },
      code: `function f(id: string | number) {
  if (typeof id === 'string') {
    id.toUpperCase();     // ✓ narrowed to string
  } else {
    id.toFixed();         // ✓ narrowed to number
  }
}`,
    },
    {
      heading: { en: 'The narrowing tools, in order of usefulness', hi: 'Narrowing ke auzaar, upyogita ke kram mein' },
      body: {
        en: 'typeof for primitives. instanceof for classes. The in operator for a distinguishing property. A literal check on a discriminant property. Array.isArray for arrays. Truthiness for null and undefined. And a custom type predicate when none of those fit.',
        hi: 'Primitives ke liye typeof. Classes ke liye instanceof. Koi alag karne wali property ho toh in operator. Discriminant property pe literal check. Arrays ke liye Array.isArray. null aur undefined ke liye truthiness. Aur jab inme se kuch fit na ho toh custom type predicate.',
      },
      code: `if (typeof x === 'string') {}
if (x instanceof Date) {}
if ('wings' in animal) {}
if (shape.kind === 'circle') {}
if (Array.isArray(x)) {}
if (x != null) {}                     // removes null AND undefined`,
    },
    {
      heading: { en: 'Discriminated unions are the pattern to reach for', hi: 'Discriminated unions wahi pattern hai jo uthana chahiye' },
      body: {
        en: 'Give every member a shared literal property and narrowing becomes a single equality check. This is far more reliable than sniffing for the presence of fields, and it enables exhaustiveness checking.',
        hi: 'Har member ko ek saanjhi literal property do aur narrowing bas ek barabari ki jaanch ban jaati hai. Ye fields ki maujoodgi soonghne se kahin zyada bharosemand hai, aur isse exhaustiveness checking mumkin hoti hai.',
      },
      code: `type State =
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; message: string };

if (s.status === 'success') s.data;      // ✓ narrowed precisely`,
    },
    {
      heading: { en: 'Custom type predicates', hi: 'Custom type predicates' },
      body: {
        en: 'When the check is too complex for a built-in, write a function returning "x is T". TypeScript trusts you completely, so a wrong predicate is a silent lie — this is one of the few places you can defeat the type system without writing any.',
        hi: 'Jab jaanch kisi built-in ke liye zyada uljhi ho, toh aisa function likho jo "x is T" return kare. TypeScript tumpe poora bharosa karta hai, toh galat predicate ek chup-chaap jhooth hai — ye un gine-chune jagahon mein hai jahan tum bina any likhe type system ko haraa sakte ho.',
      },
      code: `function isUser(x: unknown): x is User {
  return typeof x === 'object' && x !== null && 'name' in x;
}

if (isUser(data)) data.name;    // ✓ narrowed`,
    },
    {
      heading: { en: 'What silently breaks narrowing', hi: 'Narrowing ko chup-chaap kya todta hai' },
      body: {
        en: 'Narrowing is per-variable and does not survive a function boundary. A callback, an await, or reassigning the variable all reset it. This catches people constantly — assign to a local const first and narrow that.',
        hi: 'Narrowing har variable ke liye alag hai aur function ki seema paar nahi karti. Callback, await, ya variable ko dobara assign karna — sab isse reset kar dete hain. Log isme baar-baar phasate hain — pehle local const mein rakho aur usse narrow karo.',
      },
      code: `if (obj.value !== null) {
  setTimeout(() => obj.value.toFixed());   // ✗ narrowing is lost
}

const v = obj.value;
if (v !== null) {
  setTimeout(() => v.toFixed());           // ✓ const keeps it
}`,
    },
  ],

  'What is a discriminated union and why is it useful?': [
    {
      heading: { en: 'A union where every member carries a tag', hi: 'Aisi union jisme har member pe ek tag ho' },
      body: {
        en: 'Each member of the union has a shared property whose type is a distinct literal. That property is the discriminant, and checking it tells TypeScript exactly which member you are holding.',
        hi: 'Union ke har member pe ek saanjhi property hoti hai jiska type ek alag literal hai. Wahi property discriminant hai, aur usse jaanchne se TypeScript ko theek pata chal jaata hai ki tumhare paas kaunsa member hai.',
      },
      code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'rect'; w: number; h: number };`,
    },
    {
      heading: { en: 'Narrowing becomes one equality check', hi: 'Narrowing ek barabari ki jaanch ban jaati hai' },
      body: {
        en: 'Compare the discriminant and TypeScript narrows the whole object, so the other properties become available with no cast and no optional chaining. Compare this with a flat object where every field is optional and nothing is guaranteed.',
        hi: 'Discriminant compare karo aur TypeScript poora object narrow kar deta hai, toh baaki properties bina cast aur bina optional chaining ke mil jaati hain. Isse us flat object se milao jahan har field optional hai aur kisi ki guarantee nahi.',
      },
      code: `function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;   // ✓ radius exists
    case 'square': return s.side ** 2;
    case 'rect':   return s.w * s.h;
  }
}`,
    },
    {
      heading: { en: 'It makes impossible states impossible', hi: 'Ye namumkin states ko namumkin bana deta hai' },
      body: {
        en: 'This is the real argument. A flat state object with optional fields allows loading and error to be true at once, or success with no data. A discriminated union simply cannot represent those combinations, so you never have to handle them.',
        hi: 'Asli tark yahi hai. Optional fields wala flat state object loading aur error dono ko ek saath true hone deta hai, ya success bina data ke. Discriminated union un combinations ko bana hi nahi sakta, toh unhe sambhalna hi nahi padta.',
      },
      code: `// ✗ allows nonsense: loading AND error, success with no data
type Bad = { loading: boolean; data?: T; error?: string };

// ✓ only the three real states exist
type Good =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };`,
    },
    {
      heading: { en: 'And it gives you exhaustiveness for free', hi: 'Aur isse exhaustiveness muft milti hai' },
      body: {
        en: 'In the default branch the value narrows to never. Assign it to a never-typed variable and adding a fourth member turns every unhandled switch into a compile error — the compiler finds them for you.',
        hi: 'Default branch mein value never ban jaati hai. Usse never wale variable mein daalo aur chautha member jodte hi har chhoote hue switch compile error ban jaate hain — compiler unhe tumhare liye dhoondh deta hai.',
      },
      code: `default: {
  const _never: never = s;      // ✗ 'triangle' is not assignable to 'never'
  throw new Error('unhandled');
}`,
    },
    {
      heading: { en: 'The rules for the discriminant', hi: 'Discriminant ke rules' },
      body: {
        en: 'It must be a literal type, not string. It must exist on every member. Each value must be unique. And declaring the objects with const or as const helps inference keep the literal instead of widening it to string.',
        hi: 'Ye literal type hona chahiye, string nahi. Har member pe hona chahiye. Har value alag honi chahiye. Aur objects ko const ya as const se banane se inference literal bacha leta hai, usse string mein chaudi nahi karta.',
      },
      code: `const s = { kind: 'circle', radius: 1 };
// kind is inferred as string ✗ — not assignable to Shape

const s = { kind: 'circle', radius: 1 } as const;   // ✓ literal preserved`,
    },
    {
      heading: { en: 'Where you meet it in real code', hi: 'Asli code mein ye kahan milta hai' },
      body: {
        en: 'Redux actions keyed by type. Request state in a data hook. A Result type of ok or error instead of throwing. Any API response with a status field. Once you see the pattern you find it everywhere.',
        hi: 'type se pehchaane jaane wale Redux actions. Kisi data hook ki request state. Throw karne ki jagah ok ya error wala Result type. Koi bhi API response jisme status field ho. Pattern ek baar dikh jaaye toh har jagah milta hai.',
      },
      code: `type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

const r = parse(input);
if (r.ok) use(r.value); else report(r.error);`,
    },
  ],

  /* ─── Generics and type-level programming ─────────────────── */

  'What are generics and when should you use them?': [
    {
      heading: { en: 'A type parameter, so the caller decides', hi: 'Ek type parameter, taaki caller tay kare' },
      body: {
        en: 'A generic lets a function or type work with a type it does not know in advance, while still tracking exactly which type came in. The angle bracket parameter is filled in at the call site, not by you.',
        hi: 'Generic kisi function ya type ko aisi type ke saath chalne deta hai jo usse pehle se pata nahi, aur phir bhi theek yaad rakhta hai kaunsi type andar aayi. Angle bracket wala parameter call ki jagah bharta hai, tum nahi.',
      },
      code: `function identity<T>(value: T): T { return value; }

identity('hi');      // T is string  → returns string
identity(42);        // T is number  → returns number`,
    },
    {
      heading: { en: 'The problem they solve: preserving the relationship', hi: 'Ye kya hal karte hain: rishta bachana' },
      body: {
        en: 'Without a generic you must choose between any, which loses all safety, and a union, which loses which one you passed. A generic keeps the link between the input type and the output type, which is the entire point.',
        hi: 'Generic ke bina tumhe any chunna padta hai, jo saari suraksha kho deta hai, ya union, jo bhool jaata hai tumne kaunsa diya. Generic input type aur output type ke beech ka rishta bachaa leta hai, aur asli baat yahi hai.',
      },
      code: `function firstAny(a: any[]): any { return a[0]; }
const x = firstAny(['a']);      // any ✗ no safety

function first<T>(a: T[]): T { return a[0]; }
const y = first(['a']);          // string ✓`,
    },
    {
      heading: { en: 'Inference means you rarely write the argument', hi: 'Inference se tum argument kam hi likhte ho' },
      body: {
        en: 'TypeScript infers the type parameter from the values you pass. Write it explicitly only when inference gets it wrong or when there is nothing to infer from — such as a return-only generic.',
        hi: 'TypeScript type parameter tumhari di hui values se nikaal leta hai. Usse tabhi likho jab inference galat nikale ya nikaalne ko kuch ho hi na — jaise sirf return wala generic.',
      },
      code: `first(['a']);              // inferred
useState<string | null>(null);   // ✓ explicit — null alone is not enough`,
    },
    {
      heading: { en: 'Multiple parameters, and relating them', hi: 'Kai parameters, aur unhe jodna' },
      body: {
        en: 'The real power appears when two type parameters are constrained against each other. Here K is forced to be a key of T, so the return type is exactly the type of that property — and a wrong key is a compile error.',
        hi: 'Asli taakat tab dikhti hai jab do type parameters ek doosre se bandhe jaayein. Yahan K ko T ki key hona hi padta hai, toh return type bilkul us property ka type hai — aur galat key compile error hai.',
      },
      code: `function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Asha', age: 30 };
get(user, 'name');     // string
get(user, 'nope');     // ✗ not assignable to 'name' | 'age'`,
    },
    {
      heading: { en: 'Generic types, not just functions', hi: 'Sirf functions nahi, generic types bhi' },
      body: {
        en: 'Interfaces, type aliases and classes take type parameters too. This is how a reusable container or wrapper keeps the type of what it holds — an API response, a paginated list, a result.',
        hi: 'Interfaces, type aliases aur classes bhi type parameters lete hain. Aise hi koi dobara use hone wala container ya wrapper apne andar ki cheez ka type bachaa leta hai — API response, paginated list, ya koi result.',
      },
      code: `interface ApiResponse<T> { data: T; status: number }
type Nullable<T> = T | null;
class Box<T> { constructor(public value: T) {} }`,
    },
    {
      heading: { en: 'When NOT to use one', hi: 'Kab NAHI use karna' },
      body: {
        en: 'A type parameter that appears only once in the signature is doing nothing — it is a disguised any. If it does not connect two positions, delete it. This is the most common generic smell.',
        hi: 'Jo type parameter signature mein sirf ek baar aata hai wo kuch nahi kar raha — wo bhesh badla hua any hai. Agar wo do jagah ko nahi jodta, toh usse hata do. Ye sabse aam generic ki badboo hai.',
      },
      code: `function log<T>(x: T): void {}      // ✗ T is pointless
function log(x: unknown): void {}    // ✓ say what you mean`,
    },
    {
      heading: { en: 'The rule to state', hi: 'Batane laayak rule' },
      body: {
        en: '"Use a generic when the same code should work over many types AND you need to remember which one was used — so the input and output stay linked. If the type parameter appears only once, you wanted unknown instead."',
        hi: '"Generic tab lo jab wahi code kai types pe chale AUR tumhe yaad rakhna ho kaunsi use hui — taaki input aur output jude rahein. Agar type parameter sirf ek baar aata hai, toh tumhe unknown chahiye tha."',
      },
    },
  ],

  'What are generic constraints?': [
    {
      heading: { en: 'extends narrows what a type parameter may be', hi: 'extends batata hai type parameter kya ho sakta hai' },
      body: {
        en: 'By default a type parameter could be anything, so you can do almost nothing with it. A constraint promises the parameter has at least a certain shape, which unlocks the members of that shape inside the function.',
        hi: 'Default se type parameter kuch bhi ho sakta hai, toh usse lagbhag kuch nahi kar sakte. Constraint vaada karta hai ki parameter mein kam se kam ek khaas shakl hai, jisse function ke andar us shakl ke members khul jaate hain.',
      },
      code: `function len<T>(x: T) { return x.length; }
// ✗ Property 'length' does not exist on type 'T'

function len<T extends { length: number }>(x: T) { return x.length; }
len('hi');      // ✓ 2
len([1, 2]);    // ✓ 2
len(42);        // ✗ number has no length`,
    },
    {
      heading: { en: 'extends here means "assignable to"', hi: 'Yahan extends ka matlab hai "isme daala ja sake"' },
      body: {
        en: 'A common confusion. It is not class inheritance — it is a structural constraint. Any type with the required shape satisfies it, whether or not it declares any relationship.',
        hi: 'Ek aam uljhan. Ye class inheritance nahi — ye ek dhaanchagat bandhan hai. Jis bhi type mein zaroori shakl hai wo isse poora karta hai, chahe usne koi rishta bataya ho ya nahi.',
      },
    },
    {
      heading: { en: 'keyof is the most useful constraint', hi: 'Sabse kaam ka constraint keyof hai' },
      body: {
        en: 'Constraining K to keyof T lets a function accept only real property names and return exactly the right value type. This one pattern shows up in nearly every typed utility library.',
        hi: 'K ko keyof T se baandhne se function sirf asli property naam leta hai aur bilkul sahi value type deta hai. Ye ek pattern lagbhag har typed utility library mein dikhta hai.',
      },
      code: `function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return Object.fromEntries(keys.map((k) => [k, obj[k]])) as Pick<T, K>;
}

pick(user, ['name']);    // { name: string }
pick(user, ['nope']);    // ✗ caught at compile time`,
    },
    {
      heading: { en: 'A parameter can be constrained by another', hi: 'Ek parameter doosre se bandha ja sakta hai' },
      body: {
        en: 'Constraints can reference earlier type parameters, which is how you express relationships between arguments — that two arrays hold the same type, or that a default matches the value.',
        hi: 'Constraints pehle wale type parameters ko use kar sakte hain, aur aise hi tum arguments ke beech rishta bataate ho — ki do arrays mein ek hi type hai, ya default value se milta hai.',
      },
      code: `function merge<T, U extends Partial<T>>(base: T, patch: U): T {
  return { ...base, ...patch };
}`,
    },
    {
      heading: { en: 'Default type parameters', hi: 'Default type parameters' },
      body: {
        en: 'A parameter can have a default, which makes it optional at the call site. Combine it with a constraint and you get a type that is convenient by default and precise when you need it.',
        hi: 'Parameter ka default ho sakta hai, jisse wo call ki jagah optional ho jaata hai. Constraint ke saath jodo toh aisa type milta hai jo default se suvidhajanak hai aur zaroorat pe theek.',
      },
      code: `interface Response<T extends object = Record<string, unknown>> {
  data: T;
}
type R1 = Response;              // T is Record<string, unknown>
type R2 = Response<{ id: number }>;`,
    },
    {
      heading: { en: 'The constraint is not the inferred type', hi: 'Constraint inferred type nahi hai' },
      body: {
        en: 'A subtle point interviewers like. Inside the function, T is the constraint as far as the compiler is concerned; at the call site it is the specific type passed in. That is why you cannot return an object literal typed T — the caller may have a narrower type with extra required fields.',
        hi: 'Ek sookshm baat jo interviewers ko pasand hai. Function ke andar compiler ke liye T wahi constraint hai; call ki jagah wo diya gaya khaas type hai. Isiliye tum T type ka object literal return nahi kar sakte — caller ke paas extra zaroori fields wala tang type ho sakta hai.',
      },
      code: `function f<T extends { a: number }>(): T {
  return { a: 1 };   // ✗ T could require more than just 'a'
}`,
    },
  ],

  'What are the main utility types in TypeScript?': [
    {
      heading: { en: 'Built-in generics that transform a type', hi: 'Built-in generics jo kisi type ko badalte hain' },
      body: {
        en: 'Utility types take an existing type and produce a derived one. Using them instead of hand-writing a variant means the two stay in sync automatically — add a field to the source and every derived type updates.',
        hi: 'Utility types kisi maujooda type se ek naya type banate hain. Haath se variant likhne ki jagah inhe use karo toh dono apne aap synced rehte hain — source mein field jodo aur har derived type update ho jaata hai.',
      },
      diagram: `Partial<T>       every property optional
Required<T>      every property required
Readonly<T>      every property readonly
Pick<T, K>       keep only these keys
Omit<T, K>       remove these keys
Record<K, V>     an object with keys K and values V
Exclude<T, U>    remove members from a union
Extract<T, U>    keep members of a union
NonNullable<T>   remove null and undefined
ReturnType<F>    the return type of a function
Parameters<F>    the parameters of a function, as a tuple
Awaited<T>       unwrap a Promise`,
    },
    {
      heading: { en: 'The object ones you use daily', hi: 'Object wale jo roz use hote hain' },
      body: {
        en: 'Partial for an update payload where every field is optional. Pick and Omit to derive a smaller type instead of duplicating it. Readonly to freeze a shape at the type level. These four cover most real usage.',
        hi: 'Update payload ke liye Partial jahan har field optional hai. Chhota type banane ke liye Pick aur Omit, usse dohraane ki jagah. Type ke star pe shakl jamane ke liye Readonly. Ye chaar zyadatar asli upyog cover kar lete hain.',
      },
      code: `interface User { id: number; name: string; email: string }

type UserUpdate = Partial<User>;              // all optional
type UserPublic = Omit<User, 'email'>;        // { id, name }
type UserKeys   = Pick<User, 'id' | 'name'>;  // the same thing
type Frozen     = Readonly<User>;`,
    },
    {
      heading: { en: 'Record, and the difference from an index signature', hi: 'Record, aur index signature se farq' },
      body: {
        en: 'Record builds an object type from a key type and a value type. With a union of literals as the key it produces a CLOSED object where every key is required — which an index signature cannot express.',
        hi: 'Record ek key type aur value type se object type banata hai. Key mein literals ki union do toh ye ek BAND object banata hai jisme har key zaroori hai — jo index signature nahi bata sakta.',
      },
      code: `type Roles = Record<'admin' | 'user', string[]>;
// { admin: string[]; user: string[] }  — both required

type Loose = Record<string, string[]>;
// any key allowed — same as { [k: string]: string[] }`,
    },
    {
      heading: { en: 'The union ones', hi: 'Union wale' },
      body: {
        en: 'Exclude removes members from a union, Extract keeps them, and NonNullable is Exclude with null and undefined. They operate on unions, not on object properties — mixing them up with Omit and Pick is a common slip.',
        hi: 'Exclude union se members hataata hai, Extract unhe rakhta hai, aur NonNullable null aur undefined ke saath Exclude hi hai. Ye unions pe chalte hain, object properties pe nahi — inhe Omit aur Pick se mila dena aam galti hai.',
      },
      code: `type Status = 'idle' | 'busy' | 'error';
type Active = Exclude<Status, 'idle'>;      // 'busy' | 'error'
type NonNull = NonNullable<string | null>;   // string`,
    },
    {
      heading: { en: 'The function ones', hi: 'Function wale' },
      body: {
        en: 'ReturnType, Parameters and Awaited let you derive a type from a function you did not write. This is how you type a wrapper without duplicating the signature — and how you get the type of an API response from the fetcher.',
        hi: 'ReturnType, Parameters aur Awaited tumhe kisi aise function se type nikaalne dete hain jo tumne likha hi nahi. Aise hi tum wrapper ko type karte ho bina signature dohraaye — aur fetcher se API response ka type paate ho.',
      },
      code: `type R = ReturnType<typeof getUser>;              // Promise<User>
type U = Awaited<ReturnType<typeof getUser>>;     // User
type P = Parameters<typeof getUser>;               // [id: number]`,
    },
    {
      heading: { en: 'The gotchas worth knowing', hi: 'Jaanne laayak jaal' },
      body: {
        en: 'All of them are shallow — Partial and Readonly apply to one level only. Omit does not check that the key exists, so a typo silently does nothing. And these are just mapped and conditional types from the standard library, which you can read and write yourself.',
        hi: 'Ye sab shallow hain — Partial aur Readonly sirf ek level pe lagte hain. Omit ye nahi jaanchta ki key maujood hai ya nahi, toh typo chup-chaap kuch nahi karta. Aur ye sab standard library ke mapped aur conditional types hi hain, jinhe tum padh aur likh sakte ho.',
      },
      code: `type Bad = Omit<User, 'emial'>;    // ✗ typo — silently returns all of User

type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };`,
    },
  ],

  'What is a mapped type?': [
    {
      heading: { en: 'Build a new object type by walking the keys of another', hi: 'Kisi doosre ki keys pe chal kar naya object type banao' },
      body: {
        en: 'A mapped type iterates over the keys of an existing type and produces a property for each. It is the type-level equivalent of Object.entries followed by a map, and it is how every object utility type is implemented.',
        hi: 'Mapped type kisi maujooda type ki keys pe ghoomta hai aur har ek ke liye ek property banata hai. Ye Object.entries phir map ka type-level joda hai, aur har object utility type isi se bana hai.',
      },
      code: `type Optional<T> = { [K in keyof T]?: T[K] };
type Stringify<T> = { [K in keyof T]: string };

type A = Stringify<{ id: number; ok: boolean }>;
// { id: string; ok: string }`,
    },
    {
      heading: { en: 'The syntax, piece by piece', hi: 'Syntax, tukda-tukda' },
      body: {
        en: 'K in keyof T is the loop. T[K] is the original property type, an indexed access. The modifiers ? and readonly can be added or removed, and the minus prefix is what removes them.',
        hi: 'K in keyof T loop hai. T[K] asli property ka type hai, ek indexed access. Modifiers ? aur readonly jode ya hataye ja sakte hain, aur minus prefix unhe hataata hai.',
      },
      diagram: `{ [K in keyof T]?: T[K] }
    │  │      │   │   └── the value type
    │  │      │   └────── add optional
    │  │      └────────── the source keys
    │  └───────────────── the key variable
    └──────────────────── mapped type syntax

-?         remove optional
-readonly  remove readonly`,
    },
    {
      heading: { en: 'Adding and removing modifiers', hi: 'Modifiers jodna aur hataana' },
      body: {
        en: 'This is how Partial, Required and Readonly are actually written in the standard library. Knowing the minus form is a good signal that you understand mapped types rather than just using them.',
        hi: 'Standard library mein Partial, Required aur Readonly asal mein aise hi likhe hain. Minus wala roop jaanna achha ishara hai ki tum mapped types samajhte ho, sirf use nahi karte.',
      },
      code: `type Partial<T>  = { [K in keyof T]?: T[K] };
type Required<T> = { [K in keyof T]-?: T[K] };
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Mutable<T>  = { -readonly [K in keyof T]: T[K] };`,
    },
    {
      heading: { en: 'Key remapping with as', hi: 'as se key badalna' },
      body: {
        en: 'The as clause rewrites each key as you map. Combined with template literal types it generates whole APIs — getters, event handlers, prefixed keys — from one source type.',
        hi: 'as clause map karte waqt har key ko dobara likhta hai. Template literal types ke saath jodo toh ek hi source type se poore APIs ban jaate hain — getters, event handlers, prefix wali keys.',
      },
      code: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
};

type G = Getters<{ name: string }>;   // { getName: () => string }`,
    },
    {
      heading: { en: 'Filtering keys by producing never', hi: 'never de kar keys chhaanna' },
      body: {
        en: 'A key remapped to never is dropped from the result. That gives you filtering — keep only the properties whose type matches, or remove every function from an object type.',
        hi: 'Jis key ko never bana do wo nateeje se hat jaati hai. Isse filtering milti hai — sirf wo properties rakho jinka type mile, ya object type se har function hata do.',
      },
      code: `type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K]
};

type S = OnlyStrings<{ a: string; b: number }>;   // { a: string }`,
    },
    {
      heading: { en: 'Homomorphic mapped types', hi: 'Homomorphic mapped types' },
      body: {
        en: 'A mapped type written directly over keyof T is called homomorphic: it preserves the original modifiers, and it distributes over arrays and tuples instead of flattening them into objects. Naming this is a strong signal in a senior interview.',
        hi: 'Jo mapped type seedha keyof T pe likha ho use homomorphic kehte hain: wo asli modifiers bachaa leta hai, aur arrays aur tuples pe alag-alag lagta hai, unhe objects mein chapta nahi karta. Senior interview mein iska naam lena mazboot ishara hai.',
      },
      code: `type Partial<T> = { [K in keyof T]?: T[K] };
type A = Partial<string[]>;      // (string | undefined)[] — stays an array`,
    },
  ],

  'What is a conditional type?': [
    {
      heading: { en: 'A type-level ternary', hi: 'Type ke star pe ternary' },
      body: {
        en: 'T extends U ? X : Y picks one of two types depending on whether T is assignable to U. It is the branching primitive of the type system, and everything clever in the standard library is built from it.',
        hi: 'T extends U ? X : Y do types mein se ek chunta hai, is aadhaar pe ki T ko U mein daala ja sakta hai ya nahi. Ye type system ka branching auzaar hai, aur standard library ki har chatur cheez isi se bani hai.',
      },
      code: `type IsString<T> = T extends string ? true : false;

type A = IsString<'hi'>;    // true
type B = IsString<42>;      // false`,
    },
    {
      heading: { en: 'They distribute over unions', hi: 'Ye unions pe alag-alag lagte hain' },
      body: {
        en: 'This is the behaviour that surprises everyone. When the checked type is a naked type parameter and you pass a union, the conditional applies to each member separately and the results are unioned back together.',
        hi: 'Yahi behaviour sabko chaunkata hai. Jab jaancha ja raha type ek khaali type parameter ho aur tum union do, toh conditional har member pe alag lagta hai aur nateeje wapas union bana diye jaate hain.',
      },
      diagram: `IsString<'a' | 42>

  distributes to:  IsString<'a'> | IsString<42>
                 =      true     |     false
                 =  boolean`,
    },
    {
      heading: { en: 'How to switch distribution off', hi: 'Distribution kaise band karein' },
      body: {
        en: 'Wrap both sides in a one-element tuple. That stops the type parameter being naked, so the union is checked as a whole. This is the standard trick and it is worth being able to explain.',
        hi: 'Dono taraf ko ek-element wale tuple mein lapet do. Isse type parameter khaali nahi rehta, toh union poori tarah jaanchi jaati hai. Ye standard chaal hai aur isse samjha paana kaam ka hai.',
      },
      code: `type IsStringNoDist<T> = [T] extends [string] ? true : false;

type A = IsStringNoDist<'a' | 42>;   // false — checked as a whole`,
    },
    {
      heading: { en: 'infer extracts a type from a position', hi: 'infer kisi jagah se type nikaal leta hai' },
      body: {
        en: 'Inside the extends clause, infer declares a type variable that TypeScript fills in by pattern matching. This is how ReturnType, Parameters and Awaited pull a type out of something you did not write.',
        hi: 'extends clause ke andar infer ek type variable banata hai jise TypeScript pattern match karke bhar deta hai. Aise hi ReturnType, Parameters aur Awaited kisi aisi cheez se type nikaalte hain jo tumne likhi hi nahi.',
      },
      code: `type ReturnType<F> = F extends (...args: any[]) => infer R ? R : never;
type ElementOf<T> = T extends (infer E)[] ? E : never;

type A = ElementOf<string[]>;    // string`,
    },
    {
      heading: { en: 'They can recurse', hi: 'Ye recurse kar sakte hain' },
      body: {
        en: 'A conditional type may reference itself, which gives you deep transformations — DeepPartial, DeepReadonly, flattening a nested array. TypeScript caps the recursion depth, so very deep types will error.',
        hi: 'Conditional type khud ko use kar sakta hai, jisse gehre transformations milte hain — DeepPartial, DeepReadonly, nested array ko chapta karna. TypeScript recursion ki gehrai seemit karta hai, toh bahut gehre types error denge.',
      },
      code: `type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;`,
    },
    {
      heading: { en: 'Use them sparingly', hi: 'Inhe kam use karo' },
      body: {
        en: 'A clever conditional type produces error messages nobody can read and slows down the compiler on large codebases. If a plain interface or a small union expresses the same thing, prefer that — readability is worth more than cleverness.',
        hi: 'Chatur conditional type aise error messages deta hai jinhe koi padh nahi sakta aur bade codebase pe compiler dheema kar deta hai. Agar saada interface ya chhoti union wahi baat keh de, toh wahi lo — chaturaai se zyada padhne laayak hona keemti hai.',
      },
    },
  ],

  /* ─── Inference, guards and assertions ────────────────────── */

  'What is type inference and when should you write types explicitly?': [
    {
      heading: { en: 'TypeScript works out most types for you', hi: 'TypeScript zyadatar types khud nikaal leta hai' },
      body: {
        en: 'From an initialiser, a return expression, a default parameter or the surrounding context, the compiler infers a type without an annotation. Good TypeScript has far fewer annotations than people expect.',
        hi: 'Initialiser, return expression, default parameter ya aas-paas ke context se compiler bina annotation ke type nikaal leta hai. Achhe TypeScript mein logon ki ummeed se kahin kam annotations hote hain.',
      },
      code: `let n = 42;                  // number
const s = 'hi';              // 'hi' — a literal type
const arr = [1, 2];          // number[]
function f(a: number) { return a * 2; }   // returns number`,
    },
    {
      heading: { en: 'let widens, const does not', hi: 'let chaudi karta hai, const nahi' },
      body: {
        en: 'A const holding a primitive keeps its literal type, because it can never change. A let widens to the general type, because it can. This one rule explains most surprising inference results.',
        hi: 'Primitive rakhne wala const apna literal type bachaa leta hai, kyunki wo kabhi badal hi nahi sakta. let aam type mein chauda ho jaata hai, kyunki wo badal sakta hai. Yahi ek rule zyadatar chaunkane wale inference nateeje samjha deta hai.',
      },
      code: `const a = 'hi';       // 'hi'
let b = 'hi';         // string

const o = { k: 'hi' };   // { k: string } — properties widen too
const p = { k: 'hi' } as const;   // { readonly k: 'hi' }`,
    },
    {
      heading: { en: 'Contextual typing goes the other way', hi: 'Contextual typing ulta chalta hai' },
      body: {
        en: 'When a function is passed where a typed parameter is expected, TypeScript types its parameters from that context. This is why callback parameters need no annotation — and why extracting the callback to a variable suddenly requires one.',
        hi: 'Jab koi function aisi jagah jaaye jahan typed parameter chahiye, TypeScript uske parameters us context se type kar deta hai. Isiliye callback ke parameters ko annotation nahi chahiye — aur isiliye callback ko variable mein nikaalte hi annotation zaroori ho jaata hai.',
      },
      code: `[1, 2].map((n) => n * 2);      // n is number, from context

const f = (n) => n * 2;         // ✗ implicit any — no context
[1, 2].map(f);`,
    },
    {
      heading: { en: 'Annotate the boundaries', hi: 'Boundaries pe annotate karo' },
      body: {
        en: 'The rule most teams follow: annotate function parameters and exported function return types, and let everything inside be inferred. Parameters have no context to infer from, and an explicit return type stops an internal change silently altering your public API.',
        hi: 'Zyadatar teams ka rule: function parameters aur exported functions ke return types annotate karo, aur andar sab kuch infer hone do. Parameters ke paas infer karne ko context nahi hota, aur saaf return type andar ke kisi badlaav ko chup-chaap public API badalne se rokta hai.',
      },
      code: `export function getUser(id: number): Promise<User> {
  const raw = fetchRaw(id);        // inferred — fine
  return normalise(raw);
}`,
    },
    {
      heading: { en: 'Annotate when inference is too wide or too narrow', hi: 'Jab inference bahut chaudi ya bahut tang ho tab annotate karo' },
      body: {
        en: 'An empty array infers never[], so pushing anything fails. A discriminant property widens to string unless you use as const. And a variable that will hold null later needs a union up front.',
        hi: 'Khaali array never[] infer hota hai, toh usme kuch bhi push karna fail ho jaata hai. Discriminant property string mein chaudi ho jaati hai jab tak as const na lagao. Aur jis variable mein baad mein null aana hai usse pehle hi union chahiye.',
      },
      code: `const xs = [];              // never[]
xs.push(1);                  // ✗
const xs: number[] = [];     // ✓

const [u, setU] = useState<User | null>(null);   // ✓ null alone is not enough`,
    },
    {
      heading: { en: 'And when NOT to annotate', hi: 'Aur kab annotate NAHI karna' },
      body: {
        en: 'Restating what the initialiser already says is noise that can go stale. Worse, annotating a variable with a wide type throws away the narrower inferred one — which is exactly what satisfies was added to solve.',
        hi: 'Jo initialiser pehle se keh raha hai usse dohraana shor hai jo purana ho sakta hai. Isse bura, kisi variable pe chauda type lagana us tang inferred type ko phenk deta hai — aur satisfies isi ko hal karne ke liye aaya tha.',
      },
      code: `const n: number = 42;        // ✗ noise
const n = 42;                 // ✓

const cfg: Record<string, string> = { url: 'x' };
cfg.url;                       // string — the key 'url' was forgotten

const cfg = { url: 'x' } satisfies Record<string, string>;
cfg.url;                       // ✓ still known to exist`,
    },
  ],

  'What is the difference between structural and nominal typing?': [
    {
      heading: { en: 'Shape versus name', hi: 'Shakl vs naam' },
      body: {
        en: 'In a structural system two types are compatible if their shapes match, regardless of what they are called or where they were declared. In a nominal system compatibility requires an explicit declared relationship. TypeScript is structural; Java and C# are nominal.',
        hi: 'Structural system mein do types tab compatible hain jab unki shakl mile, chahe unke naam kuch bhi hon ya wo kahin bhi bane hon. Nominal system mein compatibility ke liye saaf-saaf bataya gaya rishta chahiye. TypeScript structural hai; Java aur C# nominal.',
      },
      code: `interface Point { x: number; y: number }
class Vec { constructor(public x: number, public y: number) {} }

const p: Point = new Vec(1, 2);   // ✓ Vec never mentions Point`,
    },
    {
      heading: { en: 'It is why implements is optional', hi: 'Isiliye implements optional hai' },
      body: {
        en: 'A class does not need to declare that it implements an interface — if the shape matches, it is assignable. implements is only a check that you got the shape right, not a requirement for compatibility.',
        hi: 'Class ko ye batane ki zaroorat nahi ki wo koi interface implement karti hai — shakl mil jaaye toh wo assignable hai. implements sirf ye jaanch hai ki shakl sahi hai, compatibility ki shart nahi.',
      },
    },
    {
      heading: { en: 'Excess property checking is the exception', hi: 'Excess property checking apvaad hai' },
      body: {
        en: 'Assigning an object LITERAL with extra properties is an error, even though structurally it is compatible. This special case exists to catch typos. Assign through a variable first and the check disappears, which confuses people the first time.',
        hi: 'Extra properties wala object LITERAL assign karna error hai, jabki dhaanche se wo compatible hai. Ye khaas case typos pakadne ke liye hai. Pehle variable mein rakh kar assign karo toh jaanch gayab ho jaati hai, jo pehli baar uljhan deti hai.',
      },
      code: `const p: Point = { x: 1, y: 2, z: 3 };   // ✗ 'z' does not exist

const raw = { x: 1, y: 2, z: 3 };
const q: Point = raw;                     // ✓ no literal, no check`,
    },
    {
      heading: { en: 'The problem: two types that should not mix', hi: 'Problem: do types jinhe milna nahi chahiye' },
      body: {
        en: 'A UserId and an OrderId are both strings structurally, so TypeScript lets you pass one where the other is expected. That is a real bug the type system will not catch — and it is the reason nominal typing gets brought up at all.',
        hi: 'UserId aur OrderId dhaanche se dono strings hain, toh TypeScript ek ki jagah doosra pass karne deta hai. Ye ek asli bug hai jise type system nahi pakdega — aur isi wajah se nominal typing ki baat uthti hai.',
      },
      code: `type UserId = string;
type OrderId = string;

function getUser(id: UserId) {}
getUser(orderId);       // ✓ compiles — and it is wrong`,
    },
    {
      heading: { en: 'Branded types simulate nominal typing', hi: 'Branded types nominal typing ki nakal karte hain' },
      body: {
        en: 'Intersect the primitive with a phantom property that exists only in the type system. The brand makes the two types structurally different, so they stop being interchangeable — and it costs nothing at runtime because it erases.',
        hi: 'Primitive ko ek aisi phantom property se milao jo sirf type system mein hai. Brand dono types ko dhaanche se alag kar deta hai, toh wo aapas mein badle nahi ja sakte — aur runtime pe iski koi keemat nahi kyunki wo mit jaata hai.',
      },
      code: `type Brand<T, B> = T & { readonly __brand: B };
type UserId  = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

const asUserId = (s: string) => s as UserId;

getUser(orderId);          // ✗ now correctly rejected
getUser(asUserId('u_1'));  // ✓`,
    },
    {
      heading: { en: 'Private members create nominality too', hi: 'Private members bhi nominality banate hain' },
      body: {
        en: 'A class with a private or protected field is only compatible with itself, because the private member is tied to that declaration. This is the one place TypeScript is genuinely nominal, and it is a good detail to know.',
        hi: 'Jis class mein private ya protected field ho wo sirf khud ke saath compatible hai, kyunki private member usi declaration se bandha hota hai. Ye ek jagah hai jahan TypeScript sach mein nominal hai, aur ye jaanne laayak baat hai.',
      },
      code: `class A { private x = 1 }
class B { private x = 1 }
const a: A = new B();     // ✗ types have separate declarations of 'x'`,
    },
  ],

  'What is a type guard?': [
    {
      heading: { en: 'A runtime check that narrows a static type', hi: 'Runtime ki jaanch jo static type narrow kare' },
      body: {
        en: 'A type guard is an expression TypeScript recognises as proof about a type. Inside the branch where it succeeded, the compiler narrows the variable automatically — no cast, no assertion.',
        hi: 'Type guard ek aisa expression hai jise TypeScript kisi type ka saboot maanta hai. Jis branch mein wo safal hui, wahan compiler variable apne aap narrow kar deta hai — na cast, na assertion.',
      },
      code: `function f(x: string | number) {
  if (typeof x === 'string') {
    x.toUpperCase();     // ✓ narrowed
  }
}`,
    },
    {
      heading: { en: 'The built-in guards', hi: 'Built-in guards' },
      body: {
        en: 'typeof for primitives, instanceof for class instances, the in operator for a distinguishing property, Array.isArray for arrays, a literal comparison on a discriminant, and a truthiness or null check. These cover most cases without writing anything.',
        hi: 'Primitives ke liye typeof, class instances ke liye instanceof, koi alag karne wali property ho toh in operator, arrays ke liye Array.isArray, discriminant pe literal comparison, aur truthiness ya null ki jaanch. Ye zyadatar cases bina kuch likhe cover kar lete hain.',
      },
      code: `typeof x === 'string'
x instanceof Date
'wings' in animal
Array.isArray(x)
shape.kind === 'circle'
x != null                    // removes null AND undefined`,
    },
    {
      heading: { en: 'Custom guards with a type predicate', hi: 'Type predicate wale custom guards' },
      body: {
        en: 'When the check is too complex, write a function whose return type is "x is T". TypeScript then treats a true return as proof. Note it trusts you completely — the compiler never verifies that your logic actually checks what you claim.',
        hi: 'Jab jaanch zyada uljhi ho, aisa function likho jiska return type "x is T" ho. Phir TypeScript true return ko saboot maanta hai. Dhyaan do wo tumpe poora bharosa karta hai — compiler kabhi ye nahi jaanchta ki tumhara logic sach mein wahi dekh raha hai jo tum keh rahe ho.',
      },
      code: `function isUser(x: unknown): x is User {
  return typeof x === 'object' && x !== null && 'name' in x;
}

function isString(x: unknown): x is string {
  return typeof x === 'number';    // ✗ a lie, and TypeScript believes it
}`,
    },
    {
      heading: { en: 'Assertion functions', hi: 'Assertion functions' },
      body: {
        en: 'The other form: "asserts x is T". The function throws if the check fails, and everything AFTER the call is narrowed — no if block needed. Useful for validating input at the top of a function.',
        hi: 'Doosra roop: "asserts x is T". Jaanch fail ho toh function throw karta hai, aur call ke BAAD sab kuch narrow ho jaata hai — koi if block nahi chahiye. Function ke shuru mein input validate karne ke liye kaam ka.',
      },
      code: `function assertUser(x: unknown): asserts x is User {
  if (!isUser(x)) throw new Error('not a user');
}

assertUser(data);
data.name;      // ✓ narrowed from here on`,
    },
    {
      heading: { en: 'What breaks narrowing', hi: 'Narrowing kya todta hai' },
      body: {
        en: 'Narrowing applies to a specific reference and does not survive a function boundary, an await, or a reassignment. It also does not survive a property access on a mutable object, because the property could change between the check and the use.',
        hi: 'Narrowing ek khaas reference pe lagti hai aur function ki seema, await, ya dobara assign karne ke baad nahi bachti. Kisi mutable object ki property access ke baad bhi nahi bachti, kyunki jaanch aur upyog ke beech property badal sakti hai.',
      },
      code: `if (obj.value !== null) {
  callback(() => obj.value.toFixed());   // ✗ narrowing lost
}

const v = obj.value;                      // ✓ copy to a const first
if (v !== null) callback(() => v.toFixed());`,
    },
    {
      heading: { en: 'The honest limitation', hi: 'Imaandaar seema' },
      body: {
        en: 'A hand-written guard for a large object shape is easy to get wrong, and it silently drifts as the type changes. For real external data use a schema validator such as Zod, which infers the TypeScript type from the schema so the two cannot disagree.',
        hi: 'Bade object shape ke liye haath se likha guard galat hona aasaan hai, aur type badalne pe wo chup-chaap purana ho jaata hai. Asli bahari data ke liye Zod jaisa schema validator lo, jo schema se hi TypeScript type nikaal leta hai taaki dono alag ho hi na sakein.',
      },
      code: `const User = z.object({ name: z.string() });
type User = z.infer<typeof User>;      // one source of truth
const user = User.parse(json);          // validated AND typed`,
    },
  ],

  'What is the difference between a type assertion and type casting?': [
    {
      heading: { en: 'TypeScript has assertions, not casts', hi: 'TypeScript mein assertions hain, casts nahi' },
      body: {
        en: 'A cast in most languages converts a value at runtime. A TypeScript assertion converts nothing — it only tells the compiler to stop inferring and trust you. It disappears completely when the code is compiled.',
        hi: 'Zyadatar languages mein cast runtime pe value badal deta hai. TypeScript ka assertion kuch nahi badalta — wo sirf compiler se kehta hai ki infer karna band karo aur mujhpe bharosa karo. Compile hote hi wo poori tarah gayab ho jaata hai.',
      },
      code: `const n = value as number;
// compiles to:
const n = value;              // nothing happened at runtime`,
    },
    {
      heading: { en: 'Which is why it can lie', hi: 'Isiliye ye jhooth bol sakta hai' },
      body: {
        en: 'An assertion is an unchecked promise. Assert wrongly and you get a compile-time success and a runtime crash, with no warning at the point of the mistake. This is the core danger and the point of the question.',
        hi: 'Assertion ek bina jaancha vaada hai. Galat assert karo toh compile pe safalta aur runtime pe crash milta hai, galti ki jagah pe koi chetavni nahi. Yahi asli khatra hai aur sawaal ka maqsad bhi.',
      },
      code: `const s = 42 as unknown as string;
s.toUpperCase();      // ✓ compiles  💥 crashes at runtime`,
    },
    {
      heading: { en: 'The two syntaxes', hi: 'Do syntax' },
      body: {
        en: 'The as form and the angle-bracket form are identical. Use as always — the angle-bracket form conflicts with JSX and does not work in .tsx files.',
        hi: 'as wala roop aur angle-bracket wala roop ek hi hain. Hamesha as use karo — angle-bracket wala JSX se takraata hai aur .tsx files mein chalta nahi.',
      },
      code: `value as string;      // ✓ always
<string>value;         // ✗ breaks in .tsx`,
    },
    {
      heading: { en: 'It only works between related types', hi: 'Ye sirf jude hue types ke beech chalta hai' },
      body: {
        en: 'TypeScript refuses an assertion between types with no overlap, which catches obvious mistakes. Going through unknown defeats that check — and needing the double assertion is a strong signal that you are doing something wrong.',
        hi: 'TypeScript un types ke beech assertion mana kar deta hai jinme koi overlap na ho, jisse saaf galtiyan pakdi jaati hain. unknown se hokar jaana us jaanch ko haraa deta hai — aur double assertion ki zaroorat padna mazboot ishara hai ki tum kuch galat kar rahe ho.',
      },
      code: `'hi' as number;                    // ✗ neither type overlaps
'hi' as unknown as number;          // ✓ compiles — and is a red flag`,
    },
    {
      heading: { en: 'What to use instead', hi: 'Uski jagah kya use karein' },
      body: {
        en: 'A type guard, because it verifies at runtime and narrows for free. A schema validator for external data. satisfies when you only want to check a value against a type without changing its inferred type. Assertions should be the last resort.',
        hi: 'Type guard, kyunki wo runtime pe jaanchta hai aur muft mein narrow karta hai. Bahari data ke liye schema validator. satisfies jab tum sirf value ko kisi type se jaanchna chahte ho bina uska inferred type badle. Assertions aakhri sahara hone chahiye.',
      },
      code: `if (isUser(data)) data.name;                 // ✓ verified
const user = UserSchema.parse(json);          // ✓ validated
const cfg = { a: 1 } satisfies Config;        // ✓ checked, not widened`,
    },
    {
      heading: { en: 'The legitimate uses', hi: 'Jaayaz upyog' },
      body: {
        en: 'There are a few. Narrowing a DOM query result, where you know the element type and TypeScript cannot. as const to keep literal types. And a non-null assertion where an invariant genuinely guarantees the value — with a comment saying why.',
        hi: 'Kuch hain. DOM query ke nateeje ko narrow karna, jahan tumhe element ka type pata hai aur TypeScript ko nahi. Literal types bachane ke liye as const. Aur non-null assertion wahan jahan koi niyam sach mein value ki guarantee deta ho — ek comment ke saath jo wajah bataye.',
      },
      code: `const input = document.querySelector('#email') as HTMLInputElement;
const sizes = ['sm', 'lg'] as const;
const el = ref.current!;      // guaranteed by the effect running after mount`,
    },
  ],

  'How do you type an API response safely?': [
    {
      heading: { en: 'The type you write is a guess, not a guarantee', hi: 'Tumhara likha type ek andaaza hai, guarantee nahi' },
      body: {
        en: 'Start here, because it is the whole point. Annotating a fetch result asserts a shape TypeScript cannot verify — the compiler is gone at runtime, and the server can send anything. This is the single biggest source of false confidence in a TypeScript codebase.',
        hi: 'Yahin se shuru karo, kyunki asli baat yahi hai. Fetch ke nateeje pe annotation ek aisi shakl ka daava hai jise TypeScript jaanch hi nahi sakta — runtime pe compiler hai hi nahi, aur server kuch bhi bhej sakta hai. TypeScript codebase mein jhoothe bharose ki sabse badi jad yahi hai.',
      },
      code: `const user = await res.json() as User;   // ✗ a lie you cannot verify
user.name.toUpperCase();                   // 💥 if the server changed`,
    },
    {
      heading: { en: 'json() returns any, which is worse', hi: 'json() any deta hai, jo aur bura hai' },
      body: {
        en: 'Without an annotation the result is any, so every property access, every method call and everything derived from it is unchecked. One await silently disables the type system for a whole branch of your code.',
        hi: 'Bina annotation ke nateeja any hota hai, toh har property access, har method call aur usse nikli har cheez bina jaanchi rehti hai. Ek await chup-chaap tumhare code ki poori shaakha ke liye type system band kar deta hai.',
      },
      code: `const data = await res.json();     // any
data.usr.naem.toUpperCase();        // ✓ compiles, 💥 crashes`,
    },
    {
      heading: { en: 'Step one: type the boundary as unknown', hi: 'Pehla kadam: boundary ko unknown type do' },
      body: {
        en: 'Even if you do nothing else, this forces a decision. unknown cannot be used until it is narrowed, so the compiler makes you acknowledge that the data is unverified rather than letting any spread silently.',
        hi: 'Aur kuch na karo tab bhi, ye ek faisla karwaata hai. unknown ko narrow kiye bina use nahi kar sakte, toh compiler tumse manwaata hai ki data bina jaancha hai, any ko chup-chaap failne ki jagah.',
      },
      code: `const data: unknown = await res.json();
data.name;                       // ✗ compiler stops you here`,
    },
    {
      heading: { en: 'Step two: validate with a schema', hi: 'Doosra kadam: schema se validate karo' },
      body: {
        en: 'This is the real answer. A runtime validator such as Zod checks the shape and INFERS the TypeScript type from the same schema, so there is one source of truth and the two cannot drift apart.',
        hi: 'Asli jawab yahi hai. Zod jaisa runtime validator shakl jaanchta hai aur usi schema se TypeScript ka type NIKAAL leta hai, toh sach ek hi jagah hai aur dono alag ho hi nahi sakte.',
      },
      code: `import { z } from 'zod';

const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});
type User = z.infer<typeof User>;      // derived, never hand-written

const user = User.parse(await res.json());   // throws on mismatch`,
    },
    {
      heading: { en: 'Fail loudly at the boundary, not deep inside', hi: 'Boundary pe zor se fail karo, andar gehre mein nahi' },
      body: {
        en: 'The value of validating at the edge is that a bad response produces one clear error naming the field that is wrong, instead of a "cannot read property of undefined" three components away with no clue where the bad data came from.',
        hi: 'Kinaare pe validate karne ka fayda ye hai ki kharaab response ek saaf error deta hai jo galat field ka naam bataata hai, na ki teen components door "cannot read property of undefined" jisme pata hi na chale kharaab data aaya kahan se.',
      },
      code: `const result = User.safeParse(json);
if (!result.success) {
  logger.error(result.error.issues);    // exactly which field failed
  throw new BadResponseError();
}
return result.data;`,
    },
    {
      heading: { en: 'The lighter alternative: a type guard', hi: 'Halka vikalp: ek type guard' },
      body: {
        en: 'If you cannot add a dependency, a hand-written predicate is better than nothing. Be honest that it is easy to get wrong and silently drifts as the type changes — that trade-off is exactly what a schema library removes.',
        hi: 'Agar dependency nahi jod sakte, toh haath se likha predicate kuch na hone se behtar hai. Imaandaari se kaho ki isme galti aasaan hai aur type badalne pe wo chup-chaap purana ho jaata hai — schema library yahi sauda khatam karti hai.',
      },
      code: `function isUser(x: unknown): x is User {
  return typeof x === 'object' && x !== null &&
    typeof (x as User).name === 'string';
}`,
    },
    {
      heading: { en: 'Better still: generate the types', hi: 'Isse bhi behtar: types generate karo' },
      body: {
        en: 'If the API has an OpenAPI spec, a GraphQL schema, or is a tRPC endpoint in the same repo, generate the types from it. Then a backend change becomes a compile error in the frontend, which no amount of hand-written typing can give you.',
        hi: 'Agar API ka OpenAPI spec ho, GraphQL schema ho, ya wo usi repo mein tRPC endpoint ho, toh usi se types generate karo. Phir backend ka badlaav frontend mein compile error ban jaata hai, jo haath se likhe kitne bhi types nahi de sakte.',
      },
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"An annotation on res.json() is an unchecked assertion — TypeScript is erased at runtime. I type the boundary as unknown and validate with a schema like Zod, inferring the TypeScript type from that schema so there is one source of truth. Where the API is owned by us, I generate the types from the spec instead."',
        hi: '"res.json() pe annotation ek bina jaanchi assertion hai — runtime pe TypeScript mit chuka hota hai. Main boundary ko unknown type deta hoon aur Zod jaise schema se validate karta hoon, us schema se hi TypeScript ka type nikaal kar taaki sach ek hi jagah ho. Jahan API hamari apni ho, wahan main spec se types generate karta hoon."',
      },
    },
  ],

  'What is the difference between interface extends and intersection types?': [
    {
      heading: { en: 'Both compose, but conflicts behave differently', hi: 'Dono jodte hain, par takraav alag chalta hai' },
      body: {
        en: 'For compatible shapes they produce the same result. The difference appears only when two members declare the same property with different types — and that difference is the whole question.',
        hi: 'Milti-julti shakalon ke liye dono wahi nateeja dete hain. Farq tabhi dikhta hai jab do members ek hi property ko alag type ke saath batayein — aur wahi farq poora sawaal hai.',
      },
      code: `interface A { x: string }
interface B extends A { y: number }     // { x: string; y: number }

type C = { x: string } & { y: number }; // the same shape`,
    },
    {
      heading: { en: 'extends reports a conflict immediately', hi: 'extends takraav turant bata deta hai' },
      body: {
        en: 'If the child declares a property incompatible with the parent, TypeScript errors at the declaration. You find out where the mistake is, at the moment you make it.',
        hi: 'Agar bachcha koi aisi property bataye jo parent se na mile, TypeScript declaration pe hi error deta hai. Galti kahan hai ye tumhe usi pal pata chal jaata hai jab tum karo.',
      },
      code: `interface A { x: string }
interface B extends A { x: number }
// ✗ Interface 'B' incorrectly extends 'A'.
//   Type 'number' is not assignable to type 'string'.`,
    },
    {
      heading: { en: 'An intersection silently produces never', hi: 'Intersection chup-chaap never bana deta hai' },
      body: {
        en: 'There is no error at the declaration. TypeScript intersects the two property types, and string & number is never — so the property becomes unusable and you only discover it much later, at the use site, with a confusing message.',
        hi: 'Declaration pe koi error nahi. TypeScript dono property types ko milaata hai, aur string & number never hai — toh property bekaar ho jaati hai aur tumhe bahut baad mein pata chalta hai, use karne ki jagah, ek uljhane wale message ke saath.',
      },
      code: `type C = { x: string } & { x: number };
declare const c: C;
c.x;              // never
c.x = 'hi';       // ✗ 'string' is not assignable to 'never'`,
    },
    {
      heading: { en: 'Which makes extends the safer default', hi: 'Isiliye extends safe default hai' },
      body: {
        en: 'Errors at the point of declaration beat errors at the point of use. On a large codebase, an accidental never can sit undetected for a long time and produce a message that points nowhere near the actual mistake.',
        hi: 'Declaration pe error, upyog pe error se behtar hai. Bade codebase mein galti se bana never lambe samay tak chhupa reh sakta hai aur aisa message deta hai jo asli galti ke aas-paas bhi ishara nahi karta.',
      },
    },
    {
      heading: { en: 'What only each one can do', hi: 'Har ek hi kya kar sakta hai' },
      body: {
        en: 'extends works only between interfaces and object-like types. An intersection composes anything — a union with an object, a mapped type result, a computed conditional type. And only an interface participates in declaration merging.',
        hi: 'extends sirf interfaces aur object-jaise types ke beech chalta hai. Intersection kuch bhi jod sakta hai — object ke saath union, mapped type ka nateeja, banaya gaya conditional type. Aur declaration merging mein sirf interface bhaag leta hai.',
      },
      code: `type WithId<T> = T & { id: string };        // ✓ generic composition
type Branded = string & { __brand: 'Id' };   // ✓ primitive + object
interface I extends Union {}                  // ✗ not allowed`,
    },
    {
      heading: { en: 'A performance note worth knowing', hi: 'Jaanne laayak ek performance ki baat' },
      body: {
        en: 'The compiler caches an interface as a single named type and can compare it by reference. A large intersection is recomputed structurally, so a deeply nested chain of intersections measurably slows type checking on a big project.',
        hi: 'Compiler interface ko ek naam wale type ki tarah cache karta hai aur usse reference se compare kar sakta hai. Bada intersection dhaanche se dobara banta hai, toh gehri nested intersections ki chain bade project pe type checking ko naapne laayak dheema kar deti hai.',
      },
    },
    {
      heading: { en: 'How to choose', hi: 'Kaise chunein' },
      body: {
        en: 'extends for object shapes in a hierarchy — the errors are better and the tooling is faster. Intersections for composing computed or generic types, and for anything that is not a plain object. Consistency within a codebase matters more than the choice itself.',
        hi: 'Kisi shreni-krram mein object shapes ke liye extends — errors behtar hain aur tooling tez. Banaye gaye ya generic types jodne ke liye, aur har us cheez ke liye jo saada object nahi hai, intersections. Chunav se zyada codebase mein ek jaisa rehna maayne rakhta hai.',
      },
    },
  ],

  'What does the keyof operator do?': [
    {
      heading: { en: 'It produces a union of an object type\'s keys', hi: 'Ye kisi object type ki keys ki union deta hai' },
      body: {
        en: 'keyof T is a type-level operation that returns the literal union of every property name in T. It works on types, not values — so it runs entirely at compile time and produces nothing at runtime.',
        hi: 'keyof T ek type-level operation hai jo T ki har property ke naam ki literal union deta hai. Ye types pe chalta hai, values pe nahi — toh poori tarah compile time pe chalta hai aur runtime pe kuch nahi banata.',
      },
      code: `interface User { id: number; name: string }
type UserKeys = keyof User;      // 'id' | 'name'`,
    },
    {
      heading: { en: 'Paired with a generic, it makes lookups safe', hi: 'Generic ke saath ye lookups safe bana deta hai' },
      body: {
        en: 'This is the pattern you will actually write. Constrain K to keyof T and a function accepts only real property names, while the indexed access T[K] gives back exactly the right value type.',
        hi: 'Yahi pattern tum sach mein likhoge. K ko keyof T se baandho aur function sirf asli property naam leta hai, jabki indexed access T[K] bilkul sahi value type wapas deta hai.',
      },
      code: `function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

get(user, 'name');     // string  ✓ exact type
get(user, 'nope');     // ✗ caught at compile time`,
    },
    {
      heading: { en: 'The results that surprise people', hi: 'Wo nateeje jo logon ko chaunkate hain' },
      body: {
        en: 'keyof on a type with a string index signature gives string | number, because a numeric key is also a valid string key. keyof on an array gives every array method name plus number. And keyof any gives string | number | symbol.',
        hi: 'String index signature wale type pe keyof, string | number deta hai, kyunki numeric key bhi valid string key hai. Array pe keyof har array method ka naam aur number deta hai. Aur keyof any, string | number | symbol.',
      },
      code: `type A = keyof { [k: string]: number };   // string | number
type B = keyof string[];                   // number | 'length' | 'push' | …
type C = keyof any;                        // string | number | symbol`,
    },
    {
      heading: { en: 'Combine it with typeof for a value', hi: 'Kisi value ke liye isse typeof ke saath jodo' },
      body: {
        en: 'keyof needs a TYPE. To get the keys of an object VALUE, use typeof first. This two-step is one of the most common idioms in real TypeScript, especially for config objects and lookup tables.',
        hi: 'keyof ko TYPE chahiye. Kisi object VALUE ki keys chahiye toh pehle typeof lo. Ye do-kadam wala tareeka asli TypeScript ke sabse aam idioms mein hai, khaas kar config objects aur lookup tables ke liye.',
      },
      code: `const routes = { home: '/', about: '/about' };
type Route = keyof typeof routes;      // 'home' | 'about'`,
    },
    {
      heading: { en: 'It powers mapped types', hi: 'Isi se mapped types chalte hain' },
      body: {
        en: 'Every object utility type in the standard library iterates over keyof T. Once you see Partial written out, keyof stops being an isolated operator and becomes the loop variable of type-level programming.',
        hi: 'Standard library ka har object utility type keyof T pe ghoomta hai. Partial ko khul kar dekh lo toh keyof ek akela operator nahi rehta, wo type-level programming ka loop variable ban jaata hai.',
      },
      code: `type Partial<T> = { [K in keyof T]?: T[K] };
type Readonly<T> = { readonly [K in keyof T]: T[K] };`,
    },
    {
      heading: { en: 'Filtering keys by their value type', hi: 'Value type se keys chhaanna' },
      body: {
        en: 'A useful advanced move. Map over keyof T, remap a key to never when its value type does not match, and you are left with only the keys you wanted. This is how you extract, say, every string-valued property.',
        hi: 'Ek kaam ki uchch chaal. keyof T pe map karo, jis key ki value type na mile usse never bana do, aur sirf wahi keys bachengi jo chahiye thi. Aise hi tum, maano, har string wali property nikaalte ho.',
      },
      code: `type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T];

type S = KeysOfType<{ a: string; b: number }, string>;   // 'a'`,
    },
  ],

  'What is the difference between typeof in JavaScript and in TypeScript?': [
    {
      heading: { en: 'Same keyword, two completely different operators', hi: 'Ek hi keyword, do bilkul alag operators' },
      body: {
        en: 'In an expression position, typeof is the JavaScript operator that returns a string at runtime. In a TYPE position, typeof is a TypeScript operator that reads the type of a value at compile time. Position decides which one you get.',
        hi: 'Expression ki jagah typeof wo JavaScript operator hai jo runtime pe string deta hai. TYPE ki jagah typeof wo TypeScript operator hai jo compile time pe kisi value ka type padhta hai. Jagah tay karti hai kaunsa milega.',
      },
      code: `const s = 'hi';

const t = typeof s;      // JS  — the string 'string', at runtime
type T = typeof s;        // TS  — the type 'hi', at compile time`,
    },
    {
      heading: { en: 'The JavaScript one returns a string', hi: 'JavaScript wala string deta hai' },
      body: {
        en: 'It gives one of eight strings and exists at runtime. In TypeScript it doubles as a type guard, because the compiler understands what a successful typeof check proves about a value.',
        hi: 'Ye aath strings mein se ek deta hai aur runtime pe hota hai. TypeScript mein ye type guard ka bhi kaam karta hai, kyunki compiler samajhta hai ki safal typeof jaanch kisi value ke baare mein kya saabit karti hai.',
      },
      code: `if (typeof x === 'string') x.toUpperCase();   // ✓ narrows`,
    },
    {
      heading: { en: 'The TypeScript one lifts a value into the type world', hi: 'TypeScript wala value ko type ki duniya mein utha leta hai' },
      body: {
        en: 'This is the useful half. It lets you derive a type from a value you already wrote, instead of declaring the same shape twice and letting the two drift apart.',
        hi: 'Kaam ka hissa yahi hai. Ye tumhe pehle se likhi hui value se type nikaalne deta hai, wahi shakl do baar likh kar dono ko alag hone dene ki jagah.',
      },
      code: `const config = { url: 'x', retries: 3 };
type Config = typeof config;      // { url: string; retries: number }

function greet(a: string, b: number) {}
type Args = Parameters<typeof greet>;   // [a: string, b: number]`,
    },
    {
      heading: { en: 'The idioms it appears in', hi: 'Ye kin idioms mein aata hai' },
      body: {
        en: 'keyof typeof to get the keys of an object value. typeof fn with ReturnType or Parameters. And typeof combined with as const to derive a union of literal values from an array.',
        hi: 'Kisi object value ki keys ke liye keyof typeof. ReturnType ya Parameters ke saath typeof fn. Aur as const ke saath typeof, kisi array se literal values ki union nikaalne ke liye.',
      },
      code: `const routes = { home: '/', about: '/about' } as const;
type Route = keyof typeof routes;              // 'home' | 'about'
type Path  = (typeof routes)[Route];            // '/' | '/about'

const sizes = ['sm', 'lg'] as const;
type Size = (typeof sizes)[number];             // 'sm' | 'lg'`,
    },
    {
      heading: { en: 'It only works on values, not on types', hi: 'Ye sirf values pe chalta hai, types pe nahi' },
      body: {
        en: 'A common error. typeof takes an identifier that exists in the value world. Applying it to a type name is meaningless — the type is already a type.',
        hi: 'Ek aam galti. typeof aisa naam leta hai jo value ki duniya mein maujood ho. Usse kisi type ke naam pe lagana bemaani hai — wo pehle se hi type hai.',
      },
      code: `interface User {}
type T = typeof User;      // ✗ 'User' only refers to a type

class C {}
type T = typeof C;          // ✓ a class is also a value — the constructor`,
    },
    {
      heading: { en: 'Why the overload exists', hi: 'Ye do matlab kyun hain' },
      body: {
        en: 'TypeScript keeps two separate namespaces — one for values and one for types — and the same identifier can live in both. typeof is the bridge from the value namespace into the type namespace, which is why it reads oddly at first.',
        hi: 'TypeScript do alag namespaces rakhta hai — ek values ke liye, ek types ke liye — aur ek hi naam dono mein reh sakta hai. typeof value ke namespace se type ke namespace tak ka pul hai, isiliye pehle-pehle ye ajeeb padha jaata hai.',
      },
    },
  ],

  'What are literal types and const assertions?': [
    {
      heading: { en: 'A literal type is a single exact value', hi: 'Literal type ek hi theek value hai' },
      body: {
        en: 'Not just string, but the specific string "circle". Not number, but 42. A literal type has exactly one inhabitant, and a union of literals is how you express a closed set of allowed values.',
        hi: 'Sirf string nahi, balki wo khaas string "circle". Sirf number nahi, balki 42. Literal type mein bilkul ek hi value hoti hai, aur literals ki union se tum allowed values ka ek band samooh banate ho.',
      },
      code: `type Direction = 'up' | 'down';
type Bit = 0 | 1;

let d: Direction = 'up';
d = 'left';       // ✗ not assignable`,
    },
    {
      heading: { en: 'Widening is why they often disappear', hi: 'Ye aksar chaudi ho kar gayab kyun ho jaate hain' },
      body: {
        en: 'A const holding a primitive keeps its literal type because it can never change. A let widens to the general type, and so do the properties of an object literal — because those can be reassigned.',
        hi: 'Primitive rakhne wala const apna literal type bachaa leta hai kyunki wo kabhi badal hi nahi sakta. let aam type mein chauda ho jaata hai, aur object literal ki properties bhi — kyunki unhe dobara assign kiya ja sakta hai.',
      },
      code: `const a = 'up';       // 'up'
let b = 'up';         // string
const o = { d: 'up' }; // { d: string }  ← the property widened`,
    },
    {
      heading: { en: 'as const stops the widening', hi: 'as const chaudi hone se rokta hai' },
      body: {
        en: 'A const assertion tells TypeScript to infer the narrowest possible type. Every property becomes readonly and keeps its literal type, and an array becomes a readonly tuple.',
        hi: 'Const assertion TypeScript se kehta hai ki sabse tang mumkin type nikaalo. Har property readonly ho jaati hai aur apna literal type rakhti hai, aur array ek readonly tuple ban jaata hai.',
      },
      code: `const o = { d: 'up' } as const;
// { readonly d: 'up' }

const arr = ['a', 'b'] as const;
// readonly ['a', 'b']  — a tuple, not string[]`,
    },
    {
      heading: { en: 'The problem it solves in practice', hi: 'Ye asal mein kaunsi problem hal karta hai' },
      body: {
        en: 'Passing an object literal to a function expecting a discriminated union fails, because the discriminant widened to string. as const is the fix, and this is the most common real encounter with it.',
        hi: 'Object literal ko aise function mein bhejna jo discriminated union chahta ho, fail ho jaata hai, kyunki discriminant string mein chauda ho gaya. Ilaaj as const hai, aur asal mein isse sabse aam mulaqat yahi hai.',
      },
      code: `type Shape = { kind: 'circle'; r: number };

const s = { kind: 'circle', r: 1 };
draw(s);                       // ✗ kind is string

const s = { kind: 'circle', r: 1 } as const;
draw(s);                       // ✓`,
    },
    {
      heading: { en: 'Deriving a union from an array', hi: 'Array se union nikaalna' },
      body: {
        en: 'The idiom worth memorising. as const plus indexed access by number turns a runtime array into a compile-time union — so you write the list once and get both the values and the type.',
        hi: 'Yaad rakhne laayak idiom. as const aur number se indexed access mil kar runtime ke array ko compile-time union bana dete hain — toh list ek baar likho aur values aur type dono milein.',
      },
      code: `const SIZES = ['sm', 'md', 'lg'] as const;
type Size = (typeof SIZES)[number];      // 'sm' | 'md' | 'lg'

SIZES.forEach(…);                          // still a real array at runtime`,
    },
    {
      heading: { en: 'What as const does not do', hi: 'as const kya nahi karta' },
      body: {
        en: 'It is a compile-time assertion, so nothing is frozen at runtime — readonly is erased and the object is still mutable. If you need real immutability, call Object.freeze as well.',
        hi: 'Ye compile-time assertion hai, toh runtime pe kuch nahi jamta — readonly mit jaata hai aur object ab bhi mutable hai. Asli immutability chahiye toh Object.freeze bhi bulao.',
      },
      code: `const o = { a: 1 } as const;
(o as any).a = 2;         // ✓ actually changes it at runtime`,
    },
  ],

  'What is the difference between readonly and const?': [
    {
      heading: { en: 'One is JavaScript, the other is TypeScript', hi: 'Ek JavaScript hai, doosra TypeScript' },
      body: {
        en: 'const is a JavaScript keyword that locks a variable BINDING at runtime. readonly is a TypeScript modifier that stops a PROPERTY being assigned at compile time. They apply to different things and neither replaces the other.',
        hi: 'const ek JavaScript keyword hai jo runtime pe variable ki BINDING lock karta hai. readonly ek TypeScript modifier hai jo compile time pe kisi PROPERTY mein assign hone se rokta hai. Ye alag cheezon pe lagte hain aur koi doosre ki jagah nahi leta.',
      },
      code: `const x = 1;
x = 2;                    // ✗ runtime TypeError — a real language rule

interface P { readonly a: number }
declare const p: P;
p.a = 2;                   // ✗ compile error only — erased at runtime`,
    },
    {
      heading: { en: 'const does not make the value immutable', hi: 'const value ko immutable nahi banata' },
      body: {
        en: 'The classic point. A const holding an object stops you pointing the name somewhere else, but the object itself is fully mutable. This is the single most common misunderstanding about const.',
        hi: 'Classic baat. Object rakhne wala const naam ko kahin aur point karne se rokta hai, par object khud poori tarah mutable hai. const ke baare mein sabse aam galatfehmi yahi hai.',
      },
      code: `const arr = [1];
arr.push(2);     // ✓ allowed — mutating
arr = [];        // ✗ TypeError — rebinding`,
    },
    {
      heading: { en: 'readonly is erased and gives no runtime protection', hi: 'readonly mit jaata hai aur runtime pe koi suraksha nahi deta' },
      body: {
        en: 'It only stops assignment that TypeScript can see. Cast to any, or hand the object to untyped JavaScript, and it changes happily. Say this — it is the check for whether you understand type erasure.',
        hi: 'Ye sirf wo assignment rokta hai jo TypeScript ko dikhe. any mein cast karo, ya object ko bina-type wale JavaScript ko de do, aur wo khushi se badal jaayega. Ye kaho — yahi jaanch hai ki tum type erasure samajhte ho ya nahi.',
      },
      code: `(p as any).a = 2;      // ✓ changes it — readonly was compile-time only`,
    },
    {
      heading: { en: 'ReadonlyArray blocks the mutating methods', hi: 'ReadonlyArray mutate karne wale methods rokta hai' },
      body: {
        en: 'readonly on an array type removes push, pop, sort, splice and index assignment from the type, so a mutation is a compile error. The non-mutating methods still work and return a normal array.',
        hi: 'Array type pe readonly, push, pop, sort, splice aur index assignment ko type se hata deta hai, toh mutation compile error hai. Non-mutating methods chalte rehte hain aur aam array dete hain.',
      },
      code: `const xs: readonly number[] = [1, 2];
xs.push(3);       // ✗ Property 'push' does not exist
xs[0] = 9;        // ✗
xs.map((n) => n); // ✓ returns number[]`,
    },
    {
      heading: { en: 'Both are shallow', hi: 'Dono shallow hain' },
      body: {
        en: 'Readonly<T> and a readonly modifier apply to one level. A nested object is still fully mutable. Deep immutability needs a recursive mapped type, and even that is only a compile-time guarantee.',
        hi: 'Readonly<T> aur readonly modifier ek level pe lagte hain. Nested object ab bhi poori tarah mutable hai. Gehri immutability ke liye recursive mapped type chahiye, aur wo bhi sirf compile-time ki guarantee hai.',
      },
      code: `type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };`,
    },
    {
      heading: { en: 'The rule for real code', hi: 'Asli code ka rule' },
      body: {
        en: 'Use const for every variable you do not reassign. Use readonly on properties and array parameters to document and enforce that a function will not mutate what it was given. And use Object.freeze when you need the guarantee to survive at runtime.',
        hi: 'Har us variable ke liye const jise dobara assign nahi karte. Properties aur array parameters pe readonly, ye batane aur lagoo karne ke liye ki function apne diye hue ko badlega nahi. Aur jab guarantee runtime tak chahiye tab Object.freeze.',
      },
      code: `function sum(xs: readonly number[]) { … }   // documents "I will not mutate"`,
    },
  ],

  'What is strictNullChecks and why does it matter?': [
    {
      heading: { en: 'It makes null and undefined their own types', hi: 'Ye null aur undefined ko apne types bana deta hai' },
      body: {
        en: 'With the flag off, null and undefined are assignable to every type, so TypeScript can never warn you about them. With it on, they are separate types you must include in a union and handle explicitly.',
        hi: 'Flag band ho toh null aur undefined har type mein daale ja sakte hain, toh TypeScript unke baare mein kabhi chetavni de hi nahi sakta. Chaalu ho toh ye alag types hain jinhe union mein shaamil karna aur saaf-saaf sambhalna padta hai.',
      },
      code: `// off
let s: string = null;      // ✓ compiles — and crashes later

// on
let s: string = null;      // ✗ Type 'null' is not assignable to 'string'
let s: string | null = null;   // ✓ and now you must handle it`,
    },
    {
      heading: { en: 'It is the flag that earns TypeScript its keep', hi: 'Yahi flag TypeScript ki keemat vasool karta hai' },
      body: {
        en: 'Reading a property of null or undefined is the most common runtime error in JavaScript. Without strictNullChecks, TypeScript cannot catch a single one of them — which is why the flag is often described as the difference between real and cosmetic type safety.',
        hi: 'null ya undefined ki property padhna JavaScript ki sabse aam runtime error hai. strictNullChecks ke bina TypeScript unme se ek bhi nahi pakad sakta — isiliye is flag ko aksar asli aur dikhawti type safety ka farq kaha jaata hai.',
      },
    },
    {
      heading: { en: 'Where the compiler starts helping', hi: 'Compiler kahan madad karna shuru karta hai' },
      body: {
        en: 'Optional properties become T | undefined. Functions that may return nothing must say so. Array find, Map get and a regex match all return a possibly-undefined value, and the compiler forces you to check.',
        hi: 'Optional properties T | undefined ban jaati hain. Jo functions kuch na de sakein unhe ye batana padta hai. Array find, Map get aur regex match sab shaayad-undefined value dete hain, aur compiler tumse jaanch karwaata hai.',
      },
      code: `const u = users.find((u) => u.id === id);
u.name;          // ✗ 'u' is possibly 'undefined'
u?.name;         // ✓
if (u) u.name;   // ✓`,
    },
    {
      heading: { en: 'The tools for handling it', hi: 'Isse sambhalne ke auzaar' },
      body: {
        en: 'Optional chaining to short-circuit. Nullish coalescing for a default that does not trigger on 0 or empty string. A truthiness or != null guard to narrow. And the non-null assertion as a last resort, which asserts rather than checks.',
        hi: 'Chhota karne ke liye optional chaining. Aisa default jo 0 ya khaali string pe na chale, uske liye nullish coalescing. Narrow karne ke liye truthiness ya != null guard. Aur aakhri sahara non-null assertion, jo jaanchta nahi, daava karta hai.',
      },
      code: `user?.address?.city
count ?? 10                      // ✓ 0 survives; || would replace it
if (x != null) { … }             // removes null AND undefined
el!.focus();                      // ✗ unchecked — use with a comment`,
    },
    {
      heading: { en: 'The escape hatch and its cost', hi: 'Bachne ka raasta aur uski keemat' },
      body: {
        en: 'The ! operator silences the error without verifying anything. It is an assertion, so a wrong one crashes at runtime with the compiler having said nothing. Treat every ! as needing a comment explaining the invariant that makes it safe.',
        hi: '! operator bina kuch jaanche error chup kara deta hai. Ye assertion hai, toh galat hone pe runtime pe crash hota hai aur compiler ne kuch kaha hi nahi tha. Har ! ko aisa maano jise ek comment chahiye jo wo niyam bataye jiske kaaran wo safe hai.',
      },
    },
    {
      heading: { en: 'The companion flag', hi: 'Saath wala flag' },
      body: {
        en: 'strictNullChecks does not cover index access. arr[10] is typed T even when the array has three elements. noUncheckedIndexedAccess fixes that by returning T | undefined — enable it and you close the last big hole.',
        hi: 'strictNullChecks index access cover nahi karta. arr[10] ka type T hi rehta hai chahe array mein teen hi elements hon. noUncheckedIndexedAccess isse T | undefined bana kar theek karta hai — isse chaalu karo aur aakhri bada chhed band ho jaata hai.',
      },
      code: `const arr = [1, 2, 3];
arr[10].toFixed();      // ✓ compiles without the flag  💥 crashes
                         // ✗ 'possibly undefined' with it`,
    },
  ],

  'What is the difference between the ?. and ! operators?': [
    {
      heading: { en: 'One checks, the other asserts', hi: 'Ek jaanchta hai, doosra daava karta hai' },
      body: {
        en: '?. is optional chaining: a real runtime check that short-circuits to undefined if the left side is null or undefined. ! is a non-null assertion: a compile-time claim that erases completely and checks nothing.',
        hi: '?. optional chaining hai: ek asli runtime jaanch jo baayin taraf null ya undefined hone pe undefined de kar ruk jaati hai. ! non-null assertion hai: ek compile-time daava jo poori tarah mit jaata hai aur kuch jaanchta nahi.',
      },
      code: `a?.b        // if (a == null) undefined else a.b     — runtime
a!.b        // a.b                                       — nothing added`,
    },
    {
      heading: { en: 'Look at the compiled output', hi: 'Compile hua output dekho' },
      body: {
        en: 'This settles the question immediately. Optional chaining emits a guard. The non-null assertion emits nothing at all — it is purely a message to the type checker.',
        hi: 'Isse sawaal turant hal ho jaata hai. Optional chaining ek guard banata hai. Non-null assertion kuch banata hi nahi — wo sirf type checker ke liye ek sandesh hai.',
      },
      diagram: `TypeScript        JavaScript output
a?.b              a === null || a === undefined ? undefined : a.b
a!.b              a.b`,
    },
    {
      heading: { en: 'Which means ! can crash and ?. cannot', hi: 'Matlab ! crash kar sakta hai, ?. nahi' },
      body: {
        en: 'If the value really is null, optional chaining hands you undefined and execution continues. The assertion lets the access happen and you get a TypeError, with the compiler having promised you it was fine.',
        hi: 'Agar value sach mein null hai, toh optional chaining undefined de deta hai aur code aage chalta rehta hai. Assertion access hone deta hai aur TypeError milta hai, jabki compiler ne vaada kiya tha ki sab theek hai.',
      },
      code: `const el = document.querySelector('#missing');
el?.focus();      // ✓ nothing happens
el!.focus();      // 💥 TypeError: Cannot read properties of null`,
    },
    {
      heading: { en: 'The three forms of optional chaining', hi: 'Optional chaining ke teen roop' },
      body: {
        en: 'Property access, computed access, and a call. The call form is genuinely useful — it invokes the function only if it exists, replacing a typeof check.',
        hi: 'Property access, computed access, aur call. Call wala roop sach mein kaam ka hai — wo function tabhi chalata hai jab wo maujood ho, ek typeof check ki jagah le kar.',
      },
      code: `obj?.prop
obj?.[key]        // note the dot before the bracket
fn?.()`,
    },
    {
      heading: { en: 'When ! is actually acceptable', hi: 'Kab ! sach mein theek hai' },
      body: {
        en: 'When an invariant guarantees the value but the compiler cannot see it — a ref read inside an effect that runs after mount, a map lookup you just populated, a value validated by a check TypeScript could not follow. Always with a comment saying why.',
        hi: 'Jab koi niyam value ki guarantee de par compiler dekh na sake — mount ke baad chalne wale effect mein padha gaya ref, abhi bhara hua map ka lookup, ya aisi jaanch se guzri value jise TypeScript follow nahi kar paaya. Hamesha ek comment ke saath jo wajah bataye.',
      },
      code: `useEffect(() => {
  ref.current!.focus();      // the effect runs after mount, so it exists
}, []);`,
    },
    {
      heading: { en: 'Do not use ?. everywhere either', hi: '?. ko bhi har jagah mat use karo' },
      body: {
        en: 'A chain full of question marks hides genuine bugs. If a value should always exist, silently producing undefined is worse than throwing — you lose the error at the point it happened and get a confusing failure later. Use ?. only where a value is legitimately optional.',
        hi: 'Sawaaliya nishaanon se bhari chain asli bugs chhupa deti hai. Agar koi value hamesha honi chahiye, toh chup-chaap undefined dena throw karne se bura hai — error apni jagah pe kho jaata hai aur baad mein uljhan bhari failure milti hai. ?. sirf wahan lo jahan value sach mein optional ho.',
      },
      code: `const name = user?.profile?.name ?? 'unknown';   // ✗ if user is required
const name = user.profile?.name ?? 'unknown';    // ✓ profile is optional`,
    },
  ],

  'How does TypeScript handle function parameter and return type variance?': [
    {
      heading: { en: 'Return types are covariant', hi: 'Return types covariant hain' },
      body: {
        en: 'A function may return a MORE specific type than declared. That is always safe: the caller expected an Animal and got a Dog, which still satisfies everything they might do with an Animal.',
        hi: 'Function bataye gaye type se ZYADA khaas type de sakta hai. Ye hamesha safe hai: caller ko Animal chahiye tha aur Dog mil gaya, jo wo sab kuch poora karta hai jo wo Animal ke saath karta.',
      },
      code: `type GetAnimal = () => Animal;
const getDog: GetAnimal = (): Dog => new Dog();    // ✓ Dog is an Animal`,
    },
    {
      heading: { en: 'Parameters should be contravariant', hi: 'Parameters contravariant hone chahiye' },
      body: {
        en: 'The sound rule is the opposite direction: a handler may accept a MORE general parameter than declared. A function that handles any Animal can safely stand in where a Dog handler was expected, because it copes with more.',
        hi: 'Sahi rule ulti disha mein hai: handler bataye gaye se ZYADA aam parameter le sakta hai. Jo function kisi bhi Animal ko sambhaale wo Dog handler ki jagah safely khada ho sakta hai, kyunki wo zyada sambhaal leta hai.',
      },
      diagram: `wanted:  (d: Dog) => void
given:   (a: Animal) => void      ✓ safe — accepts more

wanted:  (a: Animal) => void
given:   (d: Dog) => void          ✗ unsafe — would receive a Cat`,
    },
    {
      heading: { en: 'strictFunctionTypes enforces it — for function types', hi: 'strictFunctionTypes ise lagoo karta hai — function types pe' },
      body: {
        en: 'With the flag on, parameter positions are checked contravariantly, so the unsafe direction is an error. This is one of the flags strict turns on, and it is the reason the question is worth asking.',
        hi: 'Flag chaalu ho toh parameter ki jagah contravariantly jaanchi jaati hai, toh galat disha error hai. Ye un flags mein hai jo strict chaalu karta hai, aur isiliye ye sawaal poochhne laayak hai.',
      },
      code: `type Handler = (a: Animal) => void;
const h: Handler = (d: Dog) => d.bark();
// ✗ with strictFunctionTypes:
//   'Animal' is not assignable to 'Dog'`,
    },
    {
      heading: { en: 'Methods are bivariant, deliberately', hi: 'Methods jaan-boojh kar bivariant hain' },
      body: {
        en: 'This is the detail interviewers are testing. Method shorthand is checked BIVARIANTLY even under strictFunctionTypes — both directions are allowed. It is a deliberate unsoundness kept for compatibility, largely because of how arrays and the DOM are typed.',
        hi: 'Yahi wo detail hai jo interviewers jaanchte hain. Method shorthand strictFunctionTypes ke saath bhi BIVARIANTLY jaanchi jaati hai — dono dishayein allowed hain. Ye jaan-boojh kar rakhi gayi galti hai, compatibility ke liye, bade taur pe isliye ki arrays aur DOM kaise typed hain.',
      },
      code: `interface A { handle(a: Animal): void }      // method — bivariant ✓
interface B { handle: (a: Animal) => void }   // property — contravariant

const b: B = { handle: (d: Dog) => {} };      // ✗ caught
const a: A = { handle: (d: Dog) => {} };      // ✓ allowed, and unsound`,
    },
    {
      heading: { en: 'Arrays are covariant, and that is unsound too', hi: 'Arrays covariant hain, aur wo bhi galat hai' },
      body: {
        en: 'Dog[] is assignable to Animal[], which lets you push a Cat into an array that is really full of Dogs. TypeScript accepts this knowingly, because rejecting it would break an enormous amount of real code.',
        hi: 'Dog[] ko Animal[] mein daala ja sakta hai, jisse tum Cat ko us array mein push kar sakte ho jo asal mein Dogs se bhara hai. TypeScript ye jaan-boojh kar maanta hai, kyunki mana karne se bahut saara asli code toot jaata.',
      },
      code: `const dogs: Dog[] = [new Dog()];
const animals: Animal[] = dogs;   // ✓ allowed
animals.push(new Cat());           // 💥 dogs now contains a Cat`,
    },
    {
      heading: { en: 'Say the honest summary', hi: 'Imaandaar saaraansh kaho' },
      body: {
        en: '"Returns are covariant, parameters are contravariant under strictFunctionTypes, and methods stay bivariant on purpose for compatibility. Arrays are also covariant and unsound. TypeScript chose practicality over full soundness, and knowing exactly where those holes are is what matters."',
        hi: '"Returns covariant hain, strictFunctionTypes ke saath parameters contravariant hain, aur methods compatibility ke liye jaan-boojh kar bivariant rehte hain. Arrays bhi covariant hain aur galat. TypeScript ne poori shuddhta ke bajaye vyavharikta chuni, aur asli baat ye jaanna hai ki wo chhed kahan-kahan hain."',
      },
    },
  ],

  'What is declaration merging?': [
    {
      heading: { en: 'Two declarations of the same name become one', hi: 'Ek hi naam ke do declarations mil kar ek ban jaate hain' },
      body: {
        en: 'TypeScript combines multiple declarations that share a name into a single definition. Interfaces merge their members, namespaces merge their contents, and some declarations merge across the value and type namespaces.',
        hi: 'TypeScript ek hi naam wale kai declarations ko ek definition mein jod deta hai. Interfaces apne members jodte hain, namespaces apna saamaan, aur kuch declarations value aur type namespaces ke paar bhi judte hain.',
      },
      code: `interface User { name: string }
interface User { age: number }
// User is { name: string; age: number }`,
    },
    {
      heading: { en: 'Only interfaces and namespaces merge', hi: 'Sirf interfaces aur namespaces merge hote hain' },
      body: {
        en: 'A type alias declared twice is a duplicate identifier error. This is the single most practical difference between interface and type, and it is usually the reason the question is asked.',
        hi: 'Do baar declare kiya gaya type alias duplicate identifier error hai. Interface aur type ke beech sabse vyavharik farq yahi hai, aur aksar isi wajah se ye sawaal poochha jaata hai.',
      },
      code: `type A = { a: string };
type A = { b: number };      // ✗ Duplicate identifier 'A'`,
    },
    {
      heading: { en: 'Conflicting members are an error', hi: 'Takraate members error hain' },
      body: {
        en: 'Merging is additive, not overriding. If two declarations give the same property different types, TypeScript rejects it — so a merge can add to a shape but never silently change it.',
        hi: 'Merging jodti hai, badalti nahi. Agar do declarations ek hi property ko alag types dein, TypeScript mana kar deta hai — toh merge shakl mein jod sakta hai par usse chup-chaap badal nahi sakta.',
      },
      code: `interface A { x: string }
interface A { x: number }    // ✗ Subsequent property declarations must
                              //   have the same type`,
    },
    {
      heading: { en: 'The main real use: augmenting a library', hi: 'Asli mukhya upyog: kisi library ko badhana' },
      body: {
        en: 'This is why the feature exists. You can add a property to a type declared in a library you do not control — Window, Express Request, the theme in a styling library — without forking or casting.',
        hi: 'Feature isi liye hai. Tum kisi aisi library ke type mein property jod sakte ho jo tumhare control mein nahi — Window, Express ka Request, kisi styling library ka theme — bina fork ya cast kiye.',
      },
      code: `declare global {
  interface Window { myApp: App }
}
window.myApp;      // ✓ typed, no cast

declare module 'express' {
  interface Request { user?: User }
}`,
    },
    {
      heading: { en: 'Namespace merging with functions and classes', hi: 'Functions aur classes ke saath namespace merging' },
      body: {
        en: 'A namespace can merge with a function or a class of the same name, which is how you attach static properties with types. This is how older libraries typed things like a function that also has methods hanging off it.',
        hi: 'Namespace usi naam ke function ya class ke saath merge ho sakta hai, aur aise hi tum static properties ko type ke saath jodte ho. Purani libraries aise hi un cheezon ko type karti thi jaise koi function jispe methods bhi tange hon.',
      },
      code: `function greet(name: string) {}
namespace greet {
  export const defaultName = 'guest';
}
greet.defaultName;     // ✓ typed`,
    },
    {
      heading: { en: 'Module augmentation needs an import', hi: 'Module augmentation ko import chahiye' },
      body: {
        en: 'A common gotcha. In a file with no top-level import or export, declare module creates a NEW ambient module instead of augmenting the existing one. Add an import to make the file a module and the augmentation works.',
        hi: 'Ek aam jaal. Jis file mein top-level import ya export na ho, wahan declare module maujooda ko badhaane ki jagah NAYA ambient module bana deta hai. Ek import jodo taaki file module ban jaaye, aur augmentation chalne lagta hai.',
      },
      code: `import 'express';               // ✓ makes this file a module

declare module 'express' {
  interface Request { user?: User }
}`,
    },
    {
      heading: { en: 'Use it sparingly', hi: 'Isse kam use karo' },
      body: {
        en: 'Merging is invisible at the point of use — a reader sees a property with no idea which file added it. It is the right tool for augmenting third-party types, and the wrong tool for organising your own, where an explicit extends is clearer.',
        hi: 'Merging upyog ki jagah dikhti nahi — padhne wale ko property dikhti hai par pata nahi chalta kis file ne jodi. Third-party types badhane ke liye ye sahi auzaar hai, aur apne types sambhalne ke liye galat, jahan saaf extends behtar hai.',
      },
    },
  ],

  'What are declaration files and what is DefinitelyTyped?': [
    {
      heading: { en: 'A .d.ts file describes types without any implementation', hi: '.d.ts file bina implementation ke types bataati hai' },
      body: {
        en: 'A declaration file contains type information only — no runtime code is emitted from it and none can be. It tells TypeScript the shape of JavaScript that exists somewhere else.',
        hi: 'Declaration file mein sirf type ki jaankari hoti hai — usse koi runtime code nahi banta aur na ban sakta hai. Wo TypeScript ko bataati hai ki kahin aur maujood JavaScript ki shakl kya hai.',
      },
      code: `// math.d.ts
export declare function add(a: number, b: number): number;
export declare const VERSION: string;`,
    },
    {
      heading: { en: 'Why they exist', hi: 'Ye kyun hain' },
      body: {
        en: 'Most of npm is plain JavaScript with no type information. A declaration file lets you use such a package with full checking and autocomplete, without rewriting it. It is also what tsc emits so consumers of YOUR package get types.',
        hi: 'npm ka zyadatar hissa saada JavaScript hai jisme type ki jaankari nahi. Declaration file tumhe aisa package poori jaanch aur autocomplete ke saath use karne deti hai, bina usse dobara likhe. tsc bhi yahi nikaalta hai taaki TUMHARE package ke users ko types milein.',
      },
      code: `{ "compilerOptions": { "declaration": true } }
// index.ts  →  index.js + index.d.ts`,
    },
    {
      heading: { en: 'DefinitelyTyped is the community repository', hi: 'DefinitelyTyped community ka repository hai' },
      body: {
        en: 'A single enormous GitHub repo holding declaration files for thousands of untyped packages. Each one is published to npm under the @types scope, which is why you install @types/lodash rather than getting types from lodash itself.',
        hi: 'Ek bahut bada GitHub repo jisme hazaaron bina-type wale packages ki declaration files hain. Har ek npm pe @types scope ke neeche publish hoti hai, isiliye tum @types/lodash install karte ho, lodash se hi types nahi milte.',
      },
      code: `npm i -D @types/lodash @types/node @types/express`,
    },
    {
      heading: { en: 'How TypeScript finds them', hi: 'TypeScript inhe kaise dhoondhta hai' },
      body: {
        en: 'It looks at the types or typings field in the package\'s own package.json first. If there is none, it checks node_modules/@types. Modern packages ship their own declarations, so no @types install is needed.',
        hi: 'Wo pehle package ke apne package.json mein types ya typings field dekhta hai. Wo na ho toh node_modules/@types dekhta hai. Modern packages apni declarations khud dete hain, toh @types install karne ki zaroorat nahi.',
      },
    },
    {
      heading: { en: 'Writing one for a package with no types', hi: 'Bina types wale package ke liye ek likhna' },
      body: {
        en: 'Create a .d.ts in your project and declare the module. The quick version types it as any to silence the error; the useful version describes only the parts you actually call.',
        hi: 'Apne project mein ek .d.ts banao aur module declare karo. Jaldi wala roop usse any bana kar error chup kara deta hai; kaam ka roop sirf un hisson ko bataata hai jinhe tum sach mein bulaate ho.',
      },
      code: `// types/untyped-lib.d.ts
declare module 'untyped-lib';                    // quick: everything is any

declare module 'untyped-lib' {                    // better
  export function doThing(x: string): number;
}`,
    },
    {
      heading: { en: 'And for non-code imports', hi: 'Aur non-code imports ke liye' },
      body: {
        en: 'A bundler may let you import a CSS file or an SVG, but TypeScript does not know that. A wildcard module declaration teaches it, and this is the fix for the error every new project hits once.',
        hi: 'Bundler tumhe CSS file ya SVG import karne de sakta hai, par TypeScript ko ye pata nahi. Wildcard module declaration usse sikha deti hai, aur har naye project mein ek baar aane wale us error ka ilaaj yahi hai.',
      },
      code: `declare module '*.svg' {
  const content: string;
  export default content;
}`,
    },
    {
      heading: { en: 'Two things to warn about', hi: 'Do cheezein jinki chetavni deni hai' },
      body: {
        en: 'An @types package version can drift from the library version, so a mismatch produces types that describe an API that no longer exists. And a hand-written declaration is an unverified assertion — nothing checks it against the real implementation.',
        hi: '@types package ka version library ke version se alag ho sakta hai, toh mismatch aise types deta hai jo ab maujood hi nahi API bataate hain. Aur haath se likhi declaration ek bina jaancha daava hai — usse asli implementation se koi nahi milaata.',
      },
    },
  ],

  'What is the difference between compile-time and runtime in TypeScript?': [
    {
      heading: { en: 'Types are erased — completely', hi: 'Types mit jaate hain — poori tarah' },
      body: {
        en: 'This is the most important idea in TypeScript and the one that explains most confusion. The compiler checks your types and then deletes every one of them. The JavaScript that runs has no idea any of it existed.',
        hi: 'TypeScript ka sabse zaroori vichaar yahi hai aur zyadatar uljhan isi se samajh aati hai. Compiler tumhare types jaanchta hai aur phir har ek ko mita deta hai. Jo JavaScript chalti hai usse pata bhi nahi ki ye sab tha.',
      },
      code: `// TypeScript
interface User { name: string }
const u: User = { name: 'Asha' };
function f(x: number): string { return String(x); }

// emitted JavaScript
const u = { name: 'Asha' };
function f(x) { return String(x); }`,
    },
    {
      heading: { en: 'Which means you cannot check a type at runtime', hi: 'Matlab runtime pe type jaanch nahi sakte' },
      body: {
        en: 'There is nothing left to check against. An interface does not exist as a value, so instanceof on one is a syntax error and there is no way to ask "is this a User".',
        hi: 'Jaanchne ko kuch bacha hi nahi. Interface value ke roop mein hai hi nahi, toh uspe instanceof syntax error hai aur "kya ye User hai" poochhne ka koi tareeka nahi.',
      },
      code: `if (x instanceof User) {}      // ✗ 'User' only refers to a type
typeof x === 'User';            // ✗ meaningless`,
    },
    {
      heading: { en: 'So every external boundary is unchecked', hi: 'Toh har bahari boundary bina jaanchi hai' },
      body: {
        en: 'An annotation on an API response, a JSON.parse, localStorage or a URL parameter is an assertion, not a guarantee. The server can send anything and TypeScript will have said nothing. This is the practical consequence people underestimate.',
        hi: 'API response, JSON.parse, localStorage ya URL parameter pe annotation ek daava hai, guarantee nahi. Server kuch bhi bhej sakta hai aur TypeScript ne kuch kaha hi nahi hoga. Ye wo vyavharik nateeja hai jise log kam aankte hain.',
      },
      code: `const user = JSON.parse(str) as User;   // ✗ nothing verified
const user = UserSchema.parse(JSON.parse(str));   // ✓ checked at runtime`,
    },
    {
      heading: { en: 'The few things that DO emit code', hi: 'Wo kuch cheezein jo code BANATI hain' },
      body: {
        en: 'Not everything is erased. A regular enum, a namespace with runtime members, a class with parameter properties, and decorators all produce JavaScript. Everything else — types, interfaces, generics, as, satisfies — vanishes.',
        hi: 'Sab kuch nahi mitta. Aam enum, runtime members wala namespace, parameter properties wali class, aur decorators — sab JavaScript banate hain. Baaki sab — types, interfaces, generics, as, satisfies — gaayab ho jaate hain.',
      },
      code: `enum E { A }              // emits an object
const enum CE { A }        // inlined, emits nothing
class C { constructor(public x: number) {} }   // emits this.x = x`,
    },
    {
      heading: { en: 'Generics have no runtime identity either', hi: 'Generics ki bhi runtime pe koi pehchaan nahi' },
      body: {
        en: 'Unlike some languages, there is no reification. Inside a generic function you cannot ask what T is, and you cannot create a T. If you need that, pass a value — a constructor, a factory, or a schema.',
        hi: 'Kuch languages ke ulat, yahan reification nahi hai. Generic function ke andar tum ye nahi pooch sakte ki T kya hai, aur na hi T bana sakte ho. Zaroorat ho toh koi value pass karo — constructor, factory, ya schema.',
      },
      code: `function make<T>(): T { return new T(); }        // ✗ impossible
function make<T>(Ctor: new () => T): T { return new Ctor(); }   // ✓`,
    },
    {
      heading: { en: 'How to state it', hi: 'Ise kaise kehna hai' },
      body: {
        en: '"TypeScript is a compile-time tool. Every type is erased, so nothing you write in the type system protects you at runtime. Anywhere data crosses a boundary — the network, storage, the URL — you need an actual runtime check, and I use a schema validator for that."',
        hi: '"TypeScript ek compile-time auzaar hai. Har type mit jaata hai, toh type system mein likhi koi cheez runtime pe nahi bachaati. Jahan bhi data koi boundary paar kare — network, storage, URL — wahan asli runtime jaanch chahiye, aur main uske liye schema validator use karta hoon."',
      },
    },
  ],

  'What is an enum in TypeScript and why do some teams avoid it?': [
    {
      heading: { en: 'A named set of constants that exists at runtime', hi: 'Naam wale constants ka samooh jo runtime pe hota hai' },
      body: {
        en: 'Unlike almost everything else in TypeScript, a regular enum is not erased. It compiles to a real JavaScript object, which is both its main feature and the source of every objection to it.',
        hi: 'TypeScript ki lagbhag har cheez ke ulat, aam enum mitta nahi. Wo ek asli JavaScript object mein compile hota hai, jo iska mukhya feature bhi hai aur har aitraaz ki jad bhi.',
      },
      code: `enum Direction { Up, Down }

// emits:
var Direction;
(function (Direction) {
  Direction[Direction["Up"] = 0] = "Up";
  Direction[Direction["Down"] = 1] = "Down";
})(Direction || (Direction = {}));`,
    },
    {
      heading: { en: 'Numeric enums are the worst of them', hi: 'Numeric enums sabse kharaab hain' },
      body: {
        en: 'They default to 0, 1, 2 and are reverse-mapped, so the object contains both directions. Worse, any number is assignable to a numeric enum in older versions, and the value is meaningless if it is ever serialised or stored.',
        hi: 'Ye default se 0, 1, 2 hote hain aur reverse-mapped hote hain, toh object mein dono dishayein hoti hain. Isse bura, purane versions mein koi bhi number numeric enum mein daala ja sakta hai, aur agar wo kabhi serialise ya store ho toh value ka koi matlab nahi.',
      },
      code: `Direction[0];        // 'Up'  — reverse mapping bloats the output
const d: Direction = 99;   // ✓ in older TypeScript`,
    },
    {
      heading: { en: 'Objection one: it is not tree-shakeable', hi: 'Aitraaz ek: ye tree-shakeable nahi hai' },
      body: {
        en: 'The IIFE the compiler emits has a side effect, so bundlers cannot prove it is unused and cannot remove it. In a library that ships many enums this is real, measurable dead weight.',
        hi: 'Compiler jo IIFE banata hai uska side effect hai, toh bundlers ye saabit nahi kar sakte ki wo bekaar hai aur usse hata nahi sakte. Jis library mein kai enums hon wahan ye asli, naapne laayak bojh hai.',
      },
    },
    {
      heading: { en: 'Objection two: it breaks isolatedModules', hi: 'Aitraaz do: ye isolatedModules todta hai' },
      body: {
        en: 'Transpilers that compile one file at a time — esbuild, SWC, Babel — cannot handle a const enum, because inlining needs whole-program knowledge. Since most modern toolchains use one of those, const enum is effectively off the table.',
        hi: 'Jo transpilers ek time pe ek file compile karte hain — esbuild, SWC, Babel — wo const enum nahi sambhaal sakte, kyunki inlining ke liye poore program ka gyaan chahiye. Modern toolchains mein zyadatar inhi mein se ek hai, toh const enum practically bahar hai.',
      },
    },
    {
      heading: { en: 'Objection three: it is nominal in a structural language', hi: 'Aitraaz teen: structural language mein ye nominal hai' },
      body: {
        en: 'A string enum member is not assignable from a plain string with the same value, which is inconsistent with how the rest of TypeScript works and makes enums awkward at API boundaries where you receive plain strings.',
        hi: 'String enum ka member usi value wali saadi string se assign nahi hota, jo TypeScript ke baaki hisse se mel nahi khaata aur enums ko un API boundaries pe bhadda bana deta hai jahan saadi strings aati hain.',
      },
      code: `enum Status { Active = 'active' }
const s: Status = 'active';      // ✗ not assignable`,
    },
    {
      heading: { en: 'The alternative most teams use', hi: 'Zyadatar teams ka vikalp' },
      body: {
        en: 'An as const object plus a derived union type. You get the same grouping and autocomplete, plain strings are assignable, it tree-shakes, it works with every transpiler, and it serialises to something readable.',
        hi: 'Ek as const object aur usse nikla union type. Wahi grouping aur autocomplete milta hai, saadi strings assign hoti hain, ye tree-shake hota hai, har transpiler ke saath chalta hai, aur padhne laayak roop mein serialise hota hai.',
      },
      code: `const Status = { Active: 'active', Done: 'done' } as const;
type Status = (typeof Status)[keyof typeof Status];   // 'active' | 'done'

const s: Status = 'active';      // ✓ plain strings work
Status.Active;                    // ✓ autocomplete still works`,
    },
    {
      heading: { en: 'When an enum is still fine', hi: 'Enum kab abhi bhi theek hai' },
      body: {
        en: 'A string enum in application code that never crosses a serialisation boundary is perfectly workable, and consistency with an existing codebase matters more than the theory. Say that — an absolutist answer reads worse than a considered one.',
        hi: 'Application code mein string enum jo kabhi serialisation boundary paar na kare, bilkul chal jaata hai, aur maujooda codebase se mel khaana siddhant se zyada maayne rakhta hai. Ye kaho — ek-tarfa jawab soche-samjhe jawab se kharaab padha jaata hai.',
      },
    },
  ],

  'What is the satisfies operator?': [
    {
      heading: { en: 'Check a value against a type without changing its type', hi: 'Value ko type se jaancho, uska type badle bina' },
      body: {
        en: 'satisfies validates that an expression conforms to a type while keeping the narrow type TypeScript inferred. An annotation does the check too, but it REPLACES the inferred type with the broader one — and that is the difference the operator exists for.',
        hi: 'satisfies jaanchta hai ki koi expression kisi type se mel khaata hai, aur TypeScript ka nikaala hua tang type bhi bachaa leta hai. Annotation bhi jaanch karta hai, par wo nikaale hue type ko chaude type se BADAL deta hai — aur isi farq ke liye ye operator hai.',
      },
      code: `const config = { url: 'x', port: 3000 } satisfies Config;`,
    },
    {
      heading: { en: 'The problem it solves', hi: 'Ye kaunsi problem hal karta hai' },
      body: {
        en: 'Before satisfies you had to choose. Annotate and you get checking but lose the specific keys and literal types. Leave it off and you keep the precision but get no checking at all. satisfies gives you both.',
        hi: 'satisfies se pehle chunna padta tha. Annotate karo toh jaanch milti hai par khaas keys aur literal types kho jaate hain. Chhod do toh theek-theek type bachta hai par jaanch bilkul nahi hoti. satisfies dono deta hai.',
      },
      code: `const a: Record<string, string> = { url: 'x' };
a.url;        // string — but TypeScript forgot the key even exists
a.nope;       // ✓ no error, and it is undefined at runtime

const b = { url: 'x' } satisfies Record<string, string>;
b.url;        // ✓ string
b.nope;       // ✗ correctly rejected`,
    },
    {
      heading: { en: 'It preserves literal types', hi: 'Ye literal types bachaa leta hai' },
      body: {
        en: 'This is the most common reason to reach for it. An annotation widens a literal to its base type; satisfies keeps the literal, so you can still narrow on it afterwards.',
        hi: 'Isse uthane ki sabse aam wajah yahi hai. Annotation literal ko uske aam type mein chauda kar deta hai; satisfies literal bachaa leta hai, toh tum baad mein bhi uspe narrow kar sakte ho.',
      },
      code: `type Shape = { kind: string; r: number };

const a: Shape = { kind: 'circle', r: 1 };
a.kind;      // string

const b = { kind: 'circle', r: 1 } satisfies Shape;
b.kind;      // 'circle'  ✓ literal preserved`,
    },
    {
      heading: { en: 'It catches missing and extra keys', hi: 'Ye chhooti hui aur extra keys pakadta hai' },
      body: {
        en: 'The checking half is real. A missing required property is an error, and an unknown property is rejected — you get the safety of an annotation without paying for it in precision.',
        hi: 'Jaanch wala hissa asli hai. Koi zaroori property chhoot jaaye toh error, aur anjaan property mana ho jaati hai — annotation wali suraksha milti hai bina theek-theek type ki keemat diye.',
      },
      code: `const c = { url: 'x' } satisfies Config;
// ✗ Property 'port' is missing

const d = { url: 'x', port: 1, extra: true } satisfies Config;
// ✗ 'extra' does not exist in type 'Config'`,
    },
    {
      heading: { en: 'It is not a type assertion', hi: 'Ye type assertion nahi hai' },
      body: {
        en: 'An important distinction. as tells the compiler to stop checking and trust you; satisfies asks the compiler to check and then get out of the way. One weakens safety, the other strengthens it.',
        hi: 'Ek zaroori farq. as compiler se kehta hai jaanchna band karo aur mujhpe bharosa karo; satisfies compiler se kehta hai jaancho aur phir raaste se hat jao. Ek suraksha kamzor karta hai, doosra mazboot.',
      },
      code: `const a = { url: 1 } as Config;          // ✗ unsafe, no error reported
const b = { url: 1 } satisfies Config;    // ✗ correctly rejected`,
    },
    {
      heading: { en: 'Where you will use it', hi: 'Tum ise kahan use karoge' },
      body: {
        en: 'Configuration objects, route tables, theme definitions, and any lookup where you want both the exact keys and a guarantee the shape is right. It arrived in TypeScript 4.9 and has quietly become the default for these cases.',
        hi: 'Configuration objects, route tables, theme definitions, aur har wo lookup jahan theek keys bhi chahiye aur shakl sahi hone ki guarantee bhi. Ye TypeScript 4.9 mein aaya aur in cases ke liye chup-chaap default ban gaya hai.',
      },
      code: `const routes = {
  home: '/',
  about: '/about',
} satisfies Record<string, \`/\${string}\`>;

type Route = keyof typeof routes;     // 'home' | 'about' ✓ still exact`,
    },
  ],

  /* ─── TypeScript in practice ──────────────────────────────── */

  'How do you type React props and hooks?': [
    {
      heading: { en: 'Props: an inline type or a named one', hi: 'Props: inline type ya naam wala' },
      body: {
        en: 'Type the destructured parameter directly. Use a named type or interface once the shape grows or is exported. Do not reach for React.FC — it adds an implicit children prop and gives nothing back.',
        hi: 'Destructure kiye parameter ko seedha type do. Shakl badhe ya export honi ho toh naam wala type ya interface lo. React.FC mat uthao — wo chup-chaap children prop jodta hai aur badle mein kuch nahi deta.',
      },
      code: `function Button({ label, onClick }: { label: string; onClick(): void }) {}

interface Props { label: string; variant?: 'primary' | 'ghost' }
function Button({ label, variant = 'primary' }: Props) {}

const Button: React.FC<Props> = …    // ✗ avoid`,
    },
    {
      heading: { en: 'children and the DOM prop types', hi: 'children aur DOM prop types' },
      body: {
        en: 'ReactNode for anything renderable. ComponentProps to reuse the props of an element or another component, which is how you build a wrapper without listing forty attributes by hand.',
        hi: 'Jo bhi render ho sake uske liye ReactNode. Kisi element ya doosre component ke props dobara use karne ke liye ComponentProps, aur aise hi tum chalees attributes haath se likhe bina wrapper banate ho.',
      },
      code: `interface Props {
  children: React.ReactNode;
}

type ButtonProps = React.ComponentProps<'button'> & { variant?: 'primary' };
function Button({ variant, ...rest }: ButtonProps) {
  return <button {...rest} />;      // ✓ every native attribute typed
}`,
    },
    {
      heading: { en: 'useState: let it infer, except when it cannot', hi: 'useState: infer hone do, sivaay jab na ho sake' },
      body: {
        en: 'An initial value is usually enough. Annotate when the initial value does not represent the full type — the classic case being null now and an object later, which infers as null and then rejects everything.',
        hi: 'Shuruaati value aam taur pe kaafi hai. Tab annotate karo jab shuruaati value poora type na bataye — classic case abhi null aur baad mein object, jo null infer hota hai aur phir sab kuch mana kar deta hai.',
      },
      code: `const [count, setCount] = useState(0);              // number ✓
const [user, setUser] = useState<User | null>(null);  // ✓ needed
const [items, setItems] = useState<Item[]>([]);        // ✓ never[] otherwise`,
    },
    {
      heading: { en: 'useRef has two distinct forms', hi: 'useRef ke do alag roop hain' },
      body: {
        en: 'A DOM ref is initialised with null and React sets it, so the type includes null and the property is readonly. A mutable value ref is initialised with the value itself and current is writable. Getting these the wrong way round is the most common ref typing error.',
        hi: 'DOM ref null se shuru hota hai aur React usse set karta hai, toh type mein null hai aur property readonly. Mutable value wala ref khud value se shuru hota hai aur uska current likha ja sakta hai. Inhe ulta kar dena ref typing ki sabse aam galti hai.',
      },
      code: `const input = useRef<HTMLInputElement>(null);   // DOM — readonly, nullable
input.current?.focus();

const timer = useRef<number | null>(null);       // mutable — writable
timer.current = window.setInterval(tick, 1000);`,
    },
    {
      heading: { en: 'Events and handlers', hi: 'Events aur handlers' },
      body: {
        en: 'Inline handlers get their event type from context and need no annotation. Only extracted handlers do, and then you use the specific React synthetic event type with the element as its parameter.',
        hi: 'Inline handlers ko event ka type context se milta hai aur annotation nahi chahiye. Sirf alag nikaale gaye handlers ko chahiye, aur tab tum us khaas React synthetic event type ko element ke saath use karte ho.',
      },
      code: `<input onChange={(e) => setV(e.target.value)} />     // ✓ inferred

function onChange(e: React.ChangeEvent<HTMLInputElement>) {}
function onClick(e: React.MouseEvent<HTMLButtonElement>) {}
function onSubmit(e: React.FormEvent<HTMLFormElement>) {}`,
    },
    {
      heading: { en: 'useReducer and Context', hi: 'useReducer aur Context' },
      body: {
        en: 'Type the state and make the action a discriminated union — then the reducer narrows per case and exhaustiveness checking tells you when you add a new action. For context, either allow null and assert in a custom hook, or provide a real default.',
        hi: 'State ko type do aur action ko discriminated union banao — phir reducer har case pe narrow karta hai aur exhaustiveness checking batati hai ki naya action kab joda. Context ke liye ya toh null allow karo aur custom hook mein assert karo, ya asli default do.',
      },
      code: `type Action = { type: 'inc' } | { type: 'set'; value: number };
function reducer(state: State, action: Action): State { … }

const Ctx = createContext<Store | null>(null);
export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore must be used inside a provider');
  return v;                       // ✓ non-null from here on
}`,
    },
    {
      heading: { en: 'Generic components', hi: 'Generic components' },
      body: {
        en: 'A list or table component should be generic so the item type flows through to the render callback. Write it as a plain function with a type parameter — this is another reason React.FC gets in the way.',
        hi: 'List ya table component generic hona chahiye taaki item ka type render callback tak pahunche. Usse ek saade function ki tarah type parameter ke saath likho — React.FC ke raaste mein aane ki ek aur wajah yahi hai.',
      },
      code: `function List<T>({ items, render }: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return <ul>{items.map((i) => <li>{render(i)}</li>)}</ul>;
}

<List items={users} render={(u) => u.name} />   // ✓ u is User`,
    },
  ],

  'How do you migrate a JavaScript codebase to TypeScript?': [
    {
      heading: { en: 'Incrementally, never all at once', hi: 'Dhire-dhire, kabhi ek saath nahi' },
      body: {
        en: 'A big-bang rewrite produces thousands of errors nobody can review and blocks feature work for weeks. The whole answer is a sequence of small steps where the codebase compiles and ships at every point.',
        hi: 'Ek saath poora badalna hazaaron aise errors deta hai jinhe koi review nahi kar sakta aur hafton feature ka kaam rok deta hai. Poora jawab chhote kadamon ka ek kram hai jahan har mod pe codebase compile hota aur ship hota rahe.',
      },
    },
    {
      heading: { en: 'Step one: compile JavaScript with no strictness', hi: 'Pehla kadam: bina sakhti ke JavaScript compile karo' },
      body: {
        en: 'Add TypeScript and a tsconfig with allowJs and checkJs off, strict off. Nothing is type-checked yet, but the build pipeline now runs through tsc — which is the part that actually takes time to get right.',
        hi: 'TypeScript aur ek tsconfig jodo jisme allowJs ho aur checkJs band, strict band. Abhi kuch type-check nahi hota, par build pipeline ab tsc se guzarti hai — aur asal mein isse theek karne mein hi samay lagta hai.',
      },
      code: `{ "compilerOptions": {
    "allowJs": true, "checkJs": false, "strict": false,
    "outDir": "dist", "target": "ES2022", "module": "ESNext" } }`,
    },
    {
      heading: { en: 'Step two: install types for dependencies', hi: 'Doosra kadam: dependencies ke types install karo' },
      body: {
        en: 'Add @types packages for everything that does not ship its own. Doing this early means the errors you see later are about your code, not about untyped libraries, which keeps the signal high.',
        hi: 'Jo apne types nahi dete unke liye @types packages jodo. Ye jaldi karne se baad mein dikhne wale errors tumhare code ke baare mein honge, bina-type wali libraries ke baare mein nahi, jisse asli baat saaf rehti hai.',
      },
      code: `npm i -D typescript @types/node @types/react @types/express`,
    },
    {
      heading: { en: 'Step three: rename files, leaf-first', hi: 'Teesra kadam: files rename karo, patton se shuru' },
      body: {
        en: 'Convert modules with no internal dependencies first — utilities, constants, pure helpers. Working upward from the leaves means each file you convert already has typed dependencies, so you are never guessing.',
        hi: 'Pehle un modules ko badlo jinki andar koi dependency nahi — utilities, constants, pure helpers. Patton se upar chalne ka matlab hai ki har badli hui file ki dependencies pehle se typed hain, toh andaaza kabhi nahi lagana padta.',
      },
    },
    {
      heading: { en: 'Step four: turn on the strict flags one at a time', hi: 'Chautha kadam: strict flags ek-ek karke chaalu karo' },
      body: {
        en: 'noImplicitAny first — it produces the most errors but each is a genuine hole. Then strictNullChecks, which is the largest and highest-value wave. Then the rest. Fix each wave completely before enabling the next.',
        hi: 'Pehle noImplicitAny — isse sabse zyada errors aate hain par har ek asli chhed hai. Phir strictNullChecks, jo sabse badi aur sabse keemti lehar hai. Phir baaki. Har lehar poori theek karke agla chaalu karo.',
      },
      code: `// enable individually rather than "strict": true
{ "noImplicitAny": true }
{ "noImplicitAny": true, "strictNullChecks": true }`,
    },
    {
      heading: { en: 'Use the escape hatches deliberately', hi: 'Bachne ke raaste soch kar use karo' },
      body: {
        en: 'ts-expect-error with a comment is far better than any, because it errors once the underlying problem is fixed and forces you to remove it. Track the count as a metric that should only go down.',
        hi: 'Comment ke saath ts-expect-error, any se kahin behtar hai, kyunki andar ki problem theek hote hi wo error deta hai aur tumse hataata hai. Uski ginti ko ek aisa metric maano jo sirf kam hona chahiye.',
      },
      code: `// @ts-expect-error legacy shim, remove after the API v2 migration
legacyCall(x);

// ✗ silent and permanent
const x: any = legacyCall(y);`,
    },
    {
      heading: { en: 'Type the boundaries before the internals', hi: 'Andar se pehle boundaries type karo' },
      body: {
        en: 'The highest-value types are on API responses, database rows and function signatures at module edges. Internal implementation details can stay inferred. This gets you most of the benefit for a fraction of the work.',
        hi: 'Sabse keemti types API responses, database rows aur module ke kinaaron pe function signatures pe hain. Andar ke implementation ke details infer hote reh sakte hain. Isse thode kaam mein zyadatar fayda mil jaata hai.',
      },
    },
    {
      heading: { en: 'And enforce a ratchet', hi: 'Aur ek ratchet lagao' },
      body: {
        en: 'Whatever you do, stop the situation getting worse. A lint rule banning new any, a CI check that the ts-expect-error count did not increase, and strict on for all new files. Without a ratchet, a migration stalls halfway and stays there.',
        hi: 'Jo bhi karo, haalat aur bigadne mat do. Naye any ko rokne wala lint rule, ek CI check ki ts-expect-error ki ginti badhi nahi, aur har nayi file pe strict chaalu. Ratchet ke bina migration aadhe raaste ruk jaata hai aur wahin pada rehta hai.',
      },
    },
  ],

  'What is the difference between esModuleInterop and allowSyntheticDefaultImports?': [
    {
      heading: { en: 'One changes the emitted code, one only changes type checking', hi: 'Ek nikla hua code badalta hai, doosra sirf type checking' },
      body: {
        en: 'That is the whole answer. allowSyntheticDefaultImports tells the type checker to pretend a default export exists. esModuleInterop does that AND emits helper code so the import actually works at runtime.',
        hi: 'Poora jawab yahi hai. allowSyntheticDefaultImports type checker se kehta hai ki maan lo default export hai. esModuleInterop wo bhi karta hai AUR helper code bhi nikaalta hai taaki import runtime pe sach mein chale.',
      },
      diagram: `allowSyntheticDefaultImports   type check only   — may crash at runtime
esModuleInterop                type check + emit  — actually works`,
    },
    {
      heading: { en: 'The problem they exist for', hi: 'Ye kis problem ke liye hain' },
      body: {
        en: 'A CommonJS module assigns to module.exports and has no default export. ES module syntax expects one. Without interop, importing such a package the natural way fails to type-check and often fails at runtime too.',
        hi: 'CommonJS module module.exports mein assign karta hai aur uska default export hota hi nahi. ES module syntax ek default maangta hai. Interop ke bina aise package ko seedha import karna type-check mein fail hota hai aur aksar runtime pe bhi.',
      },
      code: `import express from 'express';
// ✗ Module has no default export

import * as express from 'express';
express();       // ✗ a namespace object is not callable`,
    },
    {
      heading: { en: 'What esModuleInterop emits', hi: 'esModuleInterop kya nikaalta hai' },
      body: {
        en: 'Two helpers. __importDefault wraps a CommonJS export so a default import resolves to module.exports. __importStar builds a proper namespace object. Both are inserted into the output, which is why this flag fixes the runtime behaviour too.',
        hi: 'Do helpers. __importDefault CommonJS export ko lapetta hai taaki default import module.exports pe pahunche. __importStar ek theek namespace object banata hai. Dono output mein daale jaate hain, isiliye ye flag runtime ka behaviour bhi theek karta hai.',
      },
      code: `// with esModuleInterop
const express_1 = __importDefault(require('express'));
express_1.default();`,
    },
    {
      heading: { en: 'It also forbids calling a namespace', hi: 'Ye namespace ko call karne se bhi rokta hai' },
      body: {
        en: 'A useful correctness improvement people forget. With the flag on, import * gives you a real namespace object, which is not callable — matching the ES module specification. Code that relied on calling a star import must switch to a default import.',
        hi: 'Ek kaam ka sudhaar jo log bhool jaate hain. Flag chaalu ho toh import * ek asli namespace object deta hai, jo callable nahi hai — bilkul ES module specification jaisa. Jo code star import ko call karta tha use default import pe aana padega.',
      },
    },
    {
      heading: { en: 'esModuleInterop implies the other', hi: 'esModuleInterop doosre ko apne aap chaalu karta hai' },
      body: {
        en: 'Turning on esModuleInterop enables allowSyntheticDefaultImports automatically, so you never need both. Setting only allowSyntheticDefaultImports is the dangerous combination — the types say the import is fine and it still fails at runtime.',
        hi: 'esModuleInterop chaalu karne se allowSyntheticDefaultImports apne aap chaalu ho jaata hai, toh dono ki kabhi zaroorat nahi. Sirf allowSyntheticDefaultImports lagana khatarnak jodi hai — types kehte hain import theek hai aur wo phir bhi runtime pe fail hota hai.',
      },
    },
    {
      heading: { en: 'When you would use the type-only flag alone', hi: 'Sirf type wala flag kab akela use karoge' },
      body: {
        en: 'When something other than tsc does the emit — Babel, esbuild or a bundler — and that tool already handles interop. Then you only need TypeScript to agree with what the bundler will produce, not to emit helpers of its own.',
        hi: 'Jab tsc ke alawa koi aur output banaye — Babel, esbuild ya koi bundler — aur wo tool interop pehle se sambhaal leta ho. Tab tumhe sirf ye chahiye ki TypeScript bundler ke banaye hue se sehmat ho, apne helpers na nikaale.',
      },
    },
    {
      heading: { en: 'The recommendation', hi: 'Salaah' },
      body: {
        en: 'Turn on esModuleInterop. It is the default in every modern template, it matches what bundlers do, and the small emitted helper is a trivial cost. Add verbatimModuleSyntax if you want TypeScript to leave your import statements exactly as written.',
        hi: 'esModuleInterop chaalu karo. Ye har modern template mein default hai, bundlers jo karte hain usse milta hai, aur chhota sa helper koi keemat hi nahi. Agar chahte ho ki TypeScript tumhare import statements bilkul waise hi chhode jaise likhe hain, toh verbatimModuleSyntax jodo.',
      },
    },
  ],

  'What is the difference between tsc, Babel, and esbuild for TypeScript?': [
    {
      heading: { en: 'Only one of them type-checks', hi: 'Inme se sirf ek type-check karta hai' },
      body: {
        en: 'That is the headline. tsc is the only tool that understands your types. Babel and esbuild strip the type annotations and emit JavaScript without checking anything — they are transpilers, not compilers in the full sense.',
        hi: 'Mukhya baat yahi hai. tsc hi ek aisa auzaar hai jo tumhare types samajhta hai. Babel aur esbuild sirf type annotations hata kar JavaScript nikaal dete hain, bina kuch jaanche — wo transpilers hain, poore maayne mein compilers nahi.',
      },
      diagram: `            type-checks   speed        emits
tsc            YES         slow         JS + .d.ts
Babel          no          medium       JS
esbuild / SWC  no          very fast    JS`,
    },
    {
      heading: { en: 'Why anyone would skip checking', hi: 'Koi jaanch kyun chhodega' },
      body: {
        en: 'Speed. Type checking is the expensive part, and it is not needed to run the code. Splitting the two lets a dev server rebuild in milliseconds while type errors are reported separately by an editor and by CI.',
        hi: 'Raftaar. Type checking hi mehnga hissa hai, aur code chalane ke liye uski zaroorat nahi. Dono ko alag karne se dev server milliseconds mein rebuild karta hai jabki type errors alag se editor aur CI bataate hain.',
      },
      code: `// the standard modern setup
"dev":        "vite",              // esbuild — no checking, instant
"typecheck":  "tsc --noEmit",      // checking only, no output
"build":      "tsc --noEmit && vite build"`,
    },
    {
      heading: { en: 'The single-file limitation', hi: 'Ek-file wali seema' },
      body: {
        en: 'Babel and esbuild compile one file at a time with no whole-program view. That is what makes them fast and parallelisable, and it is why they cannot support features that need cross-file knowledge.',
        hi: 'Babel aur esbuild ek time pe ek file compile karte hain, poore program ka nazariya unke paas nahi. Isi se wo tez aur parallel chalte hain, aur isiliye wo un features ko nahi sambhaal sakte jinhe kai files ka gyaan chahiye.',
      },
    },
    {
      heading: { en: 'What that rules out', hi: 'Isse kya bahar ho jaata hai' },
      body: {
        en: 'const enum, because inlining needs to know the enum from another file. Legacy decorator metadata. And re-exporting a type without the type keyword, because the transpiler cannot tell whether an export is a type or a value. The isolatedModules flag makes tsc reject all of these for you.',
        hi: 'const enum, kyunki inlining ke liye doosri file ka enum pata hona chahiye. Purana decorator metadata. Aur bina type keyword ke type ko dobara export karna, kyunki transpiler bata hi nahi sakta ki export type hai ya value. isolatedModules flag tsc se ye sab pehle hi mana karwa deta hai.',
      },
      code: `{ "compilerOptions": { "isolatedModules": true } }

export { type User } from './types';     // ✓ explicit — transpiler-safe
export type { User } from './types';     // ✓ also fine`,
    },
    {
      heading: { en: 'Only tsc emits declaration files', hi: 'Sirf tsc declaration files banata hai' },
      body: {
        en: 'A .d.ts requires the type information, so a transpiler cannot produce one. If you publish a library, tsc must be in your build — usually with emitDeclarationOnly while a faster tool emits the JavaScript.',
        hi: '.d.ts ke liye type ki jaankari chahiye, toh transpiler usse bana hi nahi sakta. Agar tum library publish karte ho toh tsc build mein hona hi chahiye — aam taur pe emitDeclarationOnly ke saath, jabki koi tez auzaar JavaScript banata hai.',
      },
      code: `"build": "esbuild src/index.ts --outfile=dist/index.js &&
          tsc --emitDeclarationOnly"`,
    },
    {
      heading: { en: 'Where each one fits', hi: 'Har ek kahan fit hota hai' },
      body: {
        en: 'esbuild or SWC for the dev server and the app bundle, because iteration speed matters most. Babel when you need its plugin ecosystem or a specific transform. tsc for type checking in CI and for emitting declarations. Most real projects use two of the three together.',
        hi: 'Dev server aur app bundle ke liye esbuild ya SWC, kyunki sabse zyada iteration ki raftaar maayne rakhti hai. Babel jab uska plugin ecosystem ya koi khaas transform chahiye. CI mein type checking aur declarations ke liye tsc. Zyadatar asli projects teen mein se do saath use karte hain.',
      },
    },
    {
      heading: { en: 'The risk to name', hi: 'Jokhim jiska naam lena hai' },
      body: {
        en: 'If type checking only runs in CI, a developer can commit code that builds and runs locally but fails the pipeline. Keep tsc --noEmit in a pre-commit hook or run it in watch mode alongside the dev server so the feedback stays immediate.',
        hi: 'Agar type checking sirf CI mein chale, toh developer aisa code commit kar sakta hai jo local pe bante aur chalta hai par pipeline mein fail hota hai. tsc --noEmit ko pre-commit hook mein rakho ya dev server ke saath watch mode mein chalao taaki feedback turant milta rahe.',
      },
    },
  ],

  'What are template literal types?': [
    {
      heading: { en: 'String literal types you can build from parts', hi: 'String literal types jo tukdon se bante hain' },
      body: {
        en: 'Template literal types use backtick syntax at the TYPE level to construct string literal types from other types. They turn string manipulation into something the type system can do.',
        hi: 'Template literal types TYPE ke star pe backtick syntax use karke doosre types se string literal types banate hain. Ye string ka kaam type system ke haath mein de dete hain.',
      },
      code: `type Greeting = \`hello \${string}\`;

const a: Greeting = 'hello world';    // ✓
const b: Greeting = 'goodbye';         // ✗`,
    },
    {
      heading: { en: 'They distribute over unions', hi: 'Ye unions pe alag-alag lagte hain' },
      body: {
        en: 'This is where they become powerful. Put a union in an interpolation slot and you get the cross product of every combination — a large, precise union generated from two small ones.',
        hi: 'Yahin ye taakatwar bante hain. Kisi interpolation ki jagah union daalo aur har jodi ka cross product mil jaata hai — do chhoti unions se ek badi, theek union ban jaati hai.',
      },
      code: `type Colour = 'red' | 'blue';
type Shade = 'light' | 'dark';
type Combo = \`\${Shade}-\${Colour}\`;
// 'light-red' | 'light-blue' | 'dark-red' | 'dark-blue'`,
    },
    {
      heading: { en: 'The four built-in string helpers', hi: 'Chaar built-in string helpers' },
      body: {
        en: 'Uppercase, Lowercase, Capitalize and Uncapitalize are intrinsic types implemented in the compiler. They are what let you generate a getter or handler name from a property name.',
        hi: 'Uppercase, Lowercase, Capitalize aur Uncapitalize compiler mein bane intrinsic types hain. Inhi se tum kisi property ke naam se getter ya handler ka naam bana sakte ho.',
      },
      code: `type A = Uppercase<'hello'>;      // 'HELLO'
type B = Capitalize<'hello'>;      // 'Hello'`,
    },
    {
      heading: { en: 'Combined with mapped types they generate APIs', hi: 'Mapped types ke saath ye APIs banate hain' },
      body: {
        en: 'The real use. Remap each key with a template literal and you derive a whole set of related names — getters, event handlers, prefixed keys — from one source type, with no duplication to keep in sync.',
        hi: 'Asli upyog. Har key ko template literal se dobara likho aur ek hi source type se jude hue naamon ka poora samooh nikal aata hai — getters, event handlers, prefix wali keys — bina kisi dohraav ke jise sync rakhna pade.',
      },
      code: `type Handlers<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}Change\`]: (v: T[K]) => void
};

type H = Handlers<{ name: string; age: number }>;
// { onNameChange: (v: string) => void;
//   onAgeChange:  (v: number) => void }`,
    },
    {
      heading: { en: 'They can parse strings with infer', hi: 'Ye infer se strings parse kar sakte hain' },
      body: {
        en: 'Pattern matching on a string type extracts the parts. This is how a router library types its path parameters, so a typo in a route string becomes a compile error.',
        hi: 'String type pe pattern match karke tukde nikaale ja sakte hain. Aise hi koi router library apne path parameters type karti hai, taaki route string mein typo compile error ban jaaye.',
      },
      code: `type Params<S> =
  S extends \`\${string}:\${infer P}/\${infer Rest}\` ? P | Params<Rest>
  : S extends \`\${string}:\${infer P}\` ? P
  : never;

type P = Params<'/users/:id/posts/:postId'>;   // 'id' | 'postId'`,
    },
    {
      heading: { en: 'Where you meet them in real libraries', hi: 'Asli libraries mein ye kahan milte hain' },
      body: {
        en: 'Tailwind class name types, typed route parameters in TanStack Router and Next.js, CSS-in-JS property names, and event name unions. You benefit from them constantly without writing one.',
        hi: 'Tailwind ke class name types, TanStack Router aur Next.js ke typed route parameters, CSS-in-JS ke property names, aur event name unions. Tum inka fayda lagataar uthate ho bina ek bhi likhe.',
      },
    },
    {
      heading: { en: 'Know the limit', hi: 'Seema jaano' },
      body: {
        en: 'A cross product grows multiplicatively, and TypeScript caps a union at 100,000 members. Three unions of fifty each is already over the limit. Deep recursive parsing also slows the compiler noticeably — use them where they buy real safety, not for cleverness.',
        hi: 'Cross product guna hokar badhta hai, aur TypeScript ek union ko 1,00,000 members pe rok deta hai. Pachaas-pachaas ki teen unions pehle hi seema paar kar deti hain. Gehri recursive parsing bhi compiler ko dikhne laayak dheema karti hai — inhe wahan use karo jahan asli suraksha mile, chaturaai ke liye nahi.',
      },
    },
  ],

  'What is exhaustiveness checking?': [
    {
      heading: { en: 'Making the compiler prove you handled every case', hi: 'Compiler se saabit karwana ki tumne har case sambhaala' },
      body: {
        en: 'When you switch over a union, exhaustiveness checking turns a missing case into a COMPILE error rather than a silent fall-through. Add a member to the union later and every unhandled switch lights up.',
        hi: 'Jab tum kisi union pe switch karte ho, exhaustiveness checking chhoote hue case ko chup-chaap nikal jaane ki jagah COMPILE error bana deti hai. Baad mein union mein member jodo aur har chhoota hua switch jal uthta hai.',
      },
      code: `type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; side: number };`,
    },
    {
      heading: { en: 'The mechanism: narrowing to never', hi: 'Machinery: never tak narrow hona' },
      body: {
        en: 'Each case removes one member from the union. By the default branch, if you handled them all, the value has narrowed to never. Assigning it to a never-typed variable succeeds only when nothing is left.',
        hi: 'Har case union se ek member hata deta hai. Default branch tak, agar tumne sab sambhaal liye, toh value never mein simat chuki hai. Usse never wale variable mein daalna tabhi safal hota hai jab kuch bacha na ho.',
      },
      code: `function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.r ** 2;
    case 'square': return s.side ** 2;
    default: {
      const _exhaustive: never = s;      // ✓ compiles today
      throw new Error(\`unhandled: \${JSON.stringify(s)}\`);
    }
  }
}`,
    },
    {
      heading: { en: 'What happens when the union grows', hi: 'Union badhne pe kya hota hai' },
      body: {
        en: 'Add a third member and the default branch no longer narrows to never, so the assignment fails. The compiler names the type it could not assign, which tells you exactly what you forgot — and it does this at every switch in the codebase.',
        hi: 'Teesra member jodo aur default branch ab never tak narrow nahi hoti, toh assignment fail ho jaata hai. Compiler us type ka naam bataata hai jo daala nahi ja saka, jisse theek pata chal jaata hai kya chhoot gaya — aur ye codebase ke har switch pe hota hai.',
      },
      code: `type Shape = … | { kind: 'triangle'; base: number };

// ✗ Type '{ kind: "triangle"; base: number }'
//   is not assignable to type 'never'`,
    },
    {
      heading: { en: 'The helper function form', hi: 'Helper function wala roop' },
      body: {
        en: 'A small assertNever helper reads better than an inline variable and gives you a runtime error message too. Most codebases define one once and use it everywhere.',
        hi: 'Ek chhota assertNever helper inline variable se behtar padha jaata hai aur runtime error message bhi deta hai. Zyadatar codebases isse ek baar bana kar har jagah use karte hain.',
      },
      code: `function assertNever(x: never): never {
  throw new Error(\`Unexpected value: \${JSON.stringify(x)}\`);
}

default: return assertNever(s);`,
    },
    {
      heading: { en: 'Return types give it to you for free', hi: 'Return types isse muft mein de dete hain' },
      body: {
        en: 'A cleaner variant. If the function has an explicit return type and no default branch, a missing case means some path returns undefined — which is a compile error under strict. No helper needed.',
        hi: 'Ek saaf roop. Agar function ka return type saaf likha ho aur default branch na ho, toh chhoota hua case matlab koi raasta undefined deta hai — jo strict mein compile error hai. Koi helper nahi chahiye.',
      },
      code: `function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return 1;
    // ✗ Function lacks ending return statement — the missing case
  }
}`,
    },
    {
      heading: { en: 'It needs a discriminated union', hi: 'Iske liye discriminated union chahiye' },
      body: {
        en: 'The narrowing only works if each member has a distinguishable literal property. A union of loosely-shaped objects, or a discriminant widened to string, silently breaks the whole mechanism.',
        hi: 'Narrowing tabhi chalti hai jab har member pe ek pehchaanne laayak literal property ho. Dheeli shakalon ki union, ya string mein chauda hua discriminant, poori machinery ko chup-chaap tod deta hai.',
      },
    },
    {
      heading: { en: 'Why it is worth the two extra lines', hi: 'Do extra lines kyun keemti hain' },
      body: {
        en: 'It converts a runtime bug into a compile error and turns the compiler into a to-do list. Adding a new state to your app becomes safe, because you are told every single place that needs updating.',
        hi: 'Ye runtime bug ko compile error bana deta hai aur compiler ko ek to-do list mein badal deta hai. App mein nayi state jodna safe ho jaata hai, kyunki tumhe har wo jagah bata di jaati hai jise badalna hai.',
      },
    },
  ],

  'How do you type an async function and its errors?': [
    {
      heading: { en: 'The return type is always a Promise', hi: 'Return type hamesha Promise hota hai' },
      body: {
        en: 'An async function wraps whatever you return in a Promise, so annotate it as Promise<T>. Annotating it as T is an error, and TypeScript will tell you so.',
        hi: 'Async function jo bhi return karo usse Promise mein lapet deta hai, isliye usse Promise<T> likho. Usse T likhna error hai, aur TypeScript ye bata dega.',
      },
      code: `async function getUser(id: number): Promise<User> { … }
async function save(): Promise<void> { … }

async function bad(): User { … }    // ✗ must be Promise<User>`,
    },
    {
      heading: { en: 'The error type is not in the signature', hi: 'Error ka type signature mein nahi hai' },
      body: {
        en: 'This is the crux. TypeScript has no checked exceptions — you cannot express what a function throws, and nothing forces a caller to handle it. Every throw is invisible to the type system.',
        hi: 'Yahi asli baat hai. TypeScript mein checked exceptions nahi hain — tum bata hi nahi sakte ki function kya throw karta hai, aur caller ko sambhalne ke liye kuch majboor nahi karta. Har throw type system ko dikhta hi nahi.',
      },
      code: `async function getUser(id: number): Promise<User> {
  throw new NotFoundError();     // the signature says nothing about this
}`,
    },
    {
      heading: { en: 'catch gives you unknown, not Error', hi: 'catch unknown deta hai, Error nahi' },
      body: {
        en: 'JavaScript lets you throw anything — a string, a number, undefined. So the caught value is unknown under useUnknownInCatchVariables, which strict enables. You must narrow before using it.',
        hi: 'JavaScript kuch bhi throw karne deta hai — string, number, undefined. Isliye useUnknownInCatchVariables ke saath, jo strict chaalu karta hai, pakdi gayi value unknown hoti hai. Use karne se pehle narrow karna zaroori hai.',
      },
      code: `try { await getUser(1); }
catch (e) {
  e.message;                          // ✗ 'e' is of type 'unknown'
  if (e instanceof Error) e.message;  // ✓
}`,
    },
    {
      heading: { en: 'A helper for narrowing errors', hi: 'Errors narrow karne ka helper' },
      body: {
        en: 'Because you cannot trust what was thrown, normalise it once at the boundary. This is more reliable than an instanceof check scattered through the codebase, especially across realms where instanceof can fail.',
        hi: 'Kya throw hua ispe bharosa nahi kar sakte, isliye usse boundary pe ek baar theek kar lo. Ye codebase mein bikhre instanceof checks se zyada bharosemand hai, khaas kar un realms ke paar jahan instanceof fail ho sakta hai.',
      },
      code: `function toError(e: unknown): Error {
  return e instanceof Error ? e : new Error(String(e));
}

catch (e) { logger.error(toError(e).message); }`,
    },
    {
      heading: { en: 'The alternative: make errors part of the return type', hi: 'Vikalp: errors ko return type ka hissa banao' },
      body: {
        en: 'A Result union moves failure into the type system, so the compiler forces the caller to handle it. You lose the convenience of throwing and gain a guarantee — which is the trade-off worth explaining.',
        hi: 'Result union failure ko type system mein le aata hai, toh compiler caller ko usse sambhalne pe majboor karta hai. Throw karne ki suvidha jaati hai aur ek guarantee milti hai — yahi sauda samjhane laayak hai.',
      },
      code: `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

async function getUser(id: number): Promise<Result<User, NotFoundError>> { … }

const r = await getUser(1);
if (r.ok) use(r.value); else handle(r.error);   // ✓ compiler-enforced`,
    },
    {
      heading: { en: 'Typing rejections in combinators', hi: 'Combinators mein rejections type karna' },
      body: {
        en: 'Promise.allSettled gives you a discriminated union per result, so narrowing on status is exactly the pattern from earlier. Note that the reason is typed any, so treat it as unknown yourself.',
        hi: 'Promise.allSettled har nateeje ke liye discriminated union deta hai, toh status pe narrow karna wahi pehle wala pattern hai. Dhyaan do reason ka type any hai, toh usse khud unknown maano.',
      },
      code: `const results = await Promise.allSettled(tasks);
for (const r of results) {
  if (r.status === 'fulfilled') use(r.value);
  else logger.error(toError(r.reason));
}`,
    },
    {
      heading: { en: 'The summary to give', hi: 'Dene laayak saaraansh' },
      body: {
        en: '"The return type is Promise<T>. Errors are not part of the type at all — TypeScript has no checked exceptions, and catch gives you unknown, which you must narrow. Where failure is expected rather than exceptional, I return a Result union so the compiler forces the caller to handle it."',
        hi: '"Return type Promise<T> hai. Errors type ka hissa hote hi nahi — TypeScript mein checked exceptions nahi hain, aur catch unknown deta hai jise narrow karna padta hai. Jahan failure asaadhaaran nahi balki ummeed ke mutabik ho, wahan main Result union deta hoon taaki compiler caller ko sambhalne pe majboor kare."',
      },
    },
  ],

  'What is the difference between Record and an index signature?': [
    {
      heading: { en: 'Record is a mapped type built on index signatures', hi: 'Record index signatures pe bana mapped type hai' },
      body: {
        en: 'For a string key they produce the same thing. Record<string, T> is defined as a mapped type and, with a string key, is equivalent to an index signature. The difference appears only when the key is a union of literals.',
        hi: 'String key ke liye dono wahi cheez banate hain. Record<string, T> ek mapped type hai aur string key ke saath wo index signature jaisa hi hai. Farq tabhi dikhta hai jab key literals ki union ho.',
      },
      code: `type A = Record<string, number>;
type B = { [k: string]: number };      // the same type`,
    },
    {
      heading: { en: 'With a literal union, Record closes the object', hi: 'Literal union ke saath Record object ko band kar deta hai' },
      body: {
        en: 'This is the real difference. Record over a union of literals produces a fixed set of REQUIRED keys — an index signature cannot express that. Miss one and it is a compile error.',
        hi: 'Asli farq yahi hai. Literals ki union pe Record ek tay ZAROORI keys ka samooh banata hai — index signature ye bata hi nahi sakta. Ek bhi chhooti toh compile error.',
      },
      code: `type Roles = Record<'admin' | 'user', string[]>;
// { admin: string[]; user: string[] } — both required

const r: Roles = { admin: [] };     // ✗ Property 'user' is missing`,
    },
    {
      heading: { en: 'An index signature accepts any key', hi: 'Index signature koi bhi key leta hai' },
      body: {
        en: 'Which is the point when the keys are genuinely unknown at compile time — a cache, a dictionary built from user data. But it also means reading a key that was never set type-checks and returns undefined at runtime.',
        hi: 'Aur yahi maqsad hai jab keys compile time pe sach mein pata na hon — koi cache, user data se bana dictionary. Par iska matlab ye bhi hai ki kabhi set na ki gayi key padhna type-check ho jaata hai aur runtime pe undefined deta hai.',
      },
      code: `const cache: { [k: string]: User } = {};
cache.anything.name;      // ✓ compiles  💥 crashes`,
    },
    {
      heading: { en: 'noUncheckedIndexedAccess fixes that hole', hi: 'noUncheckedIndexedAccess wo chhed band karta hai' },
      body: {
        en: 'With the flag on, any index access returns T | undefined, so the compiler makes you check. This is the single most valuable flag when your codebase uses dictionaries heavily.',
        hi: 'Flag chaalu ho toh koi bhi index access T | undefined deta hai, toh compiler tumse jaanch karwaata hai. Jab codebase mein dictionaries bahut ho, tab sabse keemti flag yahi hai.',
      },
      code: `const u = cache['x'];     // User | undefined  ✓
u?.name;`,
    },
    {
      heading: { en: 'An index signature constrains every property', hi: 'Index signature har property pe lagta hai' },
      body: {
        en: 'A gotcha worth knowing. Once an interface has an index signature, every declared property must be assignable to its value type — which often forces you to widen the value type and lose precision.',
        hi: 'Ek jaanne laayak jaal. Jaise hi kisi interface mein index signature aata hai, har batayi gayi property uske value type mein daalne laayak honi chahiye — jo aksar tumhe value type chauda karne aur theek-thaak type khone pe majboor karta hai.',
      },
      code: `interface Config {
  [k: string]: string;
  retries: number;      // ✗ 'number' is not assignable to 'string'
}`,
    },
    {
      heading: { en: 'Partial Record for a sparse map', hi: 'Sparse map ke liye Partial Record' },
      body: {
        en: 'When you want the key type constrained but not every key present, wrap it in Partial. You keep autocomplete and rejection of unknown keys, while each value is correctly typed as possibly undefined.',
        hi: 'Jab key type baandhna ho par har key maujood na ho, toh usse Partial mein lapet do. Autocomplete aur anjaan keys ka mana hona bacha rehta hai, aur har value theek se shaayad-undefined type hoti hai.',
      },
      code: `type Flags = Partial<Record<'a' | 'b', boolean>>;
const f: Flags = { a: true };      // ✓ 'b' may be absent
f.b;                                // boolean | undefined`,
    },
    {
      heading: { en: 'The rule', hi: 'Rule' },
      body: {
        en: 'Record with a literal union when the set of keys is known and all are required. Partial Record when the keys are known but optional. An index signature or Record<string, T> when the keys are genuinely arbitrary — and enable noUncheckedIndexedAccess when you do.',
        hi: 'Jab keys ka samooh maloom ho aur sab zaroori hon tab literal union wala Record. Keys maloom par optional hon tab Partial Record. Jab keys sach mein kuch bhi ho sakti hon tab index signature ya Record<string, T> — aur tab noUncheckedIndexedAccess chaalu karo.',
      },
    },
  ],

  'What does noUncheckedIndexedAccess do?': [
    {
      heading: { en: 'It adds undefined to every index access', hi: 'Ye har index access mein undefined jodta hai' },
      body: {
        en: 'With the flag on, reading arr[i] or obj[key] gives T | undefined instead of T. That reflects reality: TypeScript has no idea whether that index exists, and until this flag it simply pretended it did.',
        hi: 'Flag chaalu ho toh arr[i] ya obj[key] padhne pe T ki jagah T | undefined milta hai. Ye hakeekat dikhata hai: TypeScript ko pata hi nahi ki wo index maujood hai ya nahi, aur is flag se pehle wo bas maan leta tha ki hai.',
      },
      code: `const arr = [1, 2, 3];
arr[10].toFixed();      // off: ✓ compiles, 💥 crashes
                         // on:  ✗ 'arr[10]' is possibly 'undefined'`,
    },
    {
      heading: { en: 'The hole it closes', hi: 'Ye kaunsa chhed band karta hai' },
      body: {
        en: 'strict does not include it, so even a fully strict codebase happily lets you read past the end of an array or look up a missing dictionary key. It is one of the last places TypeScript is unsound by default.',
        hi: 'strict mein ye shaamil nahi hai, toh poori tarah strict codebase bhi tumhe array ke aage padhne ya gayab dictionary key dhoondhne deta hai. TypeScript default se jahan-jahan galat hai, unme se ek aakhri jagah yahi hai.',
      },
      code: `const byId: Record<string, User> = {};
byId['missing'].name;    // off: ✓ compiles  💥 crashes`,
    },
    {
      heading: { en: 'How you handle it', hi: 'Isse kaise sambhalna hai' },
      body: {
        en: 'The usual tools. Optional chaining, a nullish default, or a guard that narrows. In practice the fixes are short and they force you to decide what should happen when the value is not there.',
        hi: 'Wahi aam auzaar. Optional chaining, nullish default, ya narrow karne wala guard. Asal mein ilaaj chhote hote hain aur wo tumse tay karwaate hain ki value na ho toh kya hona chahiye.',
      },
      code: `arr[0]?.toFixed();
const first = arr[0] ?? 0;
const u = byId[id];
if (u) use(u);`,
    },
    {
      heading: { en: 'What it deliberately does NOT affect', hi: 'Ye jaan-boojh kar kis pe asar NAHI daalta' },
      body: {
        en: 'A declared property is untouched — only index access is affected. Iteration with for...of and array methods also stays clean, because the element is guaranteed to exist. So the noise is much smaller than people expect.',
        hi: 'Batayi gayi property par asar nahi — sirf index access pe. for...of aur array methods se ghoomna bhi saaf rehta hai, kyunki element ka hona pakka hai. Toh shor logon ki ummeed se kahin kam hai.',
      },
      code: `for (const x of arr) x.toFixed();        // ✓ no undefined
arr.map((x) => x.toFixed());              // ✓
obj.knownProp;                             // ✓ unaffected`,
    },
    {
      heading: { en: 'Where it does get noisy', hi: 'Ye kahan shor karta hai' },
      body: {
        en: 'Classic index loops, destructuring a tuple from a split, and repeated dictionary lookups. The fix for the loop is usually to switch to for...of or entries, which is better code anyway.',
        hi: 'Classic index wale loops, split se tuple destructure karna, aur baar-baar dictionary lookup. Loop ka ilaaj aam taur pe for...of ya entries pe aana hai, jo waise bhi behtar code hai.',
      },
      code: `for (let i = 0; i < arr.length; i++) arr[i].toFixed();   // ✗ noisy
for (const x of arr) x.toFixed();                         // ✓ clean

const [a, b] = 'x=1'.split('=');    // both string | undefined`,
    },
    {
      heading: { en: 'Whether to enable it', hi: 'Isse chaalu karein ya nahi' },
      body: {
        en: 'Yes on a new project, and yes on any codebase that uses dictionaries or lookup tables heavily — that is where it catches real bugs. On an existing array-heavy codebase it can produce a lot of noise for little gain, so measure before committing.',
        hi: 'Naye project pe haan, aur us codebase pe bhi haan jo dictionaries ya lookup tables bahut use karta hai — wahan ye asli bugs pakadta hai. Purane array-bhari codebase pe ye thode fayde ke liye bahut shor kar sakta hai, isliye tay karne se pehle naapo.',
      },
    },
  ],

  'How do you share types between a frontend and a backend?': [
    {
      heading: { en: 'The goal: one definition, two consumers', hi: 'Lakshya: ek definition, do upyogkarta' },
      body: {
        en: 'Whatever the mechanism, the aim is that a change to the API shape produces a COMPILE error in the frontend. Duplicating a type by hand in two repos guarantees they drift, and the drift is only discovered in production.',
        hi: 'Tareeka jo bhi ho, maqsad ye hai ki API ki shakl badalne pe frontend mein COMPILE error aaye. Do repos mein haath se type dohraane se wo alag ho hi jaayenge, aur ye farq sirf production mein pata chalta hai.',
      },
    },
    {
      heading: { en: 'Option one: a shared package in a monorepo', hi: 'Vikalp ek: monorepo mein saanjha package' },
      body: {
        en: 'The simplest approach when you own both sides. A types package that both apps depend on, in a pnpm or npm workspace. Change the type once and both sides recompile against it.',
        hi: 'Jab dono taraf tumhari ho toh sabse simple tareeka. Ek types package jispe dono apps depend karein, pnpm ya npm workspace mein. Type ek baar badlo aur dono taraf uske hisaab se dobara compile hota hai.',
      },
      code: `packages/
  shared/    →  export interface User { id: number; name: string }
  api/       →  import type { User } from '@app/shared'
  web/       →  import type { User } from '@app/shared'`,
    },
    {
      heading: { en: 'Option two: infer the types from the server', hi: 'Vikalp do: server se hi types nikaalo' },
      body: {
        en: 'tRPC is the clearest example. The client imports the server\'s router TYPE only — no code, no code generation, no build step — and every procedure is typed end to end. Rename a field on the server and the frontend fails to compile immediately.',
        hi: 'tRPC sabse saaf misaal hai. Client server ke router ka sirf TYPE import karta hai — na code, na code generation, na koi build step — aur har procedure poori tarah typed hai. Server pe field ka naam badlo aur frontend turant compile hona band kar deta hai.',
      },
      code: `// server
export type AppRouter = typeof appRouter;

// client
const client = createTRPCClient<AppRouter>({ … });
const user = await client.user.byId.query({ id: 1 });   // ✓ fully typed`,
    },
    {
      heading: { en: 'Option three: generate from a schema', hi: 'Vikalp teen: schema se generate karo' },
      body: {
        en: 'The right answer when the backend is not TypeScript or is owned by another team. Generate types from an OpenAPI spec, a GraphQL schema or a Protobuf definition, and run the generator in CI so a drift is caught there.',
        hi: 'Jab backend TypeScript ka na ho ya doosri team ka ho, tab yahi sahi jawab hai. OpenAPI spec, GraphQL schema ya Protobuf definition se types generate karo, aur generator ko CI mein chalao taaki farq wahin pakda jaaye.',
      },
      code: `npx openapi-typescript ./openapi.yaml -o ./src/api-types.ts
npx graphql-codegen`,
    },
    {
      heading: { en: 'Option four: a shared runtime schema', hi: 'Vikalp chaar: saanjha runtime schema' },
      body: {
        en: 'Define a Zod schema in the shared package. The backend validates the request with it, the frontend validates the response with it, and both derive the TypeScript type from the same source. This is the only option that gives you compile-time AND runtime agreement.',
        hi: 'Saanjhe package mein ek Zod schema banao. Backend usse request validate karta hai, frontend usse response, aur dono usi ek jagah se TypeScript type nikaalte hain. Sirf yahi vikalp compile-time AUR runtime dono ka mel deta hai.',
      },
      code: `// shared
export const User = z.object({ id: z.number(), name: z.string() });
export type User = z.infer<typeof User>;

// backend:  User.parse(req.body)
// frontend: User.parse(await res.json())`,
    },
    {
      heading: { en: 'Import types, not values', hi: 'Types import karo, values nahi' },
      body: {
        en: 'A practical detail. Use import type so the import is erased and no server code can accidentally be bundled into the client. verbatimModuleSyntax makes this explicit and catches the mistake.',
        hi: 'Ek vyavharik baat. import type use karo taaki import mit jaaye aur galti se koi server code client ke bundle mein na chala jaaye. verbatimModuleSyntax isse saaf karta hai aur galti pakadta hai.',
      },
      code: `import type { User } from '@app/shared';    // ✓ erased at compile time`,
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"In a monorepo where we own both sides, a shared types package — or tRPC, which infers the client types from the server with no generation step. When the backend is separate, I generate types from its OpenAPI or GraphQL schema in CI. Either way the rule is one source of truth, so an API change is a compile error rather than a production incident."',
        hi: '"Jis monorepo mein dono taraf hamari ho, wahan ek saanjha types package — ya tRPC, jo bina generation ke server se client ke types nikaal leta hai. Backend alag ho toh main uske OpenAPI ya GraphQL schema se CI mein types generate karta hoon. Dono mein rule ek hi hai: sach ek jagah, taaki API ka badlaav production ki ghatna nahi, compile error bane."',
      },
    },
  ],

  'What are the most common TypeScript mistakes you see?': [
    {
      heading: { en: 'Reaching for any to make an error go away', hi: 'Error hataane ke liye any uthaana' },
      body: {
        en: 'The most common by far. any disables checking for everything it touches and spreads through every derived value, so one annotation can silently switch off the type system across a whole module. Use unknown and narrow, or ts-expect-error with a comment.',
        hi: 'Sabse aam yahi hai. any apne chhue har cheez ki jaanch band kar deta hai aur har nikli hui value mein fail jaata hai, toh ek annotation chup-chaap poore module mein type system band kar sakta hai. unknown lo aur narrow karo, ya comment ke saath ts-expect-error.',
      },
      code: `const data: any = await res.json();     // ✗
const data: unknown = await res.json();  // ✓ forces a decision`,
    },
    {
      heading: { en: 'Trusting an annotation on external data', hi: 'Bahari data pe annotation pe bharosa karna' },
      body: {
        en: 'res.json() as User is an unchecked assertion. TypeScript is erased at runtime, so the server can send anything. Validate at the boundary with a schema and infer the type from it.',
        hi: 'res.json() as User ek bina jaancha daava hai. Runtime pe TypeScript mit chuka hota hai, toh server kuch bhi bhej sakta hai. Boundary pe schema se validate karo aur usi se type nikaalo.',
      },
    },
    {
      heading: { en: 'Using as instead of a type guard', hi: 'Type guard ki jagah as use karna' },
      body: {
        en: 'An assertion tells the compiler to stop checking. A guard verifies at runtime and narrows for free. If you find yourself writing as unknown as T, that double assertion is a signal that the design is wrong, not that you need a bigger hammer.',
        hi: 'Assertion compiler se kehta hai jaanchna band karo. Guard runtime pe jaanchta hai aur muft mein narrow karta hai. Agar tum as unknown as T likh rahe ho, toh wo double assertion ishara hai ki design galat hai, ye nahi ki tumhe bada hathoda chahiye.',
      },
    },
    {
      heading: { en: 'Over-annotating what inference already knows', hi: 'Jo inference pehle se jaanta hai usse annotate karna' },
      body: {
        en: 'Restating the initialiser is noise that goes stale. Worse, annotating with a wide type throws away the narrower inferred one — which is exactly what satisfies was introduced to solve.',
        hi: 'Initialiser dohraana shor hai jo purana ho jaata hai. Isse bura, chaude type se annotate karna us tang inferred type ko phenk deta hai — aur satisfies isi ko hal karne ke liye aaya tha.',
      },
      code: `const n: number = 42;                       // ✗ noise
const cfg: Record<string, string> = { a: 'x' };   // ✗ loses the key
const cfg = { a: 'x' } satisfies Record<string, string>;   // ✓`,
    },
    {
      heading: { en: 'Scattering non-null assertions', hi: 'Non-null assertions bikher dena' },
      body: {
        en: 'Every ! is an unverified promise that crashes if wrong, with the compiler having said nothing. A codebase full of them has strictNullChecks on in name only. Narrow instead, and reserve ! for a documented invariant.',
        hi: 'Har ! ek bina jaancha vaada hai jo galat hone pe crash karta hai, aur compiler ne kuch kaha hi nahi tha. Inse bhare codebase mein strictNullChecks sirf naam ka chaalu hai. Uski jagah narrow karo, aur ! ko kisi likhe hue niyam ke liye bachaa kar rakho.',
      },
    },
    {
      heading: { en: 'Writing clever types nobody can read', hi: 'Aise chatur types jinhe koi padh na sake' },
      body: {
        en: 'A deeply recursive conditional type produces error messages that fill the screen and slow the compiler. If a plain interface expresses the same constraint, use the interface. Type-level cleverness has a maintenance cost that a reviewer pays, not the author.',
        hi: 'Gehra recursive conditional type aise error messages deta hai jo poori screen bhar dete hain aur compiler dheema karte hain. Agar saada interface wahi baat keh de, toh interface lo. Type ke star pe chaturaai ki keemat reviewer chukaata hai, likhne wala nahi.',
      },
    },
    {
      heading: { en: 'Duplicating types instead of deriving them', hi: 'Types nikaalne ki jagah unhe dohraana' },
      body: {
        en: 'Hand-writing a variant of an existing type guarantees they drift. Derive it with Pick, Omit, ReturnType or typeof so a change in one place propagates everywhere.',
        hi: 'Kisi maujooda type ka roop haath se likhna, dono ko alag hone ki guarantee hai. Usse Pick, Omit, ReturnType ya typeof se nikaalo taaki ek jagah ka badlaav har jagah pahunche.',
      },
      code: `type UserPublic = Omit<User, 'password'>;
type Args = Parameters<typeof handler>;`,
    },
    {
      heading: { en: 'And treating types as runtime safety', hi: 'Aur types ko runtime suraksha maan lena' },
      body: {
        en: 'The mistake underneath most of the others. Everything is erased, so no annotation protects you at runtime. The value of TypeScript is at the keyboard and in CI; runtime safety needs an actual check that you wrote.',
        hi: 'Baaki zyadatar galtiyon ke neeche yahi galti hai. Sab kuch mit jaata hai, toh koi annotation runtime pe nahi bachaata. TypeScript ka fayda keyboard pe aur CI mein hai; runtime suraksha ke liye tumhari likhi asli jaanch chahiye.',
      },
    },
  ],

  'When is TypeScript not worth using?': [
    {
      heading: { en: 'Answer honestly — an absolutist answer reads badly', hi: 'Imaandaari se jawab do — ek-tarfa jawab kharaab lagta hai' },
      body: {
        en: 'The interviewer is checking whether you evaluate tools or follow fashion. TypeScript is right for most projects, and saying so while naming real cases where it is not is a stronger answer than defending it unconditionally.',
        hi: 'Interviewer dekh raha hai ki tum auzaar parakhte ho ya fashion follow karte ho. Zyadatar projects ke liye TypeScript sahi hai, aur ye kehte hue un asli cases ka naam lena jahan wo sahi nahi, bina shart bachaav karne se mazboot jawab hai.',
      },
    },
    {
      heading: { en: 'A genuine throwaway script', hi: 'Sach mein phenkne wali script' },
      body: {
        en: 'A twenty-line migration script or a one-off data fix that runs once and is deleted. The setup cost exceeds any benefit, and there is no future maintainer to protect.',
        hi: 'Bees line ki migration script ya ek baar chalne wala data fix jo baad mein hata diya jaata hai. Setup ki keemat kisi bhi fayde se zyada hai, aur bachane ke liye koi bhavishya ka maintainer hai hi nahi.',
      },
    },
    {
      heading: { en: 'A prototype whose shape changes hourly', hi: 'Aisa prototype jiski shakl har ghante badle' },
      body: {
        en: 'When you are exploring and the data model is not settled, types slow you down for a benefit you throw away. The honest version is to start in JavaScript and add TypeScript when the shape stabilises — with a real plan to actually do it.',
        hi: 'Jab tum khoj kar rahe ho aur data model tay nahi hai, tab types tumhe dheema karte hain aur fayda tum phenk dete ho. Imaandaar roop ye hai ki JavaScript se shuru karo aur shakl jamne pe TypeScript jodo — aur usse sach mein karne ki ek asli yojana rakho.',
      },
    },
    {
      heading: { en: 'A team that will not commit to it', hi: 'Aisi team jo isse apnayegi hi nahi' },
      body: {
        en: 'Half-adopted TypeScript is worse than none. A codebase full of any, non-null assertions and ts-ignore has all the build complexity and none of the safety, plus a false sense of security. Either commit with strict on, or do not start.',
        hi: 'Aadha apnaaya TypeScript, na apnaane se bura hai. any, non-null assertions aur ts-ignore se bhara codebase saari build ki jhanjhat deta hai aur suraksha kuch nahi, upar se jhoothi tasalli. Ya toh strict ke saath poori tarah apnao, ya shuru hi mat karo.',
      },
    },
    {
      heading: { en: 'Where the toolchain cannot support it', hi: 'Jahan toolchain sambhaal hi na sake' },
      body: {
        en: 'A legacy build system, a constrained runtime, or an environment where adding a compile step is genuinely impractical. Modern tooling has made this rare, but it still happens.',
        hi: 'Purana build system, seemit runtime, ya aisa environment jahan compile step jodna sach mein vyavharik na ho. Modern tooling ne isse kam kar diya hai, par ye ab bhi hota hai.',
      },
    },
    {
      heading: { en: 'And name the costs, not just the cases', hi: 'Aur sirf cases nahi, keematein bhi batao' },
      body: {
        en: 'A build step, slower CI, a real learning curve for advanced types, occasional fights with library types, and time spent on annotations rather than features. Those are the costs you weigh — and on any codebase that lives longer than a few months, the benefit wins comfortably.',
        hi: 'Ek build step, dheemi CI, uchch types ke liye asli seekhne ki mehnat, kabhi-kabhi library types se ladaai, aur features ki jagah annotations mein lagaya samay. Yahi keematein tolni hoti hain — aur jo codebase kuch mahine se zyada jeeta hai, wahan fayda aaraam se jeet jaata hai.',
      },
    },
    {
      heading: { en: 'The closing line', hi: 'Aakhri line' },
      body: {
        en: '"For anything with more than one developer or a lifetime longer than a few weeks, I would use it. I would skip it for throwaway scripts and very early prototypes — and I would not half-adopt it, because a codebase full of any has the costs without the benefits."',
        hi: '"Jisme ek se zyada developer ho ya jo kuch hafton se zyada chale, uske liye main isse use karunga. Phenkne wali scripts aur bilkul shuruaati prototypes mein chhod dunga — aur aadha nahi apnaunga, kyunki any se bhare codebase mein keemat hai aur fayda nahi."',
      },
    },
  ],

  'What is the difference between unknown and any in a catch block?': [
    {
      heading: { en: 'JavaScript lets you throw anything', hi: 'JavaScript kuch bhi throw karne deta hai' },
      body: {
        en: 'That is why this question exists. throw is not restricted to Error — a string, a number, null or a plain object are all legal. So the caught value genuinely has no known type.',
        hi: 'Isiliye ye sawaal hai. throw sirf Error tak seemit nahi — string, number, null ya saada object sab jaayaz hain. Toh pakdi gayi value ka sach mein koi maloom type nahi hota.',
      },
      code: `throw 'a string';
throw { code: 500 };
throw null;              // all legal JavaScript`,
    },
    {
      heading: { en: 'unknown forces you to check', hi: 'unknown tumse jaanch karwaata hai' },
      body: {
        en: 'With unknown you cannot touch the value until you narrow it, so the compiler makes you handle the case where something other than an Error was thrown. With any you can call anything on it and get a runtime crash instead.',
        hi: 'unknown ke saath tum value ko narrow kiye bina chhoo hi nahi sakte, toh compiler tumse wo case sambhalwaata hai jahan Error ke alawa kuch throw hua. any ke saath tum uspe kuch bhi bula sakte ho aur badle mein runtime crash milta hai.',
      },
      code: `catch (e: any)     { e.message.toUpperCase(); }   // ✓ compiles 💥 crashes
catch (e: unknown) { e.message; }                   // ✗ caught at compile time`,
    },
    {
      heading: { en: 'useUnknownInCatchVariables makes it the default', hi: 'useUnknownInCatchVariables isse default bana deta hai' },
      body: {
        en: 'Before TypeScript 4.4 the catch variable was implicitly any. The flag — included in strict — makes it unknown instead. Knowing the flag name is a good signal that you follow the language rather than just use it.',
        hi: 'TypeScript 4.4 se pehle catch variable chup-chaap any hota tha. Ye flag — jo strict mein shaamil hai — usse unknown bana deta hai. Flag ka naam jaanna achha ishara hai ki tum language ko follow karte ho, sirf use nahi karte.',
      },
      code: `{ "compilerOptions": { "useUnknownInCatchVariables": true } }`,
    },
    {
      heading: { en: 'How to narrow it', hi: 'Isse kaise narrow karein' },
      body: {
        en: 'instanceof Error for the common case, then a custom error class for anything you threw yourself. Fall through to a string conversion for the rest, so a thrown string still produces a usable message rather than "[object Object]".',
        hi: 'Aam case ke liye instanceof Error, phir apni phenki hui cheez ke liye custom error class. Baaki ke liye string conversion pe aa jao, taaki throw ki gayi string bhi "[object Object]" ki jagah kaam ka message de.',
      },
      code: `catch (e) {
  if (e instanceof NotFoundError) return null;
  if (e instanceof Error) logger.error(e.message, e.stack);
  else logger.error(String(e));
}`,
    },
    {
      heading: { en: 'A normalising helper is cleaner', hi: 'Ek theek karne wala helper saaf hai' },
      body: {
        en: 'Rather than repeating the narrowing everywhere, convert once at the boundary. This also handles the case where an error crosses a realm boundary and instanceof fails despite the value really being an Error.',
        hi: 'Har jagah narrowing dohraane ki jagah, boundary pe ek baar convert kar lo. Isse wo case bhi sambhal jaata hai jahan error kisi realm ki seema paar karta hai aur asli Error hone ke bawajood instanceof fail ho jaata hai.',
      },
      code: `function toError(e: unknown): Error {
  if (e instanceof Error) return e;
  if (typeof e === 'string') return new Error(e);
  return new Error(JSON.stringify(e));
}`,
    },
    {
      heading: { en: 'Annotating it as Error is a lie', hi: 'Usse Error likhna jhooth hai' },
      body: {
        en: 'You cannot annotate a catch variable as Error — TypeScript only allows any or unknown, precisely because it cannot guarantee the type. Trying to work around that with an assertion reintroduces exactly the bug the flag prevents.',
        hi: 'Catch variable ko Error nahi likh sakte — TypeScript sirf any ya unknown deta hai, theek isliye ki wo type ki guarantee nahi de sakta. Assertion se usse ghumaana wahi bug wapas le aata hai jise ye flag rokta hai.',
      },
      code: `catch (e: Error) {}          // ✗ not allowed
catch (e) { (e as Error).message; }   // ✗ an unchecked assertion`,
    },
  ],

  'What is the difference between a class and an interface in TypeScript?': [
    {
      heading: { en: 'One exists at runtime, the other does not', hi: 'Ek runtime pe hota hai, doosra nahi' },
      body: {
        en: 'A class is a value AND a type — it compiles to real JavaScript and you can instantiate it. An interface is a type only; it is erased completely and produces no output at all.',
        hi: 'Class ek value BHI hai aur type bhi — wo asli JavaScript mein compile hoti hai aur usse bana sakte ho. Interface sirf type hai; wo poori tarah mit jaata hai aur koi output banata hi nahi.',
      },
      code: `interface I { a: string }
class C { a = 'x' }

// emitted JavaScript:
class C { constructor() { this.a = 'x'; } }
// I is gone entirely`,
    },
    {
      heading: { en: 'Which is why only a class works with instanceof', hi: 'Isiliye instanceof sirf class ke saath chalta hai' },
      body: {
        en: 'instanceof is a runtime operator and needs a runtime constructor. An interface has none, so checking against one is a syntax error — this is the practical consequence of erasure.',
        hi: 'instanceof runtime ka operator hai aur usse runtime constructor chahiye. Interface ke paas wo hai hi nahi, toh uske against jaanchna syntax error hai — erasure ka vyavharik nateeja yahi hai.',
      },
      code: `x instanceof C;      // ✓
x instanceof I;      // ✗ 'I' only refers to a type`,
    },
    {
      heading: { en: 'A class carries implementation, an interface only shape', hi: 'Class implementation rakhti hai, interface sirf shakl' },
      body: {
        en: 'A class holds method bodies, field initialisers, a constructor, private state and static members. An interface declares names and types with no behaviour behind them.',
        hi: 'Class mein method ki body, field ki shuruaati value, constructor, private state aur static members hote hain. Interface sirf naam aur types bataata hai, unke peeche koi behaviour nahi.',
      },
    },
    {
      heading: { en: 'A class is also a type, and implements is optional', hi: 'Class ek type bhi hai, aur implements optional hai' },
      body: {
        en: 'Because TypeScript is structural, any object with a matching shape is assignable to a class type — it need not be an instance. Likewise a class satisfies an interface without declaring implements; the keyword is only a check that you got the shape right.',
        hi: 'TypeScript structural hai, isliye milti-julti shakl wala koi bhi object class ke type mein daala ja sakta hai — uska instance hona zaroori nahi. Waise hi class bina implements likhe interface poora kar deti hai; wo keyword sirf ek jaanch hai ki shakl sahi hai.',
      },
      code: `class Point { x = 0; y = 0 }
const p: Point = { x: 1, y: 2 };     // ✓ never constructed`,
    },
    {
      heading: { en: 'The exception: private members create nominality', hi: 'Apvaad: private members nominality banate hain' },
      body: {
        en: 'A class with a private or protected field is only compatible with itself, because the private member is tied to that declaration. This is the one place TypeScript is genuinely nominal rather than structural.',
        hi: 'Jis class mein private ya protected field ho wo sirf khud ke saath compatible hai, kyunki private member usi declaration se bandha hota hai. Ye ek jagah hai jahan TypeScript sach mein structural nahi, nominal hai.',
      },
      code: `class A { private x = 1 }
class B { private x = 1 }
const a: A = new B();     // ✗ separate declarations of 'x'`,
    },
    {
      heading: { en: 'Inheritance rules differ', hi: 'Inheritance ke rules alag hain' },
      body: {
        en: 'A class extends exactly one class but may implement many interfaces. An interface may extend many interfaces, and it may extend a class — inheriting its shape including private members, which makes it implementable only by that class or its subclasses.',
        hi: 'Class bilkul ek class extend karti hai par kai interfaces implement kar sakti hai. Interface kai interfaces extend kar sakta hai, aur kisi class ko bhi — uski shakl private members samet le kar, jisse usse sirf wahi class ya uski subclasses implement kar sakti hain.',
      },
      code: `class A extends B implements I, J {}
interface K extends I, J {}`,
    },
    {
      heading: { en: 'When to choose which', hi: 'Kab kya chunein' },
      body: {
        en: 'An interface when you only need to describe a shape — which is most of the time, and it costs nothing at runtime. A class when you need instances with behaviour, encapsulated state, or an identity you can check with instanceof, such as a custom error type.',
        hi: 'Jab sirf shakl batani ho tab interface — jo zyadatar hota hai, aur uski runtime pe koi keemat nahi. Class tab jab behaviour wale instances chahiye, chhupi hui state, ya aisi pehchaan jise instanceof se jaancha ja sake, jaise koi custom error type.',
      },
      code: `class NotFoundError extends Error {}       // ✓ needs runtime identity
interface User { id: number }               // ✓ shape only`,
    },
  ],
};
