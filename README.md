# Learnverse 🇮🇳

A learning platform for developers — concepts explained in **English + Hinglish**, with
**daily-life desi examples**, code, quizzes, XP/streaks, a leaderboard, and interview
questions. Made so things are easy to learn the easiest way.

Built with **Next.js 16 (App Router) · React 19 · MongoDB (Mongoose) · NextAuth (Auth.js v5) · Tailwind v4**.

## What's inside (V1)

- **Content model:** Course → Topics → Concepts → Interview Questions
- **Bilingual concepts** (English / Hinglish toggle) — the USP
- **Daily-life example** block on every concept
- **Embedded quizzes** with server-side grading
- **Engagement:** XP, levels, Duolingo-style streaks, weekly + all-time leaderboard
- **Public, SEO-friendly pages** (server-rendered, per-concept metadata)
- **Auth:** email/password (NextAuth Credentials). Reading is open; XP/streak needs login.
- **Admin panel:** manage courses/topics, create concepts (bilingual + quiz builder)

## Quick start

### 1. Prerequisites
- Node 18+ (you have 24)
- A MongoDB database — either:
  - **Local:** install MongoDB and it runs at `mongodb://127.0.0.1:27017`, or
  - **Atlas:** create a free cluster and copy the connection string.

### 2. Configure env
`.env.local` already exists. Set `MONGODB_URI` to your database (local is the default).
A fresh `AUTH_SECRET` is already generated.

```env
MONGODB_URI=mongodb://127.0.0.1:27017/learnverse
ADMIN_EMAILS=admin@learnverse.dev
```

Any email listed in `ADMIN_EMAILS` becomes an admin on registration.

### 3. Seed starter content
Adds a fully-filled JavaScript course (Closures, Arrow Functions, Hoisting, map/filter/reduce),
interview questions, and an admin account.

```bash
npm run seed
```

Admin login created: **admin@learnverse.dev / admin123**

### 4. Run
```bash
npm run dev
```
Open http://localhost:3000

## Key routes

| Route | What |
|---|---|
| `/` | Landing |
| `/courses`, `/courses/[slug]` | Course list / detail |
| `/concepts/[slug]` | Concept page (SEO gold) |
| `/interview-questions` | Browse + filter |
| `/leaderboard` | Weekly / all-time |
| `/dashboard` | Your XP, streak, progress (login) |
| `/login`, `/register` | Auth |
| `/admin/dashboard` | Admin (role: admin) |
| `/admin/concepts/new` | Add a concept |

## Project structure

```
src/
├── app/
│   ├── (public)/        # public pages — own navbar/footer layout
│   ├── (admin)/admin/   # admin panel — guarded layout
│   └── api/             # route handlers (CRUD + engagement)
├── lib/                 # db connection, auth guards, slug
├── models/              # Mongoose schemas
├── services/            # xp + streak business logic
└── components/          # Navbar, concept reader, quiz, admin form…
scripts/seed.mjs         # starter content + admin user
```

## Roadmap (from the original plan)

- **Phase 2:** AI content assist (draft + auto-Hinglish + analogy + quiz), user submissions with AI+admin approval, code playground (run in browser)
- **Phase 3:** short video explanations, cohorts/peer learning, AI tutor ("explain this concept more")
- **Ops:** weekly `weeklyXP` reset via a Monday cron job
