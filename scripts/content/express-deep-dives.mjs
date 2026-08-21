/*
 * Step-by-step walkthroughs for the Express.js interview questions.
 *
 * Same shape and intent as the other deep-dive files: the short `answer` is
 * what you say out loud, and this walks the mechanism one step at a time.
 *
 * Keyed by the EXACT question text in `generalInterviewQuestions`. Unmatched
 * keys are reported at import time (see the bottom of express.mjs).
 *
 * Each value is an ordered list of sections:
 *   heading { en, hi }  the step's title
 *   body    { en, hi }  what happens at this step, and why
 *   diagram             optional ASCII sketch, rendered as-is in monospace
 *   code                optional snippet
 *
 * The thread through the whole file: Express is a middleware pipeline over
 * Node's http module. Almost every question is really asking where in that
 * pipeline something sits, and what order things run in.
 */

export const deepDives = {
  /* ─── The pipeline: middleware, routing, order ────────────── */

  'What is the difference between app.use() and app.get()?': [
    {
      heading: { en: 'One mounts middleware, the other defines a route', hi: 'Ek middleware lagata hai, doosra route banata hai' },
      body: {
        en: 'app.use registers middleware that runs for ANY HTTP method. app.get registers a handler for GET requests only. That is the headline, and the two differences below follow from it.',
        hi: 'app.use aisa middleware register karta hai jo KISI BHI HTTP method pe chalta hai. app.get sirf GET requests ke liye handler register karta hai. Mukhya baat yahi hai, aur neeche ke do farq isi se nikalte hain.',
      },
      code: `app.use(logger);                    // every method, every path below /
app.get('/users', handler);          // GET /users only`,
    },
    {
      heading: { en: 'Path matching works differently', hi: 'Path matching alag chalti hai' },
      body: {
        en: 'This is the difference people miss. app.use matches a path PREFIX, so mounting at /api catches /api/users and /api/users/1. app.get matches the path exactly, so /users does not match /users/1.',
        hi: 'Yahi farq log chook jaate hain. app.use path ke SHURUAATI hisse se match karta hai, toh /api pe lagana /api/users aur /api/users/1 dono pakadta hai. app.get poora path exactly match karta hai, toh /users, /users/1 se match nahi karta.',
      },
      code: `app.use('/api', mw);       // matches /api, /api/x, /api/x/y
app.get('/api', handler);   // matches ONLY /api`,
    },
    {
      heading: { en: 'The path argument is optional for use', hi: 'use ke liye path argument optional hai' },
      body: {
        en: 'Omit it and the middleware runs for every request. This is how logging, body parsing and security headers are usually mounted — no path, so nothing escapes them.',
        hi: 'Usse chhod do toh middleware har request pe chalta hai. Logging, body parsing aur security headers aam taur pe aise hi lagte hain — koi path nahi, toh koi bach kar nahi nikalta.',
      },
      code: `app.use(express.json());       // every request
app.use('/api', express.json());   // only under /api`,
    },
    {
      heading: { en: 'Order matters for both, in the same way', hi: 'Dono ke liye order maayne rakhta hai, ek jaise' },
      body: {
        en: 'Express walks the stack top to bottom. A middleware mounted after a route that already sent a response never runs for that route. This is why body parsers and auth go near the top of the file.',
        hi: 'Express stack ko upar se neeche chalta hai. Jo middleware us route ke baad laga ho jisne response bhej diya, wo us route ke liye kabhi nahi chalta. Isiliye body parsers aur auth file mein upar ki taraf jaate hain.',
      },
      code: `app.get('/a', handler);      // sends a response
app.use(logger);              // ✗ never runs for /a`,
    },
    {
      heading: { en: 'The signatures differ by one argument', hi: 'Signatures ek argument se alag hain' },
      body: {
        en: 'Middleware takes (req, res, next) and must call next to continue. A route handler is the end of the line, so it usually just sends a response — though it can call next to pass control on.',
        hi: 'Middleware (req, res, next) leta hai aur aage badhne ke liye next bulana zaroori hai. Route handler line ka ant hai, toh wo aam taur pe response hi bhejta hai — waise wo next bula kar aage bhi de sakta hai.',
      },
      code: `app.use((req, res, next) => { req.id = uuid(); next(); });
app.get('/x', (req, res) => res.json({ id: req.id }));`,
    },
    {
      heading: { en: 'And app.all sits between them', hi: 'Aur app.all inke beech baithta hai' },
      body: {
        en: 'app.all matches any method like use, but matches the path exactly like get. It is what you want for a catch-all on one specific path — an auth gate on /admin, or a 405 response.',
        hi: 'app.all use ki tarah har method match karta hai, par get ki tarah path exactly. Kisi ek khaas path pe sab kuch pakadne ke liye yahi chahiye — /admin pe auth gate, ya 405 response.',
      },
      code: `app.all('/admin', requireAdmin);    // any method, exactly /admin`,
    },
  ],

  'How does Express handle requests under the hood?': [
    {
      heading: { en: 'It is a wrapper around http.createServer', hi: 'Ye http.createServer ke aas-paas ek lapet hai' },
      body: {
        en: 'The app object is a function with the signature (req, res). app.listen simply passes it to http.createServer. Everything Express does happens inside that one function.',
        hi: 'app object ek function hai jiska signature (req, res) hai. app.listen usse bas http.createServer ko de deta hai. Express jo bhi karta hai wo usi ek function ke andar hota hai.',
      },
      code: `const app = express();
app.listen(3000);

// is effectively:
require('node:http').createServer(app).listen(3000);`,
    },
    {
      heading: { en: 'Every use and route pushes onto one stack', hi: 'Har use aur route ek hi stack pe chadhta hai' },
      body: {
        en: 'Express keeps an ordered array of layers. Each layer has a path pattern, an optional method, and a handler. app.use and app.get both append to it — the only difference is what goes in the layer.',
        hi: 'Express layers ka ek kramwar array rakhta hai. Har layer mein ek path pattern, ek optional method, aur ek handler hota hai. app.use aur app.get dono usme jodte hain — farq sirf itna hai ki layer mein kya jaata hai.',
      },
      diagram: `router.stack
  [0] { path: '/',      method: any,  fn: logger        }
  [1] { path: '/',      method: any,  fn: express.json  }
  [2] { path: '/users', method: GET,  fn: listUsers     }
  [3] { path: '/',      method: any,  fn: errorHandler  }`,
    },
    {
      heading: { en: 'A request walks the stack in order', hi: 'Request stack pe kram se chalti hai' },
      body: {
        en: 'For each layer Express checks whether the path and method match. If they do it calls the handler; if not it skips to the next. next() is what advances the index — nothing else does.',
        hi: 'Har layer pe Express dekhta hai ki path aur method match karte hain ya nahi. Match hon toh handler bulaata hai; na hon toh agle pe chala jaata hai. Index aage next() badhata hai — aur kuch nahi.',
      },
      code: `function next() {
  const layer = stack[i++];
  if (!layer) return finish404();
  if (matches(layer, req)) layer.fn(req, res, next);
  else next();
}`,
    },
    {
      heading: { en: 'Which explains why forgetting next hangs', hi: 'Isiliye next bhoolne pe request latak jaati hai' },
      body: {
        en: 'If a middleware neither sends a response nor calls next, the walk stops. Nothing errors and nothing times out on the server side — the client just waits until it gives up. This is the most common Express bug.',
        hi: 'Agar koi middleware na response bheje na next bulaaye, toh chalna ruk jaata hai. Na koi error, na server pe timeout — client bas intezaar karta rehta hai jab tak haar na maane. Ye Express ka sabse aam bug hai.',
      },
      code: `app.use((req, res, next) => {
  if (req.user) next();      // ✗ no else — an anonymous request hangs
});`,
    },
    {
      heading: { en: 'Error handlers are a separate track', hi: 'Error handlers ek alag patri hain' },
      body: {
        en: 'A middleware with four arguments is registered as an error handler and is SKIPPED during the normal walk. Calling next with an argument switches Express to the error track, where it skips normal middleware and looks for the next four-argument one.',
        hi: 'Chaar arguments wala middleware error handler ki tarah register hota hai aur aam chalne mein CHHOD diya jaata hai. next ko koi argument do toh Express error patri pe chala jaata hai, jahan wo aam middleware chhod kar agla chaar-argument wala dhoondhta hai.',
      },
      code: `next();          // continue the normal track
next(err);        // ✗ switch to the error track
app.use((err, req, res, next) => { … });   // 4 args = error handler`,
    },
    {
      heading: { en: 'req and res are augmented, not replaced', hi: 'req aur res badle nahi, badhaaye jaate hain' },
      body: {
        en: 'Express takes Node http.IncomingMessage and ServerResponse and adds properties and methods to their prototypes — req.params, req.query, res.json, res.send. Underneath they are still the Node streams.',
        hi: 'Express Node ke http.IncomingMessage aur ServerResponse leta hai aur unke prototypes pe properties aur methods jodta hai — req.params, req.query, res.json, res.send. Andar se wo abhi bhi Node ki streams hi hain.',
      },
    },
    {
      heading: { en: 'A Router is the same machinery, nested', hi: 'Router wahi machinery hai, nested' },
      body: {
        en: 'A Router has its own stack and is itself mounted as a layer on the parent. So a request walks the parent stack until it hits the router layer, then walks the router stack, then returns. It is stacks all the way down.',
        hi: 'Router ka apna stack hota hai aur wo khud parent pe ek layer ki tarah lagta hai. Toh request parent stack pe chalti hai jab tak router wali layer na aaye, phir router ka stack chalti hai, phir wapas aa jaati hai. Neeche tak bas stacks hi hain.',
      },
    },
  ],

  'What is Express.js?': [
    {
      heading: { en: 'A minimal web framework on top of Node http', hi: 'Node ke http ke upar ek minimal web framework' },
      body: {
        en: 'Express adds routing, a middleware pipeline, body parsing and error handling to Node\'s http module. It is deliberately small — it does not include an ORM, validation, auth or a project structure.',
        hi: 'Express Node ke http module pe routing, middleware pipeline, body parsing aur error handling jodta hai. Ye jaan-boojh kar chhota hai — isme na ORM hai, na validation, na auth, na project structure.',
      },
      code: `const app = express();
app.use(express.json());
app.get('/users/:id', (req, res) => res.json({ id: req.params.id }));
app.listen(3000);`,
    },
    {
      heading: { en: 'The middleware pipeline is the whole idea', hi: 'Poora idea middleware pipeline hai' },
      body: {
        en: 'Everything is a function of (req, res, next) in an ordered list. Routing, parsing, auth, logging and error handling are all just middleware at different positions. Once that clicks, the rest of the framework is obvious.',
        hi: 'Sab kuch ek kramwar list mein (req, res, next) ka function hai. Routing, parsing, auth, logging aur error handling — sab alag jagahon pe bas middleware hain. Ye samajh aate hi baaki framework saaf ho jaata hai.',
      },
      diagram: `request → logger → json parser → auth → route handler → response
                                              │
                                          next(err) → error handler`,
    },
    {
      heading: { en: 'What it gives you over raw http', hi: 'Kachche http se ye kya zyada deta hai' },
      body: {
        en: 'Routing by method and path with parameters, body and query parsing, static file serving, a central error handler, and a middleware ecosystem. Each is something you would otherwise write and get subtly wrong.',
        hi: 'Method aur parameters wale path se routing, body aur query parsing, static files, ek central error handler, aur middleware ka ecosystem. Har ek wo cheez hai jo warna tum likhte aur sookshm taur pe galat kar dete.',
      },
    },
    {
      heading: { en: 'What it deliberately leaves out', hi: 'Ye jaan-boojh kar kya chhod deta hai' },
      body: {
        en: 'No database layer, no validation, no authentication, no enforced structure. That is why it spread — and also why two Express codebases can look nothing alike, which is the honest trade-off to name.',
        hi: 'Na database layer, na validation, na authentication, na koi lagoo structure. Isi se ye faila — aur isiliye do Express codebases bilkul alag dikh sakte hain, aur yahi imaandaar sauda batane laayak hai.',
      },
    },
    {
      heading: { en: 'Express 5 is the current version', hi: 'Aaj ka version Express 5 hai' },
      body: {
        en: 'Worth saying, because the biggest change fixes the framework\'s most common footgun: a rejected promise from an async handler is now forwarded to the error handler automatically, instead of hanging the request.',
        hi: 'Ye kehna zaroori hai, kyunki sabse bada badlaav framework ki sabse aam galti theek karta hai: async handler se aayi rejected promise ab apne aap error handler tak pahunchti hai, request latakne ki jagah.',
      },
      code: `app.get('/x', async (req, res) => {
  throw new Error('boom');     // Express 4: hangs.  Express 5: handled.
});`,
    },
    {
      heading: { en: 'And the alternatives', hi: 'Aur vikalp' },
      body: {
        en: 'Fastify for throughput and schema-based validation, NestJS when a team wants enforced structure and dependency injection, Hono for edge runtimes. Express remains the default because of familiarity and the ecosystem, not because it is fastest.',
        hi: 'Throughput aur schema-based validation ke liye Fastify, jab team ko lagoo structure aur dependency injection chahiye toh NestJS, edge runtimes ke liye Hono. Express default isliye hai ki wo jaana-pehchana hai aur uska ecosystem bada hai, isliye nahi ki wo sabse tez hai.',
      },
    },
  ],

  'How do you create an Express server?': [
    {
      heading: { en: 'Four lines, and then the structure', hi: 'Chaar line, phir dhaancha' },
      body: {
        en: 'Create the app, mount middleware, define routes, listen. The minimal version is trivial; what makes it a real answer is the order and what you add around it.',
        hi: 'App banao, middleware lagao, routes likho, listen karo. Sabse chhota roop mamooli hai; asli jawab isse order aur uske aas-paas jodi gayi cheezein banati hain.',
      },
      code: `import express from 'express';

const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({ ok: true }));
app.listen(3000, () => console.log('listening on 3000'));`,
    },
    {
      heading: { en: 'The order that actually matters', hi: 'Wo order jo sach mein maayne rakhta hai' },
      body: {
        en: 'Security headers and body parsing first, then logging, then routes, then a 404 handler, then the error handler LAST. The error handler must be after everything, because Express only reaches it by walking forward.',
        hi: 'Pehle security headers aur body parsing, phir logging, phir routes, phir 404 handler, aur error handler SABSE AAKHIR mein. Error handler sabke baad hona chahiye, kyunki Express usse aage chal kar hi pahunchta hai.',
      },
      code: `app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp());
app.use('/api', routes);
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use(errorHandler);        // ✓ must be last`,
    },
    {
      heading: { en: 'Split app.js from server.js', hi: 'app.js ko server.js se alag karo' },
      body: {
        en: 'app.js builds and exports the app without calling listen. server.js imports it and starts listening. That separation is what makes the app testable with supertest, because a test needs the app but not an open port.',
        hi: 'app.js app banata aur export karta hai, listen nahi bulaata. server.js usse import karke sunna shuru karta hai. Isi alagav se app supertest se test hone laayak banta hai, kyunki test ko app chahiye, khula port nahi.',
      },
      code: `// app.js
export const app = express();

// server.js
import { app } from './app.js';
app.listen(env.PORT);`,
    },
    {
      heading: { en: 'Bind the port from configuration', hi: 'Port configuration se lo' },
      body: {
        en: 'Hardcoding 3000 breaks on any platform that assigns a port. Read it from the environment with a default, and validate it at startup rather than discovering it is undefined at listen time.',
        hi: '3000 hardcode karna har us platform pe toot ta hai jo port khud deta hai. Usse environment se default ke saath lo, aur shuruaat mein validate karo, listen ke waqt undefined pata chalne ki jagah.',
      },
      code: `const port = Number(process.env.PORT) || 3000;`,
    },
    {
      heading: { en: 'Handle shutdown', hi: 'Shutdown sambhaalo' },
      body: {
        en: 'Keep a reference to the server so SIGTERM can close it, finish in-flight requests and close the database pool. Without this every deploy drops the requests that were in progress.',
        hi: 'Server ka reference rakho taaki SIGTERM usse band kar sake, chal rahi requests poori kar sake aur database pool band kar sake. Iske bina har deploy chal rahi requests gira deta hai.',
      },
      code: `const server = app.listen(port);
process.on('SIGTERM', () => server.close(() => pool.end()));`,
    },
    {
      heading: { en: 'And use the built-in watcher', hi: 'Aur built-in watcher use karo' },
      body: {
        en: 'Node has --watch, so nodemon is no longer needed. Combined with --env-file that is two fewer dependencies in a typical starter.',
        hi: 'Node mein --watch hai, toh ab nodemon ki zaroorat nahi. --env-file ke saath milaao toh aam starter mein do dependencies kam ho jaati hain.',
      },
      code: `node --watch --env-file=.env server.js`,
    },
  ],

  'What is middleware in Express?': [
    {
      heading: { en: 'A function that sits between the request and the response', hi: 'Request aur response ke beech baithne wala function' },
      body: {
        en: 'Middleware receives req, res and next. It can read or modify either object, end the response, or pass control on. Express runs them in the order they were registered, which makes the whole framework a pipeline.',
        hi: 'Middleware ko req, res aur next milte hain. Wo dono objects padh ya badal sakta hai, response khatam kar sakta hai, ya control aage de sakta hai. Express unhe register hone ke kram mein chalata hai, aur isi se poora framework ek pipeline ban jaata hai.',
      },
      code: `app.use((req, res, next) => {
  req.startedAt = Date.now();
  next();                       // pass control on
});`,
    },
    {
      heading: { en: 'It has exactly three options', hi: 'Iske paas bilkul teen vikalp hain' },
      body: {
        en: 'Call next to continue, send a response to end the cycle, or call next with an error to jump to the error handler. Doing none of these leaves the request hanging forever, which is the classic bug.',
        hi: 'Aage badhne ke liye next bulao, cycle khatam karne ke liye response bhejo, ya error handler pe jaane ke liye next ko error do. Inme se kuch bhi na karo toh request hamesha ke liye latak jaati hai, aur yahi classic bug hai.',
      },
      diagram: `next()        → continue to the next layer
res.send()    → end the cycle here
next(err)     → jump to the error handler
nothing       → the request hangs`,
    },
    {
      heading: { en: 'It runs in registration order', hi: 'Ye register hone ke kram mein chalta hai' },
      body: {
        en: 'Top to bottom, always. A body parser mounted after a route means req.body is undefined inside that route. Most Express confusion is really an ordering problem.',
        hi: 'Hamesha upar se neeche. Route ke baad laga body parser matlab us route ke andar req.body undefined hai. Express ki zyadatar uljhan asal mein order ki problem hoti hai.',
      },
      code: `app.post('/users', handler);     // req.body is undefined here
app.use(express.json());          // ✗ too late`,
    },
    {
      heading: { en: 'It can attach things for later layers', hi: 'Ye aage ki layers ke liye cheezein jod sakta hai' },
      body: {
        en: 'The common pattern: auth middleware verifies a token and puts the user on req, and every handler after it can read req.user. This is how cross-cutting concerns are shared without passing arguments around.',
        hi: 'Aam pattern: auth middleware token jaanchta hai aur user ko req pe rakh deta hai, aur uske baad har handler req.user padh sakta hai. Aise hi saanjhe kaam bina arguments ghumaaye share hote hain.',
      },
      code: `app.use((req, res, next) => {
  req.user = verify(req.headers.authorization);
  next();
});`,
    },
    {
      heading: { en: 'Scope it with a mount path', hi: 'Mount path se isse seemit karo' },
      body: {
        en: 'With no path it runs for everything. With a path it runs only for requests whose URL starts with that prefix — which is how you apply auth to /api without touching the health check or the static files.',
        hi: 'Bina path ke ye har cheez pe chalta hai. Path ke saath sirf un requests pe jinka URL us prefix se shuru ho — aur aise hi tum /api pe auth lagate ho bina health check ya static files ko chhue.',
      },
      code: `app.use(express.static('public'));       // everything
app.use('/api', requireAuth);             // only under /api`,
    },
    {
      heading: { en: 'Error middleware takes four arguments', hi: 'Error middleware chaar arguments leta hai' },
      body: {
        en: 'Express identifies an error handler purely by arity. Four parameters means error handler, and it is skipped during the normal walk. Drop the unused next and it silently becomes ordinary middleware — a genuinely confusing bug.',
        hi: 'Express error handler ko sirf arguments ki ginti se pehchaanta hai. Chaar parameters matlab error handler, aur aam chalne mein wo chhod diya jaata hai. Bina use hua next hata do toh wo chup-chaap aam middleware ban jaata hai — sach mein uljhane wala bug.',
      },
      code: `app.use((err, req, res, next) => { … });   // ✓ error handler
app.use((err, req, res) => { … });          // ✗ ordinary middleware`,
    },
  ],

  'What are the types of middleware in Express?': [
    {
      heading: { en: 'Five, grouped by where they come from', hi: 'Paanch, ye dekh kar ki kahan se aate hain' },
      body: {
        en: 'Application-level, router-level, error-handling, built-in, and third-party. The grouping is more useful than the list, because it tells you where each one is mounted.',
        hi: 'Application-level, router-level, error-handling, built-in, aur third-party. List se zyada ye grouping kaam ki hai, kyunki isse pata chalta hai har ek kahan lagta hai.',
      },
      diagram: `application-level   app.use / app.get
router-level        router.use / router.get
error-handling      four arguments
built-in            express.json, urlencoded, static
third-party         cors, helmet, morgan, multer`,
    },
    {
      heading: { en: 'Application-level', hi: 'Application-level' },
      body: {
        en: 'Mounted directly on the app with use or a method function. With no path it runs for every request; with a path it runs for that prefix. This is where logging, parsing and security headers go.',
        hi: 'Seedha app pe use ya kisi method function se lagta hai. Bina path ke har request pe chalta hai; path ke saath us prefix pe. Logging, parsing aur security headers yahin jaate hain.',
      },
      code: `app.use(logger);
app.use('/api', requireAuth);`,
    },
    {
      heading: { en: 'Router-level', hi: 'Router-level' },
      body: {
        en: 'Identical behaviour, mounted on a Router instead of the app. This is how you scope middleware to one feature area — the router carries its own stack and is itself mounted as a layer on the parent.',
        hi: 'Behaviour wahi, bas app ki jagah Router pe lagta hai. Aise hi tum middleware ko ek feature area tak seemit karte ho — router apna stack rakhta hai aur khud parent pe ek layer ki tarah lagta hai.',
      },
      code: `const router = express.Router();
router.use(requireAdmin);
router.get('/users', list);
app.use('/admin', router);`,
    },
    {
      heading: { en: 'Error-handling, identified by arity', hi: 'Error-handling, arguments ki ginti se pehchaana' },
      body: {
        en: 'Four parameters and nothing else marks it. It only runs when something calls next with an argument, and it must be registered after all routes because Express reaches it by walking forward.',
        hi: 'Chaar parameters, aur kuch nahi, isse pehchaante hain. Ye tabhi chalta hai jab koi next ko argument de, aur usse saare routes ke baad register karna zaroori hai kyunki Express usse aage chal kar hi pahunchta hai.',
      },
    },
    {
      heading: { en: 'Built-in', hi: 'Built-in' },
      body: {
        en: 'Only three ship with Express 4 and 5: json, urlencoded and static. Everything else that used to be built in was split into separate packages in Express 4, which is why body-parser exists as a name people still recognise.',
        hi: 'Express 4 aur 5 ke saath sirf teen aate hain: json, urlencoded aur static. Jo pehle built-in tha wo Express 4 mein alag packages mein baant diya gaya, isiliye body-parser naam log aaj bhi pehchaante hain.',
      },
      code: `app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));`,
    },
    {
      heading: { en: 'Third-party', hi: 'Third-party' },
      body: {
        en: 'cors for cross-origin headers, helmet for security headers, morgan or pino-http for logging, multer for file uploads, express-rate-limit, compression. Naming the ones you have actually used makes the answer concrete.',
        hi: 'Cross-origin headers ke liye cors, security headers ke liye helmet, logging ke liye morgan ya pino-http, file uploads ke liye multer, express-rate-limit, compression. Jo tumne sach mein use kiye unke naam lena jawab ko thos banata hai.',
      },
    },
  ],

  'What is express.json()?': [
    {
      heading: { en: 'Built-in middleware that parses a JSON body', hi: 'Built-in middleware jo JSON body parse karta hai' },
      body: {
        en: 'It reads the request stream, parses the body as JSON, and puts the result on req.body. Without it req.body is undefined, because Node gives you a stream and nothing else.',
        hi: 'Wo request stream padhta hai, body ko JSON ki tarah parse karta hai, aur nateeja req.body pe rakh deta hai. Iske bina req.body undefined hai, kyunki Node tumhe sirf ek stream deta hai aur kuch nahi.',
      },
      code: `app.use(express.json());

app.post('/users', (req, res) => {
  req.body.name;      // ✓ parsed
});`,
    },
    {
      heading: { en: 'It only runs for a matching Content-Type', hi: 'Ye sirf milte Content-Type pe chalta hai' },
      body: {
        en: 'By default it parses only when the header is application/json. Any other content type passes straight through untouched, which is why req.body can be undefined even with the parser mounted — the client sent the wrong header.',
        hi: 'Default se ye tabhi parse karta hai jab header application/json ho. Baaki koi bhi content type bina chhue nikal jaata hai, isiliye parser lage hone pe bhi req.body undefined ho sakta hai — client ne galat header bheja.',
      },
      code: `app.use(express.json({ type: ['application/json', 'application/*+json'] }));`,
    },
    {
      heading: { en: 'Always set a size limit', hi: 'Size ki seema hamesha lagao' },
      body: {
        en: 'The default is 100kb, which is usually fine — but people raise it without thinking. An unbounded body is a denial-of-service hole, because one client can make the process buffer an arbitrary amount of memory.',
        hi: 'Default 100kb hai, jo aam taur pe theek hai — par log bina soche usse badha dete hain. Bina seema wali body denial-of-service ka chhed hai, kyunki ek client process se jitni chaahe memory buffer karwa sakta hai.',
      },
      code: `app.use(express.json({ limit: '1mb' }));   // deliberate, not '50mb'`,
    },
    {
      heading: { en: 'Malformed JSON throws, so handle it', hi: 'Kharaab JSON error deta hai, toh usse sambhaalo' },
      body: {
        en: 'A syntax error surfaces as an error with status 400 and type entity.parse.failed. Without a handler that recognises it, the client gets a 500 and a stack trace for what is actually their mistake.',
        hi: 'Syntax error status 400 aur type entity.parse.failed ke saath aata hai. Aise handler ke bina jo isse pehchaane, client ko 500 aur stack trace milta hai us galti ke liye jo asal mein uski hai.',
      },
      code: `app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next(err);
});`,
    },
    {
      heading: { en: 'Keep the raw body when you need a signature', hi: 'Signature chahiye toh kachcha body bachao' },
      body: {
        en: 'A webhook signature is computed over the exact bytes that were sent. Parsing destroys them, so you must capture the raw buffer with the verify hook — or mount express.raw on that route instead.',
        hi: 'Webhook ka signature theek unhi bytes pe banta hai jo bheje gaye the. Parsing unhe khatam kar deti hai, toh verify hook se kachcha buffer pakadna padta hai — ya us route pe express.raw lagao.',
      },
      code: `app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; },
}));`,
    },
    {
      heading: { en: 'It replaced body-parser', hi: 'Isne body-parser ki jagah li' },
      body: {
        en: 'Body parsing was removed from Express 4 and lived in the body-parser package, then came back as express.json in 4.16. If you see require("body-parser") in a codebase, it is doing the same thing with an extra dependency.',
        hi: 'Body parsing Express 4 se hata di gayi thi aur body-parser package mein rehti thi, phir 4.16 mein express.json ban kar laut aayi. Kisi codebase mein require("body-parser") dikhe toh wo wahi kaam ek extra dependency ke saath kar raha hai.',
      },
    },
  ],

  'What is express.urlencoded()?': [
    {
      heading: { en: 'Parses an HTML form submission', hi: 'HTML form ka submission parse karta hai' },
      body: {
        en: 'It handles bodies with content type application/x-www-form-urlencoded — what a plain HTML form posts by default — and puts the result on req.body.',
        hi: 'Ye application/x-www-form-urlencoded content type wali bodies sambhaalta hai — jo saada HTML form default se bhejta hai — aur nateeja req.body pe rakhta hai.',
      },
      code: `app.use(express.urlencoded({ extended: true }));

// name=Asha&age=30   →   req.body = { name: 'Asha', age: '30' }`,
    },
    {
      heading: { en: 'The extended option is the whole question', hi: 'Poora sawaal extended option hai' },
      body: {
        en: 'With extended false it uses Node querystring, which produces only strings and flat objects. With extended true it uses the qs library, which supports nested objects and arrays. Anything beyond a flat form needs true.',
        hi: 'extended false ho toh ye Node ki querystring use karta hai, jo sirf strings aur flat objects deti hai. extended true ho toh qs library, jo nested objects aur arrays sambhaalti hai. Flat form se aage kuch bhi ho toh true chahiye.',
      },
      code: `// user[name]=Asha&tags[]=a&tags[]=b

extended: false  →  { 'user[name]': 'Asha', 'tags[]': ['a','b'] }
extended: true   →  { user: { name: 'Asha' }, tags: ['a','b'] }`,
    },
    {
      heading: { en: 'Every value is a string', hi: 'Har value string hai' },
      body: {
        en: 'There are no types in a form encoding, so a number arrives as "30" and a checkbox as "on". Coerce and validate at the boundary rather than trusting the shape.',
        hi: 'Form encoding mein types hote hi nahi, toh number "30" bankar aata hai aur checkbox "on". Shakl pe bharosa karne ki jagah boundary pe convert aur validate karo.',
      },
    },
    {
      heading: { en: 'You often need both parsers', hi: 'Aksar dono parsers chahiye hote hain' },
      body: {
        en: 'They each check the content type and skip anything that does not match, so mounting both is safe and normal — a JSON API that also serves an HTML form needs exactly that.',
        hi: 'Dono content type dekhte hain aur na milne pe chhod dete hain, toh dono lagana safe aur aam hai — jo JSON API HTML form bhi deti hai usme bilkul yahi chahiye.',
      },
      code: `app.use(express.json());
app.use(express.urlencoded({ extended: true }));`,
    },
    {
      heading: { en: 'It does not handle file uploads', hi: 'Ye file uploads nahi sambhaalta' },
      body: {
        en: 'A form with a file input sends multipart/form-data, which neither built-in parser understands. req.body stays empty and the file is nowhere. That needs multer or busboy.',
        hi: 'File input wala form multipart/form-data bhejta hai, jise koi bhi built-in parser nahi samajhta. req.body khaali reh jaata hai aur file kahin nahi hoti. Uske liye multer ya busboy chahiye.',
      },
      code: `<form enctype="multipart/form-data">   →  needs multer`,
    },
  ],

  'What is next() in Express?': [
    {
      heading: { en: 'The function that advances the pipeline', hi: 'Wo function jo pipeline aage badhata hai' },
      body: {
        en: 'Express hands every middleware a next function. Calling it moves to the next matching layer in the stack. Nothing else advances the pipeline — not returning, not finishing the function body.',
        hi: 'Express har middleware ko ek next function deta hai. Usse bulane se stack ki agli matching layer pe chala jaata hai. Aur kuch pipeline aage nahi badhata — na return karna, na function ki body khatam hona.',
      },
      code: `app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();                             // ✓ without this, nothing continues
});`,
    },
    {
      heading: { en: 'Forgetting it hangs the request', hi: 'Isse bhoolna request latka deta hai' },
      body: {
        en: 'The single most common Express bug. No error, no timeout on the server — the client simply waits until it gives up. Watch for a conditional that only calls next in one branch.',
        hi: 'Express ka sabse aam bug. Na error, na server pe timeout — client bas intezaar karta rehta hai jab tak haar na maane. Aisi shart pe dhyaan do jo sirf ek branch mein next bulaati ho.',
      },
      code: `app.use((req, res, next) => {
  if (req.user) next();      // ✗ no else — anonymous requests hang
});`,
    },
    {
      heading: { en: 'next(err) switches to the error track', hi: 'next(err) error patri pe le jaata hai' },
      body: {
        en: 'Passing any argument tells Express something went wrong. It then skips every normal middleware and looks for the next four-argument error handler. This is how a failure travels from deep in the stack to one central place.',
        hi: 'Koi bhi argument dena Express ko bataata hai ki kuch galat hua. Phir wo har aam middleware chhod kar agla chaar-argument wala error handler dhoondhta hai. Aise hi koi failure stack ki gehraai se ek central jagah tak pahunchti hai.',
      },
      code: `if (!user) return next(new Error('not found'));`,
    },
    {
      heading: { en: 'The two string forms', hi: 'Do string wale roop' },
      body: {
        en: 'next("route") skips the remaining handlers for this route and moves to the next matching route. next("router") exits the current router entirely. Both are rare, but they are what the question is testing beyond the basics.',
        hi: 'next("route") is route ke bache handlers chhod kar agle matching route pe chala jaata hai. next("router") maujooda router se poori tarah bahar nikal jaata hai. Dono kam aate hain, par basics se aage sawaal yahi jaanch raha hota hai.',
      },
      code: `app.get('/x', (req, res, next) => {
  if (skip) return next('route');    // jump to the next /x handler
  res.send('first');
}, (req, res) => res.send('second'));`,
    },
    {
      heading: { en: 'Calling it twice is a bug', hi: 'Isse do baar bulana bug hai' },
      body: {
        en: 'The pipeline advances twice, so a later handler may try to send a second response and you get "Cannot set headers after they are sent". Always return when you call next inside a conditional.',
        hi: 'Pipeline do baar aage badhta hai, toh koi baad wala handler doosra response bhejne ki koshish kar sakta hai aur "Cannot set headers after they are sent" milta hai. Shart ke andar next bulao toh hamesha return karo.',
      },
      code: `if (bad) next(err);        // ✗ execution continues
if (bad) return next(err);  // ✓`,
    },
    {
      heading: { en: 'Do not call it after sending a response', hi: 'Response bhejne ke baad isse mat bulao' },
      body: {
        en: 'Once you have sent, the cycle is over. Calling next continues the walk and the next layer may attempt to write to a finished response. Send or continue — never both.',
        hi: 'Ek baar bhej diya toh cycle khatam. next bulane se chalna jaari rehta hai aur agli layer khatam ho chuke response pe likhne ki koshish kar sakti hai. Ya bhejo ya aage badho — dono kabhi nahi.',
      },
    },
  ],

  'What is Router in Express?': [
    {
      heading: { en: 'A mini application with its own middleware stack', hi: 'Apne middleware stack wala ek mini application' },
      body: {
        en: 'A Router is an isolated instance that supports use, get, post and the rest, exactly like the app. You mount it on the app at a path, and it becomes a layer in the parent stack.',
        hi: 'Router ek alag instance hai jisme use, get, post waghera sab chalte hain, bilkul app ki tarah. Usse app pe kisi path pe lagate ho, aur wo parent stack mein ek layer ban jaata hai.',
      },
      code: `const router = express.Router();
router.get('/', list);
router.post('/', create);

app.use('/users', router);      // GET /users, POST /users`,
    },
    {
      heading: { en: 'The mount path is stripped inside', hi: 'Andar mount path hat jaata hai' },
      body: {
        en: 'Routes inside the router are relative to where it was mounted, so the router does not know or care about its prefix. That is what lets you remount the same router at a different path — for API versioning, for instance.',
        hi: 'Router ke andar ke routes uske mount hone ki jagah se relative hote hain, toh router ko apne prefix ka pata hi nahi hota. Isi se tum wahi router kisi doosre path pe dobara laga sakte ho — jaise API versioning ke liye.',
      },
      code: `app.use('/api/v1/users', router);    // the router still says '/'`,
    },
    {
      heading: { en: 'Middleware on a router is scoped to it', hi: 'Router pe laga middleware usi tak seemit hai' },
      body: {
        en: 'This is the main reason to use one. Auth applied to the admin router affects only admin routes, with no path matching in the middleware itself and no risk of it leaking onto the health check.',
        hi: 'Isse use karne ki mukhya wajah yahi hai. Admin router pe laga auth sirf admin routes pe asar karta hai, middleware mein khud koi path matching nahi, aur health check pe pahunchne ka koi khatra nahi.',
      },
      code: `adminRouter.use(requireAdmin);      // only admin routes
app.use('/admin', adminRouter);`,
    },
    {
      heading: { en: 'It is how you split a large app', hi: 'Bade app ko isse hi baanta jaata hai' },
      body: {
        en: 'One router per feature, each in its own file, assembled in a single place. The app file then reads as a table of contents rather than a thousand-line list of routes.',
        hi: 'Har feature ke liye ek router, har ek apni file mein, ek jagah jod diye gaye. Phir app file hazaar-line ki routes ki list nahi, ek vishay-suchi jaisi padhti hai.',
      },
      code: `app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/auth', authRouter);`,
    },
    {
      heading: { en: 'mergeParams for nested routers', hi: 'Nested routers ke liye mergeParams' },
      body: {
        en: 'A router mounted under a parameterised path does not see the parent parameter by default. mergeParams turns that on, and forgetting it is why req.params is unexpectedly empty in a nested route.',
        hi: 'Parameter wale path ke neeche laga router default se parent ka parameter nahi dekhta. mergeParams usse chaalu karta hai, aur isse bhoolna hi wajah hai ki nested route mein req.params achanak khaali hota hai.',
      },
      code: `const posts = express.Router({ mergeParams: true });
app.use('/users/:userId/posts', posts);
posts.get('/', (req) => req.params.userId);    // ✓ visible now`,
    },
    {
      heading: { en: 'Router versus a sub-app', hi: 'Router vs sub-app' },
      body: {
        en: 'The follow-up. A sub-app is a full express() instance mounted with use. It has its own settings, its own view engine and its own error handling. A Router shares all of the parent\'s settings. Use a Router unless you genuinely need separate configuration.',
        hi: 'Follow-up. Sub-app ek poora express() instance hai jo use se lagta hai. Uski apni settings, apna view engine aur apna error handling hota hai. Router parent ki saari settings share karta hai. Jab tak sach mein alag configuration na chahiye, Router hi lo.',
      },
    },
  ],

  'What is the difference between PUT and PATCH?': [
    {
      heading: { en: 'Replace versus modify', hi: 'Badalna vs sudhaarna' },
      body: {
        en: 'PUT sends a complete representation and replaces the resource with it. PATCH sends only the fields to change. That difference decides what happens to the fields you did not send.',
        hi: 'PUT poora roop bhejta hai aur resource ko usse badal deta hai. PATCH sirf wahi fields bhejta hai jo badalni hain. Isi farq se tay hota hai ki jo fields tumne nahi bheji unka kya hoga.',
      },
      code: `PUT /users/1     { "name": "Asha", "email": "a@b.com", "age": 30 }
// the whole resource — a missing field should be cleared

PATCH /users/1   { "age": 31 }
// only age changes; everything else is untouched`,
    },
    {
      heading: { en: 'Which is why a partial PUT is a bug', hi: 'Isiliye adhoora PUT ek bug hai' },
      body: {
        en: 'Sending only one field to PUT and having the server merge it is the most common mistake. Semantically that is a PATCH, and treating it as PUT means a client that legitimately wants to clear a field cannot.',
        hi: 'PUT ko sirf ek field bhejna aur server ka usse merge kar dena sabse aam galti hai. Arth ke hisaab se wo PATCH hai, aur usse PUT maanna matlab jo client sach mein koi field khaali karna chahta hai wo kar hi nahi sakta.',
      },
    },
    {
      heading: { en: 'PUT is idempotent, PATCH may not be', hi: 'PUT idempotent hai, PATCH shaayad nahi' },
      body: {
        en: 'Sending the same PUT ten times leaves the same state, because it is a full replacement. A PATCH can be idempotent — setting age to 31 is — but it need not be: an increment operation is not, and that is why the spec does not guarantee it.',
        hi: 'Wahi PUT das baar bhejo toh state wahi rehti hai, kyunki wo poora badalna hai. PATCH idempotent ho sakta hai — age ko 31 karna hai — par hona zaroori nahi: badhaane wala operation nahi hai, aur isiliye spec guarantee nahi deti.',
      },
      diagram: `PUT    { age: 31 } × 3   →  age is 31        idempotent
PATCH  { $inc: 1 } × 3   →  age is +3        not idempotent`,
    },
    {
      heading: { en: 'Both are handled the same way in Express', hi: 'Express mein dono ek jaise hi sambhale jaate hain' },
      body: {
        en: 'Express gives you app.put and app.patch; the semantics are entirely your responsibility. The framework will happily let you implement PUT as a merge, and nothing will complain.',
        hi: 'Express app.put aur app.patch deta hai; arth poori tarah tumhari zimmedaari hai. Framework khushi se PUT ko merge ki tarah banane dega, aur koi shikayat nahi karega.',
      },
      code: `app.put('/users/:id', (req, res) => {
  users.replace(req.params.id, req.body);      // ✓ full replacement
});
app.patch('/users/:id', (req, res) => {
  users.merge(req.params.id, req.body);         // ✓ partial
});`,
    },
    {
      heading: { en: 'Validate differently for each', hi: 'Dono ke liye validation alag' },
      body: {
        en: 'A PUT schema should require every field, because a missing one means "clear it". A PATCH schema should make everything optional but reject an empty body. Using the same schema for both is where the bug usually is.',
        hi: 'PUT ke schema mein har field zaroori honi chahiye, kyunki gayab field ka matlab hai "usse khaali karo". PATCH ke schema mein sab optional ho par khaali body mana ho. Dono ke liye ek hi schema use karna hi aam bug ki jagah hai.',
      },
      code: `const Put = User;                    // all fields required
const Patch = User.partial().refine((o) => Object.keys(o).length > 0);`,
    },
    {
      heading: { en: 'In practice most APIs only ship PATCH', hi: 'Asal mein zyadatar APIs sirf PATCH deti hain' },
      body: {
        en: 'A full replacement is rarely what a client wants, and it makes every update a read-modify-write. Saying that shows practical judgement rather than reciting the spec.',
        hi: 'Poora badalna client ko shaayad hi chahiye hota hai, aur usse har update ek padho-badlo-likho ban jaata hai. Ye kehna spec sunane se zyada vyavharik samajh dikhata hai.',
      },
    },
  ],

  'What is the difference between GET and POST?': [
    {
      heading: { en: 'Retrieve versus submit', hi: 'Laana vs bhejna' },
      body: {
        en: 'GET asks for a resource and should not change anything. POST sends data to be processed and is expected to change state. That intent is the difference; everything mechanical follows from it.',
        hi: 'GET koi resource maangta hai aur usse kuch badalna nahi chahiye. POST data bhejta hai jise process hona hai aur usse state badalne ki ummeed hai. Farq isi mansha ka hai; baaki saari cheezein isse nikalti hain.',
      },
    },
    {
      heading: { en: 'Where the data goes', hi: 'Data kahan jaata hai' },
      body: {
        en: 'GET puts parameters in the URL query string, so they appear in browser history, server logs and the Referer header. POST puts them in the request body, which does not get logged by default. That is why credentials never go in a GET.',
        hi: 'GET parameters URL ki query string mein rakhta hai, toh wo browser history, server logs aur Referer header mein dikhte hain. POST unhe request body mein rakhta hai, jo default se log nahi hoti. Isiliye credentials kabhi GET mein nahi jaate.',
      },
      code: `GET  /search?q=hello&page=2     →  req.query
POST /users   { "name": "Asha" }  →  req.body`,
    },
    {
      heading: { en: 'Safe and idempotent', hi: 'Safe aur idempotent' },
      body: {
        en: 'GET is both: it does not change state, and repeating it changes nothing. POST is neither: it changes state, and sending it twice creates two records. That is exactly why a browser warns before re-submitting a form.',
        hi: 'GET dono hai: wo state nahi badalta, aur dohraane se kuch nahi badalta. POST dono nahi hai: wo state badalta hai, aur do baar bhejne se do records ban jaate hain. Isiliye browser form dobara bhejne se pehle chetavni deta hai.',
      },
      diagram: `          safe   idempotent   cacheable   body
GET       yes      yes          yes        no
POST      no       no           rarely     yes
PUT       no       yes          no         yes
DELETE    no       yes          no         no`,
    },
    {
      heading: { en: 'Caching is the practical difference', hi: 'Vyavharik farq caching ka hai' },
      body: {
        en: 'GET responses are cached by browsers, proxies and CDNs, which is a large part of why the web is fast. POST is not cached. Implementing a read as a POST silently gives up all of that.',
        hi: 'GET ke responses browsers, proxies aur CDNs cache karte hain, aur web ke tez hone ka bada hissa yahi hai. POST cache nahi hota. Kisi read ko POST banana chup-chaap ye sab chhod dena hai.',
      },
    },
    {
      heading: { en: 'Length and encoding limits', hi: 'Lambai aur encoding ki seemayein' },
      body: {
        en: 'A URL has a practical limit around 2000 characters, so a large payload does not fit in a GET. POST has no such limit and can carry any content type, including multipart for file uploads.',
        hi: 'URL ki vyavharik seema lagbhag 2000 characters hai, toh bada payload GET mein nahi aata. POST pe aisi koi seema nahi aur wo koi bhi content type le ja sakta hai, file uploads ke liye multipart samet.',
      },
    },
    {
      heading: { en: 'The rule that follows', hi: 'Jo rule isse nikalta hai' },
      body: {
        en: 'Use GET for anything a user could safely refresh, bookmark or share. Use POST when it creates or changes something. A GET that deletes a record is a real vulnerability — a crawler or a prefetch will find it.',
        hi: 'Har wo cheez GET mein jise user safely refresh, bookmark ya share kar sake. Jo kuch banaye ya badle wo POST. Aisa GET jo record delete kare wo asli kamzori hai — koi crawler ya prefetch usse dhoondh lega.',
      },
      code: `GET /users/1/delete       // ✗ a crawler will call this
DELETE /users/1            // ✓`,
    },
  ],

  'What are route parameters?': [
    {
      heading: { en: 'Named segments in the path', hi: 'Path mein naam wale hisse' },
      body: {
        en: 'A colon marks a segment as a parameter. Express matches the URL against the pattern and puts the captured values on req.params, keyed by the name you gave.',
        hi: 'Colon kisi hisse ko parameter bana deta hai. Express URL ko pattern se milaata hai aur pakdi gayi values req.params pe rakh deta hai, tumhare diye naam ke saath.',
      },
      code: `app.get('/users/:id', (req, res) => {
  req.params.id;      // '42' for GET /users/42
});

app.get('/users/:userId/posts/:postId', (req) => req.params);
// { userId: '1', postId: '7' }`,
    },
    {
      heading: { en: 'Every value is a string', hi: 'Har value string hai' },
      body: {
        en: 'A URL has no types, so an id arrives as "42" not 42. Comparing it to a number with === fails, and passing it straight to a database can behave differently than you expect. Convert and validate at the boundary.',
        hi: 'URL mein types hote hi nahi, toh id "42" bankar aati hai, 42 nahi. Usse number se === se compare karo toh fail hota hai, aur seedha database mein bhejna ummeed se alag chal sakta hai. Boundary pe convert aur validate karo.',
      },
      code: `const id = Number(req.params.id);
if (!Number.isInteger(id)) return res.status(400).json({ error: 'bad id' });`,
    },
    {
      heading: { en: 'Route parameters versus query parameters', hi: 'Route parameters vs query parameters' },
      body: {
        en: 'A route parameter identifies WHICH resource and is part of the path. A query parameter modifies HOW you want it — filtering, sorting, pagination — and is optional. Getting this split right is most of good URL design.',
        hi: 'Route parameter batata hai KAUNSA resource, aur wo path ka hissa hai. Query parameter batata hai KAISE chahiye — filter, sort, pagination — aur wo optional hai. Achhe URL design ka zyadatar hissa yahi baant sahi karna hai.',
      },
      code: `/users/42?fields=name&include=posts
       ↑ which          ↑ how`,
    },
    {
      heading: { en: 'Order of registration decides matching', hi: 'Register hone ka kram matching tay karta hai' },
      body: {
        en: 'Express takes the first route that matches. A parameterised route registered before a literal one swallows it — /users/me matches /users/:id if that came first, and you get a lookup for the id "me".',
        hi: 'Express pehla match hone wala route leta hai. Literal route se pehle laga parameter wala route usse nigal leta hai — /users/me, /users/:id se match kar jaata hai agar wo pehle aaya, aur tum "me" naam ki id dhoondhne lagte ho.',
      },
      code: `app.get('/users/:id', byId);
app.get('/users/me', me);       // ✗ unreachable

app.get('/users/me', me);        // ✓ literal first
app.get('/users/:id', byId);`,
    },
    {
      heading: { en: 'app.param runs before the handler', hi: 'app.param handler se pehle chalta hai' },
      body: {
        en: 'A useful feature people rarely know. Register a callback for a parameter name and it runs whenever that parameter appears, so you can load the record once instead of repeating the lookup in every route.',
        hi: 'Ek kaam ka feature jise log kam jaante hain. Kisi parameter ke naam pe callback register karo aur wo jab bhi wo parameter aaye tab chalta hai, toh record ek baar load kar lo, har route mein lookup dohraane ki jagah.',
      },
      code: `app.param('id', async (req, res, next, id) => {
  req.user = await db.users.find(id);
  if (!req.user) return res.status(404).end();
  next();
});`,
    },
    {
      heading: { en: 'Express 5 changed the pattern syntax', hi: 'Express 5 ne pattern syntax badli' },
      body: {
        en: 'Optional parameters now use braces rather than a trailing question mark, and a wildcard must be named. Mentioning this is a quick signal that you know the current version rather than the one from a tutorial.',
        hi: 'Optional parameters ab aakhir mein sawaaliya nishaan ki jagah braces se bante hain, aur wildcard ko naam dena zaroori hai. Iska zikr turant bata deta hai ki tumhe aaj ka version pata hai, kisi tutorial wala nahi.',
      },
      code: `'/users/:id?'      // ✗ Express 4 syntax
'/users{/:id}'      // ✓ Express 5
'/files/*splat'      // ✓ named wildcard`,
    },
  ],

  'What are query parameters?': [
    {
      heading: { en: 'The key-value pairs after the question mark', hi: 'Sawaaliya nishaan ke baad ki key-value jodiyaan' },
      body: {
        en: 'Express parses the query string and puts it on req.query as an object. Nothing needs to be mounted — unlike req.body, this works out of the box.',
        hi: 'Express query string parse karke usse req.query pe object ki tarah rakh deta hai. Kuch lagane ki zaroorat nahi — req.body ke ulat, ye pehle se chalta hai.',
      },
      code: `// GET /search?q=hello&page=2&sort=desc
req.query;      // { q: 'hello', page: '2', sort: 'desc' }`,
    },
    {
      heading: { en: 'They are strings, and sometimes arrays', hi: 'Ye strings hain, aur kabhi arrays' },
      body: {
        en: 'The trap worth demonstrating. A repeated key becomes an array, so req.query.tag can be a string OR an array depending on what the client sent. Code that assumes a string breaks on the second tag.',
        hi: 'Dikhane laayak jaal. Dohri key array ban jaati hai, toh req.query.tag string BHI ho sakta hai aur array bhi, ye client ne kya bheja uspe. Jo code string maan kar chalta hai wo doosre tag pe toot jaata hai.',
      },
      code: `// ?tag=a         →  { tag: 'a' }
// ?tag=a&tag=b   →  { tag: ['a', 'b'] }

const tags = [].concat(req.query.tag ?? []);    // ✓ always an array`,
    },
    {
      heading: { en: 'Nested objects are possible too', hi: 'Nested objects bhi mumkin hain' },
      body: {
        en: 'Express uses the qs library by default, so bracket syntax produces nested structures. That is convenient and also a small attack surface — a deeply nested query can be used to burn CPU, which is why the depth is capped.',
        hi: 'Express default se qs library use karta hai, toh bracket syntax nested dhaanche banata hai. Ye suvidhajanak hai aur ek chhota hamla-kshetra bhi — gehri nested query se CPU jalaya ja sakta hai, isiliye depth seemit hai.',
      },
      code: `// ?filter[status]=active&filter[role]=admin
req.query.filter;     // { status: 'active', role: 'admin' }`,
    },
    {
      heading: { en: 'Always validate and coerce', hi: 'Hamesha validate aur convert karo' },
      body: {
        en: 'Query values come straight from the client, so treat them as untrusted input. A schema gives you types, defaults and bounds in one place — and a page size of one million becomes a 400 rather than an outage.',
        hi: 'Query ki values seedha client se aati hain, toh unhe bharose ke laayak mat maano. Schema ek jagah types, defaults aur seemayein deta hai — aur das lakh ka page size outage nahi, 400 ban jaata hai.',
      },
      code: `const Query = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
const { page, limit } = Query.parse(req.query);`,
    },
    {
      heading: { en: 'req.query is a getter in Express 5', hi: 'Express 5 mein req.query ek getter hai' },
      body: {
        en: 'It is now computed lazily and is read-only, so assigning to it throws. Middleware that used to rewrite req.query needs to store the parsed result somewhere else instead.',
        hi: 'Ab ye zaroorat pe banta hai aur sirf-padhne wala hai, toh usme assign karna error deta hai. Jo middleware pehle req.query badalta tha usse ab nateeja kahin aur rakhna padega.',
      },
      code: `req.query = parsed;        // ✗ throws in Express 5
req.validated = parsed;     // ✓`,
    },
    {
      heading: { en: 'Use them for how, not which', hi: 'Inhe kaise ke liye lo, kaunsa ke liye nahi' },
      body: {
        en: 'A query parameter should modify a request — filtering, sorting, pagination, field selection. Identifying a resource belongs in the path. Following that split makes URLs predictable and caching sane.',
        hi: 'Query parameter request ko badalna chahiye — filter, sort, pagination, fields chunna. Kaunsa resource hai wo path mein jaata hai. Is baant ko maanne se URLs andaaze laayak rehte hain aur caching samajhdaar.',
      },
    },
  ],

  'How do you serve static files in Express?': [
    {
      heading: { en: 'express.static, pointed at a directory', hi: 'express.static, ek directory pe' },
      body: {
        en: 'It is the only built-in middleware that reads from disk. Mount it and any file inside that folder is served at a matching URL, with the correct content type and caching headers.',
        hi: 'Ye ek hi built-in middleware hai jo disk se padhta hai. Isse lagao aur us folder ki koi bhi file matching URL pe mil jaati hai, sahi content type aur caching headers ke saath.',
      },
      code: `app.use(express.static('public'));
// public/logo.png  →  GET /logo.png

app.use('/assets', express.static('public'));
// public/logo.png  →  GET /assets/logo.png`,
    },
    {
      heading: { en: 'Use an absolute path', hi: 'Absolute path do' },
      body: {
        en: 'A relative path is resolved from the working directory, which depends on where the process was started — so it works with npm start from the project root and breaks under a process manager. Anchor it to the module directory.',
        hi: 'Relative path working directory se resolve hota hai, jo is baat pe depend karta hai ki process kahan se shuru hua — toh project root se npm start pe chalta hai aur process manager ke neeche toot jaata hai. Usse module ki directory se baandho.',
      },
      code: `app.use(express.static(path.join(import.meta.dirname, 'public')));`,
    },
    {
      heading: { en: 'Mount it before your routes', hi: 'Isse apne routes se pehle lagao' },
      body: {
        en: 'Express walks the stack in order, so a static file only wins if the middleware is reached first. Mounting it after a catch-all route means the route answers and the file is never served.',
        hi: 'Express stack kram se chalta hai, toh static file tabhi jeetti hai jab middleware pehle mile. Kisi catch-all route ke baad lagao toh route jawab de deta hai aur file kabhi nahi milti.',
      },
    },
    {
      heading: { en: 'Set caching headers deliberately', hi: 'Caching headers soch kar set karo' },
      body: {
        en: 'The default sends no max-age, so the browser revalidates every asset on every load. For hashed filenames set a long max-age and immutable; for anything unhashed keep it short.',
        hi: 'Default mein koi max-age nahi jaata, toh browser har load pe har asset dobara jaanchta hai. Hash wale filenames pe lamba max-age aur immutable do; bina hash wali cheezon pe chhota rakho.',
      },
      code: `app.use('/assets', express.static('dist', {
  maxAge: '1y',
  immutable: true,     // ✓ safe only for hashed filenames
}));`,
    },
    {
      heading: { en: 'It is path-traversal safe by design', hi: 'Ye design se path-traversal safe hai' },
      body: {
        en: 'The serve-static package resolves and confirms the result is inside the root, so a request for ../../etc/passwd is rejected. Rolling your own static handler with res.sendFile and unvalidated input is where the vulnerability appears.',
        hi: 'serve-static package path resolve karke pakka karta hai ki nateeja root ke andar hai, toh ../../etc/passwd wali request mana ho jaati hai. Khud res.sendFile aur bina jaanche input se static handler banana hi wo jagah hai jahan kamzori aati hai.',
      },
    },
    {
      heading: { en: 'And in production you usually should not', hi: 'Aur production mein aam taur pe nahi karna chahiye' },
      body: {
        en: 'Node is not the best tool for serving bytes off disk. Put a CDN or nginx in front and let Express handle only the API. Saying this shows operational judgement rather than just knowing the API.',
        hi: 'Disk se bytes bhejne ke liye Node sabse achha auzaar nahi hai. Aage CDN ya nginx lagao aur Express ko sirf API sambhalne do. Ye kehna sirf API jaanne se zyada operational samajh dikhata hai.',
      },
    },
  ],

  /* ─── Errors, sessions and the request cycle ──────────────── */

  'How do you handle errors in Express?': [
    {
      heading: { en: 'One error handler at the end of the stack', hi: 'Stack ke aakhir mein ek error handler' },
      body: {
        en: 'A middleware with FOUR parameters is an error handler. Express skips it during the normal walk and only reaches it when something calls next with an argument. It must be registered after every route.',
        hi: 'CHAAR parameters wala middleware error handler hai. Express usse aam chalne mein chhod deta hai aur wahan tabhi pahunchta hai jab koi next ko argument de. Usse har route ke baad register karna zaroori hai.',
      },
      code: `app.use((err, req, res, next) => {
  logger.error({ err, url: req.originalUrl });
  res.status(err.status || 500).json({ error: err.expose ? err.message : 'Internal error' });
});`,
    },
    {
      heading: { en: 'Arity is how Express identifies it', hi: 'Express isse arguments ki ginti se pehchaanta hai' },
      body: {
        en: 'Not a flag, not a registration method — purely the number of declared parameters. Remove the unused next and it silently becomes ordinary middleware that never runs, which is a genuinely confusing bug.',
        hi: 'Na koi flag, na koi khaas register karne ka tareeka — sirf declare kiye parameters ki ginti. Bina use hua next hata do toh wo chup-chaap aam middleware ban jaata hai jo kabhi chalta hi nahi, aur ye sach mein uljhane wala bug hai.',
      },
      code: `app.use((err, req, res, next) => {});   // ✓ error handler
app.use((err, req, res) => {});          // ✗ ordinary middleware`,
    },
    {
      heading: { en: 'Synchronous throws are caught automatically', hi: 'Synchronous throws apne aap pakde jaate hain' },
      body: {
        en: 'Express wraps each handler in a try/catch, so a throw in synchronous code goes straight to the error handler. This is why people assume async throws work too — and in Express 4 they do not.',
        hi: 'Express har handler ko try/catch mein lapetta hai, toh synchronous code ka throw seedha error handler tak jaata hai. Isiliye log maan lete hain ki async throws bhi chalte hain — aur Express 4 mein wo nahi chalte.',
      },
      code: `app.get('/a', (req, res) => { throw new Error('x'); });     // ✓ caught
app.get('/b', async (req, res) => { throw new Error('x'); });
// Express 4: unhandled rejection, request hangs.  Express 5: caught.`,
    },
    {
      heading: { en: 'Use an error class with a status', hi: 'Status wali error class use karo' },
      body: {
        en: 'Throwing a plain Error gives the handler nothing to work with, so everything becomes a 500. A small class carrying a status and an expose flag lets one handler distinguish a client mistake from a server fault.',
        hi: 'Saada Error phenkne se handler ke paas kuch nahi hota, toh sab kuch 500 ban jaata hai. Ek chhoti class jisme status aur expose flag ho, ek hi handler ko client ki galti aur server ki kharaabi mein farq karne deti hai.',
      },
      code: `class HttpError extends Error {
  constructor(status, message, expose = status < 500) {
    super(message);
    this.status = status;
    this.expose = expose;
  }
}
throw new HttpError(404, 'User not found');`,
    },
    {
      heading: { en: 'Never leak the message or the stack', hi: 'Message ya stack kabhi leak mat karo' },
      body: {
        en: 'A database error message can contain a query, a table name or a connection string. Return a generic message for anything that is a 500, log the real one, and only expose the message when you deliberately set it for a 4xx.',
        hi: 'Database ke error message mein query, table ka naam ya connection string ho sakta hai. Har 500 ke liye aam message do, asli message log karo, aur message tabhi dikhao jab tumne 4xx ke liye usse jaan-boojh kar set kiya ho.',
      },
    },
    {
      heading: { en: 'Add a 404 handler before it', hi: 'Usse pehle ek 404 handler jodo' },
      body: {
        en: 'A request that matches no route falls through the whole stack. Without a catch-all, Express sends its own HTML error page, which is wrong for an API. Mount a plain middleware after the routes and before the error handler.',
        hi: 'Jo request kisi route se match na kare wo poore stack se nikal jaati hai. Bina catch-all ke Express apna HTML error page bhejta hai, jo API ke liye galat hai. Routes ke baad aur error handler se pehle ek saada middleware lagao.',
      },
      code: `app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use(errorHandler);      // ✓ still last`,
    },
    {
      heading: { en: 'And a process-level safety net', hi: 'Aur process star pe suraksha jaal' },
      body: {
        en: 'The Express handler only sees errors inside the request cycle. An unhandled rejection in a background task escapes it entirely, so log it at the process level and exit — the orchestrator restarts a clean process.',
        hi: 'Express ka handler sirf request cycle ke andar ke errors dekhta hai. Background task ki bina sambhali rejection usse poori tarah bach jaati hai, toh usse process star pe log karo aur nikal jao — orchestrator saaf process restart kar dega.',
      },
      code: `process.on('unhandledRejection', (e) => { logger.fatal(e); process.exit(1); });`,
    },
  ],

  'What is express-session?': [
    {
      heading: { en: 'Server-side session state keyed by a cookie', hi: 'Cookie se pehchaani jaane wali server-side session state' },
      body: {
        en: 'The middleware creates a session id, sends it in a signed cookie, stores the data server-side, and gives you req.session on every subsequent request. The client holds only the id, never the data.',
        hi: 'Middleware ek session id banata hai, usse signed cookie mein bhejta hai, data server pe rakhta hai, aur har agli request pe tumhe req.session deta hai. Client ke paas sirf id hoti hai, data kabhi nahi.',
      },
      code: `app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 864e5 },
}));

req.session.userId = user.id;      // persists across requests`,
    },
    {
      heading: { en: 'The default store is memory, and unusable', hi: 'Default store memory hai, aur bekaar hai' },
      body: {
        en: 'MemoryStore leaks — it never evicts — and it is per process, so sessions vanish on restart and disagree across cluster workers or containers. Express logs a warning in production for exactly this reason.',
        hi: 'MemoryStore leak karta hai — kuch hataata hi nahi — aur har process ka apna hai, toh restart pe sessions gaayab ho jaate hain aur cluster workers ya containers ke beech alag-alag hote hain. Isi wajah se Express production mein warning deta hai.',
      },
      code: `app.use(session({ store: new RedisStore({ client }), … }));   // ✓`,
    },
    {
      heading: { en: 'The two options everyone gets wrong', hi: 'Do options jo sab galat rakhte hain' },
      body: {
        en: 'resave true rewrites the session on every request even when nothing changed, which hammers the store and creates race conditions. saveUninitialized true stores a session for every visitor including bots. Both should be false.',
        hi: 'resave true har request pe session dobara likh deta hai chahe kuch na badla ho, jo store pe bojh daalta hai aur race conditions banata hai. saveUninitialized true har visitor ka session rakh leta hai, bots samet. Dono false hone chahiye.',
      },
    },
    {
      heading: { en: 'Cookie flags are the security', hi: 'Suraksha cookie flags mein hai' },
      body: {
        en: 'httpOnly keeps JavaScript from reading the id, so an XSS cannot steal the session. secure limits it to HTTPS. sameSite blocks most CSRF. Missing any of the three turns a session into an easy target.',
        hi: 'httpOnly JavaScript ko id padhne se rokta hai, toh XSS session chura nahi sakta. secure usse sirf HTTPS tak rakhta hai. sameSite zyadatar CSRF rok deta hai. Teen mein se ek bhi chhoote toh session aasaan nishaana ban jaata hai.',
      },
    },
    {
      heading: { en: 'Regenerate the id on login', hi: 'Login pe id dobara banao' },
      body: {
        en: 'Otherwise an attacker who fixes a victim\'s session id before login still holds a valid session after it — session fixation. Regenerating issues a fresh id and invalidates the old one.',
        hi: 'Warna jis hamlavar ne login se pehle victim ki session id tay kar di, uske paas login ke baad bhi valid session rehta hai — session fixation. Dobara banane se nayi id milti hai aur purani bekaar ho jaati hai.',
      },
      code: `req.session.regenerate((err) => {
  req.session.userId = user.id;
});`,
    },
    {
      heading: { en: 'Sessions versus JWTs', hi: 'Sessions vs JWTs' },
      body: {
        en: 'The follow-up. A session is server-side state, so you can revoke it instantly and the cookie carries nothing sensitive. A JWT is stateless and scales without a shared store, but cannot be revoked before it expires. For a normal web app with a browser, a session cookie is usually the better default.',
        hi: 'Follow-up. Session server pe rakhi state hai, toh usse turant radd kar sakte ho aur cookie mein kuch sanvedansheel nahi jaata. JWT stateless hai aur bina saanjhe store ke scale karta hai, par expire hone se pehle radd nahi ho sakta. Browser wale aam web app ke liye session cookie aksar behtar default hai.',
      },
    },
  ],

  'What is cookie-parser?': [
    {
      heading: { en: 'It parses the Cookie header into an object', hi: 'Ye Cookie header ko object mein badalta hai' },
      body: {
        en: 'Cookies arrive as one semicolon-separated string. cookie-parser splits it and puts the result on req.cookies. Without it you would parse that header by hand.',
        hi: 'Cookies ek semicolon se alag ki hui string mein aati hain. cookie-parser usse todta hai aur nateeja req.cookies pe rakh deta hai. Iske bina wo header tumhe khud parse karna padta.',
      },
      code: `app.use(cookieParser());

// Cookie: theme=dark; lang=hi
req.cookies;      // { theme: 'dark', lang: 'hi' }`,
    },
    {
      heading: { en: 'Signed cookies detect tampering', hi: 'Signed cookies chhedchhaad pakadti hain' },
      body: {
        en: 'Pass a secret and Express appends an HMAC to the value. On the way back it verifies the signature and puts valid ones on req.signedCookies. A modified cookie fails verification and is dropped.',
        hi: 'Secret do toh Express value ke saath ek HMAC jodta hai. Wapas aane pe wo signature jaanchta hai aur sahi wali req.signedCookies pe rakhta hai. Badli hui cookie jaanch mein fail ho kar gir jaati hai.',
      },
      code: `app.use(cookieParser(env.COOKIE_SECRET));
res.cookie('userId', '42', { signed: true });
req.signedCookies.userId;      // '42', or false if tampered`,
    },
    {
      heading: { en: 'Signing is not encryption', hi: 'Signing encryption nahi hai' },
      body: {
        en: 'The value is still plain text and the user can read it. Signing only proves it was not changed. Never put anything secret in a cookie, signed or not.',
        hi: 'Value abhi bhi saada text hai aur user usse padh sakta hai. Signing sirf ye saabit karti hai ki wo badli nahi gayi. Koi bhi secret cookie mein mat rakho, signed ho ya na ho.',
      },
    },
    {
      heading: { en: 'Setting a cookie does not need it', hi: 'Cookie set karne ke liye ye nahi chahiye' },
      body: {
        en: 'A detail people miss. res.cookie is built into Express — cookie-parser is only for READING. You need it only if you read req.cookies or use signed cookies.',
        hi: 'Ek detail jo log chook jaate hain. res.cookie Express mein pehle se hai — cookie-parser sirf PADHNE ke liye hai. Wo tabhi chahiye jab tum req.cookies padho ya signed cookies use karo.',
      },
      code: `res.cookie('theme', 'dark', { httpOnly: true, maxAge: 864e5 });`,
    },
    {
      heading: { en: 'The flags that matter', hi: 'Jo flags maayne rakhte hain' },
      body: {
        en: 'httpOnly hides it from JavaScript so an XSS cannot read it. secure restricts it to HTTPS. sameSite blocks most CSRF. And clearing requires the SAME options you set it with, or the browser treats it as a different cookie.',
        hi: 'httpOnly usse JavaScript se chhupata hai toh XSS padh nahi sakta. secure usse HTTPS tak rokta hai. sameSite zyadatar CSRF rokta hai. Aur hataane ke liye WAHI options chahiye jinse set kiya tha, warna browser usse alag cookie maanta hai.',
      },
      code: `res.clearCookie('sid', { path: '/', httpOnly: true });   // ✓ same options`,
    },
    {
      heading: { en: 'Often you do not need it at all', hi: 'Aksar iski zaroorat hi nahi hoti' },
      body: {
        en: 'express-session parses cookies itself, and a JWT is usually sent in an Authorization header rather than a cookie. Adding cookie-parser out of habit is a dependency with nothing to do.',
        hi: 'express-session khud cookies parse karta hai, aur JWT aam taur pe cookie ki jagah Authorization header mein jaata hai. Aadat se cookie-parser jodna aisi dependency hai jiska koi kaam nahi.',
      },
    },
  ],

  'What is the request-response cycle in Express?': [
    {
      heading: { en: 'One request in, exactly one response out', hi: 'Ek request andar, bilkul ek response bahar' },
      body: {
        en: 'The cycle begins when Express receives a request and ends when a response is sent. Between those two points the request walks the middleware stack. Every rule in Express follows from the fact that the cycle ends exactly once.',
        hi: 'Cycle tab shuru hoti hai jab Express request paata hai aur tab khatam jab response chala jaata hai. In do bindu ke beech request middleware stack pe chalti hai. Express ka har rule isi baat se nikalta hai ki cycle theek ek baar khatam hoti hai.',
      },
      diagram: `request
  → middleware 1 → middleware 2 → route handler
                                        │
                                    res.json()
                                        │
                                    cycle ends`,
    },
    {
      heading: { en: 'Each layer has three choices', hi: 'Har layer ke teen vikalp hain' },
      body: {
        en: 'Send a response and end the cycle, call next to continue, or call next with an error to jump to the error handler. Doing none of them leaves the request open until the client gives up.',
        hi: 'Response bhejo aur cycle khatam karo, aage badhne ko next bulao, ya error handler pe jaane ko next ko error do. Inme se kuch bhi na karo toh request khuli reh jaati hai jab tak client haar na maane.',
      },
    },
    {
      heading: { en: 'Ending it twice throws', hi: 'Do baar khatam karna error deta hai' },
      body: {
        en: 'Once headers are sent, the response is committed. A second send produces "Cannot set headers after they are sent" — almost always because a conditional sent a response and then fell through instead of returning.',
        hi: 'Headers ja chuke toh response tay ho gaya. Doosra send "Cannot set headers after they are sent" deta hai — lagbhag hamesha isliye ki kisi shart ne response bhej diya aur return karne ki jagah aage nikal gaya.',
      },
      code: `if (!user) res.status(404).send();      // ✗ execution continues
if (!user) return res.status(404).send();  // ✓`,
    },
    {
      heading: { en: 'res is a stream, so a response can be gradual', hi: 'res ek stream hai, toh response dhire-dhire ja sakta hai' },
      body: {
        en: 'Headers go first and can only be set before the first byte of body. After that you can keep writing, which is how you stream a large file or a server-sent event feed. end closes it.',
        hi: 'Headers pehle jaate hain aur body ke pehle byte se pehle hi set ho sakte hain. Uske baad tum likhte reh sakte ho, aur aise hi badi file ya server-sent events bheje jaate hain. end usse band karta hai.',
      },
      code: `res.setHeader('Content-Type', 'text/plain');
res.write('part 1');
res.write('part 2');
res.end();`,
    },
    {
      heading: { en: 'The client can end it too', hi: 'Client bhi isse khatam kar sakta hai' },
      body: {
        en: 'If the user navigates away, the socket closes and any work you are still doing is wasted. Listening for the close event lets you abort a slow database query instead of finishing it for nobody.',
        hi: 'User kahin aur chala jaaye toh socket band ho jaata hai aur tumhara chal raha kaam barbaad hai. close event sunne se tum dheemi database query rok sakte ho, kisi ke liye bhi na hote hue usse poora karne ki jagah.',
      },
      code: `req.on('close', () => controller.abort());`,
    },
    {
      heading: { en: 'The error track is part of the cycle', hi: 'Error patri cycle ka hissa hai' },
      body: {
        en: 'next(err) does not end the cycle — it changes which layers run. Express skips normal middleware and looks for a four-argument handler, which must then send a response like any other layer.',
        hi: 'next(err) cycle khatam nahi karta — wo badal deta hai ki kaunsi layers chalengi. Express aam middleware chhod kar chaar-argument wala handler dhoondhta hai, jise phir baaki layers ki tarah response bhejna hi padta hai.',
      },
    },
  ],

  'Does middleware order matter in Express?': [
    {
      heading: { en: 'Yes, completely — it is the whole model', hi: 'Haan, poori tarah — yahi poora model hai' },
      body: {
        en: 'Express walks the stack in registration order. There is no priority, no dependency resolution and no reordering. Where you put a line is exactly when it runs, and most Express confusion is really an ordering problem.',
        hi: 'Express stack ko register hone ke kram mein chalta hai. Na koi priority, na dependency resolution, na koi reordering. Tumne line kahan rakhi, wahi uske chalne ka waqt hai, aur Express ki zyadatar uljhan asal mein order ki problem hoti hai.',
      },
    },
    {
      heading: { en: 'The parser must come before the route', hi: 'Parser route se pehle hona chahiye' },
      body: {
        en: 'The most common instance. Mount express.json after a POST route and req.body is undefined inside it, because the parser layer is never reached before the handler sends a response.',
        hi: 'Sabse aam misaal. POST route ke baad express.json lagao toh uske andar req.body undefined hai, kyunki handler ke response bhejne se pehle parser wali layer tak pahuncha hi nahi jaata.',
      },
      code: `app.post('/users', handler);      // req.body undefined
app.use(express.json());           // ✗ too late`,
    },
    {
      heading: { en: 'Auth must come before what it protects', hi: 'Auth uske pehle jo wo bachaata hai' },
      body: {
        en: 'A security bug rather than an inconvenience. If the route is registered first, it answers and the auth middleware below it never runs — the endpoint is simply open, with no error to tell you.',
        hi: 'Ye asuvidha nahi, security bug hai. Route pehle register ho toh wahi jawab de deta hai aur neeche ka auth middleware kabhi nahi chalta — endpoint bas khula reh jaata hai, aur batane ko koi error bhi nahi.',
      },
      code: `app.get('/admin', handler);       // ✗ unprotected
app.use('/admin', requireAuth);`,
    },
    {
      heading: { en: 'Error handlers must be last', hi: 'Error handlers aakhir mein' },
      body: {
        en: 'Express reaches the error track by continuing forward through the stack, so a handler registered before the routes is never behind them. Register it after everything, including the 404.',
        hi: 'Express error patri pe stack mein aage badh kar hi pahunchta hai, toh routes se pehle laga handler unke peeche kabhi nahi hota. Usse sab ke baad register karo, 404 ke baad bhi.',
      },
    },
    {
      heading: { en: 'The 404 goes after routes, before the error handler', hi: '404 routes ke baad, error handler se pehle' },
      body: {
        en: 'It is a normal middleware that catches whatever matched no route. Put it before the routes and it answers everything; put it after the error handler and it never runs.',
        hi: 'Ye ek aam middleware hai jo un requests ko pakadta hai jo kisi route se match na hui. Routes se pehle rakho toh wo sab kuch jawab de deta hai; error handler ke baad rakho toh kabhi chalta hi nahi.',
      },
    },
    {
      heading: { en: 'The order to memorise', hi: 'Yaad rakhne laayak kram' },
      body: {
        en: 'Security headers, CORS, body parsers, logging, static files, routes, 404, error handler. Keep them in one file in that order and most ordering bugs never happen.',
        hi: 'Security headers, CORS, body parsers, logging, static files, routes, 404, error handler. Inhe ek file mein isi kram mein rakho aur zyadatar order wale bugs hote hi nahi.',
      },
      code: `app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(pinoHttp());
app.use(express.static('public'));
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);`,
    },
  ],

  'How do you handle errors in async route handlers?': [
    {
      heading: { en: 'In Express 4 they are not caught at all', hi: 'Express 4 mein ye pakde hi nahi jaate' },
      body: {
        en: 'Express wraps handlers in a try/catch, which catches a synchronous throw. An async function returns a promise instead, so a rejection escapes the try entirely — you get an unhandled rejection and the request hangs until it times out.',
        hi: 'Express handlers ko try/catch mein lapetta hai, jo synchronous throw pakadta hai. Async function promise return karta hai, toh rejection us try se poori tarah bach jaati hai — bina sambhali rejection milti hai aur request timeout tak latki rehti hai.',
      },
      code: `app.get('/x', async (req, res) => {
  const u = await db.find(id);      // ✗ if this rejects, the request hangs
  res.json(u);
});`,
    },
    {
      heading: { en: 'The manual fix: try/catch and next', hi: 'Haath ka ilaaj: try/catch aur next' },
      body: {
        en: 'Correct and explicit, but you must remember it in every handler, and forgetting it in one is invisible until that path fails in production.',
        hi: 'Sahi aur saaf, par har handler mein yaad rakhna padta hai, aur ek mein bhool jaao toh pata tab chalta hai jab wo raasta production mein fail ho.',
      },
      code: `app.get('/x', async (req, res, next) => {
  try {
    res.json(await db.find(id));
  } catch (e) {
    next(e);                        // ✓ into the error handler
  }
});`,
    },
    {
      heading: { en: 'The wrapper: catch it once', hi: 'Wrapper: ek baar pakad lo' },
      body: {
        en: 'A three-line helper removes the repetition. It calls the handler, and because an async function always returns a promise, it attaches a catch that forwards to next. This is what express-async-handler does.',
        hi: 'Teen line ka helper dohraav khatam kar deta hai. Wo handler bulaata hai, aur kyunki async function hamesha promise deta hai, uspe ek catch laga deta hai jo next tak bhejta hai. express-async-handler yahi karta hai.',
      },
      code: `const wrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/x', wrap(async (req, res) => {
  res.json(await db.find(id));      // ✓ rejection forwarded
}));`,
    },
    {
      heading: { en: 'Express 5 does this for you', hi: 'Express 5 ye tumhare liye karta hai' },
      body: {
        en: 'The headline change in version 5. A rejected promise returned from a handler is forwarded to the error handler automatically, so no wrapper is needed. Mentioning this is the fastest way to show your Express knowledge is current.',
        hi: 'Version 5 ka mukhya badlaav. Handler se aayi rejected promise apne aap error handler tak pahunchti hai, toh koi wrapper nahi chahiye. Iska zikr sabse tez tareeka hai ye dikhane ka ki tumhara Express gyaan aaj ka hai.',
      },
      code: `// Express 5
app.get('/x', async (req, res) => {
  res.json(await db.find(id));      // ✓ rejection handled automatically
});`,
    },
    {
      heading: { en: 'The trap: errors after the response', hi: 'Jaal: response ke baad ke errors' },
      body: {
        en: 'If a handler throws after already sending, next(err) reaches the error handler but the response is committed. Express checks res.headersSent and delegates to the default handler, which destroys the socket — always guard for this.',
        hi: 'Agar handler response bhejne ke baad throw kare, toh next(err) error handler tak pahunchta hai par response ja chuka hai. Express res.headersSent dekhta hai aur default handler ko de deta hai, jo socket tod deta hai — iske liye hamesha guard rakho.',
      },
      code: `app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);     // ✓ let Express close it
  res.status(500).json({ error: 'Internal error' });
});`,
    },
    {
      heading: { en: 'And fire-and-forget work is never caught', hi: 'Aur bina intezaar wala kaam kabhi nahi pakda jaata' },
      body: {
        en: 'An async call you do not await inside a handler is outside the request cycle, so neither the wrapper nor Express 5 sees its rejection. Either await it or attach your own catch.',
        hi: 'Handler ke andar jise tum await nahi karte wo async call request cycle ke bahar hai, toh na wrapper na Express 5 uski rejection dekhta hai. Ya toh usse await karo ya apna catch lagao.',
      },
      code: `sendEmail(user);                        // ✗ rejection is lost
void sendEmail(user).catch(logger.error);   // ✓`,
    },
  ],

  'How do you structure a large Express application?': [
    {
      heading: { en: 'Split by feature, not by file type', hi: 'File type se nahi, feature se baanto' },
      body: {
        en: 'A controllers folder, a routes folder and a models folder means one feature is spread across three directories and every change touches all of them. Grouping by feature keeps related code together.',
        hi: 'Ek controllers folder, ek routes folder aur ek models folder matlab ek feature teen directories mein bikhra hai aur har badlaav teeno ko chhoota hai. Feature se group karo toh juda hua code saath rehta hai.',
      },
      diagram: `src/
  modules/
    users/    routes.js  service.js  repository.js  schema.js
    orders/   routes.js  service.js  repository.js  schema.js
  middleware/
  config.js
  app.js      wires everything
  server.js   starts listening`,
    },
    {
      heading: { en: 'Keep the layers honest', hi: 'Layers ko imaandaar rakho' },
      body: {
        en: 'The route parses and validates the request and sends the response. The service holds the business logic and never sees req or res. The repository talks to the database. That separation is what makes the logic testable without HTTP.',
        hi: 'Route request parse aur validate karta hai aur response bhejta hai. Service business logic rakhti hai aur req ya res kabhi nahi dekhti. Repository database se baat karti hai. Isi alagav se logic bina HTTP ke test hone laayak banta hai.',
      },
      code: `// routes.js — HTTP only
router.post('/', validate(CreateUser), async (req, res) => {
  res.status(201).json(await usersService.create(req.body));
});

// service.js — no req, no res
export async function create(input) { … }`,
    },
    {
      heading: { en: 'One router per feature, assembled once', hi: 'Har feature ka ek router, ek jagah joda hua' },
      body: {
        en: 'Each module exports a Router. A single routes index mounts them all, so the app file reads as a table of contents rather than a thousand-line list.',
        hi: 'Har module ek Router export karta hai. Ek routes index sabko mount kar deta hai, toh app file hazaar-line ki list nahi, ek vishay-suchi jaisi padhti hai.',
      },
      code: `router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
app.use('/api/v1', router);`,
    },
    {
      heading: { en: 'Separate app.js from server.js', hi: 'app.js ko server.js se alag karo' },
      body: {
        en: 'app.js builds and exports the app without listening; server.js starts it. That one split is what lets supertest run the whole app in a test without binding a port, and it also keeps startup concerns out of the wiring.',
        hi: 'app.js app banata aur export karta hai, sunta nahi; server.js usse shuru karta hai. Yahi ek baant supertest ko bina port khole poora app test karne deti hai, aur wiring se shuruaat ke maamle bhi alag rakhti hai.',
      },
    },
    {
      heading: { en: 'Validated config in one module', hi: 'Ek module mein validated config' },
      body: {
        en: 'Read process.env once, parse it through a schema, and export a typed object. Scattered process.env access means no validation, no defaults, and no single place to see what the app needs to run.',
        hi: 'process.env ek baar padho, usse schema se parse karo, aur ek typed object export karo. Bikhra hua process.env matlab na validation, na defaults, aur na ek jagah jahan dikhe app ko chalne ke liye kya chahiye.',
      },
    },
    {
      heading: { en: 'Cross-cutting concerns get their own folder', hi: 'Saanjhe kaam ko apna folder' },
      body: {
        en: 'Auth, validation, rate limiting, error handling and logging are used by every feature and belong to none of them. Keeping them separate stops one feature importing another just to reuse a middleware.',
        hi: 'Auth, validation, rate limiting, error handling aur logging har feature use karta hai aur kisi ek ke nahi hain. Inhe alag rakhne se ek feature sirf middleware dobara use karne ke liye doosre ko import nahi karta.',
      },
    },
    {
      heading: { en: 'And do not over-engineer it early', hi: 'Aur shuru mein zyada engineering mat karo' },
      body: {
        en: 'A five-route service does not need four layers. Say that — the structure should grow when the pain appears, and a folder tree copied from a tutorial is its own kind of technical debt.',
        hi: 'Paanch route wali service ko chaar layers nahi chahiye. Ye kaho — dhaancha tab badhna chahiye jab dard mehsoos ho, aur tutorial se copy kiya folder tree apne aap mein ek technical debt hai.',
      },
    },
  ],

  'What is the difference between app.use and app.all?': [
    {
      heading: { en: 'Both match any method; only one matches exactly', hi: 'Dono har method match karte hain; exact sirf ek' },
      body: {
        en: 'app.use matches a path PREFIX and mounts middleware. app.all matches the path EXACTLY and defines a route. That single difference is the whole answer.',
        hi: 'app.use path ke SHURUAATI hisse se match karta hai aur middleware lagata hai. app.all path se POORA match karta hai aur route banata hai. Yahi ek farq poora jawab hai.',
      },
      code: `app.use('/admin', mw);      // /admin, /admin/x, /admin/x/y
app.all('/admin', mw);       // /admin only`,
    },
    {
      heading: { en: 'The mount path is stripped for use', hi: 'use ke liye mount path hat jaata hai' },
      body: {
        en: 'Inside middleware mounted with use, req.url has the prefix removed while req.originalUrl keeps it. With app.all nothing is stripped, because it is a route rather than a mount.',
        hi: 'use se lage middleware ke andar req.url se prefix hat jaata hai jabki req.originalUrl usse rakhta hai. app.all mein kuch nahi hataya jaata, kyunki wo mount nahi, route hai.',
      },
      code: `app.use('/api', (req) => req.url);      // '/users' for /api/users
app.all('/api', (req) => req.url);       // '/api'`,
    },
    {
      heading: { en: 'app.all supports route parameters', hi: 'app.all route parameters sambhaalta hai' },
      body: {
        en: 'Because it is a route, it populates req.params from the pattern. app.use does not — a path given to use is a mount prefix, not a pattern, so there is nothing to capture.',
        hi: 'Ye route hai, isliye pattern se req.params bharta hai. app.use nahi bharta — use ko diya path mount prefix hai, pattern nahi, toh pakadne ko kuch hai hi nahi.',
      },
      code: `app.all('/users/:id', (req) => req.params.id);   // ✓
app.use('/users/:id', (req) => req.params.id);    // ✗ not a pattern`,
    },
    {
      heading: { en: 'When to reach for app.all', hi: 'app.all kab uthana' },
      body: {
        en: 'A gate on one specific path regardless of method — an auth check on /admin, a maintenance response, or returning 405 for methods you do not implement on a route you do.',
        hi: 'Kisi ek khaas path pe method chahe jo bhi ho ek gate — /admin pe auth check, maintenance ka response, ya jis route pe kuch methods nahi banaye unke liye 405 dena.',
      },
      code: `app.all('/users/:id', (req, res, next) => {
  if (!['GET', 'PATCH'].includes(req.method)) return res.sendStatus(405);
  next();
});`,
    },
    {
      heading: { en: 'And why use is what you almost always want', hi: 'Aur use hi lagbhag hamesha kyun chahiye' },
      body: {
        en: 'Middleware normally applies to a whole area of the app, not one exact URL. Prefix matching is what makes app.use("/api", auth) protect everything under it, which is the case you actually have.',
        hi: 'Middleware aam taur pe app ke poore hisse pe lagta hai, kisi ek theek URL pe nahi. Prefix matching hi app.use("/api", auth) ko uske neeche sab kuch bachane deti hai, aur asal mein tumhara case yahi hota hai.',
      },
    },
  ],

  'How do you validate request data in Express?': [
    {
      heading: { en: 'Validate at the boundary, before the logic', hi: 'Logic se pehle, boundary pe validate karo' },
      body: {
        en: 'Everything on req — body, query, params, headers — comes from the client and cannot be trusted. Validating in one middleware means the handler and the service can assume the data is well formed.',
        hi: 'req pe jo bhi hai — body, query, params, headers — client se aata hai aur uspe bharosa nahi kiya ja sakta. Ek middleware mein validate karo toh handler aur service maan sakti hain ki data theek shakl mein hai.',
      },
    },
    {
      heading: { en: 'A schema library is the right tool', hi: 'Sahi auzaar schema library hai' },
      body: {
        en: 'Zod, Joi or Yup. A schema declares the shape once, coerces types, applies defaults, and produces a clear error naming the field. With Zod you also infer the TypeScript type from the same schema, so there is one source of truth.',
        hi: 'Zod, Joi ya Yup. Schema shakl ek baar batata hai, types badalta hai, defaults lagata hai, aur field ka naam lete hue saaf error deta hai. Zod ke saath usi schema se TypeScript type bhi nikal aata hai, toh sach ek hi jagah rehta hai.',
      },
      code: `const CreateUser = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.coerce.number().int().min(13).optional(),
});`,
    },
    {
      heading: { en: 'Wrap it in reusable middleware', hi: 'Usse dobara use hone wale middleware mein lapeto' },
      body: {
        en: 'One factory that takes a schema and a target, validates, and either replaces the value with the parsed result or forwards a 400. Every route then declares its contract in one line.',
        hi: 'Ek factory jo schema aur target le, validate kare, aur ya toh value ko parse kiye nateeje se badal de ya 400 aage bhej de. Phir har route apna contract ek line mein bata deta hai.',
      },
      code: `const validate = (schema, where = 'body') => (req, res, next) => {
  const r = schema.safeParse(req[where]);
  if (!r.success) {
    return res.status(400).json({ error: 'Validation failed', issues: r.error.issues });
  }
  req.validated = { ...req.validated, [where]: r.data };
  next();
};

router.post('/users', validate(CreateUser), createUser);`,
    },
    {
      heading: { en: 'Use the parsed output, not the raw input', hi: 'Kachche input nahi, parse kiya output use karo' },
      body: {
        en: 'The mistake that makes validation pointless. If the handler reads req.body instead of the validated result, it gets the unvalidated value — including any extra fields the schema stripped, which is how mass assignment happens.',
        hi: 'Ye galti validation ko bekaar kar deti hai. Handler validated nateeje ki jagah req.body padhe toh usse bina jaanchi value milti hai — un extra fields samet jo schema ne hataayi thi, aur mass assignment aise hi hota hai.',
      },
      code: `req.body.isAdmin;              // ✗ whatever the client sent
req.validated.body.isAdmin;     // ✓ stripped by the schema`,
    },
    {
      heading: { en: 'Validate query and params too', hi: 'Query aur params bhi validate karo' },
      body: {
        en: 'People validate the body and forget the rest. A page size read straight from the query can be a million; an id from params is a string that goes into a database query. Both need coercion and bounds.',
        hi: 'Log body validate karte hain aur baaki bhool jaate hain. Query se seedha liya page size das lakh ho sakta hai; params se aayi id ek string hai jo database query mein jaati hai. Dono ko convert aur seema chahiye.',
      },
    },
    {
      heading: { en: 'Return a useful error shape', hi: 'Kaam ka error roop do' },
      body: {
        en: 'A 400 with the field names and what was wrong lets a client fix it. A bare "Bad Request" means someone has to guess. Keep the shape consistent so the frontend can map errors onto form fields.',
        hi: 'Field ke naam aur kya galat tha, ye batane wala 400 client ko theek karne deta hai. Khaali "Bad Request" matlab kisi ko andaaza lagana padega. Roop ek jaisa rakho taaki frontend errors ko form fields pe laga sake.',
      },
    },
    {
      heading: { en: 'And validation is not authorisation', hi: 'Aur validation authorisation nahi hai' },
      body: {
        en: 'A schema proves the data is well formed, not that this user is allowed to do it. A perfectly valid request to delete someone else\'s record still needs a permission check. Keeping the two separate is the point.',
        hi: 'Schema saabit karta hai ki data theek shakl mein hai, ye nahi ki ye user usse karne ka haqdaar hai. Kisi aur ka record delete karne wali bilkul valid request ko phir bhi permission check chahiye. Dono ko alag rakhna hi asli baat hai.',
      },
    },
  ],

  'What is CORS and how do you configure it correctly in Express?': [
    {
      heading: { en: 'A browser rule, enforced by the browser', hi: 'Browser ka rule, browser hi lagoo karta hai' },
      body: {
        en: 'The same-origin policy blocks a page on one origin from reading a response from another. CORS is how a server opts in, using response headers. Nothing about it is enforced server-side — curl and Postman ignore it entirely.',
        hi: 'Same-origin policy ek origin ke page ko doosre ka response padhne se rokti hai. CORS wo tareeka hai jisse server ijaazat deta hai, response headers se. Isme kuch bhi server pe lagoo nahi hota — curl aur Postman isse poori tarah ignore karte hain.',
      },
      diagram: `origin = protocol + host + port

https://app.com  →  https://api.app.com     cross-origin (host differs)
http://app.com   →  https://app.com          cross-origin (protocol)
https://app.com  →  https://app.com:8080     cross-origin (port)`,
    },
    {
      heading: { en: 'The preflight is the part people miss', hi: 'Preflight wo hissa hai jo log chook jaate hain' },
      body: {
        en: 'For anything other than a simple request, the browser first sends an OPTIONS request asking permission. A custom header such as Authorization, or a Content-Type of application/json, triggers it — which is nearly every API call.',
        hi: 'Simple request ke alawa kisi bhi cheez ke liye browser pehle OPTIONS request bhej kar ijaazat maangta hai. Authorization jaisa custom header, ya application/json wala Content-Type, isse chalu kar deta hai — yaani lagbhag har API call.',
      },
      code: `OPTIONS /api/users
Origin: https://app.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: authorization, content-type`,
    },
    {
      heading: { en: 'The cors middleware, configured properly', hi: 'cors middleware, theek se set kiya hua' },
      body: {
        en: 'Mount it early, before routes, so the preflight is answered before anything else runs. Pass an explicit origin list rather than the default, which reflects any origin.',
        hi: 'Isse jaldi lagao, routes se pehle, taaki preflight ka jawab baaki kuch chalne se pehle chala jaaye. Default ki jagah saaf origin list do, kyunki default kisi bhi origin ko maan leta hai.',
      },
      code: `app.use(cors({
  origin: ['https://app.com', 'https://admin.app.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  maxAge: 86400,        // cache the preflight for a day
}));`,
    },
    {
      heading: { en: 'Wildcard and credentials cannot be combined', hi: 'Wildcard aur credentials saath nahi chalte' },
      body: {
        en: 'The spec forbids it: with credentials true the origin header must be a specific origin, never *. The browser rejects the response otherwise, which produces a CORS error that looks like a server problem and is not.',
        hi: 'Spec mana karti hai: credentials true ho toh origin header koi khaas origin hona chahiye, kabhi * nahi. Warna browser response mana kar deta hai, aur aisa CORS error aata hai jo server ki problem lagta hai par hai nahi.',
      },
      code: `origin: '*', credentials: true      // ✗ the browser rejects this`,
    },
    {
      heading: { en: 'Do not reflect the origin blindly', hi: 'Origin ko aankh band karke wapas mat bhejo' },
      body: {
        en: 'Echoing back whatever Origin the request sent, with credentials enabled, means any site can make authenticated requests on a user\'s behalf. It looks like it works and it disables the protection completely.',
        hi: 'Jo bhi Origin aaya usse wapas bhej dena, credentials chaalu ke saath, matlab koi bhi site user ki taraf se authenticated requests kar sakti hai. Ye chalta hua dikhta hai aur suraksha poori tarah band kar deta hai.',
      },
      code: `origin: (o, cb) => cb(null, true);      // ✗ reflects everything
origin: allowlist;                        // ✓`,
    },
    {
      heading: { en: 'A CORS error is not a server error', hi: 'CORS error server ka error nahi hai' },
      body: {
        en: 'The request usually reached your server and was processed — the browser just refused to hand the response to the page. Check the response headers rather than your route logic, and remember an error response needs CORS headers too.',
        hi: 'Request aam taur pe tumhare server tak pahunchi aur process bhi hui — browser ne bas response page ko dene se mana kar diya. Apne route ke logic ki jagah response headers dekho, aur yaad rakho error response pe bhi CORS headers chahiye.',
      },
    },
    {
      heading: { en: 'And the simplest fix is often no CORS', hi: 'Aur sabse simple ilaaj aksar CORS na hona hai' },
      body: {
        en: 'Serve the frontend and the API from the same origin, or put a reverse proxy in front so /api routes to the backend. Same origin means no preflight, no headers and no configuration to get wrong.',
        hi: 'Frontend aur API ko ek hi origin se do, ya aage reverse proxy lagao taaki /api backend pe jaaye. Same origin matlab na preflight, na headers, aur na koi configuration jo galat ho sake.',
      },
    },
  ],

  'How do you implement authentication middleware in Express?': [
    {
      heading: { en: 'One middleware that identifies the caller', hi: 'Ek middleware jo caller ko pehchaane' },
      body: {
        en: 'It reads the credential, verifies it, attaches the user to req, and calls next — or responds 401 and stops. Everything downstream can then assume req.user is present and valid.',
        hi: 'Wo credential padhta hai, jaanchta hai, user ko req pe lagata hai, aur next bulaata hai — ya 401 de kar ruk jaata hai. Phir aage ka sab kuch maan sakta hai ki req.user maujood aur sahi hai.',
      },
      code: `export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}`,
    },
    {
      heading: { en: 'Mount it before what it protects', hi: 'Jo bachaana hai usse pehle lagao' },
      body: {
        en: 'Order is security here, not style. A route registered before the middleware answers first and the check never runs, leaving the endpoint open with nothing to warn you.',
        hi: 'Yahan order style nahi, suraksha hai. Middleware se pehle laga route pehle jawab de deta hai aur check chalta hi nahi, endpoint khula reh jaata hai aur chetavni koi nahi.',
      },
      code: `app.use('/api/admin', requireAuth, requireRole('admin'));
app.use('/api/admin', adminRoutes);      // ✓ after the gate`,
    },
    {
      heading: { en: 'Keep authentication and authorisation separate', hi: 'Authentication aur authorisation alag rakho' },
      body: {
        en: 'Authentication answers who you are; authorisation answers what you may do. Two small middlewares compose cleanly, and the split means a role change never touches the token logic.',
        hi: 'Authentication batata hai tum kaun ho; authorisation batata hai tum kya kar sakte ho. Do chhote middleware saaf jud jaate hain, aur is baant se role badalne pe token ka logic kabhi nahi chhoota.',
      },
      code: `const requireRole = (role) => (req, res, next) =>
  req.user?.role === role ? next() : res.status(403).json({ error: 'Forbidden' });`,
    },
    {
      heading: { en: '401 and 403 mean different things', hi: '401 aur 403 ka matlab alag hai' },
      body: {
        en: 'A detail interviewers notice. 401 means you are not authenticated — log in. 403 means you are authenticated but not allowed — logging in again will not help. Returning 401 for a permission failure sends the client into a login loop.',
        hi: 'Ek detail jo interviewers dekh lete hain. 401 matlab tum authenticated nahi ho — login karo. 403 matlab tum authenticated ho par ijaazat nahi — dobara login karne se kuch nahi hoga. Permission fail hone pe 401 dena client ko login ke chakkar mein daal deta hai.',
      },
    },
    {
      heading: { en: 'Where the token lives is a real decision', hi: 'Token kahan rehta hai, ye asli faisla hai' },
      body: {
        en: 'An Authorization header suits an API and a mobile client. An httpOnly cookie is safer for a browser, because JavaScript cannot read it and an XSS cannot steal it — but then you must handle CSRF with SameSite or a token.',
        hi: 'Authorization header API aur mobile client ke liye theek hai. Browser ke liye httpOnly cookie safe hai, kyunki JavaScript usse padh nahi sakti aur XSS chura nahi sakta — par phir CSRF ko SameSite ya token se sambhalna padta hai.',
      },
    },
    {
      heading: { en: 'A JWT cannot be revoked', hi: 'JWT radd nahi ki ja sakti' },
      body: {
        en: 'The trade-off you should name. It is valid until it expires, so a logout or a ban does not take effect immediately. The usual answer is a short-lived access token with a refresh token you CAN revoke, or a session with server-side state.',
        hi: 'Ye sauda batana chahiye. Wo expire hone tak valid rehti hai, toh logout ya ban turant asar nahi karta. Aam jawab hai chhoti umar ka access token aur ek refresh token jise tum RADD kar sakte ho, ya server-side state wala session.',
      },
    },
    {
      heading: { en: 'And do not write the crypto yourself', hi: 'Aur crypto khud mat likho' },
      body: {
        en: 'Use jsonwebtoken or a library like Passport, and argon2 or bcrypt for passwords. Verify the algorithm explicitly when decoding a JWT — accepting whatever the token claims is a known vulnerability class.',
        hi: 'jsonwebtoken ya Passport jaisi library lo, aur passwords ke liye argon2 ya bcrypt. JWT decode karte waqt algorithm saaf batao — token jo kahe wahi maan lena ek maloom kamzori hai.',
      },
      code: `jwt.verify(token, secret, { algorithms: ['HS256'] });   // ✓ explicit`,
    },
  ],

  'What is helmet and what does it actually do?': [
    {
      heading: { en: 'Middleware that sets security response headers', hi: 'Middleware jo security ke response headers lagata hai' },
      body: {
        en: 'Helmet is a collection of small middlewares, each setting one header. It does not scan, sanitise or block anything — it tells the BROWSER to apply protections that are off by default.',
        hi: 'Helmet chhote middlewares ka samooh hai, har ek ek header lagata hai. Ye kuch scan, saaf ya block nahi karta — ye BROWSER se kehta hai ki wo suraksha lagaye jo default se band hoti hai.',
      },
      code: `app.use(helmet());      // sensible defaults for about a dozen headers`,
    },
    {
      heading: { en: 'The headers that matter most', hi: 'Sabse zaroori headers' },
      body: {
        en: 'Content-Security-Policy restricts where scripts may load from and is the strongest defence against XSS. Strict-Transport-Security forces HTTPS. X-Content-Type-Options stops MIME sniffing. X-Frame-Options prevents clickjacking.',
        hi: 'Content-Security-Policy batati hai scripts kahan se aa sakti hain aur XSS ke khilaaf sabse mazboot bachaav hai. Strict-Transport-Security HTTPS majboor karti hai. X-Content-Type-Options MIME sniffing rokti hai. X-Frame-Options clickjacking rokti hai.',
      },
      diagram: `Content-Security-Policy        where scripts, styles, images may come from
Strict-Transport-Security      always use HTTPS, for this long
X-Content-Type-Options         do not guess the content type
X-Frame-Options                do not let this page be framed
Referrer-Policy                how much URL to leak in Referer`,
    },
    {
      heading: { en: 'It also removes a header', hi: 'Ye ek header hataata bhi hai' },
      body: {
        en: 'X-Powered-By: Express tells an attacker exactly what you are running, which narrows their search for a known vulnerability. Helmet removes it — and you can do that one line yourself if you use nothing else.',
        hi: 'X-Powered-By: Express hamlavar ko theek bata deta hai ki tum kya chala rahe ho, jisse unki maloom kamzori ki khoj chhoti ho jaati hai. Helmet usse hata deta hai — aur agar aur kuch na lo toh ye ek line tum khud kar sakte ho.',
      },
      code: `app.disable('x-powered-by');`,
    },
    {
      heading: { en: 'CSP is the one that needs configuration', hi: 'Configuration CSP ko hi chahiye' },
      body: {
        en: 'The default policy is strict and will break inline scripts, inline styles and any CDN. That is why people disable it — which throws away the most valuable header. Configure it instead, with a nonce for anything genuinely inline.',
        hi: 'Default policy sakht hai aur inline scripts, inline styles aur kisi bhi CDN ko tod degi. Isiliye log usse band kar dete hain — aur sabse keemti header phenk dete hain. Uski jagah usse set karo, aur jo sach mein inline hai uske liye nonce do.',
      },
      code: `app.use(helmet({
  contentSecurityPolicy: {
    directives: { 'script-src': ["'self'", 'https://cdn.example.com'] },
  },
}));`,
    },
    {
      heading: { en: 'It does not protect an API much', hi: 'Ye API ko zyada nahi bachaata' },
      body: {
        en: 'Worth being honest about. These headers instruct a browser, so for a JSON API consumed by a mobile app or another service most of them do nothing. HSTS still matters; CSP and frame options largely do not.',
        hi: 'Iske baare mein imaandaar rehna chahiye. Ye headers browser ko nirdesh dete hain, toh mobile app ya kisi doosri service ke istemaal wali JSON API ke liye inme se zyadatar kuch nahi karte. HSTS phir bhi maayne rakhta hai; CSP aur frame options zyadatar nahi.',
      },
    },
    {
      heading: { en: 'And it is not a security strategy', hi: 'Aur ye security ki poori yojana nahi hai' },
      body: {
        en: 'Helmet does nothing about SQL injection, broken authentication, missing authorisation checks, or leaked secrets. Say that — treating one middleware as "we did security" is the mistake the question is looking for.',
        hi: 'Helmet SQL injection, tooti hui authentication, gayab authorisation checks, ya leak hue secrets ke baare mein kuch nahi karta. Ye kaho — ek middleware ko "security ho gayi" maan lena hi wo galti hai jo sawaal dhoondh raha hai.',
      },
    },
  ],

  'How do you handle file uploads in Express?': [
    {
      heading: { en: 'The built-in parsers cannot do it', hi: 'Built-in parsers ye nahi kar sakte' },
      body: {
        en: 'A file upload is multipart/form-data, which express.json and express.urlencoded both skip. req.body stays empty and the file is nowhere. You need a multipart parser — multer is the usual choice.',
        hi: 'File upload multipart/form-data hota hai, jise express.json aur express.urlencoded dono chhod dete hain. req.body khaali reh jaata hai aur file kahin nahi hoti. Multipart parser chahiye — aam chunav multer hai.',
      },
      code: `const upload = multer({ dest: 'uploads/' });
app.post('/avatar', upload.single('avatar'), (req, res) => {
  req.file;      // { originalname, mimetype, size, path }
  req.body;      // the other text fields
});`,
    },
    {
      heading: { en: 'Always set limits', hi: 'Seemayein hamesha lagao' },
      body: {
        en: 'Without a size limit one request can fill the disk or exhaust memory. Cap the file size and the number of files, and treat this as required rather than optional — it is the difference between an upload endpoint and a denial-of-service endpoint.',
        hi: 'Size ki seema ke bina ek request disk bhar sakti hai ya memory khatam kar sakti hai. File ka size aur ginti dono seemit karo, aur isse optional nahi zaroori maano — upload endpoint aur denial-of-service endpoint ka farq yahi hai.',
      },
      code: `multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
});`,
    },
    {
      heading: { en: 'Never trust the filename or the mimetype', hi: 'Filename ya mimetype pe kabhi bharosa mat karo' },
      body: {
        en: 'Both come from the client. A filename can contain path traversal, and the mimetype is simply whatever the client claimed. Generate your own filename and verify the type from the file\'s magic bytes.',
        hi: 'Dono client se aate hain. Filename mein path traversal ho sakta hai, aur mimetype bas wahi hai jo client ne keh diya. Apna filename banao aur file ke magic bytes se type jaancho.',
      },
      code: `const name = crypto.randomUUID() + path.extname(file.originalname);
const type = await fileTypeFromBuffer(buffer);      // real detection
if (!['image/png', 'image/jpeg'].includes(type?.mime)) reject();`,
    },
    {
      heading: { en: 'Memory storage versus disk storage', hi: 'Memory storage vs disk storage' },
      body: {
        en: 'memoryStorage keeps the file in a Buffer, which is convenient for small files you immediately forward but will exhaust the heap on a large one. diskStorage writes to a temp path — safer for anything sizeable, but you must clean up.',
        hi: 'memoryStorage file ko Buffer mein rakhta hai, jo chhoti files ke liye theek hai jinhe tum turant aage bhej dete ho par badi file pe heap khatam kar dega. diskStorage temp path pe likhta hai — bade files ke liye safe, par cleanup tumhe karna hoga.',
      },
    },
    {
      heading: { en: 'Do not store uploads on the app server', hi: 'Uploads app server pe mat rakho' },
      body: {
        en: 'A container has an ephemeral filesystem, so the file disappears on the next deploy and is invisible to other instances. Stream it to S3 or equivalent object storage and keep only the key in your database.',
        hi: 'Container ka filesystem astai hota hai, toh file agle deploy pe gaayab ho jaati hai aur doosre instances ko dikhti hi nahi. Usse S3 ya waise object storage pe stream karo aur database mein sirf key rakho.',
      },
    },
    {
      heading: { en: 'The better pattern: a presigned URL', hi: 'Behtar pattern: presigned URL' },
      body: {
        en: 'Have the client upload directly to object storage using a URL your server signs. The file never passes through Node, so there is no memory pressure, no request timeout on a large upload, and your server does one cheap call instead.',
        hi: 'Client ko seedha object storage pe upload karne do, us URL se jise tumhara server sign karta hai. File Node se guzarti hi nahi, toh na memory ka bojh, na bade upload pe request timeout, aur tumhara server ek sasti call karta hai.',
      },
      code: `const url = await s3.getSignedUrl('putObject', { Bucket, Key, Expires: 60 });
res.json({ url });      // the browser PUTs the file straight to S3`,
    },
    {
      heading: { en: 'And handle multer errors explicitly', hi: 'Aur multer ke errors saaf sambhaalo' },
      body: {
        en: 'A file over the limit produces a MulterError with code LIMIT_FILE_SIZE. Without a check for it the client gets a 500 for what is really a 413, and no indication of what went wrong.',
        hi: 'Seema se badi file MulterError deti hai jiska code LIMIT_FILE_SIZE hota hai. Uske check ke bina client ko 500 milta hai jo asal mein 413 hai, aur kya galat hua iska koi ishara nahi.',
      },
      code: `if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
  return res.status(413).json({ error: 'File too large' });
}`,
    },
  ],

  /* ─── Responses, operations and production concerns ───────── */

  'What is the difference between res.send, res.json, and res.end?': [
    {
      heading: { en: 'Three levels of convenience', hi: 'Suvidha ke teen star' },
      body: {
        en: 'res.end is the raw Node method and sets nothing. res.send is Express and infers the content type from what you pass. res.json always serialises to JSON and always sets application/json.',
        hi: 'res.end kachcha Node method hai aur kuch set nahi karta. res.send Express ka hai aur tumhare diye se content type khud nikaal leta hai. res.json hamesha JSON banata hai aur hamesha application/json set karta hai.',
      },
      diagram: `res.end()     no Content-Type, no serialisation   — raw Node
res.send()    infers the type, sets Content-Length  — Express
res.json()    always JSON, always application/json  — Express`,
    },
    {
      heading: { en: 'res.send guesses from the argument', hi: 'res.send argument se andaaza lagata hai' },
      body: {
        en: 'A string becomes text/html, a Buffer becomes application/octet-stream, and an object or array is passed to res.json. That inference is convenient and occasionally surprising — a string of JSON is sent as HTML.',
        hi: 'String text/html ban jaati hai, Buffer application/octet-stream, aur object ya array res.json ko chala jaata hai. Ye andaaza suvidhajanak hai aur kabhi chaunkane wala — JSON ki string HTML ban kar jaati hai.',
      },
      code: `res.send('hello');           // Content-Type: text/html
res.send({ ok: true });       // application/json — calls res.json
res.send(JSON.stringify(o));  // ✗ text/html, not JSON`,
    },
    {
      heading: { en: 'res.json is the one to use for an API', hi: 'API ke liye res.json hi lena chahiye' },
      body: {
        en: 'It states the intent, always sets the right header, and applies your json replacer and spaces settings. It also handles null correctly, where res.send(null) sends an empty body.',
        hi: 'Ye mansha batata hai, hamesha sahi header lagata hai, aur tumhari json replacer aur spaces settings maanta hai. Wo null bhi theek sambhaalta hai, jabki res.send(null) khaali body bhejta hai.',
      },
      code: `res.json(null);      // 'null'
res.send(null);       // an empty body`,
    },
    {
      heading: { en: 'res.end sends nothing extra', hi: 'res.end kuch extra nahi bhejta' },
      body: {
        en: 'No Content-Type, no Content-Length, no ETag. It is right when there is genuinely no body — a 204, or the end of a stream you have been writing to manually.',
        hi: 'Na Content-Type, na Content-Length, na ETag. Ye tab sahi hai jab sach mein koi body na ho — 204, ya us stream ka ant jisme tum khud likh rahe the.',
      },
      code: `res.status(204).end();       // ✓ no content
res.sendStatus(204);          // ✓ the Express shorthand`,
    },
    {
      heading: { en: 'All three end the cycle', hi: 'Teeno cycle khatam karte hain' },
      body: {
        en: 'After any of them the response is committed. Calling a second one, or calling next afterwards, produces "Cannot set headers after they are sent". Always return when you send inside a conditional.',
        hi: 'Inme se kisi ke baad response tay ho jaata hai. Doosra bulao, ya uske baad next bulao, toh "Cannot set headers after they are sent" milta hai. Shart ke andar bhejo toh hamesha return karo.',
      },
    },
    {
      heading: { en: 'And the related helpers', hi: 'Aur jude hue helpers' },
      body: {
        en: 'res.sendStatus sets the code and sends its text. res.sendFile streams a file with the right headers. res.redirect sets Location and a 302. Knowing these avoids hand-rolling them with end.',
        hi: 'res.sendStatus code set karke uska text bhej deta hai. res.sendFile file ko sahi headers ke saath stream karta hai. res.redirect Location aur 302 set karta hai. Ye jaan lo toh inhe end se khud banane ki zaroorat nahi.',
      },
    },
  ],

  'How do you implement rate limiting in Express?': [
    {
      heading: { en: 'Cap how many requests a client may make', hi: 'Client kitni requests kar sakta hai, wo seemit karo' },
      body: {
        en: 'Rate limiting protects against brute force, scraping and accidental client loops. The middleware counts requests per key in a window and responds 429 once the limit is passed.',
        hi: 'Rate limiting brute force, scraping aur galti se hone wale client loops se bachaati hai. Middleware ek window mein har key ki requests ginta hai aur seema paar hote hi 429 deta hai.',
      },
      code: `import rateLimit from 'express-rate-limit';

app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
}));`,
    },
    {
      heading: { en: 'The default store does not survive scale', hi: 'Default store scale pe nahi tikta' },
      body: {
        en: 'It counts in memory, per process. Two cluster workers or two containers each allow the full limit, so the real limit is the number you set times the number of instances. Use a shared Redis store.',
        hi: 'Wo memory mein ginta hai, har process ka apna. Do cluster workers ya do containers har ek poori seema deta hai, toh asli seema tumhara number guna instances ki ginti hai. Saanjha Redis store lo.',
      },
      code: `store: new RedisStore({ sendCommand: (...args) => client.sendCommand(args) })`,
    },
    {
      heading: { en: 'Choose the key deliberately', hi: 'Key soch kar chuno' },
      body: {
        en: 'Keying on IP punishes everyone behind a corporate NAT or a mobile carrier and is trivially bypassed with a proxy pool. For authenticated routes key on the user id; keep IP for login and signup where there is no user yet.',
        hi: 'IP pe key karna corporate NAT ya mobile carrier ke peeche baithe sabko saza deta hai aur proxy pool se aasaani se bypass ho jaata hai. Authenticated routes pe user id se key karo; login aur signup pe IP rakho jahan abhi user hai hi nahi.',
      },
      code: `keyGenerator: (req) => req.user?.id ?? ipKeyGenerator(req),`,
    },
    {
      heading: { en: 'Different limits for different routes', hi: 'Alag routes pe alag seemayein' },
      body: {
        en: 'A single global limit is either too loose for login or too tight for browsing. Apply a strict limiter to authentication endpoints and a generous one to reads.',
        hi: 'Ek hi global seema ya toh login ke liye dheeli hai ya browsing ke liye tang. Authentication endpoints pe sakht limiter lagao aur reads pe udaar.',
      },
      code: `app.use('/api/auth/login', rateLimit({ windowMs: 9e5, limit: 5 }));
app.use('/api', rateLimit({ windowMs: 9e5, limit: 1000 }));`,
    },
    {
      heading: { en: 'trust proxy has to be right', hi: 'trust proxy sahi hona chahiye' },
      body: {
        en: 'Behind a load balancer, req.ip is the proxy address unless trust proxy is configured, so every client shares one bucket and the limiter effectively blocks everyone at once. Setting it to true blindly is the opposite bug — a client can then spoof the header.',
        hi: 'Load balancer ke peeche req.ip proxy ka address hota hai jab tak trust proxy set na ho, toh har client ek hi bucket mein aa jaata hai aur limiter sabko ek saath rok deta hai. Usse aankh band karke true karna ulta bug hai — phir client header nakli bana sakta hai.',
      },
      code: `app.set('trust proxy', 1);      // ✓ number of proxies, not true`,
    },
    {
      heading: { en: 'Respond properly, and tell the client when to retry', hi: 'Theek jawab do, aur batao dobara kab try karein' },
      body: {
        en: 'A 429 with a Retry-After header lets a well-behaved client back off instead of hammering. The standard RateLimit headers also let it self-regulate before hitting the limit.',
        hi: 'Retry-After header wala 429 kisi samajhdaar client ko peeche hatne deta hai, baar-baar maarne ki jagah. Standard RateLimit headers usse seema tak pahunchne se pehle hi sambhalne dete hain.',
      },
    },
    {
      heading: { en: 'And do it at the edge where you can', hi: 'Aur jahan ho sake edge pe karo' },
      body: {
        en: 'A limiter in Express still costs you a request that reaches Node. Cloudflare, an API gateway or nginx can reject it before it ever gets there, which matters under an actual attack. Application-level limiting is a second layer, not the only one.',
        hi: 'Express ka limiter phir bhi ek request Node tak pahunchne deta hai. Cloudflare, API gateway ya nginx usse pahunchne se pehle hi mana kar sakte hain, jo asli hamle mein maayne rakhta hai. Application star ki limiting doosri layer hai, ek hi nahi.',
      },
    },
  ],

  'What is compression middleware and when does it help?': [
    {
      heading: { en: 'It gzips the response body', hi: 'Ye response body ko gzip karta hai' },
      body: {
        en: 'The middleware checks the client\'s Accept-Encoding header, compresses the body if it is supported, and sets Content-Encoding. A JSON response typically shrinks by seventy to ninety per cent.',
        hi: 'Middleware client ka Accept-Encoding header dekhta hai, support ho toh body compress karta hai, aur Content-Encoding set karta hai. JSON response aam taur pe sattar se nabbe pratishat chhota ho jaata hai.',
      },
      code: `import compression from 'compression';
app.use(compression());      // mount before any route that responds`,
    },
    {
      heading: { en: 'It trades CPU for bandwidth', hi: 'Ye CPU de kar bandwidth leta hai' },
      body: {
        en: 'That is the whole judgement call. Compression happens on your single thread, so it costs CPU on every response. On a slow mobile connection the saving is enormous; on a fast local network it can be a net loss.',
        hi: 'Poora faisla yahi hai. Compression tumhare akele thread pe hota hai, toh har response pe CPU lagta hai. Dheeme mobile connection pe bachat bahut badi hai; tez local network pe ye nuksaan bhi ho sakta hai.',
      },
    },
    {
      heading: { en: 'It skips small responses by default', hi: 'Ye default se chhote responses chhod deta hai' },
      body: {
        en: 'Below the threshold — one kilobyte by default — compressing costs more than it saves and can even make the payload larger. The middleware already handles this, which is why you rarely need to configure it.',
        hi: 'Seema se neeche — default ek kilobyte — compress karna bachat se zyada kharch karta hai aur payload bada bhi kar sakta hai. Middleware ye pehle se sambhaalta hai, isiliye isse set karne ki zaroorat kam hi padti hai.',
      },
    },
    {
      heading: { en: 'Never compress what is already compressed', hi: 'Jo pehle se compressed hai usse mat karo' },
      body: {
        en: 'Images, video, and zip or gzip files gain nothing and just burn CPU. The middleware checks the content type and skips them — which is another reason not to hand-roll this.',
        hi: 'Images, video, aur zip ya gzip files se kuch nahi milta, bas CPU jalta hai. Middleware content type dekh kar unhe chhod deta hai — aur isse khud na banane ki ek aur wajah yahi hai.',
      },
    },
    {
      heading: { en: 'It breaks server-sent events unless you flush', hi: 'Flush na karo toh ye server-sent events tod deta hai' },
      body: {
        en: 'A real gotcha. Compression buffers output, so an SSE stream or a progressive response stops arriving in real time. Either disable it for that route or call res.flush after each chunk.',
        hi: 'Ek asli jaal. Compression output buffer karta hai, toh SSE stream ya dhire-dhire jaane wala response real time mein aana band kar deta hai. Ya toh us route pe isse band karo ya har chunk ke baad res.flush bulao.',
      },
      code: `app.use(compression({ filter: (req, res) =>
  res.getHeader('Content-Type') !== 'text/event-stream' }));`,
    },
    {
      heading: { en: 'And the proxy usually does it better', hi: 'Aur proxy aam taur pe ye behtar karta hai' },
      body: {
        en: 'nginx, a CDN or a load balancer can compress without using your Node thread, and can offer brotli, which beats gzip. If you have one in front, compressing in Express is duplicated work — say this, it is the operational answer.',
        hi: 'nginx, CDN ya load balancer bina tumhara Node thread use kiye compress kar sakte hain, aur brotli de sakte hain, jo gzip se behtar hai. Aage koi ho toh Express mein compress karna dohra kaam hai — ye kaho, yahi operational jawab hai.',
      },
    },
  ],

  'How do you serve a single-page application from Express?': [
    {
      heading: { en: 'Static files, then a catch-all to index.html', hi: 'Static files, phir index.html pe catch-all' },
      body: {
        en: 'The SPA router runs in the browser, so a direct visit to /dashboard must still return index.html and let the client route from there. Serve the build directory, then fall back for anything not matched.',
        hi: 'SPA ka router browser mein chalta hai, toh seedha /dashboard kholne pe bhi index.html hi milna chahiye aur route client karega. Build directory do, phir jo match na ho uske liye fallback rakho.',
      },
      code: `app.use(express.static(dist));
app.get('/*splat', (req, res) => res.sendFile(path.join(dist, 'index.html')));`,
    },
    {
      heading: { en: 'The API must be mounted first', hi: 'API pehle lagni chahiye' },
      body: {
        en: 'Order decides everything. A catch-all registered before the API routes swallows them and every API call returns HTML — which shows up as a confusing JSON parse error in the client.',
        hi: 'Order hi sab tay karta hai. API routes se pehle laga catch-all unhe nigal leta hai aur har API call HTML deta hai — jo client mein uljhane wale JSON parse error ki tarah dikhta hai.',
      },
      code: `app.use('/api', apiRoutes);     // ✓ first
app.use(express.static(dist));
app.get('/*splat', spaFallback);  // ✓ last`,
    },
    {
      heading: { en: 'Return a real 404 for unknown API routes', hi: 'Anjaan API routes pe asli 404 do' },
      body: {
        en: 'Without a 404 handler under /api, an unknown endpoint falls through to the SPA fallback and returns HTML with a 200. That is a genuinely confusing bug to debug from the client side.',
        hi: '/api ke neeche 404 handler na ho toh anjaan endpoint SPA fallback tak pahunch jaata hai aur 200 ke saath HTML deta hai. Client se ye bug debug karna sach mein uljhan bhara hota hai.',
      },
      code: `app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));`,
    },
    {
      heading: { en: 'Cache assets hard, never index.html', hi: 'Assets khoob cache karo, index.html kabhi nahi' },
      body: {
        en: 'Build output has hashed filenames, so it can be cached for a year and served immutable. index.html references those hashes, so caching it means users keep loading the old bundle after a deploy.',
        hi: 'Build ke output mein hash wale filenames hote hain, toh usse saal bhar cache aur immutable kiya ja sakta hai. index.html unhi hashes ka zikr karta hai, toh usse cache karna matlab deploy ke baad bhi users purana bundle load karte rahenge.',
      },
      code: `app.use('/assets', express.static(path.join(dist, 'assets'), {
  maxAge: '1y', immutable: true,
}));
// index.html served with no-cache`,
    },
    {
      heading: { en: 'Express 5 changed the wildcard syntax', hi: 'Express 5 ne wildcard syntax badli' },
      body: {
        en: 'The bare asterisk no longer works — a wildcard must be named. This is the single most common thing that breaks when upgrading an SPA server to Express 5.',
        hi: 'Khaali asterisk ab nahi chalta — wildcard ko naam dena zaroori hai. SPA server ko Express 5 pe le jaate waqt sabse aam yahi cheez toot ti hai.',
      },
      code: `app.get('*', handler);          // ✗ Express 5
app.get('/*splat', handler);     // ✓`,
    },
    {
      heading: { en: 'And in production a CDN should do this', hi: 'Aur production mein ye CDN ko karna chahiye' },
      body: {
        en: 'Node is a poor static file server compared with a CDN or nginx, and serving the SPA from Express means every asset request occupies your event loop. Put the build on a CDN and let Express handle only the API.',
        hi: 'CDN ya nginx ke saamne Node kamzor static file server hai, aur Express se SPA dena matlab har asset request tumhara event loop ghere. Build CDN pe rakho aur Express ko sirf API sambhalne do.',
      },
    },
  ],

  'What is the trust proxy setting and why does it matter?': [
    {
      heading: { en: 'It tells Express to believe the forwarding headers', hi: 'Ye Express se kehta hai ki forwarding headers maano' },
      body: {
        en: 'Behind a load balancer or reverse proxy, the TCP connection comes from the proxy, not the client. The real client details are in X-Forwarded-For, X-Forwarded-Proto and X-Forwarded-Host. trust proxy makes Express read them.',
        hi: 'Load balancer ya reverse proxy ke peeche TCP connection proxy se aata hai, client se nahi. Asli client ki jaankari X-Forwarded-For, X-Forwarded-Proto aur X-Forwarded-Host mein hoti hai. trust proxy Express se unhe padhwata hai.',
      },
      code: `app.set('trust proxy', 1);      // trust one proxy in front`,
    },
    {
      heading: { en: 'What it changes', hi: 'Ye kya badalta hai' },
      body: {
        en: 'req.ip becomes the client address rather than the proxy. req.protocol becomes https when the proxy terminated TLS. req.hostname uses the forwarded host. And req.secure becomes true, which several middlewares depend on.',
        hi: 'req.ip proxy ki jagah client ka address ban jaata hai. Proxy ne TLS khatam kiya ho toh req.protocol https ho jaata hai. req.hostname forwarded host use karta hai. Aur req.secure true ho jaata hai, jispe kai middlewares depend karte hain.',
      },
      diagram: `client 203.0.113.5 → proxy 10.0.0.1 → Express

trust proxy off   req.ip = '10.0.0.1'      ✗ everyone looks the same
trust proxy on    req.ip = '203.0.113.5'   ✓`,
    },
    {
      heading: { en: 'Why it matters: rate limiting', hi: 'Ye kyun maayne rakhta hai: rate limiting' },
      body: {
        en: 'With it off, every request appears to come from the proxy, so an IP-based limiter puts all users in one bucket and blocks everyone the moment the limit is reached. This is the most common symptom of getting it wrong.',
        hi: 'Isse band rakho toh har request proxy se aati dikhti hai, toh IP wala limiter sabko ek bucket mein daal deta hai aur seema aate hi sabko rok deta hai. Isse galat rakhne ka sabse aam lakshan yahi hai.',
      },
    },
    {
      heading: { en: 'And secure cookies', hi: 'Aur secure cookies' },
      body: {
        en: 'A session cookie with secure true is only set when Express thinks the connection is HTTPS. Behind a TLS-terminating proxy, req.secure is false without this setting, so the cookie is silently never set and login appears to do nothing.',
        hi: 'secure true wali session cookie tabhi set hoti hai jab Express ko lage ki connection HTTPS hai. TLS khatam karne wale proxy ke peeche is setting ke bina req.secure false hota hai, toh cookie chup-chaap set hi nahi hoti aur login kuch karta hua nahi dikhta.',
      },
    },
    {
      heading: { en: 'Do not set it to true blindly', hi: 'Isse aankh band karke true mat karo' },
      body: {
        en: 'true trusts the header from ANY source, so a client can send its own X-Forwarded-For and spoof its IP — defeating rate limiting, IP allowlists and audit logs. Set the number of proxies you actually have, or a specific subnet.',
        hi: 'true KISI BHI jagah se aaya header maan leta hai, toh client apna X-Forwarded-For bhej kar apni IP nakli bana sakta hai — rate limiting, IP allowlists aur audit logs sab bekaar. Jitne proxies sach mein hain wo number do, ya koi khaas subnet.',
      },
      code: `app.set('trust proxy', true);          // ✗ spoofable
app.set('trust proxy', 1);              // ✓ one proxy
app.set('trust proxy', 'loopback, 10.0.0.0/8');   // ✓ specific`,
    },
    {
      heading: { en: 'The number means hops, counted from the right', hi: 'Number hops hai, daayein se gina hua' },
      body: {
        en: 'X-Forwarded-For is a comma-separated chain that each proxy appends to. Setting 1 takes the last entry, 2 takes the second from the end. Getting the count wrong picks the wrong address, which is worse than not trusting at all.',
        hi: 'X-Forwarded-For ek comma wali chain hai jisme har proxy jodta jaata hai. 1 aakhri entry leta hai, 2 aakhir se doosri. Ginti galat hui toh galat address chun liya jaata hai, jo bharosa na karne se bhi bura hai.',
      },
    },
  ],

  'How do you log requests in Express?': [
    {
      heading: { en: 'Middleware that records every request', hi: 'Middleware jo har request likhta hai' },
      body: {
        en: 'Mount a logger early so it sees everything, including requests that error. pino-http and morgan are the two common choices — pino for structured JSON, morgan for human-readable development output.',
        hi: 'Logger jaldi lagao taaki wo sab kuch dekhe, error wali requests bhi. pino-http aur morgan do aam chunav hain — structured JSON ke liye pino, development ke padhne laayak output ke liye morgan.',
      },
      code: `app.use(pinoHttp({ logger }));      // structured, production
app.use(morgan('dev'));               // colourful, local`,
    },
    {
      heading: { en: 'Log structured JSON in production', hi: 'Production mein structured JSON log karo' },
      body: {
        en: 'A log aggregator can filter and alert on fields, not on a text line. One JSON object per request with method, path, status and duration is searchable; a formatted string is not.',
        hi: 'Log aggregator fields pe filter aur alert kar sakta hai, kisi text line pe nahi. Har request ka ek JSON object jisme method, path, status aur duration ho — wo dhoondha ja sakta hai; formatted string nahi.',
      },
      code: `{"level":30,"method":"GET","url":"/api/users","status":200,
 "responseTime":12,"reqId":"01H…"}`,
    },
    {
      heading: { en: 'Attach a request id and propagate it', hi: 'Ek request id lagao aur usse aage bhejo' },
      body: {
        en: 'Without one you cannot tie a database warning to the request that caused it. Generate an id per request, put it in every log line, and return it in a header so a user reporting a bug can quote it.',
        hi: 'Iske bina tum kisi database warning ko us request se nahi jod sakte jisne usse karwaya. Har request pe ek id banao, har log line mein daalo, aur ek header mein wapas bhejo taaki bug batane wala user usse bata sake.',
      },
      code: `app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  res.setHeader('X-Request-Id', req.id);
  next();
});`,
    },
    {
      heading: { en: 'Redact anything sensitive', hi: 'Sanvedansheel cheezein redact karo' },
      body: {
        en: 'The most common real-world secret leak is a logger, not an attacker. Never log a whole request or config object — redact the Authorization header, cookies, passwords and tokens by path.',
        hi: 'Asli duniya mein secret leak ki sabse aam wajah logger hoti hai, hamlavar nahi. Poori request ya config object kabhi log mat karo — Authorization header, cookies, passwords aur tokens ko path se redact karo.',
      },
      code: `pino({ redact: ['req.headers.authorization', 'req.headers.cookie',
                '*.password', '*.token'] });`,
    },
    {
      heading: { en: 'Log to stdout, not to a file', hi: 'File nahi, stdout pe log karo' },
      body: {
        en: 'In a container the platform collects stdout. Writing to a file means rotation you have to manage, disk you can fill, and logs that vanish when the container is replaced.',
        hi: 'Container mein platform stdout uthata hai. File mein likhna matlab rotation tumhe sambhalna, disk tum bhar sakte ho, aur container badalte hi logs gaayab.',
      },
    },
    {
      heading: { en: 'Sample high-volume paths', hi: 'Zyada traffic wale paths sample karo' },
      body: {
        en: 'A health check hit every second by a load balancer produces most of your log volume and none of the value. Skip it, and consider sampling successful requests on very high-traffic routes while keeping every error.',
        hi: 'Load balancer har second jo health check maarta hai wo tumhare zyadatar logs banata hai aur fayda kuch nahi. Usse chhod do, aur bahut traffic wale routes pe safal requests sample karne pe socho, jabki har error rakho.',
      },
      code: `pinoHttp({ autoLogging: { ignore: (req) => req.url === '/health' } });`,
    },
    {
      heading: { en: 'And logging is not tracing', hi: 'Aur logging tracing nahi hai' },
      body: {
        en: 'Logs tell you what happened in one service. When a request crosses three services you need distributed tracing — OpenTelemetry with a trace id propagated in headers. Naming that shows you have debugged something real.',
        hi: 'Logs batate hain ek service mein kya hua. Jab ek request teen services se guzarti hai tab distributed tracing chahiye — OpenTelemetry, aur headers mein aage jaati ek trace id. Iska naam lena dikhata hai ki tumne kuch asli debug kiya hai.',
      },
    },
  ],

  'How do you test an Express application?': [
    {
      heading: { en: 'Export the app without listening', hi: 'App export karo, listen kiye bina' },
      body: {
        en: 'This one structural choice is what makes everything else possible. supertest can drive the app object directly on an ephemeral port, so tests need no fixed port and can run in parallel.',
        hi: 'Yahi ek dhaanchagat faisla baaki sab mumkin banata hai. supertest app object ko seedha kisi bhi khaali port pe chala sakta hai, toh tests ko tay port nahi chahiye aur wo saath-saath chal sakte hain.',
      },
      code: `// app.js exports the app;  server.js calls listen

import request from 'supertest';
import { app } from '../app.js';

const res = await request(app).get('/api/users').expect(200);`,
    },
    {
      heading: { en: 'Test through HTTP, not by calling handlers', hi: 'Handlers bulane ki jagah HTTP se test karo' },
      body: {
        en: 'Calling a handler with fake req and res objects skips the middleware — routing, body parsing, auth, validation and error handling all go untested. Driving it over HTTP exercises the real pipeline.',
        hi: 'Nakli req aur res se handler bulana middleware chhod deta hai — routing, body parsing, auth, validation aur error handling sab bina test ke reh jaate hain. HTTP se chalane pe asli pipeline chalti hai.',
      },
      code: `await request(app)
  .post('/api/users')
  .send({ name: 'Asha' })
  .expect(201)
  .expect('Content-Type', /json/);`,
    },
    {
      heading: { en: 'Mock at the boundary, not in the middle', hi: 'Boundary pe mock karo, beech mein nahi' },
      body: {
        en: 'Stub the outbound HTTP calls with Mock Service Worker and use a real test database. Mocking your own service layer couples the test to the implementation and stops testing the integration you care about.',
        hi: 'Bahar jaane wali HTTP calls ko Mock Service Worker se stub karo aur asli test database lo. Apni service layer mock karna test ko implementation se baandh deta hai aur wahi integration test karna band kar deta hai jiski fikr hai.',
      },
    },
    {
      heading: { en: 'Use a real database, isolated per run', hi: 'Asli database lo, har run alag' },
      body: {
        en: 'Testcontainers or a dedicated test database gives you real query behaviour, real constraints and real transactions. An in-memory fake passes tests that then fail in production because the SQL was never actually valid.',
        hi: 'Testcontainers ya ek alag test database asli query behaviour, asli constraints aur asli transactions deta hai. Memory wala nakli database aise tests paas kar deta hai jo production mein fail hote hain kyunki SQL kabhi sach mein valid tha hi nahi.',
      },
    },
    {
      heading: { en: 'Test the paths people forget', hi: 'Wo raaste test karo jo log bhool jaate hain' },
      body: {
        en: 'A 401 without a token, a 403 with the wrong role, a 400 for invalid input, a 404 for a missing record, and the error handler itself. The happy path is the easy half and the one least likely to break.',
        hi: 'Bina token ke 401, galat role pe 403, galat input pe 400, na milne wale record pe 404, aur khud error handler. Sahi wala raasta aasaan hissa hai aur usi ke tootne ki sambhavna sabse kam hai.',
      },
      code: `await request(app).get('/api/admin').expect(401);
await request(app).get('/api/admin').set('Authorization', userToken).expect(403);`,
    },
    {
      heading: { en: 'Middleware can be unit tested directly', hi: 'Middleware ko seedha unit test kar sakte ho' },
      body: {
        en: 'For a small pure middleware, calling it with a stub req, res and next and asserting on what it did is faster than a full HTTP round trip. Use this for the auth check and the validator; use supertest for the routes.',
        hi: 'Chhote pure middleware ke liye usse stub req, res aur next ke saath bulana aur nateeja jaanchna poore HTTP chakkar se tez hai. Auth check aur validator ke liye ye lo; routes ke liye supertest.',
      },
    },
    {
      heading: { en: 'And Node has a test runner built in', hi: 'Aur Node mein test runner built-in hai' },
      body: {
        en: 'node:test with node:assert needs no dependency at all, and --watch reruns on change. Vitest or Jest are still common for the ecosystem, but knowing the built-in exists is worth mentioning.',
        hi: 'node:test aur node:assert ko koi dependency nahi chahiye, aur --watch badlaav pe dobara chala deta hai. Ecosystem ke liye Vitest ya Jest aaj bhi aam hain, par built-in ka hona jaanna batane laayak hai.',
      },
      code: `node --test --watch`,
    },
  ],

  'What is the difference between req.params, req.query, and req.body?': [
    {
      heading: { en: 'Three different parts of the request', hi: 'Request ke teen alag hisse' },
      body: {
        en: 'params comes from named segments in the path, query from the string after the question mark, and body from the request payload. Knowing which is which is knowing where the data physically travelled.',
        hi: 'params path ke naam wale hisson se aata hai, query sawaaliya nishaan ke baad wali string se, aur body request ke payload se. Kaunsa kya hai ye jaanna matlab ye jaanna ki data asal mein kahan se aaya.',
      },
      code: `// POST /users/42/posts?draft=true   { "title": "Hello" }

req.params;      // { id: '42' }        from the path
req.query;       // { draft: 'true' }    from the query string
req.body;        // { title: 'Hello' }   from the payload`,
    },
    {
      heading: { en: 'Only body needs middleware', hi: 'Sirf body ko middleware chahiye' },
      body: {
        en: 'Express populates params from the route pattern and query from the URL automatically. body is undefined until you mount express.json or express.urlencoded — which is the single most common cause of an undefined req.body.',
        hi: 'Express params ko route pattern se aur query ko URL se apne aap bharta hai. body tab tak undefined hai jab tak express.json ya express.urlencoded na lagao — aur req.body undefined hone ki sabse aam wajah yahi hai.',
      },
    },
    {
      heading: { en: 'params and query are always strings', hi: 'params aur query hamesha strings hain' },
      body: {
        en: 'A URL carries no types, so an id is "42" and a flag is "true". body can carry real types when it is JSON, so a number stays a number. That asymmetry is where a comparison silently fails.',
        hi: 'URL mein types hote hi nahi, toh id "42" hai aur flag "true". body JSON ho toh asli types le ja sakti hai, toh number number hi rehta hai. Isi asantulan mein koi comparison chup-chaap fail ho jaata hai.',
      },
      code: `req.params.id === 42;        // false — it is '42'
Number(req.params.id) === 42;  // true`,
    },
    {
      heading: { en: 'Use each for what it means', hi: 'Har ek ko uske matlab ke hisaab se lo' },
      body: {
        en: 'params identify WHICH resource. query modifies HOW you want it — filter, sort, page. body carries the DATA you are sending. Following that split is most of good API design, and it makes URLs predictable.',
        hi: 'params batate hain KAUNSA resource. query batati hai KAISE chahiye — filter, sort, page. body wo DATA le jaati hai jo tum bhej rahe ho. Is baant ko maanna hi achhe API design ka zyadatar hissa hai, aur isse URLs andaaze laayak rehte hain.',
      },
    },
    {
      heading: { en: 'All three are untrusted input', hi: 'Teeno bina bharose wala input hain' },
      body: {
        en: 'People validate the body and forget the other two. A page size from the query can be a million, and an id from params goes straight into a database call. Validate all three at the boundary.',
        hi: 'Log body validate karte hain aur baaki do bhool jaate hain. Query se aaya page size das lakh ho sakta hai, aur params se aayi id seedha database call mein jaati hai. Teeno ko boundary pe validate karo.',
      },
    },
    {
      heading: { en: 'And req.query is read-only in Express 5', hi: 'Aur Express 5 mein req.query sirf-padhne wali hai' },
      body: {
        en: 'It became a lazily computed getter, so assigning to it throws. Middleware that used to normalise the query has to store the result elsewhere — a small but real breaking change when upgrading.',
        hi: 'Ye zaroorat pe banne wala getter ban gayi hai, toh usme assign karna error deta hai. Jo middleware pehle query ko theek karta tha usse nateeja kahin aur rakhna padega — upgrade karte waqt ek chhota par asli badlaav.',
      },
    },
  ],

  'How do you handle 404s in Express?': [
    {
      heading: { en: 'A catch-all middleware after every route', hi: 'Har route ke baad ek catch-all middleware' },
      body: {
        en: 'A request that matches no route falls through the whole stack. Mount a plain middleware with no path at the end and it receives exactly those requests.',
        hi: 'Jo request kisi route se match na kare wo poore stack se nikal jaati hai. Aakhir mein bina path ka ek saada middleware lagao aur usse theek wahi requests milengi.',
      },
      code: `app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});`,
    },
    {
      heading: { en: 'Placement is the whole trick', hi: 'Poori chaal jagah ki hai' },
      body: {
        en: 'Before the routes it answers everything and nothing else runs. After the error handler it never runs at all. It goes after all routes and before the error handler — exactly one position works.',
        hi: 'Routes se pehle rakho toh wo sab kuch jawab de deta hai aur aur kuch chalta hi nahi. Error handler ke baad rakho toh wo kabhi chalta hi nahi. Ye saare routes ke baad aur error handler se pehle jaata hai — bilkul ek hi jagah chalti hai.',
      },
    },
    {
      heading: { en: 'Without one you get Express default HTML', hi: 'Iske bina Express ka default HTML milta hai' },
      body: {
        en: 'The built-in handler sends an HTML page saying "Cannot GET /x", which is wrong for an API — a client expecting JSON gets a parse error instead of a clear 404, and in development it also leaks a stack trace.',
        hi: 'Built-in handler ek HTML page bhejta hai jisme likha hota hai "Cannot GET /x", jo API ke liye galat hai — JSON ki ummeed karta client saaf 404 ki jagah parse error paata hai, aur development mein wo stack trace bhi dikha deta hai.',
      },
    },
    {
      heading: { en: 'Route-level 404 versus resource 404', hi: 'Route wala 404 vs resource wala 404' },
      body: {
        en: 'Two different things. No matching route is a routing 404. A matching route where the record does not exist is a resource 404, and that one is returned from the handler — usually by throwing an error the error handler turns into a 404.',
        hi: 'Do alag cheezein. Koi route match na ho toh routing wala 404. Route match ho par record na ho toh resource wala 404, aur wo handler se aata hai — aam taur pe aisa error phenk kar jise error handler 404 bana de.',
      },
      code: `const user = await db.users.find(id);
if (!user) throw new HttpError(404, 'User not found');`,
    },
    {
      heading: { en: 'Scope it per area when you serve an SPA', hi: 'SPA ho toh har hisse ke liye alag rakho' },
      body: {
        en: 'A global catch-all that returns index.html would swallow unknown API routes and return HTML with a 200. Mount a JSON 404 under /api first, then the SPA fallback for everything else.',
        hi: 'index.html dene wala global catch-all anjaan API routes ko nigal lega aur 200 ke saath HTML dega. Pehle /api ke neeche JSON wala 404 lagao, phir baaki sab ke liye SPA fallback.',
      },
      code: `app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));
app.get('/*splat', (req, res) => res.sendFile(indexHtml));`,
    },
    {
      heading: { en: 'Keep the error shape consistent', hi: 'Error ka roop ek jaisa rakho' },
      body: {
        en: 'A 404 should look like every other error your API returns, so a client can handle all of them with one code path. Routing the 404 through the same error handler is the cleanest way to guarantee that.',
        hi: 'Tumhari API jo baaki errors deti hai, 404 bhi waisa hi dikhna chahiye, taaki client sabko ek hi tarike se sambhaale. 404 ko usi error handler se guzaarna iski sabse saaf guarantee hai.',
      },
      code: `app.use((req, res, next) => next(new HttpError(404, 'Not found')));
app.use(errorHandler);      // one shape for every error`,
    },
  ],

  'What are the main differences in Express 5?': [
    {
      heading: { en: 'Async errors are handled automatically', hi: 'Async errors apne aap sambhale jaate hain' },
      body: {
        en: 'The headline change, and the one that removes the framework\'s worst footgun. A rejected promise returned from a handler is forwarded to the error handler, so no more wrapper and no more hanging requests.',
        hi: 'Mukhya badlaav, aur wahi jo framework ki sabse buri galti hataata hai. Handler se aayi rejected promise error handler tak pahunch jaati hai, toh na wrapper chahiye na requests latakti hain.',
      },
      code: `app.get('/x', async (req, res) => {
  throw new Error('boom');      // Express 4: hangs.  Express 5: handled.
});`,
    },
    {
      heading: { en: 'Path matching syntax changed', hi: 'Path matching ki syntax badli' },
      body: {
        en: 'The most likely thing to break on upgrade. The bare wildcard is gone and must be named, optional parameters use braces instead of a trailing question mark, and regex characters in a path string are no longer interpreted.',
        hi: 'Upgrade pe sabse zyada yahi tootne wala hai. Khaali wildcard chala gaya aur usse naam dena zaroori hai, optional parameters aakhir wale sawaaliya nishaan ki jagah braces se bante hain, aur path string ke regex characters ab nahi samjhe jaate.',
      },
      code: `'*'          → '/*splat'
'/user/:id?'  → '/user{/:id}'`,
    },
    {
      heading: { en: 'req.query is now a getter', hi: 'req.query ab ek getter hai' },
      body: {
        en: 'It is computed lazily and read-only, so middleware that rewrote req.query throws. Store the normalised value somewhere else — req.validated is the usual convention.',
        hi: 'Wo zaroorat pe banti hai aur sirf-padhne wali hai, toh jo middleware req.query badalta tha wo error deta hai. Theek ki hui value kahin aur rakho — aam riwaaj req.validated hai.',
      },
    },
    {
      heading: { en: 'Removed methods and signatures', hi: 'Hataye gaye methods aur signatures' },
      body: {
        en: 'res.send with a status number, res.json(status, body), res.sendfile in lower case, app.del and req.param are all gone. They were deprecated for years, and their removal is mostly a find-and-replace.',
        hi: 'Status number wala res.send, res.json(status, body), chhote akshar wala res.sendfile, app.del aur req.param — sab hat gaye. Ye saalon se deprecated the, aur inhe hataana zyadatar dhoondho-aur-badlo hai.',
      },
      code: `res.send(404, 'x');       → res.status(404).send('x');
res.json(200, obj);        → res.status(200).json(obj);`,
    },
    {
      heading: { en: 'Body parsing is stricter', hi: 'Body parsing zyada sakht hai' },
      body: {
        en: 'urlencoded now defaults to extended false rather than true, and a malformed body produces a clearer error. Small changes, but they can alter the shape of req.body in an app that relied on nested form syntax.',
        hi: 'urlencoded ab default se extended false hai, true nahi, aur kharaab body pe saaf error aata hai. Chhote badlaav hain, par nested form syntax pe nirbhar app mein req.body ka roop badal sakte hain.',
      },
    },
    {
      heading: { en: 'It requires Node 18 or later', hi: 'Iske liye Node 18 ya usse naya chahiye' },
      body: {
        en: 'Worth checking before an upgrade. Express 5 also drops support for a number of very old patterns, so the practical advice is to upgrade Node first, then Express, and run the test suite between the two.',
        hi: 'Upgrade se pehle ye dekh lena chahiye. Express 5 kai bahut purane patterns ka support bhi chhod deta hai, toh vyavharik salaah ye hai ki pehle Node upgrade karo, phir Express, aur dono ke beech test suite chalao.',
      },
    },
    {
      heading: { en: 'And what did not change', hi: 'Aur kya nahi badla' },
      body: {
        en: 'The middleware model, the router, the request and response API and the overall shape are identical. Express 5 is a cleanup release rather than a rewrite, which is why the migration is usually a day rather than a project.',
        hi: 'Middleware model, router, request aur response API aur poora dhaancha wahi hai. Express 5 safai wala release hai, dobara likha gaya framework nahi, isiliye migration aam taur pe ek din ka kaam hai, project nahi.',
      },
    },
  ],

  'How would you scale an Express application?': [
    {
      heading: { en: 'Find the bottleneck before adding machines', hi: 'Machines jodne se pehle rukaavat dhoondho' },
      body: {
        en: 'Scaling a service that is slow because of a missing index just buys more slow servers. Measure first: event loop lag, a CPU profile, database query times and the connection pool wait.',
        hi: 'Jo service gayab index ki wajah se dheemi hai, usse scale karna sirf aur dheeme servers khareedna hai. Pehle naapo: event loop lag, CPU profile, database query ka samay aur connection pool ka intezaar.',
      },
    },
    {
      heading: { en: 'Use every core', hi: 'Har core use karo' },
      body: {
        en: 'One Node process uses one core for JavaScript. Run one process per core with cluster or PM2 on a VM, or one container per core and let the orchestrator scale. That is usually the first multiple you gain.',
        hi: 'Ek Node process JavaScript ke liye ek core use karta hai. VM pe cluster ya PM2 se har core pe ek process chalao, ya har core pe ek container aur orchestrator ko scale karne do. Aam taur pe pehla guna yahi milta hai.',
      },
    },
    {
      heading: { en: 'Make the app stateless', hi: 'App ko stateless banao' },
      body: {
        en: 'This is what actually enables horizontal scaling. Sessions in Redis rather than memory, uploads in object storage rather than the local disk, no in-process cache that instances would disagree about, and no sticky sessions required.',
        hi: 'Asal mein horizontal scaling isse hi mumkin hoti hai. Sessions memory ki jagah Redis mein, uploads local disk ki jagah object storage mein, koi in-process cache nahi jispe instances alag-alag hon, aur sticky sessions ki zaroorat nahi.',
      },
    },
    {
      heading: { en: 'Then scale horizontally behind a balancer', hi: 'Phir balancer ke peeche horizontally scale karo' },
      body: {
        en: 'Once stateless, adding instances is a configuration change. Health checks let the balancer route around a bad instance, and rolling deploys become safe. This is where most of the capacity comes from.',
        hi: 'Stateless hone ke baad instances jodna ek configuration ka badlaav hai. Health checks balancer ko kharaab instance se bachne dete hain, aur rolling deploys safe ho jaate hain. Zyadatar capacity yahin se aati hai.',
      },
    },
    {
      heading: { en: 'The database becomes the limit', hi: 'Seema database ban jaata hai' },
      body: {
        en: 'Ten app instances all connect to one database, so a pool of twenty each is two hundred connections. Add indexes, size the pool deliberately, add read replicas, and consider a connection pooler like PgBouncer.',
        hi: 'Das app instances ek hi database se judte hain, toh har ek ka bees ka pool matlab do sau connections. Indexes jodo, pool ka size soch kar rakho, read replicas lagao, aur PgBouncer jaise connection pooler pe socho.',
      },
    },
    {
      heading: { en: 'Move slow work out of the request', hi: 'Dheema kaam request se bahar le jao' },
      body: {
        en: 'Sending an email, generating a report or processing an image does not belong in a request handler. Push it to a queue and return immediately — the request gets fast and the work gets retries.',
        hi: 'Email bhejna, report banana ya image process karna request handler mein nahi hona chahiye. Usse queue pe daalo aur turant lauto — request tez ho jaati hai aur kaam ko retries mil jaate hain.',
      },
      code: `await queue.add('send-email', { userId });
res.status(202).json({ accepted: true });`,
    },
    {
      heading: { en: 'Cache aggressively at every layer', hi: 'Har layer pe khoob cache karo' },
      body: {
        en: 'A CDN for static assets and cacheable responses, Redis for expensive computed results, and HTTP cache headers so the client does not ask again. The cheapest request is the one that never reaches Node.',
        hi: 'Static assets aur cache hone laayak responses ke liye CDN, mehnge computed results ke liye Redis, aur HTTP cache headers taaki client dobara na poochhe. Sabse sasti request wahi hai jo Node tak pahunchti hi nahi.',
      },
    },
    {
      heading: { en: 'And keep the event loop free', hi: 'Aur event loop khaali rakho' },
      body: {
        en: 'None of the above helps if a synchronous computation blocks the thread. Every instance you add is also blocked. Move CPU work to a worker thread or a queue before you scale out, not after.',
        hi: 'Upar ka kuch bhi kaam nahi aayega agar koi synchronous computation thread rok de. Jo instance tum jodte ho wo bhi ruka rehta hai. CPU ka kaam scale karne se pehle worker thread ya queue pe le jao, baad mein nahi.',
      },
    },
  ],

  'What is Express and what is it NOT?': [
    {
      heading: { en: 'It is a routing and middleware layer', hi: 'Ye routing aur middleware ki ek layer hai' },
      body: {
        en: 'That is genuinely all it is. Express takes Node\'s http module and adds a router, an ordered middleware pipeline, request and response helpers, and a place to handle errors. Everything else is a package you chose.',
        hi: 'Sach mein bas itna hi hai. Express Node ke http module pe ek router, ek kramwar middleware pipeline, request aur response ke helpers, aur errors sambhalne ki jagah jodta hai. Baaki sab tumhara chuna hua package hai.',
      },
    },
    {
      heading: { en: 'It is NOT a full framework', hi: 'Ye poora framework NAHI hai' },
      body: {
        en: 'No ORM, no validation, no authentication, no dependency injection, no project structure, no CLI, no conventions. Compared with Rails, Django or NestJS, Express deliberately decides almost nothing for you.',
        hi: 'Na ORM, na validation, na authentication, na dependency injection, na project structure, na CLI, na koi riwaaj. Rails, Django ya NestJS ke saamne Express jaan-boojh kar tumhare liye lagbhag kuch tay nahi karta.',
      },
      diagram: `Express gives you        You choose
routing                  database layer
middleware               validation
req/res helpers          auth
error handling           structure
                         logging, config, testing`,
    },
    {
      heading: { en: 'It is NOT an application server', hi: 'Ye application server NAHI hai' },
      body: {
        en: 'It does not manage processes, restart on crash, use every core, or terminate TLS. Those are jobs for PM2, systemd, a container orchestrator or a reverse proxy — and confusing the two is a common gap.',
        hi: 'Ye na processes sambhaalta hai, na crash pe restart karta hai, na har core use karta hai, na TLS khatam karta hai. Ye kaam PM2, systemd, kisi container orchestrator ya reverse proxy ke hain — aur dono ko mila dena aam kami hai.',
      },
    },
    {
      heading: { en: 'It is NOT secure by default', hi: 'Ye default se surakshit NAHI hai' },
      body: {
        en: 'A bare Express app has no security headers, no rate limiting, no CORS policy, no body size limit beyond the parser default and no input validation. Every one of those is something you add deliberately.',
        hi: 'Khaali Express app mein na security headers hain, na rate limiting, na CORS policy, na parser ke default se aage body size ki seema, na input validation. Inme se har ek tumhe soch kar jodna padta hai.',
      },
    },
    {
      heading: { en: 'And it is NOT fast, relative to the alternatives', hi: 'Aur vikalpon ke saamne ye tez NAHI hai' },
      body: {
        en: 'Fastify is measurably faster, largely because of schema-based serialisation. Being honest about this is better than claiming performance — Express is chosen for familiarity and the ecosystem, and for most applications the framework is not the bottleneck anyway.',
        hi: 'Fastify naapne laayak tez hai, bade taur pe schema-based serialisation ki wajah se. Iske baare mein imaandaar hona performance ka daava karne se behtar hai — Express jaan-pehchaan aur ecosystem ke liye chuna jaata hai, aur zyadatar applications mein framework rukaavat hota hi nahi.',
      },
    },
    {
      heading: { en: 'Which is why the answer is a trade-off', hi: 'Isiliye jawab ek sauda hai' },
      body: {
        en: '"Express is a thin, unopinionated routing and middleware layer. That flexibility is why it spread and why two Express codebases look nothing alike. If a team wants structure enforced I would suggest NestJS; if throughput matters, Fastify."',
        hi: '"Express ek patli, bina raay wali routing aur middleware layer hai. Isi lachak se ye faila aur isiliye do Express codebases bilkul alag dikhte hain. Team ko lagoo structure chahiye toh main NestJS sujhaunga; throughput maayne rakhta ho toh Fastify."',
      },
    },
  ],

  /* ─── Lifecycle, structure and API design ─────────────────── */

  'How do you handle graceful shutdown in an Express app?': [
    {
      heading: { en: 'The problem: a deploy drops in-flight requests', hi: 'Problem: deploy chal rahi requests gira deta hai' },
      body: {
        en: 'An orchestrator sends SIGTERM and then kills the process. Without a handler, Node exits immediately, so every request being served right then fails and every open database transaction is abandoned.',
        hi: 'Orchestrator SIGTERM bhejta hai aur phir process maar deta hai. Bina handler ke Node turant nikal jaata hai, toh us waqt chal rahi har request fail ho jaati hai aur har khuli database transaction adhoori chhoot jaati hai.',
      },
    },
    {
      heading: { en: 'Stop accepting, then finish what you have', hi: 'Lena band karo, phir jo hai wo poora karo' },
      body: {
        en: 'server.close stops accepting new connections and calls back once the existing ones have finished. That is the core of the answer — close first, then wait, then clean up.',
        hi: 'server.close naye connections lena band karta hai aur maujooda khatam hone pe callback deta hai. Jawab ka mool yahi hai — pehle band karo, phir intezaar, phir cleanup.',
      },
      code: `const server = app.listen(port);

process.on('SIGTERM', async () => {
  server.close(async () => {
    await pool.end();
    await redis.quit();
    process.exit(0);
  });
});`,
    },
    {
      heading: { en: 'Always add a timeout', hi: 'Timeout hamesha jodo' },
      body: {
        en: 'A hung request or a keep-alive connection can stop close from ever calling back, and then the orchestrator SIGKILLs you anyway — with no cleanup at all. Force an exit after a bounded wait.',
        hi: 'Koi atki hui request ya keep-alive connection close ko kabhi callback nahi karne de sakta, aur phir orchestrator waise bhi SIGKILL kar deta hai — bina kisi cleanup ke. Ek tay intezaar ke baad zabardasti nikal jao.',
      },
      code: `setTimeout(() => {
  logger.error('forced shutdown');
  process.exit(1);
}, 10_000).unref();`,
    },
    {
      heading: { en: 'Fail the health check first', hi: 'Pehle health check fail karo' },
      body: {
        en: 'The detail that actually prevents dropped requests. The load balancer needs a few seconds to notice you are going away. Mark the health endpoint unhealthy, wait, and only then close — otherwise it keeps routing traffic to a closing process.',
        hi: 'Yahi detail asal mein requests girne se bachaati hai. Load balancer ko ye samajhne mein kuch second lagte hain ki tum ja rahe ho. Health endpoint ko unhealthy karo, thoda ruko, aur tabhi band karo — warna wo band hote process pe traffic bhejta rahega.',
      },
      code: `let shuttingDown = false;
app.get('/health', (req, res) =>
  res.status(shuttingDown ? 503 : 200).end());

process.on('SIGTERM', () => {
  shuttingDown = true;
  setTimeout(() => server.close(cleanup), 5000);
});`,
    },
    {
      heading: { en: 'Handle SIGINT too, and be idempotent', hi: 'SIGINT bhi sambhaalo, aur idempotent raho' },
      body: {
        en: 'SIGINT is Ctrl-C in development. And a second signal while shutting down should not start the sequence again — guard with a flag, or an impatient operator pressing Ctrl-C twice makes it worse.',
        hi: 'Development mein SIGINT Ctrl-C hai. Aur shutdown ke dauraan doosra signal poora kram dobara shuru na kare — ek flag se rok lo, warna bechain operator do baar Ctrl-C daba kar haalat aur bigaad dega.',
      },
    },
    {
      heading: { en: 'Do not forget the workers', hi: 'Workers mat bhoolo' },
      body: {
        en: 'A background job processor, a cron task or an open WebSocket also needs to stop cleanly. Closing the HTTP server while a queue worker is mid-job just moves the dropped work somewhere less visible.',
        hi: 'Background job processor, cron task ya khula WebSocket bhi saaf tareeke se rukna chahiye. Queue worker beech kaam mein ho aur tum HTTP server band kar do, toh chhoota hua kaam bas kam dikhne wali jagah chala jaata hai.',
      },
    },
  ],

  'What is the difference between Express and Fastify or Koa?': [
    {
      heading: { en: 'All three are middleware-based Node frameworks', hi: 'Teeno middleware wale Node frameworks hain' },
      body: {
        en: 'They solve the same problem and differ in three ways: how middleware composes, how much is built in, and how fast the request pipeline is. Frame the answer around those three rather than listing features.',
        hi: 'Teeno ek hi problem hal karte hain aur teen tareeke se alag hain: middleware kaise judta hai, kitna built-in hai, aur request pipeline kitni tez hai. Features ginne ki jagah jawab in teen ke aas-paas rakho.',
      },
      diagram: `            middleware      built in            speed
Express     callback + next  routing only        baseline
Koa         async, onion     nothing at all      similar
Fastify     hooks + plugins  validation, logging  ~2-3× Express`,
    },
    {
      heading: { en: 'Koa: the same authors, async from the start', hi: 'Koa: wahi lekhak, shuru se async' },
      body: {
        en: 'Koa uses async middleware with an onion model — you await next, and control comes back to you afterwards, so a single middleware can wrap both the request and the response. It ships nothing else: no router, no body parser.',
        hi: 'Koa async middleware aur pyaaz wala model use karta hai — tum next ko await karte ho, aur baad mein control tumhare paas laut aata hai, toh ek hi middleware request aur response dono lapet sakta hai. Wo aur kuch nahi deta: na router, na body parser.',
      },
      code: `app.use(async (ctx, next) => {
  const start = Date.now();
  await next();                       // downstream runs here
  ctx.set('X-Time', Date.now() - start);   // then control returns
});`,
    },
    {
      heading: { en: 'Fastify: schemas and speed', hi: 'Fastify: schemas aur raftaar' },
      body: {
        en: 'It is measurably faster, mostly because a JSON schema lets it compile a specialised serialiser instead of calling JSON.stringify. Those schemas also give you validation, generated documentation and TypeScript types from one declaration.',
        hi: 'Ye naapne laayak tez hai, zyadatar isliye ki JSON schema usse JSON.stringify ki jagah ek khaas serialiser banane deta hai. Wahi schemas validation, banayi gayi documentation aur TypeScript types bhi dete hain, ek hi declaration se.',
      },
      code: `fastify.post('/users', {
  schema: {
    body: { type: 'object', required: ['name'], properties: { name: { type: 'string' } } },
    response: { 201: { type: 'object', properties: { id: { type: 'string' } } } },
  },
}, handler);`,
    },
    {
      heading: { en: 'Fastify plugins are encapsulated', hi: 'Fastify ke plugins alag rehte hain' },
      body: {
        en: 'A structural difference worth naming. A plugin gets its own scope, so a decorator or hook registered inside it does not leak to the rest of the app. Express middleware is global to wherever it is mounted, with no isolation.',
        hi: 'Ek dhaanchagat farq batane laayak. Plugin ko apna scope milta hai, toh uske andar register kiya koi decorator ya hook baaki app tak nahi jaata. Express ka middleware jahan laga ho wahan global hai, koi alagav nahi.',
      },
    },
    {
      heading: { en: 'Express wins on ecosystem and familiarity', hi: 'Ecosystem aur jaan-pehchaan mein Express jeetta hai' },
      body: {
        en: 'Be honest about why it is still the default. Every tutorial, every hire and every third-party integration assumes Express. Fastify has a compatibility layer for Express middleware precisely because that ecosystem is the moat.',
        hi: 'Ye abhi bhi default kyun hai, iske baare mein imaandaar raho. Har tutorial, har naya hire aur har third-party integration Express maan kar chalta hai. Fastify mein Express middleware ke liye compatibility layer isiliye hai ki wo ecosystem hi asli kila hai.',
      },
    },
    {
      heading: { en: 'And how to actually choose', hi: 'Aur asal mein kaise chunein' },
      body: {
        en: '"Express for a team that already knows it or needs the ecosystem. Fastify for a new service where throughput matters or where schema-driven validation and typing pay off. Koa rarely, and mostly on an existing codebase. For most applications the framework is not the bottleneck anyway."',
        hi: '"Us team ke liye Express jo usse pehle se jaanti hai ya jise ecosystem chahiye. Nayi service ke liye Fastify jahan throughput maayne rakhta ho ya schema wali validation aur typing ka fayda ho. Koa kabhi-kabhaar, aur zyadatar maujooda codebase pe. Waise zyadatar applications mein framework rukaavat hota hi nahi."',
      },
    },
  ],

  'How do you prevent common security vulnerabilities in Express?': [
    {
      heading: { en: 'Validate every input at the boundary', hi: 'Har input boundary pe validate karo' },
      body: {
        en: 'Body, query, params and headers all come from the client. A schema that coerces types, applies bounds and strips unknown fields prevents injection, mass assignment and resource exhaustion in one place.',
        hi: 'Body, query, params aur headers sab client se aate hain. Aisa schema jo types badle, seemayein lagaye aur anjaan fields hataye — wo injection, mass assignment aur resource khatam hone se ek hi jagah bacha leta hai.',
      },
      code: `const r = CreateUser.safeParse(req.body);
if (!r.success) return res.status(400).json({ issues: r.error.issues });
await users.create(r.data);      // ✓ never req.body directly`,
    },
    {
      heading: { en: 'Never build a query by string concatenation', hi: 'Query kabhi string jod kar mat banao' },
      body: {
        en: 'Injection is still the top vulnerability class. Use parameterised queries or an ORM. In MongoDB the equivalent is passing an object straight from req.body into a query, which lets a client send an operator like $ne.',
        hi: 'Injection aaj bhi sabse upar wali kamzori hai. Parameterised queries ya ORM lo. MongoDB mein iska joda hai req.body se seedha object query mein daalna, jisse client $ne jaisa operator bhej sakta hai.',
      },
      code: `db.query(\`SELECT * FROM users WHERE id = \${req.params.id}\`);   // ✗
db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);   // ✓

users.findOne({ email: req.body.email });    // ✗ { "$ne": null }
users.findOne({ email: String(req.body.email) });   // ✓`,
    },
    {
      heading: { en: 'Set security headers and a body limit', hi: 'Security headers aur body ki seema lagao' },
      body: {
        en: 'helmet covers the headers, including a content security policy. A body size limit prevents one client from exhausting memory, and rate limiting prevents brute force. All three are one line each and routinely missing.',
        hi: 'helmet headers cover karta hai, content security policy samet. Body size ki seema ek client ko memory khatam karne se rokti hai, aur rate limiting brute force. Teeno ek-ek line hain aur aksar gayab hote hain.',
      },
      code: `app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use('/api/auth', rateLimit({ windowMs: 9e5, limit: 5 }));`,
    },
    {
      heading: { en: 'Get authentication and authorisation both right', hi: 'Authentication aur authorisation dono theek karo' },
      body: {
        en: 'The vulnerability people actually ship is a missing ownership check — a valid token, a valid request, and someone else\'s record. Authenticating tells you who; you still have to check they may touch THIS resource.',
        hi: 'Log asal mein jo kamzori bhejte hain wo gayab ownership check hai — valid token, valid request, aur kisi aur ka record. Authentication batata hai kaun; ye jaanchna abhi baaki hai ki wo IS resource ko chhoo sakta hai ya nahi.',
      },
      code: `const doc = await notes.find(req.params.id);
if (doc.ownerId !== req.user.id) return res.sendStatus(403);   // ✓`,
    },
    {
      heading: { en: 'Do not leak information in errors', hi: 'Errors mein jaankari mat leak karo' },
      body: {
        en: 'A stack trace, a database message or a query in a 500 response tells an attacker about your schema and your stack. Log the real error and return a generic message, and disable x-powered-by.',
        hi: '500 response mein stack trace, database ka message ya koi query hamlavar ko tumhare schema aur stack ke baare mein bata deti hai. Asli error log karo aur aam message do, aur x-powered-by band kar do.',
      },
    },
    {
      heading: { en: 'Keep cookies and CORS strict', hi: 'Cookies aur CORS sakht rakho' },
      body: {
        en: 'httpOnly, secure and sameSite on every session cookie so an XSS cannot read it and CSRF is blocked. An explicit CORS origin allowlist rather than reflecting whatever the request claims.',
        hi: 'Har session cookie pe httpOnly, secure aur sameSite taaki XSS use padh na sake aur CSRF ruk jaaye. CORS mein saaf origin allowlist rakho, request jo kahe usse wapas bhejne ki jagah.',
      },
    },
    {
      heading: { en: 'And keep dependencies current', hi: 'Aur dependencies nayi rakho' },
      body: {
        en: 'Most real breaches come through a known CVE in a transitive dependency, not clever code. npm audit in CI, Dependabot or Renovate for upgrades, and npm ci so the lock file is what actually installs.',
        hi: 'Zyadatar asli sendh kisi transitive dependency ke maloom CVE se aati hai, chatur code se nahi. CI mein npm audit, upgrades ke liye Dependabot ya Renovate, aur npm ci taaki install wahi ho jo lock file kehti hai.',
      },
    },
  ],

  'What is the res.locals object used for?': [
    {
      heading: { en: 'Per-request data shared down the pipeline', hi: 'Pipeline mein neeche saanjha, har request ka data' },
      body: {
        en: 'res.locals is an object scoped to a single request and response. Middleware puts something on it and later middleware, the route handler or a template can read it. It is cleared when the response ends.',
        hi: 'res.locals ek object hai jo sirf ek request aur response tak seemit hai. Middleware usme kuch rakhta hai aur baad ka middleware, route handler ya koi template usse padh sakta hai. Response khatam hote hi wo saaf ho jaata hai.',
      },
      code: `app.use((req, res, next) => {
  res.locals.requestId = crypto.randomUUID();
  next();
});`,
    },
    {
      heading: { en: 'Its original purpose is templates', hi: 'Iska asli maqsad templates hai' },
      body: {
        en: 'Express merges res.locals into the render context automatically, so anything you put there is available in every view without passing it explicitly. That is why it exists at all.',
        hi: 'Express res.locals ko render ke context mein apne aap mila deta hai, toh usme rakhi har cheez har view mein bina alag se bheje mil jaati hai. Iske hone ki asli wajah yahi hai.',
      },
      code: `res.locals.user = req.user;
res.render('profile');       // the template can read user directly`,
    },
    {
      heading: { en: 'res.locals versus app.locals', hi: 'res.locals vs app.locals' },
      body: {
        en: 'app.locals lives for the lifetime of the application and is shared by every request — right for the site name or a version string, and completely wrong for user data. Putting a user on app.locals leaks one request\'s data into another\'s.',
        hi: 'app.locals poore application ke jeevan tak rehta hai aur har request usse share karti hai — site ka naam ya version string ke liye theek, aur user data ke liye bilkul galat. app.locals pe user rakhna ek request ka data doosri mein leak kar deta hai.',
      },
    },
    {
      heading: { en: 'res.locals versus putting it on req', hi: 'res.locals vs usse req pe rakhna' },
      body: {
        en: 'Both work and both are per-request. The convention most teams follow is req for things about the incoming request — the authenticated user, the validated body — and res.locals for things the response will use, such as template data.',
        hi: 'Dono chalte hain aur dono har request ke apne hain. Zyadatar teams ka riwaaj hai: aane wali request ki cheezein req pe — authenticated user, validated body — aur response jo use karega wo res.locals pe, jaise template ka data.',
      },
    },
    {
      heading: { en: 'It is not typed, which is the real cost', hi: 'Ye typed nahi hai, aur asli keemat yahi hai' },
      body: {
        en: 'Both req and res.locals are effectively any, so a typo is silent and nothing tells you what a middleware promised to set. In TypeScript, declare the shape with module augmentation rather than reaching for as.',
        hi: 'req aur res.locals dono asal mein any hain, toh typo chup-chaap nikal jaata hai aur ye kuch nahi bataata ki kis middleware ne kya set karne ka vaada kiya tha. TypeScript mein as uthane ki jagah module augmentation se shakl declare karo.',
      },
      code: `declare global {
  namespace Express {
    interface Locals { requestId: string; user?: User }
  }
}`,
    },
    {
      heading: { en: 'And do not use it as a general store', hi: 'Aur isse aam store ki tarah mat use karo' },
      body: {
        en: 'It is a convenient dumping ground, which is the problem. Once four middlewares each add a field, no handler knows what is present. Keep it to a small, documented set — or use AsyncLocalStorage for cross-cutting context like a request id.',
        hi: 'Ye suvidhajanak kachra-ghar hai, aur problem yahi hai. Chaar middleware ek-ek field jod dein toh kisi handler ko pata hi nahi kya maujood hai. Isse chhota aur likha hua rakho — ya request id jaise saanjhe context ke liye AsyncLocalStorage lo.',
      },
    },
  ],

  'How do you handle long-running or background jobs in an Express app?': [
    {
      heading: { en: 'Not in the request handler', hi: 'Request handler mein nahi' },
      body: {
        en: 'A request should return in milliseconds. Sending an email, generating a PDF, processing an image or calling a slow third party inside a handler ties up a connection, risks a gateway timeout, and gives you no retry if it fails.',
        hi: 'Request milliseconds mein lautni chahiye. Handler ke andar email bhejna, PDF banana, image process karna ya kisi dheeme third party ko bulana connection baandh deta hai, gateway timeout ka khatra deta hai, aur fail hone pe koi retry nahi milta.',
      },
    },
    {
      heading: { en: 'Fire and forget is the tempting wrong answer', hi: 'Bhej kar bhool jaana lubhaane wala galat jawab hai' },
      body: {
        en: 'Calling the work without awaiting returns fast, but the job dies with the process on the next deploy, there is no retry, no visibility, and an unhandled rejection can crash the server. It looks like a solution for about a week.',
        hi: 'Bina await ke kaam bulana jaldi lautta hai, par agle deploy pe job process ke saath mar jaata hai, na retry, na koi nazar, aur bina sambhali rejection server crash kar sakti hai. Ye lagbhag ek hafte tak hal jaisa dikhta hai.',
      },
      code: `sendEmail(user);                  // ✗ lost on restart, no retry
res.json({ ok: true });`,
    },
    {
      heading: { en: 'Use a job queue', hi: 'Job queue lo' },
      body: {
        en: 'BullMQ on Redis is the usual choice. The handler enqueues and returns immediately; a separate worker process consumes the queue. You get retries with backoff, persistence across restarts, concurrency control and a dashboard.',
        hi: 'Redis pe BullMQ aam chunav hai. Handler queue mein daal kar turant lautta hai; ek alag worker process queue se uthata hai. Backoff ke saath retries, restart ke paar bachaav, concurrency ka control aur ek dashboard mil jaata hai.',
      },
      code: `await queue.add('send-email', { userId }, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
});
res.status(202).json({ accepted: true });`,
    },
    {
      heading: { en: 'Run the worker as a separate process', hi: 'Worker ko alag process ki tarah chalao' },
      body: {
        en: 'This is the part people skip. A worker in the same process shares the event loop, so a heavy job blocks your API. Separate processes also let you scale the two independently — more workers without more web servers.',
        hi: 'Yahi hissa log chhod dete hain. Usi process ka worker event loop share karta hai, toh bhaari job tumhari API rok deta hai. Alag processes se dono ko alag-alag scale bhi kar sakte ho — aur workers, bina aur web servers ke.',
      },
    },
    {
      heading: { en: 'Return 202 and a way to check progress', hi: '202 do aur progress dekhne ka raasta' },
      body: {
        en: '202 Accepted says the work is queued, not done. Return a job id so the client can poll a status endpoint or subscribe to a websocket. Returning 200 for work that has not happened is a lie the client will act on.',
        hi: '202 Accepted kehta hai kaam queue mein hai, hua nahi. Ek job id do taaki client status endpoint poll kare ya websocket sune. Jo kaam hua hi nahi uske liye 200 dena ek jhooth hai jispe client bharosa kar lega.',
      },
      code: `const job = await queue.add('report', data);
res.status(202).json({ jobId: job.id, status: '/jobs/' + job.id });`,
    },
    {
      heading: { en: 'Make jobs idempotent', hi: 'Jobs ko idempotent banao' },
      body: {
        en: 'A queue guarantees at-least-once delivery, so a job can run twice after a worker crash. Charging a card twice is the classic failure. Key on an idempotency id and check before performing the side effect.',
        hi: 'Queue kam se kam ek baar pahunchane ki guarantee deti hai, toh worker crash ke baad job do baar chal sakta hai. Card do baar charge hona classic failure hai. Ek idempotency id pe key karo aur side effect se pehle jaancho.',
      },
    },
    {
      heading: { en: 'And CPU work is a different problem', hi: 'Aur CPU ka kaam alag problem hai' },
      body: {
        en: 'A queue moves work off the request but a worker in Node still runs it on one thread. For genuinely CPU-bound jobs — image resizing, large parsing — use worker_threads inside the worker, or a language better suited to it.',
        hi: 'Queue kaam ko request se hataati hai par Node ka worker phir bhi usse ek thread pe chalata hai. Sach mein CPU wale jobs ke liye — image resize, bada parsing — worker ke andar worker_threads lo, ya uske liye behtar language.',
      },
    },
  ],

  'What is the purpose of separating app.js from server.js?': [
    {
      heading: { en: 'One builds the app, the other starts it', hi: 'Ek app banata hai, doosra usse chalata hai' },
      body: {
        en: 'app.js creates the Express instance, mounts middleware and routes, and exports it — without calling listen. server.js imports it, reads the port and starts listening. That single split buys several things.',
        hi: 'app.js Express instance banata hai, middleware aur routes lagata hai, aur usse export karta hai — listen bulaye bina. server.js usse import karta hai, port padhta hai aur sunna shuru karta hai. Yahi ek baant kai cheezein deti hai.',
      },
      code: `// app.js
export const app = express();
app.use(routes);

// server.js
import { app } from './app.js';
app.listen(env.PORT);`,
    },
    {
      heading: { en: 'Testing is the main reason', hi: 'Mukhya wajah testing hai' },
      body: {
        en: 'supertest drives the app object directly on an ephemeral port. If app.js called listen at import time, every test file would bind a real port, tests could not run in parallel, and you would need teardown to close the server.',
        hi: 'supertest app object ko seedha kisi khaali port pe chalata hai. Agar app.js import pe hi listen bulaata, toh har test file asli port lagati, tests saath nahi chal paate, aur server band karne ko teardown likhna padta.',
      },
      code: `import request from 'supertest';
import { app } from '../app.js';

await request(app).get('/health').expect(200);   // ✓ no port needed`,
    },
    {
      heading: { en: 'It separates wiring from startup', hi: 'Ye wiring ko shuruaat se alag karta hai' },
      body: {
        en: 'Startup concerns — reading config, connecting the database, registering signal handlers, choosing a port — are not the same as deciding which middleware runs in what order. Keeping them apart makes both easier to read.',
        hi: 'Shuruaat ke maamle — config padhna, database jodna, signal handlers lagana, port chunna — ye tay karne se alag hain ki kaunsa middleware kis kram mein chalta hai. Dono ko alag rakhne se dono padhne mein aasaan ho jaate hain.',
      },
    },
    {
      heading: { en: 'It lets the same app run in different hosts', hi: 'Isse wahi app alag jagahon pe chalta hai' },
      body: {
        en: 'A serverless platform imports the app and wraps it in its own handler rather than calling listen. So does a test harness, and so does a process that mounts the app behind another server. Exporting the app keeps all of that possible.',
        hi: 'Serverless platform app import karke usse apne handler mein lapetta hai, listen nahi bulaata. Test harness bhi wahi karta hai, aur wo process bhi jo app ko kisi doosre server ke peeche lagata hai. App export karna ye sab mumkin rakhta hai.',
      },
    },
    {
      heading: { en: 'And it makes graceful shutdown natural', hi: 'Aur isse shaant shutdown swabhavik ho jaata hai' },
      body: {
        en: 'server.js holds the reference returned by listen, which is what you need for server.close on SIGTERM. With listen buried inside app.js there is nothing to hold on to.',
        hi: 'server.js listen se mila reference rakhta hai, aur SIGTERM pe server.close ke liye wahi chahiye. listen app.js ke andar dabaa ho toh pakadne ko kuch hota hi nahi.',
      },
      code: `const server = app.listen(port);
process.on('SIGTERM', () => server.close(cleanup));`,
    },
    {
      heading: { en: 'A small file with a large payoff', hi: 'Chhoti file, bada fayda' },
      body: {
        en: 'server.js is usually ten lines. That is the whole cost, and in exchange the app becomes testable, portable and shutdownable — which is why nearly every production Express codebase does it.',
        hi: 'server.js aam taur pe das line ka hota hai. Poori keemat itni hi hai, aur badle mein app testable, portable aur band karne laayak ban jaata hai — isiliye lagbhag har production Express codebase ye karta hai.',
      },
    },
  ],

  'How do you version an Express API?': [
    {
      heading: { en: 'The URL prefix is the common answer', hi: 'Aam jawab URL prefix hai' },
      body: {
        en: 'Mount each version as a router under its own path. It is explicit, visible in logs and browser history, trivially cacheable, and anyone can test it with curl. Most public APIs do this.',
        hi: 'Har version ko apne path ke neeche router ki tarah lagao. Ye saaf hai, logs aur browser history mein dikhta hai, aasaani se cache hota hai, aur koi bhi curl se test kar sakta hai. Zyadatar public APIs yahi karti hain.',
      },
      code: `app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);`,
    },
    {
      heading: { en: 'The alternatives, and their trade-offs', hi: 'Vikalp, aur unke sauday' },
      body: {
        en: 'A header or an Accept media type keeps URLs stable and is arguably more correct, but it is invisible in a log, harder to test by hand, and easy for a cache to get wrong without a Vary header. A query parameter is the weakest of the three.',
        hi: 'Header ya Accept media type URLs sthir rakhta hai aur shaayad zyada sahi hai, par wo log mein dikhta nahi, haath se test karna mushkil hai, aur Vary header ke bina cache usse galat kar sakta hai. Query parameter teeno mein sabse kamzor hai.',
      },
      code: `Accept: application/vnd.myapi.v2+json      // correct, less visible
GET /api/users?version=2                     // ✗ pollutes the query`,
    },
    {
      heading: { en: 'Only version what actually breaks', hi: 'Sirf wahi version karo jo sach mein tootta hai' },
      body: {
        en: 'Adding a field, adding an optional parameter or adding an endpoint is backwards compatible and needs no new version. Removing a field, renaming one, changing a type or changing an error shape does. Versioning too eagerly doubles your maintenance for nothing.',
        hi: 'Naya field jodna, optional parameter jodna ya naya endpoint jodna backwards compatible hai aur naya version nahi maangta. Field hataana, naam badalna, type badalna ya error ka roop badalna maangta hai. Bina zaroorat version banana maintenance dogun kar deta hai.',
      },
    },
    {
      heading: { en: 'Share the logic, version the surface', hi: 'Logic saanjha, surface version karo' },
      body: {
        en: 'Copying the whole application per version guarantees the two drift. Keep one service layer and let each version have its own routes and its own serialiser — so v1 and v2 differ only in how they shape the response.',
        hi: 'Har version ke liye poora application copy karna dono ko alag hone ki guarantee hai. Ek service layer rakho aur har version ke apne routes aur apna serialiser ho — toh v1 aur v2 sirf response ki shakl mein alag hon.',
      },
      code: `// both call the same service
v1.get('/users/:id', async (req, res) => res.json(toV1(await get(req))));
v2.get('/users/:id', async (req, res) => res.json(toV2(await get(req))));`,
    },
    {
      heading: { en: 'Deprecate loudly and on a schedule', hi: 'Zor se aur samay tay karke deprecate karo' },
      body: {
        en: 'Announce a sunset date, send the Deprecation and Sunset headers, log which clients still call the old version, and contact them. An unannounced removal breaks integrations you did not know existed.',
        hi: 'Band hone ki taareekh batao, Deprecation aur Sunset headers bhejo, log karo ki kaunse clients abhi purana version bula rahe hain, aur unse baat karo. Bina bataye hataana un integrations ko todta hai jinke hone ka tumhe pata bhi nahi tha.',
      },
      code: `res.set('Deprecation', 'true');
res.set('Sunset', 'Sat, 01 Nov 2026 00:00:00 GMT');`,
    },
    {
      heading: { en: 'And the honest answer for an internal API', hi: 'Aur internal API ke liye imaandaar jawab' },
      body: {
        en: 'If you own every client, versioning may be unnecessary — ship the change and update the callers. Versioning is a cost you pay to support consumers you cannot coordinate with. Saying that shows judgement rather than ceremony.',
        hi: 'Agar har client tumhara hai toh shaayad versioning ki zaroorat hi nahi — badlaav bhejo aur callers update kar do. Versioning wo keemat hai jo un users ke liye di jaati hai jinse taal-mel nahi ho sakta. Ye kehna dikhawa nahi, samajh dikhata hai.',
      },
    },
  ],

  'What causes "Cannot set headers after they are sent" and how do you fix it?': [
    {
      heading: { en: 'You tried to respond twice', hi: 'Tumne do baar jawab dene ki koshish ki' },
      body: {
        en: 'Once any part of the response has been written, the headers are committed and cannot change. A second send, json, redirect or status call throws this error. The message is accurate — the difficulty is finding where the first one happened.',
        hi: 'Response ka koi bhi hissa likh diya gaya toh headers tay ho jaate hain aur badal nahi sakte. Doosra send, json, redirect ya status call ye error deta hai. Message sahi hai — mushkil ye dhoondhna hai ki pehla kahan hua.',
      },
    },
    {
      heading: { en: 'Cause one: a missing return', hi: 'Wajah ek: return chhoot gaya' },
      body: {
        en: 'By far the most common. A guard clause sends a response and then execution continues to the code below it, which sends again. Returning is the fix, and it is worth making it a habit everywhere.',
        hi: 'Sabse aam yahi hai. Koi guard clause response bhejta hai aur phir execution neeche ke code tak chalta rehta hai, jo dobara bhej deta hai. Ilaaj return karna hai, aur isse har jagah aadat bana lena chahiye.',
      },
      code: `if (!user) res.status(404).send();       // ✗ falls through
res.json(user);

if (!user) return res.status(404).send();  // ✓`,
    },
    {
      heading: { en: 'Cause two: next after responding', hi: 'Wajah do: jawab dene ke baad next' },
      body: {
        en: 'Sending a response and then calling next continues the pipeline, and the next layer — often the 404 handler — tries to respond as well. Send or continue, never both.',
        hi: 'Response bhej kar next bulana pipeline aage badha deta hai, aur agli layer — aksar 404 handler — bhi jawab dene ki koshish karti hai. Ya bhejo ya aage badho, dono kabhi nahi.',
      },
      code: `res.json(data);
next();          // ✗ the 404 handler will try to respond`,
    },
    {
      heading: { en: 'Cause three: an async callback firing later', hi: 'Wajah teen: async callback baad mein chalna' },
      body: {
        en: 'The hardest version to spot. A response is sent, then a promise or a timer that was already in flight resolves and its callback sends again. Common with a database call whose result you no longer need.',
        hi: 'Sabse mushkil se dikhne wala roop. Response ja chuka hota hai, phir pehle se chal rahi koi promise ya timer poori hoti hai aur uska callback dobara bhej deta hai. Aisi database call ke saath aam hai jiska nateeja ab chahiye hi nahi.',
      },
      code: `const t = setTimeout(() => res.send('timeout'), 5000);
const data = await slowQuery();
clearTimeout(t);          // ✓ cancel it, or the timer responds too
res.json(data);`,
    },
    {
      heading: { en: 'Cause four: an error handler that ignores headersSent', hi: 'Wajah chaar: headersSent na dekhne wala error handler' },
      body: {
        en: 'If an error occurs after the response was sent, the error handler still runs and tries to send a 500. Always check res.headersSent first and delegate to Express, which closes the socket properly.',
        hi: 'Agar error response bhejne ke baad aaye toh error handler phir bhi chalta hai aur 500 bhejne ki koshish karta hai. Pehle hamesha res.headersSent jaancho aur Express ko de do, jo socket theek se band kar deta hai.',
      },
      code: `app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);    // ✓
  res.status(500).json({ error: 'Internal error' });
});`,
    },
    {
      heading: { en: 'How to find it', hi: 'Isse kaise dhoondhein' },
      body: {
        en: 'The stack trace points at the SECOND send, not the first, which is why it is confusing. Search the handler for every response path and check each one returns. A lint rule that requires a return on Express response calls catches most of them.',
        hi: 'Stack trace DOOSRE send pe ishara karta hai, pehle pe nahi, isiliye uljhan hoti hai. Handler mein har response wala raasta dhoondho aur har ek pe return jaancho. Aisa lint rule jo Express ke response calls pe return maange, zyadatar pakad leta hai.',
      },
    },
  ],

  'How do you handle environment-specific configuration in Express?': [
    {
      heading: { en: 'Configuration comes from the environment', hi: 'Configuration environment se aati hai' },
      body: {
        en: 'The same build artifact should run in development, staging and production with different values injected. That is what keeps the thing you tested and the thing you deployed identical.',
        hi: 'Wahi build artifact dev, staging aur production mein alag values ke saath chalna chahiye. Isi se jo test kiya aur jo deploy kiya wo ek jaise rehte hain.',
      },
    },
    {
      heading: { en: 'One validated config module', hi: 'Ek validated config module' },
      body: {
        en: 'Read process.env once, parse it through a schema with types, defaults and bounds, and export a frozen object. Everything else imports that. Scattered process.env access means no validation and no single place to see what the app needs.',
        hi: 'process.env ek baar padho, usse types, defaults aur seemaon wale schema se parse karo, aur ek frozen object export karo. Baaki sab usse import kare. Bikhra hua process.env matlab na validation, na ek jagah jahan dikhe app ko kya chahiye.',
      },
      code: `export const env = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
}).parse(process.env);`,
    },
    {
      heading: { en: 'Fail at startup, not at first use', hi: 'Shuruaat mein fail karo, pehle upyog pe nahi' },
      body: {
        en: 'The single most valuable habit. A missing DATABASE_URL should crash the process at boot with a clear message, not surface as undefined inside a connection string at three in the morning under load.',
        hi: 'Sabse keemti aadat yahi hai. Gayab DATABASE_URL boot pe saaf message ke saath crash karna chahiye, na ki raat teen baje load mein kisi connection string ke andar undefined ban kar aana.',
      },
    },
    {
      heading: { en: 'Branch on capability, not on NODE_ENV', hi: 'NODE_ENV pe nahi, khoobi pe branch karo' },
      body: {
        en: 'Checking NODE_ENV everywhere scatters environment knowledge through the codebase and makes a fourth environment painful. Put the decision in config once and let the rest of the app read a flag.',
        hi: 'Har jagah NODE_ENV jaanchna environment ka gyaan poore codebase mein bikher deta hai aur chautha environment jodna dard bana deta hai. Faisla config mein ek baar rakho aur baaki app ko ek flag padhne do.',
      },
      code: `if (process.env.NODE_ENV === 'production') { … }   // ✗ scattered
if (config.enableDetailedErrors) { … }              // ✓ one decision`,
    },
    {
      heading: { en: 'NODE_ENV has real behavioural effects', hi: 'NODE_ENV ka asli asar hota hai' },
      body: {
        en: 'Express disables view caching and sends stack traces when it is not production. Many libraries branch on it too. Forgetting to set it to production is a genuine and very common performance and security bug.',
        hi: 'Production na ho toh Express view caching band kar deta hai aur stack traces bhejta hai. Kai libraries bhi ispe branch karti hain. Isse production set karna bhoolna asli aur bahut aam performance aur security bug hai.',
      },
    },
    {
      heading: { en: 'Secrets are not ordinary configuration', hi: 'Secrets aam configuration nahi hain' },
      body: {
        en: 'A port and a feature flag can live in a plain environment variable. A database password or a signing key belongs in a secret manager with access control, an audit trail and rotation — and must never be in the repository.',
        hi: 'Port aur feature flag saade environment variable mein reh sakte hain. Database ka password ya signing key secret manager mein hone chahiye, access control, audit trail aur rotation ke saath — aur repository mein kabhi nahi.',
      },
    },
    {
      heading: { en: 'And commit an example file', hi: 'Aur ek example file commit karo' },
      body: {
        en: 'A .env.example listing the names with no values tells a new developer exactly what to set, and keeps the real .env in .gitignore from the first commit. It is the cheapest documentation in the project.',
        hi: 'Ek .env.example jisme sirf naam hon values nahi, naye developer ko theek bata deta hai kya set karna hai, aur asli .env ko pehle commit se hi .gitignore mein rakhta hai. Project ki sabse sasti documentation yahi hai.',
      },
    },
  ],

  'What is the difference between Express Router and a sub-app?': [
    {
      heading: { en: 'A Router has no settings of its own', hi: 'Router ki apni settings nahi hoti' },
      body: {
        en: 'A Router is a middleware stack with routing. A sub-app is a full express() instance mounted with use — it has its own settings, its own view engine, its own locals and its own error handling.',
        hi: 'Router routing wala ek middleware stack hai. Sub-app ek poora express() instance hai jo use se lagta hai — uski apni settings, apna view engine, apne locals aur apna error handling hota hai.',
      },
      code: `const router = express.Router();      // shares the parent's settings
const subApp = express();               // has its own

app.use('/api', router);
app.use('/admin', subApp);`,
    },
    {
      heading: { en: 'Settings are the practical difference', hi: 'Vyavharik farq settings ka hai' },
      body: {
        en: 'A sub-app can set its own view engine, its own json spaces, its own case sensitivity. It also inherits some settings from the parent unless it overrides them, which is a subtlety worth knowing.',
        hi: 'Sub-app apna view engine, apna json spaces, apni case sensitivity set kar sakta hai. Wo parent se kuch settings inherit bhi karta hai jab tak khud na badle, aur ye ek sookshm baat jaanne laayak hai.',
      },
      code: `subApp.set('view engine', 'pug');      // ✓ only this sub-app
router.set(…);                           // ✗ a Router has no set`,
    },
    {
      heading: { en: 'Error handling is scoped in a sub-app', hi: 'Sub-app mein error handling seemit hoti hai' },
      body: {
        en: 'A sub-app can register its own error handler, and errors raised inside it are handled there rather than bubbling to the parent. A Router\'s errors always go to the parent\'s handler.',
        hi: 'Sub-app apna error handler rakh sakta hai, aur uske andar ke errors wahin sambhale jaate hain, parent tak nahi jaate. Router ke errors hamesha parent ke handler tak jaate hain.',
      },
    },
    {
      heading: { en: 'Both strip the mount path', hi: 'Dono mount path hata dete hain' },
      body: {
        en: 'Inside either, req.url has the prefix removed while req.originalUrl keeps it, and req.baseUrl holds the mount path. That behaviour is identical, which is why the two are easy to confuse.',
        hi: 'Dono ke andar req.url se prefix hat jaata hai jabki req.originalUrl usse rakhta hai, aur req.baseUrl mount path rakhta hai. Ye behaviour ek jaisa hai, isiliye dono ko mila dena aasaan hai.',
      },
    },
    {
      heading: { en: 'A sub-app is heavier', hi: 'Sub-app bhaari hai' },
      body: {
        en: 'It is a whole Express application object with its own settings table and its own stack. For splitting routes into files — which is what people actually want — that is more machinery than the job needs.',
        hi: 'Ye poora Express application object hai apni settings table aur apne stack ke saath. Routes ko files mein baantne ke liye — jo log asal mein chahte hain — ye zaroorat se zyada machinery hai.',
      },
    },
    {
      heading: { en: 'So use a Router unless you need the isolation', hi: 'Toh Router lo, jab tak alagav na chahiye' },
      body: {
        en: 'Router for organising routes, which is almost always. A sub-app when a section genuinely needs different configuration — a documentation site with its own template engine mounted alongside a JSON API, for instance.',
        hi: 'Routes sambhalne ke liye Router, jo lagbhag hamesha hota hai. Sub-app tab jab kisi hisse ko sach mein alag configuration chahiye — jaise JSON API ke saath laga ek documentation site jiska apna template engine ho.',
      },
    },
  ],

  'How do you implement pagination in an Express API?': [
    {
      heading: { en: 'Two approaches, and they are not equivalent', hi: 'Do tareeke, aur ye barabar nahi hain' },
      body: {
        en: 'Offset pagination skips a number of rows. Cursor pagination remembers where the last page ended. Offset is simpler and correct enough for small, stable data; cursor is correct and fast for anything large or changing.',
        hi: 'Offset pagination kuch rows chhod deta hai. Cursor pagination yaad rakhta hai pichhla page kahan khatam hua. Offset simple hai aur chhote, sthir data ke liye kaafi sahi; cursor bade ya badalte data ke liye sahi aur tez hai.',
      },
      diagram: `offset   ?page=3&limit=20   → SKIP 40 LIMIT 20
cursor   ?after=abc&limit=20 → WHERE id > 'abc' LIMIT 20`,
    },
    {
      heading: { en: 'Validate and bound the parameters', hi: 'Parameters validate aur seemit karo' },
      body: {
        en: 'Both come straight from the query string as strings. Without a maximum, a client can request a limit of a million and take the service down. Coerce, clamp and default in one schema.',
        hi: 'Dono seedha query string se strings ki tarah aate hain. Bina adhiktam ke client das lakh ka limit maang kar service gira sakta hai. Ek schema mein convert, clamp aur default karo.',
      },
      code: `const Query = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});`,
    },
    {
      heading: { en: 'Offset pagination, and its two flaws', hi: 'Offset pagination, aur uski do khaamiyan' },
      body: {
        en: 'The database still walks and discards every skipped row, so page 5000 is slow no matter the index. And if a row is inserted between requests, everything shifts — a user sees the same item twice, or misses one entirely.',
        hi: 'Database har chhode gaye row pe chal kar usse phenkta hai, toh index chahe jo bhi ho page 5000 dheema hai. Aur do requests ke beech koi row jud jaaye toh sab khisak jaata hai — user ek hi item do baar dekhta hai, ya ek poori tarah chook jaata hai.',
      },
      code: `const [items, total] = await Promise.all([
  db.users.find().skip((page - 1) * limit).limit(limit),
  db.users.count(),
]);
res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });`,
    },
    {
      heading: { en: 'Cursor pagination fixes both', hi: 'Cursor pagination dono theek karta hai' },
      body: {
        en: 'A WHERE on an indexed, ordered column is fast at any depth, and inserting a row does not shift the pages that were already served. This is what an infinite scroll should use, and what most large APIs do.',
        hi: 'Kisi indexed, kramwar column pe WHERE har gehraai pe tez hai, aur nayi row jud jaane se pehle diye gaye pages khisakte nahi. Infinite scroll ko yahi use karna chahiye, aur zyadatar badi APIs yahi karti hain.',
      },
      code: `const items = await db.users.find({ _id: { $gt: after } })
  .sort({ _id: 1 }).limit(limit + 1);

const hasMore = items.length > limit;
res.json({ items: items.slice(0, limit),
           nextCursor: hasMore ? items[limit - 1]._id : null });`,
    },
    {
      heading: { en: 'The cursor must sort on something unique', hi: 'Cursor kisi unique cheez pe sort kare' },
      body: {
        en: 'Paginating on a non-unique column such as createdAt silently skips or repeats rows that share a value. Use a composite cursor — the sort column plus the id — as a tiebreaker.',
        hi: 'createdAt jaise non-unique column pe pagination un rows ko chup-chaap chhod ya dohra deta hai jinki value same ho. Composite cursor lo — sort wala column aur id — barabari todne ke liye.',
      },
    },
    {
      heading: { en: 'Count is often the expensive part', hi: 'Aksar mehnga hissa count hota hai' },
      body: {
        en: 'A total count means a full scan on a large table, and it is usually more expensive than the page itself. Return an estimate, omit it, or replace it with a hasMore boolean — which is all an infinite scroll needs anyway.',
        hi: 'Kul count matlab badi table pe poora scan, aur wo aam taur pe khud page se mehnga hota hai. Ek andaaza do, usse chhod do, ya usse hasMore boolean se badal do — infinite scroll ko waise bhi bas yahi chahiye.',
      },
    },
    {
      heading: { en: 'Keep the response shape consistent', hi: 'Response ka roop ek jaisa rakho' },
      body: {
        en: 'Every paginated endpoint should return the same envelope, so a client can write one helper. Include links or a next cursor rather than making the client construct the next URL itself.',
        hi: 'Har paginated endpoint wahi lifafa de, taaki client ek hi helper likh sake. Links ya next cursor do, client se agla URL khud banwaane ki jagah.',
      },
    },
  ],
};
