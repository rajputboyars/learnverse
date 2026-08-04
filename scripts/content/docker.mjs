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
        title: 'The Story of Docker — What, Why & How',
        difficulty: 'easy',
        tags: ['docker', 'story', 'intro', 'basics'],
        explanation: {
          english:
            '📖 THE STORY\n\nMeet Raju, a developer. On his laptop he builds an app — Node 20, a specific MongoDB version, a few system libraries. On his machine, it runs perfectly. 🎉\n\nHe sends the code to his teammate Aisha. On her laptop it crashes — she has Node 18 and a different OS. Then they deploy to the server: crash again — a missing library. The dreaded sentence is born: "But it works on MY machine!" 😩\n\nEvery machine is a different kitchen with different ingredients and a different stove. Same recipe (code), different result.\n\nThen Docker enters the story. Raju packs his app AND its entire kitchen — exact Node version, libraries, config, everything — into one sealed box called a CONTAINER. He ships that box. Aisha runs the box; the server runs the box. Everywhere, the SAME box → the SAME result. The "works on my machine" problem disappears. 🚢\n\n──────────\n\n❓ WHAT is Docker?\nDocker is a tool that packages your app together with everything it needs to run (code + runtime + libraries + config) into a portable, isolated box called a container. That container runs identically on any machine that has Docker.\n\n🤔 WHY Docker? (the problem it solves)\n• "Works on my machine" → now it works on EVERY machine, because the environment travels with the app.\n• Easy onboarding → a new developer runs one command instead of installing 10 tools.\n• Isolation → each app has its own container, so two apps needing different Node versions never clash.\n• Lightweight → unlike a full virtual machine, containers share the host OS, so they start in seconds and use little memory.\n\n⚙️ HOW does Docker work? (3 simple words)\n1. Dockerfile — a recipe: step-by-step instructions to build your app box.\n2. Image — the packed box itself (a read-only blueprint built from the Dockerfile).\n3. Container — a running copy of that image (the box, opened and in action).\n\nFlow: write a Dockerfile → `docker build` makes an Image → `docker run` starts a Container. One recipe, build once, run the same box anywhere. That is the whole magic.',
          hinglish:
            '📖 KAHANI\n\nMilo Raju se, ek developer. Apne laptop pe wo ek app banata hai — Node 20, ek specific MongoDB version, kuch system libraries. Uske machine pe app perfect chalti hai. 🎉\n\nWo code apni teammate Aisha ko bhejta hai. Uske laptop pe app crash ho jaati hai — uske paas Node 18 hai aur alag OS. Phir wo server pe deploy karte hain: phir crash — ek library missing. Aur janm hota hai us famous line ka: "Par MERE machine pe toh chal raha tha!" 😩\n\nHar machine ek alag kitchen hai — alag saamaan, alag chulha. Same recipe (code), alag result.\n\nTabhi kahani mein Docker ki entry hoti hai. Raju apni app KE SAATH uski poori kitchen — exact Node version, libraries, config, sab kuch — ek sealed dabbe mein pack kar deta hai jise CONTAINER kehte hain. Wo dabba ship kar deta hai. Aisha dabba chalati hai; server dabba chalata hai. Har jagah, WAHI dabba → WAHI result. "Mere machine pe chal raha tha" wali problem gayab. 🚢\n\n──────────\n\n❓ WHAT — Docker hai kya?\nDocker ek tool hai jo tumhari app ko uske chalne ke liye zaroori har cheez (code + runtime + libraries + config) ke saath ek portable, isolated dabbe mein pack kar deta hai jise container kehte hain. Wo container kisi bhi Docker-wale machine pe bilkul same chalta hai.\n\n🤔 WHY — Docker kyun? (kaunsi problem solve karta hai)\n• "Mere machine pe chal raha tha" → ab HAR machine pe chalega, kyunki environment app ke saath hi safar karta hai.\n• Easy onboarding → naya developer 10 tools install karne ke bajaye ek command chalata hai.\n• Isolation → har app ka apna container, isliye alag Node version wali do apps kabhi clash nahi karti.\n• Lightweight → poore virtual machine ke unlike, containers host OS share karte hain, isliye seconds mein start aur kam memory.\n\n⚙️ HOW — Docker kaise kaam karta hai? (3 simple shabd)\n1. Dockerfile — ek recipe: step-by-step instructions tumhara app dabba banane ke liye.\n2. Image — packed dabba khud (Dockerfile se bana read-only blueprint).\n3. Container — us image ki running copy (dabba, khula aur action mein).\n\nFlow: Dockerfile likho → `docker build` se Image banti hai → `docker run` se Container chalta hai. Ek recipe, ek baar build, wahi dabba kahin bhi chalao. Yahi poora jaadu hai.',
        },
        dailyLifeExample:
          'Socho tum ek chef ho jiska paratha sirf apne ghar ke chulhe pe perfect banta hai. Doosre ke ghar le jaao toh swaad badal jaata hai. Docker tumhe poora tiffin pack karke deta hai — paratha + masala + chutney sab seal. Ab chahe Mumbai ho ya New York, tiffin kholo aur WAHI paratha, WAHI swaad. Container = wo seal-pack tiffin jo har jagah same result deta hai.',
        codeExample:
          '# The 3-step Docker flow from the story\n\n# 1) Dockerfile = the recipe (build your app box)\n#    FROM node:20-alpine\n#    WORKDIR /app\n#    COPY . .\n#    RUN npm install\n#    CMD ["node", "server.js"]\n\n# 2) Build the IMAGE (the packed box) from the recipe\ndocker build -t my-app .\n\n# 3) Run a CONTAINER (the box in action) from the image\ndocker run -p 3000:3000 my-app\n\n# Same box runs identically on a laptop, a server, or the cloud 🚢',
        keyPoints: [
          'WHAT: Docker packs app + its environment into a portable container',
          'WHY: kills "works on my machine", easy setup, isolation, lightweight',
          'HOW: Dockerfile (recipe) → Image (packed box) → Container (running box)',
          'Build once, run the same box everywhere',
        ],
        quiz: [
          {
            question: 'In the story, what core problem does Docker solve?',
            options: [
              'It makes code run faster',
              'The "it works on my machine" problem — same app, different results on different machines',
              'It writes the code for you',
              'It replaces the database',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the correct order of the Docker flow?',
            options: [
              'Container → Image → Dockerfile',
              'Image → Container → Dockerfile',
              'Dockerfile → Image → Container',
              'Dockerfile → Container → Image',
            ],
            correctIndex: 2,
          },
          {
            question: 'Using the tiffin analogy, a container is like…',
            options: [
              'The recipe written on paper',
              'A sealed tiffin that gives the same food everywhere',
              'The kitchen itself',
              'The shopping list',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'In one line, what is Docker and why do teams use it?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Docker packages an app together with its entire environment into a portable container that runs the same on any machine — so teams use it to eliminate "works on my machine" bugs, onboard developers fast, and deploy consistently from laptop to production.',
              hinglish:
                'Docker ek app ko uske poore environment ke saath ek portable container mein pack kar deta hai jo har machine pe same chalta hai — isliye teams ise "mere machine pe chal raha tha" bugs khatam karne, developers ko jaldi onboard karne, aur laptop se production tak consistent deploy karne ke liye use karti hain.',
            },
          },
        ],
      },
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
          {
            question: 'Why are containers lighter and faster to start than virtual machines?',
            options: [
              'Containers use less code',
              'Containers share the host OS kernel instead of running a full guest OS',
              'Containers do not run any processes',
              'VMs are actually faster',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a Docker container and a virtual machine?',
            difficulty: 'easy',
            frequency: 'common',
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
          {
            question: 'What is the purpose of a .dockerignore file?',
            options: [
              'It lists files Docker must include',
              'It excludes files (like node_modules, .git, .env) from being copied into the build context/image',
              'It configures the container network',
              'It is required for CMD to work',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why is `node:20-alpine` often preferred as a base image over `node:20`?',
            options: [
              'Alpine has more built-in tools',
              'Alpine is a much smaller Linux distribution, producing smaller, leaner images',
              'Alpine runs faster JavaScript',
              'There is no difference',
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
          {
            question: 'What does the `volumes` key do in docker-compose.yml?',
            options: [
              'It scales the number of containers',
              'It persists data outside the container lifecycle, so data survives container restarts/removal',
              'It sets environment variables',
              'It builds the Docker image',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does `docker compose down -v` do that plain `docker compose down` does not?',
            options: [
              'Nothing extra',
              'It also removes the named volumes, deleting persisted data',
              'It verbosely logs output only',
              'It rebuilds all images',
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
      {
        title: 'Docker Volumes & Networking',
        difficulty: 'medium',
        tags: ['volumes', 'networking', 'bind-mount', 'bridge'],
        explanation: {
          english:
            "Two things trip up almost every Docker beginner: containers lose all their data when removed, and containers can't reach each other by default. Understanding volumes and networking fixes both.\n\n**Volumes (data persistence)**: a container's filesystem is ephemeral — when the container is removed, everything written inside it is gone. Volumes solve this by mounting storage from OUTSIDE the container's lifecycle:\n- **Named volumes** (`mongo_data:/data/db`) — Docker manages the storage location; best for databases, survives `docker compose down` (but not `-v`).\n- **Bind mounts** (`.:/app`) — maps a folder from your actual filesystem into the container; best for development, so code edits on your host instantly appear inside the running container (hot reload).\n\n**Networking**: by default, Docker creates a **bridge network** for each `docker-compose` project. Every service on that network can reach every other service using its SERVICE NAME as a hostname (Docker's built-in DNS resolves it) — this is why `mongodb://mongo:27017` works instead of needing an IP address. Containers on different networks (or run with plain `docker run` without a shared network) CANNOT see each other by default — this isolation is a deliberate security boundary, not a bug. You can also use `host` networking (container shares the host's network stack directly, no isolation, rarely needed) or create custom networks to group only the services that should talk to each other.",
          hinglish:
            "Do cheezein almost har Docker beginner ko confuse karti hain: containers remove hone par apna saara data kho dete hain, aur containers by default ek doosre tak nahi pahunch pate. Volumes aur networking samajhna dono fix karta hai.\n\n**Volumes (data persistence)**: ek container ka filesystem ephemeral hota hai — container remove hone par jo bhi andar likha gaya wo chala jaata hai. Volumes ise solve karte hain storage ko container ke lifecycle ke BAHAR mount karke:\n- **Named volumes** (`mongo_data:/data/db`) — Docker storage location manage karta hai; databases ke liye best, `docker compose down` survive karta hai (par `-v` nahi).\n- **Bind mounts** (`.:/app`) — tumhare actual filesystem ke folder ko container mein map karta hai; development ke liye best, taaki host pe code edits turant running container ke andar dikhein (hot reload).\n\n**Networking**: default se, Docker har `docker-compose` project ke liye ek **bridge network** banata hai. Us network ke har service dusri service tak apne SERVICE NAME ko hostname ki tarah use karke pahunch sakti hai (Docker ka built-in DNS ise resolve karta hai) — isiliye `mongodb://mongo:27017` kaam karta hai, IP address ki zaroorat nahi. Alag networks pe (ya plain `docker run` bina shared network ke) chal rahe containers by default ek doosre ko NAHI dekh sakte — ye isolation deliberate security boundary hai, bug nahi. Tum `host` networking (container host ka network stack directly share karta hai, koi isolation nahi, rarely zaroori) bhi use kar sakte ho ya custom networks bana sakte ho sirf un services ko group karne ke liye jinhe baat karni chahiye.",
        },
        dailyLifeExample:
          "Volumes waise hain jaise hostel ke kamre (container) ka saaman apne locker (host filesystem) mein rakhna — kamra khaali karne (container remove) pe bhi locker ka saaman surakshit rehta hai. Networking waise hai jaise ek hostel building ke andar sab rooms intercom se baat kar sakte hain (bridge network, service name se), par doosri building (alag network) ke rooms se seedha baat nahi ho sakti — dono buildings ko jodne wala ek gate (custom network) chahiye.",
        codeExample:
          "# Named volume (Docker manages storage, best for databases)\n# volumes:\n#   - mongo_data:/data/db\n\n# Bind mount (maps host folder, best for dev hot-reload)\n# volumes:\n#   - .:/app              # host's current dir -> container's /app\n#   - /app/node_modules   # exclude node_modules from the bind mount\n\n# Networking: services on the same compose project reach each other by name\n# api service connecting to mongo service:\n#   MONGODB_URI=mongodb://mongo:27017/mydb\n#                          ^^^^^ service name = hostname (Docker DNS)\n\n# Custom network (isolate a subset of services)\n# networks:\n#   backend:\n# services:\n#   api:\n#     networks: [backend]\n#   mongo:\n#     networks: [backend]\n#   public-web:          # NOT on 'backend' -> cannot reach mongo directly",
        keyPoints: [
          "A container's own filesystem is ephemeral — data is lost when the container is removed",
          'Named volumes: Docker-managed persistent storage, best for databases',
          'Bind mounts: map a host folder into the container, best for development hot-reload',
          'Docker Compose creates a bridge network where services reach each other by service name (built-in DNS)',
          'Containers on different networks cannot see each other by default — a deliberate security isolation',
        ],
        quiz: [
          {
            question: "What happens to data written inside a container's filesystem if the container is removed without a volume?",
            options: [
              'It is automatically backed up',
              'It is lost, because a container\'s filesystem is ephemeral',
              'It moves to the host automatically',
              'Nothing changes, data persists forever',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the key difference between a named volume and a bind mount?',
            options: [
              'They are identical',
              'A named volume is Docker-managed storage (good for databases); a bind mount maps an actual host folder (good for dev hot-reload)',
              'Bind mounts only work in production',
              'Named volumes cannot store any data',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why does `mongodb://mongo:27017` work as a connection string inside a docker-compose project?',
            options: [
              'mongo is a reserved global hostname on the internet',
              'Docker Compose\'s bridge network lets services resolve each other by service name via built-in DNS',
              'It only works if you hardcode the container\'s IP address',
              'It is a coincidence and does not actually work',
            ],
            correctIndex: 1,
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
          {
            question: 'How does Vercel handle HTTPS and CDN for a deployed app?',
            options: [
              'You must configure them manually with certificates',
              'They are included automatically — HTTPS and CDN distribution come out of the box',
              'Only paid plans get HTTPS',
              'Vercel does not support CDN',
            ],
            correctIndex: 1,
          },
          {
            question: 'Where should you set secrets like JWT_SECRET for a Vercel deployment?',
            options: [
              'Hardcoded directly in the source code',
              'In the Vercel dashboard/CLI environment variables, never in code',
              'In a public README',
              'In the vercel.json file committed to Git',
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
          {
            question: 'What must your package.json typically define for Railway to run your app?',
            options: [
              'A "test" script only',
              'A "start" script that Railway runs to launch the app',
              'Nothing, Railway ignores package.json',
              'A "lint" script',
            ],
            correctIndex: 1,
          },
          {
            question: 'How is Railway pricing typically structured?',
            options: [
              'Always completely free forever',
              'Pay-per-use, with a free trial to get started',
              'A one-time lifetime fee only',
              'Free only for enterprise customers',
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
          {
            question: 'Where should secrets like an API token be stored for use in a GitHub Actions workflow?',
            options: [
              'Directly in the .yml workflow file',
              'In GitHub repo Settings > Secrets, referenced as ${{ secrets.NAME }}',
              'In a public gist',
              'In the README',
            ],
            correctIndex: 1,
          },
          {
            question: 'What triggers the workflow defined under the `on:` key with `push: branches: [main]`?',
            options: [
              'Nothing, it must be run manually',
              'Any push to the main branch',
              'Only pull request comments',
              'A scheduled cron job only',
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
      {
        title: 'Container Health, Restart Policies & Non-Root Users',
        difficulty: 'medium',
        tags: ['healthcheck', 'restart-policy', 'security', 'non-root'],
        explanation: {
          english:
            "A container that starts successfully isn't the same as a container that's actually working — and a container running as root is a security risk most beginners never think about. Three production hardening practices:\n\n**Health checks**: a `HEALTHCHECK` instruction in the Dockerfile (or `healthcheck:` in compose) tells Docker how to actively verify the app inside is truly responsive — not just that the process is running, but that it can answer requests (e.g. `curl -f http://localhost:3000/health`). Docker marks the container `unhealthy` if checks keep failing, and orchestrators (Docker Swarm, Kubernetes) use this to automatically replace broken containers.\n\n**Restart policies**: tell Docker what to do if a container crashes. `no` (default, do nothing), `on-failure` (restart only on non-zero exit code, useful with a retry limit), `always` (always restart, even after a manual stop and daemon restart), `unless-stopped` (like always, but respects a manual stop). Production services almost always use `unless-stopped` or `always`.\n\n**Running as non-root**: by default, processes inside a container run as `root` — if an attacker exploits the app, they get root INSIDE the container, and depending on misconfiguration, that can be a stepping stone to the host. Best practice: create and switch to a dedicated non-root user in the Dockerfile (`USER appuser`), so even a compromised app process has minimal privileges.",
          hinglish:
            "Ek container jo successfully start ho jaaye, wo same nahi hai jaise ek container jo actually kaam kar raha ho — aur root ke roop mein chal raha container ek security risk hai jo zyadatar beginners kabhi sochte hi nahi. Teen production hardening practices:\n\n**Health checks**: Dockerfile mein ek `HEALTHCHECK` instruction (ya compose mein `healthcheck:`) Docker ko batata hai andar ki app actually responsive hai ya nahi verify kaise karein — sirf ye nahi ki process chal raha hai, balki ki wo requests ka answer de sakta hai (jaise `curl -f http://localhost:3000/health`). Agar checks fail hote rehte hain to Docker container ko `unhealthy` mark karta hai, aur orchestrators (Docker Swarm, Kubernetes) ise use karke broken containers automatically replace karte hain.\n\n**Restart policies**: Docker ko batati hain agar container crash ho jaaye to kya karna hai. `no` (default, kuch nahi karna), `on-failure` (sirf non-zero exit code pe restart, retry limit ke saath useful), `always` (hamesha restart, manual stop aur daemon restart ke baad bhi), `unless-stopped` (always jaisa, par manual stop respect karta hai). Production services almost hamesha `unless-stopped` ya `always` use karti hain.\n\n**Non-root ke roop mein chalana**: default se, container ke andar processes `root` ke roop mein chalti hain — agar koi attacker app exploit kar le, unhe container KE ANDAR root milta hai, aur misconfiguration ke hisaab se ye host tak pahunchne ka ek stepping stone ban sakta hai. Best practice: Dockerfile mein ek dedicated non-root user banao aur uspe switch karo (`USER appuser`), taaki compromised app process ke paas bhi minimal privileges hon.",
        },
        dailyLifeExample:
          "Health check waise hai jaise ek security guard sirf ye nahi dekhta ki koi building ke andar khada hai (process running), balki ye check karta hai ki wo actually kaam kar raha hai (responds to requests). Restart policy waise hai jaise emergency mein automatically backup generator start hona. Non-root user waise hai jaise ek naye employee ko sirf uske kaam ke liye zaroori chaabiyan dena, master key nahi — agar unka access misuse ho, damage limited rehta hai.",
        codeExample:
          "# Dockerfile: HEALTHCHECK + non-root user\nFROM node:20-alpine\n\n# Create a dedicated non-root user\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\n\nWORKDIR /app\nCOPY --chown=appuser:appgroup . .\nRUN npm ci --only=production\n\n# Switch to non-root user for everything after this line\nUSER appuser\n\nHEALTHCHECK --interval=30s --timeout=3s --retries=3 \\\n  CMD curl -f http://localhost:3000/health || exit 1\n\nCMD [\"node\", \"server.js\"]\n\n# docker-compose.yml: restart policy\n# services:\n#   api:\n#     restart: unless-stopped   # restarts on crash, respects manual stop\n#     healthcheck:\n#       test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:3000/health\"]\n#       interval: 30s\n#       retries: 3",
        keyPoints: [
          'A HEALTHCHECK verifies the app is actually responsive, not just that the process started',
          'Orchestrators use health status to automatically replace unhealthy containers',
          'Restart policies (no, on-failure, always, unless-stopped) control crash recovery behaviour',
          'Production services typically use `unless-stopped` or `always`',
          'Running as a dedicated non-root user (USER instruction) limits the blast radius if the app is compromised',
        ],
        quiz: [
          {
            question: 'What does a Docker HEALTHCHECK actually verify?',
            options: [
              'Only that the container process has started',
              'That the app inside is actively responsive (e.g. answers an HTTP endpoint), not just running',
              'The size of the Docker image',
              'The number of CPU cores available',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which restart policy would a production service typically use to recover from crashes while still respecting a manual stop?',
            options: ['no', 'unless-stopped', 'It does not matter', 'never restart automatically'],
            correctIndex: 1,
          },
          {
            question: 'Why is running a container process as a non-root user considered a security best practice?',
            options: [
              'It makes the container start faster',
              'It limits the privileges an attacker gains if they manage to exploit the running application',
              'Root users are not supported by Docker',
              'It has no security benefit',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Container Orchestration & Kubernetes Basics',
        difficulty: 'hard',
        tags: ['kubernetes', 'orchestration', 'pods', 'scaling'],
        explanation: {
          english:
            "docker-compose is great for one machine, but production systems often need MANY machines, automatic recovery from failures, and zero-downtime rollouts — this is what **Kubernetes (K8s)** provides. It's mentioned constantly in job listings but rarely explained simply.\n\nKubernetes is a container **orchestrator**: you describe the DESIRED state of your system (\"I want 5 copies of this app running, each with these resources\"), and Kubernetes continuously works to make reality match that description — restarting crashed containers, rescheduling them onto healthy machines, and scaling up or down.\n\nKey building blocks:\n- **Pod**: the smallest deployable unit — one or more tightly-coupled containers that share networking/storage (usually just one container per pod in practice).\n- **Deployment**: describes how many replicas (copies) of a pod should run and manages rolling updates (replacing old pods with new ones gradually, with zero downtime).\n- **Service**: a stable network endpoint/name that load-balances traffic across a Deployment's pods, even as individual pods are replaced (pods get new IPs each time they restart, but the Service address stays constant).\n- **Node**: a physical or virtual machine that runs pods; a cluster has many nodes.\n- **kubectl**: the CLI used to talk to a Kubernetes cluster (`kubectl apply -f deployment.yaml`, `kubectl get pods`, `kubectl scale deployment myapp --replicas=10`).\n\nWhen do you actually need it? Compose is enough for most small-to-medium apps on a single server. Kubernetes earns its complexity when you have multiple services that need to scale independently across many machines, need self-healing at scale, or need zero-downtime rolling deployments across a large fleet.",
          hinglish:
            "docker-compose ek machine ke liye badhiya hai, par production systems ko aksar BAHUT saari machines, failures se automatic recovery, aur zero-downtime rollouts chahiye hote hain — yahi **Kubernetes (K8s)** deta hai. Job listings mein ye constantly mention hota hai par simply kam hi explain hota hai.\n\nKubernetes ek container **orchestrator** hai: tum apne system ka DESIRED state describe karte ho (\"main is app ki 5 copies chahta hoon, har ek in resources ke saath\"), aur Kubernetes continuously kaam karta hai us description se reality match karne ke liye — crashed containers restart karke, healthy machines pe unhe reschedule karke, aur scale up ya down karke.\n\nKey building blocks:\n- **Pod**: sabse chhota deployable unit — ek ya zyada tightly-coupled containers jo networking/storage share karte hain (practically usually ek pod mein ek hi container).\n- **Deployment**: describe karta hai ki ek pod ke kitne replicas (copies) chalne chahiye aur rolling updates manage karta hai (purane pods ko dheere-dheere naye se replace karna, zero downtime ke saath).\n- **Service**: ek stable network endpoint/name jo ek Deployment ke pods ke across traffic load-balance karta hai, chahe individual pods replace ho rahe hon (pods har restart pe naye IPs paate hain, par Service address constant rehta hai).\n- **Node**: ek physical ya virtual machine jo pods chalata hai; ek cluster mein bahut saare nodes hote hain.\n- **kubectl**: CLI jo Kubernetes cluster se baat karne ke liye use hota hai (`kubectl apply -f deployment.yaml`, `kubectl get pods`, `kubectl scale deployment myapp --replicas=10`).\n\nActually kab chahiye? Zyadatar chhoti-medium apps ke liye ek single server pe Compose kaafi hai. Kubernetes apni complexity tab justify karta hai jab tumhare paas multiple services hon jinhe bahut saari machines ke across independently scale karna ho, scale pe self-healing chahiye ho, ya ek badi fleet ke across zero-downtime rolling deployments chahiye hon.",
        },
        dailyLifeExample:
          "Kubernetes waise hai jaise ek bade restaurant chain ka head office jo har branch (node) ko batata hai kitne staff (pods) chahiye, aur agar koi branch mein staff kam pade (crash), automatically naya staff bhej deta hai — bina kisi manager ko manually call kiye. Service waise hai jaise ek central customer helpline number jo hamesha same rehta hai, chahe call kaunsa specific staff member attend kare.",
        codeExample:
          "# deployment.yaml (simplified)\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-app\nspec:\n  replicas: 5              # I want 5 copies running\n  selector:\n    matchLabels:\n      app: my-app\n  template:\n    metadata:\n      labels:\n        app: my-app\n    spec:\n      containers:\n        - name: my-app\n          image: my-app:latest\n          ports:\n            - containerPort: 3000\n\n# Basic kubectl commands\n# kubectl apply -f deployment.yaml     # create/update the deployment\n# kubectl get pods                      # see running pods\n# kubectl scale deployment my-app --replicas=10   # scale up\n# kubectl rollout status deployment my-app        # watch a rolling update",
        keyPoints: [
          'Kubernetes is a container orchestrator: you declare desired state, it continuously reconciles reality to match',
          'Pod: smallest deployable unit; Deployment: manages replicas and rolling updates',
          'Service: stable network endpoint that load-balances across a Deployment\'s pods',
          'kubectl is the CLI for interacting with a Kubernetes cluster',
          'Use Compose for single-machine apps; reach for Kubernetes when you need multi-machine scale and self-healing',
        ],
        quiz: [
          {
            question: 'What does it mean that Kubernetes works from a "desired state"?',
            options: [
              'You manually restart every failed container yourself',
              'You declare what you want (e.g. 5 replicas running), and Kubernetes continuously acts to make reality match that description',
              'Kubernetes has no concept of state',
              'It only applies to databases',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why does a Kubernetes Service exist, given that individual pods get new IPs when restarted?',
            options: [
              'It does not matter, pods never restart',
              'A Service provides a stable network endpoint that load-balances traffic to the current pods, regardless of their changing IPs',
              'Services replace the need for pods entirely',
              'Services are only used for databases',
            ],
            correctIndex: 1,
          },
          {
            question: 'When does it typically make sense to move from docker-compose to Kubernetes?',
            options: [
              'Immediately for every project, regardless of size',
              'When you need multi-machine scaling, self-healing at scale, and zero-downtime rolling deployments across a large fleet',
              'Never, Kubernetes is always worse than Compose',
              'Only for static websites with no backend',
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

  // ─── Containers & Images ────────────────────────────────────
  {
    question: 'What is the difference between a container and a virtual machine?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A VM virtualises HARDWARE and runs a complete guest operating system with its own kernel, so it boots in tens of seconds and costs gigabytes. A container virtualises the OPERATING SYSTEM: it shares the host kernel and isolates processes using namespaces and cgroups, so it starts in milliseconds and costs megabytes. The trade is isolation strength — a VM boundary is much harder to escape, which is why untrusted multi-tenant workloads still often use VMs or microVMs.',
      hinglish:
        'Ek VM HARDWARE virtualise karta hai aur apne kernel wala ek poora guest operating system chalata hai, isliye ye das-bees second mein boot hota hai aur gigabytes leta hai. Ek container OPERATING SYSTEM virtualise karta hai: ye host kernel share karta hai aur namespaces aur cgroups se processes alag karta hai, isliye ye millisecond mein shuru hota hai aur megabytes leta hai. Trade isolation ki majbooti hai — ek VM boundary se nikalna bahut mushkil hai, isiliye untrusted multi-tenant workloads aksar abhi bhi VMs ya microVMs use karte hain.',
    },
  },
  {
    question: 'What is the difference between an image and a container?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'An IMAGE is an immutable, layered template — a filesystem snapshot plus metadata such as the default command and environment. A CONTAINER is a running instance of that image, with a thin WRITABLE layer on top. The class-versus-object analogy holds: one image can back hundreds of containers, and each container\'s writes stay in its own layer, which is why they vanish when the container is removed unless you use a volume.',
      hinglish:
        'Ek IMAGE ek immutable, layered template hai — ek filesystem snapshot plus metadata jaise default command aur environment. Ek CONTAINER us image ka ek chalta instance hai, upar ek patli WRITABLE layer ke saath. Class-versus-object ki upma sahi baithti hai: ek image sau containers chala sakti hai, aur har container ke writes uski apni layer mein rehte hain, isiliye container hatane pe wo gayab ho jaate hain jab tak tum ek volume use na karo.',
    },
  },
  {
    question: 'How does Docker layer caching work and how do you optimise for it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Each Dockerfile instruction creates a layer, and Docker reuses a cached layer only if that instruction and everything before it are unchanged. Once one layer is invalidated, every layer after it rebuilds. The practical consequence: copy your dependency manifest and install dependencies BEFORE copying source code, so a code change does not reinstall every package. `COPY . .` early in a Dockerfile is the single most common cause of slow builds.',
      hinglish:
        'Har Dockerfile instruction ek layer banata hai, aur Docker ek cached layer sirf tab dobara use karta hai jab wo instruction aur usse pehle sab kuch unchanged ho. Ek layer invalid hote hi, uske baad ki har layer dobara banti hai. Practical nateeja: source code copy karne se PEHLE apna dependency manifest copy karke dependencies install karo, taaki ek code change har package dobara install na kare. Ek Dockerfile mein jaldi `COPY . .` slow builds ka sabse common karan hai.',
    },
  },
  {
    question: 'What is the difference between CMD and ENTRYPOINT?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`ENTRYPOINT` defines the executable that always runs; `CMD` provides default ARGUMENTS that a user can override at `docker run`. Used together — `ENTRYPOINT ["node"]` with `CMD ["server.js"]` — the container behaves like a command-line tool. Using `CMD` alone means any argument replaces the whole command. Also prefer the exec form (a JSON array) over shell form, because shell form wraps the process in `/bin/sh -c`, which swallows signals and breaks graceful shutdown.',
      hinglish:
        '`ENTRYPOINT` wo executable define karta hai jo hamesha chalta hai; `CMD` default ARGUMENTS deta hai jinhe user `docker run` pe override kar sakta hai. Saath use karne pe — `ENTRYPOINT ["node"]` ke saath `CMD ["server.js"]` — container ek command-line tool ki tarah behave karta hai. Akela `CMD` use karne ka matlab hai ki koi bhi argument poora command replace kar deta hai. Shell form ke bajaye exec form (ek JSON array) prefer karo, kyunki shell form process ko `/bin/sh -c` mein wrap karta hai, jo signals nigal leta hai aur graceful shutdown todta hai.',
    },
  },
  {
    question: 'What is the difference between COPY and ADD?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`COPY` simply copies files from build context into the image and does nothing else. `ADD` does the same but additionally auto-extracts local tar archives and can fetch remote URLs. Because those extra behaviours are implicit and occasionally surprising — an accidentally extracted archive, an unverified remote download — the convention is to use `COPY` always, and reach for `ADD` only when you specifically want tar extraction.',
      hinglish:
        '`COPY` bas build context se files image mein copy karta hai aur kuch nahi karta. `ADD` wahi karta hai par upar se local tar archives auto-extract karta hai aur remote URLs la sakta hai. Kyunki wo extra behaviours implicit aur kabhi-kabhi chaunkane wale hain — ek galti se extract hua archive, ek unverified remote download — convention ye hai ki hamesha `COPY` use karo, aur `ADD` sirf tab uthao jab tumhe khaas taur pe tar extraction chahiye.',
    },
  },
  {
    question: 'What is a .dockerignore file and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'It excludes paths from the BUILD CONTEXT — the set of files sent to the Docker daemon before the build begins. Without it, `node_modules`, `.git`, and build output are uploaded on every build, which is slow and can add gigabytes. It also matters for security: without it a `COPY . .` can bake your `.env` or SSH keys into the image, where they persist in a layer even if a later instruction deletes them.',
      hinglish:
        'Ye BUILD CONTEXT se paths hataata hai — wo files ka set jo build shuru hone se pehle Docker daemon ko bheja jaata hai. Iske bina, `node_modules`, `.git`, aur build output har build pe upload hote hain, jo slow hai aur gigabytes jod sakta hai. Ye security ke liye bhi matter karta hai: iske bina ek `COPY . .` tumhare `.env` ya SSH keys ko image mein pakaa sakta hai, jahan wo ek layer mein rehte hain chahe ek baad ka instruction unhe delete kar de.',
    },
  },
  {
    question: 'How do you keep Docker images small?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use multi-stage builds so build tools never reach the final image. Start from a slim base — alpine, slim, or distroless. Combine RUN commands and clean package caches in the SAME instruction, since deleting a file in a later layer does not shrink the image. Install only production dependencies. Add a `.dockerignore`. Smaller images pull faster, start faster, cost less to store, and have a materially smaller vulnerability surface.',
      hinglish:
        'Multi-stage builds use karo taaki build tools kabhi final image tak na pahunchein. Ek slim base se shuru karo — alpine, slim, ya distroless. RUN commands ko jodo aur package caches USI instruction mein saaf karo, kyunki ek baad ki layer mein file delete karna image chhoti nahi karta. Sirf production dependencies install karo. Ek `.dockerignore` jodo. Chhoti images tez pull hoti hain, tez shuru hoti hain, store karna sasta hai, aur unka vulnerability surface kaafi chhota hota hai.',
    },
  },
  {
    question: 'What is the difference between a volume and a bind mount?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A VOLUME is managed by Docker in its own storage area, is portable, works identically across platforms, and is the right choice for production data such as a database. A BIND MOUNT maps a specific host directory into the container, so changes on either side are immediately visible — ideal for local development with hot reload. Bind mounts depend on the host path existing and bring permission and performance quirks, especially on Windows and macOS.',
      hinglish:
        'Ek VOLUME Docker apne storage area mein manage karta hai, portable hai, saare platforms pe ek jaisa kaam karta hai, aur ek database jaise production data ke liye sahi choice hai. Ek BIND MOUNT ek khaas host directory container mein map karta hai, isliye kisi bhi taraf ke changes turant dikhte hain — hot reload wale local development ke liye ideal. Bind mounts host path ke exist karne pe depend karte hain aur permission aur performance ki ajeeb baatein laate hain, khaas kar Windows aur macOS pe.',
    },
  },
  {
    question: 'What happens to data when a container is deleted?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Anything written to the container\'s writable layer is destroyed with it — containers are EPHEMERAL by design. Only data in a volume or bind mount survives. This is why running a database in a container without a volume loses everything on the next deploy, and it is one of the most common beginner mistakes. The correct mental model is that containers are disposable and all state must live outside them.',
      hinglish:
        'Container ki writable layer mein jo bhi likha gaya wo uske saath nasht ho jaata hai — containers design se KSHANIK hain. Sirf ek volume ya bind mount ka data bachta hai. Isiliye bina volume ke ek container mein database chalana agle deploy pe sab kuch kho deta hai, aur ye sabse common beginner mistakes mein se ek hai. Sahi mental model ye hai ki containers disposable hain aur saari state unke bahar rehni chahiye.',
    },
  },
  {
    question: 'What is Docker Compose and when do you use it?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Compose defines a multi-container application in a single YAML file — services, networks, volumes, environment, and dependencies — so `docker compose up` starts the whole stack. It is ideal for local development and simple single-host deployments, and it puts your environment in version control so a new developer is productive in one command. It is not an orchestrator: it has no multi-host scheduling, self-healing, or rolling updates, which is where Kubernetes begins.',
      hinglish:
        'Compose ek multi-container application ko ek single YAML file mein define karta hai — services, networks, volumes, environment, aur dependencies — isliye `docker compose up` poora stack shuru kar deta hai. Ye local development aur simple single-host deployments ke liye ideal hai, aur ye tumhara environment version control mein daal deta hai taaki ek naya developer ek command mein productive ho. Ye ek orchestrator nahi hai: ismein multi-host scheduling, self-healing, ya rolling updates nahi, jahan se Kubernetes shuru hota hai.',
    },
  },
  {
    question: 'How do containers communicate with each other?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Containers on the same user-defined bridge network reach each other by SERVICE NAME, which Docker\'s embedded DNS resolves — so an app connects to `postgres:5432` with no IP addresses involved. The default bridge network does NOT provide name resolution, which is why Compose creates its own network automatically. Containers on different networks cannot reach each other at all, which is a useful way to isolate a database from anything that should not touch it.',
      hinglish:
        'Ek hi user-defined bridge network ke containers ek doosre tak SERVICE NAME se pahunchte hain, jise Docker ka embedded DNS resolve karta hai — isliye ek app `postgres:5432` se judta hai bina kisi IP address ke. Default bridge network name resolution NAHI deta, isiliye Compose apna network automatically banata hai. Alag networks ke containers ek doosre tak bilkul nahi pahunch sakte, jo ek database ko us sab se alag karne ka ek useful tareeka hai jise use nahi chhoona chahiye.',
    },
  },
  {
    question: 'What is the difference between EXPOSE and publishing a port?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`EXPOSE` in a Dockerfile is DOCUMENTATION — it records which port the application listens on and makes it discoverable, but it does not open anything. Publishing with `-p 8080:80` actually maps a host port to a container port so traffic from outside can reach it. Containers on the same network can already reach each other on any port regardless of EXPOSE, so publishing is only needed for access from the host or the internet.',
      hinglish:
        'Ek Dockerfile mein `EXPOSE` DOCUMENTATION hai — ye record karta hai ki application kaunse port pe sunti hai aur use discoverable banata hai, par ye kuch kholta nahi. `-p 8080:80` se publish karna actually ek host port ko ek container port pe map karta hai taaki bahar ka traffic wahan pahunch sake. Ek hi network ke containers EXPOSE chahe kuch bhi ho pehle se kisi bhi port pe ek doosre tak pahunch sakte hain, isliye publishing sirf host ya internet se access ke liye chahiye.',
    },
  },
  {
    question: 'How do you handle secrets in Docker?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Never bake them into the image — an `ENV` or a `COPY .env` persists in a layer that anyone with the image can read, even if a later instruction deletes the file. Options: pass environment variables at RUN time, mount a secret file as a volume, use Docker secrets in Swarm or Kubernetes Secrets, or pull from a manager such as Vault or AWS Secrets Manager at startup. For build-time secrets, BuildKit\'s `--mount=type=secret` keeps them out of layers entirely.',
      hinglish:
        'Unhe kabhi image mein mat pakao — ek `ENV` ya ek `COPY .env` ek layer mein rehta hai jise image wala koi bhi padh sakta hai, chahe ek baad ka instruction file delete kar de. Options: RUN time pe environment variables pass karo, ek secret file ko ek volume ki tarah mount karo, Swarm mein Docker secrets ya Kubernetes Secrets use karo, ya startup pe Vault ya AWS Secrets Manager jaise manager se lao. Build-time secrets ke liye, BuildKit ka `--mount=type=secret` unhe layers se poori tarah bahar rakhta hai.',
    },
  },
  {
    question: 'Why should containers not run as root?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'By default the container process runs as root, and if an attacker achieves code execution they start with root inside the container — which combined with a kernel vulnerability or a careless mount can become root on the HOST. Create a non-root user in the Dockerfile and switch to it with `USER`. Combine that with a read-only root filesystem, dropped capabilities, and `no-new-privileges`. It is one line of Dockerfile for a substantial reduction in blast radius.',
      hinglish:
        'Default se container process root ke roop mein chalta hai, aur agar ek attacker code execution paa le to wo container ke andar root se shuru karta hai — jo ek kernel vulnerability ya ek laparwah mount ke saath milkar HOST pe root ban sakta hai. Dockerfile mein ek non-root user banao aur `USER` se us pe switch karo. Use ek read-only root filesystem, hataayi gayi capabilities, aur `no-new-privileges` ke saath jodo. Ye blast radius mein ek bade kami ke liye Dockerfile ki ek line hai.',
    },
  },
  {
    question: 'What is a health check in Docker and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`HEALTHCHECK` runs a command periodically and marks the container healthy or unhealthy. It matters because a process being alive does not mean it is SERVING — an app can be running while its database connection is dead. Orchestrators use health status to decide when to route traffic and when to restart. Keep the check lightweight and dependency-aware, and distinguish LIVENESS (should I restart this?) from READINESS (should I send it traffic?).',
      hinglish:
        '`HEALTHCHECK` ek command samay-samay pe chalata hai aur container ko healthy ya unhealthy mark karta hai. Ye isliye matter karta hai kyunki ek process zinda hone ka matlab ye nahi ki wo SERVE kar raha hai — ek app chal sakta hai jabki uska database connection mar chuka ho. Orchestrators health status se decide karte hain ki traffic kab bhejein aur kab restart karein. Check ko halka aur dependency-aware rakho, aur LIVENESS (kya main ise restart karoon?) ko READINESS (kya main ise traffic bhejoon?) se alag karo.',
    },
  },
  {
    question: 'How should logs be handled in a containerised application?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Write to STDOUT and STDERR rather than to files inside the container. Files disappear when the container does, are hard to collect, and fill the writable layer. Docker captures the streams and a logging driver forwards them to a central system such as Loki, CloudWatch, or the ELK stack. Use structured JSON so logs are queryable, include a correlation ID, and configure rotation so the default json-file driver does not fill the host disk.',
      hinglish:
        'Container ke andar files ke bajaye STDOUT aur STDERR pe likho. Files container ke saath gayab ho jaati hain, unhe ikattha karna mushkil hai, aur wo writable layer bhar deti hain. Docker streams capture karta hai aur ek logging driver unhe Loki, CloudWatch, ya ELK stack jaise ek central system tak bhejta hai. Structured JSON use karo taaki logs queryable hon, ek correlation ID daalo, aur rotation configure karo taaki default json-file driver host disk na bhar de.',
    },
  },
  {
    question: 'What is the difference between docker stop and docker kill?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`docker stop` sends SIGTERM, waits a grace period (10 seconds by default), then sends SIGKILL — giving the process a chance to finish in-flight requests and close connections. `docker kill` sends SIGKILL immediately with no cleanup. Always prefer `stop`, and make sure your app actually HANDLES SIGTERM; a Node app that ignores it gets killed after the grace period regardless, dropping live requests on every deploy.',
      hinglish:
        '`docker stop` SIGTERM bhejta hai, ek grace period (default 10 second) rukta hai, phir SIGKILL bhejta hai — process ko in-flight requests khatam karne aur connections band karne ka mauka dete hue. `docker kill` bina kisi cleanup ke turant SIGKILL bhejta hai. Hamesha `stop` prefer karo, aur pakka karo ki tumhara app actually SIGTERM HANDLE karta hai; ek Node app jo ise ignore karta hai grace period ke baad waise bhi maara jaata hai, har deploy pe live requests girate hue.',
    },
  },
  {
    question: 'What is Docker Swarm and how does it compare to Kubernetes?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'SWARM is Docker\'s built-in orchestrator: simple, using nearly the same syntax as Compose, and quick to set up for a small cluster. KUBERNETES is far more capable — sophisticated scheduling, autoscaling, a huge ecosystem, and support from every cloud provider — but the learning curve and operational burden are substantially higher. Swarm suits small teams and simple workloads; Kubernetes has won the industry standard position, so most tooling and hiring assume it.',
      hinglish:
        'SWARM Docker ka built-in orchestrator hai: simple, Compose jaisa hi syntax use karta hua, aur ek chhote cluster ke liye jaldi set hone wala. KUBERNETES bahut zyada saksham hai — sophisticated scheduling, autoscaling, ek bada ecosystem, aur har cloud provider se support — par learning curve aur operational bojh kaafi zyada hai. Swarm chhoti teams aur simple workloads ko suit karta hai; Kubernetes ne industry standard ki jagah jeet li hai, isliye zyadatar tooling aur hiring use maan kar chalti hai.',
    },
  },
  {
    question: 'What is a Kubernetes pod?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A pod is the smallest deployable unit in Kubernetes — one or more containers that SHARE a network namespace, IP address, and storage volumes, and are always scheduled together on one node. Usually a pod holds one application container plus optional sidecars for logging, proxying, or metrics. Pods are ephemeral and get new IPs when recreated, which is exactly why Services exist to provide a stable address.',
      hinglish:
        'Ek pod Kubernetes ki sabse chhoti deployable unit hai — ek ya zyada containers jo ek network namespace, IP address, aur storage volumes SHARE karte hain, aur hamesha ek node pe saath schedule hote hain. Usually ek pod ek application container plus logging, proxying, ya metrics ke liye optional sidecars rakhta hai. Pods kshanik hain aur dobara banne pe naye IPs paate hain, isiliye ek sthir address dene ke liye Services exist karti hain.',
    },
  },
  {
    question: 'What is the difference between a Deployment and a StatefulSet?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A DEPLOYMENT manages interchangeable, stateless pods: they have random names, any one can serve any request, and they can be created or destroyed in any order. A STATEFULSET gives each pod a stable identity — an ordinal name, a persistent volume that follows it, and ordered startup and shutdown. Databases, message queues, and anything where pod-0 differs meaningfully from pod-1 need a StatefulSet; web servers do not.',
      hinglish:
        'Ek DEPLOYMENT badle ja sakne wale, stateless pods manage karta hai: unke random naam hote hain, koi bhi ek koi bhi request serve kar sakta hai, aur wo kisi bhi order mein bane ya nasht ho sakte hain. Ek STATEFULSET har pod ko ek sthir pehchaan deta hai — ek ordinal naam, ek persistent volume jo uske saath chalta hai, aur ordered startup aur shutdown. Databases, message queues, aur jahan bhi pod-0 pod-1 se meaningfully alag hai unhe StatefulSet chahiye; web servers ko nahi.',
    },
  },
  {
    question: 'What is a Kubernetes Service and what are its types?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A Service gives a stable DNS name and virtual IP in front of a changing set of pods, load-balancing across whichever pods currently match its selector. CLUSTERIP is internal only and is the default. NODEPORT opens a fixed port on every node. LOADBALANCER provisions a cloud load balancer. An INGRESS is not a Service type but a separate resource routing HTTP by host and path, which is how you expose many services behind a single address with TLS.',
      hinglish:
        'Ek Service badalte pods ke set ke aage ek sthir DNS naam aur virtual IP deti hai, un pods pe load-balance karte hue jo abhi uske selector se match karte hain. CLUSTERIP sirf internal hai aur default. NODEPORT har node pe ek fixed port kholta hai. LOADBALANCER ek cloud load balancer banata hai. Ek INGRESS Service type nahi hai balki ek alag resource hai jo HTTP ko host aur path se route karta hai, jisse tum bahut services ko ek single address ke peeche TLS ke saath expose karte ho.',
    },
  },
  {
    question: 'What are resource requests and limits in Kubernetes?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A REQUEST is what the scheduler reserves when placing a pod; a LIMIT is the hard ceiling at runtime. Exceeding a CPU limit causes throttling — the pod slows down. Exceeding a MEMORY limit causes an OOMKill — the pod is terminated outright. Setting requests too high wastes cluster capacity; setting no limits lets one pod starve its neighbours. Get them from actual measured usage, and be aware CPU and memory limits fail in very different ways.',
      hinglish:
        'Ek REQUEST wo hai jo scheduler ek pod rakhte waqt reserve karta hai; ek LIMIT runtime pe sakht chhat hai. Ek CPU limit paar karna throttling karata hai — pod dheema ho jaata hai. Ek MEMORY limit paar karna ek OOMKill karata hai — pod seedha khatam kar diya jaata hai. Requests bahut zyada set karna cluster capacity barbaad karta hai; koi limits na dena ek pod ko apne padosiyon ko bhookha maarne deta hai. Unhe asli maapi gayi usage se lo, aur dhyaan rakho ki CPU aur memory limits bahut alag tareekon se fail hoti hain.',
    },
  },
  {
    question: 'What is a rolling update and how do you roll one back?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A rolling update replaces pods gradually — bringing up new ones and terminating old ones within configured surge and unavailability bounds — so the service stays available throughout. It requires readiness probes, or traffic reaches pods that are not ready yet. If something goes wrong, `kubectl rollout undo` reverts to the previous ReplicaSet. Alternatives are BLUE-GREEN, which switches all traffic at once, and CANARY, which shifts a small percentage first.',
      hinglish:
        'Ek rolling update pods ko dheere-dheere replace karta hai — naye chalu karte hue aur purane band karte hue configured surge aur unavailability seemaon ke andar — isliye service poore waqt available rehti hai. Ise readiness probes chahiye, warna traffic un pods tak pahunchta hai jo abhi ready nahi. Kuch galat hone pe, `kubectl rollout undo` pichhle ReplicaSet pe wapas le jaata hai. Alternatives hain BLUE-GREEN, jo saara traffic ek saath switch karta hai, aur CANARY, jo pehle ek chhota pratishat khiskata hai.',
    },
  },
  {
    question: 'What is the difference between a liveness and a readiness probe?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A LIVENESS probe asks "is this process broken?" — failing it RESTARTS the pod. A READINESS probe asks "can this pod serve traffic right now?" — failing it removes the pod from the Service endpoints without restarting it. The distinction matters: an app that is merely slow to warm up should fail readiness, not liveness, or Kubernetes restarts it repeatedly and it never starts. A startup probe covers slow initial boots.',
      hinglish:
        'Ek LIVENESS probe poochhta hai "kya ye process toota hai?" — ise fail karna pod ko RESTART karta hai. Ek READINESS probe poochhta hai "kya ye pod abhi traffic serve kar sakta hai?" — ise fail karna pod ko Service endpoints se hata deta hai bina restart kiye. Farak matter karta hai: ek app jo bas warm up hone mein slow hai use readiness fail karni chahiye, liveness nahi, warna Kubernetes use baar-baar restart karta hai aur wo kabhi shuru nahi hota. Ek startup probe slow initial boots cover karta hai.',
    },
  },
  {
    question: 'What is horizontal versus vertical scaling?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'VERTICAL scaling makes one instance bigger — more CPU and memory. It is simple and needs no application change, but has a hard ceiling and usually means downtime to resize. HORIZONTAL scaling adds more instances behind a load balancer, which scales far further and improves fault tolerance, but requires the application to be STATELESS. Containers make horizontal scaling cheap, which is why cloud-native design pushes state out into databases and caches.',
      hinglish:
        'VERTICAL scaling ek instance ko bada banata hai — zyada CPU aur memory. Ye simple hai aur application badalne ki zaroorat nahi, par iski ek sakht chhat hai aur resize karne ke liye usually downtime chahiye. HORIZONTAL scaling ek load balancer ke peeche zyada instances jodta hai, jo bahut aage tak scale karta hai aur fault tolerance behtar karta hai, par ise application ka STATELESS hona chahiye. Containers horizontal scaling ko sasta banate hain, isiliye cloud-native design state ko databases aur caches mein dhakel deta hai.',
    },
  },
  {
    question: 'What is CI/CD and how do containers fit into it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'CONTINUOUS INTEGRATION builds and tests every change automatically; CONTINUOUS DELIVERY makes every passing build deployable, and continuous deployment ships it automatically. Containers make this reliable because the image tested in CI is the EXACT artifact deployed to production — no environment drift between stages. The typical pipeline is build image, run tests, scan for vulnerabilities, push to a registry with an immutable tag, then deploy that specific digest.',
      hinglish:
        'CONTINUOUS INTEGRATION har change ko automatically build aur test karta hai; CONTINUOUS DELIVERY har pass hue build ko deployable banata hai, aur continuous deployment use automatically ship karta hai. Containers ise reliable banate hain kyunki CI mein test hui image THEEK wahi artifact hai jo production mein deploy hoti hai — stages ke beech koi environment drift nahi. Typical pipeline hai image build karo, tests chalao, vulnerabilities scan karo, ek immutable tag ke saath ek registry pe push karo, phir wahi khaas digest deploy karo.',
    },
  },
  {
    question: 'Why should you avoid the latest tag in production?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`latest` is not a version, just a mutable label pointing at whatever was pushed most recently. Two servers pulling `latest` can end up on different images, rollback becomes impossible because there is no previous tag to return to, and caching makes behaviour unpredictable. Use semantic version tags or the git SHA, and ideally pin by immutable DIGEST, so a deployment is reproducible and you can always name exactly what is running.',
      hinglish:
        '`latest` ek version nahi hai, bas ek mutable label hai jo us pe point karta hai jo sabse haal mein push hua. `latest` khichne wale do servers alag images pe pahunch sakte hain, rollback impossible ho jaata hai kyunki wapas jaane ko koi pichhla tag nahi, aur caching behaviour ko anpredictable banati hai. Semantic version tags ya git SHA use karo, aur ideally immutable DIGEST se pin karo, taaki ek deployment reproducible ho aur tum hamesha theek bata sako ki kya chal raha hai.',
    },
  },
  {
    question: 'How do you scan container images for vulnerabilities?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use Trivy, Grype, Snyk, or a registry\'s built-in scanner, which compare the packages in each layer against CVE databases. Run it in CI and fail the build on high or critical findings so vulnerable images never reach a registry. Reduce findings at the source with a minimal base image such as distroless or alpine — most reported CVEs come from OS packages your app never uses. Rescan periodically, since new CVEs are disclosed against images that were clean when built.',
      hinglish:
        'Trivy, Grype, Snyk, ya ek registry ka built-in scanner use karo, jo har layer ke packages ko CVE databases ke against compare karte hain. Ise CI mein chalao aur high ya critical findings pe build fail karo taaki vulnerable images kabhi ek registry tak na pahunchein. Distroless ya alpine jaisi ek minimal base image se findings source pe hi kam karo — zyadatar reported CVEs un OS packages se aate hain jo tumhara app kabhi use hi nahi karta. Samay-samay pe dobara scan karo, kyunki nayi CVEs un images ke against nikalti hain jo banate waqt saaf thi.',
    },
  },
  {
    question: 'What is the difference between Alpine, slim, and distroless base images?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'ALPINE is tiny (about 5MB) but uses musl instead of glibc, which occasionally breaks native binaries and has been shown to slow some workloads. SLIM is the Debian base with docs and extra packages removed — larger than Alpine but fully compatible. DISTROLESS contains only your application and its runtime: no shell, no package manager, so the attack surface is minimal and debugging is genuinely harder. Choose slim by default, distroless when security matters most.',
      hinglish:
        'ALPINE bahut chhota hai (lagbhag 5MB) par glibc ke bajaye musl use karta hai, jo kabhi-kabhi native binaries todta hai aur kuch workloads ko slow karta dekha gaya hai. SLIM Debian base hai jisse docs aur extra packages hata diye gaye — Alpine se bada par poori tarah compatible. DISTROLESS mein sirf tumhara application aur uska runtime hai: na shell, na package manager, isliye attack surface minimal hai aur debugging genuinely mushkil. Default se slim chuno, distroless jab security sabse zyada matter kare.',
    },
  },
  {
    question: 'What is BuildKit and what does it improve?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'BuildKit is Docker\'s modern build engine, now the default. It builds independent stages in PARALLEL rather than strictly sequentially, provides better caching including remote cache import and export for CI, supports build secrets via `--mount=type=secret` that never land in a layer, and offers cache mounts so a package manager cache survives between builds. Enabling it typically cuts build times substantially with no Dockerfile changes at all.',
      hinglish:
        'BuildKit Docker ka modern build engine hai, ab default. Ye independent stages ko strictly ek-ek karke ke bajaye PARALLEL banata hai, behtar caching deta hai including CI ke liye remote cache import aur export, `--mount=type=secret` se build secrets support karta hai jo kabhi ek layer mein nahi aate, aur cache mounts deta hai taaki ek package manager cache builds ke beech bacha rahe. Ise enable karna typically build times kaafi kam karta hai bina kisi Dockerfile change ke.',
    },
  },
  {
    question: 'How do you debug a container that will not start?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Start with `docker logs <container>` — most failures print a reason. `docker inspect` shows the exit code, and code 137 specifically means an OOM kill, while 125 means the daemon rejected the run. Override the entrypoint with `docker run -it --entrypoint sh image` to poke around the filesystem interactively. In Kubernetes, `kubectl describe pod` shows scheduling failures, image pull errors, and probe failures that logs alone never reveal.',
      hinglish:
        '`docker logs <container>` se shuru karo — zyadatar failures ek wajah print karti hain. `docker inspect` exit code dikhata hai, aur code 137 khaas taur pe ek OOM kill batata hai, jabki 125 matlab daemon ne run reject kiya. `docker run -it --entrypoint sh image` se entrypoint override karke filesystem mein interactively ghoomo. Kubernetes mein, `kubectl describe pod` scheduling failures, image pull errors, aur probe failures dikhata hai jo akele logs kabhi nahi batate.',
    },
  },
  {
    question: 'What are namespaces and cgroups?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'They are the two Linux kernel features containers are built from. NAMESPACES provide ISOLATION — separate views of process IDs, network interfaces, mount points, hostnames, and users — so a container sees only its own world. CGROUPS provide LIMITS — how much CPU, memory, and I/O a group of processes may consume. Docker is essentially a friendly interface over these primitives, which is why containers are a Linux capability rather than a Docker invention.',
      hinglish:
        'Ye do Linux kernel features hain jinse containers bane hain. NAMESPACES ISOLATION dete hain — process IDs, network interfaces, mount points, hostnames, aur users ke alag views — isliye ek container sirf apni duniya dekhta hai. CGROUPS LIMITS dete hain — processes ka ek group kitna CPU, memory, aur I/O le sakta hai. Docker asal mein in primitives ke upar ek friendly interface hai, isiliye containers ek Linux capability hain, Docker ka aavishkaar nahi.',
    },
  },
  {
    question: 'What is the difference between docker run and docker exec?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`docker run` creates and starts a NEW container from an image. `docker exec` runs an additional command inside an ALREADY RUNNING container, which is how you open a shell to inspect a live service. A common confusion is using `run` repeatedly and accumulating stopped containers. Note `exec` requires the container to be running, and in a distroless image there is no shell to exec into at all.',
      hinglish:
        '`docker run` ek image se ek NAYA container banata aur shuru karta hai. `docker exec` ek PEHLE SE CHAL RAHE container ke andar ek additional command chalata hai, jisse tum ek live service dekhne ke liye ek shell kholte ho. Ek common confusion baar-baar `run` use karke ruke hue containers ikattha karna hai. Note karo `exec` ko container ka chalna zaroori hai, aur ek distroless image mein exec karne ko koi shell hi nahi.',
    },
  },
  {
    question: 'How do you reduce container startup time?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Shrink the image so the pull is faster, which usually dominates cold start. Avoid work at container start that could happen at build time — precompile, prebuild assets, warm caches into the image. Skip an init step that runs migrations on every boot; run those as a separate job. Use a lightweight base and avoid a shell wrapper in the entrypoint. In Kubernetes, pre-pulling images onto nodes removes the registry round trip entirely.',
      hinglish:
        'Image chhoti karo taaki pull tez ho, jo usually cold start pe haavi hota hai. Container start pe wo kaam avoid karo jo build time pe ho sakta tha — precompile karo, assets pehle bana lo, caches image mein garam karo. Ek init step chhodo jo har boot pe migrations chalata ho; unhe ek alag job ki tarah chalao. Ek halka base use karo aur entrypoint mein ek shell wrapper avoid karo. Kubernetes mein, images ko nodes pe pehle se pull karna registry round trip poori tarah hata deta hai.',
    },
  },
  {
    question: 'What is an init container in Kubernetes?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'An init container runs to COMPLETION before the main containers start, and if it fails Kubernetes retries until it succeeds. It is used for setup that must happen first: waiting for a dependency to become reachable, running database migrations, fetching configuration or secrets, or setting file permissions on a volume. Keeping this work out of the application container means the app image stays minimal and the app itself starts already in a valid state.',
      hinglish:
        'Ek init container main containers shuru hone se pehle POORA hone tak chalta hai, aur fail hone pe Kubernetes safal hone tak retry karta hai. Ye us setup ke liye use hota hai jo pehle hona chahiye: ek dependency ke pahunch mein aane ka intezaar, database migrations chalana, configuration ya secrets laana, ya ek volume pe file permissions set karna. Is kaam ko application container se bahar rakhne ka matlab hai app image minimal rehti hai aur app khud pehle se ek valid state mein shuru hota hai.',
    },
  },
  {
    question: 'What is a ConfigMap and a Secret in Kubernetes?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Both externalise configuration from the image so the same image runs in every environment. A CONFIGMAP holds non-sensitive settings; a SECRET holds credentials. Both can be injected as environment variables or mounted as files. The important caveat is that Secrets are only BASE64-ENCODED by default, not encrypted — anyone with read access to the namespace can decode them — so enable encryption at rest, restrict RBAC, and consider an external secrets manager.',
      hinglish:
        'Dono configuration ko image se bahar nikaalte hain taaki wahi image har environment mein chale. Ek CONFIGMAP non-sensitive settings rakhta hai; ek SECRET credentials. Dono environment variables ki tarah inject ho sakte hain ya files ki tarah mount. Zaroori caveat ye hai ki Secrets default se sirf BASE64-ENCODED hain, encrypted nahi — namespace pe read access wala koi bhi unhe decode kar sakta hai — isliye encryption at rest enable karo, RBAC seemit karo, aur ek external secrets manager socho.',
    },
  },
  {
    question: 'What is the difference between Docker and Podman?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Docker uses a long-running daemon that traditionally runs as root, so the Docker socket is effectively root access to the host. PODMAN is DAEMONLESS and runs rootless by default, launching containers as child processes of your user, which is a meaningfully better security posture. It is CLI-compatible with Docker — `alias docker=podman` mostly works — and adds pods natively. Docker retains a larger ecosystem and better desktop tooling.',
      hinglish:
        'Docker ek lambe chalne wala daemon use karta hai jo traditionally root ke roop mein chalta hai, isliye Docker socket effectively host pe root access hai. PODMAN DAEMONLESS hai aur default se rootless chalta hai, containers ko tumhare user ke child processes ki tarah launch karte hue, jo ek kaafi behtar security posture hai. Ye Docker se CLI-compatible hai — `alias docker=podman` zyadatar kaam karta hai — aur pods natively jodta hai. Docker ka ecosystem bada aur desktop tooling behtar hai.',
    },
  },
  {
    question: 'How do you run a database in Docker for development?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use the official image, mount a named VOLUME at the data directory so data survives container recreation, set credentials through environment variables, and add a health check so dependent services wait until it actually accepts connections rather than merely being started. For development this is excellent. For PRODUCTION, a managed database is usually the better choice — backups, failover, patching, and tuning are real operational work you would otherwise own.',
      hinglish:
        'Official image use karo, data directory pe ek named VOLUME mount karo taaki data container dobara banne pe bhi bache, environment variables se credentials do, aur ek health check jodo taaki dependent services tab tak rukein jab tak wo actually connections accept na kare, sirf shuru hone tak nahi. Development ke liye ye excellent hai. PRODUCTION ke liye, ek managed database usually behtar choice hai — backups, failover, patching, aur tuning asli operational kaam hain jo warna tumhare hote.',
    },
  },
  {
    question: 'What are the twelve-factor app principles most relevant to containers?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Store CONFIG in the environment, not in the image, so one build runs everywhere. Treat backing services as attachable RESOURCES referenced by URL. Keep processes STATELESS so any instance can serve any request and scaling is trivial. Export services via port binding. Achieve concurrency by scaling out processes. Make startup fast and shutdown graceful. Write LOGS to stdout as an event stream. Keep development and production as similar as possible. Containers make all of these natural rather than aspirational.',
      hinglish:
        'CONFIG ko environment mein rakho, image mein nahi, taaki ek build har jagah chale. Backing services ko URL se reference kiye jaane wale attachable RESOURCES maano. Processes ko STATELESS rakho taaki koi bhi instance koi bhi request serve kare aur scaling aasaan ho. Services ko port binding se export karo. Processes scale karke concurrency paao. Startup tez aur shutdown graceful banao. LOGS ko ek event stream ki tarah stdout pe likho. Development aur production ko jitna ho sake ek jaisa rakho. Containers in sabko aspirational ke bajaye swabhavik bana dete hain.',
    },
  },
  {
    question: 'What is container orchestration and why do you need it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Orchestration automates running containers across many machines: scheduling them onto nodes with capacity, restarting failures, scaling with load, rolling out updates without downtime, service discovery, load balancing, and managing config and secrets. You need it once you have more containers than you can place by hand, or once uptime requirements mean a failed container must be replaced at 3am without a human. Below that scale, Compose on a single host is genuinely enough.',
      hinglish:
        'Orchestration bahut machines pe containers chalana automate karta hai: unhe capacity wale nodes pe schedule karna, failures restart karna, load ke saath scale karna, bina downtime updates rollout karna, service discovery, load balancing, aur config aur secrets manage karna. Ye tab chahiye jab tumhare paas itne containers hon ki haath se na rakh sako, ya jab uptime requirements ka matlab ho ki ek fail hua container 3am pe bina insaan ke badalna chahiye. Us scale se neeche, ek single host pe Compose genuinely kaafi hai.',
    },
  },
  {
    question: 'What is the difference between blue-green and canary deployment?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'BLUE-GREEN runs two complete environments and switches ALL traffic at once, giving an instant rollback by switching back — but it doubles infrastructure cost and exposes every user to a bad release simultaneously. CANARY shifts a small percentage of traffic to the new version first, watches metrics, then increases gradually, so a problem affects few users — but it takes longer and requires both versions to be compatible with the same database schema.',
      hinglish:
        'BLUE-GREEN do poore environments chalata hai aur SAARA traffic ek saath switch karta hai, wapas switch karke ek instant rollback dete hue — par ye infrastructure cost dugni karta hai aur ek kharab release ko har user pe ek saath daal deta hai. CANARY pehle traffic ka ek chhota pratishat naye version pe khiskata hai, metrics dekhta hai, phir dheere-dheere badhata hai, isliye ek problem kam users ko affect karti hai — par ismein zyada waqt lagta hai aur dono versions ko wahi database schema ke saath compatible hona padta hai.',
    },
  },
  {
    question: 'How do you handle database migrations in a containerised deployment?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Run migrations as a SEPARATE step — an init container, a Kubernetes Job, or a pipeline stage — not on every application container start, or ten replicas race to migrate the same database. Make migrations BACKWARD COMPATIBLE so old and new code can run against the schema simultaneously, which a rolling update guarantees will happen. Expand-then-contract is the standard pattern: add a column, deploy code using it, then remove the old one in a later release.',
      hinglish:
        'Migrations ko ek ALAG step ki tarah chalao — ek init container, ek Kubernetes Job, ya ek pipeline stage — har application container start pe nahi, warna das replicas usi database ko migrate karne ki daud lagate hain. Migrations ko BACKWARD COMPATIBLE banao taaki purana aur naya code ek saath us schema ke against chal sakein, jo ek rolling update pakka karega. Expand-then-contract standard pattern hai: ek column jodo, use karta code deploy karo, phir ek baad ki release mein purana hatao.',
    },
  },
  {
    question: 'What is observability and how does it differ from monitoring?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'MONITORING watches known metrics and alerts on predefined thresholds — it answers questions you thought to ask in advance. OBSERVABILITY is the ability to understand a system\'s internal state from its outputs well enough to investigate problems you did NOT anticipate. Its three pillars are metrics, logs, and distributed traces. In a containerised system with many short-lived instances, tracing with a correlation ID is what makes a request followable across services.',
      hinglish:
        'MONITORING known metrics dekhta hai aur pehle se tay thresholds pe alert karta hai — ye un sawaalon ka jawab deta hai jo tumne pehle se sochkar poochhe. OBSERVABILITY ek system ki andar ki state ko uske outputs se itna samajhne ki kshamta hai ki tum un problems ki jaanch kar sako jinki tumne ummeed NAHI ki thi. Iske teen stambh hain metrics, logs, aur distributed traces. Bahut kam-jeevan wale instances wale ek containerised system mein, ek correlation ID ke saath tracing hi ek request ko services ke across follow karne layak banati hai.',
    },
  },
];
