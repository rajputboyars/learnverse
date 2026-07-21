// Express.js curriculum — beginner -> intermediate -> advanced.
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
  title: 'Express.js',
  slug: 'express',
  description:
    'Node ke liye web framework — routing, middleware aur REST APIs. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🚂',
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
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
