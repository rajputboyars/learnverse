// DBMS (Database Management Systems) curriculum — CS fundamentals.
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
  title: 'DBMS',
  slug: 'dbms',
  description:
    'Database Management Systems — ER model, keys, normalization, transactions/ACID, indexing aur SQL vs NoSQL. Interview-ready CS fundamentals, English + Hinglish, desi examples aur SQL ke saath.',
  icon: '🗃️',
  tags: ['dbms', 'database', 'sql', 'cs-fundamentals', 'interview'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 21,
};

const beginner = [
  {
    title: 'DBMS Foundations',
    level: 'beginner',
    description: 'DBMS kya hai, ER model aur keys.',
    concepts: [
      {
        title: 'What is a DBMS',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'A Database Management System (DBMS) is software that stores, organises, and manages data, letting many users and apps access it safely and efficiently. It handles storage, querying, security, concurrency, and recovery — far better than flat files. Relational DBMS (RDBMS) like MySQL/PostgreSQL store data in tables with relationships; NoSQL systems use other models (documents, key-value, graphs).',
          hinglish:
            'Database Management System (DBMS) ek software hai jo data store, organise, aur manage karta hai, jisse kai users aur apps use safely aur efficiently access kar sakein. Ye storage, querying, security, concurrency, aur recovery handle karta hai — flat files se kaafi behtar. Relational DBMS (RDBMS) jaise MySQL/PostgreSQL data ko tables mein relationships ke saath rakhte hain; NoSQL systems doosre models (documents, key-value, graphs) use karte hain.',
        },
        dailyLifeExample:
          'DBMS ek library ke catalogue + librarian jaisa hai — lakhon books (data) organised, koi bhi turant dhoondh le, aur do log same time pe bina gadbad ke use karein.',
        codeExample:
          '-- A DBMS lets you query data declaratively\nSELECT name FROM students WHERE marks >= 40;\n-- It also handles security, concurrency, backups & recovery.',
        keyPoints: [
          'Software to store, organise & manage data',
          'Handles querying, security, concurrency, recovery',
          'RDBMS = tables + relationships',
          'NoSQL = documents/key-value/graph',
        ],
        quiz: [
          {
            question: 'A DBMS mainly helps you…',
            options: ['style web pages', 'store, manage & query data safely', 'run JavaScript', 'design logos'],
            correctIndex: 1,
          },
          {
            question: 'MySQL and PostgreSQL are…',
            options: ['NoSQL', 'relational DBMS', 'spreadsheets', 'caches'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'ER Model & Keys',
        difficulty: 'medium',
        tags: ['er-model', 'keys'],
        explanation: {
          english:
            'The Entity-Relationship (ER) model designs a database as entities (tables like Student), attributes (columns like name), and relationships (a Student enrolls in a Course). Keys identify rows: a primary key is unique and not null; a candidate key could be a primary key; a foreign key references another table\'s primary key to link them; a composite key uses multiple columns together.',
          hinglish:
            'Entity-Relationship (ER) model database ko entities (tables jaise Student), attributes (columns jaise name), aur relationships (Student ek Course mein enroll karta hai) ki tarah design karta hai. Keys rows identify karti hain: primary key unique aur not null; candidate key jo primary ban sakti hai; foreign key doosri table ki primary key ko reference karke link karti hai; composite key multiple columns saath use karti hai.',
        },
        dailyLifeExample:
          'Primary key Aadhaar number jaisa hai — har vyakti unique. Foreign key form pe "guardian ka Aadhaar" jaisa hai jo doosre record ko point karta hai.',
        codeExample:
          'CREATE TABLE student (\n  id INT PRIMARY KEY,           -- primary key\n  name VARCHAR(50)\n);\nCREATE TABLE enrollment (\n  student_id INT REFERENCES student(id), -- foreign key\n  course_id INT,\n  PRIMARY KEY (student_id, course_id)    -- composite key\n);',
        keyPoints: [
          'ER model: entities, attributes, relationships',
          'Primary key: unique + not null',
          'Foreign key: links to another table',
          'Composite key: multiple columns together',
        ],
        quiz: [
          {
            question: 'A foreign key is used to…',
            options: ['encrypt data', 'link to another table\'s primary key', 'sort rows', 'index columns'],
            correctIndex: 1,
          },
          {
            question: 'A primary key must be…',
            options: ['nullable', 'unique and not null', 'a foreign key', 'a string'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Design & Querying',
    level: 'intermediate',
    description: 'Normalization, joins aur indexing.',
    concepts: [
      {
        title: 'Normalization',
        difficulty: 'hard',
        tags: ['normalization', 'design'],
        explanation: {
          english:
            'Normalization organises tables to reduce redundancy and avoid anomalies (insert/update/delete problems). 1NF: atomic values, no repeating groups. 2NF: 1NF + no partial dependency on part of a composite key. 3NF: 2NF + no transitive dependency (non-key columns depend only on the key). The goal is "each fact stored once". Denormalization deliberately adds redundancy to speed up reads — a conscious trade-off.',
          hinglish:
            'Normalization tables ko organise karta hai taaki redundancy kam ho aur anomalies (insert/update/delete problems) na hon. 1NF: atomic values, no repeating groups. 2NF: 1NF + composite key ke part pe partial dependency nahi. 3NF: 2NF + transitive dependency nahi (non-key columns sirf key pe depend). Goal: "har fact ek hi baar store". Denormalization jaan-boojh kar redundancy add karta hai reads tez karne ke liye — ek conscious trade-off.',
        },
        dailyLifeExample:
          'Normalization har customer ka address ek hi jagah rakhne jaisa hai — har order mein dobara likhne ke bajaye customer table mein ek baar. Address badle to ek hi jagah update.',
        codeExample:
          '-- Un-normalised (redundant): order repeats customer details\n-- Normalised: split into linked tables\n-- customer(id, name, city)\n-- orders(id, customer_id REFERENCES customer(id), item)\n-- Each customer fact stored ONCE; JOIN when needed.',
        keyPoints: [
          'Reduce redundancy & anomalies',
          '1NF atomic, 2NF no partial dep, 3NF no transitive dep',
          'Goal: each fact stored once',
          'Denormalize deliberately for read speed',
        ],
        quiz: [
          {
            question: 'Normalization mainly reduces…',
            options: ['speed', 'redundancy & anomalies', 'security', 'table count to one'],
            correctIndex: 1,
          },
          {
            question: '3NF removes…',
            options: ['all tables', 'transitive dependencies', 'primary keys', 'indexes'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What are the normal forms 1NF, 2NF, 3NF?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                '1NF requires atomic (indivisible) column values and no repeating groups — each cell holds a single value. 2NF requires 1NF plus no partial dependency: every non-key attribute depends on the whole composite primary key, not just part of it. 3NF requires 2NF plus no transitive dependency: non-key attributes depend only on the key, not on other non-key attributes. Each step further reduces redundancy and update anomalies.',
              hinglish:
                '1NF mein atomic (indivisible) column values aur no repeating groups chahiye — har cell mein single value. 2NF mein 1NF plus no partial dependency: har non-key attribute poori composite primary key pe depend kare, sirf part pe nahi. 3NF mein 2NF plus no transitive dependency: non-key attributes sirf key pe depend karein, doosre non-key attributes pe nahi. Har step redundancy aur update anomalies aur kam karta hai.',
            },
          },
        ],
      },
      {
        title: 'Joins',
        difficulty: 'medium',
        tags: ['joins', 'sql'],
        explanation: {
          english:
            'Joins combine rows from multiple tables on a related column. INNER JOIN keeps only matching rows; LEFT JOIN keeps all left-table rows (NULLs where no match); RIGHT JOIN the reverse; FULL OUTER JOIN keeps all. Joins are how normalised data is recombined for queries — e.g. orders joined to customers to show who ordered what.',
          hinglish:
            'Joins multiple tables ki rows ko ek related column pe combine karte hain. INNER JOIN sirf matching rows; LEFT JOIN left-table ki saari rows (jahan match nahi wahan NULLs); RIGHT JOIN ulta; FULL OUTER JOIN sab. Joins se normalised data queries ke liye dobara combine hota hai — jaise orders ko customers se join karke dikhana kisne kya order kiya.',
        },
        dailyLifeExample:
          'Join do registers ko common column (roll number) se milane jaisa hai — ek mein naam, doosre mein marks; join karke complete report.',
        codeExample:
          'SELECT o.id, c.name\nFROM orders o\nINNER JOIN customers c ON c.id = o.customer_id;\n\n-- All customers, even with no orders:\nSELECT c.name, o.id\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id;',
        keyPoints: [
          'INNER: only matching rows',
          'LEFT: all left rows + NULLs',
          'RIGHT / FULL OUTER for other coverage',
          'Recombines normalised tables on a key',
        ],
        quiz: [
          {
            question: 'Which join returns only rows matching in both tables?',
            options: ['LEFT JOIN', 'INNER JOIN', 'FULL OUTER', 'CROSS JOIN'],
            correctIndex: 1,
          },
          {
            question: 'A LEFT JOIN keeps…',
            options: ['only matches', 'all left rows (NULLs where no match)', 'no rows', 'only right rows'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Indexing',
        difficulty: 'medium',
        tags: ['index', 'performance'],
        explanation: {
          english:
            'An index is a data structure (usually a B-tree) that lets the DBMS find rows without scanning the whole table — turning O(n) lookups into ~O(log n). Index columns you frequently filter, join, or sort by. The trade-off: indexes speed up reads but slow down writes (each insert/update maintains them) and use storage. Primary keys are indexed automatically.',
          hinglish:
            'Index ek data structure (aksar B-tree) hai jo DBMS ko poori table scan kiye bina rows dhoondhne deta hai — O(n) lookups ko ~O(log n) bana ke. Jin columns pe aksar filter/join/sort karte ho un pe index banao. Trade-off: indexes reads tez karte hain par writes slow (har insert/update inhe maintain karta hai) aur storage lete hain. Primary keys apne aap indexed hote hain.',
        },
        dailyLifeExample:
          'Index ek kitaab ke peeche ka index jaisa hai — poori kitaab padhe bina seedha sahi page. Par har naye edition mein index bhi update karna padta hai (write cost).',
        codeExample:
          'CREATE INDEX idx_orders_customer ON orders (customer_id);\n-- query on customer_id is now fast (no full scan)\nEXPLAIN SELECT * FROM orders WHERE customer_id = 42;',
        keyPoints: [
          'B-tree index avoids full table scans',
          'Index columns you filter/join/sort by',
          'Speeds reads; slows writes; uses storage',
          'Primary keys are auto-indexed',
        ],
        quiz: [
          {
            question: 'Indexes mainly improve…',
            options: ['write speed', 'read/lookup speed', 'storage size', 'security'],
            correctIndex: 1,
          },
          {
            question: 'A downside of many indexes is…',
            options: ['faster writes', 'slower writes & more storage', 'no effect', 'data loss'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Transactions & Scaling',
    level: 'advanced',
    description: 'ACID, concurrency aur SQL vs NoSQL.',
    concepts: [
      {
        title: 'Transactions & ACID',
        difficulty: 'hard',
        tags: ['transactions', 'acid'],
        explanation: {
          english:
            'A transaction is a group of operations treated as a single unit — all succeed or all fail. ACID guarantees reliability: Atomicity (all-or-nothing), Consistency (constraints stay valid), Isolation (concurrent transactions do not corrupt each other), Durability (committed data survives crashes). The classic example is a money transfer: debit and credit must both happen or neither.',
          hinglish:
            'Transaction operations ka ek group hai jise ek single unit maana jaata hai — sab succeed ya sab fail. ACID reliability guarantee karta hai: Atomicity (all-or-nothing), Consistency (constraints valid rahein), Isolation (concurrent transactions ek doosre ko corrupt na karein), Durability (committed data crash ke baad survive kare). Classic example money transfer hai: debit aur credit dono hon ya koi na ho.',
        },
        dailyLifeExample:
          'Transaction paise transfer jaisa hai — A se kate aur B mein jude, dono hon ya koi na ho. Beech mein bijli chali jaaye to paisa gayab nahi hona chahiye.',
        codeExample:
          'BEGIN;\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;   -- both applied together; ROLLBACK undoes all',
        keyPoints: [
          'Transaction = all succeed or all fail',
          'ACID: Atomicity, Consistency, Isolation, Durability',
          'BEGIN ... COMMIT; ROLLBACK to undo',
          'Essential for money transfers & multi-step writes',
        ],
        quiz: [
          {
            question: 'The "A" in ACID stands for…',
            options: ['Availability', 'Atomicity', 'Accuracy', 'Access'],
            correctIndex: 1,
          },
          {
            question: 'A transaction is…',
            options: ['a single column', 'a group of operations that all succeed or all fail', 'an index', 'a backup'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What problems can occur with concurrent transactions?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Without proper isolation, concurrent transactions can cause: dirty reads (reading another transaction\'s uncommitted data), non-repeatable reads (a row changes between two reads in the same transaction), phantom reads (new rows appear matching a query re-run), and lost updates (two transactions overwrite each other). DBMSs prevent these using isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) and locking or MVCC — higher isolation means more safety but less concurrency.',
              hinglish:
                'Sahi isolation ke bina, concurrent transactions ye cause kar sakte hain: dirty reads (doosre transaction ka uncommitted data padhna), non-repeatable reads (same transaction mein do reads ke beech row badal jaaye), phantom reads (query dobara chalane par nayi rows aa jaayein), aur lost updates (do transactions ek doosre ko overwrite karein). DBMS inhe isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) aur locking ya MVCC se rokte hain — zyada isolation matlab zyada safety par kam concurrency.',
            },
          },
        ],
      },
      {
        title: 'SQL vs NoSQL',
        difficulty: 'medium',
        tags: ['sql', 'nosql', 'scaling'],
        explanation: {
          english:
            'SQL (relational) databases use structured tables with a fixed schema, strong ACID guarantees, and powerful JOINs — best for highly relational, consistent data and complex queries. NoSQL databases (document, key-value, column, graph) have flexible schemas, scale horizontally more easily, and model data to match access patterns — best for large-scale, rapidly-changing, or semi-structured data. Many systems use both (polyglot persistence).',
          hinglish:
            'SQL (relational) databases structured tables fixed schema ke saath, strong ACID guarantees, aur powerful JOINs use karte hain — highly relational, consistent data aur complex queries ke liye best. NoSQL databases (document, key-value, column, graph) flexible schemas rakhte hain, horizontally aasaani se scale karte hain, aur data ko access patterns ke hisaab se model karte hain — large-scale, tezi se badalne wale, ya semi-structured data ke liye best. Bahut systems dono use karte hain (polyglot persistence).',
        },
        dailyLifeExample:
          'SQL ek strict Excel sheet jaisa hai (har row same columns). NoSQL ek folder of files jaisa hai jahan har file thodi alag ho sakti hai — flexible.',
        codeExample:
          '-- SQL: rigid schema, JOINs, ACID\nSELECT * FROM users JOIN orders ON users.id = orders.user_id;\n\n// NoSQL (document): flexible, nested\n// { _id: 1, name: "Abhi", orders: [{ item: "Pen" }] }',
        keyPoints: [
          'SQL: fixed schema, ACID, JOINs, relational',
          'NoSQL: flexible schema, horizontal scaling',
          'SQL for consistency/complex queries',
          'NoSQL for scale/flexible data',
        ],
        quiz: [
          {
            question: 'NoSQL databases generally offer…',
            options: ['fixed schema only', 'flexible schema & easier horizontal scaling', 'no data storage', 'only JOINs'],
            correctIndex: 1,
          },
          {
            question: 'SQL databases are preferred for…',
            options: ['unstructured huge data', 'highly relational, consistent data', 'images only', 'caching'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'DELETE removes specific rows (with a WHERE clause), is logged row-by-row, can be rolled back, and keeps the table structure. TRUNCATE removes ALL rows quickly (no WHERE), is minimally logged, resets identity counters, and is harder/less granular to roll back. DROP removes the entire table — structure, data, and indexes — from the database. In short: DELETE = some/all rows, TRUNCATE = all rows fast, DROP = the whole table.',
      hinglish:
        'DELETE specific rows hataata hai (WHERE ke saath), row-by-row logged, rollback ho sakta hai, table structure rehti hai. TRUNCATE SAARI rows jaldi hataata hai (no WHERE), minimally logged, identity counters reset, aur rollback mushkil/kam granular. DROP poori table — structure, data, indexes — database se hata deta hai. Short mein: DELETE = kuch/saari rows, TRUNCATE = saari rows fast, DROP = poori table.',
    },
  },
  {
    question: 'What is a primary key vs a unique key?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A primary key uniquely identifies each row, must be NOT NULL, and there is only one per table. A unique key also enforces uniqueness but allows one NULL (in most DBMSs) and a table can have multiple unique keys. Both prevent duplicate values; the primary key is the table\'s main identifier and is automatically indexed.',
      hinglish:
        'Primary key har row ko uniquely identify karti hai, NOT NULL honi chahiye, aur table mein ek hi hoti hai. Unique key bhi uniqueness enforce karti hai par ek NULL allow karti hai (zyadatar DBMS mein) aur ek table mein kai unique keys ho sakti hain. Dono duplicate values rokti hain; primary key table ka main identifier hai aur automatically indexed hoti hai.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
