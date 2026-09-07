# AI platform — architecture and setup

This describes the AI layer added on top of the existing Learnverse app. Nothing
in the original content model (Course → Topic → Concept → InterviewQuestion),
auth, XP or leaderboard was replaced; the AI layer sits alongside it and reads
the same progress data.

## Setup

Two things, both optional in the sense that the app runs without them — but
without the first, users cannot connect a key and everything runs in demo mode.

```env
# Required to store user-supplied provider keys. 32 bytes, hex.
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
AI_ENCRYPTION_KEY=…

# Optional server-wide fallback keys (the deployment pays for AI).
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GEMINI_API_KEY=
```

## How a request flows

```
UI card (AIQuickActions)
  → PromptRunner collects the template's declared inputs
  → POST /api/ai/run { templateId, inputs }
  → runTemplate()            src/lib/ai/run.js
      ├ template.build(inputs, ctx)      builds the full prompt
      ├ resolveProvider(userId)          user key → env key → demo
      ├ provider.complete()              one interface, any provider
      ├ parseJSONLoose()                 tolerant JSON extraction
      └ AIResult.create()                every run is stored
  → AIResultView picks a view by template.resultView
  → ResultActions: save / copy / export / regenerate / follow-up / make a post
```

## Provider abstraction

`src/lib/ai/providers/` — every provider extends `AIProvider` and implements one
method, `complete({ system, prompt, json, maxTokens, temperature })`. Nothing
outside this directory knows which provider is in use.

| File | Provider |
|---|---|
| `anthropic.js` | Claude |
| `openai.js` | OpenAI |
| `gemini.js` | Google Gemini |
| `demo.js` | No network — replays the template's own sample data |

Adding one: write the class, add it to `PROVIDER_CLASSES` in
`src/lib/ai/registry.js`. The settings page, the run route and the resolver pick
it up with no further changes.

### Provider resolution order

1. The user's own connected, enabled key (default first) — `AIProviderConnection`
2. A server-wide key from env
3. Demo mode

Demo mode is a real answer, not an error state: the user gets a fully rendered
result labelled **Demo data** and a link to connect a provider.

## Key security

- Keys are encrypted with AES-256-GCM (`src/lib/ai/crypto.js`) before storage.
- The ciphertext field is `select: false`, so it is never loaded by accident.
- No API response ever contains a key — only a masked hint like `sk-…4f2a`.
- Keys are used server-side only. The browser never sees one after submission.
- Deleting a connection deletes the stored ciphertext.

## Prompt templates

`src/lib/ai/templates/` — one file per prompt. A template declares its inputs,
builds its prompt, describes its output shape, and ships demo data:

```js
{
  id, title, short, description, category, icon, cta,
  version, status, outputFormat, resultView,
  inputs: [{ name, label, type, options, required, default }],
  system, build(inputs, ctx), demo(inputs, ctx),
  needsLearningContext?: true,
}
```

Adding a quick action = add a file, list it in `templates/index.js`. A card
appears on the dashboard and `/ai`, the form renders itself from `inputs`, and
the result renders through the view named by `resultView`. No UI code needed.

Prompt text stays on the server: `publicTemplate()` strips `build`/`system`
before the registry is sent to the browser.

### Learning context

Templates with `needsLearningContext` receive `ctx.learning` — the user's real
recorded XP, streak, completed concepts, per-course progress and activity by
weekday (`src/lib/ai/context.js`). The prompts instruct the model to ground every
claim in those fields and to say when the data is too thin, so an "insight" is
never invented out of nothing.

## Labelling

`SourceBadge` marks every AI surface as one of: **AI analysis**, **Demo data**,
**Historical snapshot**, **Live data**. Results store the same value in
`AIResult.source`, so the label survives a reload.

## Data models added

| Model | Holds |
|---|---|
| `AIProviderConnection` | one row per (user, provider); encrypted key, model, default flag, test status |
| `AIResult` | every run: template, inputs, full prompt, provider, model, source, parsed data, raw text, tokens, duration, saved flag |

## Routes added

| Route | What |
|---|---|
| `GET /api/ai/templates` | public template catalogue (no prompt text) |
| `POST /api/ai/run` | run a template, store and return the result |
| `GET/POST/PATCH/DELETE /api/ai/providers` | manage the caller's connections |
| `POST /api/ai/providers/test` | smallest possible live call, records status |
| `GET /api/ai/results` | the caller's runs (`?saved=1`, `?templateId=`) |
| `GET/PATCH/DELETE /api/ai/results/[id]` | one result; PATCH toggles `saved` |
| `/ai` | AI Tools hub — quick actions plus your results |
| `/settings/ai` | AI connections |

---

# Prompt Library (phase 4)

A browsable library of prompts that people can run, copy, save, rate and report,
plus a submission path for community prompts.

## Setup

```bash
npm run seed:prompts
```

Upserts the 12 official starter prompts by slug. Safe to re-run — it updates the
official set and never touches community submissions, ratings or counters.

## Variables

Library prompts are plain text with `{{placeholder}}` markers
(`src/lib/prompts/variables.js`). The run form is generated from them, so any
submitted prompt becomes runnable with no bespoke UI. Matching is
case-insensitive, and an unfilled placeholder stays as written rather than
becoming the string `undefined`.

## Running a library prompt

`runLibraryPrompt()` goes through the same provider resolution, storage and
labelling as the built-in templates. Library output is free text — the author
decides its shape — so results are stored with `outputFormat: 'text'` and
`templateId: "library:<promptId>"`, which keeps library runs and template runs
distinct in the results list and in usage analytics.

`usageCount` increments only on real model runs, never on demo runs, so the
library's popularity signal reflects actual use.

## Moderation gate

Submissions are created with `status: 'pending'` and are **never** publicly
listed. The listing route hard-filters on `status: 'verified'`; the detail route
returns an unverified prompt only to its author or an admin. The status pipeline
(`pending → ai_reviewed → verified | rejected`) is modelled now; the AI
validation and admin review that drive it are phase 5.

## Models added

| Model | Holds |
|---|---|
| `Prompt` | body, category, tags, difficulty, origin, author, review status, usage/save/report counters, rating totals |
| `SavedPrompt` | one row per (user, prompt) |
| `PromptRating` | one rating per user per prompt, so a changed rating adjusts rather than double-counts |
| `PromptReport` | one open report per user per prompt, with reason and detail |

## Routes added

| Route | What |
|---|---|
| `GET /api/prompts` | verified listing; `?q=` `?category=` `?sort=` `?saved=1` `?mine=1` |
| `POST /api/prompts` | submit a prompt into the review queue |
| `GET /api/prompts/[id]` | detail by slug **or** id, with the body |
| `POST /api/prompts/[id]/save` | toggle saved |
| `POST /api/prompts/[id]/rate` | rate 1-5 |
| `POST /api/prompts/[id]/report` | flag for review |
| `POST /api/prompts/[id]/run` | run it through the provider layer |
| `/prompts` | library — search, categories, sort, Library/Saved/My submissions |
| `/prompts/[slug]` | detail, run panel, rating, share, report |
| `/prompts/submit` | submission form with live variable detection |

Note: the dynamic segment is `[id]` for all of these because Next.js allows only
one param name per segment, and the action routes address prompts by id. The
detail route accepts either form.
