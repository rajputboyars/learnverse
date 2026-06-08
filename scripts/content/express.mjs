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
