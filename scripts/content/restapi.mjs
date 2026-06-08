// REST API & JWT Auth curriculum — beginner -> intermediate -> advanced.
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
  title: 'REST API & JWT Auth',
  slug: 'restapi',
  description:
    'Production-ready APIs banao — REST principles, Express routes, JWT authentication aur security. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🔐',
  tags: ['rest', 'api', 'jwt', 'authentication', 'backend', 'express'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 14,
};

const beginner = [
  {
    title: 'REST API Fundamentals',
    level: 'beginner',
    description: 'REST kya hai, HTTP methods aur API design.',
    concepts: [
      {
        title: 'What is a REST API',
        difficulty: 'easy',
        tags: ['rest', 'api', 'http', 'basics'],
        explanation: {
          english:
            'A REST (Representational State Transfer) API is an architectural style for web services. Clients and servers communicate over HTTP using standard methods (GET, POST, PUT, PATCH, DELETE). Resources are identified by URLs, and data is typically exchanged as JSON. REST is stateless — each request carries all the information the server needs.',
          hinglish:
            'REST (Representational State Transfer) API web services ke liye ek architectural style hai. Clients aur servers standard methods (GET, POST, PUT, PATCH, DELETE) use karke HTTP ke through communicate karte hain. Resources URLs se identify hote hain, aur data typically JSON ke roop mein exchange hota hai. REST stateless hai — har request mein woh sab information hoti hai jo server ko chahiye.',
        },
        dailyLifeExample:
          'REST API ek restaurant menu jaisi hai. Menu items resources hain (URLs), waiter HTTP method hai, aur order request hai. GET = "menu dikhao", POST = "order karo", PUT = "order badlo", DELETE = "order cancel karo". Waiter (server) stateless hai — har baar poora order batana padta hai, pichle order ki yaad nahi.',
        codeExample:
          '// REST API design for a courses resource\nGET    /api/courses          // get all courses\nGET    /api/courses/:id       // get single course\nPOST   /api/courses          // create a course\nPUT    /api/courses/:id       // update entire course\nPATCH  /api/courses/:id       // partial update\nDELETE /api/courses/:id       // delete a course\n\n// HTTP Status Codes\n200 OK           // success\n201 Created      // resource created\n400 Bad Request  // client sent bad data\n401 Unauthorized // not logged in\n403 Forbidden    // logged in but no permission\n404 Not Found    // resource doesn\'t exist\n500 Server Error // something broke on server',
        keyPoints: [
          'Stateless — each request is self-contained',
          'Resources identified by nouns in URLs (not verbs)',
          'HTTP methods define the action (GET, POST, PUT, DELETE)',
          'Use proper HTTP status codes in responses',
        ],
        quiz: [
          {
            question: 'Which HTTP method is used to CREATE a new resource?',
            options: ['GET', 'PUT', 'POST', 'PATCH'],
            correctIndex: 2,
          },
          {
            question: 'What does a 401 status code mean?',
            options: ['Resource not found', 'Server error', 'Not authenticated', 'Bad request'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What does "stateless" mean in REST?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'Stateless means the server does not store any client session state between requests. Every request must contain all the information needed to process it (credentials, params, body). This makes REST APIs scalable — any server instance can handle any request because no shared session is needed. Authentication state is conveyed via tokens (JWT) in each request.',
              hinglish:
                'Stateless ka matlab hai ki server requests ke beech koi client session state store nahi karta. Har request mein woh sab information honi chahiye jo use process karne ke liye zaroor hai (credentials, params, body). Isse REST APIs scalable hoti hain — koi bhi server instance koi bhi request handle kar sakta hai kyunki koi shared session chahiye nahi. Authentication state har request mein tokens (JWT) ke through convey hoti hai.',
            },
          },
        ],
      },
      {
        title: 'Building REST APIs with Express',
        difficulty: 'easy',
        tags: ['express', 'rest', 'routes', 'middleware'],
        explanation: {
          english:
            'Express makes building REST APIs straightforward. Define route handlers for each endpoint, use `express.json()` middleware to parse request bodies, send responses with `res.json()` and appropriate status codes, and handle errors with a 4-parameter middleware.',
          hinglish:
            'Express REST APIs build karna straightforward banata hai. Har endpoint ke liye route handlers define karo, request bodies parse karne ke liye `express.json()` middleware use karo, `res.json()` aur appropriate status codes se responses bhejo, aur 4-parameter middleware se errors handle karo.',
        },
        dailyLifeExample:
          'Express router ek call center dashboard jaisi hai — har number (route) ke liye alag agent (handler) assigned hai. Customer call (request) aati hai, sahi agent handle karta hai, response bhejta hai. Middleware supervisor jaisa hai jo har call pehle screen karta hai.',
        codeExample:
          'import express from "express";\nimport mongoose from "mongoose";\nimport Course from "./models/Course.js";\n\nconst app = express();\napp.use(express.json()); // parse JSON bodies\n\n// GET all courses\napp.get("/api/courses", async (req, res) => {\n  try {\n    const courses = await Course.find({ status: "published" });\n    res.json({ success: true, data: courses });\n  } catch (err) {\n    res.status(500).json({ success: false, message: err.message });\n  }\n});\n\n// POST create course\napp.post("/api/courses", async (req, res) => {\n  try {\n    const course = await Course.create(req.body);\n    res.status(201).json({ success: true, data: course });\n  } catch (err) {\n    res.status(400).json({ success: false, message: err.message });\n  }\n});\n\n// Error handling middleware (must be last)\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ message: "Something went wrong" });\n});\n\napp.listen(5000, () => console.log("API running on :5000"));',
        keyPoints: [
          'express.json() middleware parses incoming JSON bodies',
          'Always wrap async handlers in try/catch',
          'Return appropriate status codes (201 for created, etc.)',
          '4-param (err, req, res, next) middleware handles errors',
        ],
        quiz: [
          {
            question: 'What does `express.json()` do?',
            options: [
              'Returns JSON responses',
              'Parses incoming JSON request bodies into req.body',
              'Converts responses to JSON',
              'Validates JSON schema',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is middleware in Express and how does it work?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Middleware are functions with access to req, res, and next. They execute in sequence for every matching request. Each middleware can modify req/res, end the request, or call next() to pass control to the next middleware. Examples: express.json() (parse body), cors() (allow cross-origin), auth middleware (verify token), error handler. Order matters — define error handlers last.',
              hinglish:
                'Middleware functions hain jinhe req, res, aur next ka access hota hai. Ye har matching request ke liye sequence mein execute hote hain. Har middleware req/res modify kar sakta hai, request end kar sakta hai, ya next() call karke control agle middleware ko pass kar sakta hai. Examples: express.json() (body parse), cors() (cross-origin allow), auth middleware (token verify), error handler. Order matter karta hai — error handlers last define karo.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'JWT Authentication',
    level: 'intermediate',
    description: 'JSON Web Tokens se secure authentication implement karna.',
    concepts: [
      {
        title: 'How JWT Works',
        difficulty: 'medium',
        tags: ['jwt', 'authentication', 'security'],
        explanation: {
          english:
            'A JSON Web Token (JWT) is a compact, URL-safe token consisting of three Base64-encoded parts separated by dots: Header (algorithm), Payload (claims — user data), Signature (verifies authenticity). The server signs the token with a secret; clients send it in every request header. The server verifies the signature — no database lookup needed.',
          hinglish:
            'JSON Web Token (JWT) teen dots se alag Base64-encoded parts wala ek compact, URL-safe token hai: Header (algorithm), Payload (claims — user data), Signature (authenticity verify karta hai). Server token ko secret se sign karta hai; clients har request header mein bhejte hain. Server signature verify karta hai — koi database lookup nahi chahiye.',
        },
        dailyLifeExample:
          'JWT metro card jaisi hai. Metro (server) ne pehli baar validate karke card banaya (login). Baad mein har baar card scanner (server) card check karta hai bina ticket counter (database) gaye. Signature ensure karta hai ki card fake nahi bana.',
        codeExample:
          '// Structure: header.payload.signature\n// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjMiLCJlbWFpbCI6ImFyam…\n\nimport jwt from "jsonwebtoken";\n\n// Sign a token (at login)\nconst token = jwt.sign(\n  { userId: user._id, email: user.email, role: user.role },\n  process.env.JWT_SECRET,\n  { expiresIn: "7d" }\n);\n\n// Verify a token (in auth middleware)\ntry {\n  const decoded = jwt.verify(token, process.env.JWT_SECRET);\n  req.user = decoded; // { userId, email, role, iat, exp }\n  next();\n} catch (err) {\n  res.status(401).json({ message: "Invalid or expired token" });\n}',
        keyPoints: [
          'JWT = Header.Payload.Signature — all Base64 encoded',
          'Sign with secret at login; verify on every protected request',
          'Payload is NOT encrypted — never store passwords in it',
          'Set short expiry (15min–7days) + use refresh tokens',
        ],
        quiz: [
          {
            question: 'Is the JWT payload encrypted?',
            options: [
              'Yes — it is encrypted with AES-256',
              'No — it is only Base64 encoded and anyone can decode it',
              'Only if you use RS256 algorithm',
              'Yes — the secret encrypts it',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What are the three parts of a JWT and what does each do?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Header: JSON object specifying the token type ("JWT") and signing algorithm (HS256, RS256) — Base64URL encoded. Payload: JSON object with claims — registered (iss, sub, exp, iat), public, and private (your custom data like userId, role) — Base64URL encoded. Signature: HMAC or RSA hash of header + payload using the secret — proves the token wasn\'t tampered with. Only the signature is secure; payload is readable by anyone.',
              hinglish:
                'Header: token type ("JWT") aur signing algorithm (HS256, RS256) specify karta JSON object — Base64URL encoded. Payload: claims wala JSON object — registered (iss, sub, exp, iat), public, aur private (tumhara custom data jaise userId, role) — Base64URL encoded. Signature: secret use karke header + payload ka HMAC ya RSA hash — prove karta hai ki token tamper nahi hua. Sirf signature secure hai; payload koi bhi read kar sakta hai.',
            },
          },
        ],
      },
      {
        title: 'Auth Middleware and Protected Routes',
        difficulty: 'medium',
        tags: ['middleware', 'authentication', 'authorization', 'routes'],
        explanation: {
          english:
            'An auth middleware function verifies the JWT on incoming requests. It reads the token from the Authorization header (`Bearer <token>`), verifies it, and attaches the decoded user to `req.user`. Protected routes use this middleware — unauthenticated requests are rejected with 401. Role-based access control (RBAC) checks `req.user.role` for authorisation.',
          hinglish:
            'Auth middleware function incoming requests pe JWT verify karta hai. Authorization header se token read karta hai (`Bearer <token>`), verify karta hai, aur decoded user ko `req.user` pe attach karta hai. Protected routes ye middleware use karte hain — unauthenticated requests 401 ke saath reject ho jaati hain. Role-based access control (RBAC) authorization ke liye `req.user.role` check karta hai.',
        },
        dailyLifeExample:
          'Auth middleware security guard jaisa hai jo office ke main gate pe khada hai. Har visitor ka ID card (token) check karta hai. Valid ID wala andar, invalid ID wala bahar. Senior manager area ke liye alag guard hai jo role check karta hai — "sirf managers allowed".',
        codeExample:
          '// middleware/auth.js\nimport jwt from "jsonwebtoken";\n\nexport function authenticate(req, res, next) {\n  const authHeader = req.headers.authorization;\n  if (!authHeader?.startsWith("Bearer ")) {\n    return res.status(401).json({ message: "No token provided" });\n  }\n  const token = authHeader.split(" ")[1];\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch {\n    res.status(401).json({ message: "Invalid or expired token" });\n  }\n}\n\nexport function authorise(...roles) {\n  return (req, res, next) => {\n    if (!roles.includes(req.user.role)) {\n      return res.status(403).json({ message: "Forbidden" });\n    }\n    next();\n  };\n}\n\n// routes/courses.js\nrouter.get("/",                          getAllCourses);  // public\nrouter.post("/",  authenticate, authorise("admin"), createCourse); // admin only\nrouter.delete("/:id", authenticate, authorise("admin"), deleteCourse);',
        keyPoints: [
          'Read token from "Authorization: Bearer <token>" header',
          'jwt.verify() throws on invalid/expired token',
          'Attach decoded payload to req.user for downstream use',
          'Separate authentication (who) from authorisation (what)',
        ],
        quiz: [
          {
            question: 'What HTTP header is conventionally used to send a JWT?',
            options: [
              'Content-Type',
              'Authorization: Bearer <token>',
              'X-Auth-Token',
              'Cookie: jwt=<token>',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between authentication and authorisation?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'Authentication answers "who are you?" — verifying identity (login, JWT check). Authorisation answers "what are you allowed to do?" — checking permissions (is this user an admin? can they delete courses?). Authentication comes first; you must know who the user is before deciding what they can do. JWT handles authentication; role/permission checks handle authorisation.',
              hinglish:
                'Authentication poochhta hai "tum kaun ho?" — identity verify karna (login, JWT check). Authorisation poochhta hai "tumhe kya karne ki permission hai?" — permissions check karna (kya yeh user admin hai? kya woh courses delete kar sakte hain?). Authentication pehle aata hai; yeh jaanne ke baad ki user kaun hai, tabhi decide karo ki woh kya kar sakte hain. JWT authentication handle karta hai; role/permission checks authorisation.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'API Security Best Practices',
    level: 'intermediate',
    description: 'Rate limiting, input validation aur common security patterns.',
    concepts: [
      {
        title: 'Input Validation and Sanitisation',
        difficulty: 'medium',
        tags: ['validation', 'security', 'zod', 'express-validator'],
        explanation: {
          english:
            'Never trust user input. Validate that data matches expected types and constraints; sanitise to remove dangerous content. Libraries like Zod (TypeScript-first schema validation) or express-validator make this clean and composable. Return 400 errors with clear messages for invalid input.',
          hinglish:
            'User input par kabhi trust mat karo. Validate karo ki data expected types aur constraints se match karta hai; dangerous content remove karne ke liye sanitise karo. Zod (TypeScript-first schema validation) ya express-validator jaisi libraries ise clean aur composable banati hain. Invalid input ke liye clear messages ke saath 400 errors return karo.',
        },
        dailyLifeExample:
          'Input validation bank form jaisa hai — age field mein text nahi daal sakte, phone number 10 digits hona chahiye, email format sahi hona chahiye. Validation form submit hone se pehle hi galat data rok deta hai.',
        codeExample:
          '// Using Zod for validation\nimport { z } from "zod";\n\nconst registerSchema = z.object({\n  name: z.string().min(2).max(50),\n  email: z.string().email(),\n  password: z.string()\n    .min(8)\n    .regex(/[A-Z]/, "Must contain uppercase")\n    .regex(/[0-9]/, "Must contain a number"),\n});\n\napp.post("/api/auth/register", async (req, res) => {\n  const result = registerSchema.safeParse(req.body);\n  if (!result.success) {\n    return res.status(400).json({\n      message: "Validation failed",\n      errors: result.error.flatten().fieldErrors,\n    });\n  }\n  const { name, email, password } = result.data;\n  // ... create user\n});',
        keyPoints: [
          'Validate at every API boundary — never trust the client',
          'Zod / Joi / express-validator for schema validation',
          'Sanitise HTML inputs to prevent XSS',
          'Return 400 with clear error messages for invalid input',
        ],
        quiz: [
          {
            question: 'What HTTP status code should you return for invalid input?',
            options: ['200', '401', '400', '500'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you prevent SQL/NoSQL injection in an API?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'For SQL: use parameterised queries / prepared statements — never concatenate user input into SQL strings. For MongoDB/Mongoose: validate and whitelist input with a schema validation library (Zod, Joi) before passing to queries. Mongoose schemas also help by casting types. Never pass raw req.body directly to Mongoose queries like `Model.findOne(req.body)` — an attacker can send `{ $gt: "" }` to bypass filters.',
              hinglish:
                'SQL ke liye: parameterised queries / prepared statements use karo — kabhii user input ko SQL strings mein concatenate mat karo. MongoDB/Mongoose ke liye: queries mein pass karne se pehle schema validation library (Zod, Joi) se input validate aur whitelist karo. Mongoose schemas type casting mein bhi help karte hain. Kabhi bhi raw req.body directly Mongoose queries mein mat pass karo jaise `Model.findOne(req.body)` — attacker filters bypass karne ke liye `{ $gt: "" }` bhej sakta hai.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Advanced Auth Patterns',
    level: 'advanced',
    description: 'Refresh tokens, password hashing aur OAuth basics.',
    concepts: [
      {
        title: 'Password Hashing with bcrypt',
        difficulty: 'medium',
        tags: ['bcrypt', 'password', 'security', 'hashing'],
        explanation: {
          english:
            'Never store plain-text passwords. Use bcrypt to hash passwords before saving. bcrypt is a slow hashing algorithm designed for passwords — the "salt rounds" (cost factor) make brute-force attacks expensive. To verify, use bcrypt.compare(). Always hash on the server; never on the client.',
          hinglish:
            'Kabhi bhi plain-text passwords store mat karo. Save karne se pehle passwords hash karne ke liye bcrypt use karo. bcrypt passwords ke liye design kiya gaya slow hashing algorithm hai — "salt rounds" (cost factor) brute-force attacks ko expensive banata hai. Verify karne ke liye bcrypt.compare() use karo. Hamesha server pe hash karo; client pe kabhi nahi.',
        },
        dailyLifeExample:
          'Password hashing meat grinder jaisa hai — ek baar grind karo, wapas original shape nahi milti. Bcrypt extra step add karta hai — har password mein random "namak" (salt) milata hai taaki same password wale users ke bhi alag hashes hoon.',
        codeExample:
          'import bcrypt from "bcryptjs";\n\n// Hash at registration\nconst SALT_ROUNDS = 12;\nconst passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);\nawait User.create({ email, passwordHash }); // store hash, not password\n\n// Verify at login\nconst user = await User.findOne({ email });\nif (!user) return res.status(401).json({ message: "Invalid credentials" });\n\nconst isMatch = await bcrypt.compare(plainPassword, user.passwordHash);\nif (!isMatch) return res.status(401).json({ message: "Invalid credentials" });\n\n// Never reveal WHICH part is wrong (email or password)\n// Same error for both prevents user enumeration attacks',
        keyPoints: [
          'Never store plain-text passwords — always hash',
          'bcrypt adds a random salt automatically',
          '10-12 salt rounds = good balance of security/speed',
          'Same error message for "user not found" and "wrong password"',
        ],
        quiz: [
          {
            question: 'Why do we use bcrypt instead of SHA-256 for password hashing?',
            options: [
              'bcrypt is a newer algorithm',
              'bcrypt is intentionally slow and adds salt, making brute-force expensive',
              'SHA-256 is deprecated',
              'bcrypt is supported by browsers',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is a salt in password hashing and why is it important?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A salt is a random value added to the password before hashing. Without a salt, identical passwords produce identical hashes — an attacker with a rainbow table (precomputed hash-to-password lookup) can crack many passwords at once. A unique salt per user means identical passwords produce different hashes, defeating rainbow tables. bcrypt generates and stores the salt automatically as part of the hash string.',
              hinglish:
                'Salt ek random value hai jo hashing se pehle password mein add ki jaati hai. Salt ke bina, identical passwords identical hashes produce karte hain — rainbow table (precomputed hash-to-password lookup) wala attacker ek saath kai passwords crack kar sakta hai. Har user ke liye unique salt ka matlab hai ki identical passwords alag hashes produce karte hain, rainbow tables ko defeat karte hain. bcrypt hash string ke part ke roop mein salt automatically generate aur store karta hai.',
            },
          },
        ],
      },
    ],
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];

export const generalInterviewQuestions = [
  {
    question: 'What is CORS and how do you handle it in Express?',
    difficulty: 'medium',
    frequency: 'very-common',
    answer: {
      english:
        'CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks requests from a different origin (domain/port/protocol) than the server. In Express, use the `cors` npm package — `app.use(cors({ origin: "https://yourfrontend.com" }))`. In development, you can allow all origins, but in production always specify an allowlist. CORS errors only occur in browsers — server-to-server calls are unaffected.',
      hinglish:
        'CORS (Cross-Origin Resource Sharing) ek browser security policy hai jo server se alag origin (domain/port/protocol) se requests block karti hai. Express mein `cors` npm package use karo — `app.use(cors({ origin: "https://yourfrontend.com" }))`. Development mein sab origins allow kar sakte ho, par production mein hamesha allowlist specify karo. CORS errors sirf browsers mein aate hain — server-to-server calls unaffected hote hain.',
    },
  },
  {
    question: 'How do you structure a Node.js/Express REST API project?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Common structure: routes/ (define endpoints), controllers/ (business logic for each route), middleware/ (auth, validation, error handling), models/ (Mongoose schemas), services/ (reusable logic like sendEmail), config/ (DB connection, env), utils/ (helper functions). Separate concerns: routes just call controllers; controllers use services/models; models define data shape. This makes code testable and maintainable.',
      hinglish:
        'Common structure: routes/ (endpoints define karo), controllers/ (har route ke liye business logic), middleware/ (auth, validation, error handling), models/ (Mongoose schemas), services/ (reusable logic jaise sendEmail), config/ (DB connection, env), utils/ (helper functions). Concerns separate karo: routes sirf controllers call karo; controllers services/models use karo; models data shape define karo. Isse code testable aur maintainable hota hai.',
    },
  },
];
