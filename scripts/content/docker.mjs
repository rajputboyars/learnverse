// Docker & Deployment curriculum — beginner -> intermediate -> advanced.
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
  title: 'Docker & Deployment',
  slug: 'docker',
  description:
    'Apps containerise aur deploy karo — Docker, docker-compose, Vercel, Railway aur production best practices. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🐳',
  tags: ['docker', 'deployment', 'devops', 'containers', 'ci-cd'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 15,
};

const beginner = [
  {
    title: 'Docker Fundamentals',
    level: 'beginner',
    description: 'Docker kya hai, containers aur images.',
    concepts: [
      {
        title: 'What is Docker',
        difficulty: 'easy',
        tags: ['docker', 'containers', 'intro', 'basics'],
        explanation: {
          english:
            'Docker is a platform for packaging applications into containers — lightweight, isolated environments that include everything the app needs to run: code, runtime, libraries, config. Containers run the same everywhere — your laptop, a server, the cloud — solving the "it works on my machine" problem. Unlike VMs, containers share the host OS kernel, making them fast and light.',
          hinglish:
            'Docker applications ko containers mein package karne ka platform hai — lightweight, isolated environments jo app run karne ke liye sab kuch include karte hain: code, runtime, libraries, config. Containers har jagah same chalte hain — tumhara laptop, server, cloud — "mere machine pe toh chal raha tha" problem solve karta hai. VMs ke unlike, containers host OS kernel share karte hain, isse fast aur light hain.',
        },
        dailyLifeExample:
          'Docker tiffin box jaisa hai — andar khana (code + dependencies) poora pack hai. Kisi bhi ghar (server) mein tiffin kholo, wahi khana milega — "mere ghar pe zyada namak tha" jaisi problem nahi. VM poori kitchen le jaana jaisi hai; container sirf tiffin.',
        codeExample:
          '# Key Docker concepts\n\n# Image — blueprint / recipe (read-only)\n# Container — running instance of an image\n# Dockerfile — instructions to build an image\n# Docker Hub — public registry for images\n\n# Pull and run a pre-built image\ndocker pull node:20-alpine\ndocker run -p 3000:3000 node:20-alpine\n\n# Common commands\ndocker ps              # list running containers\ndocker ps -a           # all containers (including stopped)\ndocker images          # list local images\ndocker stop <id>       # stop a container\ndocker rm <id>         # remove a container\ndocker rmi <image>     # remove an image',
        keyPoints: [
          'Container = isolated app environment with all dependencies',
          'Image = read-only blueprint; Container = running image',
          'Solves "works on my machine" — same env everywhere',
          'Lighter than VMs — shares host OS kernel',
        ],
        quiz: [
          {
            question: 'What is the difference between a Docker image and a container?',
            options: [
              'They are the same thing',
              'Image is a read-only blueprint; container is a running instance of an image',
              'Container is bigger than an image',
              'Images run in the cloud; containers run locally',
            ],
            correctIndex: 1,
          },
          {
            question: 'What problem does Docker primarily solve?',
            options: [
              'Makes code run faster',
              'Ensures the app runs the same on every machine — consistent environments',
              'Replaces Node.js',
              'Manages databases',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a Docker container and a virtual machine?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'A VM includes a full guest OS on top of a hypervisor — heavy (GBs), slow to start (minutes). A Docker container shares the host OS kernel and only isolates the process — lightweight (MBs), starts in seconds. VMs offer stronger isolation (separate kernel); containers are faster and use fewer resources. Both can coexist — containers are often run inside VMs in production.',
              hinglish:
                'VM mein hypervisor ke upar poora guest OS hota hai — bhaari (GBs), start hone mein slow (minutes). Docker container host OS kernel share karta hai aur sirf process isolate karta hai — lightweight (MBs), seconds mein start. VMs stronger isolation offer karte hain (alag kernel); containers faster hain aur kam resources use karte hain. Dono saath reh sakte hain — production mein containers aksar VMs ke andar run hote hain.',
            },
          },
        ],
      },
      {
        title: 'Writing a Dockerfile',
        difficulty: 'easy',
        tags: ['dockerfile', 'image', 'build'],
        explanation: {
          english:
            'A Dockerfile is a text file with instructions to build a Docker image. Key instructions: FROM (base image), WORKDIR (working directory), COPY (copy files), RUN (execute commands at build time), EXPOSE (document ports), CMD (command to run the container). Each instruction creates a layer — Docker caches layers for faster rebuilds.',
          hinglish:
            'Dockerfile ek text file hai jisme Docker image build karne ke instructions hain. Key instructions: FROM (base image), WORKDIR (working directory), COPY (files copy), RUN (build time pe commands execute), EXPOSE (ports document), CMD (container run karne ka command). Har instruction ek layer banata hai — Docker faster rebuilds ke liye layers cache karta hai.',
        },
        dailyLifeExample:
          'Dockerfile ek recipe card jaisi hai — "pehle maida lo (FROM), phir atta daalain (COPY), gundho (RUN npm install), oven mein dalo (CMD node server.js)". Recipe follow karke koi bhi same paratha bana sakta hai, kisi bhi kitchen mein.',
        codeExample:
          '# Dockerfile for a Node.js/Express API\nFROM node:20-alpine\n\n# Set working directory inside container\nWORKDIR /app\n\n# Copy package files first (Docker layer caching)\nCOPY package*.json ./\nRUN npm ci --only=production\n\n# Copy source code\nCOPY . .\n\n# Document the port (informational)\nEXPOSE 5000\n\n# Start the app\nCMD ["node", "server.js"]\n\n# --- .dockerignore ---\nnode_modules\n.git\n.env\ndist\n*.log',
        keyPoints: [
          'FROM: base image (node:20-alpine for small size)',
          'Copy package.json before code for layer caching',
          'RUN npm ci for reproducible installs',
          'Always create .dockerignore (like .gitignore)',
        ],
        quiz: [
          {
            question: 'Why do we COPY package.json before copying all source files in a Dockerfile?',
            options: [
              'package.json must always come first',
              'To leverage Docker layer caching — only re-run npm install when dependencies change',
              'Because package.json is smaller',
              'Docker requires it',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is Docker layer caching and how do you optimise for it?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Each Dockerfile instruction creates a layer. Docker caches layers — if a layer and everything before it are unchanged, Docker reuses the cache instead of re-running the instruction. To optimise: copy package.json before source code so that `npm install` is only re-run when dependencies change (not on every code change). Put frequently changing files (source code) after infrequently changing ones (package files, config).',
              hinglish:
                'Har Dockerfile instruction ek layer banata hai. Docker layers cache karta hai — agar ek layer aur usse pehle sab kuch unchanged hai, Docker instruction dobara run karne ki jagah cache reuse karta hai. Optimise karne ke liye: source code se pehle package.json copy karo taaki `npm install` sirf tab re-run ho jab dependencies change hon (har code change par nahi). Frequently changing files (source code) ko infrequently changing ones (package files, config) ke baad rakhkho.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Docker Compose',
    level: 'intermediate',
    description: 'Multi-container apps manage karna docker-compose se.',
    concepts: [
      {
        title: 'docker-compose for Full-Stack Apps',
        difficulty: 'medium',
        tags: ['docker-compose', 'multi-container', 'mongodb', 'networking'],
        explanation: {
          english:
            'Real apps have multiple services — API, database, cache. Docker Compose lets you define and run all of them together in a `docker-compose.yml` file. Services can reference each other by name. `docker compose up` starts everything; `docker compose down` stops and cleans up.',
          hinglish:
            'Real apps mein kai services hoti hain — API, database, cache. Docker Compose `docker-compose.yml` file mein sab define karke ek saath run karne deta hai. Services ek doosre ko naam se reference kar sakti hain. `docker compose up` sab start karta hai; `docker compose down` stop karke clean up karta hai.',
        },
        dailyLifeExample:
          'Docker Compose ek complete restaurant setup jaisa hai — ek order se kitchen (API), fridge (MongoDB), aur cashier (Redis) sab ek saath chalte hain. Ek command, poori operation ready. Band karo toh sab band.',
        codeExample:
          '# docker-compose.yml for MERN stack\nversion: "3.9"\n\nservices:\n  api:\n    build: .\n    ports:\n      - "5000:5000"\n    environment:\n      - MONGODB_URI=mongodb://mongo:27017/learnverse\n      - JWT_SECRET=${JWT_SECRET}\n    depends_on:\n      - mongo\n    volumes:\n      - .:/app\n      - /app/node_modules\n\n  mongo:\n    image: mongo:7\n    ports:\n      - "27017:27017"\n    volumes:\n      - mongo_data:/data/db  # persist data\n\nvolumes:\n  mongo_data:\n\n# Commands\n# docker compose up -d          # start in background\n# docker compose logs -f api    # follow logs\n# docker compose down -v        # stop + remove volumes',
        keyPoints: [
          'Services reference each other by service name (e.g. "mongo")',
          'volumes: persist data beyond container lifecycle',
          'depends_on: wait for services to start',
          'environment: pass env vars into containers',
        ],
        quiz: [
          {
            question: 'In docker-compose, how does the API service connect to MongoDB?',
            options: [
              'Using localhost:27017',
              'Using the service name as the hostname (mongodb://mongo:27017)',
              'By sharing a file',
              'Via an environment variable URL to Docker Hub',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you use docker-compose vs Kubernetes?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Docker Compose is for local development and simple single-host deployments — easy to set up, great for dev environments with multiple services (API + DB + cache). Kubernetes (K8s) is for production at scale — automatic scaling, self-healing, rolling deployments, load balancing across many machines. Rule: start with Compose for development and small deployments; graduate to K8s when you need orchestration at scale.',
              hinglish:
                'Docker Compose local development aur simple single-host deployments ke liye hai — set up karna easy, kai services (API + DB + cache) wale dev environments ke liye badhiya. Kubernetes (K8s) production mein scale ke liye hai — automatic scaling, self-healing, rolling deployments, kai machines pe load balancing. Rule: development aur chhote deployments ke liye Compose se start karo; scale pe orchestration ki zaroorat hone par K8s pe jaao.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Deployment Platforms',
    level: 'intermediate',
    description: 'Vercel, Railway aur production mein apps deploy karna.',
    concepts: [
      {
        title: 'Deploying Next.js to Vercel',
        difficulty: 'medium',
        tags: ['vercel', 'nextjs', 'deployment', 'frontend'],
        explanation: {
          english:
            'Vercel is the platform built by the Next.js team — it gives zero-config deployment for Next.js apps. Connect your GitHub repo, push a commit, and Vercel automatically builds and deploys. It handles CDN, edge functions, automatic HTTPS, and preview deployments for every PR. Free tier is generous for personal projects.',
          hinglish:
            'Vercel Next.js team ka banaya platform hai — Next.js apps ke liye zero-config deployment deta hai. GitHub repo connect karo, commit push karo, aur Vercel automatically build aur deploy kar deta hai. CDN, edge functions, automatic HTTPS, aur har PR ke liye preview deployments handle karta hai. Personal projects ke liye free tier generous hai.',
        },
        dailyLifeExample:
          'Vercel pe deploy karna courier service de jaisa hai — parcel (code) diya, address (GitHub repo) bataya, baaki sab courier wala (Vercel) handle karta hai. Tracking bhi milti hai aur delivery automatically hoti hai jab bhi nayi package (commit) aaye.',
        codeExample:
          '# Deploy to Vercel\n\n# 1. Install Vercel CLI\nnpm install -g vercel\n\n# 2. Login and deploy\nvercel login\nvercel           # follow prompts\nvercel --prod    # deploy to production\n\n# 3. Set environment variables\nvercel env add MONGODB_URI production\nvercel env add JWT_SECRET production\n\n# --- vercel.json (optional overrides) ---\n{\n  "buildCommand": "npm run build",\n  "outputDirectory": ".next",\n  "framework": "nextjs"\n}\n\n# GitHub integration — auto-deploys on push to main',
        keyPoints: [
          'Zero config for Next.js — connects to GitHub',
          'Preview deployments on every PR',
          'Set env vars in Vercel dashboard or CLI',
          'Custom domains + automatic HTTPS included',
        ],
        quiz: [
          {
            question: 'What triggers an automatic Vercel deployment?',
            options: [
              'Running vercel --prod manually',
              'Pushing a commit to the connected GitHub branch',
              'Running npm run build',
              'Restarting the Vercel dashboard',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is a preview deployment and why is it useful?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'A preview deployment is a unique URL generated for every pull request — the PR\'s code is deployed to a temporary environment. Team members, designers, and QA can test the changes on a live URL before merging to production. Vercel and Netlify both do this automatically. It catches bugs and gets stakeholder sign-off without affecting the production site.',
              hinglish:
                'Preview deployment har pull request ke liye generate ek unique URL hai — PR ka code temporary environment mein deploy hota hai. Team members, designers, aur QA production mein merge hone se pehle live URL pe changes test kar sakte hain. Vercel aur Netlify dono ye automatically karte hain. Ye production site affect kiye bina bugs pakadta hai aur stakeholder sign-off leta hai.',
            },
          },
        ],
      },
      {
        title: 'Deploying Node.js/Express to Railway',
        difficulty: 'medium',
        tags: ['railway', 'nodejs', 'backend', 'deployment'],
        explanation: {
          english:
            'Railway is a cloud platform for deploying backend services, databases, and full-stack apps. Connect your GitHub repo and Railway detects the framework, builds, and deploys. It can also provision a managed MongoDB or PostgreSQL database with one click. Pricing is pay-per-use with a generous free trial.',
          hinglish:
            'Railway backend services, databases, aur full-stack apps deploy karne ka cloud platform hai. GitHub repo connect karo aur Railway framework detect karta hai, build karta hai, aur deploy karta hai. Ek click mein managed MongoDB ya PostgreSQL database bhi provision kar sakta hai. Pricing pay-per-use hai generous free trial ke saath.',
        },
        dailyLifeExample:
          'Railway ek managed office space jaisi hai — tum sirf apna kaam (code) laao, baaki sab — bijli, internet, reception (server, DB, scaling) — woh handle karte hain. Setup mein ghante nahi lagte, minutes lagte hain.',
        codeExample:
          '# Deploy Node.js API to Railway\n\n# 1. Install Railway CLI\nnpm install -g @railway/cli\n\n# 2. Login and init\nrailway login\nrailway init\n\n# 3. Deploy\nrailway up\n\n# 4. Add a MongoDB database\nrailway add      # choose MongoDB plugin\n# Railway sets MONGODB_URL env var automatically\n\n# 5. Set custom env vars\nrailway variables set JWT_SECRET=your_secret_here\n\n# package.json — make sure start script exists\n{\n  "scripts": {\n    "start": "node server.js",\n    "build": "echo No build step"\n  }\n}',
        keyPoints: [
          'Connect GitHub repo — auto-deploys on push',
          'One-click database provisioning (MongoDB, Postgres, Redis)',
          'Railway injects DATABASE_URL env var automatically',
          'Custom domains + HTTPS included',
        ],
        quiz: [
          {
            question: 'What does Railway do when you add a MongoDB plugin?',
            options: [
              'Nothing — you still configure MongoDB manually',
              'Provisions a managed MongoDB instance and sets the connection URL env var automatically',
              'Installs Mongoose in your project',
              'Creates a free Atlas account',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What environment variables should you configure when deploying a MERN app?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'At minimum: MONGODB_URI (database connection string), JWT_SECRET (long random string for signing tokens), NODE_ENV=production (enables production optimisations), PORT (often set by the platform automatically). Never hardcode these — use platform env var settings (Vercel dashboard, Railway variables). Add NEXT_PUBLIC_ prefix for Next.js client-side variables.',
              hinglish:
                'Minimum mein: MONGODB_URI (database connection string), JWT_SECRET (tokens sign karne ke liye lamba random string), NODE_ENV=production (production optimisations enable karta hai), PORT (platform aksar automatically set karta hai). Inhe kabhi hardcode mat karo — platform env var settings use karo (Vercel dashboard, Railway variables). Next.js client-side variables ke liye NEXT_PUBLIC_ prefix add karo.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'CI/CD and Production Best Practices',
    level: 'advanced',
    description: 'GitHub Actions, multi-stage builds aur production checklist.',
    concepts: [
      {
        title: 'CI/CD with GitHub Actions',
        difficulty: 'hard',
        tags: ['ci-cd', 'github-actions', 'automation'],
        explanation: {
          english:
            'CI/CD (Continuous Integration / Continuous Deployment) automates testing and deployment. GitHub Actions runs workflows on events like push or PR. A typical workflow: on push to main → run tests → build Docker image → push to registry → deploy. This catches bugs before they reach production and ensures every deployment is consistent.',
          hinglish:
            'CI/CD (Continuous Integration / Continuous Deployment) testing aur deployment automate karta hai. GitHub Actions push ya PR jaisi events pe workflows run karta hai. Typical workflow: main pe push → tests run → Docker image build → registry pe push → deploy. Ye bugs production pahunchne se pehle pakadta hai aur ensure karta hai ki har deployment consistent ho.',
        },
        dailyLifeExample:
          'CI/CD ek automatic quality check jaisa hai factory mein — har product assembly line se guzarta hai: materials check (tests), packaging (build), quality seal (Docker push), delivery (deploy). Koi bhi defective product bahar nahi jaata.',
        codeExample:
          '# .github/workflows/deploy.yml\nname: Test and Deploy\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm test\n\n  deploy:\n    needs: test\n    runs-on: ubuntu-latest\n    if: github.ref == \'refs/heads/main\'\n    steps:\n      - uses: actions/checkout@v4\n      - name: Build and push Docker image\n        uses: docker/build-push-action@v5\n        with:\n          push: true\n          tags: myapp:latest',
        keyPoints: [
          'Runs on every push/PR — catches bugs early',
          'jobs.needs: ensures deploy only runs if tests pass',
          'Secrets stored in GitHub repo settings (not in code)',
          'Can auto-deploy to Vercel, Railway, or any cloud',
        ],
        quiz: [
          {
            question: 'What does `needs: test` in a GitHub Actions job mean?',
            options: [
              'The job needs to install test dependencies',
              'The deploy job only runs after the test job passes',
              'The job runs tests automatically',
              'The job requires manual approval',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between Continuous Integration and Continuous Deployment?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'CI (Continuous Integration): every code push is automatically tested and built — catch integration issues early. The code is always in a deployable state. CD (Continuous Deployment): every passing build is automatically deployed to production without manual approval. CD (Continuous Delivery) is a softer variant — the build is ready to deploy but a human approves the final push. Most teams use CI + Continuous Delivery (auto-build, manual deploy gate for prod).',
              hinglish:
                'CI (Continuous Integration): har code push automatically test aur build hota hai — integration issues jaldi pakdna. Code hamesha deployable state mein hota hai. CD (Continuous Deployment): har passing build automatically production pe deploy hota hai bina manual approval ke. CD (Continuous Delivery) softer variant hai — build deploy ke liye ready hai par final push ke liye human approve karta hai. Zyaadatar teams CI + Continuous Delivery use karte hain (auto-build, prod ke liye manual deploy gate).',
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
    question: 'What is a multi-stage Docker build and why use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A multi-stage build uses multiple FROM instructions in one Dockerfile. An early stage (builder) installs dev dependencies and compiles code; a final stage copies only the compiled output into a clean, minimal base image. Result: the production image is much smaller — no build tools, dev dependencies, or source maps. Example: build Next.js in a node:20 stage, copy .next to a node:20-alpine stage — image shrinks from ~1 GB to ~150 MB.',
      hinglish:
        'Multi-stage build ek Dockerfile mein multiple FROM instructions use karta hai. Ek early stage (builder) dev dependencies install karta hai aur code compile karta hai; final stage sirf compiled output ko clean, minimal base image mein copy karta hai. Result: production image bahut chhota hota hai — koi build tools, dev dependencies, ya source maps nahi. Example: node:20 stage mein Next.js build karo, .next ko node:20-alpine stage mein copy karo — image ~1 GB se ~150 MB tak shrink hoti hai.',
    },
  },
];
