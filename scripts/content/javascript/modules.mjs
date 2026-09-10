// JavaScript — upgraded roadmap. Every original concept keeps its title (so
// its _id and progress); modules regroup them into the universal bands and
// add labs, debugging, security, tooling, a project and interview prep.

import { legacy } from './legacy.mjs';
import { t, q, iq, out, legacyUpgrader } from '../_shared/helpers.mjs';

const L = legacyUpgrader(legacy, 'JavaScript');
const JS = 'javascript';

/* ═══════════ 00 · PREREQUISITES ═══════════ */

const prerequisites = {
  title: 'Before You Start', stage: 0, band: 'prerequisites', level: 'beginner', estimatedMinutes: 20,
  description: t('Your setup: a browser, an editor, DevTools — and how this course works.', 'Tumhara setup: browser, editor, DevTools — aur ye course kaise chalta hai.'),
  concepts: [
    {
      title: 'Prerequisites — Your JavaScript Setup',
      difficulty: 'easy',
      tags: ['beginner', 'setup'],
      explanation: t(
        "You need three things, all free: a modern browser (Chrome, Edge or Firefox), a code editor (VS Code), and five minutes to find the browser's DevTools console. That is the whole kit for the first half of the course. Node.js comes in later, when we build and deploy the final project.\n\nHTML basics help: you should know what a tag and an id are, because JavaScript mostly changes pages. If HTML is new, do the HTML course first — it is short.\n\nHow this course works: every module has a lab where you type code yourself, a debugging lesson where things break on purpose, and it all builds towards one app you deploy — an expense tracker. Read less, type more.",
        "Teen cheezein chahiye, sab free: modern browser (Chrome, Edge ya Firefox), code editor (VS Code), aur paanch minute browser ka DevTools console dhoondhne ke liye. Course ke pehle aadhe hisse ke liye bas itna. Node.js baad mein aata hai, jab final project build aur deploy karenge.\n\nHTML basics kaam aate hain: tag aur id kya hai pata hona chahiye, kyunki JavaScript zyaadatar pages badalta hai. HTML naya hai toh pehle HTML course karo — chhota hai.\n\nYe course kaise chalta hai: har module mein ek lab hai jahan code khud type karoge, ek debugging lesson jahan cheezein jaan-boojh ke tootti hain, aur sab ek app ki taraf badhta hai jo tum deploy karoge — expense tracker. Kam padho, zyaada type karo."
      ),
      dailyLifeExample: t('Before cooking you check the gas, the utensils and the recipe. Browser, editor and console are your kitchen.', 'Khana banane se pehle gas, bartan aur recipe check karte ho. Browser, editor aur console tumhara kitchen hai.'),
      keyPoints: ['Browser + VS Code + DevTools console', 'HTML basics help', 'Every module: lab, debugging, project step'],
      quiz: [q('Where do you run JavaScript first in this course?', ['A server', 'The browser DevTools console', 'Excel', 'The terminal only'], 1, 'The console runs JavaScript immediately — the fastest feedback loop.')],
      lesson: {
        kind: 'checklist', minutes: 20, badges: ['hands-on'],
        searchTerms: ['setup', 'vs code', 'devtools', 'console', 'browser', 'prerequisites'],
        prerequisites: [
          { title: 'A modern browser', icon: 'globe', know: ['Open DevTools: F12 or Ctrl+Shift+I (Cmd+Opt+I on Mac)', 'Find the Console tab'], refresher: t('Type 2 + 2 in the console and press Enter.', 'Console mein 2 + 2 type karke Enter dabao.') },
          { title: 'VS Code', icon: 'code', know: ['Open a folder', 'Create index.html and app.js'], refresher: t('One folder per project keeps things sane.', 'Har project ka ek folder — sab saaf rehta hai.') },
          { title: 'HTML', icon: 'html', know: ['Tags, attributes, id and class'], refresher: t('JavaScript finds elements by id/class.', 'JavaScript elements ko id/class se dhoondhta hai.'), link: { href: '/courses/html', label: 'HTML course' } },
          { title: 'Node.js (later)', icon: 'node', know: ['Install the LTS version when you reach the tooling module'], refresher: t('Not needed for the first modules.', 'Pehle modules ke liye zaroori nahi.') },
        ],
        where: [
          { app: 'Browser', path: ['⋮ menu', 'More tools', 'Developer tools', 'Console'], note: t('Or press F12.', 'Ya F12 dabao.') },
          { app: 'VS Code', path: ['VS Code', 'File', 'Open Folder…'] },
        ],
        codeResult: { rows: [{ code: "console.log('Hello, Learnverse!');\n2 + 2", result: out("Hello, Learnverse!\n4") }] },
      },
    },
  ],
};

/* ═══════════ 01 · FUNDAMENTALS: VALUES & TYPES ═══════════ */

const values = {
  title: 'Values, Types & Operators', stage: 1, band: 'fundamentals', level: 'beginner', estimatedMinutes: 110,
  description: t('Variables, types, operators, coercion and the console.', 'Variables, types, operators, coercion aur console.'),
  concepts: [
    L('What is JavaScript', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['javascript', 'intro', 'browser', 'node'] } }),
    L('Variables: var, let & const', {
      lesson: {
        kind: 'lesson', minutes: 15, badges: ['coding'],
        searchTerms: ['let', 'const', 'var', 'variable'],
        codeResult: { rows: [
          { code: "const name = 'Asha';\nlet visits = 1;\nvisits = visits + 1;\nconsole.log(name, visits);", result: out('Asha 2') },
          { code: "const total = 0;\ntotal = 10;", result: out('Uncaught TypeError: Assignment to constant variable.') },
        ] },
        mistakes: [{ wrong: 'Using var in modern code', why: 'var is function-scoped and hoisted, which causes bugs in loops and blocks.', right: 'const by default, let when the value changes.' }],
        challenge: { prompt: t('The count changes every click. Which keyword?', 'Count har click pe badalta hai. Kaunsa keyword?'), code: "____ count = 0;\nbutton.addEventListener('click', () => { count++; });", options: ['const', 'let', 'var'], answer: 1, language: JS, hints: [t('Will this value be reassigned?', 'Kya ye value dobara assign hogi?'), t('const forbids reassignment.', 'const reassignment nahi hone deta.')], explanation: t('let allows reassignment; var works but is function-scoped.', 'let reassignment allow karta hai; var chalega par function-scoped hai.') },
        summary: [t('const by default', 'Default const'), t('let when it changes', 'Badle toh let'), t('avoid var', 'var se bacho')],
      },
    }),
    L('Data Types', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['types', 'typeof', 'string', 'number', 'boolean', 'null', 'undefined', 'object'], codeResult: { rows: [{ code: "typeof 'hi'\ntypeof 42\ntypeof null\ntypeof []", result: out("'string'\n'number'\n'object'   ← historical quirk\n'object'   ← use Array.isArray()") }] } } }),
    L('Operators', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['operators', '===', '==', '%'] } }),
    L('Type Conversion & Coercion', {
      lesson: {
        kind: 'lesson', minutes: 15, badges: ['coding'],
        searchTerms: ['coercion', 'Number()', 'NaN', '==', 'string to number'],
        codeResult: { rows: [
          { code: "'120' + 30\n'120' - 30\nNumber('120') + 30\nNumber('abc')", result: out("'12030'\n90\n150\nNaN") },
          { code: "0 == ''\n0 === ''", result: out('true\nfalse') },
        ] },
        mistakes: [{ wrong: 'Adding form input directly', why: 'input.value is always a string; + concatenates.', right: 'Number(input.value) before any maths.' }],
        challenge: { prompt: t('Make the total correct.', 'Total sahi karo.'), code: "const amount = ____(input.value);\nconst total = amount + 30;", options: ['String', 'Number', 'Boolean', 'JSON.parse'], answer: 1, language: JS, hints: [t('What type does input.value have?', 'input.value ka type kya hai?'), t('You need a numeric type before +.', '+ se pehle numeric type chahiye.')], explanation: t('Number() converts the string; check Number.isFinite afterwards.', 'Number() string convert karta hai; baad mein Number.isFinite check karo.') },
      },
    }),
    L('Comments & the Console', { tags: ['debugging'], lesson: { kind: 'lesson', minutes: 10, searchTerms: ['console.log', 'console.table', 'console.error', 'comments'] } }),
    L('Numbers & the Math Object', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['Math', 'toFixed', 'round', 'random'] } }),
    L('Truthy & Falsy Values', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['truthy', 'falsy', 'boolean'] } }),
    {
      title: 'Lab — Tip Calculator in the Console',
      difficulty: 'easy', tags: ['lab', 'beginner'],
      explanation: t('Your first program: variables, numbers, a function and formatted output. Type it, run it, break it, fix it.', 'Tumhara pehla program: variables, numbers, ek function aur formatted output. Type karo, chalao, todo, theek karo.'),
      dailyLifeExample: t('Splitting a restaurant bill with friends — the maths you already do in your head, written down.', 'Doston ke saath restaurant ka bill baantna — jo maths dimaag mein karte ho, wahi likhna.'),
      keyPoints: ['Convert inputs to numbers', 'Round money with toFixed(2)', 'One function, one job'],
      quiz: [q('What does (1234.5).toFixed(2) return?', ['1234.50 (a number)', "'1234.50' (a string)", '1235', 'NaN'], 1, 'toFixed returns a string — convert back with Number() if you keep calculating.')],
      lesson: {
        kind: 'lab', minutes: 25, badges: ['lab', 'coding'],
        searchTerms: ['lab', 'tip calculator', 'toFixed', 'functions'],
        lab: {
          goal: t('Write splitBill(bill, tipPercent, people) that returns what each person pays.', 'splitBill(bill, tipPercent, people) likho jo har insaan ka hissa return kare.'),
          prerequisites: ['Variables', 'Numbers', 'Functions'],
          starter: { language: JS, code: "function splitBill(bill, tipPercent, people) {\n  // 1. tip = bill * tipPercent / 100\n  // 2. total = bill + tip\n  // 3. return total / people, rounded to 2 decimals (as a number)\n}\n\nconsole.log(splitBill(1200, 10, 4)); // expected 330\nconsole.log(splitBill(999, 15, 3));  // expected 382.95" },
          tasks: ['Compute the tip', 'Compute the total', 'Divide by people', 'Round to 2 decimals and return a number', 'Guard: people must be at least 1'],
          hints: [t('Math on the percent: bill * tipPercent / 100.', 'Percent ka maths: bill * tipPercent / 100.'), t('toFixed returns a string.', 'toFixed string deta hai.'), t('Number((x).toFixed(2)) keeps it a number.', 'Number((x).toFixed(2)) number rakhta hai.')],
          expected: { checks: ['splitBill(1200, 10, 4) → 330', 'splitBill(999, 15, 3) → 382.95', 'splitBill(100, 10, 0) → error message, not Infinity'] },
          solution: { language: JS, code: "function splitBill(bill, tipPercent, people) {\n  if (people < 1) throw new Error('people must be at least 1');\n  const tip = bill * tipPercent / 100;\n  const total = bill + tip;\n  return Number((total / people).toFixed(2));\n}", explain: t('Guard first, then compute; convert the rounded string back to a number.', 'Pehle guard, phir compute; rounded string ko wapas number banao.') },
          errors: [{ title: 'Infinity', fix: t('Division by zero — guard people < 1.', 'Zero se divide — people < 1 ka guard.') }, { title: "'330.00' instead of 330", fix: t('Wrap toFixed in Number().', 'toFixed ko Number() mein lapeto.') }],
        },
      },
    },
  ],
};

/* ═══════════ 02 · FUNDAMENTALS: CONTROL FLOW & FUNCTIONS ═══════════ */

const flow = {
  title: 'Control Flow & Functions', stage: 2, band: 'fundamentals', level: 'beginner', estimatedMinutes: 100,
  description: t('Decisions, loops, functions, parameters and scope.', 'Decisions, loops, functions, parameters aur scope.'),
  concepts: [
    L('Conditionals: if, else & switch', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['if', 'else', 'switch', 'ternary'] } }),
    L('Loops: for, while & for...of', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['for', 'while', 'for...of', 'loop'] } }),
    L('Function Declarations & Expressions', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['function', 'declaration', 'expression'] } }),
    L('Parameters, Arguments & Default Values', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['parameters', 'arguments', 'default'] } }),
    L('Arrow Functions', {
      lesson: {
        kind: 'lesson', minutes: 12, badges: ['coding'], searchTerms: ['arrow', '=>'],
        mistakes: [{ wrong: 'Returning an object literal without parentheses', why: '() => { a: 1 } is a block with a label, so it returns undefined.', right: '() => ({ a: 1 })', wrongCode: "const make = () => { id: 1 };\nmake(); // undefined", rightCode: "const make = () => ({ id: 1 });\nmake(); // { id: 1 }" }],
      },
    }),
    L('Scope: Global, Function & Block', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['scope', 'block', 'global'] } }),
    {
      title: 'Lab — FizzBuzz and a Grade Calculator',
      difficulty: 'easy', tags: ['lab', 'beginner'],
      explanation: t('Two classic warm-ups that exercise loops, conditions and functions — and the edge cases interviewers love.', 'Do classic warm-ups jo loops, conditions aur functions chalwate hain — aur wo edge cases jo interviewers ko pasand hain.'),
      dailyLifeExample: t('A teacher turning marks into grades: the same rule applied to every student.', 'Teacher marks ko grades mein badalta hai: har student pe wahi rule.'),
      keyPoints: ['Check the most specific condition first', 'Return early for invalid input'],
      quiz: [q('fizzbuzz: why test % 15 before % 3?', ['It is faster', 'Otherwise 15 matches % 3 first and prints Fizz', 'Required by JavaScript', 'It is not needed'], 1, 'Order conditions from most to least specific.')],
      lesson: {
        kind: 'lab', minutes: 30, badges: ['lab', 'coding'], searchTerms: ['lab', 'fizzbuzz', 'grades', 'loops'],
        lab: {
          goal: t('Write grade(marks) returning A/B/C/F, and fizzbuzz(n) returning an array.', 'grade(marks) likho jo A/B/C/F de, aur fizzbuzz(n) jo array de.'),
          starter: { language: JS, code: "function grade(marks) {\n  // 90+ A, 75+ B, 40+ C, else F; invalid (<0 or >100) → 'invalid'\n}\n\nfunction fizzbuzz(n) {\n  // [1, 2, 'Fizz', 4, 'Buzz', …]\n}\n\nconsole.log(grade(95), grade(80), grade(40), grade(12), grade(120));\nconsole.log(fizzbuzz(15));" },
          tasks: ['grade: validate range', 'grade: check from highest band down', 'fizzbuzz: loop 1..n', 'fizzbuzz: 15 before 3 and 5'],
          hints: [t('if (marks < 0 || marks > 100) return "invalid";', 'if (marks < 0 || marks > 100) return "invalid";'), t('% gives the remainder; i % 15 === 0 means divisible by both.', '% remainder deta hai; i % 15 === 0 matlab dono se divisible.')],
          expected: { checks: ["grade(95) → 'A'", "grade(40) → 'C'", "grade(120) → 'invalid'", "fizzbuzz(15)[14] → 'FizzBuzz'"] },
          solution: { language: JS, code: "function grade(marks) {\n  if (marks < 0 || marks > 100) return 'invalid';\n  if (marks >= 90) return 'A';\n  if (marks >= 75) return 'B';\n  if (marks >= 40) return 'C';\n  return 'F';\n}\n\nfunction fizzbuzz(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push('FizzBuzz');\n    else if (i % 3 === 0) out.push('Fizz');\n    else if (i % 5 === 0) out.push('Buzz');\n    else out.push(i);\n  }\n  return out;\n}" },
        },
      },
    },
  ],
};

/* ═══════════ 03 · CORE: ARRAYS, OBJECTS & STRINGS ═══════════ */

const data = {
  title: 'Arrays, Objects & Strings', stage: 3, band: 'core', level: 'beginner', estimatedMinutes: 180,
  description: t('The data structures every app is made of — and the methods you use daily.', 'Wo data structures jinse har app banta hai — aur roz use hone wale methods.'),
  concepts: [
    L('Arrays Basics', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['array', 'push', 'length', 'index'] } }),
    L('Array Methods: map, filter & reduce', {
      tags: ['arrays'],
      lesson: {
        kind: 'lesson', minutes: 25, badges: ['coding'],
        searchTerms: ['map', 'filter', 'reduce', 'array methods'],
        why: [t('Almost every screen is "take a list, keep some, change their shape, total them".', 'Lagbhag har screen "list lo, kuch rakho, shape badlo, total karo" hai.'), t('These three replace most hand-written for-loops, with fewer bugs.', 'Ye teen zyaadatar haath se likhe for-loops ki jagah lete hain, kam bugs ke saath.')],
        behind: { steps: [{ label: 'expenses[]', sub: '5 items' }, { label: 'filter', sub: 'food only' }, { label: 'map', sub: 'amounts' }, { label: 'reduce', sub: 'sum' }, '180'] },
        codeResult: { rows: [
          { code: "const expenses = [\n  { amt: 120, cat: 'food' },\n  { amt: 900, cat: 'rent' },\n  { amt: 60, cat: 'food' },\n];\nexpenses\n  .filter((e) => e.cat === 'food')\n  .map((e) => e.amt)\n  .reduce((sum, a) => sum + a, 0);", result: out('180') },
          { code: "expenses.reduce((acc, e) => {\n  acc[e.cat] = (acc[e.cat] ?? 0) + e.amt;\n  return acc;\n}, {});", result: out('{ food: 180, rent: 900 }') },
        ] },
        mistakes: [
          { wrong: 'Forgetting reduce\'s initial value', why: 'On an empty array it throws; on objects the first item becomes the accumulator.', right: 'Always pass the initial value: reduce(fn, 0) or reduce(fn, {}).' },
          { wrong: 'Using map for side effects', why: 'map builds an array you then throw away.', right: 'forEach for side effects, map to transform.' },
        ],
        challenge: { prompt: t('Total of all amounts.', 'Saare amounts ka total.'), code: 'expenses.____((sum, e) => sum + e.amt, 0);', options: ['map', 'filter', 'reduce', 'find'], answer: 2, language: JS, hints: [t('Many values in, one value out.', 'Kai values andar, ek value bahar.'), t('Which method takes an accumulator?', 'Kaunsa method accumulator leta hai?'), t('reduce(fn, initial).', 'reduce(fn, initial).')], explanation: t('reduce folds the list into one number.', 'reduce list ko ek number mein samet deta hai.') },
        summary: [t('filter keeps, map changes, reduce combines', 'filter rakhta, map badalta, reduce jodta'), t('None of them mutate the original', 'Koi bhi original nahi badalta'), t('Chain them', 'Inhe chain karo')],
      },
    }),
    L('More Array Methods: forEach, find, some, every & includes', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['find', 'some', 'every', 'includes', 'forEach'] } }),
    L('Slicing Arrays: slice vs splice', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['slice', 'splice', 'mutate'] } }),
    L('Objects & this', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['object', 'property', 'method', 'this'] } }),
    L('Object Methods: keys, values, entries & freeze', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['Object.keys', 'entries', 'freeze'] } }),
    L('Destructuring', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['destructuring', 'default', 'rename'] } }),
    L('Spread & Rest Operators', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['spread', 'rest', '...', 'copy'] } }),
    L('String Methods', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['split', 'trim', 'includes', 'replace'] } }),
    L('Template Literals', { lesson: { kind: 'lesson', minutes: 8, searchTerms: ['template literal', 'backtick', 'interpolation'] } }),
    {
      title: 'Lab — Shopping Cart Totals with Array Methods',
      difficulty: 'medium', tags: ['lab', 'arrays', 'objects'],
      explanation: t('A cart is the textbook array-of-objects problem: subtotal, discounts, grouping and formatting — no loops allowed.', 'Cart array-of-objects ka textbook problem hai: subtotal, discount, grouping aur formatting — loops allowed nahi.'),
      dailyLifeExample: t('The bill at a supermarket counter: each item × quantity, category offers, a final total.', 'Supermarket counter ka bill: har item × quantity, category offers, final total.'),
      keyPoints: ['map → reduce for totals', 'reduce into an object for grouping', 'Format money only at the end'],
      quiz: [q('Best method to check if ANY item is out of stock?', ['map', 'some', 'reduce', 'forEach'], 1, 'some stops at the first match and returns a boolean.')],
      lesson: {
        kind: 'lab', minutes: 40, badges: ['lab', 'coding'], searchTerms: ['lab', 'cart', 'reduce', 'group by'],
        lab: {
          goal: t('Implement subtotal, totalsByCategory and hasOutOfStock for a cart.', 'Cart ke liye subtotal, totalsByCategory aur hasOutOfStock banao.'),
          prerequisites: ['map / filter / reduce', 'Objects', 'Destructuring'],
          starter: { language: JS, code: "const cart = [\n  { name: 'Pen', price: 20, qty: 3, cat: 'stationery', inStock: true },\n  { name: 'Rice 5kg', price: 450, qty: 1, cat: 'grocery', inStock: true },\n  { name: 'Notebook', price: 60, qty: 2, cat: 'stationery', inStock: false },\n];\n\nconst subtotal = (items) => { /* sum of price * qty */ };\nconst totalsByCategory = (items) => { /* { stationery: 180, grocery: 450 } */ };\nconst hasOutOfStock = (items) => { /* true / false */ };\n\nconsole.log(subtotal(cart), totalsByCategory(cart), hasOutOfStock(cart));" },
          tasks: ['subtotal with map + reduce (or reduce alone)', 'totalsByCategory with reduce into {}', 'hasOutOfStock with some', 'Format ₹ with toLocaleString("en-IN")'],
          hints: [t('price * qty per item first.', 'Pehle har item ka price * qty.'), t('acc[cat] = (acc[cat] ?? 0) + value', 'acc[cat] = (acc[cat] ?? 0) + value'), t('items.some(({ inStock }) => !inStock)', 'items.some(({ inStock }) => !inStock)')],
          expected: { checks: ['subtotal(cart) → 630', 'totalsByCategory(cart) → { stationery: 180, grocery: 450 }', 'hasOutOfStock(cart) → true'] },
          solution: { language: JS, code: "const subtotal = (items) => items.reduce((s, { price, qty }) => s + price * qty, 0);\n\nconst totalsByCategory = (items) =>\n  items.reduce((acc, { cat, price, qty }) => {\n    acc[cat] = (acc[cat] ?? 0) + price * qty;\n    return acc;\n  }, {});\n\nconst hasOutOfStock = (items) => items.some(({ inStock }) => !inStock);\n\nconsole.log(`₹${subtotal(cart).toLocaleString('en-IN')}`);" },
          errors: [{ title: 'NaN total', fix: t('A price or qty is a string or undefined — check the data.', 'Koi price ya qty string ya undefined hai — data check karo.') }, { title: '[object Object] in output', fix: t('Logging an object inside a string; log it separately or JSON.stringify it.', 'String ke andar object log kiya; alag log karo ya JSON.stringify.') }],
        },
      },
    },
  ],
};

/* ═══════════ 04 · PRACTICAL: THE DOM ═══════════ */

const dom = {
  title: 'The DOM & Events', stage: 4, band: 'practical', level: 'intermediate', estimatedMinutes: 110,
  description: t('Change the page from JavaScript, react to users, and build your first interactive app.', 'JavaScript se page badlo, users pe react karo, aur pehla interactive app banao.'),
  concepts: [
    L('DOM Manipulation', {
      tags: ['dom'],
      lesson: {
        kind: 'lesson', minutes: 20, badges: ['coding'],
        searchTerms: ['dom', 'querySelector', 'createElement', 'textContent', 'classList'],
        where: [
          { app: 'Browser', path: ['DevTools', 'Elements'], note: t('Watch the DOM change live while your code runs.', 'Code chalte waqt DOM ko live badalte dekho.') },
          { app: 'VS Code', path: ['VS Code', 'project', 'index.html + app.js'] },
        ],
        views: {
          user: { text: t('The user sees a new item appear in the list.', 'User ko list mein naya item aata dikhta hai.'), result: { type: 'html', html: '<ul style="padding-left:18px"><li>Chai — ₹20</li><li><b>Lunch — ₹120</b></li></ul>', height: 80 } },
          developer: { text: t('The developer creates an element and appends it.', 'Developer element banata aur append karta hai.'), code: "const li = document.createElement('li');\nli.textContent = 'Lunch — ₹120';\nlist.append(li);", language: JS },
          technical: { text: t('The browser updates the DOM tree, recalculates styles and repaints.', 'Browser DOM tree update karta hai, styles recalc karta hai aur repaint.'), code: 'document\n └── body\n      └── ul#expense-list\n           ├── li  "Chai — ₹20"\n           └── li  "Lunch — ₹120"   ← new node', language: 'text' },
        },
        codeResult: { rows: [
          { code: "<button id=\"add\">Add</button>\n<p id=\"count\">0 items</p>\n\n<script type=\"module\">\n  let n = 0;\n  document.querySelector('#add')\n    .addEventListener('click', () => {\n      n++;\n      document.querySelector('#count').textContent = `${n} items`;\n    });\n</script>", language: 'html', result: { type: 'html', html: '<button id="add">Add</button><p id="count">0 items</p><script>let n=0;document.querySelector("#add").addEventListener("click",()=>{n++;document.querySelector("#count").textContent=n+" items"});</script>', height: 90 } },
        ] },
        mistakes: [{ wrong: 'Selecting elements before they exist', why: 'A classic <script> in <head> runs before <body> is parsed → null.', right: 'Use <script type="module">, which is deferred.' }],
      },
    }),
    L('Event Bubbling & Delegation', { tags: ['dom', 'events'], lesson: { kind: 'lesson', minutes: 18, searchTerms: ['event', 'bubbling', 'delegation', 'closest', 'target'] } }),
    {
      title: 'Lab — Build a Todo List',
      difficulty: 'medium', tags: ['lab', 'dom', 'project'],
      explanation: t('Mini project 1: a todo list with add, complete, delete and persistence. It uses the pattern the final project scales up — one state array, one render function.', 'Mini project 1: add, complete, delete aur persistence wala todo list. Isme wahi pattern hai jo final project bada karta hai — ek state array, ek render function.'),
      dailyLifeExample: t('A whiteboard where you rewrite the whole list each time something changes — simple, and never out of sync.', 'Whiteboard jahan kuch badle toh poori list dobara likho — simple, aur kabhi out of sync nahi.'),
      keyPoints: ['State → render()', 'Event delegation for dynamic items', 'textContent for user text', 'localStorage for persistence'],
      quiz: [q('Why one click listener on the <ul> instead of one per button?', ['Faster to type', 'It also works for items added later (event delegation)', 'Required by the DOM', 'Buttons cannot have listeners'], 1, 'Events bubble to the parent, which handles every current and future item.')],
      lesson: {
        kind: 'lab', minutes: 60, badges: ['lab', 'coding', 'project'], searchTerms: ['todo', 'lab', 'dom', 'localStorage', 'delegation'],
        build: { text: t('A working todo app, saved in the browser.', 'Browser mein save hone wala todo app.'), flow: { steps: ['state[]', 'render()', 'form submit → add', 'click → toggle / delete', 'localStorage'] } },
        lab: {
          goal: t('Build a todo list where items survive a page reload.', 'Aisa todo list jiske items page reload ke baad bhi rahein.'),
          prerequisites: ['DOM Manipulation', 'Event Bubbling & Delegation', 'LocalStorage & SessionStorage'],
          starter: { language: 'html', code: "<form id=\"new\"><input name=\"title\" placeholder=\"New task\" required /><button>Add</button></form>\n<ul id=\"list\"></ul>\n<script>\n  let todos = [];\n  const list = document.querySelector('#list');\n  function render() {\n    list.innerHTML = '';\n    // for each todo: <li> with text, a toggle, a delete button\n  }\n  document.querySelector('#new').addEventListener('submit', (e) => {\n    e.preventDefault();\n    // add, render, clear input\n  });\n  render();\n</script>" },
          tasks: ['Add on submit (preventDefault)', 'Render with createElement + textContent', 'Toggle done via delegation', 'Delete via delegation', 'Save to / load from localStorage'],
          hints: [t('Give each button data-id and data-action.', 'Har button ko data-id aur data-action do.'), t('list.addEventListener("click", e => e.target.closest("button"))', 'list.addEventListener("click", e => e.target.closest("button"))'), t('Call save() inside every state change, then render().', 'Har state change mein save(), phir render().')],
          expected: { checks: ['Adding shows the item', 'Clicking toggles strike-through', 'Delete removes it', 'Reload keeps the list', 'Typing <b>hi</b> shows the tags as text'] },
          solution: { language: 'javascript', filename: 'todo.js', code: "let todos = JSON.parse(localStorage.getItem('todos') ?? '[]');\nconst list = document.querySelector('#list');\nconst save = () => localStorage.setItem('todos', JSON.stringify(todos));\n\nfunction render() {\n  list.replaceChildren(...todos.map((t) => {\n    const li = document.createElement('li');\n    li.style.textDecoration = t.done ? 'line-through' : '';\n    const span = document.createElement('span');\n    span.textContent = t.title;\n    const toggle = Object.assign(document.createElement('button'), { textContent: '✓' });\n    toggle.dataset.action = 'toggle'; toggle.dataset.id = t.id;\n    const del = Object.assign(document.createElement('button'), { textContent: '✕' });\n    del.dataset.action = 'delete'; del.dataset.id = t.id;\n    li.append(span, toggle, del);\n    return li;\n  }));\n}\n\ndocument.querySelector('#new').addEventListener('submit', (e) => {\n  e.preventDefault();\n  const title = e.target.title.value.trim();\n  if (!title) return;\n  todos = [...todos, { id: crypto.randomUUID(), title, done: false }];\n  save(); render(); e.target.reset();\n});\n\nlist.addEventListener('click', (e) => {\n  const btn = e.target.closest('button');\n  if (!btn) return;\n  const { id, action } = btn.dataset;\n  todos = action === 'delete'\n    ? todos.filter((t) => t.id !== id)\n    : todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));\n  save(); render();\n});\n\nrender();", explain: t('State is the single source of truth; the DOM is redrawn from it after every change.', 'State hi single source of truth hai; har change ke baad DOM usi se dobara banta hai.') },
          errors: [{ title: 'Page reloads on submit', fix: t('Call e.preventDefault() in the submit handler.', 'Submit handler mein e.preventDefault() lagao.') }, { title: 'Delete works only for the first items', fix: t('You attached listeners per button at startup — use delegation on the list.', 'Startup pe har button pe listener lagaya — list pe delegation use karo.') }],
        },
      },
    },
  ],
};

/* ═══════════ 05 · PRACTICAL: DATA, STORAGE & APIS ═══════════ */

const apis = {
  title: 'Data, Storage & APIs', stage: 5, band: 'practical', level: 'intermediate', estimatedMinutes: 140,
  description: t('JSON, storage, fetch, modules and timers — how real apps get and keep data.', 'JSON, storage, fetch, modules aur timers — asli apps data kaise laate aur rakhte hain.'),
  concepts: [
    L('JSON: stringify & parse', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['json', 'stringify', 'parse'] } }),
    L('LocalStorage & SessionStorage', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['localStorage', 'sessionStorage', 'persist'] } }),
    L('Fetch API: Talking to a Server', {
      tags: ['fetch'],
      lesson: {
        kind: 'lesson', minutes: 25, badges: ['coding'],
        searchTerms: ['fetch', 'api', 'http', 'json', 'request', 'response', 'status'],
        views: {
          user: { text: t('The user sees a loading message, then a list of users — or a friendly error.', 'User ko loading message, phir users ki list — ya ek friendly error dikhta hai.') },
          developer: { text: t('The developer calls fetch, checks res.ok and parses JSON.', 'Developer fetch call karta hai, res.ok check karta hai aur JSON parse karta hai.'), code: "const res = await fetch('https://jsonplaceholder.typicode.com/users');\nif (!res.ok) throw new Error(`HTTP ${res.status}`);\nconst users = await res.json();", language: JS },
          technical: { text: t('HTTP GET → server responds with status, headers and a JSON body; the browser enforces CORS for cross-origin requests.', 'HTTP GET → server status, headers aur JSON body ke saath jawab deta hai; cross-origin requests pe browser CORS lagata hai.'), result: { type: 'json', value: { status: 200, headers: { 'content-type': 'application/json; charset=utf-8' }, body: [{ id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' }] } } },
        },
        where: [{ app: 'Browser', path: ['DevTools', 'Network', 'Fetch/XHR', 'click the request'], note: t('Headers, response body and timing for every call.', 'Har call ke headers, response body aur timing.') }],
        codeResult: { rows: [{ code: 'GET https://jsonplaceholder.typicode.com/users/1', language: 'text', result: { type: 'json', value: { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' } } }] },
        mistakes: [{ wrong: 'Treating a 404 as success', why: 'fetch resolves for any HTTP response; only network errors reject.', right: 'if (!res.ok) throw new Error(`HTTP ${res.status}`)' }],
        debug: [{ title: t('CORS error in the console', 'Console mein CORS error'), problem: t('The browser blocked the response.', 'Browser ne response block kiya.'), symptoms: ["…has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header…"], where: ['Network tab → response headers'], causes: ['The API does not allow your origin'], fix: t('Fix on the server (allow the origin) or call it from your own backend.', 'Server pe theek karo (origin allow) ya apne backend se call karo.'), prevention: t('Know which APIs are browser-callable before you design around them.', 'Design karne se pehle jaano kaunsi APIs browser se call ho sakti hain.') }],
      },
    }),
    L('Modules (import / export)', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['import', 'export', 'module', 'es modules'] } }),
    L('Optional Chaining & Nullish Coalescing', { lesson: { kind: 'lesson', minutes: 8, searchTerms: ['?.', '??', 'optional chaining', 'nullish'] } }),
    L('Timers: setTimeout & setInterval', { lesson: { kind: 'lesson', minutes: 8, searchTerms: ['setTimeout', 'setInterval', 'timer'] } }),
    L('Regular Expressions Basics', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['regex', 'test', 'match', 'validation'] } }),
    {
      title: 'Lab — Fetch and Render Users',
      difficulty: 'medium', tags: ['lab', 'fetch', 'async'],
      explanation: t('Mini project 2: fetch real data from a public API and render it with loading, error and empty states — the three states every real screen has.', 'Mini project 2: public API se asli data fetch karke loading, error aur empty states ke saath render karo — wo teen states jo har asli screen mein hote hain.'),
      dailyLifeExample: t('Ordering food on an app: "placing order…", then either your order or "restaurant closed" — never a blank screen.', 'App pe khana order karna: "order ho raha hai…", phir ya toh order ya "restaurant band" — kabhi khaali screen nahi.'),
      keyPoints: ['loading → data | error', 'res.ok check', 'Search with filter on the fetched array'],
      quiz: [q('Where should the loading message be removed?', ['Only in try', 'In finally, so it clears on success and failure', 'Never', 'In catch only'], 1, 'finally runs in both cases.')],
      lesson: {
        kind: 'lab', minutes: 45, badges: ['lab', 'coding'], searchTerms: ['lab', 'fetch', 'users', 'loading', 'error state'],
        lab: {
          goal: t('Show users from jsonplaceholder with loading, error and search.', 'jsonplaceholder se users dikhao — loading, error aur search ke saath.'),
          starter: { language: 'html', code: "<input id=\"q\" placeholder=\"Search\" />\n<p id=\"status\"></p>\n<ul id=\"users\"></ul>\n<script type=\"module\">\n  const status = document.querySelector('#status');\n  let users = [];\n  async function load() {\n    // status: Loading… → fetch → render → handle errors → clear status\n  }\n  load();\n</script>" },
          tasks: ['Show "Loading…"', 'fetch + res.ok check', 'Render names and emails', 'Show an error message on failure', 'Filter as the user types'],
          hints: [t('try { … } catch (e) { … } finally { … }', 'try { … } catch (e) { … } finally { … }'), t('Keep the fetched array; filter it for search instead of refetching.', 'Fetched array rakho; search ke liye use filter karo, dobara fetch nahi.'), t('Test the error path by changing the URL to a typo.', 'URL mein typo karke error path test karo.')],
          expected: { checks: ['10 users render', 'Typing "le" filters the list', 'A wrong URL shows an error, not a blank page'] },
          solution: { language: 'javascript', code: "const status = document.querySelector('#status');\nconst listEl = document.querySelector('#users');\nlet users = [];\n\nfunction render(list) {\n  listEl.replaceChildren(...list.map((u) => {\n    const li = document.createElement('li');\n    li.textContent = `${u.name} — ${u.email}`;\n    return li;\n  }));\n  if (!list.length) status.textContent = 'No users match.';\n}\n\nasync function load() {\n  status.textContent = 'Loading…';\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/users');\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    users = await res.json();\n    status.textContent = '';\n    render(users);\n  } catch (err) {\n    status.textContent = `Could not load users (${err.message}).`;\n  }\n}\n\ndocument.querySelector('#q').addEventListener('input', (e) => {\n  const q = e.target.value.toLowerCase();\n  render(users.filter((u) => u.name.toLowerCase().includes(q)));\n});\n\nload();" },
        },
      },
    },
  ],
};

/* ═══════════ 06 · ADVANCED: ASYNC ═══════════ */

const async = {
  title: 'Asynchronous JavaScript', stage: 6, band: 'advanced', level: 'intermediate', estimatedMinutes: 110,
  description: t('Promises, async/await, the event loop and running things in parallel.', 'Promises, async/await, event loop aur cheezein parallel chalana.'),
  concepts: [
    L('Synchronous vs Asynchronous', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['sync', 'async', 'blocking'] } }),
    L('Promises', { lesson: { kind: 'lesson', minutes: 18, searchTerms: ['promise', 'then', 'catch', 'resolve', 'reject'] } }),
    L('async / await', {
      lesson: {
        kind: 'lesson', minutes: 18, badges: ['coding'], searchTerms: ['async', 'await', 'try catch'],
        codeResult: { rows: [{ code: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');", result: out('1\n4\n3\n2') }] },
        mistakes: [{ wrong: 'await inside forEach', why: 'forEach ignores returned promises — nothing waits.', right: 'for…of with await, or Promise.all(items.map(fn))', wrongCode: 'ids.forEach(async (id) => { await save(id); });\nconsole.log("done"); // runs before saves finish', rightCode: 'await Promise.all(ids.map(save));\nconsole.log("done");' }],
        challenge: { prompt: t('Run both requests at the same time.', 'Dono requests ek saath chalao.'), code: 'const [user, expenses] = await Promise.____([getUser(), getExpenses()]);', options: ['all', 'race', 'resolve', 'then'], answer: 0, language: JS, hints: [t('You need BOTH results.', 'DONO results chahiye.'), t('race returns only the first.', 'race sirf pehla deta hai.')], explanation: t('Promise.all waits for all and keeps order.', 'Promise.all sabka intezaar karta hai aur order rakhta hai.') },
      },
    }),
    L('The Event Loop', { lesson: { kind: 'lesson', minutes: 18, searchTerms: ['event loop', 'microtask', 'macrotask', 'call stack'], behind: { title: t('Where each callback waits', 'Har callback kahan intezaar karta hai'), steps: ['Call stack', { label: 'Microtasks', sub: 'promises' }, { label: 'Macrotasks', sub: 'setTimeout, events' }, 'Render'] } } }),
    L('Promise Combinators: all, race, allSettled & any', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['Promise.all', 'allSettled', 'race', 'any'] } }),
  ],
};

/* ═══════════ 07 · ADVANCED: FUNCTIONS IN DEPTH ═══════════ */

const functions = {
  title: 'Functions in Depth', stage: 7, band: 'advanced', level: 'intermediate', estimatedMinutes: 140,
  description: t('Closures, higher-order functions, this, binding, hoisting and the call stack.', 'Closures, higher-order functions, this, binding, hoisting aur call stack.'),
  concepts: [
    L('Closures', { lesson: { kind: 'lesson', minutes: 18, searchTerms: ['closure', 'lexical scope', 'private'] } }),
    L('Higher-Order Functions', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['higher-order', 'callback'] } }),
    L('Callbacks', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['callback', 'callback hell'] } }),
    L('Recursion', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['recursion', 'base case', 'call stack'] } }),
    L('IIFE (Immediately Invoked Function Expression)', { lesson: { kind: 'lesson', minutes: 8, searchTerms: ['iife'] } }),
    L('Understanding this', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['this', 'context'] } }),
    L('call, apply & bind', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['call', 'apply', 'bind'] } }),
    L('Hoisting', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['hoisting', 'TDZ', 'temporal dead zone'] } }),
    L('Execution Context & Call Stack', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['execution context', 'call stack'] } }),
  ],
};

/* ═══════════ 08 · ADVANCED: OBJECTS, CLASSES & PATTERNS ═══════════ */

const objects = {
  title: 'Objects, Classes & Patterns', stage: 8, band: 'advanced', level: 'intermediate', estimatedMinutes: 140,
  description: t('Prototypes, classes, functional style, collections, generators and design patterns.', 'Prototypes, classes, functional style, collections, generators aur design patterns.'),
  concepts: [
    L('Prototypes & the Prototype Chain', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['prototype', 'inheritance'] } }),
    L('Classes', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['class', 'constructor', 'extends', 'private'] } }),
    L('Pure Functions & Immutability', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['pure', 'immutable', 'side effect'] } }),
    L('Currying & Composition', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['curry', 'compose', 'pipe'] } }),
    L('Generators & Iterators', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['generator', 'yield', 'iterator'] } }),
    L('Map, Set, WeakMap & WeakSet', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['Map', 'Set', 'WeakMap'] } }),
    L('Symbols', { lesson: { kind: 'lesson', minutes: 10, searchTerms: ['symbol'] } }),
    L('Proxy & Reflect', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['proxy', 'reflect'] } }),
    L('Common Design Patterns: Singleton, Observer & Module', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['singleton', 'observer', 'module pattern', 'design patterns'] } }),
  ],
};

/* ═══════════ 09 · DEBUGGING ═══════════ */

const BROKEN = [
  { title: t('Script 1 — the button does nothing', 'Script 1 — button kuch nahi karta'), symptom: "Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')", problem: t('The listener is attached to null.', 'Listener null pe laga.'), symptoms: ['No reaction to clicks', 'Error on page load'], where: ['Console → file:line', 'Elements panel: does #save exist yet?'], causes: ['<script> in <head> without defer'], fix: t('Use type="module" (deferred) or move the script to the end of <body>.', 'type="module" (deferred) ya script body ke end mein.'), code: { filename: 'index.html', language: 'html', code: '<script type="module" src="./app.js"></script>' }, prevention: t('Always load app code as a module.', 'App code hamesha module ki tarah load karo.') },
  { title: t('Script 2 — total shows 12030', 'Script 2 — total 12030 dikhata hai'), symptom: 'Total: 12030', problem: t('String concatenation instead of addition.', 'Addition ki jagah string jodna.'), symptoms: ['Numbers glued together'], where: ['console.log(typeof amt)'], causes: ['input.value is a string'], fix: t('Number(input.value) and validate.', 'Number(input.value) aur validate.'), prevention: t('Parse input once, at submit.', 'Input submit pe ek baar parse karo.') },
  { title: t('Script 3 — list is empty though the API works', 'Script 3 — API chal rahi par list khaali'), symptom: '(no error)', problem: t('render() ran before the data arrived.', 'Data aane se pehle render() chal gaya.'), symptoms: ['Network tab shows 200 with data', 'UI shows nothing'], where: ['Set a breakpoint in render() and in the fetch callback — which runs first?'], causes: ['Missing await', 'render() not called after data'], fix: t('await the fetch, then render.', 'fetch ko await karo, phir render.'), prevention: t('Render from state after every state change.', 'Har state change ke baad state se render.') },
  { title: t('Script 4 — "saved" logs before saves finish', 'Script 4 — saves khatam hone se pehle "saved" log'), symptom: 'saved', problem: t('await inside forEach does not wait.', 'forEach ke andar await wait nahi karta.'), symptoms: ['Order of logs is wrong', 'Data missing right after "saved"'], where: ['Add logs with timestamps'], causes: ['forEach(async …)'], fix: t('await Promise.all(items.map(save))', 'await Promise.all(items.map(save))'), prevention: t('Never use forEach with async callbacks.', 'Async callbacks ke saath forEach kabhi nahi.') },
  { title: t('Script 5 — delete removes the wrong item', 'Script 5 — delete galat item hatata hai'), symptom: '(no error)', problem: t('Deleting by index after the list was filtered.', 'List filter hone ke baad index se delete.'), symptoms: ['Works until you filter, then deletes a different item'], where: ['Log the index and the item it points to'], causes: ['Index refers to the filtered array, splice runs on the full array'], fix: t('Delete by a stable id: todos.filter((t) => t.id !== id).', 'Stable id se delete: todos.filter((t) => t.id !== id).'), prevention: t('Give every record an id; never key actions on a visual index.', 'Har record ko id do; actions visual index pe mat tikao.') },
];

const debugging = {
  title: 'Debugging JavaScript', stage: 9, band: 'debugging', level: 'advanced', estimatedMinutes: 100,
  description: t('Read errors, use DevTools like a professional, and fix five broken scripts.', 'Errors padho, DevTools professional ki tarah use karo, aur paanch toote scripts theek karo.'),
  concepts: [
    L('Error Handling: try / catch / finally', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['try', 'catch', 'finally', 'throw', 'error'] } }),
    {
      title: 'Debugging with DevTools — Console, Breakpoints and Network',
      difficulty: 'medium', tags: ['debugging', 'intermediate'],
      explanation: t(
        "console.log is a flashlight; the debugger is the lights on. Professionals use both, in this order.\n\n1. READ the error: type, message, and the file:line link. Click it.\n2. REPRODUCE it reliably — what exact clicks cause it?\n3. PAUSE: set a breakpoint on the line (Sources panel, click the line number) or write `debugger;`. Reload or repeat the action. Execution stops there; hover variables, look at the Scope pane and the Call Stack.\n4. STEP: step over (F10) and into (F11) to watch values change.\n5. For anything network: the Network tab shows the request, status, headers, response body and timing.\n6. FIX one thing, re-test, remove the debugger statements.\n\nMost bugs are a value that is not what you think it is. The debugger shows you what it actually is.",
        "console.log torch hai; debugger poori lights. Professionals dono use karte hain, is order mein.\n\n1. Error PADHO: type, message, aur file:line link. Us pe click karo.\n2. Reliably REPRODUCE karo — kaunse exact clicks se aata hai?\n3. PAUSE: line pe breakpoint lagao (Sources panel, line number pe click) ya `debugger;` likho. Reload ya action dohrao. Execution wahan rukta hai; variables pe hover karo, Scope pane aur Call Stack dekho.\n4. STEP: step over (F10) aur into (F11) se values badalte dekho.\n5. Network wali cheez ke liye: Network tab request, status, headers, response body aur timing dikhata hai.\n6. Ek cheez FIX karo, dobara test karo, debugger statements hatao.\n\nZyaadatar bugs ek aisi value hai jo wo nahi jo tum soch rahe ho. Debugger dikhata hai wo asli mein kya hai."
      ),
      dailyLifeExample: t('A doctor does not guess from a distance: they check the pulse at the exact moment (breakpoint), look at reports (Network) and ask what happened first (call stack).', 'Doctor door se andaaza nahi lagata: bilkul us waqt nabz dekhta hai (breakpoint), reports dekhta hai (Network) aur poochta hai pehle kya hua (call stack).'),
      keyPoints: ['Read → reproduce → pause → step → fix', 'Breakpoints beat logs for tricky state', 'Network tab for every API problem'],
      quiz: [
        q('The UI is empty; the API returns data. Fastest check?', ['Rewrite the fetch', 'Network tab to confirm the response, then a breakpoint in render()', 'Clear the cache', 'Add more CSS'], 1, 'Confirm the data, then pause where it should be used.'),
        q('What does the `debugger;` statement do with DevTools open?', ['Nothing', 'Pauses execution on that line', 'Logs the stack', 'Deletes the line'], 1, 'It acts as a breakpoint.'),
      ],
      lesson: {
        kind: 'lesson', minutes: 25, badges: ['debugging', 'hands-on'],
        searchTerms: ['devtools', 'breakpoint', 'debugger', 'network tab', 'console', 'sources', 'call stack'],
        where: [
          { app: 'Browser', path: ['DevTools', 'Sources', 'your file', 'click a line number'], note: t('Sets a breakpoint.', 'Breakpoint lagata hai.') },
          { app: 'Browser', path: ['DevTools', 'Network', 'Fetch/XHR'] },
          { app: 'Browser', path: ['DevTools', 'Console', 'click file:line'] },
        ],
        behind: { title: t('The debugging loop', 'Debugging loop'), steps: ['Read error', 'Reproduce', 'Pause', 'Inspect', 'Fix', 'Re-test'] },
        steps: [
          { title: t('Open the Todo lab from module 04 and open DevTools', 'Module 04 ka Todo lab kholo aur DevTools kholo') },
          { title: t('Sources → set a breakpoint inside the click handler', 'Sources → click handler ke andar breakpoint lagao') },
          { title: t('Click a delete button; inspect btn.dataset in the Scope pane', 'Delete button dabao; Scope pane mein btn.dataset dekho') },
          { title: t('Step over (F10) until the filter line; watch todos change', 'F10 se filter line tak jaao; todos badalte dekho') },
          { title: t('Network tab: reload the Users lab and open the users request', 'Network tab: Users lab reload karo aur users request kholo') },
        ],
        expected: { checks: ['Paused on a breakpoint', 'Inspected a variable in Scope', 'Read a response in Network'] },
      },
    },
    {
      title: 'Debugging Lab — Five Broken Scripts',
      difficulty: 'medium', tags: ['lab', 'debugging'],
      explanation: t('Five small scripts, five realistic bugs. For each one: guess the cause from the symptom first, then open the walkthrough. The process — not the answer — is what you are practising.', 'Paanch chhote scripts, paanch asli bugs. Har ek ke liye: pehle symptom se wajah guess karo, phir walkthrough kholo. Practice process ki ho rahi hai — answer ki nahi.'),
      dailyLifeExample: t('A mechanic listening to an engine: the sound (symptom) points to the part (root cause) before anything is opened.', 'Mechanic engine sunta hai: aawaz (symptom) kuch kholne se pehle part (root cause) ki taraf ishaara karti hai.'),
      keyPoints: ['Symptom → inspect → root cause → fix → prevention', 'Silent bugs (no error) are the hardest — use breakpoints'],
      quiz: [
        q('Delete removes the wrong item only after filtering. Root cause?', ['CSS', 'Deleting by index of the filtered list', 'localStorage full', 'Event bubbling'], 1, 'Use stable ids.'),
        q('"saved" logs before the saves finish. Root cause?', ['await inside forEach', 'Missing semicolon', 'Wrong URL', 'CORS'], 0, 'forEach does not wait for promises.'),
      ],
      lesson: { kind: 'lab', minutes: 40, badges: ['lab', 'debugging'], searchTerms: ['debugging lab', 'broken', 'bugs', 'fix'], debug: BROKEN, where: [{ app: 'Browser', path: ['/courses/javascript/toolkit/errors'], note: t('The full error database.', 'Poora error database.') }] },
    },
  ],
};

/* ═══════════ 10 · PERFORMANCE & SECURITY ═══════════ */

const perf = {
  title: 'Performance & Security', stage: 10, band: 'performance', level: 'advanced', estimatedMinutes: 90,
  description: t('Debounce, memoize, avoid leaks — and keep user input from becoming an attack.', 'Debounce, memoize, leaks se bacho — aur user input ko attack banne se roko.'),
  concepts: [
    L('Debounce & Throttle', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['debounce', 'throttle', 'performance', 'search input'] } }),
    L('Memoization', { lesson: { kind: 'lesson', minutes: 12, searchTerms: ['memoize', 'cache'] } }),
    L('Garbage Collection & Memory Leaks', { lesson: { kind: 'lesson', minutes: 15, searchTerms: ['memory leak', 'garbage collection', 'removeEventListener'] } }),
    {
      title: 'Security — XSS and Safe DOM Updates',
      difficulty: 'medium', tags: ['security', 'dom', 'intermediate'],
      explanation: t(
        "Cross-site scripting (XSS) happens when text a user typed is inserted into the page as HTML, and the browser runs it. In frontend JavaScript the usual cause is one line: element.innerHTML = somethingFromAUser.\n\nThe rule: user data goes in with textContent (or setAttribute for attributes), never innerHTML. If you genuinely need to render user-supplied HTML — a rich-text comment — sanitise it with a well-maintained library first.\n\nTwo related habits: do not put secrets (API keys, tokens) in frontend code, because anyone can read it in DevTools; and do not store auth tokens in localStorage when an httpOnly cookie is an option, because any script on the page — including an injected one — can read localStorage.",
        "Cross-site scripting (XSS) tab hota hai jab user ka type kiya text page mein HTML ki tarah daala jaata hai, aur browser use chala deta hai. Frontend JavaScript mein aam wajah ek line hai: element.innerHTML = kuchUserSe.\n\nRule: user data textContent (ya attributes ke liye setAttribute) se daalo, innerHTML se kabhi nahi. Agar sach mein user ka HTML render karna hai — rich-text comment — toh pehle ek achhi maintained library se sanitise karo.\n\nDo judi aadatein: frontend code mein secrets (API keys, tokens) mat daalo, kyunki DevTools mein koi bhi padh sakta hai; aur jab httpOnly cookie ka option ho toh auth tokens localStorage mein mat rakho, kyunki page ka koi bhi script — injected wala bhi — localStorage padh sakta hai."
      ),
      dailyLifeExample: t('A shopkeeper writing a customer\'s message on the notice board exactly as written, versus reading it out as an instruction to the staff. textContent writes it down; innerHTML obeys it.', 'Dukaandar customer ka message notice board pe waise hi likhta hai, ya use staff ko instruction ki tarah padh deta hai. textContent likhta hai; innerHTML maan leta hai.'),
      keyPoints: ['textContent for user data', 'Sanitise if you must render user HTML', 'No secrets in frontend code', 'Tokens in httpOnly cookies, not localStorage'],
      quiz: [
        q('Which line is an XSS risk?', ['el.textContent = comment', 'el.innerHTML = comment', 'el.setAttribute("title", comment)', 'console.log(comment)'], 1, 'innerHTML parses and can execute injected handlers.'),
        q('Why is an API secret in frontend JavaScript never secret?', ['It expires', 'Anyone can read shipped code in DevTools', 'Browsers delete it', 'It is encrypted'], 1, 'Everything you ship to the browser is public.'),
      ],
      interviewQuestions: [
        iq({
          question: 'How do you prevent XSS in a vanilla JavaScript app?',
          difficulty: 'medium',
          short: t('Never insert user data with innerHTML; use textContent / setAttribute, sanitise any HTML you must render, and add a Content-Security-Policy.', 'User data innerHTML se kabhi nahi; textContent / setAttribute use karo, jo HTML render karna hi hai use sanitise karo, aur Content-Security-Policy lagao.'),
          deep: t('XSS is an injection problem: data crossing into code. The DOM APIs that treat input as text are safe by construction. A CSP limits damage if something slips through by blocking inline scripts and unknown origins.', 'XSS injection problem hai: data ka code mein ghusna. Jo DOM APIs input ko text maanti hain wo design se safe hain. CSP inline scripts aur anjaan origins block karke nuksaan kam karta hai agar kuch nikal jaaye.'),
          code: { code: "// ❌\nel.innerHTML = `<p>${comment}</p>`;\n// ✅\nconst p = document.createElement('p');\np.textContent = comment;\nel.append(p);" },
          tip: t('Mention CSP as defence in depth, not the first line.', 'CSP ko defence in depth bolo, pehli line nahi.'),
        }),
      ],
      lesson: {
        kind: 'lesson', minutes: 20, badges: ['coding'],
        searchTerms: ['xss', 'security', 'innerHTML', 'textContent', 'sanitize', 'csp', 'secrets'],
        codeResult: { rows: [
          { code: "const comment = '<img src=x onerror=\"alert(1)\">';\nel.textContent = comment;", result: { type: 'html', html: '<p>&lt;img src=x onerror="alert(1)"&gt;</p>', height: 60 }, note: t('Shown as harmless text.', 'Harmless text ki tarah dikhta hai.') },
          { code: "el.innerHTML = comment;   // ❌", result: { type: 'text', text: t('The browser creates an <img>, the load fails, onerror runs the attacker\'s code.', 'Browser <img> banata hai, load fail hota hai, onerror attacker ka code chala deta hai.') } },
        ] },
        mistakes: [{ wrong: 'Template strings into innerHTML', why: 'Interpolating user data into HTML strings is the same bug with nicer syntax.', right: 'Build nodes with createElement + textContent.' }],
      },
    },
  ],
};

/* ═══════════ 11 · TOOLING & DEPLOYMENT ═══════════ */

const deploy = {
  title: 'Tooling & Deployment', stage: 11, band: 'deployment', level: 'advanced', estimatedMinutes: 90,
  description: t('npm, Vite, ES modules, tests and shipping a static site.', 'npm, Vite, ES modules, tests aur static site ship karna.'),
  concepts: [
    {
      title: 'Project Setup — npm, Vite and ES Modules',
      difficulty: 'medium', tags: ['deployment', 'intermediate'],
      explanation: t(
        "Real projects are not one app.js. They have dependencies (npm), a dev server that reloads on save, a build step that bundles and minifies, and ES modules to split code into files. Vite gives you all of that with one command and almost no configuration.\n\nThe workflow: create the project, run the dev server while you work, and run the build to produce the dist/ folder you deploy. package.json records the scripts and dependencies; node_modules is never committed.",
        "Asli projects ek app.js nahi hote. Unme dependencies (npm), save pe reload karne wala dev server, bundle aur minify karne wala build step, aur code ko files mein todne ke liye ES modules hote hain. Vite ye sab ek command aur lagbhag bina configuration ke deta hai.\n\nWorkflow: project banao, kaam karte waqt dev server chalao, aur deploy karne wala dist/ folder banane ke liye build chalao. package.json scripts aur dependencies record karta hai; node_modules kabhi commit nahi hota."
      ),
      dailyLifeExample: t('A tiffin service: you cook in your kitchen (dev server), pack it neatly into boxes (build), and send the boxes, not the kitchen (dist/).', 'Tiffin service: kitchen mein pakao (dev server), dabbon mein saaf pack karo (build), aur dabbe bhejo, kitchen nahi (dist/).'),
      keyPoints: ['npm create vite@latest', 'npm run dev while working', 'npm run build → dist/', 'Commit package.json and the lockfile, never node_modules'],
      quiz: [q('What do you deploy for a Vite vanilla app?', ['node_modules', 'The src folder', 'The dist/ folder from npm run build', 'package.json only'], 2, 'The build output is the static site.')],
      lesson: {
        kind: 'lesson', minutes: 25, badges: ['coding', 'hands-on'], version: 'Node.js 20+ LTS · Vite (current)',
        searchTerms: ['npm', 'vite', 'build', 'dev server', 'package.json', 'modules'],
        where: [{ app: 'Terminal', path: ['project folder', 'npm run dev'] }, { app: 'VS Code', path: ['VS Code', 'package.json', 'scripts'] }],
        codeResult: { rows: [
          { code: 'npm create vite@latest expense-tracker -- --template vanilla', language: 'bash', result: out('Scaffolding project in ./expense-tracker...\nDone. Now run:\n  cd expense-tracker\n  npm install\n  npm run dev') },
          { code: 'npm run dev', language: 'bash', result: out('  VITE ready\n  ➜  Local:   http://localhost:5173/') },
          { code: 'npm run build', language: 'bash', result: out('dist/index.html\ndist/assets/index-[hash].js\n✓ built') },
        ], codeLabel: 'Terminal command', resultLabel: 'Expected output' },
        mistakes: [{ wrong: 'Committing node_modules', why: 'Huge, platform-specific, and recreated by npm install.', right: 'Add node_modules/ and dist/ to .gitignore.' }],
      },
    },
    {
      title: 'Testing Pure Functions with Vitest',
      difficulty: 'medium', tags: ['testing', 'intermediate'],
      explanation: t(
        "Testing starts with the easy part: pure functions — same input, same output, no DOM. Your totals, formatting and validation logic are exactly that. Pull them into their own module, and a test runner such as Vitest checks them in milliseconds every time you save.\n\nThis is unit testing. Integration tests (does the form add a row?) and end-to-end tests (does the deployed app work in a real browser?) come later; for a vanilla app, well-tested pure functions catch most of the bugs that matter.",
        "Testing aasaan hisse se shuru hoti hai: pure functions — same input, same output, koi DOM nahi. Tumhare totals, formatting aur validation logic bilkul yahi hain. Unhe apne module mein nikaalo, aur Vitest jaisa test runner har save pe milliseconds mein check karta hai.\n\nYe unit testing hai. Integration tests (form row add karta hai?) aur end-to-end tests (deployed app asli browser mein chalta hai?) baad mein; vanilla app ke liye achhe tested pure functions zaroori bugs ka zyaada hissa pakad lete hain."
      ),
      dailyLifeExample: t('Checking the calculator before an exam, not after the results come out.', 'Exam se pehle calculator check karna, result aane ke baad nahi.'),
      keyPoints: ['Test pure logic first', 'describe / it / expect', 'Run on every save'],
      quiz: [q('Which is easiest to unit test?', ['A click handler that edits the DOM', 'totalsByCategory(expenses)', 'A fetch call', 'CSS'], 1, 'Pure input → output.')],
      lesson: {
        kind: 'lesson', minutes: 20, badges: ['coding'], version: 'Vitest (current)',
        searchTerms: ['test', 'vitest', 'unit test', 'expect', 'testing'],
        files: [
          { filename: 'src/totals.js', language: JS, code: 'export const totalsByCategory = (items) =>\n  items.reduce((acc, { category, amount }) => {\n    acc[category] = (acc[category] ?? 0) + amount;\n    return acc;\n  }, {});' },
          { filename: 'src/totals.test.js', language: JS, code: "import { describe, it, expect } from 'vitest';\nimport { totalsByCategory } from './totals.js';\n\ndescribe('totalsByCategory', () => {\n  it('sums per category', () => {\n    const items = [\n      { category: 'food', amount: 120 },\n      { category: 'food', amount: 60 },\n      { category: 'rent', amount: 900 },\n    ];\n    expect(totalsByCategory(items)).toEqual({ food: 180, rent: 900 });\n  });\n\n  it('handles an empty list', () => {\n    expect(totalsByCategory([])).toEqual({});\n  });\n});", highlight: [5, 11, 15] },
        ],
        codeResult: { rows: [{ code: 'npm i -D vitest\nnpx vitest run', language: 'bash', result: out(' ✓ src/totals.test.js (2 tests)\n Test Files  1 passed (1)\n      Tests  2 passed (2)') }], codeLabel: 'Terminal command', resultLabel: 'Expected output' },
      },
    },
    {
      title: 'Deploy a Static Site',
      difficulty: 'medium', tags: ['deployment', 'intermediate'],
      explanation: t(
        "A vanilla JavaScript app is a static site: after npm run build it is just files. Any static host serves it. The professional path is Git-based: push to GitHub, connect the repository to a host (Netlify, Vercel, GitHub Pages or Cloudflare Pages), set the build command and output folder, and every push to main redeploys automatically.\n\nThen: a custom domain (the host shows the DNS records to add), HTTPS (issued automatically by these hosts), and a quick check in a private window on a phone. Environment-specific values (an API base URL) go in environment variables — Vite exposes only variables prefixed VITE_, and anything exposed to the frontend is public, so never put secrets there.",
        "Vanilla JavaScript app static site hai: npm run build ke baad bas files. Koi bhi static host serve kar deta hai. Professional raasta Git-based hai: GitHub pe push karo, repository ko host se jodo (Netlify, Vercel, GitHub Pages ya Cloudflare Pages), build command aur output folder set karo, aur main pe har push apne aap redeploy.\n\nPhir: custom domain (host batata hai kaunse DNS records daalne hain), HTTPS (ye hosts apne aap dete hain), aur phone pe private window mein ek check. Environment ke hisaab se values (API base URL) environment variables mein — Vite sirf VITE_ prefix wale variables expose karta hai, aur frontend ko expose hua sab public hai, toh secrets wahan kabhi nahi."
      ),
      dailyLifeExample: t('Moving from cooking at home to opening a stall: the food is the same, but now it has an address (domain), a licence (HTTPS) and customers who arrive without asking you first.', 'Ghar pe pakane se stall kholne tak: khaana wahi, par ab uska address (domain), licence (HTTPS) aur bina pooche aane wale customers.'),
      keyPoints: ['Build → dist/', 'Git-connected host redeploys on push', 'Custom domain + automatic HTTPS', 'VITE_ variables are public'],
      quiz: [
        q('A Vite app on the host shows a blank page; the console says the JS file 404s. Likely?', ['CORS', 'Wrong output directory or base path', 'localStorage full', 'Missing semicolon'], 1, 'The host is serving the wrong folder or the asset paths assume a different base.'),
        q('Can you put an API secret in VITE_API_KEY?', ['Yes, it is private', 'No — it ships in the bundle and anyone can read it', 'Only in production', 'Only on Netlify'], 1, 'Frontend env vars are public by design.'),
      ],
      lesson: {
        kind: 'lesson', minutes: 25, badges: ['hands-on'],
        searchTerms: ['deploy', 'netlify', 'vercel', 'github pages', 'domain', 'https', 'environment variables', 'production'],
        behind: { title: t('Local to production', 'Local se production'), steps: ['Local', 'Build', 'Environment variables', 'Git push', 'Host builds', 'Domain', 'HTTPS', 'Monitoring'] },
        steps: [
          { title: t('npm run build and open dist/index.html via npm run preview', 'npm run build aur npm run preview se dist/index.html kholo'), code: 'npm run build\nnpm run preview', language: 'bash', filename: 'terminal' },
          { title: t('Push the project to a GitHub repository', 'Project GitHub repository pe push karo') },
          { title: t('On your host: New site → import the repo', 'Host pe: New site → repo import karo') },
          { title: t('Build command: npm run build · Output directory: dist', 'Build command: npm run build · Output directory: dist') },
          { title: t('Add a custom domain and follow the DNS instructions; wait for HTTPS', 'Custom domain add karo, DNS instructions follow karo; HTTPS ka intezaar') },
          { title: t('Open the live URL on your phone in a private window', 'Live URL phone pe private window mein kholo') },
        ],
        expected: { checks: ['✓ Live URL works', '✓ HTTPS padlock', '✓ Push to main redeploys', '✓ No console errors on the live site'] },
        debug: [{ title: t('Deployment failing / blank page', 'Deployment fail / khaali page'), problem: t('The host builds or serves the wrong thing.', 'Host galat cheez build ya serve karta hai.'), symptoms: ['Build log errors', 'Blank page', '404 for /assets/*.js'], where: ['Host build log', 'DevTools Network on the live URL'], causes: ['Wrong build command or output directory', 'Node version mismatch', 'Absolute paths assuming a sub-path'], fix: t('Match build command and output dir; set the Node version; check Vite base.', 'Build command aur output dir match karo; Node version set karo; Vite base check karo.'), prevention: t('Run npm run build && npm run preview locally before every deploy.', 'Har deploy se pehle local pe npm run build && npm run preview.') }],
      },
    },
  ],
};

/* ═══════════ 12 · FINAL PROJECT ═══════════ */

const project = {
  title: 'Final Project — Expense Tracker', stage: 12, band: 'project', level: 'project', estimatedMinutes: 480,
  description: t('Build, test and deploy a vanilla JavaScript expense tracker through eight milestones.', 'Aath milestones mein vanilla JavaScript expense tracker build, test aur deploy karo.'),
  concepts: [
    {
      title: 'Expense Tracker — Milestones 1 to 4: Setup, UI and Core Features',
      difficulty: 'medium', tags: ['project'],
      explanation: t(
        "The first half of the project: from an empty folder to a working tracker that saves data.\n\nMilestone 1 — Setup: Vite vanilla project, Git repo, files split into modules (state, storage, render, totals).\nMilestone 2 — UI: a form (title, amount, category, date), a list, and a summary area, all rendered from one state object.\nMilestone 3 — Data: add and delete expenses in state; persist to localStorage; load on start.\nMilestone 4 — Core feature: totals by category with reduce, a filter by category, sorted by date.\n\nAfter each milestone, check it against its requirement, commit, and try the challenge before moving on. The solution is not handed to you in full — the labs you have done already contain every piece.",
        "Project ka pehla aadha: khaali folder se data save karne wale working tracker tak.\n\nMilestone 1 — Setup: Vite vanilla project, Git repo, files modules mein bante (state, storage, render, totals).\nMilestone 2 — UI: form (title, amount, category, date), list, aur summary area, sab ek state object se render.\nMilestone 3 — Data: state mein expenses add aur delete; localStorage mein persist; start pe load.\nMilestone 4 — Core feature: reduce se category-wise totals, category filter, date se sorted.\n\nHar milestone ke baad requirement se check karo, commit karo, aur aage badhne se pehle challenge try karo. Solution poora nahi diya jaata — jo labs kiye hain unme har tukda pehle se hai."
      ),
      dailyLifeExample: t('Building a house: foundation (setup), walls (UI), plumbing (data), furniture (features) — inspected after each stage.', 'Ghar banana: neev (setup), deewarein (UI), plumbing (data), furniture (features) — har stage ke baad inspection.'),
      keyPoints: ['One state object, one render()', 'Modules by responsibility', 'Commit after every milestone'],
      quiz: [q('Where should totals be computed?', ['Inside the click handler', 'In a pure totals.js function called by render()', 'In localStorage', 'In CSS'], 1, 'Pure functions are reusable and testable.')],
      lesson: {
        kind: 'project', minutes: 240, badges: ['project', 'coding'],
        searchTerms: ['expense tracker', 'project', 'milestone', 'final project'],
        build: { text: t('Milestones 1–4', 'Milestones 1–4'), flow: { steps: ['1 Setup', '2 UI', '3 Data', '4 Core feature'], highlight: 0 } },
        files: [{ filename: 'src/state.js', language: JS, code: "import { load, save } from './storage.js';\n\nexport const state = {\n  expenses: load(),\n  filter: 'all',\n};\n\nexport function addExpense(expense) {\n  state.expenses = [...state.expenses, { id: crypto.randomUUID(), ...expense }];\n  save(state.expenses);\n}\n\nexport function removeExpense(id) {\n  state.expenses = state.expenses.filter((e) => e.id !== id);\n  save(state.expenses);\n}", explain: t('A starting point for milestone 3 — storage.js and render.js are yours to write.', 'Milestone 3 ka starting point — storage.js aur render.js tumhe likhne hain.') }],
        steps: [
          { title: t('M1 · Requirement: project runs with npm run dev and is in Git', 'M1 · Requirement: npm run dev se chalta hai aur Git mein hai'), detail: t('Challenge: add a .gitignore that excludes node_modules and dist.', 'Challenge: .gitignore jo node_modules aur dist exclude kare.') },
          { title: t('M2 · Requirement: form, list and summary render from state', 'M2 · Requirement: form, list aur summary state se render'), detail: t('Challenge: render an empty state ("No expenses yet").', 'Challenge: empty state render karo ("No expenses yet").') },
          { title: t('M3 · Requirement: add/delete persist across reload', 'M3 · Requirement: add/delete reload ke baad bhi rahe'), detail: t('Challenge: corrupt localStorage by hand — the app must still start.', 'Challenge: localStorage haath se kharab karo — app phir bhi start ho.') },
          { title: t('M4 · Requirement: totals by category and a working filter', 'M4 · Requirement: category-wise totals aur chalta filter'), detail: t('Challenge: show each category as a percentage of the total.', 'Challenge: har category total ka kitna percent hai dikhao.') },
        ],
        expected: { checks: ['✓ Setup', '✓ UI from state', '✓ Persistence', '✓ Totals + filter', '✓ 4 commits'] },
      },
    },
    {
      title: 'Expense Tracker — Milestones 5 to 8: API, Quality and Deploy',
      difficulty: 'hard', tags: ['project', 'deployment'],
      explanation: t(
        "The second half turns a working app into a shippable one.\n\nMilestone 5 — API: convert totals to another currency using a public rates API (for example Frankfurter). Loading state, error state, and cache the rate so every render does not refetch.\nMilestone 6 — Validation & safety: amount must be a positive number, title required and trimmed; every piece of user text rendered with textContent.\nMilestone 7 — Testing & debugging: unit tests for totals and validation; a DevTools pass with no console errors.\nMilestone 8 — Deployment: build, deploy from Git, custom domain, HTTPS, and a README with screenshots.\n\nWhen all eight are done, open the project board and fill in the showcase and portfolio drafts — that is how the project turns into an interview story.",
        "Doosra aadha working app ko ship-layak banata hai.\n\nMilestone 5 — API: public rates API (jaise Frankfurter) se totals doosri currency mein. Loading state, error state, aur rate cache karo taaki har render pe refetch na ho.\nMilestone 6 — Validation & safety: amount positive number, title required aur trimmed; user ka har text textContent se render.\nMilestone 7 — Testing & debugging: totals aur validation ke unit tests; DevTools pass bina console errors ke.\nMilestone 8 — Deployment: build, Git se deploy, custom domain, HTTPS, aur screenshots wala README.\n\nAathon ho jaayein toh project board kholo aur showcase aur portfolio drafts bharo — project aise hi interview ki kahani banta hai."
      ),
      dailyLifeExample: t('The last 20% of a building — wiring checks, safety certificate, the opening day — is what makes people actually move in.', 'Building ka aakhri 20% — wiring checks, safety certificate, opening day — hi logon ko sach mein rehne laata hai.'),
      keyPoints: ['Loading/error states for the API', 'Validate and render safely', 'Tests + DevTools pass', 'Deploy + README + portfolio'],
      quiz: [q('The rates API is down. What should the app do?', ['Crash', 'Show totals in INR with a "rates unavailable" note', 'Show a blank page', 'Retry forever'], 1, 'Degrade gracefully; the core feature must still work.')],
      interviewQuestions: [
        iq({
          question: 'Walk me through a JavaScript project you built.',
          difficulty: 'medium',
          short: t('Use the Expense Tracker: one state object rendered to the DOM, modules by responsibility, localStorage persistence, a rates API with loading and error states, tested pure functions, XSS-safe rendering, deployed from Git.', 'Expense Tracker use karo: DOM pe render hota ek state object, responsibility ke hisaab se modules, localStorage persistence, loading aur error states wali rates API, tested pure functions, XSS-safe rendering, Git se deployed.'),
          deep: t('Tell it as decisions: why no framework, why state → render, how you handled API failure, what you tested and why, and one bug you debugged with DevTools.', 'Decisions ki tarah sunao: framework kyun nahi, state → render kyun, API failure kaise handle kiya, kya test kiya aur kyun, aur DevTools se debug kiya ek bug.'),
          tip: t('Have the live URL and repo ready to share on screen.', 'Live URL aur repo screen pe dikhane ko taiyaar rakho.'),
        }),
      ],
      lesson: {
        kind: 'project', minutes: 240, badges: ['project', 'coding'],
        searchTerms: ['expense tracker', 'api', 'currency', 'deploy', 'project', 'milestone'],
        build: { text: t('Milestones 5–8', 'Milestones 5–8'), flow: { steps: ['5 API', '6 Validation & safety', '7 Testing', '8 Deploy'], highlight: 0 } },
        files: [{ filename: 'src/rates.js', language: JS, code: "let cache = null;\n\nexport async function getRate(to) {\n  if (to === 'INR') return 1;\n  if (cache?.[to]) return cache[to];\n  const res = await fetch(`https://api.frankfurter.app/latest?from=INR&to=${to}`);\n  if (!res.ok) throw new Error(`Rates unavailable (HTTP ${res.status})`);\n  const { rates } = await res.json();\n  cache = { ...cache, ...rates };\n  return rates[to];\n}", explain: t('Check the current Frankfurter endpoint in its docs before relying on it; any public rates API works the same way.', 'Bharosa karne se pehle Frankfurter ka current endpoint docs mein check karo; koi bhi public rates API aise hi chalti hai.') }],
        steps: [
          { title: t('M5 · Requirement: currency select converts totals; loading + error states', 'M5 · Requirement: currency select totals convert kare; loading + error states'), detail: t('Challenge: block the request in DevTools (Network → block URL) — the app must still work in INR.', 'Challenge: DevTools mein request block karo (Network → block URL) — app INR mein chalta rahe.') },
          { title: t('M6 · Requirement: invalid input is rejected with a message; no innerHTML with user text', 'M6 · Requirement: invalid input message ke saath reject; user text pe innerHTML nahi'), detail: t('Challenge: add an expense titled <img src=x onerror=alert(1)> — nothing must run.', 'Challenge: <img src=x onerror=alert(1)> title wala expense add karo — kuch chalna nahi chahiye.') },
          { title: t('M7 · Requirement: tests pass; no console errors', 'M7 · Requirement: tests pass; koi console error nahi'), detail: t('Challenge: write a test that would have caught the "12030" bug.', 'Challenge: aisa test likho jo "12030" bug pakad leta.') },
          { title: t('M8 · Requirement: live on a custom domain over HTTPS, README with screenshots', 'M8 · Requirement: custom domain pe HTTPS ke saath live, screenshots wala README'), detail: t('Challenge: fill in the portfolio drafts on the project board.', 'Challenge: project board pe portfolio drafts bharo.') },
        ],
        expected: { checks: ['✓ API with graceful failure', '✓ Validation + XSS-safe', '✓ Tests green', '✓ Deployed with HTTPS', '✓ README + portfolio'] },
        where: [{ app: 'Browser', path: ['/courses/javascript/toolkit/project'], note: t('Milestones, requirements checklist, showcase and portfolio drafts.', 'Milestones, requirements checklist, showcase aur portfolio drafts.') }],
      },
    },
    {
      title: 'Final Assessment',
      difficulty: 'hard', tags: ['assessment', 'advanced'],
      explanation: t('Ten scenario questions across the whole course. Pass (60%+) to complete the assessment requirement for the certificate. Each wrong answer names the lesson to revisit.', 'Poore course pe das scenario sawaal. Certificate ki assessment requirement ke liye pass karo (60%+). Har galat jawab revisit karne wala lesson batata hai.'),
      dailyLifeExample: t('The practical exam after the theory classes.', 'Theory classes ke baad practical exam.'),
      keyPoints: ['Ten scenario questions', '60% to pass'],
      quiz: [
        q("'120' + 30 in a total. What prints and why?", ['150', "'12030' — + concatenates when one side is a string", 'NaN', 'Error'], 1, 'Revisit: Type Conversion & Coercion.'),
        q('You need the first expense with id 7. Which method?', ['filter', 'find', 'map', 'some'], 1, 'Revisit: More Array Methods.'),
        q('Buttons added after page load do not respond to clicks. Fix?', ['Add listeners in a loop at startup', 'Use event delegation on the parent', 'Use setTimeout', 'Use innerHTML'], 1, 'Revisit: Event Bubbling & Delegation.'),
        q('fetch to /api/expenses returns 404. Does the promise reject?', ['Yes', 'No — it resolves with res.ok === false', 'Only in Chrome', 'Only for POST'], 1, 'Revisit: Fetch API.'),
        q('Order of logs: log(1); setTimeout(log 2, 0); Promise.resolve().then(log 3); log(4)', ['1 2 3 4', '1 4 3 2', '1 4 2 3', '1 3 4 2'], 1, 'Revisit: The Event Loop.'),
        q('A counter created inside a function keeps its value between calls. What is this?', ['Hoisting', 'A closure', 'A prototype', 'A generator'], 1, 'Revisit: Closures.'),
        q('Search fires a request on every keystroke. Improve it?', ['Throttle to 0 ms', 'Debounce the input handler', 'Use var', 'Use a class'], 1, 'Revisit: Debounce & Throttle.'),
        q('Rendering a user comment safely:', ['el.innerHTML = c', 'el.textContent = c', 'document.write(c)', 'eval(c)'], 1, 'Revisit: Security — XSS.'),
        q('Where do you confirm what an API actually returned?', ['Elements tab', 'Network tab → response', 'Application tab', 'Performance tab'], 1, 'Revisit: Debugging with DevTools.'),
        q('What do you deploy for the Vite app?', ['src/', 'node_modules/', 'dist/ from npm run build', 'package.json'], 2, 'Revisit: Deploy a Static Site.'),
      ],
      lesson: { kind: 'assessment', minutes: 25, badges: ['hands-on'], searchTerms: ['final assessment', 'exam', 'quiz'], objectives: [t('Pass the ten-question quiz (60%)', 'Das sawaal ka quiz pass karo (60%)')] },
    },
  ],
};

/* ═══════════ 13 · INTERVIEW PREP ═══════════ */

const interview = {
  title: 'Interview Preparation', stage: 13, band: 'interview', level: 'project', estimatedMinutes: 60,
  description: t('The JavaScript questions interviewers actually ask — beginner to scenario and debugging.', 'JavaScript ke wo sawaal jo interviewers sach mein poochte hain — beginner se scenario aur debugging tak.'),
  concepts: [
    {
      title: 'JavaScript Interview Prep — Scenarios and Debugging Questions',
      difficulty: 'hard', tags: ['interview', 'advanced'],
      explanation: t(
        "Beyond definitions, good interviews ask what you would DO. This lesson collects the scenario, debugging and design questions that separate someone who read about JavaScript from someone who has shipped it. Each has a short answer to say first and a deeper answer if they push.\n\nThe full question bank — every question from every lesson, both languages — is on the Interview Questions page, and you can rehearse them as flip cards in Mock Interview.",
        "Definitions se aage, achhe interviews poochte hain tum kya KAROGE. Ye lesson wo scenario, debugging aur design sawaal ikattha karta hai jo JavaScript ke baare mein padhne wale ko JavaScript ship karne wale se alag karte hain. Har ek ka pehle bolne wala short answer hai aur push karein toh deep answer.\n\nPoora question bank — har lesson ka har sawaal, dono bhashaon mein — Interview Questions page pe hai, aur Mock Interview mein flip cards ki tarah rehearse kar sakte ho."
      ),
      dailyLifeExample: t('A driving test asks you to parallel park, not to define "steering".', 'Driving test parallel park karne ko kehta hai, "steering" define karne ko nahi.'),
      keyPoints: ['Answer short first, then deep', 'Use your project for examples', 'Name the debugging steps out loud'],
      quiz: [q('An interviewer asks "why is my list rendering twice?" Best first move?', ['Guess an answer', 'Ask how to reproduce it and say how you would inspect it', 'Rewrite it in React', 'Blame the browser'], 1, 'Show the debugging process.')],
      interviewQuestions: [
        iq({ question: 'Explain the event loop with an example.', difficulty: 'hard', short: t('JavaScript runs one call stack. When it empties, the event loop runs all queued microtasks (promise callbacks) and then one macrotask (timers, events), then renders.', 'JavaScript ek call stack chalata hai. Khaali hone pe event loop saare queued microtasks (promise callbacks) chalata hai, phir ek macrotask (timers, events), phir render.'), code: { code: "console.log(1);\nsetTimeout(() => console.log(2));\nPromise.resolve().then(() => console.log(3));\nconsole.log(4); // 1 4 3 2" }, tip: t('Draw stack → microtasks → macrotask.', 'Stack → microtasks → macrotask draw karo.') }),
        iq({ question: 'The page freezes when a user types in search. How do you diagnose and fix it?', difficulty: 'hard', short: t('Record in the Performance panel to find the long task, then debounce the handler, limit the work per keystroke, and move heavy work off the input path.', 'Performance panel mein record karke long task dhoondho, phir handler debounce karo, har keystroke ka kaam limit karo, aur heavy kaam input path se hatao.'), deep: t('Typical causes: filtering thousands of items and re-rendering them all on each key, or a request per key. Debounce 200–300 ms, render only visible results, cancel stale requests with AbortController.', 'Aam wajah: har key pe hazaaron items filter karke sab re-render, ya har key pe request. 200–300 ms debounce, sirf visible results render, purani requests AbortController se cancel.'), tip: t('Mention measuring before and after.', 'Pehle aur baad naapne ka zikr karo.') }),
        iq({ question: 'How would you structure a small vanilla JS app so it stays maintainable?', difficulty: 'medium', short: t('One state object, pure functions for logic, a render function that draws from state, modules by responsibility, and event delegation.', 'Ek state object, logic ke liye pure functions, state se draw karne wala render function, responsibility ke hisaab se modules, aur event delegation.'), example: t('The Expense Tracker: state.js, storage.js, render.js, totals.js, rates.js.', 'Expense Tracker: state.js, storage.js, render.js, totals.js, rates.js.'), tip: t('Point to your repo structure.', 'Apne repo ka structure dikhao.') }),
        iq({ question: 'What happens between typing a URL and seeing your JavaScript run?', difficulty: 'medium', short: t('DNS → TCP/TLS → HTTP request → HTML parsed → scripts fetched (modules deferred) → DOM built → scripts run → events handled by the event loop.', 'DNS → TCP/TLS → HTTP request → HTML parse → scripts fetch (modules deferred) → DOM → scripts run → events event loop se.'), tip: t('Tie it to why type="module" avoids null elements.', 'Isse jodo ki type="module" null elements se kyun bachata hai.') }),
      ],
      lesson: {
        kind: 'lesson', minutes: 45, badges: ['hands-on'],
        searchTerms: ['interview', 'questions', 'event loop', 'scenario', 'debugging interview'],
        table: {
          title: t('What to expect, by level', 'Level ke hisaab se kya poochenge'),
          columns: ['Level', 'Typical questions', 'Lesson'],
          rows: [
            ['Beginner', 'let vs const vs var · == vs === · truthy/falsy', 'Variables · Type Conversion'],
            ['Intermediate', 'map/filter/reduce · closures · this · promises', 'Array Methods · Closures · Promises'],
            ['Advanced', 'event loop · prototypes · memory leaks', 'The Event Loop · Prototypes'],
            ['Scenario', 'freezing search · double render · failing fetch', 'Debounce · DevTools · Fetch'],
            ['Debugging', 'read this stack trace · why is this undefined', 'Error Database'],
            ['Design', 'structure an app · state and rendering', 'Final Project'],
          ],
        },
        where: [{ app: 'Browser', path: ['/interview-questions'] }, { app: 'Browser', path: ['/mock-interview/javascript'] }],
      },
    },
  ],
};

export const MODULES = [prerequisites, values, flow, data, dom, apis, async, functions, objects, debugging, perf, deploy, project, interview];
