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
  icon: '🗃️',
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
            frequency: 'very-common',
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
            frequency: 'very-common',
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
            frequency: 'very-common',
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
            frequency: 'very-common',
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
            frequency: 'very-common',
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
            frequency: 'very-common',
            answer: {
              english:
                'ACID guarantees reliable transactions. Atomicity: all statements succeed or none do. Consistency: the database moves from one valid state to another, respecting all constraints. Isolation: concurrent transactions do not interfere with each other as if run sequentially. Durability: once committed, changes survive crashes and power loss. Together they keep data correct even under failures and concurrency.',
              hinglish:
                'ACID reliable transactions guarantee karta hai. Atomicity: saare statements succeed karein ya koi nahi. Consistency: database ek valid state se doosri valid state mein jaata hai, saare constraints respect karte hue. Isolation: concurrent transactions ek doosre mein dakhal na dein, jaise sequentially chale hon. Durability: ek baar commit hone par changes crash aur power loss mein bhi bache rahein. Milkar ye failures aur concurrency mein bhi data correct rakhte hain.',
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
    question: 'What is the difference between SQL and NoSQL databases?',
    difficulty: 'medium',
    frequency: 'very-common',
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
];
