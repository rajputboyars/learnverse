// Python curriculum — beginner -> intermediate -> advanced.
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
  title: 'Python',
  slug: 'python',
  description:
    'Sabse beginner-friendly language — syntax, data structures, OOP aur real-world scripting. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🐍',
  tags: ['python', 'programming', 'backend', 'scripting'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 18,
};

const beginner = [
  {
    title: 'Python Basics',
    level: 'beginner',
    description: 'Python kya hai, variables, data types aur input/output.',
    concepts: [
      {
        title: 'The Story of Python — What, Why & How',
        difficulty: 'easy',
        tags: ['intro', 'story', 'basics'],
        explanation: {
          english:
            'Imagine two students solving the same problem. 🧑‍💻 Aman writes 30 lines of code in another language just to print numbers and read a file. Riya opens Python and finishes in 3 lines that almost read like plain English: open the file, loop over it, print. The teacher smiles — both got the answer, but Riya is already on her next problem. That is the magic people fall in love with: Python gets out of your way so you can think about the problem, not the punctuation.\n\nWHAT is Python? It is a high-level, general-purpose programming language. "High-level" means it hides the messy machine details (memory, pointers) and lets you write code close to how you think. "General-purpose" means it is not locked to one job — the same language builds websites, crunches data, trains AI models, automates boring tasks, and writes small scripts. It is famous for being readable: code looks like a recipe written in English.\n\nWHY do millions love it? 🐍 First, it is easy to learn — clean syntax, no curly braces, indentation gives structure. Second, it has a HUGE ecosystem of libraries — Django and Flask for web, Pandas and NumPy for data, TensorFlow and PyTorch for AI, requests for the internet. You rarely build from scratch; you stand on the shoulders of giants. Third, it has one of the largest, friendliest communities, so help is always a search away.\n\nHOW does Python actually run? You write your code in a file ending with .py. Python is an INTERPRETED language: an "interpreter" reads your file line by line, translates each line into instructions the computer understands, and runs it immediately — no separate "build" step needed. Type `python myfile.py` in the terminal and watch it come alive. ✨ That instant feedback loop is why Python is the world\'s favourite first language.',
          hinglish:
            'Socho do students same problem solve kar rahe hain. 🧑‍💻 Aman doosri language mein sirf numbers print karne aur ek file padhne ke liye 30 lines likhta hai. Riya Python kholti hai aur 3 lines mein kaam khatam — jo padhne mein lagbhag English jaisi lagti hain: file kholo, loop chalao, print karo. Teacher muskuraata hai — answer dono ka sahi hai, par Riya already agli problem par hai. Yahi cheez hai jise log pasand karte hain: Python tumhare raaste se hat jaati hai taaki tum problem ke baare mein socho, punctuation ke baare mein nahi.\n\nPython hai KYA? Ye ek high-level, general-purpose programming language hai. "High-level" ka matlab ye machine ki gandi details (memory, pointers) chhupa deti hai aur tumhe waisa code likhne deti hai jaise tum sochte ho. "General-purpose" ka matlab ye ek hi kaam tak limited nahi — wahi language websites banati hai, data crunch karti hai, AI models train karti hai, boring kaam automate karti hai, aur chote scripts likhti hai. Python ki sabse khaas baat ye hai ki ye padhne mein English jaisi lagti hai — code ek recipe jaisa dikhta hai.\n\nLog ise KYUN pasand karte hain? 🐍 Pehla, ye seekhna easy hai — clean syntax, koi curly braces nahi, indentation se structure banta hai. Doosra, iske paas libraries ka ek BAHUT BADA ecosystem hai — web ke liye Django aur Flask, data ke liye Pandas aur NumPy, AI ke liye TensorFlow aur PyTorch, internet ke liye requests. Tum shayad hi zero se banao; tum doosron ke ready code par khade ho. Teesra, iski community sabse badi aur friendly hai, toh help hamesha ek search door hai.\n\nPython chalti KAISE hai? Tum apna code ek file mein likhte ho jiska naam .py se khatam hota hai. Python ek INTERPRETED language hai: ek "interpreter" tumhari file ko line by line padhta hai, har line ko computer ki samajh wale instructions mein translate karta hai, aur turant chala deta hai — koi alag "build" step ki zaroorat nahi. Terminal mein `python myfile.py` likho aur dekho ye zinda ho jaati hai. ✨ Yahi instant feedback Python ko duniya ki favourite pehli language banata hai.',
        },
        dailyLifeExample:
          'Python seekhna waisa hai jaise apni maa ki bhasha mein recipe padhna — "ek pyaaz kaato, garam tel mein daalo, bhuno". Doosri languages waisi hain jaise wahi recipe kisi tough technical manual mein likhi ho — sahi to hai, par padhne mein dimaag ka dahi ho jaata hai. Python kehti hai "jo socho, lagbhag waisa hi likho".',
        codeExample:
          '# This is your first Python file: hello.py\n# Run it in the terminal with:  python hello.py\n\nprint("Namaste, Python!")\n\n# Python reads almost like English\nname = "Riya"\nprint("Hello,", name)\n\n# 3 readable lines to greet 5 friends\nfriends = ["Aman", "Riya", "Sahil", "Neha", "Vikram"]\nfor friend in friends:\n    print("Welcome,", friend)',
        keyPoints: [
          'Python is high-level (hides machine details) and general-purpose (web, data, AI, scripting)',
          'Loved for readability — code reads almost like English',
          'Huge library ecosystem: Django, Flask, Pandas, NumPy, TensorFlow',
          'Interpreted: the interpreter runs your .py file line by line — no build step',
          'Run a program with: python myfile.py',
        ],
        quiz: [
          {
            question: 'How does Python run your code?',
            options: [
              'It compiles the whole program to a .exe before running',
              'An interpreter reads and runs the .py file line by line',
              'It runs only inside a web browser',
              'You must convert it to C first',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why is Python considered beginner-friendly?',
            options: [
              'It uses lots of curly braces and semicolons',
              'Its clean, English-like syntax and huge library ecosystem make it easy to learn',
              'It only works for AI and nothing else',
              'It has no community support',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Is Python compiled or interpreted? Explain.',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'Python is primarily an interpreted language. When you run a .py file, the CPython interpreter first compiles your source to intermediate bytecode (.pyc) and then a virtual machine executes that bytecode line by line — there is no separate manual build step like in C/C++. This gives Python its fast write-run-debug loop and platform independence, at the cost of slower raw execution speed compared to fully compiled languages.',
              hinglish:
                'Python mukhya roop se ek interpreted language hai. Jab tum ek .py file run karte ho, CPython interpreter pehle tumhare source ko intermediate bytecode (.pyc) mein compile karta hai aur phir ek virtual machine us bytecode ko line by line execute karta hai — C/C++ jaisa koi alag manual build step nahi hota. Isse Python ka fast write-run-debug loop aur platform independence milta hai, bas raw speed fully compiled languages se thodi slow hoti hai.',
            },
          },
        ],
      },
      {
        title: 'Variables, Data Types & I/O',
        difficulty: 'easy',
        tags: ['variables', 'data-types', 'input', 'output'],
        explanation: {
          english:
            'A variable is a name that points to a value — no type declaration needed; just assign with `=`. Python is dynamically typed, so a variable can hold a number now and a string later. Core built-in types: int (whole numbers), float (decimals), str (text), bool (True/False), and None (no value). Use `print()` to show output and `input()` to read text from the user — remember input() always returns a str, so convert with int() or float() when you need numbers. Use `type()` to inspect a value\'s type and `#` to write comments the interpreter ignores.',
          hinglish:
            'Variable ek naam hai jo kisi value ko point karta hai — type declare karne ki zaroorat nahi; bas `=` se assign karo. Python dynamically typed hai, isliye ek variable abhi number rakh sakta hai aur baad mein string. Core built-in types: int (poore numbers), float (decimals), str (text), bool (True/False), aur None (koi value nahi). Output dikhane ke liye `print()` aur user se text padhne ke liye `input()` use karo — yaad rakho input() hamesha str return karta hai, toh numbers chahiye to int() ya float() se convert karo. Kisi value ka type dekhne ke liye `type()` aur comments likhne ke liye `#` use karo jise interpreter ignore karta hai.',
        },
        dailyLifeExample:
          'Variable ek dabba (container) hai jis par tum sticker laga dete ho — sticker pe "age" likho aur andar 25 rakho. Baad mein chaaho to wahi dabba khaali karke usme "naam" rakh do. Python tumse pehle nahi poochti ki dabbe mein kya rakhoge — jab rakhoge tab dekh legi.',
        codeExample:
          '# Variables — no type keyword needed\nname = "Riya"        # str\nage = 21             # int\nheight = 5.4         # float\nis_student = True    # bool\nmiddle_name = None   # None (no value yet)\n\n# Check types\nprint(type(age))       # <class \'int\'>\nprint(type(height))    # <class \'float\'>\n\n# Output\nprint("Name:", name, "Age:", age)\n\n# Input — always returns a string\ncity = input("Which city are you from? ")\n\n# Convert input to a number\nbirth_year = int(input("Enter your birth year: "))\nprint("You will turn 30 in", birth_year + 30)',
        keyPoints: [
          'Assign with = ; no type keyword needed (dynamically typed)',
          'Core types: int, float, str, bool, None',
          'print() shows output; input() reads user text',
          'input() always returns str — wrap in int()/float() for numbers',
          'type(x) inspects a value; # starts a comment',
        ],
        quiz: [
          {
            question: 'What type does input() always return?',
            options: ['int', 'str', 'float', 'It matches what the user typed'],
            correctIndex: 1,
          },
          {
            question: 'Which value represents "no value" in Python?',
            options: ['0', 'null', 'None', 'empty'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What does "dynamically typed" mean in Python?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Dynamically typed means you do not declare a variable\'s type — the type is associated with the value at runtime, not the variable. The same variable can hold an int, then later a string, and Python figures out the type on the fly. This makes code concise and flexible, but type errors surface at runtime rather than compile time, so good tests and optional type hints help catch bugs early.',
              hinglish:
                'Dynamically typed ka matlab tum variable ka type declare nahi karte — type runtime par value ke saath juda hota hai, variable ke saath nahi. Wahi variable pehle int rakh sakta hai aur baad mein string, aur Python type khud samajh leta hai. Isse code chhota aur flexible banta hai, par type errors compile time ke bajaye runtime par aate hain, isliye acche tests aur optional type hints bugs jaldi pakadne mein help karte hain.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Operators & Strings',
    level: 'beginner',
    description: 'Arithmetic, comparison, logical operators aur string handling.',
    concepts: [
      {
        title: 'Operators in Python',
        difficulty: 'easy',
        tags: ['operators', 'arithmetic', 'logical'],
        explanation: {
          english:
            'Operators combine or compare values. Arithmetic: + - * / (true division, always a float), // (floor/integer division), % (modulo/remainder), ** (power). Comparison: == != > < >= <= return a bool. Logical: `and`, `or`, `not` combine boolean conditions and short-circuit (stop evaluating early when the result is already known). Assignment shortcuts like += and *= update a variable in place. Membership operators `in` and `not in` test if a value is inside a collection or string.',
          hinglish:
            'Operators values ko combine ya compare karte hain. Arithmetic: + - * / (true division, hamesha float), // (floor/integer division), % (modulo/remainder), ** (power). Comparison: == != > < >= <= ek bool return karte hain. Logical: `and`, `or`, `not` boolean conditions combine karte hain aur short-circuit karte hain (result pata chalte hi aage evaluate karna rok dete hain). Assignment shortcuts jaise += aur *= variable ko wahin update karte hain. Membership operators `in` aur `not in` check karte hain ki value kisi collection ya string ke andar hai ya nahi.',
        },
        dailyLifeExample:
          'Modulo (%) sabzi waale ka hisaab hai — 17 aam ko 5-5 ke packets mein baanto, % batata hai kitne aam bach gaye (2). Floor division (//) batata hai kitne poore packets bane (3). Aur `and`/`or` waise hi hain jaise "agar paise hain AND dukaan khuli hai to hi kharido".',
        codeExample:
          '# Arithmetic\nprint(7 / 2)    # 3.5  (true division -> float)\nprint(7 // 2)   # 3    (floor division)\nprint(7 % 2)    # 1    (remainder)\nprint(2 ** 5)   # 32   (power)\n\n# Comparison -> bool\nprint(10 > 3)        # True\nprint(5 == "5")      # False (int vs str)\n\n# Logical with short-circuit\nage = 20\nprint(age >= 18 and age < 60)   # True\nprint(not False)                # True\n\n# Assignment shortcut & membership\nscore = 10\nscore += 5            # score is now 15\nprint("a" in "Aman")  # True',
        keyPoints: [
          '/ is float division; // is floor division; % is remainder; ** is power',
          'Comparison operators return bool (True/False)',
          'and/or/not combine conditions and short-circuit',
          '+= -= *= update a variable in place',
          'in / not in test membership in strings and collections',
        ],
        quiz: [
          {
            question: 'What does 17 % 5 evaluate to?',
            options: ['3', '2', '3.4', '12'],
            correctIndex: 1,
          },
          {
            question: 'What is the result of 2 ** 4?',
            options: ['8', '16', '6', '24'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between / and // in Python?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                '`/` is true division and always returns a float, even for evenly divisible numbers — 6 / 2 gives 3.0. `//` is floor division: it divides and rounds the result down to the nearest whole number toward negative infinity, returning an int when both operands are ints — 7 // 2 gives 3, and -7 // 2 gives -4. Use // when you need integer counts like pages, batches, or indices.',
              hinglish:
                '`/` true division hai aur hamesha float return karta hai, chahe number poora hi divide ho — 6 / 2 deta hai 3.0. `//` floor division hai: ye divide karke result ko neeche nearest poore number tak (negative infinity ki taraf) round karta hai, aur dono operands int hon to int return karta hai — 7 // 2 deta hai 3, aur -7 // 2 deta hai -4. Jab integer counts chahiye jaise pages, batches, ya indices, tab // use karo.',
            },
          },
        ],
      },
      {
        title: 'Strings & f-strings',
        difficulty: 'easy',
        tags: ['strings', 'f-strings', 'methods'],
        explanation: {
          english:
            'A string is an immutable sequence of characters written in single or double quotes. Because strings are immutable, methods return a NEW string rather than changing the original. Handy methods: .upper(), .lower(), .strip() (trim whitespace), .replace(old, new), .split(sep) (string -> list), .join(list) (list -> string), .find()/.startswith()/.endswith(). You can index (s[0]) and slice (s[1:4]) like a list. The cleanest way to build text is f-strings: put an f before the quote and drop variables inside {curly braces}.',
          hinglish:
            'String characters ka ek immutable sequence hai jo single ya double quotes mein likha jaata hai. Strings immutable hone ki wajah se methods original ko badalne ke bajaye ek NAYI string return karte hain. Kaam ke methods: .upper(), .lower(), .strip() (whitespace trim), .replace(old, new), .split(sep) (string -> list), .join(list) (list -> string), .find()/.startswith()/.endswith(). List ki tarah index (s[0]) aur slice (s[1:4]) kar sakte ho. Text banane ka sabse saaf tareeka f-strings hai: quote se pehle f lagao aur {curly braces} mein variables daal do.',
        },
        dailyLifeExample:
          'f-string waise hai jaise shaadi ka invitation card template — "Pyaare {naam} ji, aapko {date} ko aana hai". Tum bas blank {naam} aur {date} bhar dete ho aur poora card ban jaata hai. Har mehmaan ke liye naya naam daalo, baaki sab same.',
        codeExample:
          'name = "  Riya Sharma  "\n\n# Methods return NEW strings (original unchanged)\nprint(name.strip())          # "Riya Sharma"\nprint(name.upper())          # "  RIYA SHARMA  "\nprint(name.strip().split())  # [\'Riya\', \'Sharma\']\n\n# Indexing and slicing\ncity = "Mumbai"\nprint(city[0])     # M\nprint(city[1:4])   # umb\nprint(city[-1])    # i (last char)\n\n# f-strings — the clean way to build text\nuser = "Aman"\nage = 21\nprint(f"Hi {user}, next year you will be {age + 1}.")\n\n# join a list into one string\nwords = ["learn", "python", "today"]\nprint("-".join(words))   # learn-python-today',
        keyPoints: [
          'Strings are immutable — methods return a new string',
          'Common methods: upper, lower, strip, replace, split, join',
          'Index s[0] and slice s[1:4]; s[-1] is the last char',
          'f-strings: f"... {variable} ..." embed values cleanly',
          'split() turns a string into a list; join() does the reverse',
        ],
        quiz: [
          {
            question: 'What does "Hello".replace("l", "L") return?',
            options: ['Changes the original string', '"HeLLo"', '"Hello"', 'An error because strings are immutable'],
            correctIndex: 1,
          },
          {
            question: 'Which is the correct f-string syntax?',
            options: ['f"Hi {name}"', '"Hi {name}"f', 'format"Hi {name}"', 'f("Hi", name)'],
            correctIndex: 0,
          },
        ],
        interviewQuestions: [
          {
            question: 'What does it mean that strings in Python are immutable?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Immutable means a string object cannot be changed after it is created. Methods like .upper() or .replace() do not modify the original; they return a brand new string, leaving the original untouched. So `s = "hi"; s.upper()` does not change s — you must reassign with `s = s.upper()`. Immutability makes strings hashable (usable as dict keys), thread-safe to share, and lets Python cache small strings, but it means heavy concatenation in a loop is inefficient — prefer building a list and "".join() it.',
              hinglish:
                'Immutable ka matlab ek string object banne ke baad badla nahi jaa sakta. .upper() ya .replace() jaise methods original ko modify nahi karte; wo ek bilkul nayi string return karte hain aur original ko waisa hi chhod dete hain. Toh `s = "hi"; s.upper()` se s nahi badlega — tumhe `s = s.upper()` se reassign karna padega. Immutability strings ko hashable banati hai (dict keys ban sakte hain), share karne mein thread-safe banati hai, aur Python ko chote strings cache karne deti hai, par iska matlab loop mein bahut zyada concatenation slow hota hai — behtar hai list banao aur "".join() karo.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Control Flow',
    level: 'beginner',
    description: 'Decisions (if/elif/else) aur loops (for, while).',
    concepts: [
      {
        title: 'Conditionals: if / elif / else',
        difficulty: 'easy',
        tags: ['if', 'elif', 'else', 'conditionals'],
        explanation: {
          english:
            'Conditionals let your program make decisions. `if` runs a block when a condition is True; `elif` (else-if) checks another condition if the previous was False; `else` is the fallback when none matched. Python uses INDENTATION (4 spaces by convention) instead of curly braces to mark a block — the colon `:` opens it and the indent groups the lines. Conditions are anything truthy/falsy: 0, empty string, empty list, and None count as False; almost everything else is True. You can also write compact ternary expressions: `value_if_true if condition else value_if_false`.',
          hinglish:
            'Conditionals tumhare program ko decisions lene dete hain. `if` tab block chalata hai jab condition True ho; `elif` (else-if) pichhli condition False hone par doosri condition check karta hai; `else` woh fallback hai jab koi match na ho. Python block mark karne ke liye curly braces ki jagah INDENTATION (convention se 4 spaces) use karta hai — colon `:` block kholta hai aur indent lines ko group karta hai. Conditions kuch bhi truthy/falsy ho sakti hain: 0, empty string, empty list, aur None False maane jaate hain; baaki sab kuch True. Compact ternary bhi likh sakte ho: `value_if_true if condition else value_if_false`.',
        },
        dailyLifeExample:
          'if/elif/else waise hai jaise traffic signal pe decision — agar laal hai to ruko, warna agar peela hai to dheere, warna chalo. Computer bhi exactly issi tarah upar se neeche conditions check karta hai aur pehli sahi (True) wali par ruk jaata hai.',
        codeExample:
          'marks = 72\n\nif marks >= 90:\n    print("Grade: A")\nelif marks >= 75:\n    print("Grade: B")\nelif marks >= 50:\n    print("Grade: C")\nelse:\n    print("Grade: Fail")\n\n# Truthiness: empty things are False\ncart = []\nif cart:\n    print("Checkout")\nelse:\n    print("Your cart is empty")   # this runs\n\n# Ternary (one-line if/else)\nage = 20\nstatus = "adult" if age >= 18 else "minor"\nprint(status)   # adult',
        keyPoints: [
          'if -> elif -> else; first True block runs, rest skipped',
          'Indentation (4 spaces) defines the block, not braces',
          'The colon : opens every if/elif/else block',
          'Falsy values: 0, "", [], {}, None — everything else is truthy',
          'Ternary: x if condition else y for one-line decisions',
        ],
        quiz: [
          {
            question: 'How does Python define a block of code under an if?',
            options: ['Curly braces {}', 'Indentation after a colon', 'The keyword "end"', 'Square brackets []'],
            correctIndex: 1,
          },
          {
            question: 'Which of these is FALSY in Python?',
            options: ['"0"', '[0]', '0', '"False"'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why does Python use indentation instead of curly braces?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Python deliberately uses indentation to define code blocks so that the visual structure of the code matches its logical structure — you cannot have code that looks one way but runs another. This enforces readability and removes the noise of braces and semicolons. The trade-off is that mixing tabs and spaces or being inconsistent causes IndentationError, so teams standardise on 4 spaces. The result is that almost all Python code, across projects, looks and reads the same way.',
              hinglish:
                'Python jaan-boojhkar code blocks define karne ke liye indentation use karta hai taaki code ka visual structure uske logical structure se match kare — aisa nahi ho sakta ki code dikhe kuch aur aur chale kuch aur. Ye readability force karta hai aur braces/semicolons ka shor hata deta hai. Trade-off ye hai ki tabs aur spaces mix karna ya inconsistent hona IndentationError deta hai, isliye teams 4 spaces par standardise karti hain. Nateeja ye ki har project ka Python code lagbhag ek jaisa dikhta aur padha jaata hai.',
            },
          },
        ],
      },
      {
        title: 'Loops: for, while, range, break/continue',
        difficulty: 'easy',
        tags: ['loops', 'for', 'while', 'range'],
        explanation: {
          english:
            'Loops repeat work. A `for` loop iterates over any sequence (list, string, range). `range(start, stop, step)` produces numbers from start up to but NOT including stop. A `while` loop keeps running as long as its condition stays True — make sure something changes inside or it loops forever. `break` exits the loop immediately; `continue` skips to the next iteration. `enumerate()` gives you index + value together, and `else` on a loop runs only if the loop finished without a break.',
          hinglish:
            'Loops kaam dohraate hain. Ek `for` loop kisi bhi sequence (list, string, range) par iterate karta hai. `range(start, stop, step)` start se lekar stop tak numbers banata hai par stop ko SHAAMIL nahi karta. Ek `while` loop tab tak chalta hai jab tak uski condition True rahe — dhyaan rakho andar kuch badle warna ye hamesha chalta rahega. `break` loop turant rok deta hai; `continue` agle iteration par chhalaang laga deta hai. `enumerate()` index + value dono ek saath deta hai, aur loop par `else` tabhi chalta hai jab loop bina break ke poora ho jaaye.',
        },
        dailyLifeExample:
          'for loop waise hai jaise tiffin ke har dabbe ko ek-ek karke kholna aur dekhna kya hai. while loop waise hai jaise "jab tak doodh ubla nahi, gas mat band karo". break matlab "doodh ubal gaya — turant gas band", continue matlab "ye dabba khaali hai — chhod, agle par jao".',
        codeExample:
          '# for over a range\nfor i in range(1, 6):     # 1,2,3,4,5 (6 excluded)\n    print("Count:", i)\n\n# for over a list with index\nfruits = ["aam", "kela", "seb"]\nfor index, fruit in enumerate(fruits):\n    print(index, fruit)\n\n# while loop\nbalance = 100\nwhile balance > 0:\n    print("Balance:", balance)\n    balance -= 40\n\n# break and continue\nfor n in range(1, 10):\n    if n == 7:\n        break          # stop the loop at 7\n    if n % 2 == 0:\n        continue       # skip even numbers\n    print("Odd:", n)   # 1, 3, 5',
        keyPoints: [
          'for iterates over sequences; while repeats while a condition is True',
          'range(start, stop, step) excludes stop',
          'break exits the loop; continue skips to the next iteration',
          'enumerate() gives index and value together',
          'Always change the while condition or risk an infinite loop',
        ],
        quiz: [
          {
            question: 'What numbers does range(2, 8, 2) produce?',
            options: ['2, 4, 6, 8', '2, 4, 6', '2, 3, 4, 5, 6, 7', '0, 2, 4, 6'],
            correctIndex: 1,
          },
          {
            question: 'What does `continue` do inside a loop?',
            options: [
              'Exits the loop entirely',
              'Skips the rest of the current iteration and moves to the next',
              'Restarts the program',
              'Pauses the loop for a second',
            ],
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
                '`break` terminates the entire loop immediately — execution jumps to the first statement after the loop, and no further iterations happen. `continue` only ends the current iteration — it skips the rest of the loop body and jumps back to the loop\'s next iteration (re-checking the condition for while, or advancing for for). Use break when you have found what you need; use continue to skip items that do not qualify while still processing the rest.',
              hinglish:
                '`break` poore loop ko turant khatam kar deta hai — execution loop ke baad ki pehli line par chala jaata hai aur aage koi iteration nahi hota. `continue` sirf current iteration khatam karta hai — loop body ka baaki hissa skip karke loop ke agle iteration par wapas jaata hai (while ke liye condition dobara check, for ke liye aage badhna). Jab jo chahiye mil jaaye to break use karo; jo items match na karein unhe skip karne ke liye continue, baaki sabko process karte hue.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Data Structures',
    level: 'intermediate',
    description: 'Lists, tuples, dictionaries aur sets — methods ke saath.',
    concepts: [
      {
        title: 'Lists & Tuples',
        difficulty: 'medium',
        tags: ['list', 'tuple', 'data-structures'],
        explanation: {
          english:
            'A list is an ordered, mutable collection written in square brackets `[]` — you can add, remove, and change items. Common methods: .append(x), .insert(i, x), .remove(x), .pop(i), .sort(), .reverse(), len(list), and slicing list[1:3]. A tuple is an ordered but IMMUTABLE collection written in parentheses `()` — once created it cannot change, which makes it slightly faster, hashable (usable as dict keys), and a good signal that data is fixed (like coordinates or RGB colors). You can unpack a tuple into variables: `x, y = point`.',
          hinglish:
            'List ek ordered, mutable collection hai jo square brackets `[]` mein likhi jaati hai — tum items add, remove aur change kar sakte ho. Common methods: .append(x), .insert(i, x), .remove(x), .pop(i), .sort(), .reverse(), len(list), aur slicing list[1:3]. Tuple ek ordered par IMMUTABLE collection hai jo parentheses `()` mein likhi jaati hai — ek baar ban gaya to badal nahi sakta, jo ise thoda fast, hashable (dict keys ban sakte hain), aur is baat ka signal banata hai ki data fixed hai (jaise coordinates ya RGB colors). Tuple ko variables mein unpack kar sakte ho: `x, y = point`.',
        },
        dailyLifeExample:
          'List tumhari grocery ki shopping list hai — kabhi bhi item add karo, kaato, badlo. Tuple tumhari date of birth hai (din, mahina, saal) — ek baar set ho gaya to badalta nahi, fixed rehta hai. Isliye jo cheez change ho use list mein, jo fix ho use tuple mein rakho.',
        codeExample:
          '# List — mutable\nmarks = [85, 90, 78]\nmarks.append(92)        # [85, 90, 78, 92]\nmarks.insert(0, 100)    # [100, 85, 90, 78, 92]\nmarks.remove(78)        # drop first 78\nmarks.sort()            # ascending\nprint(marks, len(marks))\nprint(marks[1:3])       # slice\n\n# Tuple — immutable\npoint = (3, 7)\nx, y = point            # unpacking\nprint("x =", x, "y =", y)\n\n# Tuples are fixed: this would raise an error\n# point[0] = 99   # TypeError: tuple does not support assignment\n\n# Tuple as a dict key (lists cannot do this)\nlocations = {(19.07, 72.87): "Mumbai"}\nprint(locations[(19.07, 72.87)])',
        keyPoints: [
          'List = ordered + mutable, written with []',
          'Tuple = ordered + immutable, written with ()',
          'List methods: append, insert, remove, pop, sort, reverse',
          'Tuples are hashable — can be dict keys; lists cannot',
          'Unpack a tuple: x, y = point',
        ],
        quiz: [
          {
            question: 'Which statement is TRUE about tuples?',
            options: [
              'They are mutable like lists',
              'They are immutable and written with parentheses',
              'They cannot store numbers',
              'They are unordered',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which method adds an item to the end of a list?',
            options: ['.add()', '.append()', '.insert()', '.push()'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you use a tuple instead of a list?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Use a tuple when the data should not change after creation — fixed records like (latitude, longitude), an RGB color (255, 0, 0), or returning multiple values from a function. Because tuples are immutable they are hashable, so they can serve as dictionary keys or set members, which lists cannot. They also signal intent to other developers ("this is constant") and are marginally faster and lighter in memory. Use a list when you need to grow, shrink, sort, or modify the collection.',
              hinglish:
                'Tuple tab use karo jab data banne ke baad badalna nahi chahiye — fixed records jaise (latitude, longitude), ek RGB color (255, 0, 0), ya function se ek saath kai values return karna. Tuples immutable hone ki wajah se hashable hote hain, isliye dictionary keys ya set members ban sakte hain, jo lists nahi ban sakti. Ye doosre developers ko intent bhi batate hain ("ye constant hai") aur thode fast aur memory mein halke hote hain. List tab use karo jab collection grow, shrink, sort ya modify karni ho.',
            },
          },
        ],
      },
      {
        title: 'Dictionaries & Sets',
        difficulty: 'medium',
        tags: ['dict', 'set', 'data-structures'],
        explanation: {
          english:
            'A dictionary stores key-value pairs in curly braces `{}` — fast O(1) lookup by key. Access with d[key] (KeyError if missing) or the safer d.get(key, default). Useful methods: .keys(), .values(), .items() (loop over both), .get(), .update(), .pop(). Keys must be unique and hashable (str, int, tuple). A set is an unordered collection of UNIQUE items, also in `{}` but with no key:value — great for removing duplicates and doing math like union (|), intersection (&), and difference (-). Membership tests (`x in collection`) are very fast on both dicts and sets.',
          hinglish:
            'Dictionary key-value pairs ko curly braces `{}` mein store karti hai — key se fast O(1) lookup. Access karo d[key] se (na mile to KeyError) ya safer d.get(key, default) se. Kaam ke methods: .keys(), .values(), .items() (dono par loop), .get(), .update(), .pop(). Keys unique aur hashable honi chahiye (str, int, tuple). Set UNIQUE items ka ek unordered collection hai, ye bhi `{}` mein par bina key:value ke — duplicates hatane aur union (|), intersection (&), difference (-) jaise math ke liye badhiya. Membership test (`x in collection`) dono dict aur set par bahut fast hote hain.',
        },
        dailyLifeExample:
          'Dictionary mobile ki contact list hai — naam (key) se number (value) turant mil jaata hai, poori list dhoondhni nahi padti. Set ek mehmaano ki guest list hai jisme duplicate naam apne aap hat jaate hain — ek hi banda do baar nahi aa sakta.',
        codeExample:
          '# Dictionary\nstudent = {"name": "Riya", "age": 21, "city": "Pune"}\nprint(student["name"])          # Riya\nprint(student.get("grade", "N/A"))  # safe access -> N/A\nstudent["grade"] = "A"          # add/update\n\nfor key, value in student.items():\n    print(key, "->", value)\n\n# Set — unique items + math\na = {1, 2, 3, 3, 2}   # duplicates collapse -> {1, 2, 3}\nb = {3, 4, 5}\nprint(a | b)   # union -> {1, 2, 3, 4, 5}\nprint(a & b)   # intersection -> {3}\nprint(a - b)   # difference -> {1, 2}\n\n# Remove duplicates from a list using a set\nnames = ["Aman", "Riya", "Aman", "Neha"]\nprint(list(set(names)))',
        keyPoints: [
          'Dict = key:value pairs in {}, O(1) lookup by key',
          'Use d.get(key, default) to avoid KeyError',
          'Loop with .items() to get key and value together',
          'Set = unordered collection of unique items',
          'Set math: union |, intersection &, difference -',
        ],
        quiz: [
          {
            question: 'What is the safest way to read a possibly-missing dict key?',
            options: ['d[key]', 'd.get(key, default)', 'd.read(key)', 'd->key'],
            correctIndex: 1,
          },
          {
            question: 'What happens when you put duplicate values in a set?',
            options: [
              'It raises an error',
              'Duplicates are automatically removed, keeping unique values',
              'It stores all of them',
              'It sorts them',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How is a dictionary lookup O(1) and what makes it possible?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A dictionary is backed by a hash table. When you store a key, Python computes its hash and uses it to pick a slot (bucket) where the value is stored. To look up a key, it recomputes the hash and jumps straight to that slot — so the average time does not grow with the number of items, giving O(1) average access. This is why keys must be hashable (immutable types like str, int, tuple). Worst case can degrade to O(n) with many hash collisions, but Python\'s implementation keeps that rare.',
              hinglish:
                'Dictionary ke peeche ek hash table hota hai. Jab tum koi key store karte ho, Python uska hash compute karta hai aur usse ek slot (bucket) chunta hai jahan value rakhi jaati hai. Key dhoondhne ke liye ye dobara hash compute karke seedha us slot par chala jaata hai — isliye average time items ki sankhya ke saath nahi badhta, jo O(1) average access deta hai. Isiliye keys hashable honi chahiye (immutable types jaise str, int, tuple). Worst case bahut saari hash collisions par O(n) tak gir sakta hai, par Python ka implementation ise rare rakhta hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Functions',
    level: 'intermediate',
    description: 'def, arguments, *args/**kwargs, return, lambda aur scope.',
    concepts: [
      {
        title: 'Defining Functions, *args & **kwargs',
        difficulty: 'medium',
        tags: ['functions', 'args', 'kwargs', 'return'],
        explanation: {
          english:
            'A function is a reusable block of code defined with `def name(parameters):`. It can take parameters (with optional default values), do work, and send a result back with `return` (a function without return gives None). Arguments can be passed by position or by name (keyword arguments). `*args` collects any number of extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dict — together they make functions accept a flexible number of inputs. Default arguments must come after non-default ones, and you should avoid mutable defaults like [].',
          hinglish:
            'Function code ka ek reusable block hai jo `def name(parameters):` se define hota hai. Ye parameters le sakta hai (optional default values ke saath), kaam karta hai, aur `return` se result wapas bhejta hai (bina return wala function None deta hai). Arguments position se ya naam se (keyword arguments) pass ho sakte hain. `*args` kitne bhi extra positional arguments ko ek tuple mein collect karta hai; `**kwargs` extra keyword arguments ko ek dict mein collect karta hai — dono milkar function ko flexible number of inputs lene dete hain. Default arguments non-default ke baad aane chahiye, aur [] jaise mutable defaults se bachna chahiye.',
        },
        dailyLifeExample:
          'Function chai banane ki recipe hai — ek baar likho, baar-baar use karo. Parameters ingredients hain (cheeni kitni). *args waisa hai jaise "kitne bhi mehmaan aa jaayein, sabke liye cup laga do", aur **kwargs jaise "extra farmaaish: kisi ko adrak, kisi ko elaichi" naam ke saath.',
        codeExample:
          '# Basic function with default argument\ndef greet(name, greeting="Namaste"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Riya"))               # Namaste, Riya!\nprint(greet("Aman", greeting="Hi")) # Hi, Aman!\n\n# *args -> tuple of extra positional args\ndef total(*numbers):\n    return sum(numbers)\n\nprint(total(10, 20, 30))   # 60\n\n# **kwargs -> dict of extra keyword args\ndef profile(**info):\n    for key, value in info.items():\n        print(key, ":", value)\n\nprofile(name="Neha", city="Delhi", age=22)\n\n# A function with no return gives None\ndef log(msg):\n    print("LOG:", msg)\n\nprint(log("done"))   # prints LOG: done, then None',
        keyPoints: [
          'Define with def name(params): and send results with return',
          'No return statement means the function returns None',
          'Arguments can be positional or keyword; defaults come last',
          '*args gathers extra positional args into a tuple',
          '**kwargs gathers extra keyword args into a dict',
        ],
        quiz: [
          {
            question: 'What does a function return if it has no return statement?',
            options: ['0', 'An empty string', 'None', 'It raises an error'],
            correctIndex: 2,
          },
          {
            question: 'What does **kwargs collect arguments into?',
            options: ['A list', 'A tuple', 'A dictionary', 'A set'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between *args and **kwargs?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                '`*args` collects any number of extra POSITIONAL arguments into a tuple, so you can call a function with however many unnamed values you want. `**kwargs` collects any number of extra KEYWORD (named) arguments into a dictionary, where each key is the argument name and the value is what was passed. They are often used together as `def f(*args, **kwargs)` to accept and forward arbitrary arguments — common in decorators and wrapper functions. The names args/kwargs are convention; only the * and ** matter.',
              hinglish:
                '`*args` kitne bhi extra POSITIONAL arguments ko ek tuple mein collect karta hai, toh tum function ko jitne chaaho unnamed values ke saath call kar sakte ho. `**kwargs` kitne bhi extra KEYWORD (named) arguments ko ek dictionary mein collect karta hai, jahan har key argument ka naam hai aur value jo pass hua. Inhe aksar saath mein `def f(*args, **kwargs)` ki tarah use karte hain taaki koi bhi arguments accept aur forward kar sakein — decorators aur wrapper functions mein common. args/kwargs naam sirf convention hain; asli kaam * aur ** ka hai.',
            },
          },
        ],
      },
      {
        title: 'Lambda & Scope',
        difficulty: 'medium',
        tags: ['lambda', 'scope', 'functions'],
        explanation: {
          english:
            'A lambda is a small anonymous function written in one line: `lambda args: expression`. It is handy as a throwaway function passed to map(), filter(), sorted(key=...) where naming a full function would be overkill. Scope decides where a variable is visible. Python follows the LEGB rule: it looks for a name in Local, then Enclosing, then Global, then Built-in scope. Variables created inside a function are local and vanish when it returns; to modify a global variable inside a function you must declare `global x` (rarely needed and usually a code smell).',
          hinglish:
            'Lambda ek chhota anonymous function hai jo ek line mein likha jaata hai: `lambda args: expression`. Ye ek throwaway function ki tarah kaam aata hai jise map(), filter(), sorted(key=...) ko paas karte hain jahan poora function naam dena zyada ho jaaye. Scope decide karta hai variable kahan dikhega. Python LEGB rule follow karta hai: naam pehle Local mein, phir Enclosing, phir Global, phir Built-in scope mein dhoondhta hai. Function ke andar bane variables local hote hain aur return hote hi gayab ho jaate hain; function ke andar global variable modify karne ke liye `global x` declare karna padta hai (jiski zaroorat kam padti hai aur aksar code smell hai).',
        },
        dailyLifeExample:
          'Lambda ek chhoti si parchi par likha quick note hai — kaam khatam, parchi phenk do, naam dene ki zaroorat hi nahi. Scope waisa hai jaise ghar ke andar ki baat ghar mein hi rehti hai (local); par jo poore mohalle ko pata ho woh global hai. Local cheez bahar nahi dikhti.',
        codeExample:
          '# Lambda — quick one-line function\nsquare = lambda n: n * n\nprint(square(5))   # 25\n\n# Lambda shines with sorted, map, filter\nstudents = [("Riya", 85), ("Aman", 92), ("Neha", 78)]\nstudents.sort(key=lambda s: s[1], reverse=True)\nprint(students)   # sorted by marks, highest first\n\nnums = [1, 2, 3, 4, 5, 6]\nevens = list(filter(lambda n: n % 2 == 0, nums))\nprint(evens)      # [2, 4, 6]\n\n# Scope (LEGB)\ncount = 0          # global\n\ndef increment():\n    global count   # needed to modify the global\n    count += 1\n\nincrement()\nprint(count)       # 1',
        keyPoints: [
          'lambda args: expression is a one-line anonymous function',
          'Great as a key/callback for sorted(), map(), filter()',
          'Scope resolution follows LEGB: Local, Enclosing, Global, Built-in',
          'Variables inside a function are local by default',
          'Use global x to modify a global inside a function (rarely needed)',
        ],
        quiz: [
          {
            question: 'What does the LEGB rule describe?',
            options: [
              'The order of arithmetic operations',
              'The order Python searches scopes for a variable name',
              'The list of built-in functions',
              'A way to sort lists',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which is a valid lambda that doubles a number?',
            options: ['lambda x: x * 2', 'def x: x * 2', 'lambda(x) = x * 2', 'x => x * 2'],
            correctIndex: 0,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a lambda and a regular function?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A regular function is defined with def, has a name, can contain multiple statements, loops, and docstrings, and is reusable and debuggable. A lambda is an anonymous, single-expression function — it has no name (unless assigned), cannot contain statements (only one expression whose value is returned implicitly), and is meant for short throwaway logic passed to functions like sorted, map, or filter. Functionally a lambda is just syntactic sugar; for anything non-trivial, a named def is clearer and easier to test.',
              hinglish:
                'Regular function def se define hota hai, uska naam hota hai, usme kai statements, loops aur docstrings ho sakti hain, aur ye reusable aur debug karne layak hota hai. Lambda ek anonymous, single-expression function hai — iska naam nahi hota (jab tak assign na karo), isme statements nahi ho sakti (sirf ek expression jiski value implicitly return hoti hai), aur ye sorted, map ya filter jaise functions ko paas karne wali chhoti throwaway logic ke liye hai. Functionally lambda bas syntactic sugar hai; kisi bhi non-trivial cheez ke liye named def zyada clear aur test karne mein aasaan hota hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Modules & Files',
    level: 'intermediate',
    description: 'import, pip, files padhna/likhna aur exceptions handle karna.',
    concepts: [
      {
        title: 'Modules, import & pip',
        difficulty: 'medium',
        tags: ['modules', 'import', 'pip'],
        explanation: {
          english:
            'A module is just a .py file full of reusable code. Python ships with a rich standard library — `math`, `random`, `datetime`, `os`, `json` — that you bring in with `import`. You can import the whole module (`import math`, then `math.sqrt(9)`), import specific names (`from math import sqrt`), or alias (`import numpy as np`). Third-party packages live on PyPI and are installed with pip: `pip install requests`. Best practice is to install them inside a virtual environment (venv) so each project has isolated dependencies. The `if __name__ == "__main__":` block lets a file run as a script but stay importable as a module.',
          hinglish:
            'Module bas ek .py file hai jo reusable code se bhari hoti hai. Python ke saath ek rich standard library aati hai — `math`, `random`, `datetime`, `os`, `json` — jise tum `import` se le aate ho. Tum poora module import kar sakte ho (`import math`, phir `math.sqrt(9)`), specific naam import kar sakte ho (`from math import sqrt`), ya alias de sakte ho (`import numpy as np`). Third-party packages PyPI par hote hain aur pip se install hote hain: `pip install requests`. Best practice ye hai ki inhe ek virtual environment (venv) ke andar install karo taaki har project ki dependencies alag rahein. `if __name__ == "__main__":` block file ko script ki tarah run karne deta hai par module ki tarah importable bhi rakhta hai.',
        },
        dailyLifeExample:
          'Module waise hai jaise kisi expert ka banaya hua ready-made masala packet — tumhe har baar zeera-dhaniya peesne ki zaroorat nahi, bas import karo aur use karo. pip waisa hai jaise online grocery app se naya masala mangwana jo ghar par (PyPI store se) aa jaata hai.',
        codeExample:
          '# Standard library modules\nimport math\nfrom random import choice\nimport datetime as dt\n\nprint(math.sqrt(144))        # 12.0\nprint(choice(["chai", "coffee"]))\nprint(dt.date.today())\n\n# Installing a third-party package (run in terminal):\n# pip install requests\n\n# Guard so code runs only when this file is the script\ndef main():\n    print("Running as a script")\n\nif __name__ == "__main__":\n    main()',
        keyPoints: [
          'A module is a .py file of reusable code',
          'import math, from math import sqrt, or import x as alias',
          'Standard library: math, random, datetime, os, json',
          'pip install <package> adds third-party packages from PyPI',
          'if __name__ == "__main__": runs code only when the file is the entry point',
        ],
        quiz: [
          {
            question: 'How do you install a third-party package like requests?',
            options: ['import requests', 'pip install requests', 'python requests', 'download requests'],
            correctIndex: 1,
          },
          {
            question: 'What does `from math import sqrt` let you do?',
            options: [
              'Use sqrt() directly without the math. prefix',
              'Import every function in math',
              'Rename math to sqrt',
              'Install the math package',
            ],
            correctIndex: 0,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the purpose of if __name__ == "__main__":?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'When Python runs a file directly, it sets that file\'s special variable __name__ to the string "__main__". When the same file is imported into another file, __name__ is set to the module\'s name instead. So `if __name__ == "__main__":` guards code that should only run when the file is executed as a script (like a demo or CLI entry point), while still letting other files import the module\'s functions and classes without triggering that code. It is the standard way to make a file both runnable and reusable.',
              hinglish:
                'Jab Python kisi file ko seedha run karta hai, to us file ka special variable __name__ string "__main__" set hota hai. Jab wahi file kisi doosri file mein import hoti hai, to __name__ module ke naam par set hota hai. Isliye `if __name__ == "__main__":` us code ko guard karta hai jo sirf tab chalna chahiye jab file script ki tarah run ho (jaise ek demo ya CLI entry point), aur saath hi doosri files ko module ke functions/classes import karne deta hai bina us code ko chalaye. Ye file ko ek saath runnable aur reusable banane ka standard tareeka hai.',
            },
          },
        ],
      },
      {
        title: 'Files & Exceptions',
        difficulty: 'medium',
        tags: ['files', 'exceptions', 'try-except'],
        explanation: {
          english:
            'To work with files, open them with `open(path, mode)`: "r" read, "w" write (overwrites), "a" append, "r+" read/write. The best pattern is the `with open(...) as f:` block — it automatically closes the file even if an error occurs. Read with f.read(), f.readline(), or loop over the file for lines; write with f.write(text). Things that go wrong at runtime raise exceptions (FileNotFoundError, ValueError, ZeroDivisionError). Handle them gracefully with try / except / else / finally instead of letting the program crash. `finally` always runs (cleanup), and you can raise your own errors with `raise`.',
          hinglish:
            'Files ke saath kaam karne ke liye unhe `open(path, mode)` se kholo: "r" read, "w" write (overwrite kar deta hai), "a" append, "r+" read/write. Best pattern hai `with open(...) as f:` block — ye error aane par bhi file apne aap band kar deta hai. Padho f.read(), f.readline() se, ya file par loop karke lines lo; likho f.write(text) se. Runtime par jo galat hota hai woh exceptions raise karta hai (FileNotFoundError, ValueError, ZeroDivisionError). Inhe program crash hone dene ke bajaye try / except / else / finally se gracefully handle karo. `finally` hamesha chalta hai (cleanup), aur tum apne errors `raise` se khud bhi utha sakte ho.',
        },
        dailyLifeExample:
          'with open(...) waise hai jaise fridge kholna — kaam karo aur darwaaza apne aap band ho jaaye taaki thandak na nikle. try/except waisa hai jaise bike chalate waqt helmet pehnna — galti (gir gaye) hone par bhi tum sambhal jaate ho, program crash hokar gir nahi jaata.',
        codeExample:
          '# Writing to a file (with-block auto-closes)\nwith open("notes.txt", "w") as f:\n    f.write("Line 1\\n")\n    f.write("Line 2\\n")\n\n# Reading line by line\nwith open("notes.txt", "r") as f:\n    for line in f:\n        print(line.strip())\n\n# Handling errors gracefully\ntry:\n    age = int(input("Enter age: "))\n    print(100 / age)\nexcept ValueError:\n    print("Please enter a valid number")\nexcept ZeroDivisionError:\n    print("Age cannot be zero")\nelse:\n    print("All good!")        # runs if no exception\nfinally:\n    print("Done checking")    # always runs',
        keyPoints: [
          'open(path, mode): "r" read, "w" write, "a" append',
          'Use with open(...) as f: to auto-close files safely',
          'Catch errors with try / except to avoid crashes',
          'else runs when no exception; finally always runs (cleanup)',
          'raise lets you throw your own exceptions',
        ],
        quiz: [
          {
            question: 'Why prefer `with open(...) as f:` over a plain open()?',
            options: [
              'It runs faster',
              'It automatically closes the file even if an error occurs',
              'It can only read, never write',
              'It encrypts the file',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which block ALWAYS runs, whether or not an exception occurred?',
            options: ['try', 'except', 'else', 'finally'],
            correctIndex: 3,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the try / except / else / finally structure.',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'The `try` block holds code that might raise an exception. If an exception occurs, Python jumps to the matching `except` block to handle it (you can have several, most specific first). The optional `else` block runs only if the try block completed WITHOUT raising — useful for code that should run on success and that you do not want accidentally caught by except. The `finally` block ALWAYS runs, whether or not there was an exception or even a return — it is for cleanup like closing files or releasing connections. This structure lets you fail gracefully and guarantee cleanup.',
              hinglish:
                '`try` block mein woh code hota hai jo exception raise kar sakta hai. Agar exception aaye, to Python use handle karne ke liye matching `except` block par chala jaata hai (kai ho sakte hain, sabse specific pehle). Optional `else` block tabhi chalta hai jab try block bina exception ke poora ho — un cheezon ke liye useful jo success par chalni chahiye aur jinhe galti se except na pakad le. `finally` block HAMESHA chalta hai, chahe exception aaye ya na aaye ya return ho jaaye — ye cleanup ke liye hai jaise files band karna ya connections release karna. Ye structure gracefully fail hone aur cleanup guarantee karne deta hai.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Object-Oriented Python',
    level: 'advanced',
    description: 'Classes, objects, __init__, inheritance aur dunder methods.',
    concepts: [
      {
        title: 'Classes, Objects & __init__',
        difficulty: 'hard',
        tags: ['oop', 'class', 'object', 'init'],
        explanation: {
          english:
            'A class is a blueprint; an object (instance) is a real thing built from it. You define a class with `class Name:` and give it methods (functions inside the class). The special `__init__` method is the constructor — it runs automatically when you create an object and sets up its initial attributes. The first parameter of every instance method is `self`, which refers to the specific object the method is called on. Attributes set with self.x belong to each instance; methods use self to read and change that instance\'s data. This bundles data and behaviour together — the core idea of OOP.',
          hinglish:
            'Class ek blueprint hai; object (instance) us blueprint se bani ek asli cheez. Class ko `class Name:` se define karte ho aur usme methods dete ho (class ke andar functions). Special `__init__` method constructor hai — ye object banate hi apne aap chalta hai aur uske initial attributes set karta hai. Har instance method ka pehla parameter `self` hota hai, jo us specific object ko point karta hai jis par method call hua. self.x se set kiye attributes har instance ke apne hote hain; methods self se us instance ka data padhte aur badalte hain. Ye data aur behaviour ko ek saath bundle karta hai — OOP ka core idea.',
        },
        dailyLifeExample:
          'Class ek mithai ka saancha (mould) hai, aur objects us saanche se bani har mithai. __init__ woh moment hai jab mithai banti hai aur uska flavour set hota hai (self.flavour = "kaju"). Saancha ek hai, par usse banti har mithai apne-apne flavour ke saath alag object hai.',
        codeExample:
          'class Student:\n    def __init__(self, name, marks):   # constructor\n        self.name = name               # instance attribute\n        self.marks = marks\n\n    def is_pass(self):                 # method using self\n        return self.marks >= 33\n\n    def greet(self):\n        return f"Hi, I am {self.name}"\n\n# Create objects (instances) from the class\nriya = Student("Riya", 85)\naman = Student("Aman", 28)\n\nprint(riya.greet())      # Hi, I am Riya\nprint(riya.is_pass())    # True\nprint(aman.is_pass())    # False\nprint(riya.marks)        # 85 (each object has its own data)',
        keyPoints: [
          'class = blueprint; object/instance = a built thing from it',
          '__init__ is the constructor, runs on object creation',
          'self refers to the current instance inside methods',
          'self.attr stores per-instance data',
          'OOP bundles data (attributes) and behaviour (methods) together',
        ],
        quiz: [
          {
            question: 'What is the role of __init__ in a class?',
            options: [
              'It deletes the object',
              'It is the constructor that initialises a new object',
              'It imports modules',
              'It prints the object',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does `self` refer to inside an instance method?',
            options: ['The class itself', 'The current object (instance)', 'A global variable', 'The parent class'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a class and an object?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'A class is a blueprint or template that defines what attributes (data) and methods (behaviour) something will have. An object is a concrete instance created from that class, with its own copy of the attribute values. For example, "Student" is a class describing that every student has a name and marks; "Riya with 85 marks" and "Aman with 28 marks" are two distinct objects of that class. You define a class once and can create as many objects from it as you need.',
              hinglish:
                'Class ek blueprint ya template hai jo define karta hai ki kisi cheez ke paas kaunse attributes (data) aur methods (behaviour) honge. Object us class se banaya gaya ek concrete instance hai, jiske paas attribute values ki apni copy hoti hai. Jaise "Student" ek class hai jo batati hai ki har student ke paas naam aur marks hote hain; "Riya 85 marks ke saath" aur "Aman 28 marks ke saath" us class ke do alag objects hain. Class ek baar define karte ho aur usse jitne chaaho utne objects bana sakte ho.',
            },
          },
        ],
      },
      {
        title: 'Inheritance & Dunder Methods',
        difficulty: 'hard',
        tags: ['inheritance', 'dunder', 'oop'],
        explanation: {
          english:
            'Inheritance lets a child class reuse and extend a parent class: `class Dog(Animal):`. The child gets the parent\'s methods and attributes, can add new ones, and can override existing ones. Call the parent\'s version with `super()` — commonly `super().__init__(...)` to run the parent constructor. Dunder ("double underscore") methods let your objects plug into Python\'s built-in behaviour: `__init__` (construct), `__str__` (what print() shows), `__repr__` (developer-facing text), `__len__`, `__eq__`, `__add__`, and more. Defining them makes your objects feel native — they print nicely, compare with ==, and work with len(). Overriding methods enables polymorphism: the same call behaves differently per class.',
          hinglish:
            'Inheritance ek child class ko parent class reuse aur extend karne deta hai: `class Dog(Animal):`. Child ko parent ke methods aur attributes mil jaate hain, naye add kar sakta hai, aur purane override kar sakta hai. Parent ka version `super()` se call karo — aksar `super().__init__(...)` se parent constructor chalane ke liye. Dunder ("double underscore") methods tumhare objects ko Python ke built-in behaviour se jodte hain: `__init__` (construct), `__str__` (print() kya dikhaye), `__repr__` (developer ke liye text), `__len__`, `__eq__`, `__add__`, aur bhi. Inhe define karne se tumhare objects native lagte hain — achhe se print hote hain, == se compare hote hain, aur len() ke saath kaam karte hain. Methods override karna polymorphism deta hai: ek hi call har class mein alag behave karta hai.',
        },
        dailyLifeExample:
          'Inheritance waisa hai jaise bachhe ko maa-baap ke gun mil jaate hain — par bachha apni khaasiyat bhi laata hai (override). super() waisa hai jaise "pehle ghar ke purane rivaaz nibhaao, phir apna twist daalo". Dunder __str__ waise hai jaise har cheez par ek saaf label chipka dena taaki print karne par sundar dikhe.',
        codeExample:
          'class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "Some sound"\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)   # run parent constructor\n        self.breed = breed\n\n    def speak(self):             # override\n        return "Bhow Bhow!"\n\n    def __str__(self):           # what print() shows\n        return f"{self.name} ({self.breed})"\n\nd = Dog("Moti", "Indie")\nprint(d)            # Moti (Indie)  -> uses __str__\nprint(d.speak())    # Bhow Bhow!    -> overridden\nprint(d.name)       # Moti          -> inherited attribute\n\n# Polymorphism: same call, different behaviour\nfor a in [Animal("Generic"), Dog("Sheru", "Lab")]:\n    print(a.speak())',
        keyPoints: [
          'class Child(Parent): inherits the parent\'s attributes and methods',
          'super().__init__(...) calls the parent constructor',
          'Override a method by redefining it in the child class',
          'Dunder methods: __init__, __str__, __repr__, __len__, __eq__, __add__',
          'Overriding enables polymorphism — same call, class-specific behaviour',
        ],
        quiz: [
          {
            question: 'What does super().__init__() do in a child class?',
            options: [
              'Deletes the parent class',
              'Calls the parent class constructor to initialise inherited attributes',
              'Creates a new module',
              'Makes the class abstract',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which dunder method controls what print(obj) displays?',
            options: ['__init__', '__len__', '__str__', '__add__'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between __str__ and __repr__?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                '__str__ is meant to return a readable, user-friendly description of an object — it is what print() and str() use. __repr__ is meant to return an unambiguous, developer-facing representation, ideally one that could recreate the object (like "Student(\'Riya\', 85)") — it is what the interactive shell and repr() use, and what containers show when printed. If you define only __repr__, Python falls back to it for str() too, so a common rule is: always define __repr__ for debugging, and add __str__ when you want a nicer end-user display.',
              hinglish:
                '__str__ ka kaam object ka ek readable, user-friendly description return karna hai — print() aur str() isi ko use karte hain. __repr__ ka kaam ek unambiguous, developer ke liye representation return karna hai, ideally aisa jo object dobara bana sake (jaise "Student(\'Riya\', 85)") — interactive shell aur repr() isi ko use karte hain, aur containers print hone par isi ko dikhate hain. Agar tum sirf __repr__ define karo, to Python str() ke liye bhi usi par fallback karta hai, isliye common rule hai: debugging ke liye hamesha __repr__ define karo, aur jab end-user ke liye sundar display chahiye tab __str__ add karo.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Pythonic Features',
    level: 'advanced',
    description: 'Comprehensions, generators, decorators aur with-statement.',
    concepts: [
      {
        title: 'Comprehensions, Generators, Decorators & with',
        difficulty: 'hard',
        tags: ['comprehension', 'generator', 'decorator', 'context-manager'],
        explanation: {
          english:
            'These features make code concise and "Pythonic". A list comprehension builds a list in one line: `[expr for item in iterable if condition]` — there are dict and set comprehensions too. A generator uses `yield` (or a `(... for ...)` expression) to produce values one at a time, lazily — it does not build the whole sequence in memory, which is perfect for huge or infinite streams. A decorator is a function that wraps another function to add behaviour (logging, timing, auth) without changing its code; you apply it with `@decorator` above a def. The `with` statement uses a context manager to set up and automatically tear down a resource (open files, locks, connections) via __enter__ and __exit__.',
          hinglish:
            'Ye features code ko concise aur "Pythonic" banate hain. List comprehension ek line mein list banati hai: `[expr for item in iterable if condition]` — dict aur set comprehensions bhi hoti hain. Generator `yield` (ya ek `(... for ...)` expression) use karke values ek-ek karke, lazily produce karta hai — ye poora sequence memory mein nahi banata, jo bade ya infinite streams ke liye perfect hai. Decorator ek function hai jo doosre function ko wrap karke uska code badle bina behaviour add karta hai (logging, timing, auth); ise def ke upar `@decorator` se lagate ho. `with` statement ek context manager use karta hai jo resource ko set up karke (open files, locks, connections) __enter__ aur __exit__ ke zariye apne aap tear down kar deta hai.',
        },
        dailyLifeExample:
          'List comprehension waisa hai jaise ek hi saans mein "har sabzi dho ke tokri mein daal do" keh dena. Generator dabbe wale tiffin jaisa hai — ek-ek dabba tab kholta hai jab zaroorat ho, poora dastarkhwan ek saath nahi lagaata. Decorator gift wrapping jaisi hai — andar ka gift wahi, par upar se extra sundar layer chadh jaati hai.',
        codeExample:
          '# List comprehension\nsquares = [n * n for n in range(1, 6)]          # [1, 4, 9, 16, 25]\nevens = [n for n in range(10) if n % 2 == 0]   # [0, 2, 4, 6, 8]\n\n# Dict comprehension\nlengths = {w: len(w) for w in ["chai", "samosa"]}\n\n# Generator — lazy, memory friendly\ndef first_n_squares(n):\n    for i in range(1, n + 1):\n        yield i * i\n\nfor sq in first_n_squares(4):\n    print(sq)   # 1 4 9 16, produced one at a time\n\n# Decorator — wrap a function to add behaviour\ndef shout(func):\n    def wrapper(name):\n        return func(name).upper() + "!"\n    return wrapper\n\n@shout\ndef greet(name):\n    return f"hello {name}"\n\nprint(greet("riya"))   # HELLO RIYA!\n\n# with statement (context manager) auto-closes the file\nwith open("data.txt", "w") as f:\n    f.write("Pythonic")',
        keyPoints: [
          'List comprehension: [expr for item in iterable if condition]',
          'Generators use yield to produce values lazily, saving memory',
          'Decorators (@) wrap a function to add behaviour without editing it',
          'with uses context managers to auto-acquire and release resources',
          'These idioms make code shorter, faster, and more readable',
        ],
        quiz: [
          {
            question: 'What keyword makes a function a generator?',
            options: ['return', 'yield', 'async', 'gen'],
            correctIndex: 1,
          },
          {
            question: 'Which builds a list of squares from 0 to 4?',
            options: [
              '[n*n for n in range(5)]',
              '{n*n for n in range(5)}',
              '(n*n in range(5))',
              'list n*n for range(5)',
            ],
            correctIndex: 0,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a list comprehension and a generator expression?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'A list comprehension `[x for x in it]` builds the entire list in memory immediately and returns it, so you can index it, slice it, and iterate over it many times. A generator expression `(x for x in it)` returns a lazy iterator that produces values one at a time only as you ask for them — it uses almost no memory and is ideal for large or infinite sequences, but it can be iterated only once and you cannot index it. Rule of thumb: use a list comprehension when you need the whole collection at once; use a generator when you are streaming or only need to iterate once and want to save memory.',
              hinglish:
                'List comprehension `[x for x in it]` poori list turant memory mein bana deti hai aur return karti hai, isliye tum use index, slice aur kai baar iterate kar sakte ho. Generator expression `(x for x in it)` ek lazy iterator return karta hai jo values tabhi ek-ek karke banata hai jab tum maangte ho — ye lagbhag zero memory leta hai aur bade ya infinite sequences ke liye ideal hai, par ise sirf ek baar iterate kar sakte ho aur index nahi kar sakte. Rule of thumb: jab poori collection ek saath chahiye to list comprehension; jab stream kar rahe ho ya sirf ek baar iterate karke memory bachani ho to generator.',
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
    question: 'What are some key differences between Python 2 and Python 3?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Python 3 is the current, supported version; Python 2 reached end-of-life in 2020 and should not be used for new projects. Key differences: in Python 3 print is a function — print("hi") — not a statement; division with / always returns a float (3/2 = 1.5) instead of doing integer division; strings are Unicode by default, which fixes many encoding headaches; range() and many functions return memory-efficient iterators instead of lists; and integer types are unified. Always start new work on Python 3.',
      hinglish:
        'Python 3 current, supported version hai; Python 2 ka end-of-life 2020 mein ho gaya aur naye projects ke liye use nahi karna chahiye. Key differences: Python 3 mein print ek function hai — print("hi") — statement nahi; division / hamesha float deta hai (3/2 = 1.5) na ki integer division; strings by default Unicode hoti hain, jo bahut saari encoding ki dikkatein theek karti hain; range() aur kai functions list ke bajaye memory-efficient iterators return karte hain; aur integer types unify ho gaye hain. Naya kaam hamesha Python 3 par shuru karo.',
    },
  },
  {
    question: 'What is the Global Interpreter Lock (GIL) and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The GIL is a mutex in CPython (the standard Python) that allows only one thread to execute Python bytecode at a time, even on a multi-core CPU. It simplifies memory management and makes single-threaded code fast and safe, but it means pure-Python CPU-bound work does not speed up with threads. The practical takeaway: use threads for I/O-bound tasks (network, disk, where threads wait anyway), and use the multiprocessing module (separate processes, each with its own GIL) or C-extension libraries like NumPy for CPU-bound parallelism.',
      hinglish:
        'GIL CPython (standard Python) mein ek mutex hai jo ek samay par sirf ek thread ko Python bytecode execute karne deta hai, multi-core CPU par bhi. Ye memory management simple banata hai aur single-threaded code ko fast aur safe rakhta hai, par iska matlab pure-Python CPU-bound kaam threads se tez nahi hota. Practical baat: I/O-bound tasks ke liye threads use karo (network, disk, jahan threads waise bhi wait karte hain), aur CPU-bound parallelism ke liye multiprocessing module (alag processes, har ek ka apna GIL) ya NumPy jaisi C-extension libraries use karo.',
    },
  },
];
