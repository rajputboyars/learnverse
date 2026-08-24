// Express.js curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs, consumed by scripts/seed.mjs.

import { deepDives } from './express-deep-dives.mjs';

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Express.js',
  slug: 'express',
  description:
    'Node ke liye web framework — routing, middleware aur REST APIs. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: 'train',
  tags: ['express', 'backend', 'nodejs', 'mern', 'api'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 8,
};

const beginner = [
  {
    title: 'Express Basics',
    level: 'beginner',
    description: 'Express kya hai, server, aur routing.',
    concepts: [
      {
        title: 'What is Express.js',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'Express is a minimal, fast web framework for Node.js. It sits on top of Node\'s http module and gives you a clean way to define routes, handle requests/responses, and plug in middleware. It is the "E" in the MERN stack and the most popular Node backend framework.',
          hinglish:
            'Express Node.js ke liye ek minimal, fast web framework hai. Ye Node ke http module ke upar baithta hai aur routes define karne, requests/responses handle karne, aur middleware plug karne ka ek saaf tarika deta hai. Ye MERN stack ka "E" hai aur sabse popular Node backend framework.',
        },
        dailyLifeExample:
          'Node ka http module khud dukaan chalane jaisa hai. Express ek ready POS + billing system de deta hai — kaam wahi, par tez aur organised.',
        codeExample:
          'const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => res.send("Hello Express!"));\n\napp.listen(3000, () => console.log("Server on :3000"));',
        keyPoints: [
          'Minimal, fast web framework for Node',
          'Built on Node\'s http module',
          'Clean routing + middleware',
          'The "E" in MERN',
        ],
        quiz: [
          {
            question: 'Express is built on top of which Node module?',
            options: ['fs', 'http', 'path', 'events'],
            correctIndex: 1,
          },
          {
            question: 'Express is the ___ in MERN.',
            options: ['M', 'E', 'R', 'N'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Routing & Route Parameters',
        difficulty: 'easy',
        tags: ['routing'],
        explanation: {
          english:
            'Routing maps an HTTP method + path to a handler: app.get, app.post, app.put, app.delete. Dynamic segments use :param (read via req.params), and the query string (?q=...) is read via req.query. Each handler receives (req, res).',
          hinglish:
            'Routing ek HTTP method + path ko handler se map karti hai: app.get, app.post, app.put, app.delete. Dynamic segments :param use karte hain (req.params se padho), aur query string (?q=...) req.query se. Har handler (req, res) leta hai.',
        },
        dailyLifeExample:
          'Routes ek building ke address signs jaise hain — GET /users/:id matlab "user number :id ke kamre mein jao". :id wo room number hai jo har baar alag ho sakta hai.',
        codeExample:
          'app.get("/users/:id", (req, res) => {\n  const id = req.params.id;       // /users/42 -> "42"\n  const sort = req.query.sort;    // /users/42?sort=name\n  res.send(`User ${id}, sort ${sort}`);\n});',
        keyPoints: [
          'Methods: get/post/put/delete',
          ':param -> req.params',
          '?query -> req.query',
          'Handler signature: (req, res)',
        ],
        quiz: [
          {
            question: 'A dynamic URL segment :id is read from…',
            options: ['req.query', 'req.params', 'req.body', 'req.url'],
            correctIndex: 1,
          },
          {
            question: 'The ?search=... query string is read from…',
            options: ['req.params', 'req.query', 'req.headers', 'req.body'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Request & Response',
        difficulty: 'easy',
        tags: ['req', 'res'],
        explanation: {
          english:
            'The req object describes the incoming request (params, query, body, headers); the res object sends the reply. Common res methods: res.send(), res.json() (sends JSON + sets headers), res.status(code) to set the HTTP status, and res.redirect(). Chain them: res.status(201).json(data).',
          hinglish:
            'req object incoming request describe karta hai (params, query, body, headers); res object reply bhejta hai. Common res methods: res.send(), res.json() (JSON + headers set karta hai), res.status(code) HTTP status set karne ke liye, aur res.redirect(). Chain karo: res.status(201).json(data).',
        },
        dailyLifeExample:
          'req grahak ka order parchi hai (kya chahiye), res tumhara jawab (saamaan + bill). res.status code parchi pe "done / out of stock" stamp jaisa hai.',
        codeExample:
          'app.post("/users", (req, res) => {\n  const newUser = req.body;          // needs express.json()\n  // ...save user...\n  res.status(201).json(newUser);     // 201 Created + JSON\n});',
        keyPoints: [
          'req: params, query, body, headers',
          'res.json() sends JSON + headers',
          'res.status(code) sets the HTTP status',
          'Methods chain: res.status(201).json(x)',
        ],
        quiz: [
          {
            question: 'Which sends a JSON response?',
            options: ['res.text()', 'res.json()', 'res.html()', 'res.data()'],
            correctIndex: 1,
          },
          {
            question: 'How do you set the HTTP status code?',
            options: ['res.code(201)', 'res.status(201)', 'res.set(201)', 'res.http(201)'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Middleware',
    level: 'intermediate',
    description: 'Express ka dil — middleware functions.',
    concepts: [
      {
        title: 'What is Middleware',
        difficulty: 'medium',
        tags: ['middleware'],
        explanation: {
          english:
            'Middleware are functions that run between the request and the final handler, with access to (req, res, next). They can read/modify req and res, end the response, or call next() to pass control onward. Logging, authentication, body parsing, and CORS are all middleware. Order matters — they run top to bottom.',
          hinglish:
            'Middleware aise functions hain jo request aur final handler ke beech chalte hain, (req, res, next) ke access ke saath. Ye req/res padh/modify kar sakte hain, response end kar sakte hain, ya next() call karke aage control de sakte hain. Logging, authentication, body parsing, CORS sab middleware hain. Order matter karta hai — ye upar se neeche chalte hain.',
        },
        dailyLifeExample:
          'Middleware airport ke security checkpoints jaise hain — har passenger (request) ek-ek checkpoint se guzar ta hai (logging, ID check) phir gate (handler) tak. next() matlab "agle checkpoint bhej do".',
        codeExample:
          'function logger(req, res, next) {\n  console.log(req.method, req.url);\n  next(); // pass to the next middleware/handler\n}\napp.use(logger); // runs for every request',
        keyPoints: [
          'Signature: (req, res, next)',
          'Run between request and handler',
          'Call next() to continue, or end the response',
          'Order matters (top to bottom)',
        ],
        quiz: [
          {
            question: 'What does calling next() do in middleware?',
            options: ['Ends the request', 'Passes control to the next middleware/handler', 'Restarts the server', 'Sends JSON'],
            correctIndex: 1,
          },
          {
            question: 'A middleware function receives…',
            options: ['(req, res)', '(req, res, next)', '(next)', '(data)'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is middleware in Express and what happens if you forget next()?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Middleware are functions with (req, res, next) that execute in order during the request lifecycle and can inspect/modify req/res, short-circuit by sending a response, or call next() to continue. If you forget to call next() (and do not send a response), the request hangs forever because control never reaches the next middleware or route handler.',
              hinglish:
                'Middleware (req, res, next) wale functions hain jo request lifecycle ke dauraan order mein chalte hain aur req/res inspect/modify kar sakte hain, response bhej kar short-circuit kar sakte hain, ya next() se aage badh sakte hain. Agar next() call karna bhool jao (aur response bhi na bhejo), to request hamesha ke liye hang ho jaati hai kyunki control kabhi agle middleware ya route handler tak pahunchta hi nahi.',
            },
          },
        ],
      },
      {
        title: 'Built-in & Third-party Middleware',
        difficulty: 'medium',
        tags: ['middleware', 'ecosystem'],
        explanation: {
          english:
            'Express ships some middleware (express.json() to parse JSON bodies, express.static() to serve files) and the ecosystem adds more (cors for cross-origin, morgan for logging, helmet for security). You register them with app.use(). Without express.json(), req.body is undefined for JSON requests.',
          hinglish:
            'Express kuch middleware deta hai (express.json() JSON bodies parse karne ke liye, express.static() files serve karne ke liye) aur ecosystem aur add karta hai (cors cross-origin ke liye, morgan logging, helmet security). Inhe app.use() se register karte ho. express.json() ke bina, JSON requests pe req.body undefined hota hai.',
        },
        dailyLifeExample:
          'Ye ready-made middleware ready-made tools jaise hain — har baar khud likhne ke bajaye express.json(), cors plug karo aur kaam ho gaya.',
        codeExample:
          'const cors = require("cors");\napp.use(express.json());  // parse JSON body -> req.body\napp.use(cors());          // allow cross-origin\napp.use(express.static("public")); // serve files',
        keyPoints: [
          'express.json() parses JSON into req.body',
          'express.static() serves static files',
          'cors, morgan, helmet are popular add-ons',
          'Register with app.use()',
        ],
        quiz: [
          {
            question: 'Which middleware parses a JSON request body?',
            options: ['express.static()', 'express.json()', 'cors()', 'helmet()'],
            correctIndex: 1,
          },
          {
            question: 'Without express.json(), req.body for a JSON POST is…',
            options: ['the data', 'undefined', 'a string', 'an array'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'CORS Explained: The Same-Origin Problem',
        difficulty: 'medium',
        tags: ['cors', 'security'],
        explanation: {
          english:
            "Browsers enforce the Same-Origin Policy: JavaScript running on one origin (e.g. https://myapp.com) cannot read responses from a different origin (e.g. https://api.myapp.com) by default — this is a security feature, not a bug. CORS (Cross-Origin Resource Sharing) is how a SERVER opts into allowing specific other origins, by sending Access-Control-Allow-Origin headers. The cors package adds these headers for you. For non-simple requests (like PUT with custom headers), the browser first sends an invisible OPTIONS 'preflight' request to check permission before the real one.",
          hinglish:
            "Browsers Same-Origin Policy enforce karte hain: ek origin pe chal rahi JavaScript (jaise https://myapp.com) doosre origin (jaise https://api.myapp.com) se responses default mein PADH nahi sakti — ye ek security feature hai, bug nahi. CORS (Cross-Origin Resource Sharing) wo tarika hai jisse ek SERVER specific doosre origins ko allow karne ka opt-in karta hai, Access-Control-Allow-Origin headers bhej ke. cors package tumhare liye ye headers add kar deta hai. Non-simple requests ke liye (jaise custom headers wala PUT), browser pehle ek invisible OPTIONS 'preflight' request bhejta hai permission check karne ke liye, asli request se pehle.",
        },
        dailyLifeExample:
          "Same-Origin Policy ek building ki security jaisi hai — koi bhi bahar wala (doosra origin) andar seedha nahi aa sakta bina permission ke. CORS headers ek guest-list jaisi hain jo security guard ko batati hai 'ye specific building (origin) se aane walon ko andar aane do'. Preflight request ek 'kya main aa sakta hoon?' phone call hai jo asli visit se pehle hoti hai.",
        codeExample:
          "// WITHOUT cors middleware: the browser blocks the response with a CORS error\n// (the server actually responded fine — the BROWSER refuses to hand it to JS)\n\nconst cors = require('cors');\n\n// allow all origins (fine for public APIs)\napp.use(cors());\n\n// allow only a specific origin (typical for production)\napp.use(cors({ origin: 'https://myapp.com' }));\n\n// The browser automatically sends an OPTIONS preflight for things like:\napp.put('/users/:id', cors(), updateUserHandler);",
        keyPoints: [
          'CORS errors happen in the BROWSER, blocking JS from reading a response — the server request often still succeeds',
          'The Same-Origin Policy is a security feature that CORS lets servers selectively relax',
          'Access-Control-Allow-Origin header tells the browser which origins may read the response',
          'The cors npm package adds these headers automatically',
          'Preflight (OPTIONS) requests happen automatically for "non-simple" requests before the real one',
        ],
        quiz: [
          {
            question: 'Where does a CORS error actually occur?',
            options: ['On the server, which refuses the request', 'In the browser, which blocks JavaScript from reading an otherwise successful response', 'In the database', 'It is a DNS error'],
            correctIndex: 1,
          },
          {
            question: 'What is the purpose of the Same-Origin Policy that CORS relaxes?',
            options: ['To make websites load faster', "A browser security feature that stops one origin's JS from freely reading another origin's responses", 'To compress data', 'It has no real purpose'],
            correctIndex: 1,
          },
          {
            question: "What is a CORS 'preflight' request?",
            options: ['The very first request a browser ever makes', 'An automatic OPTIONS request the browser sends first to check permission, before certain real requests', 'A request that fails on purpose', 'A caching mechanism'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Validating Input with express-validator',
        difficulty: 'medium',
        tags: ['validation', 'security'],
        explanation: {
          english:
            "Never trust req.body — a client can send anything, malicious or malformed. express-validator lets you declare validation/sanitization rules as middleware: check('email').isEmail(), body('age').isInt({ min: 0 }), and so on. Run validationResult(req) in your handler to collect any errors and respond with 400 Bad Request before touching your database or business logic.",
          hinglish:
            "req.body pe kabhi bharosa mat karo — client kuch bhi bhej sakta hai, malicious ya malformed. express-validator validation/sanitization rules ko middleware ki tarah declare karne deta hai: check('email').isEmail(), body('age').isInt({ min: 0 }), waghera. Apne handler mein validationResult(req) chalao errors collect karne ke liye aur database ya business logic chhoone se pehle 400 Bad Request respond karo.",
        },
        dailyLifeExample:
          'express-validator ek form-checking clerk jaisa hai jo application form (req.body) ko andar bhejne se pehle check karta hai — sab fields sahi bhare hain? Email sahi format mein hai? Agar nahi, to seedha wapas kar deta hai, aage nahi jaane deta.',
        codeExample:
          "const { body, validationResult } = require('express-validator');\n\napp.post(\n  '/signup',\n  [\n    body('email').isEmail().withMessage('Invalid email'),\n    body('password').isLength({ min: 8 }).withMessage('Password too short'),\n    body('age').isInt({ min: 13 }).withMessage('Must be 13 or older'),\n  ],\n  (req, res) => {\n    const errors = validationResult(req);\n    if (!errors.isEmpty()) {\n      return res.status(400).json({ errors: errors.array() });\n    }\n    // input is now safe to use\n    createUser(req.body);\n    res.status(201).json({ message: 'User created' });\n  }\n);",
        keyPoints: [
          'Never trust req.body directly — always validate untrusted input',
          'Validation rules (check/body().isX()) run as middleware before the handler',
          'validationResult(req) collects any failures',
          'Respond with 400 Bad Request and stop BEFORE touching the database',
          'Client-side validation is for UX; server-side validation is the real security boundary',
        ],
        quiz: [
          {
            question: 'Why should you validate on the server even if the client already validates the form?',
            options: ['Server validation is optional if the client validates', 'A client can bypass browser validation entirely (dev tools, direct API calls) — server validation is the real security boundary', 'It makes the app slower on purpose', 'There is no reason'],
            correctIndex: 1,
          },
          {
            question: 'What does validationResult(req) return?',
            options: ['The parsed request body', 'Any validation errors that occurred', 'A database connection', 'The response object'],
            correctIndex: 1,
          },
          {
            question: 'What status code should you return when validation fails?',
            options: ['200 OK', '400 Bad Request', '500 Server Error', '201 Created'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Modular Routes (Router)',
        difficulty: 'medium',
        tags: ['router', 'structure'],
        explanation: {
          english:
            'express.Router() lets you split routes into separate files/modules and mount them under a path. This keeps large apps organised — e.g. all user routes in users.js mounted at /users. Each router can have its own middleware.',
          hinglish:
            'express.Router() routes ko alag files/modules mein baant ne aur ek path ke neeche mount karne deta hai. Isse badi apps organised rehti hain — jaise saari user routes users.js mein, /users pe mounted. Har router ka apna middleware ho sakta hai.',
        },
        dailyLifeExample:
          'Router ek building ke alag departments jaise hain — HR floor, Finance floor. Har department (router) apne kaam sambhal ta hai, main reception (app) sab ko jod ta hai.',
        codeExample:
          '// routes/users.js\nconst router = require("express").Router();\nrouter.get("/", listUsers);\nrouter.get("/:id", getUser);\nmodule.exports = router;\n\n// app.js\napp.use("/users", require("./routes/users"));',
        keyPoints: [
          'express.Router() groups related routes',
          'Mount with app.use("/path", router)',
          'Keeps large apps organised',
          'Routers can have their own middleware',
        ],
        quiz: [
          {
            question: 'What does express.Router() help with?',
            options: ['Styling', 'Splitting routes into modules', 'Database access', 'Logging only'],
            correctIndex: 1,
          },
          {
            question: 'How do you mount a router at /users?',
            options: ['app.router(router)', 'app.use("/users", router)', 'app.get(router)', 'router.mount("/users")'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Building a REST API',
        difficulty: 'medium',
        tags: ['rest', 'api'],
        explanation: {
          english:
            'A REST API maps HTTP methods to actions on resources: GET (read), POST (create), PUT/PATCH (update), DELETE (remove). Use proper status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error) and return JSON. Keep URLs noun-based (/users/:id), not verb-based.',
          hinglish:
            'REST API HTTP methods ko resources pe actions se map karti hai: GET (read), POST (create), PUT/PATCH (update), DELETE (remove). Sahi status codes use karo (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error) aur JSON return karo. URLs noun-based rakho (/users/:id), verb-based nahi.',
        },
        dailyLifeExample:
          'REST API ek library jaisa hai — GET kitaab padho, POST nayi kitaab add karo, PUT details update karo, DELETE hatao. Sab ek consistent system ke hisaab se.',
        codeExample:
          'app.get("/todos", (req, res) => res.json(todos));\napp.post("/todos", (req, res) => {\n  const todo = { id: Date.now(), ...req.body };\n  todos.push(todo);\n  res.status(201).json(todo);\n});\napp.delete("/todos/:id", (req, res) => { /* remove */ res.status(204).end(); });',
        keyPoints: [
          'GET/POST/PUT/DELETE map to CRUD',
          'Use correct status codes',
          'Return JSON',
          'Noun-based URLs (/users/:id)',
        ],
        quiz: [
          {
            question: 'Which method creates a new resource?',
            options: ['GET', 'POST', 'DELETE', 'HEAD'],
            correctIndex: 1,
          },
          {
            question: 'Which status code means "Created"?',
            options: ['200', '201', '404', '500'],
            correctIndex: 1,
          },
          {
            question: 'PUT is supposed to be idempotent (calling it 5 times with the same data has the same effect as calling it once). Is POST /todos idempotent in the same way?',
            options: [
              'Yes, identical to PUT',
              'No — calling POST /todos 5 times typically creates 5 separate new todos, since POST means "create a new resource"',
              'POST and PUT are always identical',
              'Idempotency does not apply to REST APIs',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What makes an API RESTful?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'REST is an architectural style: resources are identified by URLs (nouns), standard HTTP methods express actions (GET/POST/PUT/DELETE), responses use appropriate status codes, communication is stateless (each request carries all it needs), and representations are usually JSON. Following these consistently makes the API predictable and cacheable.',
              hinglish:
                'REST ek architectural style hai: resources URLs (nouns) se identify hote hain, standard HTTP methods actions batate hain (GET/POST/PUT/DELETE), responses sahi status codes use karte hain, communication stateless hota hai (har request apne saath sab le ke aati hai), aur representations aksar JSON. Inhe consistently follow karne se API predictable aur cacheable banti hai.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Production Express',
    level: 'advanced',
    description: 'Error handling, auth aur security.',
    concepts: [
      {
        title: 'Error-Handling Middleware',
        difficulty: 'hard',
        tags: ['errors', 'middleware'],
        explanation: {
          english:
            'Express recognises error-handling middleware by its four arguments: (err, req, res, next). Define it last, after all routes. Pass errors to it by calling next(err) or (in Express 5) throwing in async handlers. Centralising error handling avoids repeating try/catch responses everywhere.',
          hinglish:
            'Express error-handling middleware ko uske chaar arguments se pehchanta hai: (err, req, res, next). Ise sabse last mein define karo, saari routes ke baad. Errors ise bhejne ke liye next(err) call karo ya (Express 5 mein) async handlers mein throw karo. Error handling centralise karne se har jagah try/catch responses repeat nahi karne padte.',
        },
        dailyLifeExample:
          'Error-handling middleware ek complaint desk jaisa hai jahan saari problems aakhir mein pahunchti hain — har counter pe alag se handle karne ke bajaye ek hi jagah sambhal lo.',
        codeExample:
          '// after all routes\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(err.status || 500).json({ error: err.message });\n});\n\n// trigger: next(new Error("Boom"))',
        keyPoints: [
          'Signature has 4 args: (err, req, res, next)',
          'Define it after all routes',
          'Trigger with next(err)',
          'Centralises error responses',
        ],
        quiz: [
          {
            question: 'How does Express identify error-handling middleware?',
            options: ['By its name', 'By having 4 arguments (err first)', 'By app.error()', 'By a flag'],
            correctIndex: 1,
          },
          {
            question: 'Error-handling middleware should be defined…',
            options: ['First', 'After all routes', 'Anywhere', 'In a separate server'],
            correctIndex: 1,
          },
          {
            question: 'In Express 4, does throwing an error inside an ASYNC route handler automatically reach your error-handling middleware?',
            options: [
              'Yes, always automatically',
              'No — only synchronous throws are caught automatically; async errors need you to catch them and call next(err) yourself (or use a wrapper)',
              'Only if you use res.json()',
              'Only in development mode',
            ],
            correctIndex: 1,
            explanation: 'Express 4 only automatically catches errors thrown SYNCHRONOUSLY inside a handler. A rejected Promise (including a thrown error inside an async function) is NOT automatically forwarded — see "Async Error Handling in Route Handlers" for the fix. Express 5 finally handles this automatically.',
          },
        ],
      },
      {
        title: 'Async Error Handling in Route Handlers',
        difficulty: 'hard',
        tags: ['errors', 'async'],
        explanation: {
          english:
            'In Express 4, if an async route handler throws (e.g. an awaited database call rejects), Express does NOT catch it automatically — the request hangs or the process can crash with an unhandled rejection. The classic fix: wrap every async handler in a try/catch that calls next(err), or use a small wrapper function that does this automatically so you do not repeat try/catch everywhere. (Express 5 finally catches these automatically, but understanding the wrapper pattern is still essential for Express 4 codebases, which are still very common.)',
          hinglish:
            'Express 4 mein, agar async route handler throw kare (jaise ek awaited database call reject ho jaaye), to Express use apne aap CATCH nahi karta — request hang ho jaati hai ya process unhandled rejection se crash ho sakta hai. Classic fix: har async handler ko try/catch mein wrap karo jo next(err) call kare, ya ek chhota wrapper function use karo jo ye apne aap kare taaki har jagah try/catch repeat na karna pade. (Express 5 aakhirkar inhe apne aap catch karta hai, par wrapper pattern samajhna abhi bhi zaroori hai Express 4 codebases ke liye, jo abhi bhi bahut common hain.)',
        },
        dailyLifeExample:
          'Ek async route handler bina try/catch ke ek bina net ke trapeze artist jaisa hai — agar gira (error aaya) to koi pakadne wala nahi, seedha neeche (crash/hang). asyncHandler wrapper ek safety net hai jo har baar automatically laga rehta hai.',
        codeExample:
          "// repetitive: try/catch in every handler\napp.get('/users/:id', async (req, res, next) => {\n  try {\n    const user = await User.findById(req.params.id);\n    if (!user) return res.status(404).json({ error: 'Not found' });\n    res.json(user);\n  } catch (err) {\n    next(err); // forward to error-handling middleware\n  }\n});\n\n// better: a reusable wrapper\nconst asyncHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);\n\napp.get('/users/:id', asyncHandler(async (req, res) => {\n  const user = await User.findById(req.params.id);\n  if (!user) return res.status(404).json({ error: 'Not found' });\n  res.json(user); // any thrown/rejected error is auto-forwarded to next()\n}));",
        keyPoints: [
          'Express 4 does NOT automatically catch errors thrown inside async handlers',
          'An uncaught rejection in an async handler can hang the request or crash the process',
          'Fix: wrap in try/catch and call next(err), or use a reusable asyncHandler wrapper',
          'The wrapper avoids repeating the same try/catch boilerplate in every route',
          'Express 5 catches these automatically, but the pattern still matters for Express 4 apps',
        ],
        quiz: [
          {
            question: "In Express 4, what happens if an async route handler's awaited call rejects and there is no try/catch?",
            options: ['Express automatically sends a 500 error', 'Express does NOT catch it automatically — it can hang the request or crash the process', 'The route silently returns an empty response', 'Nothing bad happens'],
            correctIndex: 1,
          },
          {
            question: 'What does an asyncHandler wrapper function do?',
            options: ['Speeds up the database call', 'Automatically catches errors from the async function and forwards them to next()', 'Deletes the request', 'Replaces middleware entirely'],
            correctIndex: 1,
          },
          {
            question: 'Why forward an error with next(err) instead of just letting it throw?',
            options: ['next(err) is required by JavaScript syntax', 'It routes the error to your centralized error-handling middleware instead of crashing unpredictably', 'It has no real purpose', 'It skips validation'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Authentication with JWT',
        difficulty: 'hard',
        tags: ['auth', 'jwt', 'security'],
        explanation: {
          english:
            'A common stateless auth flow: the user logs in, the server verifies credentials and signs a JWT (JSON Web Token) containing user info, and the client sends that token (usually in the Authorization header) on each request. Auth middleware verifies the token and attaches the user to req. Because JWTs are signed, the server can trust them without storing sessions.',
          hinglish:
            'Ek common stateless auth flow: user login karta hai, server credentials verify karke ek JWT (JSON Web Token) sign karta hai jisme user info hoti hai, aur client har request pe wo token bhejta hai (aksar Authorization header mein). Auth middleware token verify karke user ko req se attach karta hai. JWTs signed hone ke kaaran, server bina sessions store kiye unpe bharosa kar sakta hai.',
        },
        dailyLifeExample:
          'JWT ek event ke wristband jaisa hai — entry pe ek baar verify karke band mil gaya, phir har stall pe sirf band dikhao, dobara ID check nahi. Band tamper-proof (signed) hai.',
        codeExample:
          'const jwt = require("jsonwebtoken");\n\nfunction auth(req, res, next) {\n  const token = req.headers.authorization?.split(" ")[1];\n  if (!token) return res.status(401).json({ error: "No token" });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch { res.status(401).json({ error: "Invalid token" }); }\n}',
        keyPoints: [
          'Login -> server signs a JWT',
          'Client sends token in Authorization header',
          'Middleware verifies token, attaches req.user',
          'Stateless: no server-side session storage',
        ],
        quiz: [
          {
            question: 'Where is a JWT usually sent on each request?',
            options: ['The URL path', 'The Authorization header', 'A cookie name only', 'The body always'],
            correctIndex: 1,
          },
          {
            question: 'JWT auth is described as…',
            options: ['Stateful', 'Stateless', 'Session-based on server', 'Cookie-only'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Difference between session-based and JWT (token) authentication?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Session auth stores session state on the server (or a store like Redis) and gives the client a session id cookie; the server looks it up each request — easy to revoke but needs shared storage to scale. JWT auth is stateless: the signed token itself carries the claims, so any server can verify it without a lookup — scales well but is harder to revoke before expiry (you need denylists or short lifetimes + refresh tokens).',
              hinglish:
                'Session auth session state server pe (ya Redis jaise store mein) rakhta hai aur client ko session id cookie deta hai; server har request pe use look up karta hai — revoke karna aasaan par scale karne ke liye shared storage chahiye. JWT auth stateless hai: signed token khud claims rakhta hai, isliye koi bhi server bina lookup verify kar sakta hai — achha scale par expiry se pehle revoke karna mushkil (denylists ya short lifetimes + refresh tokens chahiye).',
            },
          },
        ],
      },
      {
        title: 'Security & Best Practices',
        difficulty: 'medium',
        tags: ['security', 'best-practices'],
        explanation: {
          english:
            'Harden Express apps: use helmet for secure headers, configure cors properly, validate and sanitise all input (e.g. with a validation library), never trust req.body, rate-limit endpoints, keep secrets in environment variables, and always validate on the server even if the client validates too.',
          hinglish:
            'Express apps ko secure karo: secure headers ke liye helmet, cors sahi configure karo, saara input validate aur sanitise karo (validation library se), req.body pe kabhi blind bharosa mat karo, endpoints ko rate-limit karo, secrets environment variables mein rakho, aur client validate kare tab bhi server pe hamesha validate karo.',
        },
        dailyLifeExample:
          'Security best practices ek ghar ke taale, CCTV aur ID-check jaise hain — ek layer kaafi nahi, kai layers milke surakshit banate hain.',
        codeExample:
          'const helmet = require("helmet");\napp.use(helmet());          // secure headers\napp.use(express.json({ limit: "10kb" })); // limit body size\n// validate input, rate-limit, keep secrets in env',
        keyPoints: [
          'helmet for secure HTTP headers',
          'Validate & sanitise all input',
          'Never trust the client; validate on server',
          'Rate-limit, limit body size, secrets in env',
        ],
        quiz: [
          {
            question: 'Which package sets secure HTTP headers?',
            options: ['cors', 'helmet', 'morgan', 'dotenv'],
            correctIndex: 1,
          },
          {
            question: 'You should validate input…',
            options: ['Only on the client', 'Always on the server (even if client does)', 'Never', 'Only for GET'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'File Uploads with Multer',
        difficulty: 'medium',
        tags: ['multer', 'files'],
        explanation: {
          english:
            'Regular express.json() cannot parse file uploads — files arrive as multipart/form-data, a different encoding. Multer is the standard Express middleware for handling this: it parses the multipart body, saves uploaded files (to disk or memory), and attaches file info to req.file (single) or req.files (multiple), while regular text fields still land in req.body.',
          hinglish:
            'Normal express.json() file uploads parse nahi kar sakta — files multipart/form-data ki tarah aati hain, ek alag encoding. Multer Express ka standard middleware hai isse handle karne ke liye: ye multipart body parse karta hai, uploaded files save karta hai (disk ya memory mein), aur file info ko req.file (single) ya req.files (multiple) se attach karta hai, jabki normal text fields req.body mein aate hain.',
        },
        dailyLifeExample:
          'Multer ek courier office jaisa hai jo alag-alag tarah ke parcels (files) receive karta hai, unhe sort karke sahi shelf (disk/storage) pe rakhta hai, aur ek receipt (req.file) deta hai jisme parcel ka naam-size-location likha hota hai.',
        codeExample:
          "const multer = require('multer');\nconst upload = multer({ dest: 'uploads/' }); // saves to an 'uploads' folder\n\n// single file upload from a form field named 'avatar'\napp.post('/profile', upload.single('avatar'), (req, res) => {\n  console.log(req.file);   // { filename, path, size, mimetype, ... }\n  console.log(req.body);   // other text fields, e.g. { name: 'Aman' }\n  res.json({ message: 'Uploaded', file: req.file.filename });\n});\n\n// multiple files from a field named 'photos'\napp.post('/gallery', upload.array('photos', 5), (req, res) => {\n  res.json({ count: req.files.length });\n});",
        keyPoints: [
          'File uploads use multipart/form-data, which express.json() cannot parse',
          'Multer is the standard middleware for handling file uploads in Express',
          'upload.single(field) for one file -> req.file',
          'upload.array(field, max) for multiple files -> req.files',
          'Regular text fields in the same form still appear in req.body',
        ],
        quiz: [
          {
            question: "Why can't express.json() handle a file upload form?",
            options: ['express.json() is deprecated', 'File uploads use multipart/form-data encoding, which express.json() does not parse', 'Files are too large for any middleware', 'There is no real reason'],
            correctIndex: 1,
          },
          {
            question: "After upload.single('avatar'), where do you find info about the uploaded file?",
            options: ['req.body.avatar', 'req.file', 'req.query.file', 'res.file'],
            correctIndex: 1,
          },
          {
            question: 'Which Multer method handles MULTIPLE files from one field?',
            options: ['upload.single()', 'upload.array()', 'upload.none()', 'upload.fields.one()'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between app.use() and app.get()?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'app.get() registers a handler for GET requests to a specific path. app.use() mounts middleware (or a router) that runs for all HTTP methods and, if a path is given, for that path and its sub-paths. In short: app.get is method+path specific; app.use is for middleware that applies broadly.',
      hinglish:
        'app.get() kisi specific path pe GET requests ke liye handler register karta hai. app.use() middleware (ya router) mount karta hai jo sabhi HTTP methods ke liye chalta hai aur, agar path diya ho, us path aur uske sub-paths ke liye. Short mein: app.get method+path specific hai; app.use broadly apply hone wale middleware ke liye hai.',
    },
    visual: 'middleware-chain',
    codeExample: {
      code: `// app.use — MIDDLEWARE. Matches a path PREFIX, any method.
app.use('/api', logger);
// runs for  GET /api          ✓
//           POST /api/users   ✓  (prefix match)
//           DELETE /api/x/y   ✓

// app.get — a ROUTE. Matches the path EXACTLY, GET only.
app.get('/api', handler);
// runs for  GET /api          ✓
//           GET /api/users    ✗  not an exact match
//           POST /api         ✗  wrong method

// With no path, use() runs for absolutely everything:
app.use(express.json());        // every request

// The other difference: middleware usually calls next() to
// continue; a route handler usually SENDS a response and ends
// the cycle.
app.use((req, res, next) => { req.time = Date.now(); next(); });
app.get('/', (req, res) => res.send('done'));   // ends here

// A route can call next() too, to fall through to the next
// matching handler:
app.get('/x', (req, res, next) => next(), (req, res) => res.send('2nd'));

// Rule of thumb: use() for cross-cutting concerns applied to a
// section, get/post/put/delete for specific endpoints.`,
      output: `done`,
    },
  },
  {
    question: 'How does Express handle requests under the hood?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Express wraps Node\'s http server. For each incoming request it runs a middleware stack in order — each function either responds, modifies req/res, or calls next() to continue. Route handlers are just middleware matched by method and path. The first one to send a response ends the cycle; unmatched requests fall through to 404 or error-handling middleware.',
      hinglish:
        'Express Node ke http server ko wrap karta hai. Har incoming request ke liye ye ek middleware stack order mein chalata hai — har function ya to respond karta hai, req/res modify karta hai, ya next() se aage badhta hai. Route handlers bas method aur path se match hone wale middleware hain. Jo pehla response bhejta hai wo cycle khatam karta hai; unmatched requests 404 ya error-handling middleware tak gir jaati hain.',
    },
    visual: 'middleware-chain',
    codeExample: {
      code: `// Express is a thin layer over Node's http module.
const http = require('node:http');
const app = express();
http.createServer(app).listen(3000);   // app is just a function

// What happens on a request:
// 1. Node's http module parses it and creates req and res
// 2. Express EXTENDS them — adding req.params, res.json, etc.
// 3. It walks its middleware stack IN ORDER
// 4. For each layer it checks: does the path and method match?
// 5. If yes, run it. The layer either responds or calls next()
// 6. next() moves to the next matching layer
// 7. next(err) SKIPS ahead to the error handler

// The stack is literally an array:
app._router.stack;    // [Layer, Layer, Layer …]

// Which is why ORDER is everything, and why this fails:
app.get('/users', handler);      // reads req.body
app.use(express.json());         // ✗ registered too late

// And why an unmatched request hangs rather than 404s if you
// write middleware that never calls next() and never responds.

// Express adds no magic — it is routing plus a middleware
// pipeline over the same req and res Node gave you.`,
      output: `server listening on :3000`,
    },
  },
  {
    question: 'What is Express.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Express is a minimal, unopinionated web framework for Node.js, built on top of the core `http` module. It adds the essentials every web server needs — routing (mapping URLs+methods to handlers), middleware (a chain of functions processing each request), request/response helper methods (`req.body`, `res.json()`), and error handling — without forcing a specific project structure or database choice. It has been the de facto standard Node.js framework for over a decade and underpins many higher-level frameworks (NestJS builds on it).',
      hinglish:
        'Express Node.js ke liye ek minimal, unopinionated web framework hai, core `http` module ke upar built. Ye har web server ko chahiye wo essentials add karta hai — routing (URLs+methods ko handlers se map karna), middleware (functions ki ek chain jo har request process karti hai), request/response helper methods (`req.body`, `res.json()`), aur error handling — bina koi specific project structure ya database choice force kiye. Ye ek dahai se zyada se de facto standard Node.js framework raha hai aur bahut saare higher-level frameworks ka base hai (NestJS iske upar built hai).',
    },
    codeExample: {
      code: `// A minimal, unopinionated web framework for Node — routing
// and middleware over the built-in http module.

const express = require('express');
const app = express();

app.use(express.json());
app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id });
});
app.listen(3000);

// What it gives you that raw http does not:
//   • routing with parameters and patterns
//   • a middleware pipeline
//   • body and query parsing
//   • res.json, res.status, res.redirect, res.sendFile
//   • a real error-handling path

// What it deliberately does NOT give you:
//   • an ORM or database layer
//   • authentication
//   • validation
//   • any project structure or CLI
//   • opinions about folders

// That minimalism is why it has lasted, and also why every
// team assembles its own stack around it. Compare Nest or
// Rails, which decide all of that for you.

// It is still the most widely used Node framework, though
// Fastify wins on raw throughput and Hono on edge runtimes.`,
      output: `{ "id": "42" }`,
    },
  },
  {
    question: 'How do you create an Express server?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Basic setup: `import express from "express"; const app = express(); app.get("/", (req, res) => res.send("Hello")); app.listen(3000, () => console.log("Server running"));`. `express()` creates the app instance, `.get()`/`.post()`/etc. register route handlers, and `.listen(port)` starts the underlying HTTP server on that port. Middleware like `express.json()` is typically added with `app.use()` before defining routes.',
      hinglish:
        'Basic setup: `import express from "express"; const app = express(); app.get("/", (req, res) => res.send("Hello")); app.listen(3000, () => console.log("Server running"));`. `express()` app instance banata hai, `.get()`/`.post()`/etc. route handlers register karte hain, aur `.listen(port)` us port pe underlying HTTP server start karta hai. `express.json()` jaisa middleware typically routes define karne se pehle `app.use()` se add hota hai.',
    },
    codeExample: {
      code: `npm init -y
npm install express

// index.js
import express from 'express';          // needs "type":"module"
const app = express();

app.use(express.json());                // parse JSON bodies

app.get('/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT ?? 3000;  // hosts assign the port
app.listen(port, () => console.log('listening on ' + port));

// package.json
{
  "type": "module",
  "scripts": { "dev": "node --watch index.js" }
}

// Three things beginners miss:

// 1. Hardcoding the port. Vercel, Render and Heroku set PORT
//    themselves — a hardcoded 3000 fails the health check.

// 2. Forgetting express.json(), then wondering why req.body
//    is undefined on every POST.

// 3. No graceful shutdown:
const server = app.listen(port);
process.on('SIGTERM', () => server.close(() => process.exit(0)));

// --watch is built into Node 18+, so nodemon is optional now.`,
      output: `listening on 3000`,
    },
  },
  {
    question: 'What is middleware in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Middleware is a function with the signature `(req, res, next)` that executes during the request-response cycle, with access to modify `req`/`res`, end the request, or pass control to the next middleware by calling `next()`. Middleware forms a CHAIN — request-parsing, authentication, logging, and route handlers themselves are all just middleware functions run in the order they were registered with `app.use()`/`app.get()`, etc.',
      hinglish:
        'Middleware ek function hai `(req, res, next)` signature ke saath jo request-response cycle ke dauraan execute hota hai, `req`/`res` modify karne, request end karne, ya `next()` call karke control agle middleware ko pass karne ke access ke saath. Middleware ek CHAIN banata hai — request-parsing, authentication, logging, aur route handlers khud sab bas middleware functions hain jo `app.use()`/`app.get()`, etc. se register hone ke order mein chalte hain.',
    },
    visual: 'middleware-chain',
    codeExample: {
      code: `// A function that runs BETWEEN the request arriving and the
// response being sent. It receives (req, res, next).

function logger(req, res, next) {
  console.log(req.method, req.url);
  next();                    // ← pass control along
}
app.use(logger);

// A middleware has exactly three choices:
//   1. call next()          → continue to the next layer
//   2. send a response      → END the cycle here
//   3. call next(err)       → jump to the error handler

// Do none of those and the request HANGS until the client
// times out — the most common Express bug:
app.use((req, res, next) => {
  console.log('hi');         // ✗ forgot next() — nothing responds
});

// Middleware can modify req and res, which is how everything
// downstream gets its data:
app.use((req, res, next) => { req.user = decode(req.headers.auth); next(); });
app.get('/me', (req, res) => res.json(req.user));   // available here

// Scope it to a path or a single route:
app.use('/admin', requireAdmin);              // a whole section
app.get('/me', authenticate, handler);        // one route`,
      output: `GET /me`,
    },
  },
  {
    question: 'What are the types of middleware in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Five types: (1) Application-level — bound via `app.use()`/`app.METHOD()`, runs for the whole app. (2) Router-level — same, but bound to an `express.Router()` instance instead of the app. (3) Error-handling — has 4 parameters `(err, req, res, next)`, registered last, catches errors from anywhere in the chain. (4) Built-in — Express\'s own, like `express.json()` and `express.static()`. (5) Third-party — installed via npm, like `cors`, `helmet`, `morgan`.',
      hinglish:
        'Paanch types: (1) Application-level — `app.use()`/`app.METHOD()` se bound, poori app ke liye chalta hai. (2) Router-level — same, par app ke bajaye ek `express.Router()` instance se bound. (3) Error-handling — 4 parameters `(err, req, res, next)` ke saath, sabse aakhir mein register hota hai, chain mein kahin bhi se errors catch karta hai. (4) Built-in — Express ka apna, jaise `express.json()` aur `express.static()`. (5) Third-party — npm se install hota hai, jaise `cors`, `helmet`, `morgan`.',
    },
    visual: 'middleware-chain',
    codeExample: {
      code: `// 1. APPLICATION-level — runs for the whole app
app.use(express.json());
app.use('/api', logger);            // or scoped to a prefix

// 2. ROUTER-level — the same, but on a Router instance
const router = express.Router();
router.use(requireAuth);            // only this router
router.get('/', handler);
app.use('/admin', router);

// 3. ROUTE-level — one or more, on a single endpoint
app.get('/me', authenticate, validate, handler);

// 4. ERROR-handling — FOUR arguments, and that is how Express
//    recognises it. It must be registered LAST.
app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({ error: err.message });
});
// Drop the unused next and it silently becomes normal
// middleware that never runs for errors:
app.use((err, req, res) => {});     // ✗ broken

// 5. BUILT-IN — shipped with Express
express.json();  express.urlencoded();  express.static('public');

// 6. THIRD-PARTY — from npm
cors();  helmet();  morgan('dev');  compression();`,
      output: `{ "error": "Not found" }`,
    },
  },
  {
    question: 'What is express.json()?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`express.json()` is Express\'s built-in middleware that parses incoming requests with a `Content-Type: application/json` header, converting the raw JSON body into a JavaScript object accessible as `req.body`. Without it, `req.body` would be `undefined` for JSON requests — it MUST be added with `app.use(express.json())` before any route handlers that need to read `req.body`.',
      hinglish:
        '`express.json()` Express ka built-in middleware hai jo `Content-Type: application/json` header wali incoming requests parse karta hai, raw JSON body ko ek JavaScript object mein convert karke `req.body` ke roop mein accessible banata hai. Iske bina, `req.body` JSON requests ke liye `undefined` hoga — ise `app.use(express.json())` se add karna ZAROORI hai kisi bhi aise route handler se pehle jise `req.body` padhna hai.',
    },
    codeExample: {
      code: `app.use(express.json());

// Without it, req.body is undefined on every POST and PUT:
app.post('/users', (req, res) => {
  console.log(req.body);      // undefined ✗
});

// What it actually does: reads the request STREAM chunk by
// chunk, buffers it, and JSON.parses the result onto req.body —
// but only when Content-Type is application/json.
let body = '';
req.on('data', c => body += c);
req.on('end', () => req.body = JSON.parse(body));   // roughly this

// Options worth setting:
express.json({ limit: '10kb' });        // reject huge payloads
express.json({ strict: true });         // only objects and arrays

// The limit matters: without one, a client can send a 500MB
// body and exhaust your memory.

// Malformed JSON throws, so handle it:
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) return res.status(400).json({ error: 'bad JSON' });
  next(err);
});

// It replaced body-parser, which is no longer a separate
// install — express.json() IS body-parser, built in since 4.16.`,
      output: `{ name: 'Asha' }`,
    },
  },
  {
    question: 'What is express.urlencoded()?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`express.urlencoded({ extended: true })` is built-in middleware that parses requests with `Content-Type: application/x-www-form-urlencoded` — the format used by traditional HTML `<form>` submissions — into `req.body`. `extended: true` uses the `qs` library allowing rich objects/arrays to be parsed; `extended: false` uses the simpler built-in `querystring` library, only supporting flat key-value pairs.',
      hinglish:
        '`express.urlencoded({ extended: true })` built-in middleware hai jo `Content-Type: application/x-www-form-urlencoded` wali requests ko parse karta hai — traditional HTML `<form>` submissions ka format — `req.body` mein. `extended: true` `qs` library use karta hai jo rich objects/arrays parse karne deti hai; `extended: false` simpler built-in `querystring` library use karta hai, sirf flat key-value pairs support karte hue.',
    },
    codeExample: {
      code: `app.use(express.urlencoded({ extended: true }));

// Parses HTML FORM submissions — Content-Type
// application/x-www-form-urlencoded, which is what a plain
// <form method="post"> sends.

// The browser sends:  name=Asha&age=25
// You get:            req.body = { name: 'Asha', age: '25' }
// Note: values are always STRINGS.

// extended explained:
//   false → uses Node's querystring, flat values only
//   true  → uses qs, supports nested objects and arrays
// user[name]=Asha&user[age]=25
//   extended:true  → { user: { name: 'Asha', age: '25' } }
//   extended:false → { 'user[name]': 'Asha', … }

// You usually want both parsers registered:
app.use(express.json());                            // fetch, axios
app.use(express.urlencoded({ extended: true }));    // HTML forms

// It does NOT handle file uploads — those are multipart/form-data
// and need multer:
app.post('/upload', multer().single('file'), handler);

// Set a limit here too, for the same reason as json():
express.urlencoded({ extended: true, limit: '10kb' });`,
      output: `{ name: 'Asha', age: '25' }`,
    },
  },
  {
    question: 'What is next() in Express?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`next` is a function passed to every middleware/route handler that, when called, passes control to the NEXT middleware in the chain. If a middleware doesn\'t call `next()` (and doesn\'t send a response either), the request HANGS forever — the client just waits with no response. Calling `next(error)` (with an argument) skips all remaining regular middleware and jumps directly to the nearest error-handling middleware.',
      hinglish:
        '`next` ek function hai jo har middleware/route handler ko pass hota hai jo, call hone pe, control chain ke NEXT middleware ko pass karta hai. Agar ek middleware `next()` call nahi karta (aur response bhi nahi bhejta), request hamesha ke liye HANG ho jaati hai — client bina response ke wait karta rehta hai. `next(error)` call karna (ek argument ke saath) baaki saare regular middleware skip kar deta hai aur directly nearest error-handling middleware pe jump karta hai.',
    },
    visual: 'middleware-chain',
    codeExample: {
      code: `// next() hands control to the NEXT matching layer.
app.use((req, res, next) => {
  req.startTime = Date.now();
  next();                       // continue
});

// Three forms:
next();          // go to the next middleware
next(err);       // SKIP to the error handler
next('route');   // skip the remaining handlers of THIS route only

// Forgetting it is the classic hang:
app.use((req, res, next) => {
  console.log('logged');        // ✗ no next(), no response
});                             //   → the request never finishes

// Calling it AFTER responding causes the other classic error:
app.get('/', (req, res, next) => {
  res.send('ok');
  next();                       // ✗ a later layer may respond again
});                             //   → "Cannot set headers after…"
// Always return when you respond:
if (!user) return res.status(404).send('nope');

// In an async handler, errors do NOT reach next automatically
// in Express 4 — you must forward them:
app.get('/x', async (req, res, next) => {
  try { res.json(await load()); } catch (e) { next(e); }
});
// Express 5 does this for you.`,
      output: `logged`,
    },
  },
  {
    question: 'What is Router in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`express.Router()` creates a mini, mountable Express app — a self-contained set of routes and middleware that can be defined in a SEPARATE file and mounted onto the main app with `app.use("/api/users", userRouter)`. This is essential for organising large apps: instead of one giant file with all routes, each resource (users, courses, orders) gets its own router file, keeping routing logic modular and maintainable.',
      hinglish:
        '`express.Router()` ek mini, mountable Express app banata hai — routes aur middleware ka ek self-contained set jo ek SEPARATE file mein define ho sakta hai aur main app pe `app.use("/api/users", userRouter)` se mount ho sakta hai. Ye bade apps organise karne ke liye essential hai: saare routes wali ek giant file ke bajaye, har resource (users, courses, orders) ki apni router file hoti hai, routing logic ko modular aur maintainable rakhte hue.',
    },
    codeExample: {
      code: `// A Router is a mini-app: its own middleware and routes,
// mounted onto the main app at a path.

// routes/users.js
const router = express.Router();
router.use(requireAuth);                  // applies to this router only
router.get('/',    listUsers);            // → GET  /api/users
router.get('/:id', getUser);              // → GET  /api/users/:id
router.post('/',   createUser);
export default router;

// app.js
app.use('/api/users', usersRouter);       // the prefix lives here

// Why it matters: without routers a real app becomes one
// enormous file, and the URL prefix is repeated on every line.

// The mount path is stripped inside the router — that is why
// the route above is '/' and not '/api/users'.

// Two things worth knowing:
// 1. router.use() order applies within the router, and the
//    router's position in app.use() order matters too.
// 2. By default a Router does NOT inherit params from its
//    mount path:
const r = express.Router({ mergeParams: true });
app.use('/users/:userId/posts', r);
r.get('/', (req) => req.params.userId);   // needs mergeParams

// A sub-app (app.use(path, anotherApp)) is heavier — its own
// settings and view engine. Routers cover nearly every case.`,
      output: `GET /api/users/42`,
    },
  },
  {
    question: 'What is the difference between PUT and PATCH?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PUT replaces the ENTIRE resource — the request body should contain the FULL representation of the resource, and any field not included is typically expected to be cleared/reset. PATCH applies a PARTIAL update — the request body contains only the fields that should change, leaving everything else untouched. Practically: `PUT /users/1` with `{ name: "Ravi" }` might wipe out the user\'s existing email if the API implements PUT strictly, while `PATCH /users/1` with the same body only updates the name.',
      hinglish:
        'PUT POORE resource ko replace karta hai — request body mein resource ki POORI representation honi chahiye, aur koi bhi field jo include nahi hai typically clear/reset hone ki expectation hoti hai. PATCH ek PARTIAL update apply karta hai — request body mein sirf wo fields hote hain jo change hone chahiye, baaki sab untouched chhodte hue. Practically: `PUT /users/1` with `{ name: "Ravi" }` user ka existing email wipe kar sakta hai agar API PUT strictly implement kare, jabki `PATCH /users/1` same body ke saath sirf name update karta hai.',
    },
    codeExample: {
      code: `// PUT REPLACES the whole resource.
PUT /users/1  { "name": "Asha" }
// Any field you omit is cleared. email is now gone.
// That is what makes PUT idempotent — sending it twice gives
// the same result.

// PATCH applies a PARTIAL update.
PATCH /users/1  { "name": "Asha" }
// Only name changes; email is untouched.

// In Express:
app.put('/users/:id', async (req, res) => {
  const user = await User.findOneAndReplace(
    { _id: req.params.id },
    req.body                                 // full replacement
  );
  res.json(user);
});

app.patch('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },                      // merge
    { new: true }
  );
  res.json(user);
});

// The bug people ship: a PUT route implemented with $set. It
// behaves like PATCH, so a client that correctly sends only the
// changed field silently keeps the rest — until one client
// sends a full object and wipes something.

// Document which one you actually implemented, and validate
// the body either way.`,
      output: `{ "id": "1", "name": "Asha" }`,
    },
  },
  {
    question: 'What is the difference between GET and POST?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'GET requests data and should be safe (no side effects) and idempotent (calling it multiple times has the same effect as once) — its parameters go in the URL (query string) and it can be cached/bookmarked. POST submits data to create something or trigger a side effect, is NOT idempotent (calling it twice may create two records), and its data goes in the request body, not the URL — making it suitable for larger payloads and data that shouldn\'t appear in browser history or server logs.',
      hinglish:
        'GET data request karta hai aur safe hona chahiye (koi side effects nahi) aur idempotent (isse multiple baar call karna ek baar call karne jaisa hi effect deta hai) — iske parameters URL (query string) mein jaate hain aur ye cache/bookmark ho sakta hai. POST data submit karta hai kuch create karne ya side effect trigger karne ke liye, idempotent NAHI hai (do baar call karne se do records ban sakte hain), aur iska data request body mein jaata hai, URL mein nahi — jo ise bade payloads aur aise data ke liye suitable banata hai jo browser history ya server logs mein nahi dikhna chahiye.',
    },
    codeExample: {
      code: `// GET — data goes in the URL
GET /search?q=laptop&page=2
app.get('/search', (req, res) => {
  req.query;        // { q: 'laptop', page: '2' }  ← always strings
});
// • bookmarkable and shareable
// • cached by browsers and proxies
// • logged in server logs and browser history
// • length-limited (~2000 chars in practice)
// • must be SAFE — never create, update or delete

// POST — data goes in the request BODY
app.post('/users', (req, res) => {
  req.body;         // { name: 'Asha' }  ← needs express.json()
});
// • not cached, not logged in URLs
// • no practical size limit
// • not idempotent — posting twice creates two records

// So: never put a password or token in a query string. It ends
// up in logs, history, and the Referer header of the next page.

// And never change state from a GET:
app.get('/users/:id/delete', …)    // ✗ a crawler will call it
app.delete('/users/:id', …)        // ✓

// GET is idempotent and safe. POST is neither, which is why
// double-submitting a form creates duplicates unless you add
// an idempotency key.`,
      output: `{ q: 'laptop', page: '2' }`,
    },
  },
  {
    question: 'What are route parameters?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Route parameters are named URL segments prefixed with `:` that capture dynamic values as part of the path: `app.get("/users/:id", (req, res) => { const id = req.params.id; })` — visiting `/users/42` gives `req.params.id === "42"`. They are used to identify a SPECIFIC resource (a single user, a single order) as part of a RESTful URL, as opposed to query parameters which typically filter/modify a collection.',
      hinglish:
        'Route parameters `:` se prefixed named URL segments hain jo dynamic values ko path ke part ke roop mein capture karte hain: `app.get("/users/:id", (req, res) => { const id = req.params.id; })` — `/users/42` visit karne se `req.params.id === "42"` milta hai. Ye ek SPECIFIC resource identify karne ke liye use hote hain (ek single user, ek single order) ek RESTful URL ke part ke roop mein, query parameters ke ulat jo typically ek collection ko filter/modify karte hain.',
    },
    codeExample: {
      code: `// Named segments of the path, marked with a colon.
app.get('/users/:id', (req, res) => {
  req.params.id;            // '42' for /users/42  — a STRING
});

// Several at once:
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
});

// Always strings — convert and validate:
const id = Number(req.params.id);
if (!Number.isInteger(id)) return res.status(400).json({ error: 'bad id' });

// Optional (Express 4 syntax; Express 5 changed this):
app.get('/posts/:year/:month?', …);

// A named wildcard, for catch-alls:
app.get('/files/*path', (req, res) => req.params.path);

// ORDER matters — a static route must come before a dynamic one
// that would also match:
app.get('/users/me', …);      // ✓ first
app.get('/users/:id', …);     // otherwise :id captures 'me'

// Reusable validation with app.param:
app.param('id', async (req, res, next, id) => {
  req.user = await User.findById(id);
  if (!req.user) return res.status(404).send();
  next();
});

// Do not confuse them with query parameters: params identify a
// resource, query filters or sorts it.`,
      output: `42`,
    },
  },
  {
    question: 'What are query parameters?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Query parameters are the key-value pairs after `?` in a URL (e.g. `/products?category=shoes&sort=price`), accessible via `req.query` in Express (`req.query.category === "shoes"`). They are typically used for OPTIONAL modifiers — filtering, sorting, pagination — on a resource, rather than identifying a specific resource (which route parameters do). Unlike route parameters, they are all optional by default and Express parses them automatically as strings.',
      hinglish:
        'Query parameters URL mein `?` ke baad ke key-value pairs hain (jaise `/products?category=shoes&sort=price`), Express mein `req.query` se accessible (`req.query.category === "shoes"`). Ye typically OPTIONAL modifiers ke liye use hote hain — filtering, sorting, pagination — ek resource pe, ek specific resource identify karne ke bajaye (jo route parameters karte hain). Route parameters ke ulat, ye default se sab optional hote hain aur Express unhe automatically strings ke roop mein parse karta hai.',
    },
    codeExample: {
      code: `// Everything after the ? in a URL.
// GET /products?category=laptop&min=500&sort=-price
app.get('/products', (req, res) => {
  const { category, min, sort } = req.query;
  // { category: 'laptop', min: '500', sort: '-price' }
});

// Always STRINGS — the number-one source of bugs here:
const min = Number(req.query.min);                 // 500
const inStock = req.query.stock === 'true';        // not Boolean()
// Boolean('false') is TRUE.

// Repeated keys become an array, which can surprise you:
// ?tag=a&tag=b  → req.query.tag = ['a','b']
// ?tag=a        → req.query.tag = 'a'
const tags = [].concat(req.query.tag ?? []);       // normalise

// WHITELIST anything you pass to a database. Never do this:
Product.find(req.query);                            // ✗ injection
// A client can send ?price[$gt]= and query whatever it likes.

// Validate with a schema instead:
const q = z.object({
  category: z.string().optional(),
  min: z.coerce.number().min(0).optional(),
  page: z.coerce.number().default(1),
}).parse(req.query);

// Use params to IDENTIFY a resource, query to FILTER, SORT or
// PAGINATE it.`,
      output: `{ category: 'laptop', min: 500 }`,
    },
  },
  {
    question: 'How do you serve static files in Express?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`app.use(express.static("public"))` serves files from the `public` folder directly — a request to `/logo.png` automatically serves `public/logo.png` without needing an explicit route for every file. This is the built-in way to serve images, CSS, client-side JS, and other static assets without writing custom handlers, and it can be mounted at a URL prefix: `app.use("/static", express.static("public"))` serves the same files under `/static/logo.png`.',
      hinglish:
        '`app.use(express.static("public"))` `public` folder se files directly serve karta hai — `/logo.png` ki request automatically `public/logo.png` serve karti hai bina har file ke liye explicit route ki zaroorat ke. Ye images, CSS, client-side JS, aur doosre static assets serve karne ka built-in tareeka hai bina custom handlers likhe, aur ye ek URL prefix pe mount ho sakta hai: `app.use("/static", express.static("public"))` same files ko `/static/logo.png` ke under serve karta hai.',
    },
    codeExample: {
      code: `app.use(express.static('public'));
// public/style.css  →  GET /style.css
// The folder name is NOT part of the URL.

// Mount under a prefix instead:
app.use('/assets', express.static('public'));
// public/style.css  →  GET /assets/style.css

// Always use an absolute path — a relative one is resolved
// from the CURRENT WORKING DIRECTORY, so it breaks when the
// app is started from elsewhere:
import path from 'node:path';
app.use(express.static(path.join(__dirname, 'public')));   // ✓

// Caching options for production:
express.static('public', {
  maxAge: '1y',           // long cache for hashed filenames
  etag: true,
  index: false,           // do not auto-serve index.html
});

// Order matters — put it before your routes, or a catch-all
// will swallow the requests.

// Serving a single-page app: static first, then a catch-all
// for client-side routes, and API routes BEFORE both:
app.use('/api', apiRouter);                       // ✓ first
app.use(express.static('dist'));
app.get('*name', (req, res) => res.sendFile(indexHtml));

// In production a CDN or Nginx serves static files far better —
// Node should not be spending cycles on them.`,
      output: `GET /style.css  200`,
    },
  },
  {
    question: 'How do you handle errors in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Define an error-handling middleware LAST, after all other `app.use()`/routes, with exactly 4 parameters: `app.use((err, req, res, next) => { res.status(err.status || 500).json({ message: err.message }); });`. Express automatically routes any error to it if you call `next(err)` in a route/middleware, or if a synchronous handler throws. For async route handlers, you must catch errors and call `next(err)` explicitly (or use a wrapper utility), since Express does not automatically catch rejected Promises in older versions.',
      hinglish:
        'Ek error-handling middleware LAST mein define karo, baaki saare `app.use()`/routes ke baad, exactly 4 parameters ke saath: `app.use((err, req, res, next) => { res.status(err.status || 500).json({ message: err.message }); });`. Express automatically kisi bhi error ko iske paas route karta hai agar tum ek route/middleware mein `next(err)` call karo, ya agar ek synchronous handler throw kare. Async route handlers ke liye, tumhe errors catch karke `next(err)` explicitly call karna padta hai (ya ek wrapper utility use karo), kyunki Express purane versions mein automatically rejected Promises catch nahi karta.',
    },
    visual: 'middleware-chain',
    codeExample: {
      code: `// An error handler has FOUR parameters. That signature is how
// Express recognises it, and it must be registered LAST.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).json({
    error: err.status ? err.message : 'Internal error',
  });
});
// Omit the unused next and it becomes ordinary middleware that
// never sees errors:
app.use((err, req, res) => {});          // ✗ silently broken

// Reaching it — synchronous throws are caught automatically:
app.get('/a', () => { throw new Error('boom'); });      // ✓

// ASYNC throws are NOT, in Express 4:
app.get('/b', async () => { throw new Error('boom'); });
// ✗ unhandled rejection, the request hangs
app.get('/b', async (req, res, next) => {
  try { … } catch (e) { next(e); }                      // ✓
});
// Express 5 forwards rejected promises for you.

// A wrapper avoids the repetition:
const wrap = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
app.get('/c', wrap(async (req, res) => { … }));

// Never leak internals in production — send a generic message
// and a correlation id, and log the stack server-side.`,
      output: `{ "error": "Internal error" }`,
    },
  },
  {
    question: 'What is express-session?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`express-session` is middleware that gives Express server-side, cookie-based session support — it creates a unique session ID, stores it in a cookie sent to the browser, and keeps the actual session DATA on the server (by default in memory, but a real store like Redis is required in production). This enables stateful features like "remember the logged-in user across requests" — an alternative approach to the stateless, token-based JWT authentication.',
      hinglish:
        '`express-session` ek middleware hai jo Express ko server-side, cookie-based session support deta hai — ye ek unique session ID banata hai, ise browser ko bheji gayi cookie mein store karta hai, aur actual session DATA server pe rakhta hai (default se memory mein, par production mein Redis jaisa real store zaroori hai). Ye stateful features enable karta hai jaise "logged-in user ko requests ke across yaad rakhna" — stateless, token-based JWT authentication ka ek alternative approach.',
    },
    codeExample: {
      code: `import session from 'express-session';

app.use(session({
  secret: process.env.SESSION_SECRET,   // signs the cookie
  resave: false,                        // do not rewrite unchanged
  saveUninitialized: false,             // do not store empty sessions
  cookie: {
    httpOnly: true,                     // JS cannot read it
    secure: true,                       // HTTPS only
    sameSite: 'lax',                    // CSRF mitigation
    maxAge: 1000 * 60 * 60 * 24,
  },
  store: new RedisStore({ client }),    // ← important, see below
}));

// Usage:
req.session.userId = user.id;
req.session.destroy();

// How it works: only a signed session ID goes in the cookie.
// The actual data lives on the server, keyed by that ID.

// The mistake that breaks in production: the DEFAULT store is
// in MEMORY. It leaks, it is wiped on restart, and it does not
// work across multiple instances — a user gets logged out
// whenever the load balancer sends them to another process.
// Use Redis.

// Sessions vs JWT: sessions are revocable instantly (delete the
// row) but need a shared store. JWTs need no lookup but cannot
// be revoked before expiry.`,
      output: `req.session.userId = '42'`,
    },
  },
  {
    question: 'What is cookie-parser?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`cookie-parser` is middleware that reads the `Cookie` header from incoming requests and parses it into a convenient `req.cookies` object, so you don\'t have to manually parse the raw cookie string. It also supports SIGNED cookies (`req.signedCookies`) using a secret, which lets the server verify a cookie hasn\'t been tampered with by the client. Note: it is for READING cookies from requests — setting cookies on responses uses `res.cookie()`, which Express supports natively.',
      hinglish:
        '`cookie-parser` ek middleware hai jo incoming requests se `Cookie` header padhta hai aur ise ek convenient `req.cookies` object mein parse karta hai, isliye tumhe raw cookie string manually parse nahi karni padti. Ye SIGNED cookies (`req.signedCookies`) bhi support karta hai ek secret use karke, jo server ko verify karne deta hai ki cookie client ne tamper nahi ki. Note: ye requests se cookies PADHNE ke liye hai — responses pe cookies SET karne ke liye `res.cookie()` use hota hai, jo Express natively support karta hai.',
    },
    codeExample: {
      code: `import cookieParser from 'cookie-parser';
app.use(cookieParser());

// Without it, cookies are one raw string you must parse:
req.headers.cookie;      // 'theme=dark; sid=abc'

// With it:
req.cookies;             // { theme: 'dark', sid: 'abc' }

// Signed cookies detect tampering:
app.use(cookieParser(process.env.COOKIE_SECRET));
res.cookie('userId', '42', { signed: true });
req.signedCookies.userId;   // '42', or false if it was altered
// Note: signing proves it was not CHANGED. It does not encrypt —
// the value is still readable by the user.

// Setting one securely:
res.cookie('token', jwt, {
  httpOnly: true,      // JavaScript cannot read it → XSS-safe
  secure: true,        // HTTPS only
  sameSite: 'strict',  // not sent cross-site → CSRF mitigation
  maxAge: 900000,
});

res.clearCookie('token');

// Note express.json() and friends do NOT parse cookies, and
// Express has no built-in cookie parser for reading — but
// res.cookie() for WRITING is built in.

// For auth tokens, an httpOnly cookie beats localStorage:
// any XSS on your page can read localStorage; it cannot read
// an httpOnly cookie.`,
      output: `{ theme: 'dark', sid: 'abc' }`,
    },
  },

  // ─── Core Express ───────────────────────────────────────────
  {
    question: 'What is the request-response cycle in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A request enters the middleware stack and passes through each matching layer in REGISTRATION ORDER. Each middleware may modify `req`/`res`, end the cycle by sending a response, or call `next()` to continue. The cycle ends the moment any handler sends a response — anything after that is too late (and calling `res.send()` twice throws "Cannot set headers after they are sent"). If no handler responds and nothing calls `next()`, the request simply HANGS until the client times out.',
      hinglish:
        'Ek request middleware stack mein aati hai aur har matching layer se REGISTRATION ORDER mein guzarti hai. Har middleware `req`/`res` modify kar sakta hai, ek response bhej kar cycle khatam kar sakta hai, ya continue karne ke liye `next()` call kar sakta hai. Cycle us pal khatam hoti hai jab koi handler ek response bhejta hai — uske baad kuch bhi bahut der ho chuki hoti hai (aur `res.send()` do baar call karna "Cannot set headers after they are sent" throw karta hai). Agar koi handler respond na kare aur kuch `next()` call na kare, request simply HANG ho jaati hai jab tak client timeout na ho.',
    },
    visual: 'middleware-chain',
    codeExample: {
      code: `// A request enters the stack and walks it in REGISTRATION order.
app.use(logger);            // 1
app.use(express.json());    // 2
app.get('/x', handler);     // 3 — responds
app.use(errorHandler);      // never reached if 3 responded

// Each layer does one of three things:
//   next()      → continue
//   res.send()  → END the cycle
//   next(err)   → jump to the error handler

// The cycle ends the MOMENT anything sends a response.
// Sending twice throws:
res.send('a');
res.send('b');   // ✗ Cannot set headers after they are sent

// So always return when you respond:
if (!user) return res.status(404).send('nope');   // ✓

// And if nothing responds AND nothing calls next(), the request
// simply HANGS until the client times out. That is the most
// common Express bug and it produces no error at all.

// Useful hook for measuring the whole cycle:
app.use((req, res, next) => {
  const t = Date.now();
  res.on('finish', () => console.log(req.url, Date.now() - t + 'ms'));
  next();
});`,
      output: `GET /x 4ms`,
    },
  },
  {
    question: 'Does middleware order matter in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Enormously — Express executes middleware strictly in the order it was registered. `express.json()` must come BEFORE any route reading `req.body`, or the body will be undefined. Authentication must come before protected routes. Error-handling middleware must come LAST, since it only catches errors from layers registered before it. And a catch-all 404 handler must sit after all real routes, otherwise it swallows everything. Most "my middleware is not running" bugs are ordering bugs.',
      hinglish:
        'Enormously — Express middleware ko strictly usi order mein execute karta hai jisme register hua. `express.json()` kisi bhi `req.body` padhne wale route se PEHLE aana chahiye, warna body undefined hogi. Authentication protected routes se pehle aana chahiye. Error-handling middleware SABSE AAKHIR mein aana chahiye, kyunki ye sirf apne se pehle register hui layers se errors catch karta hai. Aur ek catch-all 404 handler saare real routes ke baad baithna chahiye, warna wo sab kuch nigal jaata hai. Zyadatar "mera middleware chal nahi raha" bugs ordering bugs hain.',
    },
    visual: 'middleware-chain',
    codeExample: {
      code: `// Enormously. Express runs middleware in REGISTRATION order.

// ✗ Broken — the parser is registered after the route
app.post('/users', (req, res) => res.json(req.body));  // undefined
app.use(express.json());

// ✓ Correct
app.use(express.json());
app.post('/users', (req, res) => res.json(req.body));

// The rules that follow from this:
//   1. body parsers        → before any route reading req.body
//   2. cors, helmet        → early, before routes
//   3. authentication      → before the routes it protects
//   4. routes
//   5. a 404 catch-all     → after ALL real routes
//   6. the error handler   → absolutely LAST

// Put the 404 too early and it swallows everything below it:
app.use((req, res) => res.status(404).send());   // ✗ first
app.get('/users', handler);                      // never reached

// Put the error handler early and it never sees errors, because
// they are raised by layers registered after it.

// Most "my middleware is not running" questions are ordering
// problems, not configuration problems.`,
      output: `{ "name": "Asha" }`,
    },
  },
  {
    question: 'How do you handle errors in async route handlers?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Express 4 does NOT catch rejected promises, so an async handler that throws leaves the request hanging with an unhandled rejection. You must either wrap the body in try/catch and call `next(err)`, or wrap handlers in a helper such as `const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)`. Express 5 fixes this by forwarding rejected promises to the error handler automatically, which removes a very long-standing footgun.',
      hinglish:
        'Express 4 rejected promises catch NAHI karta, isliye ek async handler jo throw kare request ko ek unhandled rejection ke saath latka chhod deta hai. Tumhe ya to body ko try/catch mein wrap karke `next(err)` call karna padta hai, ya handlers ko ek helper mein wrap karna padta hai jaise `const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)`. Express 5 ise rejected promises ko automatically error handler tak forward karke fix karta hai, jo ek bahut purana footgun hataata hai.',
    },
    codeExample: {
      code: `// Express 4 does NOT catch rejected promises.
app.get('/users', async (req, res) => {
  const users = await db.find();     // ✗ if this rejects,
  res.json(users);                   //   the request HANGS
});
// You get an UnhandledPromiseRejection and no response at all.

// Fix 1 — try/catch and forward:
app.get('/users', async (req, res, next) => {
  try {
    res.json(await db.find());
  } catch (err) {
    next(err);                       // ✓ reaches the error handler
  }
});

// Fix 2 — a wrapper, so you write it once:
const wrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/users', wrap(async (req, res) => {
  res.json(await db.find());         // ✓ errors forwarded
}));

// Fix 3 — upgrade. Express 5 forwards rejections automatically:
app.get('/users', async (req, res) => {
  res.json(await db.find());         // ✓ just works
});

// A safety net, but not a substitute:
process.on('unhandledRejection', (err) => { log(err); process.exit(1); });`,
      output: `{ "error": "Internal error" }`,
    },
  },
  {
    question: 'How do you structure a large Express application?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Separate by RESPONSIBILITY, not by putting everything in one file: `routes/` defining endpoints and wiring middleware, `controllers/` holding request-handling logic, `services/` holding business logic independent of HTTP, `models/` for data access, `middleware/` for auth and validation, and `config/` for environment setup. The key discipline is keeping business logic out of controllers so it can be tested without an HTTP request, and mounting each resource as its own Router.',
      hinglish:
        'RESPONSIBILITY se separate karo, sab kuch ek file mein daalne ke bajaye: `routes/` jo endpoints define kare aur middleware wire kare, `controllers/` jo request-handling logic rakhe, `services/` jo HTTP se independent business logic rakhe, `models/` data access ke liye, `middleware/` auth aur validation ke liye, aur `config/` environment setup ke liye. Key discipline business logic ko controllers se bahar rakhna hai taaki wo bina ek HTTP request ke test ho sake, aur har resource ko uske apne Router ke roop mein mount karna.',
    },
    codeExample: {
      code: `src/
  app.js            // builds the app — no listen()
  server.js         // imports app, calls listen()
  routes/
    users.route.js  // endpoints + middleware wiring
  controllers/
    users.controller.js   // reads req, calls a service, sends res
  services/
    users.service.js      // business logic — NO req or res
  models/
    user.model.js
  middleware/
    auth.js  validate.js  errorHandler.js
  config/
    env.js          // validated at startup

// The discipline that matters: keep business logic out of
// controllers, so it can be tested without an HTTP request.

// controller — thin
export const getUser = wrap(async (req, res) => {
  res.json(await usersService.getById(req.params.id));
});

// service — no Express types anywhere
export const getById = (id) => User.findById(id).lean();

// Mount each resource as its own router:
app.use('/api/users', usersRouter);

// And separate app from server so tests can import the app
// without binding a port:
// app.test.js →  request(app).get('/api/users')

// Structure by FEATURE rather than by layer once the app is
// large — users/ containing its route, controller and service
// beats three folders you jump between constantly.`,
      output: `(each layer testable on its own)`,
    },
  },
  {
    question: 'What is the difference between app.use and app.all?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`app.use(path, fn)` mounts MIDDLEWARE — it matches the path as a PREFIX, so `/api` also matches `/api/users/5`, and it runs for every HTTP method. `app.all(path, fn)` registers a ROUTE handler that matches the path EXACTLY (like `app.get`) but for all methods. So `app.use` is for cross-cutting concerns applied to a whole section, while `app.all` is for a specific endpoint that should behave identically regardless of method.',
      hinglish:
        '`app.use(path, fn)` MIDDLEWARE mount karta hai — ye path ko ek PREFIX ki tarah match karta hai, isliye `/api` `/api/users/5` bhi match karta hai, aur ye har HTTP method ke liye chalta hai. `app.all(path, fn)` ek ROUTE handler register karta hai jo path ko EXACTLY match karta hai (`app.get` ki tarah) par saare methods ke liye. Isliye `app.use` ek poore section pe apply hone wale cross-cutting concerns ke liye hai, jabki `app.all` ek specific endpoint ke liye jo method chahe kuch bhi ho identically behave kare.',
    },
    codeExample: {
      code: `// app.use — MIDDLEWARE. Prefix match, any method.
app.use('/api', fn);
//  /api          ✓
//  /api/users    ✓   ← prefix
//  /api/x/y/z    ✓

// app.all — a ROUTE. Exact match, any method.
app.all('/api', fn);
//  /api          ✓
//  /api/users    ✗   ← not exact

// So the difference is PATH MATCHING, not method — both accept
// every method.

// Where app.all is genuinely useful — one endpoint that should
// behave the same regardless of method:
app.all('/health', (req, res) => res.json({ ok: true }));

// Or applying something to every method of one path:
app.all('/admin/*path', requireAdmin);   // then the real routes

// And a catch-all 404, registered after everything:
app.all('*name', (req, res) => res.status(404).json({ error: 'Not found' }));

// Note Express 5 changed wildcard syntax — a bare '*' is no
// longer valid and must be named ('*name' or '/*splat').

// In practice app.use covers almost everything; app.all appears
// mainly in catch-alls.`,
      output: `{ "ok": true }`,
    },
  },
  {
    question: 'How do you validate request data in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Validate at the boundary with a schema library — Zod, Joi, or express-validator — implemented as middleware so the route handler only ever sees clean data. Validate body, params, AND query, since all three are attacker-controlled. Return 400 with structured field-level errors so clients can display them. Crucially, use the PARSED and coerced output rather than the raw request, which both strips unexpected fields and prevents NoSQL injection from operator objects reaching your queries.',
      hinglish:
        'Boundary pe ek schema library se validate karo — Zod, Joi, ya express-validator — middleware ke roop mein implement karke taaki route handler kabhi sirf clean data hi dekhe. Body, params, AUR query validate karo, kyunki teeno attacker-controlled hain. Structured field-level errors ke saath 400 return karo taaki clients unhe display kar sakein. Crucially, raw request ke bajaye PARSED aur coerced output use karo, jo unexpected fields bhi strip karta hai aur operator objects ko tumhari queries tak pahunchne se rok kar NoSQL injection rokta hai.',
    },
    codeExample: {
      code: `import { z } from 'zod';

// Define the shape once:
const createUser = z.object({
  body: z.object({
    email: z.string().email(),
    age: z.coerce.number().int().min(18),
  }),
  params: z.object({ id: z.string().uuid() }).partial(),
});

// A reusable middleware:
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body, params: req.params, query: req.query,
  });
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }
  Object.assign(req, result.data);   // ← use the PARSED data
  next();
};

app.post('/users', validate(createUser), handler);

// Three things that matter:
// 1. Validate body, params AND query — all three are
//    attacker-controlled.
// 2. Use the PARSED output, not the raw request. It strips
//    unexpected fields and stops operator objects like
//    { $ne: null } reaching your database.
// 3. Return field-level errors so the client can show them.

// Client-side validation is UX only. It is trivially bypassed.`,
      output: `{ "errors": { "fieldErrors": { "email": ["Invalid email"] } } }`,
    },
  },
  {
    question: 'What is CORS and how do you configure it correctly in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'CORS relaxes the browser\'s same-origin policy, which by default blocks JavaScript from reading cross-origin responses. Use the `cors` package with an explicit ORIGIN allowlist in production — `origin: "*"` is convenient in development but unsafe once credentials are involved, and browsers actually forbid combining a wildcard origin with `credentials: true`. Remember CORS is enforced by the BROWSER, so a failing request will still succeed from curl or another server.',
      hinglish:
        'CORS browser ki same-origin policy ko relax karta hai, jo default se JavaScript ko cross-origin responses padhne se blocks karti hai. Production mein ek explicit ORIGIN allowlist ke saath `cors` package use karo — `origin: "*"` development mein convenient hai par credentials involved hone pe unsafe, aur browsers actually ek wildcard origin ko `credentials: true` ke saath combine karne se mana karte hain. Yaad rakho CORS BROWSER enforce karta hai, isliye ek failing request curl ya doosre server se abhi bhi succeed hogi.',
    },
    codeExample: {
      code: `import cors from 'cors';

// ✗ Fine in development, unsafe in production
app.use(cors());                          // Allow-Origin: *

// ✓ An explicit allowlist
app.use(cors({
  origin: ['https://app.example.com', 'https://admin.example.com'],
  credentials: true,                      // allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  maxAge: 86400,                          // cache the preflight
}));

// The rule people hit: you CANNOT combine origin '*' with
// credentials:true. Browsers refuse it outright.

// What CORS actually is: the browser's same-origin policy stops
// JavaScript READING a cross-origin response. These headers tell
// the browser it is allowed to.

// So CORS is enforced by the BROWSER and protects the USER —
// not your API. The same request from curl or another server
// works regardless. CORS is not authentication.

// Preflight: for anything beyond a simple request (a custom
// header like Authorization, or PUT/DELETE), the browser first
// sends OPTIONS. Your server must answer it — the cors package
// does this for you.

// A CORS error in the console almost always means the server
// did not send a matching Allow-Origin, not that the request
// itself failed.`,
      output: `Access-Control-Allow-Origin: https://app.example.com`,
    },
  },
  {
    question: 'How do you implement authentication middleware in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Write middleware that extracts the token from the `Authorization: Bearer` header or a cookie, verifies it, attaches the decoded user to `req.user`, and either calls `next()` or responds 401. Then apply it selectively — `router.get("/profile", authenticate, handler)` — rather than globally, so public routes still work. Keep AUTHORISATION separate as its own middleware checking `req.user.role`, since "who are you" and "what may you do" are genuinely different questions.',
      hinglish:
        'Aisa middleware likho jo token ko `Authorization: Bearer` header ya ek cookie se extract kare, verify kare, decoded user ko `req.user` pe attach kare, aur ya `next()` call kare ya 401 respond kare. Phir use selectively apply karo — `router.get("/profile", authenticate, handler)` — globally ke bajaye, taaki public routes chalte rahein. AUTHORISATION ko `req.user.role` check karte ek alag middleware ke roop mein rakho, kyunki "tum kaun ho" aur "tum kya kar sakte ho" genuinely alag sawaal hain.',
    },
    visual: 'middleware-chain',
    codeExample: {
      code: `import jwt from 'jsonwebtoken';

// AUTHENTICATION — who are you?
export function authenticate(req, res, next) {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });   // 401
  }
}

// AUTHORISATION — what may you do? A separate concern.
export const requireRole = (role) => (req, res, next) =>
  req.user?.role === role
    ? next()
    : res.status(403).json({ error: 'Forbidden' });            // 403

// Apply selectively, so public routes still work:
app.get('/public', handler);
app.get('/me', authenticate, handler);
app.delete('/users/:id', authenticate, requireRole('admin'), handler);

// The vulnerability that matters most — OBJECT-LEVEL checks.
// Being logged in is not permission to read THIS record:
const order = await Order.findOne({
  _id: req.params.id,
  userId: req.user.id,          // ✓ scope the query itself
});`,
      output: `401 { "error": "No token" }`,
    },
  },
  {
    question: 'What is helmet and what does it actually do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Helmet is middleware that sets a collection of security-related HTTP response headers with sensible defaults: `X-Content-Type-Options: nosniff` to block MIME sniffing, `Strict-Transport-Security` to force HTTPS, `X-Frame-Options` to prevent clickjacking, and a Content-Security-Policy. It removes `X-Powered-By: Express`, which otherwise advertises your stack. It is a single line for a meaningful reduction in attack surface, and is considered baseline practice for any production Express app.',
      hinglish:
        'Helmet ek middleware hai jo sensible defaults ke saath security-related HTTP response headers ka ek collection set karta hai: MIME sniffing block karne ke liye `X-Content-Type-Options: nosniff`, HTTPS force karne ke liye `Strict-Transport-Security`, clickjacking rokne ke liye `X-Frame-Options`, aur ek Content-Security-Policy. Ye `X-Powered-By: Express` hataata hai, jo warna tumhara stack advertise karta hai. Ye attack surface mein ek meaningful kami ke liye ek single line hai, aur kisi bhi production Express app ke liye baseline practice maani jaati hai.',
    },
    codeExample: {
      code: `import helmet from 'helmet';
app.use(helmet());        // one line, sensible defaults

// What it sets:
// X-Content-Type-Options: nosniff
//    → stops the browser guessing a file's type, which can turn
//      an uploaded .txt into executable script
// Strict-Transport-Security
//    → forces HTTPS on later visits
// X-Frame-Options: SAMEORIGIN
//    → your site cannot be framed → clickjacking blocked
// Content-Security-Policy
//    → restricts where scripts and styles may load from
// Referrer-Policy, X-DNS-Prefetch-Control, and others

// It also REMOVES X-Powered-By: Express, which otherwise
// advertises your stack to anyone scanning.

// Tuning CSP is where the real work is — the default is strict
// and will block inline scripts:
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https://cdn.example.com'],
    },
  },
}));

// What it does NOT do: validate input, stop SQL or NoSQL
// injection, or add authentication. It is defence in depth —
// one cheap layer, not a security strategy.`,
      output: `X-Powered-By header removed`,
    },
  },
  {
    question: 'How do you handle file uploads in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use `multer`, since `express.json()` cannot parse `multipart/form-data`. Configure storage (disk or memory) and, critically, set LIMITS on file size and count — without them an attacker can exhaust disk or memory. Validate the MIME type and extension rather than trusting the client-supplied filename, and never store uploads under a path derived from user input. For production, streaming directly to object storage such as S3 avoids filling the application server\'s disk entirely.',
      hinglish:
        '`multer` use karo, kyunki `express.json()` `multipart/form-data` parse nahi kar sakta. Storage (disk ya memory) configure karo aur, critically, file size aur count pe LIMITS set karo — unke bina ek attacker disk ya memory khatam kar sakta hai. Client-supplied filename pe bharosa karne ke bajaye MIME type aur extension validate karo, aur uploads ko kabhi user input se derive kiye path ke neeche store mat karo. Production ke liye, S3 jaise object storage pe directly stream karna application server ki disk bharne se poori tarah bachata hai.',
    },
    codeExample: {
      code: `import multer from 'multer';

// express.json() cannot parse multipart/form-data — you need
// a dedicated parser.
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) =>
      cb(null, crypto.randomUUID() + path.extname(file.originalname)),
      // ✓ never trust file.originalname — it can contain ../
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },   // ✓ always
  fileFilter: (req, file, cb) =>
    cb(null, ['image/jpeg', 'image/png'].includes(file.mimetype)),
});

app.post('/avatar', upload.single('avatar'), (req, res) => {
  res.json({ path: req.file.path });
});

// Without limits, one client can fill your disk or exhaust
// memory. Without a filename check, they can write outside
// the uploads folder.

// Note mimetype comes from the CLIENT and can be faked. For
// anything security-sensitive, check the actual file signature.

// In production, prefer a PRESIGNED URL so the browser uploads
// straight to S3 — your server never handles the bytes, which
// removes the bandwidth, the disk and most of the risk:
const url = await s3.getSignedUrl('putObject', { Bucket, Key });`,
      output: `{ "path": "uploads/f47ac10b.jpg" }`,
    },
  },
  {
    question: 'What is the difference between res.send, res.json, and res.end?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`res.send()` is flexible — it accepts a string, buffer, or object, infers the Content-Type, and sets Content-Length. `res.json()` explicitly serialises to JSON and always sets `Content-Type: application/json`; it also applies any configured JSON replacer or spacing, so it is the right choice for APIs. `res.end()` is the raw Node method that terminates the response without setting headers or body semantics — useful for an empty 204 response, but you rarely need it directly.',
      hinglish:
        '`res.send()` flexible hai — ye ek string, buffer, ya object accept karta hai, Content-Type infer karta hai, aur Content-Length set karta hai. `res.json()` explicitly JSON mein serialise karta hai aur hamesha `Content-Type: application/json` set karta hai; ye koi bhi configured JSON replacer ya spacing bhi apply karta hai, isliye APIs ke liye sahi choice hai. `res.end()` raw Node method hai jo bina headers ya body semantics set kiye response terminate karta hai — ek empty 204 response ke liye useful, par tumhe ise directly rarely chahiye.',
    },
    codeExample: {
      code: `// res.send — flexible. Infers Content-Type from the argument.
res.send('hello');              // text/html
res.send({ a: 1 });             // application/json (calls res.json)
res.send(Buffer.from('x'));     // application/octet-stream
res.send(404);                  // ⚠ in old Express this set the
                                //   STATUS, not the body

// res.json — always JSON, always the right header.
res.json({ a: 1 });
res.status(201).json({ id });   // chainable
// Also applies any configured replacer or spacing, so it is the
// correct choice for an API.

// res.end — raw Node. No headers, no body conversion.
res.status(204).end();          // the right way to send "no content"

// All three END the request. Calling any of them twice throws:
res.json(a);
res.json(b);                    // ✗ Cannot set headers after…

// Which is why you return:
if (!user) return res.status(404).json({ error: 'not found' });

// Other useful senders:
res.sendStatus(204);            // sets status AND sends its text
res.redirect(302, '/login');
res.sendFile(path.resolve('a.pdf'));

// For an API, use res.json consistently. Mixing send and json
// makes the response shape unpredictable for clients.`,
      output: `{ "id": "42" }`,
    },
  },
  {
    question: 'How do you implement rate limiting in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use `express-rate-limit`, applying a general limit to `/api` and a much stricter one to authentication endpoints, since login is the prime brute-force target. Return HTTP 429 with a `Retry-After` header. Two production caveats: behind a proxy or load balancer you must set `app.set("trust proxy", ...)` or every request appears to come from the proxy\'s IP, and the default in-memory store does not work across multiple instances — use a Redis-backed store.',
      hinglish:
        '`express-rate-limit` use karo, `/api` pe ek general limit aur authentication endpoints pe ek bahut strict limit apply karte hue, kyunki login prime brute-force target hai. Ek `Retry-After` header ke saath HTTP 429 return karo. Do production caveats: ek proxy ya load balancer ke peeche tumhe `app.set("trust proxy", ...)` set karna padta hai warna har request proxy ke IP se aati hui lagti hai, aur default in-memory store multiple instances ke across kaam nahi karta — ek Redis-backed store use karo.',
    },
    codeExample: {
      code: `import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',       // RateLimit-* headers
  legacyHeaders: false,
  store: new RedisStore({ sendCommand: (...a) => redis.call(...a) }),
});
app.use('/api', apiLimiter);

// Login deserves a much stricter one — it is the brute-force target:
app.post('/login', rateLimit({ windowMs: 15*60*1000, limit: 5 }), handler);

// Two production details that are easy to get wrong:

// 1. Behind a proxy, every request looks like it comes from the
//    proxy's IP, so ONE user exhausts the limit for everyone:
app.set('trust proxy', 1);        // ✓ but set it precisely,
                                  //   never blindly to true

// 2. The default store is IN MEMORY, so with 4 instances a
//    client effectively gets 4x the limit — and it resets on
//    every deploy. Use Redis.

// Choose the key deliberately: per IP is the default, but for
// an authenticated API a per-user or per-API-key limit is
// fairer and harder to evade.

// Return 429 with Retry-After so clients can back off properly.`,
      output: `429 Too Many Requests · Retry-After: 900`,
    },
  },
  {
    question: 'What is compression middleware and when does it help?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'The `compression` middleware gzips or brotli-compresses responses, typically cutting JSON and HTML payloads by 70-90% and meaningfully reducing transfer time on slow networks. It costs CPU per response, so it is not free. It offers little benefit for already-compressed content such as images, video, or ZIP files. In many production setups a reverse proxy like Nginx or a CDN handles compression more efficiently, in which case enabling it in Express as well is redundant.',
      hinglish:
        '`compression` middleware responses ko gzip ya brotli se compress karta hai, typically JSON aur HTML payloads 70-90% kam karta hai aur slow networks pe transfer time meaningfully kam karta hai. Ye per response CPU cost karta hai, isliye free nahi hai. Ye already-compressed content jaise images, video, ya ZIP files ke liye kam benefit deta hai. Bahut production setups mein Nginx ya ek CDN jaisa reverse proxy compression zyada efficiently handle karta hai, jis case mein Express mein bhi enable karna redundant hai.',
    },
    codeExample: {
      code: `import compression from 'compression';
app.use(compression());        // gzip / brotli

// Typical effect on text:
//   150kb JSON  →  ~18kb    (about 88% smaller)
//   HTML, CSS, JS, SVG all compress well

// When it does NOT help — already-compressed formats:
//   JPEG, PNG, WebP, MP4, ZIP, PDF
// Compressing them wastes CPU for roughly zero gain.
// The middleware skips them by content-type, but be aware.

// It costs CPU per response, so it is a trade: less bandwidth
// and faster transfer on slow connections, more CPU on the
// server.

// Skip it selectively:
app.use(compression({
  threshold: 1024,             // do not bother below 1kb
  filter: (req, res) =>
    req.headers['x-no-compression'] ? false : compression.filter(req, res),
}));

// The thing worth knowing: in most real deployments Nginx, a
// CDN or the platform already compresses. Doing it in Express
// as well is duplicated CPU work for no benefit — check your
// response headers before adding it.

// It also cannot compress a stream you have already piped
// through something that sets Content-Length.`,
      output: `Content-Encoding: gzip · 150kb → 18kb`,
    },
  },
  {
    question: 'How do you serve a single-page application from Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Serve the build directory with `express.static`, then add a catch-all route sending `index.html` for any unmatched GET, so client-side routes like `/dashboard` do not 404 on a direct visit or refresh. Crucially, register your API routes BEFORE the catch-all, otherwise it swallows them and returns HTML to API calls — a very common confusing bug. In Express 5 the catch-all pattern changed, so use a named wildcard rather than the old bare `*`.',
      hinglish:
        'Build directory ko `express.static` se serve karo, phir ek catch-all route add karo jo kisi bhi unmatched GET ke liye `index.html` bheje, taaki `/dashboard` jaise client-side routes ek direct visit ya refresh pe 404 na dein. Crucially, apne API routes catch-all se PEHLE register karo, warna wo unhe nigal leta hai aur API calls ko HTML return karta hai — ek bahut common confusing bug. Express 5 mein catch-all pattern badal gaya hai, isliye purane bare `*` ke bajaye ek named wildcard use karo.',
    },
    codeExample: {
      code: `import path from 'node:path';
const dist = path.resolve('dist');

// 1. API routes FIRST — this is the part people get wrong
app.use('/api', apiRouter);

// 2. Static assets
app.use(express.static(dist, { maxAge: '1y', index: false }));

// 3. Catch-all: any other GET returns index.html so client-side
//    routes work on a direct visit or refresh
app.get('*name', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

// Why the order matters: put the catch-all first and every API
// call returns HTML. The symptom is a confusing
// "Unexpected token < in JSON at position 0" in the browser.

// Why the catch-all is needed at all: /dashboard is a route
// your JavaScript knows about, but the SERVER has no such file.
// Without this, a refresh on /dashboard is a 404.

// Cache headers: hashed asset filenames can cache for a year,
// but index.html must NOT — otherwise users keep loading an old
// bundle that references deleted files.
res.sendFile(indexHtml, { headers: { 'Cache-Control': 'no-cache' } });

// Express 5 note: a bare '*' is no longer valid — the wildcard
// must be named.`,
      output: `GET /dashboard → index.html`,
    },
  },
  {
    question: 'What is the trust proxy setting and why does it matter?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Behind a reverse proxy or load balancer, every request appears to originate from the proxy, so `req.ip` is the proxy\'s address and `req.protocol` is http even when the client used https. `app.set("trust proxy", ...)` tells Express to read the `X-Forwarded-*` headers instead. This directly affects rate limiting (which would otherwise throttle all users as one IP), logging, and any redirect-to-https logic. Set it to a specific trusted value rather than blindly `true`, since these headers are client-spoofable.',
      hinglish:
        'Ek reverse proxy ya load balancer ke peeche, har request proxy se aati hui lagti hai, isliye `req.ip` proxy ka address hai aur `req.protocol` http hai chahe client ne https use kiya ho. `app.set("trust proxy", ...)` Express ko batata hai ki uske bajaye `X-Forwarded-*` headers padhe. Ye directly rate limiting (jo warna saare users ko ek IP ki tarah throttle karti), logging, aur kisi bhi redirect-to-https logic ko affect karta hai. Ise blindly `true` ke bajaye ek specific trusted value pe set karo, kyunki ye headers client-spoofable hain.',
    },
    codeExample: {
      code: `// Behind Nginx, a load balancer, Cloudflare or Heroku, every
// request reaches Node FROM THE PROXY. So by default:
req.ip;          // the proxy's IP, not the user's
req.protocol;    // 'http', even though the user used https
req.secure;      // false

// The proxy passes the real values in headers:
//   X-Forwarded-For: 203.0.113.7
//   X-Forwarded-Proto: https

app.set('trust proxy', 1);       // trust ONE hop
// Now req.ip and req.protocol read those headers.

// What breaks without it:
//   • rate limiting throttles EVERYONE as one IP
//   • logs record the proxy for every request
//   • redirect-to-https loops forever, because req.secure is
//     always false
//   • secure cookies are not set

// Set it PRECISELY, not blindly:
app.set('trust proxy', 1);                  // one proxy
app.set('trust proxy', 'loopback');         // local only
app.set('trust proxy', true);               // ✗ trusts everything

// Why true is dangerous: X-Forwarded-For is just a header a
// client can send. Trusting it unconditionally lets anyone
// spoof their IP and bypass your rate limiter or IP allowlist.

// Match the number to your actual infrastructure hops.`,
      output: `203.0.113.7 · https`,
    },
  },
  {
    question: 'How do you log requests in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use `morgan` for simple HTTP access logs, or a structured logger such as pino or winston for production, where JSON output is far easier for log aggregators to query. Log method, path, status, duration, and a correlation ID so a single request can be traced across services. Deliberately EXCLUDE sensitive data — passwords, tokens, and full request bodies — since logs are widely accessible and long-lived, making accidental logging of credentials a real and common breach vector.',
      hinglish:
        'Simple HTTP access logs ke liye `morgan` use karo, ya production ke liye pino ya winston jaisa ek structured logger, jahan JSON output log aggregators ke query karne ke liye bahut easier hai. Method, path, status, duration, aur ek correlation ID log karo taaki ek single request services ke across trace ho sake. Sensitive data — passwords, tokens, aur full request bodies — deliberately EXCLUDE karo, kyunki logs widely accessible aur long-lived hote hain, jo credentials ka accidental logging ek real aur common breach vector banata hai.',
    },
    codeExample: {
      code: `// Development — morgan is readable and instant
import morgan from 'morgan';
app.use(morgan('dev'));
// GET /users 200 12.4 ms - 1024

// Production — STRUCTURED JSON, so a log aggregator can query it
import pino from 'pino';
import pinoHttp from 'pino-http';
const logger = pino();
app.use(pinoHttp({ logger }));
// {"level":30,"method":"GET","url":"/users","status":200,"ms":12}

// Add a correlation ID so one request is traceable across
// services and log lines:
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] ?? crypto.randomUUID();
  res.setHeader('x-request-id', req.id);
  next();
});

// What NOT to log — this is the part that causes real incidents:
//   ✗ passwords, tokens, API keys, card numbers
//   ✗ full request bodies (they contain all of the above)
//   ✗ personal data you have no reason to retain
// Logs are widely readable, long-lived and often shipped to
// third parties. Redact deliberately:
pino({ redact: ['req.headers.authorization', 'req.body.password'] });

// And never console.log in production — it is synchronous and
// blocks the event loop under load.`,
      output: `{"level":30,"method":"GET","url":"/users","status":200,"ms":12}`,
    },
  },
  {
    question: 'How do you test an Express application?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Use `supertest` to make requests against your app object WITHOUT starting a real server, which makes tests fast and port-free. Export the app separately from the `listen()` call so tests can import it cleanly. Test routes at the HTTP level (status codes, response shape, auth rejection), and test business logic in services directly as plain unit tests. Use a separate test database reset between runs, and mock genuinely external services rather than calling them.',
      hinglish:
        '`supertest` use karke apne app object ke against requests karo BINA ek real server start kiye, jo tests fast aur port-free banata hai. App ko `listen()` call se alag export karo taaki tests use cleanly import kar sakein. Routes ko HTTP level pe test karo (status codes, response shape, auth rejection), aur services mein business logic ko directly plain unit tests ke roop mein test karo. Runs ke beech reset hota ek separate test database use karo, aur genuinely external services ko call karne ke bajaye mock karo.',
    },
    codeExample: {
      code: `import request from 'supertest';
import app from './app.js';        // exported WITHOUT listen()

test('GET /users returns a list', async () => {
  const res = await request(app).get('/api/users');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(3);
});

test('rejects an unauthenticated request', async () => {
  await request(app).get('/api/me').expect(401);
});

test('cannot read another user\\'s order', async () => {
  await request(app)
    .get('/api/orders/999')
    .set('Authorization', 'Bearer ' + tokenForUser1)
    .expect(403);                  // ← the test people skip
});

// supertest runs the app WITHOUT binding a port, so tests are
// fast, parallel-safe and free of port conflicts. That is why
// app.js and server.js are separated.

// What to test at each level:
//   routes    → status codes, response shape, auth rejection
//   services  → business logic, as plain unit tests
//   external  → mock at the boundary, not your own modules

// Use a separate test database, reset between runs. Testcontainers
// or mongodb-memory-server give you a real database per run,
// which catches far more than a mocked model.`,
      output: `✓ 3 passed`,
    },
  },
  {
    question: 'What is the difference between req.params, req.query, and req.body?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`req.params` holds named route segments — `/users/:id` gives `req.params.id` — used to identify a specific resource. `req.query` holds everything after `?` — `/users?role=admin&page=2` — used for optional filtering, sorting, and pagination. `req.body` holds the parsed request payload and requires body-parsing middleware to exist at all. Note params and query values arrive as STRINGS, so `req.query.page` is `"2"` not `2`, which is a frequent source of subtle bugs.',
      hinglish:
        '`req.params` named route segments rakhta hai — `/users/:id` `req.params.id` deta hai — ek specific resource identify karne ke liye use hota hai. `req.query` `?` ke baad sab kuch rakhta hai — `/users?role=admin&page=2` — optional filtering, sorting, aur pagination ke liye. `req.body` parsed request payload rakhta hai aur ise exist karne ke liye body-parsing middleware chahiye. Note karo params aur query values STRINGS ke roop mein aati hain, isliye `req.query.page` `"2"` hai `2` nahi, jo subtle bugs ka ek frequent source hai.',
    },
    codeExample: {
      code: `// GET /users/42/posts?sort=new&page=2   with a JSON body

app.get('/users/:id/posts', (req, res) => {
  req.params;   // { id: '42' }              ← from the PATH
  req.query;    // { sort: 'new', page: '2' } ← after the ?
  req.body;     // { title: 'Hi' }            ← the request BODY
});

// params and query are ALWAYS strings:
const page = Number(req.query.page) || 1;      // not '2'
const on = req.query.active === 'true';        // not Boolean(...)

// req.body needs a parser or it is undefined:
app.use(express.json());

// What each is FOR:
//   params → identify a specific resource   /users/42
//   query  → filter, sort, paginate         ?status=active&page=2
//   body   → the data being created or updated

// All three are attacker-controlled, so validate all three:
const { params, query, body } = schema.parse({
  params: req.params, query: req.query, body: req.body,
});

// And never pass any of them straight into a database call:
User.find(req.query);            // ✗ ?role[$ne]= injects an operator

// Related: req.headers, req.cookies, req.ip, req.method.`,
      output: `{ id: '42' } { sort: 'new', page: '2' }`,
    },
  },
  {
    question: 'How do you handle 404s in Express?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Register a middleware with no path AFTER every real route — if execution reaches it, nothing matched, so respond 404. It must come after all routes but BEFORE the error-handling middleware. A common refinement is to create an error object and pass it to `next(err)` instead of responding directly, so 404s flow through the same error handler as everything else and produce a consistent response shape. Placing it too early is the classic mistake, since it then intercepts valid routes.',
      hinglish:
        'Har real route ke BAAD bina path ke ek middleware register karo — agar execution wahan pahunche, kuch match nahi hua, isliye 404 respond karo. Ise saare routes ke baad par error-handling middleware se PEHLE aana chahiye. Ek common refinement ye hai ki directly respond karne ke bajaye ek error object banake `next(err)` mein pass karo, taaki 404s baaki sab ki tarah usi error handler se guzrein aur ek consistent response shape produce karein. Ise bahut jaldi rakhna classic mistake hai, kyunki phir wo valid routes intercept karta hai.',
    },
    visual: 'middleware-chain',
    codeExample: {
      code: `// Register middleware with NO path, AFTER every real route.
// If execution reaches it, nothing matched.
app.use('/api', apiRouter);
app.get('/health', handler);

app.use((req, res, next) => {
  const err = new Error(\`Not found: \${req.method} \${req.originalUrl}\`);
  err.status = 404;
  next(err);                     // ✓ let the error handler format it
});

app.use((err, req, res, next) => {      // LAST
  res.status(err.status ?? 500).json({ error: err.message });
});

// Passing it to the error handler rather than responding
// directly keeps ONE response shape for every failure, which
// clients appreciate.

// The classic mistake — registering it too early:
app.use((req, res) => res.status(404).send());   // ✗ first
app.get('/users', handler);                      // never reached
// The 404 handler matches everything, so nothing below runs.

// For an API serving a frontend, order is:
//   API routes → static files → SPA catch-all → 404 → errors

// And do not return 404 for an authorisation failure by
// accident — 403 means "you may not", 404 means "not here".
// Though returning 404 deliberately is a valid way to avoid
// revealing that a resource exists.`,
      output: `404 { "error": "Not found: GET /nope" }`,
    },
  },
  {
    question: 'What are the main differences in Express 5?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The headline change is that Express 5 automatically forwards REJECTED PROMISES from async handlers to the error-handling middleware, removing the long-standing need for a wrapper. It also updates path-to-regexp, which changes wildcard and optional-parameter syntax (a bare `*` must become a named wildcard), removes several long-deprecated methods such as `res.json(status, obj)` and `app.del()`, and requires a modern Node version. Migration is mostly mechanical but the routing-syntax changes are the ones that actually bite.',
      hinglish:
        'Headline change ye hai ki Express 5 async handlers se REJECTED PROMISES ko automatically error-handling middleware tak forward karta hai, ek wrapper ki purani zaroorat hataate hue. Ye path-to-regexp bhi update karta hai, jo wildcard aur optional-parameter syntax badalta hai (ek bare `*` ko ek named wildcard banna padta hai), `res.json(status, obj)` aur `app.del()` jaise kai long-deprecated methods hataata hai, aur ek modern Node version chahta hai. Migration zyadatar mechanical hai par routing-syntax changes hi actually kaatte hain.',
    },
    codeExample: {
      code: `// 1. ASYNC ERRORS are forwarded automatically — the headline.
// Express 4:
app.get('/x', async (req, res, next) => {
  try { res.json(await load()); } catch (e) { next(e); }
});
// Express 5:
app.get('/x', async (req, res) => {
  res.json(await load());        // ✓ a rejection reaches the
});                              //   error handler on its own

// 2. WILDCARDS must be named (path-to-regexp v8):
app.get('*', handler);           // ✗ no longer valid
app.get('*splat', handler);      // ✓
app.get('/files/*path', handler);

// 3. Optional parameters use a different syntax:
app.get('/x/:id?', handler);     // ✗
app.get('/x{/:id}', handler);    // ✓

// 4. Removed long-deprecated APIs:
res.json(status, obj);           // ✗ → res.status(s).json(obj)
res.send(status);                // ✗ → res.sendStatus(status)
app.del();                       // ✗ → app.delete()
req.param(name);                 // ✗ → req.params.name

// 5. Requires Node 18+.

// Migration is mostly mechanical, but the routing syntax is
// what actually breaks — and it breaks at RUNTIME with a
// path-to-regexp error, not at startup, so test every route.`,
      output: `TypeError: Missing parameter name at 1`,
    },
  },
  {
    question: 'How would you scale an Express application?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Keep the app STATELESS so any instance can serve any request — move sessions to Redis rather than memory. Run multiple processes with the cluster module or PM2 to use every CPU core, and multiple instances behind a load balancer. Put a reverse proxy or CDN in front for static assets, TLS termination, and compression. Then remove the usual bottlenecks: add database indexes, cache hot reads, move slow work to a background queue, and never block the event loop with CPU-heavy synchronous code.',
      hinglish:
        'App ko STATELESS rakho taaki koi bhi instance koi bhi request serve kar sake — sessions ko memory ke bajaye Redis mein le jao. Har CPU core use karne ke liye cluster module ya PM2 se multiple processes chalao, aur ek load balancer ke peeche multiple instances. Static assets, TLS termination, aur compression ke liye aage ek reverse proxy ya CDN rakho. Phir usual bottlenecks hatao: database indexes add karo, hot reads cache karo, slow kaam ek background queue mein le jao, aur CPU-heavy synchronous code se kabhi event loop block mat karo.',
    },
    codeExample: {
      code: `// 1. Make it STATELESS — the prerequisite for everything else.
//    Any instance must be able to serve any request.
app.use(session({ store: new RedisStore({ client }) }));   // not memory

// 2. Use every core
import cluster from 'node:cluster';
if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) cluster.fork();
}
// or run more containers and let the orchestrator scale.

// 3. Put a reverse proxy or CDN in front for TLS, static files
//    and compression — Node should not be doing those.

// 4. Then remove the actual bottlenecks, in this order:
//    • DATABASE — add indexes, kill N+1 queries. Most "slow
//      Node" is slow SQL.
//    • CACHE hot reads in Redis
//    • move slow work to a QUEUE and return 202
await queue.add('report', { userId });    // not inline
//    • never block the event loop — no sync crypto, no huge
//      JSON.parse, no CPU loops in a handler

// 5. Measure before and after. Watch event-loop lag and p99
//    latency, not averages.

// Scaling out multiplies whatever you have. If a single request
// is slow because of a missing index, ten instances just means
// ten slow instances.`,
      output: `p99 840ms → 95ms`,
    },
  },
  {
    question: 'What is Express and what is it NOT?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Express IS a minimal, unopinionated routing and middleware layer over Node\'s http module. It is NOT a full framework in the Rails or Django sense: it gives you no ORM, no authentication, no validation, no project structure, no CLI, and no opinions about folder layout. That minimalism is deliberate — it is why Express is flexible and long-lived, and also why every team must assemble and maintain its own stack of surrounding decisions.',
      hinglish:
        'Express Node ke http module ke upar ek minimal, unopinionated routing aur middleware layer HAI. Ye Rails ya Django wale sense mein ek full framework NAHI hai: ye tumhe koi ORM, koi authentication, koi validation, koi project structure, koi CLI, aur folder layout pe koi opinions nahi deta. Wo minimalism deliberate hai — isiliye Express flexible aur long-lived hai, aur isiliye har team ko surrounding decisions ka apna stack khud assemble aur maintain karna padta hai.',
    },
    codeExample: {
      code: `// Express IS: a minimal routing and middleware layer over
// Node's http module.
const app = express();
app.use(express.json());
app.get('/users/:id', handler);
app.listen(3000);

// Express is NOT a full framework. It gives you no:
//   • ORM or database layer      (you pick Mongoose, Prisma…)
//   • authentication             (Passport, Auth.js, your own)
//   • validation                 (Zod, Joi)
//   • project structure or CLI   (you decide the folders)
//   • dependency injection
//   • official testing setup
//   • opinions about anything

// Compare Nest or Rails, which decide all of that for you.

// That minimalism is deliberate. It is why Express is still
// here after more than a decade, and equally why every team
// reassembles the same stack — helmet, cors, morgan, a
// validator, an async wrapper — from scratch.

// The trade in one line: Express gives you freedom and hands
// you the architectural decisions. A framework takes the
// freedom and makes the decisions for you.

// Choose Express when you want control, Nest when you want
// consistency across a large team.`,
      output: `server on :3000`,
    },
  },
  {
    question: 'How do you handle graceful shutdown in an Express app?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Listen for SIGTERM (which orchestrators send before killing a container), stop accepting NEW connections with `server.close()`, allow in-flight requests to finish, then close database connections and exit. Without this, a deployment kills requests mid-flight and users see errors. Add a timeout that force-exits if something hangs, and fail your health check immediately on SIGTERM so the load balancer stops routing new traffic before you begin shutting down.',
      hinglish:
        'SIGTERM sunо (jo orchestrators ek container maarne se pehle bhejte hain), `server.close()` se NAYE connections accept karna band karo, in-flight requests ko khatam hone do, phir database connections band karke exit karo. Iske bina, ek deployment requests ko mid-flight maar deta hai aur users errors dekhte hain. Ek timeout add karo jo kuch atakne pe force-exit kare, aur SIGTERM pe apna health check turant fail karo taaki load balancer shutdown shuru karne se pehle naya traffic routing band kar de.',
    },
    codeExample: {
      code: `const server = app.listen(3000);
let shuttingDown = false;

// Fail the health check FIRST, so the load balancer stops
// sending new traffic before you start closing anything.
app.get('/health', (req, res) =>
  shuttingDown ? res.status(503).end() : res.json({ ok: true }));

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(signal + ' received, shutting down');

  server.close(async () => {          // stop accepting NEW connections
    await mongoose.disconnect();      // let in-flight requests finish
    await redis.quit();
    process.exit(0);
  });

  // Do not hang forever if something refuses to close
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));   // Docker / K8s
process.on('SIGINT',  () => shutdown('SIGINT'));    // Ctrl-C

// Why it matters: on every deploy the orchestrator sends
// SIGTERM and kills the process shortly after. Without this,
// requests in flight are cut off and users see errors on each
// release.

// server.close() waits for open connections, so keep-alive
// sockets are why you need the timeout as well.`,
      output: `SIGTERM received, shutting down`,
    },
  },
  {
    question: 'What is the difference between Express and Fastify or Koa?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'EXPRESS is the incumbent — the largest ecosystem, the most examples, callback-style middleware, and battle-tested stability. KOA, from the same team, is smaller and modern: async/await-native middleware with a genuine downstream-then-upstream flow, but it ships almost nothing by default. FASTIFY focuses on performance and developer experience, with schema-based validation and serialisation that make it notably faster, plus first-class TypeScript support. Express remains the safe default; Fastify is the common choice when throughput matters.',
      hinglish:
        'EXPRESS incumbent hai — sabse bada ecosystem, sabse zyada examples, callback-style middleware, aur battle-tested stability. KOA, usi team se, chhota aur modern hai: genuine downstream-then-upstream flow ke saath async/await-native middleware, par ye default se almost kuch nahi deta. FASTIFY performance aur developer experience pe focus karta hai, schema-based validation aur serialisation ke saath jo ise notably faster banate hain, plus first-class TypeScript support. Express safe default bana hua hai; Fastify common choice hai jab throughput matter kare.',
    },
    codeExample: {
      code: `// EXPRESS — the incumbent. Callback middleware, huge ecosystem.
app.get('/users', (req, res) => res.json(users));

// KOA — from the same team, smaller and modern. async/await
// middleware with a real downstream-then-upstream flow:
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();                       // downstream
  ctx.set('X-Time', Date.now() - start);   // then back upstream
});
// Ships almost nothing by default — no router, no body parser.

// FASTIFY — performance and DX. Schema-based validation and
// serialisation, which is where the speed comes from:
fastify.get('/users', {
  schema: { response: { 200: UserListSchema } },   // ~2x faster JSON
}, async () => users);
// Also first-class TypeScript and a real plugin system.

// Rough throughput: Fastify > Koa > Express, though for most
// apps the database dominates and the difference is invisible.

// Choosing honestly:
//   most projects, biggest hiring pool  → Express
//   throughput or strong typing matter  → Fastify
//   want minimal and modern             → Koa
//   edge runtimes                       → Hono

// Express 5's async support closes the biggest gap that used
// to push people to Koa.`,
      output: `Fastify ~76k req/s · Express ~28k req/s`,
    },
  },
  {
    question: 'How do you prevent common security vulnerabilities in Express?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Set security headers with helmet. Validate and sanitise ALL input with a schema, and never pass `req.body` straight into a database query, which enables NoSQL injection via operator objects. Use parameterised queries or an ORM. Hash passwords with bcrypt. Rate limit authentication endpoints. Configure CORS with an explicit allowlist. Set `httpOnly`, `secure`, and `sameSite` on cookies. Keep dependencies patched via `npm audit`. And never return stack traces or internal error details to clients in production.',
      hinglish:
        'helmet se security headers set karo. SAARE input ko ek schema se validate aur sanitise karo, aur `req.body` ko kabhi seedha ek database query mein mat daalo, jo operator objects se NoSQL injection enable karta hai. Parameterised queries ya ek ORM use karo. Passwords bcrypt se hash karo. Authentication endpoints rate limit karo. CORS ko ek explicit allowlist se configure karo. Cookies pe `httpOnly`, `secure`, aur `sameSite` set karo. `npm audit` se dependencies patched rakho. Aur production mein clients ko kabhi stack traces ya internal error details return mat karo.',
    },
    codeExample: {
      code: `// 1. Security headers
app.use(helmet());

// 2. Validate EVERY input with a schema — body, params, query
app.post('/users', validate(schema), handler);

// 3. Never pass user input into a query directly
User.find(req.query);                    // ✗ NoSQL injection
User.find({ role: String(req.query.role) });    // ✓
db.query('SELECT * FROM u WHERE id = ?', [id]); // ✓ parameterised

// 4. Hash passwords properly
await bcrypt.hash(password, 12);         // never sha256

// 5. Rate limit, especially login
app.post('/login', rateLimit({ limit: 5 }), handler);

// 6. Cookies: httpOnly + secure + sameSite
res.cookie('t', jwt, { httpOnly: true, secure: true, sameSite: 'strict' });

// 7. CORS with an explicit allowlist, never '*' with credentials

// 8. Check OBJECT-LEVEL authorisation — the most common real
//    vulnerability. Being logged in is not permission for THIS row:
await Order.findOne({ _id: req.params.id, userId: req.user.id });

// 9. Never leak stack traces in production
// 10. npm audit, and keep dependencies patched
// 11. Never log tokens, passwords or full request bodies

// The one that actually gets exploited most: #8.`,
      output: `403 Forbidden`,
    },
  },
  {
    question: 'What is the res.locals object used for?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`res.locals` is a per-REQUEST object for passing data between middleware and, in server-rendered apps, into templates automatically. It is scoped to the single request-response cycle, so unlike `app.locals` (application-wide) there is no risk of leaking one user\'s data to another. Typical uses: middleware setting the current user, a request ID, or flash messages that a view then renders. Attaching request state to a module-level variable instead is a classic concurrency bug.',
      hinglish:
        '`res.locals` ek per-REQUEST object hai middleware ke beech data pass karne ke liye aur, server-rendered apps mein, templates mein automatically. Ye ek single request-response cycle tak scoped hai, isliye `app.locals` (application-wide) ke ulat ek user ka data doosre tak leak hone ka koi risk nahi. Typical uses: middleware jo current user, ek request ID, ya flash messages set kare jinhe ek view phir render kare. Uske bajaye request state ko ek module-level variable pe attach karna ek classic concurrency bug hai.',
    },
    codeExample: {
      code: `// A per-REQUEST bag for passing data between middleware, and
// into templates in a server-rendered app.
app.use((req, res, next) => {
  res.locals.requestId = crypto.randomUUID();
  res.locals.user = req.user;
  next();
});

// Any later middleware or handler can read it:
app.get('/', (req, res) => {
  res.render('home');       // the view can use user and requestId
});

// The important property: it is scoped to ONE request-response
// cycle. Compare app.locals, which is application-wide:
app.locals.siteName = 'Learnverse';       // shared by everyone
res.locals.user = req.user;               // this request only

// Which is why you must NEVER use a module-level variable for
// request state:
let currentUser;                          // ✗ concurrency bug —
app.use((req, res, next) => {             //   two simultaneous
  currentUser = req.user;                 //   requests overwrite
  next();                                 //   each other
});

// In an API you often just attach to req instead (req.user),
// which is the more common convention. res.locals is mainly
// useful when a TEMPLATE needs the value, since views read
// res.locals automatically.`,
      output: `(requestId available to every later layer)`,
    },
  },
  {
    question: 'How do you handle long-running or background jobs in an Express app?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Do not do them inside the request. Accept the request, enqueue a job, and return 202 Accepted with an identifier the client can poll or subscribe to. Process the queue in a SEPARATE worker process using BullMQ, RabbitMQ, or similar. This matters for two reasons: HTTP requests time out, and CPU-heavy work inside Express blocks the event loop and stalls every other request on that instance. It also lets you retry failures without the client having to resubmit.',
      hinglish:
        'Unhe request ke andar mat karo. Request accept karo, ek job enqueue karo, aur ek identifier ke saath 202 Accepted return karo jise client poll ya subscribe kar sake. Queue ko ek ALAG worker process mein process karo BullMQ, RabbitMQ, ya similar se. Ye do wajahon se matter karta hai: HTTP requests timeout hoti hain, aur Express ke andar CPU-heavy kaam event loop block karta hai aur us instance ki har doosri request rok deta hai. Ye tumhe failures retry karne bhi deta hai bina client ke dobara submit kiye.',
    },
    codeExample: {
      code: `// ✗ Doing it inline blocks the response and may time out
app.post('/report', async (req, res) => {
  const pdf = await generateHugeReport();   // 45 seconds
  res.send(pdf);                            // the client gave up
});

// ✓ Accept, enqueue, return immediately
import { Queue } from 'bullmq';
const reports = new Queue('reports', { connection: redis });

app.post('/report', async (req, res) => {
  const job = await reports.add('generate', { userId: req.user.id });
  res.status(202).json({ jobId: job.id });   // 202 Accepted
});

app.get('/report/:jobId', async (req, res) => {
  const job = await reports.getJob(req.params.jobId);
  res.json({ status: await job.getState(), result: job.returnvalue });
});

// A SEPARATE worker process does the work:
new Worker('reports', async (job) => generateHugeReport(job.data), { connection: redis });

// Why a separate process: CPU-heavy work in the web process
// blocks the event loop and stalls every other request.

// Then tell the client it is ready — polling, a webhook, SSE
// or a WebSocket.

// You also get retries, backoff and a dead-letter queue for
// free, which an inline await gives you none of.`,
      output: `202 { "jobId": "17" }`,
    },
  },
  {
    question: 'What is the purpose of separating app.js from server.js?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Keeping the Express app configuration in one module and the `listen()` call in another means tests can import and exercise the app WITHOUT binding a port — which makes test suites fast, parallelisable, and free of port conflicts. It also lets the same app run under different entry points: a normal server, a serverless handler, or a clustered process manager. It is a small structural decision that removes a surprising amount of friction later.',
      hinglish:
        'Express app configuration ko ek module mein aur `listen()` call ko doosre mein rakhne ka matlab hai ki tests app ko import aur exercise kar sakte hain BINA ek port bind kiye — jo test suites ko fast, parallelisable, aur port conflicts se free banata hai. Ye wahi app ko different entry points ke under chalne bhi deta hai: ek normal server, ek serverless handler, ya ek clustered process manager. Ye ek chhota structural decision hai jo baad mein surprising amount ki friction hataata hai.',
    },
    codeExample: {
      code: `// app.js — build and CONFIGURE the app. No listening.
import express from 'express';
const app = express();
app.use(express.json());
app.use('/api', apiRouter);
export default app;

// server.js — the only place that binds a port.
import app from './app.js';
const server = app.listen(process.env.PORT ?? 3000);
process.on('SIGTERM', () => server.close(() => process.exit(0)));

// The main reason: TESTS can import the app without starting a
// server, so they are fast, parallel-safe and free of port
// conflicts:
import request from 'supertest';
import app from './app.js';
await request(app).get('/api/users').expect(200);
// No listen(), no teardown, no "address already in use".

// It also lets the same app run under different entry points:
//   • a normal server
//   • a serverless handler (Vercel, Lambda)
//   • a clustered process manager
//   • a test runner

// And it separates two genuinely different concerns:
//   app.js    → what the application IS
//   server.js → how it is HOSTED

// It is a small structural decision that removes a surprising
// amount of friction later.`,
      output: `✓ tests run with no port bound`,
    },
  },
  {
    question: 'How do you version an Express API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The most common approach is URL versioning — mounting routers at `/api/v1` and `/api/v2` — because it is explicit, easy to route, cache, and debug. Alternatives are a custom header or content negotiation via Accept, which keep URLs clean but are harder to test and cache. Whichever you choose, version only on BREAKING changes; additive changes should not force a new version. Keep the old version running with a documented deprecation window rather than removing it abruptly.',
      hinglish:
        'Sabse common approach URL versioning hai — routers ko `/api/v1` aur `/api/v2` pe mount karna — kyunki ye explicit hai, route, cache, aur debug karna easy hai. Alternatives ek custom header ya Accept se content negotiation hain, jo URLs clean rakhte hain par test aur cache karna mushkil hai. Jo bhi chuno, sirf BREAKING changes pe version karo; additive changes ko ek naya version force nahi karna chahiye. Purane version ko ek documented deprecation window ke saath chalta rakho, use achanak hataane ke bajaye.',
    },
    codeExample: {
      code: `// URL versioning — the most common, and the easiest to route,
// cache, log and debug.
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
// GET /api/v2/users

// Header versioning — cleaner URLs, harder to test in a browser:
app.use('/api', (req, res, next) => {
  req.apiVersion = req.headers['accept-version'] ?? 'v1';
  next();
});

// The rule that matters: version only on BREAKING changes.
//   ADDING a field            → no new version
//   removing or renaming one  → new version
//   changing a type or format → new version
//   changing an error shape   → new version

// Because adding is safe, most changes should not need a
// version bump at all. Teams that version every release end up
// maintaining six of them.

// Share what has not changed, rather than copying the router:
v2Router.use('/health', sharedHealthRouter);

// And plan the ENDING, not just the start:
app.use('/api/v1', (req, res, next) => {
  res.setHeader('Deprecation', 'true');
  res.setHeader('Sunset', 'Wed, 01 Jan 2026 00:00:00 GMT');
  next();
});
// Announce a date, warn in the response, then remove it.`,
      output: `Deprecation: true · Sunset: Wed, 01 Jan 2026`,
    },
  },
  {
    question: 'What causes "Cannot set headers after they are sent" and how do you fix it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'It means code tried to send a response after one was already sent. Common causes: calling `res.json()` and then continuing rather than returning; calling `next()` after responding, so a later handler responds again; a forgotten `return` in an early-exit validation branch; or an async callback firing after the request already completed. The fix is almost always to `return` when you respond, making it structurally impossible for execution to continue past the point of response.',
      hinglish:
        'Iska matlab hai code ne ek response bhejne ki koshish ki jab ek pehle hi bheja ja chuka tha. Common causes: `res.json()` call karke return karne ke bajaye continue karna; respond karne ke baad `next()` call karna, isliye ek baad ka handler dobara respond karta hai; ek early-exit validation branch mein ek bhoola hua `return`; ya ek async callback jo request complete hone ke baad fire ho. Fix almost hamesha respond karte waqt `return` karna hai, jo execution ke liye response ke point se aage badhna structurally impossible bana deta hai.',
    },
    codeExample: {
      code: `// It means something tried to respond TWICE.

// Cause 1 — no return after responding
app.get('/x', (req, res) => {
  if (!user) res.status(404).send('nope');   // ✗ no return
  res.json(user);                            //   runs anyway
});
// Fix:
  if (!user) return res.status(404).send('nope');   // ✓

// Cause 2 — calling next() after responding
res.json(data);
next();                    // ✗ a later layer responds again

// Cause 3 — an async callback firing after the response
app.get('/y', (req, res) => {
  setTimeout(() => res.send('late'), 5000);
  res.send('now');         // ✗ the timeout fires afterwards
});

// Cause 4 — an error handler running after a partial response
// has already been flushed. Guard it:
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);     // ✓ let Node close it
  res.status(500).json({ error: 'Internal' });
});

// The habit that prevents nearly all of these: ALWAYS return
// when you respond. It makes it structurally impossible for
// execution to continue past the point of response.`,
      output: `Error [ERR_HTTP_HEADERS_SENT]`,
    },
  },
  {
    question: 'How do you handle environment-specific configuration in Express?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Read everything from `process.env`, loaded from a gitignored `.env` locally via dotenv and from the platform\'s secret manager in production. Validate the whole configuration at STARTUP with a schema and crash immediately if something required is missing — failing fast at boot is far better than a request failing at 3am because a variable was never set. Use `NODE_ENV` to switch behaviour such as error verbosity, and never commit real secrets to the repository.',
      hinglish:
        'Sab kuch `process.env` se padho, locally dotenv se ek gitignored `.env` se load karke aur production mein platform ke secret manager se. Poori configuration ko STARTUP pe ek schema se validate karo aur agar kuch required missing ho to turant crash karo — boot pe fast fail hona ek variable kabhi set na hone ki wajah se 3am pe ek request fail hone se bahut better hai. Error verbosity jaise behaviour switch karne ke liye `NODE_ENV` use karo, aur repository mein kabhi real secrets commit mat karo.',
    },
    codeExample: {
      code: `// Everything comes from the environment, never from a
// hardcoded value or a committed file.
// Locally, load a gitignored .env:
import 'dotenv/config';

// VALIDATE at startup so a missing variable crashes at boot,
// not at 3am on the one request that needs it:
import { z } from 'zod';

export const env = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
}).parse(process.env);      // throws immediately if wrong

// Then use the typed object, never process.env directly:
app.listen(env.PORT);

// Switch behaviour by environment:
if (env.NODE_ENV === 'production') {
  app.use(helmet());
  app.set('trust proxy', 1);
} else {
  app.use(morgan('dev'));
}

// In production do NOT ship .env — the platform injects real
// variables (Vercel, Render, AWS Secrets Manager, K8s Secrets).

// Commit a .env.example with the KEYS and dummy values so a new
// developer knows what to set. And rotate anything that was
// ever committed — assume it leaked.`,
      output: `ZodError: JWT_SECRET must contain at least 32 characters`,
    },
  },
  {
    question: 'What is the difference between Express Router and a sub-app?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A ROUTER is a lightweight, isolated middleware and route stack that you mount onto an app — the normal way to organise routes by resource. A SUB-APP is a full Express application mounted with `app.use(path, subApp)`, so it has its own settings, view engine, and locals, and inherits little from the parent. Routers cover nearly every real case; sub-apps are worth reaching for only when a section genuinely needs different application-level configuration.',
      hinglish:
        'Ek ROUTER ek lightweight, isolated middleware aur route stack hai jise tum ek app pe mount karte ho — routes ko resource se organise karne ka normal tareeka. Ek SUB-APP ek full Express application hai jo `app.use(path, subApp)` se mount hoti hai, isliye uski apni settings, view engine, aur locals hoti hain, aur wo parent se kam inherit karti hai. Routers almost har real case cover karte hain; sub-apps ko uthana sirf tab worth hai jab ek section ko genuinely different application-level configuration chahiye.',
    },
    codeExample: {
      code: `// ROUTER — a lightweight, isolated middleware and route stack.
const router = express.Router();
router.use(auth);
router.get('/', handler);
app.use('/api/users', router);

// SUB-APP — a full Express application mounted inside another.
const sub = express();
sub.set('view engine', 'pug');       // ← its OWN settings
sub.get('/', handler);
app.use('/admin', sub);

// The difference: a sub-app has its own settings, view engine
// and app.locals, and inherits little from the parent. A router
// shares the parent's.

// A sub-app is also heavier — it is a whole app object — and
// it changes req.app inside it:
sub.get('/', (req) => req.app === sub);      // true

// Routers cover almost every real case: organising routes by
// resource, applying middleware to a section, splitting files.

// Reach for a sub-app only when a section genuinely needs
// different APPLICATION-level configuration — a different
// template engine, or different app settings.

// Both strip the mount path, so routes inside are written
// relative to it:
app.use('/api/users', router);
router.get('/:id', …);              // → /api/users/:id`,
      output: `GET /api/users/42`,
    },
  },
  {
    question: 'How do you implement pagination in an Express API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Accept `page` and `limit` (or `cursor`) as query parameters, validate and CAP the limit so a client cannot request a million rows, and return both the data and metadata — total count, current page, and whether more exists. Offset pagination is simple but degrades on deep pages; cursor pagination stays fast and avoids the duplicate-and-skip problem when rows shift between requests, at the cost of not being able to jump to an arbitrary page.',
      hinglish:
        '`page` aur `limit` (ya `cursor`) ko query parameters ke roop mein accept karo, limit validate aur CAP karo taaki ek client das lakh rows request na kar sake, aur data aur metadata dono return karo — total count, current page, aur zyada hai ya nahi. Offset pagination simple hai par deep pages pe degrade hoti hai; cursor pagination fast rehti hai aur requests ke beech rows shift hone pe duplicate-and-skip problem avoid karti hai, ek arbitrary page pe jump na kar paane ke cost pe.',
    },
    codeExample: {
      code: `// OFFSET pagination — simple, and fine for shallow pages.
app.get('/posts', async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 20);   // ✓ CAP it
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Post.find().sort({ _id: -1 }).skip(skip).limit(limit).lean(),
    Post.countDocuments(),
  ]);

  res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
});

// Always cap the limit. Without it, ?limit=1000000 is a free
// denial-of-service.

// The problem with offset: skip(100000) makes the database walk
// and discard 100,000 rows. It also duplicates or skips items
// when rows are inserted between requests.

// CURSOR pagination — constant time at any depth:
app.get('/posts', async (req, res) => {
  const { cursor, limit = 20 } = req.query;
  const q = cursor ? { _id: { $lt: cursor } } : {};
  const items = await Post.find(q).sort({ _id: -1 }).limit(+limit + 1);

  const hasMore = items.length > limit;
  res.json({
    items: items.slice(0, limit),
    nextCursor: hasMore ? items[limit - 1]._id : null,
  });
});
// The trade: no jumping to an arbitrary page number.`,
      output: `{ "items": [...], "page": 2, "total": 143 }`,
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];

// Attach the step-by-step walkthroughs, which live in their own file so this
// one stays navigable. Keys are matched on the exact question text; anything
// left over is a typo we want to hear about rather than silently lose.
const unmatched = new Set(Object.keys(deepDives));
for (const q of generalInterviewQuestions) {
  const sections = deepDives[q.question];
  if (!sections) continue;
  q.deepDive = sections;
  unmatched.delete(q.question);
}
if (unmatched.size > 0) {
  console.warn(`[express] ${unmatched.size} deep-dive key(s) match no question:`);
  for (const key of unmatched) console.warn(`  ${key}`);
}
