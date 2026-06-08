// React.js curriculum — beginner -> intermediate -> advanced.
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
  title: 'React.js',
  slug: 'react',
  description:
    'Modern UI library — components, hooks, state aur performance. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '⚛️',
  tags: ['react', 'frontend', 'javascript', 'mern'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 6,
};

const beginner = [
  {
    title: 'React Basics',
    level: 'beginner',
    description: 'React kya hai, JSX, components aur props.',
    concepts: [
      {
        title: 'What is React',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'React is a JavaScript library for building user interfaces from reusable components. It is declarative — you describe what the UI should look like for a given state, and React efficiently updates the DOM when the state changes. It uses a Virtual DOM to make updates fast.',
          hinglish:
            'React user interfaces banane ki ek JavaScript library hai jo reusable components se bani hoti hai. Ye declarative hai — tum batate ho ki kisi state pe UI kaisa dikhna chahiye, aur state badalne par React DOM ko efficiently update karta hai. Fast updates ke liye ye Virtual DOM use karta hai.',
        },
        dailyLifeExample:
          'React Lego set jaisa hai — chhote reusable blocks (components) jodke poora UI banao. Aur tum sirf batate ho "ye dikhna chahiye"; React khud kaam karta hai ki screen pe kya badalna hai.',
        codeExample:
          'function App() {\n  return <h1>Hello, Learnverse!</h1>;\n}\n\n// You describe the UI; React renders & updates it.',
        keyPoints: [
          'A library for building UIs from components',
          'Declarative: describe UI for a state',
          'Component-based & reusable',
          'Uses a Virtual DOM for fast updates',
        ],
        quiz: [
          {
            question: 'React is a…',
            options: ['Database', 'JavaScript library for UIs', 'CSS framework', 'Programming language'],
            correctIndex: 1,
          },
          {
            question: 'React is described as…',
            options: ['Imperative', 'Declarative', 'Procedural', 'Static'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a library and a framework, and which is React?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'A library is a toolkit you call when you need it — you stay in control of the flow. A framework calls your code and dictates the structure (inversion of control). React is a library focused on the view layer; you add routing, data fetching, etc. yourself, which is why it is flexible but needs supporting choices.',
              hinglish:
                'Library ek toolkit hai jise zaroorat pe tum call karte ho — flow tumhare control mein. Framework tumhare code ko call karta hai aur structure decide karta hai (inversion of control). React ek library hai jo view layer pe focus karti hai; routing, data fetching, etc. tum khud add karte ho, isliye ye flexible hai par supporting choices chahiye.',
            },
          },
        ],
      },
      {
        title: 'JSX',
        difficulty: 'easy',
        tags: ['jsx', 'basics'],
        explanation: {
          english:
            'JSX lets you write HTML-like markup inside JavaScript. It is not HTML — it compiles to React.createElement calls. Rules: return a single parent (or a Fragment <>), use className instead of class, close every tag, and embed JS expressions with curly braces { }.',
          hinglish:
            'JSX se tum JavaScript ke andar HTML-jaisa markup likh sakte ho. Ye HTML nahi hai — ye React.createElement calls mein compile hota hai. Rules: ek single parent return karo (ya Fragment <>), class ki jagah className, har tag close karo, aur JS expressions ko curly braces { } mein daalo.',
        },
        dailyLifeExample:
          'JSX Hinglish jaisa hai — do languages (HTML + JS) ka mix jo padhne mein natural lagta hai. Bilkul HTML jaisa dikhta hai par power JavaScript ki hai.',
        codeExample:
          'const name = "Abhi";\nconst el = (\n  <div className="card">\n    <h2>Hello {name}</h2>\n    {name && <p>Welcome back!</p>}\n  </div>\n);',
        keyPoints: [
          'HTML-like syntax that compiles to JS',
          'Return one parent or a Fragment <>',
          'class -> className, for -> htmlFor',
          'Embed expressions with { }',
        ],
        quiz: [
          {
            question: 'In JSX, the HTML class attribute becomes…',
            options: ['class', 'className', 'classes', 'cssClass'],
            correctIndex: 1,
          },
          {
            question: 'How do you embed a JS expression in JSX?',
            options: ['${ }', '{{ }}', '{ }', '<% %>'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Components',
        difficulty: 'easy',
        tags: ['components'],
        explanation: {
          english:
            'Components are independent, reusable pieces of UI. A modern React component is just a JavaScript function that returns JSX. Component names must start with a capital letter. You compose small components into bigger ones to build a whole app.',
          hinglish:
            'Components independent, reusable UI ke tukde hain. Modern React component bas ek JavaScript function hai jo JSX return karta hai. Component ke naam capital letter se shuru hone chahiye. Chhote components ko bade mein jodke poori app banti hai.',
        },
        dailyLifeExample:
          'Components ghar ke parts jaise hain — darwaza, khidki, deewar. Ek baar banao, jahan chaaho use karo. Poora ghar (app) inhi parts se banta hai.',
        codeExample:
          'function Avatar({ src }) {\n  return <img className="avatar" src={src} />;\n}\n\nfunction Profile() {\n  return (\n    <div>\n      <Avatar src="a.jpg" />\n      <Avatar src="b.jpg" />\n    </div>\n  );\n}',
        keyPoints: [
          'Reusable, independent UI pieces',
          'A function that returns JSX',
          'Names must be Capitalized',
          'Compose small components into bigger ones',
        ],
        quiz: [
          {
            question: 'A modern React component is…',
            options: ['A CSS class', 'A function returning JSX', 'An HTML file', 'A database table'],
            correctIndex: 1,
          },
          {
            question: 'Component names must start with…',
            options: ['a lowercase letter', 'a capital letter', 'a number', 'an underscore'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Props',
        difficulty: 'easy',
        tags: ['props'],
        explanation: {
          english:
            'Props (properties) pass data from a parent component to a child, like function arguments. Props are read-only — a child must never modify its props. This one-way (top-down) data flow makes apps predictable.',
          hinglish:
            'Props (properties) parent component se child ko data pass karte hain, function arguments ki tarah. Props read-only hote hain — child kabhi apne props change nahi kar sakta. Ye one-way (upar se neeche) data flow apps ko predictable banata hai.',
        },
        dailyLifeExample:
          'Props ek courier parcel jaisa hai jo parent child ko bhejta hai — child use kholke use kar sakta hai par bhej ne wale ka original nahi badal sakta. Data hamesha upar se neeche bahta hai.',
        codeExample:
          'function Welcome({ name, role }) {\n  return <p>{name} — {role}</p>;\n}\n\n// parent passes props\n<Welcome name="Abhi" role="Developer" />',
        keyPoints: [
          'Pass data parent -> child',
          'Props are read-only (immutable in child)',
          'One-way (top-down) data flow',
          'Destructure props for cleaner code',
        ],
        quiz: [
          {
            question: 'Can a child component modify its own props?',
            options: ['Yes', 'No, props are read-only', 'Only strings', 'Only with state'],
            correctIndex: 1,
          },
          {
            question: 'Data flow in React is…',
            options: ['Two-way', 'Bottom-up', 'One-way top-down', 'Random'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between props and state?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Props are passed into a component from its parent and are read-only within the component. State is data owned and managed inside a component that can change over time (via setState/useState) and triggers a re-render when updated. In short: props are external and immutable to the child; state is internal and mutable.',
              hinglish:
                'Props parent se component mein aate hain aur component ke andar read-only hote hain. State component ke andar ka data hai jo time ke saath badal sakta hai (setState/useState se) aur update hone par re-render trigger karta hai. Short mein: props external aur child ke liye immutable; state internal aur mutable.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'State & Events',
    level: 'beginner',
    description: 'Interactivity — useState, events, conditional rendering, lists.',
    concepts: [
      {
        title: 'useState Hook',
        difficulty: 'easy',
        tags: ['state', 'hooks'],
        explanation: {
          english:
            'useState adds state to a function component. It returns an array: the current value and a setter function. Calling the setter updates the value and re-renders the component. Never mutate state directly — always use the setter with a new value.',
          hinglish:
            'useState function component mein state add karta hai. Ye ek array return karta hai: current value aur ek setter function. Setter call karne se value update hoti hai aur component re-render hota hai. State ko kabhi seedha mutate mat karo — hamesha setter ke saath nayi value do.',
        },
        dailyLifeExample:
          'useState ek scoreboard jaisa hai — current score (value) dikhta hai aur ek button (setter) se badalta hai. Jaise hi score badle, board apne aap update ho jaata hai.',
        codeExample:
          'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}',
        keyPoints: [
          'Adds state to function components',
          'Returns [value, setter]',
          'Setter updates value AND re-renders',
          'Never mutate state directly',
        ],
        quiz: [
          {
            question: 'What does useState return?',
            options: ['Just the value', '[value, setterFunction]', 'A promise', 'Nothing'],
            correctIndex: 1,
          },
          {
            question: 'Calling the state setter causes…',
            options: ['Nothing', 'A re-render', 'A page reload', 'An error'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why should you not mutate state directly in React?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'React decides whether to re-render by comparing references. If you mutate state directly (e.g. arr.push), the reference stays the same, so React may not re-render and the UI goes stale. Always create a new value (e.g. [...arr, item]) and pass it to the setter so React detects the change.',
              hinglish:
                'React re-render karna hai ya nahi ye references compare karke decide karta hai. Agar tum state ko seedha mutate karo (jaise arr.push), reference wahi rehta hai, isliye React re-render nahi karega aur UI stale ho jaayega. Hamesha nayi value banao (jaise [...arr, item]) aur setter ko do taaki React change detect kare.',
            },
          },
        ],
      },
      {
        title: 'Handling Events',
        difficulty: 'easy',
        tags: ['events'],
        explanation: {
          english:
            'React uses camelCase event handlers like onClick, onChange, onSubmit, and you pass a function (not a string). Pass the function reference (onClick={handleClick}), not a call (onClick={handleClick()}). React wraps native events in a cross-browser SyntheticEvent.',
          hinglish:
            'React camelCase event handlers use karta hai jaise onClick, onChange, onSubmit, aur tum ek function pass karte ho (string nahi). Function ka reference do (onClick={handleClick}), call nahi (onClick={handleClick()}). React native events ko ek cross-browser SyntheticEvent mein wrap karta hai.',
        },
        dailyLifeExample:
          'Event handler ek doorbell switch jaisa hai — tum wiring (function reference) jodte ho, dabane par bajti hai. Agar tum bell ab hi baja do (handleClick()), to wo galat hai — sirf jodni thi.',
        codeExample:
          'function Form() {\n  function handleSubmit(e) {\n    e.preventDefault();\n    console.log("submitted");\n  }\n  return <form onSubmit={handleSubmit}>...</form>;\n}',
        keyPoints: [
          'camelCase handlers: onClick, onChange, onSubmit',
          'Pass a function reference, not a call',
          'Use e.preventDefault() to stop default behaviour',
          'Events are SyntheticEvents (cross-browser)',
        ],
        quiz: [
          {
            question: 'Which is correct?',
            options: ['onClick={fn()}', 'onClick={fn}', 'onclick="fn"', 'on-click={fn}'],
            correctIndex: 1,
          },
          {
            question: 'React event names use…',
            options: ['lowercase', 'camelCase', 'snake_case', 'UPPERCASE'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Conditional Rendering',
        difficulty: 'medium',
        tags: ['rendering'],
        explanation: {
          english:
            'Render different UI based on conditions using the ternary operator, the && operator, or early returns. && is handy for "render this only if true", but beware: a falsy 0 will render as "0", so coerce to a boolean when needed.',
          hinglish:
            'Conditions ke hisaab se alag UI render karo ternary operator, && operator, ya early returns se. && tab kaam ka hai jab "sirf true hone par render karo", par dhyan: falsy 0 "0" ke roop mein render ho jaata hai, isliye zaroorat ho to boolean mein coerce karo.',
        },
        dailyLifeExample:
          'Conditional rendering ek restaurant menu board jaisa hai — "stock hai to dish dikhao, warna Sold Out". Condition ke hisaab se screen badalti hai.',
        codeExample:
          'function Status({ isLoggedIn, count }) {\n  if (!isLoggedIn) return <p>Please log in</p>;\n  return (\n    <div>\n      {count > 0 ? <p>{count} items</p> : <p>Empty</p>}\n      {count > 0 && <button>Checkout</button>}\n    </div>\n  );\n}',
        keyPoints: [
          'ternary (a ? b : c) for either/or',
          '&& for render-if-true',
          'Early return for guard clauses',
          'Watch falsy 0 with && (renders "0")',
        ],
        quiz: [
          {
            question: 'Which operator renders something only if a condition is true?',
            options: ['||', '&&', '??', '!'],
            correctIndex: 1,
          },
          {
            question: 'A risk of {count && <X/>} is that count = 0 renders…',
            options: ['nothing', 'the number 0', 'an error', 'true'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Lists & Keys',
        difficulty: 'medium',
        tags: ['lists', 'keys'],
        explanation: {
          english:
            'Render lists by mapping an array to JSX. Each item needs a unique, stable key prop so React can track which items changed, were added, or removed. Use a stable id — avoid using the array index as key when the list can reorder or change.',
          hinglish:
            'Lists render karne ke liye array ko JSX mein map karo. Har item ko ek unique, stable key prop chahiye taaki React track kar sake kaunse items badle, add hue ya remove hue. Stable id use karo — array index ko key mat banao jab list reorder ya change ho sakti ho.',
        },
        dailyLifeExample:
          'Keys students ke roll numbers jaise hain — agar order badle ya koi naya aaye, roll number se teacher pehchaan leti hai kaun kaun hai. Bina unique id ke confusion ho jaata hai.',
        codeExample:
          'function TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map((t) => (\n        <li key={t.id}>{t.text}</li>\n      ))}\n    </ul>\n  );\n}',
        keyPoints: [
          'Use .map() to render lists',
          'Each item needs a unique, stable key',
          'Keys help React diff efficiently',
          'Avoid index as key for dynamic lists',
        ],
        quiz: [
          {
            question: 'Why does React need a key on list items?',
            options: ['For styling', 'To track items efficiently across renders', 'For SEO', 'It does not'],
            correctIndex: 1,
          },
          {
            question: 'A good key is…',
            options: ['The array index always', 'A unique, stable id', 'A random number each render', 'The text content'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why is using the array index as a key problematic?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Index keys are tied to position, not identity. If the list reorders, inserts, or deletes items, indexes shift and React mismatches elements with state — causing wrong content, lost input focus, or buggy animations. A stable unique id keeps each element correctly identified across renders. Index is only acceptable for static lists that never change order.',
              hinglish:
                'Index keys position se bandhe hote hain, identity se nahi. Agar list reorder, insert, ya delete ho, to indexes shift ho jaate hain aur React elements ko state ke saath galat match karta hai — galat content, input focus chala jaana, ya buggy animations. Stable unique id har element ko renders ke beech sahi identify rakhti hai. Index sirf static lists ke liye theek hai jo kabhi order na badlein.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Hooks',
    level: 'intermediate',
    description: 'useEffect, useRef, useContext aur custom hooks.',
    concepts: [
      {
        title: 'useEffect Hook',
        difficulty: 'medium',
        tags: ['hooks', 'effects'],
        explanation: {
          english:
            'useEffect runs side effects (data fetching, subscriptions, timers, manual DOM work) after render. Its dependency array controls when it re-runs: [] runs once on mount, [a, b] runs when a or b change, and omitting it runs after every render. Return a cleanup function to undo effects (e.g. clear a timer).',
          hinglish:
            'useEffect side effects chalata hai (data fetching, subscriptions, timers, manual DOM kaam) render ke baad. Iska dependency array control karta hai ki ye kab dobara chale: [] mount pe ek baar, [a, b] jab a ya b badlein, aur na dena har render ke baad. Effects undo karne ke liye ek cleanup function return karo (jaise timer clear karna).',
        },
        dailyLifeExample:
          'useEffect ek auto-responder jaisa hai — kaam (render) hone ke baad apne aap ek action chalta hai. Cleanup function "jaane se pehle lights bujha do" jaisa hai.',
        codeExample:
          'import { useEffect, useState } from "react";\n\nfunction Clock() {\n  const [time, setTime] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setTime((t) => t + 1), 1000);\n    return () => clearInterval(id); // cleanup\n  }, []); // run once\n  return <p>{time}s</p>;\n}',
        keyPoints: [
          'Runs side effects after render',
          '[] = once on mount; [deps] = when deps change',
          'No array = after every render',
          'Return a cleanup function to undo effects',
        ],
        quiz: [
          {
            question: 'An empty dependency array [] means the effect runs…',
            options: ['Every render', 'Once on mount', 'Never', 'On unmount only'],
            correctIndex: 1,
          },
          {
            question: 'What is the returned function in useEffect for?',
            options: ['The result', 'Cleanup', 'The next effect', 'Nothing'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the dependency array in useEffect and what bugs come from getting it wrong?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'The dependency array tells React which values an effect depends on, so it re-runs only when they change. Missing a dependency leads to stale closures (the effect uses old values); adding unstable dependencies (like a new function/object every render) causes infinite loops or excessive runs. Fix with correct deps, useCallback/useMemo for stable references, or functional state updates.',
              hinglish:
                'Dependency array React ko batati hai effect kin values pe depend karta hai, taaki wo tabhi dobara chale jab wo badlein. Koi dependency miss karne par stale closures (effect purani values use karta hai); unstable dependencies dena (jaise har render pe naya function/object) infinite loops ya zyada runs deta hai. Fix: sahi deps, stable references ke liye useCallback/useMemo, ya functional state updates.',
            },
          },
        ],
      },
      {
        title: 'useRef Hook',
        difficulty: 'medium',
        tags: ['hooks', 'ref'],
        explanation: {
          english:
            'useRef returns a mutable object with a .current property that persists across renders WITHOUT causing a re-render when changed. Two main uses: accessing a DOM node directly (e.g. focusing an input) and storing a mutable value that should not trigger renders (like a timer id or previous value).',
          hinglish:
            'useRef ek mutable object deta hai jiska .current property renders ke beech persist karta hai par badalne par re-render nahi karta. Do main use: DOM node ko seedha access karna (jaise input focus) aur ek mutable value store karna jo render trigger na kare (jaise timer id ya previous value).',
        },
        dailyLifeExample:
          'useRef ek sticky note jaisa hai jo fridge pe chipka rehta hai — value yaad rehti hai par usse poora ghar (UI) dobara nahi sajta. State badalne pe ghar sajta hai, ref badalne pe nahi.',
        codeExample:
          'import { useRef } from "react";\n\nfunction SearchBox() {\n  const inputRef = useRef(null);\n  return (\n    <>\n      <input ref={inputRef} />\n      <button onClick={() => inputRef.current.focus()}>Focus</button>\n    </>\n  );\n}',
        keyPoints: [
          '.current persists across renders',
          'Changing a ref does NOT re-render',
          'Use for DOM access (focus, scroll)',
          'Use for mutable values (timer ids, previous value)',
        ],
        quiz: [
          {
            question: 'Does changing ref.current cause a re-render?',
            options: ['Yes', 'No', 'Sometimes', 'Only with state'],
            correctIndex: 1,
          },
          {
            question: 'A common use of useRef is…',
            options: ['Fetching data', 'Accessing a DOM node', 'Styling', 'Routing'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'useContext Hook',
        difficulty: 'medium',
        tags: ['hooks', 'context'],
        explanation: {
          english:
            'Context shares data across the component tree without passing props through every level ("prop drilling"). Create a context, wrap part of the tree in its Provider with a value, and read it anywhere below with useContext. Great for themes, auth, and language settings.',
          hinglish:
            'Context data ko component tree mein share karta hai bina har level se props bheje ("prop drilling"). Ek context banao, tree ke ek hisse ko uske Provider mein value ke saath wrap karo, aur neeche kahin bhi useContext se padho. Themes, auth, aur language settings ke liye badhiya.',
        },
        dailyLifeExample:
          'Context ek ghar ka WiFi jaisa hai — ek baar router (Provider) lagao, har kamre (component) mein bina alag-alag wire (props) ke connection mil jaata hai.',
        codeExample:
          'const ThemeContext = createContext("light");\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  return <div>Theme: {theme}</div>;\n}',
        keyPoints: [
          'Avoids prop drilling',
          'Provider supplies the value; useContext reads it',
          'Good for themes, auth, locale',
          'Updating context re-renders all consumers',
        ],
        quiz: [
          {
            question: 'What problem does Context mainly solve?',
            options: ['Slow renders', 'Prop drilling', 'Routing', 'Styling'],
            correctIndex: 1,
          },
          {
            question: 'Which reads a context value?',
            options: ['useState', 'useContext', 'useRef', 'useEffect'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Custom Hooks',
        difficulty: 'hard',
        tags: ['hooks', 'reuse'],
        explanation: {
          english:
            'A custom hook is a function whose name starts with "use" and that calls other hooks to package reusable stateful logic. It lets you share logic (not UI) between components — e.g. useLocalStorage, useFetch, useToggle. Each component using the hook gets its own isolated state.',
          hinglish:
            'Custom hook ek function hai jiska naam "use" se shuru hota hai aur jo doosre hooks call karke reusable stateful logic package karta hai. Isse components ke beech logic (UI nahi) share hota hai — jaise useLocalStorage, useFetch, useToggle. Hook use karne wale har component ko apni alag isolated state milti hai.',
        },
        dailyLifeExample:
          'Custom hook ek apni recipe jaisa hai — ek baar likho (useFetch), jahan chaaho use karo. Har dish (component) usse banegi par apne alag ingredients (state) ke saath.',
        codeExample:
          'function useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  const toggle = () => setOn((v) => !v);\n  return [on, toggle];\n}\n\n// usage\nconst [open, toggleOpen] = useToggle();',
        keyPoints: [
          'A function starting with "use"',
          'Calls other hooks inside',
          'Shares logic, not UI',
          'Each usage has isolated state',
        ],
        quiz: [
          {
            question: 'Custom hook names must start with…',
            options: ['get', 'use', 'hook', 'my'],
            correctIndex: 1,
          },
          {
            question: 'Custom hooks let you reuse…',
            options: ['UI markup', 'stateful logic', 'CSS', 'images'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Forms & Composition',
    level: 'intermediate',
    description: 'Controlled inputs, lifting state, component composition.',
    concepts: [
      {
        title: 'Controlled Components',
        difficulty: 'medium',
        tags: ['forms', 'state'],
        explanation: {
          english:
            'In a controlled component, form input values are driven by React state: value={state} plus an onChange that updates state. React becomes the single source of truth, making validation and conditional logic easy. Uncontrolled inputs instead keep their own state in the DOM (read via refs).',
          hinglish:
            'Controlled component mein form input ki values React state se chalti hain: value={state} aur ek onChange jo state update kare. React single source of truth ban jaata hai, jisse validation aur conditional logic aasaan. Uncontrolled inputs apni state DOM mein rakhte hain (refs se padho).',
        },
        dailyLifeExample:
          'Controlled input ek remote-controlled TV jaisa hai — screen pe wahi dikhega jo remote (state) bole. Uncontrolled TV ke apne buttons hain jinhe baad mein check karna padta hai.',
        codeExample:
          'function NameForm() {\n  const [name, setName] = useState("");\n  return (\n    <input\n      value={name}\n      onChange={(e) => setName(e.target.value)}\n    />\n  );\n}',
        keyPoints: [
          'Input value is bound to state',
          'value + onChange together',
          'React is the single source of truth',
          'Uncontrolled inputs use refs instead',
        ],
        quiz: [
          {
            question: 'A controlled input gets its value from…',
            options: ['the DOM', 'React state', 'a ref', 'localStorage'],
            correctIndex: 1,
          },
          {
            question: 'A controlled input needs which two things?',
            options: ['value + onChange', 'id + class', 'ref + key', 'type + name'],
            correctIndex: 0,
          },
        ],
        interviewQuestions: [
          {
            question: 'Difference between controlled and uncontrolled components?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A controlled component stores form data in React state and updates it via onChange, so React is the single source of truth — ideal for validation and dynamic forms. An uncontrolled component lets the DOM hold the value and you read it with a ref when needed — simpler for basic forms or integrating non-React code. Controlled is the common, recommended default.',
              hinglish:
                'Controlled component form data ko React state mein rakhta hai aur onChange se update karta hai, isliye React single source of truth hai — validation aur dynamic forms ke liye ideal. Uncontrolled component value ko DOM mein rakhta hai aur zaroorat pe ref se padhte ho — basic forms ya non-React code integrate karne ke liye simple. Controlled common aur recommended default hai.',
            },
          },
        ],
      },
      {
        title: 'Lifting State Up',
        difficulty: 'medium',
        tags: ['state', 'patterns'],
        explanation: {
          english:
            'When two sibling components need to share or sync state, move that state up to their closest common parent and pass it down via props (with setter callbacks). This keeps a single source of truth instead of duplicated, out-of-sync state.',
          hinglish:
            'Jab do sibling components ko state share ya sync karni ho, to wo state unke closest common parent mein le jao aur props ke through neeche pass karo (setter callbacks ke saath). Isse single source of truth rehta hai, duplicate aur out-of-sync state nahi.',
        },
        dailyLifeExample:
          'Lifting state up ghar mein ek hi common fridge rakhne jaisa hai — har kamre mein alag fridge (duplicate state) ke bajaye, ek common (parent) jise sab share karein.',
        codeExample:
          'function Parent() {\n  const [value, setValue] = useState("");\n  return (\n    <>\n      <Input value={value} onChange={setValue} />\n      <Preview value={value} />\n    </>\n  );\n}',
        keyPoints: [
          'Move shared state to the common parent',
          'Pass value + setter down as props',
          'Keeps a single source of truth',
          'Avoids duplicated, out-of-sync state',
        ],
        quiz: [
          {
            question: 'When two siblings must share state, you should…',
            options: ['Duplicate it in both', 'Lift it to a common parent', 'Use a global variable', 'Use a ref'],
            correctIndex: 1,
          },
          {
            question: 'Lifting state up keeps…',
            options: ['Two copies', 'A single source of truth', 'No state', 'Faster CSS'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Component Composition',
        difficulty: 'medium',
        tags: ['composition', 'patterns'],
        explanation: {
          english:
            'Composition means building complex UIs by nesting and combining components, often using the children prop to pass JSX into a wrapper. React favours composition over inheritance — reusable wrappers like Card or Modal accept children and render them inside, staying flexible.',
          hinglish:
            'Composition ka matlab complex UIs ko components nest aur combine karke banana, aksar children prop se JSX ko ek wrapper mein pass karke. React inheritance se zyada composition prefer karta hai — Card ya Modal jaise reusable wrappers children accept karke unhe andar render karte hain, flexible rehte hue.',
        },
        dailyLifeExample:
          'Composition ek gift box jaisa hai — box (wrapper component) koi bhi gift (children) le sakta hai. Box ka design fix, andar kuch bhi daalo.',
        codeExample:
          'function Card({ children }) {\n  return <div className="card">{children}</div>;\n}\n\n// usage — pass any JSX as children\n<Card>\n  <h2>Title</h2>\n  <p>Body</p>\n</Card>',
        keyPoints: [
          'Build UIs by combining components',
          'children prop passes JSX into a wrapper',
          'React prefers composition over inheritance',
          'Makes wrappers (Card, Modal) reusable',
        ],
        quiz: [
          {
            question: 'Which prop passes nested JSX into a component?',
            options: ['content', 'children', 'inner', 'slot'],
            correctIndex: 1,
          },
          {
            question: 'React favours composition over…',
            options: ['functions', 'inheritance', 'hooks', 'props'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Performance',
    level: 'advanced',
    description: 'Virtual DOM, memoization aur re-render control.',
    concepts: [
      {
        title: 'Virtual DOM & Reconciliation',
        difficulty: 'hard',
        tags: ['virtual-dom', 'internals'],
        explanation: {
          english:
            'The Virtual DOM is a lightweight in-memory copy of the UI. On a state change, React builds a new Virtual DOM tree, diffs it against the previous one (reconciliation), and updates only the real DOM nodes that actually changed. This batching and diffing makes updates fast and lets you write declarative code.',
          hinglish:
            'Virtual DOM UI ki ek lightweight in-memory copy hai. State change pe React naya Virtual DOM tree banata hai, use pichhle se diff karta hai (reconciliation), aur sirf wahi real DOM nodes update karta hai jo actually badle. Ye batching aur diffing updates ko fast banata hai aur tumhe declarative code likhne deta hai.',
        },
        dailyLifeExample:
          'Virtual DOM ek architect ke draft naksha jaisa hai — pehle kaagaz pe changes try karo (sasta), phir sirf wahi asli deewar todho-banao jo zaroori hai. Poora ghar dobara nahi banta.',
        codeExample:
          '// You write declarative UI:\n<p>{count}</p>\n\n// React internally:\n// 1. build new virtual tree\n// 2. diff vs old tree (reconciliation)\n// 3. patch only changed real DOM nodes',
        keyPoints: [
          'Virtual DOM = in-memory UI copy',
          'Reconciliation = diff new vs old tree',
          'Only changed real DOM nodes are updated',
          'Enables fast, declarative updates',
        ],
        quiz: [
          {
            question: 'What is reconciliation?',
            options: ['Fetching data', 'Diffing the new vs old Virtual DOM', 'Styling', 'Routing'],
            correctIndex: 1,
          },
          {
            question: 'After diffing, React updates…',
            options: ['The whole page', 'Only changed real DOM nodes', 'Nothing', 'The CSS'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How does the Virtual DOM make React fast?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Direct DOM manipulation is expensive. React keeps a lightweight Virtual DOM; when state changes it creates a new virtual tree and diffs it against the old one using a heuristic O(n) algorithm (keys help match elements). It then batches and applies the minimal set of real DOM mutations. So you get declarative code while React minimises costly DOM work.',
              hinglish:
                'Seedha DOM manipulate karna mehnga hai. React ek lightweight Virtual DOM rakhta hai; state badalne par naya virtual tree banata hai aur purane se diff karta hai ek heuristic O(n) algorithm se (keys elements match karne mein madad karti hain). Phir minimal real DOM mutations ko batch karke apply karta hai. Isse declarative code milta hai aur React costly DOM kaam minimise karta hai.',
            },
          },
        ],
      },
      {
        title: 'React.memo, useMemo & useCallback',
        difficulty: 'hard',
        tags: ['performance', 'memoization'],
        explanation: {
          english:
            'These prevent unnecessary work. React.memo skips re-rendering a component if its props did not change. useMemo caches an expensive computed value between renders. useCallback caches a function reference so memoized children do not re-render. Use them to fix real performance issues — not everywhere by default.',
          hinglish:
            'Ye unnecessary kaam rokte hain. React.memo component ko re-render skip karwata hai agar uske props na badle. useMemo ek mehnga computed value renders ke beech cache karta hai. useCallback ek function reference cache karta hai taaki memoized children re-render na hon. Inhe real performance issues fix karne ke liye use karo — by default har jagah nahi.',
        },
        dailyLifeExample:
          'Memoization ready notes jaise hain — same sawaal dobara aaye to dobara solve nahi karte, saved answer de dete hain. Par har cheez save karna (over-memoizing) bhi waste — zaroorat pe karo.',
        codeExample:
          'const Child = React.memo(function Child({ onClick }) {\n  return <button onClick={onClick}>Click</button>;\n});\n\nfunction Parent() {\n  const value = useMemo(() => expensive(), []);\n  const handle = useCallback(() => doThing(), []);\n  return <Child onClick={handle} />;\n}',
        keyPoints: [
          'React.memo: skip re-render if props are equal',
          'useMemo: cache an expensive value',
          'useCallback: cache a function reference',
          'Use to fix measured problems, not everywhere',
        ],
        quiz: [
          {
            question: 'What does useMemo cache?',
            options: ['A function', 'A computed value', 'A component', 'A ref'],
            correctIndex: 1,
          },
          {
            question: 'useCallback is mainly used to cache…',
            options: ['a value', 'a function reference', 'JSX', 'state'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Difference between useMemo and useCallback?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Both memoize between renders based on a dependency array. useMemo returns a memoized VALUE (the result of calling a function), useful for expensive calculations. useCallback returns a memoized FUNCTION (the function itself), useful for passing stable callbacks to memoized children or effect dependencies. In fact useCallback(fn, deps) equals useMemo(() => fn, deps).',
              hinglish:
                'Dono dependency array ke hisaab se renders ke beech memoize karte hain. useMemo ek memoized VALUE deta hai (function call ka result), mehnge calculations ke liye. useCallback ek memoized FUNCTION deta hai (function khud), memoized children ya effect deps ko stable callback dene ke liye. Asal mein useCallback(fn, deps) = useMemo(() => fn, deps).',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'State Management & Routing',
    level: 'advanced',
    description: 'useReducer, context-based state aur routing.',
    concepts: [
      {
        title: 'useReducer Hook',
        difficulty: 'hard',
        tags: ['hooks', 'state'],
        explanation: {
          english:
            'useReducer manages complex state via a reducer function: state + action -> new state. You dispatch actions and the reducer decides the next state. It is preferable to useState when state has many sub-values or the next state depends on the previous one, keeping update logic in one predictable place.',
          hinglish:
            'useReducer complex state ko ek reducer function se manage karta hai: state + action -> new state. Tum actions dispatch karte ho aur reducer decide karta hai agli state. Ye useState se behtar hai jab state ke kai sub-values hon ya agli state pichhli pe depend kare, update logic ek predictable jagah rakhte hue.',
        },
        dailyLifeExample:
          'useReducer ek vending machine jaisa hai — tum button (action) dabate ho, machine (reducer) apne rules se decide karti hai kya nikle (new state). Logic ek hi jagah, predictable.',
        codeExample:
          'function reducer(state, action) {\n  switch (action.type) {\n    case "inc": return { count: state.count + 1 };\n    case "dec": return { count: state.count - 1 };\n    default: return state;\n  }\n}\nconst [state, dispatch] = useReducer(reducer, { count: 0 });\n// dispatch({ type: "inc" })',
        keyPoints: [
          '(state, action) => newState',
          'dispatch actions to update state',
          'Better than useState for complex/related state',
          'Centralises update logic',
        ],
        quiz: [
          {
            question: 'A reducer has the signature…',
            options: ['(props) => JSX', '(state, action) => newState', '() => value', '(a, b) => sum'],
            correctIndex: 1,
          },
          {
            question: 'How do you trigger a state update with useReducer?',
            options: ['setState', 'dispatch(action)', 'update()', 'emit()'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Context + useReducer for State Management',
        difficulty: 'hard',
        tags: ['state-management', 'context'],
        explanation: {
          english:
            'Combining useReducer (predictable state logic) with Context (global access) gives a lightweight, built-in alternative to libraries like Redux for small/medium apps. The reducer holds the logic, Context provides the state and dispatch to the whole tree. For large apps, dedicated libraries (Redux Toolkit, Zustand) may scale better.',
          hinglish:
            'useReducer (predictable state logic) aur Context (global access) ko milana chhoti/medium apps ke liye Redux jaisi libraries ka lightweight, built-in alternative deta hai. Reducer logic rakhta hai, Context state aur dispatch poore tree ko deta hai. Badi apps ke liye dedicated libraries (Redux Toolkit, Zustand) behtar scale kar sakti hain.',
        },
        dailyLifeExample:
          'Ye combo ek society ke central office (reducer = rules) + intercom (context = sabko connect) jaisa hai — rules ek jagah, par har flat (component) unhe access aur use kar sakta hai.',
        codeExample:
          'const StoreContext = createContext();\n\nfunction StoreProvider({ children }) {\n  const [state, dispatch] = useReducer(reducer, initial);\n  return (\n    <StoreContext.Provider value={{ state, dispatch }}>\n      {children}\n    </StoreContext.Provider>\n  );\n}\n// any component: const { state, dispatch } = useContext(StoreContext);',
        keyPoints: [
          'useReducer = logic, Context = global access',
          'Lightweight alternative to Redux (small/medium apps)',
          'One provider supplies state + dispatch',
          'Large apps may prefer Redux Toolkit/Zustand',
        ],
        quiz: [
          {
            question: 'Context + useReducer is a built-in alternative to…',
            options: ['React itself', 'Redux for small/medium apps', 'CSS', 'the DOM'],
            correctIndex: 1,
          },
          {
            question: 'In this pattern, what does Context provide to the tree?',
            options: ['Only styles', 'state and dispatch', 'Only props', 'Routing'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Routing (React Router)',
        difficulty: 'medium',
        tags: ['routing', 'ecosystem'],
        explanation: {
          english:
            'React itself has no routing — React Router is the popular library for it. It maps URL paths to components so you build single-page apps with multiple "pages" without full reloads. Core pieces: a router, <Routes>/<Route> for path-to-component mapping, and <Link> for navigation.',
          hinglish:
            'React mein khud routing nahi hai — React Router iske liye popular library hai. Ye URL paths ko components se map karti hai taaki tum bina full reload ke multiple "pages" wali single-page apps banao. Core parts: ek router, path-to-component mapping ke liye <Routes>/<Route>, aur navigation ke liye <Link>.',
        },
        dailyLifeExample:
          'React Router ek building ke floor directory jaisa hai — "3rd floor pe HR" (path -> component). Lift (Link) tumhe waha le jaata hai bina building dobara banaye (no reload).',
        codeExample:
          'import { BrowserRouter, Routes, Route, Link } from "react-router-dom";\n\n<BrowserRouter>\n  <Link to="/about">About</Link>\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/about" element={<About />} />\n  </Routes>\n</BrowserRouter>',
        keyPoints: [
          'Routing is not built into React',
          'React Router maps paths -> components',
          '<Link> navigates without a full reload',
          'Enables single-page apps with many views',
        ],
        quiz: [
          {
            question: 'Is routing built into React core?',
            options: ['Yes', 'No — use a library like React Router', 'Only in Next.js', 'Only with hooks'],
            correctIndex: 1,
          },
          {
            question: 'Which component navigates without a full page reload?',
            options: ['<a>', '<Link>', '<Route>', '<nav>'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What are the rules of hooks?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Only call hooks at the top level of a React function — never inside loops, conditions, or nested functions — so the call order stays consistent across renders. Only call hooks from React function components or other custom hooks, not regular functions. These rules let React correctly associate state with each hook call.',
      hinglish:
        'Hooks ko sirf React function ke top level pe call karo — kabhi loops, conditions, ya nested functions ke andar nahi — taaki call order har render mein same rahe. Hooks sirf React function components ya doosre custom hooks se call karo, normal functions se nahi. In rules se React har hook call ke saath state sahi se associate kar pata hai.',
    },
  },
  {
    question: 'What is the difference between functional and class components?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Class components use ES6 classes, lifecycle methods (componentDidMount, etc.) and this.state. Functional components are plain functions that use hooks (useState, useEffect) for state and side effects. Functional components with hooks are the modern standard — shorter, easier to test, and better for reusing logic via custom hooks.',
      hinglish:
        'Class components ES6 classes, lifecycle methods (componentDidMount, etc.) aur this.state use karte hain. Functional components plain functions hain jo state aur side effects ke liye hooks (useState, useEffect) use karte hain. Hooks wale functional components modern standard hain — chhote, test karne mein aasaan, aur custom hooks se logic reuse ke liye behtar.',
    },
  },
  {
    question: 'What is prop drilling and how do you avoid it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Prop drilling is passing props through many intermediate components that do not use them, just to reach a deep child. It makes code verbose and fragile. Avoid it with the Context API for app-wide data (theme, auth), component composition (passing children), or a state-management library for larger apps.',
      hinglish:
        'Prop drilling matlab props ko bahut saare beech ke components se pass karna jo unhe use nahi karte, sirf ek deep child tak pahunchane ke liye. Isse code verbose aur fragile hota hai. Ise avoid karo Context API se (app-wide data jaise theme, auth), component composition se (children pass karke), ya badi apps ke liye state-management library se.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
