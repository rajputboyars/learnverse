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
