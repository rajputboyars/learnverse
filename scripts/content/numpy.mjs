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
            frequency: 'very-common',
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
            frequency: 'very-common',
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
            frequency: 'very-common',
            answer: {
              english:
                'axis=0 aggregates DOWN the rows, collapsing the row dimension, so you get one value per column. axis=1 aggregates ACROSS the columns, collapsing the column dimension, so you get one value per row. The simplest mental model is that the axis you specify is the dimension that gets reduced away. For a shape (3, 4) array, sum(axis=0) has shape (4,) and sum(axis=1) has shape (3,).',
              hinglish:
                'axis=0 rows ke NEECHE aggregate karta hai, row dimension ko collapse karke, isliye har column ke liye ek value milti hai. axis=1 columns ke AAR-PAAR aggregate karta hai, column dimension ko collapse karke, isliye har row ke liye ek value milti hai. Simplest model ye hai ki jo axis tum specify karoge wahi dimension reduce ho jaata hai. Shape (3, 4) ke array ke liye sum(axis=0) ki shape (4,) hoti hai aur sum(axis=1) ki shape (3,).',
            },
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
            frequency: 'very-common',
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
            frequency: 'very-common',
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
    ],
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between a NumPy view and a copy, and why does it matter?',
    difficulty: 'medium',
    frequency: 'very-common',
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
];
