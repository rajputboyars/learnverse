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

const VIEWS = {
  stack: StackView,
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
