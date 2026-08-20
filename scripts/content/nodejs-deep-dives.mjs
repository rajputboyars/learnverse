/*
 * Step-by-step walkthroughs for the Node.js interview questions.
 *
 * Same shape and intent as the javascript, react and typescript deep-dive
 * files: the short `answer` is what you say out loud, and this walks the
 * mechanism one step at a time.
 *
 * Keyed by the EXACT question text in `generalInterviewQuestions`. Unmatched
 * keys are reported at import time (see the bottom of nodejs.mjs).
 *
 * Each value is an ordered list of sections:
 *   heading { en, hi }  the step's title
 *   body    { en, hi }  what happens at this step, and why
 *   diagram             optional ASCII sketch, rendered as-is in monospace
 *   code                optional snippet
 *
 * The thread running through the whole file: Node is V8 plus libuv. Almost
 * every question here is really asking which of the two does the work, and
 * whether the work is I/O-bound (Node is excellent) or CPU-bound (Node is
 * the wrong tool unless you move it off the main thread).
 */

export const deepDives = {
  /* ─── Threading, the loop, and what Node is ───────────────── */

  'Is Node.js single-threaded or multi-threaded?': [
    {
      heading: { en: 'Your JavaScript is single-threaded; Node is not', hi: 'Tumhari JavaScript single-threaded hai; Node nahi' },
      body: {
        en: 'This is the distinction the question is testing. There is exactly one thread running your code, with one call stack. But the Node PROCESS runs several threads, and libuv keeps a thread pool doing work behind your back.',
        hi: 'Sawaal yahi farq jaanch raha hai. Tumhara code chalane wala bilkul ek thread hai, ek call stack ke saath. Par Node ka PROCESS kai threads chalata hai, aur libuv ek thread pool rakhta hai jo tumhare peeche kaam karta rehta hai.',
      },
      diagram: `Node process
├── main thread      your JS, the event loop           ← ONE
├── libuv pool       fs, dns, crypto, zlib             ← 4 by default
├── V8 threads       GC, JIT compilation
└── worker_threads   only if you create them`,
    },
    {
      heading: { en: 'Why one thread for JavaScript at all', hi: 'JavaScript ke liye ek hi thread kyun' },
      body: {
        en: 'No shared mutable state between threads means no locks, no race conditions on your variables, and no deadlocks. You give up parallel CPU work and get a programming model with an entire category of bug removed.',
        hi: 'Threads ke beech koi saanjhi badalti state nahi, matlab na locks, na tumhare variables pe race conditions, na deadlocks. Parallel CPU kaam chhod kar tumhe aisa model milta hai jisme bugs ki poori shreni hi khatam ho jaati hai.',
      },
    },
    {
      heading: { en: 'The libuv thread pool does real work', hi: 'libuv ka thread pool asli kaam karta hai' },
      body: {
        en: 'File system calls, DNS lookups, and the crypto and zlib functions run on the pool, not on your thread. It defaults to four threads, which is why four concurrent large file reads are fast and the fifth waits.',
        hi: 'File system calls, DNS lookups, aur crypto aur zlib ke functions pool pe chalte hain, tumhare thread pe nahi. Ye default se chaar threads ka hai, isiliye chaar bade file reads ek saath tez hote hain aur paanchwa intezaar karta hai.',
      },
      code: `process.env.UV_THREADPOOL_SIZE = 8;   // must be set before any I/O

// on the pool:  fs.readFile, dns.lookup, crypto.pbkdf2, zlib
// NOT on the pool: net sockets — the OS handles those with epoll/kqueue`,
    },
    {
      heading: { en: 'Network I/O does not use the pool at all', hi: 'Network I/O pool use karta hi nahi' },
      body: {
        en: 'A detail that separates a good answer. Sockets use the operating system\'s own event notification — epoll on Linux, kqueue on macOS, IOCP on Windows. That is why Node handles ten thousand connections without ten thousand threads.',
        hi: 'Ek detail jo achhe jawab ko alag karti hai. Sockets operating system ka apna event notification use karte hain — Linux pe epoll, macOS pe kqueue, Windows pe IOCP. Isiliye Node das hazaar connections bina das hazaar threads ke sambhaal leta hai.',
      },
    },
    {
      heading: { en: 'True parallelism is opt-in', hi: 'Asli parallelism opt-in hai' },
      body: {
        en: 'worker_threads gives you additional JavaScript threads, each with its own V8 isolate and event loop. The cluster module forks whole processes instead. Both are deliberate choices, not something Node does for you.',
        hi: 'worker_threads tumhe aur JavaScript threads deta hai, har ek ka apna V8 isolate aur event loop. cluster module poore processes fork karta hai. Dono soch-samajh kar liye gaye faisle hain, Node ye khud nahi karta.',
      },
      code: `const { Worker } = require('node:worker_threads');
new Worker('./heavy.js');    // its own thread, its own event loop`,
    },
    {
      heading: { en: 'The consequence you must name', hi: 'Wo nateeja jo batana zaroori hai' },
      body: {
        en: 'One thread for your code means one slow synchronous function blocks EVERY request, not just its own. This is the single most important practical fact about Node and the reason CPU-bound work needs a worker.',
        hi: 'Tumhare code ke liye ek thread matlab ek dheema synchronous function HAR request rok deta hai, sirf apni nahi. Node ke baare mein sabse zaroori vyavharik baat yahi hai aur isiliye CPU wale kaam ko worker chahiye.',
      },
      code: `app.get('/hash', (req, res) => {
  const h = bcrypt.hashSync(req.body.pw, 12);   // ✗ blocks everyone
  res.send(h);
});`,
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"JavaScript execution is single-threaded — one call stack, run to completion. The runtime is multi-threaded: libuv keeps a four-thread pool for file, DNS and crypto work, network I/O goes to the OS event notification system, and V8 runs GC on its own threads. For parallel JavaScript you opt in with worker_threads or cluster."',
        hi: '"JavaScript ka execution single-threaded hai — ek call stack, run to completion. Runtime multi-threaded hai: libuv file, DNS aur crypto ke liye chaar thread ka pool rakhta hai, network I/O OS ke event notification pe jaata hai, aur V8 GC apne threads pe chalata hai. Parallel JavaScript ke liye worker_threads ya cluster khud chunna padta hai."',
      },
    },
  ],

  'What is the difference between process.nextTick and setImmediate?': [
    {
      heading: { en: 'Neither name means what it says', hi: 'Dono ke naam apna matlab nahi bataate' },
      body: {
        en: 'Say this first — it is the fastest way to show you actually know. process.nextTick runs BEFORE the next tick of the loop, and setImmediate is not immediate; it runs in the check phase, after poll. The names are a historical mistake the Node team acknowledges.',
        hi: 'Pehle yahi kaho — ye dikhane ka sabse tez tareeka hai ki tumhe sach mein pata hai. process.nextTick loop ke agle tick se PEHLE chalta hai, aur setImmediate immediate nahi hai; wo poll ke baad check phase mein chalta hai. Naam ek aitihaasik galti hain jise Node team maanti hai.',
      },
    },
    {
      heading: { en: 'nextTick has the highest priority of anything', hi: 'nextTick ki priority sabse upar hai' },
      body: {
        en: 'The nextTick queue is drained after the current operation completes and before the event loop continues — ahead of promises, ahead of every phase. It is not part of the event loop at all; it runs between phases.',
        hi: 'nextTick ki queue maujooda operation khatam hone ke baad aur event loop ke aage badhne se pehle khaali hoti hai — promises se pehle, har phase se pehle. Ye event loop ka hissa hai hi nahi; ye phases ke beech chalta hai.',
      },
      diagram: `after each operation, before the loop continues:

  1  nextTick queue     drained COMPLETELY
  2  microtask queue    promises, drained completely
  3  the next phase of the event loop`,
    },
    {
      heading: { en: 'setImmediate is the check phase', hi: 'setImmediate check phase hai' },
      body: {
        en: 'It is a normal event loop phase that runs right after poll. So a setImmediate callback fires once per loop iteration, at a predictable point, and it always runs after any I/O callback queued in the same iteration.',
        hi: 'Ye ek aam event loop phase hai jo poll ke turant baad chalta hai. Toh setImmediate ka callback har loop iteration mein ek baar chalta hai, ek andaaze laayak jagah pe, aur hamesha usi iteration mein queue hue kisi bhi I/O callback ke baad.',
      },
      code: `process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
setImmediate(() => console.log('immediate'));
setTimeout(() => console.log('timeout'), 0);

// nextTick, promise, timeout, immediate`,
    },
    {
      heading: { en: 'At the top level the order is non-deterministic', hi: 'Top level pe order tay nahi hai' },
      body: {
        en: 'This catches people. setTimeout(0) versus setImmediate in the main module depends on how long process startup took — if the loop enters the timers phase after the 1ms threshold has passed, the timer wins; otherwise immediate does. Run it twice and you may see both orders.',
        hi: 'Yahan log phasate hain. Main module mein setTimeout(0) vs setImmediate is baat pe depend karta hai ki process shuru hone mein kitna samay laga — agar loop 1ms ki seema paar hone ke baad timers phase mein aaye toh timer jeetta hai, warna immediate. Do baar chalao toh dono order dikh sakte hain.',
      },
      code: `setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
// order varies between runs at the top level`,
    },
    {
      heading: { en: 'Inside an I/O callback the order IS guaranteed', hi: 'I/O callback ke andar order PAKKA hai' },
      body: {
        en: 'This is the reliable half, and the follow-up interviewers want. Inside an I/O callback you are already in the poll phase, so check comes next and setImmediate always fires before the timer.',
        hi: 'Ye bharosemand hissa hai, aur interviewers yahi follow-up chahte hain. I/O callback ke andar tum pehle se poll phase mein ho, toh check agla hai aur setImmediate hamesha timer se pehle chalta hai.',
      },
      code: `fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
// immediate, then timeout — every single time`,
    },
    {
      heading: { en: 'nextTick can starve the loop', hi: 'nextTick loop ko bhookha maar sakta hai' },
      body: {
        en: 'Because its queue is drained completely, a nextTick that schedules another nextTick loops forever and the event loop never advances. No I/O, no timers, no requests served — and the process is not even busy in a way that is obvious.',
        hi: 'Iski queue poori khaali hoti hai, isliye jo nextTick doosra nextTick schedule kare wo hamesha ghoomta rehta hai aur event loop kabhi aage nahi badhta. Na I/O, na timers, na koi request — aur process aisa vyast bhi nahi dikhta ki saaf pata chale.',
      },
      code: `function loop() { process.nextTick(loop); }
loop();      // ✗ the server stops responding entirely

function ok() { setImmediate(ok); }
ok();        // ✓ yields between iterations`,
    },
    {
      heading: { en: 'Which to use', hi: 'Kaunsa use karein' },
      body: {
        en: 'setImmediate almost always. Reach for nextTick only for the two things it was designed for: letting a caller attach handlers before you emit an event, and surfacing an error asynchronously but before any I/O. The Node docs themselves recommend setImmediate as the default.',
        hi: 'Lagbhag hamesha setImmediate. nextTick sirf un do cheezon ke liye lo jinke liye wo bana tha: caller ko event emit karne se pehle handlers lagane dena, aur error ko asynchronously par kisi bhi I/O se pehle upar laana. Node ke docs khud setImmediate ko default kehte hain.',
      },
      code: `class Thing extends EventEmitter {
  constructor() {
    super();
    process.nextTick(() => this.emit('ready'));   // ✓ listeners can attach
  }
}`,
    },
  ],

  'What is the purpose of the cluster module, and how does it differ from worker_threads?': [
    {
      heading: { en: 'Processes versus threads', hi: 'Processes vs threads' },
      body: {
        en: 'cluster forks whole Node PROCESSES, each with its own V8 instance, its own memory and its own event loop. worker_threads creates THREADS inside one process, which share the process but each get their own V8 isolate.',
        hi: 'cluster poore Node PROCESSES fork karta hai, har ek ka apna V8 instance, apni memory aur apna event loop. worker_threads ek hi process ke andar THREADS banata hai, jo process share karte hain par har ek ko apna V8 isolate milta hai.',
      },
      diagram: `cluster                        worker_threads
┌─ primary ─┐                  ┌─── one process ────┐
│ forks     │                  │ main thread        │
└─┬───┬───┬─┘                  │ ├ worker 1         │
  P1  P2  P3                   │ ├ worker 2         │
  separate memory              │ shared memory      │
  ~40MB each                   │ ~few MB each       │`,
    },
    {
      heading: { en: 'What cluster is for: using every core', hi: 'cluster kis liye hai: har core use karna' },
      body: {
        en: 'One Node process uses one core for JavaScript. On an eight-core machine that wastes seven of them. cluster forks one worker per core and the primary distributes incoming connections, so throughput scales with cores.',
        hi: 'Ek Node process JavaScript ke liye ek core use karta hai. Aath core wali machine pe saat barbaad hote hain. cluster har core pe ek worker fork karta hai aur primary aane wale connections baant deta hai, toh throughput cores ke saath badhta hai.',
      },
      code: `const cluster = require('node:cluster');
const os = require('node:os');

if (cluster.isPrimary) {
  for (let i = 0; i < os.availableParallelism(); i++) cluster.fork();
  cluster.on('exit', () => cluster.fork());      // restart a dead worker
} else {
  require('./server');
}`,
    },
    {
      heading: { en: 'How the load actually gets shared', hi: 'Load asal mein kaise banta hai' },
      body: {
        en: 'All workers listen on the same port because the primary creates the listening socket and passes it down. On Linux the default is round-robin from the primary; on Windows the OS decides, which can distribute unevenly.',
        hi: 'Saare workers ek hi port pe sunte hain kyunki primary listening socket banata hai aur usse neeche bhejta hai. Linux pe default primary se round-robin hai; Windows pe OS tay karta hai, jo asamaan baant sakta hai.',
      },
    },
    {
      heading: { en: 'What worker_threads is for: CPU work', hi: 'worker_threads kis liye hai: CPU ka kaam' },
      body: {
        en: 'A heavy synchronous computation on the main thread blocks every request. Move it to a worker and the main event loop stays free. Workers are for image processing, parsing a huge file, encryption, compression — not for handling requests.',
        hi: 'Main thread pe bhaari synchronous computation har request rok deta hai. Usse worker mein le jao aur main event loop khaali rehta hai. Workers image processing, bade file parsing, encryption, compression ke liye hain — requests sambhalne ke liye nahi.',
      },
      code: `const { Worker } = require('node:worker_threads');

app.get('/report', (req, res) => {
  const w = new Worker('./build-report.js', { workerData: req.query });
  w.on('message', (data) => res.json(data));    // ✓ loop stays free
});`,
    },
    {
      heading: { en: 'Memory is the sharpest difference', hi: 'Sabse tez farq memory ka hai' },
      body: {
        en: 'Cluster workers share nothing — each is a full Node process with its own heap, so eight workers means eight copies of your app in memory. Worker threads can share memory through SharedArrayBuffer, and passing a large buffer can be a transfer rather than a copy.',
        hi: 'Cluster ke workers kuch share nahi karte — har ek poora Node process hai apne heap ke saath, toh aath workers matlab memory mein tumhare app ki aath copies. Worker threads SharedArrayBuffer se memory share kar sakte hain, aur bada buffer bhejna copy nahi, transfer ho sakta hai.',
      },
      code: `w.postMessage(buf, [buf.buffer]);    // transferred, not copied`,
    },
    {
      heading: { en: 'The consequence for state', hi: 'State pe iska nateeja' },
      body: {
        en: 'With cluster, in-memory state is per worker. An in-process cache, a rate limiter counter or a session store will disagree between workers, and sticky sessions or a shared Redis becomes mandatory. This is the bug people hit the day they add clustering.',
        hi: 'cluster ke saath memory wali state har worker ki apni hoti hai. In-process cache, rate limiter ka counter ya session store workers ke beech alag-alag honge, aur sticky sessions ya saanjha Redis zaroori ho jaata hai. Clustering jodte hi log isi bug se takraate hain.',
      },
    },
    {
      heading: { en: 'And what you would actually do in production', hi: 'Aur production mein tum asal mein kya karoge' },
      body: {
        en: 'Often neither. In a containerised deployment you run one Node process per container and let Kubernetes or the platform scale horizontally — the orchestrator already does what cluster does, with better health checks and rolling restarts. Say this; it shows operational judgement.',
        hi: 'Aksar koi bhi nahi. Container wale deployment mein har container mein ek Node process chalao aur Kubernetes ya platform ko horizontally scale karne do — orchestrator wahi kaam pehle se karta hai jo cluster karta hai, behtar health checks aur rolling restarts ke saath. Ye kaho; isse operational samajh dikhti hai.',
      },
    },
  ],

  'How does Node.js handle CPU-bound vs I/O-bound tasks differently?': [
    {
      heading: { en: 'Node was built for one of the two', hi: 'Node in do mein se ek ke liye bana tha' },
      body: {
        en: 'I/O-bound work — waiting on a database, a network call, the disk — is where Node excels, because waiting costs it nothing. CPU-bound work is its weakest case, because there is one thread and computing occupies it completely.',
        hi: 'I/O wala kaam — database, network call, disk ka intezaar — wahan Node sabse achha hai, kyunki intezaar uska kuch nahi bigaadta. CPU wala kaam iska sabse kamzor pehlu hai, kyunki thread ek hai aur computation usse poora ghere rakhta hai.',
      },
      diagram: `I/O-bound     handed to libuv or the OS → thread free → scales
CPU-bound     runs ON the one thread → everything else waits`,
    },
    {
      heading: { en: 'Why I/O is free', hi: 'I/O muft kyun hai' },
      body: {
        en: 'When you call the database, Node hands the socket to the OS and returns immediately. The thread goes back to serving other requests, and the callback is queued when the response arrives. Ten thousand waiting connections cost almost no CPU.',
        hi: 'Jab tum database call karte ho, Node socket OS ko de deta hai aur turant laut aata hai. Thread doosri requests pe wapas chala jaata hai, aur response aane pe callback queue ho jaata hai. Das hazaar intezaar karte connections lagbhag koi CPU nahi lete.',
      },
      code: `app.get('/user', async (req, res) => {
  const u = await db.users.find(req.query.id);   // thread is free here
  res.json(u);
});`,
    },
    {
      heading: { en: 'Why CPU work is different', hi: 'CPU ka kaam alag kyun hai' },
      body: {
        en: 'There is nothing to hand off. A tight loop, a big JSON.parse, image resizing or a synchronous hash occupies the only thread, so every other request queues behind it. The server does not crash — it just stops responding.',
        hi: 'Saunpne ko kuch hai hi nahi. Ek kasa hua loop, bada JSON.parse, image resize ya synchronous hash us akele thread ko ghere leta hai, toh baaki har request uske peeche line mein lag jaati hai. Server crash nahi hota — bas jawab dena band kar deta hai.',
      },
      code: `app.get('/slow', (req, res) => {
  let n = 0;
  for (let i = 0; i < 1e10; i++) n += i;    // ✗ the whole server stalls
  res.send(String(n));
});`,
    },
    {
      heading: { en: 'The usual culprits', hi: 'Aam gunahgaar' },
      body: {
        en: 'Worth naming, because they hide in innocent-looking code. Synchronous crypto such as bcrypt.hashSync, JSON.parse on a multi-megabyte payload, a regex with catastrophic backtracking, image or PDF processing, and any large array sort or map inside a request handler.',
        hi: 'Naam lena zaroori hai, kyunki ye seedhe-saade dikhne wale code mein chhupe hote hain. bcrypt.hashSync jaisa synchronous crypto, kai megabyte ke payload pe JSON.parse, khatarnak backtracking wala regex, image ya PDF processing, aur request handler ke andar bade array ka koi bhi sort ya map.',
      },
    },
    {
      heading: { en: 'Fix one: use the async version', hi: 'Ilaaj ek: async version lo' },
      body: {
        en: 'The cheapest fix, and often overlooked. Several crypto and zlib functions have async forms that run on the libuv thread pool, so the main thread stays free with no architecture change at all.',
        hi: 'Sabse sasta ilaaj, aur aksar chhoot jaata hai. Kai crypto aur zlib functions ke async roop hain jo libuv ke thread pool pe chalte hain, toh main thread khaali rehta hai aur architecture bilkul nahi badalna padta.',
      },
      code: `bcrypt.hashSync(pw, 12);           // ✗ blocks the loop
await bcrypt.hash(pw, 12);          // ✓ runs on the thread pool

crypto.pbkdf2(pw, salt, 1e5, 64, 'sha512', cb);   // ✓ pool`,
    },
    {
      heading: { en: 'Fix two: move it off the thread', hi: 'Ilaaj do: usse thread se hatao' },
      body: {
        en: 'For genuine computation, a worker thread keeps the event loop free. For heavier or longer work, a job queue with separate worker processes is better still, because it survives a restart and can be scaled independently.',
        hi: 'Sach mein computation ho toh worker thread event loop khaali rakhta hai. Zyada bhaari ya lambe kaam ke liye alag worker processes wali job queue aur behtar hai, kyunki wo restart ke baad bhi bachti hai aur alag se scale hoti hai.',
      },
      code: `await queue.add('resize', { fileId });    // BullMQ, separate workers`,
    },
    {
      heading: { en: 'Fix three: yield in a long loop', hi: 'Ilaaj teen: lambe loop mein mauka do' },
      body: {
        en: 'If you must process a big array on the main thread, chunk it and yield with setImmediate between chunks. It is slower overall but the server keeps answering, which is usually what matters.',
        hi: 'Agar bada array main thread pe hi process karna pade, toh usse tukdon mein baanto aur beech mein setImmediate se mauka do. Kul milakar dheema hai par server jawab deta rehta hai, aur aam taur pe wahi maayne rakhta hai.',
      },
      code: `function process(items, i = 0) {
  const end = Math.min(i + 1000, items.length);
  for (; i < end; i++) doWork(items[i]);
  if (i < items.length) setImmediate(() => process(items, i));
}`,
    },
    {
      heading: { en: 'How to phrase it', hi: 'Kaise kehna hai' },
      body: {
        en: '"Node delegates I/O to libuv or the OS, so waiting is free and it scales to thousands of concurrent connections on one thread. CPU work runs on that same thread and blocks everything, so I either use the async variant, move it to a worker thread, push it to a job queue, or chunk it with setImmediate."',
        hi: '"Node I/O ko libuv ya OS ko saunp deta hai, isliye intezaar muft hai aur wo ek thread pe hazaaron connections tak scale karta hai. CPU ka kaam usi thread pe chalta hai aur sab kuch rok deta hai, isliye main ya toh async variant leta hoon, ya usse worker thread pe bhejta hoon, ya job queue pe, ya setImmediate se tukdon mein baant deta hoon."',
      },
    },
  ],

  'What is memory leak risk in long-running Node servers and how do you detect it?': [
    {
      heading: { en: 'A server runs for weeks, so small leaks matter', hi: 'Server hafton chalta hai, toh chhote leaks maayne rakhte hain' },
      body: {
        en: 'In a browser a leak is cleared by a page reload. A Node process may run for a month, so an object retained per request accumulates until the heap limit is hit and V8 kills the process with an out-of-memory error.',
        hi: 'Browser mein leak page reload se saaf ho jaata hai. Node ka process mahine bhar chal sakta hai, toh har request pe bacha rakha object jama hota rehta hai jab tak heap ki seema na aa jaaye aur V8 out-of-memory error ke saath process maar de.',
      },
    },
    {
      heading: { en: 'Cause one: a module-level collection that only grows', hi: 'Wajah ek: module-level collection jo sirf badhta hai' },
      body: {
        en: 'The most common leak by far. A cache, a map of sessions, an array of recent items — declared at module scope so it lives for the life of the process, and never evicted. It looks completely innocent in review.',
        hi: 'Sabse aam leak yahi hai. Koi cache, sessions ka map, haal ke items ka array — module scope pe declare kiya toh process ke saath jeeta hai, aur kabhi khaali nahi hota. Review mein ye bilkul bekasoor dikhta hai.',
      },
      code: `const cache = new Map();
app.get('/u/:id', (req, res) => {
  cache.set(req.params.id, buildUser(req.params.id));   // ✗ never evicted
});

const cache = new LRUCache({ max: 5000 });               // ✓ bounded`,
    },
    {
      heading: { en: 'Cause two: listeners and timers never removed', hi: 'Wajah do: listeners aur timers jo kabhi nahi hate' },
      body: {
        en: 'Adding a listener per request to a long-lived emitter retains its closure — and everything the closure references — forever. Node warns at eleven listeners, and that warning is almost always a real leak rather than a false alarm.',
        hi: 'Lambi umar wale emitter pe har request mein listener jodna uska closure — aur closure jo bhi reference kare — hamesha ke liye rok leta hai. Node gyaarah listeners pe chetavni deta hai, aur wo chetavni lagbhag hamesha asli leak hoti hai, jhoothi nahi.',
      },
      code: `// MaxListenersExceededWarning: Possible EventEmitter memory leak detected
emitter.on('x', handler);
emitter.off('x', handler);        // ✓ always pair them

const id = setInterval(poll, 1000);
clearInterval(id);                 // ✓`,
    },
    {
      heading: { en: 'Cause three: closures holding more than you think', hi: 'Wajah teen: closures jo soch se zyada pakadte hain' },
      body: {
        en: 'A callback stored somewhere keeps its entire enclosing scope alive. Store a per-request callback in a module-level array and you have retained the request, the response and any large body it parsed.',
        hi: 'Kahin rakha gaya callback apna poora aas-paas ka scope zinda rakhta hai. Har request ka callback module-level array mein rakho aur tumne request, response aur uska parse kiya bada body bhi rok liya.',
      },
    },
    {
      heading: { en: 'Detect it: watch the heap over time', hi: 'Pakdo: samay ke saath heap dekho' },
      body: {
        en: 'One measurement proves nothing. What matters is the trend: if heapUsed after each garbage collection keeps climbing over hours under steady load, you have a leak. A sawtooth that returns to the same floor is healthy.',
        hi: 'Ek naap kuch saabit nahi karti. Rujhaan maayne rakhta hai: agar sthir load mein har garbage collection ke baad heapUsed ghanton tak chadhta rahe, toh leak hai. Aisi aari-jaisi rekha jo har baar usi tal pe laute, sehatmand hai.',
      },
      code: `setInterval(() => {
  const m = process.memoryUsage();
  logger.info({ heapUsed: m.heapUsed, rss: m.rss });
}, 60_000);`,
    },
    {
      heading: { en: 'Then take heap snapshots and diff them', hi: 'Phir heap snapshots lo aur unhe milao' },
      body: {
        en: 'This is how you find the actual culprit. Take a snapshot, put the server under load, take another, and compare in Chrome DevTools. The comparison view shows which constructor gained the most objects, and the retainer path shows exactly what is holding them.',
        hi: 'Asli gunahgaar aise milta hai. Ek snapshot lo, server pe load daalo, doosra lo, aur Chrome DevTools mein milao. Comparison view dikhata hai kis constructor ke objects sabse zyada badhe, aur retainer path bilkul batata hai unhe kaun pakde hue hai.',
      },
      code: `node --inspect server.js       // then chrome://inspect

require('node:v8').writeHeapSnapshot('./heap-1.heapsnapshot');`,
    },
    {
      heading: { en: 'Know the difference between RSS and heap', hi: 'RSS aur heap ka farq jaano' },
      body: {
        en: 'A detail that impresses. Growing heapUsed is a JavaScript object leak. Growing RSS with a flat heap points at Buffers, native addons or external memory instead — a different problem with a different fix.',
        hi: 'Ek detail jo asar chhodti hai. heapUsed badhna JavaScript objects ka leak hai. RSS badhe par heap sthir rahe toh ishara Buffers, native addons ya external memory ki taraf hai — alag problem, alag ilaaj.',
      },
    },
    {
      heading: { en: 'And the operational safety net', hi: 'Aur operational suraksha jaal' },
      body: {
        en: 'While you investigate, set --max-old-space-size so the process fails predictably, and let the orchestrator restart it. That is a mitigation, not a fix, and you should say so — but it keeps the service up while you find the retainer.',
        hi: 'Jaanch ke dauraan --max-old-space-size set karo taaki process andaaze ke mutabik fail ho, aur orchestrator usse restart kar de. Ye ilaaj nahi, sirf bachaav hai, aur ye batana chahiye — par jab tak retainer milta hai tab tak service chalti rehti hai.',
      },
      code: `node --max-old-space-size=1024 server.js`,
    },
  ],

  'Why might you choose Express/Fastify over the raw http module?': [
    {
      heading: { en: 'The http module gives you a socket and a string', hi: 'http module tumhe ek socket aur ek string deta hai' },
      body: {
        en: 'It handles the HTTP protocol and nothing above it. There is no routing, no body parsing, no query parsing beyond the raw URL, no static files, no error handling. Everything you take for granted, you write.',
        hi: 'Wo HTTP protocol sambhaalta hai, uske upar kuch nahi. Na routing, na body parsing, na raw URL se aage query parsing, na static files, na error handling. Jo bhi tum maan kar chalte ho, wo tumhe likhna padta hai.',
      },
      code: `http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/users/')) {
    const id = req.url.split('/')[2];       // ✗ hand-rolled routing
  }
});`,
    },
    {
      heading: { en: 'Routing is the first thing you would rebuild', hi: 'Pehli cheez jo tum dobara banaoge wo routing hai' },
      body: {
        en: 'Matching a method and a path with parameters, in order, with a 404 fallback. Written by hand it is a growing chain of ifs and string splitting that gets wrong quickly — trailing slashes, query strings, encoded characters.',
        hi: 'Method aur parameters wala path, kram se match karna, aur 404 fallback. Haath se likho toh ye ifs aur string splitting ki badhti hui chain ban jaati hai jo jaldi galat hone lagti hai — trailing slashes, query strings, encoded characters.',
      },
      code: `app.get('/users/:id', handler);      // ✓ one line`,
    },
    {
      heading: { en: 'Then body parsing, and it is harder than it looks', hi: 'Phir body parsing, jo dikhne se mushkil hai' },
      body: {
        en: 'A request body arrives as a stream of chunks. You have to buffer it, enforce a size limit so a large upload cannot exhaust memory, handle the content type, and deal with a malformed payload. Getting the size limit wrong is a real denial-of-service hole.',
        hi: 'Request ka body chunks ki stream mein aata hai. Usse buffer karna padta hai, size ki seema lagani padti hai taaki bada upload memory na khatam kar de, content type sambhalna padta hai, aur kharaab payload bhi. Size limit galat rakhna asli denial-of-service ka chhed hai.',
      },
      code: `let body = '';
req.on('data', (c) => { body += c; });     // ✗ unbounded — a DoS
req.on('end', () => JSON.parse(body));      // ✗ throws on bad JSON

app.use(express.json({ limit: '1mb' }));    // ✓`,
    },
    {
      heading: { en: 'Middleware is the real structural win', hi: 'Asli dhaanchagat jeet middleware hai' },
      body: {
        en: 'A composable pipeline where auth, logging, rate limiting, CORS and validation each become one line applied consistently to every route. With the raw module, every one of those is a function you remember to call in every handler — and eventually forget in one.',
        hi: 'Ek jodne laayak pipeline jahan auth, logging, rate limiting, CORS aur validation har ek ek line ban jaate hain aur har route pe ek jaise lagte hain. Raw module ke saath, inme se har ek wo function hai jise tumhe har handler mein bulaana yaad rakhna hai — aur kisi ek mein bhool hi jaana hai.',
      },
      code: `app.use(helmet());
app.use(rateLimit({ max: 100 }));
app.use('/api', requireAuth);`,
    },
    {
      heading: { en: 'Error handling is the one people forget', hi: 'Jo log bhool jaate hain wo error handling hai' },
      body: {
        en: 'With the raw module, a throw inside a handler leaves the socket hanging until it times out. A framework has a central error handler that turns any thrown error into a response — and Express 5 finally propagates rejected promises from async handlers too.',
        hi: 'Raw module mein handler ke andar throw hone se socket timeout tak latka rehta hai. Framework mein ek central error handler hota hai jo kisi bhi phenke gaye error ko response bana deta hai — aur Express 5 aakhirkaar async handlers ke rejected promises bhi aage bhejta hai.',
      },
      code: `app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).json({ error: 'Internal error' });
});`,
    },
    {
      heading: { en: 'Express versus Fastify', hi: 'Express vs Fastify' },
      body: {
        en: 'Express is the default: the largest ecosystem, everyone knows it, and Express 5 fixed async error handling. Fastify is measurably faster, has schema-based validation and serialisation built in, and gives you TypeScript types from the schema. Pick Express for familiarity, Fastify when throughput or built-in validation matters.',
        hi: 'Express default hai: sabse bada ecosystem, sab jaante hain, aur Express 5 ne async error handling theek kar di. Fastify naapne laayak tez hai, usme schema-based validation aur serialisation built-in hai, aur schema se TypeScript types bhi milte hain. Jaan-pehchaan ke liye Express, throughput ya built-in validation ke liye Fastify.',
      },
    },
    {
      heading: { en: 'And when raw http IS right', hi: 'Aur raw http kab SAHI hai' },
      body: {
        en: 'A health-check endpoint in a sidecar, a tiny proxy, a library that should not force a framework on its users, or a case where you genuinely need control of the socket. Naming these shows judgement rather than reflex.',
        hi: 'Kisi sidecar mein health-check endpoint, chhota proxy, aisi library jo apne users pe framework na thope, ya aisa case jahan sach mein socket ka control chahiye. Inka naam lena aadat nahi, samajh dikhata hai.',
      },
    },
  ],

  'How do you securely manage secrets and configuration in a Node.js app?': [
    {
      heading: { en: 'Never in the repository', hi: 'Repository mein kabhi nahi' },
      body: {
        en: 'The first rule and the one most often broken. A secret committed to git is compromised permanently, because it lives in the history even after you delete the file. Rotating the secret is the only real remediation.',
        hi: 'Pehla rule aur sabse zyada toda jaane wala. git mein commit hua secret hamesha ke liye kharaab ho gaya, kyunki file hataane ke baad bhi wo history mein rehta hai. Uska asli ilaaj sirf secret badalna hai.',
      },
      code: `.env
.env.local
*.pem              # in .gitignore, from the first commit`,
    },
    {
      heading: { en: 'Environment variables are the baseline', hi: 'Environment variables buniyaad hain' },
      body: {
        en: 'Config comes from the environment, so the same image runs in dev, staging and production with different values. dotenv loads a local .env in development only — in production the platform injects the real values.',
        hi: 'Config environment se aati hai, toh wahi image dev, staging aur production mein alag values ke saath chalti hai. dotenv sirf development mein local .env padhta hai — production mein platform asli values deta hai.',
      },
      code: `node --env-file=.env server.js      // built in since Node 20

// or in code, dev only:
if (process.env.NODE_ENV !== 'production') require('dotenv').config();`,
    },
    {
      heading: { en: 'Validate config at startup, not at use', hi: 'Config shuruaat mein jaancho, upyog pe nahi' },
      body: {
        en: 'The highest-value habit here. Parse every variable through a schema when the process boots, so a missing or malformed value crashes immediately with a clear message — rather than surfacing as undefined in a database URL at three in the morning.',
        hi: 'Yahan sabse keemti aadat yahi hai. Process shuru hote hi har variable ko schema se parse karo, taaki gayab ya kharaab value turant saaf message ke saath crash kare — na ki raat teen baje kisi database URL mein undefined ban kar saamne aaye.',
      },
      code: `const Env = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  PORT: z.coerce.number().default(3000),
});
export const env = Env.parse(process.env);    // fails fast at boot`,
    },
    {
      heading: { en: 'Read process.env once', hi: 'process.env ek baar padho' },
      body: {
        en: 'Export a typed config object and import that everywhere. Reading process.env scattered through the codebase means no validation, no defaults, no types, and no single place to see what the app actually needs.',
        hi: 'Ek typed config object export karo aur har jagah wahi import karo. Poore codebase mein bikhra hua process.env padhna matlab na validation, na defaults, na types, aur na ek jagah jahan dikhe app ko sach mein kya chahiye.',
      },
    },
    {
      heading: { en: 'In production, use a secret manager', hi: 'Production mein secret manager use karo' },
      body: {
        en: 'Environment variables are visible in a process listing, in crash dumps and often in CI logs. AWS Secrets Manager, Vault, Doppler or the platform\'s own store give you encryption at rest, access control, an audit trail and rotation without a redeploy.',
        hi: 'Environment variables process listing mein, crash dumps mein aur aksar CI logs mein dikh jaate hain. AWS Secrets Manager, Vault, Doppler ya platform ka apna store encryption at rest, access control, audit trail aur bina redeploy ke rotation dete hain.',
      },
    },
    {
      heading: { en: 'Stop secrets leaking through logs and errors', hi: 'Logs aur errors se secrets nikalna band karo' },
      body: {
        en: 'The most common real-world leak is not an attacker — it is your own logger. Redact known keys, never log a whole request or config object, and never return a raw stack trace to a client.',
        hi: 'Asli duniya mein sabse aam leak hamlavar nahi — tumhara apna logger hota hai. Maloom keys redact karo, poori request ya config object kabhi log mat karo, aur client ko kachcha stack trace kabhi mat bhejo.',
      },
      code: `logger.info({ user });                    // ✗ may contain a token
pino({ redact: ['req.headers.authorization', '*.password'] });   // ✓`,
    },
    {
      heading: { en: 'And the operational habits', hi: 'Aur operational aadatein' },
      body: {
        en: 'Rotate on a schedule and after anyone with access leaves. Give each environment its own credentials so a staging leak cannot touch production. Scan for committed secrets in CI with gitleaks. And keep a .env.example listing the NAMES with no values, so a new developer knows what to set.',
        hi: 'Tay samay pe aur pahunch wale kisi ke jaane pe rotate karo. Har environment ko apne credentials do taaki staging ka leak production tak na pahunche. CI mein gitleaks se commit hue secrets scan karo. Aur ek .env.example rakho jisme sirf NAAM hon, values nahi, taaki naye developer ko pata ho kya set karna hai.',
      },
    },
  ],

  'What is backpressure in Node streams and why does it matter?': [
    {
      heading: { en: 'The reader is slower than the writer', hi: 'Padhne wala likhne wale se dheema hai' },
      body: {
        en: 'Backpressure is the signal a destination sends when it cannot keep up. Reading a file from a fast disk and writing it to a slow network is the classic case: data arrives faster than it can leave, and something has to hold the difference.',
        hi: 'Backpressure wo ishara hai jo manzil tab bhejti hai jab wo saath nahi de paati. Tez disk se file padh kar dheeme network pe likhna classic misaal hai: data nikalne se tez aata hai, aur farq kisi na kisi ko rakhna padta hai.',
      },
      diagram: `fast source ──►  [ buffer ]  ──► slow destination
   100 MB/s        grows            10 MB/s
                      │
                      └─ without backpressure this is your heap`,
    },
    {
      heading: { en: 'What happens if you ignore it', hi: 'Ignore karo toh kya hota hai' },
      body: {
        en: 'The buffer grows without limit until the process runs out of memory. This is not a slow degradation — it is a crash under exactly the conditions you care about, namely a large file or a slow client.',
        hi: 'Buffer bina seema badhta rehta hai jab tak process ki memory khatam na ho jaaye. Ye dheere-dheere kharaab hona nahi hai — ye theek unhi haalat mein crash hai jinki tumhe fikr hai, yaani badi file ya dheema client.',
      },
      code: `readable.on('data', (chunk) => {
  writable.write(chunk);      // ✗ ignores the return value
});
// a 2GB file into a slow socket → heap out of memory`,
    },
    {
      heading: { en: 'write() returns a boolean, and that is the signal', hi: 'write() boolean deta hai, aur wahi ishara hai' },
      body: {
        en: 'It returns false when the internal buffer has passed highWaterMark. That is the stream telling you to stop. Respect it by pausing the source, and resume when the drain event fires.',
        hi: 'Jab andar ka buffer highWaterMark paar kar leta hai tab wo false deta hai. Yahi stream ka tumhe rukne ka ishara hai. Source ko pause karke isse maano, aur drain event pe dobara chalao.',
      },
      code: `readable.on('data', (chunk) => {
  if (!writable.write(chunk)) readable.pause();
});
writable.on('drain', () => readable.resume());`,
    },
    {
      heading: { en: 'pipe and pipeline do this for you', hi: 'pipe aur pipeline ye tumhare liye karte hain' },
      body: {
        en: 'This is the answer you should lead with. pipe handles pause and resume automatically. pipeline does that AND propagates errors and destroys every stream on failure — which pipe does not, and that is a real file-descriptor leak.',
        hi: 'Jawab isi se shuru karna chahiye. pipe pause aur resume apne aap sambhaal leta hai. pipeline wo bhi karta hai AUR errors aage bhejta hai aur fail hone pe har stream destroy karta hai — jo pipe nahi karta, aur wo asli file-descriptor leak hai.',
      },
      code: `readable.pipe(writable);              // ✓ backpressure, ✗ error handling

await pipeline(readable, gzip, writable);   // ✓ both`,
    },
    {
      heading: { en: 'highWaterMark is the threshold', hi: 'Seema highWaterMark hai' },
      body: {
        en: 'It defaults to 64KB for byte streams and 16 objects for object mode. It is not a hard limit — write always accepts the chunk — it is the point at which the stream starts telling you to slow down.',
        hi: 'Byte streams ke liye ye default 64KB hai aur object mode mein 16 objects. Ye sakht seema nahi hai — write chunk hamesha le leta hai — ye wo bindu hai jahan se stream tumhe dheema hone ko kehna shuru karti hai.',
      },
    },
    {
      heading: { en: 'Where it bites in real applications', hi: 'Asli applications mein ye kahan kaat ta hai' },
      body: {
        en: 'Streaming a file download to a client on a slow mobile connection. Piping a database cursor into a CSV response. Proxying an upload to object storage. In every case the destination is slower than the source, and one client on bad wifi can take the process down.',
        hi: 'Dheeme mobile connection wale client ko file download stream karna. Database cursor ko CSV response mein bhejna. Upload ko object storage tak proxy karna. Har case mein manzil source se dheemi hai, aur kharaab wifi wala ek client poora process gira sakta hai.',
      },
    },
    {
      heading: { en: 'Async iteration also respects it', hi: 'Async iteration bhi isse maanti hai' },
      body: {
        en: 'Worth knowing as the modern form. for await over a readable applies backpressure naturally, because the loop does not request the next chunk until the body has finished — which reads far better than event handlers.',
        hi: 'Modern roop ke taur pe jaanne laayak. Kisi readable pe for await backpressure apne aap lagata hai, kyunki loop agla chunk tab tak nahi maangta jab tak body khatam na ho — aur ye event handlers se kahin behtar padha jaata hai.',
      },
      code: `for await (const chunk of readable) {
  await writeSomewhere(chunk);      // ✓ the source waits for you
}`,
    },
  ],

  'What is Node.js?': [
    {
      heading: { en: 'A runtime, not a language or a framework', hi: 'Ek runtime, na language na framework' },
      body: {
        en: 'Node.js is a runtime that lets JavaScript run outside a browser. It pairs V8, the engine from Chrome, with libuv, a C library that provides the event loop and asynchronous I/O — plus a standard library for files, networking and processes.',
        hi: 'Node.js ek runtime hai jo JavaScript ko browser ke bahar chalne deta hai. Ye V8 — Chrome ka engine — ko libuv ke saath jodta hai, jo ek C library hai aur event loop aur asynchronous I/O deti hai — saath mein files, networking aur processes ke liye standard library.',
      },
      diagram: `┌────────── Node.js ──────────┐
│  your JavaScript             │
│  ────────────────────────    │
│  Node standard library       │  fs, http, crypto, path…
│  ────────────────────────    │
│  V8            libuv         │  execution      event loop + I/O
└──────────────────────────────┘`,
    },
    {
      heading: { en: 'What V8 and libuv each do', hi: 'V8 aur libuv kya-kya karte hain' },
      body: {
        en: 'V8 parses and executes your JavaScript and manages memory. It knows nothing about files or sockets. libuv provides everything V8 does not: the event loop, the thread pool, file system access and cross-platform networking.',
        hi: 'V8 tumhari JavaScript parse aur execute karta hai aur memory sambhaalta hai. Usse files ya sockets ka kuch pata nahi. libuv wo sab deta hai jo V8 nahi deta: event loop, thread pool, file system access aur har platform pe chalne wali networking.',
      },
    },
    {
      heading: { en: 'The model: event-driven and non-blocking', hi: 'Model: event-driven aur non-blocking' },
      body: {
        en: 'Every I/O call returns immediately and the result arrives later through a callback, a promise or await. One thread therefore serves thousands of concurrent connections, because waiting occupies nothing.',
        hi: 'Har I/O call turant laut aata hai aur nateeja baad mein callback, promise ya await se aata hai. Isliye ek thread hazaaron connections sambhaal leta hai, kyunki intezaar kuch ghera nahi rakhta.',
      },
      code: `const data = await fs.promises.readFile('big.json');   // thread free
// versus a thread-per-request server, where the thread sleeps here`,
    },
    {
      heading: { en: 'Why it caught on', hi: 'Ye chal kyun pada' },
      body: {
        en: 'One language across the whole stack. Very high concurrency for I/O-heavy work on modest hardware. The largest package registry in existence. And a fast feedback loop, because there is no compile step.',
        hi: 'Poore stack mein ek hi language. Saadharan hardware pe I/O wale kaam ke liye bahut zyada concurrency. Duniya ki sabse badi package registry. Aur tez feedback, kyunki koi compile step hai hi nahi.',
      },
    },
    {
      heading: { en: 'What it is bad at', hi: 'Ye kis mein kharaab hai' },
      body: {
        en: 'CPU-bound work, because one thread runs your code and a heavy computation blocks every request. Also anything needing hard real-time guarantees. Naming the weakness makes the answer credible rather than promotional.',
        hi: 'CPU wala kaam, kyunki tumhara code ek thread pe chalta hai aur bhaari computation har request rok deta hai. Aur wo bhi jise sakht real-time guarantee chahiye. Kamzori batana jawab ko vigyapan nahi, bharosemand banata hai.',
      },
    },
    {
      heading: { en: 'Where you actually see it', hi: 'Ye asal mein kahan dikhta hai' },
      body: {
        en: 'REST and GraphQL APIs, real-time services over WebSockets, build tooling and CLIs, server-side rendering for React frameworks, and serverless functions. Almost all of those are I/O-bound, which is exactly where it fits.',
        hi: 'REST aur GraphQL APIs, WebSockets pe real-time services, build tooling aur CLIs, React frameworks ka server-side rendering, aur serverless functions. Inme se lagbhag sab I/O wale hain, aur wahi iski sahi jagah hai.',
      },
    },
  ],

  'Why is Node.js used?': [
    {
      heading: { en: 'One language for the whole stack', hi: 'Poore stack ke liye ek language' },
      body: {
        en: 'The reason teams pick it most often. The same people write the frontend and the backend, validation logic and types are shared rather than duplicated, and there is no context switch between two languages in one feature.',
        hi: 'Teams isse aksar isi wajah se chunti hain. Wahi log frontend aur backend likhte hain, validation logic aur types dohraaye nahi, share kiye jaate hain, aur ek hi feature mein do languages ke beech switch nahi karna padta.',
      },
    },
    {
      heading: { en: 'It handles concurrency cheaply', hi: 'Ye concurrency saste mein sambhaalta hai' },
      body: {
        en: 'A thread-per-request server allocates memory and a stack for every connection, so ten thousand idle connections is expensive. Node keeps them all on one thread with a callback each, so an idle connection costs almost nothing.',
        hi: 'Har request pe thread wala server har connection ke liye memory aur stack leta hai, toh das hazaar khaali connections mehnge hain. Node un sabko ek thread pe ek-ek callback ke saath rakhta hai, toh khaali connection ki lagbhag koi keemat nahi.',
      },
      diagram: `thread per request   10k connections × ~1MB stack  = ~10GB
Node                 10k connections × one callback = a few MB`,
    },
    {
      heading: { en: 'Which makes it right for I/O-heavy services', hi: 'Isse ye I/O wale services ke liye sahi ban jaata hai' },
      body: {
        en: 'An API that mostly waits on a database, calls other services, or streams data spends its time waiting rather than computing. That is the exact workload Node is built for, and it is most backend work.',
        hi: 'Aisi API jo zyadatar database ka intezaar karti hai, doosri services bulati hai, ya data stream karti hai, wo samay intezaar mein bitati hai, computation mein nahi. Node isi kaam ke liye bana hai, aur zyadatar backend kaam yahi hai.',
      },
    },
    {
      heading: { en: 'And for real-time', hi: 'Aur real-time ke liye' },
      body: {
        en: 'Chat, notifications, live dashboards and collaborative editing all need many long-lived open connections doing very little each. WebSockets on an event loop is a natural fit, which is why Socket.IO and similar grew up here.',
        hi: 'Chat, notifications, live dashboards aur milkar editing — sabko bahut saare lambi umar wale khule connections chahiye jo har ek bahut kam kaam karein. Event loop pe WebSockets iske liye swabhavik hai, isiliye Socket.IO jaisi cheezein yahin badhi.',
      },
    },
    {
      heading: { en: 'The ecosystem and the hiring pool', hi: 'Ecosystem aur hiring' },
      body: {
        en: 'npm is the largest package registry there is, so most problems have a maintained library. And anyone who writes frontend JavaScript can read the backend, which matters more for a small team than any benchmark.',
        hi: 'npm sabse badi package registry hai, toh zyadatar problems ki koi maintained library maujood hai. Aur jo bhi frontend JavaScript likhta hai wo backend padh sakta hai, jo chhoti team ke liye kisi bhi benchmark se zyada maayne rakhta hai.',
      },
    },
    {
      heading: { en: 'Say where it is the wrong choice', hi: 'Batao ye kahan galat chunav hai' },
      body: {
        en: 'CPU-heavy work such as video encoding, large-scale numerical computing or machine learning training belongs in Go, Rust or Python. Sustained high-throughput data processing usually does too. An answer that names the limits reads as experience rather than enthusiasm.',
        hi: 'CPU wala bhaari kaam jaise video encoding, bade paimane ki numerical computing ya machine learning training — wo Go, Rust ya Python mein hona chahiye. Lagataar high-throughput data processing bhi aam taur pe. Jo jawab seemayein bataye wo utsaah nahi, tajurba lagta hai.',
      },
    },
  ],

  'What are the features of Node.js?': [
    {
      heading: { en: 'Answer in groups, not as a list', hi: 'List nahi, groups mein jawab do' },
      body: {
        en: 'A recited list of ten bullet points sounds memorised. Group them: the execution model, the module system, the standard library, and the ecosystem. Then give one concrete example per group.',
        hi: 'Das bullet points ki ratti hui list yaad kiya hua lagta hai. Unhe group karo: execution model, module system, standard library, aur ecosystem. Phir har group ki ek thos misaal do.',
      },
    },
    {
      heading: { en: 'The execution model', hi: 'Execution model' },
      body: {
        en: 'Single-threaded JavaScript on an event loop, with non-blocking asynchronous I/O delegated to libuv and the OS. That combination is what gives high concurrency on one thread, and it is the defining feature everything else follows from.',
        hi: 'Event loop pe single-threaded JavaScript, aur non-blocking asynchronous I/O jo libuv aur OS ko saunpa jaata hai. Yahi jodi ek thread pe zyada concurrency deti hai, aur yahi wo mukhya feature hai jisse baaki sab nikalta hai.',
      },
    },
    {
      heading: { en: 'Modules and packages', hi: 'Modules aur packages' },
      body: {
        en: 'Both CommonJS and ES modules are supported. npm is the largest registry in existence, and npx runs a package without installing it. Workspaces handle a monorepo without extra tooling.',
        hi: 'CommonJS aur ES modules dono chalte hain. npm sabse badi registry hai, aur npx bina install kiye package chala deta hai. Workspaces bina extra tooling ke monorepo sambhaal lete hain.',
      },
    },
    {
      heading: { en: 'The standard library', hi: 'Standard library' },
      body: {
        en: 'fs for files, http and net for servers, crypto, path, os, stream, events, worker_threads and child_process. Enough to write a real server with no dependencies at all — which the raw-http question is really about.',
        hi: 'Files ke liye fs, servers ke liye http aur net, crypto, path, os, stream, events, worker_threads aur child_process. Itna kaafi hai ki bina kisi dependency ke asli server likh sako — aur raw-http wala sawaal asal mein isi ke baare mein hai.',
      },
    },
    {
      heading: { en: 'Streams and buffers', hi: 'Streams aur buffers' },
      body: {
        en: 'Worth calling out separately because it is what makes Node good with large data. Streams process data in chunks with backpressure, so a 5GB file uses megabytes of memory rather than gigabytes.',
        hi: 'Alag se batane laayak, kyunki bade data ke saath Node isi wajah se achha hai. Streams data ko backpressure ke saath tukdon mein chalate hain, toh 5GB ki file gigabytes nahi, megabytes memory leti hai.',
      },
    },
    {
      heading: { en: 'Scaling and cross-platform', hi: 'Scaling aur har platform pe chalna' },
      body: {
        en: 'cluster forks a process per core, worker_threads gives parallel JavaScript, and child_process runs other programs. libuv abstracts the OS, so the same code runs on Linux, macOS and Windows.',
        hi: 'cluster har core pe ek process fork karta hai, worker_threads parallel JavaScript deta hai, aur child_process doosre programs chalata hai. libuv OS ko chhupa deta hai, toh wahi code Linux, macOS aur Windows pe chalta hai.',
      },
    },
    {
      heading: { en: 'And the modern additions worth mentioning', hi: 'Aur zikr karne laayak nayi cheezein' },
      body: {
        en: 'A built-in test runner, a built-in watch mode, native .env file loading, and fetch available globally. Mentioning these signals that you follow current Node rather than the Node of five years ago.',
        hi: 'Built-in test runner, built-in watch mode, native .env loading, aur globally maujood fetch. Inka zikr batata hai ki tum aaj ka Node follow karte ho, paanch saal purana nahi.',
      },
      code: `node --test
node --watch server.js
node --env-file=.env server.js
await fetch(url);            // no node-fetch needed`,
    },
  ],

  'How does Node.js work?': [
    {
      heading: { en: 'Two pieces: V8 and libuv', hi: 'Do hisse: V8 aur libuv' },
      body: {
        en: 'Start here and the rest follows. V8 executes your JavaScript. libuv provides the event loop, the thread pool and all the I/O. Node is the glue plus a standard library on top.',
        hi: 'Yahin se shuru karo aur baaki apne aap samajh aata hai. V8 tumhari JavaScript chalata hai. libuv event loop, thread pool aur saara I/O deta hai. Node inhe jodne wala gaund hai, aur upar ek standard library.',
      },
      diagram: `your JS ──► V8 ──► call stack
                        │
                 async call
                        ▼
                     libuv ──► thread pool  (fs, dns, crypto)
                            └─► OS polling  (sockets)
                        │
                   callback queued
                        ▼
                  event loop ──► back onto the call stack`,
    },
    {
      heading: { en: 'Step one: your code runs to completion', hi: 'Pehla kadam: tumhara code poora chalta hai' },
      body: {
        en: 'Node loads the entry module and executes it top to bottom on the single main thread. Nothing asynchronous happens until that synchronous pass finishes — this is why a blocking loop at startup delays everything.',
        hi: 'Node entry module load karta hai aur usse ek hi main thread pe upar se neeche chalata hai. Jab tak wo synchronous chakkar khatam na ho, kuch bhi asynchronous nahi hota — isiliye shuruaat mein blocking loop sab kuch der kar deta hai.',
      },
    },
    {
      heading: { en: 'Step two: async calls are handed off', hi: 'Doosra kadam: async calls saunp diye jaate hain' },
      body: {
        en: 'When you call fs.readFile or start a network request, Node registers it with libuv and returns immediately. File, DNS and crypto work goes to the four-thread pool; sockets go to the OS notification system, epoll or kqueue or IOCP.',
        hi: 'Jab tum fs.readFile bulaate ho ya koi network request shuru karte ho, Node usse libuv ke paas register karke turant laut aata hai. File, DNS aur crypto ka kaam chaar-thread wale pool pe jaata hai; sockets OS ke notification system pe — epoll, kqueue ya IOCP.',
      },
    },
    {
      heading: { en: 'Step three: the event loop drains the phases', hi: 'Teesra kadam: event loop phases khaali karta hai' },
      body: {
        en: 'Once the synchronous code finishes, the loop starts cycling through its phases. Between every phase it drains the nextTick queue completely, then the promise microtask queue completely, before moving on.',
        hi: 'Synchronous code khatam hote hi loop apne phases mein ghoomna shuru karta hai. Har phase ke beech wo pehle nextTick queue poori khaali karta hai, phir promise wali microtask queue poori, tabhi aage badhta hai.',
      },
      diagram: `timers → pending → idle/prepare → POLL → check → close
   ▲                                                    │
   └────────────────────────────────────────────────────┘
   between every phase: nextTick queue, then microtasks`,
    },
    {
      heading: { en: 'Step four: callbacks run on your thread', hi: 'Chautha kadam: callbacks tumhare thread pe chalte hain' },
      body: {
        en: 'When libuv reports a completed operation, the loop pushes your callback onto the call stack and it runs to completion like any other function. So the I/O happened elsewhere, but YOUR code is still single-threaded.',
        hi: 'Jab libuv koi poora hua operation batata hai, loop tumhara callback call stack pe daal deta hai aur wo baaki functions ki tarah poora chalta hai. Toh I/O kahin aur hua, par TUMHARA code ab bhi single-threaded hai.',
      },
    },
    {
      heading: { en: 'And the loop exits when there is nothing left', hi: 'Aur kuch na bache toh loop nikal jaata hai' },
      body: {
        en: 'Node keeps running while any handle is active — an open server, a pending timer, an outstanding request. When the last one is gone the loop exits and the process ends. This is why a script with a listening server never terminates.',
        hi: 'Jab tak koi handle chaalu hai Node chalta rehta hai — khula server, pending timer, bachi hui request. Aakhri ke jaate hi loop nikal jaata hai aur process khatam ho jaata hai. Isiliye listening server wali script kabhi khatam nahi hoti.',
      },
    },
    {
      heading: { en: 'The one-paragraph version', hi: 'Ek paragraph wala roop' },
      body: {
        en: '"Node runs your JavaScript on V8 on a single thread. Asynchronous calls are handed to libuv, which uses a thread pool for file and crypto work and the OS notification system for sockets. When an operation completes, libuv queues the callback and the event loop pushes it back onto the single call stack — draining nextTick and microtasks between every phase."',
        hi: '"Node tumhari JavaScript V8 pe ek thread pe chalata hai. Asynchronous calls libuv ko saunpe jaate hain, jo file aur crypto ke liye thread pool aur sockets ke liye OS notification system use karta hai. Operation poora hone pe libuv callback queue karta hai aur event loop usse wapas usi ek call stack pe daal deta hai — har phase ke beech nextTick aur microtasks khaali karte hue."',
      },
    },
  ],

  /* ─── The toolchain: V8, npm, packages, project setup ─────── */

  'What is the V8 Engine?': [
    {
      heading: { en: "Google's JavaScript engine, written in C++", hi: 'Google ka JavaScript engine, C++ mein likha' },
      body: {
        en: 'V8 compiles and executes JavaScript. It powers Chrome, and Node embeds it to run JavaScript on a server. It also implements the ECMAScript standard and manages memory — and nothing else.',
        hi: 'V8 JavaScript compile aur execute karta hai. Chrome isi pe chalta hai, aur Node isse server pe JavaScript chalane ke liye apne andar rakhta hai. Ye ECMAScript standard bhi implement karta hai aur memory sambhaalta hai — aur bas.',
      },
    },
    {
      heading: { en: 'It is a compiler, not an interpreter', hi: 'Ye compiler hai, interpreter nahi' },
      body: {
        en: 'The common misconception. V8 parses your source into an AST, Ignition turns that into bytecode for fast startup, and TurboFan recompiles frequently-run functions into optimised machine code based on the types it has observed.',
        hi: 'Aam galatfehmi. V8 source ko AST mein parse karta hai, Ignition usse tez shuruaat ke liye bytecode banata hai, aur TurboFan baar-baar chalne wale functions ko dekhe gaye types ke aadhaar pe optimised machine code mein badal deta hai.',
      },
      diagram: `source → parser → AST → Ignition → bytecode → run
                                   │  function is hot
                                   ▼
                              TurboFan → machine code
                                   │  a type assumption broke
                                   ▼
                              deoptimise, back to bytecode`,
    },
    {
      heading: { en: 'Which is why consistent types are faster', hi: 'Isiliye ek jaise types tez hote hain' },
      body: {
        en: 'TurboFan optimises on the assumption that a function keeps seeing the same shapes. Pass a string where it has always seen a number and V8 deoptimises and falls back to bytecode. Stable object shapes and stable types genuinely matter for hot code.',
        hi: 'TurboFan ye maan kar optimise karta hai ki function ko wahi shapes milte rahenge. Jahan hamesha number tha wahan string bhejo aur V8 deoptimise karke bytecode pe laut aata hai. Hot code ke liye sthir object shapes aur sthir types sach mein maayne rakhte hain.',
      },
      code: `function add(a, b) { return a + b; }
add(1, 2); add(3, 4);      // optimised for numbers
add('a', 'b');              // ✗ deoptimises`,
    },
    {
      heading: { en: 'It manages memory with a generational GC', hi: 'Ye generational GC se memory sambhaalta hai' },
      body: {
        en: 'V8 splits the heap into a small young generation, scavenged frequently and cheaply, and a large old generation collected less often with a fuller mark-sweep-compact pass. Most objects die young, which is what makes this fast.',
        hi: 'V8 heap ko chhoti young generation mein baantta hai, jo baar-baar aur saste mein saaf hoti hai, aur badi old generation mein, jo kam baar poore mark-sweep-compact se saaf hoti hai. Zyadatar objects jaldi mar jaate hain, isi se ye tez hai.',
      },
      code: `node --max-old-space-size=2048 server.js    // raise the heap limit`,
    },
    {
      heading: { en: 'What V8 does NOT do', hi: 'V8 kya NAHI karta' },
      body: {
        en: 'The distinction that matters in a Node interview. V8 has no file system, no network, no timers and no event loop. Every one of those comes from libuv and the Node standard library — V8 only runs the language.',
        hi: 'Node ke interview mein yahi farq maayne rakhta hai. V8 mein na file system hai, na network, na timers, na event loop. Ye sab libuv aur Node ki standard library se aate hain — V8 sirf language chalata hai.',
      },
    },
    {
      heading: { en: 'The other engines, briefly', hi: 'Baaki engines, sankshep mein' },
      body: {
        en: 'SpiderMonkey in Firefox, JavaScriptCore in Safari and Bun. Deno uses V8 like Node does. Knowing that Node is not tied to V8 by definition — Node once had experimental ChakraCore support — is a nice extra.',
        hi: 'Firefox mein SpiderMonkey, Safari aur Bun mein JavaScriptCore. Deno Node ki tarah V8 use karta hai. Ye jaanna ki Node paribhasha se V8 se bandha nahi hai — Node mein kabhi experimental ChakraCore support tha — ek achha extra hai.',
      },
    },
  ],

  'What is npm?': [
    {
      heading: { en: 'Two things with one name', hi: 'Ek naam, do cheezein' },
      body: {
        en: 'npm is the public REGISTRY where packages are published, and it is the command-line CLIENT that installs from it and ships with Node. People say npm meaning either, so say which you mean.',
        hi: 'npm wo public REGISTRY hai jahan packages publish hote hain, aur wo command-line CLIENT bhi hai jo wahan se install karta hai aur Node ke saath aata hai. Log dono ke liye npm kehte hain, toh batao tum kaunsa keh rahe ho.',
      },
    },
    {
      heading: { en: 'What the CLI actually does', hi: 'CLI asal mein karta kya hai' },
      body: {
        en: 'Resolves the dependency tree from package.json, downloads the tarballs, writes node_modules, records the exact resolution in package-lock.json, and runs lifecycle scripts. The lock file is the part people forget it is doing.',
        hi: 'package.json se dependency tree nikaalta hai, tarballs download karta hai, node_modules banata hai, theek resolution package-lock.json mein likhta hai, aur lifecycle scripts chalata hai. Lock file wala hissa log bhool jaate hain.',
      },
      code: `npm install            # from package.json, updates the lock
npm ci                 # from the lock file only — for CI
npm run build          # a script from package.json
npm outdated           # what has newer versions
npm audit              # known vulnerabilities`,
    },
    {
      heading: { en: 'install versus ci — the difference that matters', hi: 'install vs ci — jo farq maayne rakhta hai' },
      body: {
        en: 'npm install may update the lock file to satisfy a range, so two machines can end up with different versions. npm ci deletes node_modules and installs exactly what the lock says, failing if the lock and package.json disagree. Always ci in a pipeline.',
        hi: 'npm install kisi range ko poora karne ke liye lock file badal sakta hai, toh do machines pe alag versions aa sakte hain. npm ci node_modules mita kar bilkul wahi install karta hai jo lock kehta hai, aur lock aur package.json na milein toh fail ho jaata hai. Pipeline mein hamesha ci.',
      },
    },
    {
      heading: { en: 'Scripts are the part you use most', hi: 'Jo sabse zyada use hota hai wo scripts hain' },
      body: {
        en: 'A script runs with node_modules/.bin on the PATH, so you can call a locally installed binary by name. pre and post hooks run automatically around a named script.',
        hi: 'Script chalte waqt node_modules/.bin PATH pe hota hai, toh locally install kiya binary naam se bula sakte ho. Kisi script ke aas-paas pre aur post hooks apne aap chalte hain.',
      },
      code: `"scripts": {
  "dev": "next dev",
  "test": "vitest",
  "pretest": "tsc --noEmit"      // runs automatically before test
}`,
    },
    {
      heading: { en: 'The alternatives, and why they exist', hi: 'Vikalp, aur wo kyun hain' },
      body: {
        en: 'pnpm uses a content-addressed store and symlinks, so disk usage is far lower and a package cannot import something it did not declare. Yarn added workspaces and Plug and Play. npm has since caught up on speed and workspaces, so the gap is smaller than it was.',
        hi: 'pnpm content-addressed store aur symlinks use karta hai, toh disk bahut kam lagta hai aur koi package wo cheez import nahi kar sakta jo usne declare nahi ki. Yarn ne workspaces aur Plug and Play diye. npm ab speed aur workspaces mein kaafi paas aa gaya hai, toh farq pehle jitna nahi raha.',
      },
    },
    {
      heading: { en: 'And the supply-chain caution', hi: 'Aur supply-chain wali chetavni' },
      body: {
        en: 'A package can run arbitrary code in a postinstall script, and a small dependency can pull in a hundred more. Use npm ci, review what a new dependency brings with it, and consider --ignore-scripts in CI where you can.',
        hi: 'Koi package postinstall script mein kuch bhi chala sakta hai, aur ek chhoti dependency sau aur kheench sakti hai. npm ci use karo, nayi dependency ke saath kya aa raha hai wo dekho, aur CI mein jahan ho sake --ignore-scripts socho.',
      },
    },
  ],

  'What is npx?': [
    {
      heading: { en: 'Run a package binary without installing it', hi: 'Bina install kiye package ka binary chalao' },
      body: {
        en: 'npx executes a command from a package, fetching it temporarily if it is not already present. It ships with npm and exists so you do not have to install a one-off tool globally.',
        hi: 'npx kisi package ka command chalata hai, aur agar wo maujood nahi toh usse thodi der ke liye laa deta hai. Ye npm ke saath aata hai aur isliye hai ki ek baar ke tool ko globally install na karna pade.',
      },
      code: `npx create-next-app@latest my-app
npx eslint .
npx prettier --write .`,
    },
    {
      heading: { en: 'It checks locally first', hi: 'Ye pehle locally dekhta hai' },
      body: {
        en: 'The lookup order matters. npx uses node_modules/.bin from the project if the binary is there, so you get the version pinned in your package.json rather than whatever is newest on the registry.',
        hi: 'Dhoondhne ka kram maayne rakhta hai. Binary project mein ho toh npx node_modules/.bin se leta hai, toh tumhe package.json mein tay version milta hai, registry ka sabse naya nahi.',
      },
      diagram: `npx eslint
  1  ./node_modules/.bin/eslint        ← project version, preferred
  2  a globally installed eslint
  3  download it temporarily and run`,
    },
    {
      heading: { en: 'Why global installs went out of fashion', hi: 'Global installs ka chalan kyun gaya' },
      body: {
        en: 'A globally installed CLI drifts from the version the project expects, and two projects needing different versions conflict. npx removes the problem: every run uses either the project version or a fresh one.',
        hi: 'Globally install kiya CLI us version se alag ho jaata hai jo project chahta hai, aur alag versions maangne wale do projects takra jaate hain. npx ye problem hi khatam kar deta hai: har run ya toh project ka version leta hai ya naya.',
      },
    },
    {
      heading: { en: 'Pin the version for a scaffolder', hi: 'Scaffolder ka version tay karo' },
      body: {
        en: 'A cached older copy is a common source of confusion when a tutorial does not match what you get. Adding @latest or an explicit version makes the run reproducible.',
        hi: 'Cache mein padi purani copy uljhan ki aam wajah hai jab tutorial aur tumhara nateeja na milein. @latest ya saaf version lagane se run dobara wahi nateeja deta hai.',
      },
      code: `npx create-react-app my-app          # may use a cached old copy
npx create-react-app@latest my-app    # ✓ explicit`,
    },
    {
      heading: { en: 'And the security note', hi: 'Aur security wali baat' },
      body: {
        en: 'npx downloads and executes code from the registry. Typo a package name and you may run someone else\'s. Check the name, and prefer a project dependency plus an npm script for anything you run repeatedly.',
        hi: 'npx registry se code download karke chalata hai. Package ka naam galat likho aur kisi aur ka code chal sakta hai. Naam jaancho, aur jo cheez baar-baar chalani ho uske liye project dependency aur npm script behtar hai.',
      },
    },
  ],

  'What is the difference between Node.js and JavaScript?': [
    {
      heading: { en: 'A language versus a place to run it', hi: 'Ek language, doosri usse chalane ki jagah' },
      body: {
        en: 'JavaScript is the language, defined by the ECMAScript specification. Node.js is a runtime that executes it outside a browser. Asking which is faster or better is a category error — one is the other\'s host.',
        hi: 'JavaScript language hai, jo ECMAScript specification se tay hoti hai. Node.js ek runtime hai jo usse browser ke bahar chalata hai. Kaun tez ya behtar hai poochna hi galat shreni hai — ek doosre ka ghar hai.',
      },
    },
    {
      heading: { en: 'The language is the same in both places', hi: 'Language dono jagah wahi hai' },
      body: {
        en: 'Syntax, types, closures, promises, classes, array methods — all defined by ECMAScript and identical in a browser and in Node. What differs is everything AROUND the language.',
        hi: 'Syntax, types, closures, promises, classes, array methods — sab ECMAScript se tay hain aur browser aur Node dono mein ek jaise. Farq language ke AAS-PAAS ki har cheez mein hai.',
      },
    },
    {
      heading: { en: 'What each environment adds', hi: 'Har environment kya jodta hai' },
      body: {
        en: 'The browser adds the DOM, window, localStorage and the rest of the Web APIs. Node adds the file system, processes, raw sockets, Buffers and its own module system. Neither set is part of JavaScript itself.',
        hi: 'Browser DOM, window, localStorage aur baaki Web APIs jodta hai. Node file system, processes, kachche sockets, Buffers aur apna module system jodta hai. Ye dono set JavaScript ka hissa nahi hain.',
      },
      diagram: `                    browser          Node
DOM, window            yes             no
localStorage           yes             no
fs, path, os           no              yes
Buffer, process        no              yes
global object          window          globalThis / global
fetch, setTimeout      yes             yes (both now)`,
    },
    {
      heading: { en: 'The practical consequences', hi: 'Vyavharik nateeje' },
      body: {
        en: 'Browser code touching document crashes in Node. Node code touching fs crashes in a browser. This is exactly why server-side rendering needs guards, and why a hydration mismatch happens when a component reads localStorage during render.',
        hi: 'document chhoone wala browser code Node mein crash karta hai. fs chhoone wala Node code browser mein crash karta hai. Isiliye server-side rendering mein guards chahiye, aur isiliye jab koi component render ke dauraan localStorage padhta hai tab hydration mismatch hota hai.',
      },
      code: `if (typeof window !== 'undefined') { /* browser only */ }
if (typeof process !== 'undefined') { /* Node only */ }`,
    },
    {
      heading: { en: 'And the answer in one line', hi: 'Aur jawab ek line mein' },
      body: {
        en: '"JavaScript is the language; Node.js is a runtime that runs it on a server. The language is identical in both — what differs is the APIs the host provides: the DOM in a browser, the file system and processes in Node."',
        hi: '"JavaScript language hai; Node.js ek runtime hai jo usse server pe chalata hai. Language dono mein wahi hai — farq un APIs mein hai jo host deta hai: browser mein DOM, Node mein file system aur processes."',
      },
    },
  ],

  'What is the difference between Node.js and Express.js?': [
    {
      heading: { en: 'A runtime and a library that runs on it', hi: 'Ek runtime, aur uspe chalne wali library' },
      body: {
        en: 'Node.js is the runtime; Express is an npm package you install into it. Express cannot exist without Node, and Node does not need Express. They are not alternatives.',
        hi: 'Node.js runtime hai; Express ek npm package hai jo tum usme install karte ho. Express Node ke bina ho hi nahi sakta, aur Node ko Express ki zaroorat nahi. Ye vikalp nahi hain.',
      },
      diagram: `your app
   │
Express            a routing and middleware layer
   │
Node http module   the protocol
   │
libuv + V8         the runtime`,
    },
    {
      heading: { en: 'What Node gives you already', hi: 'Node pehle se kya deta hai' },
      body: {
        en: 'The http module can create a working server on its own — it parses the request line and headers and gives you a request and response object. Everything above the protocol is missing.',
        hi: 'http module khud ek chalta hua server bana sakta hai — wo request line aur headers parse karta hai aur tumhe request aur response object deta hai. Protocol ke upar ka sab kuch gayab hai.',
      },
      code: `require('node:http').createServer((req, res) => {
  res.end('ok');
}).listen(3000);        // a real server, with no framework`,
    },
    {
      heading: { en: 'What Express adds on top', hi: 'Express upar se kya jodta hai' },
      body: {
        en: 'Routing by method and path with parameters. A middleware pipeline. Body and query parsing. Static file serving. A central error handler. Every one of those is something you would otherwise write yourself and get subtly wrong.',
        hi: 'Method aur parameters wale path se routing. Middleware pipeline. Body aur query parsing. Static files. Ek central error handler. Inme se har ek wo cheez hai jise warna tum khud likhte aur sookshm taur pe galat kar dete.',
      },
      code: `app.get('/users/:id', auth, async (req, res) => {
  res.json(await db.users.find(req.params.id));
});`,
    },
    {
      heading: { en: 'Express is thin on purpose', hi: 'Express jaan-boojh kar patla hai' },
      body: {
        en: 'It is unopinionated: no ORM, no validation, no project structure, no auth. You assemble those. That flexibility is why it spread, and also why two Express codebases can look nothing alike.',
        hi: 'Ye koi raay nahi thopta: na ORM, na validation, na project structure, na auth. Tum ye khud jodte ho. Isi lachak se ye faila, aur isiliye do Express codebases bilkul alag dikh sakte hain.',
      },
    },
    {
      heading: { en: 'The alternatives worth naming', hi: 'Naam lene laayak vikalp' },
      body: {
        en: 'Fastify for speed and schema-based validation. NestJS when you want an enforced structure with dependency injection. Hono for edge runtimes. Koa from the same authors as Express, built on async middleware.',
        hi: 'Speed aur schema-based validation ke liye Fastify. Dependency injection ke saath lagoo structure chahiye toh NestJS. Edge runtimes ke liye Hono. Express ke hi lekhakon ka Koa, jo async middleware pe bana hai.',
      },
    },
    {
      heading: { en: 'One line to close it', hi: 'Band karne ki ek line' },
      body: {
        en: '"Node is the runtime that executes JavaScript on the server and provides the http module. Express is a framework on top of that module that adds routing, middleware and body parsing. You can build a server without Express, but you would end up writing a worse version of it."',
        hi: '"Node wo runtime hai jo server pe JavaScript chalata hai aur http module deta hai. Express usi module ke upar ek framework hai jo routing, middleware aur body parsing jodta hai. Bina Express ke server bana sakte ho, par ant mein tum uska hi ek kharaab version likh rahe hoge."',
      },
    },
  ],

  'What are Node.js modules?': [
    {
      heading: { en: 'A file is a module, with its own scope', hi: 'Har file ek module hai, apne scope ke saath' },
      body: {
        en: 'Every file in Node has a private scope. Nothing leaks to the global object, and other files see only what you explicitly export. That is the whole idea, and it is why Node avoided the global-namespace problem the browser had for years.',
        hi: 'Node mein har file ka apna private scope hota hai. Kuch bhi global object pe nahi jaata, aur doosri files sirf wahi dekhti hain jo tum explicitly export karo. Poora idea yahi hai, aur isiliye Node us global-namespace ki problem se bacha jo browser mein saalon rahi.',
      },
    },
    {
      heading: { en: 'Three kinds', hi: 'Teen prakaar' },
      body: {
        en: 'Core modules that ship with Node such as fs and http. Local modules — your own files, imported by relative path. And third-party modules installed into node_modules from npm.',
        hi: 'Core modules jo Node ke saath aate hain jaise fs aur http. Local modules — tumhari apni files, relative path se import ki hui. Aur third-party modules jo npm se node_modules mein install hote hain.',
      },
      code: `const fs = require('node:fs');       // core
const util = require('./util');       // local — note the ./
const express = require('express');    // from node_modules`,
    },
    {
      heading: { en: 'CommonJS: require and module.exports', hi: 'CommonJS: require aur module.exports' },
      body: {
        en: 'The original system. require is a synchronous function call, so it can be conditional or built from a variable. module.exports is a plain object you assign to, and the result is cached after the first load.',
        hi: 'Asli system. require ek synchronous function call hai, toh wo shart pe ya variable se ban sakta hai. module.exports ek saada object hai jisme tum assign karte ho, aur pehli baar load hone ke baad nateeja cache ho jaata hai.',
      },
      code: `module.exports = { add, subtract };
module.exports.add = add;
const { add } = require('./math');`,
    },
    {
      heading: { en: 'ES modules: import and export', hi: 'ES modules: import aur export' },
      body: {
        en: 'The standard, and what you should write in new code. Imports are static and hoisted, resolved before any module body runs. That is what makes tree shaking and top-level await possible.',
        hi: 'Standard, aur naye code mein yahi likhna chahiye. Imports static aur hoisted hain, kisi bhi module body ke chalne se pehle resolve ho jaate hain. Isi se tree shaking aur top-level await mumkin hote hain.',
      },
      code: `export function add(a, b) { return a + b; }
export default thing;
import thing, { add } from './math.js';    // ✓ extension required`,
    },
    {
      heading: { en: 'A module runs once and is cached', hi: 'Module ek baar chalta hai aur cache ho jaata hai' },
      body: {
        en: 'The body executes the first time it is loaded and the result is reused for every later import. That is why a module-level object behaves as a singleton across your whole app — useful for a database pool, and a trap for anything you expected to be fresh.',
        hi: 'Body pehli baar load hone pe chalti hai aur nateeja har baad ke import mein dobara use hota hai. Isiliye module-level object poore app mein singleton jaisa chalta hai — database pool ke liye kaam ka, aur har us cheez ke liye jaal jise tum naya samajh rahe the.',
      },
      code: `// db.js runs once, no matter how many files import it
export const pool = createPool();`,
    },
    {
      heading: { en: 'The wrapper that explains the module globals', hi: 'Wo wrapper jo module ke globals samjhaata hai' },
      body: {
        en: 'Node wraps every CommonJS file in a function, which is where exports, require, module, __filename and __dirname come from. They are parameters, not globals — and that is why they do not exist in an ES module.',
        hi: 'Node har CommonJS file ko ek function mein lapet deta hai, aur wahin se exports, require, module, __filename aur __dirname aate hain. Ye parameters hain, globals nahi — aur isiliye ES module mein ye hote hi nahi.',
      },
      code: `(function (exports, require, module, __filename, __dirname) {
  // your file goes here
});

import.meta.dirname;      // ✓ the ESM equivalent, Node 20.11+`,
    },
  ],

  'What are the built-in modules in Node.js?': [
    {
      heading: { en: 'Group them rather than listing them', hi: 'List nahi, group karo' },
      body: {
        en: 'There are dozens, and reciting names sounds memorised. Group by purpose — file system, networking, process, utility, crypto — and name the two or three you actually use in each.',
        hi: 'Darjanon hain, aur naam sunana yaad kiya hua lagta hai. Maqsad se group karo — file system, networking, process, utility, crypto — aur har ek mein wo do-teen batao jo tum sach mein use karte ho.',
      },
      diagram: `files       fs, path
network     http, https, net, dns, url
process     process, os, child_process, cluster, worker_threads
data        stream, buffer, zlib
utility     events, util, timers, assert
security    crypto`,
    },
    {
      heading: { en: 'The ones you will use every day', hi: 'Jo roz use hoge' },
      body: {
        en: 'fs for files, path for building paths safely across platforms, http for servers, crypto for hashing and random values, and events because EventEmitter is the base class for streams, sockets and much of Node itself.',
        hi: 'Files ke liye fs, har platform pe safe paths banane ke liye path, servers ke liye http, hashing aur random values ke liye crypto, aur events kyunki EventEmitter streams, sockets aur Node ke bade hisse ka base class hai.',
      },
      code: `const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');`,
    },
    {
      heading: { en: 'Use the node: prefix', hi: 'node: prefix use karo' },
      body: {
        en: 'It makes the import unambiguous and immune to a malicious npm package shadowing a core module name. It is required for some newer built-ins, and it is the current recommendation.',
        hi: 'Isse import saaf ho jaata hai aur koi kharaab npm package core module ke naam ko dhak nahi sakta. Kuch naye built-ins ke liye ye zaroori bhi hai, aur aaj yahi salaah hai.',
      },
      code: `require('node:fs');           // ✓ unambiguous
import fs from 'node:fs';      // ✓`,
    },
    {
      heading: { en: 'Prefer the promises variants', hi: 'promises wale roop behtar hain' },
      body: {
        en: 'Most callback-based core APIs have a promise version, which reads better with async/await and avoids the error-first callback shape entirely.',
        hi: 'Zyadatar callback wale core APIs ka promise version hai, jo async/await ke saath behtar padha jaata hai aur error-first callback wale dhaanche se poori tarah bacha leta hai.',
      },
      code: `const fs = require('node:fs/promises');
const dns = require('node:dns/promises');
const { setTimeout: sleep } = require('node:timers/promises');

await sleep(1000);`,
    },
    {
      heading: { en: 'And the modern ones worth naming', hi: 'Aur naye jinke naam lene laayak hain' },
      body: {
        en: 'node:test for the built-in test runner, worker_threads for parallel JavaScript, and globally available fetch, AbortController and structuredClone. Mentioning these shows you follow current Node.',
        hi: 'Built-in test runner ke liye node:test, parallel JavaScript ke liye worker_threads, aur globally maujood fetch, AbortController aur structuredClone. Inka zikr batata hai ki tum aaj ka Node follow karte ho.',
      },
      code: `import { test } from 'node:test';
import assert from 'node:assert/strict';`,
    },
  ],

  'What is package.json?': [
    {
      heading: { en: 'The manifest for the project', hi: 'Project ka manifest' },
      body: {
        en: 'It declares the project name and version, what it depends on, what scripts it can run, and how it should be loaded. Every npm command reads it, and it is the file that makes a directory a package.',
        hi: 'Ye project ka naam aur version, uski dependencies, chalne wale scripts, aur load hone ka tareeka batata hai. Har npm command isse padhta hai, aur yahi file kisi directory ko package banati hai.',
      },
      code: `{
  "name": "my-api",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": { "dev": "node --watch src/index.js" },
  "dependencies": { "express": "^4.19.0" },
  "devDependencies": { "vitest": "^2.0.0" }
}`,
    },
    {
      heading: { en: 'The fields that change behaviour', hi: 'Wo fields jo behaviour badalte hain' },
      body: {
        en: 'type decides whether .js files are treated as ES modules or CommonJS — the single most impactful field. main and exports say what an importer gets. engines declares the Node version. These are not documentation; they change what happens.',
        hi: 'type tay karta hai ki .js files ES modules maani jaayein ya CommonJS — sabse zyada asar wala field yahi hai. main aur exports batate hain ki import karne wale ko kya milega. engines Node ka version batata hai. Ye documentation nahi; ye behaviour badalte hain.',
      },
      code: `"type": "module"          // .js is ESM;  .cjs is still CommonJS
"engines": { "node": ">=20" }`,
    },
    {
      heading: { en: 'dependencies versus devDependencies', hi: 'dependencies vs devDependencies' },
      body: {
        en: 'Runtime dependencies ship to production; dev ones do not, because npm ci --omit=dev skips them. Getting this wrong either bloats the production image or crashes it with a missing module.',
        hi: 'Runtime dependencies production mein jaati hain; dev wali nahi, kyunki npm ci --omit=dev unhe chhod deta hai. Ye galat karo toh ya production image fool jaati hai ya gayab module se crash ho jaati hai.',
      },
    },
    {
      heading: { en: 'The version range prefixes', hi: 'Version range ke prefixes' },
      body: {
        en: 'A caret allows minor and patch updates, a tilde allows patch only, and no prefix pins exactly. Because the lock file records the real resolution, the range mostly matters when the lock is regenerated.',
        hi: 'Caret minor aur patch updates deta hai, tilde sirf patch, aur bina prefix ke bilkul wahi version. Lock file asli resolution rakhti hai, isliye range zyadatar tab maayne rakhti hai jab lock dobara bane.',
      },
      code: `"express": "^4.19.0"    // >=4.19.0 <5.0.0
"express": "~4.19.0"    // >=4.19.0 <4.20.0
"express": "4.19.0"     // exactly this`,
    },
    {
      heading: { en: 'The modern exports field', hi: 'Modern exports field' },
      body: {
        en: 'Worth knowing if you publish anything. exports replaces main, lets you expose several entry points, and — importantly — makes everything else in the package private, so a consumer cannot reach into your internals.',
        hi: 'Agar kuch publish karte ho toh jaanne laayak. exports main ki jagah leta hai, kai entry points dene deta hai, aur — zaroori baat — package ki baaki har cheez private kar deta hai, toh koi tumhare andar tak nahi pahunch sakta.',
      },
      code: `"exports": {
  ".": "./dist/index.js",
  "./utils": "./dist/utils.js"
}
// import 'my-pkg/dist/secret.js'  ✗ now blocked`,
    },
    {
      heading: { en: 'And a caution about scripts', hi: 'Aur scripts pe ek chetavni' },
      body: {
        en: 'A postinstall script runs automatically when the package is installed, which is a genuine supply-chain risk in a dependency. Know it exists, and be wary of a package that needs one.',
        hi: 'Package install hote hi postinstall script apne aap chalti hai, jo kisi dependency mein asli supply-chain khatra hai. Ye jaano, aur aise package se satark raho jise iski zaroorat ho.',
      },
    },
  ],

  'What is package-lock.json?': [
    {
      heading: { en: 'The exact resolution of the whole tree', hi: 'Poore tree ka theek resolution' },
      body: {
        en: 'package.json declares RANGES. The lock file records exactly which version of every package — including transitive dependencies you never named — was installed, with its resolved URL and integrity hash.',
        hi: 'package.json RANGES batata hai. Lock file theek-theek likhti hai ki har package ka kaunsa version install hua — un transitive dependencies samet jinke naam tumne kabhi liye hi nahi — uske resolved URL aur integrity hash ke saath.',
      },
      diagram: `package.json    "express": "^4.19.0"        a range
package-lock    express 4.19.2               the exact version
                + every transitive dep       + integrity hash`,
    },
    {
      heading: { en: 'The problem it solves', hi: 'Ye kaunsi problem hal karta hai' },
      body: {
        en: 'Without it, two installs a week apart resolve the same caret range to different versions. Your machine works, CI fails, and the difference is a patch release in a dependency four levels down that nobody chose.',
        hi: 'Iske bina, ek hafte ke antar pe do installs usi caret range ko alag versions pe le jaate hain. Tumhari machine chalti hai, CI fail hoti hai, aur farq chaar level neeche kisi dependency ka patch release hai jise kisi ne chuna hi nahi.',
      },
    },
    {
      heading: { en: 'Always commit it', hi: 'Isse hamesha commit karo' },
      body: {
        en: 'For an application, the lock file is what makes a build reproducible. Not committing it is the same as saying every deployment may install different code. The one exception is a library, where consumers resolve their own tree.',
        hi: 'Kisi application ke liye lock file hi build ko dobara wahi banaati hai. Isse commit na karna matlab ye kehna ki har deployment alag code install kar sakta hai. Ek apvaad library hai, jahan users apna tree khud resolve karte hain.',
      },
    },
    {
      heading: { en: 'Which is why CI uses npm ci', hi: 'Isiliye CI npm ci use karta hai' },
      body: {
        en: 'npm install may update the lock to satisfy a range. npm ci deletes node_modules and installs exactly what the lock says, and fails if the lock and package.json disagree. It is also faster, because there is nothing to resolve.',
        hi: 'npm install range poori karne ke liye lock badal sakta hai. npm ci node_modules mita kar bilkul wahi install karta hai jo lock kehta hai, aur lock aur package.json na milein toh fail ho jaata hai. Ye tez bhi hai, kyunki resolve karne ko kuch hai hi nahi.',
      },
      code: `npm ci      # ✓ in CI and in a Dockerfile — reproducible and fast`,
    },
    {
      heading: { en: 'It also carries integrity hashes', hi: 'Isme integrity hashes bhi hote hain' },
      body: {
        en: 'Each entry has a subresource integrity hash of the tarball, so npm verifies that what it downloaded is byte-for-byte what was locked. That is a real defence against a tampered or republished package.',
        hi: 'Har entry mein tarball ka subresource integrity hash hota hai, toh npm jaanchta hai ki jo download hua wo byte-dar-byte wahi hai jo lock hua tha. Ye kisi chhede gaye ya dobara publish kiye package ke khilaaf asli bachaav hai.',
      },
    },
    {
      heading: { en: 'Never resolve a conflict by hand', hi: 'Conflict kabhi haath se theek mat karo' },
      body: {
        en: 'A merge conflict in the lock file is not editable text — the tree is interdependent. Take either side, then run npm install to regenerate it cleanly. Editing it manually produces a tree that was never actually resolved.',
        hi: 'Lock file ka merge conflict aisa text nahi jise edit kar sako — tree aapas mein juda hua hai. Koi ek side lo, phir npm install chala kar usse saaf dobara banao. Haath se edit karne se aisa tree banta hai jo kabhi resolve hua hi nahi.',
      },
      code: `git checkout --theirs package-lock.json
npm install        # regenerate from package.json`,
    },
  ],

  'What is semantic versioning (semver) in npm?': [
    {
      heading: { en: 'MAJOR.MINOR.PATCH, and each part means something', hi: 'MAJOR.MINOR.PATCH, aur har hissa kuch kehta hai' },
      body: {
        en: 'Patch is a backwards-compatible bug fix. Minor adds functionality without breaking anything. Major contains a breaking change. It is a promise the publisher makes to consumers about what upgrading will cost them.',
        hi: 'Patch ek backwards-compatible bug fix hai. Minor bina kuch tode nayi cheez jodta hai. Major mein todne wala badlaav hai. Ye publisher ka users se vaada hai ki upgrade karne mein kya keemat lagegi.',
      },
      diagram: `  4  .  19  .  2
  │      │      └── PATCH  bug fix, safe
  │      └───────── MINOR  new feature, backwards compatible
  └──────────────── MAJOR  breaking change`,
    },
    {
      heading: { en: 'The range operators you will actually see', hi: 'Jo range operators sach mein dikhenge' },
      body: {
        en: 'Caret is the npm default and allows minor and patch. Tilde allows patch only. No prefix pins exactly. Learn the caret rule for versions below 1.0, because it changes.',
        hi: 'Caret npm ka default hai aur minor aur patch deta hai. Tilde sirf patch. Bina prefix ke bilkul wahi version. 1.0 se neeche wale versions ke liye caret ka rule seekho, kyunki wo badal jaata hai.',
      },
      code: `^4.19.0    >=4.19.0 <5.0.0     minor + patch
~4.19.0    >=4.19.0 <4.20.0    patch only
 4.19.0    exactly
^0.5.2     >=0.5.2 <0.6.0      ← caret is stricter below 1.0
*          any version          ✗ never do this`,
    },
    {
      heading: { en: 'Why caret is stricter below 1.0', hi: 'Caret 1.0 se neeche zyada sakht kyun hai' },
      body: {
        en: 'A 0.x package is declared unstable by the spec, so a minor bump may break. npm treats the minor position as major in that range, which is a detail worth knowing because most small packages live at 0.x forever.',
        hi: 'Spec ke hisaab se 0.x package asthir maana jaata hai, toh minor badhne se cheez toot sakti hai. Us range mein npm minor ki jagah ko major maanta hai, aur ye jaanne laayak hai kyunki zyadatar chhote packages hamesha 0.x pe hi rehte hain.',
      },
    },
    {
      heading: { en: 'Pre-release tags sort below the release', hi: 'Pre-release tags release se neeche aate hain' },
      body: {
        en: 'A hyphen introduces a pre-release identifier, and 1.0.0-beta.1 is LOWER than 1.0.0. Importantly, a normal range will not match a pre-release unless you ask for one explicitly.',
        hi: 'Hyphen ek pre-release pehchaan jodta hai, aur 1.0.0-beta.1, 1.0.0 se CHHOTA hai. Zaroori baat: aam range kisi pre-release se match nahi karti jab tak tum khud na maango.',
      },
      code: `1.0.0-alpha  <  1.0.0-beta  <  1.0.0-rc.1  <  1.0.0

"pkg": "^1.0.0"          // will NOT install 2.0.0-beta.1`,
    },
    {
      heading: { en: 'The lock file is what actually protects you', hi: 'Asal mein tumhe lock file bachaati hai' },
      body: {
        en: 'A range is only consulted when the tree is resolved. Day to day, the lock file pins the exact version, so semver ranges matter mainly when you add a dependency or run an update.',
        hi: 'Range tabhi dekhi jaati hai jab tree resolve ho. Roz-marra mein lock file theek version pakde rakhti hai, toh semver ranges tab maayne rakhti hain jab tum dependency jodo ya update chalao.',
      },
    },
    {
      heading: { en: 'And semver is a promise, not a guarantee', hi: 'Aur semver vaada hai, guarantee nahi' },
      body: {
        en: 'Publishers make mistakes, and a patch release can break you. That is why you pin with a lock file, run tests before merging a dependency bump, and use a tool like Renovate to upgrade in small reviewable steps.',
        hi: 'Publishers galti karte hain, aur patch release bhi tumhara kaam tod sakta hai. Isiliye lock file se pin karo, dependency badhaane se pehle tests chalao, aur Renovate jaisa tool use karo jo chhote review hone laayak kadamon mein upgrade kare.',
      },
    },
  ],

  'What is the difference between dependencies and devDependencies?': [
    {
      heading: { en: 'Needed at runtime versus needed to build', hi: 'Chalane ke liye vs banane ke liye' },
      body: {
        en: 'A dependency is required for the application to run in production. A devDependency is only needed while developing, testing or building. The split exists so production installs less.',
        hi: 'Dependency wo hai jo production mein application chalane ke liye chahiye. devDependency sirf develop, test ya build karte waqt chahiye. Ye baant isliye hai ki production mein kam install ho.',
      },
      code: `"dependencies":    { "express": "^4.19.0", "pg": "^8.12.0" }
"devDependencies": { "vitest": "^2.0.0", "eslint": "^9.0.0" }`,
    },
    {
      heading: { en: 'The practical difference is one flag', hi: 'Vyavharik farq ek flag ka hai' },
      body: {
        en: 'npm ci --omit=dev skips devDependencies entirely, which is what a production Docker build does. Smaller image, faster install, and a smaller attack surface.',
        hi: 'npm ci --omit=dev devDependencies ko poori tarah chhod deta hai, aur production ka Docker build yahi karta hai. Chhoti image, tez install, aur hamle ki kam jagah.',
      },
      code: `RUN npm ci --omit=dev      # in the production stage`,
    },
    {
      heading: { en: 'Both are installed in development', hi: 'Development mein dono install hote hain' },
      body: {
        en: 'A plain npm install installs both, which is why putting something in the wrong section often goes unnoticed locally and only breaks in production with a module-not-found error.',
        hi: 'Saada npm install dono install karta hai, isiliye galat jagah rakhi cheez local pe pata nahi chalti aur sirf production mein module-not-found error se toot ti hai.',
      },
    },
    {
      heading: { en: 'The case people get wrong', hi: 'Jo case log galat karte hain' },
      body: {
        en: 'If you build to a bundle before deploying, a library that is bundled in does NOT need to be a runtime dependency. But if you deploy source and run it directly, everything imported at runtime must be a dependency — including things that feel like tooling.',
        hi: 'Agar tum deploy se pehle bundle banate ho, toh jo library bundle mein aa gayi usse runtime dependency hone ki zaroorat NAHI. Par agar source deploy karke seedha chalate ho, toh runtime pe import hone wali har cheez dependency honi chahiye — un cheezon samet jo tooling jaisi lagti hain.',
      },
    },
    {
      heading: { en: 'The other two kinds', hi: 'Baaki do prakaar' },
      body: {
        en: 'peerDependencies say "I work with this, but the host must install it" — how a React plugin avoids bundling a second React. optionalDependencies do not fail the install if they cannot be built, which is how platform-specific binaries are handled.',
        hi: 'peerDependencies kehte hain "main iske saath chalta hoon, par host isse install kare" — React ka koi plugin doosri React bundle karne se aise hi bachta hai. optionalDependencies na ban paayein toh install fail nahi hota, aur platform ke hisaab se aane wale binaries aise hi sambhale jaate hain.',
      },
      code: `"peerDependencies": { "react": ">=18" }`,
    },
    {
      heading: { en: 'The rule to state', hi: 'Batane laayak rule' },
      body: {
        en: '"If it is imported by code that runs in production, it is a dependency. If it only runs on my machine or in CI — test runners, linters, type definitions, build tools — it is a devDependency. Getting it wrong either bloats the production image or crashes it with a missing module."',
        hi: '"Agar wo us code se import hoti hai jo production mein chalta hai, toh wo dependency hai. Agar wo sirf meri machine ya CI pe chalti hai — test runners, linters, type definitions, build tools — toh devDependency. Galat karo toh ya production image fool jaati hai ya gayab module se crash ho jaati hai."',
      },
    },
  ],

  'What is the REPL in Node.js?': [
    {
      heading: { en: 'Read, Eval, Print, Loop', hi: 'Read, Eval, Print, Loop' },
      body: {
        en: 'An interactive shell that reads an expression, evaluates it, prints the result and waits for the next one. Type node with no arguments and you are in it.',
        hi: 'Ek interactive shell jo expression padhta hai, evaluate karta hai, nateeja chhaapta hai aur agle ka intezaar karta hai. Bina argument ke node likho aur tum uske andar ho.',
      },
      code: `$ node
> 2 + 2
4
> const fs = require('node:fs')
undefined
> typeof fs.readFile
'function'`,
    },
    {
      heading: { en: 'What it is genuinely useful for', hi: 'Ye sach mein kis kaam ka hai' },
      body: {
        en: 'Checking the shape of an API you half remember, testing a regex, confirming what a function returns for an edge case, and trying a package before writing it into a file. Faster than creating a scratch file and running it.',
        hi: 'Kisi aadhi yaad API ki shakl dekhna, regex test karna, kisi edge case pe function kya deta hai ye pakka karna, aur package ko file mein likhne se pehle aazmana. Scratch file bana kar chalane se tez.',
      },
    },
    {
      heading: { en: 'The special commands', hi: 'Khaas commands' },
      body: {
        en: 'A handful of dot commands and one magic variable. The underscore holding the last result is the one people do not know and use constantly once they do.',
        hi: 'Kuch dot commands aur ek jaadui variable. Underscore, jisme pichhla nateeja hota hai, wahi hai jo log jaante nahi aur jaante hi baar-baar use karte hain.',
      },
      code: `.help          list the commands
.editor        multi-line mode, ctrl+D to run
.load app.js   load a file into the session
.save out.js   write the session to a file
.exit          quit

> [1,2,3].map(n => n * 2)
[ 2, 4, 6 ]
> _.length              // _ is the previous result
3`,
    },
    {
      heading: { en: 'Await works at the top level', hi: 'Top level pe await chalta hai' },
      body: {
        en: 'The REPL allows top-level await, which makes it a quick way to try an async API without wrapping everything in a function.',
        hi: 'REPL top-level await deta hai, jisse kisi async API ko bina function mein lapete aazmana jaldi ho jaata hai.',
      },
      code: `> const res = await fetch('https://api.github.com')
> await res.json()`,
    },
    {
      heading: { en: 'And the better alternative for real work', hi: 'Aur asli kaam ke liye behtar vikalp' },
      body: {
        en: 'For anything longer than a couple of lines, a scratch file with node --watch is easier — it keeps history, edits properly and does not lose everything on exit. Node also has a built-in debugger via --inspect, which beats printing values by hand.',
        hi: 'Do-chaar line se lambi cheez ke liye node --watch wali scratch file aasaan hai — history rehti hai, edit theek se hota hai aur nikalne pe sab kuch khota nahi. Node mein --inspect se built-in debugger bhi hai, jo haath se values chhaapne se behtar hai.',
      },
      code: `node --watch scratch.js`,
    },
  ],

  'How do you create a Node.js project?': [
    {
      heading: { en: 'Initialise and set the module system', hi: 'Initialise karo aur module system tay karo' },
      body: {
        en: 'npm init creates package.json. The first real decision is type: module, which makes .js files ES modules. Set it deliberately at the start, because changing it later touches every file.',
        hi: 'npm init package.json banata hai. Pehla asli faisla type: module hai, jo .js files ko ES modules bana deta hai. Isse shuru mein soch kar set karo, kyunki baad mein badalna har file ko chhoota hai.',
      },
      code: `mkdir my-api && cd my-api
npm init -y
npm pkg set type=module`,
    },
    {
      heading: { en: 'Set the Node version and pin it', hi: 'Node ka version tay karo aur pin karo' },
      body: {
        en: 'Declare engines so npm warns on a wrong version, and add an .nvmrc so everyone on the team and CI use the same one. Skipping this is how "works on my machine" starts.',
        hi: 'engines batao taaki galat version pe npm chetavni de, aur .nvmrc jodo taaki team aur CI sab ek hi version use karein. Isse chhodna hi "meri machine pe toh chalta hai" ki shuruaat hai.',
      },
      code: `npm pkg set engines.node=">=20"
echo "20" > .nvmrc`,
    },
    {
      heading: { en: 'A structure that scales', hi: 'Aisa dhaancha jo badhta hai' },
      body: {
        en: 'Split by responsibility rather than by file type once there is more than one route. Routes handle HTTP, services hold the logic, and neither knows about the other\'s concerns.',
        hi: 'Ek se zyada route hote hi file type se nahi, zimmedaari se baanto. Routes HTTP sambhaalein, services logic rakhein, aur koi doosre ke maamle mein na jaaye.',
      },
      diagram: `src/
  index.js        start the server
  app.js          wire middleware and routes
  routes/         HTTP only — parse, validate, respond
  services/       business logic, no req or res
  db/             queries and the connection pool
  config.js       validated environment variables`,
    },
    {
      heading: { en: 'Scripts, with the built-in watcher', hi: 'Scripts, built-in watcher ke saath' },
      body: {
        en: 'Node has --watch built in, so nodemon is no longer needed. It also has a test runner and native .env loading, which removes three dependencies from a typical starter.',
        hi: 'Node mein --watch built-in hai, toh ab nodemon ki zaroorat nahi. Usme test runner aur native .env loading bhi hai, jisse aam starter se teen dependencies hat jaati hain.',
      },
      code: `"scripts": {
  "dev": "node --watch --env-file=.env src/index.js",
  "start": "node src/index.js",
  "test": "node --test"
}`,
    },
    {
      heading: { en: 'The files to add before the first commit', hi: 'Pehle commit se pehle jodne wali files' },
      body: {
        en: 'A .gitignore covering node_modules and .env, a .env.example listing the variable names with no values, and a README with how to run it. Doing this first is what stops a secret reaching the history.',
        hi: 'node_modules aur .env wala .gitignore, ek .env.example jisme sirf variable ke naam hon values nahi, aur ek README jisme chalane ka tareeka ho. Ye pehle karna hi secret ko history mein jaane se rokta hai.',
      },
      code: `node_modules/
.env
dist/`,
    },
    {
      heading: { en: 'Then the tooling', hi: 'Phir tooling' },
      body: {
        en: 'ESLint and Prettier for consistency, TypeScript if the project will live longer than a few weeks, and a validated config module so a missing environment variable fails at boot rather than at three in the morning.',
        hi: 'Ek jaisapan ke liye ESLint aur Prettier, agar project kuch hafton se zyada chalega toh TypeScript, aur ek validated config module taaki gayab environment variable raat teen baje nahi, boot pe hi fail kare.',
      },
    },
  ],

  /* ─── Core modules ────────────────────────────────────────── */

  'What is the EventEmitter in Node.js?': [
    {
      heading: { en: 'The publish-subscribe pattern, built in', hi: 'Publish-subscribe pattern, built-in' },
      body: {
        en: 'An EventEmitter lets one object announce that something happened and any number of listeners react. The emitter does not know who is listening, which is what decouples the two sides.',
        hi: 'EventEmitter ek object ko ye batane deta hai ki kuch hua, aur jitne chaahe listeners react karte hain. Emitter ko pata hi nahi kaun sun raha hai, aur isi se dono taraf alag ho jaati hain.',
      },
      code: `const { EventEmitter } = require('node:events');

const bus = new EventEmitter();
bus.on('order', (id) => console.log('received', id));
bus.emit('order', 42);      // received 42`,
    },
    {
      heading: { en: 'Most of Node is built on it', hi: 'Node ka zyadatar hissa isi pe bana hai' },
      body: {
        en: 'Streams, HTTP servers and requests, sockets, child processes and the process object all extend EventEmitter. Recognising that is what turns it from a utility class into the pattern the whole runtime uses.',
        hi: 'Streams, HTTP servers aur requests, sockets, child processes aur process object — sab EventEmitter ko extend karte hain. Ye pehchan lena isse ek utility class se poore runtime ke pattern mein badal deta hai.',
      },
      code: `server.on('request', handler);
socket.on('data', chunk => {});
process.on('SIGTERM', shutdown);      // all EventEmitters`,
    },
    {
      heading: { en: 'emit is synchronous', hi: 'emit synchronous hai' },
      body: {
        en: 'The detail people get wrong. Listeners run immediately, in registration order, on the same tick — emit does not queue anything. So a slow listener blocks the emitter, and a throw inside one propagates back to the emit call.',
        hi: 'Yahi detail log galat karte hain. Listeners turant chalte hain, register hone ke kram mein, usi tick pe — emit kuch queue nahi karta. Toh dheema listener emitter ko rok deta hai, aur uske andar ka throw wapas emit call tak pahunchta hai.',
      },
      code: `bus.on('x', () => console.log('1'));
bus.on('x', () => console.log('2'));
bus.emit('x');
console.log('3');
// 1, 2, 3 — not 3, 1, 2`,
    },
    {
      heading: { en: 'The error event is special', hi: 'error event khaas hai' },
      body: {
        en: 'If an EventEmitter emits error and there is no listener for it, Node throws and the process crashes. That is deliberate — an unhandled error should be loud — but it surprises people the first time a socket errors.',
        hi: 'Agar koi EventEmitter error emit kare aur uska koi listener na ho, toh Node throw karta hai aur process crash ho jaata hai. Ye jaan-boojh kar hai — bina sambhala error zor se bolna chahiye — par pehli baar socket pe error aane pe log chaunk jaate hain.',
      },
      code: `emitter.emit('error', new Error('x'));   // ✗ crashes with no listener
emitter.on('error', (e) => logger.error(e));   // ✓ always add one`,
    },
    {
      heading: { en: 'Always remove what you add', hi: 'Jo jodo wo hatao bhi' },
      body: {
        en: 'A listener holds its closure, and its closure holds everything it references. Adding one per request to a long-lived emitter is a textbook memory leak — and Node warns you at eleven listeners for exactly that reason.',
        hi: 'Listener apna closure pakadta hai, aur closure jo bhi reference kare wo bhi. Lambi umar wale emitter pe har request mein ek jodna kitaabi memory leak hai — aur isi wajah se Node gyaarah listeners pe chetavni deta hai.',
      },
      code: `emitter.on('x', handler);
emitter.off('x', handler);     // ✓ pass the SAME reference
emitter.once('ready', fn);      // ✓ removes itself after one call

// MaxListenersExceededWarning is almost always a real leak`,
    },
    {
      heading: { en: 'The modern helpers', hi: 'Naye helpers' },
      body: {
        en: 'events.once returns a promise, so you can await a single event with try/catch. events.on gives an async iterator over a stream of events. Both read far better than nesting callbacks.',
        hi: 'events.once ek promise deta hai, toh tum ek event ko try/catch ke saath await kar sakte ho. events.on events ki dhaara pe async iterator deta hai. Dono nested callbacks se kahin behtar padhe jaate hain.',
      },
      code: `const { once, on } = require('node:events');

await once(server, 'listening');
for await (const [chunk] of on(stream, 'data')) { … }`,
    },
    {
      heading: { en: 'When not to use one', hi: 'Isse kab use nahi karna' },
      body: {
        en: 'For a one-off result, a promise is better — it settles once, carries the error, and composes. Reach for an emitter when the thing genuinely repeats: progress updates, incoming connections, a stream of data.',
        hi: 'Ek baar ke nateeje ke liye promise behtar hai — wo ek baar settle hota hai, error le kar chalta hai, aur judta hai. Emitter tab lo jab cheez sach mein dohraati ho: progress updates, aane wale connections, data ki dhaara.',
      },
    },
  ],

  'What is the process object in Node.js?': [
    {
      heading: { en: 'A global handle on the running process', hi: 'Chal rahe process ka ek global handle' },
      body: {
        en: 'process is available everywhere without importing, and it exposes the environment, the arguments, standard streams, the exit code and lifecycle signals. It is also an EventEmitter, which is how you hook shutdown.',
        hi: 'process har jagah bina import ke milta hai, aur wo environment, arguments, standard streams, exit code aur lifecycle signals deta hai. Ye EventEmitter bhi hai, aur shutdown isi se pakda jaata hai.',
      },
    },
    {
      heading: { en: 'The properties you use daily', hi: 'Jo properties roz use hoti hain' },
      body: {
        en: 'env for configuration, argv for command-line arguments, cwd for the working directory, and the standard streams. Note that everything in env is a string, so a numeric port needs converting.',
        hi: 'Configuration ke liye env, command-line arguments ke liye argv, working directory ke liye cwd, aur standard streams. Dhyaan do env mein sab kuch string hai, toh numeric port ko convert karna padta hai.',
      },
      code: `process.env.NODE_ENV;
Number(process.env.PORT) || 3000;    // env values are strings
process.argv.slice(2);                // your arguments
process.cwd();
process.stdout.write('no newline');`,
    },
    {
      heading: { en: 'Signals and graceful shutdown', hi: 'Signals aur shaant shutdown' },
      body: {
        en: 'This is the most valuable thing in the whole answer. A container orchestrator sends SIGTERM before killing a process. Handle it: stop accepting new connections, finish in-flight requests, close the database pool, then exit. Without it you drop requests on every deploy.',
        hi: 'Poore jawab mein sabse keemti baat yahi hai. Container orchestrator process maarne se pehle SIGTERM bhejta hai. Usse sambhaalo: naye connections lena band karo, chal rahi requests poori karo, database pool band karo, phir nikal jao. Iske bina har deploy pe requests girti hain.',
      },
      code: `process.on('SIGTERM', async () => {
  server.close();                 // stop accepting new connections
  await pool.end();               // close the database pool
  process.exit(0);
});`,
    },
    {
      heading: { en: 'The two safety-net handlers', hi: 'Do suraksha-jaal handlers' },
      body: {
        en: 'uncaughtException and unhandledRejection catch what nothing else did. Use them to LOG and then exit — not to keep running. After an uncaught exception the process is in an unknown state, and continuing is how you get corrupted data.',
        hi: 'uncaughtException aur unhandledRejection wo pakadte hain jo aur kisi ne nahi pakda. Inhe LOG karke nikalne ke liye use karo — chalte rehne ke liye nahi. Bina pakde exception ke baad process ki halat anjaan hai, aur chalte rehna hi kharaab data ki wajah banta hai.',
      },
      code: `process.on('unhandledRejection', (reason) => {
  logger.fatal(reason);
  process.exit(1);        // ✓ let the orchestrator restart a clean one
});`,
    },
    {
      heading: { en: 'Measurement and diagnostics', hi: 'Naap aur jaanch' },
      body: {
        en: 'memoryUsage is what you sample to detect a leak, uptime and pid go in health checks, and hrtime.bigint is the high-resolution timer you use for benchmarking rather than Date.now.',
        hi: 'Leak pakadne ke liye memoryUsage sample karte ho, health checks mein uptime aur pid jaate hain, aur benchmarking ke liye Date.now nahi, hrtime.bigint wala high-resolution timer use hota hai.',
      },
      code: `process.memoryUsage();     // { rss, heapTotal, heapUsed, external }
process.uptime();
process.hrtime.bigint();`,
    },
    {
      heading: { en: 'exit versus exitCode', hi: 'exit vs exitCode' },
      body: {
        en: 'process.exit terminates immediately and can truncate pending stdout writes and unfinished I/O. Setting process.exitCode and letting the event loop drain naturally is safer, and it is the recommended form.',
        hi: 'process.exit turant khatam kar deta hai aur pending stdout writes aur adhoori I/O kaat sakta hai. process.exitCode set karke event loop ko apne aap khaali hone dena zyada safe hai, aur yahi salaah di jaati hai.',
      },
      code: `process.exit(1);           // ✗ may cut off logs
process.exitCode = 1;       // ✓ exits cleanly when the loop drains`,
    },
  ],

  'What is the File System (fs) module?': [
    {
      heading: { en: "Node's interface to the disk", hi: 'Disk se Node ka rishta' },
      body: {
        en: 'fs reads, writes, moves, deletes and inspects files and directories. It is a core module, so nothing to install, and it is one of the clearest examples of the three API styles Node offers.',
        hi: 'fs files aur directories padhta, likhta, hilaata, mitaata aur jaanchta hai. Ye core module hai, toh install kuch nahi karna, aur Node ke teen API styles ki sabse saaf misaal yahi hai.',
      },
    },
    {
      heading: { en: 'Three flavours of every function', hi: 'Har function ke teen roop' },
      body: {
        en: 'Promise-based, callback-based and synchronous. They do the same work; the difference is entirely in how you get the result and whether the event loop is blocked while it happens.',
        hi: 'Promise wala, callback wala aur synchronous. Kaam teeno ka wahi hai; farq sirf ye hai ki nateeja kaise milta hai aur us dauraan event loop rukta hai ya nahi.',
      },
      code: `const fs = require('node:fs/promises');
await fs.readFile('a.txt', 'utf8');           // ✓ promise

require('node:fs').readFile('a.txt', 'utf8', cb);   // callback
require('node:fs').readFileSync('a.txt', 'utf8');    // ✗ blocks`,
    },
    {
      heading: { en: 'Use the promises API', hi: 'promises API use karo' },
      body: {
        en: 'It reads better with async/await, gives you real try/catch, and composes with Promise.all. The callback form is legacy and the sync form blocks the only thread that serves your requests.',
        hi: 'Ye async/await ke saath behtar padha jaata hai, asli try/catch deta hai, aur Promise.all ke saath judta hai. Callback wala roop purana hai aur sync wala us akele thread ko rokta hai jo tumhari requests sambhaalta hai.',
      },
    },
    {
      heading: { en: 'The encoding argument decides the return type', hi: 'Encoding argument return type tay karta hai' },
      body: {
        en: 'Without an encoding you get a Buffer; with one you get a string. Forgetting it is why a file read sometimes prints a hex dump instead of text.',
        hi: 'Bina encoding ke Buffer milta hai; encoding do toh string. Isse bhoolna hi wajah hai ki kabhi file padhne pe text ki jagah hex dump chhap jaata hai.',
      },
      code: `await fs.readFile('a.txt');            // Buffer
await fs.readFile('a.txt', 'utf8');     // string`,
    },
    {
      heading: { en: 'Do not read a large file into memory', hi: 'Badi file memory mein mat padho' },
      body: {
        en: 'readFile loads the whole thing at once, so a 2GB file needs 2GB of heap. Use a stream, which processes it in chunks with backpressure and keeps memory flat regardless of size.',
        hi: 'readFile poori cheez ek saath uthata hai, toh 2GB ki file ko 2GB heap chahiye. Stream use karo, jo usse backpressure ke saath tukdon mein chalati hai aur size chahe kuch bhi ho memory sthir rakhti hai.',
      },
      code: `await pipeline(
  fs.createReadStream('huge.csv'),
  parse(),
  fs.createWriteStream('out.json')
);`,
    },
    {
      heading: { en: 'Check by trying, not by asking first', hi: 'Pehle poochho mat, karke dekho' },
      body: {
        en: 'Calling exists and then reading is a race condition — the file can vanish in between. Attempt the operation and handle the ENOENT error code instead. This is why fs.exists was deprecated.',
        hi: 'Pehle exists poochhna aur phir padhna race condition hai — beech mein file gaayab ho sakti hai. Seedha koshish karo aur ENOENT error code sambhaalo. Isiliye fs.exists deprecated hua.',
      },
      code: `try {
  return await fs.readFile(p, 'utf8');
} catch (e) {
  if (e.code === 'ENOENT') return null;    // ✓ no race
  throw e;
}`,
    },
    {
      heading: { en: 'The operations worth knowing', hi: 'Jaanne laayak operations' },
      body: {
        en: 'readdir to list a directory, mkdir with recursive to build a path, stat for size and timestamps, rm with recursive to delete a tree, and watch to react to changes.',
        hi: 'Directory list karne ke liye readdir, poora path banane ke liye recursive wala mkdir, size aur timestamps ke liye stat, poora tree mitaane ke liye recursive wala rm, aur badlaav pe react karne ke liye watch.',
      },
      code: `await fs.mkdir('a/b/c', { recursive: true });
await fs.rm('dist', { recursive: true, force: true });
const entries = await fs.readdir('.', { withFileTypes: true });`,
    },
  ],

  'What is the difference between synchronous and asynchronous file operations?': [
    {
      heading: { en: 'One blocks the only thread, the other does not', hi: 'Ek akele thread ko rokta hai, doosra nahi' },
      body: {
        en: 'readFileSync stops your thread until the disk responds. readFile hands the work to the libuv thread pool and returns immediately, so the event loop keeps serving other requests while the disk is busy.',
        hi: 'readFileSync tumhara thread tab tak rokta hai jab tak disk jawab na de. readFile kaam libuv ke thread pool ko de kar turant laut aata hai, toh disk vyast rehte hue bhi event loop baaki requests sambhaalta rehta hai.',
      },
      code: `const a = fs.readFileSync('x.txt');   // nothing else runs here
const b = await fs.promises.readFile('x.txt');   // the loop is free`,
    },
    {
      heading: { en: 'Why blocking is worse than it sounds', hi: 'Blocking sunne se zyada bura kyun hai' },
      body: {
        en: 'It does not block one request — it blocks EVERY request. A 50ms synchronous read in a handler serving a hundred requests per second means the server spends most of its time frozen, and latency climbs for everyone.',
        hi: 'Ye ek request nahi rokta — HAR request rokta hai. Sau requests per second wale handler mein 50ms ka synchronous read matlab server apna zyadatar samay jama hua bitaata hai, aur sabke liye latency badh jaati hai.',
      },
      diagram: `sync    [req1 ████][req2 ████][req3 ████]     serial, 3× the latency
async   [req1 ─ ─ ─ ─]
        [req2 ─ ─ ─ ─]                          overlapping waits
        [req3 ─ ─ ─ ─]`,
    },
    {
      heading: { en: 'Errors are reported differently', hi: 'Errors alag tareeke se aate hain' },
      body: {
        en: 'A sync call throws, so ordinary try/catch works. A callback call passes the error as the first argument, and a promise call rejects. Mixing them up — wrapping an async call in try/catch without await — is why an error sometimes disappears.',
        hi: 'Sync call throw karta hai, toh aam try/catch chalta hai. Callback wala error pehle argument mein deta hai, aur promise wala reject karta hai. Inhe mila dena — bina await ke async call ko try/catch mein lapetna — isiliye kabhi error gaayab ho jaata hai.',
      },
      code: `try { fs.readFileSync(p); } catch (e) {}          // ✓
try { fs.promises.readFile(p); } catch (e) {}      // ✗ no await
try { await fs.promises.readFile(p); } catch (e) {} // ✓`,
    },
    {
      heading: { en: 'Async lets you parallelise', hi: 'Async se parallel kar sakte ho' },
      body: {
        en: 'Because the thread is free, several reads can be in flight at once on the thread pool. Ten sync reads take the sum of their times; ten async reads take roughly the slowest, up to the pool size.',
        hi: 'Thread khaali hai, isliye kai reads ek saath thread pool pe chal sakte hain. Das sync reads ka samay unka jod hai; das async reads lagbhag sabse dheeme jitna, pool ke size tak.',
      },
      code: `const files = await Promise.all(paths.map((p) => fs.readFile(p, 'utf8')));`,
    },
    {
      heading: { en: 'Remember the thread pool has four threads', hi: 'Yaad rakho thread pool mein chaar threads hain' },
      body: {
        en: 'A detail that separates a good answer. File I/O is not truly async at the OS level on Linux — libuv fakes it with a pool. So the fifth concurrent large read queues, and raising UV_THREADPOOL_SIZE is sometimes the actual fix.',
        hi: 'Ek detail jo achhe jawab ko alag karti hai. Linux pe OS star pe file I/O sach mein async nahi hai — libuv usse pool se banata hai. Toh paanchwa bada read line mein lagta hai, aur kabhi-kabhi asli ilaaj UV_THREADPOOL_SIZE badhana hi hota hai.',
      },
    },
    {
      heading: { en: 'When sync is actually fine', hi: 'Sync kab sach mein theek hai' },
      body: {
        en: 'At startup, before the server begins listening — loading config, reading a certificate, resolving a path. Nothing is being served yet, so there is nothing to block. Also fine in a CLI script or a build tool, where there is no event loop to protect.',
        hi: 'Shuruaat mein, server ke sunna shuru karne se pehle — config load karna, certificate padhna, path nikaalna. Abhi kuch serve ho hi nahi raha, toh rokne ko kuch nahi. CLI script ya build tool mein bhi theek hai, jahan bachane ko koi event loop hai hi nahi.',
      },
      code: `const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
server.listen(3000);      // ✓ sync before listening is fine`,
    },
    {
      heading: { en: 'The rule', hi: 'Rule' },
      body: {
        en: '"Async everywhere inside a request handler, because sync blocks every other request, not just this one. Sync is acceptable at startup and in CLI tools. And I would use the fs/promises API rather than callbacks."',
        hi: '"Request handler ke andar har jagah async, kyunki sync sirf ye nahi, har doosri request rokta hai. Shuruaat mein aur CLI tools mein sync theek hai. Aur main callbacks ki jagah fs/promises API use karunga."',
      },
    },
  ],

  'How do you read a file in Node.js?': [
    {
      heading: { en: 'The default: fs/promises with an encoding', hi: 'Default: encoding ke saath fs/promises' },
      body: {
        en: 'This is the form to give first. It reads the whole file, returns a string when you pass an encoding, and works with ordinary try/catch.',
        hi: 'Yahi roop pehle dena chahiye. Ye poori file padhta hai, encoding do toh string deta hai, aur aam try/catch ke saath chalta hai.',
      },
      code: `const fs = require('node:fs/promises');
const text = await fs.readFile('data.txt', 'utf8');`,
    },
    {
      heading: { en: 'Without an encoding you get a Buffer', hi: 'Bina encoding ke Buffer milta hai' },
      body: {
        en: 'Which is correct for binary data — an image, a PDF, a zip — and wrong for text. Forgetting the encoding is why a read sometimes prints a hex dump.',
        hi: 'Binary data ke liye ye sahi hai — image, PDF, zip — aur text ke liye galat. Encoding bhoolna hi wajah hai ki kabhi padhne pe hex dump chhap jaata hai.',
      },
      code: `await fs.readFile('a.txt');           // <Buffer 68 65 6c 6c 6f>
await fs.readFile('a.txt', 'utf8');    // 'hello'`,
    },
    {
      heading: { en: 'Handle the missing-file case', hi: 'File na milne ka case sambhaalo' },
      body: {
        en: 'Catch the error and check the code rather than checking existence first, which is a race. ENOENT means it is not there; EACCES means you lack permission.',
        hi: 'Pehle maujoodgi jaanchne ki jagah error pakdo aur code dekho, kyunki pehle jaanchna race hai. ENOENT matlab wo hai hi nahi; EACCES matlab permission nahi hai.',
      },
      code: `try {
  return await fs.readFile(p, 'utf8');
} catch (e) {
  if (e.code === 'ENOENT') return null;
  throw e;
}`,
    },
    {
      heading: { en: 'For a large file, stream it', hi: 'Badi file ho toh stream karo' },
      body: {
        en: 'readFile buffers the entire file in memory. Above a few megabytes, or for anything user-supplied where you do not control the size, read it in chunks instead.',
        hi: 'readFile poori file memory mein rakh leta hai. Kuch megabytes se upar, ya kisi bhi user ki di hui file jiska size tumhare haath mein nahi, usse tukdon mein padho.',
      },
      code: `for await (const line of readline.createInterface({
  input: fs.createReadStream('huge.log'),
})) {
  process(line);       // constant memory, whatever the file size
}`,
    },
    {
      heading: { en: 'The JSON shortcut', hi: 'JSON ka shortcut' },
      body: {
        en: 'Reading and parsing JSON is the most common case. Note that JSON.parse throws on malformed input, so it belongs inside the same try block rather than after it.',
        hi: 'JSON padhna aur parse karna sabse aam case hai. Dhyaan do JSON.parse kharaab input pe throw karta hai, toh wo usi try block ke andar hona chahiye, uske baad nahi.',
      },
      code: `const config = JSON.parse(await fs.readFile('config.json', 'utf8'));

// or, in modern Node:
import config from './config.json' with { type: 'json' };`,
    },
  ],

  'How do you write a file in Node.js?': [
    {
      heading: { en: 'writeFile replaces the whole file', hi: 'writeFile poori file badal deta hai' },
      body: {
        en: 'It creates the file if it does not exist and TRUNCATES it if it does. That truncation is the part people forget — there is no warning and no undo.',
        hi: 'File na ho toh bana deta hai aur ho toh usse KHAALI kar deta hai. Wo khaali karna hi log bhool jaate hain — na chetavni, na wapas laane ka tareeka.',
      },
      code: `const fs = require('node:fs/promises');
await fs.writeFile('out.txt', 'hello', 'utf8');    // overwrites`,
    },
    {
      heading: { en: 'The flags control that behaviour', hi: 'Wo behaviour flags se tay hota hai' },
      body: {
        en: 'The default is w, which truncates. Use a to append, and wx to fail if the file already exists — which is the safe choice when you must not clobber something.',
        hi: 'Default w hai, jo khaali kar deta hai. Aage jodne ke liye a lo, aur wx agar file pehle se ho toh fail ho jaaye — jab kuch mitna nahi chahiye tab yahi safe chunav hai.',
      },
      code: `await fs.writeFile(p, data, { flag: 'a' });    // append
await fs.writeFile(p, data, { flag: 'wx' });   // ✗ EEXIST if present`,
    },
    {
      heading: { en: 'The directory must already exist', hi: 'Directory pehle se honi chahiye' },
      body: {
        en: 'writeFile creates the file but not its parent folders. Writing to a path whose directory is missing fails with ENOENT, which reads confusingly because the error names the file rather than the folder.',
        hi: 'writeFile file banata hai, uske parent folders nahi. Aisi jagah likho jiski directory nahi hai toh ENOENT se fail hota hai, jo uljhan bhara lagta hai kyunki error folder ka nahi, file ka naam bataata hai.',
      },
      code: `await fs.mkdir(path.dirname(p), { recursive: true });
await fs.writeFile(p, data);`,
    },
    {
      heading: { en: 'A large or generated file should be streamed', hi: 'Badi ya banayi ja rahi file stream karo' },
      body: {
        en: 'writeFile builds the entire content in memory first. When you are generating a report or exporting rows from a database, write as you go so memory stays flat.',
        hi: 'writeFile pehle poora content memory mein banata hai. Jab tum report bana rahe ho ya database se rows nikaal rahe ho, toh chalte-chalte likho taaki memory sthir rahe.',
      },
      code: `const out = fs.createWriteStream('report.csv');
for await (const row of cursor) out.write(toCsv(row));
out.end();`,
    },
    {
      heading: { en: 'Write atomically when it matters', hi: 'Jab zaroori ho toh atomically likho' },
      body: {
        en: 'A crash halfway through a write leaves a truncated file. Write to a temporary name and rename it into place — rename is atomic on the same filesystem, so a reader sees either the old file or the complete new one.',
        hi: 'Likhte-likhte crash ho jaaye toh adhoori file bach jaati hai. Kisi temporary naam se likho aur usse rename kar do — ek hi filesystem pe rename atomic hai, toh padhne wale ko ya purani file dikhti hai ya poori nayi.',
      },
      code: `await fs.writeFile(p + '.tmp', data);
await fs.rename(p + '.tmp', p);      // ✓ atomic swap`,
    },
  ],

  'How do you append data to a file?': [
    {
      heading: { en: 'appendFile, or writeFile with the a flag', hi: 'appendFile, ya a flag ke saath writeFile' },
      body: {
        en: 'They are the same operation — appendFile is writeFile with flag a. Both create the file if it does not exist, so there is no need to check first.',
        hi: 'Dono ek hi kaam hain — appendFile matlab flag a ke saath writeFile. Dono file na hone pe bana dete hain, toh pehle jaanchne ki zaroorat nahi.',
      },
      code: `await fs.appendFile('app.log', line + '\\n');
await fs.writeFile('app.log', line + '\\n', { flag: 'a' });   // identical`,
    },
    {
      heading: { en: 'You add the newline yourself', hi: 'Newline tumhe khud jodna hai' },
      body: {
        en: 'Nothing is inserted between appends, so without an explicit newline every entry runs into the previous one. It is a small thing that produces an unreadable log file.',
        hi: 'Appends ke beech kuch nahi jodta, toh newline khud na do toh har entry pichhli se chipak jaati hai. Chhoti si baat hai jo log file ko padhne laayak nahi rehne deti.',
      },
    },
    {
      heading: { en: 'Repeated appends are slow', hi: 'Baar-baar append dheema hai' },
      body: {
        en: 'Each call opens the file, writes and closes it. In a loop that is a system call per line. Open a write stream once and write to it instead — the difference on ten thousand lines is large.',
        hi: 'Har call file kholta, likhta aur band karta hai. Loop mein ye har line pe ek system call hai. Uski jagah ek baar write stream kholo aur usme likho — das hazaar lines pe farq bada hai.',
      },
      code: `for (const line of lines) await fs.appendFile(p, line);   // ✗ slow

const out = fs.createWriteStream(p, { flags: 'a' });        // ✓
for (const line of lines) out.write(line + '\\n');
out.end();`,
    },
    {
      heading: { en: 'Concurrent appends can interleave', hi: 'Ek saath appends aapas mein mil sakte hain' },
      body: {
        en: 'A small write is usually atomic on Linux, but a large one can be split, so two processes appending at once may interleave mid-line. If ordering matters, use a single writer or a real logging library.',
        hi: 'Linux pe chhota write aam taur pe atomic hai, par bada tut sakta hai, toh ek saath append karte do processes line ke beech mil sakte hain. Order maayne rakhta ho toh ek hi writer rakho ya asli logging library lo.',
      },
    },
    {
      heading: { en: 'And do not hand-roll logging', hi: 'Aur logging khud mat banao' },
      body: {
        en: 'Appending to a file is fine for a script, but a server needs rotation, structured output, levels and non-blocking writes. pino or winston give you all of that, and pino writes asynchronously so it does not sit in your request path.',
        hi: 'Script ke liye file mein append theek hai, par server ko rotation, structured output, levels aur non-blocking writes chahiye. pino ya winston ye sab dete hain, aur pino asynchronously likhta hai toh wo tumhare request ke raaste mein nahi baithta.',
      },
    },
  ],

  'How do you delete a file in Node.js?': [
    {
      heading: { en: 'fs.unlink, or fs.rm', hi: 'fs.unlink, ya fs.rm' },
      body: {
        en: 'unlink is the classic name, taken from the POSIX system call. rm is newer and more capable — it handles directories and takes options — and it is what you should reach for now.',
        hi: 'unlink purana naam hai, POSIX system call se liya gaya. rm naya aur zyada kaam ka hai — wo directories sambhaalta hai aur options leta hai — aur ab yahi uthana chahiye.',
      },
      code: `await fs.unlink('temp.txt');
await fs.rm('temp.txt');            // ✓ preferred`,
    },
    {
      heading: { en: 'Deleting something that is not there throws', hi: 'Jo hai hi nahi usse mitaana error deta hai' },
      body: {
        en: 'You get ENOENT. Either catch and ignore that specific code, or pass force, which makes a missing file a no-op. force is usually what you want in cleanup code.',
        hi: 'ENOENT milta hai. Ya toh usi code ko pakad kar chhod do, ya force do, jisse gayab file pe kuch nahi hota. Cleanup code mein aam taur pe force hi chahiye hota hai.',
      },
      code: `await fs.rm(p, { force: true });     // ✓ no error if missing`,
    },
    {
      heading: { en: 'Directories need recursive', hi: 'Directories ke liye recursive chahiye' },
      body: {
        en: 'rm on a folder fails unless you pass recursive. This pair is how you replace the old rimraf dependency, and it is the standard way to clean a build output directory.',
        hi: 'Folder pe rm tab tak fail hota hai jab tak recursive na do. Yahi jodi purani rimraf dependency ki jagah leti hai, aur build output directory saaf karne ka standard tareeka yahi hai.',
      },
      code: `await fs.rm('dist', { recursive: true, force: true });`,
    },
    {
      heading: { en: 'What unlink actually does', hi: 'unlink asal mein karta kya hai' },
      body: {
        en: 'It removes the directory entry, not the data. The file is freed only when the last link and the last open file descriptor are gone — so a process still holding it keeps reading happily, and disk space is not reclaimed until it closes.',
        hi: 'Ye directory ki entry hataata hai, data nahi. File tab free hoti hai jab aakhri link aur aakhri khula file descriptor chala jaaye — toh usse pakde hue process ko padhne mein koi dikkat nahi hoti, aur disk space band hone tak wapas nahi milti.',
      },
    },
    {
      heading: { en: 'Validate the path before deleting', hi: 'Mitaane se pehle path jaancho' },
      body: {
        en: 'A delete built from user input is a path-traversal vulnerability. Resolve the path and confirm it is inside the directory you intended before removing anything — this is the single most dangerous fs operation to get wrong.',
        hi: 'User ke input se bana delete path-traversal ki kamzori hai. Kuch bhi hataane se pehle path resolve karo aur pakka karo ki wo usi directory ke andar hai jo tumne socha tha — galat karne pe fs ka sabse khatarnak operation yahi hai.',
      },
      code: `const full = path.resolve(UPLOAD_DIR, userInput);
if (!full.startsWith(path.resolve(UPLOAD_DIR) + path.sep)) throw new Error('nope');
await fs.rm(full, { force: true });`,
    },
  ],

  'How do you rename a file in Node.js?': [
    {
      heading: { en: 'fs.rename moves and renames', hi: 'fs.rename hilaata bhi hai aur naam bhi badalta hai' },
      body: {
        en: 'There is no separate move function — renaming to a different directory IS the move. One call handles both, as long as the destination directory exists.',
        hi: 'Alag se koi move function nahi hai — kisi doosri directory mein rename karna HI move hai. Ek hi call dono karta hai, bas manzil wali directory maujood honi chahiye.',
      },
      code: `await fs.rename('old.txt', 'new.txt');            // rename
await fs.rename('tmp/a.txt', 'archive/a.txt');     // move`,
    },
    {
      heading: { en: 'It overwrites the destination silently', hi: 'Ye manzil ko chup-chaap mita deta hai' },
      body: {
        en: 'If the target already exists it is replaced with no warning. Check first, or generate a unique name, if losing the existing file would matter.',
        hi: 'Manzil pehle se ho toh wo bina chetavni ke badal di jaati hai. Agar maujooda file khona nuksaan ho toh pehle jaancho, ya koi unique naam banao.',
      },
    },
    {
      heading: { en: 'It fails across filesystems', hi: 'Alag filesystems ke beech ye fail hota hai' },
      body: {
        en: 'The one that catches people in Docker. rename is a single filesystem operation, so moving from /tmp to a mounted volume throws EXDEV. The fix is copy then delete.',
        hi: 'Docker mein log isi se phasate hain. rename ek hi filesystem ka operation hai, toh /tmp se kisi mounted volume pe le jaane pe EXDEV aata hai. Ilaaj hai copy karo phir delete.',
      },
      code: `try {
  await fs.rename(src, dest);
} catch (e) {
  if (e.code !== 'EXDEV') throw e;
  await fs.copyFile(src, dest);      // ✓ across devices
  await fs.rm(src);
}`,
    },
    {
      heading: { en: 'Within one filesystem it is atomic', hi: 'Ek filesystem ke andar ye atomic hai' },
      body: {
        en: 'This is the property that makes it genuinely useful. A reader sees either the old path or the new one, never a half-moved file — which is why the write-to-temp-then-rename pattern is the standard way to write a file safely.',
        hi: 'Yahi khoobi isse sach mein kaam ka banati hai. Padhne wale ko ya purana path dikhta hai ya naya, aadhi hili hui file kabhi nahi — isiliye temp mein likho phir rename karo, ye pattern file safely likhne ka standard tareeka hai.',
      },
      code: `await fs.writeFile(p + '.tmp', data);
await fs.rename(p + '.tmp', p);`,
    },
  ],

  'What is the path module in Node.js?': [
    {
      heading: { en: 'Build and inspect paths without string surgery', hi: 'Bina string kaate paths banao aur jaancho' },
      body: {
        en: 'path handles separators, normalisation, extensions and resolution. Concatenating strings works until it does not — a double slash, a missing separator, or a backslash on Windows — and path removes the whole class of bug.',
        hi: 'path separators, normalisation, extensions aur resolution sambhaalta hai. Strings jodna tab tak chalta hai jab tak nahi chalta — double slash, gayab separator, ya Windows pe backslash — aur path bugs ki poori shreni hata deta hai.',
      },
      code: `path.join('a', 'b', 'c.txt');     // 'a/b/c.txt'  ('a\\\\b\\\\c.txt' on Windows)
'a' + '/' + 'b';                    // ✗ breaks on Windows`,
    },
    {
      heading: { en: 'join versus resolve — the key difference', hi: 'join vs resolve — asli farq' },
      body: {
        en: 'join concatenates segments and normalises. resolve builds an ABSOLUTE path, processing right to left and stopping at the first absolute segment. That difference matters, because a leading slash makes resolve discard everything before it.',
        hi: 'join hisse jodta hai aur normalise karta hai. resolve ek ABSOLUTE path banata hai, daayein se baayein chalte hue, aur pehle absolute hisse pe ruk jaata hai. Ye farq maayne rakhta hai, kyunki shuruaati slash resolve ko uske pehle ka sab kuch phenkne pe majboor karta hai.',
      },
      code: `path.join('/a', 'b');        // '/a/b'
path.resolve('/a', 'b');      // '/current/cwd'-independent → '/a/b'

path.join('/a', '/b');        // '/a/b'
path.resolve('/a', '/b');     // '/b'   ← discards '/a'`,
    },
    {
      heading: { en: 'The inspection helpers', hi: 'Jaanchne wale helpers' },
      body: {
        en: 'basename, dirname, extname and parse. parse returns all of them at once as an object, which is usually what you want when renaming or transforming a filename.',
        hi: 'basename, dirname, extname aur parse. parse in sabko ek saath object mein deta hai, aur filename badalne ya rename karte waqt aam taur pe yahi chahiye hota hai.',
      },
      code: `path.basename('/a/b/file.txt');        // 'file.txt'
path.basename('/a/b/file.txt', '.txt'); // 'file'
path.extname('/a/b/file.txt');          // '.txt'
path.parse('/a/b/file.txt');
// { root: '/', dir: '/a/b', base: 'file.txt', ext: '.txt', name: 'file' }`,
    },
    {
      heading: { en: 'Always resolve relative to the file, not the cwd', hi: 'Hamesha file ke hisaab se resolve karo, cwd ke nahi' },
      body: {
        en: 'A relative path is resolved from the working directory, which depends on where the process was started. Anchor to the module directory instead so the code works whatever directory you run it from.',
        hi: 'Relative path working directory se resolve hota hai, jo is baat pe depend karta hai ki process kahan se shuru hua. Uski jagah module ki directory se baandho taaki code kisi bhi directory se chalane pe kaam kare.',
      },
      code: `fs.readFile('./config.json');                      // ✗ depends on cwd
fs.readFile(path.join(__dirname, 'config.json'));   // ✓ CommonJS
fs.readFile(path.join(import.meta.dirname, 'config.json'));   // ✓ ESM`,
    },
    {
      heading: { en: 'And use it for the security check', hi: 'Aur security check ke liye isse use karo' },
      body: {
        en: 'Path traversal is the vulnerability this module prevents. Resolve the user-supplied path and verify it is still inside the directory you intended before touching the disk.',
        hi: 'Path traversal wahi kamzori hai jise ye module rokta hai. User ka diya path resolve karo aur disk chhoone se pehle pakka karo ki wo abhi bhi usi directory ke andar hai jo tumne socha tha.',
      },
      code: `const full = path.resolve(BASE, userInput);
if (!full.startsWith(path.resolve(BASE) + path.sep)) throw new Error('denied');
// blocks '../../etc/passwd'`,
    },
  ],

  'What is the os module in Node.js?': [
    {
      heading: { en: 'Information about the machine Node is running on', hi: 'Us machine ki jaankari jispe Node chal raha hai' },
      body: {
        en: 'os reports the platform, the CPUs, memory, the hostname, the temp directory and network interfaces. It is read-only — it tells you about the system, it does not change anything.',
        hi: 'os platform, CPUs, memory, hostname, temp directory aur network interfaces bataata hai. Ye sirf padhne ke liye hai — ye system ke baare mein bataata hai, badalta kuch nahi.',
      },
      code: `os.platform();      // 'linux' | 'darwin' | 'win32'
os.tmpdir();         // '/tmp'
os.homedir();
os.hostname();
os.totalmem();  os.freemem();  os.uptime();`,
    },
    {
      heading: { en: 'Sizing a worker pool is the main real use', hi: 'Asli upyog zyadatar worker pool ka size tay karna hai' },
      body: {
        en: 'availableParallelism is the modern call and is better than cpus().length, because it respects container CPU limits. Using cpus().length inside a container gives you the host core count and over-forks badly.',
        hi: 'availableParallelism modern call hai aur cpus().length se behtar hai, kyunki wo container ki CPU seema maanti hai. Container ke andar cpus().length host ke cores ginta hai aur buri tarah zyada fork kar deta hai.',
      },
      code: `const n = os.availableParallelism();     // ✓ container-aware
for (let i = 0; i < n; i++) cluster.fork();

os.cpus().length;                          // ✗ host cores in a container`,
    },
    {
      heading: { en: 'Cross-platform constants', hi: 'Har platform ke constants' },
      body: {
        en: 'EOL gives the correct line ending for the platform, and tmpdir gives the right temporary directory. Both save you from hardcoding something that breaks on Windows.',
        hi: 'EOL platform ke hisaab se sahi line ending deta hai, aur tmpdir sahi temporary directory. Dono tumhe aisi cheez hardcode karne se bachate hain jo Windows pe toot jaati hai.',
      },
      code: `lines.join(os.EOL);                     // '\\n' or '\\r\\n'
path.join(os.tmpdir(), 'upload.tmp');`,
    },
    {
      heading: { en: 'The health-check use', hi: 'Health-check wala upyog' },
      body: {
        en: 'Reporting free memory, load average and uptime in a health endpoint or a metrics exporter. Note loadavg returns zeros on Windows, so guard it if you support that platform.',
        hi: 'Health endpoint ya metrics exporter mein free memory, load average aur uptime batana. Dhyaan do Windows pe loadavg zero deta hai, toh us platform ko support karte ho toh sambhaal lo.',
      },
      code: `res.json({
  uptime: process.uptime(),
  freeMem: os.freemem(),
  load: os.loadavg(),      // [1m, 5m, 15m] — zeros on Windows
});`,
    },
    {
      heading: { en: 'It reports the host, not the container', hi: 'Ye host bataata hai, container nahi' },
      body: {
        en: 'Worth knowing and often missed. totalmem and cpus report the physical machine, ignoring cgroup limits, so a container capped at 512MB still reports the host memory. Read the cgroup files or use availableParallelism when limits matter.',
        hi: 'Jaanne laayak hai aur aksar chhoot jaata hai. totalmem aur cpus asli machine batate hain, cgroup ki seemayein ignore karte hue, toh 512MB pe capped container bhi host ki memory bataata hai. Seemayein maayne rakhein toh cgroup files padho ya availableParallelism use karo.',
      },
    },
  ],

  'What is the http module in Node.js?': [
    {
      heading: { en: 'The protocol layer, and nothing above it', hi: 'Protocol ki layer, uske upar kuch nahi' },
      body: {
        en: 'http creates servers and makes requests. It parses the request line, headers and body framing and hands you a request stream and a response stream. Routing, parsing and everything else is your job.',
        hi: 'http servers banata hai aur requests karta hai. Wo request line, headers aur body ka dhaancha parse karta hai aur tumhe ek request stream aur ek response stream deta hai. Routing, parsing aur baaki sab tumhara kaam hai.',
      },
      code: `require('node:http')
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
  })
  .listen(3000);`,
    },
    {
      heading: { en: 'req and res are streams', hi: 'req aur res streams hain' },
      body: {
        en: 'This is the fact that explains everything else. req is a readable stream, so the body arrives in chunks and you must collect it. res is a writable stream, which is why you can pipe a file straight to a client without buffering it.',
        hi: 'Yahi tathya baaki sab samjhaata hai. req ek readable stream hai, toh body tukdon mein aati hai aur tumhe usse jama karna padta hai. res ek writable stream hai, isiliye tum koi file bina buffer kiye seedha client ko pipe kar sakte ho.',
      },
      code: `fs.createReadStream('big.mp4').pipe(res);    // ✓ constant memory`,
    },
    {
      heading: { en: 'Reading a body is manual, and easy to get wrong', hi: 'Body padhna haath se hai, aur galat hona aasaan' },
      body: {
        en: 'You have to accumulate the chunks yourself, and you must cap the size — an unbounded body is a denial-of-service hole, because one client can exhaust your memory.',
        hi: 'Chunks khud jama karne padte hain, aur size ki seema lagani hi padti hai — bina seema wali body denial-of-service ka chhed hai, kyunki ek client tumhari memory khatam kar sakta hai.',
      },
      code: `let body = '';
req.on('data', (c) => {
  body += c;
  if (body.length > 1e6) req.destroy();      // ✓ cap it
});
req.on('end', () => { /* parse */ });`,
    },
    {
      heading: { en: 'It is also a client', hi: 'Ye client bhi hai' },
      body: {
        en: 'http.request and http.get make outgoing calls, but the API is stream-based and verbose. In modern Node, fetch is global and is what you should use unless you need something the low-level API exposes.',
        hi: 'http.request aur http.get bahar calls karte hain, par API stream wali aur lambi hai. Modern Node mein fetch global hai aur wahi use karna chahiye, jab tak low-level API ki koi khaas cheez na chahiye.',
      },
      code: `const res = await fetch('https://api.example.com');   // ✓ modern
const data = await res.json();`,
    },
    {
      heading: { en: 'Keep-alive and the agent', hi: 'Keep-alive aur agent' },
      body: {
        en: 'An agent pools sockets across requests. Node enables keep-alive by default now, which matters a lot for a service calling another service — without it every call pays a fresh TCP and TLS handshake.',
        hi: 'Agent requests ke beech sockets ka pool rakhta hai. Node ab default se keep-alive chaalu rakhta hai, aur ek service ko doosri service bulaane mein ye bahut maayne rakhta hai — iske bina har call naya TCP aur TLS handshake bhugatti hai.',
      },
    },
    {
      heading: { en: 'What you would actually use', hi: 'Tum asal mein kya use karoge' },
      body: {
        en: 'Express or Fastify for a server, because you would otherwise rebuild routing, body parsing and error handling badly. https for TLS, or more often a reverse proxy that terminates it. And http2 where you need multiplexing.',
        hi: 'Server ke liye Express ya Fastify, kyunki warna tum routing, body parsing aur error handling dobara aur kharaab bana rahe hoge. TLS ke liye https, ya aksar koi reverse proxy jo usse khatam kare. Aur jahan multiplexing chahiye wahan http2.',
      },
    },
  ],

  'What is the crypto module in Node.js?': [
    {
      heading: { en: 'Hashing, encryption, signing and randomness', hi: 'Hashing, encryption, signing aur randomness' },
      body: {
        en: 'crypto wraps OpenSSL and covers hashes, HMACs, symmetric and asymmetric encryption, signatures, key derivation and cryptographically secure random values. It is core, so nothing to install.',
        hi: 'crypto OpenSSL ko lapetta hai aur hashes, HMACs, symmetric aur asymmetric encryption, signatures, key derivation aur cryptographically secure random values deta hai. Ye core hai, toh install kuch nahi.',
      },
    },
    {
      heading: { en: 'Never use a plain hash for a password', hi: 'Password ke liye saada hash kabhi mat lo' },
      body: {
        en: 'The single most important thing in this answer. SHA-256 is designed to be fast, which is exactly wrong for passwords — a GPU tries billions per second. Use a deliberately slow key-derivation function with a per-user salt.',
        hi: 'Is jawab ki sabse zaroori baat. SHA-256 tez hone ke liye bana hai, jo passwords ke liye bilkul galat hai — ek GPU arabon koshishein per second karta hai. Jaan-boojh kar dheemi key-derivation function aur har user ka alag salt use karo.',
      },
      code: `crypto.createHash('sha256').update(pw).digest('hex');   // ✗ never

await new Promise((res, rej) =>
  crypto.scrypt(pw, salt, 64, (e, key) => (e ? rej(e) : res(key))));
// ✓ scrypt, argon2 or bcrypt`,
    },
    {
      heading: { en: 'randomBytes, not Math.random', hi: 'Math.random nahi, randomBytes' },
      body: {
        en: 'Math.random is not cryptographically secure and is predictable from previous outputs. Any token, session id, password reset code or nonce must come from crypto.',
        hi: 'Math.random cryptographically secure nahi hai aur pichhle outputs se andaaza lagaya ja sakta hai. Koi bhi token, session id, password reset code ya nonce crypto se hi aana chahiye.',
      },
      code: `crypto.randomBytes(32).toString('hex');    // ✓ a secure token
crypto.randomUUID();                        // ✓ a v4 UUID
Math.random().toString(36);                 // ✗ predictable`,
    },
    {
      heading: { en: 'Compare secrets in constant time', hi: 'Secrets ko constant time mein compare karo' },
      body: {
        en: 'A normal string comparison returns as soon as it finds a difference, so the time it takes leaks how much of the value was correct. timingSafeEqual always takes the same time. This matters for API keys and signature verification.',
        hi: 'Aam string comparison farq milte hi laut aata hai, toh laga hua samay bata deta hai kitna hissa sahi tha. timingSafeEqual hamesha utna hi samay leta hai. API keys aur signature verification mein ye maayne rakhta hai.',
      },
      code: `if (token === expected) {}                       // ✗ timing leak
crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));   // ✓`,
    },
    {
      heading: { en: 'HMAC for verifying a webhook', hi: 'Webhook jaanchne ke liye HMAC' },
      body: {
        en: 'The most common real use after hashing. Compute the HMAC of the raw body with the shared secret and compare it to the header — and note it must be the RAW body, before any JSON parsing, or the signature will not match.',
        hi: 'Hashing ke baad sabse aam asli upyog. Saanjhe secret se kachche body ka HMAC banao aur usse header se milao — aur dhyaan do wo KACHCHA body hona chahiye, kisi bhi JSON parsing se pehle, warna signature match nahi karega.',
      },
      code: `const sig = crypto.createHmac('sha256', SECRET)
  .update(rawBody).digest('hex');`,
    },
    {
      heading: { en: 'Most of it runs on the thread pool', hi: 'Iska zyadatar hissa thread pool pe chalta hai' },
      body: {
        en: 'The async forms of pbkdf2, scrypt and randomBytes go to the libuv pool, so they do not block the event loop. The sync forms do — and a synchronous password hash in a login handler blocks every other request.',
        hi: 'pbkdf2, scrypt aur randomBytes ke async roop libuv pool pe jaate hain, toh wo event loop nahi rokte. Sync roop rokte hain — aur login handler mein synchronous password hash har doosri request rok deta hai.',
      },
      code: `crypto.pbkdf2Sync(...);      // ✗ blocks
crypto.pbkdf2(..., cb);       // ✓ thread pool`,
    },
    {
      heading: { en: 'And do not invent your own scheme', hi: 'Aur apna tareeka mat banao' },
      body: {
        en: 'Use a vetted library for anything above hashing — jsonwebtoken for JWTs, argon2 or bcrypt for passwords, libsodium for encryption. Choosing a cipher mode and an IV correctly is genuinely hard, and getting it subtly wrong looks identical to getting it right.',
        hi: 'Hashing se upar har cheez ke liye jaanchi-parkhi library lo — JWTs ke liye jsonwebtoken, passwords ke liye argon2 ya bcrypt, encryption ke liye libsodium. Cipher mode aur IV theek chunna sach mein mushkil hai, aur sookshm galti bilkul sahi jaisi dikhti hai.',
      },
    },
  ],

  'What is the stream module in Node.js?': [
    {
      heading: { en: 'Process data in chunks instead of all at once', hi: 'Data ek saath nahi, tukdon mein chalao' },
      body: {
        en: 'A stream lets you work with data as it arrives, so memory stays flat regardless of total size. Reading a 5GB file with readFile needs 5GB of heap; streaming it needs a few megabytes.',
        hi: 'Stream data ko aate hi chalane deta hai, toh kul size chahe kuch bhi ho memory sthir rehti hai. readFile se 5GB ki file ko 5GB heap chahiye; stream karo toh kuch megabytes.',
      },
      diagram: `readFile   [████████████████████]  all in memory
stream     [██]→[██]→[██]→[██]→      one chunk at a time`,
    },
    {
      heading: { en: 'Four types', hi: 'Chaar prakaar' },
      body: {
        en: 'Readable produces data, Writable consumes it, Duplex does both on independent channels, and Transform is a Duplex where the output is derived from the input. gzip is the canonical Transform.',
        hi: 'Readable data banata hai, Writable usse leta hai, Duplex dono alag-alag raaston pe karta hai, aur Transform aisa Duplex hai jisme output input se banta hai. gzip Transform ki asli misaal hai.',
      },
      code: `fs.createReadStream(p);      // Readable
fs.createWriteStream(p);      // Writable
net.Socket;                    // Duplex
zlib.createGzip();             // Transform`,
    },
    {
      heading: { en: 'They are EventEmitters', hi: 'Ye EventEmitters hain' },
      body: {
        en: 'data, end, error and finish are the events you will handle. Forgetting the error listener is the most common mistake — an unhandled stream error crashes the process.',
        hi: 'data, end, error aur finish — yahi events tum sambhaaloge. Error listener bhoolna sabse aam galti hai — bina sambhala stream error process crash kar deta hai.',
      },
    },
    {
      heading: { en: 'Backpressure is the reason they work', hi: 'Ye chalte isliye hain: backpressure' },
      body: {
        en: 'write returns false when the destination cannot keep up, telling you to pause the source. Ignore it and the buffer grows until you run out of memory — so a fast disk feeding a slow network is a crash, not a slowdown.',
        hi: 'Jab manzil saath nahi de paati tab write false deta hai, matlab source ko rok do. Isse ignore karo aur buffer badhta rehta hai jab tak memory khatam na ho — toh tez disk se dheeme network pe bhejna dheemapan nahi, crash hai.',
      },
    },
    {
      heading: { en: 'Use pipeline, not pipe', hi: 'pipe nahi, pipeline use karo' },
      body: {
        en: 'Both handle backpressure. Only pipeline propagates errors and destroys every stream on failure — pipe leaves the others open, which is a real file-descriptor leak in a long-running server.',
        hi: 'Dono backpressure sambhaalte hain. Sirf pipeline errors aage bhejta hai aur fail hone pe har stream destroy karta hai — pipe baaki ko khula chhod deta hai, jo lambe chalne wale server mein asli file-descriptor leak hai.',
      },
      code: `const { pipeline } = require('node:stream/promises');

await pipeline(
  fs.createReadStream('in.txt'),
  zlib.createGzip(),
  fs.createWriteStream('out.gz')
);      // ✓ backpressure AND error handling`,
    },
    {
      heading: { en: 'Async iteration is the readable modern form', hi: 'Modern padhne laayak roop async iteration hai' },
      body: {
        en: 'for await over a readable applies backpressure naturally, because the loop does not pull the next chunk until the body finishes. It reads far better than wiring up data and end handlers.',
        hi: 'Kisi readable pe for await backpressure apne aap lagata hai, kyunki loop agla chunk tab tak nahi kheenchta jab tak body khatam na ho. Ye data aur end handlers jodne se kahin behtar padha jaata hai.',
      },
      code: `for await (const chunk of fs.createReadStream('big.csv')) {
  await process(chunk);
}`,
    },
    {
      heading: { en: 'Where you already use them', hi: 'Tum inhe pehle se kahan use karte ho' },
      body: {
        en: 'req and res in an HTTP server are streams. So is process.stdout, every socket, and every file handle. Recognising that is what lets you pipe a file to a client or a database cursor to a CSV response without buffering.',
        hi: 'HTTP server ke req aur res streams hain. process.stdout bhi, har socket bhi, aur har file handle bhi. Ye pehchan lena hi tumhe bina buffer kiye file ko client tak ya database cursor ko CSV response tak bhejne deta hai.',
      },
    },
  ],

  'What is a Buffer in Node.js?': [
    {
      heading: { en: 'A fixed-length array of raw bytes', hi: 'Kachche bytes ka tay lambai wala array' },
      body: {
        en: 'A Buffer holds binary data outside the V8 heap. It exists because JavaScript strings are UTF-16 text and cannot represent arbitrary bytes — and a server constantly deals with bytes: files, sockets, images, crypto.',
        hi: 'Buffer binary data ko V8 heap ke bahar rakhta hai. Ye isliye hai kyunki JavaScript strings UTF-16 text hain aur kisi bhi byte ko nahi dikha sakti — aur server lagataar bytes se hi kaam karta hai: files, sockets, images, crypto.',
      },
      code: `const b = Buffer.from('hello', 'utf8');
b;                    // <Buffer 68 65 6c 6c 6f>
b.length;             // 5 — BYTES, not characters
b.toString('base64'); // 'aGVsbG8='`,
    },
    {
      heading: { en: 'length is bytes, not characters', hi: 'length bytes hai, characters nahi' },
      body: {
        en: 'The trap worth demonstrating. A multi-byte character takes more than one byte, so a string of two visible characters can be a six-byte buffer. Slicing a buffer at an arbitrary offset can cut a character in half.',
        hi: 'Dikhane laayak jaal. Multi-byte character ek se zyada byte leta hai, toh do dikhne wale characters ki string chhah byte ka buffer ho sakti hai. Kisi bhi jagah buffer kaato toh character aadha kat sakta hai.',
      },
      code: `Buffer.from('hi').length;      // 2
Buffer.from('नमस्ते').length;   // 18 — bytes, not letters`,
    },
    {
      heading: { en: 'It lives outside the V8 heap', hi: 'Ye V8 heap ke bahar rehta hai' },
      body: {
        en: 'Buffer memory is allocated natively, so it shows up in RSS but not in heapUsed. That is why a Buffer leak looks like growing RSS with a flat heap — a genuinely useful diagnostic detail.',
        hi: 'Buffer ki memory native taur pe milti hai, toh wo RSS mein dikhti hai par heapUsed mein nahi. Isiliye Buffer ka leak aisa dikhta hai: RSS badhta hua aur heap sthir — ek sach mein kaam ki jaanch wali baat.',
      },
    },
    {
      heading: { en: 'Never use the Buffer constructor', hi: 'Buffer constructor kabhi mat use karo' },
      body: {
        en: 'new Buffer is deprecated and unsafe. Buffer.allocUnsafe is fast but returns memory that may still contain old data, which is a real information-disclosure bug if you send it before overwriting it. Buffer.alloc zeroes it.',
        hi: 'new Buffer deprecated aur asurakshit hai. Buffer.allocUnsafe tez hai par aisi memory deta hai jisme purana data ho sakta hai, jo overwrite karne se pehle bhej do toh asli information-disclosure bug hai. Buffer.alloc usse zero kar deta hai.',
      },
      code: `new Buffer(10);              // ✗ deprecated
Buffer.allocUnsafe(10);       // ⚠ fast, may contain old memory
Buffer.alloc(10);             // ✓ zero-filled
Buffer.from(data);            // ✓ from existing data`,
    },
    {
      heading: { en: 'Concatenating in a loop is the common bug', hi: 'Loop mein jodna aam bug hai' },
      body: {
        en: 'Buffer.concat allocates a new buffer each call, so building up a body chunk by chunk that way is O(n²). Collect the chunks in an array and concat once at the end.',
        hi: 'Buffer.concat har call pe naya buffer banata hai, toh body ko chunk-dar-chunk aise banana O(n²) hai. Chunks ko array mein jama karo aur aakhir mein ek baar concat karo.',
      },
      code: `let buf = Buffer.alloc(0);
for (const c of chunks) buf = Buffer.concat([buf, c]);   // ✗ O(n²)

const parts = [];
for (const c of chunks) parts.push(c);
const buf = Buffer.concat(parts);                         // ✓ O(n)`,
    },
    {
      heading: { en: 'Where you actually meet one', hi: 'Ye tumhe asal mein kahan milta hai' },
      body: {
        en: 'fs.readFile with no encoding, every chunk from a socket or a file stream, image and file uploads, crypto output, and base64 encoding. Most of the time you convert it to a string immediately and never think about it again.',
        hi: 'Bina encoding ke fs.readFile, socket ya file stream ka har chunk, image aur file uploads, crypto ka output, aur base64 encoding. Zyadatar tum usse turant string bana dete ho aur phir kabhi soch te hi nahi.',
      },
    },
    {
      heading: { en: 'It is a Uint8Array underneath', hi: 'Ye andar se Uint8Array hai' },
      body: {
        en: 'Buffer extends Uint8Array, so every typed-array method works and it can be passed anywhere a Uint8Array is expected — including Web APIs and worker postMessage. Worth knowing when interoperating with browser-shaped code.',
        hi: 'Buffer Uint8Array ko extend karta hai, toh har typed-array method chalta hai aur usse har us jagah bhej sakte ho jahan Uint8Array chahiye — Web APIs aur worker postMessage samet. Browser jaise code ke saath kaam karte waqt ye jaanna kaam ka hai.',
      },
    },
  ],

  /* ─── The event loop, concurrency and timing ──────────────── */

  'What are child processes in Node.js?': [
    {
      heading: { en: 'Running another program from Node', hi: 'Node se koi doosra program chalana' },
      body: {
        en: 'The child_process module spawns a separate OS process — a shell command, a Python script, ffmpeg, or another Node program. Each child has its own memory and its own PID, and communicates over pipes.',
        hi: 'child_process module ek alag OS process banata hai — koi shell command, Python script, ffmpeg, ya doosra Node program. Har child ki apni memory aur apna PID hota hai, aur baat pipes se hoti hai.',
      },
    },
    {
      heading: { en: 'Four functions, and the difference matters', hi: 'Chaar functions, aur farq maayne rakhta hai' },
      body: {
        en: 'spawn streams the output and is the one to use for large or long-running output. exec buffers everything into memory and runs it through a shell. execFile is exec without a shell. fork is spawn specialised for a Node script, with a message channel built in.',
        hi: 'spawn output stream karta hai aur bade ya lambe output ke liye yahi lena chahiye. exec sab kuch memory mein jama karta hai aur shell se chalata hai. execFile bina shell ke exec hai. fork Node script ke liye khaas spawn hai, jisme message channel pehle se hai.',
      },
      diagram: `spawn      streams output       any command, large output
exec       buffers output       small output, runs a shell
execFile   buffers output       no shell — safer
fork       Node only            adds an IPC message channel`,
    },
    {
      heading: { en: 'exec runs a shell, which is the security problem', hi: 'exec shell chalata hai, aur yahi security problem hai' },
      body: {
        en: 'Because exec passes the string to a shell, any user input in it can be command injection. execFile and spawn take an argument array and do not involve a shell, so a semicolon in the input is just a semicolon.',
        hi: 'exec string ko shell ko deta hai, toh usme koi bhi user input command injection ban sakti hai. execFile aur spawn arguments ka array lete hain aur shell shaamil hi nahi karte, toh input mein semicolon bas semicolon hi rehta hai.',
      },
      code: `exec(\`convert \${userFile} out.png\`);              // ✗ injection
execFile('convert', [userFile, 'out.png']);        // ✓ no shell`,
    },
    {
      heading: { en: 'exec also has a buffer limit', hi: 'exec ki ek buffer seema bhi hai' },
      body: {
        en: 'It collects all output in memory and fails with maxBuffer exceeded past the default. For anything that produces real output — a build, a log dump, a video encode — use spawn and stream it instead.',
        hi: 'Wo saara output memory mein jama karta hai aur default se aage maxBuffer exceeded se fail ho jaata hai. Jo bhi asli output de — build, log dump, video encode — uske liye spawn lo aur stream karo.',
      },
      code: `const p = spawn('ffmpeg', args);
p.stdout.pipe(res);
p.stderr.on('data', (d) => logger.warn(d.toString()));
p.on('close', (code) => { /* code 0 means success */ });`,
    },
    {
      heading: { en: 'fork gives you a message channel', hi: 'fork ek message channel deta hai' },
      body: {
        en: 'It runs a Node script and sets up IPC automatically, so parent and child can send structured messages. This is what cluster uses internally, and it is how you hand work to a separate Node process.',
        hi: 'Wo ek Node script chalata hai aur IPC apne aap laga deta hai, toh parent aur child structured messages bhej sakte hain. cluster andar se yahi use karta hai, aur kisi alag Node process ko kaam dene ka tareeka yahi hai.',
      },
      code: `const child = fork('./worker.js');
child.send({ job: 42 });
child.on('message', (result) => console.log(result));`,
    },
    {
      heading: { en: 'child_process versus worker_threads', hi: 'child_process vs worker_threads' },
      body: {
        en: 'The follow-up you should expect. A child process is heavier — a full process, tens of megabytes, message passing by serialisation — but fully isolated and can run any program. A worker thread is lighter, shares memory, and can only run JavaScript. Use a child process for external programs, a worker for CPU-bound JavaScript.',
        hi: 'Ye follow-up aane wala hai. Child process bhaari hai — poora process, dus-bees MB, messages serialisation se — par poori tarah alag hai aur koi bhi program chala sakta hai. Worker thread halka hai, memory share karta hai, aur sirf JavaScript chala sakta hai. Bahari programs ke liye child process, CPU wale JavaScript ke liye worker.',
      },
    },
    {
      heading: { en: 'Always handle exit and stderr', hi: 'exit aur stderr hamesha sambhaalo' },
      body: {
        en: 'A non-zero exit code is how the child reports failure, and stderr is where the reason is. Ignoring both is why a spawned command silently does nothing and the bug takes an afternoon to find.',
        hi: 'Non-zero exit code se child failure bataata hai, aur wajah stderr mein hoti hai. Dono ignore karna hi wajah hai ki koi spawn kiya command chup-chaap kuch nahi karta aur bug dhoondhne mein poora din lag jaata hai.',
      },
    },
  ],

  'What is the Event Loop in Node.js?': [
    {
      heading: { en: 'The scheduler that makes one thread enough', hi: 'Wo scheduler jo ek thread ko kaafi bana deta hai' },
      body: {
        en: 'The event loop is a libuv loop that waits for completed operations and runs their callbacks on the single JavaScript thread. It is what turns "hand the work to the OS and return immediately" into a working concurrency model.',
        hi: 'Event loop libuv ka ek loop hai jo poore hue operations ka intezaar karta hai aur unke callbacks us akele JavaScript thread pe chalata hai. Yahi "kaam OS ko do aur turant lauto" ko ek chalta hua concurrency model banata hai.',
      },
    },
    {
      heading: { en: 'Six phases, in a fixed order', hi: 'Chhah phases, ek tay kram mein' },
      body: {
        en: 'Each iteration goes through the phases in order, running the callbacks queued for each. Three of them matter in practice: timers, poll and check. The others are internal or rare.',
        hi: 'Har chakkar phases se kram se guzarta hai, har ek ke queue hue callbacks chalate hue. Asal mein teen maayne rakhte hain: timers, poll aur check. Baaki andar ke ya kam aane wale hain.',
      },
      diagram: `   ┌──────────────────────────┐
   │        timers            │  setTimeout, setInterval
   │        pending           │  some deferred system callbacks
   │        idle / prepare    │  internal
   │        POLL              │  I/O callbacks; may WAIT here
   │        check             │  setImmediate
   │        close             │  socket.on('close')
   └──────────┬───────────────┘
              └── repeat

   between EVERY phase: drain nextTick, then microtasks`,
    },
    {
      heading: { en: 'Poll is where the loop actually waits', hi: 'Loop asal mein poll pe hi intezaar karta hai' },
      body: {
        en: 'Poll runs I/O callbacks and, if nothing else is pending, blocks there waiting for new I/O. That waiting is what makes an idle Node process use no CPU — it is asleep in the kernel, not spinning.',
        hi: 'Poll I/O callbacks chalata hai aur agar kuch aur pending na ho toh wahin naye I/O ka intezaar karta hai. Wahi intezaar khaali Node process ko zero CPU pe rakhta hai — wo kernel mein so raha hota hai, ghoom nahi raha.',
      },
    },
    {
      heading: { en: 'nextTick and microtasks run between phases', hi: 'nextTick aur microtasks phases ke beech chalte hain' },
      body: {
        en: 'They are not phases. After every operation and between every phase, Node drains the nextTick queue completely, then the promise microtask queue completely. That is why a promise callback always beats a timer.',
        hi: 'Ye phases nahi hain. Har operation ke baad aur har phase ke beech, Node pehle nextTick queue poori khaali karta hai, phir promise wali microtask queue poori. Isiliye promise ka callback hamesha timer se jeet jaata hai.',
      },
      code: `setTimeout(() => console.log('timer'));
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('tick'));
// tick, promise, then timer/immediate depending on the phase`,
    },
    {
      heading: { en: 'How the browser loop differs', hi: 'Browser ka loop kaise alag hai' },
      body: {
        en: 'A common follow-up. The browser has no phases — it has one macrotask queue, drains microtasks after each task, and fits rendering in between. Node has named phases, a nextTick queue that outranks promises, and no rendering step at all.',
        hi: 'Ek aam follow-up. Browser mein phases nahi hain — ek macrotask queue hai, har task ke baad microtasks khaali hote hain, aur beech mein rendering aa jaati hai. Node mein naam wale phases hain, ek nextTick queue jo promises se upar hai, aur rendering ka koi step hi nahi.',
      },
    },
    {
      heading: { en: 'The loop exits when nothing is left', hi: 'Kuch na bache toh loop nikal jaata hai' },
      body: {
        en: 'Node keeps looping while any handle is active — an open server, a pending timer, an outstanding request. When the last one goes, the loop exits and the process ends. This is why a script with a listening server never terminates on its own.',
        hi: 'Jab tak koi handle chaalu hai Node ghoomta rehta hai — khula server, pending timer, bachi hui request. Aakhri ke jaate hi loop nikal jaata hai aur process khatam. Isiliye listening server wali script apne aap kabhi khatam nahi hoti.',
      },
    },
    {
      heading: { en: 'And you can block it', hi: 'Aur tum isse rok sakte ho' },
      body: {
        en: 'The loop only advances when your callback returns. A long synchronous function, a huge JSON.parse or a nextTick that reschedules itself stops the loop entirely — no I/O, no timers, no requests served. Everything about Node performance comes back to this.',
        hi: 'Loop tabhi aage badhta hai jab tumhara callback laut aaye. Lamba synchronous function, bada JSON.parse, ya khud ko dobara schedule karta nextTick loop poori tarah rok deta hai — na I/O, na timers, na koi request. Node ki performance ki har baat yahin lautti hai.',
      },
    },
  ],

  'How does Node.js handle concurrency?': [
    {
      heading: { en: 'Concurrency without parallelism', hi: 'Bina parallelism ke concurrency' },
      body: {
        en: 'Node handles many operations at once without running them at the same time. Your JavaScript executes on one thread; what overlaps is the WAITING, which happens outside that thread entirely.',
        hi: 'Node kai operations ek saath sambhaalta hai bina unhe ek hi samay chalaye. Tumhari JavaScript ek thread pe chalti hai; jo overlap hota hai wo INTEZAAR hai, jo us thread ke bahar hota hai.',
      },
      diagram: `parallel     ████████    two things executing at once
             ████████

concurrent   ██   ██  ██   one thread, interleaved
             ~~~~~~~~~~    the waiting overlaps`,
    },
    {
      heading: { en: 'The mechanism, in one sentence', hi: 'Machinery, ek line mein' },
      body: {
        en: 'A request arrives, your handler starts an I/O call, Node hands it to libuv or the OS and the handler returns. The thread immediately picks up the next request. When the I/O finishes, the callback is queued and the event loop runs it.',
        hi: 'Request aati hai, tumhara handler ek I/O call shuru karta hai, Node usse libuv ya OS ko de deta hai aur handler laut aata hai. Thread turant agli request uthata hai. I/O khatam hone pe callback queue hota hai aur event loop usse chalata hai.',
      },
    },
    {
      heading: { en: 'Why this beats a thread per request', hi: 'Ye har request pe thread se behtar kyun hai' },
      body: {
        en: 'A thread-per-request server allocates a stack for every connection, so ten thousand mostly-idle connections is gigabytes of memory and constant context switching. Node holds each as a callback, so an idle connection costs almost nothing.',
        hi: 'Har request pe thread wala server har connection ke liye stack leta hai, toh das hazaar zyadatar khaali connections gigabytes memory aur lagataar context switching hain. Node har ek ko ek callback ki tarah rakhta hai, toh khaali connection ki lagbhag koi keemat nahi.',
      },
    },
    {
      heading: { en: 'Where the work really happens', hi: 'Kaam asal mein hota kahan hai' },
      body: {
        en: 'Network sockets go to the OS event notification — epoll, kqueue or IOCP — with no thread involved. File, DNS and crypto work goes to the libuv thread pool, which has four threads by default. Knowing which is which explains why four large file reads are fast and the fifth waits.',
        hi: 'Network sockets OS ke event notification pe jaate hain — epoll, kqueue ya IOCP — bina kisi thread ke. File, DNS aur crypto ka kaam libuv ke thread pool pe, jisme default se chaar threads hain. Kaunsa kya hai ye jaanne se samajh aata hai ki chaar bade file reads tez kyun hain aur paanchwa intezaar kyun karta hai.',
      },
    },
    {
      heading: { en: 'Concurrency in your own code', hi: 'Tumhare apne code mein concurrency' },
      body: {
        en: 'Awaiting in a loop serialises independent work. Start everything and await once with Promise.all, and the waits overlap. This is the most common place a Node service is accidentally three times slower than it needs to be.',
        hi: 'Loop mein await karna alag-alag kaam ko serial bana deta hai. Sab shuru karo aur Promise.all se ek baar await karo, toh intezaar overlap ho jaate hain. Node service galti se teen guna dheemi hone ki sabse aam jagah yahi hai.',
      },
      code: `for (const id of ids) out.push(await fetchOne(id));   // ✗ serial
const out = await Promise.all(ids.map(fetchOne));      // ✓ concurrent`,
    },
    {
      heading: { en: 'The limit: one CPU-bound task ruins it', hi: 'Seema: ek CPU wala kaam sab bigaad deta hai' },
      body: {
        en: 'The model works because handlers return quickly. A synchronous computation occupies the thread and every queued callback waits behind it, so throughput collapses. This is the single caveat that must be in the answer.',
        hi: 'Model isliye chalta hai kyunki handlers jaldi laut aate hain. Synchronous computation thread ghere leti hai aur har queue hua callback uske peeche ruk jaata hai, toh throughput girr jaata hai. Ye ek chetavni jawab mein honi hi chahiye.',
      },
    },
    {
      heading: { en: 'And how you get real parallelism', hi: 'Aur asli parallelism kaise milti hai' },
      body: {
        en: 'worker_threads for CPU-bound JavaScript, cluster or one container per core to use every core for request handling, and a job queue for heavy background work. All three are opt-in; none happens by default.',
        hi: 'CPU wale JavaScript ke liye worker_threads, har core ko requests ke liye use karne ko cluster ya har core pe ek container, aur bhaari background kaam ke liye job queue. Teeno khud chunne padte hain; default se koi nahi hota.',
      },
    },
  ],

  'What is non-blocking I/O?': [
    {
      heading: { en: 'The call returns before the work finishes', hi: 'Kaam khatam hone se pehle call laut aata hai' },
      body: {
        en: 'A non-blocking call starts an operation and returns immediately, leaving your thread free. The result arrives later through a callback, a promise or await. Nothing sits idle waiting.',
        hi: 'Non-blocking call operation shuru karke turant laut aata hai, tumhara thread khaali chhodte hue. Nateeja baad mein callback, promise ya await se aata hai. Koi khaali baith kar intezaar nahi karta.',
      },
      code: `const data = await fs.promises.readFile('a.txt');
// the thread served other requests while the disk was busy`,
    },
    {
      heading: { en: 'Why it matters so much in Node', hi: 'Node mein ye itna kyun maayne rakhta hai' },
      body: {
        en: 'Because there is only one thread for your code. In a thread-per-request server a blocking call only stalls that request. In Node it stalls every request, so non-blocking is not an optimisation — it is what makes the model work at all.',
        hi: 'Kyunki tumhare code ke liye ek hi thread hai. Har request pe thread wale server mein blocking call sirf us request ko rokti hai. Node mein wo har request rok deti hai, toh non-blocking optimisation nahi — isi se poora model chalta hai.',
      },
    },
    {
      heading: { en: 'How Node actually achieves it', hi: 'Node ise asal mein kaise karta hai' },
      body: {
        en: 'Sockets use the OS event notification system, so there is genuinely no thread waiting. File and DNS work is not truly async at the OS level on Linux, so libuv fakes it with a thread pool — the call is non-blocking to you, but a pool thread is blocked on your behalf.',
        hi: 'Sockets OS ke event notification system pe chalte hain, toh sach mein koi thread intezaar nahi karta. Linux pe OS star pe file aur DNS ka kaam sach mein async nahi hai, toh libuv usse thread pool se banata hai — tumhare liye call non-blocking hai, par tumhari taraf se ek pool thread ruka hua hai.',
      },
      diagram: `sockets   → epoll / kqueue / IOCP   truly non-blocking
files     → libuv thread pool        a pool thread waits for you`,
    },
    {
      heading: { en: 'Non-blocking is not the same as parallel', hi: 'Non-blocking aur parallel ek nahi hain' },
      body: {
        en: 'Worth stating clearly. Your callbacks still run one at a time on one thread. What overlaps is the waiting, not the executing — so two non-blocking calls finish sooner together, but their callbacks never run simultaneously.',
        hi: 'Saaf kehna zaroori hai. Tumhare callbacks ab bhi ek-ek karke ek thread pe chalte hain. Overlap intezaar ka hota hai, chalne ka nahi — toh do non-blocking calls saath mein jaldi khatam hote hain, par unke callbacks kabhi ek saath nahi chalte.',
      },
    },
    {
      heading: { en: 'Async syntax does not guarantee non-blocking', hi: 'Async syntax non-blocking ki guarantee nahi hai' },
      body: {
        en: 'The trap. Marking a function async and awaiting inside it does nothing if the work itself is synchronous CPU computation — the await yields, but the loop the function runs still occupies the thread.',
        hi: 'Ye jaal hai. Function ko async likhna aur andar await karna kuch nahi karta agar kaam khud synchronous CPU computation ho — await mauka deta hai, par function jo loop chalata hai wo thread ghere hi rehta hai.',
      },
      code: `async function slow() {
  for (let i = 0; i < 1e10; i++) {}    // ✗ still blocks everything
}`,
    },
    {
      heading: { en: 'The takeaway', hi: 'Nichod' },
      body: {
        en: '"Non-blocking means an I/O call returns immediately and the result comes back through the event loop, so one thread can have thousands of operations in flight. It only applies to I/O — CPU work always blocks, whatever syntax you wrap it in."',
        hi: '"Non-blocking matlab I/O call turant laut aata hai aur nateeja event loop se wapas aata hai, toh ek thread pe hazaaron operations chal sakte hain. Ye sirf I/O pe lagta hai — CPU ka kaam hamesha rokta hai, chahe usse kisi bhi syntax mein lapeto."',
      },
    },
  ],

  'What is blocking I/O?': [
    {
      heading: { en: 'The thread stops until the work is done', hi: 'Kaam khatam hone tak thread ruk jaata hai' },
      body: {
        en: 'A blocking call does not return until it has the result. The thread cannot do anything else in the meantime — it sits in the kernel waiting for the disk or the network.',
        hi: 'Blocking call tab tak nahi lautti jab tak nateeja na mil jaaye. Us dauraan thread kuch aur nahi kar sakta — wo kernel mein disk ya network ka intezaar karta baitha rehta hai.',
      },
      code: `const data = fs.readFileSync('a.txt');   // nothing else runs
console.log('after');`,
    },
    {
      heading: { en: 'In Node it blocks everyone, not just you', hi: 'Node mein ye sabko rokta hai, sirf tumhe nahi' },
      body: {
        en: 'This is the whole reason the question exists. One thread serves every request, so a 50ms blocking read in one handler adds 50ms of latency to every other request queued behind it.',
        hi: 'Sawaal ke hone ki poori wajah yahi hai. Ek thread har request sambhaalta hai, toh ek handler mein 50ms ka blocking read peeche line mein lagi har doosri request mein 50ms latency jodta hai.',
      },
      diagram: `100 req/s, each doing a 50ms sync read
  the thread is busy 5 seconds per second
  → the queue grows without limit`,
    },
    {
      heading: { en: 'The things that block, beyond Sync calls', hi: 'Sync calls ke alawa aur kya rokta hai' },
      body: {
        en: 'People look for readFileSync and miss the rest. A large JSON.parse or stringify, a regex with catastrophic backtracking, sorting a huge array, synchronous crypto, and a long loop all block just as hard.',
        hi: 'Log readFileSync dhoondhte hain aur baaki chhod dete hain. Bada JSON.parse ya stringify, khatarnak backtracking wala regex, bade array ka sort, synchronous crypto, aur lamba loop — sab utna hi rokte hain.',
      },
      code: `JSON.parse(hugeString);            // ✗ blocks, no Sync in the name
bcrypt.hashSync(pw, 12);            // ✗
/^(a+)+$/.test(userInput);           // ✗ catastrophic backtracking`,
    },
    {
      heading: { en: 'How to detect it', hi: 'Isse kaise pakdein' },
      body: {
        en: 'Measure event loop lag: schedule a timer for a known delay and see how late it actually fires. Sustained lag above a few milliseconds means something is blocking. Most APM tools expose this as a metric.',
        hi: 'Event loop lag naapo: ek tay delay ka timer lagao aur dekho wo kitna late chala. Kuch milliseconds se upar lagataar lag matlab kuch rok raha hai. Zyadatar APM tools ise metric ki tarah dikhate hain.',
      },
      code: `let last = Date.now();
setInterval(() => {
  const lag = Date.now() - last - 100;
  if (lag > 50) logger.warn({ lag }, 'event loop blocked');
  last = Date.now();
}, 100);`,
    },
    {
      heading: { en: 'When blocking is acceptable', hi: 'Blocking kab theek hai' },
      body: {
        en: 'At startup before the server listens — loading config, reading a certificate. In a CLI script or build tool, where there is no event loop to protect. And inside a worker thread, where blocking that thread is the entire point.',
        hi: 'Shuruaat mein server ke sunne se pehle — config load karna, certificate padhna. CLI script ya build tool mein, jahan bachane ko koi event loop hai hi nahi. Aur worker thread ke andar, jahan us thread ko rokna hi asli maqsad hai.',
      },
    },
    {
      heading: { en: 'And the fixes', hi: 'Aur ilaaj' },
      body: {
        en: 'Use the async variant where one exists. Move genuine computation to a worker thread or a job queue. Stream instead of buffering a large file. And chunk a long loop with setImmediate so the loop gets a turn between batches.',
        hi: 'Jahan async roop ho wahan wo lo. Sach ki computation worker thread ya job queue pe bhejo. Badi file buffer karne ki jagah stream karo. Aur lambe loop ko setImmediate se tukdon mein baanto taaki batches ke beech loop ko mauka mile.',
      },
    },
  ],

  'What is callback hell?': [
    {
      heading: { en: 'Nesting that grows sideways', hi: 'Nesting jo bagal mein badhti hai' },
      body: {
        en: 'When each asynchronous step depends on the previous one, callbacks nest inside each other and the code drifts right instead of down. The shape is why it is also called the pyramid of doom.',
        hi: 'Jab har async step pichhle pe depend karta hai, callbacks ek doosre ke andar nest ho jaate hain aur code neeche ki jagah daayein khisakta hai. Isi shakl ki wajah se isse pyramid of doom bhi kehte hain.',
      },
      code: `getUser(id, (e, user) => {
  if (e) return done(e);
  getOrders(user, (e, orders) => {
    if (e) return done(e);
    getItems(orders[0], (e, items) => {
      if (e) return done(e);
      done(null, items);
    });
  });
});`,
    },
    {
      heading: { en: 'The indentation is the least of it', hi: 'Indentation sabse chhoti problem hai' },
      body: {
        en: 'Say this — it separates a real answer from a superficial one. The actual problems are error handling repeated at every level, no way to run steps in parallel, and no way to use try/catch or return meaningfully.',
        hi: 'Ye kaho — isse asli jawab oopri jawab se alag hota hai. Asli problems hain har level pe dohraaya gaya error handling, steps ko parallel chalane ka koi tareeka na hona, aur try/catch ya return ka koi matlab na hona.',
      },
    },
    {
      heading: { en: 'Error handling is the real cost', hi: 'Asli keemat error handling hai' },
      body: {
        en: 'try/catch cannot cross an asynchronous boundary, so every callback must check its own error argument and forward it. Miss one and the failure disappears silently — no throw, no log, just a request that never responds.',
        hi: 'try/catch async boundary paar nahi kar sakta, toh har callback ko apna error argument jaanchna aur aage bhejna padta hai. Ek bhi chhoot jaaye toh failure chup-chaap gaayab ho jaati hai — na throw, na log, bas ek request jo kabhi jawab nahi deti.',
      },
      code: `try {
  fs.readFile(p, (e, d) => { throw e; });    // ✗ never caught
} catch (e) {}`,
    },
    {
      heading: { en: 'And you cannot easily parallelise', hi: 'Aur parallel karna aasaan nahi' },
      body: {
        en: 'Three independent calls should run at once. With callbacks you have to hand-roll a counter and a results array and remember to guard against calling done twice. With promises it is one line.',
        hi: 'Teen alag calls ek saath chalni chahiye. Callbacks ke saath tumhe khud counter aur results array banana padta hai aur done do baar na bulane ka dhyaan rakhna padta hai. Promises ke saath ye ek line hai.',
      },
    },
    {
      heading: { en: 'Why it happened at all', hi: 'Ye hua hi kyun' },
      body: {
        en: 'Promises were not standardised until ES6 and async/await arrived in ES2017. Node predates both, so the entire standard library was built error-first callback style — which is why you still meet the pattern in older code.',
        hi: 'Promises ES6 tak standard nahi the aur async/await ES2017 mein aaya. Node dono se pehle ka hai, toh poori standard library error-first callback style mein bani — isiliye purane code mein ye pattern aaj bhi milta hai.',
      },
    },
    {
      heading: { en: 'It is largely a solved problem now', hi: 'Ab ye lagbhag suljh chuki problem hai' },
      body: {
        en: 'The core library ships promise variants, util.promisify converts an old-style function, and async/await flattens the whole thing. Callback hell is a question about history and about recognising the pattern when you inherit it.',
        hi: 'Core library promise wale roop deti hai, util.promisify purane function ko badal deta hai, aur async/await poori cheez chapti kar deta hai. Callback hell ab itihaas ka sawaal hai aur ye pehchanne ka ki purana code mile toh wo pattern kya hai.',
      },
    },
  ],

  'How do you avoid callback hell?': [
    {
      heading: { en: 'Promises flatten the nesting', hi: 'Promises nesting chapti kar dete hain' },
      body: {
        en: 'Because then returns a new promise and waits for any promise you return from it, dependent steps become a flat chain instead of a pyramid. One catch at the end handles a failure at any step.',
        hi: 'then naya promise deta hai aur tumhare return kiye promise ka intezaar karta hai, isliye ek doosre pe nirbhar steps pyramid ki jagah seedhi chain ban jaate hain. Aakhir ka ek catch kisi bhi step ki failure sambhaal leta hai.',
      },
      code: `getUser(id)
  .then(getOrders)
  .then((orders) => getItems(orders[0]))
  .catch(handleError);`,
    },
    {
      heading: { en: 'async/await flattens it further', hi: 'async/await isse aur chapta kar deta hai' },
      body: {
        en: 'The answer to lead with. The logic reads top to bottom, intermediate values stay in scope, ordinary try/catch works, and conditionals and loops behave normally.',
        hi: 'Jawab isi se shuru karo. Logic upar se neeche padha jaata hai, beech ki values scope mein rehti hain, aam try/catch chalta hai, aur conditionals aur loops normal chalte hain.',
      },
      code: `try {
  const user = await getUser(id);
  const orders = await getOrders(user);
  return await getItems(orders[0]);
} catch (e) {
  handleError(e);
}`,
    },
    {
      heading: { en: 'Promisify what is still callback-based', hi: 'Jo abhi callback wala hai usse promisify karo' },
      body: {
        en: 'Most of the core library has a promise variant already. For an old third-party function, util.promisify converts an error-first callback into a promise in one line.',
        hi: 'Core library ka zyadatar hissa pehle se promise wala roop deta hai. Kisi purane third-party function ke liye util.promisify error-first callback ko ek line mein promise bana deta hai.',
      },
      code: `const fs = require('node:fs/promises');       // ✓ already promise-based

const { promisify } = require('node:util');
const doThing = promisify(oldCallbackFn);`,
    },
    {
      heading: { en: 'Run independent work in parallel', hi: 'Alag-alag kaam parallel chalao' },
      body: {
        en: 'Flattening the nesting is only half the win. If steps do not depend on each other, awaiting them one after another is just callback hell laid out vertically — start them all and await once.',
        hi: 'Nesting chapti karna aadhi jeet hai. Agar steps ek doosre pe depend nahi karte, toh unhe ek ke baad ek await karna callback hell hi hai, bas seedha likha hua — sab shuru karo aur ek baar await karo.',
      },
      code: `const [user, settings] = await Promise.all([getUser(id), getSettings(id)]);`,
    },
    {
      heading: { en: 'Name your functions and keep them small', hi: 'Functions ko naam do aur chhota rakho' },
      body: {
        en: 'The structural fix that applies whichever syntax you use. Extracting each step into a named function removes the nesting, makes each piece testable on its own, and turns the top-level flow into something readable.',
        hi: 'Dhaanchagat ilaaj jo har syntax pe lagta hai. Har step ko naam wale function mein nikaalna nesting hata deta hai, har tukda alag se test hone laayak banata hai, aur upar ka flow padhne laayak kar deta hai.',
      },
    },
    {
      heading: { en: 'And the error-handling point', hi: 'Aur error handling wali baat' },
      body: {
        en: 'The real gain is not the shape — it is that one try/catch covers every step, and an unhandled rejection is reported rather than silently lost. That is what you should say the fix actually buys.',
        hi: 'Asli fayda shakl nahi hai — ye hai ki ek try/catch har step cover karta hai, aur bina sambhali rejection chup-chaap khone ki jagah report hoti hai. Ilaaj asal mein yahi deta hai, aur yahi kehna chahiye.',
      },
    },
  ],

  'What is setImmediate()?': [
    {
      heading: { en: 'Run a callback in the check phase', hi: 'Check phase mein callback chalao' },
      body: {
        en: 'setImmediate schedules a callback for the check phase of the event loop, which comes right after poll. It runs once per loop iteration, at a predictable point.',
        hi: 'setImmediate callback ko event loop ke check phase ke liye schedule karta hai, jo poll ke turant baad aata hai. Wo har loop iteration mein ek baar, ek andaaze laayak jagah pe chalta hai.',
      },
      code: `setImmediate(() => console.log('runs in the check phase'));`,
    },
    {
      heading: { en: 'The name is misleading', hi: 'Naam gumraah karta hai' },
      body: {
        en: 'It is not immediate. It always runs after the current operation completes, after nextTick, after microtasks, and after any I/O callback already queued in this iteration. Saying so shows you know the phases.',
        hi: 'Ye immediate nahi hai. Ye hamesha maujooda operation ke baad chalta hai, nextTick ke baad, microtasks ke baad, aur is iteration mein pehle se queue hue kisi bhi I/O callback ke baad. Ye kehna dikhata hai ki tumhe phases pata hain.',
      },
    },
    {
      heading: { en: 'Its real use: yielding to the loop', hi: 'Asli upyog: loop ko mauka dena' },
      body: {
        en: 'This is what it is for. Break a long computation into chunks and schedule the next chunk with setImmediate, so the loop can serve I/O between batches. The total work takes slightly longer and the server stays responsive throughout.',
        hi: 'Ye isi ke liye hai. Lambe computation ko tukdon mein baanto aur agla tukda setImmediate se schedule karo, taaki loop batches ke beech I/O sambhaal sake. Kul kaam thoda lamba hota hai aur server poore samay jawab deta rehta hai.',
      },
      code: `function process(items, i = 0) {
  const end = Math.min(i + 1000, items.length);
  for (; i < end; i++) doWork(items[i]);
  if (i < items.length) setImmediate(() => process(items, i));
}`,
    },
    {
      heading: { en: 'Versus setTimeout with zero', hi: 'Zero wale setTimeout se tulna' },
      body: {
        en: 'At the top level the order between them is non-deterministic, because it depends on how long startup took. Inside an I/O callback setImmediate always wins, because you are already in poll and check comes next.',
        hi: 'Top level pe dono ka order tay nahi hai, kyunki wo is baat pe depend karta hai ki shuruaat mein kitna samay laga. I/O callback ke andar setImmediate hamesha jeetta hai, kyunki tum pehle se poll mein ho aur check agla hai.',
      },
      code: `fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
// immediate, then timeout — always`,
    },
    {
      heading: { en: 'Versus process.nextTick', hi: 'process.nextTick se tulna' },
      body: {
        en: 'nextTick jumps ahead of everything, including promises, and its queue is drained completely — so a recursive nextTick starves the loop. setImmediate yields between iterations, so a recursive setImmediate is safe. Prefer it as the default.',
        hi: 'nextTick sabse aage nikal jaata hai, promises se bhi, aur uski queue poori khaali hoti hai — toh recursive nextTick loop ko bhookha maar deta hai. setImmediate iterations ke beech mauka deta hai, toh recursive setImmediate safe hai. Default yahi rakho.',
      },
    },
    {
      heading: { en: 'It is Node-only', hi: 'Ye sirf Node mein hai' },
      body: {
        en: 'Browsers never adopted it — only Internet Explorer ever shipped it. In browser code the equivalent is a zero timeout, queueMicrotask, or a MessageChannel trick.',
        hi: 'Browsers ne isse kabhi nahi apnaya — sirf Internet Explorer ne ship kiya tha. Browser code mein iska joda zero timeout, queueMicrotask, ya MessageChannel wala jugaad hai.',
      },
    },
  ],

  'What is the difference between setImmediate(), setTimeout(), and process.nextTick()?': [
    {
      heading: { en: 'Three different priorities', hi: 'Teen alag priorities' },
      body: {
        en: 'nextTick runs between phases, before everything including promises. setTimeout runs in the timers phase. setImmediate runs in the check phase. Order them and the whole answer falls out.',
        hi: 'nextTick phases ke beech chalta hai, sab se pehle, promises se bhi pehle. setTimeout timers phase mein chalta hai. setImmediate check phase mein. Inhe kram mein rakho aur poora jawab nikal aata hai.',
      },
      diagram: `after the current operation:
  1  process.nextTick   drained completely
  2  microtasks         promises, drained completely
  then the loop:
  3  timers             setTimeout, setInterval
  4  poll               I/O callbacks
  5  check              setImmediate`,
    },
    {
      heading: { en: 'nextTick is not part of the loop', hi: 'nextTick loop ka hissa hai hi nahi' },
      body: {
        en: 'It has its own queue, drained after the current operation and between every phase. That is why it outranks promises and why a recursive nextTick prevents the loop from ever advancing.',
        hi: 'Uski apni queue hai, jo maujooda operation ke baad aur har phase ke beech khaali hoti hai. Isiliye wo promises se upar hai aur isiliye recursive nextTick loop ko kabhi aage nahi badhne deta.',
      },
      code: `function loop() { process.nextTick(loop); }
loop();      // ✗ the process stops responding entirely`,
    },
    {
      heading: { en: 'The top-level race', hi: 'Top level ki race' },
      body: {
        en: 'setTimeout(0) versus setImmediate in the main module is non-deterministic. If startup took longer than the 1ms timer threshold the timer is already due when the loop reaches timers; otherwise check runs first. Run it twice and you may see both.',
        hi: 'Main module mein setTimeout(0) vs setImmediate tay nahi hai. Agar shuruaat mein 1ms ki timer seema se zyada samay laga toh loop ke timers tak pahunchne pe timer pehle se due hai; warna check pehle chalta hai. Do baar chalao toh dono dikh sakte hain.',
      },
      code: `setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
// order varies at the top level`,
    },
    {
      heading: { en: 'Inside I/O the order is fixed', hi: 'I/O ke andar order pakka hai' },
      body: {
        en: 'This is the reliable half and the part interviewers want. Inside an I/O callback you are in the poll phase, so check is next and setImmediate always fires before the timer.',
        hi: 'Ye bharosemand hissa hai aur interviewers yahi chahte hain. I/O callback ke andar tum poll phase mein ho, toh check agla hai aur setImmediate hamesha timer se pehle chalta hai.',
      },
      code: `fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
// immediate, timeout — every time`,
    },
    {
      heading: { en: 'A worked example to trace', hi: 'Trace karne laayak ek example' },
      body: {
        en: 'Walk this once and the priorities stick. Synchronous first, then nextTick, then promises, then the loop phases in order.',
        hi: 'Isse ek baar chal kar dekho aur priorities baith jaayengi. Pehle synchronous, phir nextTick, phir promises, phir loop ke phases kram mein.',
      },
      code: `console.log('sync');
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));

// sync, nextTick, promise, then timeout/immediate`,
    },
    {
      heading: { en: 'Which to reach for', hi: 'Kaunsa uthana chahiye' },
      body: {
        en: 'setImmediate to yield to the loop — it is the safe default. setTimeout when you genuinely want a delay. nextTick only to let a caller attach listeners before you emit, or to surface an error asynchronously but before any I/O.',
        hi: 'Loop ko mauka dene ke liye setImmediate — yahi safe default hai. Sach mein deri chahiye toh setTimeout. nextTick sirf tab, jab caller ko emit karne se pehle listeners lagane dena ho, ya error ko asynchronously par kisi bhi I/O se pehle upar laana ho.',
      },
    },
  ],

  'What is process.nextTick()?': [
    {
      heading: { en: 'The highest-priority queue in Node', hi: 'Node ki sabse upar wali queue' },
      body: {
        en: 'nextTick schedules a callback to run after the current operation completes and before the event loop continues — ahead of promises and ahead of every phase. Nothing else in Node runs sooner.',
        hi: 'nextTick callback ko maujooda operation khatam hone ke baad aur event loop ke aage badhne se pehle chalata hai — promises se pehle aur har phase se pehle. Node mein aur kuch isse jaldi nahi chalta.',
      },
      code: `console.log('1');
process.nextTick(() => console.log('3'));
Promise.resolve().then(() => console.log('4'));
console.log('2');
// 1, 2, 3, 4`,
    },
    {
      heading: { en: 'The name describes the old behaviour', hi: 'Naam purana behaviour bataata hai' },
      body: {
        en: 'It runs BEFORE the next tick of the loop, not on it. The Node docs acknowledge that nextTick and setImmediate have names that should be swapped, and saying so is a quick way to show you know the detail.',
        hi: 'Ye loop ke agle tick se PEHLE chalta hai, us pe nahi. Node ke docs maante hain ki nextTick aur setImmediate ke naam aapas mein badle jaane chahiye the, aur ye keh dena turant dikha deta hai ki tumhe detail pata hai.',
      },
    },
    {
      heading: { en: 'Its queue is drained completely', hi: 'Iski queue poori khaali hoti hai' },
      body: {
        en: 'Not one callback per turn — all of them, including any queued while draining. This is what makes it dangerous: a nextTick that schedules another loops forever and the event loop never advances.',
        hi: 'Har chakkar mein ek callback nahi — sab, un samet jo khaali karte waqt aayein. Isi se ye khatarnak hai: jo nextTick doosra schedule kare wo hamesha ghoomta rehta hai aur event loop kabhi aage nahi badhta.',
      },
      code: `function loop() { process.nextTick(loop); }
loop();
// no I/O, no timers, no requests — and the CPU looks busy
// with an empty call stack, which is confusing to diagnose`,
    },
    {
      heading: { en: 'Use one: let the caller attach listeners', hi: 'Ek upyog: caller ko listeners lagane do' },
      body: {
        en: 'If a constructor emits an event synchronously, no listener can exist yet — the caller has not returned from new. Deferring the emit with nextTick gives them that chance, and this is the case nextTick was designed for.',
        hi: 'Agar koi constructor synchronously event emit kare toh abhi koi listener ho hi nahi sakta — caller new se laut a hi nahi hai. nextTick se emit ko taal do aur unhe mauka mil jaata hai, aur nextTick isi case ke liye bana tha.',
      },
      code: `class Thing extends EventEmitter {
  constructor() {
    super();
    this.emit('ready');                         // ✗ nobody is listening
    process.nextTick(() => this.emit('ready'));  // ✓ they can now
  }
}`,
    },
    {
      heading: { en: 'Use two: an async error, before any I/O', hi: 'Doosra upyog: async error, kisi I/O se pehle' },
      body: {
        en: 'A function should be consistently async — either always sync or always async, never both depending on input. nextTick lets you report a validation error asynchronously without letting any I/O happen first.',
        hi: 'Function ka behaviour ek jaisa hona chahiye — ya hamesha sync ya hamesha async, input ke hisaab se dono nahi. nextTick se tum validation error asynchronously bata sakte ho bina kisi I/O ko pehle hone diye.',
      },
      code: `function read(path, cb) {
  if (!path) return process.nextTick(() => cb(new Error('no path')));
  fs.readFile(path, cb);      // ✓ always async, either way
}`,
    },
    {
      heading: { en: 'And the recommendation', hi: 'Aur salaah' },
      body: {
        en: 'Prefer setImmediate in almost every other case. It yields between loop iterations, so it cannot starve I/O, and the Node documentation itself recommends it as the default of the two.',
        hi: 'Lagbhag har doosre case mein setImmediate behtar hai. Wo loop ke iterations ke beech mauka deta hai, toh I/O ko bhookha nahi maar sakta, aur Node ke docs khud dono mein se isse default kehte hain.',
      },
    },
  ],

  'Explain the execution order of asynchronous tasks in Node.js.': [
    {
      heading: { en: 'The rule, then the trace', hi: 'Pehle rule, phir trace' },
      body: {
        en: 'Synchronous code first, in source order. Then the nextTick queue, drained completely. Then the microtask queue, drained completely. Then the event loop phases in order, draining both queues again between every phase.',
        hi: 'Pehle synchronous code, source ke kram mein. Phir nextTick queue, poori khaali. Phir microtask queue, poori khaali. Phir event loop ke phases kram mein, har phase ke beech dono queues phir se khaali karte hue.',
      },
      diagram: `1  all synchronous code
2  process.nextTick queue        — completely
3  promise microtasks            — completely
4  timers        setTimeout, setInterval
5  poll          I/O callbacks
6  check         setImmediate
7  close         'close' handlers
   → repeat from 2 between every phase`,
    },
    {
      heading: { en: 'The canonical example', hi: 'Classic example' },
      body: {
        en: 'Trace this once and most variants become obvious. Note that the last two are the only pair whose relative order is not fixed at the top level.',
        hi: 'Isse ek baar trace kar lo aur zyadatar roop saaf ho jaate hain. Dhyaan do aakhri do hi wo jodi hai jinka aapsi kram top level pe tay nahi hai.',
      },
      code: `console.log('1 sync');
process.nextTick(() => console.log('2 nextTick'));
Promise.resolve().then(() => console.log('3 promise'));
setTimeout(() => console.log('4 timeout'), 0);
setImmediate(() => console.log('5 immediate'));
console.log('6 sync');

// 1 sync, 6 sync, 2 nextTick, 3 promise, then 4 and 5 in either order`,
    },
    {
      heading: { en: 'Why nextTick beats a promise', hi: 'nextTick promise se kyun jeetta hai' },
      body: {
        en: 'They are two separate queues, and Node drains nextTick first. This is Node-specific — in a browser there is no nextTick and promises are the highest priority. Mentioning that difference is worth a lot.',
        hi: 'Ye do alag queues hain, aur Node pehle nextTick khaali karta hai. Ye sirf Node mein hai — browser mein nextTick hota hi nahi aur promises sabse upar hain. Ye farq batana kaafi keemti hai.',
      },
    },
    {
      heading: { en: 'Inside an I/O callback the order tightens', hi: 'I/O callback ke andar order pakka ho jaata hai' },
      body: {
        en: 'You are already in the poll phase, so check comes next and setImmediate always beats a zero timer. This is the deterministic version of the ambiguous top-level case.',
        hi: 'Tum pehle se poll phase mein ho, toh check agla hai aur setImmediate hamesha zero timer se jeetta hai. Ye upar wale dhundhle case ka pakka roop hai.',
      },
      code: `fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
// immediate, timeout — deterministic`,
    },
    {
      heading: { en: 'await splits a function in two', hi: 'await function ko do mein baant deta hai' },
      body: {
        en: 'Everything up to the first await runs synchronously; everything after it becomes a microtask. That is why calling an async function logs its first line immediately and the rest later.',
        hi: 'Pehle await tak ka sab kuch synchronously chalta hai; uske baad ka sab microtask ban jaata hai. Isiliye async function bulane pe uski pehli line turant chhapti hai aur baaki baad mein.',
      },
      code: `async function f() {
  console.log('a');       // synchronous
  await null;
  console.log('b');       // a microtask
}
f(); console.log('c');
// a, c, b`,
    },
    {
      heading: { en: 'Nested scheduling, the hard variant', hi: 'Nested scheduling, mushkil roop' },
      body: {
        en: 'A microtask queued from inside another microtask still runs in the same drain, before any phase. A microtask queued inside a timer callback runs immediately after that timer, before the next one.',
        hi: 'Kisi microtask ke andar se queue hua microtask usi drain mein chalta hai, kisi bhi phase se pehle. Kisi timer callback ke andar queue hua microtask us timer ke turant baad chalta hai, agle se pehle.',
      },
      code: `setTimeout(() => { console.log('t1');
  Promise.resolve().then(() => console.log('p-in-t1')); });
setTimeout(() => console.log('t2'));
// t1, p-in-t1, t2`,
    },
    {
      heading: { en: 'How to say it', hi: 'Kaise kehna hai' },
      body: {
        en: '"All synchronous code runs first. Then Node drains the nextTick queue completely, then the promise microtask queue completely. Only then does the event loop move through its phases — timers, poll, check — draining both queues again between each one. nextTick outranking promises is Node-specific; a browser has no equivalent."',
        hi: '"Pehle saara synchronous code chalta hai. Phir Node nextTick queue poori khaali karta hai, phir promise wali microtask queue poori. Uske baad hi event loop apne phases mein badhta hai — timers, poll, check — har ek ke beech dono queues phir khaali karte hue. nextTick ka promises se upar hona sirf Node mein hai; browser mein iska joda nahi."',
      },
    },
  ],

  'What is libuv?': [
    {
      heading: { en: 'The C library that provides the event loop', hi: 'Wo C library jo event loop deti hai' },
      body: {
        en: 'libuv is a cross-platform C library that gives Node its event loop, its thread pool and all of its asynchronous I/O. V8 runs the JavaScript; libuv is everything V8 does not do.',
        hi: 'libuv ek cross-platform C library hai jo Node ko uska event loop, thread pool aur saara asynchronous I/O deti hai. V8 JavaScript chalata hai; libuv wo sab hai jo V8 nahi karta.',
      },
      diagram: `Node = V8 + libuv + the standard library

V8      parse, compile, execute, garbage collect
libuv   event loop, thread pool, files, sockets, timers, DNS`,
    },
    {
      heading: { en: 'It exists to hide the operating system', hi: 'Ye operating system chhupane ke liye hai' },
      body: {
        en: 'Each platform has its own event notification API — epoll on Linux, kqueue on macOS and BSD, IOCP on Windows. libuv wraps all three behind one interface, which is why the same Node code runs unchanged everywhere.',
        hi: 'Har platform ka apna event notification API hai — Linux pe epoll, macOS aur BSD pe kqueue, Windows pe IOCP. libuv teeno ko ek interface ke peeche lapet deti hai, isiliye wahi Node code har jagah bina badle chalta hai.',
      },
    },
    {
      heading: { en: 'Two different mechanisms, not one', hi: 'Do alag machineries, ek nahi' },
      body: {
        en: 'The detail worth knowing. Network sockets use the OS notification system with no thread involved. File, DNS, crypto and zlib work goes to a thread pool, because those operations are not genuinely async at the OS level on most platforms.',
        hi: 'Jaanne laayak detail. Network sockets OS ke notification system pe chalte hain, koi thread nahi. File, DNS, crypto aur zlib ka kaam thread pool pe jaata hai, kyunki zyadatar platforms pe OS star pe ye operations sach mein async nahi hain.',
      },
      diagram: `sockets    → epoll / kqueue / IOCP   no thread
files      → thread pool              4 threads by default
dns.lookup → thread pool
crypto     → thread pool (async forms)`,
    },
    {
      heading: { en: 'Which explains the four-thread limit', hi: 'Isse chaar-thread wali seema samajh aati hai' },
      body: {
        en: 'A practical consequence you can act on. The pool defaults to four threads, so a fifth concurrent large file read or pbkdf2 call queues. Raising UV_THREADPOOL_SIZE is sometimes the real fix for a file-heavy service.',
        hi: 'Ek vyavharik nateeja jispe kuch kiya ja sakta hai. Pool default se chaar threads ka hai, toh paanchwa bada file read ya pbkdf2 call line mein lagta hai. File wale service ke liye kabhi-kabhi asli ilaaj UV_THREADPOOL_SIZE badhana hi hota hai.',
      },
      code: `process.env.UV_THREADPOOL_SIZE = 8;   // before any I/O happens`,
    },
    {
      heading: { en: 'It owns the phases you already know', hi: 'Jo phases tum jaante ho wo iske hain' },
      body: {
        en: 'Timers, pending, idle, prepare, poll, check and close are libuv concepts, not JavaScript ones. When you reason about setImmediate running in the check phase, you are reasoning about libuv.',
        hi: 'Timers, pending, idle, prepare, poll, check aur close libuv ke concepts hain, JavaScript ke nahi. Jab tum sochte ho ki setImmediate check phase mein chalta hai, tab tum libuv ke baare mein hi soch rahe ho.',
      },
    },
    {
      heading: { en: 'And it is not Node-only', hi: 'Aur ye sirf Node ka nahi hai' },
      body: {
        en: 'libuv was written for Node but is a standalone library used by other projects — Julia and Luvit among them. Knowing that reinforces that it is a general async I/O layer rather than a Node internal.',
        hi: 'libuv Node ke liye likhi gayi thi par ek alag library hai jise doosre projects bhi use karte hain — Julia aur Luvit unme hain. Ye jaanna pakka karta hai ki ye Node ka andar ka hissa nahi, ek aam async I/O layer hai.',
      },
    },
  ],

  /* ─── Configuration, scaling and performance ──────────────── */

  'What are environment variables?': [
    {
      heading: { en: 'Configuration that comes from outside the code', hi: 'Configuration jo code ke bahar se aati hai' },
      body: {
        en: 'An environment variable is a key-value pair the operating system passes to a process. Node exposes them on process.env. They exist so the same build runs in development, staging and production with different values.',
        hi: 'Environment variable ek key-value jodi hai jo operating system process ko deta hai. Node unhe process.env pe dikhata hai. Ye isliye hain ki wahi build dev, staging aur production mein alag values ke saath chale.',
      },
      code: `PORT=3000 NODE_ENV=production node server.js

process.env.PORT;        // '3000'
process.env.NODE_ENV;    // 'production'`,
    },
    {
      heading: { en: 'Every value is a string', hi: 'Har value string hai' },
      body: {
        en: 'The mistake people make constantly. There are no numbers and no booleans — "false" is a non-empty string and therefore truthy. Convert explicitly, and never test a flag for truthiness directly.',
        hi: 'Log ye galti baar-baar karte hain. Na numbers hain na booleans — "false" ek non-empty string hai aur isliye truthy hai. Explicitly convert karo, aur kisi flag ko seedha truthiness se kabhi mat jaancho.',
      },
      code: `if (process.env.DEBUG) {}                    // ✗ true for 'false'
const debug = process.env.DEBUG === 'true';   // ✓
const port = Number(process.env.PORT) || 3000; // ✓`,
    },
    {
      heading: { en: 'Why not just use a config file', hi: 'Sirf config file kyun nahi' },
      body: {
        en: 'Because a config file has to be built into the image or committed. Environment variables keep the artifact identical across environments, keep secrets out of the repository, and are what every platform and orchestrator injects natively.',
        hi: 'Kyunki config file ya toh image mein banani padti hai ya commit karni padti hai. Environment variables artifact ko har environment mein ek jaisa rakhte hain, secrets ko repo se bahar rakhte hain, aur har platform aur orchestrator inhi ko natively deta hai.',
      },
    },
    {
      heading: { en: 'Validate them at startup', hi: 'Shuruaat mein inhe jaancho' },
      body: {
        en: 'The single most valuable habit here. Parse the whole environment through a schema when the process boots, so a missing or malformed value crashes immediately with a clear message rather than appearing as undefined inside a database URL later.',
        hi: 'Yahan sabse keemti aadat yahi hai. Process shuru hote hi poore environment ko schema se parse karo, taaki gayab ya kharaab value turant saaf message ke saath crash kare, baad mein kisi database URL ke andar undefined ban kar na aaye.',
      },
      code: `const env = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
}).parse(process.env);      // ✓ fails fast at boot`,
    },
    {
      heading: { en: 'NODE_ENV is special by convention', hi: 'Riwaaj se NODE_ENV khaas hai' },
      body: {
        en: 'Many libraries change behaviour based on it — Express disables view caching, React ships development warnings. Setting it to production is one of the cheapest performance wins there is, and forgetting it is a common deployment bug.',
        hi: 'Kai libraries iske hisaab se behaviour badalti hain — Express view caching band kar deta hai, React development warnings bhejta hai. Isse production karna sabse saste performance faaydon mein se ek hai, aur isse bhoolna aam deployment bug hai.',
      },
    },
    {
      heading: { en: 'They are visible, so they are not a vault', hi: 'Ye dikhte hain, toh ye tijori nahi hain' },
      body: {
        en: 'A process listing, a crash dump or a careless log can expose them, and any dependency can read process.env. For real secrets use a secret manager, and redact known keys in your logger.',
        hi: 'Process listing, crash dump ya laparwah log inhe dikha sakta hai, aur koi bhi dependency process.env padh sakti hai. Asli secrets ke liye secret manager lo, aur logger mein maloom keys redact karo.',
      },
    },
  ],

  'Why use dotenv?': [
    {
      heading: { en: 'It loads a .env file into process.env', hi: 'Ye .env file ko process.env mein load karta hai' },
      body: {
        en: 'In development you do not want to type ten variables before every command. dotenv reads a .env file and populates process.env, so the code reads configuration the same way it will in production.',
        hi: 'Development mein har command se pehle das variables likhna nahi chahte. dotenv ek .env file padhta hai aur process.env bhar deta hai, toh code configuration waise hi padhta hai jaise production mein padhega.',
      },
      code: `# .env
DATABASE_URL=postgres://localhost/dev
JWT_SECRET=dev-only-secret

require('dotenv').config();
process.env.DATABASE_URL;`,
    },
    {
      heading: { en: 'Node has this built in now', hi: 'Node mein ab ye built-in hai' },
      body: {
        en: 'The most current answer. Since Node 20 you can pass --env-file, which removes the dependency entirely. Saying this shows you follow the runtime rather than copying an old tutorial.',
        hi: 'Sabse aaj ka jawab. Node 20 se tum --env-file de sakte ho, jisse dependency poori tarah hat jaati hai. Ye kehna dikhata hai ki tum runtime follow karte ho, purana tutorial nahi copy karte.',
      },
      code: `node --env-file=.env server.js       // ✓ no dotenv needed
node --env-file=.env --env-file=.env.local server.js`,
    },
    {
      heading: { en: 'Development only, never production', hi: 'Sirf development, production kabhi nahi' },
      body: {
        en: 'In production the platform injects real values — the orchestrator, the secret manager, the CI system. Shipping a .env file to production means the secrets are in the image, which defeats the point.',
        hi: 'Production mein platform asli values deta hai — orchestrator, secret manager, CI system. Production mein .env file bhejna matlab secrets image mein hain, aur poora maqsad hi khatam.',
      },
      code: `if (process.env.NODE_ENV !== 'production') require('dotenv').config();`,
    },
    {
      heading: { en: 'Load it before anything reads config', hi: 'Config padhne wale se pehle load karo' },
      body: {
        en: 'The bug everyone hits once. Imports are hoisted, so a module that reads process.env at the top level runs before your dotenv call and sees undefined. Load it first, or use the runtime flag which happens before any code runs.',
        hi: 'Ye bug sabko ek baar milta hai. Imports hoist hote hain, toh jo module top level pe process.env padhta hai wo tumhare dotenv call se pehle chal jaata hai aur undefined dekhta hai. Pehle load karo, ya runtime flag lo jo kisi bhi code se pehle chalta hai.',
      },
      code: `import './load-env.js';       // ✓ must be the first import
import { db } from './db.js';  // this reads process.env at module scope`,
    },
    {
      heading: { en: 'Commit an example, never the real file', hi: 'Example commit karo, asli file kabhi nahi' },
      body: {
        en: 'Put .env in .gitignore from the first commit, and check in a .env.example listing the variable NAMES with no values. A new developer then knows exactly what to set, and no secret ever reaches the history.',
        hi: 'Pehle commit se hi .env ko .gitignore mein daalo, aur ek .env.example commit karo jisme sirf variable ke NAAM hon, values nahi. Phir naye developer ko theek pata hota hai kya set karna hai, aur koi secret history mein nahi jaata.',
      },
      code: `# .env.example
DATABASE_URL=
JWT_SECRET=`,
    },
    {
      heading: { en: 'And validate whatever it loaded', hi: 'Aur jo bhi load hua usse jaancho' },
      body: {
        en: 'dotenv only copies strings into process.env — it does not check anything. Parse the result through a schema so a typo in a variable name fails at boot rather than surfacing as undefined much later.',
        hi: 'dotenv sirf strings process.env mein copy karta hai — jaanchta kuch nahi. Nateeje ko schema se parse karo taaki variable ke naam ka typo boot pe fail kare, bahut baad mein undefined ban kar na aaye.',
      },
    },
  ],

  'What are Streams in Node.js, and why use them?': [
    {
      heading: { en: 'Handle data as it arrives, not all at once', hi: 'Data aate hi chalao, sab ek saath nahi' },
      body: {
        en: 'A stream processes data in chunks. Memory stays roughly constant regardless of total size, and you can start working on the first chunk before the last one exists.',
        hi: 'Stream data ko tukdon mein chalata hai. Kul size chahe kuch bhi ho memory lagbhag sthir rehti hai, aur tum pehle tukde pe kaam shuru kar sakte ho jab aakhri abhi bana bhi nahi.',
      },
      diagram: `buffered   [████████████████]        all in memory, then act
streamed   [██]→[██]→[██]→[██]→       act on each chunk`,
    },
    {
      heading: { en: 'Reason one: memory', hi: 'Wajah ek: memory' },
      body: {
        en: 'readFile on a 5GB file needs 5GB of heap and will crash the process. A stream handles the same file in a few megabytes. On a server, a single large upload or download is enough to take the whole process down.',
        hi: '5GB ki file pe readFile ko 5GB heap chahiye aur wo process crash kar dega. Stream wahi file kuch megabytes mein sambhaal leta hai. Server pe ek bada upload ya download hi poora process gira dene ke liye kaafi hai.',
      },
      code: `const data = await fs.readFile('5gb.csv');    // 💥 out of memory
fs.createReadStream('5gb.csv').pipe(res);      // ✓ flat memory`,
    },
    {
      heading: { en: 'Reason two: time to first byte', hi: 'Wajah do: pehla byte kab pahunchta hai' },
      body: {
        en: 'Buffering means the client waits for the entire file before receiving anything. Streaming sends the first chunk immediately, so a video starts playing and a download shows progress while the rest is still being read.',
        hi: 'Buffer karo toh client ko poori file ka intezaar karna padta hai. Stream karo toh pehla tukda turant chala jaata hai, toh video chalna shuru ho jaata hai aur download progress dikhata hai jabki baaki abhi padha ja raha hai.',
      },
    },
    {
      heading: { en: 'Reason three: composition', hi: 'Wajah teen: jodna' },
      body: {
        en: 'Streams chain. Read, decompress, transform, compress and write becomes one pipeline where each stage is independent and memory never grows. Doing the same with buffers means holding several full copies at once.',
        hi: 'Streams judte hain. Padho, kholo, badlo, dabao aur likho — ek pipeline ban jaata hai jahan har stage alag hai aur memory kabhi nahi badhti. Buffers se yahi karo toh ek saath kai poori copies rakhni padti hain.',
      },
      code: `await pipeline(
  fs.createReadStream('in.csv.gz'),
  zlib.createGunzip(),
  parseCsv(),
  transformRows(),
  fs.createWriteStream('out.json')
);`,
    },
    {
      heading: { en: 'Backpressure is what makes it safe', hi: 'Ise safe backpressure banata hai' },
      body: {
        en: 'If the destination is slower than the source, the buffer between them would grow forever. write returns false to signal that, and pipeline pauses the source automatically. Without backpressure a stream is just a slower way to run out of memory.',
        hi: 'Agar manzil source se dheemi hai toh beech ka buffer hamesha badhta rehta. write false de kar ye bataata hai, aur pipeline source ko apne aap rok deta hai. Backpressure ke bina stream sirf memory khatam karne ka dheema tareeka hai.',
      },
    },
    {
      heading: { en: 'Use pipeline rather than pipe', hi: 'pipe nahi, pipeline lo' },
      body: {
        en: 'Both handle backpressure, but only pipeline propagates errors and destroys every stream on failure. With pipe, a failure halfway leaves the other streams open — a real file-descriptor leak in a long-running server.',
        hi: 'Dono backpressure sambhaalte hain, par sirf pipeline errors aage bhejta hai aur fail hone pe har stream destroy karta hai. pipe ke saath beech mein failure baaki streams khuli chhod deti hai — lambe chalne wale server mein asli file-descriptor leak.',
      },
    },
    {
      heading: { en: 'You already use them everywhere', hi: 'Tum inhe pehle se har jagah use karte ho' },
      body: {
        en: 'req and res in an HTTP server, every socket, process.stdout, and every file handle are streams. Recognising that is what lets you pipe a file to a client or a database cursor into a CSV response without buffering anything.',
        hi: 'HTTP server ke req aur res, har socket, process.stdout, aur har file handle streams hain. Ye pehchan lena hi tumhe bina kuch buffer kiye file ko client tak ya database cursor ko CSV response tak bhejne deta hai.',
      },
    },
  ],

  'What is Clustering in Node.js?': [
    {
      heading: { en: 'One process per core, sharing a port', hi: 'Har core pe ek process, ek hi port pe' },
      body: {
        en: 'A single Node process uses one core for JavaScript. cluster forks a worker process per core and lets them all accept connections on the same port, so throughput scales with the machine.',
        hi: 'Ek Node process JavaScript ke liye ek core use karta hai. cluster har core pe ek worker process fork karta hai aur sabko ek hi port pe connections lene deta hai, toh throughput machine ke saath badhta hai.',
      },
      code: `const cluster = require('node:cluster');
const os = require('node:os');

if (cluster.isPrimary) {
  for (let i = 0; i < os.availableParallelism(); i++) cluster.fork();
  cluster.on('exit', () => cluster.fork());     // replace a dead worker
} else {
  require('./server');
}`,
    },
    {
      heading: { en: 'How they share one port', hi: 'Ek port kaise share hota hai' },
      body: {
        en: 'The primary creates the listening socket and passes the descriptor to each worker over IPC. On Linux the primary distributes connections round-robin by default; on Windows the OS decides, which can be uneven.',
        hi: 'Primary listening socket banata hai aur descriptor IPC se har worker ko deta hai. Linux pe primary default se round-robin baantta hai; Windows pe OS tay karta hai, jo asamaan ho sakta hai.',
      },
      diagram: `        ┌── primary ──┐   creates the listening socket
        │  distributes │
        └──┬────┬────┬─┘
          W1   W2   W3     each a full Node process`,
    },
    {
      heading: { en: 'The consequence: nothing is shared', hi: 'Nateeja: kuch bhi share nahi hota' },
      body: {
        en: 'Each worker is a separate process with its own heap. An in-memory cache, a rate-limit counter, a session store or a WebSocket connection map exists per worker and they will disagree. This is the bug people hit the day they enable clustering.',
        hi: 'Har worker alag process hai apne heap ke saath. Memory wala cache, rate-limit counter, session store ya WebSocket connections ka map har worker ka apna hai aur wo alag-alag honge. Clustering chaalu karte hi log isi bug se takraate hain.',
      },
      code: `const seen = new Map();      // ✗ per worker — inconsistent
// use Redis, or make the state external`,
    },
    {
      heading: { en: 'Memory is the other cost', hi: 'Doosri keemat memory hai' },
      body: {
        en: 'Eight workers means eight full copies of your application in memory — often 40MB or more each before it does anything. On a small container that alone can be the limiting factor.',
        hi: 'Aath workers matlab memory mein tumhare application ki aath poori copies — aksar har ek 40MB ya zyada, kuch karne se pehle hi. Chhote container pe ye akela hi seema ban sakta hai.',
      },
    },
    {
      heading: { en: 'Restart a dead worker, but carefully', hi: 'Mare hue worker ko restart karo, par dhyaan se' },
      body: {
        en: 'Forking on exit gives you resilience. But an unconditional restart of a worker that crashes at startup becomes a fork loop that burns CPU. Add a backoff, and only restart on an unexpected exit.',
        hi: 'exit pe fork karna mazbooti deta hai. Par jo worker shuruaat mein hi crash kare usse bina shart restart karna ek fork loop ban jaata hai jo CPU jala deta hai. Backoff jodo, aur sirf anchahe exit pe restart karo.',
      },
    },
    {
      heading: { en: 'PM2 does this for you', hi: 'PM2 ye tumhare liye karta hai' },
      body: {
        en: 'It wraps cluster with restart backoff, zero-downtime reloads, log aggregation and monitoring. If you are going to cluster on a VM, PM2 is what you would actually run rather than writing the primary yourself.',
        hi: 'Wo cluster ko restart backoff, bina downtime ke reloads, logs jodne aur monitoring ke saath lapet deta hai. Agar VM pe cluster karna hai toh asal mein PM2 chalaoge, khud primary nahi likhoge.',
      },
      code: `pm2 start server.js -i max`,
    },
    {
      heading: { en: 'And in containers you usually should not', hi: 'Aur containers mein aam taur pe nahi karna chahiye' },
      body: {
        en: 'Run one Node process per container and let the orchestrator scale horizontally. Kubernetes already does what cluster does, with better health checks, rolling restarts and per-instance metrics — and one process per container keeps logs and crashes attributable.',
        hi: 'Har container mein ek Node process chalao aur orchestrator ko horizontally scale karne do. Kubernetes wahi kaam pehle se karta hai, behtar health checks, rolling restarts aur har instance ke metrics ke saath — aur har container mein ek process se logs aur crashes ka hisaab saaf rehta hai.',
      },
    },
  ],

  'What are Worker Threads in Node.js?': [
    {
      heading: { en: 'Real JavaScript threads inside one process', hi: 'Ek hi process ke andar asli JavaScript threads' },
      body: {
        en: 'worker_threads lets you run JavaScript on additional threads. Each worker gets its own V8 isolate and its own event loop, so it executes genuinely in parallel with the main thread.',
        hi: 'worker_threads tumhe extra threads pe JavaScript chalane deta hai. Har worker ko apna V8 isolate aur apna event loop milta hai, toh wo main thread ke saath sach mein parallel chalta hai.',
      },
      code: `const { Worker } = require('node:worker_threads');

const w = new Worker('./heavy.js', { workerData: { rows } });
w.on('message', (result) => res.json(result));
w.on('error', (e) => next(e));`,
    },
    {
      heading: { en: 'What they are for: CPU-bound work', hi: 'Ye kis liye hain: CPU wala kaam' },
      body: {
        en: 'A heavy synchronous computation on the main thread blocks every request. Move it to a worker and the event loop stays free to serve traffic. Image processing, large parsing, encryption, report generation.',
        hi: 'Main thread pe bhaari synchronous computation har request rok deta hai. Usse worker pe le jao aur event loop traffic sambhaalne ke liye khaali rehta hai. Image processing, bada parsing, encryption, report banana.',
      },
    },
    {
      heading: { en: 'What they are NOT for: I/O', hi: 'Ye kis liye NAHI hain: I/O' },
      body: {
        en: 'The mistake worth naming. Node already handles I/O concurrently on one thread — moving a database call to a worker adds serialisation overhead and a thread for no benefit. Workers only help when the CPU is the bottleneck.',
        hi: 'Ye galti batane laayak hai. Node pehle se I/O ek thread pe concurrently sambhaalta hai — database call ko worker pe le jaana serialisation ka bojh aur ek thread jodta hai, fayda kuch nahi. Workers tabhi kaam ke hain jab CPU hi rukaavat ho.',
      },
    },
    {
      heading: { en: 'Communication costs something', hi: 'Baat karne ki keemat hai' },
      body: {
        en: 'postMessage uses the structured clone algorithm, so a large object is COPIED to the worker. For a big buffer, transfer it instead — ownership moves and nothing is copied, but the sender can no longer use it.',
        hi: 'postMessage structured clone algorithm use karta hai, toh bada object worker ko COPY hota hai. Bade buffer ke liye usse transfer karo — maalikana chala jaata hai aur kuch copy nahi hota, par bhejne wala usse ab use nahi kar sakta.',
      },
      code: `w.postMessage(buf);                  // copied
w.postMessage(buf, [buf.buffer]);     // ✓ transferred, zero copy`,
    },
    {
      heading: { en: 'And they can genuinely share memory', hi: 'Aur ye sach mein memory share kar sakte hain' },
      body: {
        en: 'SharedArrayBuffer is visible to both threads with no copying at all, and Atomics coordinates access. This is the only place in Node where you get real shared mutable state — and with it, the classic concurrency hazards.',
        hi: 'SharedArrayBuffer dono threads ko bina kisi copy ke dikhta hai, aur Atomics access sambhaalta hai. Node mein ye ek hi jagah hai jahan sach mein saanjhi badalti state milti hai — aur uske saath classic concurrency ke khatre bhi.',
      },
    },
    {
      heading: { en: 'Creating one is not free', hi: 'Ek banana muft nahi hai' },
      body: {
        en: 'A worker starts a new V8 isolate, which costs tens of milliseconds and several megabytes. Spawning one per request is slower than doing the work inline. Use a pool — piscina is the standard choice — and reuse the threads.',
        hi: 'Worker naya V8 isolate shuru karta hai, jisme dus-bees millisecond aur kai megabytes lagte hain. Har request pe ek banana kaam wahin karne se dheema hai. Pool use karo — piscina standard chunav hai — aur threads dobara use karo.',
      },
      code: `const pool = new Piscina({ filename: './worker.js' });
const result = await pool.run(data);      // ✓ reuses threads`,
    },
    {
      heading: { en: 'Versus cluster and child_process', hi: 'cluster aur child_process se tulna' },
      body: {
        en: 'cluster forks whole processes to use every core for REQUEST handling. worker_threads adds threads inside one process for CPU work. child_process runs an external program. They solve three different problems and are not alternatives.',
        hi: 'cluster poore processes fork karta hai taaki har core REQUEST sambhaal sake. worker_threads ek process ke andar CPU ke kaam ke liye threads jodta hai. child_process koi bahari program chalata hai. Ye teen alag problems hain, vikalp nahi.',
      },
    },
  ],

  'How do you improve Node.js performance?': [
    {
      heading: { en: 'Measure before you change anything', hi: 'Kuch badalne se pehle naapo' },
      body: {
        en: 'Never open this answer with a list of tips. Start with how you find the problem: event loop lag to see if something is blocking, a CPU profile to see where time goes, a heap snapshot for memory, and APM traces to find the slow span.',
        hi: 'Is jawab ki shuruaat tips ki list se kabhi mat karo. Isse shuru karo ki problem kaise dhoondhoge: kuch rok raha hai ya nahi ye dekhne ko event loop lag, samay kahan ja raha hai uske liye CPU profile, memory ke liye heap snapshot, aur dheema hissa dhoondhne ke liye APM traces.',
      },
      code: `node --cpu-prof server.js       // then load the profile in DevTools
node --inspect server.js         // heap snapshots, live profiling`,
    },
    {
      heading: { en: 'Fix one: stop blocking the event loop', hi: 'Ilaaj ek: event loop rokna band karo' },
      body: {
        en: 'Almost always the biggest win. Find synchronous work in a request path — a Sync call, a large JSON.parse, synchronous crypto, a long loop — and move it to the async variant, a worker thread, or a job queue.',
        hi: 'Lagbhag hamesha sabse badi jeet. Request ke raaste mein synchronous kaam dhoondho — koi Sync call, bada JSON.parse, synchronous crypto, lamba loop — aur usse async roop, worker thread ya job queue pe le jao.',
      },
      code: `bcrypt.hashSync(pw, 12);      // ✗ blocks every request
await bcrypt.hash(pw, 12);     // ✓ thread pool`,
    },
    {
      heading: { en: 'Fix two: the database, which is usually the real problem', hi: 'Ilaaj do: database, jo aksar asli problem hai' },
      body: {
        en: 'Missing indexes, N+1 queries, no connection pool, and selecting columns you do not need. In most Node services the process is idle and waiting on the database, so no amount of JavaScript tuning will help.',
        hi: 'Gayab indexes, N+1 queries, connection pool ka na hona, aur wo columns lena jinki zaroorat nahi. Zyadatar Node services mein process khaali baitha database ka intezaar karta hai, toh JavaScript ki kitni bhi tuning kaam nahi aayegi.',
      },
      code: `for (const u of users) u.posts = await getPosts(u.id);   // ✗ N+1
const posts = await getPostsForUsers(users.map((u) => u.id));  // ✓ one query`,
    },
    {
      heading: { en: 'Fix three: parallelise independent awaits', hi: 'Ilaaj teen: alag awaits ko parallel karo' },
      body: {
        en: 'Awaiting in sequence when the calls do not depend on each other is the most common accidental slowdown in Node code. Start them all and await once.',
        hi: 'Jab calls ek doosre pe depend na karein tab bhi kram se await karna Node code ka sabse aam galti se hone wala dheemapan hai. Sab shuru karo aur ek baar await karo.',
      },
      code: `const [a, b, c] = await Promise.all([getA(), getB(), getC()]);`,
    },
    {
      heading: { en: 'Fix four: cache and compress', hi: 'Ilaaj chaar: cache aur compress' },
      body: {
        en: 'Redis for expensive computed results, HTTP cache headers so the client and the CDN do the work, and gzip or brotli on responses. A cache hit is the fastest possible query.',
        hi: 'Mehnge computed results ke liye Redis, HTTP cache headers taaki client aur CDN kaam karein, aur responses pe gzip ya brotli. Cache hit sabse tez query hai.',
      },
    },
    {
      heading: { en: 'Fix five: stream instead of buffering', hi: 'Ilaaj paanch: buffer nahi, stream karo' },
      body: {
        en: 'Loading a large file or a big result set into memory raises latency and risks the heap. Streaming keeps memory flat and gets the first byte to the client immediately.',
        hi: 'Badi file ya bada result set memory mein laana latency badhata hai aur heap ko khatre mein daalta hai. Stream karo toh memory sthir rehti hai aur pehla byte client tak turant pahunchta hai.',
      },
    },
    {
      heading: { en: 'And the operational settings', hi: 'Aur operational settings' },
      body: {
        en: 'NODE_ENV set to production, keep-alive on outgoing HTTP agents, a properly sized connection pool, and one process per core through cluster or the orchestrator. These are cheap and often forgotten.',
        hi: 'NODE_ENV production pe, bahar jaane wale HTTP agents pe keep-alive, sahi size ka connection pool, aur cluster ya orchestrator se har core pe ek process. Ye saste hain aur aksar bhool jaate hain.',
      },
    },
    {
      heading: { en: 'What NOT to do', hi: 'Kya NAHI karna' },
      body: {
        en: 'Micro-optimising JavaScript — swapping a forEach for a for loop — while a missing database index costs 200ms. Optimise what the profile shows, and be honest that the answer is almost never the JavaScript itself.',
        hi: 'JavaScript ki chhoti-chhoti optimisation — forEach ki jagah for loop — jabki gayab database index 200ms kha raha hai. Wahi optimise karo jo profile dikhaye, aur imaandaari se kaho ki jawab lagbhag kabhi JavaScript khud nahi hota.',
      },
    },
  ],

  'Explain the complete lifecycle of a Node.js request from client to database and back.': [
    {
      heading: { en: 'The whole path in one line', hi: 'Poora raasta ek line mein' },
      body: {
        en: 'DNS and TCP, TLS, the OS accepts the socket, libuv notifies the event loop, Node parses the HTTP request, your middleware and handler run, an async database call is handed off, the loop serves other requests while waiting, the callback resumes your handler, and the response streams back.',
        hi: 'DNS aur TCP, TLS, OS socket leta hai, libuv event loop ko batata hai, Node HTTP request parse karta hai, tumhara middleware aur handler chalta hai, async database call saunp di jaati hai, intezaar mein loop baaki requests sambhaalta hai, callback tumhara handler wapas chalata hai, aur response stream ho kar laut jaata hai.',
      },
      diagram: `client → DNS → TCP → TLS → OS accept → libuv → event loop
   → parse HTTP → middleware → handler → DB (async, handed off)
   → loop serves others → callback → serialise → response → client`,
    },
    {
      heading: { en: 'Before Node is involved at all', hi: 'Node ke aane se pehle' },
      body: {
        en: 'The browser resolves DNS, opens a TCP connection with a three-way handshake, and negotiates TLS. Often a load balancer or reverse proxy terminates TLS and forwards a plain HTTP request to your process. None of this is Node.',
        hi: 'Browser DNS resolve karta hai, teen-tarfa handshake se TCP connection kholta hai, aur TLS tay karta hai. Aksar load balancer ya reverse proxy TLS wahin khatam karke saada HTTP request tumhare process ko bhej deta hai. Isme se kuch bhi Node nahi hai.',
      },
    },
    {
      heading: { en: 'The socket reaches the event loop', hi: 'Socket event loop tak pahunchta hai' },
      body: {
        en: 'The OS accepts the connection and notifies libuv through epoll or kqueue. On the next poll phase the loop sees readable data and invokes Node HTTP parser, which builds the req and res objects and emits the request event.',
        hi: 'OS connection leta hai aur epoll ya kqueue se libuv ko batata hai. Agle poll phase mein loop ko padhne laayak data dikhta hai aur wo Node ka HTTP parser chalata hai, jo req aur res objects banata hai aur request event emit karta hai.',
      },
    },
    {
      heading: { en: 'Your middleware chain runs synchronously', hi: 'Tumhara middleware chain synchronously chalta hai' },
      body: {
        en: 'Body parsing, auth, logging, validation — each runs on the main thread and each one blocks every other request while it does. This is why a slow synchronous middleware hurts the whole server, not just one route.',
        hi: 'Body parsing, auth, logging, validation — har ek main thread pe chalta hai aur chalte waqt har doosri request rokta hai. Isiliye dheema synchronous middleware poore server ko nuksaan pahunchata hai, sirf ek route ko nahi.',
      },
      code: `app.use(express.json({ limit: '1mb' }));   // parses on the main thread`,
    },
    {
      heading: { en: 'The database call is where the thread is released', hi: 'Database call pe thread chhoot jaata hai' },
      body: {
        en: 'This is the key moment. The driver writes the query to a socket and registers interest with libuv, then your handler returns at the await. The thread immediately picks up the next request while the database works.',
        hi: 'Yahi asli pal hai. Driver query socket pe likhta hai aur libuv ke paas apni ruchi register karta hai, phir tumhara handler await pe laut jaata hai. Thread turant agli request uthata hai jabki database kaam kar raha hota hai.',
      },
      code: `const rows = await pool.query('SELECT …');   // thread free from here`,
    },
    {
      heading: { en: 'And the connection pool matters here', hi: 'Aur yahan connection pool maayne rakhta hai' },
      body: {
        en: 'The driver does not open a connection per request — it borrows one from a pool. If the pool is exhausted the request waits for a free connection, which is a queue your metrics should show and a very common source of latency under load.',
        hi: 'Driver har request pe connection nahi kholta — wo pool se ek udhaar leta hai. Pool khatam ho jaaye toh request khaali connection ka intezaar karti hai, jo ek line hai jo tumhare metrics mein dikhni chahiye aur load mein latency ki bahut aam wajah hai.',
      },
    },
    {
      heading: { en: 'The response resumes your handler', hi: 'Response tumhara handler wapas chalata hai' },
      body: {
        en: 'The database replies, the socket becomes readable, libuv queues the callback, and on the next poll phase the event loop resumes your function after the await. Serialising the result to JSON happens here — on the main thread, and it is CPU work.',
        hi: 'Database jawab deta hai, socket padhne laayak ho jaata hai, libuv callback queue karta hai, aur agle poll phase mein event loop tumhara function await ke baad se chalata hai. Nateeje ko JSON banana yahin hota hai — main thread pe, aur ye CPU ka kaam hai.',
      },
    },
    {
      heading: { en: 'Writing the response is a stream', hi: 'Response likhna ek stream hai' },
      body: {
        en: 'res is a writable stream, so the body is written in chunks and backpressure applies. A slow client can make the write buffer grow, which is why streaming a large response rather than buffering it matters.',
        hi: 'res ek writable stream hai, toh body tukdon mein likhi jaati hai aur backpressure lagta hai. Dheema client write buffer badha sakta hai, isiliye bade response ko buffer karne ki jagah stream karna maayne rakhta hai.',
      },
    },
    {
      heading: { en: 'The point the whole answer is making', hi: 'Poora jawab jo baat keh raha hai' },
      body: {
        en: 'One thread handled this request and dozens of others, because the only time it was busy was parsing, running your logic and serialising. Every wait — TCP, the database, the client — happened outside it. That is the entire Node model in one request.',
        hi: 'Ek thread ne ye request aur darjanon aur sambhaali, kyunki wo sirf parsing, tumhara logic chalane aur serialise karne mein vyast tha. Har intezaar — TCP, database, client — uske bahar hua. Ek hi request mein poora Node model yahi hai.',
      },
    },
  ],
};
