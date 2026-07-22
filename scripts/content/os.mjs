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
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
