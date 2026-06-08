# Phase 2 · Step 1 — AI Content Assist (Admin)

> Status: **Planned** · Priority: ⭐ first · Est: ~2–3 days · Value: 🔥🔥🔥

## 🎯 Goal
Make the admin **"AI Assist" panel** (currently a stub in `ConceptForm`) actually work:
from a concept **title** (+ optional notes), an AI generates a full Learnverse-style
draft — **English + Hinglish explanation, a desi daily-life example, a code example,
key points, and a 2–3 question quiz** — which auto-fills the form. The admin then
edits and approves. Quality control stays with the human; speed goes up ~5x.

## 🤔 Why
- The author writes content with AI help (the user's stated workflow).
- Keeps the moat: AI **drafts**, human **curates** → consistent Hinglish + desi-analogy style.
- Foundation for Step 3 (user submissions moderation) and Step 4 (AI tutor).

## ✅ Scope (what we build)
- [ ] `Generate draft from title` button → fills the whole form
- [ ] `Translate / generate Hinglish` button (English → Hinglish)
- [ ] `Suggest a daily-life analogy` button (desi example)
- [ ] `Generate quiz` button (2–3 MCQs from the explanation)
- [ ] Loading + error states; never overwrite non-empty fields without confirm
- [ ] Cost controls: admin-only, prompt caching, response length cap

### Out of scope (later steps)
- User-facing AI tutor (Step 4), submissions moderation (Step 3)

## 🧱 Data model
No schema change needed. `Concept` already has `aiGenerated: Boolean`.
- Set `aiGenerated = true` when a draft was AI-generated (already supported).

## 🔌 API
New admin-guarded route(s):

```
POST /api/ai/generate-concept     # body: { title, courseTitle?, difficulty?, notes? }
  -> { explanation:{english,hinglish}, dailyLifeExample, codeExample, keyPoints[], quiz[] }

POST /api/ai/translate            # body: { text } -> { hinglish }
POST /api/ai/analogy              # body: { title, explanation } -> { dailyLifeExample }
POST /api/ai/quiz                 # body: { explanation } -> { quiz:[{question,options,correctIndex,explanation}] }
```

- Guard with `requireAdmin()` (already in `src/lib/guards.js`).
- Validate/parse the model's JSON; return 400 on malformed output (retry once).

## 🤖 AI integration
- SDK: `@anthropic-ai/sdk` (or `openai`). Env: `ANTHROPIC_API_KEY` (set in Vercel too).
- Use a strict **JSON output** instruction + a system prompt encoding Learnverse style:
  - English explanation: simple, 3–5 sentences.
  - Hinglish: natural Hindi+English mix (Latin script only — no Devanagari).
  - `dailyLifeExample`: one relatable Indian daily-life analogy (dabbawala / tiffin / chai style).
  - `codeExample`: minimal, correct, language matches the course.
  - `quiz`: 2–3 MCQs with `correctIndex` + short `explanation`.
- **Prompt caching** for the static system prompt (cost + latency).
- Cap `max_tokens`; reject overly long outputs.

## 🖥️ UI (ConceptForm)
- Replace the disabled stub button in the AI-Assist `<aside>` with real actions.
- Each button: spinner while loading, then merge result into form state.
- "Generate draft" warns if fields already filled (avoid clobbering edits).
- Show a small "✨ AI draft — review before publishing" badge.

## 🔐 Security / cost
- Admin-only routes (403 otherwise).
- Per-request token cap; optional simple rate limit.
- Keep the API key server-side only (never `NEXT_PUBLIC_`).

## 🧪 Acceptance criteria
- From a title, one click fills EN+Hinglish+example+code+keyPoints+quiz with valid shapes.
- Generated Hinglish contains no Devanagari characters.
- Non-admins get 403 from the AI routes.
- Malformed AI output never crashes the form (graceful error).

## 📋 Task checklist
1. Add `@anthropic-ai/sdk` + `ANTHROPIC_API_KEY` (env.example + Vercel).
2. `src/lib/ai.js` — client + shared system prompt + JSON parse helper.
3. `src/app/api/ai/generate-concept/route.js` (+ translate/analogy/quiz).
4. Wire buttons in `src/components/admin/ConceptForm.jsx`.
5. Test: generate → edit → publish → verify on concept page.
