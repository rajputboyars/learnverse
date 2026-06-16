// Next.js curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs, consumed by scripts/seed.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Next.js',
  slug: 'nextjs',
  description:
    'React ka production framework — routing, rendering strategies, API routes, auth, performance aur deployment. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '▲',
  tags: ['nextjs', 'react', 'frontend', 'fullstack', 'ssr'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 11,
};

const beginner = [
  {
    title: 'Next.js & App Router Fundamentals',
    level: 'beginner',
    description: 'Next.js kya hai, project setup aur file-based routing.',
    concepts: [
      {
        title: 'What is Next.js',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'Next.js is a React framework that gives you server-side rendering, static site generation, file-based routing, API routes, and built-in optimisations out of the box. You write React components; Next.js handles how and when they render. It makes React apps production-ready without configuring Webpack, Babel, or a router manually.',
          hinglish:
            'Next.js ek React framework hai jo out of the box server-side rendering, static site generation, file-based routing, API routes aur built-in optimisations deta hai. Tum React components likhte ho; Next.js handle karta hai ki woh kaise aur kab render hote hain. Ye React apps ko production-ready banata hai bina Webpack, Babel ya router manually configure kiye.',
        },
        dailyLifeExample:
          'React ek engine hai — powerful par akela chalana mushkil hai. Next.js poori ready-made car hai — engine already fit hai, steering, headlights, AC sab kuch included hai. Sirf drive karo.',
        codeExample:
          '// app/page.jsx — the root "/" route in the App Router\nexport default function HomePage() {\n  return <h1>Welcome to Learnverse!</h1>;\n}\n\n// That\'s it — no router config needed.\n// This file IS the route.\n\n// create-next-app scaffolds a new project:\n// npx create-next-app@latest my-app',
        keyPoints: [
          'React framework with batteries included',
          'File-based routing — file path = URL path',
          'Supports SSR, SSG, ISR, and CSR',
          'Built-in image optimisation, fonts, and metadata API',
        ],
        quiz: [
          {
            question: 'What does Next.js add on top of React?',
            options: [
              'A new component model',
              'Routing, SSR/SSG, API routes and optimisations',
              'A CSS-in-JS library',
              'Its own state management',
            ],
            correctIndex: 1,
          },
          {
            question: 'How is routing defined in Next.js App Router?',
            options: [
              'In a central router config file',
              'Through the file and folder structure under the app/ directory',
              'Using React Router v6',
              'With manual URL mappings in next.config.js',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What problems does Next.js solve that plain React does not?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'Next.js solves: (1) Routing — React has no built-in router; Next.js uses the filesystem. (2) Rendering strategies — SSR and SSG for SEO and performance; plain React is CSR only. (3) API routes — backend endpoints in the same project. (4) Image/font optimisation. (5) Code splitting and bundling config. (6) A clear convention for layouts, loading, and error states.',
              hinglish:
                'Next.js ye problems solve karta hai: (1) Routing — React mein built-in router nahi; Next.js filesystem use karta hai. (2) Rendering strategies — SEO aur performance ke liye SSR aur SSG; plain React sirf CSR. (3) API routes — same project mein backend endpoints. (4) Image/font optimisation. (5) Code splitting aur bundling config. (6) layouts, loading, aur error states ke liye clear convention.',
            },
          },
        ],
      },
      {
        title: 'App Router and File-based Routing',
        difficulty: 'easy',
        tags: ['routing', 'app-router'],
        explanation: {
          english:
            'Next.js App Router (introduced in v13) uses the `app/` directory. Every `page.jsx` inside a folder becomes a route. Folders with names in `[brackets]` are dynamic segments; `[...slug]` is a catch-all that matches multiple segments, and `[[...slug]]` makes it optional. `layout.jsx` wraps all pages in a segment and persists across navigation. `loading.jsx` and `error.jsx` provide automatic suspense and error boundaries per route segment.',
          hinglish:
            'Next.js App Router (v13 mein introduce hua) `app/` directory use karta hai. Kisi folder ke andar har `page.jsx` ek route ban jaata hai. `[brackets]` mein naam wale folders dynamic segments hain; `[...slug]` ek catch-all hai jo multiple segments match karta hai, aur `[[...slug]]` use optional bana deta hai. `layout.jsx` ek segment ke sab pages ko wrap karta hai aur navigation ke across persist karta hai. `loading.jsx` aur `error.jsx` har route segment ke liye automatic suspense aur error boundaries dete hain.',
        },
        dailyLifeExample:
          'File-based routing ek building directory jaisi hai. Har floor (folder) ka apna address (URL) hai. Kisi bhi floor pe "page" sign lagao — woh publicly accessible ho jaata hai. "Dynamic" floor woh hai jisme har flat (e.g. /users/1, /users/2) alag tenant hai. Catch-all route ek bada warehouse hai jo kisi bhi depth ka address accept kar leta hai.',
        codeExample:
          'app/\n├── page.jsx          → /\n├── about/\n│   └── page.jsx      → /about\n├── courses/\n│   ├── page.jsx      → /courses\n│   └── [slug]/\n│       └── page.jsx  → /courses/:slug\n├── docs/\n│   └── [...slug]/\n│       └── page.jsx  → /docs/a, /docs/a/b, /docs/a/b/c ...\n└── layout.jsx        → wraps all pages\n\n// app/courses/[slug]/page.jsx\nexport default async function CoursePage({ params }) {\n  const { slug } = await params; // params is a Promise in newer Next.js\n  return <h1>Course: {slug}</h1>;\n}',
        keyPoints: [
          'app/ directory — each page.jsx is a route',
          '[folder] = dynamic segment, [...folder] = catch-all',
          'layout.jsx wraps and persists across child routes',
          'loading.jsx / error.jsx for automatic UX boundaries',
        ],
        quiz: [
          {
            question: 'What file makes a folder a route in Next.js App Router?',
            options: ['index.jsx', 'route.jsx', 'page.jsx', 'default.jsx'],
            correctIndex: 2,
          },
          {
            question: 'Which folder naming creates a catch-all dynamic route?',
            options: ['[slug]', '{slug}', '[...slug]', '(slug)'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between layout.jsx and page.jsx in Next.js?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                '`page.jsx` is the unique UI for a route — it renders when the URL matches. `layout.jsx` wraps `page.jsx` and all nested routes below it; it persists across navigations (the component does not unmount or refetch its data on every navigation). Use layout.jsx for shared UI like navbars, sidebars, or auth wrappers that should not re-render on every navigation.',
              hinglish:
                '`page.jsx` ek route ka unique UI hai — URL match hone par render hota hai. `layout.jsx` `page.jsx` aur uske neeche ke nested routes ko wrap karta hai; ye navigations ke across persist karta hai (component unmount nahi hota ya har navigation pe data refetch nahi karta). layout.jsx shared UI ke liye use karo jaise navbars, sidebars, ya auth wrappers jo har navigation pe re-render na hoon.',
            },
          },
          {
            question: 'What is the difference between layout.jsx and template.jsx?',
            difficulty: 'medium',
            frequency: 'occasional',
            answer: {
              english:
                'layout.jsx persists across navigations within the same segment — state is preserved, and it does not remount. template.jsx looks similar but creates a new instance on every navigation, remounting and resetting state — useful when you want enter/exit animations or to reset state (e.g. a form) on every visit to a route.',
              hinglish:
                'layout.jsx same segment ke andar navigations ke across persist karta hai — state preserve hota hai, remount nahi hota. template.jsx dikhta similar hai par har navigation pe nayi instance banata hai, remount karke state reset karta hai — useful hai jab enter/exit animations chahiye ya har visit pe state (jaise form) reset karna ho.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Server vs Client Components',
    level: 'beginner',
    description: 'Rendering model — kaunsa component kahan render hota hai.',
    concepts: [
      {
        title: 'Server Components vs Client Components',
        difficulty: 'easy',
        tags: ['server-components', 'client-components', 'rendering'],
        explanation: {
          english:
            'In the App Router, all components are Server Components by default — they render on the server, can directly access databases, and send plain HTML to the client. Zero JS shipped for them. Add `"use client"` at the top to make it a Client Component — it can use hooks, event handlers, and browser APIs, but its JS is bundled and sent to the browser.',
          hinglish:
            'App Router mein sab components default mein Server Components hain — ye server pe render hote hain, directly databases access kar sakte hain, aur client ko plain HTML bhejte hain. Inke liye zero JS ship hota hai. Top pe `"use client"` add karo toh ye Client Component ban jaata hai — hooks, event handlers, aur browser APIs use kar sakta hai, par iska JS bundle hokar browser ko bheja jaata hai.',
        },
        dailyLifeExample:
          'Server Component ek kitchen hai jahan chef (server) khana banata hai aur ready plate (HTML) bhejta hai. Client Component ek self-service counter hai jahan customer (browser) khud interact karta hai — filter, click, animations sab client pe.',
        codeExample:
          '// Server Component (default) — no "use client"\nimport { getCoursesFromDB } from "@/lib/db";\n\nexport default async function CoursesPage() {\n  const courses = await getCoursesFromDB(); // direct DB call — fine!\n  return <ul>{courses.map(c => <li key={c.id}>{c.title}</li>)}</ul>;\n}\n\n// Client Component — must add directive\n"use client";\nimport { useState } from "react";\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}',
        keyPoints: [
          'Default = Server Component; add "use client" for client',
          'Server Components: async, DB access, zero JS bundle cost',
          'Client Components: hooks, events, browser APIs',
          'Compose: pass server data as props to client components',
        ],
        quiz: [
          {
            question: 'Which directive makes a Next.js component a Client Component?',
            options: ['"use server"', '"use client"', '"client only"', 'No directive needed'],
            correctIndex: 1,
          },
          {
            question: 'Server Components ship how much JS to the browser?',
            options: ['Same as Client Components', 'Zero JS for the component itself', 'Double the JS', 'Only CSS'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When should you use a Server Component vs a Client Component?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Server Component: fetching data (DB, APIs), rendering static or data-driven HTML, no interactivity needed, keeping secrets/API keys off the client. Client Component: useState/useEffect, browser events (onClick, onChange), browser APIs (localStorage, geolocation), third-party client-only libraries. Rule: push interactivity as far down the tree as possible — keep parents as server components to minimise JS sent to the browser.',
              hinglish:
                'Server Component: data fetch karna (DB, APIs), static ya data-driven HTML render karna, interactivity ki zaroorat nahi, secrets/API keys client se door rakhna. Client Component: useState/useEffect, browser events (onClick, onChange), browser APIs (localStorage, geolocation), third-party client-only libraries. Rule: interactivity ko tree mein jitna neeche ho sake push karo — parents ko server components rakho taaki browser pe bheja JS kam se kam ho.',
            },
          },
          {
            question: 'Can a Server Component import and render a Client Component? Can it go the other way?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A Server Component can import and render a Client Component, passing it serialisable props (no functions, no class instances). A Client Component cannot directly import a Server Component as a child it controls — instead, the Server Component is rendered first and passed down as `children`, so composition flows from server to client, not the reverse.',
              hinglish:
                'Server Component ek Client Component ko import aur render kar sakta hai, usko serialisable props bhej kar (functions ya class instances nahi). Client Component directly Server Component ko apne control wale child ke roop mein import nahi kar sakta — uske bajaye Server Component pehle render hota hai aur `children` ke roop mein pass hota hai, isliye composition server se client ki taraf flow karta hai, ulta nahi.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Data Fetching',
    level: 'intermediate',
    description: 'Server Components, caching strategies aur revalidation.',
    concepts: [
      {
        title: 'Data Fetching in Server Components',
        difficulty: 'medium',
        tags: ['data-fetching', 'server-components', 'async'],
        explanation: {
          english:
            'Server Components can be async. You can await fetch() or a database call directly inside the component. Next.js extends the native fetch API with caching options — `{ cache: "force-cache" }` for SSG-like behaviour, `{ cache: "no-store" }` for SSR every request, or `{ next: { revalidate: 60 } }` for ISR. fetch requests are also automatically deduplicated within a single render pass.',
          hinglish:
            'Server Components async ho sakte hain. Component ke andar directly fetch() ya database call await kar sakte ho. Next.js native fetch API ko caching options ke saath extend karta hai — `{ cache: "force-cache" }` SSG-like behaviour ke liye, `{ cache: "no-store" }` har request pe SSR ke liye, ya `{ next: { revalidate: 60 } }` ISR ke liye. fetch requests ek single render pass ke andar automatically deduplicate bhi ho jaate hain.',
        },
        dailyLifeExample:
          '`force-cache` ek printed brochure jaisi hai — ek baar print ho gayi, sab ko same milti hai. `no-store` ek live news ticker jaisi hai — har baar fresh data. `revalidate: 60` ek newspaper jaisi hai — har ghante naya edition par purani copy tab tak chalti hai.',
        codeExample:
          '// SSG-like — built at deploy time, cached\nasync function getStaticCourses() {\n  const res = await fetch("https://api.example.com/courses", {\n    cache: "force-cache",\n  });\n  return res.json();\n}\n\n// SSR — fresh on every request\nasync function getLivePrices() {\n  const res = await fetch("https://api.example.com/prices", {\n    cache: "no-store",\n  });\n  return res.json();\n}\n\n// ISR — revalidate every 60 seconds\nasync function getCourses() {\n  const res = await fetch("https://api.example.com/courses", {\n    next: { revalidate: 60 },\n  });\n  return res.json();\n}',
        keyPoints: [
          'Async Server Components can await directly',
          'force-cache = build-time static (SSG)',
          'no-store = per-request fresh (SSR)',
          'next.revalidate = time-based ISR',
        ],
        quiz: [
          {
            question: 'Which fetch option gives you SSR behaviour (fresh data on every request)?',
            options: [
              '{ cache: "force-cache" }',
              '{ cache: "no-store" }',
              '{ next: { revalidate: 3600 } }',
              'No cache option',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does Next.js do automatically for identical fetch calls during one render?',
            options: ['Throws an error', 'Deduplicates them', 'Runs them in parallel always', 'Caches forever regardless of options'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between SSR, SSG, and ISR in Next.js?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'SSR (Server-Side Rendering): HTML generated on every request — always fresh, slower TTFB. SSG (Static Site Generation): HTML generated at build time — fastest TTFB, stale until redeploy. ISR (Incremental Static Regeneration): HTML generated at build, background-revalidated at a set interval — best of both. Use SSR for personalised/real-time data, SSG for content that rarely changes, ISR for content that changes occasionally.',
              hinglish:
                'SSR: HTML har request pe generate hota hai — hamesha fresh, TTFB thoda slow. SSG: HTML build time pe generate hota hai — fastest TTFB, redeploy tak stale. ISR: HTML build time pe generate, set interval pe background-revalidate — dono ka best combination. SSR use karo personalised/real-time data ke liye, SSG rarely changing content ke liye, ISR occasionally changing content ke liye.',
            },
          },
        ],
      },
      {
        title: 'On-Demand Revalidation & revalidatePath/revalidateTag',
        difficulty: 'hard',
        tags: ['caching', 'revalidation', 'isr'],
        explanation: {
          english:
            'Besides time-based ISR, Next.js supports on-demand revalidation: call `revalidatePath("/courses")` or `revalidateTag("courses")` (after tagging a fetch with `{ next: { tags: ["courses"] } }`) inside a Server Action or Route Handler to instantly invalidate cached data right after a mutation — e.g. after creating a new course in the admin panel, revalidate the public courses list so it reflects the change immediately.',
          hinglish:
            'Time-based ISR ke saath, Next.js on-demand revalidation bhi support karta hai: `revalidatePath("/courses")` ya `revalidateTag("courses")` (jab fetch ko `{ next: { tags: ["courses"] } }` se tag kiya ho) Server Action ya Route Handler ke andar call karke mutation ke turant baad cached data instantly invalidate kar sakte ho — jaise admin panel mein nayi course create karne ke baad, public courses list ko revalidate kar do taaki change immediately reflect ho.',
        },
        dailyLifeExample:
          'Time-based ISR ek scheduled newspaper edition jaisa hai. On-demand revalidation ek breaking-news alert jaisa hai — kisi bhi waqt naya update push kar sakte ho, schedule ka wait nahi karna padta.',
        codeExample:
          '// app/admin/actions.js\n"use server";\nimport { revalidatePath, revalidateTag } from "next/cache";\nimport Course from "@/models/Course";\n\nexport async function createCourse(data) {\n  await Course.create(data);\n  revalidatePath("/courses");   // refresh this specific path\n  revalidateTag("courses");     // or refresh anything tagged "courses"\n}\n\n// Tagging a fetch so it can be targeted later\nfetch("https://api.example.com/courses", { next: { tags: ["courses"] } });',
        keyPoints: [
          'revalidatePath(path) invalidates a specific route\'s cache',
          'revalidateTag(tag) invalidates all fetches tagged with it',
          'Call inside Server Actions or Route Handlers after a mutation',
          'Complements time-based ISR for instant freshness',
        ],
        quiz: [
          {
            question: 'Which function invalidates cache for all fetches tagged "courses"?',
            options: ['revalidatePath("courses")', 'revalidateTag("courses")', 'cache.clear("courses")', 'fetch.invalidate("courses")'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Route Handlers & API',
    level: 'intermediate',
    description: 'API routes, Server Actions aur full-stack patterns.',
    concepts: [
      {
        title: 'API Routes (Route Handlers)',
        difficulty: 'medium',
        tags: ['api-routes', 'backend', 'route-handlers'],
        explanation: {
          english:
            'Next.js allows you to build API endpoints inside the app directory using `route.js` files. Export named functions for each HTTP method: GET, POST, PUT, DELETE. These are Route Handlers — they run on the server and can connect to databases, call external APIs, or handle webhooks. They are ideal for endpoints consumed by non-React clients (mobile apps, webhooks, cron jobs).',
          hinglish:
            'Next.js aapko `route.js` files use karke app directory ke andar API endpoints banana deta hai. Har HTTP method ke liye named functions export karo: GET, POST, PUT, DELETE. Ye Route Handlers hain — server pe chalte hain aur databases se connect, external APIs call, ya webhooks handle kar sakte hain. Ye un endpoints ke liye ideal hain jo non-React clients (mobile apps, webhooks, cron jobs) use karte hain.',
        },
        dailyLifeExample:
          'API routes ek post office counter jaisi hain — ek hi building mein alag counters alag kaam karte hain. `/api/courses` par GET likhoge toh list milegi, POST likhoge toh nayi course add hogi — same URL, alag method, alag kaam.',
        codeExample:
          '// app/api/courses/route.js\nimport { NextResponse } from "next/server";\nimport { connectDB } from "@/lib/db";\nimport Course from "@/models/Course";\n\nexport async function GET(request) {\n  await connectDB();\n  const { searchParams } = new URL(request.url);\n  const difficulty = searchParams.get("difficulty");\n  const filter = difficulty ? { difficulty } : {};\n  const courses = await Course.find({ status: "published", ...filter });\n  return NextResponse.json(courses);\n}\n\nexport async function POST(request) {\n  const body = await request.json();\n  await connectDB();\n  const course = await Course.create(body);\n  return NextResponse.json(course, { status: 201 });\n}',
        keyPoints: [
          'route.js inside app/ directory defines API endpoints',
          'Export GET, POST, PUT, DELETE handlers',
          'Use NextResponse.json() to return JSON',
          'Read query params via new URL(request.url).searchParams',
        ],
        quiz: [
          {
            question: 'What file name creates an API route in Next.js App Router?',
            options: ['api.js', 'handler.js', 'route.js', 'endpoint.js'],
            correctIndex: 2,
          },
          {
            question: 'How do you read query string parameters in a Route Handler?',
            options: ['request.query', 'new URL(request.url).searchParams', 'request.params', 'request.body.query'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Can you use Next.js as a full-stack framework? How?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Yes. Next.js is full-stack: the frontend is React components (Server + Client); the backend is Route Handlers (app/api/**/route.js) that can connect to a database, call services, or handle auth. Server Actions also let you call server-side mutations directly from components without an explicit API route. This means one codebase, one deployment for a complete web app.',
              hinglish:
                'Haan. Next.js full-stack hai: frontend React components (Server + Client) hai; backend Route Handlers hain (app/api/**/route.js) jo database se connect, services call, ya auth handle kar sakte hain. Server Actions bhi components se directly server-side mutations call karne dete hain bina explicit API route ke. Matlab ek codebase, ek deployment mein poora web app.',
            },
          },
        ],
      },
      {
        title: 'Server Actions',
        difficulty: 'medium',
        tags: ['server-actions', 'forms', 'mutations'],
        explanation: {
          english:
            'Server Actions are async functions marked with `"use server"` that run on the server but can be called directly from Client (or Server) Components — typically for form submissions and mutations. They eliminate the need to manually create an API route and fetch() it for simple writes, and integrate with `useFormStatus`/`useActionState` for pending/error UI.',
          hinglish:
            'Server Actions async functions hain jo `"use server"` se marked hote hain aur server pe chalte hain par Client (ya Server) Components se directly call ho sakte hain — typically form submissions aur mutations ke liye. Ye simple writes ke liye manually API route banane aur fetch() karne ki zaroorat khatam kar dete hain, aur pending/error UI ke liye `useFormStatus`/`useActionState` ke saath integrate hote hain.',
        },
        dailyLifeExample:
          'Server Action ek seedhi hotline jaisi hai — form bharo, button dabao, request directly kitchen (server) tak jaati hai, bina alag se "order counter" (API route) banaye.',
        codeExample:
          '// app/courses/actions.js\n"use server";\nimport Course from "@/models/Course";\nimport { revalidatePath } from "next/cache";\n\nexport async function addCourse(formData) {\n  const title = formData.get("title");\n  await Course.create({ title, status: "draft" });\n  revalidatePath("/courses");\n}\n\n// app/courses/NewCourseForm.jsx\n"use client";\nimport { addCourse } from "./actions";\n\nexport function NewCourseForm() {\n  return (\n    <form action={addCourse}>\n      <input name="title" placeholder="Course title" />\n      <button type="submit">Add</button>\n    </form>\n  );\n}',
        keyPoints: [
          '"use server" marks an async function as a Server Action',
          'Can be passed directly to a <form action={...}>',
          'Runs on the server, callable from client components',
          'Pairs with revalidatePath/Tag to refresh stale UI',
        ],
        quiz: [
          {
            question: 'Which directive marks a function as a Server Action?',
            options: ['"use client"', '"use server"', '"use action"', 'No directive needed'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you choose a Server Action over a Route Handler (API route)?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Use a Server Action for mutations triggered directly from your own UI (forms, button clicks) where you control both the caller and the server code — it avoids writing a separate API endpoint and gives you progressive enhancement (forms work without JS). Use a Route Handler when you need a stable HTTP endpoint consumed by external clients (mobile apps, third-party services, webhooks) or when you need fine control over HTTP semantics (status codes, headers, caching).',
              hinglish:
                'Server Action use karo un mutations ke liye jo tumhare apne UI (forms, button clicks) se directly trigger hote hain jahan tum caller aur server code dono control karte ho — ye alag API endpoint likhne se bachata hai aur progressive enhancement deta hai (forms bina JS ke bhi kaam karte hain). Route Handler use karo jab tumhe ek stable HTTP endpoint chahiye jo external clients (mobile apps, third-party services, webhooks) consume karein, ya jab HTTP semantics (status codes, headers, caching) pe fine control chahiye ho.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Authentication Pattern',
    level: 'intermediate',
    description: 'Auth, middleware aur route protection.',
    concepts: [
      {
        title: 'Protecting Routes with Middleware',
        difficulty: 'hard',
        tags: ['middleware', 'auth', 'security'],
        explanation: {
          english:
            'A `middleware.js` file at the project root runs before a request completes, on the Edge runtime. It can read cookies/headers and redirect unauthenticated users away from protected routes before any page code runs — faster and more centralised than checking auth inside every page. Use a `matcher` config to limit which paths it runs on.',
          hinglish:
            'Project root mein ek `middleware.js` file har request complete hone se pehle chalti hai, Edge runtime pe. Ye cookies/headers padh sakti hai aur unauthenticated users ko protected routes se redirect kar sakti hai kisi bhi page code chalne se pehle — har page ke andar auth check karne se faster aur zyada centralised. `matcher` config se limit karo ki ye kin paths pe chale.',
        },
        dailyLifeExample:
          'Middleware ek building ke entrance gate guard jaisa hai — har room (page) ka apna lock check karne ke bajaye, gate pe hi ID check karke andar jaane se rok deta hai.',
        codeExample:
          '// middleware.js (project root)\nimport { NextResponse } from "next/server";\n\nexport function middleware(request) {\n  const token = request.cookies.get("session")?.value;\n  const isProtected = request.nextUrl.pathname.startsWith("/dashboard");\n\n  if (isProtected && !token) {\n    return NextResponse.redirect(new URL("/login", request.url));\n  }\n  return NextResponse.next();\n}\n\nexport const config = {\n  matcher: ["/dashboard/:path*"],\n};',
        keyPoints: [
          'middleware.js runs before the request reaches a page',
          'Runs on the Edge runtime — fast, close to the user',
          'Read cookies/headers, redirect unauthenticated users',
          'matcher config limits which routes it applies to',
        ],
        quiz: [
          {
            question: 'Where does Next.js middleware run?',
            options: ['Only on the client', 'On the Edge runtime, before the page', 'After the page renders', 'Only in API routes'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you protect a set of dashboard routes so only logged-in users can access them?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Use middleware.js with a matcher targeting /dashboard/:path* that checks for a valid session cookie/JWT and redirects to /login if missing. For defense in depth, also re-check the session inside the layout or page itself (in case middleware is bypassed or misconfigured), and verify role/permissions server-side before performing any sensitive mutation — never trust client-side checks alone.',
              hinglish:
                'middleware.js use karo matcher ke saath jo /dashboard/:path* target kare aur valid session cookie/JWT check kare, missing hone par /login pe redirect kare. Defense in depth ke liye, layout ya page ke andar bhi session re-check karo (agar middleware bypass ya misconfigured ho), aur kisi bhi sensitive mutation se pehle role/permissions server-side verify karo — sirf client-side checks pe kabhi trust mat karo.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Performance Optimization',
    level: 'advanced',
    description: 'Images, fonts, metadata aur streaming.',
    concepts: [
      {
        title: 'Image Optimisation and Metadata',
        difficulty: 'hard',
        tags: ['performance', 'image', 'seo', 'metadata'],
        explanation: {
          english:
            'Next.js `<Image>` component automatically optimises images: lazy loads, resizes for the viewport, converts to WebP, and prevents layout shift with width/height. The Metadata API lets you define `<head>` tags declaratively by exporting a `metadata` object or a `generateMetadata` function from any page.',
          hinglish:
            'Next.js `<Image>` component automatically images optimize karta hai: lazy load, viewport ke liye resize, WebP mein convert, aur width/height se layout shift prevent. Metadata API `<head>` tags declaratively define karne deta hai kisi bhi page se `metadata` object ya `generateMetadata` function export karke.',
        },
        dailyLifeExample:
          '`<Image>` ek smart photo album jaisa hai jo automatically photo ka size screen ke hisaab se adjust karta hai — mobile pe chhota, desktop pe bada. Metadata SEO ke liye visiting card jaisi hai — Google ko batao ki page kis baare mein hai.',
        codeExample:
          'import Image from "next/image";\n\n// Optimised image\n<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />\n\n// Static metadata\nexport const metadata = {\n  title: "Learnverse — Learn to Code",\n  description: "Free coding courses in Hinglish.",\n  openGraph: { title: "Learnverse", images: ["/og.png"] },\n};\n\n// Dynamic metadata\nexport async function generateMetadata({ params }) {\n  const { slug } = await params;\n  const course = await getCourse(slug);\n  return { title: course.title, description: course.description };\n}',
        keyPoints: [
          '<Image> — lazy load, resize, WebP, no layout shift',
          'priority prop for above-the-fold images',
          'metadata export for static SEO tags',
          'generateMetadata for dynamic per-page SEO',
        ],
        quiz: [
          {
            question: 'What does the Next.js `<Image>` component do automatically?',
            options: [
              'Nothing — same as <img>',
              'Lazy loads, resizes, converts to WebP',
              'Only adds alt text',
              'Uploads to CDN',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How does Next.js handle SEO compared to a plain React SPA?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A plain React SPA returns nearly empty HTML — search engine bots see a shell. Next.js Server Components and SSG render full HTML on the server so bots index real content. The Metadata API (or next/head) injects title, description, and Open Graph tags per page. Dynamic routes generate static pages at build time via generateStaticParams.',
              hinglish:
                'Plain React SPA nearly empty HTML return karta hai — search engine bots ek shell dekhte hain. Next.js Server Components aur SSG server pe full HTML render karte hain isliye bots real content index karte hain. Metadata API (ya next/head) har page pe title, description, aur Open Graph tags inject karta hai. Dynamic routes generateStaticParams se build time pe static pages generate karte hain.',
            },
          },
        ],
      },
      {
        title: 'Streaming with Suspense',
        difficulty: 'hard',
        tags: ['streaming', 'suspense', 'performance'],
        explanation: {
          english:
            'Next.js can stream HTML to the browser as it becomes ready instead of waiting for the entire page. Wrap a slow data-fetching Server Component in `<Suspense fallback={...}>` so the rest of the page (header, layout) renders immediately while the slow part streams in once ready — this dramatically improves perceived performance (faster Time to First Byte and First Contentful Paint).',
          hinglish:
            'Next.js HTML ko browser tak stream kar sakta hai jaise hi ready hota hai, poore page ka wait karne ke bajaye. Ek slow data-fetching Server Component ko `<Suspense fallback={...}>` mein wrap karo taaki baaki page (header, layout) turant render ho jaaye jabki slow part ready hone par stream ho jaaye — isse perceived performance dramatically improve hota hai (faster Time to First Byte aur First Contentful Paint).',
        },
        dailyLifeExample:
          'Streaming ek restaurant jaisa hai jo starters turant serve kar deta hai jabki main course (slow data) kitchen mein ban raha hota hai — customer ko khaali table pe wait nahi karna padta.',
        codeExample:
          'import { Suspense } from "react";\n\nasync function SlowReviews() {\n  const reviews = await getReviews(); // takes 2 seconds\n  return <ul>{reviews.map(r => <li key={r.id}>{r.text}</li>)}</ul>;\n}\n\nexport default function CoursePage() {\n  return (\n    <div>\n      <h1>Course Title</h1> {/* renders immediately */}\n      <Suspense fallback={<p>Loading reviews...</p>}>\n        <SlowReviews /> {/* streams in when ready */}\n      </Suspense>\n    </div>\n  );\n}',
        keyPoints: [
          'Streaming sends HTML in chunks as it becomes ready',
          'Wrap slow Server Components in <Suspense fallback>',
          'Improves perceived performance (TTFB, FCP)',
          'loading.jsx is Suspense applied automatically per route',
        ],
        quiz: [
          {
            question: 'What does wrapping a slow component in <Suspense> achieve?',
            options: ['Makes it load faster internally', 'Lets the rest of the page render while it streams in', 'Disables caching', 'Converts it to a Client Component'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Deployment & Configuration',
    level: 'advanced',
    description: 'next.config, environment-specific builds, deployment targets.',
    concepts: [
      {
        title: 'next.config.js and Environment Configuration',
        difficulty: 'medium',
        tags: ['config', 'deployment'],
        explanation: {
          english:
            'next.config.js customises build behaviour: image domains, redirects/rewrites, custom headers, environment variables exposed to the client (must be prefixed `NEXT_PUBLIC_`), and experimental features. Server-only env vars (DB URIs, secrets) stay unprefixed and are never sent to the browser bundle.',
          hinglish:
            'next.config.js build behaviour customise karta hai: image domains, redirects/rewrites, custom headers, client ko expose hone wale environment variables (`NEXT_PUBLIC_` prefix zaroori hai), aur experimental features. Server-only env vars (DB URIs, secrets) unprefixed rehte hain aur browser bundle mein kabhi nahi jaate.',
        },
        dailyLifeExample:
          'NEXT_PUBLIC_ prefix ek public notice board jaisa hai — jo bhi yahan likha hai sab dekh sakte hain. Bina prefix wale env vars locked office cabinet mein hain — sirf staff (server) access kar sakta hai.',
        codeExample:
          '// next.config.js\nmodule.exports = {\n  images: { domains: ["images.unsplash.com"] },\n  async redirects() {\n    return [{ source: "/old-courses", destination: "/courses", permanent: true }];\n  },\n};\n\n// .env.local\nNEXT_PUBLIC_SITE_URL=https://learnverse.dev   // exposed to browser\nMONGODB_URI=mongodb+srv://...                  // server-only, never exposed',
        keyPoints: [
          'next.config.js for redirects, image domains, headers',
          'NEXT_PUBLIC_ prefix exposes a var to the browser',
          'Unprefixed vars stay server-only (secrets, DB URIs)',
          'Next.js deploys cleanly to Vercel, or self-hosted via `next start`/Docker',
        ],
        quiz: [
          {
            question: 'Which prefix exposes an environment variable to the browser?',
            options: ['PUBLIC_', 'NEXT_PUBLIC_', 'CLIENT_', 'No prefix needed'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why should secrets like a database URI never use the NEXT_PUBLIC_ prefix?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Any env var prefixed NEXT_PUBLIC_ is inlined into the client-side JavaScript bundle at build time, meaning anyone can view it in browser dev tools or the page source. Secrets (DB credentials, API keys, signing secrets) must stay unprefixed so they only exist in the server runtime and are never shipped to the browser.',
              hinglish:
                'NEXT_PUBLIC_ prefix wala koi bhi env var build time pe client-side JavaScript bundle mein inline ho jaata hai, matlab koi bhi use browser dev tools ya page source mein dekh sakta hai. Secrets (DB credentials, API keys, signing secrets) unprefixed rehne chahiye taaki ye sirf server runtime mein exist karein aur browser ko kabhi ship na hon.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Advanced Patterns',
    level: 'advanced',
    description: 'Parallel routes, intercepting routes, generateStaticParams.',
    concepts: [
      {
        title: 'generateStaticParams for Dynamic SSG',
        difficulty: 'hard',
        tags: ['ssg', 'dynamic-routes', 'performance'],
        explanation: {
          english:
            'For dynamic segments like `[slug]`, `generateStaticParams` tells Next.js which specific paths to pre-render at build time (e.g. every course slug), giving you the speed of static pages even for data-driven routes. Pages for params not returned here are rendered on-demand (or 404, depending on `dynamicParams` config).',
          hinglish:
            '`[slug]` jaise dynamic segments ke liye, `generateStaticParams` Next.js ko batata hai ki build time pe konse specific paths pre-render karne hain (jaise har course slug), jisse data-driven routes ke liye bhi static pages ki speed milti hai. Jin params ke liye return nahi kiya gaya unke pages on-demand render hote hain (ya 404, `dynamicParams` config ke hisaab se).',
        },
        dailyLifeExample:
          'generateStaticParams ek bakery jaisa hai jo subah hi sab popular items (known slugs) bana ke rakh leta hai — customer aaye toh turant mil jaaye, bina order ka wait kiye.',
        codeExample:
          '// app/courses/[slug]/page.jsx\nimport Course from "@/models/Course";\n\nexport async function generateStaticParams() {\n  const courses = await Course.find({ status: "published" }).select("slug");\n  return courses.map((c) => ({ slug: c.slug }));\n}\n\nexport default async function CoursePage({ params }) {\n  const { slug } = await params;\n  const course = await Course.findOne({ slug });\n  return <h1>{course.title}</h1>;\n}',
        keyPoints: [
          'generateStaticParams pre-renders specific dynamic paths',
          'Combines SSG speed with dynamic, data-driven routes',
          'Unlisted params render on-demand or 404',
          'Works great with ISR (next: { revalidate })',
        ],
        quiz: [
          {
            question: 'What does generateStaticParams do?',
            options: ['Validates form input', 'Lists which dynamic route params to pre-render at build time', 'Generates CSS', 'Creates a database schema'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];

export const generalInterviewQuestions = [
  {
    question: 'What is the Next.js App Router and how does it differ from the Pages Router?',
    difficulty: 'medium',
    frequency: 'very-common',
    answer: {
      english:
        'The App Router (Next.js 13+) uses the app/ directory and introduces React Server Components, nested layouts, streaming, and the new data-fetching model (fetch with cache options). The Pages Router (pages/) is the older model — getServerSideProps/getStaticProps functions for data fetching, no server components. App Router is the future direction; use it for new projects.',
      hinglish:
        'App Router (Next.js 13+) app/ directory use karta hai aur React Server Components, nested layouts, streaming, aur naya data-fetching model (cache options ke saath fetch) introduce karta hai. Pages Router (pages/) purana model hai — data fetching ke liye getServerSideProps/getStaticProps functions, koi server components nahi. App Router future direction hai; naye projects mein ise use karo.',
    },
  },
  {
    question: 'What are React Server Components and what problem do they solve?',
    difficulty: 'medium',
    frequency: 'very-common',
    answer: {
      english:
        'RSCs are components that render entirely on the server and send their result as part of the HTML/RSC payload — they ship zero JavaScript to the client by default. They solve the problem of large client bundles in traditional SPAs by letting you fetch data and render markup on the server, only shipping JS for the interactive parts (Client Components).',
      hinglish:
        'RSCs wo components hain jo poori tarah server pe render hote hain aur apna result HTML/RSC payload ke part ke roop mein bhejte hain — default mein client ko zero JavaScript ship karte hain. Ye traditional SPAs ke bade client bundles ki problem solve karte hain, server pe data fetch aur markup render karne dekar, sirf interactive parts (Client Components) ke liye JS ship karte hain.',
    },
  },
  {
    question: 'Explain the four caching layers in Next.js (Request Memoization, Data Cache, Full Route Cache, Router Cache).',
    difficulty: 'hard',
    frequency: 'occasional',
    answer: {
      english:
        'Request Memoization dedupes identical fetch() calls during a single render pass. Data Cache persists fetch results across requests and deploys (controlled by cache/revalidate options). Full Route Cache stores the rendered HTML+RSC payload for static routes at build time. Router Cache is a client-side, in-memory cache of visited route segments that makes back/forward navigation instant. Understanding which layer is stale helps you debug "why isn\'t my data updating" issues.',
      hinglish:
        'Request Memoization ek single render pass ke andar identical fetch() calls ko dedupe karta hai. Data Cache fetch results ko requests aur deploys ke across persist karta hai (cache/revalidate options se controlled). Full Route Cache static routes ke rendered HTML+RSC payload ko build time pe store karta hai. Router Cache ek client-side, in-memory cache hai visited route segments ka jo back/forward navigation ko instant banata hai. Ye samajhna ki kaunsi layer stale hai "mera data update kyun nahi ho raha" jaise issues debug karne mein madad karta hai.',
    },
  },
  {
    question: 'How do you protect a route in Next.js App Router (e.g. an admin dashboard)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Combine middleware.js (checks session cookie/JWT, redirects unauthenticated users at the edge before any page code runs) with server-side checks inside the layout or page itself (defense in depth), and verify role/permissions before any sensitive Server Action or Route Handler executes. Never rely solely on hiding UI on the client — that is not security, only UX.',
      hinglish:
        'middleware.js (session cookie/JWT check karta hai, unauthenticated users ko edge pe hi redirect karta hai kisi page code chalne se pehle) ko layout ya page ke andar server-side checks (defense in depth) ke saath combine karo, aur kisi sensitive Server Action ya Route Handler chalne se pehle role/permissions verify karo. Sirf client pe UI hide karne pe kabhi depend mat karo — wo security nahi, sirf UX hai.',
    },
  },
  {
    question: 'What is the difference between Server Actions and Route Handlers?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Both run server-side code, but Server Actions are async functions ("use server") called directly from components — ideal for form submissions and mutations triggered from your own UI, with progressive enhancement. Route Handlers (route.js) are traditional REST-style HTTP endpoints meant for external clients, webhooks, or when you need explicit control over status codes and headers.',
      hinglish:
        'Dono server-side code chalate hain, par Server Actions async functions hain ("use server") jo components se directly call hote hain — apne UI se trigger hone wale form submissions aur mutations ke liye ideal, progressive enhancement ke saath. Route Handlers (route.js) traditional REST-style HTTP endpoints hain jo external clients, webhooks, ya jab status codes aur headers pe explicit control chahiye ho unke liye meant hain.',
    },
  },
  {
    question: 'What is streaming SSR and how does Suspense enable it in Next.js?',
    difficulty: 'hard',
    frequency: 'occasional',
    answer: {
      english:
        'Streaming SSR sends HTML to the browser in chunks as each part becomes ready, instead of blocking the entire response on the slowest data fetch. Wrapping a slow async Server Component in <Suspense fallback={...}> lets Next.js render and send the fast parts of the page immediately, then stream in the slow part (with its fallback shown meanwhile) once its data resolves — improving perceived load time.',
      hinglish:
        'Streaming SSR HTML ko browser ko chunks mein bhejta hai jaise hi har part ready hota hai, poore response ko sabse slow data fetch pe block karne ke bajaye. Ek slow async Server Component ko <Suspense fallback={...}> mein wrap karne se Next.js page ke fast parts ko turant render aur bhej deta hai, phir slow part ko (uska fallback dikhate hue) stream karta hai jab uska data resolve ho jaata hai — perceived load time improve hota hai.',
    },
  },
  {
    question: 'How does Next.js handle image and font optimization, and why does it matter for performance?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The <Image> component automatically lazy-loads off-screen images, serves modern formats (WebP/AVIF), resizes per device/viewport, and reserves space via width/height to prevent layout shift (improving Cumulative Layout Shift, a Core Web Vital). next/font self-hosts and preloads fonts, eliminating render-blocking requests to external font CDNs and avoiding Flash of Unstyled Text. Together these directly improve Core Web Vitals scores, which affect both UX and SEO ranking.',
      hinglish:
        '<Image> component automatically off-screen images ko lazy-load karta hai, modern formats (WebP/AVIF) serve karta hai, device/viewport ke hisaab se resize karta hai, aur width/height se space reserve karta hai layout shift rokne ke liye (Cumulative Layout Shift improve hota hai, ek Core Web Vital). next/font fonts ko self-host aur preload karta hai, external font CDNs ko render-blocking requests khatam karta hai aur Flash of Unstyled Text avoid karta hai. Saath mein ye Core Web Vitals scores directly improve karte hain, jo UX aur SEO ranking dono affect karte hain.',
    },
  },
  {
    question: 'What is layout.jsx persistence and why does it matter for performance?',
    difficulty: 'medium',
    frequency: 'occasional',
    answer: {
      english:
        'A layout.jsx does not remount when navigating between sibling routes that share it — only the page.jsx content below it re-renders. This means shared UI (navbar, sidebar) and its state (e.g. an open mobile menu, scroll position) is preserved, and any data fetching in the layout runs once instead of on every navigation, improving perceived performance.',
      hinglish:
        'Ek layout.jsx remount nahi hota jab sibling routes ke beech navigate karte ho jo use share karte hain — sirf uske neeche ka page.jsx content re-render hota hai. Matlab shared UI (navbar, sidebar) aur uska state (jaise khula mobile menu, scroll position) preserve hota hai, aur layout mein koi data fetching har navigation pe na chal ke ek baar chalti hai, jisse perceived performance improve hota hai.',
    },
  },
];
