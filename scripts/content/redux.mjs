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
            frequency: 'common',
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
            frequency: 'common',
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

  // ─── Redux Core ───────────────────────────────────────────────
  {
    question: 'What are the three principles of Redux?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'SINGLE SOURCE OF TRUTH — the whole application state lives in one store, making it easy to inspect, persist, and reason about. STATE IS READ-ONLY — the only way to change it is dispatching an action describing what happened, so nothing mutates state behind your back. CHANGES ARE MADE BY PURE FUNCTIONS — reducers take the previous state and an action and return the next state, with no side effects, which is what makes time-travel debugging and reliable testing possible.',
      hinglish:
        'SINGLE SOURCE OF TRUTH — poori application state ek store mein rehti hai, jisse inspect, persist, aur samajhna easy hota hai. STATE IS READ-ONLY — ise badalne ka ek hi tareeka hai ek action dispatch karna jo bataye ki kya hua, isliye kuch bhi tumhari peeth peeche state mutate nahi karta. CHANGES PURE FUNCTIONS SE HOTE HAIN — reducers pichhli state aur ek action lekar agli state return karte hain, bina side effects ke, jisse time-travel debugging aur reliable testing possible hoti hai.',
    },
  },
  {
    question: 'Why must reducers be pure functions?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A pure reducer returns the same output for the same input and performs no side effects — no API calls, no `Math.random()`, no `Date.now()`, no mutation of arguments. This is what makes the state predictable: you can replay a sequence of actions and get exactly the same state, which is precisely how time-travel debugging and hot reloading work. Impurity breaks those tools, makes tests flaky, and can cause React to render stale or inconsistent output.',
      hinglish:
        'Ek pure reducer same input ke liye same output deta hai aur koi side effects nahi karta — na API calls, na `Math.random()`, na `Date.now()`, na arguments ka mutation. Isi se state predictable banti hai: tum actions ka ek sequence replay karke bilkul wahi state paa sakte ho, jo theek wahi hai jaise time-travel debugging aur hot reloading kaam karte hain. Impurity un tools ko todti hai, tests ko flaky banati hai, aur React ko stale ya inconsistent output render karwa sakti hai.',
    },
  },
  {
    question: 'What is Redux Toolkit and why is it the recommended approach?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Redux Toolkit (RTK) is the official, opinionated way to write Redux. It removes the boilerplate that made classic Redux painful: `createSlice` generates action creators and action types from your reducers, `configureStore` sets up the store with thunk middleware and DevTools by default, and Immer lets you write apparently-mutating code that produces immutable updates safely. It also adds `createAsyncThunk` and RTK Query. Plain hand-written Redux is now considered legacy for new code.',
      hinglish:
        'Redux Toolkit (RTK) Redux likhne ka official, opinionated tareeka hai. Ye wo boilerplate hataata hai jisne classic Redux ko dukhdayi banaya tha: `createSlice` tumhare reducers se action creators aur action types generate karta hai, `configureStore` store ko thunk middleware aur DevTools ke saath default se set karta hai, aur Immer tumhe apparently-mutating code likhne deta hai jo safely immutable updates produce karta hai. Ye `createAsyncThunk` aur RTK Query bhi deta hai. Naye code ke liye plain haath se likha Redux ab legacy maana jaata hai.',
    },
  },
  {
    question: 'How does createSlice work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`createSlice` takes a name, an initial state, and an object of reducer functions, then GENERATES the action types and action creators automatically — a reducer called `increment` in a slice named `counter` produces the action type `counter/increment`. It returns `{ reducer, actions }`, which you wire into `configureStore` and dispatch from components. Because it wraps reducers in Immer, you write `state.value += 1` directly, and Immer produces a correct immutable update underneath.',
      hinglish:
        '`createSlice` ek name, ek initial state, aur reducer functions ka ek object leta hai, phir action types aur action creators automatically GENERATE karta hai — `counter` naam ke slice mein `increment` naam ka ek reducer action type `counter/increment` banata hai. Ye `{ reducer, actions }` return karta hai, jise tum `configureStore` mein wire karte ho aur components se dispatch karte ho. Kyunki ye reducers ko Immer mein wrap karta hai, tum seedha `state.value += 1` likhte ho, aur Immer neeche ek correct immutable update banata hai.',
    },
  },
  {
    question: 'How does Immer let you write mutating code safely in Redux Toolkit?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Immer gives your reducer a DRAFT — a Proxy wrapping the current state that records every mutation you perform. At the end it produces a new immutable state, structurally sharing every unchanged branch so the update is cheap. The critical rule is consistency: either mutate the draft OR return a new value, never both in the same reducer. Also note Immer only applies inside RTK reducers and `createReducer` — it does not make mutation safe anywhere else in your app.',
      hinglish:
        'Immer tumhare reducer ko ek DRAFT deta hai — current state ko wrap karta ek Proxy jo tumhara har mutation record karta hai. Aakhir mein ye ek nayi immutable state banata hai, har unchanged branch ko structurally share karte hue taaki update sasta ho. Critical rule consistency hai: ya to draft mutate karo YA ek nayi value return karo, ek hi reducer mein dono kabhi nahi. Ye bhi note karo ki Immer sirf RTK reducers aur `createReducer` ke andar apply hota hai — ye tumhare app mein kahin aur mutation safe nahi banata.',
    },
  },
  {
    question: 'What is middleware in Redux and how does it work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Middleware sits between dispatching an action and it reaching the reducer, forming a chain where each layer can inspect, modify, delay, or stop the action. Its shape is a curried triple: `store => next => action`, and calling `next(action)` passes control to the next layer. This is how logging, crash reporting, and async handling are added without touching reducers. Redux Thunk is middleware that simply checks whether the action is a FUNCTION and, if so, calls it with `dispatch` and `getState`.',
      hinglish:
        'Middleware ek action dispatch hone aur uske reducer tak pahunchne ke beech baithta hai, ek chain banate hue jahan har layer action ko inspect, modify, delay, ya rok sakti hai. Iska shape ek curried triple hai: `store => next => action`, aur `next(action)` call karna control agli layer ko de deta hai. Isi se logging, crash reporting, aur async handling bina reducers ko chhue add hote hain. Redux Thunk ek middleware hai jo bas check karta hai ki action ek FUNCTION hai ya nahi aur agar hai to use `dispatch` aur `getState` ke saath call kar deta hai.',
    },
  },
  {
    question: 'What is redux-thunk and when do you need it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Thunk lets you dispatch a FUNCTION instead of a plain object. That function receives `dispatch` and `getState`, so it can perform async work — fetch data, then dispatch a success or failure action — and read current state to decide whether the work is even needed. You need it because reducers must stay pure, so side effects have to live somewhere else. RTK includes thunk by default, and `createAsyncThunk` wraps the common pending/fulfilled/rejected pattern for you.',
      hinglish:
        'Thunk tumhe ek plain object ke bajaye ek FUNCTION dispatch karne deta hai. Wo function `dispatch` aur `getState` receive karta hai, isliye wo async kaam kar sakta hai — data fetch karo, phir ek success ya failure action dispatch karo — aur ye decide karne ke liye current state padh sakta hai ki kaam zaroori bhi hai ya nahi. Ye isliye chahiye kyunki reducers ko pure rehna hai, isliye side effects ko kahin aur rehna padta hai. RTK thunk default se include karta hai, aur `createAsyncThunk` common pending/fulfilled/rejected pattern tumhare liye wrap kar deta hai.',
    },
  },
  {
    question: 'What is createAsyncThunk and what does it generate?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`createAsyncThunk` takes a type prefix and an async function, then generates THREE action types — `pending`, `fulfilled`, and `rejected` — dispatched automatically around the promise lifecycle. You handle them in `extraReducers` to set loading, data, and error state. It also gives you `rejectWithValue` for returning a structured error payload, `condition` for skipping a request that is unnecessary, and an abort signal for cancellation. It removes almost all hand-written async boilerplate.',
      hinglish:
        '`createAsyncThunk` ek type prefix aur ek async function leta hai, phir TEEN action types generate karta hai — `pending`, `fulfilled`, aur `rejected` — jo promise lifecycle ke aas-paas automatically dispatch hote hain. Tum unhe `extraReducers` mein handle karke loading, data, aur error state set karte ho. Ye tumhe ek structured error payload return karne ke liye `rejectWithValue` bhi deta hai, ek gair-zaroori request skip karne ke liye `condition`, aur cancellation ke liye ek abort signal. Ye almost saara haath se likha async boilerplate hataata hai.',
    },
  },
  {
    question: 'What is the difference between reducers and extraReducers in createSlice?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`reducers` defines actions the slice OWNS — RTK generates action creators for each, named `sliceName/reducerName`. `extraReducers` responds to actions defined ELSEWHERE: thunk lifecycle actions from `createAsyncThunk`, or actions belonging to another slice, without generating any new action creators. This distinction is what lets multiple slices react to the same action, which is a genuine strength of Redux over per-component state — for example every slice clearing itself on a logout action.',
      hinglish:
        '`reducers` un actions ko define karta hai jo slice ke APNE hain — RTK har ek ke liye action creator generate karta hai, `sliceName/reducerName` naam se. `extraReducers` KAHIN AUR define kiye actions pe react karta hai: `createAsyncThunk` se thunk lifecycle actions, ya doosre slice ke actions, bina koi naya action creator banaye. Yahi distinction multiple slices ko ek hi action pe react karne deta hai, jo per-component state ke upar Redux ki ek genuine strength hai — jaise har slice ka ek logout action pe khud ko clear kar lena.',
    },
  },
  {
    question: 'What are selectors and why should you use them?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A selector is a function that extracts a piece of state — `state => state.cart.items`. Using them centralises knowledge of the state SHAPE in one place, so restructuring the store means changing the selectors rather than every component. They also let you colocate derived logic, such as computing a cart total, so it is written once and tested once. Combined with memoization they prevent recomputation and unnecessary re-renders.',
      hinglish:
        'Ek selector ek function hai jo state ka ek hissa nikaalta hai — `state => state.cart.items`. Inhe use karna state ke SHAPE ka gyaan ek jagah centralise karta hai, isliye store restructure karne ka matlab har component ke bajaye selectors badalna hai. Ye tumhe derived logic ek jagah rakhne bhi dete hain, jaise ek cart total compute karna, taaki wo ek baar likha aur ek baar test ho. Memoization ke saath ye recomputation aur gair-zaroori re-renders rokte hain.',
    },
  },
  {
    question: 'What is createSelector and why does memoization matter?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`createSelector` from Reselect builds a memoized selector: it recomputes only when its input selectors return different values by reference. This matters because `useSelector` re-renders when its result changes by reference — so a selector that does `items.filter(...)` returns a NEW array every call and re-renders the component on every store update, even unrelated ones. Memoizing returns the same array reference until the inputs genuinely change, which fixes that entire class of performance bug.',
      hinglish:
        'Reselect ka `createSelector` ek memoized selector banata hai: ye sirf tab recompute karta hai jab uske input selectors reference se alag values return karein. Ye isliye matter karta hai kyunki `useSelector` tab re-render karta hai jab uska result reference se badle — isliye `items.filter(...)` karne wala ek selector har call pe ek NAYA array return karta hai aur har store update pe component re-render karta hai, chahe wo unrelated ho. Memoize karna tab tak wahi array reference return karta hai jab tak inputs genuinely na badlein, jo us poori performance bug class ko fix karta hai.',
    },
  },
  {
    question: 'How does useSelector decide when to re-render a component?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'After every dispatched action, `useSelector` runs your selector and compares the result to the previous one using strict REFERENCE equality (`===`). If it differs, the component re-renders. So returning primitives is safe, but returning a newly-created object or array — `useSelector(s => ({ a: s.a, b: s.b }))` — re-renders on every action. Fixes: select individual fields with separate calls, memoize with `createSelector`, or pass a custom equality function such as `shallowEqual`.',
      hinglish:
        'Har dispatch hue action ke baad, `useSelector` tumhara selector chalata hai aur result ko pichhle se strict REFERENCE equality (`===`) se compare karta hai. Agar farak ho, component re-render hota hai. Isliye primitives return karna safe hai, par ek naya bana object ya array return karna — `useSelector(s => ({ a: s.a, b: s.b }))` — har action pe re-render karta hai. Fixes: alag calls se individual fields select karo, `createSelector` se memoize karo, ya `shallowEqual` jaisa ek custom equality function pass karo.',
    },
  },
  {
    question: 'What is RTK Query and what problem does it solve?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'RTK Query is a data-fetching and caching layer built into Redux Toolkit. You declare endpoints, and it generates React hooks that handle loading and error state, caching, deduplication of identical in-flight requests, background refetching, and cache invalidation via tags. The point is that most Redux code historically existed just to store SERVER data — which is cache, not application state. RTK Query removes that entire category of hand-written slices, thunks, and loading flags.',
      hinglish:
        'RTK Query Redux Toolkit mein bana ek data-fetching aur caching layer hai. Tum endpoints declare karte ho, aur ye React hooks generate karta hai jo loading aur error state, caching, ek jaisi in-flight requests ki deduplication, background refetching, aur tags se cache invalidation handle karte hain. Baat ye hai ki historically zyadatar Redux code sirf SERVER data store karne ke liye tha — jo cache hai, application state nahi. RTK Query haath se likhe slices, thunks, aur loading flags ki wo poori category hata deta hai.',
    },
  },
  {
    question: 'How does cache invalidation work in RTK Query?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Queries declare `providesTags` describing the data they hold, and mutations declare `invalidatesTags` describing what they change. When a mutation succeeds, RTK Query automatically refetches every active query whose tags were invalidated — so adding a todo refreshes the todo list without any manual code. Tags can be granular, using an id, so updating one item does not refetch unrelated data. This declarative approach replaces the fragile pattern of manually refetching after every mutation.',
      hinglish:
        'Queries `providesTags` declare karti hain jo bataye ki wo kaunsa data rakhti hain, aur mutations `invalidatesTags` declare karte hain jo bataye ki wo kya badalte hain. Ek mutation successful hone pe, RTK Query automatically har us active query ko refetch karta hai jiske tags invalidate hue — isliye ek todo add karna todo list refresh kar deta hai bina kisi manual code ke. Tags ek id se granular ho sakte hain, isliye ek item update karna unrelated data refetch nahi karta. Ye declarative approach har mutation ke baad manually refetch karne ke fragile pattern ko replace karta hai.',
    },
  },
  {
    question: 'What is optimistic update and how do you implement it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An optimistic update changes the UI IMMEDIATELY, assuming the server will succeed, then rolls back if it fails — so a like button feels instant instead of waiting for a round trip. In RTK Query you use `onQueryStarted` with `updateQueryData` to patch the cache, and call `patchResult.undo()` in the catch block. The trade is UX versus correctness: it is right for high-success, low-stakes actions such as likes or reordering, and wrong for payments or anything where a silent revert would confuse or mislead the user.',
      hinglish:
        'Ek optimistic update UI ko TURANT badal deta hai, ye maan kar ki server safal hoga, phir fail hone pe rollback karta hai — isliye ek like button ek round trip ka intezaar karne ke bajaye instant lagta hai. RTK Query mein tum cache patch karne ke liye `onQueryStarted` ke saath `updateQueryData` use karte ho, aur catch block mein `patchResult.undo()` call karte ho. Trade UX versus correctness hai: ye likes ya reordering jaise high-success, low-stakes actions ke liye sahi hai, aur payments ya kisi bhi aisi cheez ke liye galat jahan ek silent revert user ko confuse ya mislead kare.',
    },
  },
  {
    question: 'What is Zustand and how does it differ from Redux?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Zustand is a small state library built on hooks. You call `create()` with a function returning both state and the functions that update it, then read it with a selector hook — no provider, no actions, no reducers, no dispatch. Compared to Redux it is far less code and easier to learn, and it re-renders only components whose selected slice changed. What you give up is the strict action log, so DevTools time travel and the "every change is a described event" auditability are weaker.',
      hinglish:
        'Zustand hooks pe bani ek chhoti state library hai. Tum `create()` ko ek aise function ke saath call karte ho jo state aur use update karne wale functions dono return kare, phir ek selector hook se padhte ho — na provider, na actions, na reducers, na dispatch. Redux ke muqable ye bahut kam code aur seekhne mein easier hai, aur ye sirf un components ko re-render karta hai jinka selected slice badla. Jo tum khote ho wo strict action log hai, isliye DevTools time travel aur "har change ek described event hai" wali auditability kamzor hai.',
    },
  },
  {
    question: 'When should you use Redux versus Zustand versus Context?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CONTEXT is for values that rarely change and are needed widely — theme, locale, the current user — since every consumer re-renders on any change. ZUSTAND fits most application state in small and medium apps: minimal boilerplate, good performance, no provider. REDUX earns its cost on large apps with complex state interactions, many contributors, and a real need for the action log, DevTools, and enforced conventions. The honest default today is Zustand or React Query, with Redux chosen deliberately rather than reflexively.',
      hinglish:
        'CONTEXT un values ke liye hai jo kam badalti hain aur widely chahiye — theme, locale, current user — kyunki har change pe har consumer re-render hota hai. ZUSTAND chhote aur medium apps mein zyadatar application state fit karta hai: minimal boilerplate, achhi performance, koi provider nahi. REDUX apna cost bade apps pe kamaata hai jahan complex state interactions hon, bahut contributors, aur action log, DevTools, aur enforced conventions ki ek real zaroorat. Aaj ka honest default Zustand ya React Query hai, Redux ko reflexively ke bajaye deliberately chunte hue.',
    },
  },
  {
    question: 'Why is Context not a replacement for a state management library?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Context is a DEPENDENCY INJECTION mechanism, not a state manager — it distributes a value but gives you no way to subscribe to part of it. Any change to the context value re-renders EVERY consumer, even ones reading a field that did not change, and Context has no built-in selector to avoid that. It also offers no middleware, no DevTools, and no async conventions. It is excellent for stable values and poor for frequently-updating state shared across many components.',
      hinglish:
        'Context ek DEPENDENCY INJECTION mechanism hai, ek state manager nahi — ye ek value distribute karta hai par tumhe uske ek hisse ko subscribe karne ka koi tareeka nahi deta. Context value mein koi bhi change HAR consumer ko re-render karta hai, un logon ko bhi jo ek aisi field padh rahe hain jo badli hi nahi, aur Context mein ise avoid karne ke liye koi built-in selector nahi. Ye na middleware deta hai, na DevTools, na async conventions. Ye stable values ke liye excellent hai aur bahut components mein shared frequently-updating state ke liye kharab.',
    },
  },
  {
    question: 'How do you normalise state in Redux and why?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Normalised state stores entities in a lookup object keyed by id, plus an array of ids for order — mirroring a database table rather than nested objects. It avoids duplicating the same entity in several places, which otherwise means updating it in each one and eventually missing one. Lookups become O(1) instead of a scan. RTK provides `createEntityAdapter`, which generates the reducers and selectors for this pattern, including sorted ordering and CRUD helpers.',
      hinglish:
        'Normalised state entities ko id se keyed ek lookup object mein store karti hai, plus order ke liye ids ka ek array — nested objects ke bajaye ek database table ko mirror karte hue. Ye ek hi entity ko kai jagah duplicate karne se bachata hai, jiska warna matlab hai har jagah use update karna aur aakhir mein ek bhool jaana. Lookups ek scan ke bajaye O(1) ho jaate hain. RTK `createEntityAdapter` deta hai, jo is pattern ke liye reducers aur selectors generate karta hai, sorted ordering aur CRUD helpers sameta.',
    },
  },
  {
    question: 'What is createEntityAdapter?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '`createEntityAdapter` generates a normalised `{ ids, entities }` structure along with prewritten CRUD reducers — `addOne`, `upsertMany`, `updateOne`, `removeAll` — and memoized selectors via `getSelectors`. It can keep ids sorted with a comparer. Its value is that normalised state is verbose and repetitive to hand-write correctly, and the adapter makes it a few lines while guaranteeing the update logic is consistent across every slice using it.',
      hinglish:
        '`createEntityAdapter` ek normalised `{ ids, entities }` structure banata hai saath mein pehle se likhe CRUD reducers — `addOne`, `upsertMany`, `updateOne`, `removeAll` — aur `getSelectors` se memoized selectors. Ye ek comparer se ids sorted rakh sakta hai. Iski value ye hai ki normalised state ko haath se sahi likhna verbose aur repetitive hai, aur adapter use kuch lines banata hai jabki guarantee karta hai ki update logic use karne wale har slice mein consistent hai.',
    },
  },
  {
    question: 'What is the Redux DevTools and what can you do with it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The DevTools extension shows every dispatched action, the state diff it produced, and the full state tree at any point. You can TIME TRAVEL — jump back to any earlier state — replay actions, skip individual ones to see their effect, and export a session to attach to a bug report so someone else can reproduce it exactly. This traceability is one of Redux\'s strongest arguments, and `configureStore` enables it in development automatically.',
      hinglish:
        'DevTools extension har dispatch hua action, usse bana state diff, aur kisi bhi point pe poora state tree dikhata hai. Tum TIME TRAVEL kar sakte ho — kisi bhi pehle ki state pe wapas jao — actions replay kar sakte ho, unka asar dekhne ke liye individual actions skip kar sakte ho, aur ek session export karke ek bug report se attach kar sakte ho taaki koi aur use bilkul reproduce kar sake. Ye traceability Redux ke sabse strong arguments mein se ek hai, aur `configureStore` ise development mein automatically enable karta hai.',
    },
  },
  {
    question: 'How do you persist Redux state across page reloads?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use `redux-persist`, or write a subscriber that serialises the store to localStorage and rehydrates it in `preloadedState`. Two disciplines matter. First, WHITELIST what you persist — persisting server cache or transient UI state causes stale data to reappear after a reload. Second, version your persisted shape and provide a migration, because a saved state from an older release can crash a newer reducer. And never persist tokens or sensitive data to localStorage, which is readable by any XSS.',
      hinglish:
        '`redux-persist` use karo, ya ek subscriber likho jo store ko localStorage mein serialise kare aur `preloadedState` mein rehydrate kare. Do disciplines matter karti hain. Pehla, jo persist karte ho use WHITELIST karo — server cache ya transient UI state persist karna reload ke baad stale data wapas le aata hai. Doosra, apne persisted shape ko version do aur ek migration do, kyunki ek purani release ki saved state ek naye reducer ko crash kar sakti hai. Aur tokens ya sensitive data kabhi localStorage mein persist mat karo, jo kisi bhi XSS se padha ja sakta hai.',
    },
  },
  {
    question: 'What is the difference between dispatching an action and calling a function?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A direct function call goes to ONE known recipient. A dispatched action is BROADCAST — every reducer sees it and each decides independently whether to respond, so a single `logout` action can clear five slices without any of them knowing about the others. Actions are also plain serialisable objects, which is what makes logging, replay, and time travel possible. The cost is indirection: you cannot tell from the dispatch site alone what will actually happen.',
      hinglish:
        'Ek direct function call EK known recipient tak jaati hai. Ek dispatch hua action BROADCAST hota hai — har reducer use dekhta hai aur har ek khud decide karta hai ki respond kare ya nahi, isliye ek single `logout` action paanch slices clear kar sakta hai bina kisi ke doosre ke baare mein jaane. Actions plain serialisable objects bhi hain, jisse logging, replay, aur time travel possible hote hain. Cost indirection hai: tum sirf dispatch site dekh kar nahi bata sakte ki actually kya hoga.',
    },
  },
  {
    question: 'Why must actions be serialisable?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Serialisable actions can be logged, stored, sent over the network, and replayed — which is exactly what DevTools time travel, session recording, and crash reports depend on. Putting a Promise, a class instance, a function, or a Date into an action breaks that guarantee, and RTK actively warns about it in development. The correct pattern is to put only plain data in actions and let middleware such as thunks hold the non-serialisable things.',
      hinglish:
        'Serialisable actions log ho sakte hain, store ho sakte hain, network pe bheje ja sakte hain, aur replay ho sakte hain — jis pe theek DevTools time travel, session recording, aur crash reports depend karte hain. Ek Promise, ek class instance, ek function, ya ek Date action mein daalna wo guarantee todta hai, aur RTK development mein iske baare mein actively warn karta hai. Correct pattern ye hai ki actions mein sirf plain data daalo aur non-serialisable cheezein thunks jaise middleware ko rakhne do.',
    },
  },
  {
    question: 'What is the difference between local component state and global state?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Local state with `useState` belongs to one component and dies with it — form inputs, a dropdown\'s open flag, a hover state. Global state is shared across distant parts of the tree — the authenticated user, a shopping cart, a theme. The rule of thumb is to start local and lift only when something genuinely needs to be read or written from elsewhere. Putting everything in a global store is a real and common mistake: it adds indirection, hurts performance, and makes components harder to reuse.',
      hinglish:
        '`useState` wali local state ek component ki hoti hai aur uske saath mar jaati hai — form inputs, ek dropdown ka open flag, ek hover state. Global state tree ke door hisson mein shared hoti hai — authenticated user, ek shopping cart, ek theme. Rule of thumb ye hai ki local se shuru karo aur tabhi lift karo jab kisi cheez ko genuinely kahin aur se padhna ya likhna ho. Sab kuch ek global store mein daalna ek real aur common mistake hai: ye indirection add karta hai, performance kharab karta hai, aur components ko reuse karna mushkil banata hai.',
    },
  },
  {
    question: 'Should server data live in Redux?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Usually not, in the sense of hand-written slices. Server data is a CACHE with its own concerns — staleness, refetching, deduplication, invalidation, retries — and reimplementing all that in reducers is a large amount of code that a dedicated tool already solves. Use RTK Query or React Query for it, and keep Redux for genuine client state: UI mode, selections, wizards, and anything the server does not own. Recognising that "loading, data, error" boilerplate is a solved problem is the key insight.',
      hinglish:
        'Usually nahi, haath se likhe slices ke sense mein. Server data ek CACHE hai apne concerns ke saath — staleness, refetching, deduplication, invalidation, retries — aur wo sab reducers mein dobara likhna bahut saara code hai jise ek dedicated tool pehle hi solve karta hai. Uske liye RTK Query ya React Query use karo, aur Redux ko genuine client state ke liye rakho: UI mode, selections, wizards, aur jo bhi server ka nahi hai. Ye pehchanana ki "loading, data, error" boilerplate ek solved problem hai — yahi key insight hai.',
    },
  },
  {
    question: 'How do you test Redux logic?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Reducers are the easiest thing in the codebase to test: they are pure, so you call them with a state and an action and assert the returned state — no mocks, no rendering. Selectors are equally simple, taking a state object and returning a value. Thunks need a mocked API and are tested by asserting the sequence of dispatched actions. For components, the recommended approach is rendering with a REAL store rather than mocking `useSelector`, which tests the wiring rather than your mocks.',
      hinglish:
        'Reducers codebase mein test karne ki sabse easy cheez hain: wo pure hain, isliye tum unhe ek state aur ek action ke saath call karke returned state assert karte ho — na mocks, na rendering. Selectors utne hi simple hain, ek state object lekar ek value return karte hue. Thunks ko ek mocked API chahiye aur unhe dispatch hue actions ka sequence assert karke test kiya jaata hai. Components ke liye, recommended approach `useSelector` ko mock karne ke bajaye ek REAL store ke saath render karna hai, jo tumhare mocks ke bajaye wiring test karta hai.',
    },
  },
  {
    question: 'What is the difference between useSelector and connect?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`connect` is the legacy higher-order component API: it wraps your component and injects state and dispatch as props via `mapStateToProps` and `mapDispatchToProps`. `useSelector` and `useDispatch` are the modern hooks API — less code, no wrapper component in the tree, better TypeScript inference, and easier composition. `connect` still works and is fine in older codebases; hooks are the recommendation for all new code, and mixing both in one project is acceptable during a migration.',
      hinglish:
        '`connect` legacy higher-order component API hai: ye tumhare component ko wrap karke `mapStateToProps` aur `mapDispatchToProps` se state aur dispatch props ki tarah inject karta hai. `useSelector` aur `useDispatch` modern hooks API hain — kam code, tree mein koi wrapper component nahi, better TypeScript inference, aur easier composition. `connect` abhi bhi kaam karta hai aur purane codebases mein theek hai; hooks saare naye code ke liye recommendation hain, aur ek migration ke dauraan ek project mein dono mix karna acceptable hai.',
    },
  },
  {
    question: 'How do you type a Redux store with TypeScript?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Infer rather than hand-write: `type RootState = ReturnType<typeof store.getState>` and `type AppDispatch = typeof store.dispatch`. Then export pre-typed hooks — `useAppSelector` and `useAppDispatch` — so components never re-annotate. The reason to infer is that a manually maintained `RootState` drifts from the actual store the moment someone adds a slice, whereas inference is always correct. RTK is built to make this inference work end to end, including thunks.',
      hinglish:
        'Haath se likhne ke bajaye infer karo: `type RootState = ReturnType<typeof store.getState>` aur `type AppDispatch = typeof store.dispatch`. Phir pre-typed hooks export karo — `useAppSelector` aur `useAppDispatch` — taaki components kabhi dobara annotate na karein. Infer karne ki wajah ye hai ki ek manually maintain kiya `RootState` us pal actual store se hat jaata hai jab koi ek slice add karta hai, jabki inference hamesha correct hai. RTK ise end to end kaam karne ke liye bana hai, thunks sameta.',
    },
  },
  {
    question: 'What causes unnecessary re-renders in a Redux app and how do you fix them?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The dominant cause is a selector returning a NEW reference each call — an inline object, an array from `filter` or `map`, or `Object.values`. Since `useSelector` compares by reference, that re-renders on every action. Fixes: select primitives individually, memoize derived results with `createSelector`, pass `shallowEqual` for object results, and split large components so a change touches a smaller subtree. Profile with the React DevTools "highlight updates" option before optimising, so you fix the real cause.',
      hinglish:
        'Sabse bada karan ek selector ka har call pe ek NAYA reference return karna hai — ek inline object, `filter` ya `map` se ek array, ya `Object.values`. Kyunki `useSelector` reference se compare karta hai, wo har action pe re-render karta hai. Fixes: primitives ko individually select karo, derived results ko `createSelector` se memoize karo, object results ke liye `shallowEqual` pass karo, aur bade components ko split karo taaki ek change ek chhote subtree ko chhue. Optimise karne se pehle React DevTools ke "highlight updates" option se profile karo, taaki tum asli karan fix karo.',
    },
  },
  {
    question: 'What is state colocation and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'State colocation means keeping state as CLOSE as possible to where it is used, and lifting it only when a genuine need appears. It matters because state placed high in the tree re-renders everything below it, makes components dependent on a specific store shape, and turns simple components into ones that cannot be reused or tested in isolation. The practical rule: start with `useState` in the component, and move it up or into a store only when a second consumer actually exists.',
      hinglish:
        'State colocation ka matlab hai state ko utna PAAS rakhna jitna possible ho jahan wo use hoti hai, aur sirf tab lift karna jab ek genuine zaroorat aaye. Ye isliye matter karta hai kyunki tree mein upar rakhi state apne neeche sab kuch re-render karti hai, components ko ek specific store shape pe dependent banati hai, aur simple components ko aise components mein badal deti hai jo reuse ya isolation mein test nahi ho sakte. Practical rule: component mein `useState` se shuru karo, aur ise upar ya ek store mein tabhi le jao jab ek doosra consumer actually exist kare.',
    },
  },
  {
    question: 'How do you handle forms with Redux?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Usually you should not put form state in Redux at all. Every keystroke dispatching an action means a store update and a re-render for a value nobody else needs, and it was the reason `redux-form` became notorious for performance problems. Use local state or a dedicated library such as React Hook Form, which keeps inputs uncontrolled and re-renders minimally, and dispatch to Redux only on SUBMIT. The exception is a genuinely multi-step wizard whose progress must survive navigation.',
      hinglish:
        'Usually tumhe form state Redux mein daalni hi nahi chahiye. Har keystroke ka ek action dispatch karna matlab ek store update aur ek re-render ek aisi value ke liye jo kisi aur ko chahiye hi nahi, aur isi wajah se `redux-form` performance problems ke liye badnaam hua tha. Local state ya React Hook Form jaisi ek dedicated library use karo, jo inputs ko uncontrolled rakhti hai aur minimally re-render karti hai, aur Redux mein sirf SUBMIT pe dispatch karo. Exception ek genuinely multi-step wizard hai jiski progress navigation ke baad bhi bachni chahiye.',
    },
  },
  {
    question: 'What is redux-saga and how does it compare to thunks?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Saga handles side effects using GENERATORS: you yield declarative effect objects such as `call`, `put`, and `takeLatest`, and the middleware performs them. Because effects are plain descriptions, tests can assert them without mocking anything. It excels at complex async orchestration — cancellation, debouncing, racing, retries, and long-running background flows. The cost is a steep learning curve and considerably more code. Thunks cover the vast majority of applications, and sagas are worth it only for genuinely complex flows.',
      hinglish:
        'Saga side effects ko GENERATORS se handle karta hai: tum `call`, `put`, aur `takeLatest` jaise declarative effect objects yield karte ho, aur middleware unhe perform karta hai. Kyunki effects plain descriptions hain, tests unhe bina kuch mock kiye assert kar sakte hain. Ye complex async orchestration mein excel karta hai — cancellation, debouncing, racing, retries, aur lambe background flows. Cost ek steep learning curve aur kaafi zyada code hai. Thunks bahut badi majority applications cover karte hain, aur sagas sirf genuinely complex flows ke liye worth hain.',
    },
  },
  {
    question: 'What does the Redux store actually provide?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The store exposes three things: `getState()` returning the current state tree, `dispatch(action)` sending an action through the middleware chain to the reducers, and `subscribe(listener)` registering a callback that runs after every dispatch. That is the entire API — everything else, including React-Redux, is built on top of these three. `react-redux` uses `subscribe` internally to know when to re-run selectors, which is why you rarely call it yourself.',
      hinglish:
        'Store teen cheezein deta hai: `getState()` jo current state tree return karta hai, `dispatch(action)` jo ek action ko middleware chain se reducers tak bhejta hai, aur `subscribe(listener)` jo ek callback register karta hai jo har dispatch ke baad chalta hai. Yahi poora API hai — baaki sab kuch, `react-redux` sameta, in teen ke upar bana hai. `react-redux` andar `subscribe` use karta hai ye jaanne ke liye ki selectors kab dobara chalane hain, isiliye tum ise khud rarely call karte ho.',
    },
  },
  {
    question: 'What is combineReducers and how does state shape relate to it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`combineReducers` takes an object mapping keys to reducers and returns one root reducer, where each child reducer owns only the slice under its key. The resulting state shape mirrors that object exactly — a `user` key produces `state.user`. Each child receives every action, so multiple slices can respond to the same one. In RTK you pass the same map to `configureStore`\'s `reducer` field and it calls `combineReducers` for you.',
      hinglish:
        '`combineReducers` keys ko reducers se map karta ek object leta hai aur ek root reducer return karta hai, jahan har child reducer sirf apni key ke neeche wali slice ka maalik hai. Banne wali state shape us object ko bilkul mirror karti hai — ek `user` key `state.user` banati hai. Har child ko har action milta hai, isliye kai slices ek hi pe respond kar sakte hain. RTK mein tum wahi map `configureStore` ke `reducer` field mein pass karte ho aur wo tumhare liye `combineReducers` call karta hai.',
    },
  },
  {
    question: 'How do you reset the entire Redux store, for example on logout?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Wrap the root reducer: intercept a `logout` action and call the underlying reducer with `undefined` as the state, which makes every slice fall back to its own initial state. This is far more reliable than adding a logout case to every slice, since a new slice added later would silently be missed. Remember to clear persisted storage and any RTK Query cache too, otherwise the previous user\'s data reappears after the next reload.',
      hinglish:
        'Root reducer ko wrap karo: ek `logout` action intercept karo aur underlying reducer ko state ke roop mein `undefined` ke saath call karo, jisse har slice apni initial state pe wapas gir jaata hai. Ye har slice mein ek logout case add karne se bahut zyada reliable hai, kyunki baad mein add hui ek nayi slice silently chhoot jaati. Persisted storage aur koi bhi RTK Query cache bhi clear karna yaad rakho, warna agle reload ke baad pichhle user ka data wapas aa jaata hai.',
    },
  },
  {
    question: 'What is the Provider component in react-redux?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`Provider` makes the store available to every component below it, using React Context to pass the store instance down. It wraps the app once at the root. Note what it passes is the STORE object, not the state — so state changes do not re-render through Context. Instead `useSelector` subscribes to the store directly and re-renders only the components whose selected value changed, which is precisely why react-redux performs better than putting state in Context yourself.',
      hinglish:
        '`Provider` store ko apne neeche har component ke liye available karta hai, store instance neeche pass karne ke liye React Context use karte hue. Ye app ko root pe ek baar wrap karta hai. Note karo ki ye STORE object pass karta hai, state nahi — isliye state changes Context se re-render nahi karte. Uske bajaye `useSelector` store ko directly subscribe karta hai aur sirf un components ko re-render karta hai jinki selected value badli, jo theek wahi wajah hai ki react-redux khud Context mein state daalne se better perform karta hai.',
    },
  },
  {
    question: 'What is the flux standard action (FSA) convention?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'FSA specifies a consistent action shape: a required string `type`, an optional `payload` carrying the data, an optional `error` boolean, and optional `meta` for extra information not part of the payload. Following it means middleware and tooling can handle actions generically without knowing about your specific ones. RTK follows FSA — `createSlice` action creators produce `{ type, payload }`, and `prepare` lets you customise the payload and meta while keeping the shape.',
      hinglish:
        'FSA ek consistent action shape specify karta hai: ek required string `type`, data le jaata ek optional `payload`, ek optional `error` boolean, aur payload ka hissa na hone wali extra information ke liye optional `meta`. Ise follow karne ka matlab hai middleware aur tooling actions ko generically handle kar sakte hain bina tumhare specific actions ke baare mein jaane. RTK FSA follow karta hai — `createSlice` action creators `{ type, payload }` banate hain, aur `prepare` tumhe shape rakhte hue payload aur meta customise karne deta hai.',
    },
  },
  {
    question: 'What is the prepare callback in createSlice?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A `prepare` callback lets a reducer customise how its action payload is BUILT before the reducer runs, while keeping the reducer itself pure. The classic use is generating a value that a reducer must not generate — a `nanoid()` for a new item, or a `Date.now()` timestamp — since those would make the reducer impure and break replay. You write `{ reducer, prepare }` instead of a bare function, and `prepare` returns the `{ payload, meta }` object.',
      hinglish:
        'Ek `prepare` callback ek reducer ko ye customise karne deta hai ki reducer chalne se pehle uska action payload kaise BANE, jabki reducer khud pure rehta hai. Classic use ek aisi value generate karna hai jo ek reducer ko nahi karni chahiye — ek naye item ke liye ek `nanoid()`, ya ek `Date.now()` timestamp — kyunki wo reducer ko impure banate aur replay todte. Tum ek bare function ke bajaye `{ reducer, prepare }` likhte ho, aur `prepare` `{ payload, meta }` object return karta hai.',
    },
  },
  {
    question: 'How does Zustand avoid unnecessary re-renders?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Zustand components subscribe with a SELECTOR — `useStore(s => s.count)` — and re-render only when that selected value changes, comparing by reference like Redux. Selecting the whole store, `useStore(s => s)`, re-renders on every change and defeats the purpose. For selecting several fields at once, use `useShallow` so an object result is compared field by field rather than by reference. Since Zustand does not use Context for state, there is no provider-wide re-render at all.',
      hinglish:
        'Zustand components ek SELECTOR se subscribe karte hain — `useStore(s => s.count)` — aur sirf tab re-render karte hain jab wo selected value badle, Redux ki tarah reference se compare karte hue. Poora store select karna, `useStore(s => s)`, har change pe re-render karta hai aur maksad hi khatam kar deta hai. Ek saath kai fields select karne ke liye `useShallow` use karo taaki ek object result reference ke bajaye field by field compare ho. Kyunki Zustand state ke liye Context use nahi karta, koi provider-wide re-render hota hi nahi.',
    },
  },
  {
    question: 'How do you use middleware with Zustand?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Zustand ships composable middleware you wrap around the store creator: `devtools` connects it to Redux DevTools, `persist` saves state to storage with versioning and migration, `immer` allows mutating syntax, and `subscribeWithSelector` enables fine-grained subscriptions outside React. They compose by nesting, and the order matters — `devtools(persist(...))` is the conventional arrangement so DevTools sees the persisted actions.',
      hinglish:
        'Zustand composable middleware deta hai jise tum store creator ke around wrap karte ho: `devtools` ise Redux DevTools se jodta hai, `persist` state ko versioning aur migration ke saath storage mein save karta hai, `immer` mutating syntax allow karta hai, aur `subscribeWithSelector` React ke bahar fine-grained subscriptions enable karta hai. Wo nesting se compose hote hain, aur order matter karta hai — `devtools(persist(...))` conventional arrangement hai taaki DevTools persisted actions dekhe.',
    },
  },
  {
    question: 'What is the difference between Redux and React Query?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'They solve different problems and are often used together. React Query manages SERVER state: fetching, caching, staleness, background refetching, retries, and invalidation — everything about data you do not own. Redux manages CLIENT state: UI mode, selections, multi-step flows, and anything the server has no opinion about. Trying to make Redux do server caching means hand-writing what React Query already does well; trying to make React Query hold UI state misuses a cache.',
      hinglish:
        'Wo alag problems solve karte hain aur aksar saath use hote hain. React Query SERVER state manage karta hai: fetching, caching, staleness, background refetching, retries, aur invalidation — us data ke baare mein sab kuch jo tumhara nahi hai. Redux CLIENT state manage karta hai: UI mode, selections, multi-step flows, aur jo bhi server ke liye koi matlab nahi rakhta. Redux se server caching karwane ka matlab hai haath se wo likhna jo React Query pehle hi achha karta hai; React Query se UI state rakhwana ek cache ka galat istemaal hai.',
    },
  },
  {
    question: 'How do you handle errors in Redux async flows?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Store error state per slice or per request rather than one global flag, so two concurrent requests do not overwrite each other. With `createAsyncThunk`, handle the `rejected` case in `extraReducers` and use `rejectWithValue` to pass a structured, serialisable error rather than an Error instance. Clear the error when a new request starts, so a stale message does not linger. Distinguish expected failures such as validation from unexpected ones, since only the latter deserve a crash report.',
      hinglish:
        'Error state ko ek global flag ke bajaye per slice ya per request store karo, taaki do concurrent requests ek doosre ko overwrite na karein. `createAsyncThunk` ke saath, `extraReducers` mein `rejected` case handle karo aur ek Error instance ke bajaye ek structured, serialisable error pass karne ke liye `rejectWithValue` use karo. Ek nayi request shuru hone pe error clear karo, taaki ek purana message ruka na rahe. Validation jaisi expected failures ko unexpected se alag karo, kyunki sirf baad wali ek crash report ki haqdaar hai.',
    },
  },
  {
    question: 'Is Redux still relevant in modern React?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Yes, but its territory has genuinely shrunk. Server state moved to React Query and RTK Query, simple shared state moved to Zustand or Context, and server components in Next.js removed the need to hold some data on the client at all. Redux still earns its place in large applications with complex interdependent client state, many contributors needing enforced conventions, and a real need for the action log and DevTools. It is a deliberate choice now rather than the default.',
      hinglish:
        'Haan, par uska ilaaka genuinely chhota hua hai. Server state React Query aur RTK Query mein chali gayi, simple shared state Zustand ya Context mein, aur Next.js ke server components ne kuch data client pe rakhne ki zaroorat hi hata di. Redux abhi bhi bade applications mein apni jagah kamaata hai jahan complex interdependent client state ho, bahut contributors ko enforced conventions chahiye, aur action log aur DevTools ki ek real zaroorat ho. Ye ab default ke bajaye ek deliberate choice hai.',
    },
  },
  {
    question: 'What is the most common Redux anti-pattern you see?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Putting EVERYTHING in the store — form inputs, modal open flags, hover state, and server responses — under the belief that global state is inherently better organised. The costs are real: more boilerplate per feature, unnecessary re-renders, components that cannot be reused without the store, and a state tree so large nobody can reason about it. The corrective habit is to ask, for each piece of state, "who else genuinely needs to read or write this?" and keep it local when the answer is nobody.',
      hinglish:
        'SAB KUCH store mein daalna — form inputs, modal open flags, hover state, aur server responses — is vishwas mein ki global state apne aap behtar organised hoti hai. Costs real hain: per feature zyada boilerplate, gair-zaroori re-renders, aise components jo store ke bina reuse nahi ho sakte, aur ek itna bada state tree ki koi use samajh hi na paaye. Sudhaarne wali aadat ye poochhna hai, har state ke tukde ke liye, "aur kaun ise genuinely padhna ya likhna chahta hai?" aur jawab koi nahi hone pe use local rakhna.',
    },
  },
];
