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
  icon: 'calculator',
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
      {
        title: 'Trie (Prefix Tree) in JavaScript',
        difficulty: 'hard',
        tags: ['trie', 'implementation'],
        explanation: {
          english:
            'A Trie stores strings character-by-character in a tree, where each node has a Map (or object) of children keyed by character, plus an isEndOfWord flag. Common prefixes are shared automatically, making it O(L) to insert or search a word of length L — independent of how many words are stored. JavaScript has no built-in Trie, so autocomplete/spell-check features implement one directly with plain objects or Maps as nodes.',
          hinglish:
            'Trie strings ko character-by-character ek tree mein store karta hai, jaha har node ke paas character se keyed children ka Map (ya object) hota hai, plus ek isEndOfWord flag. Common prefixes automatically share ho jaate hain, isliye L length ke word insert ya search karna O(L) hai — chahe kitne bhi words store hon. JavaScript mein built-in Trie nahi hai, isliye autocomplete/spell-check features plain objects ya Maps ko nodes ki tarah use karke seedha implement karte hain.',
        },
        dailyLifeExample:
          "Trie ek phone keypad ke T9 predictive text jaisa hai — 'c-a-t' type karte hi 'cat', 'catch', 'category' jaise saare words ka common 'cat' hissa share hota hai, sirf ek hi baar store hota hai, endings alag branches mein.",
        codeExample:
          "class TrieNode {\n  constructor() {\n    this.children = new Map(); // char -> TrieNode\n    this.isEndOfWord = false;\n  }\n}\n\nclass Trie {\n  constructor() { this.root = new TrieNode(); }\n\n  insert(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());\n      node = node.children.get(ch);\n    }\n    node.isEndOfWord = true;\n  }\n\n  search(word) {\n    const node = this.#walk(word);\n    return !!node && node.isEndOfWord;\n  }\n\n  startsWith(prefix) {\n    return !!this.#walk(prefix); // any word starts with this prefix\n  }\n\n  #walk(str) {\n    let node = this.root;\n    for (const ch of str) {\n      if (!node.children.has(ch)) return null;\n      node = node.children.get(ch);\n    }\n    return node;\n  }\n}\n\nconst trie = new Trie();\ntrie.insert('cat'); trie.insert('car');\ntrie.search('cat');       // true\ntrie.startsWith('ca');    // true — used for autocomplete",
        keyPoints: [
          'Each node holds children keyed by character (Map or object) + an isEndOfWord flag',
          'Words sharing a prefix share the same path in the tree — memory efficient',
          'Insert and search are O(L), where L is the word length — not affected by dictionary size',
          'No built-in Trie in JavaScript — implemented directly for autocomplete/spell-check',
          'startsWith() (prefix check) is what makes Tries perfect for autocomplete',
        ],
        quiz: [
          {
            question: 'Why is searching a Trie O(L) instead of depending on how many words are stored?',
            options: ['Tries only store one word', 'You only ever walk down L nodes (one per character), regardless of how many other words share or diverge from that path', 'Tries use binary search internally', 'JavaScript optimizes Trie search automatically'],
            correctIndex: 1,
          },
          {
            question: 'What does the isEndOfWord flag on a Trie node indicate?',
            options: ['The node is the root', 'A complete, valid word ends exactly at this node (not just a prefix passing through)', 'The node has no children', 'The Trie is full'],
            correctIndex: 1,
          },
          {
            question: 'Which real-world feature is a Trie ideally suited for?',
            options: ['Sorting numbers', 'Autocomplete / prefix search', 'Finding the shortest path', 'Reversing a string'],
            correctIndex: 1,
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
      {
        title: 'Union-Find (Disjoint Set) in JavaScript',
        difficulty: 'hard',
        tags: ['union-find', 'dsu', 'implementation'],
        explanation: {
          english:
            'Union-Find tracks groups of connected elements using a simple parent array, supporting two near-O(1) operations: find (which group does element x belong to — follow parent pointers to the root) and union (merge two groups by pointing one root at the other). Two optimisations make it fast in practice: path compression (during find, point every visited node directly at the root) and union by rank/size (attach the smaller tree under the bigger one) — together giving near-constant amortised time per operation.',
          hinglish:
            'Union-Find connected elements ke groups ko ek simple parent array se track karta hai, do near-O(1) operations support karte hue: find (element x kis group mein hai — parent pointers follow karke root tak) aur union (do groups merge karo, ek root ko doosre pe point karke). Do optimisations ise practically fast banate hain: path compression (find ke dauraan, har visited node ko seedha root pe point kar do) aur union by rank/size (chhote tree ko bade ke neeche attach karo) — dono milke near-constant amortised time per operation dete hain.',
        },
        dailyLifeExample:
          "Union-Find WhatsApp group-merging jaisa hai — 'kya A aur B same friend-circle mein hain?' (find), aur 'do groups ko ek bada group bana do' (union). Path compression har member ko seedha group-admin se jod dena hai, taaki agli baar poochna instant ho.",
        codeExample:
          "class UnionFind {\n  constructor(n) {\n    this.parent = Array.from({ length: n }, (_, i) => i);\n    this.rank = new Array(n).fill(0);\n  }\n\n  find(x) {\n    if (this.parent[x] !== x) {\n      this.parent[x] = this.find(this.parent[x]); // path compression\n    }\n    return this.parent[x];\n  }\n\n  union(a, b) {\n    const rootA = this.find(a), rootB = this.find(b);\n    if (rootA === rootB) return false; // already connected (would form a cycle)\n\n    // union by rank: attach smaller tree under bigger tree's root\n    if (this.rank[rootA] < this.rank[rootB]) this.parent[rootA] = rootB;\n    else if (this.rank[rootA] > this.rank[rootB]) this.parent[rootB] = rootA;\n    else { this.parent[rootB] = rootA; this.rank[rootA]++; }\n    return true;\n  }\n\n  connected(a, b) { return this.find(a) === this.find(b); }\n}",
        keyPoints: [
          'A parent array where parent[x] === x means x is a "root" (group representative)',
          'find(x) follows parent pointers to the root, with path compression flattening the path',
          'union(a, b) merges two groups by attaching one root under the other',
          'union() returning false (same root already) is exactly how you detect a cycle in an undirected graph',
          "Powers Kruskal's MST, connected components, and 'are these two nodes connected?' queries",
        ],
        quiz: [
          {
            question: "In this implementation, how do you know if x is the 'root' of its group?",
            options: ['x is always 0', 'parent[x] === x', 'x has no children', 'rank[x] is 0'],
            correctIndex: 1,
          },
          {
            question: 'What does it mean if union(a, b) returns false?',
            options: ['An error occurred', 'a and b already have the same root — they were already in the same group (adding this edge would create a cycle)', 'The array is full', 'a or b is negative'],
            correctIndex: 1,
          },
          {
            question: 'What does path compression do inside find()?',
            options: ['Deletes visited nodes', 'Re-points every node visited during the walk directly at the root, so future find() calls on them are instant', 'Sorts the parent array', 'Increases the rank array'],
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

  // ─── Complexity & Fundamentals ───────────────────────────────
  {
    question: 'What is Big-O notation and why does it matter?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Big-O describes how an algorithm\'s cost GROWS as input size grows, ignoring constants and lower-order terms. It matters because the difference between O(n) and O(n²) is invisible at n=10 and catastrophic at n=100,000 — the code that felt fine in testing melts in production. It measures growth, not speed: an O(n²) algorithm can beat an O(n log n) one on small inputs. Always state which case you mean, since worst, average, and best case can differ sharply.',
      hinglish:
        'Big-O batata hai ki input size badhne pe ek algorithm ka cost kaise BADHTA hai, constants aur lower-order terms ignore karte hue. Ye isliye matter karta hai kyunki O(n) aur O(n²) ka farak n=10 pe invisible hai aur n=100,000 pe catastrophic — jo code testing mein theek laga wo production mein pighal jaata hai. Ye growth measure karta hai, speed nahi: ek O(n²) algorithm chhote inputs pe ek O(n log n) ko hara sakta hai. Hamesha batao ki kaunsa case, kyunki worst, average, aur best case sharply alag ho sakte hain.',
    },
  },
  {
    question: 'What is space complexity and how does it differ from time complexity?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Space complexity measures the EXTRA memory an algorithm needs as input grows, excluding the input itself. An in-place array reversal is O(1) space; building a new array is O(n). Recursion has hidden space cost — the call stack — so a recursive tree traversal is O(h) space even if it allocates nothing. Time and space usually trade against each other: memoization and hash maps buy speed with memory, which is the single most common optimisation in interview problems.',
      hinglish:
        'Space complexity measure karti hai ki input badhne pe ek algorithm ko kitni EXTRA memory chahiye, input khud ko chhod kar. Ek in-place array reversal O(1) space hai; ek naya array banana O(n). Recursion ka ek chhupa space cost hai — call stack — isliye ek recursive tree traversal O(h) space hai chahe wo kuch allocate na kare. Time aur space usually ek doosre ke against trade karte hain: memoization aur hash maps memory se speed khareedte hain, jo interview problems mein sabse common optimisation hai.',
    },
  },
  {
    question: 'What is amortised time complexity?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Amortised complexity averages the cost of an operation over a long SEQUENCE of operations, rather than looking at the worst single call. Array `push` is the classic example: usually O(1), but occasionally the array must resize and copy everything, which is O(n). Because resizing doubles capacity, those expensive copies happen rarely enough that the average stays O(1). This is why we say push is O(1) amortised even though an individual push can be O(n).',
      hinglish:
        'Amortised complexity ek operation ka cost operations ke ek lambe SEQUENCE pe average karti hai, sabse bure single call ko dekhne ke bajaye. Array `push` classic example hai: usually O(1), par kabhi-kabhi array ko resize karke sab copy karna padta hai, jo O(n) hai. Kyunki resizing capacity double karti hai, wo mehnge copies itne kam hote hain ki average O(1) rehta hai. Isiliye hum kehte hain push O(1) amortised hai chahe ek individual push O(n) ho sakta hai.',
    },
  },
  {
    question: 'How is a JavaScript array actually implemented?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Specification-wise a JS array is just an object with integer-like string keys. In practice, V8 optimises arrays with contiguous, densely-packed elements into a real C-style backing store — the fast path. Creating a HOLE by deleting an element or assigning a far-out index causes a transition to "dictionary mode", a hash map, which is dramatically slower. This is why you should push rather than assign past the end, avoid `delete arr[i]`, and keep element types consistent.',
      hinglish:
        'Specification ke hisaab se ek JS array bas ek object hai integer-jaisi string keys ke saath. Practically, V8 contiguous, densely-packed elements wale arrays ko ek real C-style backing store mein optimise karta hai — fast path. Ek element delete karke ya ek door ka index assign karke ek HOLE banana "dictionary mode", ek hash map, mein transition karata hai, jo dramatically slower hai. Isiliye tumhe end ke aage assign karne ke bajaye push karna chahiye, `delete arr[i]` avoid karna chahiye, aur element types consistent rakhne chahiye.',
    },
  },
  {
    question: 'Why are shift and unshift O(n) while push and pop are O(1)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Arrays store elements at contiguous indices. `push` and `pop` operate at the END, so no other element moves — O(1). `shift` and `unshift` operate at the FRONT, so every remaining element must be re-indexed by one position — O(n). This is why building a queue with `arr.shift()` is quietly O(n²) over n operations, and why the correct fix is either a linked list, a deque, or the two-pointer trick of tracking a head index instead of actually removing elements.',
      hinglish:
        'Arrays elements ko contiguous indices pe store karte hain. `push` aur `pop` END pe kaam karte hain, isliye koi doosra element nahi hilta — O(1). `shift` aur `unshift` FRONT pe kaam karte hain, isliye har bache element ko ek position re-index karna padta hai — O(n). Isiliye `arr.shift()` se ek queue banana n operations pe chupke se O(n²) hai, aur isiliye sahi fix ya ek linked list hai, ek deque, ya elements actually hataane ke bajaye ek head index track karne ka two-pointer trick.',
    },
  },
  {
    question: 'What is the two-pointer technique and when do you use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Two pointers traverse a structure simultaneously, converting many O(n²) nested-loop solutions into O(n). The two shapes: OPPOSITE ENDS moving inward, used on sorted arrays for two-sum, palindrome checks, and container-with-most-water; and SAME DIRECTION at different speeds, used for removing duplicates in place, partitioning, and cycle detection. The signal in a problem statement is a sorted array, a pair or triplet target, or an in-place rearrangement requirement.',
      hinglish:
        'Do pointers ek structure ko ek saath traverse karte hain, bahut O(n²) nested-loop solutions ko O(n) mein badalte hue. Do shapes: OPPOSITE ENDS andar ki taraf, sorted arrays pe two-sum, palindrome checks, aur container-with-most-water ke liye; aur SAME DIRECTION alag speeds pe, in-place duplicates hataane, partitioning, aur cycle detection ke liye. Problem statement mein signal ek sorted array, ek pair ya triplet target, ya ek in-place rearrangement requirement hai.',
    },
  },
  {
    question: 'What is the sliding window technique?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Sliding window maintains a contiguous range and moves its boundaries instead of recomputing from scratch, turning O(n·k) into O(n). FIXED windows suit "maximum sum of k consecutive elements": add the entering element, subtract the leaving one. VARIABLE windows suit "longest substring satisfying a condition": expand the right edge greedily, and shrink from the left whenever the condition breaks. The trigger phrase is "contiguous subarray or substring".',
      hinglish:
        'Sliding window ek contiguous range maintain karta hai aur shuru se recompute karne ke bajaye uski boundaries hilata hai, O(n·k) ko O(n) mein badalte hue. FIXED windows "k consecutive elements ka maximum sum" suit karti hain: aane wala element jodo, jaane wala ghatao. VARIABLE windows "ek condition satisfy karti sabse lambi substring" suit karti hain: right edge greedily badhao, aur jab bhi condition toote left se sikodo. Trigger phrase "contiguous subarray ya substring" hai.',
    },
  },
  {
    question: 'How do you detect a cycle in a linked list?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Floyd\'s tortoise-and-hare: advance one pointer by one node and another by two. If they ever meet, a cycle exists; if the fast pointer reaches null, it does not. It is O(n) time and O(1) space, versus a hash set which also works but costs O(n) memory. To find the cycle\'s START, reset one pointer to the head and advance both one step at a time — they meet at the entry node, which follows from the distance arithmetic of the meeting point.',
      hinglish:
        'Floyd ka tortoise-and-hare: ek pointer ek node aur doosra do node aage badhao. Agar wo kabhi milein, ek cycle hai; agar fast pointer null pahunch jaaye, nahi hai. Ye O(n) time aur O(1) space hai, versus ek hash set jo kaam to karta hai par O(n) memory leta hai. Cycle ka SHURU dhoondhne ke liye, ek pointer ko head pe reset karke dono ko ek-ek step badhao — wo entry node pe milte hain, jo meeting point ke distance arithmetic se nikalta hai.',
    },
  },
  {
    question: 'What is a hash map and why are its operations O(1)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A hash map applies a hash function to a key to compute a bucket index, so lookup jumps directly to the location rather than searching — O(1) AVERAGE. Collisions, where two keys map to the same bucket, are resolved by chaining or open addressing. Worst case degrades to O(n) if everything collides, which is the basis of hash-flooding attacks. In JavaScript, `Map` is the proper hash map: it accepts any key type, preserves insertion order, and has a real `size`.',
      hinglish:
        'Ek hash map ek key pe ek hash function laga kar ek bucket index compute karta hai, isliye lookup search karne ke bajaye seedha location pe kood jaata hai — O(1) AVERAGE. Collisions, jahan do keys ek hi bucket pe map hoti hain, chaining ya open addressing se resolve hote hain. Worst case O(n) tak girta hai agar sab collide karein, jo hash-flooding attacks ka basis hai. JavaScript mein, `Map` proper hash map hai: ye koi bhi key type accept karta hai, insertion order preserve karta hai, aur uska ek real `size` hai.',
    },
  },
  {
    question: 'When should you use Map instead of a plain object in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use `Map` when keys are not strings — objects, numbers, or functions — since object keys are coerced to strings, making `1` and `"1"` collide. Use it when you add and delete frequently, since Map is optimised for that. Use it when you need `size`, guaranteed insertion order, or direct iteration. And use it when keys come from user input, because a plain object inherits prototype keys like `__proto__` and `constructor`, which is both a correctness bug and a prototype-pollution risk.',
      hinglish:
        '`Map` tab use karo jab keys strings na hon — objects, numbers, ya functions — kyunki object keys strings mein coerce hoti hain, jisse `1` aur `"1"` collide karte hain. Tab use karo jab tum frequently add aur delete karte ho, kyunki Map uske liye optimised hai. Tab use karo jab tumhe `size`, guaranteed insertion order, ya direct iteration chahiye. Aur tab use karo jab keys user input se aayein, kyunki ek plain object `__proto__` aur `constructor` jaisi prototype keys inherit karta hai, jo ek correctness bug aur ek prototype-pollution risk dono hai.',
    },
  },
  {
    question: 'What is a Set and what problems does it solve efficiently?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A `Set` stores unique values with O(1) average add, delete, and `has`. It turns several common O(n²) patterns into O(n): deduplicating an array becomes `[...new Set(arr)]`, "have I seen this before" becomes a single `has` call instead of `includes` over an array, and intersection or difference of two collections becomes a single pass. The key insight in interviews is recognising when `Array.includes` inside a loop is the hidden quadratic cost.',
      hinglish:
        'Ek `Set` unique values store karta hai O(1) average add, delete, aur `has` ke saath. Ye kai common O(n²) patterns ko O(n) mein badal deta hai: ek array deduplicate karna `[...new Set(arr)]` ban jaata hai, "kya maine ise pehle dekha hai" ek array pe `includes` ke bajaye ek single `has` call ban jaata hai, aur do collections ka intersection ya difference ek single pass ban jaata hai. Interviews mein key insight ye pehchanana hai ki ek loop ke andar `Array.includes` chhupa quadratic cost hai.',
    },
  },
  {
    question: 'How does recursion work and what causes a stack overflow?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Each recursive call pushes a frame onto the call stack holding parameters, locals, and a return address. Frames pop as calls return. A stack overflow happens when the stack exceeds its fixed size — typically around 10,000 frames in Node — caused by a missing or unreachable base case, or by legitimate recursion that is simply too deep. Fixes: convert to iteration with an explicit stack, or restructure the algorithm. JavaScript engines do NOT implement tail-call optimisation in practice, so it cannot save you.',
      hinglish:
        'Har recursive call ek frame call stack pe push karta hai jisme parameters, locals, aur ek return address hote hain. Calls return hone pe frames pop hote hain. Ek stack overflow tab hota hai jab stack apna fixed size paar kar jaaye — typically Node mein lagbhag 10,000 frames — jo ek missing ya unreachable base case se, ya bas bahut gehri legitimate recursion se hota hai. Fixes: ek explicit stack ke saath iteration mein badlo, ya algorithm restructure karo. JavaScript engines practically tail-call optimisation implement NAHI karte, isliye wo tumhe bacha nahi sakta.',
    },
  },
  {
    question: 'What is memoization and when does it help?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Memoization caches a function\'s result by its arguments so repeated calls return instantly. It helps enormously when a recursion recomputes the same subproblems — naive Fibonacci is O(2ⁿ) and becomes O(n) with a cache. Requirements: the function must be PURE, since caching a function with side effects or changing dependencies produces wrong answers. Watch memory too — an unbounded cache on high-cardinality inputs is a leak, so real implementations use an LRU bound.',
      hinglish:
        'Memoization ek function ka result uske arguments se cache karta hai taaki repeated calls turant return karein. Ye enormously tab helps karta hai jab ek recursion wahi subproblems dobara compute kare — naive Fibonacci O(2ⁿ) hai aur ek cache ke saath O(n) ban jaata hai. Requirements: function PURE hona chahiye, kyunki side effects ya badalti dependencies wale function ko cache karna galat jawab deta hai. Memory bhi dekho — high-cardinality inputs pe ek unbounded cache ek leak hai, isliye real implementations ek LRU bound use karte hain.',
    },
  },
  {
    question: 'What is dynamic programming and how do you recognise a DP problem?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'DP solves problems with OPTIMAL SUBSTRUCTURE (the optimal answer is built from optimal answers to subproblems) and OVERLAPPING SUBPROBLEMS (the same subproblems recur). Recognise it when a problem asks for a maximum, minimum, or count of ways, and a brute-force recursion would recompute the same states. Two styles: TOP-DOWN memoized recursion, which is easier to derive from the brute force, and BOTTOM-UP tabulation, which avoids recursion depth and often allows reducing the table to one row.',
      hinglish:
        'DP un problems ko solve karta hai jinme OPTIMAL SUBSTRUCTURE ho (optimal jawab subproblems ke optimal jawabon se banta hai) aur OVERLAPPING SUBPROBLEMS (wahi subproblems dohraate hain). Ise tab pehchano jab ek problem ek maximum, minimum, ya ways ka count maange, aur ek brute-force recursion wahi states dobara compute karti. Do styles: TOP-DOWN memoized recursion, jo brute force se derive karna easier hai, aur BOTTOM-UP tabulation, jo recursion depth avoid karta hai aur aksar table ko ek row tak kam karne deta hai.',
    },
  },
  {
    question: 'What is the difference between greedy algorithms and dynamic programming?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'GREEDY makes the locally best choice at each step and never reconsiders — fast and simple, but correct only when the problem has the greedy-choice property. DP explores all relevant choices and combines subproblem results, which is slower but always correct where the recurrence is right. The classic illustration is coin change: greedy works for standard currencies but fails for a set like {1, 3, 4} making 6, where greedy gives 4+1+1 while the optimum is 3+3.',
      hinglish:
        'GREEDY har step pe locally best choice karta hai aur kabhi dobara nahi sochta — fast aur simple, par sirf tab correct jab problem mein greedy-choice property ho. DP saare relevant choices explore karta hai aur subproblem results combine karta hai, jo slower hai par jahan recurrence sahi ho wahan hamesha correct. Classic illustration coin change hai: greedy standard currencies ke liye kaam karta hai par {1, 3, 4} jaise set se 6 banane pe fail hota hai, jahan greedy 4+1+1 deta hai jabki optimum 3+3 hai.',
    },
  },
  {
    question: 'What is binary search and what are the common bugs?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Binary search halves a SORTED range each step, giving O(log n). The recurring bugs: using `while (low < high)` versus `<=` inconsistently with how you update bounds, which either skips the answer or loops forever; forgetting that the array must be sorted; and mishandling duplicates when you need the first or last occurrence. The broader skill is recognising that binary search applies to any MONOTONIC predicate, not just arrays — "smallest value for which this is true".',
      hinglish:
        'Binary search har step pe ek SORTED range aadhi karta hai, O(log n) dete hue. Baar-baar aane wale bugs: `while (low < high)` versus `<=` ko bounds update karne ke tareeke ke saath inconsistently use karna, jo ya jawab skip karta hai ya hamesha loop karta hai; bhoolna ki array sorted hona chahiye; aur duplicates galat handle karna jab tumhe pehla ya aakhri occurrence chahiye. Badi skill ye pehchanana hai ki binary search kisi bhi MONOTONIC predicate pe apply hota hai, sirf arrays pe nahi — "sabse chhoti value jiske liye ye sach hai".',
    },
  },
  {
    question: 'Compare merge sort, quick sort, and heap sort.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'MERGE SORT is O(n log n) in every case and STABLE, but needs O(n) extra space. QUICK SORT is O(n log n) average with better constants and in-place operation, but degrades to O(n²) on bad pivots and is not stable. HEAP SORT is O(n log n) worst case with O(1) space, but has poor cache locality and is not stable. Real engines use hybrids: V8\'s `Array.sort` is TimSort, which merges runs and exploits partially-ordered data, and is stable by specification.',
      hinglish:
        'MERGE SORT har case mein O(n log n) aur STABLE hai, par O(n) extra space chahta hai. QUICK SORT average O(n log n) hai better constants aur in-place operation ke saath, par bure pivots pe O(n²) tak girta hai aur stable nahi hai. HEAP SORT worst case O(n log n) hai O(1) space ke saath, par uski cache locality kharab hai aur wo stable nahi hai. Real engines hybrids use karte hain: V8 ka `Array.sort` TimSort hai, jo runs merge karta hai aur partially-ordered data ka faayda uthata hai, aur specification se stable hai.',
    },
  },
  {
    question: 'Why does [10, 9, 1].sort() give the wrong order in JavaScript?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'By default `sort()` converts elements to STRINGS and compares them lexicographically, so `"10"` sorts before `"9"` because `"1"` < `"9"`. The fix is passing a comparator: `arr.sort((a, b) => a - b)`. Two further points worth knowing: `sort` mutates the original array, so use `toSorted()` or a copy if that matters, and modern JavaScript guarantees sort STABILITY, meaning equal elements retain their relative order.',
      hinglish:
        'Default se `sort()` elements ko STRINGS mein convert karke lexicographically compare karta hai, isliye `"10"` `"9"` se pehle sort hota hai kyunki `"1"` < `"9"`. Fix ek comparator pass karna hai: `arr.sort((a, b) => a - b)`. Do aur jaanne layak points: `sort` original array ko mutate karta hai, isliye agar wo matter kare to `toSorted()` ya ek copy use karo, aur modern JavaScript sort STABILITY guarantee karta hai, matlab equal elements apna relative order rakhte hain.',
    },
  },
  {
    question: 'What is a stack and where is it used?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A stack is LIFO — last in, first out — with O(1) push and pop. In JavaScript an array with `push`/`pop` is a perfectly good stack. Uses: the call stack itself, undo history, balanced-bracket validation, expression evaluation, browser back navigation, and converting any recursion into an iterative solution. Recognising "I need to remember what came before and unwind it in reverse" is the signal that a stack is the right structure.',
      hinglish:
        'Ek stack LIFO hai — last in, first out — O(1) push aur pop ke saath. JavaScript mein `push`/`pop` wala ek array ek bilkul achha stack hai. Uses: call stack khud, undo history, balanced-bracket validation, expression evaluation, browser back navigation, aur kisi bhi recursion ko ek iterative solution mein badalna. "Mujhe yaad rakhna hai ki pehle kya aaya aur ulta unwind karna hai" pehchanana signal hai ki stack sahi structure hai.',
    },
  },
  {
    question: 'How do you implement an efficient queue in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Not with `push` and `shift` — `shift` is O(n), making n operations O(n²). Three good options: keep a HEAD INDEX that advances instead of removing elements, periodically compacting the array; use a LINKED LIST with head and tail pointers for true O(1) on both ends; or use a CIRCULAR BUFFER with a fixed-size array and wrapping indices. The head-index version is usually the simplest correct answer in an interview.',
      hinglish:
        '`push` aur `shift` se nahi — `shift` O(n) hai, jo n operations ko O(n²) banata hai. Teen achhe options: ek HEAD INDEX rakho jo elements hataane ke bajaye aage badhe, array ko periodically compact karte hue; dono ends pe true O(1) ke liye head aur tail pointers wali ek LINKED LIST use karo; ya ek fixed-size array aur wrapping indices ke saath ek CIRCULAR BUFFER use karo. Head-index version ek interview mein usually sabse simple correct jawab hai.',
    },
  },
  {
    question: 'What is a linked list and when is it better than an array?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A linked list stores nodes each holding a value and a pointer to the next. It beats arrays for O(1) insertion and deletion at a known position, especially at the front, since nothing shifts. It loses badly on RANDOM ACCESS — reaching index i is O(n) — and on cache locality, because nodes are scattered in memory while arrays are contiguous. In real JavaScript work arrays win almost always; linked lists matter mainly for LRU caches and interview questions.',
      hinglish:
        'Ek linked list nodes store karti hai jinme har ek ek value aur agle ka pointer rakhta hai. Ye ek known position pe, khaas kar front pe, O(1) insertion aur deletion ke liye arrays ko harati hai, kyunki kuch shift nahi hota. Ye RANDOM ACCESS pe buri tarah haarti hai — index i tak pahunchna O(n) hai — aur cache locality pe, kyunki nodes memory mein bikhre hote hain jabki arrays contiguous. Real JavaScript kaam mein arrays almost hamesha jeette hain; linked lists mainly LRU caches aur interview questions ke liye matter karti hain.',
    },
  },
  {
    question: 'What are the tree traversal orders and when do you use each?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'INORDER (left, node, right) visits a binary search tree in sorted order, which is its main use. PREORDER (node, left, right) visits parents before children, so it suits copying or serialising a tree. POSTORDER (left, right, node) visits children before parents, so it suits deleting a tree or computing a value that depends on subtree results. LEVEL-ORDER uses a queue rather than recursion and gives breadth-first, row-by-row traversal.',
      hinglish:
        'INORDER (left, node, right) ek binary search tree ko sorted order mein visit karta hai, jo iska main use hai. PREORDER (node, left, right) parents ko children se pehle visit karta hai, isliye ye ek tree copy ya serialise karna suit karta hai. POSTORDER (left, right, node) children ko parents se pehle visit karta hai, isliye ye ek tree delete karna ya subtree results pe depend karti value compute karna suit karta hai. LEVEL-ORDER recursion ke bajaye ek queue use karta hai aur breadth-first, row-by-row traversal deta hai.',
    },
  },
  {
    question: 'What is a binary search tree and what is its main weakness?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A BST keeps smaller values left and larger values right of each node, so search, insert, and delete are O(log n) when the tree is balanced. Its weakness is that it can DEGENERATE: inserting already-sorted data produces a chain, and every operation becomes O(n) — the structure silently turns into a linked list. That is why production systems use SELF-BALANCING variants such as AVL or Red-Black trees, which restructure on insert to guarantee logarithmic height.',
      hinglish:
        'Ek BST har node ke left mein chhoti aur right mein badi values rakhta hai, isliye tree balanced hone pe search, insert, aur delete O(log n) hain. Iski weakness ye hai ki ye DEGENERATE ho sakta hai: already-sorted data insert karna ek chain banata hai, aur har operation O(n) ban jaata hai — structure chupke se ek linked list ban jaata hai. Isiliye production systems AVL ya Red-Black trees jaise SELF-BALANCING variants use karte hain, jo insert pe restructure karke logarithmic height guarantee karte hain.',
    },
  },
  {
    question: 'What is BFS and how does it differ from DFS?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'BFS explores level by level using a QUEUE; DFS goes as deep as possible first, using a STACK or recursion. Both are O(V + E). Choose BFS when you need the SHORTEST path in an unweighted graph, or anything "nearest first" — it is guaranteed, DFS is not. Choose DFS for cycle detection, topological sorting, connected components, and backtracking. Memory differs too: BFS stores a whole level, DFS stores one path, so BFS can use far more memory on wide graphs.',
      hinglish:
        'BFS ek QUEUE se level by level explore karta hai; DFS pehle jitna gehra ja sake jaata hai, ek STACK ya recursion se. Dono O(V + E) hain. BFS tab chuno jab tumhe ek unweighted graph mein SABSE CHHOTA path chahiye, ya koi bhi "nearest first" cheez — ye guaranteed hai, DFS nahi. DFS cycle detection, topological sorting, connected components, aur backtracking ke liye chuno. Memory bhi alag hai: BFS ek poora level store karta hai, DFS ek path, isliye chaude graphs pe BFS bahut zyada memory use kar sakta hai.',
    },
  },
  {
    question: 'How do you represent a graph in JavaScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An ADJACENCY LIST — a Map from node to an array of neighbours — is the usual choice: O(V + E) space and fast neighbour iteration, which is what traversals need. An ADJACENCY MATRIX uses O(V²) space but answers "is there an edge between a and b" in O(1). Pick the list for sparse graphs, which is most real-world data, and the matrix only for dense graphs or algorithms that need constant-time edge lookup.',
      hinglish:
        'Ek ADJACENCY LIST — node se neighbours ke array ka ek Map — usual choice hai: O(V + E) space aur fast neighbour iteration, jo traversals ko chahiye. Ek ADJACENCY MATRIX O(V²) space use karta hai par "a aur b ke beech ek edge hai kya" O(1) mein jawab deta hai. Sparse graphs ke liye list chuno, jo zyadatar real-world data hai, aur matrix sirf dense graphs ya constant-time edge lookup chahne wale algorithms ke liye.',
    },
  },
  {
    question: 'What is a heap and what is a priority queue used for?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A binary heap is a complete tree stored in an array where every parent is smaller (min-heap) or larger (max-heap) than its children. It gives O(1) peek at the extreme and O(log n) insert and extract. It backs the PRIORITY QUEUE, which is essential for Dijkstra\'s shortest path, task scheduling, merging k sorted lists, and the classic "top k elements" problem — where a heap of size k gives O(n log k) instead of sorting everything at O(n log n).',
      hinglish:
        'Ek binary heap ek array mein store ek complete tree hai jahan har parent apne children se chhota (min-heap) ya bada (max-heap) hai. Ye extreme pe O(1) peek aur O(log n) insert aur extract deta hai. Ye PRIORITY QUEUE ko chalata hai, jo Dijkstra ke shortest path, task scheduling, k sorted lists merge karne, aur classic "top k elements" problem ke liye essential hai — jahan size k ka ek heap sab kuch O(n log n) pe sort karne ke bajaye O(n log k) deta hai.',
    },
  },
  {
    question: 'What is a trie and when is it the right structure?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A trie stores strings by sharing common prefixes along tree paths, so lookup and insert cost O(m) where m is the word length — independent of how many words are stored. It is the right structure for autocomplete, prefix search, spell-checking, and IP routing tables. The trade-off is memory: each node holds child pointers, so a trie generally uses considerably more memory than a hash set for the same words, and only pays off when PREFIX queries matter.',
      hinglish:
        'Ek trie strings ko tree paths ke saath common prefixes share karke store karta hai, isliye lookup aur insert ka cost O(m) hai jahan m word length hai — is se independent ki kitne words store hain. Ye autocomplete, prefix search, spell-checking, aur IP routing tables ke liye sahi structure hai. Trade-off memory hai: har node child pointers rakhta hai, isliye ek trie usually usi words ke liye ek hash set se kaafi zyada memory use karta hai, aur sirf tab faayda deta hai jab PREFIX queries matter karein.',
    },
  },
  {
    question: 'What is backtracking?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Backtracking builds a solution incrementally and ABANDONS a partial candidate the moment it cannot lead to a valid answer, undoing the last choice and trying another. It is DFS over a decision tree with pruning. It solves permutations, combinations, subsets, N-Queens, Sudoku, and word search. The implementation pattern is consistent: choose, recurse, un-choose. The pruning is what makes it tractable — without it you are simply enumerating an exponential space.',
      hinglish:
        'Backtracking ek solution incrementally banata hai aur ek partial candidate ko us pal CHHOD deta hai jab wo ek valid jawab tak nahi le ja sakta, aakhri choice undo karke doosri try karta hai. Ye ek decision tree pe pruning ke saath DFS hai. Ye permutations, combinations, subsets, N-Queens, Sudoku, aur word search solve karta hai. Implementation pattern consistent hai: choose, recurse, un-choose. Pruning hi ise tractable banata hai — uske bina tum bas ek exponential space enumerate kar rahe ho.',
    },
  },
  {
    question: 'What is the difference between a shallow and a deep copy?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A SHALLOW copy — spread or `Object.assign` — duplicates the top level but copies REFERENCES for nested objects, so mutating a nested value affects both copies. A DEEP copy recursively duplicates everything, giving full independence. `structuredClone()` is the modern built-in and handles cycles, Maps, Sets, and Dates; `JSON.parse(JSON.stringify(x))` is the old trick but silently drops functions and `undefined`, converts Dates to strings, and throws on circular references.',
      hinglish:
        'Ek SHALLOW copy — spread ya `Object.assign` — top level duplicate karti hai par nested objects ke REFERENCES copy karti hai, isliye ek nested value mutate karna dono copies ko affect karta hai. Ek DEEP copy recursively sab kuch duplicate karti hai, full independence deti hai. `structuredClone()` modern built-in hai aur cycles, Maps, Sets, aur Dates handle karta hai; `JSON.parse(JSON.stringify(x))` purana trick hai par ye silently functions aur `undefined` gira deta hai, Dates ko strings mein badalta hai, aur circular references pe throw karta hai.',
    },
  },
  {
    question: 'How do you flatten a deeply nested array?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`arr.flat(Infinity)` is the built-in and correct answer for most cases. To implement it, recurse: map over elements, and for any element that is an array, recurse into it, concatenating results. An ITERATIVE version using an explicit stack avoids stack overflow on extremely deep nesting, which is exactly what an interviewer is checking when they ask you to write it by hand rather than call `flat`.',
      hinglish:
        '`arr.flat(Infinity)` built-in hai aur zyadatar cases ke liye correct jawab. Ise implement karne ke liye, recurse karo: elements pe map karo, aur jo bhi element ek array ho usme recurse karke results concatenate karo. Ek explicit stack wala ITERATIVE version bahut gehri nesting pe stack overflow avoid karta hai, jo bilkul wahi hai jo ek interviewer check kar raha hota hai jab wo tumse `flat` call karne ke bajaye ise haath se likhne ko kehta hai.',
    },
  },
  {
    question: 'How do you find duplicates in an array efficiently?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use a `Set` or `Map`: iterate once, and if a value is already present, record it as a duplicate. That is O(n) time and O(n) space. The naive nested loop with `includes` is O(n²) and is the exact mistake this question exists to catch. If you may mutate the input and want O(1) space, sorting first and comparing neighbours costs O(n log n) time — a genuine trade of time for space worth naming explicitly.',
      hinglish:
        'Ek `Set` ya `Map` use karo: ek baar iterate karo, aur agar ek value already present ho, use ek duplicate record karo. Ye O(n) time aur O(n) space hai. `includes` wala naive nested loop O(n²) hai aur wahi mistake hai jise pakadne ke liye ye sawaal exist karta hai. Agar tum input mutate kar sakte ho aur O(1) space chahte ho, pehle sort karke neighbours compare karna O(n log n) time leta hai — space ke liye time ka ek genuine trade jise explicitly naam dena worth hai.',
    },
  },
  {
    question: 'How would you implement an LRU cache?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Combine a hash map for O(1) lookup with a doubly linked list ordering entries by recency: on access, move the node to the front; on insert past capacity, evict the tail. Both operations are O(1). In JavaScript there is a neat shortcut — `Map` preserves insertion order, so deleting and re-setting a key moves it to the end, and `map.keys().next().value` gives the least recently used. That yields a correct LRU in a handful of lines.',
      hinglish:
        'O(1) lookup ke liye ek hash map ko entries ko recency se order karti ek doubly linked list ke saath combine karo: access pe, node ko front pe le jao; capacity ke baad insert pe, tail evict karo. Dono operations O(1) hain. JavaScript mein ek achha shortcut hai — `Map` insertion order preserve karta hai, isliye ek key delete karke dobara set karna use end pe le jaata hai, aur `map.keys().next().value` sabse kam recently used deta hai. Isse gine-chune lines mein ek correct LRU banta hai.',
    },
  },
  {
    question: 'What is the time complexity of common JavaScript array methods?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Access by index, `push`, and `pop` are O(1). `shift`, `unshift`, and `splice` are O(n) because elements re-index. `map`, `filter`, `forEach`, `reduce`, `find`, `includes`, and `indexOf` are O(n). `sort` is O(n log n). `concat` and `slice` are O(n) since they build a new array. The practical consequence is that chaining several O(n) methods stays O(n) overall, but calling `includes` INSIDE a `filter` is quietly O(n²).',
      hinglish:
        'Index se access, `push`, aur `pop` O(1) hain. `shift`, `unshift`, aur `splice` O(n) hain kyunki elements re-index hote hain. `map`, `filter`, `forEach`, `reduce`, `find`, `includes`, aur `indexOf` O(n) hain. `sort` O(n log n) hai. `concat` aur `slice` O(n) hain kyunki wo ek naya array banate hain. Practical nateeja ye hai ki kai O(n) methods chain karna overall O(n) rehta hai, par ek `filter` ke ANDAR `includes` call karna chupke se O(n²) hai.',
    },
  },
  {
    question: 'What is a monotonic stack and what problems does it solve?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A monotonic stack keeps its elements in strictly increasing or decreasing order by popping anything that would violate that order before pushing. Each element is pushed and popped at most once, so the whole traversal is O(n) despite the inner loop. It solves the "next greater element" family: daily temperatures, stock spans, largest rectangle in a histogram, and trapping rain water — all problems where you need the nearest element on one side satisfying a comparison.',
      hinglish:
        'Ek monotonic stack apne elements ko strictly increasing ya decreasing order mein rakhta hai, push karne se pehle us order ko todne wale sab kuch ko pop karke. Har element zyada se zyada ek baar push aur pop hota hai, isliye poora traversal inner loop ke bawajood O(n) hai. Ye "next greater element" family solve karta hai: daily temperatures, stock spans, ek histogram mein sabse bada rectangle, aur trapping rain water — saari problems jahan tumhe ek side pe ek comparison satisfy karta sabse nazdeek element chahiye.',
    },
  },
  {
    question: 'What is the prefix sum technique?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Precompute an array where each position holds the sum of everything before it. Then the sum of any range becomes a single subtraction — O(1) per query after O(n) preprocessing, instead of O(n) per query. Combined with a hash map of seen prefix sums it solves "count subarrays summing to k" in a single O(n) pass. The same idea extends to prefix XOR, prefix products, and 2D grids for rectangle sums.',
      hinglish:
        'Ek aisa array precompute karo jahan har position apne se pehle sab kuch ka sum rakhe. Phir kisi bhi range ka sum ek single subtraction ban jaata hai — O(n) preprocessing ke baad per query O(1), per query O(n) ke bajaye. Dekhe gaye prefix sums ke ek hash map ke saath ye "k tak sum karti subarrays gino" ko ek single O(n) pass mein solve karta hai. Wahi idea prefix XOR, prefix products, aur rectangle sums ke liye 2D grids tak failta hai.',
    },
  },
  {
    question: 'How do you reverse a linked list?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Iteratively with three pointers — previous, current, next: save `current.next`, point `current.next` at `previous`, then advance both. It is O(n) time and O(1) space, and the whole trick is saving the next node BEFORE overwriting the pointer, or you lose the rest of the list. A recursive version exists and is elegant but costs O(n) stack space, so the iterative form is the expected answer.',
      hinglish:
        'Teen pointers ke saath iteratively — previous, current, next: `current.next` save karo, `current.next` ko `previous` pe point karo, phir dono aage badhao. Ye O(n) time aur O(1) space hai, aur poora trick pointer overwrite karne se PEHLE agla node save karna hai, warna tum baaki list kho dete ho. Ek recursive version bhi hai aur elegant hai par O(n) stack space leta hai, isliye iterative form expected jawab hai.',
    },
  },
  {
    question: 'What is the difference between iteration and recursion for tree problems?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'RECURSION mirrors the tree\'s structure and is far shorter and clearer for most traversals, but consumes O(h) call-stack space and risks overflow on a degenerate tree. ITERATION with an explicit stack or queue has identical complexity but keeps the memory on the heap, so it handles arbitrarily deep trees and lets you pause or resume traversal. Write recursion by default; switch to iteration when depth is unbounded or you need explicit control over the traversal state.',
      hinglish:
        'RECURSION tree ke structure ko mirror karti hai aur zyadatar traversals ke liye bahut chhoti aur clearer hai, par O(h) call-stack space leti hai aur ek degenerate tree pe overflow ka risk rakhti hai. Ek explicit stack ya queue wali ITERATION ki complexity same hai par memory heap pe rehti hai, isliye ye arbitrarily gehre trees handle karti hai aur tumhe traversal pause ya resume karne deti hai. Default se recursion likho; jab depth unbounded ho ya tumhe traversal state pe explicit control chahiye tab iteration pe switch karo.',
    },
  },
  {
    question: 'How do you check if two strings are anagrams?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Count character frequencies with a Map or plain object in one pass over each string and compare the counts — O(n) time and O(k) space where k is the alphabet size. Sorting both strings and comparing also works and is a one-liner, but costs O(n log n). Length inequality is an instant reject. Watch the edge cases an interviewer will probe: case sensitivity, whitespace, and Unicode, where a naive character split breaks on surrogate pairs.',
      hinglish:
        'Har string pe ek pass mein ek Map ya plain object se character frequencies gino aur counts compare karo — O(n) time aur O(k) space jahan k alphabet size hai. Dono strings sort karke compare karna bhi kaam karta hai aur ek one-liner hai, par O(n log n) leta hai. Length ka farak turant reject hai. Un edge cases pe dhyan do jo ek interviewer poochega: case sensitivity, whitespace, aur Unicode, jahan ek naive character split surrogate pairs pe tootta hai.',
    },
  },
  {
    question: 'What is the difference between stable and unstable sorting?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A STABLE sort preserves the relative order of elements that compare equal; an unstable one may reorder them. It matters when you sort by multiple criteria in sequence — sorting by name and then stably by department keeps names alphabetical within each department, which an unstable sort would scramble. Merge sort and TimSort are stable; quick sort and heap sort are not. JavaScript\'s `Array.sort` is required to be stable since ES2019.',
      hinglish:
        'Ek STABLE sort un elements ka relative order preserve karta hai jo equal compare karte hain; ek unstable unhe reorder kar sakta hai. Ye tab matter karta hai jab tum kai criteria pe sequence mein sort karte ho — naam se sort karke phir stably department se sort karna har department ke andar naam alphabetical rakhta hai, jise ek unstable sort bigaad deta. Merge sort aur TimSort stable hain; quick sort aur heap sort nahi. JavaScript ka `Array.sort` ES2019 se stable hona zaroori hai.',
    },
  },
  {
    question: 'How would you find the kth largest element in an array?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Three approaches worth knowing. SORT and index: O(n log n), simplest, fine when n is small. MIN-HEAP of size k: push each element and pop when the heap exceeds k, giving O(n log k) and O(k) space — the best choice when k is much smaller than n or the data is streaming. QUICKSELECT: partition like quicksort but recurse into only one side, giving O(n) average and O(1) extra space, though O(n²) worst case without a randomised pivot.',
      hinglish:
        'Teen approaches jaanne layak. SORT karke index: O(n log n), sabse simple, n chhota hone pe theek. Size k ka MIN-HEAP: har element push karo aur heap k se bada hone pe pop karo, O(n log k) aur O(k) space dete hue — best choice jab k n se bahut chhota ho ya data streaming ho. QUICKSELECT: quicksort ki tarah partition karo par sirf ek side mein recurse karo, O(n) average aur O(1) extra space dete hue, halaanki ek randomised pivot ke bina worst case O(n²).',
    },
  },
  {
    question: 'What is tail recursion and does JavaScript optimise it?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A call is tail-recursive when the recursive call is the very LAST operation, so the current frame\'s state is no longer needed and could in principle be reused instead of pushing a new one. ES6 specified proper tail calls, but in practice no major engine except JavaScriptCore implements them — V8 and therefore Node and Chrome do not. So writing tail-recursive JavaScript gives no protection from stack overflow; if depth is a concern you must convert to a loop.',
      hinglish:
        'Ek call tail-recursive hai jab recursive call bilkul AAKHRI operation ho, isliye current frame ki state ab zaroori nahi aur principle mein ek naya push karne ke bajaye reuse ho sakti hai. ES6 ne proper tail calls specify kiye, par practically JavaScriptCore ke alawa koi major engine unhe implement nahi karta — V8 aur isliye Node aur Chrome nahi karte. Isliye tail-recursive JavaScript likhna stack overflow se koi protection nahi deta; agar depth ek concern hai to tumhe ek loop mein badalna padega.',
    },
  },
  {
    question: 'How do you detect a cycle in a directed graph?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Run DFS tracking THREE states per node: unvisited, currently in the recursion stack, and fully finished. Encountering a node that is currently in the recursion stack means a back edge, hence a cycle. Simply checking "already visited" is wrong, because a node can legitimately be reached twice by different paths in a DAG. Alternatively, Kahn\'s topological sort detects a cycle when it finishes without emitting every node.',
      hinglish:
        'DFS chalao aur per node TEEN states track karo: unvisited, abhi recursion stack mein, aur poori tarah finished. Ek aisa node milna jo abhi recursion stack mein hai matlab ek back edge, isliye ek cycle. Sirf "already visited" check karna galat hai, kyunki ek DAG mein ek node legitimately alag paths se do baar reach ho sakta hai. Vaikalpik roop se, Kahn ka topological sort ek cycle detect karta hai jab wo har node emit kiye bina khatam ho jaaye.',
    },
  },
  {
    question: 'What is topological sorting and where is it used?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Topological sort produces a linear ordering of a DAG\'s nodes such that every edge points forward — every dependency comes before whatever depends on it. It exists only for acyclic graphs. Kahn\'s algorithm repeatedly removes nodes with in-degree zero; a DFS-based variant pushes nodes onto a stack on finish. It underlies build systems, module bundlers resolving imports, task schedulers, and course-prerequisite problems — anywhere ordering by dependency is required.',
      hinglish:
        'Topological sort ek DAG ke nodes ki ek linear ordering banata hai jahan har edge aage point kare — har dependency us se pehle aaye jo us pe depend karta hai. Ye sirf acyclic graphs ke liye exist karta hai. Kahn ka algorithm baar-baar in-degree zero wale nodes hataata hai; ek DFS-based variant finish pe nodes ko ek stack pe push karta hai. Ye build systems, imports resolve karte module bundlers, task schedulers, aur course-prerequisite problems ke neeche hai — jahan bhi dependency se ordering chahiye.',
    },
  },
  {
    question: 'How do you approach an unfamiliar DSA problem in an interview?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Restate the problem and confirm the constraints and edge cases — empty input, duplicates, negatives, size limits — before writing anything. Work a small example by hand to find the pattern. State a brute-force solution and its complexity so you always have a working answer, then optimise by asking what redundant work it repeats, which points to hashing, sorting, two pointers, or DP. Write the code while narrating your reasoning, then dry-run it on your example. Communication is assessed as heavily as the solution.',
      hinglish:
        'Kuch likhne se pehle problem dobara batao aur constraints aur edge cases confirm karo — empty input, duplicates, negatives, size limits. Pattern dhoondhne ke liye ek chhota example haath se karo. Ek brute-force solution aur uski complexity batao taaki tumhare paas hamesha ek working jawab ho, phir ye poochh kar optimise karo ki wo kaunsa redundant kaam dohraata hai, jo hashing, sorting, two pointers, ya DP ki taraf ishara karta hai. Apni reasoning bolte hue code likho, phir apne example pe dry-run karo. Communication ko solution jitna hi assess kiya jaata hai.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
