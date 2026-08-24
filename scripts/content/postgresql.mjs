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
  icon: 'database',
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
            frequency: 'common',
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
            frequency: 'common',
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
      {
        title: "Arrays: PostgreSQL's Native List Type",
        difficulty: 'medium',
        tags: ['arrays', 'postgresql-specific'],
        explanation: {
          english:
            "Unlike most relational databases, PostgreSQL lets a single column store an ARRAY of values directly — int[], text[], and so on — instead of always needing a separate linking table for one-to-many data. This is convenient for simple lists (like tags on a post) where a full join table would be overkill. Use ARRAY[...] or '{...}' syntax to build one, the ANY() function to check if a value is in the array, and the @> containment operator to check if an array contains another array.",
          hinglish:
            "Zyadatar relational databases ke ulat, PostgreSQL ek single column mein VALUES ka ARRAY seedha store karne deta hai — int[], text[], waghera — hamesha ek alag linking table banaye bina one-to-many data ke liye. Ye simple lists ke liye convenient hai (jaise ek post pe tags) jaha poora join table overkill hoga. ARRAY[...] ya '{...}' syntax se ek banao, ANY() function se check karo ki koi value array mein hai ya nahi, aur @> containment operator se check karo ki ek array doosre array ko contain karta hai ya nahi.",
        },
        dailyLifeExample:
          "Ek normal relational table mein tags rakhna ek alag 'tags' file cabinet banane jaisa hai jo har post se linked ho. PostgreSQL array ek hi index card pe seedha 'tags: javascript, react, tutorial' likh dena hai — chhoti, simple lists ke liye kaafi hai.",
        codeExample:
          "CREATE TABLE posts (\n  id SERIAL PRIMARY KEY,\n  title TEXT,\n  tags TEXT[]  -- an array column!\n);\n\nINSERT INTO posts (title, tags)\nVALUES ('Learn SQL', ARRAY['sql', 'database', 'beginner']);\n\n-- or with curly-brace syntax\nINSERT INTO posts (title, tags)\nVALUES ('Learn Postgres', '{postgres, sql, advanced}');\n\n-- find posts tagged 'sql'\nSELECT title FROM posts WHERE 'sql' = ANY(tags);\n\n-- find posts that have BOTH 'sql' and 'beginner' tags\nSELECT title FROM posts WHERE tags @> ARRAY['sql', 'beginner'];\n\n-- get the array's length\nSELECT title, array_length(tags, 1) FROM posts;",
        keyPoints: [
          'PostgreSQL supports array columns directly: int[], text[], etc.',
          "Build an array with ARRAY[...] or the '{...}' curly-brace literal syntax",
          'value = ANY(array_column) checks if a value exists in the array',
          'array_column @> ARRAY[...] checks if the array contains ALL the given values',
          'Best for simple, small lists — a proper join table is still better for complex relational data',
        ],
        quiz: [
          {
            question: 'What does the array column type let you avoid for simple list data?',
            options: ['Using SQL at all', 'Creating a separate linking/join table for simple one-to-many lists', 'Using WHERE clauses', 'Using PRIMARY KEY'],
            correctIndex: 1,
          },
          {
            question: "What does WHERE 'sql' = ANY(tags) check?",
            options: ["Whether ALL elements in tags equal 'sql'", "Whether 'sql' exists ANYWHERE in the tags array", 'Whether tags is empty', 'Whether tags has exactly one element'],
            correctIndex: 1,
          },
          {
            question: 'What does the @> operator check between two arrays?',
            options: ['If they are exactly equal', 'If the left array contains all elements of the right array', 'If they have the same length', 'If either array is empty'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'UPSERT: INSERT ... ON CONFLICT',
        difficulty: 'hard',
        tags: ['upsert', 'on-conflict', 'postgresql-specific'],
        explanation: {
          english:
            "UPSERT means 'insert, or update if it already exists' — a very common need (like a page-view counter, or syncing external data) that would otherwise take a slow, race-condition-prone check-then-insert-or-update dance. PostgreSQL's ON CONFLICT clause makes this ONE atomic statement: try to INSERT, and if it violates a unique constraint (like a duplicate primary key), instead run the UPDATE you specify with DO UPDATE SET ..., or simply do nothing with DO NOTHING. The special row EXCLUDED refers to the value that FAILED to insert, letting you use it in the UPDATE.",
          hinglish:
            "UPSERT ka matlab hai 'insert karo, ya agar pehle se hai to update karo' — ek bahut common zaroorat (jaise ek page-view counter, ya external data sync karna) jo warna ek slow, race-condition-prone check-then-insert-or-update dance leti. PostgreSQL ka ON CONFLICT clause ise EK atomic statement bana deta hai: INSERT try karo, aur agar ye ek unique constraint violate kare (jaise duplicate primary key), to iske bajaye UPDATE chalao jo tumne DO UPDATE SET ... se specify kiya, ya bas kuch mat karo DO NOTHING se. Special row EXCLUDED us value ko refer karta hai jo insert hone mein FAIL hui, jisse tum use UPDATE mein use kar sakte ho.",
        },
        dailyLifeExample:
          'UPSERT ek attendance register jaisa hai — agar naam pehli baar likh rahe ho to nayi entry banao, agar naam pehle se hai to bas uska count +1 kar do — ek hi command mein, bina pehle check kiye ki naam hai ya nahi.',
        codeExample:
          "CREATE TABLE page_views (\n  page_url TEXT PRIMARY KEY,\n  views INT DEFAULT 1\n);\n\n-- UPSERT: insert if new, increment if it already exists — ONE atomic statement\nINSERT INTO page_views (page_url, views)\nVALUES ('/home', 1)\nON CONFLICT (page_url)\nDO UPDATE SET views = page_views.views + 1;\n\n-- ON CONFLICT DO NOTHING — just skip if it already exists\nINSERT INTO page_views (page_url, views)\nVALUES ('/about', 1)\nON CONFLICT (page_url) DO NOTHING;\n\n-- EXCLUDED refers to the row that failed to insert\nINSERT INTO users (email, name)\nVALUES ('aman@example.com', 'Aman')\nON CONFLICT (email)\nDO UPDATE SET name = EXCLUDED.name; -- update name to the NEW value that was attempted",
        keyPoints: [
          'UPSERT = insert if new, update if it already exists',
          'ON CONFLICT (column) triggers when a unique/primary key constraint would be violated',
          'DO UPDATE SET ... updates the existing row instead of failing; DO NOTHING just skips it',
          'EXCLUDED.column refers to the value that was attempted in the failed INSERT',
          'This is ONE atomic statement — no race condition between a separate check and insert/update',
        ],
        quiz: [
          {
            question: "What problem does ON CONFLICT solve compared to manually checking 'does this row exist' before inserting or updating?",
            options: ['It makes queries prettier', 'It does the check-and-insert-or-update as ONE atomic statement, avoiding race conditions between separate check/insert/update steps', 'It only works with SELECT', 'It deletes duplicate rows automatically'],
            correctIndex: 1,
          },
          {
            question: 'What does EXCLUDED refer to inside an ON CONFLICT ... DO UPDATE clause?',
            options: ['The row that was already in the table', 'The new row/value that was attempted in the INSERT but conflicted', 'A deleted row', 'The primary key column only'],
            correctIndex: 1,
          },
          {
            question: 'What does ON CONFLICT (page_url) DO NOTHING do if the page_url already exists?',
            options: ['Throws an error', 'Silently skips the insert, leaving the existing row unchanged', 'Deletes the existing row', 'Always inserts a duplicate'],
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
    frequency: 'common',
    answer: {
      english:
        'A primary key uniquely identifies each row in a table — it must be unique and not null, and there is one per table (it can be composite). A foreign key is a column (or set) in one table that references the primary key of another, enforcing referential integrity — you cannot insert an order for a user that does not exist, and Postgres can cascade or restrict deletes. Primary keys are about identity; foreign keys are about relationships between tables.',
      hinglish:
        'Primary key har row ko table mein uniquely identify karti hai — ye unique aur not null honi chahiye, aur table mein ek hoti hai (composite ho sakti hai). Foreign key ek table ka column (ya set) hai jo doosri table ki primary key ko reference karta hai, referential integrity enforce karke — tum aise user ka order insert nahi kar sakte jo exist hi na kare, aur Postgres deletes ko cascade ya restrict kar sakta hai. Primary keys identity ke baare mein hain; foreign keys tables ke beech relationships ke baare mein.',
    },
  },

  // ─── PostgreSQL Fundamentals ───────────────────────────────────────────
  {
    question: 'What distinguishes PostgreSQL from MySQL?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PostgreSQL is an object-relational database prioritising standards compliance and extensibility: richer types (arrays, JSONB, ranges, custom types), full support for window functions and CTEs, true MVCC without read locks, partial and expression indexes, and the ability to write functions in multiple languages. MySQL historically prioritised raw read speed and simplicity. The gap has narrowed considerably, but Postgres remains the stronger choice for complex queries, data integrity, and advanced features, while MySQL retains an edge in some simple high-read workloads.',
      hinglish:
        'PostgreSQL ek object-relational database hai jo standards compliance aur extensibility ko priority deta hai: richer types (arrays, JSONB, ranges, custom types), window functions aur CTEs ka full support, bina read locks ke true MVCC, partial aur expression indexes, aur multiple languages mein functions likhne ki ability. MySQL historically raw read speed aur simplicity ko priority deta tha. Gap kaafi kam ho gaya hai, par Postgres complex queries, data integrity, aur advanced features ke liye stronger choice bana hua hai, jabki MySQL kuch simple high-read workloads mein ek edge rakhta hai.',
    },
  },
  {
    question: 'What is JSONB and how does it differ from JSON in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The JSON type stores an exact TEXT copy — preserving whitespace, key order, and duplicate keys — and must be re-parsed on every access. JSONB stores a decomposed BINARY format: slightly slower to write, but far faster to query, and crucially it supports INDEXING via GIN. JSONB also normalises the data, removing duplicate keys and not preserving key order. For virtually all real use cases you want JSONB; JSON is only right when you must reproduce the original document byte-for-byte.',
      hinglish:
        'JSON type ek exact TEXT copy store karta hai — whitespace, key order, aur duplicate keys preserve karte hue — aur har access pe re-parse hona padta hai. JSONB ek decomposed BINARY format store karta hai: likhne mein thoda slower, par query karne mein bahut faster, aur crucially ye GIN se INDEXING support karta hai. JSONB data normalise bhi karta hai, duplicate keys hataate hue aur key order preserve na karte hue. Virtually saare real use cases ke liye tumhe JSONB chahiye; JSON sirf tab sahi hai jab tumhe original document byte-for-byte reproduce karna ho.',
    },
  },
  {
    question: 'What index types does PostgreSQL support?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'B-TREE is the default, serving equality and range queries and ordering. HASH handles only equality but can be slightly faster for it. GIN (Generalised Inverted Index) suits values containing multiple components — JSONB keys, array elements, full-text search — and is the reason JSONB querying is fast. GIST supports geometric and range types and nearest-neighbour searches. BRIN is tiny and suits very large tables where values correlate with physical order, such as append-only time-series data.',
      hinglish:
        'B-TREE default hai, equality aur range queries aur ordering serve karta hai. HASH sirf equality handle karta hai par uske liye thoda faster ho sakta hai. GIN (Generalised Inverted Index) un values ko suit karta hai jinme multiple components hain — JSONB keys, array elements, full-text search — aur yahi wajah hai ki JSONB querying fast hai. GIST geometric aur range types aur nearest-neighbour searches support karta hai. BRIN bahut chhota hai aur un bahut bade tables ko suit karta hai jahan values physical order se correlate karti hain, jaise append-only time-series data.',
    },
  },
  {
    question: 'What is a partial index and when is it useful?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A partial index indexes only rows matching a WHERE condition — `CREATE INDEX ... ON orders(created_at) WHERE status = \'pending\'`. It is useful when queries consistently target a small subset: if 2% of orders are pending, the index is tiny, fits in memory, and is far cheaper to maintain on writes than a full index. It also enforces conditional uniqueness elegantly, such as allowing only one active record per user while permitting many inactive ones.',
      hinglish:
        'Ek partial index sirf ek WHERE condition se match karti rows index karta hai — `CREATE INDEX ... ON orders(created_at) WHERE status = \'pending\'`. Ye tab useful hai jab queries consistently ek chhote subset ko target karein: agar 2% orders pending hain, index bahut chhota hai, memory mein fit hota hai, aur ek full index se writes pe maintain karna bahut sasta hai. Ye conditional uniqueness bhi elegantly enforce karta hai, jaise per user sirf ek active record allow karna jabki bahut inactive permit karna.',
    },
  },
  {
    question: 'What is VACUUM and why does PostgreSQL need it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Because of MVCC, an UPDATE does not overwrite a row — it writes a new version and marks the old one dead. Those dead tuples accumulate as bloat, wasting space and slowing scans. VACUUM reclaims them for reuse; VACUUM FULL rewrites the table to return space to the OS but takes an exclusive lock. VACUUM also updates statistics for the planner and prevents transaction ID wraparound, which would otherwise be catastrophic. Autovacuum normally handles this, but it can fall behind on very write-heavy tables.',
      hinglish:
        'MVCC ki wajah se, ek UPDATE ek row overwrite nahi karta — ye ek naya version likhta hai aur purane ko dead mark karta hai. Wo dead tuples bloat ke roop mein jama hote hain, space waste karte hue aur scans slow karte hue. VACUUM unhe reuse ke liye reclaim karta hai; VACUUM FULL table rewrite karke space OS ko wapas deta hai par ek exclusive lock leta hai. VACUUM planner ke liye statistics bhi update karta hai aur transaction ID wraparound rokta hai, jo warna catastrophic hota. Autovacuum normally ise handle karta hai, par bahut write-heavy tables pe peeche reh sakta hai.',
    },
  },
  {
    question: 'What are CTEs and when should you use them?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A CTE (Common Table Expression, the `WITH` clause) defines a named temporary result set used within a single query. It makes complex queries dramatically more readable by naming intermediate steps rather than nesting subqueries several levels deep, and RECURSIVE CTEs can traverse hierarchies such as org charts or category trees. Note that before Postgres 12 a CTE was an optimisation fence (always materialised); since then they can be inlined, with `MATERIALIZED` available to force the old behaviour.',
      hinglish:
        'Ek CTE (Common Table Expression, `WITH` clause) ek named temporary result set define karta hai jo ek single query ke andar use hota hai. Ye complex queries ko dramatically zyada readable banata hai intermediate steps ko naam dekar, subqueries ko kai levels deep nest karne ke bajaye, aur RECURSIVE CTEs org charts ya category trees jaisi hierarchies traverse kar sakte hain. Note karo ki Postgres 12 se pehle ek CTE ek optimisation fence tha (hamesha materialised); tab se wo inline ho sakte hain, purana behaviour force karne ke liye `MATERIALIZED` available hai.',
    },
  },
  {
    question: 'What is a recursive CTE?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A recursive CTE queries hierarchical data of unknown depth. It has two parts joined by UNION: a base case (the starting rows, such as top-level categories) and a recursive term that references the CTE itself to fetch the next level, repeating until it returns no rows. It is the standard way to walk an org chart, a category tree, a threaded comment structure, or a graph path in pure SQL. Always guard against cycles, since a cyclic graph will otherwise loop forever.',
      hinglish:
        'Ek recursive CTE unknown depth ka hierarchical data query karta hai. Iske do parts UNION se jude hote hain: ek base case (starting rows, jaise top-level categories) aur ek recursive term jo agla level fetch karne ke liye CTE ko khud reference karta hai, tab tak repeat karte hue jab tak wo koi rows na de. Ye ek org chart, ek category tree, ek threaded comment structure, ya pure SQL mein ek graph path chalne ka standard tareeka hai. Cycles se hamesha guard karo, kyunki ek cyclic graph warna hamesha loop karega.',
    },
  },
  {
    question: 'What are window functions and how do they differ from GROUP BY?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'GROUP BY COLLAPSES rows into one row per group, so you lose the individual rows. A window function computes across a set of related rows while KEEPING every row — you get both the detail and the aggregate side by side. That is what allows "each employee\'s salary alongside their department average", or a running total, or a rank within a partition. Common ones: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, and any aggregate used with OVER.',
      hinglish:
        'GROUP BY rows ko per group ek row mein COLLAPSE karta hai, isliye tum individual rows kho dete ho. Ek window function related rows ke ek set ke across compute karta hai jabki HAR row rakhta hai — tumhe detail aur aggregate dono saath milte hain. Yahi "har employee ki salary uske department average ke saath", ya ek running total, ya ek partition ke andar ek rank allow karta hai. Common wale: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, aur OVER ke saath use hua koi bhi aggregate.',
    },
  },
  {
    question: 'What is the difference between RANK, DENSE_RANK, and ROW_NUMBER?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'All three number rows within a partition but handle TIES differently. ROW_NUMBER always assigns a unique sequential number, breaking ties arbitrarily (1,2,3,4). RANK gives tied rows the same rank and then SKIPS numbers (1,2,2,4) — like competition ranking where two silver medals mean no bronze. DENSE_RANK gives ties the same rank without skipping (1,2,2,3). Use ROW_NUMBER for deduplication or pagination, RANK for genuine competitive ranking, DENSE_RANK when you want consecutive rank values.',
      hinglish:
        'Teeno ek partition ke andar rows number karte hain par TIES alag handle karte hain. ROW_NUMBER hamesha ek unique sequential number assign karta hai, ties ko arbitrarily todte hue (1,2,3,4). RANK tied rows ko same rank deta hai aur phir numbers SKIP karta hai (1,2,2,4) — competition ranking jaise jahan do silver medals matlab koi bronze nahi. DENSE_RANK ties ko same rank deta hai bina skip kiye (1,2,2,3). Deduplication ya pagination ke liye ROW_NUMBER use karo, genuine competitive ranking ke liye RANK, consecutive rank values chahiye to DENSE_RANK.',
    },
  },
  {
    question: 'What is UPSERT / ON CONFLICT in PostgreSQL?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`INSERT ... ON CONFLICT` handles the case where the row might already exist. `ON CONFLICT DO NOTHING` silently skips duplicates; `ON CONFLICT (col) DO UPDATE SET ...` updates the existing row instead, with the proposed values available as `EXCLUDED`. Its real value is ATOMICITY: the naive alternative of "SELECT then INSERT or UPDATE" has a race condition where two concurrent transactions both see no row and both insert. ON CONFLICT resolves this in a single atomic statement.',
      hinglish:
        '`INSERT ... ON CONFLICT` us case ko handle karta hai jahan row already exist kar sakti hai. `ON CONFLICT DO NOTHING` silently duplicates skip karta hai; `ON CONFLICT (col) DO UPDATE SET ...` uske bajaye existing row update karta hai, proposed values `EXCLUDED` ke roop mein available hote hue. Iski asli value ATOMICITY hai: "SELECT phir INSERT ya UPDATE" ka naive alternative ek race condition rakhta hai jahan do concurrent transactions dono koi row nahi dekhte aur dono insert karte hain. ON CONFLICT ise ek single atomic statement mein resolve karta hai.',
    },
  },
  {
    question: 'What are PostgreSQL array types?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Postgres allows any type to be an array column — `tags TEXT[]` — with operators for containment (`@>`), overlap (`&&`), and membership (`ANY`), plus GIN indexing for fast searches. It is genuinely useful for simple lists like tags where you never need to query or join on the individual elements. However, it should not replace a proper junction table when the elements are real entities with their own attributes, since arrays cannot have foreign keys and updating one element rewrites the whole array.',
      hinglish:
        'Postgres kisi bhi type ko ek array column banne deta hai — `tags TEXT[]` — containment (`@>`), overlap (`&&`), aur membership (`ANY`) ke operators ke saath, plus fast searches ke liye GIN indexing. Ye tags jaisi simple lists ke liye genuinely useful hai jahan tumhe kabhi individual elements pe query ya join nahi karna. Halaanki, ise ek proper junction table replace nahi karni chahiye jab elements apne attributes wale real entities hon, kyunki arrays ke foreign keys nahi ho sakte aur ek element update karna poora array rewrite karta hai.',
    },
  },
  {
    question: 'What is a materialized view in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A materialized view physically stores the result of a query, unlike a normal view which re-executes it every time. This makes expensive aggregations instant to read. The tradeoff is staleness: you must run `REFRESH MATERIALIZED VIEW` to update it, which by default takes an exclusive lock — `REFRESH ... CONCURRENTLY` avoids blocking readers but requires a unique index and is slower. Use them for dashboards and reports where data can be minutes old.',
      hinglish:
        'Ek materialized view ek query ka result physically store karta hai, ek normal view ke ulat jo use har baar dobara execute karta hai. Ye mehngi aggregations ko padhne mein instant banata hai. Tradeoff staleness hai: tumhe use update karne ke liye `REFRESH MATERIALIZED VIEW` chalana padta hai, jo default se ek exclusive lock leta hai — `REFRESH ... CONCURRENTLY` readers ko block karne se bachata hai par ek unique index chahta hai aur slower hai. Inhe dashboards aur reports ke liye use karo jahan data kuch minute purana ho sakta hai.',
    },
  },
  {
    question: 'What is table partitioning in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Declarative partitioning splits one logical table into physical child tables by RANGE (typically dates), LIST (region), or HASH. Benefits: the planner can PRUNE partitions so a query for last month scans only that partition; maintenance operates per partition, so dropping a year-old month is an instant DROP rather than a huge DELETE; and vacuum and index rebuilds work on smaller units. It is most valuable for large time-series tables, and the partition key must be chosen to match your dominant query filter.',
      hinglish:
        'Declarative partitioning ek logical table ko RANGE (typically dates), LIST (region), ya HASH se physical child tables mein split karta hai. Benefits: planner partitions PRUNE kar sakta hai taaki pichhle mahine ki ek query sirf us partition ko scan kare; maintenance per partition operate karta hai, isliye ek saal purana mahina drop karna ek huge DELETE ke bajaye ek instant DROP hai; aur vacuum aur index rebuilds chhoti units pe kaam karte hain. Ye bade time-series tables ke liye sabse valuable hai, aur partition key tumhare dominant query filter se match karne ke liye chuni jaani chahiye.',
    },
  },
  {
    question: 'How does full-text search work in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Postgres converts documents to `tsvector` (normalised lexemes with positions, after stemming and stop-word removal) and queries to `tsquery`, matching with the `@@` operator. Because "running" and "ran" both stem to "run", it matches semantically related word forms rather than exact strings. A GIN index on the tsvector makes this fast, and `ts_rank` orders results by relevance. It is genuinely sufficient for many applications, avoiding the operational burden of running a separate Elasticsearch cluster.',
      hinglish:
        'Postgres documents ko `tsvector` mein convert karta hai (stemming aur stop-word removal ke baad positions ke saath normalised lexemes) aur queries ko `tsquery` mein, `@@` operator se match karte hue. Kyunki "running" aur "ran" dono "run" pe stem hote hain, ye exact strings ke bajaye semantically related word forms match karta hai. tsvector pe ek GIN index ise fast banata hai, aur `ts_rank` results ko relevance se order karta hai. Ye bahut applications ke liye genuinely kaafi hai, ek separate Elasticsearch cluster chalane ka operational burden avoid karte hue.',
    },
  },
  {
    question: 'What is EXPLAIN ANALYZE and how do you read its output?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'EXPLAIN shows the planner\'s chosen plan with ESTIMATES; EXPLAIN ANALYZE actually executes the query and adds REAL timings and row counts. Read it inside-out, since inner nodes run first. The most valuable signal is a large gap between estimated and actual rows, which means statistics are stale and the planner is choosing badly. Also look for Seq Scan on large tables where an index should apply, expensive Sort or Hash nodes, and nested loops executed far more times than expected.',
      hinglish:
        'EXPLAIN planner ka chuna plan ESTIMATES ke saath dikhata hai; EXPLAIN ANALYZE query actually execute karta hai aur REAL timings aur row counts add karta hai. Ise andar se bahar padho, kyunki inner nodes pehle chalte hain. Sabse valuable signal estimated aur actual rows ke beech ek bada gap hai, jiska matlab statistics stale hain aur planner bura choose kar raha hai. Bade tables pe Seq Scan bhi dekho jahan ek index apply hona chahiye, mehnge Sort ya Hash nodes, aur expected se bahut zyada baar execute hue nested loops.',
    },
  },
  {
    question: 'What is connection pooling in PostgreSQL and why is PgBouncer common?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PostgreSQL uses one OS PROCESS per connection, each with meaningful memory overhead, so it degrades badly past a few hundred connections — far fewer than a busy application would naively open. PgBouncer sits in front as a lightweight pooler, multiplexing many client connections onto a small set of real ones. Transaction-mode pooling gives the best reuse but forbids session-level features like prepared statements and advisory locks, which is the main gotcha when adopting it.',
      hinglish:
        'PostgreSQL per connection ek OS PROCESS use karta hai, har ek meaningful memory overhead ke saath, isliye ye kuch sau connections ke baad buri tarah degrade karta hai — ek busy application ke naively kholne se bahut kam. PgBouncer aage ek lightweight pooler ki tarah baithta hai, bahut client connections ko real connections ke ek chhote set pe multiplex karte hue. Transaction-mode pooling best reuse deta hai par prepared statements aur advisory locks jaise session-level features forbid karta hai, jo ise adopt karte waqt main gotcha hai.',
    },
  },
  {
    question: 'How does replication work in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'STREAMING (physical) replication ships the write-ahead log from primary to standby, which replays it byte for byte — the standby is an exact copy, usable for read queries and failover, but you cannot replicate only part of a database. LOGICAL replication instead publishes row-level changes for chosen tables, so subscribers can differ in schema or version, enabling selective replication and major-version upgrades. Replication is ASYNCHRONOUS by default (fast, small data-loss window on failover) but can be made synchronous at a latency cost.',
      hinglish:
        'STREAMING (physical) replication write-ahead log ko primary se standby bhejti hai, jo use byte for byte replay karta hai — standby ek exact copy hai, read queries aur failover ke liye usable, par tum ek database ka sirf ek hissa replicate nahi kar sakte. LOGICAL replication uske bajaye chuni gayi tables ke liye row-level changes publish karti hai, isliye subscribers schema ya version mein differ kar sakte hain, selective replication aur major-version upgrades enable karte hue. Replication default se ASYNCHRONOUS hai (fast, failover pe chhota data-loss window) par latency ke cost pe synchronous banayi ja sakti hai.',
    },
  },
  {
    question: 'What is a sequence and how does SERIAL differ from IDENTITY?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A sequence is a separate database object generating unique increasing numbers, used for surrogate keys. SERIAL is legacy shorthand that creates an integer column plus a sequence and sets it as the default — but the sequence is a loosely-linked separate object, which causes ownership and permission awkwardness. IDENTITY (`GENERATED ALWAYS AS IDENTITY`) is the SQL-standard replacement, more tightly integrated and able to prevent manual inserts into the column. New schemas should prefer IDENTITY.',
      hinglish:
        'Ek sequence ek separate database object hai jo unique badhte numbers generate karta hai, surrogate keys ke liye use hota hai. SERIAL ek legacy shorthand hai jo ek integer column plus ek sequence banata hai aur use default set karta hai — par sequence ek loosely-linked separate object hai, jo ownership aur permission awkwardness cause karta hai. IDENTITY (`GENERATED ALWAYS AS IDENTITY`) SQL-standard replacement hai, zyada tightly integrated aur column mein manual inserts rok sakta hai. Naye schemas ko IDENTITY prefer karna chahiye.',
    },
  },
  {
    question: 'What are PostgreSQL extensions and which are commonly used?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Extensions add functionality without patching the server, installed with `CREATE EXTENSION`. Widely used ones: PGVECTOR for vector similarity search powering RAG and recommendations; POSTGIS for full geospatial support; PG_STAT_STATEMENTS for tracking query performance across the workload; UUID-OSSP for UUID generation; PG_TRGM for trigram-based fuzzy text matching; and TIMESCALEDB for time-series workloads. This extensibility is a major reason Postgres often replaces several specialised databases.',
      hinglish:
        'Extensions server ko patch kiye bina functionality add karte hain, `CREATE EXTENSION` se install hote hain. Widely used wale: PGVECTOR vector similarity search ke liye jo RAG aur recommendations power karta hai; POSTGIS full geospatial support ke liye; PG_STAT_STATEMENTS workload ke across query performance track karne ke liye; UUID-OSSP UUID generation ke liye; PG_TRGM trigram-based fuzzy text matching ke liye; aur TIMESCALEDB time-series workloads ke liye. Yahi extensibility ek major wajah hai ki Postgres aksar kai specialised databases replace kar deta hai.',
    },
  },
  {
    question: 'What is pgvector and why does it matter?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'pgvector adds a `vector` column type and similarity operators (cosine, L2, inner product) with HNSW and IVFFlat indexes, turning PostgreSQL into a usable vector database for embeddings. Its practical appeal is operational: you keep vectors alongside your relational data in ONE database, so a RAG query can filter on tenant, permissions, and date in the same statement as the similarity search, with one backup, one connection pool, and one transaction boundary — instead of running and syncing a separate vector store.',
      hinglish:
        'pgvector ek `vector` column type aur similarity operators (cosine, L2, inner product) HNSW aur IVFFlat indexes ke saath add karta hai, PostgreSQL ko embeddings ke liye ek usable vector database mein badalte hue. Iski practical appeal operational hai: tum vectors ko apne relational data ke saath EK database mein rakhte ho, isliye ek RAG query similarity search ke usi statement mein tenant, permissions, aur date pe filter kar sakti hai, ek backup, ek connection pool, aur ek transaction boundary ke saath — ek separate vector store chalane aur sync karne ke bajaye.',
    },
  },
  {
    question: 'What is the difference between a schema and a database in PostgreSQL?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A DATABASE is a fully isolated container — you cannot query across databases in a single statement without a foreign data wrapper, and each has its own connection. A SCHEMA is a namespace WITHIN a database, so tables in different schemas can be joined freely and share a connection and transaction. This makes schemas the right tool for organising a large application or implementing multi-tenancy with tenant isolation, while separate databases suit genuinely unrelated applications.',
      hinglish:
        'Ek DATABASE ek fully isolated container hai — tum ek foreign data wrapper ke bina ek single statement mein databases ke across query nahi kar sakte, aur har ek ka apna connection hai. Ek SCHEMA ek database ke ANDAR ek namespace hai, isliye different schemas ke tables freely join ho sakte hain aur ek connection aur transaction share karte hain. Isse schemas ek badi application organise karne ya tenant isolation ke saath multi-tenancy implement karne ka sahi tool ban jaate hain, jabki separate databases genuinely unrelated applications ko suit karte hain.',
    },
  },
  {
    question: 'What is Row-Level Security in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'RLS lets you attach policies to a table so the database itself filters which ROWS a user can see or modify, based on a condition such as `tenant_id = current_setting(\'app.tenant\')`. Its value is that enforcement happens in the DATABASE, not the application: even a SQL injection or a forgotten WHERE clause in application code cannot leak another tenant\'s rows. It is a strong foundation for multi-tenant systems, though policies add planning overhead and must be tested carefully.',
      hinglish:
        'RLS tumhe ek table pe policies attach karne deta hai taaki database khud filter kare ki ek user kaunsi ROWS dekh ya modify kar sakta hai, ek condition ke basis pe jaise `tenant_id = current_setting(\'app.tenant\')`. Iski value ye hai ki enforcement DATABASE mein hota hai, application mein nahi: ek SQL injection ya application code mein ek bhoola hua WHERE clause bhi doosre tenant ki rows leak nahi kar sakta. Ye multi-tenant systems ke liye ek strong foundation hai, chahe policies planning overhead add karti hain aur carefully test honi chahiye.',
    },
  },
  {
    question: 'What are the transaction isolation levels in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Postgres supports READ COMMITTED (the default — each statement sees a fresh snapshot, so non-repeatable reads are possible), REPEATABLE READ (the whole transaction sees one snapshot; notably Postgres also prevents phantom reads here, exceeding the standard\'s requirement), and SERIALIZABLE (full serialisability via Serializable Snapshot Isolation). Postgres accepts READ UNCOMMITTED syntactically but treats it as READ COMMITTED, since MVCC means dirty reads never occur. Higher levels can abort transactions with serialisation failures, so applications must retry.',
      hinglish:
        'Postgres READ COMMITTED (default — har statement ek fresh snapshot dekhta hai, isliye non-repeatable reads possible hain), REPEATABLE READ (poora transaction ek snapshot dekhta hai; notably Postgres yahan phantom reads bhi rokta hai, standard ki requirement se aage jaate hue), aur SERIALIZABLE (Serializable Snapshot Isolation se full serialisability) support karta hai. Postgres READ UNCOMMITTED ko syntactically accept karta hai par use READ COMMITTED ki tarah treat karta hai, kyunki MVCC matlab dirty reads kabhi hote hi nahi. Higher levels serialisation failures se transactions abort kar sakte hain, isliye applications ko retry karna padta hai.',
    },
  },
  {
    question: 'What is SELECT FOR UPDATE and when do you need it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`SELECT ... FOR UPDATE` locks the selected rows so no other transaction can modify them until yours commits. You need it for read-modify-write sequences where correctness depends on the value not changing in between — decrementing inventory, or claiming a job from a queue. Without it, two transactions can both read stock as 1 and both sell it. `FOR UPDATE SKIP LOCKED` is the idiomatic way to build a work queue, letting each worker grab a different unlocked row rather than blocking.',
      hinglish:
        '`SELECT ... FOR UPDATE` selected rows lock karta hai taaki koi doosra transaction unhe modify na kar sake jab tak tumhara commit na ho. Tumhe ye un read-modify-write sequences ke liye chahiye jahan correctness is pe depend karti hai ki value beech mein na badle — inventory decrement karna, ya ek queue se ek job claim karna. Iske bina, do transactions dono stock 1 padh sakte hain aur dono bech sakte hain. `FOR UPDATE SKIP LOCKED` ek work queue banane ka idiomatic tareeka hai, har worker ko block hone ke bajaye ek different unlocked row pakadne dete hue.',
    },
  },
  {
    question: 'What is the difference between TEXT, VARCHAR, and CHAR in PostgreSQL?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Unlike some databases, in Postgres there is NO performance difference between TEXT and VARCHAR — they share the same storage and implementation. VARCHAR(n) simply adds a length CONSTRAINT, which is a data-integrity choice rather than an optimisation. CHAR(n) is blank-padded to a fixed length and is almost always the wrong choice. Idiomatic Postgres advice: use TEXT by default, and VARCHAR(n) only when a genuine business rule caps the length.',
      hinglish:
        'Kuch databases ke ulat, Postgres mein TEXT aur VARCHAR ke beech KOI performance difference nahi hai — wo wahi storage aur implementation share karte hain. VARCHAR(n) simply ek length CONSTRAINT add karta hai, jo ek optimisation ke bajaye ek data-integrity choice hai. CHAR(n) ek fixed length tak blank-padded hota hai aur almost hamesha galat choice hai. Idiomatic Postgres advice: default se TEXT use karo, aur VARCHAR(n) sirf tab jab ek genuine business rule length cap kare.',
    },
  },
  {
    question: 'How do you handle time zones correctly in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Use TIMESTAMPTZ (timestamp with time zone) for anything representing a real moment in time. Despite the name it does not store a zone — it converts the input to UTC on write and renders it in the session time zone on read, which is exactly what you want. TIMESTAMP (without time zone) stores wall-clock text with no reference point, so the same value means different instants for different users. Reserve it for genuinely zone-less values like a birthday or a recurring 09:00 local opening time.',
      hinglish:
        'Kisi bhi aisi cheez ke liye TIMESTAMPTZ (timestamp with time zone) use karo jo time mein ek real moment represent kare. Naam ke bawajood ye ek zone store nahi karta — ye write pe input ko UTC mein convert karta hai aur read pe session time zone mein render karta hai, jo exactly wahi hai jo tum chahte ho. TIMESTAMP (without time zone) bina reference point ke wall-clock text store karta hai, isliye wahi value different users ke liye different instants matlab rakhti hai. Ise genuinely zone-less values ke liye reserve karo jaise ek birthday ya ek recurring 09:00 local opening time.',
    },
  },
  {
    question: 'What are common causes of slow queries in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Missing or unusable indexes (including a function applied to the indexed column). Stale STATISTICS causing the planner to misjudge row counts and pick a bad plan. Table BLOAT from insufficient vacuuming, making scans read far more pages than necessary. The N+1 pattern from an ORM. Fetching unnecessary columns or rows without LIMIT. Lock contention from long-running transactions. And insufficient work_mem forcing sorts and hashes to spill to disk. `pg_stat_statements` plus EXPLAIN ANALYZE will usually localise which applies.',
      hinglish:
        'Missing ya unusable indexes (indexed column pe apply kiya ek function included). Stale STATISTICS jo planner ko row counts galat aankne aur ek bura plan chunne pe majboor karti hain. Insufficient vacuuming se table BLOAT, scans ko zaroorat se bahut zyada pages padhwate hue. Ek ORM se N+1 pattern. Unnecessary columns ya bina LIMIT rows fetch karna. Long-running transactions se lock contention. Aur insufficient work_mem jo sorts aur hashes ko disk pe spill karwata hai. `pg_stat_statements` plus EXPLAIN ANALYZE usually localise kar dega ki kaunsa apply hota hai.',
    },
  },
  {
    question: 'What is MVCC in PostgreSQL and what are its consequences?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'MVCC keeps multiple versions of each row so readers never block writers and writers never block readers — a long analytical query sees a consistent snapshot while writes continue around it. Every transaction sees the version current when it began. The consequences are practical: an UPDATE writes a new row version rather than modifying in place, dead versions accumulate as bloat, and therefore VACUUM is not optional maintenance but a structural requirement of the design.',
      hinglish:
        'MVCC har row ke multiple versions rakhta hai taaki readers kabhi writers ko block na karein aur writers kabhi readers ko — ek lambi analytical query ek consistent snapshot dekhti hai jabki uske around writes chalte rehte hain. Har transaction wo version dekhta hai jo uske shuru hone pe current tha. Consequences practical hain: ek UPDATE in place modify karne ke bajaye ek naya row version likhta hai, dead versions bloat ke roop mein jama hote hain, aur isliye VACUUM optional maintenance nahi balki design ki ek structural requirement hai.',
    },
  },
  {
    question: 'What is the difference between INNER JOIN and LEFT JOIN with an example?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'INNER JOIN returns only rows with a match on both sides — joining customers to orders returns only customers who HAVE ordered. LEFT JOIN returns every row from the left table regardless, filling right-side columns with NULL where there is no match, so you also see customers with zero orders. This makes LEFT JOIN plus `WHERE orders.id IS NULL` the standard idiom for finding records that lack a related row — a query INNER JOIN cannot express at all.',
      hinglish:
        'INNER JOIN sirf wo rows return karta hai jinka dono sides pe match ho — customers ko orders se join karna sirf wo customers return karta hai jinhone order kiya HAI. LEFT JOIN left table ki har row return karta hai chahe kuch bhi ho, jahan match nahi wahan right-side columns NULL se bharte hue, isliye tum zero orders wale customers bhi dekhte ho. Isse LEFT JOIN plus `WHERE orders.id IS NULL` un records ko dhundhne ka standard idiom ban jaata hai jinke paas ek related row nahi — ek query jise INNER JOIN express hi nahi kar sakta.',
    },
  },
  {
    question: 'How do you paginate results efficiently in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'OFFSET/LIMIT is simple but degrades badly: `OFFSET 100000` still scans and discards 100,000 rows, so deep pages get progressively slower, and rows shifting between requests cause duplicates or skips. KEYSET (cursor) pagination instead filters on the last seen sorted value — `WHERE (created_at, id) < (?, ?) ORDER BY created_at DESC, id DESC LIMIT 20` — which uses the index directly and stays fast at any depth. The tradeoff is that you cannot jump to an arbitrary page number.',
      hinglish:
        'OFFSET/LIMIT simple hai par buri tarah degrade hota hai: `OFFSET 100000` abhi bhi 100,000 rows scan karke discard karta hai, isliye deep pages progressively slower hote hain, aur requests ke beech shift hoti rows duplicates ya skips cause karti hain. KEYSET (cursor) pagination uske bajaye aakhri dekhi sorted value pe filter karta hai — `WHERE (created_at, id) < (?, ?) ORDER BY created_at DESC, id DESC LIMIT 20` — jo index directly use karta hai aur kisi bhi depth pe fast rehta hai. Tradeoff ye hai ki tum ek arbitrary page number pe jump nahi kar sakte.',
    },
  },
  {
    question: 'What is a CHECK constraint and why prefer it over application validation alone?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A CHECK constraint enforces a boolean condition on every row — `CHECK (price > 0)` or `CHECK (end_date > start_date)`. The reason to have it in addition to application validation is that the database is the LAST line of defence: bugs, background jobs, admin scripts, migrations, and other services all write to the same tables, and only a constraint applies to every one of them. It also documents the invariant unambiguously in the schema itself.',
      hinglish:
        'Ek CHECK constraint har row pe ek boolean condition enforce karta hai — `CHECK (price > 0)` ya `CHECK (end_date > start_date)`. Ise application validation ke ALAWA rakhne ki wajah ye hai ki database defence ki AAKHRI line hai: bugs, background jobs, admin scripts, migrations, aur doosri services sab wahi tables likhte hain, aur sirf ek constraint un sab pe apply hota hai. Ye invariant ko schema mein hi unambiguously document bhi karta hai.',
    },
  },
  {
    question: 'What is the difference between UNION and UNION ALL?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Both stack the results of two queries vertically, requiring matching column counts and compatible types. UNION removes DUPLICATE rows, which requires sorting or hashing the entire result and is therefore noticeably more expensive. UNION ALL keeps everything, including duplicates, and is significantly faster. Since in many cases the inputs are already known to be disjoint, defaulting to UNION when you meant UNION ALL is a common and easily avoided performance mistake.',
      hinglish:
        'Dono do queries ke results ko vertically stack karte hain, matching column counts aur compatible types chahte hue. UNION DUPLICATE rows hataata hai, jiske liye poora result sort ya hash karna padta hai aur isliye ye noticeably zyada mehnga hai. UNION ALL sab kuch rakhta hai, duplicates included, aur significantly faster hai. Kyunki bahut cases mein inputs already disjoint pata hote hain, UNION ALL ka matlab hote hue UNION pe default karna ek common aur aasani se avoid hone wali performance mistake hai.',
    },
  },
  {
    question: 'What is a covering index (index-only scan)?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A covering index contains every column a query needs, so the database can answer entirely from the index without visiting the table — an INDEX ONLY SCAN, which is dramatically faster since it skips the random heap access. Postgres supports the INCLUDE clause to add non-key columns purely as payload. One Postgres caveat: because of MVCC it must still check visibility, so index-only scans only reach full speed when the visibility map is current, which is another reason vacuuming matters.',
      hinglish:
        'Ek covering index har wo column rakhta hai jo ek query ko chahiye, isliye database poori tarah index se answer de sakta hai bina table visit kiye — ek INDEX ONLY SCAN, jo dramatically faster hai kyunki ye random heap access skip karta hai. Postgres INCLUDE clause support karta hai purely payload ke roop mein non-key columns add karne ke liye. Ek Postgres caveat: MVCC ki wajah se use abhi bhi visibility check karni padti hai, isliye index-only scans full speed tabhi paate hain jab visibility map current ho, jo vacuuming ke matter karne ki ek aur wajah hai.',
    },
  },
  {
    question: 'What is the WAL and why is it fundamental?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The Write-Ahead Log records every change BEFORE it is applied to data files. That ordering is what makes durability possible: on commit, only the WAL must be flushed to disk, so the commit is fast, and after a crash Postgres replays the WAL to reconstruct anything not yet written to the data files. The same log also drives streaming replication and point-in-time recovery, which is why WAL configuration sits at the centre of both performance and backup strategy.',
      hinglish:
        'Write-Ahead Log har change ko data files pe apply hone se PEHLE record karta hai. Wahi ordering durability possible banata hai: commit pe, sirf WAL disk pe flush karna padta hai, isliye commit fast hai, aur ek crash ke baad Postgres WAL replay karke wo sab reconstruct karta hai jo abhi data files pe likha nahi gaya. Wahi log streaming replication aur point-in-time recovery bhi chalata hai, isiliye WAL configuration performance aur backup strategy dono ke centre mein baithta hai.',
    },
  },
  {
    question: 'What are the main PostgreSQL memory settings you would tune?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'SHARED_BUFFERS is Postgres\'s own cache, typically set to about 25% of RAM (the OS cache handles the rest). WORK_MEM is allocated PER sort or hash operation per connection, so it multiplies dangerously under concurrency — too low spills to disk, too high risks OOM. MAINTENANCE_WORK_MEM applies to VACUUM and index builds and can be much larger. EFFECTIVE_CACHE_SIZE does not allocate anything; it just tells the planner how much cache to assume, influencing index-versus-scan decisions.',
      hinglish:
        'SHARED_BUFFERS Postgres ka apna cache hai, typically RAM ke about 25% pe set (baaki OS cache handle karta hai). WORK_MEM per connection PER sort ya hash operation allocate hota hai, isliye ye concurrency mein khatarnak tarike se multiply hota hai — bahut low disk pe spill karta hai, bahut high OOM ka risk. MAINTENANCE_WORK_MEM VACUUM aur index builds pe apply hota hai aur bahut bada ho sakta hai. EFFECTIVE_CACHE_SIZE kuch allocate nahi karta; ye bas planner ko batata hai kitna cache maane, index-versus-scan decisions influence karte hue.',
    },
  },
  {
    question: 'How do you safely add a column or index to a large table in production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Adding a nullable column without a default is instant in modern Postgres (metadata only); adding one WITH a volatile default historically rewrote the whole table, so verify behaviour for your version. For indexes, always use CREATE INDEX CONCURRENTLY, which avoids blocking writes at the cost of taking longer and needing a second pass — and note it can leave an INVALID index if it fails, which must be dropped and retried. Also set a lock_timeout so a migration cannot queue behind and then block all traffic.',
      hinglish:
        'Bina default ke ek nullable column add karna modern Postgres mein instant hai (sirf metadata); ek volatile default KE SAATH add karna historically poora table rewrite karta tha, isliye apne version ke liye behaviour verify karo. Indexes ke liye, hamesha CREATE INDEX CONCURRENTLY use karo, jo writes block karne se bachata hai zyada time lagne aur ek doosre pass ki zaroorat ke cost pe — aur note karo ki fail hone pe ye ek INVALID index chhod sakta hai, jise drop karke retry karna padta hai. Ek lock_timeout bhi set karo taaki ek migration peeche queue hoke saara traffic block na kar de.',
    },
  },
  {
    question: 'What is the difference between a primary key and a unique constraint?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Both enforce uniqueness and both create a unique index. The differences: a primary key additionally implies NOT NULL and there can be only ONE per table, since it is the row\'s canonical identifier. A unique constraint permits NULLs (and in standard SQL multiple NULLs, since NULL is not equal to itself) and a table can have several. Practically, use a primary key for the identity other tables reference, and unique constraints for genuine business-level uniqueness such as an email address.',
      hinglish:
        'Dono uniqueness enforce karte hain aur dono ek unique index banate hain. Differences: ek primary key additionally NOT NULL imply karti hai aur per table sirf EK ho sakti hai, kyunki ye row ka canonical identifier hai. Ek unique constraint NULLs permit karta hai (aur standard SQL mein multiple NULLs, kyunki NULL khud ke barabar nahi hota) aur ek table mein kai ho sakte hain. Practically, us identity ke liye primary key use karo jise doosre tables reference karte hain, aur genuine business-level uniqueness jaise ek email address ke liye unique constraints.',
    },
  },
  {
    question: 'What is a foreign data wrapper?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A foreign data wrapper lets PostgreSQL query EXTERNAL data as if it were a local table — another Postgres instance via postgres_fdw, a MySQL database, a CSV file, or an S3 bucket. It is genuinely useful for federated queries, gradual migrations, and joining across systems without an ETL step. The caveat is performance: although Postgres pushes down some filters, complex joins may pull large volumes over the network, so it suits occasional queries rather than a hot path.',
      hinglish:
        'Ek foreign data wrapper PostgreSQL ko EXTERNAL data aise query karne deta hai jaise wo ek local table ho — postgres_fdw se doosra Postgres instance, ek MySQL database, ek CSV file, ya ek S3 bucket. Ye federated queries, gradual migrations, aur bina ek ETL step ke systems ke across join karne ke liye genuinely useful hai. Caveat performance hai: chahe Postgres kuch filters push down karta hai, complex joins network pe bade volumes kheench sakte hain, isliye ye ek hot path ke bajaye occasional queries ko suit karta hai.',
    },
  },
  {
    question: 'What is the LATERAL join?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'LATERAL lets a subquery in the FROM clause REFERENCE columns from tables listed before it, which a normal subquery cannot do. This makes "top-N per group" queries natural: for each customer, join laterally to their three most recent orders. Without LATERAL you would need window functions and an outer filter, which is more convoluted. It is effectively a correlated subquery that can return multiple rows and columns, and pairs naturally with LEFT JOIN LATERAL to keep groups with no matches.',
      hinglish:
        'LATERAL FROM clause ke ek subquery ko usse pehle listed tables ke columns REFERENCE karne deta hai, jo ek normal subquery nahi kar sakti. Isse "top-N per group" queries natural ban jaati hain: har customer ke liye, unke teen sabse recent orders se laterally join karo. LATERAL ke bina tumhe window functions aur ek outer filter chahiye hota, jo zyada convoluted hai. Ye effectively ek correlated subquery hai jo multiple rows aur columns return kar sakti hai, aur bina matches wale groups rakhne ke liye LEFT JOIN LATERAL ke saath naturally jodti hai.',
    },
  },
  {
    question: 'How do you find and fix table bloat?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Detect it by comparing a table\'s physical size against its live row count — `pg_stat_user_tables` exposes dead tuple counts, and extensions like pgstattuple measure it precisely. Fixes: ensure autovacuum is keeping up (tune its thresholds and cost limits on write-heavy tables); for existing bloat, VACUUM FULL rewrites the table but takes an exclusive lock, so production usually prefers pg_repack, which achieves the same result without blocking. Long-running transactions are a common root cause, since they prevent vacuum from removing recent dead rows.',
      hinglish:
        'Ise ek table ke physical size ko uske live row count ke against compare karke detect karo — `pg_stat_user_tables` dead tuple counts expose karta hai, aur pgstattuple jaise extensions ise precisely measure karte hain. Fixes: ensure karo ki autovacuum saath chal raha hai (write-heavy tables pe uske thresholds aur cost limits tune karo); existing bloat ke liye, VACUUM FULL table rewrite karta hai par ek exclusive lock leta hai, isliye production usually pg_repack prefer karta hai, jo wahi result bina block kiye achieve karta hai. Long-running transactions ek common root cause hain, kyunki wo vacuum ko recent dead rows hataane se rokte hain.',
    },
  },
  {
    question: 'What is the difference between a trigger and a rule in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A TRIGGER executes a function per affected ROW (or per statement) when an event fires — the standard, predictable mechanism. A RULE rewrites the query itself before execution, which is far more powerful but notoriously surprising: a rule can silently transform one statement into several, causing side effects to run multiple times. Postgres documentation itself advises using triggers in nearly all cases; rules survive mainly because updatable views were historically implemented with them.',
      hinglish:
        'Ek TRIGGER ek event fire hone pe per affected ROW (ya per statement) ek function execute karta hai — standard, predictable mechanism. Ek RULE execution se pehle query ko khud rewrite karta hai, jo bahut zyada powerful par notoriously surprising hai: ek rule silently ek statement ko kai mein badal sakta hai, side effects ko kai baar chala kar. Postgres documentation khud almost saare cases mein triggers use karne ki salah deti hai; rules mainly isliye bache hain kyunki updatable views historically unse implement hote the.',
    },
  },
  {
    question: 'What are the different types of PostgreSQL backups?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'LOGICAL backups (pg_dump/pg_dumpall) export SQL statements or an archive — portable across versions and platforms, allow restoring a single table, but are slow for very large databases. PHYSICAL backups (pg_basebackup) copy the actual data files — much faster for large clusters and required for streaming replication, but version and platform specific and restore is all-or-nothing. Combining a physical base backup with continuous WAL archiving is what enables POINT-IN-TIME recovery to any moment.',
      hinglish:
        'LOGICAL backups (pg_dump/pg_dumpall) SQL statements ya ek archive export karte hain — versions aur platforms ke across portable, ek single table restore karne deta hai, par bahut bade databases ke liye slow. PHYSICAL backups (pg_basebackup) actual data files copy karte hain — bade clusters ke liye bahut faster aur streaming replication ke liye zaroori, par version aur platform specific aur restore all-or-nothing hai. Ek physical base backup ko continuous WAL archiving ke saath combine karna hi kisi bhi moment tak POINT-IN-TIME recovery enable karta hai.',
    },
  },
  {
    question: 'What is pg_stat_statements and how do you use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'It is an extension that records execution statistics for every normalised query — total and mean time, call count, rows returned, and cache hit ratios. Its value is finding what actually matters: sorting by TOTAL time surfaces queries that are individually fast but called a million times, which a slow-query log ordered by duration would completely miss. It is usually the correct first place to look when asked "why is the database slow", before reaching for EXPLAIN on any single query.',
      hinglish:
        'Ye ek extension hai jo har normalised query ke execution statistics record karta hai — total aur mean time, call count, rows returned, aur cache hit ratios. Iski value ye dhundhna hai ki actually kya matter karta hai: TOTAL time se sort karna wo queries surface karta hai jo individually fast hain par das lakh baar call hoti hain, jinhe duration se ordered ek slow-query log poori tarah miss kar deta. Ye usually dekhne ki sahi pehli jagah hai jab pucha jaaye "database slow kyun hai", kisi single query pe EXPLAIN uthane se pehle.',
    },
  },
  {
    question: 'What is a domain type in PostgreSQL?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A DOMAIN is a reusable named type built from an existing type plus constraints — for example an `email` domain as TEXT with a format CHECK, or `positive_int` as INTEGER CHECK (VALUE > 0). Its benefit is defining a rule ONCE and applying it consistently across every table that uses that concept, rather than repeating the same CHECK in twenty places and eventually getting one wrong. It also documents intent in the schema more clearly than a bare TEXT column.',
      hinglish:
        'Ek DOMAIN ek existing type plus constraints se bana ek reusable named type hai — for example ek `email` domain ek format CHECK ke saath TEXT ke roop mein, ya `positive_int` INTEGER CHECK (VALUE > 0) ke roop mein. Iska benefit ek rule EK BAAR define karke use har us table pe consistently apply karna hai jo wo concept use karti hai, wahi CHECK bees jagah repeat karke eventually ek galat karne ke bajaye. Ye schema mein intent ko ek bare TEXT column se zyada clearly document bhi karta hai.',
    },
  },
  {
    question: 'How do you implement soft deletes and what are the tradeoffs?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Add a `deleted_at TIMESTAMPTZ` column and filter it out in reads instead of physically deleting. Benefits: recoverable mistakes, retained audit history, and no foreign-key cascade surprises. Costs are real: EVERY query must remember the filter or it silently leaks deleted rows — best mitigated with a view or Row-Level Security rather than discipline — unique constraints must become partial indexes so a deleted row does not block reuse of an email, and the table grows indefinitely without an archival policy.',
      hinglish:
        'Ek `deleted_at TIMESTAMPTZ` column add karo aur physically delete karne ke bajaye reads mein use filter karo. Benefits: recoverable mistakes, retained audit history, aur koi foreign-key cascade surprises nahi. Costs real hain: HAR query ko filter yaad rakhna padta hai warna wo silently deleted rows leak karti hai — best mitigation discipline ke bajaye ek view ya Row-Level Security hai — unique constraints ko partial indexes banna padta hai taaki ek deleted row ek email ka reuse block na kare, aur table ek archival policy ke bina indefinitely badhta hai.',
    },
  },
  {
    question: 'What is the difference between COALESCE and NULLIF?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'COALESCE returns the first non-NULL argument from a list, so it supplies a fallback — `COALESCE(nickname, first_name, \'Guest\')`. NULLIF does the inverse: it returns NULL if two values are equal, otherwise the first. Its most common practical use is guarding against division by zero with `a / NULLIF(b, 0)`, which yields NULL rather than raising an error, letting the query complete and the caller decide how to present a missing value.',
      hinglish:
        'COALESCE ek list se pehla non-NULL argument return karta hai, isliye ye ek fallback deta hai — `COALESCE(nickname, first_name, \'Guest\')`. NULLIF ulta karta hai: ye NULL return karta hai agar do values barabar hon, warna pehli. Iska sabse common practical use `a / NULLIF(b, 0)` se division by zero se bachna hai, jo ek error raise karne ke bajaye NULL deta hai, query ko complete hone deta hai aur caller ko decide karne deta hai ki ek missing value kaise present ki jaaye.',
    },
  },
  {
    question: 'How would you design a schema for multi-tenancy in PostgreSQL?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Three approaches with increasing isolation and cost. SHARED tables with a `tenant_id` column is simplest and scales to many tenants, but every query must filter correctly — enforce it with Row-Level Security rather than trusting application code. SCHEMA per tenant gives cleaner separation and easy per-tenant backup, but migrations must run across every schema and it strains past a few thousand tenants. DATABASE per tenant gives the strongest isolation and is appropriate for regulated or enterprise customers, at the highest operational overhead.',
      hinglish:
        'Badhti isolation aur cost ke saath teen approaches. Ek `tenant_id` column wale SHARED tables sabse simple hain aur bahut tenants tak scale karte hain, par har query ko correctly filter karna padta hai — ise application code pe bharosa karne ke bajaye Row-Level Security se enforce karo. Per tenant SCHEMA cleaner separation aur easy per-tenant backup deta hai, par migrations ko har schema ke across chalna padta hai aur ye kuch hazaar tenants ke baad strain karta hai. Per tenant DATABASE strongest isolation deta hai aur regulated ya enterprise customers ke liye appropriate hai, highest operational overhead pe.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
