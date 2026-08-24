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
  icon: 'database',
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
        title: 'Modern PHP: Null Coalescing (??) & match',
        difficulty: 'medium',
        tags: ['null-coalescing', 'match', 'modern-php'],
        explanation: {
          english:
            "The null coalescing operator (??) returns its left side if it exists and is not null, otherwise the right side — perfect for default values without a verbose isset() check: $name = $_GET['name'] ?? 'Guest'. Its cousin ??= assigns only if the variable is currently null/unset. PHP 8 introduced match as a more powerful, safer alternative to switch: it uses STRICT comparison (===, no type coercion), requires no break statements (no fall-through bugs), and is an EXPRESSION that returns a value directly, and it throws an error if no case matches (unless you add a default).",
          hinglish:
            "Null coalescing operator (??) apni left side return karta hai agar wo exist karti hai aur null nahi hai, warna right side — bina verbose isset() check ke default values ke liye perfect: $name = $_GET['name'] ?? 'Guest'. Iska cousin ??= sirf tabhi assign karta hai jab variable abhi null/unset ho. PHP 8 ne match introduce kiya switch ke ek zyada powerful, safer alternative ki tarah: ye STRICT comparison use karta hai (===, koi type coercion nahi), koi break statements nahi chahiye (fall-through bugs nahi), aur ye ek EXPRESSION hai jo seedha value return karta hai, aur agar koi case match na ho to error throw karta hai (jab tak default na ho).",
        },
        dailyLifeExample:
          "?? ek backup plan jaisa hai — 'agar primary option available hai to wo lo, warna backup lo'. match ek smart vending machine jaisa hai — button dabao, exact match wali cheez seedha haath mein aa jaati hai (return), koi 'aur bhi dabana padega' (break) nahi chahiye.",
        codeExample:
          "<?php\n// Null coalescing: default when missing/null\n$name = $_GET['name'] ?? 'Guest';\necho \"Hello, $name\";\n\n// ??= assigns only if currently null/unset\n$config['theme'] ??= 'dark'; // sets only if not already set\n\n// match: strict, no fall-through, returns a value\n$statusCode = 404;\n$message = match ($statusCode) {\n    200 => 'OK',\n    404 => 'Not Found',\n    500 => 'Server Error',\n    default => 'Unknown Status',\n};\necho $message; // 'Not Found'\n\n// match uses === (strict) — this matters!\n$value = '1';\n$result = match ($value) {\n    1 => 'matched as int',      // NOT matched — '1' !== 1\n    '1' => 'matched as string', // this one matches\n};",
        keyPoints: [
          '$x ?? $default returns $x if it exists and is not null, otherwise $default',
          '??= assigns a value only if the variable is currently null/unset',
          'match compares with STRICT === (no type coercion), unlike switch which uses ==',
          'match needs no break — each arm returns automatically, no fall-through bugs',
          'match is an expression (you can assign its result); switch is a statement (it is not)',
        ],
        quiz: [
          {
            question: "What does $name = $_GET['name'] ?? 'Guest'; do if 'name' is not in $_GET?",
            options: ['Throws an error', 'Assigns "Guest" to $name', 'Assigns null to $name', 'Does nothing'],
            correctIndex: 1,
          },
          {
            question: 'Does match use strict (===) or loose (==) comparison?',
            options: ['Loose (==), same as switch', 'Strict (===), unlike switch', 'Neither, it does not compare at all', 'It depends on a setting'],
            correctIndex: 1,
          },
          {
            question: 'What is a key advantage of match over switch regarding fall-through bugs?',
            options: ['match has the same fall-through risk', 'match needs no break statements — each arm is self-contained, eliminating accidental fall-through', 'match cannot have multiple cases', 'switch does not have fall-through either'],
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
      {
        title: 'Functional Array Methods: array_map, array_filter & array_reduce',
        difficulty: 'medium',
        tags: ['arrays', 'functions'],
        explanation: {
          english:
            'Beyond loops, PHP has three functional array tools that transform data in one line, similar to their equivalents in JavaScript. array_map(callback, array) applies a function to EVERY element and returns a new array of the same length. array_filter(array, callback) keeps only elements where the callback returns true, producing a shorter array. array_reduce(array, callback, initial) collapses the whole array down into a single value (like a sum or total). None of these modify the original array — they return new ones.',
          hinglish:
            'Loops ke alawa, PHP ke paas teen functional array tools hain jo ek line mein data transform karte hain, JavaScript ke equivalents jaise. array_map(callback, array) har element pe ek function apply karta hai aur same length ka naya array deta hai. array_filter(array, callback) sirf un elements ko rakhta hai jaha callback true return kare, chhota array banata hai. array_reduce(array, callback, initial) poore array ko ek single value mein nichod deta hai (jaise sum ya total). Inme se koi bhi original array ko modify nahi karta — naya array return karte hain.',
        },
        dailyLifeExample:
          'array_map ek factory line jaisa hai jo har product pe ek hi kaam karta hai (sabko double karo). array_filter ek quality-checker hai jo sirf achhe products ko aage jaane deta hai. array_reduce ek cashier hai jo poori shopping ki items ko ek final total mein badal deta hai.',
        codeExample:
          "<?php\n$nums = [1, 2, 3, 4, 5];\n\n// array_map: transform every element\n$doubled = array_map(fn($n) => $n * 2, $nums);\nprint_r($doubled);   // [2, 4, 6, 8, 10]\n\n// array_filter: keep only matching elements\n$evens = array_filter($nums, fn($n) => $n % 2 === 0);\nprint_r($evens);     // [1 => 2, 3 => 4] — keys preserved!\n\n// array_reduce: collapse to one value\n$sum = array_reduce($nums, fn($carry, $n) => $carry + $n, 0);\necho $sum;            // 15\n\n// re-index the filtered array if needed\n$evensList = array_values($evens); // [2, 4]",
        keyPoints: [
          'array_map(fn, arr): transforms every element, same length, new array',
          'array_filter(arr, fn): keeps matching elements, shorter array — but keeps ORIGINAL keys',
          'array_reduce(arr, fn, initial): collapses the array into one value',
          'None of these mutate the original array — always work on the returned result',
          'array_filter does not re-index keys — use array_values() if you need a clean 0-based array',
        ],
        quiz: [
          {
            question: 'What does array_map do to the length of the array?',
            options: ['Always makes it shorter', 'Keeps it the same — one output per input', 'Always makes it longer', 'Removes duplicates'],
            correctIndex: 1,
          },
          {
            question: 'After array_filter($nums, fn($n) => $n % 2 === 0) on [1,2,3,4,5], what happens to the array KEYS in the result?',
            options: ['They are re-indexed starting from 0', 'The original keys are preserved (gaps included) — use array_values() to re-index', 'All keys become the same', 'Keys are removed entirely'],
            correctIndex: 1,
          },
          {
            question: 'Which function collapses an entire array into a single total value?',
            options: ['array_map', 'array_filter', 'array_reduce', 'array_merge'],
            correctIndex: 2,
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
      {
        title: 'Composer & Autoloading with Namespaces',
        difficulty: 'hard',
        tags: ['composer', 'namespaces', 'autoload'],
        explanation: {
          english:
            "Composer is PHP's package manager (like npm for JavaScript or pip for Python) — composer.json lists your project's dependencies, and `composer install` downloads them into a vendor/ folder. Namespaces (namespace App\\Models;) organize classes and prevent naming collisions between your code and third-party libraries — two classes can both be named User as long as they live in different namespaces (App\\Models\\User vs Vendor\\Package\\User). Composer's autoloader (require 'vendor/autoload.php') automatically loads the right class file when you reference a namespaced class, so you never write manual require statements for your classes again.",
          hinglish:
            "Composer PHP ka package manager hai (JavaScript ke npm ya Python ke pip jaisa) — composer.json tumhare project ki dependencies list karta hai, aur `composer install` unhe vendor/ folder mein download kar deta hai. Namespaces (namespace App\\Models;) classes ko organize karte hain aur tumhare code aur third-party libraries ke beech naming collisions rokte hain — do classes dono ka naam User ho sakta hai jab tak wo alag namespaces mein hon (App\\Models\\User vs Vendor\\Package\\User). Composer ka autoloader (require 'vendor/autoload.php') automatically sahi class file load kar deta hai jab tum ek namespaced class reference karte ho, isliye apni classes ke liye manual require statements kabhi nahi likhne padte.",
        },
        dailyLifeExample:
          "Namespace ek society mein flat numbers jaisa hai — 'A-101' aur 'B-101' dono '101' hain par alag buildings (namespaces) mein, koi confusion nahi. Composer ek courier service jaisa hai jo automatically sahi package (class file) dhoondh ke la deta hai bina tumhe khud dhoondhna pade — bas naam batao (namespace).",
        codeExample:
          '// composer.json — declares dependencies\n{\n  "require": {\n    "monolog/monolog": "^3.0"\n  },\n  "autoload": {\n    "psr-4": { "App\\\\": "src/" }\n  }\n}\n\n// terminal: composer install  -> downloads into vendor/\n\n// src/Models/User.php\n<?php\nnamespace App\\Models;\n\nclass User {\n    public function __construct(public string $name) {}\n}\n\n// index.php\n<?php\nrequire \'vendor/autoload.php\'; // Composer\'s autoloader — one require for everything\n\nuse App\\Models\\User;\n\n$user = new User("Aman");\necho $user->name;',
        keyPoints: [
          "Composer is PHP's package manager — composer.json declares dependencies",
          'composer install downloads packages into a vendor/ folder',
          'namespace organizes classes and prevents naming collisions between libraries',
          'use App\\Models\\User; imports a namespaced class so you can refer to it by its short name',
          "require \"vendor/autoload.php\" once — Composer's autoloader finds every class file automatically",
        ],
        quiz: [
          {
            question: "What is Composer's role in a PHP project?",
            options: ['It runs PHP code faster', "It is PHP's package manager — installs and manages third-party dependencies", 'It replaces the PHP interpreter', 'It only works with MySQL'],
            correctIndex: 1,
          },
          {
            question: 'Why do namespaces prevent naming collisions?',
            options: ['They do not actually prevent collisions', 'Two classes can share the same short name (like User) as long as they live in different namespaces', 'Namespaces rename all classes automatically', 'Only one class can exist per project'],
            correctIndex: 1,
          },
          {
            question: "What does require 'vendor/autoload.php' let you do?",
            options: ['Nothing useful', 'Use any Composer-installed package or your own namespaced classes without manually requiring each file', 'Install new packages', 'Delete the vendor folder'],
            correctIndex: 1,
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

  // ─── Language Fundamentals ──────────────────────────────────
  {
    question: 'What is PHP type juggling and where does it cause bugs?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Type juggling is PHP silently converting types during a loose comparison, so `"1" == 1` is true. `===` compares value AND type, so it is false. Historically `==` produced notorious surprises — `"abc" == 0` was true before PHP 8 because the string was coerced to a number. PHP 8 fixed that specific case by comparing numeric strings more sensibly, but the general rule stands: use `===` by default and reach for `==` only when you deliberately want coercion.',
      hinglish:
        '`==` values ko TYPE JUGGLING ke baad compare karta hai, isliye `"1" == 1` sach hai. `===` value AUR type compare karta hai, isliye wo jhooth hai. Historically `==` badnaam hairaaniyaan banata tha — PHP 8 se pehle `"abc" == 0` sach tha kyunki string ek number mein badal di jaati thi. PHP 8 ne us khaas case ko numeric strings ko samajhdaari se compare karke theek kiya, par aam niyam wahi hai: default se `===` use karo aur `==` sirf tab uthao jab tum jaan boojh kar coercion chahte ho.',
    },
  },
  {
    question: 'What is the difference between include, require, include_once, and require_once?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`include` emits a warning and CONTINUES if the file is missing; `require` emits a fatal error and STOPS. The `_once` variants track what has already been loaded and skip a repeat, which prevents "cannot redeclare function" errors. Use `require` for anything the script cannot run without, such as a config or class file. In modern code you rarely write these at all, because Composer\'s autoloader loads classes on demand.',
      hinglish:
        '`include` file na milne pe ek warning deta hai aur AAGE BADHTA hai; `require` ek fatal error deta hai aur RUK jaata hai. `_once` variants track karte hain ki kya pehle load ho chuka hai aur dohraav skip karte hain, jo "cannot redeclare function" errors rokta hai. Un cheezon ke liye `require` use karo jinke bina script chal hi nahi sakti, jaise ek config ya class file. Modern code mein tum inhe rarely likhte ho, kyunki Composer ka autoloader classes zaroorat pe load karta hai.',
    },
  },
  {
    question: 'What is Composer and what is autoloading?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Composer is PHP\'s dependency manager: `composer.json` declares what you need, `composer.lock` pins exact versions so every environment installs identically, and `vendor/` holds the packages. AUTOLOADING means you never write `require` for a class — Composer generates a loader that maps a namespace to a file path following PSR-4, and PHP calls it the first time an undefined class is referenced. Run `composer dump-autoload -o` in production for an optimised class map.',
      hinglish:
        'Composer PHP ka dependency manager hai: `composer.json` batata hai ki tumhe kya chahiye, `composer.lock` exact versions pin karta hai taaki har environment ek jaisa install kare, aur `vendor/` packages rakhta hai. AUTOLOADING ka matlab hai tum ek class ke liye kabhi `require` nahi likhte — Composer ek loader banata hai jo PSR-4 follow karte hue ek namespace ko ek file path pe map karta hai, aur PHP use tab call karta hai jab ek undefined class pehli baar reference ho. Production mein ek optimised class map ke liye `composer dump-autoload -o` chalao.',
    },
  },
  {
    question: 'What are PHP namespaces?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Namespaces prevent name collisions by qualifying class, function, and constant names — `App\\Models\\User` and `Vendor\\Auth\\User` can coexist. Declare with `namespace App\\Models;` at the top of a file, import with `use`, and alias with `use ... as`. Note that a leading backslash means the global namespace, which is why you sometimes see `\\Exception` inside a namespaced file. PSR-4 ties the namespace to the directory structure, which is what makes autoloading work.',
      hinglish:
        'Namespaces class, function, aur constant naamon ko qualify karke naam ki takkar rokte hain — `App\\Models\\User` aur `Vendor\\Auth\\User` saath reh sakte hain. Ek file ke upar `namespace App\\Models;` se declare karo, `use` se import karo, aur `use ... as` se alias do. Note karo ki ek shuruaati backslash global namespace batata hai, isiliye tum kabhi ek namespaced file ke andar `\\Exception` dekhte ho. PSR-4 namespace ko directory structure se jodta hai, jisse autoloading kaam karti hai.',
    },
  },
  {
    question: 'What is the difference between an abstract class and an interface in PHP?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An ABSTRACT class can hold implemented methods, properties, and constructors, and a class may extend only ONE of them — it expresses "is a kind of". An INTERFACE declares method signatures only (plus constants), and a class may implement MANY — it expresses "can do". Use an interface for a contract you want several unrelated classes to satisfy, and an abstract class when subclasses genuinely share implementation. PHP 8.1 added enums and readonly properties, which often replace older uses of both.',
      hinglish:
        'Ek ABSTRACT class implemented methods, properties, aur constructors rakh sakti hai, aur ek class sirf EK ko extend kar sakti hai — ye "ek kism ka hai" batati hai. Ek INTERFACE sirf method signatures (plus constants) declare karta hai, aur ek class BAHUT implement kar sakti hai — ye "kar sakta hai" batati hai. Ek aise contract ke liye interface use karo jise tum kai unrelated classes se poora karwana chahte ho, aur abstract class tab jab subclasses genuinely implementation share karein. PHP 8.1 ne enums aur readonly properties jode, jo aksar dono ke purane istemaal replace karte hain.',
    },
  },
  {
    question: 'What is a trait in PHP?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A trait is a reusable block of methods and properties that a class can COMPOSE in, working around PHP\'s single-inheritance limit. It is a compile-time copy-paste rather than a type: you cannot type-hint against a trait, which is a key distinction from an interface. Conflicts when two traits define the same method must be resolved explicitly with `insteadof` and `as`. Overusing traits produces classes whose behaviour is scattered and hard to trace.',
      hinglish:
        'Ek trait methods aur properties ka ek reusable block hai jise ek class apne andar JOD sakti hai, PHP ki single-inheritance seema ke aas-paas kaam karte hue. Ye ek type ke bajaye ek compile-time copy-paste hai: tum ek trait ke against type-hint nahi kar sakte, jo ek interface se ek key farak hai. Do traits ke ek hi method define karne pe conflicts `insteadof` aur `as` se explicitly solve karne padte hain. Traits ka zyada istemaal aisi classes banata hai jinka behaviour bikhra aur trace karna mushkil hai.',
    },
  },
  {
    question: 'What is the difference between a session and a cookie in PHP?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A COOKIE stores data in the browser and is sent with every request to the domain — visible and editable by the user, so it must never hold anything sensitive or trusted. A SESSION stores data on the SERVER and gives the browser only a session ID cookie. Sessions are therefore the right place for authentication state. Set `httpOnly`, `secure`, and `sameSite` on the session cookie, and call `session_regenerate_id()` on login to prevent session fixation.',
      hinglish:
        'Ek COOKIE browser mein data rakhti hai aur domain ki har request ke saath jaati hai — user ko dikhti aur badalne layak, isliye ismein kabhi kuch sensitive ya bharose ka nahi hona chahiye. Ek SESSION data SERVER pe rakhti hai aur browser ko sirf ek session ID cookie deti hai. Isliye sessions authentication state ke liye sahi jagah hain. Session cookie pe `httpOnly`, `secure`, aur `sameSite` set karo, aur session fixation rokne ke liye login pe `session_regenerate_id()` call karo.',
    },
  },
  {
    question: 'How do prepared statements prevent SQL injection?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A prepared statement sends the SQL STRUCTURE to the database first, with placeholders, and the values separately afterwards. Because the query plan is already fixed by the time values arrive, the database treats them purely as DATA — a value containing `\' OR 1=1--` becomes a literal string to search for, not executable SQL. String concatenation, by contrast, hands the database one blob it must parse as a whole, which is exactly where injection lives. Escaping is a weaker fallback, not an equivalent.',
      hinglish:
        'Ek prepared statement pehle SQL ka DHAANCHA database ko bhejta hai, placeholders ke saath, aur values alag se baad mein. Kyunki values aane tak query plan pehle hi tay ho chuka hai, database unhe sirf DATA maanta hai — `\' OR 1=1--` wali ek value dhoondhne ke liye ek literal string ban jaati hai, chalne wala SQL nahi. String concatenation, iske ulat, database ko ek blob deta hai jise use poora parse karna padta hai, jahan theek injection rehta hai. Escaping ek kamzor fallback hai, barabari nahi.',
    },
  },
  {
    question: 'What is PDO and why prefer it over mysqli?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PDO is a database abstraction layer supporting twelve-plus drivers, so switching from MySQL to Postgres is largely a DSN change. It offers NAMED placeholders, consistent exception-based error handling via `PDO::ERRMODE_EXCEPTION`, and a uniform API. mysqli is MySQL-only and exposes a few MySQL-specific features. Also set `PDO::ATTR_EMULATE_PREPARES` to false so the driver uses genuine server-side prepared statements rather than emulating them client-side.',
      hinglish:
        'PDO ek database abstraction layer hai jo baarah se zyada drivers support karta hai, isliye MySQL se Postgres pe jaana zyadatar ek DSN change hai. Ye NAMED placeholders, `PDO::ERRMODE_EXCEPTION` se consistent exception-based error handling, aur ek ek jaisa API deta hai. mysqli sirf MySQL ke liye hai aur kuch MySQL-khaas features deta hai. `PDO::ATTR_EMULATE_PREPARES` ko false bhi karo taaki driver client-side nakal ke bajaye asli server-side prepared statements use kare.',
    },
  },
  {
    question: 'What is the difference between echo and print?',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        '`echo` is a language construct that accepts MULTIPLE comma-separated arguments and returns nothing. `print` accepts exactly one argument and returns 1, which means it can be used inside an expression such as `$x or print "failed"`. `echo` is marginally faster, and in practice it is what almost everyone uses. Neither requires parentheses, since both are constructs rather than functions.',
      hinglish:
        '`echo` ek language construct hai jo KAI comma se alag arguments leta hai aur kuch return nahi karta. `print` theek ek argument leta hai aur 1 return karta hai, jiska matlab hai ki ise ek expression ke andar use kiya ja sakta hai jaise `$x or print "failed"`. `echo` thoda tez hai, aur practically almost sab wahi use karte hain. Kisi ko parentheses nahi chahiye, kyunki dono functions ke bajaye constructs hain.',
    },
  },
  {
    question: 'What are the main array functions in PHP and their complexity?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PHP arrays are ORDERED HASH MAPS, so key lookup, `isset`, and `array_key_exists` are O(1). `in_array` and `array_search` scan values, so they are O(n) — using `in_array` inside a loop is a common hidden quadratic cost, and flipping to `isset($lookup[$value])` fixes it. `array_map`, `array_filter`, and `array_reduce` are O(n). Note `array_filter` PRESERVES keys, which surprises people when the result is later JSON-encoded as an object instead of an array.',
      hinglish:
        'PHP arrays ORDERED HASH MAPS hain, isliye key lookup, `isset`, aur `array_key_exists` O(1) hain. `in_array` aur `array_search` values scan karte hain, isliye wo O(n) hain — ek loop ke andar `in_array` use karna ek common chhupa quadratic cost hai, aur `isset($lookup[$value])` pe badalna ise theek karta hai. `array_map`, `array_filter`, aur `array_reduce` O(n) hain. Note karo `array_filter` keys BACHATA hai, jo logon ko chaunkata hai jab result baad mein ek array ke bajaye ek object ki tarah JSON-encode hota hai.',
    },
  },
  {
    question: 'What is the difference between an indexed, associative, and multidimensional array?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'They are not really different types — PHP has ONE array type, an ordered map. An indexed array simply uses sequential integer keys, an associative array uses strings, and a multidimensional array holds arrays as values. The practical consequence is that unsetting an element from an indexed array leaves a GAP in the keys, so `json_encode` then produces an object rather than an array. `array_values()` reindexes and fixes that.',
      hinglish:
        'Wo sach mein alag types nahi hain — PHP mein EK array type hai, ek ordered map. Ek indexed array bas sequential integer keys use karta hai, ek associative array strings, aur ek multidimensional array values ki tarah arrays rakhta hai. Practical nateeja ye hai ki ek indexed array se ek element unset karna keys mein ek KHAALI JAGAH chhod deta hai, isliye `json_encode` phir ek array ke bajaye ek object banata hai. `array_values()` dobara index karke ise theek karta hai.',
    },
  },
  {
    question: 'What is the difference between passing by value and by reference?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'By default PHP passes variables by VALUE, so a function modifying a parameter does not affect the caller — though copy-on-write means no actual copy happens until a write. Prefixing the parameter with `&` passes by REFERENCE, letting the function mutate the original. OBJECTS are a special case: the handle is copied but both point to the same instance, so modifying a property inside a function IS visible outside. References are best avoided; returning a new value is clearer.',
      hinglish:
        'Default se PHP variables ko VALUE se pass karta hai, isliye ek parameter badalta function caller ko affect nahi karta — halaanki copy-on-write ka matlab hai ki ek write tak koi actual copy hoti hi nahi. Parameter ke aage `&` lagana REFERENCE se pass karta hai, function ko original mutate karne dete hue. OBJECTS ek khaas case hain: handle copy hota hai par dono usi instance pe point karte hain, isliye ek function ke andar ek property badalna bahar DIKHTA hai. References se bachna behtar hai; ek nayi value return karna clearer hai.',
    },
  },
  {
    question: 'What are magic methods in PHP?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Magic methods are hooks PHP calls automatically: `__construct`, `__destruct`, `__get` and `__set` for inaccessible properties, `__call` and `__callStatic` for undefined methods, `__toString` for string conversion, `__invoke` to make an object callable, and `__clone`. Frameworks such as Laravel use `__get` and `__call` heavily for fluent APIs. The cost is that magic methods are slower, defeat IDE autocompletion and static analysis, and make behaviour hard to trace.',
      hinglish:
        'Magic methods wo hooks hain jinhe PHP automatically call karta hai: `__construct`, `__destruct`, na pahunchne wali properties ke liye `__get` aur `__set`, undefined methods ke liye `__call` aur `__callStatic`, string conversion ke liye `__toString`, ek object ko callable banane ke liye `__invoke`, aur `__clone`. Laravel jaise frameworks fluent APIs ke liye `__get` aur `__call` khoob use karte hain. Cost ye hai ki magic methods slow hain, IDE autocompletion aur static analysis ko harate hain, aur behaviour trace karna mushkil banate hain.',
    },
  },
  {
    question: 'What is the difference between static and instance methods?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A STATIC method belongs to the class and is called with `::` without an instance, so it has no `$this`. An INSTANCE method operates on a specific object. Static methods suit genuine utilities and factories. Their downside is testability: static calls are hard to mock or substitute, so heavy static use produces tightly coupled code — which is why dependency injection prefers instance methods on injected objects.',
      hinglish:
        'Ek STATIC method class ki hai aur bina instance ke `::` se call hoti hai, isliye uske paas `$this` nahi. Ek INSTANCE method ek khaas object pe kaam karti hai. Static methods genuine utilities aur factories ko suit karte hain. Inka nuksaan testability hai: static calls ko mock ya badalna mushkil hai, isliye static ka bhaari istemaal kaskar jude code banata hai — isiliye dependency injection injected objects pe instance methods prefer karta hai.',
    },
  },
  {
    question: 'What is dependency injection and why does it matter?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Dependency injection means a class RECEIVES its dependencies rather than constructing them itself — passing a `Mailer` into the constructor instead of calling `new Mailer()` inside. It matters because a class that builds its own dependencies cannot be tested without them, and cannot be reconfigured without editing it. Injecting against an INTERFACE lets you substitute a fake in tests and a different implementation in production. A DI container resolves the graph automatically.',
      hinglish:
        'Dependency injection ka matlab hai ek class apni dependencies BANANE ke bajaye unhe LETI hai — andar `new Mailer()` call karne ke bajaye ek `Mailer` constructor mein pass karna. Ye isliye matter karta hai kyunki apni dependencies banane wali class unke bina test nahi ho sakti, aur use edit kiye bina dobara configure nahi ho sakti. Ek INTERFACE ke against inject karna tumhe tests mein ek nakli aur production mein ek alag implementation daalne deta hai. Ek DI container graph automatically resolve karta hai.',
    },
  },
  {
    question: 'What are the PSR standards?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PHP Standards Recommendations are interoperability specs from the PHP-FIG. The important ones: PSR-4 defines autoloading from namespace to file path, PSR-12 defines coding style (superseding PSR-2), PSR-7 defines HTTP message interfaces, PSR-11 defines a container interface, and PSR-3 defines a logger interface. Their real value is that a package built against PSR-3 works with any compliant logger, so libraries compose without knowing about each other.',
      hinglish:
        'PHP Standards Recommendations PHP-FIG se interoperability specs hain. Zaroori wale: PSR-4 namespace se file path tak autoloading define karta hai, PSR-12 coding style (PSR-2 ki jagah), PSR-7 HTTP message interfaces, PSR-11 ek container interface, aur PSR-3 ek logger interface. Inki asli value ye hai ki PSR-3 ke against bana ek package kisi bhi compliant logger ke saath kaam karta hai, isliye libraries ek doosre ko jaane bina judti hain.',
    },
  },
  {
    question: 'How does error and exception handling work in PHP?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PHP has both traditional ERRORS and object-oriented EXCEPTIONS. Since PHP 7 most fatal errors are thrown as `Error`, which alongside `Exception` implements `Throwable` — so `catch (Throwable $e)` catches both. Use `try/catch/finally`, create domain-specific exception classes, and register a global handler with `set_exception_handler`. In production, log the details and show the user a generic message: exposing a stack trace leaks file paths, queries, and sometimes credentials.',
      hinglish:
        'PHP mein traditional ERRORS aur object-oriented EXCEPTIONS dono hain. PHP 7 se zyadatar fatal errors `Error` ki tarah throw hote hain, jo `Exception` ke saath `Throwable` implement karta hai — isliye `catch (Throwable $e)` dono pakadta hai. `try/catch/finally` use karo, domain-khaas exception classes banao, aur `set_exception_handler` se ek global handler register karo. Production mein, details log karo aur user ko ek aam message dikhao: ek stack trace dikhana file paths, queries, aur kabhi credentials leak karta hai.',
    },
  },
  {
    question: 'What is the difference between GET and POST in PHP?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`$_GET` reads the URL query string, so data is visible, bookmarkable, cached, logged by servers, and length-limited — right for searches and filters. `$_POST` reads the request body, which is not logged in URLs and has no practical size limit — right for anything that changes state or is sensitive. Note neither is SECURE by itself: both are fully attacker-controlled, so both need validation, and HTTPS is what actually protects the data in transit.',
      hinglish:
        '`$_GET` URL query string padhta hai, isliye data dikhta hai, bookmarkable hai, cached, servers se logged, aur length-seemit — searches aur filters ke liye sahi. `$_POST` request body padhta hai, jo URLs mein log nahi hoti aur jiski koi practical size limit nahi — kisi bhi state badalne wali ya sensitive cheez ke liye sahi. Note karo koi bhi khud se SURAKSHIT nahi hai: dono poori tarah attacker-controlled hain, isliye dono ko validation chahiye, aur transit mein data ko actually HTTPS hi bachata hai.',
    },
  },
  {
    question: 'How do you handle file uploads securely in PHP?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Never trust `$_FILES["file"]["type"]`, which the client sets — detect the real type with `finfo`. Whitelist allowed extensions and types rather than blacklisting. Generate a NEW random filename instead of using the client\'s, which prevents path traversal and overwrites. Store uploads OUTSIDE the web root or in a bucket, so an uploaded `.php` file can never be executed. Enforce size limits, and verify `is_uploaded_file()` before calling `move_uploaded_file()`.',
      hinglish:
        '`$_FILES["file"]["type"]` pe kabhi bharosa mat karo, jo client set karta hai — asli type `finfo` se pata karo. Blacklist ke bajaye allowed extensions aur types whitelist karo. Client ka naam use karne ke bajaye ek NAYA random filename banao, jo path traversal aur overwrites rokta hai. Uploads ko web root ke BAHAR ya ek bucket mein rakho, taaki ek upload hui `.php` file kabhi chal na sake. Size limits lagao, aur `move_uploaded_file()` call karne se pehle `is_uploaded_file()` verify karo.',
    },
  },
  {
    question: 'What are the major features added in PHP 8?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PHP 8.0 brought the JIT compiler, named arguments, constructor property promotion, union types, `match` expressions, the nullsafe operator `?->`, and attributes for native annotations. 8.1 added enums, readonly properties, fibers, and pure intersection types. 8.2 added readonly classes and deprecated dynamic properties. 8.3 and 8.4 continued with typed class constants and property hooks. Collectively they moved PHP substantially towards a statically-typed, modern language.',
      hinglish:
        'PHP 8.0 JIT compiler, named arguments, constructor property promotion, union types, `match` expressions, nullsafe operator `?->`, aur native annotations ke liye attributes laaya. 8.1 ne enums, readonly properties, fibers, aur pure intersection types jode. 8.2 ne readonly classes jode aur dynamic properties deprecate kiye. 8.3 aur 8.4 typed class constants aur property hooks ke saath aage badhe. Milkar inhone PHP ko ek statically-typed, modern language ki taraf kaafi badhaya.',
    },
  },
  {
    question: 'What is the difference between match and switch in PHP 8?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`match` uses STRICT comparison (`===`), returns a VALUE so it can be assigned, requires no `break` since there is no fall-through, and throws `UnhandledMatchError` if nothing matches and there is no default. `switch` uses loose comparison, falls through without `break` — the source of countless bugs — and produces no value. `match` is the better choice almost always; `switch` remains useful only when you deliberately want fall-through.',
      hinglish:
        '`match` STRICT comparison (`===`) use karta hai, ek VALUE return karta hai isliye assign ho sakta hai, `break` nahi chahta kyunki fall-through hai hi nahi, aur kuch match na hone aur default na hone pe `UnhandledMatchError` throw karta hai. `switch` loose comparison use karta hai, `break` ke bina aage bahta hai — anginat bugs ka source — aur koi value nahi deta. `match` almost hamesha behtar choice hai; `switch` sirf tab useful rehta hai jab tum jaan boojh kar fall-through chahte ho.',
    },
  },
  {
    question: 'What are enums in PHP 8.1?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An enum defines a fixed set of possible values as a TYPE, so `Status::Active` can be type-hinted and the compiler rejects anything else — replacing loose class constants or magic strings. BACKED enums have a scalar value, so `Status::from("active")` and `->value` work for database storage. Enums can implement interfaces and hold methods, which makes them a clean home for behaviour tied to a state, such as a label or a permitted transition.',
      hinglish:
        'Ek enum sambhav values ka ek tay set ek TYPE ke roop mein define karta hai, isliye `Status::Active` type-hint ho sakta hai aur compiler baaki sab reject karta hai — dheeli class constants ya magic strings ko replace karte hue. BACKED enums ki ek scalar value hoti hai, isliye database storage ke liye `Status::from("active")` aur `->value` kaam karte hain. Enums interfaces implement kar sakte hain aur methods rakh sakte hain, jo unhe ek state se judi behaviour ka ek saaf ghar banata hai, jaise ek label ya ek allowed transition.',
    },
  },
  {
    question: 'What is the difference between == and === for arrays and objects?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'For ARRAYS, `==` is true when both have the same key-value pairs regardless of order or types; `===` additionally requires the same ORDER and the same types. For OBJECTS, `==` is true when they are the same class with equal properties, whereas `===` is true only when both variables reference the EXACT SAME instance. That object distinction matters constantly: two identical-looking value objects are `==` but not `===`.',
      hinglish:
        'ARRAYS ke liye, `==` tab sach hai jab dono mein wahi key-value pairs hon chahe order ya types kuch bhi; `===` upar se wahi ORDER aur wahi types maangta hai. OBJECTS ke liye, `==` tab sach hai jab wo ek hi class ke hon barabar properties ke saath, jabki `===` sirf tab sach hai jab dono variables THEEK USI instance ko reference karein. Wo object ka farak lagatar matter karta hai: do ek jaise dikhte value objects `==` hain par `===` nahi.',
    },
  },
  {
    question: 'What is output buffering in PHP?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`ob_start()` captures output into a buffer instead of sending it immediately, and `ob_get_clean()` retrieves and discards it. Its main use is allowing headers to be set AFTER output has begun, which otherwise triggers "headers already sent". It is also used to capture a template\'s rendered output into a string. In a well-structured application you rarely need it, because output should not begin until the response is fully decided.',
      hinglish:
        '`ob_start()` output ko turant bhejne ke bajaye ek buffer mein pakadta hai, aur `ob_get_clean()` use laakar hata deta hai. Iska main use headers ko output shuru hone ke BAAD set karne dena hai, jo warna "headers already sent" trigger karta hai. Ye ek template ke rendered output ko ek string mein pakadne ke liye bhi use hota hai. Ek achhe dhaanche wale application mein tumhe ye rarely chahiye, kyunki response poori tarah tay hone tak output shuru nahi hona chahiye.',
    },
  },
  {
    question: 'What is the difference between PHP-FPM and mod_php?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'MOD_PHP embeds the interpreter inside every Apache process, so PHP memory is consumed even when serving a static image, and it locks you to Apache\'s prefork model. PHP-FPM runs PHP as a SEPARATE process pool that the web server talks to over FastCGI, so Nginx or Apache handles static files efficiently while FPM handles PHP. FPM also gives per-pool user isolation, tunable worker counts, and slow-request logging — it is the standard for production.',
      hinglish:
        'MOD_PHP interpreter ko har Apache process ke andar rakhta hai, isliye ek static image serve karte waqt bhi PHP memory khatam hoti hai, aur ye tumhe Apache ke prefork model se baandh deta hai. PHP-FPM PHP ko ek ALAG process pool ki tarah chalata hai jisse web server FastCGI pe baat karta hai, isliye Nginx ya Apache static files efficiently sambhalta hai jabki FPM PHP. FPM per-pool user isolation, tune hone layak worker counts, aur slow-request logging bhi deta hai — ye production ka standard hai.',
    },
  },
  {
    question: 'What is OPcache?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'OPcache stores the compiled BYTECODE of PHP scripts in shared memory, so each request skips reading and recompiling the source. It typically gives a very large throughput improvement and is essential in production. Configure `opcache.validate_timestamps=0` in production so it never stats files, and clear the cache on deploy. In development leave validation on, or your changes appear not to take effect — a classic and confusing symptom.',
      hinglish:
        'OPcache PHP scripts ka compiled BYTECODE shared memory mein rakhta hai, isliye har request source padhna aur dobara compile karna skip karti hai. Ye typically bahut bada throughput sudhaar deta hai aur production mein zaroori hai. Production mein `opcache.validate_timestamps=0` configure karo taaki ye kabhi files stat na kare, aur deploy pe cache clear karo. Development mein validation on rakho, warna tumhare changes lagte hi nahi — ek classic aur uljhane wala lakshan.',
    },
  },
  {
    question: 'What is the difference between Laravel, Symfony, and plain PHP?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'LARAVEL is opinionated and batteries-included — Eloquent ORM, Blade, queues, auth scaffolding — optimising for developer speed, with heavy use of facades and magic. SYMFONY is a set of decoupled, explicit components favoured for large long-lived applications, and Laravel itself is built on several of them. PLAIN PHP gives full control and no framework overhead but means writing routing, security, and validation yourself, which is rarely the right trade beyond a small script.',
      hinglish:
        'LARAVEL opinionated aur sab-kuch-shaamil hai — Eloquent ORM, Blade, queues, auth scaffolding — developer speed ke liye optimise karta hua, facades aur magic ke bhaari istemaal ke saath. SYMFONY alag-alag, explicit components ka ek set hai jo bade lambe chalne wale applications ke liye pasand kiya jaata hai, aur Laravel khud unme se kai pe bana hai. PLAIN PHP poora control aur koi framework bojh nahi deta par matlab routing, security, aur validation khud likhna, jo ek chhote script se aage rarely sahi trade hai.',
    },
  },
  {
    question: 'What is an ORM and what are its drawbacks?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An ORM maps database rows to PHP objects, so you work with `$user->posts` instead of writing SQL. It speeds development, handles escaping, and abstracts the database. Drawbacks are real: it generates the N+1 query problem readily, hides the actual SQL so performance issues are hard to see, adds overhead, and struggles with complex analytical queries. The pragmatic approach is an ORM for CRUD plus hand-written SQL for the queries that matter.',
      hinglish:
        'Ek ORM database rows ko PHP objects pe map karta hai, isliye tum SQL likhne ke bajaye `$user->posts` se kaam karte ho. Ye development tez karta hai, escaping sambhalta hai, aur database abstract karta hai. Nuksaan asli hain: ye aasaani se N+1 query problem banata hai, asli SQL chhupata hai isliye performance issues dikhna mushkil hai, overhead jodta hai, aur complex analytical queries se joojhta hai. Vyavaharik approach CRUD ke liye ek ORM plus jo queries matter karti hain unke liye haath se likha SQL hai.',
    },
  },
  {
    question: 'What is the N+1 query problem in an ORM?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Fetching 100 posts and then accessing `$post->author` inside the loop triggers one query per post — 101 total. It is invisible with ten test rows and crippling in production. The fix is EAGER LOADING: `Post::with("author")->get()` in Eloquent issues two queries regardless of row count. Detect it by logging query counts per request or using a debug bar; it is one of the most common real-world performance bugs in ORM-based code.',
      hinglish:
        '100 posts laakar phir loop ke andar `$post->author` access karna per post ek query chalata hai — kul 101. Ye das test rows ke saath invisible hai aur production mein apahij karne wala. Fix EAGER LOADING hai: Eloquent mein `Post::with("author")->get()` rows chahe kitni bhi hon do queries chalata hai. Ise per request query counts log karke ya ek debug bar se pakado; ye ORM-based code mein sabse common real-world performance bugs mein se ek hai.',
    },
  },
  {
    question: 'How do you hash and verify passwords in PHP?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use `password_hash($password, PASSWORD_DEFAULT)`, which currently uses bcrypt, generates a random salt automatically, and stores it inside the resulting hash. Verify with `password_verify()`, which is constant-time and so resists timing attacks. Never use md5 or sha1 — they are fast, which is exactly wrong for passwords, since speed helps the attacker. Use `password_needs_rehash()` after a successful login to upgrade old hashes as the default algorithm changes.',
      hinglish:
        '`password_hash($password, PASSWORD_DEFAULT)` use karo, jo abhi bcrypt use karta hai, ek random salt apne aap banata hai, aur use banne wale hash ke andar rakhta hai. `password_verify()` se verify karo, jo constant-time hai aur isliye timing attacks rokta hai. md5 ya sha1 kabhi mat use karo — wo tez hain, jo passwords ke liye theek galat hai, kyunki speed attacker ki madad karti hai. Ek safal login ke baad `password_needs_rehash()` use karo taaki default algorithm badalne pe purane hashes upgrade hon.',
    },
  },
  {
    question: 'What is CSRF and how do you prevent it in PHP?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CSRF tricks a logged-in user\'s browser into submitting a request they did not intend — a hidden form on a malicious site posting to your bank. It works because cookies are sent automatically. Prevention: include a random per-session TOKEN in every state-changing form and verify it server-side with `hash_equals()`, since the attacker cannot read your page to obtain it. Set `SameSite=Lax` or `Strict` on session cookies as a second layer, and never change state on a GET request.',
      hinglish:
        'CSRF ek logged-in user ke browser ko ek aisi request bhejne ke liye bewakoof banata hai jo usne chaahi hi nahi — ek malicious site pe ek chhupa form jo tumhare bank pe post kare. Ye isliye kaam karta hai kyunki cookies apne aap jaati hain. Prevention: har state badalne wale form mein ek random per-session TOKEN daalo aur use server-side `hash_equals()` se verify karo, kyunki attacker use paane ke liye tumhara page padh nahi sakta. Ek doosri layer ke roop mein session cookies pe `SameSite=Lax` ya `Strict` set karo, aur ek GET request pe kabhi state mat badlo.',
    },
  },
  {
    question: 'What is the difference between a generator and returning an array?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A function returning an array builds the ENTIRE result in memory before returning — reading a million-row file this way exhausts memory. A GENERATOR uses `yield` to produce values one at a time, computing each only when requested, so memory stays constant regardless of size. Generators are ideal for large files, database cursors, and infinite sequences. The limitation is that you can only iterate forward once and cannot index into the result.',
      hinglish:
        'Ek array return karta function POORA nateeja return karne se pehle memory mein banata hai — ek das lakh row wali file aise padhna memory khatam kar deta hai. Ek GENERATOR `yield` se ek-ek karke values banata hai, har ek ko sirf maange jaane pe compute karte hue, isliye size chahe kuch bhi ho memory sthir rehti hai. Generators badi files, database cursors, aur anant sequences ke liye ideal hain. Seema ye hai ki tum sirf ek baar aage iterate kar sakte ho aur nateeje mein index nahi kar sakte.',
    },
  },
  {
    question: 'What are type declarations in PHP and what is strict_types?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PHP supports type declarations on parameters, return values, and properties, including union, nullable, and intersection types. By default PHP uses COERCIVE mode, so passing `"5"` to an `int` parameter silently converts it. Adding `declare(strict_types=1)` at the top of a file makes type mismatches throw a `TypeError` instead. Strict types is strongly recommended — silent coercion is the source of subtle bugs that surface far from where they were introduced.',
      hinglish:
        'PHP parameters, return values, aur properties pe type declarations support karta hai, including union, nullable, aur intersection types. Default se PHP COERCIVE mode use karta hai, isliye ek `int` parameter mein `"5"` pass karna use chupke se convert kar deta hai. Ek file ke upar `declare(strict_types=1)` jodna type mismatches ko `TypeError` throw karwaata hai. Strict types ki purzor salah di jaati hai — silent coercion un sookshm bugs ka source hai jo jahan bane wahan se bahut door dikhte hain.',
    },
  },
  {
    question: 'How do you write testable PHP code?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Inject dependencies rather than instantiating them, so tests can supply fakes. Avoid static calls, globals, and superglobals inside domain logic — read `$_POST` once at the boundary and pass plain values inward. Keep functions PURE where possible and separate business logic from I/O, since logic without side effects needs no mocks. Depend on interfaces. Then PHPUnit tests are fast and simple, and the classes that resist testing are usually the ones with a design problem.',
      hinglish:
        'Dependencies ko banane ke bajaye inject karo, taaki tests nakli de sakein. Domain logic ke andar static calls, globals, aur superglobals se bacho — `$_POST` ko boundary pe ek baar padho aur plain values andar pass karo. Jahan ho sake functions ko PURE rakho aur business logic ko I/O se alag karo, kyunki bina side effects ki logic ko mocks nahi chahiye. Interfaces pe depend karo. Phir PHPUnit tests tez aur simple hain, aur jo classes test hone se bhaagti hain unme usually ek design problem hoti hai.',
    },
  },
  {
    question: 'What is the difference between require and Composer autoloading in practice?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Manual `require` means every file must be listed explicitly, in the right order, and adding a class means editing a bootstrap file — which does not scale and breaks silently when the order changes. Composer autoloading loads a class ON DEMAND, the first time it is referenced, using the PSR-4 namespace-to-path mapping. That means only the classes actually used in a request are loaded, which is both faster and far less error-prone.',
      hinglish:
        'Manual `require` ka matlab hai har file explicitly, sahi order mein, list karni padti hai, aur ek class jodne ka matlab ek bootstrap file edit karna — jo scale nahi karta aur order badalne pe chupke se toot jaata hai. Composer autoloading ek class ko ZAROORAT PE load karta hai, pehli baar reference hone pe, PSR-4 namespace-se-path mapping use karte hue. Iska matlab hai ek request mein sirf actually use hui classes load hoti hain, jo tez bhi hai aur bahut kam galti-prone bhi.',
    },
  },
  {
    question: 'How do you handle background jobs in PHP?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Do not do slow work in the request. Push a job onto a QUEUE — Redis, database, SQS, or RabbitMQ — and return immediately, then let a separate long-running worker process it. This matters because PHP has a `max_execution_time`, web servers time out, and a user should not wait for an email or a report. Design jobs to be idempotent and retryable, cap retries, and use a dead-letter queue so a permanently failing job does not loop forever.',
      hinglish:
        'Request mein slow kaam mat karo. Ek job ko ek QUEUE pe daalo — Redis, database, SQS, ya RabbitMQ — aur turant lauto, phir ek alag lambe chalne wale worker ko use process karne do. Ye isliye matter karta hai kyunki PHP mein ek `max_execution_time` hai, web servers timeout hote hain, aur ek user ko ek email ya ek report ka intezaar nahi karna chahiye. Jobs ko idempotent aur retryable banao, retries seemit karo, aur ek dead-letter queue use karo taaki ek hamesha fail hota job hamesha loop na kare.',
    },
  },
  {
    question: 'What is the difference between array_merge and the + operator?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`array_merge` appends numeric-keyed elements and REINDEXES them, while for string keys the LATER array wins. The `+` operator keeps the LEFT array\'s value whenever a key exists in both and does not reindex. So `[1,2] + [3,4,5]` gives `[1,2,5]`, which surprises almost everyone the first time. Use `array_merge` for combining lists and `+` when you want defaults that an existing value should override.',
      hinglish:
        '`array_merge` numeric-key wale elements ko jodta hai aur DOBARA INDEX karta hai, jabki string keys ke liye BAAD wala array jeetta hai. `+` operator jab bhi ek key dono mein ho tab BAAYE array ki value rakhta hai aur dobara index nahi karta. Isliye `[1,2] + [3,4,5]` `[1,2,5]` deta hai, jo pehli baar almost sabko chaunkata hai. Lists jodne ke liye `array_merge` use karo aur `+` tab jab tum aise defaults chahte ho jinhe ek maujood value override kare.',
    },
  },
  {
    question: 'What is the difference between isset, empty, and is_null?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`isset` returns true when a variable exists and is NOT null, and it emits no warning for an undefined index — which is why it is used to guard array access. `empty` returns true for anything FALSY: null, `0`, `"0"`, `""`, `false`, and an empty array — so `empty("0")` is true, a genuine trap when checking form input. `is_null` checks specifically for null and does warn on an undefined variable. Modern code often prefers `??` for the isset case.',
      hinglish:
        '`isset` tab true deta hai jab ek variable exist kare aur null NA ho, aur ek undefined index pe koi warning nahi deta — isiliye ye array access sambhalne ke liye use hota hai. `empty` har FALSY cheez pe true deta hai: null, `0`, `"0"`, `""`, `false`, aur ek khaali array — isliye `empty("0")` true hai, form input check karte waqt ek asli jaal. `is_null` khaas taur pe null check karta hai aur ek undefined variable pe warning deta hai. Modern code isset wale case ke liye aksar `??` prefer karta hai.',
    },
  },
  {
    question: 'What is the nullsafe operator in PHP 8?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`?->` short-circuits the whole chain to null if the object is null, instead of throwing "call to a member function on null". So `$user?->address?->city` is safe when either is null. It only guards NULL — it does not help if the property simply does not exist. And it can hide a real bug: if a user should always have an address, silently returning null is worse than an error that tells you the data is wrong.',
      hinglish:
        '`?->` object null hone pe poori chain ko null pe short-circuit kar deta hai, "call to a member function on null" throw karne ke bajaye. Isliye `$user?->address?->city` surakshit hai jab koi bhi null ho. Ye sirf NULL sambhalta hai — agar property exist hi nahi karti to ye madad nahi karta. Aur ye ek asli bug chhupa sakta hai: agar ek user ka hamesha ek address hona chahiye, chupke se null lautana us error se bura hai jo tumhe bataye ki data galat hai.',
    },
  },
  {
    question: 'Is PHP still relevant, and where is it used today?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Yes — PHP still powers a very large share of the web, including WordPress, which alone runs a substantial fraction of all websites, plus Laravel and Symfony applications across e-commerce, SaaS, and CMS work. PHP 8 is dramatically faster than PHP 5 and has real type safety, JIT, and modern tooling. Its reputation is largely based on PHP 5-era code. It remains a pragmatic choice for server-rendered web applications with excellent hosting availability.',
      hinglish:
        'Haan — PHP abhi bhi web ka ek bahut bada hissa chalata hai, including WordPress, jo akela saari websites ka ek kaafi hissa chalata hai, plus e-commerce, SaaS, aur CMS kaam mein Laravel aur Symfony applications. PHP 8 PHP 5 se dramatically tez hai aur usme asli type safety, JIT, aur modern tooling hai. Iski badnaami zyadatar PHP 5-daur ke code pe aadhaarit hai. Ye server-rendered web applications ke liye ek vyavaharik choice bana hua hai, behtareen hosting availability ke saath.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
