// PostgreSQL curriculum — beginner -> intermediate -> advanced.
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
  title: 'PostgreSQL',
  slug: 'postgresql',
  description:
    'Powerful open-source relational database — tables, joins, indexes, JSONB, transactions, window functions aur performance. English + Hinglish, desi examples aur SQL ke saath.',
  icon: '🐘',
  tags: ['postgresql', 'postgres', 'database', 'sql', 'backend'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 18,
};

const beginner = [
  {
    title: 'PostgreSQL Basics',
    level: 'beginner',
    description: 'Postgres kya hai, data types, tables aur CRUD.',
    concepts: [
      {
        title: 'What is PostgreSQL',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'PostgreSQL (Postgres) is a powerful, open-source, object-relational database known for standards compliance, reliability, and rich features. Compared to MySQL it offers stronger support for complex queries, advanced data types (JSONB, arrays, custom types), full ACID transactions, window functions, and extensibility (e.g. the pgvector extension for AI). It is a top choice for serious backend applications.',
          hinglish:
            'PostgreSQL (Postgres) ek powerful, open-source, object-relational database hai jo standards compliance, reliability, aur rich features ke liye jaana jaata hai. MySQL ke comparison mein ye complex queries, advanced data types (JSONB, arrays, custom types), full ACID transactions, window functions, aur extensibility (jaise AI ke liye pgvector extension) ko stronger support karta hai. Serious backend applications ke liye top choice hai.',
        },
        dailyLifeExample:
          'Postgres ek bahut organised, rule-follow karne wali sarkari record-office jaisa hai — har entry verified, consistent, aur powerful search/reporting tools ke saath.',
        codeExample:
          '-- Connect & explore (psql)\n\\l            -- list databases\n\\c shop       -- connect to "shop"\n\\dt           -- list tables\n\nSELECT version();  -- PostgreSQL version',
        keyPoints: [
          'Open-source object-relational database',
          'Strong standards compliance & ACID',
          'Advanced types: JSONB, arrays, custom types',
          'Extensible (e.g. pgvector for AI)',
        ],
        quiz: [
          {
            question: 'PostgreSQL is a/an…',
            options: ['NoSQL document database', 'object-relational (SQL) database', 'spreadsheet', 'cache'],
            correctIndex: 1,
          },
          {
            question: 'A PostgreSQL strength over MySQL is…',
            options: ['no SQL support', 'advanced types (JSONB) & complex queries', 'no transactions', 'it is closed-source'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Data Types in PostgreSQL',
        difficulty: 'easy',
        tags: ['data-types'],
        explanation: {
          english:
            'Choosing the right type keeps data correct and efficient. Common types: INTEGER/BIGINT and SERIAL/IDENTITY (auto-increment) for numbers, NUMERIC/DECIMAL for exact money, VARCHAR(n)/TEXT for strings, BOOLEAN, DATE/TIMESTAMP/TIMESTAMPTZ for time, UUID for ids, plus rich types like JSONB, arrays, and ENUM. Use TIMESTAMPTZ (timezone-aware) for real-world time and NUMERIC (never FLOAT) for currency.',
          hinglish:
            'Sahi type choose karna data ko correct aur efficient rakhta hai. Common types: numbers ke liye INTEGER/BIGINT aur SERIAL/IDENTITY (auto-increment), exact money ke liye NUMERIC/DECIMAL, strings ke liye VARCHAR(n)/TEXT, BOOLEAN, time ke liye DATE/TIMESTAMP/TIMESTAMPTZ, ids ke liye UUID, plus rich types jaise JSONB, arrays, aur ENUM. Real-world time ke liye TIMESTAMPTZ (timezone-aware) aur currency ke liye NUMERIC (kabhi FLOAT nahi) use karo.',
        },
        dailyLifeExample:
          'Data type form ke khaane ki tarah hai — date wale khaane mein date, number wale mein number. Galat type = galat ya corrupt data. Paise ke liye FLOAT use karna chillar gum karne jaisa hai (rounding errors).',
        codeExample:
          'CREATE TABLE products (\n  id         SERIAL PRIMARY KEY,        -- auto-increment\n  name       VARCHAR(100) NOT NULL,\n  price      NUMERIC(10, 2) NOT NULL,   -- exact money\n  in_stock   BOOLEAN DEFAULT true,\n  tags       TEXT[],                    -- array\n  details    JSONB,                     -- flexible JSON\n  created_at TIMESTAMPTZ DEFAULT now()\n);',
        keyPoints: [
          'INTEGER/BIGINT, SERIAL/IDENTITY for ids',
          'NUMERIC for money (never FLOAT)',
          'VARCHAR/TEXT, BOOLEAN, TIMESTAMPTZ',
          'Rich types: JSONB, arrays, UUID, ENUM',
        ],
        quiz: [
          {
            question: 'Which type should you use for currency?',
            options: ['FLOAT', 'NUMERIC/DECIMAL', 'TEXT', 'BOOLEAN'],
            correctIndex: 1,
          },
          {
            question: 'SERIAL is commonly used for…',
            options: ['storing JSON', 'auto-incrementing primary keys', 'dates', 'booleans'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Creating Tables & Constraints',
        difficulty: 'medium',
        tags: ['ddl', 'constraints'],
        explanation: {
          english:
            'Constraints enforce data integrity at the database level. PRIMARY KEY uniquely identifies each row; FOREIGN KEY links to another table and enforces referential integrity; NOT NULL requires a value; UNIQUE prevents duplicates; CHECK validates a condition; DEFAULT supplies a fallback. Letting the database enforce rules is safer than relying on application code alone.',
          hinglish:
            'Constraints data integrity ko database level pe enforce karte hain. PRIMARY KEY har row ko uniquely identify karta hai; FOREIGN KEY doosri table se link karke referential integrity enforce karta hai; NOT NULL value zaroori banata hai; UNIQUE duplicates rokta hai; CHECK ek condition validate karta hai; DEFAULT fallback deta hai. Rules ko database se enforce karwana sirf application code pe bharosa karne se safer hai.',
        },
        dailyLifeExample:
          'Constraints ek form ke validation rules jaise hain — "ye field khaali nahi", "age 18+ honi chahiye", "email unique ho". Database hi galat entry rok deta hai.',
        codeExample:
          'CREATE TABLE orders (\n  id         SERIAL PRIMARY KEY,\n  user_id    INTEGER NOT NULL REFERENCES users(id), -- foreign key\n  email      VARCHAR(255) UNIQUE NOT NULL,\n  amount     NUMERIC(10,2) CHECK (amount > 0),       -- validate\n  status     VARCHAR(20) DEFAULT \'pending\'\n);',
        keyPoints: [
          'PRIMARY KEY: unique row identifier',
          'FOREIGN KEY: link + referential integrity',
          'NOT NULL, UNIQUE, CHECK, DEFAULT',
          'DB-enforced rules are safer than app-only checks',
        ],
        quiz: [
          {
            question: 'Which constraint links one table to another?',
            options: ['PRIMARY KEY', 'FOREIGN KEY', 'CHECK', 'DEFAULT'],
            correctIndex: 1,
          },
          {
            question: 'Which constraint validates that a value meets a condition?',
            options: ['CHECK', 'UNIQUE', 'NOT NULL', 'DEFAULT'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'CRUD Operations',
        difficulty: 'easy',
        tags: ['crud', 'sql'],
        explanation: {
          english:
            'CRUD maps to four SQL statements: INSERT (create), SELECT (read), UPDATE (modify), DELETE (remove). SELECT filters with WHERE, sorts with ORDER BY, and limits with LIMIT. Always include a WHERE clause on UPDATE/DELETE — without it, you change or delete every row! Postgres adds RETURNING to get back the affected rows in the same statement.',
          hinglish:
            'CRUD chaar SQL statements se map hota hai: INSERT (create), SELECT (read), UPDATE (modify), DELETE (remove). SELECT WHERE se filter, ORDER BY se sort, aur LIMIT se limit karta hai. UPDATE/DELETE pe hamesha WHERE clause daalo — uske bina har row change ya delete ho jaayegi! Postgres RETURNING add karta hai jisse usi statement mein affected rows wapas mil jaati hain.',
        },
        dailyLifeExample:
          'WHERE ke bina DELETE poori register phaad dene jaisa hai — ek line hatani thi, sab gayab. Isliye UPDATE/DELETE pe WHERE bahut zaroori hai.',
        codeExample:
          "INSERT INTO products (name, price) VALUES ('Pen', 10)\n  RETURNING id;                       -- get the new id\n\nSELECT * FROM products WHERE price < 50 ORDER BY price LIMIT 10;\n\nUPDATE products SET price = 12 WHERE id = 1;  -- WHERE!\n\nDELETE FROM products WHERE id = 1;            -- WHERE!",
        keyPoints: [
          'INSERT / SELECT / UPDATE / DELETE',
          'SELECT: WHERE, ORDER BY, LIMIT',
          'Always use WHERE on UPDATE/DELETE',
          'RETURNING gives back affected rows',
        ],
        quiz: [
          {
            question: 'What happens if you run DELETE FROM users; (no WHERE)?',
            options: ['nothing', 'it deletes every row', 'it errors out', 'it deletes one row'],
            correctIndex: 1,
          },
          {
            question: 'Which clause limits the number of rows returned?',
            options: ['WHERE', 'ORDER BY', 'LIMIT', 'GROUP BY'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Querying Data',
    level: 'intermediate',
    description: 'Joins, aggregations, subqueries aur indexes.',
    concepts: [
      {
        title: 'Joins',
        difficulty: 'medium',
        tags: ['joins', 'sql'],
        explanation: {
          english:
            'Joins combine rows from multiple tables on a related column. INNER JOIN keeps only matching rows in both tables; LEFT JOIN keeps all left-table rows (NULLs where no match); RIGHT JOIN the reverse; FULL OUTER JOIN keeps all rows from both. Joins are how normalised relational data is recombined — e.g. orders joined to users to show who placed each order.',
          hinglish:
            'Joins multiple tables ki rows ko ek related column pe combine karte hain. INNER JOIN sirf dono tables mein matching rows rakhta hai; LEFT JOIN left-table ki saari rows rakhta hai (jahan match nahi wahan NULLs); RIGHT JOIN ulta; FULL OUTER JOIN dono ki saari rows. Joins se normalised relational data dobara combine hota hai — jaise orders ko users se join karke dikhana ki kis ne order kiya.',
        },
        dailyLifeExample:
          'Join do registers ko ek common column (roll number) se milane jaisa hai — ek mein naam, doosre mein marks; join karke ek complete report banti hai.',
        codeExample:
          "-- Show each order with the user's name\nSELECT o.id, u.name, o.amount\nFROM orders o\nINNER JOIN users u ON u.id = o.user_id;\n\n-- All users, even those with no orders (LEFT JOIN)\nSELECT u.name, o.id AS order_id\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id;",
        keyPoints: [
          'INNER JOIN: only matching rows',
          'LEFT JOIN: all left rows + NULLs for non-matches',
          'RIGHT / FULL OUTER for other coverage',
          'Recombines normalised tables on a key',
        ],
        quiz: [
          {
            question: 'Which join returns only rows matching in both tables?',
            options: ['LEFT JOIN', 'INNER JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'],
            correctIndex: 1,
          },
          {
            question: 'A LEFT JOIN keeps…',
            options: ['only matches', 'all left-table rows (NULLs where no match)', 'no rows', 'only right rows'],
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
                'INNER JOIN returns only rows that have a match in both tables — non-matching rows from either side are dropped. LEFT JOIN (LEFT OUTER JOIN) returns every row from the left table and the matching rows from the right; where there is no match, the right-side columns are NULL. Use INNER JOIN when you only want related records that exist in both; use LEFT JOIN when you want to keep all records from the primary (left) table, such as listing all users including those with zero orders.',
              hinglish:
                'INNER JOIN sirf wo rows return karta hai jinka dono tables mein match ho — kisi bhi side ki non-matching rows drop ho jaati hain. LEFT JOIN (LEFT OUTER JOIN) left table ki har row aur right ki matching rows return karta hai; jahan match nahi, right-side columns NULL. INNER JOIN tab jab sirf dono mein existing related records chahiye; LEFT JOIN tab jab primary (left) table ke saare records rakhne hon, jaise saare users including jinke zero orders hain.',
            },
          },
        ],
      },
      {
        title: 'Aggregations & GROUP BY',
        difficulty: 'medium',
        tags: ['aggregation', 'group-by'],
        explanation: {
          english:
            'Aggregate functions summarise many rows into one value: COUNT, SUM, AVG, MIN, MAX. GROUP BY splits rows into groups and aggregates each group (e.g. total sales per city). WHERE filters rows BEFORE grouping; HAVING filters groups AFTER aggregation (e.g. only cities with sales > 1000). Every non-aggregated column in SELECT must appear in GROUP BY.',
          hinglish:
            'Aggregate functions bahut rows ko ek value mein summarise karte hain: COUNT, SUM, AVG, MIN, MAX. GROUP BY rows ko groups mein baant kar har group aggregate karta hai (jaise per city total sales). WHERE grouping se PEHLE rows filter karta hai; HAVING aggregation ke BAAD groups filter karta hai (jaise sirf wo cities jinki sales > 1000). SELECT mein har non-aggregated column GROUP BY mein hona chahiye.',
        },
        dailyLifeExample:
          'GROUP BY class ke students ko section ke hisaab se baant kar har section ka average nikalne jaisa hai. HAVING = "sirf wo sections dikhao jinka average 80+ hai".',
        codeExample:
          "SELECT city, COUNT(*) AS orders, SUM(amount) AS total\nFROM orders\nWHERE status = 'paid'      -- filter rows BEFORE grouping\nGROUP BY city\nHAVING SUM(amount) > 1000  -- filter groups AFTER aggregation\nORDER BY total DESC;",
        keyPoints: [
          'COUNT/SUM/AVG/MIN/MAX summarise rows',
          'GROUP BY aggregates per group',
          'WHERE filters before; HAVING filters after grouping',
          'Non-aggregated SELECT columns must be in GROUP BY',
        ],
        quiz: [
          {
            question: 'Which clause filters groups AFTER aggregation?',
            options: ['WHERE', 'HAVING', 'LIMIT', 'ORDER BY'],
            correctIndex: 1,
          },
          {
            question: 'Which computes the total of a column?',
            options: ['COUNT', 'SUM', 'AVG', 'MAX'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Subqueries & CTEs (WITH)',
        difficulty: 'hard',
        tags: ['subquery', 'cte'],
        explanation: {
          english:
            'A subquery is a query nested inside another (in WHERE, FROM, or SELECT) — e.g. "users who spent more than the average". A CTE (Common Table Expression) using WITH names a temporary result set you can reference like a table, making complex queries readable and enabling recursion. CTEs improve clarity; for hierarchical data (org charts, trees) recursive CTEs are the standard tool.',
          hinglish:
            'Subquery ek query hai jo doosri ke andar nested ho (WHERE, FROM, ya SELECT mein) — jaise "wo users jinhone average se zyada kharch kiya". CTE (Common Table Expression) WITH se ek temporary result set ko naam deta hai jise tum table ki tarah reference kar sakte ho, jisse complex queries readable banti hain aur recursion possible hota hai. CTEs clarity badhate hain; hierarchical data (org charts, trees) ke liye recursive CTEs standard tool hain.',
        },
        dailyLifeExample:
          'CTE ek bade kaam ko chhote named steps mein todne jaisa hai — "pehle ye list banao (WITH), phir uspe kaam karo". Padhne mein saaf, samajhne mein aasaan.',
        codeExample:
          "-- Subquery: users who spent above average\nSELECT name FROM users\nWHERE id IN (\n  SELECT user_id FROM orders\n  GROUP BY user_id HAVING SUM(amount) > (SELECT AVG(amount) FROM orders)\n);\n\n-- CTE version (readable)\nWITH spend AS (\n  SELECT user_id, SUM(amount) AS total FROM orders GROUP BY user_id\n)\nSELECT u.name, s.total FROM users u JOIN spend s ON s.user_id = u.id;",
        keyPoints: [
          'Subquery: a query nested in another',
          'CTE (WITH): named temporary result set',
          'CTEs make complex queries readable',
          'Recursive CTEs handle hierarchical data',
        ],
        quiz: [
          {
            question: 'A CTE is defined using which keyword?',
            options: ['JOIN', 'WITH', 'GROUP', 'HAVING'],
            correctIndex: 1,
          },
          {
            question: 'Recursive CTEs are especially useful for…',
            options: ['flat lists', 'hierarchical/tree data (org charts)', 'images', 'indexes'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Indexes',
        difficulty: 'medium',
        tags: ['index', 'performance'],
        explanation: {
          english:
            'An index is a data structure (usually a B-tree) that lets Postgres find rows without scanning the whole table — turning O(n) lookups into roughly O(log n). Index columns you frequently filter, join, or sort by. The trade-off: indexes speed up reads but slow down writes (every insert/update must maintain them) and use disk. Primary keys and UNIQUE constraints are indexed automatically. Use EXPLAIN to confirm an index is actually used.',
          hinglish:
            'Index ek data structure (aksar B-tree) hai jo Postgres ko poori table scan kiye bina rows dhoondhne deta hai — O(n) lookups ko roughly O(log n) bana ke. Jin columns pe aksar filter, join, ya sort karte ho un pe index banao. Trade-off: indexes reads tez karte hain par writes slow (har insert/update inhe maintain karna padta hai) aur disk lete hain. Primary keys aur UNIQUE constraints apne aap indexed hote hain. EXPLAIN se confirm karo ki index actually use ho raha hai.',
        },
        dailyLifeExample:
          'Index ek kitaab ke peeche ka index jaisa hai — poori kitaab padhe bina seedha sahi page. Par har naye edition mein index bhi update karna padta hai (write cost).',
        codeExample:
          "CREATE INDEX idx_orders_user ON orders (user_id);\nCREATE INDEX idx_users_email ON users (email);\n\n-- composite index for multi-column filters\nCREATE INDEX idx_orders_city_status ON orders (city, status);\n\n-- check usage\nEXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;",
        keyPoints: [
          'B-tree index avoids full table scans',
          'Index columns you filter/join/sort by',
          'Speeds reads; slows writes; uses disk',
          'PK & UNIQUE are auto-indexed; verify with EXPLAIN',
        ],
        quiz: [
          {
            question: 'An index mainly improves…',
            options: ['write speed', 'read/lookup speed', 'disk space', 'backups'],
            correctIndex: 1,
          },
          {
            question: 'A downside of adding many indexes is…',
            options: ['faster writes', 'slower writes & more disk usage', 'no effect', 'data loss'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'PostgreSQL Features',
    level: 'intermediate',
    description: 'JSONB aur transactions.',
    concepts: [
      {
        title: 'JSON & JSONB',
        difficulty: 'medium',
        tags: ['json', 'jsonb'],
        explanation: {
          english:
            'Postgres can store JSON in two types: JSON (keeps exact text) and JSONB (binary, parsed). Prefer JSONB — it is faster to query, supports indexing (GIN), and has rich operators (-> returns JSON, ->> returns text, @> tests containment). It lets you mix relational and flexible schema-less data in one database, useful for settings, metadata, or semi-structured payloads — without giving up SQL.',
          hinglish:
            'Postgres JSON ko do types mein store kar sakta hai: JSON (exact text rakhta hai) aur JSONB (binary, parsed). JSONB prefer karo — ye query mein faster hai, indexing (GIN) support karta hai, aur rich operators rakhta hai (-> JSON deta hai, ->> text deta hai, @> containment test karta hai). Ye relational aur flexible schema-less data ko ek hi database mein mix karne deta hai, settings, metadata, ya semi-structured payloads ke liye useful — bina SQL chhode.',
        },
        dailyLifeExample:
          'JSONB ek form ke "extra details" wale free-text box jaisa hai — structured columns ke saath ek flexible jagah jahan jo chaaho daal do, aur usme bhi search kar sako.',
        codeExample:
          "-- details JSONB column\nINSERT INTO products (name, details)\nVALUES ('Phone', '{\"brand\": \"Acme\", \"specs\": {\"ram\": 8}}');\n\nSELECT name,\n       details ->> 'brand'        AS brand,   -- text\n       details -> 'specs' ->> 'ram' AS ram\nFROM products\nWHERE details @> '{\"brand\": \"Acme\"}';        -- containment\n\nCREATE INDEX idx_details ON products USING GIN (details);",
        keyPoints: [
          'JSONB (binary) is preferred over JSON (text)',
          'Operators: -> (json), ->> (text), @> (contains)',
          'Supports GIN indexing for fast JSON queries',
          'Mix relational + flexible data in one DB',
        ],
        quiz: [
          {
            question: 'Which JSON type should you usually use in Postgres?',
            options: ['JSON', 'JSONB', 'TEXT', 'BLOB'],
            correctIndex: 1,
          },
          {
            question: 'The ->> operator returns a JSON value as…',
            options: ['JSON', 'text', 'a number', 'NULL'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Transactions & ACID',
        difficulty: 'hard',
        tags: ['transactions', 'acid'],
        explanation: {
          english:
            'A transaction groups multiple statements so they all succeed or all fail together (BEGIN ... COMMIT, or ROLLBACK to undo). This guarantees ACID: Atomicity (all-or-nothing), Consistency (constraints hold), Isolation (concurrent transactions do not corrupt each other), Durability (committed data survives crashes). The classic example is a money transfer: debit one account and credit another must both happen or neither.',
          hinglish:
            'Transaction multiple statements ko group karta hai taaki ye sab saath succeed ya saath fail hon (BEGIN ... COMMIT, ya undo ke liye ROLLBACK). Ye ACID guarantee karta hai: Atomicity (all-or-nothing), Consistency (constraints bane rahein), Isolation (concurrent transactions ek doosre ko corrupt na karein), Durability (committed data crash ke baad bhi survive kare). Classic example money transfer hai: ek account debit aur doosra credit dono hon ya koi na ho.',
        },
        dailyLifeExample:
          'Transaction paise transfer jaisa hai — A se kate aur B mein jude, dono hon ya koi na ho. Beech mein bijli chali jaaye to paisa gayab nahi hona chahiye (atomicity).',
        codeExample:
          "BEGIN;\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;        -- both applied together\n\n-- If anything goes wrong before COMMIT:\n-- ROLLBACK;   -- undoes everything in the transaction",
        keyPoints: [
          'Group statements: all succeed or all fail',
          'BEGIN ... COMMIT; ROLLBACK to undo',
          'ACID: Atomicity, Consistency, Isolation, Durability',
          'Essential for money transfers & multi-step writes',
        ],
        quiz: [
          {
            question: 'What does ROLLBACK do?',
            options: ['saves changes', 'undoes the transaction', 'creates a table', 'adds an index'],
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
            question: 'What are ACID properties and why do they matter?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                'ACID guarantees reliable transactions. Atomicity: a transaction is all-or-nothing — partial changes never persist. Consistency: it moves the database from one valid state to another, respecting constraints. Isolation: concurrent transactions behave as if run sequentially, so they do not see each other\'s half-finished work (controlled by isolation levels). Durability: once committed, data survives crashes/power loss. They matter for correctness in systems like banking, e-commerce, and inventory where partial or conflicting writes would corrupt data.',
              hinglish:
                'ACID reliable transactions guarantee karta hai. Atomicity: transaction all-or-nothing — partial changes kabhi persist nahi hote. Consistency: ye database ko ek valid state se doosre valid state mein le jaata hai, constraints respect karke. Isolation: concurrent transactions aise behave karte hain jaise sequentially chale hon, to ek doosre ka half-finished kaam nahi dekhte (isolation levels se control). Durability: commit hone ke baad data crash/power loss ke baad bhi survive karta hai. Ye banking, e-commerce, inventory jaise systems mein correctness ke liye matter karte hain jahan partial ya conflicting writes data corrupt kar dein.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Advanced PostgreSQL',
    level: 'advanced',
    description: 'Window functions, views, performance aur normalization.',
    concepts: [
      {
        title: 'Window Functions',
        difficulty: 'hard',
        tags: ['window-functions', 'analytics'],
        explanation: {
          english:
            'Window functions compute across a set of rows related to the current row WITHOUT collapsing them into one (unlike GROUP BY). Using OVER (PARTITION BY ... ORDER BY ...) you get running totals, rankings (ROW_NUMBER, RANK, DENSE_RANK), moving averages, and comparisons to previous/next rows (LAG, LEAD). They are the go-to tool for analytics like "rank products within each category" while keeping every row visible.',
          hinglish:
            'Window functions current row se related rows ke set pe compute karte hain bina unhe ek mein collapse kiye (GROUP BY ke ulat). OVER (PARTITION BY ... ORDER BY ...) se tumhe running totals, rankings (ROW_NUMBER, RANK, DENSE_RANK), moving averages, aur previous/next rows se comparison (LAG, LEAD) milte hain. Ye analytics ke liye go-to tool hain jaise "har category ke andar products ko rank karo" jabki har row visible rahe.',
        },
        dailyLifeExample:
          'Window function class mein har student ka rank dikhane jaisa hai jabki sabke marks bhi dikhte rahein — GROUP BY sirf ek summary deta, window har row ke saath rank bhi deta hai.',
        codeExample:
          "-- Rank products by price within each category\nSELECT name, category, price,\n       RANK() OVER (PARTITION BY category ORDER BY price DESC) AS rnk\nFROM products;\n\n-- Running total of sales over time\nSELECT day, amount,\n       SUM(amount) OVER (ORDER BY day) AS running_total\nFROM daily_sales;",
        keyPoints: [
          'Compute across related rows without collapsing them',
          'OVER (PARTITION BY ... ORDER BY ...)',
          'ROW_NUMBER/RANK/DENSE_RANK, LAG/LEAD, running totals',
          'Ideal for rankings & running analytics',
        ],
        quiz: [
          {
            question: 'Unlike GROUP BY, window functions…',
            options: ['delete rows', 'keep every row while computing across a window', 'create tables', 'add indexes'],
            correctIndex: 1,
          },
          {
            question: 'Which gives a running total?',
            options: ['COUNT(*)', 'SUM(amount) OVER (ORDER BY day)', 'GROUP BY day', 'LIMIT'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Views & Materialized Views',
        difficulty: 'medium',
        tags: ['views', 'materialized-view'],
        explanation: {
          english:
            'A VIEW is a saved query you can use like a table — it runs fresh each time, so it is always up to date but adds no speed. A MATERIALIZED VIEW stores the query result physically, so reads are fast, but the data is a snapshot you must REFRESH to update. Use views to simplify and reuse complex queries; use materialized views to cache expensive aggregations/reports that do not need to be real-time.',
          hinglish:
            'VIEW ek saved query hai jise tum table ki tarah use kar sakte ho — ye har baar fresh chalti hai, isliye hamesha up to date par koi speed nahi badhti. MATERIALIZED VIEW query result ko physically store karta hai, isliye reads fast, par data ek snapshot hai jise update karne ke liye REFRESH karna padta hai. Complex queries simplify/reuse karne ke liye views; mehnge aggregations/reports cache karne ke liye materialized views jinhe real-time nahi chahiye.',
        },
        dailyLifeExample:
          'View ek live dashboard jaisa hai (hamesha fresh, par har baar calculate). Materialized view ek printed report jaisa hai (turant padho, par refresh karne tak purana).',
        codeExample:
          'CREATE VIEW paid_orders AS\n  SELECT * FROM orders WHERE status = \'paid\';\n\nSELECT * FROM paid_orders;  -- use it like a table (always fresh)\n\nCREATE MATERIALIZED VIEW sales_by_city AS\n  SELECT city, SUM(amount) AS total FROM orders GROUP BY city;\n\nREFRESH MATERIALIZED VIEW sales_by_city;  -- update the snapshot',
        keyPoints: [
          'VIEW: saved query, always fresh, no speed gain',
          'MATERIALIZED VIEW: stored result, fast reads',
          'Materialized data is a snapshot — REFRESH to update',
          'Views simplify; materialized views cache reports',
        ],
        quiz: [
          {
            question: 'A materialized view differs from a view because it…',
            options: ['is always live', 'stores the result physically (needs REFRESH)', 'cannot be queried', 'is slower to read'],
            correctIndex: 1,
          },
          {
            question: 'A plain VIEW is…',
            options: ['a cached snapshot', 'a saved query that runs fresh each time', 'an index', 'a backup'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Query Performance & EXPLAIN',
        difficulty: 'hard',
        tags: ['performance', 'explain'],
        explanation: {
          english:
            'EXPLAIN shows the query planner\'s execution plan; EXPLAIN ANALYZE actually runs it and reports real timings. Look for "Seq Scan" on large tables (often a missing index), high-cost steps, and bad row estimates. Tuning tactics: add the right indexes, avoid SELECT *, filter early, watch N+1 query patterns from ORM code, and keep statistics fresh with ANALYZE. Measure with EXPLAIN ANALYZE before and after — do not guess.',
          hinglish:
            'EXPLAIN query planner ka execution plan dikhata hai; EXPLAIN ANALYZE use actually chala kar real timings deta hai. Bade tables pe "Seq Scan" (aksar missing index), high-cost steps, aur galat row estimates dhoondho. Tuning tactics: sahi indexes add karo, SELECT * avoid karo, jaldi filter karo, ORM code ke N+1 query patterns pe dhyan do, aur ANALYZE se statistics fresh rakho. EXPLAIN ANALYZE se pehle aur baad measure karo — guess mat karo.',
        },
        dailyLifeExample:
          'EXPLAIN Google Maps ke route preview jaisa hai — chalne se pehle dikhata hai kaunsa raasta lega aur kitna time lagega, taaki tum better route (index) choose kar sako.',
        codeExample:
          'EXPLAIN ANALYZE\nSELECT * FROM orders WHERE user_id = 42;\n\n-- Watch for: "Seq Scan" on big tables -> add an index\n-- "Index Scan" using idx_orders_user -> good\n\nANALYZE orders;  -- refresh planner statistics',
        keyPoints: [
          'EXPLAIN = plan; EXPLAIN ANALYZE = real timings',
          'Seq Scan on big tables often means a missing index',
          'Avoid SELECT *, filter early, fix N+1 queries',
          'Measure before & after — never guess',
        ],
        quiz: [
          {
            question: 'Which command shows actual run-time of a query?',
            options: ['EXPLAIN', 'EXPLAIN ANALYZE', 'DESCRIBE', 'SHOW'],
            correctIndex: 1,
          },
          {
            question: 'A "Seq Scan" on a large table often indicates…',
            options: ['a good plan', 'a missing/unused index', 'a backup', 'a transaction'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Normalization',
        difficulty: 'medium',
        tags: ['normalization', 'design'],
        explanation: {
          english:
            'Normalization organises tables to reduce redundancy and avoid update anomalies. 1NF: atomic values, no repeating groups. 2NF: no partial dependency on part of a composite key. 3NF: no transitive dependency (non-key columns depend only on the key). The practical goal is "each fact stored once". Denormalization (deliberately duplicating data) is sometimes used to speed up reads — a trade-off you make consciously.',
          hinglish:
            'Normalization tables ko aise organise karta hai ki redundancy kam ho aur update anomalies na hon. 1NF: atomic values, no repeating groups. 2NF: composite key ke part pe partial dependency nahi. 3NF: transitive dependency nahi (non-key columns sirf key pe depend karein). Practical goal hai "har fact ek hi baar store ho". Denormalization (jaan-boojh kar data duplicate karna) kabhi-kabhi reads tez karne ke liye use hota hai — ek conscious trade-off.',
        },
        dailyLifeExample:
          'Normalization har customer ka address ek hi jagah rakhne jaisa hai — har order mein dobara likhne ke bajaye customer table mein ek baar. Address badle to ek hi jagah update.',
        codeExample:
          '-- Un-normalised: order repeats customer details (redundant)\n-- orders(id, customer_name, customer_city, item, ...)\n\n-- Normalised: separate, linked tables\n-- customers(id, name, city)\n-- orders(id, customer_id REFERENCES customers(id), item, ...)\n-- Each customer fact stored ONCE; join when needed.',
        keyPoints: [
          'Reduce redundancy & update anomalies',
          '1NF atomic, 2NF no partial dep, 3NF no transitive dep',
          'Goal: each fact stored once',
          'Denormalize deliberately to speed reads (trade-off)',
        ],
        quiz: [
          {
            question: 'The main goal of normalization is to…',
            options: ['duplicate data', 'reduce redundancy & store each fact once', 'remove all tables', 'add indexes'],
            correctIndex: 1,
          },
          {
            question: 'Deliberately duplicating data to speed up reads is called…',
            options: ['normalization', 'denormalization', 'indexing', 'sharding'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What are the main differences between PostgreSQL and MySQL?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Both are popular open-source relational databases. PostgreSQL is object-relational with stronger standards compliance, richer types (JSONB, arrays, custom types), advanced features (window functions, CTEs, full-text search, extensions like pgvector), and is often preferred for complex queries and data integrity. MySQL is historically simpler and very fast for read-heavy web workloads, with wide hosting support. Choose Postgres for complex/analytical workloads and strict integrity; MySQL for simple, high-read apps — though the gap has narrowed.',
      hinglish:
        'Dono popular open-source relational databases hain. PostgreSQL object-relational hai stronger standards compliance, richer types (JSONB, arrays, custom types), advanced features (window functions, CTEs, full-text search, pgvector jaise extensions) ke saath, aur complex queries aur data integrity ke liye aksar preferred. MySQL historically simpler aur read-heavy web workloads ke liye bahut fast hai, wide hosting support ke saath. Complex/analytical workloads aur strict integrity ke liye Postgres; simple, high-read apps ke liye MySQL — par gap ab kam ho gaya hai.',
    },
  },
  {
    question: 'What is a primary key vs a foreign key?',
    difficulty: 'easy',
    frequency: 'very-common',
    answer: {
      english:
        'A primary key uniquely identifies each row in a table — it must be unique and not null, and there is one per table (it can be composite). A foreign key is a column (or set) in one table that references the primary key of another, enforcing referential integrity — you cannot insert an order for a user that does not exist, and Postgres can cascade or restrict deletes. Primary keys are about identity; foreign keys are about relationships between tables.',
      hinglish:
        'Primary key har row ko table mein uniquely identify karti hai — ye unique aur not null honi chahiye, aur table mein ek hoti hai (composite ho sakti hai). Foreign key ek table ka column (ya set) hai jo doosri table ki primary key ko reference karta hai, referential integrity enforce karke — tum aise user ka order insert nahi kar sakte jo exist hi na kare, aur Postgres deletes ko cascade ya restrict kar sakta hai. Primary keys identity ke baare mein hain; foreign keys tables ke beech relationships ke baare mein.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
