// Comprehensive JavaScript curriculum — beginner → intermediate → advanced.
// Consumed by scripts/seed.mjs. Each concept is fully bilingual with a
// daily-life example, code, key points, quiz, and (some) linked interview Qs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'JavaScript',
  slug: 'javascript',
  description:
    'Zero se advanced tak — JavaScript ka complete roadmap. Har concept English + Hinglish mein, desi examples, code, quiz aur interview questions ke saath.',
  icon: '🟨',
  tags: ['javascript', 'frontend', 'mern', 'web'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 1,
};

// ───────────────────────────── BEGINNER ─────────────────────────────
const beginner = [
  {
    title: 'JavaScript Basics',
    level: 'beginner',
    description: 'JavaScript kya hai, kaise chalta hai, aur pehla code.',
    concepts: [
      {
        title: 'What is JavaScript',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'JavaScript is the programming language of the web. It runs in every browser and (via Node.js) on servers too. While HTML is the structure and CSS is the styling, JavaScript is the behaviour — it makes pages interactive: clicks, animations, data fetching, and full apps.',
          hinglish:
            'JavaScript web ki programming language hai. Ye har browser mein chalti hai aur Node.js ke through server pe bhi. HTML structure hai, CSS styling hai, aur JavaScript behaviour hai — ye page ko interactive banati hai: clicks, animation, data laana, poori app banana.',
        },
        dailyLifeExample:
          'Ek gaadi socho: HTML body (dhaancha) hai, CSS rang-roop aur paint hai, aur JavaScript engine hai jo gaadi ko actually chalata hai. Bina JS ke page sirf ek poster hai — kuch karta nahi.',
        codeExample:
          '// Your first line of JavaScript\nconsole.log("Hello, Learnverse!");\n\n// React to a button click\ndocument.querySelector("button")\n  ?.addEventListener("click", () => alert("Clicked!"));',
        keyPoints: [
          'JS runs in the browser and on servers (Node.js)',
          'HTML = structure, CSS = style, JS = behaviour',
          'Interpreted, single-threaded, dynamically typed',
          'The most used language for web development',
        ],
        quiz: [
          {
            question: 'What role does JavaScript play in a web page?',
            options: ['Structure', 'Styling', 'Behaviour/interactivity', 'Hosting'],
            correctIndex: 2,
            explanation: 'HTML = structure, CSS = styling, JS = behaviour.',
          },
          {
            question: 'Where can JavaScript run?',
            options: ['Only browsers', 'Only servers', 'Browsers and servers (Node.js)', 'Only mobile apps'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Variables: var, let & const',
        difficulty: 'easy',
        tags: ['variables', 'es6'],
        explanation: {
          english:
            'Variables store data so you can reuse it. Modern JavaScript uses `let` (value can change) and `const` (value cannot be reassigned). The old `var` is function-scoped and can cause bugs, so prefer let/const.',
          hinglish:
            'Variables data store karte hain taaki dobara use kar sako. Modern JS mein `let` use karo (value badal sakti hai) aur `const` (value reassign nahi hoti). Purana `var` function-scoped hai aur bugs deta hai, isliye let/const better hai.',
        },
        dailyLifeExample:
          'Variable ek labelled dabba hai. `const` woh dabba jisme cheez fix hai (jaise Aadhaar number), `let` woh dabba jisme cheez badal sakti hai (jaise bank balance).',
        codeExample:
          'let score = 10;   // can change\nscore = 20;       // ok\n\nconst name = "Abhishek"; // cannot reassign\n// name = "Raj";  // ❌ TypeError\n\nvar old = 5; // avoid: function-scoped, hoisting surprises',
        keyPoints: [
          'Prefer const by default; use let only when value changes',
          'const cannot be reassigned (but objects it holds can mutate)',
          'let and const are block-scoped',
          'Avoid var in modern code',
        ],
        quiz: [
          {
            question: 'Which keyword should you use when a value will NOT be reassigned?',
            options: ['var', 'let', 'const', 'static'],
            correctIndex: 2,
          },
          {
            question: 'What happens if you reassign a const?',
            options: ['It works', 'TypeError', 'undefined', 'It becomes let'],
            correctIndex: 1,
            explanation: 'const bindings cannot be reassigned.',
          },
        ],
        interviewQuestions: [
          {
            question: 'Difference between var, let and const?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'var is function-scoped and hoisted as undefined. let and const are block-scoped and stay in the temporal dead zone until declared. const cannot be reassigned, though objects it references can still mutate.',
              hinglish:
                'var function-scoped hai aur undefined ke saath hoist hoti hai. let/const block-scoped hain aur declare hone tak temporal dead zone mein rehti hain. const reassign nahi hoti, par jis object ko point kare wo mutate ho sakta hai.',
            },
          },
        ],
      },
      {
        title: 'Data Types',
        difficulty: 'easy',
        tags: ['types', 'basics'],
        explanation: {
          english:
            'JavaScript has primitive types (string, number, boolean, null, undefined, bigint, symbol) and one non-primitive type: object (which includes arrays and functions). Primitives are copied by value; objects are copied by reference.',
          hinglish:
            'JavaScript mein primitive types hote hain (string, number, boolean, null, undefined, bigint, symbol) aur ek non-primitive: object (jisme arrays aur functions aate hain). Primitives value se copy hote hain; objects reference se.',
        },
        dailyLifeExample:
          'Primitive copy karna ek photocopy jaisa hai — dono alag. Object copy karna ek Google Doc ka link share karne jaisa hai — dono same file edit karte hain.',
        codeExample:
          'typeof "hi";      // "string"\ntypeof 42;        // "number"\ntypeof true;      // "boolean"\ntypeof undefined; // "undefined"\ntypeof null;      // "object" (famous bug!)\ntypeof {};        // "object"\ntypeof [];        // "object" (use Array.isArray)\ntypeof function(){}; // "function"',
        keyPoints: [
          'Primitives: string, number, boolean, null, undefined, bigint, symbol',
          'Objects (incl. arrays, functions) are reference types',
          'typeof null === "object" is a historical bug',
          'Use Array.isArray() to detect arrays',
        ],
        quiz: [
          {
            question: 'What does typeof null return?',
            options: ['"null"', '"object"', '"undefined"', 'error'],
            correctIndex: 1,
            explanation: 'A long-standing JavaScript bug — typeof null is "object".',
          },
          {
            question: 'Which is NOT a primitive type?',
            options: ['string', 'number', 'object', 'boolean'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Operators',
        difficulty: 'easy',
        tags: ['operators', 'basics'],
        explanation: {
          english:
            'Operators let you compute and compare. Arithmetic (+, -, *, /, %, **), assignment (=, +=), comparison (===, !==, >, <), and logical (&&, ||, !). Always use === (strict equality) over == to avoid surprising type coercion.',
          hinglish:
            'Operators se calculation aur comparison hota hai. Arithmetic (+, -, *, /, %, **), assignment (=, +=), comparison (===, !==, >, <), aur logical (&&, ||, !). Hamesha === (strict) use karo, == nahi — warna type coercion ke surprise milte hain.',
        },
        dailyLifeExample:
          '=== ka matlab "bilkul same" (same cheez, same type) — jaise same naam aur same Aadhaar. == sirf "naam mil gaya" dekhta hai aur dhokha kha jaata hai.',
        codeExample:
          '2 + 3;        // 5\n10 % 3;       // 1 (remainder)\n2 ** 3;       // 8 (power)\n\n5 === "5";    // false (different types)\n5 == "5";     // true  (coercion — avoid)\n\ntrue && false; // false\ntrue || false; // true',
        keyPoints: [
          'Use === / !== (strict) instead of == / !=',
          '% is remainder, ** is exponent',
          '&& returns first falsy / last value; || returns first truthy',
          'Comparison returns a boolean',
        ],
        quiz: [
          {
            question: 'What does 5 === "5" return?',
            options: ['true', 'false', 'error', 'undefined'],
            correctIndex: 1,
            explanation: 'Strict equality checks type too — number vs string.',
          },
          {
            question: 'What is 10 % 3?',
            options: ['3', '1', '0', '3.33'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Difference between == and === ?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                '== compares values after type coercion (converts types to match), while === compares both value and type without coercion. Always prefer === for predictable results.',
              hinglish:
                '== type coercion karke value compare karta hai (types ko match karne ke liye convert kar deta hai), jabki === bina coercion ke value aur type dono compare karta hai. Predictable result ke liye hamesha === use karo.',
            },
          },
        ],
      },
      {
        title: 'Type Conversion & Coercion',
        difficulty: 'medium',
        tags: ['coercion', 'types'],
        explanation: {
          english:
            'Type conversion is changing a value\'s type yourself (Number("5")), while coercion is JavaScript doing it automatically (e.g. "5" + 1). The + operator with a string concatenates; other math operators convert strings to numbers. Knowing the rules prevents nasty bugs.',
          hinglish:
            'Type conversion tum khud karte ho (Number("5")), aur coercion JavaScript khud kar deti hai (jaise "5" + 1). + operator string ke saath jodta hai (concatenate); baaki math operators string ko number bana dete hain. Rules pata hon to bugs nahi aate.',
        },
        dailyLifeExample:
          'Coercion auto-translate jaisa hai — kabhi madad karta hai, kabhi galat matlab nikaal deta hai. "5" + 1 = "51" (jod diya), par "5" - 1 = 4 (number bana diya).',
        codeExample:
          '"5" + 1;      // "51"  (string concatenation)\n"5" - 1;      // 4     (numeric coercion)\nNumber("42"); // 42    (explicit)\nString(42);   // "42"\nBoolean(0);   // false\n!!"hi";       // true  (truthy)',
        keyPoints: [
          'Conversion = manual, coercion = automatic',
          '+ with a string concatenates; - * / coerce to number',
          'Falsy values: 0, "", null, undefined, NaN, false',
          'Use explicit Number()/String() for clarity',
        ],
        quiz: [
          {
            question: 'What is "5" + 1?',
            options: ['6', '"51"', '51', 'NaN'],
            correctIndex: 1,
            explanation: '+ with a string concatenates, giving "51".',
          },
          {
            question: 'What is "5" - 1?',
            options: ['"4"', '4', '"51"', 'NaN'],
            correctIndex: 1,
            explanation: '- coerces the string to a number.',
          },
          {
            question: 'Which is a falsy value?',
            options: ['"0"', '[]', '0', '"false"'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    title: 'Control Flow',
    level: 'beginner',
    description: 'Decisions aur repetition — if/else, switch, loops.',
    concepts: [
      {
        title: 'Conditionals: if, else & switch',
        difficulty: 'easy',
        tags: ['control-flow', 'conditionals'],
        explanation: {
          english:
            'Conditionals run code only when a condition is true. Use if/else if/else for ranges and complex logic, and switch when comparing one value against many fixed options.',
          hinglish:
            'Conditionals code tabhi chalate hain jab condition true ho. Ranges aur complex logic ke liye if/else if/else, aur jab ek value ko bahut saare fixed options se compare karna ho to switch.',
        },
        dailyLifeExample:
          'Traffic signal jaisa: agar laal hai to ruko, agar peela hai to slow, warna chalo. Switch ek vending machine jaisa — button dabao, wahi item milega.',
        codeExample:
          'const marks = 82;\nif (marks >= 90) console.log("A");\nelse if (marks >= 75) console.log("B");\nelse console.log("C");\n\nconst day = "sun";\nswitch (day) {\n  case "sat":\n  case "sun": console.log("Weekend"); break;\n  default: console.log("Weekday");\n}',
        keyPoints: [
          'if/else if/else for ranges & complex conditions',
          'switch for one value vs many fixed cases',
          'Remember break in switch to avoid fall-through',
          'Conditions evaluate truthiness',
        ],
        quiz: [
          {
            question: 'When is switch a better fit than if/else?',
            options: ['For ranges', 'Comparing one value to many fixed options', 'Looping', 'Never'],
            correctIndex: 1,
          },
          {
            question: 'What happens without break in a switch case?',
            options: ['Error', 'Fall-through to next case', 'Loop forever', 'Nothing runs'],
            correctIndex: 1,
            explanation: 'Execution falls through to subsequent cases.',
          },
        ],
      },
      {
        title: 'Loops: for, while & for...of',
        difficulty: 'easy',
        tags: ['loops', 'control-flow'],
        explanation: {
          english:
            'Loops repeat code. Use a classic for when you know the count, while when you loop until a condition, for...of to iterate values of an array, and for...in to iterate keys of an object.',
          hinglish:
            'Loops code repeat karte hain. Count pata ho to classic for, condition tak chalana ho to while, array ki values ke liye for...of, aur object ke keys ke liye for...in.',
        },
        dailyLifeExample:
          'Loop ek washing machine ke spin cycle jaisa hai — ek hi kaam baar-baar jab tak condition (time/clothes) puri na ho.',
        codeExample:
          'for (let i = 0; i < 3; i++) console.log(i); // 0 1 2\n\nconst fruits = ["aam", "kela"];\nfor (const f of fruits) console.log(f); // values\n\nconst user = { name: "A", age: 20 };\nfor (const key in user) console.log(key); // keys',
        keyPoints: [
          'for: known number of iterations',
          'while: loop until a condition becomes false',
          'for...of: values of an iterable (array, string)',
          'for...in: keys of an object',
        ],
        quiz: [
          {
            question: 'Which loop iterates the VALUES of an array?',
            options: ['for...in', 'for...of', 'while', 'do...while'],
            correctIndex: 1,
          },
          {
            question: 'for...in is used to iterate…',
            options: ['array values', 'object keys', 'numbers only', 'nothing'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Functions (Basics)',
    level: 'beginner',
    description: 'Code ko reusable banao — declarations, expressions, arrow functions, scope.',
    concepts: [
      {
        title: 'Function Declarations & Expressions',
        difficulty: 'easy',
        tags: ['functions'],
        explanation: {
          english:
            'A function is a reusable block of code. A function declaration (function greet(){}) is hoisted so you can call it before its definition. A function expression (const greet = function(){}) is assigned to a variable and is not hoisted the same way.',
          hinglish:
            'Function reusable code ka block hai. Function declaration (function greet(){}) hoist hoti hai, isliye definition se pehle bhi call kar sakte ho. Function expression (const greet = function(){}) ek variable mein assign hota hai aur usi tarah hoist nahi hota.',
        },
        dailyLifeExample:
          'Function ek recipe jaisa hai — ek baar likho, jab chaho "bana ke do" bolo. Ingredients (arguments) badal ke alag dish (output) le sakte ho.',
        codeExample:
          '// declaration (hoisted)\nfunction add(a, b) { return a + b; }\n\n// expression (not hoisted)\nconst multiply = function (a, b) { return a * b; };\n\nconsole.log(add(2, 3));      // 5\nconsole.log(multiply(2, 3)); // 6',
        keyPoints: [
          'Declarations are hoisted; expressions are not',
          'Functions take inputs (params) and return an output',
          'return ends the function and sends back a value',
          'Without return, a function returns undefined',
        ],
        quiz: [
          {
            question: 'Which can be called BEFORE it appears in code?',
            options: ['Function expression', 'Function declaration', 'Both', 'Neither'],
            correctIndex: 1,
            explanation: 'Function declarations are hoisted.',
          },
          {
            question: 'A function with no return statement returns…',
            options: ['null', '0', 'undefined', 'error'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Parameters, Arguments & Default Values',
        difficulty: 'easy',
        tags: ['functions', 'parameters'],
        explanation: {
          english:
            'Parameters are the named placeholders in a function definition; arguments are the real values you pass when calling it. Default parameters give a fallback when an argument is missing, and the rest parameter (...args) collects extra arguments into an array.',
          hinglish:
            'Parameters function definition ke named placeholders hain; arguments wo asli values jo call karte waqt bhejte ho. Default parameter tab fallback deta hai jab argument na aaye, aur rest parameter (...args) extra arguments ko ek array mein collect kar leta hai.',
        },
        dailyLifeExample:
          'Chai banane ki recipe: cheeni ka parameter hai. Argument na do to default 2 chammach. Rest parameter "...extra" matlab jitne mehmaan aayein utni cups bana lo.',
        codeExample:
          'function greet(name = "Dost") {\n  return `Namaste, ${name}!`;\n}\ngreet();        // "Namaste, Dost!"\ngreet("Abhi");  // "Namaste, Abhi!"\n\nfunction sum(...nums) {           // rest\n  return nums.reduce((a, n) => a + n, 0);\n}\nsum(1, 2, 3, 4); // 10',
        keyPoints: [
          'Parameter = placeholder, argument = actual value',
          'Default params: function f(x = 10) {}',
          'Rest param (...args) gathers extra args into an array',
          'Order of arguments matters',
        ],
        quiz: [
          {
            question: 'What does a default parameter do?',
            options: ['Forces a value', 'Provides a fallback when none is passed', 'Deletes the param', 'Nothing'],
            correctIndex: 1,
          },
          {
            question: 'What does the rest parameter (...args) produce inside the function?',
            options: ['A string', 'An object', 'An array of remaining args', 'undefined'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Arrow Functions',
        difficulty: 'easy',
        tags: ['functions', 'es6'],
        explanation: {
          english:
            'Arrow functions are a shorter way to write functions (ES6). The big difference is `this`: an arrow function has no own `this` — it uses the `this` of the surrounding scope. Great for callbacks, but not for object methods that need their own this.',
          hinglish:
            'Arrow functions function likhne ka chhota tareeka hai (ES6). Bada farq `this` ka hai: arrow function ka apna `this` nahi hota — wo surrounding scope ka `this` use karta hai. Callbacks ke liye badhiya, par object methods ke liye theek nahi jinhe apna this chahiye.',
        },
        dailyLifeExample:
          'Normal function apne ghar jaisa — apna address (this). Arrow function paying-guest jaisa — apna address nahi banata, jis ghar mein hai usi ka address use karta hai.',
        codeExample:
          'const add = (a, b) => a + b; // implicit return\nconst square = n => n * n;    // single param\n\nconst team = {\n  name: "Learnverse",\n  members: ["A", "B"],\n  show() {\n    this.members.forEach((m) => console.log(this.name, m));\n  },\n};\nteam.show();',
        keyPoints: [
          'Shorter syntax: (a, b) => a + b',
          'No own this — inherits from surrounding scope',
          'Cannot be used as constructors (no new)',
          'No arguments object',
        ],
        quiz: [
          {
            question: 'What is special about this in an arrow function?',
            options: ['Always global', 'No own this — uses surrounding scope', 'Always undefined', 'Same as normal function'],
            correctIndex: 1,
          },
          {
            question: 'Arrow functions should be avoided for…',
            options: ['Array callbacks', 'Object methods needing own this', 'Math helpers', 'React handlers'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How is `this` different in arrow functions vs normal functions?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A normal function gets its own `this` based on how it is called. An arrow function has no own `this`; it lexically inherits `this` from the scope where it was defined. That makes arrows ideal for callbacks but wrong for object methods relying on dynamic this.',
              hinglish:
                'Normal function ka apna `this` hota hai jo call karne ke tarike pe depend karta hai. Arrow function ka apna `this` nahi hota; wo jaha define hua wahan ke scope ka `this` leta hai. Isliye arrows callbacks ke liye perfect par dynamic this wale object methods ke liye galat.',
            },
          },
        ],
      },
      {
        title: 'Scope: Global, Function & Block',
        difficulty: 'medium',
        tags: ['scope', 'functions'],
        explanation: {
          english:
            'Scope decides where a variable is accessible. Global scope is everywhere; function scope is inside a function; block scope is inside { } (for let/const). Inner scopes can read outer variables (scope chain), but not the reverse.',
          hinglish:
            'Scope decide karta hai variable kahan accessible hai. Global scope har jagah; function scope function ke andar; block scope { } ke andar (let/const ke liye). Andar wale scope bahar ke variables padh sakte hain (scope chain), par ulta nahi.',
        },
        dailyLifeExample:
          'Scope ek building jaisa: society ka common area (global) sabko dikhe, flat ke andar ka samaan (function/block) sirf us flat walon ko. Andar wale bahar dekh sakte hain, bahar wale andar nahi.',
        codeExample:
          'let g = "global";\nfunction outer() {\n  let f = "function";\n  if (true) {\n    let b = "block";\n    console.log(g, f, b); // all visible\n  }\n  // console.log(b); // ❌ not defined here\n}\nouter();',
        keyPoints: [
          'Global → function → block scopes',
          'let/const are block-scoped; var is function-scoped',
          'Inner scope can access outer (scope chain)',
          'Outer scope cannot access inner variables',
        ],
        quiz: [
          {
            question: 'let and const are scoped to…',
            options: ['the whole function', 'the nearest block { }', 'globally always', 'the file'],
            correctIndex: 1,
          },
          {
            question: 'Can an outer scope access a variable declared inside an inner block?',
            options: ['Yes', 'No', 'Only with var', 'Only globally'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Arrays & Objects',
    level: 'beginner',
    description: 'Data ko store aur manipulate karna — arrays, objects, destructuring, spread.',
    concepts: [
      {
        title: 'Arrays Basics',
        difficulty: 'easy',
        tags: ['arrays'],
        explanation: {
          english:
            'An array is an ordered list of values, indexed from 0. You can add/remove from the end (push/pop) or the start (unshift/shift), find length with .length, and access items by index.',
          hinglish:
            'Array values ki ordered list hai, index 0 se shuru. End se add/remove (push/pop), start se (unshift/shift), length .length se, aur items ko index se access karte ho.',
        },
        dailyLifeExample:
          'Array ek train jaisa hai — har dabba (index) ek number pe. push = peeche dabba jodna, pop = peeche se hatana, shift = aage se hatana.',
        codeExample:
          'const arr = ["a", "b", "c"];\narr[0];          // "a"\narr.length;      // 3\narr.push("d");   // add end -> ["a","b","c","d"]\narr.pop();       // remove end\narr.unshift("z");// add start\narr.shift();     // remove start',
        keyPoints: [
          'Zero-indexed, ordered collection',
          'push/pop work on the end; unshift/shift on the start',
          '.length gives the count',
          'Arrays are reference types (objects)',
        ],
        quiz: [
          {
            question: 'What is the index of the first array element?',
            options: ['1', '0', '-1', 'depends'],
            correctIndex: 1,
          },
          {
            question: 'Which method adds to the END of an array?',
            options: ['shift', 'unshift', 'push', 'pop'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Array Methods: map, filter & reduce',
        difficulty: 'easy',
        tags: ['arrays', 'es6'],
        explanation: {
          english:
            'These three are used daily. map transforms every item into a new array of the same length. filter keeps only items passing a test (shorter array). reduce boils the array down to a single value. None mutate the original.',
          hinglish:
            'Ye teen roz kaam aate hain. map har item ko transform karke same length ka naya array deta hai. filter sirf test pass karne wale items rakhta hai (chhota array). reduce poore array ko ek value mein nichod deta hai. Koi original ko change nahi karta.',
        },
        dailyLifeExample:
          'Aloo ka thaila: map = har aloo chheelna (count same), filter = sirf acche aloo chunna (kuch hata diye), reduce = sab ka total weight ek number mein.',
        codeExample:
          'const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);        // [2,4,6,8,10]\nconst evens   = nums.filter(n => n % 2 === 0); // [2,4]\nconst sum     = nums.reduce((a, n) => a + n, 0); // 15',
        keyPoints: [
          'map: transform → same length',
          'filter: keep matching → shorter',
          'reduce: combine all → single value',
          'They return new data (no mutation)',
        ],
        quiz: [
          {
            question: 'Which returns an array of the SAME length?',
            options: ['filter', 'map', 'reduce', 'find'],
            correctIndex: 1,
          },
          {
            question: 'To compute a sum you use…',
            options: ['map', 'filter', 'reduce', 'forEach'],
            correctIndex: 2,
          },
          {
            question: '[1,2,3,4].filter(n => n%2===0) gives…',
            options: ['[1,3]', '[2,4]', '[1,2,3,4]', '10'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you use reduce over map or filter?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Use reduce when you need to collapse an array into a single value or a different structure — a sum, a grouped object, a flattened array. map and filter always return arrays; reduce can return anything.',
              hinglish:
                'reduce tab jab array ko ek single value ya alag structure mein collapse karna ho — sum, grouped object, flattened array. map/filter hamesha array dete hain; reduce kuch bhi return kar sakta hai.',
            },
          },
        ],
      },
      {
        title: 'Objects & this',
        difficulty: 'medium',
        tags: ['objects', 'this'],
        explanation: {
          english:
            'Objects store data as key–value pairs and can hold methods (functions). Inside a regular method, `this` refers to the object the method was called on. Access properties with dot or bracket notation.',
          hinglish:
            'Objects data ko key–value pairs mein store karte hain aur methods (functions) bhi rakh sakte hain. Regular method ke andar `this` us object ko point karta hai jis pe method call hua. Properties dot ya bracket notation se access karo.',
        },
        dailyLifeExample:
          'Object ek visiting card jaisa: naam, number, email (keys-values). this ka matlab "is card ka maalik" — jis card pe likha hai usi ka data.',
        codeExample:
          'const user = {\n  name: "Abhishek",\n  age: 24,\n  greet() {\n    return `Hi, I am ${this.name}`;\n  },\n};\nuser.name;       // dot notation\nuser["age"];     // bracket notation\nuser.greet();    // "Hi, I am Abhishek"',
        keyPoints: [
          'Objects = key–value pairs',
          'Methods are functions stored as values',
          'this = the object the method is called on',
          'Access via dot (obj.key) or bracket (obj["key"])',
        ],
        quiz: [
          {
            question: 'In user.greet(), what does this refer to?',
            options: ['window', 'the user object', 'undefined', 'the function'],
            correctIndex: 1,
          },
          {
            question: 'Which accesses a property with a dynamic key string?',
            options: ['obj.key', 'obj["key"]', 'obj->key', 'obj::key'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Destructuring',
        difficulty: 'medium',
        tags: ['es6', 'destructuring'],
        explanation: {
          english:
            'Destructuring lets you unpack values from arrays or properties from objects into variables in one line. It makes code shorter and is heavily used in React (props, hooks).',
          hinglish:
            'Destructuring se array ki values ya object ki properties ko ek hi line mein variables mein nikaal sakte ho. Code chhota hota hai aur React mein (props, hooks) bahut use hota hai.',
        },
        dailyLifeExample:
          'Tiffin kholte hi roti, sabzi, achaar alag-alag plate mein nikaal lena — ek saath sab unpack. Yahi destructuring hai.',
        codeExample:
          'const [first, second] = ["a", "b"]; // array\nconst { name, age } = { name: "A", age: 20 }; // object\n\n// with defaults & rename\nconst { city = "Delhi", name: userName } = { name: "Raj" };\nconsole.log(first, name, userName, city);',
        keyPoints: [
          'Array destructuring is position-based',
          'Object destructuring is key-based',
          'Supports defaults and renaming',
          'Common for React props & function params',
        ],
        quiz: [
          {
            question: 'Object destructuring matches by…',
            options: ['position', 'key name', 'type', 'index'],
            correctIndex: 1,
          },
          {
            question: 'const [a, b] = [10, 20]; what is b?',
            options: ['10', '20', 'undefined', 'error'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Spread & Rest Operators',
        difficulty: 'medium',
        tags: ['es6', 'spread'],
        explanation: {
          english:
            'The ... syntax does two opposite jobs. Spread expands an array/object into individual elements (copying, merging). Rest collects multiple elements into a single array (in function params or destructuring).',
          hinglish:
            'Ye ... syntax do ulte kaam karta hai. Spread array/object ko alag-alag elements mein faila deta hai (copy, merge). Rest multiple elements ko ek array mein collect karta hai (function params ya destructuring mein).',
        },
        dailyLifeExample:
          'Spread = thaali ka saara khaana table pe faila dena. Rest = bache hue saare items ek dabbe mein bharna.',
        codeExample:
          '// spread (expand)\nconst a = [1, 2];\nconst b = [...a, 3, 4];       // [1,2,3,4]\nconst merged = { ...{x:1}, y:2 }; // {x:1,y:2}\n\n// rest (collect)\nconst [head, ...tail] = [1, 2, 3]; // head=1, tail=[2,3]',
        keyPoints: [
          'Same ... syntax, opposite roles',
          'Spread expands; rest collects',
          'Great for copying/merging arrays & objects',
          'Spread copies shallowly',
        ],
        quiz: [
          {
            question: 'What does spread (...) do?',
            options: ['Collects into array', 'Expands into individual elements', 'Deletes elements', 'Sorts'],
            correctIndex: 1,
          },
          {
            question: 'const [x, ...y] = [1,2,3]; what is y?',
            options: ['1', '[2,3]', '[1,2,3]', '3'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Strings',
    level: 'beginner',
    description: 'Text ke saath kaam — methods aur template literals.',
    concepts: [
      {
        title: 'String Methods',
        difficulty: 'easy',
        tags: ['strings'],
        explanation: {
          english:
            'Strings come with handy methods: length, toUpperCase/toLowerCase, includes, slice, split, trim, replace, and indexOf. Strings are immutable — methods return new strings rather than changing the original.',
          hinglish:
            'Strings ke saath kaam ke methods aate hain: length, toUpperCase/toLowerCase, includes, slice, split, trim, replace, indexOf. Strings immutable hoti hain — methods naya string dete hain, original ko change nahi karte.',
        },
        dailyLifeExample:
          'String ek mala (necklace) jaisa hai jiske har manke (character) ka apna index hai. slice = bich se kuch manke alag nikaal lena, bina mala todhe.',
        codeExample:
          'const s = "  Learnverse  ";\ns.trim();              // "Learnverse"\ns.toUpperCase();       // "  LEARNVERSE  "\n"a,b,c".split(",");    // ["a","b","c"]\n"hello".includes("ell"); // true\n"hello".slice(1, 3);   // "el"',
        keyPoints: [
          'Strings are immutable (methods return new strings)',
          'split → array, join → string',
          'slice extracts part of a string',
          'includes/indexOf to search',
        ],
        quiz: [
          {
            question: 'Strings in JavaScript are…',
            options: ['mutable', 'immutable', 'numbers', 'arrays'],
            correctIndex: 1,
          },
          {
            question: '"a,b".split(",") returns…',
            options: ['"ab"', '["a","b"]', '["a,b"]', '2'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Template Literals',
        difficulty: 'easy',
        tags: ['strings', 'es6'],
        explanation: {
          english:
            'Template literals use backticks (`) and let you embed variables/expressions with ${...} and write multi-line strings easily — no more messy + concatenation.',
          hinglish:
            'Template literals backticks (`) use karte hain aur ${...} se variables/expressions andar daal sakte ho, plus multi-line strings easily — ab + se jodne ki jhanjhat nahi.',
        },
        dailyLifeExample:
          'Template literal ek fill-in-the-blanks form jaisa hai: "Dear ${name}, aapka order ${id} ready hai." Blanks apne aap bhar jaate hain.',
        codeExample:
          'const name = "Abhi", items = 3;\nconst msg = `Hi ${name}, you have ${items} items.`;\n\nconst multi = `Line 1\nLine 2`; // multi-line\n\nconst total = `Total: ${items * 100}`; // expression',
        keyPoints: [
          'Use backticks ` ` instead of quotes',
          '${...} embeds variables and expressions',
          'Supports multi-line strings natively',
          'Cleaner than string + concatenation',
        ],
        quiz: [
          {
            question: 'Which character starts a template literal?',
            options: ["' (single quote)", '" (double quote)', '` (backtick)', '/ (slash)'],
            correctIndex: 2,
          },
          {
            question: 'How do you embed a variable in a template literal?',
            options: ['{var}', '${var}', '#{var}', '<var>'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

// ─────────────────────────── INTERMEDIATE ───────────────────────────
const intermediate = [
  {
    title: 'Advanced Functions',
    level: 'intermediate',
    description: 'Closures, higher-order functions, callbacks, recursion, IIFE.',
    concepts: [
      {
        title: 'Closures',
        difficulty: 'medium',
        tags: ['closures', 'scope'],
        explanation: {
          english:
            'A closure is a function that remembers the variables from where it was created, even after that outer function has finished. Functions carry a "backpack" of their birth-scope variables. This powers private variables, function factories, and React hooks.',
          hinglish:
            'Closure ek aisa function hai jo apne banne ki jagah ke variables ko yaad rakhta hai — chahe bahar wala function khatam ho gaya ho. Function apne saath ek "bag" leke chalta hai. Isi se private variables, function factories aur React hooks chalte hain.',
        },
        dailyLifeExample:
          'Dabbawala tiffin system: har dabbe pe code (variable) hota hai jo batata hai kiska tiffin hai. Dabbawala kahin bhi jaaye, har dabba apni identity yaad rakhta hai — mix nahi hote. Waise hi har closure apne variables alag yaad rakhta hai.',
        codeExample:
          'function makeCounter() {\n  let count = 0;        // private\n  return function () {\n    count++;            // closure remembers count\n    return count;\n  };\n}\nconst c = makeCounter();\nc(); // 1\nc(); // 2\nc(); // 3',
        keyPoints: [
          'Closure = function + remembered birth-scope variables',
          'Enables data privacy (private variables)',
          'Each closure keeps its own copy',
          'Common in counters, handlers, hooks',
        ],
        quiz: [
          {
            question: 'What does a closure remember?',
            options: ['Only globals', 'Variables from where it was defined', 'Nothing', 'Only params'],
            correctIndex: 1,
          },
          {
            question: 'Why does count survive between calls in makeCounter?',
            options: ['It is global', 'The inner function closes over count', 'Hoisting', 'It does not'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is a closure and give a real use case?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A closure is a function bundled with references to its surrounding state, letting it access outer variables even after that scope returned. Real uses: data privacy (counters with private state), function factories, memoization, and React hooks like useState.',
              hinglish:
                'Closure ek function hai jo apne surrounding state ke saath bundle hota hai, jisse wo scope return hone ke baad bhi outer variables access kar pata hai. Real use: data privacy (private state wale counters), function factories, memoization, aur React ke useState jaise hooks.',
            },
          },
        ],
      },
      {
        title: 'Higher-Order Functions',
        difficulty: 'medium',
        tags: ['functions', 'fp'],
        explanation: {
          english:
            'A higher-order function (HOF) either takes a function as an argument, returns a function, or both. map, filter, reduce, and setTimeout are HOFs. They make code reusable and declarative.',
          hinglish:
            'Higher-order function (HOF) ya to function ko argument leta hai, ya function return karta hai, ya dono. map, filter, reduce, setTimeout sab HOF hain. Ye code ko reusable aur declarative banate hain.',
        },
        dailyLifeExample:
          'HOF ek manager jaisa hai jo kaam (function) doosre worker ko de deta hai. Manager khud kaam nahi karta, kaam delegate karta hai.',
        codeExample:
          '// takes a function\nfunction repeat(n, action) {\n  for (let i = 0; i < n; i++) action(i);\n}\nrepeat(3, i => console.log(i));\n\n// returns a function\nconst multiplier = factor => num => num * factor;\nconst double = multiplier(2);\ndouble(5); // 10',
        keyPoints: [
          'Takes and/or returns functions',
          'map/filter/reduce/forEach are HOFs',
          'Enable reusable, declarative code',
          'Foundation of functional programming',
        ],
        quiz: [
          {
            question: 'A higher-order function…',
            options: ['Only does math', 'Takes or returns a function', 'Cannot be called', 'Is always async'],
            correctIndex: 1,
          },
          {
            question: 'Which is a higher-order function?',
            options: ['Math.max', 'array.map', 'parseInt', 'String'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Callbacks',
        difficulty: 'medium',
        tags: ['callbacks', 'async'],
        explanation: {
          english:
            'A callback is a function passed to another function to be called later — often after an async task finishes. Callbacks power events and timers, but deeply nested callbacks lead to "callback hell", which Promises/async-await solve.',
          hinglish:
            'Callback ek function hai jo doosre function ko diya jaata hai taaki baad mein call ho — aksar async kaam khatam hone ke baad. Callbacks events aur timers chalate hain, par bahut nested callbacks "callback hell" bana dete hain, jise Promises/async-await solve karte hain.',
        },
        dailyLifeExample:
          'Restaurant mein order dene ke baad apna number deke baith jaate ho — "ban jaaye to bula lena" (callback). Tum wait nahi karte, kaam hone par bulaya jaata hai.',
        codeExample:
          'function fetchData(cb) {\n  setTimeout(() => cb("data ready"), 1000);\n}\nfetchData(result => console.log(result));\n\n[1, 2, 3].forEach(n => console.log(n)); // callback per item',
        keyPoints: [
          'A function passed to be called later',
          'Used in events, timers, async APIs',
          'Deep nesting → callback hell',
          'Promises/async-await improve readability',
        ],
        quiz: [
          {
            question: 'A callback is…',
            options: ['A returned value', 'A function passed to be called later', 'A loop', 'An object'],
            correctIndex: 1,
          },
          {
            question: 'What problem do deeply nested callbacks cause?',
            options: ['Faster code', 'Callback hell (hard to read)', 'Type errors', 'Nothing'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Recursion',
        difficulty: 'medium',
        tags: ['recursion', 'functions'],
        explanation: {
          english:
            'Recursion is when a function calls itself to solve a smaller version of a problem. Every recursion needs a base case to stop, otherwise it overflows the call stack. Great for trees, factorials, and nested structures.',
          hinglish:
            'Recursion tab hai jab function khud ko call karta hai problem ka chhota version solve karne ke liye. Har recursion mein ek base case zaroori hai rukne ke liye, warna call stack overflow ho jaata hai. Trees, factorial, nested structures ke liye badhiya.',
        },
        dailyLifeExample:
          'Russian dolls (matryoshka): har doll ke andar chhoti doll. Tum kholte jaate ho jab tak sabse chhoti (base case) na aaye.',
        codeExample:
          'function factorial(n) {\n  if (n <= 1) return 1;   // base case\n  return n * factorial(n - 1); // recursive case\n}\nfactorial(5); // 120',
        keyPoints: [
          'Function calls itself',
          'Must have a base case to stop',
          'Each call adds a stack frame',
          'Ideal for trees & nested data',
        ],
        quiz: [
          {
            question: 'What stops a recursion from running forever?',
            options: ['A loop', 'The base case', 'return false', 'Nothing'],
            correctIndex: 1,
          },
          {
            question: 'Missing base case can cause…',
            options: ['Faster code', 'Stack overflow', 'A syntax error', 'undefined'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'IIFE (Immediately Invoked Function Expression)',
        difficulty: 'medium',
        tags: ['functions', 'scope'],
        explanation: {
          english:
            'An IIFE is a function that runs immediately after being defined. Wrapping code in (function(){ ... })() creates a private scope so variables do not leak into the global scope — historically used for module-like isolation.',
          hinglish:
            'IIFE ek function hai jo define hote hi turant chal jaata hai. (function(){ ... })() mein code wrap karne se ek private scope ban jaata hai taaki variables global scope mein leak na hon — pehle module jaisi isolation ke liye use hota tha.',
        },
        dailyLifeExample:
          'IIFE ek use-and-throw plate jaisa hai — kaam karo aur turant gayab, koi nishaan (global variable) nahi chhodta.',
        codeExample:
          '(function () {\n  const secret = "hidden";\n  console.log("runs immediately");\n})();\n// secret is NOT accessible here\n\n// arrow IIFE\n(() => console.log("also runs now"))();',
        keyPoints: [
          'Runs as soon as it is defined',
          'Creates a private scope (no global leaks)',
          'Syntax: (function(){})() or (()=>{})()',
          'Largely replaced by ES modules',
        ],
        quiz: [
          {
            question: 'When does an IIFE run?',
            options: ['When called later', 'Immediately after definition', 'Never', 'On page unload'],
            correctIndex: 1,
          },
          {
            question: 'Main benefit of an IIFE?',
            options: ['Faster math', 'Creates a private scope', 'Adds globals', 'Async by default'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'The "this" Keyword & Binding',
    level: 'intermediate',
    description: 'this kaise decide hota hai, aur call/apply/bind.',
    concepts: [
      {
        title: 'Understanding this',
        difficulty: 'hard',
        tags: ['this', 'context'],
        explanation: {
          english:
            'The value of `this` depends on HOW a function is called, not where it is defined. Alone or in a simple function it is the global object (or undefined in strict mode); as an object method it is that object; with new it is the new instance; arrow functions inherit this from their surroundings.',
          hinglish:
            '`this` ki value is baat pe depend karti hai ki function KAISE call hua, kahan define hua isse nahi. Akela/simple function mein global object (strict mode mein undefined); object method mein wahi object; new ke saath naya instance; arrow function surroundings se this leta hai.',
        },
        dailyLifeExample:
          'this "main abhi kaun hoon" jaisa hai — context pe depend karta hai. Office mein "employee", ghar pe "beta", dukaan pe "customer". Same insaan, alag this.',
        codeExample:
          'const obj = {\n  name: "Learnverse",\n  show() { return this.name; },\n};\nobj.show(); // "Learnverse" (this = obj)\n\nconst fn = obj.show;\n// fn(); // this is undefined/global — lost context',
        keyPoints: [
          'this depends on the call-site, not definition',
          'Method call → the object before the dot',
          'Standalone → global/undefined (strict)',
          'Arrow functions inherit this lexically',
        ],
        quiz: [
          {
            question: 'What determines the value of this?',
            options: ['Where the function is defined', 'How the function is called', 'The file name', 'Random'],
            correctIndex: 1,
          },
          {
            question: 'In obj.method(), this is…',
            options: ['window', 'obj', 'undefined', 'the method'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'call, apply & bind',
        difficulty: 'hard',
        tags: ['this', 'binding'],
        explanation: {
          english:
            'These methods set `this` manually. call invokes a function with a given this and comma-separated args. apply is the same but takes args as an array. bind returns a NEW function with this permanently fixed (it does not call immediately).',
          hinglish:
            'Ye methods `this` ko manually set karte hain. call function ko diye gaye this aur comma-separated args ke saath chalata hai. apply same hai par args array mein leta hai. bind ek NAYA function deta hai jisme this hamesha ke liye fix ho jaata hai (turant call nahi karta).',
        },
        dailyLifeExample:
          'bind ek pre-filled form jaisa hai — naam pehle se bhar diya, jab chaho submit karo. call/apply turant submit kar dete hain.',
        codeExample:
          'function intro(city) { return `${this.name} from ${city}`; }\nconst user = { name: "Abhi" };\n\nintro.call(user, "Delhi");   // "Abhi from Delhi"\nintro.apply(user, ["Pune"]); // args as array\nconst bound = intro.bind(user);\nbound("Mumbai");             // this fixed to user',
        keyPoints: [
          'call: args listed individually, invokes now',
          'apply: args as an array, invokes now',
          'bind: returns a new function with this fixed',
          'Useful for borrowing methods & fixing context',
        ],
        quiz: [
          {
            question: 'Which one does NOT call the function immediately?',
            options: ['call', 'apply', 'bind', 'all do'],
            correctIndex: 2,
            explanation: 'bind returns a new function; you call it later.',
          },
          {
            question: 'How does apply receive arguments?',
            options: ['Individually', 'As an array', 'As an object', 'It takes none'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Difference between call, apply and bind?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'All three set this. call and apply invoke the function immediately — call takes arguments individually, apply takes them as an array. bind does not invoke; it returns a new function with this (and optionally some args) permanently bound, to be called later.',
              hinglish:
                'Teeno this set karte hain. call aur apply turant function chalate hain — call args alag-alag leta hai, apply array mein. bind chalata nahi; ye ek naya function deta hai jisme this (aur optionally kuch args) permanently bind ho jaate hain, baad mein call karne ke liye.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Hoisting & Execution',
    level: 'intermediate',
    description: 'JS code andar se kaise chalta hai — hoisting, execution context, TDZ.',
    concepts: [
      {
        title: 'Hoisting',
        difficulty: 'medium',
        tags: ['hoisting'],
        explanation: {
          english:
            'Hoisting is JavaScript moving declarations to the top of their scope before running code. Function declarations are fully hoisted; var is hoisted as undefined; let and const are hoisted but unusable until declared (temporal dead zone).',
          hinglish:
            'Hoisting JS ka behaviour hai jisme declarations code chalne se pehle scope ke top pe chali jaati hain. Function declarations puri hoist; var undefined ke saath; let/const hoist to hoti hain par declare hone tak use nahi ho sakti (temporal dead zone).',
        },
        dailyLifeExample:
          'Shaadi ki guest list: function declaration wo mehmaan jo khaane ke saath aa gaya (ready). var wo jiska naam list mein hai par pahuncha nahi (undefined). let/const wo jiska naam to hai par entry time pe hi milegi.',
        codeExample:
          'sayHi(); // works — declarations hoisted\nfunction sayHi() { console.log("Hi"); }\n\nconsole.log(a); // undefined (var hoisted)\nvar a = 5;\n\n// console.log(b); // ReferenceError (TDZ)\nlet b = 10;',
        keyPoints: [
          'Function declarations are fully hoisted',
          'var is hoisted as undefined',
          'let/const hoisted but in the TDZ',
          'Prefer let/const to avoid surprises',
        ],
        quiz: [
          {
            question: 'console.log(a); var a = 5; logs…',
            options: ['5', 'undefined', 'ReferenceError', 'null'],
            correctIndex: 1,
          },
          {
            question: 'Which is fully hoisted and callable before its line?',
            options: ['Arrow in const', 'Function declaration', 'let variable', 'const variable'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Execution Context & Call Stack',
        difficulty: 'hard',
        tags: ['execution', 'call-stack'],
        explanation: {
          english:
            'Every time a function runs, JavaScript creates an execution context (its own variables, scope, and this). These contexts are stacked on the call stack — the last one in is the first out (LIFO). When a function returns, its context is popped off.',
          hinglish:
            'Jab bhi function chalta hai, JavaScript ek execution context banata hai (apne variables, scope, this). Ye contexts call stack pe lagte hain — last in, first out (LIFO). Function return hote hi uska context stack se hat jaata hai.',
        },
        dailyLifeExample:
          'Call stack plates ke dher jaisa hai: upar plate rakho (function call), kaam hone par upar wali plate hatao (return). Sabse upar wali pehle hatti hai.',
        codeExample:
          'function third() { console.log("3"); }\nfunction second() { third(); }\nfunction first() { second(); }\nfirst();\n// stack: first -> second -> third, then unwinds',
        keyPoints: [
          'Each call creates an execution context',
          'Contexts stack on the call stack (LIFO)',
          'Return pops the context off',
          'Too deep → "Maximum call stack size exceeded"',
        ],
        quiz: [
          {
            question: 'The call stack works in which order?',
            options: ['FIFO', 'LIFO (last in, first out)', 'Random', 'Sorted'],
            correctIndex: 1,
          },
          {
            question: 'What happens when a function returns?',
            options: ['Its context is pushed', 'Its context is popped off', 'Nothing', 'Stack clears fully'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Asynchronous JavaScript',
    level: 'intermediate',
    description: 'Non-blocking code — promises, async/await, event loop.',
    concepts: [
      {
        title: 'Synchronous vs Asynchronous',
        difficulty: 'medium',
        tags: ['async'],
        explanation: {
          english:
            'Synchronous code runs line by line, each waiting for the previous to finish. Asynchronous code can start a long task (like a network request) and continue without blocking, handling the result later. JS is single-threaded, so async keeps the UI responsive.',
          hinglish:
            'Synchronous code line-by-line chalta hai, har line pichhli ke khatam hone ka wait karti hai. Asynchronous code lamba kaam (jaise network request) shuru karke bina ruke aage badh jaata hai, result baad mein handle karta hai. JS single-threaded hai, isliye async UI ko responsive rakhta hai.',
        },
        dailyLifeExample:
          'Sync = ek hi counter pe line mein khade rehna, har banda baari-baari. Async = restaurant mein order deke baith jaana; cook parallel banata hai, ready hone par milta hai.',
        codeExample:
          'console.log("1");\nsetTimeout(() => console.log("2 (async)"), 0);\nconsole.log("3");\n// Output: 1, 3, 2 — async runs later',
        keyPoints: [
          'Sync: blocking, line by line',
          'Async: non-blocking, result handled later',
          'JS is single-threaded',
          'Async keeps apps responsive',
        ],
        quiz: [
          {
            question: 'What does console.log("1"); setTimeout(()=>console.log("2"),0); console.log("3") print?',
            options: ['1 2 3', '1 3 2', '3 2 1', '2 1 3'],
            correctIndex: 1,
            explanation: 'The timer callback runs after the synchronous lines.',
          },
          {
            question: 'JavaScript is…',
            options: ['Multi-threaded', 'Single-threaded', 'Thread-free', 'GPU-based'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Promises',
        difficulty: 'medium',
        tags: ['async', 'promises'],
        explanation: {
          english:
            'A Promise represents a value that will be available in the future. It has three states: pending, fulfilled, or rejected. You handle success with .then() and errors with .catch(). Promises replaced messy nested callbacks.',
          hinglish:
            'Promise ek aisi value represent karta hai jo future mein milegi. Iske teen states hain: pending, fulfilled, ya rejected. Success .then() se aur error .catch() se handle karte ho. Promises ne nested callbacks ki gandagi hata di.',
        },
        dailyLifeExample:
          'Online order ka tracking jaisa: pending (ship ho raha), fulfilled (deliver ho gaya), rejected (cancel). Tum wait nahi karte, status update aata hai.',
        codeExample:
          'const order = new Promise((resolve, reject) => {\n  const ok = true;\n  setTimeout(() => (ok ? resolve("Delivered") : reject("Failed")), 500);\n});\norder\n  .then(msg => console.log(msg))\n  .catch(err => console.log(err));',
        keyPoints: [
          'States: pending → fulfilled / rejected',
          '.then() for success, .catch() for errors',
          'Chainable, avoids callback hell',
          'Promise.all runs many in parallel',
        ],
        quiz: [
          {
            question: 'Which are valid Promise states?',
            options: ['start, end', 'pending, fulfilled, rejected', 'open, closed', 'true, false'],
            correctIndex: 1,
          },
          {
            question: 'Which handler catches a rejected promise?',
            options: ['.then()', '.catch()', '.finally()', '.do()'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'async / await',
        difficulty: 'medium',
        tags: ['async', 'es2017'],
        explanation: {
          english:
            'async/await is syntactic sugar over Promises that lets you write asynchronous code that reads like synchronous code. An async function always returns a Promise; await pauses inside it until a Promise settles. Use try/catch for errors.',
          hinglish:
            'async/await Promises ke upar ek meetha syntax hai jisse async code synchronous jaisa padhne mein aata hai. async function hamesha Promise return karta hai; await uske andar tab tak rukta hai jab tak Promise settle na ho. Errors ke liye try/catch use karo.',
        },
        dailyLifeExample:
          'await "ruko jab tak chai na ban jaaye, phir aage badho" jaisa hai — par baaki kitchen (program) block nahi hoti.',
        codeExample:
          'function getData() {\n  return new Promise(res => setTimeout(() => res("done"), 500));\n}\nasync function run() {\n  try {\n    const result = await getData();\n    console.log(result); // "done"\n  } catch (e) {\n    console.error(e);\n  }\n}\nrun();',
        keyPoints: [
          'async functions always return a Promise',
          'await pauses until the Promise settles',
          'Cleaner than .then() chains',
          'Handle errors with try/catch',
        ],
        quiz: [
          {
            question: 'An async function always returns…',
            options: ['undefined', 'a Promise', 'a string', 'nothing'],
            correctIndex: 1,
          },
          {
            question: 'How do you handle errors with async/await?',
            options: ['.catch only', 'try/catch', 'if/else', 'You cannot'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How does async/await relate to Promises?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'async/await is syntactic sugar built on Promises. An async function returns a Promise, and await unwraps a Promise\'s resolved value, pausing the function (not the whole thread) until it settles. It makes async code read top-to-bottom like sync code.',
              hinglish:
                'async/await Promises ke upar bana syntactic sugar hai. async function Promise return karta hai, aur await Promise ki resolved value nikalta hai, function ko (poore thread ko nahi) settle hone tak pause karke. Isse async code sync jaisa upar-se-neeche padha jaata hai.',
            },
          },
        ],
      },
      {
        title: 'The Event Loop',
        difficulty: 'hard',
        tags: ['async', 'event-loop'],
        explanation: {
          english:
            'The event loop is how single-threaded JS handles async work. Synchronous code runs on the call stack. Finished async callbacks wait in queues — microtasks (Promises) have higher priority than macrotasks (setTimeout). The loop empties the stack, then all microtasks, then one macrotask, and repeats.',
          hinglish:
            'Event loop wo tarika hai jisse single-threaded JS async kaam handle karta hai. Sync code call stack pe chalta hai. Pure async callbacks queues mein wait karte hain — microtasks (Promises) ki priority macrotasks (setTimeout) se zyada hai. Loop stack khaali karta hai, phir saare microtasks, phir ek macrotask, aur repeat.',
        },
        dailyLifeExample:
          'Bank mein ek hi cashier (single thread). VIP token (microtask/Promise) normal token (macrotask/setTimeout) se pehle. Cashier current customer (stack) nipta ke pehle saare VIP, phir ek normal lega.',
        codeExample:
          'console.log("A");\nsetTimeout(() => console.log("B"), 0); // macrotask\nPromise.resolve().then(() => console.log("C")); // microtask\nconsole.log("D");\n// Output: A, D, C, B',
        keyPoints: [
          'Call stack runs sync code first',
          'Microtasks (Promises) > macrotasks (timers)',
          'All microtasks drain before next macrotask',
          'Explains surprising async ordering',
        ],
        quiz: [
          {
            question: 'Which has higher priority?',
            options: ['Macrotask (setTimeout)', 'Microtask (Promise)', 'Both equal', 'Neither'],
            correctIndex: 1,
          },
          {
            question: 'console.log("A"); setTimeout(()=>log("B")); Promise.resolve().then(()=>log("C")); log("D") prints…',
            options: ['A B C D', 'A D C B', 'A D B C', 'A C D B'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the event loop, microtasks and macrotasks.',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'JS runs sync code on the call stack. Async callbacks are queued: microtasks (Promise callbacks, queueMicrotask) and macrotasks (setTimeout, setInterval, I/O). After the stack is empty, the event loop drains ALL microtasks, then runs ONE macrotask, then drains microtasks again, repeating. So Promise callbacks run before timers scheduled at the same time.',
              hinglish:
                'JS sync code call stack pe chalata hai. Async callbacks queue hote hain: microtasks (Promise callbacks, queueMicrotask) aur macrotasks (setTimeout, setInterval, I/O). Stack khaali hone par event loop SAARE microtasks nipta ta hai, phir EK macrotask, phir dobara microtasks, aur repeat. Isliye same time pe schedule Promise callbacks timers se pehle chalte hain.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'DOM & Events',
    level: 'intermediate',
    description: 'Browser ke saath interact — DOM, events, delegation.',
    concepts: [
      {
        title: 'DOM Manipulation',
        difficulty: 'medium',
        tags: ['dom', 'browser'],
        explanation: {
          english:
            'The DOM (Document Object Model) is a tree representation of the page that JS can read and change. Select elements with querySelector, then change text (textContent), HTML (innerHTML), attributes, styles, or add/remove elements.',
          hinglish:
            'DOM (Document Object Model) page ka ek tree representation hai jise JS padh aur badal sakta hai. querySelector se elements select karo, phir text (textContent), HTML (innerHTML), attributes, styles change karo, ya elements add/remove karo.',
        },
        dailyLifeExample:
          'DOM ghar ka naksha (blueprint) jaisa hai. JS interior designer hai jo deewar ka rang (style), furniture (elements) aur naam-plate (text) badal sakta hai.',
        codeExample:
          'const title = document.querySelector("#title");\ntitle.textContent = "Learnverse";\ntitle.style.color = "indigo";\n\nconst li = document.createElement("li");\nli.textContent = "New item";\ndocument.querySelector("ul").appendChild(li);',
        keyPoints: [
          'DOM = tree of the page JS can edit',
          'querySelector / querySelectorAll to select',
          'textContent, innerHTML, style, attributes',
          'createElement + appendChild to add nodes',
        ],
        quiz: [
          {
            question: 'What does the DOM represent?',
            options: ['The server', 'A tree of the page', 'The database', 'CSS only'],
            correctIndex: 1,
          },
          {
            question: 'Which selects the first matching element?',
            options: ['getElement', 'querySelector', 'selectOne', 'find'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Event Bubbling & Delegation',
        difficulty: 'hard',
        tags: ['events', 'dom'],
        explanation: {
          english:
            'When an event fires on an element, it bubbles up through its ancestors. Event delegation uses this: instead of adding listeners to many children, add one listener on the parent and check event.target. It is efficient and works for dynamically added elements.',
          hinglish:
            'Jab kisi element pe event fire hota hai, wo apne ancestors tak bubble karta hai (upar jaata hai). Event delegation isi ka faida uthata hai: bahut saare children pe listener lagane ke bajaye, parent pe ek listener lagao aur event.target check karo. Ye efficient hai aur dynamically add hue elements pe bhi chalta hai.',
        },
        dailyLifeExample:
          'Class monitor (parent) ek hi banda sabki shikayat sunta hai, har bachche ke peeche teacher nahi lagti. Naya bachcha aaye to bhi monitor uski bhi sunega (dynamic).',
        codeExample:
          'document.querySelector("ul").addEventListener("click", (e) => {\n  if (e.target.tagName === "LI") {\n    console.log("Clicked:", e.target.textContent);\n  }\n});\n// one listener handles all <li>, even new ones',
        keyPoints: [
          'Events bubble from target up to ancestors',
          'Delegation: one parent listener for many children',
          'Use event.target to find the real source',
          'Works for dynamically added elements',
        ],
        quiz: [
          {
            question: 'Event bubbling means an event travels…',
            options: ['Down to children', 'Up to ancestors', 'Sideways', 'Nowhere'],
            correctIndex: 1,
          },
          {
            question: 'Main benefit of event delegation?',
            options: ['More listeners', 'One listener handles many (incl. new) elements', 'Slower code', 'No event object'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'ES6+ Features',
    level: 'intermediate',
    description: 'Modern JavaScript — modules, optional chaining, nullish coalescing.',
    concepts: [
      {
        title: 'Modules (import / export)',
        difficulty: 'medium',
        tags: ['modules', 'es6'],
        explanation: {
          english:
            'Modules let you split code across files. Use export to expose values and import to use them elsewhere. There are named exports (many per file) and one default export. Modules have their own scope, avoiding global pollution.',
          hinglish:
            'Modules code ko alag files mein baant te hain. export se values bahar do aur import se kahin aur use karo. Named exports (ek file mein kai) aur ek default export hota hai. Modules ka apna scope hota hai, global pollution nahi hoti.',
        },
        dailyLifeExample:
          'Modules ek kitchen ke alag-alag dabbe jaise hain — masala, chawal, dal alag. Jab jo chahiye, wahi dabba (import) khol lo, poori almari nahi.',
        codeExample:
          '// math.js\nexport const add = (a, b) => a + b;      // named\nexport default function () {}            // default\n\n// app.js\nimport defaultFn, { add } from "./math.js";\nadd(2, 3); // 5',
        keyPoints: [
          'export exposes, import consumes',
          'Named exports: many per file; default: one',
          'Each module has its own scope',
          'Enables maintainable, reusable code',
        ],
        quiz: [
          {
            question: 'How many default exports can a module have?',
            options: ['Zero', 'One', 'Many', 'Unlimited'],
            correctIndex: 1,
          },
          {
            question: 'Which keyword brings a module value into a file?',
            options: ['require', 'include', 'import', 'use'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Optional Chaining & Nullish Coalescing',
        difficulty: 'easy',
        tags: ['es2020'],
        explanation: {
          english:
            'Optional chaining (?.) safely accesses nested properties — if something is null/undefined it returns undefined instead of throwing. Nullish coalescing (??) gives a fallback only when the left side is null or undefined (unlike ||, which also triggers on 0 or "").',
          hinglish:
            'Optional chaining (?.) nested properties ko safely access karta hai — agar koi cheez null/undefined ho to error ke bajaye undefined deta hai. Nullish coalescing (??) tabhi fallback deta hai jab left side null ya undefined ho (|| ke ulat, jo 0 ya "" pe bhi chal jaata hai).',
        },
        dailyLifeExample:
          '?. ek samajhdaar postman jaisa hai — ghar hi na ho to chitthi wapas le aata hai, darwaza nahi todta. ?? "agar address khaali ho tabhi default address use karo" jaisa hai.',
        codeExample:
          'const user = { profile: null };\nuser.profile?.name;        // undefined (no crash)\n\nconst count = 0;\ncount || 10;   // 10  (|| treats 0 as falsy)\ncount ?? 10;   // 0   (?? only for null/undefined)',
        keyPoints: [
          '?. avoids "cannot read property of undefined" errors',
          '?? falls back only on null/undefined',
          '|| falls back on any falsy (0, "", false too)',
          'Great for optional API data',
        ],
        quiz: [
          {
            question: 'What does 0 ?? 10 return?',
            options: ['10', '0', 'null', 'undefined'],
            correctIndex: 1,
            explanation: '?? only falls back on null/undefined, and 0 is neither.',
          },
          {
            question: 'user.profile?.name when profile is null returns…',
            options: ['error', 'undefined', 'null', 'name'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

// ───────────────────────────── ADVANCED ─────────────────────────────
const advanced = [
  {
    title: 'Objects & Prototypes',
    level: 'advanced',
    description: 'JavaScript ka inheritance model — prototypes aur classes.',
    concepts: [
      {
        title: 'Prototypes & the Prototype Chain',
        difficulty: 'hard',
        tags: ['prototypes', 'oop'],
        explanation: {
          english:
            'Every JS object has a hidden link to another object called its prototype. When you access a property not on the object, JS walks up this prototype chain until it finds it or reaches null. This is how methods like array.map are shared without copying onto every array.',
          hinglish:
            'Har JS object ka ek chhupa link hota hai doosre object se jise prototype kehte hain. Jab koi property object pe na ho, JS is prototype chain pe upar chadhta hai jab tak mil na jaaye ya null na aaye. Isi tarah array.map jaise methods har array pe copy kiye bina share hote hain.',
        },
        dailyLifeExample:
          'Prototype chain family inheritance jaisa hai: tumhare paas kuch na ho to papa se maango, unke paas na ho to dada se. Koi na koi de hi deta hai (ya end pe null).',
        codeExample:
          'const animal = { eats: true };\nconst dog = Object.create(animal); // dog\'s prototype = animal\ndog.barks = true;\n\ndog.barks; // true (own)\ndog.eats;  // true (from prototype)\ndog.flies; // undefined (chain ends)',
        keyPoints: [
          'Objects link to a prototype object',
          'Missing props are looked up the chain',
          'Chain ends at null',
          'Enables shared methods (memory efficient)',
        ],
        quiz: [
          {
            question: 'Where does JS look if a property is not on the object itself?',
            options: ['Nowhere', 'Up the prototype chain', 'The global scope', 'The server'],
            correctIndex: 1,
          },
          {
            question: 'The prototype chain ends at…',
            options: ['undefined', 'null', 'Object', 'the window'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is prototypal inheritance in JavaScript?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Objects inherit directly from other objects via a prototype link. When a property/method is not found on an object, the engine looks up its prototype chain. Unlike classical inheritance with classes/blueprints, JS objects link to live prototype objects. ES6 class is syntactic sugar over this mechanism.',
              hinglish:
                'Objects doosre objects se seedha inherit karte hain ek prototype link ke through. Jab property/method object pe na mile, engine prototype chain pe dekhta hai. Classes/blueprints wale classical inheritance ke ulat, JS objects live prototype objects se link hote hain. ES6 class isi mechanism ke upar syntactic sugar hai.',
            },
          },
        ],
      },
      {
        title: 'Classes',
        difficulty: 'medium',
        tags: ['classes', 'oop', 'es6'],
        explanation: {
          english:
            'ES6 classes are cleaner syntax for creating objects and handling inheritance — under the hood they still use prototypes. A class has a constructor, methods, and can extend another class using super to call the parent.',
          hinglish:
            'ES6 classes objects banane aur inheritance ke liye saaf syntax hain — andar se ye ab bhi prototypes use karti hain. Class mein constructor, methods hote hain, aur extend se doosri class ko inherit kar sakte ho, super se parent ko call karke.',
        },
        dailyLifeExample:
          'Class ek mould (saancha) jaisa hai jisse ek jaise objects (instances) bante hain — jaise ek hi machine se kai biscuits.',
        codeExample:
          'class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return `${this.name} makes a sound`; }\n}\nclass Dog extends Animal {\n  speak() { return `${this.name} barks`; }\n}\nnew Dog("Tommy").speak(); // "Tommy barks"',
        keyPoints: [
          'class is sugar over prototypes',
          'constructor initializes instances',
          'extends + super for inheritance',
          'new creates an instance',
        ],
        quiz: [
          {
            question: 'JS classes are built on top of…',
            options: ['structs', 'prototypes', 'arrays', 'modules'],
            correctIndex: 1,
          },
          {
            question: 'Which keyword calls the parent constructor?',
            options: ['parent()', 'super()', 'base()', 'this()'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Functional Programming',
    level: 'advanced',
    description: 'Pure functions, immutability, currying, composition.',
    concepts: [
      {
        title: 'Pure Functions & Immutability',
        difficulty: 'medium',
        tags: ['fp'],
        explanation: {
          english:
            'A pure function returns the same output for the same input and has no side effects (no changing outside state, no I/O). Immutability means not mutating data but returning new copies. Together they make code predictable, testable, and bug-resistant — core to React/Redux.',
          hinglish:
            'Pure function same input pe hamesha same output deta hai aur koi side effect nahi (bahar ki state change nahi, na I/O). Immutability ka matlab data ko mutate na karke nayi copy return karna. Dono milke code ko predictable, testable aur bug-free banate hain — React/Redux ka core.',
        },
        dailyLifeExample:
          'Pure function ek vending machine jaisa hai — same button (input) pe hamesha same product (output), mood ya time ka asar nahi. Immutability = original document edit mat karo, copy banao.',
        codeExample:
          '// pure\nconst add = (a, b) => a + b;\n\n// impure (side effect)\nlet total = 0;\nconst addImpure = n => (total += n);\n\n// immutable update\nconst arr = [1, 2, 3];\nconst next = [...arr, 4]; // new array, arr untouched',
        keyPoints: [
          'Pure: same input → same output, no side effects',
          'Immutability: return copies, do not mutate',
          'Easier to test and reason about',
          'Foundation of React/Redux state',
        ],
        quiz: [
          {
            question: 'A pure function…',
            options: ['Changes global state', 'Same input → same output, no side effects', 'Does I/O', 'Is random'],
            correctIndex: 1,
          },
          {
            question: 'Immutable update of an array means…',
            options: ['arr.push(x)', 'return [...arr, x]', 'arr[0] = x', 'arr.length = 0'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Currying & Composition',
        difficulty: 'hard',
        tags: ['fp', 'currying'],
        explanation: {
          english:
            'Currying transforms a function of many arguments into a chain of functions each taking one argument — enabling reusable, partially-applied functions. Composition combines small functions so the output of one feeds the next, building complex behaviour from simple pieces.',
          hinglish:
            'Currying ek multi-argument function ko aise functions ki chain mein badal deta hai jinme har ek sirf ek argument leta hai — isse reusable, partially-applied functions bante hain. Composition chhote functions ko jodta hai taaki ek ka output agle ka input bane, simple tukdo se complex behaviour.',
        },
        dailyLifeExample:
          'Currying = thali order karna step by step: pehle roti chuno, phir sabzi, phir dal. Composition = assembly line: ek station ka output agle station ka input.',
        codeExample:
          '// currying\nconst add = a => b => c => a + b + c;\nadd(1)(2)(3); // 6\n\n// composition\nconst compose = (f, g) => x => f(g(x));\nconst double = n => n * 2;\nconst inc = n => n + 1;\ncompose(double, inc)(5); // double(inc(5)) = 12',
        keyPoints: [
          'Currying: f(a, b) → f(a)(b)',
          'Enables partial application & reuse',
          'Composition pipes output → input',
          'Build complex logic from small pure functions',
        ],
        quiz: [
          {
            question: 'Currying turns f(a, b, c) into…',
            options: ['f(a, b, c)', 'f(a)(b)(c)', 'f([a,b,c])', 'f()'],
            correctIndex: 1,
          },
          {
            question: 'In compose(f, g)(x), what runs first?',
            options: ['f', 'g', 'both', 'neither'],
            correctIndex: 1,
            explanation: 'g(x) runs first, then f receives its result.',
          },
        ],
      },
    ],
  },
  {
    title: 'Advanced Concepts',
    level: 'advanced',
    description: 'Debounce/throttle, memoization, generators, Map/Set.',
    concepts: [
      {
        title: 'Debounce & Throttle',
        difficulty: 'hard',
        tags: ['performance', 'patterns'],
        explanation: {
          english:
            'Both limit how often a function runs on rapid events (typing, scrolling, resizing). Debounce waits until events stop for a delay, then runs once (good for search inputs). Throttle runs at most once per interval no matter how many events fire (good for scroll handlers).',
          hinglish:
            'Dono rapid events (typing, scroll, resize) pe function kitni baar chale isse control karte hain. Debounce tab tak rukta hai jab tak events ruk na jaayein, phir ek baar chalta hai (search input ke liye). Throttle chahe jitne events aayein, ek interval mein zyada se zyada ek baar chalta hai (scroll handler ke liye).',
        },
        dailyLifeExample:
          'Debounce = lift ka darwaza: log aate rahein to wait karta hai, jab koi na aaye tabhi band hota hai. Throttle = metro: chahe kitni bheed ho, har 5 min mein ek hi train.',
        codeExample:
          'function debounce(fn, delay) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), delay);\n  };\n}\nconst onSearch = debounce(q => console.log("search", q), 300);',
        keyPoints: [
          'Debounce: run once after events stop',
          'Throttle: run at most once per interval',
          'Debounce for search inputs',
          'Throttle for scroll/resize handlers',
        ],
        quiz: [
          {
            question: 'Which is best for a search-as-you-type input?',
            options: ['Throttle', 'Debounce', 'Neither', 'setInterval'],
            correctIndex: 1,
          },
          {
            question: 'Throttle ensures a function runs…',
            options: ['Every event', 'At most once per interval', 'Never', 'Only once ever'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Difference between debounce and throttle?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Debounce delays execution until a pause in events (resets the timer on each event) — ideal for search inputs and autosave. Throttle guarantees execution at a fixed maximum rate regardless of event frequency — ideal for scroll, resize, and mousemove handlers.',
              hinglish:
                'Debounce execution ko events mein pause aane tak rok deta hai (har event pe timer reset) — search input aur autosave ke liye best. Throttle event frequency chahe jo ho, ek fixed maximum rate pe execution guarantee karta hai — scroll, resize, mousemove ke liye best.',
            },
          },
        ],
      },
      {
        title: 'Memoization',
        difficulty: 'hard',
        tags: ['performance', 'fp'],
        explanation: {
          english:
            'Memoization caches a function\'s results by its arguments, so repeated calls with the same input return instantly instead of recomputing. It trades memory for speed and works best for pure, expensive functions.',
          hinglish:
            'Memoization function ke results ko uske arguments ke hisaab se cache kar leta hai, taaki same input pe dobara call turant result de, dobara compute na kare. Ye memory deke speed leta hai aur pure, mehnga functions ke liye best hai.',
        },
        dailyLifeExample:
          'Memoization ek student ke ready-made notes jaise hain — ek baar solve kiya sawaal dobara aaye to seedha answer, dobara mehnat nahi.',
        codeExample:
          'function memoize(fn) {\n  const cache = new Map();\n  return (n) => {\n    if (cache.has(n)) return cache.get(n);\n    const result = fn(n);\n    cache.set(n, result);\n    return result;\n  };\n}\nconst slowSquare = memoize(n => n * n);',
        keyPoints: [
          'Caches results keyed by arguments',
          'Repeated inputs return instantly',
          'Trades memory for speed',
          'Best for pure, expensive functions',
        ],
        quiz: [
          {
            question: 'Memoization improves performance by…',
            options: ['Recomputing each time', 'Caching results by input', 'Using less memory', 'Deleting functions'],
            correctIndex: 1,
          },
          {
            question: 'Memoization works best for…',
            options: ['Impure random functions', 'Pure, expensive functions', 'I/O functions', 'Empty functions'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Generators & Iterators',
        difficulty: 'hard',
        tags: ['generators', 'es6'],
        explanation: {
          english:
            'A generator function (function*) can pause and resume using yield, producing a sequence of values lazily (one at a time, on demand). It returns an iterator you advance with .next(). Useful for infinite sequences, lazy evaluation, and custom iteration.',
          hinglish:
            'Generator function (function*) yield se ruk aur dobara chal sakta hai, values ko lazily (ek-ek karke, demand pe) produce karta hai. Ye ek iterator return karta hai jise .next() se aage badhate ho. Infinite sequences, lazy evaluation aur custom iteration ke liye useful.',
        },
        dailyLifeExample:
          'Generator ek Netflix series jaisa hai — ek episode (value) dekho, "next" dabao tabhi agla chale. Saari series ek saath load nahi hoti.',
        codeExample:
          'function* idMaker() {\n  let id = 1;\n  while (true) yield id++;\n}\nconst gen = idMaker();\ngen.next().value; // 1\ngen.next().value; // 2\ngen.next().value; // 3',
        keyPoints: [
          'function* + yield to pause/resume',
          'Produces values lazily on .next()',
          'Returns an iterator',
          'Great for infinite/lazy sequences',
        ],
        quiz: [
          {
            question: 'Which keyword pauses a generator?',
            options: ['return', 'yield', 'await', 'break'],
            correctIndex: 1,
          },
          {
            question: 'How do you get the next value from a generator?',
            options: ['.value()', '.next()', '.get()', '.pull()'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Map, Set, WeakMap & WeakSet',
        difficulty: 'medium',
        tags: ['collections', 'es6'],
        explanation: {
          english:
            'Map stores key–value pairs with keys of ANY type (objects included) and remembers insertion order. Set stores unique values (no duplicates). WeakMap/WeakSet hold weak references that allow garbage collection, useful for private data and caches.',
          hinglish:
            'Map key–value pairs store karta hai jisme keys KISI bhi type ki ho sakti hain (objects bhi) aur insertion order yaad rakhta hai. Set unique values rakhta hai (duplicate nahi). WeakMap/WeakSet weak references rakhte hain jo garbage collection allow karte hain, private data aur caches ke liye useful.',
        },
        dailyLifeExample:
          'Set ek guest list jaisa hai jisme har naam ek hi baar — duplicate apne aap hat jaata hai. Map ek dictionary jaisa hai jahan koi bhi cheez key ho sakti hai.',
        codeExample:
          'const set = new Set([1, 1, 2, 3]); // {1,2,3}\nset.has(2); // true\n\nconst map = new Map();\nmap.set("a", 1).set({id:1}, "obj key");\nmap.get("a"); // 1\nmap.size;     // 2',
        keyPoints: [
          'Map: any-type keys, ordered',
          'Set: unique values only',
          'Weak* allow garbage collection',
          'Set is great for de-duplication',
        ],
        quiz: [
          {
            question: 'What is special about a Set?',
            options: ['Keeps duplicates', 'Stores only unique values', 'Only numbers', 'Is sorted'],
            correctIndex: 1,
          },
          {
            question: 'Map keys can be…',
            options: ['Only strings', 'Any type including objects', 'Only numbers', 'Only symbols'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Error Handling & Performance',
    level: 'advanced',
    description: 'Robust code — error handling, memory & garbage collection.',
    concepts: [
      {
        title: 'Error Handling: try / catch / finally',
        difficulty: 'easy',
        tags: ['errors'],
        explanation: {
          english:
            'Use try/catch to handle runtime errors gracefully instead of crashing. Code in try runs; if it throws, catch handles the error; finally always runs (cleanup). You can throw your own errors with throw new Error("message").',
          hinglish:
            'Runtime errors ko crash hone dene ke bajaye gracefully handle karne ke liye try/catch use karo. try ka code chalta hai; agar error aaye to catch handle karta hai; finally hamesha chalta hai (cleanup). throw new Error("message") se apne errors bhi throw kar sakte ho.',
        },
        dailyLifeExample:
          'try/catch ek helmet jaisa hai — accident (error) ho to bhi tum safe, program crash nahi karta. finally = "chahe kuch bhi ho, gaadi park to karni hi hai".',
        codeExample:
          'try {\n  JSON.parse("not json"); // throws\n} catch (err) {\n  console.log("Handled:", err.message);\n} finally {\n  console.log("Always runs");\n}\n\nthrow new Error("Custom error"); // your own',
        keyPoints: [
          'try runs risky code',
          'catch handles thrown errors',
          'finally always runs (cleanup)',
          'throw new Error() for custom errors',
        ],
        quiz: [
          {
            question: 'Which block always runs, error or not?',
            options: ['try', 'catch', 'finally', 'none'],
            correctIndex: 2,
          },
          {
            question: 'How do you raise a custom error?',
            options: ['error()', 'throw new Error()', 'raise()', 'fail()'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Garbage Collection & Memory Leaks',
        difficulty: 'hard',
        tags: ['memory', 'performance'],
        explanation: {
          english:
            'JavaScript automatically frees memory that is no longer reachable (garbage collection, using mark-and-sweep). A memory leak happens when you unintentionally keep references alive — forgotten timers, detached DOM nodes, or growing global caches — so the GC cannot reclaim them.',
          hinglish:
            'JavaScript apne aap wo memory free kar deta hai jo ab reachable nahi (garbage collection, mark-and-sweep se). Memory leak tab hota hai jab anjaane mein references zinda rehte hain — bhoole hue timers, detached DOM nodes, ya badhte global caches — to GC unhe reclaim nahi kar pata.',
        },
        dailyLifeExample:
          'Garbage collection safai-wala bhaiya hai jo bekaar saamaan utha le jaata hai. Memory leak = tumne kuch saamaan "abhi chahiye" bol ke pakad rakha hai jo asal mein chahiye hi nahi — kamra bharta jaata hai.',
        codeExample:
          '// leak: forgotten interval keeps refs alive\nlet data = loadHugeData();\nconst id = setInterval(() => use(data), 1000);\n// fix: clear it when done\nclearInterval(id);\ndata = null; // allow GC',
        keyPoints: [
          'GC frees unreachable memory automatically',
          'Leaks keep unwanted references alive',
          'Common causes: timers, listeners, detached DOM, caches',
          'Clear timers/listeners and null big refs',
        ],
        quiz: [
          {
            question: 'JavaScript reclaims memory that is…',
            options: ['Frequently used', 'No longer reachable', 'Global', 'A string'],
            correctIndex: 1,
          },
          {
            question: 'Which commonly causes a memory leak?',
            options: ['Clearing intervals', 'Forgotten timers/listeners', 'Using const', 'Pure functions'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

// Standalone interview questions (not tied to one concept) — browsable on /interview-questions
export const generalInterviewQuestions = [
  {
    question: 'Is JavaScript synchronous or asynchronous, single or multi-threaded?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'JavaScript is single-threaded and synchronous by default — it runs one statement at a time on a single call stack. Asynchronous behaviour (timers, fetch, promises) is provided by the host environment (browser/Node) and coordinated via the event loop, so JS never truly runs code in parallel on its main thread.',
      hinglish:
        'JavaScript by default single-threaded aur synchronous hai — ek time pe ek statement, ek hi call stack pe. Asynchronous behaviour (timers, fetch, promises) host environment (browser/Node) deta hai aur event loop ke through coordinate hota hai, isliye JS apne main thread pe kabhi sach mein parallel code nahi chalata.',
    },
  },
  {
    question: 'What is the difference between null and undefined?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'undefined means a variable was declared but not assigned (JS default). null is an intentional "no value" you assign yourself. typeof undefined is "undefined"; typeof null is "object" (a known bug). undefined == null is true, but undefined === null is false.',
      hinglish:
        'undefined matlab variable declare hua par value nahi mili (JS ka default). null tum khud "koi value nahi" ke liye assign karte ho. typeof undefined "undefined" hai; typeof null "object" (famous bug). undefined == null true hai, par undefined === null false.',
    },
  },
  {
    question: 'What are the different ways to copy an object in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Shallow copy: spread { ...obj } or Object.assign({}, obj) — nested objects still share references. Deep copy: structuredClone(obj) (modern), or JSON.parse(JSON.stringify(obj)) (loses functions/dates/undefined). Choose deep copy when you must avoid shared nested references.',
      hinglish:
        'Shallow copy: spread { ...obj } ya Object.assign({}, obj) — nested objects ab bhi reference share karte hain. Deep copy: structuredClone(obj) (modern), ya JSON.parse(JSON.stringify(obj)) (functions/dates/undefined kho deta hai). Jab nested shared references avoid karne hon to deep copy chuno.',
    },
  },
  {
    question: 'What is the "temporal dead zone"?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'The temporal dead zone (TDZ) is the period between entering a scope and the line where a let/const variable is declared. The variable is hoisted but accessing it in the TDZ throws a ReferenceError, unlike var which would give undefined.',
      hinglish:
        'Temporal dead zone (TDZ) wo period hai scope mein ghusne se le kar us line tak jahan let/const variable declare hota hai. Variable hoist to hota hai par TDZ mein use karne pe ReferenceError aata hai, var ke ulat jo undefined deta.',
    },
  },
  {
    question: 'Explain event delegation and why it is useful.',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Event delegation attaches a single listener to a parent element and uses event bubbling plus event.target to handle events from many children. It reduces the number of listeners (better performance/memory) and automatically handles elements added to the DOM later.',
      hinglish:
        'Event delegation ek parent element pe ek hi listener lagata hai aur event bubbling plus event.target se bahut saare children ke events handle karta hai. Isse listeners kam lagte hain (better performance/memory) aur baad mein DOM mein add hue elements bhi apne aap handle ho jaate hain.',
    },
  },
  {
    question: 'What is ECMAScript and how does it relate to JavaScript?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'ECMAScript (ES) is the official language specification maintained by ECMA International. JavaScript is the most popular implementation of that spec. ES6 (ES2015) was a landmark release that added let/const, arrow functions, classes, template literals, destructuring, modules, Promises, and more. New editions are now released every year (ES2016, ES2017, …). When people say "modern JS" they usually mean ES6+.',
      hinglish:
        'ECMAScript (ES) ECMA International dwara maintain ki jane wali official language specification hai. JavaScript us spec ki sabse popular implementation hai. ES6 (ES2015) ek landmark release thi jisne let/const, arrow functions, classes, template literals, destructuring, modules, Promises, aur aur cheezein add ki. Nayi editions ab har saal release hoti hain (ES2016, ES2017, …). Jab log "modern JS" kehte hain to aam taur pe ES6+ matlab hota hai.',
    },
  },
  {
    question: 'What is the difference between let, const, and var?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'var: function-scoped, hoisted with value undefined, can be redeclared and reassigned, no block scope. let: block-scoped ({} or loop), hoisted but in TDZ (ReferenceError if accessed before declaration), can be reassigned but not redeclared in same scope. const: block-scoped, must be initialised, cannot be reassigned (but object properties CAN be mutated). Best practice: use const by default; let when you need to reassign; never use var in modern code.',
      hinglish:
        'var: function-scoped, undefined value ke saath hoisted, redeclare aur reassign ho sakta hai, block scope nahi. let: block-scoped ({} ya loop), hoisted but TDZ mein (declaration se pehle access karo to ReferenceError), reassign ho sakta hai par same scope mein redeclare nahi. const: block-scoped, initialise zaroori, reassign nahi ho sakta (par object properties mutate HO sakti hain). Best practice: default const use karo; reassign karna ho to let; modern code mein kabhi var use mat karo.',
    },
  },
  {
    question: 'What are the spread operator, rest operator, and default parameters?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Spread (...arr): expands an iterable into individual elements — used to copy/merge arrays/objects: [...a, ...b], {...obj, key: val}. Rest (...args): collects remaining arguments into an array — used in function parameters: function fn(a, b, ...rest). Default parameters: function greet(name = "World") {} — provides a fallback value when the argument is undefined. All three use ... but context determines which one it is.',
      hinglish:
        'Spread (...arr): iterable ko individual elements mein expand karta hai — arrays/objects copy/merge karne ke liye: [...a, ...b], {...obj, key: val}. Rest (...args): remaining arguments ko ek array mein collect karta hai — function parameters mein: function fn(a, b, ...rest). Default parameters: function greet(name = "World") {} — argument undefined hone pe fallback value provide karta hai. Teeno ... use karte hain par context decide karta hai kaun sa hai.',
    },
  },
  {
    question: 'What is the difference between deep copy and shallow copy in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Shallow copy: copies only the top-level properties — nested objects/arrays are still shared by reference. Methods: spread { ...obj }, Object.assign(), [...arr]. If you mutate a nested object in the copy, it also changes the original. Deep copy: copies all levels recursively — no shared references. Methods: structuredClone(obj) (modern, native), JSON.parse(JSON.stringify(obj)) (loses functions, undefined, Date becomes string). Use deep copy when nested data must be fully independent.',
      hinglish:
        'Shallow copy: sirf top-level properties copy karta hai — nested objects/arrays reference se share hote hain. Methods: spread { ...obj }, Object.assign(), [...arr]. Agar copy mein nested object mutate karo, original bhi change hota hai. Deep copy: saare levels recursively copy karta hai — koi shared references nahi. Methods: structuredClone(obj) (modern, native), JSON.parse(JSON.stringify(obj)) (functions, undefined khota hai, Date string ban jaata hai). Deep copy tab use karo jab nested data fully independent hona chahiye.',
    },
  },
  {
    question: 'What are Promises, callbacks, and async/await in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Callback: a function passed as an argument to be called later — the old way for async. Problem: "callback hell" (deeply nested). Promise: an object representing a future value with states pending → fulfilled/rejected. Chained with .then()/.catch()/.finally(). async/await: syntactic sugar over Promises — async functions always return a Promise; await pauses execution until the Promise resolves, making async code look synchronous. Use async/await for readability; Promises for parallel operations (Promise.all).',
      hinglish:
        'Callback: ek function jo argument ke roop mein pass hota hai baad mein call hone ke liye — async ka purana tarika. Problem: "callback hell" (deeply nested). Promise: ek object jo future value represent karta hai states pending → fulfilled/rejected ke saath. .then()/.catch()/.finally() se chain karo. async/await: Promises pe syntactic sugar — async functions hamesha Promise return karte hain; await execution pause karta hai jab tak Promise resolve na ho, async code synchronous jaisa dikhta hai. Readability ke liye async/await use karo; parallel operations ke liye Promises (Promise.all).',
    },
  },
  {
    question: 'What is event bubbling and event capturing in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'When an event fires, it goes through three phases: (1) Capturing: travels down from window to the target. (2) Target: reaches the target element. (3) Bubbling: travels back up to window. By default, addEventListener uses bubbling (third argument false). To use the capturing phase, pass true or { capture: true }. To stop propagation: event.stopPropagation(). event.stopImmediatePropagation() also stops other listeners on the same element.',
      hinglish:
        'Jab event fire hota hai, teen phases se guzarta hai: (1) Capturing: window se target tak neeche travel karta hai. (2) Target: target element tak pahuncha. (3) Bubbling: wapas window tak upar travel karta hai. By default, addEventListener bubbling use karta hai (third argument false). Capturing phase ke liye true ya { capture: true } pass karo. Propagation rokne ke liye: event.stopPropagation(). event.stopImmediatePropagation() same element pe doosre listeners bhi rokta hai.',
    },
  },
  {
    question: 'What is a higher-order function in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A higher-order function is a function that takes one or more functions as arguments or returns a function. Examples: map, filter, reduce, forEach, setTimeout. They enable functional programming patterns — composing, currying, and abstracting iteration. Custom example: function withLogging(fn) { return (...args) => { console.log(args); return fn(...args); }; }.',
      hinglish:
        'Higher-order function ek function hai jo ek ya zyada functions arguments ke roop mein leta hai ya function return karta hai. Examples: map, filter, reduce, forEach, setTimeout. Ye functional programming patterns enable karte hain — composing, currying, aur iteration abstract karna. Custom example: function withLogging(fn) { return (...args) => { console.log(args); return fn(...args); }; }.',
    },
  },
  {
    question: 'What are the different types of functions in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Function declaration: function foo() {} — hoisted completely, can be called before declaration. Function expression: const foo = function() {} — not hoisted (only variable is). Arrow function: const foo = () => {} — no own this, arguments, or super; cannot be used as constructor. IIFE: (function(){})() — immediately invoked, creates private scope. Generator: function* gen() { yield 1; } — pauseable. Async function: async function fetchData() {} — returns a Promise.',
      hinglish:
        'Function declaration: function foo() {} — completely hoisted, declaration se pehle call ho sakta hai. Function expression: const foo = function() {} — hoisted nahi (sirf variable). Arrow function: const foo = () => {} — apna this, arguments, ya super nahi; constructor ke roop mein use nahi ho sakta. IIFE: (function(){})() — immediately invoked, private scope banata hai. Generator: function* gen() { yield 1; } — pauseable. Async function: async function fetchData() {} — Promise return karta hai.',
    },
  },
  {
    question: 'What is an arrow function and how does it differ from a regular function?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Arrow functions (const fn = () => {}) are more concise and have key differences: (1) No own this — they inherit this from the enclosing lexical scope (great for callbacks that need the outer this). (2) No arguments object — use rest parameters instead. (3) Cannot be used as constructors (no new). (4) No prototype property. (5) Cannot be generator functions. Use regular functions for methods, constructors; arrow functions for callbacks and closures.',
      hinglish:
        'Arrow functions (const fn = () => {}) zyada concise hain aur key differences hain: (1) Apna this nahi — enclosing lexical scope se this inherit karte hain (outer this chahiye wale callbacks ke liye best). (2) Arguments object nahi — rest parameters use karo. (3) Constructors ke roop mein use nahi ho sakte (no new). (4) prototype property nahi. (5) Generator functions nahi ban sakte. Regular functions methods, constructors ke liye; arrow functions callbacks aur closures ke liye use karo.',
    },
  },
  {
    question: 'Why do we use call, apply, and bind in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'All three let you explicitly set the this value of a function. call(thisArg, arg1, arg2): calls the function immediately with a given this and individual arguments. apply(thisArg, [args]): same but arguments are passed as an array. bind(thisArg, arg1...): returns a new function permanently bound to thisArg (and optionally pre-fills arguments — partial application). Use bind for event handlers that need a specific this; call/apply for borrowing methods from other objects.',
      hinglish:
        'Teeno function ke this value explicitly set karne dete hain. call(thisArg, arg1, arg2): given this aur individual arguments ke saath function immediately call karta hai. apply(thisArg, [args]): same hai par arguments array ke roop mein pass hote hain. bind(thisArg, arg1...): thisArg se permanently bound new function return karta hai (aur optionally arguments pre-fill karta hai — partial application). Specific this chahiye wale event handlers ke liye bind use karo; doosre objects se methods borrow karne ke liye call/apply.',
    },
  },
  {
    question: 'How many ways can you create an object in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '(1) Object literal: const obj = { key: val }. (2) Object.create(proto): sets the prototype explicitly. (3) Constructor function: function Person(n){this.name=n} new Person("A"). (4) ES6 class: class Person { constructor(n){ this.name=n } } new Person("A"). (5) Object.assign({}, src): shallow copy/merge. (6) Factory function: function makePerson(n){ return {name:n} }. (7) Spread: const copy = {...other}. Classes and constructor functions are most common in production code.',
      hinglish:
        '(1) Object literal: const obj = { key: val }. (2) Object.create(proto): prototype explicitly set karta hai. (3) Constructor function: function Person(n){this.name=n} new Person("A"). (4) ES6 class: class Person { constructor(n){ this.name=n } } new Person("A"). (5) Object.assign({}, src): shallow copy/merge. (6) Factory function: function makePerson(n){ return {name:n} }. (7) Spread: const copy = {...other}. Production code mein classes aur constructor functions sabse common hain.',
    },
  },
  {
    question: 'What is prototype inheritance in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Every JavaScript object has an internal [[Prototype]] link to another object. When you access a property not found on the object, JS looks up the prototype chain until it finds it or hits null. This is prototype inheritance — objects inherit properties/methods from their prototype. Constructor functions set the prototype via .prototype; ES6 classes are syntax sugar over the same mechanism. Object.getPrototypeOf(obj) or obj.__proto__ inspect the chain.',
      hinglish:
        'Har JavaScript object ka ek internal [[Prototype]] link hota hai doosre object se. Jab tum object pe property access karo jo nahi mili, JS prototype chain mein upar dhundhta hai jab tak nahi milti ya null pe nahi pahunchta. Ye prototype inheritance hai — objects apne prototype se properties/methods inherit karte hain. Constructor functions .prototype se prototype set karte hain; ES6 classes same mechanism pe syntax sugar hain. Object.getPrototypeOf(obj) ya obj.__proto__ chain inspect karte hain.',
    },
  },
  {
    question: 'What is throttling and debouncing in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Both limit how often a function runs. Throttle: enforces a maximum call rate — the function runs at most once per interval, no matter how many times the trigger fires. Good for scroll/resize handlers. Debounce: waits until the trigger stops firing for a set delay, then calls the function once. Good for search-as-you-type (wait until the user stops typing). Lodash\'s _.throttle and _.debounce are common implementations.',
      hinglish:
        'Dono limit karte hain kitni baar function run kare. Throttle: maximum call rate enforce karta hai — trigger kitni baar bhi fire ho, function most per interval ek baar hi chalega. Scroll/resize handlers ke liye accha. Debounce: wait karta hai jab tak trigger set delay ke liye fire hona band na ho, phir function ek baar call karta hai. Search-as-you-type ke liye accha (user typing band karne ka wait karo). Lodash ke _.throttle aur _.debounce common implementations hain.',
    },
  },
  {
    question: 'What are falsy values in JavaScript?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Values that coerce to false in a boolean context: false, 0, -0, 0n (BigInt zero), "" (empty string), null, undefined, NaN. Everything else is truthy — including "0", "false", [], and {}. Common pitfall: if ([]) is truthy because an empty array is an object. Use Boolean(val) or !!val to explicitly check.',
      hinglish:
        'Values jo boolean context mein false mein coerce hote hain: false, 0, -0, 0n (BigInt zero), "" (empty string), null, undefined, NaN. Baaki sab truthy hai — including "0", "false", [], aur {}. Common pitfall: if ([]) truthy hai kyunki empty array ek object hai. Explicitly check karne ke liye Boolean(val) ya !!val use karo.',
    },
  },
  {
    question: 'What is the execution context, event loop, call stack, callback queue, and microtask queue?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Execution context: the environment in which JS code runs (global or function) — holds variable bindings, this, and scope chain. Call stack: LIFO stack that tracks function calls; when a function is called it is pushed, when it returns it is popped. Event loop: constantly checks if the call stack is empty, then moves tasks from queues. Microtask queue: holds Promises (.then), queueMicrotask, MutationObserver callbacks — processed BEFORE the next macro-task. Callback queue (task queue): holds setTimeout, setInterval, UI events — processed after microtasks.',
      hinglish:
        'Execution context: environment jisme JS code run karta hai (global ya function) — variable bindings, this, aur scope chain rakhta hai. Call stack: LIFO stack jo function calls track karta hai; function call hone pe push hota hai, return pe pop. Event loop: constantly check karta hai call stack empty hai ya nahi, phir queues se tasks move karta hai. Microtask queue: Promises (.then), queueMicrotask, MutationObserver callbacks hold karta hai — next macro-task se PEHLE process hote hain. Callback queue (task queue): setTimeout, setInterval, UI events hold karta hai — microtasks ke baad process hote hain.',
    },
  },
  {
    question: 'What is the difference between setTimeout and setInterval?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'setTimeout(fn, delay): calls fn once after delay milliseconds. setInterval(fn, interval): calls fn repeatedly every interval milliseconds until clearInterval is called. Both are non-blocking — they schedule the callback via the event loop, so the actual execution may be slightly later than the specified delay. Use clearTimeout/clearInterval to cancel. Prefer recursive setTimeout over setInterval to avoid overlapping executions.',
      hinglish:
        'setTimeout(fn, delay): delay milliseconds ke baad fn ek baar call karta hai. setInterval(fn, interval): clearInterval call hone tak har interval milliseconds pe fn repeatedly call karta hai. Dono non-blocking hain — callback event loop ke through schedule karte hain, isliye actual execution specified delay se thoda baad ho sakta hai. Cancel karne ke liye clearTimeout/clearInterval use karo. Overlapping executions avoid karne ke liye setInterval pe recursive setTimeout prefer karo.',
    },
  },
  {
    question: 'What is the difference between Object.seal() and Object.freeze()?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Object.seal(obj): prevents adding or deleting properties, but existing properties can still be modified (if writable). Object.freeze(obj): prevents adding, deleting, AND modifying any property — the object is fully immutable at the top level. Neither is deep — nested objects are not sealed/frozen. Use freeze for constants/config objects. Check with Object.isSealed() / Object.isFrozen().',
      hinglish:
        'Object.seal(obj): properties add ya delete hone se rokta hai, par existing properties ab bhi modify ho sakti hain (agar writable ho). Object.freeze(obj): properties add, delete, AUR modify sabse rokta hai — object top level pe fully immutable ho jaata hai. Dono deep nahi hain — nested objects seal/freeze nahi hote. Constants/config objects ke liye freeze use karo. Object.isSealed() / Object.isFrozen() se check karo.',
    },
  },
  {
    question: 'What is the difference between Map and Set in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Map: a key-value store where keys can be any type (object, function, primitive) — unlike plain objects where keys are always strings/symbols. Maintains insertion order. Methods: set, get, has, delete, size, forEach. Set: a collection of unique values — duplicates are silently ignored. Methods: add, has, delete, size, forEach. Both are iterable. Use Map when you need non-string keys or need to know the size easily; use Set to deduplicate arrays.',
      hinglish:
        'Map: key-value store jahan keys koi bhi type ho sakti hain (object, function, primitive) — plain objects ke ulat jahan keys hamesha strings/symbols hoti hain. Insertion order maintain karta hai. Methods: set, get, has, delete, size, forEach. Set: unique values ka collection — duplicates silently ignore hote hain. Methods: add, has, delete, size, forEach. Dono iterable hain. Non-string keys chahiye ya size asaani se jaanna ho to Map use karo; arrays deduplicate karne ke liye Set.',
    },
  },
  {
    question: 'What are WeakMap and WeakSet in JavaScript?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'WeakMap: like Map but keys must be objects and are held weakly — if the key object has no other references, it can be garbage collected (and the entry is removed automatically). Not enumerable/iterable. WeakSet: like Set but stores only objects, held weakly. Used for: private data associated with objects, tracking DOM nodes without preventing GC. Do not use when you need to iterate or know the size — use regular Map/Set instead.',
      hinglish:
        'WeakMap: Map jaisa par keys objects hone chahiye aur weakly held hote hain — agar key object ke aur koi references nahi, garbage collected ho sakta hai (aur entry automatically remove hoti hai). Enumerable/iterable nahi. WeakSet: Set jaisa par sirf objects store karta hai, weakly held. Use cases: objects ke saath associated private data, DOM nodes track karna bina GC rokne ke. Jab iterate karna ho ya size jaanna ho tab use mat karo — regular Map/Set use karo.',
    },
  },
  {
    question: 'What is the difference between sessionStorage, localStorage, and cookies?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'localStorage: stores key-value strings in the browser with no expiry — persists across tabs and browser restarts (same origin). sessionStorage: same API but data is cleared when the tab/window closes — not shared across tabs. Cookies: sent with every HTTP request (server can read them), can have expiry, HttpOnly, Secure, and SameSite flags — used for auth tokens. Storage capacity: localStorage/sessionStorage ~5–10MB; cookies ~4KB. Use localStorage for preferences; cookies for session/auth managed by the server.',
      hinglish:
        'localStorage: browser mein key-value strings store karta hai koi expiry nahi — tabs aur browser restarts ke beech persist karta hai (same origin). sessionStorage: same API par tab/window close hone pe data clear hota hai — tabs ke across share nahi hota. Cookies: har HTTP request ke saath bheje jaate hain (server padh sakta hai), expiry, HttpOnly, Secure, aur SameSite flags ho sakte hain — auth tokens ke liye use hote hain. Storage capacity: localStorage/sessionStorage ~5–10MB; cookies ~4KB. Preferences ke liye localStorage; server dwara manage session/auth ke liye cookies.',
    },
  },
  {
    question: 'What are map, filter, and reduce in JavaScript?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'All three are array higher-order methods that take a callback and return a new value without mutating the original. map(fn): transforms each element, returns a new array of the same length. filter(fn): returns a new array with only elements where fn returns true. reduce(fn, initial): accumulates elements into a single value (sum, object, etc.) — the most flexible. Example: [1,2,3].map(x => x*2) → [2,4,6]. [1,2,3].filter(x => x>1) → [2,3]. [1,2,3].reduce((acc,x)=>acc+x,0) → 6.',
      hinglish:
        'Teeno array higher-order methods hain jo callback lete hain aur original mutate kiye bina new value return karte hain. map(fn): har element transform karta hai, same length ka new array return karta hai. filter(fn): sirf un elements ka new array return karta hai jahan fn true return kare. reduce(fn, initial): elements ko single value (sum, object, etc.) mein accumulate karta hai — sabse flexible. Example: [1,2,3].map(x => x*2) → [2,4,6]. [1,2,3].filter(x => x>1) → [2,3]. [1,2,3].reduce((acc,x)=>acc+x,0) → 6.',
    },
  },
  {
    question: 'What is a generator function in JavaScript?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A generator (function*) can pause its execution with yield and be resumed externally. Calling a generator returns an iterator object with a next() method. Each next() call runs until the next yield, returning { value, done }. Use cases: lazy infinite sequences, custom iterators, async flow control (before async/await), or processing large datasets without loading all at once. function* counter() { let i=0; while(true) yield i++; }',
      hinglish:
        'Generator (function*) apni execution yield ke saath pause kar sakta hai aur externally resume ho sakta hai. Generator call karne pe next() method wala iterator object milta hai. Har next() call agले yield tak run karta hai, { value, done } return karta hai. Use cases: lazy infinite sequences, custom iterators, async flow control (async/await se pehle), ya large datasets ko ek baar mein load kiye bina process karna. function* counter() { let i=0; while(true) yield i++; }',
    },
  },
  {
    question: 'What is closure in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A closure is a function that remembers and accesses variables from its outer scope even after the outer function has returned. The function "closes over" those variables. Example: function counter() { let n=0; return () => ++n; } — each call to the returned function increments the same n. Closures are the basis for data privacy, factory functions, memoization, and event handler state.',
      hinglish:
        'Closure ek function hai jo outer scope ke variables yaad rakhta hai aur access karta hai chahe outer function return ho chuka ho. Function un variables ke upar "close" ho jaata hai. Example: function counter() { let n=0; return () => ++n; } — returned function har call pe same n increment karta hai. Closures data privacy, factory functions, memoization, aur event handler state ka basis hain.',
    },
  },
  {
    question: 'What is hoisting in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Hoisting is JavaScript\'s behaviour of moving declarations to the top of their scope before execution. var declarations are hoisted with value undefined — so you can reference a var before its line (no error, but value is undefined). Function declarations are fully hoisted — you can call them before they appear in code. let and const are hoisted but stay in the Temporal Dead Zone until their declaration line — accessing them before that throws a ReferenceError.',
      hinglish:
        'Hoisting JavaScript ka behaviour hai jo declarations ko execution se pehle unke scope ke top pe move karta hai. var declarations undefined value ke saath hoisted hote hain — isliye var ko uski line se pehle reference kar sakte ho (error nahi, par value undefined hogi). Function declarations fully hoisted hote hain — code mein appear hone se pehle call kar sakte ho. let aur const hoisted hote hain par Temporal Dead Zone mein rehte hain unki declaration line tak — pehle access karo to ReferenceError.',
    },
  },
  {
    question: 'What is function currying in JavaScript?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Currying transforms a function with multiple arguments into a chain of functions that each take one argument: f(a, b, c) → f(a)(b)(c). It enables partial application — fix some arguments and reuse the function. Example: const multiply = a => b => a * b; const double = multiply(2); double(5) → 10. Libraries like Ramda and Lodash/fp use currying extensively. Useful for creating specialised functions from general ones.',
      hinglish:
        'Currying multiple arguments wale function ko functions ki chain mein transform karta hai jahan har ek ek argument leta hai: f(a, b, c) → f(a)(b)(c). Ye partial application enable karta hai — kuch arguments fix karo aur function reuse karo. Example: const multiply = a => b => a * b; const double = multiply(2); double(5) → 10. Ramda aur Lodash/fp jaisi libraries currying extensively use karti hain. General ones se specialised functions banane ke liye useful.',
    },
  },
  {
    question: 'What is memoization in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Memoization is an optimization that caches the result of a function for given inputs so the same computation is not repeated. It trades memory for speed. Implementation: function memo(fn) { const cache = {}; return (n) => cache[n] ?? (cache[n] = fn(n)); }. Commonly used for recursive algorithms (Fibonacci), expensive calculations. In React, useMemo does memoization for computed values; useCallback memoizes function references.',
      hinglish:
        'Memoization ek optimization hai jo given inputs ke liye function ka result cache karta hai taaki same computation repeat na ho. Speed ke liye memory trade karta hai. Implementation: function memo(fn) { const cache = {}; return (n) => cache[n] ?? (cache[n] = fn(n)); }. Recursive algorithms (Fibonacci), expensive calculations ke liye commonly use hota hai. React mein, useMemo computed values ke liye memoization karta hai; useCallback function references memoize karta hai.',
    },
  },
  {
    question: 'What is MutationObserver in JavaScript?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'MutationObserver is a native browser API that watches for changes in the DOM — added/removed nodes, attribute changes, text content changes. It is asynchronous and batches mutations. Usage: const obs = new MutationObserver(cb); obs.observe(node, { childList: true, attributes: true, subtree: true }); obs.disconnect() to stop. Used for: reacting to third-party DOM changes, implementing undo/redo, auto-saving form data, implementing virtual scroll libraries.',
      hinglish:
        'MutationObserver ek native browser API hai jo DOM mein changes watch karta hai — added/removed nodes, attribute changes, text content changes. Ye asynchronous hai aur mutations batch karta hai. Usage: const obs = new MutationObserver(cb); obs.observe(node, { childList: true, attributes: true, subtree: true }); rokne ke liye obs.disconnect(). Use cases: third-party DOM changes pe react karna, undo/redo implement karna, form data auto-save karna, virtual scroll libraries implement karna.',
    },
  },
  {
    question: 'Write a program to find the occurrence count of elements in an array.',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Use an object as a frequency map. Iterate the array with for...of and increment the count for each element: const arr = [1,1,2,3,1,4]; const count = {}; for (const el of arr) { count[el] = (count[el] || 0) + 1; } // → { 1:3, 2:1, 3:1, 4:1 }. Alternatively, use Array.reduce: arr.reduce((acc, el) => ({ ...acc, [el]: (acc[el]||0)+1 }), {}). The reduce version is more functional but creates a new object on each iteration.',
      hinglish:
        'Object ko frequency map ke roop mein use karo. Array ko for...of se iterate karo aur har element ka count increment karo: const arr = [1,1,2,3,1,4]; const count = {}; for (const el of arr) { count[el] = (count[el] || 0) + 1; } // → { 1:3, 2:1, 3:1, 4:1 }. Alternative: Array.reduce use karo: arr.reduce((acc, el) => ({ ...acc, [el]: (acc[el]||0)+1 }), {}). Reduce version zyada functional hai par har iteration pe new object banata hai.',
    },
  },
  {
    question: 'Write a program to remove duplicates from an array.',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Best modern way: use a Set — [...new Set(arr)]. Set only stores unique values. Example: const arr = [1,2,3,4,1,2]; const unique = [...new Set(arr)]; // → [1,2,3,4]. Alternative with filter: arr.filter((val, idx) => arr.indexOf(val) === idx). For arrays of objects, deduplicate by a key using a Map.',
      hinglish:
        'Sabse achha modern tarika: Set use karo — [...new Set(arr)]. Set sirf unique values store karta hai. Example: const arr = [1,2,3,4,1,2]; const unique = [...new Set(arr)]; // → [1,2,3,4]. filter alternative: arr.filter((val, idx) => arr.indexOf(val) === idx). Objects ke arrays ke liye, Map use karke ek key se deduplicate karo.',
    },
  },
  {
    question: 'What will be the output when using let vs var inside setTimeout in a loop?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'With let: for (let i=0; i<5; i++) setTimeout(()=>console.log(i), i*1000) → logs 0,1,2,3,4 (one per second). let creates a new binding per iteration. With var: for (var i=0; i<5; i++) setTimeout(()=>console.log(i), i*1000) → logs 5,5,5,5,5. All callbacks share the same var i which is 5 by the time they execute. Fix with var: use an IIFE ((function(i){ setTimeout(...);})(i)) or replace var with let.',
      hinglish:
        'let ke saath: for (let i=0; i<5; i++) setTimeout(()=>console.log(i), i*1000) → 0,1,2,3,4 log karta hai (har second ek). let har iteration pe new binding banata hai. var ke saath: for (var i=0; i<5; i++) setTimeout(()=>console.log(i), i*1000) → 5,5,5,5,5 log karta hai. Saare callbacks ek hi var i share karte hain jo execute hone tak 5 ho jaata hai. var ke saath fix: IIFE use karo ((function(i){ setTimeout(...);})(i)) ya var ko let se replace karo.',
    },
  },
  {
    question: 'Write a polyfill for Array.prototype.map.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Array.prototype.myMap = function(cb) { const result = []; for (let i = 0; i < this.length; i++) { result.push(cb(this[i], i, this)); } return result; }; // Usage: [2,3,4].myMap(x => x*2) → [4,6,8]. The callback receives (currentValue, index, array) — same signature as native map. Important: do not use an arrow function for the polyfill definition itself or "this" will not be the array.',
      hinglish:
        'Array.prototype.myMap = function(cb) { const result = []; for (let i = 0; i < this.length; i++) { result.push(cb(this[i], i, this)); } return result; }; // Usage: [2,3,4].myMap(x => x*2) → [4,6,8]. Callback ko (currentValue, index, array) milta hai — native map jaisi same signature. Important: polyfill definition ke liye arrow function use mat karo warna "this" array nahi hogi.',
    },
  },
  {
    question: 'Write a polyfill for Array.prototype.filter.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Array.prototype.myFilter = function(cb) { const result = []; for (let i = 0; i < this.length; i++) { if (cb(this[i], i, this)) result.push(this[i]); } return result; }; // Usage: [2,3,4,5].myFilter(x => x > 2) → [3,4,5]. Key difference from map: push only when callback returns truthy. The result can be shorter than the original array.',
      hinglish:
        'Array.prototype.myFilter = function(cb) { const result = []; for (let i = 0; i < this.length; i++) { if (cb(this[i], i, this)) result.push(this[i]); } return result; }; // Usage: [2,3,4,5].myFilter(x => x > 2) → [3,4,5]. map se key difference: sirf tab push karo jab callback truthy return kare. Result original array se chhota ho sakta hai.',
    },
  },
  {
    question: 'Write a polyfill for Array.prototype.reduce.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Array.prototype.myReduce = function(cb, initialValue) { let acc = initialValue; let startIdx = 0; if (acc === undefined) { acc = this[0]; startIdx = 1; } for (let i = startIdx; i < this.length; i++) { acc = cb(acc, this[i], i, this); } return acc; }; // Usage: [1,2,3,4].myReduce((acc, x) => acc+x, 0) → 10. If no initialValue, use first element as accumulator and start from index 1.',
      hinglish:
        'Array.prototype.myReduce = function(cb, initialValue) { let acc = initialValue; let startIdx = 0; if (acc === undefined) { acc = this[0]; startIdx = 1; } for (let i = startIdx; i < this.length; i++) { acc = cb(acc, this[i], i, this); } return acc; }; // Usage: [1,2,3,4].myReduce((acc, x) => acc+x, 0) → 10. Agar initialValue nahi, pehla element accumulator use karo aur index 1 se shuru karo.',
    },
  },
  {
    question: 'Write a program to multiply two numbers without using the * operator.',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Use repeated addition: function multiply(a, b) { let result = 0; for (let i = 0; i < Math.abs(b); i++) { result += a; } return b < 0 ? -result : result; } // multiply(5, 3) → 15. Handle negatives by using Math.abs and flipping the sign. Can also use recursion: multiply(a, b) = a + multiply(a, b-1) with base case b===0.',
      hinglish:
        'Repeated addition use karo: function multiply(a, b) { let result = 0; for (let i = 0; i < Math.abs(b); i++) { result += a; } return b < 0 ? -result : result; } // multiply(5, 3) → 15. Negatives handle karne ke liye Math.abs use karo aur sign flip karo. Recursion bhi use kar sakte ho: multiply(a, b) = a + multiply(a, b-1) base case b===0 ke saath.',
    },
  },
  {
    question: 'What will be the output when using objects as keys in another object?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'const a={}; const b={key:"b"}; const c={key:"c"}; a[b]=123; a[c]=456; console.log(a[b]); → 456. Object keys are automatically converted to strings via .toString(). Both b and c stringify to "[object Object]", so a["[object Object]"] is first set to 123, then overwritten to 456. a[b] and a[c] both read the same key "[object Object]", returning 456. Use Map if you need object keys.',
      hinglish:
        'const a={}; const b={key:"b"}; const c={key:"c"}; a[b]=123; a[c]=456; console.log(a[b]); → 456. Object keys automatically strings mein convert hote hain .toString() ke through. b aur c dono "[object Object]" pe stringify hote hain, isliye a["[object Object]"] pehle 123 set hota hai, phir 456 se overwrite. a[b] aur a[c] dono same key "[object Object]" padhte hain, 456 return karte hain. Agar object keys chahiye to Map use karo.',
    },
  },
];

// Final ordered curriculum
export const curriculum = [...beginner, ...intermediate, ...advanced];
