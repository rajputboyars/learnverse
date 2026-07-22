// Redux / Zustand curriculum — beginner -> intermediate -> advanced.
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
  title: 'Redux & Zustand',
  slug: 'redux',
  description:
    'React apps mein global state manage karo — Redux Toolkit aur Zustand dono. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🔄',
  tags: ['redux', 'zustand', 'state-management', 'react'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 12,
};

const beginner = [
  {
    title: 'State Management Fundamentals',
    level: 'beginner',
    description: 'Global state kya hai aur kab zaroorat padti hai.',
    concepts: [
      {
        title: 'Why Global State Management',
        difficulty: 'easy',
        tags: ['intro', 'state-management', 'basics'],
        explanation: {
          english:
            'Local component state (useState) works well for UI state within one component. As apps grow, you need to share state across many components — passing props down multiple levels is called "prop drilling" and becomes painful. Global state management libraries like Redux and Zustand store state outside components so any component can read or update it directly.',
          hinglish:
            'Local component state (useState) ek component ke andar UI state ke liye theek hai. App bada hone par kai components mein state share karni padti hai — props ko kai levels neeche pass karna "prop drilling" kehlata hai aur mushkil ho jaata hai. Redux aur Zustand jaisi global state libraries state components ke bahar store karti hain taaki koi bhi component directly read ya update kar sake.',
        },
        dailyLifeExample:
          'Prop drilling aise hai ki agar principal ko peon tak message pahunchana ho toh pehle teacher ko do, teacher clerk ko de, clerk peon ko de. Global state ek notice board jaisi hai — principal notice lagata hai aur peon directly padh leta hai, bich mein koi nahi.',
        codeExample:
          '// Prop drilling — painful for deep trees\nfunction App() {\n  const [user, setUser] = useState(null);\n  return <Layout user={user} setUser={setUser} />;\n}\nfunction Layout({ user, setUser }) {\n  return <Sidebar user={user} setUser={setUser} />;\n}\nfunction Sidebar({ user, setUser }) {\n  return <UserCard user={user} setUser={setUser} />;\n}\n\n// Global store — any component reads directly\nimport { useUserStore } from "@/store";\nfunction UserCard() {\n  const user = useUserStore(state => state.user);\n  return <div>{user?.name}</div>;\n}',
        keyPoints: [
          'useState is local — prop drilling to share it is messy',
          'Global state lives outside components',
          'Any component can read/write without prop drilling',
          'Context API is a lightweight built-in alternative',
        ],
        quiz: [
          {
            question: 'What is "prop drilling"?',
            options: [
              'Drilling into props to find a bug',
              'Passing props down many component levels to reach a deep child',
              'A React performance technique',
              'A TypeScript feature',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is a key benefit of storing state in a global store instead of local component state?',
            options: [
              'It makes the app slower on purpose',
              'Any component can read or update it directly, without passing props through every level',
              'It removes the need for React entirely',
              'It disables re-renders completely',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is a lightweight, built-in React alternative to a global state library for low-frequency updates?',
            options: ['Redux Toolkit', 'The Context API', 'Zustand', 'RTK Query'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When should you use a global state management library vs React Context?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Context is fine for low-frequency updates (theme, locale, auth user) because every consumer re-renders when the value changes. Use Redux or Zustand when: state updates are frequent (cart, real-time data), you need middleware (logging, async thunks), the state is complex with many actions, or you need devtools/time-travel debugging. For small-medium apps, Context + useReducer often suffices.',
              hinglish:
                'Context low-frequency updates ke liye theek hai (theme, locale, auth user) kyunki value change hone par har consumer re-render hota hai. Redux ya Zustand tab use karo jab: state updates frequent hoon (cart, real-time data), middleware chahiye (logging, async thunks), state complex ho kai actions ke saath, ya devtools/time-travel debugging chahiye. Small-medium apps ke liye Context + useReducer aksar kafi hota hai.',
            },
          },
        ],
      },
      {
        title: 'Redux Core Principles & the Reducer Pattern',
        difficulty: 'medium',
        tags: ['redux', 'principles', 'reducer', 'pure-function'],
        explanation: {
          english:
            "Before touching Redux Toolkit's `createSlice`, it's worth understanding the THREE principles the entire library is built on — they explain WHY Redux code is shaped the way it is, and they show up constantly in interviews.\n\n1. **Single source of truth**: the entire application's state lives in ONE JavaScript object tree, inside a single store. This makes debugging easier (one place to inspect) and enables features like DevTools time-travel and persisting the whole app's state to localStorage in one line.\n\n2. **State is read-only**: the only way to change state is to dispatch an ACTION — a plain object describing what happened (e.g. `{ type: 'cart/addItem', payload: {...} }`). You never mutate state directly (`state.count++` is forbidden in raw Redux); this makes changes traceable and predictable — every state transition has a corresponding, logged action.\n\n3. **Changes are made with pure functions (reducers)**: a reducer is a function `(state, action) => newState` that must be PURE — given the same inputs, it always returns the same output, with no side effects (no API calls, no mutating arguments, no `Math.random()`, no `Date.now()`). This purity is what makes time-travel debugging and predictable testing possible: you can call a reducer with the same state+action a thousand times and always get the identical result.\n\nRedux Toolkit's `createSlice` doesn't remove these principles — it just uses Immer to let you WRITE code that looks like mutation while still producing the immutable update these principles require underneath.",
          hinglish:
            "Redux Toolkit ke `createSlice` ko touch karne se pehle, poori library jin TEEN principles pe built hai unhe samajhna zaroori hai — ye batate hain ki Redux code aisa kyun likha jaata hai, aur ye interviews mein constantly aate hain.\n\n1. **Single source of truth**: poori application ki state EK JavaScript object tree mein rehti hai, ek single store ke andar. Isse debugging aasan hoti hai (inspect karne ke liye ek jagah) aur DevTools time-travel jaisi features aur poore app ki state ko localStorage mein ek line mein persist karna possible hota hai.\n\n2. **State read-only hai**: state change karne ka sirf ek tareeka hai — ek ACTION dispatch karna — ek plain object jo batata hai kya hua (jaise `{ type: 'cart/addItem', payload: {...} }`). State ko kabhi directly mutate nahi karte (`state.count++` raw Redux mein forbidden hai); isse changes traceable aur predictable hote hain — har state transition ka ek corresponding, logged action hota hai.\n\n3. **Changes pure functions (reducers) se hote hain**: ek reducer ek function `(state, action) => newState` hai jo PURE hona chahiye — same inputs diye gaye toh hamesha same output return karta hai, koi side effects nahi (no API calls, no mutating arguments, no `Math.random()`, no `Date.now()`). Yahi purity time-travel debugging aur predictable testing possible banati hai: tum ek reducer ko same state+action ke saath hazaar baar call kar sakte ho aur hamesha identical result milega.\n\nRedux Toolkit ka `createSlice` in principles ko hataata nahi — ye bas Immer use karta hai taaki tum aisa code likh sako jo mutation jaisa dikhe, jabki neeche in principles ki maangi immutable update produce ho.",
        },
        dailyLifeExample:
          "Single source of truth waise hai jaise ek company ka sirf ek official record book hona, alag-alag departments ke apne-apne notes nahi. State read-only aur actions waise hain jaise koi bhi change sirf ek formal application form (action) submit karke ho, direct pen se overwrite nahi. Pure function reducer waise hai jaise ek calculator — same numbers doge to hamesha same answer milega, kabhi mood ke hisaab se alag nahi.",
        codeExample:
          "// A reducer must be a PURE function: (state, action) => newState\n\n// BAD — impure, mutates directly, uses Date.now() (non-deterministic)\nfunction badReducer(state, action) {\n  state.items.push(action.payload);  // mutation! forbidden\n  state.lastUpdated = Date.now();    // side effect! non-deterministic\n  return state;\n}\n\n// GOOD — pure, returns a new object, no side effects\nfunction goodReducer(state, action) {\n  switch (action.type) {\n    case 'cart/addItem':\n      return {\n        ...state,\n        items: [...state.items, action.payload],\n      };\n    default:\n      return state;\n  }\n}\n\n// Redux Toolkit's createSlice LOOKS like mutation but Immer\n// translates it into the pure, immutable pattern above:\nreducers: {\n  addItem(state, action) {\n    state.items.push(action.payload); // looks mutating, Immer makes it safe\n  },\n}",
        keyPoints: [
          'Single source of truth: the whole app state lives in one store/object tree',
          'State is read-only: the only way to change it is to dispatch a plain-object action',
          'Reducers must be pure functions: same (state, action) input always produces the same output, no side effects',
          'Purity is what enables time-travel debugging and predictable testing',
          'Redux Toolkit\'s Immer lets you write "mutating" code that still produces immutable updates underneath',
        ],
        quiz: [
          {
            question: 'What does the "single source of truth" principle mean in Redux?',
            options: [
              'Each component has its own separate store',
              "The entire application's state lives in one object tree inside a single store",
              'Only the admin user can change state',
              'State is stored in a database, never in memory',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why must a Redux reducer be a pure function?',
            options: [
              'It is just a style preference with no real benefit',
              'Purity guarantees the same (state, action) input always produces the same output, enabling predictable testing and time-travel debugging',
              'Pure functions run faster on all hardware',
              'Impure reducers are not allowed by JavaScript syntax',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the ONLY way to change state according to Redux principles?',
            options: [
              'Directly mutating the state object',
              'Dispatching an action describing what happened, which a reducer processes',
              'Calling setState() directly on the store',
              'Editing the store file at runtime',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Redux Toolkit',
    level: 'intermediate',
    description: 'Modern Redux — slices, thunks aur RTK Query.',
    concepts: [
      {
        title: 'Redux Toolkit Setup and Slices',
        difficulty: 'medium',
        tags: ['redux', 'redux-toolkit', 'slice'],
        explanation: {
          english:
            'Redux Toolkit (RTK) is the official way to write Redux. It eliminates boilerplate with `createSlice` — you define state, reducers, and actions together. The `configureStore` function wires everything up with good defaults (Redux DevTools, Immer for immutable updates).',
          hinglish:
            'Redux Toolkit (RTK) Redux likhne ka official tarika hai. `createSlice` se boilerplate khatam ho jaati hai — state, reducers aur actions ek saath define karte hain. `configureStore` function sab kuch good defaults ke saath wire up karta hai (Redux DevTools, immutable updates ke liye Immer).',
        },
        dailyLifeExample:
          'Purana Redux ek zyada paperwork wali sarkari office jaisi thi — alag action file, alag reducer file, alag constants. Redux Toolkit ek modern startup jaisi hai — ek hi jagah sab define karo, kaam jaldi hoga.',
        codeExample:
          '// store/cartSlice.js\nimport { createSlice } from "@reduxjs/toolkit";\n\nconst cartSlice = createSlice({\n  name: "cart",\n  initialState: { items: [], total: 0 },\n  reducers: {\n    addItem(state, action) {\n      state.items.push(action.payload); // Immer handles immutability\n      state.total += action.payload.price;\n    },\n    removeItem(state, action) {\n      state.items = state.items.filter(i => i.id !== action.payload);\n    },\n    clearCart(state) {\n      state.items = [];\n      state.total = 0;\n    },\n  },\n});\n\nexport const { addItem, removeItem, clearCart } = cartSlice.actions;\nexport default cartSlice.reducer;\n\n// store/index.js\nimport { configureStore } from "@reduxjs/toolkit";\nimport cartReducer from "./cartSlice";\n\nexport const store = configureStore({\n  reducer: { cart: cartReducer },\n});\n\n// Component usage\nimport { useSelector, useDispatch } from "react-redux";\nimport { addItem } from "@/store/cartSlice";\n\nfunction ProductCard({ product }) {\n  const dispatch = useDispatch();\n  const cartCount = useSelector(state => state.cart.items.length);\n  return (\n    <button onClick={() => dispatch(addItem(product))}>\n      Add to Cart ({cartCount})\n    </button>\n  );\n}',
        keyPoints: [
          'createSlice: state + reducers + actions in one place',
          'Immer built-in — write "mutating" code, RTK makes it immutable',
          'configureStore wires reducers and DevTools',
          'useSelector reads state, useDispatch fires actions',
        ],
        quiz: [
          {
            question: 'What does `createSlice` in Redux Toolkit do?',
            options: [
              'Creates a database table',
              'Combines state, reducers and auto-generates actions in one call',
              'Replaces useState',
              'Creates CSS modules',
            ],
            correctIndex: 1,
          },
          {
            question: 'How does Redux Toolkit let you write code that "mutates" state directly inside a reducer?',
            options: [
              'It secretly ignores mutations',
              'It uses Immer under the hood to translate "mutating" code into safe, immutable updates',
              'It disables immutability entirely',
              'It only allows read operations',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does configureStore set up automatically that older Redux required manual setup for?',
            options: [
              'Nothing extra',
              'Good defaults including Redux DevTools integration and middleware like redux-thunk',
              'A database connection',
              'A CSS bundler',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is Redux Toolkit and why was it introduced?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Redux Toolkit (RTK) is the official recommended way to write Redux. It was introduced to address three problems with classic Redux: too much boilerplate (separate action creators, types, and reducers), accidental state mutation (RTK includes Immer), and complex async setup (RTK includes createAsyncThunk and RTK Query). RTK lets you write less code with better defaults.',
              hinglish:
                'Redux Toolkit (RTK) Redux likhne ka official recommended tarika hai. Ise classic Redux ke teen problems address karne ke liye introduce kiya gaya: bahut zyada boilerplate (alag action creators, types, reducers), accidental state mutation (RTK mein Immer included hai), aur complex async setup (RTK mein createAsyncThunk aur RTK Query included). RTK kam code likhne deta hai better defaults ke saath.',
            },
          },
        ],
      },
      {
        title: 'Async Actions with createAsyncThunk',
        difficulty: 'medium',
        tags: ['redux', 'async', 'thunk', 'api'],
        explanation: {
          english:
            'Most apps need to fetch data from an API. `createAsyncThunk` handles async operations and dispatches pending / fulfilled / rejected actions automatically. You handle these in `extraReducers` in your slice.',
          hinglish:
            '`createAsyncThunk` async operations handle karta hai aur automatically pending / fulfilled / rejected actions dispatch karta hai. Inhe apne slice mein `extraReducers` mein handle karte hain.',
        },
        dailyLifeExample:
          'Thunk ek delivery order jaisa hai — pehle "order placed" (pending), phir "delivered" (fulfilled) ya "delivery failed" (rejected). Har state change pe UI update hoti hai — "loading...", "data show", ya "error show".',
        codeExample:
          '// store/coursesSlice.js\nimport { createSlice, createAsyncThunk } from "@reduxjs/toolkit";\n\nexport const fetchCourses = createAsyncThunk(\n  "courses/fetchAll",\n  async () => {\n    const res = await fetch("/api/courses");\n    return res.json();\n  }\n);\n\nconst coursesSlice = createSlice({\n  name: "courses",\n  initialState: { items: [], loading: false, error: null },\n  reducers: {},\n  extraReducers: (builder) => {\n    builder\n      .addCase(fetchCourses.pending,   (state) => { state.loading = true; })\n      .addCase(fetchCourses.fulfilled, (state, action) => {\n        state.loading = false;\n        state.items = action.payload;\n      })\n      .addCase(fetchCourses.rejected,  (state, action) => {\n        state.loading = false;\n        state.error = action.error.message;\n      });\n  },\n});\n\nexport default coursesSlice.reducer;\n\n// Component\nfunction CoursesPage() {\n  const dispatch = useDispatch();\n  const { items, loading } = useSelector(s => s.courses);\n  useEffect(() => { dispatch(fetchCourses()); }, []);\n  if (loading) return <p>Loading...</p>;\n  return <ul>{items.map(c => <li key={c._id}>{c.title}</li>)}</ul>;\n}',
        keyPoints: [
          'createAsyncThunk dispatches pending/fulfilled/rejected',
          'Handle lifecycle in extraReducers with builder.addCase',
          'Track loading, data, and error in slice state',
          'RTK Query is a higher-level alternative',
        ],
        quiz: [
          {
            question: 'What three actions does createAsyncThunk automatically dispatch?',
            options: [
              'start, done, fail',
              'pending, fulfilled, rejected',
              'loading, success, error',
              'request, response, catch',
            ],
            correctIndex: 1,
          },
          {
            question: 'Where do you handle the pending/fulfilled/rejected actions from a createAsyncThunk?',
            options: [
              'In the component directly',
              'In the slice\'s extraReducers using builder.addCase',
              'In configureStore',
              'They are handled automatically with no code needed',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is RTK Query, mentioned as a higher-level alternative to manual thunks?',
            options: [
              'A CSS-in-JS library',
              'A complete data-fetching and caching solution built on top of Redux Toolkit',
              'A database query language',
              'A replacement for React itself',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you handle API calls in Redux?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'With Redux Toolkit: use createAsyncThunk to wrap the async call. It returns a thunk action creator that dispatches pending, fulfilled, and rejected action types automatically. Handle them in extraReducers to update loading/data/error state. For advanced cases, RTK Query provides a complete data-fetching and caching solution built on top of RTK.',
              hinglish:
                'Redux Toolkit ke saath: async call wrap karne ke liye createAsyncThunk use karo. Ye ek thunk action creator return karta hai jo automatically pending, fulfilled, aur rejected action types dispatch karta hai. Inhe extraReducers mein handle karo loading/data/error state update karne ke liye. Advanced cases ke liye RTK Query ek complete data-fetching aur caching solution provide karta hai jo RTK ke upar built hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Zustand',
    level: 'intermediate',
    description: 'Minimal aur fast state management Zustand ke saath.',
    concepts: [
      {
        title: 'Zustand Basics',
        difficulty: 'medium',
        tags: ['zustand', 'state-management'],
        explanation: {
          english:
            'Zustand is a lightweight state management library with a minimal API. You create a store using `create` — define state and actions together in a single function. No boilerplate, no providers, no reducers. Any component reads the store with a hook and only re-renders when the subscribed slice changes.',
          hinglish:
            'Zustand ek lightweight state management library hai minimal API ke saath. `create` use karke store banate hain — ek hi function mein state aur actions define karo. Koi boilerplate nahi, koi providers nahi, koi reducers nahi. Koi bhi component hook se store read karta hai aur sirf tab re-render hota hai jab subscribed slice change ho.',
        },
        dailyLifeExample:
          'Redux ek bada government department jaisa hai — bahut rules, forms, aur procedures. Zustand ek personal notebook jaisi hai — directly likhte hain, directly padhte hain, koi red tape nahi.',
        codeExample:
          'import { create } from "zustand";\n\nconst useCartStore = create((set) => ({\n  items: [],\n  total: 0,\n  addItem: (product) =>\n    set((state) => ({\n      items: [...state.items, product],\n      total: state.total + product.price,\n    })),\n  clearCart: () => set({ items: [], total: 0 }),\n}));\n\n// Component — no Provider needed!\nfunction CartButton({ product }) {\n  const addItem = useCartStore(state => state.addItem);\n  const count   = useCartStore(state => state.items.length);\n  return <button onClick={() => addItem(product)}>Add ({count})</button>;\n}',
        keyPoints: [
          'create() defines state + actions together',
          'No Provider wrapper needed',
          'Selector pattern: subscribe to only what you need',
          'Tiny bundle (~1 KB) vs Redux Toolkit (~20 KB)',
        ],
        quiz: [
          {
            question: 'Which of these is NOT required when using Zustand?',
            options: ['create()', 'A selector function', 'A Provider wrapper component', 'The useStore hook'],
            correctIndex: 2,
          },
          {
            question: 'How do actions typically get defined in a Zustand store?',
            options: [
              'In a completely separate reducer file',
              'Directly inside the same create() function alongside the state',
              'They cannot be defined, only external functions can update state',
              'Only via middleware',
            ],
            correctIndex: 1,
          },
          {
            question: 'Roughly how does Zustand\'s bundle size compare to Redux Toolkit\'s?',
            options: [
              'Zustand is much larger',
              'Zustand is much smaller (~1 KB vs ~20 KB for RTK)',
              'They are exactly the same size',
              'Bundle size is not a meaningful comparison here',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Compare Redux Toolkit and Zustand — when would you choose each?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Redux Toolkit: better for large teams or apps with complex state logic, needs of middleware (logging, analytics), strong DevTools, and standardised patterns. RTK Query for server state. Zustand: better for small-medium apps, simpler mental model, less boilerplate, faster to set up. Both are fine for most apps — Zustand is increasingly popular for new projects due to its simplicity.',
              hinglish:
                'Redux Toolkit: complex state logic wale bade teams ya apps ke liye better, middleware ki zaroorat (logging, analytics), strong DevTools, aur standardised patterns. RTK Query server state ke liye. Zustand: small-medium apps ke liye better, simpler mental model, kam boilerplate, set up karna jaldi. Dono zyaadatar apps ke liye theek hain — Zustand naye projects mein simplicity ki wajah se tezi se popular ho raha hai.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Advanced Patterns',
    level: 'advanced',
    description: 'Middleware, devtools aur performance optimization.',
    concepts: [
      {
        title: 'Redux DevTools and Debugging',
        difficulty: 'hard',
        tags: ['devtools', 'debugging', 'redux'],
        explanation: {
          english:
            'Redux DevTools (browser extension) lets you inspect every action dispatched, view the state before and after each action, and time-travel debug — jump to any past state. RTK enables DevTools automatically. In Zustand, the `devtools` middleware adds the same capability.',
          hinglish:
            'Redux DevTools (browser extension) har dispatched action inspect karne, har action se pehle aur baad ki state dekhne, aur time-travel debug — kisi bhi past state pe jump karne deta hai. RTK DevTools automatically enable karta hai. Zustand mein `devtools` middleware same capability add karta hai.',
        },
        dailyLifeExample:
          'DevTools ek CCTV system jaisi hai — har action record hai, time pe rewind karke dekh sakte ho app ka exact state kisi bhi moment pe. Bugs dhundna bahut aasan ho jaata hai.',
        codeExample:
          '// RTK — DevTools enabled automatically in configureStore\nconst store = configureStore({ reducer: { cart: cartReducer } });\n\n// Zustand with devtools middleware\nimport { create } from "zustand";\nimport { devtools } from "zustand/middleware";\n\nconst useCartStore = create(devtools((set) => ({\n  items: [],\n  addItem: (product) =>\n    set(\n      (state) => ({ items: [...state.items, product] }),\n      false,\n      "cart/addItem" // action label in DevTools\n    ),\n})));',
        keyPoints: [
          'Install Redux DevTools browser extension',
          'RTK configureStore enables it automatically',
          'Time-travel: replay any sequence of actions',
          'Zustand: wrap create with devtools() middleware',
        ],
        quiz: [
          {
            question: 'What can you do with Redux DevTools "time-travel" feature?',
            options: [
              'Deploy to production faster',
              'Jump back to any previous state and replay actions',
              'Auto-fix bugs in your code',
              'View network requests',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why is time-travel debugging possible in Redux but hard in an app with mutable, ad-hoc state?',
            options: [
              'It is not actually related to how state is managed',
              'Redux state is immutable and actions are recorded, so every past state can be reconstructed and replayed',
              'Redux stores state in a database',
              'Time-travel only works with class components',
            ],
            correctIndex: 1,
          },
          {
            question: 'How do you enable DevTools-style debugging in a Zustand store?',
            options: [
              'It is impossible in Zustand',
              'Wrap the store creation function with the devtools() middleware',
              'Install a separate npm package with no code changes',
              'Zustand has no concept of middleware',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is time-travel debugging in Redux?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Time-travel debugging lets you step backwards and forwards through every action that was dispatched. Because Redux state is immutable and actions are plain objects, each state transition is recorded. You can replay any sequence, jump to any previous state, or skip actions to reproduce a bug — all without reloading the page.',
              hinglish:
                'Time-travel debugging dispatch kiye gaye har action ke through backwards aur forwards step karne deta hai. Kyunki Redux state immutable hai aur actions plain objects hain, har state transition record hoti hai. Kisi bhi sequence replay kar sakte ho, kisi bhi previous state pe jump kar sakte ho, ya bug reproduce karne ke liye actions skip kar sakte ho — page reload kiye bina.',
            },
          },
        ],
      },
      {
        title: 'Optimizing Re-renders: Selectors & Memoization',
        difficulty: 'hard',
        tags: ['performance', 'selectors', 'reselect', 'memoization'],
        explanation: {
          english:
            "A common performance bug: a component re-renders on EVERY state change, even when the specific piece of data it cares about hasn't changed. This happens because of how selectors return values.\n\n**The problem in Redux**: `useSelector(state => state.cart.items.filter(i => i.inStock))` creates a BRAND NEW array on every single render (because `.filter()` always returns a new array reference), even if the underlying data is identical. Since `useSelector` re-renders the component whenever the selector's return value is a DIFFERENT reference (by default, `===` comparison), this component re-renders on every single Redux state change, anywhere in the app — wasteful.\n\n**The fix — memoized selectors (Reselect)**: `createSelector` from Reselect (bundled with RTK) creates a selector that only recomputes when its INPUT selectors' outputs actually change. It caches the last result, and if the relevant slice of state is unchanged, it returns the exact same array/object reference — so `useSelector`'s reference-equality check sees no change and skips the re-render.\n\n**The equivalent problem in Zustand**: selecting multiple values as an object (`useStore(state => ({ a: state.a, b: state.b }))`) creates a new object every render too. Fix: either select primitives individually (multiple hook calls), or use Zustand's `shallow` comparison function to compare object contents instead of reference.\n\nRule of thumb: derived/computed values (filtering, sorting, mapping over state) are exactly where this bites — always memoize them.",
          hinglish:
            "Ek common performance bug: ek component HAR state change pe re-render hota hai, chahe wo specific data jisme use interest hai badla hi na ho. Ye isliye hota hai kyunki selectors values kaise return karte hain.\n\n**Redux mein problem**: `useSelector(state => state.cart.items.filter(i => i.inStock))` har single render pe ek BILKUL NAYA array banata hai (kyunki `.filter()` hamesha ek nayi array reference return karta hai), chahe underlying data identical ho. Kyunki `useSelector` component ko re-render karta hai jab bhi selector ka return value ek ALAG reference ho (default se, `===` comparison), ye component app mein kahin bhi har single Redux state change pe re-render hota hai — wasteful.\n\n**Fix — memoized selectors (Reselect)**: Reselect ka `createSelector` (RTK ke saath bundled) ek aisa selector banata hai jo sirf tab recompute karta hai jab uske INPUT selectors ke outputs actually change hon. Ye last result cache karta hai, aur agar state ka relevant slice unchanged hai, wo exactly same array/object reference return karta hai — isliye `useSelector` ka reference-equality check koi change nahi dekhta aur re-render skip ho jaata hai.\n\n**Zustand mein equivalent problem**: multiple values ko ek object ke roop mein select karna (`useStore(state => ({ a: state.a, b: state.b }))`) bhi har render pe ek naya object banata hai. Fix: ya toh primitives ko individually select karo (multiple hook calls), ya Zustand ka `shallow` comparison function use karo jo object contents compare kare, reference nahi.\n\nRule of thumb: derived/computed values (state pe filtering, sorting, mapping) exactly wahan hain jahan ye bite karta hai — hamesha inhe memoize karo.",
        },
        dailyLifeExample:
          "Ye waise hai jaise har baar tumhe grocery list dikhani ho, tum poori list ko phir se photocopy karke do — chahe list mein kuch badla ho ya nahi. Memoized selector waise hai jaise tum sirf tab nayi photocopy karte ho jab list actually badle, warna purani photocopy hi dobara de dete ho — kaam kam, waste kam.",
        codeExample:
          "// PROBLEM: creates a new array every render -> re-renders on ANY state change\nfunction Cart() {\n  const inStockItems = useSelector(\n    (state) => state.cart.items.filter((i) => i.inStock) // new array every time!\n  );\n  return <ul>{inStockItems.map(i => <li key={i.id}>{i.name}</li>)}</ul>;\n}\n\n// FIX: memoized selector with Reselect\nimport { createSelector } from '@reduxjs/toolkit';\n\nconst selectCartItems = (state) => state.cart.items;\nconst selectInStockItems = createSelector(\n  [selectCartItems],\n  (items) => items.filter((i) => i.inStock) // only recomputes if items actually changed\n);\n\nfunction Cart() {\n  const inStockItems = useSelector(selectInStockItems); // stable reference when unchanged\n  return <ul>{inStockItems.map(i => <li key={i.id}>{i.name}</li>)}</ul>;\n}\n\n// Zustand equivalent: use shallow comparison for object selections\nimport { useShallow } from 'zustand/react/shallow';\n\nconst { a, b } = useStore(useShallow((state) => ({ a: state.a, b: state.b })));",
        keyPoints: [
          'Selectors that create new arrays/objects (filter, map, sort) trigger re-renders on every state change by default',
          'useSelector re-renders when the selector\'s return value has a different reference (===), not deep equality',
          'createSelector (Reselect) memoizes: it only recomputes when its input selectors\' outputs actually change',
          'A memoized selector returns the SAME reference when nothing relevant changed, skipping unnecessary re-renders',
          'Zustand has the same issue with object-shaped selections — use shallow comparison to fix it',
        ],
        quiz: [
          {
            question: 'Why does `useSelector(state => state.items.filter(...))` cause unnecessary re-renders?',
            options: [
              'filter() is too slow',
              '.filter() returns a brand new array reference on every render, so the reference-equality check always sees a "change"',
              'useSelector does not support filter',
              'It never causes re-renders',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does a memoized selector created with createSelector do differently?',
            options: [
              'It runs the computation twice for safety',
              'It only recomputes when its input selectors\' outputs actually change, returning the same cached reference otherwise',
              'It disables re-renders entirely for the whole app',
              'It stores the result in a database',
            ],
            correctIndex: 1,
          },
          {
            question: 'In Zustand, what fixes unnecessary re-renders when selecting multiple values as an object?',
            options: [
              'Nothing can fix this in Zustand',
              'Using shallow comparison (e.g. useShallow) to compare object contents instead of reference',
              'Switching to Redux instead',
              'Selecting the entire store state at once',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'RTK Query: Data Fetching & Caching',
        difficulty: 'hard',
        tags: ['rtk-query', 'data-fetching', 'caching', 'api-slice'],
        explanation: {
          english:
            "Manually writing createAsyncThunk + extraReducers for every API endpoint (loading/error/data states, avoiding duplicate requests, refetching when stale) is repetitive boilerplate. **RTK Query**, included in Redux Toolkit, is a data-fetching and caching layer that eliminates almost all of it.\n\nYou define an `apiSlice` with `createApi`, listing endpoints (`getCourses`, `addCourse`, etc.) instead of writing thunks and reducers by hand. RTK Query auto-generates React hooks for each endpoint (`useGetCoursesQuery`, `useAddCourseMutation`) that handle:\n- Loading/error/data states automatically (no manual `isLoading` flags)\n- Caching responses so multiple components requesting the same data share ONE network request\n- Automatic refetching and cache invalidation via `tags` — e.g. after `addCourse` mutation succeeds, mark the `Courses` tag as invalidated, and any component using `useGetCoursesQuery` automatically refetches fresh data\n- Deduplication of identical in-flight requests\n\nThis is conceptually the same problem SWR and React Query solve for plain React — RTK Query is Redux's built-in answer, so if you're already using Redux Toolkit for other state, you don't need a second data-fetching library.",
          hinglish:
            "Har API endpoint ke liye manually createAsyncThunk + extraReducers likhna (loading/error/data states, duplicate requests avoid karna, stale hone par refetch karna) repetitive boilerplate hai. **RTK Query**, jo Redux Toolkit mein included hai, ek data-fetching aur caching layer hai jo isme se almost sab khatam kar deta hai.\n\nTum `createApi` se ek `apiSlice` define karte ho, endpoints (`getCourses`, `addCourse`, etc.) list karke, hath se thunks aur reducers likhne ke bajaye. RTK Query har endpoint ke liye automatically React hooks generate karta hai (`useGetCoursesQuery`, `useAddCourseMutation`) jo ye handle karte hain:\n- Loading/error/data states automatically (manual `isLoading` flags nahi chahiye)\n- Responses ko cache karna taaki multiple components jo same data request karein ek hi network request share karein\n- `tags` ke through automatic refetching aur cache invalidation — jaise `addCourse` mutation succeed hone ke baad, `Courses` tag ko invalidated mark karo, aur jo bhi component `useGetCoursesQuery` use kar raha hai wo automatically fresh data refetch kare\n- Identical in-flight requests ki deduplication\n\nYe conceptually wahi problem hai jo SWR aur React Query plain React ke liye solve karte hain — RTK Query Redux ka built-in jawab hai, isliye agar tum pehle se Redux Toolkit use kar rahe ho baaki state ke liye, tumhe ek dusri data-fetching library ki zaroorat nahi.",
        },
        dailyLifeExample:
          "RTK Query waise hai jaise ek smart office reception jo har visitor ka data khud manage karta hai — kaun aaya, kaunsi jaankari purani ho gayi, kise dobara bulana hai — bina har department ko manually track karna pade. Cache invalidation waise hai jaise jab koi record update ho, reception automatically saare related boards refresh kar deta hai.",
        codeExample:
          "// store/apiSlice.js\nimport { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';\n\nexport const apiSlice = createApi({\n  reducerPath: 'api',\n  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),\n  tagTypes: ['Courses'],\n  endpoints: (builder) => ({\n    getCourses: builder.query({\n      query: () => '/courses',\n      providesTags: ['Courses'],\n    }),\n    addCourse: builder.mutation({\n      query: (newCourse) => ({ url: '/courses', method: 'POST', body: newCourse }),\n      invalidatesTags: ['Courses'], // triggers auto-refetch of getCourses everywhere\n    }),\n  }),\n});\n\nexport const { useGetCoursesQuery, useAddCourseMutation } = apiSlice;\n\n// Component — no useEffect, no manual loading state\nfunction CoursesPage() {\n  const { data: courses, isLoading, error } = useGetCoursesQuery();\n  const [addCourse] = useAddCourseMutation();\n\n  if (isLoading) return <p>Loading...</p>;\n  if (error) return <p>Error loading courses</p>;\n  return <ul>{courses.map(c => <li key={c._id}>{c.title}</li>)}</ul>;\n}",
        keyPoints: [
          'RTK Query eliminates manual thunk + extraReducers boilerplate for API calls',
          'createApi + endpoints auto-generates React hooks (useGetXQuery, useAddXMutation)',
          'Automatically tracks loading/error/data state per endpoint — no manual flags needed',
          'Caches responses so multiple components share one network request for the same data',
          'tags/providesTags/invalidatesTags drive automatic refetching after mutations',
        ],
        quiz: [
          {
            question: 'What problem does RTK Query primarily solve compared to manual createAsyncThunk usage?',
            options: [
              'It replaces React entirely',
              'It eliminates repetitive boilerplate for loading/error/data state and adds automatic caching and refetching',
              'It removes the need for a backend API',
              'It only works with GraphQL',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does invalidatesTags on a mutation endpoint do?',
            options: [
              'It deletes data permanently from the server',
              'It marks a tag as stale, causing components using queries with the matching providesTags to automatically refetch',
              'It disables the mutation',
              'It has no effect on other queries',
            ],
            correctIndex: 1,
          },
          {
            question: 'If two different components both call useGetCoursesQuery() at the same time, what does RTK Query do?',
            options: [
              'It fires two separate, duplicate network requests',
              'It shares/deduplicates the request, so only one network call is made and both components get the same cached data',
              'It throws an error for duplicate hook usage',
              'Only one component receives any data',
            ],
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
    question: 'What is the flux architecture pattern that Redux is based on?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Flux is a unidirectional data flow pattern: Action → Dispatcher → Store → View. Redux simplifies this to Action → Reducer → Store → View. Data flows one way, making state changes predictable and easy to trace. Components dispatch actions; reducers produce a new state; components re-render from the new state.',
      hinglish:
        'Flux unidirectional data flow pattern hai: Action → Dispatcher → Store → View. Redux ise simplify karta hai Action → Reducer → Store → View mein. Data ek hi direction mein flow karta hai, state changes predictable aur trace karna easy hota hai. Components actions dispatch karte hain; reducers naya state produce karte hain; components naye state se re-render hote hain.',
    },
  },
];
