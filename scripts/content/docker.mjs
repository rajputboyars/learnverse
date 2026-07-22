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
            frequency: 'very-common',
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
];
