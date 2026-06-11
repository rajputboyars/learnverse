// System Design curriculum — CS fundamentals / interview prep.
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
  title: 'System Design',
  slug: 'system-design',
  description:
    'Scalable systems design — scalability, load balancing, caching, database scaling, CAP theorem, message queues, CDN aur microservices. Interview-ready, English + Hinglish, desi examples ke saath.',
  icon: '🏗️',
  tags: ['system-design', 'scalability', 'interview', 'architecture', 'cs-fundamentals'],
  difficulty: 'advanced',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 24,
};

const beginner = [
  {
    title: 'Scaling Basics',
    level: 'beginner',
    description: 'Scalability aur load balancing.',
    concepts: [
      {
        title: 'Scalability (Vertical vs Horizontal)',
        difficulty: 'easy',
        tags: ['scalability'],
        explanation: {
          english:
            'Scalability is a system\'s ability to handle growing load. Vertical scaling (scaling up) means adding more power (CPU/RAM) to a single machine — simple but limited and a single point of failure. Horizontal scaling (scaling out) means adding more machines and distributing the load — virtually unlimited and fault-tolerant, but needs load balancing and stateless services. Large systems prefer horizontal scaling.',
          hinglish:
            'Scalability ek system ki badhte load ko handle karne ki ability hai. Vertical scaling (scale up) matlab ek hi machine ko zyada power (CPU/RAM) dena — simple par limited aur single point of failure. Horizontal scaling (scale out) matlab zyada machines add karke load distribute karna — virtually unlimited aur fault-tolerant, par load balancing aur stateless services chahiye. Bade systems horizontal scaling prefer karte hain.',
        },
        dailyLifeExample:
          'Vertical = ek hi cook ko aur tez banaana (limit aa jaati hai). Horizontal = aur cooks (machines) hire karke kaam baant na — jitne chaaho add karo.',
        codeExample:
          '// Vertical (scale up): 1 big server (more CPU/RAM)\n//   simple, limited, single point of failure\n//\n// Horizontal (scale out): many servers + load balancer\n//   unlimited, fault-tolerant, needs stateless services',
        keyPoints: [
          'Scalability = handle growing load',
          'Vertical: bigger machine (simple, limited, SPOF)',
          'Horizontal: more machines (unlimited, fault-tolerant)',
          'Horizontal needs load balancing + stateless services',
        ],
        quiz: [
          {
            question: 'Adding more machines to share load is…',
            options: ['vertical scaling', 'horizontal scaling', 'caching', 'indexing'],
            correctIndex: 1,
          },
          {
            question: 'A downside of vertical scaling is…',
            options: ['too cheap', 'a hard limit + single point of failure', 'too many servers', 'no CPU'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Load Balancing',
        difficulty: 'medium',
        tags: ['load-balancer'],
        explanation: {
          english:
            'A load balancer distributes incoming requests across multiple servers so no single server is overwhelmed, improving throughput and availability. Common strategies: round robin, least connections, and IP hash. It also performs health checks — routing traffic away from failed servers. It is the entry point that makes horizontal scaling possible and removes single points of failure (you also run multiple load balancers for redundancy).',
          hinglish:
            'Load balancer incoming requests ko multiple servers mein distribute karta hai taaki koi ek server overwhelm na ho, throughput aur availability badhata hai. Common strategies: round robin, least connections, aur IP hash. Ye health checks bhi karta hai — failed servers se traffic hata deta hai. Ye wo entry point hai jo horizontal scaling possible banata hai aur single points of failure hataata hai (redundancy ke liye multiple load balancers bhi chalate ho).',
        },
        dailyLifeExample:
          'Load balancer ek airport ke queue manager jaisa hai — naye passengers ko sabse khaali counter pe bhejta hai, taaki koi ek counter pe bheed na ho.',
        codeExample:
          '//            ┌-> Server A\n// Client -> LB ├-> Server B   (round robin / least connections)\n//            └-> Server C\n// LB does health checks; routes around dead servers.',
        keyPoints: [
          'Distributes requests across servers',
          'Strategies: round robin, least connections, IP hash',
          'Health checks route around failures',
          'Enables horizontal scaling; remove SPOF',
        ],
        quiz: [
          {
            question: 'A load balancer mainly…',
            options: ['stores data', 'distributes requests across servers', 'encrypts files', 'compiles code'],
            correctIndex: 1,
          },
          {
            question: 'Which is a load-balancing strategy?',
            options: ['normalization', 'round robin', 'paging', 'sharding'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Latency vs Throughput',
        difficulty: 'easy',
        tags: ['latency', 'throughput', 'performance'],
        explanation: {
          english:
            'Latency is the time for a single request to complete (how fast one operation is — measured in ms). Throughput is how many requests the system handles per unit time (how much work — measured in requests/sec or QPS). They are related but distinct: you can have low latency but low throughput, or high throughput with higher latency (e.g. batching). In design, you usually quote latency as percentiles (p50, p95, p99) because averages hide the slow tail that real users feel.',
          hinglish:
            'Latency ek single request complete hone ka time hai (ek operation kitna fast — ms mein). Throughput hai system per unit time kitni requests handle karta hai (kitna kaam — requests/sec ya QPS). Ye related par alag hain: low latency par low throughput ho sakta hai, ya high throughput par higher latency (jaise batching). Design mein latency ko percentiles (p50, p95, p99) mein batate ho kyunki averages slow tail chhupa dete hain jo real users feel karte hain.',
        },
        dailyLifeExample:
          'Latency ek customer ko serve karne ka time (1 customer kitni jaldi). Throughput ek ghante mein kitne customers serve hue. Ek tez cashier (low latency); 10 cashiers (high throughput).',
        codeExample:
          '// Latency = time per request (e.g. 50ms)\n// Throughput = requests/second (e.g. 10,000 QPS)\n//\n// Report latency as PERCENTILES, not averages:\n//   p50 = 40ms (half are faster)\n//   p95 = 120ms (5% are slower)\n//   p99 = 300ms (the worst 1% — what frustrates users)',
        keyPoints: [
          'Latency = time for one request (ms)',
          'Throughput = requests handled per second (QPS)',
          'Quote latency as p50/p95/p99 (not averages)',
          'The tail (p99) is what users actually feel',
        ],
        quiz: [
          {
            question: 'Latency measures…',
            options: ['requests per second', 'time for a single request', 'storage size', 'CPU cores'],
            correctIndex: 1,
          },
          {
            question: 'Why report p95/p99 instead of average latency?',
            options: ['shorter to write', 'averages hide the slow tail real users feel', 'they are random', 'no reason'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Availability, Reliability & SLA',
        difficulty: 'medium',
        tags: ['availability', 'reliability', 'sla'],
        explanation: {
          english:
            'Availability is the percentage of time a system is up and serving — measured in "nines": 99.9% ("three nines") allows ~8.7 hours of downtime per year, 99.99% (~52 min/year), 99.999% (~5 min/year). Reliability is doing the right thing correctly over time (not just being up). You achieve high availability with redundancy (no single point of failure), failover (auto-switch to a standby), and health checks. An SLA is a contractual promise of availability; an SLO is your internal target; an SLI is the measured metric.',
          hinglish:
            'Availability wo percentage time hai jab system up aur serve kar raha — "nines" mein measure: 99.9% ("three nines") matlab ~8.7 ghante/saal downtime, 99.99% (~52 min/saal), 99.999% (~5 min/saal). Reliability matlab time ke saath sahi kaam karna (sirf up hona nahi). High availability redundancy (no single point of failure), failover (standby pe auto-switch), aur health checks se milti hai. SLA availability ka contractual promise hai; SLO tumhara internal target; SLI measured metric.',
        },
        dailyLifeExample:
          'Availability ek shop ka "hamesha khula" hona jaisa hai. Redundancy = ek cashier bimaar ho to doosra ready (failover). 99.9% matlab saal mein sirf ~9 ghante band — bahut reliable.',
        codeExample:
          '// Availability "nines" (downtime per year):\n//   99%     -> ~3.65 days\n//   99.9%   -> ~8.8 hours   (three nines)\n//   99.99%  -> ~52 minutes (four nines)\n//   99.999% -> ~5 minutes  (five nines)\n//\n// High availability = redundancy + failover + health checks\n// SLA (promise) >= SLO (target) measured by SLI (metric)',
        keyPoints: [
          'Availability = % uptime, measured in "nines"',
          'Achieve via redundancy + failover + health checks',
          'Reliability = correct behaviour over time',
          'SLA (contract) / SLO (target) / SLI (measured)',
        ],
        quiz: [
          {
            question: '"Four nines" (99.99%) availability allows roughly how much downtime per year?',
            options: ['3 days', '52 minutes', '5 minutes', '0'],
            correctIndex: 1,
          },
          {
            question: 'High availability is mainly achieved with…',
            options: ['one big server', 'redundancy + failover', 'more CSS', 'fewer servers'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Performance & Data',
    level: 'intermediate',
    description: 'Caching, CDN aur database scaling.',
    concepts: [
      {
        title: 'Caching',
        difficulty: 'medium',
        tags: ['cache'],
        explanation: {
          english:
            'A cache stores frequently-accessed data in fast storage (memory, e.g. Redis) so repeated requests avoid slow work (DB queries, computation). It hugely cuts latency and load. Key concerns: what to cache, time-to-live (TTL) / expiry, and invalidation (keeping the cache consistent with the source — "the hardest problem"). Patterns: cache-aside (app checks cache, then DB), write-through, and write-back. Caches exist at many layers: browser, CDN, application, and database.',
          hinglish:
            'Cache frequently-accessed data ko fast storage (memory, jaise Redis) mein rakhta hai taaki repeated requests slow kaam (DB queries, computation) avoid karein. Ye latency aur load bahut kam karta hai. Key concerns: kya cache karna, time-to-live (TTL)/expiry, aur invalidation (cache ko source ke saath consistent rakhna — "the hardest problem"). Patterns: cache-aside (app cache check kare, phir DB), write-through, aur write-back. Caches kai layers pe hote hain: browser, CDN, application, aur database.',
        },
        dailyLifeExample:
          'Cache ek student ke ready notes jaise hain — baar-baar poori kitaab (DB) padhne ke bajaye notes (cache) se turant. Par notes purane ho jaayein (stale) to galat — isliye update (invalidation) zaroori.',
        codeExample:
          '// Cache-aside pattern\n// 1. data = cache.get(key)\n// 2. if (data) return data            // cache HIT\n// 3. data = db.query(...)             // cache MISS\n// 4. cache.set(key, data, ttl)        // store for next time\n// 5. return data\n// Hard part: invalidation (keep cache fresh).',
        keyPoints: [
          'Store hot data in fast memory (e.g. Redis)',
          'Cuts latency & backend load',
          'TTL/expiry + invalidation (the hard part)',
          'Layers: browser, CDN, app, DB',
        ],
        quiz: [
          {
            question: 'A cache mainly improves…',
            options: ['security', 'latency & reduces backend load', 'storage size', 'code style'],
            correctIndex: 1,
          },
          {
            question: 'The hardest part of caching is usually…',
            options: ['reading', 'invalidation (staying consistent)', 'naming keys', 'deleting'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What caching strategies do you know and when does caching go wrong?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Common strategies: cache-aside (lazy loading — the app reads the cache, falls back to the DB on a miss, and populates the cache), write-through (write to cache and DB together — consistent but slower writes), and write-back (write to cache, flush to DB later — fast but risks data loss). Caching goes wrong with stale data (poor invalidation), cache stampede (many misses hit the DB at once when a key expires — fixed with locks or staggered TTLs), and storing rarely-reused data (wasting memory). The classic saying: "there are only two hard things — cache invalidation and naming things".',
              hinglish:
                'Common strategies: cache-aside (lazy loading — app cache padhe, miss pe DB se le aaye aur cache populate kare), write-through (cache aur DB dono mein saath likho — consistent par slower writes), aur write-back (cache mein likho, DB mein baad mein flush — fast par data loss risk). Caching tab galat hoti hai jab stale data (poor invalidation), cache stampede (key expire hone par bahut misses ek saath DB pe — locks ya staggered TTLs se fix), aur rarely-reused data store karna (memory waste). Classic saying: "do hi mushkil cheezein hain — cache invalidation aur naming things".',
            },
          },
        ],
      },
      {
        title: 'CDN (Content Delivery Network)',
        difficulty: 'easy',
        tags: ['cdn'],
        explanation: {
          english:
            'A CDN is a network of geographically distributed servers that cache static content (images, CSS, JS, videos) close to users. When a user requests an asset, the nearest CDN edge server serves it instead of the far-away origin — cutting latency, saving origin bandwidth, and improving availability. CDNs also absorb traffic spikes and help defend against DDoS. Use one for any global, asset-heavy site (Vercel, Cloudflare, etc.).',
          hinglish:
            'CDN geographically distributed servers ka network hai jo static content (images, CSS, JS, videos) ko users ke paas cache karta hai. Jab user koi asset maange, sabse nearest CDN edge server use serve karta hai door wale origin ke bajaye — latency kam, origin bandwidth bachti, aur availability behtar. CDNs traffic spikes bhi absorb karte hain aur DDoS se bachne mein madad. Kisi bhi global, asset-heavy site ke liye use karo (Vercel, Cloudflare, etc.).',
        },
        dailyLifeExample:
          'CDN ek brand ke local stores jaise hain — har sheher mein ek branch (edge), taaki tumhe door factory (origin) tak na jaana pade. Paas se hi jaldi mil jaata hai.',
        codeExample:
          '// Without CDN: every user -> far origin (slow)\n// With CDN: user -> nearest edge server (cached, fast)\n//   origin only hit on a cache miss\n// Great for images, CSS/JS, video; absorbs spikes/DDoS.',
        keyPoints: [
          'Distributed edge servers cache static assets',
          'Serves from nearest location (low latency)',
          'Saves origin bandwidth; improves availability',
          'Absorbs spikes; helps against DDoS',
        ],
        quiz: [
          {
            question: 'A CDN mainly serves…',
            options: ['database writes', 'static content from a nearby edge server', 'SQL queries', 'emails'],
            correctIndex: 1,
          },
          {
            question: 'A CDN reduces…',
            options: ['code quality', 'latency & origin load', 'the number of users', 'security'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Database Scaling (Replication & Sharding)',
        difficulty: 'hard',
        tags: ['database', 'replication', 'sharding'],
        explanation: {
          english:
            'To scale databases: Replication copies data to multiple servers — a primary handles writes, read replicas handle reads (scales reads, adds redundancy, but has replication lag). Sharding (horizontal partitioning) splits data across servers by a shard key (e.g. user_id range or hash) — scales writes and storage, but cross-shard queries and choosing a good shard key are hard. Together they let databases scale beyond one machine.',
          hinglish:
            'Databases scale karne ke liye: Replication data ko multiple servers pe copy karta hai — ek primary writes handle kare, read replicas reads (reads scale, redundancy, par replication lag). Sharding (horizontal partitioning) data ko servers mein ek shard key se baant ta hai (jaise user_id range ya hash) — writes aur storage scale, par cross-shard queries aur achha shard key chunna mushkil. Milke ye databases ko ek machine se aage scale karne dete hain.',
        },
        dailyLifeExample:
          'Replication ek hi register ki kai photocopies (sab padh sakein) jaisa hai. Sharding ek bade register ko A-M aur N-Z mein baant ne jaisa hai — har half alag almari (server) mein.',
        codeExample:
          '// Replication: Primary (writes) -> Replicas (reads)\n//   scales reads + redundancy; replication lag possible\n//\n// Sharding: split by shard key (e.g. user_id % N)\n//   Shard 0: users 0-999k | Shard 1: 1M-2M ...\n//   scales writes/storage; cross-shard queries are hard',
        keyPoints: [
          'Replication: copy data; primary writes, replicas read',
          'Replication scales reads + redundancy (has lag)',
          'Sharding: split data by a shard key',
          'Sharding scales writes/storage; cross-shard is hard',
        ],
        quiz: [
          {
            question: 'Read replicas mainly help scale…',
            options: ['writes', 'reads', 'storage', 'security'],
            correctIndex: 1,
          },
          {
            question: 'Splitting data across servers by a key is called…',
            options: ['replication', 'sharding', 'caching', 'indexing'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Databases & Communication',
    level: 'intermediate',
    description: 'DB types, consistent hashing, gateways, rate limiting, real-time.',
    concepts: [
      {
        title: 'SQL vs NoSQL & Database Types',
        difficulty: 'medium',
        tags: ['database', 'sql', 'nosql'],
        explanation: {
          english:
            'Pick a database by data shape and access pattern. SQL/relational (PostgreSQL, MySQL): structured tables, strong ACID, JOINs — best for transactions and relational data. NoSQL families: document (MongoDB — flexible JSON, content/catalogues), key-value (Redis/DynamoDB — caching, sessions, super-fast lookups), wide-column (Cassandra — huge write-heavy time-series/logs), graph (Neo4j — relationships, social/recommendations), and search (Elasticsearch — full-text search). There is no "best" DB — match it to the use case; large systems use several (polyglot persistence).',
          hinglish:
            'Database data shape aur access pattern se chuno. SQL/relational (PostgreSQL, MySQL): structured tables, strong ACID, JOINs — transactions aur relational data ke liye best. NoSQL families: document (MongoDB — flexible JSON, content/catalogues), key-value (Redis/DynamoDB — caching, sessions, super-fast lookups), wide-column (Cassandra — huge write-heavy time-series/logs), graph (Neo4j — relationships, social/recommendations), aur search (Elasticsearch — full-text search). Koi "best" DB nahi — use case se match karo; bade systems kai use karte hain (polyglot persistence).',
        },
        dailyLifeExample:
          'DB chunna sahi auzaar chunne jaisa hai — hathaudi (SQL) keel ke liye, screwdriver (key-value) screw ke liye. Galat tool se kaam mushkil. Har DB ka apna kaam.',
        codeExample:
          '// Relational (SQL)  -> transactions, JOINs (orders, payments)\n// Document (Mongo)   -> flexible docs (profiles, catalogues)\n// Key-Value (Redis)  -> cache, sessions, rate-limit counters\n// Wide-Column (Cassandra) -> huge write-heavy logs/time-series\n// Graph (Neo4j)      -> relationships (friends, recommendations)\n// Search (Elastic)   -> full-text search\n// Polyglot persistence: use several together.',
        keyPoints: [
          'SQL: structured, ACID, JOINs (transactions)',
          'Document/Key-Value/Wide-Column/Graph/Search families',
          'Match the DB to data shape + access pattern',
          'Big systems mix several (polyglot persistence)',
        ],
        quiz: [
          {
            question: 'Which DB type is best for super-fast caching & sessions?',
            options: ['graph', 'key-value (Redis)', 'relational', 'search'],
            correctIndex: 1,
          },
          {
            question: 'Friend-of-friend / recommendations fit which DB best?',
            options: ['graph', 'key-value', 'wide-column', 'relational'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Consistent Hashing',
        difficulty: 'hard',
        tags: ['consistent-hashing', 'sharding', 'distributed'],
        explanation: {
          english:
            'When you distribute data/requests across N servers with hash(key) % N, adding or removing a server changes N and remaps almost ALL keys — a disaster for caches and shards. Consistent hashing places servers and keys on a circular hash ring; each key goes to the next server clockwise. Adding/removing a server only remaps the keys near it (~1/N), not everything. Virtual nodes (each physical server placed at many ring points) keep the load balanced. It powers distributed caches (Memcached), Cassandra, and DynamoDB.',
          hinglish:
            'Jab tum data/requests ko N servers pe hash(key) % N se distribute karte ho, ek server add/remove karne par N badal jaata hai aur lagbhag SAARE keys remap ho jaate hain — caches aur shards ke liye disaster. Consistent hashing servers aur keys ko ek circular hash ring pe rakhta hai; har key clockwise agle server pe jaati hai. Server add/remove karne par sirf uske paas ke keys remap (~1/N), sab nahi. Virtual nodes (har physical server kai ring points pe) load balanced rakhte hain. Ye distributed caches (Memcached), Cassandra, aur DynamoDB chalata hai.',
        },
        dailyLifeExample:
          'hash % N ek ghadi ke numbers badalne jaisa hai — ek number hatao to sab shift. Consistent hashing ek gol table pe seats jaisa hai — ek mehmaan add karo to sirf aas-paas wale adjust hote hain, poori table nahi.',
        codeExample:
          '// Naive: server = hash(key) % N\n//   add/remove a server -> N changes -> ~ALL keys remap (bad)\n//\n// Consistent hashing: place servers on a ring (0..2^32)\n//   key -> walk clockwise -> first server\n//   add/remove a node -> only ~1/N keys move\n//   virtual nodes spread load evenly',
        keyPoints: [
          'hash % N remaps almost everything when N changes',
          'Ring: key -> next server clockwise',
          'Add/remove a node moves only ~1/N keys',
          'Virtual nodes balance load; used in caches/Cassandra',
        ],
        quiz: [
          {
            question: 'Consistent hashing mainly avoids…',
            options: ['encryption', 'remapping almost all keys when servers change', 'slow CPUs', 'JOINs'],
            correctIndex: 1,
          },
          {
            question: 'Virtual nodes are used to…',
            options: ['encrypt keys', 'balance load evenly across the ring', 'delete data', 'add latency'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why is consistent hashing preferred over modulo hashing for distributed caches?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'With modulo hashing (hash(key) % N), the server for a key depends on N, the number of servers. When a server is added or removed, N changes and the mapping changes for almost every key — so a distributed cache would suddenly miss on nearly all keys (a cache stampede that hammers the database). Consistent hashing maps keys and servers onto a ring; a key belongs to the next server clockwise. Adding or removing one node only affects the keys between it and its neighbour — about 1/N of keys — so most cached data stays valid. Virtual nodes give each physical server many ring positions to even out the load and reduce hotspots.',
              hinglish:
                'Modulo hashing (hash(key) % N) mein key ka server N (servers ki sankhya) pe depend karta hai. Server add/remove hone par N badal jaata hai aur lagbhag har key ka mapping badal jaata hai — to distributed cache achanak lagbhag saare keys pe miss karega (cache stampede jo database ko hammer kare). Consistent hashing keys aur servers ko ek ring pe map karta hai; key clockwise agle server ki hoti hai. Ek node add/remove karne par sirf us aur uske neighbour ke beech ke keys affect hote hain — ~1/N keys — to zyadatar cached data valid rehta hai. Virtual nodes har physical server ko kai ring positions dete hain taaki load even ho aur hotspots kam.',
            },
          },
        ],
      },
      {
        title: 'API Gateway & Reverse Proxy',
        difficulty: 'medium',
        tags: ['api-gateway', 'proxy'],
        explanation: {
          english:
            'A reverse proxy sits in front of your servers and forwards client requests to them — handling TLS termination, load balancing, caching, and compression, while hiding the backend. An API gateway is a specialised reverse proxy for APIs (especially microservices): it is the single entry point that handles authentication, rate limiting, request routing to the right service, request/response transformation, and logging. This keeps cross-cutting concerns out of each service. (A forward proxy, by contrast, sits in front of clients to reach the internet.)',
          hinglish:
            'Reverse proxy tumhare servers ke aage baithta hai aur client requests unhe forward karta hai — TLS termination, load balancing, caching, aur compression handle karke, backend chhupa ke. API gateway APIs (khaaskar microservices) ke liye ek specialised reverse proxy hai: ye single entry point hai jo authentication, rate limiting, sahi service pe routing, request/response transformation, aur logging handle karta hai. Isse cross-cutting concerns har service se bahar rehte hain. (Forward proxy iske ulat clients ke aage baithta hai internet tak pahunchne ke liye.)',
        },
        dailyLifeExample:
          'API gateway ek building ke main reception jaisa hai — har visitor (request) pehle yahan aata hai, ID check (auth), entry limit (rate limit), phir sahi floor (service) bhej diya jaata hai. Backend offices seedha expose nahi hote.',
        codeExample:
          '// Client -> [ API Gateway ] -> microservices\n//   Gateway handles: auth, rate limiting, routing,\n//                    TLS, transformation, logging\n//\n// /users/*    -> User Service\n// /orders/*   -> Order Service\n// /payments/* -> Payment Service\n// Reverse proxy hides backends; forward proxy fronts clients.',
        keyPoints: [
          'Reverse proxy: fronts servers (TLS, LB, cache, hide backend)',
          'API gateway: single entry for APIs/microservices',
          'Handles auth, rate limiting, routing, transformation',
          'Keeps cross-cutting concerns out of each service',
        ],
        quiz: [
          {
            question: 'An API gateway typically handles…',
            options: ['only CSS', 'auth, rate limiting & routing as a single entry point', 'database storage', 'rendering HTML'],
            correctIndex: 1,
          },
          {
            question: 'A reverse proxy sits in front of…',
            options: ['clients', 'your backend servers', 'the database only', 'the CDN only'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Rate Limiting',
        difficulty: 'medium',
        tags: ['rate-limiting', 'security'],
        explanation: {
          english:
            'Rate limiting caps how many requests a client can make in a time window (e.g. 100/min) to prevent abuse, DDoS, and overload, and to ensure fair use and control cost. Algorithms: fixed window (simple, but bursts at boundaries), sliding window (smoother), token bucket (tokens refill over time; allows controlled bursts up to a capacity — the most popular), and leaky bucket (processes at a steady rate, smoothing output). It is enforced at the gateway/load balancer using a fast shared store like Redis to track per-client counters.',
          hinglish:
            'Rate limiting cap karta hai ek client ek time window mein kitni requests kare (jaise 100/min) — abuse, DDoS, aur overload rokne, fair use ensure karne, aur cost control ke liye. Algorithms: fixed window (simple, par boundaries pe bursts), sliding window (smoother), token bucket (tokens time ke saath refill; capacity tak controlled bursts allow — sabse popular), aur leaky bucket (steady rate pe process, output smooth). Ye gateway/load balancer pe enforce hota hai, Redis jaise fast shared store se per-client counters track karke.',
        },
        dailyLifeExample:
          'Token bucket ek bus ke tokens jaisa hai — ek balti mein tokens jama hote hain, har ride ek token. Bahut rides ek saath (burst) le sakte ho jab tak tokens hain, phir refill ka wait.',
        codeExample:
          '// Token bucket (most popular)\n//   bucket holds up to CAPACITY tokens\n//   refill R tokens/second\n//   each request takes 1 token; no token -> 429 Too Many Requests\n//\n// Algorithms: fixed window | sliding window\n//             token bucket | leaky bucket\n// Track counters per client in Redis (fast, shared).',
        keyPoints: [
          'Caps requests per client per window (e.g. 100/min)',
          'Prevents abuse/DDoS/overload; ensures fairness',
          'Token bucket (bursts) is the popular choice',
          'Enforced at gateway with a fast store (Redis); returns 429',
        ],
        quiz: [
          {
            question: 'Which rate-limit algorithm allows controlled bursts?',
            options: ['fixed window', 'token bucket', 'no limit', 'round robin'],
            correctIndex: 1,
          },
          {
            question: 'A rate-limited request that exceeds the limit returns HTTP…',
            options: ['200', '404', '429 Too Many Requests', '500'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Real-time Communication (WebSockets, Polling, SSE)',
        difficulty: 'medium',
        tags: ['websockets', 'real-time'],
        explanation: {
          english:
            'For live updates (chat, notifications, live scores), plain request/response is not enough. Short polling repeatedly asks the server "anything new?" (simple but wasteful). Long polling holds the request open until there is data (fewer requests). Server-Sent Events (SSE) give a one-way server-to-client stream over HTTP (great for feeds/notifications). WebSockets open a persistent, full-duplex (two-way) connection — ideal for chat and multiplayer where both sides push messages. Choose based on direction and frequency of updates.',
          hinglish:
            'Live updates (chat, notifications, live scores) ke liye plain request/response kaafi nahi. Short polling baar-baar server se poochta hai "kuch naya?" (simple par wasteful). Long polling request ko data aane tak khula rakhta hai (kam requests). Server-Sent Events (SSE) HTTP pe ek one-way server-to-client stream dete hain (feeds/notifications ke liye badhiya). WebSockets ek persistent, full-duplex (two-way) connection kholte hain — chat aur multiplayer ke liye ideal jahan dono sides messages push karein. Direction aur update frequency ke hisaab se chuno.',
        },
        dailyLifeExample:
          'Short polling baar-baar "post aaya kya?" poochne jaisa hai. WebSocket ek khula phone call jaisa hai — dono baat kar sakte hain bina dobara dial kiye. SSE ek live radio broadcast jaisa hai (sirf sunte ho).',
        codeExample:
          '// Short polling: client asks every few seconds (wasteful)\n// Long polling: server holds request until data is ready\n// SSE: one-way server -> client stream (notifications, feeds)\n// WebSocket: persistent two-way (chat, gaming, collab)\n//   const ws = new WebSocket("wss://...");\n//   ws.onmessage = (e) => render(e.data);',
        keyPoints: [
          'Polling: repeatedly ask (short) or hold open (long)',
          'SSE: one-way server -> client stream',
          'WebSocket: persistent two-way (full-duplex)',
          'Choose by direction & update frequency',
        ],
        quiz: [
          {
            question: 'Which gives a persistent two-way connection?',
            options: ['short polling', 'SSE', 'WebSocket', 'a normal GET'],
            correctIndex: 2,
          },
          {
            question: 'For one-way server-to-client updates (notifications), a good fit is…',
            options: ['SSE', 'a database', 'CSS', 'a cron job'],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Distributed Systems',
    level: 'advanced',
    description: 'CAP theorem, queues aur architecture.',
    concepts: [
      {
        title: 'CAP Theorem',
        difficulty: 'hard',
        tags: ['cap', 'distributed'],
        explanation: {
          english:
            'The CAP theorem states a distributed data store can guarantee only two of three properties at once: Consistency (every read sees the latest write), Availability (every request gets a response), and Partition tolerance (the system keeps working despite network splits). Since network partitions are unavoidable, you really choose between CP (consistency over availability — e.g. banking) and AP (availability over consistency — e.g. social feeds, eventual consistency). It frames the core trade-off in distributed design.',
          hinglish:
            'CAP theorem kehta hai ek distributed data store teen properties mein se sirf do ek saath guarantee kar sakta hai: Consistency (har read latest write dekhe), Availability (har request ko response mile), aur Partition tolerance (network split ke bawajood system chale). Kyunki network partitions unavoidable hain, asal mein tum CP (consistency over availability — jaise banking) aur AP (availability over consistency — jaise social feeds, eventual consistency) ke beech chunte ho. Ye distributed design ka core trade-off frame karta hai.',
        },
        dailyLifeExample:
          'CAP ek do-branch shop jaisa hai jab phone line kat jaaye (partition) — ya dono branches same stock dikhayein (consistent) par ek band ho jaaye, ya dono khuli rahein par stock count alag ho jaaye (available par inconsistent). Dono ek saath nahi.',
        codeExample:
          '// CAP: pick 2 of 3 (partition tolerance is a must)\n//   CP -> Consistency + Partition tolerance (banking)\n//   AP -> Availability + Partition tolerance (social feed)\n// AP systems use "eventual consistency".',
        keyPoints: [
          'Consistency, Availability, Partition tolerance — pick 2',
          'Partitions are unavoidable -> choose CP or AP',
          'CP: banking (correctness first)',
          'AP: feeds (availability first, eventual consistency)',
        ],
        quiz: [
          {
            question: 'CAP theorem lets you guarantee how many of the 3 properties?',
            options: ['all 3', '2', '1', 'none'],
            correctIndex: 1,
          },
          {
            question: 'A banking system typically chooses…',
            options: ['AP (availability)', 'CP (consistency)', 'neither', 'caching'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the CAP theorem and give a real example of choosing CP vs AP.',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'CAP says a distributed system can only guarantee two of Consistency, Availability, and Partition tolerance simultaneously. Because network partitions will happen, partition tolerance is mandatory, so the real choice during a partition is between consistency and availability. CP example: a banking/payments system — it would rather reject a request (lose availability) than show a wrong balance (lose consistency). AP example: a social media feed or shopping cart — it stays available and accepts writes during a partition, reconciling later via eventual consistency, because showing slightly stale likes is fine. Many real systems are tunable per operation.',
              hinglish:
                'CAP kehta hai ek distributed system Consistency, Availability, aur Partition tolerance mein se sirf do ek saath guarantee kar sakta hai. Kyunki network partitions honge hi, partition tolerance zaroori hai, to partition ke dauraan asli choice consistency aur availability ke beech hai. CP example: banking/payments — wo request reject kar dega (availability kho ke) bajaye galat balance dikhane ke (consistency kho ke). AP example: social feed ya shopping cart — partition ke dauraan available rehta hai aur writes accept karta hai, baad mein eventual consistency se reconcile, kyunki thoda stale likes dikhana theek hai. Bahut real systems per-operation tunable hote hain.',
            },
          },
        ],
      },
      {
        title: 'Message Queues',
        difficulty: 'medium',
        tags: ['message-queue', 'async'],
        explanation: {
          english:
            'A message queue decouples services by letting a producer drop a message that a consumer processes later, asynchronously (e.g. RabbitMQ, Kafka, SQS). This smooths traffic spikes (buffering), improves resilience (if a consumer is down, messages wait), and enables background work (sending emails, processing videos) without blocking the user request. Trade-offs: added complexity, eventual consistency, and the need to handle duplicate/out-of-order messages.',
          hinglish:
            'Message queue services ko decouple karta hai — producer ek message daal de jo consumer baad mein, asynchronously process kare (jaise RabbitMQ, Kafka, SQS). Ye traffic spikes smooth karta hai (buffering), resilience badhata hai (consumer down ho to messages wait karein), aur background work (emails bhejna, videos process karna) bina user request block kiye possible karta hai. Trade-offs: extra complexity, eventual consistency, aur duplicate/out-of-order messages handle karne ki zaroorat.',
        },
        dailyLifeExample:
          'Message queue restaurant ke order-slip rail jaisa hai — waiter (producer) slip lagata hai, cook (consumer) jab free ho tab uthata hai. Bheed mein slips wait karti hain, kuch khota nahi.',
        codeExample:
          '// Producer -> [ Queue ] -> Consumer (async)\n//   e.g. user signs up -> push "send-welcome-email" job\n//        email worker processes it later\n// Benefits: decoupling, buffering spikes, background work\n// Handle: duplicates, ordering, retries.',
        keyPoints: [
          'Decouples producer & consumer (async)',
          'Buffers spikes; improves resilience',
          'Enables background/async work',
          'Handle duplicates, ordering, retries',
        ],
        quiz: [
          {
            question: 'A message queue mainly provides…',
            options: ['synchronous blocking', 'async decoupling between services', 'data encryption', 'indexing'],
            correctIndex: 1,
          },
          {
            question: 'Sending welcome emails after signup is best done…',
            options: ['synchronously in the request', 'via a background queue', 'in the database', 'in CSS'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Monolith vs Microservices',
        difficulty: 'medium',
        tags: ['microservices', 'architecture'],
        explanation: {
          english:
            'A monolith is one deployable application containing all features — simple to build, test, and deploy early on, but it gets hard to scale and maintain as it grows. Microservices split the app into small, independently deployable services that communicate over the network — each can scale and be developed separately, but you add network complexity, distributed transactions, and operational overhead. Start with a monolith; move to microservices when scale and team size justify it.',
          hinglish:
            'Monolith ek deployable application hai jisme saare features — shuru mein build, test, deploy karna simple, par badhne pe scale aur maintain karna mushkil. Microservices app ko chhote, independently deployable services mein split karte hain jo network pe communicate karein — har ek alag scale aur develop ho sake, par tum network complexity, distributed transactions, aur operational overhead add karte ho. Monolith se shuru karo; jab scale aur team size justify karein tab microservices.',
        },
        dailyLifeExample:
          'Monolith ek single-kitchen restaurant jaisa hai (sab ek jagah). Microservices food-court jaisa hai — alag-alag stalls (services), har ek apna kaam, par coordinate karna padta hai.',
        codeExample:
          '// Monolith: [ UI + Auth + Orders + Payments ] one app\n//   simple early; hard to scale/maintain later\n//\n// Microservices: Auth | Orders | Payments (separate)\n//   independent scaling/deploys; network + ops complexity\n// Rule: start monolith, split when justified.',
        keyPoints: [
          'Monolith: one app — simple early, hard to scale later',
          'Microservices: independent services over network',
          'Microservices scale/deploy separately (more ops)',
          'Start monolith; split when scale/team justify',
        ],
        quiz: [
          {
            question: 'Microservices communicate…',
            options: ['in one process', 'over the network', 'via CSS', 'never'],
            correctIndex: 1,
          },
          {
            question: 'For a brand-new small product, you should usually start with…',
            options: ['microservices', 'a monolith', 'no backend', 'many databases'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Consistency & Resilience',
    level: 'advanced',
    description: 'Consistency models, idempotency, resilience aur estimation.',
    concepts: [
      {
        title: 'Consistency Models (Strong vs Eventual)',
        difficulty: 'hard',
        tags: ['consistency', 'distributed'],
        explanation: {
          english:
            'When data is replicated, consistency defines what a read sees after a write. Strong consistency means every read returns the latest write (as if there is one copy) — simple to reason about but slower and less available during partitions (needed for banking, inventory). Eventual consistency means replicas converge over time; a read might briefly return stale data — faster and highly available (fine for likes, view counts, social feeds). There are middle grounds like read-your-own-writes and causal consistency. Choose per feature: money needs strong; a like count can be eventual.',
          hinglish:
            'Jab data replicate hota hai, consistency define karti hai ek read write ke baad kya dekhta hai. Strong consistency matlab har read latest write deta hai (jaise ek hi copy ho) — samajhna simple par slow aur partitions mein kam available (banking, inventory ke liye chahiye). Eventual consistency matlab replicas time ke saath converge karte hain; read thodi der stale data de sakta hai — fast aur highly available (likes, view counts, social feeds ke liye theek). Beech ke options bhi hain jaise read-your-own-writes aur causal consistency. Per feature chuno: paise ko strong; like count eventual ho sakta hai.',
        },
        dailyLifeExample:
          'Strong consistency bank balance jaisa hai — har jagah turant same dikhe. Eventual consistency Instagram like count jaisa hai — abhi 100 dikhe, 2 second baad 102; thoda stale chalega.',
        codeExample:
          '// Strong: read ALWAYS sees the latest write\n//   -> banking, inventory, bookings (correctness first)\n// Eventual: replicas converge over time (brief staleness)\n//   -> likes, view counts, feeds (availability first)\n// Middle: read-your-own-writes, causal consistency\n// Trade-off ties back to CAP (CP vs AP).',
        keyPoints: [
          'Strong: every read sees the latest write (slower)',
          'Eventual: replicas converge; brief staleness (faster)',
          'Strong for money/inventory; eventual for likes/feeds',
          'Tied to CAP (CP vs AP); choose per feature',
        ],
        quiz: [
          {
            question: 'Eventual consistency means…',
            options: ['reads always see the latest write', 'replicas converge over time (brief staleness)', 'no replication', 'data is lost'],
            correctIndex: 1,
          },
          {
            question: 'Which needs strong consistency?',
            options: ['a like counter', 'a bank balance', 'view counts', 'a news feed'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Idempotency',
        difficulty: 'hard',
        tags: ['idempotency', 'reliability'],
        explanation: {
          english:
            'An operation is idempotent if doing it multiple times has the same effect as doing it once. This is crucial in distributed systems because networks fail and clients retry — without idempotency, a retried "charge payment" could double-charge. HTTP GET, PUT, and DELETE are idempotent; POST usually is not. The standard fix is an idempotency key: the client sends a unique key with the request; the server records it and, on a retry with the same key, returns the original result instead of repeating the action.',
          hinglish:
            'Ek operation idempotent hai agar use kai baar karne ka wahi effect ho jo ek baar karne ka. Ye distributed systems mein crucial hai kyunki networks fail hote hain aur clients retry karte hain — idempotency ke bina, retried "charge payment" double-charge kar sakta hai. HTTP GET, PUT, aur DELETE idempotent hain; POST aksar nahi. Standard fix ek idempotency key hai: client request ke saath ek unique key bhejta hai; server use record karta hai aur same key se retry pe action repeat karne ke bajaye original result deta hai.',
        },
        dailyLifeExample:
          'Idempotency lift ka button baar-baar dabane jaisa hai — ek baar ya 10 baar, lift ek hi baar aayegi. Bina idempotency ke "payment" button do baar dab gaya to do baar paisa kat jaaye — galat.',
        codeExample:
          '// Retry-safe payment with an idempotency key\n// POST /charge\n// Idempotency-Key: 7f3a-...-91\n//\n// server:\n//   if (seen(key)) return storedResult(key); // no double charge\n//   result = charge(...)\n//   store(key, result)\n//   return result\n// GET/PUT/DELETE are idempotent; POST usually is not.',
        keyPoints: [
          'Same effect whether done once or many times',
          'Critical because clients retry on network failure',
          'GET/PUT/DELETE idempotent; POST usually not',
          'Use an idempotency key to dedupe retries',
        ],
        quiz: [
          {
            question: 'An idempotent operation, repeated, has…',
            options: ['a different effect each time', 'the same effect as doing it once', 'no effect ever', 'random effects'],
            correctIndex: 1,
          },
          {
            question: 'How do you make a payment POST retry-safe?',
            options: ['ignore retries', 'use an idempotency key', 'charge twice', 'disable the network'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you prevent double charging when a payment request is retried?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Make the charge endpoint idempotent using an idempotency key. The client generates a unique key per logical payment attempt and sends it with the request (e.g. an Idempotency-Key header). On the server, before charging, atomically check whether that key has been processed: if yes, return the stored original response without charging again; if no, perform the charge, store the key with its result, and return it. Use a database unique constraint or an atomic Redis SET-if-not-exists to handle two simultaneous retries safely. This guarantees at-most-once side effects even though the network delivers the request more than once.',
              hinglish:
                'Charge endpoint ko ek idempotency key se idempotent banao. Client har logical payment attempt ke liye ek unique key generate karke request ke saath bhejta hai (jaise Idempotency-Key header). Server pe, charge se pehle, atomically check karo ki wo key process ho chuki hai: agar haan, stored original response wapas do bina dobara charge kiye; agar nahi, charge karo, key ko uske result ke saath store karo, aur return karo. Do simultaneous retries ko safely handle karne ke liye database unique constraint ya atomic Redis SET-if-not-exists use karo. Isse at-most-once side effects guarantee hote hain chahe network request ek se zyada baar deliver kare.',
            },
          },
        ],
      },
      {
        title: 'Resilience Patterns (Timeouts, Retries, Circuit Breaker)',
        difficulty: 'hard',
        tags: ['resilience', 'circuit-breaker'],
        explanation: {
          english:
            'In distributed systems, dependencies fail — design for it. Timeouts stop a call from hanging forever. Retries with exponential backoff and jitter handle transient failures without stampeding. A circuit breaker stops calling a failing service after a threshold of errors (it "opens"), failing fast and letting the service recover, then "half-opens" to test before closing. Bulkheads isolate resources so one overloaded dependency cannot sink the whole system. Graceful degradation serves a reduced experience (e.g. cached/stale data) instead of total failure.',
          hinglish:
            'Distributed systems mein dependencies fail hote hain — uske liye design karo. Timeouts ek call ko hamesha hang hone se rokte hain. Retries with exponential backoff aur jitter transient failures handle karte hain bina stampede. Circuit breaker errors ke threshold ke baad failing service ko call karna band kar deta hai (ye "open" ho jaata hai), fast fail karke service ko recover hone deta hai, phir "half-open" hoke test karta hai band karne se pehle. Bulkheads resources isolate karte hain taaki ek overloaded dependency poore system ko na duboye. Graceful degradation total failure ke bajaye reduced experience deta hai (jaise cached/stale data).',
        },
        dailyLifeExample:
          'Circuit breaker ghar ke fuse jaisa hai — short circuit hone par bijli kaat deta hai taaki poora ghar na jale, phir thik hone pe wapas on. Retry with backoff "thodi der baad dobara try karo" jaisa hai, turant nahi.',
        codeExample:
          '// Timeout: fail a call after e.g. 2s (no hanging)\n// Retry w/ backoff + jitter: wait 1s, 2s, 4s (+random)\n// Circuit breaker states:\n//   CLOSED  -> calls flow; count failures\n//   OPEN    -> too many failures -> fail fast, do not call\n//   HALF-OPEN -> allow a test call -> close if it succeeds\n// Bulkhead: isolate pools; Degrade gracefully (serve cache)',
        keyPoints: [
          'Timeouts stop calls hanging forever',
          'Retry with exponential backoff + jitter (transient fails)',
          'Circuit breaker: fail fast when a dependency is down',
          'Bulkheads isolate; degrade gracefully (serve stale)',
        ],
        quiz: [
          {
            question: 'A circuit breaker "opens" to…',
            options: ['retry forever', 'fail fast and let a failing service recover', 'encrypt data', 'add latency'],
            correctIndex: 1,
          },
          {
            question: 'Adding randomness to retry delays (jitter) prevents…',
            options: ['encryption', 'a retry stampede (thundering herd)', 'caching', 'logging'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Back-of-the-Envelope Estimation',
        difficulty: 'medium',
        tags: ['estimation', 'capacity'],
        explanation: {
          english:
            'In a design interview you estimate scale to justify decisions. Steps: (1) users and requests — e.g. 100M daily active users, 10 reads each = 1B reads/day ≈ ~12,000 QPS average, with peaks ~2-3x. (2) Storage — bytes per item × items × retention (e.g. 1KB per tweet × 500M/day × 5 years). (3) Bandwidth — QPS × payload size. (4) Memory for cache — cache the hot 20% (Pareto). Handy numbers: 1 day ≈ 86,400 s (~10^5), reads usually ≫ writes. You do not need exact figures — round to powers of ten to show you can reason about scale.',
          hinglish:
            'Design interview mein tum scale estimate karke decisions justify karte ho. Steps: (1) users aur requests — jaise 100M daily active users, har ek 10 reads = 1B reads/day ≈ ~12,000 QPS average, peaks ~2-3x. (2) Storage — bytes per item × items × retention (jaise 1KB per tweet × 500M/day × 5 years). (3) Bandwidth — QPS × payload size. (4) Cache ke liye memory — hot 20% cache karo (Pareto). Kaam ke numbers: 1 day ≈ 86,400 s (~10^5), reads aksar writes se ≫. Exact figures nahi chahiye — powers of ten mein round karo taaki dikhe ki tum scale pe reason kar sakte ho.',
        },
        dailyLifeExample:
          'Estimation ek shaadi ka khana plan karne jaisa hai — "500 mehmaan × 400g khana = 200kg" — exact nahi par right ballpark, taaki tum sahi intezaam (servers/storage) karo.',
        codeExample:
          '// Example: Twitter-like read QPS\n//   100M DAU x 10 reads/day = 1,000,000,000 reads/day\n//   /86,400 s ≈ ~11,600 QPS average; peak ~2-3x\n//\n// Storage: 1KB/tweet x 500M tweets/day x 365 x 5y\n//   ≈ ~900 TB over 5 years\n// Cache: hot 20% in memory (Pareto). Reads ≫ writes.',
        keyPoints: [
          'Estimate users -> QPS -> storage -> bandwidth -> cache',
          '1 day ≈ 86,400s; peak ≈ 2-3x average',
          'Cache the hot ~20% (Pareto); reads ≫ writes',
          'Round to powers of ten — reasoning matters, not exactness',
        ],
        quiz: [
          {
            question: 'Roughly how many seconds are in a day (for QPS math)?',
            options: ['3,600', '86,400', '1,000,000', '10,000'],
            correctIndex: 1,
          },
          {
            question: 'Peak traffic is usually estimated as ___ the average.',
            options: ['0.5x', '2-3x', '100x', 'the same as'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Case Studies (Design X)',
    level: 'advanced',
    description: 'Real system design walkthroughs — TinyURL, feed, chat, notifications.',
    concepts: [
      {
        title: 'Design a URL Shortener (TinyURL)',
        difficulty: 'hard',
        tags: ['case-study', 'url-shortener'],
        explanation: {
          english:
            'Requirements: shorten a long URL to a short code, redirect from the short code, handle huge read traffic (reads ≫ writes), optional custom alias and expiry, plus click analytics. Design: (1) Generate a unique short code — encode an auto-increment ID in base62 [a-zA-Z0-9] (7 chars = 62^7 ≈ 3.5 trillion URLs), or hash + collision check. (2) Store mapping {code -> longURL} in a database keyed by code. (3) Put a cache (Redis) in front — lookups are extremely read-heavy. (4) On GET /code, look up (cache then DB) and return HTTP 301/302 redirect. (5) Scale: read replicas + caching for reads, shard by code for storage; push click events to an async queue for analytics; add rate limiting and a CDN. Trade-offs: 301 (permanent, cached by browser, fewer analytics hits) vs 302 (temporary, every click reaches you).',
          hinglish:
            'Requirements: long URL ko short code mein shorten karo, short code se redirect, huge read traffic handle (reads ≫ writes), optional custom alias aur expiry, plus click analytics. Design: (1) Unique short code generate — auto-increment ID ko base62 [a-zA-Z0-9] mein encode (7 chars = 62^7 ≈ 3.5 trillion URLs), ya hash + collision check. (2) Mapping {code -> longURL} ko code se keyed database mein store. (3) Aage cache (Redis) lagao — lookups bahut read-heavy. (4) GET /code pe look up (cache phir DB) aur HTTP 301/302 redirect. (5) Scale: reads ke liye read replicas + caching, storage ke liye code se shard; analytics ke liye click events async queue pe push; rate limiting aur CDN add. Trade-offs: 301 (permanent, browser cache, kam analytics hits) vs 302 (temporary, har click tum tak aaye).',
        },
        dailyLifeExample:
          'TinyURL ek coat-check token jaisa hai — lambi coat (long URL) deke ek chhota token (short code) milta hai; token dikhao to coat wapas (redirect). Token chhota par unique.',
        codeExample:
          '// Write: POST /shorten { url }\n//   id = nextId()                 // auto-increment\n//   code = base62(id)             // e.g. "aZ8kP2q"\n//   db.put(code, url); return code\n//\n// Read: GET /aZ8kP2q\n//   url = cache.get(code) || db.get(code)\n//   return 301/302 redirect to url\n//\n// Scale: cache + read replicas (reads), shard by code (storage),\n//        async queue for click analytics, rate limit, CDN.',
        keyPoints: [
          'base62(auto-increment id) -> short unique code (7 chars ~ 3.5T)',
          'Store {code -> URL}; cache heavily (read-heavy)',
          'GET code -> 301/302 redirect',
          'Scale: replicas+cache (read), shard (storage), async analytics',
        ],
        quiz: [
          {
            question: 'A 7-character base62 code can encode roughly how many URLs?',
            options: ['a few thousand', '~3.5 trillion', 'exactly 100', 'unlimited instantly'],
            correctIndex: 1,
          },
          {
            question: 'A URL shortener is mostly…',
            options: ['write-heavy', 'read-heavy (redirects)', 'compute-heavy', 'storage-only'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you generate unique short codes and avoid collisions?',
            difficulty: 'hard',
            frequency: 'very-common',
            answer: {
              english:
                'Two common approaches. (1) Counter + base62: keep a globally unique auto-incrementing ID (from the DB or a distributed ID generator like a ticket server / Snowflake) and encode it in base62 to get a short string. This guarantees uniqueness with no collision check, and 7 base62 chars cover ~3.5 trillion codes. (2) Hashing: hash the long URL (e.g. MD5) and take the first N characters; this can collide, so you check the DB and, on a clash, append/retry or rehash. The counter approach is simpler and collision-free but reveals ordering; hashing hides ordering but needs collision handling. For custom aliases, just check availability and reserve the chosen code.',
              hinglish:
                'Do common approaches. (1) Counter + base62: ek globally unique auto-incrementing ID rakho (DB se ya distributed ID generator jaise ticket server / Snowflake se) aur use base62 mein encode karke short string banao. Ye bina collision check uniqueness guarantee karta hai, aur 7 base62 chars ~3.5 trillion codes cover karte hain. (2) Hashing: long URL ko hash karo (jaise MD5) aur pehle N characters lo; ye collide kar sakta hai, to DB check karo aur clash pe append/retry ya rehash. Counter approach simpler aur collision-free par ordering reveal karta hai; hashing ordering chhupata hai par collision handling chahiye. Custom aliases ke liye bas availability check karke chosen code reserve karo.',
            },
          },
        ],
      },
      {
        title: 'Design a News Feed (Instagram / Twitter)',
        difficulty: 'hard',
        tags: ['case-study', 'news-feed'],
        explanation: {
          english:
            'Requirements: users follow others and see a feed of recent posts, fast loads, huge scale, reads ≫ writes. Two core strategies. Fan-out on write (push): when a user posts, copy the post id into each follower\'s precomputed feed (in a cache like Redis). Reads are instant, but a celebrity with 50M followers causes a massive write fan-out ("the celebrity problem"). Fan-out on read (pull): build the feed at read time by merging the latest posts from people you follow — cheap writes, but slower, heavier reads. Real systems use a hybrid: push for normal users, pull for celebrities, then merge. Add caching, pagination (cursor-based), ranking, and a CDN for media.',
          hinglish:
            'Requirements: users doosron ko follow karein aur recent posts ka feed dekhein, fast loads, huge scale, reads ≫ writes. Do core strategies. Fan-out on write (push): jab user post kare, post id ko har follower ke precomputed feed mein copy karo (Redis jaise cache mein). Reads instant, par 50M followers wala celebrity massive write fan-out karta hai ("celebrity problem"). Fan-out on read (pull): read time pe feed banao jin logon ko follow karte ho unki latest posts merge karke — cheap writes, par slower, heavier reads. Real systems hybrid use karte hain: normal users ke liye push, celebrities ke liye pull, phir merge. Caching, pagination (cursor-based), ranking, aur media ke liye CDN add karo.',
        },
        dailyLifeExample:
          'Fan-out on write akhbaar har ghar pahuncha dene jaisa hai (padhne pe turant ready). Fan-out on read tab akhbaar banane jaisa hai jab tum maango. Celebrity ke liye har ghar copy karna mehnga — isliye unke liye pull.',
        codeExample:
          '// Fan-out on WRITE (push): user posts ->\n//   for each follower: feed[follower].add(postId)  // Redis list\n//   read = instant; celebrity write fan-out = huge\n//\n// Fan-out on READ (pull): feed(user) =\n//   merge(latest posts of everyone user follows)\n//   cheap write; heavier read\n//\n// Hybrid: push for normal users, pull for celebrities, merge.\n// Add cache, cursor pagination, ranking, CDN for media.',
        keyPoints: [
          'Fan-out on write (push): precompute feeds — instant reads',
          'Celebrity problem: huge write fan-out for big accounts',
          'Fan-out on read (pull): merge at read — cheap writes',
          'Hybrid (push + pull), cache, cursor pagination, CDN',
        ],
        quiz: [
          {
            question: 'Fan-out on write makes the feed…',
            options: ['slow to read', 'precomputed (fast reads, heavy writes)', 'unavailable', 'random'],
            correctIndex: 1,
          },
          {
            question: 'The "celebrity problem" affects which strategy most?',
            options: ['fan-out on read', 'fan-out on write (push)', 'caching', 'pagination'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you handle the celebrity problem in a news feed?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'With pure fan-out on write, posting by an account with tens of millions of followers triggers tens of millions of feed writes — slow and expensive. The standard solution is a hybrid model: use fan-out on write (push) for normal users so most feeds are precomputed and read instantly, but for celebrities/high-follower accounts switch to fan-out on read (pull) — do NOT fan out their posts. When a user loads their feed, take their precomputed feed (from normal follows) and merge it at read time with the latest posts pulled from the few celebrities they follow, then rank. This caps write amplification while keeping reads fast. Caching and pagination further reduce load.',
              hinglish:
                'Pure fan-out on write mein, crore-followers wale account ki post crore feed writes trigger karti hai — slow aur mehnga. Standard solution hybrid model hai: normal users ke liye fan-out on write (push) use karo taaki zyadatar feeds precomputed aur instantly read hon, par celebrities/high-follower accounts ke liye fan-out on read (pull) pe switch karo — unki posts fan out mat karo. Jab user feed load kare, uska precomputed feed (normal follows se) lo aur read time pe un kuch celebrities ki latest posts (jinhe wo follow karta hai) ke saath merge karke rank karo. Isse write amplification cap hota hai aur reads fast rehte hain. Caching aur pagination load aur kam karte hain.',
            },
          },
        ],
      },
      {
        title: 'Design a Chat System (WhatsApp)',
        difficulty: 'hard',
        tags: ['case-study', 'chat'],
        explanation: {
          english:
            'Requirements: 1:1 and group messaging, real-time delivery, online/last-seen presence, delivery/read receipts, message history, and offline delivery. Design: clients hold a persistent WebSocket to a chat server (via a load balancer that supports sticky sessions). A user-to-server mapping (in Redis) tracks which server a user is connected to, so a message is routed to the recipient\'s server and pushed instantly; if offline, it is stored and delivered on reconnect. Messages are persisted in a write-heavy store (e.g. Cassandra) partitioned by chat id. Group messages fan out to members. Presence is tracked via heartbeats with a TTL. Receipts are just status updates (sent -> delivered -> read).',
          hinglish:
            'Requirements: 1:1 aur group messaging, real-time delivery, online/last-seen presence, delivery/read receipts, message history, aur offline delivery. Design: clients ek persistent WebSocket chat server se rakhte hain (sticky sessions support karne wale load balancer ke through). Ek user-to-server mapping (Redis mein) track karta hai user kis server se connected hai, taaki message recipient ke server pe route hoke instantly push ho; agar offline, store karke reconnect pe deliver. Messages ek write-heavy store (jaise Cassandra) mein chat id se partition karke persist hote hain. Group messages members ko fan out hote hain. Presence heartbeats with TTL se track. Receipts bas status updates hain (sent -> delivered -> read).',
        },
        dailyLifeExample:
          'Chat system ek post-office + open phone line jaisa hai — online ho to seedha (WebSocket) message; offline ho to letter store hota hai aur lautne pe milta hai. Receipt "deliver hua / padh liya" stamp jaisa.',
        codeExample:
          '// Each client: persistent WebSocket to a chat server\n// Redis: userId -> serverId (who is connected where)\n//\n// send(msgFrom A to B):\n//   persist(message)                  // Cassandra (by chat id)\n//   server = redis.get(B)\n//   if (server) push to B via WebSocket // online -> instant\n//   else queue for offline delivery     // deliver on reconnect\n//\n// Presence: heartbeat + TTL; receipts: sent->delivered->read.',
        keyPoints: [
          'Persistent WebSocket per client (sticky load balancing)',
          'Redis maps user -> connected server for routing',
          'Persist messages in a write-heavy store (Cassandra) by chat id',
          'Offline queue, group fan-out, heartbeat presence, receipts',
        ],
        quiz: [
          {
            question: 'Chat systems use which connection for real-time delivery?',
            options: ['short polling', 'persistent WebSocket', 'a cron job', 'plain GET'],
            correctIndex: 1,
          },
          {
            question: 'How is a user routed to the right chat server?',
            options: ['random', 'a user -> server mapping (e.g. in Redis)', 'by IP only', 'it is not'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Design a Notification System',
        difficulty: 'medium',
        tags: ['case-study', 'notifications'],
        explanation: {
          english:
            'Requirements: send notifications across channels (push, SMS, email, in-app) reliably and at scale, respecting user preferences and avoiding spam. Design: a service receives a notification request and drops it onto a message queue (decoupling, buffering spikes). Workers consume the queue, apply user preferences and rate limits, render the template, and call the right channel provider (APNs/FCM for push, an SMS/email provider). Use retries with backoff and a dead-letter queue for failures, idempotency keys to avoid duplicates, and templates with localisation. Store notification status for the in-app inbox. The queue makes it resilient — if a provider is down, messages wait rather than being lost.',
          hinglish:
            'Requirements: channels (push, SMS, email, in-app) ke across notifications reliably aur scale pe bhejo, user preferences respect karke aur spam avoid karke. Design: ek service notification request leke use ek message queue pe daalti hai (decoupling, spikes buffering). Workers queue consume karte hain, user preferences aur rate limits apply karte hain, template render karte hain, aur sahi channel provider call karte hain (push ke liye APNs/FCM, SMS/email provider). Failures ke liye retries with backoff aur ek dead-letter queue, duplicates avoid karne ko idempotency keys, aur localisation wale templates use karo. In-app inbox ke liye notification status store karo. Queue ise resilient banati hai — provider down ho to messages wait karein, khoyein nahi.',
        },
        dailyLifeExample:
          'Notification system ek courier hub jaisa hai — saare parcels (notifications) ek center (queue) pe aate hain, phir sahi mode (bike/van/flight = push/SMS/email) se bheje jaate hain, aur fail ho to dobara try.',
        codeExample:
          '// API -> enqueue(notification)            // decouple + buffer\n//\n// Worker:\n//   if (!prefs.allows(user, channel)) skip   // respect preferences\n//   if (rateLimited(user)) delay\n//   body = render(template, locale)\n//   send via provider (FCM/APNs, SMS, email)\n//   on fail -> retry w/ backoff -> dead-letter queue\n//   idempotency key avoids duplicates; store status (inbox).',
        keyPoints: [
          'Queue decouples & buffers; workers process async',
          'Channels: push (FCM/APNs), SMS, email, in-app',
          'Respect preferences + rate limits; templates + localisation',
          'Retries + dead-letter queue; idempotency avoids duplicates',
        ],
        quiz: [
          {
            question: 'Why put a message queue in a notification system?',
            options: ['to style messages', 'decouple services & buffer spikes (resilience)', 'to store images', 'for CSS'],
            correctIndex: 1,
          },
          {
            question: 'Failed notifications after retries typically go to a…',
            options: ['cache', 'dead-letter queue', 'CDN', 'database index'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'How would you design a URL shortener (like bit.ly)?',
    difficulty: 'hard',
    frequency: 'very-common',
    answer: {
      english:
        'Core: map a short code to a long URL. Generate a unique short code (base62 of an auto-increment ID, or a hash with collision checks). Store the mapping in a database (key = short code), and put a cache (Redis) in front for fast, read-heavy lookups. On redirect, look up the code (cache then DB) and return an HTTP 301/302 to the long URL. Scale reads with caching and read replicas; scale writes/storage with sharding by short code. Add analytics via an async queue, rate limiting to prevent abuse, and a CDN. Discuss trade-offs: code length vs capacity, custom aliases, and expiry.',
      hinglish:
        'Core: ek short code ko long URL se map karo. Unique short code generate karo (auto-increment ID ka base62, ya hash with collision checks). Mapping ek database mein store karo (key = short code), aur fast, read-heavy lookups ke liye aage cache (Redis) lagao. Redirect pe code look up karo (cache phir DB) aur long URL pe HTTP 301/302 return karo. Reads ko caching aur read replicas se scale karo; writes/storage ko short code se sharding se. Analytics async queue se, abuse rokne ko rate limiting, aur ek CDN add karo. Trade-offs discuss karo: code length vs capacity, custom aliases, aur expiry.',
    },
  },
  {
    question: 'What is rate limiting and why is it important?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Rate limiting caps how many requests a client can make in a time window (e.g. 100 requests/minute). It protects services from abuse, DDoS, and accidental overload, ensures fair usage, and controls cost. Common algorithms: fixed window, sliding window, token bucket (allows bursts up to a capacity), and leaky bucket (smooths output). It is usually enforced at the API gateway or load balancer using a fast store like Redis to track counters per client/key.',
      hinglish:
        'Rate limiting cap karta hai ek client ek time window mein kitni requests kar sakta hai (jaise 100 requests/minute). Ye services ko abuse, DDoS, aur accidental overload se bachata hai, fair usage ensure karta hai, aur cost control karta hai. Common algorithms: fixed window, sliding window, token bucket (capacity tak bursts allow), aur leaky bucket (output smooth). Ye aksar API gateway ya load balancer pe enforce hota hai, Redis jaise fast store se per client/key counters track karke.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
