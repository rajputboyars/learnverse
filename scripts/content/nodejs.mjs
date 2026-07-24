// Node.js curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs, consumed by scripts/seed.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Node.js',
  slug: 'nodejs',
  description:
    'JavaScript ko server pe chalao — modules, fs, async, streams, HTTP aur production patterns. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🟢',
  tags: ['nodejs', 'backend', 'javascript', 'mern'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 7,
};

const beginner = [
  {
    title: 'Node.js Foundations',
    level: 'beginner',
    description: 'Node kya hai, runtime architecture aur modules.',
    concepts: [
      {
        title: 'What is Node.js',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'Node.js is a runtime that lets you run JavaScript outside the browser — on servers, CLIs, and tools. It is built on Chrome\'s V8 engine and adds C++ bindings for the operating system: file system access, networking, processes. Node is single-threaded with a non-blocking, event-driven model, which makes it great for I/O-heavy apps like APIs and real-time servers, but not ideal for raw CPU-bound number crunching.',
          hinglish:
            'Node.js ek runtime hai jo JavaScript ko browser ke bahar chalane deta hai — servers, CLIs, tools pe. Ye Chrome ke V8 engine pe bana hai aur OS ke saath C++ bindings add karta hai: file system access, networking, processes. Node single-threaded hai non-blocking, event-driven model ke saath, jo ise I/O-heavy apps jaise APIs aur real-time servers ke liye badhiya banata hai, par raw CPU-bound number crunching ke liye ideal nahi.',
        },
        dailyLifeExample:
          'Pehle JavaScript sirf browser (ghar) ke andar chalti thi. Node use bahar le aaya — ab JS ek multi-purpose worker hai jo server, file system, network sab handle karta hai, jaise ek ghar ka karigar jo bahar factory mein bhi kaam kar sakta hai.',
        codeExample:
          '// hello.js — run with: node hello.js\nconsole.log("Hello from Node!");\nconsole.log("Node version:", process.version);\nconsole.log("Platform:", process.platform);\nconsole.log("PID:", process.pid);',
        keyPoints: [
          'Runs JavaScript outside the browser',
          'Built on the V8 engine + OS bindings (libuv)',
          'Single-threaded, non-blocking, event-driven',
          'Great for I/O-heavy apps, weaker for CPU-bound work',
        ],
        quiz: [
          {
            question: 'Node.js lets you run JavaScript…',
            options: ['Only in browsers', 'Outside the browser (servers)', 'Only on mobile', 'In databases'],
            correctIndex: 1,
          },
          {
            question: 'Node is built on which engine?',
            options: ['SpiderMonkey', 'V8', 'Chakra', 'JavaScriptCore'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why is Node.js good for I/O-heavy apps but not CPU-heavy ones?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Node uses a single-threaded, non-blocking event loop. I/O (network, file, DB) is delegated to the system/libuv thread pool and handled via callbacks, so one thread can juggle thousands of concurrent connections efficiently. But CPU-heavy work (image processing, big loops, crypto hashing) blocks that single thread, freezing everything else — for that you use worker threads, child processes, clustering, or offload to another service.',
              hinglish:
                'Node single-threaded, non-blocking event loop use karta hai. I/O (network, file, DB) system/libuv thread pool ko de diya jaata hai aur callbacks se handle hota hai, isliye ek thread hazaaron concurrent connections efficiently handle kar leta hai. Par CPU-heavy kaam (image processing, bade loops, crypto hashing) us single thread ko block kar deta hai, baaki sab freeze ho jaata — uske liye worker threads, child processes, clustering, ya alag service use karte ho.',
            },
          },
        ],
      },
      {
        title: 'Node vs Browser JavaScript',
        difficulty: 'easy',
        tags: ['basics'],
        explanation: {
          english:
            'The language is the same, but the environment differs. The browser has window, document, and the DOM; Node has global, process, require/import, and modules like fs and http. Node has no DOM; the browser has no file-system access (for security). Knowing what is available where avoids confusion when porting code between the two.',
          hinglish:
            'Language same hai, par environment alag. Browser mein window, document, aur DOM hote hain; Node mein global, process, require/import, aur fs/http jaise modules. Node mein DOM nahi; browser mein file-system access nahi (security ke liye). Kya kahan available hai ye pata hona code port karte waqt confusion bachata hai.',
        },
        dailyLifeExample:
          'Same driver (JavaScript), alag gaadiyan — browser ek car hai jisme dashboard (DOM) hai, Node ek truck hai jisme cargo system (files, network) hai. Skills same, tools alag.',
        codeExample:
          '// Browser: window, document, alert\n// document.querySelector("h1");\n\n// Node: no DOM; has process, require, global\nconsole.log(process.platform);\nconst fs = require("fs"); // file system\nglobal.myVar = 42; // like window in browser',
        keyPoints: [
          'Same language, different environment',
          'Browser: window, document, DOM',
          'Node: global, process, require/import, fs/http',
          'No DOM in Node; no file access in browser',
        ],
        quiz: [
          {
            question: 'Which is available in Node but NOT the browser?',
            options: ['document', 'window', 'the fs module', 'alert'],
            correctIndex: 2,
          },
          {
            question: 'The DOM is available in…',
            options: ['Node', 'the browser', 'both', 'neither'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Running Scripts, the REPL & Global Objects',
        difficulty: 'easy',
        tags: ['basics', 'cli'],
        explanation: {
          english:
            "Run any file with node filename.js — Node executes it top to bottom and exits when done (unless something keeps it alive, like a server). Typing just node with no file opens the REPL (Read-Eval-Print Loop), an interactive prompt for trying out JS one line at a time — great for quick experiments. Inside a script, __dirname and __filename give the current folder/file's absolute path, process.argv is an array of command-line arguments, and global is Node's version of the browser's window (things attached to it are available everywhere).",
          hinglish:
            "Koi bhi file node filename.js se run karo — Node use upar se neeche chalata hai aur khatam hone pe exit ho jaata hai (jab tak kuch use zinda na rakhe, jaise server). Sirf node likhna (bina file ke) REPL kholta hai (Read-Eval-Print Loop), ek interactive prompt jaha ek-ek line JS try kar sakte ho — quick experiments ke liye badhiya. Script ke andar, __dirname aur __filename current folder/file ka absolute path dete hain, process.argv command-line arguments ka array hai, aur global Node ka window jaisa hai (isse jodi gayi cheezein har jagah available hoti hain).",
        },
        dailyLifeExample:
          "REPL ek calculator jaisa hai — turant kuch type karo, turant result. node file.js poori recipe (script) ek saath follow karke pura dish banana hai. __dirname ek 'aap yahan hain' naksha jaisa hai jo hamesha batata hai file kis folder mein hai.",
        codeExample:
          '// info.js — run with: node info.js Alice 25\nconsole.log(__dirname);     // e.g. /Users/you/project\nconsole.log(__filename);    // e.g. /Users/you/project/info.js\nconsole.log(process.argv);  // [\'node\', \'.../info.js\', \'Alice\', \'25\']\nconsole.log(process.argv[2]); // "Alice" — first real CLI argument\n\nglobal.appName = "Learnverse"; // available anywhere in this process\n\n// In a terminal, typing just "node" opens the REPL:\n// > 2 + 2\n// 4\n// > .exit',
        keyPoints: [
          'node file.js runs a script top to bottom',
          'node with no arguments opens the interactive REPL',
          '__dirname / __filename give absolute folder/file paths',
          'process.argv is an array of CLI arguments (real args start at index 2)',
          'global is Node\'s equivalent of the browser\'s window object',
        ],
        quiz: [
          {
            question: 'What does typing just "node" (no filename) in the terminal open?',
            options: ['An error', 'The interactive REPL', 'A file browser', 'The npm registry'],
            correctIndex: 1,
          },
          {
            question: 'In process.argv, where do the actual arguments YOU passed typically start?',
            options: ['Index 0', 'Index 1', 'Index 2', 'The last index'],
            correctIndex: 2,
          },
          {
            question: 'What does __dirname give you?',
            options: ['The current time', 'The absolute path of the current folder', 'The Node version', 'A random number'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Modules: CommonJS vs ES Modules',
        difficulty: 'medium',
        tags: ['modules', 'commonjs', 'esm'],
        explanation: {
          english:
            'Node splits code into modules. The classic CommonJS system uses module.exports to expose values and require() to import them, loading synchronously at runtime. Node also supports ES Modules (import/export) in .mjs files or with "type":"module" in package.json — these are the JavaScript standard, support static analysis, and load asynchronously. You generally cannot require() an ESM module directly; mixing requires care.',
          hinglish:
            'Node code ko modules mein baant ta hai. Classic CommonJS system module.exports se values bahar deta hai aur require() se import, jo runtime pe synchronously load hota hai. Node ES Modules (import/export) bhi support karta hai .mjs files mein ya package.json mein "type":"module" ke saath — ye JavaScript ka standard hai, static analysis support karta hai, aur asynchronously load hota hai. Aam taur pe ESM ko seedha require() nahi kar sakte; dono mix karne mein care chahiye.',
        },
        dailyLifeExample:
          'Modules kitchen ke alag dabbe jaise hain — masala.js, chawal.js. require()/import se jo chahiye wo dabba khol lo, poori almari nahi.',
        codeExample:
          '// CommonJS — math.js\nfunction add(a, b) { return a + b; }\nmodule.exports = { add };\n\n// CommonJS — app.js\nconst { add } = require("./math");\nconsole.log(add(2, 3)); // 5\n\n// ES Modules — math.mjs\nexport function multiply(a, b) { return a * b; }\n\n// ES Modules — app.mjs\nimport { multiply } from "./math.mjs";\nconsole.log(multiply(2, 3)); // 6',
        keyPoints: [
          'CommonJS: module.exports + require(), synchronous',
          'ESM: import/export, static analysis, async loading',
          'Each file is its own module/scope',
          'Use .mjs or "type":"module" to opt into ESM',
        ],
        quiz: [
          {
            question: 'In CommonJS, you import with…',
            options: ['import', 'require()', 'include', 'use'],
            correctIndex: 1,
          },
          {
            question: 'Which loading style is synchronous?',
            options: ['ES Modules', 'CommonJS', 'Both async', 'Neither'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Difference between CommonJS and ES Modules in Node?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'CommonJS (require/module.exports) loads modules synchronously at runtime and is the historic Node default. ES Modules (import/export) are the JS standard, support static analysis and tree-shaking, and load asynchronously. In Node you opt into ESM with .mjs or "type":"module". You generally cannot require() an ESM module directly; interop needs dynamic import().',
              hinglish:
                'CommonJS (require/module.exports) modules ko runtime pe synchronously load karta hai aur Node ka historic default hai. ES Modules (import/export) JS standard hain, static analysis aur tree-shaking support karte hain, aur asynchronously load hote hain. Node mein ESM ke liye .mjs ya "type":"module" use karte ho. Aam taur pe ESM ko seedha require() nahi kar sakte; interop ke liye dynamic import() chahiye.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'npm & Tooling',
    level: 'beginner',
    description: 'Package manager, package.json, scripts, semver.',
    concepts: [
      {
        title: 'npm & package.json',
        difficulty: 'easy',
        tags: ['npm', 'packages'],
        explanation: {
          english:
            'npm is Node\'s package manager. package.json describes your project: name, version, scripts, and dependencies. npm install adds packages into node_modules and records exact versions in package-lock.json. Use dependencies for runtime needs and devDependencies for tooling (tests, build, linting).',
          hinglish:
            'npm Node ka package manager hai. package.json tumhare project ko describe karta hai: name, version, scripts, dependencies. npm install packages ko node_modules mein daal ta hai aur exact versions package-lock.json mein record karta hai. Runtime ke liye dependencies aur tooling (tests, build, linting) ke liye devDependencies use karo.',
        },
        dailyLifeExample:
          'npm ek app store jaisa hai aur package.json tumhari installed-apps list. npm install matlab list ke hisaab se sab apps wapas download kar lo, lock file matlab exact wahi version jo last baar kaam kiya tha.',
        codeExample:
          '// package.json\n{\n  "name": "my-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js",\n    "dev": "node --watch index.js",\n    "test": "node --test"\n  },\n  "dependencies": { "express": "^4.18.0" },\n  "devDependencies": { "eslint": "^9.0.0" }\n}\n// npm install   -> installs deps\n// npm start     -> runs the start script\n// npm run dev   -> runs a custom script',
        keyPoints: [
          'npm = Node package manager',
          'package.json describes the project',
          'npm install -> node_modules + package-lock.json',
          'dependencies (runtime) vs devDependencies (tooling)',
        ],
        quiz: [
          {
            question: 'Which file lists a project\'s dependencies and scripts?',
            options: ['node.json', 'package.json', 'config.js', 'npm.txt'],
            correctIndex: 1,
          },
          {
            question: 'devDependencies are for…',
            options: ['Runtime needs', 'Tooling (tests, build)', 'The OS', 'Nothing'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Semantic Versioning & package-lock.json',
        difficulty: 'medium',
        tags: ['npm', 'semver'],
        explanation: {
          english:
            'npm packages use semver: MAJOR.MINOR.PATCH. ^1.4.2 allows minor/patch updates (1.x.x, not 2.0.0); ~1.4.2 allows only patch updates (1.4.x). package-lock.json pins the exact resolved version tree so installs are reproducible across machines — always commit it.',
          hinglish:
            'npm packages semver use karte hain: MAJOR.MINOR.PATCH. ^1.4.2 minor/patch updates allow karta hai (1.x.x, 2.0.0 nahi); ~1.4.2 sirf patch updates allow karta hai (1.4.x). package-lock.json exact resolved version tree pin karta hai taaki installs sab machines pe reproducible hon — ise hamesha commit karo.',
        },
        dailyLifeExample:
          'Semver ek recipe ka version jaisa hai — MAJOR badle to recipe hi badal gayi (naye ingredients), MINOR mein naya item add hua but purana bhi chalta hai, PATCH matlab sirf typo fix.',
        codeExample:
          '// "express": "^4.18.0"  -> 4.x.x (not 5.0.0)\n// "express": "~4.18.0"  -> 4.18.x only\n// "express": "4.18.0"   -> exact version only\n\n// npm ci — installs exactly what package-lock.json says (CI/CD safe)',
        keyPoints: [
          'semver = MAJOR.MINOR.PATCH',
          '^ allows minor+patch, ~ allows patch only',
          'package-lock.json pins exact versions',
          'npm ci for reproducible CI installs',
        ],
        quiz: [
          {
            question: 'Which symbol allows minor and patch updates but not major?',
            options: ['~', '^', '*', '='],
            correctIndex: 1,
          },
          {
            question: 'Why commit package-lock.json?',
            options: ['It is required by Node', 'Reproducible installs across machines', 'It speeds up V8', 'No reason'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Core Built-in Modules',
    level: 'intermediate',
    description: 'fs, path, events aur buffers.',
    concepts: [
      {
        title: 'File System (fs)',
        difficulty: 'medium',
        tags: ['fs', 'core'],
        explanation: {
          english:
            'The fs module reads and writes files. Most methods come in async (callback or fs.promises) and sync (readFileSync) flavours. Prefer the async versions on servers so you do not block the event loop while disk I/O happens. fs.promises pairs naturally with async/await.',
          hinglish:
            'fs module files read aur write karta hai. Zyadatar methods async (callback ya fs.promises) aur sync (readFileSync) dono roop mein aate hain. Servers pe async versions prefer karo taaki disk I/O ke dauraan event loop block na ho. fs.promises async/await ke saath naturally fit hota hai.',
        },
        dailyLifeExample:
          'Sync fs ek hi clerk jaisa hai jo file laane jaaye to baaki sab line mein ruk jaayein. Async fs clerk ko bhejke baaki kaam karta rehta hai — file aa jaaye to handle karega.',
        codeExample:
          'const fs = require("fs/promises");\n\nasync function run() {\n  await fs.writeFile("note.txt", "Hello");\n  const data = await fs.readFile("note.txt", "utf8");\n  console.log(data); // Hello\n\n  const stats = await fs.stat("note.txt");\n  console.log("Size:", stats.size, "bytes");\n\n  await fs.appendFile("note.txt", "\\nMore text");\n  await fs.unlink("note.txt"); // delete\n}\nrun();',
        keyPoints: [
          'fs reads/writes files',
          'Async (promises/callbacks) vs sync versions',
          'Prefer async on servers (non-blocking)',
          'Pass encoding (utf8) to get a string instead of a Buffer',
        ],
        quiz: [
          {
            question: 'Why prefer async fs methods on a server?',
            options: ['They are shorter', 'They do not block the event loop', 'They are safer', 'No reason'],
            correctIndex: 1,
          },
          {
            question: 'Which reads a file synchronously?',
            options: ['readFile', 'readFileSync', 'fs.read()', 'open()'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'path & Cross-Platform File Paths',
        difficulty: 'easy',
        tags: ['path', 'core'],
        explanation: {
          english:
            'The path module builds and parses file paths in an OS-independent way (Windows uses \\, POSIX uses /). path.join() combines segments safely, path.resolve() returns an absolute path, and __dirname/import.meta.url give you the current file\'s directory.',
          hinglish:
            'path module file paths ko OS-independent tarike se banata/parse karta hai (Windows \\ use karta hai, POSIX /). path.join() segments ko safely jodta hai, path.resolve() absolute path deta hai, aur __dirname/import.meta.url current file ki directory deta hai.',
        },
        dailyLifeExample:
          'path module ek universal address translator jaisa hai — chahe pin code US format mein ho ya India format mein, ye sahi se jod ke ek valid address bana deta hai.',
        codeExample:
          'const path = require("path");\n\nconsole.log(path.join("/users", "abhi", "notes.txt")); // /users/abhi/notes.txt\nconsole.log(path.extname("notes.txt")); // .txt\nconsole.log(path.basename("/a/b/notes.txt")); // notes.txt\nconsole.log(path.dirname("/a/b/notes.txt")); // /a/b\nconsole.log(__dirname); // current file\'s folder (CommonJS)',
        keyPoints: [
          'OS-independent path building',
          'path.join() vs path.resolve()',
          'extname/basename/dirname helpers',
          '__dirname (CJS) or import.meta.url (ESM)',
        ],
        quiz: [
          {
            question: 'Which method safely joins path segments?',
            options: ['path.merge()', 'path.join()', 'path.add()', 'path.combine()'],
            correctIndex: 1,
          },
          {
            question: 'In ESM you get the current directory via…',
            options: ['__dirname', 'import.meta.url', 'process.cwd only', 'require.dirname'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Events & EventEmitter',
        difficulty: 'medium',
        tags: ['events', 'core'],
        explanation: {
          english:
            'Node is event-driven. The EventEmitter class lets objects emit named events and register listeners with .on(). Many core modules (streams, http servers) are EventEmitters. You call .emit("event", data) and any .on("event", handler) listeners run synchronously, in registration order. Use .once() for one-time listeners.',
          hinglish:
            'Node event-driven hai. EventEmitter class objects ko named events emit karne deti hai aur .on() se listeners register karne. Bahut core modules (streams, http servers) EventEmitters hain. Tum .emit("event", data) call karte ho aur saare .on("event", handler) listeners synchronously, registration order mein chal jaate hain. One-time listener ke liye .once() use karo.',
        },
        dailyLifeExample:
          'EventEmitter ek ghanti (bell) system jaisa hai — koi bell bajaye (emit), jisne sunne ke liye kaan laga rakhe (on) wo sab react karte hain. .once() ek baar sunke kaan band kar deta hai.',
        codeExample:
          'const EventEmitter = require("events");\nconst bus = new EventEmitter();\n\nbus.on("order", (id) => console.log("Order placed:", id));\nbus.once("order", () => console.log("First order bonus!"));\n\nbus.emit("order", 101); // both listeners fire\nbus.emit("order", 102); // only the first listener fires now',
        keyPoints: [
          'Node is event-driven',
          'EventEmitter: .on() to listen, .emit() to fire',
          '.once() for a one-time listener',
          'Streams & http servers are EventEmitters',
        ],
        quiz: [
          {
            question: 'Which method registers a listener?',
            options: ['.emit()', '.on()', '.fire()', '.send()'],
            correctIndex: 1,
          },
          {
            question: 'Which method fires a listener only once?',
            options: ['.on()', '.once()', '.emit()', '.single()'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Async Patterns & the Event Loop',
    level: 'intermediate',
    description: 'Callbacks, promises, async/await, streams, event loop internals.',
    concepts: [
      {
        title: 'Callbacks & Error-First Pattern',
        difficulty: 'medium',
        tags: ['async', 'callbacks'],
        explanation: {
          english:
            'Classic Node async APIs use callbacks following the error-first convention: the first argument is an error (or null), the rest is the result. Always check the error first. Deeply nested callbacks cause "callback hell", which promises and async/await solve.',
          hinglish:
            'Classic Node async APIs callbacks use karte hain error-first convention ke saath: pehla argument error (ya null) hota hai, baaki result. Hamesha error pehle check karo. Bahut nested callbacks "callback hell" bana dete hain, jise promises aur async/await solve karte hain.',
        },
        dailyLifeExample:
          'Error-first callback ek courier jaisa hai jo pehle batata hai "parcel khona to nahi" (error) phir parcel deta hai. Pehle problem check, phir saamaan.',
        codeExample:
          'const fs = require("fs");\nfs.readFile("file.txt", "utf8", (err, data) => {\n  if (err) return console.error("Failed:", err);\n  console.log(data);\n});\n\n// Nested callbacks -> "callback hell"\nfs.readFile("a.txt", "utf8", (err, a) => {\n  if (err) return;\n  fs.readFile("b.txt", "utf8", (err2, b) => {\n    if (err2) return;\n    console.log(a + b); // pyramid of doom grows with each step\n  });\n});',
        keyPoints: [
          'Error-first: (err, result) => {}',
          'Always handle err first',
          'Common in legacy Node APIs',
          'Nesting -> callback hell (use promises)',
        ],
        quiz: [
          {
            question: 'In an error-first callback, the first argument is…',
            options: ['the result', 'the error', 'a status code', 'nothing'],
            correctIndex: 1,
          },
          {
            question: 'Deeply nested callbacks are called…',
            options: ['callback heaven', 'callback hell', 'async/await', 'streams'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Promises & async/await in Node',
        difficulty: 'medium',
        tags: ['async', 'promises'],
        explanation: {
          english:
            'Modern Node APIs offer promise versions (e.g. fs/promises), and you can convert callback APIs with util.promisify. With async/await your asynchronous code reads top-to-bottom, and you handle errors with try/catch. Promise.all() runs independent async operations concurrently instead of one after another.',
          hinglish:
            'Modern Node APIs promise versions dete hain (jaise fs/promises), aur callback APIs ko util.promisify se convert kar sakte ho. async/await ke saath tumhara asynchronous code upar-se-neeche padha jaata hai, aur errors try/catch se handle karte ho. Promise.all() independent async operations ko ek-ek karke ke bajaye saath mein chalata hai.',
        },
        dailyLifeExample:
          'util.promisify ek purane manual gadget ko smart bana dena jaisa hai — wahi kaam, par ab modern async/await ke saath clean. Promise.all() ek saath kai courier bhejna jaisa hai, har ek apni dukaan se khareed kar laata hai, sabka wait ek hi baar mein.',
        codeExample:
          'const { promisify } = require("util");\nconst fs = require("fs");\nconst readFile = promisify(fs.readFile);\n\nasync function run() {\n  try {\n    const data = await readFile("file.txt", "utf8");\n    console.log(data);\n  } catch (e) { console.error(e); }\n}\n\n// Concurrent: fetch two files at once\nasync function loadBoth() {\n  const [a, b] = await Promise.all([\n    fs.promises.readFile("a.txt", "utf8"),\n    fs.promises.readFile("b.txt", "utf8"),\n  ]);\n  return a + b;\n}',
        keyPoints: [
          'Use fs/promises or util.promisify',
          'async/await reads like sync code',
          'Handle errors with try/catch',
          'Promise.all() for concurrent independent operations',
        ],
        quiz: [
          {
            question: 'util.promisify converts a callback API into…',
            options: ['a class', 'a promise-returning function', 'a stream', 'a string'],
            correctIndex: 1,
          },
          {
            question: 'Which runs multiple promises concurrently?',
            options: ['Promise.all()', 'await one by one', 'setTimeout', 'process.nextTick'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Streams & Buffers',
        difficulty: 'hard',
        tags: ['streams', 'buffers'],
        explanation: {
          english:
            'Streams process data in chunks instead of loading it all into memory — ideal for large files or network data. There are four types: Readable, Writable, Duplex, and Transform. A Buffer holds raw binary data. Pipe a readable stream into a writable one with .pipe() to move data efficiently (e.g. copy a huge file with low memory), and handle backpressure automatically.',
          hinglish:
            'Streams data ko chunks mein process karte hain bina sab memory mein load kiye — bade files ya network data ke liye ideal. Char types hote hain: Readable, Writable, Duplex, aur Transform. Buffer raw binary data rakhta hai. Readable stream ko writable mein .pipe() se daal kar data efficiently move karte ho (jaise huge file low memory mein copy), aur backpressure automatically handle hota hai.',
        },
        dailyLifeExample:
          'Stream ek paani ke pipe jaisa hai — tanki (file) ko ek baar mein nahi, thodi-thodi paani (chunks) behne deta hai. Pura tanki uthane (memory) ki zaroorat nahi. Transform stream ek filter jaisa hai jo paani ke beech mein lagta hai aur use clean karta jaata hai.',
        codeExample:
          'const fs = require("fs");\nconst zlib = require("zlib");\n\nconst read = fs.createReadStream("big.txt");\nconst gzip = zlib.createGzip(); // Transform stream\nconst write = fs.createWriteStream("big.txt.gz");\n\nread.pipe(gzip).pipe(write); // chunked, low memory, with compression\n\nwrite.on("finish", () => console.log("Done compressing!"));',
        keyPoints: [
          'Process data in chunks (low memory)',
          'Readable, Writable, Duplex, Transform streams',
          'Buffer = raw binary data',
          '.pipe() connects streams and handles backpressure',
        ],
        quiz: [
          {
            question: 'Streams help by processing data…',
            options: ['all at once', 'in chunks (low memory)', 'never', 'as strings only'],
            correctIndex: 1,
          },
          {
            question: 'Which stream type both reads and transforms data?',
            options: ['Readable', 'Writable', 'Transform', 'Duplex only'],
            correctIndex: 2,
          },
          {
            question: 'Why would fs.readFileSync("huge-5gb-video.mp4") likely crash a server, while a readable stream would not?',
            options: [
              'readFileSync only works on text files',
              'readFileSync loads the ENTIRE file into memory (RAM) at once, which can exceed available memory; a stream processes it in small chunks',
              'Streams are always faster for any file size',
              'There is no real difference',
            ],
            correctIndex: 1,
            explanation: 'readFileSync (and readFile) buffer the WHOLE file into memory before returning. A 5GB file can exceed available RAM and crash the process. Streaming reads/writes a small chunk at a time, keeping memory usage flat regardless of file size.',
          },
        ],
      },
      {
        title: 'The Node Event Loop (Phases & Microtasks)',
        difficulty: 'hard',
        tags: ['event-loop', 'internals'],
        explanation: {
          english:
            'Node\'s event loop (via libuv) lets a single thread handle many operations through phases: timers, pending callbacks, poll (I/O), check (setImmediate), and close callbacks. Microtasks — Promise callbacks and process.nextTick — run between every phase transition, with nextTick having even higher priority than promise microtasks. This explains ordering surprises between setTimeout, setImmediate, and Promise.then.',
          hinglish:
            'Node ka event loop (libuv se) ek single thread ko phases ke through bahut operations handle karne deta hai: timers, pending callbacks, poll (I/O), check (setImmediate), aur close callbacks. Microtasks — Promise callbacks aur process.nextTick — har phase transition ke beech chalte hain, aur nextTick promise microtasks se bhi zyada priority rakhta hai. Isse setTimeout, setImmediate, aur Promise.then ke beech ordering surprises samajh aate hain.',
        },
        dailyLifeExample:
          'Event loop ek akele waiter jaisa hai jo bahut tables sambhal ta hai — order leke kitchen ko de deta hai (async) aur free hote hi ready dishes serve karta hai, bina kisi ek table pe atke. nextTick us waiter ka VIP note jaisa hai jo wo har round ke turant baad sabse pehle dekh leta hai.',
        codeExample:
          'console.log("1");\nsetTimeout(() => console.log("2 timer"), 0);\nsetImmediate(() => console.log("2.5 immediate"));\nPromise.resolve().then(() => console.log("3 microtask"));\nprocess.nextTick(() => console.log("4 nextTick"));\nconsole.log("5");\n// Output: 1, 5, 4, 3, then 2/2.5 (order of timer vs immediate can vary)',
        keyPoints: [
          'Single thread handles many ops (libuv)',
          'Phases: timers -> pending -> poll -> check -> close',
          'Microtasks (nextTick, promises) run between phases',
          'nextTick has higher priority than promise microtasks',
        ],
        quiz: [
          {
            question: 'Node\'s event loop is powered by…',
            options: ['V8 only', 'libuv', 'the DOM', 'npm'],
            correctIndex: 1,
          },
          {
            question: 'Which runs with the highest priority?',
            options: ['setTimeout', 'setImmediate', 'process.nextTick', 'I/O callbacks'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'process & Environment Variables',
        difficulty: 'medium',
        tags: ['process', 'env'],
        explanation: {
          english:
            'The global process object exposes the running program: process.argv (CLI args), process.env (environment variables), process.exit(), process.cwd(), and events like exit/SIGINT. Use environment variables (often via a .env file with a loader like dotenv) for config and secrets so they are not hard-coded and can differ per environment (dev/staging/prod).',
          hinglish:
            'Global process object running program ko expose karta hai: process.argv (CLI args), process.env (environment variables), process.exit(), process.cwd(), aur exit/SIGINT jaise events. Config aur secrets ke liye environment variables use karo (aksar .env file aur dotenv jaise loader se) taaki wo hard-coded na hon aur har environment (dev/staging/prod) mein alag ho sakein.',
        },
        dailyLifeExample:
          'process.env ek settings panel jaisa hai jo bina code chhede badal sakte ho — dev mein ek setting, production mein doosri, code same. SIGINT sunna matlab jab koi Ctrl+C dabaye to gracefully band hona, light bujhane se pehle saamaan sambhal lena.',
        codeExample:
          'console.log(process.argv);         // CLI arguments\nconsole.log(process.env.NODE_ENV); // "development" / "production"\nif (!process.env.API_KEY) process.exit(1);\n\nprocess.on("SIGINT", () => {\n  console.log("Shutting down gracefully...");\n  process.exit(0);\n});',
        keyPoints: [
          'process = info about the running program',
          'process.env for environment variables',
          'process.argv for CLI arguments',
          'Handle SIGINT/SIGTERM for graceful shutdown',
        ],
        quiz: [
          {
            question: 'Where do you read environment variables?',
            options: ['process.argv', 'process.env', 'process.exit', 'require'],
            correctIndex: 1,
          },
          {
            question: 'Which signal is sent when a user presses Ctrl+C?',
            options: ['SIGTERM', 'SIGINT', 'SIGKILL', 'SIGHUP'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between process.nextTick, setImmediate, and setTimeout(fn, 0)?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'process.nextTick callbacks run immediately after the current operation completes, before the event loop proceeds to any phase — they have the highest priority. setTimeout(fn, 0) queues a callback in the timers phase, run after at least the specified delay (clamped to ~1ms). setImmediate queues a callback in the check phase, which runs after I/O callbacks in the current loop iteration. So ordering is roughly: nextTick > promise microtasks > timers/setImmediate (whose relative order depends on context — inside an I/O callback, setImmediate always fires before setTimeout(fn,0)).',
              hinglish:
                'process.nextTick callbacks current operation complete hone ke turant baad chalte hain, event loop kisi bhi phase mein jaane se pehle — inki priority sabse zyada hoti hai. setTimeout(fn, 0) timers phase mein callback queue karta hai, jo kam-se-kam specified delay (~1ms tak clamp) ke baad chalta hai. setImmediate check phase mein callback queue karta hai, jo current loop iteration mein I/O callbacks ke baad chalta hai. To ordering roughly: nextTick > promise microtasks > timers/setImmediate (jiska relative order context pe depend karta hai — I/O callback ke andar, setImmediate hamesha setTimeout(fn,0) se pehle fire hota hai).',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'HTTP & Networking',
    level: 'intermediate',
    description: 'Built-in HTTP server, child processes, networking basics.',
    concepts: [
      {
        title: 'Creating an HTTP Server',
        difficulty: 'medium',
        tags: ['http', 'server'],
        explanation: {
          english:
            'The built-in http module can create a web server without any framework. http.createServer takes a handler (req, res) and you call server.listen(port). req is a Readable stream giving you method/url/headers; res is a Writable stream you write the response to. Frameworks like Express build on top of this to add routing and middleware conveniently.',
          hinglish:
            'Built-in http module bina kisi framework ke web server bana sakta hai. http.createServer ek handler (req, res) leta hai aur tum server.listen(port) call karte ho. req ek Readable stream hai jo method/url/headers deta hai; res ek Writable stream hai jisme response likhte ho. Express jaise frameworks isi ke upar routing aur middleware aasaani se add karne ke liye bante hain.',
        },
        dailyLifeExample:
          'http module se server banana ek dukaan khud haath se chalane jaisa hai — har customer (request) ko khud handle karo, manually order le ke samaan do. Express ek POS system de deta hai jo kaam aasaan kar de.',
        codeExample:
          'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  if (req.url === "/" && req.method === "GET") {\n    res.writeHead(200, { "Content-Type": "application/json" });\n    res.end(JSON.stringify({ message: "Hello" }));\n  } else {\n    res.writeHead(404, { "Content-Type": "text/plain" });\n    res.end("Not Found");\n  }\n});\n\nserver.listen(3000, () => console.log("Listening on :3000"));',
        keyPoints: [
          'http.createServer((req, res) => {})',
          'server.listen(port) starts it',
          'req is Readable, res is Writable',
          'Express builds on top of http',
        ],
        quiz: [
          {
            question: 'Which built-in module creates a server?',
            options: ['fs', 'http', 'path', 'os'],
            correctIndex: 1,
          },
          {
            question: 'Which method starts the server listening?',
            options: ['server.start()', 'server.listen(port)', 'server.run()', 'server.open()'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'WebSockets: Real-Time Communication',
        difficulty: 'medium',
        tags: ['websockets', 'realtime'],
        explanation: {
          english:
            "Regular HTTP is request-response: the client always asks first, the server can only reply. That does not work for live chat, notifications, or multiplayer games, where the SERVER also needs to push data instantly. A WebSocket starts as a normal HTTP request that 'upgrades' into a persistent, two-way connection — both client and server can send messages at any time, with far less overhead than repeatedly polling the server. Libraries like ws or Socket.IO make this easy in Node.",
          hinglish:
            "Normal HTTP request-response hota hai: client hamesha pehle poochta hai, server sirf jawab de sakta hai. Ye live chat, notifications, ya multiplayer games ke liye kaam nahi karta, jaha SERVER ko bhi turant data push karna hota hai. WebSocket ek normal HTTP request ki tarah shuru hoti hai jo 'upgrade' hoke ek persistent, two-way connection ban jaati hai — client aur server dono kabhi bhi message bhej sakte hain, baar-baar server ko poochne (polling) se kaafi kam overhead ke saath. Node mein ws ya Socket.IO jaisi libraries ye aasan bana deti hain.",
        },
        dailyLifeExample:
          'HTTP ek chitthi bhejna hai — tumne likha, post kiya, jawab ka wait karo. WebSocket ek phone call jaisa hai — connection ek baar lagta hai, phir dono taraf se koi bhi kabhi bhi bol sakta hai, bina baar-baar dial kiye.',
        codeExample:
          "const { WebSocketServer } = require('ws');\nconst wss = new WebSocketServer({ port: 8080 });\n\nwss.on('connection', (socket) => {\n  console.log('Client connected');\n\n  socket.on('message', (data) => {\n    console.log('Received:', data.toString());\n    // broadcast to everyone, including the sender\n    wss.clients.forEach((client) => client.send(`Echo: ${data}`));\n  });\n\n  socket.send('Welcome!'); // server pushes a message immediately\n});",
        keyPoints: [
          'HTTP: client always initiates; server can only respond',
          'WebSocket: a persistent, two-way connection after an initial HTTP "upgrade"',
          'Either side (client OR server) can send a message at any time',
          'Far more efficient than polling the server repeatedly for updates',
          'Common uses: chat apps, live notifications, multiplayer games, live dashboards',
        ],
        quiz: [
          {
            question: 'What is the key limitation of plain HTTP that WebSockets solve?',
            options: ['HTTP is too fast', 'The server cannot push data to the client without the client asking first', 'HTTP cannot send JSON', 'HTTP only works on port 80'],
            correctIndex: 1,
          },
          {
            question: 'How does a WebSocket connection begin?',
            options: ['As a completely separate protocol from HTTP', 'As a normal HTTP request that upgrades into a persistent connection', 'It requires a special browser plugin', 'It cannot begin from a browser'],
            correctIndex: 1,
          },
          {
            question: 'Which of these is a typical WebSocket use case?',
            options: ['A static blog page', 'A live chat application', 'A one-time file download', 'A CSS stylesheet'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Child Processes',
        difficulty: 'hard',
        tags: ['child_process', 'core'],
        explanation: {
          english:
            'The child_process module lets Node run other programs or scripts in separate OS processes. exec() runs a shell command and buffers output (good for short commands); spawn() streams output and is better for long-running or large-output processes; fork() spawns a new Node.js process with an IPC channel, useful for offloading CPU-heavy JS work without blocking the main event loop.',
          hinglish:
            'child_process module Node ko alag OS processes mein doosre programs ya scripts chalane deta hai. exec() ek shell command chalata hai aur output buffer karta hai (chhoti commands ke liye accha); spawn() output stream karta hai aur lambi ya bade-output processes ke liye behtar hai; fork() ek naya Node.js process banata hai IPC channel ke saath, jo CPU-heavy JS kaam ko main event loop block kiye bina offload karne ke liye useful hai.',
        },
        dailyLifeExample:
          'child_process ek bade restaurant jaisa hai jo bhaari kaam (CPU-heavy) ko ek alag kitchen branch (separate process) mein bhej deta hai, jabki main counter (event loop) customers ko serve karta rehta hai bina ruke.',
        codeExample:
          'const { spawn, fork } = require("child_process");\n\n// spawn: stream output of a long-running command\nconst ls = spawn("ls", ["-la"]);\nls.stdout.on("data", (data) => console.log(`stdout: ${data}`));\n\n// fork: a separate Node process for CPU-heavy work\n// main.js\nconst worker = fork("./heavy-task.js");\nworker.send({ num: 40 });\nworker.on("message", (result) => console.log("Fib result:", result));',
        keyPoints: [
          'exec(): buffered output, short shell commands',
          'spawn(): streamed output, long-running processes',
          'fork(): new Node process + IPC, offload CPU work',
          'Keeps the main event loop free of heavy work',
        ],
        quiz: [
          {
            question: 'Which method spawns a new Node.js process with an IPC channel?',
            options: ['exec()', 'spawn()', 'fork()', 'execFile()'],
            correctIndex: 2,
          },
          {
            question: 'Which is better for a command with large/streaming output?',
            options: ['exec()', 'spawn()', 'fork()', 'require()'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you use worker_threads vs child_process.fork() vs the cluster module?',
            difficulty: 'hard',
            frequency: 'rare',
            answer: {
              english:
                'worker_threads run in the same process with shared memory (SharedArrayBuffer) and are lightest-weight — best for CPU-bound JS computations that need to share data efficiently. child_process.fork() spawns a full separate Node process with IPC (message passing, no shared memory) — good for isolating risky/crash-prone work or running different code. The cluster module forks multiple full Node processes that all share the same server port (via the OS) to use multiple CPU cores for handling more concurrent requests — it is about horizontal scaling of a server, not just running one computation.',
              hinglish:
                'worker_threads same process mein chalte hain shared memory (SharedArrayBuffer) ke saath aur sabse lightweight hain — CPU-bound JS computations ke liye best jinhe data efficiently share karna ho. child_process.fork() ek poora alag Node process banata hai IPC (message passing, shared memory nahi) ke saath — risky/crash-prone kaam isolate karne ya alag code chalane ke liye accha. cluster module multiple poore Node processes fork karta hai jo sab same server port share karte hain (OS ke through) taaki zyada concurrent requests handle karne ke liye multiple CPU cores use ho sakein — ye ek server ko horizontally scale karne ke baare mein hai, sirf ek computation chalane ke baare mein nahi.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Scaling & Performance',
    level: 'advanced',
    description: 'Clustering, worker threads, memory aur performance tuning.',
    concepts: [
      {
        title: 'The cluster Module',
        difficulty: 'hard',
        tags: ['cluster', 'scaling'],
        explanation: {
          english:
            'Node by default uses a single core. The cluster module forks multiple worker processes (typically one per CPU core) that all listen on the same port; the OS load-balances incoming connections across them. Each worker has its own event loop and memory, so a crash in one does not take down the whole server. This is a simple way to use all CPU cores for a Node HTTP server.',
          hinglish:
            'Node by default sirf ek core use karta hai. cluster module multiple worker processes fork karta hai (typically ek per CPU core) jo sab same port pe listen karte hain; OS incoming connections ko unke beech load-balance karta hai. Har worker ka apna event loop aur memory hota hai, isliye ek worker crash hone se poora server nahi girta. Ye Node HTTP server ke sabhi CPU cores use karne ka simple tareeka hai.',
        },
        dailyLifeExample:
          'cluster module ek dukaan ki kai branches kholne jaisa hai (ek per CPU core), sab same brand naam (port) ke neeche, aur grahak alag-alag branch mein bhej diye jaate hain. Ek branch band ho jaaye to baaki branches chalte rehte hain.',
        codeExample:
          'const cluster = require("cluster");\nconst os = require("os");\nconst http = require("http");\n\nif (cluster.isPrimary) {\n  const cpuCount = os.cpus().length;\n  for (let i = 0; i < cpuCount; i++) cluster.fork();\n\n  cluster.on("exit", (worker) => {\n    console.log(`Worker ${worker.process.pid} died, restarting...`);\n    cluster.fork();\n  });\n} else {\n  http.createServer((req, res) => res.end("Hello from worker")).listen(3000);\n}',
        keyPoints: [
          'Forks one worker process per CPU core',
          'All workers share the same port (OS load balances)',
          'Each worker: own event loop and memory',
          'A crashed worker can be restarted without downtime',
        ],
        quiz: [
          {
            question: 'Why use the cluster module?',
            options: ['To use multiple CPU cores', 'To reduce code size', 'To avoid using npm', 'To remove the event loop'],
            correctIndex: 0,
          },
          {
            question: 'What happens when one cluster worker crashes?',
            options: ['The whole server crashes', 'Other workers keep serving requests', 'Node exits permanently', 'Nothing changes'],
            correctIndex: 1,
          },
          {
            question: 'A common cluster mistake: you store a login count in a plain in-memory variable (let count = 0) inside your server. Why does the count look wrong/inconsistent under cluster?',
            options: [
              'cluster is broken',
              'Each worker process has its OWN separate memory — the variable is not shared, so each worker has a different count',
              'Variables reset every request',
              'Only the primary process can use variables',
            ],
            correctIndex: 1,
            explanation: 'Cluster workers are separate OS processes with separate memory — nothing is automatically shared between them. For counters, sessions, or any shared state, you need an external store (Redis, a database) that all workers can read/write.',
          },
        ],
      },
      {
        title: 'Worker Threads',
        difficulty: 'hard',
        tags: ['worker_threads', 'performance'],
        explanation: {
          english:
            'worker_threads allow running JavaScript in parallel threads within the same process, sharing memory via SharedArrayBuffer/MessagePort when needed. Unlike cluster (separate processes for scaling servers), worker threads are best for offloading a single CPU-intensive task (e.g. image resizing, heavy computation) without blocking the main thread\'s event loop.',
          hinglish:
            'worker_threads same process ke andar parallel threads mein JavaScript chalane dete hain, zaroorat pe SharedArrayBuffer/MessagePort se memory share karte hain. cluster (servers scale karne ke liye separate processes) ke ulta, worker threads ek single CPU-intensive task (jaise image resizing, heavy computation) ko offload karne ke liye best hain bina main thread ka event loop block kiye.',
        },
        dailyLifeExample:
          'Worker thread ek helper jaisa hai jo same office (process) mein baith ke alag table pe bhaari calculation karta hai, jabki main reception (main thread) customers attend karta rehta hai.',
        codeExample:
          '// main.js\nconst { Worker } = require("worker_threads");\nconst worker = new Worker("./fib-worker.js", { workerData: { n: 40 } });\nworker.on("message", (result) => console.log("Result:", result));\n\n// fib-worker.js\nconst { workerData, parentPort } = require("worker_threads");\nfunction fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }\nparentPort.postMessage(fib(workerData.n));',
        keyPoints: [
          'Parallel JS execution within one process',
          'Can share memory (SharedArrayBuffer)',
          'Best for one heavy CPU-bound task',
          'Different from cluster (multi-process server scaling)',
        ],
        quiz: [
          {
            question: 'worker_threads are best suited for…',
            options: ['Scaling an HTTP server across cores', 'Offloading one CPU-heavy task', 'Reading files', 'Routing HTTP requests'],
            correctIndex: 1,
          },
          {
            question: 'What can worker_threads share that separate processes cannot easily?',
            options: ['Environment variables', 'Memory (SharedArrayBuffer)', 'The file system', 'npm packages'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Memory Leaks & Performance Profiling',
        difficulty: 'hard',
        tags: ['performance', 'memory'],
        explanation: {
          english:
            'Common Node memory leaks come from: forgotten timers/intervals, growing caches with no eviction, event listeners that are added but never removed, and closures holding references to large objects. Use --inspect with Chrome DevTools or `node --prof` to profile CPU and heap usage in production-like conditions, and watch process.memoryUsage() over time to catch leaks early.',
          hinglish:
            'Common Node memory leaks aate hain: bhoole hue timers/intervals se, bina eviction badhte caches se, event listeners jo add kiye gaye par kabhi remove nahi hue, aur closures jo bade objects ko reference pakde rehte hain. --inspect ke saath Chrome DevTools ya `node --prof` use karo CPU aur heap usage profile karne ke liye production-jaisi conditions mein, aur process.memoryUsage() ko time ke saath dekho leaks early catch karne ke liye.',
        },
        dailyLifeExample:
          'Memory leak ek tap jisse paani dhire-dhire bahta rahe (chhota leak) — turant nazar nahi aata, par lambe time mein ghar (server) mein paani bhar jaata hai (OOM crash). Listeners jo kabhi remove nahi hote, un taps jaisa hai jo kabhi band nahi kiye gaye.',
        codeExample:
          '// Leak: interval never cleared\nfunction startPolling() {\n  setInterval(() => fetchData(), 1000); // never cleared -> leaks if called repeatedly\n}\n\n// Fix: keep a reference and clear it\nconst id = setInterval(() => fetchData(), 1000);\nclearInterval(id);\n\n// Watch memory over time\nsetInterval(() => {\n  const mem = process.memoryUsage();\n  console.log(`Heap used: ${(mem.heapUsed / 1024 / 1024).toFixed(1)} MB`);\n}, 5000);',
        keyPoints: [
          'Common leaks: timers, unbounded caches, dangling listeners',
          'Always pair addEventListener/on() with cleanup',
          'Profile with --inspect (DevTools) or --prof',
          'Monitor process.memoryUsage() in production',
        ],
        quiz: [
          {
            question: 'Which is a common cause of Node memory leaks?',
            options: ['Using const', 'Event listeners never removed', 'Using async/await', 'Using npm'],
            correctIndex: 1,
          },
          {
            question: 'Which gives you current heap/memory stats?',
            options: ['process.argv', 'process.memoryUsage()', 'process.env', 'os.cpus()'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Security & Production',
    level: 'advanced',
    description: 'Error handling, security hardening, production readiness.',
    concepts: [
      {
        title: 'Error Handling & Graceful Shutdown',
        difficulty: 'hard',
        tags: ['errors', 'best-practices'],
        explanation: {
          english:
            'Handle errors at the right layer: try/catch around await, .catch() on promises, and check err in callbacks. For servers, use a central error handler and never let the process crash silently. Listen for uncaughtException and unhandledRejection to log fatal errors, but treat them as last resorts — log, close server connections gracefully, then exit so a process manager (PM2, systemd, Kubernetes) can restart cleanly.',
          hinglish:
            'Errors ko sahi layer pe handle karo: await ke around try/catch, promises pe .catch(), aur callbacks mein err check. Servers ke liye ek central error handler use karo aur process ko chup-chaap crash mat hone do. Fatal errors log karne ke liye uncaughtException aur unhandledRejection sunno, par inhe last resort maano — log karo, server connections gracefully band karo, phir exit karo taaki process manager (PM2, systemd, Kubernetes) cleanly restart kar sake.',
        },
        dailyLifeExample:
          'Error handling ek factory ke safety system jaisa hai — har machine pe local guard (try/catch) aur ek central alarm (global handler). Bina iske ek galti poori factory band kar de. Graceful shutdown matlab alarm bajne pe sab kaam rok ke, machines properly band karna, na ki bijli kaat dena.',
        codeExample:
          'const server = http.createServer(app);\nserver.listen(3000);\n\nprocess.on("unhandledRejection", (reason) => {\n  console.error("Unhandled rejection:", reason);\n  shutdown(1);\n});\n\nprocess.on("SIGTERM", () => shutdown(0));\n\nfunction shutdown(code) {\n  server.close(() => {\n    console.log("Server closed gracefully");\n    process.exit(code);\n  });\n}',
        keyPoints: [
          'try/catch for await, .catch() for promises',
          'Check err in callbacks',
          'Central handler for servers',
          'Graceful shutdown: close server, then exit',
        ],
        quiz: [
          {
            question: 'How do you handle errors from await?',
            options: ['.catch()', 'try/catch', 'if(err)', 'ignore them'],
            correctIndex: 1,
          },
          {
            question: 'On unhandledRejection, the recommended approach is to…',
            options: ['ignore and continue', 'log and gracefully exit (let a process manager restart)', 'retry forever', 'crash immediately with no logging'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Custom Error Classes & Operational vs Programmer Errors',
        difficulty: 'hard',
        tags: ['errors', 'best-practices'],
        explanation: {
          english:
            "Throwing plain strings or generic Error() loses information. Create custom error classes (extending Error) with a name, a status code, and an isOperational flag, so different failures can be handled differently. This also clarifies a key distinction: operational errors are expected problems you can recover from (invalid input, a 404, a failed network call) — handle them gracefully. Programmer errors are actual bugs (calling undefined, a typo, wrong argument types) — these should crash loudly (in dev) or be logged and fixed, not silently caught and hidden.",
          hinglish:
            "Plain strings ya generic Error() throw karne se information kho jaati hai. Custom error classes banao (Error ko extend karke) jinme name, status code, aur isOperational flag ho, taaki alag failures ko alag tarike se handle kar sako. Isse ek zaroori farq bhi clear hota hai: operational errors wo expected problems hain jinse recover ho sakta hai (galat input, ek 404, fail hui network call) — inhe gracefully handle karo. Programmer errors asli bugs hain (undefined ko call karna, typo, galat argument types) — inhe zor se crash hona chahiye (dev mein) ya log karke fix karna chahiye, chup-chaap catch karke chhupana nahi.",
        },
        dailyLifeExample:
          'Operational error ek dukaan mein "ye item stock mein nahi hai" jaisa hai — normal, expected, gracefully handle karo ("sorry, out of stock"). Programmer error ek cashier ka calculation formula hi galat hona jaisa hai — ye ek asli bug hai jo turant fix hona chahiye, uska "sorry" bolke chhupa dena galat hai.',
        codeExample:
          "class AppError extends Error {\n  constructor(message, statusCode, isOperational = true) {\n    super(message);\n    this.name = this.constructor.name;\n    this.statusCode = statusCode;\n    this.isOperational = isOperational; // expected vs a real bug\n    Error.captureStackTrace(this, this.constructor);\n  }\n}\nclass NotFoundError extends AppError {\n  constructor(resource) {\n    super(`${resource} not found`, 404); // operational: expected, recoverable\n  }\n}\n\n// usage\nif (!user) throw new NotFoundError('User');\n\n// central handler can now branch on the error type\napp.use((err, req, res, next) => {\n  if (err.isOperational) return res.status(err.statusCode).json({ error: err.message });\n  console.error('BUG:', err); // programmer error — log it, do not silently swallow it\n  res.status(500).json({ error: 'Something went wrong' });\n});",
        keyPoints: [
          'Custom error classes (extends Error) carry structured info: name, statusCode, isOperational',
          'Operational errors: expected, recoverable failures (bad input, 404, network timeout)',
          'Programmer errors: actual bugs (undefined calls, typos, wrong types) — should not be silently caught',
          'A central error handler can branch on error type to respond appropriately',
          'Error.captureStackTrace keeps a clean stack trace pointing to where the error was created',
        ],
        quiz: [
          {
            question: 'What is the key difference between an operational error and a programmer error?',
            options: [
              'There is no real difference',
              'Operational errors are expected/recoverable (bad input, 404); programmer errors are actual bugs that should not be silently hidden',
              'Programmer errors are always less serious',
              'Operational errors only happen in production',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why create a custom error class instead of throwing new Error("message") everywhere?',
            options: ['It runs faster', 'It lets you attach structured info (statusCode, isOperational) so a central handler can respond appropriately per error type', 'JavaScript requires it', 'It removes the need for try/catch'],
            correctIndex: 1,
          },
          {
            question: 'What should generally happen to a true programmer error (e.g. calling a method on undefined)?',
            options: ['Silently catch it and continue as if nothing happened', 'Let it be logged/surfaced loudly so it gets fixed, not hidden behind a generic error message', 'Always retry the operation automatically', 'Ignore it in production only'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Security Hardening',
        difficulty: 'hard',
        tags: ['security', 'best-practices'],
        explanation: {
          english:
            'Production Node apps should: validate/sanitize all user input (avoid injection), never log secrets, set security headers (e.g. via helmet in Express), keep dependencies updated (npm audit), rate-limit endpoints to prevent abuse, run as a non-root user, and avoid eval()/Function() on untrusted input. Use environment variables for secrets, never commit them.',
          hinglish:
            'Production Node apps ko: saara user input validate/sanitize karna chahiye (injection se bachne ke liye), secrets kabhi log nahi karna chahiye, security headers set karo (jaise Express mein helmet se), dependencies update rakho (npm audit), abuse rokne ke liye endpoints rate-limit karo, non-root user se run karo, aur untrusted input pe eval()/Function() avoid karo. Secrets ke liye environment variables use karo, kabhi commit mat karo.',
        },
        dailyLifeExample:
          'Security hardening ghar ki suraksha jaisi hai — darwaza lock (input validation), CCTV (logging without secrets), guard (rate limiting), aur har kisi ko master-key na dena (non-root user, least privilege).',
        codeExample:
          'const express = require("express");\nconst helmet = require("helmet");\nconst rateLimit = require("express-rate-limit");\n\nconst app = express();\napp.use(helmet()); // sets secure HTTP headers\napp.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 req / 15 min\n\n// Never do this with untrusted input:\n// eval(userInput);  -- code injection risk\n\n// npm audit                -> check for known vulnerabilities\n// npm audit fix             -> auto-fix where possible',
        keyPoints: [
          'Validate/sanitize all user input',
          'Use helmet for security headers, rate-limit endpoints',
          'Never log secrets; keep them in env vars',
          'Run npm audit regularly; avoid eval() on untrusted input',
        ],
        quiz: [
          {
            question: 'Which package commonly sets secure HTTP headers in Express?',
            options: ['helmet', 'lodash', 'moment', 'nodemon'],
            correctIndex: 0,
          },
          {
            question: 'Why avoid eval() on untrusted input?',
            options: ['It is slower', 'It risks code injection', 'It uses more memory', 'It is deprecated'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you prevent a Node.js server from crashing due to one bad request, while still detecting real bugs?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Wrap request handling in try/catch (or use an async-error-catching middleware in Express) so a single bad request returns a 4xx/5xx response instead of throwing uncaught. Validate input early (schema validation) to reject bad requests before they reach business logic. Keep a global uncaughtException/unhandledRejection handler as a safety net that logs the error with full context and then triggers a graceful shutdown + restart via a process manager — never silently continue after a truly unexpected error, since the process may be in a corrupted state.',
              hinglish:
                'Request handling ko try/catch mein wrap karo (ya Express mein async-error-catching middleware use karo) taaki ek bad request 4xx/5xx response de, throw karke crash na kare. Input ko early validate karo (schema validation) taaki bad requests business logic tak pahunche hi nahi. Global uncaughtException/unhandledRejection handler ek safety net ke roop mein rakho jo error ko full context ke saath log kare aur phir process manager ke through graceful shutdown + restart trigger kare — kisi truly unexpected error ke baad silently continue mat karo, kyunki process corrupted state mein ho sakta hai.',
            },
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'Is Node.js single-threaded or multi-threaded?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Node runs your JavaScript on a single main thread with an event loop, but it is not purely single-threaded: libuv maintains a thread pool for some I/O (file system, DNS, crypto), and you can spawn worker threads or child processes for CPU-heavy work. So JS execution is single-threaded, while I/O and offloaded tasks use multiple threads under the hood.',
      hinglish:
        'Node tumhari JavaScript ko ek single main thread pe event loop ke saath chalata hai, par ye purely single-threaded nahi: libuv kuch I/O (file system, DNS, crypto) ke liye thread pool rakhta hai, aur CPU-heavy kaam ke liye worker threads ya child processes bana sakte ho. To JS execution single-threaded hai, jabki I/O aur offloaded tasks andar se multiple threads use karte hain.',
    },
  },
  {
    question: 'What is the difference between process.nextTick and setImmediate?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'process.nextTick callbacks run immediately after the current operation, before the event loop continues (and before other microtasks/promises in practice are drained). setImmediate runs on the next iteration of the event loop, in the check phase, after I/O callbacks. nextTick can starve the loop if overused; setImmediate is safer for yielding.',
      hinglish:
        'process.nextTick callbacks current operation ke turant baad chalte hain, event loop aage badhne se pehle. setImmediate event loop ke agle iteration mein, check phase mein, I/O callbacks ke baad chalta hai. nextTick zyada use karne se loop starve ho sakta hai; yield karne ke liye setImmediate safer hai.',
    },
  },
  {
    question: 'What is the purpose of the cluster module, and how does it differ from worker_threads?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'cluster forks multiple full Node.js processes that share one server port, letting an app use all CPU cores to handle more concurrent connections — each worker has fully isolated memory. worker_threads run multiple threads inside a single process and can share memory directly, making them better suited to splitting one CPU-heavy computation rather than scaling a whole server.',
      hinglish:
        'cluster multiple poore Node.js processes fork karta hai jo ek server port share karte hain, isse app saare CPU cores use kar sakta hai zyada concurrent connections handle karne ke liye — har worker ki memory fully isolated hoti hai. worker_threads ek single process ke andar multiple threads chalate hain aur memory directly share kar sakte hain, isliye ye ek CPU-heavy computation ko split karne ke liye behtar suited hain, poore server ko scale karne ke bajaye.',
    },
  },
  {
    question: 'How does Node.js handle CPU-bound vs I/O-bound tasks differently?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'I/O-bound tasks (network calls, file reads, DB queries) are delegated to the OS/libuv thread pool; the main JS thread registers a callback and moves on to handle other work, picking up the result later via the event loop. CPU-bound tasks (heavy loops, encryption, image processing) run synchronously on the main thread and block the event loop — nothing else can be processed until they finish, so they should be offloaded to worker_threads, child processes, or external services.',
      hinglish:
        'I/O-bound tasks (network calls, file reads, DB queries) OS/libuv thread pool ko delegate ho jaate hain; main JS thread ek callback register karke aage ka kaam karne lagta hai, result baad mein event loop ke through utha leta hai. CPU-bound tasks (heavy loops, encryption, image processing) main thread pe synchronously chalte hain aur event loop ko block kar dete hain — jab tak wo khatam na ho, kuch aur process nahi ho sakta, isliye unhe worker_threads, child processes, ya external services ko offload karna chahiye.',
    },
  },
  {
    question: 'What is memory leak risk in long-running Node servers and how do you detect it?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Long-running servers can leak memory through forgotten timers, unbounded in-memory caches, event listeners added repeatedly without removal, and closures retaining references to large objects. You detect this by monitoring process.memoryUsage() (especially heapUsed) over time in production, taking heap snapshots with --inspect/Chrome DevTools when memory trends upward, and comparing snapshots to find growing object counts.',
      hinglish:
        'Long-running servers mein memory leak ho sakta hai bhoole hue timers se, unbounded in-memory caches se, baar-baar add hote event listeners se jo remove nahi hote, aur closures se jo bade objects ko reference pakde rehte hain. Ise detect karte ho process.memoryUsage() (especially heapUsed) ko production mein time ke saath monitor karke, --inspect/Chrome DevTools se heap snapshots leke jab memory upward trend kare, aur snapshots compare karke growing object counts dhoondh ke.',
    },
  },
  {
    question: 'Why might you choose Express/Fastify over the raw http module?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The raw http module requires you to manually parse URLs, query strings, request bodies, and write your own routing logic. Frameworks like Express/Fastify provide declarative routing, middleware pipelines (auth, logging, body parsing, error handling), and a large ecosystem of plugins, which dramatically reduces boilerplate and lets you focus on business logic.',
      hinglish:
        'Raw http module mein tumhe manually URLs, query strings, request bodies parse karne hote hain aur apni routing logic likhni hoti hai. Express/Fastify jaise frameworks declarative routing dete hain, middleware pipelines (auth, logging, body parsing, error handling), aur plugins ka bada ecosystem, jisse boilerplate kaafi kam ho jaata hai aur tum business logic pe focus kar sakte ho.',
    },
  },
  {
    question: 'How do you securely manage secrets and configuration in a Node.js app?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Never hard-code secrets in source code. Store them in environment variables (loaded via a .env file locally with dotenv, and via the platform\'s secret manager — Vercel/AWS Secrets Manager/Kubernetes secrets — in production). Add .env to .gitignore, rotate secrets periodically, and use least-privilege credentials per environment (dev/staging/prod).',
      hinglish:
        'Secrets ko kabhi source code mein hard-code mat karo. Unhe environment variables mein store karo (locally .env file aur dotenv se load, aur production mein platform ke secret manager se — Vercel/AWS Secrets Manager/Kubernetes secrets). .env ko .gitignore mein daalo, secrets ko periodically rotate karo, aur har environment (dev/staging/prod) ke liye least-privilege credentials use karo.',
    },
  },
  {
    question: 'What is backpressure in Node streams and why does it matter?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Backpressure happens when a writable stream cannot consume data as fast as a readable stream produces it. If ignored, data piles up in memory and can crash the process. .pipe() handles backpressure automatically by pausing the readable stream when the writable\'s internal buffer is full, and resuming it once drained. When manually writing to streams, you must check the return value of .write() and listen for the "drain" event before writing more.',
      hinglish:
        'Backpressure tab hota hai jab writable stream data ko utni fast consume nahi kar sakta jitna readable stream produce kar raha hai. Agar ignore kiya jaaye, data memory mein dher ho jaata hai aur process crash ho sakta hai. .pipe() backpressure ko automatically handle karta hai readable stream ko pause karke jab writable ka internal buffer full ho, aur drain hone pe resume karke. Manually streams mein likhte waqt, .write() ka return value check karna padta hai aur "drain" event ka wait karna padta hai zyada likhne se pehle.',
    },
  },

  // ─── Node.js Basics ───────────────────────────────────────────
  {
    question: 'What is Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Node.js is a JavaScript runtime built on Google Chrome\'s V8 engine that lets JavaScript run OUTSIDE the browser — on servers, CLIs, and desktop apps. Before Node (2009), JS could only run in a browser tab. Node adds APIs a browser doesn\'t have (file system access, TCP servers, process control) while removing browser-only APIs (DOM, window). It uses a single-threaded, event-driven, non-blocking I/O model, making it well-suited for building fast, scalable network applications.',
      hinglish:
        'Node.js ek JavaScript runtime hai jo Google Chrome ke V8 engine pe built hai aur JavaScript ko browser ke BAHAR chalne deta hai — servers, CLIs, aur desktop apps pe. Node (2009) se pehle, JS sirf browser tab mein chal sakta tha. Node aise APIs add karta hai jo browser ke paas nahi (file system access, TCP servers, process control) jabki browser-only APIs (DOM, window) hata deta hai. Ye single-threaded, event-driven, non-blocking I/O model use karta hai, isliye fast, scalable network applications banane ke liye well-suited hai.',
    },
  },
  {
    question: 'Why is Node.js used?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Node.js is chosen for: (1) building fast, I/O-heavy backends (APIs, real-time chat, streaming) since its non-blocking model handles thousands of concurrent connections efficiently; (2) using ONE language (JavaScript) across frontend and backend, reducing context switching and enabling code sharing; (3) NPM — the largest package ecosystem in any language, meaning most common needs already have a battle-tested library; (4) a large hiring pool since JS is the most widely known language.',
      hinglish:
        'Node.js in wajahon se choose kiya jaata hai: (1) fast, I/O-heavy backends banana (APIs, real-time chat, streaming) kyunki iska non-blocking model hazaron concurrent connections efficiently handle karta hai; (2) frontend aur backend dono ke liye EK language (JavaScript) use karna, context switching kam karte hue aur code sharing enable karte hue; (3) NPM — kisi bhi language ka sabse bada package ecosystem, matlab zyadatar common needs ke liye already ek battle-tested library maujood hai; (4) ek bada hiring pool kyunki JS sabse widely-known language hai.',
    },
  },
  {
    question: 'What are the features of Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Key features: single-threaded event loop with non-blocking I/O (handles many connections without spawning a thread per request); built on V8 for fast execution; asynchronous by default; a rich standard library (fs, http, path, crypto, streams); NPM for package management; cross-platform (Windows/Linux/macOS); and a single JavaScript codebase shareable with frontend code. It is NOT ideal for CPU-heavy tasks (image processing, heavy computation) since a long synchronous computation blocks the single main thread.',
      hinglish:
        'Key features: single-threaded event loop non-blocking I/O ke saath (bahut saare connections handle karta hai bina har request ke liye thread spawn kiye); V8 pe built fast execution ke liye; default se asynchronous; ek rich standard library (fs, http, path, crypto, streams); package management ke liye NPM; cross-platform (Windows/Linux/macOS); aur ek single JavaScript codebase jo frontend code ke saath shareable hai. Ye CPU-heavy tasks (image processing, heavy computation) ke liye IDEAL NAHI hai kyunki ek lambi synchronous computation single main thread ko block kar deti hai.',
    },
  },
  {
    question: 'How does Node.js work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'When a request arrives, Node.js does NOT spawn a new thread per request (unlike traditional multi-threaded servers). Instead, the single main thread accepts the request and, if it needs I/O (reading a file, querying a DB, calling an API), delegates that work to the OS or a background thread pool (via libuv) and immediately moves on to handle the next request. When the I/O completes, its callback is queued and picked up by the event loop to be executed on the main thread. This lets one thread juggle thousands of concurrent I/O operations efficiently.',
      hinglish:
        'Jab ek request aati hai, Node.js har request ke liye naya thread spawn NAHI karta (traditional multi-threaded servers ke ulat). Iske bajaye, single main thread request accept karta hai aur, agar usse I/O chahiye (file read, DB query, API call), wo kaam OS ya background thread pool (libuv ke through) ko delegate kar deta hai aur turant agli request handle karne chala jaata hai. I/O complete hone pe, uska callback queue hota hai aur event loop use main thread pe execute karne ke liye uthaata hai. Isse ek thread hazaron concurrent I/O operations efficiently juggle kar leta hai.',
    },
  },
  {
    question: 'What is the V8 Engine?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'V8 is Google\'s open-source JavaScript (and WebAssembly) engine, written in C++, originally built for Chrome. It compiles JavaScript directly to native machine code (JIT compilation) instead of interpreting it line by line, making JS execution very fast. Node.js embeds V8 to run JavaScript outside the browser, and extends it with additional C++ bindings for file system access, networking, and other OS-level capabilities that a browser sandbox would never expose.',
      hinglish:
        'V8 Google ka open-source JavaScript (aur WebAssembly) engine hai, C++ mein likha gaya, originally Chrome ke liye bana. Ye JavaScript ko directly native machine code mein compile karta hai (JIT compilation) line-by-line interpret karne ke bajaye, jisse JS execution bahut fast hoti hai. Node.js V8 ko embed karta hai JavaScript ko browser ke bahar chalane ke liye, aur ise extra C++ bindings ke saath extend karta hai file system access, networking, aur doosri OS-level capabilities ke liye jo ek browser sandbox kabhi expose nahi karega.',
    },
  },
  {
    question: 'What is npm?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'npm (Node Package Manager) is the default package manager bundled with Node.js. It has three parts: a CLI tool (`npm install`, `npm run`) for managing dependencies and scripts; a registry (npmjs.com) hosting over a million open-source packages; and the package.json file format that describes a project\'s dependencies and metadata. It handles installing, updating, and resolving nested dependency trees automatically.',
      hinglish:
        'npm (Node Package Manager) Node.js ke saath bundled default package manager hai. Iske teen parts hain: ek CLI tool (`npm install`, `npm run`) dependencies aur scripts manage karne ke liye; ek registry (npmjs.com) jo dus lakh se zyada open-source packages host karta hai; aur package.json file format jo project ki dependencies aur metadata describe karta hai. Ye nested dependency trees ko install, update, aur resolve karna automatically handle karta hai.',
    },
  },
  {
    question: 'What is npx?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'npx (bundled with npm 5.2+) executes a package\'s binary WITHOUT installing it globally or permanently. If the package isn\'t already installed locally, npx temporarily downloads it, runs it once, and discards it — useful for one-off tool usage (`npx create-react-app my-app`, `npx cowsay hello`) or running a locally-installed CLI tool without needing to add it to your PATH or use `npm run`.',
      hinglish:
        'npx (npm 5.2+ ke saath bundled) ek package ka binary EXECUTE karta hai use globally ya permanently install kiye bina. Agar package locally already install nahi hai, npx temporarily download karta hai, ek baar run karta hai, aur discard kar deta hai — one-off tool usage ke liye useful (`npx create-react-app my-app`, `npx cowsay hello`) ya ek locally-installed CLI tool ko PATH mein add kiye bina ya `npm run` use kiye bina chalane ke liye.',
    },
  },
  {
    question: 'What is the difference between Node.js and JavaScript?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'JavaScript is a PROGRAMMING LANGUAGE — a specification (ECMAScript) defining syntax and core built-ins (Array, Object, Promise). Node.js is a RUNTIME ENVIRONMENT that executes JavaScript outside a browser, adding platform-specific APIs (fs, http, process) that are not part of the JavaScript language itself and are not available in browsers. In short: JavaScript is the language; Node.js is one place (among several — browsers, Deno, Bun) where that language can run, each providing different host APIs.',
      hinglish:
        'JavaScript ek PROGRAMMING LANGUAGE hai — ek specification (ECMAScript) jo syntax aur core built-ins (Array, Object, Promise) define karti hai. Node.js ek RUNTIME ENVIRONMENT hai jo JavaScript ko browser ke bahar execute karta hai, platform-specific APIs (fs, http, process) add karte hue jo JavaScript language ka hi part nahi hain aur browsers mein available nahi hain. Short mein: JavaScript language hai; Node.js ek jagah hai (aur bhi kai jagah hain — browsers, Deno, Bun) jahan wo language chal sakti hai, har ek alag host APIs provide karte hue.',
    },
  },
  {
    question: 'What is the difference between Node.js and Express.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Node.js is the RUNTIME — the underlying platform that executes JavaScript and gives you low-level modules like `http` to build a server. Express.js is a FRAMEWORK built on top of Node.js\'s `http` module, adding a much friendlier API for routing, middleware, request/response helpers, and error handling. You could build a server with raw Node.js `http` alone, but you\'d be re-implementing routing, body parsing, and middleware chaining by hand — Express provides all of that out of the box.',
      hinglish:
        'Node.js RUNTIME hai — underlying platform jo JavaScript execute karta hai aur `http` jaise low-level modules deta hai server banane ke liye. Express.js ek FRAMEWORK hai jo Node.js ke `http` module ke upar built hai, routing, middleware, request/response helpers, aur error handling ke liye ek bahut friendlier API add karte hue. Tum raw Node.js `http` akele se ek server bana sakte ho, par tumhe routing, body parsing, aur middleware chaining haath se re-implement karni padegi — Express ye sab out of the box deta hai.',
    },
  },
  {
    question: 'What are Node.js modules?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A module is a reusable, self-contained block of code with its own scope — variables/functions inside a module are private unless explicitly exported. Node.js has three kinds: core/built-in modules (fs, http, path — bundled with Node itself), local/user-defined modules (your own files), and third-party modules (installed via npm). Modules keep code organised, prevent global namespace pollution, and enable dependency reuse across a project.',
      hinglish:
        'Ek module code ka reusable, self-contained block hai apne khud ke scope ke saath — module ke andar variables/functions private hote hain jab tak explicitly export na ho. Node.js ke teen kinds hain: core/built-in modules (fs, http, path — Node ke saath hi bundled), local/user-defined modules (tumhari khud ki files), aur third-party modules (npm se install hote hain). Modules code ko organised rakhte hain, global namespace pollution rokte hain, aur project ke across dependency reuse enable karte hain.',
    },
  },
  {
    question: 'What are the built-in modules in Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Node.js ships with many core modules that need no npm install, just `require()`/`import`: `fs` (file system), `http`/`https` (servers/clients), `path` (file path utilities), `os` (operating system info), `crypto` (hashing/encryption), `events` (EventEmitter), `stream` (streaming data), `util` (utility helpers), `child_process` (spawning processes), and `cluster`/`worker_threads` (parallelism). These give Node.js server-side and system-level capabilities that plain browser JavaScript never has.',
      hinglish:
        'Node.js bahut saare core modules ke saath aata hai jinhe koi npm install ki zaroorat nahi, bas `require()`/`import`: `fs` (file system), `http`/`https` (servers/clients), `path` (file path utilities), `os` (operating system info), `crypto` (hashing/encryption), `events` (EventEmitter), `stream` (streaming data), `util` (utility helpers), `child_process` (processes spawn karna), aur `cluster`/`worker_threads` (parallelism). Ye Node.js ko server-side aur system-level capabilities dete hain jo plain browser JavaScript ke paas kabhi nahi hoti.',
    },
  },
  {
    question: 'What is package.json?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'package.json is the manifest file at the root of every Node.js project — it declares the project\'s name, version, entry point, scripts (`npm run dev`), and its dependencies/devDependencies with version ranges. npm reads it to know exactly what to install and how to run project commands. It is the single source of truth that makes a project reproducible on any machine — `npm install` reads it and rebuilds `node_modules` accordingly.',
      hinglish:
        'package.json har Node.js project ke root pe manifest file hai — ye project ka naam, version, entry point, scripts (`npm run dev`), aur uski dependencies/devDependencies version ranges ke saath declare karta hai. npm ise padhta hai exactly janne ke liye ki kya install karna hai aur project commands kaise chalane hain. Ye single source of truth hai jo project ko kisi bhi machine pe reproducible banata hai — `npm install` ise padhta hai aur `node_modules` accordingly rebuild karta hai.',
    },
  },
  {
    question: 'What is package-lock.json?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'package-lock.json records the EXACT version of every installed package (including nested/transitive dependencies), unlike package.json which uses version RANGES (`^4.2.0`). It guarantees that everyone on a team, and CI/CD, installs the exact same dependency tree — preventing "works on my machine" bugs caused by a transitive dependency silently updating. It should always be committed to git; it is auto-generated and should never be hand-edited.',
      hinglish:
        'package-lock.json har installed package ki EXACT version record karta hai (nested/transitive dependencies included), package.json ke ulat jo version RANGES use karta hai (`^4.2.0`). Ye guarantee karta hai ki team ke sab, aur CI/CD, exactly same dependency tree install karein — "works on my machine" bugs rokte hue jo ek transitive dependency silently update hone se hote hain. Ise hamesha git mein commit karna chahiye; ye auto-generated hai aur kabhi hand-edit nahi karna chahiye.',
    },
  },
  {
    question: 'What is semantic versioning (semver) in npm?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Semantic versioning is the `MAJOR.MINOR.PATCH` (e.g. `4.2.1`) convention npm packages follow: MAJOR increments for breaking changes, MINOR for backward-compatible new features, PATCH for backward-compatible bug fixes. package.json prefixes control update ranges: `^4.2.1` allows MINOR and PATCH updates (up to but not including `5.0.0`); `~4.2.1` allows only PATCH updates; an exact `4.2.1` with no prefix pins that exact version. Understanding this prevents unexpected breaking changes when running `npm install`.',
      hinglish:
        'Semantic versioning `MAJOR.MINOR.PATCH` (jaise `4.2.1`) convention hai jo npm packages follow karte hain: MAJOR breaking changes ke liye increment hota hai, MINOR backward-compatible naye features ke liye, PATCH backward-compatible bug fixes ke liye. package.json prefixes update ranges control karte hain: `^4.2.1` MINOR aur PATCH updates allow karta hai (`5.0.0` tak par usse exclude karte hue); `~4.2.1` sirf PATCH updates allow karta hai; bina prefix ke exact `4.2.1` us exact version ko pin karta hai. Ye samajhna `npm install` chalate waqt unexpected breaking changes se bachata hai.',
    },
  },
  {
    question: 'What is the difference between dependencies and devDependencies?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`dependencies` are packages your app NEEDS AT RUNTIME in production (e.g. `express`, `mongoose`) — installed with `npm install pkg`. `devDependencies` are packages needed only DURING DEVELOPMENT — testing, linting, bundling (e.g. `jest`, `eslint`, `webpack`) — installed with `npm install -D pkg` and typically NOT installed in production (`npm install --production` skips them), keeping the production deployment smaller and reducing its attack surface.',
      hinglish:
        '`dependencies` wo packages hain jo tumhari app ko production mein RUNTIME PE CHAHIYE (jaise `express`, `mongoose`) — `npm install pkg` se install hote hain. `devDependencies` wo packages hain jo sirf DEVELOPMENT KE DAURAAN chahiye — testing, linting, bundling (jaise `jest`, `eslint`, `webpack`) — `npm install -D pkg` se install hote hain aur typically production mein install NAHI hote (`npm install --production` unhe skip karta hai), production deployment ko chhota rakhte hue aur attack surface kam karte hue.',
    },
  },
  {
    question: 'What is the REPL in Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'REPL stands for Read-Eval-Print-Loop — an interactive shell you get by typing `node` (with no file argument) in a terminal. It Reads a line of JS you type, Evaluates it immediately, Prints the result, and Loops back for the next line — useful for quickly testing snippets, exploring an API, or debugging without creating a full script file. It is similar to the browser\'s DevTools console, but running in the Node.js environment.',
      hinglish:
        'REPL ka matlab hai Read-Eval-Print-Loop — ek interactive shell jo terminal mein `node` (bina file argument ke) type karne se milti hai. Ye tumhare type kiye JS ki ek line Read karti hai, turant Evaluate karti hai, result Print karti hai, aur agli line ke liye Loop back karti hai — snippets quickly test karne, API explore karne, ya bina poori script file banaye debug karne ke liye useful. Ye browser ke DevTools console jaisa hai, par Node.js environment mein chalta hai.',
    },
  },
  {
    question: 'How do you create a Node.js project?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Basic steps: (1) `mkdir my-project && cd my-project` to create a folder. (2) `npm init -y` to generate a default package.json. (3) `npm install express mongoose` (or whatever dependencies you need) — this creates `node_modules/` and updates package.json/package-lock.json. (4) Create an entry file (e.g. `index.js` or `server.js`) and add a `"start": "node index.js"` script to package.json. (5) Run it with `node index.js` or `npm start`.',
      hinglish:
        'Basic steps: (1) `mkdir my-project && cd my-project` ek folder banane ke liye. (2) `npm init -y` ek default package.json generate karne ke liye. (3) `npm install express mongoose` (ya jo bhi dependencies chahiye) — ye `node_modules/` banata hai aur package.json/package-lock.json update karta hai. (4) Ek entry file banao (jaise `index.js` ya `server.js`) aur package.json mein `"start": "node index.js"` script add karo. (5) `node index.js` ya `npm start` se chalao.',
    },
  },
  {
    question: 'What is the EventEmitter in Node.js?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'EventEmitter is a core Node.js class (from the `events` module) implementing the observer/pub-sub pattern — objects can `.emit(eventName, data)` a named event, and other code can `.on(eventName, callback)` to listen and react. Many Node.js core objects (HTTP servers, streams, process) are built on EventEmitter internally. It is the foundational pattern for handling anything event-driven in Node.js, and you can extend it to build your own custom event-based APIs.',
      hinglish:
        'EventEmitter ek core Node.js class hai (`events` module se) jo observer/pub-sub pattern implement karti hai — objects ek named event `.emit(eventName, data)` kar sakte hain, aur doosra code `.on(eventName, callback)` se listen aur react kar sakta hai. Bahut saare Node.js core objects (HTTP servers, streams, process) internally EventEmitter pe bane hain. Ye Node.js mein kisi bhi event-driven cheez ko handle karne ka foundational pattern hai, aur tum ise extend karke apne khud ke custom event-based APIs bana sakte ho.',
    },
  },
  {
    question: 'What is the process object in Node.js?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`process` is a global object providing information about, and control over, the current running Node.js process — no `require()` needed. Common uses: `process.env` (environment variables), `process.argv` (command-line arguments), `process.exit(code)` (terminate the process), `process.cwd()` (current working directory), `process.on("uncaughtException", ...)` (global error handling), and `process.nextTick()` (scheduling). It is Node.js\'s bridge to the underlying OS process.',
      hinglish:
        '`process` ek global object hai jo current chal rahe Node.js process ke baare mein information deta hai, aur uspe control deta hai — koi `require()` ki zaroorat nahi. Common uses: `process.env` (environment variables), `process.argv` (command-line arguments), `process.exit(code)` (process terminate karna), `process.cwd()` (current working directory), `process.on("uncaughtException", ...)` (global error handling), aur `process.nextTick()` (scheduling). Ye Node.js ka underlying OS process se bridge hai.',
    },
  },

  // ─── Modules & File System ───────────────────────────────────────────
  {
    question: 'What is the File System (fs) module?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`fs` is Node.js\'s core module for interacting with the file system — reading, writing, updating, deleting, and watching files/directories. It offers three API styles for most operations: synchronous (`fs.readFileSync`, blocks the event loop), callback-based asynchronous (`fs.readFile(path, callback)`, the original async style), and Promise-based (`fs.promises.readFile` or `fs/promises`, works cleanly with async/await). Modern code generally prefers the Promise-based API.',
      hinglish:
        '`fs` Node.js ka core module hai file system ke saath interact karne ke liye — files/directories read, write, update, delete, aur watch karna. Zyadatar operations ke liye teen API styles offer karta hai: synchronous (`fs.readFileSync`, event loop block karta hai), callback-based asynchronous (`fs.readFile(path, callback)`, original async style), aur Promise-based (`fs.promises.readFile` ya `fs/promises`, async/await ke saath cleanly kaam karta hai). Modern code generally Promise-based API prefer karta hai.',
    },
  },
  {
    question: 'What is the difference between synchronous and asynchronous file operations?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Synchronous methods (`fs.readFileSync`) BLOCK the entire event loop until the file operation completes — during a large file read, nothing else in the app (no other requests, no timers) can run. Asynchronous methods (`fs.readFile` with a callback, or `fs.promises.readFile` with await) hand the I/O off to libuv\'s thread pool, letting the main thread keep serving other requests while the file loads in the background. In a server handling multiple requests, synchronous fs calls should almost always be avoided — they defeat Node\'s entire concurrency model.',
      hinglish:
        'Synchronous methods (`fs.readFileSync`) poora event loop BLOCK karte hain jab tak file operation complete na ho — ek badi file read ke dauraan, app mein kuch aur (koi doosri request, koi timer) chal hi nahi sakta. Asynchronous methods (`fs.readFile` callback ke saath, ya `fs.promises.readFile` await ke saath) I/O ko libuv ke thread pool ko handoff karte hain, main thread ko baaki requests serve karte rehne dete hain jabki file background mein load hoti hai. Multiple requests handle karne wale server mein, synchronous fs calls almost hamesha avoid karni chahiye — wo Node ke poore concurrency model ko defeat karti hain.',
    },
  },
  {
    question: 'How do you read a file in Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Preferred modern approach: `import { readFile } from "fs/promises"; const data = await readFile("file.txt", "utf8");` inside an async function. The `"utf8"` encoding returns a string; omitting it returns a raw Buffer. The older callback style is `fs.readFile("file.txt", "utf8", (err, data) => {...})`, and the blocking style (avoid in servers) is `fs.readFileSync("file.txt", "utf8")`.',
      hinglish:
        'Preferred modern approach: `import { readFile } from "fs/promises"; const data = await readFile("file.txt", "utf8");` ek async function ke andar. `"utf8"` encoding ek string return karta hai; ise omit karne se raw Buffer return hota hai. Older callback style hai `fs.readFile("file.txt", "utf8", (err, data) => {...})`, aur blocking style (servers mein avoid karo) hai `fs.readFileSync("file.txt", "utf8")`.',
    },
  },
  {
    question: 'How do you write a file in Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Preferred approach: `import { writeFile } from "fs/promises"; await writeFile("file.txt", "Hello world", "utf8");`. `writeFile` OVERWRITES the file entirely if it already exists (or creates it if it doesn\'t). Callback style: `fs.writeFile("file.txt", data, callback)`. Note: writeFile does not append — for adding content to an existing file without overwriting it, use `appendFile` instead.',
      hinglish:
        'Preferred approach: `import { writeFile } from "fs/promises"; await writeFile("file.txt", "Hello world", "utf8");`. `writeFile` file ko poori tarah OVERWRITE karta hai agar wo already exist karti hai (ya banata hai agar nahi karti). Callback style: `fs.writeFile("file.txt", data, callback)`. Note: writeFile append nahi karta — existing file mein content overwrite kiye bina add karne ke liye, `appendFile` use karo.',
    },
  },
  {
    question: 'How do you append data to a file?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`import { appendFile } from "fs/promises"; await appendFile("log.txt", "New log entry\\n", "utf8");` — this adds content to the END of the file WITHOUT erasing existing content (creating the file if it doesn\'t exist yet). This is commonly used for log files, where you want to keep accumulating entries over time rather than overwriting the whole file on every write.',
      hinglish:
        '`import { appendFile } from "fs/promises"; await appendFile("log.txt", "New log entry\\n", "utf8");` — ye content ko file ke END mein add karta hai existing content erase kiye BINA (agar file exist nahi karti to banata hai). Ye commonly log files ke liye use hota hai, jahan tum chahte ho time ke saath entries accumulate hoti rahein, har write pe poori file overwrite hone ke bajaye.',
    },
  },
  {
    question: 'How do you delete a file in Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`import { unlink } from "fs/promises"; await unlink("old-file.txt");` removes a file from the file system. The method is confusingly named `unlink` (not `delete` or `remove`) because it comes from the underlying POSIX system call, which removes a directory entry pointing to the file\'s data. Always wrap it in try/catch, since it throws if the file doesn\'t exist.',
      hinglish:
        '`import { unlink } from "fs/promises"; await unlink("old-file.txt");` file system se ek file remove karta hai. Method ka naam confusingly `unlink` hai (`delete` ya `remove` nahi) kyunki ye underlying POSIX system call se aata hai, jo file ke data ko point karne wali ek directory entry remove karti hai. Hamesha try/catch mein wrap karo, kyunki agar file exist nahi karti to ye throw karta hai.',
    },
  },
  {
    question: 'How do you rename a file in Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`import { rename } from "fs/promises"; await rename("old-name.txt", "new-name.txt");` renames (or moves, if given a different directory path) a file. Under the hood this is generally a fast metadata-only operation on the same filesystem/volume (just updates the directory entry), but if the source and destination are on DIFFERENT volumes, the OS may need to copy the data and delete the original instead.',
      hinglish:
        '`import { rename } from "fs/promises"; await rename("old-name.txt", "new-name.txt");` ek file ko rename karta hai (ya move karta hai, agar alag directory path diya jaaye). Under the hood ye generally same filesystem/volume pe ek fast metadata-only operation hai (bas directory entry update karta hai), par agar source aur destination ALAG volumes pe hon, OS ko data copy karke original delete karna pad sakta hai.',
    },
  },
  {
    question: 'What is the path module in Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`path` is a core module for working with file/directory paths in a cross-platform way — Windows uses backslashes (`\\`) while Linux/macOS use forward slashes (`/`), and `path` abstracts that difference. Common methods: `path.join(...segments)` (safely combines path segments with the correct separator), `path.resolve(...)` (produces an absolute path), `path.basename(p)` (extracts the filename), `path.extname(p)` (extracts the extension), and `path.dirname(p)` (extracts the directory).',
      hinglish:
        '`path` ek core module hai file/directory paths ke saath cross-platform tarike se kaam karne ke liye — Windows backslashes (`\\`) use karta hai jabki Linux/macOS forward slashes (`/`) use karte hain, aur `path` ye difference abstract kar deta hai. Common methods: `path.join(...segments)` (path segments ko sahi separator se safely combine karta hai), `path.resolve(...)` (ek absolute path produce karta hai), `path.basename(p)` (filename extract karta hai), `path.extname(p)` (extension extract karta hai), aur `path.dirname(p)` (directory extract karta hai).',
    },
  },
  {
    question: 'What is the os module in Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`os` is a core module providing information about the operating system Node.js is running on: `os.platform()` (win32/linux/darwin), `os.cpus()` (CPU core details, useful for deciding worker/cluster count), `os.totalmem()`/`os.freemem()` (memory info), `os.homedir()` (user home directory), and `os.hostname()`. It is commonly used to write system-aware scripts, tune performance based on available CPU cores, or display server diagnostics.',
      hinglish:
        '`os` ek core module hai jo us operating system ke baare mein information deta hai jispe Node.js chal raha hai: `os.platform()` (win32/linux/darwin), `os.cpus()` (CPU core details, worker/cluster count decide karne ke liye useful), `os.totalmem()`/`os.freemem()` (memory info), `os.homedir()` (user home directory), aur `os.hostname()`. Ye commonly system-aware scripts likhne, available CPU cores ke basis pe performance tune karne, ya server diagnostics display karne ke liye use hota hai.',
    },
  },
  {
    question: 'What is the http module in Node.js?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`http` is Node.js\'s core module for creating HTTP servers and making HTTP requests, WITHOUT any external framework: `http.createServer((req, res) => { res.end("Hello") }).listen(3000)`. It exposes the raw request/response objects with low-level APIs (manual routing, manual body parsing) — this is exactly the boilerplate that frameworks like Express are built to eliminate, but understanding `http` directly is essential to understanding what Express actually does under the hood.',
      hinglish:
        '`http` Node.js ka core module hai HTTP servers banane aur HTTP requests karne ke liye, bina kisi external framework ke: `http.createServer((req, res) => { res.end("Hello") }).listen(3000)`. Ye raw request/response objects ko low-level APIs ke saath expose karta hai (manual routing, manual body parsing) — yahi exactly boilerplate hai jo Express jaise frameworks eliminate karne ke liye bane hain, par `http` ko directly samajhna essential hai ye samajhne ke liye ki Express under the hood actually kya karta hai.',
    },
  },
  {
    question: 'What is the crypto module in Node.js?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`crypto` is Node.js\'s core module for cryptographic operations: hashing (`crypto.createHash("sha256")`), generating secure random values (`crypto.randomBytes(32)`, `crypto.randomUUID()`), HMAC signatures, and symmetric/asymmetric encryption. It is commonly used for generating secure tokens (password reset links, session IDs), hashing data for integrity checks, and implementing custom cryptographic logic — though for PASSWORD hashing specifically, a dedicated slow algorithm like `bcrypt` is preferred over raw `crypto.createHash`.',
      hinglish:
        '`crypto` Node.js ka core module hai cryptographic operations ke liye: hashing (`crypto.createHash("sha256")`), secure random values generate karna (`crypto.randomBytes(32)`, `crypto.randomUUID()`), HMAC signatures, aur symmetric/asymmetric encryption. Ye commonly secure tokens generate karne (password reset links, session IDs), data ko integrity checks ke liye hash karne, aur custom cryptographic logic implement karne ke liye use hota hai — chahe PASSWORD hashing specifically ke liye, raw `crypto.createHash` se zyada `bcrypt` jaisa dedicated slow algorithm preferred hai.',
    },
  },
  {
    question: 'What is the stream module in Node.js?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`stream` is Node.js\'s core abstraction for handling data that arrives in CHUNKS over time, rather than all at once — essential for large files, video, or network data that would be wasteful (or impossible) to load fully into memory. There are 4 types: Readable (data source, e.g. `fs.createReadStream`), Writable (data destination, e.g. `fs.createWriteStream`), Duplex (both readable and writable, e.g. a TCP socket), and Transform (a Duplex that modifies data as it passes through, e.g. gzip compression).',
      hinglish:
        '`stream` Node.js ka core abstraction hai aise data ko handle karne ke liye jo time ke saath CHUNKS mein aata hai, ek saath nahi — bade files, video, ya network data ke liye essential jinhe poora memory mein load karna wasteful (ya impossible) hoga. Iske 4 types hain: Readable (data source, jaise `fs.createReadStream`), Writable (data destination, jaise `fs.createWriteStream`), Duplex (readable aur writable dono, jaise ek TCP socket), aur Transform (ek Duplex jo data ko modify karta hai jab wo pass hota hai, jaise gzip compression).',
    },
  },
  {
    question: 'What is a Buffer in Node.js?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A Buffer is a fixed-size, raw binary data structure Node.js uses to handle binary data (like file bytes, network packets, or image data) — something JavaScript\'s native string/array types weren\'t designed for efficiently. Buffers exist outside V8\'s regular heap for performance, and are what streams internally pass around chunk by chunk. Example: `const buf = Buffer.from("hello", "utf8");` creates a Buffer of the UTF-8 byte representation of the string.',
      hinglish:
        'Ek Buffer ek fixed-size, raw binary data structure hai jo Node.js binary data (jaise file bytes, network packets, ya image data) handle karne ke liye use karta hai — kuch aisa jiske liye JavaScript ke native string/array types efficiently designed nahi the. Buffers performance ke liye V8 ke regular heap ke bahar exist karte hain, aur yahi hain jo streams internally chunk by chunk pass karte hain. Example: `const buf = Buffer.from("hello", "utf8");` string ke UTF-8 byte representation ka ek Buffer banata hai.',
    },
  },
  {
    question: 'What are child processes in Node.js?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'The `child_process` module lets Node.js spawn separate OS processes to run other programs (shell commands, other executables, even other Node.js scripts) in parallel with the main process, communicating via stdin/stdout/messages. Key methods: `exec()` (runs a shell command, buffers all output, good for short commands), `spawn()` (streams output incrementally, good for long-running processes or large output), and `fork()` (specifically spawns a new Node.js process with a built-in IPC channel for message-passing, commonly used to offload CPU-heavy work from the main event loop).',
      hinglish:
        '`child_process` module Node.js ko separate OS processes spawn karne deta hai doosre programs (shell commands, doosre executables, even doosre Node.js scripts) main process ke parallel chalane ke liye, stdin/stdout/messages ke through communicate karte hue. Key methods: `exec()` (ek shell command run karta hai, saara output buffer karta hai, chhote commands ke liye achha), `spawn()` (output incrementally stream karta hai, long-running processes ya bade output ke liye achha), aur `fork()` (specifically ek naya Node.js process spawn karta hai ek built-in IPC channel ke saath message-passing ke liye, commonly main event loop se CPU-heavy kaam offload karne ke liye use hota hai).',
    },
  },

  // ─── Event Loop & Asynchronous Programming ───────────────────────────────────────────
  {
    question: 'What is the Event Loop in Node.js?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The event loop is what allows Node.js\'s single main thread to handle asynchronous operations. It continuously cycles through distinct PHASES, each processing a specific queue of callbacks: timers (setTimeout/setInterval callbacks), pending callbacks (some system-level callbacks), poll (retrieving new I/O events; executes I/O callbacks), check (setImmediate callbacks), and close callbacks (e.g. socket.on("close")). Between EVERY phase transition, Node fully drains the microtask queue (process.nextTick callbacks first, then Promise callbacks) before moving on — this is what lets async code appear to "wait" without blocking anything else.',
      hinglish:
        'Event loop wo hai jo Node.js ke single main thread ko asynchronous operations handle karne deta hai. Ye continuously distinct PHASES ke through cycle karta hai, har ek ek specific queue of callbacks process karta hai: timers (setTimeout/setInterval callbacks), pending callbacks (kuch system-level callbacks), poll (naye I/O events retrieve karna; I/O callbacks execute karna), check (setImmediate callbacks), aur close callbacks (jaise socket.on("close")). HAR phase transition ke beech, Node microtask queue poori tarah drain karta hai (pehle process.nextTick callbacks, phir Promise callbacks) aage badhne se pehle — yahi wajah hai async code bina kuch aur block kiye "wait" karta hua feel hota hai.',
    },
  },
  {
    question: 'How does Node.js handle concurrency?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Node.js achieves HIGH CONCURRENCY on a SINGLE main thread by never blocking on I/O: when it needs to read a file, query a database, or make a network call, it delegates that work to the OS kernel (for network I/O, using efficient OS mechanisms like epoll/kqueue) or to libuv\'s background thread pool (for file I/O, DNS lookups), and immediately continues handling other requests. When the I/O completes, its callback is queued for the event loop to run. This lets one thread serve thousands of simultaneous connections, as long as the actual JavaScript CPU work per request stays small.',
      hinglish:
        'Node.js EK single main thread pe HIGH CONCURRENCY achieve karta hai I/O pe kabhi block na hoke: jab use file read karni ho, database query karni ho, ya network call karni ho, ye us kaam ko OS kernel ko delegate kar deta hai (network I/O ke liye, efficient OS mechanisms jaise epoll/kqueue use karke) ya libuv ke background thread pool ko (file I/O, DNS lookups ke liye), aur turant baaki requests handle karna continue karta hai. I/O complete hone pe, uska callback event loop ke chalane ke liye queue hota hai. Isse ek thread hazaron simultaneous connections serve kar leta hai, jab tak per-request actual JavaScript CPU work chhota rahe.',
    },
  },
  {
    question: 'What is non-blocking I/O?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Non-blocking I/O means a program INITIATES an I/O operation (file read, network call) and immediately continues to the next line of code WITHOUT waiting for it to finish — the operation runs in the background, and its result is delivered later via a callback/Promise. This is the default mode for Node.js\'s async APIs (`fs.readFile`, `fetch`) and is what allows a single thread to handle many operations concurrently, since it is never idle waiting on any one operation.',
      hinglish:
        'Non-blocking I/O ka matlab hai ek program ek I/O operation (file read, network call) INITIATE karta hai aur turant code ki agli line pe continue karta hai use khatam hone ka wait kiye BINA — operation background mein chalta hai, aur uska result baad mein callback/Promise ke through deliver hota hai. Ye Node.js ke async APIs (`fs.readFile`, `fetch`) ka default mode hai aur yahi ek single thread ko bahut saare operations concurrently handle karne deta hai, kyunki wo kabhi kisi ek operation ka wait karte hue idle nahi rehta.',
    },
  },
  {
    question: 'What is blocking I/O?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Blocking I/O means the program STOPS and WAITS for an I/O operation to complete before moving to the next line — nothing else can happen during that wait (no other requests served, no timers fire). `fs.readFileSync()` is a classic blocking call in Node.js. In a server context, a single blocking call can freeze the ENTIRE application for every connected user, which is exactly why blocking synchronous APIs should be avoided in request-handling code.',
      hinglish:
        'Blocking I/O ka matlab hai program RUKTA hai aur ek I/O operation complete hone ka WAIT karta hai agli line pe move karne se pehle — us wait ke dauraan kuch aur nahi ho sakta (koi doosri request serve nahi hoti, koi timer fire nahi hota). `fs.readFileSync()` Node.js mein ek classic blocking call hai. Server context mein, ek blocking call POORI application ko har connected user ke liye freeze kar sakta hai, yahi exactly wajah hai blocking synchronous APIs ko request-handling code mein avoid karna chahiye.',
    },
  },
  {
    question: 'What is callback hell?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Callback hell (the "pyramid of doom") happens when multiple asynchronous operations depend on each other and are nested as callbacks inside callbacks inside callbacks — the code drifts progressively rightward, becomes hard to read, hard to add error handling to (each level needs its own error check), and hard to maintain. It was extremely common in early Node.js code (e.g. chained `fs.readFile` calls), before Promises and async/await provided flatter, more linear alternatives.',
      hinglish:
        'Callback hell ("pyramid of doom") tab hota hai jab multiple asynchronous operations ek doosre pe depend karte hain aur callbacks ke andar callbacks ke andar callbacks ke roop mein nest hote hain — code progressively right ki taraf drift karta hai, padhna mushkil ho jaata hai, error handling add karna mushkil (har level ka apna error check chahiye), aur maintain karna mushkil. Ye early Node.js code mein extremely common tha (jaise chained `fs.readFile` calls), Promises aur async/await ke flatter, zyada linear alternatives dene se pehle.',
    },
  },
  {
    question: 'How do you avoid callback hell?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Modern solutions: (1) use Promises and chain them with `.then()` instead of nesting callbacks. (2) Use async/await, which makes sequential async code read like synchronous code with try/catch for errors — this is the current best practice. (3) Break large functions into small, named, single-purpose functions instead of anonymous inline callbacks. (4) Use utility libraries like `async` for complex control flow (parallel, series, waterfall) when needed. In modern Node.js code, callback hell is largely a solved, historical problem thanks to async/await.',
      hinglish:
        'Modern solutions: (1) Promises use karo aur callbacks nest karne ke bajaye `.then()` se chain karo. (2) async/await use karo, jo sequential async code ko synchronous code jaisa padhne layak banata hai try/catch se errors ke saath — ye current best practice hai. (3) bade functions ko chhote, named, single-purpose functions mein tod do anonymous inline callbacks ke bajaye. (4) `async` jaisi utility libraries use karo complex control flow (parallel, series, waterfall) ke liye jab zaroorat ho. Modern Node.js code mein, callback hell largely ek solved, historical problem hai async/await ki wajah se.',
    },
  },
  {
    question: 'What is setImmediate()?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`setImmediate(callback)` schedules a callback to run in the "check" phase of the event loop, which runs right AFTER the "poll" (I/O) phase completes in each event loop iteration. It is commonly used to defer execution until after the current I/O event has been fully processed, without the minimum-delay overhead that `setTimeout(fn, 0)` technically has. It runs once, unlike `setInterval`.',
      hinglish:
        '`setImmediate(callback)` ek callback ko event loop ki "check" phase mein chalne ke liye schedule karta hai, jo har event loop iteration mein "poll" (I/O) phase complete hone ke turant BAAD chalti hai. Ye commonly current I/O event poori tarah process hone ke baad tak execution defer karne ke liye use hota hai, us minimum-delay overhead ke bina jo `setTimeout(fn, 0)` technically rakhta hai. Ye ek baar chalta hai, `setInterval` ke ulat.',
    },
  },
  {
    question: 'What is the difference between setImmediate(), setTimeout(), and process.nextTick()?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`process.nextTick(cb)` runs BEFORE the event loop continues to any phase — it has the highest priority, and its entire queue is drained before even the Promise microtask queue. `setTimeout(cb, 0)` schedules the callback for the "timers" phase, with a minimum delay (roughly 1ms in practice, even with 0 specified). `setImmediate(cb)` schedules for the "check" phase, right after I/O callbacks in the current loop iteration. Inside a plain script (not inside an I/O callback), the order of setTimeout(0) vs setImmediate is not guaranteed and can vary; but INSIDE an I/O callback, setImmediate always fires before setTimeout(0), since "check" comes right after "poll" in the same iteration.',
      hinglish:
        '`process.nextTick(cb)` event loop kisi bhi phase mein continue hone se PEHLE chalta hai — iski highest priority hai, aur iski poori queue Promise microtask queue se bhi pehle drain hoti hai. `setTimeout(cb, 0)` callback ko "timers" phase ke liye schedule karta hai, ek minimum delay ke saath (practically roughly 1ms, 0 specify karne pe bhi). `setImmediate(cb)` "check" phase ke liye schedule karta hai, current loop iteration mein I/O callbacks ke turant baad. Ek plain script ke andar (I/O callback ke andar nahi), setTimeout(0) vs setImmediate ka order guaranteed nahi hai aur vary kar sakta hai; par ek I/O callback ke ANDAR, setImmediate hamesha setTimeout(0) se pehle fire hota hai, kyunki "check" same iteration mein "poll" ke turant baad aata hai.',
    },
  },
  {
    question: 'What is process.nextTick()?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`process.nextTick(callback)` schedules a callback to run IMMEDIATELY after the currently executing operation finishes, BEFORE the event loop proceeds to its next phase — it has higher priority than even Promise callbacks. It is used sparingly, for cases needing to defer work just slightly (e.g. letting a constructor finish before an event fires) without waiting a full event loop cycle. Overusing it can starve the event loop (if code keeps scheduling more nextTick calls recursively, I/O never gets a chance to run).',
      hinglish:
        '`process.nextTick(callback)` ek callback ko currently executing operation khatam hone ke TURANT BAAD chalne ke liye schedule karta hai, event loop apne next phase mein jaane se PEHLE — iski priority Promise callbacks se bhi zyada hai. Ye sparingly use hota hai, un cases ke liye jahan kaam thoda sa defer karna hai (jaise ek constructor ko event fire hone se pehle khatam hone dena) poora event loop cycle wait kiye bina. Isse overuse karna event loop ko starve kar sakta hai (agar code recursively aur nextTick calls schedule karta rahe, I/O ko kabhi chalne ka mauka nahi milta).',
    },
  },
  {
    question: 'Explain the execution order of asynchronous tasks in Node.js.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Priority order (highest to lowest): (1) synchronous code runs first, top to bottom. (2) `process.nextTick()` queue — drained completely. (3) Promise microtask queue (`.then`/`async-await` continuations) — drained completely. (4) Then the event loop proceeds through its phases in order: timers (`setTimeout`/`setInterval`) → pending callbacks → poll (I/O) → check (`setImmediate`) → close callbacks — with steps 2 and 3 fully re-drained between EVERY phase transition. This is why `process.nextTick` always beats a Promise `.then`, and both always beat a `setTimeout(fn, 0)`, regardless of the order they were written in the code.',
      hinglish:
        'Priority order (highest se lowest): (1) synchronous code pehle chalta hai, top se bottom. (2) `process.nextTick()` queue — poori tarah drain hoti hai. (3) Promise microtask queue (`.then`/`async-await` continuations) — poori tarah drain hoti hai. (4) Phir event loop apne phases ke through order mein aage badhta hai: timers (`setTimeout`/`setInterval`) → pending callbacks → poll (I/O) → check (`setImmediate`) → close callbacks — steps 2 aur 3 HAR phase transition ke beech poori tarah phir se drain hote hue. Yahi wajah hai `process.nextTick` hamesha ek Promise `.then` ko haraata hai, aur dono hamesha ek `setTimeout(fn, 0)` ko haraate hain, chahe code mein wo kisi bhi order mein likhe gaye hon.',
    },
  },
  {
    question: 'What is libuv?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'libuv is a C library that provides Node.js\'s underlying event loop implementation and abstracts OS-level asynchronous I/O across platforms (Windows, Linux, macOS each have different native async I/O mechanisms — libuv unifies them behind one API). It also manages a THREAD POOL (4 threads by default) used for operations that don\'t have a native async OS API — like file system operations, DNS lookups, and some crypto functions — running them in the background so the main JS thread is never blocked. V8 runs the JavaScript; libuv is what makes the async, event-driven part of Node.js actually work.',
      hinglish:
        'libuv ek C library hai jo Node.js ka underlying event loop implementation provide karti hai aur platforms ke across OS-level asynchronous I/O ko abstract karti hai (Windows, Linux, macOS har ek ke different native async I/O mechanisms hain — libuv unhe ek API ke peeche unify kar deta hai). Ye ek THREAD POOL bhi manage karta hai (default 4 threads) un operations ke liye jinke paas native async OS API nahi hai — jaise file system operations, DNS lookups, aur kuch crypto functions — unhe background mein chalate hue taaki main JS thread kabhi block na ho. V8 JavaScript chalata hai; libuv wo hai jo Node.js ka async, event-driven part actually kaam karta hai.',
    },
  },

  // ─── Auth-adjacent: Environment & Config ───────────────────────────────────────────
  {
    question: 'What are environment variables?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Environment variables are key-value pairs set OUTSIDE your application code, at the OS/process level, and accessible in Node.js via `process.env.VAR_NAME`. They are used for configuration that varies between environments (dev/staging/production) or is sensitive (API keys, database URLs) — keeping this data out of source code so it can differ per-deployment and never gets committed to git. Examples: `NODE_ENV`, `PORT`, `DATABASE_URL`.',
      hinglish:
        'Environment variables key-value pairs hain jo tumhari application code ke BAHAR set kiye jaate hain, OS/process level pe, aur Node.js mein `process.env.VAR_NAME` se accessible hote hain. Ye aise configuration ke liye use hote hain jo environments (dev/staging/production) ke beech vary karta hai ya sensitive hai (API keys, database URLs) — is data ko source code se bahar rakhte hue taaki ye per-deployment alag ho sake aur kabhi git mein commit na ho. Examples: `NODE_ENV`, `PORT`, `DATABASE_URL`.',
    },
  },
  {
    question: 'Why use dotenv?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The `dotenv` package lets you define environment variables in a local `.env` file (e.g. `DATABASE_URL=mongodb://localhost/mydb`) which it loads into `process.env` at startup with `require("dotenv").config()`. This is purely a LOCAL DEVELOPMENT convenience — it lets you keep secrets out of your shell profile and easily switch between projects, each with its own `.env`. In production, real environment variables are usually set directly by the hosting platform (Vercel, AWS, Docker) rather than a `.env` file, and `.env` must always be added to `.gitignore`.',
      hinglish:
        '`dotenv` package tumhe environment variables ko ek local `.env` file mein define karne deta hai (jaise `DATABASE_URL=mongodb://localhost/mydb`) jise ye startup pe `process.env` mein load karta hai `require("dotenv").config()` se. Ye purely ek LOCAL DEVELOPMENT convenience hai — ye tumhe secrets ko shell profile se bahar rakhne deta hai aur projects ke beech easily switch karne deta hai, har ek ka apna `.env`. Production mein, real environment variables usually hosting platform (Vercel, AWS, Docker) se directly set hote hain `.env` file ke bajaye, aur `.env` ko hamesha `.gitignore` mein add karna chahiye.',
    },
  },

  // ─── Advanced Node.js ───────────────────────────────────────────
  {
    question: 'What are Streams in Node.js, and why use them?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Streams let you process data incrementally, piece by piece, instead of loading it all into memory at once — critical for large files, video, or network data. Instead of `readFile()` (loads the ENTIRE file into memory before you can use any of it), `createReadStream()` emits chunks as they become available, so a 10GB file can be processed with only a small amount of memory used at any time. `.pipe()` connects a readable stream directly to a writable one (e.g. reading a file and writing it to an HTTP response) with automatic backpressure handling.',
      hinglish:
        'Streams tumhe data ko incrementally, piece by piece process karne dete hain, ek saath poori memory mein load kiye bina — bade files, video, ya network data ke liye critical. `readFile()` (poori file memory mein load karta hai use kuch bhi use karne se pehle) ke bajaye, `createReadStream()` chunks emit karta hai jaise wo available hote hain, isliye ek 10GB file kisi bhi time pe sirf thodi si memory use karke process ho sakti hai. `.pipe()` ek readable stream ko directly ek writable se connect karta hai (jaise file read karke HTTP response mein likhna) automatic backpressure handling ke saath.',
    },
  },
  {
    question: 'What is Clustering in Node.js?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Node.js runs on a SINGLE CPU core by default, wasting the extra cores on a multi-core machine. The `cluster` module solves this by forking multiple copies of your app as separate child processes ("workers"), one per CPU core, all sharing the same server port — the master process load-balances incoming connections across the workers (typically round-robin on most platforms). Each worker has its own memory and event loop, so a crash in one worker doesn\'t take down the others, and total throughput scales roughly with core count for CPU-bound workloads.',
      hinglish:
        'Node.js default se ek SINGLE CPU core pe chalta hai, ek multi-core machine pe extra cores waste karte hue. `cluster` module ise solve karta hai tumhari app ki multiple copies ko separate child processes ("workers") ke roop mein fork karke, per CPU core ek, sab same server port share karte hue — master process incoming connections ko workers ke across load-balance karta hai (typically zyadatar platforms pe round-robin). Har worker ki apni memory aur event loop hoti hai, isliye ek worker mein crash doosron ko down nahi karta, aur total throughput CPU-bound workloads ke liye roughly core count ke saath scale karta hai.',
    },
  },
  {
    question: 'What are Worker Threads in Node.js?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The `worker_threads` module lets you run JavaScript in PARALLEL threads within the SAME process — unlike `cluster` (separate processes with separate memory) or `child_process`, worker threads can share memory directly via `SharedArrayBuffer`, making them lighter-weight for CPU-intensive tasks. They are specifically designed to offload heavy, synchronous CPU work (image processing, complex calculations, parsing huge JSON) that would otherwise block the main event loop, without the overhead of spawning entirely separate processes like `cluster` does.',
      hinglish:
        '`worker_threads` module tumhe SAME process ke andar PARALLEL threads mein JavaScript chalane deta hai — `cluster` (separate processes with separate memory) ya `child_process` ke ulat, worker threads memory ko directly `SharedArrayBuffer` se share kar sakte hain, jo unhe CPU-intensive tasks ke liye lighter-weight banata hai. Ye specifically heavy, synchronous CPU work (image processing, complex calculations, huge JSON parse karna) offload karne ke liye design kiye gaye hain jo warna main event loop ko block kar dega, bina `cluster` ki tarah poore alag processes spawn karne ke overhead ke.',
    },
  },
  {
    question: 'How do you improve Node.js performance?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Key strategies: (1) never use blocking/synchronous APIs (`readFileSync`) in request-handling paths. (2) Use clustering or a process manager (PM2) to utilise all CPU cores. (3) Offload CPU-heavy work to worker threads or a separate service. (4) Cache expensive operations (Redis, in-memory LRU cache) instead of recomputing them per request. (5) Use streams for large data instead of buffering everything in memory. (6) Add proper indexes on your database and avoid N+1 query patterns. (7) Use a reverse proxy/CDN (Nginx, Cloudflare) for static assets and load balancing. (8) Profile with tools like `clinic.js` or the built-in `--prof` flag to find actual bottlenecks rather than guessing.',
      hinglish:
        'Key strategies: (1) request-handling paths mein kabhi blocking/synchronous APIs (`readFileSync`) use mat karo. (2) sab CPU cores utilise karne ke liye clustering ya ek process manager (PM2) use karo. (3) CPU-heavy kaam ko worker threads ya ek separate service ko offload karo. (4) expensive operations ko cache karo (Redis, in-memory LRU cache) har request pe recompute karne ke bajaye. (5) badi data ke liye streams use karo sab kuch memory mein buffer karne ke bajaye. (6) database pe proper indexes add karo aur N+1 query patterns avoid karo. (7) static assets aur load balancing ke liye ek reverse proxy/CDN (Nginx, Cloudflare) use karo. (8) `clinic.js` jaise tools ya built-in `--prof` flag se profile karo actual bottlenecks dhundhne ke liye, guess karne ke bajaye.',
    },
  },
  {
    question: 'Explain the complete lifecycle of a Node.js request from client to database and back.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'End-to-end flow: (1) The client (browser/app) sends an HTTP request over TCP to the server\'s port. (2) The OS/reverse proxy (e.g. Nginx, or a Node cluster master) routes the connection to a Node.js process. (3) Node\'s `http` module (or Express/Fastify built on it) parses the raw request into a request object and matches it against registered routes/middleware. (4) Middleware runs in order (auth check, body parsing, logging) via `next()`. (5) The route handler executes — if it needs data, it calls an async database driver method (e.g. Mongoose `.find()`), which Node hands off to libuv/the OS network stack rather than blocking. (6) The main thread immediately continues handling OTHER requests while this one waits. (7) When the database responds, the driver\'s callback/Promise resolves, its continuation is queued as a microtask, and the event loop picks it up. (8) The handler builds a response object, and `res.send()`/`res.json()` serializes it and writes it back over the same TCP connection. (9) The client receives the response and renders/uses it. Throughout, the single main thread never sat idle waiting for the database — it kept servicing other requests, which is the entire reason Node.js scales well for I/O-bound web workloads.',
      hinglish:
        'End-to-end flow: (1) Client (browser/app) TCP ke through server ke port pe ek HTTP request bhejta hai. (2) OS/reverse proxy (jaise Nginx, ya ek Node cluster master) connection ko ek Node.js process pe route karta hai. (3) Node ka `http` module (ya uske upar built Express/Fastify) raw request ko ek request object mein parse karta hai aur registered routes/middleware se match karta hai. (4) Middleware order mein chalta hai (auth check, body parsing, logging) `next()` ke through. (5) Route handler execute hota hai — agar use data chahiye, ye ek async database driver method call karta hai (jaise Mongoose `.find()`), jise Node libuv/OS network stack ko handoff kar deta hai block hone ke bajaye. (6) Main thread turant OTHER requests handle karna continue karta hai jabki ye wait karta hai. (7) Jab database respond karta hai, driver ka callback/Promise resolve hota hai, uska continuation ek microtask ke roop mein queue hota hai, aur event loop use uthaata hai. (8) Handler ek response object banata hai, aur `res.send()`/`res.json()` use serialize karke usi TCP connection pe wapas likhta hai. (9) Client response receive karta hai aur render/use karta hai. Poore process mein, single main thread kabhi database ka wait karte hue idle nahi baitha — wo baaki requests service karta raha, yahi poori wajah hai Node.js I/O-bound web workloads ke liye achhe se scale karta hai.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
