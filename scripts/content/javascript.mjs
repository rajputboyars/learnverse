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
    title: 'Numbers, Booleans & Console',
    level: 'beginner',
    description: 'Comments, numbers, Math object, aur truthy/falsy values.',
    concepts: [
      {
        title: 'Comments & the Console',
        difficulty: 'easy',
        tags: ['basics', 'debugging'],
        explanation: {
          english:
            "Comments are notes for humans that JavaScript ignores completely — use // for a single line and /* ... */ for multiple lines. The console (console.log, console.warn, console.error, console.table) is your window into what the code is doing; it is the #1 debugging tool every beginner should master before anything else.",
          hinglish:
            "Comments insaano ke liye notes hain jinhe JavaScript pura ignore kar deta hai — single line ke liye // aur multiple lines ke liye /* ... */. Console (console.log, console.warn, console.error, console.table) tumhari khidki hai ye dekhne ke liye ki code kya kar raha hai — ye har beginner ka pehla aur sabse zaroori debugging tool hai.",
        },
        dailyLifeExample:
          'Comment ek copy ke hashiye mein likha note jaisa hai — teacher (JS engine) use padhta nahi, sirf tumhare (ya doston ke) samajhne ke liye hai. console.log ek CCTV camera jaisa hai — andar kya ho raha hai, turant dikh jaata hai.',
        codeExample:
          "// This is a single-line comment\n/* This is a\n   multi-line comment */\n\nconsole.log('Normal message');\nconsole.warn('⚠️ Something looks off');\nconsole.error('❌ Something broke');\nconsole.table([{ name: 'Aman', score: 90 }, { name: 'Riya', score: 95 }]);",
        keyPoints: [
          '// for single-line comments, /* */ for multi-line',
          'Comments are skipped completely by the JS engine',
          'console.log/warn/error print differently in DevTools',
          'console.table shows arrays of objects as a neat table',
          'console.log is the most-used debugging tool for beginners',
        ],
        quiz: [
          {
            question: 'Which symbol starts a single-line comment in JavaScript?',
            options: ['//', '/* */', '#', '<!-- -->'],
            correctIndex: 0,
          },
          {
            question: 'What does console.error do differently from console.log?',
            options: ['Nothing, same thing', 'Shows the message as an error (often in red)', 'Deletes the message', 'Stops the program'],
            correctIndex: 1,
            explanation: 'console.error highlights the message as an error in DevTools, but does not stop execution.',
          },
          {
            question: 'Why do developers write comments in code?',
            options: ['To make code run faster', 'To explain WHY, for other humans reading the code', 'JS requires at least one comment', 'To create variables'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Numbers & the Math Object',
        difficulty: 'easy',
        tags: ['numbers', 'math'],
        explanation: {
          english:
            'JavaScript has only one number type (no separate int/float) — it handles whole numbers and decimals the same way. The built-in Math object gives ready-made tools: Math.round/floor/ceil to round, Math.random() for a random decimal between 0 and 1, Math.max/min to compare, and toFixed() to control decimal places. parseInt/parseFloat and Number() convert text into numbers.',
          hinglish:
            'JavaScript mein sirf ek hi number type hai (alag int/float nahi) — whole numbers aur decimals dono same tarah handle hote hain. Built-in Math object ready-made tools deta hai: round/floor/ceil rounding ke liye, Math.random() 0 aur 1 ke beech random decimal, Math.max/min compare karne ke liye, aur toFixed() decimal places control karne ke liye. parseInt/parseFloat aur Number() text ko number mein badalte hain.',
        },
        dailyLifeExample:
          'Math.round ek dukaandaar jaisa hai jo change round kar deta hai — 10.6 rupaye ko 11 bana dega. Math.random() ek dice roll jaisa hai — har baar naya random number. toFixed(2) bill ko exactly 2 decimal places mein round kar deta hai, jaise ₹49.999 ko ₹50.00.',
        codeExample:
          "Math.round(4.6);   // 5\nMath.floor(4.9);   // 4  (always down)\nMath.ceil(4.1);    // 5  (always up)\nMath.max(3, 7, 2); // 7\nMath.min(3, 7, 2); // 2\nMath.random();     // e.g. 0.7391... (0 to <1)\n\n(9.4567).toFixed(2); // \"9.46\" (string!)\nparseInt('42px');    // 42\nNumber('3.14');      // 3.14\nisNaN('hello');       // true",
        keyPoints: [
          'JS has one Number type for both integers and decimals',
          'Math.floor rounds down, Math.ceil rounds up, Math.round rounds nearest',
          'Math.random() gives a decimal between 0 (inclusive) and 1 (exclusive)',
          'toFixed(n) returns a STRING with n decimal places',
          'parseInt/parseFloat/Number convert text to numbers',
        ],
        quiz: [
          {
            question: 'What does Math.floor(4.9) return?',
            options: ['5', '4', '4.9', 'error'],
            correctIndex: 1,
          },
          {
            question: 'What type of value does toFixed(2) return?',
            options: ['Number', 'String', 'Boolean', 'Array'],
            correctIndex: 1,
            explanation: 'toFixed always returns a string, e.g. (9.4).toFixed(2) is "9.40".',
          },
          {
            question: 'Math.random() returns a number in which range?',
            options: ['1 to 10', '0 to 1 (0 included, 1 excluded)', '-1 to 1', 'Any whole number'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Truthy & Falsy Values',
        difficulty: 'easy',
        tags: ['booleans', 'conditionals'],
        explanation: {
          english:
            "Every value in JavaScript is 'truthy' or 'falsy' when used where a boolean is expected (like an if condition). There are only 8 falsy values: false, 0, -0, 0n, '' (empty string), null, undefined, and NaN. Everything else — including '0' (a non-empty string!), [] (empty array), and {} (empty object) — is truthy. Knowing this list by heart avoids a lot of beginner bugs.",
          hinglish:
            "JavaScript mein har value 'truthy' ya 'falsy' hoti hai jab usse boolean ki jagah use kiya jaaye (jaise if condition mein). Sirf 8 falsy values hain: false, 0, -0, 0n, '' (empty string), null, undefined, aur NaN. Baaki sab — '0' (non-empty string!), [] (empty array), aur {} (empty object) bhi — truthy hai. Ye list yaad rakhna bahut saare beginner bugs bacha deta hai.",
        },
        dailyLifeExample:
          "Truthy/falsy ek switchboard jaisa hai — bijli hai ya nahi (on/off) decide karta hai bulb jalega ya nahi, chahe bulb ka rang kuch bhi ho. Khaali plate (empty array []) dekhne mein 'kuch nahi' lagti hai par JS use 'kuch hai' (truthy) maanta hai — ye sabse common confusion hai.",
        codeExample:
          "if (0) console.log('runs');        // ❌ skipped, 0 is falsy\nif ('') console.log('runs');       // ❌ skipped, '' is falsy\nif ([]) console.log('runs');       // ✅ runs! empty array is truthy\nif ({}) console.log('runs');       // ✅ runs! empty object is truthy\nif ('0') console.log('runs');      // ✅ runs! non-empty string is truthy\n\n// common real check\nconst cart = [];\nif (cart.length) console.log('has items'); // check .length, not the array itself",
        keyPoints: [
          'Only 8 falsy values: false, 0, -0, 0n, "", null, undefined, NaN',
          'Empty array [] and empty object {} are TRUTHY, not falsy',
          'The string "0" is truthy (it is a non-empty string)',
          'Check array.length, not the array itself, for "is it empty"',
          'Truthy/falsy matters in if, &&, ||, and ternary conditions',
        ],
        quiz: [
          {
            question: 'Which of these is truthy?',
            options: ["''", '0', '[]', 'null'],
            correctIndex: 2,
            explanation: 'An empty array is an object, and all objects are truthy — even empty ones.',
          },
          {
            question: 'How many falsy values does JavaScript have?',
            options: ['5', '6', '8', '10'],
            correctIndex: 2,
          },
          {
            question: 'To check if an array is empty, you should check…',
            options: ['if (arr)', 'if (arr.length)', 'if (arr === [])', 'if (arr == true)'],
            correctIndex: 1,
            explanation: 'if(arr) is always true for any array, even an empty one — you must check .length.',
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
      {
        title: 'More Array Methods: forEach, find, some, every & includes',
        difficulty: 'medium',
        tags: ['arrays'],
        explanation: {
          english:
            'Beyond map/filter/reduce, these methods answer common questions. forEach just runs a function on each item (no new array returned). find returns the FIRST matching item (not an array). findIndex returns its index. some checks if ANY item matches (true/false). every checks if ALL items match. includes checks if a value exists.',
          hinglish:
            'map/filter/reduce ke alawa ye methods common sawaalo ke jawab dete hain. forEach har item pe function chala deta hai (naya array return nahi karta). find PEHLA matching item deta hai (array nahi). findIndex uska index deta hai. some check karta hai KOI bhi item match karta hai ya nahi (true/false). every check karta hai SAARE items match karte hain ya nahi. includes value hai ya nahi check karta hai.',
        },
        dailyLifeExample:
          "Class mein roll-call: forEach har student ka naam bolna (result store nahi karna). find pehla student dhoondhna jiske marks 90+ hain. some check karna 'koi bhi fail hua?'. every check karna 'sab pass hue?'.",
        codeExample:
          "const nums = [4, 9, 15, 22, 30];\n\nnums.forEach(n => console.log(n));       // just logs each, returns undefined\n\nnums.find(n => n > 10);                  // 15 (first match)\nnums.findIndex(n => n > 10);             // 2 (its index)\n\nnums.some(n => n > 25);                  // true (at least one)\nnums.every(n => n > 0);                  // true (all positive)\n\nnums.includes(22);                       // true\n\nconst sorted = [...nums].sort((a, b) => a - b); // ascending, copy first!",
        keyPoints: [
          'forEach: just runs code per item, returns undefined',
          'find: first matching item; findIndex: its index',
          'some: true if ANY item passes; every: true if ALL pass',
          'includes: quick true/false existence check',
          'sort mutates in place — copy with [...arr] first if you need the original',
        ],
        quiz: [
          {
            question: 'What does array.find() return when nothing matches?',
            options: ['null', 'undefined', 'an empty array', '-1'],
            correctIndex: 1,
          },
          {
            question: 'Which method checks if EVERY element passes a test?',
            options: ['some', 'every', 'find', 'forEach'],
            correctIndex: 1,
          },
          {
            question: 'Why should you copy an array with [...arr] before sorting?',
            options: ['sort() is slower otherwise', 'sort() mutates (changes) the original array', 'It is required syntax', 'No reason, it is optional style'],
            correctIndex: 1,
            explanation: 'Array.prototype.sort() sorts in place, mutating the original array — spread first if you need to keep it unchanged.',
          },
        ],
      },
      {
        title: 'Object Methods: keys, values, entries & freeze',
        difficulty: 'medium',
        tags: ['objects'],
        explanation: {
          english:
            "Object is not an array, so array methods like map do not work on it directly. Object.keys() gives an array of property names, Object.values() gives an array of values, and Object.entries() gives [key, value] pairs — perfect for looping with for...of or converting to a Map. Object.freeze() locks an object so it cannot be changed (useful for constants).",
          hinglish:
            'Object array nahi hai, isliye map jaise array methods usme seedha nahi chalte. Object.keys() property names ka array deta hai, Object.values() values ka array deta hai, aur Object.entries() [key, value] pairs deta hai — for...of se loop karne ya Map banane ke liye perfect. Object.freeze() object ko lock kar deta hai taaki wo badle na (constants ke liye useful).',
        },
        dailyLifeExample:
          'Object ek admit card jaisa hai: Object.keys = sirf field-names (Naam, Roll No, Class), Object.values = sirf unki values (Aman, 12, 10th), Object.entries = pura pair (field: value). Object.freeze = admit card ko laminate karna — ab koi likh nahi sakta.',
        codeExample:
          "const student = { name: 'Aman', roll: 12, grade: 'A' };\n\nObject.keys(student);    // ['name', 'roll', 'grade']\nObject.values(student);  // ['Aman', 12, 'A']\nObject.entries(student); // [['name','Aman'], ['roll',12], ['grade','A']]\n\nfor (const [key, value] of Object.entries(student)) {\n  console.log(`${key}: ${value}`);\n}\n\nconst PI = Object.freeze({ value: 3.14 });\nPI.value = 4; // silently fails (or throws in strict mode)\nconsole.log(PI.value); // still 3.14",
        keyPoints: [
          'Object.keys/values/entries turn an object into an array you can loop or map over',
          'Object.entries pairs perfectly with for...of destructuring',
          'Object.freeze() prevents any property from being changed',
          'hasOwnProperty checks if a key belongs directly to the object',
        ],
        quiz: [
          {
            question: 'What does Object.entries({a:1, b:2}) return?',
            options: ["{a:1, b:2}", "['a','b']", "[['a',1],['b',2]]", '[1,2]'],
            correctIndex: 2,
          },
          {
            question: 'What does Object.freeze() do?',
            options: ['Deletes the object', 'Prevents its properties from being changed', 'Copies the object', 'Converts it to JSON'],
            correctIndex: 1,
          },
          {
            question: 'Which method gives just the property names of an object?',
            options: ['Object.values', 'Object.entries', 'Object.keys', 'Object.freeze'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Slicing Arrays: slice vs splice',
        difficulty: 'medium',
        tags: ['arrays'],
        explanation: {
          english:
            'These two sound similar but behave very differently — a classic interview trap. slice(start, end) COPIES a portion of an array into a new array and does NOT touch the original. splice(start, deleteCount, ...items) CHANGES the original array in place — it can remove items, insert items, or both, and it returns the removed items.',
          hinglish:
            'Ye dono sunne mein same lagte hain par bahut alag kaam karte hain — ek classic interview trap. slice(start, end) array ka ek hissa COPY karke naya array deta hai, original ko CHHOOTA nahi. splice(start, deleteCount, ...items) original array ko seedha BADAL deta hai — items remove, insert, ya dono kar sakta hai, aur removed items return karta hai.',
        },
        dailyLifeExample:
          'slice ek photocopy nikalna hai — original kitab jaisi ki waisi rehti hai. splice kitab ke pannon ko phaad ke nikaalna aur naye panne chipkana hai — original kitab hi badal jaati hai.',
        codeExample:
          "const fruits = ['apple', 'banana', 'mango', 'grape'];\n\n// slice: copies, does NOT change original\nconst part = fruits.slice(1, 3);   // ['banana', 'mango']\nconsole.log(fruits);               // unchanged: original 4 items\n\n// splice: MUTATES the original\nconst removed = fruits.splice(1, 2, 'kiwi'); // remove 2 from index 1, insert 'kiwi'\nconsole.log(fruits);   // ['apple', 'kiwi', 'grape']  ← changed!\nconsole.log(removed);  // ['banana', 'mango']",
        keyPoints: [
          'slice: copies a portion, original array untouched',
          'splice: mutates the original array in place',
          'splice can remove AND insert items at once',
          'When in doubt about mutation, remember: "sPlice = sPoils the original"',
        ],
        quiz: [
          {
            question: 'Which method does NOT change the original array?',
            options: ['splice', 'slice', 'push', 'sort'],
            correctIndex: 1,
          },
          {
            question: 'What does fruits.splice(1, 2) do?',
            options: ['Copies items 1 and 2', 'Removes 2 items starting at index 1, from the original array', 'Adds 2 items', 'Returns nothing'],
            correctIndex: 1,
          },
          {
            question: 'splice() returns…',
            options: ['The new array length', 'The removed items', 'true or false', 'undefined always'],
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
          {
            question: 'for (var i=0;i<3;i++) setTimeout(()=>console.log(i)); prints 3,3,3 instead of 0,1,2. Why, and how do you fix it?',
            options: [
              'It is a bug in setTimeout — cannot be fixed',
              'var is function-scoped so all closures share the same i; use let (block-scoped) instead',
              'Arrow functions cannot close over variables',
              'setTimeout runs before the loop starts',
            ],
            correctIndex: 1,
            explanation: 'With var there is only ONE shared i for the whole loop, so every callback sees its final value (3). let creates a fresh binding of i for each iteration, so each closure remembers its own value.',
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
          {
            question: "const fn = obj.show; fn(); — why does this break even though obj.show() worked fine?",
            options: [
              'It does not break, it works the same',
              'this is decided by HOW you call it — calling fn() alone loses the object, so this is no longer obj',
              'fn is now a different function',
              'JavaScript deletes this on reassignment',
            ],
            correctIndex: 1,
            explanation: 'Assigning a method to a plain variable and calling it detaches it from obj — the call-site is now just fn(), so this is undefined/global, not obj. This is a very common bug when passing methods as callbacks (e.g. onClick={obj.method}).',
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
          {
            question: 'console.log(b); let b = 10; — what happens, and why?',
            options: [
              'Logs undefined, same as var',
              'Logs 10, JS reads ahead',
              'Throws a ReferenceError — b exists but is in the temporal dead zone until its declaration runs',
              'Logs null',
            ],
            correctIndex: 2,
            explanation: "Unlike var, let/const are hoisted but stay unusable in the temporal dead zone (TDZ) from the top of the block until the declaration line actually executes — accessing them earlier throws, it does not silently give undefined.",
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
          {
            question: 'Promise.resolve().then(()=>log("1")).then(()=>log("2")); setTimeout(()=>log("3")); — what order prints?',
            options: ['3, 1, 2', '1, 2, 3', '1, 3, 2', '3, 2, 1'],
            correctIndex: 1,
            explanation: 'Chained .then() callbacks are ALL microtasks, so both "1" and "2" drain completely before the event loop ever looks at the macrotask queue where "3" (setTimeout) is waiting — even though setTimeout was called first.',
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
      {
        title: 'Promise Combinators: all, race, allSettled & any',
        difficulty: 'hard',
        tags: ['promises', 'async'],
        explanation: {
          english:
            'When you have multiple promises, these static methods combine them. Promise.all() waits for ALL to succeed, and rejects immediately if ANY one fails. Promise.allSettled() waits for all to finish regardless of success/failure, giving you every result. Promise.race() settles as soon as the FIRST promise settles (win or lose). Promise.any() resolves as soon as the FIRST one succeeds, ignoring failures unless all fail.',
          hinglish:
            'Jab tumhare paas multiple promises hote hain, ye static methods unhe combine karte hain. Promise.all() SAARE ke succeed hone ka wait karta hai, aur agar KOI bhi ek fail ho to turant reject ho jaata hai. Promise.allSettled() sabke finish hone ka wait karta hai chahe success ho ya failure, har result deta hai. Promise.race() jaise hi PEHLA promise settle hota hai (jeete ya haare), wahi result deta hai. Promise.any() jaise hi PEHLA promise succeed hota hai resolve ho jaata hai, failures ignore karta hai jab tak sab fail na ho jaayein.',
        },
        dailyLifeExample:
          "Promise.all = poori class ka result — ek bhi student fail hua to poora batch 'fail' maana jaata hai. allSettled = sabka result card, chahe pass ho ya fail. race = race jeetne wala pehla runner. any = jo bhi pehle college mein admission le le, baaki rejections maayne nahi rakhte.",
        codeExample:
          "const p1 = fetch('/api/a');\nconst p2 = fetch('/api/b');\nconst p3 = fetch('/api/c');\n\n// all fail together if even one rejects\nPromise.all([p1, p2, p3]).then(results => console.log('all ok', results));\n\n// get every result, success or failure\nPromise.allSettled([p1, p2, p3]).then(results => {\n  results.forEach(r => console.log(r.status)); // 'fulfilled' or 'rejected'\n});\n\n// first to finish wins\nPromise.race([p1, p2, p3]).then(first => console.log('fastest', first));\n\n// first SUCCESS wins\nPromise.any([p1, p2, p3]).then(firstSuccess => console.log(firstSuccess));",
        keyPoints: [
          'Promise.all: all must succeed, fails fast on any rejection',
          'Promise.allSettled: waits for all, never rejects, gives every outcome',
          'Promise.race: settles with whichever promise finishes FIRST (success or failure)',
          'Promise.any: resolves with the first SUCCESS, ignores failures',
          'Use allSettled when you want results even if some requests fail',
        ],
        quiz: [
          {
            question: 'If one promise in Promise.all() rejects, what happens?',
            options: ['It waits for the rest anyway', 'It rejects immediately with that error', 'It ignores the failure', 'Nothing happens'],
            correctIndex: 1,
          },
          {
            question: 'Which combinator NEVER rejects, giving you every result?',
            options: ['Promise.all', 'Promise.race', 'Promise.allSettled', 'Promise.any'],
            correctIndex: 2,
          },
          {
            question: 'Promise.any() resolves as soon as…',
            options: ['The first promise settles, success or fail', 'The first promise SUCCEEDS', 'All promises succeed', 'All promises fail'],
            correctIndex: 1,
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
  {
    title: 'Working with Data & the Browser',
    level: 'intermediate',
    description: 'JSON, storage, fetching data aur regular expressions.',
    concepts: [
      {
        title: 'JSON: stringify & parse',
        difficulty: 'easy',
        tags: ['json', 'data'],
        explanation: {
          english:
            'JSON (JavaScript Object Notation) is a text format for exchanging data between a browser and a server (or saving to a file). JSON.stringify() converts a JS object/array into a JSON string (to send or save). JSON.parse() converts a JSON string back into a real JS object/array. Almost every API you will ever call sends and receives JSON.',
          hinglish:
            'JSON (JavaScript Object Notation) ek text format hai jo browser aur server ke beech data bhejne (ya file mein save karne) ke liye use hota hai. JSON.stringify() JS object/array ko JSON string mein badal deta hai (bhejne/save karne ke liye). JSON.parse() JSON string ko wapas asli JS object/array banata hai. Almost har API jo tum call karoge JSON hi bhejta-leta hai.',
        },
        dailyLifeExample:
          'JSON.stringify ek courier packing jaisa hai — tumhara saamaan (object) ek dabbe (string) mein pack karna taaki bheja ja sake. JSON.parse dabba khol ke saamaan wapas nikaalna hai jab wo pahunch jaaye.',
        codeExample:
          "const user = { name: 'Aman', age: 16, hobbies: ['cricket', 'coding'] };\n\nconst text = JSON.stringify(user);\n// '{\"name\":\"Aman\",\"age\":16,\"hobbies\":[\"cricket\",\"coding\"]}'\n\nconst back = JSON.parse(text);\nback.name;   // 'Aman' — a real object again\n\n// pretty-print for readability\nJSON.stringify(user, null, 2);",
        keyPoints: [
          'JSON.stringify: object/array → JSON string',
          'JSON.parse: JSON string → object/array',
          'JSON only supports simple data (no functions, no undefined)',
          'Nearly every web API sends/receives JSON',
          'JSON.stringify(obj, null, 2) pretty-prints with indentation',
        ],
        quiz: [
          {
            question: 'What does JSON.stringify({a:1}) return?',
            options: ['{a:1}', '"{\\"a\\":1}"', 'an object', 'undefined'],
            correctIndex: 1,
          },
          {
            question: 'JSON.parse() converts a JSON string into…',
            options: ['A number', 'A real JS object/array', 'HTML', 'A boolean'],
            correctIndex: 1,
          },
          {
            question: 'Which of these can JSON NOT store?',
            options: ['Strings', 'Numbers', 'Functions', 'Arrays'],
            correctIndex: 2,
            explanation: 'JSON is data-only — functions, undefined, and symbols are dropped or throw.',
          },
        ],
      },
      {
        title: 'LocalStorage & SessionStorage',
        difficulty: 'medium',
        tags: ['browser', 'storage'],
        explanation: {
          english:
            'These let you save small amounts of data directly in the browser, so it survives page reloads. localStorage persists even after closing the browser (until cleared). sessionStorage is cleared when the tab closes. Both only store STRINGS, so use JSON.stringify/parse to save objects.',
          hinglish:
            'Ye browser mein hi thoda sa data save karne dete hain, taaki page reload hone pe bhi bacha rahe. localStorage browser band karne ke baad bhi rehta hai (jab tak clear na karo). sessionStorage tab band hote hi clear ho jaata hai. Dono sirf STRINGS store karte hain, isliye objects save karne ke liye JSON.stringify/parse use karo.',
        },
        dailyLifeExample:
          'localStorage ek ghar ki almari jaisa hai — cheez rakhi rahegi chahe tum bahar jaake wapas aao. sessionStorage ek school bag jaisa hai — school se ghar aate hi khaali kar dete ho (tab band = data gaya).',
        codeExample:
          "// save (must be a string!)\nlocalStorage.setItem('theme', 'dark');\nlocalStorage.setItem('user', JSON.stringify({ name: 'Aman' }));\n\n// read\nlocalStorage.getItem('theme'); // 'dark'\nJSON.parse(localStorage.getItem('user')); // { name: 'Aman' }\n\n// remove\nlocalStorage.removeItem('theme');\nlocalStorage.clear(); // remove everything",
        keyPoints: [
          'localStorage: persists until explicitly cleared',
          'sessionStorage: cleared when the browser tab closes',
          'Both only store strings — JSON.stringify objects before saving',
          'Data is per-origin (per website), not shared across sites',
          'Never store passwords or sensitive data here (not encrypted)',
        ],
        quiz: [
          {
            question: 'Which storage survives closing and reopening the browser?',
            options: ['sessionStorage', 'localStorage', 'Neither', 'Both equally'],
            correctIndex: 1,
          },
          {
            question: 'What type of data can you directly store in localStorage?',
            options: ['Only strings', 'Any JS value', 'Only numbers', 'Only objects'],
            correctIndex: 0,
          },
          {
            question: 'How do you save an object in localStorage?',
            options: ['localStorage.setItem(key, obj)', 'localStorage.setItem(key, JSON.stringify(obj))', 'localStorage.save(obj)', 'You cannot'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Fetch API: Talking to a Server',
        difficulty: 'medium',
        tags: ['fetch', 'api', 'async'],
        explanation: {
          english:
            'fetch() is the built-in way to make network requests — asking a server for data (GET) or sending it data (POST). It returns a Promise that resolves to a Response object; you usually call .json() on that (which returns ANOTHER Promise) to get the actual data. Always handle errors, since fetch does not reject on HTTP error status codes like 404.',
          hinglish:
            'fetch() network requests banane ka built-in tareeka hai — server se data maangna (GET) ya bhejna (POST). Ye ek Promise return karta hai jo Response object mein resolve hota hai; usually us pe .json() call karte ho (jo khud EK AUR Promise deta hai) actual data lene ke liye. Errors hamesha handle karo, kyunki fetch 404 jaise HTTP error status pe reject NAHI hota.',
        },
        dailyLifeExample:
          "fetch() ek dukaan mein order dena jaisa hai — order do (request), packet aata hai (Response), packet khol ke andar ka saamaan dekhna (.json()). Agar dukaan band mile (404) to bhi packet aata hai — bas andar 'sorry, closed' likha hota hai, isliye status khud check karna padta hai.",
        codeExample:
          "async function getUsers() {\n  try {\n    const res = await fetch('https://api.example.com/users');\n    if (!res.ok) throw new Error(`HTTP ${res.status}`); // fetch does NOT throw on 404!\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.error('Failed:', err.message);\n  }\n}\n\n// sending data (POST)\nfetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Aman' }),\n});",
        keyPoints: [
          'fetch() returns a Promise resolving to a Response',
          '.json() reads and parses the body — also returns a Promise, so await it too',
          'fetch only rejects on network failure, NOT on 404/500 — check response.ok',
          'POST requests need method, headers and a stringified body',
          'Always wrap fetch in try/catch when using async/await',
        ],
        quiz: [
          {
            question: 'Does fetch() reject its Promise when the server responds with a 404?',
            options: ['Yes, always', 'No — you must check response.ok yourself', 'Only in Node.js', 'Only for POST'],
            correctIndex: 1,
          },
          {
            question: 'How many times do you typically need to await when fetching JSON?',
            options: ['Zero', 'Once (fetch only)', 'Twice (fetch, then .json())', 'Three times'],
            correctIndex: 2,
          },
          {
            question: 'Which option sends the request body for a POST?',
            options: ['headers', 'body', 'method', 'params'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Timers: setTimeout & setInterval',
        difficulty: 'easy',
        tags: ['timers', 'async'],
        explanation: {
          english:
            "setTimeout(fn, delay) runs a function ONCE after a delay (in milliseconds). setInterval(fn, delay) runs a function REPEATEDLY every delay, until you stop it with clearInterval. Both are asynchronous — they do not block the rest of the code, and the delay is a MINIMUM, not a guarantee (JS might be busy).",
          hinglish:
            'setTimeout(fn, delay) ek function ko EK BAAR delay (milliseconds mein) ke baad chalata hai. setInterval(fn, delay) function ko BAAR-BAAR har delay pe chalata hai, jab tak clearInterval se roka na jaaye. Dono asynchronous hain — baaki code ko rokte nahi, aur delay ek MINIMUM hai, guarantee nahi (JS busy ho sakta hai).',
        },
        dailyLifeExample:
          'setTimeout ek alarm jaisa hai — set karo, ek baar bajega. setInterval school ki ghanti jaisi hai — har period ke baad baar-baar bajti hai, jab tak school (clearInterval) band na ho.',
        codeExample:
          "// runs once after 2 seconds\nconst id1 = setTimeout(() => console.log('2s passed'), 2000);\n// clearTimeout(id1); // cancel before it fires\n\n// runs every 1 second\nlet count = 0;\nconst id2 = setInterval(() => {\n  count++;\n  console.log('tick', count);\n  if (count === 5) clearInterval(id2); // stop after 5 ticks\n}, 1000);",
        keyPoints: [
          'setTimeout: runs once after a delay',
          'setInterval: runs repeatedly until cleared',
          'clearTimeout / clearInterval stop a pending timer using its id',
          'Delay is a minimum wait, not an exact guarantee',
          'Always clear intervals you no longer need — forgetting causes memory leaks',
        ],
        quiz: [
          {
            question: 'What does setInterval do differently from setTimeout?',
            options: ['Nothing, they are identical', 'It repeats every interval instead of running once', 'It runs synchronously', 'It cannot be cancelled'],
            correctIndex: 1,
          },
          {
            question: 'How do you stop a running setInterval?',
            options: ['clearTimeout(id)', 'clearInterval(id)', 'stopInterval(id)', 'You cannot stop it'],
            correctIndex: 1,
          },
          {
            question: 'The delay passed to setTimeout is…',
            options: ['An exact guaranteed time', 'A minimum wait time', 'Always ignored', 'Only for setInterval'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Regular Expressions Basics',
        difficulty: 'medium',
        tags: ['regex', 'strings'],
        explanation: {
          english:
            'A regular expression (regex) is a pattern used to match, search, or replace text — like a super-powered find. Common building blocks: \\d (digit), \\w (word character), + (one or more), * (zero or more), ? (optional). Use .test() to check a match (true/false) and .replace() with a regex to find-and-replace across a string.',
          hinglish:
            "Regular expression (regex) ek pattern hai jo text match, search, ya replace karne ke liye use hota hai — ek super-powered 'find' jaisa. Common building blocks: \\d (digit), \\w (word character), + (ek ya zyada), * (zero ya zyada), ? (optional). .test() se check karo match hua ya nahi (true/false), aur regex ke saath .replace() se poore string mein find-and-replace karo.",
        },
        dailyLifeExample:
          "Regex ek security guard ka checklist jaisa hai — 'entry chahiye to 10-digit number, sirf digits' — jo bhi is pattern pe fit ho, entry milegi. Phone number validate karna isi tarah kaam karta hai.",
        codeExample:
          "const phonePattern = /^\\d{10}$/;       // exactly 10 digits\nphonePattern.test('9876543210'); // true\nphonePattern.test('98765');      // false\n\nconst emailPattern = /^[\\w.]+@[\\w]+\\.[a-z]+$/i;\nemailPattern.test('a@b.com'); // true\n\n'Hello World'.replace(/o/g, '0'); // 'Hell0 W0rld' (g = replace all)\n'Price: 250 rupees'.match(/\\d+/); // ['250']",
        keyPoints: [
          'A regex is a pattern for matching text',
          '\\d = digit, \\w = word char, . = any char, + = 1 or more, * = 0 or more',
          '.test() returns true/false; .match() returns the matches',
          '/pattern/g replaces or matches ALL occurrences (not just the first)',
          'Great for validating input: phone numbers, emails, pincodes',
        ],
        quiz: [
          {
            question: 'What does \\d match in a regular expression?',
            options: ['Any letter', 'Any digit', 'A space', 'Any character'],
            correctIndex: 1,
          },
          {
            question: 'What does the g flag do in a regex like /o/g?',
            options: ['Makes it case-insensitive', 'Matches/replaces ALL occurrences, not just the first', 'Makes it faster', 'Nothing'],
            correctIndex: 1,
          },
          {
            question: 'Which method returns true or false for a regex match?',
            options: ['.match()', '.replace()', '.test()', '.search()'],
            correctIndex: 2,
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
            question: 'dog.eats is true (inherited from the animal prototype). Does "eats" show up in Object.keys(dog) or for...in with hasOwnProperty filtering?',
            options: [
              'Yes, both show it',
              'Object.keys(dog) excludes it, and dog.hasOwnProperty("eats") is false — it only shows in a plain for...in loop',
              'Neither ever shows it',
              'It throws an error',
            ],
            correctIndex: 1,
            explanation: "Object.keys() and hasOwnProperty() only look at OWN properties, not inherited ones. A plain for...in loop walks the whole prototype chain, so it would list 'eats' too — this distinction trips up many beginners.",
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
  {
    title: 'Symbols, Proxy & Design Patterns',
    level: 'advanced',
    description: 'Metaprogramming aur proven reusable solutions — symbols, Proxy/Reflect, patterns.',
    concepts: [
      {
        title: 'Symbols',
        difficulty: 'medium',
        tags: ['symbols', 'es6'],
        explanation: {
          english:
            "Symbol is a primitive type introduced in ES6 that creates a GUARANTEED unique value — even two symbols with the same description are never equal. They are mainly used as 'hidden' object keys that will not clash with regular string keys or show up in normal loops (for...in, Object.keys), useful for adding metadata without polluting an object's visible shape.",
          hinglish:
            "Symbol ES6 mein aaya ek primitive type hai jo ek GUARANTEED unique value banata hai — same description wale do symbols bhi kabhi equal nahi hote. Ye mainly 'hidden' object keys ke liye use hote hain jo normal string keys se clash nahi karte aur normal loops (for...in, Object.keys) mein nazar nahi aate — object ka visible shape bigaade bina metadata add karne ke liye useful.",
        },
        dailyLifeExample:
          "Symbol ek secret locker number jaisa hai — chahe do lockers pe 'Locker A' likha ho, unke actual numbers alag hain aur kabhi match nahi karenge. Ye hidden ID rakhne ke liye perfect hai jo dikhta nahi par unique hai.",
        codeExample:
          "const id1 = Symbol('id');\nconst id2 = Symbol('id');\nid1 === id2; // false — always unique, even with same description\n\nconst user = {\n  name: 'Aman',\n  [id1]: 'secret-internal-value', // hidden key\n};\n\nObject.keys(user);        // ['name'] — symbol key is NOT listed\nJSON.stringify(user);     // '{\"name\":\"Aman\"}' — symbols are skipped",
        keyPoints: [
          'Symbol() always creates a brand-new unique value',
          'Two symbols are never === equal, even with the same description',
          'Symbol keys are hidden from Object.keys, for...in, and JSON.stringify',
          'Used for adding non-clashing metadata to objects',
          'Well-known symbols (like Symbol.iterator) power built-in JS behaviour',
        ],
        quiz: [
          {
            question: "Are Symbol('x') and Symbol('x') equal to each other?",
            options: ['Yes, always', 'No, they are always different', 'Only if declared with const', 'Only in strict mode'],
            correctIndex: 1,
          },
          {
            question: 'Does Object.keys() include Symbol keys?',
            options: ['Yes, always', 'No, symbol keys are hidden from it', 'Only string symbols', 'Only in Node.js'],
            correctIndex: 1,
          },
          {
            question: 'Symbols are mainly used for…',
            options: ['Storing large numbers', 'Hidden, guaranteed-unique object keys', 'Making arrays faster', 'Replacing strings entirely'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Proxy & Reflect',
        difficulty: 'hard',
        tags: ['proxy', 'metaprogramming'],
        explanation: {
          english:
            "A Proxy wraps an object and lets you intercept fundamental operations on it — reading a property, setting one, deleting one — by defining 'trap' functions like get and set. Reflect is a companion built-in object with methods that mirror those same operations, used inside traps to perform the 'default' behaviour. Together they power things like validation, logging, and reactive frameworks (Vue uses Proxy for reactivity).",
          hinglish:
            "Proxy ek object ko wrap karta hai aur uspe hone wale fundamental operations — property padhna, set karna, delete karna — ko intercept karne deta hai, get aur set jaise 'trap' functions define karke. Reflect ek companion built-in object hai jiske methods usi tarah ke operations mirror karte hain, traps ke andar 'default' behaviour perform karne ke liye use hote hain. Dono milke validation, logging, aur reactive frameworks (Vue Proxy use karta hai reactivity ke liye) jaisi cheezein power karte hain.",
        },
        dailyLifeExample:
          'Proxy ek building ke security guard jaisa hai — koi bhi andar aane ya saamaan le jaane se pehle guard check karta hai (trap). Reflect guard ka standard rulebook hai jo batata hai normally kya hona chahiye tha agar guard na hota.',
        codeExample:
          "const target = { name: 'Aman', age: 16 };\n\nconst handler = {\n  get(obj, prop) {\n    console.log(`Reading '${prop}'`);\n    return Reflect.get(obj, prop); // default read behaviour\n  },\n  set(obj, prop, value) {\n    if (prop === 'age' && value < 0) {\n      throw new Error('Age cannot be negative');\n    }\n    return Reflect.set(obj, prop, value); // default write behaviour\n  },\n};\n\nconst user = new Proxy(target, handler);\nuser.name;        // logs 'Reading name', returns 'Aman'\nuser.age = -5;     // throws! validation trap fired",
        keyPoints: [
          'Proxy intercepts operations (get, set, delete...) on an object',
          'Traps let you add validation, logging, or custom behaviour',
          'Reflect provides the "default" version of each operation',
          'Used inside frameworks (e.g. Vue 3 reactivity) and for validation libraries',
          'Advanced tool — most apps use it indirectly via a framework, not directly',
        ],
        quiz: [
          {
            question: 'What does a Proxy let you do?',
            options: ['Speed up arrays', 'Intercept operations like get/set on an object', 'Delete a variable', 'Convert types automatically'],
            correctIndex: 1,
          },
          {
            question: 'What is Reflect mainly used for?',
            options: ['Making HTTP requests', 'Performing the default version of an operation inside a trap', 'Creating classes', 'Formatting strings'],
            correctIndex: 1,
          },
          {
            question: 'Which popular frontend framework uses Proxy for reactivity?',
            options: ['jQuery', 'Vue 3', 'Bootstrap', 'Lodash'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Common Design Patterns: Singleton, Observer & Module',
        difficulty: 'hard',
        tags: ['patterns', 'architecture'],
        explanation: {
          english:
            "Design patterns are proven, reusable solutions to common coding problems. Singleton ensures only ONE instance of something exists (e.g. a single database connection). Observer lets objects (subscribers) react whenever another object (the subject) changes — the foundation of events and React state updates. Module pattern groups related code together and hides internal details, exposing only what's needed (what ES modules formalised).",
          hinglish:
            'Design patterns common coding problems ke liye proven, reusable solutions hain. Singleton ensure karta hai ki kisi cheez ka sirf EK instance ho (jaise ek hi database connection). Observer objects (subscribers) ko react karne deta hai jab bhi doosra object (subject) badalta hai — events aur React state updates ka foundation. Module pattern related code ko group karta hai aur internal details chhupata hai, sirf zaroori cheez expose karta hai (jo ES modules ne formalize kiya).',
        },
        dailyLifeExample:
          'Singleton ek school ka principal jaisa hai — ek hi hota hai, sab uski taraf refer karte hain. Observer YouTube subscription jaisa hai — channel (subject) naya video daale to sab subscribers (observers) ko notification milta hai. Module ek TV remote jaisa hai — andar ke circuits chhupe hain, bas buttons (public interface) use karte ho.',
        codeExample:
          "// Singleton\nclass Database {\n  static #instance;\n  static getInstance() {\n    if (!Database.#instance) Database.#instance = new Database();\n    return Database.#instance;\n  }\n}\nDatabase.getInstance() === Database.getInstance(); // true, same instance\n\n// Observer\nclass EventBus {\n  #listeners = [];\n  subscribe(fn) { this.#listeners.push(fn); }\n  emit(data) { this.#listeners.forEach(fn => fn(data)); }\n}\nconst bus = new EventBus();\nbus.subscribe(data => console.log('Got:', data));\nbus.emit('new video!'); // logs 'Got: new video!'\n\n// Module pattern (hides internal state)\nconst counter = (() => {\n  let count = 0; // private\n  return { increment: () => ++count, get: () => count };\n})();\ncounter.increment(); counter.get(); // 1",
        keyPoints: [
          'Singleton: guarantees exactly one instance exists',
          'Observer: subscribers react automatically when the subject changes',
          "Observer is how DOM events and React's state updates conceptually work",
          'Module pattern: hides private details, exposes a clean public API',
          'Patterns are proven solutions, not rules — use them when they genuinely fit',
        ],
        quiz: [
          {
            question: 'What problem does the Singleton pattern solve?',
            options: ['Making code faster', 'Ensuring only one instance of something exists', 'Hiding all variables', 'Adding more classes'],
            correctIndex: 1,
          },
          {
            question: 'The Observer pattern is the foundation of…',
            options: ['CSS styling', 'Events and reactive state updates', 'Database indexing', 'File compression'],
            correctIndex: 1,
          },
          {
            question: 'What does the Module pattern hide?',
            options: ['The whole program', 'Internal/private implementation details', 'The public API', 'Nothing, it hides nothing'],
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

  // ─── JavaScript Basics ───────────────────────────────────────────
  {
    question: 'What is JavaScript?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'JavaScript is a high-level, interpreted (JIT-compiled), single-threaded, dynamically-typed programming language. It was created in 1995 to make web pages interactive, and today runs in browsers (via engines like V8, SpiderMonkey) and on servers (via Node.js). It follows the ECMAScript specification, supports multiple paradigms — procedural, object-oriented (via prototypes), and functional — and is prototype-based rather than class-based under the hood, even though ES6 added `class` syntax as sugar over prototypes.',
      hinglish:
        'JavaScript ek high-level, interpreted (JIT-compiled), single-threaded, dynamically-typed programming language hai. Ye 1995 mein web pages interactive banane ke liye bani thi, aur aaj browsers (V8, SpiderMonkey jaise engines se) aur servers (Node.js se) pe chalti hai. Ye ECMAScript specification follow karti hai, multiple paradigms support karti hai — procedural, object-oriented (prototypes ke through), aur functional — aur under the hood class-based nahi, prototype-based hai, chahe ES6 ne `class` syntax add ki ho prototypes ke upar sugar ke roop mein.',
    },
  },
  {
    question: 'What are the data types in JavaScript?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'JavaScript has 7 primitive types — string, number, boolean, undefined, null, symbol (ES6), and bigint (ES2020) — plus one non-primitive type, object (which covers arrays, functions, dates, maps, sets, etc.). Primitives are immutable and compared by value; objects are mutable and compared by reference. `typeof` distinguishes them at runtime, though `typeof null` famously (and incorrectly) returns "object" — a long-standing language bug kept for backward compatibility.',
      hinglish:
        'JavaScript mein 7 primitive types hain — string, number, boolean, undefined, null, symbol (ES6), aur bigint (ES2020) — plus ek non-primitive type, object (jo arrays, functions, dates, maps, sets, etc. cover karta hai). Primitives immutable hote hain aur value se compare hote hain; objects mutable hote hain aur reference se compare hote hain. `typeof` runtime pe inhe distinguish karta hai, chahe `typeof null` famously (aur incorrectly) "object" return karta hai — ek purana language bug jo backward compatibility ke liye rakha gaya hai.',
    },
  },
  {
    question: 'What is the difference between == and ===?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`==` is loose equality — it coerces operands to the same type before comparing, so `1 == "1"` and `null == undefined` are both true. `===` is strict equality — no type coercion; both value AND type must match, so `1 === "1"` is false. Best practice: always use `===` to avoid surprising coercion bugs (e.g. `"" == 0` is true, `[] == false` is true), reserving `==` only for the specific, well-known `== null` idiom that checks for both null and undefined at once.',
      hinglish:
        '`==` loose equality hai — compare karne se pehle operands ko same type mein coerce karta hai, isliye `1 == "1"` aur `null == undefined` dono true hain. `===` strict equality hai — koi type coercion nahi; value AUR type dono match hone chahiye, isliye `1 === "1"` false hai. Best practice: hamesha `===` use karo surprising coercion bugs se bachne ke liye (jaise `"" == 0` true hai, `[] == false` true hai), `==` ko sirf specific, well-known `== null` idiom ke liye reserve karo jo null aur undefined dono ek saath check karta hai.',
    },
  },
  {
    question: 'What are truthy and falsy values?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Every JS value is "truthy" or "falsy" when evaluated in a boolean context (if, &&, ||, ternary). There are exactly 8 falsy values: `false`, `0`, `-0`, `0n` (BigInt zero), `""` (empty string), `null`, `undefined`, and `NaN`. Every other value — including `"0"`, `"false"`, `[]` (empty array), and `{}` (empty object) — is truthy, which is a common source of bugs when people assume empty arrays/objects are falsy.',
      hinglish:
        'Har JS value "truthy" ya "falsy" hoti hai jab boolean context (if, &&, ||, ternary) mein evaluate ho. Exactly 8 falsy values hain: `false`, `0`, `-0`, `0n` (BigInt zero), `""` (empty string), `null`, `undefined`, aur `NaN`. Baaki har value — including `"0"`, `"false"`, `[]` (empty array), aur `{}` (empty object) — truthy hoti hai, jo ek common bug source hai jab log assume karte hain ki empty arrays/objects falsy hote hain.',
    },
  },
  {
    question: 'What is undefined?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`undefined` is a primitive value automatically assigned by JavaScript when a variable is declared but not initialised, a function parameter is not passed, a function has no explicit return, or an object property does not exist. It represents "value not yet assigned" — it is the language\'s own default, not something a developer typically assigns intentionally (though you can).',
      hinglish:
        '`undefined` ek primitive value hai jo JavaScript automatically assign karta hai jab ek variable declare ho par initialise na ho, ek function parameter pass na ho, function ka explicit return na ho, ya object property exist na kare. Ye represent karta hai "value abhi tak assign nahi hui" — ye language ka apna default hai, kuch aisa nahi jo developer typically intentionally assign kare (chahe kar sakte ho).',
    },
  },
  {
    question: 'What is null?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`null` is a primitive value that represents the intentional absence of any object value — a developer explicitly assigns it to say "this variable should have no value right now." Unlike `undefined` (the language\'s default for "not yet set"), `null` is a deliberate signal, commonly used to reset an object reference or initialise a variable that will later hold an object.',
      hinglish:
        '`null` ek primitive value hai jo kisi bhi object value ki intentional absence represent karta hai — developer explicitly ise assign karta hai ye kehne ke liye "is variable ki abhi koi value nahi honi chahiye." `undefined` (language ka default "abhi tak set nahi") ke ulat, `null` ek deliberate signal hai, commonly ek object reference reset karne ya ek variable initialise karne ke liye use hota hai jo baad mein object hold karega.',
    },
  },
  {
    question: 'What is NaN?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`NaN` ("Not a Number") is a special numeric value that results from an invalid or undefined mathematical operation, like `0/0`, `Math.sqrt(-1)`, or `parseInt("abc")`. Its `typeof` is confusingly "number". The strangest property: `NaN` is the only value in JavaScript that is not equal to itself (`NaN === NaN` is `false`), so you must use `Number.isNaN(x)` or `Object.is(x, NaN)` to reliably check for it — never `x === NaN`.',
      hinglish:
        '`NaN` ("Not a Number") ek special numeric value hai jo ek invalid ya undefined mathematical operation se result hoti hai, jaise `0/0`, `Math.sqrt(-1)`, ya `parseInt("abc")`. Iska `typeof` confusingly "number" hai. Sabse strange property: `NaN` JavaScript mein sirf aisi value hai jo khud ke barabar nahi hoti (`NaN === NaN` `false` hai), isliye reliably check karne ke liye `Number.isNaN(x)` ya `Object.is(x, NaN)` use karna padta hai — kabhi `x === NaN` nahi.',
    },
  },
  {
    question: 'What is the difference between primitive and reference data types?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Primitives (string, number, boolean, null, undefined, symbol, bigint) are stored directly by value on the stack — copying a primitive creates an independent copy, so changing the copy never affects the original. Reference types (objects, arrays, functions) are stored on the heap; the variable holds a reference (pointer) to that memory location. Copying a reference copies the pointer, not the data, so two variables can point to the same object — mutating it through one variable is visible through the other.',
      hinglish:
        'Primitives (string, number, boolean, null, undefined, symbol, bigint) stack pe directly value se store hote hain — ek primitive copy karne se independent copy banti hai, isliye copy change karne se original kabhi affect nahi hota. Reference types (objects, arrays, functions) heap pe store hote hain; variable us memory location ka ek reference (pointer) hold karta hai. Reference copy karne se pointer copy hota hai, data nahi, isliye do variables same object ko point kar sakte hain — ek variable ke through mutate karna doosre se bhi visible hota hai.',
    },
  },
  {
    question: 'What is type coercion?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Type coercion is JavaScript automatically converting a value from one type to another when an operation expects a different type — e.g. `"5" + 1` coerces the number to a string, producing `"51"` (string concatenation wins with `+`), while `"5" - 1` coerces the string to a number, producing `4` (subtraction has no string meaning). Coercion follows well-defined but sometimes surprising rules (via `ToPrimitive`, `ToNumber`, `ToString` abstract operations), which is exactly why `==` is considered risky.',
      hinglish:
        'Type coercion matlab JavaScript automatically ek value ko ek type se doosre mein convert kar deta hai jab operation ek alag type expect kare — jaise `"5" + 1` number ko string mein coerce karta hai, `"51"` produce karke (`+` ke saath string concatenation jeetta hai), jabki `"5" - 1` string ko number mein coerce karta hai, `4` produce karke (subtraction ka string meaning nahi hai). Coercion well-defined par kabhi-kabhi surprising rules follow karta hai (ToPrimitive, ToNumber, ToString abstract operations se), yahi wajah hai `==` risky maana jaata hai.',
    },
  },
  {
    question: 'What is implicit and explicit conversion?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Implicit conversion (type coercion) happens automatically, silently, by the engine — e.g. `"5" * "2"` becomes `10` because `*` has no string meaning. Explicit conversion is when the developer deliberately converts a type using functions like `Number("5")`, `String(5)`, `Boolean(1)`, or `parseInt("5px")`. Explicit conversion is preferred in production code because it makes intent clear and is easier to reason about and debug than relying on the engine\'s implicit rules.',
      hinglish:
        'Implicit conversion (type coercion) automatically, silently, engine ke through hoti hai — jaise `"5" * "2"` `10` ban jaata hai kyunki `*` ka string meaning nahi hai. Explicit conversion tab hoti hai jab developer deliberately ek type ko functions se convert kare jaise `Number("5")`, `String(5)`, `Boolean(1)`, ya `parseInt("5px")`. Production code mein explicit conversion preferred hai kyunki ye intent clear karta hai aur engine ke implicit rules pe depend karne se zyada easy hai reason karna aur debug karna.',
    },
  },
  {
    question: 'What is the typeof operator?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`typeof` is a unary operator that returns a string naming the type of its operand: "string", "number", "boolean", "undefined", "symbol", "bigint", "function", or "object". Quirks to remember: `typeof null === "object"` (a decades-old bug never fixed for compatibility), `typeof NaN === "number"` (NaN is still a number type), and `typeof []` and `typeof {}` are both `"object"` — use `Array.isArray()` to distinguish arrays specifically.',
      hinglish:
        '`typeof` ek unary operator hai jo apne operand ke type ka naam batane wala string return karta hai: "string", "number", "boolean", "undefined", "symbol", "bigint", "function", ya "object". Yaad rakhne wale quirks: `typeof null === "object"` (ek decades-old bug jo compatibility ke liye kabhi fix nahi hua), `typeof NaN === "number"` (NaN abhi bhi number type hai), aur `typeof []` aur `typeof {}` dono `"object"` hain — arrays ko specifically distinguish karne ke liye `Array.isArray()` use karo.',
    },
  },
  {
    question: 'What is the instanceof operator?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`instanceof` checks whether an object\'s prototype chain contains the `.prototype` property of a given constructor — `obj instanceof Ctor` walks up `obj.__proto__ → obj.__proto__.__proto__ → ...` looking for `Ctor.prototype`. It is used to check if an object is an instance of a class: `[] instanceof Array` is `true`, `[] instanceof Object` is also `true` (arrays inherit from Object). Unlike `typeof`, it works for custom classes but fails across different execution contexts/iframes because each has its own constructor identity.',
      hinglish:
        '`instanceof` check karta hai ki ek object ki prototype chain mein diye gaye constructor ki `.prototype` property hai ya nahi — `obj instanceof Ctor` `obj.__proto__ → obj.__proto__.__proto__ → ...` walk karta hai `Ctor.prototype` dhundhte hue. Ye check karne ke liye use hota hai ki koi object ek class ka instance hai — `[] instanceof Array` `true` hai, `[] instanceof Object` bhi `true` hai (arrays Object se inherit karte hain). `typeof` ke ulat, ye custom classes ke liye kaam karta hai par different execution contexts/iframes ke across fail ho jaata hai kyunki har ek ki apni constructor identity hoti hai.',
    },
  },
  {
    question: 'What is the difference between Object and Map?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A plain Object has string/symbol keys only (numeric keys get stringified), inherits properties from its prototype chain (which can cause collisions with built-in names like "toString"), has no reliable `.size`, and iteration order is a somewhat complex spec rule. A Map allows keys of ANY type (objects, functions, NaN — even objects as keys), has no default inheritance so no accidental collisions, has an O(1) `.size` property, and reliably iterates in insertion order. Use Map when keys are dynamic/unknown or non-string, or when you need frequent additions/removals.',
      hinglish:
        'Ek plain Object mein sirf string/symbol keys hoti hain (numeric keys stringify ho jaati hain), apni prototype chain se properties inherit karta hai (jo built-in names jaise "toString" ke saath collisions cause kar sakta hai), koi reliable `.size` nahi, aur iteration order ek somewhat complex spec rule hai. Ek Map ANY type ki keys allow karta hai (objects, functions, NaN — even objects as keys), koi default inheritance nahi isliye koi accidental collisions nahi, ek O(1) `.size` property, aur reliably insertion order mein iterate karta hai. Map use karo jab keys dynamic/unknown ya non-string hon, ya jab frequent additions/removals chahiye hon.',
    },
  },
  {
    question: 'What is the difference between Array and Object?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'An Array is an ordered, index-based collection (keys are sequential integers 0, 1, 2...) optimised for ordered data and has built-in methods (map, filter, reduce, push, etc.) via `Array.prototype`. An Object is an unordered (technically insertion-ordered for string keys) collection of key-value pairs, better suited for named/labelled data where you look things up by a meaningful key rather than a position. Under the hood, arrays ARE objects — `typeof [] === "object"` — just with special index-based behaviour and a `.length` property.',
      hinglish:
        'Ek Array ek ordered, index-based collection hai (keys sequential integers 0, 1, 2... hoti hain) ordered data ke liye optimised aur built-in methods (map, filter, reduce, push, etc.) `Array.prototype` ke through. Ek Object key-value pairs ka ek unordered (technically string keys ke liye insertion-ordered) collection hai, named/labelled data ke liye better suited jahan tum ek meaningful key se cheez dhundhte ho, position se nahi. Under the hood, arrays actually objects HAIN — `typeof [] === "object"` — bas special index-based behaviour aur ek `.length` property ke saath.',
    },
  },
  {
    question: 'How do you check if a value is an array?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Use `Array.isArray(value)` — it returns `true` only for real arrays, and it works reliably even across different iframes/execution contexts (unlike `instanceof Array`, which can fail cross-realm because each realm has its own Array constructor). `typeof` is useless here since `typeof []` is `"object"`, same as a plain object. `Array.isArray()` is the standard, spec-recommended way and has been supported since ES5.',
      hinglish:
        '`Array.isArray(value)` use karo — ye sirf real arrays ke liye `true` return karta hai, aur ye reliably kaam karta hai different iframes/execution contexts ke across bhi (unlike `instanceof Array`, jo cross-realm fail ho sakta hai kyunki har realm ka apna Array constructor hota hai). `typeof` yahan bekaar hai kyunki `typeof []` `"object"` hai, plain object jaisa hi. `Array.isArray()` standard, spec-recommended tareeka hai aur ES5 se supported hai.',
    },
  },
  {
    question: 'What is the difference between slice() and splice()?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`slice(start, end)` is non-mutating — it returns a NEW array containing a shallow copy of the selected portion, leaving the original array untouched. `splice(start, deleteCount, ...items)` is mutating — it changes the original array IN PLACE by removing/replacing/inserting elements, and returns an array of the REMOVED elements. Mnemonic: "slice" for a read-only slice, "splice" for surgery that actually cuts into the original.',
      hinglish:
        '`slice(start, end)` non-mutating hai — ye ek NAYA array return karta hai jisme selected portion ki shallow copy hoti hai, original array untouched rehta hai. `splice(start, deleteCount, ...items)` mutating hai — ye original array ko IN PLACE change karta hai elements remove/replace/insert karke, aur REMOVED elements ka array return karta hai. Mnemonic: "slice" read-only slice ke liye, "splice" surgery ke liye jo actually original ko kaat ti hai.',
    },
  },
  {
    question: 'What is the difference between for, for...of, and for...in?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A classic `for (let i=0; i<n; i++)` loop gives full manual control over the index — best for performance-critical code or non-standard iteration. `for...of` iterates over the VALUES of an iterable (arrays, strings, Maps, Sets, generators) — the modern default for arrays. `for...in` iterates over the ENUMERABLE KEYS (property names, as strings) of an object, including inherited enumerable properties — it is meant for plain objects, NOT arrays (using it on arrays can iterate unexpected inherited/added properties and doesn\'t guarantee numeric order).',
      hinglish:
        'Classic `for (let i=0; i<n; i++)` loop index pe full manual control deta hai — performance-critical code ya non-standard iteration ke liye best. `for...of` ek iterable (arrays, strings, Maps, Sets, generators) ki VALUES pe iterate karta hai — arrays ke liye modern default. `for...in` ek object ki ENUMERABLE KEYS (property names, strings ke roop mein) pe iterate karta hai, inherited enumerable properties included — ye plain objects ke liye meant hai, arrays ke liye NAHI (arrays pe use karne se unexpected inherited/added properties iterate ho sakte hain aur numeric order guarantee nahi hota).',
    },
  },
  {
    question: 'What is the difference between includes() and indexOf()?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`indexOf(item)` returns the numeric position of the first matching element (or `-1` if not found) — useful when you need the POSITION. `includes(item)` returns a simple `true`/`false` for whether the element exists — cleaner and more readable when you only care about presence, not position. Crucially, `includes()` correctly finds `NaN` (`[NaN].includes(NaN)` is `true`), while `indexOf()` cannot (`[NaN].indexOf(NaN)` is `-1`) because `indexOf` uses `===` comparison and `NaN === NaN` is false.',
      hinglish:
        '`indexOf(item)` pehle matching element ki numeric position return karta hai (ya `-1` agar na mile) — useful jab tumhe POSITION chahiye. `includes(item)` simple `true`/`false` return karta hai element exist karta hai ya nahi — cleaner aur more readable jab sirf presence matter karti ho, position nahi. Crucially, `includes()` correctly `NaN` find karta hai (`[NaN].includes(NaN)` `true` hai), jabki `indexOf()` nahi kar sakta (`[NaN].indexOf(NaN)` `-1` hai) kyunki `indexOf` `===` comparison use karta hai aur `NaN === NaN` false hai.',
    },
  },

  // ─── Functions ───────────────────────────────────────────
  {
    question: 'What is a function declaration?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A function declaration uses the `function` keyword with a name at statement level: `function greet() {...}`. It is fully hoisted — both the name AND the implementation are available before the line where it is written, so you can call it earlier in the file. This is different from a function expression, which is only hoisted as a variable (with its value assigned later, at the point of definition).',
      hinglish:
        'Ek function declaration `function` keyword ko naam ke saath statement level pe use karta hai: `function greet() {...}`. Ye fully hoisted hota hai — naam AUR implementation dono us line se pehle available hote hain jahan likha gaya hai, isliye tum ise file mein pehle call kar sakte ho. Ye function expression se alag hai, jo sirf ek variable ke roop mein hoisted hota hai (uski value baad mein, definition ke point pe assign hoti hai).',
    },
  },
  {
    question: 'What is a function expression?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A function expression assigns a function (named or anonymous) to a variable: `const greet = function() {...}`. Unlike a function declaration, it is NOT hoisted with its implementation — only the `const`/`let`/`var` variable binding follows normal hoisting rules, meaning calling `greet()` before this line throws a ReferenceError (with `const`/`let`, due to the TDZ) or gives `undefined is not a function` (with `var`). Function expressions are commonly used for callbacks and conditionally-defined functions.',
      hinglish:
        'Ek function expression ek function (named ya anonymous) ko ek variable mein assign karta hai: `const greet = function() {...}`. Function declaration ke ulat, ye apni implementation ke saath hoisted NAHI hota — sirf `const`/`let`/`var` variable binding normal hoisting rules follow karti hai, matlab is line se pehle `greet()` call karne se ReferenceError aata hai (`const`/`let` ke saath, TDZ ki wajah se) ya `undefined is not a function` milta hai (`var` ke saath). Function expressions commonly callbacks aur conditionally-defined functions ke liye use hote hain.',
    },
  },
  {
    question: 'What is a callback function?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A callback is a function passed as an argument to another function, to be invoked (called back) later — either synchronously (e.g. `[1,2].map(x => x*2)`) or asynchronously (e.g. `setTimeout(() => {...}, 1000)`, or a Node.js `fs.readFile(path, callback)`). Callbacks are how JavaScript handles asynchrony at its core — Promises and async/await are built on top of the same callback mechanism, just with cleaner syntax and better error propagation.',
      hinglish:
        'Callback ek function hai jo doosre function mein argument ke roop mein pass hota hai, baad mein invoke (call back) hone ke liye — ya to synchronously (jaise `[1,2].map(x => x*2)`) ya asynchronously (jaise `setTimeout(() => {...}, 1000)`, ya Node.js ka `fs.readFile(path, callback)`). Callbacks core mein JavaScript ke asynchrony handle karne ka tareeka hain — Promises aur async/await usi callback mechanism ke upar bane hain, bas cleaner syntax aur better error propagation ke saath.',
    },
  },
  {
    question: 'What are first-class functions?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A language has "first-class functions" if functions are treated like any other value: they can be assigned to variables, stored in arrays/objects, passed as arguments (callbacks), and returned from other functions (higher-order functions). JavaScript treats functions this way natively, which is what enables functional programming patterns like map/filter/reduce, currying, and composition to exist without special language support.',
      hinglish:
        'Ek language mein "first-class functions" tab hoti hain jab functions ko kisi bhi doosri value ki tarah treat kiya jaaye: variables mein assign ho sakein, arrays/objects mein store ho sakein, arguments (callbacks) ke roop mein pass ho sakein, aur doosre functions se return ho sakein (higher-order functions). JavaScript functions ko natively is tarah treat karta hai, yahi wajah hai functional programming patterns jaise map/filter/reduce, currying, aur composition bina special language support ke exist kar sakte hain.',
    },
  },
  {
    question: 'What is an IIFE?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An IIFE (Immediately Invoked Function Expression) is a function that runs the moment it is defined: `(function() { console.log("run now"); })();`. It was the classic pre-ES6 way to create a private scope — variables declared inside never leak into the global scope, avoiding naming collisions between scripts. Modern code uses ES modules or simply block scope (`let`/`const` in `{}`) for the same purpose, so IIFEs are less common today but still appear in library/bundler-generated code.',
      hinglish:
        'IIFE (Immediately Invoked Function Expression) ek function hai jo define hote hi run hota hai: `(function() { console.log("run now"); })();`. Ye pre-ES6 ka classic tareeka tha private scope banane ka — andar declare kiye variables kabhi global scope mein leak nahi hote, scripts ke beech naming collisions avoid karte hue. Modern code isi purpose ke liye ES modules ya simply block scope (`{}` mein `let`/`const`) use karta hai, isliye IIFEs aaj kam common hain par library/bundler-generated code mein abhi bhi dikhte hain.',
    },
  },
  {
    question: 'What is recursion?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Recursion is when a function calls itself to break a problem into smaller sub-problems, until it reaches a "base case" that stops the calling. Every recursive function needs: (1) a base case (the simplest, non-recursive scenario that ends the chain), and (2) a recursive case (that calls itself with a smaller/simpler input, moving towards the base case). Example: `function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }`. Deep recursion can cause a "Maximum call stack size exceeded" error since each call adds a frame to the call stack.',
      hinglish:
        'Recursion tab hai jab ek function khud ko call kare ek problem ko chhote sub-problems mein tod ne ke liye, jab tak wo ek "base case" tak na pahunche jo calling rok de. Har recursive function ko chahiye: (1) base case (sabse simple, non-recursive scenario jo chain khatam kare), aur (2) recursive case (jo khud ko chhote/simpler input ke saath call kare, base case ki taraf move karte hue). Example: `function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }`. Deep recursion se "Maximum call stack size exceeded" error aa sakti hai kyunki har call call stack mein ek frame add karti hai.',
    },
  },
  {
    question: 'What are default parameters?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Default parameters (ES6) let you specify a fallback value for a function parameter that is used ONLY when the argument is `undefined` (not passed, or explicitly passed as `undefined`) — `function greet(name = "Guest") {...}`. Note: passing `null` does NOT trigger the default, since `null` is a deliberate value, not "missing". Default values are evaluated at call time and can even reference earlier parameters: `function add(a, b = a) {...}`.',
      hinglish:
        'Default parameters (ES6) tumhe ek function parameter ke liye fallback value specify karne dete hain jo SIRF tab use hoti hai jab argument `undefined` ho (pass hi na ho, ya explicitly `undefined` pass ho) — `function greet(name = "Guest") {...}`. Note: `null` pass karne se default trigger NAHI hota, kyunki `null` ek deliberate value hai, "missing" nahi. Default values call time pe evaluate hoti hain aur pehle ke parameters ko reference bhi kar sakti hain: `function add(a, b = a) {...}`.',
    },
  },
  {
    question: 'What are rest parameters?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Rest parameters (`...args`) collect all remaining arguments passed to a function into a REAL array: `function sum(...nums) { return nums.reduce((a,b) => a+b, 0); }`. This replaces the old `arguments` object, which is an array-LIKE object (has indices and .length but not real array methods like .map/.filter). A rest parameter must be the LAST parameter in the function signature, and there can be only one.',
      hinglish:
        'Rest parameters (`...args`) ek function ko pass kiye saare remaining arguments ko ek REAL array mein collect karte hain: `function sum(...nums) { return nums.reduce((a,b) => a+b, 0); }`. Ye purane `arguments` object ki jagah leta hai, jo ek array-LIKE object hai (indices aur .length hote hain par real array methods jaise .map/.filter nahi). Rest parameter function signature mein LAST parameter hona chahiye, aur sirf ek ho sakta hai.',
    },
  },
  {
    question: 'What is the spread operator?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The spread operator (`...`) EXPANDS an iterable (array, string, Set, Map values) or an object\'s own enumerable properties into individual elements — the opposite direction of rest parameters, which COLLECT into an array. Common uses: copying arrays/objects (`[...arr]`, `{...obj}`), merging arrays/objects (`[...a, ...b]`), passing array elements as individual function arguments (`Math.max(...numbers)`), and converting a Set/string to an array (`[...new Set(arr)]`).',
      hinglish:
        'Spread operator (`...`) ek iterable (array, string, Set, Map values) ya ek object ki own enumerable properties ko individual elements mein EXPAND karta hai — rest parameters ki opposite direction, jo array mein COLLECT karte hain. Common uses: arrays/objects copy karna (`[...arr]`, `{...obj}`), arrays/objects merge karna (`[...a, ...b]`), array elements ko individual function arguments ke roop mein pass karna (`Math.max(...numbers)`), aur Set/string ko array mein convert karna (`[...new Set(arr)]`).',
    },
  },
  {
    question: 'What is the difference between rest and spread?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'They use the SAME `...` syntax but do opposite things depending on context. Rest COLLECTS multiple values into a single array — used in function parameters (`function f(...args)`) or destructuring (`const [a, ...rest] = arr`). Spread EXPANDS a single array/object into multiple individual values — used in function calls (`f(...args)`) or literals (`[...arr1, ...arr2]`, `{...obj}`). Mnemonic: rest appears on the LEFT side of an assignment/parameter list (gathering); spread appears on the RIGHT side / inside a call (scattering).',
      hinglish:
        'Dono SAME `...` syntax use karte hain par context ke hisaab se opposite kaam karte hain. Rest multiple values ko ek single array mein COLLECT karta hai — function parameters (`function f(...args)`) ya destructuring (`const [a, ...rest] = arr`) mein use hota hai. Spread ek single array/object ko multiple individual values mein EXPAND karta hai — function calls (`f(...args)`) ya literals (`[...arr1, ...arr2]`, `{...obj}`) mein use hota hai. Mnemonic: rest assignment/parameter list ke LEFT side pe aata hai (gathering); spread RIGHT side pe / call ke andar aata hai (scattering).',
    },
  },
  {
    question: 'What is function composition?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Function composition is combining two or more simple functions into a single, more complex function, where the output of one becomes the input of the next — `compose(f, g)(x) === f(g(x))`. It is a core functional-programming pattern used to build complex data transformations from small, reusable, testable pieces instead of one large imperative function. Utility libraries like Ramda/Lodash provide `compose`/`pipe` helpers: `const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);`.',
      hinglish:
        'Function composition do ya zyada simple functions ko ek single, zyada complex function mein combine karna hai, jahan ek ka output agle ka input ban jaata hai — `compose(f, g)(x) === f(g(x))`. Ye ek core functional-programming pattern hai jo complex data transformations ko chhote, reusable, testable pieces se banata hai ek bade imperative function ke bajaye. Ramda/Lodash jaisi utility libraries `compose`/`pipe` helpers dete hain: `const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);`.',
    },
  },

  // ─── Scope & Closures ───────────────────────────────────────────
  {
    question: 'What is scope?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Scope determines where in your code a variable is accessible. JavaScript resolves variable lookups by searching the current scope, then walking outward through enclosing scopes, until it finds the variable or reaches the global scope (throwing a ReferenceError if never found). Understanding scope explains why a variable declared inside a function is invisible outside it, and is the foundation on which closures and the module pattern are built.',
      hinglish:
        'Scope decide karta hai ki code mein kahan ek variable accessible hai. JavaScript variable lookups ko current scope search karke resolve karta hai, phir enclosing scopes ke through bahar walk karta hai, jab tak variable mil na jaaye ya global scope tak pahunch jaaye (agar kabhi na mile to ReferenceError throw karte hue). Scope samajhna ye explain karta hai ki ek function ke andar declare kiya variable bahar kyun invisible hai, aur ye foundation hai jispe closures aur module pattern bane hain.',
    },
  },
  {
    question: 'What are Global, Function, and Block scope?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Global scope: variables declared outside any function/block, accessible everywhere in the program. Function scope: variables declared with `var` inside a function are visible throughout that entire function, regardless of nested blocks (if/for/while) — `var` ignores block boundaries. Block scope (ES6): variables declared with `let`/`const` inside any `{}` block are only visible within that block — this is why `let`/`const` are strongly preferred over `var` for predictable, contained scoping.',
      hinglish:
        'Global scope: koi bhi function/block ke bahar declare kiye variables, program mein har jagah accessible. Function scope: ek function ke andar `var` se declare kiye variables us poori function mein visible hote hain, nested blocks (if/for/while) ki parwah kiye bina — `var` block boundaries ignore karta hai. Block scope (ES6): kisi bhi `{}` block ke andar `let`/`const` se declare kiye variables sirf us block ke andar visible hote hain — yahi wajah hai `let`/`const` ko `var` se zyada strongly prefer kiya jaata hai predictable, contained scoping ke liye.',
    },
  },
  {
    question: 'What is lexical scope?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Lexical (static) scope means a variable\'s accessibility is determined by WHERE it is physically written in the source code, not by how or from where the function is called. A function\'s scope chain is fixed at the moment it is DEFINED, based on its nesting in the code — this is what makes closures possible, since an inner function permanently "remembers" the variables of the outer function it was written inside, no matter where it is later invoked.',
      hinglish:
        'Lexical (static) scope ka matlab hai ki ek variable ki accessibility is baat se decide hoti hai ki wo source code mein PHYSICALLY kahan likha hai, is baat se nahi ki function kaise ya kahan se call hota hai. Ek function ka scope chain us moment fix ho jaata hai jab wo DEFINE hota hai, code mein uski nesting ke basis pe — yahi closures ko possible banata hai, kyunki ek inner function permanently outer function ke variables "yaad rakhta hai" jiske andar wo likha gaya tha, chahe wo baad mein kahin bhi invoke ho.',
    },
  },
  {
    question: 'Give a real-world use case of closures.',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A common real-world use is a private counter/module pattern: `function createCounter() { let count = 0; return { increment: () => ++count, getCount: () => count }; }`. The `count` variable is completely private — it cannot be accessed or modified from outside except through the returned functions, since the returned functions "close over" the `count` variable from their enclosing scope. This pattern powers React\'s `useState` internals, memoization/caching, event handler factories, and the classic module pattern for encapsulation before ES modules existed.',
      hinglish:
        'Ek common real-world use hai private counter/module pattern: `function createCounter() { let count = 0; return { increment: () => ++count, getCount: () => count }; }`. `count` variable poori tarah private hai — bahar se access ya modify nahi ho sakta except returned functions ke through, kyunki returned functions apne enclosing scope se `count` variable ko "close over" karte hain. Ye pattern React ke `useState` internals, memoization/caching, event handler factories, aur ES modules exist karne se pehle classic module pattern (encapsulation ke liye) power karta hai.',
    },
  },
  {
    question: 'What is variable shadowing?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Shadowing happens when a variable declared in an inner scope has the same name as a variable in an outer scope — the inner variable "shadows" (hides) the outer one for the duration of that inner scope, without modifying the outer variable at all. `let x = 1; { let x = 2; console.log(x); } console.log(x);` logs `2` then `1` — the inner `x` never touched the outer `x`. Illegal shadowing occurs if you try to shadow a `let`/`const` with `var` in the same or a nested function scope, which throws a SyntaxError.',
      hinglish:
        'Shadowing tab hoti hai jab ek inner scope mein declare kiya variable ek outer scope ke variable jaisa hi naam rakhta hai — inner variable us inner scope ki duration ke liye outer wale ko "shadow" (hide) karta hai, outer variable ko bilkul bhi modify kiye bina. `let x = 1; { let x = 2; console.log(x); } console.log(x);` `2` phir `1` log karta hai — inner `x` ne outer `x` ko kabhi touch nahi kiya. Illegal shadowing tab hoti hai agar tum same ya nested function scope mein `let`/`const` ko `var` se shadow karne ki koshish karo, jo SyntaxError throw karta hai.',
    },
  },
  {
    question: 'What gets hoisted in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Hoisting means declarations are processed before code execution, during a "creation phase". Function declarations are hoisted COMPLETELY — name and body — so they can be called before their line. `var` declarations are hoisted but only the DECLARATION, initialised to `undefined`; the assignment stays in place. `let`/`const` declarations are also technically hoisted (their name is registered), but they are NOT initialised — accessing them before their line throws a ReferenceError due to the Temporal Dead Zone, rather than returning `undefined`.',
      hinglish:
        'Hoisting ka matlab hai declarations code execution se pehle process hote hain, ek "creation phase" ke dauraan. Function declarations POORI TARAH hoisted hote hain — naam aur body dono — isliye unhe unki line se pehle call kiya ja sakta hai. `var` declarations hoisted hote hain par sirf DECLARATION, `undefined` se initialised; assignment apni jagah rehta hai. `let`/`const` declarations bhi technically hoisted hote hain (unka naam register hota hai), par wo initialise NAHI hote — unhe unki line se pehle access karne se ReferenceError aata hai Temporal Dead Zone ki wajah se, `undefined` return karne ke bajaye.',
    },
  },
  {
    question: 'Can let and const be hoisted?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Yes — `let` and `const` ARE hoisted, contrary to the popular misconception that they are not. What actually differs from `var` is INITIALISATION timing: `var` is hoisted and immediately initialised to `undefined`, so accessing it early gives `undefined`. `let`/`const` are hoisted but left UNINITIALISED, sitting in the "Temporal Dead Zone" from the start of their block until their declaration line executes — accessing them in that window throws `ReferenceError: Cannot access before initialization`, not a silent `undefined`.',
      hinglish:
        'Haan — `let` aur `const` HOISTED hote hain, is popular misconception ke ulat ki nahi hote. `var` se actually jo differ karta hai wo hai INITIALISATION timing: `var` hoisted hota hai aur turant `undefined` se initialise ho jaata hai, isliye jaldi access karne pe `undefined` milta hai. `let`/`const` hoisted hote hain par UNINITIALISED chhode jaate hain, apne block ki shuruaat se lekar declaration line execute hone tak "Temporal Dead Zone" mein baithe rehte hain — us window mein access karne se `ReferenceError: Cannot access before initialization` aata hai, silent `undefined` nahi.',
    },
  },

  // ─── Objects ───────────────────────────────────────────
  {
    question: 'What is an object in JavaScript?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'An object is a collection of key-value pairs (properties), where keys are strings or symbols and values can be any type — including other objects and functions (making them "methods"). Objects are the fundamental building block of JavaScript: arrays, functions, dates, regexes, Maps, and Sets are all specialised kinds of objects under the hood. They are reference types, stored on the heap, and support dynamic addition/removal of properties at runtime.',
      hinglish:
        'Ek object key-value pairs (properties) ka collection hai, jahan keys strings ya symbols hoti hain aur values kisi bhi type ki ho sakti hain — including doosre objects aur functions (jo unhe "methods" banata hai). Objects JavaScript ka fundamental building block hain: arrays, functions, dates, regexes, Maps, aur Sets — sab under the hood specialised kinds of objects hain. Ye reference types hain, heap pe store hote hain, aur runtime pe properties ka dynamic addition/removal support karte hain.',
    },
  },
  {
    question: 'What is object destructuring?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Destructuring is syntax that unpacks values from objects (or arrays) into distinct variables in a single expression: `const { name, age } = user;` extracts `user.name` and `user.age` directly into local variables. It supports renaming (`const { name: userName } = user`), default values (`const { role = "guest" } = user`), nested extraction, and combines with rest (`const { id, ...rest } = user`). It dramatically reduces boilerplate when working with function parameters or API response objects.',
      hinglish:
        'Destructuring ek syntax hai jo objects (ya arrays) se values ko ek single expression mein distinct variables mein unpack karta hai: `const { name, age } = user;` `user.name` aur `user.age` ko directly local variables mein extract karta hai. Ye renaming (`const { name: userName } = user`), default values (`const { role = "guest" } = user`), nested extraction support karta hai, aur rest ke saath combine hota hai (`const { id, ...rest } = user`). Function parameters ya API response objects ke saath kaam karte waqt ye boilerplate dramatically kam karta hai.',
    },
  },
  {
    question: 'What is optional chaining (?.)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Optional chaining (`?.`) safely accesses a deeply nested property without throwing an error if an intermediate reference is `null` or `undefined` — `user?.address?.city` returns `undefined` instead of crashing if `user` or `user.address` doesn\'t exist, replacing the older, verbose `user && user.address && user.address.city` pattern. It also works with function calls (`obj.method?.()`, only calls if `method` exists) and array/bracket access (`arr?.[0]`).',
      hinglish:
        'Optional chaining (`?.`) ek deeply nested property ko safely access karta hai bina error throw kiye agar koi intermediate reference `null` ya `undefined` ho — `user?.address?.city` `undefined` return karta hai crash hone ke bajaye agar `user` ya `user.address` exist nahi karta, purane, verbose `user && user.address && user.address.city` pattern ki jagah leta hai. Ye function calls (`obj.method?.()`, sirf tab call karta hai jab `method` exist kare) aur array/bracket access (`arr?.[0]`) ke saath bhi kaam karta hai.',
    },
  },
  {
    question: 'What is nullish coalescing (??)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The nullish coalescing operator (`??`) returns its right-hand side ONLY when the left-hand side is `null` or `undefined` — unlike `||`, which falls back for ANY falsy value (`0`, `""`, `false`, `NaN` too). `const count = userInput ?? 10;` correctly preserves a legitimate `0` from `userInput`, whereas `userInput || 10` would incorrectly replace a valid `0` with `10`. This makes `??` the safer choice specifically for "provide a default only if truly missing" scenarios.',
      hinglish:
        'Nullish coalescing operator (`??`) apni right-hand side SIRF tab return karta hai jab left-hand side `null` ya `undefined` ho — `||` ke ulat, jo KISI BHI falsy value ke liye fallback karta hai (`0`, `""`, `false`, `NaN` bhi). `const count = userInput ?? 10;` correctly ek legitimate `0` ko `userInput` se preserve karta hai, jabki `userInput || 10` galat tarike se ek valid `0` ko `10` se replace kar deta. Isse `??` "sirf tab default do jab truly missing ho" scenarios ke liye safer choice ban jaata hai.',
    },
  },
  {
    question: 'What is the difference between Object.keys(), Object.values(), and Object.entries()?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`Object.keys(obj)` returns an array of the object\'s own enumerable PROPERTY NAMES (strings). `Object.values(obj)` returns an array of the corresponding VALUES, in the same order. `Object.entries(obj)` returns an array of `[key, value]` pairs — ideal for `for...of` iteration (`for (const [k, v] of Object.entries(obj))`) or converting an object to a Map (`new Map(Object.entries(obj))`). All three ignore inherited (prototype-chain) properties, only listing the object\'s own properties.',
      hinglish:
        '`Object.keys(obj)` object ki own enumerable PROPERTY NAMES (strings) ka array return karta hai. `Object.values(obj)` corresponding VALUES ka array return karta hai, same order mein. `Object.entries(obj)` `[key, value]` pairs ka array return karta hai — `for...of` iteration ke liye ideal (`for (const [k, v] of Object.entries(obj))`) ya object ko Map mein convert karne ke liye (`new Map(Object.entries(obj))`). Teeno inherited (prototype-chain) properties ignore karte hain, sirf object ki own properties list karte hain.',
    },
  },
  {
    question: 'What is Object.freeze()?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`Object.freeze(obj)` makes an object fully immutable at the TOP LEVEL: you cannot add, remove, or reassign any of its existing properties — in non-strict mode changes silently fail; in strict mode they throw a TypeError. Important caveat: it is SHALLOW — if a property\'s value is itself an object, that nested object remains fully mutable. `Object.isFrozen(obj)` checks the frozen state. Commonly used for exporting constants or config objects that should never be mutated.',
      hinglish:
        '`Object.freeze(obj)` ek object ko TOP LEVEL pe fully immutable bana deta hai: tum uski kisi bhi existing property ko add, remove, ya reassign nahi kar sakte — non-strict mode mein changes silently fail hote hain; strict mode mein TypeError throw hota hai. Important caveat: ye SHALLOW hai — agar ek property ki value khud ek object hai, wo nested object fully mutable rehta hai. `Object.isFrozen(obj)` frozen state check karta hai. Commonly constants ya config objects export karne ke liye use hota hai jo kabhi mutate nahi hone chahiye.',
    },
  },
  {
    question: 'What is Object.seal()?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`Object.seal(obj)` prevents adding new properties and DELETING existing ones, but — unlike `freeze` — still allows MODIFYING the values of existing writable properties. It essentially locks the object\'s "shape" (its set of keys) while leaving the values flexible. `Object.isSealed(obj)` checks the sealed state. Use `seal` when you want a fixed structure (no new/removed fields) but still need to update values, e.g. a settings object with a known, fixed set of keys.',
      hinglish:
        '`Object.seal(obj)` naye properties add karne aur existing properties DELETE karne se rokta hai, par — `freeze` ke ulat — existing writable properties ki values MODIFY karne ki abhi bhi allow karta hai. Ye essentially object ki "shape" (uski keys ka set) lock kar deta hai jabki values flexible chhod deta hai. `Object.isSealed(obj)` sealed state check karta hai. `seal` tab use karo jab tumhe ek fixed structure chahiye (no new/removed fields) par values update karne ki zaroorat abhi bhi ho, jaise ek settings object with a known, fixed set of keys.',
    },
  },
  {
    question: 'What is the "this" keyword in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`this` refers to the object that is currently "executing" the function — its value is determined by HOW a function is CALLED, not where it is defined (except for arrow functions). Rules: a plain function call (`fn()`) has `this` as `undefined` in strict mode (or the global object in non-strict); a method call (`obj.method()`) has `this` as `obj`; `new Fn()` has `this` as the newly created instance; and `call`/`apply`/`bind` let you explicitly set `this`. This "call-site dependent" behaviour is one of JS\'s most confusing features for beginners.',
      hinglish:
        '`this` us object ko refer karta hai jo currently function ko "execute" kar raha hai — iski value is baat se decide hoti hai ki function KAISE call hua, kahan define hua (arrow functions ke alawa). Rules: ek plain function call (`fn()`) mein `this` strict mode mein `undefined` hai (ya non-strict mein global object); ek method call (`obj.method()`) mein `this` `obj` hai; `new Fn()` mein `this` newly created instance hai; aur `call`/`apply`/`bind` tumhe explicitly `this` set karne dete hain. Ye "call-site dependent" behaviour beginners ke liye JS ka sabse confusing feature hai.',
    },
  },
  {
    question: 'How does "this" work in arrow functions?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Arrow functions do NOT have their own `this` binding — they lexically inherit `this` from the enclosing (surrounding) scope at the time they are DEFINED, and this binding can never be changed, even with `call`/`apply`/`bind`. This makes arrow functions ideal inside callbacks/methods where you want `this` to remain the outer context: `class Timer { start() { setTimeout(() => this.tick(), 1000); } }` — the arrow function correctly keeps `this` as the Timer instance, whereas a regular function would lose it.',
      hinglish:
        'Arrow functions ka apna `this` binding NAHI hota — wo lexically enclosing (surrounding) scope se `this` inherit karte hain jab DEFINE hote hain, aur ye binding kabhi change nahi ho sakti, `call`/`apply`/`bind` se bhi nahi. Isse arrow functions callbacks/methods ke andar ideal hain jahan tum chahte ho `this` outer context hi rahe: `class Timer { start() { setTimeout(() => this.tick(), 1000); } }` — arrow function correctly `this` ko Timer instance rakhta hai, jabki ek regular function ise kho deta.',
    },
  },
  {
    question: 'What is a prototype in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Every JavaScript object has an internal link (`[[Prototype]]`, accessible via `Object.getPrototypeOf(obj)` or the deprecated `__proto__`) to another object called its prototype, from which it inherits properties and methods. `Function.prototype` is the object that becomes the `[[Prototype]]` of every instance created with `new SomeFunction()` — this is how, for example, every array automatically has access to `.map`, `.filter`, `.push`, etc., without those methods being copied onto each array individually.',
      hinglish:
        'Har JavaScript object ka ek internal link hota hai (`[[Prototype]]`, `Object.getPrototypeOf(obj)` ya deprecated `__proto__` se accessible) ek doosre object se jise uska prototype kehte hain, jisse wo properties aur methods inherit karta hai. `Function.prototype` wo object hai jo har instance ka `[[Prototype]]` bant jaata hai jo `new SomeFunction()` se banaya jaata hai — isi tarah, for example, har array automatically `.map`, `.filter`, `.push`, etc. ka access rakhta hai, bina in methods ko har array pe individually copy kiye.',
    },
  },

  // ─── Arrays ───────────────────────────────────────────
  {
    question: 'What is the difference between map() and forEach()?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`map()` transforms each element and RETURNS A NEW ARRAY of the same length containing the results — it is designed for creating a derived dataset and is chainable (`arr.map(...).filter(...)`). `forEach()` simply executes a function for each element for SIDE EFFECTS (logging, pushing into an external array, mutating something) and always returns `undefined` — it cannot be chained. Rule of thumb: use `map` when you need the transformed values back; use `forEach` only when you need to "do something" without producing a new array.',
      hinglish:
        '`map()` har element ko transform karta hai aur same length ka EK NAYA ARRAY results ka RETURN karta hai — ye ek derived dataset banane ke liye designed hai aur chainable hai (`arr.map(...).filter(...)`). `forEach()` simply har element ke liye ek function execute karta hai SIDE EFFECTS ke liye (logging, external array mein push karna, kuch mutate karna) aur hamesha `undefined` return karta hai — chain nahi ho sakta. Rule of thumb: `map` use karo jab tumhe transformed values wapas chahiye; `forEach` sirf tab use karo jab "kuch karna" ho bina naya array produce kiye.',
    },
  },
  {
    question: 'What is the difference between filter() and find()?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`filter(predicate)` returns a NEW ARRAY containing ALL elements that pass the test — the result can be empty, one item, or many. `find(predicate)` returns only the FIRST matching element itself (not wrapped in an array), or `undefined` if none match, and stops searching as soon as it finds a match (more efficient for finding "the one item"). Use `filter` when you need every match; use `find` when you need a single result.',
      hinglish:
        '`filter(predicate)` EK NAYA ARRAY return karta hai jisme test pass karne wale SAARE elements hote hain — result empty, ek item, ya bahut saare ho sakte hain. `find(predicate)` sirf PEHLA matching element khud return karta hai (array mein wrap kiye bina), ya `undefined` agar koi match na kare, aur match milte hi search rok deta hai (ek item dhundhne ke liye zyada efficient). `filter` use karo jab har match chahiye; `find` use karo jab ek single result chahiye.',
    },
  },
  {
    question: 'What is the difference between some() and every()?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`some(predicate)` returns `true` if AT LEAST ONE element passes the test (short-circuits on the first match) — `[]` (empty array) returns `false`. `every(predicate)` returns `true` only if ALL elements pass the test (short-circuits on the first FAILURE) — `[]` (empty array) returns `true` (vacuous truth). Both are more expressive and readable than manually looping with a flag variable.',
      hinglish:
        '`some(predicate)` `true` return karta hai agar KAM SE KAM ek element test pass kare (pehle match pe short-circuit) — `[]` (empty array) `false` return karta hai. `every(predicate)` `true` sirf tab return karta hai jab SAARE elements test pass karein (pehli FAILURE pe short-circuit) — `[]` (empty array) `true` return karta hai (vacuous truth). Dono manually flag variable se loop karne se zyada expressive aur readable hain.',
    },
  },
  {
    question: 'What is reduce() and how does it work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`reduce(callback, initialValue)` "reduces" an entire array to a SINGLE value by running an accumulator function over each element in order — the callback receives `(accumulator, currentValue, index, array)` and its return value becomes the accumulator for the next iteration. It is the most general array method; sum, count, group-by, flatten, and even `map`/`filter` can all be re-implemented using `reduce` alone, which is why it is a favourite interview topic.',
      hinglish:
        '`reduce(callback, initialValue)` poore array ko ek SINGLE value mein "reduce" karta hai ek accumulator function ko har element pe order mein chalate hue — callback ko `(accumulator, currentValue, index, array)` milta hai aur uska return value agli iteration ke liye accumulator ban jaata hai. Ye sabse general array method hai; sum, count, group-by, flatten, aur even `map`/`filter` sab `reduce` se hi re-implement kiye ja sakte hain, yahi wajah hai ye ek favourite interview topic hai.',
    },
  },
  {
    question: 'How do you flatten a nested array?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The built-in way: `arr.flat(depth)` flattens nested arrays up to `depth` levels (default 1); use `arr.flat(Infinity)` to fully flatten arbitrarily nested arrays. `arr.flatMap(fn)` is a combined map + flat(1), useful when your mapping function itself returns arrays. Before ES2019, this was done manually with recursion: `function flatten(arr) { return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []); }`.',
      hinglish:
        'Built-in tareeka: `arr.flat(depth)` nested arrays ko `depth` levels tak flatten karta hai (default 1); arbitrarily nested arrays ko fully flatten karne ke liye `arr.flat(Infinity)` use karo. `arr.flatMap(fn)` ek combined map + flat(1) hai, useful hai jab tumhara mapping function khud arrays return kare. ES2019 se pehle, ye manually recursion se hota tha: `function flatten(arr) { return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []); }`.',
    },
  },
  {
    question: 'What is the difference between push() and concat()?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`push(...items)` MUTATES the original array by adding items to its end, and returns the new LENGTH of the array (not the array itself). `concat(...items/arrays)` does NOT mutate anything — it returns a brand NEW array containing the original elements plus the new ones. Use `push` when in-place mutation is fine (e.g. building up a local array); use `concat` (or the spread operator `[...arr, newItem]`) when you need immutability, such as in React state updates.',
      hinglish:
        '`push(...items)` original array ko MUTATE karta hai uske end mein items add karke, aur array ki nayi LENGTH return karta hai (array khud nahi). `concat(...items/arrays)` kuch bhi mutate NAHI karta — ye ek BILKUL NAYA array return karta hai jisme original elements plus naye elements hote hain. `push` use karo jab in-place mutation theek ho (jaise ek local array banana); `concat` (ya spread operator `[...arr, newItem]`) use karo jab immutability chahiye, jaise React state updates mein.',
    },
  },
  {
    question: 'What is the difference between mutable and immutable array methods?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Mutable methods change the ORIGINAL array in place: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`. Immutable (non-mutating) methods return a NEW array/value, leaving the original untouched: `map`, `filter`, `reduce`, `slice`, `concat`, `flat`, the spread operator, and the newer ES2023 counterparts `toSorted`, `toReversed`, `toSpliced`. In frameworks like React/Redux that rely on reference-equality checks to detect changes, using mutating methods directly on state is a very common bug — always prefer the immutable alternatives.',
      hinglish:
        'Mutable methods ORIGINAL array ko in place change karte hain: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`. Immutable (non-mutating) methods ek NAYA array/value return karte hain, original untouched chhodte hue: `map`, `filter`, `reduce`, `slice`, `concat`, `flat`, spread operator, aur newer ES2023 counterparts `toSorted`, `toReversed`, `toSpliced`. React/Redux jaise frameworks mein jo changes detect karne ke liye reference-equality checks pe depend karte hain, state pe directly mutating methods use karna ek bahut common bug hai — hamesha immutable alternatives prefer karo.',
    },
  },
  {
    question: 'How do you sort numbers correctly in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'By default, `.sort()` converts elements to STRINGS and compares them lexicographically, so `[10, 2, 1].sort()` gives the wrong `[1, 10, 2]` (since "10" < "2" as strings). To sort numbers correctly, always pass a comparator function: `arr.sort((a, b) => a - b)` for ascending, `arr.sort((a, b) => b - a)` for descending. Note that `.sort()` also mutates the original array in place — use `[...arr].sort(...)` or the newer `arr.toSorted(...)` (ES2023) if you need an immutable sort.',
      hinglish:
        'By default, `.sort()` elements ko STRINGS mein convert karke lexicographically compare karta hai, isliye `[10, 2, 1].sort()` galat `[1, 10, 2]` deta hai (kyunki strings ke roop mein "10" < "2"). Numbers ko sahi se sort karne ke liye, hamesha ek comparator function pass karo: ascending ke liye `arr.sort((a, b) => a - b)`, descending ke liye `arr.sort((a, b) => b - a)`. Note karo ki `.sort()` original array ko bhi in place mutate karta hai — agar immutable sort chahiye to `[...arr].sort(...)` ya newer `arr.toSorted(...)` (ES2023) use karo.',
    },
  },

  // ─── Asynchronous JavaScript ───────────────────────────────────────────
  {
    question: 'What is synchronous programming?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Synchronous code executes line by line, in order, and each operation must FINISH before the next one starts — if one line takes 5 seconds (e.g. a heavy loop), everything after it (including UI rendering, in a browser) is blocked for those 5 seconds. Most basic JavaScript code (variable assignment, arithmetic, simple function calls) is synchronous by default; asynchronous behaviour must be explicitly introduced via callbacks, Promises, or async/await.',
      hinglish:
        'Synchronous code line by line, order mein execute hota hai, aur har operation ko agla shuru hone se pehle KHATAM hona zaroori hai — agar ek line 5 seconds leti hai (jaise ek heavy loop), uske baad sab kuch (browser mein UI rendering included) un 5 seconds ke liye block ho jaata hai. Zyadatar basic JavaScript code (variable assignment, arithmetic, simple function calls) by default synchronous hota hai; asynchronous behaviour explicitly callbacks, Promises, ya async/await se introduce karna padta hai.',
    },
  },
  {
    question: 'What is asynchronous programming?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Asynchronous programming lets an operation (network request, file read, timer) START without blocking the rest of the program — the code continues executing other statements, and the async operation\'s result is handled LATER via a callback, Promise `.then()`, or `await`, once it completes. This is essential in JavaScript, especially in browsers, because a single-threaded language would otherwise freeze the entire UI while waiting for slow operations like network calls.',
      hinglish:
        'Asynchronous programming ek operation (network request, file read, timer) ko baaki program ko block kiye bina START karne deta hai — code baaki statements execute karta rehta hai, aur async operation ka result BAAD MEIN handle hota hai ek callback, Promise `.then()`, ya `await` ke through, jab wo complete ho jaaye. Ye JavaScript mein essential hai, especially browsers mein, kyunki ek single-threaded language warna poori UI freeze kar degi slow operations jaise network calls ka wait karte hue.',
    },
  },
  {
    question: 'What are the Promise states?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A Promise has exactly 3 states: **pending** (initial state — the async operation has not completed yet), **fulfilled** (the operation completed successfully, and `.then()` handlers run with the resolved value), and **rejected** (the operation failed, and `.catch()` handlers run with the error/reason). Once a Promise moves from pending to either fulfilled or rejected, it is permanently "settled" — its state and value can never change again, which is what makes Promises reliable and predictable compared to raw callbacks.',
      hinglish:
        'Ek Promise ki exactly 3 states hoti hain: **pending** (initial state — async operation abhi complete nahi hua), **fulfilled** (operation successfully complete hua, aur `.then()` handlers resolved value ke saath chalte hain), aur **rejected** (operation fail hua, aur `.catch()` handlers error/reason ke saath chalte hain). Ek baar Promise pending se fulfilled ya rejected mein move ho jaaye, ye permanently "settled" ho jaata hai — iska state aur value kabhi phir se change nahi ho sakti, yahi Promises ko raw callbacks ke comparison mein reliable aur predictable banata hai.',
    },
  },
  {
    question: 'What is the difference between callbacks and promises?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Callbacks are plain functions passed to be invoked later — nesting multiple async callbacks leads to "callback hell" (deeply indented, hard-to-read pyramid code), and error handling must be manually repeated at every level (usually via an `(err, data)` convention). Promises are objects representing a future value, with built-in chaining (`.then().then()`, flattening the pyramid), a single centralised error path (`.catch()` catches errors from ANY step in the chain), and composability via `Promise.all`/`race`/`allSettled`. Promises are a structural improvement over callbacks, not a different underlying mechanism — they are built on top of callbacks internally.',
      hinglish:
        'Callbacks plain functions hain jo baad mein invoke hone ke liye pass hote hain — multiple async callbacks nest karne se "callback hell" hota hai (deeply indented, hard-to-read pyramid code), aur error handling har level pe manually repeat karni padti hai (usually ek `(err, data)` convention se). Promises future value represent karne wale objects hain, built-in chaining ke saath (`.then().then()`, pyramid ko flatten karte hue), ek single centralised error path (`.catch()` chain ke KISI BHI step se errors catch karta hai), aur `Promise.all`/`race`/`allSettled` se composability. Promises callbacks ke upar ek structural improvement hain, ek alag underlying mechanism nahi — wo internally callbacks ke upar hi bane hain.',
    },
  },
  {
    question: 'What is the difference between async/await and plain Promises?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'async/await (ES2017) is SYNTACTIC SUGAR over Promises — it does not replace them, it makes asynchronous code LOOK synchronous and is easier to read/debug, especially with sequential dependent operations and try/catch error handling. Under the hood, `await someAsyncFn()` is equivalent to `.then()` chaining; an `async function` always implicitly returns a Promise. The trade-off: raw `.then()` chains are sometimes better for PARALLEL operations expressed declaratively (though `Promise.all` with await handles that too), while async/await shines for readable sequential logic.',
      hinglish:
        'async/await (ES2017) Promises ke upar SYNTACTIC SUGAR hai — ye unhe replace nahi karta, ye asynchronous code ko synchronous jaisa DIKHATA hai aur padhna/debug karna easier hai, especially sequential dependent operations aur try/catch error handling ke saath. Under the hood, `await someAsyncFn()` `.then()` chaining ke barabar hai; ek `async function` hamesha implicitly ek Promise return karta hai. Trade-off: raw `.then()` chains kabhi-kabhi PARALLEL operations declaratively express karne ke liye better hote hain (chahe `Promise.all` with await bhi wo handle karta hai), jabki async/await readable sequential logic ke liye shine karta hai.',
    },
  },
  {
    question: 'What is Promise.all()?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`Promise.all(promises)` runs multiple Promises CONCURRENTLY and returns a single Promise that resolves with an ARRAY of all results, IN THE SAME ORDER as the input, once EVERY promise fulfils. Its key trade-off: it is "fail-fast" — if even ONE promise rejects, `Promise.all` immediately rejects with that error, even though the other promises may still be pending/succeeding. It is the go-to tool for running several independent async operations (e.g. multiple API calls) in parallel instead of sequentially awaiting each one.',
      hinglish:
        '`Promise.all(promises)` multiple Promises ko CONCURRENTLY run karta hai aur ek single Promise return karta hai jo saare results ke ek ARRAY se resolve hota hai, input ke SAME ORDER mein, jab HAR promise fulfil ho jaaye. Iska key trade-off: ye "fail-fast" hai — agar ek bhi promise reject ho, `Promise.all` turant us error ke saath reject ho jaata hai, chahe baaki promises abhi pending/succeeding hi kyun na hon. Ye multiple independent async operations (jaise multiple API calls) ko sequentially await karne ke bajaye parallel mein chalane ke liye go-to tool hai.',
    },
  },
  {
    question: 'What is the difference between Promise.all(), Promise.race(), Promise.any(), and Promise.allSettled()?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`Promise.all`: waits for ALL to fulfil, rejects fast on the FIRST rejection. `Promise.race`: settles (fulfils or rejects) as soon as the FIRST promise settles, whatever its outcome — useful for timeouts. `Promise.any` (ES2021): resolves as soon as the FIRST promise FULFILS, ignoring rejections, and only rejects if ALL promises reject (with an AggregateError) — useful for "try multiple sources, use whichever succeeds first". `Promise.allSettled`: waits for ALL to settle (regardless of success/failure) and returns an array of `{status, value|reason}` objects for every one — never rejects, ideal when you need every result even if some failed.',
      hinglish:
        '`Promise.all`: SAARE fulfil hone ka wait karta hai, PEHLI rejection pe fast reject hota hai. `Promise.race`: PEHLA promise settle (fulfil ya reject) hote hi settle ho jaata hai, chahe outcome kuch bhi ho — timeouts ke liye useful. `Promise.any` (ES2021): PEHLA promise FULFIL hote hi resolve hota hai, rejections ignore karte hue, aur sirf tab reject hota hai jab SAARE promises reject hon (AggregateError ke saath) — "multiple sources try karo, jo pehle succeed kare wo use karo" ke liye useful. `Promise.allSettled`: SAARE settle hone ka wait karta hai (success/failure ki parwah kiye bina) aur har ek ke liye `{status, value|reason}` objects ka array return karta hai — kabhi reject nahi hota, ideal hai jab har result chahiye chahe kuch fail bhi ho jaayein.',
    },
  },
  {
    question: 'What is the difference between microtasks and macrotasks?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Macrotasks (the "task queue" / "callback queue") include `setTimeout`, `setInterval`, I/O, and UI rendering — the event loop processes ONE macrotask per loop iteration. Microtasks (the "microtask queue") include Promise `.then/.catch/.finally` callbacks and `queueMicrotask()`. Crucially, the ENTIRE microtask queue is fully drained (including any new microtasks scheduled during draining) after EACH macrotask finishes, and BEFORE the next macrotask or any rendering happens — this is why `Promise.resolve().then(...)` always runs before a `setTimeout(..., 0)`, even though both are "async".',
      hinglish:
        'Macrotasks ("task queue" / "callback queue") mein `setTimeout`, `setInterval`, I/O, aur UI rendering shamil hain — event loop har loop iteration mein EK macrotask process karta hai. Microtasks ("microtask queue") mein Promise `.then/.catch/.finally` callbacks aur `queueMicrotask()` shamil hain. Crucially, poori microtask queue HAR macrotask khatam hone ke baad poori tarah drain hoti hai (draining ke dauraan schedule hue kisi bhi naye microtask ko bhi shamil karte hue), aur agle macrotask ya kisi bhi rendering se PEHLE — yahi wajah hai `Promise.resolve().then(...)` hamesha `setTimeout(..., 0)` se pehle chalta hai, chahe dono "async" hon.',
    },
  },
  {
    question: 'Explain the execution order of: console.log(1); setTimeout(() => console.log(2)); Promise.resolve().then(() => console.log(3)); console.log(4);',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Output order is `1, 4, 3, 2`. Reasoning: `console.log(1)` and `console.log(4)` run immediately as part of the synchronous main script (the call stack). `setTimeout` schedules its callback as a MACROTASK, queued for later — even with a 0ms delay, it must wait its turn. `Promise.resolve().then(...)` schedules its callback as a MICROTASK. After the synchronous code finishes (`1` then `4`), the engine fully drains the microtask queue BEFORE picking the next macrotask — so `3` (microtask) logs before `2` (macrotask).',
      hinglish:
        'Output order hai `1, 4, 3, 2`. Reasoning: `console.log(1)` aur `console.log(4)` turant chalte hain synchronous main script (call stack) ke part ke roop mein. `setTimeout` apna callback ek MACROTASK ke roop mein schedule karta hai, baad ke liye queued — 0ms delay ke saath bhi, apni baari ka wait karna padta hai. `Promise.resolve().then(...)` apna callback ek MICROTASK ke roop mein schedule karta hai. Synchronous code khatam hone ke baad (`1` phir `4`), engine agle macrotask uthaane se PEHLE microtask queue poori tarah drain karta hai — isliye `3` (microtask) `2` (macrotask) se pehle log hota hai.',
    },
  },

  // ─── Advanced JavaScript ───────────────────────────────────────────
  {
    question: 'What are iterators in JavaScript?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'An iterator is any object implementing the "iterator protocol": a `.next()` method that returns `{ value, done }`, where `done` becomes `true` once iteration is complete. An "iterable" is any object implementing `Symbol.iterator` — a method that returns an iterator — which is what makes it usable with `for...of`, spread (`...`), and destructuring. Arrays, strings, Maps, Sets, and generator functions are all natively iterable; you can make a custom object iterable by implementing `[Symbol.iterator]` yourself.',
      hinglish:
        'Ek iterator koi bhi object hai jo "iterator protocol" implement karta hai: ek `.next()` method jo `{ value, done }` return karta hai, jahan iteration complete hone pe `done` `true` ban jaata hai. Ek "iterable" koi bhi object hai jo `Symbol.iterator` implement karta hai — ek method jo ek iterator return karta hai — yahi isse `for...of`, spread (`...`), aur destructuring ke saath usable banata hai. Arrays, strings, Maps, Sets, aur generator functions sab natively iterable hain; tum apna khud ka `[Symbol.iterator]` implement karke ek custom object ko iterable bana sakte ho.',
    },
  },
  {
    question: 'What are modules in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Modules let you split code into separate files, each with its own scope — variables/functions are private by default unless explicitly `export`ed, and other files must `import` what they need. This solves global-scope pollution and dependency management, which used to require manual `<script>` ordering or IIFEs. JavaScript now has native ES Modules (`export`/`import`) supported by browsers and Node.js, alongside the older CommonJS system (`module.exports`/`require`) that dominated Node.js before ES Modules matured.',
      hinglish:
        'Modules code ko separate files mein split karne dete hain, har ek ka apna scope hota hai — variables/functions default se private hote hain jab tak explicitly `export` na ho, aur doosri files ko jo chahiye wo `import` karna padta hai. Ye global-scope pollution aur dependency management solve karta hai, jo pehle manual `<script>` ordering ya IIFEs se hota tha. JavaScript ke paas ab native ES Modules (`export`/`import`) hain jo browsers aur Node.js support karte hain, purane CommonJS system (`module.exports`/`require`) ke saath jo ES Modules mature hone se pehle Node.js mein dominate karta tha.',
    },
  },
  {
    question: 'What is the difference between CommonJS and ES Modules?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'CommonJS (`require`/`module.exports`) is Node.js\'s original module system — it loads modules SYNCHRONOUSLY at runtime, exports are COPIED as plain values at require-time, and it is not natively usable in browsers without a bundler. ES Modules (`import`/`export`) are the official JavaScript standard — they are STATICALLY analysed at parse time (enabling tree-shaking/dead-code elimination by bundlers), support asynchronous loading, exports are LIVE BINDINGS (a reference that updates if the source changes), and work natively in both modern browsers and modern Node.js (with `"type": "module"` or `.mjs` extension).',
      hinglish:
        'CommonJS (`require`/`module.exports`) Node.js ka original module system hai — ye modules ko SYNCHRONOUSLY runtime pe load karta hai, exports require-time pe plain values ke roop mein COPY hote hain, aur bina bundler ke browsers mein natively usable nahi hai. ES Modules (`import`/`export`) official JavaScript standard hain — ye parse time pe STATICALLY analyse hote hain (bundlers ke liye tree-shaking/dead-code elimination enable karte hue), asynchronous loading support karte hain, exports LIVE BINDINGS hote hain (ek reference jo source change hone pe update hota hai), aur modern browsers aur modern Node.js dono mein natively kaam karte hain (`"type": "module"` ya `.mjs` extension ke saath).',
    },
  },
  {
    question: 'What is strict mode in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`"use strict"` (placed at the top of a file or function) opts into a restricted variant of JavaScript that catches common mistakes and unsafe patterns: it throws errors for assigning to undeclared variables (instead of silently creating globals), disallows duplicate parameter names, makes `this` `undefined` (instead of the global object) in plain function calls, and disallows some legacy syntax like `with`. ES Modules and `class` bodies are automatically strict mode by default, which is one reason modern JS code is generally safer than old-style scripts.',
      hinglish:
        '`"use strict"` (file ya function ke top pe rakha jaata hai) JavaScript ke ek restricted variant mein opt-in karta hai jo common mistakes aur unsafe patterns pakadta hai: undeclared variables ko assign karne pe error throw karta hai (silently globals banane ke bajaye), duplicate parameter names disallow karta hai, plain function calls mein `this` ko `undefined` banata hai (global object ke bajaye), aur `with` jaise kuch legacy syntax disallow karta hai. ES Modules aur `class` bodies automatically default se strict mode mein hote hain, yahi ek wajah hai modern JS code generally old-style scripts se safer hota hai.',
    },
  },
  {
    question: 'What is garbage collection in JavaScript?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'JavaScript automatically manages memory via a garbage collector, so developers don\'t manually allocate/free memory. The dominant algorithm is "mark-and-sweep": the GC periodically starts from GC "roots" (global object, currently executing call stack), marks every object reachable from those roots, then sweeps away (frees) all UNMARKED (unreachable) objects. This replaced the older, flawed "reference counting" approach, which could never free objects in a circular reference (A references B, B references A) even when nothing outside referenced either. Memory leaks in JS usually happen when you accidentally keep a reference alive longer than needed (e.g. forgotten event listeners, closures holding large objects, global variable accumulation).',
      hinglish:
        'JavaScript ek garbage collector ke through automatically memory manage karta hai, isliye developers ko manually memory allocate/free nahi karni padti. Dominant algorithm "mark-and-sweep" hai: GC periodically GC "roots" (global object, currently executing call stack) se shuru hota hai, un roots se reachable har object ko mark karta hai, phir saare UNMARKED (unreachable) objects ko sweep karta hai (free karta hai). Isne purane, flawed "reference counting" approach ki jagah li, jo ek circular reference (A B ko reference karta hai, B A ko reference karta hai) mein objects kabhi free nahi kar paata tha chahe bahar se kuch bhi kisi ko reference na kare. JS mein memory leaks usually tab hote hain jab tum accidentally ek reference ko zaroorat se zyada der tak alive rakh dete ho (jaise forgotten event listeners, closures jo bade objects hold karte hain, global variable accumulation).',
    },
  },
  {
    question: 'Explain the complete JavaScript execution process from writing code to browser execution.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'End-to-end flow: (1) Parsing — the engine (e.g. V8) reads the source, tokenises it, and builds an Abstract Syntax Tree (AST). (2) Compilation — modern engines are JIT (Just-In-Time) compiled: the AST is first turned into bytecode by an interpreter (e.g. Ignition in V8) for fast startup, and "hot" (frequently run) code paths are later optimised into machine code by a JIT compiler (e.g. TurboFan). (3) Execution context creation — for the global scope and each function call, the engine creates an execution context with two phases: a CREATION phase (hoisting — variables/functions registered, `this` bound, scope chain set up) and an EXECUTION phase (code runs line by line). (4) Call stack — each function invocation pushes a new execution context onto the call stack, popped when it returns. (5) Web APIs / Node APIs — asynchronous operations (timers, fetch, DOM events) are handed off to the browser/Node runtime, not the JS engine itself. (6) Event loop — once the call stack is empty, the event loop pulls completed microtasks (Promises) first, fully draining them, then one macrotask (timers, I/O) at a time, pushing their callbacks back onto the call stack to run. (7) Rendering — in browsers, the engine also fits in rendering/reflow/repaint work between macrotasks. This whole pipeline is why JS feels both single-threaded (the call stack/event loop is synchronous) and capable of handling many concurrent operations (async work is delegated outside the engine).',
      hinglish:
        'End-to-end flow: (1) Parsing — engine (jaise V8) source padhta hai, tokenise karta hai, aur ek Abstract Syntax Tree (AST) banata hai. (2) Compilation — modern engines JIT (Just-In-Time) compiled hote hain: AST pehle ek interpreter (jaise V8 mein Ignition) se bytecode mein badalta hai fast startup ke liye, aur "hot" (frequently run) code paths baad mein ek JIT compiler (jaise TurboFan) se machine code mein optimise hote hain. (3) Execution context creation — global scope aur har function call ke liye, engine ek execution context banata hai do phases ke saath: ek CREATION phase (hoisting — variables/functions register hote hain, `this` bind hota hai, scope chain set up hoti hai) aur ek EXECUTION phase (code line by line chalta hai). (4) Call stack — har function invocation call stack pe ek naya execution context push karta hai, return hone pe pop hota hai. (5) Web APIs / Node APIs — asynchronous operations (timers, fetch, DOM events) browser/Node runtime ko handoff hote hain, JS engine ko khud nahi. (6) Event loop — call stack khaali hone ke baad, event loop pehle completed microtasks (Promises) pull karta hai, poori tarah drain karte hue, phir ek macrotask (timers, I/O) ek time pe, unke callbacks ko call stack pe wapas push karke chalane ke liye. (7) Rendering — browsers mein, engine macrotasks ke beech rendering/reflow/repaint kaam bhi fit karta hai. Ye poori pipeline hi wajah hai JS single-threaded bhi feel hota hai (call stack/event loop synchronous hai) aur bahut saare concurrent operations handle karne mein capable bhi (async kaam engine ke bahar delegate hota hai).',
    },
  },
];

// Final ordered curriculum
export const curriculum = [...beginner, ...intermediate, ...advanced];
