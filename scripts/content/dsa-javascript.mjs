// DSA in JavaScript curriculum — beginner -> intermediate -> advanced.
// JavaScript-specific, implementation-focused DSA. Same shape as javascript.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'DSA in JavaScript',
  slug: 'dsa-javascript',
  description:
    'Data Structures & Algorithms — but implemented in JavaScript, in depth. Array/Map/Set complexity, class-based structures (linked lists, trees, heaps, graphs), aur JS-specific gotchas. English + Hinglish, desi examples aur full working code ke saath.',
  icon: '🧮',
  tags: ['dsa', 'javascript', 'algorithms', 'data-structures', 'interview'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 11,
};

const beginner = [
  {
    title: 'JavaScript Essentials for DSA',
    level: 'beginner',
    description: 'JS arrays, Map/Set, Big O aur basic structures JS mein.',
    concepts: [
      {
        title: 'JS Arrays as a Data Structure',
        difficulty: 'easy',
        tags: ['array', 'complexity', 'javascript'],
        explanation: {
          english:
            'JavaScript arrays are dynamic (auto-resizing) and can act as a list, stack, or queue. Knowing each method\'s cost is critical for DSA: push/pop at the end are O(1) amortised, but shift/unshift at the front are O(n) because every element re-indexes. splice is O(n) (shifting), slice/concat copy in O(n), and indexOf/includes scan in O(n). Access by index is O(1).',
          hinglish:
            'JavaScript arrays dynamic (auto-resizing) hote hain aur list, stack, ya queue ki tarah kaam kar sakte hain. DSA ke liye har method ka cost jaanna zaroori hai: end pe push/pop O(1) amortised, par front pe shift/unshift O(n) kyunki har element re-index hota hai. splice O(n) (shifting), slice/concat O(n) mein copy, aur indexOf/includes O(n) mein scan. Index se access O(1).',
        },
        dailyLifeExample:
          'Array ke end se push/pop train ke aakhri dabbe se add/remove jaisa hai (easy). Par front se shift karna matlab saare dabbo ke number badalna (mehnga, O(n)).',
        codeExample:
          'const a = [10, 20, 30];\na[1];          // O(1) index access -> 20\na.push(40);    // O(1) amortised (add end)\na.pop();       // O(1) (remove end)\na.unshift(5);  // O(n) — every element shifts right\na.shift();     // O(n) — every element shifts left\na.splice(1, 1);// O(n) — insert/delete middle\na.includes(20);// O(n) — linear scan',
        keyPoints: [
          'Index access: O(1)',
          'push/pop (end): O(1) amortised',
          'shift/unshift (front): O(n) — re-indexing',
          'splice/slice/indexOf: O(n)',
        ],
        quiz: [
          {
            question: 'Why is array.unshift() O(n) in JavaScript?',
            options: ['It sorts the array', 'Every existing element must shift to a new index', 'It copies to disk', 'It is actually O(1)'],
            correctIndex: 1,
          },
          {
            question: 'array.push() at the end is…',
            options: ['O(n)', 'O(1) amortised', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the time complexity of common JavaScript array methods?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Index access and length are O(1). push/pop at the end are O(1) amortised. shift/unshift at the front are O(n) because elements re-index. splice is O(n). slice, concat, spread copy in O(n). indexOf, includes, find, filter, map, forEach, reduce are O(n). sort is O(n log n). Knowing this helps avoid accidental O(n^2) loops (e.g. shift() inside a loop).',
              hinglish:
                'Index access aur length O(1). End pe push/pop O(1) amortised. Front pe shift/unshift O(n) kyunki elements re-index hote hain. splice O(n). slice, concat, spread O(n) mein copy. indexOf, includes, find, filter, map, forEach, reduce O(n). sort O(n log n). Ye jaanne se accidental O(n^2) loops (jaise loop ke andar shift()) avoid hote hain.',
            },
          },
        ],
      },
      {
        title: 'Objects, Map & Set for DSA',
        difficulty: 'medium',
        tags: ['map', 'set', 'object', 'hashing'],
        explanation: {
          english:
            'For O(1) average lookups, use a hash structure. Plain objects ({}) work as string-keyed maps but have prototype keys and only string/symbol keys. Map allows ANY key type (objects, numbers), preserves insertion order, has a .size, and is generally preferred for DSA. Set stores unique values with O(1) has/add — perfect for de-duplication and "seen" checks. Use Map/Set over objects in algorithms.',
          hinglish:
            'O(1) average lookups ke liye hash structure use karo. Plain objects ({}) string-keyed maps ki tarah kaam karte hain par prototype keys hoti hain aur sirf string/symbol keys. Map KISI bhi key type (objects, numbers) allow karta hai, insertion order rakhta hai, .size hai, aur DSA ke liye generally preferred. Set unique values O(1) has/add ke saath — de-duplication aur "seen" checks ke liye perfect. Algorithms mein objects ke bajaye Map/Set use karo.',
        },
        dailyLifeExample:
          'Map ek register jaisa hai jahan koi bhi cheez (number, object) key ho sakti hai. Set ek guest-list jaisa hai jahan har naam ek hi baar.',
        codeExample:
          '// Map — any key type, ordered, O(1) avg\nconst m = new Map();\nm.set("a", 1).set(2, "two");\nm.get("a");      // 1\nm.has(2);        // true\nm.size;          // 2\n\n// Set — unique values\nconst s = new Set([1, 1, 2, 3]); // {1,2,3}\ns.add(4); s.has(2); // true\n[...new Set(arr)];  // de-duplicate an array',
        keyPoints: [
          'Map: any key type, ordered, .size, O(1) avg',
          'Set: unique values, O(1) has/add',
          'Prefer Map/Set over plain objects in algorithms',
          'Objects only have string/symbol keys + prototype keys',
        ],
        quiz: [
          {
            question: 'Which can use an object as a key?',
            options: ['plain object {}', 'Map', 'Array', 'String'],
            correctIndex: 1,
          },
          {
            question: 'The fastest way to remove duplicates from an array is…',
            options: ['nested loops', '[...new Set(arr)]', 'sort then compare', 'JSON.stringify'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Big O of JavaScript Built-ins',
        difficulty: 'medium',
        tags: ['big-o', 'complexity'],
        explanation: {
          english:
            'A hidden O(n) inside a loop creates an accidental O(n^2). Common traps: calling array.includes/indexOf inside a loop (O(n) each), using array.shift() to build a queue (O(n) per call), or spreading/copying arrays repeatedly. Map.get/Set.has are O(1) average — swapping an inner includes() for a Set membership check is the classic optimisation from O(n^2) to O(n).',
          hinglish:
            'Loop ke andar chhupa O(n) accidental O(n^2) bana deta hai. Common traps: loop ke andar array.includes/indexOf (har baar O(n)), queue banane ke liye array.shift() (har call O(n)), ya arrays baar-baar spread/copy karna. Map.get/Set.has O(1) average — inner includes() ko Set membership check se badalna O(n^2) se O(n) wala classic optimisation hai.',
        },
        dailyLifeExample:
          'Har customer ke liye poori list dobara dhoondhna (includes in loop) = bheed mein har baar shuru se ginna. Set rakhna = ek register jisme turant pata chal jaaye.',
        codeExample:
          '// BAD: O(n^2) — includes() scans each time\nfunction firstDupSlow(arr) {\n  for (let i = 0; i < arr.length; i++)\n    if (arr.slice(0, i).includes(arr[i])) return arr[i];\n}\n\n// GOOD: O(n) — Set membership is O(1)\nfunction firstDup(arr) {\n  const seen = new Set();\n  for (const x of arr) { if (seen.has(x)) return x; seen.add(x); }\n}',
        keyPoints: [
          'includes/indexOf inside a loop -> O(n^2)',
          'array.shift() per call is O(n)',
          'Map.get / Set.has are O(1) average',
          'Swap inner scans for a Set to drop to O(n)',
        ],
        quiz: [
          {
            question: 'Calling array.includes() inside a loop over n elements is…',
            options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(1)'],
            correctIndex: 1,
          },
          {
            question: 'To make a membership check O(1), use a…',
            options: ['sorted array', 'Set or Map', 'string', 'nested loop'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Implement a Stack in JavaScript',
        difficulty: 'easy',
        tags: ['stack', 'implementation'],
        explanation: {
          english:
            'A stack is LIFO. The simplest JS stack is an array using push() to add and pop() to remove — both O(1). For a cleaner API (and to guarantee O(1) without relying on array internals), wrap it in a class with push, pop, peek, isEmpty, and size. Stacks power undo, bracket matching, and iterative DFS.',
          hinglish:
            'Stack LIFO hai. Sabse simple JS stack ek array hai jo push() se add aur pop() se remove karta hai — dono O(1). Cleaner API ke liye (aur array internals pe depend kiye bina O(1) guarantee ke liye) ise ek class mein wrap karo push, pop, peek, isEmpty, size ke saath. Stacks undo, bracket matching, aur iterative DFS chalate hain.',
        },
        dailyLifeExample:
          'Stack platon ke dher jaisa hai — upar rakho (push), upar se nikalo (pop). JS array iske liye ready-made hai.',
        codeExample:
          'class Stack {\n  #items = [];\n  push(x) { this.#items.push(x); }      // O(1)\n  pop()   { return this.#items.pop(); }  // O(1)\n  peek()  { return this.#items.at(-1); } // O(1)\n  get size() { return this.#items.length; }\n  isEmpty() { return this.#items.length === 0; }\n}\nconst s = new Stack();\ns.push(1); s.push(2); s.peek(); // 2\ns.pop();                        // 2',
        keyPoints: [
          'LIFO; array push/pop are O(1)',
          'Wrap in a class for a clean API',
          'peek with .at(-1)',
          'Used in undo, brackets, iterative DFS',
        ],
        quiz: [
          {
            question: 'Which array methods naturally implement a stack?',
            options: ['shift/unshift', 'push/pop', 'slice/splice', 'map/filter'],
            correctIndex: 1,
          },
          {
            question: 'A stack is…',
            options: ['FIFO', 'LIFO', 'sorted', 'random'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Implement a Queue in JavaScript',
        difficulty: 'medium',
        tags: ['queue', 'implementation'],
        explanation: {
          english:
            'A queue is FIFO. The naive JS queue uses array.push() to enqueue and array.shift() to dequeue — but shift() is O(n) because it re-indexes every element, so a loop of dequeues becomes O(n^2). For true O(1) dequeue, use a class with an object/array plus two pointers (front and back indices), or a linked list. This matters a lot in BFS over large graphs.',
          hinglish:
            'Queue FIFO hai. Naive JS queue array.push() se enqueue aur array.shift() se dequeue karta hai — par shift() O(n) hai kyunki har element re-index hota hai, isliye dequeues ka loop O(n^2) ban jaata hai. True O(1) dequeue ke liye, ek class use karo object/array plus two pointers (front aur back indices) ke saath, ya linked list. Bade graphs pe BFS mein ye bahut matter karta hai.',
        },
        dailyLifeExample:
          'Queue ticket line jaisi hai (FIFO). Array.shift() se line aage badhana matlab har baar poori line ko ek kadam khiskana — slow. Pointer rakho to bas "front" badal do.',
        codeExample:
          'class Queue {\n  #items = {};\n  #front = 0;\n  #back = 0;\n  enqueue(x) { this.#items[this.#back++] = x; } // O(1)\n  dequeue() {                                    // O(1)\n    if (this.isEmpty()) return undefined;\n    const x = this.#items[this.#front];\n    delete this.#items[this.#front++];\n    return x;\n  }\n  peek() { return this.#items[this.#front]; }\n  isEmpty() { return this.#back === this.#front; }\n  get size() { return this.#back - this.#front; }\n}',
        keyPoints: [
          'FIFO; array.shift() is O(n) (avoid in loops)',
          'Use two pointers (front/back) for O(1) dequeue',
          'Or back it with a linked list',
          'Critical for efficient BFS',
        ],
        quiz: [
          {
            question: 'Why avoid array.shift() for a queue in a tight loop?',
            options: ['It is O(n) each call -> O(n^2) overall', 'It reverses the array', 'It is deprecated', 'It only works on numbers'],
            correctIndex: 0,
          },
          {
            question: 'An O(1) dequeue can be achieved with…',
            options: ['array.shift()', 'two pointers (front/back)', 'array.sort()', 'JSON'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you implement an efficient queue in JavaScript?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Avoid array.shift() (O(n)). Use an object or array as storage with two indices: a front pointer and a back pointer. enqueue writes at back++ in O(1); dequeue reads at front and increments front++ in O(1), optionally deleting the slot to free memory. Alternatively implement it with a singly linked list keeping head and tail references. Both give O(1) enqueue and dequeue, which keeps BFS at O(V + E).',
              hinglish:
                'array.shift() (O(n)) avoid karo. Storage ke liye object ya array use karo do indices ke saath: ek front pointer aur ek back pointer. enqueue back++ pe O(1) mein likhta hai; dequeue front pe read karke front++ O(1) mein, optionally slot delete karke memory free. Ya ise singly linked list se implement karo head aur tail references rakh ke. Dono O(1) enqueue aur dequeue dete hain, jisse BFS O(V + E) rehta hai.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Linked Lists in JavaScript',
    level: 'intermediate',
    description: 'Class-based linked lists JS mein.',
    concepts: [
      {
        title: 'Singly Linked List (Class)',
        difficulty: 'medium',
        tags: ['linked-list', 'implementation'],
        explanation: {
          english:
            'Implement a singly linked list with a Node class (value + next) and a LinkedList class tracking head, tail, and length. Adding at the head or tail is O(1) (with a tail pointer); accessing or inserting at index i is O(n) because you must walk the list. JS has no built-in linked list, so this is a common interview implementation.',
          hinglish:
            'Singly linked list ko ek Node class (value + next) aur ek LinkedList class se implement karo jo head, tail, aur length track kare. Head ya tail pe add O(1) (tail pointer ke saath); index i pe access ya insert O(n) kyunki list pe chalna padta hai. JS mein built-in linked list nahi, isliye ye common interview implementation hai.',
        },
        dailyLifeExample:
          'Singly linked list treasure hunt jaisa hai — har parchi (node) agli ka address (next) deti hai. Tail pointer matlab last parchi ka shortcut.',
        codeExample:
          'class Node { constructor(val) { this.val = val; this.next = null; } }\n\nclass LinkedList {\n  constructor() { this.head = null; this.tail = null; this.length = 0; }\n  push(val) {                       // add at tail — O(1)\n    const node = new Node(val);\n    if (!this.head) this.head = this.tail = node;\n    else { this.tail.next = node; this.tail = node; }\n    this.length++;\n    return this;\n  }\n  get(index) {                      // O(n)\n    let cur = this.head, i = 0;\n    while (cur && i < index) { cur = cur.next; i++; }\n    return cur;\n  }\n}',
        keyPoints: [
          'Node = value + next; list tracks head/tail/length',
          'push at tail: O(1) with a tail pointer',
          'get(index): O(n) — must traverse',
          'No native linked list in JS',
        ],
        quiz: [
          {
            question: 'With a tail pointer, adding at the end of a linked list is…',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
          {
            question: 'Getting the i-th node of a singly linked list is…',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Doubly Linked List (Class)',
        difficulty: 'medium',
        tags: ['linked-list', 'implementation'],
        explanation: {
          english:
            'A doubly linked list node has prev and next pointers, allowing backward traversal and O(1) removal of a known node (you can fix neighbours without finding the predecessor). The trade-off is extra memory and more pointer updates per operation. It is the backbone of an LRU cache when paired with a Map.',
          hinglish:
            'Doubly linked list node mein prev aur next pointers hote hain, jisse backward traversal aur known node ka O(1) removal possible (neighbours ko bina predecessor dhoondhe fix kar sakte ho). Trade-off: extra memory aur har operation mein zyada pointer updates. Map ke saath ye LRU cache ka backbone hai.',
        },
        dailyLifeExample:
          'Doubly linked list metro line jaisi hai — dono direction mein jaana possible, har station agle aur pichhle ko jaanta hai.',
        codeExample:
          'class DNode {\n  constructor(val) { this.val = val; this.prev = null; this.next = null; }\n}\n// O(1) removal given the node reference\nfunction remove(list, node) {\n  if (node.prev) node.prev.next = node.next; else list.head = node.next;\n  if (node.next) node.next.prev = node.prev; else list.tail = node.prev;\n  list.length--;\n}',
        keyPoints: [
          'Node has prev + next',
          'Backward traversal possible',
          'O(1) removal of a known node',
          'Used in LRU cache (with a Map)',
        ],
        quiz: [
          {
            question: 'A doubly linked list adds which pointer over a singly linked list?',
            options: ['next', 'prev', 'head', 'tail'],
            correctIndex: 1,
          },
          {
            question: 'Removing a known node from a doubly linked list is…',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Patterns in JavaScript',
    level: 'intermediate',
    description: 'Frequency counter, two pointers aur sliding window JS mein.',
    concepts: [
      {
        title: 'Frequency Counter Pattern',
        difficulty: 'medium',
        tags: ['hashing', 'pattern', 'map'],
        explanation: {
          english:
            'The frequency counter pattern uses a Map (or object) to count occurrences, turning many O(n^2) comparison problems into O(n). Build a count of one input, then check the other against it. Classic uses: anagram check, "is one array a squared version of another", and counting duplicates. It trades O(n) space for big time savings.',
          hinglish:
            'Frequency counter pattern ek Map (ya object) se occurrences count karta hai, kai O(n^2) comparison problems ko O(n) bana ke. Ek input ka count banao, phir doosre ko uske against check karo. Classic uses: anagram check, "ek array doosre ka squared version hai kya", aur duplicates count. Ye O(n) space deke bada time bachata hai.',
        },
        dailyLifeExample:
          'Frequency counter election ke vote-count jaisa hai — har candidate ke votes ginlo (Map mein), phir compare karo. Dobara-dobara ginne ki zaroorat nahi.',
        codeExample:
          '// Anagram check — O(n)\nfunction isAnagram(a, b) {\n  if (a.length !== b.length) return false;\n  const count = new Map();\n  for (const ch of a) count.set(ch, (count.get(ch) || 0) + 1);\n  for (const ch of b) {\n    if (!count.get(ch)) return false;\n    count.set(ch, count.get(ch) - 1);\n  }\n  return true;\n}',
        keyPoints: [
          'Count occurrences in a Map/object',
          'Compare two inputs by their counts',
          'Turns O(n^2) compare into O(n)',
          'Anagrams, duplicates, matching problems',
        ],
        quiz: [
          {
            question: 'The frequency counter pattern primarily uses a…',
            options: ['stack', 'Map/object of counts', 'binary tree', 'queue'],
            correctIndex: 1,
          },
          {
            question: 'It typically improves time complexity from O(n^2) to…',
            options: ['O(n^3)', 'O(n)', 'O(2^n)', 'no change'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Two Pointers & Sliding Window in JS',
        difficulty: 'medium',
        tags: ['two-pointers', 'sliding-window', 'pattern'],
        explanation: {
          english:
            'Two pointers use two indices (often both ends, or slow/fast) to solve problems in O(n) without extra space — pair sums in sorted arrays, palindromes, in-place dedup. Sliding window maintains a moving range and updates incrementally — max sum of k elements (fixed window) or longest substring without repeats (variable window with a Set/Map). Both are interview staples in JavaScript.',
          hinglish:
            'Two pointers do indices use karte hain (aksar dono ends, ya slow/fast) taaki problems O(n) mein bina extra space solve hon — sorted arrays mein pair sums, palindromes, in-place dedup. Sliding window ek moving range maintain karta hai aur incrementally update karta hai — k elements ka max sum (fixed window) ya longest substring without repeats (Set/Map ke saath variable window). Dono JavaScript mein interview staples hain.',
        },
        dailyLifeExample:
          'Two pointers do log kitaab ke dono sirhon se padhna jaisa. Sliding window chalti train ki khidki — view slide hota hai, poora raasta dobara nahi dekhte.',
        codeExample:
          '// Longest substring without repeats — variable sliding window, O(n)\nfunction longestUnique(s) {\n  const seen = new Set();\n  let left = 0, best = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (seen.has(s[right])) seen.delete(s[left++]); // shrink\n    seen.add(s[right]);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}',
        keyPoints: [
          'Two pointers: O(n), O(1) space',
          'Sliding window: fixed or variable size',
          'Variable window often pairs with a Set/Map',
          'Avoid recomputing — update incrementally',
        ],
        quiz: [
          {
            question: '"Longest substring without repeating characters" uses a…',
            options: ['fixed window', 'variable sliding window', 'stack', 'heap'],
            correctIndex: 1,
          },
          {
            question: 'Two pointers typically use how much extra space?',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Recursion & Sorting in JavaScript',
    level: 'intermediate',
    description: 'Recursion, call stack aur sorting JS mein.',
    concepts: [
      {
        title: 'Recursion & the Call Stack in JS',
        difficulty: 'medium',
        tags: ['recursion', 'call-stack'],
        explanation: {
          english:
            'Each recursive call pushes a frame onto the JavaScript call stack; too many frames throw "Maximum call stack size exceeded" (typically ~10k-15k deep). JavaScript engines do NOT reliably optimise tail calls, so deep recursion should be rewritten iteratively (with an explicit stack) for large inputs. Recursion is still ideal for trees and divide-and-conquer where depth is O(log n).',
          hinglish:
            'Har recursive call JavaScript call stack pe ek frame push karti hai; bahut zyada frames "Maximum call stack size exceeded" throw karte hain (aksar ~10k-15k deep). JavaScript engines tail calls ko reliably optimise NAHI karte, isliye bade inputs ke liye deep recursion ko iteratively (explicit stack se) rewrite karna chahiye. Recursion ab bhi trees aur divide-and-conquer ke liye ideal hai jahan depth O(log n) ho.',
        },
        dailyLifeExample:
          'Call stack platon ka dher hai — har function call ek plate. Bahut plates (deep recursion) lag jaayein to dher gir jaata hai (stack overflow).',
        codeExample:
          '// Recursive — clean but stack-limited\nfunction sumTo(n) { return n <= 0 ? 0 : n + sumTo(n - 1); }\n// sumTo(100000) -> RangeError: Maximum call stack size exceeded\n\n// Iterative — safe for large n\nfunction sumToIter(n) { let s = 0; for (let i = 1; i <= n; i++) s += i; return s; }',
        keyPoints: [
          'Each call adds a call-stack frame',
          'Deep recursion -> "Maximum call stack size exceeded"',
          'JS does not reliably do tail-call optimisation',
          'Rewrite deep recursion iteratively for large inputs',
        ],
        quiz: [
          {
            question: 'What error does excessive recursion throw in JS?',
            options: ['TypeError', 'Maximum call stack size exceeded', 'SyntaxError', 'OutOfMemory'],
            correctIndex: 1,
          },
          {
            question: 'For very deep computations on large inputs, you should…',
            options: ['recurse harder', 'rewrite iteratively with an explicit stack', 'use more memory', 'ignore it'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Merge Sort in JavaScript',
        difficulty: 'medium',
        tags: ['sorting', 'divide-and-conquer'],
        explanation: {
          english:
            'Merge sort recursively splits the array, sorts halves, and merges them. It is guaranteed O(n log n) and stable, but uses O(n) extra space. It is a great example of divide-and-conquer in JS and is worth implementing by hand to understand the merge step (comparing two sorted arrays and picking the smaller front each time).',
          hinglish:
            'Merge sort array ko recursively split karta hai, halves sort karta hai, aur merge karta hai. Ye guaranteed O(n log n) aur stable hai, par O(n) extra space leta hai. JS mein divide-and-conquer ka achha example hai aur merge step samajhne ke liye haath se implement karna worth hai (do sorted arrays compare karke har baar chhota front uthana).',
        },
        dailyLifeExample:
          'Do already-sorted dher ko ek mein milana — dono ke top compare karo, chhota uthao, repeat. Yahi merge hai.',
        codeExample:
          'function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = arr.length >> 1;\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  const res = []; let i = 0, j = 0;\n  while (i < left.length && j < right.length)\n    res.push(left[i] <= right[j] ? left[i++] : right[j++]);\n  while (i < left.length) res.push(left[i++]);\n  while (j < right.length) res.push(right[j++]);\n  return res;\n}',
        keyPoints: [
          'Divide -> sort halves -> merge',
          'Always O(n log n), stable',
          'O(n) extra space',
          'Great divide-and-conquer practice',
        ],
        quiz: [
          {
            question: 'Merge sort is always…',
            options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
            correctIndex: 1,
          },
          {
            question: 'Merge sort extra space is…',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Quick Sort in JavaScript',
        difficulty: 'hard',
        tags: ['sorting', 'divide-and-conquer'],
        explanation: {
          english:
            'Quick sort picks a pivot, partitions into smaller/larger, and recurses. Average O(n log n) and in-place (with the Lomuto/Hoare partition), but worst case O(n^2) with bad pivots — randomise the pivot to avoid it. It is not stable. The clean (non-in-place) version below is easy to read; the in-place version swaps within the array for O(log n) extra space.',
          hinglish:
            'Quick sort ek pivot chunta hai, smaller/larger mein partition karta hai, aur recurse karta hai. Average O(n log n) aur in-place (Lomuto/Hoare partition ke saath), par bad pivots pe worst case O(n^2) — pivot randomise karke bacho. Ye stable nahi. Neeche wala clean (non-in-place) version padhne mein easy; in-place version array ke andar swap karta hai O(log n) extra space ke liye.',
        },
        dailyLifeExample:
          'Class ko height se baantna — ek banda (pivot) chuno, chhote ek taraf, bade doosri, phir dono groups mein wahi dohrao.',
        codeExample:
          'function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const less = [], more = [];\n  for (let i = 0; i < arr.length - 1; i++)\n    (arr[i] < pivot ? less : more).push(arr[i]);\n  return [...quickSort(less), pivot, ...quickSort(more)];\n}',
        keyPoints: [
          'Pivot + partition + recurse',
          'Average O(n log n), worst O(n^2)',
          'Randomise pivot to avoid worst case',
          'Not stable (unlike merge sort)',
        ],
        quiz: [
          {
            question: "Quick sort's worst case occurs with…",
            options: ['random data', 'consistently bad pivots', 'tiny arrays', 'duplicate values'],
            correctIndex: 1,
          },
          {
            question: 'Quick sort average time complexity is…',
            options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Array.prototype.sort() Gotchas',
        difficulty: 'medium',
        tags: ['sorting', 'javascript', 'gotcha'],
        explanation: {
          english:
            'JavaScript\'s built-in sort() has surprising defaults: with no comparator it converts elements to strings and sorts lexicographically — so [10, 2, 1] becomes [1, 10, 2]! Always pass a comparator: (a, b) => a - b for ascending numbers. sort() mutates the original array (use [...arr].sort() to avoid). Modern engines make it stable. The comparator must return a number (negative, 0, positive).',
          hinglish:
            'JavaScript ka built-in sort() ke surprising defaults hain: bina comparator ke ye elements ko strings mein convert karke lexicographically sort karta hai — to [10, 2, 1] ban jaata hai [1, 10, 2]! Hamesha comparator do: ascending numbers ke liye (a, b) => a - b. sort() original array ko mutate karta hai ([...arr].sort() se bacho). Modern engines ise stable banate hain. Comparator ko ek number return karna chahiye (negative, 0, positive).',
        },
        dailyLifeExample:
          'Bina comparator sort() roll-numbers ko naam (string) maan ke lagana jaisa hai — "10" se "2" pehle aa jaata hai kyunki "1" < "2". Comparator dena = "inhe numbers ki tarah lagao".',
        codeExample:
          '[10, 2, 1].sort();            // [1, 10, 2]  — WRONG (lexicographic)\n[10, 2, 1].sort((a, b) => a - b); // [1, 2, 10] — correct ascending\n[10, 2, 1].sort((a, b) => b - a); // [10, 2, 1] — descending\n\n// sort() mutates; copy first to keep the original:\nconst sorted = [...arr].sort((a, b) => a - b);',
        keyPoints: [
          'Default sort is lexicographic (string) — surprising for numbers',
          'Pass (a, b) => a - b for numeric ascending',
          'sort() mutates the array (copy with [...arr])',
          'Comparator returns negative / 0 / positive',
        ],
        quiz: [
          {
            question: 'What does [10, 2, 1].sort() return?',
            options: ['[1, 2, 10]', '[1, 10, 2]', '[10, 2, 1]', '[2, 1, 10]'],
            correctIndex: 1,
          },
          {
            question: 'Correct comparator for ascending numbers is…',
            options: ['(a, b) => a > b', '(a, b) => a - b', '(a, b) => b', '(a, b) => a + b'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the default behaviour of JavaScript Array.sort() and why is it a common bug?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Without a comparator, sort() converts each element to a string and sorts by UTF-16 code units (lexicographically). So [10, 2, 1] becomes [1, 10, 2] because "10" < "2" as strings. The fix is to pass a comparator like (a, b) => a - b for numbers. Also note sort() mutates the array in place and returns it, so copy with [...arr] if you need the original.',
              hinglish:
                'Bina comparator ke, sort() har element ko string mein convert karke UTF-16 code units (lexicographically) se sort karta hai. To [10, 2, 1] ban jaata hai [1, 10, 2] kyunki strings mein "10" < "2". Fix: numbers ke liye (a, b) => a - b jaisa comparator do. Aur dhyan: sort() array ko in place mutate karke return karta hai, isliye original chahiye to [...arr] se copy karo.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Searching in JavaScript',
    level: 'intermediate',
    description: 'Binary search JS mein.',
    concepts: [
      {
        title: 'Binary Search in JavaScript',
        difficulty: 'medium',
        tags: ['searching', 'binary-search'],
        explanation: {
          english:
            'Binary search finds a target in a sorted array in O(log n) by repeatedly halving the range. In JavaScript, compute the midpoint as lo + ((hi - lo) >> 1) (the >> 1 floors the division). Watch the loop condition (lo <= hi) and the bound updates (lo = mid + 1 / hi = mid - 1) to avoid infinite loops. Many problems reduce to a binary search on a sorted array or on the answer range.',
          hinglish:
            'Binary search sorted array mein target ko O(log n) mein dhoondhta hai range ko baar-baar aadha karke. JavaScript mein midpoint lo + ((hi - lo) >> 1) se compute karo (>> 1 division ko floor karta hai). Loop condition (lo <= hi) aur bound updates (lo = mid + 1 / hi = mid - 1) ka dhyan rakho taaki infinite loop na ho. Bahut problems ek sorted array ya answer range pe binary search mein reduce hoti hain.',
        },
        dailyLifeExample:
          'Dictionary mein shabd dhoondhna — beech mein kholo, aage/peeche decide karo, har step mein aadhi dictionary chhod do.',
        codeExample:
          'function binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = lo + ((hi - lo) >> 1); // avoids overflow, floors\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) lo = mid + 1; // search right\n    else hi = mid - 1;                   // search left\n  }\n  return -1;\n}',
        keyPoints: [
          'Sorted array, O(log n)',
          'mid = lo + ((hi - lo) >> 1)',
          'Condition lo <= hi; update lo=mid+1 / hi=mid-1',
          'Many problems = binary search on array or answer',
        ],
        quiz: [
          {
            question: 'Binary search requires the array to be…',
            options: ['unsorted', 'sorted', 'unique', 'numeric only'],
            correctIndex: 1,
          },
          {
            question: 'Why use lo + ((hi - lo) >> 1) for mid?',
            options: ['It is shorter', 'Avoids potential overflow and floors the result', 'It sorts faster', 'No reason'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Trees in JavaScript',
    level: 'advanced',
    description: 'Binary tree, BST aur heap JS mein implement karna.',
    concepts: [
      {
        title: 'Binary Tree & Traversals (Recursive + Iterative)',
        difficulty: 'medium',
        tags: ['tree', 'traversal', 'dfs', 'bfs'],
        explanation: {
          english:
            'A binary tree node holds a value and left/right children. DFS traversals (preorder, inorder, postorder) are naturally recursive but can be done iteratively with an explicit stack to avoid deep recursion. BFS (level-order) uses a queue. In JavaScript, prefer an O(1) queue (two pointers) for BFS on large trees instead of array.shift().',
          hinglish:
            'Binary tree node ek value aur left/right children rakhta hai. DFS traversals (preorder, inorder, postorder) naturally recursive hain par deep recursion avoid karne ke liye explicit stack se iteratively bhi ho sakte hain. BFS (level-order) queue use karta hai. JavaScript mein bade trees pe BFS ke liye array.shift() ke bajaye O(1) queue (two pointers) prefer karo.',
        },
        dailyLifeExample:
          'Tree org-chart jaisa hai. Inorder/preorder/postorder matlab employees se milne ka order. BFS matlab level-by-level (pehle managers, phir unki teams).',
        codeExample:
          'class TreeNode { constructor(v) { this.val = v; this.left = this.right = null; } }\n\n// Recursive inorder\nfunction inorder(node, out = []) {\n  if (!node) return out;\n  inorder(node.left, out); out.push(node.val); inorder(node.right, out);\n  return out;\n}\n\n// Iterative BFS (level-order)\nfunction bfs(root) {\n  if (!root) return [];\n  const out = [], q = [root]; let i = 0;\n  while (i < q.length) {\n    const node = q[i++];\n    out.push(node.val);\n    if (node.left) q.push(node.left);\n    if (node.right) q.push(node.right);\n  }\n  return out;\n}',
        keyPoints: [
          'Node: value + left/right',
          'DFS: pre/in/post (recursive or stack)',
          'BFS: level-order with a queue',
          'Use an O(1) queue for large-tree BFS',
        ],
        quiz: [
          {
            question: 'Which traversal gives sorted output on a BST?',
            options: ['preorder', 'inorder', 'postorder', 'level-order'],
            correctIndex: 1,
          },
          {
            question: 'Level-order (BFS) traversal uses a…',
            options: ['stack', 'queue', 'heap', 'set'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Binary Search Tree (Class)',
        difficulty: 'medium',
        tags: ['tree', 'bst', 'implementation'],
        explanation: {
          english:
            'A BST keeps left < node < right, giving O(h) insert/search where h is height — O(log n) when balanced, O(n) when skewed (e.g. inserting sorted values). Implement insert and search iteratively by walking left or right based on the comparison. JavaScript has no built-in BST, so this is a frequent implementation question; production code often uses a balanced tree or a Map instead.',
          hinglish:
            'BST left < node < right rakhta hai, O(h) insert/search deta hai jahan h height — balanced pe O(log n), skewed pe O(n) (jaise sorted values insert). insert aur search ko iteratively implement karo comparison ke hisaab se left ya right chal ke. JavaScript mein built-in BST nahi, isliye ye frequent implementation question hai; production code aksar balanced tree ya Map use karta hai.',
        },
        dailyLifeExample:
          'BST guess-the-number jaisa hai — "bada ya chhota?" Har jawab pe aadhe options hat jaate hain (balanced hone par).',
        codeExample:
          'class BST {\n  constructor() { this.root = null; }\n  insert(val) {\n    const node = { val, left: null, right: null };\n    if (!this.root) { this.root = node; return; }\n    let cur = this.root;\n    while (true) {\n      if (val < cur.val) { if (!cur.left) { cur.left = node; return; } cur = cur.left; }\n      else { if (!cur.right) { cur.right = node; return; } cur = cur.right; }\n    }\n  }\n  search(val) {\n    let cur = this.root;\n    while (cur) { if (val === cur.val) return true; cur = val < cur.val ? cur.left : cur.right; }\n    return false;\n  }\n}',
        keyPoints: [
          'left < node < right',
          'insert/search: O(h)',
          'Balanced O(log n); skewed O(n)',
          'No native BST in JS',
        ],
        quiz: [
          {
            question: 'A BST becomes O(n) per operation when it is…',
            options: ['balanced', 'skewed (line-like)', 'empty', 'a heap'],
            correctIndex: 1,
          },
          {
            question: 'In a BST, you go left when the target is…',
            options: ['larger', 'smaller than the node', 'equal', 'null'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Min-Heap / Priority Queue (Class)',
        difficulty: 'hard',
        tags: ['heap', 'priority-queue', 'implementation'],
        explanation: {
          english:
            'JavaScript has no built-in heap, so for Dijkstra, top-k, and scheduling you implement a binary heap on an array. For index i: parent = (i-1)>>1, children = 2i+1 and 2i+2. push appends then "bubbles up"; pop swaps root with last, removes it, then "sifts down". Both are O(log n); peek is O(1). This min-heap is the core of an efficient priority queue.',
          hinglish:
            'JavaScript mein built-in heap nahi, isliye Dijkstra, top-k, aur scheduling ke liye tum array pe binary heap implement karte ho. Index i ke liye: parent = (i-1)>>1, children = 2i+1 aur 2i+2. push append karke "bubble up" karta hai; pop root ko last se swap karke remove karta hai phir "sift down". Dono O(log n); peek O(1). Ye min-heap ek efficient priority queue ka core hai.',
        },
        dailyLifeExample:
          'Min-heap hospital triage jaisa hai — sabse urgent (smallest) hamesha top pe, turant accessible. Naya patient apni jagah settle ho jaata hai.',
        codeExample:
          'class MinHeap {\n  constructor() { this.h = []; }\n  peek() { return this.h[0]; }\n  push(v) {\n    this.h.push(v); let i = this.h.length - 1;\n    while (i > 0) { const p = (i - 1) >> 1; if (this.h[p] <= this.h[i]) break; [this.h[p], this.h[i]] = [this.h[i], this.h[p]]; i = p; }\n  }\n  pop() {\n    const top = this.h[0], last = this.h.pop();\n    if (this.h.length) { this.h[0] = last; this.#siftDown(0); }\n    return top;\n  }\n  #siftDown(i) {\n    const n = this.h.length;\n    while (true) {\n      let small = i, l = 2 * i + 1, r = 2 * i + 2;\n      if (l < n && this.h[l] < this.h[small]) small = l;\n      if (r < n && this.h[r] < this.h[small]) small = r;\n      if (small === i) break;\n      [this.h[i], this.h[small]] = [this.h[small], this.h[i]]; i = small;\n    }\n  }\n}',
        keyPoints: [
          'No native heap in JS — build on an array',
          'parent=(i-1)>>1, children=2i+1 / 2i+2',
          'push bubbles up; pop sifts down — O(log n)',
          'peek O(1); core of a priority queue',
        ],
        quiz: [
          {
            question: 'For node at index i in an array heap, the left child index is…',
            options: ['i - 1', '2i + 1', 'i / 2', 'i + 1'],
            correctIndex: 1,
          },
          {
            question: 'Heap push and pop are…',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'JavaScript has no built-in priority queue — how would you build one?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Implement a binary heap on an array. Store elements so the parent of index i is (i-1)>>1 and children are 2i+1 and 2i+2. push() appends and bubbles the element up while it is smaller than its parent (min-heap); pop() saves the root, moves the last element to the root, and sifts it down to the smaller child until the heap property holds. peek() is O(1); push/pop are O(log n). For custom priorities, store [priority, value] pairs or pass a comparator.',
              hinglish:
                'Array pe ek binary heap implement karo. Elements aise store karo ki index i ka parent (i-1)>>1 ho aur children 2i+1 aur 2i+2. push() append karke element ko upar bubble karta hai jab tak wo apne parent se chhota ho (min-heap); pop() root save karke last element ko root pe le aata hai aur use smaller child ki taraf sift-down karta hai jab tak heap property na bane. peek() O(1); push/pop O(log n). Custom priorities ke liye [priority, value] pairs store karo ya comparator do.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Graphs in JavaScript',
    level: 'advanced',
    description: 'Adjacency list, BFS/DFS aur Dijkstra JS mein.',
    concepts: [
      {
        title: 'Graph with Adjacency List (Map)',
        difficulty: 'medium',
        tags: ['graph', 'implementation'],
        explanation: {
          english:
            'Represent a graph in JavaScript with a Map from each node to an array (or Set) of its neighbours — O(V + E) space, ideal for sparse graphs. For weighted graphs store [neighbour, weight] pairs. A Map handles any node type as a key and keeps the API clean. This adjacency list is the base for BFS, DFS, and Dijkstra.',
          hinglish:
            'JavaScript mein graph ko ek Map se represent karo jahan har node uske neighbours ke array (ya Set) se map ho — O(V + E) space, sparse graphs ke liye ideal. Weighted graphs ke liye [neighbour, weight] pairs store karo. Map kisi bhi node type ko key ki tarah handle karta hai aur API saaf rakhta hai. Ye adjacency list BFS, DFS, aur Dijkstra ki base hai.',
        },
        dailyLifeExample:
          'Adjacency list ek city map jaisa hai — har sheher (node) ke saath uske direct-connected sheheron (neighbours) ki list.',
        codeExample:
          'class Graph {\n  constructor() { this.adj = new Map(); }\n  addNode(v) { if (!this.adj.has(v)) this.adj.set(v, []); }\n  addEdge(u, v) {            // undirected\n    this.addNode(u); this.addNode(v);\n    this.adj.get(u).push(v);\n    this.adj.get(v).push(u);\n  }\n  neighbours(v) { return this.adj.get(v) || []; }\n}',
        keyPoints: [
          'Map: node -> array/Set of neighbours',
          'O(V + E) space (sparse-friendly)',
          'Weighted: store [neighbour, weight]',
          'Base for BFS/DFS/Dijkstra',
        ],
        quiz: [
          {
            question: 'An adjacency list in JS is naturally a…',
            options: ['2D array always', 'Map of node -> neighbours', 'single string', 'stack'],
            correctIndex: 1,
          },
          {
            question: 'Adjacency list space complexity is…',
            options: ['O(V^2)', 'O(V + E)', 'O(1)', 'O(E^2)'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'BFS & DFS in JavaScript',
        difficulty: 'medium',
        tags: ['graph', 'bfs', 'dfs'],
        explanation: {
          english:
            'BFS explores level by level with a queue and a visited Set — it finds the shortest path in unweighted graphs. DFS goes deep with recursion or an explicit stack plus a visited Set — used for components, cycle detection, and path existence. Both are O(V + E). Always track visited to avoid infinite loops on cyclic graphs.',
          hinglish:
            'BFS queue aur visited Set se level-by-level explore karta hai — unweighted graphs mein shortest path deta hai. DFS recursion ya explicit stack plus visited Set se gehrai mein jaata hai — components, cycle detection, aur path existence ke liye. Dono O(V + E). Cyclic graphs pe infinite loops avoid karne ke liye hamesha visited track karo.',
        },
        dailyLifeExample:
          'BFS talaab mein pathar ki lehrein (paas wale pehle). DFS bhulbhulaiya mein ek raasta poora andar tak phir backtrack.',
        codeExample:
          'function bfs(graph, start) {\n  const visited = new Set([start]), q = [start], order = []; let i = 0;\n  while (i < q.length) {\n    const node = q[i++];\n    order.push(node);\n    for (const nb of graph.neighbours(node))\n      if (!visited.has(nb)) { visited.add(nb); q.push(nb); }\n  }\n  return order;\n}\nfunction dfs(graph, node, visited = new Set(), order = []) {\n  visited.add(node); order.push(node);\n  for (const nb of graph.neighbours(node))\n    if (!visited.has(nb)) dfs(graph, nb, visited, order);\n  return order;\n}',
        keyPoints: [
          'BFS: queue + visited -> shortest path (unweighted)',
          'DFS: recursion/stack + visited',
          'Both O(V + E)',
          'Track visited to avoid cycles looping forever',
        ],
        quiz: [
          {
            question: 'BFS finds the shortest path in a/an…',
            options: ['weighted graph', 'unweighted graph', 'negative graph', 'tree only'],
            correctIndex: 1,
          },
          {
            question: 'What prevents BFS/DFS from looping forever on a cyclic graph?',
            options: ['sorting', 'a visited set', 'recursion', 'a heap'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: "Dijkstra's Algorithm in JavaScript",
        difficulty: 'hard',
        tags: ['graph', 'dijkstra', 'shortest-path'],
        explanation: {
          english:
            "Dijkstra finds shortest paths from a source in a weighted graph with non-negative edges. Keep a dist map (Infinity by default, 0 at source) and a min-heap priority queue of [distance, node]. Repeatedly pop the nearest node and relax its neighbours: if dist[u] + weight < dist[v], update dist[v] and push it. With a heap it is O((V + E) log V). Use Bellman-Ford for negative weights.",
          hinglish:
            "Dijkstra non-negative edges wale weighted graph mein source se shortest paths dhoondhta hai. Ek dist map rakho (default Infinity, source pe 0) aur [distance, node] ka min-heap priority queue. Baar-baar nearest node pop karke uske neighbours relax karo: agar dist[u] + weight < dist[v], dist[v] update karke push karo. Heap ke saath ye O((V + E) log V). Negative weights ke liye Bellman-Ford use karo.",
        },
        dailyLifeExample:
          'Dijkstra Google Maps jaisa hai — har road ka time (weight) dekh kar sabse kam time wala raasta, hamesha abhi tak ke nearest point se aage badhte hue.',
        codeExample:
          '// Needs a MinHeap keyed by distance (see Min-Heap concept)\nfunction dijkstra(graph, source) {\n  const dist = new Map();\n  for (const v of graph.adj.keys()) dist.set(v, Infinity);\n  dist.set(source, 0);\n  const pq = new MinHeapPairs(); // stores [distance, node]\n  pq.push([0, source]);\n  while (pq.size) {\n    const [d, u] = pq.pop();\n    if (d > dist.get(u)) continue;            // stale entry\n    for (const [v, w] of graph.neighbours(u)) {\n      if (d + w < dist.get(v)) { dist.set(v, d + w); pq.push([d + w, v]); }\n    }\n  }\n  return dist;\n}',
        keyPoints: [
          'Shortest path, non-negative weights',
          'dist map + min-heap of [distance, node]',
          'Relax neighbours; skip stale heap entries',
          'O((V + E) log V); negatives -> Bellman-Ford',
        ],
        quiz: [
          {
            question: "Dijkstra's priority queue is ordered by…",
            options: ['node id', 'current shortest distance', 'insertion order', 'alphabetical'],
            correctIndex: 1,
          },
          {
            question: "Dijkstra fails when edges can be…",
            options: ['large', 'negative', 'zero', 'equal'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Dynamic Programming in JavaScript',
    level: 'advanced',
    description: 'Memoization aur tabulation JS mein.',
    concepts: [
      {
        title: 'Memoization in JavaScript',
        difficulty: 'hard',
        tags: ['dp', 'memoization', 'closures'],
        explanation: {
          english:
            'Memoization caches results of expensive function calls by their arguments. In JavaScript you implement it with a Map (or object) — often inside a closure so the cache persists across calls and stays private. A generic memoize() higher-order function wraps any pure function and keys the cache by JSON.stringify(args). This turns exponential recursion (like naive Fibonacci) into linear time.',
          hinglish:
            'Memoization mehnge function calls ke results ko unke arguments ke hisaab se cache karta hai. JavaScript mein tum ise Map (ya object) se implement karte ho — aksar ek closure ke andar taaki cache calls ke beech persist kare aur private rahe. Ek generic memoize() higher-order function kisi bhi pure function ko wrap karta hai aur cache ko JSON.stringify(args) se key karta hai. Ye exponential recursion (jaise naive Fibonacci) ko linear time bana deta hai.',
        },
        dailyLifeExample:
          'Memoization ready notes jaise hain — ek baar solve kiya sawaal dobara aaye to seedha saved answer, dobara mehnat nahi.',
        codeExample:
          '// Generic memoize using a closure + Map\nfunction memoize(fn) {\n  const cache = new Map();\n  return function (...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\n// Fibonacci: O(2^n) -> O(n)\nconst fib = memoize((n) => (n < 2 ? n : fib(n - 1) + fib(n - 2)));\nfib(50); // fast',
        keyPoints: [
          'Cache results keyed by arguments',
          'Use a Map inside a closure (private, persistent)',
          'Generic memoize() wraps any pure function',
          'Exponential recursion -> linear time',
        ],
        quiz: [
          {
            question: 'Memoization in JS typically caches results in a…',
            options: ['stack', 'Map/object (often in a closure)', 'queue', 'heap'],
            correctIndex: 1,
          },
          {
            question: 'Memoizing naive Fibonacci changes it from O(2^n) to…',
            options: ['O(1)', 'O(n)', 'O(n^2)', 'O(log n)'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Tabulation in JavaScript',
        difficulty: 'hard',
        tags: ['dp', 'tabulation'],
        explanation: {
          english:
            'Tabulation is bottom-up DP: build an array (the table) from the base cases upward, so each entry uses already-computed smaller entries — no recursion, no call-stack risk. It is often more memory- and cache-friendly than memoization. When each state depends only on a few previous entries, you can reduce the table to O(1)/O(k) space (rolling variables).',
          hinglish:
            'Tabulation bottom-up DP hai: base cases se upar ek array (table) banao, taaki har entry already-computed chhoti entries use kare — no recursion, no call-stack risk. Ye aksar memoization se zyada memory- aur cache-friendly hai. Jab har state sirf kuch previous entries pe depend kare, tum table ko O(1)/O(k) space mein reduce kar sakte ho (rolling variables).',
        },
        dailyLifeExample:
          'Tabulation seedhi (ladder) chadhne jaisa hai — neeche se ek-ek step build karo. Har step pichhle steps pe khada hota hai, koi recursion nahi.',
        codeExample:
          '// Climbing stairs: ways to reach step n (1 or 2 at a time)\nfunction climbStairs(n) {\n  if (n <= 2) return n;\n  const dp = [0, 1, 2];\n  for (let i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];\n  return dp[n];\n}\n\n// Space-optimised to O(1) with rolling variables\nfunction climbStairsO1(n) {\n  let a = 1, b = 2;\n  if (n <= 2) return n;\n  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];\n  return b;\n}',
        keyPoints: [
          'Bottom-up: fill a table from base cases',
          'No recursion / call-stack risk',
          'Often more cache-friendly than memoization',
          'Reduce to O(1)/O(k) space with rolling variables',
        ],
        quiz: [
          {
            question: 'Tabulation builds the solution…',
            options: ['top-down via recursion', 'bottom-up via a table', 'randomly', 'with a heap'],
            correctIndex: 1,
          },
          {
            question: 'An advantage of tabulation over memoization is…',
            options: ['shorter code always', 'no call-stack/recursion risk', 'it is always O(1)', 'it needs no base case'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'Does JavaScript have built-in data structures for stacks, queues, heaps, and trees?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Partly. Arrays serve as stacks (push/pop, O(1)) and can act as queues (but shift() is O(n) — use two pointers or a linked list for O(1)). Map and Set are built-in hash structures with O(1) average operations. However, there is NO built-in heap/priority queue, balanced BST, or graph — you implement those yourself (heap on an array, graph as a Map adjacency list), which is exactly what many interviews test.',
      hinglish:
        'Partly. Arrays stacks ki tarah kaam karte hain (push/pop, O(1)) aur queues ki tarah bhi (par shift() O(n) hai — O(1) ke liye two pointers ya linked list). Map aur Set built-in hash structures hain O(1) average operations ke saath. Lekin koi built-in heap/priority queue, balanced BST, ya graph NAHI — wo tum khud implement karte ho (array pe heap, Map adjacency list pe graph), jo aksar interviews test karte hain.',
    },
  },
  {
    question: 'How do closures help implement data structures and algorithms in JavaScript?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A closure lets an inner function remember variables from its defining scope even after that scope returns. This is used to create private state — e.g. a memoization cache that persists across calls but is hidden from the outside, a counter/ID generator, or a module that exposes only specific methods. Combined with a Map, closures give clean, encapsulated implementations of memoizers, iterators, and stateful helpers.',
      hinglish:
        'Closure ek inner function ko apne defining scope ke variables yaad rakhne deta hai, us scope ke return hone ke baad bhi. Isse private state banta hai — jaise ek memoization cache jo calls ke beech persist kare par bahar se chhupa rahe, ek counter/ID generator, ya ek module jo sirf specific methods expose kare. Map ke saath, closures memoizers, iterators, aur stateful helpers ke clean, encapsulated implementations dete hain.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
