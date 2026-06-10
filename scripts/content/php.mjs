// PHP curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs / express.mjs, consumed by scripts/seed.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'PHP',
  slug: 'php',
  description:
    'Web ka veteran — server-side scripting, forms, sessions aur MySQL integration. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🐘',
  tags: ['php', 'backend', 'web', 'server-side'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 20,
};

const beginner = [
  {
    title: 'PHP Basics',
    level: 'beginner',
    description: 'PHP kya hai, tags, echo, variables aur data types.',
    concepts: [
      {
        title: 'The Story of PHP — What, Why & How',
        difficulty: 'easy',
        tags: ['intro', 'story', 'basics'],
        explanation: {
          english:
            'Picture the early web 🌐. A website was like a printed notice board nailed to a wall — everyone who walked past saw the exact same paper, the exact same words. A shop could write "Welcome!" once, but it could never say "Hello, Rahul" to Rahul and "Hello, Priya" to Priya. The page was frozen. Static. Lifeless.\n\nThen people wanted MORE. They wanted a page that could greet you by name, show YOUR cart, remember YOUR login, pull today\'s prices from a database. The notice board needed a brain behind it — someone standing in the back room who reads each visitor\'s request and writes a fresh page just for them. That back-room brain is PHP. 🐘\n\nWHAT is PHP? PHP (PHP: Hypertext Preprocessor) is a server-side scripting language that lives INSIDE your HTML. You sprinkle little <?php ... ?> blocks into a normal page, and those blocks run on the server before anything reaches the browser. The visitor never sees your PHP — they only get the finished HTML it produced.\n\nWHY PHP? Because it is famously easy to start (one file, no heavy setup), it runs almost everywhere, and it quietly powers a massive slice of the internet — WordPress, Wikipedia, huge e-commerce sites, countless small business pages. It also pairs beautifully with MySQL, so storing and fetching data feels natural.\n\nHOW does it work? 🔁 A browser asks for a .php page -> the web server hands that file to PHP -> PHP runs the code (maybe talks to a database, checks who you are, builds a personalised greeting) -> and sends back plain, ordinary HTML. The browser gets clean HTML and has no idea any PHP ever existed. That is the whole magic: dynamic on the inside, simple HTML on the outside.',
          hinglish:
            'Socho shuruaati internet ke baare mein 🌐. Ek website deewar pe lagi notice board jaisi thi — jo bhi guzarta, sabko bilkul wahi kaagaz, wahi shabd dikhte the. Dukaan ek baar "Welcome!" likh sakti thi, par Rahul ko "Hello, Rahul" aur Priya ko "Hello, Priya" kabhi nahi keh sakti thi. Page jam gaya tha. Static. Bejaan.\n\nPhir logon ko ZYADA chahiye tha. Aisa page jo tumhe naam se greet kare, TUMHARA cart dikhaye, TUMHARA login yaad rakhe, aaj ke daam database se nikaal laaye. Notice board ke peeche ek dimaag chahiye tha — koi back room mein baitha jo har visitor ki request padhe aur unke liye taaza page likhe. Wahi back-room dimaag PHP hai. 🐘\n\nPHP HAI KYA? PHP (PHP: Hypertext Preprocessor) ek server-side scripting language hai jo tumhare HTML ke ANDAR rehti hai. Tum ek normal page mein chhote <?php ... ?> blocks daal dete ho, aur wo blocks server pe chalte hain — browser tak kuch pahunchne se PEHLE. Visitor tumhara PHP kabhi nahi dekhta — usse sirf wahi finished HTML milta hai jo PHP ne banaya.\n\nPHP KYUN? Kyunki shuru karna bahut aasaan hai (ek file, koi bhaari setup nahi), ye kareeb-kareeb har jagah chalta hai, aur chupchaap internet ka ek bahut bada hissa chalata hai — WordPress, Wikipedia, bade e-commerce sites, anginat chhoti business pages. Aur MySQL ke saath iski jodi kamaal ki hai, isliye data store/fetch karna natural lagta hai.\n\nKAAM KAISE KARTA HAI? 🔁 Browser ek .php page maangta hai -> web server wo file PHP ko deta hai -> PHP code chalata hai (shayad database se baat kare, check kare tum kaun ho, ek personalised greeting banaye) -> aur wapas saada, normal HTML bhej deta hai. Browser ko saaf HTML milta hai aur use bilkul pata nahi chalta ki kabhi koi PHP tha bhi. Yahi pura jaadu hai: andar se dynamic, bahar se simple HTML.',
        },
        dailyLifeExample:
          'Static HTML chhpe hue shaadi ke card jaisa hai — sabko ek hi card. PHP wo halwai hai jo har mehmaan ke aane par taaza plate banata hai: "Sharma ji, aapke liye special" — naam aur plate har baar alag, par mehmaan ko sirf plate dikhti hai, kitchen nahi.',
        codeExample:
          '<?php\n// Yeh server par chalta hai, phir HTML bhejta hai\n$name = "Rahul";\n?>\n<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello, <?php echo $name; ?>! 👋</h1>\n    <p>Aaj ka din mubarak ho.</p>\n  </body>\n</html>',
        keyPoints: [
          'PHP = server-side scripting language, HTML ke andar embed hota hai',
          'Code <?php ... ?> blocks mein likha jaata hai, server par chalta hai',
          'Browser ko sirf final HTML milta hai — PHP kabhi visible nahi hota',
          'WordPress, Wikipedia jaise sites PHP par chalte hain; MySQL ke saath best',
        ],
        quiz: [
          {
            question: 'PHP code primarily runs where?',
            options: ['In the browser', 'On the server', 'In the database only', 'On the CDN'],
            correctIndex: 1,
          },
          {
            question: 'What does the visitor\'s browser ultimately receive from a .php page?',
            options: ['Raw PHP code', 'Plain HTML', 'A SQL query', 'A binary file'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is PHP and how does a PHP request actually work end to end?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'PHP is a server-side scripting language embedded in HTML. When a browser requests a .php file, the web server passes it to the PHP interpreter, which executes the <?php ?> blocks (often querying a database or building dynamic content), and produces plain HTML. That HTML is sent back to the browser — the client never sees the PHP source. This server-side execution is what lets the same URL show personalised, dynamic pages to different users.',
              hinglish:
                'PHP ek server-side scripting language hai jo HTML mein embed hoti hai. Jab browser ek .php file maangta hai, web server use PHP interpreter ko deta hai, jo <?php ?> blocks chalata hai (aksar database query karke ya dynamic content bana ke), aur saada HTML banata hai. Wo HTML browser ko wapas bhej diya jaata hai — client kabhi PHP source nahi dekhta. Yahi server-side execution ek hi URL ko alag-alag users ke liye personalised, dynamic pages dikhane deta hai.',
            },
          },
        ],
      },
      {
        title: 'Tags, echo & Comments',
        difficulty: 'easy',
        tags: ['syntax', 'echo', 'comments'],
        explanation: {
          english:
            'PHP code lives between <?php and ?> tags. Anything outside those tags is sent to the browser as-is (usually HTML). Inside, you output text with echo (or print). Statements end with a semicolon (;). Comments help humans: // and # for single-line, and /* ... */ for multi-line. You can even leave the closing ?> off in a pure-PHP file — that is the recommended style to avoid stray output.',
          hinglish:
            'PHP code <?php aur ?> tags ke beech rehta hai. In tags ke bahar jo kuch bhi hai wo browser ko jaisa hai waisa bhej diya jaata hai (aksar HTML). Andar, tum echo (ya print) se text output karte ho. Har statement semicolon (;) se khatam hoti hai. Comments insaano ke liye hain: single-line ke liye // aur #, multi-line ke liye /* ... */. Pure-PHP file mein closing ?> chhod bhi sakte ho — yahi recommended style hai taaki extra output na ho.',
        },
        dailyLifeExample:
          'echo dukaandaar ki awaaz jaisa hai jo grahak ko bolta hai "yeh raha aapka saamaan". Comments dukaan ki diary mein khud ke liye likhe notes hain — grahak unhe nahi dekhta.',
        codeExample:
          '<?php\n// Single-line comment\n# Yeh bhi single-line comment hai\n/* Multi-line\n   comment */\n\necho "Namaste duniya!";   // browser par print hoga\necho "\\n";\nprint "print bhi kaam karta hai";\n',
        keyPoints: [
          'Code <?php ... ?> ke beech, bahar ka sab HTML hai',
          'echo / print se output, har statement ; se khatam',
          'Comments: // aur # single-line, /* ... */ multi-line',
          'Pure-PHP file mein closing ?> chhodna recommended hai',
        ],
        quiz: [
          {
            question: 'Which is used to output text in PHP?',
            options: ['print_r() only', 'echo', 'return', 'output()'],
            correctIndex: 1,
          },
          {
            question: 'Every PHP statement normally ends with…',
            options: ['A colon :', 'A semicolon ;', 'A period .', 'A comma ,'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Variables & Data Types',
        difficulty: 'easy',
        tags: ['variables', 'types'],
        explanation: {
          english:
            'In PHP every variable name starts with a dollar sign: $name, $age. Names are case-sensitive and you do NOT declare a type — PHP figures it out from the value (loosely typed). Core types are: string, int, float, bool (true/false), array, object, and null. You can check a value\'s type with gettype() or var_dump(), which prints both type and value — perfect for debugging.',
          hinglish:
            'PHP mein har variable ka naam dollar sign se shuru hota hai: $name, $age. Naam case-sensitive hote hain aur tum type DECLARE nahi karte — PHP value se khud samajh leta hai (loosely typed). Main types hain: string, int, float, bool (true/false), array, object, aur null. Kisi value ka type gettype() ya var_dump() se check kar sakte ho — var_dump type aur value dono print karta hai, debugging ke liye perfect.',
        },
        dailyLifeExample:
          'Variable ek dabba (dibba) jaisa hai jis par naam ka label ($name) chipka hai. Tum usme kuch bhi daal sakte ho — aaj namak (string), kal sikke (int) — PHP ko parwah nahi.',
        codeExample:
          '<?php\n$name   = "Priya";      // string\n$age    = 21;            // int\n$price  = 99.50;         // float\n$isVip  = true;          // bool\n$nothing = null;         // null\n\nvar_dump($age);          // int(21)\necho gettype($price);    // double',
        keyPoints: [
          'Variable naam $ se shuru hote hain, case-sensitive',
          'Loosely typed — type declare nahi karte',
          'Types: string, int, float, bool, array, object, null',
          'var_dump() / gettype() type check ke liye',
        ],
        quiz: [
          {
            question: 'How do PHP variable names begin?',
            options: ['With @', 'With $', 'With &', 'With #'],
            correctIndex: 1,
          },
          {
            question: 'PHP decides a variable\'s type from…',
            options: ['An explicit declaration', 'The assigned value', 'The file name', 'The server config'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What does it mean that PHP is loosely (dynamically) typed?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'It means you do not declare a variable\'s type; PHP infers it from the assigned value and can convert types automatically during operations (type juggling). The same variable can hold a string now and an integer later. This is flexible but can cause surprises — for example "0" == 0 is true under loose comparison, so for safety you often use strict comparison (===) which checks both value and type.',
              hinglish:
                'Iska matlab tum variable ka type declare nahi karte; PHP use assigned value se samajh leta hai aur operations ke dauraan types ko khud convert kar sakta hai (type juggling). Ek hi variable abhi string rakh sakta hai aur baad mein integer. Ye flexible hai par surprise de sakta hai — jaise "0" == 0 loose comparison mein true hota hai, isliye safety ke liye aksar strict comparison (===) use karte hain jo value aur type dono check karta hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Operators & Strings',
    level: 'beginner',
    description: 'Operators, concatenation aur string functions.',
    concepts: [
      {
        title: 'Operators',
        difficulty: 'easy',
        tags: ['operators'],
        explanation: {
          english:
            'PHP has the usual arithmetic operators (+ - * / % and ** for power), assignment (=, +=, .= for strings), and comparison. Comparison comes in two flavours: == checks value only (with type juggling) while === checks value AND type. Logical operators are && (and), || (or), ! (not). A handy ternary ?: gives short if/else, and the null coalescing operator ?? returns the right side when the left is null or unset.',
          hinglish:
            'PHP mein common arithmetic operators hain (+ - * / % aur power ke liye **), assignment (=, +=, strings ke liye .=), aur comparison. Comparison do tarah ka hai: == sirf value check karta hai (type juggling ke saath) jabki === value AUR type dono. Logical operators: && (and), || (or), ! (not). Handy ternary ?: chhota if/else deta hai, aur null coalescing operator ?? left null/unset hone par right side return karta hai.',
        },
        dailyLifeExample:
          '== aur === ka farq aise samjho: == kehta hai "100 rupaye aur 100 ka note barabar hain"; === kehta hai "barabar tabhi jab amount bhi same ho aur form bhi same ho (note vs sikke)". ?? backup plan jaisa hai: "milk hai to milk, warna chai".',
        codeExample:
          '<?php\n$a = 10; $b = 3;\necho $a % $b;        // 1 (remainder)\necho $a ** 2;        // 100 (power)\n\nvar_dump(0 == "0");  // true  (sirf value)\nvar_dump(0 === "0"); // false (value + type)\n\n$age = 18;\necho ($age >= 18) ? "Adult" : "Minor";   // ternary\n$name = $input ?? "Guest";                 // null coalescing',
        keyPoints: [
          'Arithmetic: + - * / % aur ** (power)',
          '== value compare; === value + type (safer)',
          'Logical: && || ! ; ternary cond ? a : b',
          '?? null coalescing — fallback value deta hai',
        ],
        quiz: [
          {
            question: 'Which operator checks BOTH value and type?',
            options: ['==', '===', '=', '!='],
            correctIndex: 1,
          },
          {
            question: 'What does $x ?? "Guest" return when $x is null?',
            options: ['null', 'false', '"Guest"', 'An error'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Strings & Concatenation',
        difficulty: 'easy',
        tags: ['strings'],
        explanation: {
          english:
            'Strings can use double quotes or single quotes. Double quotes interpolate variables ("Hi $name") and parse escapes like \\n; single quotes are literal (\'Hi $name\' prints the dollar text). You join strings with the dot operator (.), not +. Useful functions: strlen() (length), strtoupper()/strtolower(), trim() (strip whitespace), str_replace(), substr(), and strpos() (find position). printf()/sprintf() format strings.',
          hinglish:
            'Strings double quotes ya single quotes mein ho sakti hain. Double quotes variables interpolate karte hain ("Hi $name") aur \\n jaise escapes parse karte hain; single quotes literal hote hain (\'Hi $name\' wo dollar wala text hi print karta hai). Strings ko jodne ke liye dot operator (.) use hota hai, + nahi. Useful functions: strlen() (length), strtoupper()/strtolower(), trim() (whitespace hatao), str_replace(), substr(), aur strpos() (position dhoondo). printf()/sprintf() strings format karte hain.',
        },
        dailyLifeExample:
          'Concatenation (.) do nadiyon ko mila kar ek dhaara banana jaisa hai: "Namaste" . " " . $name = "Namaste Rahul". Double quotes wo smart waiter hain jo "$name" suntey hi asli naam le aate hain.',
        codeExample:
          '<?php\n$first = "Aman";\n$last  = "Verma";\n\n$full = $first . " " . $last;   // dot se concat\necho "Hello, $full!";           // double quotes interpolate\necho \'Hello, $full!\';           // literal: Hello, $full!\n\necho strlen($full);             // 9\necho strtoupper($full);         // AMAN VERMA\necho str_replace("Aman", "Raj", $full);',
        keyPoints: [
          'Concatenation dot (.) se hoti hai, + se nahi',
          'Double quotes interpolate; single quotes literal',
          'strlen, trim, strtoupper, str_replace, substr useful hain',
          'sprintf()/printf() formatted output dete hain',
        ],
        quiz: [
          {
            question: 'Which operator joins two strings in PHP?',
            options: ['+', '.', '&', '||'],
            correctIndex: 1,
          },
          {
            question: 'In single quotes, does \'Hi $name\' insert the variable?',
            options: ['Yes, always', 'No, it stays literal', 'Only on the server', 'Only with echo'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Control Flow & Loops',
    level: 'beginner',
    description: 'if/else, switch aur loops se decisions aur repetition.',
    concepts: [
      {
        title: 'if / else & switch',
        difficulty: 'easy',
        tags: ['control-flow', 'conditions'],
        explanation: {
          english:
            'Decisions use if, elseif, and else — the first true condition\'s block runs. For comparing one value against many fixed options, switch is cleaner: each case is checked in order, break stops fall-through, and default catches everything else. PHP also has a short ternary for tiny inline choices. Remember elseif is one word (or else if as two words inside braces).',
          hinglish:
            'Decisions if, elseif, aur else se hote hain — pehli true condition ka block chalta hai. Jab ek value ko kai fixed options se compare karna ho, switch zyada saaf hai: har case order mein check hota hai, break fall-through rokta hai, aur default baaki sab pakadta hai. Chhote inline choices ke liye ternary bhi hai. Yaad rakho elseif ek word hai (ya braces ke andar else if do words).',
        },
        dailyLifeExample:
          'if/else traffic signal jaisa hai: laal -> ruko, hara -> chalo, warna -> sambhal ke. switch chai ki tapri ka menu hai — "adrak", "elaichi", "masala" — jo bola wahi banega, kuch aur bola to "default" simple chai.',
        codeExample:
          '<?php\n$marks = 72;\nif ($marks >= 90) {\n  echo "A";\n} elseif ($marks >= 60) {\n  echo "B";\n} else {\n  echo "Try again";\n}\n\n$day = "sun";\nswitch ($day) {\n  case "sat":\n  case "sun":\n    echo "Weekend!"; break;\n  default:\n    echo "Working day";\n}',
        keyPoints: [
          'if / elseif / else — pehli true condition chalti hai',
          'switch ek value ko kai cases se match karta hai',
          'break fall-through rokta hai; default fallback',
          'Multiple cases stack ho sakte hain (sat/sun -> Weekend)',
        ],
        quiz: [
          {
            question: 'In a switch, what stops execution from falling into the next case?',
            options: ['continue', 'break', 'stop', 'return only'],
            correctIndex: 1,
          },
          {
            question: 'Which runs when no case matches in a switch?',
            options: ['else', 'default', 'catch', 'final'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Loops: for, while & foreach',
        difficulty: 'easy',
        tags: ['loops', 'foreach'],
        explanation: {
          english:
            'Loops repeat code. for is best when you know the count (init; condition; step). while repeats as long as a condition stays true; do...while runs the body at least once. foreach is the PHP favourite for arrays — it walks every element, and with key => value it gives you both the key and the value. break exits a loop early; continue skips to the next iteration.',
          hinglish:
            'Loops code dohraate hain. for tab best hai jab count pata ho (init; condition; step). while tab tak chalta hai jab tak condition true rahe; do...while body kam se kam ek baar chalata hai. foreach PHP ka favourite hai arrays ke liye — ye har element par ghoomta hai, aur key => value ke saath key aur value dono deta hai. break loop jaldi todta hai; continue agle iteration par jaata hai.',
        },
        dailyLifeExample:
          'foreach sabzi mandi mein har thaila ek-ek karke uthane jaisa hai — "har item nikaalo, daam jodo". for tab use karo jab pata ho "10 chakkar lagane hain"; while jab "jab tak baarish ho rahi hai, chhata khula rakho".',
        codeExample:
          '<?php\nfor ($i = 1; $i <= 3; $i++) {\n  echo "Round $i\\n";\n}\n\n$cart = ["Milk", "Bread", "Eggs"];\nforeach ($cart as $item) {\n  echo "- $item\\n";\n}\n\n$prices = ["Milk" => 30, "Bread" => 40];\nforeach ($prices as $name => $rs) {\n  echo "$name: Rs $rs\\n";\n}',
        keyPoints: [
          'for: known count (init; condition; step)',
          'while / do...while: condition-based (do...while min ek baar)',
          'foreach arrays par best — as $value ya as $key => $value',
          'break loop chhodta hai; continue iteration skip karta hai',
        ],
        quiz: [
          {
            question: 'Which loop is most idiomatic for iterating a PHP array?',
            options: ['for', 'foreach', 'do...while', 'goto'],
            correctIndex: 1,
          },
          {
            question: 'Which loop guarantees the body runs at least once?',
            options: ['while', 'for', 'do...while', 'foreach'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Arrays & Functions',
    level: 'intermediate',
    description: 'Indexed/associative arrays, array functions aur apne functions.',
    concepts: [
      {
        title: 'Arrays: Indexed & Associative',
        difficulty: 'medium',
        tags: ['arrays'],
        explanation: {
          english:
            'A PHP array holds many values in one variable. Indexed arrays use numeric keys starting at 0 ($a[0]); associative arrays use named keys ($user["name"]). Arrays can nest to form structures. Handy functions: count() (size), array_push()/[] (add), array_keys()/array_values(), in_array() (search), sort()/asort()/ksort(), array_map()/array_filter(). The => arrow assigns a value to a key.',
          hinglish:
            'PHP array ek hi variable mein bahut saari values rakhta hai. Indexed arrays numeric keys use karte hain jo 0 se shuru hote hain ($a[0]); associative arrays named keys ($user["name"]). Arrays nest ho kar structures bana sakte hain. Handy functions: count() (size), array_push()/[] (add), array_keys()/array_values(), in_array() (search), sort()/asort()/ksort(), array_map()/array_filter(). => arrow ek value ko key se assign karta hai.',
        },
        dailyLifeExample:
          'Indexed array train ki bogie jaisa hai — seat 0, 1, 2 number ke hisaab se. Associative array tumhare phone ke contacts jaisa hai — number "Maa" ya "Boss" naam se milta hai, position se nahi.',
        codeExample:
          '<?php\n$fruits = ["Apple", "Mango", "Banana"]; // indexed\necho $fruits[1];          // Mango\n$fruits[] = "Guava";      // add at end\n\n$user = [                  // associative\n  "name" => "Sneha",\n  "city" => "Pune",\n];\necho $user["city"];       // Pune\necho count($user);        // 2\nvar_dump(in_array("Mango", $fruits)); // true',
        keyPoints: [
          'Indexed: numeric keys 0 se; associative: named keys',
          '=> arrow key ko value se jodta hai',
          'count(), in_array(), array_keys(), array_map() useful',
          'Arrays nest ho kar complex data structures bana sakte hain',
        ],
        quiz: [
          {
            question: 'In $user = ["name" => "Sneha"], how do you read the name?',
            options: ['$user[0]', '$user["name"]', '$user.name', '$user->name'],
            correctIndex: 1,
          },
          {
            question: 'Indexed array keys start at…',
            options: ['1', '0', '-1', 'Any number'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Functions: Define, Parameters & Return',
        difficulty: 'medium',
        tags: ['functions'],
        explanation: {
          english:
            'Functions package reusable logic. Declare with function name(params) { ... } and call it by name. Parameters can have default values (function greet($name = "Guest")) and you can return a value with return (a function without return gives null). PHP 7+ supports type hints and return types (function add(int $a, int $b): int). Variables inside a function are local unless you bring them in via parameters.',
          hinglish:
            'Functions reusable logic ko package karte hain. function name(params) { ... } se declare karo aur naam se call karo. Parameters ki default values ho sakti hain (function greet($name = "Guest")) aur return se value wapas karte ho (bina return ka function null deta hai). PHP 7+ type hints aur return types support karta hai (function add(int $a, int $b): int). Function ke andar ke variables local hote hain jab tak parameters se andar na laao.',
        },
        dailyLifeExample:
          'Function ek nuskha (recipe) jaisa hai: ek baar likho "chai banao(cheeni, doodh)", phir jab chahe call karo. Parameters ingredients hain, return banaai hui chai jo wapas milti hai.',
        codeExample:
          '<?php\nfunction greet($name = "Guest") {\n  return "Namaste, $name!";\n}\necho greet("Riya");   // Namaste, Riya!\necho greet();          // Namaste, Guest!\n\nfunction add(int $a, int $b): int {\n  return $a + $b;\n}\necho add(2, 3);        // 5',
        keyPoints: [
          'function name(params) { ... } se define, naam se call',
          'Default parameter values supported',
          'return se value milti hai; warna null',
          'PHP 7+ mein type hints aur return types',
        ],
        quiz: [
          {
            question: 'A PHP function with no return statement returns…',
            options: ['0', 'false', 'null', 'An error'],
            correctIndex: 2,
          },
          {
            question: 'What does function greet($name = "Guest") demonstrate?',
            options: ['A return type', 'A default parameter value', 'A global variable', 'Recursion'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is variable scope in PHP and how do you access a global inside a function?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'By default, variables declared outside a function are NOT visible inside it — function bodies have their own local scope. To use an outer variable inside a function you either pass it as a parameter (preferred), declare it with the global keyword, or access it via the $GLOBALS superglobal array. Passing as a parameter is cleanest because it avoids hidden dependencies and makes the function easier to test.',
              hinglish:
                'Default roop se, function ke bahar declare kiye variables uske andar VISIBLE nahi hote — function body ka apna local scope hota hai. Bahar wale variable ko andar use karne ke liye ya to use parameter ke roop mein pass karo (best), global keyword se declare karo, ya $GLOBALS superglobal array se access karo. Parameter pass karna sabse saaf hai kyunki ye chhipi hui dependencies se bachata hai aur function ko test karna aasaan banata hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Forms & Superglobals',
    level: 'intermediate',
    description: 'Form data lena, sessions, cookies aur input sanitize karna.',
    concepts: [
      {
        title: 'Handling Forms: $_GET & $_POST',
        difficulty: 'medium',
        tags: ['forms', 'superglobals'],
        explanation: {
          english:
            'When an HTML form submits, PHP receives the fields in superglobals — special arrays available everywhere. $_GET holds data sent in the URL query string (method="get"), while $_POST holds data sent in the request body (method="post"). Use GET for harmless, bookmarkable queries (like search) and POST for sensitive or state-changing data (like login or signup). Always check isset() before reading a field to avoid undefined-key warnings.',
          hinglish:
            'Jab ek HTML form submit hota hai, PHP fields ko superglobals mein receive karta hai — special arrays jo har jagah available hote hain. $_GET URL query string mein bheja data rakhta hai (method="get"), jabki $_POST request body mein bheja data (method="post"). GET un queries ke liye jo harmless aur bookmark ho sakein (jaise search), POST sensitive ya state-change karne wale data ke liye (jaise login ya signup). Field padhne se pehle hamesha isset() check karo taaki undefined-key warning na aaye.',
        },
        dailyLifeExample:
          'GET postcard jaisa hai — sab kuch upar likha (URL) sabko dikhta hai. POST band lifaafe (envelope) jaisa hai — andar ka data seedha dikhta nahi, isliye password jaise raaz POST se bhejo.',
        codeExample:
          '<!-- form.html -->\n<form action="submit.php" method="post">\n  <input name="email">\n  <button>Send</button>\n</form>\n\n<?php\n// submit.php\nif (isset($_POST["email"])) {\n  $email = $_POST["email"];\n  echo "Got: $email";\n}\n// search.php?q=php  ->  $_GET["q"] is "php"\n$q = $_GET["q"] ?? "";',
        keyPoints: [
          'Superglobals ($_GET, $_POST) har jagah available arrays hain',
          '$_GET = URL query string; $_POST = request body',
          'GET search/bookmark ke liye; POST sensitive data ke liye',
          'Field padhne se pehle isset() check karo',
        ],
        quiz: [
          {
            question: 'Which superglobal holds data from a form using method="post"?',
            options: ['$_GET', '$_POST', '$_FILES', '$_ENV'],
            correctIndex: 1,
          },
          {
            question: 'For a login form, which method is more appropriate?',
            options: ['GET', 'POST', 'It does not matter', 'HEAD'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Sessions, Cookies & Sanitization',
        difficulty: 'medium',
        tags: ['session', 'cookie', 'security'],
        explanation: {
          english:
            'HTTP is stateless — the server forgets you between requests. Sessions fix this: call session_start() at the top, then store data in $_SESSION (kept on the server, tied to a cookie ID) — perfect for "is this user logged in?". Cookies ($_COOKIE, set via setcookie()) store small data in the browser itself. Crucial rule: NEVER trust user input. Validate it (is it really an email?) and sanitize/escape it. Use htmlspecialchars() before printing input to block XSS, and prepared statements (next topic) to block SQL injection.',
          hinglish:
            'HTTP stateless hai — server har request ke beech tumhe bhool jaata hai. Sessions ye theek karte hain: upar session_start() call karo, phir data $_SESSION mein store karo (server par rehta hai, ek cookie ID se juda) — "ye user logged in hai kya?" ke liye perfect. Cookies ($_COOKIE, setcookie() se set) chhota data browser mein hi store karte hain. Zaroori niyam: user input par KABHI bharosa mat karo. Use validate karo (kya ye sach mein email hai?) aur sanitize/escape karo. Input print karne se pehle htmlspecialchars() use karo taaki XSS ruk jaaye, aur SQL injection rokne ke liye prepared statements (agla topic).',
        },
        dailyLifeExample:
          'Session cinema ka haath par laga stamp hai — andar jao, dukandaar yaad rakhta hai tum entry kar chuke ho. Cookie tumhari jeb ki parchi hai. Sanitization darwaze ka guard hai jo har aane wale ki talashi leta hai — "andar aane se pehle apna saaman check karao".',
        codeExample:
          '<?php\nsession_start();\n$_SESSION["user"] = "Aman";   // server-side\n\nsetcookie("theme", "dark", time() + 3600); // browser, 1 hr\n\n// Sanitize input before showing it back\n$raw = $_POST["comment"] ?? "";\n$safe = htmlspecialchars(trim($raw));\necho $safe; // <script> ab harmless text ban gaya',
        keyPoints: [
          'session_start() phir $_SESSION — server-side, login ke liye',
          'Cookies ($_COOKIE / setcookie) browser mein chhota data',
          'User input par bharosa mat karo: validate + sanitize',
          'htmlspecialchars() XSS rokta hai; prepared statements SQL injection',
        ],
        quiz: [
          {
            question: 'Where is $_SESSION data primarily stored?',
            options: ['In the URL', 'On the server', 'In the browser cookie value', 'In the database by default'],
            correctIndex: 1,
          },
          {
            question: 'Which function helps prevent XSS when echoing user input?',
            options: ['strlen()', 'htmlspecialchars()', 'count()', 'session_start()'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between sessions and cookies in PHP?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Cookies store small pieces of data in the user\'s browser and are sent back with every request; they are visible/editable by the client, so they are not safe for sensitive data. Sessions store data on the server and only keep a session ID in a cookie; the actual data never leaves the server, making them more secure for things like login state. In short, cookies = client-side storage, sessions = server-side storage referenced by a cookie ID.',
              hinglish:
                'Cookies user ke browser mein chhota data store karti hain aur har request ke saath wapas bheji jaati hain; ye client ko dikhti/editable hoti hain, isliye sensitive data ke liye safe nahi. Sessions data server par store karti hain aur cookie mein sirf ek session ID rakhti hain; asli data kabhi server se bahar nahi jaata, isliye login state jaisi cheezon ke liye zyada secure. Short mein, cookies = client-side storage, sessions = server-side storage jise cookie ID se reference kiya jaata hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Working with MySQL',
    level: 'intermediate',
    description: 'Connect karo, query chalao aur prepared statements se safe raho.',
    concepts: [
      {
        title: 'Connecting & Querying MySQL',
        difficulty: 'medium',
        tags: ['mysql', 'database', 'pdo'],
        explanation: {
          english:
            'PHP talks to MySQL through two main extensions: mysqli and PDO. PDO is preferred because it works across many databases and has a clean, consistent API. You create a connection (with host, db name, user, password), run a query, then fetch the result rows. With PDO you call $pdo->query() for simple reads and fetch() / fetchAll() to get rows as associative arrays. Always wrap connections in try/catch so failures are handled gracefully.',
          hinglish:
            'PHP MySQL se do main extensions ke zariye baat karta hai: mysqli aur PDO. PDO preferred hai kyunki ye kai databases ke saath kaam karta hai aur iska API saaf aur consistent hai. Tum ek connection banate ho (host, db name, user, password ke saath), query chalate ho, phir result rows fetch karte ho. PDO mein simple reads ke liye $pdo->query() aur rows ko associative arrays ke roop mein paane ke liye fetch() / fetchAll(). Connection ko hamesha try/catch mein wrap karo taaki failures gracefully handle hon.',
        },
        dailyLifeExample:
          'Database connection bank ke locker tak pahunchne jaisa hai — pehle ID (host, user, password) do, phir locker khulta hai. Query slip likhna hai "mujhe ye records do"; fetch() un records ko ek-ek karke haath mein dena hai.',
        codeExample:
          '<?php\ntry {\n  $pdo = new PDO(\n    "mysql:host=localhost;dbname=shop",\n    "root", "secret"\n  );\n  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n\n  $stmt = $pdo->query("SELECT name, price FROM products");\n  foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {\n    echo $row["name"] . ": " . $row["price"] . "\\n";\n  }\n} catch (PDOException $e) {\n  echo "DB error: " . $e->getMessage();\n}',
        keyPoints: [
          'Do extensions: mysqli aur PDO (PDO recommended)',
          'Connect: host, dbname, user, password',
          'query() chalao, fetch()/fetchAll() se rows lo',
          'try/catch + PDOException se errors handle karo',
        ],
        quiz: [
          {
            question: 'Which is generally preferred for its cross-database, consistent API?',
            options: ['mysql_*', 'PDO', 'fopen', 'cURL'],
            correctIndex: 1,
          },
          {
            question: 'Which method returns all rows at once with PDO?',
            options: ['fetchAll()', 'count()', 'connect()', 'bind()'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Prepared Statements',
        difficulty: 'hard',
        tags: ['mysql', 'security', 'sql-injection'],
        explanation: {
          english:
            'NEVER build SQL by gluing user input into the query string — that is how SQL injection happens (an attacker types \' OR 1=1 -- and dumps your table). Prepared statements fix this: you write the SQL with placeholders (? or :named), then bind the user values separately. The database treats those values as pure data, never as code. With PDO: $pdo->prepare(...), then ->execute([...]). This is both safer AND often faster for repeated queries.',
          hinglish:
            'User input ko query string mein chipka kar SQL KABHI mat banao — isi se SQL injection hoti hai (attacker \' OR 1=1 -- type karke poora table nikaal le jaata hai). Prepared statements ye theek karte hain: tum SQL placeholders (? ya :named) ke saath likhte ho, phir user values ko alag se bind karte ho. Database un values ko pure data maanta hai, kabhi code nahi. PDO mein: $pdo->prepare(...), phir ->execute([...]). Ye safer bhi hai AUR repeated queries ke liye aksar faster.',
        },
        dailyLifeExample:
          'Direct query banana ajnabi ko apne ghar ki chaabi de dena hai. Prepared statement letter-box jaisa hai — ajnabi sirf chitthi (data) daal sakta hai, ghar ke andar (SQL logic) ghus nahi sakta, chahe woh kuch bhi likhe.',
        codeExample:
          '<?php\n// User input — bharosa NAHI\n$email = $_POST["email"] ?? "";\n\n$stmt = $pdo->prepare(\n  "SELECT id, name FROM users WHERE email = ?"\n);\n$stmt->execute([$email]);   // value alag se bind hui\n$user = $stmt->fetch(PDO::FETCH_ASSOC);\n\nif ($user) {\n  echo "Welcome, " . $user["name"];\n} else {\n  echo "No such user";\n}',
        keyPoints: [
          'User input ko kabhi query string mein concat mat karo',
          'Placeholders (? ya :named) + alag se values bind',
          'Database values ko data maanta hai, code nahi',
          'PDO: prepare() phir execute([...]) — safe + fast',
        ],
        quiz: [
          {
            question: 'Prepared statements primarily protect against…',
            options: ['CSS bugs', 'SQL injection', 'Slow CSS', 'Broken images'],
            correctIndex: 1,
          },
          {
            question: 'In a prepared statement, user values are…',
            options: ['Concatenated into the SQL', 'Bound separately as data', 'Ignored', 'Run as code'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is SQL injection and how do prepared statements prevent it?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'SQL injection happens when untrusted user input is concatenated directly into an SQL string, letting an attacker inject their own SQL (e.g. \' OR 1=1 -- to bypass a login or dump data). Prepared statements prevent it by separating the query structure from the data: you send the SQL with placeholders first, then send the values separately, so the database parses the query before it ever sees user input and always treats those values as literal data, never as executable SQL. Combined with input validation, this is the standard defence.',
              hinglish:
                'SQL injection tab hoti hai jab untrusted user input seedha SQL string mein concat ho jaata hai, jisse attacker apni SQL inject kar sakta hai (jaise \' OR 1=1 -- se login bypass ya data dump). Prepared statements ise rokte hain query structure ko data se alag karke: pehle SQL placeholders ke saath bhejte ho, phir values alag se, isliye database query ko user input dekhne se PEHLE parse kar leta hai aur un values ko hamesha literal data maanta hai, kabhi executable SQL nahi. Input validation ke saath milakar yahi standard bachaav hai.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'OOP in PHP',
    level: 'advanced',
    description: 'Classes, objects, visibility, constructors aur inheritance.',
    concepts: [
      {
        title: 'Classes, Objects & $this',
        difficulty: 'hard',
        tags: ['oop', 'classes'],
        explanation: {
          english:
            'Object-oriented PHP lets you bundle related data (properties) and behaviour (methods) into a class — a blueprint. You create objects from it with new. Inside methods, $this refers to the current object so you can read/write its own properties ($this->name). A __construct() method runs automatically when you create an object, perfect for setting initial values. Properties and methods are accessed with the arrow -> (not the dot).',
          hinglish:
            'Object-oriented PHP related data (properties) aur behaviour (methods) ko ek class mein bundle karne deta hai — ek blueprint. Tum usse new se objects banate ho. Methods ke andar, $this current object ko refer karta hai taaki uski apni properties padh/likh sako ($this->name). __construct() method object banate hi apne aap chalta hai, initial values set karne ke liye perfect. Properties aur methods arrow -> se access hote hain (dot se nahi).',
        },
        dailyLifeExample:
          'Class ek halwai ka recipe-card hai "Samosa". Har banaya hua samosa ek object hai. $this kehta hai "is wale samose ki baat kar raha hoon" — har samosa apni filling rakhta hai, doosre se alag.',
        codeExample:
          '<?php\nclass Student {\n  public $name;\n  public $marks;\n\n  public function __construct($name, $marks) {\n    $this->name  = $name;\n    $this->marks = $marks;\n  }\n\n  public function report() {\n    return "$this->name scored $this->marks";\n  }\n}\n\n$s = new Student("Kiran", 88);\necho $s->report();   // Kiran scored 88',
        keyPoints: [
          'class = blueprint; new se object banta hai',
          '$this current object ko refer karta hai',
          '__construct() object banate hi auto-run hota hai',
          'Members arrow -> se access hote hain (dot nahi)',
        ],
        quiz: [
          {
            question: 'Which method runs automatically when an object is created?',
            options: ['__init()', '__construct()', '__main()', '__new()'],
            correctIndex: 1,
          },
          {
            question: 'Inside a method, $this refers to…',
            options: ['The class file', 'The current object', 'The global scope', 'The parent class'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Visibility & Inheritance',
        difficulty: 'hard',
        tags: ['oop', 'inheritance', 'encapsulation'],
        explanation: {
          english:
            'Visibility controls who can touch a member: public (anyone), protected (this class and subclasses), and private (only this class). Keeping properties private and exposing safe getters/setters is called encapsulation. Inheritance lets one class extend another, reusing its code: class Admin extends User. The child gets the parent\'s public/protected members and can add or override methods; parent::method() calls the original. This builds an "is-a" relationship — an Admin IS a User.',
          hinglish:
            'Visibility control karti hai ki member ko kaun chhoo sakta hai: public (koi bhi), protected (ye class aur subclasses), aur private (sirf ye class). Properties ko private rakhna aur safe getters/setters dena encapsulation kehlaata hai. Inheritance ek class ko doosri ko extend karne deta hai, uska code reuse karke: class Admin extends User. Child ko parent ke public/protected members milte hain aur woh methods add ya override kar sakta hai; parent::method() original ko call karta hai. Ye "is-a" relationship banata hai — ek Admin EK User HAI.',
        },
        dailyLifeExample:
          'private bank locker ke andar ka cash hai — sirf khaata-dhaarak ko. public reception desk hai jahan sab aa sakte hain. Inheritance aise hai: "Manager" bhi ek "Employee" hai — saari employee suvidhayein milti hain, upar se kuch extra powers.',
        codeExample:
          '<?php\nclass User {\n  protected $name;\n  public function __construct($name) { $this->name = $name; }\n  public function role() { return "User"; }\n}\n\nclass Admin extends User {\n  public function role() {        // override\n    return "Admin (" . parent::role() . ")";\n  }\n}\n\n$a = new Admin("Devi");\necho $a->role();   // Admin (User)',
        keyPoints: [
          'public / protected / private member access control karte hain',
          'Encapsulation: private data + getters/setters',
          'extends se inheritance — code reuse, "is-a"',
          'Override + parent::method() se original call',
        ],
        quiz: [
          {
            question: 'Which visibility allows access only within the same class?',
            options: ['public', 'protected', 'private', 'global'],
            correctIndex: 2,
          },
          {
            question: 'How does a class inherit from another in PHP?',
            options: ['implements', 'extends', 'uses', 'inherits'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the three visibility keywords and why encapsulation matters.',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'public members are accessible from anywhere, protected from the declaring class and its subclasses, and private only from within the declaring class itself. Encapsulation means hiding internal state behind private/protected properties and exposing controlled access through methods (getters/setters). It matters because it prevents outside code from putting the object into an invalid state, lets you validate changes in one place, and allows you to change the internal implementation later without breaking code that depends on the public interface.',
              hinglish:
                'public members kahin se bhi accessible hote hain, protected declaring class aur uski subclasses se, aur private sirf declaring class ke andar se. Encapsulation ka matlab internal state ko private/protected properties ke peeche chhipana aur methods (getters/setters) ke zariye controlled access dena. Ye isliye matter karta hai kyunki ye bahar ke code ko object ko invalid state mein daalne se rokta hai, changes ko ek hi jagah validate karne deta hai, aur baad mein internal implementation badalne deta hai bina us code ko toda jo public interface par depend karta hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Practical PHP',
    level: 'advanced',
    description: 'Files include karna, login sessions aur error handling.',
    concepts: [
      {
        title: 'include / require & Login Sessions',
        difficulty: 'medium',
        tags: ['include', 'session', 'auth'],
        explanation: {
          english:
            'Real projects split code across files. include "header.php" pulls another file in; require does the same but FATALS if the file is missing (use it for critical files like config or DB connection). The *_once variants prevent double-loading. A typical login flow: verify the user against the database, then store $_SESSION["user_id"] on success; protected pages call session_start() and check that key, redirecting to the login page if it is missing. To log out, session_destroy().',
          hinglish:
            'Real projects code ko kai files mein baant te hain. include "header.php" doosri file ko kheench laata hai; require bhi wahi karta hai par file na milne par FATAL error deta hai (critical files jaise config ya DB connection ke liye use karo). *_once variants double-loading rokte hain. Typical login flow: user ko database se verify karo, phir success par $_SESSION["user_id"] store karo; protected pages session_start() call karke us key ko check karte hain, na milne par login page par redirect kar dete hain. Logout ke liye, session_destroy().',
        },
        dailyLifeExample:
          'include un common parts jaise hai jo har page par chahiye — header aur footer ek baar likho, har jagah laga do, jaise letterhead. Login session club ka membership card hai: andar ek baar dikhaya, har kamre mein bina dobara poochhe entry.',
        codeExample:
          '<?php\nrequire_once "db.php";   // critical: must exist\ninclude "header.php";    // optional decoration\n\nsession_start();\nif (!isset($_SESSION["user_id"])) {\n  header("Location: login.php");  // not logged in\n  exit;\n}\n// ... protected page content ...\n\n// logout.php\n// session_start(); session_destroy();',
        keyPoints: [
          'include warn karta hai, require file na mile to FATAL',
          '*_once double-load se bachata hai',
          'Login: verify -> $_SESSION["user_id"] set karo',
          'Protected page key check kare; logout = session_destroy()',
        ],
        quiz: [
          {
            question: 'What happens if a require\'d file is missing?',
            options: ['A warning, script continues', 'A fatal error, script stops', 'Nothing', 'It auto-creates the file'],
            correctIndex: 1,
          },
          {
            question: 'Which ends a user session on logout?',
            options: ['session_start()', 'session_destroy()', 'unset_all()', 'logout()'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Error & Exception Handling',
        difficulty: 'medium',
        tags: ['errors', 'exceptions'],
        explanation: {
          english:
            'Robust apps anticipate failure. Modern PHP uses exceptions: wrap risky code in try, throw an exception on a problem, and handle it in catch (ExceptionType $e), with optional finally that always runs (great for cleanup). Read details with $e->getMessage(). During development, show errors (ini_set("display_errors", 1)); in production, log them instead and show users a friendly message. You can also define custom exception classes by extending Exception for clearer, typed error handling.',
          hinglish:
            'Mazboot apps failure ki ummeed rakhte hain. Modern PHP exceptions use karta hai: risky code ko try mein wrap karo, problem par exception throw karo, aur use catch (ExceptionType $e) mein handle karo, optional finally ke saath jo hamesha chalta hai (cleanup ke liye badhiya). Details $e->getMessage() se padho. Development mein errors dikhao (ini_set("display_errors", 1)); production mein unhe log karo aur users ko ek friendly message dikhao. Saaf, typed error handling ke liye Exception ko extend karke apni custom exception classes bhi bana sakte ho.',
        },
        dailyLifeExample:
          'try/catch building ke fire-safety plan jaisa hai: aag (error) lagne par paani ki jagah ghabraao mat — catch wala plan chalu ho jaata hai. finally exit ka woh raasta hai jo har haal mein use hota hai, aag lage ya na lage.',
        codeExample:
          '<?php\nfunction divide($a, $b) {\n  if ($b === 0) {\n    throw new InvalidArgumentException("Zero se divide nahi");\n  }\n  return $a / $b;\n}\n\ntry {\n  echo divide(10, 0);\n} catch (InvalidArgumentException $e) {\n  echo "Error: " . $e->getMessage();\n} finally {\n  echo "\\nDone (hamesha chalta hai)";\n}',
        keyPoints: [
          'try / catch / finally se exceptions handle karo',
          'throw new Exception(...) problem signal karne ke liye',
          '$e->getMessage() details deta hai',
          'Dev: display errors; production: log + friendly message',
        ],
        quiz: [
          {
            question: 'Which block always runs whether or not an exception is thrown?',
            options: ['try', 'catch', 'finally', 'throw'],
            correctIndex: 2,
          },
          {
            question: 'How do you signal an error condition to be caught?',
            options: ['return error', 'throw new Exception(...)', 'die()', 'echo'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How should you handle errors differently in development vs production?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'In development you want errors visible immediately, so you enable display_errors and a high error_reporting level to catch warnings and notices early. In production you must NOT show raw errors to users — they leak file paths, queries, and other sensitive details that help attackers. Instead turn off display_errors, turn ON logging (log_errors to a file or a service), and show users a generic, friendly message. Wrapping risky operations in try/catch and logging the exception lets you fail gracefully while still recording what went wrong.',
              hinglish:
                'Development mein tum errors turant dikhana chahte ho, isliye display_errors aur high error_reporting level on karte ho taaki warnings aur notices jaldi pakad sako. Production mein users ko raw errors KABHI mat dikhao — ye file paths, queries aur doosre sensitive details leak karte hain jo attackers ki madad karte hain. Iske bajaye display_errors off karo, logging ON karo (log_errors ek file ya service mein), aur users ko ek generic, friendly message dikhao. Risky operations ko try/catch mein wrap karke exception log karna tumhe gracefully fail hone deta hai aur saath hi record bhi rakhta hai ki kya galat hua.',
            },
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between == and === in PHP?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '== is the loose equality operator: it compares only values and will type-juggle operands first, so 0 == "0" and even 0 == "" can behave surprisingly. === is the strict equality operator: it returns true only when both the value AND the type match, with no conversion. As a rule, prefer === to avoid subtle bugs caused by automatic type coercion, especially when comparing against numbers, empty strings, or false.',
      hinglish:
        '== loose equality operator hai: ye sirf values compare karta hai aur pehle operands ko type-juggle karta hai, isliye 0 == "0" aur kabhi-kabhi 0 == "" surprising behave kar sakte hain. === strict equality operator hai: ye tabhi true deta hai jab value AUR type dono match karein, bina kisi conversion ke. Niyam: === ko prefer karo taaki automatic type coercion se hone wale chhipe bugs se bach sako, khaaskar numbers, empty strings, ya false se compare karte waqt.',
    },
  },
  {
    question: 'How do you keep a PHP application secure against common web attacks?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The core principle is: never trust user input. Use prepared statements (PDO or mysqli) for all database queries to stop SQL injection. Escape output with htmlspecialchars() before printing user data to prevent XSS. Validate and sanitize every incoming field, and use POST plus CSRF tokens for state-changing actions. Hash passwords with password_hash()/password_verify() — never store them in plain text. In production, disable display_errors and log errors instead, keep PHP updated, and serve over HTTPS so session cookies cannot be stolen.',
      hinglish:
        'Mool siddhant hai: user input par kabhi bharosa mat karo. Saari database queries ke liye prepared statements (PDO ya mysqli) use karo taaki SQL injection ruke. User data print karne se pehle output ko htmlspecialchars() se escape karo taaki XSS na ho. Har incoming field ko validate aur sanitize karo, aur state-change karne wale actions ke liye POST plus CSRF tokens use karo. Passwords ko password_hash()/password_verify() se hash karo — kabhi plain text mein store mat karo. Production mein display_errors band karo aur errors log karo, PHP updated rakho, aur HTTPS par serve karo taaki session cookies churaai na ja sakein.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
