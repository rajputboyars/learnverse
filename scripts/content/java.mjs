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
            'Socho tumne masala chai ki perfect recipe likhi. ☕ Tum chahte ho ki swaad same rahe — chahe koi Delhi mein gas stove pe banaye, Mumbai mein induction pe, ya gaon mein chulhe pe. Problem kya hai? Har kitchen alag hai. Agar koi magic translator ho jo tumhari ek recipe le aur har kitchen ke hisaab se perfectly adjust kar de — same chai, har baar — toh kitna mast ho!\n\nWahi magic translator hai JVM (Java Virtual Machine), aur yahi Java ka famous waada hai: "Write Once, Run Anywhere". Tum program ek baar likhte ho, aur ye Windows, Mac, Linux, Android phones, banking servers — kahin bhi — bina ek line badle chal jaata hai.\n\nWHAT yaani Java hai kya? Java ek object-oriented, compiled, platform-independent language hai jo JVM pe chalti hai. Object-oriented matlab tum program ko objects ki tarah sochte ho (ek Student, ek BankAccount, ek Car) jo data aur behaviour ko ek saath bundle karte hain. Compiled matlab tumhara readable code chalne se pehle ek lower-level form mein convert hota hai. Platform-independent matlab wo form kisi ek OS se bandha nahi hota.\n\nWHY yaani log isse kyun use karte hain? Kyunki ye portable hai (ek program har jagah chalta hai), strongly-typed hai (compiler kai galtiyan code chalne se pehle hi pakad leta hai), aur enterprise mein bahut bada hai — banks, insurance, e-commerce backends — aur Android app development mein bhi. Iska ecosystem mature hai: decades ki libraries, tools, aur ek vishaal community, toh almost har problem ka solution pehle se kisi ne bana rakha hai.\n\nHOW yaani ye kaam kaise karta hai? Tum apna code ek .java file mein likhte ho. Phir javac (Java compiler) usse bytecode mein badal deta hai jo ek .class file mein save hota hai. Bytecode na human code hai na machine code — ye ek special beech ki language hai jise JVM samajhta hai. Aakhir mein, kisi bhi machine ka JVM us bytecode ko padhta hai aur chalata hai, us OS ke hisaab se on-the-fly translate karte hue. .java ➜ javac ➜ .class (bytecode) ➜ JVM chalata hai. Bas yahi pura magic hai ek line mein. 🚀',
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
            frequency: 'common',
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
            frequency: 'common',
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
      {
        title: 'Strings in Java: Immutability & StringBuilder',
        difficulty: 'medium',
        tags: ['strings', 'immutability', 'stringbuilder'],
        explanation: {
          english:
            "A Java String is immutable — once created, it can never be changed. Every operation that looks like it 'modifies' a string (concatenation with +, .toUpperCase(), .replace()) actually creates a BRAND NEW String object and leaves the original untouched. This is safe and predictable, but concatenating strings in a loop with + creates a new object on every single iteration, which is slow for many iterations. StringBuilder solves this: it is a mutable, resizable buffer you can .append() to repeatedly without creating new objects each time, then convert to a String once at the end with .toString().",
          hinglish:
            "Java String immutable hai — ek baar ban gayi to kabhi badal nahi sakti. Har operation jo 'modify' karta hua lagta hai (concatenation +, .toUpperCase(), .replace()) actually ek BILKUL NAYA String object banata hai aur original ko chhoota nahi. Ye safe aur predictable hai, par loop mein + se strings jodna har iteration mein ek naya object banata hai, jo bahut iterations ke liye slow hai. StringBuilder ye solve karta hai: ye ek mutable, resizable buffer hai jispe baar-baar .append() kar sakte ho bina har baar naya object banaye, phir aakhir mein ek baar .toString() se String bana lo.",
        },
        dailyLifeExample:
          'String immutability ek printed kitaab jaisi hai — ek baar chhap gayi to us page ko badal nahi sakte, sirf ek NAYI kitaab print kar sakte ho jo edited version ho. StringBuilder ek whiteboard jaisa hai — jitni baar chaho likho-mitao, aakhir mein photo (final String) khinch lo.',
        codeExample:
          'String name = "Aman";\nString greeting = "Hello, " + name; // creates a NEW String, name is unchanged\nSystem.out.println(name);      // still "Aman"\n\n// SLOW: creates a new String object on every loop iteration\nString result = "";\nfor (int i = 0; i < 1000; i++) {\n    result = result + i; // 1000 throwaway String objects created!\n}\n\n// FAST: StringBuilder mutates one buffer in place\nStringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 1000; i++) {\n    sb.append(i); // no new object each time\n}\nString finalResult = sb.toString(); // convert once, at the end',
        keyPoints: [
          'String is immutable — every "modification" actually creates a new String object',
          'name + "text" does NOT change name; it creates and returns a new String',
          'Concatenating with + inside a loop creates a new object every iteration — slow for many iterations',
          'StringBuilder is mutable — .append() modifies the SAME buffer, no new objects',
          'Convert a StringBuilder to a String once, at the end, with .toString()',
        ],
        quiz: [
          {
            question: "After String greeting = \"Hello, \" + name;, what happened to the original name variable's String object?",
            options: ['It was modified to include "Hello, "', 'It is completely unchanged — a brand new String object was created for greeting', 'It was deleted', 'It became null'],
            correctIndex: 1,
          },
          {
            question: 'Why is concatenating strings with + inside a loop with many iterations considered slow?',
            options: ['It is not actually slow', 'Each + creates a new String object, so many iterations create many throwaway objects', 'Loops are always slow in Java', '+ only works outside loops'],
            correctIndex: 1,
          },
          {
            question: 'What is the main advantage of StringBuilder over repeated String concatenation?',
            options: ['It uses less code', 'It mutates one buffer in place instead of creating a new object on every append, which is much faster for many operations', 'It automatically sorts characters', 'It works only with numbers'],
            correctIndex: 1,
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
            frequency: 'common',
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
            frequency: 'common',
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
            frequency: 'common',
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
            frequency: 'common',
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
            frequency: 'common',
            answer: {
              english:
                'Encapsulation is the OOP principle of bundling data (fields) and the methods that operate on it into a single unit, and restricting direct access to the data by marking fields private. Access is given only through public getters and setters, which can enforce validation. It is important because it protects data integrity, hides implementation details, and lets you change internals later without breaking outside code.',
              hinglish:
                'Encapsulation OOP ka principle hai jisme data (fields) aur uspe kaam karne wale methods ko ek single unit mein bundle karte hain, aur fields ko private mark karke data tak seedha access rok dete hain. Access sirf public getters aur setters se milta hai, jo validation enforce kar sakte hain. Ye important hai kyunki data integrity ki raksha karta hai, implementation details chhupata hai, aur baad mein internals badalne deta hai bina bahar ka code toode.',
            },
          },
        ],
      },
      {
        title: 'The static Keyword: Class vs Instance Members',
        difficulty: 'medium',
        tags: ['static', 'oop'],
        explanation: {
          english:
            "Normally, every object created from a class gets its OWN copy of each field, and you need an object (instance) to call a method. The static keyword changes this: a static field is shared by ALL objects of the class (there is only ONE copy, no matter how many objects exist), and a static method belongs to the CLASS itself, so you can call it without creating any object — ClassName.methodName(). main() is always static because the JVM calls it before any object of your class exists.",
          hinglish:
            'Normally, class se banaya har object apna ALAG copy paata hai har field ka, aur method call karne ke liye object (instance) chahiye hota hai. static keyword ye badal deta hai: ek static field CLASS ke SAARE objects mein shared hoti hai (sirf EK copy hoti hai, chahe kitne bhi objects bane hon), aur ek static method CLASS ka khud ka hota hai, isliye bina koi object banaye use call kar sakte ho — ClassName.methodName(). main() hamesha static hota hai kyunki JVM ise call karta hai tumhari class ka koi bhi object banne se pehle.',
        },
        dailyLifeExample:
          'Static field ek school ka common notice-board jaisa hai — sabhi students (objects) ke liye ek hi board, koi bhi likhe to sabko dikhta hai. Non-static (instance) field har student ki apni personal diary jaisi hai — har student ki alag copy, ek ki likhi doosre ki diary mein nahi dikhti.',
        codeExample:
          'class Counter {\n    static int totalCount = 0;   // ONE copy, shared by all objects\n    int id;                       // each object gets its OWN copy\n\n    Counter() {\n        totalCount++;              // shared counter increases\n        id = totalCount;           // this object\'s own id\n    }\n\n    static void printTotal() {    // static method — no object needed\n        System.out.println("Total created: " + totalCount);\n    }\n}\n\npublic class Demo {\n    public static void main(String[] args) {\n        new Counter();\n        new Counter();\n        new Counter();\n        Counter.printTotal(); // Total created: 3 — called on the CLASS, no object\n    }\n}',
        keyPoints: [
          'static field: ONE copy shared across ALL objects of the class',
          'Instance (non-static) field: each object gets its own separate copy',
          'static method: called on the class itself (ClassName.method()), no object needed',
          'main() is static because the JVM must call it before any object exists',
          'Common uses: counters shared across instances, utility methods (like Math.sqrt())',
        ],
        quiz: [
          {
            question: 'If Counter.totalCount is static and you create 5 Counter objects, how many copies of totalCount exist?',
            options: ['5 separate copies', 'Just 1, shared by all 5 objects', '0, static fields do not get created', '10'],
            correctIndex: 1,
          },
          {
            question: 'Why must main() be static?',
            options: ['It is just a convention with no real reason', 'The JVM calls main() before any object of your class exists, so it cannot be an instance method', 'static methods run faster', 'It is required by all methods in Java'],
            correctIndex: 1,
          },
          {
            question: 'How do you call a static method named printTotal() in class Counter?',
            options: ['new Counter().printTotal()', 'Counter.printTotal()', 'printTotal.Counter()', 'You cannot call static methods'],
            correctIndex: 1,
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
            frequency: 'common',
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
            frequency: 'common',
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
            frequency: 'common',
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
            frequency: 'common',
            answer: {
              english:
                'Checked exceptions are checked at compile time: the compiler forces you to either catch them or declare them with throws (for example IOException, SQLException). They usually represent recoverable, external conditions. Unchecked exceptions extend RuntimeException and are not checked at compile time (for example NullPointerException, ArrayIndexOutOfBoundsException); they usually indicate programming bugs. Both can be caught, but only checked ones are enforced by the compiler.',
              hinglish:
                'Checked exceptions compile time pe check hote hain: compiler tumhe majboor karta hai ki tum unhe ya to catch karo ya throws se declare karo (jaise IOException, SQLException). Ye aam taur pe recoverable, external conditions hote hain. Unchecked exceptions RuntimeException se extend hote hain aur compile time pe check nahi hote (jaise NullPointerException, ArrayIndexOutOfBoundsException); ye aam taur pe programming bugs darshate hain. Dono catch ho sakte hain, par sirf checked wale compiler dwara enforce hote hain.',
            },
          },
        ],
      },
      {
        title: 'Custom Exceptions',
        difficulty: 'hard',
        tags: ['exceptions', 'custom-exceptions'],
        explanation: {
          english:
            "Java's built-in exceptions (NullPointerException, IOException) don't always describe YOUR program's specific problems. You can create a custom exception by extending Exception (for a checked exception the compiler forces callers to handle) or RuntimeException (for an unchecked exception, used for programming errors that shouldn't normally be caught everywhere). A custom exception class typically just needs a constructor that passes a descriptive message to the parent class — this gives you meaningful, specific error types instead of generic ones.",
          hinglish:
            "Java ke built-in exceptions (NullPointerException, IOException) hamesha TUMHARE program ki specific problems describe nahi karte. Tum ek custom exception bana sakte ho Exception ko extend karke (ek checked exception ke liye jise compiler callers ko handle karne majboor karta hai) ya RuntimeException ko extend karke (ek unchecked exception ke liye, programming errors ke liye use hota hai jinhe normally har jagah catch nahi karna chahiye). Ek custom exception class ko usually sirf ek constructor chahiye hota hai jo parent class ko ek descriptive message pass kare — isse tumhe meaningful, specific error types milte hain generic ke bajaye.",
        },
        dailyLifeExample:
          "Custom exception ek specific complaint form jaisa hai — generic 'kuch galat hua' bolne ke bajaye, 'InsufficientBalanceException' seedha batata hai ki exactly kya galat hua, jaise bank mein 'Insufficient Funds' form alag hota hai 'Card Expired' form se.",
        codeExample:
          '// Custom checked exception — callers MUST handle it\nclass InsufficientBalanceException extends Exception {\n    public InsufficientBalanceException(String message) {\n        super(message); // pass the message to the parent Exception class\n    }\n}\n\nclass BankAccount {\n    double balance = 1000;\n\n    void withdraw(double amount) throws InsufficientBalanceException {\n        if (amount > balance) {\n            throw new InsufficientBalanceException("Cannot withdraw ₹" + amount + ", balance is only ₹" + balance);\n        }\n        balance -= amount;\n    }\n}\n\npublic class Demo {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount();\n        try {\n            acc.withdraw(5000);\n        } catch (InsufficientBalanceException e) {\n            System.out.println("Error: " + e.getMessage());\n        }\n    }\n}',
        keyPoints: [
          'Create custom exceptions by extending Exception (checked) or RuntimeException (unchecked)',
          'A minimal custom exception just needs a constructor calling super(message)',
          'Custom exceptions give meaningful, specific error types instead of generic ones',
          'A method that can throw a checked custom exception must declare it with throws',
          'Custom exceptions make error handling self-documenting for anyone reading the code',
        ],
        quiz: [
          {
            question: 'To create a checked custom exception, which class should you extend?',
            options: ['RuntimeException', 'Exception', 'Error', 'Object'],
            correctIndex: 1,
          },
          {
            question: 'What does super(message) typically do inside a custom exception\'s constructor?',
            options: ['Creates a new object', 'Passes the descriptive message up to the parent Exception class so it can be retrieved later with getMessage()', 'Deletes the exception', 'Prevents the exception from being thrown'],
            correctIndex: 1,
          },
          {
            question: 'Why create a custom exception instead of just throwing a generic RuntimeException everywhere?',
            options: ['There is no real benefit', 'A custom, specifically-named exception makes error handling self-documenting and lets callers catch exactly that problem type', 'Custom exceptions run faster', 'Generic exceptions are deprecated'],
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
    question: 'What are the four main pillars of OOP in Java?',
    difficulty: 'medium',
    frequency: 'common',
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
    frequency: 'common',
    answer: {
      english:
        'The == operator compares references for objects (whether two variables point to the same object in memory) and compares actual values for primitives. The equals() method compares the logical content of two objects, and classes like String override it to compare characters. So for two different String objects with the same text, == may be false but equals() is true. Always use equals() to compare object content.',
      hinglish:
        '== operator objects ke liye references compare karta hai (kya do variables memory mein same object ko point karte hain) aur primitives ke liye actual values. equals() method do objects ka logical content compare karta hai, aur String jaisi classes ise override karti hain taaki characters compare ho. Toh same text wale do alag String objects ke liye == false ho sakta hai par equals() true hota hai. Object content compare karne ke liye hamesha equals() use karo.',
    },
  },

  // ─── Core Java ──────────────────────────────────────────────
  {
    question: 'What is the JVM, JRE, and JDK?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The JVM is the virtual machine that executes bytecode, providing platform independence — "write once, run anywhere" — plus garbage collection and JIT compilation. The JRE is the JVM plus the standard class libraries, enough to RUN a Java program. The JDK is the JRE plus development tools: the compiler `javac`, the debugger, and `jar`. You need the JDK to build and the JRE to run, though modern distributions generally ship the JDK only.',
      hinglish:
        'JVM wo virtual machine hai jo bytecode chalati hai, platform swatantrata deti hai — "ek baar likho, kahin bhi chalao" — plus garbage collection aur JIT compilation. JRE JVM plus standard class libraries hai, ek Java program CHALANE ke liye kaafi. JDK JRE plus development tools hai: compiler `javac`, debugger, aur `jar`. Build karne ko JDK aur chalane ko JRE chahiye, halaanki modern distributions aam taur pe sirf JDK dete hain.',
    },
  },
  {
    question: 'What is the difference between an abstract class and an interface?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An ABSTRACT class can hold state, constructors, and any access modifier, and a class extends only ONE — it expresses "is a kind of". An INTERFACE declares a contract and a class may implement MANY — it expresses "can do". Since Java 8 interfaces can have `default` and `static` methods, and since 9 `private` ones, which narrows the gap, but interfaces still cannot hold instance state. Use an interface for a capability, an abstract class for shared implementation.',
      hinglish:
        'Ek ABSTRACT class state, constructors, aur koi bhi access modifier rakh sakti hai, aur ek class sirf EK extend karti hai — ye "ek kism ka hai" batati hai. Ek INTERFACE ek contract batata hai aur ek class BAHUT implement kar sakti hai — ye "kar sakta hai" batata hai. Java 8 se interfaces mein `default` aur `static` methods ho sakte hain, aur 9 se `private`, jo farak kam karta hai, par interfaces abhi bhi instance state nahi rakh sakte. Ek kshamta ke liye interface, saanjhe implementation ke liye abstract class.',
    },
  },
  {
    question: 'What is the difference between method overloading and overriding?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'OVERLOADING defines several methods with the same name but different parameter lists in the same class; the compiler picks one at COMPILE time based on the static types. OVERRIDING replaces a superclass method in a subclass with the same signature; the JVM picks it at RUNTIME based on the actual object type, which is polymorphism. Overriding cannot reduce visibility or add broader checked exceptions, and `@Override` catches signature typos at compile time.',
      hinglish:
        'OVERLOADING ek hi class mein ek naam par alag parameter lists wali kai methods banata hai; compiler static types ke aadhaar pe COMPILE waqt ek chunta hai. OVERRIDING ek subclass mein ek superclass method ko usi signature se badalta hai; JVM asli object type ke aadhaar pe RUNTIME pe chunta hai, jo polymorphism hai. Overriding visibility kam nahi kar sakti ya chaude checked exceptions nahi jod sakti, aur `@Override` compile waqt signature ki galtiyaan pakadta hai.',
    },
  },
  {
    question: 'Why are Java Strings immutable?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Immutability makes Strings safe to SHARE: the string pool can intern literals so identical strings reuse one object, the hash code can be cached, and a String used as a map key or in a security check cannot be changed after validation. It also makes them inherently thread-safe. The cost is that every modification creates a new object, which is why building a string in a loop should use `StringBuilder` rather than `+`, which is O(n²).',
      hinglish:
        'Immutability Strings ko SHARE karne layak surakshit banati hai: string pool literals ko intern kar sakta hai taaki ek jaisi strings ek object use karein, hash code cache ho sakta hai, aur ek map key ya ek security check mein use hui String validation ke baad badli nahi ja sakti. Ye unhe swabhavik roop se thread-safe bhi banata hai. Cost ye hai ki har badlaav ek naya object banata hai, isiliye ek loop mein string banane ko `+` ke bajaye `StringBuilder` use karna chahiye, jo O(n²) hai.',
    },
  },
  {
    question: 'What is the difference between String, StringBuilder, and StringBuffer?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`String` is immutable, so every concatenation allocates a new object. `StringBuilder` is a mutable buffer and is the right choice for building strings in a loop — it is NOT synchronised, so it is fast. `StringBuffer` is the same but synchronised, making it thread-safe and measurably slower; it is rarely needed since a builder is usually local to one method anyway. Note the compiler already optimises simple `+` concatenation outside loops.',
      hinglish:
        '`String` immutable hai, isliye har jodna ek naya object banata hai. `StringBuilder` ek badalne layak buffer hai aur ek loop mein strings banane ke liye sahi choice — ye synchronised NAHI hai, isliye tez hai. `StringBuffer` wahi hai par synchronised, jo ise thread-safe aur maapne layak slow banata hai; ise rarely chahiye kyunki ek builder waise bhi usually ek method tak seemit hota hai. Note karo compiler loops ke bahar simple `+` jodna pehle hi optimise karta hai.',
    },
  },
  {
    question: 'What is the difference between ArrayList and LinkedList?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`ArrayList` is backed by an array: O(1) random access, excellent cache locality, but O(n) insertion in the middle because elements shift. `LinkedList` uses nodes: O(1) insertion at a KNOWN position, but O(n) access and poor cache behaviour plus per-node overhead. In practice `ArrayList` wins almost always, even for insertions, because memory locality dominates at realistic sizes. Reach for `LinkedList` mainly when you need `Deque` behaviour, and `ArrayDeque` is usually better even then.',
      hinglish:
        '`ArrayList` ek array pe bana hai: O(1) random access, behtareen cache locality, par beech mein O(n) insertion kyunki elements khisakte hain. `LinkedList` nodes use karta hai: ek JAANI jagah pe O(1) insertion, par O(n) access aur kharab cache behaviour plus per-node bojh. Practically `ArrayList` almost hamesha jeetta hai, insertions ke liye bhi, kyunki asli sizes pe memory locality haavi hoti hai. `LinkedList` mainly tab uthao jab `Deque` behaviour chahiye, aur tab bhi `ArrayDeque` usually behtar hai.',
    },
  },
  {
    question: 'What is the difference between HashMap, TreeMap, and LinkedHashMap?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`HashMap` gives O(1) average access with NO ordering guarantee. `TreeMap` keeps keys sorted using a Red-Black tree, giving O(log n) and supporting range queries such as `headMap` and `floorKey`. `LinkedHashMap` preserves INSERTION order (or access order, which makes an LRU cache trivial via `removeEldestEntry`) at the cost of a little extra memory. Choose by whether you need ordering, and if so whether sorted or insertion order.',
      hinglish:
        '`HashMap` O(1) average access deta hai KOI kram ki guarantee ke bina. `TreeMap` ek Red-Black tree se keys sorted rakhta hai, O(log n) deta hai aur `headMap` aur `floorKey` jaisi range queries deta hai. `LinkedHashMap` INSERTION kram bachata hai (ya access kram, jo `removeEldestEntry` se ek LRU cache aasaan banata hai) thodi extra memory ke cost pe. Is aadhaar pe chuno ki tumhe kram chahiye ya nahi, aur agar haan to sorted ya insertion kram.',
    },
  },
  {
    question: 'How does HashMap work internally?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A HashMap holds an array of buckets. `hashCode()` determines the bucket, and `equals()` distinguishes keys within it. Collisions form a linked list, which Java 8 converts to a balanced TREE once a bucket exceeds eight entries, bounding worst case at O(log n) instead of O(n). When the load factor (0.75 by default) is exceeded, the map RESIZES and rehashes everything. A mutable key whose hash changes after insertion becomes permanently unreachable.',
      hinglish:
        'Ek HashMap buckets ka ek array rakhta hai. `hashCode()` bucket tay karta hai, aur `equals()` uske andar keys alag karta hai. Collisions ek linked list banate hain, jise Java 8 ek bucket ke aath entries paar karne pe ek balanced TREE mein badal deta hai, worst case ko O(n) ke bajaye O(log n) pe rokte hue. Load factor (default 0.75) paar hone pe, map RESIZE hota hai aur sab dobara hash karta hai. Ek badalne layak key jiska hash insertion ke baad badle hamesha ke liye pahunch se bahar ho jaati hai.',
    },
  },
  {
    question: 'Why must you override hashCode when you override equals?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The contract says equal objects must have equal hash codes. If you override `equals` but not `hashCode`, two objects that are logically equal get different default hashes, land in different buckets, and a HashMap or HashSet fails to find one you just inserted — a silent, baffling bug. Use the same fields in both, keep them IMMUTABLE, and let the IDE or `Objects.hash` generate them. Records generate both correctly for free.',
      hinglish:
        'Contract kehta hai barabar objects ke hash codes barabar hone chahiye. Agar tum `equals` override karo par `hashCode` nahi, do logically barabar objects ko alag default hashes milte hain, wo alag buckets mein girte hain, aur ek HashMap ya HashSet use nahi dhoondh paata jo tumne abhi daala — ek chupka, uljhaane wala bug. Dono mein wahi fields use karo, unhe IMMUTABLE rakho, aur IDE ya `Objects.hash` se banwaao. Records dono muft mein sahi banate hain.',
    },
  },
  {
    question: 'What is the difference between checked and unchecked exceptions?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'CHECKED exceptions extend `Exception` and must be caught or declared, so the compiler forces you to acknowledge them — intended for recoverable conditions such as a missing file. UNCHECKED exceptions extend `RuntimeException` and need no declaration, intended for programming errors such as a null dereference. The debate is real: checked exceptions add ceremony and encourage empty catch blocks, which is why most modern Java libraries and frameworks favour unchecked.',
      hinglish:
        'CHECKED exceptions `Exception` extend karte hain aur unhe pakadna ya batana padta hai, isliye compiler tumhe unhe maanne pe majboor karta hai — ek gayab file jaisi sambhalne layak haalaton ke liye. UNCHECKED exceptions `RuntimeException` extend karte hain aur unhe batana nahi padta, ek null dereference jaisi programming galtiyon ke liye. Behes asli hai: checked exceptions dikhawa jodte hain aur khaali catch blocks ko badhaava dete hain, isiliye zyadatar modern Java libraries aur frameworks unchecked prefer karte hain.',
    },
  },
  {
    question: 'What is the difference between final, finally, and finalize?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`final` is a modifier: a final variable cannot be reassigned, a final method cannot be overridden, a final class cannot be extended. `finally` is a block that runs whether or not an exception was thrown, used for cleanup. `finalize` was a method the garbage collector might call before reclaiming an object — it was unpredictable, could resurrect objects, and is DEPRECATED for removal. Use try-with-resources or a `Cleaner` instead.',
      hinglish:
        '`final` ek modifier hai: ek final variable dobara assign nahi ho sakta, ek final method override nahi ho sakti, ek final class extend nahi ho sakti. `finally` ek block hai jo exception aaye ya na aaye chalta hai, safai ke liye. `finalize` ek method thi jise garbage collector ek object hataane se pehle call kar sakta tha — ye anpredictable thi, objects wapas jinda kar sakti thi, aur hataane ke liye DEPRECATED hai. Uske bajaye try-with-resources ya ek `Cleaner` use karo.',
    },
  },
  {
    question: 'What is try-with-resources?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Any resource declared in the `try(...)` header and implementing `AutoCloseable` is closed automatically when the block exits, in reverse order, whether normally or via an exception. It replaces the old nested `finally` blocks, which were verbose and easy to get wrong. Crucially it also handles SUPPRESSED exceptions: if both the body and `close()` throw, the close exception is attached to the primary one rather than silently replacing it, which the manual pattern got wrong.',
      hinglish:
        '`try(...)` header mein bataya aur `AutoCloseable` implement karta koi bhi resource block khatam hone pe apne aap band ho jaata hai, ulte kram mein, chahe normally ya ek exception se. Ye purane nested `finally` blocks ko badalta hai, jo lambe aur galat karna aasaan the. Critically ye DABAAYE gaye exceptions bhi sambhalta hai: agar body aur `close()` dono throw karein, close ka exception mukhya wale se juda jaata hai use chupke se badalne ke bajaye, jo manual pattern galat karta tha.',
    },
  },
  {
    question: 'What is the difference between == and equals for wrapper types?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`==` compares references. Java CACHES `Integer` values from -128 to 127, so `Integer a = 127, b = 127; a == b` is true, while the same code with 128 is FALSE — the classic autoboxing trap. Always use `equals` for wrapper comparison, or unbox to primitives explicitly. The same caching applies to `Boolean`, `Byte`, `Character`, and small `Long` values, and it produces bugs that appear only with larger data.',
      hinglish:
        '`==` references compare karta hai. Java -128 se 127 tak `Integer` values CACHE karta hai, isliye `Integer a = 127, b = 127; a == b` true hai, jabki 128 ke saath wahi code JHOOTH hai — classic autoboxing jaal. Wrapper tulna ke liye hamesha `equals` use karo, ya explicitly primitives mein unbox karo. Wahi caching `Boolean`, `Byte`, `Character`, aur chhoti `Long` values pe lagti hai, aur ye aise bugs banati hai jo sirf bade data ke saath dikhte hain.',
    },
  },
  {
    question: 'What are Java generics and what is type erasure?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Generics give compile-time type safety and remove casts — `List<String>` cannot hold an Integer. But they are implemented by ERASURE: the type argument is removed at compile time, so at runtime a `List<String>` is just a `List`. That is why you cannot write `new T[]`, cannot use `instanceof List<String>`, and cannot overload on `List<String>` versus `List<Integer>`. Erasure was chosen for backward compatibility with pre-generics code.',
      hinglish:
        'Generics compile-waqt type surakshaa dete hain aur casts hataate hain — ek `List<String>` ek Integer nahi rakh sakti. Par wo ERASURE se bane hain: type argument compile waqt hata diya jaata hai, isliye runtime pe ek `List<String>` bas ek `List` hai. Isiliye tum `new T[]` nahi likh sakte, `instanceof List<String>` use nahi kar sakte, aur `List<String>` versus `List<Integer>` pe overload nahi kar sakte. Erasure generics se pehle ke code ke saath compatibility ke liye chuna gaya tha.',
    },
  },
  {
    question: 'What is the difference between extends and super in generics?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'They control variance. `? extends T` is an upper bound, so you can READ items as T but cannot add any — the list might be of a narrower subtype. `? super T` is a lower bound, so you can WRITE T into it but reads come back as Object. The mnemonic is PECS: Producer Extends, Consumer Super. That is why `Collections.copy` takes `List<? super T>` as the destination and `List<? extends T>` as the source.',
      hinglish:
        'Wo variance control karte hain. `? extends T` ek upar ki seema hai, isliye tum items ko T ki tarah PADH sakte ho par kuch jod nahi sakte — list ek sankre subtype ki ho sakti hai. `? super T` ek neeche ki seema hai, isliye tum usme T LIKH sakte ho par padhne pe Object aata hai. Yaad rakhne ka tareeka PECS hai: Producer Extends, Consumer Super. Isiliye `Collections.copy` destination ke liye `List<? super T>` aur source ke liye `List<? extends T>` leta hai.',
    },
  },
  {
    question: 'What are Java Streams and when should you use them?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Streams express operations over a sequence declaratively — `filter`, `map`, `reduce`, `collect` — with LAZY intermediate operations that only run when a terminal operation is invoked, allowing fusion into a single pass. They make transformation pipelines readable. They are not automatically faster than a loop; for a simple iteration a loop is often quicker and easier to debug. Use them for pipelines, and be cautious with `parallelStream`, which helps only for large CPU-bound work.',
      hinglish:
        'Streams ek anukram pe operations declaratively batate hain — `filter`, `map`, `reduce`, `collect` — SUST beech ke operations ke saath jo sirf ek terminal operation pe chalte hain, ek hi pass mein judne dete hue. Ye transformation pipelines padhne layak banate hain. Ye ek loop se apne aap tez nahi hain; ek simple iteration ke liye ek loop aksar tez aur debug karna aasaan hai. Inhe pipelines ke liye use karo, aur `parallelStream` se saavdhaan raho, jo sirf bade CPU-bound kaam ke liye madad karta hai.',
    },
  },
  {
    question: 'When does parallelStream actually help?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Only when the dataset is large, the per-element work is CPU-bound and substantial, the source splits evenly (an array or ArrayList, not a LinkedList), and the operations are stateless and side-effect free. Otherwise the cost of splitting and merging outweighs the gain and it is SLOWER. It also uses the shared common ForkJoinPool by default, so a blocking operation inside one can starve the entire application. Measure rather than assume.',
      hinglish:
        'Sirf tab jab dataset bada ho, per-element kaam CPU-bound aur kaafi ho, source barabar batta ho (ek array ya ArrayList, LinkedList nahi), aur operations bina state aur bina side-effect ke hon. Warna baantne aur milaane ka cost faayde se zyada hai aur ye SLOW hai. Ye default se saanjha common ForkJoinPool bhi use karta hai, isliye uske andar ek blocking operation poore application ko bhookha maar sakta hai. Maano nahi, maapo.',
    },
  },
  {
    question: 'What is Optional and how should you use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`Optional<T>` makes the possible absence of a value explicit in the type, encouraging the caller to handle it. Use it as a RETURN type for methods that may find nothing. Do NOT use it for fields, parameters, or collections — a collection should be empty rather than optional. And never call `.get()` without checking, which just reintroduces the NPE with extra steps; prefer `orElse`, `orElseThrow`, `map`, and `ifPresent`.',
      hinglish:
        '`Optional<T>` ek value ke gayab hone ki sambhavna ko type mein saaf karta hai, caller ko use sambhaalne ko kehta hua. Ise un methods ke RETURN type ki tarah use karo jo kuch na paayein. Ise fields, parameters, ya collections ke liye use MAT karo — ek collection optional ke bajaye khaali honi chahiye. Aur bina check kiye kabhi `.get()` mat call karo, jo bas extra kadmon ke saath NPE wapas le aata hai; `orElse`, `orElseThrow`, `map`, aur `ifPresent` prefer karo.',
    },
  },
  {
    question: 'What is a lambda expression and a functional interface?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A functional interface has exactly ONE abstract method, so a lambda can implement it concisely — `Runnable`, `Comparator`, `Function`, `Predicate`, `Supplier`, `Consumer`. `@FunctionalInterface` makes the compiler enforce that. A lambda is not simply syntactic sugar for an anonymous class: it has no separate `this` (it refers to the enclosing instance), generates no extra class file, and is implemented via `invokedynamic`.',
      hinglish:
        'Ek functional interface mein theek EK abstract method hoti hai, isliye ek lambda use chhote roop mein bana sakta hai — `Runnable`, `Comparator`, `Function`, `Predicate`, `Supplier`, `Consumer`. `@FunctionalInterface` compiler se wo enforce karwaata hai. Ek lambda ek anonymous class ka bas syntactic sugar nahi hai: uska apna `this` nahi hota (wo baahar wale instance ko batata hai), koi extra class file nahi banti, aur ye `invokedynamic` se banta hai.',
    },
  },
  {
    question: 'How does garbage collection work in Java?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The GC reclaims objects no longer REACHABLE from GC roots such as stack frames and static fields. Most collectors are generational, based on the observation that most objects die young: new objects go in the young generation and are collected cheaply, while survivors are promoted to the old generation, collected less often but more expensively. G1 is the modern default, with ZGC and Shenandoah offering very low pause times for large heaps.',
      hinglish:
        'GC un objects ko wapas leta hai jo ab stack frames aur static fields jaise GC roots se PAHUNCH ke bahar hain. Zyadatar collectors generational hain, is baat pe ki zyadatar objects jaldi marte hain: naye objects young generation mein jaate hain aur saste mein hataye jaate hain, jabki bache hue old generation mein bhej diye jaate hain, kam baar par zyada mehnge dhang se hataye jaate hue. G1 modern default hai, ZGC aur Shenandoah bade heaps ke liye bahut kam ruknay ka samay dete hain.',
    },
  },
  {
    question: 'Can you have a memory leak in Java?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Yes. Garbage collection reclaims unreachable objects, but an object you still REFERENCE is never collected even if you no longer need it. Common causes: a static collection that only ever grows, listeners registered but never removed, unclosed resources, a `ThreadLocal` not cleared in a pooled thread, and a mutable key whose hash changed. Diagnose with a heap dump and a tool such as VisualVM or MAT, looking for the growing retained set.',
      hinglish:
        'Haan. Garbage collection pahunch se bahar objects wapas leta hai, par ek object jise tum abhi bhi REFERENCE karte ho kabhi nahi hataya jaata chahe tumhe uski zaroorat na ho. Common karan: ek static collection jo sirf badhti hai, register kiye par kabhi hataye na gaye listeners, band na kiye resources, ek pooled thread mein saaf na kiya `ThreadLocal`, aur ek badalne layak key jiska hash badal gaya. Ek heap dump aur VisualVM ya MAT jaise ek tool se jaancho, badhta retained set dhoondhte hue.',
    },
  },
  {
    question: 'What is the difference between a process and a thread in Java?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A process has its own memory space; a THREAD shares the heap with other threads in the same process while having its own stack. Sharing makes communication cheap but introduces race conditions, so shared mutable state needs synchronisation. Java threads are OS threads, which are relatively expensive — hence thread pools. Project Loom\'s virtual threads change this: they are managed by the JVM and cheap enough to create millions.',
      hinglish:
        'Ek process ki apni memory jagah hoti hai; ek THREAD usi process ke doosre threads ke saath heap share karta hai jabki uska apna stack hota hai. Share karna baat karna sasta banata hai par race conditions laata hai, isliye saanjhi badalne layak state ko synchronisation chahiye. Java threads OS threads hain, jo relatively mehnge hain — isiliye thread pools. Project Loom ke virtual threads ise badalte hain: unhe JVM sambhalta hai aur wo itne saste hain ki lakhon banaye ja sakte hain.',
    },
  },
  {
    question: 'What does the synchronized keyword do?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`synchronized` acquires a monitor lock so only one thread executes the block at a time, which provides MUTUAL EXCLUSION. Just as importantly it establishes a happens-before relationship, so changes made by one thread become VISIBLE to the next — without that, another thread might read a stale cached value indefinitely. Synchronise on a private final object rather than `this` or a class literal, so external code cannot interfere with your lock.',
      hinglish:
        '`synchronized` ek monitor lock leta hai taaki ek waqt mein sirf ek thread block chalaye, jo AAPSI ROK deta hai. Utna hi zaroori, ye ek happens-before rishta banata hai, isliye ek thread ke kiye badlaav agle ko DIKHTE hain — uske bina, ek doosra thread hamesha ke liye ek purani cached value padh sakta hai. `this` ya ek class literal ke bajaye ek private final object pe synchronise karo, taaki bahar ka code tumhare lock mein dakhal na de.',
    },
  },
  {
    question: 'What does volatile do and when is it enough?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`volatile` guarantees VISIBILITY — a write is immediately visible to other threads and reads are never cached — and prevents certain instruction reorderings. It does NOT provide atomicity, so `count++` on a volatile field is still a race because it is a read-modify-write. It is enough for a simple flag such as a shutdown signal, or for the double-checked locking singleton. For counters use `AtomicInteger`, and for compound state use a lock.',
      hinglish:
        '`volatile` DIKHNE ki guarantee deta hai — ek write turant doosre threads ko dikhta hai aur reads kabhi cache nahi hote — aur kuch instruction reorderings rokta hai. Ye atomicity NAHI deta, isliye ek volatile field pe `count++` abhi bhi ek race hai kyunki ye ek read-modify-write hai. Ye ek shutdown signal jaise simple flag ke liye kaafi hai, ya double-checked locking singleton ke liye. Counters ke liye `AtomicInteger` use karo, aur judi hui state ke liye ek lock.',
    },
  },
  {
    question: 'What is the difference between HashMap and ConcurrentHashMap?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`HashMap` is not thread-safe — concurrent modification can corrupt it, and in older Java could even cause an infinite loop during resize. `Collections.synchronizedMap` locks the WHOLE map per operation, which serialises everything. `ConcurrentHashMap` locks only individual bins, allowing genuine concurrent reads and mostly concurrent writes, and provides atomic operations such as `computeIfAbsent` and `merge`. Its iterators are weakly consistent rather than fail-fast.',
      hinglish:
        '`HashMap` thread-safe nahi hai — ek saath badalna use bigaad sakta hai, aur purane Java mein resize ke dauraan ek anant loop bhi bana sakta tha. `Collections.synchronizedMap` per operation POORE map ko lock karta hai, jo sab ek-ek karke chalata hai. `ConcurrentHashMap` sirf alag bins lock karta hai, genuine ek saath reads aur zyadatar ek saath writes dete hue, aur `computeIfAbsent` aur `merge` jaise atomic operations deta hai. Iske iterators fail-fast ke bajaye kamzor consistent hain.',
    },
  },
  {
    question: 'What is a deadlock and how do you avoid it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A deadlock occurs when two threads each hold a lock the other needs, so neither proceeds — and unlike a database, the JVM does not detect or resolve it, so the application simply hangs. Avoid it by acquiring locks in a CONSISTENT GLOBAL ORDER everywhere, holding locks for as short a time as possible, using `tryLock` with a timeout, or avoiding shared mutable state entirely with immutable objects and message passing.',
      hinglish:
        'Ek deadlock tab hota hai jab do threads mein har ek wo lock rakhta ho jo doosre ko chahiye, isliye koi aage nahi badhta — aur ek database ke ulat, JVM ise pakadta ya sulhaata nahi, isliye application bas latak jaata hai. Ise har jagah locks ek EK JAISE VAISHVIK KRAM mein lekar, locks jitna kam ho sake utni der rakh kar, ek timeout ke saath `tryLock` use karke, ya immutable objects aur message passing se saanjhi badalne layak state poori tarah bacha kar avoid karo.',
    },
  },
  {
    question: 'What is the ExecutorService and why use it over raw threads?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An ExecutorService manages a POOL of reusable threads, so you submit tasks rather than creating threads. Thread creation is expensive and unbounded creation exhausts memory, whereas a pool bounds concurrency and queues excess work. It also returns a `Future` for the result, handles exceptions properly, and supports orderly shutdown. Choose the pool type deliberately: a fixed pool for CPU-bound work sized to cores, and a cached or virtual-thread executor for I/O-bound work.',
      hinglish:
        'Ek ExecutorService dobara istemaal hone wale threads ka ek POOL sambhalta hai, isliye tum threads banane ke bajaye tasks bhejte ho. Thread banana mehnga hai aur bina seema banana memory khatam kar deta hai, jabki ek pool concurrency seemit karta hai aur zyada kaam queue karta hai. Ye nateeje ke liye ek `Future` bhi deta hai, exceptions theek sambhalta hai, aur kramwaar shutdown deta hai. Pool type soch kar chuno: CPU-bound kaam ke liye cores ke hisaab se ek fixed pool, aur I/O-bound kaam ke liye ek cached ya virtual-thread executor.',
    },
  },
  {
    question: 'What are virtual threads in Java 21?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Virtual threads are lightweight threads managed by the JVM rather than the OS, so you can create millions instead of thousands. When one blocks on I/O it UNMOUNTS from its carrier thread, freeing it for other work. The practical effect is that simple blocking code achieves the scalability that previously required reactive programming, without the complexity. The main caveat is that `synchronized` blocks can pin a virtual thread, so prefer `ReentrantLock`.',
      hinglish:
        'Virtual threads halke threads hain jinhe OS ke bajaye JVM sambhalta hai, isliye tum hazaaron ke bajaye lakhon bana sakte ho. Jab ek I/O pe rukta hai to wo apne carrier thread se UTAR jaata hai, use doosre kaam ke liye khaali karte hue. Vyavaharik asar ye hai ki simple blocking code wo scalability paata hai jiske liye pehle reactive programming chahiye thi, bina uski uljhan ke. Mukhya caveat ye hai ki `synchronized` blocks ek virtual thread ko baandh sakte hain, isliye `ReentrantLock` prefer karo.',
    },
  },
  {
    question: 'What is a record in Java?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A record is a concise, immutable data carrier: `record Point(int x, int y) {}` generates the constructor, accessors, `equals`, `hashCode`, and `toString` correctly. It removes an enormous amount of boilerplate and, more importantly, removes the chance of getting `equals` and `hashCode` subtly wrong. Records are final, cannot extend a class, and their fields are final — so they suit DTOs and value objects, not entities with mutable state.',
      hinglish:
        'Ek record ek chhota, immutable data le jaane wala hai: `record Point(int x, int y) {}` constructor, accessors, `equals`, `hashCode`, aur `toString` sahi bana deta hai. Ye bahut saara boilerplate hataata hai aur, zyada zaroori, `equals` aur `hashCode` ko sookshm roop se galat karne ka mauka hataata hai. Records final hain, ek class extend nahi kar sakte, aur unke fields final hain — isliye wo DTOs aur value objects ko suit karte hain, badalne layak state wali entities ko nahi.',
    },
  },
  {
    question: 'What are sealed classes?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A sealed class or interface restricts which types may extend or implement it, listed explicitly with `permits`. That makes the hierarchy CLOSED and known to the compiler, which enables exhaustive pattern matching in a `switch` — if you add a new permitted subtype, every switch that does not handle it fails to compile. Combined with records it gives Java algebraic data types, which model a fixed set of alternatives far more safely than an open hierarchy.',
      hinglish:
        'Ek sealed class ya interface seemit karta hai ki kaunse types use extend ya implement kar sakte hain, `permits` se explicitly list karke. Isse hierarchy BAND aur compiler ko pata ho jaati hai, jo ek `switch` mein poora pattern matching deta hai — agar tum ek naya allowed subtype jodo, har wo switch jo use nahi sambhalta compile hone se mana kar deta hai. Records ke saath ye Java ko algebraic data types deta hai, jo ek khuli hierarchy se bahut zyada surakshit roop se vikalpon ka ek tay set batate hain.',
    },
  },
  {
    question: 'What is the difference between Comparable and Comparator?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`Comparable` defines a class\'s NATURAL ordering by implementing `compareTo` inside the class itself — there can be only one. `Comparator` is an external strategy, so you can define many different orderings without touching the class, which is essential for types you do not own. Modern code uses `Comparator.comparing(Foo::getName).thenComparing(...)` and `reversed()`, which is far more readable than a hand-written comparison.',
      hinglish:
        '`Comparable` ek class ka SWABHAVIK kram class ke andar hi `compareTo` bana kar batata hai — sirf ek ho sakta hai. `Comparator` ek bahar ki ranneeti hai, isliye tum class ko chhue bina bahut alag krams bana sakte ho, jo un types ke liye zaroori hai jo tumhare nahi hain. Modern code `Comparator.comparing(Foo::getName).thenComparing(...)` aur `reversed()` use karta hai, jo ek haath se likhi tulna se bahut zyada padhne layak hai.',
    },
  },
  {
    question: 'What is the difference between static and instance members?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A STATIC member belongs to the class and exists once regardless of how many instances there are, accessed via the class name and unable to reference `this`. An INSTANCE member belongs to each object. Static suits genuine utilities and constants. The pitfalls are that static mutable state is shared across the whole application and is a common source of thread-safety bugs, and that static methods are hard to mock, which hurts testability.',
      hinglish:
        'Ek STATIC member class ka hai aur kitne bhi instances hon ek hi baar hota hai, class ke naam se access hota hai aur `this` reference nahi kar sakta. Ek INSTANCE member har object ka hai. Static genuine utilities aur constants ko suit karta hai. Khatre ye hain ki static badalne layak state poore application mein saanjhi hai aur thread-safety bugs ka ek common karan, aur static methods ko mock karna mushkil hai, jo testability bigaadta hai.',
    },
  },
  {
    question: 'What is dependency injection in Spring?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Spring\'s container creates objects (beans) and INJECTS their dependencies rather than each class constructing its own. That means a class depends on an INTERFACE it receives, so tests can pass a fake and production can pass the real thing without editing the class. Prefer CONSTRUCTOR injection over field injection: it makes dependencies explicit, allows final fields, fails fast if one is missing, and works without a Spring container in unit tests.',
      hinglish:
        'Spring ka container objects (beans) banata hai aur unki dependencies INJECT karta hai, har class ke apni banane ke bajaye. Iska matlab hai ek class ek INTERFACE pe depend karti hai jo use milta hai, isliye tests ek nakli de sakte hain aur production asli, bina class edit kiye. Field injection ke bajaye CONSTRUCTOR injection prefer karo: ye dependencies saaf karta hai, final fields deta hai, ek gayab hone pe jaldi fail hota hai, aur unit tests mein bina Spring container ke chalta hai.',
    },
  },
  {
    question: 'What is the difference between Spring and Spring Boot?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'SPRING is the underlying framework providing dependency injection, AOP, transactions, and MVC, but historically required extensive XML or Java configuration. SPRING BOOT adds AUTO-CONFIGURATION that configures beans based on what is on the classpath, opinionated starter dependencies, an embedded server so the app is a runnable jar, and production features such as Actuator. Boot does not replace Spring — it is Spring with the configuration burden removed.',
      hinglish:
        'SPRING neeche wala framework hai jo dependency injection, AOP, transactions, aur MVC deta hai, par historically bahut XML ya Java configuration maangta tha. SPRING BOOT AUTO-CONFIGURATION jodta hai jo classpath pe jo hai uske hisaab se beans configure karta hai, opinionated starter dependencies, ek andar ka server taaki app ek chalne layak jar ho, aur Actuator jaisi production features. Boot Spring ko badalta nahi — ye configuration ke bojh ke bina Spring hai.',
    },
  },
  {
    question: 'What is the N+1 query problem in JPA and Hibernate?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Fetching N entities and then accessing a lazy association per entity issues one query plus N more — 101 queries for 100 orders and their customers. It is invisible in development with ten rows and crippling in production. Fixes: a `JOIN FETCH` in JPQL, an `@EntityGraph`, or batch fetching with `@BatchSize`. Detect it by enabling SQL logging and counting statements per request; do not rely on noticing it later.',
      hinglish:
        'N entities laakar phir per entity ek sust association access karna ek query plus N aur chalata hai — 100 orders aur unke customers ke liye 101 queries. Ye das rows ke saath development mein invisible hai aur production mein apahij karne wala. Fixes: JPQL mein ek `JOIN FETCH`, ek `@EntityGraph`, ya `@BatchSize` se batch fetching. Ise SQL logging chalu karke aur per request statements gin kar pakado; ise baad mein dikhne pe bharosa mat karo.',
    },
  },
  {
    question: 'What is the difference between FetchType LAZY and EAGER?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'EAGER loads the association immediately with the parent, which is convenient but means every query drags in data you may not need, and eager collections multiply badly. LAZY loads it on first access, which is the correct default — but accessing it after the persistence context closes throws `LazyInitializationException`, the most famous Hibernate error. The fix is fetching what you need explicitly in the query, not switching everything to EAGER.',
      hinglish:
        'EAGER association ko parent ke saath turant laata hai, jo suvidhajanak hai par matlab har query wo data kheench laati hai jo shayad tumhe na chahiye, aur eager collections buri tarah guna hote hain. LAZY use pehli baar access pe laata hai, jo sahi default hai — par persistence context band hone ke baad use access karna `LazyInitializationException` throw karta hai, sabse mashhoor Hibernate error. Fix query mein jo chahiye wo explicitly laana hai, sab kuch EAGER karna nahi.',
    },
  },
  {
    question: 'What is the difference between JPA and Hibernate?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'JPA is a SPECIFICATION — a set of interfaces and annotations defining how object-relational mapping should work in Java. Hibernate is an IMPLEMENTATION of it, and the most widely used, with additional features beyond the spec. Coding against JPA keeps you portable between implementations; using Hibernate-specific features ties you to it, which is usually an acceptable trade since almost nobody actually switches implementations.',
      hinglish:
        'JPA ek SPECIFICATION hai — interfaces aur annotations ka ek set jo batata hai ki Java mein object-relational mapping kaise chalni chahiye. Hibernate uska ek IMPLEMENTATION hai, aur sabse zyada istemaal hone wala, spec se aage ke features ke saath. JPA ke against likhna tumhe implementations ke beech portable rakhta hai; Hibernate-khaas features use karna tumhe usse baandhta hai, jo usually ek sweekar trade hai kyunki almost koi actually implementation badalta nahi.',
    },
  },
  {
    question: 'How do you write good unit tests in Java?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use JUnit 5 with AssertJ for readable assertions and Mockito for test doubles. Follow arrange-act-assert, test ONE behaviour per test, and name tests after the behaviour rather than the method. Mock external dependencies but not value objects. Crucially, the biggest determinant of testability is DESIGN: constructor injection, small classes, and logic separated from I/O make tests trivial, while static calls and hidden dependencies make them painful.',
      hinglish:
        'JUnit 5 ko padhne layak assertions ke liye AssertJ aur test doubles ke liye Mockito ke saath use karo. Arrange-act-assert follow karo, per test EK behaviour test karo, aur tests ko method ke bajaye behaviour ke naam pe naam do. Bahar ki dependencies mock karo par value objects nahi. Critically, testability ka sabse bada nirdhaarak DESIGN hai: constructor injection, chhoti classes, aur I/O se alag logic tests ko aasaan banate hain, jabki static calls aur chhupi dependencies unhe takleefdeh.',
    },
  },
  {
    question: 'What are the SOLID principles in practice?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'SINGLE RESPONSIBILITY — a class should have one reason to change. OPEN-CLOSED — extend behaviour without modifying existing code, usually via an interface. LISKOV SUBSTITUTION — a subtype must be usable wherever its supertype is, without surprising the caller. INTERFACE SEGREGATION — many small interfaces beat one large one, so implementers do not stub methods they do not need. DEPENDENCY INVERSION — depend on abstractions, which is exactly what dependency injection enables.',
      hinglish:
        'SINGLE RESPONSIBILITY — ek class ke badalne ki ek wajah honi chahiye. OPEN-CLOSED — maujood code badle bina behaviour badhao, usually ek interface se. LISKOV SUBSTITUTION — ek subtype wahan use hona chahiye jahan uska supertype ho, caller ko chaunkaye bina. INTERFACE SEGREGATION — bahut chhote interfaces ek bade se behtar hain, taaki banane wale wo methods na bharein jo unhe nahi chahiye. DEPENDENCY INVERSION — abstractions pe depend karo, jo theek wahi hai jo dependency injection deta hai.',
    },
  },
  {
    question: 'What is the difference between an inner class and a static nested class?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A non-static INNER class holds an implicit reference to its enclosing instance, so it can access the outer object\'s fields — but that reference also PREVENTS the outer object from being garbage collected while the inner one lives, which is a classic memory leak in listeners and callbacks. A STATIC nested class has no such reference and is really just a top-level class scoped inside another. Prefer static unless you genuinely need the outer instance.',
      hinglish:
        'Ek non-static INNER class apne baahar wale instance ka ek chhupa reference rakhti hai, isliye wo bahar ke object ke fields access kar sakti hai — par wo reference bahar ke object ko andar wale ke jeete ji garbage collect hone se ROKTA bhi hai, jo listeners aur callbacks mein ek classic memory leak hai. Ek STATIC nested class mein aisa koi reference nahi aur wo sach mein bas ek doosre ke andar rakhi top-level class hai. Static prefer karo jab tak tumhe genuinely bahar wala instance na chahiye.',
    },
  },
  {
    question: 'What is the difference between shallow and deep copy in Java?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A SHALLOW copy duplicates the object but copies REFERENCES for its fields, so both copies share the same nested objects and mutating one affects both. A DEEP copy recursively duplicates everything. `Object.clone()` is shallow by default and its contract is widely considered broken, so prefer a copy constructor, a static factory, or serialisation-based copying. The cleanest answer is usually making the class IMMUTABLE so copying is unnecessary.',
      hinglish:
        'Ek SHALLOW copy object duplicate karti hai par uske fields ke REFERENCES copy karti hai, isliye dono copies wahi nested objects share karti hain aur ek badalna dono ko affect karta hai. Ek DEEP copy recursively sab kuch duplicate karti hai. `Object.clone()` default se shallow hai aur uska contract widely toota maana jaata hai, isliye ek copy constructor, ek static factory, ya serialisation-based copying prefer karo. Sabse saaf jawab usually class ko IMMUTABLE banana hai taaki copy karne ki zaroorat hi na ho.',
    },
  },
  {
    question: 'What is the difference between fail-fast and fail-safe iterators?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A FAIL-FAST iterator throws `ConcurrentModificationException` if the collection is structurally modified during iteration — `ArrayList` and `HashMap` behave this way, which surfaces bugs immediately rather than producing corrupt results. A FAIL-SAFE iterator works on a snapshot or a weakly consistent view and does not throw, as with `CopyOnWriteArrayList` and `ConcurrentHashMap`, at the cost of possibly not seeing the very latest changes.',
      hinglish:
        'Ek FAIL-FAST iterator `ConcurrentModificationException` throw karta hai agar iteration ke dauraan collection ka dhaancha badle — `ArrayList` aur `HashMap` aise behave karte hain, jo bugs turant dikhata hai bigde nateeje banane ke bajaye. Ek FAIL-SAFE iterator ek snapshot ya ek kamzor consistent view pe chalta hai aur throw nahi karta, jaise `CopyOnWriteArrayList` aur `ConcurrentHashMap` mein, shayad bilkul taaza badlaav na dekhne ke cost pe.',
    },
  },
  {
    question: 'What are the notable features added in recent Java versions?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Java 8 brought lambdas, streams, `Optional`, and the new date-time API. 11 added `var` for locals and HTTP Client. 17 added sealed classes, records, and pattern matching for `instanceof`. 21 — the current LTS — added virtual threads, pattern matching for `switch`, and record patterns. The practical point is that Java has moved substantially towards conciseness and functional style, and a codebase still written in Java 8 idioms is leaving a lot on the table.',
      hinglish:
        'Java 8 lambdas, streams, `Optional`, aur naya date-time API laaya. 11 ne locals ke liye `var` aur HTTP Client jode. 17 ne sealed classes, records, aur `instanceof` ke liye pattern matching jode. 21 — abhi ka LTS — ne virtual threads, `switch` ke liye pattern matching, aur record patterns jode. Vyavaharik baat ye hai ki Java kaafi chhote aur functional roop ki taraf badha hai, aur abhi bhi Java 8 ke tareekon mein likha ek codebase bahut kuch chhod raha hai.',
    },
  },
];
