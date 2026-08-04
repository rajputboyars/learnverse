// NumPy curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs / typescript.mjs, consumed by scripts/seed.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'NumPy',
  slug: 'numpy',
  description:
    'Python ki numerical computing power — arrays, vectorization, broadcasting aur math. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🔢',
  tags: ['numpy', 'python', 'data-science', 'arrays'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 21,
};

const beginner = [
  {
    title: 'NumPy Basics',
    level: 'beginner',
    description: 'NumPy kya hai, arrays kyun, aur arrays banane ke tareeke.',
    concepts: [
      {
        title: 'The Story of NumPy — What, Why & How',
        difficulty: 'easy',
        tags: ['intro', 'story', 'basics'],
        explanation: {
          english:
            'Imagine you run a kirana shop and one fine morning a new GST rule arrives: add 18% tax to every price in your catalogue. 🧾 No big deal for 10 items. But what if your wholesale catalogue has 10 lakh (1,000,000) prices? You write a plain Python loop that goes one-by-one, multiplying each price by 1.18. It works... but it crawls. Seconds tick by. Your laptop fan screams. The shop opens before the loop finishes. 😩\n\nThis is the exact pain NumPy was born to kill. NumPy lets you say "multiply ALL prices by 1.18" in a single line, and it finishes in a blink.\n\nWHAT is NumPy? It is a Python library (Numerical Python) that gives you a powerful new data type: the N-dimensional array (ndarray). Think of it as a super-fast, super-organised grid of numbers — 1D (a list), 2D (a table/matrix), 3D (a stack of tables), and beyond. On top of arrays, NumPy ships hundreds of fast math functions.\n\nWHY do millions of developers use it? 🚀 (1) Speed: the heavy lifting runs in optimised C, not slow Python, so it is often 10–100x faster than loops. (2) Vectorization: you express whole-array math in one clean line — no manual loops. (3) Memory efficient: numbers are packed tightly, unlike bulky Python lists. (4) Foundation: NumPy is the bedrock of the entire Python data world — Pandas, scikit-learn, TensorFlow, PyTorch, Matplotlib all stand on NumPy arrays.\n\nHOW does it pull off this speed? 🔧 A Python list scatters its objects all over memory, each one a fat boxed object. A NumPy array stores raw numbers side-by-side in one contiguous block of memory, all the same type (dtype). When you do array math, NumPy hands the work to pre-compiled C/Fortran routines that rip through that tight memory block in one tight loop — no Python overhead per element. That is the secret sauce. So: same problem, but instead of a slow Python for-loop, you get a one-line vectorized operation running at C speed. Welcome to NumPy. 🎉',
          hinglish:
            'Socho tum ek kirana shop chalate ho aur ek subah naya GST rule aa jaata hai: catalogue ke har price pe 18% tax add karo. 🧾 10 items ke liye koi badi baat nahi. Lekin agar wholesale catalogue mein 10 lakh (1,000,000) prices hain to? Tum ek simple Python loop likhte ho jo ek-ek karke har price ko 1.18 se multiply karta hai. Chalta to hai... par bohot dheere. Seconds nikalte jaate hain, laptop ka fan chilla raha hai, aur loop khatam hone se pehle hi shop khul jaati hai. 😩\n\nYahi takleef khatam karne ke liye NumPy bana hai. NumPy se tum keh sakte ho "saari prices ko 1.18 se multiply kar do" ek hi line mein, aur ye pal bhar mein ho jaata hai.\n\nNumPy hai KYA? Ye ek Python library hai (Numerical Python) jo ek powerful naya data type deti hai: N-dimensional array (ndarray). Isko samjho ek super-fast, super-organised numbers ka grid — 1D (ek list), 2D (ek table/matrix), 3D (tables ka stack), aur aage bhi. Arrays ke upar NumPy sainkdo fast math functions deti hai.\n\nMillions developers ise use KYUN karte hain? 🚀 (1) Speed: bhaari kaam optimised C mein chalta hai, slow Python mein nahi, isliye loops se aksar 10–100x tej. (2) Vectorization: poore array ka math ek saaf line mein — manual loop nahi. (3) Memory efficient: numbers tightly packed hote hain, Python lists ki tarah bhaari nahi. (4) Foundation: NumPy poori Python data duniya ki neenv hai — Pandas, scikit-learn, TensorFlow, PyTorch, Matplotlib sab NumPy arrays pe khade hain.\n\nYe speed laata KAISE hai? 🔧 Python list apne objects memory mein idhar-udhar bikhera deti hai, har ek bhaari boxed object. NumPy array raw numbers ko memory ke ek hi contiguous block mein side-by-side rakhta hai, sab same type (dtype) ke. Jab tum array math karte ho, NumPy kaam pre-compiled C/Fortran routines ko de deta hai jo us tight memory block ko ek tight loop mein cheer dete hain — har element pe Python ka overhead nahi. Yahi asli jaadu hai. To: same problem, par slow Python for-loop ki jagah ek-line vectorized operation jo C speed pe chalta hai. NumPy mein swaagat hai. 🎉',
        },
        dailyLifeExample:
          'Sabzi mandi mein 1000 tokri tolni hain. Ek Python loop matlab ek aadmi ek-ek tokri uthata hai — thakta jaata hai. NumPy matlab ek bada digital weighing platform jahan saari 1000 tokri ek saath rakh do aur total ek second mein. Same kaam, par poori mandi ek shot mein.',
        codeExample:
          'import numpy as np\n\n# Plain Python — slow loop over 10 lakh prices\nprices = list(range(1, 1000001))\ntaxed = []\nfor p in prices:\n    taxed.append(p * 1.18)   # one-by-one, slow\n\n# NumPy — one vectorized line, runs in C at full speed\nprices_np = np.arange(1, 1000001)\ntaxed_np = prices_np * 1.18   # whole array at once!\n\nprint(taxed_np[:5])   # [1.18 2.36 3.54 4.72 5.9 ]\nprint(type(prices_np))  # <class \'numpy.ndarray\'>',
        keyPoints: [
          'NumPy = Numerical Python: fast N-dimensional arrays (ndarray) + math',
          'Heavy work runs in optimised C, often 10-100x faster than Python loops',
          'Vectorization: whole-array math in one line, no manual loops',
          'Arrays live in contiguous memory with one dtype — memory efficient',
          'Foundation of Pandas, scikit-learn, TensorFlow, PyTorch, Matplotlib',
        ],
        quiz: [
          {
            question: 'Why is NumPy faster than a plain Python loop for number crunching?',
            options: [
              'It uses more RAM',
              'It runs operations in optimised compiled C over contiguous memory',
              'It skips the math',
              'It only works on small data',
            ],
            correctIndex: 1,
          },
          {
            question: 'The core data structure NumPy provides is the…',
            options: ['DataFrame', 'ndarray (N-dimensional array)', 'linked list', 'dictionary'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is NumPy and why is it preferred over Python lists for numerical work?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'NumPy is a Python library for numerical computing built around the ndarray, a fast N-dimensional array. It is preferred over lists because arrays store homogeneous numbers in contiguous memory and run operations in compiled C, making them far faster and more memory-efficient. It also supports vectorization (whole-array math without loops) and is the foundation for Pandas, scikit-learn, and most ML tools.',
              hinglish:
                'NumPy numerical computing ke liye ek Python library hai jo ndarray (fast N-dimensional array) ke around bani hai. Lists se isliye behtar hai kyunki arrays homogeneous numbers ko contiguous memory mein rakhte hain aur operations compiled C mein chalate hain, jisse ye bohot fast aur memory-efficient hote hain. Ye vectorization (bina loop poore array ka math) bhi support karta hai aur Pandas, scikit-learn, aur zyadatar ML tools ki neenv hai.',
            },
          },
        ],
      },
      {
        title: 'Creating Arrays',
        difficulty: 'easy',
        tags: ['arrays', 'creation', 'basics'],
        explanation: {
          english:
            'You almost always import NumPy as np: "import numpy as np". The simplest way to make an array is np.array() from a Python list. NumPy also has handy generators: np.zeros(shape) for all-zeros, np.ones(shape) for all-ones, np.full(shape, value) for a constant, np.arange(start, stop, step) for evenly spaced values like range(), and np.linspace(start, stop, num) for a fixed COUNT of evenly spaced values (endpoint included).',
          hinglish:
            'NumPy ko hamesha np ke naam se import karte hain: "import numpy as np". Array banane ka sabse simple tareeka hai Python list se np.array(). NumPy ke kuch handy generators bhi hain: np.zeros(shape) saare zeros ke liye, np.ones(shape) saare ones ke liye, np.full(shape, value) ek constant ke liye, np.arange(start, stop, step) range() jaise evenly spaced values ke liye, aur np.linspace(start, stop, num) jo fixed COUNT mein evenly spaced values deta hai (endpoint included).',
        },
        dailyLifeExample:
          'np.zeros jaise khaali attendance register — sab 0 marks. np.arange jaise cricket ke over numbers 1,2,3...20. np.linspace jaise tum keh do "Delhi se Agra ke beech 5 barabar rest stops chahiye" — NumPy doori barabar baant deta hai.',
        codeExample:
          'import numpy as np\n\n# From a Python list\na = np.array([1, 2, 3, 4])\n\n# Generators\nzeros = np.zeros((2, 3))        # 2x3 grid of 0.0\nones  = np.ones((3,))          # [1. 1. 1.]\nfull  = np.full((2, 2), 7)      # 2x2 grid of 7\n\n# Ranges\nr = np.arange(0, 10, 2)         # [0 2 4 6 8]\nl = np.linspace(0, 1, 5)        # [0.   0.25 0.5  0.75 1.  ]\n\nprint(a)\nprint(zeros)\nprint(l)',
        keyPoints: [
          'Convention: import numpy as np',
          'np.array(list) builds an array from a Python list',
          'np.zeros / np.ones / np.full create filled arrays by shape',
          'np.arange(start, stop, step) is like range() but returns an array',
          'np.linspace(start, stop, num) gives a fixed COUNT of evenly spaced values',
        ],
        quiz: [
          {
            question: 'What does np.linspace(0, 10, 5) produce?',
            options: [
              '5 values evenly spaced from 0 to 10 inclusive',
              'Values from 0 to 10 stepping by 5',
              'A 5x10 matrix of zeros',
              'The number 50',
            ],
            correctIndex: 0,
          },
          {
            question: 'np.arange(1, 7, 2) returns…',
            options: ['[1 2 3 4 5 6]', '[1 3 5]', '[2 4 6]', '[1 7 2]'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between np.arange and np.linspace?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'np.arange(start, stop, step) is defined by a STEP size and excludes the stop value, just like Python range(). np.linspace(start, stop, num) is defined by the NUMBER of points you want and, by default, includes the endpoint. Use arange when you know the step; use linspace when you know how many evenly spaced points you need.',
              hinglish:
                'np.arange(start, stop, step) STEP size se define hota hai aur stop value ko chhod deta hai, bilkul Python range() ki tarah. np.linspace(start, stop, num) us NUMBER of points se define hota hai jitne tum chahte ho aur by default endpoint ko include karta hai. Jab step pata ho to arange use karo; jab pata ho kitne evenly spaced points chahiye to linspace.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Array Attributes',
    level: 'beginner',
    description: 'Array ke shape, ndim, dtype, size aur reshape ko samajhna.',
    concepts: [
      {
        title: 'Shape, Dtype, Size & Reshape',
        difficulty: 'easy',
        tags: ['attributes', 'shape', 'dtype', 'reshape'],
        explanation: {
          english:
            'Every ndarray carries metadata you can inspect. .shape is a tuple of dimensions (rows, cols, ...). .ndim is the number of dimensions (1 for a vector, 2 for a matrix). .size is the total count of elements. .dtype is the data type of the elements (int64, float64, bool, etc.) — all elements share ONE dtype. .reshape(new_shape) returns a new view with the same data arranged in a different shape, as long as the total size stays the same. You can pass -1 for one dimension to let NumPy compute it.',
          hinglish:
            'Har ndarray apne saath metadata rakhta hai jise tum inspect kar sakte ho. .shape dimensions ka tuple hai (rows, cols, ...). .ndim dimensions ki ginti hai (vector ke liye 1, matrix ke liye 2). .size total elements ki ginti hai. .dtype elements ka data type hai (int64, float64, bool, etc.) — saare elements ek hi dtype share karte hain. .reshape(new_shape) same data ko alag shape mein arrange karke ek naya view deta hai, jab tak total size same rahe. Ek dimension ke liye -1 pass kar sakte ho taaki NumPy use khud calculate kar le.',
        },
        dailyLifeExample:
          'Ek chocolate bar socho jisme 12 squares hain. Tum use 2x6 ke do row, ya 3x4, ya 4x3 mein tod sakte ho — squares (size) wahi 12 rehte hain, bas shape badalti hai. reshape exactly yahi karta hai.',
        codeExample:
          'import numpy as np\n\nmatrix = np.array([[1, 2, 3],\n                   [4, 5, 6]])\n\nprint(matrix.shape)   # (2, 3)  -> 2 rows, 3 cols\nprint(matrix.ndim)    # 2       -> two dimensions\nprint(matrix.size)    # 6       -> total elements\nprint(matrix.dtype)   # int64   -> element type\n\n# Reshape 6 elements into a 3x2 grid\nreshaped = matrix.reshape(3, 2)\nprint(reshaped)\n# [[1 2]\n#  [3 4]\n#  [5 6]]\n\n# Let NumPy infer one dimension with -1\nflat = matrix.reshape(-1)   # [1 2 3 4 5 6]\nprint(flat)',
        keyPoints: [
          '.shape -> tuple of dimension sizes, e.g. (2, 3)',
          '.ndim -> number of dimensions (1D, 2D, 3D...)',
          '.size -> total number of elements',
          '.dtype -> single element type shared by all elements',
          '.reshape() keeps total size constant; -1 lets NumPy infer a dimension',
        ],
        quiz: [
          {
            question: 'For np.array([[1,2,3],[4,5,6]]), what is .shape?',
            options: ['(6,)', '(3, 2)', '(2, 3)', '(2, 3, 1)'],
            correctIndex: 2,
          },
          {
            question: 'What does reshape(-1) do?',
            options: [
              'Reverses the array',
              'Flattens the array to 1D, inferring the size',
              'Deletes the last element',
              'Raises an error',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What does the -1 mean inside reshape()?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Passing -1 for one dimension tells NumPy to automatically compute that dimension so the total number of elements stays the same. For example, an array of size 12 reshaped to (3, -1) becomes (3, 4). You can use -1 for only one dimension at a time, since NumPy needs the others to solve for it.',
              hinglish:
                'reshape mein ek dimension ke liye -1 dena NumPy ko bolta hai ki wo us dimension ko automatically calculate kar le taaki total elements same rahein. Jaise size 12 ka array (3, -1) mein reshape karne se (3, 4) ban jaata hai. -1 ek baar mein sirf ek dimension ke liye use kar sakte ho, kyunki NumPy ko baaki dimensions chahiye usse solve karne ke liye.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Indexing & Slicing',
    level: 'intermediate',
    description: '1D/2D indexing, slicing, boolean masking aur fancy indexing.',
    concepts: [
      {
        title: 'Indexing, Slicing & Boolean Masks',
        difficulty: 'medium',
        tags: ['indexing', 'slicing', 'boolean', 'fancy'],
        explanation: {
          english:
            'Indexing works like lists but extends to multiple dimensions. For 2D arrays use arr[row, col] (a single bracket with a comma) instead of arr[row][col]. Slicing uses start:stop:step per dimension, and slices are VIEWS into the original data (changing the slice changes the original). Boolean masking lets you filter: arr[arr > 5] returns all elements passing a condition. Fancy indexing uses a list/array of indices, e.g. arr[[0, 2, 4]], to grab arbitrary positions at once.',
          hinglish:
            'Indexing lists ki tarah kaam karta hai par multiple dimensions tak extend hota hai. 2D arrays ke liye arr[row][col] ki jagah arr[row, col] (ek hi bracket mein comma) use karo. Slicing har dimension pe start:stop:step use karta hai, aur slices original data ke VIEWS hote hain (slice badlo to original bhi badlega). Boolean masking se filter karte hain: arr[arr > 5] condition pass karne wale saare elements deta hai. Fancy indexing indices ki list/array use karta hai, jaise arr[[0, 2, 4]], taaki arbitrary positions ek saath pakad sako.',
        },
        dailyLifeExample:
          'Class ki marksheet socho. arr[arr > 33] matlab "sirf pass students dikhao" (boolean mask). Fancy indexing arr[[0, 5, 9]] matlab "roll number 1, 6 aur 10 ki marks chahiye" — sidha woh teen.',
        codeExample:
          'import numpy as np\n\narr = np.array([10, 20, 30, 40, 50, 60])\n\n# Basic indexing & slicing\nprint(arr[0])      # 10\nprint(arr[-1])     # 60\nprint(arr[1:4])    # [20 30 40]\nprint(arr[::2])    # [10 30 50] (every 2nd)\n\n# 2D indexing\ngrid = np.array([[1, 2, 3],\n                 [4, 5, 6]])\nprint(grid[1, 2])  # 6  -> row 1, col 2\nprint(grid[:, 0])  # [1 4] -> first column\n\n# Boolean masking\nprint(arr[arr > 30])   # [40 50 60]\n\n# Fancy indexing\nprint(arr[[0, 2, 4]])  # [10 30 50]',
        keyPoints: [
          '2D access uses arr[row, col], not arr[row][col]',
          'Slices use start:stop:step and are VIEWS, not copies',
          'Boolean masks (arr[arr > x]) filter by condition',
          'Fancy indexing (arr[[0, 2, 4]]) selects arbitrary positions',
          'arr[:, 0] grabs an entire column in a 2D array',
        ],
        quiz: [
          {
            question: 'What does grid[:, 1] return for a 2D array?',
            options: ['The second row', 'The second column', 'Element at (1,1)', 'The whole array'],
            correctIndex: 1,
          },
          {
            question: 'arr[arr % 2 == 0] returns…',
            options: ['Odd elements', 'Even elements', 'The array reversed', 'A boolean array'],
            correctIndex: 1,
          },
          {
            question: 'sub = arr[1:4]; sub[0] = 999; — does this change the original arr too?',
            options: [
              'No, slicing always makes an independent copy',
              'Yes — a basic slice is a VIEW sharing memory with the original, so modifying sub modifies arr as well',
              'Only if you call .copy() first',
              'Only for 2D arrays',
            ],
            correctIndex: 1,
            explanation: 'Basic slicing (arr[1:4]) returns a view, not a copy — it shares the same underlying memory as the original array. Changing an element through the slice changes the original too. Use arr[1:4].copy() if you need an independent array.',
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a NumPy slice and fancy indexing regarding copies vs views?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A basic slice (e.g. arr[1:4]) returns a VIEW that shares memory with the original array, so modifying the slice modifies the original. Fancy indexing (e.g. arr[[0, 2, 4]]) and boolean masking return a COPY — a brand new array, so changes to it do not affect the original. This is a common source of bugs, so use .copy() explicitly when you need independence.',
              hinglish:
                'Ek basic slice (jaise arr[1:4]) ek VIEW deta hai jo original array ke saath memory share karta hai, isliye slice badalne se original bhi badalta hai. Fancy indexing (jaise arr[[0, 2, 4]]) aur boolean masking ek COPY dete hain — ekdum naya array, isliye usme changes original ko affect nahi karte. Ye aksar bugs ki wajah banta hai, isliye jab independence chahiye to explicitly .copy() use karo.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Operations & Vectorization',
    level: 'intermediate',
    description: 'Element-wise ops, vectorization, ufuncs aur axis-wise aggregates.',
    concepts: [
      {
        title: 'Vectorization & Universal Functions',
        difficulty: 'medium',
        tags: ['vectorization', 'ufuncs', 'operations'],
        explanation: {
          english:
            'Arithmetic on arrays is element-wise: arr + 10 adds 10 to every element, arr1 * arr2 multiplies position-by-position. This is vectorization — you write whole-array math with NO explicit loop, and NumPy runs it in fast C. Universal functions (ufuncs) like np.sqrt, np.exp, np.sin, np.log apply element-wise too. Vectorization is not just shorter; it is dramatically faster than a Python for-loop because it avoids per-element Python overhead.',
          hinglish:
            'Arrays pe arithmetic element-wise hota hai: arr + 10 har element mein 10 add karta hai, arr1 * arr2 position-by-position multiply karta hai. Yahi vectorization hai — tum poore array ka math BINA kisi explicit loop ke likhte ho, aur NumPy use fast C mein chalata hai. Universal functions (ufuncs) jaise np.sqrt, np.exp, np.sin, np.log bhi element-wise apply hote hain. Vectorization sirf chhota nahi hai; ye Python for-loop se kaafi tej hai kyunki ye har element pe Python ka overhead bacha leta hai.',
        },
        dailyLifeExample:
          'Sochо har dukandaar ko 18% GST add karna hai 1 lakh prices pe. Loop matlab ek-ek bill banana. Vectorization matlab ek hi stamp "+18%" jo poore catalogue pe ek saath lag jaata hai. Wahi result, dher saara time bacha.',
        codeExample:
          'import numpy as np\n\nprices = np.array([100, 200, 300, 400])\n\n# Element-wise (vectorized) — no loop needed\nwith_gst = prices * 1.18\nprint(with_gst)   # [118. 236. 354. 472.]\n\n# Array + array, position by position\na = np.array([1, 2, 3])\nb = np.array([10, 20, 30])\nprint(a + b)      # [11 22 33]\nprint(a * b)      # [10 40 90]\n\n# Universal functions (ufuncs)\nprint(np.sqrt(np.array([1, 4, 9, 16])))  # [1. 2. 3. 4.]\nprint(np.exp(np.array([0, 1])))          # [1.   2.718...]',
        keyPoints: [
          'Arithmetic on arrays is element-wise (arr + 10, arr1 * arr2)',
          'Vectorization = whole-array math with no explicit Python loop',
          'ufuncs (np.sqrt, np.exp, np.log, np.sin) apply element-wise',
          'Vectorized code is far faster than equivalent for-loops',
          'Operands must be broadcast-compatible in shape',
        ],
        quiz: [
          {
            question: 'For a = np.array([1,2,3]), what is a ** 2?',
            options: ['[1 2 3]', '[1 4 9]', '[2 4 6]', '6'],
            correctIndex: 1,
          },
          {
            question: 'What does "vectorization" mean in NumPy?',
            options: [
              'Converting arrays to vectors graphically',
              'Applying operations to whole arrays at once without explicit loops',
              'Sorting an array',
              'Adding dimensions',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why is vectorized NumPy code faster than an equivalent Python loop?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A Python loop executes the interpreter for every single element — type checks, object boxing, and bytecode dispatch each iteration. A vectorized NumPy operation pushes the entire loop down into pre-compiled C that runs over a contiguous, single-dtype memory block with no per-element Python overhead, and can use CPU-level optimizations like SIMD. The result is typically 10-100x faster, plus the code is shorter and clearer.',
              hinglish:
                'Python loop har ek element ke liye interpreter chalata hai — har iteration mein type checks, object boxing, aur bytecode dispatch. Vectorized NumPy operation poore loop ko pre-compiled C mein neeche push kar deta hai jo ek contiguous, single-dtype memory block pe bina per-element Python overhead ke chalta hai, aur SIMD jaise CPU-level optimizations use kar sakta hai. Result aksar 10-100x tej hota hai, aur code chhota aur saaf bhi.',
            },
          },
        ],
      },
      {
        title: 'Aggregations Along Axes',
        difficulty: 'medium',
        tags: ['aggregation', 'axis', 'sum', 'mean'],
        explanation: {
          english:
            'Aggregate functions reduce many values to a summary: np.sum, np.mean, np.max, np.min, np.std, np.prod. On a 2D array, the axis argument controls the direction of reduction. axis=0 collapses ROWS (giving a result per column — "down the columns"), axis=1 collapses COLUMNS (giving a result per row — "across the rows"). With no axis, it reduces the whole array to one scalar. The rule of thumb: the axis you name is the one that DISAPPEARS.',
          hinglish:
            'Aggregate functions bohot saari values ko ek summary mein reduce karte hain: np.sum, np.mean, np.max, np.min, np.std, np.prod. 2D array pe axis argument reduction ki direction control karta hai. axis=0 ROWS ko collapse karta hai (har column ke liye ek result — "columns ke neeche"), axis=1 COLUMNS ko collapse karta hai (har row ke liye ek result — "rows ke aar-paar"). Bina axis ke ye poore array ko ek scalar mein reduce kar deta hai. Yaad rakhne ka rule: jo axis tum naam loge wahi GAYAB ho jaata hai.',
        },
        dailyLifeExample:
          'Marksheet jisme rows = students aur columns = subjects. axis=1 (columns collapse) matlab har student ka total/average. axis=0 (rows collapse) matlab har subject ka class average. Bina axis matlab poori class ka grand total.',
        codeExample:
          'import numpy as np\n\nscores = np.array([[80, 90, 70],\n                   [60, 50, 100],\n                   [95, 85, 75]])\n\nprint(scores.sum())          # 705  -> grand total\nprint(scores.sum(axis=0))    # [235 225 245] -> per column\nprint(scores.sum(axis=1))    # [240 210 255] -> per row (per student)\n\nprint(scores.mean(axis=1))   # [80. 70. 85.]  average per student\nprint(scores.max(axis=0))    # [95 90 100]    top mark per subject\nprint(scores.std())          # spread of all values',
        keyPoints: [
          'np.sum/mean/max/min/std/prod summarise array values',
          'axis=0 collapses rows -> one result per column',
          'axis=1 collapses columns -> one result per row',
          'No axis -> reduce the entire array to a single scalar',
          'Mnemonic: the named axis is the one that disappears',
        ],
        quiz: [
          {
            question: 'For a 2D array, sum(axis=0) gives you…',
            options: ['One total per row', 'One total per column', 'The grand total', 'The max value'],
            correctIndex: 1,
          },
          {
            question: 'np.mean(arr) with no axis returns…',
            options: ['One value per row', 'One value per column', 'A single scalar mean of all elements', 'An error'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'In a 2D array, explain the difference between axis=0 and axis=1 for aggregations.',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'axis=0 aggregates DOWN the rows, collapsing the row dimension, so you get one value per column. axis=1 aggregates ACROSS the columns, collapsing the column dimension, so you get one value per row. The simplest mental model is that the axis you specify is the dimension that gets reduced away. For a shape (3, 4) array, sum(axis=0) has shape (4,) and sum(axis=1) has shape (3,).',
              hinglish:
                'axis=0 rows ke NEECHE aggregate karta hai, row dimension ko collapse karke, isliye har column ke liye ek value milti hai. axis=1 columns ke AAR-PAAR aggregate karta hai, column dimension ko collapse karke, isliye har row ke liye ek value milti hai. Simplest model ye hai ki jo axis tum specify karoge wahi dimension reduce ho jaata hai. Shape (3, 4) ke array ke liye sum(axis=0) ki shape (4,) hoti hai aur sum(axis=1) ki shape (3,).',
            },
          },
        ],
      },
      {
        title: 'Sorting & Searching: sort, argsort & where',
        difficulty: 'medium',
        tags: ['sorting', 'searching', 'argsort', 'where'],
        explanation: {
          english:
            "np.sort(arr) returns a new SORTED array (the original is untouched) — use arr.sort() instead if you want to sort in place. np.argsort(arr) is different and very useful: it returns the INDICES that would sort the array, not the sorted values themselves — letting you sort one array based on the order of ANOTHER (e.g. sort names by their scores). np.where(condition, if_true, if_false) is a vectorized if/else: it checks the condition element-by-element and picks a value from either side accordingly. np.where(condition) alone (no if_true/if_false) returns the indices where the condition is True.",
          hinglish:
            "np.sort(arr) ek NAYA SORTED array return karta hai (original chhoota nahi) — agar in-place sort karna hai to arr.sort() use karo. np.argsort(arr) alag hai aur bahut useful: ye un INDICES ko return karta hai jo array ko sort kar dein, sorted values nahi — isse tum ek array ko DOOSRE array ke order ke basis pe sort kar sakte ho (jaise names ko unke scores ke hisaab se sort karna). np.where(condition, if_true, if_false) ek vectorized if/else hai: ye condition ko element-by-element check karta hai aur uske hisaab se kisi ek side se value chunta hai. Sirf np.where(condition) (bina if_true/if_false ke) un indices ko return karta hai jaha condition True hai.",
        },
        dailyLifeExample:
          "np.argsort ek exam result jaisa hai — tumhe roll numbers ka order chahiye jo marks ke hisaab se sort ho (rank list), naa ki sirf sorted marks. np.where ek 'agar pass hai to A likho, warna F likho' stamp hai jo har student pe ek saath lag jaata hai.",
        codeExample:
          "import numpy as np\n\narr = np.array([50, 10, 40, 20, 30])\n\nprint(np.sort(arr))       # [10 20 30 40 50] — new array, original untouched\nprint(arr)                # [50 10 40 20 30] — unchanged\n\n# argsort: indices that WOULD sort the array\nidx = np.argsort(arr)\nprint(idx)                # [1 3 4 2 0]\nprint(arr[idx])           # [10 20 30 40 50] — same as np.sort(arr)\n\n# Use argsort to sort ONE array by ANOTHER's order\nnames = np.array(['Riya', 'Aman', 'Neha', 'Raj', 'Priya'])\nprint(names[idx])         # names sorted by their matching score in arr\n\n# where: vectorized if/else\nscores = np.array([85, 40, 92, 55, 30])\ngrades = np.where(scores >= 50, 'Pass', 'Fail')\nprint(grades)             # ['Pass' 'Fail' 'Pass' 'Pass' 'Fail']\n\n# where(condition) alone: indices where True\nprint(np.where(scores >= 50))  # (array([0, 2, 3]),)",
        keyPoints: [
          'np.sort(arr): returns a new sorted array; arr.sort(): sorts in place',
          'np.argsort(arr): returns the INDICES that would sort the array, not the values',
          "argsort lets you sort one array by another array's order (e.g. names by scores)",
          'np.where(cond, a, b): vectorized if/else, element-by-element',
          'np.where(cond) alone: returns the indices where the condition is True',
        ],
        quiz: [
          {
            question: 'What does np.argsort(arr) return?',
            options: ['The sorted array itself', 'The indices that would put the array in sorted order', 'The maximum value', 'A boolean array'],
            correctIndex: 1,
          },
          {
            question: "Why is argsort useful for sorting names by their matching scores in another array?",
            options: ['It is not useful for that', "You get the sort ORDER (indices) from the scores array, then apply those same indices to the names array — keeping them paired correctly", 'argsort only works on strings', 'You must sort both arrays separately'],
            correctIndex: 1,
          },
          {
            question: 'What does np.where(scores >= 50, "Pass", "Fail") do?',
            options: ['Deletes failing scores', "Creates a new array picking 'Pass' or 'Fail' for each element based on the condition — a vectorized if/else", 'Sorts the scores', 'Only works on the first element'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Broadcasting',
    level: 'intermediate',
    description: 'Broadcasting rules aur examples se shape mismatch handle karna.',
    concepts: [
      {
        title: 'Broadcasting Rules',
        difficulty: 'medium',
        tags: ['broadcasting', 'shapes', 'operations'],
        explanation: {
          english:
            'Broadcasting lets NumPy do arithmetic between arrays of DIFFERENT shapes without copying data. NumPy compares shapes from the RIGHT (trailing dimensions) and two dimensions are compatible when they are equal OR one of them is 1. A size-1 (or missing) dimension is virtually stretched to match the other. The classic example is array + scalar (the scalar broadcasts to every element), or adding a (3,) row vector to each row of a (4, 3) matrix. If dimensions are not equal and neither is 1, NumPy raises a shape-mismatch error.',
          hinglish:
            'Broadcasting NumPy ko ALAG shapes ke arrays ke beech arithmetic karne deta hai bina data copy kiye. NumPy shapes ko DAAYE se (trailing dimensions) compare karta hai aur do dimensions tab compatible hain jab ye barabar hon YA dono mein se ek 1 ho. Size-1 (ya missing) dimension ko virtually stretch karke doosre se match kara diya jaata hai. Classic example hai array + scalar (scalar har element pe broadcast hota hai), ya ek (3,) row vector ko (4, 3) matrix ki har row mein add karna. Agar dimensions barabar nahi aur koi 1 bhi nahi, to NumPy shape-mismatch error deta hai.',
        },
        dailyLifeExample:
          'Restaurant mein har dish ke base price pe same 50 rupaye service charge add karna hai. Tum 50 ko har price ke saamne nahi likhte — ek hi 50 saari dishes pe "broadcast" ho jaata hai. NumPy bilkul yahi karta hai.',
        codeExample:
          'import numpy as np\n\n# Scalar broadcasts to every element\nprices = np.array([100, 200, 300])\nprint(prices + 50)        # [150 250 350]\n\n# (4,3) matrix + (3,) row vector — row added to each row\nmatrix = np.array([[1, 2, 3],\n                   [4, 5, 6],\n                   [7, 8, 9],\n                   [10, 11, 12]])\nrow = np.array([10, 20, 30])\nprint(matrix + row)\n# each row gets [10 20 30] added\n\n# (3,1) column + (1,3) row -> (3,3) outer-style result\ncol = np.array([[1], [2], [3]])     # shape (3,1)\nr   = np.array([10, 20, 30])        # shape (3,)\nprint(col + r)\n# [[11 21 31]\n#  [12 22 32]\n#  [13 23 33]]',
        keyPoints: [
          'Broadcasting does math between different shapes without copying',
          'Shapes are compared from the trailing (right-most) dimension',
          'Dimensions are compatible if equal OR one of them is 1',
          'A size-1 dimension is virtually stretched to fit',
          'Incompatible shapes raise a ValueError (shape mismatch)',
        ],
        quiz: [
          {
            question: 'Two dimensions broadcast together when they are…',
            options: [
              'Always, regardless of size',
              'Equal, or one of them is 1',
              'Both greater than 1',
              'Both equal to 0',
            ],
            correctIndex: 1,
          },
          {
            question: 'A (3,1) array plus a (1,4) array results in shape…',
            options: ['(3,4)', '(1,1)', 'Error', '(4,3)'],
            correctIndex: 0,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the rules of NumPy broadcasting.',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'NumPy aligns the shapes of the two arrays from the trailing (right-most) dimension and works leftward. Missing leading dimensions are treated as 1. Two dimensions are compatible if they are equal or if one of them is 1, in which case the size-1 dimension is virtually stretched (broadcast) to match the other. No data is actually copied. If any pair of dimensions is incompatible (unequal and neither is 1), NumPy raises a ValueError. This is how a scalar can be added to a whole array, or a row vector added to every row of a matrix.',
              hinglish:
                'NumPy dono arrays ki shapes ko trailing (right-most) dimension se align karta hai aur baaye taraf badhta hai. Missing leading dimensions ko 1 maana jaata hai. Do dimensions compatible hain agar barabar hon ya ek 1 ho, us case mein size-1 dimension ko virtually stretch (broadcast) karke doosre se match karaya jaata hai. Asal mein koi data copy nahi hota. Agar koi dimensions pair incompatible ho (barabar nahi aur koi 1 bhi nahi), to NumPy ValueError deta hai. Isi se ek scalar poore array mein add ho jaata hai, ya ek row vector matrix ki har row mein.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Linear Algebra & Random',
    level: 'advanced',
    description: 'Dot product, matrix multiply @, np.linalg aur np.random.',
    concepts: [
      {
        title: 'Matrix Math & Random Numbers',
        difficulty: 'hard',
        tags: ['linalg', 'matmul', 'random', 'dot'],
        explanation: {
          english:
            'NumPy provides real linear algebra. np.dot(a, b) and the @ operator perform matrix multiplication (rows-times-columns), which is DIFFERENT from element-wise *. For matmul, the inner dimensions must match: (m, n) @ (n, p) -> (m, p). The np.linalg module offers np.linalg.inv (inverse), np.linalg.det (determinant), and np.linalg.solve (solve linear systems Ax=b). For randomness, the modern API uses a generator: rng = np.random.default_rng(seed), then rng.random(), rng.integers(low, high, size), rng.normal(mean, std, size). Seeding makes results reproducible.',
          hinglish:
            'NumPy asli linear algebra deta hai. np.dot(a, b) aur @ operator matrix multiplication karte hain (rows-times-columns), jo element-wise * se ALAG hai. matmul ke liye inner dimensions match karni chahiye: (m, n) @ (n, p) -> (m, p). np.linalg module deta hai np.linalg.inv (inverse), np.linalg.det (determinant), aur np.linalg.solve (linear systems Ax=b solve karna). Randomness ke liye modern API ek generator use karta hai: rng = np.random.default_rng(seed), phir rng.random(), rng.integers(low, high, size), rng.normal(mean, std, size). Seed dene se results reproducible ho jaate hain.',
        },
        dailyLifeExample:
          'Matrix multiply jaise do dukaano ka hisaab jodna — har item ki quantity ko uske rate se cross-multiply karke total banta hai. np.random jaise ludo ka pasa — par seed laga do to wahi "random" rolls dobara aate hain, testing ke liye perfect.',
        codeExample:
          'import numpy as np\n\nA = np.array([[1, 2],\n              [3, 4]])\nB = np.array([[5, 6],\n              [7, 8]])\n\n# Matrix multiply (NOT element-wise)\nprint(A @ B)          # [[19 22]\n                      #  [43 50]]\nprint(np.dot(A, B))   # same result\nprint(A * B)          # element-wise: [[ 5 12] [21 32]]\n\n# Linear algebra helpers\nprint(np.linalg.det(A))   # -2.0  (determinant)\nprint(np.linalg.inv(A))   # inverse matrix\n\n# Solve A x = b\nb = np.array([5, 11])\nprint(np.linalg.solve(A, b))   # [1. 2.]\n\n# Reproducible random numbers\nrng = np.random.default_rng(42)\nprint(rng.integers(1, 7, size=5))   # 5 dice rolls\nprint(rng.normal(0, 1, size=3))     # normal distribution',
        keyPoints: [
          '@ and np.dot do matrix multiplication; * is element-wise',
          'matmul needs matching inner dims: (m,n) @ (n,p) -> (m,p)',
          'np.linalg.inv / det / solve handle inverses, determinants, systems',
          'Modern randomness: rng = np.random.default_rng(seed)',
          'Seeding the generator makes random results reproducible',
        ],
        quiz: [
          {
            question: 'What does the @ operator do between two 2D arrays?',
            options: ['Element-wise multiply', 'Matrix multiplication', 'Concatenation', 'Comparison'],
            correctIndex: 1,
          },
          {
            question: 'Why seed np.random (e.g. default_rng(42))?',
            options: [
              'To make numbers truly random',
              'To make random results reproducible',
              'To speed up generation',
              'It is required syntax',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between A * B and A @ B in NumPy?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A * B is element-wise multiplication: each element is multiplied by the element in the same position, and the shapes must match (or broadcast). A @ B (equivalently np.dot for 2D) is matrix multiplication following the rows-times-columns rule, where the number of columns of A must equal the number of rows of B, and the result has shape (rows of A, cols of B). They give completely different results, so picking the wrong one is a common bug.',
              hinglish:
                'A * B element-wise multiplication hai: har element ko same position ke element se multiply kiya jaata hai, aur shapes match (ya broadcast) honi chahiye. A @ B (2D ke liye np.dot ke barabar) matrix multiplication hai jo rows-times-columns rule follow karta hai, jahan A ke columns ki ginti B ki rows ki ginti ke barabar honi chahiye, aur result ki shape (A ki rows, B ke cols) hoti hai. Ye bilkul alag results dete hain, isliye galat choose karna ek common bug hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Reshaping & Stacking',
    level: 'advanced',
    description: 'reshape, flatten, concatenate, vstack/hstack aur transpose.',
    concepts: [
      {
        title: 'Reshaping, Flattening & Stacking',
        difficulty: 'hard',
        tags: ['reshape', 'flatten', 'stack', 'transpose', 'concatenate'],
        explanation: {
          english:
            'NumPy gives many ways to rearrange data. .reshape(shape) changes dimensions while keeping total size. .flatten() and .ravel() collapse any array to 1D (flatten returns a copy, ravel usually returns a view). .T (or np.transpose) swaps axes — rows become columns. To combine arrays: np.concatenate joins along an existing axis (you pick the axis), np.vstack stacks vertically (row-wise, on top of each other), and np.hstack stacks horizontally (column-wise, side by side). For stacking, the non-joining dimensions must match.',
          hinglish:
            'NumPy data ko rearrange karne ke kai tareeke deta hai. .reshape(shape) total size same rakhte hue dimensions badalta hai. .flatten() aur .ravel() kisi bhi array ko 1D mein collapse karte hain (flatten copy deta hai, ravel aksar view). .T (ya np.transpose) axes swap karta hai — rows columns ban jaate hain. Arrays jodne ke liye: np.concatenate ek existing axis ke along jodta hai (axis tum choose karte ho), np.vstack vertically stack karta hai (row-wise, ek ke upar ek), aur np.hstack horizontally stack karta hai (column-wise, side by side). Stacking ke liye non-joining dimensions match karni chahiye.',
        },
        dailyLifeExample:
          'vstack jaise do alag-alag class ki attendance sheets ek ke neeche ek chipka dena (zyada rows). hstack jaise ek hi students ki list mein ek nayi subject column add karna (zyada columns). transpose jaise marksheet ko ghuma dena taaki rows aur columns aapas mein badal jaayein.',
        codeExample:
          'import numpy as np\n\na = np.array([[1, 2, 3],\n              [4, 5, 6]])\n\n# Reshape & flatten\nprint(a.reshape(3, 2))   # [[1 2][3 4][5 6]]\nprint(a.flatten())       # [1 2 3 4 5 6]\nprint(a.T)               # transpose -> [[1 4][2 5][3 6]]\n\n# Stacking\nx = np.array([1, 2, 3])\ny = np.array([4, 5, 6])\nprint(np.vstack((x, y)))  # [[1 2 3]\n                          #  [4 5 6]]\nprint(np.hstack((x, y)))  # [1 2 3 4 5 6]\n\n# Concatenate along a chosen axis\ng1 = np.array([[1, 2], [3, 4]])\ng2 = np.array([[5, 6], [7, 8]])\nprint(np.concatenate((g1, g2), axis=0))  # stack rows\nprint(np.concatenate((g1, g2), axis=1))  # stack cols',
        keyPoints: [
          '.reshape changes shape; .flatten()/.ravel() collapse to 1D',
          '.T (transpose) swaps rows and columns',
          'np.vstack stacks vertically (more rows)',
          'np.hstack stacks horizontally (more columns)',
          'np.concatenate joins along an explicit axis you choose',
        ],
        quiz: [
          {
            question: 'np.vstack stacks arrays…',
            options: ['Side by side (more columns)', 'On top of each other (more rows)', 'Into a 1D array', 'Diagonally'],
            correctIndex: 1,
          },
          {
            question: 'What does a.T do?',
            options: ['Flattens the array', 'Transposes it (swaps rows and columns)', 'Sorts it', 'Sums it'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between np.vstack, np.hstack, and np.concatenate?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'np.vstack stacks arrays vertically, i.e. along axis 0, adding more rows (so column counts must match). np.hstack stacks horizontally, along axis 1 for 2D arrays, adding more columns (so row counts must match). np.concatenate is the general function — you explicitly pass the axis to join along, and vstack/hstack are essentially convenience wrappers over it. flatten/ravel collapse to 1D, while these combine multiple arrays.',
              hinglish:
                'np.vstack arrays ko vertically stack karta hai, yaani axis 0 ke along, zyada rows add karte hue (isliye column counts match honi chahiye). np.hstack horizontally stack karta hai, 2D arrays ke liye axis 1 ke along, zyada columns add karte hue (isliye row counts match honi chahiye). np.concatenate general function hai — tum explicitly axis pass karte ho jiske along jodna hai, aur vstack/hstack basically uske upar convenience wrappers hain. flatten/ravel 1D mein collapse karte hain, jabki ye multiple arrays ko combine karte hain.',
            },
          },
        ],
      },
      {
        title: 'Saving & Loading Arrays',
        difficulty: 'easy',
        tags: ['io', 'save', 'load'],
        explanation: {
          english:
            "You don't want to recompute a large array every time your program runs. np.save('file.npy', arr) writes an array to disk in NumPy's own fast binary format, and np.load('file.npy') reads it back EXACTLY as it was (same shape, dtype — no parsing needed, unlike text). For sharing data with other tools (Excel, other languages), use np.savetxt('file.csv', arr, delimiter=',') and np.loadtxt('file.csv', delimiter=',') for a plain-text CSV instead — slower and larger, but universally readable.",
          hinglish:
            "Tum nahi chahte ki har baar program chalne pe ek bada array dobara compute ho. np.save('file.npy', arr) ek array ko disk pe NumPy ke apne fast binary format mein likhta hai, aur np.load('file.npy') use EXACTLY wapas padhta hai jaisa tha (same shape, dtype — koi parsing nahi chahiye, text ke ulat). Doosre tools (Excel, doosri languages) ke saath data share karne ke liye, plain-text CSV ke liye np.savetxt('file.csv', arr, delimiter=',') aur np.loadtxt('file.csv', delimiter=',') use karo — slow aur bada, par universally readable.",
        },
        dailyLifeExample:
          "np.save ek photo ko RAW format mein save karna hai — poori quality, fast, par sirf compatible software hi khol sakta hai. np.savetxt ek photo ko printed copy banana hai — sab dekh sakte hain (universal), par thodi slow aur bhaari.",
        codeExample:
          "import numpy as np\n\narr = np.array([[1, 2, 3], [4, 5, 6]])\n\n# Fast, NumPy-native binary format — preserves shape & dtype exactly\nnp.save('my_array.npy', arr)\nloaded = np.load('my_array.npy')\nprint(loaded)          # exactly the same array back\nprint(loaded.shape)    # (2, 3) — shape preserved automatically\n\n# Plain-text CSV — slower, bigger, but readable by Excel/other tools\nnp.savetxt('my_array.csv', arr, delimiter=',')\nloaded_csv = np.loadtxt('my_array.csv', delimiter=',')\nprint(loaded_csv)",
        keyPoints: [
          "np.save/np.load: fast, NumPy-native .npy binary format, preserves shape/dtype exactly",
          "np.savetxt/np.loadtxt: plain-text CSV, slower and larger, but universally readable",
          "Use .npy for saving intermediate results within your own Python workflow",
          "Use CSV/savetxt when sharing data with Excel, other languages, or non-NumPy tools",
          "Loading a .npy file never requires re-parsing text — it's a direct, fast read",
        ],
        quiz: [
          {
            question: 'What is the main advantage of np.save/np.load over np.savetxt/np.loadtxt?',
            options: ['They only work on Windows', "They are faster and preserve the array's exact shape/dtype, without needing to parse text", 'They only save 1D arrays', 'There is no real advantage'],
            correctIndex: 1,
          },
          {
            question: 'When would you prefer np.savetxt over np.save?',
            options: ['Never, savetxt is always worse', 'When you need the data readable by Excel or another programming language, not just NumPy', 'When the array is very large', 'savetxt is faster so always prefer it'],
            correctIndex: 1,
          },
          {
            question: 'What file format does np.save() write to?',
            options: ['.csv', '.npy (NumPy\'s native binary format)', '.txt', '.json'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between a NumPy view and a copy, and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A view is a new array object that shares the SAME underlying data buffer as the original — basic slicing (e.g. arr[1:4]) and reshape typically return views, so modifying the view modifies the original. A copy is an independent array with its own data — fancy indexing, boolean masking, and an explicit .copy() return copies, so changes do not propagate. It matters because accidentally mutating a view can silently corrupt the source array; when you need independence, call .copy() explicitly.',
      hinglish:
        'View ek naya array object hai jo original ke SAME underlying data buffer ko share karta hai — basic slicing (jaise arr[1:4]) aur reshape aksar views dete hain, isliye view badalne se original bhi badalta hai. Copy ek independent array hai apne data ke saath — fancy indexing, boolean masking, aur explicit .copy() copies dete hain, isliye changes propagate nahi karte. Ye isliye important hai kyunki galti se view mutate karna chup-chaap source array ko corrupt kar sakta hai; jab independence chahiye to explicitly .copy() call karo.',
    },
  },
  {
    question: 'Why does NumPy require all elements of an array to have the same dtype?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A single, homogeneous dtype is what makes arrays fast and compact. Because every element is the same fixed-size type, NumPy can store them in one contiguous block of memory with predictable strides, and compiled C/SIMD routines can march through that block without per-element type checks. Mixed types would force boxing like Python lists, killing both speed and memory efficiency. If you mix types in np.array, NumPy up-casts to a common dtype (e.g. ints and floats become float64).',
      hinglish:
        'Ek single, homogeneous dtype hi arrays ko fast aur compact banata hai. Kyunki har element ek hi fixed-size type ka hai, NumPy unhe memory ke ek contiguous block mein predictable strides ke saath store kar sakta hai, aur compiled C/SIMD routines us block mein bina per-element type checks ke daud sakti hain. Mixed types Python lists ki tarah boxing force kar deti, jo speed aur memory dono maar deti. Agar tum np.array mein types mix karte ho, NumPy ek common dtype mein up-cast kar deta hai (jaise ints aur floats float64 ban jaate hain).',
    },
  },

  // ─── Core NumPy ─────────────────────────────────────────────
  {
    question: 'Why is a NumPy array faster than a Python list?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A Python list stores POINTERS to boxed objects scattered in memory, and every operation goes through the interpreter with per-element type checks. A NumPy array stores raw values of one dtype in a CONTIGUOUS block, so operations run as compiled C loops using SIMD instructions with no interpreter overhead and excellent cache locality. That typically gives a 10-100x speedup, and it also uses far less memory since there is no per-element object header.',
      hinglish:
        'Ek Python list memory mein bikhre boxed objects ke POINTERS rakhti hai, aur har operation per-element type checks ke saath interpreter se guzarta hai. Ek NumPy array ek dtype ki raw values ek CONTIGUOUS block mein rakhta hai, isliye operations compiled C loops ki tarah SIMD instructions se chalte hain bina interpreter bojh ke aur behtareen cache locality ke saath. Ye typically 10-100 guna tez karta hai, aur bahut kam memory bhi leta hai kyunki per-element object header nahi hota.',
    },
  },
  {
    question: 'What is vectorisation and why should you avoid Python loops in NumPy?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Vectorisation means expressing an operation over a whole array at once — `a + b` instead of looping element by element — so the work happens inside compiled C rather than the Python interpreter. A Python loop over a million elements pays interpreter overhead a million times; the vectorised form pays it once. The practical rule is that if you are writing a `for` loop over array indices, there is almost always a NumPy expression that is both shorter and dramatically faster.',
      hinglish:
        'Vectorisation ka matlab hai ek poore array pe ek saath ek operation likhna — element dar element loop karne ke bajaye `a + b` — taaki kaam Python interpreter ke bajaye compiled C ke andar ho. Das lakh elements pe ek Python loop das lakh baar interpreter bojh bharta hai; vectorised form ek baar. Practical rule ye hai ki agar tum array indices pe ek `for` loop likh rahe ho, almost hamesha ek NumPy expression hoti hai jo chhoti bhi hai aur dramatically tez bhi.',
    },
  },
  {
    question: 'What is broadcasting in NumPy?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Broadcasting lets arrays of different shapes combine without copying data. NumPy compares shapes from the TRAILING dimension: they are compatible if equal or if one is 1, and a size-1 dimension is stretched virtually. So a (3,4) array plus a (4,) array works, adding the row to every row. It saves memory because no expanded copy is created. The classic error, "operands could not be broadcast together", means the trailing dimensions did not line up.',
      hinglish:
        'Broadcasting alag shapes ke arrays ko bina data copy kiye jodne deta hai. NumPy shapes ko AAKHRI dimension se compare karta hai: wo compatible hain agar barabar hon ya ek 1 ho, aur ek size-1 dimension virtually khichta hai. Isliye ek (3,4) array plus ek (4,) array chalta hai, row ko har row mein jodte hue. Ye memory bachata hai kyunki koi phaili copy nahi banti. Classic error, "operands could not be broadcast together", batata hai ki aakhri dimensions match nahi hui.',
    },
  },
  {
    question: 'What is the difference between a view and a copy?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Basic SLICING returns a VIEW — a new array object sharing the same underlying buffer — so modifying the slice modifies the original, which surprises people constantly. FANCY indexing (an integer or boolean array) returns a COPY. Check with `arr.base`, which is `None` for a copy. Views are memory-efficient and are why slicing a huge array is free, but if you need independence you must call `.copy()` explicitly.',
      hinglish:
        'Basic SLICING ek VIEW lautaata hai — ek naya array object jo wahi underlying buffer share karta hai — isliye slice badalna original badal deta hai, jo logon ko lagatar chaunkata hai. FANCY indexing (ek integer ya boolean array) ek COPY lautaata hai. `arr.base` se check karo, jo ek copy ke liye `None` hota hai. Views memory-efficient hain aur isiliye ek bade array ko slice karna muft hai, par agar tumhe swatantrata chahiye to `.copy()` explicitly call karna padega.',
    },
  },
  {
    question: 'What is fancy indexing and how does it differ from slicing?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Fancy indexing uses an array of INDICES or a BOOLEAN mask to select arbitrary elements — `arr[[0, 3, 7]]` or `arr[arr > 5]`. Unlike slicing it always returns a COPY, because the selected elements are not a regular strided pattern that a view could describe. Boolean masking is the idiomatic way to filter, and it composes with `&`, `|`, and `~` — note you must use those operators with parentheses, since `and` and `or` do not work elementwise.',
      hinglish:
        'Fancy indexing INDICES ka ek array ya ek BOOLEAN mask use karke koi bhi elements chunta hai — `arr[[0, 3, 7]]` ya `arr[arr > 5]`. Slicing ke ulat ye hamesha ek COPY lautaata hai, kyunki chune gaye elements ek niyamit strided pattern nahi hain jise ek view bata sake. Boolean masking filter karne ka idiomatic tareeka hai, aur ye `&`, `|`, aur `~` ke saath judta hai — note karo ki unhe parentheses ke saath use karna padta hai, kyunki `and` aur `or` elementwise kaam nahi karte.',
    },
  },
  {
    question: 'What does the axis parameter mean?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`axis` names the dimension that gets COLLAPSED. For a 2D array, `axis=0` collapses rows so you get one value per COLUMN, and `axis=1` collapses columns giving one per ROW. The confusion comes from thinking of it as "which one to operate along" rather than "which one disappears". Checking the output SHAPE settles it immediately: a (3,4) array summed with `axis=0` gives shape (4,). `keepdims=True` preserves the dimension for broadcasting.',
      hinglish:
        '`axis` us dimension ko naam deta hai jo SAMET diya jaata hai. Ek 2D array ke liye, `axis=0` rows samet-ta hai isliye tumhe per COLUMN ek value milti hai, aur `axis=1` columns samet-ta hai per ROW ek dete hue. Uljhan ise "kis ke saath operate karna hai" sochne se aati hai, "kaunsa gayab hota hai" ke bajaye. Output SHAPE check karna ise turant sulha deta hai: `axis=0` se sum kiya ek (3,4) array shape (4,) deta hai. `keepdims=True` broadcasting ke liye dimension bacha leta hai.',
    },
  },
  {
    question: 'What is the difference between reshape, ravel, and flatten?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`reshape` changes the shape without changing the data and returns a VIEW when possible. `ravel` flattens to 1D and also returns a view when it can. `flatten` always returns a COPY, so it is safe but costs memory. Passing `-1` to reshape lets NumPy infer that dimension — `reshape(-1, 3)` means "three columns, work out the rows". Since reshape may return a view, modifying the result can modify the original, which is a common source of surprise.',
      hinglish:
        '`reshape` data badle bina shape badalta hai aur jab ho sake ek VIEW lautaata hai. `ravel` 1D mein flatten karta hai aur jab ho sake ek view bhi lautaata hai. `flatten` hamesha ek COPY lautaata hai, isliye ye surakshit hai par memory cost karta hai. reshape mein `-1` dena NumPy ko wo dimension nikalne deta hai — `reshape(-1, 3)` matlab "teen columns, rows khud nikaalo". Kyunki reshape ek view lauta sakta hai, nateeja badalna original badal sakta hai, jo hairaani ka ek common source hai.',
    },
  },
  {
    question: 'What are dtypes and why do they matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A dtype fixes the type and byte width of every element — `int32`, `float64`, `bool`, and so on. It matters for three reasons. MEMORY: `float32` halves the footprint of `float64`, which is decisive on large arrays. OVERFLOW: `int8` silently wraps past 127, producing wrong numbers with no error. PRECISION: `float32` has about seven significant digits, so accumulating a million values loses accuracy. Always check `arr.dtype` when results look wrong.',
      hinglish:
        'Ek dtype har element ka type aur byte chaudai tay karta hai — `int32`, `float64`, `bool`, waghairah. Ye teen wajahon se matter karta hai. MEMORY: `float32` `float64` ka aadha ghera leta hai, jo bade arrays pe nirnaayak hai. OVERFLOW: `int8` 127 ke aage chupke se ghoom jaata hai, bina error ke galat numbers banate hue. PRECISION: `float32` mein lagbhag saat significant digits hain, isliye das lakh values jodna sahihi khota hai. Jab nateeje galat lagein to hamesha `arr.dtype` check karo.',
    },
  },
  {
    question: 'What is a universal function (ufunc)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A ufunc operates ELEMENTWISE on arrays in compiled C, supports broadcasting, and includes `np.add`, `np.sqrt`, `np.exp`, and comparison operators. They also accept an `out` parameter to write into an existing array, avoiding an allocation, and provide `.reduce`, `.accumulate`, and `.outer` methods. Ufuncs are the reason NumPy expressions are fast — and `np.vectorize`, despite its name, is only a convenience wrapper around a Python loop, not a genuine speedup.',
      hinglish:
        'Ek ufunc arrays pe compiled C mein ELEMENTWISE kaam karta hai, broadcasting support karta hai, aur `np.add`, `np.sqrt`, `np.exp`, aur comparison operators shaamil hain. Wo ek maujood array mein likhne ke liye ek `out` parameter bhi lete hain, ek allocation bachate hue, aur `.reduce`, `.accumulate`, aur `.outer` methods dete hain. Ufuncs hi wajah hain ki NumPy expressions tez hain — aur `np.vectorize`, apne naam ke bawajood, sirf ek Python loop ke around ek suvidha wrapper hai, ek asli tezi nahi.',
    },
  },
  {
    question: 'How do you handle NaN values in NumPy?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'NaN propagates through arithmetic, so `arr.mean()` on data containing NaN returns NaN. Detect it with `np.isnan()` — never with `== np.nan`, because NaN is not equal to itself, which is the single most common NaN mistake. Use the `nan`-prefixed aggregates such as `np.nanmean` and `np.nansum` to skip them, or filter with a boolean mask. Note NaN only exists for float dtypes; integer arrays cannot hold it.',
      hinglish:
        'NaN arithmetic se guzar jaata hai, isliye NaN wale data pe `arr.mean()` NaN lautaata hai. Ise `np.isnan()` se pakado — kabhi `== np.nan` se nahi, kyunki NaN khud ke barabar nahi hai, jo sabse common NaN galti hai. Unhe skip karne ke liye `nan`-wale aggregates jaise `np.nanmean` aur `np.nansum` use karo, ya ek boolean mask se chhaano. Note karo NaN sirf float dtypes ke liye hai; integer arrays ise rakh nahi sakte.',
    },
  },
  {
    question: 'What is the difference between np.dot, np.matmul, and the @ operator?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'For 2D arrays all three do matrix multiplication and are equivalent. They diverge for higher dimensions: `np.dot` computes a sum product over the last axis of the first and second-to-last of the second, which for 3D gives a confusing outer-product-like result, while `matmul` and `@` treat extra leading dimensions as a BATCH of matrices, which is almost always what you want. `@` is the readable modern form. For 1D inputs all three give the inner product.',
      hinglish:
        '2D arrays ke liye teeno matrix multiplication karte hain aur barabar hain. Wo zyada dimensions pe alag ho jaate hain: `np.dot` pehle ke aakhri axis aur doosre ke second-to-last pe sum product karta hai, jo 3D ke liye ek uljhaane wala outer-product-jaisa nateeja deta hai, jabki `matmul` aur `@` extra shuruaati dimensions ko matrices ka ek BATCH maante hain, jo almost hamesha wahi hai jo tum chahte ho. `@` padhne layak modern form hai. 1D inputs ke liye teeno inner product dete hain.',
    },
  },
  {
    question: 'How do you generate reproducible random numbers in NumPy?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use the modern Generator API: `rng = np.random.default_rng(42)`, then `rng.normal()`, `rng.integers()`, and so on. The legacy `np.random.seed()` sets GLOBAL state, so any library you call can consume or reset it, which makes results non-reproducible in ways that are hard to trace. A Generator instance is local, explicit, statistically better, and can be passed around — which also lets independent parts of a program have independent streams.',
      hinglish:
        'Modern Generator API use karo: `rng = np.random.default_rng(42)`, phir `rng.normal()`, `rng.integers()`, waghairah. Purana `np.random.seed()` GLOBAL state set karta hai, isliye tumhari bulaayi koi bhi library use kha ya reset kar sakti hai, jo nateejon ko aise tareeke se non-reproducible banata hai jinhe trace karna mushkil hai. Ek Generator instance local, explicit, statistically behtar hai, aur ghumaaya ja sakta hai — jisse program ke swatantra hisson ki swatantra streams bhi ho sakti hain.',
    },
  },
  {
    question: 'What is the difference between np.array and np.asarray?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`np.array` COPIES by default, while `np.asarray` returns the input unchanged if it is already an ndarray of the right dtype. So `asarray` is the right choice at the start of a function that accepts array-like input, since it avoids a pointless copy of a possibly huge array. Use `np.array` when you specifically want an independent copy, or pass `copy=False` to `array` for the same effect as `asarray`.',
      hinglish:
        '`np.array` default se COPY karta hai, jabki `np.asarray` input ko waise hi lautaata hai agar wo pehle se sahi dtype ka ek ndarray ho. Isliye `asarray` ek aise function ki shuruaat ke liye sahi choice hai jo array-jaisa input leta hai, kyunki ye ek shayad bade array ki bekaar copy bachata hai. `np.array` tab use karo jab tumhe khaas taur pe ek swatantra copy chahiye, ya `asarray` jaisa asar paane ke liye `array` mein `copy=False` do.',
    },
  },
  {
    question: 'What are strides in NumPy?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Strides are the number of BYTES to step in each dimension to reach the next element. They are what make views possible without copying: transposing an array simply swaps the strides while pointing at the same buffer. That also explains why a transposed array may be non-contiguous and therefore slower to iterate. `np.lib.stride_tricks.sliding_window_view` uses strides to create overlapping windows with no data duplication at all.',
      hinglish:
        'Strides har dimension mein agle element tak pahunchne ke liye BYTES ki sankhya hain. Yahi views ko bina copy ke sambhav banate hain: ek array transpose karna bas strides badal deta hai jabki wahi buffer pe point karta hai. Ye ye bhi samjhaata hai ki ek transposed array non-contiguous ho sakta hai aur isliye iterate karne mein slow. `np.lib.stride_tricks.sliding_window_view` strides se overlapping windows banata hai bina kisi data duplication ke.',
    },
  },
  {
    question: 'What is the difference between C-order and F-order?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'C-order (row-major, NumPy\'s default) stores rows contiguously; F-order (column-major, from Fortran) stores columns contiguously. It matters for PERFORMANCE: iterating along the contiguous axis is far faster because of cache lines, so summing rows of a C-order array beats summing its columns. Some linear-algebra libraries prefer F-order, and passing a C-order array can trigger a hidden copy — which is why the same operation can be unexpectedly slow.',
      hinglish:
        'C-order (row-major, NumPy ka default) rows ko contiguously rakhta hai; F-order (column-major, Fortran se) columns ko. Ye PERFORMANCE ke liye matter karta hai: contiguous axis ke saath iterate karna cache lines ki wajah se bahut tez hai, isliye ek C-order array ki rows sum karna uske columns sum karne se behtar hai. Kuch linear-algebra libraries F-order prefer karti hain, aur ek C-order array dena ek chhupi copy trigger kar sakta hai — isiliye wahi operation anaapekshit roop se slow ho sakta hai.',
    },
  },
  {
    question: 'How do you concatenate and split arrays?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`np.concatenate` joins along an existing axis; `vstack`, `hstack`, and `dstack` are convenience wrappers for axes 0, 1, and 2. `np.stack` creates a NEW axis, which is the difference people miss. Splitting uses `np.split`, `hsplit`, and `vsplit`. The important performance point is that concatenation always ALLOCATES a new array and copies, so building an array by concatenating in a loop is O(n²) — collect into a list and concatenate once instead.',
      hinglish:
        '`np.concatenate` ek maujood axis ke saath jodta hai; `vstack`, `hstack`, aur `dstack` axes 0, 1, aur 2 ke liye suvidha wrappers hain. `np.stack` ek NAYA axis banata hai, jo wo farak hai jo log chhod dete hain. Splitting `np.split`, `hsplit`, aur `vsplit` se hoti hai. Zaroori performance baat ye hai ki concatenation hamesha ek naya array BANATA hai aur copy karta hai, isliye ek loop mein concatenate karke array banana O(n²) hai — uske bajaye ek list mein ikattha karke ek baar concatenate karo.',
    },
  },
  {
    question: 'What does np.where do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'With three arguments it is a vectorised conditional: `np.where(cond, a, b)` picks elementwise from `a` where the condition is true and `b` elsewhere — a replacement for an if-else loop. With ONE argument it returns the INDICES where the condition is true, as a tuple of arrays, one per dimension. That dual behaviour confuses people regularly. For multiple conditions, `np.select` is clearer than nesting `np.where` calls.',
      hinglish:
        'Teen arguments ke saath ye ek vectorised conditional hai: `np.where(cond, a, b)` jahan condition sach hai wahan `a` se aur baaki jagah `b` se elementwise chunta hai — ek if-else loop ka replacement. EK argument ke saath ye wo INDICES lautaata hai jahan condition sach hai, arrays ke ek tuple ki tarah, per dimension ek. Wo dohra behaviour logon ko regularly confuse karta hai. Kai conditions ke liye, `np.select` `np.where` calls ko nest karne se clearer hai.',
    },
  },
  {
    question: 'What is the difference between np.sort and np.argsort?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`np.sort` returns the sorted VALUES; `np.argsort` returns the INDICES that would sort the array. Argsort is what you need to reorder a second array by the first — sorting scores and applying the same order to names. `arr.sort()` sorts in place and returns None, which trips people up. For "top k" you rarely need a full sort: `np.argpartition` is O(n) instead of O(n log n) and gives the k largest without ordering the rest.',
      hinglish:
        '`np.sort` sorted VALUES lautaata hai; `np.argsort` wo INDICES lautaata hai jo array ko sort karte. Argsort tumhe tab chahiye jab ek doosre array ko pehle ke hisaab se dobara order karna ho — scores sort karke wahi order names pe lagana. `arr.sort()` jagah pe sort karta hai aur None lautaata hai, jo logon ko atkata hai. "Top k" ke liye tumhe rarely poora sort chahiye: `np.argpartition` O(n log n) ke bajaye O(n) hai aur baaki ko order kiye bina k sabse bade deta hai.',
    },
  },
  {
    question: 'How do you compute statistics along an axis?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Every aggregate — `mean`, `sum`, `std`, `min`, `max`, `median`, `percentile` — takes an `axis` argument. Omitting it aggregates over the FLATTENED array, which is a common accidental bug when you meant per-row. Two details worth knowing: `np.std` uses `ddof=0` (population) by default while pandas uses `ddof=1` (sample), so the two disagree unless you say so; and `keepdims=True` retains the reduced dimension so the result broadcasts back against the original.',
      hinglish:
        'Har aggregate — `mean`, `sum`, `std`, `min`, `max`, `median`, `percentile` — ek `axis` argument leta hai. Ise chhodna POORE FLATTENED array pe aggregate karta hai, jo ek common galti wala bug hai jab tumhara matlab per-row tha. Do jaanne layak baatein: `np.std` default se `ddof=0` (population) use karta hai jabki pandas `ddof=1` (sample), isliye dono alag jawab dete hain jab tak tum bata na do; aur `keepdims=True` kam hui dimension bacha leta hai taaki nateeja original ke against wapas broadcast ho.',
    },
  },
  {
    question: 'What is np.linspace versus np.arange?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`arange` takes a STEP and excludes the endpoint; `linspace` takes a COUNT and includes it by default. The important reason to prefer `linspace` for floats is that `arange` with a fractional step accumulates floating-point error, so the number of elements can be off by one unpredictably — `np.arange(0, 1, 0.1)` may or may not include a value very close to 1. `linspace` computes positions directly and is therefore exact about the count.',
      hinglish:
        '`arange` ek STEP leta hai aur endpoint chhod deta hai; `linspace` ek COUNT leta hai aur default se use shaamil karta hai. Floats ke liye `linspace` prefer karne ki zaroori wajah ye hai ki ek fractional step wala `arange` floating-point error jodta hai, isliye elements ki sankhya anpredictably ek se hat sakti hai — `np.arange(0, 1, 0.1)` mein 1 ke bahut paas ki value ho bhi sakti hai aur nahi bhi. `linspace` positions seedha compute karta hai aur isliye count ke baare mein sateek hai.',
    },
  },
  {
    question: 'How do you save and load NumPy arrays?',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        '`np.save` and `np.load` use the binary `.npy` format, which preserves dtype and shape exactly and is fast. `np.savez` stores several arrays in one `.npz`, and `savez_compressed` compresses them. `savetxt` writes CSV, which is human-readable but slow and lossy for float precision. Note that `np.load` with `allow_pickle=True` can execute arbitrary code, so never enable it for a file from an untrusted source.',
      hinglish:
        '`np.save` aur `np.load` binary `.npy` format use karte hain, jo dtype aur shape bilkul bachaata hai aur tez hai. `np.savez` kai arrays ko ek `.npz` mein rakhta hai, aur `savez_compressed` unhe compress karta hai. `savetxt` CSV likhta hai, jo insaan padh sakta hai par slow hai aur float precision ke liye lossy. Note karo ki `allow_pickle=True` wala `np.load` koi bhi code chala sakta hai, isliye ise kabhi kisi bharose ke bahar ki file ke liye enable mat karo.',
    },
  },
  {
    question: 'What is memory mapping and when would you use it?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '`np.memmap` maps a file on disk into memory so you can index it like an array while the OS loads only the pages you actually touch. It lets you work with an array larger than RAM, and lets multiple processes share the same data without duplicating it. The trade is that random access hits disk, so it is far slower than an in-memory array for scattered reads. For serious out-of-core work, Dask or Zarr build on this idea more comprehensively.',
      hinglish:
        '`np.memmap` disk ki ek file ko memory mein map karta hai taaki tum use ek array ki tarah index kar sako jabki OS sirf wo pages load karta hai jo tum actually chhoote ho. Ye tumhe RAM se bade array pe kaam karne deta hai, aur kai processes ko wahi data bina duplicate kiye share karne deta hai. Trade ye hai ki random access disk pe jaata hai, isliye bikhre reads ke liye ye ek in-memory array se bahut slow hai. Serious out-of-core kaam ke liye, Dask ya Zarr is idea pe zyada poori tarah bane hain.',
    },
  },
  {
    question: 'How do you reduce the memory footprint of a NumPy array?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Downcast the dtype to the smallest that safely holds your range — `float32` instead of `float64` halves it, and `int16` instead of `int64` cuts it to a quarter. Use views rather than copies where possible. Avoid intermediate arrays by using in-place operations (`arr += 1`) or the `out` parameter of ufuncs. Check actual usage with `arr.nbytes`. The caution is that downcasting risks overflow and precision loss, so verify your value range first.',
      hinglish:
        'dtype ko us sabse chhote pe laao jo tumhari range surakshit roop se rakhe — `float64` ke bajaye `float32` ise aadha karta hai, aur `int64` ke bajaye `int16` ek chauthai. Jahan ho sake copies ke bajaye views use karo. In-place operations (`arr += 1`) ya ufuncs ke `out` parameter se beech ke arrays se bacho. Asli istemaal `arr.nbytes` se check karo. Saavdhaani ye hai ki downcasting mein overflow aur precision khone ka khatra hai, isliye pehle apni value range jaancho.',
    },
  },
  {
    question: 'What is the difference between NumPy and pandas?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'NumPy provides a homogeneous N-dimensional array optimised for numerical computation. Pandas is BUILT ON NumPy and adds labelled axes, heterogeneous columns, an index, and data-manipulation features such as `groupby`, joins, missing-data handling, and time series. Use NumPy for pure numerical and matrix work, and pandas for tabular data where columns have different types and meaning. A pandas DataFrame\'s numeric columns are NumPy arrays underneath.',
      hinglish:
        'NumPy ek homogeneous N-dimensional array deta hai jo numerical computation ke liye optimised hai. Pandas NumPy PE BANA hai aur labelled axes, alag-alag types ke columns, ek index, aur `groupby`, joins, missing-data handling, aur time series jaisi data-manipulation features jodta hai. Pure numerical aur matrix kaam ke liye NumPy use karo, aur tabular data ke liye pandas jahan columns ke alag types aur matlab hon. Ek pandas DataFrame ke numeric columns neeche NumPy arrays hi hain.',
    },
  },
  {
    question: 'What does np.newaxis do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`np.newaxis` (an alias for `None`) inserts a new axis of length 1 at that position, so `arr[:, np.newaxis]` turns a (3,) array into (3,1). Its main use is making broadcasting work: a (3,1) array combined with a (4,) array produces a (3,4) result, which is how you compute an outer product or a pairwise distance matrix without a loop. `np.expand_dims` does the same thing with a more explicit name.',
      hinglish:
        '`np.newaxis` (`None` ka ek alias) us jagah pe length 1 ka ek naya axis daalta hai, isliye `arr[:, np.newaxis]` ek (3,) array ko (3,1) bana deta hai. Iska main use broadcasting ko chalana hai: ek (3,1) array ek (4,) array ke saath ek (3,4) nateeja banata hai, jisse tum bina loop ke ek outer product ya ek pairwise distance matrix compute karte ho. `np.expand_dims` wahi cheez ek zyada explicit naam ke saath karta hai.',
    },
  },
  {
    question: 'Why does comparing floats with == fail in NumPy?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Floating-point numbers cannot represent most decimals exactly, so `0.1 + 0.2 == 0.3` is False and accumulated arithmetic drifts further. Use `np.isclose(a, b)` for elementwise comparison or `np.allclose(a, b)` for a whole array, both of which accept relative and absolute tolerances. This is not a NumPy quirk — it is IEEE 754 behaviour shared by every language — but it bites more often in NumPy because you are comparing whole arrays of computed values.',
      hinglish:
        'Floating-point numbers zyadatar dashamlav ko theek se nahi bata sakte, isliye `0.1 + 0.2 == 0.3` False hai aur jodta arithmetic aur bhatakta hai. Elementwise comparison ke liye `np.isclose(a, b)` ya poore array ke liye `np.allclose(a, b)` use karo, jo dono relative aur absolute tolerances lete hain. Ye NumPy ki ajeeb baat nahi hai — ye IEEE 754 behaviour hai jo har language mein hai — par NumPy mein zyada baar kaatta hai kyunki tum compute hui values ke poore arrays compare karte ho.',
    },
  },
  {
    question: 'What are in-place operations and when are they dangerous?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`arr += 1` modifies the buffer directly, avoiding an allocation, which matters for large arrays. The danger is that if `arr` is a VIEW of another array, you have silently modified the original too. In-place operations also cannot change dtype, so adding a float to an int array raises an error rather than upcasting as `arr = arr + 1.5` would. And they mutate anything else holding a reference, which makes debugging harder.',
      hinglish:
        '`arr += 1` buffer ko seedha badalta hai, ek allocation bachate hue, jo bade arrays ke liye matter karta hai. Khatra ye hai ki agar `arr` doosre array ka ek VIEW hai, tumne chupke se original bhi badal diya. In-place operations dtype bhi nahi badal sakte, isliye ek int array mein ek float jodna error deta hai, `arr = arr + 1.5` ki tarah upcast karne ke bajaye. Aur wo har us cheez ko badal dete hain jo ek reference rakhti hai, jo debugging mushkil banata hai.',
    },
  },
  {
    question: 'How do you find unique values and counts?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`np.unique(arr)` returns sorted unique values, and `return_counts=True` also gives their frequencies. It additionally supports `return_index` for the first occurrence and `return_inverse` for reconstructing the original — which is exactly how you encode categorical labels as integers. For non-negative integers, `np.bincount` is considerably faster than `unique` when you only need counts of every value from 0 upwards.',
      hinglish:
        '`np.unique(arr)` sorted unique values lautaata hai, aur `return_counts=True` unki frequencies bhi deta hai. Ye pehle occurrence ke liye `return_index` aur original dobara banane ke liye `return_inverse` bhi deta hai — jisse tum theek categorical labels ko integers mein encode karte ho. Non-negative integers ke liye, `np.bincount` `unique` se kaafi tez hai jab tumhe sirf 0 se upar ki har value ke counts chahiye.',
    },
  },
  {
    question: 'What is the difference between shallow and deep copying in NumPy?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'For a normal numeric array `arr.copy()` is sufficient — it duplicates the buffer, and the elements are values rather than references, so there is nothing deeper to copy. A deep copy only matters for an OBJECT-dtype array, where the elements are Python objects and `copy()` duplicates the references but not the objects themselves; `copy.deepcopy` is needed there. Object arrays lose all NumPy performance benefits, so they are usually a sign of the wrong data structure.',
      hinglish:
        'Ek normal numeric array ke liye `arr.copy()` kaafi hai — ye buffer duplicate karta hai, aur elements references ke bajaye values hain, isliye aur gehra copy karne ko kuch hai hi nahi. Ek deep copy sirf ek OBJECT-dtype array ke liye matter karti hai, jahan elements Python objects hain aur `copy()` references duplicate karta hai par khud objects nahi; wahan `copy.deepcopy` chahiye. Object arrays saare NumPy performance faayde kho dete hain, isliye wo usually galat data structure ki nishaani hain.',
    },
  },
  {
    question: 'How do you compute a pairwise distance matrix efficiently?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Use broadcasting rather than a nested loop: reshape one array to (n,1,d) and the other to (1,m,d), subtract, square, and sum along the last axis. That is fully vectorised and dramatically faster than looping. The caveat is MEMORY — the intermediate is n×m×d, which for large n exhausts RAM, so for big inputs use `scipy.spatial.distance.cdist`, chunk the computation, or use the expanded `||a||² + ||b||² - 2ab` identity, which avoids the 3D intermediate entirely.',
      hinglish:
        'Ek nested loop ke bajaye broadcasting use karo: ek array ko (n,1,d) aur doosre ko (1,m,d) mein reshape karo, ghatao, square karo, aur aakhri axis pe sum karo. Ye poori tarah vectorised hai aur loop se dramatically tez. Caveat MEMORY hai — beech ka n×m×d hai, jo bade n ke liye RAM khatam kar deta hai, isliye bade inputs ke liye `scipy.spatial.distance.cdist` use karo, computation ko tukdon mein karo, ya phaili hui `||a||² + ||b||² - 2ab` pehchaan use karo, jo 3D beech ki cheez poori tarah bachati hai.',
    },
  },
  {
    question: 'What is the difference between np.append and Python list append?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A list `append` is amortised O(1) and mutates in place. `np.append` ALLOCATES an entirely new array and copies everything, so it is O(n) per call and building an array by appending in a loop is O(n²) — a genuinely common performance disaster. The correct pattern is to collect into a Python list and call `np.array` once at the end, or preallocate with `np.empty` and fill by index if the size is known.',
      hinglish:
        'Ek list ka `append` amortised O(1) hai aur jagah pe badalta hai. `np.append` ek poora naya array BANATA hai aur sab copy karta hai, isliye ye per call O(n) hai aur ek loop mein append karke array banana O(n²) hai — ek genuinely common performance aapda. Sahi pattern ye hai ki ek Python list mein ikattha karo aur aakhir mein ek baar `np.array` call karo, ya agar size pata hai to `np.empty` se pehle jagah banao aur index se bharo.',
    },
  },
  {
    question: 'What does np.einsum do?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Einstein summation expresses complex multi-array operations with an index notation string: `np.einsum("ij,jk->ik", a, b)` is matrix multiplication, `"ii->i"` extracts a diagonal, and `"ij->ji"` transposes. Its value is expressing a batched or contracted operation in one readable line, and it can avoid materialising large intermediates. It is not automatically faster than a specialised call such as `@`, but for unusual contractions it is both clearer and often more efficient.',
      hinglish:
        'Einstein summation complex multi-array operations ko ek index notation string se batata hai: `np.einsum("ij,jk->ik", a, b)` matrix multiplication hai, `"ii->i"` ek diagonal nikaalta hai, aur `"ij->ji"` transpose karta hai. Iski value ek batched ya contracted operation ko ek padhne layak line mein batana hai, aur ye bade beech ke arrays banane se bach sakta hai. Ye `@` jaise ek khaas call se apne aap tez nahi hai, par ajeeb contractions ke liye ye clearer bhi hai aur aksar zyada efficient bhi.',
    },
  },
  {
    question: 'How does NumPy relate to BLAS and LAPACK?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'NumPy does not implement matrix multiplication or decompositions itself — it delegates to BLAS and LAPACK, highly optimised Fortran and C libraries such as OpenBLAS or Intel MKL. That is why `a @ b` reaches near-hardware-peak performance and uses multiple threads automatically. It also explains why the same NumPy code can differ in speed across machines depending on which BLAS is linked, and why `np.show_config()` is worth checking when performance is unexpectedly poor.',
      hinglish:
        'NumPy matrix multiplication ya decompositions khud implement nahi karta — ye BLAS aur LAPACK ko deta hai, OpenBLAS ya Intel MKL jaisi bahut optimised Fortran aur C libraries. Isiliye `a @ b` hardware ki chhoti ke paas performance paata hai aur apne aap kai threads use karta hai. Ye ye bhi samjhaata hai ki wahi NumPy code machines ke across speed mein alag kyun ho sakta hai, kaunsa BLAS juda hai iske hisaab se, aur isiliye performance anaapekshit roop se kharab hone pe `np.show_config()` dekhna worth hai.',
    },
  },
  {
    question: 'What is the difference between np.zeros, np.empty, and np.full?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`np.zeros` allocates and fills with 0; `np.full` fills with a value you specify; `np.empty` allocates WITHOUT initialising, so it contains whatever garbage was in that memory. `empty` is marginally faster and is appropriate only when you will immediately overwrite every element. Using `empty` and forgetting to fill part of it produces non-deterministic bugs that appear random and are very hard to reproduce, so `zeros` is the safer default.',
      hinglish:
        '`np.zeros` jagah banata hai aur 0 se bharta hai; `np.full` tumhari batayi value se bharta hai; `np.empty` BINA initialise kiye jagah banata hai, isliye usme wahi kachra hota hai jo us memory mein tha. `empty` thoda tez hai aur sirf tab theek hai jab tum turant har element overwrite karoge. `empty` use karke uska ek hissa bharna bhoolna aise non-deterministic bugs banata hai jo random lagte hain aur reproduce karna bahut mushkil hai, isliye `zeros` surakshit default hai.',
    },
  },
  {
    question: 'How do you apply a custom function to every element efficiently?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'First try to express it with existing ufuncs and arithmetic, which is almost always possible and always fastest. `np.vectorize` looks like the answer but is only syntactic sugar over a Python loop, so it gives no real speedup. If the logic genuinely cannot be vectorised, use Numba\'s `@njit`, which compiles the loop to machine code, or Cython. The order matters: vectorise first, compile second, and only then accept a Python loop.',
      hinglish:
        'Pehle use maujood ufuncs aur arithmetic se batane ki koshish karo, jo almost hamesha sambhav aur hamesha sabse tez hai. `np.vectorize` jawab lagta hai par ye sirf ek Python loop ke upar syntactic sugar hai, isliye ye koi asli tezi nahi deta. Agar logic genuinely vectorise nahi ho sakti, Numba ka `@njit` use karo, jo loop ko machine code mein compile karta hai, ya Cython. Kram matter karta hai: pehle vectorise, phir compile, aur tab jaakar ek Python loop sweekar karo.',
    },
  },
  {
    question: 'What is the difference between a NumPy matrix and a 2D array?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`np.matrix` is a legacy class where `*` means matrix multiplication and the object is always exactly 2D. It is DEPRECATED and should not be used: it interacts badly with the rest of NumPy, cannot represent higher dimensions, and its operator overloading makes code ambiguous when mixed with ndarrays. Use a plain 2D `ndarray` with the `@` operator, which is explicit, consistent, and works uniformly across dimensions.',
      hinglish:
        '`np.matrix` ek purani class hai jahan `*` ka matlab matrix multiplication hai aur object hamesha theek 2D hai. Ye DEPRECATED hai aur use nahi karna chahiye: ye baaki NumPy ke saath kharab tarah judta hai, zyada dimensions nahi bata sakta, aur uska operator overloading ndarrays ke saath milne pe code ko do-matlabi bana deta hai. `@` operator ke saath ek plain 2D `ndarray` use karo, jo explicit, consistent hai aur dimensions ke across ek jaisa kaam karta hai.',
    },
  },
  {
    question: 'How do you handle very large arrays that do not fit in memory?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Options in increasing order of effort. Downcast dtypes, which can halve or quarter the size immediately. Process in CHUNKS, streaming through the data rather than loading it all. Use `np.memmap` so the OS pages data in from disk on demand. Or move to a library designed for it: Dask provides a NumPy-like API over chunked parallel arrays, and Zarr handles compressed chunked storage. The first question, though, is whether you genuinely need every row at full precision.',
      hinglish:
        'Mehnat ke badhte kram mein options. dtypes downcast karo, jo size turant aadha ya ek chauthai kar sakta hai. TUKDON mein process karo, sab load karne ke bajaye data se stream karte hue. `np.memmap` use karo taaki OS zaroorat pe disk se data laaye. Ya iske liye bani ek library pe jao: Dask chunked parallel arrays ke upar ek NumPy-jaisa API deta hai, aur Zarr compressed chunked storage sambhalta hai. Pehla sawaal, halaanki, ye hai ki kya tumhe genuinely har row poori precision pe chahiye.',
    },
  },
  {
    question: 'What is the difference between np.copy and assignment?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`b = a` binds a new NAME to the same array object, so there is one array with two names and any modification is visible through both. `b = a.copy()` creates an independent array with its own buffer. This is standard Python reference semantics rather than anything NumPy-specific, but it bites harder here because arrays are large and mutation is common — and because slicing returns views, so even `b = a[:]` does not give you independence.',
      hinglish:
        '`b = a` usi array object se ek naya NAAM jodta hai, isliye ek array ke do naam hain aur koi bhi badlaav dono se dikhta hai. `b = a.copy()` apne buffer wala ek swatantra array banata hai. Ye NumPy-khaas kuch nahi balki standard Python reference semantics hai, par yahan zyada kaatta hai kyunki arrays bade hain aur mutation common hai — aur kyunki slicing views lautaata hai, isliye `b = a[:]` bhi tumhe swatantrata nahi deta.',
    },
  },
  {
    question: 'What are structured arrays in NumPy?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A structured array has a compound dtype with named fields of different types, letting one array hold heterogeneous record-like data accessed by name — `arr["age"]`. They are useful for reading binary file formats with a fixed record layout, and for interoperating with C structs. For general tabular work pandas is almost always better, offering a far richer API, an index, and proper missing-data handling that structured arrays lack.',
      hinglish:
        'Ek structured array ka ek compound dtype hota hai jisme alag types ke named fields hote hain, ek array ko naam se access hote heterogeneous record-jaisa data rakhne dete hue — `arr["age"]`. Ye ek tay record layout wale binary file formats padhne, aur C structs ke saath kaam karne ke liye useful hain. Aam tabular kaam ke liye pandas almost hamesha behtar hai, ek bahut rich API, ek index, aur theek missing-data handling deta hua jo structured arrays mein nahi.',
    },
  },
  {
    question: 'How do you debug an unexpected shape or broadcasting error?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Print `arr.shape` at each step — most shape bugs come from an operation silently adding or removing a dimension, and a reduction without `keepdims` is the usual culprit. Align shapes from the RIGHT and check that each pair is equal or one of them is 1. Watch for a (n,) versus (n,1) mismatch, which broadcasts into an unintended (n,n) instead of failing loudly. Assert expected shapes at function boundaries so errors surface where they originate.',
      hinglish:
        'Har step pe `arr.shape` print karo — zyadatar shape bugs ek aise operation se aate hain jo chupke se ek dimension jodta ya hataata hai, aur bina `keepdims` ke ek reduction usual mujrim hai. Shapes ko DAAYE se milaao aur check karo ki har jodi barabar hai ya ek 1 hai. Ek (n,) versus (n,1) mismatch pe nazar rakho, jo zor se fail hone ke bajaye ek anchahe (n,n) mein broadcast ho jaata hai. Function boundaries pe expected shapes assert karo taaki errors wahin dikhein jahan wo shuru hoti hain.',
    },
  },
];
