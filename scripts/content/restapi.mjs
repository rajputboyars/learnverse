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
];
