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
    'JavaScript ko server pe chalao — modules, fs, async, streams aur HTTP. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🟢',
  tags: ['nodejs', 'backend', 'javascript', 'mern'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 7,
};

const beginner = [
  {
    title: 'Node Basics',
    level: 'beginner',
    description: 'Node kya hai, modules aur npm.',
    concepts: [
      {
        title: 'What is Node.js',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'Node.js is a runtime that lets you run JavaScript outside the browser — on servers, CLIs, and tools. It is built on Chrome\'s V8 engine and is single-threaded with a non-blocking, event-driven model, which makes it great for I/O-heavy apps like APIs and real-time servers.',
          hinglish:
            'Node.js ek runtime hai jo JavaScript ko browser ke bahar chalane deta hai — servers, CLIs, tools pe. Ye Chrome ke V8 engine pe bana hai aur single-threaded hai non-blocking, event-driven model ke saath, jo ise I/O-heavy apps jaise APIs aur real-time servers ke liye badhiya banata hai.',
        },
        dailyLifeExample:
          'Pehle JavaScript sirf browser (ghar) ke andar chalti thi. Node use bahar le aaya — ab JS ek multi-purpose worker hai jo server, file system, network sab handle karta hai.',
        codeExample:
          '// hello.js — run with: node hello.js\nconsole.log("Hello from Node!");\nconsole.log("Node version:", process.version);',
        keyPoints: [
          'Runs JavaScript outside the browser',
          'Built on the V8 engine',
          'Single-threaded, non-blocking, event-driven',
          'Great for I/O-heavy apps (APIs, real-time)',
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
                'Node uses a single-threaded, non-blocking event loop. I/O (network, file, DB) is delegated to the system and handled via callbacks, so one thread can juggle thousands of concurrent connections efficiently. But CPU-heavy work (image processing, big loops) blocks that single thread, freezing everything — for that you use worker threads, clustering, or a different tool.',
              hinglish:
                'Node single-threaded, non-blocking event loop use karta hai. I/O (network, file, DB) system ko de diya jaata hai aur callbacks se handle hota hai, isliye ek thread hazaaron concurrent connections efficiently handle kar leta hai. Par CPU-heavy kaam (image processing, bade loops) us single thread ko block kar deta hai, sab freeze — uske liye worker threads, clustering, ya doosra tool use karte ho.',
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
            'The language is the same, but the environment differs. The browser has window, document, and the DOM; Node has global, process, require, and modules like fs and http. Node has no DOM; the browser has no file-system access. Knowing what is available where avoids confusion.',
          hinglish:
            'Language same hai, par environment alag. Browser mein window, document, aur DOM hote hain; Node mein global, process, require, aur fs/http jaise modules. Node mein DOM nahi; browser mein file-system access nahi. Kya kahan available hai ye pata hona confusion bachata hai.',
        },
        dailyLifeExample:
          'Same driver (JavaScript), alag gaadiyan — browser ek car hai jisme dashboard (DOM) hai, Node ek truck hai jisme cargo system (files, network) hai. Skills same, tools alag.',
        codeExample:
          '// Browser: window, document, alert\n// document.querySelector("h1");\n\n// Node: no DOM; has process, require\nconsole.log(process.platform);\nconst fs = require("fs"); // file system',
        keyPoints: [
          'Same language, different environment',
          'Browser: window, document, DOM',
          'Node: global, process, require, fs/http',
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
        title: 'Modules (CommonJS)',
        difficulty: 'easy',
        tags: ['modules', 'commonjs'],
        explanation: {
          english:
            'Node splits code into modules. The classic CommonJS system uses module.exports to expose values and require() to import them. Each file is its own module with its own scope. Node also supports ES Modules (import/export) in .mjs files or with "type":"module".',
          hinglish:
            'Node code ko modules mein baant ta hai. Classic CommonJS system module.exports se values bahar deta hai aur require() se import. Har file apna module hai apne scope ke saath. Node ES Modules (import/export) bhi support karta hai .mjs files mein ya "type":"module" ke saath.',
        },
        dailyLifeExample:
          'Modules kitchen ke alag dabbe jaise hain — masala.js, chawal.js. require() se jo chahiye wo dabba khol lo, poori almari nahi.',
        codeExample:
          '// math.js\nfunction add(a, b) { return a + b; }\nmodule.exports = { add };\n\n// app.js\nconst { add } = require("./math");\nconsole.log(add(2, 3)); // 5',
        keyPoints: [
          'CommonJS: module.exports + require()',
          'Each file is its own module/scope',
          'ESM (import/export) also supported',
          'Use ./ for local files',
        ],
        quiz: [
          {
            question: 'In CommonJS, you import with…',
            options: ['import', 'require()', 'include', 'use'],
            correctIndex: 1,
          },
          {
            question: 'You expose values from a CommonJS module with…',
            options: ['export', 'module.exports', 'return', 'global'],
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
                'CommonJS (require/module.exports) loads modules synchronously at runtime and is the historic Node default. ES Modules (import/export) are the standard, support static analysis and tree-shaking, and load asynchronously. In Node you opt into ESM with .mjs or "type":"module". You generally cannot require() an ESM module directly; interop needs dynamic import().',
              hinglish:
                'CommonJS (require/module.exports) modules ko runtime pe synchronously load karta hai aur Node ka historic default hai. ES Modules (import/export) standard hain, static analysis aur tree-shaking support karte hain, aur asynchronously load hote hain. Node mein ESM ke liye .mjs ya "type":"module" use karte ho. Aam taur pe ESM ko seedha require() nahi kar sakte; interop ke liye dynamic import() chahiye.',
            },
          },
        ],
      },
      {
        title: 'npm & package.json',
        difficulty: 'easy',
        tags: ['npm', 'packages'],
        explanation: {
          english:
            'npm is Node\'s package manager. package.json describes your project: name, version, scripts, and dependencies. npm install adds packages into node_modules and records them. Use dependencies for runtime needs and devDependencies for tooling (tests, build).',
          hinglish:
            'npm Node ka package manager hai. package.json tumhare project ko describe karta hai: name, version, scripts, dependencies. npm install packages ko node_modules mein daal ta hai aur record karta hai. Runtime ke liye dependencies aur tooling (tests, build) ke liye devDependencies use karo.',
        },
        dailyLifeExample:
          'npm ek app store jaisa hai aur package.json tumhari installed-apps list. npm install matlab list ke hisaab se sab apps wapas download kar lo.',
        codeExample:
          '// package.json\n{\n  "name": "my-app",\n  "scripts": { "start": "node index.js" },\n  "dependencies": { "express": "^4.18.0" }\n}\n// npm install   -> installs deps\n// npm start     -> runs the start script',
        keyPoints: [
          'npm = Node package manager',
          'package.json describes the project',
          'npm install -> node_modules',
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
    ],
  },
  {
    title: 'Core Modules',
    level: 'beginner',
    description: 'Built-in modules — fs, path, events.',
    concepts: [
      {
        title: 'File System (fs)',
        difficulty: 'medium',
        tags: ['fs', 'core'],
        explanation: {
          english:
            'The fs module reads and writes files. Most methods come in async (callback or fs.promises) and sync (readFileSync) flavours. Prefer the async versions on servers so you do not block the event loop while disk I/O happens.',
          hinglish:
            'fs module files read aur write karta hai. Zyadatar methods async (callback ya fs.promises) aur sync (readFileSync) dono roop mein aate hain. Servers pe async versions prefer karo taaki disk I/O ke dauraan event loop block na ho.',
        },
        dailyLifeExample:
          'Sync fs ek hi clerk jaisa hai jo file laane jaaye to baaki sab line mein ruk jaayein. Async fs clerk ko bhejke baaki kaam karta rehta hai — file aa jaaye to handle karega.',
        codeExample:
          'const fs = require("fs/promises");\n\nasync function run() {\n  await fs.writeFile("note.txt", "Hello");\n  const data = await fs.readFile("note.txt", "utf8");\n  console.log(data); // Hello\n}\nrun();',
        keyPoints: [
          'fs reads/writes files',
          'Async (promises/callbacks) vs sync versions',
          'Prefer async on servers (non-blocking)',
          'Pass encoding (utf8) to get a string',
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
        title: 'Events & EventEmitter',
        difficulty: 'medium',
        tags: ['events', 'core'],
        explanation: {
          english:
            'Node is event-driven. The EventEmitter class lets objects emit named events and register listeners with .on(). Many core modules (streams, http servers) are EventEmitters. You call .emit("event", data) and any .on("event", handler) listeners run.',
          hinglish:
            'Node event-driven hai. EventEmitter class objects ko named events emit karne deti hai aur .on() se listeners register karne. Bahut core modules (streams, http servers) EventEmitters hain. Tum .emit("event", data) call karte ho aur saare .on("event", handler) listeners chal jaate hain.',
        },
        dailyLifeExample:
          'EventEmitter ek ghanti (bell) system jaisa hai — koi bell bajaye (emit), jisne sunne ke liye kaan laga rakhe (on) wo sab react karte hain.',
        codeExample:
          'const EventEmitter = require("events");\nconst bus = new EventEmitter();\n\nbus.on("order", (id) => console.log("Order:", id));\nbus.emit("order", 101); // Order: 101',
        keyPoints: [
          'Node is event-driven',
          'EventEmitter: .on() to listen, .emit() to fire',
          'Streams & http servers are EventEmitters',
          'Multiple listeners can react to one event',
        ],
        quiz: [
          {
            question: 'Which method registers a listener?',
            options: ['.emit()', '.on()', '.fire()', '.send()'],
            correctIndex: 1,
          },
          {
            question: 'Which fires an event?',
            options: ['.on()', '.emit()', '.listen()', '.trigger()'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Asynchronous Node',
    level: 'intermediate',
    description: 'Callbacks, promises, async/await aur streams.',
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
          'const fs = require("fs");\nfs.readFile("file.txt", "utf8", (err, data) => {\n  if (err) return console.error("Failed:", err);\n  console.log(data);\n});',
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
            'Modern Node APIs offer promise versions (e.g. fs/promises), and you can convert callback APIs with util.promisify. With async/await your asynchronous code reads top-to-bottom, and you handle errors with try/catch. This is the recommended style today.',
          hinglish:
            'Modern Node APIs promise versions dete hain (jaise fs/promises), aur callback APIs ko util.promisify se convert kar sakte ho. async/await ke saath tumhara asynchronous code upar-se-neeche padha jaata hai, aur errors try/catch se handle karte ho. Aaj yahi recommended style hai.',
        },
        dailyLifeExample:
          'util.promisify ek purane manual gadget ko smart bana dena jaisa hai — wahi kaam, par ab modern async/await ke saath clean.',
        codeExample:
          'const { promisify } = require("util");\nconst fs = require("fs");\nconst readFile = promisify(fs.readFile);\n\nasync function run() {\n  try {\n    const data = await readFile("file.txt", "utf8");\n    console.log(data);\n  } catch (e) { console.error(e); }\n}',
        keyPoints: [
          'Use fs/promises or util.promisify',
          'async/await reads like sync code',
          'Handle errors with try/catch',
          'Recommended modern style',
        ],
        quiz: [
          {
            question: 'util.promisify converts a callback API into…',
            options: ['a class', 'a promise-returning function', 'a stream', 'a string'],
            correctIndex: 1,
          },
          {
            question: 'With async/await you handle errors using…',
            options: ['.catch only', 'try/catch', 'if/else', 'callbacks'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Streams & Buffers',
        difficulty: 'hard',
        tags: ['streams', 'buffers'],
        explanation: {
          english:
            'Streams process data in chunks instead of loading it all into memory — ideal for large files or network data. A Buffer holds raw binary data. Pipe a readable stream into a writable one with .pipe() to move data efficiently (e.g. copy a huge file with low memory).',
          hinglish:
            'Streams data ko chunks mein process karte hain bina sab memory mein load kiye — bade files ya network data ke liye ideal. Buffer raw binary data rakhta hai. Readable stream ko writable mein .pipe() se daal kar data efficiently move karte ho (jaise huge file low memory mein copy).',
        },
        dailyLifeExample:
          'Stream ek paani ke pipe jaisa hai — tanki (file) ko ek baar mein nahi, thodi-thodi paani (chunks) behne deta hai. Pura tanki uthane (memory) ki zaroorat nahi.',
        codeExample:
          'const fs = require("fs");\nconst read = fs.createReadStream("big.txt");\nconst write = fs.createWriteStream("copy.txt");\nread.pipe(write); // streams chunks, low memory',
        keyPoints: [
          'Process data in chunks (low memory)',
          'Buffer = raw binary data',
          '.pipe() connects readable -> writable',
          'Great for large files & network I/O',
        ],
        quiz: [
          {
            question: 'Streams help by processing data…',
            options: ['all at once', 'in chunks (low memory)', 'never', 'as strings only'],
            correctIndex: 1,
          },
          {
            question: 'Which connects a readable to a writable stream?',
            options: ['.join()', '.pipe()', '.link()', '.flow()'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'The Node Runtime',
    level: 'intermediate',
    description: 'Event loop aur environment.',
    concepts: [
      {
        title: 'The Node Event Loop',
        difficulty: 'hard',
        tags: ['event-loop', 'internals'],
        explanation: {
          english:
            'Node\'s event loop (via libuv) lets a single thread handle many operations. Synchronous code runs first; async callbacks are queued in phases (timers, I/O callbacks, etc.). Microtasks (promises, process.nextTick) run between phases with higher priority. This is why ordering can surprise you.',
          hinglish:
            'Node ka event loop (libuv se) ek single thread ko bahut operations handle karne deta hai. Synchronous code pehle chalta hai; async callbacks phases mein queue hote hain (timers, I/O callbacks, etc.). Microtasks (promises, process.nextTick) phases ke beech zyada priority se chalte hain. Isliye ordering kabhi surprise karti hai.',
        },
        dailyLifeExample:
          'Event loop ek akele waiter jaisa hai jo bahut tables sambhal ta hai — order leke kitchen ko de deta hai (async) aur free hote hi ready dishes serve karta hai, bina kisi ek table pe atke.',
        codeExample:
          'console.log("1");\nsetTimeout(() => console.log("2 timer"), 0);\nPromise.resolve().then(() => console.log("3 microtask"));\nprocess.nextTick(() => console.log("4 nextTick"));\nconsole.log("5");\n// 1, 5, 4, 3, 2',
        keyPoints: [
          'Single thread handles many ops (libuv)',
          'Sync first, then queued async callbacks',
          'Microtasks (promises, nextTick) > timers',
          'Explains surprising execution order',
        ],
        quiz: [
          {
            question: 'Node\'s event loop is powered by…',
            options: ['V8 only', 'libuv', 'the DOM', 'npm'],
            correctIndex: 1,
          },
          {
            question: 'Which runs with higher priority?',
            options: ['setTimeout', 'process.nextTick / promises', 'both equal', 'neither'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'process & Environment Variables',
        difficulty: 'medium',
        tags: ['process', 'env'],
        explanation: {
          english:
            'The global process object exposes the running program: process.argv (CLI args), process.env (environment variables), process.exit(), and events like exit. Use environment variables (often via a .env file) for config and secrets so they are not hard-coded.',
          hinglish:
            'Global process object running program ko expose karta hai: process.argv (CLI args), process.env (environment variables), process.exit(), aur exit jaise events. Config aur secrets ke liye environment variables use karo (aksar .env file se) taaki wo hard-coded na hon.',
        },
        dailyLifeExample:
          'process.env ek settings panel jaisa hai jo bina code chhede badal sakte ho — dev mein ek setting, production mein doosri, code same.',
        codeExample:
          'console.log(process.argv);      // CLI arguments\nconsole.log(process.env.NODE_ENV); // "development" / "production"\nif (!process.env.API_KEY) process.exit(1);',
        keyPoints: [
          'process = info about the running program',
          'process.env for environment variables',
          'process.argv for CLI arguments',
          'Keep secrets/config in env (not code)',
        ],
        quiz: [
          {
            question: 'Where do you read environment variables?',
            options: ['process.argv', 'process.env', 'process.exit', 'require'],
            correctIndex: 1,
          },
          {
            question: 'Why use environment variables for secrets?',
            options: ['Faster code', 'Keep them out of source code', 'Smaller files', 'No reason'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Building with Node',
    level: 'advanced',
    description: 'HTTP server aur error handling.',
    concepts: [
      {
        title: 'Creating an HTTP Server',
        difficulty: 'medium',
        tags: ['http', 'server'],
        explanation: {
          english:
            'The built-in http module can create a web server without any framework. http.createServer takes a handler (req, res) and you call server.listen(port). Frameworks like Express build on top of this to add routing and middleware conveniently.',
          hinglish:
            'Built-in http module bina kisi framework ke web server bana sakta hai. http.createServer ek handler (req, res) leta hai aur tum server.listen(port) call karte ho. Express jaise frameworks isi ke upar routing aur middleware aasaani se add karne ke liye bante hain.',
        },
        dailyLifeExample:
          'http module se server banana ek dukaan khud haath se chalane jaisa hai — har customer (request) ko khud handle karo. Express ek POS system de deta hai jo kaam aasaan kar de.',
        codeExample:
          'const http = require("http");\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "application/json" });\n  res.end(JSON.stringify({ message: "Hello" }));\n});\nserver.listen(3000);',
        keyPoints: [
          'http.createServer((req, res) => {})',
          'server.listen(port) starts it',
          'No framework needed for a basic server',
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
        title: 'Error Handling in Node',
        difficulty: 'hard',
        tags: ['errors', 'best-practices'],
        explanation: {
          english:
            'Handle errors at the right layer: try/catch around await, .catch() on promises, and check err in callbacks. For servers, use a central error handler and never let the process crash silently. Listen for uncaughtException and unhandledRejection to log fatal errors, but treat them as last resorts (then exit/restart).',
          hinglish:
            'Errors ko sahi layer pe handle karo: await ke around try/catch, promises pe .catch(), aur callbacks mein err check. Servers ke liye ek central error handler use karo aur process ko chup-chaap crash mat hone do. Fatal errors log karne ke liye uncaughtException aur unhandledRejection sunno, par inhe last resort maano (phir exit/restart).',
        },
        dailyLifeExample:
          'Error handling ek factory ke safety system jaisa hai — har machine pe local guard (try/catch) aur ek central alarm (global handler). Bina iske ek galti poori factory band kar de.',
        codeExample:
          'process.on("unhandledRejection", (reason) => {\n  console.error("Unhandled:", reason);\n  process.exit(1); // let a process manager restart\n});\n\ntry {\n  await risky();\n} catch (e) { handle(e); }',
        keyPoints: [
          'try/catch for await, .catch() for promises',
          'Check err in callbacks',
          'Central handler for servers',
          'uncaughtException/unhandledRejection as last resort',
        ],
        quiz: [
          {
            question: 'How do you handle errors from await?',
            options: ['.catch()', 'try/catch', 'if(err)', 'ignore them'],
            correctIndex: 1,
          },
          {
            question: 'unhandledRejection should be treated as…',
            options: ['normal flow', 'a last resort (log then exit)', 'a success', 'a warning to ignore'],
            correctIndex: 1,
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
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
