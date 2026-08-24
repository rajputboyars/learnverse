// Next.js curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs, consumed by scripts/seed.mjs.

import { deepDives } from './nextjs-deep-dives.mjs';

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
  icon: 'caret-up',
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
          {
            question: 'Which rendering strategies does Next.js support that plain React (CSR only) does not?',
            options: ['None, they are identical', 'SSR, SSG, and ISR', 'Only client-side rendering', 'WebAssembly rendering'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What problems does Next.js solve that plain React does not?',
            difficulty: 'easy',
            frequency: 'common',
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
          {
            question: 'What does [[...slug]] (double brackets) mean compared to [...slug]?',
            options: [
              'They are identical',
              'It makes the catch-all segment optional, so the base route (with no extra segments) also matches',
              'It disables the route',
              'It only matches exactly two segments',
            ],
            correctIndex: 1,
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
            frequency: 'rare',
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
          {
            question: 'What is the default component type in the Next.js App Router?',
            options: ['Client Component', 'Server Component', 'Neither, you must always specify', 'It depends on the file extension'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When should you use a Server Component vs a Client Component?',
            difficulty: 'medium',
            frequency: 'common',
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
          {
            question: 'What does `{ next: { revalidate: 60 } }` do?',
            options: [
              'Fetches fresh data on every single request',
              'Caches the data and revalidates it in the background at most every 60 seconds (ISR)',
              'Disables caching entirely',
              'Deletes the cache after 60 seconds with no replacement',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between SSR, SSG, and ISR in Next.js?',
            difficulty: 'medium',
            frequency: 'common',
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
          {
            question: 'Where should revalidatePath/revalidateTag typically be called?',
            options: [
              'Inside any Client Component render',
              'Inside a Server Action or Route Handler, right after a mutation',
              'In next.config.js',
              'They cannot be called programmatically',
            ],
            correctIndex: 1,
          },
          {
            question: 'What must you do before you can target a fetch with revalidateTag?',
            options: [
              'Nothing extra is needed',
              'Tag the fetch with { next: { tags: [...] } } when making it',
              'Convert it to a Server Action',
              'Disable caching for that fetch',
            ],
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
          {
            question: 'What kind of clients are Route Handlers especially well suited for?',
            options: [
              'Only the same Next.js app itself',
              'Non-React clients like mobile apps, webhooks, and cron jobs that need a stable HTTP endpoint',
              'They cannot be called by anything external',
              'Only static site generators',
            ],
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
          {
            question: 'Why do Server Actions offer "progressive enhancement" when used with a <form action={...}>?',
            options: [
              'They require JavaScript to work at all',
              'The form can still submit and work even before/without client JavaScript loading, since it is a real HTML form',
              'They only work with Client Components',
              'They automatically add animations',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is commonly used alongside Server Actions to show pending/error UI state?',
            options: ['useEffect only', 'useFormStatus / useActionState', 'useContext', 'useMemo'],
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
          {
            question: 'What does the `matcher` config in middleware.js control?',
            options: [
              'Which database the middleware connects to',
              'Which paths the middleware runs on',
              'The response status code',
              'The CSS applied to protected pages',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why is checking auth in middleware alone not fully sufficient for defense in depth?',
            options: [
              'Middleware never actually runs',
              'Middleware could be bypassed or misconfigured, so sensitive Server Actions/Route Handlers should also verify auth server-side',
              'Middleware only works for GET requests',
              'It is fully sufficient and nothing else is needed',
            ],
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
          {
            question: 'What does the `priority` prop on <Image> do?',
            options: [
              'Compresses the image further',
              'Marks it as above-the-fold, preloading it and skipping lazy loading',
              'Increases its file size',
              'Converts it to SVG',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is generateMetadata used for?',
            options: [
              'Generating static CSS',
              'Dynamically producing per-page metadata (like title/description) based on fetched data',
              'Creating database migrations',
              'Building the sitemap only',
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
          {
            question: 'Which file provides Suspense behaviour automatically for an entire route segment?',
            options: ['error.jsx', 'loading.jsx', 'layout.jsx', 'metadata.js'],
            correctIndex: 1,
          },
          {
            question: 'What performance metrics does streaming primarily improve?',
            options: ['Bundle size only', 'Time to First Byte and First Contentful Paint (perceived load speed)', 'Database query speed', 'Image compression ratio'],
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
          {
            question: 'What can the `redirects()` function in next.config.js be used for?',
            options: [
              'Only redirecting 404 errors',
              'Defining server-level redirects from old URLs to new ones (e.g. permanent redirects)',
              'Configuring the database connection',
              'Setting the page title',
            ],
            correctIndex: 1,
          },
          {
            question: 'How can a self-hosted (non-Vercel) Next.js app typically be deployed?',
            options: [
              'It cannot be self-hosted at all',
              'Via `next start` on a Node server, or containerised with Docker',
              'Only as a static HTML export with zero server features',
              'Only through a specific proprietary tool',
            ],
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
          {
            question: 'What happens to a dynamic path NOT returned by generateStaticParams (by default)?',
            options: [
              'The app crashes at build time',
              'It is rendered on-demand (or 404s, depending on dynamicParams config)',
              'It is always statically pre-rendered anyway',
              'It redirects to the homepage',
            ],
            correctIndex: 1,
          },
          {
            question: 'How does generateStaticParams pair well with ISR (next: { revalidate })?',
            options: [
              'They cannot be used together',
              'Pages are pre-rendered at build time via generateStaticParams, then kept fresh in the background via revalidate',
              'ISR disables generateStaticParams entirely',
              'They serve completely unrelated purposes with no interaction',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Route Groups, Parallel & Intercepting Routes',
        difficulty: 'hard',
        tags: ['route-groups', 'parallel-routes', 'intercepting-routes'],
        explanation: {
          english:
            "Three App Router folder conventions solve real organisational and UX problems that plain nested folders can't:\n\n**Route Groups** `(folderName)`: wrapping a folder name in parentheses lets you organise routes into logical groups WITHOUT adding a segment to the URL. `app/(marketing)/about/page.jsx` still maps to `/about`, not `/marketing/about`. Useful for applying a different layout.jsx to a group of routes (e.g. a `(shop)` group with a shopping layout vs a `(marketing)` group with a different one) or just for organising a large app/ directory without affecting URLs.\n\n**Parallel Routes** `@folderName`: let you render two or more independent pages in the SAME layout simultaneously, each in its own 'slot' — e.g. a dashboard showing `@analytics` and `@team` side by side, each with its own loading/error state, each independently navigable. The layout receives these as props (`{ children, analytics, team }`).\n\n**Intercepting Routes** `(.)folderName`, `(..)folderName`: let a route 'intercept' a navigation and show it in a different context — the classic example is Instagram-style: clicking a photo from a feed opens it in a MODAL (intercepted), but if the user directly visits or refreshes that URL, they get the FULL page instead. The `(.)`, `(..)`, `(...)` prefixes control how many segment levels up the interception matches from.\n\nThese are advanced, lower-frequency-use features — most apps go a long way with just regular nested routes — but they show up often in interviews about deep App Router knowledge.",
          hinglish:
            "Teen App Router folder conventions real organisational aur UX problems solve karte hain jo plain nested folders nahi kar sakte:\n\n**Route Groups** `(folderName)`: ek folder name ko parentheses mein wrap karne se tum routes ko logical groups mein organise kar sakte ho URL mein koi segment add kiye BINA. `app/(marketing)/about/page.jsx` abhi bhi `/about` pe map karta hai, `/marketing/about` pe nahi. Ye useful hai routes ke ek group pe alag layout.jsx apply karne ke liye (jaise ek `(shop)` group with shopping layout vs `(marketing)` group with alag layout) ya bas ek bade app/ directory ko URLs affect kiye bina organise karne ke liye.\n\n**Parallel Routes** `@folderName`: tumhe SAME layout mein do ya zyada independent pages ek saath render karne dete hain, har ek apne 'slot' mein — jaise ek dashboard jo `@analytics` aur `@team` saath-saath dikhata hai, har ek ka apna loading/error state, har ek independently navigable. Layout inhe props ke roop mein paata hai (`{ children, analytics, team }`).\n\n**Intercepting Routes** `(.)folderName`, `(..)folderName`: ek route ko navigation 'intercept' karke use ek alag context mein dikhane dete hain — classic example Instagram-style hai: feed se ek photo click karne pe MODAL mein khulta hai (intercepted), par agar user directly us URL pe visit ya refresh kare, unhe FULL page milta hai. `(.)`, `(..)`, `(...)` prefixes control karte hain interception kitne segment levels upar se match kare.\n\nYe advanced, kam-frequency-use features hain — zyadatar apps sirf regular nested routes se bahut door tak chal jaati hain — par interviews mein deep App Router knowledge ke baare mein aksar aate hain.",
        },
        dailyLifeExample:
          "Route Groups waise hain jaise ek almirah mein cheezein category ke hisaab se rakhna (shirts, pants) bina address badle — bahar se almirah ka address same rehta hai. Parallel Routes waise hain jaise ek TV screen jisme picture-in-picture ho — do independent videos ek saath dikh rahe hain. Intercepting Routes waise hain jaise Instagram pe photo pe click karne se ek pop-up khulta hai (modal), par wahi link seedha browser mein daalne se poora page khulta hai.",
        codeExample:
          "// Route Group — organizes without affecting URL\n// app/(marketing)/about/page.jsx    -> /about\n// app/(marketing)/layout.jsx        -> layout only for marketing group\n// app/(shop)/cart/page.jsx          -> /cart (different layout.jsx)\n\n// Parallel Routes — render multiple slots at once\n// app/dashboard/layout.jsx\n// export default function Layout({ children, analytics, team }) {\n//   return (\n//     <div>\n//       {children}\n//       <div className=\"grid grid-cols-2\">\n//         {analytics}\n//         {team}\n//       </div>\n//     </div>\n//   );\n// }\n// app/dashboard/@analytics/page.jsx\n// app/dashboard/@team/page.jsx\n\n// Intercepting Routes — modal for feed, full page for direct visit\n// app/feed/page.jsx\n// app/feed/(.)photo/[id]/page.jsx   -> intercepted modal view\n// app/photo/[id]/page.jsx           -> full page (direct visit/refresh)",
        keyPoints: [
          'Route Groups (folderName) organise routes into logical groups without adding a URL segment',
          'Route Groups are commonly used to apply different layouts to different sections of an app',
          'Parallel Routes (@slotName) render multiple independent pages in the same layout simultaneously',
          'Intercepting Routes ((.)folderName) show a route in a different context (e.g. a modal) when navigated to internally',
          'A directly-visited or refreshed URL bypasses the interception and shows the full page instead',
        ],
        quiz: [
          {
            question: 'Does wrapping a folder in parentheses, like (marketing), add a segment to the URL?',
            options: [
              'Yes, it always adds /marketing/ to the URL',
              'No — Route Groups organise files without affecting the URL path',
              'It removes the route entirely',
              'It only works for API routes',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the main use case for Parallel Routes (@slotName)?',
            options: [
              'Redirecting old URLs to new ones',
              'Rendering multiple independent pages/sections simultaneously within the same layout',
              'Hiding a route from search engines',
              'Compressing images',
            ],
            correctIndex: 1,
          },
          {
            question: 'In the Instagram-style modal example, what happens if a user directly visits or refreshes the intercepted photo URL?',
            options: [
              'It always shows an error',
              'They get the full page instead of the modal, since interception only applies to in-app navigation',
              'The app crashes',
              'It redirects to the homepage',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Error Handling: error.jsx & not-found.jsx',
        difficulty: 'medium',
        tags: ['error-handling', 'error-boundary', '404'],
        explanation: {
          english:
            "Every production app needs a plan for when things go wrong — a failed database query, a missing resource, an unexpected exception. Next.js App Router provides two special files per route segment for exactly this:\n\n**error.jsx**: automatically wraps its route segment in a React Error Boundary. If any error is thrown during rendering (in a Server or Client Component) within that segment, Next.js catches it and renders error.jsx instead of crashing the whole app. It MUST be a Client Component (`\"use client\"`) since error boundaries rely on React lifecycle features unavailable to Server Components. It receives `error` and a `reset()` function to let the user retry without a full page reload.\n\n**not-found.jsx**: renders when `notFound()` is called explicitly (e.g. a course lookup returns null) or when a URL doesn't match any route. Unlike error.jsx, this handles the 'this doesn't exist' case, not the 'something broke' case — and it can be a Server Component.\n\n**global-error.jsx** (root only): catches errors in the root layout itself, which error.jsx cannot do since it's rendered inside the layout it's meant to protect. It must render its own `<html>` and `<body>` tags since it replaces the root layout entirely when triggered.\n\nThe key mental model: errors bubble up to the NEAREST error.jsx in the folder tree, so you can have fine-grained error boundaries per section (a broken 'reviews' widget doesn't have to take down the whole course page).",
          hinglish:
            "Har production app ko ek plan chahiye jab kuch galat ho jaaye — ek failed database query, ek missing resource, ek unexpected exception. Next.js App Router har route segment ke liye exactly isi ke liye do special files deta hai:\n\n**error.jsx**: automatically apne route segment ko ek React Error Boundary mein wrap karta hai. Agar us segment ke andar rendering ke dauraan (Server ya Client Component mein) koi error throw ho, Next.js use catch karta hai aur poori app crash karne ke bajaye error.jsx render karta hai. Ye MUST ek Client Component ho (`\"use client\"`) kyunki error boundaries React lifecycle features pe depend karte hain jo Server Components ke paas nahi hote. Isse `error` aur ek `reset()` function milta hai taaki user bina poora page reload kiye retry kar sake.\n\n**not-found.jsx**: tab render hota hai jab `notFound()` explicitly call ho (jaise ek course lookup null return kare) ya jab koi URL kisi route se match na kare. error.jsx ke ulat, ye 'ye exist hi nahi karta' case handle karta hai, 'kuch toota' case nahi — aur ye ek Server Component ho sakta hai.\n\n**global-error.jsx** (sirf root mein): root layout ke andar hi errors catch karta hai, jo error.jsx nahi kar sakta kyunki wo us layout ke andar render hota hai jise protect karna hai. Ise apne khud ke `<html>` aur `<body>` tags render karne padte hain kyunki trigger hone par ye poore root layout ko replace kar deta hai.\n\nKey mental model: errors folder tree mein sabse NEAREST error.jsx tak bubble up hote hain, isliye tum fine-grained error boundaries per section rakh sakte ho (ek broken 'reviews' widget poore course page ko down nahi le jaata).",
        },
        dailyLifeExample:
          "error.jsx waise hai jaise ek building mein har floor ka apna fire alarm/emergency exit hona — agar ek floor mein aag lage, poori building evacuate nahi karni padti, sirf us floor ka plan activate hota hai. not-found.jsx waise hai jaise ek 'ye address exist nahi karta' sign — jab koi galat room number dhoondhta hai. global-error.jsx waise hai jaise poori building ka main emergency system jo tab activate hota hai jab building ka structure hi (root layout) fail ho jaaye.",
        codeExample:
          "// app/courses/[slug]/error.jsx — must be a Client Component\n\"use client\";\n\nexport default function Error({ error, reset }) {\n  return (\n    <div>\n      <h2>Something went wrong loading this course!</h2>\n      <button onClick={() => reset()}>Try again</button>\n    </div>\n  );\n}\n\n// app/courses/[slug]/not-found.jsx — can be a Server Component\nexport default function NotFound() {\n  return <h2>Course not found.</h2>;\n}\n\n// app/courses/[slug]/page.jsx — triggering not-found explicitly\nimport { notFound } from \"next/navigation\";\n\nexport default async function CoursePage({ params }) {\n  const { slug } = await params;\n  const course = await Course.findOne({ slug });\n  if (!course) notFound();   // renders the nearest not-found.jsx\n  return <h1>{course.title}</h1>;\n}",
        keyPoints: [
          'error.jsx wraps its route segment in a React Error Boundary, catching render errors',
          'error.jsx must be a Client Component and receives (error, reset) to allow retrying',
          'not-found.jsx handles missing resources — triggered by notFound() or an unmatched URL',
          'global-error.jsx (root only) catches errors in the root layout itself, and must render its own <html>/<body>',
          'Errors bubble up to the nearest error.jsx, enabling fine-grained, per-section error boundaries',
        ],
        quiz: [
          {
            question: 'Why must error.jsx be a Client Component?',
            options: [
              'It is an arbitrary Next.js requirement with no reason',
              'Error boundaries rely on React lifecycle features that are unavailable to Server Components',
              'Server Components cannot render any UI',
              'It has nothing to do with error boundaries',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the key difference between error.jsx and not-found.jsx?',
            options: [
              'They are identical in purpose',
              'error.jsx handles unexpected thrown errors; not-found.jsx handles missing resources (called via notFound() or unmatched URLs)',
              'not-found.jsx can only be used for API routes',
              'error.jsx is only for 404s',
            ],
            correctIndex: 1,
          },
          {
            question: 'If a component deep inside /courses/[slug]/reviews throws an error, which error.jsx handles it?',
            options: [
              'Only the root error.jsx, always',
              'The nearest error.jsx in the folder tree above where the error occurred',
              'No error.jsx can catch it',
              'A random error.jsx anywhere in the app',
            ],
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
    frequency: 'common',
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
    frequency: 'common',
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
    frequency: 'rare',
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
    frequency: 'rare',
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
    frequency: 'rare',
    answer: {
      english:
        'A layout.jsx does not remount when navigating between sibling routes that share it — only the page.jsx content below it re-renders. This means shared UI (navbar, sidebar) and its state (e.g. an open mobile menu, scroll position) is preserved, and any data fetching in the layout runs once instead of on every navigation, improving perceived performance.',
      hinglish:
        'Ek layout.jsx remount nahi hota jab sibling routes ke beech navigate karte ho jo use share karte hain — sirf uske neeche ka page.jsx content re-render hota hai. Matlab shared UI (navbar, sidebar) aur uska state (jaise khula mobile menu, scroll position) preserve hota hai, aur layout mein koi data fetching har navigation pe na chal ke ek baar chalti hai, jisse perceived performance improve hota hai.',
    },
  },

  // ─── App Router & Rendering ─────────────────────────────────
  {
    question: 'What is the difference between Server Components and Client Components?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Server Components render on the server and ship NO JavaScript to the browser, so they can read a database or use a secret directly and cost nothing in bundle size. Client Components, marked with `"use client"`, ship JavaScript and are required for anything interactive — state, effects, event handlers, browser APIs. In the App Router components are Server by default, which inverts the old assumption, so you opt into the client only at the leaves that genuinely need it.',
      hinglish:
        'Server Components server pe render hote hain aur browser ko KOI JavaScript nahi bhejte, isliye wo seedha ek database padh sakte hain ya ek secret use kar sakte hain aur bundle size mein kuch cost nahi karte. Client Components, `"use client"` se mark kiye, JavaScript bhejte hain aur har interactive cheez ke liye zaroori hain — state, effects, event handlers, browser APIs. App Router mein components default se Server hain, jo purani soch ulti kar deta hai, isliye tum client sirf un patton pe chunte ho jinhe genuinely chahiye.',
    },
  },
  {
    question: 'Where should you place the "use client" boundary?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'As DEEP in the tree as possible — on the smallest interactive leaf, not the page. The directive is inherited: every component imported by a Client Component also becomes client, so putting it at the top silently pulls your whole tree into the bundle and destroys the benefit. A useful pattern is keeping the page a Server Component that fetches data and passing that data as props, or as `children`, into a small client wrapper.',
      hinglish:
        'Ped mein jitna GEHRA ho sake — sabse chhote interactive patte pe, page pe nahi. Ye nirdesh viraasat mein milta hai: ek Client Component se import hua har component bhi client ban jaata hai, isliye ise upar rakhna chupke se tumhara poora ped bundle mein kheench leta hai aur faayda khatam kar deta hai. Ek kaam ka tareeka page ko ek Server Component rakhna hai jo data laaye aur us data ko props ki tarah, ya `children` ki tarah, ek chhote client wrapper mein bheje.',
    },
  },
  {
    question: 'What are the rendering strategies in Next.js and when do you use each?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'STATIC rendering builds the page at build time and serves it from a CDN — fastest and cheapest, right for marketing pages and docs. DYNAMIC rendering builds per request, needed when the output depends on cookies, headers, or search params. ISR statically renders but revalidates on a schedule or on demand, giving static speed with fresh data — the right default for content that changes occasionally. Streaming sends the shell first and fills slow parts in as they resolve.',
      hinglish:
        'STATIC rendering page ko build ke waqt banata hai aur ek CDN se deta hai — sabse tez aur sasta, marketing pages aur docs ke liye sahi. DYNAMIC rendering har request pe banata hai, tab chahiye jab nateeja cookies, headers, ya search params pe depend kare. ISR static banata hai par ek samay pe ya maange pe dobara jaanchta hai, static ki tezi taaza data ke saath deta hua — kabhi-kabhi badalte content ke liye sahi default. Streaming pehle dhaancha bhejta hai aur dheeme hisse sulajhte hi bhar deta hai.',
    },
  },
  {
    question: 'What makes a route dynamic rather than static in the App Router?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Using a dynamic function opts the whole route into dynamic rendering: `cookies()`, `headers()`, `searchParams`, `connection()`, or an uncached fetch. That is why a page you expected to be static shows as dynamic in the build output — one call deep in a component is enough. To keep the rest static, isolate the dynamic part in a component wrapped in `<Suspense>` so only that segment is deferred while the shell is prerendered.',
      hinglish:
        'Ek dynamic function use karna poore route ko dynamic rendering mein daal deta hai: `cookies()`, `headers()`, `searchParams`, `connection()`, ya ek bina cache ka fetch. Isiliye ek page jise tum static samajhte the build ke nateeje mein dynamic dikhta hai — ek component mein gehre ek call kaafi hai. Baaki ko static rakhne ke liye, dynamic hisse ko `<Suspense>` mein lapete ek component mein alag karo taaki sirf wo hissa der se aaye jabki dhaancha pehle ban jaaye.',
    },
  },
  {
    question: 'What is ISR and how does revalidation work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Incremental Static Regeneration serves a cached static page and regenerates it in the background after a set period, so users always get a fast response and never wait for a rebuild. Time-based revalidation uses `revalidate`, while ON-DEMAND revalidation with `revalidatePath` or `revalidateTag` lets a CMS webhook update a page the moment content changes — which is far better than guessing an interval. The trade is that a user may briefly see stale content.',
      hinglish:
        'Incremental Static Regeneration ek cached static page deta hai aur use ek tay samay ke baad peeche se dobara banata hai, isliye users ko hamesha ek tez jawab milta hai aur wo kabhi ek rebuild ka intezaar nahi karte. Samay-based dobara jaanch `revalidate` use karti hai, jabki `revalidatePath` ya `revalidateTag` se MAANGE PE jaanch ek CMS webhook ko content badalte hi ek page update karne deti hai — jo ek antaraal andaazne se bahut behtar hai. Trade ye hai ki ek user thodi der purana content dekh sakta hai.',
    },
  },
  {
    question: 'What are Server Actions and what are the security considerations?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A Server Action is a function marked `"use server"` that runs on the server but can be called directly from a component or a form, removing the need to hand-write an API route. The critical point is that each action becomes a PUBLIC HTTP ENDPOINT — so you must authenticate and authorise inside every action and validate its input with a schema. Treat the arguments as untrusted, exactly as you would a request body.',
      hinglish:
        'Ek Server Action ek `"use server"` se mark kiya function hai jo server pe chalta hai par ek component ya ek form se seedha bulaaya ja sakta hai, ek API route haath se likhne ki zaroorat hataate hue. Zaroori baat ye hai ki har action ek SAARVAJANIK HTTP ENDPOINT ban jaata hai — isliye tumhe har action ke andar pehchaan aur ijaazat jaanchni chahiye aur uske input ko ek schema se jaanchna chahiye. Arguments ko bharose ke bahar maano, bilkul jaise ek request body ko.',
    },
  },
  {
    question: 'How does caching work in the Next.js App Router?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'There are several layers: the Request Memoisation cache deduplicates identical fetches within one render pass, the Data Cache persists fetch results across requests and deployments, the Full Route Cache stores rendered static routes, and the Router Cache holds client-side navigation results. Caching defaults have shifted between versions — Next 15 made fetch uncached by default — so always check the version\'s documentation rather than relying on remembered behaviour.',
      hinglish:
        'Kai parten hain: Request Memoisation cache ek render pass ke andar ek jaise fetches ko ek karta hai, Data Cache fetch ke nateeje requests aur deployments ke aar-paar rakhta hai, Full Route Cache bane hue static routes rakhta hai, aur Router Cache client-side navigation ke nateeje. Caching ke defaults versions ke beech badle hain — Next 15 ne fetch ko default se bina cache kar diya — isliye yaad kiye behaviour pe bharosa karne ke bajaye hamesha us version ki documentation dekho.',
    },
  },
  {
    question: 'What is streaming and how does Suspense enable it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Streaming sends the page shell immediately and pushes slower sections down the same response as they finish, so the user sees meaningful content without waiting for the slowest query. `<Suspense>` marks a boundary with a fallback, and everything outside it renders straight away. That turns one slow database call from a blocker on the whole page into a spinner in one card, which measurably improves perceived performance and Time To First Byte.',
      hinglish:
        'Streaming page ka dhaancha turant bhejta hai aur dheeme hisson ko usi jawab mein khatam hote hi aage bhejta hai, isliye user ko matlab wala content dikhta hai bina sabse dheemi query ka intezaar kiye. `<Suspense>` ek fallback ke saath ek seema batata hai, aur uske bahar sab kuch turant render hota hai. Isse ek dheema database call poore page ko rokne ke bajaye ek card mein ek spinner ban jaata hai, jo mehsoos hone wali performance aur Time To First Byte ko naapne layak behtar karta hai.',
    },
  },
  {
    question: 'What is the difference between loading.tsx and a Suspense boundary?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`loading.tsx` is a convention that automatically wraps the whole page segment in a Suspense boundary, giving a route-level loading state with no extra code. An explicit `<Suspense>` gives you FINER control: you can stream several independent sections separately, so a fast list appears immediately while a slow chart still loads. Use `loading.tsx` for the simple case and explicit boundaries when parts of the page have very different latencies.',
      hinglish:
        '`loading.tsx` ek tareeka hai jo apne aap poore page hisse ko ek Suspense seema mein lapet deta hai, bina extra code ke ek route-star ka loading roop deta hua. Ek explicit `<Suspense>` tumhe BAAREEK control deta hai: tum kai swatantra hisse alag-alag stream kar sakte ho, isliye ek tez list turant dikhti hai jabki ek dheema chart abhi load ho raha hai. Simple case ke liye `loading.tsx` aur tab explicit seemaayein use karo jab page ke hisson ki latency bahut alag ho.',
    },
  },
  {
    question: 'How do error boundaries work in the App Router?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An `error.tsx` file catches errors thrown in that segment and below, receiving the error and a `reset` function to retry. It must be a Client Component, since it uses state. It does NOT catch errors in the layout at the same level — for that you need `global-error.tsx`. Use `not-found.tsx` with the `notFound()` function for the missing-resource case, and never render the raw error message in production, since it can leak internals.',
      hinglish:
        'Ek `error.tsx` file us hisse aur uske neeche ki errors pakadti hai, error aur dobara koshish ke liye ek `reset` function paate hue. Ise ek Client Component hona chahiye, kyunki ye state use karta hai. Ye USI star ke layout ki errors NAHI pakadta — uske liye tumhe `global-error.tsx` chahiye. Gayab resource ke liye `notFound()` function ke saath `not-found.tsx` use karo, aur production mein kabhi kaccha error message mat dikhao, kyunki wo andar ki baatein leak kar sakta hai.',
    },
  },
  {
    question: 'What is the difference between the App Router and the Pages Router?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The Pages Router uses file-based routes with `getServerSideProps` and `getStaticProps` for data, and every component is a client component. The App Router uses nested folders with `layout`, `page`, `loading`, and `error` conventions, defaults to Server Components, fetches data directly inside components with `await`, and supports streaming and Server Actions. Both can coexist during migration, which is the recommended path for a large existing application.',
      hinglish:
        'Pages Router file-based routes use karta hai data ke liye `getServerSideProps` aur `getStaticProps` ke saath, aur har component ek client component hai. App Router nested folders use karta hai `layout`, `page`, `loading`, aur `error` tareekon ke saath, default se Server Components, components ke andar seedha `await` se data laata hai, aur streaming aur Server Actions deta hai. Dono migration ke dauraan saath reh sakte hain, jo ek bade maujood application ke liye salah diya raasta hai.',
    },
  },
  {
    question: 'How do you fetch data in a Server Component?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Just make the component `async` and `await` directly — no hooks, no `useEffect`, no loading state in the component itself. You can call a database or an internal service straight from it, since the code never reaches the browser. Fetch in PARALLEL with `Promise.all` where requests are independent, because sequential awaits create a waterfall. Wrap slow sections in `<Suspense>` so they stream rather than blocking the page.',
      hinglish:
        'Bas component ko `async` banao aur seedha `await` karo — na hooks, na `useEffect`, na component mein hi koi loading roop. Tum us se seedha ek database ya ek andar ki service bula sakte ho, kyunki code kabhi browser tak nahi pahunchta. Jahan requests swatantra hon wahan `Promise.all` se SAATH-SAATH laao, kyunki ek ke baad ek awaits ek jharna banate hain. Dheeme hisson ko `<Suspense>` mein lapeto taaki wo page rokne ke bajaye stream hon.',
    },
  },
  {
    question: 'What is a route handler and when do you still need one?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A `route.ts` file exports HTTP method functions and gives you a real API endpoint. With Server Components and Server Actions you no longer need one just to feed your own pages. You still need it for a webhook receiver, a public API consumed by third parties or a mobile app, an OAuth callback, file streaming, or anything that must respond with a specific status and headers — cases where you genuinely need HTTP semantics.',
      hinglish:
        'Ek `route.ts` file HTTP method functions export karti hai aur tumhe ek asli API endpoint deti hai. Server Components aur Server Actions ke saath tumhe sirf apne pages ko khilaane ke liye ek nahi chahiye. Tumhe abhi bhi ek webhook lene wale ke liye, teesre logon ya ek mobile app se istemaal hone wale ek saarvajanik API ke liye, ek OAuth callback, file streaming, ya kisi bhi aisi cheez ke liye chahiye jise khaas status aur headers ke saath jawab dena ho — wo cases jahan tumhe genuinely HTTP semantics chahiye.',
    },
  },
  {
    question: 'What is middleware in Next.js and what are its limits?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Middleware runs BEFORE a request completes, at the edge, and is used for redirects, rewrites, setting headers, and lightweight auth checks. Its limits matter: it runs in the Edge runtime so many Node APIs and heavy libraries are unavailable, it must be fast because it runs on EVERY matched request, and it should not do database work. Use a `matcher` to scope it, and do real authorisation in the page or action rather than relying on middleware alone.',
      hinglish:
        'Middleware ek request poori hone se PEHLE chalta hai, kinaare pe, aur redirects, rewrites, headers set karne, aur halke auth jaanch ke liye use hota hai. Iski seemayein matter karti hain: ye Edge runtime mein chalta hai isliye bahut Node APIs aur bhaari libraries nahi milti, ise tez hona chahiye kyunki ye HAR milti request pe chalta hai, aur ise database ka kaam nahi karna chahiye. Ise seemit karne ke liye ek `matcher` use karo, aur asli ijaazat page ya action mein jaancho, akele middleware pe bharosa karne ke bajaye.',
    },
  },
  {
    question: 'What is the difference between the Edge and Node.js runtimes?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The EDGE runtime is a lightweight V8 environment deployed close to users, giving very low latency and fast cold starts, but it supports only Web APIs — no `fs`, no native Node modules, and many npm packages will not run. The NODE runtime is the full environment with everything available. Use edge for middleware and simple geographically-sensitive responses, and Node for anything touching a database, the filesystem, or a heavy dependency.',
      hinglish:
        'EDGE runtime ek halka V8 vaataavaran hai jo users ke paas rakha jaata hai, bahut kam latency aur tez shuruaat deta hua, par ye sirf Web APIs deta hai — na `fs`, na native Node modules, aur bahut npm packages nahi chalenge. NODE runtime poora vaataavaran hai jisme sab kuch milta hai. Edge ko middleware aur simple jagah-sambandhi jawabon ke liye use karo, aur Node ko kisi bhi database, filesystem, ya bhaari dependency chhoone wali cheez ke liye.',
    },
  },
  {
    question: 'How does the next/image component help performance?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'It automatically serves modern formats such as WebP and AVIF, generates responsive `srcset` sizes, lazy-loads below-the-fold images, and reserves space to prevent layout shift — which directly improves CLS. Set `priority` on your LCP hero image so it is preloaded rather than lazy-loaded, since lazy-loading it delays the very metric you are optimising. Remote images require configuring allowed hostnames, which also acts as a safeguard.',
      hinglish:
        'Ye apne aap WebP aur AVIF jaise modern formats deta hai, responsive `srcset` sizes banata hai, fold ke neeche ki images ko sust load karta hai, aur layout shift rokne ke liye jagah rakhta hai — jo seedha CLS behtar karta hai. Apni LCP hero image pe `priority` set karo taaki wo sust load ke bajaye pehle aaye, kyunki use sust load karna theek us maap ko der karta hai jise tum behtar kar rahe ho. Bahar ki images ke liye allowed hostnames set karne padte hain, jo ek bachaav bhi hai.',
    },
  },
  {
    question: 'How does next/font improve loading?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'It self-hosts fonts at BUILD time, so there is no request to Google Fonts at runtime — removing a third-party round trip and a privacy concern. It automatically adds `font-display: swap` and generates a size-adjusted fallback so the layout does not shift when the real font arrives, which improves CLS. It also subsets the font to the characters you use, cutting the download substantially compared with loading a full family.',
      hinglish:
        'Ye fonts ko BUILD ke waqt khud host karta hai, isliye chalte waqt Google Fonts ko koi request nahi jaati — ek teesre pakshkaar ka chakkar aur ek privacy ki chinta hatate hue. Ye apne aap `font-display: swap` jodta hai aur ek size-adjusted fallback banata hai taaki asli font aane pe layout na hile, jo CLS behtar karta hai. Ye font ko un characters tak chhota bhi karta hai jo tum use karte ho, ek poora parivaar laane ke muqable download kaafi kam karte hue.',
    },
  },
  {
    question: 'How do you handle metadata and SEO in the App Router?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Export a static `metadata` object for fixed pages, or `generateMetadata` for dynamic routes where the title depends on fetched data. Next merges metadata down the layout tree, so shared values live in the root layout and pages override only what differs. It handles Open Graph and Twitter cards, and `opengraph-image` generates a social preview at build time. Add `sitemap.ts` and `robots.ts` for crawlers, and set a `canonical` where content is reachable from several URLs.',
      hinglish:
        'Tay pages ke liye ek static `metadata` object export karo, ya un dynamic routes ke liye `generateMetadata` jahan title laaye gaye data pe depend kare. Next metadata ko layout ke ped mein neeche milaata hai, isliye saanjhi values root layout mein rehti hain aur pages sirf farak wali badalte hain. Ye Open Graph aur Twitter cards sambhalta hai, aur `opengraph-image` build ke waqt ek social preview banata hai. Crawlers ke liye `sitemap.ts` aur `robots.ts` jodo, aur jahan content kai URLs se mile wahan ek `canonical` set karo.',
    },
  },
  {
    question: 'What are parallel routes and intercepting routes?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'PARALLEL routes, written with an `@folder`, render several independent page slots in one layout simultaneously, each with its own loading and error state — useful for a dashboard with panels that load at different speeds. INTERCEPTING routes, written with `(.)`, catch a navigation and render it in the current layout instead — which is how you show a photo in a modal when clicked from a feed while a direct visit to the same URL renders the full page.',
      hinglish:
        'SAMANANTAR routes, ek `@folder` se likhe, ek layout mein kai swatantra page khaanay ek saath render karte hain, har ek apne loading aur error roop ke saath — un panels wale dashboard ke liye kaam ka jo alag raftaar se load hote hain. ROKNE WALE routes, `(.)` se likhe, ek navigation pakad kar use abhi ke layout mein render karte hain — jisse tum ek feed se click hone pe ek photo ko ek modal mein dikhate ho jabki usi URL pe seedha jaana poora page render karta hai.',
    },
  },
  {
    question: 'What is a route group and when is it useful?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A folder in parentheses such as `(marketing)` organises routes WITHOUT affecting the URL. Its main use is applying a different layout to a set of pages — a marketing layout and an app layout that share no chrome — while keeping both at the root of the URL. It also lets you group files by feature for readability. Since it does not change the URL, it is purely an organisational tool with no routing side effects.',
      hinglish:
        'Brackets mein ek folder jaise `(marketing)` routes ko URL ko CHHUE BINA jamata hai. Iska mukhya istemaal pages ke ek samooh pe ek alag layout lagana hai — ek marketing layout aur ek app layout jinme kuch saanjha nahi — jabki dono URL ki jad pe rehte hain. Ye tumhe padhne ke liye files ko feature se group karne bhi deta hai. Kyunki ye URL nahi badalta, ye sirf ek jamane ka tool hai bina kisi routing asar ke.',
    },
  },
  {
    question: 'How do you handle authentication in Next.js?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Store the session in an httpOnly, secure, sameSite cookie so JavaScript cannot read it. Read it in Server Components with `cookies()` and redirect when absent. The critical point is that middleware is an OPTIMISATION, not a security boundary — it can be bypassed, so you must check authorisation again in every page, Server Action, and route handler that touches protected data. Libraries such as Auth.js or Clerk handle the protocol details correctly.',
      hinglish:
        'Session ko ek httpOnly, secure, sameSite cookie mein rakho taaki JavaScript use padh na sake. Use Server Components mein `cookies()` se padho aur na hone pe bhej do. Zaroori baat ye hai ki middleware ek SUVIDHA hai, ek suraksha seema nahi — use bypass kiya ja sakta hai, isliye tumhe har page, Server Action, aur route handler mein ijaazat dobara jaanchni hogi jo surakshit data chhoota hai. Auth.js ya Clerk jaisi libraries protocol ki baareekiyaan sahi sambhalti hain.',
    },
  },
  {
    question: 'What is hydration and what causes a hydration error?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Hydration is React attaching event handlers to server-rendered HTML to make it interactive. An error occurs when the client renders something DIFFERENT from the server. Common causes: using `Date.now()` or `Math.random()` in render, reading `window` or `localStorage` during the first render, invalid HTML nesting such as a `<div>` inside a `<p>`, and browser extensions modifying the DOM. Fix by moving browser-only logic into `useEffect` or gating it behind a mounted flag.',
      hinglish:
        'Hydration React ka server-rendered HTML pe event handlers lagana hai taaki wo interactive ho. Ek error tab hoti hai jab client server se ALAG kuch render kare. Aam karan: render mein `Date.now()` ya `Math.random()` use karna, pehle render mein `window` ya `localStorage` padhna, galat HTML nesting jaise ek `<p>` ke andar ek `<div>`, aur DOM badalte browser extensions. Sirf browser wale logic ko `useEffect` mein le jaakar ya ek mounted flag ke peeche rakh kar theek karo.',
    },
  },
  {
    question: 'What is the difference between the Link component and a plain anchor?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`<Link>` performs a client-side navigation without a full page reload, PREFETCHES the destination when it enters the viewport, and preserves React state in shared layouts — so navigation feels instant. A plain `<a>` triggers a full document request, discarding all client state and re-downloading everything. Use `<a>` only for external links or when you genuinely want a full reload, such as after a logout that must clear all state.',
      hinglish:
        '`<Link>` ek client-side navigation karta hai bina poore page ke dobara load ke, jagah ko viewport mein aate hi PEHLE LE AATA hai, aur saanjhe layouts mein React state bachata hai — isliye navigation turant lagta hai. Ek saada `<a>` ek poora document request chalata hai, saari client state phenk kar aur sab dobara download karke. `<a>` sirf bahar ke links ke liye ya tab use karo jab tum genuinely poora reload chahte ho, jaise ek logout ke baad jise saari state saaf karni ho.',
    },
  },
  {
    question: 'How do you optimise the JavaScript bundle in a Next.js app?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Keep components on the SERVER wherever possible, since a Server Component contributes zero bytes. Push the `"use client"` boundary to the leaves. Use `next/dynamic` to lazy-load heavy client components such as a chart library or a rich-text editor. Import only what you need rather than a whole library. Then measure with `@next/bundle-analyzer` — the biggest wins are usually one or two large dependencies that could be deferred or replaced.',
      hinglish:
        'Jahan ho sake components ko SERVER pe rakho, kyunki ek Server Component zero bytes deta hai. `"use client"` seema ko patton tak dhakelo. Ek chart library ya ek rich-text editor jaise bhaari client components ko sust load karne ke liye `next/dynamic` use karo. Ek poori library ke bajaye sirf zaroori cheez import karo. Phir `@next/bundle-analyzer` se naapo — sabse badi jeetein usually ek ya do badi dependencies hoti hain jinhe taala ya badla ja sakta hai.',
    },
  },
  {
    question: 'What is next/dynamic and when should you use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`next/dynamic` code-splits a component so its JavaScript is fetched only when the component actually renders, with an optional loading fallback. Use it for anything heavy that is not needed immediately — a chart library, a map, a modal, a WYSIWYG editor. `ssr: false` skips server rendering entirely, which is the correct escape hatch for a component that depends on `window`. Do not apply it everywhere, since each split adds a request.',
      hinglish:
        '`next/dynamic` ek component ko alag kar deta hai taaki uski JavaScript sirf tab aaye jab component actually render ho, ek vaikalpik loading fallback ke saath. Ise har us bhaari cheez ke liye use karo jo turant nahi chahiye — ek chart library, ek map, ek modal, ek WYSIWYG editor. `ssr: false` server rendering poori tarah chhod deta hai, jo `window` pe depend karte component ke liye sahi raasta hai. Ise har jagah mat lagao, kyunki har alagaav ek request jodta hai.',
    },
  },
  {
    question: 'How do you handle environment variables in Next.js?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Variables are server-only by default, which is what keeps a database URL or API key safe. A variable prefixed `NEXT_PUBLIC_` is INLINED INTO THE CLIENT BUNDLE at build time and is therefore visible to anyone — never put a secret behind that prefix. Because they are inlined at build, changing one requires a rebuild rather than just a restart. Validate the whole configuration at startup so a missing variable fails immediately.',
      hinglish:
        'Variables default se sirf server ke liye hain, jisse ek database URL ya API key surakshit rehti hai. `NEXT_PUBLIC_` se shuru hota ek variable build ke waqt CLIENT BUNDLE MEIN DAAL diya jaata hai aur isliye sabko dikhta hai — us prefix ke peeche kabhi ek secret mat daalo. Kyunki wo build pe daale jaate hain, ek badalne ke liye sirf restart nahi, ek rebuild chahiye. Poori configuration ko shuruaat mein jaancho taaki ek gayab variable turant fail ho.',
    },
  },
  {
    question: 'What is the difference between generateStaticParams and getStaticPaths?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`getStaticPaths` is the Pages Router API and returns both the paths and a `fallback` mode. `generateStaticParams` is the App Router equivalent and returns only the params, with fallback behaviour controlled separately by `dynamicParams`. The App Router version is simpler and composes with nested dynamic segments. In both cases you are telling Next which dynamic routes to prerender at build time rather than on demand.',
      hinglish:
        '`getStaticPaths` Pages Router ka API hai aur paths aur ek `fallback` mode dono lautaata hai. `generateStaticParams` App Router ka barabar hai aur sirf params lautaata hai, fallback behaviour alag se `dynamicParams` se control hota hai. App Router wala simple hai aur nested dynamic hisson ke saath judta hai. Dono mein tum Next ko bata rahe ho ki kaunse dynamic routes maange pe ke bajaye build ke waqt pehle banane hain.',
    },
  },
  {
    question: 'What is the difference between revalidatePath and revalidateTag?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`revalidatePath` invalidates the cache for a specific route, which is straightforward when you know exactly which page changed. `revalidateTag` invalidates every cached fetch labelled with that tag, no matter which route used it — so updating a product can refresh the product page, the listing, and the homepage in one call. Tags are the better approach once the same data appears in several places, which it usually does.',
      hinglish:
        '`revalidatePath` ek khaas route ka cache radd karta hai, jo tab seedha hai jab tumhe pata ho kaunsa page badla. `revalidateTag` us tag wale har cached fetch ko radd karta hai, chahe kisi bhi route ne use kiya ho — isliye ek product update karna product page, listing, aur homepage ko ek call mein taaza kar sakta hai. Tags behtar tareeka hain jab wahi data kai jagah dikhe, jo usually dikhta hai.',
    },
  },
  {
    question: 'How do you deal with a request waterfall in Next.js?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A waterfall happens when sequential `await`s force each request to wait for the previous one, so three 200ms calls take 600ms instead of 200ms. Fix independent requests with `Promise.all`. For a parent-child dependency, either move the fetch up so both can start together, or wrap the child in `<Suspense>` so it streams and does not block the shell. Preloading a child\'s data in the parent is the standard pattern when the dependency is unavoidable.',
      hinglish:
        'Ek jharna tab hota hai jab ek ke baad ek `await` har request ko pichhli ka intezaar karwaate hain, isliye 200ms ki teen calls 200ms ke bajaye 600ms leti hain. Swatantra requests ko `Promise.all` se theek karo. Ek parent-child nirbharta ke liye, ya to fetch upar le jao taaki dono saath shuru hon, ya child ko `<Suspense>` mein lapeto taaki wo stream ho aur dhaancha na roke. Jab nirbharta na bache to parent mein child ka data pehle laana standard tareeka hai.',
    },
  },
  {
    question: 'How do you deploy a Next.js app outside Vercel?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use `output: "standalone"` to produce a minimal self-contained server and run it in a Docker container on any host. Fully static sites can use `output: "export"`, though that disables Server Components with dynamic data, ISR, middleware, and image optimisation. The features that genuinely need care off-Vercel are ISR cache persistence across instances and image optimisation, which needs either a custom loader or a supported adapter such as OpenNext.',
      hinglish:
        '`output: "standalone"` use karke ek chhota khud-poora server banao aur use kisi bhi host pe ek Docker container mein chalao. Poori tarah static sites `output: "export"` use kar sakti hain, halaanki wo dynamic data wale Server Components, ISR, middleware, aur image optimisation band kar deta hai. Vercel ke bahar jin features pe genuinely dhyaan chahiye wo hain instances ke aar-paar ISR cache bachana aur image optimisation, jise ya ek custom loader ya OpenNext jaisa ek supported adapter chahiye.',
    },
  },
  {
    question: 'What is Partial Prerendering?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'PPR combines static and dynamic rendering in ONE page: the static shell is prerendered and served instantly from the edge, while dynamic parts wrapped in `<Suspense>` stream in per request. It removes the old all-or-nothing choice where a single `cookies()` call made the entire page dynamic. It is an experimental feature and the API has changed between releases, so check the documentation for your version before relying on it.',
      hinglish:
        'PPR EK page mein static aur dynamic rendering ko jodta hai: static dhaancha pehle ban kar kinaare se turant milta hai, jabki `<Suspense>` mein lapete dynamic hisse per request stream hote hain. Ye wo purani sab-ya-kuch nahi wali choice hataata hai jahan ek `cookies()` call poore page ko dynamic bana deta tha. Ye ek prayog wala feature hai aur API releases ke beech badla hai, isliye us pe bharosa karne se pehle apne version ki documentation dekho.',
    },
  },
  {
    question: 'How do you handle forms in the App Router?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Pass a Server Action to the form\'s `action` prop, so it works even before JavaScript loads — a genuine progressive-enhancement win. Use `useActionState` for the result and validation errors, and `useFormStatus` for a pending state on the submit button. Validate on the server with a schema regardless of any client validation, since the action is a public endpoint. Call `revalidatePath` afterwards so the updated data appears.',
      hinglish:
        'Form ke `action` prop mein ek Server Action do, taaki wo JavaScript load hone se pehle bhi chale — ek asli progressive-enhancement jeet. Nateeje aur validation errors ke liye `useActionState` use karo, aur submit button pe pending roop ke liye `useFormStatus`. Kisi bhi client validation ke bawajood server pe ek schema se jaancho, kyunki action ek saarvajanik endpoint hai. Baad mein `revalidatePath` bulao taaki update hua data dikhe.',
    },
  },
  {
    question: 'What is the difference between useRouter in the App Router and the Pages Router?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'They come from different modules and have different APIs — `next/navigation` in the App Router versus `next/router` in the Pages Router — so importing the wrong one produces a confusing runtime error during migration. The App Router version has no `query` or `pathname` on the router object; you use the separate `usePathname` and `useSearchParams` hooks instead. It also adds `refresh()` to re-fetch server data without a full reload.',
      hinglish:
        'Wo alag modules se aate hain aur unke API alag hain — App Router mein `next/navigation` versus Pages Router mein `next/router` — isliye galat wala import karna migration ke dauraan ek uljhaane wali runtime error deta hai. App Router wale mein router object pe `query` ya `pathname` nahi hai; tum uske bajaye alag `usePathname` aur `useSearchParams` hooks use karte ho. Ye `refresh()` bhi jodta hai jo bina poore reload ke server data dobara laata hai.',
    },
  },
  {
    question: 'When should you use Next.js instead of plain React?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use Next.js when you need server rendering for SEO or first-load performance, file-based routing, a backend in the same project, image and font optimisation, or incremental static generation. Plain React with Vite is a better fit for an internal dashboard behind a login where SEO is irrelevant, a widget embedded in another site, or a highly interactive single-page app. The honest framing is that Next adds a server and its complexity — take it when you benefit from that.',
      hinglish:
        'Next.js tab use karo jab tumhe SEO ya pehle load ki performance ke liye server rendering chahiye, file-based routing, usi project mein ek backend, image aur font optimisation, ya dheere-dheere static banana. Vite ke saath saada React ek login ke peeche ke andar ke dashboard ke liye behtar hai jahan SEO matter nahi karta, ek doosri site mein daala gaya widget, ya ek bahut interactive single-page app. Imaandaar baat ye hai ki Next ek server aur uski uljhan jodta hai — use tab lo jab us se faayda ho.',
    },
  },
];

// Attach the step-by-step walkthroughs, which live in their own file so this
// one stays navigable. Keys are matched on the exact question text; anything
// left over is a typo we want to hear about rather than silently lose.
const unmatched = new Set(Object.keys(deepDives));
for (const q of generalInterviewQuestions) {
  const sections = deepDives[q.question];
  if (!sections) continue;
  q.deepDive = sections;
  unmatched.delete(q.question);
}
if (unmatched.size > 0) {
  console.warn(`[nextjs] ${unmatched.size} deep-dive key(s) match no question:`);
  for (const key of unmatched) console.warn(`  ${key}`);
}
