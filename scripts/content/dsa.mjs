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
  icon: 'puzzle',
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
            frequency: 'common',
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
            frequency: 'common',
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
            frequency: 'common',
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
            frequency: 'common',
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
            frequency: 'common',
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
          {
            question: "Why does 'union by rank' (attaching the smaller tree under the bigger tree's root) matter for performance?",
            options: [
              'It does not matter at all',
              'Without it, trees can become long chains, making find() slow (up to O(n)); union by rank keeps trees shallow',
              'It only matters for undirected graphs',
              'It is required for the code to compile',
            ],
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
      {
        title: "Dijkstra's Algorithm: Shortest Path in Weighted Graphs",
        difficulty: 'hard',
        tags: ['graph', 'dijkstra', 'shortest-path'],
        explanation: {
          english:
            "BFS finds the shortest path in an UNWEIGHTED graph (fewest edges), but real roads/networks have different costs per edge (distance, time, price). Dijkstra's algorithm finds the shortest path in a weighted graph with NON-NEGATIVE weights: it repeatedly picks the unvisited node with the smallest known distance (using a min-heap/priority queue), then 'relaxes' its neighbours — updating their distance if going through this node is cheaper. It runs in O((V+E) log V) with a priority queue.",
          hinglish:
            "BFS ek UNWEIGHTED graph mein shortest path dhoondhta hai (kam se kam edges), par asli roads/networks mein har edge ka alag cost hota hai (distance, time, price). Dijkstra's algorithm ek weighted graph mein NON-NEGATIVE weights ke saath shortest path dhoondhta hai: ye baar-baar sabse kam known distance wala unvisited node choose karta hai (min-heap/priority queue se), phir uske neighbours ko 'relax' karta hai — agar is node se hoke jaana sasta hai to unka distance update karta hai. Ye priority queue ke saath O((V+E) log V) mein chalta hai.",
        },
        dailyLifeExample:
          "Dijkstra Google Maps ke 'fastest route' feature jaisa hai — sirf kam se kam roads (BFS) nahi, balki kam se kam total TIME/DISTANCE wala route dhoondhta hai, chahe usme zyada roads kyun na ho. Har intersection pe 'ab tak sabse sasta yahan pahunchne ka tareeka kya hai' update hota rehta hai.",
        codeExample:
          "function dijkstra(graph, start) {\n  const dist = {}; // shortest known distance to each node\n  for (const node in graph) dist[node] = Infinity;\n  dist[start] = 0;\n\n  const pq = [[0, start]]; // [distance, node] — a min-heap in real code\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]); // simplified; use a real heap for O(log n)\n    const [d, node] = pq.shift();\n    if (d > dist[node]) continue; // stale entry, skip\n\n    for (const [neighbor, weight] of graph[node]) {\n      const newDist = d + weight;\n      if (newDist < dist[neighbor]) {\n        dist[neighbor] = newDist; // found a cheaper path — relax it\n        pq.push([newDist, neighbor]);\n      }\n    }\n  }\n  return dist;\n}",
        keyPoints: [
          'Finds shortest path by TOTAL WEIGHT, not fewest edges (unlike BFS)',
          'Only works correctly with non-negative edge weights',
          'Greedily picks the closest unvisited node each step (via a min-heap)',
          "'Relaxing' an edge = updating a neighbour's distance if a cheaper path is found",
          'O((V+E) log V) with a proper priority queue',
        ],
        quiz: [
          {
            question: "What is the key difference between BFS shortest path and Dijkstra's algorithm?",
            options: ['No difference, they are identical', 'BFS finds the path with the FEWEST edges (unweighted); Dijkstra finds the path with the SMALLEST total weight (weighted)', 'Dijkstra only works on trees', 'BFS is always faster'],
            correctIndex: 1,
          },
          {
            question: "Does Dijkstra's algorithm work correctly with negative edge weights?",
            options: ['Yes, always', 'No — it assumes non-negative weights; use Bellman-Ford for negative weights', 'Only for undirected graphs', 'Only with an odd number of nodes'],
            correctIndex: 1,
          },
          {
            question: "What does 'relaxing' an edge mean in Dijkstra's algorithm?",
            options: ['Deleting the edge', "Updating a neighbour's distance if a cheaper path through the current node is found", 'Making the edge weight 0', 'Pausing the algorithm'],
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
          {
            question: 'Without memoization, naive recursive fib(40) makes an enormous number of redundant calls. Why is this so slow?',
            options: [
              'It is not actually slow',
              'The same subproblems (like fib(10)) get recomputed exponentially many times — O(2^n) total calls',
              'JavaScript recursion has a hard limit of 40',
              'It only recomputes each number once anyway',
            ],
            correctIndex: 1,
            explanation: 'Naive recursive Fibonacci without memoization has O(2^n) time complexity because it recomputes the same fib(k) values over and over. Memoization caches each unique subproblem so it is computed only once, turning O(2^n) into O(n).',
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you recognise a DP problem and approach it?',
            difficulty: 'hard',
            frequency: 'common',
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
      {
        title: "Kadane's Algorithm: Maximum Subarray",
        difficulty: 'medium',
        tags: ['dp', 'arrays', 'kadane'],
        explanation: {
          english:
            "Given an array of numbers (including negatives), find the contiguous subarray with the largest sum. A brute-force check of every subarray is O(n²) or worse. Kadane's algorithm solves it in O(n) with a simple insight: at each position, the best subarray ending HERE is either just this element alone, or this element added to the best subarray ending at the PREVIOUS position — whichever is bigger. If the running sum ever goes negative, it's better to restart from the next element.",
          hinglish:
            "Numbers ka ek array diya hai (negatives samet), sabse bada sum wala contiguous subarray dhoondho. Har subarray brute-force check karna O(n²) ya usse bhi zyada hai. Kadane's algorithm O(n) mein solve karta hai ek simple insight se: har position pe, YAHAN khatam hone wala best subarray ya to sirf ye element akela hai, ya ye element PICHHLI position pe khatam hone wale best subarray mein juda hua — jo bhi bada ho. Agar running sum kabhi negative ho jaaye, to agle element se restart karna behtar hai.",
        },
        dailyLifeExample:
          "Kadane's ek trading app jaisa hai jo daily profit/loss track karta hai — agar tumhara cumulative profit kabhi negative ho jaaye, us point tak ka sab bhula ke, aaj se dobara ginna shuru karo, kyunki wo negative history sirf future profit ko neeche khinchegi.",
        codeExample:
          'function maxSubArray(nums) {\n  let maxEndingHere = nums[0];\n  let maxSoFar = nums[0];\n\n  for (let i = 1; i < nums.length; i++) {\n    // either extend the previous subarray, or start fresh at nums[i]\n    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);\n    maxSoFar = Math.max(maxSoFar, maxEndingHere);\n  }\n  return maxSoFar;\n}\n\nmaxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // 6  (subarray [4, -1, 2, 1])',
        keyPoints: [
          'Finds the maximum-sum contiguous subarray in O(n), one pass',
          'At each step: extend the previous subarray, or start fresh — whichever gives a bigger sum',
          'A classic 1D DP problem: dp[i] = max(nums[i], dp[i-1] + nums[i])',
          'If the running sum goes negative, restarting is always at least as good',
          'One of the most commonly asked array/DP interview questions',
        ],
        quiz: [
          {
            question: "What problem does Kadane's algorithm solve?",
            options: ['Sorting an array', 'Finding the contiguous subarray with the largest sum', 'Finding the shortest path in a graph', 'Reversing a linked list'],
            correctIndex: 1,
          },
          {
            question: "What is the time complexity of Kadane's algorithm?",
            options: ['O(n²)', 'O(n)', 'O(log n)', 'O(2^n)'],
            correctIndex: 1,
          },
          {
            question: "At each position, Kadane's algorithm decides between which two choices?",
            options: ["Sort or don't sort", 'Extend the previous subarray, or start a fresh subarray at the current element', 'Push or pop', 'Left or right pointer'],
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
    frequency: 'common',
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
    frequency: 'common',
    answer: {
      english:
        'Arrays store elements contiguously: O(1) index access and great cache locality, but O(n) insert/delete in the middle (shifting) and a fixed/resized capacity. Linked lists store nodes with pointers: O(1) insert/delete at a known position and easy growth, but O(n) access (no indexing) and worse cache performance plus pointer overhead. Choose arrays for random access and iteration; linked lists for frequent splicing where you already hold the node.',
      hinglish:
        'Arrays elements ko contiguously store karte hain: O(1) index access aur badhiya cache locality, par beech mein O(n) insert/delete (shifting) aur fixed/resized capacity. Linked lists nodes ko pointers ke saath store karte hain: known position pe O(1) insert/delete aur easy growth, par O(n) access (no indexing) aur kamzor cache performance plus pointer overhead. Random access aur iteration ke liye arrays; jahan node already paas ho wahan frequent splicing ke liye linked lists.',
    },
  },

  // ─── Complexity & Problem Solving ───────────────────────────
  {
    question: 'What is the difference between Big-O, Big-Theta, and Big-Omega?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Big-O is an UPPER bound — the algorithm grows no faster than this. Big-Omega is a LOWER bound. Big-Theta is a tight bound, meaning both apply, so it describes the growth exactly. Technically stating "quicksort is O(n²)" is true but uninformative, and Theta is often what people mean when they say Big-O. In practice interviewers accept Big-O loosely, but you should still name which CASE — best, average, or worst — you are describing.',
      hinglish:
        'Big-O ek UPPER seema hai — algorithm isse tez nahi badhta. Big-Omega ek LOWER seema hai. Big-Theta ek tight seema hai, matlab dono lagti hain, isliye ye growth theek batata hai. Technically "quicksort O(n²) hai" kehna sach hai par bekaar, aur log jab Big-O kehte hain to aksar unka matlab Theta hota hai. Practically interviewers Big-O ko dheele maante hain, par tumhe phir bhi batana chahiye ki tum kaunsa CASE — best, average, ya worst — bata rahe ho.',
    },
  },
  {
    question: 'How do you analyse the time complexity of a recursive algorithm?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Write a RECURRENCE describing the cost — merge sort is T(n) = 2T(n/2) + O(n) — then solve it. The Master Theorem handles the common `T(n) = aT(n/b) + f(n)` form by comparing f(n) against n^(log_b a). Alternatively draw the recursion TREE and sum the work per level: merge sort does O(n) work across log n levels, giving O(n log n). For non-uniform recursion such as Fibonacci, count the nodes in the call tree instead.',
      hinglish:
        'Cost batata ek RECURRENCE likho — merge sort T(n) = 2T(n/2) + O(n) hai — phir use solve karo. Master Theorem common `T(n) = aT(n/b) + f(n)` form ko f(n) ko n^(log_b a) se compare karke sambhalta hai. Ya recursion ka PED banao aur per level kaam jodo: merge sort log n levels pe O(n) kaam karta hai, O(n log n) dete hue. Fibonacci jaisi asamaan recursion ke liye, uske bajaye call tree ke nodes gino.',
    },
  },
  {
    question: 'What is the difference between a stack and a queue?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A STACK is LIFO — the last item added is the first removed — used for the call stack, undo history, bracket matching, expression evaluation, and DFS. A QUEUE is FIFO — first in, first out — used for task scheduling, buffering, and BFS. Both give O(1) insert and remove. The key insight in problem solving is that a stack naturally reverses order and unwinds, while a queue preserves order and processes level by level.',
      hinglish:
        'Ek STACK LIFO hai — aakhri joda item pehle nikalta hai — call stack, undo history, bracket matching, expression evaluation, aur DFS ke liye. Ek QUEUE FIFO hai — pehle andar, pehle bahar — task scheduling, buffering, aur BFS ke liye. Dono O(1) insert aur remove dete hain. Problem solving mein key insight ye hai ki ek stack swabhavik roop se order ulta karta hai aur unwind karta hai, jabki ek queue order bachata hai aur level dar level process karta hai.',
    },
  },
  {
    question: 'What is a hash table and how are collisions handled?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A hash table maps a key to a bucket index via a hash function, so lookup jumps directly there — O(1) average. Collisions, where two keys land in the same bucket, are resolved by CHAINING (each bucket holds a linked list or tree) or OPEN ADDRESSING (probe for the next free slot). Worst case degrades to O(n) if everything collides. Load factor drives resizing, and a resize rehashes everything, which is why insert is O(1) amortised rather than strictly O(1).',
      hinglish:
        'Ek hash table ek key ko ek hash function se ek bucket index pe map karta hai, isliye lookup seedha wahan koodta hai — O(1) average. Collisions, jahan do keys ek hi bucket mein girein, CHAINING (har bucket ek linked list ya tree rakhta hai) ya OPEN ADDRESSING (agli khaali jagah dhoondho) se solve hote hain. Worst case O(n) tak girta hai agar sab collide karein. Load factor resizing chalata hai, aur ek resize sab dobara hash karta hai, isiliye insert strictly O(1) ke bajaye O(1) amortised hai.',
    },
  },
  {
    question: 'What makes a good hash function?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'It should distribute keys UNIFORMLY across buckets so no bucket becomes disproportionately long, be fast to compute since it runs on every operation, and be DETERMINISTIC — the same key must always hash the same. It should also be avalanche-sensitive, meaning a one-bit change in the key changes many bits of the hash. A poor hash function silently degrades every operation to O(n), and a predictable one enables hash-flooding denial-of-service attacks, which is why languages randomise the seed.',
      hinglish:
        'Ise keys ko buckets ke across EK SAMAAN baantna chahiye taaki koi bucket zaroorat se zyada lamba na ho, compute karne mein tez hona chahiye kyunki ye har operation pe chalta hai, aur NISHCHIT hona chahiye — wahi key hamesha wahi hash de. Ise avalanche-sensitive bhi hona chahiye, matlab key mein ek bit ka badlaav hash ke bahut bits badle. Ek kharab hash function chupke se har operation ko O(n) bana deta hai, aur ek anumaan lagane layak hash-flooding denial-of-service attacks enable karta hai, isiliye languages seed randomise karti hain.',
    },
  },
  {
    question: 'What is a binary search tree and when does it degrade?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A BST keeps smaller keys left and larger right, giving O(log n) search, insert, and delete when balanced. It DEGENERATES into a linked list when keys arrive in sorted order, at which point every operation is O(n) — and this happens silently, with no error, which is exactly the trap. Self-balancing variants (AVL, Red-Black) restructure on insert to guarantee logarithmic height, which is why production libraries use them rather than a plain BST.',
      hinglish:
        'Ek BST chhoti keys baaye aur badi daaye rakhta hai, balanced hone pe O(log n) search, insert, aur delete dete hue. Ye ek linked list mein GIR jaata hai jab keys sorted order mein aayein, jis point pe har operation O(n) hai — aur ye chupke se hota hai, bina error ke, jo theek wahi jaal hai. Self-balancing variants (AVL, Red-Black) insert pe dobara dhaancha banate hain taaki logarithmic height pakki ho, isiliye production libraries ek plain BST ke bajaye unhe use karti hain.',
    },
  },
  {
    question: 'What is the difference between an AVL tree and a Red-Black tree?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Both self-balance and guarantee O(log n), but they trade differently. AVL is STRICTLY balanced — heights differ by at most one — giving faster lookups but more rotations on insert and delete. RED-BLACK is loosely balanced, allowing a path up to twice as long, so it does fewer rotations and handles writes faster. That is why write-heavy standard libraries such as Java\'s TreeMap and C++\'s std::map use Red-Black, while AVL suits read-heavy workloads.',
      hinglish:
        'Dono khud balance karte hain aur O(log n) guarantee karte hain, par wo alag tarah trade karte hain. AVL SAKHTI se balanced hai — heights zyada se zyada ek se alag — tez lookups dete hue par insert aur delete pe zyada rotations. RED-BLACK dheele balanced hai, ek path ko dugna lamba hone deta hai, isliye ye kam rotations karta hai aur writes tez sambhalta hai. Isiliye Java ka TreeMap aur C++ ka std::map jaisi write-heavy standard libraries Red-Black use karti hain, jabki AVL read-heavy workloads ko suit karta hai.',
    },
  },
  {
    question: 'What is a heap and how is it stored?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A binary heap is a COMPLETE binary tree where every parent is smaller (min-heap) or larger (max-heap) than its children. Because it is complete, it is stored in a plain ARRAY with no pointers: the children of index i are at 2i+1 and 2i+2, which gives excellent cache locality. Peek is O(1), insert and extract are O(log n), and building a heap from n elements is O(n) — not O(n log n), which surprises people.',
      hinglish:
        'Ek binary heap ek POORA binary tree hai jahan har parent apne children se chhota (min-heap) ya bada (max-heap) hai. Kyunki ye poora hai, ye bina pointers ke ek plain ARRAY mein store hota hai: index i ke children 2i+1 aur 2i+2 pe hain, jo behtareen cache locality deta hai. Peek O(1) hai, insert aur extract O(log n), aur n elements se ek heap banana O(n) hai — O(n log n) nahi, jo logon ko chaunkata hai.',
    },
  },
  {
    question: 'How do you find the top k elements efficiently?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Sorting is O(n log n) and does more work than needed. A MIN-HEAP of size k gives O(n log k): push each element and pop when the heap exceeds k, so the heap always holds the k largest. QUICKSELECT gives O(n) average by partitioning and recursing into only one side, though worst case is O(n²) without a random pivot. Choose the heap for streaming data or when k is small, and quickselect when the array is in memory and you can mutate it.',
      hinglish:
        'Sorting O(n log n) hai aur zaroorat se zyada kaam karti hai. Size k ka ek MIN-HEAP O(n log k) deta hai: har element push karo aur heap k se bada hone pe pop karo, isliye heap hamesha k sabse bade rakhta hai. QUICKSELECT partition karke aur sirf ek side mein recurse karke O(n) average deta hai, halaanki ek random pivot ke bina worst case O(n²) hai. Streaming data ke liye ya k chhota hone pe heap chuno, aur quickselect jab array memory mein ho aur tum use badal sako.',
    },
  },
  {
    question: 'What is the difference between BFS and DFS and when do you use each?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'BFS explores level by level with a QUEUE; DFS goes deep first with a STACK or recursion. Both are O(V+E). Use BFS when you need the SHORTEST path in an unweighted graph or anything "nearest first" — it is guaranteed, DFS is not. Use DFS for cycle detection, topological sort, connected components, and backtracking. Memory differs: BFS holds an entire level, so on a wide graph it can use far more memory than DFS, which holds one path.',
      hinglish:
        'BFS ek QUEUE se level dar level explore karta hai; DFS ek STACK ya recursion se pehle gehra jaata hai. Dono O(V+E) hain. BFS tab use karo jab ek unweighted graph mein SABSE CHHOTA path chahiye ya koi bhi "nearest first" cheez — ye pakka hai, DFS nahi. DFS cycle detection, topological sort, connected components, aur backtracking ke liye. Memory alag hai: BFS ek poora level rakhta hai, isliye ek chaude graph pe ye DFS se bahut zyada memory le sakta hai, jo ek path rakhta hai.',
    },
  },
  {
    question: 'What is Dijkstra\'s algorithm and what is its limitation?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Dijkstra finds the shortest path from a source in a weighted graph by greedily expanding the closest unvisited node, using a priority queue for O((V+E) log V). Its limitation is that it fails with NEGATIVE edge weights: once a node is finalised it is never revisited, so a later negative edge that would improve the path is ignored. Bellman-Ford handles negative weights in O(VE) and detects negative cycles. A-star adds a heuristic to guide the search when a goal is known.',
      hinglish:
        'Dijkstra ek weighted graph mein source se sabse chhota path dhoondhta hai, greedily sabse paas ke unvisited node ko phailate hue, O((V+E) log V) ke liye ek priority queue use karte hue. Iski seema ye hai ki ye NEGATIVE edge weights ke saath fail hota hai: ek baar ek node tay ho jaaye to wo dobara nahi dekha jaata, isliye ek baad ka negative edge jo path behtar karta ignore ho jaata hai. Bellman-Ford negative weights O(VE) mein sambhalta hai aur negative cycles pakadta hai. A-star ek goal pata hone pe search guide karne ke liye ek heuristic jodta hai.',
    },
  },
  {
    question: 'What is a minimum spanning tree?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An MST connects every vertex of a weighted graph with the minimum total edge weight and no cycles, using exactly V-1 edges. KRUSKAL sorts all edges and adds the cheapest that does not form a cycle, using union-find to detect cycles — good for sparse graphs. PRIM grows a single tree from a starting vertex using a priority queue — good for dense graphs. Applications include network design, clustering, and laying cable or road networks at minimum cost.',
      hinglish:
        'Ek MST ek weighted graph ke har vertex ko kam se kam kul edge weight aur bina cycles ke jodta hai, theek V-1 edges use karte hue. KRUSKAL saare edges sort karta hai aur sabse sasta jodta hai jo cycle na banaye, cycles pakadne ke liye union-find use karte hue — sparse graphs ke liye achha. PRIM ek priority queue se ek shuruaati vertex se ek hi tree badhata hai — dense graphs ke liye achha. Applications mein network design, clustering, aur kam se kam cost pe cable ya road networks bichhana shaamil hai.',
    },
  },
  {
    question: 'What is the union-find data structure?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Union-find (disjoint set union) tracks a partition of elements into disjoint sets, supporting `find` (which set is x in?) and `union` (merge two sets). Two optimisations make it nearly O(1) amortised: PATH COMPRESSION flattens the tree during find, and UNION BY RANK attaches the smaller tree under the larger. It powers Kruskal\'s MST, connected-component detection, and cycle detection in an undirected graph, and it is deceptively simple to implement.',
      hinglish:
        'Union-find (disjoint set union) elements ke ek bantwaare ko alag-alag sets mein track karta hai, `find` (x kis set mein hai?) aur `union` (do sets milao) support karte hue. Do optimisations ise lagbhag O(1) amortised banate hain: PATH COMPRESSION find ke dauraan tree ko chapta karta hai, aur UNION BY RANK chhote tree ko bade ke neeche jodta hai. Ye Kruskal ka MST, connected-component detection, aur ek undirected graph mein cycle detection chalata hai, aur ise implement karna dhokha dene wala simple hai.',
    },
  },
  {
    question: 'What is dynamic programming and what are the two approaches?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'DP applies when a problem has OPTIMAL SUBSTRUCTURE and OVERLAPPING SUBPROBLEMS. TOP-DOWN memoisation writes the natural recursion and caches results, which is easier to derive from a brute force and only computes states you actually reach. BOTTOM-UP tabulation fills a table iteratively, which avoids recursion depth limits and often lets you reduce the table to one or two rows, cutting space from O(n²) to O(n).',
      hinglish:
        'DP tab lagta hai jab ek problem mein OPTIMAL SUBSTRUCTURE aur OVERLAPPING SUBPROBLEMS hon. TOP-DOWN memoisation swabhavik recursion likhta hai aur results cache karta hai, jo brute force se nikaalna easier hai aur sirf wo states compute karta hai jinpe tum actually pahunchte ho. BOTTOM-UP tabulation ek table ko baari-baari bharta hai, jo recursion depth seemayein bachata hai aur aksar tumhe table ko ek ya do rows tak kam karne deta hai, space ko O(n²) se O(n) karte hue.',
    },
  },
  {
    question: 'How do you recognise that a problem needs dynamic programming?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Look for a question asking for a MAXIMUM, MINIMUM, COUNT of ways, or whether something is achievable, combined with a set of choices at each step. Then check whether a brute-force recursion would recompute the same state repeatedly — if the same arguments recur, memoisation applies. Classic families are knapsack, longest common subsequence, edit distance, coin change, and grid paths. If the greedy choice happens to always be optimal, greedy is simpler and you do not need DP.',
      hinglish:
        'Ek aisa sawaal dhoondho jo MAXIMUM, MINIMUM, tareekon ka COUNT, ya kya kuch sambhav hai poochhe, har step pe choices ke ek set ke saath. Phir check karo ki ek brute-force recursion wahi state baar-baar compute karti ya nahi — agar wahi arguments dohraate hain, memoisation lagta hai. Classic families hain knapsack, longest common subsequence, edit distance, coin change, aur grid paths. Agar greedy choice hamesha optimal nikalti hai, greedy simpler hai aur tumhe DP nahi chahiye.',
    },
  },
  {
    question: 'What is the knapsack problem?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Given items with weights and values and a capacity limit, choose a subset maximising value. In the 0/1 version each item is taken or not, which requires DP over a capacity table in O(nW). The FRACTIONAL version, where you may take part of an item, is solved greedily by value-to-weight ratio in O(n log n). The distinction matters because greedy is provably optimal for fractional and provably wrong for 0/1 — a common interview trap.',
      hinglish:
        'Weights aur values wale items aur ek capacity seema diye, value badhaata ek subset chuno. 0/1 version mein har item liya jaata hai ya nahi, jiske liye ek capacity table pe DP chahiye O(nW) mein. FRACTIONAL version, jahan tum ek item ka hissa le sakte ho, value-se-weight ratio se greedily O(n log n) mein solve hota hai. Farak isliye matter karta hai kyunki greedy fractional ke liye saabit roop se optimal aur 0/1 ke liye saabit roop se galat hai — ek common interview jaal.',
    },
  },
  {
    question: 'What is memoisation and how does it differ from caching?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Memoisation caches a function\'s result KEYED BY ITS ARGUMENTS, so repeated calls with the same input return instantly — turning exponential Fibonacci into linear. It requires the function to be PURE, since caching something with side effects or changing dependencies gives wrong answers. Caching is the broader idea of storing any expensive result. The practical caution is memory: an unbounded memo on high-cardinality inputs is a leak, so real implementations bound it.',
      hinglish:
        'Memoisation ek function ka nateeja USKE ARGUMENTS SE KEYED cache karta hai, isliye wahi input ke saath dohraayi calls turant lautti hain — exponential Fibonacci ko linear banate hue. Ise function ka PURE hona chahiye, kyunki side effects ya badalti dependencies wali cheez cache karna galat jawab deta hai. Caching kisi bhi mehnge nateeje ko rakhne ka chaudaa idea hai. Vyavaharik saavdhaani memory hai: high-cardinality inputs pe ek bina seema memo ek leak hai, isliye asli implementations use seemit karte hain.',
    },
  },
  {
    question: 'What is the difference between a greedy algorithm and dynamic programming?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'GREEDY makes the locally best choice at each step and never reconsiders — fast, simple, and correct only when the problem has the greedy-choice property. DP explores all relevant choices and combines subproblem results, which is slower but correct wherever the recurrence holds. Coin change illustrates it: greedy works for standard currency but fails for coins {1,3,4} making 6, where greedy gives 4+1+1 while the optimum is 3+3. Proving greedy correctness is the hard part.',
      hinglish:
        'GREEDY har step pe locally best choice karta hai aur kabhi dobara nahi sochta — tez, simple, aur sirf tab sahi jab problem mein greedy-choice property ho. DP saare relevant choices dekhta hai aur subproblem results jodta hai, jo slow hai par jahan recurrence sahi ho wahan sahi. Coin change ise dikhata hai: greedy standard currency pe chalta hai par {1,3,4} sikkon se 6 banane pe fail hota hai, jahan greedy 4+1+1 deta hai jabki optimum 3+3 hai. Greedy ka sahi hona saabit karna mushkil hissa hai.',
    },
  },
  {
    question: 'What is backtracking and how does it differ from brute force?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Both explore a solution space, but backtracking PRUNES: it abandons a partial candidate the moment it cannot possibly lead to a valid answer, rather than completing it and then checking. In N-Queens, brute force places all queens and tests; backtracking rejects a placement the instant it is attacked, cutting the search space enormously. The implementation shape is consistent — choose, recurse, un-choose — and the pruning is what makes an exponential space tractable.',
      hinglish:
        'Dono ek solution space explore karte hain, par backtracking CHHAANTTA hai: ye ek aadhe candidate ko us pal chhod deta hai jab wo kisi tarah ek valid jawab tak nahi ja sakta, use poora karke phir check karne ke bajaye. N-Queens mein, brute force saari queens rakh kar test karta hai; backtracking ek placement us pal reject karta hai jab wo attack mein aaye, search space bahut kam karte hue. Implementation ka aakaar ek jaisa hai — choose, recurse, un-choose — aur pruning hi ek exponential space ko sambhaalne layak banata hai.',
    },
  },
  {
    question: 'What is the difference between a graph and a tree?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A TREE is a special graph: connected, acyclic, and with exactly n-1 edges for n nodes, so there is exactly ONE path between any two nodes. A general GRAPH may have cycles, be disconnected, and have many paths between nodes. That difference drives the algorithms: tree traversal needs no visited set because you cannot revisit a node, while graph traversal absolutely does, and forgetting it causes an infinite loop.',
      hinglish:
        'Ek TREE ek khaas graph hai: juda, bina cycles, aur n nodes ke liye theek n-1 edges, isliye kisi bhi do nodes ke beech theek EK path hai. Ek aam GRAPH mein cycles ho sakte hain, wo juda na ho, aur nodes ke beech bahut paths ho sakte hain. Wo farak algorithms chalata hai: tree traversal ko visited set nahi chahiye kyunki tum ek node dobara nahi dekh sakte, jabki graph traversal ko bilkul chahiye, aur ise bhoolna ek anant loop banata hai.',
    },
  },
  {
    question: 'How do you represent a graph and which representation should you choose?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An ADJACENCY LIST stores each node\'s neighbours, using O(V+E) space and giving fast neighbour iteration — the right choice for sparse graphs, which is most real data. An ADJACENCY MATRIX uses O(V²) space but answers "is there an edge between a and b" in O(1) and suits dense graphs or algorithms needing constant-time edge lookup, such as Floyd-Warshall. An EDGE LIST is simplest and is what Kruskal\'s algorithm consumes directly.',
      hinglish:
        'Ek ADJACENCY LIST har node ke neighbours rakhti hai, O(V+E) space use karke aur tez neighbour iteration deti hui — sparse graphs ke liye sahi choice, jo zyadatar asli data hai. Ek ADJACENCY MATRIX O(V²) space leta hai par "a aur b ke beech edge hai kya" O(1) mein batata hai aur dense graphs ya Floyd-Warshall jaise constant-time edge lookup chahne wale algorithms ko suit karta hai. Ek EDGE LIST sabse simple hai aur Kruskal ka algorithm ise seedha use karta hai.',
    },
  },
  {
    question: 'What is topological sorting?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'It orders a directed acyclic graph so every edge points forward — each dependency comes before whatever needs it. Kahn\'s algorithm repeatedly removes nodes with in-degree zero; a DFS variant pushes nodes onto a stack when finished. It exists only for a DAG, so if the algorithm cannot emit every node, a cycle exists — which is how build tools detect circular dependencies. Applications include build systems, module bundlers, task schedulers, and course prerequisites.',
      hinglish:
        'Ye ek directed acyclic graph ko aise order karta hai ki har edge aage point kare — har dependency us se pehle aaye jise wo chahiye. Kahn ka algorithm baar-baar in-degree zero wale nodes hataata hai; ek DFS variant nodes ko khatam hone pe ek stack pe daalta hai. Ye sirf ek DAG ke liye hai, isliye agar algorithm har node nahi nikaal paaye, ek cycle hai — jisse build tools circular dependencies pakadte hain. Applications mein build systems, module bundlers, task schedulers, aur course prerequisites hain.',
    },
  },
  {
    question: 'What is a trie and what is its trade-off?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A trie stores strings along tree paths, sharing common prefixes, so lookup and insert cost O(m) where m is the word length — independent of how many words are stored, unlike a BST. It is the right structure for autocomplete, prefix matching, spell-check, and IP routing. The trade-off is MEMORY: every node carries child pointers, so a trie typically uses considerably more space than a hash set for the same words. It only pays off when PREFIX queries matter.',
      hinglish:
        'Ek trie strings ko tree paths ke saath rakhta hai, common prefixes share karte hue, isliye lookup aur insert ka cost O(m) hai jahan m word length hai — kitne words hain us se swatantra, ek BST ke ulat. Ye autocomplete, prefix matching, spell-check, aur IP routing ke liye sahi structure hai. Trade-off MEMORY hai: har node child pointers rakhta hai, isliye ek trie usually usi words ke liye ek hash set se kaafi zyada jagah leta hai. Ye sirf tab faayda deta hai jab PREFIX queries matter karein.',
    },
  },
  {
    question: 'What is the difference between stable and unstable sorting?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A STABLE sort preserves the relative order of elements comparing equal; an unstable one may reorder them. It matters when sorting by multiple keys in sequence — sort by name, then stably by department, and names stay alphabetical within each department. Merge sort, insertion sort, and TimSort are stable; quicksort and heapsort are not. It also matters when the payload carries data beyond the sort key, since "equal" rows are not actually interchangeable.',
      hinglish:
        'Ek STABLE sort barabar compare hote elements ka relative order bachata hai; ek unstable unhe reorder kar sakta hai. Ye tab matter karta hai jab kai keys pe kram se sort karo — naam se sort karo, phir stably department se, aur naam har department ke andar alphabetical rehte hain. Merge sort, insertion sort, aur TimSort stable hain; quicksort aur heapsort nahi. Ye tab bhi matter karta hai jab payload sort key se aage ka data rakhta ho, kyunki "barabar" rows actually ek jaisi nahi hain.',
    },
  },
  {
    question: 'Why is quicksort usually faster than merge sort in practice?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Both are O(n log n) on average, but quicksort has smaller constants: it sorts IN PLACE with no extra allocation, and its partitioning has excellent cache locality since it works on contiguous regions. Merge sort needs O(n) auxiliary space and copies data between buffers. Quicksort\'s weakness is a worst case of O(n²) on bad pivots, mitigated by random or median-of-three pivots, and it is not stable — which is why merge-based TimSort is chosen where stability is required.',
      hinglish:
        'Dono average pe O(n log n) hain, par quicksort ke constants chhote hain: ye bina extra allocation ke JAGAH PE sort karta hai, aur uski partitioning ki cache locality behtareen hai kyunki wo saath-saath ke ilaakon pe kaam karta hai. Merge sort ko O(n) extra space chahiye aur wo buffers ke beech data copy karta hai. Quicksort ki kamzori bure pivots pe O(n²) worst case hai, jise random ya median-of-three pivots kam karte hain, aur ye stable nahi hai — isiliye jahan stability chahiye wahan merge-based TimSort chuna jaata hai.',
    },
  },
  {
    question: 'What is counting sort and when can you use it?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Counting sort tallies how many times each value occurs and reconstructs the output from the counts, giving O(n+k) where k is the value range — linear time, beating the O(n log n) comparison lower bound because it does not compare elements at all. It only works for integers or discrete keys within a BOUNDED, reasonably small range: sorting ages is fine, sorting arbitrary 64-bit integers is not, since k would dwarf n. Radix sort extends the idea digit by digit.',
      hinglish:
        'Counting sort ginta hai ki har value kitni baar aayi aur counts se output dobara banata hai, O(n+k) dete hue jahan k value range hai — linear samay, O(n log n) comparison lower bound ko haraate hue kyunki ye elements compare karta hi nahi. Ye sirf ek SEEMIT, thodi chhoti range ke integers ya discrete keys ke liye chalta hai: umar sort karna theek hai, koi bhi 64-bit integers sort karna nahi, kyunki k n se bahut bada hota. Radix sort is idea ko ank dar ank aage badhata hai.',
    },
  },
  {
    question: 'What is the lower bound for comparison-based sorting?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Ω(n log n). The proof is a decision-tree argument: there are n! possible orderings, each comparison has two outcomes, so a tree distinguishing all of them needs depth at least log₂(n!) which is Θ(n log n). No comparison sort can beat this. Counting, radix, and bucket sort achieve linear time only because they do NOT compare elements — they exploit structure in the keys, which is why they need bounded ranges.',
      hinglish:
        'Ω(n log n). Saboot ek decision-tree dalil hai: n! sambhav orderings hain, har comparison ke do nateeje hain, isliye un sabko alag karta ek tree ko kam se kam log₂(n!) gehraai chahiye jo Θ(n log n) hai. Koi comparison sort ise nahi hara sakta. Counting, radix, aur bucket sort linear samay sirf isliye paate hain kyunki wo elements compare NAHI karte — wo keys ke dhaanche ka faayda uthate hain, isiliye unhe seemit ranges chahiye.',
    },
  },
  {
    question: 'What is binary search and where does it apply beyond sorted arrays?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Binary search halves a search range each step for O(log n), requiring the data to be sorted. The deeper insight is that it applies to any MONOTONIC predicate — "what is the smallest value for which this is true?" That covers binary search on the ANSWER: finding the minimum capacity that lets you ship packages in d days, or the smallest speed to finish eating in h hours. Recognising that pattern converts many hard problems into a short loop.',
      hinglish:
        'Binary search har step pe ek search range aadhi karta hai O(log n) ke liye, data ka sorted hona chahte hue. Gehri insight ye hai ki ye kisi bhi MONOTONIC predicate pe lagta hai — "sabse chhoti value kya hai jiske liye ye sach hai?" Isme JAWAB pe binary search shaamil hai: wo kam se kam capacity dhoondhna jo tumhe d din mein packages bhejne de, ya h ghante mein khana khatam karne ki sabse chhoti speed. Us pattern ko pehchanana bahut mushkil problems ko ek chhote loop mein badal deta hai.',
    },
  },
  {
    question: 'What is the two-pointer technique?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Two pointers move through a structure simultaneously, converting many O(n²) nested loops into O(n). The two shapes are OPPOSITE ENDS converging inward, used on sorted arrays for two-sum, palindromes, and container-with-most-water; and SAME DIRECTION at different speeds, used for in-place duplicate removal, partitioning, and cycle detection. The signal in a problem is a sorted array, a pair or triplet target, or an in-place rearrangement requirement.',
      hinglish:
        'Do pointers ek dhaanche mein ek saath chalte hain, bahut O(n²) nested loops ko O(n) mein badalte hue. Do aakaar hain ULTE SIREY jo andar milte hain, sorted arrays pe two-sum, palindromes, aur container-with-most-water ke liye; aur EK HI DISHA mein alag speeds pe, jagah pe duplicates hataane, partitioning, aur cycle detection ke liye. Problem mein signal ek sorted array, ek pair ya triplet target, ya ek jagah-pe rearrangement ki zaroorat hai.',
    },
  },
  {
    question: 'What is the sliding window technique?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A sliding window maintains a contiguous range and moves its boundaries instead of recomputing from scratch, turning O(n·k) into O(n). FIXED windows suit "maximum sum of k consecutive elements" — add the entering element, subtract the leaving one. VARIABLE windows suit "longest substring satisfying a condition" — expand the right edge greedily and shrink from the left when the condition breaks. The trigger phrase is "contiguous subarray or substring".',
      hinglish:
        'Ek sliding window ek saath-saath ki range rakhta hai aur shuru se dobara compute karne ke bajaye uski seemayein hilata hai, O(n·k) ko O(n) mein badalte hue. FIXED windows "k lagataar elements ka maximum sum" suit karti hain — aane wala element jodo, jaane wala ghatao. VARIABLE windows "ek condition poori karti sabse lambi substring" suit karti hain — right kinaara greedily badhao aur condition tootne pe baaye se sikodo. Trigger phrase "contiguous subarray ya substring" hai.',
    },
  },
  {
    question: 'What is the difference between an array and a dynamic array?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A static array has a FIXED capacity chosen at creation. A dynamic array (vector, ArrayList, Python list) grows automatically: when full it allocates a larger buffer — typically double — and copies everything over. That copy is O(n), but because capacity doubles, the cost spread over n appends is O(1) AMORTISED. Doubling specifically matters: growing by a constant amount instead would make n appends O(n²).',
      hinglish:
        'Ek static array ki capacity banate waqt TAY hoti hai. Ek dynamic array (vector, ArrayList, Python list) apne aap badhta hai: bharne pe ye ek bada buffer banata hai — typically dugna — aur sab copy karta hai. Wo copy O(n) hai, par kyunki capacity dugni hoti hai, n appends pe faila cost O(1) AMORTISED hai. Dugna karna khaas taur pe matter karta hai: uske bajaye ek tay maatra se badhna n appends ko O(n²) bana deta.',
    },
  },
  {
    question: 'How do you detect a cycle in a linked list?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Floyd\'s tortoise-and-hare: advance one pointer one node and another two. If they meet, a cycle exists; if the fast pointer reaches null, it does not. That is O(n) time and O(1) space, versus a hash set which also works but costs O(n) memory. To find the cycle\'s START, reset one pointer to the head and advance both one step at a time — they meet at the entry node, which follows from the distance arithmetic.',
      hinglish:
        'Floyd ka tortoise-and-hare: ek pointer ek node aur doosra do node aage badhao. Agar wo milein, ek cycle hai; agar fast pointer null pahunche, nahi hai. Ye O(n) samay aur O(1) space hai, versus ek hash set jo chalta to hai par O(n) memory leta hai. Cycle ka SHURU dhoondhne ke liye, ek pointer head pe reset karke dono ko ek-ek step badhao — wo entry node pe milte hain, jo distance arithmetic se nikalta hai.',
    },
  },
  {
    question: 'What is the difference between an iterative and a recursive solution?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Recursion mirrors the problem structure and is usually shorter and clearer for trees and divide-and-conquer, but consumes O(depth) call-stack space and risks overflow. Iteration with an explicit stack has the same complexity but keeps the memory on the heap, so it handles arbitrary depth and lets you pause or inspect the traversal state. Write recursion by default; convert to iteration when depth is unbounded or you need explicit control.',
      hinglish:
        'Recursion problem ke dhaanche ko mirror karti hai aur trees aur divide-and-conquer ke liye usually chhoti aur clearer hai, par O(depth) call-stack space leti hai aur overflow ka khatra rakhti hai. Ek explicit stack wali iteration ki complexity wahi hai par memory heap pe rehti hai, isliye ye koi bhi gehraai sambhalti hai aur tumhe traversal state rokne ya dekhne deti hai. Default se recursion likho; jab gehraai bina seema ho ya explicit control chahiye tab iteration mein badlo.',
    },
  },
  {
    question: 'What is tail recursion?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A call is tail-recursive when the recursive call is the LAST operation, so the current frame\'s state is no longer needed and could be reused rather than pushed. Languages that implement tail-call optimisation therefore run it in constant stack space. The important caveat is that Python and JavaScript do NOT optimise tail calls in practice, so writing tail-recursive code there gives no protection from stack overflow — you must convert to a loop.',
      hinglish:
        'Ek call tail-recursive hai jab recursive call AAKHRI operation ho, isliye current frame ki state ab zaroori nahi aur push karne ke bajaye dobara use ho sakti hai. Isliye jo languages tail-call optimisation implement karti hain wo ise sthir stack space mein chalati hain. Zaroori caveat ye hai ki Python aur JavaScript practically tail calls optimise NAHI karte, isliye wahan tail-recursive code likhna stack overflow se koi bachaav nahi deta — tumhe ek loop mein badalna padega.',
    },
  },
  {
    question: 'What is the difference between depth and height of a tree?',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        'DEPTH of a node is its distance from the ROOT, so the root has depth 0. HEIGHT of a node is the distance to its deepest LEAF, so leaves have height 0. The height of the TREE is the height of the root, which equals the maximum depth. Depth is computed top-down as you descend, height is computed bottom-up as recursion returns — which is exactly why height calculations naturally use post-order traversal.',
      hinglish:
        'Ek node ki DEPTH ROOT se uski doori hai, isliye root ki depth 0 hai. Ek node ki HEIGHT uske sabse gehre LEAF tak ki doori hai, isliye leaves ki height 0 hai. TREE ki height root ki height hai, jo zyada se zyada depth ke barabar hai. Depth utarte waqt upar se neeche compute hoti hai, height recursion lautte waqt neeche se upar — isiliye height ke hisaab swabhavik roop se post-order traversal use karte hain.',
    },
  },
  {
    question: 'What is a balanced tree and why does balance matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A balanced tree keeps its height O(log n) rather than letting it approach n. Balance matters because every tree operation costs O(height) — a balanced tree of a million nodes needs about twenty steps, while a degenerate one needs a million. Different definitions exist: AVL requires subtree heights to differ by at most one, Red-Black allows a looser factor of two. Without rebalancing, sorted insertions silently produce the worst case.',
      hinglish:
        'Ek balanced tree apni height ko n ke paas jaane dene ke bajaye O(log n) rakhta hai. Balance isliye matter karta hai kyunki har tree operation O(height) cost karta hai — das lakh nodes ke ek balanced tree ko lagbhag bees steps chahiye, jabki ek bigde hue ko das lakh. Alag paribhaashaayein hain: AVL subtree heights ko zyada se zyada ek se alag chahta hai, Red-Black do ka ek dheela factor deta hai. Bina rebalancing, sorted insertions chupke se worst case bana dete hain.',
    },
  },
  {
    question: 'What is the difference between a min-heap and a BST?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A min-heap only guarantees each parent is smaller than its CHILDREN, with no ordering between siblings — so it gives O(1) access to the minimum but cannot search for an arbitrary value faster than O(n), and an in-order traversal is meaningless. A BST maintains a full ordering, so it supports O(log n) search for any key and yields sorted output in-order. Use a heap when you only ever need the extreme; use a BST when you need ordered search.',
      hinglish:
        'Ek min-heap sirf ye pakka karta hai ki har parent apne CHILDREN se chhota hai, siblings ke beech koi order nahi — isliye ye minimum tak O(1) pahunch deta hai par kisi bhi value ko O(n) se tez nahi dhoondh sakta, aur ek in-order traversal ka koi matlab nahi. Ek BST poora order rakhta hai, isliye ye kisi bhi key ke liye O(log n) search deta hai aur in-order sorted output deta hai. Heap tab use karo jab sirf sabse chhota ya bada chahiye; BST jab ordered search chahiye.',
    },
  },
  {
    question: 'How do you choose the right data structure for a problem?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Ask what OPERATIONS dominate and how often. Need O(1) lookup by key — hash map. Need ordered iteration or range queries — balanced BST or sorted array. Need the minimum or maximum repeatedly — heap. Need LIFO or FIFO processing — stack or queue. Need prefix matching — trie. Need connectivity between groups — union-find. Then weigh memory and cache behaviour, since an array often beats a theoretically better structure at small sizes.',
      hinglish:
        'Poochho ki kaunse OPERATIONS haavi hain aur kitni baar. Key se O(1) lookup chahiye — hash map. Ordered iteration ya range queries chahiye — balanced BST ya sorted array. Baar-baar minimum ya maximum chahiye — heap. LIFO ya FIFO processing chahiye — stack ya queue. Prefix matching chahiye — trie. Groups ke beech connectivity chahiye — union-find. Phir memory aur cache behaviour tolo, kyunki chhote sizes pe ek array aksar ek theory mein behtar structure ko hara deta hai.',
    },
  },
  {
    question: 'What is cache locality and why does it affect performance?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CPUs fetch memory in cache lines, so accessing data stored contiguously is far faster than chasing pointers scattered across the heap. That is why an array often outperforms a linked list even for operations where the linked list has better asymptotic complexity — a cache miss costs roughly a hundred times an L1 hit. It also explains why heaps are stored in arrays, why row-major iteration beats column-major, and why Big-O alone can mislead you about real speed.',
      hinglish:
        'CPUs memory ko cache lines mein laate hain, isliye saath-saath rakhe data tak pahunchna heap pe bikhre pointers ka peechha karne se bahut tez hai. Isiliye ek array aksar ek linked list se behtar chalta hai un operations pe bhi jahan linked list ki asymptotic complexity behtar hai — ek cache miss ek L1 hit se lagbhag sau guna cost karta hai. Ye ye bhi samjhaata hai ki heaps arrays mein kyun rakhe jaate hain, row-major iteration column-major ko kyun haraati hai, aur akela Big-O asli speed ke baare mein kyun bhatka sakta hai.',
    },
  },
  {
    question: 'What is the difference between in-place and out-of-place algorithms?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An IN-PLACE algorithm uses O(1) extra space, transforming the input directly — quicksort, heapsort, array reversal. An OUT-OF-PLACE algorithm allocates proportional extra space — merge sort, or building a new filtered array. In-place saves memory, which matters on large data, but it MUTATES the input, so the caller loses the original. That side effect makes the function harder to reason about and unsafe if the caller still needs the input.',
      hinglish:
        'Ek IN-PLACE algorithm O(1) extra space use karta hai, input ko seedha badalte hue — quicksort, heapsort, array reversal. Ek OUT-OF-PLACE algorithm anupaat mein extra space leta hai — merge sort, ya ek naya filtered array banana. In-place memory bachata hai, jo bade data pe matter karta hai, par ye input BADAL deta hai, isliye caller original kho deta hai. Wo side effect function ko samajhna mushkil banata hai aur asurakshit agar caller ko abhi bhi input chahiye.',
    },
  },
  {
    question: 'How do you approach an unfamiliar algorithm problem?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Restate the problem and confirm constraints and edge cases — empty input, duplicates, negatives, size limits — before writing anything. Work a small example by hand to find the pattern. State a brute-force solution and its complexity so you always have a working answer, then optimise by asking what redundant work it repeats, which points to hashing, sorting, two pointers, or DP. Code while narrating your reasoning, then dry-run it. Communication is assessed as heavily as the solution.',
      hinglish:
        'Kuch likhne se pehle problem dobara batao aur constraints aur edge cases confirm karo — khaali input, duplicates, negatives, size seemayein. Pattern dhoondhne ke liye ek chhota example haath se karo. Ek brute-force solution aur uski complexity batao taaki tumhare paas hamesha ek chalta jawab ho, phir ye poochh kar optimise karo ki wo kaunsa faltu kaam dohraata hai, jo hashing, sorting, two pointers, ya DP ki taraf ishaara karta hai. Apni soch bolte hue code likho, phir use dry-run karo. Communication ko solution jitna hi aanka jaata hai.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
