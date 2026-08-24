// Object-Oriented Programming (OOP) curriculum — beginner -> intermediate -> advanced.
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
  title: 'OOP',
  slug: 'oops',
  description:
    'Object-Oriented Programming — classes, 4 pillars (encapsulation, abstraction, inheritance, polymorphism) aur SOLID principles. Interview-ready, English + Hinglish, desi examples aur code ke saath.',
  icon: 'html',
  tags: ['oop', 'cs-fundamentals', 'interview', 'design'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 20,
};

const beginner = [
  {
    title: 'OOP Basics',
    level: 'beginner',
    description: 'Classes, objects aur OOP kya hai.',
    concepts: [
      {
        title: 'What is OOP',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'Object-Oriented Programming organises code around objects — bundles of data (properties) and behaviour (methods) — instead of just functions and logic. It models real-world entities (a User, a Car, an Order) as objects, making large programs easier to structure, reuse, and maintain. Its core ideas are the four pillars: encapsulation, abstraction, inheritance, and polymorphism.',
          hinglish:
            'Object-Oriented Programming code ko objects ke around organise karta hai — data (properties) aur behaviour (methods) ke bundles — sirf functions aur logic ke bajaye. Ye real-world entities (User, Car, Order) ko objects ki tarah model karta hai, jisse bade programs structure, reuse, aur maintain karna aasaan hota hai. Iske core ideas chaar pillars hain: encapsulation, abstraction, inheritance, polymorphism.',
        },
        dailyLifeExample:
          'OOP ek car factory jaisa hai — har car (object) ke apne properties (colour, speed) aur behaviours (start, brake) hote hain. Ek blueprint (class) se kai cars ban jaati hain.',
        codeExample:
          'class Car {\n  constructor(brand) { this.brand = brand; this.speed = 0; }\n  accelerate() { this.speed += 10; }\n}\nconst myCar = new Car("Tata"); // an object\nmyCar.accelerate();',
        keyPoints: [
          'Organises code around objects (data + behaviour)',
          'Models real-world entities',
          'Easier to structure, reuse, maintain',
          'Four pillars: encapsulation, abstraction, inheritance, polymorphism',
        ],
        quiz: [
          {
            question: 'OOP organises code around…',
            options: ['only functions', 'objects (data + behaviour)', 'databases', 'loops'],
            correctIndex: 1,
          },
          {
            question: 'How many core pillars does OOP have?',
            options: ['2', '3', '4', '5'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Classes & Objects',
        difficulty: 'easy',
        tags: ['class', 'object'],
        explanation: {
          english:
            'A class is a blueprint that defines properties and methods; an object is a concrete instance created from that class. The constructor initialises a new object\'s state. One class can create many independent objects, each with its own data. This separation of blueprint vs instance is the foundation of OOP.',
          hinglish:
            'Class ek blueprint hai jo properties aur methods define karti hai; object us class se bana ek concrete instance hai. Constructor naye object ki state initialise karta hai. Ek class se kai independent objects ban sakte hain, har ek apne data ke saath. Blueprint vs instance ka ye separation OOP ki neenv hai.',
        },
        dailyLifeExample:
          'Class ek cookie-cutter (saancha) hai, objects us se bani cookies. Ek hi saancha, par har cookie alag (alag toppings/data).',
        codeExample:
          'class Student {\n  constructor(name, marks) { this.name = name; this.marks = marks; }\n  passed() { return this.marks >= 40; }\n}\nconst a = new Student("Riya", 80);\nconst b = new Student("Raj", 30);\na.passed(); // true; b.passed() -> false',
        keyPoints: [
          'Class = blueprint; object = instance',
          'constructor initialises an object',
          'One class -> many independent objects',
          'new creates an object',
        ],
        quiz: [
          {
            question: 'A class is a ___ and an object is an ___.',
            options: ['instance / blueprint', 'blueprint / instance', 'function / variable', 'method / property'],
            correctIndex: 1,
          },
          {
            question: 'What initialises a new object?',
            options: ['destructor', 'constructor', 'method', 'loop'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'The Four Pillars',
    level: 'intermediate',
    description: 'Encapsulation, abstraction, inheritance, polymorphism.',
    concepts: [
      {
        title: 'Encapsulation',
        difficulty: 'medium',
        tags: ['pillar', 'encapsulation'],
        explanation: {
          english:
            'Encapsulation bundles data and the methods that operate on it inside one unit (a class) and restricts direct access to the internal state. You expose a controlled public interface (getters/setters) while keeping fields private. This protects invariants (e.g. balance can never go negative) and lets you change the internals without breaking users.',
          hinglish:
            'Encapsulation data aur uspe kaam karne wale methods ko ek unit (class) mein bundle karta hai aur internal state ka direct access restrict karta hai. Tum ek controlled public interface (getters/setters) dete ho jabki fields private rakhte ho. Ye invariants protect karta hai (jaise balance kabhi negative na ho) aur tum internals badal sakte ho bina users ko toode.',
        },
        dailyLifeExample:
          'Encapsulation ATM machine jaisa hai — andar ke notes (data) seedha access nahi, sirf allowed buttons (methods) se. Tum machine ke andar haath nahi daal sakte.',
        codeExample:
          'class BankAccount {\n  #balance = 0;            // private field\n  deposit(amt) { if (amt > 0) this.#balance += amt; }\n  getBalance() { return this.#balance; } // controlled access\n}\nconst acc = new BankAccount();\nacc.deposit(100);\n// acc.#balance -> SyntaxError (private)',
        keyPoints: [
          'Bundle data + methods in one unit',
          'Hide internal state (private fields)',
          'Expose a controlled interface (getters/setters)',
          'Protects invariants; internals can change safely',
        ],
        quiz: [
          {
            question: 'Encapsulation mainly provides…',
            options: ['faster loops', 'data hiding + controlled access', 'inheritance', 'more memory'],
            correctIndex: 1,
          },
          {
            question: 'Private fields are accessed via…',
            options: ['direct access', 'public getters/setters', 'global variables', 'the constructor only'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Abstraction',
        difficulty: 'medium',
        tags: ['pillar', 'abstraction'],
        explanation: {
          english:
            'Abstraction means exposing only the essential features and hiding complex implementation details. A user interacts with a simple interface without needing to know how it works inside. Abstract classes and interfaces define WHAT an object can do without specifying HOW. This reduces complexity and decouples code.',
          hinglish:
            'Abstraction ka matlab sirf essential features dikhana aur complex implementation details chhupana. User ek simple interface se interact karta hai bina ye jaane ki andar kaise kaam hota hai. Abstract classes aur interfaces batate hain ki object KYA kar sakta hai bina ye bataye KAISE. Ye complexity kam karta hai aur code ko decouple karta hai.',
        },
        dailyLifeExample:
          'Abstraction car chalane jaisa hai — tum steering, accelerator, brake use karte ho (interface), engine andar kaise chalta hai jaanne ki zaroorat nahi.',
        codeExample:
          '// Interface-like abstraction\nclass PaymentMethod {\n  pay(amount) { throw new Error("implement pay()"); }\n}\nclass UpiPayment extends PaymentMethod {\n  pay(amount) { return `Paid ${amount} via UPI`; }\n}\n// caller just calls .pay() — does not care how',
        keyPoints: [
          'Expose essentials, hide implementation',
          'Defines WHAT, not HOW',
          'Abstract classes / interfaces',
          'Reduces complexity & coupling',
        ],
        quiz: [
          {
            question: 'Abstraction focuses on…',
            options: ['how it works inside', 'what an object does (hiding details)', 'memory layout', 'loops'],
            correctIndex: 1,
          },
          {
            question: 'Driving a car using pedals (not knowing the engine) is an example of…',
            options: ['inheritance', 'abstraction', 'polymorphism', 'recursion'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Inheritance',
        difficulty: 'medium',
        tags: ['pillar', 'inheritance'],
        explanation: {
          english:
            'Inheritance lets a class (child/subclass) acquire the properties and methods of another class (parent/superclass), promoting code reuse. The child can add new behaviour or override inherited methods. Use it for a genuine "is-a" relationship (a Dog is an Animal). Overusing deep inheritance leads to rigid code — prefer composition where an "is-a" does not truly hold.',
          hinglish:
            'Inheritance ek class (child/subclass) ko doosri class (parent/superclass) ke properties aur methods leni deta hai, code reuse badhata hai. Child naya behaviour add kar sakta hai ya inherited methods override kar sakta hai. Ise genuine "is-a" relationship ke liye use karo (Dog ek Animal hai). Deep inheritance zyada use karna rigid code deta hai — jahan "is-a" sach mein na ho wahan composition prefer karo.',
        },
        dailyLifeExample:
          'Inheritance family traits jaise hain — bachche maa-baap ke kuch features inherit karte hain, aur apne kuch naye bhi. "Dog is-a Animal" — Animal ke saare features + bark.',
        codeExample:
          'class Animal {\n  eat() { return "eating"; }\n}\nclass Dog extends Animal {  // Dog is-a Animal\n  bark() { return "woof"; }\n}\nconst d = new Dog();\nd.eat();  // inherited\nd.bark(); // own',
        keyPoints: [
          'Child acquires parent properties/methods',
          'Promotes code reuse; child can override',
          'Use for a true "is-a" relationship',
          'Avoid deep hierarchies — prefer composition',
        ],
        quiz: [
          {
            question: 'Inheritance models which relationship?',
            options: ['has-a', 'is-a', 'uses-a', 'none'],
            correctIndex: 1,
          },
          {
            question: 'A subclass can ___ an inherited method.',
            options: ['delete', 'override', 'rename globally', 'hide forever'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between inheritance and composition, and which is preferred?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Inheritance is an "is-a" relationship where a subclass derives from a superclass and reuses its code. Composition is a "has-a" relationship where an object is built from other objects it holds as fields. The principle "favour composition over inheritance" applies because deep inheritance creates tight coupling and fragile hierarchies (a change in the parent can break children), while composition is more flexible and lets you swap behaviours at runtime. Use inheritance only for genuine is-a relationships; otherwise compose.',
              hinglish:
                'Inheritance ek "is-a" relationship hai jahan subclass superclass se derive karke uska code reuse karta hai. Composition ek "has-a" relationship hai jahan object doosre objects se bana hota hai jinhe wo fields ki tarah rakhta hai. "Favour composition over inheritance" principle isliye hai kyunki deep inheritance tight coupling aur fragile hierarchies deta hai (parent mein change children ko tod sakta hai), jabki composition zyada flexible hai aur runtime pe behaviours swap karne deta hai. Inheritance sirf genuine is-a ke liye; warna compose karo.',
            },
          },
        ],
      },
      {
        title: 'Polymorphism',
        difficulty: 'medium',
        tags: ['pillar', 'polymorphism'],
        explanation: {
          english:
            'Polymorphism ("many forms") lets one interface work with different underlying types — the same method call behaves differently depending on the object. Runtime polymorphism comes from method overriding (a Shape\'s area() differs for Circle vs Square); compile-time polymorphism (in some languages) comes from method overloading. It lets you write code against a general type and let each object do the right thing.',
          hinglish:
            'Polymorphism ("many forms") ek interface ko alag underlying types ke saath kaam karne deta hai — same method call object ke hisaab se alag behave karta hai. Runtime polymorphism method overriding se aata hai (Shape ka area() Circle vs Square ke liye alag); compile-time polymorphism (kuch languages mein) method overloading se. Ye tumhe ek general type ke against code likhne deta hai aur har object sahi kaam karta hai.',
        },
        dailyLifeExample:
          'Polymorphism "bolo" command jaisa hai — kutta bhaunkega, billi miaaun karegi, gaay rambhayegi. Same command (speak), alag behaviour har object ka.',
        codeExample:
          'class Shape { area() { return 0; } }\nclass Circle extends Shape {\n  constructor(r) { super(); this.r = r; }\n  area() { return Math.PI * this.r ** 2; }\n}\nclass Square extends Shape {\n  constructor(s) { super(); this.s = s; }\n  area() { return this.s * this.s; }\n}\n[new Circle(2), new Square(3)].forEach(s => console.log(s.area()));',
        keyPoints: [
          'One interface, many forms',
          'Same call behaves per object type',
          'Runtime: method overriding',
          'Write to a general type; objects do the right thing',
        ],
        quiz: [
          {
            question: 'Polymorphism means…',
            options: ['one form only', 'one interface, many forms', 'hiding data', 'copying code'],
            correctIndex: 1,
          },
          {
            question: 'Runtime polymorphism is achieved via…',
            options: ['method overriding', 'private fields', 'loops', 'constructors'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Method Overloading vs Overriding',
        difficulty: 'medium',
        tags: ['overloading', 'overriding', 'polymorphism'],
        explanation: {
          english:
            "These two terms sound similar but mean opposite kinds of flexibility. Overloading means defining MULTIPLE methods with the SAME name in the SAME class, but different parameters (different count or types) — the compiler picks the right one based on how you call it (compile-time / static polymorphism). Overriding means a SUBCLASS redefines a method it inherited from its PARENT class, with the SAME signature, to provide its own specific behaviour — the correct version is chosen at runtime based on the object's actual type (runtime / dynamic polymorphism).",
          hinglish:
            "Ye do terms sunne mein same lagte hain par flexibility ke opposite kisam hain. Overloading ka matlab hai SAME class mein SAME naam ke MULTIPLE methods define karna, par alag parameters ke saath (alag count ya types) — compiler sahi wala choose karta hai ki tumne kaise call kiya (compile-time / static polymorphism). Overriding ka matlab hai ek SUBCLASS apne PARENT class se inherit kiya hua method dobara define karta hai, SAME signature ke saath, apna specific behaviour dene ke liye — sahi version runtime pe object ke actual type ke hisaab se choose hota hai (runtime / dynamic polymorphism).",
        },
        dailyLifeExample:
          "Overloading ek hi 'order' word ke different tareeke bolne jaisa hai — 'order(pizza)', 'order(pizza, drink)', 'order(pizza, drink, dessert)' — restaurant samajh jaata hai kaunsa combo chahiye, tumne kitni cheezein maangi uske hisaab se. Overriding ek family recipe jaisa hai — 'biryani banao' sabko pata hai, par har ghar (subclass) ka apna specific tareeka hai use banane ka.",
        codeExample:
          "// OVERLOADING (same class, same name, different parameters)\n// In languages like Java/C++ — JS simulates it with default/rest params:\nclass Calculator {\n  add(a, b, c) {\n    if (c !== undefined) return a + b + c; // 3 args\n    return a + b;                           // 2 args\n  }\n}\n\n// OVERRIDING (subclass redefines a parent method, same signature)\nclass Animal {\n  speak() { return 'Some generic sound'; }\n}\nclass Dog extends Animal {\n  speak() { return 'Woof!'; } // overrides Animal's speak()\n}\nclass Cat extends Animal {\n  speak() { return 'Meow!'; } // overrides Animal's speak()\n}\n\nconst animals = [new Dog(), new Cat()];\nanimals.forEach(a => console.log(a.speak())); // Woof! Meow! — runtime decides",
        keyPoints: [
          'Overloading: SAME class, SAME method name, DIFFERENT parameters — resolved at compile time',
          'Overriding: SUBCLASS redefines an inherited method with the SAME signature — resolved at runtime',
          'Overloading is about having multiple ways to CALL a method',
          'Overriding is about a child class CHANGING inherited behaviour',
          'JavaScript does not support true overloading (no duplicate method names) — it is simulated with default/rest parameters',
        ],
        quiz: [
          {
            question: 'What is the key difference between overloading and overriding?',
            options: ['They are the same thing', 'Overloading is multiple methods with the same name but different parameters in ONE class; overriding is a subclass redefining an inherited method with the SAME signature', 'Overloading only happens in subclasses', 'Overriding requires different parameter types'],
            correctIndex: 1,
          },
          {
            question: 'Which is resolved at COMPILE time (in languages that support it), and which at RUNTIME?',
            options: ['Both are resolved at runtime', 'Overloading at compile time; overriding at runtime', 'Overloading at runtime; overriding at compile time', 'Both are resolved at compile time'],
            correctIndex: 1,
          },
          {
            question: 'Does JavaScript support true method overloading (multiple methods with the exact same name in one class)?',
            options: ['Yes, fully', 'No — JavaScript only keeps the LAST definition; overloading-like behavior is simulated with default/rest parameters', 'Only in strict mode', 'Only for constructors'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: "Composition vs Inheritance: 'Has-a' vs 'Is-a'",
        difficulty: 'hard',
        tags: ['composition', 'inheritance', 'design'],
        explanation: {
          english:
            "Inheritance models an 'IS-A' relationship (a Dog IS AN Animal) — the subclass gets everything the parent has, tightly coupled to it. Composition models a 'HAS-A' relationship (a Car HAS AN Engine) — an object holds a reference to another object and delegates work to it, without inheriting from it. A famous OOP design principle says 'favor composition over inheritance': deep inheritance chains become rigid and fragile (changing a parent can break every descendant), while composition is more flexible — you can swap out a component at runtime, and avoid forcing an 'IS-A' relationship that doesn't truly fit.",
          hinglish:
            "Inheritance ek 'IS-A' relationship model karta hai (ek Dog EK Animal HAI) — subclass ko parent ke paas jo bhi hai sab milta hai, usse tightly coupled. Composition ek 'HAS-A' relationship model karta hai (ek Car EK Engine RAKHTI HAI) — ek object doosre object ka reference rakhta hai aur usse kaam delegate karta hai, usse inherit kiye bina. Ek famous OOP design principle kehta hai 'composition ko inheritance se zyada prefer karo': deep inheritance chains rigid aur fragile ho jaati hain (parent badalne se har descendant toot sakta hai), jabki composition zyada flexible hai — tum runtime pe ek component swap kar sakte ho, aur ek 'IS-A' relationship force karne se bach sakte ho jo actually fit nahi karta.",
        },
        dailyLifeExample:
          'Inheritance ek naukri jaisa hai jahan tum apne baap ka poora business inherit karte ho, chaho ya na chaho — sab kuch saath aata hai. Composition ek car banane jaisa hai — tum ek engine \'lagate\' ho car mein, aur agar zaroorat ho to engine badal sakte ho bina poori car dobara banaye.',
        codeExample:
          "// Inheritance: IS-A — tightly coupled, rigid\nclass Bird {\n  fly() { return 'Flying...'; }\n}\nclass Penguin extends Bird {\n  // Problem: a Penguin IS-A Bird but CANNOT fly! Inheritance forces this bad fit.\n}\n\n// Composition: HAS-A — flexible, swappable\nclass Engine {\n  start() { return 'Engine started'; }\n}\nclass ElectricEngine {\n  start() { return 'Electric engine humming silently'; }\n}\n\nclass Car {\n  constructor(engine) {\n    this.engine = engine; // Car HAS-A engine (delegated, not inherited)\n  }\n  start() { return this.engine.start(); }\n}\n\nconst petrolCar = new Car(new Engine());\nconst electricCar = new Car(new ElectricEngine()); // swap the component freely\nconsole.log(petrolCar.start());\nconsole.log(electricCar.start());",
        keyPoints: [
          "Inheritance = 'IS-A' relationship, tightly coupled to the parent's implementation",
          "Composition = 'HAS-A' relationship, an object delegates work to another it holds a reference to",
          '"Favor composition over inheritance" — a well-known OOP design guideline',
          'Composition lets you swap components at runtime; inheritance locks in behaviour at compile time',
          'The Penguin-Bird problem is a classic example of inheritance forcing a bad-fit relationship',
        ],
        quiz: [
          {
            question: 'What relationship does inheritance model?',
            options: ["'HAS-A'", "'IS-A'", "'USES-A'", 'No relationship'],
            correctIndex: 1,
          },
          {
            question: 'In the Car/Engine example, why is composition used instead of Car extending Engine?',
            options: ['A Car does not need an engine at all', 'A Car HAS an engine, it IS NOT an engine — composition models this correctly and lets you swap engine types freely', 'JavaScript does not support inheritance', 'Composition is always faster'],
            correctIndex: 1,
          },
          {
            question: "What OOP design guideline is illustrated by the Penguin-Bird fly() problem?",
            options: ['Always use inheritance', "'Favor composition over inheritance' — forcing an IS-A relationship that doesn't truly fit causes problems", 'Never use classes', 'Composition is only for arrays'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Design Principles',
    level: 'advanced',
    description: 'SOLID principles aur good design.',
    concepts: [
      {
        title: 'SOLID Principles',
        difficulty: 'hard',
        tags: ['solid', 'design'],
        explanation: {
          english:
            'SOLID is five principles for maintainable OOP design. S — Single Responsibility: a class should have one reason to change. O — Open/Closed: open for extension, closed for modification. L — Liskov Substitution: subclasses must be usable in place of their parent. I — Interface Segregation: prefer small, specific interfaces over fat ones. D — Dependency Inversion: depend on abstractions, not concrete implementations. Together they reduce coupling and make code easier to extend and test.',
          hinglish:
            'SOLID maintainable OOP design ke paanch principles hain. S — Single Responsibility: ek class ke badalne ka ek hi reason ho. O — Open/Closed: extension ke liye open, modification ke liye closed. L — Liskov Substitution: subclasses parent ki jagah use ho sakein. I — Interface Segregation: bade interfaces ke bajaye chhote, specific. D — Dependency Inversion: abstractions pe depend karo, concrete implementations pe nahi. Milke ye coupling kam karte hain aur code extend/test karna aasaan banate hain.',
        },
        dailyLifeExample:
          'SOLID ek achhe organised kitchen jaisa hai — har tool ka ek kaam (SRP), naye gadget add kar sako bina baaki todhe (OCP). Galat design mein ek cheez badlo to sab gadbad.',
        codeExample:
          '// Single Responsibility: split concerns\n// BAD: class doing too much\n// class User { save(){} sendEmail(){} validate(){} }\n//\n// GOOD: one job each\n// class User {}\n// class UserRepository { save(u){} }\n// class EmailService { send(u){} }',
        keyPoints: [
          'S: one class, one responsibility',
          'O: extend without modifying',
          'L: subclasses substitutable for parents',
          'I: small interfaces; D: depend on abstractions',
        ],
        quiz: [
          {
            question: 'The "S" in SOLID stands for…',
            options: ['Static', 'Single Responsibility', 'Scalability', 'Security'],
            correctIndex: 1,
          },
          {
            question: 'Dependency Inversion says depend on…',
            options: ['concrete classes', 'abstractions/interfaces', 'global state', 'the database'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the Single Responsibility Principle with an example.',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'SRP states a class should have only one reason to change — i.e. one responsibility. For example, a User class that also handles database persistence and sending emails has three reasons to change (user logic, DB schema, email provider). Splitting it into User (data), UserRepository (persistence), and EmailService (notifications) means each class changes only for its own concern, making the code easier to test, reuse, and maintain.',
              hinglish:
                'SRP kehta hai ek class ke badalne ka sirf ek reason ho — yani ek responsibility. Jaise ek User class jo database persistence aur emails bhi handle kare uske badalne ke teen reasons hain (user logic, DB schema, email provider). Use User (data), UserRepository (persistence), aur EmailService (notifications) mein split karne se har class sirf apne concern ke liye badalti hai, jisse code test, reuse, aur maintain karna aasaan hota hai.',
            },
          },
        ],
      },
      {
        title: 'Abstract Classes vs Interfaces',
        difficulty: 'medium',
        tags: ['abstract', 'interface'],
        explanation: {
          english:
            'An abstract class is a partially-implemented class that cannot be instantiated; it can have both concrete methods and abstract (unimplemented) ones, and subclasses must complete it — used for an "is-a" with shared code. An interface is a pure contract listing methods a class must implement, with no implementation (classically) — used to say a class "can do" something. A class extends one abstract class but can implement many interfaces.',
          hinglish:
            'Abstract class ek partially-implemented class hai jo instantiate nahi ho sakti; isme concrete aur abstract (unimplemented) dono methods ho sakte hain, aur subclasses use complete karti hain — shared code wale "is-a" ke liye. Interface ek pure contract hai jo methods list karta hai jo class ko implement karne hain, bina implementation (classically) — ye batata hai ki class kuch "kar sakti hai". Ek class ek abstract class extend karti hai par kai interfaces implement kar sakti hai.',
        },
        dailyLifeExample:
          'Abstract class ek adhura recipe template jaisa hai (kuch steps bhare, kuch tumhe bharne hain). Interface ek checklist hai — "ye cheezein honi chahiye" par kaise, wo tum decide karo.',
        codeExample:
          '// Abstract-ish base with shared + required behaviour\nclass Vehicle {\n  startEngine() { return "vroom"; }   // shared\n  wheels() { throw new Error("implement"); } // must override\n}\nclass Bike extends Vehicle { wheels() { return 2; } }\n// JS has no native interfaces; TypeScript does (interface X {})',
        keyPoints: [
          'Abstract class: partial impl, cannot instantiate',
          'Interface: pure contract (what, not how)',
          'Extend one abstract class; implement many interfaces',
          'Abstract = is-a + shared code; interface = can-do',
        ],
        quiz: [
          {
            question: 'Which can contain implemented (concrete) methods?',
            options: ['interface (classic)', 'abstract class', 'neither', 'only constructors'],
            correctIndex: 1,
          },
          {
            question: 'A class can implement how many interfaces?',
            options: ['only one', 'many', 'zero only', 'two max'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Common Design Patterns: Singleton, Factory & Observer',
        difficulty: 'hard',
        tags: ['design-patterns', 'singleton', 'factory', 'observer'],
        explanation: {
          english:
            'Design patterns are proven, reusable solutions to problems that come up again and again in OOP design. Singleton ensures a class has only ONE instance, globally accessible (e.g. a single database connection or configuration object). Factory hides the complexity of object creation behind a method, so calling code asks for "a shape" without knowing or caring exactly which class gets instantiated. Observer lets objects (subscribers) automatically get notified whenever another object (the subject) changes state — the foundation of event systems and reactive UIs.',
          hinglish:
            'Design patterns proven, reusable solutions hain un problems ke liye jo OOP design mein baar-baar aati hain. Singleton ensure karta hai ki ek class ka sirf EK instance ho, globally accessible (jaise ek single database connection ya configuration object). Factory object creation ki complexity ko ek method ke peeche chhupa deta hai, isliye calling code "ek shape" maangta hai bina jaane ya parwah kiye ki exactly kaunsi class instantiate hui. Observer objects (subscribers) ko automatically notify hone deta hai jab bhi doosra object (subject) apni state badle — event systems aur reactive UIs ka foundation.',
        },
        dailyLifeExample:
          'Singleton ek school ka principal jaisa hai — sirf ek hota hai, sab uski taraf refer karte hain. Factory ek restaurant ka waiter hai — tum bologe "ek dessert do", waiter decide karta hai kaunsa banana hai (gulab jamun ya ice cream), tumhe kitchen ki details nahi jaanni. Observer YouTube subscription jaisa hai — channel (subject) naya video daale to sab subscribers (observers) ko notification milta hai.',
        codeExample:
          "// Singleton — only one instance ever exists\nclass Database {\n  static #instance;\n  static getInstance() {\n    if (!Database.#instance) Database.#instance = new Database();\n    return Database.#instance;\n  }\n}\nDatabase.getInstance() === Database.getInstance(); // true, same object\n\n// Factory — hides which exact class gets created\nclass Circle { constructor() { this.type = 'circle'; } }\nclass Square { constructor() { this.type = 'square'; } }\nfunction shapeFactory(type) {\n  if (type === 'circle') return new Circle();\n  if (type === 'square') return new Square();\n}\nconst shape = shapeFactory('circle'); // caller doesn't need to know the class\n\n// Observer — subscribers get notified automatically\nclass EventBus {\n  #listeners = [];\n  subscribe(fn) { this.#listeners.push(fn); }\n  emit(data) { this.#listeners.forEach(fn => fn(data)); }\n}\nconst bus = new EventBus();\nbus.subscribe(data => console.log('Got:', data));\nbus.emit('new video uploaded!');",
        keyPoints: [
          'Singleton: guarantees only ONE instance of a class exists, globally accessible',
          'Factory: hides object-creation logic behind a method, decoupling callers from exact classes',
          'Observer: subscribers automatically react when a subject changes — the basis of events',
          'Patterns are proven solutions, not strict rules — apply them only when they genuinely fit',
          'Real frameworks use these constantly: DOM events (Observer), React.createElement (Factory-like)',
        ],
        quiz: [
          {
            question: 'What problem does the Singleton pattern solve?',
            options: ['Making code run faster', 'Guaranteeing only one instance of a class exists, accessible globally', 'Hiding all class methods', 'Creating unlimited objects'],
            correctIndex: 1,
          },
          {
            question: 'What does the Factory pattern hide from the calling code?',
            options: ['The return value', 'The exact class/logic used to create an object — the caller just asks for what it needs', 'All method names', 'The entire program'],
            correctIndex: 1,
          },
          {
            question: 'The Observer pattern is the foundation of…',
            options: ['Sorting algorithms', 'Event systems and reactive updates (subscribers notified on change)', 'Database indexing', 'File compression'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What are the four pillars of OOP?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Encapsulation (bundling data with methods and hiding internal state behind a controlled interface), Abstraction (exposing only essential features and hiding implementation details), Inheritance (a subclass acquiring properties/behaviour of a superclass for reuse), and Polymorphism (one interface taking many forms, so the same call behaves differently per object). Together they make code modular, reusable, and maintainable.',
      hinglish:
        'Encapsulation (data ko methods ke saath bundle karna aur internal state ko controlled interface ke peeche chhupana), Abstraction (sirf essential features dikhana, implementation chhupana), Inheritance (subclass ka superclass ke properties/behaviour lena reuse ke liye), aur Polymorphism (ek interface ke many forms, same call har object pe alag). Milke ye code ko modular, reusable, aur maintainable banate hain.',
    },
  },
  {
    question: 'What is method overloading vs method overriding?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Overloading means multiple methods with the same name but different parameters in the same class (resolved at compile time, "compile-time polymorphism" — supported in Java/C++, not natively in JS). Overriding means a subclass provides its own implementation of a method inherited from a parent, with the same signature (resolved at runtime, "runtime polymorphism"). Overloading varies the parameters; overriding varies the behaviour across the class hierarchy.',
      hinglish:
        'Overloading matlab same class mein same naam ke kai methods par alag parameters (compile time pe resolve, "compile-time polymorphism" — Java/C++ mein supported, JS mein natively nahi). Overriding matlab subclass parent se inherited method ka apna implementation deta hai, same signature ke saath (runtime pe resolve, "runtime polymorphism"). Overloading parameters badalta hai; overriding class hierarchy mein behaviour badalta hai.',
    },
  },

  // ─── Core Concepts ───────────────────────────────────────────
  {
    question: 'What is encapsulation and why does it matter?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Encapsulation keeps an object\'s internal state private and exposes controlled access through methods. It matters for three practical reasons: you can VALIDATE changes (a setter rejects a negative balance), you can CHANGE the internal representation without breaking callers, and you drastically reduce the surface area where bugs can originate — if a field can only be modified through one method, there is exactly one place to look when it holds a wrong value.',
      hinglish:
        'Encapsulation ek object ki internal state ko private rakhta hai aur methods ke through controlled access deta hai. Ye teen practical wajahon se matter karta hai: tum changes VALIDATE kar sakte ho (ek setter negative balance reject karta hai), tum callers ko toda bina internal representation BADAL sakte ho, aur tum us surface area ko drastically kam karte ho jahan bugs paida ho sakte hain — agar ek field sirf ek method se modify ho sakti hai, uske galat value rakhne pe dekhne ke liye exactly ek jagah hai.',
    },
  },
  {
    question: 'What is the difference between abstraction and encapsulation?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'They are often confused because both involve hiding. ABSTRACTION is about DESIGN — deciding what to expose conceptually, so a caller sees "car.drive()" without knowing about fuel injection. ENCAPSULATION is about IMPLEMENTATION — the mechanism (private fields, accessors) that actually enforces that hiding. Put simply: abstraction hides COMPLEXITY at the design level; encapsulation hides DATA at the code level. Abstraction is achieved through interfaces and abstract classes; encapsulation through access modifiers.',
      hinglish:
        'Ye aksar confuse hote hain kyunki dono mein chhupana shamil hai. ABSTRACTION DESIGN ke baare mein hai — ye decide karna ki conceptually kya expose karna hai, taaki ek caller "car.drive()" dekhe bina fuel injection jaane. ENCAPSULATION IMPLEMENTATION ke baare mein hai — wo mechanism (private fields, accessors) jo actually us chhupane ko enforce karta hai. Simply: abstraction design level pe COMPLEXITY chhupata hai; encapsulation code level pe DATA chhupata hai. Abstraction interfaces aur abstract classes se achieve hota hai; encapsulation access modifiers se.',
    },
  },
  {
    question: 'What is the difference between a class and an object?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A CLASS is a blueprint or template defining what attributes and behaviours something will have — it is a definition and occupies no runtime data of its own (beyond static members). An OBJECT is a concrete INSTANCE created from that blueprint, with its own actual values in memory. One class produces many objects, each with independent state: the Car class defines that cars have a colour, while each Car object holds a specific colour.',
      hinglish:
        'Ek CLASS ek blueprint ya template hai jo define karta hai ki kisi cheez ke kaunse attributes aur behaviours honge — ye ek definition hai aur apna koi runtime data nahi rakhta (static members ke alawa). Ek OBJECT us blueprint se banaya ek concrete INSTANCE hai, memory mein apni actual values ke saath. Ek class bahut objects produce karti hai, har ek independent state ke saath: Car class define karti hai ki cars ka ek colour hota hai, jabki har Car object ek specific colour rakhta hai.',
    },
  },
  {
    question: 'What is a constructor and what types exist?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A constructor is a special method invoked automatically when an object is created, used to initialise its state. Types: a DEFAULT constructor takes no arguments (provided implicitly by many languages if you define none); a PARAMETERISED constructor accepts arguments to set initial values; and a COPY constructor builds a new object from an existing one. Constructors have no return type and are typically the only place where required invariants should be established.',
      hinglish:
        'Ek constructor ek special method hai jo ek object banne pe automatically invoke hota hai, uski state initialise karne ke liye. Types: ek DEFAULT constructor koi arguments nahi leta (bahut languages implicitly deti hain agar tum koi define na karo); ek PARAMETERISED constructor initial values set karne ke liye arguments accept karta hai; aur ek COPY constructor ek existing object se ek naya banata hai. Constructors ka koi return type nahi hota aur typically yahi ek jagah hai jahan required invariants establish hone chahiye.',
    },
  },
  {
    question: 'What is the difference between a class and an interface?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A CLASS can hold state (fields) and provide full implementations, and a class may inherit from only one parent in most languages. An INTERFACE defines a CONTRACT — the methods a type must provide — traditionally with no state and no implementation, and a class can implement MANY interfaces. The practical distinction: extend a class to share implementation and model "is-a"; implement an interface to declare a capability ("can-be-serialised") independently of the inheritance hierarchy.',
      hinglish:
        'Ek CLASS state (fields) rakh sakti hai aur full implementations de sakti hai, aur zyadatar languages mein ek class sirf ek parent se inherit kar sakti hai. Ek INTERFACE ek CONTRACT define karta hai — wo methods jo ek type ko dene hi hain — traditionally bina state aur bina implementation ke, aur ek class BAHUT interfaces implement kar sakti hai. Practical distinction: implementation share karne aur "is-a" model karne ke liye ek class extend karo; inheritance hierarchy se independently ek capability ("serialise ho sakta hai") declare karne ke liye ek interface implement karo.',
    },
  },
  {
    question: 'What is an abstract class and when do you use one over an interface?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An abstract class cannot be instantiated and may contain both abstract methods (no body, subclasses must implement) and concrete methods with shared implementation, plus state. Use an ABSTRACT CLASS when subclasses genuinely share common code and state, and form a real "is-a" hierarchy. Use an INTERFACE when unrelated types need to share a capability, or when you need multiple inheritance of behaviour. Modern languages blur this with default interface methods, but the state and single-inheritance distinction remains.',
      hinglish:
        'Ek abstract class instantiate nahi ho sakti aur usme abstract methods (koi body nahi, subclasses ko implement karna padta hai) aur shared implementation wale concrete methods dono ho sakte hain, plus state. ABSTRACT CLASS tab use karo jab subclasses genuinely common code aur state share karein, aur ek real "is-a" hierarchy banayein. INTERFACE tab use karo jab unrelated types ko ek capability share karni ho, ya jab tumhe behaviour ka multiple inheritance chahiye. Modern languages default interface methods se ise dhundhla karti hain, par state aur single-inheritance ka distinction rehta hai.',
    },
  },
  {
    question: 'What is polymorphism and what are its types?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Polymorphism means one interface serving many underlying types. COMPILE-TIME (static) polymorphism is method OVERLOADING — the correct method is chosen by the compiler from the argument signature. RUNTIME (dynamic) polymorphism is method OVERRIDING — the actual method executed is decided at runtime from the object\'s real type, which is what lets `Shape s = new Circle(); s.draw();` call Circle\'s implementation. Runtime polymorphism is what makes extensible, open-closed design possible.',
      hinglish:
        'Polymorphism matlab ek interface bahut underlying types ko serve karta hai. COMPILE-TIME (static) polymorphism method OVERLOADING hai — sahi method compiler argument signature se chunta hai. RUNTIME (dynamic) polymorphism method OVERRIDING hai — actually execute hone wala method runtime pe object ke real type se decide hota hai, jo `Shape s = new Circle(); s.draw();` ko Circle ka implementation call karne deta hai. Runtime polymorphism hi extensible, open-closed design possible banata hai.',
    },
  },
  {
    question: 'What is method overriding and what rules apply?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Overriding is a subclass providing its own implementation of a method already defined in its parent, with the SAME signature. Rules: the signature must match exactly, the return type must be the same or a subtype (covariant), access cannot be more restrictive than the parent\'s, and typically you cannot override final/static/private methods. Overriding is what enables runtime polymorphism — and calling `super.method()` lets you extend rather than entirely replace the parent behaviour.',
      hinglish:
        'Overriding matlab ek subclass apne parent mein already define kiye ek method ka apna implementation deta hai, WAHI signature ke saath. Rules: signature exactly match karna chahiye, return type same ya ek subtype hona chahiye (covariant), access parent se zyada restrictive nahi ho sakta, aur typically tum final/static/private methods override nahi kar sakte. Overriding hi runtime polymorphism enable karta hai — aur `super.method()` call karna tumhe parent behaviour ko poori tarah replace karne ke bajaye extend karne deta hai.',
    },
  },
  {
    question: 'What is composition and why is it often preferred over inheritance?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Composition builds behaviour by CONTAINING other objects ("has-a") rather than inheriting from them ("is-a"). It is usually preferred because inheritance creates tight coupling: a subclass depends on its parent\'s internals, so a parent change can silently break every descendant (the fragile base class problem), and deep hierarchies become rigid. Composition swaps components at runtime, avoids the diamond problem, and is far easier to test in isolation. Hence the maxim "favour composition over inheritance".',
      hinglish:
        'Composition doosre objects ko RAKHKAR ("has-a") behaviour banata hai, unse inherit karke ("is-a") nahi. Ye usually preferred hai kyunki inheritance tight coupling banata hai: ek subclass apne parent ke internals pe depend karta hai, isliye ek parent change silently har descendant ko tod sakta hai (fragile base class problem), aur deep hierarchies rigid ho jaati hain. Composition runtime pe components swap karta hai, diamond problem avoid karta hai, aur isolation mein test karna bahut easier hai. Isiliye maxim hai "inheritance pe composition ko favour karo".',
    },
  },
  {
    question: 'What is the diamond problem?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The diamond problem arises with multiple inheritance: if B and C both inherit from A and override the same method, and D inherits from both B and C, it is ambiguous which version D should use. Languages solve it differently — C++ requires virtual inheritance and explicit disambiguation, Java forbids multiple class inheritance entirely (allowing only interfaces, and requiring you to resolve conflicting default methods manually), and Python uses a defined Method Resolution Order (C3 linearisation).',
      hinglish:
        'Diamond problem multiple inheritance se aati hai: agar B aur C dono A se inherit karein aur wahi method override karein, aur D dono B aur C se inherit kare, to ambiguous hai ki D ko kaunsa version use karna chahiye. Languages ise alag tarah solve karti hain — C++ ko virtual inheritance aur explicit disambiguation chahiye, Java multiple class inheritance poori tarah forbid karta hai (sirf interfaces allow karte hue, aur conflicting default methods manually resolve karwate hue), aur Python ek defined Method Resolution Order (C3 linearisation) use karta hai.',
    },
  },
  {
    question: 'What are access modifiers and what does each mean?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'PUBLIC members are accessible from anywhere — this is your deliberate API surface. PRIVATE members are accessible only within the declaring class, which is the default you should reach for. PROTECTED members are accessible within the class and its subclasses, intended for extension points. Package/internal (default in Java, internal in C#) restricts access to the same package or assembly. The guiding principle is least privilege: start private and widen only when a genuine need appears.',
      hinglish:
        'PUBLIC members kahin se bhi accessible hain — ye tumhara deliberate API surface hai. PRIVATE members sirf declaring class ke andar accessible hain, jo wo default hai jise tumhe pehle uthana chahiye. PROTECTED members class aur uski subclasses ke andar accessible hain, extension points ke liye. Package/internal (Java mein default, C# mein internal) access ko same package ya assembly tak restrict karta hai. Guiding principle least privilege hai: private se shuru karo aur sirf tab chauda karo jab ek genuine zaroorat dikhe.',
    },
  },
  {
    question: 'What is the difference between static and instance members?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'STATIC members belong to the CLASS itself — one copy shared by all instances, accessible without creating an object, and unable to reference instance state (there is no `this`). INSTANCE members belong to each OBJECT, with independent values per instance. Use static for genuinely shared data (a counter of created objects), constants, and pure utility functions. Overusing static is a common design smell: it makes code hard to test and effectively becomes global mutable state.',
      hinglish:
        'STATIC members CLASS ke khud ke hain — saare instances se shared ek copy, ek object banaye bina accessible, aur instance state reference karne mein asamarth (koi `this` nahi hai). INSTANCE members har OBJECT ke hain, per instance independent values ke saath. Static ko genuinely shared data (banaye gaye objects ka ek counter), constants, aur pure utility functions ke liye use karo. Static ko overuse karna ek common design smell hai: ye code ko test karna mushkil banata hai aur effectively global mutable state ban jaata hai.',
    },
  },
  {
    question: 'What is the SOLID acronym?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'S — SINGLE RESPONSIBILITY: a class should have one reason to change. O — OPEN/CLOSED: open for extension, closed for modification; add behaviour without editing existing code. L — LISKOV SUBSTITUTION: a subtype must be usable anywhere its base type is, without surprising the caller. I — INTERFACE SEGREGATION: many small focused interfaces beat one fat one, so implementers are not forced to stub methods they do not need. D — DEPENDENCY INVERSION: depend on abstractions, not concrete implementations.',
      hinglish:
        'S — SINGLE RESPONSIBILITY: ek class ke badalne ki ek wajah honi chahiye. O — OPEN/CLOSED: extension ke liye khula, modification ke liye band; existing code edit kiye bina behaviour add karo. L — LISKOV SUBSTITUTION: ek subtype wahan har jagah usable hona chahiye jahan uska base type hai, caller ko surprise kiye bina. I — INTERFACE SEGREGATION: bahut chhote focused interfaces ek mote se better hain, taaki implementers ko wo methods stub na karne pade jo unhe nahi chahiye. D — DEPENDENCY INVERSION: abstractions pe depend karo, concrete implementations pe nahi.',
    },
  },
  {
    question: 'Explain the Single Responsibility Principle with an example.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A class should have exactly one reason to change. Consider a User class that validates input, saves to the database, AND sends a welcome email — it now changes when validation rules change, when the database changes, and when the email provider changes, so three unrelated concerns are coupled together. Splitting into UserValidator, UserRepository, and EmailService means each has one clear purpose, can be tested independently, and a change to one cannot break the others.',
      hinglish:
        'Ek class ke badalne ki exactly ek wajah honi chahiye. Ek User class socho jo input validate karti hai, database mein save karti hai, AUR ek welcome email bhejti hai — ye ab tab badalti hai jab validation rules badlein, jab database badle, aur jab email provider badle, isliye teen unrelated concerns saath couple ho gaye. UserValidator, UserRepository, aur EmailService mein split karne ka matlab har ek ka ek clear purpose hai, independently test ho sakta hai, aur ek mein change doosre ko nahi tod sakta.',
    },
  },
  {
    question: 'What is the Liskov Substitution Principle and how is it commonly violated?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'LSP says any subtype must be substitutable for its base type without breaking correctness. The classic violation is Square extending Rectangle: mathematically a square IS a rectangle, but setting width on a Square must also change height, which breaks code written against Rectangle that assumes they are independent. Other violations: a subclass that throws on a method the parent supports, or tightens preconditions. The lesson is that "is-a" in English does not guarantee substitutability in behaviour.',
      hinglish:
        'LSP kehta hai ki koi bhi subtype apne base type ke liye substitutable hona chahiye bina correctness tode. Classic violation Square ka Rectangle extend karna hai: mathematically ek square ek rectangle HAI, par ek Square pe width set karna height bhi badalni padti hai, jo Rectangle ke against likhe us code ko todta hai jo maanta hai ki wo independent hain. Doosre violations: ek subclass jo ek aise method pe throw kare jo parent support karta hai, ya preconditions tighten kare. Sabak ye hai ki English mein "is-a" behaviour mein substitutability guarantee nahi karta.',
    },
  },
  {
    question: 'What is dependency injection?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Dependency injection means an object RECEIVES its dependencies from outside rather than constructing them itself. Instead of `this.db = new MySQLDatabase()` inside a service, you pass a database into the constructor. This inverts control: the class now depends on an abstraction it is handed, so you can substitute a mock in tests, swap implementations without editing the class, and see all dependencies explicitly in the signature. It is the practical mechanism for the Dependency Inversion Principle.',
      hinglish:
        'Dependency injection matlab ek object apni dependencies bahar se LETA hai, unhe khud banane ke bajaye. Ek service ke andar `this.db = new MySQLDatabase()` ke bajaye, tum ek database constructor mein pass karte ho. Ye control ulta deta hai: class ab ek aisi abstraction pe depend karti hai jo use di gayi hai, isliye tum tests mein ek mock substitute kar sakte ho, class edit kiye bina implementations swap kar sakte ho, aur saari dependencies signature mein explicitly dekh sakte ho. Ye Dependency Inversion Principle ka practical mechanism hai.',
    },
  },
  {
    question: 'What is coupling and cohesion?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'COUPLING measures how much modules depend on each other; COHESION measures how focused a single module is. The goal is LOW coupling and HIGH cohesion. Low coupling means a change in one module rarely forces changes elsewhere, and modules can be tested and reused independently. High cohesion means everything in a class genuinely belongs together, serving one purpose. A "utils" class holding twenty unrelated functions has low cohesion; a class reaching into another\'s internals has high coupling.',
      hinglish:
        'COUPLING measure karta hai ki modules ek doosre pe kitna depend karte hain; COHESION measure karta hai ki ek single module kitna focused hai. Goal LOW coupling aur HIGH cohesion hai. Low coupling matlab ek module mein change rarely kahin aur changes force karta hai, aur modules independently test aur reuse ho sakte hain. High cohesion matlab ek class mein sab kuch genuinely saath belong karta hai, ek purpose serve karte hue. Bees unrelated functions rakhne wali ek "utils" class ki cohesion low hai; doosre ke internals mein ghusne wali ek class ka coupling high hai.',
    },
  },
  {
    question: 'What is a design pattern and what are the main categories?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A design pattern is a named, reusable solution to a commonly recurring design problem — not code to copy, but a template and a shared vocabulary. The three classic categories: CREATIONAL patterns deal with object construction (Singleton, Factory, Builder); STRUCTURAL patterns compose objects into larger structures (Adapter, Decorator, Facade, Proxy); BEHAVIOURAL patterns handle communication and responsibility between objects (Observer, Strategy, Command, Iterator).',
      hinglish:
        'Ek design pattern ek commonly recurring design problem ka ek named, reusable solution hai — copy karne ke liye code nahi, balki ek template aur ek shared vocabulary. Teen classic categories: CREATIONAL patterns object construction se deal karte hain (Singleton, Factory, Builder); STRUCTURAL patterns objects ko bade structures mein compose karte hain (Adapter, Decorator, Facade, Proxy); BEHAVIOURAL patterns objects ke beech communication aur responsibility handle karte hain (Observer, Strategy, Command, Iterator).',
    },
  },
  {
    question: 'What is the Singleton pattern and why is it controversial?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Singleton ensures a class has exactly one instance with a global access point — used for configuration, logging, or a connection pool. It is controversial because it is effectively GLOBAL MUTABLE STATE: it hides dependencies (a class using it does not declare it in its constructor), makes unit testing painful since state persists between tests, complicates concurrency, and violates the Single Responsibility Principle by also managing its own lifecycle. Dependency injection usually achieves the same goal without these downsides.',
      hinglish:
        'Singleton ensure karta hai ki ek class ka exactly ek instance ho ek global access point ke saath — configuration, logging, ya ek connection pool ke liye use hota hai. Ye controversial hai kyunki ye effectively GLOBAL MUTABLE STATE hai: ye dependencies chhupata hai (ise use karti ek class ise apne constructor mein declare nahi karti), unit testing painful banata hai kyunki state tests ke beech bachi rehti hai, concurrency complicate karta hai, aur apna lifecycle bhi manage karke Single Responsibility Principle violate karta hai. Dependency injection usually wahi goal in downsides ke bina achieve karta hai.',
    },
  },
  {
    question: 'What is the Factory pattern?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The Factory pattern moves object creation into a dedicated method or class, so calling code asks for what it needs without knowing which concrete class it gets. Instead of scattering `new PayPalGateway()` across your codebase, a PaymentFactory decides based on configuration. Benefits: adding a new payment type touches one file rather than many, creation logic is centralised and testable, and callers depend on the interface rather than a concrete implementation.',
      hinglish:
        'Factory pattern object creation ko ek dedicated method ya class mein le jaata hai, taaki calling code jo chahiye wo maange bina jaane ki use kaunsi concrete class milegi. Apne codebase mein `new PayPalGateway()` bikherne ke bajaye, ek PaymentFactory configuration ke basis pe decide karta hai. Benefits: ek naya payment type add karna bahut ke bajaye ek file ko touch karta hai, creation logic centralised aur testable hai, aur callers ek concrete implementation ke bajaye interface pe depend karte hain.',
    },
  },
  {
    question: 'What is the Observer pattern?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Observer defines a one-to-many dependency: when one object (the subject) changes state, all registered observers are notified automatically. The subject knows only that observers implement a notify interface, not who they are, which keeps them decoupled and lets observers be added or removed at runtime. It is everywhere in practice — DOM event listeners, React state subscriptions, pub/sub messaging, and MVC views reacting to a model.',
      hinglish:
        'Observer ek one-to-many dependency define karta hai: jab ek object (subject) state badalta hai, saare registered observers automatically notify hote hain. Subject sirf ye jaanta hai ki observers ek notify interface implement karte hain, ye nahi ki wo kaun hain, jo unhe decoupled rakhta hai aur observers ko runtime pe add ya remove hone deta hai. Ye practically har jagah hai — DOM event listeners, React state subscriptions, pub/sub messaging, aur ek model pe react karti MVC views.',
    },
  },
  {
    question: 'What is the Strategy pattern?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Strategy encapsulates each of a family of interchangeable algorithms behind a common interface, letting you select one at runtime. Rather than a long if/else chain choosing a sorting or pricing algorithm, each becomes its own class and the context holds a reference to whichever is active. Benefits: adding a new algorithm requires no change to existing code (open/closed), each strategy is independently testable, and the conditional complexity disappears from the caller.',
      hinglish:
        'Strategy interchangeable algorithms ke ek family mein se har ek ko ek common interface ke peeche encapsulate karta hai, tumhe runtime pe ek select karne dete hue. Ek sorting ya pricing algorithm chunne wali ek lambi if/else chain ke bajaye, har ek apni class ban jaata hai aur context jo active hai uska reference rakhta hai. Benefits: ek naya algorithm add karne ke liye existing code mein koi change nahi chahiye (open/closed), har strategy independently testable hai, aur conditional complexity caller se gayab ho jaati hai.',
    },
  },
  {
    question: 'What is the difference between aggregation and composition?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Both model "has-a", but differ in LIFECYCLE ownership. COMPOSITION is a strong relationship where the part cannot exist without the whole — deleting a House deletes its Rooms. AGGREGATION is weaker: the parts exist independently, so deleting a Department does not delete its Employees, who may join another department. In UML composition is a filled diamond and aggregation a hollow one. The practical question to ask is: if I destroy the container, should the contents be destroyed too?',
      hinglish:
        'Dono "has-a" model karte hain, par LIFECYCLE ownership mein differ karte hain. COMPOSITION ek strong relationship hai jahan part poore ke bina exist nahi kar sakta — ek House delete karna uske Rooms delete karta hai. AGGREGATION weaker hai: parts independently exist karte hain, isliye ek Department delete karna uske Employees delete nahi karta, jo doosre department mein ja sakte hain. UML mein composition ek bhara hua diamond hai aur aggregation ek khokhla. Poochne wala practical sawaal ye hai: agar main container destroy karoon, kya contents bhi destroy hone chahiye?',
    },
  },
  {
    question: 'What is a virtual function / virtual method?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A virtual method is one whose implementation is resolved at RUNTIME based on the object\'s actual type, rather than the reference type known at compile time. This is the mechanism behind runtime polymorphism. In C++ you must mark methods `virtual` explicitly (non-virtual calls are bound statically), whereas in Java all non-static, non-final methods are virtual by default. Internally it is typically implemented with a vtable — a per-class table of function pointers each object references.',
      hinglish:
        'Ek virtual method wo hai jiska implementation compile time pe pata reference type ke bajaye object ke actual type ke basis pe RUNTIME pe resolve hota hai. Yahi runtime polymorphism ke peeche mechanism hai. C++ mein tumhe methods ko explicitly `virtual` mark karna padta hai (non-virtual calls statically bind hote hain), jabki Java mein saare non-static, non-final methods default se virtual hain. Internally ye typically ek vtable se implement hota hai — function pointers ki ek per-class table jise har object reference karta hai.',
    },
  },
  {
    question: 'What is the difference between shallow copy and deep copy?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A SHALLOW copy duplicates the object but copies REFERENCES for any nested objects, so the original and the copy share those inner objects — mutating a nested field through one is visible through the other, which is a classic source of surprising bugs. A DEEP copy recursively duplicates everything, producing a fully independent object. Deep copying is safer but more expensive, and must handle circular references. Many languages give you shallow copying by default, which is worth remembering.',
      hinglish:
        'Ek SHALLOW copy object duplicate karti hai par kisi bhi nested objects ke liye REFERENCES copy karti hai, isliye original aur copy wo inner objects share karte hain — ek ke through ek nested field mutate karna doosre se dikhta hai, jo surprising bugs ka ek classic source hai. Ek DEEP copy recursively sab kuch duplicate karti hai, ek fully independent object produce karte hue. Deep copying safer par zyada mehngi hai, aur ise circular references handle karne padte hain. Bahut languages default se shallow copying deti hain, jo yaad rakhne layak hai.',
    },
  },
  {
    question: 'What is an immutable object and why is immutability useful?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An immutable object cannot change after construction — any "modification" returns a new instance. Benefits: it is inherently THREAD-SAFE (no synchronisation needed since nothing can change under you), it can be freely cached and shared, it makes a safe hash-map key, and it eliminates a whole class of bugs where distant code mutates an object you were relying on. The cost is allocation churn when many derived versions are created, which is usually a worthwhile trade.',
      hinglish:
        'Ek immutable object construction ke baad badal nahi sakta — koi bhi "modification" ek naya instance return karta hai. Benefits: ye inherently THREAD-SAFE hai (koi synchronisation nahi chahiye kyunki tumhare neeche kuch badal nahi sakta), ise freely cache aur share kiya ja sakta hai, ye ek safe hash-map key banta hai, aur ye bugs ki ek poori class khatam karta hai jahan door ka code us object ko mutate karta hai jispe tum rely kar rahe the. Cost allocation churn hai jab bahut derived versions bante hain, jo usually ek worthwhile trade hai.',
    },
  },
  {
    question: 'What is the difference between an interface and duck typing?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'An INTERFACE is explicit and checked: a type formally declares it implements a contract, and the compiler enforces it before the program runs. DUCK TYPING (Python, JavaScript, Ruby) is implicit: "if it walks like a duck and quacks like a duck", any object with the right methods is acceptable, checked only when the method is actually called at runtime. Interfaces give compile-time safety and self-documenting contracts; duck typing gives flexibility and less ceremony, at the cost of errors surfacing later.',
      hinglish:
        'Ek INTERFACE explicit aur checked hai: ek type formally declare karta hai ki wo ek contract implement karta hai, aur compiler program chalne se pehle use enforce karta hai. DUCK TYPING (Python, JavaScript, Ruby) implicit hai: "agar ye duck ki tarah chalta hai aur duck ki tarah quack karta hai", sahi methods wala koi bhi object acceptable hai, sirf tab check hota hai jab method actually runtime pe call ho. Interfaces compile-time safety aur self-documenting contracts dete hain; duck typing flexibility aur kam ceremony deta hai, errors ke baad mein surface hone ke cost pe.',
    },
  },
  {
    question: 'What is the difference between an abstract method and a concrete method?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'An ABSTRACT method declares only a signature with no body — it defines WHAT subclasses must provide, and any concrete subclass is required to implement it. A CONCRETE method has a full implementation that subclasses inherit and may optionally override. A class containing any abstract method must itself be abstract and cannot be instantiated. Abstract methods are how a base class enforces a contract while still sharing common concrete behaviour.',
      hinglish:
        'Ek ABSTRACT method sirf ek signature declare karta hai bina body ke — ye define karta hai ki subclasses ko KYA dena hai, aur kisi bhi concrete subclass ko use implement karna zaroori hai. Ek CONCRETE method ka ek full implementation hota hai jo subclasses inherit karte hain aur optionally override kar sakte hain. Koi bhi abstract method rakhne wali class khud abstract honi chahiye aur instantiate nahi ho sakti. Abstract methods wo tareeka hain jisse ek base class ek contract enforce karti hai jabki common concrete behaviour bhi share karti hai.',
    },
  },
  {
    question: 'What is the "is-a" vs "has-a" relationship?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'IS-A denotes inheritance: a Dog IS-A Animal, so Dog extends Animal and can be used wherever an Animal is expected. HAS-A denotes composition: a Car HAS-A Engine, so Car holds an Engine as a field. Choosing correctly matters enormously — modelling "Car is-a Engine" is nonsense, and the common mistake is using inheritance purely to reuse code when no genuine is-a relationship exists. Test it with the sentence: if "X is a Y" sounds wrong in English, do not inherit.',
      hinglish:
        'IS-A inheritance denote karta hai: ek Dog IS-A Animal, isliye Dog, Animal extend karta hai aur wahan use ho sakta hai jahan ek Animal expected hai. HAS-A composition denote karta hai: ek Car HAS-A Engine, isliye Car ek Engine ko ek field ke roop mein rakhti hai. Sahi choose karna enormously matter karta hai — "Car is-a Engine" model karna bakwas hai, aur common mistake purely code reuse karne ke liye inheritance use karna hai jab koi genuine is-a relationship exist na kare. Ise is sentence se test karo: agar "X is a Y" English mein galat lage, to inherit mat karo.',
    },
  },
  {
    question: 'What is method chaining / a fluent interface?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Method chaining has each method return the object itself (`this`), so calls can be strung together: `query.select("name").where("age > 18").orderBy("name").limit(10)`. It produces readable, declarative code that reads close to natural language, and is the basis of the Builder pattern and most query builders. Downsides: debugging a long chain is harder since a failure could be anywhere in it, and it does not compose well with methods that genuinely need to return a value.',
      hinglish:
        'Method chaining mein har method object khud (`this`) return karta hai, taaki calls jodi ja sakein: `query.select("name").where("age > 18").orderBy("name").limit(10)`. Ye readable, declarative code produce karta hai jo natural language ke paas padha jaata hai, aur Builder pattern aur zyadatar query builders ka base hai. Downsides: ek lambi chain debug karna mushkil hai kyunki failure usme kahin bhi ho sakta hai, aur ye un methods ke saath achhe se compose nahi hota jinhe genuinely ek value return karni ho.',
    },
  },
  {
    question: 'How does OOP differ from functional programming?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'OOP organises code around OBJECTS bundling state with behaviour, and typically embraces mutation of that state. Functional programming organises around pure FUNCTIONS and immutable data, avoiding side effects so the same input always gives the same output. OOP models entities well and is natural for domain modelling and UI components; FP excels at data transformation pipelines and concurrency, since immutability removes shared-state hazards. Modern languages are multi-paradigm, and good code often uses objects for structure and functional style for logic.',
      hinglish:
        'OOP code ko OBJECTS ke around organise karta hai jo state ko behaviour ke saath bundle karte hain, aur typically us state ke mutation ko apnaata hai. Functional programming pure FUNCTIONS aur immutable data ke around organise karta hai, side effects avoid karte hue taaki wahi input hamesha wahi output de. OOP entities achhe se model karta hai aur domain modelling aur UI components ke liye natural hai; FP data transformation pipelines aur concurrency pe excel karta hai, kyunki immutability shared-state hazards hataati hai. Modern languages multi-paradigm hain, aur achha code aksar structure ke liye objects aur logic ke liye functional style use karta hai.',
    },
  },
  {
    question: 'What is the "God object" anti-pattern?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A God object is a class that knows or does too much — thousands of lines handling unrelated responsibilities, referenced by everything. It violates Single Responsibility and produces terrible cohesion and coupling: every change risks unrelated breakage, it cannot be tested in isolation, and multiple developers constantly conflict in it. It usually grows accidentally, one "just add it here" at a time. The fix is to extract cohesive responsibilities into focused classes incrementally, guided by which reasons-to-change cluster together.',
      hinglish:
        'Ek God object ek aisi class hai jo bahut zyada jaanti ya karti hai — hazaron lines unrelated responsibilities handle karti hui, har cheez se referenced. Ye Single Responsibility violate karta hai aur bhayanak cohesion aur coupling produce karta hai: har change unrelated breakage ka risk leta hai, ise isolation mein test nahi kiya ja sakta, aur multiple developers usme constantly conflict karte hain. Ye usually accidentally badhta hai, ek baar mein ek "bas yahin add kar do". Fix ye hai ki cohesive responsibilities ko incrementally focused classes mein extract karo, is guidance se ki kaunse reasons-to-change saath cluster karte hain.',
    },
  },
  {
    question: 'What is the Open/Closed Principle?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Software entities should be open for EXTENSION but closed for MODIFICATION — you should be able to add new behaviour without editing existing, tested code. In practice this means designing against abstractions: rather than a growing switch statement over payment types that you edit for every new provider, define a PaymentMethod interface so a new provider is a new class implementing it. The benefit is that working code stays untouched, so new features cannot regress existing ones.',
      hinglish:
        'Software entities EXTENSION ke liye khuli aur MODIFICATION ke liye band honi chahiye — tumhe existing, tested code edit kiye bina naya behaviour add kar paana chahiye. Practically iska matlab abstractions ke against design karna hai: payment types pe ek badhta switch statement jise tum har naye provider ke liye edit karte ho, uske bajaye ek PaymentMethod interface define karo taaki ek naya provider use implement karti ek nayi class ho. Benefit ye hai ki working code untouched rehta hai, isliye naye features existing wale ko regress nahi kar sakte.',
    },
  },
  {
    question: 'What is the Interface Segregation Principle?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'No client should be forced to depend on methods it does not use — prefer several small, focused interfaces to one large general-purpose one. The classic symptom of violation is an implementer throwing NotImplementedException for half the interface: a fat Worker interface with work() and eat() forces a RobotWorker to stub eat(). Splitting into Workable and Feedable lets each implementer take only what genuinely applies, and callers depend on the narrowest contract they actually need.',
      hinglish:
        'Kisi client ko un methods pe depend karne pe majboor nahi karna chahiye jo wo use nahi karta — ek bade general-purpose interface ke bajaye kai chhote, focused interfaces prefer karo. Violation ka classic symptom ek implementer ka aadhe interface ke liye NotImplementedException throw karna hai: work() aur eat() wala ek mota Worker interface ek RobotWorker ko eat() stub karne pe majboor karta hai. Workable aur Feedable mein split karna har implementer ko sirf wo lene deta hai jo genuinely apply hota hai, aur callers us sabse narrow contract pe depend karte hain jo unhe actually chahiye.',
    },
  },
  {
    question: 'What is polymorphic behaviour in a real-world example?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Consider a payment system with a `PaymentMethod` interface defining `pay(amount)`. CreditCard, UPI, and Wallet each implement it differently. Your checkout code holds a `PaymentMethod` reference and simply calls `pay()` — it neither knows nor cares which concrete type it has. The payoff: adding NetBanking requires writing one new class and zero changes to checkout. Without polymorphism, checkout would need a conditional branch for every payment type, edited every time the business adds one.',
      hinglish:
        'Ek payment system socho ek `PaymentMethod` interface ke saath jo `pay(amount)` define karta hai. CreditCard, UPI, aur Wallet har ek ise alag implement karte hain. Tumhara checkout code ek `PaymentMethod` reference rakhta hai aur simply `pay()` call karta hai — use na pata hai na parwah ki uske paas kaunsa concrete type hai. Payoff: NetBanking add karne ke liye ek nayi class likhni padti hai aur checkout mein zero changes. Polymorphism ke bina, checkout ko har payment type ke liye ek conditional branch chahiye hoti, jo business ke har naya add karne pe edit hoti.',
    },
  },
  {
    question: 'What is the difference between association, aggregation, and composition?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'They form a spectrum of increasing ownership. ASSOCIATION is the loosest — two objects simply know about each other, with no ownership at all (a Teacher and a Student). AGGREGATION adds a whole-part relationship but the parts survive independently (a Department and its Employees). COMPOSITION is the strongest — the part cannot exist without the whole, and dies with it (a House and its Rooms). The practical question is lifecycle: does destroying one require destroying the other?',
      hinglish:
        'Ye badhti ownership ka ek spectrum banate hain. ASSOCIATION sabse loose hai — do objects simply ek doosre ke baare mein jaante hain, bilkul koi ownership nahi (ek Teacher aur ek Student). AGGREGATION ek whole-part relationship add karta hai par parts independently bache rehte hain (ek Department aur uske Employees). COMPOSITION sabse strong hai — part poore ke bina exist nahi kar sakta, aur uske saath marta hai (ek House aur uske Rooms). Practical sawaal lifecycle hai: kya ek ko destroy karne ke liye doosre ko destroy karna padta hai?',
    },
  },
  {
    question: 'Why is inheritance sometimes called "the strongest form of coupling"?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Because a subclass depends not merely on its parent\'s public interface, but on its INTERNAL behaviour — which methods call which others, and in what order. A parent can therefore break every subclass without changing its public signature at all, simply by refactoring internals; this is the fragile base class problem. The dependency is also permanent and compile-time, unlike composition where a collaborator can be swapped at runtime. This is the core argument for favouring composition.',
      hinglish:
        'Kyunki ek subclass sirf apne parent ke public interface pe nahi, balki uske INTERNAL behaviour pe depend karta hai — kaunse methods kaunse doosre call karte hain, aur kis order mein. Isliye ek parent apna public signature bilkul badle bina har subclass tod sakta hai, simply internals refactor karke; yahi fragile base class problem hai. Dependency permanent aur compile-time bhi hai, composition ke ulat jahan ek collaborator runtime pe swap ho sakta hai. Yahi composition ko favour karne ka core argument hai.',
    },
  },
  {
    question: 'What is a getter and setter, and is exposing them always good practice?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Getters and setters are accessor methods controlling read and write access to private fields, allowing validation, computed values, or logging on access. However, mechanically generating a public getter AND setter for every field defeats encapsulation entirely — the class becomes a glorified struct with extra ceremony, and callers can still put it into an invalid state. Better practice: expose only what callers genuinely need, prefer meaningful behaviour methods (`account.withdraw(x)`) over raw setters, and default to immutability where practical.',
      hinglish:
        'Getters aur setters accessor methods hain jo private fields ka read aur write access control karte hain, access pe validation, computed values, ya logging allow karte hue. Halaanki, har field ke liye mechanically ek public getter AUR setter generate karna encapsulation poori tarah defeat karta hai — class extra ceremony wala ek glorified struct ban jaati hai, aur callers use abhi bhi ek invalid state mein daal sakte hain. Better practice: sirf wo expose karo jo callers ko genuinely chahiye, raw setters ke bajaye meaningful behaviour methods (`account.withdraw(x)`) prefer karo, aur jahan practical ho wahan immutability default rakho.',
    },
  },
  {
    question: 'What is the Decorator pattern?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Decorator attaches new responsibilities to an object DYNAMICALLY by wrapping it in another object sharing the same interface. Because the wrapper implements the same interface, it can itself be wrapped, so behaviours compose: a plain Coffee wrapped in Milk wrapped in Sugar. The advantage over subclassing is avoiding a combinatorial explosion of classes (MilkSugarCoffee, MilkCaramelCoffee...) and allowing combinations to be chosen at runtime. Java streams and Express middleware both use this shape.',
      hinglish:
        'Decorator ek object mein DYNAMICALLY nayi responsibilities jodta hai use wahi interface share karte doosre object mein wrap karke. Kyunki wrapper wahi interface implement karta hai, wo khud wrap ho sakta hai, isliye behaviours compose hote hain: ek plain Coffee jo Milk mein wrapped hai jo Sugar mein wrapped hai. Subclassing pe advantage classes ka ek combinatorial explosion avoid karna hai (MilkSugarCoffee, MilkCaramelCoffee...) aur combinations ko runtime pe chunne dena. Java streams aur Express middleware dono yahi shape use karte hain.',
    },
  },
  {
    question: 'What is the difference between early binding and late binding?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'EARLY (static) binding resolves which method to call at COMPILE time, based on the declared type — this applies to overloaded methods, static methods, and non-virtual calls, and is faster since the target is fixed. LATE (dynamic) binding resolves at RUNTIME based on the object\'s actual type, which is what overridden virtual methods use. Late binding costs a small indirection through a vtable but is precisely what makes runtime polymorphism and extensible design possible.',
      hinglish:
        'EARLY (static) binding COMPILE time pe resolve karti hai ki kaunsa method call karna hai, declared type ke basis pe — ye overloaded methods, static methods, aur non-virtual calls pe apply hoti hai, aur faster hai kyunki target fixed hai. LATE (dynamic) binding RUNTIME pe object ke actual type ke basis pe resolve karti hai, jo overridden virtual methods use karte hain. Late binding ek vtable ke through ek chhoti indirection ka cost leti hai par exactly yahi runtime polymorphism aur extensible design possible banati hai.',
    },
  },
  {
    question: 'What is a pure virtual function / pure abstract class?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A pure virtual function is declared with no implementation at all, forcing every concrete subclass to provide one (in C++ written `= 0`; in Java simply an abstract method). A class containing one cannot be instantiated. A class where ALL methods are pure virtual and there is no state is effectively an INTERFACE — indeed, that is exactly how C++ expresses interfaces, since it has no separate interface keyword. It defines a contract with zero implementation shared.',
      hinglish:
        'Ek pure virtual function bilkul bina implementation ke declare hota hai, har concrete subclass ko ek dene pe majboor karte hue (C++ mein `= 0` likha jaata hai; Java mein simply ek abstract method). Ek aisi function rakhne wali class instantiate nahi ho sakti. Ek aisi class jahan SAARE methods pure virtual hon aur koi state na ho effectively ek INTERFACE hai — actually, C++ interfaces ko exactly aise hi express karta hai, kyunki uske paas koi separate interface keyword nahi. Ye zero implementation share karte hue ek contract define karta hai.',
    },
  },
  {
    question: 'What is the difference between an object and a struct/record?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A struct or record is primarily a DATA container — a grouping of fields, typically with value semantics (copied on assignment) and little or no behaviour. A full object bundles data WITH behaviour and typically has reference semantics and identity, so two objects with identical fields are still distinct. Practically: use a record for a plain data carrier such as a DTO or coordinate pair; use a class when the type has meaningful behaviour, invariants to enforce, or a lifecycle.',
      hinglish:
        'Ek struct ya record primarily ek DATA container hai — fields ka ek grouping, typically value semantics ke saath (assignment pe copy) aur thoda ya bilkul behaviour nahi. Ek full object data ko behaviour KE SAATH bundle karta hai aur typically reference semantics aur identity rakhta hai, isliye identical fields wale do objects abhi bhi distinct hain. Practically: ek plain data carrier jaise ek DTO ya coordinate pair ke liye ek record use karo; ek class tab use karo jab type ka meaningful behaviour, enforce karne layak invariants, ya ek lifecycle ho.',
    },
  },
  {
    question: 'How would you refactor a class that has grown too large?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Work by RESPONSIBILITY, not by line count. First identify the distinct reasons the class changes — validation, persistence, notification — since each is a candidate for extraction. Then extract cohesive groups of fields and the methods that use them into their own classes, which usually reveals that the fields naturally cluster. Introduce interfaces so the original class depends on abstractions, inject them rather than constructing them, and keep tests green at each small step rather than attempting one large rewrite.',
      hinglish:
        'RESPONSIBILITY se kaam karo, line count se nahi. Pehle wo distinct wajahein identify karo jinse class badalti hai — validation, persistence, notification — kyunki har ek extraction ka ek candidate hai. Phir fields ke cohesive groups aur unhe use karne wale methods ko unki apni classes mein extract karo, jo usually reveal karta hai ki fields naturally cluster karti hain. Interfaces introduce karo taaki original class abstractions pe depend kare, unhe banane ke bajaye inject karo, aur ek bade rewrite ki koshish ke bajaye har chhote step pe tests green rakho.',
    },
  },
  {
    question: 'What are the practical downsides of deep inheritance hierarchies?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Understanding a class requires reading every ancestor, since behaviour is scattered up the chain — you cannot see what a method does by looking at one file. Changes to a base class ripple unpredictably to all descendants. Overriding becomes confusing when several levels each modify the same method. Testing a leaf class drags in the entire chain. And the hierarchy calcifies: a new requirement that does not fit the existing tree forces either an awkward class or a painful restructure. Two or three levels is a reasonable practical ceiling.',
      hinglish:
        'Ek class samajhne ke liye har ancestor padhna padta hai, kyunki behaviour chain mein upar bikhra hai — tum ek file dekh kar nahi bata sakte ki ek method kya karta hai. Ek base class mein changes saare descendants tak unpredictably faila jaate hain. Overriding confusing ho jaati hai jab kai levels har ek wahi method modify karein. Ek leaf class test karna poori chain kheench laata hai. Aur hierarchy jam jaati hai: ek nayi requirement jo existing tree mein fit na ho ya ek awkward class ya ek painful restructure force karti hai. Do ya teen levels ek reasonable practical ceiling hai.',
    },
  },
  {
    question: 'What is an interface default method and what problem does it solve?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A default method provides an implementation directly in the interface, which implementers inherit unless they override it. It was added (Java 8) to solve a real evolution problem: adding a method to a widely-used interface would otherwise break every existing implementer at once. With a default, the interface can grow while old implementations keep compiling. The tradeoff is that interfaces now carry behaviour, blurring the line with abstract classes and reintroducing a form of the diamond problem for conflicting defaults.',
      hinglish:
        'Ek default method interface mein hi directly ek implementation deta hai, jise implementers inherit karte hain jab tak override na karein. Ise (Java 8) ek real evolution problem solve karne ke liye add kiya gaya: ek widely-used interface mein ek method add karna warna har existing implementer ko ek saath tod deta. Ek default ke saath, interface badh sakta hai jabki purani implementations compile hoti rehti hain. Tradeoff ye hai ki interfaces ab behaviour carry karte hain, abstract classes ke saath line dhundhli karte hue aur conflicting defaults ke liye diamond problem ka ek roop wapas laate hue.',
    },
  },
  {
    question: 'What is the difference between a mixin and inheritance?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'INHERITANCE expresses an "is-a" relationship and gives you one parent in most languages, forming a hierarchy. A MIXIN is a bundle of reusable behaviour designed to be mixed INTO unrelated classes without implying any hierarchy — a Serializable mixin adds serialisation to anything, whether it is a User or an Invoice. Mixins therefore allow horizontal reuse across a codebase, avoiding the artificial hierarchies people create purely to share code. Python, Ruby, and TypeScript all support the pattern.',
      hinglish:
        'INHERITANCE ek "is-a" relationship express karta hai aur zyadatar languages mein tumhe ek parent deta hai, ek hierarchy banate hue. Ek MIXIN reusable behaviour ka ek bundle hai jo unrelated classes MEIN mix hone ke liye design kiya gaya hai bina koi hierarchy imply kiye — ek Serializable mixin kisi bhi cheez mein serialisation add karta hai, chahe wo ek User ho ya ek Invoice. Isliye mixins ek codebase ke across horizontal reuse allow karte hain, un artificial hierarchies se bachate hue jo log purely code share karne ke liye banate hain. Python, Ruby, aur TypeScript sab is pattern ko support karte hain.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
