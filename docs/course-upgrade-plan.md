# Learnverse course upgrade — audit and plan

The Jahia course (merged in #23) is the quality benchmark: roadmap, hands-on
lesson blocks, CMS/code split view, screenshots with markers, labs, debugging,
references, a project that grows through the course, and stricter
certification. This plan turns that into a platform-wide system and upgrades
every course to it — adapted to each technology, not copied.

## 1. Audit (2026-09-10)

**46 courses, 824 concepts.** Only `jahia` carries hands-on lesson blocks;
every other course is still *explanation → daily-life example → code → key
points → quiz → interview questions*.

| Course | Topics | Concepts | Quiz Qs | Interview Qs | Levels |
|---|---|---|---|---|---|
| javascript | 18 | 60 | 141 | 119 | B/I/A |
| jahia | 19 | 57 | 139 | 23 | B/I/A/Project ✅ upgraded |
| dsa | 13 | 42 | 89 | 54 | B/I/A |
| eds | 11 | 34 | 42 | 46 | B/I/A |
| react | 10 | 34 | 72 | 57 | B/I/A |
| system-design | 6 | 25 | 52 | 53 | B/I/A |
| dsa-javascript | 8 | 24 | 50 | 50 | B/I/A |
| ai-ml | 5 | 23 | 48 | 51 | B/I/A |
| nodejs | 7 | 23 | 51 | 64 | B/I/A |
| gen-ai | 5 | 22 | 52 | 50 | B/I/A |
| claude-ai | 6 | 21 | 42 | 60 | B/I/A |
| css | 7 | 20 | 45 | 55 | B/I/A |
| html | 9 | 20 | 45 | 57 | B/I |
| php | 8 | 20 | 43 | 50 | B/I/A |
| chatgpt | 6 | 19 | 39 | 50 | B/I/A |
| claude-code | 5 | 18 | 37 | 54 | B/I |
| gemini | 6 | 18 | 37 | 50 | B/I |
| python | 8 | 18 | 41 | 58 | B/I/A |
| codex-ai | 5 | 17 | 34 | 50 | B/I/A |
| java | 8 | 17 | 37 | 59 | B/I/A |
| pandas | 7 | 16 | 33 | 56 | B/I/A |
| postgresql | 4 | 16 | 34 | 51 | B/I/A |
| data-science | 4 | 15 | 32 | 50 | B/I/A |
| html5 | 7 | 15 | 35 | 50 | I/A |
| mongodb | 5 | 15 | 36 | 51 | B/I/A |
| mysql | 7 | 15 | 31 | 51 | B/I/A |
| tailwind | 4 | 15 | 35 | 50 | B/I/A |
| express | 3 | 14 | 34 | 54 | B/I/A |
| nextjs | 8 | 14 | 42 | 53 | B/I/A |
| sql | 6 | 14 | 30 | 58 | B/I/A |
| typescript | 6 | 13 | 30 | 51 | B/I/A |
| numpy | 7 | 11 | 25 | 51 | B/I/A |
| oops | 3 | 11 | 25 | 50 | B/I/A |
| docker | 4 | 10 | 30 | 51 | B/I/A |
| git | 3 | 10 | 24 | 52 | B/I/A |
| os | 3 | 10 | 30 | 50 | B/I/A |
| dbms | 3 | 9 | 20 | 50 | B/I/A |
| restapi | 4 | 9 | 28 | 60 | B/I/A |
| english-speaking | 4 | 8 | 16 | 4 | B/I |
| math-for-ml | 3 | 8 | 18 | 51 | I |
| computer-networks | 3 | 8 | 24 | 51 | B/I/A |
| redux | 4 | 8 | 24 | 51 | B/I/A |
| deep-learning | 2 | 7 | 17 | 57 | I/A |
| fine-tuning | 2 | 7 | 21 | 52 | A |
| mlops | 2 | 7 | 21 | 51 | A |
| rag | 2 | 7 | 17 | 50 | I |

### What already exists and is reused

| Need | Existing piece | Plan |
|---|---|---|
| Course → topic → concept model, progress, XP, streaks | `Course`, `Topic`, `Concept`, `UserProgress`, `/api/progress`, `/api/me/stats` | Keep. `Concept.lesson` (Mixed) already holds the hands-on block. |
| Lesson page | `ConceptLayout` + `ConceptReader` | Keep; render the generic `CourseLesson` block when present. |
| Quiz (server-graded, 60%) | `Quiz`, `/api/quiz/submit` | Keep; used for level assessments and final assessment. |
| Runnable code | `CodePlayground` (JS worker, HTML iframe) | Reuse for "Try it" and runnable labs. |
| Graded code challenges | `src/lib/challenges.js`, Web Worker grader, `ChallengeCompletion` | Reuse the grader for lab/challenge tests in JS-family courses. |
| Interview questions (short + deep-dive sections) | `InterviewQuestion.deepDive` | Keep the five-part format (short, deep, real-world, code, tip). |
| Certificate | `/certificate/[slug]` + `course.certification` | Keep; every upgraded course opts into `requireQuizzes`. |
| Search | `/api/search` (titles/tags) | Keep global search; per-course search index covers lessons + references + errors. |
| AI | template registry (`src/lib/ai/templates`), `explain-topic` | Lesson "AI tutor" actions reuse the registry — explain simply / professionally, hint, debug. |
| Bilingual | `pickText`, `useLang` | Keep; all new content `{ english, hinglish }`. |

## 2. Architecture: global vs course-specific

```
src/components/course/          GLOBAL — any course
  CourseLesson        lesson block renderer (sections by field)
  CourseScreenshot    image or drawn mockup, markers, full screen
  WhereIsThis         "📍 where do I find this" paths
  CodeResult          CODE → WHAT YOU SEE split view
                      renderers: cms-field | html | table | json | terminal | text
  PerspectiveTabs     User / Developer / Technical (Author/Developer/JCR for CMS)
  FlowDiagram         step chains (request → route → controller …)
  StepList            try-it steps with ticks
  Lab                 goal · prerequisites · starting code · tasks · hints ·
                      expected · solution · common errors
  Challenge           fill-in-the-blank or runnable, progressive hints
  DebugCard           problem → symptoms → inspect → root cause → fix → prevention
  VersionBadge
  CourseHub           roadmap + beginner/developer mode + progress breakdown +
                      search + tags + daily plan + toolkit links
  CourseRoadmap
  ReferenceExplorer   searchable entries: name, syntax, description, example,
                      use case, common mistake, related
  CheatSheet          clickable grid over a reference
  ErrorDatabase       searchable error reference (uses DebugCard)
  ProjectBoard        milestones, data model, mini projects, requirements,
                      showcase + portfolio guidance

src/components/jahia/           COURSE-SPECIFIC — stays
  CndReference (field builder), NodeTypeExplorer, FieldMock (CMS controls)

src/data/courses/<slug>/index.js    per-course toolkit config
  bands, dailyPlan, references[], cheatsheet, errors[], project, custom tools
src/data/courses/index.js           registry: slug → config (lazy)
```

A course is **content** (`scripts/content/<slug>.mjs`, lessons with a `lesson`
block) **+ toolkit config** (`src/data/courses/<slug>`). No new pages: the
course page renders `CourseHub` when a config exists, and one route
`/courses/[slug]/toolkit/[tool]` renders any course's references, cheat sheet,
error database and project board.

### Universal levels

Topics gain a `band` (0–10): Prerequisites · Fundamentals · Core · Practical ·
Advanced · Real-world · Debugging · Performance/Security · Deployment · Final
Project · Interview. Depth varies by technology; a band can be skipped (e.g.
Deployment for DSA). The existing `level` stays for difficulty dots.

### Lesson block (superset of the Jahia block)

`kind` (lesson · lab · project · debug · assessment · checklist), `minutes`,
`badges`, `version`, `objectives`, `prerequisites`, `build`, `where`,
`screenshots`, `views` (perspectives), `behind`, `steps`, `files`,
`codeResult`, `table`, `lab`, `expected`, `mistakes` (❌ / why / ✅),
`debug`, `challenge` (+ `hints[]`, optional runnable `tests`), `summary`,
`searchTerms`. Every section optional.

## 3. Per-course roadmap (technology-specific)

Each course keeps its concepts (same titles → same ids → progress kept),
regroups them into bands, adds labs/debug/project lessons, a toolkit, and a
final project built through milestones.

### Web foundations
| Course | Roadmap spine | Reference / toolkit | Final project |
|---|---|---|---|
| html | Basics → text & media → links/lists/tables → forms → semantic → accessibility → SEO/head → HTML APIs → publish | Element reference, validator errors, cheat sheet | Accessible multi-page portfolio, deployed |
| html5 | Semantics → media → forms/validation → canvas/SVG → storage/geolocation APIs → a11y → modern APIs | HTML5 API reference | Offline-capable media page |
| css | Basics → box model → cascade/specificity → flexbox → grid → responsive → animation → architecture → performance | Property explorer (interactive), layout error DB, cheat sheet | Responsive landing page |
| tailwind | Utilities → layout → states/variants → responsive → dark mode → config/theme → components → production build | Utility reference | Dashboard UI kit |
| javascript | Values/types → functions → arrays/objects → strings → control flow → DOM/events → async/fetch → modules → errors → this/prototypes → patterns → performance | Array/Object/String method reference, error DB, cheat sheet | **Expense tracker SPA** (DOM, storage, fetch, modules), deployed |
| typescript | Types → interfaces/aliases → functions → generics → narrowing → classes → utility/advanced types → TS + React → tsconfig/build | Utility types reference, compiler error DB | Typed API client + UI |

### Frontend frameworks
| react | Components → props → state → events → lists/keys → forms → effects → data fetching → routing → state management → patterns → performance → testing → production | Hooks reference, error DB (hydration, keys, stale state), cheat sheet | **Admin dashboard** (auth, CRUD, charts), deployed |
| redux | Why state mgmt → RTK store/slices → selectors → async thunks / RTK Query → Zustand → patterns → devtools | RTK/Zustand API reference | Cart + filters for the React dashboard |
| nextjs | App Router → layouts/routing → server vs client → data fetching/caching → route handlers → auth → images/fonts/metadata → rendering strategies → deploy | Routing/API reference, error DB (hydration, dynamic API) | **Full-stack blog/SaaS starter**, deployed |

### Backend
| nodejs | Runtime → modules/npm → fs/path/events → event loop/async → HTTP server → streams → env/config → security → scaling → deploy | Core module reference, error DB (ECONNREFUSED, EADDRINUSE…) | CLI + HTTP service |
| express | Server → routes → controllers → middleware → validation → error handling → auth → uploads → security (CORS, rate limit, helmet) → testing → deploy | Middleware reference, error DB (CORS, 404/500) | **REST API** for a notes/products app |
| restapi | HTTP & REST → resources/status codes → design → JWT → refresh tokens → authorization → security → versioning/pagination → docs | Status code + header reference | Documented, secured API |
| php | Syntax → strings/arrays → functions → forms/superglobals → sessions → MySQL (PDO) → OOP → security → deploy | Function reference, error DB | CRUD web app |

### Databases
| sql / mysql / postgresql | Basics → tables/types → SELECT/WHERE → functions → joins → modify/schema → constraints/relationships → indexes → aggregation → transactions → security → optimisation (EXPLAIN) → backups | Query reference with result tables, error DB | **Store database** (schema + queries + indexes) |
| mongodb | Documents/collections → CRUD → operators → data modelling → indexes → aggregation → Mongoose → transactions → security → Atlas | Operator reference, error DB | Product catalogue DB behind the Express API |
| dbms | Models → ER design → normalisation → SQL → transactions/ACID → concurrency → indexing → scaling | Concept reference | Designed schema for a real app |

### Tools / DevOps
| git | Local repo → staging/commits → branches → merge/conflicts → remotes/GitHub → PRs/review → rebase/stash → history/recovery → team workflow | **Command reference** (command → what it does → output → what changed → common error), error DB | Team collaboration workflow on a real repo |
| docker | Images/containers → Dockerfile → volumes/networks → compose → multi-stage/production images → registries → CI/CD → deploy | Command reference, error DB (port conflict, exited, permission) | Containerised full-stack app with CI |

### CS fundamentals & DSA
| dsa / dsa-javascript | Complexity → arrays/strings → hashing → two pointers/sliding window → linked lists → stacks/queues → recursion → sorting/searching → trees → graphs → DP → greedy | Pattern reference, complexity cheat sheet | Runnable problem sets per pattern (graded) |
| oops / os / computer-networks / system-design | Concept → visual → real system → trade-offs → case study | Concept reference | Design write-ups (system-design: 4 case studies) |
| java / python | Syntax → types → control flow → functions → collections → OOP → errors → files/modules → testing → packaging | Standard-library reference, error DB | CLI app (Python: data tool; Java: library system) |

### Data & AI
| numpy / pandas / data-science / math-for-ml | Concept → notebook cell → output table → exercise → analysis project | Function reference with output previews | Exploratory analysis of a real dataset |
| ai-ml / deep-learning / fine-tuning / rag / mlops / gen-ai | Concept → pipeline diagram → code → evaluation → deploy → monitor | Pipeline/tooling reference | Working RAG app / fine-tuned model / deployed model |
| chatgpt / claude-ai / claude-code / gemini / codex-ai | Tool UI → feature → workflow → prompt patterns → automation (API) → safety | Prompt pattern reference, "where is this" UI tours | An automated workflow the learner uses daily |

### CMS & other
| jahia | ✅ done — CND explorer + node types stay course-specific |
| eds | Same CMS model as Jahia: author view (document authoring) · developer view (blocks) · technical view (delivery) | Block reference | Content-driven EDS site |
| english-speaking | Non-code: concept → example dialogue → practice → speaking task | Phrase reference | Recorded self-introduction + mock interview |

## 4. Order of work

1. **Architecture** — generic components + registry + hub/toolkit for any
   course; migrate Jahia onto it with no behaviour change.
2. **Pilot: JavaScript** — largest course, runnable in the browser, proves
   labs with graded tests, reference explorer, error DB, final project.
3. **Tool pilot: Git** — proves command reference and workflow diagrams.
4. **Database pilot: SQL** — proves query → result tables.
5. Then by traffic and dependency: HTML → CSS → React → Node → Express →
   MongoDB → Next.js → TypeScript → Docker → REST API → Tailwind → Redux →
   Python → Java → PHP → MySQL → PostgreSQL → DSA → DSA-JS → HTML5 → CS
   fundamentals → data → AI → AI tools → EDS → English.

Each course lands as its own PR: content upgraded in place with
`add-course.mjs` (ids preserved), toolkit config, validation (quiz answers,
challenge blanks, cross-references, mobile overflow), build.

## 5. Validation per course

- every cross-reference resolves to a lesson title
- quiz `correctIndex` in range; challenge code contains the blank
- no duplicate titles; roadmap bands in order; prev/next navigation
- `next build` passes; course page, 3 lessons and toolkit checked at 375px
- version-specific behaviour labelled; no invented APIs or commands
