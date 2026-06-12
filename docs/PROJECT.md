# Learnverse — Project Documentation

> A bilingual (English + Hinglish) learning platform for developers. Concepts are
> explained with daily-life desi examples, runnable code, quizzes, coding challenges,
> XP/streaks, leaderboards, spaced-repetition revision, discussions, and interview
> prep. Reading is open to everyone; earning XP/streaks needs login.

**Stack:** Next.js 16 (App Router) · React 19 · MongoDB (Mongoose 9) · NextAuth/Auth.js v5 · Tailwind v4 · deployed on Vercel.

> ⚠️ **Note for contributors / AI agents:** This repo pins **Next.js 16**, which has
> breaking changes vs. older versions. Before writing framework code, read the relevant
> guide in `node_modules/next/dist/docs/` (see `AGENTS.md`).

---

## 1. What the platform does

| Pillar | Description |
|---|---|
| **Bilingual content** | Every concept has an English and a Hinglish explanation, toggleable in the reader. This is the core USP. |
| **Daily-life examples** | Each concept carries a "desi analogy" block to make ideas stick. |
| **Structured curriculum** | Content is organised as **Course → Topic → Concept**, plus standalone **Interview Questions**. |
| **Engagement loop** | XP, levels (100 XP/level), Duolingo-style daily streaks, badges, weekly + all-time leaderboards. |
| **Active recall** | Embedded quizzes (server-graded), JS coding challenges (browser-run), and spaced-repetition revision (SM-2-lite). |
| **Community** | Per-concept comments, per-course discussion threads, reactions, notifications. |
| **Interview prep** | Browsable/filterable interview questions + a mock-interview mode. |
| **SEO + PWA** | Server-rendered public pages with per-page metadata, sitemap/robots, manifest, offline service worker. |
| **Admin panel** | Manage courses/topics, author bilingual concepts with a quiz builder, manage interview questions. |

---

## 2. Tech stack & key dependencies

From `package.json`:

- **next** `16.2.7` — App Router, route handlers, server components.
- **react** / **react-dom** `19.2.4`.
- **mongoose** `^9.6.3` — MongoDB ODM.
- **next-auth** `^5.0.0-beta.31` (Auth.js v5) — JWT-session credentials auth.
- **bcryptjs** `^3.0.3` — password hashing.
- **tailwindcss** `^4` + `@tailwindcss/postcss` — styling (PostCSS pipeline).

**Scripts:**
```bash
npm run dev     # next dev
npm run build   # next build
npm run start   # next start
npm run seed    # node scripts/seed.mjs  — wipe & reseed all content + admin user
```

---

## 3. Repository layout

```
src/
├── app/
│   ├── layout.js              # root layout: fonts, theme-init script, providers, SW register, global metadata
│   ├── globals.css            # Tailwind v4 + theme tokens
│   ├── manifest.js            # PWA manifest
│   ├── robots.js / sitemap.js # SEO
│   ├── icon.svg / not-found / offline
│   ├── (public)/              # public route group — Navbar + Footer layout
│   │   ├── page.jsx           # landing
│   │   ├── courses/ concepts/ interview-questions/ leaderboard/
│   │   ├── dashboard/ revise/ challenges/ practice/ mock-interview/
│   │   ├── roadmaps/ certificate/ search/ notifications/ u/[id]/   # public profile
│   │   ├── login/ register/
│   │   └── courses/[slug]/discuss/...   # discussion board
│   ├── (admin)/admin/         # admin route group — guarded layout
│   │   ├── dashboard/ courses/ concepts/ interview-questions/
│   └── api/                   # route handlers (see §6)
├── auth.js                    # NextAuth config (Credentials provider, JWT)
├── components/                # Navbar, Footer, concept reader, quiz, playground, admin form, etc.
├── data/roadmaps.js           # static roadmap definitions (no DB)
├── lib/                       # db, guards, challenges, badges, daily, notify, site, slug
├── models/                    # Mongoose schemas (see §5)
└── services/                  # xp.js, streak.js — engagement business logic
scripts/
├── seed.mjs                   # idempotent seeder (wipes content, reinserts)
└── content/*.mjs              # 33 course curricula modules
docs/                          # phase design notes + this file
```

### Route groups
- `(public)` wraps pages in `Navbar` + `Footer` (`src/app/(public)/layout.jsx`).
- `(admin)` wraps the admin panel in a guarded layout. Route-group folders don't appear in the URL.

---

## 4. Data model & content hierarchy

```
Course ──< Topic ──< Concept ──< InterviewQuestion
                         │
   User ── UserStats     ├── Comment / Reaction / Bookmark / Review (per user×concept)
        ── UserProgress ─┘
   Course ──< Discussion (threads + replies)
   User ──< Notification, ChallengeCompletion
```

- A **Concept** belongs to a Topic, and **denormalises `courseId`** for fast "all concepts of a course" queries (a deliberate MongoDB pattern).
- **UserProgress** is the single bridge between content and a user; one doc per `(user, concept)`, tracking `read` / `quizPassed` / `xpEarned`.
- **UserStats** is kept 1:1-but-separate from User so fast-changing XP/streak data lives apart from the rarely-changed profile. It **denormalises `name`/`image`** for cheap leaderboard rendering.

---

## 5. Models reference (`src/models/`)

| Model | Purpose | Notable fields / indexes |
|---|---|---|
| **User** | Account | `email` (unique, lowercase), `passwordHash`, `role: user\|admin` |
| **UserStats** | Engagement counters | `totalXP`, `weeklyXP` (Mon reset), `level`, `currentStreak`, `longestStreak`, `lastActiveDate`, `conceptsCompleted`; indexed on `weeklyXP`/`totalXP` desc |
| **UserProgress** | Content↔user bridge | `read`, `quizPassed`, `xpEarned`; unique `(userId, conceptId)` |
| **Course** | Top-level subject | `slug` (unique), `difficulty`, `language`, `status: draft\|published`, `order` |
| **Topic** | Course section | unique `(courseId, slug)`; `level`, `order` |
| **Concept** | Atomic lesson | bilingual `explanation.{english,hinglish}`, `dailyLifeExample`, `codeExample`/`codeLanguage`, `keyPoints[]`, embedded `quiz[]`, `difficulty`, `xpReward` (default 10), `status: draft\|pending\|published`, `aiGenerated` |
| **InterviewQuestion** | Q&A | bilingual `answer`, `difficulty`, `frequency`, `companyTags[]`, `status` |
| **Review** | Spaced repetition | `dueAt`, `intervalDays`, `ease` (SM-2-lite), `reps`; unique `(userId, conceptId)` |
| **Comment** | Per-concept thread | `parentId` (null = top-level), `voters[]`, `votes` |
| **Discussion** | Per-course board | thread (`parentId: null` + `title`) vs reply; `votes`, `replyCount`, `lastActivityAt` |
| **Reaction** | Concept reaction | `type: helpful\|understood\|fire`; unique `(conceptId, userId)` |
| **Bookmark** | Saved concept | unique `(userId, conceptId)` |
| **Notification** | In-app alert | `type: reply\|upvote`, `message`, `link`, `read` |
| **ChallengeCompletion** | Coding-challenge XP guard | unique `(userId, slug)` |

All models use the `mongoose.models.X || mongoose.model(...)` guard to survive hot-reload / serverless re-eval.

---

## 6. API surface (`src/app/api/`)

Route handlers (App Router). Mutations are guarded by `requireUser` / `requireAdmin` (`src/lib/guards.js`).

**Auth**
- `POST /api/auth/register` — create account (admin if email in `ADMIN_EMAILS`).
- `/api/auth/[...nextauth]` — NextAuth handlers.

**Content (CRUD; writes are admin)**
- `/api/courses`, `/api/courses/[id]`
- `/api/topics`, `/api/topics/[id]`
- `/api/concepts`, `/api/concepts/[id]`
- `/api/interview-questions`, `/api/interview-questions/[id]`

**Engagement**
- `POST /api/progress` — mark concept read, award read-XP.
- `POST /api/quiz/submit` — **server-side grading** (60% to pass), awards quiz-XP on pass.
- `POST /api/challenges/complete` — award challenge XP (once per slug).
- `GET /api/leaderboard` — weekly / all-time.
- `GET /api/me/stats`, `/api/me/dashboard`, `/api/me/continue` — current user data.
- `/api/revise`, `/api/practice`, `/api/mock-interview` — recall & practice flows.

**Community**
- `/api/comments`, `/api/comments/[id]`, `/api/comments/[id]/vote`
- `/api/discussions`, `/api/discussions/[id]`, `/api/discussions/[id]/reply`, `/api/discussions/[id]/vote`
- `/api/reactions`, `/api/bookmarks`, `/api/notifications`

**Ops**
- `GET /api/cron/reset-weekly-xp` — zeroes every user's `weeklyXP`. Protected by `Authorization: Bearer <CRON_SECRET>`. Scheduled via `vercel.json` cron `0 0 * * 1` (Mondays).

> **Security pattern:** the client is never trusted for scoring. Quiz answers are graded
> server-side; XP awards are idempotent per `(user, concept, action)` and per challenge slug.

---

## 7. Engagement mechanics

**XP & levels** (`src/services/xp.js`)
- `levelFromXP = floor(totalXP / 100) + 1`; 100 XP per level.
- `awardXP(userId, conceptId, action)` is the **single idempotent mutation**:
  - `concept_read` → +`xpReward` (default 10), once per concept.
  - `quiz_passed` → +15, once per concept.
  - Updates `totalXP` + `weeklyXP` + `level`, increments `conceptsCompleted` on first read.
  - Calls `applyStreak` (any action keeps the streak alive).
  - Upserts a spaced-repetition `Review` due tomorrow (first time only).

**Streaks** (`src/services/streak.js`)
- Duolingo-style: gap of 0 days = unchanged, 1 day = +1, more = reset to 1. Tracks `longestStreak`.

**Badges** (`src/lib/badges.js`)
- 12 badges evaluated from metrics (`totalXP`, `longestStreak`, `conceptsCompleted`, `quizzesPassed`, `bookmarks`, `completedCourses`). Pure functions; no DB.

**Coding challenges** (`src/lib/challenges.js`)
- 7 curated JS challenges (easy→hard, 15–30 XP). Tests run **client-side in a sandboxed Web Worker**; XP awarded server-side once per slug via `ChallengeCompletion`.

**Daily concept** (`src/lib/daily.js`)
- Deterministic "concept of the day": `floor(now/86.4M) % publishedCount`, same for everyone, rotates daily.

---

## 8. Auth & authorization

- **NextAuth v5 / Auth.js**, JWT session strategy (`src/auth.js`). Credentials provider verifies `bcrypt`-hashed passwords.
- `jwt`/`session` callbacks propagate `id` and `role` onto the session.
- Guards (`src/lib/guards.js`): `requireUser()` → 401 if not logged in; `requireAdmin()` → 403 if `role !== 'admin'`. Both return `{ session }` or `{ error: NextResponse }`.
- **Admin promotion:** any email listed in `ADMIN_EMAILS` becomes admin on registration / via seed.

---

## 9. Content authoring & seeding

- **Curriculum lives in code:** `scripts/content/*.mjs` — **33 course modules** (JavaScript, HTML/HTML5, CSS, Tailwind, React, Node, Express, MongoDB, TypeScript, Next.js, Redux, Git, REST API, Docker, SQL, MySQL, PostgreSQL, Python, Java, PHP, NumPy, Pandas, DSA, DSA-JS, Gen-AI, Data Science, AI/ML, OOP, DBMS, OS, Computer Networks, System Design).
- Each module exports `course`, `curriculum` (topics → concepts → interview questions), optional `generalInterviewQuestions`, and a `slugify`.
- `scripts/seed.mjs`:
  - Loads `.env.local` manually (standalone script).
  - **Wipes** Courses/Topics/Concepts/InterviewQuestions, then reinserts everything.
  - Enforces globally-unique slugs across all content.
  - Maps each course to a code-fence language (`CODE_LANG`).
  - Creates the admin user (`admin@learnverse.dev / admin123`) if absent.
- **Roadmaps** (`src/data/roadmaps.js`) are static (no DB): phased step-by-step paths (e.g. Frontend) linking to course slugs.

---

## 10. SEO, PWA & theming

- Root `metadata` in `src/app/layout.js` sets title template, OG/Twitter cards, keywords, `metadataBase` from `SITE_URL`.
- `sitemap.js` / `robots.js` driven by `NEXT_PUBLIC_SITE_URL` (`src/lib/site.js`).
- **PWA:** `manifest.js`, `public/sw.js` service worker, `ServiceWorkerRegister` component, `/offline` page.
- **Dark mode:** inline `themeInit` script runs before paint (reads `localStorage.theme` / `prefers-color-scheme`) to avoid a flash; `ThemeToggle` component switches it.

---

## 11. Local setup

**Prerequisites:** Node 18+ and a MongoDB database (local `mongodb://127.0.0.1:27017` or Atlas).

1. Copy env and fill it in:
   ```bash
   cp .env.example .env.local
   ```
   | Var | Purpose |
   |---|---|
   | `MONGODB_URI` | Mongo connection string |
   | `AUTH_SECRET` | NextAuth secret (`node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`) |
   | `NEXTAUTH_URL` | e.g. `http://localhost:3000` |
   | `ADMIN_EMAILS` | comma-separated emails auto-promoted to admin |
   | `NEXT_PUBLIC_SITE_URL` | canonical URL for SEO |
   | `CRON_SECRET` | protects the weekly-XP reset endpoint |

2. Seed content + admin: `npm run seed`
3. Run: `npm run dev` → http://localhost:3000
4. Admin login: `admin@learnverse.dev` / `admin123`

> Seeding requires a reachable MongoDB; there's no bundled local `mongod`. Set
> `MONGODB_URI` before running `npm run seed`.

---

## 12. Key routes (UI)

| Route | Purpose |
|---|---|
| `/` | Landing |
| `/courses`, `/courses/[slug]` | Course list / detail |
| `/concepts/[slug]` | Concept reader (bilingual toggle, quiz, comments) — SEO target |
| `/interview-questions` | Browse + filter |
| `/challenges`, `/challenges/[slug]` | Coding challenges (Web Worker runner) |
| `/practice/[slug]`, `/mock-interview/[slug]` | Practice & mock interview |
| `/revise` | Spaced-repetition due reviews |
| `/roadmaps`, `/roadmaps/[slug]` | Static learning paths |
| `/leaderboard` | Weekly / all-time |
| `/dashboard` | XP, streak, progress (login) |
| `/u/[id]` | Public profile |
| `/certificate/[slug]` | Course completion certificate |
| `/notifications`, `/search` | In-app alerts / search |
| `/login`, `/register` | Auth |
| `/admin/dashboard`, `/admin/concepts/new` | Admin panel |

---

## 13. Roadmap (from project notes)

- **Phase 2:** AI content assist (draft + auto-Hinglish + analogy + quiz), user submissions with AI+admin approval, in-browser code playground. See `docs/phase2-step1-ai-content-assist.md` and `docs/phase2-step2-code-playground.md`.
- **Phase 3:** short video explanations, cohorts/peer learning, AI tutor ("explain this more").
- The `aiGenerated` flag and `pending` content status already exist on `Concept`/`InterviewQuestion` to support the AI + moderation workflow.

---

## 14. Conventions & gotchas

- **DB connection is cached** on `global.mongoose` across hot reloads / serverless invocations (`src/lib/db.js`) to avoid exhausting the pool — a Next.js gotcha Express doesn't have.
- `bufferCommands: false` — queries fail fast if not connected rather than buffering.
- Models are loaded via the `mongoose.models.X || ...` guard everywhere.
- **Denormalisation is intentional** (`courseId` on Concept, `name`/`image` on UserStats) — favouring read speed.
- **Never trust the client** for scoring/XP — grade and award server-side, idempotently.
- This is **Next.js 16** — consult `node_modules/next/dist/docs/` before writing framework code (per `AGENTS.md`).
