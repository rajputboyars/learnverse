# Phase 2 · Step 2 — In-Browser Code Playground

> Status: **Planned** · Est: ~3–4 days · Value: 🔥🔥🔥

## 🎯 Goal
Let learners **run code in the browser** right on the concept page — no external tools.
Edit the concept's code example and hit **Run** to see output (JS) or a live preview
(HTML/CSS). Optionally, a concept can have a **code challenge**: write code that passes
hidden tests to earn XP. This delivers the chat's "engaging, not boring" goal.

## 🤔 Why
- Active learning > passive reading → better retention.
- Differentiator vs static docs; pairs with quizzes + XP.
- Reuses the existing engagement system (XP, progress).

## ✅ Scope (what we build)
- [ ] Editable code block on concept pages with a **Run** button
- [ ] **JavaScript**: execute safely, capture `console.log` + errors → output panel
- [ ] **HTML/CSS**: live preview in a sandboxed iframe
- [ ] **Reset** button (restore original example)
- [ ] Optional **code challenge** mode: starter code + hidden tests → pass = XP
- [ ] Mobile-friendly editor

### Out of scope (later)
- Server-side execution for Node/Python (security + cost) — browser-only for now.

## 🧱 Data model
Add an optional field to `Concept` (`src/models/Concept.js`):

```js
codeChallenge: {
  enabled:   { type: Boolean, default: false },
  starter:   { type: String, default: '' },   // pre-filled editor code
  solution:  { type: String, default: '' },   // reference (not sent to client)
  tests:     { type: String, default: '' },   // assertions run against user code
  xp:        { type: Number, default: 20 },
}
```
- Normal concepts: just make the existing `codeExample` runnable (no schema change).
- Challenges: only `enabled` ones show the challenge UI. **Never send `solution` to the client.**

## 🔌 API
- Running normal code: **client-side only**, no API call.
- Code challenge grading: do it **server-side** to protect tests/solution and award XP:
```
POST /api/playground/submit   # body: { conceptId, code }
  -> { passed, results:[{name, pass, message}], reward? }   # reuses awardXP()
```
- Reuse `awardXP(userId, conceptId, 'challenge_passed')` (extend `services/xp.js`).

## 🛠️ Tech approach
- **Editor:** start simple with a styled `<textarea>` (mono font); optionally upgrade to
  CodeMirror (`@uiw/react-codemirror`) for syntax highlighting later.
- **JS execution (safe):** run user code inside a sandboxed `<iframe sandbox="allow-scripts">`
  via `postMessage` (no access to parent DOM, cookies, network by default). Capture
  `console.log`/errors inside the iframe and post results back. Add a timeout to kill infinite loops.
- **HTML/CSS preview:** write the HTML/CSS into a sandboxed iframe `srcdoc`.
- **Alternative (faster to ship):** `@codesandbox/sandpack-react` gives a ready editor +
  runner for JS/React/HTML. Trade-off: bigger bundle. Decide before building.
- **Challenge grading:** ship `tests` as assertions; run them in the sandbox (client) for
  instant feedback, then re-verify server-side on submit before awarding XP (don't trust client).

## 🖥️ UI
- New client component `components/concept/CodePlayground.jsx` (an island).
- Replace/augment `CodeBlock` on concept pages: tabs for **Code** / **Output** / **Preview**.
- Challenge concepts: show task text, starter code, "Run tests", pass/fail checklist, XP toast.
- Guests can run code; XP for challenges prompts login (same pattern as Quiz).

## 🔐 Security
- All user code runs in a **sandboxed iframe** — never `eval` in the main window.
- Execution timeout (e.g. 2s) to stop infinite loops.
- Server re-grades challenges; `solution` never leaves the server.

## 🧪 Acceptance criteria
- A JS `console.log` example runs and shows output without leaving the page.
- An HTML/CSS example renders a live preview.
- Infinite loop (`while(true){}`) is killed by timeout, page stays responsive.
- A challenge: correct code → tests pass → XP awarded once (idempotent); wrong code → fails gracefully.
- Works on mobile.

## 📋 Task checklist
1. Decide: custom sandbox iframe vs Sandpack (note bundle-size trade-off).
2. `components/concept/CodePlayground.jsx` (editor + run + output/preview tabs).
3. Sandboxed runner util (`lib/runner` via iframe + postMessage + timeout).
4. Integrate into `ConceptReader` (replace static CodeBlock when runnable).
5. (Challenges) extend `Concept` schema + `/api/playground/submit` + `awardXP` action.
6. Admin: add code-challenge fields to `ConceptForm`.
7. Test JS/HTML/CSS + a sample challenge end-to-end.
