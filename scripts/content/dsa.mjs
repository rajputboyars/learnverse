// Data Structures & Algorithms (DSA) curriculum — beginner -> intermediate -> advanced.
// In-depth coverage of all important DSA topics. Same shape as javascript.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'DSA',
  slug: 'dsa',
  description:
    'Data Structures & Algorithms — Big O se le kar arrays, linked lists, trees, graphs aur dynamic programming tak. Interview-ready, English + Hinglish, desi examples aur code ke saath.',
  icon: '🧩',
  tags: ['dsa', 'algorithms', 'data-structures', 'interview', 'problem-solving'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 10,
};

const beginner = [
  {
    title: 'DSA Foundations',
    level: 'beginner',
    description: 'DSA kya hai, Big O complexity aur cases.',
    concepts: [
      {
        title: 'What is DSA & Why It Matters',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'A data structure is a way to organise data so it can be used efficiently (arrays, linked lists, trees, graphs). An algorithm is a step-by-step procedure to solve a problem (search, sort, shortest path). DSA together teaches you to pick the right structure and the most efficient method for a task — the core skill tested in coding interviews and needed to build fast software.',
          hinglish:
            'Data structure data ko organise karne ka tarika hai taaki use efficiently use kiya ja sake (arrays, linked lists, trees, graphs). Algorithm ek problem solve karne ka step-by-step tareeka hai (search, sort, shortest path). DSA milke sikhata hai ki kisi kaam ke liye sahi structure aur sabse efficient method kaise chuno — yahi coding interviews ka core skill hai aur fast software banane ke liye zaroori.',
        },
        dailyLifeExample:
          'Data structure almari ke organisation jaisa hai — kapde tah karke alag, books shelf pe, taaki dhoondhna fast ho. Algorithm wo method hai jisse tum jaldi sahi cheez nikaal lete ho. Galat organisation = har baar poori almari ulatni padti hai.',
        codeExample:
          '// Same task, two structures:\n// Find if a value exists\n\n// Array (unsorted): check each -> O(n)\n[3, 7, 1, 9].includes(7);\n\n// Set (hash): instant lookup -> O(1)\nconst s = new Set([3, 7, 1, 9]);\ns.has(7); // much faster at scale',
        keyPoints: [
          'Data structure = how data is organised',
          'Algorithm = steps to solve a problem',
          'Right structure + method = efficient software',
          'Core of coding interviews',
        ],
        quiz: [
          {
            question: 'What is an algorithm?',
            options: ['A type of data', 'A step-by-step procedure to solve a problem', 'A programming language', 'A database'],
            correctIndex: 1,
          },
          {
            question: 'Why does choosing the right data structure matter?',
            options: ['It looks nicer', 'It affects how efficiently you can store/access data', 'It is required by law', 'It does not matter'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Time & Space Complexity (Big O)',
        difficulty: 'medium',
        tags: ['big-o', 'complexity'],
        explanation: {
          english:
            'Big O describes how an algorithm scales as input size n grows — it counts the dominant operations, ignoring constants. Common classes from fast to slow: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n), O(n^2) quadratic, O(2^n) exponential. Space complexity measures extra memory used. We focus on the worst case to guarantee performance.',
          hinglish:
            'Big O batata hai ki input size n badhne par algorithm kaise scale karta hai — ye dominant operations count karta hai, constants ignore karke. Fast se slow common classes: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n), O(n^2) quadratic, O(2^n) exponential. Space complexity extra memory measure karti hai. Hum worst case pe focus karte hain taaki performance guarantee ho.',
        },
        dailyLifeExample:
          'O(1) ek dukaan jahan turant saamaan mil jaaye. O(n) ek line jahan har banda check karna pade. O(log n) dictionary mein binary search jaisa — har step mein aadhe pages chhod do. O(n^2) har banda har doosre se mile (poora hall handshake).',
        codeExample:
          '// O(1) — constant: one operation\nfunction first(arr) { return arr[0]; }\n\n// O(n) — linear: touch each element\nfunction sum(arr) { let s = 0; for (const x of arr) s += x; return s; }\n\n// O(n^2) — quadratic: nested loops\nfunction pairs(arr) {\n  for (let i = 0; i < arr.length; i++)\n    for (let j = 0; j < arr.length; j++) console.log(arr[i], arr[j]);\n}',
        keyPoints: [
          'Big O = how runtime grows with input size n',
          'Ignore constants & lower-order terms',
          'O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)',
          'Usually analyse the worst case',
        ],
        quiz: [
          {
            question: 'What is the time complexity of accessing arr[i] by index?',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
          {
            question: 'Two nested loops over n elements is usually…',
            options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
            correctIndex: 2,
          },
          {
            question: 'Which is the fastest-growing (slowest) complexity?',
            options: ['O(n)', 'O(log n)', 'O(2^n)', 'O(n log n)'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is Big O notation and why do we ignore constants?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Big O describes the asymptotic upper bound on how an algorithm\'s running time (or space) grows relative to input size. We ignore constants and lower-order terms because, as n grows large, the dominant term decides scalability — O(2n) and O(n) both scale linearly, so both are O(n). It lets us compare algorithms independent of hardware or language.',
              hinglish:
                'Big O ek asymptotic upper bound describe karta hai ki algorithm ka running time (ya space) input size ke relative kaise badhta hai. Hum constants aur lower-order terms ignore karte hain kyunki n bada hone par dominant term scalability decide karta hai — O(2n) aur O(n) dono linearly scale karte hain, isliye dono O(n). Isse algorithms ko hardware/language se independent compare kar sakte hain.',
            },
          },
        ],
      },
      {
        title: 'Best, Average & Worst Case',
        difficulty: 'easy',
        tags: ['complexity', 'analysis'],
        explanation: {
          english:
            'An algorithm can behave differently depending on the input. Best case is the luckiest input (e.g. target is the first element), worst case is the hardest (target absent or last), and average case is the expected behaviour over typical inputs. We usually quote the worst case (Big O) because it guarantees an upper bound, but average case matters in practice.',
          hinglish:
            'Ek algorithm input ke hisaab se alag behave kar sakta hai. Best case sabse lucky input (jaise target pehla element), worst case sabse mushkil (target absent ya last), aur average case typical inputs pe expected behaviour. Hum aksar worst case (Big O) batate hain kyunki wo upper bound guarantee karta hai, par average case practice mein matter karta hai.',
        },
        dailyLifeExample:
          'Chaabi dhoondhna: best case — pehli jeb mein mil gayi. Worst case — aakhri jeb ya mili hi nahi (saari jeb check). Average case — beech mein kahin mil jaati hai.',
        codeExample:
          'function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i; // best: i=0 (O(1))\n  }\n  return -1;                          // worst: not found (O(n))\n}',
        keyPoints: [
          'Best = luckiest input, worst = hardest input',
          'Average = expected over typical inputs',
          'Big O usually states the worst case',
          'Worst case guarantees an upper bound',
        ],
        quiz: [
          {
            question: 'Linear search best case (target is first element) is…',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
          {
            question: 'Which case does Big O usually describe?',
            options: ['Best', 'Average', 'Worst', 'None'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    title: 'Arrays & Techniques',
    level: 'beginner',
    description: 'Arrays aur powerful patterns — two pointers, sliding window, prefix sum.',
    concepts: [
      {
        title: 'Arrays & Basic Operations',
        difficulty: 'easy',
        tags: ['array', 'basics'],
        explanation: {
          english:
            'An array stores elements in contiguous memory, accessed by index in O(1). Reading/updating by index is O(1). Inserting or deleting in the middle is O(n) because elements must shift. Searching an unsorted array is O(n). Arrays are the most fundamental structure and the base for many others.',
          hinglish:
            'Array elements ko contiguous memory mein store karta hai, index se O(1) mein access hota hai. Index se read/update O(1). Beech mein insert ya delete O(n) hai kyunki elements shift karne padte hain. Unsorted array mein search O(n). Arrays sabse fundamental structure hain aur bahut doosron ki base.',
        },
        dailyLifeExample:
          'Array ek train ke dabbon jaisa hai — har dabba ek number (index) pe, seedha jao aur baith jao (O(1)). Par beech mein naya dabba lagana ho to peeche ke saare dabbe khiskane padte hain (O(n)).',
        codeExample:
          'const a = [10, 20, 30];\na[1];            // read  -> 20  (O(1))\na[1] = 25;       // update      (O(1))\na.push(40);      // add end     (O(1) amortised)\na.splice(1, 0, 15); // insert middle (O(n) — shifts)\na.indexOf(30);   // search unsorted (O(n))',
        keyPoints: [
          'Index access/update: O(1)',
          'Insert/delete in middle: O(n) (shifting)',
          'Search unsorted: O(n)',
          'Contiguous memory — base of many structures',
        ],
        quiz: [
          {
            question: 'Accessing an array element by index is…',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
          {
            question: 'Why is inserting in the middle of an array O(n)?',
            options: ['Memory is slow', 'Elements after it must shift', 'Arrays are immutable', 'It is actually O(1)'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Two Pointers Technique',
        difficulty: 'medium',
        tags: ['array', 'two-pointers', 'pattern'],
        explanation: {
          english:
            'Two pointers uses two indices that move through the data — often from both ends toward the middle, or one slow and one fast. It turns many O(n^2) brute-force problems into O(n). Classic uses: checking a palindrome, finding a pair with a given sum in a sorted array, reversing in place, and removing duplicates.',
          hinglish:
            'Two pointers do indices use karta hai jo data mein move karte hain — aksar dono ends se beech ki taraf, ya ek slow ek fast. Ye kai O(n^2) brute-force problems ko O(n) bana deta hai. Classic uses: palindrome check, sorted array mein given sum wala pair dhoondhna, in-place reverse, aur duplicates hatana.',
        },
        dailyLifeExample:
          'Do log ek kitaab ke dono sirhon (ends) se ek saath padhna shuru karein aur beech mein milein — aadhe time mein kaam. Yahi two pointers hai.',
        codeExample:
          '// Pair with target sum in a SORTED array — O(n)\nfunction hasPairSum(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    const sum = arr[left] + arr[right];\n    if (sum === target) return true;\n    if (sum < target) left++;   // need bigger -> move left up\n    else right--;               // need smaller -> move right down\n  }\n  return false;\n}',
        keyPoints: [
          'Two indices move through the data',
          'Often both ends -> middle, or slow + fast',
          'Turns many O(n^2) into O(n)',
          'Great for sorted arrays, palindromes, in-place ops',
        ],
        quiz: [
          {
            question: 'Two pointers often reduces a brute-force O(n^2) to…',
            options: ['O(n^3)', 'O(n)', 'O(2^n)', 'no change'],
            correctIndex: 1,
          },
          {
            question: 'The pair-sum two-pointer trick requires the array to be…',
            options: ['empty', 'sorted', 'reversed', 'all positive'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you check if a string is a palindrome in O(n) time, O(1) space?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Use two pointers: one at the start, one at the end. Compare the characters; if they ever differ, it is not a palindrome. Move both inward until they cross. This is O(n) time (each char visited once) and O(1) space (no extra copy), beating the reverse-and-compare approach that uses O(n) extra space.',
              hinglish:
                'Two pointers use karo: ek start pe, ek end pe. Characters compare karo; agar kabhi alag huye to palindrome nahi. Dono ko andar ki taraf badhao jab tak cross na karein. Ye O(n) time (har char ek baar) aur O(1) space (koi extra copy nahi) hai, reverse-and-compare se behtar jo O(n) extra space leta hai.',
            },
          },
        ],
      },
      {
        title: 'Sliding Window',
        difficulty: 'medium',
        tags: ['array', 'sliding-window', 'pattern'],
        explanation: {
          english:
            'A sliding window maintains a contiguous range (window) over an array/string and slides it instead of recomputing from scratch. Fixed-size windows solve "max sum of k elements"; variable-size windows solve "longest substring without repeats". You add the entering element and remove the leaving one, keeping work O(n) instead of O(n*k).',
          hinglish:
            'Sliding window ek contiguous range (window) array/string pe maintain karta hai aur use slide karta hai, har baar dobara compute karne ke bajaye. Fixed-size windows "k elements ka max sum" solve karte hain; variable-size windows "longest substring without repeats". Tum aane wala element add karte ho aur jaane wala remove, kaam O(n) rehta hai O(n*k) ke bajaye.',
        },
        dailyLifeExample:
          'Chalti train ki khidki se baahar dekhna — view slide hota rehta hai, tum poora raasta dobara nahi dekhte, bas naya jo aaya wo add aur jo gaya wo gaya.',
        codeExample:
          '// Max sum of any k consecutive elements — O(n)\nfunction maxSum(arr, k) {\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += arr[i];\n  let best = sum;\n  for (let i = k; i < arr.length; i++) {\n    sum += arr[i] - arr[i - k]; // add new, drop old\n    best = Math.max(best, sum);\n  }\n  return best;\n}',
        keyPoints: [
          'Maintain a contiguous window and slide it',
          'Fixed-size: max/min sum of k elements',
          'Variable-size: longest/shortest valid substring',
          'O(n) instead of recomputing each window',
        ],
        quiz: [
          {
            question: 'Sliding window avoids recomputation by…',
            options: ['sorting first', 'adding the new element and removing the old one', 'using recursion', 'copying the array'],
            correctIndex: 1,
          },
          {
            question: '"Longest substring without repeating characters" uses which window type?',
            options: ['Fixed-size', 'Variable-size', 'No window', 'Two windows'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Prefix Sum',
        difficulty: 'medium',
        tags: ['array', 'prefix-sum', 'pattern'],
        explanation: {
          english:
            'A prefix sum array stores the cumulative sum up to each index, so the sum of any range [i, j] is prefix[j+1] - prefix[i] in O(1). Building it is O(n); after that, unlimited range-sum queries are instant. It is the base for many range and subarray problems (e.g. count subarrays with a given sum using a hash map).',
          hinglish:
            'Prefix sum array har index tak ka cumulative sum store karta hai, isliye kisi bhi range [i, j] ka sum prefix[j+1] - prefix[i] se O(1) mein milta hai. Banane mein O(n); uske baad unlimited range-sum queries instant. Ye kai range aur subarray problems ki base hai (jaise hash map se given sum wale subarrays count karna).',
        },
        dailyLifeExample:
          'Cricket ka cumulative score-board — har over ke baad total likha hota hai. Over 5 se 10 ke runs jaanne ke liye: score[10] - score[5]. Dobara joadna nahi padta.',
        codeExample:
          '// Range sum queries in O(1) after O(n) build\nfunction buildPrefix(arr) {\n  const p = [0];\n  for (let i = 0; i < arr.length; i++) p[i + 1] = p[i] + arr[i];\n  return p;\n}\nconst p = buildPrefix([2, 4, 6, 8]);\n// sum of indices 1..2 (4+6):\np[3] - p[1]; // 10',
        keyPoints: [
          'prefix[k] = sum of first k elements',
          'Range sum [i, j] = prefix[j+1] - prefix[i] in O(1)',
          'Build O(n), then queries O(1)',
          'Base for subarray-sum problems',
        ],
        quiz: [
          {
            question: 'After building a prefix-sum array, a range sum query takes…',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
          {
            question: 'The range sum of indices i..j equals…',
            options: ['prefix[j] - prefix[i]', 'prefix[j+1] - prefix[i]', 'prefix[i] - prefix[j]', 'prefix[j] + prefix[i]'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Strings',
    level: 'beginner',
    description: 'String manipulation aur searching.',
    concepts: [
      {
        title: 'String Basics & Manipulation',
        difficulty: 'easy',
        tags: ['string', 'basics'],
        explanation: {
          english:
            'Strings are sequences of characters and, in most languages, immutable — operations create new strings. Common tasks: reversing, checking anagrams (compare sorted chars or character counts), and frequency counting with a hash map. Because building strings repeatedly is costly, accumulate into an array and join once when needed.',
          hinglish:
            'Strings characters ke sequences hain aur zyadatar languages mein immutable — operations nayi strings banate hain. Common tasks: reverse karna, anagrams check karna (sorted chars ya character counts compare karke), aur hash map se frequency counting. Baar-baar string banana mehnga hai, isliye array mein collect karke ek baar join karo.',
        },
        dailyLifeExample:
          'Anagram check ek scrabble jaisa hai — "listen" aur "silent" mein same letters hain bas order alag. Har letter ginlo, dono mein same count hua to anagram.',
        codeExample:
          '// Reverse\n"hello".split("").reverse().join(""); // "olleh"\n\n// Anagram check via frequency — O(n)\nfunction isAnagram(a, b) {\n  if (a.length !== b.length) return false;\n  const count = {};\n  for (const ch of a) count[ch] = (count[ch] || 0) + 1;\n  for (const ch of b) {\n    if (!count[ch]) return false;\n    count[ch]--;\n  }\n  return true;\n}',
        keyPoints: [
          'Strings are usually immutable',
          'Anagram: compare char counts (O(n))',
          'Frequency counting uses a hash map',
          'Build via array + join to avoid O(n^2)',
        ],
        quiz: [
          {
            question: 'Two strings are anagrams if they…',
            options: ['are equal', 'have the same characters with the same counts', 'have the same length only', 'start with the same letter'],
            correctIndex: 1,
          },
          {
            question: 'Strings in most languages are…',
            options: ['mutable', 'immutable', 'numbers', 'arrays of arrays'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Substring Search & Pattern Matching',
        difficulty: 'medium',
        tags: ['string', 'searching', 'kmp'],
        explanation: {
          english:
            'Finding a pattern inside a text is a classic problem. The naive approach checks the pattern at every position — O(n*m). Efficient algorithms like KMP (Knuth-Morris-Pratt) preprocess the pattern to skip redundant comparisons, achieving O(n + m). The key idea in KMP is the "longest proper prefix that is also a suffix" (LPS) array, which tells how far to jump on a mismatch.',
          hinglish:
            'Text ke andar pattern dhoondhna ek classic problem hai. Naive approach har position pe pattern check karta hai — O(n*m). KMP (Knuth-Morris-Pratt) jaise efficient algorithms pattern ko preprocess karke redundant comparisons skip karte hain, O(n + m) mein. KMP ka key idea "longest proper prefix jo suffix bhi ho" (LPS) array hai, jo batata hai mismatch pe kitna jump karna hai.',
        },
        dailyLifeExample:
          'Kitaab mein ek shabd dhoondhna — naive matlab har page har line padho. Smart (KMP) matlab pehle se note rakho ki kahan match toot raha hai taaki dobara wahi na padhna pade.',
        codeExample:
          '// Naive substring search — O(n*m)\nfunction find(text, pat) {\n  for (let i = 0; i + pat.length <= text.length; i++) {\n    let j = 0;\n    while (j < pat.length && text[i + j] === pat[j]) j++;\n    if (j === pat.length) return i; // found at i\n  }\n  return -1;\n}\n// KMP improves this to O(n + m) using an LPS array.',
        keyPoints: [
          'Naive search: O(n*m)',
          'KMP: O(n + m) using the LPS array',
          'LPS = longest prefix that is also a suffix',
          'Preprocessing avoids re-checking characters',
        ],
        quiz: [
          {
            question: 'Naive substring search has time complexity…',
            options: ['O(n)', 'O(n*m)', 'O(log n)', 'O(1)'],
            correctIndex: 1,
          },
          {
            question: 'KMP achieves which time complexity?',
            options: ['O(n*m)', 'O(n + m)', 'O(n^2)', 'O(2^n)'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Linked Lists',
    level: 'intermediate',
    description: 'Nodes ki chain — singly, doubly, reverse aur cycle detection.',
    concepts: [
      {
        title: 'Singly Linked List',
        difficulty: 'medium',
        tags: ['linked-list'],
        explanation: {
          english:
            'A linked list is a chain of nodes where each node holds a value and a pointer to the next node. Unlike arrays, elements are not contiguous, so there is no O(1) index access — reaching position i is O(n). But inserting/deleting at the head is O(1), and at a known node is O(1), with no shifting. Great when you do many insertions/deletions and do not need random access.',
          hinglish:
            'Linked list nodes ki ek chain hai jahan har node ek value aur agle node ka pointer rakhta hai. Arrays ke unlike elements contiguous nahi hote, isliye O(1) index access nahi — position i tak pahunchna O(n). Par head pe insert/delete O(1), aur known node pe O(1), bina shifting. Tab badhiya jab bahut insertions/deletions hon aur random access na chahiye.',
        },
        dailyLifeExample:
          'Linked list ek treasure hunt jaisa hai — har parchi (node) agli parchi ka address (pointer) deti hai. Beech mein nayi parchi jodna easy, par 7vi parchi tak jaane ke liye 1 se 7 tak chalna padega.',
        codeExample:
          'class Node {\n  constructor(val) { this.val = val; this.next = null; }\n}\n\n// build 1 -> 2 -> 3\nconst head = new Node(1);\nhead.next = new Node(2);\nhead.next.next = new Node(3);\n\n// traverse — O(n)\nlet cur = head;\nwhile (cur) { console.log(cur.val); cur = cur.next; }',
        keyPoints: [
          'Node = value + pointer to next',
          'No O(1) random access (reach i is O(n))',
          'Insert/delete at head: O(1)',
          'No shifting unlike arrays',
        ],
        quiz: [
          {
            question: 'Accessing the i-th element of a singly linked list is…',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
          {
            question: 'Inserting at the head of a linked list is…',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you use a linked list over an array?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Use a linked list when you have frequent insertions/deletions at the ends or at known nodes and do not need random access by index — those operations are O(1) with no shifting. Arrays are better for index access (O(1)) and cache locality. In practice arrays/dynamic arrays win for most cases due to cache performance; linked lists shine for queues, LRU caches, and when splicing nodes cheaply matters.',
              hinglish:
                'Linked list tab use karo jab ends ya known nodes pe frequent insertions/deletions hon aur index se random access na chahiye — wo operations O(1) bina shifting. Arrays index access (O(1)) aur cache locality ke liye better hain. Practice mein cache performance ki wajah se arrays/dynamic arrays zyadatar jeet te hain; linked lists queues, LRU caches, aur sasta node splicing ke liye achhe hain.',
            },
          },
        ],
      },
      {
        title: 'Doubly Linked List',
        difficulty: 'medium',
        tags: ['linked-list'],
        explanation: {
          english:
            'A doubly linked list adds a prev pointer to each node, so you can traverse both forward and backward and delete a node in O(1) when you have a reference to it (no need to find the previous node). The cost is extra memory per node and more pointer bookkeeping. It powers LRU caches, browser history, and undo/redo.',
          hinglish:
            'Doubly linked list har node mein ek prev pointer add karta hai, isliye tum aage aur peeche dono traverse kar sakte ho aur node ka reference hone par use O(1) mein delete kar sakte ho (previous node dhoondhna nahi padta). Cost: har node mein extra memory aur zyada pointer bookkeeping. Ye LRU caches, browser history, aur undo/redo chalata hai.',
        },
        dailyLifeExample:
          'Doubly linked list ek metro line jaisi hai jahan tum dono direction mein ja sakte ho — har station agle aur pichhle station ko jaanta hai.',
        codeExample:
          'class DNode {\n  constructor(val) { this.val = val; this.prev = null; this.next = null; }\n}\n// delete a node in O(1) given its reference\nfunction remove(node) {\n  if (node.prev) node.prev.next = node.next;\n  if (node.next) node.next.prev = node.prev;\n}',
        keyPoints: [
          'Each node has prev + next',
          'Traverse both directions',
          'Delete a known node in O(1)',
          'Used in LRU cache, history, undo/redo',
        ],
        quiz: [
          {
            question: 'What does a doubly linked list add over a singly linked list?',
            options: ['Index access', 'A prev pointer (backward traversal)', 'Sorting', 'Hashing'],
            correctIndex: 1,
          },
          {
            question: 'A real use of a doubly linked list is…',
            options: ['Binary search', 'LRU cache', 'Bubble sort', 'Prefix sum'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Reverse a Linked List',
        difficulty: 'medium',
        tags: ['linked-list', 'pointers'],
        explanation: {
          english:
            'Reversing a singly linked list is a must-know interview problem. Iteratively, walk the list keeping three pointers — prev, curr, next — and flip each node\'s next pointer to point backward. It runs in O(n) time and O(1) space. It can also be done recursively, but that uses O(n) stack space.',
          hinglish:
            'Singly linked list reverse karna ek must-know interview problem hai. Iteratively, list pe chalo teen pointers ke saath — prev, curr, next — aur har node ka next pointer peeche ki taraf flip karo. Ye O(n) time aur O(1) space mein chalta hai. Recursively bhi ho sakta hai, par wo O(n) stack space leta hai.',
        },
        dailyLifeExample:
          'Ek line mein khade logon ko ulta karna — har banda apna haath aage wale ke bajaye peeche wale ki taraf kar de. Ek-ek karke poori line palat jaati hai.',
        codeExample:
          'function reverse(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    const next = curr.next; // save next\n    curr.next = prev;       // flip pointer\n    prev = curr;            // move prev up\n    curr = next;            // move curr up\n  }\n  return prev; // new head\n}',
        keyPoints: [
          'Keep three pointers: prev, curr, next',
          'Flip each next pointer backward',
          'O(n) time, O(1) space (iterative)',
          'Recursive version uses O(n) stack',
        ],
        quiz: [
          {
            question: 'Iterative linked list reversal uses how much extra space?',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
          {
            question: 'How many pointers does the iterative reversal track?',
            options: ['1', '2', '3', '4'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: "Cycle Detection (Floyd's Algorithm)",
        difficulty: 'hard',
        tags: ['linked-list', 'two-pointers'],
        explanation: {
          english:
            "Floyd's cycle detection (the tortoise and hare) uses two pointers moving at different speeds: slow moves one step, fast moves two. If there is a cycle, fast eventually laps and meets slow; if fast reaches null, there is no cycle. It detects a loop in O(n) time and O(1) space, far better than storing visited nodes in a set (O(n) space).",
          hinglish:
            "Floyd's cycle detection (tortoise aur hare) do pointers use karta hai jo alag speed se chalte hain: slow ek step, fast do step. Agar cycle hai, fast ghoom ke slow se mil jaata hai; agar fast null pe pahunch jaaye, koi cycle nahi. Ye loop O(n) time aur O(1) space mein detect karta hai, visited nodes ko set mein store karne (O(n) space) se kaafi behtar.",
        },
        dailyLifeExample:
          'Ek circular track pe tez aur dheere daudne wale — agar track gol (cycle) hai to tez wala dheere wale se zaroor milega. Agar raasta seedha (no cycle) hai to tez wala pehle khatam line pe pahunch jaayega.',
        codeExample:
          'function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;        // 1 step\n    fast = fast.next.next;   // 2 steps\n    if (slow === fast) return true; // they met -> cycle\n  }\n  return false; // fast hit null -> no cycle\n}',
        keyPoints: [
          'Two pointers: slow (1x) and fast (2x)',
          'They meet inside a cycle',
          'fast hits null -> no cycle',
          'O(n) time, O(1) space',
        ],
        quiz: [
          {
            question: "In Floyd's algorithm, the fast pointer moves…",
            options: ['1 step', '2 steps', '3 steps', 'random steps'],
            correctIndex: 1,
          },
          {
            question: "Floyd's cycle detection space complexity is…",
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Stacks & Queues',
    level: 'intermediate',
    description: 'LIFO aur FIFO structures.',
    concepts: [
      {
        title: 'Stack (LIFO)',
        difficulty: 'easy',
        tags: ['stack', 'lifo'],
        explanation: {
          english:
            'A stack is Last-In-First-Out: you push to the top and pop from the top, both O(1). It models nested/reverse-order processing: function call stacks, undo, matching brackets, expression evaluation, and DFS. In JavaScript an array with push/pop is a stack.',
          hinglish:
            'Stack Last-In-First-Out hai: top pe push karo aur top se pop karo, dono O(1). Ye nested/reverse-order processing model karta hai: function call stacks, undo, brackets matching, expression evaluation, aur DFS. JavaScript mein push/pop wala array ek stack hai.',
        },
        dailyLifeExample:
          'Stack platon ke dher jaisa hai — upar plate rakho (push), upar se hi utha lo (pop). Sabse pehle rakhi plate sabse aakhir mein nikalti hai.',
        codeExample:
          '// Valid parentheses using a stack — O(n)\nfunction isValid(s) {\n  const stack = [], pairs = { ")": "(", "]": "[", "}": "{" };\n  for (const ch of s) {\n    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);\n    else if (stack.pop() !== pairs[ch]) return false;\n  }\n  return stack.length === 0;\n}',
        keyPoints: [
          'LIFO: last in, first out',
          'push/pop are O(1)',
          'Used in call stack, undo, bracket matching, DFS',
          'An array with push/pop works as a stack',
        ],
        quiz: [
          {
            question: 'A stack follows which order?',
            options: ['FIFO', 'LIFO', 'sorted', 'random'],
            correctIndex: 1,
          },
          {
            question: 'Which problem is naturally solved with a stack?',
            options: ['Shortest path', 'Matching brackets', 'Sorting numbers', 'Range sum'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you check for balanced parentheses?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'Use a stack. Push every opening bracket. On a closing bracket, pop the stack and check it matches the corresponding opening type; if it does not match (or the stack is empty), the string is invalid. At the end, a valid string leaves the stack empty. This is O(n) time and O(n) space.',
              hinglish:
                'Stack use karo. Har opening bracket push karo. Closing bracket pe stack pop karke check karo ki wo corresponding opening type se match kare; agar match nahi (ya stack khaali) to string invalid. Aakhir mein valid string stack ko khaali chhodti hai. Ye O(n) time aur O(n) space hai.',
            },
          },
        ],
      },
      {
        title: 'Queue (FIFO)',
        difficulty: 'easy',
        tags: ['queue', 'fifo'],
        explanation: {
          english:
            'A queue is First-In-First-Out: you enqueue at the back and dequeue from the front. It models fair, in-order processing: task scheduling, printer jobs, and breadth-first search (BFS). Using an array shift() is O(n); a proper queue uses a linked list or two pointers for O(1) enqueue/dequeue.',
          hinglish:
            'Queue First-In-First-Out hai: peeche enqueue karo aur aage se dequeue. Ye fair, in-order processing model karta hai: task scheduling, printer jobs, aur breadth-first search (BFS). Array shift() O(n) hai; proper queue linked list ya two pointers se O(1) enqueue/dequeue karta hai.',
        },
        dailyLifeExample:
          'Queue ek ticket line jaisi hai — jo pehle aaya wo pehle serve hota hai (FIFO). Naya banda peeche lagta hai, agla front se nikalta hai.',
        codeExample:
          '// O(1) queue using two pointers over a map/array\nclass Queue {\n  constructor() { this.items = {}; this.front = 0; this.back = 0; }\n  enqueue(x) { this.items[this.back++] = x; }\n  dequeue() {\n    const x = this.items[this.front];\n    delete this.items[this.front++];\n    return x;\n  }\n}',
        keyPoints: [
          'FIFO: first in, first out',
          'enqueue at back, dequeue at front',
          'Used in scheduling, BFS',
          'Array shift() is O(n) — use pointers/linked list for O(1)',
        ],
        quiz: [
          {
            question: 'A queue follows which order?',
            options: ['LIFO', 'FIFO', 'sorted', 'random'],
            correctIndex: 1,
          },
          {
            question: 'Which traversal uses a queue?',
            options: ['DFS', 'BFS', 'Binary search', 'Quick sort'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Deque & Priority Queue',
        difficulty: 'medium',
        tags: ['deque', 'priority-queue', 'heap'],
        explanation: {
          english:
            'A deque (double-ended queue) allows push/pop at both ends in O(1) — useful for sliding-window maximum and palindrome checks. A priority queue returns the highest- (or lowest-) priority element first, regardless of insertion order; it is usually implemented with a heap, giving O(log n) insert and O(log n) extract-min/max. Priority queues power Dijkstra, scheduling, and "top-k" problems.',
          hinglish:
            'Deque (double-ended queue) dono ends pe push/pop O(1) mein allow karta hai — sliding-window maximum aur palindrome checks ke liye useful. Priority queue insertion order chahe jo ho, highest- (ya lowest-) priority element pehle deta hai; ye aksar heap se implement hota hai, O(log n) insert aur O(log n) extract-min/max. Priority queues Dijkstra, scheduling, aur "top-k" problems chalati hain.',
        },
        dailyLifeExample:
          'Priority queue hospital ke emergency ward jaisa hai — jo zyada serious (high priority) hai use pehle dekha jaata hai, chahe wo baad mein aaya ho. Line ka order nahi, urgency matter karti hai.',
        codeExample:
          '// Priority queue idea (min-heap): smallest comes out first\n// Conceptual API:\n// pq.push(value)        -> O(log n)\n// pq.pop()  // smallest -> O(log n)\n// pq.peek() // smallest -> O(1)\n// Used in Dijkstra, top-k, scheduling.',
        keyPoints: [
          'Deque: push/pop at both ends O(1)',
          'Priority queue: highest priority out first',
          'Usually backed by a heap (O(log n) ops)',
          'Powers Dijkstra, scheduling, top-k',
        ],
        quiz: [
          {
            question: 'A priority queue returns…',
            options: ['the first inserted item', 'the highest/lowest priority item', 'a random item', 'the last item'],
            correctIndex: 1,
          },
          {
            question: 'A priority queue is usually implemented with a…',
            options: ['stack', 'heap', 'hash map', 'linked list'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Hashing',
    level: 'intermediate',
    description: 'O(1) lookups — hash maps aur sets.',
    concepts: [
      {
        title: 'Hash Tables (Maps)',
        difficulty: 'medium',
        tags: ['hashing', 'hash-map'],
        explanation: {
          english:
            'A hash table stores key-value pairs and gives average O(1) insert, lookup, and delete by hashing the key to an array index. Collisions (two keys hashing to the same slot) are handled by chaining (a list per slot) or open addressing. Worst case is O(n) if many collisions, but good hash functions keep it near O(1). Maps are the go-to for counting, caching, and de-duplication.',
          hinglish:
            'Hash table key-value pairs store karta hai aur key ko array index pe hash karke average O(1) insert, lookup, delete deta hai. Collisions (do keys same slot pe) chaining (har slot pe list) ya open addressing se handle hote hain. Worst case O(n) agar bahut collisions, par achhe hash functions ise O(1) ke paas rakhte hain. Maps counting, caching, aur de-duplication ke liye first choice hain.',
        },
        dailyLifeExample:
          'Hash table ek library ke catalogue jaisa hai — book ka naam (key) do, system seedha shelf number (index) bata deta hai. Poori library scan karne ki zaroorat nahi.',
        codeExample:
          '// Two Sum using a hash map — O(n)\nfunction twoSum(nums, target) {\n  const seen = new Map(); // value -> index\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}',
        keyPoints: [
          'Average O(1) insert/lookup/delete',
          'Key is hashed to an array index',
          'Collisions handled by chaining/open addressing',
          'Worst case O(n) with many collisions',
        ],
        quiz: [
          {
            question: 'Average lookup time in a hash table is…',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
          {
            question: 'Two different keys mapping to the same slot is called a…',
            options: ['rehash', 'collision', 'overflow', 'fault'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How does a hash map achieve O(1) lookups, and what causes collisions?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'A hash function converts a key into an array index, so you jump straight to the bucket instead of scanning — average O(1). Collisions happen when different keys hash to the same index (the pigeonhole principle guarantees this since the key space exceeds the table size). They are resolved by separate chaining (a linked list/array per bucket) or open addressing (probing for the next free slot). A good hash function and load-factor-based resizing keep performance near O(1).',
              hinglish:
                'Hash function key ko array index mein convert karta hai, isliye scan ke bajaye seedha bucket pe jump — average O(1). Collisions tab hote hain jab alag keys same index pe hash hon (pigeonhole principle isse guarantee karta hai kyunki key space table size se bada hai). Inhe separate chaining (har bucket pe linked list/array) ya open addressing (agle free slot ke liye probing) se resolve karte hain. Achha hash function aur load-factor-based resizing performance ko O(1) ke paas rakhte hain.',
            },
          },
        ],
      },
      {
        title: 'Sets & De-duplication',
        difficulty: 'easy',
        tags: ['hashing', 'set'],
        explanation: {
          english:
            'A set stores unique values with average O(1) add and membership checks, backed by a hash table. It is the simplest tool for de-duplication, detecting whether you have "seen" something, and fast membership tests. Many array problems (find duplicates, intersection of two arrays) become O(n) with a set instead of O(n^2).',
          hinglish:
            'Set unique values store karta hai average O(1) add aur membership checks ke saath, hash table pe based. Ye de-duplication, kuch "dekha hai ya nahi" detect karne, aur fast membership tests ka simplest tool hai. Bahut array problems (duplicates dhoondhna, do arrays ka intersection) set se O(n) ban jaati hain O(n^2) ke bajaye.',
        },
        dailyLifeExample:
          'Set ek guest list jaisa hai jisme har naam ek hi baar — koi duplicate apne aap hat jaata hai, aur "ye banda invited hai kya" turant pata chal jaata hai.',
        codeExample:
          '// Has duplicates? — O(n)\nfunction hasDuplicate(arr) {\n  const seen = new Set();\n  for (const x of arr) {\n    if (seen.has(x)) return true;\n    seen.add(x);\n  }\n  return false;\n}',
        keyPoints: [
          'Stores unique values, O(1) average add/has',
          'Backed by a hash table',
          'Great for de-duplication & membership tests',
          'Turns many O(n^2) array problems into O(n)',
        ],
        quiz: [
          {
            question: 'A set is mainly used to…',
            options: ['sort data', 'store unique values & test membership fast', 'index data', 'reverse data'],
            correctIndex: 1,
          },
          {
            question: 'Checking membership in a hash set is on average…',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Recursion & Backtracking',
    level: 'intermediate',
    description: 'Khud ko call karna aur choices explore karna.',
    concepts: [
      {
        title: 'Recursion',
        difficulty: 'medium',
        tags: ['recursion'],
        explanation: {
          english:
            'Recursion solves a problem by solving smaller instances of the same problem. Every recursion needs a base case (when to stop) and a recursive case (how to shrink toward the base). Each call adds a frame to the call stack, so deep recursion can overflow it. It naturally models trees, divide-and-conquer, and problems with self-similar structure.',
          hinglish:
            'Recursion ek problem ko usi problem ke chhote instances solve karke solve karta hai. Har recursion mein base case (kab rukna) aur recursive case (base ki taraf kaise chhota karna) chahiye. Har call call stack pe ek frame add karti hai, isliye deep recursion overflow kar sakti hai. Ye trees, divide-and-conquer, aur self-similar structure wali problems ko naturally model karta hai.',
        },
        dailyLifeExample:
          'Recursion Russian dolls jaisa hai — har doll ke andar chhoti doll, kholte jao jab tak sabse chhoti (base case) na aaye.',
        codeExample:
          'function factorial(n) {\n  if (n <= 1) return 1;          // base case\n  return n * factorial(n - 1);  // recursive case\n}\nfactorial(5); // 120\n\n// Fibonacci (naive — O(2^n), shows why memoization matters)\nfunction fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }',
        keyPoints: [
          'Solve via smaller instances of itself',
          'Needs a base case + recursive case',
          'Each call uses call-stack space',
          'Natural for trees & divide-and-conquer',
        ],
        quiz: [
          {
            question: 'What stops a recursion from running forever?',
            options: ['the recursive case', 'the base case', 'a loop', 'the stack'],
            correctIndex: 1,
          },
          {
            question: 'Naive recursive Fibonacci has time complexity…',
            options: ['O(n)', 'O(2^n)', 'O(log n)', 'O(1)'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Backtracking',
        difficulty: 'hard',
        tags: ['backtracking', 'recursion'],
        explanation: {
          english:
            'Backtracking builds a solution incrementally and abandons ("backtracks" from) a path as soon as it cannot lead to a valid solution. It explores a decision tree using recursion: choose -> explore -> un-choose. It solves permutations, combinations, subsets, N-Queens, Sudoku, and maze paths. Pruning invalid branches early makes it far faster than brute force.',
          hinglish:
            'Backtracking solution ko incrementally banata hai aur jaise hi koi path valid solution tak nahi le ja sakta, use chhod deta hai ("backtrack" karta hai). Ye recursion se ek decision tree explore karta hai: choose -> explore -> un-choose. Ye permutations, combinations, subsets, N-Queens, Sudoku, aur maze paths solve karta hai. Invalid branches jaldi prune karna ise brute force se kaafi fast banata hai.',
        },
        dailyLifeExample:
          'Bhulbhulaiya (maze) mein raasta dhoondhna — ek raasta chuno, dead-end aaya to wapas aakar doosra try karo. Har galat raasta jaldi chhod do.',
        codeExample:
          '// All subsets of [1,2,3] — backtracking\nfunction subsets(nums) {\n  const res = [], path = [];\n  function backtrack(start) {\n    res.push([...path]);              // record choice\n    for (let i = start; i < nums.length; i++) {\n      path.push(nums[i]);             // choose\n      backtrack(i + 1);               // explore\n      path.pop();                     // un-choose (backtrack)\n    }\n  }\n  backtrack(0);\n  return res;\n}',
        keyPoints: [
          'Build incrementally; abandon dead ends',
          'Pattern: choose -> explore -> un-choose',
          'Solves permutations, subsets, N-Queens, Sudoku',
          'Pruning early beats brute force',
        ],
        quiz: [
          {
            question: 'Backtracking abandons a path when…',
            options: ['it is too short', 'it cannot lead to a valid solution', 'it is the first path', 'never'],
            correctIndex: 1,
          },
          {
            question: 'The core backtracking pattern is…',
            options: ['sort -> search', 'choose -> explore -> un-choose', 'push -> pop', 'hash -> lookup'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Sorting',
    level: 'intermediate',
    description: 'Data ko order mein lagana — basic se efficient tak.',
    concepts: [
      {
        title: 'Basic Sorts (Bubble, Selection, Insertion)',
        difficulty: 'easy',
        tags: ['sorting'],
        explanation: {
          english:
            'These simple sorts are O(n^2) but teach the fundamentals. Bubble sort repeatedly swaps adjacent out-of-order elements. Selection sort repeatedly picks the minimum and places it. Insertion sort builds a sorted prefix by inserting each element into place — it is efficient (near O(n)) on nearly-sorted data. All are easy to code but too slow for large inputs.',
          hinglish:
            'Ye simple sorts O(n^2) hain par fundamentals sikhate hain. Bubble sort baar-baar adjacent out-of-order elements swap karta hai. Selection sort baar-baar minimum chunta hai aur place karta hai. Insertion sort har element ko sahi jagah insert karke ek sorted prefix banata hai — nearly-sorted data pe efficient (near O(n)). Sab code karne mein easy par bade inputs ke liye bahut slow.',
        },
        dailyLifeExample:
          'Insertion sort taash ke patte haath mein sort karne jaisa hai — har naya patta uthao aur apni jagah pe ghusa do.',
        codeExample:
          '// Insertion sort — O(n^2), great on nearly-sorted data\nfunction insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let key = arr[i], j = i - 1;\n    while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }\n    arr[j + 1] = key;\n  }\n  return arr;\n}',
        keyPoints: [
          'Bubble/Selection/Insertion are O(n^2)',
          'Insertion sort is fast on nearly-sorted data',
          'Simple to implement, good for learning',
          'Too slow for large inputs',
        ],
        quiz: [
          {
            question: 'Bubble, selection and insertion sort are all…',
            options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
            correctIndex: 2,
          },
          {
            question: 'Which is efficient on nearly-sorted data?',
            options: ['Bubble sort', 'Insertion sort', 'Selection sort', 'None'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Merge Sort',
        difficulty: 'medium',
        tags: ['sorting', 'divide-and-conquer'],
        explanation: {
          english:
            'Merge sort is a divide-and-conquer algorithm: split the array in half recursively until single elements, then merge sorted halves back together. It is always O(n log n) regardless of input and is stable (keeps equal elements in order), but it uses O(n) extra space for merging. Preferred when stability matters or for linked lists and external sorting.',
          hinglish:
            'Merge sort ek divide-and-conquer algorithm hai: array ko recursively aadha karte jao single elements tak, phir sorted halves ko wapas merge karo. Ye input chahe jo ho hamesha O(n log n) hai aur stable hai (equal elements ka order rakhta hai), par merging ke liye O(n) extra space leta hai. Tab preferred jab stability matter kare ya linked lists/external sorting ke liye.',
        },
        dailyLifeExample:
          'Do already-sorted dher ko ek mein milana — dono ke top compare karo, chhota uthao, repeat. Yahi merge step hai.',
        codeExample:
          'function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = arr.length >> 1;\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  const res = []; let i = 0, j = 0;\n  while (i < left.length && j < right.length)\n    res.push(left[i] <= right[j] ? left[i++] : right[j++]);\n  return [...res, ...left.slice(i), ...right.slice(j)];\n}',
        keyPoints: [
          'Divide in half, sort, merge',
          'Always O(n log n)',
          'Stable, but uses O(n) extra space',
          'Good for linked lists & external sorting',
        ],
        quiz: [
          {
            question: 'Merge sort time complexity (all cases) is…',
            options: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(log n)'],
            correctIndex: 2,
          },
          {
            question: 'Merge sort uses how much extra space?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Quick Sort',
        difficulty: 'hard',
        tags: ['sorting', 'divide-and-conquer'],
        explanation: {
          english:
            'Quick sort picks a pivot, partitions elements into those less than and greater than the pivot, then recursively sorts each side. Average case is O(n log n) and it sorts in place (O(log n) stack), making it very fast in practice. The worst case is O(n^2) when the pivot is consistently bad (e.g. already-sorted input with a poor pivot choice); randomising the pivot avoids this. Unlike merge sort, it is not stable.',
          hinglish:
            'Quick sort ek pivot chunta hai, elements ko pivot se chhote aur bade mein partition karta hai, phir har side recursively sort karta hai. Average case O(n log n) aur ye in-place sort karta hai (O(log n) stack), isliye practice mein bahut fast. Worst case O(n^2) jab pivot consistently bura ho (jaise already-sorted input + poor pivot); pivot randomise karke isse bachte hain. Merge sort ke unlike, ye stable nahi.',
        },
        dailyLifeExample:
          'Class ko height se baant na — ek banda (pivot) chuno, usse chhote ek taraf, bade doosri taraf, phir dono groups ke andar wahi dohrao.',
        codeExample:
          'function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const less = [], more = [];\n  for (let i = 0; i < arr.length - 1; i++)\n    (arr[i] < pivot ? less : more).push(arr[i]);\n  return [...quickSort(less), pivot, ...quickSort(more)];\n}',
        keyPoints: [
          'Pivot + partition + recurse',
          'Average O(n log n), in place',
          'Worst case O(n^2) (bad pivots) — randomise pivot',
          'Not stable (unlike merge sort)',
        ],
        quiz: [
          {
            question: "Quick sort's average time complexity is…",
            options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
            correctIndex: 1,
          },
          {
            question: 'Quick sort worst case happens with…',
            options: ['random data', 'consistently bad pivots', 'small arrays', 'duplicate keys'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Compare merge sort and quick sort.',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Both are divide-and-conquer. Merge sort is always O(n log n), stable, but needs O(n) extra space — good for linked lists and when stability matters. Quick sort is average O(n log n), in-place (O(log n) stack), usually faster in practice due to cache locality, but worst case O(n^2) with bad pivots and it is not stable. Use quick sort for general in-memory arrays (with randomised pivot); merge sort when you need stability or are sorting linked lists / huge external data.',
              hinglish:
                'Dono divide-and-conquer hain. Merge sort hamesha O(n log n), stable, par O(n) extra space chahiye — linked lists aur jab stability chahiye tab achha. Quick sort average O(n log n), in-place (O(log n) stack), cache locality ki wajah se practice mein aksar fast, par bad pivots pe worst case O(n^2) aur stable nahi. General in-memory arrays ke liye quick sort (randomised pivot ke saath); stability chahiye ya linked lists/huge external data sort karna ho to merge sort.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Searching',
    level: 'intermediate',
    description: 'Elements dhoondhna — linear se binary tak.',
    concepts: [
      {
        title: 'Linear vs Binary Search',
        difficulty: 'easy',
        tags: ['searching', 'binary-search'],
        explanation: {
          english:
            'Linear search scans every element until it finds the target — O(n), works on any (even unsorted) data. Binary search works only on sorted data: it repeatedly halves the search range by comparing with the middle element — O(log n). For a million elements, binary search needs about 20 comparisons vs up to a million for linear search.',
          hinglish:
            'Linear search har element scan karta hai jab tak target na mile — O(n), kisi bhi (unsorted bhi) data pe chalta hai. Binary search sirf sorted data pe chalta hai: middle element se compare karke baar-baar search range aadhi karta hai — O(log n). Ek million elements ke liye, binary search ~20 comparisons leta hai vs linear search ke million tak.',
        },
        dailyLifeExample:
          'Dictionary mein shabd dhoondhna — tum pehle page se nahi padhte (linear), beech mein kholte ho aur aage/peeche decide karte ho (binary). Har step mein aadhi dictionary chhod dete ho.',
        codeExample:
          '// Binary search on a SORTED array — O(log n)\nfunction binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) lo = mid + 1; // go right\n    else hi = mid - 1;                   // go left\n  }\n  return -1;\n}',
        keyPoints: [
          'Linear: O(n), any data',
          'Binary: O(log n), requires sorted data',
          'Binary halves the range each step',
          '1M elements: ~20 vs ~1M comparisons',
        ],
        quiz: [
          {
            question: 'Binary search requires the data to be…',
            options: ['unsorted', 'sorted', 'unique', 'positive'],
            correctIndex: 1,
          },
          {
            question: 'Binary search time complexity is…',
            options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why does binary search need a sorted array, and what is a common bug?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Binary search relies on the sorted order to decide which half to discard after comparing with the middle — without order, "go left/right" is meaningless. Common bugs: integer overflow computing mid = (lo + hi) (use lo + (hi - lo) / 2 in languages where it matters), wrong loop condition (lo <= hi vs lo < hi), and not updating bounds correctly (infinite loop). The search space halves each step, giving O(log n).',
              hinglish:
                'Binary search sorted order pe depend karta hai taaki middle se compare karke decide kare kaunsa half discard karna hai — bina order ke "left/right jao" ka koi matlab nahi. Common bugs: mid = (lo + hi) mein integer overflow (jahan matter kare wahan lo + (hi - lo) / 2 use karo), galat loop condition (lo <= hi vs lo < hi), aur bounds galat update karna (infinite loop). Har step mein search space aadhi hoti hai, O(log n).',
            },
          },
        ],
      },
      {
        title: 'Binary Search on Answer',
        difficulty: 'hard',
        tags: ['searching', 'binary-search', 'pattern'],
        explanation: {
          english:
            'A powerful pattern: when an answer lies in a numeric range and a "feasibility" check is monotonic (if x works, everything bigger works, or vice versa), you can binary-search the answer itself instead of the array. Examples: minimum capacity to ship packages in D days, smallest divisor, Koko eating bananas. You binary-search the range and test feasibility at each mid in O(check) time.',
          hinglish:
            'Ek powerful pattern: jab answer ek numeric range mein ho aur "feasibility" check monotonic ho (agar x kaam karta hai to usse bada sab kaam karta hai, ya ulta), to tum array ke bajaye answer ko khud binary-search kar sakte ho. Examples: D din mein packages ship karne ki minimum capacity, smallest divisor, Koko eating bananas. Range pe binary search karo aur har mid pe feasibility test karo O(check) time mein.',
        },
        dailyLifeExample:
          'AC ka temperature set karna — bahut thanda ya bahut garam, tum beech ka try karte ho aur feedback se aadha range chhod dete ho jab tak perfect na mile. Yahi answer pe binary search hai.',
        codeExample:
          '// Smallest x in [lo, hi] such that feasible(x) is true\nfunction binarySearchAnswer(lo, hi, feasible) {\n  while (lo < hi) {\n    const mid = (lo + hi) >> 1;\n    if (feasible(mid)) hi = mid;   // mid works, try smaller\n    else lo = mid + 1;             // need bigger\n  }\n  return lo;\n}',
        keyPoints: [
          'Search the answer range, not the array',
          'Needs a monotonic feasibility check',
          'Classic: min capacity, smallest divisor, Koko bananas',
          'Total time O(log(range) * checkCost)',
        ],
        quiz: [
          {
            question: 'Binary search on answer requires the feasibility check to be…',
            options: ['random', 'monotonic', 'constant', 'sorted'],
            correctIndex: 1,
          },
          {
            question: 'What are you binary-searching over in this pattern?',
            options: ['the input array', 'the range of possible answers', 'the indices only', 'nothing'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Trees',
    level: 'advanced',
    description: 'Hierarchical structures — binary trees, BST, heaps, trie.',
    concepts: [
      {
        title: 'Binary Trees & Traversals',
        difficulty: 'medium',
        tags: ['tree', 'traversal', 'dfs', 'bfs'],
        explanation: {
          english:
            'A binary tree is a hierarchy where each node has at most two children (left, right). Traversals visit every node: DFS comes in three orders — preorder (node, left, right), inorder (left, node, right), postorder (left, right, node) — usually via recursion. BFS (level-order) visits level by level using a queue. Inorder of a BST yields sorted values; postorder is used to delete/free; preorder to copy/serialize.',
          hinglish:
            'Binary tree ek hierarchy hai jahan har node ke zyada se zyada do children (left, right) hote hain. Traversals har node ko visit karte hain: DFS teen order mein — preorder (node, left, right), inorder (left, node, right), postorder (left, right, node) — aksar recursion se. BFS (level-order) queue se level-by-level visit karta hai. BST ka inorder sorted values deta hai; postorder delete/free ke liye; preorder copy/serialize ke liye.',
        },
        dailyLifeExample:
          'Tree ek family tree ya company org-chart jaisa hai — ek boss ke neeche do team-leads, unke neeche aur log. Traversal matlab kis order mein sabse milna hai.',
        codeExample:
          '// DFS recursive traversals\nfunction inorder(node, out = []) {\n  if (!node) return out;\n  inorder(node.left, out);\n  out.push(node.val);      // node between children\n  inorder(node.right, out);\n  return out;\n}\n// BFS uses a queue: push root, pop, push its children, repeat.',
        keyPoints: [
          'Each node has up to 2 children',
          'DFS: preorder / inorder / postorder (recursion)',
          'BFS: level-order using a queue',
          'BST inorder => sorted values',
        ],
        quiz: [
          {
            question: 'Which DFS order visits left, node, then right?',
            options: ['preorder', 'inorder', 'postorder', 'level-order'],
            correctIndex: 1,
          },
          {
            question: 'BFS (level-order) traversal uses a…',
            options: ['stack', 'queue', 'heap', 'set'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do DFS and BFS differ on a tree, and when to use each?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'DFS goes deep along one branch before backtracking (recursion or an explicit stack); BFS explores level by level using a queue. Use BFS for shortest path in unweighted graphs/trees and level-order tasks; use DFS for exploring all paths, subtree computations, and when the solution is likely deep. DFS uses O(height) space, BFS uses O(width) space.',
              hinglish:
                'DFS ek branch mein gehrai tak jaata hai phir backtrack (recursion ya explicit stack); BFS queue se level-by-level explore karta hai. Unweighted graphs/trees mein shortest path aur level-order tasks ke liye BFS; saare paths explore karne, subtree computations, aur jab solution gehra ho tab DFS. DFS O(height) space, BFS O(width) space leta hai.',
            },
          },
        ],
      },
      {
        title: 'Binary Search Tree (BST)',
        difficulty: 'medium',
        tags: ['tree', 'bst'],
        explanation: {
          english:
            'A BST keeps order: every left subtree value is smaller and every right subtree value is larger than the node. This gives O(h) search/insert/delete where h is the height — O(log n) for a balanced tree, but O(n) if it degenerates into a line (e.g. inserting sorted data). Self-balancing variants (AVL, Red-Black) guarantee O(log n) by rebalancing on insert/delete.',
          hinglish:
            'BST order rakhta hai: har left subtree value chhoti aur har right subtree value node se badi hoti hai. Isse O(h) search/insert/delete milta hai jahan h height hai — balanced tree ke liye O(log n), par agar ye ek line ban jaaye (jaise sorted data insert) to O(n). Self-balancing variants (AVL, Red-Black) insert/delete pe rebalance karke O(log n) guarantee karte hain.',
        },
        dailyLifeExample:
          'BST ek guess-the-number game jaisa hai — "mera number isse bada ya chhota?" Har jawab ke saath aadhe options hat jaate hain (balanced hone par).',
        codeExample:
          'function search(node, target) {\n  while (node) {\n    if (target === node.val) return node;\n    node = target < node.val ? node.left : node.right; // go one side\n  }\n  return null;\n}',
        keyPoints: [
          'left < node < right ordering',
          'Search/insert/delete: O(h)',
          'Balanced: O(log n); skewed: O(n)',
          'AVL / Red-Black trees stay balanced',
        ],
        quiz: [
          {
            question: 'In a BST, the right subtree of a node contains values that are…',
            options: ['smaller', 'larger', 'equal', 'random'],
            correctIndex: 1,
          },
          {
            question: 'A BST degenerates to O(n) operations when it becomes…',
            options: ['balanced', 'skewed (a line)', 'empty', 'a heap'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Heaps & Priority Queues',
        difficulty: 'hard',
        tags: ['heap', 'priority-queue'],
        explanation: {
          english:
            'A binary heap is a complete binary tree stored in an array where each parent is smaller (min-heap) or larger (max-heap) than its children. The min/max is at the root — peek is O(1); insert and extract are O(log n) via "bubble up" / "sift down". Heaps implement priority queues and solve top-k, median streams, and Dijkstra efficiently. Building a heap from an array is O(n).',
          hinglish:
            'Binary heap ek complete binary tree hai jo array mein store hota hai jahan har parent apne children se chhota (min-heap) ya bada (max-heap) hota hai. Min/max root pe hota hai — peek O(1); insert aur extract O(log n) "bubble up" / "sift down" se. Heaps priority queues implement karte hain aur top-k, median streams, aur Dijkstra efficiently solve karte hain. Array se heap banana O(n) hai.',
        },
        dailyLifeExample:
          'Heap ek hospital triage jaisa hai — sabse urgent patient (root) hamesha top pe, turant accessible. Naya patient aaye to apni urgency ke hisaab se settle ho jaata hai.',
        codeExample:
          '// Array representation: for index i\n//   left child  = 2*i + 1\n//   right child = 2*i + 2\n//   parent      = (i - 1) / 2 (floor)\n// peek (min/max) -> O(1)\n// push / pop      -> O(log n)\n// Top-k largest: keep a min-heap of size k.',
        keyPoints: [
          'Complete tree in an array; parent vs child order',
          'peek O(1); insert/extract O(log n)',
          'Build heap from array: O(n)',
          'Backs priority queues, top-k, Dijkstra',
        ],
        quiz: [
          {
            question: 'In a min-heap, the smallest element is at the…',
            options: ['leaf', 'root', 'middle', 'end'],
            correctIndex: 1,
          },
          {
            question: 'Inserting into a heap is…',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Trie (Prefix Tree)',
        difficulty: 'hard',
        tags: ['trie', 'string'],
        explanation: {
          english:
            'A trie stores strings by sharing common prefixes along a tree of characters. Insert and search take O(L) where L is the word length — independent of how many words are stored. It excels at prefix queries: autocomplete, spell-check, and "does any word start with this prefix". The trade-off is higher memory due to many child pointers.',
          hinglish:
            'Trie strings ko common prefixes share karke characters ke tree mein store karta hai. Insert aur search O(L) lete hain jahan L word length hai — store kitne words hain isse independent. Ye prefix queries mein best hai: autocomplete, spell-check, aur "koi word is prefix se shuru hota hai kya". Trade-off: bahut child pointers ki wajah se zyada memory.',
        },
        dailyLifeExample:
          'Trie ek phone ke contact search jaisa hai — "Ra" type karte hi Rahul, Ravi, Raj sab aa jaate hain. Common prefix ek hi baar store hota hai.',
        codeExample:
          'class TrieNode { constructor() { this.children = {}; this.end = false; } }\nclass Trie {\n  constructor() { this.root = new TrieNode(); }\n  insert(word) {\n    let n = this.root;\n    for (const ch of word) n = (n.children[ch] ||= new TrieNode());\n    n.end = true;\n  }\n}',
        keyPoints: [
          'Shares common prefixes in a character tree',
          'Insert/search: O(L) (word length)',
          'Best for autocomplete, prefix & spell-check',
          'Uses more memory (many pointers)',
        ],
        quiz: [
          {
            question: 'A trie is especially good for…',
            options: ['sorting numbers', 'prefix/autocomplete queries', 'shortest path', 'range sums'],
            correctIndex: 1,
          },
          {
            question: 'Searching a word of length L in a trie is…',
            options: ['O(1)', 'O(L)', 'O(n)', 'O(log n)'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Graphs',
    level: 'advanced',
    description: 'Nodes aur edges — representation, traversal, shortest path.',
    concepts: [
      {
        title: 'Graph Representation',
        difficulty: 'medium',
        tags: ['graph'],
        explanation: {
          english:
            'A graph is a set of nodes (vertices) connected by edges; it can be directed/undirected and weighted/unweighted. Two main representations: an adjacency list (a map/array of neighbours per node) uses O(V + E) space and is best for sparse graphs; an adjacency matrix (a V×V grid) uses O(V^2) space but gives O(1) edge lookup, best for dense graphs. Most interview graphs use adjacency lists.',
          hinglish:
            'Graph nodes (vertices) ka set hai jo edges se jude hote hain; ye directed/undirected aur weighted/unweighted ho sakta hai. Do main representations: adjacency list (har node ke neighbours ka map/array) O(V + E) space leti hai aur sparse graphs ke liye best; adjacency matrix (V×V grid) O(V^2) space leti hai par O(1) edge lookup deti hai, dense graphs ke liye best. Zyadatar interview graphs adjacency lists use karte hain.',
        },
        dailyLifeExample:
          'Graph ek city ka map jaisa hai — sheher (nodes) aur unhe jodne wali roads (edges). Adjacency list matlab har sheher ke saath uske direct-connected sheheron ki list.',
        codeExample:
          '// Adjacency list — O(V + E) space\nconst graph = {\n  A: ["B", "C"],\n  B: ["A", "D"],\n  C: ["A", "D"],\n  D: ["B", "C"],\n};\n// edge A-B exists if graph.A.includes("B")',
        keyPoints: [
          'Nodes + edges; directed/undirected, weighted/unweighted',
          'Adjacency list: O(V + E), best for sparse',
          'Adjacency matrix: O(V^2), O(1) edge lookup, dense',
          'Interviews mostly use adjacency lists',
        ],
        quiz: [
          {
            question: 'An adjacency list uses how much space?',
            options: ['O(V^2)', 'O(V + E)', 'O(1)', 'O(E^2)'],
            correctIndex: 1,
          },
          {
            question: 'An adjacency matrix is best for which graphs?',
            options: ['sparse', 'dense', 'empty', 'trees only'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Breadth-First Search (BFS)',
        difficulty: 'medium',
        tags: ['graph', 'bfs'],
        explanation: {
          english:
            'BFS explores a graph level by level from a source using a queue, marking nodes visited to avoid cycles. It finds the shortest path (fewest edges) in an unweighted graph and runs in O(V + E). Uses: shortest path in grids/mazes, "minimum steps" problems, and finding connected components.',
          hinglish:
            'BFS ek source se graph ko queue se level-by-level explore karta hai, cycles avoid karne ke liye nodes ko visited mark karta hai. Ye unweighted graph mein shortest path (sabse kam edges) dhoondhta hai aur O(V + E) mein chalta hai. Uses: grids/mazes mein shortest path, "minimum steps" problems, aur connected components dhoondhna.',
        },
        dailyLifeExample:
          'BFS ek talaab mein pathar phenkne jaisa hai — lehrein (waves) ek-ek ring karke bahar failti hain, paas wale pehle. Source se nearest nodes pehle visit hote hain.',
        codeExample:
          'function bfs(graph, start) {\n  const visited = new Set([start]);\n  const queue = [start], order = [];\n  while (queue.length) {\n    const node = queue.shift();\n    order.push(node);\n    for (const nb of graph[node])\n      if (!visited.has(nb)) { visited.add(nb); queue.push(nb); }\n  }\n  return order;\n}',
        keyPoints: [
          'Level-by-level using a queue',
          'Shortest path in unweighted graphs',
          'Mark visited to avoid cycles',
          'O(V + E) time',
        ],
        quiz: [
          {
            question: 'BFS finds the shortest path in which kind of graph?',
            options: ['weighted', 'unweighted', 'negative-weighted', 'none'],
            correctIndex: 1,
          },
          {
            question: 'BFS uses which data structure?',
            options: ['stack', 'queue', 'heap', 'trie'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Depth-First Search (DFS)',
        difficulty: 'medium',
        tags: ['graph', 'dfs'],
        explanation: {
          english:
            'DFS explores as far as possible along each branch before backtracking, using recursion or an explicit stack, with a visited set to avoid revisiting. It runs in O(V + E). Uses: detecting cycles, finding connected components, topological sorting, path existence, and flood-fill. DFS does not guarantee shortest paths.',
          hinglish:
            'DFS har branch mein jitna ho sake gehrai tak jaata hai phir backtrack karta hai, recursion ya explicit stack se, visited set ke saath taaki dobara visit na ho. Ye O(V + E) mein chalta hai. Uses: cycles detect karna, connected components, topological sorting, path existence, aur flood-fill. DFS shortest paths guarantee nahi karta.',
        },
        dailyLifeExample:
          'DFS bhulbhulaiya mein ek raasta poora andar tak jaane jaisa hai — dead-end aaya to wapas aakar doosra branch. Ek-ek raasta poora explore.',
        codeExample:
          'function dfs(graph, node, visited = new Set(), order = []) {\n  visited.add(node);\n  order.push(node);\n  for (const nb of graph[node])\n    if (!visited.has(nb)) dfs(graph, nb, visited, order);\n  return order;\n}',
        keyPoints: [
          'Go deep, then backtrack',
          'Recursion or explicit stack + visited set',
          'Cycle detection, components, topo sort, flood-fill',
          'O(V + E); no shortest-path guarantee',
        ],
        quiz: [
          {
            question: 'DFS naturally uses which structure (besides recursion)?',
            options: ['queue', 'stack', 'heap', 'set only'],
            correctIndex: 1,
          },
          {
            question: 'Does DFS guarantee the shortest path?',
            options: ['Yes', 'No', 'Only in trees', 'Only if weighted'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: "Dijkstra's Shortest Path",
        difficulty: 'hard',
        tags: ['graph', 'shortest-path', 'dijkstra'],
        explanation: {
          english:
            "Dijkstra's algorithm finds the shortest path from a source in a weighted graph with non-negative edges. It greedily expands the nearest unvisited node using a min-priority-queue (min-heap), relaxing neighbours' distances. With a heap it runs in O((V + E) log V). It fails with negative edges — use Bellman-Ford for those.",
          hinglish:
            "Dijkstra's algorithm non-negative edges wale weighted graph mein source se shortest path dhoondhta hai. Ye min-priority-queue (min-heap) se greedily nearest unvisited node expand karta hai, neighbours ki distances relax karta hai. Heap ke saath ye O((V + E) log V) mein chalta hai. Negative edges pe ye fail hota hai — unke liye Bellman-Ford use karo.",
        },
        dailyLifeExample:
          'Dijkstra Google Maps jaisa hai — har road ka time (weight) dekh kar sabse kam time wala raasta nikaalta hai, hamesha abhi tak ke nearest point se aage badhte hue.',
        codeExample:
          '// Dijkstra (conceptual, with a min-heap PQ)\n// dist[source] = 0, others = Infinity\n// pq.push([0, source])\n// while pq not empty:\n//   [d, u] = pq.pop()  // nearest\n//   for [v, w] of graph[u]:\n//     if d + w < dist[v]:\n//       dist[v] = d + w; pq.push([dist[v], v])',
        keyPoints: [
          'Shortest path, non-negative weights',
          'Greedy + min-heap (priority queue)',
          'O((V + E) log V) with a heap',
          'Negative edges -> use Bellman-Ford',
        ],
        quiz: [
          {
            question: "Dijkstra's algorithm fails when the graph has…",
            options: ['many nodes', 'negative edge weights', 'cycles', 'unweighted edges'],
            correctIndex: 1,
          },
          {
            question: "Dijkstra typically uses which structure for efficiency?",
            options: ['stack', 'min-heap / priority queue', 'hash set', 'array only'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you use BFS vs Dijkstra for shortest path?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Use BFS when the graph is unweighted (or all edges have equal weight) — it finds the fewest-edges path in O(V + E). Use Dijkstra when edges have different non-negative weights — it finds the minimum total weight path in O((V + E) log V) using a min-heap. For negative edge weights, neither works; use Bellman-Ford (O(V*E)). BFS is essentially Dijkstra with all weights equal to 1.',
              hinglish:
                'BFS tab use karo jab graph unweighted ho (ya saare edges equal weight) — ye fewest-edges path O(V + E) mein deta hai. Dijkstra tab jab edges ke alag non-negative weights hon — ye minimum total weight path O((V + E) log V) mein min-heap se deta hai. Negative weights ke liye dono fail; Bellman-Ford (O(V*E)) use karo. BFS basically Dijkstra hai jisme saare weights 1 hon.',
            },
          },
        ],
      },
      {
        title: 'Union-Find (Disjoint Set)',
        difficulty: 'hard',
        tags: ['graph', 'union-find', 'dsu'],
        explanation: {
          english:
            'Union-Find (Disjoint Set Union) tracks a collection of disjoint groups and supports two near-O(1) operations: find (which group an element belongs to) and union (merge two groups). With path compression and union by rank, operations run in near-constant amortised time (inverse Ackermann). It powers connected-components, cycle detection in undirected graphs, and Kruskal\'s minimum spanning tree.',
          hinglish:
            'Union-Find (Disjoint Set Union) disjoint groups ka collection track karta hai aur do near-O(1) operations support karta hai: find (element kis group mein hai) aur union (do groups merge). Path compression aur union by rank ke saath operations near-constant amortised time (inverse Ackermann) mein chalte hain. Ye connected-components, undirected graphs mein cycle detection, aur Kruskal\'s minimum spanning tree chalata hai.',
        },
        dailyLifeExample:
          'Union-Find friend-circles jaisa hai — "kya A aur B ek hi group mein hain?" (find) aur "do groups ko dost banakar mila do" (union). Bade network mein turant pata chal jaata hai.',
        codeExample:
          'class DSU {\n  constructor(n) { this.parent = [...Array(n).keys()]; }\n  find(x) {\n    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]); // path compression\n    return this.parent[x];\n  }\n  union(a, b) { this.parent[this.find(a)] = this.find(b); }\n}',
        keyPoints: [
          'find = which group; union = merge groups',
          'Path compression + union by rank',
          'Near O(1) amortised per operation',
          'Connected components, cycle detection, Kruskal MST',
        ],
        quiz: [
          {
            question: 'Union-Find supports which two core operations?',
            options: ['push & pop', 'find & union', 'insert & delete', 'sort & search'],
            correctIndex: 1,
          },
          {
            question: 'Which optimisation flattens the tree during find?',
            options: ['union by rank', 'path compression', 'memoization', 'hashing'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Topological Sort',
        difficulty: 'hard',
        tags: ['graph', 'topological-sort', 'dag'],
        explanation: {
          english:
            'A topological sort orders the nodes of a Directed Acyclic Graph (DAG) so that every edge u -> v has u before v. It answers "in what order can I do tasks with dependencies?". Two methods: Kahn\'s algorithm (repeatedly remove nodes with in-degree 0 using a queue) and DFS (push nodes on finish, then reverse). It exists only if there is no cycle; a cycle means an impossible ordering.',
          hinglish:
            'Topological sort ek Directed Acyclic Graph (DAG) ke nodes ko aise order karta hai ki har edge u -> v mein u, v se pehle aaye. Ye answer karta hai "dependencies wale tasks kis order mein karoon?". Do methods: Kahn\'s algorithm (in-degree 0 wale nodes baar-baar queue se hatao) aur DFS (finish pe nodes push karo, phir reverse). Ye tabhi exist karta hai jab koi cycle na ho; cycle matlab ordering impossible.',
        },
        dailyLifeExample:
          'Topological sort course prerequisites jaisa hai — "DSA padhne se pehle programming basics". Ya getting dressed: socks pehle, phir shoes. Dependencies ka valid order.',
        codeExample:
          "// Kahn's algorithm (BFS):\n// 1. compute in-degree of every node\n// 2. queue all nodes with in-degree 0\n// 3. pop a node -> add to order -> decrement neighbours' in-degree\n// 4. if a neighbour hits 0, enqueue it\n// If order has fewer than V nodes -> the graph has a cycle.",
        keyPoints: [
          'Order a DAG so edges point forward',
          "Kahn's (in-degree + queue) or DFS finish-order",
          'Models task/dependency ordering',
          'Only exists if there is no cycle',
        ],
        quiz: [
          {
            question: 'Topological sort works only on which graphs?',
            options: ['any graph', 'Directed Acyclic Graphs (DAGs)', 'undirected graphs', 'weighted graphs'],
            correctIndex: 1,
          },
          {
            question: 'If a topological order cannot include all nodes, the graph has a…',
            options: ['leaf', 'cycle', 'root', 'bridge'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Dynamic Programming',
    level: 'advanced',
    description: 'Overlapping subproblems ko memoize karke solve karna.',
    concepts: [
      {
        title: 'DP Fundamentals (Memoization vs Tabulation)',
        difficulty: 'hard',
        tags: ['dp', 'memoization'],
        explanation: {
          english:
            'Dynamic Programming solves problems with overlapping subproblems and optimal substructure by storing sub-results instead of recomputing them. Top-down (memoization) is recursion + a cache; bottom-up (tabulation) fills a table iteratively from base cases. Both turn exponential brute force into polynomial time. The key skill is defining the state and the recurrence (transition).',
          hinglish:
            'Dynamic Programming overlapping subproblems aur optimal substructure wali problems ko sub-results store karke (dobara compute na karke) solve karta hai. Top-down (memoization) recursion + cache hai; bottom-up (tabulation) base cases se ek table iteratively bharta hai. Dono exponential brute force ko polynomial time bana dete hain. Key skill hai state aur recurrence (transition) define karna.',
        },
        dailyLifeExample:
          'DP ready-made notes jaise hain — ek baar solve kiya sub-sawaal dobara aaye to seedha saved answer, dobara mehnat nahi. Fibonacci memoized = har number ek hi baar compute.',
        codeExample:
          '// Fibonacci: O(2^n) -> O(n) with memoization\nfunction fib(n, memo = {}) {\n  if (n < 2) return n;\n  if (n in memo) return memo[n];\n  return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n}\n\n// Tabulation (bottom-up)\nfunction fibTab(n) {\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];\n  return dp[n];\n}',
        keyPoints: [
          'Overlapping subproblems + optimal substructure',
          'Memoization = recursion + cache (top-down)',
          'Tabulation = iterative table (bottom-up)',
          'Define the state and the transition',
        ],
        quiz: [
          {
            question: 'DP applies when a problem has overlapping subproblems and…',
            options: ['random structure', 'optimal substructure', 'no base case', 'only one input'],
            correctIndex: 1,
          },
          {
            question: 'Memoization is best described as…',
            options: ['iterative table filling', 'recursion plus a cache', 'sorting then searching', 'greedy choices'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you recognise a DP problem and approach it?',
            difficulty: 'hard',
            frequency: 'very-common',
            answer: {
              english:
                'Signs: the problem asks for an optimum (max/min/count/“number of ways”), choices at each step affect the future, and a naive recursion recomputes the same subproblems (overlapping subproblems). Approach: (1) define the state (what parameters uniquely describe a subproblem), (2) write the recurrence/transition between states, (3) set base cases, (4) implement top-down with memoization or bottom-up with tabulation, (5) optimise space if only recent states are needed.',
              hinglish:
                'Signs: problem ek optimum maangti hai (max/min/count/"kitne tareeke"), har step ke choices future ko affect karte hain, aur naive recursion same subproblems dobara compute karti hai (overlapping subproblems). Approach: (1) state define karo (kaunse parameters ek subproblem ko uniquely describe karte hain), (2) states ke beech recurrence/transition likho, (3) base cases set karo, (4) top-down memoization ya bottom-up tabulation se implement karo, (5) agar sirf recent states chahiye to space optimise karo.',
            },
          },
        ],
      },
      {
        title: '0/1 Knapsack',
        difficulty: 'hard',
        tags: ['dp', 'knapsack'],
        explanation: {
          english:
            'The 0/1 knapsack: given items with weights and values and a capacity W, maximise total value without exceeding W, taking each item at most once. The DP state is dp[i][w] = best value using the first i items with capacity w; for each item you choose the better of skip vs take. Time and space are O(n*W) (a pseudo-polynomial). It is the template for many subset/partition DP problems.',
          hinglish:
            '0/1 knapsack: items ke weights aur values aur ek capacity W diye hain, W exceed kiye bina total value maximise karo, har item zyada se zyada ek baar. DP state dp[i][w] = pehle i items aur capacity w se best value; har item ke liye skip vs take mein behtar chuno. Time aur space O(n*W) (pseudo-polynomial). Ye kai subset/partition DP problems ka template hai.',
        },
        dailyLifeExample:
          'Knapsack ek limited bag mein shopping jaisa hai — bag ka weight limit hai, har cheez ka weight aur value, tum total value maximise karna chahte ho. Har cheez lo ya chhodo.',
        codeExample:
          'function knapsack(weights, values, W) {\n  const n = weights.length;\n  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));\n  for (let i = 1; i <= n; i++)\n    for (let w = 0; w <= W; w++) {\n      dp[i][w] = dp[i - 1][w]; // skip item i\n      if (weights[i - 1] <= w) // take item i\n        dp[i][w] = Math.max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);\n    }\n  return dp[n][W];\n}',
        keyPoints: [
          'Maximise value within capacity; each item 0 or 1 time',
          'State: dp[i][w] = best with first i items, capacity w',
          'Each item: max(skip, take)',
          'O(n*W) time/space (pseudo-polynomial)',
        ],
        quiz: [
          {
            question: 'In 0/1 knapsack, each item can be taken…',
            options: ['unlimited times', 'at most once', 'exactly twice', 'never'],
            correctIndex: 1,
          },
          {
            question: '0/1 knapsack DP time complexity is…',
            options: ['O(n)', 'O(n*W)', 'O(2^n)', 'O(log W)'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Longest Common Subsequence (LCS)',
        difficulty: 'hard',
        tags: ['dp', 'strings', 'lcs'],
        explanation: {
          english:
            'LCS finds the longest sequence of characters appearing in the same relative order (not necessarily contiguous) in two strings. The DP: if the current characters match, dp[i][j] = 1 + dp[i-1][j-1]; otherwise the max of dropping one character from either string. It runs in O(n*m) and underpins diff tools, version control, and DNA sequence alignment.',
          hinglish:
            'LCS do strings mein same relative order (zaroori nahi contiguous) mein aane wale characters ka longest sequence dhoondhta hai. DP: agar current characters match karein, dp[i][j] = 1 + dp[i-1][j-1]; warna kisi ek string se ek character drop karne ka max. Ye O(n*m) mein chalta hai aur diff tools, version control, aur DNA sequence alignment chalata hai.',
        },
        dailyLifeExample:
          'LCS git diff jaisa hai — do versions mein jo common lines same order mein hain unhe match karta hai taaki sirf changes highlight hon.',
        codeExample:
          'function lcs(a, b) {\n  const n = a.length, m = b.length;\n  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));\n  for (let i = 1; i <= n; i++)\n    for (let j = 1; j <= m; j++)\n      dp[i][j] = a[i - 1] === b[j - 1]\n        ? 1 + dp[i - 1][j - 1]\n        : Math.max(dp[i - 1][j], dp[i][j - 1]);\n  return dp[n][m];\n}',
        keyPoints: [
          'Longest in-order (not contiguous) common subsequence',
          'Match: 1 + diagonal; else max of left/up',
          'O(n*m) time and space',
          'Used in diffs, version control, DNA alignment',
        ],
        quiz: [
          {
            question: 'A subsequence (unlike a substring) must be…',
            options: ['contiguous', 'in the same relative order but not necessarily contiguous', 'sorted', 'reversed'],
            correctIndex: 1,
          },
          {
            question: 'LCS time complexity for strings of length n and m is…',
            options: ['O(n + m)', 'O(n*m)', 'O(2^n)', 'O(n log m)'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Greedy & Bit Manipulation',
    level: 'advanced',
    description: 'Local optimal choices aur bit tricks.',
    concepts: [
      {
        title: 'Greedy Algorithms',
        difficulty: 'medium',
        tags: ['greedy'],
        explanation: {
          english:
            'A greedy algorithm makes the locally optimal choice at each step, hoping it leads to a global optimum. It works only when the problem has the "greedy choice property" and optimal substructure — then it is simpler and faster than DP. Classics: activity selection (pick earliest finishing), Huffman coding, and coin change with canonical denominations. Greedy is fast but you must prove it is correct for the specific problem.',
          hinglish:
            'Greedy algorithm har step pe locally optimal choice karta hai, is ummeed mein ki ye global optimum tak le jaayega. Ye tabhi kaam karta hai jab problem mein "greedy choice property" aur optimal substructure ho — tab ye DP se simpler aur faster hai. Classics: activity selection (sabse pehle khatam hone wala chuno), Huffman coding, aur canonical denominations wala coin change. Greedy fast hai par specific problem ke liye uski correctness prove karni padti hai.',
        },
        dailyLifeExample:
          'Greedy change dene jaisa hai — pehle sabse badi note do, phir chhoti. Indian notes pe ye sahi answer deta hai, par har currency pe guarantee nahi (isiliye prove karna zaroori).',
        codeExample:
          '// Activity selection — pick max non-overlapping activities\nfunction maxActivities(intervals) {\n  intervals.sort((a, b) => a[1] - b[1]); // earliest finish first\n  let count = 0, end = -Infinity;\n  for (const [s, e] of intervals)\n    if (s >= end) { count++; end = e; } // greedily take it\n  return count;\n}',
        keyPoints: [
          'Locally optimal choice at each step',
          'Needs greedy-choice property + optimal substructure',
          'Faster/simpler than DP when it applies',
          'Must prove correctness for the problem',
        ],
        quiz: [
          {
            question: 'A greedy algorithm makes the choice that is…',
            options: ['globally optimal by brute force', 'locally optimal at each step', 'random', 'always wrong'],
            correctIndex: 1,
          },
          {
            question: 'Greedy is guaranteed correct only when the problem has the…',
            options: ['largest input', 'greedy-choice property & optimal substructure', 'fewest nodes', 'sorted input'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Bit Manipulation',
        difficulty: 'medium',
        tags: ['bit-manipulation', 'bitwise'],
        explanation: {
          english:
            'Bitwise operations work directly on the binary representation of integers and are extremely fast. Core operators: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>). Handy tricks: x & 1 tests odd/even, x << 1 doubles, x >> 1 halves, x & (x-1) clears the lowest set bit, and XOR finds the single non-duplicated number. Bitmasks compactly represent subsets.',
          hinglish:
            'Bitwise operations integers ke binary representation pe seedha kaam karti hain aur bahut fast hain. Core operators: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>). Kaam ke tricks: x & 1 odd/even test, x << 1 double, x >> 1 half, x & (x-1) lowest set bit clear, aur XOR single non-duplicated number dhoondhta hai. Bitmasks subsets ko compactly represent karte hain.',
        },
        dailyLifeExample:
          'Bitmask switches ke ek panel jaisa hai — har bit ek switch (on/off). Ek number se 32 on/off settings represent kar lo, bahut compact.',
        codeExample:
          '// Find the number that appears once (others twice) — XOR magic\nfunction singleNumber(nums) {\n  let res = 0;\n  for (const x of nums) res ^= x; // a^a=0, a^0=a\n  return res;\n}\n\n5 & 1;        // 1 -> odd\n6 & 1;        // 0 -> even\n5 & (5 - 1);  // clears lowest set bit',
        keyPoints: [
          'Operators: & | ^ ~ << >>',
          'x & 1 tests odd/even; << doubles; >> halves',
          'XOR cancels pairs (find the single number)',
          'Bitmasks represent subsets compactly',
        ],
        quiz: [
          {
            question: 'What is the result of a ^ a (XOR of a number with itself)?',
            options: ['a', '0', '1', '2a'],
            correctIndex: 1,
          },
          {
            question: 'Which operation checks if a number is odd?',
            options: ['x | 1', 'x & 1', 'x ^ 1', 'x << 1'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What data structure would you use to implement an LRU cache?',
    difficulty: 'hard',
    frequency: 'very-common',
    answer: {
      english:
        'A hash map plus a doubly linked list. The hash map gives O(1) lookup from key to its node; the doubly linked list maintains usage order (most-recently-used at the front, least at the back). On access you move the node to the front in O(1); on insertion past capacity you evict the tail in O(1). Together they give O(1) get and put.',
      hinglish:
        'Ek hash map plus ek doubly linked list. Hash map key se node tak O(1) lookup deta hai; doubly linked list usage order rakhti hai (most-recently-used front pe, least back pe). Access pe node ko front pe O(1) mein le jao; capacity ke baad insertion pe tail ko O(1) mein evict karo. Dono milke O(1) get aur put dete hain.',
    },
  },
  {
    question: 'How do you detect a cycle in a directed vs an undirected graph?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Directed graph: use DFS with three states (unvisited, in-progress/on the recursion stack, done) — finding an edge to an in-progress node means a back edge, i.e. a cycle. Or use Kahn\'s topological sort: if you cannot remove all nodes, there is a cycle. Undirected graph: use DFS/BFS and a visited set — a visited neighbour that is not the parent indicates a cycle; or use Union-Find — if an edge connects two nodes already in the same set, it forms a cycle.',
      hinglish:
        'Directed graph: DFS three states ke saath (unvisited, in-progress/recursion stack pe, done) — kisi in-progress node tak edge milna back edge matlab cycle. Ya Kahn\'s topological sort: agar saare nodes hata na sako to cycle hai. Undirected graph: DFS/BFS aur visited set — koi visited neighbour jo parent nahi wo cycle dikhata hai; ya Union-Find — agar edge do already-same-set nodes ko jode to cycle banta hai.',
    },
  },
  {
    question: 'What is the difference between an array and a linked list?',
    difficulty: 'easy',
    frequency: 'very-common',
    answer: {
      english:
        'Arrays store elements contiguously: O(1) index access and great cache locality, but O(n) insert/delete in the middle (shifting) and a fixed/resized capacity. Linked lists store nodes with pointers: O(1) insert/delete at a known position and easy growth, but O(n) access (no indexing) and worse cache performance plus pointer overhead. Choose arrays for random access and iteration; linked lists for frequent splicing where you already hold the node.',
      hinglish:
        'Arrays elements ko contiguously store karte hain: O(1) index access aur badhiya cache locality, par beech mein O(n) insert/delete (shifting) aur fixed/resized capacity. Linked lists nodes ko pointers ke saath store karte hain: known position pe O(1) insert/delete aur easy growth, par O(n) access (no indexing) aur kamzor cache performance plus pointer overhead. Random access aur iteration ke liye arrays; jahan node already paas ho wahan frequent splicing ke liye linked lists.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
