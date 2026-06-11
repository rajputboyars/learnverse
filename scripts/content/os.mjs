// Operating Systems curriculum — CS fundamentals.
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
  title: 'Operating Systems',
  slug: 'os',
  description:
    'OS fundamentals — processes vs threads, CPU scheduling, memory & virtual memory, deadlocks aur synchronization. Interview-ready, English + Hinglish, desi examples ke saath.',
  icon: '💻',
  tags: ['operating-systems', 'cs-fundamentals', 'interview', 'concurrency'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 22,
};

const beginner = [
  {
    title: 'OS Basics',
    level: 'beginner',
    description: 'OS kya hai, process vs thread.',
    concepts: [
      {
        title: 'What is an Operating System',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'An Operating System (OS) is software that manages hardware and provides services to programs. It sits between applications and hardware, handling process management, memory, file systems, devices, and security. It acts as a resource manager (sharing CPU, memory, disk fairly) and provides abstractions (files, processes) so apps do not deal with raw hardware. Examples: Windows, Linux, macOS, Android.',
          hinglish:
            'Operating System (OS) ek software hai jo hardware manage karta hai aur programs ko services deta hai. Ye applications aur hardware ke beech baithta hai, process management, memory, file systems, devices, aur security handle karta hai. Ye ek resource manager hai (CPU, memory, disk fairly share karta hai) aur abstractions (files, processes) deta hai taaki apps ko raw hardware se na deal karna pade. Examples: Windows, Linux, macOS, Android.',
        },
        dailyLifeExample:
          'OS ek building ke manager jaisa hai — bijli, paani, lift (resources) sab tenants (programs) ke beech fairly baant ta hai, aur har ek ko direct machinery chalane nahi deta.',
        codeExample:
          '// Layers:\n//   Applications  (your programs)\n//        |  system calls (open, read, write...)\n//   Operating System  (manages everything)\n//        |\n//   Hardware (CPU, RAM, disk, devices)',
        keyPoints: [
          'Manages hardware + provides services',
          'Resource manager (CPU, memory, disk)',
          'Provides abstractions (files, processes)',
          'Apps talk to it via system calls',
        ],
        quiz: [
          {
            question: 'An OS sits between…',
            options: ['users and the internet', 'applications and hardware', 'two databases', 'CSS and HTML'],
            correctIndex: 1,
          },
          {
            question: 'Programs request OS services via…',
            options: ['system calls', 'CSS', 'SQL', 'HTML tags'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Process vs Thread',
        difficulty: 'medium',
        tags: ['process', 'thread'],
        explanation: {
          english:
            'A process is a program in execution with its own memory space (code, data, heap, stack). A thread is the smallest unit of execution within a process; multiple threads in one process share the same memory but have their own stack. Threads are lighter and communicate easily (shared memory) but a bug in one can crash the process; processes are isolated and safer but heavier to create and communicate (IPC).',
          hinglish:
            'Process ek program in execution hai apni memory space (code, data, heap, stack) ke saath. Thread ek process ke andar execution ka smallest unit hai; ek process mein kai threads same memory share karte hain par apna stack rakhte hain. Threads halke hain aur aasaani se communicate karte hain (shared memory) par ek mein bug poore process ko crash kar sakta hai; processes isolated aur safer hain par banana aur communicate (IPC) bhaari.',
        },
        dailyLifeExample:
          'Process ek poori company jaisa hai (apna office, resources). Threads us company ke employees jaise hain — same office (memory) share karte hain par alag-alag kaam karte hain.',
        codeExample:
          '// Process: own memory (isolated)\n//   Thread A ─┐\n//   Thread B ─┤ share the process memory\n//   Thread C ─┘ (but each has its own stack)\n//\n// Threads: light, shared memory, easy comms\n// Processes: isolated, safer, heavier (need IPC)',
        keyPoints: [
          'Process: program in execution, own memory',
          'Thread: unit of execution inside a process',
          'Threads share memory, own stack',
          'Threads light/shared; processes isolated/safe',
        ],
        quiz: [
          {
            question: 'Threads within a process share…',
            options: ['nothing', 'the same memory (heap/data)', 'separate machines', 'the CPU only'],
            correctIndex: 1,
          },
          {
            question: 'Which is more isolated/safer but heavier?',
            options: ['thread', 'process', 'both equal', 'neither'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a process and a thread?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'A process is an independent program in execution with its own isolated memory space, file handles, and resources. A thread is a lightweight unit of execution within a process; threads of the same process share its memory (code, data, heap) but each has its own stack and registers. Threads are cheaper to create and switch and communicate via shared memory, but lack isolation — one misbehaving thread can crash the whole process. Processes are isolated (safer) but heavier and need inter-process communication (IPC) to talk.',
              hinglish:
                'Process ek independent program in execution hai apni isolated memory space, file handles, aur resources ke saath. Thread ek process ke andar lightweight execution unit hai; same process ke threads uski memory (code, data, heap) share karte hain par har ek ka apna stack aur registers. Threads banane aur switch karne mein saste hain aur shared memory se communicate karte hain, par isolation nahi — ek galat thread poore process ko crash kar sakta hai. Processes isolated (safer) par bhaari aur IPC se baat karte hain.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Scheduling & Memory',
    level: 'intermediate',
    description: 'CPU scheduling aur memory management.',
    concepts: [
      {
        title: 'CPU Scheduling',
        difficulty: 'medium',
        tags: ['scheduling'],
        explanation: {
          english:
            'CPU scheduling decides which ready process runs next on a CPU, maximising utilisation and fairness. Common algorithms: FCFS (First Come First Served — simple but causes the convoy effect), SJF (Shortest Job First — optimal average wait but needs job length), Round Robin (each gets a time quantum — fair, good for time-sharing), and Priority scheduling (highest priority first, risks starvation). Preemptive schedulers can interrupt a running process; non-preemptive cannot.',
          hinglish:
            'CPU scheduling decide karta hai kaunsa ready process agla CPU pe chale, utilisation aur fairness maximise karke. Common algorithms: FCFS (First Come First Served — simple par convoy effect), SJF (Shortest Job First — optimal average wait par job length chahiye), Round Robin (har ek ko time quantum — fair, time-sharing ke liye achha), aur Priority scheduling (highest priority pehle, starvation ka risk). Preemptive schedulers running process ko interrupt kar sakte hain; non-preemptive nahi.',
        },
        dailyLifeExample:
          'Round Robin bank mein har customer ko fixed 5 min dene jaisa hai — koi atak na jaaye. FCFS pure line mein pehle aaya pehle, par aage ek lamba kaam wala sabko rok deta hai (convoy effect).',
        codeExample:
          '// FCFS: run in arrival order (convoy effect)\n// SJF:  run shortest job first (best avg wait)\n// Round Robin: each process gets a time quantum, then rotate\n// Priority: highest priority first (can starve low priority)\n// Preemptive = can interrupt; Non-preemptive = cannot',
        keyPoints: [
          'Decides which ready process runs next',
          'FCFS (convoy effect), SJF (best avg wait)',
          'Round Robin (time quantum, fair)',
          'Priority (can starve); preemptive vs non-preemptive',
        ],
        quiz: [
          {
            question: 'Which algorithm gives the lowest average waiting time?',
            options: ['FCFS', 'Shortest Job First (SJF)', 'random', 'priority'],
            correctIndex: 1,
          },
          {
            question: 'Round Robin gives each process a…',
            options: ['priority number', 'fixed time quantum', 'whole CPU forever', 'memory page'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Memory Management & Paging',
        difficulty: 'hard',
        tags: ['memory', 'paging'],
        explanation: {
          english:
            'The OS manages RAM among processes. Paging splits memory into fixed-size pages (and physical memory into frames); a page table maps a process\'s virtual pages to physical frames, eliminating external fragmentation and enabling non-contiguous allocation. The CPU translates virtual addresses to physical ones via the page table (cached in the TLB for speed). Segmentation is an alternative that splits memory by logical units (code, stack, data).',
          hinglish:
            'OS RAM ko processes ke beech manage karta hai. Paging memory ko fixed-size pages (aur physical memory ko frames) mein baant ta hai; ek page table process ke virtual pages ko physical frames se map karta hai, external fragmentation hata kar non-contiguous allocation possible karta hai. CPU virtual addresses ko page table se physical mein translate karta hai (speed ke liye TLB mein cached). Segmentation ek alternative hai jo memory ko logical units (code, stack, data) se baant ta hai.',
        },
        dailyLifeExample:
          'Paging ek hostel mein students ko alag-alag kamre (frames) dene jaisa hai — zaroori nahi ek saath ho, ek register (page table) batata hai kaun kis kamre mein.',
        codeExample:
          '// Virtual address -> [ page number | offset ]\n//   page table: page number -> frame number\n//   physical address = frame * pageSize + offset\n// TLB caches recent translations for speed.\n// Paging removes external fragmentation.',
        keyPoints: [
          'Paging: fixed-size pages <-> frames',
          'Page table maps virtual -> physical',
          'Removes external fragmentation',
          'TLB caches translations for speed',
        ],
        quiz: [
          {
            question: 'Paging removes which problem?',
            options: ['deadlock', 'external fragmentation', 'starvation', 'race conditions'],
            correctIndex: 1,
          },
          {
            question: 'A page table maps…',
            options: ['frames to disk', 'virtual pages to physical frames', 'processes to threads', 'files to folders'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Virtual Memory',
        difficulty: 'medium',
        tags: ['virtual-memory'],
        explanation: {
          english:
            'Virtual memory lets a process use more memory than physically available by keeping only the actively-used pages in RAM and the rest on disk (swap). When a process accesses a page not in RAM, a page fault occurs and the OS loads it from disk, possibly evicting another page (using a replacement policy like LRU). It gives each process a large, private address space and isolation, but excessive paging ("thrashing") destroys performance.',
          hinglish:
            'Virtual memory ek process ko physically available se zyada memory use karne deti hai — sirf actively-used pages RAM mein, baaki disk pe (swap). Jab process aisi page access kare jo RAM mein nahi, page fault hota hai aur OS use disk se load karta hai, shayad doosri page evict karke (LRU jaisi replacement policy se). Ye har process ko bada, private address space aur isolation deta hai, par zyada paging ("thrashing") performance barbaad kar deti hai.',
        },
        dailyLifeExample:
          'Virtual memory ek chhoti desk + bada cupboard jaisa hai — abhi jis file pe kaam ho wo desk (RAM) pe, baaki cupboard (disk) mein. Zaroorat ho to swap. Baar-baar swap (thrashing) = kaam slow.',
        codeExample:
          '// Process accesses page not in RAM -> PAGE FAULT\n//   OS loads it from disk (swap)\n//   may evict another page (LRU / FIFO / Optimal)\n// Too many faults = THRASHING (severe slowdown)',
        keyPoints: [
          'Use more memory than physical RAM (swap on disk)',
          'Page fault loads a missing page from disk',
          'Replacement policies: LRU, FIFO, Optimal',
          'Excessive paging = thrashing (slow)',
        ],
        quiz: [
          {
            question: 'A page fault happens when…',
            options: ['the CPU overheats', 'an accessed page is not in RAM', 'the disk is full', 'a process ends'],
            correctIndex: 1,
          },
          {
            question: 'Excessive paging is called…',
            options: ['deadlock', 'thrashing', 'starvation', 'fragmentation'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Concurrency',
    level: 'advanced',
    description: 'Deadlock aur synchronization.',
    concepts: [
      {
        title: 'Deadlock',
        difficulty: 'hard',
        tags: ['deadlock', 'concurrency'],
        explanation: {
          english:
            'A deadlock is when two or more processes are stuck forever, each waiting for a resource the other holds. It needs four conditions simultaneously (Coffman conditions): mutual exclusion, hold and wait, no preemption, and circular wait. Strategies: prevention (break one condition), avoidance (Banker\'s algorithm), detection and recovery, or simply ignore it (the "ostrich" approach used by many OSes since deadlocks are rare).',
          hinglish:
            'Deadlock tab hai jab do ya zyada processes hamesha ke liye atak jaayein, har ek us resource ka wait kare jo doosra hold kiye hai. Iske liye chaar conditions ek saath chahiye (Coffman conditions): mutual exclusion, hold and wait, no preemption, aur circular wait. Strategies: prevention (ek condition todho), avoidance (Banker\'s algorithm), detection and recovery, ya bas ignore (the "ostrich" approach jo bahut OSes use karte hain kyunki deadlocks rare hain).',
        },
        dailyLifeExample:
          'Deadlock ek single-lane bridge pe do gaadiyan aamne-saamne fas jaane jaisa hai — dono peeche hatne ko taiyaar nahi, dono atke. Circular wait.',
        codeExample:
          '// Coffman conditions (ALL four needed):\n// 1. Mutual exclusion (resource held by one)\n// 2. Hold and wait\n// 3. No preemption\n// 4. Circular wait\n// Break any one -> no deadlock.',
        keyPoints: [
          'Processes wait forever for each other\'s resources',
          '4 Coffman conditions (all needed)',
          'Handle: prevent, avoid, detect+recover, or ignore',
          'Break one condition to prevent it',
        ],
        quiz: [
          {
            question: 'How many Coffman conditions must hold for a deadlock?',
            options: ['2', '3', '4', '5'],
            correctIndex: 2,
          },
          {
            question: 'Two cars stuck head-to-head on a one-lane bridge is an example of…',
            options: ['starvation', 'deadlock (circular wait)', 'thrashing', 'paging'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What are the necessary conditions for a deadlock and how can you prevent it?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'A deadlock requires all four Coffman conditions at once: mutual exclusion (a resource is held exclusively), hold and wait (a process holds resources while waiting for more), no preemption (resources cannot be forcibly taken), and circular wait (a cycle of processes each waiting on the next). To prevent it, break any one: allow sharing where possible, require requesting all resources upfront (no hold-and-wait), allow preemption, or impose a global ordering on resources to eliminate circular wait. Alternatives are avoidance (Banker\'s algorithm) and detection+recovery.',
              hinglish:
                'Deadlock ke liye chaaron Coffman conditions ek saath chahiye: mutual exclusion (resource exclusively held), hold and wait (process resources hold karke aur ka wait kare), no preemption (resources zabardasti na liye ja sakein), aur circular wait (processes ka cycle har ek agle ka wait kare). Rokne ke liye koi ek todho: jahan possible ho sharing allow karo, saare resources pehle hi maango (no hold-and-wait), preemption allow karo, ya resources pe global ordering lagao taaki circular wait na ho. Alternatives: avoidance (Banker\'s algorithm) aur detection+recovery.',
            },
          },
        ],
      },
      {
        title: 'Process Synchronization (Mutex & Semaphore)',
        difficulty: 'hard',
        tags: ['synchronization', 'mutex', 'semaphore'],
        explanation: {
          english:
            'When multiple threads access shared data, a race condition can corrupt it. The critical section is the code that touches shared data; it must run with mutual exclusion. A mutex (lock) allows only one thread in at a time (lock/unlock). A semaphore is a counter allowing up to N threads (useful for limited resources, e.g. a pool of 5 connections). A binary semaphore (count 1) acts like a mutex. These primitives coordinate threads safely.',
          hinglish:
            'Jab kai threads shared data access karein, ek race condition use corrupt kar sakti hai. Critical section wo code hai jo shared data ko touch karta hai; ise mutual exclusion ke saath chalna chahiye. Mutex (lock) ek time pe sirf ek thread ko andar deta hai (lock/unlock). Semaphore ek counter hai jo N threads tak allow karta hai (limited resources ke liye useful, jaise 5 connections ka pool). Binary semaphore (count 1) mutex jaisa kaam karta hai. Ye primitives threads ko safely coordinate karte hain.',
        },
        dailyLifeExample:
          'Mutex ek single washroom ki chaabi jaisa hai — ek time pe ek hi banda. Semaphore ek parking lot jaisa hai jisme 5 jagah — 5 gaadiyan andar, 6vi wait kare.',
        codeExample:
          '// Race condition (bad):\n//   balance += 100   // two threads -> lost update\n//\n// Mutex (only one at a time):\n//   lock(); balance += 100; unlock();\n//\n// Semaphore (up to N): permits = 5\n//   wait(); useConnection(); signal();',
        keyPoints: [
          'Race condition corrupts shared data',
          'Critical section needs mutual exclusion',
          'Mutex: one thread at a time (lock/unlock)',
          'Semaphore: up to N threads (counter)',
        ],
        quiz: [
          {
            question: 'A mutex allows how many threads in the critical section?',
            options: ['unlimited', 'exactly one at a time', 'two', 'N'],
            correctIndex: 1,
          },
          {
            question: 'A semaphore is essentially a…',
            options: ['boolean only', 'counter allowing up to N threads', 'memory page', 'scheduler'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is a context switch and why is it expensive?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A context switch is when the CPU stops running one process/thread and starts another. The OS must save the current task\'s state (registers, program counter, stack pointer) and load the next task\'s saved state. It is expensive because it is pure overhead — no useful work happens during the switch — and it also pollutes CPU caches and the TLB, causing more misses afterward. Too many context switches (e.g. tiny time quanta or excessive threads) hurt performance.',
      hinglish:
        'Context switch tab hai jab CPU ek process/thread chalana band karke doosra shuru karta hai. OS ko current task ki state (registers, program counter, stack pointer) save karke next task ki saved state load karni padti hai. Ye mehnga hai kyunki pure overhead hai — switch ke dauraan koi useful kaam nahi hota — aur ye CPU caches aur TLB ko bhi pollute kar deta hai, jisse baad mein zyada misses. Bahut zyada context switches (chhote time quanta ya zyada threads) performance kharab karte hain.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
