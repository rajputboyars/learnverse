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
    'React ka production framework — routing, SSR, SSG, API routes aur deployment. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '▲',
  tags: ['nextjs', 'react', 'frontend', 'fullstack', 'ssr'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 11,
};

const beginner = [
  {
    title: 'Next.js Basics',
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
          '// app/page.jsx — the root "/" route in the App Router\nexport default function HomePage() {\n  return <h1>Welcome to Learnverse!</h1>;\n}\n\n// That\'s it — no router config needed.\n// This file IS the route.',
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
                'Next.js solves: (1) Routing — React has no built-in router; Next.js uses the filesystem. (2) Rendering strategies — SSR and SSG for SEO and performance; plain React is CSR only. (3) API routes — backend endpoints in the same project. (4) Image/font optimisation. (5) Code splitting and bundling config.',
              hinglish:
                'Next.js ye problems solve karta hai: (1) Routing — React mein built-in router nahi; Next.js filesystem use karta hai. (2) Rendering strategies — SEO aur performance ke liye SSR aur SSG; plain React sirf CSR. (3) API routes — same project mein backend endpoints. (4) Image/font optimisation. (5) Code splitting aur bundling config.',
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
            'Next.js App Router (introduced in v13) uses the `app/` directory. Every `page.jsx` inside a folder becomes a route. Folders with names in `[brackets]` are dynamic segments. `layout.jsx` wraps all pages in a segment and persists across navigation. `loading.jsx` and `error.jsx` provide automatic suspense and error boundaries.',
          hinglish:
            'Next.js App Router (v13 mein introduce hua) `app/` directory use karta hai. Kisi folder ke andar har `page.jsx` ek route ban jaata hai. `[brackets]` mein naam wale folders dynamic segments hain. `layout.jsx` ek segment ke sab pages ko wrap karta hai aur navigation ke across persist karta hai. `loading.jsx` aur `error.jsx` automatic suspense aur error boundaries dete hain.',
        },
        dailyLifeExample:
          'File-based routing ek building directory jaisi hai. Har floor (folder) ka apna address (URL) hai. Kisi bhi floor pe "page" sign lagao — woh publicly accessible ho jaata hai. "Dynamic" floor woh hai jisme har flat (e.g. /users/1, /users/2) alag tenant hai.',
        codeExample:
          'app/\n├── page.jsx          → /\n├── about/\n│   └── page.jsx      → /about\n├── courses/\n│   ├── page.jsx      → /courses\n│   └── [slug]/\n│       └── page.jsx  → /courses/:slug\n└── layout.jsx        → wraps all pages\n\n// app/courses/[slug]/page.jsx\nexport default function CoursePage({ params }) {\n  return <h1>Course: {params.slug}</h1>;\n}',
        keyPoints: [
          'app/ directory — each page.jsx is a route',
          '[folder] = dynamic route segment, params passed as prop',
          'layout.jsx wraps and persists across child routes',
          'loading.jsx / error.jsx for automatic UX boundaries',
        ],
        quiz: [
          {
            question: 'What file makes a folder a route in Next.js App Router?',
            options: ['index.jsx', 'route.jsx', 'page.jsx', 'default.jsx'],
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
                '`page.jsx` is the unique UI for a route — it renders when the URL matches. `layout.jsx` wraps `page.jsx` and all nested routes below it; it persists across navigations (the component does not unmount). Use layout.jsx for shared UI like navbars, sidebars, or auth wrappers that should not re-render on every navigation.',
              hinglish:
                '`page.jsx` ek route ka unique UI hai — URL match hone par render hota hai. `layout.jsx` `page.jsx` aur uske neeche ke nested routes ko wrap karta hai; ye navigations ke across persist karta hai (component unmount nahi hota). layout.jsx shared UI ke liye use karo jaise navbars, sidebars, ya auth wrappers jo har navigation pe re-render na hoon.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Rendering Strategies',
    level: 'beginner',
    description: 'SSR, SSG, ISR aur CSR — kab kya use karna hai.',
    concepts: [
      {
        title: 'Server Components vs Client Components',
        difficulty: 'easy',
        tags: ['server-components', 'client-components', 'rendering'],
        explanation: {
          english:
            'In the App Router, all components are Server Components by default — they render on the server, can directly access databases, and send plain HTML to the client. Zero JS shipped for them. Add `"use client"` at the top to make it a Client Component — it can use hooks, event handlers, and browser APIs.',
          hinglish:
            'App Router mein sab components default mein Server Components hain — ye server pe render hote hain, directly databases access kar sakte hain, aur client ko plain HTML bhejte hain. Inke liye zero JS ship hota hai. Top pe `"use client"` add karo toh ye Client Component ban jaata hai — hooks, event handlers, aur browser APIs use kar sakta hai.',
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
        ],
        interviewQuestions: [
          {
            question: 'When should you use a Server Component vs a Client Component?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Server Component: fetching data (DB, APIs), rendering static or data-driven HTML, no interactivity needed. Client Component: useState/useEffect, browser events (onClick, onChange), browser APIs (localStorage, geolocation), third-party client libraries. Rule: push interactivity as far down the tree as possible — keep parents as server components to minimise JS sent to the browser.',
              hinglish:
                'Server Component: data fetch karna (DB, APIs), static ya data-driven HTML render karna, interactivity ki zaroorat nahi. Client Component: useState/useEffect, browser events (onClick, onChange), browser APIs (localStorage, geolocation), third-party client libraries. Rule: interactivity ko tree mein jitna neeche ho sake push karo — parents ko server components rakho taaki browser pe bheja JS kam se kam ho.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Data Fetching and API Routes',
    level: 'intermediate',
    description: 'Next.js mein data fetch karna aur API routes banana.',
    concepts: [
      {
        title: 'Data Fetching in Server Components',
        difficulty: 'medium',
        tags: ['data-fetching', 'server-components', 'async'],
        explanation: {
          english:
            'Server Components can be async. You can await fetch() or a database call directly inside the component. Next.js extends the native fetch API with caching options — `{ cache: "force-cache" }` for SSG-like behaviour, `{ cache: "no-store" }` for SSR every request, or `{ next: { revalidate: 60 } }` for ISR.',
          hinglish:
            'Server Components async ho sakte hain. Component ke andar directly fetch() ya database call await kar sakte ho. Next.js native fetch API ko caching options ke saath extend karta hai — `{ cache: "force-cache" }` SSG-like behaviour ke liye, `{ cache: "no-store" }` har request pe SSR ke liye, ya `{ next: { revalidate: 60 } }` ISR ke liye.',
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
        title: 'API Routes',
        difficulty: 'medium',
        tags: ['api-routes', 'backend', 'route-handlers'],
        explanation: {
          english:
            'Next.js allows you to build API endpoints inside the app directory using `route.js` files. Export named functions for each HTTP method: GET, POST, PUT, DELETE. These are Route Handlers — they run on the server and can connect to databases, call external APIs, or handle webhooks.',
          hinglish:
            'Next.js aapko `route.js` files use karke app directory ke andar API endpoints banana deta hai. Har HTTP method ke liye named functions export karo: GET, POST, PUT, DELETE. Ye Route Handlers hain — server pe chalte hain aur databases se connect, external APIs call, ya webhooks handle kar sakte hain.',
        },
        dailyLifeExample:
          'API routes ek post office counter jaisi hain — ek hi building mein alag counters alag kaam karte hain. `/api/courses` par GET likhoge toh list milegi, POST likhoge toh nayi course add hogi — same URL, alag method, alag kaam.',
        codeExample:
          '// app/api/courses/route.js\nimport { NextResponse } from "next/server";\nimport { connectDB } from "@/lib/db";\nimport Course from "@/models/Course";\n\nexport async function GET() {\n  await connectDB();\n  const courses = await Course.find({ status: "published" });\n  return NextResponse.json(courses);\n}\n\nexport async function POST(request) {\n  const body = await request.json();\n  await connectDB();\n  const course = await Course.create(body);\n  return NextResponse.json(course, { status: 201 });\n}',
        keyPoints: [
          'route.js inside app/ directory defines API endpoints',
          'Export GET, POST, PUT, DELETE handlers',
          'Use NextResponse.json() to return JSON',
          'Access request body with await request.json()',
        ],
        quiz: [
          {
            question: 'What file name creates an API route in Next.js App Router?',
            options: ['api.js', 'handler.js', 'route.js', 'endpoint.js'],
            correctIndex: 2,
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
    ],
  },
];

const advanced = [
  {
    title: 'Performance and Deployment',
    level: 'advanced',
    description: 'Next.js app optimize aur deploy karna.',
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
          'import Image from "next/image";\n\n// Optimised image\n<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />\n\n// Static metadata\nexport const metadata = {\n  title: "Learnverse — Learn to Code",\n  description: "Free coding courses in Hinglish.",\n  openGraph: { title: "Learnverse", images: ["/og.png"] },\n};\n\n// Dynamic metadata\nexport async function generateMetadata({ params }) {\n  const course = await getCourse(params.slug);\n  return { title: course.title, description: course.description };\n}',
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
];
