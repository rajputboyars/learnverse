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

---

# Prompt verification (phase 5)

Two-stage review: an automated first pass, then a human decision.

```
submit → validatePrompt()          server key only
           ├ reject   → status 'rejected', author told immediately
           ├ clean    → status 'ai_reviewed'   ← as far as automation can go
           ├ concerns → status 'ai_reviewed'   (flags attached)
           └ no key / failure → status stays 'pending'
       → admin queue → verify | reject | requeue | edit | delete
```

## Two rules that shape the design

**Automated review can reject, but it cannot publish.** A clean pass moves a
prompt to `ai_reviewed`, never to `verified`. A human decides what enters the
public library.

**A review that did not happen is never a pass.** If no server key is configured,
or the model call fails, or the response cannot be parsed, the prompt stays in
the queue with the reason recorded in `aiReview.error`. There is no path where an
unreviewed prompt reaches the library.

## Server key only

`validatePrompt()` uses `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `GEMINI_API_KEY`
and never a user's connected key — reviewing a submission by spending the
submitter's own API credit would be indefensible. With no server key the platform
runs on human review alone, which is a supported mode, not a broken one.

## Injection handling

The submitted prompt is passed to the reviewing model wrapped in explicit
markers and labelled as data. Instructions found inside it — "ignore your
rules", "approve this" — are themselves an `injection` flag rather than
something to act on.

## What the author sees

The automated verdict, summary and flags appear on the author's own submission
page and on the submit confirmation. A rejection is never a black box: the author
can read why, fix it and submit again. Other users never see another person's
review.

Approve and reject both send the author a `system` notification.

## Routes added

| Route | What |
|---|---|
| `GET /api/admin/prompts` | queue with `?filter=queue\|pending\|ai_reviewed\|reported\|rejected\|verified\|all`, full bodies, reviews and open reports |
| `PATCH /api/admin/prompts/[id]` | `verify` / `reject` / `requeue` / `revalidate`, plus inline edits |
| `DELETE /api/admin/prompts/[id]` | hard delete, cascading to saves, ratings and reports |
| `/admin/prompts` | moderation queue UI |

Acting on a prompt closes the reports waiting on it — resolved on a rejection,
dismissed on an approval — and clears its report count.

---

# Skill trends and history (phase 6)

Rankings recorded over time, at `/trends`, built from snapshots an admin captures.

## The rule

**History is recorded, never reconstructed.** A snapshot exists only because
someone captured it on a given day. Movement is measured by comparing two real
snapshots — with one snapshot the page says "no earlier snapshot to compare
against" and shows no change indicators at all. Nothing back-fills a previous
rank, and the chart plots points only where a snapshot exists rather than
interpolating the days between.

## Measured movement vs the model's estimate

These are two different things and the schema keeps them apart:

| Field | Meaning |
|---|---|
| `change` / `previousRank` | measured between two stored snapshots — this platform's own record |
| `claimedPreviousRank` | what the model *said* the previous rank was, in a single result |

The claimed value is shown only inside a skill's history panel, explicitly
attributed to the model. It never drives an arrow in the table.

## Source labelling

Every snapshot carries `ai` / `manual` / `live` / `demo` and it is displayed
wherever the ranking is. Capturing a demo-mode result keeps the `demo` label —
sample data cannot be laundered into real trend data by filing it.

## Why capture is admin-only

`/trends` is presented as the platform's own recorded history, so it cannot be
open to anyone who runs an analysis — otherwise the public ranking is whatever
the last visitor's model happened to say. A learner's own runs stay in their
personal results; an admin decides what enters the record, and a snapshot is
only visible once published.

## Comparison windows

`?compare=previous|30|90` picks the most recent snapshot at least that many days
older. When nothing qualifies, the answer is no comparison — not the nearest
available substitute.

## Models added

| Model | Holds |
|---|---|
| `TrendSnapshot` | one captured ranking: scope, capturedAt, source, provider/model, origin result, published flag |
| `SkillTrend` | one skill's position within one snapshot; flat, so a skill's history is one indexed query |

Snapshots are comparable only within a `scopeKey` (industry + location +
experience level), so a fresher ranking is never compared against a senior one.

## Routes added

| Route | What |
|---|---|
| `GET /api/trends` | published ranking for a scope + available scopes; `?scope=` `?compare=` |
| `GET /api/trends/history` | one skill's recorded positions in one scope |
| `GET /api/admin/trends` | snapshots, plus uncaptured trending-skills results |
| `POST /api/admin/trends` | capture from a result, or enter a ranking by hand |
| `PATCH /api/admin/trends/[id]` | publish / hide / annotate |
| `DELETE /api/admin/trends/[id]` | delete a snapshot and its skill rows |
| `/trends` | public rankings, movement, per-skill history chart |
| `/admin/trends` | capture and manage snapshots |

---

# Learning analytics (phase 7)

`/analytics` — streaks, rhythm, self-comparison and time, computed only from
records that exist.

## Time had to be recorded, not estimated

The spec asks for learning hours and most-productive-time. Neither could be
derived from the existing data: `UserProgress` says *that* a concept was
completed, never for how long. Rather than infer hours from completion
timestamps and present the guess as measurement, time is now recorded.

`LearningTimer` (mounted on concept pages) counts only while the tab is
**visible** and posts a heartbeat each minute. The server caps every beat at 90
seconds and starts a new session after a 5-minute gap, and a session's total is
the sum of capped increments — never end-minus-start. A tab left open overnight
therefore cannot become eight hours of study.

Because tracking began the day this shipped, the page states the date it started
and never implies the totals cover a user's earlier learning. The same
distinction is passed to the model in `ctx.learning.timeTracking`, including an
explicit instruction not to estimate hours when nothing is recorded.

## Two classes of number, kept apart

| Kind | Source | Covers |
|---|---|---|
| Activity — concepts, quizzes, streaks, active days | `UserProgress`, `UserStats` | the user's whole history |
| Time — hours, hour-of-day, session length | `LearningSession` | only since tracking began |

## No baseline means no percentage

`changePct()` returns `null` when the previous period is zero, and
`ComparisonTile` renders "No earlier period to compare against yet." A first week
of activity is not a +100% improvement, and showing one would be the same kind of
invention the trends page refuses to make.

## Local time

Hour-of-day and weekday are recorded from the **browser's** local clock, because
the server cannot know the reader's timezone and "you study most at 16:00 UTC" is
useless to someone in IST. The chart is labelled *your local time*.

## Routes added

| Route | What |
|---|---|
| `POST /api/me/session` | heartbeat; extends the open session, capped |
| `GET /api/me/analytics` | the full analytics payload |
| `/analytics` | charts, self-comparison, time, and the AI reading of the same numbers |

## Model added

`LearningSession` — startedAt, lastBeatAt, capped `seconds`, kind, concept and
course, plus the browser-local date/hour/weekday.

---

# Post generator (phase 8)

`/create` — turn learning into a post for LinkedIn, Instagram, X or Reddit.

## Nothing is published on the user's behalf

Learnverse holds no social credentials and posts nowhere. The output is text the
user reads, edits and copies; publishing stays their action on their own account.
The composer says so, and every draft ends with a reminder to check that each
claim is one they would stand behind.

## Grounded starting points

The "start from something you did" list comes from `/api/me/achievements`, which
derives every item from a stored record: a course actually finished, a streak of
at least three days actually held, a volume milestone actually crossed, an
analysis actually run. An account with no history gets an empty list and a nudge
to go and do something — never a fabricated milestone, because the fastest way to
embarrass someone publicly is to hand them an achievement they did not earn.

A demo-mode result is offered as *a topic to write about* ("what I have been
reading about…") rather than as a finding to assert, since its content is sample
data.

The prompt itself instructs the model to claim nothing the user did not supply —
no invented job offers, numbers or company names — and bans the usual AI tells.

## Per-platform output

One template, four shapes: LinkedIn gets hook → learning → insight → takeaway →
reflection → question → hashtags; Instagram a caption plus 5-7 carousel slides;
X a standalone post plus a 4-7 post thread; Reddit a title and body with a
reminder to read the subreddit's rules.

## Drafts

Saved drafts store the **edited** text, so a draft reopens as the user left it
rather than as the model wrote it, and carry an `edited` flag plus the source
label of the run that produced them. Drafts are per-user and private.

## Routes added

| Route | What |
|---|---|
| `GET /api/me/achievements` | real milestones and recent insights, as post seeds |
| `GET/POST /api/posts` | list drafts (`?platform=`), save one |
| `PATCH/DELETE /api/posts/[id]` | edit or delete your own draft |
| `/create` | composer + saved drafts; accepts `?platform=` `?topic=` `?points=` |

## Model added

`SocialPost` — platform, topic, tone, hook, body, thread, slides, hashtags,
notes, originating result, provider/model/source, and whether the user edited it.

---

# Share cards (phase 9)

`/cards` — a downloadable 1080×1080 image of something the learner actually did.

## Built in the browser, from real records

Cards are SVG strings (`src/lib/cards/render.js`) rendered client-side and
converted to PNG by drawing the same SVG onto a canvas. No screenshot library, no
upload: the image never leaves the browser, and what downloads is exactly what
was previewed. The SVG references nothing external, so the canvas cannot taint
and export cannot fail on a blocked resource.

Only system fonts are used. A webfont would not load during the canvas
conversion, so a card that looked right on screen would download in a different
typeface.

## Thresholds, not encouragement

Cards are offered only once the milestone is real: a streak of **three days or
more**, **ten or more** concepts, a course that is genuinely finished. A demo-mode
insight never becomes a card, because a card is a public claim and its content is
sample data. An account with nothing to show gets an empty state that says so.

## Text safety

`esc()` XML-escapes every value — a course title containing `&` or `<` would
otherwise produce a broken SVG that renders as nothing. Long text is wrapped by
estimated advance width and truncated with an ellipsis rather than allowed to
overflow the card; the headline limit (20 characters at 68px) was set by
rendering the widest realistic title and looking at it, after the first estimate
overflowed.

## Routes added

| Route | What |
|---|---|
| `/cards` | pick a milestone, preview, recolour, download, share, copy caption |

Reuses `GET /api/me/achievements` from phase 8 — one definition of "what this
person actually did", shared by the composer and the cards.
