// TypeScript curriculum — beginner -> intermediate -> advanced.
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
  title: 'TypeScript',
  slug: 'typescript',
  description:
    'JavaScript ko type-safe banao — types, interfaces, generics aur advanced patterns. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🔷',
  tags: ['typescript', 'javascript', 'frontend', 'backend'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 10,
};

const beginner = [
  {
    title: 'TypeScript Basics',
    level: 'beginner',
    description: 'TypeScript kya hai, setup aur basic types.',
    concepts: [
      {
        title: 'What is TypeScript',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'TypeScript is a superset of JavaScript that adds static type checking. You write TypeScript, it compiles down to plain JavaScript. Types let you catch bugs at compile time — before your code even runs — and give editors powerful autocomplete.',
          hinglish:
            'TypeScript JavaScript ka superset hai jo static type checking add karta hai. Tum TypeScript likhte ho, ye plain JavaScript mein compile ho jaata hai. Types compile time pe bugs pakad lete hain — code chalane se pehle hi — aur editors ko powerful autocomplete dete hain.',
        },
        dailyLifeExample:
          'JavaScript ek aisi kitchen hai jahan koi label nahi — tum koi bhi dabba kisi bhi shelf pe rakh sakte ho. TypeScript mein har shelf labelled hai: "yahan sirf masale rakhein". Galat cheez rakhte hi warning aa jaati hai.',
        codeExample:
          '// JavaScript — no safety\nlet age = 25;\nage = "twenty five"; // no error, but wrong!\n\n// TypeScript — type safety\nlet age: number = 25;\nage = "twenty five"; // Error: Type \'string\' not assignable to type \'number\'',
        keyPoints: [
          'Superset of JavaScript — all JS is valid TS',
          'Adds static typing caught at compile time',
          'Compiles to plain JS (no TS in the browser)',
          'Improves autocomplete and refactoring in editors',
        ],
        quiz: [
          {
            question: 'TypeScript is a…',
            options: ['New language unrelated to JS', 'Superset of JavaScript', 'JavaScript runtime', 'CSS preprocessor'],
            correctIndex: 1,
          },
          {
            question: 'TypeScript code runs…',
            options: ['Directly in the browser', 'After compiling to JavaScript', 'Only in Node.js', 'In Deno only'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is TypeScript and why would you use it over plain JavaScript?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'TypeScript is a statically-typed superset of JavaScript. You use it to catch type errors at compile time rather than runtime, get richer editor tooling (autocomplete, refactoring), and make large codebases easier to maintain. It compiles to plain JS so it runs anywhere JS runs.',
              hinglish:
                'TypeScript JavaScript ka statically-typed superset hai. Ise isliye use karte hain taaki type errors runtime ki jagah compile time pe pakad sakein, better editor tooling mile, aur bade codebases maintain karna easy ho. Ye plain JS mein compile hota hai isliye jahan JS chalta hai wahan ye bhi chalta hai.',
            },
          },
        ],
      },
      {
        title: 'Basic Types',
        difficulty: 'easy',
        tags: ['types', 'basics'],
        explanation: {
          english:
            'TypeScript has built-in primitive types: string, number, boolean, null, undefined, and special types any, unknown, never, and void. You annotate variables with a colon followed by the type. TypeScript can also infer types automatically when you assign a value.',
          hinglish:
            'TypeScript mein built-in primitive types hain: string, number, boolean, null, undefined, aur special types any, unknown, never, void. Variables ko colon ke baad type likh ke annotate karte hain. TypeScript value assign karte waqt types automatically infer bhi kar sakta hai.',
        },
        dailyLifeExample:
          'Types jaise ration card pe categories hain — "2 kg chawal, 1 litre tel". Tum ghee wali jagah tel nahi dal sakte. TypeScript exactly wahi karta hai — sahi type sahi jagah.',
        codeExample:
          'let name: string = "Arjun";\nlet age: number = 22;\nlet isActive: boolean = true;\n\n// Type inference — TypeScript figures it out\nlet city = "Delhi"; // inferred as string\n\n// Special types\nlet anything: any = 42;     // escape hatch — avoid if possible\nlet value: unknown = "hi";  // safer than any — must narrow before use\n\nfunction greet(): void {    // returns nothing\n  console.log("Namaste!");\n}',
        keyPoints: [
          'Primitives: string, number, boolean',
          'Special: any (unsafe), unknown (safe), void, never',
          'Type inference works without explicit annotation',
          'Prefer unknown over any for external data',
        ],
        quiz: [
          {
            question: 'Which type is safer for unknown external data?',
            options: ['any', 'unknown', 'void', 'never'],
            correctIndex: 1,
          },
          {
            question: 'What does "type inference" mean?',
            options: [
              'TypeScript forces you to annotate every variable',
              'TypeScript guesses the type from the assigned value',
              'Types are checked at runtime',
              'A special TS-only type',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between `any` and `unknown` in TypeScript?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                '`any` turns off type checking entirely — you can call anything on it without error. `unknown` is a type-safe alternative; you must narrow the type (using typeof, instanceof, or a type guard) before you can use it. Prefer `unknown` for data whose shape you don\'t know yet.',
              hinglish:
                '`any` type checking completely off kar deta hai — uss pe kuch bhi call kar sakte ho bina error ke. `unknown` type-safe alternative hai; use karne se pehle type narrow karna padta hai (typeof, instanceof ya type guard se). Jab data ka shape na pata ho tab `unknown` prefer karo.',
            },
          },
        ],
      },
      {
        title: 'Arrays and Tuples',
        difficulty: 'easy',
        tags: ['arrays', 'tuples', 'types'],
        explanation: {
          english:
            'Arrays in TypeScript are typed using `Type[]` or `Array<Type>` syntax. Tuples are fixed-length arrays where each position has a specific type — useful for returning multiple values from a function or representing CSV-like rows.',
          hinglish:
            'TypeScript mein arrays `Type[]` ya `Array<Type>` syntax se typed hote hain. Tuples fixed-length arrays hain jahan har position ka specific type hota hai — multiple values return karne ya CSV-like rows represent karne ke liye useful.',
        },
        dailyLifeExample:
          'Array ek dabba hai jo sirf ek type ki cheez rakhta hai — "sirf apples ka basket". Tuple thali jaisi hai — "pehli jagah roti, doosri jagah sabzi, teesri jagah dal" — order aur type fixed.',
        codeExample:
          '// Typed arrays\nconst scores: number[] = [95, 87, 76];\nconst names: Array<string> = ["Arjun", "Priya"];\n\n// Tuple — fixed shape\nconst point: [number, number] = [10, 20];\nconst entry: [string, number] = ["Arjun", 95];\n\n// Destructure tuple\nconst [x, y] = point;\nconsole.log(x, y); // 10 20',
        keyPoints: [
          'Array: Type[] or Array<Type>',
          'Tuple: fixed length, each index has its own type',
          'Tuples useful for returning multiple values',
          'Destructuring works on tuples',
        ],
        quiz: [
          {
            question: 'What is a TypeScript tuple?',
            options: [
              'A dynamic array',
              'A fixed-length array with per-index types',
              'An array of objects',
              'Same as a Set',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you use a tuple instead of an array in TypeScript?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Use a tuple when you have a fixed number of elements where each position has a known, potentially different type — like a [latitude, longitude] coordinate, a [key, value] pair, or a function returning [data, error]. Arrays are better when all elements are the same type and the length is dynamic.',
              hinglish:
                'Tuple tab use karo jab fixed number of elements hoon aur har position ka known, possibly alag type ho — jaise [latitude, longitude] coordinate, [key, value] pair, ya function jo [data, error] return kare. Arrays tab better hain jab sab elements same type ke hoon aur length dynamic ho.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Interfaces and Type Aliases',
    level: 'beginner',
    description: 'Objects shape define karna — interface aur type alias.',
    concepts: [
      {
        title: 'Interfaces',
        difficulty: 'easy',
        tags: ['interface', 'object-types'],
        explanation: {
          english:
            'An interface defines the shape of an object — which properties it must have and their types. Any object that has those properties satisfies the interface (structural typing). Interfaces are open — you can extend them later by declaring them again.',
          hinglish:
            'Interface ek object ki shape define karta hai — kaun se properties hone chahiye aur unke types kya hain. Jo bhi object un properties ko rakhta hai woh interface satisfy karta hai (structural typing). Interfaces open hain — baad mein re-declare karke extend kar sakte ho.',
        },
        dailyLifeExample:
          'Interface ek job requirement list jaisi hai — "candidate ke paas degree, 2 saal experience aur communication skills honi chahiye." Koi bhi person jo ye criteria meet karta hai woh job ke liye eligible hai — name ya background matter nahi karta.',
        codeExample:
          'interface User {\n  id: number;\n  name: string;\n  email: string;\n  age?: number; // optional\n}\n\nfunction greetUser(user: User) {\n  console.log(`Namaste, ${user.name}!`);\n}\n\nconst arjun: User = { id: 1, name: "Arjun", email: "a@test.com" };\ngreetUser(arjun); // ✓\n\n// Interface extension\ninterface Admin extends User {\n  role: "admin" | "superadmin";\n}',
        keyPoints: [
          'Defines object shapes with required/optional properties',
          'Structural typing — shape matters, not name',
          'Optional properties use ? suffix',
          'Can extend other interfaces with extends',
        ],
        quiz: [
          {
            question: 'What does `age?: number` mean in an interface?',
            options: [
              'age is required and must be a number',
              'age is optional and if present must be a number',
              'age can be any type',
              'age is a function that returns number',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between an interface and a type alias in TypeScript?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Both describe types. Key differences: Interfaces are extendable (declaration merging — you can open them again) and use extends for inheritance. Type aliases can represent any type (unions, primitives, tuples) not just objects, and use & for intersection. For object shapes, both work; prefer interface for public API shapes (extensible) and type alias for unions and computed types.',
              hinglish:
                'Dono types describe karte hain. Main differences: Interfaces extendable hain (declaration merging — dubara open kar sakte ho) aur inheritance ke liye extends use karte hain. Type aliases kisi bhi type ko represent kar sakte hain (unions, primitives, tuples) sirf objects nahi, aur intersection ke liye & use karte hain. Object shapes ke liye dono chalte hain; public API shapes ke liye interface prefer karo (extensible) aur unions aur computed types ke liye type alias.',
            },
          },
        ],
      },
      {
        title: 'Type Aliases and Union Types',
        difficulty: 'easy',
        tags: ['type-alias', 'union', 'types'],
        explanation: {
          english:
            'A type alias gives a name to any type — objects, unions, intersections, or primitives. Union types (A | B) mean a value can be one of several types. Intersection types (A & B) combine multiple types into one.',
          hinglish:
            'Type alias kisi bhi type ko ek naam deta hai — objects, unions, intersections, ya primitives. Union types (A | B) ka matlab hai value kai types mein se koi ek ho sakti hai. Intersection types (A & B) kai types ko ek mein combine karte hain.',
        },
        dailyLifeExample:
          'Union type ek aisa box jaisa hai jisme ya toh book aa sakti hai ya magazine — dono allow hain. Intersection type woh person jaisa hai jo doctor bhi hai aur engineer bhi — dono qualifications ek saath.',
        codeExample:
          'type ID = string | number; // union\ntype Status = "pending" | "active" | "inactive"; // literal union\n\ntype Point = { x: number; y: number };\ntype Named = { name: string };\ntype NamedPoint = Point & Named; // intersection\n\nfunction printId(id: ID) {\n  if (typeof id === "string") {\n    console.log("String ID:", id.toUpperCase());\n  } else {\n    console.log("Number ID:", id);\n  }\n}',
        keyPoints: [
          'type alias = shorthand for any type expression',
          'Union (|): value is one of several types',
          'Intersection (&): value has all combined properties',
          'Literal unions restrict to specific values',
        ],
        quiz: [
          {
            question: 'What does `type Status = "pending" | "active"` mean?',
            options: [
              'Status is a string',
              'Status can only be "pending" or "active"',
              'Status is a boolean',
              'Status is optional',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is a discriminated union in TypeScript?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A discriminated union is a union of types that share a common literal property (the discriminant). You switch on that property to narrow the type safely. Example: shapes with a `kind: "circle" | "square"` field — checking `kind === "circle"` tells TS the object is a circle and has a `radius` property.',
              hinglish:
                'Discriminated union un types ka union hai jo ek common literal property (discriminant) share karte hain. Uss property pe switch karke type safely narrow kar sakte ho. Example: shapes mein `kind: "circle" | "square"` field ho — `kind === "circle"` check karne se TS samajh jaata hai ki object circle hai aur uske paas `radius` property hai.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Generics',
    level: 'intermediate',
    description: 'Reusable, type-safe code likhna generics ke saath.',
    concepts: [
      {
        title: 'Generic Functions',
        difficulty: 'medium',
        tags: ['generics', 'functions'],
        explanation: {
          english:
            'Generics let you write reusable functions and types that work with any type while still being type-safe. You define a type parameter (like T) that acts as a placeholder — the caller decides the actual type. This avoids using `any` while keeping flexibility.',
          hinglish:
            'Generics aapko reusable functions aur types likhne dete hain jo kisi bhi type ke saath kaam karein aur phir bhi type-safe rahein. Ek type parameter define karte hain (jaise T) jo placeholder ki tarah kaam karta hai — caller actual type decide karta hai. Isse `any` use kiye bina flexibility milti hai.',
        },
        dailyLifeExample:
          'Generic ek dabba jaisa hai jiska andar ka type baad mein decide hota hai — "yeh container kuch bhi hold kar sakta hai par ek baar decide hone ke baad sirf wohi type." Jaise ek thela jo ya toh fruits ke liye ya vegetables ke liye use ho, dono ek saath nahi.',
        codeExample:
          '// Without generics — loses type info\nfunction identity(arg: any): any { return arg; }\n\n// With generics — type-safe\nfunction identity<T>(arg: T): T { return arg; }\n\nconst num = identity<number>(42);    // num: number\nconst str = identity("hello");       // inferred: string\n\n// Generic array function\nfunction first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconst n = first([1, 2, 3]);          // n: number | undefined',
        keyPoints: [
          'Type parameter T is a placeholder decided at call time',
          'Generics keep type safety without losing flexibility',
          'TS can often infer the type parameter',
          'Can constrain T with extends: <T extends object>',
        ],
        quiz: [
          {
            question: 'What is the main benefit of generics over using `any`?',
            options: [
              'Generics are faster at runtime',
              'Generics preserve type information while staying flexible',
              'Generics remove the need for interfaces',
              'Generics only work with arrays',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain generics in TypeScript with an example.',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Generics allow writing reusable code that works across types while maintaining type safety. A generic function like `function wrap<T>(val: T): { value: T }` preserves the input type through the output. Without generics you\'d use `any` and lose safety, or write duplicate functions for each type. Common uses: utility functions, generic containers (Stack<T>), API response wrappers.',
              hinglish:
                'Generics reusable code likhne dete hain jo multiple types ke saath kaam kare par type safety maintain kare. `function wrap<T>(val: T): { value: T }` jaisi generic function input type ko output mein preserve karti hai. Generics ke bina `any` use karna padta aur safety jaati, ya har type ke liye alag function likhna padta. Common uses: utility functions, generic containers (Stack<T>), API response wrappers.',
            },
          },
        ],
      },
      {
        title: 'Generic Interfaces and Constraints',
        difficulty: 'medium',
        tags: ['generics', 'constraints', 'interface'],
        explanation: {
          english:
            'Generic interfaces and type aliases let you parameterise entire type shapes. You can constrain a type parameter with `extends` to ensure it has certain properties. The `keyof` operator lets you express "any key of this object type".',
          hinglish:
            'Generic interfaces aur type aliases poori type shapes ko parameterise karne dete hain. `extends` se type parameter constrain kar sakte ho taaki uske paas certain properties zaroor hoon. `keyof` operator "is object type ki koi bhi key" express karne deta hai.',
        },
        dailyLifeExample:
          'Constraint ek company job requirement jaisi hai: "candidate ke paas kuch bhi ho sakta hai, par graduation zaroor chahiye." Generic constraint kehta hai: "T kuch bhi ho sakta hai, par iske paas `name` property zaroor honi chahiye."',
        codeExample:
          'interface Repository<T> {\n  findById(id: number): T | undefined;\n  findAll(): T[];\n  save(item: T): void;\n}\n\n// Constraint: T must have an id property\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { id: 1, name: "Arjun", age: 22 };\nconst name = getProperty(user, "name"); // type: string\nconst id   = getProperty(user, "id");   // type: number',
        keyPoints: [
          'Generic interfaces parameterise entire shapes',
          '<T extends SomeType> constrains what T can be',
          'keyof T gives union of all keys of T',
          'T[K] (indexed access) gives the type at key K',
        ],
        quiz: [
          {
            question: 'What does `<T extends { length: number }>` mean?',
            options: [
              'T must be a number',
              'T can be any type that has a length property',
              'T is extended by length',
              'T must be an array',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is `keyof` in TypeScript?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                '`keyof T` produces a union type of all the keys of type T. For example, `keyof { name: string; age: number }` gives `"name" | "age"`. It is often combined with generics to write type-safe property accessors: `function get<T, K extends keyof T>(obj: T, key: K): T[K]`.',
              hinglish:
                '`keyof T` type T ki saari keys ka union type produce karta hai. Example: `keyof { name: string; age: number }` deta hai `"name" | "age"`. Ye aksar generics ke saath use hota hai type-safe property accessors likhne ke liye: `function get<T, K extends keyof T>(obj: T, key: K): T[K]`.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'TypeScript with React',
    level: 'intermediate',
    description: 'React components ko TypeScript ke saath type-safe banana.',
    concepts: [
      {
        title: 'Typing Props and State',
        difficulty: 'medium',
        tags: ['react', 'props', 'state', 'typescript'],
        explanation: {
          english:
            'In React + TypeScript you define an interface or type alias for your component props. For hooks, useState infers types from the initial value, but you can pass a type parameter when needed. React.FC<Props> (or just the props type inline) annotates function components.',
          hinglish:
            'React + TypeScript mein component props ke liye interface ya type alias define karte hain. Hooks ke liye useState initial value se type infer karta hai, par zaroorat ho toh type parameter pass kar sakte ho. React.FC<Props> (ya inline props type) function components annotate karta hai.',
        },
        dailyLifeExample:
          'Props interface ek delivery form jaisi hai jisme likha ho "naam zaroor bharo, phone optional hai." TypeScript ensure karta hai ki jo component use kare woh sahi data de — galat data compile time pe pakad jaata hai.',
        codeExample:
          'interface ButtonProps {\n  label: string;\n  onClick: () => void;\n  disabled?: boolean;\n  variant?: "primary" | "secondary";\n}\n\nfunction Button({ label, onClick, disabled = false, variant = "primary" }: ButtonProps) {\n  return (\n    <button onClick={onClick} disabled={disabled} className={variant}>\n      {label}\n    </button>\n  );\n}\n\n// useState with explicit type\nconst [count, setCount] = useState<number>(0);\nconst [user, setUser] = useState<User | null>(null);',
        keyPoints: [
          'Define Props interface and destructure in the parameter',
          'useState infers type from initial value',
          'useState<T>(null) when initial value doesn\'t tell the full story',
          'Event types: React.MouseEvent, React.ChangeEvent<HTMLInputElement>',
        ],
        quiz: [
          {
            question: 'How do you type a click handler in a React TypeScript component?',
            options: [
              'onClick: Function',
              'onClick: () => void',
              'onClick: any',
              'onClick: click',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you type event handlers in React with TypeScript?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Use React\'s built-in event types. For a button click: `React.MouseEvent<HTMLButtonElement>`. For an input change: `React.ChangeEvent<HTMLInputElement>`. For a form submit: `React.FormEvent<HTMLFormElement>`. The generic parameter is the HTML element the event fires on.',
              hinglish:
                'React ke built-in event types use karo. Button click ke liye: `React.MouseEvent<HTMLButtonElement>`. Input change ke liye: `React.ChangeEvent<HTMLInputElement>`. Form submit ke liye: `React.FormEvent<HTMLFormElement>`. Generic parameter woh HTML element hai jis pe event fire hota hai.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Advanced Types',
    level: 'advanced',
    description: 'Utility types, conditional types aur mapped types.',
    concepts: [
      {
        title: 'Utility Types',
        difficulty: 'hard',
        tags: ['utility-types', 'advanced'],
        explanation: {
          english:
            'TypeScript ships built-in utility types that transform existing types: Partial<T> makes all properties optional, Required<T> makes all required, Readonly<T> prevents mutation, Pick<T, K> selects properties, Omit<T, K> removes properties, Record<K, V> builds a map type.',
          hinglish:
            'TypeScript built-in utility types ship karta hai jo existing types transform karte hain: Partial<T> sab properties optional banata hai, Required<T> sab required, Readonly<T> mutation rokta hai, Pick<T, K> properties select karta hai, Omit<T, K> properties remove karta hai, Record<K, V> map type banata hai.',
        },
        dailyLifeExample:
          'Utility types ready-made tools ki tarah hain. Partial ek rough draft jaisa hai — sab kuch fill karna zaroor nahi. Readonly security seal jaisi hai — ek baar set karo, phir change nahi. Omit scissors jaisi hai — type se kuch properties kaat do.',
        codeExample:
          'interface User {\n  id: number;\n  name: string;\n  email: string;\n  password: string;\n}\n\ntype PartialUser  = Partial<User>;           // all optional\ntype PublicUser   = Omit<User, "password">;  // remove sensitive field\ntype UserPreview  = Pick<User, "id" | "name">;\ntype ReadonlyUser = Readonly<User>;\n\n// Record — build a lookup map\ntype RoleMap = Record<"admin" | "user" | "guest", string[]>;\nconst permissions: RoleMap = {\n  admin: ["read", "write", "delete"],\n  user: ["read", "write"],\n  guest: ["read"],\n};',
        keyPoints: [
          'Partial<T> — all properties optional',
          'Omit<T, K> — remove keys from T',
          'Pick<T, K> — keep only specified keys',
          'Record<K, V> — object with keys K and values V',
        ],
        quiz: [
          {
            question: 'What does `Omit<User, "password">` produce?',
            options: [
              'A User with password set to never',
              'A User type without the password property',
              'An error',
              'A User where password is optional',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Name five TypeScript utility types and what they do.',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Partial<T>: all props optional. Required<T>: all props required. Readonly<T>: props are read-only. Pick<T, K>: keep only keys K. Omit<T, K>: remove keys K. Record<K, V>: map from keys K to values V. ReturnType<F>: extract the return type of a function. NonNullable<T>: remove null and undefined.',
              hinglish:
                'Partial<T>: sab props optional. Required<T>: sab props required. Readonly<T>: props read-only. Pick<T, K>: sirf K keys rakho. Omit<T, K>: K keys hata do. Record<K, V>: K keys se V values ka map. ReturnType<F>: function ka return type extract karo. NonNullable<T>: null aur undefined remove karo.',
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
    question: 'Should you enable strict mode in TypeScript? What does it do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Yes — always enable strict mode (`"strict": true` in tsconfig). It turns on a bundle of checks: strictNullChecks (variables can\'t be null/undefined unless you say so), noImplicitAny (no silent any), strictFunctionTypes, and more. These catch the most common bugs. The initial pain of fixing errors is worth the long-term safety.',
      hinglish:
        'Haan — hamesha strict mode enable karo (tsconfig mein `"strict": true`). Ye kai checks on karta hai: strictNullChecks (variables null/undefined nahi ho sakte jab tak explicitly na likho), noImplicitAny (silent any nahi), strictFunctionTypes, aur aur bhi. Ye sabse common bugs pakad lete hain. Errors fix karne ki initial takleef long-term safety ke liye worth hai.',
    },
  },
];
