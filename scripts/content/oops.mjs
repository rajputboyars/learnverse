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
  icon: '🧱',
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
            frequency: 'very-common',
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
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What are the four pillars of OOP?',
    difficulty: 'easy',
    frequency: 'very-common',
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
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
