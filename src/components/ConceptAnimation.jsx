'use client';

/*
 * Animated explainers for JavaScript concepts.
 *
 * A question references one by key (the `visual` field), so the same
 * animation is reused across every question about that concept rather than
 * each question shipping its own.
 *
 * Each explainer is a list of STEPS. A step has a caption and whatever shape
 * that particular explainer draws. Playback, the step bar, and the
 * play/pause/reset controls are shared by <ConceptAnimation>.
 */

import { useEffect, useRef, useState } from 'react';
import { useLang } from './LanguageProvider';

/* ── Step data ──────────────────────────────────────────────── */

const box = (label, tone = 'idle') => ({ label, tone });

const SCRIPTS = {
  /* How the engine runs and unwinds nested calls. */
  'call-stack': {
    title: { en: 'The call stack', hi: 'Call stack' },
    code: `function third()  { return 'done'; }
function second() { return third(); }
function first()  { return second(); }

first();`,
    kind: 'stack',
    steps: [
      { caption: { en: 'Nothing is running yet — the stack is empty.', hi: 'Abhi kuch nahi chal raha — stack khaali hai.' }, stack: [] },
      { caption: { en: 'first() is called, so a frame is pushed on top.', hi: 'first() call hua, ek frame upar push hua.' }, stack: [box('first()', 'new')] },
      { caption: { en: 'first() calls second(). The new frame goes above it.', hi: 'first() ne second() bulaya. Naya frame uske upar.' }, stack: [box('first()'), box('second()', 'new')] },
      { caption: { en: 'second() calls third(). Only the top frame runs.', hi: 'second() ne third() bulaya. Sirf sabse upar wala chalta hai.' }, stack: [box('first()'), box('second()'), box('third()', 'new')] },
      { caption: { en: 'third() returns "done" and its frame pops off.', hi: 'third() ne "done" return kiya, uska frame pop ho gaya.' }, stack: [box('first()'), box('second()', 'active')] },
      { caption: { en: 'second() returns, then first() returns.', hi: 'second() return hua, phir first() return hua.' }, stack: [box('first()', 'active')] },
      { caption: { en: 'The stack is empty again. This is why JS is single-threaded.', hi: 'Stack phir khaali. Isiliye JS single-threaded hai.' }, stack: [] },
    ],
  },

  /* Why setTimeout(…, 0) still runs after synchronous code. */
  'event-loop': {
    title: { en: 'The event loop', hi: 'Event loop' },
    code: `console.log('1');
setTimeout(() => console.log('3'), 0);
Promise.resolve().then(() => console.log('2'));
console.log('1.5');`,
    kind: 'loop',
    steps: [
      { caption: { en: 'console.log("1") runs straight away and prints 1.', hi: 'console.log("1") turant chalta hai aur 1 print karta hai.' }, stack: ['log("1")'], web: [], macro: [], micro: [], out: '1' },
      { caption: { en: 'setTimeout hands its callback to the browser, not to JS.', hi: 'setTimeout apna callback browser ko deta hai, JS ko nahi.' }, stack: ['setTimeout'], web: ['timer 0ms'], macro: [], micro: [], out: '1' },
      { caption: { en: 'The timer finishes and the callback waits in the macrotask queue.', hi: 'Timer khatam, callback macrotask queue mein aa gaya.' }, stack: [], web: [], macro: ['log("3")'], micro: [], out: '1' },
      { caption: { en: 'The promise callback goes to the microtask queue — a separate, higher-priority line.', hi: 'Promise ka callback microtask queue mein — alag, zyada priority wali line.' }, stack: [], web: [], macro: ['log("3")'], micro: ['log("2")'], out: '1' },
      { caption: { en: 'console.log("1.5") still runs first — all synchronous code finishes before any queue.', hi: 'console.log("1.5") phir bhi pehle — saara synchronous code kisi bhi queue se pehle khatam hota hai.' }, stack: ['log("1.5")'], web: [], macro: ['log("3")'], micro: ['log("2")'], out: '1, 1.5' },
      { caption: { en: 'Stack empty → microtasks drain FIRST. 2 prints.', hi: 'Stack khaali → PEHLE microtasks. 2 print hua.' }, stack: ['log("2")'], web: [], macro: ['log("3")'], micro: [], out: '1, 1.5, 2' },
      { caption: { en: 'Only now does a macrotask run. 3 prints last.', hi: 'Ab jaakar macrotask chalta hai. 3 aakhir mein.' }, stack: ['log("3")'], web: [], macro: [], micro: [], out: '1, 1.5, 2, 3' },
    ],
  },

  /* Two-phase execution: declarations are moved, assignments are not. */
  hoisting: {
    title: { en: 'Hoisting', hi: 'Hoisting' },
    code: `console.log(a); // undefined
console.log(b); // ReferenceError
var a = 1;
let b = 2;`,
    kind: 'phases',
    steps: [
      { caption: { en: 'Before any line runs, JS scans the scope. This is the memory phase.', hi: 'Koi line chalne se pehle JS scope scan karta hai. Ye memory phase hai.' }, mem: [], phase: 'scan' },
      { caption: { en: 'var a is set aside and given the value undefined.', hi: 'var a ke liye jagah bani aur value undefined mili.' }, mem: [{ n: 'a', v: 'undefined', ok: true }], phase: 'scan' },
      { caption: { en: 'let b is set aside too, but with NO value — the temporal dead zone.', hi: 'let b ke liye bhi jagah bani, par BINA value — temporal dead zone.' }, mem: [{ n: 'a', v: 'undefined', ok: true }, { n: 'b', v: 'TDZ', ok: false }], phase: 'scan' },
      { caption: { en: 'Now code runs. Reading a gives undefined — it exists but is unassigned.', hi: 'Ab code chalta hai. a padhne pe undefined — wo hai par value nahi mili.' }, mem: [{ n: 'a', v: 'undefined', ok: true }, { n: 'b', v: 'TDZ', ok: false }], phase: 'run', read: 'a' },
      { caption: { en: 'Reading b throws — a let in its TDZ cannot be touched.', hi: 'b padhna throw karta hai — TDZ mein let ko chhoo nahi sakte.' }, mem: [{ n: 'a', v: 'undefined', ok: true }, { n: 'b', v: 'TDZ', ok: false }], phase: 'run', read: 'b', error: true },
      { caption: { en: 'Assignments happen on their own line — those never move up.', hi: 'Assignments apni line pe hote hain — wo kabhi upar nahi jaate.' }, mem: [{ n: 'a', v: '1', ok: true }, { n: 'b', v: '2', ok: true }], phase: 'run' },
    ],
  },

  /* An inner function keeps its outer scope alive. */
  closure: {
    title: { en: 'Closures', hi: 'Closures' },
    code: `function counter() {
  let count = 0;
  return () => ++count;
}
const inc = counter();
inc(); // 1
inc(); // 2`,
    kind: 'scopes',
    steps: [
      { caption: { en: 'counter() is called and gets its own scope.', hi: 'counter() call hua aur usko apna scope mila.' }, outer: { alive: true, count: '0' }, inner: false, out: '' },
      { caption: { en: 'Inside it, count = 0 lives in that scope.', hi: 'Uske andar count = 0 us scope mein rehta hai.' }, outer: { alive: true, count: '0' }, inner: true, out: '' },
      { caption: { en: 'counter() returns the arrow function and finishes.', hi: 'counter() arrow function return karke khatam ho gaya.' }, outer: { alive: true, count: '0', done: true }, inner: true, out: '' },
      { caption: { en: 'Normally that scope would be cleaned up — but the inner function still points at it, so it survives.', hi: 'Normally wo scope saaf ho jaata — par inner function abhi bhi us pe point karta hai, isliye bacha rehta hai.' }, outer: { alive: true, count: '0', done: true, closed: true }, inner: true, out: '' },
      { caption: { en: 'inc() reads and updates the SAME count. It becomes 1.', hi: 'inc() USI count ko padhta aur badalta hai. Wo 1 ho gaya.' }, outer: { alive: true, count: '1', done: true, closed: true }, inner: true, out: '1' },
      { caption: { en: 'inc() again → 2. The variable is private and remembered.', hi: 'inc() phir se → 2. Variable private hai aur yaad rehta hai.' }, outer: { alive: true, count: '2', done: true, closed: true }, inner: true, out: '1, 2' },
    ],
  },

  /* Property lookup walks up the chain. */
  'prototype-chain': {
    title: { en: 'Prototype chain', hi: 'Prototype chain' },
    code: `const dog = { name: 'Rex' };
// dog → Object.prototype → null

dog.name;         // found on dog
dog.toString();   // found further up
dog.fly;          // undefined`,
    kind: 'chain',
    steps: [
      { caption: { en: 'dog has its own property: name.', hi: 'dog ke paas apni property hai: name.' }, look: null, found: null },
      { caption: { en: 'Reading dog.name — found immediately on the object itself.', hi: 'dog.name padha — object pe hi turant mil gaya.' }, look: 'name', found: 0 },
      { caption: { en: 'Reading dog.toString() — not on dog, so JS looks one level up.', hi: 'dog.toString() — dog pe nahi, isliye JS ek level upar dekhta hai.' }, look: 'toString', found: null, at: 0 },
      { caption: { en: 'Found on Object.prototype. That is inheritance.', hi: 'Object.prototype pe mil gaya. Yahi inheritance hai.' }, look: 'toString', found: 1 },
      { caption: { en: 'Reading dog.fly — checked everywhere, nothing found.', hi: 'dog.fly — sab jagah dekha, kuch nahi mila.' }, look: 'fly', found: null, at: 1 },
      { caption: { en: 'The chain ends at null, so the result is undefined (no error).', hi: 'Chain null pe khatam, isliye result undefined (error nahi).' }, look: 'fly', found: 2, undef: true },
    ],
  },

  /* A promise settles once and never changes again. */
  'promise-states': {
    title: { en: 'Promise states', hi: 'Promise states' },
    code: `const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('data'), 1000);
});

p.then(v => console.log(v));  // 'data'`,
    kind: 'states',
    steps: [
      { caption: { en: 'A new promise starts as pending — the work has begun but no result yet.', hi: 'Naya promise pending se shuru hota hai — kaam shuru par result nahi.' }, state: 'pending', out: '' },
      { caption: { en: '.then() is registered now, even though nothing has settled.', hi: '.then() abhi register ho gaya, chahe kuch settle na hua ho.' }, state: 'pending', registered: true, out: '' },
      { caption: { en: 'One second later resolve("data") is called.', hi: 'Ek second baad resolve("data") call hua.' }, state: 'fulfilled', registered: true, out: '' },
      { caption: { en: 'The promise is now fulfilled. Its .then callback is queued as a microtask.', hi: 'Promise ab fulfilled hai. Uska .then callback microtask ban gaya.' }, state: 'fulfilled', registered: true, queued: true, out: '' },
      { caption: { en: 'The callback runs and logs "data".', hi: 'Callback chala aur "data" log hua.' }, state: 'fulfilled', registered: true, out: 'data' },
      { caption: { en: 'Settled is permanent — calling resolve or reject again does nothing.', hi: 'Settled hamesha ke liye — dobara resolve ya reject kuch nahi karta.' }, state: 'fulfilled', locked: true, out: 'data' },
    ],
  },

  /* Four call shapes, four values of `this`. */
  'this-binding': {
    title: { en: 'How `this` is decided', hi: '`this` kaise tay hota hai' },
    code: `const user = {
  name: 'Asha',
  greet()      { return this.name; },
  arrow: ()    => this.name,
};

user.greet();              // 'Asha'
const g = user.greet; g(); // undefined
g.call(user);              // 'Asha'
new Person();              // the new object`,
    kind: 'this',
    steps: [
      { caption: { en: 'Rule: `this` is decided by HOW a function is called, not where it is written.', hi: 'Niyam: `this` is se tay hota hai ki function KAISE bulaya gaya, kahan likha gaya us se nahi.' }, mode: null },
      { caption: { en: 'user.greet() — there is a dot, so `this` is whatever is left of the dot: user.', hi: 'user.greet() — dot hai, isliye `this` dot ke baaye wala hai: user.' }, mode: 'method' },
      { caption: { en: 'Pulled out and called alone — no dot, so `this` is undefined in strict mode.', hi: 'Alag nikaal kar akela bulaya — dot nahi, isliye strict mode mein `this` undefined.' }, mode: 'plain' },
      { caption: { en: 'call/apply/bind let you set `this` by hand.', hi: 'call/apply/bind se tum `this` khud set karte ho.' }, mode: 'explicit' },
      { caption: { en: 'new creates a fresh object and points `this` at it.', hi: 'new ek naya object banata hai aur `this` uspe point karta hai.' }, mode: 'new' },
      { caption: { en: 'An arrow function has no own `this` — it borrows from where it was written.', hi: 'Arrow function ka apna `this` nahi — wo jahan likha gaya wahan se udhaar leta hai.' }, mode: 'arrow' },
    ],
  },

  /* What == actually does before comparing. */
  coercion: {
    title: { en: '== vs ===', hi: '== vs ===' },
    code: `0 == '0'    // true  — '0' becomes 0
0 === '0'   // false — different types

null == undefined   // true  (special rule)
NaN == NaN          // false (never equal)`,
    kind: 'coercion',
    steps: [
      { caption: { en: 'Compare 0 == "0". The two sides have different types.', hi: '0 == "0" compare karo. Dono sides ke types alag hain.' }, left: '0', right: '"0"', lt: 'number', rt: 'string', step: 'start' },
      { caption: { en: '== is allowed to convert. The string is turned into a number.', hi: '== convert kar sakta hai. String ko number bana diya.' }, left: '0', right: '0', lt: 'number', rt: 'number', step: 'convert' },
      { caption: { en: 'Now both are 0, so the result is true.', hi: 'Ab dono 0 hain, isliye result true.' }, left: '0', right: '0', lt: 'number', rt: 'number', step: 'equal', result: true },
      { caption: { en: 'With === there is no conversion step at all.', hi: '=== mein conversion ka step hota hi nahi.' }, left: '0', right: '"0"', lt: 'number', rt: 'string', step: 'strict' },
      { caption: { en: 'Types differ → false immediately. This is why you should default to ===.', hi: 'Types alag → turant false. Isiliye default === use karo.' }, left: '0', right: '"0"', lt: 'number', rt: 'string', step: 'strict', result: false },
    ],
  },
  /* Node's loop has named phases — quite different from the browser's. */
  'node-event-loop': {
    title: { en: 'Node event loop phases', hi: 'Node event loop ke phases' },
    code: `setTimeout(()  => console.log('timers'), 0);
setImmediate(() => console.log('check'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
console.log('sync');`,
    kind: 'nodeloop',
    steps: [
      { caption: { en: 'All synchronous code runs first, before the loop starts a single phase.', hi: 'Saara synchronous code pehle chalta hai, loop ke ek bhi phase se pehle.' }, phase: null, tick: [], micro: [], out: 'sync' },
      { caption: { en: 'Between every phase Node drains nextTick FIRST, then promises.', hi: 'Har phase ke beech Node pehle nextTick khaali karta hai, phir promises.' }, phase: null, tick: ['nextTick'], micro: ['promise'], out: 'sync' },
      { caption: { en: 'nextTick has the highest priority of all — even above promises.', hi: 'nextTick ki priority sabse ooonchi hai — promises se bhi upar.' }, phase: null, tick: [], micro: ['promise'], out: 'sync, nextTick' },
      { caption: { en: 'Then the promise microtask runs.', hi: 'Phir promise ka microtask chalta hai.' }, phase: null, tick: [], micro: [], out: 'sync, nextTick, promise' },
      { caption: { en: 'Phase 1 — TIMERS. setTimeout and setInterval callbacks fire here.', hi: 'Phase 1 — TIMERS. setTimeout aur setInterval yahan chalte hain.' }, phase: 0, tick: [], micro: [], out: 'sync, nextTick, promise, timers' },
      { caption: { en: 'Phase 4 — POLL. Node waits here for new I/O: files, sockets, network.', hi: 'Phase 4 — POLL. Node yahan naye I/O ka intezaar karta hai: files, sockets, network.' }, phase: 3, tick: [], micro: [], out: 'sync, nextTick, promise, timers' },
      { caption: { en: 'Phase 5 — CHECK. This is where setImmediate runs, always after poll.', hi: 'Phase 5 — CHECK. Yahan setImmediate chalta hai, hamesha poll ke baad.' }, phase: 4, tick: [], micro: [], out: 'sync, nextTick, promise, timers, check' },
      { caption: { en: 'The loop repeats. It only exits when no work and no handles remain.', hi: 'Loop dohraata hai. Ye tabhi rukta hai jab na kaam bache na handles.' }, phase: 5, tick: [], micro: [], out: 'sync, nextTick, promise, timers, check' },
    ],
  },

  /* Why one slow function freezes an entire Node server. */
  'blocking-io': {
    title: { en: 'Blocking vs non-blocking', hi: 'Blocking vs non-blocking' },
    code: `// BLOCKING — holds the one main thread
const data = fs.readFileSync('big.json');

// NON-BLOCKING — handed to the thread pool
fs.readFile('big.json', (err, data) => { /* later */ });`,
    kind: 'threads',
    steps: [
      { caption: { en: 'Node runs your JavaScript on ONE main thread.', hi: 'Node tumhara JavaScript EK main thread pe chalata hai.' }, main: 'idle', pool: [null, null, null, null], queue: [], note: null },
      { caption: { en: 'readFileSync parks on the main thread and holds it.', hi: 'readFileSync main thread pe baith jaata hai aur use rok leta hai.' }, main: 'blocked', pool: [null, null, null, null], queue: ['req 2', 'req 3'], note: 'blocked' },
      { caption: { en: 'Every other request now waits. The whole server is frozen.', hi: 'Baaki har request ab intezaar karti hai. Poora server jam gaya.' }, main: 'blocked', pool: [null, null, null, null], queue: ['req 2', 'req 3', 'req 4'], note: 'blocked' },
      { caption: { en: 'Now the async version — readFile hands the work to libuv.', hi: 'Ab async version — readFile kaam libuv ko de deta hai.' }, main: 'free', pool: ['read file', null, null, null], queue: [], note: null },
      { caption: { en: 'A thread-pool worker does the reading. The main thread is free again.', hi: 'Ek thread-pool worker padhta hai. Main thread phir khaali hai.' }, main: 'free', pool: ['read file', null, null, null], queue: [], note: 'serving others' },
      { caption: { en: 'When it finishes, the callback is queued and runs on the main thread.', hi: 'Khatam hone pe callback queue mein aata hai aur main thread pe chalta hai.' }, main: 'callback', pool: [null, null, null, null], queue: [], note: null },
      { caption: { en: 'The pool defaults to 4 threads. CPU-heavy work still blocks — use worker_threads for that.', hi: 'Pool default 4 threads ka hai. CPU-heavy kaam phir bhi rokta hai — uske liye worker_threads.' }, main: 'free', pool: [null, null, null, null], queue: [], note: null },
    ],
  },

  /* Chunks, and what backpressure actually is. */
  streams: {
    title: { en: 'Streams and backpressure', hi: 'Streams aur backpressure' },
    code: `// Loads the WHOLE file into memory first — 2GB file = 2GB RAM
const data = await fs.promises.readFile('big.mp4');
res.end(data);

// Streams it in small chunks instead
fs.createReadStream('big.mp4').pipe(res);`,
    kind: 'stream',
    steps: [
      { caption: { en: 'A readable stream produces data in small chunks, not all at once.', hi: 'Ek readable stream data chhote chunks mein deta hai, sab ek saath nahi.' }, chunks: 1, buffer: 0, slow: false, note: null },
      { caption: { en: 'Each chunk is handed on to the writable side.', hi: 'Har chunk writable side ko diya jaata hai.' }, chunks: 2, buffer: 1, slow: false, note: null },
      { caption: { en: 'Memory stays flat — only a chunk or two is held at a time.', hi: 'Memory sthir rehti hai — ek-do chunk hi rakhe jaate hain.' }, chunks: 3, buffer: 1, slow: false, note: 'low memory' },
      { caption: { en: 'Now the destination slows down — a slow network, a busy disk.', hi: 'Ab destination dheema pad gaya — slow network, busy disk.' }, chunks: 4, buffer: 3, slow: true, note: null },
      { caption: { en: 'The internal buffer fills past its highWaterMark.', hi: 'Andar ka buffer apne highWaterMark se aage bhar jaata hai.' }, chunks: 5, buffer: 5, slow: true, note: 'buffer full' },
      { caption: { en: 'BACKPRESSURE: write() returns false, so the reader PAUSES.', hi: 'BACKPRESSURE: write() false lautaata hai, isliye reader RUK jaata hai.' }, chunks: 5, buffer: 5, slow: true, note: 'paused' },
      { caption: { en: 'On "drain" it resumes. pipe() does all of this for you — that is why you should use it.', hi: '"drain" pe wo chalu ho jaata hai. pipe() ye sab khud karta hai — isiliye use karo.' }, chunks: 6, buffer: 2, slow: false, note: 'resumed' },
    ],
  },

  /* One process cannot use all your cores. */
  cluster: {
    title: { en: 'Clustering', hi: 'Clustering' },
    code: `const cluster = require('node:cluster');
const cpus = require('node:os').cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < cpus; i++) cluster.fork();
  cluster.on('exit', () => cluster.fork());   // restart a dead worker
} else {
  startServer();          // each worker runs the real app
}`,
    kind: 'cluster',
    steps: [
      { caption: { en: 'One Node process uses ONE CPU core, however many you have.', hi: 'Ek Node process EK CPU core use karta hai, chahe tumhare paas kitne bhi hon.' }, workers: [], load: [0, 0, 0, 0], primaryOnly: true, dead: -1 },
      { caption: { en: 'The primary process forks one worker per core.', hi: 'Primary process har core ke liye ek worker fork karta hai.' }, workers: [1, 2, 3, 4], load: [0, 0, 0, 0], primaryOnly: false, dead: -1 },
      { caption: { en: 'Incoming requests are shared out across the workers.', hi: 'Aane wali requests workers mein baant di jaati hain.' }, workers: [1, 2, 3, 4], load: [2, 1, 2, 1], primaryOnly: false, dead: -1 },
      { caption: { en: 'Roughly four times the throughput — all cores are working.', hi: 'Lagbhag chaar guna throughput — saare cores kaam pe hain.' }, workers: [1, 2, 3, 4], load: [3, 3, 2, 3], primaryOnly: false, dead: -1 },
      { caption: { en: 'A worker crashes. Only its own requests are affected.', hi: 'Ek worker crash hua. Sirf uski requests affect hui.' }, workers: [1, 2, 3, 4], load: [3, 0, 2, 3], primaryOnly: false, dead: 1 },
      { caption: { en: 'The primary forks a replacement — the site never goes down.', hi: 'Primary ek naya fork karta hai — site kabhi band nahi hoti.' }, workers: [1, 5, 3, 4], load: [3, 1, 2, 3], primaryOnly: false, dead: -1 },
      { caption: { en: 'Workers share nothing. Sessions and cache must live in Redis, not memory.', hi: 'Workers kuch share nahi karte. Sessions aur cache Redis mein rahein, memory mein nahi.' }, workers: [1, 5, 3, 4], load: [2, 2, 2, 2], primaryOnly: false, dead: -1 },
    ],
  },

  /* The publish/subscribe object most of Node is built on. */
  'event-emitter': {
    title: { en: 'EventEmitter', hi: 'EventEmitter' },
    code: `const EventEmitter = require('node:events');
const bus = new EventEmitter();

bus.on('order', (id) => console.log('email for', id));
bus.on('order', (id) => console.log('invoice for', id));

bus.emit('order', 42);`,
    kind: 'emitter',
    steps: [
      { caption: { en: 'A fresh emitter has no listeners for anything.', hi: 'Ek naye emitter pe kisi cheez ka koi listener nahi.' }, listeners: [], firing: -1, out: '' },
      { caption: { en: '.on() registers a listener for the "order" event.', hi: '.on() "order" event ke liye ek listener register karta hai.' }, listeners: ['email'], firing: -1, out: '' },
      { caption: { en: 'A second listener for the SAME event. Both are kept, in order.', hi: 'USI event ka doosra listener. Dono rakhe jaate hain, kram mein.' }, listeners: ['email', 'invoice'], firing: -1, out: '' },
      { caption: { en: '.emit() runs every listener SYNCHRONOUSLY, in the order they were added.', hi: '.emit() har listener ko SYNCHRONOUSLY chalata hai, jis kram mein wo jude the.' }, listeners: ['email', 'invoice'], firing: 0, out: 'email for 42' },
      { caption: { en: 'Then the second one. emit does not wait for async work inside them.', hi: 'Phir doosra. emit unke andar ke async kaam ka intezaar nahi karta.' }, listeners: ['email', 'invoice'], firing: 1, out: 'email for 42, invoice for 42' },
      { caption: { en: 'Remove listeners you no longer need — forgetting is a common memory leak.', hi: 'Jo listeners na chahiye unhe hatao — bhoolna ek aam memory leak hai.' }, listeners: ['email'], firing: -1, out: 'email for 42, invoice for 42' },
    ],
  },
  /* What actually happens between setState and the screen changing. */
  'react-render': {
    title: { en: 'The render cycle', hi: 'Render cycle' },
    code: `function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`,
    kind: 'renderflow',
    steps: [
      { caption: { en: 'The component is idle. Nothing is happening.', hi: 'Component shaant hai. Kuch nahi ho raha.' }, stage: -1, note: null },
      { caption: { en: 'You click. setN schedules an update — it does NOT change n right now.', hi: 'Tumne click kiya. setN ek update schedule karta hai — n abhi nahi badalta.' }, stage: 0, note: 'setN(1)' },
      { caption: { en: 'RENDER: React calls your function again and gets new JSX.', hi: 'RENDER: React tumhara function dobara bulaata hai aur nayi JSX leta hai.' }, stage: 1, note: 'Counter() runs' },
      { caption: { en: 'RECONCILE: it compares the new tree with the old one.', hi: 'RECONCILE: naye ped ko purane se compare karta hai.' }, stage: 2, note: 'only text changed' },
      { caption: { en: 'COMMIT: only the changed bit is written to the real DOM.', hi: 'COMMIT: sirf badla hua hissa asli DOM mein likha jaata hai.' }, stage: 3, note: 'textContent = 1' },
      { caption: { en: 'Then effects run — useLayoutEffect before paint, useEffect after.', hi: 'Phir effects chalte hain — useLayoutEffect paint se pehle, useEffect baad mein.' }, stage: 4, note: 'useEffect' },
      { caption: { en: 'Rendering is NOT the same as touching the DOM. Most renders change nothing.', hi: 'Render karna DOM chhoona nahi hai. Zyadatar renders kuch nahi badalte.' }, stage: -1, note: null },
    ],
  },

  /* Why a wrong key corrupts state instead of just being slow. */
  'list-keys': {
    title: { en: 'Why keys matter', hi: 'Keys kyun zaroori hain' },
    code: `{items.map((item, i) => (
  <Row key={i} item={item} />     // ❌ index as key
))}

{items.map((item) => (
  <Row key={item.id} item={item} />   // ✅ stable id
))}`,
    kind: 'keys',
    steps: [
      { caption: { en: 'Three rows. Anna’s checkbox is ticked.', hi: 'Teen rows. Anna ka checkbox ticked hai.' }, rows: [{ id: 'a', name: 'Anna', k: 0, checked: true }, { id: 'b', name: 'Ben', k: 1, checked: false }, { id: 'c', name: 'Cara', k: 2, checked: false }], mode: 'index', bad: false },
      { caption: { en: 'With index keys, React identifies rows by POSITION: 0, 1, 2.', hi: 'Index keys ke saath React rows ko JAGAH se pehchanta hai: 0, 1, 2.' }, rows: [{ id: 'a', name: 'Anna', k: 0, checked: true }, { id: 'b', name: 'Ben', k: 1, checked: false }, { id: 'c', name: 'Cara', k: 2, checked: false }], mode: 'index', bad: false },
      { caption: { en: 'Now delete Anna — the first row.', hi: 'Ab Anna hatao — pehli row.' }, rows: [{ id: 'b', name: 'Ben', k: 0, checked: true }, { id: 'c', name: 'Cara', k: 1, checked: false }], mode: 'index', bad: true },
      { caption: { en: 'Ben slid into position 0, so React reuses Anna’s state. Ben is now ticked!', hi: 'Ben jagah 0 pe aa gaya, isliye React ne Anna ki state dobara de di. Ben ab ticked hai!' }, rows: [{ id: 'b', name: 'Ben', k: 0, checked: true }, { id: 'c', name: 'Cara', k: 1, checked: false }], mode: 'index', bad: true },
      { caption: { en: 'Start again with stable id keys.', hi: 'Phir se shuru, sthir id keys ke saath.' }, rows: [{ id: 'a', name: 'Anna', k: 'a', checked: true }, { id: 'b', name: 'Ben', k: 'b', checked: false }, { id: 'c', name: 'Cara', k: 'c', checked: false }], mode: 'id', bad: false },
      { caption: { en: 'Delete Anna. Ben keeps key "b", so he keeps his own state.', hi: 'Anna hatao. Ben ki key "b" wahi hai, isliye uski apni state bachi rehti hai.' }, rows: [{ id: 'b', name: 'Ben', k: 'b', checked: false }, { id: 'c', name: 'Cara', k: 'c', checked: false }], mode: 'id', bad: false },
      { caption: { en: 'A key is an IDENTITY, not a number. Index is only safe if the list never reorders.', hi: 'Key ek PEHCHAAN hai, number nahi. Index tabhi surakshit hai jab list kabhi na badle.' }, rows: [{ id: 'b', name: 'Ben', k: 'b', checked: false }, { id: 'c', name: 'Cara', k: 'c', checked: false }], mode: 'id', bad: false },
    ],
  },

  /* Hooks are stored in an array, which is the whole reason for the rules. */
  'hooks-order': {
    title: { en: 'Why hook order matters', hi: 'Hook ka kram kyun matter karta hai' },
    code: `function Form({ isLoggedIn }) {
  const [name, setName] = useState('');
  if (isLoggedIn) {
    const [email, setEmail] = useState('');   // ❌ conditional
  }
  useEffect(() => {}, []);
}`,
    kind: 'hooks',
    steps: [
      { caption: { en: 'React stores hooks in an ARRAY, in call order. No names involved.', hi: 'React hooks ko ek ARRAY mein rakhta hai, bulaane ke kram se. Naam ka koi role nahi.' }, slots: [], reading: -1, err: false },
      { caption: { en: 'First render, logged in. Slot 0 gets name.', hi: 'Pehla render, logged in. Slot 0 ko name mila.' }, slots: [{ h: 'useState', v: 'name' }], reading: 0, err: false },
      { caption: { en: 'Slot 1 gets email — because the condition was true.', hi: 'Slot 1 ko email mila — kyunki shart sach thi.' }, slots: [{ h: 'useState', v: 'name' }, { h: 'useState', v: 'email' }], reading: 1, err: false },
      { caption: { en: 'Slot 2 gets the effect. So far so good.', hi: 'Slot 2 ko effect mila. Abhi tak sab theek.' }, slots: [{ h: 'useState', v: 'name' }, { h: 'useState', v: 'email' }, { h: 'useEffect', v: '—' }], reading: 2, err: false },
      { caption: { en: 'Now isLoggedIn turns false, so the second useState is skipped.', hi: 'Ab isLoggedIn false ho gaya, isliye doosra useState skip ho gaya.' }, slots: [{ h: 'useState', v: 'name' }, { h: 'useEffect', v: '—' }], reading: 1, err: false },
      { caption: { en: 'React reads slot 1 expecting email’s state — and hands the EFFECT that state.', hi: 'React slot 1 se email ki state chahta hai — aur EFFECT ko wo state de deta hai.' }, slots: [{ h: 'useEffect', v: 'got email!' }, { h: '???', v: '—' }], reading: 0, err: true },
      { caption: { en: 'That is why hooks must be top-level and unconditional — the array must line up every time.', hi: 'Isiliye hooks top-level aur bina shart hone chahiye — array har baar milna chahiye.' }, slots: [{ h: 'useState', v: 'name' }, { h: 'useState', v: 'email' }, { h: 'useEffect', v: '—' }], reading: -1, err: false },
    ],
  },

  /* Mount, update, cleanup — and why the dependency array decides. */
  'effect-lifecycle': {
    title: { en: 'useEffect lifecycle', hi: 'useEffect ka jeevan chakra' },
    code: `useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);   // cleanup
}, [roomId]);`,
    kind: 'effect',
    steps: [
      { caption: { en: 'The component mounts and paints first — effects never block the screen.', hi: 'Component mount hota hai aur pehle paint hota hai — effects screen nahi rokte.' }, phase: 'mount', running: false, cleanup: false, deps: 'room-1' },
      { caption: { en: 'AFTER paint, the effect runs. The interval starts.', hi: 'Paint ke BAAD effect chalta hai. Interval shuru.' }, phase: 'mount', running: true, cleanup: false, deps: 'room-1' },
      { caption: { en: 'A re-render happens, but roomId is unchanged — the effect is SKIPPED.', hi: 'Dobara render hua, par roomId wahi hai — effect SKIP ho gaya.' }, phase: 'update', running: true, cleanup: false, deps: 'room-1', skipped: true },
      { caption: { en: 'Now roomId changes. React runs CLEANUP for the old value first.', hi: 'Ab roomId badla. React pehle purani value ka CLEANUP chalata hai.' }, phase: 'update', running: false, cleanup: true, deps: 'room-2' },
      { caption: { en: 'Then the effect runs again with the new roomId.', hi: 'Phir effect naye roomId ke saath dobara chalta hai.' }, phase: 'update', running: true, cleanup: false, deps: 'room-2' },
      { caption: { en: 'On unmount, cleanup runs one last time. Forget it and you have a leak.', hi: 'Unmount pe cleanup aakhri baar chalta hai. Bhool gaye to leak.' }, phase: 'unmount', running: false, cleanup: true, deps: 'room-2' },
    ],
  },

  /* Several setState calls, one render. */
  'state-batching': {
    title: { en: 'Automatic batching', hi: 'Automatic batching' },
    code: `function handleClick() {
  setCount(c => c + 1);
  setFlag(true);
  setName('Asha');
  // How many renders? ONE.
}`,
    kind: 'batching',
    steps: [
      { caption: { en: 'Click. Three setState calls are about to run.', hi: 'Click. Teen setState calls chalne waale hain.' }, queued: [], renders: 0, note: null },
      { caption: { en: 'setCount is queued — React does not render yet.', hi: 'setCount queue mein — React abhi render nahi karta.' }, queued: ['count'], renders: 0, note: null },
      { caption: { en: 'setFlag joins the same queue.', hi: 'setFlag usi queue mein aa gaya.' }, queued: ['count', 'flag'], renders: 0, note: null },
      { caption: { en: 'setName too. Still zero renders.', hi: 'setName bhi. Abhi bhi zero renders.' }, queued: ['count', 'flag', 'name'], renders: 0, note: null },
      { caption: { en: 'The handler finishes — React flushes all three in ONE render.', hi: 'Handler khatam — React teeno ko EK render mein flush karta hai.' }, queued: [], renders: 1, note: 'one render, not three' },
      { caption: { en: 'This is why reading state right after setting it gives the OLD value.', hi: 'Isiliye set karne ke turant baad state padhne pe PURANI value milti hai.' }, queued: [], renders: 1, note: 'count is still stale here' },
      { caption: { en: 'React 18 batches inside promises and timeouts too — React 17 did not.', hi: 'React 18 promises aur timeouts mein bhi batch karta hai — React 17 nahi karta tha.' }, queued: [], renders: 1, note: null },
    ],
  },
};

export const ANIMATION_KEYS = Object.keys(SCRIPTS);

/* ── Small shared pieces ────────────────────────────────────── */

const TONE = {
  idle: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  new: 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30',
  active: 'bg-indigo-50 text-indigo-700 border-indigo-300 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
};

function Panel({ label, children, accent = 'slate' }) {
  const ring = {
    slate: 'border-slate-200 dark:border-slate-700',
    indigo: 'border-indigo-200 dark:border-indigo-800',
    amber: 'border-amber-200 dark:border-amber-800',
    emerald: 'border-emerald-200 dark:border-emerald-800',
  }[accent];
  return (
    <div className={`rounded-lg border ${ring} bg-white/60 p-2 dark:bg-slate-900/40`}>
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="flex flex-col-reverse gap-1">{children}</div>
    </div>
  );
}

function Chip({ children, tone = 'idle', className = '' }) {
  return (
    <div
      className={`rounded-md border px-2 py-1 text-center font-mono text-[11px] transition-all duration-300 ${TONE[tone]} ${className}`}
    >
      {children}
    </div>
  );
}

function Empty({ children = '—' }) {
  return <div className="py-1 text-center text-[11px] text-slate-300 dark:text-slate-600">{children}</div>;
}

/* ── Per-kind renderers ─────────────────────────────────────── */

function StackView({ s }) {
  return (
    <div className="mx-auto max-w-[240px]">
      <Panel label="Call stack" accent="indigo">
        {s.stack.length === 0 ? <Empty>empty</Empty> : s.stack.map((f, i) => <Chip key={i} tone={f.tone}>{f.label}</Chip>)}
      </Panel>
    </div>
  );
}

function LoopView({ s }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Panel label="Call stack" accent="indigo">
          {s.stack.length === 0 ? <Empty>empty</Empty> : s.stack.map((f, i) => <Chip key={i} tone="new">{f}</Chip>)}
        </Panel>
        <Panel label="Browser APIs" accent="amber">
          {s.web.length === 0 ? <Empty /> : s.web.map((f, i) => <Chip key={i} tone="active">{f}</Chip>)}
        </Panel>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Panel label="Microtasks (first)" accent="emerald">
          {s.micro.length === 0 ? <Empty /> : s.micro.map((f, i) => <Chip key={i} tone="active">{f}</Chip>)}
        </Panel>
        <Panel label="Macrotasks (after)">
          {s.macro.length === 0 ? <Empty /> : s.macro.map((f, i) => <Chip key={i}>{f}</Chip>)}
        </Panel>
      </div>
      <div className="rounded-lg bg-slate-900 px-3 py-2 font-mono text-[11px] text-emerald-400">
        <span className="text-slate-500">output › </span>{s.out || ' '}
      </div>
    </div>
  );
}

function PhasesView({ s }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
        <span className={`rounded px-2 py-1 ${s.phase === 'scan' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>1 · memory</span>
        <span className={`rounded px-2 py-1 ${s.phase === 'run' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>2 · execute</span>
      </div>
      <Panel label="Scope memory" accent="indigo">
        {s.mem.length === 0 ? <Empty>nothing yet</Empty> : s.mem.map((v) => (
          <div
            key={v.n}
            className={`flex items-center justify-between rounded-md border px-2 py-1 font-mono text-[11px] transition-all duration-300 ${
              s.read === v.n && s.error
                ? 'border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300'
                : s.read === v.n
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300'
                  : TONE.idle
            }`}
          >
            <span>{v.n}</span>
            <span className={v.ok ? '' : 'text-red-500'}>{v.v}</span>
          </div>
        ))}
      </Panel>
      {s.error && (
        <p className="rounded-md bg-red-50 px-2 py-1.5 font-mono text-[11px] text-red-700 dark:bg-red-950/40 dark:text-red-300">
          ReferenceError: Cannot access &apos;b&apos; before initialization
        </p>
      )}
    </div>
  );
}

function ScopesView({ s }) {
  return (
    <div className="space-y-2">
      <div
        className={`rounded-lg border-2 p-2.5 transition-all duration-500 ${
          s.outer.closed
            ? 'border-dashed border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
            : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50'
        }`}
      >
        <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          counter() scope
          {s.outer.done && <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[9px] normal-case text-slate-600 dark:bg-slate-700 dark:text-slate-300">returned</span>}
          {s.outer.closed && <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-[9px] normal-case text-white">kept alive</span>}
        </p>
        <Chip tone={s.outer.closed ? 'new' : 'idle'}>count = {s.outer.count}</Chip>
        {s.inner && (
          <div className="mt-2 rounded-md border border-indigo-300 bg-white px-2 py-1.5 dark:border-indigo-800 dark:bg-slate-900">
            <p className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300">() =&gt; ++count</p>
            <p className="mt-0.5 text-[10px] text-slate-400">still points at count ↑</p>
          </div>
        )}
      </div>
      <div className="rounded-lg bg-slate-900 px-3 py-2 font-mono text-[11px] text-emerald-400">
        <span className="text-slate-500">output › </span>{s.out || ' '}
      </div>
    </div>
  );
}

function ChainView({ s }) {
  const links = [
    { name: 'dog', props: ['name'] },
    { name: 'Object.prototype', props: ['toString', 'hasOwnProperty'] },
    { name: 'null', props: [] },
  ];
  return (
    <div className="space-y-1.5">
      {s.look && (
        <p className="text-center font-mono text-[11px] text-slate-500">
          looking for <span className="font-bold text-indigo-600 dark:text-indigo-400">{s.look}</span>
        </p>
      )}
      {links.map((l, i) => {
        const isFound = s.found === i;
        const isSearching = s.at === i || (s.look && s.found === null && i === 0);
        return (
          <div key={l.name}>
            <div
              className={`rounded-lg border px-2.5 py-2 transition-all duration-300 ${
                isFound
                  ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40'
                  : isSearching
                    ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950/40'
                    : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              <p className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-200">{l.name}</p>
              {l.props.length > 0 && (
                <p className="mt-0.5 font-mono text-[10px] text-slate-400">{l.props.join(' · ')}</p>
              )}
              {isFound && !s.undef && <p className="mt-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">✓ found here</p>}
              {isFound && s.undef && <p className="mt-1 text-[10px] font-semibold text-slate-500">chain ends → undefined</p>}
            </div>
            {i < links.length - 1 && <p className="py-0.5 text-center text-[11px] text-slate-300">↓ not here, look up</p>}
          </div>
        );
      })}
    </div>
  );
}

function StatesView({ s }) {
  const states = [
    { k: 'pending', label: 'pending', c: 'amber' },
    { k: 'fulfilled', label: 'fulfilled', c: 'emerald' },
    { k: 'rejected', label: 'rejected', c: 'red' },
  ];
  const on = {
    amber: 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
    emerald: 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    red: 'border-red-400 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300',
  };
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-1.5">
        {states.map((st) => (
          <div
            key={st.k}
            className={`rounded-lg border px-2 py-2 text-center text-[11px] font-semibold transition-all duration-300 ${
              s.state === st.k ? on[st.c] : 'border-slate-200 bg-white text-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600'
            }`}
          >
            {st.label}
            {s.state === st.k && s.locked && <span className="ml-1">🔒</span>}
          </div>
        ))}
      </div>
      {s.registered && (
        <div className={`rounded-md border px-2 py-1.5 font-mono text-[11px] transition-all ${s.queued ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : TONE.idle}`}>
          .then(v =&gt; log(v)) {s.queued && <span className="font-sans text-[10px]">→ queued as microtask</span>}
        </div>
      )}
      <div className="rounded-lg bg-slate-900 px-3 py-2 font-mono text-[11px] text-emerald-400">
        <span className="text-slate-500">output › </span>{s.out || ' '}
      </div>
    </div>
  );
}

function ThisView({ s }) {
  const rows = [
    { k: 'method', call: 'user.greet()', val: 'user', note: 'left of the dot' },
    { k: 'plain', call: 'const g = user.greet; g()', val: 'undefined', note: 'no dot, strict mode' },
    { k: 'explicit', call: 'g.call(user)', val: 'user', note: 'you chose it' },
    { k: 'new', call: 'new Person()', val: 'the new object', note: 'new binds it' },
    { k: 'arrow', call: 'user.arrow()', val: 'outer scope', note: 'no own this' },
  ];
  return (
    <div className="space-y-1.5">
      {rows.map((r) => (
        <div
          key={r.k}
          className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-lg border px-2.5 py-1.5 transition-all duration-300 ${
            s.mode === r.k
              ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950/40'
              : 'border-slate-200 bg-white opacity-50 dark:border-slate-700 dark:bg-slate-900'
          }`}
        >
          <span className="font-mono text-[11px] text-slate-700 dark:text-slate-200">{r.call}</span>
          <span className="text-[11px] text-slate-300">→</span>
          <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{r.val}</span>
          {s.mode === r.k && <span className="ml-auto text-[10px] text-slate-400">{r.note}</span>}
        </div>
      ))}
    </div>
  );
}

function CoercionView({ s }) {
  const strict = s.step === 'strict';
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-2">
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{s.left}</p>
          <p className="text-[10px] text-slate-400">{s.lt}</p>
        </div>
        <span className="font-mono text-sm font-bold text-indigo-600">{strict ? '===' : '=='}</span>
        <div
          className={`rounded-lg border px-3 py-2 text-center transition-all duration-500 ${
            s.step === 'convert' ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950/40' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
          }`}
        >
          <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100">{s.right}</p>
          <p className="text-[10px] text-slate-400">{s.rt}</p>
        </div>
      </div>
      {s.step === 'convert' && (
        <p className="text-center text-[11px] text-indigo-600 dark:text-indigo-400">↑ string converted to number</p>
      )}
      {s.result !== undefined && (
        <p
          className={`rounded-lg py-1.5 text-center font-mono text-[12px] font-bold ${
            s.result ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
          }`}
        >
          {String(s.result)}
        </p>
      )}
    </div>
  );
}

/* ── Node-specific renderers ────────────────────────────────── */

const NODE_PHASES = ['timers', 'pending', 'idle/prepare', 'poll', 'check', 'close'];

function NodeLoopView({ s }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
        {NODE_PHASES.map((p, i) => (
          <div
            key={p}
            className={`rounded-md border px-1.5 py-1.5 text-center text-[10px] font-semibold transition-all duration-300 ${
              s.phase === i
                ? 'border-indigo-500 bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600'
            }`}
          >
            <div className="text-[9px] opacity-70">{i + 1}</div>
            {p}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Panel label="process.nextTick (first)" accent="emerald">
          {s.tick.length === 0 ? <Empty /> : s.tick.map((x, i) => <Chip key={i} tone="new">{x}</Chip>)}
        </Panel>
        <Panel label="Promise microtasks" accent="indigo">
          {s.micro.length === 0 ? <Empty /> : s.micro.map((x, i) => <Chip key={i} tone="active">{x}</Chip>)}
        </Panel>
      </div>

      <div className="rounded-lg bg-slate-900 px-3 py-2 font-mono text-[11px] text-emerald-400">
        <span className="text-slate-500">output › </span>{s.out || ' '}
      </div>
    </div>
  );
}

function ThreadsView({ s }) {
  const mainTone = {
    idle: 'border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900',
    free: 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    blocked: 'border-red-400 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950/40 dark:text-red-300',
    callback: 'border-indigo-400 bg-indigo-50 text-indigo-700 dark:border-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
  }[s.main];

  return (
    <div className="space-y-2">
      <div className={`rounded-lg border px-3 py-2 text-center transition-all duration-300 ${mainTone}`}>
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Main thread</p>
        <p className="mt-0.5 font-mono text-[12px] font-semibold">
          {s.main === 'blocked' ? '🔒 readFileSync — stuck' : s.main === 'callback' ? 'running callback' : s.main === 'free' ? '✓ free for other work' : 'idle'}
        </p>
        {s.note && <p className="mt-0.5 text-[10px] opacity-70">{s.note}</p>}
      </div>

      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">libuv thread pool (4)</p>
        <div className="grid grid-cols-4 gap-1.5">
          {s.pool.map((w, i) => (
            <div
              key={i}
              className={`rounded-md border px-1 py-2 text-center text-[10px] transition-all duration-300 ${
                w
                  ? 'border-amber-400 bg-amber-50 font-semibold text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                  : 'border-slate-200 bg-white text-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600'
              }`}
            >
              {w || 'idle'}
            </div>
          ))}
        </div>
      </div>

      <Panel label="Waiting requests">
        {s.queue.length === 0 ? <Empty>none waiting</Empty> : s.queue.map((q, i) => <Chip key={i} tone="idle">{q}</Chip>)}
      </Panel>
    </div>
  );
}

function StreamView({ s }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <div className="flex-none rounded-lg border border-indigo-300 bg-indigo-50 px-2.5 py-2 text-center dark:border-indigo-800 dark:bg-indigo-950/40">
          <p className="text-[9px] font-bold uppercase tracking-wider text-indigo-500">source</p>
          <p className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300">file</p>
        </div>

        <div className="flex flex-1 items-center justify-center gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-sm transition-all duration-300 ${
                i < s.chunks ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div
          className={`flex-none rounded-lg border px-2.5 py-2 text-center transition-all duration-300 ${
            s.slow
              ? 'border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/40'
              : 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40'
          }`}
        >
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">dest</p>
          <p className="font-mono text-[11px] text-slate-700 dark:text-slate-200">{s.slow ? '🐢 slow' : '✓ ok'}</p>
        </div>
      </div>

      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">internal buffer</span>
          {s.note && (
            <span
              className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                s.note === 'paused' || s.note === 'buffer full'
                  ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              }`}
            >
              {s.note}
            </span>
          )}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-5 flex-1 rounded transition-all duration-300 ${
                i < s.buffer
                  ? s.buffer >= 5
                    ? 'bg-red-500'
                    : 'bg-indigo-500'
                  : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
        <p className="mt-0.5 text-right text-[9px] text-slate-400">highWaterMark ↑</p>
      </div>
    </div>
  );
}

function ClusterView({ s }) {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-center dark:border-indigo-800 dark:bg-indigo-950/40">
        <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">primary process</p>
        <p className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300">
          {s.primaryOnly ? 'using 1 core only' : 'distributing requests'}
        </p>
      </div>

      {!s.primaryOnly && <p className="text-center text-[11px] text-slate-300">↓ fork</p>}

      <div className="grid grid-cols-4 gap-1.5">
        {(s.primaryOnly ? [null, null, null, null] : s.workers).map((w, i) => (
          <div
            key={i}
            className={`rounded-md border px-1 py-2 text-center transition-all duration-300 ${
              s.dead === i
                ? 'border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/40'
                : w
                  ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40'
                  : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
            }`}
          >
            <p className="font-mono text-[10px] font-semibold text-slate-700 dark:text-slate-200">
              {s.dead === i ? '✗ dead' : w ? 'w' + w : 'core ' + (i + 1)}
            </p>
            {w && s.dead !== i && (
              <div className="mt-1 flex justify-center gap-0.5">
                {Array.from({ length: 3 }).map((_, n) => (
                  <span
                    key={n}
                    className={`h-1 w-1 rounded-full ${n < s.load[i] ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EmitterView({ s }) {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-center dark:border-indigo-800 dark:bg-indigo-950/40">
        <p className="font-mono text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
          emit(&apos;order&apos;, 42)
        </p>
      </div>

      <Panel label="listeners for 'order'" accent="indigo">
        {s.listeners.length === 0 ? (
          <Empty>none registered</Empty>
        ) : (
          s.listeners.map((l, i) => (
            <div
              key={l}
              className={`rounded-md border px-2 py-1.5 font-mono text-[11px] transition-all duration-300 ${
                s.firing === i
                  ? 'border-emerald-400 bg-emerald-50 font-semibold text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : TONE.idle
              }`}
            >
              {i + 1}. {l} handler {s.firing === i && <span className="font-sans text-[10px]">← running</span>}
            </div>
          ))
        )}
      </Panel>

      <div className="rounded-lg bg-slate-900 px-3 py-2 font-mono text-[11px] text-emerald-400">
        <span className="text-slate-500">output › </span>{s.out || ' '}
      </div>
    </div>
  );
}

/* ── React-specific renderers ───────────────────────────────── */

const RENDER_STAGES = ['trigger', 'render', 'reconcile', 'commit', 'effects'];

function RenderFlowView({ s }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-5 gap-1">
        {RENDER_STAGES.map((st, i) => (
          <div key={st}>
            <div
              className={`rounded-md border px-1 py-2 text-center text-[10px] font-semibold capitalize transition-all duration-300 ${
                s.stage === i
                  ? 'border-indigo-500 bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : s.stage > i
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600'
              }`}
            >
              {st}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="font-mono text-[11px] text-slate-600 dark:text-slate-300">
          {s.note || 'idle'}
        </p>
      </div>
      <p className="text-center text-[10px] text-slate-400">
        render = call your function · commit = touch the DOM
      </p>
    </div>
  );
}

function KeysView({ s }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span
          className={`rounded px-2 py-0.5 text-[10px] font-bold ${
            s.mode === 'index'
              ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
          }`}
        >
          key = {s.mode === 'index' ? 'index' : 'item.id'}
        </span>
        {s.bad && (
          <span className="text-[10px] font-semibold text-red-600 dark:text-red-400">state landed on the wrong row</span>
        )}
      </div>

      {s.rows.map((r) => (
        <div
          key={r.id}
          className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 transition-all duration-300 ${
            s.bad && r.checked
              ? 'border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/40'
              : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
          }`}
        >
          <span
            className={`grid h-4 w-4 flex-none place-items-center rounded border text-[10px] ${
              r.checked
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : 'border-slate-300 dark:border-slate-600'
            }`}
          >
            {r.checked ? '✓' : ''}
          </span>
          <span className="text-[11.5px] text-slate-700 dark:text-slate-200">{r.name}</span>
          <span className="ml-auto font-mono text-[10px] text-slate-400">key={String(r.k)}</span>
        </div>
      ))}
    </div>
  );
}

function HooksView({ s }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        React&apos;s internal hook array
      </p>
      {s.slots.length === 0 ? (
        <Empty>empty</Empty>
      ) : (
        s.slots.map((slot, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 transition-all duration-300 ${
              s.err && i === 0
                ? 'border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/40'
                : s.reading === i
                  ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950/40'
                  : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
            }`}
          >
            <span className="font-mono text-[10px] text-slate-400">[{i}]</span>
            <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-200">{slot.h}</span>
            <span className="ml-auto font-mono text-[10.5px] text-indigo-600 dark:text-indigo-400">{slot.v}</span>
          </div>
        ))
      )}
      {s.err && (
        <p className="rounded-md bg-red-50 px-2 py-1.5 text-[10.5px] text-red-700 dark:bg-red-950/40 dark:text-red-300">
          slots shifted — every hook now reads the wrong state
        </p>
      )}
    </div>
  );
}

function EffectView({ s }) {
  const phases = ['mount', 'update', 'unmount'];
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-1.5">
        {phases.map((p) => (
          <div
            key={p}
            className={`rounded-md border px-2 py-1.5 text-center text-[10px] font-semibold capitalize transition-all duration-300 ${
              s.phase === p
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : 'border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600'
            }`}
          >
            {p}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">deps</span>
        <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10.5px] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          [{s.deps}]
        </span>
        {s.skipped && <span className="text-[10px] font-semibold text-slate-400">unchanged → effect skipped</span>}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div
          className={`rounded-lg border px-2 py-2 text-center transition-all duration-300 ${
            s.running
              ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40'
              : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
          }`}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">effect</p>
          <p className="font-mono text-[11px] text-slate-700 dark:text-slate-200">
            {s.running ? '▶ interval running' : 'stopped'}
          </p>
        </div>
        <div
          className={`rounded-lg border px-2 py-2 text-center transition-all duration-300 ${
            s.cleanup
              ? 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40'
              : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
          }`}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">cleanup</p>
          <p className="font-mono text-[11px] text-slate-700 dark:text-slate-200">
            {s.cleanup ? '✓ clearInterval' : '—'}
          </p>
        </div>
      </div>
    </div>
  );
}

function BatchingView({ s }) {
  return (
    <div className="space-y-2">
      <Panel label="queued updates" accent="indigo">
        {s.queued.length === 0 ? <Empty>flushed</Empty> : s.queued.map((q, i) => <Chip key={i} tone="new">set{q}</Chip>)}
      </Panel>

      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">renders</span>
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`h-3 w-6 rounded transition-all duration-300 ${
                i < s.renders ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
        <span className="ml-auto font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
          {s.renders}
        </span>
      </div>

      {s.note && (
        <p className="rounded-md bg-indigo-50 px-2 py-1.5 text-center text-[10.5px] text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
          {s.note}
        </p>
      )}
    </div>
  );
}

const VIEWS = {
  stack: StackView,
  renderflow: RenderFlowView,
  keys: KeysView,
  hooks: HooksView,
  effect: EffectView,
  batching: BatchingView,
  nodeloop: NodeLoopView,
  threads: ThreadsView,
  stream: StreamView,
  cluster: ClusterView,
  emitter: EmitterView,
  loop: LoopView,
  phases: PhasesView,
  scopes: ScopesView,
  chain: ChainView,
  states: StatesView,
  this: ThisView,
  coercion: CoercionView,
};

/* ── Player ─────────────────────────────────────────────────── */

export default function ConceptAnimation({ type }) {
  const script = SCRIPTS[type];
  const { pick } = useLang();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  const total = script?.steps.length ?? 0;

  useEffect(() => {
    setI(0);
    setPlaying(false);
  }, [type]);

  useEffect(() => {
    if (!playing || total === 0) return undefined;
    timer.current = setTimeout(() => {
      setI((n) => {
        if (n >= total - 1) {
          setPlaying(false);
          return n;
        }
        return n + 1;
      });
    }, 2100);
    return () => clearTimeout(timer.current);
  }, [playing, i, total]);

  if (!script) return null;

  const View = VIEWS[script.kind];
  const step = script.steps[i];

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-800/40">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-200 px-3.5 py-2 dark:border-slate-700">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {pick(script.title.hi, script.title.en)}
        </span>
        <span className="ml-auto font-mono text-[10px] text-slate-400">
          {i + 1} / {total}
        </span>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto border-b border-slate-200 bg-slate-900 px-3.5 py-2.5 font-mono text-[11px] leading-relaxed text-slate-200 dark:border-slate-700">
        <code>{script.code}</code>
      </pre>

      {/* Stage */}
      <div className="px-3.5 py-3">
        <View s={step} />
      </div>

      {/* Caption */}
      <p className="border-t border-slate-200 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-slate-700 dark:border-slate-700 dark:text-slate-300">
        {pick(step.caption.hi, step.caption.en)}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2 border-t border-slate-200 px-3.5 py-2 dark:border-slate-700">
        <button
          type="button"
          onClick={() => {
            if (i >= total - 1) setI(0);
            setPlaying((p) => !p);
          }}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-indigo-700"
        >
          {playing ? pick('Rokо', 'Pause') : i >= total - 1 ? pick('Phir se', 'Replay') : pick('Chalao', 'Play')}
        </button>
        <button
          type="button"
          onClick={() => { setPlaying(false); setI((n) => Math.max(0, n - 1)); }}
          disabled={i === 0}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 dark:border-slate-600 dark:text-slate-300"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => { setPlaying(false); setI((n) => Math.min(total - 1, n + 1)); }}
          disabled={i >= total - 1}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 dark:border-slate-600 dark:text-slate-300"
        >
          →
        </button>

        {/* Step dots */}
        <div className="ml-auto flex gap-1">
          {script.steps.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Step ${n + 1}`}
              onClick={() => { setPlaying(false); setI(n); }}
              className={`h-1.5 rounded-full transition-all ${
                n === i ? 'w-5 bg-indigo-600' : 'w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
