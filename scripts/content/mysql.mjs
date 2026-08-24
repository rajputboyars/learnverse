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
  icon: 'database',
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
      {
        title: 'User Management: GRANT, REVOKE & Privileges',
        difficulty: 'medium',
        tags: ['users', 'privileges', 'security'],
        explanation: {
          english:
            'Never let every application connect as the all-powerful root user — MySQL lets you create dedicated user accounts with exactly the privileges they need (principle of least privilege). CREATE USER makes a new account with a username and password (and optionally restricts which host it can connect from). GRANT gives specific privileges (SELECT, INSERT, UPDATE, ALL) on specific databases/tables to a user. REVOKE takes privileges away. FLUSH PRIVILEGES reloads the privilege tables so changes take effect immediately.',
          hinglish:
            'Kabhi bhi har application ko all-powerful root user ki tarah connect mat karne do — MySQL dedicated user accounts banane deta hai jinke paas exactly wahi privileges hon jo chahiye (least privilege ka principle). CREATE USER ek naya account banata hai username aur password ke saath (aur optionally restrict karta hai ki wo kis host se connect kar sakta hai). GRANT ek user ko specific databases/tables pe specific privileges (SELECT, INSERT, UPDATE, ALL) deta hai. REVOKE privileges wapas le leta hai. FLUSH PRIVILEGES privilege tables ko reload karta hai taaki changes turant apply hon.',
        },
        dailyLifeExample:
          'Root user ghar ki master-key jaisi hai — sab kuch khol sakti hai. Ek dedicated app user ek specific room ki chaabi jaisa hai — sirf usi room mein jaa sakta hai jiske liye chaabi di gayi hai. GRANT chaabi dena hai, REVOKE chaabi wapas lena.',
        codeExample:
          "-- Create a dedicated user (not root!) for an application\nCREATE USER 'blog_app'@'localhost' IDENTIFIED BY 'strong_password_here';\n\n-- Grant only what the app actually needs\nGRANT SELECT, INSERT, UPDATE, DELETE ON blog_db.* TO 'blog_app'@'localhost';\n\n-- Read-only user for a reporting dashboard\nCREATE USER 'reports'@'%' IDENTIFIED BY 'another_password';\nGRANT SELECT ON blog_db.* TO 'reports'@'%';\n\n-- Reload privilege tables so changes take effect immediately\nFLUSH PRIVILEGES;\n\n-- Take away a privilege\nREVOKE DELETE ON blog_db.* FROM 'blog_app'@'localhost';\n\n-- See what a user can do\nSHOW GRANTS FOR 'blog_app'@'localhost';",
        keyPoints: [
          'Never connect applications as root — create a dedicated user with only needed privileges',
          'CREATE USER makes an account; GRANT gives specific privileges; REVOKE removes them',
          "'localhost' vs '%' in the username restricts which host the user can connect from",
          'FLUSH PRIVILEGES reloads privilege tables so GRANT/REVOKE changes apply immediately',
          'SHOW GRANTS FOR user shows exactly what privileges an account has',
        ],
        quiz: [
          {
            question: 'Why is it bad practice for a web application to connect to MySQL as the root user?',
            options: ['root is slower', 'It violates least privilege — a bug or attack through the app could do ANYTHING to the database, not just what the app actually needs', 'root cannot run SELECT queries', 'There is no real reason, it is fine'],
            correctIndex: 1,
          },
          {
            question: "What does GRANT SELECT ON blog_db.* TO 'reports'@'%' do?",
            options: ['Deletes all data', 'Gives the reports user read-only access to all tables in blog_db, from any host', 'Creates a backup', 'Removes the reports user'],
            correctIndex: 1,
          },
          {
            question: 'What does FLUSH PRIVILEGES do?',
            options: ['Deletes all users', 'Reloads the privilege tables so recent GRANT/REVOKE changes take effect immediately', 'Backs up the database', 'Creates a new database'],
            correctIndex: 1,
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

  // ─── Engine, Indexes & Query Tuning ─────────────────────────
  {
    question: 'What is the difference between InnoDB and MyISAM?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'INNODB is the default and correct choice: it supports ACID transactions, foreign keys, row-level locking (so concurrent writes do not block each other), and crash recovery via its redo log. MYISAM has none of those — no transactions, no foreign keys, and TABLE-level locking, so one write blocks every reader. MyISAM was historically faster for read-only workloads, but InnoDB has long since caught up. There is essentially no reason to choose MyISAM for new work.',
      hinglish:
        'INNODB default aur sahi choice hai: ye ACID transactions, foreign keys, row-level locking (isliye concurrent writes ek doosre ko block nahi karte), aur apne redo log se crash recovery support karta hai. MYISAM mein inme se kuch nahi — na transactions, na foreign keys, aur TABLE-level locking, isliye ek write har reader ko rok deta hai. MyISAM historically read-only workloads ke liye tez tha, par InnoDB kab ka aage nikal chuka hai. Naye kaam ke liye MyISAM chunne ki asal mein koi wajah nahi.',
    },
  },
  {
    question: 'What is a clustered index in InnoDB?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'In InnoDB the PRIMARY KEY is the clustered index — the table rows are physically STORED in primary-key order inside the B-tree leaves. There is exactly one per table. Two consequences follow. Range scans on the primary key are very fast because rows are adjacent on disk. And every SECONDARY index stores the primary key as its pointer, so a large primary key inflates every other index — which is a strong argument for a compact key.',
      hinglish:
        'InnoDB mein PRIMARY KEY hi clustered index hai — table ki rows B-tree ke leaves ke andar physically primary-key ke order mein STORE hoti hain. Per table theek ek hota hai. Do nateeje nikalte hain. Primary key pe range scans bahut tez hain kyunki rows disk pe saath-saath hain. Aur har SECONDARY index apne pointer ki tarah primary key rakhta hai, isliye ek badi primary key har doosre index ko phula deti hai — jo ek compact key ke liye ek majboot dalil hai.',
    },
  },
  {
    question: 'Why should a primary key be small and monotonically increasing?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Because it is the clustered index, an INCREASING key means every insert appends at the end of the B-tree — no page splits, minimal fragmentation. A random key such as UUIDv4 inserts all over the tree, causing constant page splits, poor cache locality, and much slower writes. And since every secondary index carries a copy of the primary key, a 36-character UUID string costs far more storage across the whole database than a 4- or 8-byte integer. UUIDv7 is sortable and avoids most of this.',
      hinglish:
        'Kyunki ye clustered index hai, ek BADHTI key ka matlab hai har insert B-tree ke aakhir mein judta hai — na page splits, na khaas fragmentation. UUIDv4 jaisi ek random key poore tree mein insert karti hai, lagatar page splits, kharab cache locality, aur bahut slow writes banate hue. Aur kyunki har secondary index primary key ki ek copy le jaata hai, ek 36-character UUID string poore database mein ek 4 ya 8-byte integer se bahut zyada storage cost karti hai. UUIDv7 sortable hai aur iska zyadatar hissa bacha leta hai.',
    },
  },
  {
    question: 'What is a covering index?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A covering index contains EVERY column a query needs, so MySQL answers it from the index alone without reading the table rows — `EXPLAIN` shows "Using index". That removes an entire lookup step and can be several times faster. You build one by adding the selected columns to the index after the filtered and sorted ones. The trade is a wider index costing more storage and slowing writes, so cover only the queries that genuinely matter.',
      hinglish:
        'Ek covering index mein HAR wo column hota hai jo ek query ko chahiye, isliye MySQL use table rows padhe bina sirf index se jawab de deta hai — `EXPLAIN` "Using index" dikhata hai. Ye ek poora lookup step hata deta hai aur kai guna tez ho sakta hai. Tum ek aisa index filtered aur sorted columns ke baad selected columns jodkar banate ho. Trade ek chauda index hai jo zyada storage cost karta hai aur writes slow karta hai, isliye sirf un queries ko cover karo jo genuinely matter karti hain.',
    },
  },
  {
    question: 'How do you read the output of EXPLAIN?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Read `type` first: `ALL` is a full table scan and is usually the problem, while `ref`, `range`, `eq_ref`, and `const` are progressively better. Check `key` to see which index was actually chosen, and `rows` for the estimated number examined — a large number relative to what the query returns means wasted work. The `Extra` column is where the real signals live: "Using filesort" and "Using temporary" indicate MySQL could not satisfy the ordering or grouping from an index.',
      hinglish:
        'Pehle `type` padho: `ALL` ek full table scan hai aur usually problem hai, jabki `ref`, `range`, `eq_ref`, aur `const` kramash behtar hain. `key` dekho ki kaunsa index actually chuna gaya, aur `rows` mein jaanche gaye ka andaaza — query jitna lautaati hai uske muqable ek bada number matlab barbaad kaam. `Extra` column mein asli signals rehte hain: "Using filesort" aur "Using temporary" batate hain ki MySQL ordering ya grouping ek index se poori nahi kar paaya.',
    },
  },
  {
    question: 'What is the leftmost prefix rule for composite indexes?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An index on `(a, b, c)` can serve queries filtering on `a`, on `a` and `b`, or on all three — any LEFTMOST prefix — but not one filtering on `b` alone, because the index is sorted primarily by `a`. A range condition also stops the prefix: `WHERE a = 1 AND b > 5 AND c = 3` uses `a` and `b` but cannot use `c`. So column ORDER is a design decision — put equality columns before range columns.',
      hinglish:
        '`(a, b, c)` pe ek index `a` pe, `a` aur `b` pe, ya teeno pe filter karti queries serve kar sakta hai — koi bhi LEFTMOST prefix — par akele `b` pe filter karti nahi, kyunki index primarily `a` se sorted hai. Ek range condition bhi prefix rok deti hai: `WHERE a = 1 AND b > 5 AND c = 3` `a` aur `b` use karta hai par `c` nahi. Isliye column ORDER ek design decision hai — equality columns ko range columns se pehle rakho.',
    },
  },
  {
    question: 'Why might MySQL ignore an index you created?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Several reasons. Wrapping the column in a FUNCTION — `WHERE YEAR(created_at) = 2024` — prevents index use; rewrite it as a range. A type mismatch, such as comparing a string column to a number, forces an implicit conversion. A leading wildcard in `LIKE "%x"` cannot use a B-tree. Low selectivity means the optimiser judges a full scan cheaper, which is often correct. And stale statistics can mislead it, which `ANALYZE TABLE` fixes.',
      hinglish:
        'Kai wajahein. Column ko ek FUNCTION mein lapetna — `WHERE YEAR(created_at) = 2024` — index use rokta hai; ise ek range ki tarah dobara likho. Ek type mismatch, jaise ek string column ko ek number se compare karna, ek chhupa conversion majboor karta hai. `LIKE "%x"` mein ek shuruaati wildcard ek B-tree use nahi kar sakta. Kam selectivity matlab optimiser ek full scan sasta samajhta hai, jo aksar sahi hai. Aur purani statistics use bhatka sakti hain, jise `ANALYZE TABLE` theek karta hai.',
    },
  },
  {
    question: 'What are the ACID properties?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'ATOMICITY — a transaction happens completely or not at all, so a failed transfer never debits without crediting. CONSISTENCY — the database moves from one valid state to another, respecting constraints. ISOLATION — concurrent transactions do not see each other\'s partial work, controlled by the isolation level. DURABILITY — once committed, data survives a crash, which InnoDB guarantees through its redo log and `innodb_flush_log_at_trx_commit`.',
      hinglish:
        'ATOMICITY — ek transaction poora hota hai ya bilkul nahi, isliye ek fail hua transfer bina credit kiye debit nahi karta. CONSISTENCY — database ek valid state se doosri mein jaata hai, constraints maante hue. ISOLATION — concurrent transactions ek doosre ka aadha kaam nahi dekhte, jise isolation level control karta hai. DURABILITY — commit hone ke baad, data ek crash bhi jhel leta hai, jise InnoDB apne redo log aur `innodb_flush_log_at_trx_commit` se guarantee karta hai.',
    },
  },
  {
    question: 'What are the MySQL transaction isolation levels?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'READ UNCOMMITTED allows dirty reads and is essentially never used. READ COMMITTED sees only committed data but allows non-repeatable reads. REPEATABLE READ is MySQL\'s DEFAULT: it gives a consistent snapshot for the whole transaction, and InnoDB\'s gap locking prevents phantom reads too, which is stricter than the standard requires. SERIALIZABLE is fully isolated but serialises access and hurts concurrency badly. Higher isolation costs concurrency, so the default is the usual right answer.',
      hinglish:
        'READ UNCOMMITTED dirty reads allow karta hai aur asal mein kabhi use nahi hota. READ COMMITTED sirf committed data dekhta hai par non-repeatable reads allow karta hai. REPEATABLE READ MySQL ka DEFAULT hai: ye poore transaction ke liye ek consistent snapshot deta hai, aur InnoDB ka gap locking phantom reads bhi rokta hai, jo standard ki maang se sakht hai. SERIALIZABLE poori tarah alag hai par access ko ek-ek karke chalata hai aur concurrency buri tarah bigaadta hai. Zyada isolation concurrency cost karta hai, isliye default usual sahi jawab hai.',
    },
  },
  {
    question: 'What is MVCC in InnoDB?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Multi-Version Concurrency Control lets readers see a consistent SNAPSHOT without taking locks, so a long-running SELECT never blocks writers and writers never block readers. InnoDB keeps old row versions in the undo log, and each transaction sees the version valid as of its start. The practical consequence: a very long transaction prevents old versions from being purged, so the undo log grows and performance degrades — which is why you keep transactions short.',
      hinglish:
        'Multi-Version Concurrency Control readers ko bina locks liye ek consistent SNAPSHOT dekhne deta hai, isliye ek lambi chalti SELECT kabhi writers ko block nahi karti aur writers kabhi readers ko nahi. InnoDB purani row versions undo log mein rakhta hai, aur har transaction wo version dekhta hai jo uske shuru hote waqt valid tha. Vyavaharik nateeja: ek bahut lamba transaction purani versions ko purge hone se rokta hai, isliye undo log badhta hai aur performance girti hai — isiliye transactions chhote rakhte hain.',
    },
  },
  {
    question: 'What is a deadlock and how does MySQL handle it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A deadlock occurs when two transactions each hold a lock the other needs, so neither can proceed. InnoDB DETECTS this automatically and kills the transaction that has done less work, returning error 1213 to the application. Prevention: acquire locks in a CONSISTENT ORDER across all code paths, keep transactions short, and index your `WHERE` clauses so fewer rows are locked. Crucially, your application must catch 1213 and RETRY — deadlocks are normal under concurrency, not a bug to eliminate.',
      hinglish:
        'Ek deadlock tab hota hai jab do transactions mein har ek wo lock rakhta ho jo doosre ko chahiye, isliye koi aage nahi badh sakta. InnoDB ise apne aap PAKADTA hai aur us transaction ko maar deta hai jisne kam kaam kiya, application ko error 1213 lautaate hue. Prevention: saare code paths mein locks ek CONSISTENT ORDER mein lo, transactions chhote rakho, aur apne `WHERE` clauses index karo taaki kam rows lock hon. Critically, tumhare application ko 1213 pakad kar RETRY karna chahiye — concurrency mein deadlocks normal hain, mitane wala bug nahi.',
    },
  },
  {
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'INNER JOIN returns only rows with a match in BOTH tables. LEFT JOIN returns every row from the left table, filling unmatched right-side columns with NULL — which is how you find "users with no orders" using `WHERE o.id IS NULL`. The classic mistake is putting a condition on the right table in the `WHERE` clause instead of the `ON` clause, because a `WHERE r.col = x` filters out the NULL rows and silently turns the LEFT JOIN back into an INNER JOIN.',
      hinglish:
        'INNER JOIN sirf wo rows lautaata hai jinka DONO tables mein match ho. LEFT JOIN left table ki har row lautaata hai, na milte right-side columns NULL se bharte hue — jisse tum `WHERE o.id IS NULL` se "bina orders wale users" dhoondhte ho. Classic galti right table pe ek condition `ON` clause ke bajaye `WHERE` clause mein daalna hai, kyunki ek `WHERE r.col = x` NULL rows chhaan deta hai aur chupke se LEFT JOIN ko wapas ek INNER JOIN bana deta hai.',
    },
  },
  {
    question: 'What is the difference between WHERE and HAVING?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`WHERE` filters INDIVIDUAL ROWS before grouping and can use indexes. `HAVING` filters GROUPS after `GROUP BY` and can reference aggregates such as `COUNT(*) > 5`, which `WHERE` cannot. The performance implication matters: filtering in `WHERE` removes rows before the expensive grouping happens, so pushing a condition from `HAVING` into `WHERE` — whenever it does not depend on an aggregate — is a genuine and common optimisation.',
      hinglish:
        '`WHERE` grouping se pehle ALAG-ALAG ROWS chhaanta hai aur indexes use kar sakta hai. `HAVING` `GROUP BY` ke baad GROUPS chhaanta hai aur `COUNT(*) > 5` jaise aggregates reference kar sakta hai, jo `WHERE` nahi kar sakta. Performance ka matlab matter karta hai: `WHERE` mein chhaanna mehnga grouping hone se pehle rows hata deta hai, isliye ek condition ko `HAVING` se `WHERE` mein dhakelna — jab wo ek aggregate pe depend na kare — ek genuine aur common optimisation hai.',
    },
  },
  {
    question: 'Why is OFFSET pagination slow on deep pages?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`LIMIT 20 OFFSET 100000` forces MySQL to fetch and DISCARD 100,000 rows before returning 20, so cost grows linearly with page depth. It also produces duplicate or skipped rows when data changes between requests. KEYSET (cursor) pagination fixes both: remember the last row\'s sort value and use `WHERE id > :lastId ORDER BY id LIMIT 20`, which uses the index directly and stays constant-time at any depth. The trade is you cannot jump to an arbitrary page number.',
      hinglish:
        '`LIMIT 20 OFFSET 100000` MySQL ko 20 lautane se pehle 100,000 rows laakar PHENKNE pe majboor karta hai, isliye cost page ki gehraai ke saath seedhe badhti hai. Ye tab duplicate ya chhooti rows bhi banata hai jab requests ke beech data badle. KEYSET (cursor) pagination dono theek karta hai: aakhri row ki sort value yaad rakho aur `WHERE id > :lastId ORDER BY id LIMIT 20` use karo, jo index seedha use karta hai aur kisi bhi gehraai pe constant-time rehta hai. Trade ye hai ki tum kisi bhi page number pe kood nahi sakte.',
    },
  },
  {
    question: 'What is the difference between a subquery, a CTE, and a JOIN?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A JOIN combines tables row by row and is usually the fastest for combining data. A SUBQUERY nests a query inside another; a correlated subquery re-executes per outer row, which can be very slow. A CTE (`WITH`, available from MySQL 8) names a result set for readability and enables RECURSION for hierarchies. Modern MySQL often optimises these into similar plans, so choose for READABILITY first and verify with `EXPLAIN` rather than assuming one is inherently faster.',
      hinglish:
        'Ek JOIN tables ko row dar row jodta hai aur data jodne ke liye usually sabse tez hai. Ek SUBQUERY ek query ko doosri ke andar rakhta hai; ek correlated subquery per outer row dobara chalti hai, jo bahut slow ho sakti hai. Ek CTE (`WITH`, MySQL 8 se) padhne ki aasani ke liye ek result set ko naam deta hai aur hierarchies ke liye RECURSION enable karta hai. Modern MySQL inhe aksar ek jaise plans mein optimise karta hai, isliye pehle PADHNE KI AASANI se chuno aur `EXPLAIN` se jaancho, ye maan kar mat chalo ki koi swabhavik roop se tez hai.',
    },
  },
  {
    question: 'What is normalisation and when should you denormalise?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Normalisation removes redundancy by splitting data into related tables — 1NF removes repeating groups, 2NF removes partial dependencies on a composite key, 3NF removes transitive dependencies. It prevents update anomalies and keeps one fact in one place. DENORMALISE deliberately when joins have become a MEASURED bottleneck: store a comment count on a post, or copy a product name into an order line so history is preserved. The cost is keeping duplicates in sync.',
      hinglish:
        'Normalisation data ko related tables mein baant kar dohraav hataata hai — 1NF repeating groups hataata hai, 2NF ek composite key pe partial dependencies, 3NF transitive dependencies. Ye update anomalies rokta hai aur ek baat ko ek jagah rakhta hai. DENORMALISE jaan boojh kar tab karo jab joins ek MAAPA GAYA bottleneck ban jaayein: ek post pe ek comment count rakho, ya ek product naam ek order line mein copy karo taaki itihaas bacha rahe. Cost duplicates ko sync mein rakhna hai.',
    },
  },
  {
    question: 'What is the difference between CHAR and VARCHAR?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`CHAR(n)` is fixed-length: it always occupies n characters and pads with spaces, which are stripped on retrieval. `VARCHAR(n)` stores only what is used plus a length prefix of one or two bytes. Use `CHAR` for genuinely fixed values such as a two-letter country code, where it avoids the length overhead and fragmentation. Use `VARCHAR` for everything else. Note the declared length in `VARCHAR(255)` is not a storage cost, so there is no benefit in guessing small.',
      hinglish:
        '`CHAR(n)` fixed-length hai: ye hamesha n characters ghera karta hai aur spaces se bharta hai, jo laate waqt hata diye jaate hain. `VARCHAR(n)` sirf utna store karta hai jitna use hua plus ek ya do byte ka length prefix. `CHAR` un genuinely fixed values ke liye use karo jaise ek do-akshar ka country code, jahan ye length overhead aur fragmentation bachata hai. Baaki sab ke liye `VARCHAR`. Note karo `VARCHAR(255)` mein likhi length ek storage cost nahi hai, isliye chhota andaaza lagane ka koi faayda nahi.',
    },
  },
  {
    question: 'What is the difference between DATETIME and TIMESTAMP?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`TIMESTAMP` stores UTC internally and CONVERTS to the session time zone on read, takes 4 bytes, and is limited to 1970-2038. `DATETIME` stores the literal value with no time-zone conversion, takes 5 bytes, and spans years 1000-9999. For an event that happened at a real moment in time, `TIMESTAMP` (or `DATETIME` with everything explicitly in UTC) is correct. The 2038 limit is genuine, so new systems increasingly use `DATETIME` with UTC discipline.',
      hinglish:
        '`TIMESTAMP` andar UTC store karta hai aur padhte waqt session time zone mein BADALTA hai, 4 bytes leta hai, aur 1970-2038 tak seemit hai. `DATETIME` literal value bina time-zone conversion ke store karta hai, 5 bytes leta hai, aur 1000-9999 saal cover karta hai. Ek aise event ke liye jo samay ke ek asli pal pe hua, `TIMESTAMP` (ya sab kuch explicitly UTC mein rakhte hue `DATETIME`) sahi hai. 2038 ki seema asli hai, isliye naye systems badhte roop se UTC anushasan ke saath `DATETIME` use karte hain.',
    },
  },
  {
    question: 'How does NULL behave in MySQL comparisons and aggregates?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'NULL means UNKNOWN, so any comparison with it yields NULL, not true — `NULL = NULL` is not true, which is why you must use `IS NULL`. It also breaks `NOT IN` with a subquery containing NULL, which then returns no rows at all. Aggregates SKIP NULLs, so `COUNT(col)` differs from `COUNT(*)`, and `AVG` divides by the non-null count. `COALESCE` provides a default. NULL handling is one of the most common sources of subtly wrong query results.',
      hinglish:
        'NULL ka matlab ANJAAN hai, isliye uske saath koi bhi comparison NULL deta hai, true nahi — `NULL = NULL` true nahi hai, isiliye tumhe `IS NULL` use karna padta hai. Ye NULL wale subquery ke saath `NOT IN` bhi todta hai, jo phir koi row hi nahi lautaata. Aggregates NULLs SKIP karte hain, isliye `COUNT(col)` `COUNT(*)` se alag hai, aur `AVG` non-null count se divide karta hai. `COALESCE` ek default deta hai. NULL handling sookshm roop se galat query results ke sabse common sources mein se ek hai.',
    },
  },
  {
    question: 'What is the difference between UNION and UNION ALL?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`UNION` removes duplicate rows, which requires MySQL to sort or hash the entire combined result — genuinely expensive on large sets. `UNION ALL` simply concatenates and is much faster. Use `UNION ALL` by default and reach for `UNION` only when duplicates are actually possible AND unwanted. Writing `UNION` reflexively on result sets that cannot overlap is a common and easily avoided performance cost.',
      hinglish:
        '`UNION` duplicate rows hataata hai, jiske liye MySQL ko poora juda result sort ya hash karna padta hai — bade sets pe genuinely mehnga. `UNION ALL` bas jod deta hai aur bahut tez hai. Default se `UNION ALL` use karo aur `UNION` sirf tab uthao jab duplicates actually sambhav AUR anchahe hon. Aise result sets pe reflexively `UNION` likhna jo overlap kar hi nahi sakte ek common aur aasaani se bacha ja sakne wala performance cost hai.',
    },
  },
  {
    question: 'What is a foreign key and what do ON DELETE options do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A foreign key constrains a column to reference an existing row in another table, so the database itself enforces referential integrity rather than trusting application code. `ON DELETE CASCADE` deletes children with the parent — convenient but dangerous, since one delete can silently remove a great deal. `SET NULL` nulls the reference. `RESTRICT` (the default) blocks the delete. Note foreign keys require InnoDB and add a small write cost, but that is almost always worth the guarantee.',
      hinglish:
        'Ek foreign key ek column ko doosri table ki ek maujood row reference karne pe baandhta hai, isliye application code pe bharosa karne ke bajaye database khud referential integrity enforce karta hai. `ON DELETE CASCADE` children ko parent ke saath delete karta hai — suvidhajanak par khatarnak, kyunki ek delete chupke se bahut kuch hata sakta hai. `SET NULL` reference ko null kar deta hai. `RESTRICT` (default) delete rokta hai. Note karo foreign keys ko InnoDB chahiye aur wo ek chhota write cost jodte hain, par wo guarantee ke aage almost hamesha worth hai.',
    },
  },
  {
    question: 'What is the difference between a stored procedure and a function?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A PROCEDURE is invoked with `CALL`, can return multiple result sets or none, and may modify data. A FUNCTION returns a single value and can be used inside an expression such as a `SELECT` list or `WHERE` clause. Both keep logic in the database, which reduces round trips. The modern objection is that database logic is harder to version, test, and review than application code, so most teams keep business logic in the application.',
      hinglish:
        'Ek PROCEDURE `CALL` se bulaya jaata hai, kai result sets ya koi nahi lauta sakta hai, aur data badal sakta hai. Ek FUNCTION ek single value lautaata hai aur ek expression ke andar use ho sakta hai jaise ek `SELECT` list ya `WHERE` clause. Dono logic ko database mein rakhte hain, jo round trips kam karta hai. Modern aitraaz ye hai ki database logic ko version, test, aur review karna application code se mushkil hai, isliye zyadatar teams business logic application mein rakhti hain.',
    },
  },
  {
    question: 'What is a trigger and why are triggers often discouraged?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A trigger runs automatically before or after an INSERT, UPDATE, or DELETE — used for audit logs, derived columns, or enforcing a rule. They are discouraged because the behaviour is INVISIBLE from the application: a developer reading the code has no indication that an insert also writes elsewhere, which makes debugging hard. They also run inside the transaction, so a slow trigger slows every write, and cascading triggers can be genuinely difficult to reason about.',
      hinglish:
        'Ek trigger ek INSERT, UPDATE, ya DELETE se pehle ya baad apne aap chalta hai — audit logs, derived columns, ya ek niyam enforce karne ke liye. Inhe isliye rokaa jaata hai kyunki behaviour application se ANDEKHA hai: code padhta ek developer ko koi ishaara nahi hota ki ek insert kahin aur bhi likhta hai, jo debugging mushkil banata hai. Wo transaction ke andar bhi chalte hain, isliye ek slow trigger har write slow karta hai, aur cascading triggers ko samajhna genuinely mushkil ho sakta hai.',
    },
  },
  {
    question: 'What is a view and is it faster than the underlying query?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A view is a stored SELECT statement given a name. It aids readability, encapsulates a complex join, and can restrict which columns a user sees. It is NOT faster — MySQL views are not materialised, so the underlying query runs every time. In fact a view can be slower if the optimiser cannot merge it into the outer query and must materialise it into a temporary table. MySQL has no materialised views; you emulate them with a summary table refreshed on a schedule.',
      hinglish:
        'Ek view ek naam diya gaya stored SELECT statement hai. Ye padhne mein madad karta hai, ek complex join lapetta hai, aur seemit kar sakta hai ki ek user kaunse columns dekhe. Ye TEZ NAHI hai — MySQL views materialise nahi hote, isliye underlying query har baar chalti hai. Balki ek view slow ho sakta hai agar optimiser use outer query mein merge na kar paaye aur use ek temporary table mein materialise karna pade. MySQL mein materialised views nahi hain; tum unki nakal ek schedule pe refresh hoti summary table se karte ho.',
    },
  },
  {
    question: 'How does MySQL replication work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The source writes changes to a BINARY LOG; each replica has an I/O thread copying that log and an SQL thread applying it. Replication is ASYNCHRONOUS by default, so a replica can lag — which is why a user who writes and immediately reads may not see their own change. Semi-synchronous replication waits for one replica to acknowledge, reducing data loss on failover at some latency cost. Use replicas for reads, backups, and failover, never assuming they are perfectly current.',
      hinglish:
        'Source changes ko ek BINARY LOG mein likhta hai; har replica ka ek I/O thread wo log copy karta hai aur ek SQL thread use lagata hai. Replication default se ASYNCHRONOUS hai, isliye ek replica peeche reh sakta hai — isiliye ek user jo likh kar turant padhta hai wo apna hi change na dekhe. Semi-synchronous replication ek replica ke acknowledge karne ka intezaar karta hai, kuch latency cost pe failover pe data loss kam karte hue. Replicas ko reads, backups, aur failover ke liye use karo, kabhi ye maan kar nahi ki wo bilkul current hain.',
    },
  },
  {
    question: 'What is replication lag and how do you handle it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Lag is the delay between a write committing on the source and appearing on a replica, caused by network delay, a slow single-threaded applier, or a long-running transaction. Handle it by routing READ-AFTER-WRITE queries to the source, using a sticky window after a write, or having the application wait for a known binlog position. Monitor `Seconds_Behind_Master`. And design the UI so a small delay is acceptable, since eliminating lag entirely is not realistic.',
      hinglish:
        'Lag source pe ek write commit hone aur ek replica pe dikhne ke beech ki deri hai, jo network deri, ek slow single-threaded applier, ya ek lambe chalte transaction se hoti hai. Ise READ-AFTER-WRITE queries ko source pe bhej kar, ek write ke baad ek sticky window use karke, ya application ko ek known binlog position ka intezaar karwa kar sambhalo. `Seconds_Behind_Master` monitor karo. Aur UI ko aise design karo ki ek chhoti deri sweekar ho, kyunki lag poori tarah mitana vaastavik nahi hai.',
    },
  },
  {
    question: 'What is the InnoDB buffer pool?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The buffer pool caches table data and index pages in memory, so reads are served without touching disk and writes are batched. It is by far the most important MySQL tuning parameter — `innodb_buffer_pool_size` is typically set to 60-80% of RAM on a dedicated server. If your working set fits in it, performance is excellent; once it does not, MySQL starts reading from disk and throughput falls sharply. Most "MySQL suddenly got slow" incidents trace back to this.',
      hinglish:
        'Buffer pool table data aur index pages memory mein cache karta hai, isliye reads disk chhue bina serve hoti hain aur writes batch hoti hain. Ye kaafi aage tak sabse zaroori MySQL tuning parameter hai — ek dedicated server pe `innodb_buffer_pool_size` typically RAM ka 60-80% set hota hai. Agar tumhara working set usme fit hota hai, performance behtareen hai; jab nahi hota, MySQL disk se padhna shuru karta hai aur throughput tezi se girta hai. Zyadatar "MySQL achanak slow ho gaya" ghatnaayein isi pe pahunchti hain.',
    },
  },
  {
    question: 'What is the slow query log and how do you use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'It records queries exceeding `long_query_time`, and optionally those not using an index. It is the starting point for real optimisation, because it tells you what is ACTUALLY slow rather than what you assume is. Analyse it with `pt-query-digest` or `mysqldumpslow`, which aggregate by query pattern — a query taking 50ms but running ten thousand times a minute often matters more than a single 5-second report nobody runs.',
      hinglish:
        'Ye `long_query_time` se zyada lene wali queries record karta hai, aur optionally wo jo index use nahi karti. Ye asli optimisation ki shuruaat hai, kyunki ye batata hai ki ACTUALLY kya slow hai, wo nahi jo tum maan lete ho. Ise `pt-query-digest` ya `mysqldumpslow` se dekho, jo query pattern se jodte hain — 50ms leti par ek minute mein das hazaar baar chalti ek query aksar us ek 5-second report se zyada matter karti hai jo koi chalata hi nahi.',
    },
  },
  {
    question: 'What is the difference between LIKE and FULLTEXT search?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`LIKE "%term%"` scans every row because a leading wildcard cannot use a B-tree index — fine on a small table, unusable on a large one. FULLTEXT indexes tokenise text into words and support `MATCH ... AGAINST` with relevance ranking, boolean operators, and stopwords. It is dramatically faster for text search. For serious requirements — fuzzy matching, faceting, multilingual analysis — a dedicated engine such as Elasticsearch or Meilisearch is the better answer.',
      hinglish:
        '`LIKE "%term%"` har row scan karta hai kyunki ek shuruaati wildcard ek B-tree index use nahi kar sakta — ek chhoti table pe theek, ek badi pe bekaar. FULLTEXT indexes text ko words mein todte hain aur relevance ranking, boolean operators, aur stopwords ke saath `MATCH ... AGAINST` support karte hain. Text search ke liye ye dramatically tez hai. Serious zarooraton ke liye — fuzzy matching, faceting, multilingual analysis — Elasticsearch ya Meilisearch jaisa ek dedicated engine behtar jawab hai.',
    },
  },
  {
    question: 'What is the JSON column type in MySQL and when should you use it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'MySQL 5.7 added a native JSON type with validation, efficient binary storage, and path operators such as `->>`. You can index a JSON path via a GENERATED COLUMN. Use it for genuinely schemaless data — user preferences, third-party payloads, sparse attributes. Do NOT use it for data you filter, join, or aggregate on regularly, because a proper column with a real index is faster, self-documenting, and constrained by the database rather than by hope.',
      hinglish:
        'MySQL 5.7 ne ek native JSON type joda validation, efficient binary storage, aur `->>` jaise path operators ke saath. Tum ek JSON path ko ek GENERATED COLUMN se index kar sakte ho. Ise genuinely schemaless data ke liye use karo — user preferences, third-party payloads, sparse attributes. Ise us data ke liye use MAT karo jispe tum regularly filter, join, ya aggregate karte ho, kyunki ek asli index wala theek column tez, khud-batata, aur ummeed ke bajaye database se bandha hota hai.',
    },
  },
  {
    question: 'How do you take and restore a MySQL backup?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`mysqldump` produces a portable logical backup — use `--single-transaction` on InnoDB so it does not lock tables — but it is slow to restore on large databases. Percona XtraBackup takes a physical hot backup that restores far faster. Combine either with BINARY LOGS to enable point-in-time recovery. The essential discipline is testing the RESTORE regularly on real data: an untested backup is an assumption, and restore failures are discovered at the worst possible moment.',
      hinglish:
        '`mysqldump` ek portable logical backup banata hai — InnoDB pe `--single-transaction` use karo taaki ye tables lock na kare — par bade databases pe restore slow hai. Percona XtraBackup ek physical hot backup leta hai jo bahut tez restore hota hai. Kisi ko bhi BINARY LOGS ke saath jodo taaki point-in-time recovery ho. Zaroori anushasan asli data pe RESTORE ko regularly test karna hai: ek bina test kiya backup ek assumption hai, aur restore failures sabse bure sambhav pal pe pata chalte hain.',
    },
  },
  {
    question: 'What is the difference between DISTINCT and GROUP BY?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Both eliminate duplicates and often produce identical plans. `DISTINCT` simply removes duplicate rows from a result. `GROUP BY` collapses rows into groups and, crucially, lets you apply AGGREGATES per group. So use `DISTINCT` when you only want unique values and `GROUP BY` when you also want a count, sum, or average. Note that `SELECT DISTINCT` combined with `ORDER BY` on a column not selected is an error, which surprises people.',
      hinglish:
        'Dono duplicates hataate hain aur aksar ek jaise plans banate hain. `DISTINCT` bas ek result se duplicate rows hataata hai. `GROUP BY` rows ko groups mein samet-ta hai aur, critically, tumhe per group AGGREGATES lagane deta hai. Isliye `DISTINCT` tab use karo jab sirf unique values chahiye aur `GROUP BY` jab ek count, sum, ya average bhi chahiye. Note karo ki `SELECT DISTINCT` ko ek aise column pe `ORDER BY` ke saath jodna jo select nahi hua ek error hai, jo logon ko chaunkata hai.',
    },
  },
  {
    question: 'What are window functions and how do they differ from GROUP BY?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A window function computes across a set of rows related to the current one WITHOUT collapsing them, so each input row still appears in the output alongside its aggregate. `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)` ranks within each department while keeping every row. `GROUP BY` reduces many rows to one. Window functions arrived in MySQL 8 and make "top N per group" and running totals straightforward, which previously required awkward self-joins.',
      hinglish:
        'Ek window function current row se judi rows ke ek set pe compute karta hai BINA unhe samete, isliye har input row apne aggregate ke saath output mein rehti hai. `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)` har department ke andar rank deta hai jabki har row rehti hai. `GROUP BY` bahut rows ko ek mein kam kar deta hai. Window functions MySQL 8 mein aaye aur "per group top N" aur running totals ko seedha bana dete hain, jinke liye pehle ajeeb self-joins chahiye the.',
    },
  },
  {
    question: 'What is the difference between AUTO_INCREMENT and a UUID primary key?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'AUTO_INCREMENT is compact, sequential, and ideal for the clustered index, but it leaks how many records exist, cannot be generated by the client, and collides when merging data from multiple sources. A UUID is globally unique and client-generatable, but UUIDv4 is random, which fragments the clustered index and bloats every secondary index. The practical compromises are storing UUIDs as `BINARY(16)`, or using UUIDv7, which is time-ordered and keeps inserts sequential.',
      hinglish:
        'AUTO_INCREMENT compact, kramik, aur clustered index ke liye ideal hai, par ye batata hai ki kitne records hain, client se generate nahi ho sakta, aur kai sources ka data milaate waqt takraata hai. Ek UUID globally unique aur client-generatable hai, par UUIDv4 random hai, jo clustered index ko todta hai aur har secondary index ko phulaata hai. Vyavaharik samjhaute UUIDs ko `BINARY(16)` mein rakhna, ya UUIDv7 use karna hai, jo samay se order hai aur inserts ko kramik rakhta hai.',
    },
  },
  {
    question: 'How do you safely alter a large table in production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A naive `ALTER TABLE` on a huge table can lock it for a long time and take the application down. MySQL 8 supports INSTANT and INPLACE algorithms for many changes, so check which applies before assuming. For the rest, use `pt-online-schema-change` or `gh-ost`, which build a shadow table, copy rows in batches, keep it in sync with triggers or the binlog, then swap atomically. Always run it on a replica or staging copy first and monitor replication lag.',
      hinglish:
        'Ek bade table pe ek naive `ALTER TABLE` use lambe samay lock karke application gira sakta hai. MySQL 8 bahut changes ke liye INSTANT aur INPLACE algorithms support karta hai, isliye maan lene se pehle check karo ki kaunsa lagta hai. Baaki ke liye, `pt-online-schema-change` ya `gh-ost` use karo, jo ek shadow table banate hain, rows batches mein copy karte hain, use triggers ya binlog se sync mein rakhte hain, phir atomically badal dete hain. Ise hamesha pehle ek replica ya staging copy pe chalao aur replication lag monitor karo.',
    },
  },
  {
    question: 'What is connection pooling and why does MySQL need it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Opening a MySQL connection requires a TCP handshake and authentication, which is expensive to repeat per request. A pool keeps connections open and hands them out, so requests reuse them. MySQL also has a hard `max_connections` limit and each connection costs memory, so uncontrolled connection creation exhausts the server — a classic outage where the database is fine but refuses new connections. In serverless environments, a proxy such as ProxySQL or RDS Proxy handles pooling externally.',
      hinglish:
        'Ek MySQL connection kholne ke liye ek TCP handshake aur authentication chahiye, jo per request dohraana mehnga hai. Ek pool connections khule rakhta hai aur baant-ta hai, isliye requests unhe dobara use karti hain. MySQL mein ek sakht `max_connections` seema bhi hai aur har connection memory leta hai, isliye bina control connection banana server khatam kar deta hai — ek classic outage jahan database theek hai par naye connections mana kar deta hai. Serverless environments mein, ProxySQL ya RDS Proxy jaisa ek proxy pooling bahar se sambhalta hai.',
    },
  },
  {
    question: 'What is the difference between horizontal and vertical partitioning in MySQL?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'HORIZONTAL partitioning splits ROWS across partitions by a key — typically by date range, so old data sits in its own partition and can be dropped instantly rather than deleted row by row. VERTICAL partitioning splits COLUMNS into separate tables, moving rarely-read large columns such as a text blob out of the hot table so more useful rows fit in the buffer pool. Note MySQL partitioning is within one server; splitting across servers is sharding, which the application must handle.',
      hinglish:
        'HORIZONTAL partitioning ROWS ko ek key se partitions mein baantta hai — typically date range se, isliye purana data apne partition mein baithta hai aur row dar row delete karne ke bajaye turant giraya ja sakta hai. VERTICAL partitioning COLUMNS ko alag tables mein baantta hai, kam padhe jaate bade columns jaise ek text blob ko hot table se bahar le jaate hue taaki buffer pool mein zyada useful rows aayein. Note karo MySQL partitioning ek server ke andar hai; servers ke across baantna sharding hai, jise application ko sambhalna padta hai.',
    },
  },
  {
    question: 'What is SQL injection and how do prepared statements stop it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Injection happens when user input is concatenated into a query string, so input like `\' OR 1=1--` changes the query\'s STRUCTURE rather than supplying a value. A prepared statement sends the structure first with placeholders and the values separately, so by the time values arrive the plan is fixed and they can only ever be treated as DATA. Escaping is a weaker fallback that depends on getting the character set and every call site right. Never build SQL by concatenation.',
      hinglish:
        'Injection tab hota hai jab user input ek query string mein joda jaaye, isliye `\' OR 1=1--` jaisa input query ka DHAANCHA badal deta hai, ek value dene ke bajaye. Ek prepared statement pehle dhaancha placeholders ke saath bhejta hai aur values alag se, isliye values aane tak plan tay ho chuka hota hai aur unhe kabhi sirf DATA hi maana ja sakta hai. Escaping ek kamzor fallback hai jo character set aur har call site sahi karne pe depend karta hai. SQL kabhi jod kar mat banao.',
    },
  },
  {
    question: 'How do you find and fix a slow query?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Find it in the slow query log or performance schema rather than guessing. Run `EXPLAIN` and check for a full scan, a missing index, or "Using filesort". Then fix in order of impact: add or reorder an index matching the filter and sort, select only needed columns so a covering index becomes possible, remove functions wrapping indexed columns, replace deep `OFFSET` with keyset pagination, and reduce the rows examined. Re-measure afterwards — assumed optimisations are frequently wrong.',
      hinglish:
        'Ise andaaza lagane ke bajaye slow query log ya performance schema mein dhoondho. `EXPLAIN` chalao aur ek full scan, ek missing index, ya "Using filesort" dekho. Phir asar ke kram mein theek karo: filter aur sort se milta ek index jodo ya dobara order karo, sirf zaroori columns select karo taaki ek covering index sambhav ho, indexed columns ko lapetne wale functions hatao, gehre `OFFSET` ko keyset pagination se badlo, aur jaanchi gayi rows kam karo. Baad mein dobara maapo — maani gayi optimisations aksar galat hoti hain.',
    },
  },
  {
    question: 'When should you use MySQL versus PostgreSQL?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'MYSQL is simpler to operate, extremely well supported by managed hosting and shared hosts, and excellent for read-heavy web workloads — it is the default in the PHP and WordPress ecosystems. POSTGRESQL has a richer type system, stronger standards compliance, better handling of complex queries and CTEs, native support for arrays, JSONB, and full-text search, plus extensions such as PostGIS. For a new greenfield application Postgres is often the stronger default; for an existing MySQL estate the migration rarely pays for itself.',
      hinglish:
        'MYSQL chalane mein simpler hai, managed hosting aur shared hosts se bahut achhe se support hai, aur read-heavy web workloads ke liye behtareen — ye PHP aur WordPress ecosystems mein default hai. POSTGRESQL ka type system zyada rich hai, standards compliance majboot, complex queries aur CTEs ki handling behtar, arrays, JSONB, aur full-text search ka native support, plus PostGIS jaise extensions. Ek naye greenfield application ke liye Postgres aksar majboot default hai; ek maujood MySQL estate ke liye migration rarely apna cost nikaalti hai.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
