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
          {
            question: 'In good REST API design, URLs should represent...',
            options: ['Actions/verbs (e.g. /getCourse)', 'Resources/nouns (e.g. /courses/:id)', 'Random strings', 'SQL queries'],
            correctIndex: 1,
          },
          {
            question: 'Which status code indicates the client is authenticated but lacks permission for the action?',
            options: ['401', '403', '404', '500'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What does "stateless" mean in REST?',
            difficulty: 'easy',
            frequency: 'common',
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
          {
            question: 'Why should async route handlers be wrapped in try/catch?',
            options: [
              'It is unnecessary in Express',
              'Unhandled promise rejections in async handlers can crash the process or leave requests hanging without a proper error response',
              'try/catch makes routes run faster',
              'Express requires it for syntax reasons',
            ],
            correctIndex: 1,
          },
          {
            question: 'Where should the error-handling middleware (4 params) be placed in an Express app?',
            options: ['First, before any routes', 'Last, after all other routes and middleware', 'It does not matter', 'Inside every route handler'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is middleware in Express and how does it work?',
            difficulty: 'medium',
            frequency: 'common',
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
          {
            question: 'What is the purpose of the signature part of a JWT?',
            options: [
              'It encrypts the payload so no one can read it',
              'It proves the token was issued by the server and was not tampered with',
              'It stores the user\'s password',
              'It is purely decorative',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why does JWT verification not require a database lookup?',
            options: [
              'JWTs are stored in a fast cache instead',
              'The server can verify the signature using its secret, mathematically confirming authenticity without querying storage',
              'JWTs never need to be verified',
              'The database is queried but very quickly',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What are the three parts of a JWT and what does each do?',
            difficulty: 'medium',
            frequency: 'common',
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
          {
            question: 'What does the authorise(...roles) middleware in the example check?',
            options: [
              'Whether the JWT is expired',
              'Whether req.user.role is included in the allowed roles list, rejecting with 403 if not',
              'Whether the request body is valid JSON',
              'Whether the user has a strong password',
            ],
            correctIndex: 1,
          },
          {
            question: 'What happens if authenticate middleware is skipped for a route that expects req.user?',
            options: [
              'Nothing, req.user is always available by default',
              'req.user would be undefined, likely causing an error in any authorise or handler logic relying on it',
              'The request is automatically authenticated another way',
              'Express fills in a default guest user',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between authentication and authorisation?',
            difficulty: 'easy',
            frequency: 'common',
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
          {
            question: 'Why is client-side-only validation (e.g. HTML5 required attribute) not enough for security?',
            options: [
              'It is actually completely sufficient',
              'An attacker can bypass the browser entirely and send raw requests directly to the API, skipping client-side checks',
              'Client-side validation is always slower',
              'Browsers do not support client-side validation',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does `safeParse` (as opposed to `parse`) do in Zod?',
            options: [
              'It throws an exception on invalid data',
              'It returns a result object ({ success, data/error }) instead of throwing, letting you handle validation failures gracefully',
              'It skips validation entirely',
              'It only validates numbers',
            ],
            correctIndex: 1,
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
          {
            question: 'Why should the error message be identical for "user not found" and "wrong password"?',
            options: [
              'It has no security benefit, just convenience',
              'A different message for each case would let an attacker enumerate which emails are registered (user enumeration attack)',
              'Express requires identical error messages',
              'It makes the API faster',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does bcrypt do with the "salt rounds" (cost factor) parameter?',
            options: [
              'It sets the maximum password length',
              'It controls how computationally expensive the hashing is, making brute-force attacks slower and costlier',
              'It determines how many times the user can retry login',
              'It has no effect on hashing',
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
      {
        title: 'Refresh Tokens & Token Rotation',
        difficulty: 'hard',
        tags: ['refresh-token', 'jwt', 'security', 'token-rotation'],
        explanation: {
          english:
            "A short-lived JWT (e.g. 15 minutes) is much safer than a long-lived one — if it leaks, the attacker's window is small. But forcing users to log in again every 15 minutes is terrible UX. The **refresh token** pattern solves this by using TWO tokens with different lifetimes:\n\n- **Access token**: short-lived (e.g. 15 min), sent with every API request in the Authorization header, used to authenticate normal requests.\n- **Refresh token**: long-lived (e.g. 7-30 days), stored securely (an httpOnly cookie, NOT localStorage — this prevents JavaScript/XSS from stealing it), used ONLY to request a new access token when the old one expires. It's never sent with regular API calls.\n\nFlow: access token expires → the client calls a dedicated `/auth/refresh` endpoint, sending the refresh token → the server verifies it, checks it hasn't been revoked (against a stored list/DB), and issues a brand-new access token (and often a new refresh token too — this is **refresh token rotation**).\n\n**Refresh token rotation**: every time a refresh token is used, invalidate it and issue a new one. If a stolen, already-used refresh token is ever presented again, the server detects reuse and can revoke the ENTIRE token family — a strong signal of theft, since a legitimate client would never reuse an already-rotated token. This is why refresh tokens (unlike access tokens) usually need to be tracked server-side (in a database or Redis), even though JWTs are normally 'stateless'.",
          hinglish:
            "Ek short-lived JWT (jaise 15 minutes) ek long-lived se bahut safer hai — agar leak ho, attacker ka window chhota hota hai. Par users ko har 15 minutes mein dobara login karwana bahut bura UX hai. **Refresh token** pattern isse solve karta hai DO tokens use karke jinki lifetimes alag hoti hain:\n\n- **Access token**: short-lived (jaise 15 min), har API request ke saath Authorization header mein bheja jaata hai, normal requests authenticate karne ke liye use hota hai.\n- **Refresh token**: long-lived (jaise 7-30 days), securely store hota hai (ek httpOnly cookie, localStorage NAHI — ye JavaScript/XSS ko use chorane se rokta hai), sirf tab use hota hai jab expired access token ki jagah naya chahiye ho. Ye kabhi normal API calls ke saath nahi bheja jaata.\n\nFlow: access token expire hota hai → client ek dedicated `/auth/refresh` endpoint call karta hai, refresh token bhejte hue → server use verify karta hai, check karta hai ki wo revoke nahi hua (ek stored list/DB ke against), aur ek bilkul naya access token issue karta hai (aur aksar ek naya refresh token bhi — ye **refresh token rotation** hai).\n\n**Refresh token rotation**: har baar jab ek refresh token use hota hai, use invalidate karo aur naya issue karo. Agar ek stolen, already-used refresh token kabhi phir se present kiya jaaye, server reuse detect kar sakta hai aur POORI token family revoke kar sakta hai — theft ka ek strong signal, kyunki ek legitimate client kabhi bhi already-rotated token reuse nahi karega. Isiliye refresh tokens (access tokens ke ulat) usually server-side track karne padte hain (database ya Redis mein), chahe JWTs normally 'stateless' hote hain.",
        },
        dailyLifeExample:
          "Access token waise hai jaise ek din ka event pass — usi din ke liye valid, kho jaaye toh zyada nuksan nahi. Refresh token waise hai jaise ek locker mein rakhi hui ID (secure httpOnly cookie) jise tum sirf naya event pass lene ke liye use karte ho, kabhi event mein directly nahi dikhate. Token rotation waise hai jaise har baar naya event pass lete waqt purani ID ko cancel karke ek nayi de dena — agar koi purani cancelled ID use kare, security alert baj jaata hai.",
        codeExample:
          "// Issue both tokens at login\nconst accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' });\nconst refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });\n\n// Store refresh token securely — httpOnly cookie, not accessible to JS\nres.cookie('refreshToken', refreshToken, {\n  httpOnly: true,\n  secure: true,     // HTTPS only\n  sameSite: 'strict',\n});\n// Also store a hash of it server-side to allow revocation checks\nawait RefreshToken.create({ userId, tokenHash: hash(refreshToken) });\n\n// /auth/refresh endpoint\napp.post('/auth/refresh', async (req, res) => {\n  const oldToken = req.cookies.refreshToken;\n  const stored = await RefreshToken.findOne({ tokenHash: hash(oldToken) });\n  if (!stored) return res.status(401).json({ message: 'Token reused or invalid — revoking all sessions' });\n\n  await RefreshToken.deleteOne({ _id: stored._id }); // rotate: invalidate old one\n  const newAccessToken = jwt.sign({ userId: stored.userId }, ACCESS_SECRET, { expiresIn: '15m' });\n  const newRefreshToken = jwt.sign({ userId: stored.userId }, REFRESH_SECRET, { expiresIn: '7d' });\n  await RefreshToken.create({ userId: stored.userId, tokenHash: hash(newRefreshToken) });\n  res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });\n  res.json({ accessToken: newAccessToken });\n});",
        keyPoints: [
          'Access tokens are short-lived (minutes) to limit damage if leaked; refresh tokens are long-lived (days/weeks)',
          'Refresh tokens should be stored in an httpOnly cookie, never localStorage, to prevent XSS theft',
          'A dedicated /auth/refresh endpoint exchanges a valid refresh token for a new access token',
          'Refresh token rotation invalidates the old refresh token every time it is used, issuing a new one',
          'Detecting reuse of an already-rotated refresh token is a strong signal of theft and can trigger revoking the entire session',
        ],
        quiz: [
          {
            question: 'Why use a short-lived access token together with a long-lived refresh token, instead of one long-lived token?',
            options: [
              'It has no real benefit, just extra complexity',
              'It limits the damage window if the access token leaks, while avoiding forcing users to log in constantly',
              'It makes the app run faster',
              'Long-lived tokens are not supported by JWT',
            ],
            correctIndex: 1,
          },
          {
            question: 'Where should a refresh token be stored on the client, and why?',
            options: [
              'In localStorage, because it is easy to access',
              'In an httpOnly cookie, because JavaScript (and therefore XSS attacks) cannot read it',
              'In a URL query parameter for convenience',
              'In a public JavaScript variable',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does refresh token rotation detect and prevent?',
            options: [
              'Nothing meaningful, it is purely cosmetic',
              'Reuse of a stolen, already-used refresh token — a strong signal of theft that can trigger revoking the whole session',
              'Slow database queries',
              'Expired access tokens only',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Rate Limiting & API Abuse Prevention',
        difficulty: 'medium',
        tags: ['rate-limiting', 'security', 'abuse-prevention'],
        explanation: {
          english:
            "Without limits, a single client (malicious or just buggy) can hammer your API with thousands of requests per second — exhausting server resources, running up cloud bills, or brute-forcing a login endpoint by trying millions of password guesses. **Rate limiting** caps how many requests a client can make within a time window (e.g. 100 requests per 15 minutes per IP).\n\nCommon algorithms:\n- **Fixed window**: count requests in a fixed time bucket (e.g. per minute); resets to zero at the boundary. Simple but allows a burst right at the window edge (double the limit across a boundary).\n- **Sliding window**: a more accurate rolling count that avoids the edge-burst problem.\n- **Token bucket**: each client has a bucket of tokens that refill over time; each request consumes a token. Allows short bursts (using saved-up tokens) while enforcing a steady average rate — the most commonly used algorithm in practice.\n\nIn Express, the `express-rate-limit` package implements this in a few lines. Rate limiting is applied per IP, per API key, or per authenticated user, and is especially critical on sensitive endpoints like `/login` (to stop brute-force credential attacks) and `/auth/refresh`.\n\nWhen a client exceeds the limit, return **HTTP 429 Too Many Requests**, often with a `Retry-After` header telling them when to try again.",
          hinglish:
            "Limits ke bina, ek single client (malicious ya bas buggy) tumhari API ko har second hazaron requests se hammer kar sakta hai — server resources khatam karte hue, cloud bills badhate hue, ya login endpoint ko brute-force karte hue millions of password guesses try karke. **Rate limiting** ek time window ke andar client kitni requests kar sakta hai use cap karta hai (jaise 100 requests per 15 minutes per IP).\n\nCommon algorithms:\n- **Fixed window**: ek fixed time bucket mein requests count karo (jaise per minute); boundary pe zero pe reset. Simple par window edge pe ek burst allow karta hai (boundary ke across double limit).\n- **Sliding window**: ek zyada accurate rolling count jo edge-burst problem avoid karta hai.\n- **Token bucket**: har client ka ek bucket hai tokens ka jo time ke saath refill hote hain; har request ek token consume karti hai. Short bursts allow karta hai (saved-up tokens use karke) jabki steady average rate enforce karta hai — practice mein sabse commonly used algorithm.\n\nExpress mein, `express-rate-limit` package ise kuch lines mein implement karta hai. Rate limiting per IP, per API key, ya per authenticated user apply hoti hai, aur especially critical hai sensitive endpoints jaise `/login` (brute-force credential attacks rokne ke liye) aur `/auth/refresh` pe.\n\nJab koi client limit exceed kare, **HTTP 429 Too Many Requests** return karo, aksar ek `Retry-After` header ke saath jo unhe batata hai kab dobara try karein.",
        },
        dailyLifeExample:
          "Rate limiting waise hai jaise ek water park mein har ride pe ek limit hona ki ek visitor kitni baar ride kar sakta hai ek ghante mein — taaki line mein sab ko fair chance mile aur koi ek hi banda poori ride block na kar de. Token bucket waise hai jaise har visitor ko har ghante 5 naye ride-tokens milte hain — agar unhone save kiye hain to ek saath jaldi-jaldi bhi use kar sakte hain, par overall average rate control mein rehti hai.",
        codeExample:
          "// Express with express-rate-limit\nimport rateLimit from 'express-rate-limit';\n\n// General API limiter\nconst apiLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100,                  // 100 requests per IP per window\n  message: { message: 'Too many requests, please try again later.' },\n  standardHeaders: true,     // adds RateLimit-* headers\n});\napp.use('/api/', apiLimiter);\n\n// Stricter limiter for login (prevent brute-force)\nconst loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 5,                    // only 5 login attempts per IP per 15 min\n  message: { message: 'Too many login attempts, try again later.' },\n});\napp.post('/api/auth/login', loginLimiter, loginHandler);\n\n// Response when limit exceeded:\n// HTTP/1.1 429 Too Many Requests\n// Retry-After: 600",
        keyPoints: [
          'Rate limiting caps how many requests a client can make in a time window, protecting against abuse/DDoS/brute-force',
          'Fixed window: simple but allows a burst at window edges; sliding window fixes that',
          'Token bucket: refills tokens over time, allows short bursts while enforcing a steady average rate',
          'Sensitive endpoints (login, refresh) need stricter limits to prevent credential brute-forcing',
          'Exceeding the limit should return HTTP 429 with a Retry-After header',
        ],
        quiz: [
          {
            question: 'What is the main purpose of rate limiting an API?',
            options: [
              'To make the API slower for everyone',
              'To cap how many requests a client can make in a time window, protecting against abuse, overload, and brute-force attacks',
              'To encrypt API responses',
              'To validate request body schemas',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why does the login endpoint typically need a stricter rate limit than general API endpoints?',
            options: [
              'Login is inherently slower to process',
              'To prevent an attacker from brute-forcing passwords by trying many credential combinations rapidly',
              'Login endpoints do not need rate limiting at all',
              'It has no special security concern',
            ],
            correctIndex: 1,
          },
          {
            question: 'What HTTP status code should be returned when a client exceeds the rate limit?',
            options: ['200', '404', '429', '500'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'OAuth 2.0 Basics (Login with Google/GitHub)',
        difficulty: 'hard',
        tags: ['oauth', 'sso', 'third-party-auth'],
        explanation: {
          english:
            "\"Login with Google\" buttons use **OAuth 2.0**, a protocol that lets your app get LIMITED access to a user's account on another service (Google, GitHub) WITHOUT ever seeing their password. This solves a real problem: users don't want to create yet another password, and your app definitely doesn't want the liability of storing passwords for accounts it doesn't own.\n\nKey roles: the **Resource Owner** (the user), the **Client** (your app), the **Authorization Server** (Google's login system), and the **Resource Server** (Google's API holding the user's data).\n\nThe most common flow — **Authorization Code flow**:\n1. Your app redirects the user to Google's login/consent screen, with your app's `client_id` and requested `scope` (e.g. 'read profile and email').\n2. The user logs into Google (your app never sees their Google password) and approves the permissions.\n3. Google redirects back to your app with a temporary `authorization code`.\n4. Your BACKEND exchanges that code (plus your secret `client_secret`) for an `access_token` — this step happens server-to-server, so the token never passes through the browser where it could be intercepted.\n5. Your backend uses the access token to fetch the user's profile from Google's API, then creates/logs in the corresponding user in YOUR database and issues YOUR OWN JWT/session for subsequent requests.\n\nImportant distinction: OAuth is fundamentally about AUTHORIZATION (granting access to resources), not authentication — **OpenID Connect (OIDC)**, built on top of OAuth 2.0, adds a standardized identity layer (an `id_token`) specifically for 'who is this user' login flows, which is what most 'Sign in with Google' implementations actually use under the hood.",
          hinglish:
            "\"Login with Google\" buttons **OAuth 2.0** use karte hain, ek protocol jo tumhari app ko user ke account pe ek doosri service (Google, GitHub) par LIMITED access deta hai unka password kabhi dekhe BINA. Ye ek real problem solve karta hai: users ek aur password nahi banana chahte, aur tumhari app definitely un accounts ke passwords store karne ki liability nahi chahti jo unke apne nahi hain.\n\nKey roles: **Resource Owner** (user), **Client** (tumhari app), **Authorization Server** (Google ka login system), aur **Resource Server** (Google ki API jisme user ka data hai).\n\nSabse common flow — **Authorization Code flow**:\n1. Tumhari app user ko Google ke login/consent screen pe redirect karti hai, tumhari app ke `client_id` aur requested `scope` (jaise 'profile aur email padhna') ke saath.\n2. User Google mein login karta hai (tumhari app kabhi unka Google password nahi dekhti) aur permissions approve karta hai.\n3. Google tumhari app pe wapas redirect karta hai ek temporary `authorization code` ke saath.\n4. Tumhara BACKEND us code ko (plus tumhara secret `client_secret`) ek `access_token` se exchange karta hai — ye step server-to-server hota hai, isliye token kabhi browser se nahi guzarta jahan wo intercept ho sake.\n5. Tumhara backend access token use karke Google ki API se user ka profile fetch karta hai, phir tumhare DATABASE mein corresponding user create/login karta hai aur baad ki requests ke liye APNA OWN JWT/session issue karta hai.\n\nImportant distinction: OAuth fundamentally AUTHORIZATION ke baare mein hai (resources ka access grant karna), authentication nahi — **OpenID Connect (OIDC)**, jo OAuth 2.0 ke upar built hai, ek standardized identity layer add karta hai (ek `id_token`) specifically 'ye user kaun hai' wale login flows ke liye, jo ki zyadatar 'Sign in with Google' implementations actually use karte hain under the hood.",
        },
        dailyLifeExample:
          "OAuth waise hai jaise ek hotel valet parking — tum apni gaadi ki chaabi (password) valet ko nahi dete, balki ek limited-access valet key deta hai jisse wo sirf park kar sake, poora ghar nahi khol sake. Authorization code flow waise hai jaise ek temporary token lena jo baad mein counter pe (backend) exchange karke asli access milta hai — bicch mein koi bhi is temporary token ko dekh le, use akela kuch nahi mil sakta bina secret ke.",
        codeExample:
          "// Simplified Authorization Code flow with Passport.js (Google OAuth)\nimport passport from 'passport';\nimport { Strategy as GoogleStrategy } from 'passport-google-oauth20';\n\npassport.use(new GoogleStrategy({\n  clientID: process.env.GOOGLE_CLIENT_ID,\n  clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n  callbackURL: '/auth/google/callback',\n}, async (accessToken, refreshToken, profile, done) => {\n  // profile contains { id, displayName, emails, photos } from Google\n  let user = await User.findOne({ googleId: profile.id });\n  if (!user) {\n    user = await User.create({\n      googleId: profile.id,\n      email: profile.emails[0].value,\n      name: profile.displayName,\n    });\n  }\n  done(null, user); // Passport creates YOUR app's session/JWT from here\n}));\n\n// Routes\napp.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));\napp.get('/auth/google/callback',\n  passport.authenticate('google', { session: false }),\n  (req, res) => {\n    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET);\n    res.redirect(`/dashboard?token=${token}`);\n  }\n);",
        keyPoints: [
          'OAuth 2.0 lets your app access a user\'s account on another service (Google, GitHub) without ever seeing their password',
          'Key roles: Resource Owner (user), Client (your app), Authorization Server, Resource Server',
          'Authorization Code flow: redirect to provider -> user approves -> app gets a code -> backend exchanges code for an access token',
          'The token exchange happens server-to-server so the access token never passes through the browser',
          'OAuth is about authorization (access); OpenID Connect (OIDC), built on OAuth, adds the identity/authentication layer used for "Sign in with X"',
        ],
        quiz: [
          {
            question: 'What core problem does "Login with Google" (OAuth) solve for your app?',
            options: [
              'It makes your database faster',
              "It lets your app access limited parts of a user's Google account without ever seeing or storing their Google password",
              'It replaces the need for HTTPS',
              'It automatically writes your API routes',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why does the authorization code get exchanged for an access token on the BACKEND rather than in the browser?',
            options: [
              'It could be done in the browser just as safely',
              'So the client_secret and the resulting access token never pass through the browser, where they could be intercepted or exposed',
              'Browsers cannot make HTTP requests',
              'It is purely a performance optimization',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the key difference between OAuth 2.0 and OpenID Connect (OIDC)?',
            options: [
              'They are exactly the same protocol',
              'OAuth 2.0 is fundamentally about authorization (granting access to resources); OIDC builds on it to add a standardized identity/authentication layer',
              'OIDC replaces OAuth entirely with no relation',
              'OAuth is only for mobile apps',
            ],
            correctIndex: 1,
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
    frequency: 'common',
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
  {
    question: 'What is JWT?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'JWT (JSON Web Token) is a compact, self-contained, URL-safe token format for representing claims (like user identity) that can be verified without a database lookup. It has three Base64URL-encoded parts separated by dots — header (algorithm/type), payload (claims — e.g. userId, role, expiry), and signature (proves the token wasn\'t tampered with, computed from the header+payload using a server-held secret). It is the standard mechanism for stateless authentication in modern APIs.',
      hinglish:
        'JWT (JSON Web Token) claims (jaise user identity) represent karne ke liye ek compact, self-contained, URL-safe token format hai jo bina database lookup ke verify ho sakta hai. Iske teen Base64URL-encoded parts dots se alag hote hain — header (algorithm/type), payload (claims — jaise userId, role, expiry), aur signature (prove karta hai token tamper nahi hua, header+payload se server-held secret use karke compute hota hai). Ye modern APIs mein stateless authentication ka standard mechanism hai.',
    },
  },
  {
    question: 'How does JWT authentication work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Flow: (1) user logs in with credentials. (2) Server verifies them, then SIGNS a JWT containing the user\'s identity/claims using a secret key, and sends it to the client. (3) The client stores the token and includes it in the `Authorization: Bearer <token>` header of every subsequent request. (4) For each protected request, the server VERIFIES the signature (using the same secret) — if valid and not expired, it trusts the claims inside without needing to query a database or session store, making authentication fast and stateless.',
      hinglish:
        'Flow: (1) user credentials se login karta hai. (2) Server unhe verify karta hai, phir user ki identity/claims wala ek JWT ek secret key use karke SIGN karta hai, aur client ko bhejta hai. (3) Client token store karta hai aur har agli request ke `Authorization: Bearer <token>` header mein include karta hai. (4) Har protected request ke liye, server signature VERIFY karta hai (same secret use karke) — agar valid aur expire nahi hua, ye andar ke claims trust karta hai bina database ya session store query kiye, authentication ko fast aur stateless banate hue.',
    },
  },
  {
    question: 'What is OAuth?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'OAuth 2.0 is an authorization protocol that lets an application access LIMITED parts of a user\'s account on another service (Google, GitHub) WITHOUT ever seeing that user\'s password. The user authenticates directly with the provider, approves specific permissions ("scopes"), and the provider issues the app a limited access token. This is what powers "Login with Google/GitHub" buttons — OAuth handles delegated AUTHORIZATION, and OpenID Connect (built on top of it) adds the AUTHENTICATION (identity) layer.',
      hinglish:
        'OAuth 2.0 ek authorization protocol hai jo ek application ko doosri service (Google, GitHub) pe user ke account ke LIMITED parts access karne deta hai user ka password kabhi dekhe BINA. User provider se directly authenticate karta hai, specific permissions ("scopes") approve karta hai, aur provider app ko ek limited access token issue karta hai. Yahi "Login with Google/GitHub" buttons power karta hai — OAuth delegated AUTHORIZATION handle karta hai, aur OpenID Connect (iske upar built) AUTHENTICATION (identity) layer add karta hai.',
    },
  },
  {
    question: 'What is the difference between authentication and authorization?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Authentication answers "WHO are you?" — verifying identity, typically via a login form, JWT, or session. Authorization answers "what are you ALLOWED to do?" — checking permissions AFTER identity is known (e.g. is this authenticated user an admin? can they delete this specific record?). Authentication always happens first; authorization decisions depend on the authenticated identity. Mixing these up is a common security bug — e.g. checking only that a user is logged in, without checking they own the specific resource they\'re trying to modify.',
      hinglish:
        'Authentication poochta hai "tum KAUN ho?" — identity verify karna, typically ek login form, JWT, ya session se. Authorization poochta hai "tumhe kya karne ki ALLOWED hai?" — identity pata chalne ke BAAD permissions check karna (jaise, kya ye authenticated user admin hai? kya wo is specific record ko delete kar sakte hain?). Authentication hamesha pehle hota hai; authorization decisions authenticated identity pe depend karte hain. Inhe mix karna ek common security bug hai — jaise, sirf ye check karna ki user logged in hai, ye check kiye bina ki wo us specific resource ke owner hain jise wo modify karne ki koshish kar rahe hain.',
    },
  },
  {
    question: 'What is bcrypt?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'bcrypt is a password-hashing algorithm specifically designed to be SLOW and computationally expensive (via a configurable "cost factor"/salt rounds), making brute-force attacks impractical — unlike fast general-purpose hashes (MD5, SHA-256) which are BAD for passwords precisely because they are fast. bcrypt also automatically generates and embeds a random SALT into the hash output, so identical passwords produce different hashes, defeating precomputed rainbow-table attacks. `bcrypt.hash(password, 12)` to hash; `bcrypt.compare(password, hash)` to verify.',
      hinglish:
        'bcrypt ek password-hashing algorithm hai jo specifically SLOW aur computationally expensive hone ke liye design kiya gaya hai (ek configurable "cost factor"/salt rounds ke through), brute-force attacks ko impractical banate hue — fast general-purpose hashes (MD5, SHA-256) ke ulat jo passwords ke liye BAD hain exactly isliye kyunki wo fast hain. bcrypt automatically ek random SALT bhi generate karke hash output mein embed karta hai, isliye identical passwords alag hashes produce karte hain, precomputed rainbow-table attacks ko defeat karte hue. Hash ke liye `bcrypt.hash(password, 12)`; verify ke liye `bcrypt.compare(password, hash)`.',
    },
  },
  {
    question: 'Why hash passwords?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Passwords must NEVER be stored in plain text, because if the database is ever breached (a matter of "when", not "if", for many companies over time), attackers get every user\'s actual password immediately — which they can then reuse on OTHER sites since many people reuse passwords. Hashing is a ONE-WAY transformation: you can verify a login attempt by re-hashing the input and comparing, but you cannot reverse a hash back into the original password, so a breach only exposes hashes, not usable credentials.',
      hinglish:
        'Passwords ko plain text mein KABHI store nahi karna chahiye, kyunki agar database kabhi breach ho (bahut companies ke liye time ke saath "kab" ka sawaal hai, "agar" ka nahi), attackers ko turant har user ka actual password mil jaata hai — jise wo phir OTHER sites pe reuse kar sakte hain kyunki bahut log passwords reuse karte hain. Hashing ek ONE-WAY transformation hai: tum ek login attempt ko input ko phir se hash karke aur compare karke verify kar sakte ho, par tum ek hash ko wapas original password mein reverse nahi kar sakte, isliye ek breach sirf hashes expose karta hai, usable credentials nahi.',
    },
  },
  {
    question: 'What is Helmet.js?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Helmet is an Express middleware that sets a collection of security-related HTTP response headers to protect against common web vulnerabilities — e.g. `X-Content-Type-Options: nosniff` (prevents MIME-sniffing attacks), `Strict-Transport-Security` (forces HTTPS), `X-Frame-Options` (prevents clickjacking via iframes), and a Content-Security-Policy. It is a single, low-effort line — `app.use(helmet())` — that closes off many well-known browser-level attack vectors, and is considered a baseline best practice for any production Express app.',
      hinglish:
        'Helmet ek Express middleware hai jo common web vulnerabilities se protect karne ke liye security-related HTTP response headers ka ek collection set karta hai — jaise `X-Content-Type-Options: nosniff` (MIME-sniffing attacks rokta hai), `Strict-Transport-Security` (HTTPS force karta hai), `X-Frame-Options` (iframes ke through clickjacking rokta hai), aur ek Content-Security-Policy. Ye ek single, low-effort line hai — `app.use(helmet())` — jo bahut saare well-known browser-level attack vectors close kar deti hai, aur kisi bhi production Express app ke liye ek baseline best practice mani jaati hai.',
    },
  },
  {
    question: 'What is rate limiting?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Rate limiting caps how many requests a client (identified by IP, API key, or user account) can make within a time window (e.g. 100 requests per 15 minutes). It protects against brute-force login attacks, API abuse, accidental overload from buggy clients, and general DDoS-style traffic. In Express, the `express-rate-limit` package implements this in a few lines; exceeding the limit should return `HTTP 429 Too Many Requests`.',
      hinglish:
        'Rate limiting cap karta hai ek client (IP, API key, ya user account se identify hoke) kitni requests ek time window mein kar sakta hai (jaise 100 requests per 15 minutes). Ye brute-force login attacks, API abuse, buggy clients se accidental overload, aur general DDoS-style traffic se protect karta hai. Express mein, `express-rate-limit` package ise kuch lines mein implement karta hai; limit exceed karne pe `HTTP 429 Too Many Requests` return hona chahiye.',
    },
  },
  {
    question: 'What is CSRF?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CSRF (Cross-Site Request Forgery) tricks a logged-in user\'s browser into unknowingly submitting a request to a site they\'re authenticated on, from a DIFFERENT malicious site — e.g. a hidden form on evil.com that auto-submits to `bank.com/transfer` while the browser still has bank.com\'s auth cookie attached. Defences: CSRF tokens (a random, unpredictable value embedded in forms and validated server-side, which the attacker\'s site can\'t know), the `SameSite=Strict/Lax` cookie attribute (stops cookies from being sent on cross-site requests), and checking the `Origin`/`Referer` header.',
      hinglish:
        'CSRF (Cross-Site Request Forgery) ek logged-in user ke browser ko trick karta hai unknowingly ek request submit karne ke liye jis site pe wo authenticated hai, ek ALAG malicious site se — jaise evil.com pe ek hidden form jo `bank.com/transfer` pe auto-submit ho jaata hai jabki browser mein abhi bhi bank.com ka auth cookie attached hai. Defences: CSRF tokens (forms mein embedded ek random, unpredictable value jo server-side validate hota hai, jo attacker ki site ko pata nahi ho sakta), `SameSite=Strict/Lax` cookie attribute (cookies ko cross-site requests pe bhejne se rokta hai), aur `Origin`/`Referer` header check karna.',
    },
  },
  {
    question: 'What is XSS?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'XSS (Cross-Site Scripting) is when an attacker injects malicious JavaScript into a page that other users then view, letting the attacker\'s script run in the VICTIM\'s browser session — stealing cookies/tokens, defacing the page, or performing actions as the victim. Common form: STORED XSS, where unsanitised user input (e.g. a comment containing `<script>...</script>`) is saved to the database and rendered to other users without escaping. Defences: escape/sanitise all user-generated content before rendering, use frameworks that auto-escape by default (React does this), and set a Content-Security-Policy header.',
      hinglish:
        'XSS (Cross-Site Scripting) tab hai jab ek attacker malicious JavaScript ko ek page mein inject karta hai jise doosre users dekhte hain, attacker ka script VICTIM ke browser session mein chalne dete hue — cookies/tokens chura kar, page deface karke, ya victim ke roop mein actions perform karke. Common form: STORED XSS, jahan unsanitised user input (jaise ek comment jisme `<script>...</script>` ho) database mein save ho jaata hai aur doosre users ko bina escape kiye render hota hai. Defences: rendering se pehle saara user-generated content escape/sanitise karo, aise frameworks use karo jo default se auto-escape karein (React ye karta hai), aur ek Content-Security-Policy header set karo.',
    },
  },
  {
    question: 'What is SQL Injection?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'SQL injection happens when raw, unsanitised user input is directly concatenated into a SQL query string, letting an attacker inject their own SQL logic — classic example: `"SELECT * FROM users WHERE email=\'" + input + "\'"` with `input = "x\' OR \'1\'=\'1"` produces a query that returns ALL users, bypassing the intended filter entirely (and worse payloads can drop tables or exfiltrate data). Defence: ALWAYS use parameterised queries/prepared statements (or an ORM that does this automatically), which treat user input strictly as DATA, never as executable SQL syntax.',
      hinglish:
        'SQL injection tab hoti hai jab raw, unsanitised user input directly ek SQL query string mein concatenate ho jaata hai, ek attacker ko apna khud ka SQL logic inject karne deta hai — classic example: `"SELECT * FROM users WHERE email=\'" + input + "\'"` with `input = "x\' OR \'1\'=\'1"` ek query produce karta hai jo SAARE users return karti hai, intended filter ko poori tarah bypass karte hue (aur worse payloads tables drop kar sakte hain ya data exfiltrate kar sakte hain). Defence: HAMESHA parameterised queries/prepared statements use karo (ya ek ORM jo ye automatically kare), jo user input ko strictly DATA ki tarah treat karte hain, kabhi executable SQL syntax ki tarah nahi.',
    },
  },
  {
    question: 'What is NoSQL Injection?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'NoSQL injection is the MongoDB/NoSQL equivalent of SQL injection — instead of injecting SQL syntax, an attacker exploits the fact that MongoDB query OPERATORS (`$gt`, `$ne`, `$where`) are just JSON keys. If a route naively does `User.findOne(req.body)` and an attacker sends `{ "password": { "$ne": null } }` as the password field, the query becomes "password is not equal to null" — true for basically everyone — bypassing authentication entirely. Defence: validate/whitelist input shape with a schema library (Zod, Joi) BEFORE passing anything to a Mongoose query, and never pass raw `req.body`/`req.query` directly into query methods.',
      hinglish:
        'NoSQL injection SQL injection ka MongoDB/NoSQL equivalent hai — SQL syntax inject karne ke bajaye, ek attacker is fact ko exploit karta hai ki MongoDB query OPERATORS (`$gt`, `$ne`, `$where`) bas JSON keys hain. Agar ek route naively `User.findOne(req.body)` karta hai aur ek attacker password field ke roop mein `{ "password": { "$ne": null } }` bhejta hai, query "password null ke barabar nahi hai" ban jaata hai — basically sabke liye true — authentication ko poori tarah bypass karte hue. Defence: kisi bhi cheez ko Mongoose query mein pass karne se PEHLE ek schema library (Zod, Joi) se input shape validate/whitelist karo, aur kabhi raw `req.body`/`req.query` ko directly query methods mein pass mat karo.',
    },
  },
  {
    question: 'How do you secure an Express app?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A production security checklist: use `helmet()` for security headers; validate ALL input with a schema library before using it; use parameterised queries/an ORM to prevent injection; hash passwords with bcrypt; use HTTPS everywhere and set `secure`/`httpOnly`/`sameSite` on cookies; add rate limiting on sensitive endpoints (login, password reset); keep short-lived JWTs with refresh token rotation; configure CORS with an explicit allowlist, not `*`; keep dependencies updated (`npm audit`); never expose stack traces/internal error details to clients in production; and store all secrets in environment variables, never in source code.',
      hinglish:
        'Ek production security checklist: security headers ke liye `helmet()` use karo; use karne se pehle SAARA input ek schema library se validate karo; injection rokne ke liye parameterised queries/ek ORM use karo; passwords bcrypt se hash karo; sab jagah HTTPS use karo aur cookies pe `secure`/`httpOnly`/`sameSite` set karo; sensitive endpoints (login, password reset) pe rate limiting add karo; refresh token rotation ke saath short-lived JWTs rakho; explicit allowlist ke saath CORS configure karo, `*` nahi; dependencies update rakho (`npm audit`); production mein clients ko kabhi stack traces/internal error details expose mat karo; aur saare secrets environment variables mein store karo, source code mein kabhi nahi.',
    },
  },

  // ─── REST Design ────────────────────────────────────────────
  {
    question: 'What actually makes an API RESTful?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'REST is a set of architectural CONSTRAINTS, not just "JSON over HTTP". They are: a client-server split, STATELESSNESS (every request carries everything needed, so no server-side session), cacheability, a uniform interface built around resources and their representations, layered systems, and optionally code-on-demand. Most APIs called REST satisfy only some of these — particularly they skip HATEOAS — which is why the term is used loosely in practice.',
      hinglish:
        'REST architectural BANDHANON ka ek set hai, sirf "HTTP pe JSON" nahi. Wo hain: ek client-server bantwaara, STATELESSNESS (har request sab zaroori le jaati hai, isliye koi server-side session nahi), cacheability, resources aur unke representations ke around bana ek ek jaisa interface, layered systems, aur optionally code-on-demand. REST kehe jaate zyadatar APIs inme se kuch hi poore karte hain — khaas kar HATEOAS chhod dete hain — isiliye ye shabd practically dheele istemaal hota hai.',
    },
  },
  {
    question: 'What does statelessness mean and why does it matter?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Stateless means the server keeps NO client context between requests — each request carries its own authentication and everything else needed to process it. It matters because it enables horizontal scaling: any instance can serve any request, so you can add servers freely and a crashed instance loses nothing. Storing session state in server memory breaks this, which is why sessions belong in Redis or in a self-contained token instead.',
      hinglish:
        'Stateless ka matlab hai server requests ke beech client ka KOI context nahi rakhta — har request apna authentication aur baaki sab zaroori le jaati hai. Ye isliye matter karta hai kyunki isse horizontal scaling hoti hai: koi bhi instance koi bhi request serve kar sakta hai, isliye tum azaadi se servers jod sakte ho aur ek crash hua instance kuch nahi khota. Session state ko server memory mein rakhna ise todta hai, isiliye sessions Redis ya ek khud-poore token mein rehne chahiye.',
    },
  },
  {
    question: 'What are the HTTP methods and which are idempotent?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'GET reads, POST creates, PUT replaces, PATCH partially updates, DELETE removes. SAFE methods (GET, HEAD, OPTIONS) do not modify anything. IDEMPOTENT methods produce the same result whether called once or many times: GET, PUT, DELETE, HEAD, OPTIONS. POST and PATCH are NOT idempotent — calling POST twice creates two resources, which is exactly why a client that times out and retries can double-charge someone unless you add an idempotency key.',
      hinglish:
        'GET padhta hai, POST banata hai, PUT badalta hai, PATCH aadha update karta hai, DELETE hataata hai. SURAKSHIT methods (GET, HEAD, OPTIONS) kuch nahi badalte. IDEMPOTENT methods ek baar ya bahut baar call hone pe wahi nateeja dete hain: GET, PUT, DELETE, HEAD, OPTIONS. POST aur PATCH idempotent NAHI hain — POST do baar call karna do resources banata hai, jo theek wahi wajah hai ki ek timeout hokar retry karta client kisi ko dugna charge kar sakta hai jab tak tum ek idempotency key na jodo.',
    },
  },
  {
    question: 'What is the difference between PUT and PATCH?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PUT REPLACES the entire resource with the body you send, so any field you omit is effectively cleared — which is why PUT is idempotent. PATCH applies a PARTIAL update, changing only the fields provided. The practical bug is treating PUT like PATCH: sending only the changed field to a PUT endpoint that implements replacement silently wipes everything else. Document clearly which semantics your endpoint actually implements, since many APIs get this wrong.',
      hinglish:
        'PUT poore resource ko tumhari bheji body se BADAL deta hai, isliye jo bhi field tum chhodte ho wo effectively mit jaata hai — isiliye PUT idempotent hai. PATCH ek AADHA update lagata hai, sirf di gayi fields badalte hue. Vyavaharik bug PUT ko PATCH ki tarah maanna hai: replacement karta ek PUT endpoint pe sirf badla field bhejna chupke se baaki sab mita deta hai. Saaf likho ki tumhara endpoint actually kaunse semantics karta hai, kyunki bahut APIs ise galat karte hain.',
    },
  },
  {
    question: 'How should you name REST endpoints?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use plural NOUNS for resources and let the HTTP method express the action — `GET /users`, `POST /users`, `GET /users/5`, `DELETE /users/5`. Avoid verbs in the path, since `/getUsers` and `/deleteUser` duplicate what the method already says. Nest to show ownership — `/users/5/orders` — but stop at about two levels, because deeper nesting becomes unwieldy. Use lowercase with hyphens, and keep naming consistent across the whole API.',
      hinglish:
        'Resources ke liye bahuvachan NOUNS use karo aur HTTP method ko kaam batane do — `GET /users`, `POST /users`, `GET /users/5`, `DELETE /users/5`. Path mein verbs se bacho, kyunki `/getUsers` aur `/deleteUser` wahi dohraate hain jo method pehle hi kehta hai. Maalikana dikhane ke liye nest karo — `/users/5/orders` — par lagbhag do levels pe ruk jao, kyunki gehri nesting sambhaalna mushkil ho jaati hai. Hyphens ke saath lowercase use karo, aur poore API mein naam ek jaise rakho.',
    },
  },
  {
    question: 'What do the main HTTP status codes mean?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '2xx succeeded: 200 OK, 201 Created (return a Location header), 204 No Content for a successful delete. 3xx redirects: 301 permanent, 304 Not Modified for a valid cache. 4xx is the CLIENT\'s fault: 400 malformed, 401 not authenticated, 403 authenticated but not permitted, 404 not found, 409 conflict, 422 validation failed, 429 rate limited. 5xx is the SERVER\'s fault: 500 internal, 502 bad gateway, 503 unavailable. Returning 200 with an error body defeats every HTTP-aware tool.',
      hinglish:
        '2xx safal: 200 OK, 201 Created (ek Location header do), ek safal delete ke liye 204 No Content. 3xx redirects: 301 permanent, ek valid cache ke liye 304 Not Modified. 4xx CLIENT ki galti hai: 400 kharab, 401 authenticate nahi, 403 authenticate par ijaazat nahi, 404 nahi mila, 409 takkar, 422 validation fail, 429 rate limited. 5xx SERVER ki galti hai: 500 internal, 502 bad gateway, 503 unavailable. Ek error body ke saath 200 lautana har HTTP-samajhne wale tool ko hara deta hai.',
    },
  },
  {
    question: 'What is the difference between 401 and 403?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '401 UNAUTHORIZED actually means unauthenticated — the request has no valid credentials, so the client should log in or refresh its token. 403 FORBIDDEN means the server knows who you are and you are not allowed — logging in again will not help. Confusing them breaks client logic, since a client typically retries after a 401 and should not after a 403. Some APIs deliberately return 404 instead of 403 to avoid revealing that a resource exists.',
      hinglish:
        '401 UNAUTHORIZED ka matlab actually authenticate nahi hai — request ke paas valid credentials nahi hain, isliye client ko login ya token refresh karna chahiye. 403 FORBIDDEN ka matlab hai server jaanta hai tum kaun ho aur tumhe ijaazat nahi — dobara login karna madad nahi karega. Inhe uljhaana client logic todta hai, kyunki ek client typically 401 ke baad retry karta hai aur 403 ke baad nahi karna chahiye. Kuch APIs jaan boojh kar 403 ke bajaye 404 lautaate hain taaki ye pata na chale ki ek resource maujood hai.',
    },
  },
  {
    question: 'What is a JWT and what are its three parts?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A JSON Web Token has a HEADER (algorithm and type), a PAYLOAD of claims such as user id and expiry, and a SIGNATURE over the first two using a secret or private key. It is base64url ENCODED, not encrypted — anyone can read the payload, so never put sensitive data in it. The signature guarantees the token was not tampered with, which is what lets a server trust it without a database lookup.',
      hinglish:
        'Ek JSON Web Token mein ek HEADER (algorithm aur type), user id aur expiry jaise claims ka ek PAYLOAD, aur ek secret ya private key se pehle do pe ek SIGNATURE hota hai. Ye base64url ENCODED hai, encrypted nahi — koi bhi payload padh sakta hai, isliye usme kabhi sensitive data mat daalo. Signature pakka karta hai ki token se chhedchhaad nahi hui, jisse ek server bina database lookup ke us pe bharosa karta hai.',
    },
  },
  {
    question: 'What is the difference between an access token and a refresh token?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The ACCESS token is short-lived (minutes) and sent with every request; because it is stateless it cannot be revoked before expiry, so a short life limits the damage if it leaks. The REFRESH token is long-lived, sent only to the token endpoint, and stored in an httpOnly cookie. It is checked against the database, so it CAN be revoked. Rotate refresh tokens on each use and detect reuse of an old one, which indicates theft.',
      hinglish:
        'ACCESS token kam samay ka hai (minute) aur har request ke saath jaata hai; kyunki ye stateless hai ise expiry se pehle radd nahi kiya ja sakta, isliye ek chhoti umar leak hone pe nuksaan seemit karti hai. REFRESH token lambe samay ka hai, sirf token endpoint pe jaata hai, aur ek httpOnly cookie mein rakha jaata hai. Ye database ke against check hota hai, isliye ise radd KIYA ja sakta hai. Har istemaal pe refresh tokens ghumao aur ek purane ka dobara istemaal pakado, jo chori batata hai.',
    },
  },
  {
    question: 'Where should you store a JWT on the client?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'localStorage is convenient but readable by ANY script, so a single XSS steals the token. An httpOnly COOKIE cannot be read by JavaScript, which defeats XSS theft, but is sent automatically and therefore needs `sameSite` and CSRF protection. The common recommendation is an httpOnly, secure, sameSite cookie for the refresh token and the access token held in memory only — memory disappears on refresh, but the refresh token silently obtains a new one.',
      hinglish:
        'localStorage suvidhajanak hai par KISI BHI script se padha ja sakta hai, isliye ek XSS token chura leta hai. Ek httpOnly COOKIE JavaScript se padhi nahi ja sakti, jo XSS chori haraati hai, par ye apne aap jaati hai aur isliye use `sameSite` aur CSRF bachaav chahiye. Common salah ye hai ki refresh token ke liye ek httpOnly, secure, sameSite cookie aur access token sirf memory mein — memory refresh pe gayab hoti hai, par refresh token chupke se ek naya le aata hai.',
    },
  },
  {
    question: 'How do you revoke a JWT?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'You cannot, directly — that is the fundamental trade of stateless tokens: the server does not track them, so a valid signature is accepted until expiry. Workarounds: keep access tokens SHORT-lived so the window is small; maintain a denylist of revoked token ids in Redis, which reintroduces a lookup; or store a `tokenVersion` on the user and reject tokens whose version is stale, which revokes everything on password change or logout-everywhere.',
      hinglish:
        'Tum seedha nahi kar sakte — yahi stateless tokens ka mool trade hai: server unhe track nahi karta, isliye ek valid signature expiry tak maana jaata hai. Upaay: access tokens ko CHHOTI umar ka rakho taaki window chhoti ho; Redis mein radd kiye token ids ki ek denylist rakho, jo ek lookup wapas le aati hai; ya user pe ek `tokenVersion` rakho aur purane version wale tokens reject karo, jo password badalne ya sab jagah logout pe sab radd kar deta hai.',
    },
  },
  {
    question: 'What is CORS and why does it block your request?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CORS relaxes the browser\'s same-origin policy, which by default stops JavaScript reading a cross-origin response. Your request is blocked because the server did not return an `Access-Control-Allow-Origin` header matching your origin. Crucially, CORS is enforced by the BROWSER — the same request works from curl or another server — and it protects the user, not the API. Use an explicit origin allowlist in production; a wildcard cannot be combined with credentials.',
      hinglish:
        'CORS browser ki same-origin policy dheeli karta hai, jo default se JavaScript ko ek cross-origin response padhne se rokti hai. Tumhari request isliye ruki kyunki server ne tumhare origin se milta ek `Access-Control-Allow-Origin` header nahi lautaya. Critically, CORS BROWSER enforce karta hai — wahi request curl ya doosre server se chalti hai — aur ye user ko bachata hai, API ko nahi. Production mein ek explicit origin allowlist use karo; ek wildcard credentials ke saath nahi jud sakta.',
    },
  },
  {
    question: 'What is a CORS preflight request?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'For anything beyond a simple request — a method other than GET, POST, or HEAD, or a custom header such as `Authorization` — the browser first sends an OPTIONS request asking whether the real request is permitted. The server must answer with the allowed methods, headers, and origin. Two practical consequences: your server must handle OPTIONS, and every such call costs an extra round trip unless you set `Access-Control-Max-Age` so the browser caches the answer.',
      hinglish:
        'Ek simple request se aage kisi bhi cheez ke liye — GET, POST, ya HEAD ke alawa ek method, ya `Authorization` jaisa ek custom header — browser pehle ek OPTIONS request bhejta hai ye poochhte hue ki asli request ki ijaazat hai ya nahi. Server ko allowed methods, headers, aur origin ke saath jawab dena padta hai. Do vyavaharik nateeje: tumhare server ko OPTIONS sambhalna chahiye, aur har aisi call ek extra round trip cost karti hai jab tak tum `Access-Control-Max-Age` set na karo taaki browser jawab cache kar le.',
    },
  },
  {
    question: 'How do you version a REST API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'URL versioning — `/api/v1` and `/api/v2` — is the most common because it is explicit and easy to route, cache, and debug. Alternatives are a custom header or content negotiation via `Accept`, which keep URLs clean but are harder to test and cache. Whichever you choose, version only on BREAKING changes; adding a field should not force a new version. Keep the old version running with a documented deprecation window and a sunset date.',
      hinglish:
        'URL versioning — `/api/v1` aur `/api/v2` — sabse common hai kyunki ye explicit hai aur route, cache, aur debug karna aasaan. Alternatives ek custom header ya `Accept` se content negotiation hain, jo URLs saaf rakhte hain par test aur cache karna mushkil. Jo bhi chuno, sirf TODNE WALE changes pe version karo; ek field jodna ek naya version majboor nahi karna chahiye. Purane version ko ek likhi deprecation window aur ek sunset taareekh ke saath chalta rakho.',
    },
  },
  {
    question: 'How do you implement pagination in a REST API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Accept `page` and `limit`, or a `cursor`, as query parameters, and always CAP the limit so a client cannot request a million rows. Return metadata alongside the data — total, current page, and whether more exists — or a `next` link. Offset pagination is simple but degrades on deep pages and can duplicate or skip rows when data shifts. Cursor pagination stays fast at any depth and is stable under change, at the cost of no arbitrary page jumps.',
      hinglish:
        '`page` aur `limit`, ya ek `cursor`, ko query parameters ki tarah lo, aur limit hamesha CAP karo taaki ek client das lakh rows na maange. Data ke saath metadata lautao — total, current page, aur zyada hai ya nahi — ya ek `next` link. Offset pagination simple hai par gehre pages pe girta hai aur data khisakne pe rows duplicate ya skip kar sakta hai. Cursor pagination kisi bhi gehraai pe tez rehta hai aur badlaav mein sthir, kisi bhi page pe koodne ke cost pe.',
    },
  },
  {
    question: 'How should an API return errors?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use the correct STATUS CODE plus a consistent JSON body containing a machine-readable error code, a human-readable message, and field-level details for validation failures. Keep the shape identical across every endpoint so clients can handle errors generically. RFC 7807 "problem details" is a reasonable standard to adopt. Never leak stack traces, SQL, or internal paths in production — log those server-side and return a correlation id the user can quote to support.',
      hinglish:
        'Sahi STATUS CODE plus ek ek jaisa JSON body use karo jisme ek machine-padhne layak error code, ek insaan-padhne layak message, aur validation failures ke liye field-level details hon. Aakaar har endpoint pe ek jaisa rakho taaki clients errors aam tareeke se sambhal sakein. RFC 7807 "problem details" apnaane layak ek theek standard hai. Production mein kabhi stack traces, SQL, ya andar ke paths leak mat karo — unhe server-side log karo aur ek correlation id lautao jise user support ko bata sake.',
    },
  },
  {
    question: 'What is idempotency and how do you implement an idempotency key?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An idempotent operation gives the same result whether applied once or many times. It matters because networks are unreliable: a client that times out will retry, and without protection a payment is charged twice. Implement it by having the client send a unique `Idempotency-Key` header; the server records the key with its response, and a repeat with the same key returns the STORED response instead of re-executing. Stripe and every serious payments API work this way.',
      hinglish:
        'Ek idempotent operation ek baar ya bahut baar lagne pe wahi nateeja deta hai. Ye isliye matter karta hai kyunki networks bharosemand nahi: ek timeout hua client retry karega, aur bachaav ke bina ek payment do baar charge hoti hai. Ise aise karo ki client ek unique `Idempotency-Key` header bheje; server key ko uske response ke saath record karta hai, aur wahi key ke saath ek dohraav dobara chalane ke bajaye RAKHA response lautaata hai. Stripe aur har serious payments API aise hi kaam karte hain.',
    },
  },
  {
    question: 'What is rate limiting and how do you implement it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Rate limiting caps how many requests a client may make in a window, protecting against abuse, brute force, and accidental overload. TOKEN BUCKET allows controlled bursts and is the usual choice for APIs; sliding window is more precise; fixed window is simplest but allows a double burst at the boundary. Store counters in Redis so limits are shared across instances, return 429 with `Retry-After`, and apply a much stricter limit to login endpoints.',
      hinglish:
        'Rate limiting seemit karta hai ki ek client ek window mein kitni requests kar sakta hai, durupyog, brute force, aur galti se overload se bachate hue. TOKEN BUCKET control mein bursts deta hai aur APIs ke liye usual choice hai; sliding window zyada sateek hai; fixed window sabse simple hai par seema pe ek dugna burst deta hai. Counters Redis mein rakho taaki limits instances ke across share hon, `Retry-After` ke saath 429 lautao, aur login endpoints pe ek bahut sakht limit lagao.',
    },
  },
  {
    question: 'What is HATEOAS and why is it rarely implemented?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Hypermedia as the Engine of Application State means responses include LINKS describing what actions are available next, so a client can navigate the API without hardcoding URLs. It is a formal REST constraint. It is rarely implemented because it adds significant payload and complexity, most clients hardcode endpoints anyway, and generated clients from an OpenAPI spec solve the discoverability problem more practically. Its ideas survive in pagination `next` links.',
      hinglish:
        'Hypermedia as the Engine of Application State ka matlab hai responses mein LINKS hote hain jo batate hain ki aage kaunse kaam ho sakte hain, taaki ek client bina URLs hardcode kiye API pe chal sake. Ye ek formal REST bandhan hai. Ise rarely lagaya jaata hai kyunki ye kaafi payload aur uljhan jodta hai, zyadatar clients waise bhi endpoints hardcode karte hain, aur ek OpenAPI spec se bane clients discoverability ki samasya zyada vyavaharik dhang se solve karte hain. Iske ideas pagination `next` links mein bache hain.',
    },
  },
  {
    question: 'What is the difference between REST and GraphQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'REST exposes fixed endpoints each returning a fixed shape, so clients often OVER-FETCH data they do not need or UNDER-FETCH and make several calls. GraphQL exposes one endpoint where the client specifies exactly the fields it wants, which suits varied clients and nested data. The costs are real: HTTP caching is harder because everything is one POST, query complexity must be limited to prevent abuse, and the N+1 problem requires DataLoader batching.',
      hinglish:
        'REST tay endpoints deta hai jo har ek ek tay aakaar lautaata hai, isliye clients aksar zaroorat se ZYADA data lete hain ya KAM lekar kai calls karte hain. GraphQL ek endpoint deta hai jahan client theek wo fields batata hai jo use chahiye, jo alag-alag clients aur nested data ko suit karta hai. Costs asli hain: HTTP caching mushkil hai kyunki sab ek POST hai, durupyog rokne ke liye query complexity seemit karni padti hai, aur N+1 samasya ke liye DataLoader batching chahiye.',
    },
  },
  {
    question: 'When would you use gRPC instead of REST?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'gRPC uses HTTP/2 and Protocol Buffers, giving a compact binary format, a strict schema with generated clients, bidirectional streaming, and considerably lower latency. It suits internal SERVICE-TO-SERVICE communication where both ends are yours. REST remains better for public APIs and browsers: it is human-readable, debuggable with curl, cacheable by standard infrastructure, and needs no proxy layer, whereas gRPC requires grpc-web to reach a browser at all.',
      hinglish:
        'gRPC HTTP/2 aur Protocol Buffers use karta hai, ek compact binary format, generated clients ke saath ek sakht schema, dono taraf streaming, aur kaafi kam latency deta hua. Ye andar ki SERVICE-SE-SERVICE baat ko suit karta hai jahan dono sire tumhare hon. REST public APIs aur browsers ke liye behtar rehta hai: ye insaan padh sakta hai, curl se debug ho sakta hai, standard infrastructure se cache ho sakta hai, aur ise koi proxy layer nahi chahiye, jabki gRPC ko ek browser tak pahunchne ke liye grpc-web chahiye.',
    },
  },
  {
    question: 'How do you cache REST API responses?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Use HTTP caching headers: `Cache-Control` sets max-age and public or private, `ETag` gives a content fingerprint so the client can send `If-None-Match` and receive a cheap 304, and `Last-Modified` works similarly with dates. Only GET should be cached. Beyond HTTP, add a server-side cache such as Redis for expensive computations, and a CDN in front for public data. The hard part is INVALIDATION — decide up front how a cached entry becomes stale.',
      hinglish:
        'HTTP caching headers use karo: `Cache-Control` max-age aur public ya private set karta hai, `ETag` ek content fingerprint deta hai taaki client `If-None-Match` bhej kar ek sasta 304 paaye, aur `Last-Modified` dates ke saath waise hi kaam karta hai. Sirf GET cache hona chahiye. HTTP se aage, mehnge computations ke liye Redis jaisa ek server-side cache jodo, aur public data ke liye aage ek CDN. Mushkil hissa INVALIDATION hai — pehle hi tay karo ki ek cached entry purani kaise hoti hai.',
    },
  },
  {
    question: 'What is an ETag and how does conditional requesting work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An ETag is a fingerprint of a resource\'s current content. The client stores it and sends `If-None-Match` on the next request; if nothing changed the server returns 304 Not Modified with an empty body, saving bandwidth. The same mechanism enables OPTIMISTIC CONCURRENCY on writes: the client sends `If-Match`, and if someone else modified the resource in between, the server returns 412 Precondition Failed instead of silently overwriting their change.',
      hinglish:
        'Ek ETag ek resource ke abhi ke content ka fingerprint hai. Client ise rakhta hai aur agli request pe `If-None-Match` bhejta hai; agar kuch nahi badla to server ek khaali body ke saath 304 Not Modified lautaata hai, bandwidth bachate hue. Wahi mechanism writes pe OPTIMISTIC CONCURRENCY deta hai: client `If-Match` bhejta hai, aur agar beech mein kisi aur ne resource badla, server chupke se unka change mitaane ke bajaye 412 Precondition Failed lautaata hai.',
    },
  },
  {
    question: 'How do you handle file uploads in a REST API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use `multipart/form-data` with a library such as multer, and always set LIMITS on size and count or an attacker can exhaust disk and memory. Validate the real MIME type rather than trusting the client-supplied filename or content-type, and generate a new random filename so a path traversal or overwrite is impossible. For production, prefer a PRESIGNED URL so the client uploads straight to object storage, which keeps large bodies off your application servers entirely.',
      hinglish:
        'multer jaisi ek library ke saath `multipart/form-data` use karo, aur size aur count pe hamesha SEEMAYEIN rakho warna ek attacker disk aur memory khatam kar sakta hai. Client ke diye filename ya content-type pe bharosa karne ke bajaye asli MIME type jaancho, aur ek naya random filename banao taaki path traversal ya overwrite asambhav ho. Production ke liye, ek PRESIGNED URL prefer karo taaki client seedha object storage pe upload kare, jo badi bodies tumhare application servers se poori tarah door rakhta hai.',
    },
  },
  {
    question: 'What is OpenAPI and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'OpenAPI (formerly Swagger) is a machine-readable specification describing your endpoints, parameters, request and response schemas, and auth. Its value is everything generated FROM it: interactive documentation, typed client SDKs in many languages, server stubs, mock servers, and contract tests. Handwritten documentation drifts from reality almost immediately; a spec that also drives validation or is generated from code stays honest because a mismatch breaks the build.',
      hinglish:
        'OpenAPI (pehle Swagger) ek machine-padhne layak specification hai jo tumhare endpoints, parameters, request aur response schemas, aur auth batata hai. Iski value wo sab hai jo USSE banta hai: interactive documentation, bahut languages mein typed client SDKs, server stubs, mock servers, aur contract tests. Haath se likhi documentation lagbhag turant haqeeqat se hat jaati hai; ek spec jo validation bhi chalata ho ya code se bane wo imaandaar rehta hai kyunki ek mismatch build todta hai.',
    },
  },
  {
    question: 'How do you validate request data in an API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Validate at the BOUNDARY with a schema library — Zod, Joi, or express-validator — implemented as middleware so the handler only ever sees clean data. Validate body, params, AND query, since all three are attacker-controlled. Return 400 or 422 with structured field-level errors. Crucially, use the PARSED output rather than the raw request, which strips unexpected fields and stops operator objects reaching a database query. Client-side validation is UX only, never security.',
      hinglish:
        'Zod, Joi, ya express-validator jaisi ek schema library se BOUNDARY pe validate karo, middleware ki tarah lagaakar taaki handler kabhi sirf saaf data hi dekhe. Body, params, AUR query validate karo, kyunki teeno attacker-controlled hain. Structured field-level errors ke saath 400 ya 422 lautao. Critically, raw request ke bajaye PARSED output use karo, jo anaapekshit fields hataata hai aur operator objects ko ek database query tak pahunchne se rokta hai. Client-side validation sirf UX hai, kabhi security nahi.',
    },
  },
  {
    question: 'What is the difference between authentication and authorisation in an API?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'AUTHENTICATION establishes WHO the caller is — verifying a token, key, or credentials. AUTHORISATION determines WHAT they may do — whether this user can read this specific record or call this endpoint. They are separate middleware: authenticate once, then authorise per resource. The classic vulnerability is checking only authentication and forgetting object-level authorisation, so any logged-in user can fetch `/orders/999` belonging to someone else.',
      hinglish:
        'AUTHENTICATION batata hai ki caller KAUN hai — ek token, key, ya credentials jaanch kar. AUTHORISATION batata hai ki wo KYA kar sakta hai — kya ye user ye khaas record padh sakta hai ya ye endpoint call kar sakta hai. Wo alag middleware hain: ek baar authenticate karo, phir per resource authorise. Classic vulnerability sirf authentication check karna aur object-level authorisation bhoolna hai, isliye koi bhi logged-in user kisi aur ka `/orders/999` le sakta hai.',
    },
  },
  {
    question: 'What is broken object level authorisation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'BOLA — the top item on the OWASP API Security list — is when an endpoint checks that you are logged in but not that the requested object belongs to you, so changing `/orders/123` to `/orders/124` returns someone else\'s data. The fix is checking OWNERSHIP on every single request, ideally by scoping the query itself — `WHERE id = :id AND user_id = :currentUser` — rather than fetching then comparing, which is easy to forget on a new endpoint.',
      hinglish:
        'BOLA — OWASP API Security list ka sabse upar wala — tab hai jab ek endpoint jaanchta hai ki tum logged in ho par ye nahi ki maanga gaya object tumhara hai, isliye `/orders/123` ko `/orders/124` karna kisi aur ka data lautaata hai. Fix har ek request pe MAALIKANA jaanchna hai, ideally query ko hi seemit karke — `WHERE id = :id AND user_id = :currentUser` — laakar phir compare karne ke bajaye, jise ek naye endpoint pe bhoolna aasaan hai.',
    },
  },
  {
    question: 'What is OAuth 2.0 and how does it differ from simple login?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'OAuth 2.0 is a DELEGATED AUTHORISATION framework: it lets a user grant a third-party app limited access to their data on another service WITHOUT sharing their password. The app receives a scoped, revocable access token instead. It is not an authentication protocol — OpenID Connect adds that layer on top. The current recommended flow for both web and mobile apps is authorisation code with PKCE; the implicit flow is deprecated.',
      hinglish:
        'OAuth 2.0 ek SAUNPI GAYI AUTHORISATION framework hai: ye ek user ko ek third-party app ko doosri service pe apne data tak seemit pahunch dene deta hai BINA apna password share kiye. App ke bajaye ek seemit, radd hone layak access token paata hai. Ye ek authentication protocol nahi hai — OpenID Connect wo layer upar jodta hai. Web aur mobile apps dono ke liye abhi salah diya flow PKCE ke saath authorisation code hai; implicit flow deprecated hai.',
    },
  },
  {
    question: 'What is the difference between an API key and a JWT?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An API KEY is an opaque random string identifying an APPLICATION, requiring a database lookup on every request but revocable instantly. A JWT is a signed token carrying CLAIMS about a user, verifiable without a lookup but not revocable before expiry. Keys suit server-to-server and third-party integrations where you want easy rotation; JWTs suit user sessions where per-request database calls would be costly. Both must travel over HTTPS only.',
      hinglish:
        'Ek API KEY ek opaque random string hai jo ek APPLICATION batati hai, har request pe ek database lookup chahti hai par turant radd ho sakti hai. Ek JWT ek signed token hai jo ek user ke baare mein CLAIMS le jaata hai, bina lookup ke jaancha ja sakta hai par expiry se pehle radd nahi ho sakta. Keys server-se-server aur third-party integrations ko suit karti hain jahan aasaan badalna chahiye; JWTs user sessions ko jahan per-request database calls mehngi hoti. Dono ko sirf HTTPS pe chalna chahiye.',
    },
  },
  {
    question: 'How do you design an API for filtering, sorting, and searching?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use query parameters: `?status=active&sort=-createdAt&q=laptop`, with a leading minus for descending. WHITELIST the allowed filter and sort fields rather than passing them into a query, or you have created both an injection vector and a way to sort on an unindexed column and take down the database. Document the operators you support, keep them consistent across resources, and always combine with pagination and a capped limit.',
      hinglish:
        'Query parameters use karo: `?status=active&sort=-createdAt&q=laptop`, ghatte kram ke liye ek shuruaati minus ke saath. Allowed filter aur sort fields ko WHITELIST karo, unhe ek query mein daalne ke bajaye, warna tumne ek injection raasta bhi bana diya aur ek bina index wale column pe sort karke database giraane ka tareeka bhi. Jo operators tum dete ho unhe likho, unhe resources ke across ek jaisa rakho, aur hamesha pagination aur ek capped limit ke saath jodo.',
    },
  },
  {
    question: 'What is the difference between synchronous and asynchronous API design?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A synchronous endpoint does the work and returns the result, which is right when the work is fast. For slow work — video processing, report generation, bulk import — return 202 Accepted immediately with a job id, process it on a queue, and let the client poll a status endpoint or receive a webhook. This matters because HTTP requests time out and long work holds a connection open, and it also lets you retry a failure without the client resubmitting.',
      hinglish:
        'Ek synchronous endpoint kaam karke nateeja lautaata hai, jo tab sahi hai jab kaam tez ho. Slow kaam ke liye — video processing, report banana, bulk import — turant ek job id ke saath 202 Accepted lautao, use ek queue pe process karo, aur client ko ek status endpoint poll karne do ya ek webhook paane do. Ye isliye matter karta hai kyunki HTTP requests timeout hoti hain aur lamba kaam ek connection khula rakhta hai, aur ye tumhe ek failure retry karne bhi deta hai bina client ke dobara bheje.',
    },
  },
  {
    question: 'What is a webhook and how do you secure one?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A webhook is a reverse API call: instead of you polling a service, it POSTs to your URL when an event happens. Secure it by verifying an HMAC SIGNATURE over the payload using a shared secret, with a constant-time comparison, and reject requests whose timestamp is old to prevent replay. Also make the handler IDEMPOTENT, since providers retry on failure and at-least-once delivery means you will receive duplicates. Return 200 fast and process asynchronously.',
      hinglish:
        'Ek webhook ek ulti API call hai: tumhare ek service ko poll karne ke bajaye, wo ek event hone pe tumhare URL pe POST karti hai. Ise ek saanjhe secret se payload pe ek HMAC SIGNATURE jaanch kar surakshit karo, ek constant-time comparison ke saath, aur un requests ko reject karo jinka timestamp purana hai taaki replay ruke. Handler ko IDEMPOTENT bhi banao, kyunki providers failure pe retry karte hain aur at-least-once delivery ka matlab hai tumhe duplicates milenge. 200 jaldi lautao aur asynchronously process karo.',
    },
  },
  {
    question: 'How do you test a REST API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use supertest or similar to exercise the app object WITHOUT starting a server, which keeps tests fast and port-free. Test status codes, response shape, validation rejection, and authorisation — including the negative case where another user\'s resource must return 403 or 404. Test business logic in services directly as plain unit tests. Use a separate database reset between runs, mock genuinely external services, and add contract tests if the API has independent consumers.',
      hinglish:
        'supertest ya similar se app object ko BINA server shuru kiye chalao, jo tests tez aur port-free rakhta hai. Status codes, response aakaar, validation reject, aur authorisation test karo — including wo negative case jahan ek doosre user ka resource 403 ya 404 lautana chahiye. Services mein business logic ko seedha plain unit tests ki tarah test karo. Runs ke beech reset hota ek alag database use karo, genuinely bahar ki services mock karo, aur agar API ke swatantra consumers hain to contract tests jodo.',
    },
  },
  {
    question: 'What is API gateway and why would you use one?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An API gateway sits in front of many services and handles cross-cutting concerns centrally: routing, authentication, rate limiting, TLS termination, request aggregation, and logging. Its value is that each service no longer reimplements auth and clients see one address instead of a dozen. The risks are becoming a single point of failure and accumulating business logic that belongs in a service — keep it to routing and policy, not domain rules.',
      hinglish:
        'Ek API gateway bahut services ke aage baithta hai aur cross-cutting concerns ek jagah sambhalta hai: routing, authentication, rate limiting, TLS termination, request aggregation, aur logging. Iski value ye hai ki har service ab auth dobara nahi banati aur clients ek darjan ke bajaye ek address dekhte hain. Risks ek single point of failure ban jaana aur aisi business logic ikattha karna hai jo ek service ki hai — ise routing aur policy tak rakho, domain rules tak nahi.',
    },
  },
  {
    question: 'What is the difference between REST and RPC style APIs?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'REST is RESOURCE-oriented: nouns in the URL and the HTTP method expresses the action. RPC is ACTION-oriented: you call a named procedure such as `/calculateShipping` or `/sendEmail`, usually all over POST. RPC fits operations that are genuinely not CRUD on a resource, and forcing them into REST produces awkward endpoints. Most real APIs are a pragmatic mix — resource endpoints for data plus a few action endpoints where REST semantics do not fit.',
      hinglish:
        'REST RESOURCE-kendrit hai: URL mein nouns aur HTTP method kaam batata hai. RPC KAAM-kendrit hai: tum ek naam wali procedure call karte ho jaise `/calculateShipping` ya `/sendEmail`, usually sab POST pe. RPC un operations ko fit karta hai jo genuinely ek resource pe CRUD nahi hain, aur unhe REST mein thoosna ajeeb endpoints banata hai. Zyadatar asli APIs ek vyavaharik mishran hain — data ke liye resource endpoints plus kuch action endpoints jahan REST semantics fit nahi baithte.',
    },
  },
  {
    question: 'How do you monitor and observe an API in production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Track the four golden signals: latency (as PERCENTILES, since an average hides the tail), traffic, error rate, and saturation. Use structured JSON logs with a correlation id so one request can be followed across services, and distributed tracing to see where time is actually spent. Alert on symptoms users feel — error rate and p99 latency — not on CPU. And add a health endpoint that checks real dependencies, not one that always returns 200.',
      hinglish:
        'Chaar sunehre signals track karo: latency (PERCENTILES mein, kyunki ek average poonchh chhupa deta hai), traffic, error rate, aur saturation. Ek correlation id wale structured JSON logs use karo taaki ek request services ke across follow ho sake, aur ye dekhne ke liye distributed tracing ki samay actually kahan jaata hai. Un lakshanon pe alert karo jo users mehsoos karte hain — error rate aur p99 latency — CPU pe nahi. Aur ek health endpoint jodo jo asli dependencies jaanche, ek aisa nahi jo hamesha 200 lautaye.',
    },
  },
  {
    question: 'What is the difference between soft delete and hard delete?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A HARD delete removes the row permanently. A SOFT delete sets a `deletedAt` flag and filters those rows out of normal queries, which preserves history, allows undo, and keeps foreign keys intact. The costs are real: every single query must remember to filter, or deleted data reappears; unique constraints conflict with soft-deleted rows; and data retention regulations may actually require genuine deletion, so "we soft delete everything" can be a compliance problem.',
      hinglish:
        'Ek HARD delete row ko hamesha ke liye hata deta hai. Ek SOFT delete ek `deletedAt` flag set karta hai aur un rows ko normal queries se chhaan deta hai, jo itihaas bachata hai, undo deta hai, aur foreign keys saabut rakhta hai. Costs asli hain: har ek query ko chhaanna yaad rakhna padta hai, warna delete kiya data wapas dikhta hai; unique constraints soft-deleted rows se takraate hain; aur data rakhne ke kanoon actually asli deletion maang sakte hain, isliye "hum sab kuch soft delete karte hain" ek compliance samasya ho sakti hai.',
    },
  },
  {
    question: 'What is the difference between 200, 201, and 204?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '200 OK means success with a body, used for GET and usually for a successful update returning the new state. 201 Created means a resource was created, and should include a `Location` header pointing at it — the correct response to a POST that creates something. 204 No Content means success with an EMPTY body, typical for DELETE or an update where the client needs nothing back. Using 200 for everything works but discards information clients could use.',
      hinglish:
        '200 OK matlab ek body ke saath safalta, GET ke liye aur usually ek safal update ke liye jo nayi state lautaaye. 201 Created matlab ek resource bana, aur usme ek `Location` header hona chahiye jo us pe point kare — ek kuch banate POST ka sahi jawab. 204 No Content matlab ek KHAALI body ke saath safalta, DELETE ya ek aise update ke liye typical jahan client ko kuch wapas nahi chahiye. Sab ke liye 200 use karna chalta hai par wo jaankaari phenk deta hai jo clients use kar sakte the.',
    },
  },
];
