// MySQL curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs / mongodb.mjs, consumed by scripts/seed.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'MySQL',
  slug: 'mysql',
  description:
    'World ka most popular open-source database — setup, queries, indexes aur optimization. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🐬',
  tags: ['mysql', 'database', 'sql', 'rdbms', 'backend'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 17,
};

const beginner = [
  {
    title: 'Getting Started with MySQL',
    level: 'beginner',
    description: 'MySQL kya hai, RDBMS, client/server model aur pehla connection.',
    concepts: [
      {
        title: 'The Story of MySQL — What, Why & How',
        difficulty: 'easy',
        tags: ['intro', 'story', 'rdbms'],
        explanation: {
          english:
            'Imagine you start a small kirana shop. 🏪 On day one you note every sale in a single Excel sheet — item, price, customer. Easy.\n\nThen business grows. Now there are 20,000 rows, three staff members editing the same file at once, and the sheet keeps freezing. Someone overwrites yesterday\'s data. There is no way to ask "show me all customers from Pune who spent over 5000 last month" without scrolling for an hour. Your trusty Excel sheet has hit its limit. 😩\n\nThis is exactly the moment a real database engine is needed — and this is the problem MySQL was built to solve.\n\nWHAT 🐬 — MySQL is a popular, free, open-source relational database server. "Relational" means data lives in tables (rows and columns), and tables can relate to each other. "Server" means it is a running program that safely stores your data and answers questions about it.\n\nWHY ✅ — It is reliable (it does not lose your data when the power flickers), fast (it can search millions of rows in milliseconds using indexes), free (open-source, no licence bill), and battle-tested (huge sites like Facebook, YouTube, and countless Indian startups run on it). Many people at once can read and write safely.\n\nHOW ⚙️ — You (the client) connect to the MySQL server. You send instructions written in SQL (a language for asking questions like "give me all orders from today"). The server reads or updates the stored data and returns the answer. You ask, it responds — a clean client/server conversation.\n\nThat humble Excel sheet was your first database. MySQL is the grown-up, multi-user, never-freezing version. 🚀',
          hinglish:
            'Socho tumne ek choti kirana dukaan kholi. 🏪 Pehle din har sale ek Excel sheet mein likhte ho — item, price, customer. Aasaan.\n\nPhir business badhta hai. Ab 20,000 rows hain, teen log ek saath same file edit kar rahe hain, aur sheet baar-baar hang ho jaati hai. Koi kal ka data overwrite kar deta hai. "Pune ke saare customers dikhao jinhone pichle mahine 5000 se zyada kharcha kiya" — ye poochne ka koi tareeka nahi bina ek ghanta scroll kiye. Tumhari pyaari Excel sheet ab limit pe pahunch gayi. 😩\n\nYahi wo moment hai jab ek asli database engine ki zaroorat padti hai — aur yahi problem MySQL solve karta hai.\n\nWHAT 🐬 — MySQL ek popular, free, open-source relational database server hai. "Relational" matlab data tables (rows aur columns) mein rehta hai, aur tables ek doosre se relate kar sakti hain. "Server" matlab ek chalu program jo tumhara data safely store karta hai aur uske baare mein sawaalon ke jawab deta hai.\n\nWHY ✅ — Ye reliable hai (light gayi toh bhi data nahi khoyega), fast hai (indexes se millions rows milliseconds mein search), free hai (open-source, koi licence bill nahi), aur tested hai (Facebook, YouTube jaise bade sites aur tons of Indian startups isi pe chalte hain). Bahut saare log ek saath safely read/write kar sakte hain.\n\nHOW ⚙️ — Tum (client) MySQL server se connect karte ho. Tum SQL mein instructions bhejte ho (ek language jisse tum poochte ho "aaj ke saare orders do"). Server stored data ko padhta ya update karta hai aur jawab wapas deta hai. Tum poochte ho, wo jawab deta hai — ek saaf client/server baat-cheet.\n\nWo simple Excel sheet tumhara pehla database tha. MySQL uska bada, multi-user, kabhi-na-freeze hone wala version hai. 🚀',
        },
        dailyLifeExample:
          'Excel sheet ek single-person diary jaisa hai — theek hai jab tak chhota ho. MySQL ek bank ka counter system jaisa hai: hazaaron log ek saath transactions karte hain, kuch khota nahi, aur tum kisi bhi account ki detail seconds mein nikaal sakte ho.',
        codeExample:
          '-- SQL is the LANGUAGE you speak; MySQL is the SERVER that listens.\n-- A tiny taste of what you will write soon:\nSELECT name, city FROM customers WHERE city = "Pune";\n-- "Server, give me name and city of every customer from Pune."',
        keyPoints: [
          'A growing app outgrows a flat Excel sheet — it needs a real database',
          'MySQL is a free, open-source, relational database server',
          'WHY: reliable, fast, free, used by huge sites and many startups',
          'HOW: client connects, sends SQL, server stores/returns data',
        ],
        quiz: [
          {
            question: 'MySQL is best described as a…',
            options: ['Programming language', 'Spreadsheet app', 'Relational database server', 'Web browser'],
            correctIndex: 2,
          },
          {
            question: 'In the client/server model, the client…',
            options: ['stores the data', 'sends SQL requests to the server', 'replaces the server', 'never connects to MySQL'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why would a team move from spreadsheets/flat files to a database like MySQL?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Flat files break down with scale: no safe concurrent access, no fast searching, easy accidental overwrites, and no enforced structure. MySQL gives concurrent multi-user access, indexes for fast queries over millions of rows, data integrity via constraints, transactions for reliability, and a query language (SQL) to answer complex questions easily.',
              hinglish:
                'Flat files scale pe toot jaate hain: safe concurrent access nahi, fast searching nahi, galti se overwrite aasaan, aur koi enforced structure nahi. MySQL deta hai concurrent multi-user access, indexes se millions rows pe fast queries, constraints se data integrity, reliability ke liye transactions, aur ek query language (SQL) se complex sawaal aasaani se answer karna.',
            },
          },
        ],
      },
      {
        title: 'What is MySQL & RDBMS (vs plain SQL)',
        difficulty: 'easy',
        tags: ['rdbms', 'sql', 'server'],
        explanation: {
          english:
            'A key thing beginners confuse: SQL and MySQL are NOT the same. SQL (Structured Query Language) is the LANGUAGE — the standard set of commands (SELECT, INSERT, UPDATE, DELETE) used to talk to relational databases. MySQL is a specific database SERVER SOFTWARE that understands SQL and actually stores your data. So you speak SQL to MySQL. Other databases like PostgreSQL, Oracle, and SQL Server also speak SQL.\n\nRDBMS stands for Relational Database Management System — software that stores data in related tables with rows and columns and enforces rules between them. MySQL is one popular RDBMS. The client/server model means the MySQL server runs as a background process, and clients (CLI, apps, your code) connect to it to run SQL.',
          hinglish:
            'Ek important cheez jo beginners confuse karte hain: SQL aur MySQL same nahi hain. SQL (Structured Query Language) ek LANGUAGE hai — standard commands ka set (SELECT, INSERT, UPDATE, DELETE) jo relational databases se baat karne ke liye use hota hai. MySQL ek specific database SERVER SOFTWARE hai jo SQL samajhta hai aur asli mein tumhara data store karta hai. Toh tum MySQL se SQL bolte ho. PostgreSQL, Oracle, SQL Server jaise doosre databases bhi SQL bolte hain.\n\nRDBMS matlab Relational Database Management System — software jo data ko related tables (rows aur columns) mein store karta hai aur unke beech rules enforce karta hai. MySQL ek popular RDBMS hai. Client/server model matlab MySQL server background process ki tarah chalta hai, aur clients (CLI, apps, tumhara code) usse connect karke SQL chalate hain.',
        },
        dailyLifeExample:
          'SQL Hindi bhasha jaisa hai (bolne ka tareeka), aur MySQL ek specific insaan jaisa hai jo Hindi samajhta hai. Tum Hindi (SQL) bolte ho, alag-alag log (MySQL, PostgreSQL) usko samajh kar jawab dete hain.',
        codeExample:
          '-- SQL = the language. MySQL = one server that speaks it.\n-- Same SQL command works on MySQL, PostgreSQL, etc.:\nSELECT * FROM products;\n\n-- RDBMS = data lives in related tables:\n-- customers table  <—relates to—>  orders table',
        keyPoints: [
          'SQL is the language; MySQL is the server software that runs it',
          'RDBMS = Relational Database Management System (data in related tables)',
          'Other RDBMS (PostgreSQL, Oracle) also use SQL',
          'Client/server: MySQL server runs, clients connect and send SQL',
        ],
        quiz: [
          {
            question: 'Which statement is correct?',
            options: ['SQL and MySQL are the same thing', 'SQL is a language; MySQL is a database server', 'MySQL is a language; SQL is software', 'Neither uses tables'],
            correctIndex: 1,
          },
          {
            question: 'RDBMS stands for…',
            options: ['Rapid Data Backup Management System', 'Relational Database Management System', 'Remote Database Memory Store', 'Random Document Mapping System'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between SQL and MySQL?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'SQL (Structured Query Language) is a standardized language used to query and manage relational data — commands like SELECT, INSERT, UPDATE, DELETE. MySQL is a specific open-source RDBMS (database server software) that implements SQL and physically stores and manages the data. In short, SQL is what you write; MySQL is the engine that executes it. Other engines like PostgreSQL and Oracle also use SQL.',
              hinglish:
                'SQL (Structured Query Language) ek standardized language hai jo relational data ko query aur manage karne ke liye use hoti hai — SELECT, INSERT, UPDATE, DELETE jaise commands. MySQL ek specific open-source RDBMS (database server software) hai jo SQL implement karta hai aur data ko physically store aur manage karta hai. Short mein, SQL wo hai jo tum likhte ho; MySQL wo engine hai jo usse execute karta hai. PostgreSQL aur Oracle jaise doosre engines bhi SQL use karte hain.',
            },
          },
        ],
      },
      {
        title: 'Connecting via CLI & Creating a Database',
        difficulty: 'easy',
        tags: ['cli', 'create-database', 'use'],
        explanation: {
          english:
            'To talk to MySQL from your terminal, you use the mysql command-line client. The command "mysql -u root -p" connects as the user root and prompts for the password. Once inside, you get a "mysql>" prompt where you type SQL.\n\nA MySQL server can hold many databases. You create one with CREATE DATABASE, list them with SHOW DATABASES, and select which one you want to work in with USE. Every SQL statement ends with a semicolon (;) — forgetting it is the most common beginner mistake. Inside a database you create tables (next topic).',
          hinglish:
            'Terminal se MySQL se baat karne ke liye tum mysql command-line client use karte ho. Command "mysql -u root -p" root user ke roop mein connect karta hai aur password maangta hai. Andar jaate hi tumhe "mysql>" prompt milta hai jahan tum SQL likhte ho.\n\nEk MySQL server mein bahut saare databases ho sakte hain. Tum CREATE DATABASE se ek banate ho, SHOW DATABASES se list karte ho, aur USE se select karte ho ki kisme kaam karna hai. Har SQL statement semicolon (;) se khatam hoti hai — usse bhoolna sabse common beginner galti hai. Database ke andar tum tables banate ho (agla topic).',
        },
        dailyLifeExample:
          'Server ek badi almari hai. Har database ek alag drawer hai. CREATE DATABASE naya drawer banana hai, USE us drawer ko khol kar uske saamne baithna hai — ab jo bhi rakho ya nikaalo wo usi drawer ka hoga.',
        codeExample:
          '# Connect from your terminal (CLI):\nmysql -u root -p\n\n-- Now at the mysql> prompt:\nCREATE DATABASE shop;\nSHOW DATABASES;        -- list all databases\nUSE shop;              -- work inside "shop"\nSELECT DATABASE();     -- confirm current database',
        keyPoints: [
          'mysql -u root -p connects via the CLI client and asks for a password',
          'CREATE DATABASE makes a new database; SHOW DATABASES lists them',
          'USE <db> selects the database to work in',
          'Every SQL statement ends with a semicolon (;)',
        ],
        quiz: [
          {
            question: 'Which command connects to MySQL as user root and asks for a password?',
            options: ['mysql connect root', 'mysql -u root -p', 'login mysql root', 'use root password'],
            correctIndex: 1,
          },
          {
            question: 'After CREATE DATABASE shop; how do you start working inside it?',
            options: ['OPEN shop;', 'USE shop;', 'SELECT shop;', 'ENTER shop;'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Data Types & Tables',
    level: 'beginner',
    description: 'CREATE TABLE, common data types, PRIMARY KEY aur AUTO_INCREMENT.',
    concepts: [
      {
        title: 'Creating Tables & Common Data Types',
        difficulty: 'easy',
        tags: ['create-table', 'data-types', 'schema'],
        explanation: {
          english:
            'A table stores data in rows and columns. You define it with CREATE TABLE, listing each column\'s name and data type. The data type tells MySQL what kind of value a column holds and how much space it needs.\n\nCommon types: INT (whole numbers), DECIMAL(p,s) (exact decimals, great for money), VARCHAR(n) (variable-length text up to n characters), CHAR(n) (fixed-length text), TEXT (long text), DATE (a calendar date), DATETIME / TIMESTAMP (date + time), and BOOLEAN (true/false, stored as TINYINT). Choosing the right type keeps data clean and storage efficient — never store a price as VARCHAR.',
          hinglish:
            'Table data ko rows aur columns mein store karta hai. Tum usse CREATE TABLE se define karte ho, har column ka naam aur data type likhte ho. Data type MySQL ko batata hai ki column kaisi value rakhega aur kitni jagah chahiye.\n\nCommon types: INT (poore numbers), DECIMAL(p,s) (exact decimals, paise ke liye badhiya), VARCHAR(n) (variable-length text n characters tak), CHAR(n) (fixed-length text), TEXT (lamba text), DATE (calendar date), DATETIME / TIMESTAMP (date + time), aur BOOLEAN (true/false, TINYINT ke roop mein). Sahi type chunna data ko saaf aur storage ko efficient rakhta hai — price ko kabhi VARCHAR mein mat rakho.',
        },
        dailyLifeExample:
          'Table ek admission form jaisa hai: har field ka ek tay format hota hai — "Age" mein sirf number, "Name" mein text, "Date of Birth" mein date. Data type wahi format-rule hai jo MySQL khud enforce karta hai.',
        codeExample:
          'CREATE TABLE customers (\n  id INT,\n  name VARCHAR(100),\n  city VARCHAR(50),\n  balance DECIMAL(10, 2),   -- e.g. 99999999.99\n  is_active BOOLEAN,\n  joined_on DATE\n);\n\nDESCRIBE customers;   -- inspect the table structure',
        keyPoints: [
          'CREATE TABLE defines columns with names and data types',
          'INT for whole numbers, DECIMAL(p,s) for exact money values',
          'VARCHAR(n) for variable text, DATE / DATETIME for time',
          'Right data type = clean data + efficient storage',
        ],
        quiz: [
          {
            question: 'Which type is best for storing a product price like 199.50?',
            options: ['VARCHAR(10)', 'INT', 'DECIMAL(10,2)', 'TEXT'],
            correctIndex: 2,
          },
          {
            question: 'VARCHAR(50) stores…',
            options: ['exactly 50 numbers', 'variable-length text up to 50 characters', 'a 50-bit boolean', 'a date 50 days ahead'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between CHAR and VARCHAR?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'CHAR(n) is fixed-length: it always uses n characters of storage, padding shorter values with spaces — good for values that are always the same length (like a country code). VARCHAR(n) is variable-length: it stores only the actual characters plus a small length prefix, so it saves space for values whose length varies (like names). Use CHAR for fixed-size data, VARCHAR for everything else.',
              hinglish:
                'CHAR(n) fixed-length hai: hamesha n characters ki storage use karta hai, chhoti values ko spaces se pad karta hai — un values ke liye accha jo hamesha same length ki hon (jaise country code). VARCHAR(n) variable-length hai: sirf actual characters plus ek chhota length prefix store karta hai, isliye jin values ki length badalti rehti hai (jaise names) unke liye space bachata hai. Fixed-size data ke liye CHAR, baaki sab ke liye VARCHAR.',
            },
          },
        ],
      },
      {
        title: 'PRIMARY KEY & AUTO_INCREMENT',
        difficulty: 'easy',
        tags: ['primary-key', 'auto-increment', 'constraints'],
        explanation: {
          english:
            'Every row needs a way to be uniquely identified. A PRIMARY KEY is a column (or set of columns) whose value is unique for every row and never NULL — it is the row\'s identity card. A table can have only one primary key.\n\nTyping a unique id for every new row would be painful, so AUTO_INCREMENT lets MySQL generate the next number automatically (1, 2, 3, …). Combine them on an id column and you never worry about duplicate ids again. NOT NULL forces a column to always have a value; DEFAULT supplies a value when none is given.',
          hinglish:
            'Har row ko uniquely identify karne ka tareeka chahiye. PRIMARY KEY ek column (ya columns ka set) hai jiski value har row ke liye unique ho aur kabhi NULL na ho — ye row ka identity card hai. Ek table mein sirf ek primary key ho sakti hai.\n\nHar nayi row ke liye unique id type karna mushkil hoga, isliye AUTO_INCREMENT MySQL se agla number apne aap generate karwata hai (1, 2, 3, …). Inhe id column pe combine karo aur duplicate ids ki tension khatam. NOT NULL column ko hamesha value rakhne pe majboor karta hai; DEFAULT tab value deta hai jab koi na di gayi ho.',
        },
        dailyLifeExample:
          'PRIMARY KEY Aadhaar number jaisa hai — har insaan ka alag, kabhi khaali nahi. AUTO_INCREMENT token machine jaisi hai jo bina poochhe agla token number (1, 2, 3…) khud de deti hai.',
        codeExample:
          'CREATE TABLE customers (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  city VARCHAR(50) DEFAULT "Unknown",\n  joined_on DATE\n);\n\n-- id auto-fills: 1, 2, 3 ...\nINSERT INTO customers (name, city) VALUES ("Abhishek", "Pune");\nINSERT INTO customers (name) VALUES ("Riya");  -- city = "Unknown"',
        keyPoints: [
          'PRIMARY KEY = unique, never-NULL identifier; one per table',
          'AUTO_INCREMENT auto-generates the next number (1, 2, 3, …)',
          'NOT NULL forces a value; DEFAULT supplies a fallback value',
          'id INT AUTO_INCREMENT PRIMARY KEY is the classic combo',
        ],
        quiz: [
          {
            question: 'A PRIMARY KEY value must be…',
            options: ['always text', 'unique and never NULL', 'the same for all rows', 'optional'],
            correctIndex: 1,
          },
          {
            question: 'AUTO_INCREMENT is used to…',
            options: ['encrypt the column', 'automatically generate the next number for new rows', 'delete old rows', 'sort the table'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a PRIMARY KEY and a UNIQUE key?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Both enforce uniqueness, but a PRIMARY KEY also cannot be NULL and there can be only one per table — it is the table\'s main identifier and is automatically indexed. A UNIQUE key also guarantees no duplicate values but allows one NULL (in MySQL) and you can have several UNIQUE keys on a table. Use PRIMARY KEY for the main identity (like id), UNIQUE for other no-duplicate fields like email.',
              hinglish:
                'Dono uniqueness enforce karte hain, par PRIMARY KEY NULL bhi nahi ho sakti aur ek table mein sirf ek hi ho sakti hai — ye table ka main identifier hai aur automatically indexed hota hai. UNIQUE key bhi duplicate values nahi hone deti par ek NULL allow karti hai (MySQL mein) aur ek table pe kai UNIQUE keys ho sakti hain. Main identity (jaise id) ke liye PRIMARY KEY, email jaise doosre no-duplicate fields ke liye UNIQUE use karo.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Querying in MySQL',
    level: 'intermediate',
    description: 'SELECT, WHERE, ORDER BY, LIMIT, aggregates aur GROUP BY.',
    concepts: [
      {
        title: 'SELECT, WHERE, ORDER BY & LIMIT',
        difficulty: 'medium',
        tags: ['select', 'where', 'order-by', 'limit'],
        explanation: {
          english:
            'SELECT is how you read data. "SELECT columns FROM table" fetches columns from a table; "SELECT *" fetches all columns. WHERE filters rows by a condition (=, >, <, !=, LIKE for patterns, IN for a list, BETWEEN for ranges). ORDER BY sorts the result — ASC (ascending, default) or DESC (descending). LIMIT caps how many rows come back, which is essential for big tables and pagination.\n\nYou combine them in a fixed order: SELECT … FROM … WHERE … ORDER BY … LIMIT …. Reading top results, filtering by city, sorting by price — all of it is just these four pieces.',
          hinglish:
            'SELECT se tum data padhte ho. "SELECT columns FROM table" table se columns laata hai; "SELECT *" saare columns laata hai. WHERE rows ko condition se filter karta hai (=, >, <, !=, patterns ke liye LIKE, list ke liye IN, ranges ke liye BETWEEN). ORDER BY result ko sort karta hai — ASC (badhta, default) ya DESC (ghatata). LIMIT batata hai kitni rows wapas aayengi, jo badi tables aur pagination ke liye zaroori hai.\n\nTum inhe ek fixed order mein combine karte ho: SELECT … FROM … WHERE … ORDER BY … LIMIT …. Top results padhna, city se filter karna, price se sort karna — sab bas yahi chaar tukde hain.',
        },
        dailyLifeExample:
          'Ye Amazon search jaisa hai: SELECT (kaunse products dikhane hain), WHERE (sirf "Pune mein available"), ORDER BY (price low-to-high), LIMIT (pehle 10 hi dikhao). Roz tum yahi karte ho.',
        codeExample:
          '-- Customers from Pune, richest first, top 5\nSELECT name, city, balance\nFROM customers\nWHERE city = "Pune"\nORDER BY balance DESC\nLIMIT 5;\n\n-- Pattern + range + list filters\nSELECT * FROM customers\nWHERE name LIKE "A%"          -- starts with A\n  AND balance BETWEEN 1000 AND 5000\n  AND city IN ("Pune", "Delhi");',
        keyPoints: [
          'SELECT reads columns; SELECT * reads all columns',
          'WHERE filters rows (=, >, LIKE, IN, BETWEEN)',
          'ORDER BY sorts (ASC default, DESC reverse)',
          'LIMIT caps rows — key for big tables and pagination',
        ],
        quiz: [
          {
            question: 'Which clause filters which rows are returned?',
            options: ['ORDER BY', 'WHERE', 'LIMIT', 'SELECT'],
            correctIndex: 1,
          },
          {
            question: 'ORDER BY balance DESC sorts…',
            options: ['alphabetically by name', 'highest balance first', 'lowest balance first', 'randomly'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between WHERE and HAVING?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'WHERE filters individual rows BEFORE any grouping and cannot use aggregate functions. HAVING filters AFTER GROUP BY, on the grouped/aggregated results, so it can use aggregates like COUNT() or SUM(). For example, WHERE city = "Pune" filters rows; HAVING COUNT(*) > 5 keeps only groups with more than five rows. Often you use both in one query.',
              hinglish:
                'WHERE individual rows ko grouping se PEHLE filter karta hai aur aggregate functions use nahi kar sakta. HAVING GROUP BY ke BAAD, grouped/aggregated results pe filter karta hai, isliye ye COUNT() ya SUM() jaise aggregates use kar sakta hai. Jaise WHERE city = "Pune" rows filter karta hai; HAVING COUNT(*) > 5 sirf un groups ko rakhta hai jinmein paanch se zyada rows ho. Aksar dono ek hi query mein use hote hain.',
            },
          },
        ],
      },
      {
        title: 'Aggregate Functions & GROUP BY',
        difficulty: 'medium',
        tags: ['aggregate', 'group-by', 'count', 'sum'],
        explanation: {
          english:
            'Aggregate functions summarise many rows into one value: COUNT() counts rows, SUM() adds, AVG() averages, MIN() and MAX() find extremes. By themselves they collapse the whole table into a single number.\n\nGROUP BY splits rows into groups first, then applies the aggregate to each group. "SELECT city, COUNT(*) FROM customers GROUP BY city" gives one count per city. Use HAVING to filter those groups (WHERE cannot, because it runs before grouping). This is how you build reports: sales per month, orders per customer, average rating per product.',
          hinglish:
            'Aggregate functions bahut saari rows ko ek value mein summarise karte hain: COUNT() rows ginta hai, SUM() jodta hai, AVG() average nikaalta hai, MIN() aur MAX() extremes dhoondhte hain. Akele ye poori table ko ek single number mein samet dete hain.\n\nGROUP BY pehle rows ko groups mein baant deta hai, phir har group pe aggregate lagaata hai. "SELECT city, COUNT(*) FROM customers GROUP BY city" har city ke liye ek count deta hai. Un groups ko filter karne ke liye HAVING use karo (WHERE nahi kar sakta, kyunki wo grouping se pehle chalta hai). Reports aise hi banti hain: per month sales, per customer orders, per product average rating.',
        },
        dailyLifeExample:
          'GROUP BY class teacher ke kaam jaisa hai: pehle students ko section A, B, C mein baanto, phir har section ka average marks (AVG) ya total students (COUNT) nikaalo. Ek hi step mein har group ka summary.',
        codeExample:
          '-- How many customers per city?\nSELECT city, COUNT(*) AS total\nFROM customers\nGROUP BY city\nORDER BY total DESC;\n\n-- Cities with more than 10 customers only\nSELECT city, COUNT(*) AS total, AVG(balance) AS avg_balance\nFROM customers\nGROUP BY city\nHAVING COUNT(*) > 10;',
        keyPoints: [
          'COUNT, SUM, AVG, MIN, MAX summarise many rows into one',
          'GROUP BY makes groups, then aggregates each group',
          'HAVING filters groups; WHERE filters rows before grouping',
          'Foundation of reports: per-city, per-month, per-customer totals',
        ],
        quiz: [
          {
            question: 'Which function returns the number of rows?',
            options: ['SUM()', 'COUNT()', 'AVG()', 'MAX()'],
            correctIndex: 1,
          },
          {
            question: 'GROUP BY city is used to…',
            options: ['delete duplicate cities', 'aggregate rows separately for each city', 'sort cities alphabetically', 'create a new table'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Joins & Relationships',
    level: 'intermediate',
    description: 'Foreign keys, INNER JOIN aur LEFT JOIN.',
    concepts: [
      {
        title: 'Foreign Keys & Relationships',
        difficulty: 'medium',
        tags: ['foreign-key', 'relationships', 'normalization'],
        explanation: {
          english:
            'Relational databases shine when tables relate to each other instead of repeating data. Instead of storing the full customer details in every order, an orders table stores just a customer_id that points to the customers table.\n\nA FOREIGN KEY is a column that references the PRIMARY KEY of another table, enforcing that the referenced row actually exists (referential integrity). It prevents "orphan" rows — you cannot create an order for a customer_id that does not exist, and (with ON DELETE rules) MySQL can stop or cascade deletes. This one-to-many link (one customer, many orders) is the heart of relational design.',
          hinglish:
            'Relational databases tab chamakte hain jab tables data repeat karne ke bajaye ek doosre se relate karti hain. Har order mein poori customer detail rakhne ke bajaye, orders table sirf ek customer_id rakhti hai jo customers table ko point karti hai.\n\nFOREIGN KEY ek column hai jo doosri table ki PRIMARY KEY ko reference karta hai, aur ensure karta hai ki referenced row sach mein exist karti ho (referential integrity). Ye "orphan" rows rokta hai — tum aise customer_id ke liye order nahi bana sakte jo exist hi nahi karta, aur (ON DELETE rules ke saath) MySQL deletes ko rok ya cascade kar sakta hai. Ye one-to-many link (ek customer, kai orders) relational design ka dil hai.',
        },
        dailyLifeExample:
          'School mein har student ko roll number dete ho. Library register mein poora student record likhne ke bajaye sirf roll number likhte ho. Foreign key wahi roll number hai — wo asli student record se juda rehta hai, bina dohraaye.',
        codeExample:
          'CREATE TABLE orders (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  customer_id INT,\n  amount DECIMAL(10,2),\n  FOREIGN KEY (customer_id) REFERENCES customers(id)\n);\n\n-- This works only if customer 1 exists in customers:\nINSERT INTO orders (customer_id, amount) VALUES (1, 499.00);',
        keyPoints: [
          'Relate tables instead of repeating data',
          'FOREIGN KEY references another table\'s PRIMARY KEY',
          'Enforces referential integrity (no orphan rows)',
          'One-to-many (one customer, many orders) is the core pattern',
        ],
        quiz: [
          {
            question: 'A FOREIGN KEY usually points to another table\'s…',
            options: ['random column', 'PRIMARY KEY', 'index name', 'database name'],
            correctIndex: 1,
          },
          {
            question: 'Foreign keys help prevent…',
            options: ['fast queries', 'orphan rows referencing non-existent records', 'creating tables', 'using SELECT'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'INNER JOIN & LEFT JOIN',
        difficulty: 'medium',
        tags: ['join', 'inner-join', 'left-join'],
        explanation: {
          english:
            'A JOIN combines rows from two (or more) tables based on a related column. INNER JOIN returns only rows that have a match in BOTH tables — e.g., customers who actually placed orders. LEFT JOIN returns ALL rows from the left table plus matching rows from the right; where there is no match, the right side columns come back as NULL — e.g., all customers, even those with zero orders.\n\nYou write the relationship in the ON clause, usually matching a foreign key to a primary key. Joins let you answer questions that span tables: "each order with its customer name", "customers who have never ordered".',
          hinglish:
            'JOIN do (ya zyada) tables ki rows ko ek related column ke aadhaar pe jodta hai. INNER JOIN sirf wahi rows deta hai jinka match DONO tables mein ho — jaise wo customers jinhone sach mein orders diye. LEFT JOIN left table ki SAARI rows deta hai plus right ki matching rows; jahan match nahi, wahan right side ke columns NULL aate hain — jaise saare customers, even wo jinke zero orders hain.\n\nTum relationship ON clause mein likhte ho, aksar foreign key ko primary key se match karke. Joins tumhe tables ke across sawaal answer karne dete hain: "har order uske customer name ke saath", "wo customers jinhone kabhi order nahi kiya".',
        },
        dailyLifeExample:
          'INNER JOIN guest list aur attendance match karne jaisa hai — sirf wahi log jo invited the AUR aaye bhi. LEFT JOIN poori guest list dikhata hai, saath mein nishaani ki kaun-kaun aaya (aur jo nahi aaye unke saamne khaali/NULL).',
        codeExample:
          '-- Each order with its customer name (only matched rows)\nSELECT o.id, c.name, o.amount\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.id;\n\n-- ALL customers, even those with no orders\nSELECT c.name, o.id AS order_id\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id;\n-- order_id is NULL for customers who never ordered',
        keyPoints: [
          'JOIN combines tables on a related column via ON',
          'INNER JOIN keeps only rows matched in both tables',
          'LEFT JOIN keeps all left rows; unmatched right columns are NULL',
          'Use joins to answer cross-table questions',
        ],
        quiz: [
          {
            question: 'INNER JOIN returns…',
            options: ['all rows from both tables', 'only rows with a match in both tables', 'all left-table rows', 'only NULL rows'],
            correctIndex: 1,
          },
          {
            question: 'In a LEFT JOIN, unmatched right-table columns appear as…',
            options: ['0', 'empty string', 'NULL', 'an error'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN.',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'INNER JOIN returns only rows that have matching values in both tables. LEFT JOIN (LEFT OUTER JOIN) returns all rows from the left table and the matched rows from the right; unmatched right columns are NULL. RIGHT JOIN is the mirror: all rows from the right table plus matched left rows, with NULLs where the left has no match. Practically, LEFT JOIN is most common; a RIGHT JOIN can always be rewritten as a LEFT JOIN by swapping table order.',
              hinglish:
                'INNER JOIN sirf wahi rows deta hai jinki values dono tables mein match karti hain. LEFT JOIN (LEFT OUTER JOIN) left table ki saari rows aur right ki matched rows deta hai; unmatched right columns NULL hote hain. RIGHT JOIN iska mirror hai: right table ki saari rows plus matched left rows, aur jahan left mein match nahi wahan NULL. Practically LEFT JOIN sabse common hai; RIGHT JOIN ko hamesha table order swap karke LEFT JOIN ki tarah likha ja sakta hai.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Indexes & Performance',
    level: 'intermediate',
    description: 'Indexes kya hain, CREATE INDEX aur EXPLAIN basics.',
    concepts: [
      {
        title: 'Indexes & EXPLAIN',
        difficulty: 'medium',
        tags: ['index', 'explain', 'performance'],
        explanation: {
          english:
            'Without an index, MySQL must scan every row to find matches — a "full table scan" — slow on big tables. An INDEX is a sorted lookup structure (like a book\'s index) on one or more columns, letting MySQL jump straight to matching rows. PRIMARY KEY and UNIQUE columns are indexed automatically; you add others with CREATE INDEX on columns you frequently filter, join, or sort by.\n\nIndexes massively speed up reads but slightly slow down writes (each INSERT/UPDATE must also update the index) and use disk space, so index thoughtfully. EXPLAIN before a query shows MySQL\'s plan — whether it uses an index or does a full scan — your main tool for spotting slow queries.',
          hinglish:
            'Index ke bina MySQL ko har row scan karni padti hai matches dhoondhne ke liye — "full table scan" — badi tables pe slow. INDEX ek sorted lookup structure hai (book ke index jaisa) ek ya zyada columns pe, jo MySQL ko seedha matching rows pe jump karne deta hai. PRIMARY KEY aur UNIQUE columns automatically indexed hote hain; baaki tum CREATE INDEX se un columns pe add karte ho jinpe tum aksar filter, join ya sort karte ho.\n\nIndexes reads ko bahut tez karte hain par writes ko thoda slow (har INSERT/UPDATE ko index bhi update karna padta hai) aur disk space lete hain, isliye soch-samajh ke index karo. Query se pehle EXPLAIN MySQL ka plan dikhata hai — index use ho raha hai ya full scan — slow queries pakadne ka tumhara main tool.',
        },
        dailyLifeExample:
          'Ek 500-page book mein "MySQL" shabd dhoondhna: bina index har page palatna padega (full scan). Book ke peeche diya index seedha page number bata deta hai. Database index bilkul wahi kaam karta hai.',
        codeExample:
          '-- Speed up lookups on city\nCREATE INDEX idx_city ON customers(city);\n\n-- See how MySQL will run a query\nEXPLAIN SELECT * FROM customers WHERE city = "Pune";\n-- "type: ref" + a key listed = index used (good)\n-- "type: ALL" = full table scan (often bad on big tables)',
        keyPoints: [
          'No index = full table scan = slow on large tables',
          'INDEX = sorted lookup so MySQL jumps to matching rows',
          'PRIMARY KEY / UNIQUE are auto-indexed; add others with CREATE INDEX',
          'Indexes speed reads, slow writes; EXPLAIN shows the query plan',
        ],
        quiz: [
          {
            question: 'What is the main benefit of an index?',
            options: ['Faster row lookups/searches', 'Smaller database files', 'Faster INSERTs', 'Prettier output'],
            correctIndex: 0,
          },
          {
            question: 'EXPLAIN is used to…',
            options: ['delete a table', 'show how MySQL will execute a query (its plan)', 'create an index', 'back up data'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When should you add an index, and what is the trade-off?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Add indexes on columns used often in WHERE filters, JOIN conditions, and ORDER BY, especially on large tables and high-selectivity columns. The trade-off: indexes speed up reads but slow down writes (every INSERT/UPDATE/DELETE must maintain the index) and consume extra storage. So avoid over-indexing — too many unused indexes hurt write performance. Use EXPLAIN to confirm an index is actually used before keeping it.',
              hinglish:
                'Index un columns pe add karo jo WHERE filters, JOIN conditions, aur ORDER BY mein aksar use hote hain, khaaskar badi tables aur high-selectivity columns pe. Trade-off: indexes reads tez karte hain par writes slow (har INSERT/UPDATE/DELETE ko index maintain karna padta hai) aur extra storage lete hain. Isliye over-indexing se bacho — bahut saare unused indexes write performance kharab karte hain. Index rakhne se pehle EXPLAIN se confirm karo ki wo sach mein use ho raha hai.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Advanced MySQL',
    level: 'advanced',
    description: 'Transactions, ACID, stored procedures aur views.',
    concepts: [
      {
        title: 'Transactions & ACID',
        difficulty: 'hard',
        tags: ['transactions', 'acid', 'commit', 'rollback'],
        explanation: {
          english:
            'Some operations must happen all-or-nothing. When you transfer money, debiting one account and crediting another must BOTH succeed or BOTH fail — never half. A TRANSACTION groups several statements into one unit: START TRANSACTION begins it, COMMIT makes all changes permanent, and ROLLBACK undoes everything if something goes wrong.\n\nTransactions give you ACID guarantees: Atomicity (all-or-nothing), Consistency (data stays valid by the rules), Isolation (concurrent transactions do not corrupt each other), and Durability (committed data survives crashes). In MySQL, ACID transactions require the InnoDB storage engine (the default), not MyISAM.',
          hinglish:
            'Kuch operations all-or-nothing hone chahiye. Paise transfer karte waqt, ek account se debit aur doosre mein credit DONO succeed hone chahiye ya DONO fail — kabhi aadha nahi. TRANSACTION kai statements ko ek unit mein group karta hai: START TRANSACTION shuru karta hai, COMMIT saare changes permanent karta hai, aur ROLLBACK kuch galat hone par sab undo kar deta hai.\n\nTransactions tumhe ACID guarantees dete hain: Atomicity (all-or-nothing), Consistency (data rules ke hisaab se valid rehta hai), Isolation (concurrent transactions ek doosre ko corrupt nahi karte), aur Durability (committed data crash ke baad bhi bachta hai). MySQL mein ACID transactions ke liye InnoDB storage engine chahiye (default), MyISAM nahi.',
        },
        dailyLifeExample:
          'UPI transfer jaisa: tumhare account se 500 kate AUR dost ke account mein 500 jude — dono ek saath. Beech mein network gir jaaye toh ROLLBACK ho jaata hai aur paisa wapas — aadha-adhura kabhi nahi hota.',
        codeExample:
          'START TRANSACTION;\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;   -- both changes saved together\n\n-- If something failed before COMMIT:\n-- ROLLBACK;  -- undo everything, as if nothing happened',
        keyPoints: [
          'Transaction = group of statements that succeed or fail together',
          'START TRANSACTION … COMMIT (save) / ROLLBACK (undo)',
          'ACID = Atomicity, Consistency, Isolation, Durability',
          'Needs InnoDB (MySQL default), not MyISAM',
        ],
        quiz: [
          {
            question: 'Which command undoes all changes in the current transaction?',
            options: ['COMMIT', 'ROLLBACK', 'SAVE', 'DELETE'],
            correctIndex: 1,
          },
          {
            question: 'The "A" in ACID stands for…',
            options: ['Availability', 'Atomicity', 'Accuracy', 'Authorization'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is a transaction and what does ACID guarantee?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'A transaction is a sequence of operations treated as a single logical unit of work that either fully completes (COMMIT) or fully undoes (ROLLBACK). ACID describes its guarantees: Atomicity (all statements succeed or none do), Consistency (the database moves from one valid state to another, respecting constraints), Isolation (concurrent transactions do not see each other\'s incomplete changes, controlled by isolation levels), and Durability (once committed, data survives crashes). In MySQL these require InnoDB.',
              hinglish:
                'Transaction operations ka ek sequence hai jo ek single logical unit ki tarah treat hota hai jo ya toh poora complete hota hai (COMMIT) ya poora undo (ROLLBACK). ACID iski guarantees batata hai: Atomicity (saare statements succeed ya koi nahi), Consistency (database ek valid state se doosri valid state mein jaata hai, constraints respect karke), Isolation (concurrent transactions ek doosre ke adhoore changes nahi dekhte, isolation levels se control), aur Durability (commit ke baad data crash mein bhi bachta hai). MySQL mein inke liye InnoDB chahiye.',
            },
          },
        ],
      },
      {
        title: 'Views & Stored Procedures Basics',
        difficulty: 'hard',
        tags: ['views', 'stored-procedures'],
        explanation: {
          english:
            'A VIEW is a saved SELECT query that behaves like a virtual table. It stores no data of its own — every time you query the view, the underlying SELECT runs. Views simplify complex queries, give a stable interface, and can hide sensitive columns. You create one with CREATE VIEW name AS SELECT ….\n\nA STORED PROCEDURE is a named block of SQL stored in the database that you run with CALL. It can take parameters, contain multiple statements, and bundle business logic on the server side — useful for reusable, repeated operations. Because the delimiter ; would end the definition early, you temporarily change the delimiter (e.g. //) while creating a procedure.',
          hinglish:
            'VIEW ek saved SELECT query hai jo virtual table ki tarah behave karti hai. Ye apna koi data store nahi karti — jab bhi tum view query karte ho, underlying SELECT chalti hai. Views complex queries ko simple karti hain, ek stable interface deti hain, aur sensitive columns chhupa sakti hain. Tum ise CREATE VIEW name AS SELECT … se banate ho.\n\nSTORED PROCEDURE database mein stored SQL ka ek named block hai jise tum CALL se chalate ho. Ye parameters le sakti hai, multiple statements rakh sakti hai, aur server-side business logic bundle kar sakti hai — reusable, repeated operations ke liye useful. Kyunki delimiter ; definition ko jaldi khatam kar dega, procedure banate waqt tum temporarily delimiter badalte ho (jaise //).',
        },
        dailyLifeExample:
          'View ek ready-made "Aaj ke top sellers" report jaisa hai jise tum baar-baar bina dobara likhe khol sakte ho. Stored procedure ek save kiya hua macro jaisa hai — ek naam se poora kaam (CALL) ho jaata hai.',
        codeExample:
          '-- VIEW: a reusable virtual table\nCREATE VIEW pune_customers AS\nSELECT id, name, balance FROM customers WHERE city = "Pune";\nSELECT * FROM pune_customers;   -- query it like a table\n\n-- STORED PROCEDURE with a parameter\nDELIMITER //\nCREATE PROCEDURE GetByCity(IN c VARCHAR(50))\nBEGIN\n  SELECT * FROM customers WHERE city = c;\nEND //\nDELIMITER ;\nCALL GetByCity("Delhi");',
        keyPoints: [
          'VIEW = saved SELECT acting as a virtual table (stores no data)',
          'Views simplify queries and can hide sensitive columns',
          'STORED PROCEDURE = named, reusable SQL block run with CALL',
          'Change DELIMITER while defining a procedure',
        ],
        quiz: [
          {
            question: 'A VIEW…',
            options: ['stores its own copy of the data', 'is a saved query acting as a virtual table', 'is the same as an index', 'deletes rows automatically'],
            correctIndex: 1,
          },
          {
            question: 'You run a stored procedure using…',
            options: ['SELECT', 'CALL', 'RUN', 'EXEC PROC'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Backup & Optimization',
    level: 'advanced',
    description: 'mysqldump, query optimization tips aur normalization.',
    concepts: [
      {
        title: 'Backups with mysqldump',
        difficulty: 'medium',
        tags: ['backup', 'mysqldump', 'restore'],
        explanation: {
          english:
            'Data loss can sink a business, so regular backups are non-negotiable. mysqldump is the classic command-line tool that exports a database (or specific tables) as a single .sql file containing the CREATE and INSERT statements needed to rebuild it. It runs from your normal terminal, not the mysql> prompt.\n\nTo back up: "mysqldump -u root -p shop > shop_backup.sql". To restore, you feed that file back into MySQL: "mysql -u root -p shop < shop_backup.sql". For large or production systems you also schedule backups (e.g. via cron) and keep copies off-site. A backup you have never tested restoring is not really a backup.',
          hinglish:
            'Data loss business doob sakti hai, isliye regular backups non-negotiable hain. mysqldump classic command-line tool hai jo ek database (ya specific tables) ko ek single .sql file ke roop mein export karta hai jisme rebuild karne ke liye zaroori CREATE aur INSERT statements hoti hain. Ye tumhare normal terminal se chalta hai, mysql> prompt se nahi.\n\nBackup ke liye: "mysqldump -u root -p shop > shop_backup.sql". Restore ke liye us file ko wapas MySQL mein feed karo: "mysql -u root -p shop < shop_backup.sql". Bade ya production systems ke liye tum backups schedule bhi karte ho (jaise cron se) aur copies off-site rakhte ho. Jis backup ko restore karke kabhi test nahi kiya, wo sach mein backup nahi hai.',
        },
        dailyLifeExample:
          'mysqldump phone ka Google backup jaisa hai: ek file mein sab kuch save ho jaata hai. Phone kho jaaye (server crash) toh us backup se sab wapas aa jaata hai — bas tabhi jab tumne backup liya tha.',
        codeExample:
          '# Back up the whole "shop" database to a file (run in terminal):\nmysqldump -u root -p shop > shop_backup.sql\n\n# Back up only specific tables:\nmysqldump -u root -p shop customers orders > tables_backup.sql\n\n# Restore from the backup file:\nmysql -u root -p shop < shop_backup.sql',
        keyPoints: [
          'mysqldump exports a database/tables to a .sql file',
          'Runs in the terminal, not the mysql> prompt',
          'Restore by piping the .sql file back into mysql',
          'Schedule backups and actually test restoring them',
        ],
        quiz: [
          {
            question: 'mysqldump is used to…',
            options: ['delete a database', 'export/back up a database to a .sql file', 'create an index', 'connect two servers'],
            correctIndex: 1,
          },
          {
            question: 'How do you restore a database from shop_backup.sql?',
            options: ['mysqldump shop < shop_backup.sql', 'mysql -u root -p shop < shop_backup.sql', 'RESTORE shop_backup.sql', 'SELECT * FROM shop_backup'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Normalization & Query Optimization Tips',
        difficulty: 'hard',
        tags: ['normalization', 'optimization', 'design'],
        explanation: {
          english:
            'Normalization is organising tables to reduce redundancy and avoid anomalies. Roughly: 1NF (atomic values, no repeating groups), 2NF (no partial dependency on part of a composite key), 3NF (no column depends on a non-key column). The practical goal: store each fact once, link with foreign keys, and you avoid update anomalies (changing a customer\'s city in fifty rows).\n\nOptimization tips that matter daily: select only the columns you need (avoid SELECT * in production), index columns used in WHERE/JOIN/ORDER BY, use EXPLAIN to catch full scans, avoid functions on indexed columns in WHERE (it disables the index), prefer JOINs over many separate queries, and use LIMIT for pagination. Sometimes controlled denormalization is a valid trade-off for read-heavy systems — but start normalized.',
          hinglish:
            'Normalization tables ko aise organise karna hai ki redundancy kam ho aur anomalies se bacho. Mota-mota: 1NF (atomic values, koi repeating groups nahi), 2NF (composite key ke part pe partial dependency nahi), 3NF (koi column non-key column pe depend na kare). Practical goal: har fact ek baar store karo, foreign keys se link karo, aur tum update anomalies se bachte ho (ek customer ki city pachaas rows mein badalna).\n\nRoz kaam aane wale optimization tips: sirf zaroori columns select karo (production mein SELECT * avoid karo), WHERE/JOIN/ORDER BY ke columns index karo, full scans pakadne ke liye EXPLAIN use karo, WHERE mein indexed columns pe functions avoid karo (wo index disable kar deta hai), kai alag queries ke bajaye JOINs prefer karo, aur pagination ke liye LIMIT use karo. Kabhi-kabhi read-heavy systems ke liye controlled denormalization valid trade-off hai — par shuruaat normalized se karo.',
        },
        dailyLifeExample:
          'Normalization yatra ka address master-list jaisa hai: customer ki city ek hi jagah store karo, har order mein dohraao mat. City badle toh ek hi jagah update — sab orders apne aap sahi. Repeat karte toh pachaas jagah badalna padta.',
        codeExample:
          '-- Bad: repeating customer data in every order\n-- orders(id, customer_name, customer_city, amount)\n\n-- Normalized: store the fact once, link by id\n-- customers(id, name, city)\n-- orders(id, customer_id, amount)  -- FK -> customers.id\n\n-- Optimization: select only needed columns + use a join\nSELECT o.id, c.name, o.amount\nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE c.city = "Pune"\nLIMIT 20;',
        keyPoints: [
          'Normalization (1NF/2NF/3NF) removes redundancy and anomalies',
          'Store each fact once; link tables with foreign keys',
          'Avoid SELECT *; index WHERE/JOIN/ORDER BY columns',
          'Use EXPLAIN, LIMIT, and JOINs; denormalize only with reason',
        ],
        quiz: [
          {
            question: 'The main goal of normalization is to…',
            options: ['make queries slower', 'reduce data redundancy and avoid anomalies', 'remove all foreign keys', 'store every fact many times'],
            correctIndex: 1,
          },
          {
            question: 'Which is a good optimization habit?',
            options: ['Always use SELECT * in production', 'Index columns used in WHERE/JOIN/ORDER BY', 'Never use indexes', 'Avoid LIMIT for pagination'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is database normalization and why does it matter?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Normalization is the process of structuring tables to minimise redundancy and dependency, typically up to 3NF: 1NF requires atomic values and no repeating groups, 2NF removes partial dependencies on part of a composite key, and 3NF removes transitive dependencies on non-key columns. It matters because it prevents update, insert, and delete anomalies and keeps data consistent — a fact is stored once and referenced by keys. The trade-off is more joins; for read-heavy workloads teams sometimes denormalize deliberately for performance.',
              hinglish:
                'Normalization tables ko aise structure karne ka process hai ki redundancy aur dependency kam ho, aam taur pe 3NF tak: 1NF atomic values aur koi repeating groups nahi chahta, 2NF composite key ke part pe partial dependencies hataata hai, aur 3NF non-key columns pe transitive dependencies hataata hai. Ye matter karta hai kyunki ye update, insert, aur delete anomalies rokta hai aur data consistent rakhta hai — ek fact ek baar store hoti hai aur keys se reference hoti hai. Trade-off zyada joins hai; read-heavy workloads ke liye teams kabhi-kabhi performance ke liye jaanbujh ke denormalize karti hain.',
            },
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What are the main differences between MySQL and a NoSQL database like MongoDB?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'MySQL is a relational database: data lives in tables with a fixed schema, rows and columns, foreign keys, and powerful JOINs, and it supports ACID transactions — ideal for structured, highly related data and strong consistency. MongoDB is a NoSQL document database storing flexible JSON-like documents with no fixed schema, scaling horizontally more easily and modelling data to match access patterns. Choose MySQL for relational, transactional, consistent data; choose NoSQL for flexible, rapidly evolving, or very large unstructured data.',
      hinglish:
        'MySQL ek relational database hai: data fixed schema wali tables mein rehta hai, rows aur columns, foreign keys, aur powerful JOINs, aur ye ACID transactions support karta hai — structured, highly related data aur strong consistency ke liye ideal. MongoDB ek NoSQL document database hai jo flexible JSON-jaisi documents bina fixed schema store karta hai, horizontally aasaani se scale karta hai aur data ko access patterns ke hisaab se model karta hai. Relational, transactional, consistent data ke liye MySQL chuno; flexible, tezi se badalne wale, ya bahut bade unstructured data ke liye NoSQL.',
    },
  },
  {
    question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'DELETE removes rows one by one and can use a WHERE clause to delete specific rows; it is logged, can be rolled back in a transaction, and keeps the table structure. TRUNCATE quickly removes ALL rows by deallocating data pages, resets AUTO_INCREMENT, cannot use WHERE, and is much faster but minimally logged. DROP removes the entire table (structure plus data) from the database. In short: DELETE for selective row removal, TRUNCATE to empty a whole table fast, DROP to delete the table itself.',
      hinglish:
        'DELETE rows ko ek-ek karke hataata hai aur specific rows delete karne ke liye WHERE clause use kar sakta hai; ye logged hai, transaction mein rollback ho sakta hai, aur table structure rehta hai. TRUNCATE saari rows ko jaldi hataata hai data pages deallocate karke, AUTO_INCREMENT reset karta hai, WHERE use nahi kar sakta, aur kaafi tez par minimally logged hai. DROP poori table (structure plus data) ko database se hata deta hai. Short mein: selective row removal ke liye DELETE, poori table jaldi khaali karne ke liye TRUNCATE, table ko hi delete karne ke liye DROP.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
