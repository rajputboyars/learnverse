// SQL curriculum — beginner -> intermediate -> advanced.
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
  title: 'SQL',
  slug: 'sql',
  description:
    'Databases se baat karo — SELECT, JOIN, GROUP BY aur queries. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: 'database',
  tags: ['sql', 'database', 'query', 'rdbms'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 16,
};

const beginner = [
  {
    title: 'Database Basics',
    level: 'beginner',
    description: 'Relational database kya hai, tables/rows/columns aur SQL ki kahani.',
    concepts: [
      {
        title: 'The Story of SQL — What, Why & How',
        difficulty: 'easy',
        tags: ['intro', 'story', 'basics'],
        explanation: {
          english:
            'Imagine Sharma ji, a kirana shop owner in Delhi. For years he tracked his stock in thick paper notebooks — one for inventory, one for udhaar (credit), one for daily sales. 📒 When a customer asked "kitne packets of Parle-G bache hain?", he had to flip through pages. When he wanted to know which item sold most last month, he was stuck for hours. The notebooks could not answer questions quickly, two people could not write at once, and one spilled cup of chai could destroy a year of records.\n\nThis is the problem databases solve. A relational database stores data in neat tables — like very smart, connected spreadsheets — where each table holds one kind of thing (products, customers, sales). The data is structured, reliable, and never lost to a chai accident.\n\nSo WHAT is SQL? SQL (Structured Query Language) is the language you use to talk to a relational database. You do not flip pages — you ask a question in SQL and the database answers instantly.\n\nWHY does it exist? Because businesses need to store huge amounts of data and ask precise questions: "Which 10 customers spent the most?", "How many orders came from Mumbai today?". SQL makes querying structured, fast, and reliable, even across millions of rows.\n\nHOW does it work? You write a query like SELECT name FROM products WHERE stock < 10. The database engine reads your request, finds the matching rows, and returns the answer. You describe WHAT you want; the engine figures out HOW to fetch it. That is the magic of SQL — Sharma ji finally gets his answer in milliseconds. 🚀',
          hinglish:
            'Socho Sharma ji, Delhi ke ek kirana shop owner. Saalon se woh apna stock moti-moti paper notebooks mein likhte the — ek inventory ke liye, ek udhaar ke liye, ek daily sales ke liye. 📒 Jab koi customer poochta "kitne packets Parle-G bache hain?", toh unhe pages palatne padte the. Jab unhe jaanna hota ki pichle mahine kaun sa item sabse zyada bika, toh ghanton lag jaate the. Notebooks jaldi jawab nahi de sakte the, do log ek saath nahi likh sakte the, aur ek girne wali chai ek saal ka record barbaad kar sakti thi.\n\nYahi problem databases solve karte hain. Ek relational database data ko saaf-suthri tables mein store karta hai — bahut smart aur connected spreadsheets jaisi — jahan har table ek hi tarah ki cheez rakhta hai (products, customers, sales). Data structured hota hai, reliable hota hai, aur chai accident mein kabhi nahi khota.\n\nToh SQL hai KYA? SQL (Structured Query Language) woh language hai jisse hum relational database se baat karte hain. Tum pages nahi palatte — tum SQL mein ek sawaal poochte ho aur database turant jawab deta hai.\n\nYe exist KYUN karta hai? Kyunki businesses ko bahut saara data store karna hota hai aur precise sawaal poochne hote hain: "Kaun se 10 customers ne sabse zyada kharch kiya?", "Aaj Mumbai se kitne orders aaye?". SQL querying ko structured, fast aur reliable banata hai, chahe millions rows hon.\n\nKAISE kaam karta hai? Tum ek query likhte ho jaise SELECT name FROM products WHERE stock < 10. Database engine tumhara request padhta hai, matching rows dhoondhta hai, aur jawab wapas deta hai. Tum batate ho ki KYA chahiye; engine khud sochta hai ki KAISE laana hai. Yahi SQL ka jaadu hai — Sharma ji ko aakhirkaar jawab milliseconds mein mil jaata hai. 🚀',
        },
        dailyLifeExample:
          'Sharma ji ki purani notebook vs ek database: notebook mein "Parle-G kitne bache?" poochne pe pages palatna padta hai. Database mein bas ek query likho aur jawab turant — chahe 10 items hon ya 10 lakh.',
        codeExample:
          '-- A simple question to a database\n-- "Mujhe un products ke naam do jinka stock 10 se kam hai"\nSELECT name, stock\nFROM products\nWHERE stock < 10;\n\n-- The database reads this and instantly returns matching rows.\n-- You said WHAT you want; the engine handled HOW to find it.',
        keyPoints: [
          'A relational database stores data in connected tables',
          'SQL is the language to ask questions of that data',
          'You describe WHAT you want; the engine fetches it',
          'Structured, reliable, and fast even over millions of rows',
        ],
        quiz: [
          {
            question: 'What does SQL stand for?',
            options: [
              'Simple Query Logic',
              'Structured Query Language',
              'Sequential Query Loader',
              'Stored Query Link',
            ],
            correctIndex: 1,
          },
          {
            question: 'In SQL, you mainly describe...',
            options: [
              'How the database should loop over data',
              'What data you want; the engine decides how to fetch it',
              'Which CPU core to use',
              'The exact disk blocks to read',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is SQL and what is it used for?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'SQL (Structured Query Language) is the standard language for managing and querying data in relational databases. It is used to create tables, insert/update/delete records, and most importantly to retrieve data with queries. It is declarative — you specify what data you want, and the database engine determines the most efficient way to get it.',
              hinglish:
                'SQL (Structured Query Language) relational databases mein data manage aur query karne ki standard language hai. Iska use tables banane, records insert/update/delete karne, aur sabse important data retrieve karne ke liye hota hai. Ye declarative hai — tum batate ho ki kaunsa data chahiye, aur database engine sabse efficient tareeka khud nikalta hai.',
            },
          },
        ],
      },
      {
        title: 'Tables, Rows and Columns',
        difficulty: 'easy',
        tags: ['tables', 'schema', 'basics'],
        explanation: {
          english:
            'A relational database organizes data into tables. Each table represents one entity (e.g. students, products). Columns define the fields and their data types (id INT, name VARCHAR, price DECIMAL). Rows are the actual records — one row per item. A primary key column uniquely identifies each row.',
          hinglish:
            'Relational database data ko tables mein organize karta hai. Har table ek entity represent karta hai (jaise students, products). Columns fields aur unke data types define karte hain (id INT, name VARCHAR, price DECIMAL). Rows actual records hote hain — har item ke liye ek row. Ek primary key column har row ko uniquely identify karta hai.',
        },
        dailyLifeExample:
          'Ek school register socho: table register hai, har column ek heading hai (Roll No, Naam, Marks), aur har row ek student ki entry hai. Roll No primary key hai — do students ka same Roll No nahi ho sakta.',
        codeExample:
          '-- A "students" table\n-- Columns:  id   | name        | city     | marks\n-- Row 1:    1    | Aarav       | Pune     | 88\n-- Row 2:    2    | Priya       | Jaipur   | 92\n-- Row 3:    3    | Rohan       | Kolkata  | 75\n\n-- Look at the whole table\nSELECT * FROM students;\n\n-- id is the PRIMARY KEY: it uniquely identifies each row.',
        keyPoints: [
          'Table = one entity (students, products, orders)',
          'Columns = fields with data types',
          'Rows = individual records',
          'Primary key uniquely identifies each row',
        ],
        quiz: [
          {
            question: 'In a relational table, what does a single row represent?',
            options: [
              'A column heading',
              'One record/entry of the entity',
              'The data type of a field',
              'The whole database',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the role of a primary key?',
            options: [
              'It stores the largest value',
              'It uniquely identifies each row in a table',
              'It encrypts the table',
              'It sorts the table automatically',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a row and a column in a table?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'A column defines a field with a fixed data type and applies to every record (e.g. "name" is text for all rows). A row is a single record — one complete set of values across all columns (e.g. one student). Columns describe the structure; rows hold the actual data.',
              hinglish:
                'Column ek field define karta hai jiska data type fixed hota hai aur har record pe apply hota hai (jaise "name" har row ke liye text hai). Row ek single record hai — saare columns ke values ka ek complete set (jaise ek student). Columns structure batate hain; rows actual data rakhte hain.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Querying Data',
    level: 'beginner',
    description: 'SELECT, WHERE, ORDER BY, LIMIT aur DISTINCT se data nikalna.',
    concepts: [
      {
        title: 'SELECT and WHERE',
        difficulty: 'easy',
        tags: ['select', 'where', 'query'],
        explanation: {
          english:
            'SELECT retrieves data from a table. You list the columns you want (or * for all), then FROM the table. WHERE filters rows to only those matching a condition. Conditions use operators like =, <>, >, <, >=, <=, and can be combined with AND / OR.',
          hinglish:
            'SELECT table se data nikalta hai. Tum un columns ko list karte ho jo chahiye (ya * sabke liye), phir FROM table. WHERE rows ko filter karta hai sirf un par jo condition match karein. Conditions =, <>, >, <, >=, <= jaise operators use karti hain, aur AND / OR se combine ho sakti hain.',
        },
        dailyLifeExample:
          'Sabzi mandi mein bolna "mujhe sirf 50 rupaye se sasti sabzi dikhao" — ye WHERE filter hai. "Naam aur daam batao" — ye SELECT columns hain.',
        codeExample:
          '-- Get name and city of all students\nSELECT name, city FROM students;\n\n-- Only students who scored above 80\nSELECT name, marks\nFROM students\nWHERE marks > 80;\n\n-- Combine conditions with AND / OR\nSELECT name\nFROM students\nWHERE city = \'Pune\' AND marks >= 85;',
        keyPoints: [
          'SELECT chooses columns; * means all columns',
          'FROM names the table',
          'WHERE filters which rows are returned',
          'Combine conditions with AND / OR',
        ],
        quiz: [
          {
            question: 'Which clause filters rows based on a condition?',
            options: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
            correctIndex: 2,
          },
          {
            question: 'What does SELECT * FROM products return?',
            options: [
              'Only the first column of products',
              'All columns of all rows in products',
              'The number of products',
              'Only unique products',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between SELECT * and selecting specific columns?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'SELECT * returns every column, which is convenient but can fetch unnecessary data, hurt performance, and break code if the schema changes. Selecting specific columns (SELECT name, price) is clearer, transfers less data, and is more maintainable in production code.',
              hinglish:
                'SELECT * har column return karta hai, jo convenient hai par unnecessary data fetch kar sakta hai, performance kharab kar sakta hai, aur schema change hone par code tod sakta hai. Specific columns choose karna (SELECT name, price) clearer hota hai, kam data transfer karta hai, aur production code mein zyada maintainable hota hai.',
            },
          },
        ],
      },
      {
        title: 'ORDER BY, LIMIT and DISTINCT',
        difficulty: 'easy',
        tags: ['order-by', 'limit', 'distinct'],
        explanation: {
          english:
            'ORDER BY sorts the result by one or more columns, ascending (ASC, default) or descending (DESC). LIMIT restricts how many rows come back — useful for top-N queries. DISTINCT removes duplicate rows so you get only unique values.',
          hinglish:
            'ORDER BY result ko ek ya zyada columns se sort karta hai, ascending (ASC, default) ya descending (DESC). LIMIT batata hai kitni rows wapas aayein — top-N queries ke liye useful. DISTINCT duplicate rows hata deta hai taaki sirf unique values milein.',
        },
        dailyLifeExample:
          'Cricket scoreboard socho: "top 3 run-scorers dikhao" — ORDER BY runs DESC LIMIT 3. "Kaun-kaun se shehron se players hain (bina repeat)?" — DISTINCT city.',
        codeExample:
          '-- Sort students by marks, highest first\nSELECT name, marks\nFROM students\nORDER BY marks DESC;\n\n-- Top 3 scorers only\nSELECT name, marks\nFROM students\nORDER BY marks DESC\nLIMIT 3;\n\n-- Unique list of cities\nSELECT DISTINCT city\nFROM students;',
        keyPoints: [
          'ORDER BY sorts results (ASC default, DESC for reverse)',
          'LIMIT caps the number of rows returned',
          'ORDER BY + LIMIT = top-N queries',
          'DISTINCT removes duplicate rows',
        ],
        quiz: [
          {
            question: 'How do you sort results from highest to lowest marks?',
            options: [
              'ORDER BY marks ASC',
              'ORDER BY marks DESC',
              'SORT marks DOWN',
              'LIMIT marks',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which keyword removes duplicate values from a result?',
            options: ['UNIQUE', 'DISTINCT', 'LIMIT', 'GROUP'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you find the top 5 highest-paid employees?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'Sort by salary in descending order and limit the result: SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5. ORDER BY DESC puts the highest salaries first, and LIMIT 5 returns only the top five rows.',
              hinglish:
                'Salary ko descending order mein sort karo aur result limit karo: SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5. ORDER BY DESC sabse zyada salary pehle laata hai, aur LIMIT 5 sirf top paanch rows return karta hai.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Filtering & Functions',
    level: 'intermediate',
    description: 'LIKE, IN, BETWEEN, aggregate functions, GROUP BY aur HAVING.',
    concepts: [
      {
        title: 'Operators: LIKE, IN, BETWEEN',
        difficulty: 'medium',
        tags: ['operators', 'like', 'in', 'between'],
        explanation: {
          english:
            'Beyond basic comparisons, SQL has handy operators. LIKE matches text patterns with wildcards (% for any sequence, _ for a single character). IN checks if a value is in a list. BETWEEN matches a range (inclusive). NULL values need IS NULL / IS NOT NULL, not =.',
          hinglish:
            'Basic comparisons ke alawa, SQL ke paas handy operators hain. LIKE text patterns match karta hai wildcards ke saath (% kisi bhi sequence ke liye, _ ek single character ke liye). IN check karta hai ki value ek list mein hai ya nahi. BETWEEN ek range match karta hai (inclusive). NULL values ke liye IS NULL / IS NOT NULL use karo, = nahi.',
        },
        dailyLifeExample:
          'Contact list mein "A se shuru hone wale naam" dhoondhna LIKE \'A%\' hai. "Pune, Mumbai ya Delhi wale" IN hai. "20 se 30 saal ke log" BETWEEN hai.',
        codeExample:
          '-- Names starting with A\nSELECT name FROM students WHERE name LIKE \'A%\';\n\n-- Students from specific cities\nSELECT name FROM students\nWHERE city IN (\'Pune\', \'Mumbai\', \'Delhi\');\n\n-- Marks in a range (inclusive)\nSELECT name FROM students\nWHERE marks BETWEEN 70 AND 90;\n\n-- Rows where city is missing\nSELECT name FROM students WHERE city IS NULL;',
        keyPoints: [
          'LIKE matches patterns: % = any sequence, _ = one char',
          'IN checks membership in a list',
          'BETWEEN matches an inclusive range',
          'Use IS NULL / IS NOT NULL for NULLs, never = NULL',
        ],
        quiz: [
          {
            question: 'Which wildcard in LIKE matches any sequence of characters?',
            options: ['_', '*', '%', '#'],
            correctIndex: 2,
          },
          {
            question: 'How do you check for missing (NULL) values?',
            options: [
              'WHERE col = NULL',
              'WHERE col IS NULL',
              'WHERE col == NULL',
              'WHERE col EMPTY',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why can you not use = to compare with NULL in SQL?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'NULL represents an unknown/missing value, not a normal value. Any comparison with NULL using = or <> yields UNKNOWN (not TRUE), so the row is excluded. You must use IS NULL or IS NOT NULL, which are designed specifically to test for the absence of a value.',
              hinglish:
                'NULL ek unknown/missing value represent karta hai, normal value nahi. NULL ke saath = ya <> se koi bhi comparison UNKNOWN deta hai (TRUE nahi), isliye row exclude ho jaati hai. Tumhe IS NULL ya IS NOT NULL use karna padta hai, jo specifically value ki absence test karne ke liye bane hain.',
            },
          },
        ],
      },
      {
        title: 'Aggregates, GROUP BY and HAVING',
        difficulty: 'medium',
        tags: ['aggregate', 'group-by', 'having', 'count', 'sum'],
        explanation: {
          english:
            'Aggregate functions summarize many rows into one value: COUNT, SUM, AVG, MIN, MAX. GROUP BY splits rows into groups (e.g. per city) and applies the aggregate to each group. WHERE filters rows BEFORE grouping; HAVING filters the groups AFTER aggregation.',
          hinglish:
            'Aggregate functions kai rows ko ek value mein summarize karte hain: COUNT, SUM, AVG, MIN, MAX. GROUP BY rows ko groups mein todta hai (jaise per city) aur har group pe aggregate apply karta hai. WHERE grouping se PEHLE rows filter karta hai; HAVING aggregation ke BAAD groups filter karta hai.',
        },
        dailyLifeExample:
          'Class ka result socho: "har shehar ke kitne students hain?" COUNT + GROUP BY city hai. "Sirf woh shehar dikhao jahan average marks 80 se zyada hai" HAVING AVG(marks) > 80 hai.',
        codeExample:
          '-- Total number of students\nSELECT COUNT(*) AS total FROM students;\n\n-- Average marks per city\nSELECT city, AVG(marks) AS avg_marks\nFROM students\nGROUP BY city;\n\n-- Only cities with more than 5 students\nSELECT city, COUNT(*) AS num_students\nFROM students\nGROUP BY city\nHAVING COUNT(*) > 5;',
        keyPoints: [
          'COUNT, SUM, AVG, MIN, MAX summarize rows',
          'GROUP BY creates buckets to aggregate within',
          'WHERE filters rows before grouping',
          'HAVING filters groups after aggregation',
        ],
        quiz: [
          {
            question: 'Which clause filters groups AFTER aggregation?',
            options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
            correctIndex: 1,
          },
          {
            question: 'Which function returns the number of rows?',
            options: ['SUM()', 'AVG()', 'COUNT()', 'MAX()'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between WHERE and HAVING?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'WHERE filters individual rows before any grouping happens and cannot use aggregate functions. HAVING filters groups after GROUP BY has aggregated them and CAN use aggregates like COUNT() or AVG(). So you use WHERE to limit which rows enter the groups, and HAVING to limit which resulting groups are kept.',
              hinglish:
                'WHERE individual rows ko grouping se pehle filter karta hai aur aggregate functions use nahi kar sakta. HAVING groups ko GROUP BY ke aggregate karne ke baad filter karta hai aur COUNT() ya AVG() jaise aggregates use kar SAKTA hai. Toh WHERE se control karte ho ki kaunsi rows groups mein jaayein, aur HAVING se kaunse resulting groups rakhe jaayein.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Joins',
    level: 'intermediate',
    description: 'INNER, LEFT, RIGHT, FULL aur self join se tables jodna.',
    concepts: [
      {
        title: 'INNER and OUTER Joins',
        difficulty: 'medium',
        tags: ['joins', 'inner-join', 'left-join', 'relationships'],
        explanation: {
          english:
            'Joins combine rows from two tables based on a related column (usually a foreign key). INNER JOIN returns only rows that match in both tables. LEFT JOIN returns all rows from the left table plus matches from the right (NULLs where none). RIGHT JOIN is the mirror; FULL OUTER JOIN returns all rows from both sides.',
          hinglish:
            'Joins do tables ki rows ko ek related column ke basis pe combine karte hain (aam taur pe foreign key). INNER JOIN sirf woh rows return karta hai jo dono tables mein match karein. LEFT JOIN left table ki saari rows plus right ki matches deta hai (jahan match nahi wahan NULL). RIGHT JOIN iska mirror hai; FULL OUTER JOIN dono sides ki saari rows return karta hai.',
        },
        dailyLifeExample:
          'Customers aur orders tables socho. INNER JOIN: sirf woh customers jinhone order kiya. LEFT JOIN: saare customers, chahe order kiya ho ya nahi (jinhone nahi kiya unke order columns NULL).',
        codeExample:
          '-- customers(id, name)  and  orders(id, customer_id, amount)\n\n-- Only customers who placed orders\nSELECT c.name, o.amount\nFROM customers c\nINNER JOIN orders o ON o.customer_id = c.id;\n\n-- All customers, with their orders if any\nSELECT c.name, o.amount\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id;\n\n-- Customers who have NEVER ordered\nSELECT c.name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;',
        keyPoints: [
          'JOIN combines tables on a related column',
          'INNER JOIN keeps only matching rows from both',
          'LEFT JOIN keeps all left rows, NULLs for no match',
          'FULL OUTER JOIN keeps all rows from both tables',
        ],
        quiz: [
          {
            question: 'Which join returns ONLY rows that match in both tables?',
            options: ['LEFT JOIN', 'INNER JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'],
            correctIndex: 1,
          },
          {
            question: 'A LEFT JOIN keeps...',
            options: [
              'Only matching rows',
              'All rows from the left table plus matches from the right',
              'Only rows from the right table',
              'No NULL values ever',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the difference between INNER JOIN and LEFT JOIN.',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'INNER JOIN returns only the rows where the join condition matches in both tables, dropping unmatched rows from either side. LEFT JOIN returns every row from the left table regardless of a match, filling right-table columns with NULL where no match exists. Use LEFT JOIN when you need all records from the primary table, such as listing all customers including those with no orders.',
              hinglish:
                'INNER JOIN sirf woh rows return karta hai jahan join condition dono tables mein match kare, kisi bhi side ki unmatched rows hata deta hai. LEFT JOIN left table ki har row return karta hai chahe match ho ya nahi, aur jahan match nahi wahan right-table columns ko NULL se bhar deta hai. LEFT JOIN tab use karo jab primary table ke saare records chahiye, jaise saare customers list karna unke saath bhi jinhone koi order nahi kiya.',
            },
          },
        ],
      },
      {
        title: 'Self Join',
        difficulty: 'hard',
        tags: ['joins', 'self-join', 'aliases'],
        explanation: {
          english:
            'A self join joins a table to itself, using two different aliases so the database treats them as separate copies. It is useful for hierarchical or relational data within one table — like employees and their managers, where both are rows in the same employees table.',
          hinglish:
            'Self join ek table ko khud se join karta hai, do alag aliases use karke taaki database unhe alag copies ki tarah treat kare. Ye ek hi table ke andar hierarchical ya relational data ke liye useful hai — jaise employees aur unke managers, jahan dono ek hi employees table ki rows hain.',
        },
        dailyLifeExample:
          'Office staff list socho jahan har employee ke saamne uske manager ki ID likhi hai. Manager ka naam dhoondhne ke liye usi list ko do baar dekhna padta hai — ek baar employee ke liye, ek baar manager ke liye. Yahi self join hai.',
        codeExample:
          '-- employees(id, name, manager_id)\n-- manager_id points to another employee in the SAME table\n\n-- Show each employee with their manager name\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;\n\n-- Aliases e and m make the one table act as two.',
        keyPoints: [
          'A self join joins a table to itself',
          'Two aliases are required to tell the copies apart',
          'Great for hierarchies like employee -> manager',
          'Often combined with LEFT JOIN to keep top-level rows',
        ],
        quiz: [
          {
            question: 'What makes a self join work?',
            options: [
              'Joining two completely different tables',
              'Using two aliases for the same table so it acts as two copies',
              'Removing the ON clause',
              'Using DISTINCT instead of JOIN',
            ],
            correctIndex: 1,
          },
          {
            question: 'A common use case for a self join is...',
            options: [
              'Encrypting a column',
              'Relating employees to their managers in one table',
              'Sorting results faster',
              'Counting total rows',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is a self join and when would you use one?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'A self join is a join where a table is joined with itself using two aliases, treating it as two separate tables. It is used when rows in a table relate to other rows in the same table — the classic example is an employees table where each row has a manager_id pointing to another employee. You alias the table twice (e for employee, m for manager) and join on e.manager_id = m.id.',
              hinglish:
                'Self join ek aisa join hai jahan ek table ko khud se join kiya jaata hai do aliases use karke, use do alag tables ki tarah treat karte hue. Ye tab use hota hai jab ek table ki rows usi table ki doosri rows se related hon — classic example ek employees table hai jahan har row mein manager_id hoti hai jo kisi doosre employee ko point karti hai. Table ko do baar alias karte ho (e employee ke liye, m manager ke liye) aur e.manager_id = m.id pe join karte ho.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Modifying Data & Schema',
    level: 'advanced',
    description: 'INSERT, UPDATE, DELETE, CREATE TABLE, constraints aur keys.',
    concepts: [
      {
        title: 'INSERT, UPDATE and DELETE',
        difficulty: 'medium',
        tags: ['insert', 'update', 'delete', 'dml'],
        explanation: {
          english:
            'These are the data-modification (DML) commands. INSERT adds new rows. UPDATE changes existing rows, almost always with a WHERE clause to target specific rows. DELETE removes rows, also with WHERE. Forgetting WHERE on UPDATE or DELETE affects the ENTIRE table — a dangerous mistake.',
          hinglish:
            'Ye data-modification (DML) commands hain. INSERT nayi rows add karta hai. UPDATE existing rows badalta hai, lagbhag hamesha WHERE clause ke saath taaki specific rows target karein. DELETE rows hatata hai, ye bhi WHERE ke saath. UPDATE ya DELETE pe WHERE bhoolna POORE table ko affect karta hai — ek dangerous galti.',
        },
        dailyLifeExample:
          'Register mein nayi entry likhna INSERT hai. Kisi student ke marks correct karna UPDATE hai (sirf usi ki row). Galat entry kaatna DELETE hai. WHERE bhoole toh poora register badal jaayega — bahut bada blunder!',
        codeExample:
          '-- Add a new student\nINSERT INTO students (name, city, marks)\nVALUES (\'Sneha\', \'Indore\', 81);\n\n-- Update a specific student (WHERE is essential!)\nUPDATE students\nSET marks = 90\nWHERE id = 3;\n\n-- Delete a specific student\nDELETE FROM students\nWHERE id = 3;\n\n-- DANGER: no WHERE deletes EVERY row\n-- DELETE FROM students;',
        keyPoints: [
          'INSERT adds rows; specify columns and VALUES',
          'UPDATE ... SET changes values — always use WHERE',
          'DELETE removes rows — always use WHERE',
          'Missing WHERE affects the entire table',
        ],
        quiz: [
          {
            question: 'What happens if you run UPDATE without a WHERE clause?',
            options: [
              'Nothing changes',
              'Only the first row updates',
              'Every row in the table is updated',
              'It throws a syntax error',
            ],
            correctIndex: 2,
          },
          {
            question: 'Which command adds a brand-new row to a table?',
            options: ['UPDATE', 'INSERT', 'SELECT', 'ALTER'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between DELETE, TRUNCATE and DROP?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'DELETE removes rows one by one and can use a WHERE clause; it is logged and can be rolled back. TRUNCATE quickly removes ALL rows without a WHERE clause, is faster, and usually cannot be rolled back in the same way. DROP removes the entire table — structure and data — from the database. DELETE and TRUNCATE keep the table; DROP destroys it.',
              hinglish:
                'DELETE rows ko ek-ek karke hataata hai aur WHERE clause use kar sakta hai; ye logged hota hai aur rollback ho sakta hai. TRUNCATE jaldi se SAARI rows hataata hai bina WHERE ke, faster hai, aur aam taur pe usi tarah rollback nahi hota. DROP poora table — structure aur data dono — database se hata deta hai. DELETE aur TRUNCATE table rakhte hain; DROP use khatam kar deta hai.',
            },
          },
        ],
      },
      {
        title: 'CREATE TABLE, Constraints and Keys',
        difficulty: 'hard',
        tags: ['ddl', 'create-table', 'constraints', 'primary-key', 'foreign-key'],
        explanation: {
          english:
            'CREATE TABLE defines a new table with columns, data types, and constraints. Constraints enforce data integrity: PRIMARY KEY uniquely identifies each row, NOT NULL forbids empty values, UNIQUE prevents duplicates, and FOREIGN KEY links a column to a primary key in another table to enforce valid relationships.',
          hinglish:
            'CREATE TABLE ek naya table define karta hai columns, data types aur constraints ke saath. Constraints data integrity enforce karte hain: PRIMARY KEY har row ko uniquely identify karta hai, NOT NULL empty values rokta hai, UNIQUE duplicates rokta hai, aur FOREIGN KEY ek column ko doosre table ki primary key se link karta hai taaki valid relationships banein.',
        },
        dailyLifeExample:
          'Naya school register banana CREATE TABLE hai. "Roll No khaali nahi ho sakta" NOT NULL hai. "Do students ka same Roll No nahi" UNIQUE/PRIMARY KEY hai. "Student ki class kisi valid class list se honi chahiye" FOREIGN KEY hai.',
        codeExample:
          '-- Create a classes table first\nCREATE TABLE classes (\n  id INT PRIMARY KEY,\n  name VARCHAR(50) NOT NULL\n);\n\n-- Create students referencing classes\nCREATE TABLE students (\n  id INT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  email VARCHAR(120) UNIQUE,\n  class_id INT,\n  FOREIGN KEY (class_id) REFERENCES classes(id)\n);',
        keyPoints: [
          'CREATE TABLE defines columns, types, and constraints',
          'PRIMARY KEY = unique + not null row identifier',
          'NOT NULL and UNIQUE protect data quality',
          'FOREIGN KEY enforces valid links between tables',
        ],
        quiz: [
          {
            question: 'What does a FOREIGN KEY do?',
            options: [
              'Encrypts a column',
              'Links a column to a primary key in another table',
              'Sorts the table',
              'Deletes duplicate rows',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which constraint forbids empty values in a column?',
            options: ['UNIQUE', 'NOT NULL', 'DEFAULT', 'CHECK'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between a PRIMARY KEY and a FOREIGN KEY?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'A PRIMARY KEY uniquely identifies each row in its own table and cannot be NULL or duplicated. A FOREIGN KEY is a column in one table that references the PRIMARY KEY of another table, creating a relationship and enforcing referential integrity — you cannot insert a foreign key value that does not exist in the referenced table. A table has one primary key but can have many foreign keys.',
              hinglish:
                'PRIMARY KEY apne table mein har row ko uniquely identify karti hai aur NULL ya duplicate nahi ho sakti. FOREIGN KEY ek table ka column hota hai jo doosre table ki PRIMARY KEY ko reference karta hai, ek relationship banata hai aur referential integrity enforce karta hai — tum aisi foreign key value insert nahi kar sakte jo referenced table mein exist hi na karti ho. Ek table mein ek primary key hoti hai par kai foreign keys ho sakti hain.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Advanced Queries',
    level: 'advanced',
    description: 'Subqueries, indexes, transactions/ACID aur normalization basics.',
    concepts: [
      {
        title: 'Subqueries',
        difficulty: 'hard',
        tags: ['subquery', 'nested-query', 'query'],
        explanation: {
          english:
            'A subquery is a query nested inside another query, often in a WHERE or FROM clause. The inner query runs first and feeds its result to the outer query. They are useful for comparisons against an aggregated or filtered set — for example, finding students who scored above the class average.',
          hinglish:
            'Subquery ek query hoti hai jo doosri query ke andar nested hoti hai, aksar WHERE ya FROM clause mein. Inner query pehle chalti hai aur apna result outer query ko deti hai. Ye aggregated ya filtered set ke against comparison ke liye useful hain — jaise un students ko dhoondhna jinke marks class average se zyada hain.',
        },
        dailyLifeExample:
          '"Pehle class ka average nikaalo, phir un students ko dikhao jinke marks us average se zyada hain." Andar wala calculation (average nikaalna) subquery hai, bahar wala filter outer query.',
        codeExample:
          '-- Students who scored above the overall average\nSELECT name, marks\nFROM students\nWHERE marks > (\n  SELECT AVG(marks) FROM students\n);\n\n-- Students who placed at least one order\nSELECT name FROM customers\nWHERE id IN (\n  SELECT customer_id FROM orders\n);',
        keyPoints: [
          'A subquery is a query inside another query',
          'The inner query runs first, feeding the outer query',
          'Common in WHERE (with IN, >, =) and FROM clauses',
          'Useful for comparing against aggregates like AVG',
        ],
        quiz: [
          {
            question: 'In a subquery, which part runs first?',
            options: [
              'The outer query',
              'The inner (nested) query',
              'They run at the same time',
              'Neither — subqueries are not executed',
            ],
            correctIndex: 1,
          },
          {
            question: 'A subquery is most commonly placed in which clause?',
            options: ['ORDER BY', 'WHERE', 'LIMIT', 'DISTINCT'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is a correlated subquery and how does it differ from a regular subquery?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'A regular (non-correlated) subquery runs once independently and its result is used by the outer query. A correlated subquery references columns from the outer query, so it is re-evaluated once for each row the outer query processes. Correlated subqueries are more powerful for row-by-row comparisons but can be slower, so they are often rewritten as JOINs for performance.',
              hinglish:
                'Ek regular (non-correlated) subquery ek baar independently chalti hai aur uska result outer query use karti hai. Correlated subquery outer query ke columns reference karti hai, isliye outer query ki har row ke liye dobara evaluate hoti hai. Correlated subqueries row-by-row comparison ke liye zyada powerful hain par slow ho sakti hain, isliye performance ke liye aksar inhe JOINs mein rewrite kar dete hain.',
            },
          },
        ],
      },
      {
        title: 'Indexes, Transactions and Normalization',
        difficulty: 'hard',
        tags: ['index', 'transaction', 'acid', 'normalization'],
        explanation: {
          english:
            'An index is a data structure that speeds up reads on a column, like a book index — fast lookups, but slightly slower writes and extra storage. A transaction groups statements so they all succeed or all fail (COMMIT / ROLLBACK), following ACID properties: Atomicity, Consistency, Isolation, Durability. Normalization organizes tables to reduce redundancy and avoid update anomalies.',
          hinglish:
            'Index ek data structure hai jo ek column par reads tez karta hai, ek book index ki tarah — fast lookups, par writes thodi slow aur extra storage. Transaction statements ko group karta hai taaki sab succeed karein ya sab fail (COMMIT / ROLLBACK), ACID properties follow karte hue: Atomicity, Consistency, Isolation, Durability. Normalization tables ko organize karta hai taaki redundancy kam ho aur update anomalies se bach sakein.',
        },
        dailyLifeExample:
          'Bank transfer socho: paise ek account se katega aur doosre mein judega — dono saath honge ya dono nahi (transaction). Index kitaab ke peeche ka index page hai jisse topic turant milta hai. Normalization matlab har info ek hi jagah likhna, baar-baar repeat nahi.',
        codeExample:
          '-- Index for faster lookups by email\nCREATE INDEX idx_students_email ON students(email);\n\n-- A transaction: both updates succeed or both roll back\nBEGIN;\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;   -- use ROLLBACK to undo if something fails',
        keyPoints: [
          'Indexes speed up reads but slow writes and use storage',
          'Transactions group statements: COMMIT or ROLLBACK',
          'ACID = Atomicity, Consistency, Isolation, Durability',
          'Normalization reduces redundancy and update anomalies',
        ],
        quiz: [
          {
            question: 'What does the "A" in ACID stand for?',
            options: ['Availability', 'Atomicity', 'Accuracy', 'Aggregation'],
            correctIndex: 1,
          },
          {
            question: 'What is the main trade-off of adding an index?',
            options: [
              'Faster writes but slower reads',
              'Faster reads but slower writes and more storage',
              'It deletes duplicate rows',
              'It has no downside',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What are the ACID properties of a transaction?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'ACID guarantees reliable transactions. Atomicity: all statements succeed or none do. Consistency: the database moves from one valid state to another, respecting all constraints. Isolation: concurrent transactions do not interfere with each other as if run sequentially. Durability: once committed, changes survive crashes and power loss. Together they keep data correct even under failures and concurrency.',
              hinglish:
                'ACID reliable transactions guarantee karta hai. Atomicity: saare statements succeed karein ya koi nahi. Consistency: database ek valid state se doosri valid state mein jaata hai, saare constraints respect karte hue. Isolation: concurrent transactions ek doosre mein dakhal na dein, jaise sequentially chale hon. Durability: ek baar commit hone par changes crash aur power loss mein bhi bache rahein. Milkar ye failures aur concurrency mein bhi data correct rakhte hain.',
            },
          },
        ],
      },
      {
        title: 'Window Functions: ROW_NUMBER, RANK & Running Totals',
        difficulty: 'hard',
        tags: ['window-functions', 'ranking', 'analytics'],
        explanation: {
          english:
            "A window function performs a calculation ACROSS a set of related rows (a 'window') WITHOUT collapsing them into one row, unlike GROUP BY which merges rows together. Every window function uses OVER(...) to define its window, optionally with PARTITION BY (reset the calculation per group) and ORDER BY (define row order for ranking/running totals). ROW_NUMBER() gives each row a unique sequential number, RANK() gives the same rank to ties (with gaps), and SUM(...) OVER(...) can compute a running total without needing a subquery.",
          hinglish:
            "Ek window function ek set of related rows (ek 'window') ke ACROSS calculation karta hai UNHE EK ROW MEIN COLLAPSE kiye bina, GROUP BY ke ulat jo rows ko merge kar deta hai. Har window function OVER(...) use karta hai apni window define karne ke liye, optionally PARTITION BY ke saath (har group ke liye calculation reset) aur ORDER BY ke saath (ranking/running totals ke liye row order define karna). ROW_NUMBER() har row ko ek unique sequential number deta hai, RANK() ties ko same rank deta hai (gaps ke saath), aur SUM(...) OVER(...) bina subquery ke running total nikaal sakta hai.",
        },
        dailyLifeExample:
          "GROUP BY ek class ka sirf average result dikhana hai (individual students gayab ho jaate hain). Window function poori class list dikhata hai, PAR har student ke saath uska rank bhi (jaise 'Riya — Rank 1 — 95 marks', 'Aman — Rank 2 — 90 marks') — koi bhi row gayab nahi hoti.",
        codeExample:
          "-- Rank students by marks WITHOUT losing any row (unlike GROUP BY)\nSELECT\n  name,\n  marks,\n  ROW_NUMBER() OVER (ORDER BY marks DESC) AS row_num,\n  RANK()       OVER (ORDER BY marks DESC) AS rank_with_gaps\nFROM students;\n-- if two students tie for 2nd, RANK gives both '2', next gets '4' (gap!)\n-- ROW_NUMBER always gives unique numbers: 1, 2, 3, 4...\n\n-- Rank WITHIN each class separately (PARTITION BY resets per group)\nSELECT name, class, marks,\n  RANK() OVER (PARTITION BY class ORDER BY marks DESC) AS class_rank\nFROM students;\n\n-- Running total of sales, ordered by date\nSELECT sale_date, amount,\n  SUM(amount) OVER (ORDER BY sale_date) AS running_total\nFROM sales;",
        keyPoints: [
          'Window functions calculate across rows WITHOUT collapsing them (unlike GROUP BY)',
          'OVER(...) defines the "window" of rows the calculation applies to',
          'PARTITION BY resets the calculation for each group (like a per-group GROUP BY, but rows stay visible)',
          'ROW_NUMBER(): always unique, sequential. RANK(): ties share a rank, leaving gaps',
          'SUM/AVG/COUNT with OVER() computes running totals/averages without a self-join or subquery',
        ],
        quiz: [
          {
            question: 'What is the key difference between GROUP BY and a window function?',
            options: ['No difference', 'GROUP BY collapses rows into one per group; a window function calculates across rows WITHOUT collapsing them', 'Window functions are always slower', 'GROUP BY can only count rows'],
            correctIndex: 1,
          },
          {
            question: 'Two students tie for 2nd place. What does RANK() give them, and what happens to the next rank?',
            options: ['Both get different ranks', 'Both get rank 2, and the next student gets rank 4 (a gap, skipping 3)', 'Both get rank 1', 'RANK() cannot handle ties'],
            correctIndex: 1,
          },
          {
            question: 'What does PARTITION BY class do inside a window function?',
            options: ['Deletes other classes', 'Resets the window calculation separately for each class, like a per-group reset', 'Sorts classes alphabetically', 'Removes duplicate classes'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'UNION, UNION ALL & CTEs (WITH)',
        difficulty: 'hard',
        tags: ['union', 'cte', 'with-clause'],
        explanation: {
          english:
            "UNION combines the result rows of two or more SELECT queries (with the same number/type of columns) into one result set, automatically removing duplicate rows. UNION ALL does the same but KEEPS duplicates — and is faster, since it skips the duplicate-checking work; use it whenever you know there won't be duplicates or don't care. A CTE (Common Table Expression), written with WITH name AS (...), lets you name a subquery and reference it like a temporary table later in the same query — making complex, multi-step queries far more readable than deeply nested subqueries.",
          hinglish:
            "UNION do ya zyada SELECT queries ke result rows ko (same number/type ke columns ke saath) ek result set mein combine karta hai, duplicate rows automatically hata deta hai. UNION ALL wahi karta hai par duplicates RAKHTA hai — aur faster hai, kyunki duplicate-checking ka kaam skip karta hai; use karo jab pata ho duplicates nahi honge ya parwah nahi. Ek CTE (Common Table Expression), WITH name AS (...) se likha jaata hai, ek subquery ko naam deta hai jise baad mein usi query mein temporary table ki tarah reference kar sakte ho — complex, multi-step queries ko deeply nested subqueries se kaafi zyada readable banata hai.",
        },
        dailyLifeExample:
          "UNION do alag class-lists (Section A aur Section B) ko ek combined list mein milana hai, duplicate naam hata ke. UNION ALL wahi list milana hai bina duplicates hataye — jaldi kyunki check nahi karna padta. CTE ek 'pehle ye calculate karo, naam do use, phir aage use karo' jaisa hai — recipe ke steps ko naam dena taaki confusing na ho.",
        codeExample:
          "-- UNION: combines and removes duplicates\nSELECT city FROM customers\nUNION\nSELECT city FROM suppliers;\n\n-- UNION ALL: combines, KEEPS duplicates, faster\nSELECT city FROM customers\nUNION ALL\nSELECT city FROM suppliers;\n\n-- CTE: name a subquery, use it like a table\nWITH high_scorers AS (\n  SELECT name, marks FROM students WHERE marks > 90\n)\nSELECT name, marks FROM high_scorers ORDER BY marks DESC;\n\n-- CTEs make multi-step logic readable\nWITH class_avg AS (\n  SELECT class, AVG(marks) AS avg_marks FROM students GROUP BY class\n)\nSELECT s.name, s.marks, c.avg_marks\nFROM students s\nJOIN class_avg c ON s.class = c.class\nWHERE s.marks > c.avg_marks;",
        keyPoints: [
          'UNION combines result sets from multiple SELECTs and removes duplicate rows',
          'UNION ALL does the same but keeps duplicates — faster since no dedup check',
          'Both require the combined SELECTs to have the same number and compatible types of columns',
          'A CTE (WITH name AS (...)) names a subquery so you can reference it like a table',
          'CTEs make deeply nested, hard-to-read subqueries into clear, sequential steps',
        ],
        quiz: [
          {
            question: 'What is the key difference between UNION and UNION ALL?',
            options: ['No difference', 'UNION removes duplicate rows; UNION ALL keeps them and is faster', 'UNION ALL only works with 2 tables', 'UNION is always faster'],
            correctIndex: 1,
          },
          {
            question: 'What does a CTE (WITH name AS (...)) let you do?',
            options: ['Permanently create a new table', 'Name a subquery so you can reference it like a temporary table later in the same query', 'Delete rows automatically', 'Nothing different from a regular subquery'],
            correctIndex: 1,
          },
          {
            question: 'For UNION to work, what must be true about the SELECT queries being combined?',
            options: ['They must query the same table', 'They must return the same number of columns with compatible types', 'They must have no WHERE clause', 'They must both use GROUP BY'],
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
    question: 'What is the difference between SQL and NoSQL databases?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'SQL (relational) databases store data in structured tables with a fixed schema and use SQL for queries; they excel at complex queries, joins, and ACID transactions (e.g. PostgreSQL, MySQL). NoSQL databases store data flexibly as documents, key-value pairs, graphs, or wide columns with a dynamic schema; they scale horizontally and suit unstructured or rapidly changing data (e.g. MongoDB, Redis). Choose SQL for strong consistency and relationships, NoSQL for flexibility and large-scale horizontal scaling.',
      hinglish:
        'SQL (relational) databases data ko structured tables mein fixed schema ke saath store karte hain aur queries ke liye SQL use karte hain; ye complex queries, joins aur ACID transactions mein best hain (jaise PostgreSQL, MySQL). NoSQL databases data ko flexibly documents, key-value pairs, graphs ya wide columns ke roop mein dynamic schema ke saath store karte hain; ye horizontally scale karte hain aur unstructured ya tezi se badalte data ke liye theek hain (jaise MongoDB, Redis). Strong consistency aur relationships ke liye SQL chuno, flexibility aur large-scale horizontal scaling ke liye NoSQL.',
    },
  },
  {
    question: 'What is database normalization and why is it important?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Normalization is the process of organizing tables and columns to reduce data redundancy and improve integrity. It splits data into related tables connected by keys, so each fact is stored once. This prevents update, insert, and delete anomalies — for example, changing a customer address in one place instead of many. Common forms are 1NF, 2NF, and 3NF. The trade-off is that highly normalized schemas may need more joins, so reporting systems sometimes denormalize for read speed.',
      hinglish:
        'Normalization tables aur columns ko organize karne ka process hai taaki data redundancy kam ho aur integrity improve ho. Ye data ko keys se jude related tables mein todta hai, taaki har fact ek hi baar store ho. Isse update, insert aur delete anomalies rukti hain — jaise customer ka address ek hi jagah badalna, kai jagah nahi. Common forms 1NF, 2NF aur 3NF hain. Trade-off ye hai ki bahut normalized schemas mein zyada joins lag sakte hain, isliye reporting systems kabhi-kabhi read speed ke liye denormalize karte hain.',
    },
  },

  // ─── Querying & Joins ───────────────────────────────────────
  {
    question: 'What is the logical order of execution of a SELECT statement?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Not the order you write it. Logically it runs FROM and JOIN first, then WHERE, then GROUP BY, then HAVING, then SELECT, then DISTINCT, then ORDER BY, then LIMIT. That explains two things beginners find baffling: you cannot use a SELECT alias in WHERE, because WHERE runs before SELECT, but you CAN use it in ORDER BY, which runs after. It also explains why WHERE cannot reference an aggregate — the grouping has not happened yet.',
      hinglish:
        'Wo nahi jis order mein tum likhte ho. Logically ye pehle FROM aur JOIN chalata hai, phir WHERE, phir GROUP BY, phir HAVING, phir SELECT, phir DISTINCT, phir ORDER BY, phir LIMIT. Isse do cheezein samajh aati hain jo shuruaati logon ko uljhaati hain: tum ek SELECT alias WHERE mein use nahi kar sakte, kyunki WHERE SELECT se pehle chalta hai, par ORDER BY mein kar SAKTE ho, jo baad mein chalta hai. Ye ye bhi samjhaata hai ki WHERE ek aggregate reference kyun nahi kar sakta — grouping abhi hui hi nahi.',
    },
  },
  {
    question: 'What are the different types of JOIN?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'INNER JOIN returns rows matching in both tables. LEFT JOIN returns all left rows, with NULLs where the right has no match; RIGHT JOIN is the mirror. FULL OUTER JOIN returns everything from both, with NULLs on either side. CROSS JOIN produces the Cartesian product of every combination. A SELF JOIN joins a table to itself, which is how you model hierarchies such as an employee and their manager in one table.',
      hinglish:
        'INNER JOIN dono tables mein match karti rows lautaata hai. LEFT JOIN saari left rows lautaata hai, jahan right mein match nahi wahan NULLs ke saath; RIGHT JOIN uska aaina hai. FULL OUTER JOIN dono se sab kuch lautaata hai, kisi bhi taraf NULLs ke saath. CROSS JOIN har jodi ka Cartesian product banata hai. Ek SELF JOIN ek table ko khud se jodta hai, jisse tum ek hi table mein ek employee aur uske manager jaisi hierarchies batate ho.',
    },
  },
  {
    question: 'What is the difference between putting a condition in ON versus WHERE for a LEFT JOIN?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'In `ON`, the condition is applied while MATCHING, so unmatched left rows are still returned with NULLs — the LEFT JOIN behaves as intended. In `WHERE`, the condition is applied AFTER the join, and since NULL fails almost every comparison, those unmatched rows are filtered out — silently converting your LEFT JOIN into an INNER JOIN. This is one of the most common SQL bugs, and it produces missing rows rather than an error, so it is easy to miss.',
      hinglish:
        '`ON` mein, condition MATCH karte waqt lagti hai, isliye bina match ki left rows abhi bhi NULLs ke saath lautti hain — LEFT JOIN waise hi behave karta hai jaise chahiye. `WHERE` mein, condition join ke BAAD lagti hai, aur kyunki NULL almost har comparison mein fail hota hai, wo bina match ki rows chhan jaati hain — chupke se tumhare LEFT JOIN ko ek INNER JOIN bana kar. Ye sabse common SQL bugs mein se ek hai, aur ye ek error ke bajaye gayab rows deta hai, isliye ise chhodna aasaan hai.',
    },
  },
  {
    question: 'What is the difference between WHERE and HAVING?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`WHERE` filters INDIVIDUAL ROWS before grouping and can use indexes. `HAVING` filters GROUPS after `GROUP BY` and can reference aggregates such as `COUNT(*) > 5`, which `WHERE` cannot. Performance follows from that ordering: filtering in `WHERE` removes rows before the expensive grouping runs, so moving a condition from `HAVING` into `WHERE` — whenever it does not depend on an aggregate — is a genuine and commonly missed optimisation.',
      hinglish:
        '`WHERE` grouping se pehle ALAG-ALAG ROWS chhaanta hai aur indexes use kar sakta hai. `HAVING` `GROUP BY` ke baad GROUPS chhaanta hai aur `COUNT(*) > 5` jaise aggregates reference kar sakta hai, jo `WHERE` nahi kar sakta. Performance us kram se nikalti hai: `WHERE` mein chhaanna mehnga grouping chalne se pehle rows hata deta hai, isliye ek condition ko `HAVING` se `WHERE` mein le jaana — jab wo ek aggregate pe depend na kare — ek genuine aur aksar chhooti optimisation hai.',
    },
  },
  {
    question: 'How does NULL behave in SQL?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'NULL means UNKNOWN, so any comparison involving it yields UNKNOWN rather than true — `NULL = NULL` is not true, which is why `IS NULL` exists. It breaks `NOT IN` against a subquery containing NULL, which then returns no rows at all — a genuinely baffling bug. Aggregates SKIP NULLs, so `COUNT(col)` differs from `COUNT(*)`. Concatenating with NULL usually gives NULL. `COALESCE` supplies a default, and this behaviour is a leading cause of subtly wrong results.',
      hinglish:
        'NULL ka matlab ANJAAN hai, isliye usse juda koi bhi comparison true ke bajaye ANJAAN deta hai — `NULL = NULL` true nahi hai, isiliye `IS NULL` hai. Ye NULL wale subquery ke against `NOT IN` todta hai, jo phir koi row hi nahi lautaata — ek genuinely uljhaane wala bug. Aggregates NULLs SKIP karte hain, isliye `COUNT(col)` `COUNT(*)` se alag hai. NULL ke saath jodna usually NULL deta hai. `COALESCE` ek default deta hai, aur ye behaviour sookshm roop se galat nateejon ka ek bada karan hai.',
    },
  },
  {
    question: 'What is the difference between UNION and UNION ALL?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`UNION` removes duplicate rows, which forces the database to sort or hash the entire combined result — genuinely expensive on large sets. `UNION ALL` simply concatenates and is much faster. Use `UNION ALL` by default and reach for `UNION` only when duplicates are actually possible AND unwanted. Both require the same number of columns with compatible types, and the column names come from the first query.',
      hinglish:
        '`UNION` duplicate rows hataata hai, jo database ko poora juda nateeja sort ya hash karne pe majboor karta hai — bade sets pe genuinely mehnga. `UNION ALL` bas jod deta hai aur bahut tez hai. Default se `UNION ALL` use karo aur `UNION` sirf tab uthao jab duplicates actually sambhav AUR anchahe hon. Dono ko compatible types ke saath ek jitne columns chahiye, aur column naam pehli query se aate hain.',
    },
  },
  {
    question: 'What are window functions and how do they differ from GROUP BY?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A window function computes across a set of related rows WITHOUT collapsing them, so each input row remains in the output alongside its aggregate. `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)` ranks within each department while keeping every row. `GROUP BY` reduces many rows to one. Window functions make "top N per group", running totals, and comparisons to the previous row straightforward — all of which previously needed awkward self-joins.',
      hinglish:
        'Ek window function judi rows ke ek set pe compute karta hai BINA unhe samete, isliye har input row apne aggregate ke saath output mein rehti hai. `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)` har department ke andar rank deta hai jabki har row rehti hai. `GROUP BY` bahut rows ko ek mein kam kar deta hai. Window functions "per group top N", running totals, aur pichhli row se tulna ko seedha bana dete hain — jinke liye pehle ajeeb self-joins chahiye the.',
    },
  },
  {
    question: 'What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'All three number rows within a partition, differing only on TIES. `ROW_NUMBER` always gives distinct sequential numbers, breaking ties arbitrarily. `RANK` gives tied rows the same number and then SKIPS — 1, 2, 2, 4. `DENSE_RANK` gives ties the same number without skipping — 1, 2, 2, 3. Choose `ROW_NUMBER` for deduplication or pagination where you need exactly one row per position, and `RANK` or `DENSE_RANK` when ties should genuinely share a position.',
      hinglish:
        'Teeno ek partition ke andar rows ko number dete hain, sirf BARABARI pe alag. `ROW_NUMBER` hamesha alag kramik numbers deta hai, barabari ko kisi bhi tarah todte hue. `RANK` barabar rows ko wahi number deta hai aur phir SKIP karta hai — 1, 2, 2, 4. `DENSE_RANK` barabari ko wahi number bina skip kiye deta hai — 1, 2, 2, 3. Deduplication ya pagination ke liye `ROW_NUMBER` chuno jahan per position theek ek row chahiye, aur `RANK` ya `DENSE_RANK` jab barabari ko genuinely ek jagah share karni chahiye.',
    },
  },
  {
    question: 'What is a CTE and when should you use one?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A Common Table Expression names a query result with `WITH`, so a complex query can be built up in readable named steps rather than deeply nested subqueries. It can be referenced multiple times in the same statement. RECURSIVE CTEs traverse hierarchies — an org chart, a category tree, a bill of materials — which plain SQL cannot express. Note a CTE is not automatically materialised or faster; in most databases it is an optimiser hint at best, so use it for CLARITY.',
      hinglish:
        'Ek Common Table Expression `WITH` se ek query ke nateeje ko naam deta hai, isliye ek complex query gehre nested subqueries ke bajaye padhne layak named steps mein bane. Ise ek hi statement mein kai baar reference kiya ja sakta hai. RECURSIVE CTEs hierarchies pe chalte hain — ek org chart, ek category tree, ek bill of materials — jo plain SQL nahi bata sakta. Note karo ek CTE apne aap materialise ya tez nahi hota; zyadatar databases mein ye zyada se zyada ek optimiser ishaara hai, isliye ise SAAFI ke liye use karo.',
    },
  },
  {
    question: 'What is a recursive CTE?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A recursive CTE has an ANCHOR member producing the starting rows and a RECURSIVE member that references the CTE itself, repeatedly joining back until no new rows appear. It is how you walk a hierarchy of unknown depth — every subordinate under a manager, every ancestor category, every node reachable in a graph. Always include a termination condition or depth limit, because a cycle in the data produces an infinite loop that will consume the server.',
      hinglish:
        'Ek recursive CTE mein ek ANCHOR member hota hai jo shuruaati rows banata hai aur ek RECURSIVE member jo khud CTE ko reference karta hai, baar-baar wapas jodte hue jab tak nayi rows na aayein. Isse tum anjaan gehraai ki ek hierarchy pe chalte ho — ek manager ke neeche har adheenasth, har poorvaj category, ek graph mein pahunchne layak har node. Hamesha ek rukne ki condition ya depth seema daalo, kyunki data mein ek cycle ek anant loop banata hai jo server kha jaayega.',
    },
  },
  {
    question: 'What is an index and what does it cost?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An index is a sorted structure, usually a B-tree, letting the database locate rows without scanning the table — turning O(n) into O(log n). The costs are real and often forgotten: every index consumes storage and must be updated on every INSERT, UPDATE, and DELETE, so an over-indexed table has slow writes. Index the columns you filter, join, and sort on, and periodically look for unused indexes, which are pure cost with no benefit.',
      hinglish:
        'Ek index ek sorted dhaancha hai, usually ek B-tree, jo database ko table scan kiye bina rows dhoondhne deta hai — O(n) ko O(log n) mein badalte hue. Costs asli hain aur aksar bhoole jaate hain: har index storage khaata hai aur har INSERT, UPDATE, aur DELETE pe update hona padta hai, isliye zyada index wali table ke writes slow hote hain. Un columns pe index karo jinpe tum filter, join, aur sort karte ho, aur samay-samay pe bina use ke indexes dhoondho, jo bina faayde ka sheer cost hain.',
    },
  },
  {
    question: 'What is a composite index and does column order matter?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A composite index covers several columns in a defined order and follows the LEFTMOST PREFIX rule: an index on `(a, b, c)` serves queries filtering on `a`, on `a+b`, or on all three, but not on `b` alone. Order therefore matters enormously — put equality columns before range columns, since a range condition stops the prefix from continuing. It can also satisfy an ORDER BY, avoiding a sort, when the direction is consistent with the index.',
      hinglish:
        'Ek composite index kai columns ko ek tay kram mein cover karta hai aur LEFTMOST PREFIX niyam follow karta hai: `(a, b, c)` pe ek index `a` pe, `a+b` pe, ya teeno pe filter karti queries serve karta hai, par akele `b` pe nahi. Isliye kram bahut matter karta hai — equality columns ko range columns se pehle rakho, kyunki ek range condition prefix ko aage badhne se rok deti hai. Ye ek ORDER BY bhi poora kar sakta hai, ek sort bachate hue, jab disha index ke anuroop ho.',
    },
  },
  {
    question: 'Why might the database ignore an index you created?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Several reasons. Wrapping the column in a FUNCTION — `WHERE YEAR(created_at) = 2024` — prevents index use unless you have a functional index; rewrite it as a range. A type mismatch forces an implicit conversion. A leading wildcard in `LIKE "%x"` cannot use a B-tree. Low selectivity means the planner judges a sequential scan cheaper, which is frequently the correct decision. And stale statistics can mislead it, which `ANALYZE` fixes.',
      hinglish:
        'Kai wajahein. Column ko ek FUNCTION mein lapetna — `WHERE YEAR(created_at) = 2024` — index use rokta hai jab tak tumhare paas ek functional index na ho; ise ek range ki tarah dobara likho. Ek type mismatch ek chhupa conversion majboor karta hai. `LIKE "%x"` mein ek shuruaati wildcard ek B-tree use nahi kar sakta. Kam selectivity matlab planner ek sequential scan sasta samajhta hai, jo aksar sahi faisla hai. Aur purani statistics use bhatka sakti hain, jise `ANALYZE` theek karta hai.',
    },
  },
  {
    question: 'How do you read a query execution plan?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Run `EXPLAIN ANALYZE` to get actual rather than estimated numbers. Look for a SEQUENTIAL SCAN on a large table, which usually means a missing index. Compare estimated rows against actual — a large discrepancy means statistics are stale and every downstream decision is built on a wrong guess. Check the join method: a nested loop over many rows is slow, while hash or merge join suits large sets. Read from the innermost node outward, since that is execution order.',
      hinglish:
        'Andaaze ke bajaye asli numbers paane ke liye `EXPLAIN ANALYZE` chalao. Ek badi table pe SEQUENTIAL SCAN dhoondho, jo usually ek gayab index batata hai. Andaaze ki rows ko asli se compare karo — ek bada farak batata hai ki statistics purani hain aur har aage ka faisla ek galat andaaze pe bana hai. Join method check karo: bahut rows pe ek nested loop slow hai, jabki hash ya merge join bade sets ko suit karta hai. Sabse andar ke node se bahar ki taraf padho, kyunki wahi execution kram hai.',
    },
  },
  {
    question: 'What is the difference between a subquery and a JOIN?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A JOIN combines rows from multiple tables side by side and is usually the most efficient way to bring columns together. A SUBQUERY nests one query inside another and reads more naturally for existence checks and single-value comparisons. The performance concern is the CORRELATED subquery, which re-executes once per outer row and can be catastrophically slow. Modern planners often rewrite subqueries into joins, so check the plan rather than assuming.',
      hinglish:
        'Ek JOIN kai tables ki rows ko saath-saath jodta hai aur usually columns saath laane ka sabse efficient tareeka hai. Ek SUBQUERY ek query ko doosri ke andar rakhta hai aur existence checks aur single-value comparisons ke liye zyada swabhavik padhta hai. Performance ki chinta CORRELATED subquery hai, jo per outer row ek baar dobara chalti hai aur vinaashkari roop se slow ho sakti hai. Modern planners aksar subqueries ko joins mein badal dete hain, isliye maan lene ke bajaye plan dekho.',
    },
  },
  {
    question: 'What is the difference between EXISTS and IN?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`IN` compares a value against a returned list; `EXISTS` checks only whether the subquery produces any row and can stop at the first match. The critical difference is NULL handling: `NOT IN` against a subquery containing a NULL returns NO ROWS at all, because the comparison evaluates to UNKNOWN, whereas `NOT EXISTS` behaves as you would expect. That alone is reason enough to prefer `EXISTS` for anti-joins. Performance is usually comparable in modern planners.',
      hinglish:
        '`IN` ek value ko ek lauti list se compare karta hai; `EXISTS` sirf ye check karta hai ki subquery koi row deti hai ya nahi aur pehle match pe ruk sakta hai. Zaroori farak NULL handling hai: NULL wale subquery ke against `NOT IN` KOI ROW nahi lautaata, kyunki comparison ANJAAN nikalta hai, jabki `NOT EXISTS` waise behave karta hai jaisa tum sochoge. Akela yahi anti-joins ke liye `EXISTS` prefer karne ki kaafi wajah hai. Modern planners mein performance usually barabar hai.',
    },
  },
  {
    question: 'What are the ACID properties?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'ATOMICITY — a transaction completes fully or not at all, so a failed transfer never debits without crediting. CONSISTENCY — the database moves between valid states, respecting all constraints. ISOLATION — concurrent transactions do not observe each other\'s partial work, governed by the isolation level. DURABILITY — once committed, data survives a crash, guaranteed by a write-ahead log flushed to disk before the commit is acknowledged.',
      hinglish:
        'ATOMICITY — ek transaction poora hota hai ya bilkul nahi, isliye ek fail hua transfer bina credit kiye debit nahi karta. CONSISTENCY — database valid states ke beech chalta hai, saare constraints maante hue. ISOLATION — concurrent transactions ek doosre ka aadha kaam nahi dekhte, jise isolation level chalata hai. DURABILITY — commit hone ke baad, data ek crash jhel leta hai, ek write-ahead log se pakka jo commit maanne se pehle disk pe likha jaata hai.',
    },
  },
  {
    question: 'What are the transaction isolation levels and what anomalies do they allow?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'READ UNCOMMITTED allows DIRTY READS — seeing uncommitted data. READ COMMITTED prevents that but allows NON-REPEATABLE READS, where reading the same row twice gives different values. REPEATABLE READ prevents that but classically allows PHANTOM READS, where new matching rows appear. SERIALIZABLE prevents all three. Higher isolation costs concurrency, so pick the weakest level that is correct for the operation rather than defaulting to the strictest.',
      hinglish:
        'READ UNCOMMITTED DIRTY READS allow karta hai — bina commit hua data dekhna. READ COMMITTED wo rokta hai par NON-REPEATABLE READS allow karta hai, jahan ek hi row do baar padhna alag values deta hai. REPEATABLE READ wo rokta hai par classically PHANTOM READS allow karta hai, jahan nayi matching rows dikhti hain. SERIALIZABLE teeno rokta hai. Zyada isolation concurrency cost karta hai, isliye sabse sakht pe jaane ke bajaye wo sabse kamzor level chuno jo us operation ke liye sahi ho.',
    },
  },
  {
    question: 'What is a deadlock in a database and how do you handle it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A deadlock occurs when two transactions each hold a lock the other needs, so neither can proceed. The database DETECTS this and aborts one, returning an error to the application. Prevention: acquire locks in a CONSISTENT ORDER across all code paths, keep transactions short, and index your WHERE clauses so fewer rows are locked. Critically, the application must catch the error and RETRY — deadlocks are a normal consequence of concurrency, not a bug to be eliminated entirely.',
      hinglish:
        'Ek deadlock tab hota hai jab do transactions mein har ek wo lock rakhta ho jo doosre ko chahiye, isliye koi aage nahi badh sakta. Database ise PAKADTA hai aur ek ko rok deta hai, application ko ek error lautaate hue. Prevention: saare code paths mein locks ek CONSISTENT KRAM mein lo, transactions chhote rakho, aur apne WHERE clauses index karo taaki kam rows lock hon. Critically, application ko error pakad kar RETRY karna chahiye — deadlocks concurrency ka ek normal nateeja hain, poori tarah mitane wala bug nahi.',
    },
  },
  {
    question: 'What is the difference between optimistic and pessimistic locking?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PESSIMISTIC locking takes a lock up front with `SELECT ... FOR UPDATE`, blocking others until you commit — safe under heavy contention but reduces concurrency and risks deadlocks. OPTIMISTIC locking takes no lock: you read a version number, and on update include `WHERE version = :old`, so if someone else changed it the update affects zero rows and you retry. Optimistic suits low-conflict workloads and scales better; pessimistic suits genuinely contended rows such as inventory.',
      hinglish:
        'PESSIMISTIC locking pehle hi `SELECT ... FOR UPDATE` se ek lock leta hai, doosron ko tumhare commit tak rokte hue — bhaari takkar mein surakshit par concurrency kam karta hai aur deadlocks ka khatra hai. OPTIMISTIC locking koi lock nahi leta: tum ek version number padhte ho, aur update mein `WHERE version = :old` daalte ho, isliye agar kisi aur ne badla to update zero rows ko chhoota hai aur tum retry karte ho. Optimistic kam takkar wale workloads ko suit karta hai aur behtar scale karta hai; pessimistic genuinely takraati rows jaise inventory ko.',
    },
  },
  {
    question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`DELETE` removes rows one at a time, supports a `WHERE` clause, is fully logged, fires triggers, and can be rolled back. `TRUNCATE` removes all rows quickly by deallocating pages, takes no `WHERE`, resets identity counters, fires no row triggers, and is minimally logged. `DROP` removes the table structure entirely. Use DELETE for selective removal, TRUNCATE to empty a table fast, and DROP to remove the table itself.',
      hinglish:
        '`DELETE` rows ek-ek karke hataata hai, ek `WHERE` clause leta hai, poori tarah logged hai, triggers chalata hai, aur rollback ho sakta hai. `TRUNCATE` pages hataakar saari rows jaldi hataata hai, koi `WHERE` nahi leta, identity counters reset karta hai, koi row triggers nahi chalata, aur kam logged hai. `DROP` table ka dhaancha poori tarah hata deta hai. Chun kar hataane ke liye DELETE, ek table jaldi khaali karne ke liye TRUNCATE, aur khud table hataane ke liye DROP use karo.',
    },
  },
  {
    question: 'What is the difference between a primary key and a unique constraint?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Both enforce uniqueness, but a PRIMARY KEY additionally forbids NULL and there can be only ONE per table — it is the row\'s identity. A UNIQUE constraint allows NULLs (and in most databases multiple NULLs, since NULL is not equal to NULL), and a table may have several. Both create an index automatically. Use the primary key for the canonical identifier and unique constraints for other genuinely unique attributes such as an email address.',
      hinglish:
        'Dono uniqueness enforce karte hain, par ek PRIMARY KEY upar se NULL mana karti hai aur per table sirf EK ho sakti hai — ye row ki pehchaan hai. Ek UNIQUE constraint NULLs allow karta hai (aur zyadatar databases mein kai NULLs, kyunki NULL NULL ke barabar nahi), aur ek table mein kai ho sakte hain. Dono apne aap ek index banate hain. Primary key ko asli pehchaan ke liye use karo aur unique constraints doosre genuinely unique attributes jaise ek email address ke liye.',
    },
  },
  {
    question: 'What is a foreign key and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A foreign key constrains a column to reference an existing row in another table, so the DATABASE enforces referential integrity rather than trusting every application that touches it. It prevents orphaned rows — an order pointing to a deleted customer. `ON DELETE CASCADE` removes children with the parent, which is convenient but dangerous since one delete can silently remove a great deal. It costs a small amount on writes, which is almost always worth the guarantee.',
      hinglish:
        'Ek foreign key ek column ko doosri table ki ek maujood row reference karne pe baandhta hai, isliye har us application pe bharosa karne ke bajaye jo ise chhoota hai, DATABASE referential integrity enforce karta hai. Ye anaath rows rokta hai — ek order jo ek delete hue customer pe point kare. `ON DELETE CASCADE` children ko parent ke saath hataata hai, jo suvidhajanak par khatarnak hai kyunki ek delete chupke se bahut kuch hata sakta hai. Ye writes pe thoda cost karta hai, jo guarantee ke aage almost hamesha worth hai.',
    },
  },
  {
    question: 'What is the difference between a clustered and a non-clustered index?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A CLUSTERED index determines the physical order of rows on disk, so there can be only one per table — in MySQL InnoDB it is the primary key. Range scans on it are very fast because rows are adjacent. A NON-CLUSTERED index is a separate structure holding the key plus a pointer back to the row, so a lookup may require a second read to fetch the remaining columns. A covering index avoids that second read by including everything the query needs.',
      hinglish:
        'Ek CLUSTERED index disk pe rows ka bhautik kram tay karta hai, isliye per table sirf ek ho sakta hai — MySQL InnoDB mein ye primary key hai. Us pe range scans bahut tez hain kyunki rows saath-saath hain. Ek NON-CLUSTERED index ek alag dhaancha hai jo key plus row tak ek pointer rakhta hai, isliye ek lookup ko bache columns laane ke liye ek doosri read chahiye ho sakti hai. Ek covering index wo doosri read bachata hai, query ko chahiye sab kuch shaamil karke.',
    },
  },
  {
    question: 'Why is OFFSET pagination slow and what is the alternative?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`LIMIT 20 OFFSET 100000` forces the database to fetch and DISCARD 100,000 rows before returning 20, so cost grows linearly with page depth. It also produces duplicate or skipped rows when data changes between requests. KEYSET (cursor) pagination fixes both: remember the last row\'s sort value and use `WHERE id > :lastId ORDER BY id LIMIT 20`, which uses the index directly and stays constant-time at any depth. The trade is losing arbitrary page jumps.',
      hinglish:
        '`LIMIT 20 OFFSET 100000` database ko 20 lautane se pehle 100,000 rows laakar PHENKNE pe majboor karta hai, isliye cost page ki gehraai ke saath seedhe badhti hai. Ye tab duplicate ya chhooti rows bhi banata hai jab requests ke beech data badle. KEYSET (cursor) pagination dono theek karta hai: aakhri row ki sort value yaad rakho aur `WHERE id > :lastId ORDER BY id LIMIT 20` use karo, jo index seedha use karta hai aur kisi bhi gehraai pe constant-time rehta hai. Trade kisi bhi page pe koodna khona hai.',
    },
  },
  {
    question: 'What is SQL injection and how do you prevent it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Injection happens when user input is concatenated into a query string, so input such as `\' OR 1=1--` changes the query\'s STRUCTURE rather than supplying a value. Prepared statements send the structure first with placeholders and the values separately, so by the time values arrive the plan is fixed and they can only be treated as DATA. Escaping is a weaker fallback that depends on getting every call site right. Also apply least-privilege database accounts as a second layer.',
      hinglish:
        'Injection tab hota hai jab user input ek query string mein joda jaaye, isliye `\' OR 1=1--` jaisa input query ka DHAANCHA badal deta hai, ek value dene ke bajaye. Prepared statements pehle dhaancha placeholders ke saath bhejte hain aur values alag se, isliye values aane tak plan tay ho chuka hota hai aur unhe sirf DATA maana ja sakta hai. Escaping ek kamzor fallback hai jo har call site sahi karne pe depend karta hai. Ek doosri layer ke roop mein sabse kam adhikaar wale database accounts bhi lagao.',
    },
  },
  {
    question: 'What is the difference between DISTINCT and GROUP BY?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Both eliminate duplicates and often produce identical execution plans. `DISTINCT` simply removes duplicate rows from a result. `GROUP BY` collapses rows into groups and crucially lets you apply AGGREGATES per group. So use `DISTINCT` when you want only unique values and `GROUP BY` when you also need a count, sum, or average. `DISTINCT` on many columns is often a sign of a join producing unintended duplicates that should be fixed instead.',
      hinglish:
        'Dono duplicates hataate hain aur aksar ek jaise execution plans banate hain. `DISTINCT` bas ek nateeje se duplicate rows hataata hai. `GROUP BY` rows ko groups mein samet-ta hai aur critically tumhe per group AGGREGATES lagane deta hai. Isliye `DISTINCT` tab use karo jab sirf unique values chahiye aur `GROUP BY` jab ek count, sum, ya average bhi chahiye. Bahut columns pe `DISTINCT` aksar ek aise join ki nishaani hai jo anchahe duplicates bana raha hai jinhe uske bajaye theek karna chahiye.',
    },
  },
  {
    question: 'What is the N+1 query problem?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Fetching a list of N items and then running a separate query per item to load a relation — 101 round trips for 100 posts and their authors. It is invisible in development with ten rows and crippling in production, because network latency multiplies. Fixes: a JOIN, an eager-loading option in your ORM, or one batched query using `WHERE id IN (...)`. Detect it by logging query counts per request rather than waiting for a slow-query alert.',
      hinglish:
        'N items ki ek list laakar phir per item ek relation load karne ko ek alag query chalana — 100 posts aur unke authors ke liye 101 round trips. Ye das rows ke saath development mein invisible hai aur production mein apahij karne wala, kyunki network latency guna ho jaati hai. Fixes: ek JOIN, tumhare ORM mein ek eager-loading option, ya `WHERE id IN (...)` wali ek batched query. Ise ek slow-query alert ka intezaar karne ke bajaye per request query counts log karke pakado.',
    },
  },
  {
    question: 'What is the difference between OLTP and OLAP?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'OLTP handles many small, fast transactions — the operational database behind an application, normalised, row-oriented, and optimised for writes and point lookups. OLAP handles few large analytical queries scanning millions of rows, denormalised into star schemas, usually COLUMN-oriented so scanning one column does not read the others. Running heavy analytics on your OLTP database is a common mistake that degrades the application; replicate to a warehouse instead.',
      hinglish:
        'OLTP bahut chhote, tez transactions sambhalta hai — ek application ke peeche ka operational database, normalised, row-oriented, aur writes aur point lookups ke liye optimised. OLAP kam par badi analytical queries sambhalta hai jo lakhon rows scan karti hain, star schemas mein denormalised, usually COLUMN-oriented taaki ek column scan karna doosre na padhe. Apne OLTP database pe bhaari analytics chalana ek common galti hai jo application bigaadti hai; uske bajaye ek warehouse pe replicate karo.',
    },
  },
  {
    question: 'What is a view and is it faster?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A view is a stored SELECT given a name. It aids readability, encapsulates a complex join, and can restrict which columns a user sees. It is NOT inherently faster — a standard view is not materialised, so the underlying query runs every time. A MATERIALISED view does store the result and is genuinely faster to read, at the cost of being stale until refreshed. PostgreSQL supports materialised views natively; MySQL does not and you emulate them with a summary table.',
      hinglish:
        'Ek view ek naam diya gaya stored SELECT hai. Ye padhne mein madad karta hai, ek complex join lapetta hai, aur seemit kar sakta hai ki ek user kaunse columns dekhe. Ye apne aap TEZ NAHI hai — ek standard view materialise nahi hota, isliye underlying query har baar chalti hai. Ek MATERIALISED view nateeja store karta hai aur padhne mein genuinely tez hai, refresh hone tak purana rehne ke cost pe. PostgreSQL materialised views natively deta hai; MySQL nahi deta aur tum unki nakal ek summary table se karte ho.',
    },
  },
  {
    question: 'What is the difference between a stored procedure and a function?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A PROCEDURE is invoked with `CALL`, may return multiple result sets or none, and can modify data. A FUNCTION returns a single value and can be used inside an expression such as a SELECT list or WHERE clause. Both reduce round trips by keeping logic near the data. The modern objection is that database logic is harder to version, test, and review than application code, so most teams keep business rules in the application.',
      hinglish:
        'Ek PROCEDURE `CALL` se bulaya jaata hai, kai result sets ya koi nahi lauta sakta hai, aur data badal sakta hai. Ek FUNCTION ek single value lautaata hai aur ek expression ke andar use ho sakta hai jaise ek SELECT list ya WHERE clause. Dono logic ko data ke paas rakh kar round trips kam karte hain. Modern aitraaz ye hai ki database logic ko version, test, aur review karna application code se mushkil hai, isliye zyadatar teams business rules application mein rakhti hain.',
    },
  },
  {
    question: 'What is a trigger and why are triggers often discouraged?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A trigger runs automatically before or after an INSERT, UPDATE, or DELETE — used for audit logs, derived columns, or enforcing a rule. They are discouraged because the behaviour is INVISIBLE from the application: a developer reading the code sees no indication that an insert also writes elsewhere, which makes debugging genuinely hard. They also run inside the transaction, so a slow trigger slows every write, and cascading triggers are difficult to reason about.',
      hinglish:
        'Ek trigger ek INSERT, UPDATE, ya DELETE se pehle ya baad apne aap chalta hai — audit logs, derived columns, ya ek niyam enforce karne ke liye. Inhe isliye rokaa jaata hai kyunki behaviour application se ANDEKHA hai: code padhta ek developer ko koi ishaara nahi milta ki ek insert kahin aur bhi likhta hai, jo debugging genuinely mushkil banata hai. Wo transaction ke andar bhi chalte hain, isliye ek slow trigger har write slow karta hai, aur cascading triggers ko samajhna mushkil hai.',
    },
  },
  {
    question: 'What is denormalisation and when is it justified?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Denormalisation deliberately duplicates data to avoid joins — storing a comment count on a post rather than counting rows, or copying a product name into an order line. It is justified when reads dominate and joins have become a MEASURED bottleneck, or when history must be preserved (the order should keep the price at purchase time). The cost is keeping copies in sync, and a missed update produces inconsistent data that is hard to detect.',
      hinglish:
        'Denormalisation joins bachane ke liye jaan boojh kar data duplicate karta hai — ek post pe rows ginne ke bajaye ek comment count rakhna, ya ek product naam ek order line mein copy karna. Ye tab sahi hai jab reads haavi hon aur joins ek MAAPA GAYA bottleneck ban gaye hon, ya jab itihaas bachana ho (order ko kharidte waqt ka daam rakhna chahiye). Cost copies ko sync mein rakhna hai, aur ek chhoota update aisa inconsistent data banata hai jise pakadna mushkil hai.',
    },
  },
  {
    question: 'What is the difference between 3NF and BCNF?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'THIRD NORMAL FORM removes transitive dependencies: every non-key attribute depends on the key and nothing but the key. BCNF is slightly stricter — every determinant must be a candidate key — which closes an edge case 3NF allows when a table has multiple overlapping candidate keys. In practice most schemas that reach 3NF are already in BCNF, and the distinction rarely matters outside exams and unusual multi-key designs.',
      hinglish:
        'THIRD NORMAL FORM transitive dependencies hataata hai: har non-key attribute key pe depend karta hai aur key ke alawa kisi pe nahi. BCNF thoda sakht hai — har determinant ek candidate key hona chahiye — jo ek edge case band karta hai jise 3NF tab allow karta hai jab ek table mein kai overlapping candidate keys hon. Practically 3NF tak pahunche zyadatar schemas pehle se BCNF mein hote hain, aur ye farak exams aur ajeeb multi-key designs ke bahar rarely matter karta hai.',
    },
  },
  {
    question: 'What is a self join and when would you use one?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A self join joins a table to itself using aliases, which is how you relate rows within one table. The classic case is a hierarchy stored with a parent reference — joining employees to employees to get each person\'s manager. It is also used to compare rows to each other, such as finding pairs of products at the same price. For deep hierarchies of unknown depth, a recursive CTE is required instead, since a self join only reaches one level per join.',
      hinglish:
        'Ek self join ek table ko aliases se khud se jodta hai, jisse tum ek table ke andar rows ko jodte ho. Classic case ek parent reference ke saath rakhi hierarchy hai — employees ko employees se jodkar har vyakti ka manager paana. Ye rows ko ek doosre se compare karne ke liye bhi use hota hai, jaise ek hi daam wale products ki jodiyaan dhoondhna. Anjaan gehraai ki gehri hierarchies ke liye, uske bajaye ek recursive CTE chahiye, kyunki ek self join per join sirf ek level pahunchta hai.',
    },
  },
  {
    question: 'How do you find duplicate rows in a table?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Group by the columns that define a duplicate and keep groups with `HAVING COUNT(*) > 1`. To DELETE duplicates while keeping one, use a window function: `ROW_NUMBER() OVER (PARTITION BY key ORDER BY id)` and delete where the number is greater than 1, which is far cleaner than the old self-join-on-min-id approach. Afterwards add a UNIQUE constraint so duplicates cannot reappear — otherwise you will be running the same cleanup again.',
      hinglish:
        'Un columns se group karo jo ek duplicate batate hain aur `HAVING COUNT(*) > 1` wale groups rakho. Ek rakhte hue duplicates DELETE karne ke liye, ek window function use karo: `ROW_NUMBER() OVER (PARTITION BY key ORDER BY id)` aur wahan delete karo jahan number 1 se bada ho, jo purane self-join-on-min-id tareeke se bahut saaf hai. Baad mein ek UNIQUE constraint jodo taaki duplicates dobara na aayein — warna tum wahi safai dobara chala rahe hoge.',
    },
  },
  {
    question: 'What is an upsert and how do you write one?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An upsert inserts a row or updates it if it already exists. PostgreSQL uses `INSERT ... ON CONFLICT (key) DO UPDATE`, MySQL uses `ON DUPLICATE KEY UPDATE`, and the standard offers `MERGE`. Its real value is ATOMICITY: the naive "check then insert" has a race condition where two concurrent requests both find nothing and both insert, producing a duplicate or a constraint violation. An upsert resolves that in a single statement.',
      hinglish:
        'Ek upsert ek row insert karta hai ya pehle se hone pe use update karta hai. PostgreSQL `INSERT ... ON CONFLICT (key) DO UPDATE` use karta hai, MySQL `ON DUPLICATE KEY UPDATE`, aur standard `MERGE` deta hai. Iski asli value ATOMICITY hai: naive "check phir insert" mein ek race condition hai jahan do concurrent requests dono kuch nahi paate aur dono insert karte hain, ek duplicate ya ek constraint violation banate hue. Ek upsert ise ek hi statement mein sulhaa deta hai.',
    },
  },
  {
    question: 'What is the difference between COUNT(*), COUNT(1), and COUNT(column)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`COUNT(*)` and `COUNT(1)` both count ROWS and are identical in performance — the old folklore that one is faster is a myth in every modern database. `COUNT(column)` counts only rows where that column is NOT NULL, which is a genuinely different result and is sometimes exactly what you want. `COUNT(DISTINCT column)` counts distinct non-null values and is considerably more expensive, since it requires deduplication.',
      hinglish:
        '`COUNT(*)` aur `COUNT(1)` dono ROWS ginte hain aur performance mein ek jaise hain — ye purani baat ki ek tez hai har modern database mein ek mith hai. `COUNT(column)` sirf wo rows ginta hai jahan wo column NULL NAHI hai, jo ek genuinely alag nateeja hai aur kabhi theek wahi hota hai jo tum chahte ho. `COUNT(DISTINCT column)` alag non-null values ginta hai aur kaafi zyada mehnga hai, kyunki ise deduplication chahiye.',
    },
  },
  {
    question: 'What is the difference between CHAR, VARCHAR, and TEXT?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`CHAR(n)` is fixed-length and pads with spaces, suiting genuinely fixed values such as a country code. `VARCHAR(n)` stores only what is used plus a length prefix, and is the normal choice. `TEXT` holds large variable content and in some databases is stored separately from the row, which can make it slower to access and unusable in an index without a prefix length. In PostgreSQL there is no performance difference between VARCHAR and TEXT.',
      hinglish:
        '`CHAR(n)` fixed-length hai aur spaces se bharta hai, ek country code jaisi genuinely fixed values ko suit karta hua. `VARCHAR(n)` sirf utna store karta hai jitna use hua plus ek length prefix, aur normal choice hai. `TEXT` bada badalta content rakhta hai aur kuch databases mein row se alag store hota hai, jo use access karne mein slow aur bina ek prefix length ke ek index mein bekaar bana sakta hai. PostgreSQL mein VARCHAR aur TEXT ke beech koi performance farak nahi.',
    },
  },
  {
    question: 'How do you handle dates and time zones in SQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Store timestamps in UTC and convert only at the presentation layer, so arithmetic and comparison are unambiguous. Use a type that records the zone — `TIMESTAMPTZ` in PostgreSQL — rather than a naive timestamp, which silently loses the information. Never apply a function to a date column in a WHERE clause, since it prevents index use; write a range instead. And be aware that daylight-saving transitions make some local times ambiguous or non-existent.',
      hinglish:
        'Timestamps UTC mein rakho aur sirf presentation layer pe convert karo, taaki arithmetic aur comparison saaf hon. Ek aisa type use karo jo zone record kare — PostgreSQL mein `TIMESTAMPTZ` — ek naive timestamp ke bajaye, jo chupke se jaankaari kho deta hai. Ek WHERE clause mein ek date column pe kabhi ek function mat lagao, kyunki ye index use rokta hai; uske bajaye ek range likho. Aur dhyaan rakho ki daylight-saving badlaav kuch local times ko do-matlabi ya na-maujood bana dete hain.',
    },
  },
  {
    question: 'What is the difference between SQL and NoSQL and how do you choose?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'SQL databases offer a fixed schema, ACID transactions, powerful joins, and mature tooling — the right default when data is relational and correctness matters. NoSQL spans document, key-value, wide-column, and graph stores, each optimised for a particular access pattern and horizontal scale. Choose by ACCESS PATTERN and consistency requirements rather than by fashion; modern PostgreSQL handles JSON and scales far enough that "we need NoSQL for scale" is usually premature.',
      hinglish:
        'SQL databases ek tay schema, ACID transactions, taakatwar joins, aur pakka tooling dete hain — sahi default jab data relational ho aur correctness matter kare. NoSQL document, key-value, wide-column, aur graph stores tak failta hai, har ek ek khaas access pattern aur horizontal scale ke liye optimised. Fashion ke bajaye ACCESS PATTERN aur consistency ki zaroorat se chuno; modern PostgreSQL JSON sambhalta hai aur itna scale karta hai ki "scale ke liye NoSQL chahiye" usually jaldbaazi hai.',
    },
  },
  {
    question: 'What is database replication and what problem does it introduce?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Replication copies data from a primary to one or more replicas, which scales reads and provides a failover candidate. The problem it introduces is REPLICATION LAG: replication is usually asynchronous, so a user who writes and immediately reads may hit a replica that has not caught up and see their own change missing. Handle it by routing read-after-write to the primary, using a sticky window after a write, or designing the UI to tolerate a short delay.',
      hinglish:
        'Replication ek primary se ek ya zyada replicas pe data copy karta hai, jo reads scale karta hai aur ek failover candidate deta hai. Jo problem ye laata hai wo REPLICATION LAG hai: replication usually asynchronous hai, isliye ek user jo likh kar turant padhta hai wo ek aise replica pe pahunch sakta hai jo pahuncha nahi aur apna hi change gayab dekhe. Ise read-after-write ko primary pe bhej kar, ek write ke baad ek sticky window use karke, ya UI ko ek chhoti deri sehne layak banakar sambhalo.',
    },
  },
  {
    question: 'What is sharding and what does it cost?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Sharding splits data horizontally across servers so writes and storage scale beyond one machine. The shard key determines placement and is effectively permanent, needing high cardinality, even distribution, and presence in your common query filters. The costs are substantial: cross-shard joins and transactions become expensive or impossible, rebalancing is painful, and application code must know where data lives. Exhaust replication, caching, and indexing first.',
      hinglish:
        'Sharding data ko servers ke across horizontally baantta hai taaki writes aur storage ek machine se aage scale karein. Shard key jagah tay karti hai aur effectively permanent hai, use high cardinality, ek samaan bantwaara, aur tumhare common query filters mein hona chahiye. Costs kaafi hain: cross-shard joins aur transactions mehnge ya asambhav ho jaate hain, rebalancing takleefdeh hai, aur application code ko pata hona chahiye ki data kahan hai. Pehle replication, caching, aur indexing khatam karo.',
    },
  },
  {
    question: 'How do you optimise a slow SQL query?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Find it in the slow query log rather than guessing. Run `EXPLAIN ANALYZE` and look for a sequential scan, a bad row estimate, or an expensive sort. Then fix in order of impact: add or reorder an index matching the filter and sort, select only the columns you need so a covering index becomes possible, remove functions wrapping indexed columns, replace deep OFFSET with keyset pagination, and rewrite correlated subqueries as joins. Re-measure, because assumed optimisations are often wrong.',
      hinglish:
        'Ise andaaza lagane ke bajaye slow query log mein dhoondho. `EXPLAIN ANALYZE` chalao aur ek sequential scan, ek kharab row andaaza, ya ek mehnga sort dekho. Phir asar ke kram mein theek karo: filter aur sort se milta ek index jodo ya dobara order karo, sirf zaroori columns select karo taaki ek covering index sambhav ho, indexed columns ko lapetne wale functions hatao, gehre OFFSET ko keyset pagination se badlo, aur correlated subqueries ko joins ki tarah dobara likho. Dobara maapo, kyunki maani gayi optimisations aksar galat hoti hain.',
    },
  },
];
