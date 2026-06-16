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
            frequency: 'occasional',
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
    frequency: 'occasional',
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
    frequency: 'occasional',
    answer: {
      english:
        'Backpressure happens when a writable stream cannot consume data as fast as a readable stream produces it. If ignored, data piles up in memory and can crash the process. .pipe() handles backpressure automatically by pausing the readable stream when the writable\'s internal buffer is full, and resuming it once drained. When manually writing to streams, you must check the return value of .write() and listen for the "drain" event before writing more.',
      hinglish:
        'Backpressure tab hota hai jab writable stream data ko utni fast consume nahi kar sakta jitna readable stream produce kar raha hai. Agar ignore kiya jaaye, data memory mein dher ho jaata hai aur process crash ho sakta hai. .pipe() backpressure ko automatically handle karta hai readable stream ko pause karke jab writable ka internal buffer full ho, aur drain hone pe resume karke. Manually streams mein likhte waqt, .write() ka return value check karna padta hai aur "drain" event ka wait karna padta hai zyada likhne se pehle.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
