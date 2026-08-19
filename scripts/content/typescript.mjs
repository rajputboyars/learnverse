// TypeScript curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs, consumed by scripts/seed.mjs.

import { deepDives } from './typescript-deep-dives.mjs';

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
            frequency: 'common',
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
          {
            question: 'const point: [number, number] = [10, 20]; point[0] = "ten"; — what happens?',
            options: [
              'Works fine, JS is flexible',
              'TypeScript throws a compile error — index 0 must be a number, not a string',
              'It silently converts "ten" to 10',
              'Only a runtime error, not a compile-time one',
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
      {
        title: 'Enums',
        difficulty: 'easy',
        tags: ['enums', 'types'],
        explanation: {
          english:
            'An enum defines a set of named constants, giving meaningful names to a fixed group of related values instead of using raw numbers or strings scattered through code. A numeric enum auto-assigns 0, 1, 2... to each member unless you specify otherwise. A string enum requires you to give each member an explicit string value, which is safer for debugging (logs show the name, not a number).',
          hinglish:
            'Enum named constants ka ek set define karta hai, fixed group ki related values ko meaningful naam deta hai raw numbers ya strings code mein bikhairne ke bajaye. Numeric enum har member ko apne aap 0, 1, 2... assign karta hai jab tak alag na bolo. String enum har member ko explicit string value dene ki zaroorat padti hai, jo debugging ke liye safer hai (logs mein naam dikhta hai, number nahi).',
        },
        dailyLifeExample:
          "Enum ek traffic signal ke fixed colors jaisa hai — RED, YELLOW, GREEN. Sirf inhi teen options mein se ek ho sakta hai, koi bhi random string/number nahi. Code padhne wale ko turant samajh aata hai 'RED' ka matlab kya hai, '0' ka nahi.",
        codeExample:
          "// numeric enum (auto-assigned: 0, 1, 2)\nenum Direction {\n  Up,    // 0\n  Down,  // 1\n  Left,  // 2\n  Right, // 3\n}\n\n// string enum (safer — explicit, readable values)\nenum Status {\n  Pending = 'PENDING',\n  Active = 'ACTIVE',\n  Inactive = 'INACTIVE',\n}\n\nfunction move(dir: Direction) {\n  if (dir === Direction.Up) console.log('Moving up');\n}\nmove(Direction.Up);\n\nfunction setStatus(s: Status) {\n  console.log(s); // logs 'ACTIVE', not a confusing number\n}\nsetStatus(Status.Active);",
        keyPoints: [
          'enum groups a fixed set of related named constants',
          'Numeric enums auto-assign 0, 1, 2... unless overridden',
          'String enums require explicit values but are more debuggable (readable in logs)',
          'Prevents "magic numbers/strings" scattered through code',
          'Access members with EnumName.Member (e.g. Status.Active)',
        ],
        quiz: [
          {
            question: 'In enum Direction { Up, Down, Left, Right }, what value does Down have by default?',
            options: ['0', '1', '"Down"', 'undefined'],
            correctIndex: 1,
          },
          {
            question: 'Why might a string enum be preferred over a numeric one for debugging?',
            options: ['String enums run faster', 'When logged, a string enum shows a readable name (e.g. "ACTIVE") instead of a confusing number', 'Numeric enums do not exist', 'String enums use less memory'],
            correctIndex: 1,
          },
          {
            question: 'What problem do enums mainly solve?',
            options: ['Making code run faster', 'Replacing scattered "magic numbers/strings" with a fixed set of meaningful named constants', 'Removing the need for interfaces', 'Adding runtime type checking'],
            correctIndex: 1,
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
          {
            question: 'A function expects a User interface. You pass a plain object that has ALL the required properties but was never explicitly typed as User. Does TypeScript accept it?',
            options: [
              'No, it must be explicitly typed as User',
              'Yes — TypeScript uses structural typing, so any object with a matching shape satisfies the interface',
              'Only if you use `as User`',
              'Only in strict mode',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between an interface and a type alias in TypeScript?',
            difficulty: 'medium',
            frequency: 'common',
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
          {
            question: 'Inside `printId`, why does `id.toUpperCase()` work inside the `if (typeof id === "string")` block but would error outside it?',
            options: [
              'It never works',
              'TypeScript narrows the union type ID (string | number) to just string inside that block, since a runtime check confirmed it',
              'toUpperCase always works on any type',
              'It is a bug in TypeScript',
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
      {
        title: 'Type Narrowing & Type Guards',
        difficulty: 'medium',
        tags: ['narrowing', 'type-guards', 'union'],
        explanation: {
          english:
            "When a variable has a union type (like string | number), TypeScript won't let you use type-specific methods until it can prove which type you actually have at that point — this proving process is called narrowing. Common narrowing techniques: typeof (for primitives), instanceof (for classes), the in operator (checking if a property exists), and discriminated unions (checking a shared literal 'kind' field). Inside each narrowed branch, TypeScript automatically knows the exact type.",
          hinglish:
            "Jab ek variable ka union type ho (jaise string | number), TypeScript tumhe type-specific methods use nahi karne deta jab tak wo prove na kar le ki us point pe actually kaunsa type hai — is proving process ko narrowing kehte hain. Common narrowing techniques: typeof (primitives ke liye), instanceof (classes ke liye), in operator (property exist karti hai ya nahi check karna), aur discriminated unions (ek shared literal 'kind' field check karna). Har narrowed branch ke andar, TypeScript automatically exact type jaan leta hai.",
        },
        dailyLifeExample:
          "Narrowing ek courier delivery jaisa hai jo pehle package check karta hai 'ye letter hai ya parcel?' (typeof/instanceof check), phir uske hisaab se sahi handling karta hai — letter ko letterbox mein daalo, parcel ko doorbell bajake do. Bina check kiye galat handling ho sakti hai.",
        codeExample:
          "function printLength(value: string | number[]) {\n  // typeof narrowing\n  if (typeof value === 'string') {\n    console.log(value.length); // TS knows value is a string here\n  } else {\n    console.log(value.length); // TS knows value is number[] here\n  }\n}\n\ninterface Circle { kind: 'circle'; radius: number; }\ninterface Square { kind: 'square'; side: number; }\ntype Shape = Circle | Square;\n\nfunction area(shape: Shape): number {\n  // discriminated union narrowing on 'kind'\n  if (shape.kind === 'circle') {\n    return Math.PI * shape.radius ** 2; // TS knows it's a Circle here\n  }\n  return shape.side ** 2; // TS knows it's a Square here\n}\n\nclass Dog { bark() {} }\nclass Cat { meow() {} }\nfunction speak(animal: Dog | Cat) {\n  if (animal instanceof Dog) animal.bark(); // instanceof narrowing\n  else animal.meow();\n}",
        keyPoints: [
          'Narrowing = proving to TypeScript which specific type you have, within a union',
          'typeof narrows primitives (string, number, boolean)',
          'instanceof narrows class instances',
          'Discriminated unions narrow via a shared literal field (e.g. kind)',
          'Inside each narrowed branch, TS gives you full autocomplete for that specific type',
        ],
        quiz: [
          {
            question: "Why can't you call value.toUpperCase() directly on a value: string | number without narrowing first?",
            options: ['You always can, TypeScript does not check this', 'number does not have a toUpperCase method, so TypeScript blocks it until you prove value is a string', 'toUpperCase is deprecated', 'It only works with any'],
            correctIndex: 1,
          },
          {
            question: "What is a 'discriminated union'?",
            options: ['A union of exactly two types', 'A union of object types sharing a common literal property (like kind) used to narrow which type you have', 'Any union type', 'A type with no properties'],
            correctIndex: 1,
          },
          {
            question: 'Which operator narrows a union based on whether a value is an instance of a specific class?',
            options: ['typeof', 'instanceof', 'in', 'as'],
            correctIndex: 1,
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
          {
            question: 'const str = identity("hello"); — without writing identity<string>(...), how does TypeScript know T is string?',
            options: [
              'It defaults to string always',
              'TypeScript infers T automatically from the argument you pass in',
              'You must always specify it manually',
              'It becomes any',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain generics in TypeScript with an example.',
            difficulty: 'medium',
            frequency: 'common',
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
          {
            question: 'In `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`, what does the return type T[K] mean?',
            options: [
              'T multiplied by K',
              'The type of the value at key K in object type T (an indexed access type)',
              'An array of T',
              'A generic constraint only',
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
          {
            question: 'const [user, setUser] = useState<User | null>(null); — why is the explicit <User | null> needed instead of letting TypeScript infer it?',
            options: [
              'It is never needed',
              'Inferring from just `null` would type user as always null; the explicit type tells TS it will later hold a User too',
              'useState requires it by syntax',
              'It makes the app faster',
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
  {
    title: 'Classes & OOP in TypeScript',
    level: 'intermediate',
    description: 'Access modifiers aur interfaces ke saath type-safe classes.',
    concepts: [
      {
        title: 'Classes in TypeScript: Access Modifiers',
        difficulty: 'medium',
        tags: ['classes', 'oop', 'access-modifiers'],
        explanation: {
          english:
            "TypeScript adds access modifiers to classes that plain JavaScript doesn't enforce at compile time: public (default — accessible from anywhere), private (only accessible inside the class itself), and protected (accessible inside the class and its subclasses, but not from outside). A class can implement an interface (implements) to guarantee it has certain properties/methods, distinct from extends which inherits from another class.",
          hinglish:
            'TypeScript classes mein access modifiers add karta hai jo plain JavaScript compile time pe enforce nahi karta: public (default — kahin se bhi accessible), private (sirf class ke andar accessible), aur protected (class aur uske subclasses ke andar accessible, par bahar se nahi). Ek class ek interface implement kar sakti hai (implements) guarantee dene ke liye ki uske paas certain properties/methods hain, jo extends se alag hai (jo doosri class se inherit karta hai).',
        },
        dailyLifeExample:
          'public ek dukaan ka reception counter hai — koi bhi customer aa sakta hai. private ek staff-only backroom hai — sirf employees (class ke andar ka code) andar jaa sakte hain. protected ek family business ka locker hai — sirf family members (subclasses) access kar sakte hain, bahar wale nahi.',
        codeExample:
          "interface Payable {\n  getSalary(): number;\n}\n\nclass Employee implements Payable {\n  public name: string;       // accessible from anywhere (default)\n  private salary: number;    // only accessible inside Employee\n  protected department: string; // accessible in Employee + subclasses\n\n  constructor(name: string, salary: number, department: string) {\n    this.name = name;\n    this.salary = salary;\n    this.department = department;\n  }\n\n  getSalary(): number {\n    return this.salary; // OK — inside the class\n  }\n}\n\nclass Manager extends Employee {\n  showDept() {\n    console.log(this.department); // OK — protected, accessible in subclass\n    // console.log(this.salary);  // ❌ Error: private, not accessible here\n  }\n}\n\nconst emp = new Employee('Aman', 50000, 'Engineering');\n// emp.salary;  // ❌ Error: private, not accessible outside the class\nemp.getSalary(); // ✓ 50000",
        keyPoints: [
          'public (default): accessible from anywhere',
          'private: only accessible inside the declaring class itself',
          'protected: accessible in the class AND its subclasses, not from outside',
          "implements guarantees a class has an interface's shape; extends inherits from a parent class",
          'These are compile-time checks only — JavaScript at runtime does not enforce them (until real #private fields)',
        ],
        quiz: [
          {
            question: 'Can code OUTSIDE a class access a property marked private?',
            options: ['Yes, always', 'No — private members are only accessible inside the class that declares them', 'Only in subclasses', 'Only with a special import'],
            correctIndex: 1,
          },
          {
            question: 'What is the difference between protected and private?',
            options: ['No difference', 'protected is also accessible in subclasses; private is accessible only within the exact declaring class', 'protected is for functions only', 'private is deprecated'],
            correctIndex: 1,
          },
          {
            question: 'What does implements Payable guarantee about a class?',
            options: ['The class inherits all code from Payable', 'The class must have the properties/methods that the Payable interface requires', 'Nothing, implements is optional syntax', 'The class becomes private'],
            correctIndex: 1,
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
          {
            question: 'What is the key difference between Pick<User, "id"|"name"> and Omit<User, "password">?',
            options: [
              'No difference',
              'Pick KEEPS only the listed keys; Omit REMOVES only the listed keys, keeping everything else',
              'Pick is for arrays, Omit is for objects',
              'Omit is deprecated',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Name five TypeScript utility types and what they do.',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Partial<T>: all props optional. Required<T>: all props required. Readonly<T>: props are read-only. Pick<T, K>: keep only keys K. Omit<T, K>: remove keys K. Record<K, V>: map from keys K to values V. ReturnType<F>: extract the return type of a function. NonNullable<T>: remove null and undefined.',
              hinglish:
                'Partial<T>: sab props optional. Required<T>: sab props required. Readonly<T>: props read-only. Pick<T, K>: sirf K keys rakho. Omit<T, K>: K keys hata do. Record<K, V>: K keys se V values ka map. ReturnType<F>: function ka return type extract karo. NonNullable<T>: null aur undefined remove karo.',
            },
          },
        ],
      },
      {
        title: 'Type Assertions: as and Type Casting',
        difficulty: 'hard',
        tags: ['type-assertion', 'casting', 'advanced'],
        explanation: {
          english:
            "A type assertion (value as Type) tells TypeScript 'trust me, I know this value's type better than you do' — it does NOT convert or check anything at runtime, it just changes how TypeScript treats the value at compile time. This is different from type narrowing (which TypeScript verifies) — an assertion is an unchecked promise from the developer, so using it incorrectly can hide real bugs. Common legitimate use: narrowing a broad DOM type like Element to a specific one like HTMLInputElement after you're sure.",
          hinglish:
            "Type assertion (value as Type) TypeScript ko batata hai 'mujh pe bharosa karo, mujhe is value ka type tumse behtar pata hai' — ye runtime pe kuch convert ya check NAHI karta, sirf compile time pe TypeScript value ko kaise treat kare wo badalta hai. Ye type narrowing se alag hai (jise TypeScript verify karta hai) — assertion developer ka ek unchecked promise hai, isliye galat use karne se asli bugs chhup sakte hain. Common legitimate use: ek broad DOM type jaise Element ko specific type jaise HTMLInputElement mein narrow karna jab tumhe pakka pata ho.",
        },
        dailyLifeExample:
          "Type assertion ek self-declaration form jaisa hai — tum khud bol rahe ho 'main confirm karta hoon ye packet fragile hai', bina kisi ne actually check kiye. Agar tum galat bole, courier company (TypeScript) tumhe rokegi nahi — par package tootne ka risk tumhara hai, unka nahi.",
        codeExample:
          "// DOM element is typed broadly as HTMLElement | null by default\nconst input = document.getElementById('email') as HTMLInputElement;\ninput.value = 'test@example.com'; // .value only exists on HTMLInputElement\n\n// alternative syntax (not usable in .tsx files)\nconst input2 = <HTMLInputElement>document.getElementById('email');\n\n// DANGEROUS: asserting something that is NOT actually true\nconst data = 'hello' as unknown as number; // compiles, but WRONG at runtime\nconsole.log(data + 1); // no compile error, but a nonsensical result\n\n// non-null assertion (!) — 'trust me, this is not null'\nfunction getUser(id: string) {\n  const user = users.find(u => u.id === id);\n  return user!.name; // asserts user is not undefined — risky if it actually is!\n}",
        keyPoints: [
          'value as Type changes how TypeScript treats the value — it does NOT convert or check anything at runtime',
          'Unlike narrowing, TypeScript does not verify an assertion — you are telling it to trust you',
          'A wrong assertion compiles fine but can cause real runtime bugs',
          'Common safe use: narrowing a broad DOM type after you are sure (e.g. Element as HTMLInputElement)',
          'The non-null assertion (value!) asserts something is not null/undefined — use sparingly',
        ],
        quiz: [
          {
            question: 'Does `value as Type` convert or check the value at runtime?',
            options: ['Yes, it converts the value', 'No — it only changes how TypeScript treats the value at compile time; nothing happens at runtime', 'It throws an error if wrong', 'It only works on numbers'],
            correctIndex: 1,
          },
          {
            question: 'What is the risk of using a type assertion incorrectly?',
            options: ['The code will not compile', 'It compiles fine but can hide real bugs, since TypeScript does not verify the assertion is true', 'TypeScript automatically fixes it', 'There is no risk'],
            correctIndex: 1,
          },
          {
            question: 'What is a common LEGITIMATE use of a type assertion?',
            options: ['Converting a string to a number at runtime', 'Narrowing a broad DOM type (like Element) to a more specific one (like HTMLInputElement) when you are certain of it', 'Replacing all interfaces', 'Making a variable private'],
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
    question: 'Should you enable strict mode in TypeScript? What does it do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Yes — always enable strict mode (`"strict": true` in tsconfig). It turns on a bundle of checks: strictNullChecks (variables can\'t be null/undefined unless you say so), noImplicitAny (no silent any), strictFunctionTypes, and more. These catch the most common bugs. The initial pain of fixing errors is worth the long-term safety.',
      hinglish:
        'Haan — hamesha strict mode enable karo (tsconfig mein `"strict": true`). Ye kai checks on karta hai: strictNullChecks (variables null/undefined nahi ho sakte jab tak explicitly na likho), noImplicitAny (silent any nahi), strictFunctionTypes, aur aur bhi. Ye sabse common bugs pakad lete hain. Errors fix karne ki initial takleef long-term safety ke liye worth hai.',
    },
    codeExample: {
      code: `// tsconfig.json
{ "compilerOptions": { "strict": true } }

// strict turns on a family of checks. The two that matter most:

// 1. strictNullChecks — null and undefined stop being assignable
//    to everything
let name: string = null;        // ✗ error with strict
let name: string | null = null; // ✓ you must say so

function f(u?: User) {
  u.name;          // ✗ 'u' is possibly undefined
  u?.name;         // ✓
}

// 2. noImplicitAny — an untyped parameter is an error
function add(a, b) { }          // ✗ a and b implicitly any
function add(a: number, b: number) { }   // ✓

// Also included: strictFunctionTypes, strictBindCallApply,
// strictPropertyInitialization, alwaysStrict.

// The answer is YES, always, on a new project. Without
// strictNullChecks the compiler cannot catch the single most
// common runtime error in JavaScript — reading a property of
// undefined — which is most of the reason to adopt TS at all.

// Migrating an existing codebase: enable them one at a time,
// starting with noImplicitAny, and fix each wave before the next.`,
      output: `error TS2531: Object is possibly 'null'.`,
    },
  },

  // ─── Type System Fundamentals ───────────────────────────────
  {
    question: 'What is the difference between an interface and a type alias?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Both describe object shapes and are largely interchangeable. INTERFACES support DECLARATION MERGING — declaring the same interface twice combines them, which is how you augment third-party types — and they produce clearer error messages. TYPE ALIASES can express things interfaces cannot: unions, intersections, tuples, primitives, and mapped or conditional types. The common convention is interfaces for object shapes you may extend, type aliases for everything else.',
      hinglish:
        'Dono object shapes batate hain aur zyadatar badle ja sakte hain. INTERFACES DECLARATION MERGING support karte hain — ek hi interface do baar declare karna unhe jod deta hai, jisse tum third-party types badhate ho — aur wo clearer error messages dete hain. TYPE ALIASES wo cheezein bata sakte hain jo interfaces nahi: unions, intersections, tuples, primitives, aur mapped ya conditional types. Common convention hai badhaye ja sakne wale object shapes ke liye interfaces, baaki sab ke liye type aliases.',
    },
    codeExample: {
      code: `interface User { id: number }
type UserT = { id: number };
// For plain object shapes these are interchangeable.

// 1. DECLARATION MERGING — interfaces only
interface User { name: string }     // merges with the one above
// User is now { id: number; name: string }
type UserT = { name: string };      // ✗ Duplicate identifier

// 2. Unions, tuples and primitives — type only
type Status = 'on' | 'off';
type Pair = [number, string];
type ID = string | number;
// interface cannot express any of these

// 3. Extending
interface Admin extends User { role: string }        // interface
type AdminT = UserT & { role: string };              // intersection

// 4. Error messages are often clearer with interfaces, because
//    the name is preserved rather than expanded inline.

// Practical rule most teams follow:
//   • interface for object shapes and public APIs — it can be
//     extended by consumers, which is useful for a library
//   • type for unions, tuples, mapped and conditional types

// The merging behaviour is also a hazard: two interfaces with
// the same name in one scope silently combine.`,
      output: `Duplicate identifier 'UserT'.`,
    },
  },
  {
    question: 'What is the difference between any, unknown, and never?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`any` disables type checking entirely — you can call anything on it and TypeScript stays silent, which is how type safety leaks out of a codebase. `unknown` is the SAFE counterpart: it accepts any value but you must narrow it before use, so it forces a check. `never` represents a value that cannot exist — the return type of a function that always throws, and the type of an exhausted union, which is what makes exhaustiveness checking work.',
      hinglish:
        '`any` type checking poori tarah band kar deta hai — tum us pe kuch bhi call kar sakte ho aur TypeScript chup rehta hai, jisse type safety ek codebase se rista hai. `unknown` SURAKSHIT jodidaar hai: ye koi bhi value leta hai par use karne se pehle tumhe use narrow karna padta hai, isliye ye ek check majboor karta hai. `never` ek aisi value batata hai jo exist nahi kar sakti — hamesha throw karne wale function ka return type, aur ek khatam ho chuke union ka type, jisse exhaustiveness checking kaam karti hai.',
    },
    codeExample: {
      code: `// ANY — turns type checking OFF. Anything is allowed.
let a: any = 'hello';
a.foo.bar.baz();          // ✓ compiles, crashes at runtime
const n: number = a;      // ✓ assignable to anything

// UNKNOWN — the SAFE any. You must narrow before using it.
let u: unknown = 'hello';
u.trim();                 // ✗ 'u' is of type 'unknown'
if (typeof u === 'string') u.trim();   // ✓ narrowed first
const n2: number = u;     // ✗ not assignable

// NEVER — a value that can never exist.
function fail(msg: string): never { throw new Error(msg); }
type Impossible = string & number;      // never

// The main use of never — exhaustiveness checking:
type Shape = Circle | Square;
function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return …;
    case 'square': return …;
    default:
      const _exhaustive: never = s;     // ✗ errors if you add
      return _exhaustive;               //   a new Shape later
  }
}

// Rule: never write any. Use unknown at boundaries (JSON, catch)
// and narrow. any silently disables the tool you installed.`,
      output: `Object is of type 'unknown'.`,
    },
  },
  {
    question: 'What is a union type and how do you narrow it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A union such as `string | number` means the value is one of several types, and TypeScript allows only operations valid for ALL members until you narrow it. Narrowing techniques: `typeof` for primitives, `instanceof` for classes, the `in` operator for a distinguishing property, a literal check on a DISCRIMINANT field, and custom type guards returning `x is T`. After narrowing, TypeScript knows the specific type within that branch.',
      hinglish:
        'Ek union jaise `string | number` batata hai ki value kai types mein se ek hai, aur TypeScript tab tak sirf wo operations allow karta hai jo SAARE members ke liye valid hain jab tak tum narrow na karo. Narrowing techniques: primitives ke liye `typeof`, classes ke liye `instanceof`, ek alag karti property ke liye `in` operator, ek DISCRIMINANT field pe ek literal check, aur `x is T` return karte custom type guards. Narrow karne ke baad, TypeScript us branch ke andar khaas type jaanta hai.',
    },
    visual: 'type-narrowing',
    codeExample: {
      code: `type Value = string | number | null;

function show(v: Value) {
  // Here v could be any of the three, so almost nothing is safe:
  // v.trim();      ✗ not on number or null

  if (v === null) return 'none';        // narrows out null
  if (typeof v === 'string') {
    return v.trim();                    // v is string here
  }
  return v.toFixed(2);                  // v must be number
}

// The ways to narrow:
typeof v === 'string'          // primitives
v instanceof Date              // classes
'name' in obj                  // property presence
Array.isArray(v)               // arrays
v === null / v !== undefined   // equality
if (v)                         // truthiness — careful, '' and 0

// A custom type guard when the check is not built in:
function isUser(v: unknown): v is User {
  return typeof v === 'object' && v !== null && 'id' in v;
}
if (isUser(x)) x.id;           // ✓ narrowed

// The truthiness trap:
function f(n: number | undefined) {
  if (!n) return;              // ✗ also rejects 0
  if (n === undefined) return; // ✓ only rejects undefined
}`,
      output: `3.14`,
    },
  },
  {
    question: 'What is a discriminated union and why is it useful?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A discriminated union gives every member a shared LITERAL field — `{ status: "loading" } | { status: "success"; data: T } | { status: "error"; error: E }` — so checking that field narrows the whole object. Its value is making illegal states unrepresentable: you cannot have data and an error simultaneously, unlike three independent booleans. Combined with a `never` check in the default branch, the compiler forces you to handle any newly added case.',
      hinglish:
        'Ek discriminated union har member ko ek saanjha LITERAL field deta hai — `{ status: "loading" } | { status: "success"; data: T } | { status: "error"; error: E }` — isliye us field ko check karna poora object narrow kar deta hai. Iski value galat states ko banne hi na dena hai: tumhare paas ek saath data aur ek error nahi ho sakte, teen swatantra booleans ke ulat. Default branch mein ek `never` check ke saath, compiler tumhe koi bhi naya joda case sambhaalne pe majboor karta hai.',
    },
    visual: 'type-narrowing',
    codeExample: {
      code: `// Each member carries a LITERAL field that identifies it —
// the "discriminant" or "tag".
type State =
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; message: string };

function render(s: State) {
  switch (s.status) {
    case 'loading': return <Spinner />;
    case 'success': return <List items={s.data} />;      // data exists
    case 'error':   return <p>{s.message}</p>;           // message exists
  }
}

// TypeScript narrows on the tag, so each branch knows exactly
// which fields are available. Reading s.data in the error branch
// is a compile error, not a runtime undefined.

// Compare the version everyone writes first:
type BadState = {
  loading: boolean;
  data?: User[];
  error?: string;
};
// This allows nonsense: loading AND error at once, or success
// with no data. You end up writing defensive checks everywhere.

// Add exhaustiveness so a new state cannot be forgotten:
default:
  const _never: never = s;     // ✗ errors when you add a case
  return _never;

// This is probably the single most useful TypeScript pattern
// for modelling application state.`,
      output: `(each branch knows its own fields)`,
    },
  },
  {
    question: 'What are generics and when should you use them?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Generics let a function or type work over MANY types while preserving the relationship between input and output — `function first<T>(arr: T[]): T` returns exactly what went in, whereas `any[]` would lose that. Use them when the type genuinely varies but must be tracked through. Do NOT add a type parameter that appears only once in a signature; that is a sign it should just be a concrete type, and it adds noise without safety.',
      hinglish:
        'Generics ek function ya type ko BAHUT types pe kaam karne dete hain jabki input aur output ka rishta bacha rehta hai — `function first<T>(arr: T[]): T` theek wahi lautaata hai jo gaya tha, jabki `any[]` wo kho deta. Inhe tab use karo jab type genuinely badalta ho par use track karna zaroori ho. Aisa type parameter mat jodo jo ek signature mein sirf ek baar aaye; wo nishaani hai ki use bas ek concrete type hona chahiye, aur wo bina safety ke shor jodta hai.',
    },
    visual: 'generics-flow',
    codeExample: {
      code: `// A generic keeps the relationship between input and output.
function first<T>(items: T[]): T | undefined {
  return items[0];
}

first([1, 2, 3]);        // T = number → number | undefined
first(['a', 'b']);       // T = string → string | undefined

// Without it you lose the type on the way out:
function firstAny(items: any[]): any { return items[0]; }
const x = firstAny([1, 2]);      // any — no autocomplete, no safety

// And without it, one function per type is the alternative:
function firstNumber(items: number[]) {}
function firstString(items: string[]) {}   // duplication

// Generics on types too:
interface Response<T> { data: T; status: number }
const r: Response<User[]> = await getUsers();
r.data[0].name;          // ✓ fully typed

// WHEN to use one: whenever a function's OUTPUT type depends on
// its INPUT type. If it does not, you do not need a generic.

// The mistake — a generic used only once, which is just any
// with extra steps:
function log<T>(x: T): void { console.log(x); }   // pointless
function log(x: unknown): void { console.log(x); } // clearer`,
      output: `1
a`,
    },
  },
  {
    question: 'What are generic constraints?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`extends` restricts what a type parameter may be, so you can safely use its members: `function len<T extends { length: number }>(x: T)` guarantees `x.length` exists. A very common pattern is `K extends keyof T`, which ties a key parameter to an object\'s actual keys so `get(obj, "name")` is checked and returns the right type. Constraints are what turn generics from "any type" into "any type that satisfies this contract".',
      hinglish:
        '`extends` seemit karta hai ki ek type parameter kya ho sakta hai, isliye tum uske members surakshit roop se use kar sakte ho: `function len<T extends { length: number }>(x: T)` guarantee karta hai ki `x.length` hai. Ek bahut common pattern `K extends keyof T` hai, jo ek key parameter ko ek object ki asli keys se jodta hai taaki `get(obj, "name")` check ho aur sahi type laute. Constraints hi generics ko "koi bhi type" se "koi bhi type jo ye contract poora kare" mein badalte hain.',
    },
    visual: 'generics-flow',
    codeExample: {
      code: `// A bare T could be anything, so you cannot touch it:
function longest<T>(a: T, b: T) {
  return a.length > b.length ? a : b;   // ✗ 'length' does not
}                                       //   exist on type 'T'

// extends says "T must at least have this":
function longest<T extends { length: number }>(a: T, b: T) {
  return a.length > b.length ? a : b;   // ✓
}
longest([1, 2], [1, 2, 3]);   // ✓ arrays have length
longest('ab', 'abc');         // ✓ strings do too
longest(1, 2);                // ✗ number has no length

// Note it still returns the SPECIFIC type, not the constraint:
const r = longest('ab', 'abc');   // string, not { length: number }

// The keyof constraint — a genuinely useful pattern:
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { name: 'Asha', age: 25 };
get(user, 'name');    // string ✓
get(user, 'nope');    // ✗ not assignable to 'name' | 'age'

// A default, so callers can skip it:
interface Box<T = string> { value: T }
const b: Box = { value: 'hi' };    // T defaults to string`,
      output: `abc`,
    },
  },
  {
    question: 'What are the main utility types in TypeScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`Partial<T>` makes every property optional — useful for update payloads. `Required<T>` does the reverse. `Pick<T, K>` and `Omit<T, K>` select or exclude properties. `Record<K, V>` builds an object type from a key union. `Readonly<T>` prevents reassignment. `ReturnType<F>` and `Parameters<F>` extract from function types. `Awaited<T>` unwraps a promise. Deriving types from a single source with these keeps them in sync automatically as the source changes.',
      hinglish:
        '`Partial<T>` har property optional banata hai — update payloads ke liye useful. `Required<T>` ulta karta hai. `Pick<T, K>` aur `Omit<T, K>` properties chunte ya hataate hain. `Record<K, V>` ek key union se ek object type banata hai. `Readonly<T>` dobara assign hone se rokta hai. `ReturnType<F>` aur `Parameters<F>` function types se nikaalte hain. `Awaited<T>` ek promise kholta hai. Inse ek hi source se types nikaalna unhe source badalne pe apne aap sync mein rakhta hai.',
    },
    codeExample: {
      code: `interface User { id: number; name: string; email: string }

// Partial — every field optional. Perfect for updates.
type Update = Partial<User>;              // { id?, name?, email? }
function update(id: number, changes: Partial<User>) {}

// Required — the opposite
type Full = Required<Update>;

// Pick — keep only these
type Preview = Pick<User, 'id' | 'name'>;      // { id, name }

// Omit — everything except these. Great for create payloads.
type NewUser = Omit<User, 'id'>;               // { name, email }

// Readonly — no reassignment
type Frozen = Readonly<User>;

// Record — a typed dictionary
type ByRole = Record<'admin' | 'user', User[]>;

// ReturnType / Parameters / Awaited — derive from a function
type R = ReturnType<typeof getUser>;           // whatever it returns
type A = Awaited<ReturnType<typeof getUser>>;  // unwrap the promise

// Exclude / Extract / NonNullable — filter a union
type Status = 'a' | 'b' | 'c';
type NotA = Exclude<Status, 'a'>;              // 'b' | 'c'
type Sure = NonNullable<string | null>;        // string

// The point of all of these: DERIVE types from one source of
// truth instead of writing the same shape three times, which
// then drifts apart.`,
      output: `{ name: string; email: string }`,
    },
  },
  {
    question: 'What is a mapped type?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A mapped type transforms every property of a type: `{ [K in keyof T]: T[K] }` iterates the keys and can add or remove modifiers — `readonly [K in keyof T]?:` makes everything readonly and optional. `Partial`, `Readonly`, and `Record` are all built this way. TypeScript 4.1 added key REMAPPING with `as`, letting you rename keys, which is how you generate a getter type from a data type.',
      hinglish:
        'Ek mapped type ek type ki har property badalta hai: `{ [K in keyof T]: T[K] }` keys pe ghoomta hai aur modifiers jod ya hata sakta hai — `readonly [K in keyof T]?:` sab kuch readonly aur optional bana deta hai. `Partial`, `Readonly`, aur `Record` sab isi tarah bane hain. TypeScript 4.1 ne `as` se key REMAPPING joda, tumhe keys rename karne dete hue, jisse tum ek data type se ek getter type banate ho.',
    },
    codeExample: {
      code: `// A mapped type builds a new type by walking over the keys
// of another one.
type Optional<T> = {
  [K in keyof T]?: T[K];        // this IS how Partial is defined
};

interface User { id: number; name: string }
type MaybeUser = Optional<User>;    // { id?: number; name?: string }

// Modifiers — add with + (implied) or remove with -
type Mutable<T> = { -readonly [K in keyof T]: T[K] };   // strip readonly
type Concrete<T> = { [K in keyof T]-?: T[K] };          // strip optional

// Change the VALUE type:
type Stringify<T> = { [K in keyof T]: string };
type S = Stringify<User>;      // { id: string; name: string }

// Change the KEY with a template literal — 'as' remapping:
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string }

// Filter keys out by mapping to never:
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
type Just = OnlyStrings<User>;   // { name: string }

// This is how most of the built-in utility types are written.`,
      output: `{ id?: number; name?: string }`,
    },
  },
  {
    question: 'What is a conditional type?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A conditional type picks between two types based on a check: `T extends U ? X : Y`. Combined with `infer`, it can EXTRACT a type from another — `type Unwrap<T> = T extends Promise<infer U> ? U : T`. It is how `ReturnType` and `Awaited` are implemented. Note conditional types distribute over unions by default, which is powerful but surprising; wrapping in a tuple, `[T] extends [U]`, disables that.',
      hinglish:
        'Ek conditional type ek check ke aadhaar pe do types mein se chunta hai: `T extends U ? X : Y`. `infer` ke saath, ye ek type ko doosre se NIKAAL sakta hai — `type Unwrap<T> = T extends Promise<infer U> ? U : T`. Isi se `ReturnType` aur `Awaited` bane hain. Note karo conditional types default se unions pe bant jaate hain, jo taakatwar par chaunkane wala hai; ek tuple mein wrap karna, `[T] extends [U]`, ise band kar deta hai.',
    },
    codeExample: {
      code: `// A type-level if/else.
type IsString<T> = T extends string ? 'yes' : 'no';
type A = IsString<'hi'>;      // 'yes'
type B = IsString<42>;        // 'no'

// infer extracts a type from inside another:
type Unwrap<T> = T extends Promise<infer U> ? U : T;
type C = Unwrap<Promise<User>>;   // User
type D = Unwrap<string>;          // string
// That is exactly how Awaited and ReturnType are built:
type MyReturn<T> = T extends (...a: any[]) => infer R ? R : never;

// DISTRIBUTION — the part that surprises people. A conditional
// over a naked union applies to each member separately:
type NoNull<T> = T extends null ? never : T;
type E = NoNull<string | null>;   // string   (not never)

// Turn distribution off by wrapping both sides in a tuple:
type IsUnion<T> = [T] extends [string] ? true : false;

// A practical use — a function whose return type depends on
// its argument:
type Result<T> = T extends { id: infer I } ? I : never;

// Conditional types are powerful and easy to overuse. If the
// signature becomes unreadable, an overload or two plain
// functions is usually the better answer.`,
      output: `'yes'
User
string`,
    },
  },
  {
    question: 'What is type inference and when should you write types explicitly?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'TypeScript infers types from initialisers, return values, and context, so annotating `const x: number = 5` is redundant noise. Write types explicitly where inference is absent or where you want the compiler to CHECK you rather than follow you: function parameters, public API boundaries, and exported function return types — which also prevents an accidental change to the return shape from silently propagating. Inside a function body, let inference do the work.',
      hinglish:
        'TypeScript initialisers, return values, aur context se types infer karta hai, isliye `const x: number = 5` likhna faltu shor hai. Types wahan explicitly likho jahan inference na ho ya jahan tum chahte ho ki compiler tumhe FOLLOW karne ke bajaye CHECK kare: function parameters, public API boundaries, aur exported function return types — jo return shape mein ek galti se hua change chupke se failne se bhi rokta hai. Ek function body ke andar, inference ko kaam karne do.',
    },
    codeExample: {
      code: `// TypeScript infers most things. Do not annotate what it
// already knows:
const n = 5;                 // 5 (a literal, because const)
let m = 5;                   // number (because let)
const arr = [1, 2];          // number[]
const user = { id: 1 };      // { id: number }

const nums: number[] = [1, 2];   // ✗ noise — it already knew

// DO annotate:

// 1. Function parameters — never inferred
function add(a: number, b: number) {}      // required

// 2. Public API return types — so a refactor cannot silently
//    change the contract
export function getUser(id: string): Promise<User> {}

// 3. An empty initialiser, or it becomes any[]
const items = [];            // any[]
const items: User[] = [];    // ✓

// 4. When you want a WIDER type than inferred
let status = 'idle';                     // string
let status: Status = 'idle';             // 'idle' | 'loading' | …

// 5. Object literals you want checked against a shape
const config: Config = { … };            // errors point at the
                                         // wrong line, not later

// The general principle: annotate BOUNDARIES — function
// signatures and exported values. Let inference handle the
// inside of a function.`,
      output: `const n: 5`,
    },
  },
  {
    question: 'What is the difference between structural and nominal typing?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'TypeScript is STRUCTURAL: two types are compatible if their shapes match, regardless of name or declaration. So a `Dog` with the same properties is assignable to a `Cat` parameter, which is flexible but can be dangerous when two types coincidentally match. Nominal languages such as Java compare by declared identity. You can simulate nominal typing with a BRANDED type — adding a unique phantom property — which is how `UserId` and `OrderId` can be kept distinct despite both being strings.',
      hinglish:
        'TypeScript STRUCTURAL hai: do types compatible hain agar unke shapes match karein, naam ya declaration chahe kuch bhi ho. Isliye wahi properties wala ek `Dog` ek `Cat` parameter mein assign ho sakta hai, jo flexible hai par khatarnak jab do types sanyog se match karein. Java jaisi nominal languages declared pehchaan se compare karti hain. Tum ek BRANDED type se nominal typing ki nakal kar sakte ho — ek unique phantom property jodkar — jisse `UserId` aur `OrderId` dono string hone ke bawajood alag rakhe ja sakte hain.',
    },
    visual: 'structural-typing',
    codeExample: {
      code: `// TypeScript is STRUCTURAL — the shape is what matters.
interface Point { x: number; y: number }

const dot = { x: 1, y: 2 };     // never mentions Point
function draw(p: Point) {}
draw(dot);                      // ✓ the shape matches

// Java and C# are NOMINAL — you must declare the relationship:
// class Dot implements Point { … }

// The consequence: two unrelated types with the same shape are
// interchangeable, which is sometimes wrong:
type UserId = string;
type OrderId = string;
function getUser(id: UserId) {}
const orderId: OrderId = 'ord_1';
getUser(orderId);               // ✓ compiles — but it is a bug

// Simulate nominal typing with a "brand":
type UserId = string & { readonly __brand: 'UserId' };
const asUserId = (s: string) => s as UserId;
getUser(orderId);               // ✗ now it errors

// One exception to pure structural checking — an object
// LITERAL passed directly is checked for EXCESS properties:
draw({ x: 1, y: 2, z: 3 });     // ✗ 'z' does not exist on Point
const p = { x: 1, y: 2, z: 3 };
draw(p);                        // ✓ a variable is fine
// That catch is deliberate: it usually means a typo.`,
      output: `Object literal may only specify known properties`,
    },
  },
  {
    question: 'What is a type guard?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A type guard narrows a type within a scope. Built-in ones are `typeof`, `instanceof`, `in`, and truthiness checks. A CUSTOM guard is a function returning `value is Dog`, which tells the compiler the narrowing after it returns true. The important caveat is that a custom guard is a PROMISE you make — TypeScript trusts your predicate without verifying it, so a buggy guard silently lies to the whole codebase.',
      hinglish:
        'Ek type guard ek scope ke andar ek type narrow karta hai. Built-in wale hain `typeof`, `instanceof`, `in`, aur truthiness checks. Ek CUSTOM guard ek function hai jo `value is Dog` return karta hai, jo compiler ko true lautne ke baad narrowing batata hai. Zaroori caveat ye hai ki ek custom guard ek WAADA hai jo tum karte ho — TypeScript tumhare predicate pe bina jaanche bharosa karta hai, isliye ek buggy guard poore codebase se chupke se jhooth bolta hai.',
    },
    visual: 'type-narrowing',
    codeExample: {
      code: `// Built-in guards narrow automatically:
if (typeof v === 'string') { }        // primitives
if (v instanceof Date) { }            // classes
if ('id' in obj) { }                  // property presence
if (Array.isArray(v)) { }             // arrays

// A CUSTOM guard, for checks TypeScript cannot work out.
// The 'x is T' return type is what does the narrowing:
function isUser(x: unknown): x is User {
  return (
    typeof x === 'object' && x !== null &&
    'id' in x && typeof (x as User).id === 'number'
  );
}

const data: unknown = await res.json();
if (isUser(data)) {
  data.id;          // ✓ narrowed to User
}

// The danger: TypeScript TRUSTS you. A wrong guard lies:
function isUser(x: unknown): x is User { return true; }   // ✗ always
// Now every value is treated as a User and it crashes at runtime.

// Which is why a schema validator is usually better — it
// derives the type from the check, so they cannot drift:
const User = z.object({ id: z.number(), name: z.string() });
type User = z.infer<typeof User>;
const user = User.parse(data);        // validates AND types`,
      output: `(narrowed safely)`,
    },
  },
  {
    question: 'What is the difference between a type assertion and type casting?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A type assertion (`x as Foo`) is a COMPILE-TIME instruction telling TypeScript "trust me, this is a Foo". It performs no runtime conversion and no check whatsoever, so an incorrect assertion produces a crash later at a confusing place. Real casting — `Number(x)`, `String(x)` — converts at runtime. Prefer narrowing and validation over assertions; `as` is essentially opting out of the type system, and `as unknown as T` is a loud sign something is wrong.',
      hinglish:
        'Ek type assertion (`x as Foo`) ek COMPILE-TIME nirdesh hai jo TypeScript ko kehta hai "bharosa karo, ye ek Foo hai". Ye koi runtime conversion aur koi check nahi karta, isliye ek galat assertion baad mein ek uljhaane wali jagah crash banati hai. Asli casting — `Number(x)`, `String(x)` — runtime pe convert karti hai. Assertions ke bajaye narrowing aur validation prefer karo; `as` asal mein type system se bahar nikalna hai, aur `as unknown as T` ek zor ka nishaan hai ki kuch galat hai.',
    },
    codeExample: {
      code: `// TypeScript has ASSERTIONS, not casts. Nothing is converted.
const el = document.getElementById('x') as HTMLInputElement;
// You are telling the compiler "trust me". No runtime check
// happens at all — the emitted JS has no trace of this.

// A real cast converts a value:
const n = Number('42');       // an actual conversion at runtime

// So an assertion can lie, and it will crash later:
const user = {} as User;
user.name.toUpperCase();      // ✗ compiles, throws at runtime

// The two syntaxes — as is preferred, because <T> clashes with JSX:
const a = value as string;
const b = <string>value;      // ✗ not usable in .tsx

// as const is different and genuinely useful — it makes
// everything readonly and literal:
const config = { mode: 'dark' } as const;
// { readonly mode: 'dark' } instead of { mode: string }

// The non-null assertion is an assertion too:
const el = document.getElementById('x')!;   // "it is not null"

// When an assertion is reasonable: you genuinely know more than
// the compiler — a DOM query you control, or narrowing after a
// validator has already run.

// When it is not: to silence an error you do not understand.
// That is where runtime crashes come from.`,
      output: `TypeError: Cannot read properties of undefined`,
    },
  },
  {
    question: 'How do you type an API response safely?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Do not simply write `await res.json() as User` — `json()` returns `any`, and the assertion is a lie the compiler cannot check, so a changed API silently produces wrong-shaped data that crashes far away. Validate at the BOUNDARY with a runtime schema library such as Zod: `UserSchema.parse(data)` both checks at runtime and infers the static type from the same schema, so there is one source of truth and the types cannot drift from reality.',
      hinglish:
        'Bas `await res.json() as User` mat likho — `json()` `any` lautaata hai, aur assertion ek jhooth hai jise compiler jaanch nahi sakta, isliye ek badla hua API chupke se galat shape ka data banata hai jo bahut door crash karta hai. BOUNDARY pe Zod jaisi ek runtime schema library se validate karo: `UserSchema.parse(data)` runtime pe check bhi karta hai aur usi schema se static type infer bhi karta hai, isliye ek hi sach ka source hai aur types haqeeqat se hat nahi sakte.',
    },
    visual: 'type-erasure',
    codeExample: {
      code: `// ✗ The common approach — a lie the compiler believes:
const user = await res.json() as User;
// json() returns any. The assertion adds zero checking.
// If the API changes a field, this crashes at runtime with a
// confusing error somewhere far from the fetch.

// ✓ Validate at the boundary with a schema:
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});
type User = z.infer<typeof UserSchema>;    // the type IS the schema

async function getUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return UserSchema.parse(await res.json());   // throws if wrong
}

// Why this is the right shape:
//   • one definition produces both the type AND the check —
//     they cannot drift apart
//   • the error happens AT the boundary, naming the bad field,
//     instead of somewhere deep in your UI
//   • safeParse() lets you handle it without a throw

// Remember: types vanish at compile time. Anything crossing a
// boundary — fetch, localStorage, form input, env vars —
// needs a runtime check.`,
      output: `ZodError: expected number, received string at "id"`,
    },
  },
  {
    question: 'What is the difference between interface extends and intersection types?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '`interface B extends A` checks compatibility at declaration time and ERRORS if a property conflicts, which catches mistakes early. An intersection `A & B` silently combines them, and a conflicting property becomes `never` rather than an error — so the failure surfaces later at the use site, which is harder to diagnose. Interfaces also merge declarations and give better error output, so extends is preferable when both would work.',
      hinglish:
        '`interface B extends A` declaration ke waqt compatibility check karta hai aur ek property takraane pe ERROR deta hai, jo galtiyaan jaldi pakadta hai. Ek intersection `A & B` unhe chupke se jod deta hai, aur ek takraati property ek error ke bajaye `never` ban jaati hai — isliye failure baad mein use ki jagah dikhti hai, jo diagnose karna mushkil hai. Interfaces declarations bhi merge karte hain aur behtar error output dete hain, isliye jab dono chalein to extends behtar hai.',
    },
    codeExample: {
      code: `// extends — interfaces only
interface Animal { name: string }
interface Dog extends Animal { breed: string }

// & — works with any types
type AnimalT = { name: string };
type DogT = AnimalT & { breed: string };

// For simple cases they produce the same thing. Two differences:

// 1. CONFLICTS are handled differently.
interface A { x: string }
interface B extends A { x: number }     // ✗ error, caught here
//   Types of property 'x' are incompatible

type C = { x: string } & { x: number }; // ✓ compiles!
// but x is now string & number = never, so it is unusable
// and you find out much later, at the use site.

// 2. Intersections can combine unions and other type
//    expressions; extends cannot:
type D = ({ a: 1 } | { b: 2 }) & { c: 3 };

// Performance: extends is resolved eagerly and cached, so it
// is faster for the compiler on large codebases. Deeply nested
// intersections are a known cause of slow type checking.

// Practical rule: extends for object hierarchies — you get the
// error where the mistake is. & for composing types that are
// not both interfaces.`,
      output: `Interface 'B' incorrectly extends interface 'A'.`,
    },
  },
  {
    question: 'What does the keyof operator do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`keyof T` produces a union of T\'s property names as literal types, so `keyof { a: 1; b: 2 }` is `"a" | "b"`. It is the foundation of type-safe property access: `function get<T, K extends keyof T>(obj: T, key: K): T[K]` guarantees the key exists and returns the correct value type. Paired with `typeof` on a value — `keyof typeof config` — it derives a key union from an actual object rather than a hand-maintained list.',
      hinglish:
        '`keyof T` T ke property naamon ka ek union literal types ki tarah banata hai, isliye `keyof { a: 1; b: 2 }` `"a" | "b"` hai. Ye type-safe property access ki neev hai: `function get<T, K extends keyof T>(obj: T, key: K): T[K]` guarantee karta hai ki key hai aur sahi value type lautaata hai. Ek value pe `typeof` ke saath — `keyof typeof config` — ye ek haath se maintain ki list ke bajaye ek asli object se ek key union nikaalta hai.',
    },
    codeExample: {
      code: `interface User { id: number; name: string }

type Keys = keyof User;        // 'id' | 'name'  — a union of keys

// The classic use — a type-safe property getter:
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { id: 1, name: 'Asha' };
get(user, 'name');    // string  ✓ the exact type
get(user, 'id');      // number  ✓
get(user, 'nope');    // ✗ not assignable to 'id' | 'name'

// T[K] is an INDEXED ACCESS type — "the type of that property".
type NameType = User['name'];        // string
type Either = User['id' | 'name'];   // number | string

// keyof on an object with an index signature:
type Dict = { [k: string]: number };
type DK = keyof Dict;          // string | number
// (number is included because obj[0] and obj['0'] are the same)

// Getting the values instead of the keys:
type Values = User[keyof User];      // number | string

// A very common real pattern — deriving a union from a const:
const ROLES = ['admin', 'user'] as const;
type Role = typeof ROLES[number];    // 'admin' | 'user'
// One array now drives both the runtime list and the type.`,
      output: `'id' | 'name'`,
    },
  },
  {
    question: 'What is the difference between typeof in JavaScript and in TypeScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'In a VALUE position, `typeof x` is the JavaScript runtime operator returning a string. In a TYPE position, `typeof x` is a TypeScript operator that extracts the static type of a value — `type Config = typeof defaultConfig`. That lets you derive a type from a real object rather than writing it twice and letting them drift apart. The two meanings never collide because TypeScript knows which position it is in.',
      hinglish:
        'Ek VALUE jagah pe, `typeof x` JavaScript ka runtime operator hai jo ek string lautaata hai. Ek TYPE jagah pe, `typeof x` ek TypeScript operator hai jo ek value ka static type nikaalta hai — `type Config = typeof defaultConfig`. Isse tum ek asli object se ek type nikaal sakte ho, use do baar likh kar unhe alag hone dene ke bajaye. Dono matlab kabhi nahi takraate kyunki TypeScript jaanta hai ki wo kis jagah pe hai.',
    },
    codeExample: {
      code: `// JAVASCRIPT typeof — runs at RUNTIME, returns a string.
const v = 'hi';
typeof v;                 // 'string'  ← a value
if (typeof v === 'string') { }        // narrowing

// TYPESCRIPT typeof — runs at COMPILE time, returns a TYPE.
const user = { id: 1, name: 'Asha' };
type User = typeof user;              // { id: number; name: string }

// The difference is WHERE it appears: in a type position it is
// TypeScript's, in a value position it is JavaScript's.

// Why it is useful — derive a type from a value you already have,
// instead of writing the shape twice:
const config = {
  host: 'localhost',
  port: 3000,
  debug: false,
};
type Config = typeof config;
function load(c: Config) {}      // stays in sync automatically

// With a function:
function getUser(id: string) { return { id, name: '' }; }
type Fn = typeof getUser;
type R = ReturnType<typeof getUser>;    // { id: string; name: string }

// And the const-array pattern:
const ROLES = ['admin', 'user'] as const;
type Role = typeof ROLES[number];       // 'admin' | 'user'

// Note: TS typeof only works on identifiers and properties,
// not arbitrary expressions.`,
      output: `{ id: number; name: string }`,
    },
  },
  {
    question: 'What are literal types and const assertions?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A literal type is an exact value used as a type — `"GET" | "POST"` accepts only those two strings. TypeScript normally WIDENS a literal to its base type, so `const x = "GET"` infers `"GET"` but an object property infers `string`. `as const` prevents that widening, making every property readonly and literal — which is how you turn a config object into a source of precise types rather than loose strings.',
      hinglish:
        'Ek literal type ek exact value hai jo ek type ki tarah use hoti hai — `"GET" | "POST"` sirf wo do strings leta hai. TypeScript normally ek literal ko uske base type tak CHAUDA kar deta hai, isliye `const x = "GET"` `"GET"` infer karta hai par ek object property `string` infer karti hai. `as const` us chaudaai ko rokta hai, har property ko readonly aur literal banate hue — jisse tum ek config object ko dheeli strings ke bajaye sateek types ka ek source bana dete ho.',
    },
    codeExample: {
      code: `// A literal type is a single exact value:
type Direction = 'up' | 'down';
let d: Direction = 'up';
d = 'sideways';           // ✗ not assignable

// let widens, const does not:
let a = 'hello';          // string
const b = 'hello';        // 'hello'  ← a literal type

// The problem this causes:
const dir = 'up';
function move(d: 'up' | 'down') {}
move(dir);                // ✓ fine

const obj = { dir: 'up' };
move(obj.dir);            // ✗ obj.dir widened to string

// as const fixes it — deep readonly, everything literal:
const obj = { dir: 'up' } as const;
move(obj.dir);            // ✓ 'up'

// It applies all the way down:
const config = {
  mode: 'dark',
  sizes: [1, 2],
} as const;
// { readonly mode: 'dark'; readonly sizes: readonly [1, 2] }
config.mode = 'light';    // ✗ readonly

// The pattern worth remembering — one array, two uses:
const ROLES = ['admin', 'user'] as const;
type Role = typeof ROLES[number];       // 'admin' | 'user'
ROLES.forEach(…)                        // still a real array`,
      output: `Type 'string' is not assignable to type '"up" | "down"'.`,
    },
  },
  {
    question: 'What is the difference between readonly and const?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`const` is a JavaScript keyword preventing REASSIGNMENT of a variable binding, but the object it points to remains mutable. `readonly` is a TypeScript modifier preventing assignment to a PROPERTY, checked only at compile time — it disappears at runtime, so nothing stops mutation from untyped code. For genuine runtime immutability you need `Object.freeze`. Both are useful; they simply protect different things at different times.',
      hinglish:
        '`const` ek JavaScript keyword hai jo ek variable binding ko DOBARA ASSIGN hone se rokta hai, par jis object pe wo point karta hai wo badalne layak rehta hai. `readonly` ek TypeScript modifier hai jo ek PROPERTY pe assignment rokta hai, sirf compile time pe check hokar — ye runtime pe gayab ho jaata hai, isliye untyped code se mutation ko kuch nahi rokta. Asli runtime immutability ke liye tumhe `Object.freeze` chahiye. Dono useful hain; wo bas alag samay pe alag cheezein bachate hain.',
    },
    codeExample: {
      code: `// const — a JAVASCRIPT feature. The BINDING cannot be
// reassigned, but the object can still be mutated.
const user = { name: 'Asha' };
user.name = 'Ravi';       // ✓ allowed
user = {};                // ✗ TypeError

// readonly — a TYPESCRIPT feature. The PROPERTY cannot be
// written, and it disappears at compile time.
interface User { readonly id: number; name: string }
const u: User = { id: 1, name: 'Asha' };
u.name = 'Ravi';          // ✓
u.id = 2;                 // ✗ Cannot assign to 'id'

// So they operate on different things:
//   const    → the variable name, enforced at RUNTIME
//   readonly → a property, enforced at COMPILE time only

// Which means readonly can be bypassed — the check is gone
// after compilation:
(u as any).id = 2;        // ✓ compiles and runs

// readonly arrays:
const nums: readonly number[] = [1, 2];
nums.push(3);             // ✗ push does not exist on readonly
const copy = [...nums];   // ✓ make a mutable copy

// as const makes everything readonly at once:
const cfg = { a: 1 } as const;

// For genuine runtime immutability you need Object.freeze —
// readonly alone is only a promise to the compiler.`,
      output: `Cannot assign to 'id' because it is a read-only property.`,
    },
  },
  {
    question: 'What is strictNullChecks and why does it matter?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Without it, `null` and `undefined` are assignable to every type, so TypeScript cannot warn you about the single most common runtime error in JavaScript. With it enabled, a value that may be absent must be typed `string | null` and NARROWED before use, so the compiler forces you to handle the missing case. It is the highest-value flag in `strict`, and it is exactly why enabling strict on an existing codebase produces hundreds of genuine findings.',
      hinglish:
        'Iske bina, `null` aur `undefined` har type mein assign ho sakte hain, isliye TypeScript tumhe JavaScript ki sabse common runtime error ke baare mein warn nahi kar sakta. Ise enable karne pe, ek gayab ho sakti value ko `string | null` type karna padta hai aur use karne se pehle NARROW karna padta hai, isliye compiler tumhe missing case sambhaalne pe majboor karta hai. Ye `strict` mein sabse zyada value wala flag hai, aur isiliye ek maujood codebase pe strict enable karna sau genuine findings deta hai.',
    },
    codeExample: {
      code: `// OFF (the old default) — null and undefined are assignable
// to every type, so the compiler cannot help you:
let name: string = null;        // ✓ allowed
function f(u: User) { u.name.trim(); }
f(null);                        // ✓ compiles → crashes at runtime

// ON — they become their own types and must be declared:
let name: string = null;        // ✗ not assignable
let name: string | null = null; // ✓

function f(u: User | null) {
  u.name;        // ✗ 'u' is possibly 'null'
  u?.name;       // ✓ optional chaining
  if (u) u.name; // ✓ narrowed
}

// This is the flag that actually earns TypeScript its keep.
// "Cannot read properties of undefined" is the most common
// runtime error in JavaScript, and this is what catches it.

// It also changes array access under noUncheckedIndexedAccess:
const first = arr[0];           // T | undefined, not T

// Migrating a large codebase: turn it on and expect hundreds of
// errors. Work file by file with // @ts-expect-error as a
// temporary marker — it errors once the line is genuinely fixed,
// so it cannot be forgotten the way @ts-ignore can.`,
      output: `Object is possibly 'null'.`,
    },
  },
  {
    question: 'What is the difference between the ?. and ! operators?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`?.` is JavaScript optional chaining: it short-circuits to `undefined` at RUNTIME if the value is nullish, so it genuinely prevents a crash. `!` is the TypeScript non-null assertion: it only tells the compiler to stop complaining and DISAPPEARS at runtime, so if the value really is null you still get the crash — just without a warning. Every `!` is an unverified claim, and most of them should be a real check instead.',
      hinglish:
        '`?.` JavaScript ki optional chaining hai: value nullish hone pe ye RUNTIME pe `undefined` pe short-circuit karta hai, isliye ye genuinely ek crash rokta hai. `!` TypeScript ka non-null assertion hai: ye sirf compiler ko shikayat band karne ko kehta hai aur runtime pe GAYAB ho jaata hai, isliye agar value sach mein null hai to crash phir bhi milta hai — bas bina warning ke. Har `!` ek bina jaancha daawa hai, aur unme se zyadatar ko ek asli check hona chahiye.',
    },
    codeExample: {
      code: `// ?. — OPTIONAL CHAINING. A real runtime check.
user?.address?.city;
// Compiles to: user == null ? undefined : …
// Safe. If anything is null it stops and returns undefined.

// ! — NON-NULL ASSERTION. Compile-time only, erased entirely.
user!.address!.city;
// Compiles to: user.address.city
// It tells the compiler "trust me", and adds NO check at all.

// So they are opposites:
//   ?.  → protects you at runtime
//   !   → silences the compiler and protects nothing

const el = document.getElementById('x')!;
el.focus();          // throws if the element is missing

// When ! is defensible: you genuinely know more than the
// compiler and the alternative is noise —
const map = new Map([['a', 1]]);
map.get('a')!.toFixed();     // you just put it there

// When it is not: to make an error go away. Prefer narrowing:
if (!user) return;
user.address;        // ✓ narrowed, no assertion needed

// And note ?. short-circuits calls too:
callback?.();        // only if callback exists
arr?.[0];            // only if arr exists

// Pair ?. with ?? for a default:
const city = user?.address?.city ?? 'unknown';`,
      output: `TypeError: Cannot read properties of null`,
    },
  },
  {
    question: 'How does TypeScript handle function parameter and return type variance?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Return types are COVARIANT — a function returning `Dog` is assignable where one returning `Animal` is expected, which is intuitive. Parameters are properly CONTRAVARIANT, but TypeScript checks method parameters BIVARIANTLY by default for historical convenience, which is technically unsound. `strictFunctionTypes` enables correct contravariant checking for function-type properties, though methods declared with method syntax remain bivariant. It is why an array of `Dog` is assignable to an array of `Animal` even though that is not fully safe.',
      hinglish:
        'Return types COVARIANT hain — `Dog` lautaata ek function wahan assign ho sakta hai jahan `Animal` lautaane wala chahiye, jo swabhavik hai. Parameters theek se CONTRAVARIANT hain, par TypeScript method parameters ko historical sahoolat ke liye default se BIVARIANTLY check karta hai, jo technically galat hai. `strictFunctionTypes` function-type properties ke liye sahi contravariant checking enable karta hai, halaanki method syntax se declare hui methods bivariant rehti hain. Isiliye `Dog` ka ek array `Animal` ke array mein assign ho jaata hai chahe wo poori tarah surakshit na ho.',
    },
    codeExample: {
      code: `// RETURN types are COVARIANT — a more specific return is fine.
type GetAnimal = () => Animal;
const getDog: GetAnimal = (): Dog => new Dog();   // ✓ Dog is an Animal

// PARAMETERS are CONTRAVARIANT in theory — a handler that
// accepts a WIDER type is safe:
type DogHandler = (d: Dog) => void;
const h: DogHandler = (a: Animal) => {};          // ✓ safe

// The reverse is not safe, because the caller may pass any Dog:
type AnimalHandler = (a: Animal) => void;
const h2: AnimalHandler = (d: Dog) => d.bark();   // ✗ with
                                                  //   strictFunctionTypes

// Without strictFunctionTypes, TypeScript is BIVARIANT — it
// allows both directions. That is unsound, and it is the
// default for historical reasons (it makes DOM event handlers
// and array methods convenient).

// The deliberate exception: METHOD parameters stay bivariant
// even under strict mode:
interface A { f(x: Dog): void }     // method syntax → bivariant
interface B { f: (x: Dog) => void } // property syntax → checked

// Practical takeaway: use property syntax for callbacks you
// want checked properly, and know that array methods like
// push are unsound by design for the same convenience reason.`,
      output: `Type '(d: Dog) => void' is not assignable`,
    },
  },
  {
    question: 'What is declaration merging?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'TypeScript combines multiple declarations of the same name into one. Two interfaces with the same name merge their members; a namespace can merge with a function or class to attach static members. Its practical use is AUGMENTING types you do not control — adding a property to Express\'s `Request`, or extending a library\'s options interface — via `declare module`. Type aliases cannot merge, which is one concrete reason to prefer interfaces for public object shapes.',
      hinglish:
        'TypeScript ek hi naam ki kai declarations ko ek mein jod deta hai. Ek hi naam ke do interfaces apne members merge karte hain; ek namespace static members lagane ke liye ek function ya class ke saath merge ho sakta hai. Iska vyavaharik use un types ko BADHANA hai jo tumhare control mein nahi — Express ke `Request` mein ek property jodna, ya ek library ka options interface badhana — `declare module` se. Type aliases merge nahi ho sakte, jo public object shapes ke liye interfaces prefer karne ki ek thos wajah hai.',
    },
    codeExample: {
      code: `// Two interfaces with the same name in the same scope COMBINE.
interface User { id: number }
interface User { name: string }
// User is now { id: number; name: string }

// A type alias cannot do this:
type T = { a: 1 };
type T = { b: 2 };        // ✗ Duplicate identifier

// The main real use — extending a third-party type from your
// own code, without forking it:
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };     // now req.user is typed
    }
  }
}
// In an Express middleware: req.user = { id }   ✓ typed

// Same for the global window:
declare global {
  interface Window { analytics: Analytics }
}
window.analytics.track('click');   // ✓

// Namespaces and functions merge too:
function greet() {}
namespace greet { export const version = '1.0'; }
greet.version;            // ✓

// The hazard: merging is silent. Two interfaces with the same
// name in one file quietly combine instead of erroring, so a
// duplicated name can produce a type nobody intended. That is
// one reason many teams default to type aliases.`,
      output: `{ id: number; name: string }`,
    },
  },
  {
    question: 'What are declaration files and what is DefinitelyTyped?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A `.d.ts` file declares types WITHOUT implementation, describing the shape of JavaScript code to the compiler. Libraries either ship their own types or have community-maintained ones on DefinitelyTyped, installed as `@types/package`. Modern libraries usually bundle types directly, so an `@types` package is often a sign of an older library. For untyped JavaScript you can write a minimal `.d.ts` yourself rather than resorting to `any`.',
      hinglish:
        'Ek `.d.ts` file BINA implementation ke types declare karti hai, compiler ko JavaScript code ka shape batate hue. Libraries ya to apne types deti hain ya unke community-maintained types DefinitelyTyped pe hote hain, jo `@types/package` ki tarah install hote hain. Modern libraries usually types seedha saath deti hain, isliye ek `@types` package aksar ek purani library ki nishaani hai. Untyped JavaScript ke liye tum `any` pe girne ke bajaye khud ek chhoti `.d.ts` likh sakte ho.',
    },
    codeExample: {
      code: `// A .d.ts file contains TYPES ONLY — no implementation.
// It describes the shape of JavaScript that has no types.

// types/legacy.d.ts
declare module 'old-library' {
  export function calculate(a: number, b: number): number;
  export const VERSION: string;
}

// Now this is typed:
import { calculate } from 'old-library';   // ✓

// Three ways a package gets types:
// 1. BUILT IN — the package ships its own .d.ts
//    "types": "./dist/index.d.ts" in its package.json
// 2. DEFINITELYTYPED — a community repository of types for
//    packages that have none
npm i -D @types/lodash
npm i -D @types/node
// 3. NONE — you write your own .d.ts, or it is implicitly any

// The @types/* packages all come from one GitHub repo,
// DefinitelyTyped, and are published automatically.

// Version skew is the common problem: @types/express may lag
// behind express itself, so keep them roughly in step.

// Declaring a module you just want to silence:
declare module 'untyped-thing';    // everything becomes any

// And for non-code imports:
declare module '*.svg' {
  const src: string;
  export default src;
}`,
      output: `(types resolved for an untyped package)`,
    },
  },
  {
    question: 'What is the difference between compile-time and runtime in TypeScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'TypeScript types are ERASED during compilation — the emitted JavaScript contains none of them. So you cannot check a type at runtime, `instanceof` does not work with interfaces, and generics carry no runtime information. Anything that must be verified while the program runs — API responses, user input, parsed JSON — needs an actual runtime check. The types tell you what SHOULD be true; only validation tells you what IS.',
      hinglish:
        'TypeScript ke types compilation ke dauraan MITA diye jaate hain — nikla JavaScript unme se kuch nahi rakhta. Isliye tum runtime pe ek type check nahi kar sakte, `instanceof` interfaces ke saath kaam nahi karta, aur generics koi runtime jaankaari nahi le jaate. Jo bhi program chalte waqt jaanchna zaroori hai — API responses, user input, parsed JSON — use ek asli runtime check chahiye. Types batate hain ki kya SACH HONA CHAHIYE; sirf validation batati hai ki kya HAI.',
    },
    visual: 'type-erasure',
    codeExample: {
      code: `// COMPILE TIME — types exist, are checked, then DELETED.
interface User { id: number; name: string }
function greet(u: User): string { return 'Hi ' + u.name; }

// After tsc, this is all that remains:
function greet(u) { return 'Hi ' + u.name; }
// No interface. No annotations. Nothing to check against.

// So these are impossible:
if (u instanceof User) { }        // ✗ User is not a value
typeof someType;                  // ✗ types are not values
const t = User;                   // ✗ cannot use a type as a value

// And this is the trap that bites in production:
const u = await res.json() as User;
// The API returns { id: "1" } — a string. TypeScript said it
// was a number and checked nothing. The crash happens later,
// somewhere unrelated.

// The things that DO exist at runtime:
class User {}                     // ✓ classes are real values
enum Role { Admin }               // ✓ enums emit an object
const x = { id: 1 };              // ✓ values

// The rule: every boundary needs a RUNTIME check —
// fetch, localStorage, form input, env vars, query params.
const u = UserSchema.parse(await res.json());   // ✓ Zod`,
      output: `(all types erased in the emitted JS)`,
    },
  },
  {
    question: 'What is an enum in TypeScript and why do some teams avoid it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An enum defines a named set of constants and, unlike most TypeScript features, EMITS runtime code — an object generated in the output. Teams avoid it because numeric enums are not type-safe (any number is assignable to one), `const enum` breaks under isolated modules and bundlers, and it is the only construct that violates the "types disappear" mental model. A union of string literals or `as const` object achieves the same thing with no runtime cost.',
      hinglish:
        'Ek enum constants ka ek named set define karta hai aur, zyadatar TypeScript features ke ulat, runtime code NIKAALTA hai — output mein ek object banta hai. Teams ise isliye avoid karti hain kyunki numeric enums type-safe nahi hain (koi bhi number assign ho jaata hai), `const enum` isolated modules aur bundlers ke neeche tootta hai, aur ye ekmatr aisi cheez hai jo "types gayab ho jaate hain" wale mental model ko todti hai. String literals ka ek union ya ek `as const` object wahi cheez bina runtime cost ke deta hai.',
    },
    codeExample: {
      code: `enum Role { Admin, User }        // 0, 1
enum Status { Active = 'ACTIVE', Off = 'OFF' }

// Why some teams avoid them:

// 1. They EMIT CODE. Everything else in TS disappears; an enum
//    generates a real object, so it cannot be erased and it
//    adds bytes.
var Role;
(function (Role) { Role[Role["Admin"] = 0] = "Admin"; })(Role || (Role = {}));

// 2. Numeric enums accept any number — no safety at all:
function f(r: Role) {}
f(99);                          // ✓ compiles!

// 3. They are NOMINAL, unlike everything else in TypeScript:
enum A { X = 'x' }
enum B { X = 'x' }
const a: A = B.X;               // ✗ not assignable, despite
                                //   being the same string

// 4. const enum is inlined but breaks isolatedModules, which
//    Babel, esbuild and SWC all require.

// The modern alternative — a const object plus a derived type:
const Role = { Admin: 'admin', User: 'user' } as const;
type Role = typeof Role[keyof typeof Role];   // 'admin' | 'user'
// Plain JS values, a real union type, and nothing extra emitted.

// Or simply a union: type Role = 'admin' | 'user';`,
      output: `Type 'B.X' is not assignable to type 'A'.`,
    },
  },
  {
    question: 'What is the satisfies operator?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`satisfies` checks that a value conforms to a type WITHOUT widening its inferred type to that type. With `const config: Config = {...}` you lose the specific literal types; with `const config = {...} satisfies Config` you get both the validation and the precise inferred keys and values. It solves a long-standing tension where annotating for safety destroyed the inference you actually wanted. Added in TypeScript 4.9.',
      hinglish:
        '`satisfies` jaanchta hai ki ek value ek type ke anuroop hai, BINA uske inferred type ko us type tak chauda kiye. `const config: Config = {...}` ke saath tum khaas literal types kho dete ho; `const config = {...} satisfies Config` ke saath tumhe validation aur sateek inferred keys aur values dono milti hain. Ye ek purani khinchtaan solve karta hai jahan safety ke liye annotate karna wo inference mita deta tha jo tum actually chahte the. TypeScript 4.9 mein joda gaya.',
    },
    codeExample: {
      code: `// The problem it solves. With an annotation you get checking
// but LOSE the specific types:
const config: Record<string, string> = {
  host: 'localhost',
  port: '3000',
};
config.host;        // string — the literal 'localhost' is gone
config.typo;        // ✓ no error! Record allows any key

// With no annotation you keep the literals but get no checking:
const config = { host: 'localhost', prot: '3000' };  // typo unnoticed

// satisfies gives you BOTH — checked against the type, while
// keeping the inferred literal types:
const config = {
  host: 'localhost',
  port: '3000',
} satisfies Record<string, string>;

config.host;        // 'localhost'  ← the literal survives
config.typo;        // ✗ Property 'typo' does not exist

// Where it really pays off:
const routes = {
  home: '/',
  user: '/users/:id',
} satisfies Record<string, \`/\${string}\`>;
// Every value is validated as a path, AND
type Route = keyof typeof routes;     // 'home' | 'user'

// The one-line summary: an annotation WIDENS to the type,
// satisfies CHECKS against it and keeps what you wrote.`,
      output: `Object literal may only specify known properties`,
    },
  },
  {
    question: 'How do you type React props and hooks?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Define props as an interface and annotate the component parameter directly — `function Button({ label }: Props)` — rather than using `React.FC`, which adds an implicit `children` and complicates generics. `useState` usually infers, but needs an explicit parameter when the initial value is null: `useState<User | null>(null)`. Type `useRef` as `useRef<HTMLDivElement>(null)`, and use `React.ReactNode` for children and `React.ChangeEvent<HTMLInputElement>` for handlers.',
      hinglish:
        'Props ko ek interface ki tarah define karo aur component parameter ko seedha annotate karo — `function Button({ label }: Props)` — `React.FC` use karne ke bajaye, jo ek chhupa `children` jodta hai aur generics uljhata hai. `useState` usually infer karta hai, par initial value null hone pe ek explicit parameter maangta hai: `useState<User | null>(null)`. `useRef` ko `useRef<HTMLDivElement>(null)` type karo, aur children ke liye `React.ReactNode` aur handlers ke liye `React.ChangeEvent<HTMLInputElement>` use karo.',
    },
    codeExample: {
      code: `// PROPS — an interface, with children typed properly:
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'ghost';       // a union, not string
  children?: React.ReactNode;          // anything renderable
}
function Button({ label, variant = 'primary' }: ButtonProps) {}

// Extending native element props — very common:
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
// Now it accepts placeholder, disabled, onChange and the rest.

// useState — usually inferred:
const [count, setCount] = useState(0);         // number
const [user, setUser] = useState<User | null>(null);   // needs help
const [items, setItems] = useState<Item[]>([]);        // else never[]

// useRef — two different meanings:
const inputRef = useRef<HTMLInputElement>(null);   // DOM, readonly
const timer = useRef<number | undefined>(undefined); // mutable box

// Events — let React infer where it can:
onChange={(e) => setValue(e.target.value)}         // ✓ inferred
const handle = (e: React.ChangeEvent<HTMLInputElement>) => {};  // standalone

// useReducer — type the state and the action union:
type Action = { type: 'inc' } | { type: 'set'; value: number };
useReducer(reducer, initialState);

// Avoid React.FC — it adds an implicit children prop and
// complicates generics. A plain function with typed props is
// what the React docs now recommend.`,
      output: `(props and events fully typed)`,
    },
  },
  {
    question: 'How do you migrate a JavaScript codebase to TypeScript?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Do it INCREMENTALLY. Enable `allowJs` so both coexist, and start with `strict: false` so the project compiles at all. Rename files to `.ts` one at a time, beginning with leaf modules that few things depend on, since typing a widely-imported module forces changes everywhere at once. Add `@types` packages. Then enable strict flags ONE at a time — `noImplicitAny` first, then `strictNullChecks`, which is the largest jump. A big-bang rewrite reliably stalls.',
      hinglish:
        'Ise DHEERE-DHEERE karo. `allowJs` enable karo taaki dono saath rahein, aur `strict: false` se shuru karo taaki project compile to ho. Files ko ek-ek karke `.ts` mein rename karo, un leaf modules se shuru karke jinpe kam cheezein depend karti hain, kyunki ek widely-imported module ko type karna ek saath har jagah changes majboor karta hai. `@types` packages jodo. Phir strict flags EK-EK karke enable karo — pehle `noImplicitAny`, phir `strictNullChecks`, jo sabse bada chhalaang hai. Ek big-bang rewrite bharose se atak jaata hai.',
    },
    codeExample: {
      code: `// 1. Add TypeScript without changing a single file yet.
npm i -D typescript @types/node
npx tsc --init

// tsconfig.json — start permissive so nothing breaks:
{
  "compilerOptions": {
    "allowJs": true,        // .js and .ts side by side
    "checkJs": false,       // do not check .js yet
    "strict": false,
    "noEmit": true          // let your bundler build
  }
}

// 2. Rename file by file, leaf-first. Utilities and types
//    before components — they have the fewest dependencies.
//    mv utils.js utils.ts

// 3. Turn strictness on ONE FLAG AT A TIME, fixing each wave:
"noImplicitAny": true       // usually the biggest one
"strictNullChecks": true    // the most valuable
"strict": true              // finally

// 4. For a file you cannot fix yet, mark the specific line:
// @ts-expect-error  ← errors once the line is FIXED, so it
//                      cannot be forgotten
// @ts-ignore        ← silent forever. Avoid.

// What NOT to do:
//   ✗ a big-bang rewrite — it will not land
//   ✗ any everywhere to make errors disappear, which gives you
//     the build cost of TypeScript with none of the benefit

// Add "checkJs": true near the end to catch remaining .js files
// with JSDoc types.`,
      output: `Found 0 errors.`,
    },
  },
  {
    question: 'What is the difference between esModuleInterop and allowSyntheticDefaultImports?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '`allowSyntheticDefaultImports` only silences the type error when default-importing a CommonJS module that has no default export — it changes nothing about the emitted code. `esModuleInterop` additionally emits helper code so the import actually works correctly at runtime, and it implies the other flag. So the first is a type-level permission and the second is a real behaviour change; enabling only the first is how you get code that type-checks and then fails at runtime.',
      hinglish:
        '`allowSyntheticDefaultImports` sirf us type error ko chup karata hai jab tum ek aise CommonJS module ko default-import karte ho jiska koi default export nahi — ye nikle code mein kuch nahi badalta. `esModuleInterop` upar se helper code nikaalta hai taaki import runtime pe sach mein sahi kaam kare, aur ye doosre flag ko shaamil kar leta hai. Isliye pehla ek type-level ijaazat hai aur doosra ek asli behaviour change; sirf pehla enable karne se hi aisa code milta hai jo type-check hota hai aur phir runtime pe fail ho jaata hai.',
    },
    codeExample: {
      code: `// The problem: CommonJS has no real default export.
// A package written as module.exports = express has no
// "default" property for ESM to import.

// Without either flag:
import * as express from 'express';
express();                    // ✗ not callable in strict ESM

// allowSyntheticDefaultImports — TYPE CHECKING only.
// It lets you WRITE the default import; it emits nothing.
import express from 'express';   // ✓ compiles
// …but at runtime it may still be undefined, because tsc did
// not change the emitted require.

// esModuleInterop — types AND runtime. It emits a helper:
import express from 'express';
// becomes: const express = __importDefault(require('express'))
// which checks for __esModule and wraps correctly.

// esModuleInterop turns allowSyntheticDefaultImports on
// automatically. So in practice:
{ "compilerOptions": { "esModuleInterop": true } }   // ✓ just this

// Use allowSyntheticDefaultImports alone only when something
// ELSE does the interop at runtime — Babel, esbuild or a
// bundler — and tsc is only type checking.

// The symptom of getting it wrong: "TypeError: express is not
// a function" at runtime, while the build passed cleanly.`,
      output: `TypeError: express is not a function`,
    },
  },
  {
    question: 'What is the difference between tsc, Babel, and esbuild for TypeScript?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`tsc` both TYPE-CHECKS and emits JavaScript, and it is the only one that checks types. Babel and esbuild simply STRIP the types without checking anything, which is dramatically faster and is why modern build tools use them. The standard setup is a fast transpiler for the build plus `tsc --noEmit` in CI and the editor for checking. The trap is assuming the build validates your types — it does not, so a broken type only surfaces in CI.',
      hinglish:
        '`tsc` TYPE-CHECK bhi karta hai aur JavaScript nikaalta bhi hai, aur ye ekmatr hai jo types check karta hai. Babel aur esbuild bas types HATA dete hain bina kuch check kiye, jo dramatically tez hai aur isiliye modern build tools unhe use karte hain. Standard setup build ke liye ek tez transpiler plus checking ke liye CI aur editor mein `tsc --noEmit` hai. Jaal ye maan lena hai ki build tumhare types validate karta hai — ye nahi karta, isliye ek toota type sirf CI mein dikhta hai.',
    },
    codeExample: {
      code: `// TSC — the official compiler. Type checks AND emits JS.
tsc --noEmit          // check only
// ✓ the only one that actually verifies your types
// ✗ the slowest, because checking is the expensive part

// BABEL — strips types, does NOT check them.
// @babel/preset-typescript deletes annotations file by file.
// ✓ fast, and it already handles JSX and your other plugins
// ✗ zero type safety
// ✗ cannot do const enum or namespaces — no cross-file info

// ESBUILD / SWC — same idea, written in Go and Rust.
// ✓ 20-100x faster than tsc
// ✗ also strips without checking

// So the standard setup separates the two jobs:
//   BUILD  → esbuild / SWC / Vite      (fast, no checking)
//   CHECK  → tsc --noEmit in CI and your editor

// package.json
{
  "scripts": {
    "dev":       "vite",
    "build":     "vite build",
    "typecheck": "tsc --noEmit"
  }
}

// The consequence people miss: your dev server will happily run
// code with type errors. The editor and CI are what catch them,
// so a red CI check on typecheck is not optional.

// isolatedModules: true makes tsc reject anything the fast
// transpilers cannot handle, keeping the two in agreement.`,
      output: `tsc: 8.4s │ esbuild: 0.09s`,
    },
  },
  {
    question: 'What are template literal types?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'They build string literal types from other types: `type Event = \\`on\\${Capitalize<string & keyof T>}\\``. Combined with unions they expand combinatorially — `\\`${"top"|"bottom"}-${"left"|"right"}\\`` yields four literals. They give type-safe string keys for CSS properties, event names, and route paths, catching a typo at compile time. Used carelessly on large unions they can explode the type space and slow the compiler noticeably.',
      hinglish:
        'Ye doosre types se string literal types banate hain: `type Event = \\`on\\${Capitalize<string & keyof T>}\\``. Unions ke saath ye combinatorially failte hain — `\\`${"top"|"bottom"}-${"left"|"right"}\\`` chaar literals deta hai. Ye CSS properties, event names, aur route paths ke liye type-safe string keys dete hain, ek typo compile time pe pakadte hue. Bade unions pe laparwaahi se use karne pe ye type space phaila kar compiler ko dhyaan dene layak slow kar sakte hain.',
    },
    codeExample: {
      code: `// String types built from other types.
type Greeting = \`hello \${string}\`;
const a: Greeting = 'hello world';    // ✓
const b: Greeting = 'goodbye';        // ✗

// Combining unions multiplies them out:
type Size = 'sm' | 'lg';
type Colour = 'red' | 'blue';
type Class = \`\${Size}-\${Colour}\`;
// 'sm-red' | 'sm-blue' | 'lg-red' | 'lg-blue'

// With the built-in string manipulation types:
type Getter<T extends string> = \`get\${Capitalize<T>}\`;
type G = Getter<'name'>;              // 'getName'
// Also: Uppercase, Lowercase, Uncapitalize

// The genuinely useful pattern — deriving event names or
// getters from an object's keys:
interface User { id: number; name: string }
type Handlers = {
  [K in keyof User as \`on\${Capitalize<string & K>}Change\`]:
    (v: User[K]) => void;
};
// { onIdChange: (v: number) => void;
//   onNameChange: (v: string) => void }

// Real uses: typed CSS class names, typed route paths, typed
// event emitters, and API paths:
type Route = \`/api/\${string}\`;

// A caution: unions multiply, and a large product can slow the
// compiler noticeably or hit its limit.`,
      output: `'sm-red' | 'sm-blue' | 'lg-red' | 'lg-blue'`,
    },
  },
  {
    question: 'What is exhaustiveness checking?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'In a switch over a discriminated union, add a default branch assigning the value to `never`: `const _exhaustive: never = value`. As long as every case is handled, the value is narrowed to `never` and it compiles. The moment someone adds a new union member, that assignment ERRORS, so the compiler tells you exactly which switches need updating. It converts "did I handle every case?" from a manual review question into a build failure.',
      hinglish:
        'Ek discriminated union pe ek switch mein, ek default branch jodo jo value ko `never` mein assign kare: `const _exhaustive: never = value`. Jab tak har case sambhala gaya hai, value `never` tak narrow hoti hai aur ye compile ho jaata hai. Jis pal koi ek naya union member jodta hai, wo assignment ERROR deta hai, isliye compiler tumhe theek batata hai ki kaunse switches update karne hain. Ye "kya maine har case sambhala?" ko ek manual review sawaal se ek build failure mein badal deta hai.',
    },
    visual: 'type-narrowing',
    codeExample: {
      code: `// Making the compiler tell you when you forget a case.
type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; side: number };

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.r ** 2;
    case 'square': return s.side ** 2;
    default:
      const _exhaustive: never = s;   // ← the trick
      return _exhaustive;
  }
}

// Why it works: if every case is handled, s is 'never' in the
// default branch, and never is assignable to never. Add a new
// member and s is no longer never, so the assignment fails.

type Shape = … | { kind: 'triangle'; base: number };
// ✗ Type '{ kind: "triangle"; … }' is not assignable to 'never'
// pointing straight at the switch you forgot to update.

// This is the real payoff of discriminated unions: adding a
// variant produces a COMPILE error in every place that must
// change, instead of a silent undefined at runtime.

// As a reusable helper:
function assertNever(x: never): never {
  throw new Error('Unhandled: ' + JSON.stringify(x));
}
default: return assertNever(s);

// Note it needs a return in every case — noImplicitReturns
// helps here too.`,
      output: `Type 'triangle' is not assignable to type 'never'.`,
    },
  },
  {
    question: 'How do you type an async function and its errors?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An `async` function always returns `Promise<T>`, and TypeScript infers it. What it does NOT model is what a function might THROW — there is no checked-exception system, so a caught error is typed `unknown` under strict mode and must be narrowed before use. Many codebases therefore return a discriminated `{ ok: true; data } | { ok: false; error }` result instead, which makes failure part of the type and impossible to forget.',
      hinglish:
        'Ek `async` function hamesha `Promise<T>` lautaata hai, aur TypeScript use infer kar leta hai. Jo ye model NAHI karta wo ye hai ki ek function kya THROW kar sakta hai — koi checked-exception system nahi hai, isliye ek pakda gaya error strict mode mein `unknown` type hota hai aur use karne se pehle narrow karna padta hai. Isliye bahut codebases uske bajaye ek discriminated `{ ok: true; data } | { ok: false; error }` result lautaate hain, jo failure ko type ka hissa aur bhoolna namumkin bana deta hai.',
    },
    codeExample: {
      code: `// An async function ALWAYS returns a Promise. Annotate the
// resolved type, and TypeScript wraps it:
async function getUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return UserSchema.parse(await res.json());
}

// Awaited unwraps it when you need the inner type:
type U = Awaited<ReturnType<typeof getUser>>;   // User

// ERRORS are the interesting part. In a catch block the value
// is 'unknown' under useUnknownInCatchVariables (part of strict):
try {
  await getUser('1');
} catch (err) {
  err.message;                  // ✗ 'err' is of type 'unknown'
  if (err instanceof Error) err.message;   // ✓ narrow first
}
// It is unknown because JavaScript lets you throw ANYTHING —
// a string, a number, an object.

// TypeScript cannot express "this function throws X". The type
// system has no checked exceptions. So for errors you care
// about, return them instead of throwing:
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

async function getUser(id: string): Promise<Result<User>> { … }
const r = await getUser('1');
if (r.ok) r.value;              // ✓ the compiler forces the check`,
      output: `'err' is of type 'unknown'.`,
    },
  },
  {
    question: 'What is the difference between Record and an index signature?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`Record<K, V>` is a mapped type where K can be a UNION of specific keys, so `Record<"a"|"b", number>` requires exactly those two and the compiler knows they exist. An index signature `{ [key: string]: V }` allows ANY string key, so the compiler can never tell you a key is missing and every lookup should really be treated as possibly undefined. Use `Record` with a key union when the keys are known; enable `noUncheckedIndexedAccess` when they are not.',
      hinglish:
        '`Record<K, V>` ek mapped type hai jahan K khaas keys ka ek UNION ho sakta hai, isliye `Record<"a"|"b", number>` theek wo do maangta hai aur compiler jaanta hai ki wo hain. Ek index signature `{ [key: string]: V }` KOI BHI string key allow karta hai, isliye compiler kabhi nahi bata sakta ki ek key gayab hai aur har lookup ko sach mein possibly undefined maanna chahiye. Jab keys pata hon to key union ke saath `Record` use karo; jab na hon to `noUncheckedIndexedAccess` enable karo.',
    },
    codeExample: {
      code: `// They are nearly the same thing; Record is a mapped type
// built on top of an index signature.
type A = Record<string, number>;
type B = { [key: string]: number };     // identical

// The difference appears with a FINITE key union:
type Roles = Record<'admin' | 'user', string[]>;
// { admin: string[]; user: string[] }  ← both keys REQUIRED

type Bad = { [k in 'admin' | 'user']: string[] };   // same thing
type Worse = { [key: string]: string[] };
// ✗ any key allowed, none required — typos pass silently

// So: Record with a union gives you exhaustiveness. An index
// signature with 'string' gives you a free-for-all.

// The index signature trap:
const scores: { [k: string]: number } = { a: 1 };
scores.typo;         // number — TypeScript claims it exists!
// It has no idea the key is missing.

// noUncheckedIndexedAccess fixes exactly this:
scores.typo;         // number | undefined ✓

// An index signature also constrains every OTHER property:
interface X {
  [key: string]: number;
  name: string;      // ✗ 'string' is not assignable to 'number'
}

// Rule of thumb: a known set of keys → Record with a union,
// or just an interface. Genuinely arbitrary keys → Map is
// usually safer than either.`,
      output: `Property 'typo' does not exist`,
    },
  },
  {
    question: 'What does noUncheckedIndexedAccess do?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'By default, `arr[10]` on a `number[]` is typed `number` even though the array may be shorter — TypeScript lies about it for convenience. This flag adds `| undefined` to every index access, forcing you to check before use. It is genuinely correct and catches a real class of crashes, but it is noisy enough that it is excluded from `strict`. Worth enabling on new code, painful to retrofit onto old code.',
      hinglish:
        'Default se, ek `number[]` pe `arr[10]` `number` type hota hai chahe array chhota ho — TypeScript sahoolat ke liye is baare mein jhooth bolta hai. Ye flag har index access mein `| undefined` jodta hai, tumhe use karne se pehle check karne pe majboor karte hue. Ye genuinely sahi hai aur crashes ki ek asli kism pakadta hai, par itna shor karta hai ki ise `strict` se bahar rakha gaya hai. Naye code pe enable karna worth hai, purane code pe lagana takleefdeh.',
    },
    codeExample: {
      code: `// OFF (the default) — TypeScript LIES about array access:
const arr: number[] = [];
const first = arr[0];         // number  ← but the array is empty!
first.toFixed();              // ✓ compiles → crashes at runtime

// ON — indexing adds undefined, which is the truth:
const first = arr[0];         // number | undefined
first.toFixed();              // ✗ possibly undefined
first?.toFixed();             // ✓
if (first !== undefined) first.toFixed();   // ✓

// Same for records:
const scores: Record<string, number> = {};
scores.missing;               // number | undefined ✓

// This closes one of the last big holes left by strictNullChecks
// — array and object index access was still unsound.

// The cost: it is noisy. A loop you know is safe still complains:
for (let i = 0; i < arr.length; i++) {
  arr[i].toFixed();           // ✗ even though it cannot be undefined
}
// Use for…of instead, which narrows correctly:
for (const n of arr) n.toFixed();      // ✓

// Destructuring and .at() behave the same way:
const [a] = arr;              // number | undefined
arr.at(0);                    // number | undefined (always has been)

// Worth enabling on a new project. On an existing one, expect a
// large number of errors — most of which are genuine bugs.`,
      output: `Object is possibly 'undefined'.`,
    },
  },
  {
    question: 'How do you share types between a frontend and a backend?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Define them ONCE and consume from both — a shared package in a monorepo, types generated from an OpenAPI or GraphQL schema, a Prisma client, or an end-to-end typed layer such as tRPC. Duplicating an interface on each side means the two silently drift apart the first time someone changes only one, and the compiler cannot help because each side is internally consistent. The goal is one source of truth that a build failure enforces.',
      hinglish:
        'Unhe EK BAAR define karo aur dono taraf se use karo — ek monorepo mein ek shared package, ek OpenAPI ya GraphQL schema se generate hue types, ek Prisma client, ya tRPC jaisi ek end-to-end typed layer. Har taraf ek interface duplicate karne ka matlab hai ki jis pal koi sirf ek badalta hai dono chupke se alag ho jaate hain, aur compiler madad nahi kar sakta kyunki har taraf apne andar consistent hai. Lakshya ek hi sach ka source hai jise ek build failure enforce kare.',
    },
    codeExample: {
      code: `// 1. A SHARED PACKAGE in a monorepo — the common approach.
// packages/shared/src/types.ts
export interface User { id: string; name: string }

// apps/api and apps/web both:
import type { User } from '@repo/shared';
// One definition. A change breaks the build on BOTH sides,
// which is exactly what you want.

// 2. DERIVE the types from a schema, so validation and types
//    cannot drift apart:
export const UserSchema = z.object({ id: z.string(), name: z.string() });
export type User = z.infer<typeof UserSchema>;
// The API validates with it; the frontend imports the type.

// 3. GENERATE from the source of truth:
//    OpenAPI  → openapi-typescript
//    GraphQL  → graphql-codegen
//    Database → Prisma / Drizzle generate types from the schema
// Best when the backend is not TypeScript.

// 4. END-TO-END TYPE SAFETY — tRPC infers the client type
//    directly from the server router, no codegen at all:
const user = await trpc.user.byId.query({ id: '1' });   // typed

// Use 'import type' for type-only imports so the bundler drops
// them entirely:
import type { User } from '@repo/shared';

// The anti-pattern: copy-pasting the interface into both repos.
// They drift within weeks, and nothing tells you.`,
      output: `(one definition, both sides in sync)`,
    },
  },
  {
    question: 'What are the most common TypeScript mistakes you see?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Reaching for `any` when the type is inconvenient, which silently disables checking for everything downstream. Using `as` to silence an error instead of narrowing, which is an unverified claim. Asserting API responses rather than validating them at runtime. Over-annotating where inference is better. Writing elaborate conditional types where a simple union would do. And leaving `strict` off, which removes most of the value TypeScript exists to provide.',
      hinglish:
        'Type asuvidhajanak hone pe `any` uthana, jo aage sab kuch ke liye checking chupke se band kar deta hai. Narrow karne ke bajaye ek error chup karane ke liye `as` use karna, jo ek bina jaancha daawa hai. API responses ko runtime pe validate karne ke bajaye assert karna. Wahan zyada annotate karna jahan inference behtar hai. Wahan vistrit conditional types likhna jahan ek simple union kaam kar deta. Aur `strict` band chhodna, jo TypeScript ke hone ki zyadatar value hi hata deta hai.',
    },
    codeExample: {
      code: `// 1. any everywhere — the build cost with none of the benefit
function f(data: any) {}          // ✗
function f(data: unknown) {}      // ✓ narrow it

// 2. Asserting instead of validating at a boundary
const u = await res.json() as User;      // ✗ checks nothing
const u = UserSchema.parse(await res.json());   // ✓

// 3. strict turned off, or strictNullChecks disabled —
//    which removes the main reason to use TypeScript at all

// 4. Non-null ! to silence an error you do not understand
user!.name;                       // ✗
if (user) user.name;              // ✓

// 5. Annotating what is already inferred
const n: number = 5;              // ✗ noise
const users: User[] = getUsers(); // ✗ if the return is typed

// 6. Writing the same shape twice instead of deriving it
interface CreateUser { name: string; email: string }
type CreateUser = Omit<User, 'id'>;      // ✓ one source of truth

// 7. Using string where a union belongs
function setStatus(s: string) {}                  // ✗
function setStatus(s: 'on' | 'off') {}            // ✓

// 8. @ts-ignore instead of @ts-expect-error
// @ts-expect-error errors once the line is fixed, so it cannot
// silently rot.

// The theme: every one of these is a way of turning the
// compiler off while still paying for it.`,
      output: `(each of these removes the safety you installed TS for)`,
    },
  },
  {
    question: 'When is TypeScript not worth using?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'For a genuinely throwaway script, a tiny prototype, or a one-file utility, the build setup and annotation cost outweighs the benefit. It also struggles where data is inherently dynamic and unvalidated. And it is worth being honest that TypeScript prevents type errors, not logic errors — it will happily let you compute the wrong answer with perfect types. For anything with multiple contributors or a lifespan beyond a few weeks, it pays for itself quickly.',
      hinglish:
        'Ek sach mein phenkne wale script, ek chhote prototype, ya ek single-file utility ke liye, build setup aur annotation ka cost faayde se zyada hai. Ye wahan bhi joojhta hai jahan data swabhavik roop se dynamic aur bina jaancha ho. Aur imaandaari se maanna chahiye ki TypeScript type errors rokta hai, logic errors nahi — ye khushi se tumhe perfect types ke saath galat jawab compute karne dega. Kai contributors ya kuch hafton se lambi umar wali kisi bhi cheez ke liye, ye jaldi apna cost nikaal leta hai.',
    },
    codeExample: {
      code: `// It is not always the right call. Honest cases against:

// 1. A genuinely tiny script
// A 30-line build script or a one-off scraper. The tsconfig,
// the build step and the @types install cost more than they save.

// 2. A prototype you will throw away this week
// Types slow down the churn when the shape changes hourly.
// (Though for a prototype that SURVIVES, you will regret it.)

// 3. A team with no TypeScript experience and a hard deadline
// The learning curve is real, and half-learned TypeScript
// produces any everywhere — the cost with none of the benefit.

// 4. Heavily dynamic code that fights the type system
const handler = obj[\`on\${capitalize(event)}\`];   // painful to type
// If you are writing more type gymnastics than logic, stop.

// 5. A dependency with no types and a large API surface
// Writing a .d.ts for it may cost more than it returns.

// Where it clearly IS worth it:
//   • more than one developer
//   • a codebase that will live longer than a few months
//   • refactoring you want to be safe
//   • a shared API contract between frontend and backend

// The honest framing: TypeScript trades some upfront speed for
// safety and refactorability later. On short-lived code that
// trade does not pay off.`,
      output: `(a judgement call, not a rule)`,
    },
  },
  {
    question: 'What is the difference between unknown and any in a catch block?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Since TypeScript 4.4 with `useUnknownInCatchVariables` (included in `strict`), a caught error is typed `unknown` rather than `any`. That matters because JavaScript lets you throw ANYTHING — a string, a number, an object — so assuming `err.message` exists is genuinely unsafe and crashes when someone throws a plain string. The correct pattern is narrowing with `err instanceof Error` before touching `.message`, and falling back to `String(err)` otherwise.',
      hinglish:
        'TypeScript 4.4 se `useUnknownInCatchVariables` (jo `strict` mein shaamil hai) ke saath, ek pakda gaya error `any` ke bajaye `unknown` type hota hai. Ye isliye matter karta hai kyunki JavaScript tumhe KUCH BHI throw karne deta hai — ek string, ek number, ek object — isliye ye maan lena ki `err.message` hai genuinely asurakshit hai aur tab crash karta hai jab koi ek plain string throw kare. Sahi pattern `.message` chhune se pehle `err instanceof Error` se narrow karna hai, aur warna `String(err)` pe girna.',
    },
    codeExample: {
      code: `// JavaScript lets you throw ANYTHING, not just Errors:
throw new Error('real');
throw 'a string';
throw { code: 500 };
throw undefined;

// So TypeScript types the catch variable as unknown under
// useUnknownInCatchVariables (included in strict):
try {
  risky();
} catch (err) {              // err: unknown
  err.message;               // ✗ 'err' is of type 'unknown'
}

// You must narrow, which forces you to handle the real cases:
catch (err) {
  if (err instanceof Error) {
    console.error(err.message, err.stack);
  } else {
    console.error('Unknown error:', String(err));
  }
}

// With any (the old behaviour, or an explicit annotation) it
// compiles and then crashes:
catch (err: any) {
  err.message.toUpperCase();     // ✓ compiles
}                                // → TypeError if err was a string

// A helper worth having:
function toError(e: unknown): Error {
  return e instanceof Error ? e : new Error(String(e));
}
catch (err) { logger.error(toError(err)); }

// Custom error classes narrow nicely:
if (err instanceof ValidationError) err.fields;   // ✓ typed`,
      output: `'err' is of type 'unknown'.`,
    },
  },
  {
    question: 'What is the difference between a class and an interface in TypeScript?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A CLASS exists at runtime — it emits JavaScript, can be instantiated with `new`, holds implementation, and can be used with `instanceof`. An INTERFACE is purely a compile-time contract that is erased entirely. Confusingly, a class also creates a TYPE of the same name, so you can annotate against it. Use an interface when you only need a shape, and a class when you genuinely need behaviour or runtime identity — an interface costs nothing in the output.',
      hinglish:
        'Ek CLASS runtime pe exist karti hai — ye JavaScript nikaalti hai, `new` se banayi ja sakti hai, implementation rakhti hai, aur `instanceof` ke saath use ho sakti hai. Ek INTERFACE sirf ek compile-time contract hai jo poori tarah mit jaata hai. Uljhaane wali baat ye hai ki ek class usi naam ka ek TYPE bhi banati hai, isliye tum uske against annotate kar sakte ho. Jab sirf ek shape chahiye tab interface use karo, aur class jab tumhe genuinely behaviour ya runtime pehchaan chahiye — ek interface output mein kuch cost nahi karta.',
    },
    codeExample: {
      code: `// INTERFACE — types only. Erased completely at compile time.
interface Animal {
  name: string;
  speak(): string;          // a signature, no body
}

// CLASS — a real runtime value with implementation.
class Dog implements Animal {
  constructor(public name: string) {}    // parameter property
  speak() { return 'Woof'; }
}

// The key difference: a class EXISTS at runtime.
new Dog('Rex');                // ✓
new Animal();                  // ✗ 'Animal' only refers to a type
d instanceof Dog;              // ✓ works
d instanceof Animal;           // ✗ not a value

// A class also creates a TYPE with the same name:
const d: Dog = new Dog('Rex'); // Dog used as a type ✓

// implements is only a CHECK — it adds no behaviour and does
// not inherit anything. extends does both.

// And because TypeScript is structural, implements is optional:
class Cat { name = 'Tom'; speak() { return 'Meow'; } }
const a: Animal = new Cat();   // ✓ the shape matches

// Which to reach for:
//   just describing a shape          → interface
//   need instances, state, methods   → class
//   a contract several classes share → interface + implements

// Note: an abstract class sits between them — it can hold
// implementation but cannot be instantiated.`,
      output: `Woof`,
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
    `[typescript] ${unmatched.size} deep-dive key(s) match no question:`
  );
  for (const key of unmatched) console.warn(`  ${key}`);
}
