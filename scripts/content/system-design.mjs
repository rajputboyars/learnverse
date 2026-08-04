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
    description: 'Scalability, load balancing, latency/throughput aur availability — har production system ki neenv. Ye concepts bina samjhe koi bhi design interview ya real-world architecture nahi samjha ja sakta.',
    concepts: [
      {
        title: 'Scalability (Vertical vs Horizontal)',
        difficulty: 'easy',
        tags: ['scalability'],
        explanation: {
          english:
            'Scalability is a system\'s ability to handle growing load — more users, more data, more requests — without crashing or slowing down unacceptably.\n\nVertical scaling (scale up): you upgrade the single machine — more CPU cores, more RAM, faster SSD. It is operationally simple (no code changes, no distributed logic), but has three big drawbacks: (1) a hard hardware ceiling, (2) it gets exponentially expensive at the top end, and (3) there is a single point of failure — if that one machine goes down, everything goes down.\n\nHorizontal scaling (scale out): you add more identical, smaller machines behind a load balancer. Each machine handles a share of the traffic. Virtually unlimited capacity — just add more boxes. If one server dies, the others keep serving. But your service code must be stateless (no local session data) because any request can land on any server. Sessions, caches, and files must live in shared external stores (Redis, S3).\n\nRule of thumb: start vertical (simplest path to MVP), then re-architect for horizontal when a single machine\'s limits are approaching.',
          hinglish:
            'Scalability ek system ki capability hai ki wo badhte load — zyada users, zyada data, zyada requests — ke saath bina crash kiye ya slow hue kaam karta rahe.\n\nVertical scaling (scale up): ek hi machine upgrade karo — zyada CPU cores, zyada RAM, faster SSD. Operationally simple hai (koi code change nahi, distributed logic nahi), lekin teen bade drawbacks: (1) hardware ki hard ceiling, (2) top pe bahut mehnga, aur (3) single point of failure — woh ek machine gayi to sab kuch gaya.\n\nHorizontal scaling (scale out): load balancer ke peeche aur identical chhoti machines add karo. Har machine traffic ka ek share handle kare. Virtually unlimited capacity — bas aur boxes add karo. Ek server die hone par baaki serve karte rehte hain. Par service code stateless hona chahiye (koi local session data nahi) kyunki koi bhi request kisi bhi server pe ja sakti hai. Sessions, caches, files shared external stores (Redis, S3) mein rehni chahiye.\n\nRule of thumb: vertical se shuru karo (MVP ka sabse seedha raasta), phir jab ek machine ki limits paas aayen to horizontal ke liye re-architect karo.',
        },
        dailyLifeExample:
          'Vertical = ek hi cook ko speed-training dena — ek limit aati hai aur wo bimaar pada to dukaan band. Horizontal = zyada cooks hire karo, counter badhao — ek abscent to baaki chalte hain, aur jitne chahiye utne add karo.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// VERTICAL SCALING (Scale Up) — simple but limited\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//   ┌────────────────────────────────────┐\n//   │         ONE BIG SERVER             │\n//   │   256 CPU cores  /  4 TB RAM       │\n//   │   All traffic → this machine       │\n//   │   Machine dies → service is DOWN   │  ← SPOF\n//   │   Hit hardware ceiling → STUCK     │  ← hard limit\n//   └────────────────────────────────────┘\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// HORIZONTAL SCALING (Scale Out) — preferred\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//                  ┌──────────────────┐\n//   Users ────────►│   Load Balancer  │\n//                  └────────┬─────────┘\n//          ┌────────────────┼────────────────┐\n//          ▼                ▼                ▼\n//   ┌────────────┐  ┌────────────┐  ┌────────────┐\n//   │  Server A  │  │  Server B  │  │  Server C  │\n//   └────────────┘  └────────────┘  └────────────┘\n//    (add Server D, E … as traffic grows)\n//\n// REQUIREMENT: Services must be STATELESS\n//   ✗ session stored in server memory  → breaks with >1 server\n//   ✓ session stored in Redis / DB     → any server can handle it',
        keyPoints: [
          'Scalability = handle growing load without degrading',
          'Vertical: bigger machine — simple, expensive at limit, SPOF',
          'Horizontal: more machines + LB — unlimited, fault-tolerant',
          'Horizontal requires stateless services + shared stores (Redis/S3)',
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
            'A load balancer (LB) sits in front of your servers and routes each incoming request to one of them, so no single server is overwhelmed. It is what makes horizontal scaling actually work.\n\nKey jobs: (1) Traffic distribution — spreads load evenly (or smartly) across servers. (2) Health checks — the LB pings each server every few seconds; if one does not respond, it stops sending traffic there until it recovers. (3) SSL termination — the LB can decrypt HTTPS so backend servers deal only with plain HTTP. (4) Removing the SPOF — instead of one server that can crash, you have many; the LB itself is redundant (active-active or active-passive pairs).\n\nRouting strategies:\n- Round Robin: request 1 → Server A, request 2 → Server B, request 3 → Server C, request 4 → Server A… Simplest. Works well when all servers are equal.\n- Least Connections: always send to the server with the fewest active connections. Better when requests have variable duration.\n- IP Hash: hash(client IP) → always the same server. Gives sticky sessions without storing session server-side.\n- Weighted: some servers get more traffic (useful if machines have different capacity).\n\nLayer 4 LBs route at the TCP level (fast). Layer 7 LBs understand HTTP — they can route by URL path, headers, cookie — enabling features like sending /api/* to one server farm and /static/* to another.',
          hinglish:
            'Load balancer tumhare servers ke aage baithta hai aur har incoming request ko unhe route karta hai, taaki koi ek server overwhelm na ho. Ye hi hai jo horizontal scaling ko actually kaam karata hai.\n\nKey jobs: (1) Traffic distribution — load evenly (ya smartly) servers mein spread karo. (2) Health checks — LB har kuch seconds mein har server ping karta hai; koi respond na kare to traffic wahan bhejana band jab tak recover na ho. (3) SSL termination — LB HTTPS decrypt kar sakta hai taaki backend servers sirf plain HTTP deal karein. (4) SPOF hatana — ek server ke bajaye bahut hain; LB khud bhi redundant hai (active-active ya active-passive pairs).\n\nRouting strategies:\n- Round Robin: request 1 → Server A, 2 → Server B, 3 → Server C, 4 → Server A… Simplest. Jab sab servers equal hon tab accha kaam karta hai.\n- Least Connections: hamesha sabse kam active connections wale server pe bhejo. Jab requests ki duration vary kare tab behtar.\n- IP Hash: hash(client IP) → hamesha same server. Session server-side store kiye bina sticky sessions deta hai.\n- Weighted: kuch servers zyada traffic paate hain (agar machines ki capacity alag ho).\n\nLayer 4 LBs TCP level pe route karte hain (fast). Layer 7 LBs HTTP samajhte hain — URL path, headers, cookie se route kar sakte hain — jaise /api/* ek server farm pe aur /static/* doosre pe.',
        },
        dailyLifeExample:
          'LB ek airport ke queue manager jaisa hai — naye passengers (requests) ko sabse khaali counter (server) pe bhejta hai. Ek counter band ho to wahaan bhejana band; koi ek extra busy ho to use thoda rest do. Manager khud bhi ek nahi, do hain (redundant).',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// LOAD BALANCER — TRAFFIC FLOW\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//                     ┌─────────────────────────┐\n//   Internet ────────►│     Load Balancer        │\n//   (all traffic)     │  • SSL termination       │\n//                     │  • health checks         │\n//                     │  • routing strategy      │\n//                     └──────────┬──────────────┘\n//              ┌─────────────────┼──────────────────┐\n//              ▼                 ▼                  ▼\n//       ┌──────────┐      ┌──────────┐      ┌──────────┐\n//       │ Server A │ ✓    │ Server B │ ✓    │ Server C │ ✗ DOWN\n//       └──────────┘      └──────────┘      └──────────┘\n//       (healthy)         (healthy)          (health check fails\n//                                             → LB stops routing here)\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// ROUTING STRATEGIES\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n// Round Robin:       req1→A, req2→B, req3→C, req4→A …\n// Least Connections: → always whichever server has fewest active\n// IP Hash:           hash(clientIP) % N → sticky (same client, same server)\n// Weighted:          A gets 60%, B gets 40% (different machine sizes)\n//\n// Layer 4 LB: routes at TCP level (fast, dumb)\n// Layer 7 LB: routes by URL/headers/cookies (smart, more features)',
        keyPoints: [
          'Distributes requests; prevents any one server from overloading',
          'Health checks auto-remove failed servers from rotation',
          'Strategies: round robin, least connections, IP hash, weighted',
          'Layer 7 LB routes by URL path / headers (smarter)',
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
            'These are the two most fundamental performance metrics, and interviews always ask you to define and distinguish them.\n\nLatency: the time elapsed from when a request is sent to when the response is fully received — basically "how fast is one operation?" Measured in milliseconds (ms). Broken into components: network round-trip + server processing + DB query + serialisation. You reduce it with caching, faster algorithms, closer data, and edge servers.\n\nThroughput: how many requests the system can handle per unit of time — "how much work in parallel?" Measured in requests/second (RPS) or queries/second (QPS). You increase it with horizontal scaling, async processing, and batching.\n\nThey are related but not the same, and you can trade one for the other:\n- A single very fast server might have low latency but limited throughput.\n- Batching many writes into one DB call improves throughput but adds latency per item.\n- CDNs reduce latency at the edge but do not directly increase your origin\'s throughput.\n\nAlways report latency as percentiles, NOT averages: if 99 requests take 10ms and one takes 5 seconds, the average is ~60ms — which sounds fine but 1% of your users are furious. p50 (median), p95, and p99 reveal the true distribution.\n\nIn interviews: state your latency SLO (e.g. "p99 < 200ms") and your throughput requirement (e.g. "10k QPS peak") up front — everything else flows from those.',
          hinglish:
            'Ye do sabse fundamental performance metrics hain, aur interviews mein hamesha define aur distinguish karne ko kehte hain.\n\nLatency: request bhejne se response poora milne tak ka time — basically "ek operation kitna fast hai?" Milliseconds (ms) mein measure. Components: network round-trip + server processing + DB query + serialisation. Ise caching, faster algorithms, data ko paas laake, aur edge servers se reduce karte ho.\n\nThroughput: system per unit time kitni requests handle kar sakta hai — "parallel mein kitna kaam?" RPS (requests/second) ya QPS (queries/second) mein measure. Ise horizontal scaling, async processing, aur batching se badhate ho.\n\nYe related hain par same nahi, aur tum ek ke liye doosre ko trade kar sakte ho:\n- Ek bahut fast single server mein low latency par limited throughput ho sakta hai.\n- Bahut writes ek DB call mein batch karna throughput badhata hai par har item ki latency badhati hai.\n- CDNs edge pe latency kam karte hain par origin ka throughput directly nahi badhate.\n\nLatency hamesha percentiles mein report karo, average mein NAHI: agar 99 requests 10ms leti hain aur ek 5 seconds, average ~60ms hai — jo theek lagta hai par 1% users gusse mein hain. p50 (median), p95, aur p99 true distribution dikhate hain.\n\nInterviews mein: apna latency SLO (jaise "p99 < 200ms") aur throughput requirement (jaise "10k QPS peak") pehle batao — baaki sab ussi se nikalta hai.',
        },
        dailyLifeExample:
          'Latency = ek customer ko serve karne ka time (ek cashier kitni jaldi). Throughput = ek ghante mein kitne customers serve hue (10 cashiers = high throughput). Average salary jaisa average latency hota hai — ek billionaire aate hi average bahut badhti hai jabki majority same hai. Percentiles sach batate hain.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// LATENCY vs THROUGHPUT\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n// Latency = time for ONE request   (e.g. 50 ms)\n//   Request ──────────────────────► Server\n//   ◄──────────────────────────────\n//   |←─────────── 50 ms ──────────►|\n//\n// Throughput = requests per second  (e.g. 10,000 QPS)\n//   1000 requests/100ms = 10,000 QPS\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// WHY PERCENTILES, NOT AVERAGES\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n// 99 requests at 10ms + 1 request at 5000ms\n//   Average = (99×10 + 5000) / 100 = 59.9ms  ← looks fine!\n//   p99     = 5000ms                          ← 1% are suffering\n//\n// Always report:\n//   p50  = 40ms    (50% faster than this  — typical user)\n//   p95  = 120ms   (5%  slower than this  — slow tail)\n//   p99  = 300ms   (1%  slower than this  — frustrated users)\n//   p999 = 1200ms  (0.1% slower           — really bad outliers)\n//\n// Latency budget breakdown:\n//   Network RTT:    20ms\n//   App processing:  5ms\n//   DB query:       15ms\n//   Serialization:   2ms\n//   Total:          42ms  ← keep each layer\'s budget',
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
            'Availability is what users care about — "is the system up when I need it?" It is expressed as a percentage of total time the system is reachable and serving correct responses. The "nines" notation (99.9%, 99.99%…) translates directly into downtime budget per year.\n\nReliability is a slightly different concept: a system can be up (available) but give wrong answers (unreliable). You want both. Reliability means doing the right thing consistently over time — correct results, not just HTTP 200s.\n\nHow to achieve high availability:\n1. Eliminate single points of failure (SPOF) — replicate every component (servers, LBs, databases, cache nodes).\n2. Failover — when the primary fails, traffic automatically switches to a standby replica. This can be active-active (both serve traffic) or active-passive (standby waits).\n3. Health checks — automated probes detect failures and route around them.\n4. Graceful degradation — when a non-critical dependency fails, serve a reduced experience rather than returning an error.\n5. Chaos engineering — deliberately kill components in production (Netflix Chaos Monkey) to find hidden SPOFs before incidents do.\n\nSLA vs SLO vs SLI: three layers of the same concept at different scopes. SLI (measured metric) feeds the SLO (internal target) which informs the SLA (customer-facing contract). Always set your internal SLO above your SLA so you have a buffer.',
          hinglish:
            'Availability woh hai jo users care karte hain — "kya system tab available hai jab mujhe chahiye?" Total time ka percentage hai jab system reachable aur sahi responses de raha ho. "Nines" notation (99.9%, 99.99%…) directly saal ke downtime budget mein translate hoti hai.\n\nReliability thoda alag concept hai: system up ho sakta hai (available) par galat answers de sakta hai (unreliable). Dono chahiye. Reliability matlab time ke saath consistently sahi kaam karna — sahi results, sirf HTTP 200s nahi.\n\nHigh availability kaise achieve karein:\n1. Single points of failure (SPOF) hatao — har component replicate karo (servers, LBs, databases, cache nodes).\n2. Failover — primary fail hone par traffic automatically standby replica pe switch ho. Active-active (dono serve) ya active-passive (standby wait) ho sakta hai.\n3. Health checks — automated probes failures detect karke route around karte hain.\n4. Graceful degradation — jab non-critical dependency fail ho, error return karne ke bajaye reduced experience do.\n5. Chaos engineering — production mein jaan-boojhkar components kill karo (Netflix Chaos Monkey) taaki hidden SPOFs incidents se pehle mile.\n\nSLA vs SLO vs SLI: same concept ke teen layers different scopes pe. SLI (measured metric) SLO (internal target) feed karta hai jo SLA (customer-facing contract) inform karta hai. Internal SLO hamesha SLA se upar rakho taaki buffer ho.',
        },
        dailyLifeExample:
          'Availability ek hospital ka 24/7 emergency room hona jaisa hai — hamesha khula rehna chahiye. Redundancy = do doctors, do operating rooms. Failover = ek doctor bimaar pade to doosra turant sambhal le. SLA = hospital ka patients se promise "hum 5 minute mein dekhenge". SLO = andar ka target "hum 3 minute mein dekhenge" (buffer ke saath).',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// AVAILABILITY "NINES" — DOWNTIME PER YEAR\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Availability │ Downtime / year  │ Downtime / month\n//  ─────────────┼──────────────────┼─────────────────\n//  99%          │ ~3.65 days       │ ~7.3 hours\n//  99.9%        │ ~8.8 hours       │ ~43 minutes  ← "three nines"\n//  99.99%       │ ~52 minutes      │ ~4.3 minutes ← "four nines"\n//  99.999%      │ ~5 minutes       │ ~26 seconds  ← "five nines"\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// HIGH AVAILABILITY ARCHITECTURE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//         ┌────────┐   ┌────────┐\n//  Users ─►│  LB 1  │   │  LB 2  │  ← redundant load balancers\n//         └───┬────┘   └────┬───┘\n//             │ (active)    │ (passive failover)\n//      ┌──────┼──────┐      │\n//      ▼      ▼      ▼      │\n//   App A  App B  App C     │   ← multiple app servers\n//      │      │      │      │\n//      └──────┴──────┴──────┘\n//                  │\n//      ┌───────────┴──────────┐\n//      ▼                      ▼\n//  DB Primary            DB Replica   ← auto-failover\n//  (writes)              (reads + standby)\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// SLA / SLO / SLI\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  SLI  → measured:  "p99 latency = 180ms this week"\n//  SLO  → target:    "p99 < 200ms" (internal goal)\n//  SLA  → contract:  "p99 < 500ms" (promised to customers)\n//  Error budget = 100% - SLO  (how much failure you can afford)',
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
            'A cache is a fast, temporary data store that sits in front of a slow data source (database, API, computation). When the same data is requested repeatedly, the cache serves it in microseconds instead of milliseconds — cutting latency by 10-100x and slashing load on the database.\n\nCaching layers (from fastest to slowest):\n1. In-process memory (JavaScript Map, LRU cache) — nanoseconds, lost on restart\n2. Distributed cache (Redis, Memcached) — microseconds, shared across servers\n3. CDN edge cache — for static assets, closest to users geographically\n4. Database query cache — automatic, but often disabled in modern MySQL\n\nThe three write patterns:\n- Cache-aside (lazy loading): app checks cache → HIT: return it. MISS: fetch from DB → store in cache → return. Most popular; simple to implement.\n- Write-through: every write goes to cache AND DB simultaneously. Cache always consistent; slightly slower writes.\n- Write-back (write-behind): write to cache only → ack to client → flush to DB later in background. Fastest writes, risk of data loss if cache dies before flush.\n\nThe two hardest problems:\n1. Cache invalidation — when the DB data changes, how do you update the cache? Options: TTL expiry (simple, may serve stale), explicit delete on write (consistent), or event-based invalidation.\n2. Cache stampede — when a popular key expires, thousands of requests all miss simultaneously and hammer the DB. Fix: probabilistic early recomputation, mutex locking the key, or background refresh before expiry.',
          hinglish:
            'Cache ek fast, temporary data store hai jo slow data source (database, API, computation) ke aage baithta hai. Jab same data baar-baar manga jaata hai, cache use microseconds mein serve karta hai milliseconds ke bajaye — latency 10-100x kam aur database ka load drastically kham.\n\nCaching layers (fastest se slowest):\n1. In-process memory (JavaScript Map, LRU cache) — nanoseconds, restart pe khota hai\n2. Distributed cache (Redis, Memcached) — microseconds, servers ke beech shared\n3. CDN edge cache — static assets ke liye, geographically users ke sabse paas\n4. Database query cache — automatic, par modern MySQL mein aksar disabled\n\nTeen write patterns:\n- Cache-aside (lazy loading): app cache check karo → HIT: return karo. MISS: DB se fetch → cache mein store → return. Sabse popular; simple implement karna.\n- Write-through: har write cache AUR DB dono mein simultaneously. Cache hamesha consistent; thoda slow writes.\n- Write-back: sirf cache mein likho → client ko ack → baad mein background mein DB flush. Fastest writes, risk: cache flush se pehle die kare to data loss.\n\nDo sabse mushkil problems:\n1. Cache invalidation — jab DB data badle, cache kaise update karein? Options: TTL expiry (simple, stale serve ho sakta hai), write pe explicit delete (consistent), ya event-based invalidation.\n2. Cache stampede — jab popular key expire hoti hai, hazaron requests ek saath miss karti hain aur DB hammer hoti hai. Fix: probabilistic early recomputation, key pe mutex locking, ya expiry se pehle background refresh.',
        },
        dailyLifeExample:
          'Cache student ke exam notes jaisa hai — poori kitaab (DB) baar-baar padhne ke bajaye notes (cache) se turant. Par notes purane ho jaayein (stale) to galat answers — isliye update (invalidation) zaroori. Stampede = ek hi waqt 100 students cache miss karke directly library (DB) daud pade.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// PATTERN 1: CACHE-ASIDE (most common)\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Request\n//     │\n//     ▼\n//  ┌──────────┐  HIT  ┌───────────────┐\n//  │   App    │──────►│  Cache (Redis) │──► return data (fast!)\n//  └────┬─────┘       └───────────────┘\n//       │ MISS\n//       ▼\n//  ┌──────────┐\n//  │ Database │──► data ──► cache.set(key, data, TTL) ──► return\n//  └──────────┘\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// PATTERN 2: WRITE-THROUGH\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Write ──► Cache ──► DB (both updated, always consistent)\n//\n// PATTERN 3: WRITE-BACK (write-behind)\n//\n//  Write ──► Cache ──► ack (fast)\n//                │\n//             (async) ──► DB (later — risk of data loss)\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// CACHE STAMPEDE PROBLEM & FIX\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  TTL expires for popular key\n//  1000 req/s all MISS → 1000 DB queries at once  ← stampede!\n//\n//  Fix A: Mutex lock the key during recompute\n//  Fix B: Background refresh BEFORE expiry\n//  Fix C: Probabilistic early expiry (XFetch algorithm)',
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
            'A CDN is a globally distributed network of "edge" servers — data centres placed in many cities and regions worldwide. When a user requests a static asset (image, CSS, JS bundle, video), instead of reaching your single origin server across the planet, the request is routed to the nearest edge server that has the asset cached. The result: latency drops from 200ms to 5ms, your origin handles far less bandwidth, and you can absorb massive traffic spikes without scaling your origin.\n\nHow it works:\n1. First request for an asset → CDN edge misses → fetches from origin → caches it locally.\n2. All subsequent requests from nearby users → served from edge cache (cache HIT).\n3. Cache-Control / TTL headers from your origin tell the CDN how long to cache.\n4. On content update: either change the URL (cache-busting, e.g. file.v2.js) or send a purge/invalidation API call to the CDN.\n\nWhat to put on a CDN:\n✓ Images, videos, fonts\n✓ JS/CSS bundles (with content-hashed filenames)\n✓ HTML for fully static sites\n✗ Personalised responses (user-specific HTML)\n✗ API calls with dynamic data\n\nBonus benefits: CDNs absorb DDoS at the edge (Cloudflare processes 2 trillion requests/day), offer WAF (Web Application Firewall) rules, and some run edge compute (Cloudflare Workers, Vercel Edge Functions) for dynamic logic without cold starts.',
          hinglish:
            'CDN duniya bhar mein "edge" servers ka distributed network hai — kai sheher aur regions mein data centres. Jab user static asset (image, CSS, JS bundle, video) maange, poori duniya mein tumhare ek origin server tak jane ke bajaye, request nearest edge server ko jaati hai jiske paas asset cached ho. Result: latency 200ms se 5ms, tumhare origin pe bahut kam bandwidth, aur massive traffic spikes origin scale kiye bina absorb.\n\nKaise kaam karta hai:\n1. Asset ke liye pehli request → CDN edge miss → origin se fetch → locally cache.\n2. Paas ke users ke saare baad ke requests → edge cache se serve (cache HIT).\n3. Origin ke Cache-Control / TTL headers CDN ko batate hain kitni der cache karna.\n4. Content update pe: ya URL badlo (cache-busting, jaise file.v2.js) ya CDN ko purge/invalidation API call bhejo.\n\nCDN pe kya daalo:\n✓ Images, videos, fonts\n✓ JS/CSS bundles (content-hashed filenames ke saath)\n✓ Fully static sites ke liye HTML\n✗ Personalised responses (user-specific HTML)\n✗ Dynamic data wale API calls\n\nBonus: CDNs DDoS edge pe absorb karte hain (Cloudflare 2 trillion requests/day process karta hai), WAF (Web Application Firewall) rules dete hain, aur kuch edge compute chalate hain (Cloudflare Workers, Vercel Edge Functions).',
        },
        dailyLifeExample:
          'CDN ek national brand ke local stores jaise hain — har sheher mein branch (edge), taaki tumhe headquarter (origin) tak na jaana pade. Mumbai ka user Mumbai edge se paaega, Delhi ka Delhi se. Purana stock (stale cache) hata ke naya mangao → CDN purge.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// WITHOUT CDN — every user hits the origin\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  [India user] ──200ms──► [Origin: US server]  ← slow!\n//  [US user]    ──20ms───► [Origin: US server]\n//  [Brazil user]──300ms──► [Origin: US server]  ← very slow!\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// WITH CDN — users hit nearest edge\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//                    ┌──────────────────────────────┐\n//                    │       CDN Network             │\n//                    │  ┌──────────┐  ┌──────────┐  │\n// [India user]──5ms──►  │ Mumbai   │  │Singapore │  │\n//                    │  │ Edge     │  │ Edge     │  │\n// [US user]────5ms──►   │          │  │          │  │\n//                    │  └──────────┘  └──────────┘  │\n//                    └──────────┬───────────────────┘\n//                               │ MISS only\n//                               ▼\n//                        [Origin Server]\n//\n// Cache-Control: public, max-age=31536000, immutable\n//   ↑ CDN caches this asset for 1 year\n//   ↑ Change filename (hash) on update for cache busting',
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
            'A single database node eventually hits its limits — too many reads, too many writes, or too much data. Two complementary techniques let you scale beyond a single machine.\n\nReplication: copy the full dataset to multiple servers. One node is the Primary (master) — it handles all writes. One or more nodes are Replicas (slaves) — they stream changes from the primary and handle read queries. Benefits: read traffic scales linearly, and a replica can be promoted to primary if it fails (automatic failover). Trade-off: replication lag — a replica may be milliseconds to seconds behind, so reads can return slightly stale data.\n\nSharding (horizontal partitioning): split the dataset itself across multiple machines using a shard key. Each machine owns a slice of the data (a shard). Choosing the shard key correctly is critical — a bad key creates hotspots (one shard gets all the traffic). Common strategies: range-based (user_id 0–999k → shard 0), hash-based (hash(user_id) % N), or directory-based (a lookup table maps key → shard). Sharding scales both write throughput and storage. Trade-offs: cross-shard JOINs are expensive or impossible; re-sharding when you need more shards is painful; application code becomes more complex.\n\nIn practice: start with one node → add read replicas → add sharding only when replicas are not enough. Most apps never need sharding (proper indexing + caching first).',
          hinglish:
            'Ek single database node eventually apni limits hit karta hai — bahut reads, bahut writes, ya bahut data. Do complementary techniques ek single machine se aage scale karne dete hain.\n\nReplication: full dataset ko multiple servers pe copy karo. Ek node Primary (master) hai — saare writes handle kare. Ek ya zyada nodes Replicas (slaves) hain — primary se changes stream karke read queries handle karein. Benefits: read traffic linearly scale hota hai, aur failover pe replica primary ban sakta hai. Trade-off: replication lag — replica milliseconds se seconds peeche ho sakta hai, to reads thoda stale data de sakte hain.\n\nSharding (horizontal partitioning): dataset ko ek shard key se multiple machines mein split karo. Har machine data ka ek slice (shard) own kare. Shard key sahi chunna critical hai — galat key hotspots create karta hai (ek shard sab traffic pata hai). Common strategies: range-based (user_id 0–999k → shard 0), hash-based (hash(user_id) % N), ya directory-based (lookup table key → shard map kare). Sharding write throughput aur storage dono scale karta hai. Trade-offs: cross-shard JOINs mehange ya impossible; zyada shards ki zaroorat hone par re-sharding painful; application code complex hoti hai.\n\nPractice mein: ek node se shuru karo → read replicas add karo → sharding tab hi karo jab replicas kaafi na hon. Zyadatar apps ko kabhi sharding nahi chahiye (pehle proper indexing + caching).',
        },
        dailyLifeExample:
          'Replication ek library ki kai photocopies — sab padh sakein (multiple replicas) aur ek kho jaaye to doosri hai. Sharding ek bade dictionary ko A-M aur N-Z mein baantna — har half alag shelf (server). Lekin "A aur N dono ek hi word mein hain" (cross-shard JOIN) to dono shelves se chahiye — mushkil!',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// REPLICATION: scale reads + redundancy\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  App Writes ──────────────────►  PRIMARY DB\n//                                      │\n//                      ┌───────────────┤ (async replication)\n//                      │               │\n//                      ▼               ▼\n//                  REPLICA 1       REPLICA 2\n//                  (reads)         (reads + failover standby)\n//\n//  App reads ──round-robin──►  Replica 1 or 2\n//  Replication lag: replica may be 50–500ms behind primary\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// SHARDING: scale writes + storage\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Shard key: user_id\n//\n//  user_id 0  –  999,999  →  Shard 0 (DB server 0)\n//  user_id 1M –  1,999,999 →  Shard 1 (DB server 1)\n//  user_id 2M –  2,999,999 →  Shard 2 (DB server 2)\n//\n//  App layer decides shard:  db = shards[userId / 1_000_000]\n//\n//  ✓ scales writes and storage\n//  ✗ cross-shard JOIN: query two DB servers and merge in app\n//  ✗ hotspot: if shard key is not evenly distributed',
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
    description: 'Database selection, consistent hashing, API gateway, rate limiting aur real-time communication — intermediate systems ke building blocks.',
    concepts: [
      {
        title: 'SQL vs NoSQL & Database Types',
        difficulty: 'medium',
        tags: ['database', 'sql', 'nosql'],
        explanation: {
          english:
            'Database selection is one of the most consequential architectural decisions. The wrong choice means painful migrations later. The key question is always: what is the data shape, and what are the read/write access patterns?\n\nRelational (SQL) — PostgreSQL, MySQL: data in tables with strict schema. ACID transactions guarantee correctness (Atomicity, Consistency, Isolation, Durability). JOINs across tables. Best for: financial transactions, orders, anything needing strong consistency or complex relational queries. Scales reads well with replicas; sharding is painful.\n\nDocument — MongoDB, Firestore: data as JSON-like documents, schema-flexible. Excellent for hierarchical data (a blog post with embedded comments). No JOINs (embed related data instead). Best for: content management, user profiles, catalogues where structure varies.\n\nKey-Value — Redis, DynamoDB: blazing fast O(1) lookups by key. In-memory (Redis). Best for: caching, sessions, rate-limit counters, leaderboards, pub/sub. Redis also supports sorted sets, lists, and streams.\n\nWide-Column — Cassandra, HBase: rows + many columns, designed for massive write throughput with time-ordered data. No JOINs. Best for: IoT sensor data, time-series, activity logs, where you write billions of rows and query by time range.\n\nGraph — Neo4j, Amazon Neptune: stores nodes (entities) and edges (relationships) natively. Makes traversing relationships fast (friend of a friend, shortest path). Best for: social graphs, recommendations, fraud detection.\n\nSearch — Elasticsearch, OpenSearch: inverted index for full-text search. Fuzzy matching, relevance scoring, faceted filters. Best for: product search, log analytics (ELK stack).\n\nPolyglot persistence: most large systems use 3+ databases simultaneously — SQL for transactions, Redis for cache, Elasticsearch for search.',
          hinglish:
            'Database selection sabse consequential architectural decisions mein se ek hai. Galat choice baad mein painful migration. Key question hamesha: data ka shape kya hai, aur read/write access patterns kya hain?\n\nRelational (SQL) — PostgreSQL, MySQL: strict schema ke saath tables. ACID transactions correctness guarantee karte hain. JOINs. Best for: financial transactions, orders, strong consistency ya complex relational queries. Read replicas se scale; sharding painful.\n\nDocument — MongoDB, Firestore: JSON-like documents, schema-flexible. Hierarchical data ke liye excellent (embedded comments wala blog post). JOINs nahi (related data embed karo). Best for: content management, user profiles, catalogues.\n\nKey-Value — Redis, DynamoDB: blazing fast O(1) key lookups. In-memory (Redis). Best for: caching, sessions, rate-limit counters, leaderboards. Redis sorted sets, lists, streams bhi support karta hai.\n\nWide-Column — Cassandra, HBase: massive write throughput time-ordered data ke liye. JOINs nahi. Best for: IoT sensor data, time-series, activity logs — billions of rows likho, time range se query karo.\n\nGraph — Neo4j, Amazon Neptune: nodes (entities) aur edges (relationships) natively store. Relationships traverse karna fast. Best for: social graphs, recommendations, fraud detection.\n\nSearch — Elasticsearch, OpenSearch: full-text search ke liye inverted index. Fuzzy matching, relevance scoring. Best for: product search, log analytics.\n\nPolyglot persistence: zyadatar bade systems 3+ databases simultaneously use karte hain — SQL for transactions, Redis for cache, Elasticsearch for search.',
        },
        dailyLifeExample:
          'Sahi DB chunna sahi auzaar chunna jaisa hai — hammer (SQL) keel ke liye, screwdriver (key-value) screw ke liye. Aur bade kaam mein toolbox mein saare auzaar hote hain (polyglot persistence).',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// DATABASE DECISION TREE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Is data structured + ACID transactions needed?\n//  ├── YES → SQL (PostgreSQL / MySQL)\n//  │         (orders, payments, banking, user accounts)\n//  │\n//  └── NO → What is the access pattern?\n//           │\n//           ├── Simple key lookup (< 1ms)?\n//           │   └── Key-Value: Redis / DynamoDB\n//           │       (cache, sessions, counters, leaderboards)\n//           │\n//           ├── Flexible JSON documents?\n//           │   └── Document: MongoDB / Firestore\n//           │       (profiles, catalogues, CMS)\n//           │\n//           ├── Massive time-ordered writes?\n//           │   └── Wide-Column: Cassandra / HBase\n//           │       (IoT, logs, time-series, analytics)\n//           │\n//           ├── Relationships / graph traversal?\n//           │   └── Graph: Neo4j / Neptune\n//           │       (social graph, recommendations)\n//           │\n//           └── Full-text search?\n//               └── Search: Elasticsearch / OpenSearch\n//                   (product search, log analytics)\n//\n// POLYGLOT PERSISTENCE (real systems use many):\n//   Users   → PostgreSQL (ACID transactions)\n//   Feed    → Redis (fast list reads)\n//   Search  → Elasticsearch (full-text)\n//   Media   → S3 (blob storage)',
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
            'Consistent hashing solves a critical problem in distributed caches and databases: what happens to existing data/cache entries when a server is added or removed?\n\nThe naive approach — hash(key) % N — breaks entirely when N changes. Adding one server changes N from 3 to 4, which changes the hash mapping for ~75% of all keys. Every cache entry that was on server 0 might now belong to server 1. For a distributed cache, this means near-100% cache miss, hammering the database — a catastrophic stampede.\n\nHow consistent hashing fixes it:\n1. Place all possible hash values on a circular "ring" (0 to 2^32 - 1).\n2. Each server is placed at one (or more) positions on the ring by hashing its name or IP.\n3. To find a key\'s server: hash(key) → position on ring → walk clockwise → first server you encounter owns this key.\n4. When you add a server: it takes ownership of only the keys between itself and its predecessor — ~1/N of all keys move. Everything else stays put.\n5. When you remove a server: its keys move to the next server clockwise — again ~1/N keys affected.\n\nVirtual nodes (vnodes): physically one server is placed at many positions on the ring (e.g. 150 virtual nodes per server). This ensures load is distributed much more evenly — without virtual nodes, random placement can accidentally put all servers close together on the ring, leaving one enormous segment with no server. Cassandra, DynamoDB, and distributed Memcached all use consistent hashing with virtual nodes.',
          hinglish:
            'Consistent hashing distributed caches aur databases mein ek critical problem solve karta hai: jab server add ya remove hota hai to existing data/cache entries ka kya hota hai?\n\nNaive approach — hash(key) % N — N change hone par poori tarah toot jaati hai. Ek server add karne se N 3 se 4 hota hai, jo ~75% saare keys ki hash mapping badal deta hai. Server 0 pe jo cache entry thi, ab server 1 pe belong kar sakti hai. Distributed cache ke liye matlab near-100% cache miss, database hammer — catastrophic stampede.\n\nConsistent hashing kaise fix karta hai:\n1. Saare possible hash values ko circular "ring" (0 to 2^32 - 1) pe rakho.\n2. Har server ko ring pe ek (ya zyada) positions pe rakho — apna naam ya IP hash karke.\n3. Key ka server dhundhne ke liye: hash(key) → ring pe position → clockwise chalo → pehla server jo mile wo key own karta hai.\n4. Server add karne par: sirf apne aur apne predecessor ke beech ke keys ka ownership leta hai — ~1/N keys move, baaki sab same.\n5. Server remove karne par: uske keys clockwise next server pe move — phir ~1/N keys affect.\n\nVirtual nodes (vnodes): ek physical server ring pe kai positions pe rakha jaata hai (jaise 150 virtual nodes per server). Isse load bahut zyada evenly distribute hota hai — bina virtual nodes ke, random placement accidentally saare servers ring pe paas-paas rakh sakta hai, ek bada gap chhod ke. Cassandra, DynamoDB, aur distributed Memcached sab consistent hashing with virtual nodes use karte hain.',
        },
        dailyLifeExample:
          'Naive hash % N ghadi ke numbers jaisa — ek number hatao to sab shift hote hain. Consistent hashing gol dining table jaisa — ek naya mehmaan aaya, sirf adjacent seats adjust, poori table nahi. Virtual nodes = ek hi person ke kai seats taaki koi ek jagah crowded na ho.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// PROBLEM: Naive hashing  hash(key) % N\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  N=3:  key "user:42"  → hash=918 → 918 % 3 = 0 → Server A\n//  N=4:  key "user:42"  → hash=918 → 918 % 4 = 2 → Server C  ← moved!\n//  Adding 1 server → ~75% of ALL keys remap → cache stampede!\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// SOLUTION: Consistent Hashing Ring  (0 → 2³²)\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//              0\n//          ┌───┴───┐\n//    270°  │       │  90°\n//          │  Ring │\n//     180° └───────┘\n//\n//  Servers placed by hash(serverName):\n//    Server A →  90° position\n//    Server B → 180° position\n//    Server C → 300° position\n//\n//  key "user:42" → hash → 130° → walk clockwise → Server B owns it\n//\n//  Add Server D at 200°:\n//    Only keys between 180° and 200° move from B to D (~1/N keys)\n//    Everything else: unchanged!\n//\n// VIRTUAL NODES (150 positions per physical server):\n//    Server A: 15°, 43°, 97°, 162°, 234° ...  (150 positions)\n//    Server B: 28°, 71°, 130°, 201°, 278° ...\n//    → load distributed evenly; handles uneven ring gaps',
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
            'Two closely related concepts that appear in almost every production architecture.\n\nReverse proxy: a server that sits between the internet and your backend, accepting requests and forwarding them internally. Clients never communicate directly with your backend servers. Benefits: TLS termination (your backend speaks plain HTTP internally), load balancing, response caching, gzip compression, request logging, and hiding the internal network topology.\n\nAPI Gateway: a specialised, feature-rich reverse proxy designed specifically for routing API traffic — especially in microservices architectures. It is the single "front door" for all external API clients. Responsibilities:\n- Authentication & Authorization: validate JWTs or API keys at the gateway, so individual services do not each re-implement auth.\n- Rate limiting: cap requests per client at the edge (before they reach your services).\n- Request routing: /users/* → User Service; /orders/* → Order Service; /search/* → Search Service.\n- Request/response transformation: add/remove headers, transform payloads, protocol conversion (REST to gRPC).\n- Circuit breaking: stop routing to a failing service.\n- Observability: centralised access logging, distributed tracing, metrics.\n\nForward proxy (opposite concept): sits in front of clients, acting as their representative to the internet. Used for content filtering, anonymity (VPN-like), or caching outgoing requests. Clients are aware of a forward proxy; they are not aware of a reverse proxy.\n\nPopular tools: nginx (reverse proxy), Kong, AWS API Gateway, Cloudflare, Traefik.',
          hinglish:
            'Do closely related concepts jo lagbhag har production architecture mein dikhte hain.\n\nReverse proxy: internet aur backend ke beech baithne wala server, requests accept karke internally forward karta hai. Clients seedhe backend servers se communicate nahi karte. Benefits: TLS termination (backend internally plain HTTP), load balancing, response caching, gzip compression, request logging, aur internal network topology chhupana.\n\nAPI Gateway: APIs ke liye — khaaskar microservices mein — specialised, feature-rich reverse proxy. Saare external API clients ke liye single "front door". Responsibilities:\n- Authentication & Authorization: gateway pe JWTs ya API keys validate karo, taaki har service baarbaar auth implement na kare.\n- Rate limiting: clients ki requests edge pe cap karo (services tak pahunche se pehle).\n- Request routing: /users/* → User Service; /orders/* → Order Service; /search/* → Search Service.\n- Request/response transformation: headers add/remove, payloads transform, protocol conversion (REST to gRPC).\n- Circuit breaking: failing service pe routing band karo.\n- Observability: centralised access logging, distributed tracing, metrics.\n\nForward proxy (ulta concept): clients ke aage baithta hai, internet tak unka representative. Content filtering, anonymity (VPN-like), ya outgoing requests caching ke liye. Clients forward proxy ke aware hote hain; reverse proxy ke nahi.\n\nPopular tools: nginx (reverse proxy), Kong, AWS API Gateway, Cloudflare, Traefik.',
        },
        dailyLifeExample:
          'API Gateway ek badi building ki main reception jaisi hai — har bahari visitor (request) pehle yahan check-in kare, ID verify ho (auth), entry limit dekhi jaaye (rate limit), phir sahi floor (microservice) bheja jaaye. Backend offices seedha expose nahi hote. Security, logging, sab ek jagah.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// API GATEWAY ARCHITECTURE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Mobile / Web / 3rd-party clients\n//            │\n//            ▼\n//  ┌─────────────────────────────────────────┐\n//  │            API GATEWAY                  │\n//  │  ┌─────────────────────────────────┐   │\n//  │  │  1. TLS termination             │   │\n//  │  │  2. Auth  (JWT / API key check) │   │\n//  │  │  3. Rate limiting  (429 if over)│   │\n//  │  │  4. Route by URL path           │   │\n//  │  │  5. Transform request/response  │   │\n//  │  │  6. Circuit breaker             │   │\n//  │  │  7. Log + trace every request   │   │\n//  │  └─────────────────────────────────┘   │\n//  └──────────────┬──────────────────────────┘\n//                 │ routes to\n//       ┌─────────┼──────────────────┐\n//       ▼         ▼                  ▼\n// ┌──────────┐ ┌──────────┐  ┌──────────────┐\n// │  User    │ │  Order   │  │   Payment    │\n// │  Service │ │  Service │  │   Service    │\n// └──────────┘ └──────────┘  └──────────────┘\n//\n// URL routing rules:\n//   /api/v1/users/*    → User Service    :3001\n//   /api/v1/orders/*   → Order Service   :3002\n//   /api/v1/payments/* → Payment Service :3003',
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
            'Rate limiting restricts how many requests a client (identified by IP, user ID, or API key) can make within a time window. It serves multiple purposes: preventing abuse (one bad actor flooding your API), protection from DDoS, ensuring fair usage (one user cannot starve others), and cost control (don\'t pay for infinite downstream API calls).\n\nWhere to enforce: at the API gateway or load balancer — before requests reach your application. Use a fast shared store like Redis to track counters so all app servers agree on the state.\n\nFour main algorithms:\n\n1. Fixed Window: count requests in a fixed 60-second bucket. Simple but a burst can happen at the boundary — 100 requests at 11:59:59 and 100 at 12:00:00 = 200 requests in 2 seconds.\n\n2. Sliding Window Log: keep a timestamp log of each request; count requests in the past 60s. Accurate, but memory-intensive for high traffic.\n\n3. Sliding Window Counter: approximate sliding window using two fixed windows and linear interpolation — lower memory than log, nearly as accurate.\n\n4. Token Bucket (most widely used): a bucket holds up to CAPACITY tokens, refilled at a fixed rate (e.g. 10 tokens/second). Each request consumes 1 token. If the bucket is empty → 429 Too Many Requests. Allows controlled bursts (up to bucket capacity) while enforcing an average rate. AWS API Gateway, Stripe, GitHub all use token bucket.\n\n5. Leaky Bucket: requests enter a queue; a worker drains the queue at a fixed rate. Smooths output (great for APIs that charge per call). Does not allow bursts.\n\nResponse: return HTTP 429 with a Retry-After header telling the client when to try again.',
          hinglish:
            'Rate limiting restrict karta hai ek client (IP, user ID, ya API key se identify) kitni requests ek time window mein kar sakta hai. Multiple purposes: abuse rokna (ek bura actor API flood kare), DDoS protection, fair usage ensure karna, aur cost control.\n\nKahan enforce karein: API gateway ya load balancer pe — requests application tak pahunche se pehle. Fast shared store jaise Redis use karo counters track karne ke liye taaki saare app servers state pe agree karein.\n\nChar main algorithms:\n\n1. Fixed Window: ek fixed 60-second bucket mein requests count karo. Simple par boundary pe burst ho sakta hai — 11:59:59 pe 100 aur 12:00:00 pe 100 = 2 seconds mein 200 requests.\n\n2. Sliding Window Log: har request ka timestamp log rakho; past 60s mein requests count karo. Accurate, par high traffic pe memory-intensive.\n\n3. Sliding Window Counter: do fixed windows aur linear interpolation se approximate sliding window — log se kam memory, lagbhag utna hi accurate.\n\n4. Token Bucket (sabse widely used): bucket mein CAPACITY tak tokens hote hain, fixed rate pe refill (jaise 10 tokens/second). Har request 1 token consume. Bucket empty → 429. Controlled bursts allow (bucket capacity tak) while average rate enforce. AWS API Gateway, Stripe, GitHub sab token bucket use karte hain.\n\n5. Leaky Bucket: requests ek queue mein aate hain; worker fixed rate pe queue drain karta hai. Output smooth (APIs ke liye badhiya jo per call charge karein). Bursts allow nahi karta.\n\nResponse: HTTP 429 return karo Retry-After header ke saath jo client ko bataye kab retry kare.',
        },
        dailyLifeExample:
          'Token bucket ek water bottle jaisa hai — ek speed pe bhar ta hai, har ghont (request) ek token. Thoda thoda jaldi jaldi pi sakte ho (burst) jab tak bhar a hai, phir khaali hone pe wait karo. Leaky bucket ek drip stand jaisa hai — steady drip, chahe tum jaldi thoo bhi do.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// TOKEN BUCKET ALGORITHM (most popular)\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Bucket capacity = 100 tokens\n//  Refill rate     = 10 tokens / second\n//\n//  t=0s  [████████████] 100 tokens (full)\n//\n//  Burst of 60 requests arrives:\n//  t=0s  [████        ]  40 tokens left  → 60 allowed ✓\n//\n//  40 more requests:\n//  t=0s  [            ]   0 tokens left  → 40 allowed ✓\n//\n//  Next request:\n//  t=0s  bucket empty  → 429 Too Many Requests ✗\n//\n//  t=1s  [█           ]  10 tokens refilled → 10 allowed ✓\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// IMPLEMENTATION (Redis atomic check)\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  key = "rate_limit:" + userId\n//  count = redis.incr(key)       // atomic increment\n//  if count == 1:\n//    redis.expire(key, 60)       // set TTL on first request\n//  if count > LIMIT:\n//    return 429 Too Many Requests\n//    // Header: Retry-After: 30 (seconds until window resets)\n//\n// ALGORITHM COMPARISON:\n//  Fixed Window:    simple, boundary burst\n//  Sliding Window:  accurate, more memory\n//  Token Bucket:    bursts OK, avg rate enforced (most popular)\n//  Leaky Bucket:    steady output, no bursts',
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
            'Standard HTTP is request/response — the client always initiates, the server always replies. For real-time features (live chat, notifications, collaborative editing, live scores), you need the server to push updates to the client proactively. Four approaches:\n\n1. Short Polling: client polls the server every N seconds ("anything new?"). Simple to implement, works everywhere. But: most polls return empty responses — wasted bandwidth, unnecessary latency, wasted server resources. Acceptable for low-frequency updates (every 30s), bad for anything more frequent.\n\n2. Long Polling: client sends a request, server holds it open until new data is ready or a timeout expires, then responds and the client immediately polls again. Fewer wasted requests, but still HTTP overhead on every cycle. Works well for moderately frequent updates.\n\n3. Server-Sent Events (SSE): one persistent HTTP connection, server pushes data chunks in real-time as text/event-stream. One-directional (server → client only). Automatic reconnection, native browser support, works over HTTP/2. Best for: live feeds, notification streams, progress updates. Simple to implement.\n\n4. WebSocket: full-duplex persistent connection, both sides can send at any time with minimal overhead (framing, no HTTP headers per message). Established with an HTTP upgrade handshake, then switches to the WebSocket protocol. Best for: chat, collaborative editing, multiplayer games, financial tickers — any scenario where both sides push frequently. Requires special infrastructure (load balancer must support sticky sessions or a shared pub/sub for message routing across servers).',
          hinglish:
            'Standard HTTP request/response hai — client hamesha initiate karta hai, server reply karta hai. Real-time features (live chat, notifications, collaborative editing, live scores) ke liye server ko proactively updates push karne hote hain. Char approaches:\n\n1. Short Polling: client har N seconds mein server se poochhe ("kuch naya?"). Simple, everywhere kaam karta hai. Par: zyadatar polls empty — wasted bandwidth, unnecessary latency, server resources waste. Low-frequency updates ke liye theek (har 30s), zyada frequent ke liye bura.\n\n2. Long Polling: client request bheje, server tab tak open rakhe jab tak naya data available na ho ya timeout na aaye, phir respond kare aur client turant phir poll kare. Kam wasted requests, par har cycle pe HTTP overhead. Moderately frequent updates ke liye theek.\n\n3. Server-Sent Events (SSE): ek persistent HTTP connection, server real-time data chunks push karta hai text/event-stream mein. One-directional (server → client only). Automatic reconnection, native browser support, HTTP/2 pe kaam. Best for: live feeds, notification streams, progress updates. Implement karna simple.\n\n4. WebSocket: full-duplex persistent connection, dono sides kabhi bhi bhej sakein minimal overhead ke saath (framing, har message pe HTTP headers nahi). HTTP upgrade handshake se establish, phir WebSocket protocol pe switch. Best for: chat, collaborative editing, multiplayer games, financial tickers — koi bhi scenario jahan dono sides frequently push karein. Special infrastructure chahiye (load balancer sticky sessions ya shared pub/sub for message routing across servers).',
        },
        dailyLifeExample:
          'Short polling baar-baar darvaza khol ke "dak aayi kya?" poochna. Long polling postman ko bol do "tab tak ruko jab tak koi daak na aaye". SSE ek live radio station (sirf sunna, bolna nahi). WebSocket ek khula phone call — dono baat kar sakte hain kisi bhi waqt.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// COMPARISON OF REAL-TIME TECHNIQUES\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n// SHORT POLLING\n//   Client ──GET /updates──► Server ──(empty)──► Client\n//   Client ──GET /updates──► Server ──(empty)──► Client\n//   Client ──GET /updates──► Server ──(data!)──► Client\n//   (every 3s, most empty — wasteful)\n//\n// LONG POLLING\n//   Client ──GET /updates──────────────────────────►\n//                          Server waits (holds open)\n//                          Data arrives:\n//   Client ◄──────────────────────────── (data!)── Server\n//   Client ──GET /updates──► (immediately re-polls)\n//\n// SERVER-SENT EVENTS (SSE)  — one-way server→client\n//   Client ──GET /stream──► Server\n//   Server ◄────────── persistent HTTP connection ────\n//   Server ──event: score=2──► Client\n//   Server ──event: score=3──► Client  (auto-reconnects)\n//\n// WEBSOCKET  — full-duplex, both sides push\n//   Client ──HTTP Upgrade──► Server (handshake)\n//   Client ◄══════════ WS Connection ══════════► Server\n//   Client ──msg──► Server  (any time)\n//   Server ──msg──► Client  (any time)\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// DECISION GUIDE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Need both sides to push?   → WebSocket (chat, gaming)\n//  Server pushes only?        → SSE       (feed, notifications)\n//  Simple, occasional update? → Long polling\n//  Legacy / firewall issues?  → Short polling (last resort)',
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
    description: 'CAP theorem, message queues aur microservices — har bade distributed system mein ye concepts dikhte hain. Interview mein hamesha poochhte hain.',
    concepts: [
      {
        title: 'CAP Theorem',
        difficulty: 'hard',
        tags: ['cap', 'distributed'],
        explanation: {
          english:
            'The CAP theorem (Brewer\'s theorem) says a distributed system can guarantee at most two of three properties simultaneously. Understanding it frames every distributed data design decision.\n\nConsistency (C): every read returns the most recent write, or an error. All nodes see the same data at the same time. Like having one copy of the truth.\n\nAvailability (A): every request receives a response (not necessarily the latest data). The system never refuses a read or write. It may return stale data but it will respond.\n\nPartition Tolerance (P): the system continues operating even when some network messages between nodes are lost or delayed (a network partition — i.e. two groups of nodes cannot communicate). In any real distributed system, partitions will happen (cables break, servers restart). Therefore P is not optional — you always need it. So the real choice is:\n\n→ CP systems: during a partition, choose to stop serving (return errors or wait) rather than risk returning inconsistent data. Used for: banking (wrong balance = huge problem), distributed locks, coordination services (ZooKeeper, etcd), inventory management.\n\n→ AP systems: during a partition, continue serving but may return stale/inconsistent data. Used for: social media likes, view counts, shopping carts, DNS, any "eventually consistent" data.\n\nImportant nuance: most modern databases let you tune this per operation. Cassandra defaults to AP but you can request quorum reads (CP-ish). DynamoDB has both consistent and eventually-consistent reads.',
          hinglish:
            'CAP theorem (Brewer\'s theorem) kehta hai ek distributed system zyada se zyada teen properties mein se do ek saath guarantee kar sakta hai. Isse samajhna har distributed data design decision frame karta hai.\n\nConsistency (C): har read most recent write return kare, ya error. Saare nodes ek hi waqt same data dekhein. Ek truth ki ek copy jaisa.\n\nAvailability (A): har request ko response mile (necessarily latest data nahi). System kabhi read ya write refuse na kare. Stale data de sakta hai par respond karega.\n\nPartition Tolerance (P): kuch network messages nodes ke beech lost ya delayed hone par bhi (network partition — do groups nodes communicate nahi kar saktein) system operate karta rahe. Kisi bhi real distributed system mein partitions honge (cables toote, servers restart). Isliye P optional nahi — hamesha chahiye. To asli choice ye hai:\n\n→ CP systems: partition ke dauraan, inconsistent data return karne ka risk lene ke bajaye serve karna band karo (errors return karo ya wait karo). Use for: banking, distributed locks, coordination services (ZooKeeper, etcd), inventory management.\n\n→ AP systems: partition ke dauraan, serve karte raho par stale/inconsistent data de sakte hain. Use for: social media likes, view counts, shopping carts, DNS, koi bhi "eventually consistent" data.\n\nImportant nuance: zyadatar modern databases per operation tune karne dete hain. Cassandra default AP hai par quorum reads request kar sakte ho (CP-ish). DynamoDB mein consistent aur eventually-consistent dono reads hain.',
        },
        dailyLifeExample:
          'CAP do cities mein branches wala bank jaisa hai jab communication cut ho jaye (partition). CP branch: "humara server se connection nahi, transaction approved nahi kar sakte" (availability sacrifice). AP branch: "account dekhte hain hamare paas" — same balance dikhate hain, update baad mein (consistency sacrifice). Dono ek saath nahi.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// CAP THEOREM TRIANGLE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//                 Consistency (C)\n//                      ▲\n//                     /|\\\n//                    / | \\\n//              CA  /  |  \\ CP\n//                /    |    \\\n//               /   __|__   \\\n//              /  /       \\  \\\n//  ───────────▼──▼─────────▼──▼───────────\n//   Availability (A)     Partition Tolerance (P)\n//\n//  Real distributed systems MUST have P (partitions happen)\n//  So the real choice is:\n//\n//  CP (Consistency + Partition):        AP (Availability + Partition):\n//  ┌─────────────────────────────┐     ┌────────────────────────────┐\n//  │ Refuse requests during      │     │ Serve requests during       │\n//  │ partition to stay consistent│     │ partition (may be stale)    │\n//  │                             │     │                             │\n//  │ Examples:                   │     │ Examples:                   │\n//  │  • Banking / payments       │     │  • Social likes/views       │\n//  │  • ZooKeeper / etcd         │     │  • DNS lookups              │\n//  │  • Distributed locks        │     │  • Shopping carts           │\n//  │  • MySQL (default)          │     │  • Cassandra (default)      │\n//  │  • HBase                    │     │  • DynamoDB (eventual read) │\n//  └─────────────────────────────┘     └────────────────────────────┘',
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
            'A message queue enables asynchronous communication between services — a producer drops a message (job) into the queue and moves on immediately, while consumers pick up and process messages at their own pace, independently. This is one of the most powerful patterns in distributed systems.\n\nKey benefits:\n1. Decoupling: producer and consumer do not need to be running at the same time. If the email service is down, messages wait in the queue; they are not lost.\n2. Spike buffering: a sudden burst of 10,000 user sign-ups does not overwhelm the email service — they queue up and are processed at a sustainable rate.\n3. Background work: heavy operations (video encoding, PDF generation, ML inference, sending emails) are moved out of the synchronous request/response path, so the user gets an instant response.\n4. Fan-out: one message can be consumed by multiple consumers (pub/sub) — e.g. a new order triggers inventory, billing, and notification services simultaneously.\n\nKey challenges:\n- At-least-once delivery: most queues guarantee messages are delivered at least once, but possibly more. Your consumers must be idempotent.\n- Ordering: most queues do not guarantee strict order. Kafka guarantees order within a partition; RabbitMQ and SQS generally do not.\n- Dead-letter queue (DLQ): messages that fail after N retries are moved here for inspection — prevents a bad message from blocking the queue forever.\n- Consumer scaling: add more consumer instances to process faster (competing consumers pattern).\n\nPopular tools: RabbitMQ (classic job queue, AMQP), Apache Kafka (high-throughput event streaming, log retention), AWS SQS (managed, simple), Redis Streams.',
          hinglish:
            'Message queue services ke beech asynchronous communication enable karta hai — producer queue mein ek message (job) daal ke immediately aage badh jaata hai, jabki consumers apne pace pe independently messages pick up aur process karte hain. Ye distributed systems ka sabse powerful patterns mein se ek hai.\n\nKey benefits:\n1. Decoupling: producer aur consumer ko ek hi waqt running hona zaroori nahi. Email service down ho, messages queue mein wait karein; khote nahi.\n2. Spike buffering: ek baar 10,000 sign-ups ka sudden burst email service overwhelm nahi karta — queue up hote hain aur sustainable rate pe process.\n3. Background work: heavy operations (video encoding, PDF generation, ML inference, emails bhejna) synchronous request/response path se hata dete hain, user ko instant response milta hai.\n4. Fan-out: ek message multiple consumers consume kar sakte hain (pub/sub) — jaise naya order inventory, billing, aur notification services simultaneously trigger kare.\n\nKey challenges:\n- At-least-once delivery: zyadatar queues guarantee karte hain messages at least once deliver honge, possibly zyada. Consumers idempotent hone chahiye.\n- Ordering: zyadatar queues strict order guarantee nahi karte. Kafka ek partition ke andar order guarantee karta hai; RabbitMQ aur SQS generally nahi.\n- Dead-letter queue (DLQ): N retries ke baad fail hone wale messages yahaan move hote hain — ek bura message queue block karne se bachata hai.\n- Consumer scaling: zyada consumer instances add karo faster processing ke liye (competing consumers pattern).',
        },
        dailyLifeExample:
          'Message queue restaurant ki order slip rail jaisi hai — waiter (producer) slip rail pe lagata hai, cook (consumer) jab free ho tab uthata hai apne pace pe. Rush hour mein slips wait karti hain, kuch khota nahi. Ek slip kai counters (consumers) ko bhi ja sakti hai — fan-out.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// WITHOUT MESSAGE QUEUE (synchronous — blocks user)\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  User ──POST /signup──► App ──sends email (2s wait)──► Response\n//  (user waits 2+ seconds; email service down = signup fails!)\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// WITH MESSAGE QUEUE (async — instant response)\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  User ──POST /signup──► App ──enqueue("send-welcome", userId)\n//                                │\n//                          Response (instant!) ✓\n//                                │\n//                    ┌───────────┴──────────────────┐\n//                    │       Message Queue           │\n//                    │  [msg1] [msg2] [msg3] ...     │\n//                    └───────────┬──────────────────┘\n//                                │ (async consume)\n//               ┌────────────────┼────────────────┐\n//               ▼                ▼                ▼\n//         Email Worker    SMS Worker      Analytics Worker\n//         (sends email)   (optional)      (records event)\n//\n// Fan-out: 1 message → multiple consumers\n// DLQ: failed after 3 retries → Dead Letter Queue for inspection',
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
            'This is one of the most discussed architectural decisions — and also one of the most over-engineered ones. Understanding the genuine trade-offs prevents premature over-complication.\n\nMonolith: one deployable unit containing all features — user management, orders, payments, notifications in one codebase and one process. Advantages: simple to develop (all code in one place), simple to test (one test suite), simple to deploy (one binary), easy to debug (one log stream, one stack trace), low latency (in-process calls instead of network calls). Works perfectly well for most products. Netflix, Airbnb, Amazon all started as monoliths.\n\nDisadvantages of monolith at scale: one team\'s change can break another team\'s feature; deploying a small fix requires redeploying the entire app; scaling requires replicating the entire application even if only one part needs more capacity; different parts cannot use different languages or tech stacks.\n\nMicroservices: split the application into small, independently deployable services, each owning its own database and communicating over HTTP/gRPC or message queues. Advantages: independent deployments, independent scaling, each service can be in a different language, smaller codebases are easier to understand, teams own their services end-to-end.\n\nDisadvantages: network overhead and latency for every inter-service call; distributed transactions are very hard (no ACID across services); debugging is complex (distributed tracing required); operational overhead is massive (dozens of services each need CI/CD, monitoring, auto-scaling); you need service discovery, an API gateway, centralised logging.\n\nThe rule: start with a well-structured modular monolith. Extract services only when a specific module needs to scale independently, or when team ownership boundaries demand it.',
          hinglish:
            'Ye sabse discussed architectural decisions mein se ek hai — aur sabse over-engineered bhi. Genuine trade-offs samajhna premature over-complication rokta hai.\n\nMonolith: ek deployable unit jisme saare features — user management, orders, payments, notifications ek codebase aur ek process mein. Advantages: develop karna simple (sab code ek jagah), test simple (ek test suite), deploy simple (ek binary), debug easy (ek log stream), low latency (network calls ki bajaye in-process). Zyadatar products ke liye perfectly kaam karta hai. Netflix, Airbnb, Amazon sab monolith se shuru hue.\n\nMonolith ki disadvantages scale pe: ek team ka change doosri team ka feature tod sakta hai; chhota fix deploy karne ke liye poori app redeploy; scaling ke liye poori application replicate, chahe sirf ek part ko zyada capacity chahiye; alag parts alag languages ya tech stacks use nahi kar sakte.\n\nMicroservices: application ko chhote, independently deployable services mein split karo, har ek apna database own kare aur HTTP/gRPC ya message queues se communicate kare. Advantages: independent deployments, independent scaling, har service alag language mein, chhote codebases easy to understand, teams apni services end-to-end own karein.\n\nDisadvantages: har inter-service call pe network overhead aur latency; distributed transactions bahut mushkil; debugging complex (distributed tracing zaroori); operational overhead massive; service discovery, API gateway, centralised logging chahiye.\n\nRule: well-structured modular monolith se shuru karo. Services tabhi extract karo jab specific module ko independently scale karna ho ya team ownership boundaries demand karein.',
        },
        dailyLifeExample:
          'Monolith ek single restaurant jaisa hai — ek kitchen, sab ek jagah, easy to manage. Microservices food court jaisa — alag-alag stalls (services), har apna speciality, independently expand. Par food court ke kaam ki coordination mushkil — ek order ke liye kai counters coordinate karne padte hain.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// MONOLITH ARCHITECTURE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  ┌─────────────────────────────────────────────┐\n//  │           ONE APPLICATION PROCESS           │\n//  │                                             │\n//  │  ┌──────────┐ ┌──────────┐ ┌────────────┐  │\n//  │  │  Auth    │ │  Orders  │ │  Payments  │  │\n//  │  │  Module  │ │  Module  │ │  Module    │  │\n//  │  └──────────┘ └──────────┘ └────────────┘  │\n//  │                    │                        │\n//  │              In-process calls               │\n//  │         (no network overhead!)              │\n//  └─────────────────┬───────────────────────────┘\n//                    │\n//              ┌─────▼─────┐\n//              │  ONE  DB  │\n//              └───────────┘\n//\n//  Deploy: one binary  |  Debug: one log  |  Scale: replicate all\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// MICROSERVICES ARCHITECTURE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  API Gateway\n//      │\n//  ┌───┼───────────────────────────────────┐\n//  │   │              │                    │\n//  ▼   ▼              ▼                    ▼\n// Auth  Order      Payment            Notification\n// Svc   Svc        Svc                Svc\n//  │     │          │                   │\n// DB-A  DB-B       DB-C                Queue\n//\n//  Services talk via HTTP/gRPC or message queue\n//  Each scales independently  |  Each deploys independently\n//  Problem: distributed transactions, network latency, ops overhead',
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
    description: 'Consistency models, idempotency, resilience patterns aur back-of-envelope estimation — ye sab bade systems mein failures handle karne ke liye zaroori hain.',
    concepts: [
      {
        title: 'Consistency Models (Strong vs Eventual)',
        difficulty: 'hard',
        tags: ['consistency', 'distributed'],
        explanation: {
          english:
            'When data is replicated across multiple nodes, you must decide what "consistent" means for reads — a spectrum from strongest to weakest:\n\nStrong Consistency (Linearizability): every read reflects the most recent write, period. It is as if there is only one copy of the data. Every node returns the same value simultaneously. Very safe for humans to reason about, but requires coordination overhead (synchronous replication, consensus protocols) that adds latency and reduces availability during partitions. Use for: bank balances, inventory counts, distributed locks, anything where a wrong answer is costly.\n\nSequential Consistency: all operations appear in some total order consistent with each process\'s view. Slightly weaker than linearizability; allows some reordering across processes but each process sees its own operations in order.\n\nCausal Consistency: operations that are causally related are seen in order by all nodes. "If I post a photo and then add a caption, everyone should see the photo before the caption." Causally unrelated operations can be seen in different orders. Practical middle ground for social/collaborative apps.\n\nRead-Your-Own-Writes: you always see your own most recent writes, even if others briefly see stale data. Essential for UX — if you update your profile picture, you should see it immediately even if CDN is still propagating.\n\nEventual Consistency: replicas will converge to the same value eventually, but reads may return stale data in the meantime. No timing guarantee. Very fast, highly available, used where brief staleness is acceptable: like counts, follower counts, view counts, DNS records, shopping carts.',
          hinglish:
            'Jab data multiple nodes pe replicate hota hai, decide karna hota hai ki reads ke liye "consistent" ka matlab kya hai — strongest se weakest spectrum:\n\nStrong Consistency (Linearizability): har read most recent write reflect kare, period. Jaise sirf ek hi data ki copy ho. Har node simultaneously same value return kare. Reason karna bahut safe, par coordination overhead chahiye (synchronous replication, consensus protocols) jo latency add karta hai aur partitions mein availability kam karta hai. Use for: bank balances, inventory counts, distributed locks, kuch bhi jahan galat answer costly ho.\n\nSequential Consistency: saare operations kuch total order mein appear hote hain har process ke view ke saath consistent. Linearizability se thoda weak; processes ke across kuch reordering allow karta hai par har process apne operations order mein dekhta hai.\n\nCausal Consistency: causally related operations saare nodes ek order mein dekhte hain. "Maine photo post ki phir caption add ki, to sabko photo pehle dikhe." Causally unrelated operations alag order mein dikh sakte hain. Social/collaborative apps ke liye practical middle ground.\n\nRead-Your-Own-Writes: tum hamesha apna most recent write dekhte ho, chahe doosre briefly stale data dekhein. UX ke liye essential — profile picture update karo, turant tumhe dikhna chahiye.\n\nEventual Consistency: replicas eventually same value pe converge karenge, par reads beech mein stale data de sakte hain. Timing guarantee nahi. Bahut fast, highly available: like counts, follower counts, view counts, DNS records.',
        },
        dailyLifeExample:
          'Bank balance = strong consistency (har ATM ek hi balance dikhata hai turant). Instagram like count = eventual consistency (ek device pe 1.2k, doosre pe 1.1k — thodi der baad converge). Profile update = read-your-own-writes (tum apna naya naam turant dekhte ho, doosron ko thodi der lag sakti hai).',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// STRONG CONSISTENCY TIMELINE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  t=0   User A: WRITE balance=500  ──► Primary DB\n//                                         │ sync replicate (waits)\n//                                    ────►│ Replica 1\n//                                    ────►│ Replica 2\n//  t=50ms             Primary ACKs write ◄┘ (after all replicas confirm)\n//\n//  t=51ms  User B: READ balance ──► Replica 1 ──► 500 ✓ (guaranteed fresh)\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// EVENTUAL CONSISTENCY TIMELINE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  t=0   User A: WRITE likes=1001 ──► Primary DB\n//        Primary ACKs immediately ✓  (async replication starts)\n//\n//  t=5ms  User B: READ likes ──► Replica 1 ──► 1000 ✗ (stale!)\n//  t=50ms User C: READ likes ──► Replica 1 ──► 1001 ✓ (converged)\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// CHOOSE PER FEATURE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Strong:   bank balance, inventory, distributed locks\n//  Eventual: likes, views, feeds, follower counts, DNS\n//  Read-your-own-writes: profile updates, settings\n//  Causal:   chat messages (order matters within a thread)',
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
            'In distributed systems, every remote call can fail — network errors, slow responses, service crashes. A resilient system handles these gracefully without cascading failures. Four essential patterns:\n\n1. Timeouts: every outgoing call (HTTP, DB, cache) must have a timeout. Without one, a slow dependency causes your request handler to hang forever, exhausting your thread pool and taking down your service too. Set timeouts at every layer: connection timeout + read timeout.\n\n2. Retries with Exponential Backoff + Jitter: transient failures (momentary network blip, temporary overload) often resolve themselves. Retry, but with increasing delays to avoid hammering an already-struggling service. Add jitter (random variation to the delay) so thousands of clients do not all retry at exactly the same moment (thundering herd / retry storm). Example: retry after 1s, then 2s, then 4s, then 8s, each with ±30% jitter. Only retry idempotent operations.\n\n3. Circuit Breaker: if a service is failing consistently, stop sending it requests for a period to let it recover — instead of hammering it with retries. Three states: CLOSED (normal operation, calls flow, count failures); OPEN (failure threshold exceeded — immediately return error/fallback, do not call the service — lets it recover); HALF-OPEN (after a recovery timeout, allow one test call — if it succeeds, close the circuit; if it fails, stay open). Named after electrical circuit breakers.\n\n4. Bulkhead: isolate resource pools (thread pools, connection pools) per downstream dependency. If one external service is slow and exhausts its thread pool, other services still have their own threads and continue working. Prevents one bad dependency from sinking the entire application.\n\n5. Graceful Degradation: when a non-critical feature is failing, serve a degraded-but-functional experience rather than a total error. Return cached/stale data, hide a recommendation widget, show a default state.',
          hinglish:
            'Distributed systems mein har remote call fail ho sakta hai — network errors, slow responses, service crashes. Resilient system inhe gracefully handle karta hai bina cascading failures ke. Panch essential patterns:\n\n1. Timeouts: har outgoing call (HTTP, DB, cache) pe timeout honi chahiye. Bina timeout ke, ek slow dependency tumhare request handler ko hamesha hang karne de sakti hai, thread pool exhaust karke tumhari service bhi gira de. Har layer pe set karo: connection timeout + read timeout.\n\n2. Retries with Exponential Backoff + Jitter: transient failures (momentary network blip, temporary overload) aksar khud resolve ho jaati hain. Retry karo, par increasing delays ke saath taaki pehle se struggling service hammer na ho. Jitter add karo (delay mein random variation) taaki hazaron clients exactly ek hi waqt retry na karein (thundering herd). Example: 1s, phir 2s, phir 4s, phir 8s, har ek mein ±30% jitter. Sirf idempotent operations retry karo.\n\n3. Circuit Breaker: agar service consistently fail kar rahi hai, use recovery ka time do — requests bhejne ke bajaye. Teen states: CLOSED (normal, calls flow, failures count); OPEN (threshold exceeded — turant error/fallback return, service call mat karo — recover hone do); HALF-OPEN (recovery timeout ke baad, ek test call allow — succeed kare to close; fail kare to open raho).\n\n4. Bulkhead: per downstream dependency resource pools (thread pools, connection pools) isolate karo. Ek external service slow ho aur apna thread pool exhaust kare, doosri services ke apne threads hain aur kaam karte hain. Ek bura dependency poori application nahi girata.\n\n5. Graceful Degradation: jab non-critical feature fail ho, total error ke bajaye degraded-but-functional experience do. Cached/stale data return karo, recommendation widget chhupao, default state dikhao.',
        },
        dailyLifeExample:
          'Circuit breaker ghar ke fuse jaisa — short circuit par bijli kaat do, ghar na jale, baad mein wapas on. Retry with backoff = "thodi der baad dobara knock karo, baar baar turant nahi". Bulkhead = ship ke watertight compartments — ek mein paani ghuse to baaki safe.',
        codeExample:
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// RETRY WITH EXPONENTIAL BACKOFF + JITTER\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Attempt 1: fails → wait 1s  + jitter(0–300ms)\n//  Attempt 2: fails → wait 2s  + jitter\n//  Attempt 3: fails → wait 4s  + jitter\n//  Attempt 4: fails → wait 8s  + jitter\n//  Attempt 5: give up → return error\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// CIRCUIT BREAKER STATE MACHINE\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//           failures < threshold\n//   CLOSED ◄─────────────────────── HALF-OPEN\n//     │           success test call      ▲\n//     │ failures >= threshold            │ timeout expires\n//     ▼                                 │\n//   OPEN ───────────────────────────────┘\n//   (fail fast — do not call service)\n//\n// CLOSED:    calls flow; count consecutive failures\n// OPEN:      immediately return fallback; service recovers\n// HALF-OPEN: 1 test call allowed → success=CLOSED, fail=OPEN\n//\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// GRACEFUL DEGRADATION EXAMPLES\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  Recommendation service down → show "Popular items" (cached)\n//  Review service slow         → hide reviews section\n//  Payment gateway timeout     → show retry button, do not double-charge\n//  Search index down           → fall back to basic DB query',
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
    description: 'Real-world system design case studies — TinyURL, news feed, chat, notifications. Ye hi interview mein poochhe jaate hain. Har project mein requirements → estimates → architecture → trade-offs.',
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
          '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n// SYSTEM ARCHITECTURE: URL SHORTENER\n// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n//\n//  ┌────────────────────────────────────────────────────┐\n//  │                   WRITE FLOW                       │\n//  │                                                    │\n//  │  POST /shorten {url}                               │\n//  │    → App Server                                    │\n//  │    → id = DB.nextId()    // auto-increment         │\n//  │    → code = base62(id)   // "aZ8kP2q" (7 chars)   │\n//  │    → DB.insert(code, url, createdAt, expiresAt)    │\n//  │    → return {short: "tny.io/aZ8kP2q"}              │\n//  └────────────────────────────────────────────────────┘\n//\n//  ┌────────────────────────────────────────────────────┐\n//  │                   READ FLOW  (hot path)            │\n//  │                                                    │\n//  │  GET /aZ8kP2q                                      │\n//  │    → App Server                                    │\n//  │    → Redis.get("aZ8kP2q")                          │\n//  │    │                                               │\n//  │    ├── HIT  → 301/302 redirect to longURL  ✓ fast │\n//  │    │                                               │\n//  │    └── MISS → DB.get("aZ8kP2q")                   │\n//  │               → Redis.set("aZ8kP2q", url, TTL)    │\n//  │               → 301/302 redirect                   │\n//  └────────────────────────────────────────────────────┘\n//\n//  ┌────────────────────────────────────────────────────┐\n//  │                FULL SYSTEM DIAGRAM                 │\n//  │                                                    │\n//  │     CDN / LB                                       │\n//  │       │                                            │\n//  │   App Servers (stateless, many instances)          │\n//  │    │           │                                   │\n//  │ Redis Cache   DB Primary + Read Replicas           │\n//  │                │                                   │\n//  │            Analytics Queue (Kafka/SQS)             │\n//  │                │                                   │\n//  │         Click Analytics Worker → Analytics DB      │\n//  └────────────────────────────────────────────────────┘\n//\n//  Trade-off: 301 (browser caches, fewer analytics hits)\n//         vs  302 (every click goes through, more analytics)\n//\n//  base62 capacity: 7 chars = 62^7 ≈ 3.5 TRILLION unique codes',
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
            frequency: 'common',
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
          '// ═══════════════════════ NEWS FEED SYSTEM ═══════════════════════\n//\n// STRATEGY 1 — FAN-OUT ON WRITE (push model)\n//\n//  User A posts\n//       │\n//       ▼\n//  Post Service ──► DB (posts table)\n//       │\n//       ▼\n//  Fan-out Worker\n//  ┌────────────────────────────────────────────┐\n//  │ for each follower of A:                    │\n//  │   redis.lpush(feed:{followerId}, postId)   │\n//  │   redis.ltrim(feed:{followerId}, 0, 999)   │\n//  └────────────────────────────────────────────┘\n//       │\n//  Read: GET /feed/{user}\n//    → redis.lrange(feed:{userId}, 0, 19) // instant ✓\n//\n//  ⚠ Celebrity Problem: 50M followers → 50M Redis writes per post\n//\n// ─────────────────────────────────────────────────────────────────\n// STRATEGY 2 — FAN-OUT ON READ (pull model)\n//\n//  User A posts ──► DB only (no fan-out)\n//\n//  Read: GET /feed/{user}\n//    → for each followee: SELECT top posts\n//    → merge + sort by timestamp            // heavy read ⚠\n//\n// ─────────────────────────────────────────────────────────────────\n// HYBRID STRATEGY (Instagram / Twitter approach)\n//\n//         ┌─────────────────────────────────────┐\n//         │          Incoming Post               │\n//         └──────────────┬──────────────────────┘\n//                        │\n//              ┌─────────▼──────────┐\n//              │  Is author a       │\n//              │  celebrity? (>100k)│\n//              └──┬─────────────────┘\n//          yes ◄──┘        └──► no\n//           │                    │\n//     Pull on read         Push to followers\n//    (skip fan-out)       feed:{id} in Redis\n//           │                    │\n//           └──────────┬─────────┘\n//                      ▼\n//             User loads feed:\n//             precomputed feed (Redis)\n//           + merge celebrity posts (DB)\n//           + rank by score\n//             ──────────────────────\n//             ► cursor-based pagination (cursor=lastSeenId)\n//             ► CDN for media (photos, videos)\n//             ► Async queue for notifications',
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
          '// ════════════════════════ CHAT SYSTEM ════════════════════════\n//\n// HIGH-LEVEL ARCHITECTURE\n//\n//  ┌──────────┐   WebSocket    ┌──────────────┐\n//  │ Client A │◄──────────────►│ Chat Server 1│\n//  └──────────┘                └──────┬───────┘\n//                                     │\n//  ┌──────────┐   WebSocket    ┌──────▼───────┐\n//  │ Client B │◄──────────────►│ Chat Server 2│\n//  └──────────┘                └──────┬───────┘\n//                                     │\n//                  ┌──────────────────▼─────────────────┐\n//                  │           Shared Layer              │\n//  ┌───────────────┴──┐  ┌────────────────┐  ┌─────────┴──────┐\n//  │ Redis pub/sub     │  │  Cassandra     │  │ Presence Store  │\n//  │ userId→serverId   │  │  Messages DB   │  │ heartbeat + TTL │\n//  │ (routing map)     │  │  (by chat id)  │  │                 │\n//  └───────────────────┘  └────────────────┘  └────────────────┘\n//\n// MESSAGE FLOW (A → B)\n//\n//  1. A sends via WebSocket to Server-1\n//  2. Server-1: persist(msg) in Cassandra\n//  3. Server-1: serverId = redis.get("user:B")\n//     ┌─────────────────┐    ┌──────────────────────────────────┐\n//     │ B online?        │    │ B offline?                       │\n//     │ route to Server-2│    │ store in offline queue (Redis)   │\n//     │ push via WS → B  │    │ deliver when B reconnects        │\n//     └─────────────────┘    └──────────────────────────────────┘\n//\n// DELIVERY RECEIPTS\n//\n//  sent ──► delivered ──► read\n//   │           │           │\n//  Server      Server B    Client B taps msg\n//  ACK        pushes ACK   pushes read receipt\n//\n// GROUP MESSAGING\n//\n//  Group(id) has memberList\n//  send(msg, groupId) → fan-out to each member\n//  use async worker for large groups (>500 members)\n//\n// PRESENCE\n//\n//  Client ──heartbeat every 5s──► Server\n//  Server: redis.set("presence:{userId}", 1, EX 15)\n//  if TTL expires → user is "offline"',
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
          '// ══════════════════ NOTIFICATION SYSTEM ══════════════════════\n//\n// PIPELINE OVERVIEW\n//\n//  Trigger Sources\n//  ┌────────┐  ┌───────┐  ┌───────────┐  ┌──────────┐\n//  │Like Svc│  │OrderSvc│  │FollowSvc  │  │Marketing │\n//  └───┬────┘  └───┬───┘  └─────┬─────┘  └─────┬────┘\n//      └───────────┴────────────┴───────────────┘\n//                             │\n//                             ▼\n//               ┌─────────────────────────┐\n//               │   Notification Service  │\n//               │  - validate request     │\n//               │  - idempotency check    │\n//               │  - enqueue              │\n//               └────────────┬────────────┘\n//                            │\n//                ┌───────────▼──────────┐\n//                │    Message Queue     │  (Kafka / SQS)\n//                │  ← buffers spikes →  │\n//                └─┬──────┬──────┬─────┘\n//       ┌──────────┘      │      └─────────────┐\n//       ▼                 ▼                    ▼\n//  ┌─────────┐      ┌──────────┐         ┌──────────┐\n//  │  Push   │      │   SMS    │         │  Email   │\n//  │ Worker  │      │ Worker   │         │ Worker   │\n//  └────┬────┘      └────┬─────┘         └────┬─────┘\n//       │                │                     │\n//  ┌────▼───┐       ┌────▼────┐          ┌────▼────┐\n//  │FCM/APNs│       │Twilio/  │          │SendGrid │\n//  │Provider│       │AWS SNS  │          │/SES     │\n//  └────────┘       └─────────┘          └─────────┘\n//\n// WORKER LOGIC (per channel)\n//\n//  consume(msg):\n//    prefs = getUserPrefs(userId)          // did user opt in?\n//    if (!prefs.allows(channel)) skip      // respect settings\n//    if (rateLimited(userId)) delay/skip   // no spam\n//    body = renderTemplate(template, locale) // i18n\n//    result = provider.send(body)\n//    if (result.fail):\n//      retry with exponential backoff\n//      after N retries → dead-letter queue (DLQ)\n//    store notif status in DB → in-app inbox\n//\n// RELIABILITY PATTERNS\n//\n//  idempotency key: MD5(userId + type + entityId + timestamp-hour)\n//  DLQ: failed messages reviewed, re-queued or alerted\n//  at-least-once: dedup on consumer side with idempotency key\n//\n// SCALE\n//  Queue → horizontal scaling of workers per channel\n//  Prefer async everywhere; never block on slow provider calls',
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
    frequency: 'common',
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

  // ─── Fundamentals ───────────────────────────────────────────
  {
    question: 'How do you approach a system design interview question?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Clarify REQUIREMENTS first — functional features, then non-functional ones: expected users, read/write ratio, latency target, consistency needs. Estimate scale roughly, since 1,000 users and 100 million lead to different designs. Define the API, then the data model, then a simple high-level architecture. Only THEN identify bottlenecks and scale them — caching, replicas, sharding, queues. Discuss trade-offs explicitly. Jumping straight to "we will use Kafka and microservices" without requirements is the classic failure.',
      hinglish:
        'Pehle REQUIREMENTS saaf karo — functional features, phir non-functional: expected users, read/write ratio, latency target, consistency ki zaroorat. Scale ka mota andaaza lagao, kyunki 1,000 users aur 10 crore alag designs tak le jaate hain. API define karo, phir data model, phir ek simple high-level architecture. TAB jaakar bottlenecks pehchano aur unhe scale karo — caching, replicas, sharding, queues. Trade-offs explicitly discuss karo. Bina requirements ke seedha "hum Kafka aur microservices use karenge" pe koodna classic failure hai.',
    },
  },
  {
    question: 'What is the CAP theorem and what does it actually mean in practice?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CAP says a distributed system cannot simultaneously guarantee Consistency, Availability, and Partition tolerance. In practice partitions WILL happen on a real network, so P is not optional — the actual choice is what to do DURING a partition: refuse requests to stay consistent (CP, like a traditional relational database or etcd) or keep serving possibly stale data (AP, like Cassandra or DynamoDB). Note the choice applies only during a partition; the rest of the time you can have both.',
      hinglish:
        'CAP kehta hai ki ek distributed system ek saath Consistency, Availability, aur Partition tolerance guarantee nahi kar sakta. Practically ek real network pe partitions HONGE hi, isliye P optional nahi — asli choice ye hai ki partition ke DAURAAN kya karein: consistent rehne ke liye requests mana karo (CP, ek traditional relational database ya etcd ki tarah) ya shayad purana data serve karte raho (AP, Cassandra ya DynamoDB ki tarah). Note karo ye choice sirf partition ke dauraan lagti hai; baaki waqt tum dono paa sakte ho.',
    },
  },
  {
    question: 'What is eventual consistency?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Eventual consistency guarantees that if writes stop, all replicas will CONVERGE to the same value — but for some window, different replicas may return different answers. It buys availability and low latency, which is why it powers DNS, social feeds, and shopping carts, where a few seconds of staleness harms nobody. It is wrong for anything where a stale read causes real damage — account balances, inventory at checkout, or a permission check.',
      hinglish:
        'Eventual consistency guarantee karti hai ki agar writes ruk jaayein, saare replicas ek hi value pe MIL jaayenge — par kuch samay ke liye, alag replicas alag jawab de sakte hain. Ye availability aur kam latency khareedti hai, isiliye ye DNS, social feeds, aur shopping carts chalati hai, jahan kuch second ka puranapan kisi ko nuksaan nahi karta. Ye us har cheez ke liye galat hai jahan ek purana read asli nuksaan kare — account balances, checkout pe inventory, ya ek permission check.',
    },
  },
  {
    question: 'What is the difference between vertical and horizontal scaling?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'VERTICAL scaling adds resources to one machine — simple, requires no code change, but has a hard hardware ceiling, is expensive at the top end, and leaves a single point of failure. HORIZONTAL scaling adds more machines behind a load balancer, which scales far further and improves fault tolerance, but demands the application be STATELESS and introduces distributed-systems problems. Most designs start vertical and move horizontal, because horizontal complexity is only worth paying when you need it.',
      hinglish:
        'VERTICAL scaling ek machine mein resources jodta hai — simple, code badalne ki zaroorat nahi, par iski ek sakht hardware chhat hai, upar ke sire pe mehnga hai, aur ek single point of failure chhod deta hai. HORIZONTAL scaling ek load balancer ke peeche zyada machines jodta hai, jo bahut aage tak scale karta hai aur fault tolerance behtar karta hai, par application ka STATELESS hona maangta hai aur distributed-systems ki problems laata hai. Zyadatar designs vertical se shuru karke horizontal jaate hain, kyunki horizontal complexity tabhi bharni chahiye jab zaroorat ho.',
    },
  },
  {
    question: 'What is a load balancer and what algorithms does it use?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A load balancer distributes traffic across servers, removes failed instances from rotation, and often terminates TLS. Algorithms: ROUND ROBIN cycles evenly; LEAST CONNECTIONS favours the least busy server and suits long-lived connections; IP HASH sends the same client to the same server, giving session affinity; WEIGHTED accounts for uneven server capacity. Layer 4 balances on IP and port and is faster; Layer 7 reads HTTP and can route by path or header.',
      hinglish:
        'Ek load balancer traffic ko servers ke across baantta hai, fail hue instances ko rotation se hataata hai, aur aksar TLS terminate karta hai. Algorithms: ROUND ROBIN barabar ghumata hai; LEAST CONNECTIONS sabse kam vyast server chunta hai aur lambe connections ko suit karta hai; IP HASH usi client ko usi server pe bhejta hai, session affinity dete hue; WEIGHTED asमान server capacity ka hisaab rakhta hai. Layer 4 IP aur port pe balance karta hai aur tez hai; Layer 7 HTTP padhta hai aur path ya header se route kar sakta hai.',
    },
  },
  {
    question: 'What are the common caching strategies?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CACHE-ASIDE (lazy loading) is the most common: the app checks the cache, and on a miss reads the database and populates it — simple, but the first request is always slow and stale data is possible. READ-THROUGH puts the cache in front of the database transparently. WRITE-THROUGH writes to both synchronously, keeping them consistent at the cost of write latency. WRITE-BEHIND writes to the cache and flushes asynchronously — fastest, but data can be lost if the cache dies.',
      hinglish:
        'CACHE-ASIDE (lazy loading) sabse common hai: app cache check karta hai, aur miss pe database padh kar use bharta hai — simple, par pehli request hamesha slow hai aur purana data possible hai. READ-THROUGH cache ko database ke aage transparently rakhta hai. WRITE-THROUGH dono mein ek saath likhta hai, unhe consistent rakhte hue write latency ke cost pe. WRITE-BEHIND cache mein likh kar asynchronously flush karta hai — sabse tez, par cache marne pe data kho sakta hai.',
    },
  },
  {
    question: 'What are cache eviction policies?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'When a cache is full, something must be removed. LRU evicts the least recently used and is the sensible default, since recency predicts reuse well. LFU evicts the least frequently used, which suits stable popularity but can keep a once-hot item forever. FIFO evicts the oldest regardless of use. TTL expires entries after a fixed time and is what bounds staleness. Most systems combine LRU with a TTL: LRU handles memory pressure, TTL handles correctness.',
      hinglish:
        'Jab ek cache bhar jaaye, kuch hataana padta hai. LRU sabse kam haal mein use hua hataata hai aur samajhdaar default hai, kyunki recency dobara use hone ka achha andaaza deti hai. LFU sabse kam baar use hua hataata hai, jo sthir popularity ko suit karta hai par ek kabhi-hot item ko hamesha rakh sakta hai. FIFO use chahe kuch bhi ho sabse purana hataata hai. TTL entries ko ek tay samay ke baad expire karta hai aur wahi puranapan seemit karta hai. Zyadatar systems LRU ko ek TTL ke saath jodte hain: LRU memory pressure sambhalta hai, TTL correctness.',
    },
  },
  {
    question: 'How do you invalidate a cache?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Three approaches. TTL-based expiry is simplest and bounds staleness without any coordination, at the cost of serving stale data until it expires. EXPLICIT invalidation deletes or updates the key when the underlying data changes — accurate but easy to miss a write path, and hard when one change affects many cached keys. VERSIONED keys sidestep deletion by including a version in the key, so old entries simply age out. Cache invalidation is genuinely one of the hard problems.',
      hinglish:
        'Teen approaches. TTL-based expiry sabse simple hai aur bina kisi coordination ke puranapan seemit karta hai, expire hone tak purana data serve karne ke cost pe. EXPLICIT invalidation underlying data badalne pe key delete ya update karta hai — sateek par ek write path chhootna aasaan, aur mushkil jab ek change bahut cached keys ko affect kare. VERSIONED keys key mein ek version daal kar deletion se bachte hain, isliye purani entries bas puraani padkar nikal jaati hain. Cache invalidation genuinely mushkil problems mein se ek hai.',
    },
  },
  {
    question: 'What is database sharding and how do you choose a shard key?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Sharding splits data horizontally across servers so writes and storage scale beyond one machine. The shard key determines placement and is effectively permanent, so it deserves careful thought: it needs high cardinality, even distribution, and should appear in your common queries so requests hit one shard rather than all of them. Bad keys create HOTSPOTS — a timestamp sends every new write to one shard — or force scatter-gather reads. Cross-shard joins and transactions become expensive or impossible.',
      hinglish:
        'Sharding data ko servers ke across horizontally baantta hai taaki writes aur storage ek machine se aage scale karein. Shard key placement decide karti hai aur effectively permanent hai, isliye ise dhyaan chahiye: use high cardinality, even distribution chahiye, aur wo tumhari common queries mein aani chahiye taaki requests sab shards ke bajaye ek pe jaayein. Buri keys HOTSPOTS banati hain — ek timestamp har naya write ek shard pe bhejta hai — ya scatter-gather reads force karti hain. Cross-shard joins aur transactions mehnge ya asambhav ho jaate hain.',
    },
  },
  {
    question: 'What is consistent hashing and why is it useful?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'With plain modulo hashing, adding or removing a node changes the mapping for almost EVERY key, so a cache cluster effectively empties on any topology change. Consistent hashing places nodes and keys on a ring, and each key goes to the next node clockwise — so adding a node remaps only the keys in its arc, roughly 1/n of them. VIRTUAL NODES spread each physical node across many ring positions to even out the distribution. It underpins DynamoDB, Cassandra, and distributed caches.',
      hinglish:
        'Plain modulo hashing ke saath, ek node jodna ya hataana ALMOST HAR key ki mapping badal deta hai, isliye ek cache cluster kisi bhi topology change pe effectively khaali ho jaata hai. Consistent hashing nodes aur keys ko ek ring pe rakhta hai, aur har key clockwise agle node pe jaati hai — isliye ek node jodna sirf uske arc ki keys remap karta hai, lagbhag 1/n. VIRTUAL NODES har physical node ko bahut ring positions pe failate hain taaki distribution barabar ho. Ye DynamoDB, Cassandra, aur distributed caches ke neeche hai.',
    },
  },
  {
    question: 'What is the difference between replication and sharding?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'REPLICATION copies the SAME data to multiple servers, which improves read throughput and provides redundancy for failover — but every replica holds the full dataset, so it does not help with storage size or write throughput. SHARDING splits DIFFERENT data across servers, which scales both writes and storage but adds no redundancy on its own. Real systems use both: shard for capacity, then replicate each shard for availability.',
      hinglish:
        'REPLICATION WAHI data multiple servers pe copy karta hai, jo read throughput behtar karta hai aur failover ke liye redundancy deta hai — par har replica poora dataset rakhta hai, isliye ye storage size ya write throughput mein madad nahi karta. SHARDING ALAG data servers ke across baantta hai, jo writes aur storage dono scale karta hai par khud koi redundancy nahi deta. Asli systems dono use karte hain: capacity ke liye shard karo, phir availability ke liye har shard ko replicate karo.',
    },
  },
  {
    question: 'What is the difference between SQL and NoSQL, and how do you choose?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'SQL databases offer a fixed schema, ACID transactions, powerful joins, and mature tooling — the right default when data is relational and correctness matters. NoSQL covers several families: document stores for flexible schemas, key-value for simple high-throughput lookups, wide-column for massive write volumes, and graph for relationship traversal. Choose by ACCESS PATTERN, not by fashion. Modern Postgres handles JSON and scales far enough that "we need NoSQL for scale" is usually premature.',
      hinglish:
        'SQL databases ek fixed schema, ACID transactions, taakatwar joins, aur pakka tooling dete hain — sahi default jab data relational ho aur correctness matter kare. NoSQL kai families cover karta hai: flexible schemas ke liye document stores, simple high-throughput lookups ke liye key-value, bade write volumes ke liye wide-column, aur relationship traversal ke liye graph. ACCESS PATTERN se chuno, fashion se nahi. Modern Postgres JSON handle karta hai aur itna scale karta hai ki "scale ke liye NoSQL chahiye" usually jaldbaazi hai.',
    },
  },
  {
    question: 'What is a message queue and when do you need one?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A queue decouples a producer from a consumer: the producer enqueues work and returns immediately, and a worker processes it later. You need one when work is slow (video encoding, report generation), when you must absorb traffic SPIKES without dropping requests, when a failing downstream service should not fail the user request, or when several consumers need the same event. The costs are added latency, eventual consistency, and the need to handle duplicates and failures.',
      hinglish:
        'Ek queue ek producer ko ek consumer se alag karti hai: producer kaam enqueue karke turant lautta hai, aur ek worker use baad mein process karta hai. Ye tab chahiye jab kaam slow ho (video encoding, report generation), jab tumhe traffic ke UBHAAR bina requests gira ye sokhne hon, jab ek fail hoti downstream service user request fail na kare, ya jab kai consumers ko wahi event chahiye. Costs hain badhi latency, eventual consistency, aur duplicates aur failures sambhalne ki zaroorat.',
    },
  },
  {
    question: 'What is the difference between a message queue and a pub-sub system?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'In a QUEUE, each message is delivered to exactly ONE consumer, so adding workers distributes load — the model for task processing. In PUB-SUB, each message goes to EVERY subscriber, so one event can trigger many independent reactions — the model for event notification. Kafka blends both with consumer groups: within a group messages are split like a queue, while separate groups each receive the full stream like pub-sub.',
      hinglish:
        'Ek QUEUE mein, har message theek EK consumer tak jaata hai, isliye workers jodna load baantta hai — task processing ka model. PUB-SUB mein, har message HAR subscriber tak jaata hai, isliye ek event bahut swatantra reactions trigger kar sakta hai — event notification ka model. Kafka consumer groups se dono milata hai: ek group ke andar messages ek queue ki tarah bantte hain, jabki alag groups har ek poora stream pub-sub ki tarah paate hain.',
    },
  },
  {
    question: 'What is idempotency and why does it matter in distributed systems?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An idempotent operation produces the same result whether applied once or many times. It matters because networks are unreliable: a client that times out will retry, and a queue that guarantees at-least-once delivery will redeliver — so without idempotency a user gets charged twice. Implement it with an idempotency KEY the server records, or design operations to be naturally idempotent (set the value to X rather than increment it). Any retry mechanism demands this.',
      hinglish:
        'Ek idempotent operation ek baar lagane ya bahut baar lagane pe wahi nateeja deta hai. Ye isliye matter karta hai kyunki networks bharosemand nahi: ek client jo timeout hota hai retry karega, aur ek queue jo at-least-once delivery guarantee karti hai dobara bhejegi — isliye idempotency ke bina ek user do baar charge ho jaata hai. Ise ek idempotency KEY se implement karo jise server record kare, ya operations ko swabhavik roop se idempotent banao (increment karne ke bajaye value ko X set karo). Koi bhi retry mechanism ye maangta hai.',
    },
  },
  {
    question: 'What are monoliths and microservices, and when should you choose each?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A MONOLITH is one deployable unit — simple to develop, test, deploy, and debug, with in-process calls and easy transactions. MICROSERVICES split by business capability, allowing independent deployment, scaling, and technology choices, at the cost of network calls, distributed transactions, harder debugging, and real operational overhead. The honest guidance is to start with a well-structured monolith and extract services only when a specific team or scaling pressure justifies it.',
      hinglish:
        'Ek MONOLITH ek deployable unit hai — develop, test, deploy, aur debug karna simple, in-process calls aur aasaan transactions ke saath. MICROSERVICES business capability se bantte hain, swatantra deployment, scaling, aur technology choices dete hue, network calls, distributed transactions, mushkil debugging, aur asli operational bojh ke cost pe. Imaandaar salah ye hai ki ek achhe structure wale monolith se shuru karo aur services tabhi nikaalo jab ek khaas team ya scaling ka dabaav ise sahi thehraaye.',
    },
  },
  {
    question: 'What is the saga pattern?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A saga manages a transaction spanning multiple services, where a single ACID transaction is impossible. It is a sequence of local transactions, each publishing an event that triggers the next; if any step fails, COMPENSATING transactions undo the earlier ones — refunding a payment rather than rolling back a database. CHOREOGRAPHY has services react to each other\'s events; ORCHESTRATION uses a central coordinator, which is easier to reason about and debug.',
      hinglish:
        'Ek saga multiple services pe faili ek transaction manage karta hai, jahan ek single ACID transaction asambhav hai. Ye local transactions ka ek sequence hai, har ek ek event publish karta hua jo agla trigger kare; agar koi step fail ho, COMPENSATING transactions pichhle undo karte hain — ek database rollback karne ke bajaye ek payment refund karna. CHOREOGRAPHY mein services ek doosre ke events pe react karti hain; ORCHESTRATION ek central coordinator use karta hai, jise samajhna aur debug karna easier hai.',
    },
  },
  {
    question: 'What is an API gateway?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An API gateway is a single entry point in front of many services, handling cross-cutting concerns centrally: routing, authentication, rate limiting, TLS termination, request aggregation, and logging. It means each service does not reimplement auth, and clients see one address instead of a dozen. Its risks are becoming a single point of failure and accumulating business logic that belongs in a service — keep it about routing and policy, not domain rules.',
      hinglish:
        'Ek API gateway bahut services ke aage ek single entry point hai, cross-cutting concerns ko ek jagah sambhalte hue: routing, authentication, rate limiting, TLS termination, request aggregation, aur logging. Iska matlab har service auth dobara nahi banati, aur clients ek darjan ke bajaye ek address dekhte hain. Iske risks ek single point of failure ban jaana aur aisi business logic ikattha karna hai jo ek service ki hai — ise routing aur policy tak rakho, domain rules tak nahi.',
    },
  },
  {
    question: 'What is a CDN and how does it work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A CDN is a network of geographically distributed edge servers caching content near users, so a request from Delhi is served from Mumbai rather than Virginia. That cuts latency dramatically, reduces origin load, and absorbs traffic spikes and some DDoS. Traditionally for static assets, modern CDNs also cache API responses and run edge compute. Control it with cache headers, and use content-hashed filenames so a deploy invalidates naturally rather than requiring a purge.',
      hinglish:
        'Ek CDN bhaugolik roop se faile edge servers ka ek network hai jo users ke paas content cache karta hai, isliye Delhi se ek request Virginia ke bajaye Mumbai se serve hoti hai. Ye latency dramatically kam karta hai, origin load ghataata hai, aur traffic ubhaar aur kuch DDoS sokh leta hai. Traditionally static assets ke liye, modern CDNs API responses bhi cache karte hain aur edge compute chalate hain. Ise cache headers se control karo, aur content-hashed filenames use karo taaki ek deploy purge maange bina swabhavik roop se invalidate ho.',
    },
  },
  {
    question: 'How would you design a URL shortener?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Two endpoints: create a short code for a URL, and redirect. Generate the code from a distributed counter encoded in base62 (short and collision-free) rather than hashing, which needs collision handling. Store the mapping in a key-value store — reads vastly outnumber writes, so cache aggressively and put popular codes in Redis. Return a 301 for permanent or 302 if you want to count clicks. Scale reads with replicas and a CDN; shard by code when storage demands it.',
      hinglish:
        'Do endpoints: ek URL ke liye ek short code banao, aur redirect karo. Code ko base62 mein encode kiye ek distributed counter se banao (chhota aur bina collision) hashing ke bajaye, jise collision handling chahiye. Mapping ko ek key-value store mein rakho — reads writes se bahut zyada hain, isliye aggressively cache karo aur popular codes Redis mein rakho. Permanent ke liye 301 ya clicks ginne ke liye 302 lautao. Reads ko replicas aur ek CDN se scale karo; storage maange to code se shard karo.',
    },
  },
  {
    question: 'How would you design a rate limiter?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Pick the algorithm by requirement. FIXED WINDOW is simplest but allows a double burst at the boundary. SLIDING WINDOW LOG is exact but stores every timestamp. TOKEN BUCKET allows controlled bursts and is the usual choice for APIs. Store counters in Redis so limits are shared across instances, and use atomic operations or a Lua script to avoid races. Return 429 with `Retry-After`. Decide the key carefully: per user, per IP, or per endpoint.',
      hinglish:
        'Algorithm requirement se chuno. FIXED WINDOW sabse simple hai par boundary pe ek dugna burst allow karta hai. SLIDING WINDOW LOG sateek hai par har timestamp store karta hai. TOKEN BUCKET controlled bursts allow karta hai aur APIs ke liye usual choice hai. Counters Redis mein rakho taaki limits instances ke across share hon, aur races se bachne ke liye atomic operations ya ek Lua script use karo. `Retry-After` ke saath 429 lautao. Key dhyaan se decide karo: per user, per IP, ya per endpoint.',
    },
  },
  {
    question: 'How would you design a news feed?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Two models. FAN-OUT ON WRITE precomputes each user\'s feed when a post is created, giving very fast reads but enormous write amplification for a user with millions of followers. FAN-OUT ON READ assembles the feed at request time — cheap writes, slow reads. Real systems use a HYBRID: fan out on write for ordinary users, and fetch celebrity posts at read time and merge. Add ranking, pagination by cursor, and heavy caching of the assembled feed.',
      hinglish:
        'Do models. FAN-OUT ON WRITE post banate waqt har user ka feed pehle se banata hai, bahut tez reads dete hue par crore followers wale user ke liye bahut badi write amplification. FAN-OUT ON READ request ke waqt feed jodta hai — saste writes, slow reads. Asli systems ek HYBRID use karte hain: aam users ke liye write pe fan out, aur celebrity posts read ke waqt laakar merge. Ranking, cursor se pagination, aur jude hue feed ki bhaari caching jodo.',
    },
  },
  {
    question: 'How would you design a chat application?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Use WEBSOCKETS for a persistent bidirectional connection rather than polling. A connection registry maps user to the server holding their socket, so a message routes to the right node — with a pub-sub layer such as Redis to deliver across servers. Persist messages in a store partitioned by conversation and ordered by time. Queue messages for offline users and deliver on reconnect. Add delivery receipts, and handle ordering, deduplication, and reconnection explicitly.',
      hinglish:
        'Polling ke bajaye ek sthir bidirectional connection ke liye WEBSOCKETS use karo. Ek connection registry user ko us server pe map karti hai jo uska socket rakhta hai, isliye ek message sahi node pe route hota hai — servers ke across pahunchane ke liye Redis jaisi ek pub-sub layer ke saath. Messages ko conversation se partition aur samay se order kiye ek store mein rakho. Offline users ke liye messages queue karo aur reconnect pe pahuncha do. Delivery receipts jodo, aur ordering, deduplication, aur reconnection explicitly sambhalo.',
    },
  },
  {
    question: 'What is the difference between WebSockets, long polling, and server-sent events?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'LONG POLLING holds an HTTP request open until data arrives, then reconnects — works everywhere but is inefficient and adds latency per cycle. SERVER-SENT EVENTS is a one-way server-to-client stream over plain HTTP with automatic reconnection — ideal for notifications and live updates. WEBSOCKETS provide a full-duplex persistent connection, which is what chat, collaboration, and games need. Choose SSE when the client only receives; WebSockets when it must also send frequently.',
      hinglish:
        'LONG POLLING ek HTTP request ko data aane tak khula rakhta hai, phir dobara judta hai — har jagah kaam karta hai par inefficient hai aur per cycle latency jodta hai. SERVER-SENT EVENTS plain HTTP pe ek taraf ka server-se-client stream hai automatic reconnection ke saath — notifications aur live updates ke liye ideal. WEBSOCKETS ek full-duplex sthir connection dete hain, jo chat, collaboration, aur games ko chahiye. SSE tab chuno jab client sirf receive kare; WebSockets jab use aksar bhejna bhi ho.',
    },
  },
  {
    question: 'What is database indexing and what is its cost?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An index is a sorted structure, usually a B-tree, letting the database find rows without scanning the table — turning O(n) into O(log n). The costs are real: every index consumes storage and must be updated on every insert, update, and delete, so an over-indexed table has slow writes. Index the columns you filter, join, and sort on; a compound index follows the leftmost-prefix rule, so column order is a design decision.',
      hinglish:
        'Ek index ek sorted structure hai, usually ek B-tree, jo database ko table scan kiye bina rows dhoondhne deta hai — O(n) ko O(log n) mein badalte hue. Costs asli hain: har index storage khaata hai aur har insert, update, aur delete pe update hona padta hai, isliye zyada index wali ek table ke writes slow hote hain. Un columns pe index karo jinpe tum filter, join, aur sort karte ho; ek compound index leftmost-prefix rule follow karta hai, isliye column order ek design decision hai.',
    },
  },
  {
    question: 'What is the N+1 query problem?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'One query fetches a list of N items, then a separate query runs for each one to load a relation — 101 round trips for 100 posts and their authors. It is usually invisible in development with ten rows and catastrophic in production. Fixes: a JOIN, an eager-loading option in your ORM, or a batched second query using `WHERE id IN (...)`. In GraphQL, DataLoader batches and deduplicates within a request. Detect it by logging query counts per request.',
      hinglish:
        'Ek query N items ki ek list laati hai, phir har ek ke liye ek relation load karne ko ek alag query chalti hai — 100 posts aur unke authors ke liye 101 round trips. Ye development mein das rows ke saath usually invisible hai aur production mein vinaashkari. Fixes: ek JOIN, tumhare ORM mein ek eager-loading option, ya `WHERE id IN (...)` use karti ek batched doosri query. GraphQL mein, DataLoader ek request ke andar batch aur deduplicate karta hai. Ise per request query counts log karke pakado.',
    },
  },
  {
    question: 'What is a read replica and what problem does it introduce?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A read replica copies the primary database and serves read queries, which scales read-heavy workloads and provides a failover candidate. The problem it introduces is REPLICATION LAG: a user who writes and immediately reads may hit a replica that has not caught up and see their own change missing. Solutions: route read-after-write to the primary, use a sticky session briefly after a write, or design the UI to reflect the change optimistically.',
      hinglish:
        'Ek read replica primary database copy karta hai aur read queries serve karta hai, jo read-heavy workloads scale karta hai aur ek failover candidate deta hai. Jo problem ye laata hai wo REPLICATION LAG hai: ek user jo likh kar turant padhta hai wo ek aise replica pe pahunch sakta hai jo abhi pahuncha nahi aur apna hi change gayab dekhe. Solutions: read-after-write ko primary pe bhejo, ek write ke baad thodi der ek sticky session use karo, ya UI ko change optimistically dikhane ke liye design karo.',
    },
  },
  {
    question: 'What is a circuit breaker?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A circuit breaker monitors calls to a downstream service and, after a threshold of failures, OPENS — failing fast without attempting the call. After a timeout it goes HALF-OPEN, letting a probe through, and closes if it succeeds. The purpose is preventing a cascading failure: without it, every request queues on a dead dependency, exhausting threads and taking down the caller too. Pair it with timeouts, retries with backoff, and a sensible fallback.',
      hinglish:
        'Ek circuit breaker ek downstream service pe calls monitor karta hai aur, failures ki ek threshold ke baad, KHULTA hai — call ki koshish kiye bina turant fail karte hue. Ek timeout ke baad ye HALF-OPEN hota hai, ek probe jaane deta hai, aur safal hone pe band ho jaata hai. Maksad ek cascading failure rokna hai: iske bina, har request ek mari hui dependency pe queue hoti hai, threads khatam karte hue aur caller ko bhi gira deti hai. Ise timeouts, backoff ke saath retries, aur ek samajhdaar fallback ke saath jodo.',
    },
  },
  {
    question: 'What is backpressure and how do you handle it?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Backpressure is the signal a consumer sends when it cannot keep up with a producer. Ignoring it means queues grow without bound until memory is exhausted and the system collapses — worse than degrading gracefully. Handling it: bound queue sizes and reject or shed load beyond them, apply rate limiting upstream, use pull-based consumption so consumers set the pace, scale consumers, or drop lower-priority work. The principle is that a system should degrade predictably rather than fail catastrophically.',
      hinglish:
        'Backpressure wo signal hai jo ek consumer bhejta hai jab wo ek producer ke saath nahi chal paata. Ise ignore karne ka matlab hai queues bina seema badhti hain jab tak memory khatam na ho aur system dhah jaaye — gracefully degrade hone se bura. Ise sambhalna: queue sizes seemit karo aur uske aage load reject ya shed karo, upstream rate limiting lagao, pull-based consumption use karo taaki consumers raftaar tay karein, consumers scale karo, ya kam priority ka kaam giraao. Siddhant ye hai ki ek system vinaashkari roop se fail hone ke bajaye anumaan lagane layak degrade ho.',
    },
  },
  {
    question: 'How do you make a system highly available?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Eliminate single points of failure: run redundant instances across availability zones, replicate data with automatic failover, and put health-checked load balancers in front. Design for graceful degradation so a failed non-critical dependency reduces functionality rather than taking the whole system down. Add timeouts, retries with backoff and jitter, and circuit breakers. Then TEST failure deliberately — chaos engineering exists because untested failover is an assumption, not a capability.',
      hinglish:
        'Single points of failure hatao: availability zones ke across redundant instances chalao, automatic failover ke saath data replicate karo, aur aage health-checked load balancers rakho. Graceful degradation ke liye design karo taaki ek fail hui non-critical dependency poore system ko giraane ke bajaye functionality kam kare. Timeouts, backoff aur jitter ke saath retries, aur circuit breakers jodo. Phir failure ko jaan boojh kar TEST karo — chaos engineering isliye hai kyunki bina test kiya failover ek assumption hai, ek kshamta nahi.',
    },
  },
  {
    question: 'What is the difference between latency and throughput?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'LATENCY is the time for a single request — how fast one thing is. THROUGHPUT is requests handled per unit time — how much work gets done. They are not the same: batching raises throughput while raising latency, and a system can have excellent average latency and terrible throughput. Always report latency as PERCENTILES, not averages: p99 is what your worst-served users experience, and an average hides it completely.',
      hinglish:
        'LATENCY ek single request ka samay hai — ek cheez kitni tez hai. THROUGHPUT per unit time handle hui requests hai — kitna kaam ho raha hai. Wo ek nahi hain: batching throughput badhati hai jabki latency bhi badhati hai, aur ek system ki average latency shaandaar aur throughput bekaar ho sakti hai. Latency hamesha PERCENTILES mein batao, averages mein nahi: p99 wo hai jo tumhare sabse bure serve hue users anubhav karte hain, aur ek average use poori tarah chhupa deta hai.',
    },
  },
  {
    question: 'Why do you measure p99 latency instead of average?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An average is dominated by the bulk of fast requests and hides the tail. If 99% of requests take 50ms and 1% take 10 seconds, the average looks fine while one user in a hundred has a broken experience. At scale that 1% is thousands of people, and because a single page often makes many backend calls, the chance of hitting the slow tail at least once compounds. Set SLOs on p95 and p99, and investigate the tail rather than the mean.',
      hinglish:
        'Ek average tez requests ke thok se haavi hota hai aur poonchh chhupa deta hai. Agar 99% requests 50ms leti hain aur 1% 10 second, average theek dikhta hai jabki sau mein se ek user ka anubhav toota hai. Scale pe wo 1% hazaaron log hain, aur kyunki ek single page aksar bahut backend calls karta hai, slow poonchh se kam se kam ek baar takraane ka mauka jud jaata hai. SLOs p95 aur p99 pe rakho, aur mean ke bajaye poonchh ki jaanch karo.',
    },
  },
  {
    question: 'How do you estimate capacity for a system?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Work from users to load to resources. Take daily active users, multiply by actions per user to get daily requests, divide by 86,400 for average QPS, then multiply by a peak factor of two to ten. Estimate storage as records times average size times retention, plus replication factor. Estimate bandwidth from response size times QPS. Round to convenient numbers — the goal is the right ORDER OF MAGNITUDE, since that is what determines whether one server or a hundred is the answer.',
      hinglish:
        'Users se load se resources tak kaam karo. Daily active users lo, per user actions se multiply karke daily requests paao, average QPS ke liye 86,400 se divide karo, phir do se das ke ek peak factor se multiply karo. Storage ka andaaza records guna average size guna retention, plus replication factor. Bandwidth ka andaaza response size guna QPS. Sahoolat ke numbers pe round karo — lakshya sahi ORDER OF MAGNITUDE hai, kyunki wahi decide karta hai ki jawab ek server hai ya sau.',
    },
  },
  {
    question: 'What is a distributed transaction and why is it avoided?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A distributed transaction spans multiple databases or services and tries to keep them atomic, classically with two-phase commit. It is avoided because it requires every participant to be available for the duration, holds locks across the network, blocks if the coordinator fails at the wrong moment, and scales poorly. Modern designs prefer eventual consistency with sagas and compensating actions, or restructure the data so a single service owns everything a transaction touches.',
      hinglish:
        'Ek distributed transaction multiple databases ya services pe failta hai aur unhe atomic rakhne ki koshish karta hai, classically two-phase commit se. Ise isliye avoid kiya jaata hai kyunki ise har participant ka poore samay available hona chahiye, ye network ke across locks rakhta hai, coordinator galat pal fail hone pe block ho jaata hai, aur kharab scale karta hai. Modern designs sagas aur compensating actions ke saath eventual consistency prefer karte hain, ya data ko aise badalte hain ki ek single service wo sab rakhe jise transaction chhoota hai.',
    },
  },
  {
    question: 'What is event-driven architecture?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Services communicate by emitting EVENTS describing what happened rather than calling each other directly. A producer does not know its consumers, so new consumers can be added without touching it — strong decoupling and natural extensibility. The costs are genuine: eventual consistency, harder end-to-end debugging since no single call stack exists, event ordering and duplicate handling, and schema evolution across producers and consumers that must be managed deliberately.',
      hinglish:
        'Services ek doosre ko seedha call karne ke bajaye kya hua batate EVENTS nikaal kar baat karti hain. Ek producer apne consumers ko nahi jaanta, isliye naye consumers use chhue bina jode ja sakte hain — majboot decoupling aur swabhavik extensibility. Costs asli hain: eventual consistency, mushkil end-to-end debugging kyunki koi single call stack nahi, event ordering aur duplicate handling, aur producers aur consumers ke across schema evolution jise jaan boojh kar manage karna padta hai.',
    },
  },
  {
    question: 'What is CQRS?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Command Query Responsibility Segregation separates the WRITE model from the READ model, so each can be optimised independently — a normalised store for writes and denormalised, pre-joined projections for reads. It suits systems where reads vastly outnumber writes or where read shapes differ sharply from the write shape. The cost is eventual consistency between the two and substantially more moving parts, so it is worth it only when a genuine asymmetry exists.',
      hinglish:
        'Command Query Responsibility Segregation WRITE model ko READ model se alag karta hai, taaki har ek swatantra roop se optimise ho — writes ke liye ek normalised store aur reads ke liye denormalised, pehle se jude projections. Ye un systems ko suit karta hai jahan reads writes se bahut zyada hon ya jahan read shapes write shape se bahut alag hon. Cost dono ke beech eventual consistency aur kaafi zyada chalte hisse hain, isliye ye tabhi worth hai jab ek genuine asymmetry ho.',
    },
  },
  {
    question: 'What is a bloom filter and where is it used?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A bloom filter is a compact probabilistic structure answering "might this element be in the set?" It can return a FALSE POSITIVE but never a false negative, so a negative answer is certain. That is exactly what you want as a cheap pre-check: databases use it to skip reading an SST file that definitely lacks a key, CDNs to avoid caching one-hit items, and crawlers to skip already-seen URLs. It uses a tiny fraction of the memory of a real set.',
      hinglish:
        'Ek bloom filter ek compact probabilistic structure hai jo "kya ye element set mein ho sakta hai?" ka jawab deta hai. Ye ek FALSE POSITIVE de sakta hai par kabhi false negative nahi, isliye ek negative jawab pakka hai. Yahi tum ek saste pre-check ke roop mein chahte ho: databases ise ek aisi SST file padhna skip karne ke liye use karte hain jisme key pakka nahi, CDNs ek-baar wale items cache karne se bachne ke liye, aur crawlers pehle dekhe URLs skip karne ke liye. Ye ek asli set ki memory ka bahut chhota hissa leta hai.',
    },
  },
  {
    question: 'How do you design for failure?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Assume every dependency will fail and every network call will time out. Set explicit timeouts everywhere — an unbounded call is a resource leak waiting to happen. Retry with exponential backoff and JITTER, or synchronised retries create a thundering herd. Add circuit breakers, bulkheads isolating resource pools so one failing dependency cannot consume all threads, and sensible fallbacks such as serving stale cache. Then verify it with deliberate failure injection.',
      hinglish:
        'Maan lo har dependency fail hogi aur har network call timeout hogi. Har jagah explicit timeouts rakho — ek bina seema call ek hone waala resource leak hai. Exponential backoff aur JITTER ke saath retry karo, warna ek saath hoti retries ek thundering herd banati hain. Circuit breakers jodo, resource pools alag karte bulkheads taaki ek fail hoti dependency saare threads na khaaye, aur samajhdaar fallbacks jaise purana cache serve karna. Phir ise jaan boojh kar failure injection se verify karo.',
    },
  },
  {
    question: 'What is the difference between authentication and authorisation?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'AUTHENTICATION establishes WHO you are — verifying a password, a token, a biometric. AUTHORISATION determines WHAT you may do — whether this authenticated user can read this record or call this endpoint. Authentication happens once per session; authorisation must be checked on EVERY request, and checking it only in the UI is the classic vulnerability, since the API is what an attacker actually calls.',
      hinglish:
        'AUTHENTICATION sthapit karta hai ki tum KAUN ho — ek password, ek token, ek biometric verify karke. AUTHORISATION decide karta hai ki tum KYA kar sakte ho — kya ye authenticated user ye record padh sakta hai ya ye endpoint call kar sakta hai. Authentication per session ek baar hota hai; authorisation HAR request pe check hona chahiye, aur ise sirf UI mein check karna classic vulnerability hai, kyunki attacker actually API hi call karta hai.',
    },
  },
  {
    question: 'How do you handle session state in a horizontally scaled system?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Do not keep sessions in server memory — a request routed to a different instance then appears logged out. Options: a SHARED STORE such as Redis, which every instance reads (simple, supports revocation, one more dependency); or STATELESS tokens such as JWTs carrying claims, which need no lookup but cannot be revoked before expiry. Sticky sessions work but break scaling and lose state when an instance dies. Shared Redis is the usual pragmatic answer.',
      hinglish:
        'Sessions ko server memory mein mat rakho — ek doosre instance pe gayi request phir logged out dikhti hai. Options: Redis jaisa ek SHARED STORE, jise har instance padhta hai (simple, revocation support karta hai, ek aur dependency); ya JWTs jaise STATELESS tokens jo claims le jaate hain, jinhe koi lookup nahi chahiye par expiry se pehle revoke nahi kiye ja sakte. Sticky sessions kaam karte hain par scaling todte hain aur ek instance marne pe state kho dete hain. Shared Redis usual vyavaharik jawab hai.',
    },
  },
  {
    question: 'What is the difference between a proxy and a reverse proxy?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A FORWARD proxy sits in front of CLIENTS and acts on their behalf — corporate filtering, anonymity, caching outbound requests. The server sees the proxy, not the client. A REVERSE proxy sits in front of SERVERS and acts on their behalf — load balancing, TLS termination, caching, compression, and hiding the internal topology. The client sees the proxy, not the server. Nginx, HAProxy, and Cloudflare are reverse proxies.',
      hinglish:
        'Ek FORWARD proxy CLIENTS ke aage baithta hai aur unki taraf se kaam karta hai — corporate filtering, gumnaami, outbound requests cache karna. Server proxy dekhta hai, client ko nahi. Ek REVERSE proxy SERVERS ke aage baithta hai aur unki taraf se kaam karta hai — load balancing, TLS termination, caching, compression, aur andar ki topology chhupana. Client proxy dekhta hai, server ko nahi. Nginx, HAProxy, aur Cloudflare reverse proxies hain.',
    },
  },
  {
    question: 'When should you denormalise a database?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Denormalise when reads dominate and joins have become the measured bottleneck — storing a comment count on a post rather than counting rows, or copying a product name into an order line. The trade is duplication: every copy must be kept in sync, and a missed update produces inconsistent data that is hard to detect. So denormalise deliberately, based on profiling rather than assumption, and be explicit about which process owns keeping each copy correct.',
      hinglish:
        'Tab denormalise karo jab reads haavi hon aur joins maapa gaya bottleneck ban gaye hon — ek post pe rows ginne ke bajaye ek comment count rakhna, ya ek product naam ek order line mein copy karna. Trade duplication hai: har copy ko sync mein rakhna padta hai, aur ek chhoota update aisa inconsistent data banata hai jise pakadna mushkil hai. Isliye jaan boojh kar denormalise karo, assumption ke bajaye profiling ke aadhaar pe, aur saaf raho ki har copy ko sahi rakhne ka zimma kis process ka hai.',
    },
  },
  {
    question: 'What is the difference between strong and weak consistency?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'STRONG consistency means every read returns the most recent write — the system behaves as if there were one copy — at the cost of coordination, higher latency, and reduced availability during partitions. WEAK or eventual consistency allows reads to lag, which buys availability and speed. Between them sit useful models: read-your-writes so a user always sees their own change, and monotonic reads so time never appears to move backwards.',
      hinglish:
        'STRONG consistency ka matlab hai har read sabse haal ka write lautaata hai — system aise behave karta hai jaise ek hi copy ho — coordination, zyada latency, aur partitions ke dauraan kam availability ke cost pe. WEAK ya eventual consistency reads ko peeche rehne deti hai, jo availability aur speed khareedti hai. Unke beech useful models baithte hain: read-your-writes taaki ek user hamesha apna change dekhe, aur monotonic reads taaki samay kabhi peeche jaata na lage.',
    },
  },
  {
    question: 'What is a data lake versus a data warehouse?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A DATA WAREHOUSE stores structured, cleaned data in a defined schema for analytics — schema-on-write, expensive but fast to query, and the source for BI reporting. A DATA LAKE stores raw data of any format cheaply — schema-on-read, flexible and suited to machine learning, but it becomes a "data swamp" without governance and cataloguing. The lakehouse pattern combines both, adding warehouse-style transactions and schema over lake storage.',
      hinglish:
        'Ek DATA WAREHOUSE structured, saaf data ko analytics ke liye ek tay schema mein rakhta hai — schema-on-write, mehnga par query karne mein tez, aur BI reporting ka source. Ek DATA LAKE kisi bhi format ka raw data sasta store karta hai — schema-on-read, flexible aur machine learning ke liye upyukt, par governance aur cataloguing ke bina ye ek "data swamp" ban jaata hai. Lakehouse pattern dono ko jodta hai, lake storage pe warehouse-jaise transactions aur schema jodte hue.',
    },
  },
  {
    question: 'What trade-offs would you discuss when designing any system?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Consistency versus availability. Latency versus throughput. Simplicity versus flexibility. Cost versus performance. Read optimisation versus write optimisation. Normalisation versus denormalisation. Build versus buy. The mark of a strong answer is not choosing the "best" option but naming the trade explicitly, tying it to the stated requirements, and stating what you would measure to know whether the choice was right — and what would make you revisit it.',
      hinglish:
        'Consistency versus availability. Latency versus throughput. Simplicity versus flexibility. Cost versus performance. Read optimisation versus write optimisation. Normalisation versus denormalisation. Build versus buy. Ek majboot jawab ki pehchaan "sabse achha" option chunna nahi hai balki trade ko explicitly naam dena, use batayi gayi requirements se jodna, aur ye batana ki tum kya maapoge ye jaanne ke liye ki choice sahi thi — aur kya tumhe use dobara dekhne pe majboor karega.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
