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
