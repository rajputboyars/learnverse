// React.js curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs, consumed by scripts/seed.mjs.

import { deepDives } from './react-deep-dives.mjs';

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
    'Modern UI library — components, hooks, state, performance aur production patterns. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: 'react',
  tags: ['react', 'frontend', 'javascript', 'mern'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 6,
};

const beginner = [
  {
    title: 'React Fundamentals',
    level: 'beginner',
    description: 'React kya hai, Virtual DOM, JSX aur components ki gehrai se samajh.',
    concepts: [
      {
        title: 'What is React & the Virtual DOM',
        difficulty: 'easy',
        tags: ['intro', 'virtual-dom'],
        explanation: {
          english:
            'React is a JavaScript library for building UIs from reusable components. You describe the UI declaratively for any given state, and React figures out the DOM updates. Internally it keeps a lightweight in-memory tree (the Virtual DOM); on every state change it builds a new tree, diffs it against the previous one ("reconciliation"), and patches only the real DOM nodes that actually changed — instead of re-rendering the whole page.',
          hinglish:
            'React UIs banane ki JavaScript library hai jo reusable components se bani hoti hai. Tum kisi state ke liye UI declaratively describe karte ho, aur React DOM updates khud nikal leta hai. Andar se ye ek lightweight in-memory tree rakhta hai (Virtual DOM); har state change pe naya tree banta hai, purane se diff hota hai ("reconciliation"), aur sirf wahi real DOM nodes patch hote hain jo actually badle — poora page dobara render nahi hota.',
        },
        dailyLifeExample:
          'Virtual DOM ek architect ke draft naksha jaisa hai — pehle kaagaz pe changes try karo (sasta), phir sirf wahi deewar todho-banao jo zaroori hai, poora ghar dobara nahi banta.',
        codeExample:
          'function App() {\n  return <h1>Hello, Learnverse!</h1>;\n}\n\n// You describe WHAT the UI should look like.\n// React decides HOW to update the real DOM efficiently.\n// On state change:\n// 1. Build a new virtual tree\n// 2. Diff it against the old tree (reconciliation)\n// 3. Patch only the changed real DOM nodes',
        keyPoints: [
          'A library for building UIs from components',
          'Declarative: describe UI for a state, not the steps',
          'Virtual DOM = lightweight in-memory UI tree',
          'Reconciliation = diff new vs old tree, patch only changes',
        ],
        quiz: [
          { question: 'React is a…', options: ['Database', 'JavaScript library for UIs', 'CSS framework', 'Programming language'], correctIndex: 1 },
          { question: 'What is reconciliation?', options: ['Fetching data', 'Diffing new vs old Virtual DOM', 'Styling', 'Routing'], correctIndex: 1 },
        ],
        interviewQuestions: [
          {
            question: 'How does the Virtual DOM make React fast?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Direct DOM manipulation is expensive because the browser must recalculate layout and repaint. React keeps a lightweight Virtual DOM; on a state change it builds a new virtual tree and diffs it against the old one using a heuristic O(n) algorithm (keys help match elements across renders). It then batches and applies only the minimal set of real DOM mutations, so you get declarative code while React minimises costly DOM work.',
              hinglish:
                'Seedha DOM manipulate karna mehnga hai kyunki browser ko layout dobara calculate karke repaint karna padta hai. React ek lightweight Virtual DOM rakhta hai; state badalne par naya virtual tree banata hai aur purane se diff karta hai ek heuristic O(n) algorithm se (keys elements ko renders ke beech match karne mein madad karti hain). Phir minimal real DOM mutations batch karke apply karta hai, isliye declarative code milta hai aur React costly DOM kaam minimise karta hai.',
            },
          },
        ],
      },
      {
        title: 'JSX Deep Dive',
        difficulty: 'easy',
        tags: ['jsx', 'basics'],
        explanation: {
          english:
            'JSX lets you write HTML-like markup inside JavaScript. It is not HTML — every JSX tag compiles to a React.createElement(type, props, children) call. Rules: return a single root element (or a Fragment <>...</>), use className instead of class and htmlFor instead of for, every tag must be closed (including self-closing <img />), and you embed any JS expression with curly braces { }. JSX accepts expressions, not statements — so if/for loops cannot go directly inside { }.',
          hinglish:
            'JSX se tum JavaScript ke andar HTML-jaisa markup likh sakte ho. Ye HTML nahi hai — har JSX tag React.createElement(type, props, children) call mein compile hota hai. Rules: ek single root element return karo (ya Fragment <>...</>), class ki jagah className aur for ki jagah htmlFor, har tag close hona chahiye (self-closing <img /> bhi), aur koi bhi JS expression curly braces { } mein daalo. JSX expressions accept karta hai, statements nahi — isliye if/for loop seedha { } ke andar nahi chal sakta.',
        },
        dailyLifeExample:
          'JSX Hinglish jaisa hai — do languages (HTML + JS) ka mix jo padhne mein natural lagta hai. Bilkul HTML jaisa dikhta hai par power JavaScript ki hai.',
        codeExample:
          'const name = "Abhi";\nconst items = ["React", "Hooks", "JSX"];\n\nfunction Card() {\n  return (\n    <div className="card">\n      <h2>Hello {name}</h2>\n      {name && <p>Welcome back!</p>}\n      <ul>\n        {items.map((item) => (\n          <li key={item}>{item}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n// JSX compiles roughly to:\n// React.createElement("div", { className: "card" }, ...)',
        keyPoints: [
          'HTML-like syntax that compiles to React.createElement calls',
          'Return one root element or a Fragment <>',
          'class -> className, for -> htmlFor',
          'Curly braces { } embed JS expressions, not statements',
        ],
        quiz: [
          { question: 'In JSX, the HTML class attribute becomes…', options: ['class', 'className', 'classes', 'cssClass'], correctIndex: 1 },
          { question: 'How do you embed a JS expression in JSX?', options: ['${ }', '{{ }}', '{ }', '<% %>'], correctIndex: 2 },
        ],
      },
      {
        title: 'Components: Functions, Trees & Purity',
        difficulty: 'easy',
        tags: ['components'],
        explanation: {
          english:
            'A modern React component is a JavaScript function that returns JSX; its name must start with a capital letter so React can tell it apart from a plain HTML tag. Apps are built as a tree of components — small ones nested inside bigger ones. Components should be pure: given the same props, they should always render the same output and must not mutate props or any outside variable during render. Side effects (fetching, timers) belong in useEffect, not directly in the render body.',
          hinglish:
            'Modern React component ek JavaScript function hai jo JSX return karta hai; uska naam capital letter se shuru hona chahiye taaki React use plain HTML tag se alag bata sake. Apps components ke tree se bante hain — chhote components bade ke andar nested. Components pure hone chahiye: same props milne par hamesha same output render karein aur render ke dauraan props ya kisi bahar ke variable ko mutate na karein. Side effects (fetching, timers) useEffect mein jaate hain, seedha render body mein nahi.',
        },
        dailyLifeExample:
          'Components ghar ke parts jaise hain — darwaza, khidki, deewar. Ek baar banao, jahan chaaho use karo. Purity ka matlab: ek hi recipe (props) se hamesha same dish banni chahiye, koi surprise nahi.',
        codeExample:
          'function Avatar({ src }) {\n  return <img className="avatar" src={src} alt="" />;\n}\n\nfunction Profile() {\n  return (\n    <div>\n      <Avatar src="a.jpg" />\n      <Avatar src="b.jpg" />\n    </div>\n  );\n}\n\n// Impure (avoid): mutates an outside variable during render\nlet renderCount = 0;\nfunction Bad() {\n  renderCount++; // side effect during render — unpredictable\n  return <p>{renderCount}</p>;\n}',
        keyPoints: [
          'A component is a function that returns JSX',
          'Names must be Capitalized',
          'Apps are a tree of nested components',
          'Components should be pure — no mutation during render',
        ],
        quiz: [
          { question: 'A modern React component is…', options: ['A CSS class', 'A function returning JSX', 'An HTML file', 'A database table'], correctIndex: 1 },
          { question: 'A pure component, given the same props…', options: ['Renders randomly', 'Always renders the same output', 'Mutates global state', 'Skips rendering'], correctIndex: 1 },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a library and a framework, and which is React?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'A library is a toolkit you call when you need it — you stay in control of the flow. A framework calls your code and dictates the structure (inversion of control). React is a library focused on the view layer; you add routing, data fetching, etc. yourself (or use a framework like Next.js built on top of it), which is why it is flexible but needs supporting choices.',
              hinglish:
                'Library ek toolkit hai jise zaroorat pe tum call karte ho — flow tumhare control mein. Framework tumhare code ko call karta hai aur structure decide karta hai (inversion of control). React ek library hai jo view layer pe focus karti hai; routing, data fetching, etc. tum khud add karte ho (ya Next.js jaisa framework iske upar use karte ho), isliye ye flexible hai par supporting choices chahiye.',
            },
          },
        ],
      },
      {
        title: 'Props Deep Dive',
        difficulty: 'easy',
        tags: ['props'],
        explanation: {
          english:
            'Props pass data from a parent to a child, like function arguments — and they are read-only inside the child. You can destructure props in the function signature, provide default values, and forward the special "children" prop to render whatever was nested inside the component tag. The spread syntax ({...props}) forwards many props at once, handy for wrapper components.',
          hinglish:
            'Props parent se child ko data pass karte hain, function arguments ki tarah — aur child ke andar read-only hote hain. Function signature mein props destructure kar sakte ho, default values de sakte ho, aur special "children" prop forward karke wo render kar sakte ho jo component tag ke andar nest kiya gaya tha. Spread syntax ({...props}) ek saath kai props forward karta hai, wrapper components ke liye kaam ka.',
        },
        dailyLifeExample:
          'Props ek courier parcel jaisa hai jo parent child ko bhejta hai — child use kholke use kar sakta hai par original nahi badal sakta. children prop ek khaali gift box jaisa hai jisme jo bhi daalo wahi dikhta hai.',
        codeExample:
          'function Welcome({ name, role = "Learner" }) {\n  return <p>{name} — {role}</p>;\n}\n\nfunction Card({ children }) {\n  return <div className="card">{children}</div>;\n}\n\n// usage\n<Welcome name="Abhi" />               {/* role defaults to "Learner" */}\n<Card>\n  <h2>Title</h2>\n  <p>Any JSX goes here as children</p>\n</Card>',
        keyPoints: [
          'Pass data parent -> child',
          'Props are read-only (immutable in the child)',
          'Destructure with default values: { role = "Learner" }',
          'children renders whatever is nested inside the tag',
        ],
        quiz: [
          { question: 'Can a child component modify its own props?', options: ['Yes', 'No, props are read-only', 'Only strings', 'Only with state'], correctIndex: 1 },
          { question: 'Which prop holds nested JSX content?', options: ['content', 'children', 'inner', 'slot'], correctIndex: 1 },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between props and state?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Props are passed into a component from its parent and are read-only within the component. State is data owned and managed inside a component that can change over time (via useState/useReducer) and triggers a re-render when updated. In short: props are external and immutable to the child; state is internal and mutable.',
              hinglish:
                'Props parent se component mein aate hain aur component ke andar read-only hote hain. State component ke andar ka data hai jo time ke saath badal sakta hai (useState/useReducer se) aur update hone par re-render trigger karta hai. Short mein: props external aur child ke liye immutable; state internal aur mutable.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'State & Interactivity',
    level: 'beginner',
    description: 'useState, events, conditional rendering aur lists ke saath app ko interactive banao.',
    concepts: [
      {
        title: 'useState Hook',
        difficulty: 'easy',
        tags: ['state', 'hooks'],
        explanation: {
          english:
            'useState adds state to a function component. It returns an array: the current value and a setter function. Calling the setter schedules a re-render with the new value. When the next state depends on the previous one, pass a function to the setter (functional update) — e.g. setCount(prev => prev + 1) — so it works correctly even if multiple updates are batched together. Never mutate state directly; always give the setter a brand-new value.',
          hinglish:
            'useState function component mein state add karta hai. Ye ek array return karta hai: current value aur ek setter function. Setter call karne se naye value ke saath re-render schedule hota hai. Jab agli state pichli pe depend kare, setter ko function do (functional update) — jaise setCount(prev => prev + 1) — taaki multiple updates batch hone par bhi sahi chale. State ko kabhi seedha mutate mat karo; setter ko hamesha ek nayi value do.',
        },
        dailyLifeExample:
          'useState ek scoreboard jaisa hai — current score (value) dikhta hai aur ek button (setter) se badalta hai. Functional update us situation jaisa hai jab tum bolte ho "jo bhi current score ho, usme 1 jodo" instead of "score ko 5 bana do" — safer jab kai updates ek saath ho rahe hon.',
        codeExample:
          'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  function incrementTwice() {\n    // Functional update — both increments apply correctly\n    setCount((prev) => prev + 1);\n    setCount((prev) => prev + 1);\n  }\n\n  return (\n    <button onClick={incrementTwice}>\n      Count: {count}\n    </button>\n  );\n}',
        keyPoints: [
          'Adds state to function components',
          'Returns [value, setter]',
          'Setter updates value AND schedules a re-render',
          'Use functional updates (prev => ...) when next depends on previous',
        ],
        quiz: [
          { question: 'What does useState return?', options: ['Just the value', '[value, setterFunction]', 'A promise', 'Nothing'], correctIndex: 1 },
          { question: 'Why use setCount(prev => prev + 1) instead of setCount(count + 1)?', options: ['No difference', 'Correct even when updates batch together', 'It is faster', 'It avoids re-renders'], correctIndex: 1 },
        ],
        interviewQuestions: [
          {
            question: 'Why should you not mutate state directly in React?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'React decides whether to re-render by comparing references. If you mutate state directly (e.g. arr.push), the reference stays the same, so React may not detect the change and the UI goes stale. Always create a new value (e.g. [...arr, item]) and pass it to the setter so React can compare old vs new and re-render correctly.',
              hinglish:
                'React re-render karna hai ya nahi ye references compare karke decide karta hai. Agar tum state ko seedha mutate karo (jaise arr.push), reference wahi rehta hai, isliye React change detect nahi karega aur UI stale ho jaayega. Hamesha nayi value banao (jaise [...arr, item]) aur setter ko do taaki React old vs new compare karke sahi se re-render kare.',
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
            'React uses camelCase event handlers like onClick, onChange, onSubmit, and you pass a function reference — not a string, and not a call. Write onClick={handleClick}, not onClick={handleClick()} (which would call it immediately during render). React wraps native browser events in a cross-browser SyntheticEvent object, and e.preventDefault() stops default behaviour like a form reloading the page.',
          hinglish:
            'React camelCase event handlers use karta hai jaise onClick, onChange, onSubmit, aur tum ek function reference pass karte ho — string nahi, aur call nahi. onClick={handleClick} likho, onClick={handleClick()} nahi (jo render ke dauraan turant call ho jaayega). React native browser events ko ek cross-browser SyntheticEvent object mein wrap karta hai, aur e.preventDefault() default behaviour rokta hai jaise form se page reload hona.',
        },
        dailyLifeExample:
          'Event handler ek doorbell switch jaisa hai — tum wiring (function reference) jodte ho, dabane par bajti hai. Agar tum bell ab hi baja do (handleClick()), to wo galat hai — sirf jodni thi.',
        codeExample:
          'function Form() {\n  function handleSubmit(e) {\n    e.preventDefault(); // stop the page from reloading\n    console.log("submitted");\n  }\n  function handleChange(e) {\n    console.log("typed:", e.target.value);\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <input onChange={handleChange} />\n      <button type="submit">Send</button>\n    </form>\n  );\n}',
        keyPoints: [
          'camelCase handlers: onClick, onChange, onSubmit',
          'Pass a function reference, not a call',
          'Use e.preventDefault() to stop default behaviour',
          'Events are SyntheticEvents (cross-browser)',
        ],
        quiz: [
          { question: 'Which is correct?', options: ['onClick={fn()}', 'onClick={fn}', 'onclick="fn"', 'on-click={fn}'], correctIndex: 1 },
          { question: 'React event names use…', options: ['lowercase', 'camelCase', 'snake_case', 'UPPERCASE'], correctIndex: 1 },
        ],
      },
      {
        title: 'Conditional Rendering',
        difficulty: 'medium',
        tags: ['rendering'],
        explanation: {
          english:
            'Render different UI based on conditions using the ternary operator, the && operator, or early returns. && is handy for "render this only if true", but a falsy 0 will render as the text "0" — coerce to a boolean (Boolean(count) && ...) when that matters. Early returns at the top of a component are great for guard clauses like loading or error states.',
          hinglish:
            'Conditions ke hisaab se alag UI render karo ternary operator, && operator, ya early returns se. && tab kaam ka hai jab "sirf true hone par render karo", par falsy 0 text "0" ke roop mein render ho jaata hai — zaroorat ho to boolean mein coerce karo (Boolean(count) && ...). Component ke top pe early return loading ya error states jaise guard clauses ke liye badhiya hai.',
        },
        dailyLifeExample:
          'Conditional rendering ek restaurant menu board jaisa hai — "stock hai to dish dikhao, warna Sold Out". Condition ke hisaab se screen badalti hai.',
        codeExample:
          'function Status({ isLoading, isLoggedIn, count }) {\n  if (isLoading) return <p>Loading…</p>;\n  if (!isLoggedIn) return <p>Please log in</p>;\n\n  return (\n    <div>\n      {count > 0 ? <p>{count} items</p> : <p>Empty</p>}\n      {Boolean(count) && <button>Checkout</button>}\n    </div>\n  );\n}',
        keyPoints: [
          'ternary (a ? b : c) for either/or',
          '&& for render-if-true',
          'Early return for guard clauses (loading/error)',
          'Watch falsy 0 with && (renders the text "0")',
        ],
        quiz: [
          { question: 'Which operator renders something only if a condition is true?', options: ['||', '&&', '??', '!'], correctIndex: 1 },
          { question: 'A risk of {count && <X/>} is that count = 0 renders…', options: ['nothing', 'the text "0"', 'an error', 'true'], correctIndex: 1 },
        ],
      },
      {
        title: 'Lists & Keys',
        difficulty: 'medium',
        tags: ['lists', 'keys'],
        explanation: {
          english:
            'Render lists by mapping an array to JSX. Each item needs a unique, stable key prop so React can track which items changed, were added, or removed across renders. Use a stable id from your data — avoid the array index as key when the list can reorder, filter, or have items inserted/removed in the middle, since index-based keys cause React to mismatch elements with state.',
          hinglish:
            'Lists render karne ke liye array ko JSX mein map karo. Har item ko ek unique, stable key prop chahiye taaki React renders ke beech track kar sake kaunse items badle, add hue ya remove hue. Apne data ka stable id use karo — array index ko key mat banao jab list reorder, filter ho sakti ho, ya beech mein items insert/remove ho sakte hon, kyunki index-based keys se React elements ko state ke saath galat match kar deta hai.',
        },
        dailyLifeExample:
          'Keys students ke roll numbers jaise hain — agar order badle ya koi naya aaye, roll number se teacher pehchaan leti hai kaun kaun hai. Bina unique id ke confusion ho jaata hai.',
        codeExample:
          'function TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map((t) => (\n        <li key={t.id}>\n          {t.text} {t.done && "✅"}\n        </li>\n      ))}\n    </ul>\n  );\n}\n// todos = [{ id: "a1", text: "Learn React", done: false }, ...]',
        keyPoints: [
          'Use .map() to render lists',
          'Each item needs a unique, stable key',
          'Keys help React diff efficiently across renders',
          'Avoid index as key for dynamic (reorderable) lists',
        ],
        quiz: [
          { question: 'Why does React need a key on list items?', options: ['For styling', 'To track items efficiently across renders', 'For SEO', 'It does not'], correctIndex: 1 },
          { question: 'A good key is…', options: ['The array index always', 'A unique, stable id', 'A random number each render', 'The text content'], correctIndex: 1 },
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
  {
    title: 'Forms in React',
    level: 'beginner',
    description: 'Controlled inputs, uncontrolled inputs aur basic validation.',
    concepts: [
      {
        title: 'Controlled Components',
        difficulty: 'medium',
        tags: ['forms', 'state'],
        explanation: {
          english:
            'In a controlled component, form input values are driven by React state: value={state} plus an onChange that updates state. React becomes the single source of truth, making validation and conditional logic easy. This works for text inputs, textarea, select, and checkboxes (using checked instead of value).',
          hinglish:
            'Controlled component mein form input ki values React state se chalti hain: value={state} aur ek onChange jo state update kare. React single source of truth ban jaata hai, jisse validation aur conditional logic aasaan. Ye text inputs, textarea, select, aur checkboxes (value ki jagah checked use karte hue) sab ke liye chalta hai.',
        },
        dailyLifeExample:
          'Controlled input ek remote-controlled TV jaisa hai — screen pe wahi dikhega jo remote (state) bole.',
        codeExample:
          'function SignupForm() {\n  const [name, setName] = useState("");\n  const [subscribe, setSubscribe] = useState(false);\n\n  return (\n    <form>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <input\n        type="checkbox"\n        checked={subscribe}\n        onChange={(e) => setSubscribe(e.target.checked)}\n      />\n    </form>\n  );\n}',
        keyPoints: [
          'Input value is bound to state',
          'value + onChange together (checked for checkboxes)',
          'React is the single source of truth',
          'Makes validation and dynamic forms easy',
        ],
        quiz: [
          { question: 'A controlled input gets its value from…', options: ['the DOM', 'React state', 'a ref', 'localStorage'], correctIndex: 1 },
          { question: 'A controlled checkbox uses which prop instead of value?', options: ['checked', 'selected', 'active', 'on'], correctIndex: 0 },
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
        title: 'Uncontrolled Components with useRef',
        difficulty: 'medium',
        tags: ['forms', 'ref'],
        explanation: {
          english:
            'An uncontrolled input keeps its own value in the DOM; you read it only when needed (e.g. on submit) via a ref, instead of re-rendering on every keystroke. Use defaultValue (not value) to set an initial value without taking control. This is simpler for one-off reads, file inputs (which must be uncontrolled), or wrapping non-React widgets.',
          hinglish:
            'Uncontrolled input apni value DOM mein rakhta hai; tum use sirf zaroorat pe (jaise submit pe) ref se padhte ho, har keystroke pe re-render nahi hota. Initial value set karne ke liye defaultValue use karo (value nahi) bina control liye. Ye one-off reads, file inputs (jo uncontrolled hi hote hain), ya non-React widgets wrap karne ke liye simpler hai.',
        },
        dailyLifeExample:
          'Uncontrolled TV ke apne buttons hain — tum sirf jab check karna ho tab dekhte ho ki volume kya hai (ref.current.value), har second screen update nahi karte.',
        codeExample:
          'function QuickForm() {\n  const inputRef = useRef(null);\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    console.log("value:", inputRef.current.value);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input ref={inputRef} defaultValue="" />\n      <button type="submit">Submit</button>\n    </form>\n  );\n}',
        keyPoints: [
          'DOM holds the value, not React state',
          'Read it via a ref when needed (e.g. on submit)',
          'Use defaultValue, not value',
          'File inputs must be uncontrolled',
        ],
        quiz: [
          { question: 'Which prop sets an initial value without controlling an input?', options: ['value', 'defaultValue', 'initial', 'placeholder'], correctIndex: 1 },
          { question: 'Which input type must always be uncontrolled?', options: ['text', 'checkbox', 'file', 'number'], correctIndex: 2 },
        ],
      },
      {
        title: 'Basic Form Validation',
        difficulty: 'medium',
        tags: ['forms', 'validation'],
        explanation: {
          english:
            'Track an errors object alongside your form state, validate on submit (and optionally on blur), and show messages only for fields the user has touched so errors do not flash before they have typed anything. Prevent the actual submission (e.preventDefault, then check errors) before calling your API.',
          hinglish:
            'Form state ke saath ek errors object track karo, submit pe (aur optionally blur pe) validate karo, aur messages sirf un fields ke liye dikhao jinhe user ne touch kiya ho taaki typing shuru karne se pehle error flash na ho. Asal submission rokoo (e.preventDefault, phir errors check karo) API call karne se pehle.',
        },
        dailyLifeExample:
          'Validation ek security guard jaisa hai jo gate (submit) pe ID check karta hai — galat ID pe andar nahi jaane deta, aur batata hai kya galat hai.',
        codeExample:
          'function LoginForm() {\n  const [email, setEmail] = useState("");\n  const [error, setError] = useState("");\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    if (!email.includes("@")) {\n      setError("Enter a valid email");\n      return;\n    }\n    setError("");\n    console.log("submitting", email);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      {error && <p className="error">{error}</p>}\n      <button type="submit">Login</button>\n    </form>\n  );\n}',
        keyPoints: [
          'Track an errors state alongside form values',
          'Validate on submit (and optionally on blur)',
          'Block submission until valid (preventDefault + check)',
          'Show errors only for touched/submitted fields',
        ],
        quiz: [
          { question: 'Where should you stop an invalid form from actually submitting?', options: ['In CSS', 'In the onSubmit handler before the API call', 'In useEffect', 'You cannot'], correctIndex: 1 },
          {
            question: "Why should you only show a validation error for a field the user has already 'touched' (interacted with)?",
            options: ['To make the code shorter', 'So errors do not flash on every field the moment the form loads, before the user has typed anything', 'React requires it', 'It has no real reason'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Hooks Deep Dive',
    level: 'intermediate',
    description: 'useEffect, useRef, useContext, useMemo/useCallback aur custom hooks.',
    concepts: [
      {
        title: 'useEffect Hook',
        difficulty: 'medium',
        tags: ['hooks', 'effects'],
        explanation: {
          english:
            'useEffect runs side effects (data fetching, subscriptions, timers, manual DOM work) after render. Its dependency array controls when it re-runs: [] runs once on mount, [a, b] runs when a or b change, and omitting it runs after every render. Return a cleanup function to undo effects (clear a timer, unsubscribe). useEffect cannot be async directly — define an async function inside it and call that instead, otherwise the cleanup return value breaks.',
          hinglish:
            'useEffect side effects chalata hai (data fetching, subscriptions, timers, manual DOM kaam) render ke baad. Iska dependency array control karta hai ki ye kab dobara chale: [] mount pe ek baar, [a, b] jab a ya b badlein, aur na dena har render ke baad. Effects undo karne ke liye ek cleanup function return karo (timer clear, unsubscribe). useEffect khud async nahi ho sakta — andar ek async function define karke use call karo, warna cleanup return value toot jaati hai.',
        },
        dailyLifeExample:
          'useEffect ek auto-responder jaisa hai — kaam (render) hone ke baad apne aap ek action chalta hai. Cleanup function "jaane se pehle lights bujha do" jaisa hai.',
        codeExample:
          'function UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    async function load() {\n      const res = await fetch(`/api/users/${userId}`);\n      const data = await res.json();\n      if (!cancelled) setUser(data);\n    }\n    load();\n    return () => { cancelled = true; }; // cleanup: ignore stale response\n  }, [userId]); // re-run whenever userId changes\n\n  return <p>{user?.name ?? "Loading…"}</p>;\n}',
        keyPoints: [
          'Runs side effects after render',
          '[] = once on mount; [deps] = when deps change',
          'No array = after every render',
          'Cannot be async directly — call an async function from inside',
        ],
        quiz: [
          { question: 'An empty dependency array [] means the effect runs…', options: ['Every render', 'Once on mount', 'Never', 'On unmount only'], correctIndex: 1 },
          { question: 'Can the function passed to useEffect itself be async?', options: ['Yes, always', 'No — call an async function from inside it', 'Only with await', 'Only in class components'], correctIndex: 1 },
          {
            question: 'useEffect(() => { console.log(count); }, []) — count never updates in the log, even after count changes. Why?',
            options: [
              'console.log is broken',
              "The effect ran once with count's initial value baked in (a stale closure) — an empty array means it never re-runs to see the new count",
              'useEffect cannot read state at all',
              'This is a React bug',
            ],
            correctIndex: 1,
            explanation: 'With [], the effect function closes over the value of count from that very first render only, and never runs again to "see" newer values. This is called a stale closure — the fix is to add count to the dependency array.',
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the dependency array in useEffect and what bugs come from getting it wrong?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'The dependency array tells React which values an effect depends on, so it re-runs only when they change. Missing a dependency leads to stale closures (the effect uses old values); adding unstable dependencies (like a new function/object created every render) causes infinite loops or excessive runs. Fix with correct deps, useCallback/useMemo for stable references, or functional state updates.',
              hinglish:
                'Dependency array React ko batati hai effect kin values pe depend karta hai, taaki wo tabhi dobara chale jab wo badlein. Koi dependency miss karne par stale closures (effect purani values use karta hai); unstable dependencies dena (jaise har render pe naya function/object) infinite loops ya zyada runs deta hai. Fix: sahi deps, stable references ke liye useCallback/useMemo, ya functional state updates.',
            },
          },
        ],
      },
      {
        title: 'Fetching Data: Loading, Error & Race Conditions',
        difficulty: 'medium',
        tags: ['hooks', 'data-fetching'],
        explanation: {
          english:
            "A robust data-fetching component tracks THREE states: loading (request in flight), error (it failed), and data (success). Show a spinner while loading, an error message on failure, and the content once data arrives. A subtler bug: if userId changes quickly (e.g. switching profiles fast), an OLD request can resolve AFTER a newer one, overwriting fresh data with stale data — a race condition. Fix it with a cleanup flag or AbortController that cancels the outdated request.",
          hinglish:
            'Ek robust data-fetching component TEEN states track karta hai: loading (request chal rahi hai), error (fail ho gaya), aur data (success). Loading mein spinner dikhao, fail hone pe error message, aur data aane pe content. Ek subtle bug: agar userId jaldi-jaldi badle (jaise profiles fast switch karna), to ek PURANI request ek NAYI ke BAAD resolve ho sakti hai, fresh data ko stale data se overwrite kar deti hai — ise race condition kehte hain. Fix: cleanup flag ya AbortController jo purani request cancel kar de.',
        },
        dailyLifeExample:
          'Race condition do runners jaisa hai jo alag time pe race shuru karte hain — agar dheere wala (purani request) tez wale (nayi request) ke baad finish line pe pahunche aur uska result board pe likh de, to galat result dikhega. AbortController ek referee jaisa hai jo purane runner ko beech mein hi rok deta hai.',
        codeExample:
          "function UserProfile({ userId }) {\n  const [state, setState] = useState({ status: 'idle', data: null, error: null });\n\n  useEffect(() => {\n    const controller = new AbortController();\n    setState({ status: 'loading', data: null, error: null });\n\n    fetch(`/api/users/${userId}`, { signal: controller.signal })\n      .then((res) => res.json())\n      .then((data) => setState({ status: 'success', data, error: null }))\n      .catch((err) => {\n        if (err.name !== 'AbortError') setState({ status: 'error', data: null, error: err.message });\n      });\n\n    return () => controller.abort(); // cancel if userId changes before this finishes\n  }, [userId]);\n\n  if (state.status === 'loading') return <p>Loading…</p>;\n  if (state.status === 'error') return <p>Error: {state.error}</p>;\n  return <p>{state.data?.name}</p>;\n}",
        keyPoints: [
          'Track loading, error, and data/success as distinct UI states',
          'Show a spinner, error message, or content based on the current state',
          'A race condition: an older, slower request resolving AFTER a newer one, overwriting fresh data',
          'AbortController.abort() in the cleanup function cancels the stale request',
          'Frameworks like React Query/SWR handle all of this for you automatically',
        ],
        quiz: [
          {
            question: 'What is a race condition in data fetching?',
            options: ['The app fetches too fast', 'An older, slower request resolves after a newer one and overwrites fresh data with stale data', 'A network timeout', 'A CSS animation bug'],
            correctIndex: 1,
          },
          {
            question: 'What does controller.abort() do when called in a useEffect cleanup function?',
            options: ['Deletes the component', 'Cancels the in-flight fetch request tied to that controller', 'Clears all state', 'Restarts the request'],
            correctIndex: 1,
          },
          {
            question: 'Which THREE states should a well-built fetching component track?',
            options: ['Small, medium, large', 'Loading, error, data/success', 'Red, yellow, green', 'Mount, update, unmount'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Strict Mode & Why Effects Run Twice in Dev',
        difficulty: 'medium',
        tags: ['strict-mode', 'debugging'],
        explanation: {
          english:
            "Wrapping your app in <StrictMode> helps catch bugs early by intentionally double-invoking certain functions in DEVELOPMENT ONLY: component render functions, and (since React 18) effects — mount → cleanup → mount again. This is not a bug — it simulates an effect surviving an unmount/remount, exposing effects that are not properly cleaned up (like a missing unsubscribe). In production, none of this double-invoking happens; StrictMode is purely a development-time safety net.",
          hinglish:
            'Apni app ko <StrictMode> mein wrap karna bugs jaldi pakadne mein madad karta hai, kuch functions ko jaan-boojh kar DOUBLE-INVOKE karke, sirf DEVELOPMENT mein: component render functions, aur (React 18 se) effects — mount → cleanup → dobara mount. Ye bug nahi hai — ye simulate karta hai ki effect ek unmount/remount se bach gaya, aur un effects ko expose karta hai jo properly clean up nahi hote (jaise missing unsubscribe). Production mein ye double-invoking bilkul nahi hoti; StrictMode purely ek development-time safety net hai.',
        },
        dailyLifeExample:
          'StrictMode ek fire-drill jaisa hai — school jaan-boojh kar practice ke liye alarm bajata hai (koi real aag nahi) taaki dekh sake sab sahi se bahar nikal paate hain ya nahi. Agar tumhara useEffect drill mein fail hota hai (cleanup missing), to real emergency (production bugs) mein bhi fail hoga.',
        codeExample:
          "// In dev with StrictMode, this console.log runs TWICE on mount:\nfunction Timer() {\n  useEffect(() => {\n    console.log('subscribed');\n    const id = setInterval(() => console.log('tick'), 1000);\n    return () => {\n      console.log('unsubscribed'); // MUST clean up properly\n      clearInterval(id);\n    };\n  }, []);\n  return <p>Timer running</p>;\n}\n// Console (dev only): subscribed -> unsubscribed -> subscribed\n// If cleanup were missing, you'd get TWO intervals running — a real bug StrictMode just revealed",
        keyPoints: [
          'StrictMode double-invokes render and effects in DEVELOPMENT only, never production',
          'It simulates mount -> cleanup -> mount to catch effects with missing/incorrect cleanup',
          'Seeing an effect (or a console.log inside one) run twice locally is expected, not a bug',
          'If double-running breaks your app, the real bug is a missing cleanup function',
          'Wrap your root component in <StrictMode> to get this safety net',
        ],
        quiz: [
          {
            question: 'Why does a useEffect sometimes appear to run twice when developing locally?',
            options: ['A React bug that needs a workaround', 'StrictMode intentionally double-invokes effects in development to catch missing cleanup', 'Because of slow internet', 'It only happens with class components'],
            correctIndex: 1,
          },
          {
            question: "Does StrictMode's double-invoking behaviour happen in production builds?",
            options: ['Yes, always', 'No — it is development-only', 'Only on slow devices', 'Only for class components'],
            correctIndex: 1,
          },
          {
            question: 'If double-invoking an effect breaks your app, what is the real underlying bug?',
            options: ['A React bug you cannot fix', 'A missing or incorrect cleanup function in that effect', 'Using too many hooks', 'A CSS issue'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'useRef Hook',
        difficulty: 'medium',
        tags: ['hooks', 'ref'],
        explanation: {
          english:
            'useRef returns a mutable object with a .current property that persists across renders WITHOUT causing a re-render when changed. Two main uses: accessing a DOM node directly (focusing an input, scrolling), and storing a mutable value that should not trigger renders — like a timer id, a websocket instance, or the previous value of a prop.',
          hinglish:
            'useRef ek mutable object deta hai jiska .current property renders ke beech persist karta hai par badalne par re-render nahi karta. Do main use: DOM node ko seedha access karna (input focus, scroll), aur ek mutable value store karna jo render trigger na kare — jaise timer id, websocket instance, ya kisi prop ki previous value.',
        },
        dailyLifeExample:
          'useRef ek sticky note jaisa hai jo fridge pe chipka rehta hai — value yaad rehti hai par usse poora ghar (UI) dobara nahi sajta.',
        codeExample:
          'function SearchBox() {\n  const inputRef = useRef(null);\n  const renderCount = useRef(0);\n  renderCount.current++; // does NOT cause a re-render\n\n  return (\n    <>\n      <input ref={inputRef} />\n      <button onClick={() => inputRef.current.focus()}>Focus</button>\n      <p>Rendered {renderCount.current} times</p>\n    </>\n  );\n}',
        keyPoints: [
          '.current persists across renders',
          'Changing a ref does NOT re-render',
          'Use for DOM access (focus, scroll)',
          'Use for mutable values that should not trigger renders',
        ],
        quiz: [
          { question: 'Does changing ref.current cause a re-render?', options: ['Yes', 'No', 'Sometimes', 'Only with state'], correctIndex: 1 },
          { question: 'A common use of useRef is…', options: ['Fetching data', 'Accessing a DOM node', 'Styling', 'Routing'], correctIndex: 1 },
        ],
      },
      {
        title: 'useContext Hook',
        difficulty: 'medium',
        tags: ['hooks', 'context'],
        explanation: {
          english:
            'Context shares data across the component tree without passing props through every level ("prop drilling"). Create a context, wrap part of the tree in its Provider with a value, and read it anywhere below with useContext. Great for themes, auth, and language settings. Caveat: when the Provider value changes, every consumer re-renders — split contexts or memoize the value object to avoid unnecessary re-renders.',
          hinglish:
            'Context data ko component tree mein share karta hai bina har level se props bheje ("prop drilling"). Ek context banao, tree ke ek hisse ko uske Provider mein value ke saath wrap karo, aur neeche kahin bhi useContext se padho. Themes, auth, aur language settings ke liye badhiya. Caveat: Provider value badalne par har consumer re-render hota hai — unnecessary re-renders se bachne ke liye contexts split karo ya value object memoize karo.',
        },
        dailyLifeExample:
          'Context ek ghar ka WiFi jaisa hai — ek baar router (Provider) lagao, har kamre (component) mein bina alag-alag wire (props) ke connection mil jaata hai.',
        codeExample:
          'const ThemeContext = createContext("light");\n\nfunction App() {\n  const [theme, setTheme] = useState("dark");\n  return (\n    <ThemeContext.Provider value={theme}>\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  return <div className={theme}>Theme: {theme}</div>;\n}',
        keyPoints: [
          'Avoids prop drilling',
          'Provider supplies the value; useContext reads it',
          'Good for themes, auth, locale',
          'Value change re-renders all consumers — memoize/split if costly',
        ],
        quiz: [
          { question: 'What problem does Context mainly solve?', options: ['Slow renders', 'Prop drilling', 'Routing', 'Styling'], correctIndex: 1 },
          { question: 'When a Provider value changes, which components re-render?', options: ['None', 'Only the Provider', 'All consumers below it', 'The whole app always'], correctIndex: 2 },
        ],
      },
      {
        title: 'useMemo & useCallback',
        difficulty: 'hard',
        tags: ['hooks', 'performance'],
        explanation: {
          english:
            'useMemo caches an expensive computed VALUE between renders, recomputing only when its dependencies change. useCallback caches a FUNCTION reference, useful for passing stable callbacks to memoized children (React.memo) or as a stable useEffect dependency. In fact useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Use them to fix measured performance problems — not as a default everywhere, since memoization itself has a cost.',
          hinglish:
            'useMemo ek mehnga computed VALUE renders ke beech cache karta hai, sirf tab dobara calculate karta hai jab dependencies badlein. useCallback ek FUNCTION reference cache karta hai, memoized children (React.memo) ko stable callback dene ya useEffect dependency ke liye kaam ka. Asal mein useCallback(fn, deps) = useMemo(() => fn, deps). Inhe real performance problems fix karne ke liye use karo — by default har jagah nahi, kyunki memoization ka khud bhi cost hota hai.',
        },
        dailyLifeExample:
          'Memoization ready notes jaise hain — same sawaal dobara aaye to dobara solve nahi karte, saved answer de dete hain.',
        codeExample:
          'function ProductList({ products, query }) {\n  // recompute only when products or query changes\n  const filtered = useMemo(\n    () => products.filter((p) => p.name.includes(query)),\n    [products, query]\n  );\n\n  // stable reference so <Row> (React.memo) does not re-render needlessly\n  const handleSelect = useCallback((id) => console.log("selected", id), []);\n\n  return filtered.map((p) => <Row key={p.id} product={p} onSelect={handleSelect} />);\n}',
        keyPoints: [
          'useMemo: cache an expensive VALUE',
          'useCallback: cache a FUNCTION reference',
          'useCallback(fn, deps) === useMemo(() => fn, deps)',
          'Use to fix measured problems, not everywhere by default',
        ],
        quiz: [
          { question: 'What does useMemo cache?', options: ['A function', 'A computed value', 'A component', 'A ref'], correctIndex: 1 },
          { question: 'useCallback is mainly used to cache…', options: ['a value', 'a function reference', 'JSX', 'state'], correctIndex: 1 },
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
      {
        title: 'Custom Hooks',
        difficulty: 'hard',
        tags: ['hooks', 'reuse'],
        explanation: {
          english:
            'A custom hook is a function whose name starts with "use" and that calls other hooks to package reusable stateful logic. It lets you share logic (not UI) between components — e.g. useLocalStorage, useFetch, useDebounce. Each component using the hook gets its own isolated state; only the logic is shared, not the data.',
          hinglish:
            'Custom hook ek function hai jiska naam "use" se shuru hota hai aur jo doosre hooks call karke reusable stateful logic package karta hai. Isse components ke beech logic (UI nahi) share hota hai — jaise useLocalStorage, useFetch, useDebounce. Hook use karne wale har component ko apni alag isolated state milti hai; sirf logic share hota hai, data nahi.',
        },
        dailyLifeExample:
          'Custom hook ek apni recipe jaisa hai — ek baar likho (useFetch), jahan chaaho use karo. Har dish (component) usse banegi par apne alag ingredients (state) ke saath.',
        codeExample:
          'function useDebounce(value, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n  return debounced;\n}\n\nfunction SearchBox() {\n  const [query, setQuery] = useState("");\n  const debouncedQuery = useDebounce(query, 400);\n  // fetch only fires when debouncedQuery settles\n  useEffect(() => {\n    if (debouncedQuery) fetch(`/api/search?q=${debouncedQuery}`);\n  }, [debouncedQuery]);\n  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;\n}',
        keyPoints: [
          'A function starting with "use"',
          'Calls other hooks inside',
          'Shares logic, not UI or state',
          'Each usage has isolated state',
        ],
        quiz: [
          { question: 'Custom hook names must start with…', options: ['get', 'use', 'hook', 'my'], correctIndex: 1 },
          { question: 'Custom hooks let you reuse…', options: ['UI markup', 'stateful logic', 'CSS', 'images'], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    title: 'Component Patterns',
    level: 'intermediate',
    description: 'Lifting state, composition aur higher-order components.',
    concepts: [
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
          { question: 'When two siblings must share state, you should…', options: ['Duplicate it in both', 'Lift it to a common parent', 'Use a global variable', 'Use a ref'], correctIndex: 1 },
          {
            question: 'What problem happens if two sibling components each keep their OWN separate copy of state that should really be shared?',
            options: ['Nothing, it works fine', 'The two copies can drift out of sync with each other', 'It makes the app render faster', 'React throws a build error'],
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
            'Composition means building complex UIs by nesting and combining components, often using the children prop to pass JSX into a wrapper. React favours composition over inheritance — reusable wrappers like Card or Modal accept children and render them inside, staying flexible. The "slot" pattern extends this by accepting multiple named props for different regions (header, footer) instead of just one children block.',
          hinglish:
            'Composition ka matlab complex UIs ko components nest aur combine karke banana, aksar children prop se JSX ko ek wrapper mein pass karke. React inheritance se zyada composition prefer karta hai — Card ya Modal jaise reusable wrappers children accept karke unhe andar render karte hain, flexible rehte hue. "Slot" pattern isse extend karta hai, ek hi children block ki jagah alag regions (header, footer) ke liye multiple named props accept karke.',
        },
        dailyLifeExample:
          'Composition ek gift box jaisa hai — box (wrapper component) koi bhi gift (children) le sakta hai. Slot pattern ek tiffin box jaisa hai jisme alag-alag compartments (header, body, footer) fixed hain.',
        codeExample:
          'function Card({ children }) {\n  return <div className="card">{children}</div>;\n}\n\n// Slot pattern: named regions instead of one children block\nfunction Layout({ header, footer, children }) {\n  return (\n    <div>\n      <header>{header}</header>\n      <main>{children}</main>\n      <footer>{footer}</footer>\n    </div>\n  );\n}\n\n<Layout header={<h1>Title</h1>} footer={<p>© 2026</p>}>\n  <p>Body content</p>\n</Layout>',
        keyPoints: [
          'Build UIs by combining components',
          'children prop passes JSX into a wrapper',
          'React prefers composition over inheritance',
          'Slot pattern: multiple named props for different regions',
        ],
        quiz: [
          { question: 'Which prop passes nested JSX into a component?', options: ['content', 'children', 'inner', 'slot'], correctIndex: 1 },
          { question: 'React favours composition over…', options: ['functions', 'inheritance', 'hooks', 'props'], correctIndex: 1 },
        ],
      },
      {
        title: 'Higher-Order Components',
        difficulty: 'hard',
        tags: ['hoc', 'patterns'],
        explanation: {
          english:
            'A Higher-Order Component (HOC) is a function that takes a component and returns a new, enhanced component — a pattern for reusing cross-cutting logic like auth checks or loading states. It is older than hooks, and many use cases (sharing stateful logic) are now better served by custom hooks; but HOCs are still seen in libraries and for wrapping components with extra props or behaviour.',
          hinglish:
            'Higher-Order Component (HOC) ek function hai jo ek component leta hai aur naya, enhanced component return karta hai — auth checks ya loading states jaisa cross-cutting logic reuse karne ka pattern. Ye hooks se purana hai, aur bahut se use cases (stateful logic share karna) ab custom hooks se behtar solve hote hain; par HOCs abhi bhi libraries mein aur components ko extra props/behaviour se wrap karne ke liye dekhe jaate hain.',
        },
        dailyLifeExample:
          'HOC ek gift-wrapping service jaisa hai — tum koi bhi gift (component) do, wo use ek security tag (extra behaviour) ke saath wapas wrap karke de dete hain.',
        codeExample:
          'function withAuth(Component) {\n  return function Wrapped(props) {\n    const { user } = useAuth();\n    if (!user) return <p>Please log in</p>;\n    return <Component {...props} user={user} />;\n  };\n}\n\nconst ProtectedDashboard = withAuth(Dashboard);',
        keyPoints: [
          'A function that takes a component, returns an enhanced one',
          'Used for cross-cutting concerns (auth, loading)',
          'Predates hooks; custom hooks now cover many use cases',
          'Still common in some libraries',
        ],
        quiz: [
          { question: 'A Higher-Order Component is…', options: ['A CSS class', 'A function that returns an enhanced component', 'A hook', 'A context'], correctIndex: 1 },
          {
            question: "A common HOC mistake is forgetting {...props} in return <Component {...props} />. What does that spread do?",
            options: ['Deletes the props', "Forwards all the original component's props through to the wrapped component", 'Only passes children', 'Converts props into state'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'React Performance',
    level: 'intermediate',
    description: 'React.memo, code splitting aur list virtualization.',
    concepts: [
      {
        title: 'React.memo',
        difficulty: 'hard',
        tags: ['performance', 'memoization'],
        explanation: {
          english:
            'React.memo wraps a component so React skips re-rendering it if its props are shallowly equal to the previous render. It helps when a component is expensive to render and its parent re-renders often with the same props. It does NOT help if you pass a new object/array/function as a prop on every render (shallow equality will always fail) — combine with useMemo/useCallback for those props.',
          hinglish:
            'React.memo ek component ko wrap karta hai taaki React use re-render skip kar de agar uske props pichhle render se shallow equal hon. Ye tab kaam aata hai jab component render karna mehnga ho aur uska parent baar-baar same props ke saath re-render ho. Ye tab kaam NAHI karta jab tum har render pe naya object/array/function prop ke roop mein bhejte ho (shallow equality hamesha fail hogi) — un props ke liye useMemo/useCallback ke saath combine karo.',
        },
        dailyLifeExample:
          'React.memo ek "already done" stamp jaisa hai — agar order (props) wahi hai jo pehle tha, dobara nahi banate, purana hi de dete hain.',
        codeExample:
          'const Row = React.memo(function Row({ item, onSelect }) {\n  console.log("rendering row", item.id);\n  return <li onClick={() => onSelect(item.id)}>{item.name}</li>;\n});\n\n// Parent must give Row a STABLE onSelect, or memo is useless:\nconst handleSelect = useCallback((id) => setSelected(id), []);',
        keyPoints: [
          'Skips re-render if props are shallowly equal',
          'Helps for expensive components re-rendered with same props',
          'Useless if props include a new object/function every render',
          'Pair with useMemo/useCallback for those prop values',
        ],
        quiz: [
          { question: 'React.memo skips a re-render when…', options: ['State changes', 'Props are shallowly equal to last render', 'Always', 'Never'], correctIndex: 1 },
          {
            question: 'You wrap <Row> in React.memo, but the parent passes onSelect={(id) => setSelected(id)} inline. Does memo actually prevent re-renders now?',
            options: [
              'Yes, memo always works regardless of prop types',
              'No — a new inline function is created every render, so the onSelect prop is never shallowly equal, and Row still re-renders every time',
              'Only if the component has no state',
              'Only in production builds',
            ],
            correctIndex: 1,
            explanation: 'React.memo compares props with shallow equality (===). A new arrow function is a new reference every render, so onSelect never matches the previous one — memo is defeated unless the parent wraps it in useCallback.',
          },
        ],
      },
      {
        title: 'Code Splitting with lazy & Suspense',
        difficulty: 'hard',
        tags: ['performance', 'code-splitting'],
        explanation: {
          english:
            'React.lazy() lets you import a component only when it is actually needed, splitting your bundle into smaller chunks loaded on demand — common for routes or rarely-used modals/dialogs. Wrap the lazy component in <Suspense fallback={...}> so React shows a fallback UI while the chunk downloads.',
          hinglish:
            'React.lazy() se tum kisi component ko sirf tab import karte ho jab uski zaroorat ho, bundle ko chhote chunks mein split karke jo on-demand load hon — routes ya kam-use-hone-wale modals/dialogs ke liye common. Lazy component ko <Suspense fallback={...}> mein wrap karo taaki chunk download hone tak React fallback UI dikhaye.',
        },
        dailyLifeExample:
          'Code splitting ek buffet jaisa hai — sab dishes ek saath nahi laate, jo order karo wahi server karte ho. Suspense fallback waiting table card jaisa hai — "aa rahi hai" dikhata hai.',
        codeExample:
          'import { lazy, Suspense } from "react";\n\nconst AdminDashboard = lazy(() => import("./AdminDashboard"));\n\nfunction App() {\n  return (\n    <Suspense fallback={<p>Loading dashboard…</p>}>\n      <AdminDashboard />\n    </Suspense>\n  );\n}',
        keyPoints: [
          'React.lazy() loads a component on demand',
          'Splits the bundle into smaller chunks',
          'Wrap in <Suspense fallback={...}>',
          'Common for routes and rarely-used UI',
        ],
        quiz: [
          { question: 'Which component shows a fallback while a lazy component loads?', options: ['<ErrorBoundary>', '<Suspense>', '<Loading>', '<Fallback>'], correctIndex: 1 },
          {
            question: 'If you do NOT code-split a huge admin dashboard that most visitors never open, what happens to a regular visitor on a slow connection?',
            options: ['Nothing, unused code has no cost', 'They still download that unused code, slowing down their initial page load', 'The app refuses to build', 'It only affects mobile users'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'List Virtualization',
        difficulty: 'hard',
        tags: ['performance', 'lists'],
        explanation: {
          english:
            'Rendering a list of thousands of items is slow because the browser must create and paint every DOM node, even off-screen ones. Virtualization (windowing) renders only the items currently visible in the viewport (plus a small buffer), recycling DOM nodes as the user scrolls. Libraries like react-window or react-virtualized implement this; you rarely build it from scratch.',
          hinglish:
            'Hazaaron items ki list render karna slow hota hai kyunki browser ko har DOM node banana aur paint karna padta hai, off-screen wale bhi. Virtualization (windowing) sirf wahi items render karta hai jo abhi viewport mein dikh rahe hon (plus thoda buffer), scroll hone par DOM nodes recycle karte hue. react-window ya react-virtualized jaisi libraries ye implement karti hain; isse scratch se banana rare hai.',
        },
        dailyLifeExample:
          'Virtualization ek train ke window jaisa hai — bahar poora scene ek saath nahi dikhta, sirf jo abhi window ke saamne hai wahi dikhta hai, jaise jaise train chalegi naya view aayega.',
        codeExample:
          '// Conceptually, with react-window:\nimport { FixedSizeList } from "react-window";\n\nfunction BigList({ items }) {\n  return (\n    <FixedSizeList height={400} itemCount={items.length} itemSize={35} width="100%">\n      {({ index, style }) => (\n        <div style={style}>{items[index].name}</div>\n      )}\n    </FixedSizeList>\n  );\n}',
        keyPoints: [
          'Rendering huge lists fully is slow (off-screen nodes too)',
          'Virtualization renders only visible items + a buffer',
          'Recycles DOM nodes while scrolling',
          'Use libraries (react-window) instead of building it yourself',
        ],
        quiz: [
          { question: 'List virtualization mainly helps by…', options: ['Adding more DOM nodes', 'Rendering only visible items', 'Removing keys', 'Disabling scrolling'], correctIndex: 1 },
          {
            question: 'Without virtualization, why is rendering a 10,000-item list slow even though most items are scrolled off-screen?',
            options: ['The browser is single-threaded and refuses to render lists', 'The browser still has to create, layout, and paint a real DOM node for every item, visible or not', 'JavaScript arrays have a 1,000-item limit', 'CSS cannot style large lists'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Client-Side Routing',
    level: 'intermediate',
    description: 'Plain React mein multi-page-jaisi navigation — React Router.',
    concepts: [
      {
        title: 'React Router Basics: Client-Side Navigation',
        difficulty: 'medium',
        tags: ['routing', 'react-router'],
        explanation: {
          english:
            'Plain React has no built-in routing — React Router is the standard library that maps URLs to components without a full page reload (using the History API under the hood). Wrap your app in a <BrowserRouter>, define <Route path="..." element={...}> pairs inside <Routes>, and use <Link to="..."> instead of <a href> so navigation stays client-side. useNavigate() lets you redirect programmatically, and useParams() reads dynamic segments like /users/:id.',
          hinglish:
            'Plain React mein built-in routing nahi hoti — React Router standard library hai jo URLs ko components se map karti hai bina poore page reload ke (peeche History API use karke). App ko <BrowserRouter> mein wrap karo, <Routes> ke andar <Route path="..." element={...}> pairs define karo, aur <a href> ki jagah <Link to="..."> use karo taaki navigation client-side rahe. useNavigate() se programmatically redirect kar sakte ho, aur useParams() se dynamic segments padh sakte ho jaise /users/:id.',
        },
        dailyLifeExample:
          'React Router ek mall ke andar ke direction boards jaisa hai — mall (app) se bahar nikal ke wapas nahi aana padta (page reload nahi), bas signboard follow karke turant doosri dukaan (page) pe pahunch jaate ho.',
        codeExample:
          "import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Link to=\"/\">Home</Link>\n      <Link to=\"/users/42\">User 42</Link>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/users/:id\" element={<UserProfile />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n\nfunction UserProfile() {\n  const { id } = useParams();        // reads ':id' from the URL\n  const navigate = useNavigate();\n  return (\n    <div>\n      <p>Viewing user {id}</p>\n      <button onClick={() => navigate('/')}>Go home</button>\n    </div>\n  );\n}",
        keyPoints: [
          'Plain React has no routing built in — React Router is the standard add-on',
          '<Link to="..."> navigates client-side without a full page reload; <a href> would reload',
          '<Route path element> pairs inside <Routes> map URLs to components',
          'useParams() reads dynamic URL segments (e.g. :id)',
          'useNavigate() redirects programmatically (e.g. after a form submits)',
        ],
        quiz: [
          {
            question: 'Why use <Link> instead of a plain <a href> for internal navigation?',
            options: ['Link looks nicer', 'Link navigates client-side without a full page reload; <a> would reload the page', '<a> tags are deprecated', 'No real difference'],
            correctIndex: 1,
          },
          {
            question: 'Which hook reads a dynamic URL segment like the :id in /users/:id?',
            options: ['useNavigate()', 'useParams()', 'useLocation()', 'useRoute()'],
            correctIndex: 1,
          },
          {
            question: 'How do you redirect a user to another page from inside a function (e.g. after a form submits)?',
            options: ['Change window.location directly only', 'useNavigate()', '<Link>', 'You cannot redirect programmatically'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'State Management',
    level: 'advanced',
    description: 'useReducer, Context+Reducer, aur kab external library use karein.',
    concepts: [
      {
        title: 'useReducer Hook',
        difficulty: 'hard',
        tags: ['hooks', 'state'],
        explanation: {
          english:
            'useReducer manages complex state via a reducer function: state + action -> new state. You dispatch actions and the reducer decides the next state. It is preferable to useState when state has many related sub-values or the next state depends on the previous one, keeping update logic in one predictable, testable place.',
          hinglish:
            'useReducer complex state ko ek reducer function se manage karta hai: state + action -> new state. Tum actions dispatch karte ho aur reducer decide karta hai agli state. Ye useState se behtar hai jab state ke kai related sub-values hon ya agli state pichhli pe depend kare, update logic ek predictable, testable jagah rakhte hue.',
        },
        dailyLifeExample:
          'useReducer ek vending machine jaisa hai — tum button (action) dabate ho, machine (reducer) apne rules se decide karti hai kya nikle (new state). Logic ek hi jagah, predictable.',
        codeExample:
          'function todosReducer(state, action) {\n  switch (action.type) {\n    case "add":\n      return [...state, { id: Date.now(), text: action.text, done: false }];\n    case "toggle":\n      return state.map((t) => t.id === action.id ? { ...t, done: !t.done } : t);\n    case "remove":\n      return state.filter((t) => t.id !== action.id);\n    default:\n      return state;\n  }\n}\n\nconst [todos, dispatch] = useReducer(todosReducer, []);\n// dispatch({ type: "add", text: "Learn reducers" });\n// dispatch({ type: "toggle", id: 123 });',
        keyPoints: [
          '(state, action) => newState',
          'dispatch actions to update state',
          'Better than useState for complex/related state',
          'Centralises and tests update logic in one place',
        ],
        quiz: [
          { question: 'A reducer has the signature…', options: ['(props) => JSX', '(state, action) => newState', '() => value', '(a, b) => sum'], correctIndex: 1 },
          { question: 'How do you trigger a state update with useReducer?', options: ['setState', 'dispatch(action)', 'update()', 'emit()'], correctIndex: 1 },
        ],
      },
      {
        title: 'Context + useReducer for State Management',
        difficulty: 'hard',
        tags: ['state-management', 'context'],
        explanation: {
          english:
            'Combining useReducer (predictable state logic) with Context (global access) gives a lightweight, built-in alternative to libraries like Redux for small/medium apps. The reducer holds the logic, Context provides the state and dispatch to the whole tree. For large apps, dedicated libraries (Redux Toolkit, Zustand) may scale better since they offer selectors, middleware, and devtools.',
          hinglish:
            'useReducer (predictable state logic) aur Context (global access) ko milana chhoti/medium apps ke liye Redux jaisi libraries ka lightweight, built-in alternative deta hai. Reducer logic rakhta hai, Context state aur dispatch poore tree ko deta hai. Badi apps ke liye dedicated libraries (Redux Toolkit, Zustand) behtar scale kar sakti hain kyunki wo selectors, middleware, aur devtools dete hain.',
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
          { question: 'Context + useReducer is a built-in alternative to…', options: ['React itself', 'Redux for small/medium apps', 'CSS', 'the DOM'], correctIndex: 1 },
          {
            question: 'What is a downside of Context + useReducer for a large app with frequently-changing state?',
            options: ['It cannot hold objects', 'Every consumer re-renders whenever the context value changes, which can hurt performance at scale', 'It only works with class components', 'It requires a server'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'When to Use What',
        difficulty: 'medium',
        tags: ['state-management', 'decision'],
        explanation: {
          english:
            'A simple decision tree: state used by one component -> useState/useReducer locally. State needed by a few nearby components -> lift it to their common parent. State needed across distant, unrelated parts of the tree but changes rarely (theme, auth) -> Context. State that is large, changes often, and is read by many components across the app -> a dedicated library (Zustand, Redux Toolkit) to avoid excessive Context re-renders and get good devtools.',
          hinglish:
            'Ek simple decision tree: state sirf ek component use kare -> local useState/useReducer. Kuch paas wale components ko chahiye -> common parent mein lift karo. Door, alag parts of tree ko chahiye par rarely badle (theme, auth) -> Context. State bada ho, baar-baar badle, aur poori app ke kai components padhein -> dedicated library (Zustand, Redux Toolkit) taaki Context ke excessive re-renders na ho aur achhe devtools milein.',
        },
        dailyLifeExample:
          'Ye ek ghar ke storage decisions jaisa hai — apni jeb mein (local state) chhoti cheez, common almari mein (lifted state) shared cheez, aur poore mohalle ke godown mein (external store) bahut bada, frequently accessed stock.',
        codeExample:
          '// Local: only this component cares\nconst [open, setOpen] = useState(false);\n\n// Lifted: two sibling inputs need to sync\nfunction Parent() { const [value, setValue] = useState(""); /* pass down */ }\n\n// Context: rarely-changing, app-wide\nconst ThemeContext = createContext("light");\n\n// External store: large, frequent, read everywhere\n// import { create } from "zustand";\n// const useCartStore = create((set) => ({ items: [], addItem: (i) => set((s) => ({ items: [...s.items, i] })) }));',
        keyPoints: [
          'Local state: useState/useReducer in the component',
          'Shared by siblings: lift to common parent',
          'Rare changes, app-wide: Context',
          'Large, frequent, app-wide: external store (Zustand/Redux Toolkit)',
        ],
        quiz: [
          { question: 'For state that changes very often and is read across many components, you should prefer…', options: ['Context only', 'A dedicated state library', 'Global variables', 'Props drilling'], correctIndex: 1 },
          {
            question: 'If only ONE component needs a piece of state and nothing else in the app cares about it, what is the best choice?',
            options: ['Put it in Context immediately', 'Use local useState/useReducer inside that component', 'Use a global store', 'Lift it all the way to the root App component'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Advanced Patterns & Internals',
    level: 'advanced',
    description: 'React Fiber, error boundaries, portals aur concurrent features.',
    concepts: [
      {
        title: 'React Fiber & Concurrent Rendering',
        difficulty: 'hard',
        tags: ['internals', 'fiber'],
        explanation: {
          english:
            'Fiber is the internal reconciliation engine (since React 16) that represents the component tree as a linked list of units of work, letting React pause, resume, or abandon rendering work — instead of the old synchronous, all-or-nothing recursive approach. This enables concurrent features: React can interrupt a low-priority render (like a big list update) to handle a high-priority one (like a keystroke), keeping the UI responsive.',
          hinglish:
            'Fiber (React 16 se) internal reconciliation engine hai jo component tree ko units-of-work ki linked list ke roop mein represent karta hai, jisse React render kaam ko pause, resume, ya abandon kar sake — purane synchronous, all-or-nothing recursive approach ki jagah. Isse concurrent features possible hote hain: React ek low-priority render (jaise badi list update) ko interrupt karke high-priority kaam (jaise keystroke) handle kar sakta hai, UI ko responsive rakhte hue.',
        },
        dailyLifeExample:
          'Fiber ek smart waiter jaisa hai jo ek bade order (low priority) ko beech mein rok ke ek urgent customer (high priority, jaise typing) ko pehle attend kar leta hai, phir wapas purane order pe aata hai.',
        codeExample:
          '// You rarely touch Fiber directly, but you use the features it enables:\nimport { useTransition } from "react";\n\nfunction SearchPage() {\n  const [isPending, startTransition] = useTransition();\n  const [query, setQuery] = useState("");\n\n  function handleChange(e) {\n    const value = e.target.value;\n    setQuery(value); // urgent: keep input responsive\n    startTransition(() => {\n      // low priority: can be interrupted by more typing\n      runExpensiveSearch(value);\n    });\n  }\n  return <input value={query} onChange={handleChange} />;\n}',
        keyPoints: [
          'Fiber = linked-list reconciliation engine (React 16+)',
          'Rendering work can be paused, resumed, or abandoned',
          'Enables concurrent features (interruptible rendering)',
          'useTransition/useDeferredValue expose this to your code',
        ],
        quiz: [
          { question: 'What does the Fiber architecture enable?', options: ['Faster CSS', 'Interruptible, prioritised rendering', 'Smaller bundles', 'Server rendering only'], correctIndex: 1 },
          {
            question: "Before Fiber (the old 'stack reconciler'), why could a large re-render make the whole page feel frozen?",
            options: [
              'CSS used to be much slower',
              'Rendering was synchronous and could not be paused once started — it had to finish the entire tree before yielding back to the browser',
              'JavaScript did not support loops yet',
              'Fiber did not actually change anything',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Error Boundaries',
        difficulty: 'hard',
        tags: ['errors', 'class-components'],
        explanation: {
          english:
            'An Error Boundary catches JavaScript errors thrown during rendering anywhere in its child tree and shows a fallback UI instead of crashing the whole app. It must currently be a class component implementing static getDerivedStateFromError (to render a fallback) and componentDidCatch (to log the error) — there is no hook equivalent yet. It does not catch errors in event handlers, async code, or server-side rendering.',
          hinglish:
            'Error Boundary apne child tree mein kahin bhi render ke dauraan thrown JavaScript errors ko catch karta hai aur poori app crash karne ke bajaye fallback UI dikhata hai. Isse abhi tak class component hona zaroori hai jo static getDerivedStateFromError (fallback render karne ke liye) aur componentDidCatch (error log karne ke liye) implement kare — abhi koi hook equivalent nahi hai. Ye event handlers, async code, ya server-side rendering ke errors catch nahi karta.',
        },
        dailyLifeExample:
          'Error Boundary ek circuit breaker jaisa hai — kisi ek appliance mein short circuit ho to poora ghar ka current nahi jaata, sirf wahi section trip hota hai.',
        codeExample:
          'class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    console.error("Caught:", error, info);\n  }\n  render() {\n    if (this.state.hasError) return <h2>Something went wrong.</h2>;\n    return this.props.children;\n  }\n}\n\n<ErrorBoundary>\n  <Dashboard />\n</ErrorBoundary>',
        keyPoints: [
          'Catches render-time errors in the child tree',
          'Must be a class (getDerivedStateFromError + componentDidCatch)',
          'Shows a fallback UI instead of crashing the app',
          'Does NOT catch event handler or async errors',
        ],
        quiz: [
          { question: 'Error Boundaries currently must be…', options: ['Function components with hooks', 'Class components', 'Context providers', 'Custom hooks'], correctIndex: 1 },
          { question: 'Do Error Boundaries catch errors inside an onClick handler?', options: ['Yes', 'No', 'Only in production', 'Only with try/catch removed'], correctIndex: 1 },
        ],
      },
      {
        title: 'Portals',
        difficulty: 'medium',
        tags: ['portals', 'dom'],
        explanation: {
          english:
            'ReactDOM.createPortal(children, domNode) renders children into a different part of the real DOM tree than where the component sits logically, while keeping it part of the same React tree (so events and context still work normally). The classic use case is modals and tooltips — they need to escape a parent\'s overflow:hidden or z-index stacking context, but should still behave like a normal child for state and events.',
          hinglish:
            'ReactDOM.createPortal(children, domNode) children ko real DOM tree ke ek alag hisse mein render karta hai jahan component logically baitha hai usse alag, par wo same React tree ka hissa rehta hai (isliye events aur context normal kaam karte hain). Classic use case modals aur tooltips hain — unhe parent ke overflow:hidden ya z-index stacking context se bahar nikalna hota hai, par state aur events ke liye normal child jaisa behave karna hota hai.',
        },
        dailyLifeExample:
          'Portal ek video call ke "pop out" window jaisa hai — window kahin bhi screen pe dikh rahi ho (DOM position alag), par wo us hi meeting (React tree) ka hissa hai.',
        codeExample:
          'import { createPortal } from "react-dom";\n\nfunction Modal({ children, onClose }) {\n  return createPortal(\n    <div className="modal-overlay" onClick={onClose}>\n      <div className="modal-content">{children}</div>\n    </div>,\n    document.getElementById("modal-root") // outside the normal DOM nesting\n  );\n}',
        keyPoints: [
          'Renders into a different real DOM node',
          'Stays part of the same logical React tree (events/context work)',
          'Used for modals, tooltips, dropdowns',
          'Escapes parent overflow/z-index issues',
        ],
        quiz: [
          { question: 'A portal renders children into…', options: ['A new React tree', 'A different DOM node, same React tree', 'An iframe', 'Nothing different'], correctIndex: 1 },
          {
            question: "A button inside a Portal-rendered modal still triggers a parent's onClick handler via React event bubbling, even though the modal's actual DOM node lives outside that parent in the real HTML. Why?",
            options: [
              'It does not actually work, this is a bug',
              'React bubbles events through the React component tree, not through the physical DOM tree position',
              'Portals silently disable all event handling',
              'This only works with class components',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Suspense & Concurrent Features (React 18)',
        difficulty: 'hard',
        tags: ['suspense', 'concurrent', 'react18'],
        explanation: {
          english:
            'React 18 introduced concurrent rendering, automatic batching of state updates (even inside promises/timeouts, not just event handlers), and new hooks: useTransition marks an update as non-urgent so the UI stays responsive, and useDeferredValue lets you show stale content while a new value is being computed. Suspense, originally for code-splitting, can now also suspend on data fetching (in frameworks like Next.js) to show a fallback while data loads.',
          hinglish:
            'React 18 ne concurrent rendering, state updates ki automatic batching (sirf event handlers nahi, promises/timeouts ke andar bhi), aur naye hooks introduce kiye: useTransition ek update ko non-urgent mark karta hai taaki UI responsive rahe, aur useDeferredValue purani value dikhate hue nayi value background mein compute hone deta hai. Suspense, jo originally code-splitting ke liye tha, ab data fetching pe bhi suspend kar sakta hai (Next.js jaise frameworks mein) data load hone tak fallback dikhane ke liye.',
        },
        dailyLifeExample:
          'useDeferredValue ek search box jaisa hai jo purane results dikhata rehta hai jab tak naye taiyaar na ho jaayein — screen khaali nahi hoti, smoothly badalti hai.',
        codeExample:
          'function ProductSearch({ query }) {\n  const deferredQuery = useDeferredValue(query);\n  // expensive list uses the deferred (slightly stale) value,\n  // so typing stays smooth while results catch up\n  return <ExpensiveList query={deferredQuery} />;\n}',
        keyPoints: [
          'React 18: automatic batching everywhere (not just event handlers)',
          'useTransition: mark an update as non-urgent/interruptible',
          'useDeferredValue: show stale content while new value computes',
          'Suspense can now also wait on data fetching',
        ],
        quiz: [
          { question: 'useDeferredValue is used to…', options: ['Block rendering', 'Show stale content while a new value computes', 'Delete state', 'Fetch data directly'], correctIndex: 1 },
          {
            question: 'In React 18, if you call two setState calls inside a setTimeout callback, how many re-renders happen?',
            options: ['Two separate re-renders, one per call', 'Just one — React 18 automatically batches updates even outside event handlers', 'Zero, they get silently ignored', 'It depends entirely on the browser'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Testing & Production',
    level: 'advanced',
    description: 'React Testing Library aur production-readiness checklist.',
    concepts: [
      {
        title: 'React Testing Library Philosophy',
        difficulty: 'medium',
        tags: ['testing'],
        explanation: {
          english:
            'React Testing Library encourages testing components the way a user experiences them, not their internal implementation. Prefer queries like getByRole, getByLabelText, and getByText over querying by class name or component internals — this means refactors that do not change behaviour do not break your tests. fireEvent (or userEvent) simulates real interactions, and waitFor/findBy handle async UI updates.',
          hinglish:
            'React Testing Library components ko us tarah test karne ko encourage karta hai jaise ek user experience karta hai, unke internal implementation se nahi. getByRole, getByLabelText, aur getByText jaise queries class name ya component internals query karne se behtar hain — matlab behaviour na badalne wale refactors tumhare tests nahi todte. fireEvent (ya userEvent) real interactions simulate karta hai, aur waitFor/findBy async UI updates handle karte hain.',
        },
        dailyLifeExample:
          'Testing Library ek mystery shopper jaisa hai — wo dukaan ke andar ka wiring nahi check karta, sirf wo karta hai jo ek real customer karega: dekhna, click karna, type karna.',
        codeExample:
          'import { render, screen, fireEvent } from "@testing-library/react";\n\ntest("increments the counter", () => {\n  render(<Counter />);\n  const button = screen.getByRole("button", { name: /count: 0/i });\n  fireEvent.click(button);\n  expect(screen.getByRole("button", { name: /count: 1/i })).toBeInTheDocument();\n});',
        keyPoints: [
          'Test behaviour, not implementation details',
          'Prefer getByRole/getByLabelText over class/id queries',
          'fireEvent/userEvent simulate real interactions',
          'waitFor/findBy for async UI updates',
        ],
        quiz: [
          { question: 'React Testing Library encourages querying by…', options: ['Class names', 'Component internals', 'Role/label/text, like a user would', 'CSS selectors only'], correctIndex: 2 },
          {
            question: 'Why would a test need waitFor or findBy instead of a plain getBy query?',
            options: ['They are just faster syntax with no real difference', 'The element appears asynchronously (e.g. after a fetch resolves), so the test must wait for it to show up', 'getBy queries are deprecated', 'They are required in every single test'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Production Readiness Checklist',
        difficulty: 'medium',
        tags: ['production', 'best-practices'],
        explanation: {
          english:
            'Before shipping: every list item has a stable key; props are typed (PropTypes or, better, TypeScript) so mismatches are caught early; interactive elements have correct ARIA roles and are keyboard-accessible; images have alt text; and you have profiled with React DevTools Profiler to confirm there is no obvious re-render storm before optimizing blindly.',
          hinglish:
            'Ship karne se pehle: har list item ki stable key ho; props typed hon (PropTypes ya, behtar, TypeScript) taaki mismatches jaldi pakde jaayein; interactive elements ke sahi ARIA roles hon aur keyboard-accessible hon; images mein alt text ho; aur blindly optimize karne se pehle React DevTools Profiler se confirm karo ki koi obvious re-render storm nahi hai.',
        },
        dailyLifeExample:
          'Ye ek flight ke pehle ka pre-flight checklist jaisa hai — har chhota point (seatbelt, oxygen mask, exits) check karke hi udaan bharte hain.',
        codeExample:
          '// Accessibility: role + keyboard support\n<button onClick={openMenu} aria-expanded={isOpen} aria-haspopup="true">\n  Menu\n</button>\n\n// Always provide alt text\n<img src="/course.png" alt="React course icon" />\n\n// Use the Profiler tab in React DevTools before optimizing\n// to confirm WHERE re-renders actually happen.',
        keyPoints: [
          'Stable keys on every list',
          'Type-check props (PropTypes/TypeScript)',
          'Correct ARIA roles + keyboard accessibility',
          'Profile before optimizing — do not guess',
        ],
        quiz: [
          { question: 'Before optimizing performance, you should first…', options: ['Add React.memo everywhere', 'Profile to find the real bottleneck', 'Rewrite in class components', 'Remove all state'], correctIndex: 1 },
          {
            question: "Why does the checklist call out 'every list item has a stable key' as a production concern, not just a lint warning?",
            options: [
              'It only affects visual looks',
              'An unstable or missing key (e.g. array index that shifts) can make React mismatch state between re-rendered list items, causing subtle data bugs',
              'Keys are optional and rarely matter in practice',
              'It only slows down the very first page load',
            ],
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
        'Only call hooks at the top level of a React function — never inside loops, conditions, or nested functions — so the call order stays consistent across renders. Only call hooks from React function components or other custom hooks, not regular functions. These rules let React correctly associate state with each hook call by its position in that consistent order.',
      hinglish:
        'Hooks ko sirf React function ke top level pe call karo — kabhi loops, conditions, ya nested functions ke andar nahi — taaki call order har render mein same rahe. Hooks sirf React function components ya doosre custom hooks se call karo, normal functions se nahi. In rules se React har hook call ke saath state sahi se associate kar pata hai uski position ke through us consistent order mein.',
    },
    visual: 'hooks-order',
    codeExample: {
      code: `// RULE 1 — only at the TOP LEVEL. Never inside a condition,
// loop, or nested function.
function Bad({ isOpen }) {
  if (isOpen) {
    const [x, setX] = useState(0);   // ❌
  }
  for (const item of items) {
    useEffect(() => {}, []);         // ❌
  }
}

function Good({ isOpen }) {
  const [x, setX] = useState(0);     // ✅ always called
  if (isOpen) { /* use x here */ }
}

// RULE 2 — only from React functions: a component, or another hook.
function notAComponent() {
  const [x] = useState(0);           // ❌ plain function
}
function useMyHook() {
  const [x] = useState(0);           // ✅ a custom hook
}

// WHY: React stores hooks in an array and matches them by CALL
// ORDER, not by name. Skip one and every later hook reads the
// wrong slot — useEffect ends up holding useState's value.

// The eslint plugin catches all of this:
// eslint-plugin-react-hooks

// The escape hatch when you need conditional state is to move
// the condition INSIDE the hook, or split into two components.`,
      output: `React has detected a change in the order of Hooks`,
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
    codeExample: {
      code: `// CLASS — the old way
class Counter extends React.Component {
  state = { n: 0 };
  componentDidMount()    { console.log('mounted'); }
  componentWillUnmount() { console.log('cleanup'); }
  render() {
    return <button onClick={() => this.setState({ n: this.state.n + 1 })}>
      {this.state.n}
    </button>;
  }
}

// FUNCTION — what you write today
function Counter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    console.log('mounted');
    return () => console.log('cleanup');   // both, in one place
  }, []);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}

// Why functions won:
//   • no "this" to bind or lose
//   • related logic sits together instead of being split across
//     componentDidMount / DidUpdate / WillUnmount
//   • custom hooks let you SHARE stateful logic — classes had
//     no clean way to do that (hence HOCs and render props)
//   • less code, and better minification

// Classes still work and are not deprecated. But error
// boundaries are the one thing hooks still cannot do.`,
      output: `mounted`,
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
    codeExample: {
      code: `// PROP DRILLING — passing a value through components that
// do not use it, just to reach a deep child.
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} />;              // Layout: does not care
}
function Layout({ user })  { return <Sidebar user={user} />; }  // nor this
function Sidebar({ user }) { return <Profile user={user} />; }  // nor this
function Profile({ user }) { return <p>{user.name}</p>; }       // finally

// Fix 1 — COMPOSITION. Often the simplest and most overlooked.
function App() {
  const [user] = useState(null);
  return <Layout><Profile user={user} /></Layout>;   // pass as children
}
function Layout({ children }) { return <aside>{children}</aside>; }

// Fix 2 — CONTEXT, for values many components need.
const UserContext = createContext(null);
<UserContext.Provider value={user}>…</UserContext.Provider>
const user = useContext(UserContext);       // read at any depth

// Fix 3 — a state library (Zustand, Redux) for frequently
// changing shared state.

// Note: two or three levels of props is NOT a problem. Reaching
// for Context too early makes components harder to reuse and
// re-renders every consumer on any change.`,
      output: `Asha`,
    },
  },
  {
    question: 'What actually triggers a re-render in React?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A component re-renders when: its own state changes (useState/useReducer setter called), its parent re-renders (by default, even if its own props did not change — unless wrapped in React.memo), or a context value it consumes changes. Props changing alone do not cause a re-render unless the parent itself re-rendered or the prop reference changed.',
      hinglish:
        'Ek component re-render hota hai jab: uska apna state badle (useState/useReducer setter call ho), uska parent re-render ho (by default, chahe uske apne props na badlein — agar React.memo mein wrap na ho), ya uska consumed context value badle. Sirf props badalna re-render cause nahi karta jab tak parent khud re-render na ho ya prop reference na badle.',
    },
    visual: 'react-render',
    codeExample: {
      code: `// Exactly three things cause a component to re-render:

// 1. Its STATE changed
const [n, setN] = useState(0);
setN(1);                       // ✅ re-renders

// 2. Its PROPS changed (because the parent re-rendered)

// 3. Its CONTEXT value changed

// That's it. These do NOT trigger a render:
let count = 0;
count++;                       // ❌ a plain variable
ref.current = 5;               // ❌ a ref
someObject.field = 'x';        // ❌ mutating an object

// And the catch that surprises people — setting the SAME value
// bails out, but only for primitives compared with Object.is:
setN(0);                       // no render if n is already 0
setUser(user);                 // no render — same reference
setUser({ ...user });          // ✅ RENDERS — new object

// Which is also why mutating state does nothing:
items.push(4); setItems(items);        // ❌ same array reference
setItems([...items, 4]);               // ✅ new array

// Important: a parent re-rendering re-renders ALL children by
// default, even if their props did not change. That is usually
// fine — rendering is cheap; only the DOM commit is not.`,
      output: `render count: 1`,
    },
  },
  {
    question: 'Explain automatic batching in React 18.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Before React 18, multiple setState calls were only batched into one re-render inside React event handlers; calls inside promises, setTimeout, or native event handlers each triggered a separate re-render. React 18 extends batching to all of these by default, so several state updates anywhere in your code typically result in a single re-render — improving performance without you changing any code.',
      hinglish:
        'React 18 se pehle, multiple setState calls sirf React event handlers ke andar ek hi re-render mein batch hote the; promises, setTimeout, ya native event handlers ke andar calls alag-alag re-render trigger karte the. React 18 by default batching ko in sab tak extend karta hai, isliye code mein kahin bhi kai state updates aam taur pe ek hi re-render mein hote hain — performance improve hota hai bina koi code badle.',
    },
    visual: 'state-batching',
    codeExample: {
      code: `function handleClick() {
  setCount(c => c + 1);
  setFlag(true);
  setName('Asha');
  // How many re-renders? ONE. All three are batched.
}

// React 17 batched only inside React EVENT HANDLERS.
// Anywhere else, each setState rendered separately:
setTimeout(() => {
  setCount(1);     // render
  setFlag(true);   // render again — 2 renders in React 17
}, 0);

// React 18 batches EVERYWHERE — timeouts, promises, native
// event listeners, intervals. The example above is 1 render.

fetch('/api').then(() => {
  setLoading(false);
  setData(d);        // one render in 18, two in 17
});

// The consequence people trip over: state does not update
// synchronously, so this logs the OLD value:
setCount(count + 1);
console.log(count);            // still the previous value

// And this only increments ONCE, because count is stale:
setCount(count + 1);
setCount(count + 1);           // ❌ both compute the same result

setCount(c => c + 1);
setCount(c => c + 1);          // ✅ updater form — increments twice

// Opt out for the rare case you need a DOM measurement between:
import { flushSync } from 'react-dom';
flushSync(() => setCount(1));`,
      output: `renders: 1`,
    },
  },
  {
    question: 'What is Strict Mode and why use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '<StrictMode> is a development-only wrapper that helps find bugs by intentionally double-invoking some functions (component render, useState initializers, effect setup+cleanup) so impure side effects become visible early. It does not render any visible UI and has no effect in production builds.',
      hinglish:
        '<StrictMode> ek development-only wrapper hai jo kuch functions ko jaan-bujhke do baar invoke karke bugs dhoondhne mein madad karta hai (component render, useState initializers, effect setup+cleanup) taaki impure side effects jaldi nazar aa jaayein. Ye koi visible UI render nahi karta aur production builds mein iska koi effect nahi hota.',
    },
    codeExample: {
      code: `// Development-only checks. It renders NOTHING and does not
// affect production at all.
<React.StrictMode>
  <App />
</React.StrictMode>

// In development it deliberately DOUBLE-INVOKES:
//   • component function bodies
//   • useState / useMemo / useReducer initialisers
//   • effects: mount → unmount → mount again

function Bad() {
  const [items, setItems] = useState([]);
  items.push('x');            // ❌ mutation during render —
  return …;                   //    Strict Mode makes it visible
}

// The effect double-run is the one that catches bugs. This
// looks fine but leaks in real navigation:
useEffect(() => {
  const id = setInterval(tick, 1000);
  // ❌ no cleanup — Strict Mode shows two intervals running
  return () => clearInterval(id);   // ✅ the fix it forces you to write
}, []);

// So a "bug" that only appears in Strict Mode is almost always
// a real bug — a missing cleanup or a side effect during render.

// Do not disable it to make the double-run go away. Fix the
// cleanup. It is also how React prepares you for features that
// mount and unmount components freely.`,
      output: `(effect runs twice in dev, once in production)`,
    },
  },
  {
    question: 'How does the reconciliation diffing algorithm achieve O(n) instead of O(n^3)?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A generic tree-diff algorithm is O(n^3). React uses two heuristics to get to O(n): it only compares elements of the same type at the same position (different types -> tear down and rebuild that subtree), and it uses the key prop to match list items across renders instead of comparing every pair. These assumptions hold for almost all UI trees in practice.',
      hinglish:
        'Generic tree-diff algorithm O(n^3) hota hai. React O(n) tak pahunchne ke liye do heuristics use karta hai: ye sirf same type ke elements ko same position pe compare karta hai (alag types -> us subtree ko tod ke dobara banao), aur list items ko renders ke beech match karne ke liye key prop use karta hai har pair compare karne ke bajaye. Ye assumptions practically almost saare UI trees ke liye sahi hoti hain.',
    },
    visual: 'list-keys',
    codeExample: {
      code: `// Comparing two arbitrary trees properly is O(n³). React gets
// O(n) by making two assumptions and accepting the trade-off.

// ASSUMPTION 1 — a different element TYPE means a different tree.
// React does not try to match across types; it destroys and rebuilds.
<div><Counter /></div>
<span><Counter /></span>
// → the whole subtree is thrown away, Counter loses its state

// ASSUMPTION 2 — a stable KEY tells React an element is "the same"
// across renders, even if it moved.
{items.map(i => <Row key={i.id} />)}
// Without keys React compares by position, so inserting at the
// top makes it think EVERY row changed.

// Same type → React keeps the DOM node and only patches the
// attributes that differ:
<div className="a" title="x" />
<div className="b" title="x" />
// → one operation: className = 'b'

// The trade-off is honest: the result is not always the minimal
// set of operations, but it is close enough and it is linear.

// The practical takeaways:
//   • give lists stable keys
//   • do not define a component INSIDE another component —
//     its type is new every render, so state is lost each time
function Parent() {
  function Child() {}          // ❌ new type every render
  return <Child />;
}`,
      output: `1 DOM operation instead of rebuilding the subtree`,
    },
  },
  {
    question: 'How does React handle async state updates inside event handlers vs setTimeout?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'In React 17 and earlier, setState calls inside a React event handler were batched into one render, but calls inside a setTimeout or promise callback each caused their own render. In React 18, automatic batching applies everywhere by default, so the behaviour is consistent regardless of where the update originates — you can opt out of batching with flushSync if you specifically need a synchronous update.',
      hinglish:
        'React 17 aur usse pehle, React event handler ke andar setState calls ek render mein batch hoti thi, par setTimeout ya promise callback ke andar calls apna alag render karti thi. React 18 mein, automatic batching by default har jagah lagti hai, isliye update kahin se bhi aaye behaviour consistent rehta hai — agar specifically synchronous update chahiye to flushSync se batching se opt out kar sakte ho.',
    },
    visual: 'state-batching',
    codeExample: {
      code: `// In React 18 both are batched. In React 17 only the first was.

function handleClick() {
  setA(1);
  setB(2);          // React 17: 1 render │ React 18: 1 render
}

setTimeout(() => {
  setA(1);
  setB(2);          // React 17: 2 renders │ React 18: 1 render
}, 0);

// But the STALE CLOSURE problem is the same in both, and it is
// the one that actually causes bugs:
function Counter() {
  const [count, setCount] = useState(0);

  const broken = () => {
    setTimeout(() => {
      setCount(count + 1);     // ❌ count is frozen at the value
    }, 1000);                  //    when this closure was created
  };

  const fixed = () => {
    setTimeout(() => {
      setCount(c => c + 1);    // ✅ updater gets the LATEST value
    }, 1000);
  };
}

// Click "broken" three times fast → count ends at 1, not 3.
// Click "fixed" three times fast → count ends at 3.

// Rule: whenever the new state depends on the old, use the
// updater function form.`,
      output: `broken → 1
fixed → 3`,
    },
  },
  {
    question: 'What is React?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'React is an open-source JavaScript library built by Facebook for building fast, interactive user interfaces. It uses a component-based architecture where UIs are split into reusable pieces, and a Virtual DOM to minimise real DOM updates, making re-renders efficient. React is declarative — you describe what the UI should look like for a given state, and React takes care of updating the DOM.',
      hinglish:
        'React ek open-source JavaScript library hai jo Facebook ne banai hai fast, interactive UIs banane ke liye. Ye component-based architecture use karta hai jahan UIs reusable pieces mein divide hoti hai, aur Virtual DOM se real DOM updates minimize karta hai jisse re-renders efficient hote hain. React declarative hai — tum describe karo UI kaisi dikhni chahiye given state ke liye, aur React DOM update karta hai.',
    },
    codeExample: {
      code: `// React is a LIBRARY for building user interfaces out of
// components. It is not a framework — no router, no data
// fetching, no forms in the box.

function Welcome({ name }) {
  return <h1>Hello {name}</h1>;
}
<Welcome name="Asha" />

// Its core idea is DECLARATIVE UI: you describe what the screen
// should look like for a given state, and React works out the
// DOM operations.

// Imperative (vanilla JS) — you list the steps:
document.getElementById('count').textContent = n;
if (n > 5) button.classList.add('warn');

// Declarative (React) — you describe the result:
<span className={n > 5 ? 'warn' : ''}>{n}</span>

// The three ideas that matter:
//   1. Components — reusable, composable pieces
//   2. State drives UI — change state, the view follows
//   3. A virtual tree — React diffs and patches the real DOM

// One-way data flow: props go down, events go up. That makes
// it far easier to work out why something changed.

// Note: React does not care about the DOM specifically —
// React Native uses the same library for mobile.`,
      output: `Hello Asha`,
    },
  },
  {
    question: 'What is the difference between Virtual DOM, Shadow DOM, and the real DOM?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Real DOM: the actual browser document tree — updating it is slow because it triggers reflow/repaint. Virtual DOM: a lightweight in-memory copy of the real DOM that React keeps. On state change React diffs the old and new Virtual DOM (reconciliation), computes the minimal set of changes, and batches them into the real DOM — making updates fast. Shadow DOM: a browser standard for scoping CSS and markup inside a component (used in Web Components) — unrelated to React\'s Virtual DOM.',
      hinglish:
        'Real DOM: actual browser document tree — update karna slow hai kyunki reflow/repaint trigger hota hai. Virtual DOM: React ka ek lightweight in-memory copy real DOM ka. State change pe React old aur new Virtual DOM diff karta hai (reconciliation), minimum changes nikaalta hai, aur real DOM mein batch karta hai — updates fast hote hain. Shadow DOM: ek browser standard jo CSS aur markup ko component ke andar scope karta hai (Web Components mein) — React ke Virtual DOM se alag hai.',
    },
    visual: 'react-render',
    codeExample: {
      code: `// REAL DOM — the browser's tree of actual nodes.
// Reading layout or writing to it can be slow, because it can
// force the browser to recalculate style and layout.
document.getElementById('x').textContent = 'hi';

// VIRTUAL DOM — React's plain-JavaScript description of what
// the UI SHOULD look like. Just objects, no browser involved:
{ type: 'div', props: { className: 'box' }, children: [...] }

// React keeps the previous virtual tree, builds a new one on
// render, diffs them, and applies only the differences.
// Creating objects is cheap; touching the DOM is not.

// SHADOW DOM — completely unrelated, despite the name.
// It is a BROWSER feature for encapsulation: a separate DOM
// subtree whose styles do not leak in or out.
element.attachShadow({ mode: 'open' });
// Used by Web Components and by <video> controls.

// Quick summary:
//   Real DOM    → the actual page
//   Virtual DOM → React's in-memory copy, for diffing
//   Shadow DOM  → browser style isolation, nothing to do with React

// Worth knowing: the virtual DOM is not inherently fast. It is
// a way to write declarative code while keeping DOM writes
// reasonable. Svelte and Solid get similar results without one.`,
      output: `1 DOM write instead of rebuilding everything`,
    },
  },
  {
    question: 'What are controlled and uncontrolled components?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A controlled component\'s form value is driven by React state — every change goes through onChange and setState, so React is the single source of truth. An uncontrolled component stores its own value internally in the DOM and you read it via a ref when needed. Controlled components are preferred because they give you full control over validation, formatting, and conditional disabling.',
      hinglish:
        'Controlled component ki form value React state se drive hoti hai — har change onChange aur setState se guzarta hai, isliye React single source of truth hai. Uncontrolled component apni value DOM mein internally store karta hai aur tum ref se read karte ho jab zarurat ho. Controlled components prefer kiye jaate hain kyunki validation, formatting, aur conditional disabling ka full control milta hai.',
    },
    codeExample: {
      code: `// CONTROLLED — React state is the single source of truth.
function Controlled() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
// Every keystroke → setState → re-render. You can validate,
// format, or block input as it is typed.

// UNCONTROLLED — the DOM holds the value; you read it when needed.
function Uncontrolled() {
  const ref = useRef(null);
  const submit = () => console.log(ref.current.value);
  return <input ref={ref} defaultValue="" />;
}
// No re-render per keystroke. Note defaultValue, not value.

// The classic bug — value without onChange makes it read-only:
<input value={name} />                          // ❌ cannot type
<input value={name} onChange={handleChange} />  // ✅
<input defaultValue={name} />                   // ✅ uncontrolled

// And switching between them warns:
<input value={maybeUndefined} />   // ❌ undefined → uncontrolled
<input value={maybeUndefined ?? ''} />  // ✅

// Which to use: controlled for live validation or dependent
// fields. Uncontrolled for large forms and file inputs — file
// inputs are ALWAYS uncontrolled.

// React Hook Form is popular precisely because it keeps inputs
// uncontrolled and re-renders far less.`,
      output: `Asha`,
    },
  },
  {
    question: 'What are React hooks and what problem do they solve?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Hooks are functions (starting with "use") that let function components use state, lifecycle behaviour, context, refs, and other React features — things previously only available in class components. They solve the problems of complex class hierarchies, hard-to-reuse stateful logic, and confusing "this" binding. Common hooks: useState, useEffect, useContext, useRef, useMemo, useCallback.',
      hinglish:
        'Hooks functions hain ("use" se shuru hone wale) jo function components ko state, lifecycle behaviour, context, refs aur doosri React features use karne dete hain — jo pehle sirf class components mein available thi. Ye complex class hierarchies, hard-to-reuse stateful logic, aur confusing "this" binding ki problems solve karte hain. Common hooks: useState, useEffect, useContext, useRef, useMemo, useCallback.',
    },
    codeExample: {
      code: `// Hooks let a FUNCTION component use state and lifecycle —
// things that previously required a class.
function Counter() {
  const [n, setN] = useState(0);
  useEffect(() => { document.title = \`Count \${n}\`; }, [n]);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}

// The problem they actually solved was not verbosity — it was
// SHARING STATEFUL LOGIC.

// Before hooks you needed HOCs or render props, and deep
// nesting followed:
withRouter(withTheme(connect(mapState)(MyComponent)))   // 😖

// With a custom hook it is just a function call:
function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
}
const width = useWindowWidth();     // reuse anywhere

// They also fixed the split-logic problem: in a class, one
// feature was spread across componentDidMount, DidUpdate and
// WillUnmount. One useEffect holds all three.

// The main ones: useState, useEffect, useContext, useRef,
// useMemo, useCallback, useReducer.`,
      output: `0`,
    },
  },
  {
    question: 'What is JSX? What do Babel and Webpack do in a React project?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. Browsers cannot run JSX directly. Babel is a transpiler that converts JSX (and modern JS) into plain browser-compatible JavaScript. Webpack is a bundler that takes all your modules (JS, CSS, images), resolves their dependencies, and outputs one or more optimised bundles for the browser. Create React App and Vite configure both for you automatically.',
      hinglish:
        'JSX ek syntax extension hai jo JavaScript ke andar HTML jaisi markup likhne deta hai. Browsers JSX directly run nahi kar sakte. Babel ek transpiler hai jo JSX (aur modern JS) ko plain browser-compatible JavaScript mein convert karta hai. Webpack ek bundler hai jo saare modules (JS, CSS, images) leta hai, unki dependencies resolve karta hai, aur browser ke liye optimised bundles output karta hai. Create React App aur Vite dono automatically configure karte hain.',
    },
    codeExample: {
      code: `// JSX is syntax sugar. Browsers cannot run it.
const el = <h1 className="title">Hello</h1>;

// BABEL compiles it to a plain function call:
const el = React.createElement('h1', { className: 'title' }, 'Hello');
// (modern setups emit _jsx('h1', …) instead)

// Which evaluates to an ordinary object:
{ type: 'h1', props: { className: 'title', children: 'Hello' } }

// That is why these rules exist:
//   • className, not class — class is a reserved word
//   • htmlFor, not for
//   • one root element (or a <>fragment</>) — a function
//     returns ONE value
//   • {} for expressions, and statements are not allowed:
{cond ? <A /> : <B />}        // ✅ an expression
{if (cond) …}                 // ❌ a statement

// WEBPACK (or Vite) is the BUNDLER. It walks your imports,
// runs files through loaders like Babel, and produces the
// bundles the browser downloads. It also handles CSS, images,
// code splitting and hot reload.

// Roughly: Babel translates, Webpack packages.
// Modern tooling (Vite, Next) uses esbuild or SWC — same jobs,
// much faster.

// You can skip JSX entirely; it is optional, just unpleasant.`,
      output: `{ type: 'h1', props: { className: 'title', children: 'Hello' } }`,
    },
  },
  {
    question: 'What is Redux and when should you use it?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Redux is a predictable state management library. It stores the entire app state in a single store, and state can only be changed by dispatching actions that go through pure reducer functions. Use it when multiple unrelated components share complex state, when you need time-travel debugging, or when prop drilling and Context become unwieldy. For most medium-sized apps, Context + useReducer or Zustand is sufficient.',
      hinglish:
        'Redux ek predictable state management library hai. Ye poori app state ek single store mein rakhta hai, aur state sirf actions dispatch karke badal sakti hai jo pure reducer functions se guzarte hain. Ise use karo jab multiple unrelated components complex state share karein, time-travel debugging chahiye, ya prop drilling aur Context unwieldy ho jaaye. Zyaadatar medium-sized apps ke liye Context + useReducer ya Zustand kaafi hai.',
    },
    codeExample: {
      code: `// Redux keeps app state in ONE store, changed only by
// dispatching actions through pure reducers.

import { configureStore, createSlice } from '@reduxjs/toolkit';

const counter = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },   // Immer makes
  },                                               // this safe
});

const store = configureStore({ reducer: { counter: counter.reducer } });
store.dispatch(counter.actions.increment());

// In a component:
const value = useSelector(s => s.counter.value);
const dispatch = useDispatch();

// When Redux earns its cost:
//   • many components share complex, interdependent state
//   • you need the action log and time-travel DevTools
//   • a large team benefits from enforced conventions

// When it does not:
//   • server data → React Query or RTK Query
//   • simple shared state → Zustand or Context
//   • form state → React Hook Form or local state

// Redux's territory has genuinely shrunk. Most apps that
// reached for it in 2019 would use React Query plus Zustand
// today. Choose it deliberately, not by default.`,
      output: `1`,
    },
  },
  {
    question: 'What are reducer, action, and store in Redux?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Action: a plain JS object with a type field (and optional payload) that describes what happened — e.g. { type: "INCREMENT", payload: 1 }. Reducer: a pure function (previousState, action) => newState that returns a new state object based on the action — never mutates the old state. Store: the single container created by createStore(reducer) that holds state, lets you dispatch actions, and subscribe to changes.',
      hinglish:
        'Action: ek plain JS object jisme type field (aur optional payload) hota hai jo describe karta hai kya hua — e.g. { type: "INCREMENT", payload: 1 }. Reducer: ek pure function (previousState, action) => newState jo action ke basis pe new state object return karta hai — purani state kabhi mutate nahi karta. Store: createStore(reducer) se bana single container jo state rakhta hai, actions dispatch karne deta hai, aur changes subscribe karne deta hai.',
    },
    codeExample: {
      code: `// ACTION — a plain object describing WHAT HAPPENED. Past tense.
{ type: 'cart/itemAdded', payload: { id: 42 } }

// REDUCER — a PURE function: (state, action) => newState
function cartReducer(state = { items: [] }, action) {
  switch (action.type) {
    case 'cart/itemAdded':
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;              // ← always return state
  }
}
// Pure means: no API calls, no Math.random(), no Date.now(),
// and never mutate the argument. That is what makes replay
// and time-travel debugging possible.

// STORE — holds state, and is the only way to change it
const store = configureStore({ reducer: { cart: cartReducer } });
store.getState();
store.dispatch({ type: 'cart/itemAdded', payload: { id: 42 } });
store.subscribe(() => console.log(store.getState()));

// The flow is one-way, always:
//   dispatch(action) → reducer → new state → components re-render

// Redux Toolkit generates the action types and creators for you:
const slice = createSlice({ name: 'cart', initialState, reducers: {
  itemAdded: (state, action) => { state.items.push(action.payload); },
}});
// slice.actions.itemAdded(42) → { type: 'cart/itemAdded', payload: 42 }`,
      output: `{ cart: { items: [ { id: 42 } ] } }`,
    },
  },
  {
    question: 'What is middleware in Redux? What does Redux Thunk do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Middleware sits between dispatch and the reducer, letting you intercept actions to add logging, crash reporting, or async logic. Redux Thunk is the most common middleware — it lets you dispatch functions (thunks) instead of plain objects, so you can do async work (API calls) inside action creators and dispatch real actions when the data arrives.',
      hinglish:
        'Middleware dispatch aur reducer ke beech baith ta hai, actions intercept karne deta hai logging, crash reporting, ya async logic add karne ke liye. Redux Thunk sabse common middleware hai — ye plain objects ki jagah functions (thunks) dispatch karne deta hai, isliye action creators ke andar async kaam (API calls) kar sakte ho aur data aane pe real actions dispatch kar sakte ho.',
    },
    codeExample: {
      code: `// Middleware sits between dispatch and the reducer. Each layer
// can inspect, change, delay or stop the action.
const logger = (store) => (next) => (action) => {
  console.log('dispatching', action.type);
  const result = next(action);          // pass it along
  console.log('new state', store.getState());
  return result;
};

// That curried shape is the whole API. Logging, crash reporting
// and async handling all plug in this way, without reducers
// knowing anything about them.

// THUNK is middleware that allows dispatching a FUNCTION:
const fetchUser = (id) => async (dispatch, getState) => {
  dispatch({ type: 'user/loading' });
  try {
    const user = await api.getUser(id);
    dispatch({ type: 'user/loaded', payload: user });
  } catch (e) {
    dispatch({ type: 'user/failed', error: e.message });
  }
};
dispatch(fetchUser(1));

// Why it is needed: reducers must stay PURE, so the side effect
// has to live somewhere. Thunk gives it a home with access to
// dispatch and getState.

// Redux Toolkit includes thunk by default, and createAsyncThunk
// generates the pending/fulfilled/rejected actions for you.`,
      output: `dispatching user/loading
dispatching user/loaded`,
    },
  },
  {
    question: 'What is Redux Saga and how does it differ from Redux Thunk?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Redux Saga uses ES6 generators to handle side effects as a separate "saga" process that listens for actions and coordinates async flows declaratively. Thunk: simpler, co-locates async logic inside action creators using Promises. Saga: more powerful, better for complex flows (race, retry, cancel, parallel), but has a steeper learning curve and more boilerplate. Choose Thunk for simple async; Saga when you need fine-grained control over complex async sequences.',
      hinglish:
        'Redux Saga ES6 generators use karta hai side effects ko ek alag "saga" process ke roop mein handle karne ke liye jo actions sunta hai aur async flows declaratively coordinate karta hai. Thunk: simpler, async logic action creators ke andar Promises se colocate karta hai. Saga: zyada powerful, complex flows ke liye better (race, retry, cancel, parallel), par steeper learning curve aur zyada boilerplate. Simple async ke liye Thunk chuno; Saga jab complex async sequences pe fine-grained control chahiye.',
    },
    codeExample: {
      code: `// THUNK — you write the async code directly.
const fetchUser = (id) => async (dispatch) => {
  const user = await api.getUser(id);
  dispatch({ type: 'user/loaded', payload: user });
};

// SAGA — you YIELD a description of the effect; the middleware
// performs it. The saga itself stays pure.
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchUserSaga(action) {
  try {
    const user = yield call(api.getUser, action.payload);   // describe
    yield put({ type: 'user/loaded', payload: user });      // describe
  } catch (e) {
    yield put({ type: 'user/failed', error: e.message });
  }
}
function* rootSaga() {
  yield takeLatest('user/fetch', fetchUserSaga);   // auto-cancels
}                                                  // the previous one

// What saga buys you:
//   • testing without mocks — assert the yielded objects
//   • cancellation, debouncing, racing, retries as built-ins
//   • long-running background flows

// What it costs: generators, a large API to learn, and far more
// code for a simple fetch.

// Verdict: thunks cover the vast majority of apps. Reach for
// saga only with genuinely complex orchestration — and consider
// RTK Query first, which removes most of the need entirely.`,
      output: `user/loaded`,
    },
  },
  {
    question: 'How do you implement componentWillUnmount in a function component?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Return a cleanup function from useEffect. React calls it when the component unmounts (and before re-running the effect if deps change). Example: useEffect(() => { const id = setInterval(fn, 1000); return () => clearInterval(id); }, []). The empty array means run once on mount; the return cleans up on unmount.',
      hinglish:
        'useEffect se ek cleanup function return karo. React ise component unmount hone pe call karta hai (aur deps change hone pe effect dobara run karne se pehle). Example: useEffect(() => { const id = setInterval(fn, 1000); return () => clearInterval(id); }, []). Empty array matlab mount pe ek baar run karo; return unmount pe clean up karta hai.',
    },
    visual: 'effect-lifecycle',
    codeExample: {
      code: `// Return a cleanup function from useEffect.
useEffect(() => {
  const id = setInterval(tick, 1000);

  return () => clearInterval(id);      // ← this is willUnmount
}, []);

// With an empty [] the cleanup runs ONLY on unmount, which
// matches componentWillUnmount exactly.

// With dependencies it also runs BEFORE each re-run — which
// classes had no equivalent for:
useEffect(() => {
  const sub = chat.connect(roomId);
  return () => sub.disconnect();       // runs on roomId change
}, [roomId]);                          // AND on unmount

// Things that must be cleaned up, or they leak:
useEffect(() => {
  const onResize = () => setW(innerWidth);
  window.addEventListener('resize', onResize);
  const ctrl = new AbortController();
  fetch(url, { signal: ctrl.signal });

  return () => {
    window.removeEventListener('resize', onResize);
    ctrl.abort();                      // cancel the request too
  };
}, []);

// Strict Mode deliberately mounts, unmounts and remounts in
// development. If that breaks something, your cleanup is
// incomplete — which is exactly what it is testing for.`,
      output: `(interval cleared on unmount)`,
    },
  },
  {
    question: 'Explain useEffect, useState, useMemo, and useCallback in detail.',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'useState: stores a value that persists across renders and triggers re-render on change. useEffect(fn, deps): runs fn after render when deps change — for side effects (fetch, subscriptions, timers). useMemo(fn, deps): memoises the computed result of fn, recomputing only when deps change — avoids expensive recalculations on every render. useCallback(fn, deps): returns the same function reference unless deps change — prevents child re-renders caused by new function references every render.',
      hinglish:
        'useState: ek value store karta hai jo renders ke beech persist hoti hai aur change hone pe re-render trigger karta hai. useEffect(fn, deps): deps change hone pe render ke baad fn run karta hai — side effects ke liye (fetch, subscriptions, timers). useMemo(fn, deps): fn ka computed result memoize karta hai, sirf deps change hone pe recompute karta hai — har render pe expensive recalculations avoid karta hai. useCallback(fn, deps): deps change na hone tak same function reference return karta hai — har render pe naye function references se caused child re-renders rokta hai.',
    },
    visual: 'effect-lifecycle',
    codeExample: {
      code: `// useState — a value that, when changed, re-renders.
const [n, setN] = useState(0);
setN(n + 1);          // ok
setN(c => c + 1);     // ✅ use this when the new value depends
                      //    on the old — avoids stale closures

// useEffect — synchronise with something OUTSIDE React.
useEffect(() => {
  document.title = n;              // side effect
  return () => { /* cleanup */ };
}, [n]);                           // runs when n changes
// []       → once, on mount
// no array → after EVERY render (usually a bug)

// useMemo — cache a computed VALUE between renders.
const sorted = useMemo(() => items.sort(cmp), [items]);
// Use it for genuinely expensive work, or to keep an object
// reference stable so a memoised child does not re-render.

// useCallback — cache a FUNCTION reference.
const onClick = useCallback(() => save(id), [id]);
// Pointless unless the child is memoised or it is an effect
// dependency — otherwise you are just adding overhead.

// useCallback(fn, d) is exactly useMemo(() => fn, d).

// The honest summary: useState and useEffect you need daily.
// useMemo and useCallback are OPTIMISATIONS — measure first,
// and the React Compiler is making most of them unnecessary.`,
      output: `sorted once, not on every render`,
    },
  },
  {
    question: 'What are React lifecycle methods?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Class component lifecycle: Mounting — constructor → render → componentDidMount. Updating — render → componentDidUpdate(prevProps, prevState). Unmounting — componentWillUnmount. In function components, useEffect replaces all three phases: [] for componentDidMount, [deps] for componentDidUpdate, and the cleanup return for componentWillUnmount.',
      hinglish:
        'Class component lifecycle: Mounting — constructor → render → componentDidMount. Updating — render → componentDidUpdate(prevProps, prevState). Unmounting — componentWillUnmount. Function components mein useEffect teeno phases replace karta hai: [] for componentDidMount, [deps] for componentDidUpdate, aur cleanup return for componentWillUnmount.',
    },
    visual: 'effect-lifecycle',
    codeExample: {
      code: `// CLASS lifecycle, in the order they fire:
class C extends React.Component {
  constructor(props) { super(props); this.state = {}; }
  componentDidMount()  {}      // after first render — fetch here
  componentDidUpdate(prevProps, prevState) {}   // after updates
  componentWillUnmount() {}    // before removal — clean up
  shouldComponentUpdate(nextProps) { return true; }   // skip renders
  static getDerivedStateFromError(err) {}       // error boundary
  componentDidCatch(err, info) {}               // error boundary
  render() { return null; }
}

// The HOOK equivalents:
useEffect(() => {}, []);          // componentDidMount
useEffect(() => {});              // componentDidUpdate (every render)
useEffect(() => {
  return () => {};                // componentWillUnmount
}, []);
useEffect(() => {}, [dep]);       // "did update, but only for dep"
React.memo(C);                    // shouldComponentUpdate

// The improvement hooks made: in a class, ONE feature was split
// across three methods, and three unrelated features were mixed
// inside each. One useEffect keeps a feature's setup and
// teardown together.

// Still class-only: error boundaries. There is no hook for
// getDerivedStateFromError yet.`,
      output: `mount → update → unmount`,
    },
  },
  {
    question: 'What is the difference between export default and named export in React?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Named export: export const Foo = ... — imported with the exact name in braces: import { Foo } from "./file". A file can have many named exports. Default export: export default Foo — imported without braces and with any name: import Foo from "./file" or import MyFoo from "./file". A file can have only one default export. React components typically use default exports for the main component and named exports for utilities.',
      hinglish:
        'Named export: export const Foo = ... — exact name curly braces mein import karo: import { Foo } from "./file". Ek file mein kai named exports ho sakte hain. Default export: export default Foo — bina braces ke aur kisi bhi naam se import karo: import Foo from "./file". Ek file mein sirf ek default export ho sakta hai. React components aam taur pe main component ke liye default export aur utilities ke liye named exports use karte hain.',
    },
    codeExample: {
      code: `// DEFAULT — one per file. The importer picks any name.
export default function Button() {}
import Button from './Button';
import Btn from './Button';        // also fine — same thing

// NAMED — as many as you like. The name must match.
export function Button() {}
export const SIZES = ['sm', 'lg'];
import { Button, SIZES } from './Button';
import { Button as Btn } from './Button';   // rename explicitly

// Both together:
export default Button;
export { SIZES };
import Button, { SIZES } from './Button';

// The trade-off:
//   default → convenient, but a typo in the import name is
//             silent, and rename-across-project tooling cannot
//             follow it reliably
//   named   → autocomplete works, refactors are safe, and
//             tree-shaking is more predictable

// Many teams standardise on named exports for exactly that
// reason. React itself uses both:
import React, { useState } from 'react';

// One place default is required: React.lazy expects it.
const Page = lazy(() => import('./Page'));   // needs export default`,
      output: `(both import styles resolve to the same component)`,
    },
  },
  {
    question: 'What is a React Portal?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A portal lets you render a child component into a different DOM node than the parent\'s DOM tree — typically used for modals, tooltips, and dropdowns that need to escape overflow: hidden or z-index stacking constraints of their container. Created with ReactDOM.createPortal(child, domNode). Events still bubble normally through the React tree even though the DOM node is elsewhere.',
      hinglish:
        'Portal ek child component ko parent ke DOM tree se alag DOM node mein render karne deta hai — typically modals, tooltips, aur dropdowns ke liye use hota hai jinhe container ke overflow: hidden ya z-index stacking constraints se escape karna hota hai. ReactDOM.createPortal(child, domNode) se banate hain. Events React tree mein normally bubble hote hain chahe DOM node alag jagah ho.',
    },
    codeExample: {
      code: `// A portal renders a child into a DIFFERENT part of the DOM,
// while keeping it in the React tree where you wrote it.
import { createPortal } from 'react-dom';

function Modal({ children, onClose }) {
  return createPortal(
    <div className="overlay" onClick={onClose}>{children}</div>,
    document.body                      // ← rendered here
  );
}

// Why: a modal inside a card is trapped by the parent's
// overflow: hidden, z-index stacking context, or transform.
// Portalling to body escapes all of that.

// The part people find surprising — EVENTS STILL BUBBLE through
// the REACT tree, not the DOM tree:
<div onClick={() => console.log('parent heard it')}>
  <Modal>          {/* rendered into body */}
    <button>Click</button>   {/* the parent's onClick STILL fires */}
  </Modal>
</div>

// That is usually what you want: context, state and handlers
// all keep working as if it were nested normally.

// Common uses: modals, tooltips, dropdowns, toasts.

// Note the native <dialog> element now handles most modal cases
// without a portal — it renders in the browser's top layer and
// gives you focus trapping and Escape for free.`,
      output: `parent heard it`,
    },
  },
  {
    question: 'What is useRef and when should you use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'useRef returns a mutable ref object { current: value } that persists across renders without causing re-renders when changed. Use cases: (1) accessing DOM elements directly (ref.current.focus()); (2) storing mutable values like timer IDs, previous state, or flags that should not trigger re-renders; (3) forwarding refs to child components. Unlike state, mutating ref.current never schedules a re-render.',
      hinglish:
        'useRef ek mutable ref object { current: value } return karta hai jo renders ke beech persist karta hai aur change hone pe re-renders cause nahi karta. Use cases: (1) DOM elements directly access karna (ref.current.focus()); (2) mutable values store karna jaise timer IDs, previous state, ya flags jo re-renders trigger nahi karne chahiye; (3) child components ko refs forward karna. State ke ulat, ref.current mutate karna kabhi re-render schedule nahi karta.',
    },
    codeExample: {
      code: `// useRef gives you a box whose .current survives re-renders
// and does NOT trigger one when you change it.

// Use 1 — reach a DOM node
function Input() {
  const ref = useRef(null);
  useEffect(() => ref.current.focus(), []);
  return <input ref={ref} />;
}

// Use 2 — remember a value between renders without rendering
function Timer() {
  const id = useRef(null);
  const start = () => { id.current = setInterval(tick, 1000); };
  const stop  = () => clearInterval(id.current);
}
// State would work but would cause a pointless re-render.

// Use 3 — the previous value of a prop
const prev = useRef();
useEffect(() => { prev.current = value; }, [value]);

// The key difference:
//   state → changing it RE-RENDERS, and the value is used in JSX
//   ref   → changing it does NOT render, and it is not for display

// So this button never updates on screen:
const count = useRef(0);
<button onClick={() => count.current++}>{count.current}</button>;  // ❌

// And never read or write ref.current DURING render — that is a
// side effect. Do it in an effect or an event handler.`,
      output: `(input focused on mount)`,
    },
  },
  {
    question: 'What is server-side rendering (SSR) in React?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'SSR renders React components to HTML on the server and sends the full HTML to the browser. The browser shows content immediately (good for SEO and perceived performance), then React hydrates the HTML by attaching event listeners. Contrast with CSR (client-side rendering) where the browser receives an empty HTML shell and React builds the UI in the browser. Next.js is the main framework for SSR with React.',
      hinglish:
        'SSR React components ko server pe HTML mein render karta hai aur poora HTML browser ko bhejta hai. Browser turant content dikhata hai (SEO aur perceived performance ke liye accha), phir React HTML ko hydrate karta hai event listeners attach karke. CSR (client-side rendering) se contrast karo jahan browser empty HTML shell receive karta hai aur React browser mein UI banata hai. Next.js React ke saath SSR ke liye main framework hai.',
    },
    codeExample: {
      code: `// SSR renders your components to HTML on the SERVER, so the
// browser receives real content instead of an empty <div>.

// Client-only (CRA/Vite):
<div id="root"></div>            // ← what a crawler sees
// The user waits for JS to download, parse and run.

// SSR:
<div id="root"><h1>Hello Asha</h1>…</div>   // ← content immediately

// Then HYDRATION: React attaches event handlers to that HTML
// to make it interactive.
import { hydrateRoot } from 'react-dom/client';
hydrateRoot(document.getElementById('root'), <App />);

// What you gain:
//   • SEO — crawlers see content without running JS
//   • faster First Contentful Paint
//   • good social previews

// What it costs:
//   • a Node server to run (not just static files)
//   • no window or document during the server render
//   • hydration mismatches if server and client output differ

// In practice you use a framework rather than wiring it yourself:
// Next.js, Remix. And Next's App Router goes further with
// Server Components, which never ship JS at all.

// Related: SSG renders at BUILD time, ISR re-renders on a
// schedule. SSR is per request.`,
      output: `<div id="root"><h1>Hello Asha</h1></div>`,
    },
  },
  {
    question: 'What is React Fragment?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A Fragment (<React.Fragment> or the shorthand <>) lets you return multiple elements from a component without adding an extra DOM node. This avoids unnecessary wrapper divs that could break styling (e.g. flex/grid layouts). The shorthand <></> cannot accept a key prop; use <React.Fragment key={id}> when rendering lists.',
      hinglish:
        'Fragment (<React.Fragment> ya shorthand <>) ek component se multiple elements return karne deta hai bina extra DOM node add kiye. Isse unnecessary wrapper divs avoid hote hain jo styling tod sakte hain (jaise flex/grid layouts). Shorthand <></> key prop accept nahi kar sakta; lists render karte waqt <React.Fragment key={id}> use karo.',
    },
    codeExample: {
      code: `// A component must return ONE element. A Fragment groups
// children without adding a wrapper node to the DOM.

// ❌ two roots — a syntax error
function Bad() {
  return <td>A</td><td>B</td>;
}

// ✅ but this adds a <div> that breaks the table
function AlsoBad() {
  return <div><td>A</td><td>B</td></div>;
}

// ✅ Fragment — nothing is added to the DOM
function Good() {
  return <><td>A</td><td>B</td></>;
}

// The long form, needed when you want a key:
import { Fragment } from 'react';
{items.map(i => (
  <Fragment key={i.id}>
    <dt>{i.term}</dt>
    <dd>{i.def}</dd>
  </Fragment>
))}
// The shorthand <> cannot take a key.

// Where it genuinely matters:
//   • <table>, <tr> — an extra div is invalid HTML
//   • flex and grid — a wrapper becomes an unwanted flex item
//   • keeping the DOM shallow

// It renders nothing at all: no node, no styling, no cost.`,
      output: `<td>A</td><td>B</td>`,
    },
  },
  {
    question: 'What is React Router and how does it work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'React Router is a client-side routing library that maps URL paths to components. It uses the browser\'s History API (or hash) so navigating between routes updates the URL without a full page reload. Key components: <BrowserRouter> wraps the app, <Routes>/<Route path="/..." element={<Page />}> defines routes, <Link to="/..."> navigates, and hooks like useParams, useNavigate, useLocation access routing info.',
      hinglish:
        'React Router ek client-side routing library hai jo URL paths ko components se map karti hai. Ye browser ke History API (ya hash) use karta hai isliye routes ke beech navigate karna URL update karta hai bina full page reload ke. Key components: <BrowserRouter> app wrap karta hai, <Routes>/<Route path="/..." element={<Page />}> routes define karta hai, <Link to="/..."> navigate karta hai, aur useParams, useNavigate, useLocation jaise hooks routing info access karte hain.',
    },
    codeExample: {
      code: `import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

<BrowserRouter>
  <Link to="/users/42">Profile</Link>       {/* no page reload */}
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:id" element={<User />} />
    <Route path="*" element={<NotFound />} />   {/* 404 */}
  </Routes>
</BrowserRouter>

function User() {
  const { id } = useParams();               // '42'
}

// How it works: it uses the History API to change the URL
// WITHOUT a request to the server, then renders whichever
// Route matches. There is no navigation, so React state and
// the loaded JS all survive.
history.pushState({}, '', '/users/42');

// That is why <Link> matters — a plain <a> does a full reload
// and throws away everything.

// Programmatic navigation:
const navigate = useNavigate();
navigate('/login', { replace: true });

// The deployment gotcha: refreshing /users/42 sends a REAL
// request for that path, and the server has no such file → 404.
// Your host must rewrite all paths to index.html. Netlify,
// Vercel and most SPA hosts have a setting for this.`,
      output: `42`,
    },
  },
  {
    question: 'What is a Higher-Order Component (HOC) in React?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A Higher-Order Component is a function that takes a component and returns a new enhanced component — it is a pattern for reusing component logic. Example: withAuth(Component) returns a component that checks authentication before rendering the wrapped one. HOCs are a pattern from before hooks; most HOC use cases are now better handled with custom hooks.',
      hinglish:
        'Higher-Order Component ek function hai jo ek component leta hai aur ek naya enhanced component return karta hai — ye component logic reuse karne ka pattern hai. Example: withAuth(Component) ek component return karta hai jo wrapped component render karne se pehle authentication check karta hai. HOCs hooks se pehle ka pattern hai; zyaadatar HOC use cases ab custom hooks se better handle hote hain.',
    },
    codeExample: {
      code: `// A function that takes a component and returns a new one
// with extra behaviour. It is the class-era way to share logic.

function withLoading(Component) {
  return function Wrapped({ isLoading, ...rest }) {
    if (isLoading) return <Spinner />;
    return <Component {...rest} />;
  };
}
const UserListWithLoading = withLoading(UserList);

// You have used these: connect() in Redux, withRouter, memo().

// The problems that made hooks win:
//   1. WRAPPER HELL in DevTools
withAuth(withTheme(withRouter(connect(mapState)(Page))))
//   2. prop name COLLISIONS between two HOCs
//   3. it is not obvious where a prop came from
//   4. refs do not pass through without forwardRef

// The same thing as a custom hook — flat, and explicit:
function useLoading(isLoading) { … }

function UserList({ isLoading, users }) {
  if (isLoading) return <Spinner />;
  return <ul>{users.map(…)}</ul>;
}

// Write hooks for new code. HOCs still make sense when you must
// wrap a component you do not control, or genuinely change what
// renders — memo and error boundaries are effectively HOCs.`,
      output: `<Spinner /> while loading, then the list`,
    },
  },
  {
    question: 'What is a Pure Component in React?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'React.PureComponent is a class component base that implements shouldComponentUpdate with a shallow comparison of props and state — it skips re-rendering if neither has changed. The functional equivalent is React.memo, which wraps a function component and does a shallow prop comparison. Use them for components that render the same output given the same props, to avoid unnecessary re-renders.',
      hinglish:
        'React.PureComponent ek class component base hai jo shouldComponentUpdate ko props aur state ki shallow comparison ke saath implement karta hai — agar dono nahi badle to re-rendering skip karta hai. Functional equivalent React.memo hai, jo function component wrap karta hai aur shallow prop comparison karta hai. Unhe use karo jo same props pe same output render karte hain, unnecessary re-renders avoid karne ke liye.',
    },
    codeExample: {
      code: `// A component that re-renders only when its props or state
// actually changed — compared SHALLOWLY.

// Function components:
const Row = React.memo(function Row({ item }) {
  return <li>{item.name}</li>;
});

// Class equivalent:
class Row extends React.PureComponent { … }

// The catch: shallow comparison uses Object.is, so a new object
// or function each render defeats it entirely.
function Parent() {
  return <Row item={{ name: 'a' }} />;       // ❌ new object every render
}

// Fix — keep the reference stable:
const item = useMemo(() => ({ name: 'a' }), []);
const onClick = useCallback(() => {}, []);
<Row item={item} onClick={onClick} />        // ✅ memo now works

// Do NOT wrap everything in memo. The comparison itself costs
// something, and for a cheap component it is pure overhead.
// Reach for it when: the component is expensive to render, it
// renders often, and its props rarely change — a big list row
// is the classic case.

// Note the React Compiler does this memoisation automatically,
// which will make most manual memo/useMemo/useCallback
// unnecessary.`,
      output: `Row renders only when item changes`,
    },
  },
  {
    question: 'How do you optimise a React application?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Key techniques: (1) React.memo / PureComponent — skip re-renders when props unchanged. (2) useMemo / useCallback — memoize expensive values and functions. (3) Code splitting — React.lazy + Suspense to load components on demand. (4) Virtualisation — react-window/react-virtual for long lists. (5) Avoid inline objects/functions in JSX — new references every render cause children to re-render. (6) Keep state as local as possible. (7) Use production builds (tree-shaking, minification). (8) React DevTools Profiler to identify bottlenecks.',
      hinglish:
        'Key techniques: (1) React.memo / PureComponent — props unchanged hone pe re-renders skip karo. (2) useMemo / useCallback — expensive values aur functions memoize karo. (3) Code splitting — React.lazy + Suspense se components on demand load karo. (4) Virtualisation — long lists ke liye react-window/react-virtual. (5) JSX mein inline objects/functions avoid karo — har render pe new references children ko re-render karti hain. (6) State jitni local ho sake rakho. (7) Production builds use karo (tree-shaking, minification). (8) React DevTools Profiler se bottlenecks identify karo.',
    },
    visual: 'react-render',
    codeExample: {
      code: `// MEASURE FIRST — React DevTools Profiler, not guesswork.

// 1. Ship less JavaScript. Usually the biggest win.
const Chart = lazy(() => import('./Chart'));
<Suspense fallback={<Spinner />}><Chart /></Suspense>

// 2. Stop needless re-renders — but find them first
const Row = memo(Row);
const onClick = useCallback(() => {}, []);
const value = useMemo(() => ({ a, b }), [a, b]);

// 3. Move state DOWN so fewer components sit above it
// A component that owns state re-renders everything below it.

// 4. Virtualise long lists — render 20 rows, not 10,000
import { useVirtualizer } from '@tanstack/react-virtual';

// 5. Use a data library for server state
// React Query dedupes, caches and avoids refetch storms.

// 6. Split Context by how often each value changes

// 7. Images: next/image or width+height+loading="lazy"

// The order matters. Most "slow React" is actually:
//   a huge bundle → an unvirtualised list → refetch loops
// Micro-memoisation is last, and the React Compiler is
// automating that part anyway.`,
      output: `bundle 800kb → 210kb, TTI 4.1s → 1.3s`,
    },
  },
  {
    question: 'What is the difference between React and Angular?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'React is a UI library (View layer only) — you compose it with other libraries for routing, state, etc. Angular is a full MVC framework with everything built in (DI, forms, HTTP, router). React uses JSX and a Virtual DOM; Angular uses TypeScript-first templates and two-way data binding. React is more flexible and has a larger ecosystem; Angular enforces a structured approach suited to large enterprise teams.',
      hinglish:
        'React ek UI library hai (sirf View layer) — routing, state, etc. ke liye doosri libraries ke saath compose karo. Angular ek full MVC framework hai jisme sab kuch built in hai (DI, forms, HTTP, router). React JSX aur Virtual DOM use karta hai; Angular TypeScript-first templates aur two-way data binding use karta hai. React zyada flexible hai aur bada ecosystem hai; Angular ek structured approach enforce karta hai jo badi enterprise teams ke liye suited hai.',
    },
    codeExample: {
      code: `// REACT — a LIBRARY for the view. You choose the rest.
//   routing   → React Router
//   state     → Zustand / Redux / Context
//   http      → fetch / axios / React Query
//   forms     → React Hook Form
// JavaScript + JSX, one-way data flow, hooks.

function Hello({ name }) { return <h1>Hi {name}</h1>; }

// ANGULAR — a FRAMEWORK. Everything is included and opinionated.
//   routing, HTTP, forms, DI, testing — all official
// TypeScript by default, decorators, RxJS, two-way binding.

@Component({ selector: 'hello', template: '<h1>Hi {{name}}</h1>' })
export class HelloComponent { @Input() name: string; }

// The real trade-off:
//   React  → smaller core, huge freedom, and you own the
//            architecture decisions (and their consequences)
//   Angular→ more to learn up front, but a large team gets
//            consistency for free

// Practical guidance:
//   startup, fast iteration, hiring from a big pool → React
//   large enterprise app, many teams, long lifespan → Angular

// And Vue sits between them — a progressive framework with
// official routing and state, but a gentler learning curve.`,
      output: `Hi Asha`,
    },
  },
  {
    question: 'What are super() and constructor() in a React class component?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'constructor(props) is called before the component mounts — use it to initialise this.state and bind event handlers. super(props) must be the first call inside constructor to call the React.Component parent constructor, which sets up this.props. Without super(props), this.props is undefined inside the constructor. render() is the only required method — it returns JSX that describes the UI.',
      hinglish:
        'constructor(props) component mount hone se pehle call hota hai — this.state initialise karne aur event handlers bind karne ke liye. super(props) constructor ke andar pehla call hona chahiye jo React.Component parent constructor call karta hai, jo this.props set up karta hai. super(props) ke bina this.props constructor ke andar undefined hota hai. render() ek zaruri method hai — ye JSX return karta hai jo UI describe karta hai.',
    },
    codeExample: {
      code: `class Counter extends React.Component {
  constructor(props) {
    super(props);            // ← MUST come first
    this.state = { n: 0 };   // now \`this\` exists
    this.handle = this.handle.bind(this);
  }
}

// Why super() is required: in JavaScript, a subclass has no
// \`this\` until the parent constructor has run. Touching it
// first throws:
constructor(props) {
  this.state = {};           // ❌ ReferenceError
  super(props);
}

// Why pass props: without it, this.props is undefined INSIDE
// the constructor (React assigns it afterwards either way):
constructor(props) {
  super();
  console.log(this.props);   // undefined
}
constructor(props) {
  super(props);
  console.log(this.props);   // ✅ available
}

// The bind is needed because a class method loses \`this\` when
// passed as a callback. Class fields avoid both:
class Counter extends React.Component {
  state = { n: 0 };                       // no constructor needed
  handle = () => this.setState(…);        // arrow → this is bound
}

// None of this exists in function components — one of the
// quieter reasons hooks won.`,
      output: `0`,
    },
  },
  {
    question: 'What is Context API in React?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Context API lets you share values (theme, auth, language) across the component tree without passing props at every level. Create context with createContext(defaultValue), wrap the tree with <Context.Provider value={...}>, and consume it with useContext(Context) or <Context.Consumer>. It is ideal for low-frequency global state; for high-frequency updates it can cause unnecessary re-renders across all consumers.',
      hinglish:
        'Context API values (theme, auth, language) ko component tree mein share karne deta hai bina har level pe props pass kiye. createContext(defaultValue) se context banao, tree ko <Context.Provider value={...}> se wrap karo, aur useContext(Context) ya <Context.Consumer> se consume karo. Ye low-frequency global state ke liye ideal hai; high-frequency updates ke liye ye saare consumers mein unnecessary re-renders cause kar sakta hai.',
    },
    codeExample: {
      code: `// Context passes a value to any depth without props.

// 1. create
const ThemeContext = createContext('light');

// 2. provide
function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}

// 3. consume, at any depth
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}

// The performance trap: EVERY consumer re-renders whenever the
// value changes — and an inline object is a new value each render.
<ThemeContext.Provider value={{ theme, setTheme }}>   // ❌ new object

const value = useMemo(() => ({ theme, setTheme }), [theme]);
<ThemeContext.Provider value={value}>                 // ✅

// Also: split contexts that change at different rates. Putting
// a fast-changing value next to a static one makes everything
// re-render on every tick.

// Context is DEPENDENCY INJECTION, not a state manager — there
// is no selector, so you cannot subscribe to part of it. Use it
// for theme, locale, and the current user. For frequently
// updating shared state, use Zustand or Redux.`,
      output: `dark`,
    },
  },

  // ─── Modern React ───────────────────────────────────────────
  {
    question: 'What is the difference between Server Components and Client Components?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Server Components render on the server and ship NO JavaScript to the browser, so they can read a database or use a secret directly and cost nothing in bundle size. Client Components, marked with `"use client"`, ship JavaScript and are required for anything interactive — state, effects, event handlers, browser APIs. Place the boundary as DEEP in the tree as possible, since the directive is inherited and everything a Client Component imports becomes client too.',
      hinglish:
        'Server Components server pe render hote hain aur browser ko KOI JavaScript nahi bhejte, isliye wo seedha ek database padh sakte hain ya ek secret use kar sakte hain aur bundle size mein kuch cost nahi karte. Client Components, `"use client"` se mark kiye, JavaScript bhejte hain aur har interactive cheez ke liye zaroori hain — state, effects, event handlers, browser APIs. Seema ko ped mein jitna GEHRA ho sake rakho, kyunki ye nirdesh viraasat mein milta hai aur ek Client Component jo bhi import kare wo bhi client ban jaata hai.',
    },
    codeExample: {
      code: `// SERVER COMPONENT (the default in the Next.js App Router)
async function Page() {
  const users = await db.users.findMany();   // straight to the DB
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
// • runs on the server only
// • ships ZERO JavaScript to the browser
// • can use secrets and query the database directly
// • CANNOT use state, effects, or event handlers

// CLIENT COMPONENT
'use client';
function Counter() {
  const [n, setN] = useState(0);             // state needs the client
  return <button onClick={() => setN(n+1)}>{n}</button>;
}
// • ships JavaScript
// • needed for interactivity, browser APIs, hooks

// The rule people get wrong: 'use client' is INHERITED.
// Everything a client component imports becomes client too.
// So put the boundary as DEEP as possible — on the small
// interactive leaf, not the page.

// A good pattern: fetch on the server, pass data down as props
// or children into a small client wrapper.
export default async function Page() {
  const data = await getData();              // server
  return <Chart data={data} />;              // 'use client' only here
}`,
      output: `zero JS for the list, ~2kb for the counter`,
    },
  },
  {
    question: 'What problem does useTransition solve?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'It marks a state update as NON-URGENT so React can interrupt it to keep the interface responsive. The classic case is a search input filtering a large list: without it, typing feels frozen because each keystroke triggers an expensive re-render that blocks input. Wrapping the filter update in `startTransition` lets the input update immediately while the list catches up, and `isPending` gives you a loading indicator for the deferred work.',
      hinglish:
        'Ye ek state update ko GAIR-ZAROORI mark karta hai taaki React use rok kar interface ko jawab dene layak rakh sake. Classic case ek badi list chhaanta search input hai: iske bina, type karna jama hua lagta hai kyunki har keystroke ek mehnga re-render chalata hai jo input rok deta hai. Filter update ko `startTransition` mein lapetna input ko turant update karne deta hai jabki list peeche se aati hai, aur `isPending` tumhe us taale gaye kaam ke liye ek loading nishaan deta hai.',
    },
    codeExample: {
      code: `// Marks an update as NON-URGENT so React can interrupt it and
// keep the interface responsive.

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    setQuery(e.target.value);           // URGENT — the input must
                                        // update on every keystroke
    startTransition(() => {
      setResults(filterHugeList(e.target.value));   // can wait
    });
  }

  return (
    <>
      <input value={query} onChange={onChange} />
      {isPending && <Spinner />}
      <List items={results} />
    </>
  );
}

// Without it, filtering 10,000 rows on every keystroke blocks
// the main thread and typing feels frozen — characters appear
// half a second late.

// With it, the input stays instant and the list catches up.
// React will even ABANDON an in-progress render if you type
// again before it finishes.

// It does not make the work faster — it changes its PRIORITY.
// isPending gives you a loading indicator for the deferred part.`,
      output: `typing stays smooth at 10,000 rows`,
    },
  },
  {
    question: 'What is the difference between useTransition and useDeferredValue?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Both keep the interface responsive but from different ends. `useTransition` wraps the UPDATE, so you use it when you control the state setter. `useDeferredValue` wraps the VALUE, so you use it when the value arrives as a prop and you cannot reach the setter — it returns a lagging copy that updates at lower priority. In practice: transition when you own the update, deferred value when you only receive the result.',
      hinglish:
        'Dono interface ko jawab dene layak rakhte hain par alag siron se. `useTransition` UPDATE ko lapetta hai, isliye ise tab use karo jab state setter tumhare paas ho. `useDeferredValue` VALUE ko lapetta hai, isliye ise tab use karo jab value ek prop ki tarah aaye aur tum setter tak na pahunch sako — ye ek peeche chalti copy lautaata hai jo kam priority pe update hoti hai. Practically: jab update tumhara ho tab transition, jab tum sirf nateeja paate ho tab deferred value.',
    },
    codeExample: {
      code: `// Both keep the UI responsive. The difference is what you
// have access to.

// useTransition — you wrap the UPDATE. Use it when you own
// the setState call.
const [isPending, startTransition] = useTransition();
startTransition(() => setResults(filter(q)));

// useDeferredValue — you wrap the VALUE. Use it when the value
// arrives as a PROP and you cannot reach the setter.
function List({ query }) {
  const deferredQuery = useDeferredValue(query);
  const items = useMemo(() => filter(deferredQuery), [deferredQuery]);
  const isStale = query !== deferredQuery;     // show it dimmed
  return <ul style={{ opacity: isStale ? 0.5 : 1 }}>…</ul>;
}

// deferredQuery lags behind query: React renders once with the
// old value immediately, then again with the new one at lower
// priority.

// Choosing:
//   I control the setState        → useTransition
//   I only receive the value      → useDeferredValue

// Both need the expensive child to be memoised, or you gain
// nothing — the deferred render still does the same work.`,
      output: `input instant, list updates a beat later`,
    },
  },
  {
    question: 'What does the use hook do?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`use` reads a Promise or a Context and, unlike every other hook, can be called CONDITIONALLY and inside loops. When given a Promise it suspends the component until it resolves, which is how a Client Component consumes a promise passed down from a Server Component without an effect. The promise must be created outside render or cached, since creating a new one each render would suspend forever.',
      hinglish:
        '`use` ek Promise ya ek Context padhta hai aur, har doosre hook ke ulat, SHART ke saath aur loops ke andar bulaaya ja sakta hai. Ek Promise dene pe ye component ko us ke sulajhne tak rok deta hai, jisse ek Client Component ek Server Component se aaye promise ko bina effect ke use karta hai. Promise ko render ke bahar banana ya cache karna chahiye, kyunki har render pe ek naya banana hamesha ke liye rok dega.',
    },
    codeExample: {
      code: `// use() reads a Promise or a Context — and unlike every other
// hook, it CAN be called conditionally and inside loops.

import { use, Suspense } from 'react';

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);   // suspends until it resolves
  return <ul>{comments.map(c => <li key={c.id}>{c.text}</li>)}</ul>;
}

// The parent provides a Suspense boundary:
<Suspense fallback={<Spinner />}>
  <Comments commentsPromise={fetchComments()} />
</Suspense>

// The pattern it enables: a Server Component starts the fetch
// WITHOUT awaiting, and a Client Component consumes it.
async function Page() {
  const promise = fetchComments();          // no await — no blocking
  return (
    <Suspense fallback={<Spinner />}>
      <Comments commentsPromise={promise} />
    </Suspense>
  );
}

// It also reads context, which useContext cannot do conditionally:
if (isDark) { const theme = use(ThemeContext); }   // ✅ allowed

// The rule: the promise must be created OUTSIDE render or
// cached. Creating a new one each render suspends forever.`,
      output: `(spinner, then the comments)`,
    },
  },
  {
    question: 'What is the React Compiler and what does it change?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The React Compiler automatically memoises components and values at build time, so most manual `useMemo`, `useCallback`, and `React.memo` become unnecessary. That removes a large source of noise and of bugs from an incorrect dependency array. It relies on your code following the Rules of React — no mutation during render, no side effects in the render body — so the linter matters more, and code that breaks those rules simply will not be optimised.',
      hinglish:
        'React Compiler build ke waqt apne aap components aur values ko memoise karta hai, isliye zyadatar manual `useMemo`, `useCallback`, aur `React.memo` gair-zaroori ho jaate hain. Ye shor ka aur ek galat dependency array se aane wale bugs ka ek bada source hataata hai. Ye is pe tikta hai ki tumhara code React ke Niyam maane — render ke dauraan koi badlaav nahi, render body mein koi side effect nahi — isliye linter zyada matter karta hai, aur un niyamon ko todta code bas optimise nahi hoga.',
    },
    codeExample: {
      code: `// The compiler adds memoisation automatically at BUILD time,
// so most manual optimisation becomes unnecessary.

// What you write today:
function List({ items, onSelect }) {
  const sorted = useMemo(() => items.sort(cmp), [items]);
  const handle = useCallback((id) => onSelect(id), [onSelect]);
  return <Row items={sorted} onClick={handle} />;
}

// What you will write:
function List({ items, onSelect }) {
  const sorted = items.sort(cmp);              // compiler memoises
  const handle = (id) => onSelect(id);         // compiler memoises
  return <Row items={sorted} onClick={handle} />;
}

// Why this is a real improvement: useMemo and useCallback are
// easy to get wrong. A missing dependency causes a stale bug;
// an unnecessary one causes churn. Removing them removes a
// whole class of mistakes — and a lot of noise.

// The catch: it only works if your code follows the Rules of
// React — no mutation during render, no side effects in the
// render body, hooks called unconditionally. Code that breaks
// those rules is simply skipped, not optimised.

// So the linter matters more now, not less:
// eslint-plugin-react-compiler`,
      output: `same behaviour, fewer hooks to maintain`,
    },
  },
  {
    question: 'What are the Rules of React and why do they matter more now?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Components and hooks must be PURE during render: no mutating props, state, or anything outside; no side effects in the render body; hooks called unconditionally at the top level in the same order every render. They have always been rules, but React 18\'s concurrent features and the React Compiler both DEPEND on them — a component that mutates during render can now produce genuinely wrong output rather than merely being untidy.',
      hinglish:
        'Components aur hooks ko render ke dauraan SHUDDH hona chahiye: props, state, ya kisi bahar ki cheez ko na badlo; render body mein koi side effect nahi; hooks har render mein bina shart top level pe usi kram mein bulaao. Ye hamesha niyam the, par React 18 ke concurrent features aur React Compiler dono in PE TIKTE hain — ek component jo render ke dauraan badlaav karta hai ab bekaar dikhne ke bajaye genuinely galat output de sakta hai.',
    },
    codeExample: {
      code: `// 1. Components and hooks must be PURE during render.
function Bad({ items }) {
  items.push('x');              // ❌ mutating a prop
  document.title = 'hi';        // ❌ side effect during render
  return <ul>…</ul>;
}
function Good({ items }) {
  const next = [...items, 'x']; // ✅ a new array
  useEffect(() => { document.title = 'hi'; });  // ✅ in an effect
  return <ul>…</ul>;
}

// 2. Do not mutate props, state, or anything passed to you.
state.count++;                  // ❌
setState(c => c + 1);           // ✅

// 3. Hooks: top level only, same order every render.

// 4. Render must be able to run MORE THAN ONCE with the same
//    result. Strict Mode double-invokes deliberately to check.

// Why this matters more than it used to:
//   • Concurrent rendering can PAUSE, ABANDON and RESTART a
//     render. An impure component produces wrong output.
//   • The React Compiler assumes purity to memoise safely.
//     Break the rules and it silently skips your component.

// These were always the rules. The difference is that breaking
// them used to be untidy; now it is a correctness bug.`,
      output: `(Strict Mode surfaces impure renders in dev)`,
    },
  },
  {
    question: 'What is Suspense and what can it do now?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`<Suspense>` declares a fallback for a subtree that is not ready yet, so loading state moves out of every component and into the tree structure. It handles lazily-loaded components, data fetching through a supported library or the `use` hook, and streaming server rendering — where the shell is sent immediately and slower sections fill in as they resolve. Placing boundaries thoughtfully turns one slow query from a page-wide blocker into a spinner in one card.',
      hinglish:
        '`<Suspense>` ek aise hisse ke liye ek fallback batata hai jo abhi taiyaar nahi, isliye loading ka roop har component se nikal kar ped ke dhaanche mein aa jaata hai. Ye sust load hote components, ek supported library ya `use` hook se data laana, aur streaming server rendering sambhalta hai — jahan dhaancha turant bhej diya jaata hai aur dheeme hisse sulajhte hi bhar jaate hain. Seemayein soch kar rakhna ek dheemi query ko poore page ki rukaawat se ek card ke spinner mein badal deta hai.',
    },
    codeExample: {
      code: `// Suspense declares a fallback for a subtree that is not ready.
<Suspense fallback={<Spinner />}>
  <Profile />          {/* may suspend while loading */}
</Suspense>

// 1. Lazy components — the original use
const Chart = lazy(() => import('./Chart'));
<Suspense fallback={<Skeleton />}><Chart /></Suspense>

// 2. Data fetching, via a supported library or use()
function Comments({ promise }) {
  const data = use(promise);      // suspends
}

// 3. Streaming SSR — the shell is sent immediately and slower
//    sections stream in as they resolve:
<Layout>
  <Header />                           {/* instant */}
  <Suspense fallback={<Skeleton />}>
    <SlowFeed />                       {/* streams in later */}
  </Suspense>
</Layout>

// Where you place boundaries is a design decision. One at the
// top means the whole page waits for the slowest query. Several
// smaller ones let fast content appear immediately.

// What Suspense does NOT do: it does not fetch anything, and it
// does not catch errors — that needs an error boundary. Pair
// them: Suspense for loading, ErrorBoundary for failure.`,
      output: `header instantly, feed a moment later`,
    },
  },
  {
    question: 'What is an error boundary and what does it not catch?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An error boundary is a component with `componentDidCatch` or `getDerivedStateFromError` that catches errors thrown during rendering in its subtree and shows a fallback instead of unmounting the whole tree. It does NOT catch errors in event handlers, in asynchronous code such as a `setTimeout` or a promise rejection, in server-side rendering, or in the boundary itself. Those need ordinary try/catch, which surprises people who expect it to catch everything.',
      hinglish:
        'Ek error boundary `componentDidCatch` ya `getDerivedStateFromError` wala ek component hai jo apne hisse mein render ke dauraan uthi errors pakadta hai aur poore ped ko hataane ke bajaye ek fallback dikhata hai. Ye event handlers ki errors, `setTimeout` ya ek promise ke mana karne jaise asynchronous code ki, server-side rendering ki, ya khud boundary ki errors NAHI pakadta. Unhe aam try/catch chahiye, jo un logon ko chaunkata hai jo sochte hain ye sab kuch pakadta hai.',
    },
    codeExample: {
      code: `// A class component that catches render errors below it and
// shows a fallback instead of unmounting the whole tree.
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };            // update the UI
  }
  componentDidCatch(error, info) {
    logToService(error, info.componentStack);   // report it
  }
  render() {
    if (this.state.hasError) return <p>Something went wrong.</p>;
    return this.props.children;
  }
}

<ErrorBoundary><Dashboard /></ErrorBoundary>

// What it does NOT catch:
//   ❌ event handlers        → use try/catch
//   ❌ async code (setTimeout, promises)
//   ❌ server-side rendering
//   ❌ errors thrown in the boundary itself

onClick={() => {
  try { risky(); } catch (e) { setError(e); }   // ✅ handle here
}}

// There is still no hook version — this is the one thing that
// requires a class. In practice most people use
// react-error-boundary, which wraps it with a nicer API.

// Place several small boundaries rather than one at the root,
// so a broken widget does not blank the entire page.`,
      output: `Something went wrong.`,
    },
  },
  {
    question: 'How do you decide between local state, Context, and a state library?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Start with LOCAL state and lift only when a second consumer genuinely exists — putting everything high in the tree causes needless re-renders and makes components unreusable. Use CONTEXT for values that rarely change and are needed widely, such as theme or the current user, since every consumer re-renders on any change. Reach for a state library when you have frequently-updating shared state, and use a data library such as React Query for server state rather than storing it yourself.',
      hinglish:
        'LOCAL state se shuru karo aur tabhi upar le jao jab ek doosra istemaal karne wala genuinely ho — sab kuch ped mein upar rakhna bekaar re-renders karta hai aur components ko dobara istemaal ke layak nahi rakhta. CONTEXT un values ke liye use karo jo kam badalti hain aur widely chahiye, jaise theme ya abhi ka user, kyunki har badlaav pe har consumer re-render hota hai. Ek state library tab uthao jab tumhare paas aksar badalti saanjhi state ho, aur server state ke liye use khud rakhne ke bajaye React Query jaisi ek data library use karo.',
    },
    codeExample: {
      code: `// Start LOCAL. Lift only when a second consumer genuinely exists.
function Form() {
  const [name, setName] = useState('');   // nobody else needs this
}

// CONTEXT — for values needed WIDELY that change RARELY.
const ThemeContext = createContext();
// theme, locale, the logged-in user, feature flags
// Every consumer re-renders on any change, so a fast-changing
// value here is a performance problem.

// A STATE LIBRARY — shared state that changes often.
const useCart = create((set) => ({
  items: [],
  add: (i) => set((s) => ({ items: [...s.items, i] })),
}));
const items = useCart((s) => s.items);   // subscribes to a SLICE

// SERVER DATA — none of the above.
const { data } = useQuery({ queryKey: ['users'], queryFn: getUsers });

// The decision in order:
//   1. Can it live in one component?        → useState
//   2. Does it come from an API?            → React Query
//   3. Is it stable and needed everywhere?  → Context
//   4. Is it shared and changes often?      → Zustand / Redux

// The common mistake is jumping to step 3 or 4 too early.
// Global state makes components harder to reuse and test, and
// causes re-renders you then spend time optimising away.`,
      output: `(state kept as close to where it is used as possible)`,
    },
  },
  {
    question: 'Why should server data not live in your own state?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Server data is a CACHE with its own concerns — staleness, refetching, deduplication of in-flight requests, invalidation, retries, and background updates — and reimplementing all of that in `useEffect` and `useState` is a large amount of code that a dedicated library already solves correctly. Use React Query, SWR, or RTK Query for it, and keep your own state for genuine client concerns: UI mode, selections, wizards, and anything the server has no opinion about.',
      hinglish:
        'Server data ek CACHE hai apne concerns ke saath — puranapan, dobara laana, chalti requests ka dohraav hataana, radd karna, retries, aur peeche ke updates — aur wo sab `useEffect` aur `useState` mein dobara likhna bahut saara code hai jise ek dedicated library pehle se sahi solve karti hai. Uske liye React Query, SWR, ya RTK Query use karo, aur apni state ko asli client ke concerns ke liye rakho: UI mode, chunaav, wizards, aur jo bhi server ke liye matlab nahi rakhta.',
    },
    codeExample: {
      code: `// The pattern almost everyone writes first:
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/users')
      .then(r => r.json())
      .then(d => { if (!cancelled) setUsers(d); })
      .catch(e => { if (!cancelled) setError(e); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);
}

// That is 15 lines, and it still does not handle: refetching on
// focus, retrying, deduping two components asking at once,
// caching, invalidating after a mutation, or pagination.

// The same thing with a data library:
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
});

// The insight: server data is a CACHE, not application state.
// It has an owner elsewhere, it goes stale, and two components
// asking for it should share one request.

// Keep your own state for things the server has no opinion
// about: which tab is open, what is selected, wizard progress.`,
      output: `15 lines → 4, with caching and retries included`,
    },
  },
  {
    question: 'When do you actually need useEffect?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Only to SYNCHRONISE with something outside React: a subscription, a browser API, a timer, a non-React widget, or manual DOM measurement. You do not need it to transform data for rendering, which should be computed during render; to reset state when a prop changes, which a `key` handles better; to handle a user event, which belongs in the handler; or to fetch data, which a data library or a Server Component does properly. Most `useEffect` bugs come from using it where it was never needed.',
      hinglish:
        'Sirf React ke bahar kisi cheez se MILAAN ke liye: ek subscription, ek browser API, ek timer, ek non-React widget, ya haath se DOM naapna. Tumhe ise render ke liye data badalne ko nahi chahiye, jo render ke dauraan nikalna chahiye; ek prop badalne pe state reset karne ko nahi, jise ek `key` behtar sambhalta hai; ek user event sambhaalne ko nahi, jo handler mein hai; ya data laane ko nahi, jise ek data library ya ek Server Component theek karta hai. Zyadatar `useEffect` bugs use wahan use karne se aate hain jahan wo kabhi zaroori tha hi nahi.',
    },
    visual: 'effect-lifecycle',
    codeExample: {
      code: `// ✅ YES — synchronising with something OUTSIDE React:
useEffect(() => {                       // a subscription
  const sub = chat.connect(roomId);
  return () => sub.disconnect();
}, [roomId]);

useEffect(() => {                       // a browser API
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);

// ❌ NO — transforming data for rendering.
const [full, setFull] = useState('');
useEffect(() => { setFull(first + ' ' + last); }, [first, last]);
// Causes two renders. Just compute it:
const full = first + ' ' + last;        // ✅

// ❌ NO — resetting state when a prop changes.
useEffect(() => { setSelected(null); }, [userId]);
// Use a key instead — React remounts and state resets:
<Profile key={userId} />                // ✅

// ❌ NO — handling a user event.
useEffect(() => { if (submitted) save(); }, [submitted]);
onClick={() => save()}                  // ✅ just do it in the handler

// ❌ NO — fetching data. Use React Query, or a Server Component.

// The test: "am I talking to something outside React?"
// If not, you probably do not need an effect.`,
      output: `1 render instead of 2`,
    },
  },
  {
    question: 'What is the difference between useLayoutEffect and useEffect?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`useEffect` runs asynchronously AFTER the browser paints, so it does not block rendering — the correct default. `useLayoutEffect` runs synchronously after DOM mutation but BEFORE paint, so it blocks painting. Use it only when you must measure the DOM and change it before the user sees an intermediate state, such as positioning a tooltip. It does not run during server rendering, which produces a warning, and overusing it causes visible jank.',
      hinglish:
        '`useEffect` browser ke paint karne ke BAAD asynchronously chalta hai, isliye ye rendering nahi rokta — sahi default. `useLayoutEffect` DOM badalne ke baad par paint se PEHLE synchronously chalta hai, isliye ye painting rok deta hai. Ise sirf tab use karo jab tumhe DOM naapna ho aur user ke ek beech ki haalat dekhne se pehle use badalna ho, jaise ek tooltip rakhna. Ye server rendering ke dauraan nahi chalta, jo ek warning deta hai, aur iska zyada istemaal dikhne wali atkan banata hai.',
    },
    codeExample: {
      code: `// useEffect — runs AFTER the browser paints. Asynchronous.
useEffect(() => {
  setWidth(ref.current.offsetWidth);
}, []);
// The user may briefly SEE the wrong value before it corrects.

// useLayoutEffect — runs after DOM mutation but BEFORE paint.
// Synchronous, so it blocks painting.
useLayoutEffect(() => {
  setWidth(ref.current.offsetWidth);    // measured and fixed
}, []);                                 // before anything is drawn

// Use useLayoutEffect ONLY when you must measure the DOM and
// change it before the user sees an intermediate state:
useLayoutEffect(() => {
  const { height } = tooltipRef.current.getBoundingClientRect();
  setPosition(triggerTop - height);     // no visible jump
}, [isOpen]);

// Everything else should be useEffect — it does not block
// rendering, so the page stays responsive.

// Two gotchas:
//   • useLayoutEffect does not run during SSR, and React warns
//     about it. Guard it, or use useEffect on the server:
const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
//   • heavy work inside it visibly freezes the page

// Default to useEffect. Reach for the other only to prevent a
// visible flicker.`,
      output: `no flicker on first paint`,
    },
  },
  {
    question: 'What is the key prop actually for?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A `key` gives React a stable IDENTITY for an element across renders so it can match old and new children correctly. Using an array INDEX breaks that whenever the list is reordered, filtered, or has items inserted, because item identity shifts and React reuses the wrong state — a checked checkbox follows the wrong row. Use a stable id from the data. A `key` on a component is also the cleanest way to force a full remount and reset its state deliberately.',
      hinglish:
        'Ek `key` React ko renders ke aar-paar ek element ki sthir PEHCHAAN deti hai taaki wo purane aur naye children sahi milaa sake. Ek array INDEX use karna use tab todta hai jab list dobara jame, chhaani jaaye, ya usme items dale jaayein, kyunki cheezon ki pehchaan khisak jaati hai aur React galat state dobara use karta hai — ek check kiya checkbox galat row ke saath chala jaata hai. Data se ek sthir id use karo. Ek component pe ek `key` jaan boojh kar poora remount karne aur uski state reset karne ka sabse saaf tareeka bhi hai.',
    },
    visual: 'list-keys',
    codeExample: {
      code: `// A key gives React a stable IDENTITY for an element across
// renders, so it knows which item is which after a change.

{items.map((item, i) => <Row key={i} item={item} />)}      // ❌
{items.map((item)    => <Row key={item.id} item={item} />)} // ✅

// Why index breaks: it identifies by POSITION. Delete the first
// row and everything shifts up — React thinks row 0 just
// changed its text, so it REUSES row 0's state for a different
// item. A ticked checkbox follows the wrong row.

// It is not only a performance issue. It is a correctness bug
// whenever rows hold state: inputs, checkboxes, animations.

// Index is safe only if the list never reorders, never has
// items removed from the middle, and never has items inserted
// anywhere but the end.

// Keys must be stable, unique among SIBLINGS, and not random:
key={Math.random()}        // ❌ remounts everything, every render

// The other use — deliberately forcing a remount to reset state:
<Profile key={userId} />
// When userId changes, React unmounts the old Profile entirely
// and mounts a fresh one. Much cleaner than an effect that
// resets half a dozen state variables.`,
      output: `Ben keeps his own checkbox state`,
    },
  },
  {
    question: 'What causes unnecessary re-renders and how do you find them?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A parent re-rendering re-renders all children by default; a context value recreated each render re-renders every consumer; a new object or function prop breaks `React.memo` by reference. Find them with the React DevTools Profiler and the "highlight updates" option rather than guessing. Fix by moving state DOWN so fewer components sit above it, splitting context, memoising the value, or passing `children` so a subtree is not re-created. The React Compiler removes much of the manual work.',
      hinglish:
        'Ek parent ka re-render default se saare children ko re-render karta hai; har render pe dobara bana ek context value har consumer ko re-render karta hai; ek naya object ya function prop reference se `React.memo` tod deta hai. Unhe andaaza lagane ke bajaye React DevTools Profiler aur "highlight updates" option se dhoondho. State NEECHE le jaakar taaki uske upar kam components hon, context baant kar, value memoise karke, ya `children` pass karke theek karo taaki ek hissa dobara na bane. React Compiler bahut saara manual kaam hata deta hai.',
    },
    visual: 'react-render',
    codeExample: {
      code: `// FINDING them — React DevTools Profiler, and turn on
// "Highlight updates when components render". Do not guess.

// CAUSE 1 — a new object or function prop every render, which
// defeats memo:
<Row style={{ color: 'red' }} onClick={() => x()} />   // ❌
const style = useMemo(() => ({ color: 'red' }), []);
const onClick = useCallback(() => x(), []);            // ✅

// CAUSE 2 — an inline context value:
<Ctx.Provider value={{ user, setUser }}>               // ❌ new each time
const value = useMemo(() => ({ user, setUser }), [user]);  // ✅

// CAUSE 3 — state too high in the tree. Everything below it
// re-renders on every change.
// Fix: move it DOWN into the component that actually uses it.

// CAUSE 4 — the parent re-renders, so all children do, even
// with unchanged props. Usually fine, but:
const Row = memo(Row);                    // for expensive children

// CAUSE 5 — passing children as a prop rebuilds them:
<Layout>{<Heavy />}</Layout>
// Passing children through means the parent's render does not
// recreate them.

// Perspective: a re-render is NOT automatically a problem.
// React only touches the DOM for what changed. Optimise when
// the profiler shows a real cost, not on principle.`,
      output: `renders 47 → 3 per keystroke`,
    },
  },
  {
    question: 'What is hydration and what causes a hydration mismatch?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Hydration is React attaching event handlers to server-rendered HTML to make it interactive. A mismatch occurs when the client renders something DIFFERENT from the server. Common causes: `Date.now()` or `Math.random()` in render, reading `window` or `localStorage` during the first render, invalid HTML nesting such as a `<div>` inside a `<p>`, and browser extensions modifying the DOM. Fix by moving browser-only logic into an effect or gating it behind a mounted flag.',
      hinglish:
        'Hydration React ka server-rendered HTML pe event handlers lagana hai taaki wo interactive ho. Ek mismatch tab hota hai jab client server se ALAG kuch render kare. Aam karan: render mein `Date.now()` ya `Math.random()`, pehle render mein `window` ya `localStorage` padhna, galat HTML nesting jaise ek `<p>` ke andar ek `<div>`, aur DOM badalte browser extensions. Sirf browser wale logic ko ek effect mein le jaakar ya ek mounted flag ke peeche rakh kar theek karo.',
    },
    codeExample: {
      code: `// Hydration = React attaching event handlers to server-rendered
// HTML so it becomes interactive. The markup must MATCH.

hydrateRoot(document.getElementById('root'), <App />);

// A mismatch means the client rendered something different.

// CAUSE 1 — anything time or random based
<p>{new Date().toLocaleString()}</p>      // ❌ server ≠ client
<p>{Math.random()}</p>                    // ❌

// CAUSE 2 — reading browser APIs during the first render
const [w, setW] = useState(window.innerWidth);   // ❌ no window on server

// The fix for both — render the same thing first, then update:
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
return <p>{mounted ? new Date().toString() : 'Loading…'}</p>;

// CAUSE 3 — invalid HTML nesting. The browser silently repairs
// it, so the real DOM no longer matches what React expects:
<p><div>text</div></p>                    // ❌ browser moves the div

// CAUSE 4 — browser extensions injecting attributes. Harmless,
// and suppressHydrationWarning on that element is acceptable.

// Why it matters: React logs an error and may discard the
// server HTML and re-render on the client, which throws away
// the SSR performance benefit entirely.`,
      output: `Warning: Text content did not match. Server: "10:32" Client: "10:33"`,
    },
  },
  {
    question: 'What is a controlled versus uncontrolled component?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A CONTROLLED input has its value driven by React state, so every keystroke triggers a re-render — which gives full control for validation and formatting but costs performance on a large form. An UNCONTROLLED input keeps its value in the DOM and you read it with a ref or on submit, which is far cheaper. React Hook Form is popular precisely because it keeps inputs uncontrolled and re-renders minimally, which is why it outperforms naive controlled forms.',
      hinglish:
        'Ek CONTROLLED input ki value React state chalati hai, isliye har keystroke ek re-render karta hai — jo validation aur roop pe poora control deta hai par ek bade form pe performance cost karta hai. Ek UNCONTROLLED input apni value DOM mein rakhta hai aur tum use ek ref se ya submit pe padhte ho, jo bahut sasta hai. React Hook Form theek isiliye popular hai kyunki wo inputs ko uncontrolled rakhta hai aur bahut kam re-render karta hai, isiliye wo naive controlled forms se behtar chalta hai.',
    },
    codeExample: {
      code: `// CONTROLLED — React state is the source of truth.
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />
// Every keystroke re-renders. You can validate, format, or
// reject input as it is typed:
onChange={e => setValue(e.target.value.toUpperCase())}

// UNCONTROLLED — the DOM keeps the value; you read it on demand.
const ref = useRef(null);
<input ref={ref} defaultValue="" />
const submit = () => console.log(ref.current.value);
// No re-render per keystroke — noticeably faster on big forms.

// Note defaultValue, not value, for uncontrolled inputs.

// The two classic errors:
<input value={name} />                    // ❌ read-only, no onChange
<input value={undefined} />               // ❌ switches uncontrolled
                                          //    → controlled, warns
<input value={name ?? ''} onChange={fn} /> // ✅

// File inputs are ALWAYS uncontrolled — you cannot set their
// value programmatically, for security reasons.

// Which to use: controlled for live validation and dependent
// fields; uncontrolled for large or simple forms. React Hook
// Form is popular because it keeps inputs uncontrolled and
// re-renders far less than a fully controlled form.`,
      output: `ASHA`,
    },
  },
  {
    question: 'How do you test a React component well?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use React Testing Library and query the way a USER would — by role, label, and text rather than by test id or class, so a refactor that keeps behaviour does not break the test. Test behaviour rather than implementation: assert what appears after a click, not that a state setter was called. Mock the network at the boundary with MSW rather than mocking your own modules, which tests the real wiring. And avoid snapshot tests as a substitute for assertions, since they mostly get blindly updated.',
      hinglish:
        'React Testing Library use karo aur waise dhoondho jaise ek USER dhoondhta — role, label, aur text se, ek test id ya class se nahi, taaki ek refactor jo vyavahaar bachaaye wo test na tode. Implementation ke bajaye vyavahaar test karo: ye jaancho ki ek click ke baad kya dikhta hai, ye nahi ki ek state setter bulaaya gaya. Apne modules mock karne ke bajaye MSW se network ko seema pe mock karo, jo asli judaav test karta hai. Aur assertions ke badal ki tarah snapshot tests se bacho, kyunki wo zyadatar aankh band karke update ho jaate hain.',
    },
    codeExample: {
      code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('shows an error for an invalid email', async () => {
  render(<SignupForm />);

  // Query the way a USER would — by role and label, not by
  // class name or test id. A refactor that keeps the behaviour
  // then keeps the test passing.
  await userEvent.type(screen.getByLabelText(/email/i), 'nope');
  await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

  expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
});

// Test BEHAVIOUR, not implementation:
expect(screen.getByText('Saved')).toBeInTheDocument();   // ✅
expect(setState).toHaveBeenCalled();                     // ❌

// Mock the NETWORK at the boundary, not your own modules:
import { setupServer } from 'msw/node';
// This exercises the real component wiring, including error paths.

// Query priority: getByRole > getByLabelText > getByText.
// If you cannot find something by role, that is often an
// accessibility problem the test just surfaced.

// Skip: snapshot tests as a substitute for assertions (they get
// blindly updated), and testing library internals.

// findBy* for async, getBy* for present, queryBy* for absent.`,
      output: `✓ shows an error for an invalid email (84ms)`,
    },
  },
];

// Attach the step-by-step walkthroughs, which live in their own file so this
// one stays navigable. Keys are matched on the exact question text; anything
// left over is a typo we want to hear about rather than silently lose.
const unmatched = new Set(Object.keys(deepDives));
for (const q of generalInterviewQuestions) {
  const sections = deepDives[q.question];
  if (!sections) continue;
  q.deepDive = sections;
  unmatched.delete(q.question);
}
if (unmatched.size > 0) {
  console.warn(
    `[react] ${unmatched.size} deep-dive key(s) match no question:`
  );
  for (const key of unmatched) console.warn(`  ${key}`);
}

export const curriculum = [...beginner, ...intermediate, ...advanced];
