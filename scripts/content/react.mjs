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
    'Modern UI library — components, hooks, state, performance aur production patterns. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '⚛️',
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
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
