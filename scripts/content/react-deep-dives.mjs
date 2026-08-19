/*
 * Step-by-step walkthroughs for the React interview questions.
 *
 * Same shape and same intent as javascript-deep-dives.mjs: the short `answer`
 * is what you say out loud, and this is the follow-up that walks the
 * mechanism one step at a time.
 *
 * Keyed by the EXACT question text in `generalInterviewQuestions`. Unmatched
 * keys are reported at import time (see the bottom of react.mjs).
 *
 * Each value is an ordered list of sections:
 *   heading { en, hi }  the step's title
 *   body    { en, hi }  what happens at this step, and why
 *   diagram             optional ASCII sketch, rendered as-is in monospace
 *   code                optional snippet
 *
 * Written against React 19: function components, hooks, concurrent
 * rendering, Server Components and the React Compiler.
 */

export const deepDives = {
  /* ─── Hooks: the rules and the core set ───────────────────── */

  'What are the rules of hooks?': [
    {
      heading: { en: 'Two rules, and they are not style preferences', hi: 'Do rules, aur ye style ki pasand nahi hain' },
      body: {
        en: 'Call hooks only at the TOP LEVEL of a component — never inside a condition, loop, or nested function. And call them only from a React function component or another hook. Break either and React genuinely cannot work, for a concrete reason.',
        hi: 'Hooks sirf component ke SABSE UPAR wale level pe call karo — kabhi kisi condition, loop ya nested function ke andar nahi. Aur unhe sirf React function component ya doosre hook se call karo. Koi bhi todo toh React sach mein kaam nahi kar sakta, aur uski thos wajah hai.',
      },
      code: `function Bad({ show }) {
  if (show) const [a] = useState(1);   // ✗ conditional
  for (const x of list) useEffect(fn); // ✗ in a loop
}

function Good({ show }) {
  const [a] = useState(1);             // ✓ top level, always
  useEffect(() => { if (show) fn(); });
}`,
    },
    {
      heading: { en: 'Why: hooks are matched by CALL ORDER', hi: 'Kyun: hooks CALL ORDER se match hote hain' },
      body: {
        en: 'React does not know your hook is called "count". It stores hook state in a linked list per component and matches each call to a slot by position — first useState gets slot 1, second gets slot 2. The name is irrelevant; only the order matters.',
        hi: 'React ko nahi pata tumhara hook "count" naam ka hai. Wo har component ke liye hook state ek linked list mein rakhta hai aur har call ko jagah ke hisaab se slot deta hai — pehla useState slot 1, doosra slot 2. Naam bemaani hai; sirf order maayne rakhta hai.',
      },
      diagram: `render 1            render 2 (condition now false)
useState → slot 1   useState → slot 1   ✓
useState → slot 2   useEffect → slot 2  ✗ effect reads state!
useEffect → slot 3  (slot 3 missing)`,
    },
    {
      heading: { en: 'What breaking it actually does', hi: 'Isse todne se asal mein kya hota hai' },
      body: {
        en: 'Skip a hook on one render and every hook after it shifts up a slot. State from one hook lands in another, effects fire with the wrong dependencies, and you get corrupted values rather than a clean crash. React\'s dev warning exists because the failure would otherwise be silent.',
        hi: 'Ek render mein hook chhod do aur uske baad ke saare hooks ek slot upar khisak jaate hain. Ek hook ki state doosre mein chali jaati hai, effects galat dependencies ke saath chalte hain, aur saaf crash ki jagah kharaab values milti hain. React ka dev warning isliye hai kyunki warna ye failure chup-chaap hoti.',
      },
      code: `// React throws in dev:
// "Rendered fewer hooks than expected. This may be caused by an
//  accidental early return statement."`,
    },
    {
      heading: { en: 'Early returns count as conditional', hi: 'Early returns bhi conditional hi hain' },
      body: {
        en: 'This is the version people actually hit. A guard clause before a hook means that hook is skipped on some renders. Put every hook above every return, and handle the branch in the JSX instead.',
        hi: 'Log asal mein isi roop se takraate hain. Kisi hook se pehle guard clause matlab wo hook kuch renders mein chhoot jaata hai. Har hook ko har return ke upar rakho, aur branch ko JSX mein sambhaalo.',
      },
      code: `function Bad({ user }) {
  if (!user) return null;              // ✗ hooks below are skipped
  const [n, setN] = useState(0);
}

function Good({ user }) {
  const [n, setN] = useState(0);       // ✓ always runs
  if (!user) return null;
}`,
    },
    {
      heading: { en: 'The second rule: only from React functions', hi: 'Doosra rule: sirf React functions se' },
      body: {
        en: 'Hooks need to know which component is rendering, and React tracks that with an internal "currently rendering" pointer. Call one from a plain function, an event handler, or a class and that pointer is null, so React throws.',
        hi: 'Hooks ko pata hona chahiye kaunsa component render ho raha hai, aur React usse ek internal "abhi render ho raha hai" pointer se track karta hai. Saade function, event handler ya class se call karo toh wo pointer null hota hai, isliye React error deta hai.',
      },
      code: `function helper() { return useState(0); }   // ✗ not a component
function useHelper() { return useState(0); } // ✓ a custom hook

<button onClick={() => useState(0)}>   // ✗ event handler`,
    },
    {
      heading: { en: 'Custom hooks are just the naming convention', hi: 'Custom hooks bas naam ka niyam hain' },
      body: {
        en: 'A custom hook is an ordinary function whose name starts with "use". The prefix is not magic — it is what tells the linter and the compiler to apply the rules. Without it they cannot tell your function calls hooks.',
        hi: 'Custom hook ek aam function hai jiska naam "use" se shuru hota hai. Ye prefix jaadu nahi — yahi linter aur compiler ko batata hai ki rules lagane hain. Iske bina wo bata hi nahi sakte ki tumhara function hooks call karta hai.',
      },
    },
    {
      heading: { en: 'Let the tooling enforce it', hi: 'Tooling se ye lagwao' },
      body: {
        en: 'eslint-plugin-react-hooks catches both rules automatically, and the React Compiler refuses to optimise a component that breaks them. Turn the plugin on and the question stops being something you have to remember.',
        hi: 'eslint-plugin-react-hooks dono rules apne aap pakad leta hai, aur React Compiler aise component ko optimise karne se mana kar deta hai jo inhe tode. Plugin chaalu karo aur ye sawaal yaad rakhne wali baat nahi rehta.',
      },
      code: `// .eslintrc
{ "plugins": ["react-hooks"],
  "rules": { "react-hooks/rules-of-hooks": "error" } }`,
    },
  ],

  'What is the difference between functional and class components?': [
    {
      heading: { en: 'Both render UI; only one is worth writing today', hi: 'Dono UI dete hain; aaj sirf ek likhne laayak hai' },
      body: {
        en: 'A class component extends React.Component and implements render(). A function component is a plain function returning JSX. Since hooks arrived, function components can do everything classes can, and the React team recommends them for all new code.',
        hi: 'Class component React.Component ko extend karta hai aur render() likhta hai. Function component ek saada function hai jo JSX return karta hai. Hooks ke aane ke baad function components wo sab kar sakte hain jo classes karte the, aur React team har naye code ke liye yahi salaah deti hai.',
      },
      code: `class Hello extends React.Component {
  render() { return <h1>{this.props.name}</h1>; }
}

function Hello({ name }) { return <h1>{name}</h1>; }`,
    },
    {
      heading: { en: 'State: this.state versus useState', hi: 'State: this.state vs useState' },
      body: {
        en: 'A class holds one state object and merges partial updates into it. A function component holds as many independent state values as it likes, and each setter REPLACES rather than merges. That difference catches people migrating.',
        hi: 'Class ek state object rakhta hai aur adhoore updates usme merge kar deta hai. Function component jitne chaahe alag-alag state values rakh sakta hai, aur har setter merge nahi, BADAL deta hai. Migrate karne walon ko yahi farq pakadta hai.',
      },
      code: `this.setState({ a: 1 });        // merges — b is preserved

const [s, setS] = useState({ a: 0, b: 0 });
setS({ a: 1 });                  // ✗ b is gone
setS((p) => ({ ...p, a: 1 }));   // ✓ merge yourself`,
    },
    {
      heading: { en: 'Lifecycle versus effects', hi: 'Lifecycle vs effects' },
      body: {
        en: 'Classes split one concern across three methods — subscribe in didMount, re-subscribe in didUpdate, clean up in willUnmount. A single useEffect holds the whole concern in one place, with the cleanup returned right next to the setup.',
        hi: 'Classes ek hi kaam ko teen methods mein baant dete hain — didMount mein subscribe, didUpdate mein dobara subscribe, willUnmount mein cleanup. Ek useEffect poora kaam ek jagah rakhta hai, cleanup setup ke bilkul saath return karte hue.',
      },
      code: `useEffect(() => {
  const sub = subscribe(id);
  return () => sub.unsubscribe();     // setup and cleanup together
}, [id]);`,
    },
    {
      heading: { en: 'this is the class tax', hi: 'this class ka tax hai' },
      body: {
        en: 'Class methods lose their receiver when passed as callbacks, so you bind in the constructor or use a class field arrow. Function components have no this at all, which removes an entire category of bug.',
        hi: 'Class ke methods callback ki tarah bhejne pe apna receiver kho dete hain, isliye constructor mein bind karna padta hai ya class field arrow use karna padta hai. Function components mein this hota hi nahi, jisse bugs ki poori shreni khatam ho jaati hai.',
      },
      code: `this.handle = this.handle.bind(this);   // the class tax
handle = () => {};                       // or a field arrow

function C() { const handle = () => {}; }  // no this to lose`,
    },
    {
      heading: { en: 'Reuse: HOCs and render props versus custom hooks', hi: 'Reuse: HOCs aur render props vs custom hooks' },
      body: {
        en: 'This is the real reason hooks won. Sharing stateful logic between classes meant wrapping components in HOCs or render props, which nested the tree deeply and made prop origins hard to trace. A custom hook shares the logic without touching the tree at all.',
        hi: 'Hooks isi wajah se jeete. Classes ke beech stateful logic share karne ke liye components ko HOCs ya render props mein lapetna padta tha, jisse tree gehra ho jaata tha aur props kahan se aaye ye dhoondhna mushkil. Custom hook logic share karta hai bina tree ko chhue.',
      },
      code: `// class era
withRouter(withTheme(connect(mapState)(Component)))   // wrapper hell

// hooks
const router = useRouter();
const theme = useTheme();`,
    },
    {
      heading: { en: 'What only classes can still do', hi: 'Ab bhi sirf classes kya kar sakti hain' },
      body: {
        en: 'Error boundaries. There is no hook equivalent of componentDidCatch or getDerivedStateFromError, so an error boundary must still be a class — or you use a library like react-error-boundary that wraps one for you. Be ready for this follow-up.',
        hi: 'Error boundaries. componentDidCatch ya getDerivedStateFromError ka koi hook nahi hai, isliye error boundary ab bhi class hi honi chahiye — ya react-error-boundary jaisi library use karo jo tumhare liye ek lapet deti hai. Is follow-up ke liye taiyaar raho.',
      },
    },
    {
      heading: { en: 'And what only functions can do', hi: 'Aur sirf functions kya kar sakte hain' },
      body: {
        en: 'Everything new. Hooks, Server Components, the use hook, useTransition, and React Compiler optimisation are all function-only. Classes are supported for compatibility and are receiving no new features.',
        hi: 'Sab kuch naya. Hooks, Server Components, use hook, useTransition, aur React Compiler ki optimisation — sab sirf functions ke liye. Classes compatibility ke liye chal rahe hain aur unhe koi naya feature nahi mil raha.',
      },
    },
  ],

  'What is prop drilling and how do you avoid it?': [
    {
      heading: { en: 'Passing props through components that do not use them', hi: 'Props un components se guzarna jo unhe use hi nahi karte' },
      body: {
        en: 'Prop drilling is threading a value down several levels where the intermediate components only forward it. Each middle layer gains a prop it does not care about, and its signature now depends on a descendant\'s needs.',
        hi: 'Prop drilling matlab kisi value ko kai levels neeche bhejna jahan beech ke components sirf usse aage pass karte hain. Har beech ki layer ko ek aisa prop mil jaata hai jisse uska koi lena-dena nahi, aur uska signature ab kisi neeche wale ki zaroorat pe depend karta hai.',
      },
      diagram: `App (has user)
 └ Layout      (user — just forwards)
    └ Sidebar  (user — just forwards)
       └ Avatar (user — actually uses it)`,
    },
    {
      heading: { en: 'Why it is a problem worth naming', hi: 'Ye naam dene laayak problem kyun hai' },
      body: {
        en: 'Three concrete costs. Renaming the prop means editing every layer. Adding a second value repeats the whole exercise. And every intermediate component re-renders when the value changes, even though it does not read it.',
        hi: 'Teen thos keematein. Prop ka naam badlo toh har layer badalni padti hai. Doosri value jodo toh poora kaam dohrana padta hai. Aur value badalne pe har beech ka component re-render hota hai, jabki wo usse padhta bhi nahi.',
      },
    },
    {
      heading: { en: 'Fix one: composition — pass JSX, not data', hi: 'Ilaaj ek: composition — data nahi, JSX bhejo' },
      body: {
        en: 'The most underrated answer, and the one interviewers like hearing first. Render the leaf where the data already lives and pass the resulting element down as children. The middle layers never see the value at all.',
        hi: 'Sabse kam saraha gaya jawab, aur wahi jo interviewers pehle sunna chahte hain. Leaf ko wahin render karo jahan data pehle se hai aur bane hue element ko children ki tarah neeche bhejo. Beech ki layers value dekhti hi nahi.',
      },
      code: `// before: Layout and Sidebar both take user
<Layout user={user} />

// after: they take children instead
<Layout>
  <Sidebar>
    <Avatar user={user} />     {/* rendered where user lives */}
  </Sidebar>
</Layout>`,
    },
    {
      heading: { en: 'Fix two: Context for genuinely global values', hi: 'Ilaaj do: sach mein global values ke liye Context' },
      body: {
        en: 'Context lets any descendant read a value without it being threaded through. It fits things the whole tree needs — theme, locale, the current user, an auth token. It is not a state manager and it is not for values that change many times a second.',
        hi: 'Context kisi bhi descendant ko value padhne deta hai bina usse piroye. Ye un cheezon ke liye theek hai jo poore tree ko chahiye — theme, locale, maujooda user, auth token. Ye state manager nahi hai aur na hi un values ke liye jo second mein kai baar badalti hain.',
      },
      code: `const UserContext = createContext(null);

<UserContext value={user}>{children}</UserContext>   // React 19: no .Provider

function Avatar() {
  const user = use(UserContext);
  return <img src={user.avatar} />;
}`,
    },
    {
      heading: { en: 'The Context cost you must mention', hi: 'Context ki keemat jo batani zaroori hai' },
      body: {
        en: 'Every consumer re-renders when the context value changes — and if you pass an inline object, that is every single render, because the object is a new reference each time. Memoise the value, or split one context into several so consumers only subscribe to what they need.',
        hi: 'Context ki value badalne pe har consumer re-render hota hai — aur agar tum inline object doge toh ye har render pe hoga, kyunki har baar naya reference banta hai. Value ko memoise karo, ya ek context ko kai mein baanto taaki consumers sirf apni zaroorat ko subscribe karein.',
      },
      code: `<Ctx value={{ user, setUser }}>        // ✗ new object every render

const v = useMemo(() => ({ user, setUser }), [user]);
<Ctx value={v}>                        // ✓`,
    },
    {
      heading: { en: 'Fix three: a state library, when it earns it', hi: 'Ilaaj teen: state library, jab wo apni jagah banaye' },
      body: {
        en: 'Zustand, Jotai or Redux give you selector-based subscriptions, so a component re-renders only when the slice it selected changes. Reach for one when the state is genuinely shared, updates frequently, and Context is causing measurable re-render churn.',
        hi: 'Zustand, Jotai ya Redux selector-based subscriptions dete hain, toh component tabhi re-render hota hai jab uska chuna hua hissa badle. Inhe tab uthao jab state sach mein share ho rahi ho, baar-baar badalti ho, aur Context naapne laayak re-render churn kar raha ho.',
      },
      code: `const name = useStore((s) => s.user.name);   // subscribes to one slice`,
    },
    {
      heading: { en: 'And the one people forget: server state', hi: 'Aur wo jo log bhool jaate hain: server state' },
      body: {
        en: 'A lot of drilling is fetched data being passed around. TanStack Query or a Server Component removes the problem entirely — each component asks for the data it needs and the cache deduplicates the request. There is nothing left to drill.',
        hi: 'Bahut saari drilling asal mein fetch kiya hua data idhar-udhar bhejna hoti hai. TanStack Query ya Server Component ye problem hi khatam kar dete hain — har component apni zaroorat ka data maangta hai aur cache request ko ek hi rakhta hai. Drill karne ko kuch bachta hi nahi.',
      },
    },
    {
      heading: { en: 'Two or three levels is not a problem', hi: 'Do-teen level koi problem nahi hai' },
      body: {
        en: 'Say this out loud. Explicit props are the simplest, most traceable thing in React. Introducing Context to avoid passing one prop through two components makes the code harder to follow, not easier.',
        hi: 'Ye bol kar kaho. Saaf props React mein sabse simple aur sabse aasaani se dhoondhi jaane wali cheez hain. Ek prop do components se bachane ke liye Context laana code ko aasaan nahi, mushkil banata hai.',
      },
    },
  ],

  'What actually triggers a re-render in React?': [
    {
      heading: { en: 'Three things, and nothing else', hi: 'Teen cheezein, aur kuch nahi' },
      body: {
        en: 'A state update in the component, a context value it consumes changing, or its parent re-rendering. That is the complete list. Everything people believe about re-renders is a consequence of these three.',
        hi: 'Component mein state update, uske consume kiye hue context ki value ka badalna, ya uske parent ka re-render. Poori list yahi hai. Re-renders ke baare mein log jo bhi maante hain wo inhi teen ka nateeja hai.',
      },
      diagram: `1  setState / useReducer dispatch  in this component
2  a consumed context value changes
3  the PARENT re-rendered`,
    },
    {
      heading: { en: 'Props changing is not on the list', hi: 'Props badalna list mein nahi hai' },
      body: {
        en: 'This surprises people. A child does not re-render because its props changed — it re-renders because its parent did, and props changing is usually a side effect of that. A child with identical props still re-renders when the parent does, unless it is memoised.',
        hi: 'Ye logon ko chaunkata hai. Bachcha isliye re-render nahi hota ki uske props badle — wo isliye hota hai kyunki parent hua, aur props ka badalna aam taur pe usi ka nateeja hai. Bilkul same props wala bachcha bhi parent ke re-render pe re-render hota hai, jab tak wo memoised na ho.',
      },
      code: `function Parent() {
  const [n, setN] = useState(0);
  return <Child text="fixed" />;   // props never change
}
// Child STILL re-renders on every setN — the parent re-rendered`,
    },
    {
      heading: { en: 'Re-render does not mean DOM update', hi: 'Re-render matlab DOM update nahi' },
      body: {
        en: 'The most important distinction in this whole topic. Rendering means React calls your component function and gets an element tree. Committing means it changes real DOM nodes. If the new tree matches the old one, React renders and commits nothing.',
        hi: 'Is poore vishay ka sabse zaroori farq. Render matlab React tumhara component function bulata hai aur ek element tree paata hai. Commit matlab wo asli DOM nodes badalta hai. Naya tree purane se mil jaaye toh React render karta hai aur commit kuch nahi.',
      },
      diagram: `render phase              commit phase
call the component   →    diff    →   touch the DOM
(cheap, pure)                          (expensive)`,
    },
    {
      heading: { en: 'State updates bail out when the value is the same', hi: 'Value same ho toh state update ruk jaata hai' },
      body: {
        en: 'React compares the new state to the old with Object.is. If they match it may skip the re-render entirely — though it sometimes renders that component once more before bailing out, so do not rely on it for correctness.',
        hi: 'React nayi state ko purani se Object.is se compare karta hai. Match ho jaaye toh wo re-render poori tarah chhod sakta hai — waise kabhi-kabhi bail out se pehle ek baar aur render kar deta hai, isliye sahi vyavhaar ke liye ispe bharosa mat karo.',
      },
      code: `const [n, setN] = useState(0);
setN(0);                  // same value → bails out

const [o, setO] = useState({ a: 1 });
setO({ a: 1 });           // ✗ new object → always re-renders`,
    },
    {
      heading: { en: 'Mutating state does the opposite', hi: 'State mutate karna ulta karta hai' },
      body: {
        en: 'Object.is on the same reference is true, so React sees no change and skips the render even though the data is different. This is why a pushed array or an edited object silently fails to update the screen.',
        hi: 'Ek hi reference pe Object.is true hai, toh React ko koi badlaav nahi dikhta aur wo render chhod deta hai, jabki data alag hai. Isiliye push kiya hua array ya badla hua object chup-chaap screen update nahi karta.',
      },
      code: `items.push(x); setItems(items);      // ✗ same reference, no render
setItems([...items, x]);              // ✓ new reference`,
    },
    {
      heading: { en: 'Stopping the cascade', hi: 'Cascade rokna' },
      body: {
        en: 'React.memo makes a component skip re-rendering when its props are shallow-equal. It only helps if the props are stable, which is where useMemo and useCallback come in — an inline object or arrow prop defeats memo entirely.',
        hi: 'React.memo component ko tab re-render chhodne deta hai jab uske props shallow-equal hon. Ye tabhi kaam karta hai jab props sthir hon, aur yahin useMemo aur useCallback aate hain — inline object ya arrow prop memo ko poori tarah bekaar kar deta hai.',
      },
      code: `const Child = memo(Child);
<Child onClick={() => {}} />     // ✗ new function each render
<Child onClick={stable} />       // ✓`,
    },
    {
      heading: { en: 'And the answer that ends the topic', hi: 'Aur wo jawab jo vishay khatam kar deta hai' },
      body: {
        en: 'The React Compiler memoises components and values automatically, so most manual memo, useMemo and useCallback disappears. Mention it — it shows you know where React is going, not just where it has been.',
        hi: 'React Compiler components aur values ko apne aap memoise karta hai, toh zyadatar haath se likha memo, useMemo aur useCallback gaayab ho jaata hai. Iska zikr karo — isse pata chalta hai ki tumhe React ki disha pata hai, sirf uska ateet nahi.',
      },
    },
  ],

  'Explain automatic batching in React 18.': [
    {
      heading: { en: 'Several state updates, one re-render', hi: 'Kai state updates, ek re-render' },
      body: {
        en: 'Batching means React groups multiple setState calls that happen in the same tick and re-renders once with all of them applied. Three updates produce one render, not three.',
        hi: 'Batching matlab React ek hi tick mein hue kai setState calls ko ikattha karta hai aur sab lagaa kar ek baar re-render karta hai. Teen updates ek render dete hain, teen nahi.',
      },
      code: `function handle() {
  setA(1);
  setB(2);
  setC(3);
}
// one render, with a=1 b=2 c=3`,
    },
    {
      heading: { en: 'What changed in React 18', hi: 'React 18 mein kya badla' },
      body: {
        en: 'Batching is not new — React 17 already batched updates inside React event handlers. What React 18 added is batching EVERYWHERE: inside promises, setTimeout, native event listeners and async functions. That is why it is called "automatic".',
        hi: 'Batching nayi nahi hai — React 17 pehle se React event handlers ke andar updates batch karta tha. React 18 ne HAR JAGAH batching jodi: promises ke andar, setTimeout, native event listeners aur async functions mein. Isiliye ise "automatic" kehte hain.',
      },
      diagram: `                       React 17    React 18
React event handler    batched     batched
setTimeout             NOT         batched
promise / await        NOT         batched
native listener        NOT         batched`,
    },
    {
      heading: { en: 'The concrete before and after', hi: 'Thos pehle aur baad' },
      body: {
        en: 'The same code renders twice in React 17 and once in React 18. Nothing about your code changes — the improvement comes from upgrading and using createRoot.',
        hi: 'Wahi code React 17 mein do baar render karta hai aur React 18 mein ek baar. Tumhare code mein kuch nahi badalta — sudhaar upgrade karne aur createRoot use karne se aata hai.',
      },
      code: `setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
}, 0);

// React 17: two renders
// React 18: one render`,
    },
    {
      heading: { en: 'Why it needs createRoot', hi: 'Ise createRoot kyun chahiye' },
      body: {
        en: 'Automatic batching is part of the concurrent renderer. Calling the legacy ReactDOM.render keeps the old behaviour even on React 18, which is a common cause of "I upgraded and nothing changed".',
        hi: 'Automatic batching concurrent renderer ka hissa hai. Purana ReactDOM.render bulane se React 18 pe bhi purana behaviour rehta hai, aur "upgrade kiya par kuch nahi badla" ki ye aam wajah hai.',
      },
      code: `createRoot(el).render(<App />);   // ✓ automatic batching
ReactDOM.render(<App />, el);      // ✗ legacy behaviour`,
    },
    {
      heading: { en: 'Reading state right after setting it', hi: 'Set karne ke turant baad state padhna' },
      body: {
        en: 'Batching is often confused with this, but they are separate. State is a snapshot for the whole render, so the variable never changes mid-function regardless of batching. Use the updater form when the next value depends on the previous.',
        hi: 'Batching ko aksar isse mila diya jaata hai, par ye alag hain. State poore render ke liye ek snapshot hai, toh variable function ke beech mein kabhi nahi badalta, batching ho ya na ho. Jab agli value pichhli pe depend kare toh updater form use karo.',
      },
      code: `setN(n + 1);
setN(n + 1);       // n is still the old value → ends at +1

setN((p) => p + 1);
setN((p) => p + 1); // ✓ ends at +2`,
    },
    {
      heading: { en: 'Opting out with flushSync', hi: 'flushSync se bahar nikalna' },
      body: {
        en: 'flushSync forces React to render and commit synchronously before continuing. You need it rarely — measuring the DOM immediately after an update, or integrating with a non-React library that reads the DOM. It costs you the batching, so use it deliberately.',
        hi: 'flushSync React ko aage badhne se pehle synchronously render aur commit karne pe majboor karta hai. Iski zaroorat kam padti hai — update ke turant baad DOM naapna, ya kisi non-React library se jodna jo DOM padhti hai. Isse batching chali jaati hai, toh soch-samajh kar use karo.',
      },
      code: `flushSync(() => setOpen(true));
menuRef.current.scrollIntoView();   // the DOM is already updated`,
    },
    {
      heading: { en: 'Why it matters', hi: 'Ye kyun maayne rakhta hai' },
      body: {
        en: 'Fewer renders means less work, and no intermediate state ever reaches the screen. Without batching a user could see a frame where one value updated and the other had not — a genuine visual inconsistency, not just a performance cost.',
        hi: 'Kam renders matlab kam kaam, aur beech ki koi state kabhi screen tak nahi pahunchti. Batching ke bina user aisa frame dekh sakta tha jisme ek value update ho gayi ho aur doosri nahi — ye sirf performance ki keemat nahi, asli visual asangati hai.',
      },
    },
  ],

  'What is Strict Mode and why use it?': [
    {
      heading: { en: 'A development-only correctness check', hi: 'Sirf development ka ek jaanch' },
      body: {
        en: 'StrictMode is a component that wraps part of your tree and makes React apply extra checks in development. It renders nothing itself, changes no behaviour in production, and exists purely to surface bugs early.',
        hi: 'StrictMode ek component hai jo tumhare tree ka hissa lapetta hai aur React se development mein extra jaanch karwaata hai. Wo khud kuch render nahi karta, production mein koi behaviour nahi badalta, aur sirf bugs jaldi dikhane ke liye hai.',
      },
      code: `createRoot(el).render(
  <StrictMode><App /></StrictMode>
);`,
    },
    {
      heading: { en: 'The double invocation everyone notices', hi: 'Wo double invocation jo sabko dikhti hai' },
      body: {
        en: 'In development, StrictMode calls your component function, your state initialisers and your updater functions TWICE. If a double call changes the result, your function is not pure — and an impure render is exactly what breaks under concurrent rendering.',
        hi: 'Development mein StrictMode tumhare component function, state initialisers aur updater functions ko DO BAAR bulata hai. Double call se nateeja badle toh tumhara function pure nahi hai — aur impure render hi concurrent rendering mein toot ta hai.',
      },
      code: `let id = 0;
function Item() {
  const myId = id++;        // ✗ impure — differs across the two calls
  return <li>{myId}</li>;
}`,
    },
    {
      heading: { en: 'The double effect, and what it is testing', hi: 'Double effect, aur ye kya jaanch raha hai' },
      body: {
        en: 'StrictMode mounts, unmounts and remounts every component once. So each effect runs setup, cleanup, setup. If your app breaks, your effect has a missing or incorrect cleanup — which would also break with future features that remount preserved state.',
        hi: 'StrictMode har component ko ek baar mount, unmount aur dobara mount karta hai. Toh har effect setup, cleanup, setup chalata hai. App toote toh tumhare effect ka cleanup gayab ya galat hai — jo un aane wale features mein bhi tootega jo state bacha kar remount karte hain.',
      },
      diagram: `production      mount ──► setup
StrictMode dev  mount ──► setup ──► cleanup ──► setup
                          your cleanup must make this a no-op`,
    },
    {
      heading: { en: 'The classic bug it catches', hi: 'Ye kaunsa classic bug pakadta hai' },
      body: {
        en: 'A subscription, timer or listener created in an effect with no cleanup. In production you would leak one per mount and never notice; StrictMode makes the duplicate obvious on the very first render.',
        hi: 'Effect mein bana koi subscription, timer ya listener jiska cleanup nahi hai. Production mein har mount pe ek leak hota aur kabhi pata na chalta; StrictMode pehle hi render pe duplicate saaf dikha deta hai.',
      },
      code: `useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);     // ✓ without this you get two timers
}, []);`,
    },
    {
      heading: { en: 'Do not "fix" it with a ref guard', hi: 'Isse ref guard se "theek" mat karo' },
      body: {
        en: 'The common wrong response is a ran-once ref that skips the second setup. That hides the warning without fixing the effect, and the same bug will bite in production on any genuine remount. Write the cleanup instead.',
        hi: 'Aam galat jawab hai ek ran-once ref jo doosra setup chhod deta hai. Isse warning chhup jaati hai par effect theek nahi hota, aur wahi bug production mein kisi asli remount pe kaat lega. Uski jagah cleanup likho.',
      },
      code: `const ran = useRef(false);
useEffect(() => {
  if (ran.current) return;   // ✗ hiding the problem
  ran.current = true;
}, []);`,
    },
    {
      heading: { en: 'What else it warns about', hi: 'Ye aur kis cheez ki chetavni deta hai' },
      body: {
        en: 'Deprecated string refs and findDOMNode, legacy context, and unsafe lifecycle methods such as componentWillMount. These are all things that break under concurrent rendering.',
        hi: 'Deprecated string refs aur findDOMNode, purana context, aur componentWillMount jaise unsafe lifecycle methods. Ye sab concurrent rendering mein tootne wali cheezein hain.',
      },
    },
    {
      heading: { en: 'Keep it on', hi: 'Isse chaalu rakho' },
      body: {
        en: 'It costs nothing in production, since all of it is stripped from the production build. Turning it off to silence a double-render is treating the symptom — the underlying impurity is a real bug waiting for a concurrent render to expose it.',
        hi: 'Production mein iski koi keemat nahi, kyunki ye sab production build se hata diya jaata hai. Double-render chhupane ke liye isse band karna lakshan ka ilaaj hai — andar ki impurity ek asli bug hai jo kisi concurrent render ka intezaar kar rahi hai.',
      },
    },
  ],

  'How does the reconciliation diffing algorithm achieve O(n) instead of O(n^3)?': [
    {
      heading: { en: 'The general problem really is O(n³)', hi: 'Aam problem sach mein O(n³) hai' },
      body: {
        en: 'Computing the minimum edit script between two arbitrary trees of n nodes is a solved problem with a known cost of O(n³). For a page with a thousand nodes that is a billion operations — far too slow to run on every render.',
        hi: 'n nodes ke do mann-maane trees ke beech sabse chhota edit script nikalna ek suljha hua problem hai jiski maloom keemat O(n³) hai. Hazaar nodes wale page ke liye ye ek arab operations hain — har render pe chalane ke liye bahut dheema.',
      },
    },
    {
      heading: { en: 'React does not solve the general problem', hi: 'React aam problem hal karta hi nahi' },
      body: {
        en: 'This is the key insight to state. React gives up on finding the MINIMAL set of changes and instead applies two heuristics that are almost always right for real UIs. The result is O(n) and occasionally does more DOM work than strictly necessary — a trade React makes deliberately.',
        hi: 'Yahi asli baat hai jo batani hai. React SABSE CHHOTA badlaav dhoondhna chhod deta hai aur do heuristics lagata hai jo asli UIs ke liye lagbhag hamesha sahi hote hain. Nateeja O(n) hai aur kabhi-kabhi zaroorat se thoda zyada DOM kaam — ye sauda React jaan-boojh kar karta hai.',
      },
      diagram: `optimal algorithm    O(n³)   minimal edits
React's heuristics   O(n)    good-enough edits`,
    },
    {
      heading: { en: 'Heuristic one: a different type means a different tree', hi: 'Heuristic ek: alag type matlab alag tree' },
      body: {
        en: 'If the element type at a position changes — div to span, or Counter to Profile — React does not diff the children at all. It unmounts the whole old subtree, destroying its state, and mounts the new one from scratch.',
        hi: 'Agar kisi jagah element ka type badal jaaye — div se span, ya Counter se Profile — toh React children ko diff karta hi nahi. Wo poora purana subtree unmount kar deta hai, uski state khatam karke, aur naya shuru se mount karta hai.',
      },
      code: `{isEditing ? <Input value={v} /> : <Display value={v} />}
// switching remounts — Input's internal state is lost

// same type, different props → diffed and updated in place
<Input value={v} disabled={isEditing} />`,
    },
    {
      heading: { en: 'Heuristic two: compare children by position', hi: 'Heuristic do: children ko jagah se compare karo' },
      body: {
        en: 'React walks both children lists at the same time and compares index against index. That is one pass, which is where the O(n) comes from — but it means inserting at the front makes every subsequent child look changed.',
        hi: 'React dono children lists pe ek saath chalta hai aur index ko index se compare karta hai. Ye ek hi chakkar hai, aur yahin se O(n) aata hai — par iska matlab hai ki shuruaat mein kuch daalo toh uske baad ka har bachcha badla hua lagta hai.',
      },
      diagram: `old:  [A] [B]
new:  [X] [A] [B]

by position:  A→X changed, B→A changed, — →B inserted
              three operations for one insertion`,
    },
    {
      heading: { en: 'Which is exactly what keys fix', hi: 'Aur keys yahi theek karti hain' },
      body: {
        en: 'A key tells React the identity of a child independent of its position. With keys, React matches by key instead of index and recognises that A and B simply moved. This is the whole reason keys exist.',
        hi: 'Key React ko bachche ki pehchaan batati hai, uski jagah se alag. Keys ke saath React index ki jagah key se match karta hai aur samajh jaata hai ki A aur B bas khisak gaye. Keys ke hone ki poori wajah yahi hai.',
      },
      code: `{items.map((i) => <Row key={i.id} item={i} />)}   // ✓ stable identity
{items.map((i, idx) => <Row key={idx} item={i} />)} // ✗ same as position`,
    },
    {
      heading: { en: 'What the trade actually costs', hi: 'Is saude ki asli keemat kya hai' },
      body: {
        en: 'Occasionally React destroys and rebuilds a subtree it could have kept. In exchange, diffing is linear and predictable. For real interfaces — where elements rarely change type at the same position — the heuristics are correct nearly all the time.',
        hi: 'Kabhi-kabhi React aisa subtree toda aur dobara banata hai jise wo bacha sakta tha. Badle mein diffing linear aur andaaze laayak hai. Asli interfaces ke liye — jahan ek hi jagah pe elements ka type kam hi badalta hai — ye heuristics lagbhag hamesha sahi hote hain.',
      },
    },
    {
      heading: { en: 'Fiber is the scheduler, not the diff', hi: 'Fiber scheduler hai, diff nahi' },
      body: {
        en: 'A common follow-up. Fiber is the data structure and scheduler that lets React pause, resume and prioritise rendering work — it is what makes concurrent features possible. The diffing heuristics above are separate and unchanged by it.',
        hi: 'Ek aam follow-up. Fiber wo data structure aur scheduler hai jo React ko rendering ka kaam rokne, phir chalane aur priority dene deta hai — isi se concurrent features mumkin hain. Upar wali diffing heuristics alag hain aur isse badalti nahi.',
      },
    },
  ],

  'How does React handle async state updates inside event handlers vs setTimeout?': [
    {
      heading: { en: 'Since React 18, both are batched', hi: 'React 18 se dono batched hain' },
      body: {
        en: 'This question tests whether you know what changed. React 17 batched updates only inside React event handlers; anything in a timer, promise or native listener rendered once per call. React 18 batches everywhere, so both cases now produce one render.',
        hi: 'Ye sawaal jaanchta hai ki tumhe pata hai kya badla. React 17 sirf React event handlers ke andar batch karta tha; timer, promise ya native listener mein har call pe ek render hota tha. React 18 har jagah batch karta hai, toh dono cases mein ab ek render hota hai.',
      },
      code: `function handle() { setA(1); setB(2); }         // 1 render, always
setTimeout(() => { setA(1); setB(2); }, 0);      // 17: 2 renders
                                                  // 18: 1 render`,
    },
    {
      heading: { en: 'The real difference is the state snapshot', hi: 'Asli farq state ke snapshot ka hai' },
      body: {
        en: 'Batching is not the interesting half. The thing that trips people in BOTH cases is that state is a constant for the whole render — reading it after setting it gives you the old value, because the variable was captured when the component rendered.',
        hi: 'Batching dilchasp hissa nahi hai. DONO cases mein log isme phasate hain ki state poore render ke liye ek constant hai — set karne ke baad padho toh purani value milti hai, kyunki wo variable tab pakda gaya tha jab component render hua.',
      },
      code: `function handle() {
  console.log(n);      // 0
  setN(n + 1);
  console.log(n);      // still 0 — not a bug
}`,
    },
    {
      heading: { en: 'Where setTimeout makes it worse: the stale closure', hi: 'setTimeout ise kahan bigaadta hai: stale closure' },
      body: {
        en: 'A timer callback captures the state from the render that created it. By the time it fires, that value may be several renders out of date — and unlike an event handler, which is recreated each render, the timer keeps the old one.',
        hi: 'Timer ka callback us render ki state pakad leta hai jisne usse banaya. Jab tak wo chalta hai, wo value kai renders purani ho sakti hai — aur event handler ke ulat, jo har render pe naya banta hai, timer purane ko hi pakde rehta hai.',
      },
      code: `function Counter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    setInterval(() => setN(n + 1), 1000);   // ✗ n is forever 0
  }, []);
}
// the count goes 0 → 1 and then stops`,
    },
    {
      heading: { en: 'The updater form is the fix for both', hi: 'Dono ka ilaaj updater form hai' },
      body: {
        en: 'Passing a function to the setter makes React hand you the latest state instead of the captured one. It works identically in handlers and timers, and it is the answer to almost every "why is my state stale" question.',
        hi: 'Setter ko function do toh React tumhe pakdi hui nahi, sabse nayi state deta hai. Ye handlers aur timers dono mein ek jaisa chalta hai, aur "meri state purani kyun hai" ke lagbhag har sawaal ka jawab yahi hai.',
      },
      code: `setInterval(() => setN((prev) => prev + 1), 1000);   // ✓ always current

setN((p) => p + 1);
setN((p) => p + 1);   // ✓ +2, in a handler too`,
    },
    {
      heading: { en: 'Async functions and await', hi: 'Async functions aur await' },
      body: {
        en: 'Updates before and after an await are batched separately, because each continuation is a different tick. So two awaits can mean two renders even in React 18 — worth knowing when you are counting renders.',
        hi: 'await se pehle aur baad ke updates alag-alag batch hote hain, kyunki har continuation alag tick hai. Toh do awaits ka matlab React 18 mein bhi do renders ho sakte hain — renders ginte waqt ye jaanna kaam ka hai.',
      },
      code: `async function save() {
  setLoading(true);          // batch 1
  await api.post();
  setLoading(false);         // batch 2 — a separate render
  setDone(true);             // same batch as above
}`,
    },
    {
      heading: { en: 'How to answer it', hi: 'Isse kaise jawab dena hai' },
      body: {
        en: '"Since React 18 both are batched — that changed with the concurrent renderer and createRoot. The difference that still matters is closures: an event handler is recreated each render so it sees fresh state, while a timer created once in an effect keeps the state from that render. The updater form fixes it in both."',
        hi: '"React 18 se dono batched hain — ye concurrent renderer aur createRoot ke saath badla. Jo farq ab bhi maayne rakhta hai wo closures ka hai: event handler har render pe naya banta hai toh usse taazi state dikhti hai, jabki effect mein ek baar bana timer usi render ki state pakde rehta hai. Updater form dono theek kar deta hai."',
      },
    },
  ],

  'What is React?': [
    {
      heading: { en: 'A library for building user interfaces', hi: 'User interfaces banane ki ek library' },
      body: {
        en: 'React is a JavaScript library, not a framework — it handles the view layer and leaves routing, data fetching and build tooling to you. Its core idea is that UI is a function of state: describe what the screen should look like for a given state, and React makes the DOM match.',
        hi: 'React ek JavaScript library hai, framework nahi — ye view layer sambhaalti hai aur routing, data fetching aur build tooling tumpe chhod deti hai. Iska asli idea hai ki UI state ka function hai: batao ki kisi state pe screen kaisi dikhni chahiye, aur React DOM ko waisa bana deta hai.',
      },
      code: `UI = f(state)

function Counter({ count }) {
  return <p>Count: {count}</p>;   // describe, do not manipulate
}`,
    },
    {
      heading: { en: 'Declarative, not imperative', hi: 'Declarative, imperative nahi' },
      body: {
        en: 'This is the shift that matters. With plain DOM code you write the STEPS to change the screen. With React you write the RESULT you want and React works out the steps. That removes a whole class of bug where the DOM and your data drift apart.',
        hi: 'Yahi wo badlaav hai jo maayne rakhta hai. Saade DOM code mein tum screen badalne ke KADAM likhte ho. React mein tum wo NATEEJA likhte ho jo chahiye aur React kadam khud nikaalta hai. Isse bugs ki wo poori shreni khatam ho jaati hai jahan DOM aur data alag ho jaate hain.',
      },
      code: `// imperative
document.querySelector('#c').textContent = count;

// declarative
<p>{count}</p>`,
    },
    {
      heading: { en: 'Components and composition', hi: 'Components aur composition' },
      body: {
        en: 'The unit of reuse is a component: a function that takes props and returns a description of UI. Components compose into trees, and because they are just functions, composition is ordinary function composition rather than a framework feature.',
        hi: 'Dobara use hone wali ikaai component hai: ek function jo props leta hai aur UI ka varnan deta hai. Components mil kar trees bante hain, aur kyunki ye bas functions hain, composition koi framework feature nahi, aam function composition hi hai.',
      },
    },
    {
      heading: { en: 'One-way data flow', hi: 'Ek taraf ka data flow' },
      body: {
        en: 'Data goes down through props; changes go up through callbacks. A child can never reach into its parent. That constraint is what makes a React app traceable — when a value is wrong, there is exactly one path to walk back up.',
        hi: 'Data props se neeche jaata hai; badlaav callbacks se upar. Bachcha kabhi apne parent tak nahi pahunch sakta. Yahi bandhan React app ko dhoondhne laayak banata hai — koi value galat ho toh upar jaane ka bilkul ek hi raasta hota hai.',
      },
      diagram: `props  ↓        state lives at the top of the branch
              ↑  callbacks`,
    },
    {
      heading: { en: 'The Virtual DOM, described honestly', hi: 'Virtual DOM, imaandaari se' },
      body: {
        en: 'React builds a lightweight JavaScript description of the UI, compares it with the previous one, and applies only the differences to the real DOM. This is often oversold as "faster than the DOM" — it is not. It is fast enough while letting you write declaratively, which is the actual benefit.',
        hi: 'React UI ka ek halka JavaScript varnan banata hai, usse pichhle se compare karta hai, aur sirf farq asli DOM pe lagata hai. Isse aksar "DOM se tez" keh kar bech diya jaata hai — aisa nahi hai. Ye kaafi tez hai aur saath mein declarative likhne deta hai, aur asli fayda yahi hai.',
      },
    },
    {
      heading: { en: 'What React deliberately leaves out', hi: 'React jaan-boojh kar kya chhod deta hai' },
      body: {
        en: 'No router, no HTTP client, no global state, no form library, no build system. You choose those — React Router or the framework\'s own, TanStack Query, Zustand or Redux, Vite or Next.js. Saying this shows you understand it is a library, not a framework.',
        hi: 'Na router, na HTTP client, na global state, na form library, na build system. Ye tum chunte ho — React Router ya framework ka apna, TanStack Query, Zustand ya Redux, Vite ya Next.js. Ye kehna dikhata hai ki tum samajhte ho ye library hai, framework nahi.',
      },
    },
    {
      heading: { en: 'Where it runs', hi: 'Ye kahan chalta hai' },
      body: {
        en: 'React itself is renderer-agnostic. React DOM targets the browser, React Native targets mobile, and React Server Components render on the server. The component model is the same in all three.',
        hi: 'React khud renderer se azaad hai. React DOM browser ke liye, React Native mobile ke liye, aur React Server Components server pe render hote hain. Teeno mein component model wahi hai.',
      },
    },
  ],

  'What is the difference between Virtual DOM, Shadow DOM, and the real DOM?': [
    {
      heading: { en: 'Three unrelated things with confusing names', hi: 'Teen alag cheezein, uljhane wale naamon ke saath' },
      body: {
        en: 'Start by saying this. The real DOM is the browser\'s document tree. The Virtual DOM is a React implementation detail. The Shadow DOM is a browser standard for encapsulation. The only thing they share is the word DOM.',
        hi: 'Shuruaat isi se karo. Asli DOM browser ka document tree hai. Virtual DOM React ka ek implementation detail hai. Shadow DOM encapsulation ke liye ek browser standard hai. Inme sirf DOM shabd common hai.',
      },
      diagram: `real DOM      the browser's actual node tree
Virtual DOM   React's in-memory copy of what the UI should be
Shadow DOM    a browser feature for scoped, isolated subtrees`,
    },
    {
      heading: { en: 'The real DOM', hi: 'Asli DOM' },
      body: {
        en: 'The live tree of objects the browser builds from your HTML. Reading or writing it is not inherently slow — what is slow is triggering layout and paint repeatedly, and reading a layout property right after a write, which forces a synchronous reflow.',
        hi: 'Wo zinda tree jo browser tumhare HTML se banata hai. Usse padhna ya likhna apne aap dheema nahi hai — dheema hai baar-baar layout aur paint karana, aur likhne ke turant baad koi layout property padhna, jo synchronous reflow karwa deta hai.',
      },
      code: `el.style.width = '100px';
el.offsetHeight;            // ✗ forces a synchronous reflow
el.style.height = '50px';`,
    },
    {
      heading: { en: 'The Virtual DOM', hi: 'Virtual DOM' },
      body: {
        en: 'A tree of plain JavaScript objects describing what the UI should look like. On each render React builds a new one, diffs it against the previous, and applies the minimum set of real DOM changes it found. It is a means to declarative code, not a speed trick.',
        hi: 'Saade JavaScript objects ka ek tree jo batata hai UI kaisa dikhna chahiye. Har render pe React naya banata hai, purane se diff karta hai, aur jo sabse kam asli DOM badlaav mile wo lagata hai. Ye declarative code ka zariya hai, koi speed ka jugaad nahi.',
      },
      code: `<h1 className="x">hi</h1>

// becomes roughly:
{ type: 'h1', props: { className: 'x', children: 'hi' } }`,
    },
    {
      heading: { en: 'Be honest about the performance claim', hi: 'Performance ke daave pe imaandaar raho' },
      body: {
        en: 'The Virtual DOM is not faster than well-written direct DOM manipulation — it adds work. What it buys you is that you can write as if you re-rendered everything, and still get reasonable performance. Interviewers notice when a candidate repeats the marketing line instead.',
        hi: 'Virtual DOM achhe se likhi gayi seedhi DOM manipulation se tez nahi hai — ye kaam badhata hai. Isse ye milta hai ki tum aise likh sakte ho jaise sab kuch dobara render kar rahe ho, aur phir bhi theek-thaak performance mile. Interviewers dekh lete hain jab candidate marketing wali line dohraata hai.',
      },
    },
    {
      heading: { en: 'The Shadow DOM', hi: 'Shadow DOM' },
      body: {
        en: 'A browser API that attaches a hidden, encapsulated subtree to an element. Styles inside do not leak out and outside styles do not leak in. It powers Web Components and native elements like the video player\'s controls — and React does not use it.',
        hi: 'Ek browser API jo kisi element se ek chhupa hua, alag subtree jodti hai. Andar ki styles bahar nahi jaatin aur bahar ki andar nahi aatin. Isi se Web Components aur video player ke controls jaise native elements bante hain — aur React isse use nahi karta.',
      },
      code: `const shadow = el.attachShadow({ mode: 'open' });
shadow.innerHTML = '<style>p{color:red}</style><p>scoped</p>';
// that style rule cannot affect any p outside this shadow root`,
    },
    {
      heading: { en: 'The one-line comparison', hi: 'Ek line ki tulna' },
      body: {
        en: 'Real DOM: what the browser renders. Virtual DOM: React\'s in-memory description used to work out minimal updates. Shadow DOM: browser-level style and markup encapsulation. Different layers, different problems, no relationship.',
        hi: 'Asli DOM: jo browser render karta hai. Virtual DOM: React ka memory wala varnan jisse sabse kam updates nikaale jaate hain. Shadow DOM: browser level pe style aur markup ka encapsulation. Alag layers, alag problems, koi rishta nahi.',
      },
    },
  ],

  'What are controlled and uncontrolled components?': [
    {
      heading: { en: 'Who owns the input value', hi: 'Input ki value kiski hai' },
      body: {
        en: 'In a controlled component React state is the single source of truth — the input displays state, and every keystroke goes through a handler. In an uncontrolled component the DOM node holds its own value and React reads it only when needed.',
        hi: 'Controlled component mein React state hi ek sach hai — input state dikhata hai, aur har keystroke handler se guzarta hai. Uncontrolled component mein DOM node apni value khud rakhta hai aur React zaroorat padne pe hi padhta hai.',
      },
      code: `// controlled
const [v, setV] = useState('');
<input value={v} onChange={(e) => setV(e.target.value)} />

// uncontrolled
const ref = useRef();
<input defaultValue="" ref={ref} />
// read it later: ref.current.value`,
    },
    {
      heading: { en: 'The data flow, drawn', hi: 'Data flow, khinch kar' },
      body: {
        en: 'The controlled loop is what makes React state authoritative: the DOM never holds a value React does not know about. In the uncontrolled case the two are independent until you read the ref.',
        hi: 'Controlled loop hi React state ko asli maalik banata hai: DOM kabhi aisi value nahi rakhta jiska React ko pata na ho. Uncontrolled mein dono alag rehte hain jab tak tum ref na padho.',
      },
      diagram: `CONTROLLED
  type → onChange → setState → re-render → value=state → input

UNCONTROLLED
  type → the DOM updates itself
  React reads ref.current.value only when it asks`,
    },
    {
      heading: { en: 'What controlled buys you', hi: 'Controlled se kya milta hai' },
      body: {
        en: 'Anything that needs the value as it changes: live validation, a disabled submit button, formatting as the user types, conditional fields, or two inputs kept in sync. None of that is possible without React knowing every keystroke.',
        hi: 'Har wo cheez jise badalti hui value chahiye: live validation, band submit button, type karte waqt formatting, shart wale fields, ya do inputs ko saath rakhna. React ko har keystroke pata na ho toh inme se kuch mumkin nahi.',
      },
      code: `<input value={email} onChange={(e) => setEmail(e.target.value)} />
{!email.includes('@') && <span>Invalid email</span>}
<button disabled={!email.includes('@')}>Submit</button>`,
    },
    {
      heading: { en: 'What uncontrolled buys you', hi: 'Uncontrolled se kya milta hai' },
      body: {
        en: 'No re-render per keystroke, less code for a simple form, and it is the only option for a file input, whose value is read-only for security reasons. It is also how you integrate a non-React widget that owns its own DOM.',
        hi: 'Har keystroke pe re-render nahi, simple form ke liye kam code, aur file input ke liye toh yahi ek option hai, jiski value security ki wajah se sirf-padhne wali hai. Aise hi tum koi non-React widget jodte ho jo apna DOM khud rakhta hai.',
      },
      code: `<input type="file" ref={fileRef} />   // must be uncontrolled`,
    },
    {
      heading: { en: 'The warning everyone sees once', hi: 'Wo warning jo sabko ek baar dikhti hai' },
      body: {
        en: 'Passing value={undefined} on the first render and a string later switches the input from uncontrolled to controlled, and React warns. The fix is to default the state to an empty string, never undefined or null.',
        hi: 'Pehle render pe value={undefined} dena aur baad mein string dena input ko uncontrolled se controlled bana deta hai, aur React chetavni deta hai. Ilaaj ye hai ki state ko khaali string se shuru karo, kabhi undefined ya null se nahi.',
      },
      code: `const [v, setV] = useState();       // ✗ undefined first
const [v, setV] = useState('');     // ✓
<input value={v ?? ''} />           // ✓ defensive`,
    },
    {
      heading: { en: 'React 19 makes uncontrolled forms viable again', hi: 'React 19 uncontrolled forms ko phir kaam ka bana deta hai' },
      body: {
        en: 'Form actions receive a FormData object, so a whole uncontrolled form can be submitted without a single piece of state. Combined with useActionState for pending and error handling, this is now the simplest way to write a plain form.',
        hi: 'Form actions ko FormData object milta hai, toh poora uncontrolled form bina ek bhi state ke submit ho sakta hai. Pending aur error ke liye useActionState ke saath, ab saada form likhne ka sabse simple tareeka yahi hai.',
      },
      code: `<form action={async (formData) => {
  await save({ email: formData.get('email') });
}}>
  <input name="email" />
</form>`,
    },
    {
      heading: { en: 'How to choose', hi: 'Kaise chunein' },
      body: {
        en: 'Controlled when you need the value during typing. Uncontrolled when you only need it on submit. For anything large, a form library like React Hook Form uses uncontrolled inputs under the hood precisely to avoid re-rendering the whole form on every keystroke.',
        hi: 'Jab type karte waqt value chahiye tab controlled. Jab sirf submit pe chahiye tab uncontrolled. Bade forms ke liye React Hook Form jaisi library andar se uncontrolled inputs hi use karti hai, khaas kar isliye ki har keystroke pe poora form re-render na ho.',
      },
    },
  ],

  'What are React hooks and what problem do they solve?': [
    {
      heading: { en: 'Functions that let a function component use React features', hi: 'Aise functions jo function component ko React ke features dete hain' },
      body: {
        en: 'A hook is a function starting with "use" that hooks into React\'s internals — state, lifecycle, context, refs. Before hooks, a function component could only take props and return JSX; anything stateful had to be a class.',
        hi: 'Hook ek "use" se shuru hone wala function hai jo React ke andar ke system se jodta hai — state, lifecycle, context, refs. Hooks se pehle function component sirf props le kar JSX de sakta tha; state wali koi bhi cheez class hi ho sakti thi.',
      },
      code: `useState      local state
useEffect     side effects and subscriptions
useContext    read a context
useRef        a mutable box that survives renders
useMemo       cache a computed value
useCallback   cache a function identity
useReducer    state with a reducer`,
    },
    {
      heading: { en: 'Problem one: sharing stateful logic', hi: 'Problem ek: stateful logic share karna' },
      body: {
        en: 'This was the real motivation. Two components needing the same subscription logic had no way to share it — you wrapped them in a HOC or a render prop, which nested the tree and obscured where props came from. A custom hook shares the logic without touching the tree.',
        hi: 'Asli wajah yahi thi. Do components ko same subscription logic chahiye toh usse share karne ka koi tareeka nahi tha — unhe HOC ya render prop mein lapetna padta tha, jisse tree gehra ho jaata tha aur props kahan se aaye ye chhup jaata tha. Custom hook logic share karta hai bina tree chhue.',
      },
      code: `// before
withRouter(withTheme(connect(mapState)(Component)))

// after
function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
}`,
    },
    {
      heading: { en: 'Problem two: lifecycle methods split concerns', hi: 'Problem do: lifecycle methods kaam ko baant dete the' },
      body: {
        en: 'One feature — a subscription — was spread across componentDidMount, componentDidUpdate and componentWillUnmount, while three unrelated features sat together inside each. useEffect groups by CONCERN instead of by timing.',
        hi: 'Ek feature — subscription — componentDidMount, componentDidUpdate aur componentWillUnmount mein bikhra hota tha, jabki teen alag features har ek ke andar saath baithe hote the. useEffect timing ke hisaab se nahi, KAAM ke hisaab se group karta hai.',
      },
      diagram: `class            hooks
didMount   ┐     useEffect (subscription)   ← one concern
didUpdate  ├─    useEffect (title)          ← another
willUnmount┘     useEffect (analytics)      ← another`,
    },
    {
      heading: { en: 'Problem three: this', hi: 'Problem teen: this' },
      body: {
        en: 'Classes required binding methods, understanding how this is decided at call time, and remembering that a detached method loses its receiver. Function components have no this at all, which removes the whole category.',
        hi: 'Classes mein methods bind karne padte the, samajhna padta tha ki this call ke waqt kaise tay hota hai, aur yaad rakhna padta tha ki alag hua method apna receiver kho deta hai. Function components mein this hota hi nahi, jisse ye poori shreni khatam ho jaati hai.',
      },
    },
    {
      heading: { en: 'They are matched by call order', hi: 'Ye call order se match hote hain' },
      body: {
        en: 'React stores hook state per component in a list and identifies each hook by its position, not its name. That is why hooks must be called at the top level, unconditionally, in the same order on every render.',
        hi: 'React har component ki hook state ek list mein rakhta hai aur har hook ko uski jagah se pehchaanta hai, naam se nahi. Isiliye hooks ko sabse upar, bina shart, har render pe usi kram mein call karna zaroori hai.',
      },
    },
    {
      heading: { en: 'What they did NOT change', hi: 'Inhone kya NAHI badla' },
      body: {
        en: 'Hooks are not a new rendering model and they do not make anything faster. Components still re-render the same way. They are a better way to express and reuse logic — nothing more, and that was enough.',
        hi: 'Hooks koi naya rendering model nahi hain aur na hi kuch tez karte hain. Components ab bhi waise hi re-render hote hain. Ye logic likhne aur dobara use karne ka behtar tareeka hain — bas itna, aur itna hi kaafi tha.',
      },
    },
  ],

  'What is JSX? What do Babel and Webpack do in a React project?': [
    {
      heading: { en: 'JSX is syntax sugar for function calls', hi: 'JSX function calls ki syntax sugar hai' },
      body: {
        en: 'JSX is an XML-like syntax extension that is not valid JavaScript. A compiler turns each element into a function call. Knowing that it compiles away — and to what — is the whole question.',
        hi: 'JSX ek XML-jaisa syntax extension hai jo valid JavaScript nahi hai. Compiler har element ko ek function call bana deta hai. Ye jaanna ki wo compile ho kar gaayab ho jaata hai — aur kis cheez mein — hi poora sawaal hai.',
      },
      code: `<h1 className="x">Hello</h1>

// compiles to (modern JSX transform):
jsx('h1', { className: 'x', children: 'Hello' })

// which evaluates to a plain object:
{ type: 'h1', props: { className: 'x', children: 'Hello' } }`,
    },
    {
      heading: { en: 'Why it looks slightly wrong', hi: 'Ye thoda galat kyun dikhta hai' },
      body: {
        en: 'Every JSX quirk follows from it being JavaScript. class is a reserved word so it becomes className; for becomes htmlFor; attributes are camelCase; braces embed an expression, not a statement; and a component must return one root, because a function returns one value.',
        hi: 'JSX ki har ajeeb baat isi se aati hai ki ye JavaScript hai. class reserved word hai isliye className; for se htmlFor; attributes camelCase; curly braces expression rakhte hain, statement nahi; aur component ko ek root dena hota hai, kyunki function ek value deta hai.',
      },
      code: `<div className="x" htmlFor="y" onClick={fn}>
  {cond ? <A /> : <B />}       {/* expression ✓ */}
  {if (cond) {}}               {/* statement ✗ */}
</div>`,
    },
    {
      heading: { en: 'Capitalisation decides component versus tag', hi: 'Bada akshar tay karta hai component ya tag' },
      body: {
        en: 'A lowercase name compiles to the string "div", which React treats as a DOM element. A capitalised name compiles to the variable itself. Forget the capital and React silently renders an unknown HTML tag.',
        hi: 'Chhote akshar wala naam "div" string mein compile hota hai, jise React DOM element maanta hai. Bade akshar wala naam khud variable mein compile hota hai. Bada akshar bhoolo toh React chup-chaap ek anjaan HTML tag render kar deta hai.',
      },
      code: `<button />   → jsx('button', …)   a DOM element
<Button />   → jsx(Button, …)     your component`,
    },
    {
      heading: { en: 'Babel: the transpiler', hi: 'Babel: transpiler' },
      body: {
        en: 'Babel turns code the browser cannot run into code it can. In a React project that means compiling JSX to function calls, and compiling modern syntax down to whatever your browser targets require. Since React 17 the automatic runtime imports jsx for you, so importing React is no longer needed.',
        hi: 'Babel us code ko badal deta hai jo browser nahi chala sakta. React project mein iska matlab hai JSX ko function calls mein compile karna, aur naye syntax ko tumhare browser targets ke hisaab se neeche laana. React 17 se automatic runtime khud jsx import karta hai, isliye React import karna ab zaroori nahi.',
      },
      code: `// no longer required since React 17
import React from 'react';`,
    },
    {
      heading: { en: 'Webpack: the bundler', hi: 'Webpack: bundler' },
      body: {
        en: 'Webpack builds a dependency graph from your entry file, runs each file through the right loader, and emits bundles the browser can load. It also does code splitting, tree shaking, minification and asset handling, and provides the dev server with hot module replacement.',
        hi: 'Webpack tumhari entry file se dependency graph banata hai, har file ko sahi loader se guzaarta hai, aur aise bundles nikaalta hai jo browser load kar sake. Ye code splitting, tree shaking, minification aur assets bhi sambhaalta hai, aur hot module replacement wala dev server deta hai.',
      },
      diagram: `entry.jsx
  ├ imports App.jsx  → babel-loader → JS
  ├ imports app.css  → css-loader   → CSS
  └ imports logo.svg → asset module → file

           ▼
     bundle.js + bundle.css`,
    },
    {
      heading: { en: 'They do different jobs', hi: 'Dono ka kaam alag hai' },
      body: {
        en: 'Babel transforms ONE file at a time and knows nothing about imports. Webpack understands the graph but cannot transform syntax. Webpack calls Babel through babel-loader — that is the relationship, and it is what the question is checking.',
        hi: 'Babel EK time pe ek file badalta hai aur imports ke baare mein kuch nahi jaanta. Webpack graph samajhta hai par syntax nahi badal sakta. Webpack babel-loader se Babel ko bulata hai — yahi rishta hai, aur sawaal yahi jaanch raha hai.',
      },
    },
    {
      heading: { en: 'What people actually use now', hi: 'Log ab asal mein kya use karte hain' },
      body: {
        en: 'Vite for most new apps, using esbuild in development and Rollup for the build; Next.js with Turbopack for full-stack. These replace the Babel-plus-Webpack pair with faster native-code tooling. Saying so shows the answer is current.',
        hi: 'Zyadatar naye apps mein Vite, jo development mein esbuild aur build ke liye Rollup use karta hai; full-stack ke liye Next.js with Turbopack. Ye Babel-aur-Webpack ki jodi ki jagah tez native-code tooling laate hain. Ye kehna dikhata hai ki jawab aaj ka hai.',
      },
    },
  ],

  /* ─── Redux and state management ──────────────────────────── */

  'What is Redux and when should you use it?': [
    {
      heading: { en: 'One store, read-only state, pure reducers', hi: 'Ek store, sirf-padhne wali state, pure reducers' },
      body: {
        en: 'Redux keeps all shared state in a single store. You never mutate it — you dispatch a plain action object describing what happened, and a pure reducer computes the next state from the previous one. Those three rules are the whole model.',
        hi: 'Redux saari shared state ek hi store mein rakhta hai. Tum usse kabhi mutate nahi karte — tum ek saada action object dispatch karte ho jo batata hai kya hua, aur ek pure reducer purani state se agli state banata hai. Yahi teen rules poora model hain.',
      },
      diagram: `UI ──dispatch(action)──► store ──► reducer(state, action)
 ▲                                          │
 └──────────── new state ◄──────────────────┘`,
    },
    {
      heading: { en: 'Why it existed', hi: 'Ye tha kyun' },
      body: {
        en: 'In 2015 React had no Context worth using and no hooks. Sharing state across a deep tree meant prop drilling or an ad-hoc event bus. Redux gave a predictable, inspectable answer — and the time-travelling DevTools were genuinely new.',
        hi: '2015 mein React ke paas kaam ka Context nahi tha aur hooks bhi nahi. Gehre tree mein state share karne ka matlab prop drilling ya koi jugaadu event bus tha. Redux ne ek andaaze laayak, dekhne laayak jawab diya — aur time-travelling DevTools sach mein nayi cheez thi.',
      },
    },
    {
      heading: { en: 'Redux Toolkit is the modern answer', hi: 'Modern jawab Redux Toolkit hai' },
      body: {
        en: 'If you say "Redux" and describe switch statements and spread operators, you sound five years out of date. RTK is the official recommendation: createSlice generates actions and reducers together, and Immer lets you write mutating code that produces immutable updates.',
        hi: 'Agar tum "Redux" kaho aur switch statements aur spread operators bataao, toh tum paanch saal purane lagoge. RTK official salaah hai: createSlice actions aur reducers saath banata hai, aur Immer tumhe mutate karne wala code likhne deta hai jo immutable updates banata hai.',
      },
      code: `const slice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    add(state, action) { state.push(action.payload); },  // looks mutable
  },                                                      // Immer makes it not
});
export const { add } = slice.actions;`,
    },
    {
      heading: { en: 'When you genuinely need it', hi: 'Iski sach mein zaroorat kab hai' },
      body: {
        en: 'Large client state shared across many distant parts of the app; complex update logic where several actions touch the same data; a real need to trace, log, replay or undo every change; or a big team that benefits from one enforced pattern.',
        hi: 'Badi client state jo app ke kai door-door ke hisson mein share ho; uljhi hui update logic jahan kai actions ek hi data ko chhuein; har badlaav ko trace, log, replay ya undo karne ki asli zaroorat; ya badi team jise ek lagoo pattern se fayda ho.',
      },
    },
    {
      heading: { en: 'When you almost certainly do not', hi: 'Jab lagbhag pakka zaroorat nahi hai' },
      body: {
        en: 'This is the half interviewers are listening for. Most of what people put in Redux is SERVER state — fetched data with loading and error flags. That belongs in TanStack Query or RTK Query, which handle caching, deduplication and revalidation for free. Form state belongs in the form. Theme and locale belong in Context.',
        hi: 'Interviewers isi aadhe hisse ko sunte hain. Log Redux mein jo daalte hain uska zyadatar SERVER state hai — fetch kiya data, loading aur error flags ke saath. Wo TanStack Query ya RTK Query mein jaata hai, jo caching, deduplication aur revalidation muft mein karte hain. Form state form mein rehni chahiye. Theme aur locale Context mein.',
      },
      code: `// ✗ hand-rolled server state in Redux
{ users: [], loading: false, error: null }

// ✓ let the cache own it
const { data, isLoading, error } = useQuery({ queryKey: ['users'], queryFn });`,
    },
    {
      heading: { en: 'The alternatives worth naming', hi: 'Naam lene laayak vikalp' },
      body: {
        en: 'Zustand for a small store with selector subscriptions and no boilerplate. Jotai for atomic, bottom-up state. Context plus useReducer when the state is small and rarely changes. Naming these shows you chose Redux rather than defaulted to it.',
        hi: 'Chhote store ke liye Zustand, selector subscriptions ke saath aur bina boilerplate. Atomic, neeche-se-upar state ke liye Jotai. Jab state chhoti ho aur kam badle tab Context plus useReducer. Inka naam lena dikhata hai ki tumne Redux chuna, default nahi maana.',
      },
    },
    {
      heading: { en: 'The answer to give', hi: 'Dene laayak jawab' },
      body: {
        en: '"Redux is a predictable store for client state — one store, actions in, pure reducers out. I would use Redux Toolkit, and only when a lot of complex client state is shared widely. Server data I would put in a query cache instead, and small shared values in Context."',
        hi: '"Redux client state ke liye ek andaaze laayak store hai — ek store, andar actions, bahar pure reducers. Main Redux Toolkit use karunga, aur tabhi jab bahut saari uljhi client state door-door tak share ho rahi ho. Server data main query cache mein rakhunga, aur chhoti shared values Context mein."',
      },
    },
  ],

  'What are reducer, action, and store in Redux?': [
    {
      heading: { en: 'Three parts, one cycle', hi: 'Teen hisse, ek chakkar' },
      body: {
        en: 'An action describes WHAT happened. A reducer decides HOW state changes because of it. The store holds the state and runs the cycle. Say them in that order and the relationship is obvious.',
        hi: 'Action batata hai KYA hua. Reducer tay karta hai uski wajah se state KAISE badlegi. Store state rakhta hai aur chakkar chalata hai. Isi kram mein bolo toh rishta saaf ho jaata hai.',
      },
      diagram: `dispatch(action) ─► store ─► reducer(prevState, action) ─► newState
                     ▲                                          │
                     └──── subscribers notified ◄───────────────┘`,
    },
    {
      heading: { en: 'Action — a plain object with a type', hi: 'Action — type wala ek saada object' },
      body: {
        en: 'It must be a serialisable plain object and it must have a type. Any data it carries goes in payload by convention. An action is a fact about the past, not a command — name it "todoAdded", not "addTodo", and the log reads like a history.',
        hi: 'Ye ek serialisable saada object hona chahiye aur usme type hona chahiye. Jo bhi data ho wo riwaaj ke mutabik payload mein jaata hai. Action ateet ka ek tathya hai, hukum nahi — usse "todoAdded" naam do, "addTodo" nahi, aur log ek itihaas jaisa padha jaayega.',
      },
      code: `{ type: 'todos/added', payload: { id: 1, text: 'Learn Redux' } }

// RTK generates the creator for you:
add({ id: 1, text: 'Learn Redux' });`,
    },
    {
      heading: { en: 'Reducer — a pure function (state, action) → state', hi: 'Reducer — ek pure function (state, action) → state' },
      body: {
        en: 'Given the same inputs it must always return the same output, with no side effects. No API calls, no Math.random, no Date.now, no mutation. Purity is what makes time-travel debugging, replay and testing possible.',
        hi: 'Wahi inputs pe hamesha wahi output dena chahiye, bina kisi side effect ke. Na API calls, na Math.random, na Date.now, na mutation. Purity hi time-travel debugging, replay aur testing ko mumkin banati hai.',
      },
      code: `function todos(state = [], action) {
  switch (action.type) {
    case 'todos/added': return [...state, action.payload];
    default: return state;              // ✓ always return something
  }
}`,
    },
    {
      heading: { en: 'Store — the object that ties it together', hi: 'Store — wo object jo sabko jodta hai' },
      body: {
        en: 'The store holds state, exposes getState, accepts dispatch, and notifies subscribers when state changes. There is exactly one per app, and its state tree is built by combining reducers.',
        hi: 'Store state rakhta hai, getState deta hai, dispatch leta hai, aur state badalne pe subscribers ko batata hai. Har app mein bilkul ek hota hai, aur uska state tree reducers ko jod kar banta hai.',
      },
      code: `const store = configureStore({
  reducer: { todos: todosReducer, user: userReducer },
});
store.getState();          // { todos: [...], user: {...} }
store.dispatch(add(todo));`,
    },
    {
      heading: { en: 'Immutability is not optional', hi: 'Immutability optional nahi hai' },
      body: {
        en: 'Redux compares state by reference to decide what changed. Mutating means the reference stays the same, so no component re-renders even though the data is different. This is the number one Redux bug.',
        hi: 'Redux state ko reference se compare karke tay karta hai kya badla. Mutate karo toh reference wahi rehta hai, toh koi component re-render nahi hota jabki data alag hai. Redux ka sabse bada bug yahi hai.',
      },
      code: `state.todos.push(t);            // ✗ same reference — no re-render
return { ...state, todos: [...state.todos, t] };   // ✓

// RTK + Immer lets you write the first form safely:
add(state, action) { state.push(action.payload); }   // ✓`,
    },
    {
      heading: { en: 'How components connect', hi: 'Components kaise judte hain' },
      body: {
        en: 'useSelector reads a slice and subscribes to it — the component re-renders only when that slice changes. useDispatch gives you the dispatch function. Keep selectors narrow, and memoise any that build a new object, or you re-render on every store change.',
        hi: 'useSelector ek hissa padhta hai aur usse subscribe karta hai — component tabhi re-render hota hai jab wo hissa badle. useDispatch dispatch function deta hai. Selectors tang rakho, aur jo bhi naya object banaye usse memoise karo, warna har store badlaav pe re-render hoga.',
      },
      code: `const count = useSelector((s) => s.todos.length);   // ✓ a primitive
const list  = useSelector((s) => s.todos.filter(f)); // ✗ new array each time`,
    },
  ],

  'What is middleware in Redux? What does Redux Thunk do?': [
    {
      heading: { en: 'Code that sits between dispatch and the reducer', hi: 'Dispatch aur reducer ke beech ka code' },
      body: {
        en: 'Middleware intercepts every dispatched action before it reaches the reducer. It can log it, modify it, delay it, swallow it, or dispatch others. Reducers must stay pure, so middleware is where everything impure lives.',
        hi: 'Middleware har dispatch hue action ko reducer tak pahunchne se pehle pakad leta hai. Wo usse log kar sakta hai, badal sakta hai, rok sakta hai, gira sakta hai, ya aur dispatch kar sakta hai. Reducers pure rehne chahiye, isliye har impure cheez middleware mein rehti hai.',
      },
      diagram: `dispatch(action)
   │
   ▼
[ logger ] → [ thunk ] → [ analytics ] → reducer → new state`,
    },
    {
      heading: { en: 'The curried signature', hi: 'Curried signature' },
      body: {
        en: 'Middleware is three nested functions: store, then next, then action. Calling next passes it along the chain; not calling next stops it dead. Being able to write this from memory is a common ask.',
        hi: 'Middleware teen nested functions hai: store, phir next, phir action. next bulao toh wo chain mein aage jaata hai; na bulao toh wahin ruk jaata hai. Ise yaad se likh paana aksar poochha jaata hai.',
      },
      code: `const logger = (store) => (next) => (action) => {
  console.log('dispatching', action);
  const result = next(action);      // pass it on
  console.log('next state', store.getState());
  return result;
};`,
    },
    {
      heading: { en: 'The problem thunk solves', hi: 'Thunk kaunsi problem hal karta hai' },
      body: {
        en: 'By default dispatch accepts only plain objects. But an API call needs to dispatch a loading action, wait, then dispatch success or failure — and reducers cannot do async work. Something has to handle that, and thunk is the smallest possible answer.',
        hi: 'Default se dispatch sirf saade objects leta hai. Par API call ko loading action dispatch karna, intezaar karna, phir success ya failure dispatch karna hota hai — aur reducers async kaam nahi kar sakte. Isse koi na koi sambhaale, aur thunk sabse chhota mumkin jawab hai.',
      },
    },
    {
      heading: { en: 'What thunk actually is', hi: 'Thunk asal mein hai kya' },
      body: {
        en: 'About ten lines. If the dispatched value is a function rather than an object, thunk calls it with dispatch and getState instead of passing it to the reducer. That is the entire library.',
        hi: 'Lagbhag das line. Agar dispatch ki gayi cheez object nahi function hai, toh thunk usse reducer ko dene ki jagah dispatch aur getState ke saath bula deta hai. Poori library bas itni hai.',
      },
      code: `const thunk = ({ dispatch, getState }) => (next) => (action) =>
  typeof action === 'function'
    ? action(dispatch, getState)     // it is a thunk — run it
    : next(action);                  // it is a plain action — pass on`,
    },
    {
      heading: { en: 'Writing one', hi: 'Ek likhna' },
      body: {
        en: 'A thunk is a function that returns a function. The inner one receives dispatch and getState, so it can read current state, await anything, and dispatch as many actions as it needs.',
        hi: 'Thunk ek aisa function hai jo function return karta hai. Andar wale ko dispatch aur getState milte hain, toh wo maujooda state padh sakta hai, kuch bhi await kar sakta hai, aur jitne chaahe actions dispatch kar sakta hai.',
      },
      code: `const fetchUser = (id) => async (dispatch, getState) => {
  if (getState().users[id]) return;        // already cached
  dispatch({ type: 'users/loading' });
  try {
    const data = await api.get(id);
    dispatch({ type: 'users/loaded', payload: data });
  } catch (e) {
    dispatch({ type: 'users/failed', error: e.message });
  }
};

dispatch(fetchUser(1));`,
    },
    {
      heading: { en: 'RTK includes it, and improves on it', hi: 'RTK isse deta bhi hai aur behtar bhi karta hai' },
      body: {
        en: 'configureStore adds thunk by default, so there is nothing to install. createAsyncThunk goes further and generates the pending, fulfilled and rejected actions for you — which is what you should actually reach for.',
        hi: 'configureStore thunk default se jodta hai, toh kuch install nahi karna. createAsyncThunk aur aage jaata hai aur pending, fulfilled aur rejected actions khud bana deta hai — aur asal mein yahi uthana chahiye.',
      },
      code: `const fetchUser = createAsyncThunk('users/fetch', (id) => api.get(id));
// gives you users/fetch/pending, /fulfilled and /rejected`,
    },
    {
      heading: { en: 'Other middleware you will meet', hi: 'Aur kaunse middleware milenge' },
      body: {
        en: 'redux-logger for development, redux-persist for saving state to storage, RTK\'s serializability and immutability check middleware which catch two whole classes of bug in development, and redux-saga for complex flows.',
        hi: 'Development ke liye redux-logger, state ko storage mein rakhne ke liye redux-persist, RTK ke serializability aur immutability check middleware jo development mein bugs ki do poori shreniyan pakadte hain, aur uljhe flows ke liye redux-saga.',
      },
    },
  ],

  'What is Redux Saga and how does it differ from Redux Thunk?': [
    {
      heading: { en: 'Both handle side effects, very differently', hi: 'Dono side effects sambhaalte hain, bilkul alag tareeke se' },
      body: {
        en: 'Thunk lets you dispatch a function that just does the work. Saga runs long-lived generator functions that WATCH for actions and describe effects as plain objects, which the middleware then performs.',
        hi: 'Thunk tumhe aisa function dispatch karne deta hai jo bas kaam kar deta hai. Saga lambi umar wale generator functions chalata hai jo actions pe NAZAR rakhte hain aur effects ko saade objects ki tarah batate hain, jinhe middleware phir chalata hai.',
      },
      code: `// thunk — perform the effect yourself
const load = (id) => async (dispatch) => {
  const data = await api.get(id);
  dispatch({ type: 'loaded', payload: data });
};

// saga — describe the effect, let the middleware run it
function* load(action) {
  const data = yield call(api.get, action.payload);
  yield put({ type: 'loaded', payload: data });
}`,
    },
    {
      heading: { en: 'The key idea: yield a description, not a promise', hi: 'Asli idea: promise nahi, ek varnan yield karo' },
      body: {
        en: 'call(api.get, id) does not call anything — it returns a plain object saying "call this function with this argument". The middleware performs it. That indirection is what makes sagas testable without mocking anything.',
        hi: 'call(api.get, id) kuch bulaata nahi — ye ek saada object deta hai jo kehta hai "is function ko is argument ke saath bulao". Middleware usse chalata hai. Yahi indirection sagas ko bina kuch mock kiye testable banata hai.',
      },
      code: `const gen = load({ payload: 1 });
gen.next().value;    // { CALL: { fn: api.get, args: [1] } }
// assert on that object — no network, no mocks`,
    },
    {
      heading: { en: 'Watchers and workers', hi: 'Watchers aur workers' },
      body: {
        en: 'The standard shape is a watcher saga that listens for an action type and spawns a worker saga to handle it. takeEvery runs one worker per action; takeLatest cancels the previous worker, which gives you debounced search for free.',
        hi: 'Standard dhaancha ye hai ki ek watcher saga kisi action type ko sunta hai aur usse sambhalne ke liye worker saga chalata hai. takeEvery har action pe ek worker chalata hai; takeLatest pichhla worker cancel kar deta hai, jisse debounced search muft mein mil jaata hai.',
      },
      code: `function* watch() {
  yield takeLatest('search/requested', doSearch);
  // an in-flight search is cancelled when a new one arrives
}`,
    },
    {
      heading: { en: 'What saga can do that thunk cannot', hi: 'Saga kya kar sakta hai jo thunk nahi' },
      body: {
        en: 'Real cancellation, because a generator can be aborted mid-flight. Racing two effects. Debouncing and throttling declaratively. Waiting for one action while another runs. And complex coordinated sequences — which is why it survives in large apps despite the learning curve.',
        hi: 'Asli cancellation, kyunki generator ko beech mein rok sakte hain. Do effects ke beech race. Debounce aur throttle saaf-saaf. Ek action ka intezaar karte hue doosra chalana. Aur uljhe hue talmel wale sequences — isiliye seekhne ki mehnat ke bawajood ye bade apps mein tikta hai.',
      },
      code: `const { data, timeout } = yield race({
  data: call(api.get, id),
  timeout: delay(5000),
});

yield takeLatest('input/changed', function* (a) {
  yield delay(300);          // debounce, declaratively
  yield call(search, a.payload);
});`,
    },
    {
      heading: { en: 'The cost', hi: 'Keemat' },
      body: {
        en: 'A whole vocabulary to learn — call, put, take, fork, select, race, all. Much more boilerplate for simple cases. Stack traces through generators are harder to read. For a straightforward fetch, thunk is a tenth of the code.',
        hi: 'Poori ek shabdaawali seekhni padti hai — call, put, take, fork, select, race, all. Simple cases mein bahut zyada boilerplate. Generators ke stack traces padhna mushkil. Ek seedhe fetch ke liye thunk daswaan hissa code hai.',
      },
    },
    {
      heading: { en: 'What to say when asked to choose', hi: 'Chunne ko kaha jaaye toh kya kahein' },
      body: {
        en: '"Thunk for almost everything — it is included in Redux Toolkit and a simple fetch is a few lines. Saga when I need cancellation, racing, or complex coordinated flows. And for plain server data I would use RTK Query and not write either."',
        hi: '"Lagbhag har cheez ke liye thunk — wo Redux Toolkit mein pehle se hai aur ek simple fetch kuch hi lines hai. Saga tab jab cancellation, racing ya uljhe talmel wale flows chahiye. Aur saade server data ke liye main RTK Query use karunga aur dono mein se kuch nahi likhunga."',
      },
    },
  ],

  /* ─── Effects, lifecycle and refs ─────────────────────────── */

  'How do you implement componentWillUnmount in a function component?': [
    {
      heading: { en: 'Return a cleanup function from useEffect', hi: 'useEffect se ek cleanup function return karo' },
      body: {
        en: 'Whatever you return from an effect is its cleanup. With an empty dependency array it runs once when the component unmounts, which is the direct equivalent of componentWillUnmount.',
        hi: 'Effect se jo bhi return karo wahi uska cleanup hai. Khaali dependency array ke saath wo component unmount hone pe ek baar chalta hai, jo componentWillUnmount ka seedha joda hai.',
      },
      code: `useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);     // ← componentWillUnmount
}, []);`,
    },
    {
      heading: { en: 'But it is not only unmount', hi: 'Par ye sirf unmount nahi hai' },
      body: {
        en: 'This is the important difference. Cleanup runs before EVERY re-run of the effect, not just at unmount. With dependencies, React tears down the old effect before setting up the new one — so cleanup is really "undo the previous setup".',
        hi: 'Yahi asli farq hai. Cleanup effect ke HAR dobara chalne se pehle chalta hai, sirf unmount pe nahi. Dependencies ke saath React purana effect hataata hai phir naya lagata hai — toh cleanup asal mein "pichhla setup wapas lo" hai.',
      },
      diagram: `deps [id], id changes 1 → 2

setup(1) ─► cleanup(1) ─► setup(2) ─► … ─► cleanup(2) on unmount`,
    },
    {
      heading: { en: 'Which is why it is a better design', hi: 'Isiliye ye behtar design hai' },
      body: {
        en: 'A class split one concern across didMount, didUpdate and willUnmount, and forgetting to re-subscribe in didUpdate was a classic bug. An effect keeps setup and teardown adjacent, so they cannot drift apart.',
        hi: 'Class ek hi kaam ko didMount, didUpdate aur willUnmount mein baant deti thi, aur didUpdate mein dobara subscribe karna bhool jaana classic bug tha. Effect setup aur teardown ko saath rakhta hai, toh wo alag ho hi nahi sakte.',
      },
      code: `useEffect(() => {
  const sub = api.subscribe(id);
  return () => sub.unsubscribe();
}, [id]);         // handles mount, every id change, and unmount`,
    },
    {
      heading: { en: 'The cleanup closes over the right values', hi: 'Cleanup sahi values pakadta hai' },
      body: {
        en: 'Each cleanup captures the props and state from the render that created its effect — not the current ones. That is exactly what you want: you are undoing what THAT setup did.',
        hi: 'Har cleanup us render ke props aur state pakadta hai jisne uska effect banaya — maujooda nahi. Aur yahi chahiye: tum wahi undo kar rahe ho jo US setup ne kiya tha.',
      },
    },
    {
      heading: { en: 'The four things to always clean up', hi: 'Chaar cheezein jinka cleanup hamesha' },
      body: {
        en: 'Timers, event listeners, subscriptions, and in-flight requests. Forget any of them and you get a memory leak, or a state update on an unmounted component, or a stale response overwriting a newer one.',
        hi: 'Timers, event listeners, subscriptions, aur chal rahi requests. Inme se koi bhool jao toh memory leak milega, ya unmounted component pe state update, ya purana response naye ko dhak dega.',
      },
      code: `useEffect(() => {
  const c = new AbortController();
  fetch(url, { signal: c.signal }).then(setData).catch(ignoreAbort);
  return () => c.abort();          // ✓ cancels a stale request
}, [url]);`,
    },
    {
      heading: { en: 'StrictMode is testing exactly this', hi: 'StrictMode yahi jaanch raha hai' },
      body: {
        en: 'In development StrictMode runs setup, cleanup, setup on mount. If your app breaks under that, your cleanup is missing or incomplete. Do not silence it with a ran-once ref — write the cleanup.',
        hi: 'Development mein StrictMode mount pe setup, cleanup, setup chalata hai. Isse app toote toh tumhara cleanup gayab ya adhoora hai. Isse ran-once ref se chhupao mat — cleanup likho.',
      },
    },
  ],

  'Explain useEffect, useState, useMemo, and useCallback in detail.': [
    {
      heading: { en: 'Two are about state, two are about caching', hi: 'Do state ke baare mein hain, do caching ke' },
      body: {
        en: 'Group them before explaining. useState holds a value that triggers a re-render; useEffect synchronises with something outside React. useMemo caches a computed value; useCallback caches a function identity. The second pair is optimisation only.',
        hi: 'Samjhane se pehle inhe group karo. useState ek value rakhta hai jo re-render karwaati hai; useEffect React ke bahar ki kisi cheez se taal-mel bithaata hai. useMemo bani hui value cache karta hai; useCallback function ki pehchaan. Doosri jodi sirf optimisation hai.',
      },
      diagram: `useState     hold a value, re-render on change
useEffect    sync with something outside React
useMemo      cache a VALUE between renders
useCallback  cache a FUNCTION between renders`,
    },
    {
      heading: { en: 'useState — a value plus a setter', hi: 'useState — ek value aur ek setter' },
      body: {
        en: 'Returns the current value and a setter. The value is a snapshot for the whole render, so reading it right after setting gives the old one. Use the updater form when the next value depends on the previous, and pass a function to useState when the initial value is expensive.',
        hi: 'Maujooda value aur ek setter deta hai. Value poore render ke liye ek snapshot hai, toh set karne ke turant baad padho toh purani milti hai. Jab agli value pichhli pe depend kare tab updater form lo, aur jab shuruaati value mehngi ho tab useState ko function do.',
      },
      code: `const [n, setN] = useState(0);
setN(n + 1); setN(n + 1);        // ✗ ends at +1
setN((p) => p + 1); setN((p) => p + 1);   // ✓ +2

useState(expensive());           // ✗ runs every render
useState(() => expensive());     // ✓ lazy — runs once`,
    },
    {
      heading: { en: 'useEffect — synchronise, do not "run on mount"', hi: 'useEffect — taal-mel bithao, "mount pe chalao" nahi' },
      body: {
        en: 'The right mental model is synchronisation with an external system, not a lifecycle hook. It runs after paint; the dependency array says what it depends on; the returned function undoes it. Empty deps means mount and unmount, no deps means every render.',
        hi: 'Sahi mental model hai kisi bahari system se taal-mel, lifecycle hook nahi. Ye paint ke baad chalta hai; dependency array batata hai kis pe depend karta hai; return kiya function usse wapas leta hai. Khaali deps matlab mount aur unmount, bina deps matlab har render.',
      },
      code: `useEffect(fn);            // after every render
useEffect(fn, []);        // once, on mount
useEffect(fn, [id]);      // whenever id changes
useEffect(() => { …; return cleanup; }, [id]);`,
    },
    {
      heading: { en: 'And most effects should not exist', hi: 'Aur zyadatar effects hone hi nahi chahiye' },
      body: {
        en: 'Say this — it is what separates a good answer. If you can compute a value during render, do not put it in state and sync it with an effect. If something should happen because a user did something, put it in the event handler.',
        hi: 'Ye kaho — achha jawab isi se alag hota hai. Agar koi value render ke dauraan nikaal sakte ho, toh usse state mein daal kar effect se sync mat karo. Agar kuch isliye hona chahiye ki user ne kuch kiya, toh usse event handler mein rakho.',
      },
      code: `// ✗ derived state via an effect
useEffect(() => setFull(first + ' ' + last), [first, last]);

// ✓ just compute it
const full = first + ' ' + last;`,
    },
    {
      heading: { en: 'useMemo — cache an expensive computation', hi: 'useMemo — mehngi computation cache karo' },
      body: {
        en: 'Runs the function only when the dependencies change and returns the cached value otherwise. Use it for genuinely costly work, or to keep an object or array reference stable so a memoised child does not re-render.',
        hi: 'Function tabhi chalta hai jab dependencies badlein, warna cache ki hui value milti hai. Isse sach mein mehnge kaam ke liye lo, ya kisi object ya array ka reference sthir rakhne ke liye taaki memoised bachcha re-render na ho.',
      },
      code: `const sorted = useMemo(() => rows.sort(cmp), [rows]);
const style = useMemo(() => ({ color }), [color]);   // stable reference`,
    },
    {
      heading: { en: 'useCallback — the same thing for functions', hi: 'useCallback — functions ke liye wahi cheez' },
      body: {
        en: 'useCallback(fn, deps) is exactly useMemo(() => fn, deps). It exists because a function literal is a new reference every render, which breaks React.memo on a child and re-triggers any effect that lists it as a dependency.',
        hi: 'useCallback(fn, deps) bilkul useMemo(() => fn, deps) hai. Ye isliye hai kyunki function literal har render pe naya reference hai, jo bachche pe React.memo tod deta hai aur us effect ko dobara chala deta hai jo usse dependency maanta hai.',
      },
      code: `const onSave = useCallback(() => save(id), [id]);
<MemoChild onSave={onSave} />     // now memo actually works`,
    },
    {
      heading: { en: 'Neither is free', hi: 'Dono muft nahi hain' },
      body: {
        en: 'Both allocate, store the dependency array and compare it every render. Wrapping a cheap computation costs more than it saves. And useCallback on a prop passed to a non-memoised child does nothing at all.',
        hi: 'Dono memory lete hain, dependency array rakhte hain aur har render pe compare karte hain. Saste computation ko lapetna bachaane se zyada kharch karta hai. Aur jo prop bina memo wale bachche ko jaa raha ho uspe useCallback kuch nahi karta.',
      },
    },
    {
      heading: { en: 'The React Compiler removes the last two', hi: 'React Compiler aakhri do hata deta hai' },
      body: {
        en: 'It inserts memoisation automatically at build time, so in a compiler-enabled codebase you write neither useMemo nor useCallback. Mentioning this shows the answer is current rather than three years old.',
        hi: 'Wo build ke waqt apne aap memoisation daal deta hai, toh compiler wale codebase mein na useMemo likhna padta hai na useCallback. Iska zikr dikhata hai ki jawab aaj ka hai, teen saal purana nahi.',
      },
    },
  ],

  'What are React lifecycle methods?': [
    {
      heading: { en: 'Three phases: mount, update, unmount', hi: 'Teen phases: mount, update, unmount' },
      body: {
        en: 'Lifecycle methods are class-component hooks into those three phases. Function components have no lifecycle methods at all — they express the same thing with useEffect — but you are still expected to know the names.',
        hi: 'Lifecycle methods class components ke wo hooks hain jo in teen phases mein lagte hain. Function components mein lifecycle methods hote hi nahi — wo wahi cheez useEffect se kehte hain — par naam pata hone ki ummeed abhi bhi ki jaati hai.',
      },
      diagram: `MOUNT      constructor → getDerivedStateFromProps → render
                      → componentDidMount

UPDATE     getDerivedStateFromProps → shouldComponentUpdate
                      → render → getSnapshotBeforeUpdate
                      → componentDidUpdate

UNMOUNT    componentWillUnmount`,
    },
    {
      heading: { en: 'The three you actually use', hi: 'Wo teen jo asal mein use hote hain' },
      body: {
        en: 'componentDidMount for setup after the first render — fetching, subscriptions, measuring the DOM. componentDidUpdate to react to changed props or state. componentWillUnmount to tear everything down.',
        hi: 'Pehle render ke baad setup ke liye componentDidMount — fetching, subscriptions, DOM naapna. Badle hue props ya state pe react karne ke liye componentDidUpdate. Sab kuch hataane ke liye componentWillUnmount.',
      },
      code: `componentDidMount() { this.sub = api.subscribe(this.props.id); }

componentDidUpdate(prevProps) {
  if (prevProps.id !== this.props.id) {     // ✗ forget this and you
    this.sub.unsubscribe();                 //   loop forever
    this.sub = api.subscribe(this.props.id);
  }
}

componentWillUnmount() { this.sub.unsubscribe(); }`,
    },
    {
      heading: { en: 'The hooks equivalent is one block', hi: 'Hooks wala joda ek hi block hai' },
      body: {
        en: 'All three collapse into a single useEffect. The dependency array replaces the manual prevProps comparison, and the returned cleanup covers both the re-subscribe and the unmount. This is the comparison to draw.',
        hi: 'Teeno ek hi useEffect mein simat jaate hain. Dependency array haath se kiya gaya prevProps comparison hata deta hai, aur return kiya cleanup dobara subscribe aur unmount dono sambhaal leta hai. Yahi tulna khinchni hai.',
      },
      code: `useEffect(() => {
  const sub = api.subscribe(id);
  return () => sub.unsubscribe();
}, [id]);         // all three class methods, correctly, in five lines`,
    },
    {
      heading: { en: 'shouldComponentUpdate and PureComponent', hi: 'shouldComponentUpdate aur PureComponent' },
      body: {
        en: 'Return false to skip a re-render. PureComponent implements it as a shallow prop and state comparison. React.memo is the function-component equivalent, and it does the same shallow check.',
        hi: 'false return karo toh re-render chhoot jaata hai. PureComponent isse props aur state ke shallow comparison ke roop mein banata hai. React.memo function component ka joda hai, aur wahi shallow check karta hai.',
      },
    },
    {
      heading: { en: 'The deprecated ones and why', hi: 'Deprecated wale aur kyun' },
      body: {
        en: 'componentWillMount, componentWillReceiveProps and componentWillUpdate are all prefixed UNSAFE_ now. Concurrent rendering can start a render, abandon it and start again — so anything with a side effect in those methods would run more than once.',
        hi: 'componentWillMount, componentWillReceiveProps aur componentWillUpdate — sab ab UNSAFE_ prefix ke saath hain. Concurrent rendering ek render shuru karke chhod sakta hai aur dobara shuru kar sakta hai — toh in methods mein koi bhi side effect ek se zyada baar chalta.',
      },
    },
    {
      heading: { en: 'The two that still have no hook', hi: 'Wo do jinka abhi bhi hook nahi hai' },
      body: {
        en: 'componentDidCatch and getDerivedStateFromError. Error boundaries must still be class components — or you use react-error-boundary, which wraps one for you. This is the follow-up worth pre-empting.',
        hi: 'componentDidCatch aur getDerivedStateFromError. Error boundaries ab bhi class components hi honi chahiye — ya react-error-boundary use karo, jo tumhare liye ek lapet deta hai. Ye follow-up pehle se bata dena samajhdaari hai.',
      },
    },
  ],

  'What is the difference between export default and named export in React?': [
    {
      heading: { en: 'One per file versus many', hi: 'Ek per file vs kai' },
      body: {
        en: 'A module can have at most one default export and any number of named exports. A default is imported without braces and under any name; a named export is imported with braces and must match the exported name.',
        hi: 'Ek module mein zyada se zyada ek default export aur jitne chaahe named exports ho sakte hain. Default bina braces ke aur kisi bhi naam se import hota hai; named export braces ke saath aur export wale naam se hi.',
      },
      code: `// Button.jsx
export default function Button() {}
export function IconButton() {}
export const SIZES = ['sm', 'lg'];

// consumer
import Button, { IconButton, SIZES } from './Button';
import Btn from './Button';        // ✓ any name for the default`,
    },
    {
      heading: { en: 'Why named exports are usually preferred', hi: 'Named exports aam taur pe behtar kyun maane jaate hain' },
      body: {
        en: 'Three concrete reasons. Autocomplete works, because the editor knows the name. Rename refactors propagate, because the name is meaningful. And the same component cannot end up imported under four different names across the codebase.',
        hi: 'Teen thos wajah. Autocomplete chalta hai, kyunki editor ko naam pata hai. Rename refactor har jagah pahunchta hai, kyunki naam matlab rakhta hai. Aur ek hi component poore codebase mein chaar alag naamon se import nahi ho jaata.',
      },
      code: `import Button from './Button';
import Btn from './Button';
import MyButton from './Button';   // all the same component ✗`,
    },
    {
      heading: { en: 'Tree shaking is the same for both', hi: 'Tree shaking dono ke liye ek jaisi hai' },
      body: {
        en: 'A common myth is that default exports break tree shaking. They do not — any static ESM export can be shaken. What breaks it is a barrel file with side effects, or CommonJS, not the export style.',
        hi: 'Aam galatfehmi hai ki default exports tree shaking tod dete hain. Aisa nahi hai — koi bhi static ESM export shake ho sakta hai. Isse todta hai side effects wala barrel file ya CommonJS, export ka tareeka nahi.',
      },
    },
    {
      heading: { en: 'Where default exports are required', hi: 'Default exports kahan zaroori hain' },
      body: {
        en: 'Some tooling expects them. Next.js pages and layouts must be default exports, React.lazy takes a module whose default is the component, and many config files export a default object.',
        hi: 'Kuch tooling inhe maangti hai. Next.js ke pages aur layouts default exports hone chahiye, React.lazy aisa module leta hai jiska default hi component ho, aur kai config files default object export karti hain.',
      },
      code: `const Heavy = lazy(() => import('./Heavy'));       // needs a default

// for a named export:
const Heavy = lazy(() =>
  import('./Heavy').then((m) => ({ default: m.Heavy })));`,
    },
    {
      heading: { en: 'Mixing them, and the barrel caveat', hi: 'Dono milana, aur barrel wali chetavni' },
      body: {
        en: 'A component file commonly default-exports the component and named-exports its types and helpers. Re-exporting through an index barrel is convenient, but a large barrel can pull in far more than you need and slow down cold builds.',
        hi: 'Component file aam taur pe component ko default aur uske types aur helpers ko named export karti hai. index barrel se dobara export karna suvidhajanak hai, par bada barrel zaroorat se bahut zyada kheench sakta hai aur cold builds dheeme kar deta hai.',
      },
      code: `export { Button } from './Button';
export { Card } from './Card';     // convenient, but keep barrels small`,
    },
    {
      heading: { en: 'Pick one and be consistent', hi: 'Ek chuno aur uspe tike raho' },
      body: {
        en: 'The style matters far less than consistency. Most modern codebases and style guides lean named-only, with default exports where a framework demands them. Say that and you have answered the question well.',
        hi: 'Tareeka utna maayne nahi rakhta jitna ek jaisa rehna. Zyadatar modern codebases aur style guides sirf named ki taraf jhukte hain, aur default wahan jahan framework maange. Ye keh do toh jawab achha ho gaya.',
      },
    },
  ],

  'What is a React Portal?': [
    {
      heading: { en: 'Render into a different DOM node', hi: 'Kisi doosre DOM node mein render karo' },
      body: {
        en: 'createPortal renders children into a DOM node outside the parent component\'s DOM position, while keeping them in the React tree exactly where they were written. Two trees, deliberately out of step.',
        hi: 'createPortal children ko aise DOM node mein render karta hai jo parent component ki DOM jagah se bahar hai, par React tree mein wo wahin rehte hain jahan likhe gaye the. Do trees, jaan-boojh kar alag.',
      },
      code: `import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(children, document.getElementById('modal-root'));
}`,
    },
    {
      heading: { en: 'The problem it solves', hi: 'Ye kaunsi problem hal karta hai' },
      body: {
        en: 'A modal nested inside a container with overflow:hidden gets clipped. A tooltip inside a stacking context cannot escape its z-index. No amount of CSS fixes it, because the element is genuinely inside that box. A portal moves the DOM node out.',
        hi: 'overflow:hidden wale container ke andar ka modal kat jaata hai. Kisi stacking context ke andar ka tooltip apne z-index se bahar nahi nikal sakta. Koi bhi CSS isse theek nahi karti, kyunki element sach mein us dabbe ke andar hai. Portal DOM node ko bahar le jaata hai.',
      },
      diagram: `React tree              DOM tree
<App>                   <div id="root">
  <Card>                  <div class="card" style="overflow:hidden">
    <Modal>       ──┐     </div>
  </Card>           └───► <div id="modal-root">
</App>                      the modal, unclipped
                          </div>`,
    },
    {
      heading: { en: 'Events still bubble through the REACT tree', hi: 'Events phir bhi REACT tree se bubble karte hain' },
      body: {
        en: 'This is the part people get wrong and interviewers ask about. A click inside a portal bubbles to the React parent that rendered it, not to the DOM parent it was placed in. React synthesises event propagation along its own tree.',
        hi: 'Yahi wo hissa hai jahan log galti karte hain aur interviewers poochte hain. Portal ke andar ka click us React parent tak bubble karta hai jisne usse render kiya, us DOM parent tak nahi jahan wo rakha gaya. React apne tree ke hisaab se event propagation banata hai.',
      },
      code: `<div onClick={() => console.log('outer')}>
  <Modal>                       {/* rendered into #modal-root */}
    <button>click</button>      {/* logs 'outer' ✓ */}
  </Modal>
</div>`,
    },
    {
      heading: { en: 'Context and state work normally', hi: 'Context aur state aam tareeke se chalte hain' },
      body: {
        en: 'Because the portal stays in the React tree, it reads context from its React ancestors, sits inside the same error boundary and Suspense boundary, and unmounts with its parent. Only the DOM placement changes.',
        hi: 'Portal React tree mein hi rehta hai, isliye wo apne React ancestors se context padhta hai, usi error boundary aur Suspense boundary ke andar rehta hai, aur apne parent ke saath unmount hota hai. Sirf DOM ki jagah badalti hai.',
      },
    },
    {
      heading: { en: 'What a portal does NOT give you', hi: 'Portal kya NAHI deta' },
      body: {
        en: 'Accessibility. It moves a node; it does not trap focus, close on Escape, mark the rest of the page inert, or announce anything to a screen reader. All of that is still your job, and it is the follow-up most candidates miss.',
        hi: 'Accessibility. Ye node hilata hai; ye focus nahi rokta, Escape pe band nahi karta, baaki page ko inert nahi karta, aur screen reader ko kuch nahi batata. Ye sab abhi bhi tumhara kaam hai, aur zyadatar candidates yahi follow-up chook jaate hain.',
      },
    },
    {
      heading: { en: 'The modern alternative', hi: 'Modern vikalp' },
      body: {
        en: 'The native dialog element with showModal gives you the top layer, focus trapping, Escape handling and a backdrop for free — no portal needed. Mentioning it shows you know the platform caught up.',
        hi: 'Native dialog element showModal ke saath top layer, focus trapping, Escape handling aur backdrop muft mein deta hai — portal ki zaroorat hi nahi. Iska zikr dikhata hai ki tumhe pata hai platform aage aa gaya hai.',
      },
      code: `<dialog ref={ref}>…</dialog>
ref.current.showModal();     // top layer, focus trap, Escape — built in`,
    },
  ],

  'What is useRef and when should you use it?': [
    {
      heading: { en: 'A mutable box that survives renders', hi: 'Ek badalne laayak dabba jo renders ke paar zinda rehta hai' },
      body: {
        en: 'useRef returns an object with a single current property. React keeps that same object across every render, and changing current does NOT trigger a re-render. Those two facts define everything it is good for.',
        hi: 'useRef ek object deta hai jisme sirf current property hoti hai. React har render mein wahi object rakhta hai, aur current badalne se re-render NAHI hota. Yahi do baatein iske har upyog ko tay karti hain.',
      },
      code: `const ref = useRef(0);
ref.current += 1;     // no re-render, value persists`,
    },
    {
      heading: { en: 'Use one: reaching a DOM node', hi: 'Ek upyog: DOM node tak pahunchna' },
      body: {
        en: 'The most common use. Pass the ref to an element and React sets current to the DOM node after commit. Use it for focus, scroll position, measuring, playing media, or handing a node to a non-React library.',
        hi: 'Sabse aam upyog. Ref ko element ko do aur React commit ke baad current mein DOM node rakh deta hai. Isse focus, scroll position, naapne, media chalane, ya kisi non-React library ko node dene ke liye use karo.',
      },
      code: `const input = useRef(null);
useEffect(() => { input.current.focus(); }, []);
return <input ref={input} />;`,
    },
    {
      heading: { en: 'Use two: a value that should not re-render', hi: 'Doosra upyog: aisi value jo re-render na karwaaye' },
      body: {
        en: 'A timer id, a previous value, a render counter, a "has this already run" flag, a WebSocket instance. Anything you need to remember but never display. Putting these in state causes needless renders.',
        hi: 'Timer id, pichhli value, render counter, "ye pehle chal chuka hai" flag, WebSocket instance. Har wo cheez jo yaad rakhni hai par dikhani nahi. Inhe state mein rakhna bekaar renders karwaata hai.',
      },
      code: `const timer = useRef(null);
const start = () => { timer.current = setInterval(tick, 1000); };
const stop  = () => clearInterval(timer.current);`,
    },
    {
      heading: { en: 'The rule: refs versus state', hi: 'Rule: refs vs state' },
      body: {
        en: 'If the value is shown in the UI, it is state. If it is only read by handlers and effects, it is a ref. Ask "should the screen change when this changes?" — that question decides it every time.',
        hi: 'Agar value UI mein dikhti hai toh wo state hai. Agar usse sirf handlers aur effects padhte hain toh wo ref hai. Poocho "ye badle toh kya screen badalni chahiye?" — ye sawaal har baar faisla kar deta hai.',
      },
      diagram: `                    state        ref
triggers re-render   yes          no
survives renders     yes          yes
read during render   yes          NO — do not
`,
    },
    {
      heading: { en: 'Do not read or write a ref during render', hi: 'Render ke dauraan ref ko na padho na likho' },
      body: {
        en: 'Rendering must be pure. Mutating a ref while rendering makes the output depend on how many times React chose to render, which breaks under StrictMode and concurrent rendering. Do it in an effect or an event handler.',
        hi: 'Rendering pure honi chahiye. Render karte waqt ref badalna output ko is baat pe nirbhar kar deta hai ki React ne kitni baar render kiya, jo StrictMode aur concurrent rendering mein toot jaata hai. Ye kaam effect ya event handler mein karo.',
      },
      code: `function Bad() {
  const r = useRef(0);
  r.current++;              // ✗ impure — doubles under StrictMode
  return <p>{r.current}</p>;
}`,
    },
    {
      heading: { en: 'The classic pattern: previous value', hi: 'Classic pattern: pichhli value' },
      body: {
        en: 'Store the value in a ref inside an effect. The effect runs after render, so during render the ref still holds the previous value. This is the standard usePrevious hook and a common interview task.',
        hi: 'Value ko effect ke andar ref mein rakho. Effect render ke baad chalta hai, toh render ke dauraan ref mein abhi bhi pichhli value hoti hai. Yahi standard usePrevious hook hai aur ek aam interview task.',
      },
      code: `function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; }, [value]);
  return ref.current;
}`,
    },
    {
      heading: { en: 'React 19 removed forwardRef', hi: 'React 19 ne forwardRef hata diya' },
      body: {
        en: 'ref is now an ordinary prop on function components, so passing a ref to a child no longer needs forwardRef. Knowing this is a quick signal that your React knowledge is current.',
        hi: 'ref ab function components pe ek aam prop hai, toh bachche ko ref dene ke liye forwardRef nahi chahiye. Ye jaanna turant bata deta hai ki tumhara React gyaan aaj ka hai.',
      },
      code: `function Input({ ref, ...props }) {   // ✓ React 19
  return <input ref={ref} {...props} />;
}`,
    },
  ],

  'What is server-side rendering (SSR) in React?': [
    {
      heading: { en: 'Render to HTML on the server', hi: 'Server pe HTML render karo' },
      body: {
        en: 'With SSR the server runs your React components, produces an HTML string, and sends that to the browser. The user sees content in the first response instead of an empty div waiting for JavaScript.',
        hi: 'SSR mein server tumhare React components chalata hai, ek HTML string banata hai, aur wahi browser ko bhejta hai. User ko pehle hi response mein content dikhta hai, JavaScript ka intezaar karta khaali div nahi.',
      },
      diagram: `CSR   HTML shell → download JS → render → content
SSR   HTML with content → download JS → hydrate → interactive`,
    },
    {
      heading: { en: 'Hydration is the second half', hi: 'Doosra hissa hydration hai' },
      body: {
        en: 'The HTML alone is not interactive. React then runs the same components in the browser and attaches event listeners to the existing DOM rather than recreating it. That step is hydration, and until it finishes the page looks ready but does not respond.',
        hi: 'Sirf HTML interactive nahi hota. Phir React wahi components browser mein chalata hai aur maujooda DOM pe event listeners lagata hai, usse dobara banane ki jagah. Yahi hydration hai, aur jab tak ye khatam na ho page taiyaar dikhta hai par jawab nahi deta.',
      },
      code: `// server
const html = renderToString(<App />);

// client
hydrateRoot(document.getElementById('root'), <App />);`,
    },
    {
      heading: { en: 'What it actually buys you', hi: 'Isse asal mein kya milta hai' },
      body: {
        en: 'Faster first contentful paint, especially on slow devices and networks. Real content for crawlers and link previews, which matters for SEO and social sharing. And less work on the client for the initial view.',
        hi: 'Tez pehla contentful paint, khaas kar dheeme devices aur networks pe. Crawlers aur link previews ke liye asli content, jo SEO aur social sharing mein maayne rakhta hai. Aur pehli view ke liye client pe kam kaam.',
      },
    },
    {
      heading: { en: 'What it costs', hi: 'Keemat kya hai' },
      body: {
        en: 'A server that runs on every request, so higher cost and latency. Browser globals like window and document are undefined during the render, so any code touching them must be guarded. And time-to-interactive can be WORSE, because the user sees content they cannot yet click.',
        hi: 'Ek server jo har request pe chalta hai, toh zyada kharcha aur latency. Render ke dauraan window aur document jaise browser globals undefined hote hain, toh unhe chhoone wale code ko sambhaalna padta hai. Aur time-to-interactive KHARAAB ho sakta hai, kyunki user ko wo content dikhta hai jispe wo abhi click nahi kar sakta.',
      },
      code: `if (typeof window !== 'undefined') { … }        // guard
useEffect(() => { localStorage.getItem('x'); }, []);  // ✓ client only`,
    },
    {
      heading: { en: 'Hydration mismatches', hi: 'Hydration mismatches' },
      body: {
        en: 'The server HTML and the first client render must match exactly. Anything non-deterministic — Date.now, Math.random, locale formatting, reading localStorage — produces a mismatch warning and a discarded server render. Render such values in an effect instead.',
        hi: 'Server ka HTML aur client ka pehla render bilkul milna chahiye. Koi bhi anischit cheez — Date.now, Math.random, locale formatting, localStorage padhna — mismatch warning deti hai aur server ka render phenk diya jaata hai. Aisi values effect mein render karo.',
      },
    },
    {
      heading: { en: 'Streaming SSR is what modern React does', hi: 'Modern React streaming SSR karta hai' },
      body: {
        en: 'renderToPipeableStream sends HTML in chunks as it becomes ready, and Suspense boundaries let slow parts arrive later without holding up the rest. Selective hydration then hydrates whatever the user interacts with first.',
        hi: 'renderToPipeableStream HTML ko tukdon mein bhejta hai jaise-jaise wo taiyaar hota hai, aur Suspense boundaries dheeme hisson ko baad mein aane dete hain bina baaki ko roke. Phir selective hydration usse pehle hydrate karta hai jispe user pehle interact kare.',
      },
      code: `<Suspense fallback={<Skeleton />}>
  <SlowComments />      {/* streams in later */}
</Suspense>`,
    },
    {
      heading: { en: 'SSR, SSG and RSC are different things', hi: 'SSR, SSG aur RSC alag cheezein hain' },
      body: {
        en: 'SSR renders per request. SSG renders at build time and serves a static file. Server Components run only on the server and ship no JavaScript at all. They compose — a Next.js app typically uses all three — and mixing up the terms is a common slip.',
        hi: 'SSR har request pe render karta hai. SSG build ke waqt render karke static file deta hai. Server Components sirf server pe chalte hain aur JavaScript bhejte hi nahi. Ye saath chalte hain — Next.js app aam taur pe teeno use karta hai — aur in shabdon ko mila dena aam galti hai.',
      },
    },
  ],

  'What is React Fragment?': [
    {
      heading: { en: 'Group children without adding a DOM node', hi: 'Bina DOM node jode children ko group karo' },
      body: {
        en: 'A component must return a single element, because a function returns one value. A Fragment satisfies that requirement without producing a wrapper div in the output.',
        hi: 'Component ko ek hi element return karna hota hai, kyunki function ek value deta hai. Fragment ye shart poori karta hai bina output mein koi wrapper div banaye.',
      },
      code: `return (
  <>
    <td>Name</td>
    <td>Age</td>
  </>
);
// renders exactly two <td> — no wrapper`,
    },
    {
      heading: { en: 'Why the wrapper div is a real problem', hi: 'Wrapper div asli problem kyun hai' },
      body: {
        en: 'It breaks HTML validity — a div between tr and td is invalid, and the browser will move it. It breaks CSS flex and grid, because an extra element becomes an unintended child. And it bloats the tree with meaningless nodes.',
        hi: 'Ye HTML ko galat kar deta hai — tr aur td ke beech div invalid hai, aur browser usse hila dega. Ye CSS flex aur grid tod deta hai, kyunki ek extra element anchaha bachcha ban jaata hai. Aur tree ko bemaani nodes se bhar deta hai.',
      },
      code: `<div style="display:flex">
  <div>            {/* ✗ this becomes the only flex item */}
    <Item /><Item />
  </div>
</div>`,
    },
    {
      heading: { en: 'The two syntaxes', hi: 'Do syntax' },
      body: {
        en: 'The short form is angle brackets with nothing inside. The long form is React.Fragment, and it is the only one that accepts a key — which you need when returning a fragment from a map.',
        hi: 'Chhota roop khaali angle brackets hai. Lamba roop React.Fragment hai, aur sirf wahi key leta hai — jo map se fragment return karte waqt chahiye.',
      },
      code: `<>…</>                              // short, no props allowed

<React.Fragment key={id}>…</React.Fragment>   // ✓ takes a key

{items.map((i) => (
  <Fragment key={i.id}>
    <dt>{i.term}</dt><dd>{i.def}</dd>
  </Fragment>
))}`,
    },
    {
      heading: { en: 'Where it is genuinely required', hi: 'Ye kahan sach mein zaroori hai' },
      body: {
        en: 'Table rows and cells, definition lists, and any flex or grid container where an extra wrapper would change the layout. In those cases a div is not just untidy — it produces the wrong result.',
        hi: 'Table ke rows aur cells, definition lists, aur har flex ya grid container jahan extra wrapper layout badal deta. In cases mein div sirf bhadda nahi — wo galat nateeja deta hai.',
      },
    },
    {
      heading: { en: 'It renders nothing at all', hi: 'Ye kuch bhi render nahi karta' },
      body: {
        en: 'A Fragment produces no DOM node, so you cannot attach a ref, a className or an event handler to it. If you need any of those, you actually need a real element.',
        hi: 'Fragment koi DOM node nahi banata, toh usme ref, className ya event handler nahi laga sakte. In mein se kuch chahiye toh tumhe sach mein ek asli element chahiye.',
      },
      code: `<> <div ref={r} /> </>       // ✓ ref on the child
<div ref={r}>…</div>          // ✓ if you need it on the wrapper`,
    },
    {
      heading: { en: 'Arrays are the other option', hi: 'Doosra vikalp arrays hain' },
      body: {
        en: 'A component may also return an array of elements, but each needs a key and the syntax reads worse. A fragment is almost always the better choice.',
        hi: 'Component elements ka array bhi return kar sakta hai, par har ek ko key chahiye aur syntax kharaab padha jaata hai. Fragment lagbhag hamesha behtar chunav hai.',
      },
    },
  ],

  'What is React Router and how does it work?': [
    {
      heading: { en: 'Client-side routing for a single-page app', hi: 'Single-page app ke liye client-side routing' },
      body: {
        en: 'React Router maps URLs to components without a full page reload. It listens to the browser history, matches the current path against your route definitions, and renders whichever component matches.',
        hi: 'React Router URLs ko components se jodta hai, bina poora page reload kiye. Wo browser history sunta hai, maujooda path ko tumhare route definitions se milaata hai, aur jo match kare wahi component render karta hai.',
      },
      code: `<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:id" element={<User />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>`,
    },
    {
      heading: { en: 'It is built on the History API', hi: 'Ye History API pe bana hai' },
      body: {
        en: 'A Link click is intercepted with preventDefault, then history.pushState changes the URL without a request. React Router listens for popstate to handle the back button, and re-renders the matching route. There is no navigation at all.',
        hi: 'Link ka click preventDefault se roka jaata hai, phir history.pushState bina request ke URL badal deta hai. React Router back button ke liye popstate sunta hai, aur matching route dobara render karta hai. Koi navigation hoti hi nahi.',
      },
      diagram: `<Link to="/x">  click
   │ preventDefault
   ▼
history.pushState('/x')     URL changes, no request
   │
   ▼
router re-renders the matching <Route>`,
    },
    {
      heading: { en: 'Always use Link, never an anchor', hi: 'Hamesha Link, kabhi anchor nahi' },
      body: {
        en: 'A plain anchor triggers a full page load: the whole bundle re-downloads, all state is lost, and the app restarts. Link renders an anchor for accessibility and middle-click, but intercepts the left click.',
        hi: 'Saada anchor poora page load karwaata hai: poora bundle dobara download hota hai, saari state kho jaati hai, aur app phir se shuru hota hai. Link accessibility aur middle-click ke liye anchor banata hai, par left click rok leta hai.',
      },
      code: `<a href="/about">     ✗ full reload
<Link to="/about">    ✓ client-side
<NavLink to="/about"> ✓ plus an active class`,
    },
    {
      heading: { en: 'Nested routes and Outlet', hi: 'Nested routes aur Outlet' },
      body: {
        en: 'Routes nest to match the way layouts nest. A parent route renders shared chrome and places an Outlet where the matched child should appear. This is the feature that makes the whole library click.',
        hi: 'Routes waise hi nest hote hain jaise layouts nest hote hain. Parent route common chrome render karta hai aur Outlet wahan rakhta hai jahan match hua bachcha aana chahiye. Yahi feature poori library ko samajh mein laata hai.',
      },
      code: `<Route path="/dashboard" element={<Layout />}>
  <Route index element={<Overview />} />
  <Route path="settings" element={<Settings />} />
</Route>

function Layout() {
  return <><Sidebar /><Outlet /></>;
}`,
    },
    {
      heading: { en: 'The hooks you will use', hi: 'Jo hooks use hoge' },
      body: {
        en: 'useParams for dynamic segments, useNavigate for programmatic navigation, useSearchParams for the query string as state, and useLocation for the current path. Note navigate replaces the old useHistory.',
        hi: 'Dynamic segments ke liye useParams, code se navigate karne ke liye useNavigate, query string ko state ki tarah rakhne ke liye useSearchParams, aur maujooda path ke liye useLocation. Dhyaan do navigate purane useHistory ki jagah aaya hai.',
      },
      code: `const { id } = useParams();
const navigate = useNavigate();
navigate('/users', { replace: true });
const [params, setParams] = useSearchParams();`,
    },
    {
      heading: { en: 'Data APIs are the modern half', hi: 'Data APIs modern hissa hain' },
      body: {
        en: 'Since v6.4 a route can declare a loader that fetches before rendering and an action that handles form submissions. That removes the fetch-in-useEffect waterfall, because data loading starts as soon as navigation does.',
        hi: 'v6.4 se koi route ek loader bata sakta hai jo render se pehle fetch karta hai aur ek action jo form submissions sambhaalta hai. Isse useEffect wala fetch waterfall khatam ho jaata hai, kyunki data loading navigation ke saath hi shuru ho jaati hai.',
      },
      code: `{ path: '/users/:id',
  loader: ({ params }) => fetchUser(params.id),
  element: <User /> }

function User() { const user = useLoaderData(); }`,
    },
    {
      heading: { en: 'The server-side caveat', hi: 'Server-side wali chetavni' },
      body: {
        en: 'Client-side routing needs the server to return index.html for every path, or a direct visit to /about is a 404. On a static host that is a rewrite rule — a genuinely common deployment bug worth mentioning.',
        hi: 'Client-side routing ke liye server ko har path pe index.html dena padta hai, warna seedha /about kholna 404 deta hai. Static host pe ye ek rewrite rule hai — deployment ka ek sach mein aam bug, zikr karne laayak.',
      },
    },
  ],

  /* ─── Patterns, optimisation and comparisons ──────────────── */

  'What is a Higher-Order Component (HOC) in React?': [
    {
      heading: { en: 'A function that takes a component and returns a component', hi: 'Aisa function jo component le kar component de' },
      body: {
        en: 'A HOC wraps a component to add behaviour — data, props, guards — without modifying the original. It is the component-level version of a higher-order function, and it was the main reuse pattern in the class era.',
        hi: 'HOC kisi component ko lapet kar uspe behaviour jodta hai — data, props, guards — bina original ko badle. Ye higher-order function ka component wala roop hai, aur class ke daur mein yahi mukhya reuse pattern tha.',
      },
      code: `function withLoading(Component) {
  return function Wrapped({ isLoading, ...props }) {
    if (isLoading) return <Spinner />;
    return <Component {...props} />;
  };
}

const UserWithLoading = withLoading(UserList);`,
    },
    {
      heading: { en: 'The ones you have already used', hi: 'Jo tum pehle se use kar chuke ho' },
      body: {
        en: 'connect from React Redux, withRouter from React Router v5, withStyles from older Material UI, and React.memo itself. Naming a real one makes the answer concrete.',
        hi: 'React Redux ka connect, React Router v5 ka withRouter, purane Material UI ka withStyles, aur khud React.memo. Ek asli naam lena jawab ko thos bana deta hai.',
      },
    },
    {
      heading: { en: 'The rules for writing one correctly', hi: 'Isse theek likhne ke rules' },
      body: {
        en: 'Pass through every prop you do not consume. Set a displayName so DevTools is readable. Copy static methods, or hoist-non-react-statics does it for you. And forward the ref, or the consumer cannot reach the inner element.',
        hi: 'Jo props tum use nahi kar rahe wo sab aage bhejo. displayName rakho taaki DevTools padha ja sake. Static methods copy karo, ya hoist-non-react-statics tumhare liye kar dega. Aur ref aage bhejo, warna consumer andar wale element tak nahi pahunch paayega.',
      },
      code: `function withX(Component) {
  const Wrapped = (props) => <Component {...props} extra={1} />;
  Wrapped.displayName = \`withX(\${Component.displayName || Component.name})\`;
  return Wrapped;
}`,
    },
    {
      heading: { en: 'The mistake that remounts everything', hi: 'Wo galti jo sab kuch dobara mount kar deti hai' },
      body: {
        en: 'Calling the HOC inside render creates a NEW component type on every render, so React unmounts the old tree and mounts a fresh one — losing all state on every keystroke. Always apply a HOC at module level.',
        hi: 'HOC ko render ke andar bulane se har render pe NAYA component type banta hai, toh React purana tree unmount karke naya mount karta hai — har keystroke pe saari state kho kar. HOC hamesha module level pe lagao.',
      },
      code: `function Parent() {
  const Wrapped = withX(Child);   // ✗ new type every render
  return <Wrapped />;
}

const Wrapped = withX(Child);     // ✓ once, at module scope`,
    },
    {
      heading: { en: 'Why hooks replaced them', hi: 'Hooks ne inki jagah kyun li' },
      body: {
        en: 'Three problems. Stacking several HOCs produces wrapper hell in the tree. Prop origins become untraceable — you cannot see which wrapper supplied which prop. And name collisions between HOCs are silent. A custom hook has none of these because it adds no component at all.',
        hi: 'Teen problems. Kai HOCs lagane se tree mein wrapper hell ban jaata hai. Props kahan se aaye ye pata nahi chalta — kaunse wrapper ne kaunsa prop diya, dikhta hi nahi. Aur HOCs ke beech naam ka takraav chup-chaap hota hai. Custom hook mein inme se kuch nahi, kyunki wo koi component jodta hi nahi.',
      },
      code: `// HOC composition
withRouter(withTheme(connect(mapState)(Component)))

// hooks
const router = useRouter();
const theme  = useTheme();
const data   = useSelector(selectData);`,
    },
    {
      heading: { en: 'Where a HOC is still the right tool', hi: 'HOC ab bhi kahan sahi auzaar hai' },
      body: {
        en: 'When you need to wrap the RENDERING itself rather than share logic: an error boundary around any component, an auth guard that redirects instead of rendering, or injecting a provider. A hook cannot conditionally not render its component; a HOC can.',
        hi: 'Jab logic share nahi, khud RENDERING lapetni ho: kisi bhi component ke aas-paas error boundary, aisa auth guard jo render ki jagah redirect kar de, ya koi provider daalna. Hook shart pe apna component render karna band nahi kar sakta; HOC kar sakta hai.',
      },
    },
  ],

  'What is a Pure Component in React?': [
    {
      heading: { en: 'A component that skips re-render when props are unchanged', hi: 'Aisa component jo props na badlein toh re-render chhod deta hai' },
      body: {
        en: 'PureComponent implements shouldComponentUpdate as a SHALLOW comparison of props and state. If nothing changed at the top level, React skips the render. React.memo is the function-component equivalent and does the same check.',
        hi: 'PureComponent shouldComponentUpdate ko props aur state ke SHALLOW comparison ki tarah banata hai. Top level pe kuch na badle toh React render chhod deta hai. React.memo function component ka joda hai aur wahi check karta hai.',
      },
      code: `class Row extends React.PureComponent { … }

const Row = React.memo(function Row(props) { … });`,
    },
    {
      heading: { en: 'Shallow means one level, by reference', hi: 'Shallow matlab ek level, reference se' },
      body: {
        en: 'Each prop is compared with Object.is. Primitives compare by value and behave as you expect. Objects, arrays and functions compare by reference — so a new object with identical contents counts as a change.',
        hi: 'Har prop Object.is se compare hota hai. Primitives value se compare hote hain aur ummeed ke mutabik chalte hain. Objects, arrays aur functions reference se compare hote hain — toh same content wala naya object bhi badlaav gina jaata hai.',
      },
      code: `<Row name="a" />                 // ✓ memo works
<Row style={{ color: 'red' }} /> // ✗ new object every render
<Row onClick={() => {}} />       // ✗ new function every render`,
    },
    {
      heading: { en: 'Which is why memo so often does nothing', hi: 'Isiliye memo aksar kuch nahi karta' },
      body: {
        en: 'People wrap a component in memo, pass it an inline arrow, and conclude memo is broken. The fix is to make the props stable with useMemo and useCallback — or to pass primitives instead.',
        hi: 'Log component ko memo mein lapetate hain, usse inline arrow dete hain, aur natija nikaalte hain ki memo kharaab hai. Ilaaj ye hai ki props ko useMemo aur useCallback se sthir karo — ya primitives bhejo.',
      },
      code: `const onClick = useCallback(() => save(id), [id]);
const style = useMemo(() => ({ color }), [color]);
<Row onClick={onClick} style={style} />     // ✓ now it works`,
    },
    {
      heading: { en: 'Mutation defeats it entirely', hi: 'Mutation isse poori tarah bekaar kar deta hai' },
      body: {
        en: 'If you mutate an object and pass the same reference, the shallow check sees no change and the component does NOT re-render even though the data is different. A pure component makes immutability mandatory rather than merely advisable.',
        hi: 'Agar tum object mutate karke wahi reference bhejo, toh shallow check ko koi badlaav nahi dikhta aur component re-render NAHI hota, jabki data alag hai. Pure component immutability ko salaah nahi, zaroorat bana deta hai.',
      },
      code: `items.push(x);
<List items={items} />       // ✗ same reference — nothing renders`,
    },
    {
      heading: { en: 'Children is a prop too', hi: 'children bhi ek prop hai' },
      body: {
        en: 'JSX children create a new element object on every parent render, so a memoised component with children usually re-renders anyway. This surprises people and is a good detail to volunteer.',
        hi: 'JSX children har parent render pe naya element object banate hain, toh children wala memoised component aam taur pe re-render ho hi jaata hai. Ye logon ko chaunkata hai aur khud se batane laayak detail hai.',
      },
    },
    {
      heading: { en: 'It is not free', hi: 'Ye muft nahi hai' },
      body: {
        en: 'Every render pays for the comparison. On a cheap component with many props, comparing costs more than re-rendering. Apply it where you have measured a problem — a large list row, an expensive chart — not by default.',
        hi: 'Har render comparison ki keemat deta hai. Kam kharche wale component pe jiske bahut props hon, compare karna re-render se mehnga padta hai. Isse wahan lagao jahan tumne problem naapi ho — badi list ka row, mehnga chart — har jagah nahi.',
      },
    },
    {
      heading: { en: 'The compiler makes this obsolete', hi: 'Compiler ise bekaar kar deta hai' },
      body: {
        en: 'The React Compiler adds memoisation automatically and more precisely than you would by hand, so manual memo, useMemo and useCallback largely disappear. Saying this shows you know where the ecosystem is going.',
        hi: 'React Compiler apne aap aur tumse zyada theek tareeke se memoisation jodta hai, toh haath se likha memo, useMemo aur useCallback lagbhag khatam ho jaata hai. Ye kehna dikhata hai ki tumhe ecosystem ki disha pata hai.',
      },
    },
  ],

  'How do you optimise a React application?': [
    {
      heading: { en: 'Measure first, or you are guessing', hi: 'Pehle naapo, warna tum andaaza laga rahe ho' },
      body: {
        en: 'Never start an optimisation answer with a list of techniques. Start with the tools: the React DevTools Profiler to see which components render and why, Lighthouse for Core Web Vitals, and the Network panel for bundle size. Then fix what the numbers point at.',
        hi: 'Optimisation ka jawab kabhi techniques ki list se shuru mat karo. Tools se shuru karo: React DevTools Profiler se dekho kaunse components render hote hain aur kyun, Core Web Vitals ke liye Lighthouse, aur bundle size ke liye Network panel. Phir wahi theek karo jahan aankde ishara karein.',
      },
    },
    {
      heading: { en: 'Bundle size is usually the biggest win', hi: 'Sabse badi jeet aam taur pe bundle size hai' },
      body: {
        en: 'Users on slow networks feel megabytes far more than re-renders. Code-split by route with lazy and Suspense, import only what you use, replace heavy dependencies, and check the bundle analyser for something you did not expect.',
        hi: 'Dheeme network wale users megabytes ko re-renders se kahin zyada mehsoos karte hain. lazy aur Suspense se route ke hisaab se code-split karo, sirf wahi import karo jo use ho, bhaari dependencies badlo, aur bundle analyser mein dekho kahin kuch anchaha toh nahi.',
      },
      code: `const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Skeleton />}>
  <Dashboard />
</Suspense>`,
    },
    {
      heading: { en: 'Cut unnecessary re-renders', hi: 'Bekaar re-renders kaato' },
      body: {
        en: 'Find them in the Profiler, then fix the cause rather than papering over it. Move state down so fewer components sit above it, lift expensive children into props so they do not re-render, split a context so consumers subscribe to less, and memo only what you measured.',
        hi: 'Unhe Profiler mein dhoondho, phir wajah theek karo, upar se lepo mat. State ko neeche le jao taaki kam components upar rahein, mehnge children ko props mein utha lo taaki wo re-render na hon, context ko baanto taaki consumers kam subscribe karein, aur sirf wahi memo karo jo naapa ho.',
      },
      code: `// state moved down: only Search re-renders on typing
function Page() { return <><Search /><HeavyList /></>; }

// children as props: HeavyList is created by the parent, so
// a state change in Wrapper does not re-render it
<Wrapper><HeavyList /></Wrapper>`,
    },
    {
      heading: { en: 'Fix the data layer', hi: 'Data layer theek karo' },
      body: {
        en: 'Often the real problem. A query cache deduplicates requests, avoids refetching on every mount, and removes waterfalls where one component fetches only after its parent finished. Server Components remove the client fetch entirely.',
        hi: 'Aksar asli problem yahi hoti hai. Query cache requests ko ek rakhta hai, har mount pe dobara fetch nahi karta, aur wo waterfalls hataata hai jahan ek component tabhi fetch karta hai jab parent khatam ho. Server Components client ka fetch hi khatam kar dete hain.',
      },
    },
    {
      heading: { en: 'Virtualise long lists', hi: 'Lambi lists virtualise karo' },
      body: {
        en: 'Ten thousand rows in the DOM is slow no matter how well React renders. Windowing libraries render only the visible rows plus a small buffer, which turns a list of any length into a constant amount of DOM.',
        hi: 'Das hazaar rows DOM mein dheeme hi rahenge, chahe React kitna bhi achha render kare. Windowing libraries sirf dikhne wale rows aur thoda buffer render karti hain, jisse kisi bhi lambai ki list ek tay maatra ka DOM ban jaati hai.',
      },
      code: `import { useVirtualizer } from '@tanstack/react-virtual';
// 10,000 items → about 20 DOM nodes`,
    },
    {
      heading: { en: 'Use the concurrent features', hi: 'Concurrent features use karo' },
      body: {
        en: 'useTransition marks a slow update as interruptible so typing stays responsive while a heavy list re-renders. useDeferredValue lets an expensive view lag behind a fast input. Both fix perceived performance without making anything actually faster.',
        hi: 'useTransition kisi dheeme update ko rokne laayak bana deta hai taaki bhaari list re-render hote waqt typing chalti rahe. useDeferredValue mehngi view ko tez input se peeche chalne deta hai. Dono mehsoos hone wali performance theek karte hain, bina kuch asal mein tez kiye.',
      },
    },
    {
      heading: { en: 'The list of easy structural wins', hi: 'Aasaan dhaanchagat jeeton ki list' },
      body: {
        en: 'Stable keys instead of index keys. Images with width, height and loading="lazy" to stop layout shift. Debounced search inputs. Web Workers for genuinely heavy computation. And SSR or SSG for a faster first paint.',
        hi: 'Index keys ki jagah sthir keys. Images pe width, height aur loading="lazy" taaki layout na khiske. Search inputs pe debounce. Sach mein bhaari computation ke liye Web Workers. Aur tez pehle paint ke liye SSR ya SSG.',
      },
    },
    {
      heading: { en: 'And say what NOT to do', hi: 'Aur ye bhi kaho ki kya NAHI karna' },
      body: {
        en: 'Do not wrap everything in memo, useMemo and useCallback by reflex — each has a cost and unstable deps make them useless anyway. The React Compiler now does this automatically and better. Premature memoisation is the most common self-inflicted performance problem.',
        hi: 'Aadat se har cheez ko memo, useMemo aur useCallback mein mat lapeto — har ek ki keemat hai aur badalti deps unhe waise bhi bekaar kar deti hain. React Compiler ab ye apne aap aur behtar karta hai. Jaldbaazi wali memoisation sabse aam khud paida ki hui performance problem hai.',
      },
    },
  ],

  'What is the difference between React and Angular?': [
    {
      heading: { en: 'A library versus a framework', hi: 'Library vs framework' },
      body: {
        en: 'This is the sentence to lead with. React handles the view and leaves routing, HTTP, forms and state to the ecosystem. Angular is a full framework that ships all of those, plus a CLI, dependency injection and an opinionated project structure.',
        hi: 'Isi vaakya se shuru karo. React view sambhaalta hai aur routing, HTTP, forms aur state ecosystem pe chhod deta hai. Angular poora framework hai jo ye sab deta hai, saath mein CLI, dependency injection aur ek tay project structure.',
      },
      diagram: `React        view only + you choose the rest
Angular      view, router, HTTP, forms, DI, CLI, testing — included`,
    },
    {
      heading: { en: 'Language and template model', hi: 'Language aur template model' },
      body: {
        en: 'React uses JSX, so markup is JavaScript and you use ordinary map and ternaries. Angular uses HTML templates with its own directives and a template language. TypeScript is optional in React and effectively mandatory in Angular.',
        hi: 'React JSX use karta hai, toh markup JavaScript hai aur tum aam map aur ternaries use karte ho. Angular HTML templates use karta hai apni directives aur template language ke saath. React mein TypeScript optional hai aur Angular mein practically zaroori.',
      },
      code: `{items.map((i) => <li key={i.id}>{i.name}</li>)}   // React: JS

<li *ngFor="let i of items">{{ i.name }}</li>      // Angular: template`,
    },
    {
      heading: { en: 'Data binding', hi: 'Data binding' },
      body: {
        en: 'React is one-way: props down, callbacks up, and every change is explicit. Angular supports two-way binding with ngModel, which is less code for forms but makes it harder to see what changed a value.',
        hi: 'React ek-tarfa hai: props neeche, callbacks upar, aur har badlaav saaf hai. Angular ngModel se do-tarfa binding deta hai, jo forms mein kam code hai par ye dekhna mushkil kar deta hai ki value kisne badli.',
      },
    },
    {
      heading: { en: 'How change detection works', hi: 'Change detection kaise chalti hai' },
      body: {
        en: 'React re-renders when you call a setter, then diffs a virtual tree. Angular traditionally used Zone.js to patch browser APIs and check bindings after any async event; modern Angular uses signals for fine-grained, targeted updates instead.',
        hi: 'React tab re-render karta hai jab tum setter bulaate ho, phir virtual tree diff karta hai. Angular pehle Zone.js se browser APIs patch karke har async event ke baad bindings check karta tha; modern Angular ab uski jagah signals se bareek, tay updates karta hai.',
      },
    },
    {
      heading: { en: 'Learning curve and team fit', hi: 'Seekhne ki mehnat aur team ke liye fit' },
      body: {
        en: 'React has a small API and a large number of decisions to make, so two React codebases can look nothing alike. Angular has a much larger API and far fewer decisions, so any Angular codebase looks familiar. That is why large enterprises often prefer it.',
        hi: 'React ka API chhota hai aur faisle bahut lene padte hain, toh do React codebases bilkul alag dikh sakte hain. Angular ka API kahin bada hai aur faisle bahut kam, toh koi bhi Angular codebase jaana-pehchana lagta hai. Isiliye badi companies aksar usse pasand karti hain.',
      },
    },
    {
      heading: { en: 'How to answer without sounding partisan', hi: 'Bina taraf lie jawab kaise dein' },
      body: {
        en: '"React is a view library with an ecosystem you assemble; Angular is a batteries-included framework with conventions built in. React suits teams that want flexibility and a small core; Angular suits large teams that want consistency enforced. Neither is faster in any way that matters at application scale."',
        hi: '"React ek view library hai jiska ecosystem tum khud jodte ho; Angular batteries-included framework hai jisme conventions andar hi hain. React un teams ke liye theek hai jinhe lachak aur chhota core chahiye; Angular badi teams ke liye jinhe ek jaisi cheez lagoo karni hai. Application ke paimane pe koi bhi kisi tarah tez nahi hai."',
      },
    },
  ],

  'What are super() and constructor() in a React class component?': [
    {
      heading: { en: 'Ordinary JavaScript class rules', hi: 'Aam JavaScript class ke rules' },
      body: {
        en: 'Nothing here is React-specific. constructor runs when the instance is created, and in a subclass you must call super before touching this — that is a language rule, not a React one.',
        hi: 'Yahan kuch bhi React ka nahi hai. constructor tab chalta hai jab instance banta hai, aur subclass mein this ko chhoone se pehle super bulana zaroori hai — ye language ka rule hai, React ka nahi.',
      },
      code: `class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
}`,
    },
    {
      heading: { en: 'Why this is unavailable before super', hi: 'super se pehle this kyun nahi milta' },
      body: {
        en: 'In a derived class the parent constructor is what actually creates the instance. Until super returns, there is no object for this to refer to, so reading it throws a ReferenceError.',
        hi: 'Derived class mein parent ka constructor hi asal mein instance banata hai. Jab tak super lauta nahi, this ke liye koi object hai hi nahi, isliye usse padhne pe ReferenceError aata hai.',
      },
      code: `constructor(props) {
  this.state = {};      // ✗ ReferenceError: Must call super first
  super(props);
}`,
    },
    {
      heading: { en: 'Why super(props) and not just super()', hi: 'super(props) kyun, sirf super() kyun nahi' },
      body: {
        en: 'React.Component\'s constructor assigns this.props. Call super() with no argument and this.props is undefined INSIDE the constructor — everywhere else React sets it afterwards, so the bug only appears in that one place, which makes it confusing.',
        hi: 'React.Component ka constructor this.props set karta hai. super() bina argument bulao toh CONSTRUCTOR KE ANDAR this.props undefined hota hai — baaki har jagah React usse baad mein set kar deta hai, toh bug sirf usi ek jagah dikhta hai, aur isiliye uljhan hoti hai.',
      },
      code: `constructor(props) {
  super();
  console.log(this.props);   // undefined ✗
}
constructor(props) {
  super(props);
  console.log(this.props);   // ✓
}`,
    },
    {
      heading: { en: 'What the constructor is for', hi: 'Constructor kis liye hai' },
      body: {
        en: 'Two things only: initialising state, and binding methods. Never call setState in it, never do any async work, and never subscribe to anything — that belongs in componentDidMount.',
        hi: 'Sirf do cheezein: state shuru karna, aur methods bind karna. Isme kabhi setState mat bulao, koi async kaam mat karo, aur kisi cheez ko subscribe mat karo — wo componentDidMount ka kaam hai.',
      },
      code: `constructor(props) {
  super(props);
  this.state = { count: 0 };
  this.handleClick = this.handleClick.bind(this);
}`,
    },
    {
      heading: { en: 'You usually do not need one at all', hi: 'Aam taur pe iski zaroorat hi nahi hoti' },
      body: {
        en: 'Class fields let you declare state and arrow methods directly, so the constructor disappears. This is the version you should show if you are asked to write a class component today.',
        hi: 'Class fields se state aur arrow methods seedhe likh sakte ho, toh constructor gaayab ho jaata hai. Aaj class component likhne ko kaha jaaye toh yahi version dikhao.',
      },
      code: `class Counter extends React.Component {
  state = { count: 0 };
  handleClick = () => this.setState((s) => ({ count: s.count + 1 }));
}`,
    },
    {
      heading: { en: 'And in a function component none of this exists', hi: 'Aur function component mein ye kuch bhi nahi hota' },
      body: {
        en: 'useState replaces the constructor, and there is no this to bind. Worth adding as a closing line — it shows you know the question is about legacy code.',
        hi: 'useState constructor ki jagah leta hai, aur bind karne ke liye this hai hi nahi. Ye aakhri line mein jodna theek hai — isse pata chalta hai ki tum jaante ho sawaal purane code ke baare mein hai.',
      },
    },
  ],

  'What is Context API in React?': [
    {
      heading: { en: 'A way to read a value without passing it down', hi: 'Bina neeche bheje value padhne ka tareeka' },
      body: {
        en: 'Context lets any descendant read a value provided by an ancestor, skipping every component in between. It exists to solve prop drilling for values the whole tree needs.',
        hi: 'Context kisi bhi descendant ko wo value padhne deta hai jo koi ancestor deta hai, beech ke har component ko chhod kar. Ye un values ke liye prop drilling hataane ko hai jo poore tree ko chahiye.',
      },
      code: `const ThemeContext = createContext('light');

<ThemeContext value="dark">      {/* React 19: no .Provider */}
  <App />
</ThemeContext>

function Button() {
  const theme = use(ThemeContext);   // or useContext(ThemeContext)
}`,
    },
    {
      heading: { en: 'How the lookup works', hi: 'Lookup kaise chalta hai' },
      body: {
        en: 'A consumer walks up the React tree to the nearest matching provider and reads its value. If there is no provider, it gets the default passed to createContext — which is often the source of a confusing "why is this undefined".',
        hi: 'Consumer React tree mein upar chal kar sabse paas ke matching provider tak jaata hai aur uski value padhta hai. Provider na ho toh usse createContext ka default milta hai — aur "ye undefined kyun hai" ki uljhan aksar yahin se aati hai.',
      },
      diagram: `<Theme value="dark">
   <Layout>
      <Button>  ── looks up ──► finds "dark"
</Theme>

<Button> with no provider above ──► gets the createContext default`,
    },
    {
      heading: { en: 'What it is good for', hi: 'Ye kis kaam ka hai' },
      body: {
        en: 'Values that are genuinely global and change rarely: theme, locale, the current user, an auth token, a feature-flag set. The common thread is that most of the tree needs them and almost nothing updates them.',
        hi: 'Wo values jo sach mein global hain aur kam badalti hain: theme, locale, maujooda user, auth token, feature flags. Sab mein ek baat common hai — tree ka zyadatar hissa unhe chahiye aur unhe koi kam hi badalta hai.',
      },
    },
    {
      heading: { en: 'The performance problem you must mention', hi: 'Wo performance problem jo batani zaroori hai' },
      body: {
        en: 'Every consumer re-renders when the context value changes, and there is no way to subscribe to part of it. Pass an inline object and that is every single render, because the object is a new reference each time.',
        hi: 'Context ki value badalne pe har consumer re-render hota hai, aur uske kisi hisse ko subscribe karne ka koi tareeka nahi. Inline object doge toh ye har render pe hoga, kyunki har baar naya reference banta hai.',
      },
      code: `<Ctx value={{ user, setUser }}>          // ✗ new object every render

const v = useMemo(() => ({ user, setUser }), [user]);
<Ctx value={v}>                          // ✓`,
    },
    {
      heading: { en: 'Split contexts by update frequency', hi: 'Context ko badalne ki raftaar se baanto' },
      body: {
        en: 'The standard fix. Keep the value that changes in one context and the stable setters in another. Components that only dispatch then never re-render when the value changes.',
        hi: 'Standard ilaaj. Jo value badalti hai wo ek context mein rakho aur sthir setters doosre mein. Phir jo components sirf dispatch karte hain wo value badalne pe kabhi re-render nahi honge.',
      },
      code: `<StateContext value={state}>
  <DispatchContext value={dispatch}>   {/* dispatch is stable */}
    {children}
  </DispatchContext>
</StateContext>`,
    },
    {
      heading: { en: 'Context is not a state manager', hi: 'Context state manager nahi hai' },
      body: {
        en: 'It is a transport mechanism — it moves a value down the tree and nothing more. The state still lives in useState or useReducer above it. Say this clearly; conflating the two is the most common misconception about Context.',
        hi: 'Ye ek zariya hai — wo value ko tree mein neeche le jaata hai, bas. State abhi bhi uske upar useState ya useReducer mein rehti hai. Ye saaf kaho; dono ko mila dena Context ke baare mein sabse aam galatfehmi hai.',
      },
    },
    {
      heading: { en: 'When to reach for something else', hi: 'Kab kuch aur uthana chahiye' },
      body: {
        en: 'When the value updates many times a second, when you need selector-based subscriptions, or when the state is large and widely read. Zustand and Jotai give you subscriptions to a slice; a query cache is the right home for server data.',
        hi: 'Jab value second mein kai baar badle, jab selector-based subscriptions chahiye, ya jab state badi ho aur door-door tak padhi jaaye. Zustand aur Jotai kisi hisse ko subscribe karne dete hain; server data ka sahi ghar query cache hai.',
      },
    },
  ],

  /* ─── Modern React: RSC, concurrency, the compiler ────────── */

  'What is the difference between Server Components and Client Components?': [
    {
      heading: { en: 'Where the component runs, and what ships', hi: 'Component kahan chalta hai, aur bhejta kya hai' },
      body: {
        en: 'A Server Component runs only on the server, during the request or the build. It never reaches the browser — not the component, not its imports. A Client Component runs on the server for the initial HTML and then again in the browser, so its code must be downloaded.',
        hi: 'Server Component sirf server pe chalta hai, request ya build ke waqt. Wo browser tak pahunchta hi nahi — na component, na uske imports. Client Component pehle HTML ke liye server pe chalta hai aur phir browser mein bhi, isliye uska code download karna padta hai.',
      },
      diagram: `Server Component     runs on server → sends rendered output
                     JS shipped: ZERO

Client Component     runs on server (HTML) + browser (hydrate)
                     JS shipped: the component and its imports`,
    },
    {
      heading: { en: 'Server is the default; you opt into client', hi: 'Default server hai; client tumhe chunna padta hai' },
      body: {
        en: 'In an app using RSC, every component is a Server Component unless the file starts with "use client". That directive marks the boundary — everything imported below it also becomes client code.',
        hi: 'RSC wale app mein har component Server Component hai jab tak file "use client" se shuru na ho. Wo directive seema banati hai — uske neeche import hui har cheez bhi client code ban jaati hai.',
      },
      code: `// app/page.jsx — a Server Component by default
export default async function Page() {
  const posts = await db.posts.findMany();   // ✓ direct DB access
  return <List posts={posts} />;
}

// Counter.jsx
'use client';
export function Counter() { const [n, setN] = useState(0); }`,
    },
    {
      heading: { en: 'What Server Components can do', hi: 'Server Components kya kar sakte hain' },
      body: {
        en: 'Be async and await directly in the component body. Query a database or read a file with no API layer. Use secrets and API keys safely, because the code never reaches the client. And import a heavy library — a markdown parser, a syntax highlighter — with zero bundle cost.',
        hi: 'Async ho sakte hain aur component body mein seedha await kar sakte hain. Bina API layer ke database query ya file padh sakte hain. Secrets aur API keys safely use kar sakte hain, kyunki code client tak jaata hi nahi. Aur koi bhaari library import kar sakte hain — markdown parser, syntax highlighter — bina bundle ki keemat ke.',
      },
    },
    {
      heading: { en: 'What they cannot do', hi: 'Ye kya nahi kar sakte' },
      body: {
        en: 'No hooks — no useState, useEffect, useContext or useRef. No event handlers. No browser APIs. Nothing interactive at all, because there is no JavaScript on the client to run it.',
        hi: 'Koi hooks nahi — na useState, na useEffect, na useContext, na useRef. Koi event handlers nahi. Koi browser APIs nahi. Kuch bhi interactive nahi, kyunki client pe usse chalane ke liye JavaScript hai hi nahi.',
      },
      code: `// ✗ in a Server Component
<button onClick={fn}>        // Error: event handlers cannot be passed
useState(0);                  // Error: hooks are not supported`,
    },
    {
      heading: { en: 'The boundary rule that catches people', hi: 'Wo seema wala rule jo logon ko pakadta hai' },
      body: {
        en: 'A Client Component cannot IMPORT a Server Component — but it can RECEIVE one as children. That is the composition pattern that keeps interactive shells thin while their contents stay on the server.',
        hi: 'Client Component kisi Server Component ko IMPORT nahi kar sakta — par usse children ki tarah LE sakta hai. Yahi composition pattern interactive shells ko patla rakhta hai jabki unka content server pe rehta hai.',
      },
      code: `// ✗ ClientTabs.jsx imports a server component
import ServerChart from './ServerChart';

// ✓ pass it in from a Server Component instead
<ClientTabs>
  <ServerChart />       {/* stays on the server */}
</ClientTabs>`,
    },
    {
      heading: { en: 'Props must be serialisable', hi: 'Props serialisable hone chahiye' },
      body: {
        en: 'Anything a Server Component passes to a Client Component crosses the network, so it must serialise. Objects, arrays, dates and JSX are fine; functions, class instances and Symbols are not — except Server Actions, which are passed by reference.',
        hi: 'Server Component se Client Component ko jo bhi jaata hai wo network paar karta hai, isliye serialise hona chahiye. Objects, arrays, dates aur JSX theek hain; functions, class instances aur Symbols nahi — sivaay Server Actions ke, jo reference se jaate hain.',
      },
      code: `<Client onClick={() => {}} />     // ✗ a function cannot serialise
<Client action={serverAction} />   // ✓ a Server Action can`,
    },
    {
      heading: { en: 'RSC is not SSR', hi: 'RSC, SSR nahi hai' },
      body: {
        en: 'The distinction interviewers probe. SSR renders your whole app to HTML and then hydrates all of it in the browser. RSC decides per component whether any JavaScript ships at all. They compose — you can use both — but they solve different problems.',
        hi: 'Interviewers yahi farq kuredte hain. SSR poore app ko HTML mein render karta hai aur phir sab kuch browser mein hydrate karta hai. RSC har component ke liye tay karta hai ki JavaScript bhejni bhi hai ya nahi. Ye saath chalte hain — dono use kar sakte ho — par alag problems hal karte hain.',
      },
    },
  ],

  'What problem does useTransition solve?': [
    {
      heading: { en: 'Keeping the UI responsive during a slow update', hi: 'Dheeme update ke dauraan UI ko jawab dene laayak rakhna' },
      body: {
        en: 'Some state updates cause an expensive re-render — filtering ten thousand rows, switching a heavy tab. Because rendering is synchronous by default, the browser cannot paint until it finishes, so typing feels frozen. useTransition marks that update as interruptible.',
        hi: 'Kuch state updates mehnga re-render karwaate hain — das hazaar rows filter karna, bhaari tab badalna. Default se rendering synchronous hai, isliye browser tab tak paint nahi kar sakta jab tak wo khatam na ho, toh typing jami hui lagti hai. useTransition us update ko rokne laayak bana deta hai.',
      },
      code: `const [isPending, startTransition] = useTransition();

function onChange(e) {
  setQuery(e.target.value);                        // urgent
  startTransition(() => setResults(filter(e.target.value)));  // not
}`,
    },
    {
      heading: { en: 'Two priorities, not two speeds', hi: 'Do priorities, do raftaar nahi' },
      body: {
        en: 'The transition does not make filtering faster. It tells React that this update may be interrupted and restarted if something more urgent arrives — like the next keystroke. The input stays responsive because its update is allowed to jump the queue.',
        hi: 'Transition filtering ko tez nahi karta. Wo React ko batata hai ki is update ko roka aur dobara shuru kiya ja sakta hai agar koi zyada zaroori cheez aa jaaye — jaise agla keystroke. Input isliye chalta rehta hai kyunki uske update ko line todne ki ijaazat hai.',
      },
      diagram: `without a transition
type ─► filter 10k rows ───────────► paint    input frozen

with a transition
type ─► paint input ─► start filter ─┐
type ─► paint input ─► restart filter │  interruptible
                       ─► paint results`,
    },
    {
      heading: { en: 'isPending is the other half', hi: 'Doosra hissa isPending hai' },
      body: {
        en: 'It is true while the transition is rendering, so you can dim the stale content or show a subtle spinner without blocking. The old UI stays on screen and interactive the whole time — that is the point.',
        hi: 'Jab tak transition render ho raha hai ye true rehta hai, toh tum purane content ko halka kar sakte ho ya halka spinner dikha sakte ho, bina roke. Purana UI poore samay screen pe rehta hai aur chalta rehta hai — asli baat yahi hai.',
      },
      code: `<div style={{ opacity: isPending ? 0.6 : 1 }}>
  <Results items={results} />
</div>`,
    },
    {
      heading: { en: 'The urgent update must stay outside', hi: 'Zaroori update bahar hi rehna chahiye' },
      body: {
        en: 'This is the mistake people make. Wrap the input value in the transition too and the input itself becomes laggy — the whole benefit is that one update is urgent and the other is not.',
        hi: 'Log yahi galti karte hain. Input ki value ko bhi transition mein daal do toh input khud atakne lagta hai — poora fayda hi ye hai ki ek update zaroori hai aur doosra nahi.',
      },
      code: `startTransition(() => {
  setQuery(value);        // ✗ now typing lags
  setResults(filter(value));
});`,
    },
    {
      heading: { en: 'It must be synchronous inside', hi: 'Iske andar synchronous hona zaroori hai' },
      body: {
        en: 'The classic gotcha. Updates scheduled after an await inside startTransition are no longer part of the transition. In React 19 async transitions are supported for Actions, but a plain setTimeout still escapes.',
        hi: 'Classic jaal. startTransition ke andar await ke baad schedule hue updates ab transition ka hissa nahi rehte. React 19 mein Actions ke liye async transitions chalte hain, par saada setTimeout ab bhi bahar nikal jaata hai.',
      },
      code: `startTransition(() => {
  setTimeout(() => setResults(x), 0);   // ✗ not in the transition
});`,
    },
    {
      heading: { en: 'React 19 uses it for Actions', hi: 'React 19 isse Actions ke liye use karta hai' },
      body: {
        en: 'An async function passed to a form action or useActionState runs inside a transition automatically, which is where isPending in useActionState comes from. So you often get this behaviour without calling the hook yourself.',
        hi: 'Form action ya useActionState ko diya gaya async function apne aap transition ke andar chalta hai, aur useActionState ka isPending wahin se aata hai. Toh ye behaviour aksar bina khud hook bulaaye mil jaata hai.',
      },
    },
    {
      heading: { en: 'When not to use it', hi: 'Isse kab use nahi karna' },
      body: {
        en: 'If the update is fast, a transition adds overhead for nothing. And it is not a substitute for fixing an actually slow render — virtualise the list or memoise the computation first, then use a transition for what remains.',
        hi: 'Agar update tez hai toh transition bekaar mein overhead jodta hai. Aur ye sach mein dheeme render ko theek karne ka vikalp nahi — pehle list virtualise karo ya computation memoise karo, phir jo bache uske liye transition lo.',
      },
    },
  ],

  'What is the difference between useTransition and useDeferredValue?': [
    {
      heading: { en: 'Same goal, different handle', hi: 'Maqsad ek, pakad alag' },
      body: {
        en: 'Both keep the UI responsive by letting an expensive update happen at lower priority. useTransition wraps the UPDATE — you control when it is dispatched. useDeferredValue wraps the VALUE — you get a copy that lags behind.',
        hi: 'Dono UI ko chalta rakhte hain, mehnga update kam priority pe karwa kar. useTransition UPDATE ko lapetta hai — tum tay karte ho wo kab bheja jaaye. useDeferredValue VALUE ko lapetta hai — tumhe ek copy milti hai jo peeche chalti hai.',
      },
      code: `// useTransition — you own the setter
const [isPending, startTransition] = useTransition();
startTransition(() => setResults(filter(q)));

// useDeferredValue — you only have the value
const deferredQ = useDeferredValue(q);
const results = useMemo(() => filter(deferredQ), [deferredQ]);`,
    },
    {
      heading: { en: 'The rule for choosing', hi: 'Chunne ka rule' },
      body: {
        en: 'If you control the state update, use useTransition. If the value arrives as a prop, or comes from a hook you do not own, use useDeferredValue — there is no setter to wrap.',
        hi: 'Agar state update tumhare haath mein hai toh useTransition. Agar value prop ke roop mein aati hai, ya kisi aise hook se jo tumhara nahi, toh useDeferredValue — lapetne ko koi setter hai hi nahi.',
      },
      diagram: `do you own the setState call?
   yes ──► useTransition
   no  ──► useDeferredValue`,
    },
    {
      heading: { en: 'How deferring actually behaves', hi: 'Deferring asal mein kaise chalta hai' },
      body: {
        en: 'On the first render after a change, useDeferredValue returns the PREVIOUS value, then re-renders in the background with the new one. So the expensive part renders with stale data for one pass while the fast part is already up to date.',
        hi: 'Badlaav ke baad pehle render mein useDeferredValue PICHHLI value deta hai, phir background mein nayi ke saath dobara render karta hai. Toh mehnga hissa ek chakkar ke liye purane data se render hota hai jabki tez hissa pehle hi naya ho chuka hota hai.',
      },
      code: `q = 'react'          input shows 'react' immediately
deferredQ = 'reac'   list still shows the previous results
                     → then re-renders with 'react'`,
    },
    {
      heading: { en: 'Detecting the stale state', hi: 'Purani state pehchanna' },
      body: {
        en: 'useTransition gives you isPending directly. useDeferredValue does not, so you compare the two values yourself. That comparison is the idiomatic way to dim stale content.',
        hi: 'useTransition seedha isPending deta hai. useDeferredValue nahi, toh dono values khud compare karo. Purane content ko halka karne ka aam tareeka yahi comparison hai.',
      },
      code: `const isStale = q !== deferredQ;
<div style={{ opacity: isStale ? 0.5 : 1 }}>…</div>`,
    },
    {
      heading: { en: 'Both need a memoised child to help', hi: 'Dono ko madad ke liye memoised bachcha chahiye' },
      body: {
        en: 'A commonly missed detail. If the expensive component re-renders regardless, deferring the value achieves nothing. Wrap it in memo, or memoise the computation, so the old render can actually be reused.',
        hi: 'Aksar chhoot jaane wali baat. Agar mehnga component waise bhi re-render hota hai, toh value defer karne se kuch nahi milta. Usse memo mein lapeto, ya computation memoise karo, taaki purana render sach mein dobara kaam aa sake.',
      },
      code: `const List = memo(function List({ q }) { … });
<List q={deferredQ} />         // ✓ memo lets React skip the re-render`,
    },
    {
      heading: { en: 'Neither is a debounce', hi: 'Koi bhi debounce nahi hai' },
      body: {
        en: 'A good closing point. Debounce waits a fixed number of milliseconds and drops work in between. These two start the work immediately and interrupt it if something more urgent arrives — so they adapt to the device instead of guessing a delay.',
        hi: 'Achhi aakhri baat. Debounce ek tay milliseconds tak intezaar karta hai aur beech ka kaam gira deta hai. Ye dono kaam turant shuru karte hain aur zyada zaroori cheez aane pe rok dete hain — toh ye delay ka andaaza lagane ki jagah device ke hisaab se dhalte hain.',
      },
    },
  ],

  'What does the use hook do?': [
    {
      heading: { en: 'Read a promise or a context during render', hi: 'Render ke dauraan promise ya context padho' },
      body: {
        en: 'use is a React 19 API that unwraps a resource. Give it a promise and it suspends until the promise resolves, then returns the value. Give it a context and it returns the context value, exactly like useContext.',
        hi: 'use React 19 ka ek API hai jo kisi resource ko kholta hai. Usse promise do toh wo promise ke poora hone tak suspend karta hai, phir value deta hai. Context do toh context ki value deta hai, bilkul useContext ki tarah.',
      },
      code: `function Profile({ userPromise }) {
  const user = use(userPromise);      // suspends until resolved
  return <h1>{user.name}</h1>;
}

const theme = use(ThemeContext);      // same as useContext`,
    },
    {
      heading: { en: 'It breaks the rules of hooks, on purpose', hi: 'Ye jaan-boojh kar hooks ke rules todta hai' },
      body: {
        en: 'This is the headline. use may be called conditionally, inside an if, or after an early return. It is not a hook in the usual sense — React handles it specially, which is why the name has no "use" prefix convention attached to slot ordering.',
        hi: 'Yahi mukhya baat hai. use ko shart ke saath, if ke andar, ya early return ke baad bhi call kar sakte ho. Ye aam maayne mein hook nahi hai — React isse khaas tareeke se sambhaalta hai, isiliye ispe slot order wala niyam lagta hi nahi.',
      },
      code: `function C({ show, promise }) {
  if (show) {
    const data = use(promise);    // ✓ allowed — unlike every other hook
    return <p>{data}</p>;
  }
  return null;
}`,
    },
    {
      heading: { en: 'It needs Suspense around it', hi: 'Iske aas-paas Suspense chahiye' },
      body: {
        en: 'When use suspends, React looks for the nearest Suspense boundary and shows its fallback. Without one, the suspension propagates to the root and you get an error. Pair it with an error boundary for the rejection case.',
        hi: 'Jab use suspend karta hai, React sabse paas ki Suspense boundary dhoondhta hai aur uska fallback dikhata hai. Boundary na ho toh suspension root tak pahunch jaata hai aur error milta hai. Rejection ke liye iske saath error boundary rakho.',
      },
      code: `<ErrorBoundary fallback={<Failed />}>
  <Suspense fallback={<Skeleton />}>
    <Profile userPromise={promise} />
  </Suspense>
</ErrorBoundary>`,
    },
    {
      heading: { en: 'Do not create the promise during render', hi: 'Render ke dauraan promise mat banao' },
      body: {
        en: 'The critical mistake. Calling fetch inside the component body creates a NEW promise on every render, so use suspends forever in a loop. The promise must come from a cache, a framework loader, or a Server Component prop.',
        hi: 'Sabse badi galti. Component body mein fetch bulane se har render pe NAYA promise banta hai, toh use hamesha ke liye loop mein suspend karta rehta hai. Promise kisi cache, framework loader, ya Server Component ke prop se aana chahiye.',
      },
      code: `function Bad() {
  const data = use(fetch('/api'));   // ✗ infinite suspension
}

// ✓ created on the server, passed down
async function Page() {
  const promise = getUser();         // NOT awaited
  return <Suspense><Profile userPromise={promise} /></Suspense>;
}`,
    },
    {
      heading: { en: 'The pattern it enables', hi: 'Ye kaunsa pattern deta hai' },
      body: {
        en: 'A Server Component can start a fetch without awaiting it and pass the promise to a Client Component. The server sends HTML immediately and streams the data in when it is ready — no waterfall, and no loading state written by hand.',
        hi: 'Server Component fetch shuru kar sakta hai bina await kiye aur promise ko Client Component ko de sakta hai. Server turant HTML bhej deta hai aur data taiyaar hone pe stream kar deta hai — na waterfall, na haath se likhi loading state.',
      },
    },
    {
      heading: { en: 'Why it replaces useContext', hi: 'Ye useContext ki jagah kyun leta hai' },
      body: {
        en: 'Because it can be called conditionally, use lets you read a context only when you need it — inside a branch, after a guard. useContext still works and is not deprecated, but use is strictly more flexible.',
        hi: 'Ye shart ke saath call ho sakta hai, isliye use tumhe context sirf zaroorat pe padhne deta hai — kisi branch ke andar, guard ke baad. useContext ab bhi chalta hai aur deprecated nahi hai, par use sakht taur pe zyada lachila hai.',
      },
    },
  ],

  'What is the React Compiler and what does it change?': [
    {
      heading: { en: 'A build-time optimiser for React code', hi: 'React code ke liye build-time optimiser' },
      body: {
        en: 'The React Compiler is a Babel plugin that analyses your components and inserts memoisation automatically. It works out which values depend on which, and caches everything that does not need recomputing — without you writing a single hook for it.',
        hi: 'React Compiler ek Babel plugin hai jo tumhare components ko padh kar apne aap memoisation daal deta hai. Wo nikaal leta hai kaunsi value kis pe depend karti hai, aur jo dobara banane ki zaroorat nahi wo cache kar leta hai — bina tumhare ek bhi hook likhe.',
      },
      code: `// you write
function List({ items, filter }) {
  const visible = items.filter((i) => i.type === filter);
  return visible.map((i) => <Row key={i.id} item={i} />);
}

// the compiler emits the equivalent of a useMemo around the filter`,
    },
    {
      heading: { en: 'What it removes from your code', hi: 'Ye tumhare code se kya hataata hai' },
      body: {
        en: 'Most manual useMemo, useCallback and React.memo. Those exist only because React could not know what was safe to cache. The compiler can, so the hand-written versions become noise.',
        hi: 'Haath se likha zyadatar useMemo, useCallback aur React.memo. Ye isliye the kyunki React ko pata hi nahi tha kya cache karna safe hai. Compiler ko pata hai, toh haath se likhe roop shor ban jaate hain.',
      },
      code: `// before
const onClick = useCallback(() => save(id), [id]);
const rows = useMemo(() => build(data), [data]);
export default memo(Component);

// after
const onClick = () => save(id);
const rows = build(data);
export default Component;`,
    },
    {
      heading: { en: 'It memoises more finely than you would', hi: 'Ye tumse zyada bareeki se memoise karta hai' },
      body: {
        en: 'A hand-written useMemo caches one expression with one dependency array you maintained by hand. The compiler tracks dependencies precisely and caches at the granularity of individual values — including intermediate ones you never thought to wrap.',
        hi: 'Haath se likha useMemo ek expression ko us dependency array ke saath cache karta hai jise tumne khud rakha. Compiler dependencies theek-theek track karta hai aur alag-alag values ke star pe cache karta hai — un beech ki values samet jinhe lapetne ka khayal bhi nahi aaya.',
      },
    },
    {
      heading: { en: 'It only works if your code follows the rules', hi: 'Ye tabhi chalta hai jab tumhara code rules maane' },
      body: {
        en: 'The compiler must assume components are pure and props and state are not mutated. If a component breaks the Rules of React, the compiler detects it and SKIPS that component rather than producing wrong output. So the rules stop being advice and become the price of admission.',
        hi: 'Compiler ko maanna padta hai ki components pure hain aur props aur state mutate nahi hote. Agar koi component Rules of React tode, toh compiler usse pehchaan kar us component ko CHHOD deta hai, galat output dene ki jagah. Toh rules ab salaah nahi, andar aane ki keemat hain.',
      },
      code: `function Impure({ items }) {
  items.push('x');        // ✗ mutating a prop
  return …;               // the compiler bails out on this component
}`,
    },
    {
      heading: { en: 'What it does NOT do', hi: 'Ye kya NAHI karta' },
      body: {
        en: 'It does not make React itself faster, does not reduce bundle size, does not fix a slow algorithm, and does not remove the need for virtualisation, code splitting or a sensible data layer. It removes one specific category of manual work.',
        hi: 'Ye React ko khud tez nahi karta, bundle size kam nahi karta, dheeme algorithm ko theek nahi karta, aur virtualisation, code splitting ya samajhdaar data layer ki zaroorat khatam nahi karta. Ye haath ke kaam ki ek khaas shreni hataata hai.',
      },
    },
    {
      heading: { en: 'Adopting it', hi: 'Isse apnana' },
      body: {
        en: 'Add the Babel plugin, run the ESLint rule to find components that break the rules, and enable it incrementally by directory. It is designed to be safe: when in doubt, it leaves your component exactly as written.',
        hi: 'Babel plugin jodo, ESLint rule chala kar wo components dhoondho jo rules todte hain, aur directory ke hisaab se dhire-dhire chaalu karo. Ye safe rehne ke liye bana hai: shak ho toh wo tumhara component bilkul waisa hi chhod deta hai jaisa likha hai.',
      },
    },
  ],

  'What are the Rules of React and why do they matter more now?': [
    {
      heading: { en: 'Components and hooks must be pure', hi: 'Components aur hooks pure hone chahiye' },
      body: {
        en: 'Given the same props, state and context, a component must return the same output and cause no side effects while rendering. No mutating props, no writing to a ref during render, no fetching, no DOM changes, no random or Date.now in the render body.',
        hi: 'Wahi props, state aur context pe component wahi output dena chahiye aur render ke dauraan koi side effect nahi karna chahiye. Na props mutate karna, na render ke waqt ref mein likhna, na fetch, na DOM badalna, na render body mein random ya Date.now.',
      },
      code: `function Bad({ items }) {
  items.push('x');            // ✗ mutating a prop
  document.title = 'hi';      // ✗ side effect during render
  return <p>{Math.random()}</p>;   // ✗ not deterministic
}`,
    },
    {
      heading: { en: 'Props and state are immutable', hi: 'Props aur state immutable hain' },
      body: {
        en: 'Never assign to a prop, and never modify a state value in place. Always produce a new object or array. Mutation makes React miss the change, because it compares by reference.',
        hi: 'Kisi prop mein kabhi assign mat karo, aur state value ko wahin mat badlo. Hamesha naya object ya array banao. Mutation se React badlaav chook jaata hai, kyunki wo reference se compare karta hai.',
      },
      code: `props.title = 'x';               // ✗ never
state.items.push(x);              // ✗
setItems([...items, x]);          // ✓`,
    },
    {
      heading: { en: 'Side effects belong in effects and handlers', hi: 'Side effects, effects aur handlers mein hain' },
      body: {
        en: 'Anything that touches the world outside React — a network call, localStorage, the document title, a subscription — goes in an event handler if a user caused it, or in useEffect if it is synchronisation with an external system.',
        hi: 'Jo bhi React ke bahar ki duniya ko chhue — network call, localStorage, document title, subscription — wo event handler mein jaata hai agar user ne karwaya, ya useEffect mein agar wo kisi bahari system se taal-mel hai.',
      },
    },
    {
      heading: { en: 'The rules of hooks are part of this', hi: 'Hooks ke rules isi ka hissa hain' },
      body: {
        en: 'Call hooks only at the top level and only from React functions. Do not call a component as a plain function, and do not pass a hook around as a value. React relies on a stable call order to match state to hooks.',
        hi: 'Hooks sirf sabse upar wale level pe aur sirf React functions se bulao. Kisi component ko saade function ki tarah mat bulao, aur hook ko value ki tarah mat ghumao. React state ko hooks se milane ke liye ek sthir call order pe nirbhar hai.',
      },
      code: `Component();          // ✗ call it as <Component />
const h = useState;    // ✗ do not pass hooks around`,
    },
    {
      heading: { en: 'Why they matter more now: concurrency', hi: 'Ab ye zyada kyun maayne rakhte hain: concurrency' },
      body: {
        en: 'React may start rendering, abandon the work, and start again — or render in the background for a transition. An impure component produces different output on the second attempt, or performs its side effect twice. Code that "worked" in React 17 can break silently.',
        hi: 'React render shuru karke kaam chhod sakta hai aur dobara shuru kar sakta hai — ya transition ke liye background mein render kar sakta hai. Impure component doosri koshish mein alag output deta hai, ya apna side effect do baar karta hai. Jo code React 17 mein "chalta tha" wo chup-chaap toot sakta hai.',
      },
    },
    {
      heading: { en: 'And because the compiler assumes them', hi: 'Aur isliye ki compiler inhe maan kar chalta hai' },
      body: {
        en: 'This is the newer reason. The React Compiler can only cache safely if your components are pure. Break a rule and the compiler bails out of that component, so you silently lose the optimisation while everyone else gets it.',
        hi: 'Ye nayi wajah hai. React Compiler tabhi safely cache kar sakta hai jab tumhare components pure hon. Rule todo toh compiler us component ko chhod deta hai, toh tum chup-chaap optimisation kho dete ho jabki baaki sabko milti hai.',
      },
    },
    {
      heading: { en: 'How StrictMode helps you find violations', hi: 'StrictMode violations dhoondhne mein kaise madad karta hai' },
      body: {
        en: 'It double-invokes components, initialisers and updaters, and it mounts, unmounts and remounts every component. If a double call changes your output or your app breaks on remount, you have found an impurity. That is exactly what it is for.',
        hi: 'Wo components, initialisers aur updaters ko do baar bulaata hai, aur har component ko mount, unmount, dobara mount karta hai. Double call se output badle ya remount pe app toote, toh tumne impurity dhoondh li. Wo isi ke liye hai.',
      },
    },
  ],

  'What is Suspense and what can it do now?': [
    {
      heading: { en: 'A boundary that shows a fallback while children are not ready', hi: 'Ek seema jo children ke taiyaar na hone tak fallback dikhati hai' },
      body: {
        en: 'Suspense wraps part of the tree. If anything inside suspends — because it is waiting on code or data — React shows the fallback instead, and swaps in the real content when it is ready. You write no loading state yourself.',
        hi: 'Suspense tree ka ek hissa lapetta hai. Uske andar kuch bhi suspend kare — code ya data ka intezaar karte hue — toh React uski jagah fallback dikha deta hai, aur taiyaar hone pe asli content laga deta hai. Tum khud koi loading state nahi likhte.',
      },
      code: `<Suspense fallback={<Skeleton />}>
  <Comments />
</Suspense>`,
    },
    {
      heading: { en: 'What can suspend', hi: 'Kya suspend kar sakta hai' },
      body: {
        en: 'Originally only React.lazy for code splitting. Now also: the use hook reading a promise, data fetching in a framework such as Next.js, and Server Components streaming from the server. Anything that throws a promise during render.',
        hi: 'Shuru mein sirf code splitting ke liye React.lazy. Ab ye bhi: promise padhta hua use hook, Next.js jaise framework mein data fetching, aur server se stream hote Server Components. Har wo cheez jo render ke dauraan promise phenkti hai.',
      },
      code: `const Heavy = lazy(() => import('./Heavy'));   // code
const data = use(promise);                      // data`,
    },
    {
      heading: { en: 'It is declarative loading', hi: 'Ye declarative loading hai' },
      body: {
        en: 'That is the real win. Instead of an isLoading flag in every component, you place a boundary where you want a placeholder and React handles the rest. The loading UI becomes a layout decision rather than component state.',
        hi: 'Asli jeet yahi hai. Har component mein isLoading flag ki jagah, tum wahan boundary rakh dete ho jahan placeholder chahiye aur baaki React sambhaal leta hai. Loading UI component ki state nahi, layout ka faisla ban jaata hai.',
      },
      code: `// before
{isLoading ? <Skeleton /> : <Comments data={data} />}

// after — the component does not know it is loading
<Suspense fallback={<Skeleton />}><Comments /></Suspense>`,
    },
    {
      heading: { en: 'Streaming SSR is the biggest use today', hi: 'Aaj sabse bada upyog streaming SSR hai' },
      body: {
        en: 'On the server, a Suspense boundary lets React send the surrounding HTML immediately and stream the slow part in later. The user sees the page shell at once instead of waiting for the slowest query.',
        hi: 'Server pe Suspense boundary React ko aas-paas ka HTML turant bhejne deti hai aur dheema hissa baad mein stream karti hai. User ko page ka dhaancha turant dikhta hai, sabse dheemi query ka intezaar nahi karna padta.',
      },
      diagram: `HTML sent immediately     ─► header, nav, sidebar
Suspense boundary          ─► <Skeleton />
…query finishes…           ─► streamed in, swapped by React`,
    },
    {
      heading: { en: 'Boundary placement is a design decision', hi: 'Boundary kahan rakhni hai ye design ka faisla hai' },
      body: {
        en: 'One boundary around the whole page means everything waits for the slowest part. Several smaller boundaries let fast sections appear immediately. Place them where a meaningful chunk of UI can appear on its own.',
        hi: 'Poore page ke aas-paas ek boundary matlab sab kuch sabse dheeme hisse ka intezaar karega. Kai chhoti boundaries tez hisson ko turant dikha deti hain. Unhe wahan rakho jahan UI ka koi matlab wala tukda apne aap aa sake.',
      },
    },
    {
      heading: { en: 'Suspense does not catch errors', hi: 'Suspense errors nahi pakadta' },
      body: {
        en: 'It handles the pending state only. A rejected promise needs an error boundary, so the two are almost always used together. Forgetting the error boundary is the most common mistake with data Suspense.',
        hi: 'Ye sirf pending state sambhaalta hai. Reject hue promise ke liye error boundary chahiye, isliye dono lagbhag hamesha saath use hote hain. Data Suspense ke saath sabse aam galti error boundary bhool jaana hai.',
      },
      code: `<ErrorBoundary fallback={<Failed />}>
  <Suspense fallback={<Skeleton />}>
    <Data />
  </Suspense>
</ErrorBoundary>`,
    },
    {
      heading: { en: 'The transition interaction', hi: 'Transition ke saath rishta' },
      body: {
        en: 'If a suspending update happens inside startTransition, React keeps the existing content on screen instead of falling back to the skeleton. That prevents a jarring flash when navigating between already-rendered views.',
        hi: 'Agar suspend karne wala update startTransition ke andar ho, toh React maujooda content screen pe rehne deta hai, skeleton pe wapas nahi jaata. Isse pehle se render ho chuke views ke beech ghoomte waqt chubhne wala jhatka nahi aata.',
      },
    },
  ],

  'What is an error boundary and what does it not catch?': [
    {
      heading: { en: 'A component that catches render errors below it', hi: 'Aisa component jo apne neeche ke render errors pakadta hai' },
      body: {
        en: 'An error boundary catches a JavaScript error thrown anywhere in its child tree during rendering, in a lifecycle method, or in a constructor. It logs the error and shows a fallback UI instead of unmounting the whole app.',
        hi: 'Error boundary apne child tree mein kahin bhi render ke dauraan, kisi lifecycle method mein, ya constructor mein phenka gaya JavaScript error pakadta hai. Wo error log karta hai aur poore app ko unmount karne ki jagah fallback UI dikhata hai.',
      },
      code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { logToService(error, info); }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}`,
    },
    {
      heading: { en: 'The two methods do different jobs', hi: 'Dono methods ka kaam alag hai' },
      body: {
        en: 'getDerivedStateFromError is static and pure — it only computes the fallback state during render. componentDidCatch runs after commit and is where side effects belong, such as reporting to Sentry. Interviewers ask which does what.',
        hi: 'getDerivedStateFromError static aur pure hai — wo sirf render ke dauraan fallback state banata hai. componentDidCatch commit ke baad chalta hai aur side effects wahin jaate hain, jaise Sentry ko batana. Interviewers poochte hain kaunsa kya karta hai.',
      },
    },
    {
      heading: { en: 'It must be a class', hi: 'Ye class honi hi chahiye' },
      body: {
        en: 'There is still no hook equivalent, so this is the one thing you cannot write as a function component. In practice most teams use react-error-boundary, which wraps a class and gives you a hook-friendly API.',
        hi: 'Iska abhi bhi koi hook nahi hai, toh yahi ek cheez hai jo function component ki tarah nahi likh sakte. Asal mein zyadatar teams react-error-boundary use karti hain, jo ek class lapet kar hook-friendly API deti hai.',
      },
      code: `import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary FallbackComponent={Failed} onReset={refetch}>
  <App />
</ErrorBoundary>`,
    },
    {
      heading: { en: 'The four things it does NOT catch', hi: 'Chaar cheezein jo ye NAHI pakadta' },
      body: {
        en: 'This is the real question. Errors in event handlers. Errors in asynchronous code such as setTimeout or a promise callback. Errors during server-side rendering. And errors thrown in the boundary itself. Nothing outside the render phase is covered.',
        hi: 'Asli sawaal yahi hai. Event handlers ke errors. Async code ke errors jaise setTimeout ya promise callback. Server-side rendering ke dauraan aane wale errors. Aur khud boundary ke andar phenke gaye errors. Render phase ke bahar kuch bhi cover nahi hota.',
      },
      diagram: `caught             NOT caught
render             event handlers
constructor        setTimeout / promises
lifecycle methods  server-side rendering
                   the boundary's own errors`,
    },
    {
      heading: { en: 'Why event handlers are excluded', hi: 'Event handlers bahar kyun hain' },
      body: {
        en: 'They run outside the render phase, so React is not on the stack and cannot intercept the throw. Nothing is broken about the UI either — so try/catch in the handler is the correct tool, and you set error state yourself.',
        hi: 'Wo render phase ke bahar chalte hain, toh React stack pe nahi hota aur throw pakad nahi sakta. UI mein kuch toota bhi nahi hai — toh handler mein try/catch hi sahi auzaar hai, aur error state tum khud set karte ho.',
      },
      code: `async function onSave() {
  try { await api.save(); }
  catch (e) { setError(e.message); }   // ✓ handle it here
}`,
    },
    {
      heading: { en: 'Placement matters', hi: 'Jagah maayne rakhti hai' },
      body: {
        en: 'One boundary at the root turns any error into a blank page. Several smaller boundaries — one per route, one per widget — let the rest of the app keep working. Granularity is the design decision the question is really about.',
        hi: 'Root pe ek boundary har error ko khaali page bana deti hai. Kai chhoti boundaries — har route pe ek, har widget pe ek — baaki app ko chalta rehne deti hain. Sawaal asal mein isi bareeki ke faisle ke baare mein hai.',
      },
    },
    {
      heading: { en: 'Uncaught errors unmount everything', hi: 'Bina pakde errors sab kuch unmount kar dete hain' },
      body: {
        en: 'Since React 16, an error with no boundary above it unmounts the entire tree. That is deliberate — a corrupted UI is considered worse than no UI. It is also the reason every production app needs at least one boundary.',
        hi: 'React 16 se, jis error ke upar koi boundary nahi hoti wo poora tree unmount kar deta hai. Ye jaan-boojh kar hai — kharaab UI ko UI na hone se bura maana gaya. Aur isiliye har production app ko kam se kam ek boundary chahiye.',
      },
    },
  ],

  /* ─── State decisions, effects and testing ────────────────── */

  'How do you decide between local state, Context, and a state library?': [
    {
      heading: { en: 'First split client state from server state', hi: 'Pehle client state ko server state se alag karo' },
      body: {
        en: 'Before choosing anything, ask where the data comes from. Data that lives on a server — users, posts, orders — is a CACHE, not state, and belongs in a query library. Getting this wrong is why so many apps have a bloated store.',
        hi: 'Kuch bhi chunne se pehle poocho data aata kahan se hai. Jo data server pe rehta hai — users, posts, orders — wo CACHE hai, state nahi, aur query library mein jaata hai. Isi ko galat samajhne se itne apps ka store fool jaata hai.',
      },
      diagram: `server state  → TanStack Query / RTK Query / RSC
client state  → the decision below`,
    },
    {
      heading: { en: 'Default to local state', hi: 'Default local state rakho' },
      body: {
        en: 'Start with useState in the component that owns the value. Most state is genuinely local — an open dropdown, a form field, a hover flag. Keeping it local means it is easy to find, easy to delete, and causes the smallest possible re-render.',
        hi: 'Us component mein useState se shuru karo jiska wo value hai. Zyadatar state sach mein local hoti hai — khula dropdown, form field, hover flag. Local rakhne se wo aasaani se milti hai, aasaani se hatti hai, aur sabse chhota re-render karwaati hai.',
      },
    },
    {
      heading: { en: 'Lift only as far as the nearest common parent', hi: 'Sirf sabse paas ke saanjhe parent tak uthao' },
      body: {
        en: 'When two components need the same value, move it to the closest ancestor of both — no higher. Lifting further than necessary is how state ends up at the root and every keystroke re-renders the whole app.',
        hi: 'Jab do components ko wahi value chahiye, usse dono ke sabse paas ke ancestor tak le jao — usse upar nahi. Zaroorat se zyada upar uthana hi wo tareeka hai jisse state root pe pahunch jaati hai aur har keystroke poora app re-render kar deta hai.',
      },
      code: `// both need it → put it in Page, not in App
function Page() {
  const [query, setQuery] = useState('');
  return <><Search value={query} onChange={setQuery} /><List q={query} /></>;
}`,
    },
    {
      heading: { en: 'Reach for Context when it is global and slow-changing', hi: 'Context tab lo jab wo global ho aur dheere badle' },
      body: {
        en: 'Theme, locale, the signed-in user, a feature-flag set. The test is that most of the tree needs it and almost nothing updates it. Remember that every consumer re-renders on every change, so a fast-changing value is the wrong fit.',
        hi: 'Theme, locale, logged-in user, feature flags. Jaanch ye hai ki tree ka zyadatar hissa usse chahiye aur usse koi kam hi badalta hai. Yaad rakho har badlaav pe har consumer re-render hota hai, toh tezi se badalti value iske liye galat hai.',
      },
    },
    {
      heading: { en: 'And a library when Context stops being enough', hi: 'Aur library tab jab Context kaafi na rahe' },
      body: {
        en: 'The signal is concrete: you need selector-based subscriptions so components read one slice, you need to update from outside React, or you have measured Context causing widespread re-renders. Zustand for a simple store, Jotai for atoms, Redux Toolkit when a large team benefits from one enforced pattern.',
        hi: 'Ishara thos hai: tumhe selector-based subscriptions chahiye taaki components ek hissa padhein, tumhe React ke bahar se update karna hai, ya tumne naapa hai ki Context door-door tak re-renders karwa raha hai. Simple store ke liye Zustand, atoms ke liye Jotai, aur Redux Toolkit jab badi team ko ek lagoo pattern se fayda ho.',
      },
      code: `const name = useStore((s) => s.user.name);   // only this slice`,
    },
    {
      heading: { en: 'Some state is not state at all', hi: 'Kuch state, state hoti hi nahi' },
      body: {
        en: 'Derived values should be computed during render, not stored and synced. Values that never affect the UI belong in a ref. And filters, tabs and pagination often belong in the URL, where they become shareable and survive a reload for free.',
        hi: 'Nikaali ja sakne wali values render ke dauraan bananni chahiye, store aur sync nahi. Jo values UI pe asar hi nahi daaltin wo ref mein jaati hain. Aur filters, tabs aur pagination aksar URL mein rehni chahiye, jahan wo share hone laayak ban jaati hain aur reload ke baad bhi bach jaati hain.',
      },
      code: `const full = first + ' ' + last;          // ✓ derived, not state
const [params, setParams] = useSearchParams();   // ✓ URL as state`,
    },
    {
      heading: { en: 'The decision, in order', hi: 'Faisla, kram se' },
      body: {
        en: 'Can I derive it? Then do not store it. Is it server data? Query cache. Does one component need it? useState. Do two need it? Lift to their common parent. Does the whole tree need it and it rarely changes? Context. Anything more demanding? A library.',
        hi: 'Kya main isse nikaal sakta hoon? Toh store mat karo. Kya ye server data hai? Query cache. Ek component ko chahiye? useState. Do ko chahiye? Unke saanjhe parent tak uthao. Poore tree ko chahiye aur kam badalti hai? Context. Isse zyada zaroorat? Library.',
      },
    },
  ],

  'Why should server data not live in your own state?': [
    {
      heading: { en: 'It is a cache, not state', hi: 'Ye cache hai, state nahi' },
      body: {
        en: 'Client state is owned by your app — a dropdown being open, a form field. Server data is owned by the server; your copy is a snapshot that is out of date the moment it arrives. Treating a cache as state is the root of the problem.',
        hi: 'Client state tumhare app ki hai — khula dropdown, form field. Server data server ka hai; tumhari copy ek snapshot hai jo aate hi purani ho jaati hai. Cache ko state maan lena hi asli jad hai.',
      },
    },
    {
      heading: { en: 'What you end up writing by hand', hi: 'Tum haath se kya likhne lagte ho' },
      body: {
        en: 'Every component that fetches grows the same boilerplate: data, loading and error state, an effect with a dependency array, and a cleanup to avoid setting state after unmount. Multiply that by fifty components.',
        hi: 'Har fetch karne wala component wahi boilerplate ugaata hai: data, loading aur error state, dependency array wala effect, aur unmount ke baad state set na karne ke liye cleanup. Isse pachaas components se guna karo.',
      },
      code: `const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
  let cancelled = false;
  fetch(url).then((r) => r.json())
    .then((d) => !cancelled && setData(d))
    .catch((e) => !cancelled && setError(e))
    .finally(() => !cancelled && setLoading(false));
  return () => { cancelled = true; };
}, [url]);`,
    },
    {
      heading: { en: 'And what you still get wrong', hi: 'Aur phir bhi kya galat reh jaata hai' },
      body: {
        en: 'Even that version has gaps. Two components asking for the same data fire two requests. Nothing is shared between them, so they can disagree. A slow response can overwrite a newer one. And there is no refetch on window focus, no retry, no revalidation.',
        hi: 'Us version mein bhi khaamiyan hain. Do components ek hi data maangein toh do requests jaati hain. Unke beech kuch share nahi hota, toh wo alag-alag dikha sakte hain. Dheema response naye ko dhak sakta hai. Aur na focus pe refetch, na retry, na revalidation.',
      },
    },
    {
      heading: { en: 'The staleness problem is the real one', hi: 'Asli problem purane hone ki hai' },
      body: {
        en: 'Data copied into state is frozen until you explicitly refetch. Another user edits the record and your screen keeps showing the old value with no indication. A cache library treats freshness as a first-class concern instead.',
        hi: 'State mein copy kiya data tab tak jama rehta hai jab tak tum khud refetch na karo. Koi doosra user record badal de aur tumhari screen purani value dikhati rahegi, bina kisi ishare ke. Cache library taazgi ko pehle darje ki cheez maanti hai.',
      },
    },
    {
      heading: { en: 'What a query library gives you', hi: 'Query library kya deti hai' },
      body: {
        en: 'Deduplication of identical requests, a shared cache across components, background refetching, stale-while-revalidate, retries with backoff, pagination and infinite scroll helpers, and optimistic updates with rollback. All of it, for less code than the manual version.',
        hi: 'Ek jaisi requests ko ek karna, components ke beech saanjha cache, background refetching, stale-while-revalidate, backoff ke saath retries, pagination aur infinite scroll ke helpers, aur rollback ke saath optimistic updates. Ye sab, haath wale version se kam code mein.',
      },
      code: `const { data, isLoading, error } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id),
});
// two components with the same key share one request and one cache entry`,
    },
    {
      heading: { en: 'Server Components remove it entirely', hi: 'Server Components isse poori tarah hataate hain' },
      body: {
        en: 'The other modern answer. If the component runs on the server it can await the data directly — no state, no effect, no loading flag, and no client JavaScript for the fetch at all.',
        hi: 'Doosra modern jawab. Agar component server pe chalta hai toh wo data seedha await kar sakta hai — na state, na effect, na loading flag, aur fetch ke liye client pe JavaScript bhi nahi.',
      },
      code: `export default async function Page({ params }) {
  const user = await db.user.find(params.id);
  return <Profile user={user} />;
}`,
    },
    {
      heading: { en: 'The one legitimate exception', hi: 'Ek jaayaz apvaad' },
      body: {
        en: 'Copying server data into local state IS correct when the user is editing it — a form initialised from a record. That copy is genuinely client state now, because the user owns it until they submit.',
        hi: 'Server data ko local state mein copy karna TAB sahi hai jab user usse edit kar raha ho — kisi record se bhara hua form. Wo copy ab sach mein client state hai, kyunki submit karne tak wo user ki hai.',
      },
    },
  ],

  'When do you actually need useEffect?': [
    {
      heading: { en: 'Only to synchronise with something outside React', hi: 'Sirf React ke bahar ki kisi cheez se taal-mel ke liye' },
      body: {
        en: 'That is the whole rule. An effect exists to connect your component to an external system — the DOM, a browser API, a network connection, a third-party widget, a timer. If nothing outside React is involved, you almost certainly do not need one.',
        hi: 'Poora rule yahi hai. Effect isliye hai ki tumhara component kisi bahari system se jude — DOM, browser API, network connection, third-party widget, timer. Agar React ke bahar kuch shaamil nahi hai, toh lagbhag pakka tumhe iski zaroorat nahi.',
      },
      code: `useEffect(() => {
  const conn = createConnection(roomId);
  conn.connect();
  return () => conn.disconnect();
}, [roomId]);                            // ✓ external system`,
    },
    {
      heading: { en: 'Not for derived state', hi: 'Nikaali gayi state ke liye nahi' },
      body: {
        en: 'The most common unnecessary effect. If a value can be computed from props or state, compute it during render. Storing it and syncing with an effect costs an extra render and can show a stale value in between.',
        hi: 'Sabse aam bekaar effect. Agar koi value props ya state se nikaali ja sakti hai, toh usse render ke dauraan hi nikaalo. Usse store karke effect se sync karna ek extra render kharch karta hai aur beech mein purani value dikha sakta hai.',
      },
      code: `// ✗
const [full, setFull] = useState('');
useEffect(() => setFull(first + ' ' + last), [first, last]);

// ✓
const full = first + ' ' + last;`,
    },
    {
      heading: { en: 'Not for responding to a user event', hi: 'User ke event pe react karne ke liye nahi' },
      body: {
        en: 'If something should happen BECAUSE the user did something, put it in the event handler. An effect runs because state changed, which loses the information about what caused it — and fires again on any other path to that state.',
        hi: 'Agar kuch isliye hona chahiye KYUNKI user ne kuch kiya, toh usse event handler mein rakho. Effect isliye chalta hai ki state badli, jisse wajah ki jaankari kho jaati hai — aur us state tak pahunchne ke kisi bhi doosre raaste pe wo phir chal jaata hai.',
      },
      code: `// ✗ also fires if isSubmitted is set anywhere else
useEffect(() => { if (isSubmitted) showToast(); }, [isSubmitted]);

// ✓
function onSubmit() { save(); showToast(); }`,
    },
    {
      heading: { en: 'Not for fetching, in most apps', hi: 'Zyadatar apps mein fetch ke liye nahi' },
      body: {
        en: 'Fetching in an effect gives you race conditions, no cache, no deduplication, and a request waterfall. A query library or a Server Component solves all of that. If you must fetch in an effect, remember the cleanup.',
        hi: 'Effect mein fetch karne se race conditions milti hain, na cache, na deduplication, aur ek request waterfall. Query library ya Server Component ye sab hal kar deta hai. Agar effect mein fetch karna hi pade, toh cleanup mat bhoolo.',
      },
      code: `useEffect(() => {
  const c = new AbortController();
  fetch(url, { signal: c.signal }).then(setData).catch(ignoreAbort);
  return () => c.abort();          // ✓ prevents the stale response
}, [url]);`,
    },
    {
      heading: { en: 'Not for resetting state on a prop change', hi: 'Prop badalne pe state reset karne ke liye nahi' },
      body: {
        en: 'Use a key instead. Changing the key remounts the component, which resets all its state in one step — no effect, no extra render, and it cannot get out of sync.',
        hi: 'Uski jagah key use karo. Key badalne se component dobara mount hota hai, jisse uski saari state ek hi kadam mein reset ho jaati hai — na effect, na extra render, aur wo asangat ho hi nahi sakti.',
      },
      code: `// ✗
useEffect(() => setDraft(''), [userId]);

// ✓
<Editor key={userId} />`,
    },
    {
      heading: { en: 'The cases where you genuinely need one', hi: 'Wo cases jahan sach mein zaroorat hai' },
      body: {
        en: 'Subscribing to a store or a WebSocket. Adding a window or document event listener. Setting up a timer. Measuring or focusing a DOM node. Integrating a non-React library. Logging analytics on view. All of them touch the world outside React.',
        hi: 'Kisi store ya WebSocket ko subscribe karna. window ya document pe event listener lagana. Timer lagana. DOM node naapna ya focus karna. Koi non-React library jodna. View pe analytics log karna. Ye sab React ke bahar ki duniya ko chhoote hain.',
      },
    },
    {
      heading: { en: 'And always write the cleanup', hi: 'Aur cleanup hamesha likho' },
      body: {
        en: 'Every subscription, listener, timer and request needs to be undone. StrictMode runs setup, cleanup, setup precisely to make a missing cleanup visible in development rather than as a production memory leak.',
        hi: 'Har subscription, listener, timer aur request ko wapas lena zaroori hai. StrictMode setup, cleanup, setup isiliye chalata hai taaki gayab cleanup development mein dikh jaaye, production ki memory leak ban kar nahi.',
      },
    },
  ],

  'What is the difference between useLayoutEffect and useEffect?': [
    {
      heading: { en: 'Before paint versus after paint', hi: 'Paint se pehle vs paint ke baad' },
      body: {
        en: 'useLayoutEffect runs synchronously after React commits DOM changes but BEFORE the browser paints. useEffect runs asynchronously after paint. That single timing difference is the whole answer.',
        hi: 'useLayoutEffect React ke DOM badalne ke baad par browser ke paint karne se PEHLE synchronously chalta hai. useEffect paint ke baad asynchronously chalta hai. Bas yahi ek timing ka farq poora jawab hai.',
      },
      diagram: `render → commit DOM → useLayoutEffect → PAINT → useEffect
                       │ blocks paint            │ does not
                       └ browser waits`,
    },
    {
      heading: { en: 'Which makes layout effects blocking', hi: 'Isiliye layout effects blocking hain' },
      body: {
        en: 'The browser cannot paint until your layout effect returns. Slow work there freezes the frame. useEffect lets the browser paint first, so the user sees something immediately — which is why it is the default choice.',
        hi: 'Jab tak tumhara layout effect lautta nahi, browser paint nahi kar sakta. Wahan dheema kaam frame jama deta hai. useEffect browser ko pehle paint karne deta hai, toh user ko turant kuch dikhta hai — isiliye default yahi hai.',
      },
    },
    {
      heading: { en: 'The one problem it solves: visual flicker', hi: 'Ye ek problem hal karta hai: visual jhilmilaahat' },
      body: {
        en: 'If you measure the DOM and then change it in useEffect, the user sees one frame of the wrong position before the correction. In useLayoutEffect the measurement and correction both happen before paint, so there is nothing to see.',
        hi: 'Agar tum DOM naap kar useEffect mein usse badlo, toh sudhaar se pehle user ko ek frame galat jagah dikhti hai. useLayoutEffect mein naapna aur sudharna dono paint se pehle hote hain, toh dikhne ko kuch bachta hi nahi.',
      },
      code: `useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setTooltipTop(triggerTop - height);   // ✓ no flicker
}, []);`,
    },
    {
      heading: { en: 'When to reach for it', hi: 'Isse kab uthana' },
      body: {
        en: 'Positioning a tooltip, popover or dropdown from a measurement. Restoring scroll position. Any case where you read layout and immediately write layout based on it. That is a short list — everything else is useEffect.',
        hi: 'Naap kar tooltip, popover ya dropdown ki jagah tay karna. Scroll position wapas laana. Har wo case jahan tum layout padh kar turant uske aadhaar pe layout likhte ho. Ye chhoti list hai — baaki sab useEffect hai.',
      },
    },
    {
      heading: { en: 'It warns during server-side rendering', hi: 'Server-side rendering pe ye chetavni deta hai' },
      body: {
        en: 'There is no DOM and no paint on the server, so useLayoutEffect cannot run and React logs a warning. If a component needs it and is server-rendered, gate it or use a use-isomorphic-layout-effect helper.',
        hi: 'Server pe na DOM hai na paint, toh useLayoutEffect chal nahi sakta aur React warning deta hai. Agar kisi server-rendered component ko iski zaroorat hai, toh usse shart mein daalo ya use-isomorphic-layout-effect helper lo.',
      },
      code: `const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;`,
    },
    {
      heading: { en: 'The default, stated plainly', hi: 'Default, saaf-saaf' },
      body: {
        en: '"Use useEffect. Switch to useLayoutEffect only when you see a visual flicker caused by measuring and then mutating the DOM — and know that it blocks paint, so keep the work inside it small."',
        hi: '"useEffect use karo. useLayoutEffect pe tabhi jao jab DOM naap kar badalne se koi visual jhilmilaahat dikhe — aur yaad rakho ye paint rokta hai, toh uske andar ka kaam chhota rakho."',
      },
    },
  ],

  'What is the key prop actually for?': [
    {
      heading: { en: 'It gives an element a stable identity', hi: 'Ye element ko ek sthir pehchaan deta hai' },
      body: {
        en: 'A key tells React which element in the new list corresponds to which element in the old one. Without it React matches children by POSITION, so any insertion, deletion or reorder looks like every subsequent item changed.',
        hi: 'Key React ko batati hai ki nayi list ka kaunsa element purani list ke kaunse element se milta hai. Bina key ke React children ko JAGAH se milaata hai, toh koi bhi insertion, deletion ya reorder aisa lagta hai jaise uske baad ka har item badal gaya.',
      },
      diagram: `old  [A] [B] [C]
new  [X] [A] [B] [C]

by position   A→X, B→A, C→B, +C     four changes
by key        insert X               one change`,
    },
    {
      heading: { en: 'It is not just about performance', hi: 'Baat sirf performance ki nahi hai' },
      body: {
        en: 'This is the half most people miss. Keys decide which component instance keeps its STATE. Get them wrong and a checked checkbox, a focused input or a half-typed value attaches to the wrong row — a correctness bug, not a slow render.',
        hi: 'Yahi aadha hissa zyadatar log chook jaate hain. Keys tay karti hain kaunsa component instance apni STATE rakhega. Galat karo toh checked checkbox, focused input ya aadha type kiya value galat row se chipak jaata hai — ye galat nateeje ka bug hai, dheema render nahi.',
      },
      code: `// with key={index}, deleting the first row leaves the second row's
// input value attached to what is now the first row`,
    },
    {
      heading: { en: 'Why index keys are usually wrong', hi: 'Index keys aam taur pe galat kyun hain' },
      body: {
        en: 'An index is a position, so key={index} is exactly the behaviour you get with no key. It is safe only if the list never reorders, never has items inserted or removed, and the items have no state.',
        hi: 'Index ek jagah hai, toh key={index} bilkul wahi behaviour hai jo bina key ke milta hai. Ye tabhi safe hai jab list kabhi reorder na ho, na kuch jode-hataye jaaye, aur items ki koi state na ho.',
      },
      code: `{items.map((i, idx) => <Row key={idx} item={i} />)}   // ✗ usually
{items.map((i) => <Row key={i.id} item={i} />)}       // ✓`,
    },
    {
      heading: { en: 'What makes a good key', hi: 'Achhi key kya hoti hai' },
      body: {
        en: 'Stable, unique among siblings, and derived from the data. A database id is ideal. Never use Math.random or a value generated during render — a new key every render remounts the element every time, destroying its state and its DOM node.',
        hi: 'Sthir, bhai-behno ke beech unique, aur data se nikli hui. Database id sabse achhi hai. Math.random ya render ke dauraan bani value kabhi mat lo — har render pe nayi key element ko har baar dobara mount karti hai, uski state aur DOM node khatam karte hue.',
      },
      code: `key={Math.random()}    // ✗ remounts on every render
key={item.id}          // ✓`,
    },
    {
      heading: { en: 'Keys are scoped to siblings', hi: 'Keys sirf bhai-behno tak hain' },
      body: {
        en: 'They only need to be unique within one array, not globally. Two different lists on the same page can both use key 1 without any conflict.',
        hi: 'Inhe sirf ek array ke andar unique hona chahiye, poore app mein nahi. Ek hi page pe do alag lists dono key 1 use kar sakti hain, bina kisi takraav ke.',
      },
    },
    {
      heading: { en: 'The deliberate use: forcing a remount', hi: 'Jaan-boojh kar upyog: remount karwaana' },
      body: {
        en: 'Because changing a key destroys and recreates the component, you can use it on purpose to reset state — a form that must clear when the selected user changes. This is cleaner than an effect that resets each field.',
        hi: 'Key badalne se component toot kar dobara banta hai, isliye tum isse jaan-boojh kar state reset karne ke liye use kar sakte ho — aisa form jo chune gaye user ke badalne pe saaf ho jaana chahiye. Ye har field reset karne wale effect se saaf hai.',
      },
      code: `<ProfileForm key={userId} user={user} />
// changing userId gives a completely fresh form`,
    },
    {
      heading: { en: 'Fragments need the long form', hi: 'Fragments ko lamba roop chahiye' },
      body: {
        en: 'The shorthand cannot take props, so returning a keyed fragment from a map requires React.Fragment written out. A small detail, but it comes up whenever someone maps to a pair of elements.',
        hi: 'Chhota roop props nahi leta, toh map se keyed fragment return karne ke liye React.Fragment poora likhna padta hai. Chhoti baat hai, par jab bhi koi map se do elements banata hai tab aati hai.',
      },
      code: `{items.map((i) => (
  <Fragment key={i.id}><dt>{i.term}</dt><dd>{i.def}</dd></Fragment>
))}`,
    },
  ],

  'What causes unnecessary re-renders and how do you find them?': [
    {
      heading: { en: 'Find them before you fix them', hi: 'Theek karne se pehle unhe dhoondho' },
      body: {
        en: 'Open the React DevTools Profiler, tick "Record why each component rendered", and interact. It tells you exactly which components rendered and whether it was props, state, hooks or the parent. Guessing here wastes more time than anything else.',
        hi: 'React DevTools Profiler kholo, "Record why each component rendered" tick karo, aur interact karo. Wo bilkul batata hai kaunse components render hue aur wajah props thi, state, hooks, ya parent. Yahan andaaza lagana sabse zyada samay barbaad karta hai.',
      },
      code: `// DevTools → Profiler → ⚙ → "Record why each component rendered"
// also useful: Settings → Highlight updates when components render`,
    },
    {
      heading: { en: 'Cause one: state too high in the tree', hi: 'Wajah ek: state tree mein bahut upar' },
      body: {
        en: 'The most common by far. A value used by one small component lives in a root layout, so every keystroke re-renders the entire page. Move the state down to the component that owns it.',
        hi: 'Sabse aam yahi hai. Jo value ek chhote component ko chahiye wo root layout mein rehti hai, toh har keystroke poora page re-render kar deta hai. State ko us component tak neeche le jao jiski wo hai.',
      },
      code: `// ✗ typing re-renders HeavyList
function Page() {
  const [q, setQ] = useState('');
  return <><input value={q} onChange={…} /><HeavyList /></>;
}

// ✓ isolate the state
function Page() { return <><Search /><HeavyList /></>; }`,
    },
    {
      heading: { en: 'Cause two: unstable props', hi: 'Wajah do: badalte props' },
      body: {
        en: 'An inline object, array or arrow function is a new reference on every render, which defeats React.memo on the child and re-triggers any effect that depends on it. This is why memo so often appears not to work.',
        hi: 'Inline object, array ya arrow function har render pe naya reference hai, jo bachche pe React.memo bekaar kar deta hai aur us effect ko dobara chala deta hai jo uspe depend karta hai. Isiliye memo aksar kaam na karta hua lagta hai.',
      },
      code: `<Child style={{ color }} onClick={() => f()} items={[]} />   // ✗ all new

const style = useMemo(() => ({ color }), [color]);
const onClick = useCallback(() => f(), []);                  // ✓`,
    },
    {
      heading: { en: 'Cause three: context', hi: 'Wajah teen: context' },
      body: {
        en: 'Every consumer re-renders whenever the context value changes, with no way to subscribe to part of it. An inline object as the value means that is every single render. Memoise the value, and split one context into several by update frequency.',
        hi: 'Context ki value badalne pe har consumer re-render hota hai, uske kisi hisse ko subscribe karne ka koi tareeka nahi. Value ki jagah inline object matlab ye har render pe hoga. Value memoise karo, aur ek context ko badalne ki raftaar ke hisaab se kai mein baanto.',
      },
    },
    {
      heading: { en: 'Cause four: new identities elsewhere', hi: 'Wajah chaar: aur jagah nayi pehchaanein' },
      body: {
        en: 'A selector that builds a new array each call, a component defined inside another component, a key that changes every render, or a parent that re-renders for its own reasons and drags a whole subtree with it.',
        hi: 'Aisa selector jo har call pe naya array banaye, kisi component ke andar define kiya gaya component, har render pe badalti key, ya aisa parent jo apni wajah se re-render ho aur poora subtree saath kheench le.',
      },
      code: `function Parent() {
  function Child() {}          // ✗ new type every render → remounts
  return <Child />;
}`,
    },
    {
      heading: { en: 'The fixes, in the order to try them', hi: 'Ilaaj, jis kram mein aazmane hain' },
      body: {
        en: 'Move state down. Pass expensive children as props or children so the parent\'s state changes do not touch them. Split contexts. Stabilise props. Then, and only then, add memo — and only where the Profiler showed a real cost.',
        hi: 'State neeche le jao. Mehnge children ko props ya children ki tarah bhejo taaki parent ki state ka asar unpe na pade. Contexts baanto. Props sthir karo. Phir, aur tabhi, memo jodo — aur sirf wahan jahan Profiler ne asli keemat dikhayi ho.',
      },
      code: `// children as props: HeavyList is created by the grandparent,
// so Wrapper's state changes cannot re-render it
<Wrapper><HeavyList /></Wrapper>`,
    },
    {
      heading: { en: 'And remember a re-render is often free', hi: 'Aur yaad rakho re-render aksar muft hai' },
      body: {
        en: 'Rendering a small component that returns the same output costs almost nothing — React diffs and commits nothing. Chasing every re-render is a waste; chase the ones the Profiler shows taking milliseconds. The React Compiler now handles most of the memoisation anyway.',
        hi: 'Chhote component ka render jo wahi output de lagbhag muft hai — React diff karta hai aur commit kuch nahi. Har re-render ke peeche bhaagna barbaadi hai; unke peeche bhaago jinhe Profiler milliseconds leta dikhaye. Waise bhi React Compiler ab zyadatar memoisation khud kar leta hai.',
      },
    },
  ],

  'What is hydration and what causes a hydration mismatch?': [
    {
      heading: { en: 'Attaching React to server-rendered HTML', hi: 'Server ke HTML se React ko jodna' },
      body: {
        en: 'The server sends HTML that looks finished but is inert. Hydration is React running the same components in the browser and attaching event listeners to the EXISTING DOM instead of recreating it. Until it completes, the page looks ready but does not respond.',
        hi: 'Server aisa HTML bhejta hai jo poora dikhta hai par bejaan hai. Hydration matlab React wahi components browser mein chala kar MAUJOODA DOM pe event listeners lagata hai, usse dobara banane ki jagah. Jab tak ye poora na ho, page taiyaar dikhta hai par jawab nahi deta.',
      },
      code: `hydrateRoot(document.getElementById('root'), <App />);`,
    },
    {
      heading: { en: 'The requirement: the first render must match', hi: 'Shart: pehla render milna chahiye' },
      body: {
        en: 'React expects the tree it renders in the browser to be identical to the HTML the server produced. If they differ, React cannot trust the markup and logs a mismatch error. That is the whole contract.',
        hi: 'React ummeed karta hai ki browser mein render kiya tree server ke bheje HTML se bilkul same ho. Alag hon toh React markup pe bharosa nahi kar sakta aur mismatch error deta hai. Poora contract yahi hai.',
      },
    },
    {
      heading: { en: 'The five usual causes', hi: 'Paanch aam wajah' },
      body: {
        en: 'Anything non-deterministic or environment-dependent. Date and time formatting. Math.random or a generated id. Reading window, localStorage or a cookie during render. Locale or timezone differences between server and browser. And invalid HTML nesting, which the browser silently corrects.',
        hi: 'Koi bhi anischit ya environment pe nirbhar cheez. Date aur time ki formatting. Math.random ya banayi gayi id. Render ke dauraan window, localStorage ya cookie padhna. Server aur browser ke beech locale ya timezone ka farq. Aur galat HTML nesting, jise browser chup-chaap sudhaar deta hai.',
      },
      code: `<p>{new Date().toLocaleString()}</p>       // ✗ server and client differ
<p>{Math.random()}</p>                      // ✗
<p>{localStorage.getItem('name')}</p>       // ✗ undefined on the server
<p><div /></p>                              // ✗ browser moves the div`,
    },
    {
      heading: { en: 'What React does when it happens', hi: 'Aisa hone pe React kya karta hai' },
      body: {
        en: 'It logs an error and falls back to client rendering for that subtree — discarding the server HTML and rendering from scratch. So you pay for SSR and get none of the benefit, plus a visible flash as the content is replaced.',
        hi: 'Wo error log karta hai aur us subtree ke liye client rendering pe chala jaata hai — server ka HTML phenk kar shuru se render karta hai. Toh tum SSR ki keemat dete ho aur fayda kuch nahi milta, upar se content badalne pe ek dikhne wala jhatka.',
      },
    },
    {
      heading: { en: 'The fix: render client-only values in an effect', hi: 'Ilaaj: sirf-client wali values effect mein render karo' },
      body: {
        en: 'Render the same neutral output on both sides for the first pass, then update after mount. An effect runs only in the browser, so the first render matches and the real value appears immediately after.',
        hi: 'Pehle chakkar mein dono taraf wahi tatasth output do, phir mount ke baad update karo. Effect sirf browser mein chalta hai, toh pehla render mil jaata hai aur asli value uske turant baad aa jaati hai.',
      },
      code: `const [time, setTime] = useState(null);
useEffect(() => setTime(new Date().toLocaleString()), []);
return <p>{time ?? 'Loading…'}</p>;    // ✓ matches on the server`,
    },
    {
      heading: { en: 'The escape hatch, and its cost', hi: 'Bachne ka raasta, aur uski keemat' },
      body: {
        en: 'suppressHydrationWarning silences the error for one element, and it is legitimate for something genuinely time-based. It does not fix the mismatch — it only hides the warning — so never apply it broadly.',
        hi: 'suppressHydrationWarning ek element ke liye error chup kara deta hai, aur sach mein samay pe nirbhar cheez ke liye ye jaayaz hai. Ye mismatch theek nahi karta — sirf warning chhupata hai — isliye isse har jagah mat lagao.',
      },
      code: `<time suppressHydrationWarning>{new Date().toISOString()}</time>`,
    },
    {
      heading: { en: 'Selective hydration is worth mentioning', hi: 'Selective hydration ka zikr karne laayak hai' },
      body: {
        en: 'With streaming SSR and Suspense, React hydrates in chunks and prioritises whatever the user interacts with first. So a slow section no longer blocks the rest of the page from becoming interactive.',
        hi: 'Streaming SSR aur Suspense ke saath React tukdon mein hydrate karta hai aur usse pehle karta hai jispe user pehle interact kare. Toh koi dheema hissa ab baaki page ko interactive hone se nahi rokta.',
      },
    },
  ],

  'What is a controlled versus uncontrolled component?': [
    {
      heading: { en: 'The distinction in one line', hi: 'Farq ek line mein' },
      body: {
        en: 'Controlled means React state is the source of truth and the input renders from it. Uncontrolled means the DOM node holds the value and React reads it when it needs to. Everything else is a consequence of that.',
        hi: 'Controlled matlab React state hi sach hai aur input usi se render hota hai. Uncontrolled matlab value DOM node ke paas hai aur React zaroorat pe padhta hai. Baaki sab isi ka nateeja hai.',
      },
      code: `<input value={v} onChange={(e) => setV(e.target.value)} />   // controlled
<input defaultValue="" ref={ref} />                          // uncontrolled`,
    },
    {
      heading: { en: 'Decide by when you need the value', hi: 'Faisla isse karo ki value kab chahiye' },
      body: {
        en: 'That is the only question that matters. If you need it WHILE the user types — validation as they go, a disabled button, live formatting, one field depending on another — it must be controlled. If you only need it on submit, uncontrolled is simpler and cheaper.',
        hi: 'Sirf yahi ek sawaal maayne rakhta hai. Agar value user ke TYPE KARTE WAQT chahiye — chalte-chalte validation, band button, live formatting, ek field doosre pe nirbhar — toh controlled honi chahiye. Agar sirf submit pe chahiye, toh uncontrolled simple aur sasta hai.',
      },
      diagram: `need the value while typing?
   yes ──► controlled
   no  ──► uncontrolled`,
    },
    {
      heading: { en: 'The cost of controlled', hi: 'Controlled ki keemat' },
      body: {
        en: 'A re-render on every keystroke. For one field that is nothing; for a form with forty fields where the state sits at the top, every character re-renders the whole form. That is exactly why React Hook Form uses uncontrolled inputs internally.',
        hi: 'Har keystroke pe ek re-render. Ek field ke liye ye kuch nahi; chalees fields wale form mein jahan state upar rakhi ho, har akshar poora form re-render kar deta hai. Isiliye React Hook Form andar se uncontrolled inputs use karta hai.',
      },
    },
    {
      heading: { en: 'Where uncontrolled is the only option', hi: 'Jahan sirf uncontrolled hi vikalp hai' },
      body: {
        en: 'A file input — its value is read-only for security reasons, so it cannot be controlled. Also any third-party widget that owns its own DOM and expects to manage its own value.',
        hi: 'File input — security ki wajah se uski value sirf-padhne wali hai, toh usse control nahi kar sakte. Aur koi bhi third-party widget jo apna DOM khud rakhta hai aur apni value khud sambhalna chahta hai.',
      },
      code: `<input type="file" ref={fileRef} />       // must be uncontrolled`,
    },
    {
      heading: { en: 'The switching warning', hi: 'Badalne wali warning' },
      body: {
        en: 'Starting with value={undefined} and supplying a string later switches the input from uncontrolled to controlled, and React warns. Initialise the state to an empty string, or coalesce at the prop.',
        hi: 'value={undefined} se shuru karke baad mein string dena input ko uncontrolled se controlled bana deta hai, aur React warning deta hai. State ko khaali string se shuru karo, ya prop pe hi default de do.',
      },
      code: `useState('')          // ✓ never undefined
<input value={v ?? ''} />   // ✓ defensive`,
    },
    {
      heading: { en: 'React 19 shifts the default', hi: 'React 19 default badal deta hai' },
      body: {
        en: 'Form actions receive a FormData object, so a whole form can be submitted with no state at all, and useActionState gives you pending and error handling. For a plain submit-only form, uncontrolled is now both simpler AND the idiomatic choice.',
        hi: 'Form actions ko FormData object milta hai, toh poora form bina kisi state ke submit ho sakta hai, aur useActionState pending aur error sambhaal deta hai. Sirf submit wale saade form ke liye ab uncontrolled simple bhi hai AUR aam tareeka bhi.',
      },
      code: `<form action={async (data) => save(data.get('email'))}>
  <input name="email" />
</form>`,
    },
  ],

  'How do you test a React component well?': [
    {
      heading: { en: 'Test behaviour, not implementation', hi: 'Behaviour test karo, implementation nahi' },
      body: {
        en: 'The guiding principle behind React Testing Library: the more your test resembles how the software is used, the more confidence it gives you. Assert on what a user can see and do, never on state, props or internal method calls.',
        hi: 'React Testing Library ka mool siddhant: tumhara test jitna software ke asli upyog jaisa hoga, utna bharosa dega. Uspe assert karo jo user dekh aur kar sakta hai, kabhi state, props ya andar ke method calls pe nahi.',
      },
      code: `// ✗ implementation
expect(wrapper.state('isOpen')).toBe(true);

// ✓ behaviour
expect(screen.getByRole('dialog')).toBeVisible();`,
    },
    {
      heading: { en: 'Query the way a user would', hi: 'Waise dhoondho jaise user dhoondhta' },
      body: {
        en: 'Prefer getByRole, then getByLabelText, then getByText. Fall back to getByTestId only when nothing else works. Role-based queries double as an accessibility check — if you cannot query it by role, a screen reader probably cannot find it either.',
        hi: 'Pehle getByRole, phir getByLabelText, phir getByText. getByTestId tabhi lo jab aur kuch na chale. Role wali queries accessibility ki jaanch bhi hain — agar role se dhoondh nahi paate, toh shaayad screen reader bhi nahi dhoondh paayega.',
      },
      code: `screen.getByRole('button', { name: /save/i });
screen.getByLabelText('Email');
screen.getByText('Welcome back');`,
    },
    {
      heading: { en: 'Use userEvent, not fireEvent', hi: 'fireEvent nahi, userEvent lo' },
      body: {
        en: 'fireEvent dispatches one synthetic event. userEvent simulates the whole interaction — focus, keydown, keypress, input, keyup — which catches bugs that a bare change event would miss. It is async, so await it.',
        hi: 'fireEvent ek synthetic event bhejta hai. userEvent poori interaction ki nakal karta hai — focus, keydown, keypress, input, keyup — jo un bugs ko pakadta hai jinhe khaali change event chook jaata. Ye async hai, toh await karo.',
      },
      code: `const user = userEvent.setup();
await user.type(screen.getByLabelText('Email'), 'a@b.com');
await user.click(screen.getByRole('button', { name: /save/i }));`,
    },
    {
      heading: { en: 'Handle async with findBy and waitFor', hi: 'Async ko findBy aur waitFor se sambhaalo' },
      body: {
        en: 'getBy throws immediately if the element is missing. findBy returns a promise and retries until it appears — that is what you want after an action that triggers a fetch. queryBy is the only one that returns null, so it is the one to use for asserting absence.',
        hi: 'Element na mile toh getBy turant error deta hai. findBy promise deta hai aur aane tak dobara koshish karta hai — fetch karwane wale action ke baad yahi chahiye. queryBy hi null deta hai, toh gair-maujoodgi jaanchne ke liye wahi lo.',
      },
      code: `expect(await screen.findByText('Saved')).toBeInTheDocument();
expect(screen.queryByRole('alert')).not.toBeInTheDocument();`,
    },
    {
      heading: { en: 'Mock the network, not your modules', hi: 'Network mock karo, apne modules nahi' },
      body: {
        en: 'Mock Service Worker intercepts requests at the network level, so your component uses its real fetch code and only the response is faked. Mocking your own data module instead couples the test to your file structure and stops testing the integration.',
        hi: 'Mock Service Worker requests ko network star pe pakadta hai, toh tumhara component apna asli fetch code use karta hai aur sirf response nakli hota hai. Apne data module ko mock karna test ko file structure se baandh deta hai aur integration testing khatam kar deta hai.',
      },
      code: `server.use(http.get('/api/user', () => HttpResponse.json({ name: 'Asha' })));`,
    },
    {
      heading: { en: 'Render with the providers the component needs', hi: 'Component ko jo providers chahiye unke saath render karo' },
      body: {
        en: 'A component that reads a router, a theme or a query client will throw without them. Write one custom render helper that wraps everything, and use it everywhere instead of repeating the wrappers in each test.',
        hi: 'Jo component router, theme ya query client padhta hai wo unke bina error dega. Ek custom render helper likho jo sab kuch lapet de, aur har test mein wrappers dohraane ki jagah wahi use karo.',
      },
      code: `function renderWithProviders(ui) {
  return render(ui, { wrapper: ({ children }) => (
    <QueryClientProvider client={qc}><Router>{children}</Router></QueryClientProvider>
  )});
}`,
    },
    {
      heading: { en: 'What to test, and what not to', hi: 'Kya test karna, kya nahi' },
      body: {
        en: 'Test what the user sees for a given input, what happens on interaction, edge cases like empty, loading and error, and accessibility. Do not test that React re-renders, do not snapshot whole components — snapshots break on every styling change and nobody reads the diff — and do not test library internals.',
        hi: 'Test karo ki kisi input pe user ko kya dikhta hai, interaction pe kya hota hai, khaali, loading aur error jaise edge cases, aur accessibility. Ye mat test karo ki React re-render karta hai, poore components ka snapshot mat lo — snapshots har styling badlaav pe tootte hain aur diff koi nahi padhta — aur library ke andar ka mat test karo.',
      },
    },
    {
      heading: { en: 'Know where the boundaries are', hi: 'Jaano seemayein kahan hain' },
      body: {
        en: 'Vitest or Jest with Testing Library for units and integration. Playwright or Cypress for real end-to-end flows in a browser. Testing Library runs in jsdom, which has no layout engine — so anything about actual position, size or visual appearance needs a real browser.',
        hi: 'Units aur integration ke liye Vitest ya Jest with Testing Library. Browser mein asli end-to-end flows ke liye Playwright ya Cypress. Testing Library jsdom mein chalti hai, jisme layout engine hai hi nahi — toh asli jagah, size ya dikhawat wali koi bhi baat ke liye asli browser chahiye.',
      },
    },
  ],
};
