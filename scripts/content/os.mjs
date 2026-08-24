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
  icon: 'code',
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
          {
            question: 'Which of these is NOT typically a job of the OS?',
            options: ['Managing memory', 'Managing processes', 'Deciding your app\'s business logic', 'Managing files and devices'],
            correctIndex: 2,
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
          {
            question: 'What does each thread within a process have that is NOT shared with other threads?',
            options: ['The heap', 'Global variables', 'Its own stack and registers', 'The code segment'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a process and a thread?',
            difficulty: 'medium',
            frequency: 'common',
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
          {
            question: 'What is a risk of pure Priority scheduling?',
            options: ['It is always the fastest', 'Low-priority processes can starve (never get to run)', 'It needs no CPU', 'It only works with one process'],
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
          {
            question: 'What does the TLB (Translation Lookaside Buffer) do?',
            options: ['Stores files permanently', 'Caches recent virtual-to-physical address translations for speed', 'Schedules processes', 'Detects deadlocks'],
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
          {
            question: 'What is the LRU (Least Recently Used) page replacement policy?',
            options: [
              'It evicts a random page',
              'It evicts the page that has not been used for the longest time',
              'It evicts the most recently used page',
              'It never evicts any page',
            ],
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
          {
            question: 'Which strategy uses the Banker\'s algorithm?',
            options: ['Deadlock detection only', 'Deadlock avoidance', 'Ignoring deadlocks', 'CPU scheduling'],
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
          {
            question: 'A binary semaphore (count 1) behaves most like a…',
            options: ['round robin scheduler', 'mutex', 'page table', 'deadlock'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Inter-Process Communication (IPC)',
        difficulty: 'medium',
        tags: ['ipc', 'pipes', 'shared-memory', 'message-queues'],
        explanation: {
          english:
            "Processes are isolated from each other by design (each has its own memory space) — but sometimes they need to cooperate and exchange data. **Inter-Process Communication (IPC)** is the set of mechanisms the OS provides for this:\n\n- **Pipes** — a one-way (or two-way with two pipes) byte stream between related processes (e.g. a parent and its child), commonly used to chain commands (`ls | grep`)\n- **Message queues** — the OS maintains a queue of discrete messages; processes can send/receive without both being active at the same instant\n- **Shared memory** — the OS maps the SAME physical memory region into multiple processes' address spaces; this is the FASTEST IPC method (no copying, no kernel involvement after setup) but requires manual synchronization (mutex/semaphore) since multiple processes can write simultaneously\n- **Sockets** — like pipes but work across a network, not just on one machine, making them the basis for client-server communication\n\nChoosing an IPC mechanism is a tradeoff between speed, simplicity, and whether processes are on the same machine.",
          hinglish:
            "Processes design se ek doosre se isolated hote hain (har ek ki apni memory space) — par kabhi-kabhi unhe cooperate karke data exchange karna hota hai. **Inter-Process Communication (IPC)** wo mechanisms hain jo OS iske liye deta hai:\n\n- **Pipes** — related processes (jaise parent aur uska child) ke beech ek one-way (ya do pipes se two-way) byte stream, commonly commands chain karne ke liye use hota hai (`ls | grep`)\n- **Message queues** — OS discrete messages ki ek queue maintain karta hai; processes send/receive kar sakte hain bina dono ek hi instant pe active hue\n- **Shared memory** — OS SAME physical memory region ko multiple processes ke address spaces mein map karta hai; ye FASTEST IPC method hai (no copying, setup ke baad kernel involvement nahi) par manual synchronization (mutex/semaphore) chahiye kyunki multiple processes simultaneously likh sakte hain\n- **Sockets** — pipes jaise hi par network ke across kaam karte hain, sirf ek machine pe nahi, isliye client-server communication ka base hain\n\nEk IPC mechanism choose karna speed, simplicity, aur processes same machine pe hain ya nahi, in sabka tradeoff hai.",
        },
        dailyLifeExample:
          "Pipes waise hain jaise ek assembly line — ek worker ka output seedha agle ko jaata hai. Message queues waise hain jaise ek letterbox — tum letter daal do, receiver jab free ho tab check kare. Shared memory waise hai jaise ek shared whiteboard jo sab dekh aur likh sakte hain — fastest, par sabko turns lene ka rule (synchronization) chahiye taaki overwrite na ho.",
        codeExample:
          "// Shell pipe: process A's stdout -> process B's stdin\n// $ ls | grep '.txt'\n\n// Shared memory (conceptual, POSIX-style)\n// shm_open(\"/my_shm\", ...)      // create/open shared region\n// mmap(...)                      // map it into this process's address space\n// // both processes now read/write the SAME physical memory\n// // MUST use a mutex/semaphore to avoid corrupting it\n\n// Message queue (conceptual)\n// msgsnd(queue_id, message, ...)  // process A sends\n// msgrcv(queue_id, buffer, ...)   // process B receives, whenever ready",
        keyPoints: [
          'IPC lets isolated processes cooperate and exchange data',
          'Pipes: one-way byte stream, typically between related processes',
          'Message queues: discrete messages, sender/receiver need not be active simultaneously',
          'Shared memory: fastest IPC (same physical memory mapped into multiple processes) but needs manual synchronization',
          'Sockets: like pipes but work across a network, basis for client-server communication',
        ],
        quiz: [
          {
            question: 'Why do processes need IPC mechanisms at all?',
            options: [
              'They do not, processes automatically share everything',
              'Processes are isolated by design (separate memory spaces), so IPC provides controlled ways to cooperate/exchange data',
              'IPC is only used by the OS itself, never by user programs',
              'IPC replaces the need for threads',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why is shared memory the fastest IPC mechanism?',
            options: [
              'It uses the network',
              'The same physical memory is mapped into multiple processes, avoiding data copying or kernel involvement after setup',
              'It does not require any synchronization ever',
              'It only works for a single process',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is a key downside of using shared memory for IPC?',
            options: [
              'It is too slow',
              'It requires manual synchronization (like a mutex) since multiple processes can write simultaneously and corrupt data',
              'It cannot be used by any OS',
              'It only works over a network',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'File Systems: Organizing Data on Disk',
        difficulty: 'medium',
        tags: ['file-systems', 'inode', 'disk'],
        explanation: {
          english:
            "A **file system** is how the OS organises, names, and stores files persistently on disk (or SSD) so they survive a reboot — unlike RAM, which is wiped. It provides the abstraction of files and directories on top of raw disk blocks.\n\nKey concepts: an **inode** (index node) stores a file's metadata — size, permissions, owner, timestamps, and pointers to the actual data blocks on disk — separately from the filename (the directory just maps names to inode numbers). This is why you can have hard links (multiple names pointing to the same inode) and why renaming a file is instant (only the directory entry changes, not the data).\n\n**Free space management** tracks which disk blocks are unused (via a bitmap or free list) so new files know where to go. Common file systems: **ext4** (Linux), **NTFS** (Windows), **APFS** (macOS) — each with different tradeoffs in journaling (crash recovery), max file size, and permissions models.",
          hinglish:
            "Ek **file system** wo tareeka hai jisse OS files ko disk (ya SSD) pe organise, naam, aur persistently store karta hai taaki wo reboot ke baad bhi bachi rahein — RAM ke ulat, jo wipe ho jaati hai. Ye raw disk blocks ke upar files aur directories ka abstraction deta hai.\n\nKey concepts: ek **inode** (index node) ek file ka metadata store karta hai — size, permissions, owner, timestamps, aur disk pe actual data blocks ke pointers — filename se alag (directory sirf names ko inode numbers se map karti hai). Isiliye hard links possible hain (multiple names ek hi inode ko point karte hain) aur file rename instant hoti hai (sirf directory entry badalti hai, data nahi).\n\n**Free space management** track karta hai kaunse disk blocks unused hain (ek bitmap ya free list se) taaki nayi files ko pata ho kahan jaana hai. Common file systems: **ext4** (Linux), **NTFS** (Windows), **APFS** (macOS) — har ek journaling (crash recovery), max file size, aur permissions models mein alag tradeoffs ke saath.",
        },
        dailyLifeExample:
          "Ek file system waise hai jaise ek library ka catalog system — har kitaab (data) ka ek unique index card (inode) hota hai jisme kitaab ki details aur shelf location hoti hai, aur library ke sections (directories) sirf catalog card numbers ko point karte hain. Isiliye ek kitaab ko category badalna (rename/move) sirf catalog card update karna hai, poori kitaab ko physically move karna nahi.",
        codeExample:
          "// Directory entry -> inode number -> inode (metadata + data block pointers)\n//\n// $ ls -i myfile.txt\n// 123456 myfile.txt      <- 123456 is the inode number\n//\n// Hard link: another directory entry pointing to the SAME inode\n// $ ln myfile.txt myfile_alias.txt   // both names, same inode 123456\n//\n// Renaming is fast: only updates the directory entry -> inode mapping,\n// the actual data blocks never move.",
        keyPoints: [
          'A file system organises and persists files/directories on disk, surviving reboots',
          'An inode stores a file\'s metadata and data-block pointers, separate from its filename',
          'Directories just map names to inode numbers — renaming only changes this mapping, not the data',
          'Free space management (bitmap/free list) tracks which disk blocks are available',
          'Common file systems: ext4 (Linux), NTFS (Windows), APFS (macOS)',
        ],
        quiz: [
          {
            question: 'What does an inode store?',
            options: [
              'Only the filename',
              "A file's metadata (size, permissions, timestamps) and pointers to its data blocks on disk",
              'The CPU scheduler state',
              'Network socket information',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why is renaming a file typically a fast operation?',
            options: [
              'The OS actually copies all the file data to a new location',
              'Only the directory entry (name -> inode mapping) is updated; the data blocks never move',
              'Renaming is always slow regardless of file system',
              'The file is deleted and recreated',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why does data in a file system survive a system reboot, unlike data in RAM?',
            options: [
              'It does not survive; file systems also lose data on reboot',
              'File systems persist data on non-volatile storage (disk/SSD), while RAM is volatile and cleared on power loss',
              'RAM is actually slower than disk',
              'Reboots never clear any memory',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Disk Scheduling Algorithms',
        difficulty: 'hard',
        tags: ['disk-scheduling', 'io', 'seek-time'],
        explanation: {
          english:
            "When multiple processes request disk I/O at once, the OS must decide the ORDER to service them — this matters because moving a mechanical disk's read/write head (seek time) is slow, and a bad order wastes huge amounts of time. (This matters less for SSDs, which have no moving head, but the algorithms are still foundational OS knowledge.)\n\n**FCFS (First Come First Served)**: service requests in arrival order — simple but can cause the head to zigzag wildly across the disk.\n**SSTF (Shortest Seek Time First)**: always service the closest pending request — reduces total seek time but can starve requests far from the current head position.\n**SCAN ('elevator algorithm')**: the head moves in one direction, servicing all requests along the way, until it hits the end, then reverses — like a lift stopping at every floor going up, then coming back down. Fairer than SSTF, no starvation.\n**C-SCAN (Circular SCAN)**: like SCAN, but instead of reversing at the end, it jumps back to the start and scans in the same direction again — gives more uniform wait times.",
          hinglish:
            "Jab multiple processes ek saath disk I/O request karein, OS ko decide karna padta hai kis ORDER mein service karein — ye matter karta hai kyunki mechanical disk ke read/write head ko move karna (seek time) slow hai, aur galat order bahut time waste karta hai. (SSDs ke liye ye kam matter karta hai, jinme moving head nahi hota, par ye algorithms abhi bhi foundational OS knowledge hain.)\n\n**FCFS (First Come First Served)**: requests ko arrival order mein service karo — simple par head ko disk ke across wildly zigzag karwa sakta hai.\n**SSTF (Shortest Seek Time First)**: hamesha sabse najdeek pending request service karo — total seek time kam karta hai par current head position se door requests ko starve kar sakta hai.\n**SCAN ('elevator algorithm')**: head ek direction mein move karta hai, raaste ke saare requests service karte hue, jab tak end na aa jaaye, phir reverse — ek lift jaisa jo upar jaate hue har floor pe rukta hai, phir neeche aata hai. SSTF se zyada fair, koi starvation nahi.\n**C-SCAN (Circular SCAN)**: SCAN jaisa, par end pe reverse karne ke bajaye, wapas start pe jump karke same direction mein phir scan karta hai — zyada uniform wait times deta hai.",
        },
        dailyLifeExample:
          "SCAN algorithm waise hai jaise ek lift jo bas ek direction mein chalti hai (upar), har floor pe jo bhi wait kar raha hai use pick karti hai, top pe pahunch ke phir neeche aati hai — bina beech mein random floors ke beech udhar-idhar bhaage. FCFS waise hai jaise lift requests ko bilkul jis order mein aayin, usi order mein serve kare, chahe upar-neeche kitna bhi bhaagna pade.",
        codeExample:
          "// Disk requests (cylinder/track numbers), head starts at 50:\n// requests = [95, 180, 34, 119, 11, 123, 62, 64]\n//\n// FCFS: service in given order (lots of back-and-forth)\n// SSTF: always pick nearest remaining request to current head\n// SCAN: move in one direction (e.g. increasing), service all,\n//       hit the end, reverse and service the rest\n// C-SCAN: move in one direction, service all, jump back to start,\n//         scan the same direction again (no reverse sweep)",
        keyPoints: [
          'Disk scheduling decides the order to service pending disk I/O requests',
          'FCFS: arrival order, simple but can cause long, wasteful head movement',
          'SSTF: nearest request first, minimises seek time but can starve far-away requests',
          'SCAN ("elevator"): sweeps in one direction servicing all requests, then reverses — no starvation',
          'C-SCAN: like SCAN but jumps back to start instead of reversing, giving more uniform wait times',
        ],
        quiz: [
          {
            question: 'Why does disk scheduling order matter for mechanical (spinning) disks?',
            options: [
              'It does not matter at all',
              "Moving the read/write head (seek time) is slow, so a poor order wastes significant time",
              'It only affects file names',
              'It changes the CPU scheduling algorithm',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is a downside of SSTF (Shortest Seek Time First)?',
            options: [
              'It is always the slowest algorithm',
              'Requests far from the current head position can be starved, waiting indefinitely',
              'It cannot be implemented',
              'It only works with SSDs',
            ],
            correctIndex: 1,
          },
          {
            question: 'How does the SCAN ("elevator") algorithm avoid starvation?',
            options: [
              'It services requests in random order',
              'It sweeps in one direction servicing every request along the way before reversing, so no request waits forever',
              'It ignores far-away requests permanently',
              'It only services the first request it receives',
            ],
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

  // ─── OS Fundamentals ───────────────────────────────────────────
  {
    question: 'What are the main functions of an operating system?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Five core responsibilities. PROCESS management: creating, scheduling, and terminating processes. MEMORY management: allocating RAM, virtual memory, and protecting one process from another. FILE SYSTEM management: organising, storing, and controlling access to data on disk. DEVICE management: driving hardware through drivers and handling I/O. SECURITY and protection: users, permissions, and isolation. Above all it provides ABSTRACTION — programs work with files and processes rather than disk sectors and interrupt vectors.',
      hinglish:
        'Paanch core responsibilities. PROCESS management: processes create, schedule, aur terminate karna. MEMORY management: RAM allocate karna, virtual memory, aur ek process ko doosre se protect karna. FILE SYSTEM management: disk pe data organise, store, aur uska access control karna. DEVICE management: drivers ke through hardware chalana aur I/O handle karna. SECURITY aur protection: users, permissions, aur isolation. Sabse badhkar ye ABSTRACTION deta hai — programs disk sectors aur interrupt vectors ke bajaye files aur processes ke saath kaam karte hain.',
    },
  },
  {
    question: 'What is a system call and how is it different from a normal function call?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A system call is how a user program requests a service from the kernel — opening a file, allocating memory, creating a process. Unlike a normal function call, which stays in user space, a system call triggers a controlled switch into KERNEL MODE via a special trap instruction, executes the privileged operation, then switches back. That mode switch is why system calls are far more expensive than ordinary calls, and it is deliberate: it is the security boundary preventing a user program from directly touching hardware.',
      hinglish:
        'Ek system call wo tareeka hai jisse ek user program kernel se ek service maangta hai — ek file kholna, memory allocate karna, ek process banana. Ek normal function call ke ulat, jo user space mein hi rehti hai, ek system call ek special trap instruction se KERNEL MODE mein ek controlled switch trigger karti hai, privileged operation execute karti hai, phir wapas switch karti hai. Wahi mode switch system calls ko ordinary calls se bahut mehnga banata hai, aur ye deliberate hai: ye wo security boundary hai jo ek user program ko directly hardware chhune se rokti hai.',
    },
  },
  {
    question: 'What is the difference between kernel mode and user mode?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'They are CPU privilege levels enforced in hardware. In KERNEL mode, code can execute any instruction and access any memory or device — this is where the OS kernel runs. In USER mode, privileged instructions and direct hardware/memory access are forbidden; an attempt traps to the kernel. This separation is what makes an OS robust: a buggy or malicious application can crash only itself, not the whole machine, because it physically cannot reach another process\'s memory or the hardware.',
      hinglish:
        'Ye CPU privilege levels hain jo hardware mein enforce hote hain. KERNEL mode mein, code koi bhi instruction execute kar sakta hai aur koi bhi memory ya device access kar sakta hai — yahan OS kernel chalta hai. USER mode mein, privileged instructions aur direct hardware/memory access forbidden hain; ek koshish kernel ko trap karti hai. Yahi separation ek OS ko robust banata hai: ek buggy ya malicious application sirf khud ko crash kar sakti hai, poori machine ko nahi, kyunki wo physically doosre process ki memory ya hardware tak pahunch hi nahi sakti.',
    },
  },
  {
    question: 'What are the states in a process lifecycle?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'NEW: being created. READY: fully able to run, just waiting for a CPU. RUNNING: currently executing on a CPU. WAITING/BLOCKED: cannot proceed until an event completes (disk read, network reply, lock release). TERMINATED: finished. Key transitions: ready to running is the SCHEDULER dispatching it; running to ready is preemption (time slice expired); running to blocked happens when it requests I/O; blocked to ready when that I/O completes. Note a blocked process moves to READY, not directly to running — it still must be scheduled.',
      hinglish:
        'NEW: ban raha hai. READY: chalne ke liye poori tarah taiyar, bas ek CPU ka wait. RUNNING: currently ek CPU pe execute ho raha hai. WAITING/BLOCKED: ek event complete hone tak aage nahi badh sakta (disk read, network reply, lock release). TERMINATED: khatam. Key transitions: ready se running SCHEDULER ka use dispatch karna hai; running se ready preemption hai (time slice khatam); running se blocked tab hota hai jab wo I/O maange; blocked se ready jab wo I/O complete ho. Note karo ek blocked process READY mein jaata hai, seedha running mein nahi — use abhi bhi schedule hona padta hai.',
    },
  },
  {
    question: 'What is a Process Control Block (PCB)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The PCB is the kernel data structure holding everything the OS knows about a process: its PID, current state, program counter and CPU registers (saved on context switch), memory management information (page tables), open file descriptors, scheduling priority, accounting data, and parent/child relationships. It is precisely what gets saved and restored during a context switch — the PCB IS the process, from the kernel\'s point of view, which is why a larger PCB makes context switching more expensive.',
      hinglish:
        'PCB wo kernel data structure hai jo har wo cheez rakhta hai jo OS ek process ke baare mein jaanta hai: uska PID, current state, program counter aur CPU registers (context switch pe saved), memory management information (page tables), open file descriptors, scheduling priority, accounting data, aur parent/child relationships. Yahi exactly wo hai jo ek context switch ke dauraan save aur restore hota hai — kernel ke point of view se PCB HI process hai, isliye ek bada PCB context switching ko zyada mehnga banata hai.',
    },
  },
  {
    question: 'What is fork() and what does it return?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'fork() creates a new process by DUPLICATING the calling process — the child gets a copy of the parent\'s memory, file descriptors, and execution state. The clever part is the return value: fork() returns TWICE. In the parent it returns the child\'s PID (a positive number); in the child it returns 0; on failure it returns -1 in the parent. That is how identical code takes two different paths. Modern implementations use copy-on-write, so memory is shared until one side writes, making fork much cheaper than a full copy.',
      hinglish:
        'fork() calling process ko DUPLICATE karke ek naya process banata hai — child ko parent ki memory, file descriptors, aur execution state ki ek copy milti hai. Clever hissa return value hai: fork() DO BAAR return karta hai. Parent mein ye child ka PID return karta hai (ek positive number); child mein ye 0 return karta hai; failure pe parent mein -1. Isi tarah identical code do alag paths leta hai. Modern implementations copy-on-write use karte hain, isliye memory tab tak share hoti hai jab tak koi ek likhe na, fork ko ek full copy se bahut sasta banate hue.',
    },
  },
  {
    question: 'What is a zombie process and an orphan process?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A ZOMBIE has finished executing but its entry remains in the process table because the parent has not yet called wait() to read its exit status. It consumes no CPU or memory, only a table slot — but a parent leaking zombies can eventually exhaust the process table. An ORPHAN is the opposite: its parent died first, leaving it running with no parent. The OS handles this automatically by RE-PARENTING orphans to init/systemd (PID 1), which reaps them properly, so orphans are harmless while zombies indicate a bug.',
      hinglish:
        'Ek ZOMBIE execute karna khatam kar chuka hai par uski entry process table mein padi hai kyunki parent ne abhi tak uska exit status padhne ke liye wait() call nahi kiya. Ye koi CPU ya memory consume nahi karta, sirf ek table slot — par zombies leak karne wala ek parent eventually process table khatam kar sakta hai. Ek ORPHAN ulta hai: iska parent pehle mar gaya, ise bina parent ke chalta chhod ke. OS ise automatically handle karta hai orphans ko init/systemd (PID 1) pe RE-PARENT karke, jo unhe properly reap karta hai, isliye orphans harmless hain jabki zombies ek bug indicate karte hain.',
    },
  },
  {
    question: 'What is a daemon process?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A daemon is a background process that runs without a controlling terminal, typically started at boot and running for the machine\'s lifetime — web servers, database servers, cron, and sshd are daemons. By convention their names often end in "d" (httpd, sshd, systemd). Creating one traditionally involves forking, detaching from the terminal, and re-parenting to init so it survives the launching shell exiting. On modern Linux, systemd manages this lifecycle rather than each program doing it manually.',
      hinglish:
        'Ek daemon ek background process hai jo bina ek controlling terminal ke chalta hai, typically boot pe start hota hai aur machine ki lifetime tak chalta hai — web servers, database servers, cron, aur sshd daemons hain. Convention se unke naam aksar "d" pe khatam hote hain (httpd, sshd, systemd). Ek banane mein traditionally forking, terminal se detach karna, aur init pe re-parent karna shamil hai taaki wo launching shell exit hone pe bhi bacha rahe. Modern Linux pe, systemd is lifecycle ko manage karta hai, har program ke manually karne ke bajaye.',
    },
  },

  // ─── Scheduling ───────────────────────────────────────────
  {
    question: 'What is the difference between preemptive and non-preemptive scheduling?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'NON-PREEMPTIVE scheduling lets a process keep the CPU until it voluntarily yields or blocks — simple and low-overhead, but one long-running process can starve everything else, and a buggy infinite loop freezes the system. PREEMPTIVE scheduling lets the OS forcibly interrupt a running process when its time slice expires or a higher-priority task arrives — this is what makes a system responsive and is used by all modern general-purpose OSes, at the cost of context-switch overhead and the need for locks to protect shared data.',
      hinglish:
        'NON-PREEMPTIVE scheduling ek process ko CPU tab tak rakhne deti hai jab tak wo voluntarily yield ya block na kare — simple aur low-overhead, par ek long-running process baaki sab ko starve kar sakta hai, aur ek buggy infinite loop system freeze kar deta hai. PREEMPTIVE scheduling OS ko ek running process ko forcibly interrupt karne deti hai jab uska time slice khatam ho ya ek higher-priority task aaye — yahi ek system ko responsive banata hai aur saare modern general-purpose OSes use karte hain, context-switch overhead aur shared data protect karne ke liye locks ki zaroorat ke cost pe.',
    },
  },
  {
    question: 'Compare FCFS, SJF, Round Robin, and Priority scheduling.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'FCFS runs in arrival order — trivially fair and simple, but suffers the CONVOY EFFECT where one long job delays everyone behind it. SJF (Shortest Job First) is provably optimal for average waiting time, but requires knowing job length in advance (usually impossible) and can starve long jobs. ROUND ROBIN gives each process a fixed time quantum in rotation — excellent responsiveness and no starvation, though a badly chosen quantum means either poor response (too large) or excessive context-switch overhead (too small). PRIORITY runs the highest priority first — flexible but starves low-priority tasks unless you add AGING.',
      hinglish:
        'FCFS arrival order mein chalata hai — trivially fair aur simple, par CONVOY EFFECT se pareshan jahan ek lamba job uske peeche sabko delay karta hai. SJF (Shortest Job First) average waiting time ke liye provably optimal hai, par job length pehle se jaanna padta hai (usually impossible) aur lambe jobs starve kar sakta hai. ROUND ROBIN har process ko rotation mein ek fixed time quantum deta hai — excellent responsiveness aur koi starvation nahi, chahe ek badly chosen quantum matlab ya poor response (bahut bada) ya excessive context-switch overhead (bahut chhota). PRIORITY highest priority pehle chalata hai — flexible par low-priority tasks starve karta hai jab tak AGING add na karo.',
    },
  },
  {
    question: 'What is starvation and how does aging solve it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Starvation is when a process is perpetually denied a resource because higher-priority tasks keep arriving — with strict priority scheduling, a low-priority job on a busy system may literally never run. AGING solves it by gradually INCREASING the priority of a process the longer it waits, so any waiting task eventually becomes high enough priority to be scheduled. It is a general pattern beyond CPU scheduling — the same technique prevents starvation in lock acquisition and request queues.',
      hinglish:
        'Starvation tab hai jab ek process ko perpetually ek resource deny hota rehta hai kyunki higher-priority tasks aate rehte hain — strict priority scheduling ke saath, ek busy system pe ek low-priority job literally kabhi nahi chal sakta. AGING ise ek process ke wait karne ke saath uski priority gradually BADHAKAR solve karta hai, isliye koi bhi waiting task eventually itni high priority ka ban jaata hai ki schedule ho jaaye. Ye CPU scheduling se aage ek general pattern hai — wahi technique lock acquisition aur request queues mein starvation rokti hai.',
    },
  },
  {
    question: 'What is the difference between a CPU-bound and an I/O-bound process?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A CPU-BOUND process spends most of its time computing (video encoding, simulations) — it uses its full time slice and benefits from long quanta and fewer context switches. An I/O-BOUND process spends most of its time waiting on disk or network (a typical web server) — it uses only a fraction of its slice before blocking. Good schedulers favour I/O-bound processes with higher priority, because dispatching them briefly lets them start their slow I/O sooner, keeping both the CPU and the devices busy in parallel.',
      hinglish:
        'Ek CPU-BOUND process apna zyadatar time compute karne mein kharch karta hai (video encoding, simulations) — ye apna poora time slice use karta hai aur lambe quanta aur kam context switches se benefit hota hai. Ek I/O-BOUND process apna zyadatar time disk ya network pe wait karne mein kharch karta hai (ek typical web server) — ye block hone se pehle apne slice ka sirf ek fraction use karta hai. Achhe schedulers I/O-bound processes ko higher priority se favour karte hain, kyunki unhe briefly dispatch karna unhe apna slow I/O jaldi shuru karne deta hai, CPU aur devices dono ko parallel mein busy rakhte hue.',
    },
  },
  {
    question: 'What is the difference between concurrency and parallelism?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'CONCURRENCY is dealing with many tasks at once by interleaving them — they make progress in overlapping time periods, but on a single core only one actually executes at any instant. PARALLELISM is genuinely executing multiple tasks simultaneously, which requires multiple cores. Rob Pike\'s framing: concurrency is about STRUCTURE (how you compose independently executing things), parallelism is about EXECUTION (doing many things at the same instant). You can have concurrency without parallelism, and it is still very useful for I/O-bound work.',
      hinglish:
        'CONCURRENCY bahut tasks ko interleave karke ek saath deal karna hai — wo overlapping time periods mein progress karte hain, par ek single core pe kisi bhi instant pe sirf ek actually execute hota hai. PARALLELISM genuinely multiple tasks ko simultaneously execute karna hai, jiske liye multiple cores chahiye. Rob Pike ka framing: concurrency STRUCTURE ke baare mein hai (tum independently executing cheezein kaise compose karte ho), parallelism EXECUTION ke baare mein hai (ek hi instant pe bahut cheezein karna). Tumhe parallelism ke bina concurrency mil sakti hai, aur wo I/O-bound kaam ke liye abhi bhi bahut useful hai.',
    },
  },

  // ─── Memory ───────────────────────────────────────────
  {
    question: 'What is virtual memory and why is it useful?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Virtual memory gives every process its own private, contiguous-looking address space, which the OS maps onto physical RAM (and disk) behind the scenes. Benefits: ISOLATION (a process cannot even address another\'s memory, so bugs and attacks are contained), SIMPLICITY (programs are compiled without knowing where they will physically load), OVERCOMMITMENT (processes can collectively use more memory than physically exists, with inactive pages swapped to disk), and efficient SHARING (identical library pages mapped once into many processes).',
      hinglish:
        'Virtual memory har process ko uska apna private, contiguous-dikhne wala address space deti hai, jise OS peeche se physical RAM (aur disk) pe map karta hai. Benefits: ISOLATION (ek process doosre ki memory address bhi nahi kar sakta, isliye bugs aur attacks contained rehte hain), SIMPLICITY (programs bina jaane compile hote hain ki wo physically kahan load honge), OVERCOMMITMENT (processes collectively physically maujood se zyada memory use kar sakte hain, inactive pages disk pe swap karke), aur efficient SHARING (identical library pages ek baar map hoke bahut processes mein).',
    },
  },
  {
    question: 'How does address translation work with paging?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A virtual address is split into a PAGE NUMBER and an OFFSET. The MMU uses the page number to index the process\'s page table, which yields the physical FRAME number; the physical address is then that frame\'s base plus the unchanged offset. Because a page-table lookup would itself require a memory access, the MMU caches recent translations in the TLB — on a TLB hit, translation is nearly free. Multi-level page tables are used so that sparse address spaces do not require one enormous flat table.',
      hinglish:
        'Ek virtual address ek PAGE NUMBER aur ek OFFSET mein split hota hai. MMU page number use karke process ki page table index karta hai, jo physical FRAME number deti hai; physical address phir us frame ka base plus unchanged offset hota hai. Kyunki ek page-table lookup ko khud ek memory access chahiye hoti, MMU recent translations ko TLB mein cache karta hai — ek TLB hit pe, translation almost free hai. Multi-level page tables isliye use hoti hain taaki sparse address spaces ko ek enormous flat table na chahiye.',
    },
  },
  {
    question: 'What is the difference between internal and external fragmentation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'INTERNAL fragmentation is wasted space INSIDE an allocated block — a process needing 5KB gets a full 8KB page, wasting 3KB that nobody else can use. It is inherent to fixed-size allocation like paging. EXTERNAL fragmentation is wasted space BETWEEN allocations — enough total free memory exists, but it is scattered in small non-contiguous holes, so a large contiguous request fails. Paging essentially eliminates external fragmentation (any free frame will do) at the cost of some internal fragmentation, which is why it won over segmentation.',
      hinglish:
        'INTERNAL fragmentation ek allocated block ke ANDAR wasted space hai — 5KB chahne wale ek process ko poora 8KB page milta hai, 3KB waste karte hue jo koi aur use nahi kar sakta. Ye paging jaisi fixed-size allocation mein inherent hai. EXTERNAL fragmentation allocations ke BEECH wasted space hai — kaafi total free memory maujood hai, par wo chhote non-contiguous holes mein bikhri hai, isliye ek bada contiguous request fail ho jaata hai. Paging essentially external fragmentation eliminate karta hai (koi bhi free frame chalega) kuch internal fragmentation ke cost pe, isliye ye segmentation pe jeeta.',
    },
  },
  {
    question: 'Compare FIFO, LRU, and Optimal page replacement.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'FIFO evicts the oldest-loaded page — trivial to implement but ignores usage, so it can evict a heavily-used page, and it famously suffers BELADY\'S ANOMALY where adding more frames can INCREASE faults. LRU evicts the least recently used page, approximating the future well because programs exhibit temporal locality; true LRU is expensive to track, so real systems use approximations like the clock/second-chance algorithm. OPTIMAL evicts the page that will be needed furthest in the future — provably best, but requires knowing the future, so it exists only as a theoretical benchmark.',
      hinglish:
        'FIFO sabse purane load hue page ko evict karta hai — implement karna trivial par usage ignore karta hai, isliye ye ek heavily-used page evict kar sakta hai, aur ye famously BELADY\'S ANOMALY se pareshan hai jahan zyada frames add karna faults BADHA sakta hai. LRU least recently used page evict karta hai, future ko achhe se approximate karte hue kyunki programs temporal locality dikhate hain; true LRU track karna mehnga hai, isliye real systems clock/second-chance jaise approximations use karte hain. OPTIMAL wo page evict karta hai jo future mein sabse door chahiye hoga — provably best, par future jaanna padta hai, isliye ye sirf ek theoretical benchmark ke roop mein exist karta hai.',
    },
  },
  {
    question: 'What is thrashing and how do you fix it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Thrashing is when the system spends more time swapping pages between RAM and disk than doing useful work. It happens when the combined WORKING SET of active processes exceeds physical memory: each process constantly evicts pages another process immediately needs back, so CPU utilisation collapses while disk I/O saturates. Cruelly, a naive scheduler may respond to low CPU utilisation by admitting MORE processes, worsening it. Fixes: reduce the degree of multiprogramming (suspend processes), add RAM, or use working-set/page-fault-frequency models to allocate frames properly.',
      hinglish:
        'Thrashing tab hai jab system useful kaam karne se zyada time RAM aur disk ke beech pages swap karne mein kharch karta hai. Ye tab hota hai jab active processes ka combined WORKING SET physical memory se zyada ho: har process constantly wo pages evict karta hai jo doosre process ko turant wapas chahiye, isliye CPU utilisation girta hai jabki disk I/O saturate hota hai. Cruelly, ek naive scheduler low CPU utilisation pe ZYADA processes admit karke respond kar sakta hai, ise aur bigadte hue. Fixes: multiprogramming ki degree kam karo (processes suspend karo), RAM add karo, ya frames properly allocate karne ke liye working-set/page-fault-frequency models use karo.',
    },
  },
  {
    question: 'What is a memory leak and how is it different from a dangling pointer?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A MEMORY LEAK is memory that was allocated but never freed and is no longer reachable — it accumulates silently until the process exhausts memory. A DANGLING POINTER is the opposite failure: memory that WAS freed but is still referenced, so using it reads or corrupts whatever now occupies that address (a use-after-free, and a serious security vulnerability). Roughly: a leak wastes memory but is safe; a dangling pointer is a correctness and security bug. Garbage-collected languages prevent both, at the cost of GC pauses.',
      hinglish:
        'Ek MEMORY LEAK wo memory hai jo allocate hui par kabhi free nahi hui aur ab reachable nahi hai — ye silently accumulate hoti hai jab tak process memory khatam na kar de. Ek DANGLING POINTER ulta failure hai: wo memory jo free HO CHUKI hai par abhi bhi reference ki ja rahi hai, isliye use karna wo padhta ya corrupt karta hai jo ab us address pe hai (ek use-after-free, aur ek serious security vulnerability). Roughly: ek leak memory waste karta hai par safe hai; ek dangling pointer ek correctness aur security bug hai. Garbage-collected languages dono rokti hain, GC pauses ke cost pe.',
    },
  },
  {
    question: 'What is the difference between the stack and the heap?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The STACK holds function call frames — local variables, parameters, return addresses — allocated and freed automatically in strict LIFO order as functions enter and exit. It is very fast (just moving a pointer), but small and fixed in size, hence stack overflow from deep recursion. The HEAP is for dynamic allocation that must outlive the current function — larger, flexible, but slower and manually managed (or garbage collected), and it is where leaks and fragmentation occur. Each thread has its own stack; the heap is shared across threads.',
      hinglish:
        'STACK function call frames rakhta hai — local variables, parameters, return addresses — functions ke enter aur exit hone pe strict LIFO order mein automatically allocate aur free hote hue. Ye bahut fast hai (bas ek pointer move karna), par chhota aur fixed size ka, isliye deep recursion se stack overflow. HEAP us dynamic allocation ke liye hai jise current function se zyada jeena hai — bada, flexible, par slower aur manually managed (ya garbage collected), aur yahin leaks aur fragmentation hote hain. Har thread ka apna stack hota hai; heap threads ke across shared hai.',
    },
  },

  // ─── Concurrency & Synchronisation ───────────────────────────────────────────
  {
    question: 'What is a race condition?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A race condition occurs when the correctness of a result depends on the unpredictable TIMING of concurrent operations. The classic example: two threads both execute balance = balance + 100, which is really read-modify-write; if both read 500 before either writes, both write 600 and one update is silently lost. Race conditions are notoriously hard to debug because they are non-deterministic — they may appear only under load, on certain hardware, or never in testing. The fix is enforcing mutual exclusion around the critical section.',
      hinglish:
        'Ek race condition tab hoti hai jab ek result ki correctness concurrent operations ki unpredictable TIMING pe depend kare. Classic example: do threads dono balance = balance + 100 execute karte hain, jo really read-modify-write hai; agar dono 500 padhein kisi ke likhne se pehle, dono 600 likhte hain aur ek update silently kho jaata hai. Race conditions notoriously debug karna mushkil hain kyunki wo non-deterministic hain — wo sirf load pe, certain hardware pe, ya testing mein kabhi nahi dikh sakti. Fix critical section ke around mutual exclusion enforce karna hai.',
    },
  },
  {
    question: 'What is a critical section?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A critical section is the portion of code that accesses shared resources and must not be executed by more than one thread at a time. A correct solution must satisfy three properties: MUTUAL EXCLUSION (at most one thread inside), PROGRESS (if no thread is inside, one waiting thread must be able to enter — no deadlock), and BOUNDED WAITING (a thread cannot be made to wait forever — no starvation). Keeping critical sections as SHORT as possible is the key practical rule, since they serialise execution.',
      hinglish:
        'Ek critical section code ka wo hissa hai jo shared resources access karta hai aur jise ek time mein ek se zyada thread execute nahi karna chahiye. Ek correct solution ko teen properties satisfy karni chahiye: MUTUAL EXCLUSION (zyada se zyada ek thread andar), PROGRESS (agar koi thread andar nahi, ek waiting thread ko enter kar paana chahiye — koi deadlock nahi), aur BOUNDED WAITING (ek thread ko hamesha wait nahi karwaya ja sakta — koi starvation nahi). Critical sections ko jitna ho sake CHHOTA rakhna key practical rule hai, kyunki wo execution serialise karte hain.',
    },
  },
  {
    question: 'What is the difference between a mutex and a semaphore?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A MUTEX is a locking mechanism allowing exactly one thread into the critical section, and it has OWNERSHIP — only the thread that locked it may unlock it. A SEMAPHORE is a signalling mechanism with a counter allowing up to N threads through, and it has NO ownership — any thread can signal it. A binary semaphore (count 1) resembles a mutex but lacks ownership semantics, so it can also be used for signalling BETWEEN threads (producer signals consumer), which a mutex cannot properly express.',
      hinglish:
        'Ek MUTEX ek locking mechanism hai jo critical section mein exactly ek thread ko aane deta hai, aur iski OWNERSHIP hoti hai — sirf wo thread ise unlock kar sakta hai jisne lock kiya. Ek SEMAPHORE ek signalling mechanism hai ek counter ke saath jo N threads tak allow karta hai, aur iski KOI ownership nahi — koi bhi thread ise signal kar sakta hai. Ek binary semaphore (count 1) mutex jaisa lagta hai par ownership semantics nahi rakhta, isliye ise threads ke BEECH signalling ke liye bhi use kar sakte hain (producer consumer ko signal karta hai), jo ek mutex properly express nahi kar sakta.',
    },
  },
  {
    question: 'What is a deadlock and what are the four necessary conditions?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Deadlock is when two or more processes are permanently blocked, each holding a resource the other needs. It requires ALL FOUR Coffman conditions simultaneously: MUTUAL EXCLUSION (resources cannot be shared), HOLD AND WAIT (a process holds one resource while waiting for another), NO PREEMPTION (resources cannot be forcibly taken), and CIRCULAR WAIT (a cycle of processes each waiting on the next). Because all four are required, breaking any ONE prevents deadlock — which is the basis of every prevention strategy.',
      hinglish:
        'Deadlock tab hai jab do ya zyada processes permanently blocked hon, har ek ek aisa resource hold kiye hue jo doosre ko chahiye. Iske liye CHAARON Coffman conditions ek saath chahiye: MUTUAL EXCLUSION (resources share nahi ho sakte), HOLD AND WAIT (ek process ek resource hold karta hai jabki doosre ka wait karta hai), NO PREEMPTION (resources zabardasti nahi liye ja sakte), aur CIRCULAR WAIT (processes ka ek cycle har ek agle ka wait karta hua). Kyunki chaaron zaroori hain, KISI EK ko todna deadlock rokta hai — jo har prevention strategy ka basis hai.',
    },
  },
  {
    question: 'How do you prevent deadlock in practice?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The most practical technique is imposing a global LOCK ORDERING: every thread acquires locks in the same defined order, which makes circular wait impossible. Other approaches: eliminate hold-and-wait by acquiring all needed resources at once or none; use lock TIMEOUTS so a thread backs off and retries rather than waiting forever; or use try-lock and release everything on failure. Detection-and-recovery (find cycles, kill a victim) and avoidance (Banker\'s algorithm) exist but are rarely used in application code because they need advance knowledge of resource needs.',
      hinglish:
        'Sabse practical technique ek global LOCK ORDERING lagana hai: har thread locks ko usi defined order mein acquire karta hai, jo circular wait impossible bana deta hai. Doosre approaches: hold-and-wait eliminate karo saare zaroori resources ek saath ya bilkul nahi lekar; lock TIMEOUTS use karo taaki ek thread hamesha wait karne ke bajaye back off karke retry kare; ya try-lock use karo aur failure pe sab kuch release karo. Detection-and-recovery (cycles dhundho, ek victim maaro) aur avoidance (Banker\'s algorithm) exist karte hain par application code mein rarely use hote hain kyunki unhe resource needs ka advance knowledge chahiye.',
    },
  },
  {
    question: 'What is the difference between deadlock, livelock, and starvation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'In DEADLOCK, processes are blocked and completely stuck — no state changes at all. In LIVELOCK, processes are actively RUNNING and changing state, but making no progress: like two people repeatedly stepping aside for each other in a corridor, each politely reacting to the other forever. Livelock often arises from naive deadlock-avoidance where everyone backs off and retries in lockstep. STARVATION is a single process being perpetually denied a resource while others proceed — the system as a whole progresses, just not for that one process.',
      hinglish:
        'DEADLOCK mein, processes blocked aur poori tarah atke hain — koi state change nahi. LIVELOCK mein, processes actively CHAL rahe hain aur state badal rahe hain, par koi progress nahi: jaise do log ek corridor mein baar-baar ek doosre ke liye side hote rahein, har ek hamesha ke liye politely doosre pe react karta hua. Livelock aksar naive deadlock-avoidance se aata hai jahan sab lockstep mein back off karke retry karte hain. STARVATION ek single process ko perpetually ek resource deny hona hai jabki doosre aage badhte hain — system overall progress karta hai, bas us ek process ke liye nahi.',
    },
  },
  {
    question: 'What is the producer-consumer problem?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A classic synchronisation problem: producers add items to a bounded buffer while consumers remove them. Correctness requires three things — producers must block when the buffer is FULL, consumers must block when it is EMPTY, and access to the buffer must be mutually exclusive. The standard solution uses two counting semaphores (empty slots and full slots) plus a mutex. It matters practically because it is the abstract form of every queue, thread pool, and message broker you will build.',
      hinglish:
        'Ek classic synchronisation problem: producers ek bounded buffer mein items add karte hain jabki consumers unhe remove karte hain. Correctness ko teen cheezein chahiye — producers ko buffer FULL hone pe block hona chahiye, consumers ko EMPTY hone pe block hona chahiye, aur buffer ka access mutually exclusive hona chahiye. Standard solution do counting semaphores (empty slots aur full slots) plus ek mutex use karta hai. Ye practically matter karta hai kyunki ye har queue, thread pool, aur message broker ka abstract form hai jo tum banaoge.',
    },
  },
  {
    question: 'What is a spinlock and when is it better than a mutex?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A spinlock makes a waiting thread loop ("spin") repeatedly checking the lock instead of sleeping. It avoids the cost of blocking and rescheduling, so it is FASTER when the expected wait is very short — shorter than a context switch — which is why kernels use spinlocks for brief critical sections on multi-core systems. It is much worse when waits are long, since it burns CPU doing nothing, and it is catastrophic on a single core, where the spinning thread prevents the lock holder from ever running.',
      hinglish:
        'Ek spinlock ek waiting thread ko sone ke bajaye baar-baar lock check karte hue loop ("spin") karwata hai. Ye blocking aur rescheduling ki cost avoid karta hai, isliye ye tab FASTER hai jab expected wait bahut chhota ho — ek context switch se chhota — isliye kernels multi-core systems pe brief critical sections ke liye spinlocks use karte hain. Ye tab bahut bura hai jab waits lambe hon, kyunki ye kuch na karte hue CPU jalata hai, aur ek single core pe catastrophic hai, jahan spinning thread lock holder ko chalne hi nahi deta.',
    },
  },
  {
    question: 'What is an atomic operation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An atomic operation completes entirely or not at all, with no possibility of another thread observing an intermediate state — it is indivisible. This matters because innocent-looking code is often not atomic: counter++ is really three operations (read, add, write), and a thread can be interrupted between them, causing lost updates. Hardware provides atomic primitives like compare-and-swap (CAS), which underpin both lock-free data structures and the implementation of mutexes themselves.',
      hinglish:
        'Ek atomic operation ya poori tarah complete hota hai ya bilkul nahi, bina kisi doosre thread ke ek intermediate state dekhne ki possibility ke — ye indivisible hai. Ye isliye matter karta hai kyunki innocent-dikhne wala code aksar atomic nahi hota: counter++ really teen operations hain (read, add, write), aur ek thread unke beech interrupt ho sakta hai, lost updates cause karte hue. Hardware compare-and-swap (CAS) jaise atomic primitives deta hai, jo lock-free data structures aur khud mutexes ke implementation dono ka base hain.',
    },
  },

  // ─── File Systems & I/O ───────────────────────────────────────────
  {
    question: 'What is an inode?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An inode is the data structure holding a file\'s METADATA — size, permissions, owner, timestamps, link count, and pointers to the data blocks — but notably NOT its name. Names live in directories, which are simply tables mapping names to inode numbers. This separation explains several behaviours: renaming a file is instant (only the directory entry changes), hard links are multiple names pointing at one inode, and a filesystem can run out of inodes while still having free disk space.',
      hinglish:
        'Ek inode wo data structure hai jo ek file ka METADATA rakhta hai — size, permissions, owner, timestamps, link count, aur data blocks ke pointers — par notably uska naam NAHI. Naam directories mein rehte hain, jo simply naamon ko inode numbers se map karne wali tables hain. Ye separation kai behaviours explain karta hai: ek file rename karna instant hai (sirf directory entry badalti hai), hard links ek inode pe point karne wale multiple naam hain, aur ek filesystem free disk space hote hue bhi inodes khatam kar sakta hai.',
    },
  },
  {
    question: 'What is the difference between a hard link and a symbolic link?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A HARD LINK is another directory entry pointing at the SAME inode — the two names are equally real, and the file\'s data survives until the last link is deleted (that is what the link count tracks). It cannot cross filesystems or link to directories. A SYMBOLIC link is a separate small file containing a PATH to the target — it can cross filesystems and point to directories, but breaks if the target is moved or deleted, leaving a "dangling" link.',
      hinglish:
        'Ek HARD LINK ek doosri directory entry hai jo USI inode pe point karti hai — dono naam equally real hain, aur file ka data tab tak bacha rehta hai jab tak aakhri link delete na ho (link count yahi track karta hai). Ye filesystems cross nahi kar sakta ya directories ko link nahi kar sakta. Ek SYMBOLIC link ek separate chhoti file hai jisme target ka PATH hota hai — ye filesystems cross kar sakta hai aur directories pe point kar sakta hai, par target move ya delete hone pe toot jaata hai, ek "dangling" link chhodte hue.',
    },
  },
  {
    question: 'What is journaling in a file system?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A journaling filesystem writes a description of intended changes to a JOURNAL (log) before applying them to the main filesystem. If the machine crashes mid-write, recovery simply replays or discards the journal entries rather than scanning the entire disk for inconsistencies — turning a multi-hour fsck into seconds. Modes trade safety for speed: journaling metadata only is the common default (fast, protects structure), while full data journaling also protects file contents at roughly double the write cost.',
      hinglish:
        'Ek journaling filesystem intended changes ka ek description ek JOURNAL (log) mein likhta hai unhe main filesystem pe apply karne se pehle. Agar machine mid-write crash ho, recovery simply journal entries replay ya discard karti hai, poori disk ko inconsistencies ke liye scan karne ke bajaye — ek multi-hour fsck ko seconds mein badalte hue. Modes safety ko speed ke liye trade karte hain: sirf metadata journal karna common default hai (fast, structure protect karta hai), jabki full data journaling file contents bhi protect karta hai roughly double write cost pe.',
    },
  },
  {
    question: 'What is a file descriptor?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A file descriptor is a small non-negative integer the kernel gives a process to refer to an open file, socket, or pipe — it indexes into the process\'s file descriptor table. By convention 0 is stdin, 1 is stdout, 2 is stderr, which is what makes shell redirection (2>&1) work. Because sockets and pipes are also file descriptors, the same read/write calls work across all of them — this "everything is a file" uniformity is a defining design choice of Unix.',
      hinglish:
        'Ek file descriptor ek chhota non-negative integer hai jo kernel ek process ko ek open file, socket, ya pipe refer karne ke liye deta hai — ye process ki file descriptor table mein index karta hai. Convention se 0 stdin hai, 1 stdout, 2 stderr, jo shell redirection (2>&1) ko kaam karwata hai. Kyunki sockets aur pipes bhi file descriptors hain, wahi read/write calls un sab pe kaam karte hain — ye "everything is a file" uniformity Unix ka ek defining design choice hai.',
    },
  },
  {
    question: 'What is the difference between blocking and non-blocking I/O?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'BLOCKING I/O suspends the calling thread until the operation completes — simple to reason about, but the thread does nothing while waiting, so serving many connections requires many threads. NON-BLOCKING I/O returns immediately, possibly with "not ready yet", letting one thread manage many operations. Combined with an event notification mechanism (epoll on Linux, kqueue on BSD), this is what allows a single-threaded server like Node.js or nginx to handle tens of thousands of concurrent connections efficiently.',
      hinglish:
        'BLOCKING I/O calling thread ko operation complete hone tak suspend karta hai — samajhna simple, par thread wait karte hue kuch nahi karta, isliye bahut connections serve karne ke liye bahut threads chahiye. NON-BLOCKING I/O turant return karta hai, possibly "abhi ready nahi" ke saath, ek thread ko bahut operations manage karne dete hue. Ek event notification mechanism (Linux pe epoll, BSD pe kqueue) ke saath combine hoke, yahi Node.js ya nginx jaise ek single-threaded server ko das hazaron concurrent connections efficiently handle karne deta hai.',
    },
  },
  {
    question: 'What is DMA (Direct Memory Access)?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'DMA lets a device transfer data directly to or from RAM WITHOUT routing every byte through the CPU. Without it, the CPU would have to copy each word itself (programmed I/O), wasting enormous cycles on a large disk or network transfer. With DMA, the CPU sets up the transfer, goes off to do useful work, and is interrupted only when the whole transfer completes. It is a key reason a modern machine can sustain high I/O throughput while still running applications responsively.',
      hinglish:
        'DMA ek device ko data seedha RAM se ya RAM mein transfer karne deta hai bina har byte CPU se guzaare. Iske bina, CPU ko khud har word copy karna padta (programmed I/O), ek bade disk ya network transfer pe enormous cycles waste karte hue. DMA ke saath, CPU transfer set up karta hai, useful kaam karne chala jaata hai, aur sirf tab interrupt hota hai jab poora transfer complete ho. Ye ek key wajah hai ki ek modern machine high I/O throughput sustain kar sakti hai jabki applications abhi bhi responsively chal rahi hon.',
    },
  },
  {
    question: 'What is an interrupt and how does the OS handle it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An interrupt is a hardware or software signal telling the CPU that something needs immediate attention — a key was pressed, a disk read finished, a timer expired. The CPU suspends the current instruction stream, saves state, looks up the handler address in the interrupt vector table, runs the interrupt service routine, then restores state and resumes. Interrupts are what make an OS event-driven rather than having to constantly POLL every device, which would waste the entire CPU.',
      hinglish:
        'Ek interrupt ek hardware ya software signal hai jo CPU ko batata hai ki kisi cheez ko immediate attention chahiye — ek key dabi, ek disk read khatam hua, ek timer expire hua. CPU current instruction stream suspend karta hai, state save karta hai, interrupt vector table mein handler address dhundhta hai, interrupt service routine chalata hai, phir state restore karke resume karta hai. Interrupts hi ek OS ko event-driven banate hain, har device ko constantly POLL karne ke bajaye, jo poora CPU waste kar deta.',
    },
  },

  // ─── Advanced ───────────────────────────────────────────
  {
    question: 'What is the difference between a monolithic kernel and a microkernel?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A MONOLITHIC kernel (Linux) runs all core services — drivers, filesystems, networking — in kernel space, so calls between them are fast direct function calls; the downside is a bug in any driver can crash the whole system. A MICROKERNEL (Minix, QNX) keeps only the bare minimum in kernel space and runs drivers and filesystems as user-space processes, giving much better isolation and reliability, but paying message-passing overhead for every interaction. Practical systems are often hybrids — Linux mitigates its downside with loadable modules.',
      hinglish:
        'Ek MONOLITHIC kernel (Linux) saare core services — drivers, filesystems, networking — kernel space mein chalata hai, isliye unke beech calls fast direct function calls hain; downside ye hai ki kisi bhi driver mein ek bug poora system crash kar sakta hai. Ek MICROKERNEL (Minix, QNX) kernel space mein sirf bare minimum rakhta hai aur drivers aur filesystems ko user-space processes ke roop mein chalata hai, bahut better isolation aur reliability dete hue, par har interaction ke liye message-passing overhead dete hue. Practical systems aksar hybrids hote hain — Linux apna downside loadable modules se mitigate karta hai.',
    },
  },
  {
    question: 'What is the difference between a process and a thread in terms of context switching cost?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Switching between THREADS of the same process is much cheaper because they share an address space — only registers, stack pointer, and program counter change. Switching between PROCESSES additionally requires swapping the page table (loading a new page-table base register), which FLUSHES the TLB, so subsequent memory accesses suffer expensive TLB misses until it refills. That TLB flush, not the register saving, is what makes process switches significantly more costly than thread switches.',
      hinglish:
        'Same process ke THREADS ke beech switch karna bahut sasta hai kyunki wo ek address space share karte hain — sirf registers, stack pointer, aur program counter badalte hain. PROCESSES ke beech switch karne ke liye additionally page table swap karni padti hai (ek naya page-table base register load karna), jo TLB FLUSH karta hai, isliye baad ke memory accesses mehnge TLB misses se pareshan hote hain jab tak wo dobara bhar na jaaye. Wahi TLB flush, register saving nahi, process switches ko thread switches se significantly zyada costly banata hai.',
    },
  },
  {
    question: 'What is a real-time operating system (RTOS)?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'An RTOS guarantees that operations complete within a bounded, predictable DEADLINE — its defining goal is determinism, not throughput. HARD real-time (airbag controllers, pacemakers, flight control) treats a missed deadline as total system failure; SOFT real-time (video streaming) merely degrades quality. To achieve this, an RTOS uses preemptive priority scheduling with bounded interrupt latency and avoids unpredictable mechanisms like paging and garbage collection. A general-purpose OS optimises average performance and is therefore unsuitable.',
      hinglish:
        'Ek RTOS guarantee karta hai ki operations ek bounded, predictable DEADLINE ke andar complete hon — iska defining goal determinism hai, throughput nahi. HARD real-time (airbag controllers, pacemakers, flight control) ek missed deadline ko total system failure maanta hai; SOFT real-time (video streaming) sirf quality degrade karta hai. Ye achieve karne ke liye, ek RTOS bounded interrupt latency ke saath preemptive priority scheduling use karta hai aur paging aur garbage collection jaise unpredictable mechanisms avoid karta hai. Ek general-purpose OS average performance optimise karta hai aur isliye unsuitable hai.',
    },
  },
  {
    question: 'What is the difference between a virtual machine and a container?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A VIRTUAL MACHINE virtualises HARDWARE via a hypervisor and runs a complete guest OS with its own kernel — strong isolation, ability to run a different OS, but gigabytes in size and slow to boot. A CONTAINER virtualises the OPERATING SYSTEM: it shares the host kernel and isolates processes using kernel features (namespaces for visibility, cgroups for resource limits) — megabytes in size, starting in milliseconds, but limited to the host kernel and offering weaker isolation, since a kernel exploit escapes all containers.',
      hinglish:
        'Ek VIRTUAL MACHINE ek hypervisor se HARDWARE virtualise karti hai aur apne kernel ke saath ek complete guest OS chalati hai — strong isolation, ek alag OS chalane ki ability, par gigabytes ki aur boot hone mein slow. Ek CONTAINER OPERATING SYSTEM virtualise karta hai: ye host kernel share karta hai aur kernel features se processes isolate karta hai (visibility ke liye namespaces, resource limits ke liye cgroups) — megabytes ka, milliseconds mein start hota hua, par host kernel tak limited aur weaker isolation deta hua, kyunki ek kernel exploit saare containers se escape kar jaata hai.',
    },
  },
  {
    question: 'What are namespaces and cgroups in Linux?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'They are the two kernel features containers are built from, solving different problems. NAMESPACES control what a process can SEE — separate PID, network, mount, user, and hostname namespaces mean a container sees only its own processes, its own network interfaces, and its own filesystem tree. CGROUPS (control groups) control what a process can USE — limiting CPU shares, memory, disk I/O, and process count. Simply: namespaces provide isolation, cgroups provide resource limits; Docker is largely an ergonomic wrapper around both.',
      hinglish:
        'Ye wo do kernel features hain jinse containers bane hain, alag problems solve karte hue. NAMESPACES control karte hain ek process kya DEKH sakta hai — separate PID, network, mount, user, aur hostname namespaces matlab ek container sirf apne processes, apne network interfaces, aur apna filesystem tree dekhta hai. CGROUPS (control groups) control karte hain ek process kitna USE kar sakta hai — CPU shares, memory, disk I/O, aur process count limit karte hue. Simply: namespaces isolation dete hain, cgroups resource limits; Docker काफी हद तक dono ke around ek ergonomic wrapper hai.',
    },
  },
  {
    question: 'What is copy-on-write (COW)?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Copy-on-write shares a single physical copy of data between multiple users and only makes a real copy when one of them WRITES. After fork(), parent and child share all memory pages marked read-only; the first write triggers a page fault, and the kernel then copies just that one page. Since many forked children immediately exec() a new program, most pages are never copied at all — turning what looks like an expensive full-memory duplication into a cheap operation.',
      hinglish:
        'Copy-on-write data ki ek single physical copy ko multiple users ke beech share karta hai aur ek real copy sirf tab banata hai jab unme se koi LIKHE. fork() ke baad, parent aur child saare memory pages read-only marked share karte hain; pehla write ek page fault trigger karta hai, aur kernel phir sirf us ek page ko copy karta hai. Kyunki bahut forked children turant ek naya program exec() karte hain, zyadatar pages kabhi copy hi nahi hote — jo ek expensive full-memory duplication jaisa dikhta hai use ek sasta operation banate hue.',
    },
  },
  {
    question: 'What is the difference between paging and segmentation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PAGING divides memory into FIXED-size pages with no relationship to program structure — it is invisible to the programmer and eliminates external fragmentation, since any free frame can hold any page. SEGMENTATION divides memory into VARIABLE-size logical units matching program structure (code segment, stack segment, data segment) — more meaningful for protection and sharing, but it reintroduces external fragmentation. Modern x86 systems technically support both but effectively use paging with a flat segmentation model, since paging\'s simplicity won out.',
      hinglish:
        'PAGING memory ko FIXED-size pages mein divide karta hai jinka program structure se koi rishta nahi — ye programmer ke liye invisible hai aur external fragmentation eliminate karta hai, kyunki koi bhi free frame koi bhi page rakh sakta hai. SEGMENTATION memory ko program structure se match karti VARIABLE-size logical units mein divide karta hai (code segment, stack segment, data segment) — protection aur sharing ke liye zyada meaningful, par ye external fragmentation wapas le aata hai. Modern x86 systems technically dono support karte hain par effectively ek flat segmentation model ke saath paging use karte hain, kyunki paging ki simplicity jeet gayi.',
    },
  },
  {
    question: 'What is memory-mapped I/O (mmap)?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'mmap maps a file directly into a process\'s virtual address space, so the file can be accessed as ordinary memory — reading a byte is just a pointer dereference, with the kernel loading pages on demand via page faults. Advantages: no explicit read/write syscalls, no copying between kernel and user buffers, and easy sharing of the same mapped file between processes. It is heavily used by databases and dynamic linkers, though it makes error handling subtler since I/O errors surface as signals rather than return codes.',
      hinglish:
        'mmap ek file ko seedha ek process ke virtual address space mein map karta hai, isliye file ko ordinary memory ki tarah access kiya ja sakta hai — ek byte padhna bas ek pointer dereference hai, kernel page faults ke through on demand pages load karte hue. Advantages: koi explicit read/write syscalls nahi, kernel aur user buffers ke beech koi copying nahi, aur processes ke beech usi mapped file ka easy sharing. Ise databases aur dynamic linkers heavily use karte hain, chahe ye error handling ko subtler bana deta hai kyunki I/O errors return codes ke bajaye signals ke roop mein surface hote hain.',
    },
  },
  {
    question: 'How would you diagnose high CPU usage on a Linux server?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Start with top or htop to identify which PROCESS is consuming CPU. Then determine WHERE the time goes: high "us" (user) time means application code, high "sy" (system) means excessive syscalls, high "wa" (iowait) means it is actually blocked on disk rather than computing, and high "si" means interrupt load. Narrow further with pidstat per thread, strace to see syscall storms, and perf to profile hot functions. Also check load average versus core count to judge whether the machine is genuinely saturated.',
      hinglish:
        'top ya htop se shuru karo ye identify karne ke liye ki kaunsa PROCESS CPU consume kar raha hai. Phir determine karo time KAHAN jaata hai: high "us" (user) time matlab application code, high "sy" (system) matlab excessive syscalls, high "wa" (iowait) matlab ye actually compute karne ke bajaye disk pe blocked hai, aur high "si" matlab interrupt load. Aur narrow karo per thread pidstat se, syscall storms dekhne ke liye strace se, aur hot functions profile karne ke liye perf se. Load average ko core count ke against bhi check karo ye judge karne ke liye ki machine genuinely saturated hai ya nahi.',
    },
  },
  {
    question: 'What is the difference between multiprogramming, multitasking, and multiprocessing?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'MULTIPROGRAMMING keeps several programs in memory so the CPU switches to another whenever the current one blocks on I/O — the goal is maximising CPU UTILISATION. MULTITASKING extends this with time-sharing: the CPU switches rapidly on a timer so many tasks appear to run at once — the goal is RESPONSIVENESS for interactive users. MULTIPROCESSING means genuinely using multiple CPUs/cores to execute instructions simultaneously — the goal is real PARALLELISM. The first two are about clever switching on one CPU; the third is about actually having more CPUs.',
      hinglish:
        'MULTIPROGRAMMING kai programs memory mein rakhta hai taaki CPU doosre pe switch kar jaaye jab current I/O pe block ho — goal CPU UTILISATION maximise karna hai. MULTITASKING ise time-sharing se extend karta hai: CPU ek timer pe rapidly switch karta hai taaki bahut tasks ek saath chalte hue lagein — goal interactive users ke liye RESPONSIVENESS hai. MULTIPROCESSING matlab genuinely multiple CPUs/cores use karke instructions simultaneously execute karna — goal real PARALLELISM hai. Pehle do ek CPU pe clever switching ke baare mein hain; teesra actually zyada CPUs hone ke baare mein.',
    },
  },
  {
    question: 'What is the working set of a process?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'The working set is the collection of pages a process has actively referenced within a recent time window — effectively the memory it genuinely needs right now, as opposed to everything it has allocated. The concept matters because it predicts thrashing: if the sum of all processes\' working sets exceeds physical RAM, they will constantly evict each other\'s needed pages. OS designers use it to decide how many frames to allocate a process and, when memory is scarce, which process to suspend entirely rather than letting everything thrash.',
      hinglish:
        'Working set un pages ka collection hai jinhe ek process ne ek recent time window ke andar actively reference kiya — effectively wo memory jo use abhi genuinely chahiye, us sab ke against jo usne allocate kiya hai. Ye concept isliye matter karta hai kyunki ye thrashing predict karta hai: agar saare processes ke working sets ka sum physical RAM se zyada ho, wo constantly ek doosre ke needed pages evict karenge. OS designers ise decide karne ke liye use karte hain ki ek process ko kitne frames allocate karein aur, jab memory kam ho, kaunse process ko poori tarah suspend karein, sab ko thrash karne dene ke bajaye.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
