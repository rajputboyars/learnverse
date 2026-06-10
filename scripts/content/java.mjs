// Java curriculum — beginner -> intermediate -> advanced.
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
  title: 'Java',
  slug: 'java',
  description:
    'Enterprise ki favourite language — OOP, collections, exceptions aur JVM. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '☕',
  tags: ['java', 'oop', 'backend', 'programming'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 19,
};

const beginner = [
  {
    title: 'Getting Started with Java',
    level: 'beginner',
    description: 'Java ki kahani, JVM/JDK/JRE, aur pehla program.',
    concepts: [
      {
        title: 'The Story of Java — What, Why & How',
        difficulty: 'easy',
        tags: ['intro', 'story', 'jvm'],
        explanation: {
          english:
            'Imagine you wrote the perfect recipe for masala chai. ☕ You want it to taste the same whether someone cooks it on a gas stove in Delhi, an induction cooktop in Mumbai, or a wood fire in a village. The problem? Every kitchen is different. What if there was a magic translator that took your one recipe and adjusted it perfectly for each kitchen — same chai, every time?\n\nThat magic translator is the JVM (Java Virtual Machine), and this is the famous promise of Java: "Write Once, Run Anywhere". You write your program once, and it runs on Windows, Mac, Linux, Android phones, banking servers — anywhere — without changing a single line.\n\nWHAT is Java? Java is an object-oriented, compiled, platform-independent language that runs on the JVM. Object-oriented means you model your program as objects (a Student, a BankAccount, a Car) that bundle data and behaviour together. Compiled means your human-readable code is converted into a lower-level form before it runs. Platform-independent means that lower-level form is not tied to any one operating system.\n\nWHY do millions use it? It is portable (one program runs everywhere), strongly-typed (the compiler catches many mistakes before your code runs), and it is huge in enterprise systems — banks, insurance, e-commerce backends — and in Android app development. It has a mature ecosystem: decades of libraries, tools, and a giant community, so almost any problem you face has already been solved by someone.\n\nHOW does it actually work? You write your code in a file ending with .java. Then a tool called javac (the Java compiler) turns it into bytecode, saved in a .class file. Bytecode is not human code and not machine code — it is a special middle language that the JVM understands. Finally, the JVM on any machine reads that bytecode and runs it, translating it for that specific OS on the fly. .java ➜ javac ➜ .class (bytecode) ➜ JVM runs it. That is the whole magic in one line. 🚀',
          hinglish:
            'Socho tumne masala chai ki perfect recipe likhi. ☕ Tum chahte ho ki swaad same rahe — chahe koi Delhi mein gas stove pe banaye, Mumbai mein induction pe, ya gaon mein chulhe pe. Problem kya hai? Har kitchen alag hai. Agar koi magic translator ho jo tumhari ek recipe le aur har kitchen ke hisaab se perfectly adjust kar de — same chai, har baar — toh kitna mast ho!\n\nWahi magic translator hai JVM (Java Virtual Machine), aur yahi Java ka famous waada hai: "Write Once, Run Anywhere". Tum program ek baar likhte ho, aur ye Windows, Mac, Linux, Android phones, banking servers — kahin bhi — bina ek line badle chal jaata hai.\n\nWHAT yaani Java hai kya? Java ek object-oriented, compiled, platform-independent language hai jo JVM pe chalti hai. Object-oriented matlab tum program ko objects ki tarah sochte ho (ek Student, ek BankAccount, ek Car) jo data aur behaviour ko ek saath bundle karte hain. Compiled matlab tumhara readable code chalne se pehle ek lower-level form mein convert hota hai. Platform-independent matlab wo form kisi ek OS se bandha nahi hota.\n\nWHY yaani log isse kyun use karte hain? Kyunki ye portable hai (ek program har jagah chalta hai), strongly-typed hai (compiler kai galtiyan code chalne se pehle hi pakad leta hai), aur enterprise mein bahut bada hai — banks, insurance, e-commerce backends — aur Android app development mein bhi. Iska ecosystem mature hai: decades ki libraries, tools, aur ek विशाल community, toh almost har problem ka solution pehle se kisi ne bana rakha hai.\n\nHOW yaani ye kaam kaise karta hai? Tum apna code ek .java file mein likhte ho. Phir javac (Java compiler) usse bytecode mein badal deta hai jo ek .class file mein save hota hai. Bytecode na human code hai na machine code — ye ek special beech ki language hai jise JVM samajhta hai. Aakhir mein, kisi bhi machine ka JVM us bytecode ko padhta hai aur chalata hai, us OS ke hisaab se on-the-fly translate karte hue. .java ➜ javac ➜ .class (bytecode) ➜ JVM chalata hai. Bas yahi pura magic hai ek line mein. 🚀',
        },
        dailyLifeExample:
          'JVM ek universal power adapter jaisa hai. ⚡ Tumhara phone charger (program) ek hi hai, par har desh ka socket alag hai. Adapter beech mein aakar har socket ke saath fit kar deta hai — charger badalna nahi padta. Waise hi tumhara ek Java program har OS pe chalta hai kyunki JVM beech mein translate karta hai.',
        codeExample:
          '// File: Hello.java\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println("Namaste, Java!");\n    }\n}\n\n// How to run from terminal:\n// 1) javac Hello.java   -> creates Hello.class (bytecode)\n// 2) java Hello         -> JVM runs the bytecode\n// Output: Namaste, Java!',
        keyPoints: [
          '"Write Once, Run Anywhere" — same code runs on any OS via the JVM',
          'Java is object-oriented, compiled, and platform-independent',
          'Flow: .java ➜ javac compiles to bytecode (.class) ➜ JVM runs it',
          'Huge in enterprise backends and Android development',
          'Strongly-typed compiler catches many bugs before runtime',
        ],
        quiz: [
          {
            question: 'What does "Write Once, Run Anywhere" depend on?',
            options: ['The web browser', 'The JVM running bytecode', 'A fast internet connection', 'The C compiler'],
            correctIndex: 1,
          },
          {
            question: 'What does javac produce from a .java file?',
            options: ['Machine code directly', 'An .exe file', 'Bytecode in a .class file', 'A HTML page'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain how Java achieves platform independence.',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Java source code (.java) is compiled by javac into bytecode (.class), which is not specific to any operating system. The JVM, which has a different implementation for each OS, reads this bytecode and translates it into machine instructions for that particular platform at runtime. So the same bytecode runs anywhere a JVM exists — that is "Write Once, Run Anywhere".',
              hinglish:
                'Java source code (.java) ko javac bytecode (.class) mein compile karta hai, jo kisi bhi OS se specific nahi hota. JVM, jiska har OS ke liye alag implementation hota hai, is bytecode ko padhta hai aur runtime pe us platform ke machine instructions mein translate kar deta hai. Isliye same bytecode har jagah chalta hai jahan JVM ho — yahi "Write Once, Run Anywhere" hai.',
            },
          },
        ],
      },
      {
        title: 'Java Basics: JVM, JDK, JRE & main',
        difficulty: 'easy',
        tags: ['basics', 'jvm', 'main'],
        explanation: {
          english:
            'Three names confuse beginners: JDK, JRE, and JVM. The JVM (Java Virtual Machine) is the engine that runs bytecode. The JRE (Java Runtime Environment) is the JVM plus the standard libraries needed to run programs. The JDK (Java Development Kit) is the JRE plus development tools like the javac compiler — you need the JDK to write and build Java. Every Java program starts at a special method: public static void main(String[] args). The JVM looks for exactly this signature to begin execution. System.out.println(...) prints a line to the console.',
          hinglish:
            'Teen naam beginners ko confuse karte hain: JDK, JRE, aur JVM. JVM (Java Virtual Machine) wo engine hai jo bytecode chalata hai. JRE (Java Runtime Environment) = JVM + standard libraries jo program chalane ke liye chahiye. JDK (Java Development Kit) = JRE + development tools jaise javac compiler — Java likhne aur build karne ke liye JDK chahiye. Har Java program ek special method se shuru hota hai: public static void main(String[] args). JVM exactly is signature ko dhundta hai execution shuru karne ke liye. System.out.println(...) console pe ek line print karta hai.',
        },
        dailyLifeExample:
          'Socho ek tiffin service hai. JVM = wo chulha jisme khana garam hota hai. JRE = chulha + bartan + masale (chalane ke liye sab kuch). JDK = JRE + recipe book + chaaku-chimta (banane ke saare tools). Khana banane ke liye poora JDK chahiye; sirf khane ke liye JRE kaafi hai.',
        codeExample:
          'public class Cricket {\n    // JVM execution ALWAYS starts here\n    public static void main(String[] args) {\n        System.out.println("Match shuru!");\n        System.out.print("No newline here. ");\n        System.out.println("Ab newline.");\n    }\n}\n\n// public  -> accessible by JVM from anywhere\n// static  -> no object needed to call main\n// void    -> returns nothing\n// String[] args -> command-line arguments',
        keyPoints: [
          'JVM runs bytecode; JRE = JVM + libraries; JDK = JRE + tools (javac)',
          'You need the JDK to develop, only the JRE to run',
          'Entry point is exactly: public static void main(String[] args)',
          'println adds a newline; print does not',
        ],
        quiz: [
          {
            question: 'Which one do you need to COMPILE Java code?',
            options: ['JRE only', 'JVM only', 'JDK', 'A browser'],
            correctIndex: 2,
          },
          {
            question: 'Why is main declared static?',
            options: [
              'So it returns a value',
              'So the JVM can call it without creating an object',
              'So it runs faster',
              'It is just a convention with no reason',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between JDK, JRE, and JVM?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'JVM is the virtual machine that executes Java bytecode. JRE is the JVM bundled with the core libraries required to run Java applications. JDK is the full development kit: it contains the JRE plus tools needed to develop Java, such as the javac compiler, debugger, and javadoc. In short, JDK > JRE > JVM in terms of what they contain.',
              hinglish:
                'JVM wo virtual machine hai jo Java bytecode execute karti hai. JRE = JVM + core libraries jo Java applications chalane ke liye chahiye. JDK pura development kit hai: ismein JRE + Java develop karne ke tools hote hain, jaise javac compiler, debugger, aur javadoc. Short mein: JDK > JRE > JVM, contents ke hisaab se.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Variables & Data Types',
    level: 'beginner',
    description: 'Primitives, var keyword, aur type casting.',
    concepts: [
      {
        title: 'Variables & Primitive Data Types',
        difficulty: 'easy',
        tags: ['variables', 'types', 'primitives'],
        explanation: {
          english:
            'Java is strongly-typed: every variable has a fixed type decided when you declare it. There are 8 primitive types: byte, short, int, long (whole numbers of growing size), float and double (decimals), char (a single character), and boolean (true/false). Primitives store raw values directly, not references. You can let the compiler infer a local variable type using var, but the type is still fixed once assigned.',
          hinglish:
            'Java strongly-typed hai: har variable ka fixed type hota hai jo declare karte waqt decide hota hai. 8 primitive types hain: byte, short, int, long (badhte size ke whole numbers), float aur double (decimals), char (ek single character), aur boolean (true/false). Primitives raw values directly store karte hain, references nahi. Local variable ka type compiler ko infer karne de sakte ho var se, par assign hone ke baad type fixed rehta hai.',
        },
        dailyLifeExample:
          'Variables jaise alag-alag dabbe hain jinpe label laga hai. int wala dabba sirf poore numbers leta hai (90 runs), double decimals leta hai (cricket strike rate 142.85), char ek akshar leta hai (grade A), boolean haan/naa leta hai (out? true/false). Galat cheez galat dabbe mein nahi daal sakte.',
        codeExample:
          'public class Profile {\n    public static void main(String[] args) {\n        int age = 22;\n        long population = 1400000000L;   // L suffix for long\n        double rating = 4.85;\n        float price = 99.50f;            // f suffix for float\n        char grade = \'A\';\n        boolean isStudent = true;\n\n        // var: compiler infers the type (still fixed!)\n        var city = "Jaipur";            // inferred as String\n\n        System.out.println(city + " | age " + age + " | grade " + grade);\n    }\n}',
        keyPoints: [
          '8 primitives: byte, short, int, long, float, double, char, boolean',
          'long needs an L suffix, float needs an f suffix',
          'char uses single quotes; String uses double quotes',
          'var infers the type but the variable stays strongly-typed',
        ],
        quiz: [
          {
            question: 'Which is NOT a primitive type in Java?',
            options: ['int', 'boolean', 'String', 'char'],
            correctIndex: 2,
          },
          {
            question: 'What suffix marks a long literal?',
            options: ['f', 'L', 'd', 'b'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a primitive type and a reference type in Java?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A primitive type (like int or boolean) stores the actual value directly in the variable. A reference type (like String or an array or any object) stores a reference (an address) pointing to the object on the heap. Primitives cannot be null and have default values like 0; references can be null. Primitives are compared with == by value, references by identity.',
              hinglish:
                'Primitive type (jaise int ya boolean) actual value ko directly variable mein store karta hai. Reference type (jaise String, array, ya koi object) ek reference (address) store karta hai jo heap pe object ko point karta hai. Primitives null nahi ho sakte aur unki default values hoti hain jaise 0; references null ho sakte hain. Primitives ko == se value compare hoti hai, references ko identity.',
            },
          },
        ],
      },
      {
        title: 'Type Casting & Conversion',
        difficulty: 'easy',
        tags: ['casting', 'types', 'conversion'],
        explanation: {
          english:
            'Sometimes you need to move a value from one type to another. Widening (implicit) casting happens automatically when going to a bigger type — int to long to double — because no data is lost. Narrowing (explicit) casting goes to a smaller type and can lose data, so you must write the target type in parentheses, like (int). For text-to-number, you use wrapper methods such as Integer.parseInt and Double.parseDouble.',
          hinglish:
            'Kabhi-kabhi ek type ki value doosre type mein le jaani padti hai. Widening (implicit) casting automatically hoti hai jab bade type mein jaate ho — int se long se double — kyunki data loss nahi hota. Narrowing (explicit) casting chhote type mein jaati hai aur data kho sakta hai, isliye target type parentheses mein likhna padta hai, jaise (int). Text se number ke liye wrapper methods use karte ho jaise Integer.parseInt aur Double.parseDouble.',
        },
        dailyLifeExample:
          'Widening jaise chhoti katori ka paani bade glass mein daalna — sab aa jaata hai, tension nahi. Narrowing jaise bade glass ka paani chhoti katori mein daalna — extra paani gir jaata hai (data loss). Isliye narrowing mein tumhe khud bolna padta hai "haan main jaanta hoon".',
        codeExample:
          'public class Casting {\n    public static void main(String[] args) {\n        // Widening: automatic\n        int marks = 95;\n        double percent = marks;     // 95 -> 95.0 automatically\n\n        // Narrowing: must be explicit, may lose data\n        double price = 199.99;\n        int rupees = (int) price;   // 199 (decimal part dropped)\n\n        // String to number\n        String input = "42";\n        int num = Integer.parseInt(input);\n\n        System.out.println(percent + " | " + rupees + " | " + (num + 8));\n    }\n}',
        keyPoints: [
          'Widening (small ➜ big) is automatic and safe',
          'Narrowing (big ➜ small) needs an explicit (type) cast and may lose data',
          'Casting a double to int drops the decimal part (does not round)',
          'Use Integer.parseInt / Double.parseDouble to convert text to numbers',
        ],
        quiz: [
          {
            question: 'What does (int) 9.99 evaluate to?',
            options: ['10', '9', '9.0', 'Error'],
            correctIndex: 1,
          },
          {
            question: 'Which casting is automatic in Java?',
            options: ['double to int', 'long to int', 'int to double', 'double to float'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between implicit and explicit casting?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Implicit (widening) casting is done automatically by the compiler when converting a smaller type to a larger compatible type, like int to double, because no information is lost. Explicit (narrowing) casting must be written by the programmer using a cast operator like (int) because converting to a smaller type can lose data, and the compiler wants you to confirm you accept that risk.',
              hinglish:
                'Implicit (widening) casting compiler khud karta hai jab chhote type ko bade compatible type mein convert karta hai, jaise int se double, kyunki koi info nahi khoti. Explicit (narrowing) casting programmer ko khud likhni padti hai cast operator se jaise (int) kyunki chhote type mein convert karne se data kho sakta hai, aur compiler chahta hai ki tum confirm karo ki risk accept hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Control Flow & Loops',
    level: 'beginner',
    description: 'if/else, switch, aur for/while/do-while loops.',
    concepts: [
      {
        title: 'Conditionals: if / else & switch',
        difficulty: 'easy',
        tags: ['control-flow', 'if-else', 'switch'],
        explanation: {
          english:
            'Conditionals let your program make decisions. if runs a block when a condition is true; else if checks another condition; else is the fallback. For comparing one value against many fixed cases, switch is cleaner. Each case should end with break to stop fall-through, and default handles anything unmatched. Modern Java also offers a concise switch expression with arrow (->) syntax.',
          hinglish:
            'Conditionals tumhare program ko decision lene dete hain. if tab block chalata hai jab condition true ho; else if doosri condition check karta hai; else fallback hai. Jab ek value ko kai fixed cases se compare karna ho, switch zyada saaf hota hai. Har case break se khatam hona chahiye taaki fall-through ruk jaaye, aur default un sab ko handle karta hai jo match nahi hue. Modern Java ek short switch expression bhi deta hai arrow (->) syntax ke saath.',
        },
        dailyLifeExample:
          'if/else jaise traffic signal: laal hai? ruk jao. peela hai? slow karo. hara hai? chal pado. switch jaise canteen ka menu number bolna: "2" bolo toh samosa, "3" bolo toh chai — har number ka fixed item.',
        codeExample:
          'public class Grade {\n    public static void main(String[] args) {\n        int marks = 78;\n\n        if (marks >= 90) {\n            System.out.println("Grade A");\n        } else if (marks >= 60) {\n            System.out.println("Grade B");\n        } else {\n            System.out.println("Try again");\n        }\n\n        int day = 3;\n        String name = switch (day) {   // modern switch expression\n            case 1 -> "Monday";\n            case 3 -> "Wednesday";\n            default -> "Other";\n        };\n        System.out.println(name);\n    }\n}',
        keyPoints: [
          'if / else if / else chain runs the first matching block only',
          'switch compares one value against fixed cases',
          'Classic switch needs break to avoid fall-through; default catches the rest',
          'Arrow switch expressions can return a value with no break needed',
        ],
        quiz: [
          {
            question: 'In a classic switch, what causes fall-through to the next case?',
            options: ['Using default', 'Forgetting break', 'Using else', 'Using a String'],
            correctIndex: 1,
          },
          {
            question: 'What runs when no case matches in a switch?',
            options: ['The first case', 'The last case', 'The default block', 'Nothing, it errors'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you prefer a switch over an if-else chain?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'A switch is preferable when you are comparing a single variable against many discrete, constant values (like an int, char, String, or enum). It is more readable than a long if-else chain and can be optimized by the compiler. An if-else chain is better when you have ranges or complex boolean conditions rather than exact value matches.',
              hinglish:
                'switch tab better hai jab tum ek single variable ko kai discrete, constant values se compare kar rahe ho (jaise int, char, String, ya enum). Ye lambi if-else chain se zyada readable hai aur compiler isse optimize kar sakta hai. if-else chain tab better hai jab ranges ya complex boolean conditions ho, exact value match nahi.',
            },
          },
        ],
      },
      {
        title: 'Loops: for, while & do-while',
        difficulty: 'easy',
        tags: ['loops', 'for', 'while'],
        explanation: {
          english:
            'Loops repeat a block of code. A for loop is best when you know how many times to repeat — it has init, condition, and update in one line. A while loop repeats as long as a condition stays true and is best when the count is unknown. A do-while loop is like while but checks the condition AFTER running the body once, so it always runs at least one time. break exits a loop early; continue skips to the next iteration.',
          hinglish:
            'Loops ek block of code ko repeat karte hain. for loop tab best hai jab tumhe pata ho kitni baar repeat karna hai — ismein init, condition, aur update ek line mein hote hain. while loop tab tak repeat karta hai jab tak condition true rahe, aur best hai jab count pata na ho. do-while loop while jaisa hai par condition body ek baar chalne ke BAAD check karta hai, isliye ye hamesha kam se kam ek baar chalta hai. break loop ko jaldi rok deta hai; continue agle iteration pe chhalang lagata hai.',
        },
        dailyLifeExample:
          'for loop jaise 10 push-ups karna — count pata hai. while loop jaise "jab tak bus na aaye, intezaar karo" — pata nahi kitni der. do-while jaise dukaan pe ek baar to maal dekh hi lete ho, phir decide karte ho aur lena hai ya nahi.',
        codeExample:
          'public class Loops {\n    public static void main(String[] args) {\n        // for: known count\n        for (int i = 1; i <= 3; i++) {\n            System.out.println("Push-up " + i);\n        }\n\n        // while: unknown count\n        int balance = 100;\n        while (balance > 0) {\n            balance -= 40;\n        }\n        System.out.println("Balance: " + balance);\n\n        // do-while: runs at least once\n        int n = 0;\n        do {\n            System.out.println("Runs once even though false");\n        } while (n > 0);\n    }\n}',
        keyPoints: [
          'for: use when the number of iterations is known',
          'while: checks condition first; may run zero times',
          'do-while: checks condition after; always runs at least once',
          'break exits the loop; continue skips to the next iteration',
        ],
        quiz: [
          {
            question: 'Which loop is guaranteed to run at least once?',
            options: ['for', 'while', 'do-while', 'None of them'],
            correctIndex: 2,
          },
          {
            question: 'What does continue do inside a loop?',
            options: ['Exits the loop', 'Skips to the next iteration', 'Restarts the program', 'Pauses execution'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between break and continue?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'break immediately terminates the entire loop and execution continues after it. continue skips the rest of the current iteration and jumps to the next iteration (re-checking the loop condition). So break stops looping altogether, while continue only skips one pass.',
              hinglish:
                'break poore loop ko turant khatam kar deta hai aur execution loop ke baad continue hota hai. continue current iteration ka baaki part skip kar deta hai aur agle iteration pe jump karta hai (loop condition dobara check karke). Toh break looping bilkul band kar deta hai, jabki continue sirf ek pass skip karta hai.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Methods & Arrays',
    level: 'intermediate',
    description: 'Methods, parameters, return values, aur arrays.',
    concepts: [
      {
        title: 'Methods: Parameters & Return Values',
        difficulty: 'medium',
        tags: ['methods', 'functions', 'parameters'],
        explanation: {
          english:
            'A method is a named, reusable block of code. It can take inputs called parameters and can give back a result using return. Every method declares a return type — use void if it returns nothing. Methods help you avoid repeating code (DRY) and break a big problem into small, testable pieces. Arguments in Java are passed by value: for primitives a copy of the value is passed; for objects a copy of the reference is passed.',
          hinglish:
            'Method ek naam wala, dobara use hone wala code block hai. Ye inputs le sakta hai jinhe parameters kehte hain, aur return se result waapas de sakta hai. Har method ek return type declare karta hai — agar kuch return nahi karta to void use karo. Methods code repeat hone se bachate hain (DRY) aur bade problem ko chhote, testable tukdo mein todte hain. Java mein arguments pass-by-value hote hain: primitives ke liye value ki copy jaati hai; objects ke liye reference ki copy jaati hai.',
        },
        dailyLifeExample:
          'Method jaise chai banane ki ek fixed recipe — input do (chai patti, doodh, cheeni), wo process karke output deta hai (chai). Har baar nayi recipe nahi likhni padti, bas method ko call karke alag-alag inputs de do.',
        codeExample:
          'public class Calculator {\n    // method with parameters and a return value\n    static int add(int a, int b) {\n        return a + b;\n    }\n\n    // void method: returns nothing\n    static void greet(String name) {\n        System.out.println("Namaste, " + name);\n    }\n\n    public static void main(String[] args) {\n        int total = add(15, 27);\n        System.out.println("Total: " + total);\n        greet("Priya");\n    }\n}',
        keyPoints: [
          'Methods are reusable blocks with a name, parameters, and a return type',
          'Use void when a method returns nothing',
          'Java is pass-by-value (a copy of the value or reference is passed)',
          'Methods keep code DRY and easier to test',
        ],
        quiz: [
          {
            question: 'What return type do you use when a method returns nothing?',
            options: ['null', 'void', 'empty', 'none'],
            correctIndex: 1,
          },
          {
            question: 'How are arguments passed in Java?',
            options: ['Pass by reference', 'Pass by value', 'Pass by name', 'Pass by pointer'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Is Java pass-by-value or pass-by-reference?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Java is strictly pass-by-value. For primitives, a copy of the actual value is passed, so changes inside the method do not affect the original. For objects, a copy of the reference (the address) is passed by value, so you can mutate the object the reference points to, but reassigning the parameter to a new object does not affect the caller. This is why people sometimes get confused and call it pass-by-reference.',
              hinglish:
                'Java strictly pass-by-value hai. Primitives ke liye actual value ki copy jaati hai, isliye method ke andar changes original ko affect nahi karte. Objects ke liye reference (address) ki copy by-value jaati hai, isliye tum us object ko mutate kar sakte ho jise reference point karta hai, par parameter ko naye object se reassign karna caller ko affect nahi karta. Isi liye log confuse hokar isse kabhi pass-by-reference keh dete hain.',
            },
          },
        ],
      },
      {
        title: 'Arrays & the Enhanced for Loop',
        difficulty: 'medium',
        tags: ['arrays', 'for-each', 'collections'],
        explanation: {
          english:
            'An array is a fixed-size container holding multiple values of the same type, accessed by an index starting at 0. You declare an array with the type and square brackets, and its length is fixed after creation (use .length to read it). To loop over every element cleanly, Java offers the enhanced for (for-each) loop, which reads each element without managing an index. Accessing an index outside the array throws an ArrayIndexOutOfBoundsException.',
          hinglish:
            'Array ek fixed-size container hai jo same type ki kai values rakhta hai, jinhe index se access karte hain jo 0 se shuru hota hai. Array type aur square brackets se declare karte ho, aur create hone ke baad iski length fixed rehti hai (padhne ke liye .length use karo). Har element pe saaf tareeke se loop karne ke liye Java enhanced for (for-each) loop deta hai, jo bina index manage kiye har element padhta hai. Array ke bahar ka index access karne se ArrayIndexOutOfBoundsException aata hai.',
        },
        dailyLifeExample:
          'Array jaise train ka ek coach jisme fixed seats hain — seat number (index) se kisi bhi passenger tak pohonch jao. Seat 0 se shuru hoti hai. for-each loop jaise TT (ticket checker) jo har seat pe ek-ek karke jaata hai bina seat number yaad rakhe.',
        codeExample:
          'public class Scores {\n    public static void main(String[] args) {\n        int[] runs = {45, 88, 12, 73};\n\n        // access by index (starts at 0)\n        System.out.println("First: " + runs[0]);\n        System.out.println("Length: " + runs.length);\n\n        // enhanced for (for-each)\n        int total = 0;\n        for (int score : runs) {\n            total += score;\n        }\n        System.out.println("Total runs: " + total);\n    }\n}',
        keyPoints: [
          'Arrays are fixed-size and hold one type; indices start at 0',
          'Read the size with .length (no parentheses — it is a field)',
          'The enhanced for (for-each) loop iterates without an index',
          'Out-of-range access throws ArrayIndexOutOfBoundsException',
        ],
        quiz: [
          {
            question: 'What is the index of the first element in a Java array?',
            options: ['1', '0', '-1', 'It depends'],
            correctIndex: 1,
          },
          {
            question: 'How do you get the size of an array named arr?',
            options: ['arr.size()', 'arr.length()', 'arr.length', 'length(arr)'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between an array and an ArrayList in Java?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'An array has a fixed size set at creation and can store both primitives and objects, with fast index access. An ArrayList is a resizable list from the Collections framework that grows automatically, stores only objects (using wrapper types for primitives), and provides convenient methods like add, remove, and size. Use an array for a fixed number of elements and performance; use an ArrayList when the size changes dynamically.',
              hinglish:
                'Array ka size create karte waqt fix ho jaata hai aur ye primitives aur objects dono store kar sakta hai, fast index access ke saath. ArrayList Collections framework ki resizable list hai jo automatically badhti hai, sirf objects store karti hai (primitives ke liye wrapper types), aur add, remove, size jaise convenient methods deti hai. Fixed elements aur performance ke liye array use karo; jab size dynamically badle to ArrayList.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'OOP Fundamentals',
    level: 'intermediate',
    description: 'Classes, objects, constructors, this, aur encapsulation.',
    concepts: [
      {
        title: 'Classes, Objects & Constructors',
        difficulty: 'medium',
        tags: ['oop', 'class', 'object', 'constructor'],
        explanation: {
          english:
            'A class is a blueprint that describes what data (fields) and behaviour (methods) an object will have. An object is a concrete instance created from that blueprint with the new keyword. A constructor is a special method with the same name as the class and no return type; it runs when an object is created and sets up its initial state. The this keyword refers to the current object and is used to distinguish a field from a parameter with the same name.',
          hinglish:
            'Class ek blueprint hai jo batata hai ki object ke paas kaunsa data (fields) aur behaviour (methods) hoga. Object us blueprint se new keyword ke saath banaya gaya concrete instance hai. Constructor ek special method hai jiska naam class jaisa hota hai aur koi return type nahi; ye object banne par chalta hai aur uska initial state set karta hai. this keyword current object ko refer karta hai aur tab use hota hai jab field aur parameter ka naam same ho.',
        },
        dailyLifeExample:
          'Class jaise architect ka ek ghar ka naksha (blueprint). Object jaise us naksha se banaya gaya asli ghar — ek naksha se kai ghar ban sakte hain, har ek alag address ke saath. Constructor jaise grih-pravesh ki taiyari jo har naye ghar mein hoti hai.',
        codeExample:
          'class Student {\n    String name;   // field\n    int rollNo;    // field\n\n    // constructor: runs when a new object is created\n    Student(String name, int rollNo) {\n        this.name = name;       // this.name = field, name = parameter\n        this.rollNo = rollNo;\n    }\n\n    void introduce() {\n        System.out.println("Main " + name + ", roll no " + rollNo);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student("Aarav", 17);\n        s1.introduce();\n    }\n}',
        keyPoints: [
          'A class is a blueprint; an object is an instance made with new',
          'A constructor has the class name, no return type, and sets initial state',
          'this refers to the current object',
          'this resolves naming clashes between a field and a parameter',
        ],
        quiz: [
          {
            question: 'Which keyword creates a new object from a class?',
            options: ['create', 'new', 'make', 'object'],
            correctIndex: 1,
          },
          {
            question: 'What is true about a constructor?',
            options: [
              'It must return void',
              'It has the same name as the class and no return type',
              'It can only be called manually',
              'It must be static',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is a constructor and how is it different from a method?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'A constructor is a special block that initializes a new object. It has the same name as the class, has no return type (not even void), and is invoked automatically when you use new. A regular method has any name, a declared return type, and is called explicitly on an object. If you write no constructor, Java provides a default no-argument one.',
              hinglish:
                'Constructor ek special block hai jo naye object ko initialize karta hai. Iska naam class jaisa hota hai, koi return type nahi hota (void bhi nahi), aur new use karne par ye automatically call hota hai. Normal method ka koi bhi naam ho sakta hai, ek declared return type hota hai, aur ise object pe explicitly call karte hain. Agar tum koi constructor nahi likhte, Java ek default no-argument constructor de deta hai.',
            },
          },
        ],
      },
      {
        title: 'Encapsulation: Getters & Setters',
        difficulty: 'medium',
        tags: ['oop', 'encapsulation', 'getters', 'setters'],
        explanation: {
          english:
            'Encapsulation means hiding an object\'s internal data and exposing it only through controlled methods. You make fields private so outside code cannot touch them directly, then provide public getter methods to read and setter methods to write. Setters can add validation, so the object can never enter an invalid state. This is one of the four pillars of OOP and keeps your data safe and your code maintainable.',
          hinglish:
            'Encapsulation matlab object ka internal data chhupana aur use sirf controlled methods ke through expose karna. Fields ko private banate ho taaki bahar ka code unhe seedha na choo sake, phir public getter methods read ke liye aur setter methods write ke liye dete ho. Setters validation add kar sakte hain, isliye object kabhi invalid state mein nahi jaata. Ye OOP ke chaar pillars mein se ek hai aur tumhare data ko safe aur code ko maintainable rakhta hai.',
        },
        dailyLifeExample:
          'Encapsulation jaise ATM machine. Tum seedha bank ki tijori (private data) nahi khol sakte. Tum sirf machine ke buttons (public methods) se kaam karte ho — paise nikaalo, balance dekho. Machine beech mein check karti hai (validation) ki tumhare paas itne paise hain bhi ya nahi.',
        codeExample:
          'class BankAccount {\n    private double balance;   // hidden from outside\n\n    public double getBalance() {   // getter\n        return balance;\n    }\n\n    public void deposit(double amount) {   // setter with validation\n        if (amount > 0) {\n            balance += amount;\n        } else {\n            System.out.println("Invalid amount!");\n        }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount();\n        acc.deposit(500);\n        // acc.balance = -1000;  // ERROR: balance is private\n        System.out.println("Balance: " + acc.getBalance());\n    }\n}',
        keyPoints: [
          'Make fields private to hide internal data',
          'Expose them through public getter and setter methods',
          'Setters can validate input so the object stays consistent',
          'Encapsulation is a core pillar of OOP',
        ],
        quiz: [
          {
            question: 'Which access modifier hides a field from outside the class?',
            options: ['public', 'private', 'protected', 'default'],
            correctIndex: 1,
          },
          {
            question: 'Why add validation inside a setter?',
            options: [
              'To make code slower',
              'To prevent the object from entering an invalid state',
              'Because Java requires it',
              'To expose the field directly',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is encapsulation and why is it important?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Encapsulation is the OOP principle of bundling data (fields) and the methods that operate on it into a single unit, and restricting direct access to the data by marking fields private. Access is given only through public getters and setters, which can enforce validation. It is important because it protects data integrity, hides implementation details, and lets you change internals later without breaking outside code.',
              hinglish:
                'Encapsulation OOP ka principle hai jisme data (fields) aur uspe kaam karne wale methods ko ek single unit mein bundle karte hain, aur fields ko private mark karke data tak seedha access rok dete hain. Access sirf public getters aur setters se milta hai, jo validation enforce kar sakte hain. Ye important hai kyunki data integrity ki raksha karta hai, implementation details chhupata hai, aur baad mein internals badalne deta hai bina bahar ka code toode.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Inheritance & Polymorphism',
    level: 'intermediate',
    description: 'extends, super, overriding, overloading, abstract classes aur interfaces.',
    concepts: [
      {
        title: 'Inheritance, super & Method Overriding',
        difficulty: 'medium',
        tags: ['oop', 'inheritance', 'overriding', 'super'],
        explanation: {
          english:
            'Inheritance lets one class (the subclass) reuse the fields and methods of another (the superclass) using the extends keyword. The subclass gets everything public/protected from the parent and can add more. A subclass can override a parent method by redefining it with the same signature, marked with @Override. The super keyword calls the parent\'s constructor or a parent method that you have overridden. This models an "is-a" relationship — a Dog is an Animal.',
          hinglish:
            'Inheritance ek class (subclass) ko doosri class (superclass) ke fields aur methods reuse karne deta hai extends keyword se. Subclass ko parent ka sab public/protected milta hai aur wo aur add kar sakta hai. Subclass parent ke method ko same signature se redefine karke override kar sakta hai, @Override se mark karke. super keyword parent ka constructor ya koi override kiya hua parent method call karta hai. Ye "is-a" relationship model karta hai — ek Dog ek Animal hai.',
        },
        dailyLifeExample:
          'Inheritance jaise family business. Beta (subclass) baap (superclass) ka pura business aur skills wirasat mein paata hai. Phir wo apna naya twist add kar sakta hai (override), ya zaroorat pe baap se salah le sakta hai (super).',
        codeExample:
          'class Animal {\n    void sound() {\n        System.out.println("Some sound");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    void sound() {              // overriding the parent method\n        super.sound();         // call parent version first\n        System.out.println("Bhau bhau!");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.sound();\n    }\n}',
        keyPoints: [
          'extends creates an "is-a" relationship between subclass and superclass',
          'Overriding redefines a parent method with the same signature (@Override)',
          'super calls the parent constructor or an overridden parent method',
          'A subclass inherits accessible fields and methods of its parent',
        ],
        quiz: [
          {
            question: 'Which keyword establishes inheritance in Java?',
            options: ['implements', 'inherits', 'extends', 'super'],
            correctIndex: 2,
          },
          {
            question: 'What does super.method() do?',
            options: [
              'Calls a static method',
              'Calls the parent class version of the method',
              'Creates a new object',
              'Skips the method',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between method overriding and method overloading?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'Overriding happens between a superclass and subclass: the subclass provides a new implementation for a method with the exact same name, parameters, and return type — it is resolved at runtime (runtime polymorphism). Overloading happens within the same class: multiple methods share a name but differ in parameter list (number or type) — it is resolved at compile time (compile-time polymorphism).',
              hinglish:
                'Overriding superclass aur subclass ke beech hota hai: subclass ek method ka naya implementation deta hai exactly same naam, parameters, aur return type ke saath — ye runtime pe resolve hota hai (runtime polymorphism). Overloading ek hi class ke andar hota hai: kai methods ka naam same hota hai par parameter list (number ya type) alag — ye compile time pe resolve hota hai (compile-time polymorphism).',
            },
          },
        ],
      },
      {
        title: 'Polymorphism: Overloading, Abstract Classes & Interfaces',
        difficulty: 'hard',
        tags: ['oop', 'polymorphism', 'abstract', 'interface'],
        explanation: {
          english:
            'Polymorphism means "many forms" — the same call behaves differently depending on the object. Overloading gives one method name several parameter lists (compile-time polymorphism). An abstract class cannot be instantiated and may have both abstract methods (no body, subclasses must implement) and concrete methods; it captures a partial blueprint. An interface is a pure contract of method signatures that a class promises to fulfil using implements. A class can extend only one class but implement many interfaces.',
          hinglish:
            'Polymorphism matlab "many forms" — same call object ke hisaab se alag behave karta hai. Overloading ek method naam ko kai parameter lists deta hai (compile-time polymorphism). Abstract class instantiate nahi ho sakti aur ismein abstract methods (bina body, subclass ko implement karna padta hai) aur concrete methods dono ho sakte hain; ye ek partial blueprint pakadti hai. Interface method signatures ka pure contract hai jise class implements se nibhane ka waada karti hai. Ek class sirf ek class extend kar sakti hai par kai interfaces implement kar sakti hai.',
        },
        dailyLifeExample:
          'Interface jaise driving licence ki shart: "tumhe steering, brake aur accelerator chalana aana chahiye". Har gaadi (class) apne tareeke se ye implement karti hai — car alag, truck alag. Abstract class jaise ek aadhi-bani gaadi ka design jisme kuch parts ready hain par engine har company ko khud daalna hai.',
        codeExample:
          'interface Shape {\n    double area();   // contract: every shape must define area\n}\n\nabstract class Vehicle {\n    abstract void start();          // no body: subclasses implement\n    void fuel() {                   // concrete shared method\n        System.out.println("Refuelling...");\n    }\n}\n\nclass Circle implements Shape {\n    double r;\n    Circle(double r) { this.r = r; }\n    public double area() { return 3.14 * r * r; }\n}\n\n// overloading: same name, different parameters\nclass Printer {\n    void show(int x)    { System.out.println("int: " + x); }\n    void show(String s) { System.out.println("str: " + s); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new Circle(2).area());\n        Printer p = new Printer();\n        p.show(5);\n        p.show("hi");\n    }\n}',
        keyPoints: [
          'Overloading = same method name, different parameter lists (compile-time)',
          'Abstract classes cannot be instantiated; mix abstract + concrete methods',
          'Interfaces are pure contracts implemented with the implements keyword',
          'A class extends one class but can implement many interfaces',
        ],
        quiz: [
          {
            question: 'How many classes can a Java class directly extend?',
            options: ['Unlimited', 'Exactly one', 'Up to two', 'Zero'],
            correctIndex: 1,
          },
          {
            question: 'What is true about an abstract class?',
            options: [
              'It can be instantiated with new',
              'It can have both abstract and concrete methods',
              'It can only have abstract methods',
              'It is the same as an interface',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between an abstract class and an interface?',
            difficulty: 'hard',
            frequency: 'very-common',
            answer: {
              english:
                'An abstract class can have constructors, instance fields with state, and a mix of abstract and concrete methods; a class can extend only one. An interface traditionally holds only method signatures (and constants), supports multiple implementation, and since Java 8 can also have default and static methods. Use an abstract class to share common code and state across closely related classes; use an interface to define a capability that unrelated classes can fulfil.',
              hinglish:
                'Abstract class mein constructors, state wale instance fields, aur abstract + concrete methods ka mix ho sakta hai; ek class sirf ek hi extend kar sakti hai. Interface traditionally sirf method signatures (aur constants) rakhta hai, multiple implementation support karta hai, aur Java 8 se default aur static methods bhi rakh sakta hai. Closely related classes mein common code aur state share karne ke liye abstract class use karo; aur ek capability define karne ke liye jo unrelated classes nibha sakein, interface use karo.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Collections Framework',
    level: 'advanced',
    description: 'ArrayList, HashMap, HashSet aur generics.',
    concepts: [
      {
        title: 'Lists, Maps, Sets & Generics',
        difficulty: 'hard',
        tags: ['collections', 'arraylist', 'hashmap', 'generics'],
        explanation: {
          english:
            'The Collections framework provides ready-made, resizable data structures. ArrayList is an ordered list that grows automatically and allows duplicates. HashMap stores key-value pairs for fast lookup by key (no duplicate keys). HashSet stores unique elements with no defined order, perfect for removing duplicates. Generics, written with angle brackets like ArrayList<String>, tell the collection what type it holds, giving compile-time type safety and removing the need for casts.',
          hinglish:
            'Collections framework ready-made, resizable data structures deta hai. ArrayList ek ordered list hai jo automatically badhti hai aur duplicates allow karti hai. HashMap key-value pairs store karta hai taaki key se fast lookup ho (duplicate keys nahi). HashSet unique elements store karta hai bina kisi fixed order ke, duplicates hatane ke liye perfect. Generics, angle brackets se likhe jaate hain jaise ArrayList<String>, collection ko batate hain ki wo kaunsa type rakhega, jisse compile-time type safety milti hai aur casts ki zaroorat nahi padti.',
        },
        dailyLifeExample:
          'ArrayList jaise ration ki list jisme cheezein order mein likhi hain aur "doodh" do baar bhi ho sakta hai. HashMap jaise mobile contacts — naam (key) se number (value) turant mil jaata hai. HashSet jaise wedding guest list jisme har naam sirf ek baar — duplicate apne aap hat jaata hai.',
        codeExample:
          'import java.util.*;\n\npublic class Demo {\n    public static void main(String[] args) {\n        // ArrayList: ordered, allows duplicates\n        List<String> cities = new ArrayList<>();\n        cities.add("Delhi");\n        cities.add("Delhi");   // duplicate allowed\n        System.out.println(cities);\n\n        // HashMap: key -> value\n        Map<String, Integer> ages = new HashMap<>();\n        ages.put("Riya", 20);\n        System.out.println(ages.get("Riya"));\n\n        // HashSet: unique only\n        Set<Integer> ids = new HashSet<>();\n        ids.add(1);\n        ids.add(1);            // ignored, already present\n        System.out.println(ids.size());   // 1\n    }\n}',
        keyPoints: [
          'ArrayList: ordered, indexed, allows duplicates, auto-resizes',
          'HashMap: key-value pairs, fast lookup, unique keys',
          'HashSet: unique elements, no guaranteed order',
          'Generics <Type> give compile-time type safety and remove casts',
        ],
        quiz: [
          {
            question: 'Which collection stores key-value pairs?',
            options: ['ArrayList', 'HashSet', 'HashMap', 'LinkedList'],
            correctIndex: 2,
          },
          {
            question: 'What happens when you add a duplicate element to a HashSet?',
            options: ['It throws an error', 'It is ignored', 'It is added twice', 'It clears the set'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between an ArrayList and a HashSet?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'An ArrayList is an ordered, index-based list that allows duplicate elements and preserves insertion order, with O(1) access by index. A HashSet is an unordered collection that stores only unique elements (it uses hashCode and equals to detect duplicates) and offers O(1) average add/contains, but no indexing. Use an ArrayList when order and duplicates matter; use a HashSet for uniqueness and fast membership checks.',
              hinglish:
                'ArrayList ek ordered, index-based list hai jo duplicate elements allow karti hai aur insertion order rakhti hai, index se O(1) access ke saath. HashSet ek unordered collection hai jo sirf unique elements store karta hai (duplicates pakadne ke liye hashCode aur equals use karta hai) aur O(1) average add/contains deta hai, par indexing nahi. Jab order aur duplicates matter karein to ArrayList; uniqueness aur fast membership check ke liye HashSet.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Exception Handling',
    level: 'advanced',
    description: 'try/catch/finally, checked vs unchecked, throw aur throws.',
    concepts: [
      {
        title: 'try / catch / finally & throw / throws',
        difficulty: 'hard',
        tags: ['exceptions', 'error-handling', 'try-catch'],
        explanation: {
          english:
            'Exceptions are events that disrupt normal flow, like dividing by zero or a missing file. You wrap risky code in try, handle problems in one or more catch blocks (each for a specific exception type), and put cleanup code in finally, which always runs whether or not an exception occurred. Checked exceptions (like IOException) must be declared with throws or caught — the compiler enforces this. Unchecked exceptions (RuntimeExceptions like NullPointerException) are not enforced. You raise an exception manually with throw.',
          hinglish:
            'Exceptions wo events hain jo normal flow ko disrupt karte hain, jaise zero se divide karna ya missing file. Risky code ko try mein wrap karte ho, problems ko ek ya zyada catch blocks mein handle karte ho (har ek specific exception type ke liye), aur cleanup code finally mein rakhte ho, jo exception aaye ya na aaye hamesha chalta hai. Checked exceptions (jaise IOException) ko throws se declare karna ya catch karna padta hai — compiler ise enforce karta hai. Unchecked exceptions (RuntimeExceptions jaise NullPointerException) enforce nahi hote. Exception khud raise karne ke liye throw use karte ho.',
        },
        dailyLifeExample:
          'try-catch jaise bike chalate waqt helmet pehenna. try = bike chalana (risky kaam). catch = agar gir gaye to helmet bachata hai (problem handle). finally = chahe gire ya na gire, ghar pohonch ke bike ko lock to karoge hi (hamesha hone wala kaam). throw jaise khud horn baja ke warning dena.',
        codeExample:
          'public class Safe {\n    static int divide(int a, int b) {\n        if (b == 0) {\n            throw new ArithmeticException("Divide by zero!");\n        }\n        return a / b;\n    }\n\n    public static void main(String[] args) {\n        try {\n            System.out.println(divide(10, 0));\n        } catch (ArithmeticException e) {\n            System.out.println("Caught: " + e.getMessage());\n        } finally {\n            System.out.println("Always runs (cleanup)");\n        }\n    }\n}',
        keyPoints: [
          'try wraps risky code; catch handles a specific exception type',
          'finally always runs — ideal for cleanup (closing files, connections)',
          'Checked exceptions must be caught or declared with throws',
          'throw raises an exception; throws declares which ones a method may raise',
        ],
        quiz: [
          {
            question: 'When does a finally block run?',
            options: [
              'Only if an exception occurs',
              'Only if no exception occurs',
              'Always, whether or not an exception occurs',
              'Never, it is optional',
            ],
            correctIndex: 2,
          },
          {
            question: 'Which exception type does the compiler force you to handle?',
            options: ['Unchecked', 'Checked', 'Runtime', 'NullPointerException'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between checked and unchecked exceptions?',
            difficulty: 'hard',
            frequency: 'very-common',
            answer: {
              english:
                'Checked exceptions are checked at compile time: the compiler forces you to either catch them or declare them with throws (for example IOException, SQLException). They usually represent recoverable, external conditions. Unchecked exceptions extend RuntimeException and are not checked at compile time (for example NullPointerException, ArrayIndexOutOfBoundsException); they usually indicate programming bugs. Both can be caught, but only checked ones are enforced by the compiler.',
              hinglish:
                'Checked exceptions compile time pe check hote hain: compiler tumhe majboor karta hai ki tum unhe ya to catch karo ya throws se declare karo (jaise IOException, SQLException). Ye aam taur pe recoverable, external conditions hote hain. Unchecked exceptions RuntimeException se extend hote hain aur compile time pe check nahi hote (jaise NullPointerException, ArrayIndexOutOfBoundsException); ye aam taur pe programming bugs darshate hain. Dono catch ho sakte hain, par sirf checked wale compiler dwara enforce hote hain.',
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
    question: 'What are the four main pillars of OOP in Java?',
    difficulty: 'medium',
    frequency: 'very-common',
    answer: {
      english:
        'The four pillars are: Encapsulation (bundling data with methods and hiding internal state via private fields and getters/setters), Inheritance (a subclass reusing and extending a superclass with extends), Polymorphism (the same method call taking many forms through overriding and overloading), and Abstraction (exposing only essential features via abstract classes and interfaces while hiding implementation). Together they make Java code modular, reusable, and maintainable.',
      hinglish:
        'Chaar pillars hain: Encapsulation (data ko methods ke saath bundle karna aur internal state ko private fields aur getters/setters se chhupana), Inheritance (subclass ka superclass ko reuse aur extend karna extends se), Polymorphism (same method call ka kai forms lena overriding aur overloading ke through), aur Abstraction (sirf essential features dikhana abstract classes aur interfaces se jabki implementation chhupana). Ye milkar Java code ko modular, reusable, aur maintainable banate hain.',
    },
  },
  {
    question: 'What is the difference between == and equals() in Java?',
    difficulty: 'medium',
    frequency: 'very-common',
    answer: {
      english:
        'The == operator compares references for objects (whether two variables point to the same object in memory) and compares actual values for primitives. The equals() method compares the logical content of two objects, and classes like String override it to compare characters. So for two different String objects with the same text, == may be false but equals() is true. Always use equals() to compare object content.',
      hinglish:
        '== operator objects ke liye references compare karta hai (kya do variables memory mein same object ko point karte hain) aur primitives ke liye actual values. equals() method do objects ka logical content compare karta hai, aur String jaisi classes ise override karti hain taaki characters compare ho. Toh same text wale do alag String objects ke liye == false ho sakta hai par equals() true hota hai. Object content compare karne ke liye hamesha equals() use karo.',
    },
  },
];
