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
            frequency: 'common',
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
        title: 'Concurrency Control: Isolation Levels & Deadlocks',
        difficulty: 'hard',
        tags: ['concurrency', 'locking', 'deadlock', 'isolation'],
        explanation: {
          english:
            "When many transactions run at the same time, the DBMS must stop them from corrupting each other's work. Locking is the classic mechanism: a transaction locks the rows it touches, and other transactions must wait to access those same rows. A deadlock happens when Transaction A holds a lock Transaction B needs, while B holds a lock A needs — neither can proceed, and both wait forever unless the DBMS detects this cycle and kills one transaction (a 'deadlock victim') to break it. Isolation levels (Read Uncommitted -> Serializable) let you trade off safety against concurrency — stricter isolation prevents more anomalies but forces more waiting.",
          hinglish:
            "Jab bahut saare transactions ek saath chalte hain, DBMS ko unhe ek doosre ka kaam corrupt karne se rokna padta hai. Locking classic mechanism hai: ek transaction jo rows chhoota hai unhe lock kar deta hai, aur doosre transactions ko wahi rows access karne ke liye wait karna padta hai. Deadlock tab hota hai jab Transaction A ek lock hold kare jo Transaction B ko chahiye, jabki B ek lock hold kare jo A ko chahiye — koi bhi aage nahi badh sakta, aur dono hamesha wait karte rahenge jab tak DBMS is cycle ko detect karke ek transaction ko kill (ek 'deadlock victim') na kar de use todne ke liye. Isolation levels (Read Uncommitted se Serializable tak) safety aur concurrency ke beech trade-off karne dete hain — strict isolation zyada anomalies rokta hai par zyada waiting force karta hai.",
        },
        dailyLifeExample:
          'Deadlock do logon jaisa hai jo ek sankri gali mein aamne-saamne khade hain — dono ek doosre ko rasta dene ka wait kar rahe hain, koi hilta nahi. DBMS ka deadlock detector ek traffic warden jaisa hai jo aakhirkar ek insaan ko wapas jaane ko bolta hai taaki doosra aage badh sake.',
        codeExample:
          '-- Classic deadlock scenario:\n-- Transaction A:\nBEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1; -- locks row 1\n-- ... A now wants row 2, but Transaction B has it locked ...\nUPDATE accounts SET balance = balance + 100 WHERE id = 2; -- WAITS\n\n-- Transaction B (running at the same time):\nBEGIN;\nUPDATE accounts SET balance = balance - 50 WHERE id = 2;  -- locks row 2\n-- ... B now wants row 1, but Transaction A has it locked ...\nUPDATE accounts SET balance = balance + 50 WHERE id = 1;  -- WAITS -> DEADLOCK!\n\n-- The DBMS detects the cycle and automatically rolls back one transaction\n-- Fix: always acquire locks/update rows in the SAME consistent order in every transaction',
        keyPoints: [
          'Locking prevents concurrent transactions from corrupting the same data',
          'A deadlock: two transactions each hold a lock the other needs — neither can proceed',
          'The DBMS detects deadlock cycles and rolls back one transaction to break them',
          'Prevention tip: always access/update rows in the same consistent order across transactions',
          'Isolation levels (Read Uncommitted -> Serializable) trade off safety vs concurrency/performance',
        ],
        quiz: [
          {
            question: 'What is a deadlock?',
            options: ['A crashed database', 'Two transactions each holding a lock the other needs, so neither can proceed', 'A slow query', 'A deleted table'],
            correctIndex: 1,
          },
          {
            question: 'How does a DBMS typically resolve a deadlock once detected?',
            options: ['It waits forever', 'It automatically rolls back one of the transactions (the "victim") to break the cycle', 'It crashes the whole server', 'It ignores the problem'],
            correctIndex: 1,
          },
          {
            question: 'What is a practical way applications can help PREVENT deadlocks?',
            options: ['Never use transactions', 'Always acquire locks / update rows in the same consistent order across all transactions', 'Use only one row per table', 'Disable isolation entirely'],
            correctIndex: 1,
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
      {
        title: 'CAP Theorem & Distributed Databases',
        difficulty: 'hard',
        tags: ['cap-theorem', 'distributed', 'nosql'],
        explanation: {
          english:
            'When a database is spread across multiple machines (a distributed system) to handle scale, the CAP theorem says you can only fully guarantee TWO of these three properties at once: Consistency (every read gets the most recent write, or an error), Availability (every request gets a response, even if not the latest data), and Partition Tolerance (the system keeps working even if network communication between nodes breaks). Since network partitions WILL happen in any real distributed system, you are really choosing between Consistency and Availability when a partition occurs — CP systems (like traditional SQL clusters) refuse requests to stay correct; AP systems (like many NoSQL databases) keep responding but might serve slightly stale data.',
          hinglish:
            'Jab ek database scale handle karne ke liye multiple machines (ek distributed system) mein failaya jaata hai, CAP theorem kehta hai ki tum in teen properties mein se sirf DO ko hi ek saath poori tarah guarantee kar sakte ho: Consistency (har read sabse recent write paaye, ya error), Availability (har request ko response mile, chahe latest data na ho), aur Partition Tolerance (system kaam karta rahe chahe nodes ke beech network communication toot jaaye). Kyunki asli distributed system mein network partitions HONGE hi, jab partition hota hai to tum actually Consistency aur Availability ke beech choose kar rahe ho — CP systems (jaise traditional SQL clusters) requests refuse karte hain correct rehne ke liye; AP systems (jaise kai NoSQL databases) respond karte rehte hain par thoda stale data de sakte hain.',
        },
        dailyLifeExample:
          'CAP theorem do branches wale ek bank jaisa hai jinke beech phone line kat gayi (partition). Ya to dono branches transactions rok dein jab tak line theek na ho (Consistency, par kam Availability), ya dono apna kaam continue karein bina ek doosre se check kiye (Availability, par ho sakta hai dono ki balance sheet thodi alag ho jaaye — kam Consistency).',
        codeExample:
          "// Conceptual — CAP is a theorem, not code, but here's the trade-off in practice:\n\n// CP system (e.g. traditional relational cluster, MongoDB in some configs):\n// During a network partition, the minority side REFUSES writes/reads\n// to guarantee no stale/conflicting data is ever served.\n\n// AP system (e.g. Cassandra, DynamoDB by default):\n// During a network partition, EVERY node keeps serving requests,\n// even if it might be slightly out of sync with other nodes.\n// Conflicts get resolved later (eventual consistency).\n\n// Most real systems let you TUNE this per-operation, e.g.:\n// Cassandra: read/write with consistency level ONE (fast, AP-leaning)\n//            vs QUORUM (safer, more CP-leaning)",
        keyPoints: [
          'CAP: Consistency, Availability, Partition tolerance — you can only fully guarantee 2 of 3',
          'Network partitions are inevitable in real distributed systems, so P is effectively mandatory',
          'The real choice during a partition is between Consistency (CP) and Availability (AP)',
          'CP systems refuse requests during a partition to stay correct; AP systems keep responding, possibly with stale data',
          'Many modern systems let you tune consistency per-operation instead of a single fixed choice',
        ],
        quiz: [
          {
            question: 'According to CAP theorem, how many of the three properties can a distributed system fully guarantee at once?',
            options: ['All three, always', 'Only two — since network partitions are inevitable, you choose between Consistency and Availability', 'Only one', 'None, CAP is theoretical only'],
            correctIndex: 1,
          },
          {
            question: 'During a network partition, what does a CP (Consistency + Partition tolerance) system typically do?',
            options: ['Keeps responding with possibly stale data', 'Refuses some requests to guarantee no incorrect/stale data is ever served', 'Shuts down completely forever', 'Ignores the partition'],
            correctIndex: 1,
          },
          {
            question: 'Why is Partition tolerance effectively mandatory in real distributed systems?',
            options: ['It is optional and rarely needed', 'Network failures between machines WILL happen eventually in any real distributed system', 'Partitions never actually occur', 'Only NoSQL databases face partitions'],
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

  // ─── Fundamentals ───────────────────────────────────────────
  {
    question: 'What is a DBMS and why use one instead of files?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A DBMS is software that manages structured data with guarantees plain files cannot offer: CONCURRENT access by many users without corruption, TRANSACTIONS so partial updates never persist, INTEGRITY constraints enforcing valid data, efficient QUERYING via indexes instead of scanning whole files, SECURITY at row and column level, and RECOVERY after crashes. With files you would have to build every one of these yourself, correctly, which is precisely what decades of database engineering exists to avoid.',
      hinglish:
        'Ek DBMS structured data manage karne wala software hai aise guarantees ke saath jo plain files nahi de sakti: bina corruption ke bahut users ka CONCURRENT access, TRANSACTIONS taaki partial updates kabhi persist na hon, valid data enforce karti INTEGRITY constraints, poori files scan karne ke bajaye indexes se efficient QUERYING, row aur column level pe SECURITY, aur crashes ke baad RECOVERY. Files ke saath tumhe inme se har ek khud, correctly banana padta, jo exactly wo hai jise avoid karne ke liye dashकों ki database engineering exist karti hai.',
    },
  },
  {
    question: 'What is the difference between a database schema and an instance?',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        'The SCHEMA is the STRUCTURE — table definitions, columns, types, constraints, and relationships. It changes rarely, via migrations. The INSTANCE is the actual DATA stored at a particular moment in time, which changes constantly with every insert and update. The analogy: the schema is the class definition, the instance is the objects currently in memory. This distinction matters when discussing schema evolution, since changing structure is far more disruptive than changing data.',
      hinglish:
        'SCHEMA STRUCTURE hai — table definitions, columns, types, constraints, aur relationships. Ye rarely badalta hai, migrations se. INSTANCE ek particular moment pe stored actual DATA hai, jo har insert aur update ke saath constantly badalta hai. Analogy: schema class definition hai, instance abhi memory mein maujood objects hain. Ye distinction schema evolution discuss karte waqt matter karta hai, kyunki structure badalna data badalne se bahut zyada disruptive hai.',
    },
  },
  {
    question: 'What are the different types of keys in a database?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A SUPER key is any set of columns that uniquely identifies a row. A CANDIDATE key is a minimal super key (no column can be removed while keeping uniqueness). The PRIMARY key is the candidate key you choose as the main identifier — NOT NULL and one per table. ALTERNATE keys are the remaining candidate keys. A FOREIGN key references another table\'s primary key, enforcing referential integrity. A COMPOSITE key spans multiple columns. A SURROGATE key is an artificial identifier (auto-increment ID) with no business meaning.',
      hinglish:
        'Ek SUPER key columns ka koi bhi set hai jo ek row ko uniquely identify kare. Ek CANDIDATE key ek minimal super key hai (uniqueness rakhte hue koi column hataya nahi ja sakta). PRIMARY key wo candidate key hai jise tum main identifier ke roop mein choose karte ho — NOT NULL aur per table ek. ALTERNATE keys baaki candidate keys hain. Ek FOREIGN key doosre table ki primary key reference karti hai, referential integrity enforce karte hue. Ek COMPOSITE key multiple columns pe faili hoti hai. Ek SURROGATE key ek artificial identifier hai (auto-increment ID) jiska koi business meaning nahi.',
    },
  },
  {
    question: 'What is normalisation and why do we do it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Normalisation organises data to eliminate REDUNDANCY and the update ANOMALIES it causes. If a customer address is repeated in every order row, updating it means updating hundreds of rows (update anomaly), deleting the last order loses the address entirely (deletion anomaly), and you cannot record a customer with no orders (insertion anomaly). Splitting into properly related tables solves all three, at the cost of needing JOINs to reassemble the data.',
      hinglish:
        'Normalisation data ko is tarah organise karta hai ki REDUNDANCY aur usse hone wali update ANOMALIES khatam ho jaayein. Agar ek customer address har order row mein repeat ho, use update karna matlab sau rows update karna (update anomaly), aakhri order delete karna address poori tarah kho deta hai (deletion anomaly), aur tum bina orders wale customer ko record nahi kar sakte (insertion anomaly). Properly related tables mein split karna teeno solve karta hai, data wapas jodne ke liye JOINs ki zaroorat ke cost pe.',
    },
  },
  {
    question: 'Explain 1NF, 2NF, and 3NF.',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '1NF: every column holds ATOMIC values — no lists or repeating groups in a single cell, and each row is unique. 2NF: 1NF plus no PARTIAL dependency — every non-key column depends on the WHOLE composite primary key, not just part of it (only relevant when the key is composite). 3NF: 2NF plus no TRANSITIVE dependency — non-key columns must not depend on other non-key columns (storing city and its pincode\'s state in an orders table violates this). Most production schemas target 3NF.',
      hinglish:
        '1NF: har column ATOMIC values rakhta hai — ek single cell mein koi lists ya repeating groups nahi, aur har row unique hai. 2NF: 1NF plus koi PARTIAL dependency nahi — har non-key column POORI composite primary key pe depend karta hai, uske sirf ek hisse pe nahi (sirf tab relevant jab key composite ho). 3NF: 2NF plus koi TRANSITIVE dependency nahi — non-key columns doosre non-key columns pe depend nahi karne chahiye (ek orders table mein city aur uske pincode ka state store karna ise violate karta hai). Zyadatar production schemas 3NF target karte hain.',
    },
  },
  {
    question: 'What is denormalisation and when is it justified?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Denormalisation deliberately introduces redundancy — duplicating columns or storing pre-computed aggregates — to avoid expensive JOINs at read time. It is justified when reads vastly outnumber writes and JOIN cost is a proven bottleneck: analytics tables, reporting views, and caching a frequently displayed count. The cost you accept is real: every duplicated value must now be kept in sync on write, so you trade write complexity and consistency risk for read speed. Normalise first, denormalise only with measurements.',
      hinglish:
        'Denormalisation deliberately redundancy laata hai — columns duplicate karna ya pre-computed aggregates store karna — read time pe mehnge JOINs avoid karne ke liye. Ye tab justified hai jab reads writes se bahut zyada hon aur JOIN cost ek proven bottleneck ho: analytics tables, reporting views, aur ek frequently displayed count cache karna. Jo cost tum accept karte ho wo real hai: har duplicated value ab write pe sync mein rakhni padti hai, isliye tum read speed ke liye write complexity aur consistency risk trade karte ho. Pehle normalise karo, denormalise sirf measurements ke saath.',
    },
  },

  // ─── Transactions ───────────────────────────────────────────
  {
    question: 'What are ACID properties?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'ATOMICITY: a transaction is all-or-nothing — a partially applied transfer never persists. CONSISTENCY: a transaction moves the database from one valid state to another, respecting all constraints. ISOLATION: concurrent transactions do not interfere; the result matches some serial ordering. DURABILITY: once committed, data survives crashes and power loss. Together they let application code treat a multi-step operation as if it were a single indivisible action, which is why relational databases remain the default for money and orders.',
      hinglish:
        'ATOMICITY: ek transaction all-or-nothing hai — ek partially applied transfer kabhi persist nahi hota. CONSISTENCY: ek transaction database ko ek valid state se doosre mein le jaata hai, saare constraints respect karte hue. ISOLATION: concurrent transactions interfere nahi karte; result kisi serial ordering se match karta hai. DURABILITY: commit hone ke baad, data crashes aur power loss survive karta hai. Saath mein ye application code ko ek multi-step operation ko ek single indivisible action ki tarah treat karne dete hain, isiliye relational databases paise aur orders ke liye default bane hue hain.',
    },
  },
  {
    question: 'What are the SQL isolation levels and what anomalies does each allow?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'READ UNCOMMITTED allows DIRTY READS (seeing another transaction\'s uncommitted changes) — rarely used. READ COMMITTED prevents dirty reads but allows NON-REPEATABLE READS (re-reading a row gives a different value) — the default in PostgreSQL and Oracle. REPEATABLE READ additionally prevents non-repeatable reads but classically allows PHANTOM reads (new rows appearing in a repeated range query) — MySQL InnoDB\'s default. SERIALIZABLE prevents all anomalies by making transactions behave as if run one at a time, at the highest concurrency cost.',
      hinglish:
        'READ UNCOMMITTED DIRTY READS allow karta hai (doosre transaction ke uncommitted changes dekhna) — rarely use hota hai. READ COMMITTED dirty reads rokta hai par NON-REPEATABLE READS allow karta hai (ek row dobara padhne pe alag value milti hai) — PostgreSQL aur Oracle mein default. REPEATABLE READ additionally non-repeatable reads rokta hai par classically PHANTOM reads allow karta hai (ek repeated range query mein nayi rows aana) — MySQL InnoDB ka default. SERIALIZABLE saare anomalies rokta hai transactions ko aise behave karwake jaise wo ek-ek karke chale hon, highest concurrency cost pe.',
    },
  },
  {
    question: 'What is the difference between a dirty read, non-repeatable read, and phantom read?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'DIRTY READ: you read data another transaction has written but not yet committed — if it rolls back, you acted on data that never existed. NON-REPEATABLE READ: you read the same ROW twice within your transaction and get different values, because another transaction updated and committed in between. PHANTOM READ: you run the same RANGE query twice and get different sets of rows, because another transaction inserted or deleted rows matching your condition. The progression is: uncommitted data, changed row, changed row set.',
      hinglish:
        'DIRTY READ: tum wo data padhte ho jo doosre transaction ne likha par abhi commit nahi kiya — agar wo roll back ho, tumne aise data pe act kiya jo kabhi exist hi nahi kiya. NON-REPEATABLE READ: tum apne transaction ke andar wahi ROW do baar padhte ho aur alag values paate ho, kyunki doosre transaction ne beech mein update karke commit kar diya. PHANTOM READ: tum wahi RANGE query do baar chalate ho aur rows ke alag sets paate ho, kyunki doosre transaction ne tumhari condition se match karti rows insert ya delete kar di. Progression hai: uncommitted data, badli row, badla row set.',
    },
  },
  {
    question: 'What is two-phase commit?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Two-phase commit coordinates an atomic transaction across MULTIPLE databases. PHASE 1 (prepare): a coordinator asks every participant "can you commit?" and each replies yes only after durably preparing. PHASE 2 (commit): if all said yes, the coordinator tells everyone to commit; if any said no, everyone aborts. Its fatal weakness is BLOCKING: if the coordinator crashes after participants prepared, they hold locks indefinitely awaiting instruction — which is why distributed systems often prefer sagas and eventual consistency instead.',
      hinglish:
        'Two-phase commit MULTIPLE databases ke across ek atomic transaction coordinate karta hai. PHASE 1 (prepare): ek coordinator har participant se poochta hai "kya tum commit kar sakte ho?" aur har ek durably prepare karne ke baad hi haan kehta hai. PHASE 2 (commit): agar sabne haan kaha, coordinator sabko commit karne ko kehta hai; agar kisi ne na kaha, sab abort karte hain. Iski fatal weakness BLOCKING hai: agar participants ke prepare karne ke baad coordinator crash ho jaaye, wo instruction ka wait karte hue indefinitely locks pakde rehte hain — isiliye distributed systems aksar uske bajaye sagas aur eventual consistency prefer karte hain.',
    },
  },
  {
    question: 'What is a deadlock in a database and how is it resolved?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A database deadlock occurs when two transactions each hold a lock the other needs — T1 locks row A and wants B, T2 locks B and wants A. Unlike application code, databases handle this automatically: they run deadlock DETECTION (building a wait-for graph and finding cycles), then choose a VICTIM to roll back, letting the other proceed. Your application must therefore be prepared to retry a transaction that fails with a deadlock error. Prevention: access rows in a consistent order and keep transactions short.',
      hinglish:
        'Ek database deadlock tab hota hai jab do transactions har ek ek aisa lock pakde hon jo doosre ko chahiye — T1 row A lock karta hai aur B chahta hai, T2 B lock karta hai aur A chahta hai. Application code ke ulat, databases ise automatically handle karte hain: wo deadlock DETECTION chalate hain (ek wait-for graph banake cycles dhundhte hain), phir roll back karne ke liye ek VICTIM chunte hain, doosre ko aage badhne dete hue. Isliye tumhari application ko ek deadlock error se fail hone wale transaction ko retry karne ke liye taiyar rehna chahiye. Prevention: rows ko ek consistent order mein access karo aur transactions chhote rakho.',
    },
  },
  {
    question: 'What is optimistic vs pessimistic locking?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PESSIMISTIC locking assumes conflict is likely, so it locks rows up front (SELECT FOR UPDATE) and other transactions wait — safe, but reduces concurrency and risks deadlocks. OPTIMISTIC locking assumes conflict is rare: it does not lock, but stores a version number or timestamp and checks at write time whether the row changed since it was read, failing the update if so. Optimistic suits high-read low-conflict workloads (most web apps); pessimistic suits genuinely contended rows like inventory counters.',
      hinglish:
        'PESSIMISTIC locking maanta hai ki conflict likely hai, isliye ye rows ko pehle hi lock karta hai (SELECT FOR UPDATE) aur doosre transactions wait karte hain — safe, par concurrency kam karta hai aur deadlocks ka risk. OPTIMISTIC locking maanta hai ki conflict rare hai: ye lock nahi karta, par ek version number ya timestamp store karta hai aur write time pe check karta hai ki row padhne ke baad badli ya nahi, badli to update fail karta hai. Optimistic high-read low-conflict workloads ko suit karta hai (zyadatar web apps); pessimistic genuinely contended rows jaise inventory counters ko.',
    },
  },
  {
    question: 'What is MVCC (Multi-Version Concurrency Control)?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'MVCC lets readers and writers avoid blocking each other by keeping MULTIPLE VERSIONS of each row. A writer creates a new version rather than overwriting, while readers continue seeing the version that was current when their transaction began — so "readers never block writers, writers never block readers". PostgreSQL and Oracle use it, and it is why long analytical reads do not freeze an OLTP workload. The cost is storage bloat from dead versions, which is exactly why PostgreSQL requires VACUUM.',
      hinglish:
        'MVCC readers aur writers ko ek doosre ko block karne se bachata hai har row ke MULTIPLE VERSIONS rakhke. Ek writer overwrite karne ke bajaye ek naya version banata hai, jabki readers wo version dekhte rehte hain jo unka transaction shuru hone pe current tha — isliye "readers kabhi writers ko block nahi karte, writers kabhi readers ko nahi". PostgreSQL aur Oracle ise use karte hain, aur isiliye lambi analytical reads ek OLTP workload ko freeze nahi karti. Cost dead versions se storage bloat hai, jo exactly wajah hai ki PostgreSQL ko VACUUM chahiye.',
    },
  },

  // ─── Indexing & Performance ───────────────────────────────────────────
  {
    question: 'What is an index and what are the tradeoffs?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An index is a separate sorted structure (usually a B-tree) mapping column values to row locations, letting the database find matching rows in O(log n) instead of scanning every row. The tradeoff is real: every INSERT, UPDATE, and DELETE must also maintain every index on that table, so writes slow down, and indexes consume significant disk space. The rule is to index columns used in WHERE, JOIN, and ORDER BY clauses — not every column, and especially not on write-heavy tables.',
      hinglish:
        'Ek index ek separate sorted structure hai (usually ek B-tree) jo column values ko row locations se map karta hai, database ko har row scan karne ke bajaye matching rows O(log n) mein dhundhne deta hai. Tradeoff real hai: har INSERT, UPDATE, aur DELETE ko us table ke har index ko bhi maintain karna padta hai, isliye writes slow hote hain, aur indexes significant disk space lete hain. Rule ye hai ki WHERE, JOIN, aur ORDER BY clauses mein use hone wale columns index karo — har column nahi, aur especially write-heavy tables pe nahi.',
    },
  },
  {
    question: 'What is the difference between a clustered and a non-clustered index?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A CLUSTERED index determines the PHYSICAL order of rows on disk, so the table itself is stored in that order — there can be only ONE per table, and range queries on it are extremely fast because matching rows sit adjacent. A NON-CLUSTERED index is a separate structure holding sorted keys plus pointers back to the actual rows, so you can have many, but each lookup may need an extra step to fetch the full row. In InnoDB the primary key is always the clustered index.',
      hinglish:
        'Ek CLUSTERED index disk pe rows ka PHYSICAL order determine karta hai, isliye table khud us order mein store hota hai — per table sirf EK ho sakta hai, aur ispe range queries extremely fast hain kyunki matching rows adjacent hoti hain. Ek NON-CLUSTERED index ek separate structure hai jo sorted keys plus actual rows tak pointers rakhta hai, isliye tumhare paas bahut ho sakte hain, par har lookup ko poori row fetch karne ke liye ek extra step chahiye ho sakta hai. InnoDB mein primary key hamesha clustered index hoti hai.',
    },
  },
  {
    question: 'What is a composite index and what is the leftmost prefix rule?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A composite index covers multiple columns in a defined ORDER, and that order is critical. An index on (last_name, first_name) can serve queries filtering on last_name alone, or on both together — but NOT a query filtering only on first_name, because the index is sorted primarily by last_name, so first_name values are scattered throughout. This is the leftmost prefix rule: an index can be used only for a query that constrains a contiguous prefix of its columns starting from the left.',
      hinglish:
        'Ek composite index multiple columns ko ek defined ORDER mein cover karta hai, aur wo order critical hai. (last_name, first_name) pe ek index un queries ko serve kar sakta hai jo sirf last_name pe filter karti hain, ya dono pe saath — par un pe NAHI jo sirf first_name pe filter karti hain, kyunki index primarily last_name se sorted hai, isliye first_name values poore mein bikhri hain. Yahi leftmost prefix rule hai: ek index sirf us query ke liye use ho sakta hai jo left se shuru hote uske columns ke ek contiguous prefix ko constrain kare.',
    },
  },
  {
    question: 'When does a database NOT use an index even though one exists?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Common causes: applying a FUNCTION to the indexed column (WHERE YEAR(created_at) = 2024 cannot use an index on created_at — rewrite as a range instead), a leading WILDCARD in LIKE (\'%text\'), implicit TYPE conversion between the column and the literal, low SELECTIVITY where the optimiser judges a full scan cheaper (matching 60% of rows), violating the leftmost prefix rule, and STALE statistics misleading the optimiser. EXPLAIN is the tool that reveals which of these is happening.',
      hinglish:
        'Common causes: indexed column pe ek FUNCTION apply karna (WHERE YEAR(created_at) = 2024 created_at pe index use nahi kar sakta — uske bajaye ek range ke roop mein rewrite karo), LIKE mein ek leading WILDCARD (\'%text\'), column aur literal ke beech implicit TYPE conversion, low SELECTIVITY jahan optimiser ek full scan sasta samjhe (60% rows match karna), leftmost prefix rule violate karna, aur STALE statistics optimiser ko mislead karti hui. EXPLAIN wo tool hai jo reveal karta hai inme se kya ho raha hai.',
    },
  },
  {
    question: 'How do you optimise a slow query?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Start with EXPLAIN/EXPLAIN ANALYZE to see the actual plan — never guess. Look for full table scans on large tables, expensive sort operations, and rows-examined vastly exceeding rows-returned. Then: add or fix indexes to support the WHERE/JOIN/ORDER BY columns, select only needed columns instead of SELECT *, rewrite correlated subqueries as JOINs, avoid functions on indexed columns, add LIMIT and pagination, update table statistics, and consider denormalising or caching only if the query is genuinely unavoidable and hot.',
      hinglish:
        'EXPLAIN/EXPLAIN ANALYZE se shuru karo actual plan dekhne ke liye — kabhi guess mat karo. Bade tables pe full table scans, expensive sort operations, aur rows-examined ka rows-returned se bahut zyada hona dekho. Phir: WHERE/JOIN/ORDER BY columns support karne ke liye indexes add ya fix karo, SELECT * ke bajaye sirf zaroori columns select karo, correlated subqueries ko JOINs ke roop mein rewrite karo, indexed columns pe functions avoid karo, LIMIT aur pagination add karo, table statistics update karo, aur denormalising ya caching sirf tab consider karo jab query genuinely unavoidable aur hot ho.',
    },
  },
  {
    question: 'What is a query execution plan?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An execution plan is the sequence of physical operations the database optimiser chose to answer your query — which indexes it will use, in what order it joins tables, which join algorithm (nested loop, hash, merge), and its estimated row counts and costs. EXPLAIN shows the plan; EXPLAIN ANALYZE actually runs it and shows real timings and row counts. A large gap between ESTIMATED and ACTUAL rows is one of the strongest signals that statistics are stale and the optimiser is choosing badly.',
      hinglish:
        'Ek execution plan un physical operations ka sequence hai jo database optimiser ne tumhari query answer karne ke liye chuna — kaunse indexes use karega, kis order mein tables join karega, kaunsa join algorithm (nested loop, hash, merge), aur uske estimated row counts aur costs. EXPLAIN plan dikhata hai; EXPLAIN ANALYZE use actually chalata hai aur real timings aur row counts dikhata hai. ESTIMATED aur ACTUAL rows ke beech ek bada gap sabse strong signals mein se ek hai ki statistics stale hain aur optimiser bura choose kar raha hai.',
    },
  },
  {
    question: 'What is the N+1 query problem?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The N+1 problem is running one query to fetch N parent rows, then one additional query PER parent to fetch its children — 1 + N round trips where a single JOIN or batched query would do. It is most common with ORMs and lazy loading, where the extra queries are invisible in the application code. Symptoms: a page that is fast with 10 records and unusable with 1000. Fixes: eager loading (JOIN or an IN query batching all children), or explicitly selecting what you need.',
      hinglish:
        'N+1 problem matlab N parent rows fetch karne ke liye ek query chalana, phir har parent ke children fetch karne ke liye ek additional query — 1 + N round trips jahan ek single JOIN ya batched query kaafi hoti. Ye ORMs aur lazy loading ke saath sabse common hai, jahan extra queries application code mein invisible hoti hain. Symptoms: ek page jo 10 records ke saath fast hai aur 1000 ke saath unusable. Fixes: eager loading (JOIN ya saare children batch karti ek IN query), ya explicitly jo chahiye wo select karna.',
    },
  },

  // ─── Architecture & Scaling ───────────────────────────────────────────
  {
    question: 'What is the difference between OLTP and OLAP?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'OLTP (Online Transaction Processing) handles many small, fast, concurrent read/write transactions — order placement, account updates — optimised for low latency and normalised for write integrity. OLAP (Online Analytical Processing) handles fewer, much larger read-mostly analytical queries scanning millions of rows for aggregates — optimised for throughput, typically denormalised (star schema) and often COLUMN-oriented, since analytics reads a few columns across many rows. Running heavy OLAP queries on an OLTP database is a classic cause of production slowdowns.',
      hinglish:
        'OLTP (Online Transaction Processing) bahut chhote, fast, concurrent read/write transactions handle karta hai — order placement, account updates — low latency ke liye optimised aur write integrity ke liye normalised. OLAP (Online Analytical Processing) kam, bahut badi read-mostly analytical queries handle karta hai jo aggregates ke liye millions rows scan karti hain — throughput ke liye optimised, typically denormalised (star schema) aur aksar COLUMN-oriented, kyunki analytics bahut rows ke across kuch columns padhta hai. Ek OLTP database pe heavy OLAP queries chalana production slowdowns ka ek classic cause hai.',
    },
  },
  {
    question: 'What is the difference between SQL and NoSQL databases?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'SQL databases have a fixed SCHEMA, use relations with JOINs, guarantee ACID transactions, and scale primarily vertically (though read replicas help). NoSQL is an umbrella for several models — document, key-value, wide-column, graph — that typically relax schema rigidity and sometimes ACID guarantees in exchange for easier horizontal scaling and flexible data shapes. The honest modern answer: choose based on ACCESS PATTERNS and consistency needs, not on hype, and note that major NoSQL databases have added transactions while SQL databases have added JSON.',
      hinglish:
        'SQL databases ka ek fixed SCHEMA hota hai, JOINs ke saath relations use karte hain, ACID transactions guarantee karte hain, aur primarily vertically scale karte hain (chahe read replicas madad karte hain). NoSQL kai models ke liye ek umbrella hai — document, key-value, wide-column, graph — jo typically schema rigidity aur kabhi ACID guarantees ko easier horizontal scaling aur flexible data shapes ke badle relax karte hain. Honest modern jawab: ACCESS PATTERNS aur consistency needs ke basis pe choose karo, hype pe nahi, aur note karo ki major NoSQL databases ne transactions add kiye hain jabki SQL databases ne JSON.',
    },
  },
  {
    question: 'What is the CAP theorem?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CAP states that a distributed data store can guarantee at most TWO of Consistency (every read sees the latest write), Availability (every request gets a response), and Partition tolerance (the system works despite network splits). Since network partitions are unavoidable in practice, P is mandatory — so the REAL choice is between CP (refuse requests to stay consistent, like a bank balance) and AP (serve possibly stale data to stay available, like a social feed). The common misreading is treating it as a free three-way choice.',
      hinglish:
        'CAP kehta hai ki ek distributed data store zyada se zyada DO guarantee kar sakta hai: Consistency (har read latest write dekhe), Availability (har request ko ek response mile), aur Partition tolerance (network splits ke bawajood system kaam kare). Kyunki network partitions practically unavoidable hain, P mandatory hai — isliye ASLI choice CP (consistent rehne ke liye requests refuse karo, jaise ek bank balance) aur AP (available rehne ke liye possibly stale data serve karo, jaise ek social feed) ke beech hai. Common misreading ise ek free three-way choice maanna hai.',
    },
  },
  {
    question: 'What is the difference between replication and sharding?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'REPLICATION copies the SAME data to multiple servers — it scales READS (spread queries across replicas) and provides redundancy and failover, but every replica still holds the full dataset, so it does not help with data volume or write throughput, and introduces replication LAG. SHARDING splits DIFFERENT data across servers by a shard key — it scales writes and storage, but makes cross-shard queries and transactions painful and re-sharding difficult. They are complementary: production systems often shard, then replicate each shard.',
      hinglish:
        'REPLICATION WAHI data multiple servers pe copy karta hai — ye READS scale karta hai (queries ko replicas ke across faila kar) aur redundancy aur failover deta hai, par har replica abhi bhi poora dataset rakhta hai, isliye ye data volume ya write throughput mein madad nahi karta, aur replication LAG laata hai. SHARDING ALAG data ko ek shard key se servers ke across split karta hai — ye writes aur storage scale karta hai, par cross-shard queries aur transactions ko painful aur re-sharding ko mushkil bana deta hai. Ye complementary hain: production systems aksar shard karte hain, phir har shard replicate karte hain.',
    },
  },
  {
    question: 'How do you choose a shard key?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A good shard key spreads data and load EVENLY, and keeps related data that is queried together on the same shard. Bad choices cause HOTSPOTS: sharding by an auto-increment ID or timestamp sends all new writes to one shard while others idle; sharding by country puts most users on one shard. Also consider query patterns — if you shard by user_id but frequently query by product_id, every such query hits every shard (a scatter-gather). Changing a shard key later is extremely painful, so it deserves real up-front analysis.',
      hinglish:
        'Ek achha shard key data aur load ko EVENLY felaata hai, aur saath query hone wala related data ek hi shard pe rakhta hai. Bure choices HOTSPOTS cause karte hain: ek auto-increment ID ya timestamp se shard karna saare naye writes ek shard pe bhejta hai jabki doosre khaali baithe hain; country se shard karna zyadatar users ko ek shard pe daal deta hai. Query patterns bhi consider karo — agar tum user_id se shard karo par frequently product_id se query karo, har aisi query har shard hit karti hai (ek scatter-gather). Baad mein shard key badalna extremely painful hai, isliye ise real up-front analysis chahiye.',
    },
  },
  {
    question: 'What is a database view and when would you use one?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A view is a named, stored QUERY that behaves like a virtual table — it stores no data itself and runs its underlying query each time it is used. Uses: simplifying complex repeated joins, presenting a consistent interface while the underlying schema evolves, and SECURITY (granting access to a view exposing only non-sensitive columns instead of the base table). A MATERIALIZED view differs in that it physically stores the result, making reads fast but requiring refreshes and therefore risking staleness.',
      hinglish:
        'Ek view ek named, stored QUERY hai jo ek virtual table ki tarah behave karti hai — ye khud koi data store nahi karti aur har use pe apni underlying query chalati hai. Uses: complex repeated joins simplify karna, underlying schema evolve hote hue ek consistent interface present karna, aur SECURITY (base table ke bajaye sirf non-sensitive columns expose karti ek view ka access dena). Ek MATERIALIZED view is mein differ karti hai ki ye result ko physically store karti hai, reads fast banate hue par refreshes chahte hue aur isliye staleness ka risk lete hue.',
    },
  },
  {
    question: 'What is a stored procedure and what are its pros and cons?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A stored procedure is precompiled SQL logic stored and executed inside the database. PROS: reduced network round trips for multi-step logic, a single place to enforce rules across many applications, and potential performance gains from precompilation. CONS: business logic hidden away from application source control and testing, database-specific syntax creating vendor lock-in, harder debugging and versioning, and scaling limits since the database is usually the hardest tier to scale. Modern practice generally favours keeping logic in the application.',
      hinglish:
        'Ek stored procedure precompiled SQL logic hai jo database ke andar stored aur executed hoti hai. PROS: multi-step logic ke liye kam network round trips, bahut applications ke across rules enforce karne ki ek single jagah, aur precompilation se potential performance gains. CONS: business logic application source control aur testing se chhupi hui, database-specific syntax vendor lock-in banata hua, mushkil debugging aur versioning, aur scaling limits kyunki database usually scale karne ki sabse mushkil tier hai. Modern practice generally logic ko application mein rakhna prefer karti hai.',
    },
  },
  {
    question: 'What is a trigger and why are triggers often discouraged?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A trigger is code that runs AUTOMATICALLY in response to an INSERT, UPDATE, or DELETE — used for audit logging, enforcing complex constraints, or maintaining derived columns. They are often discouraged because they create INVISIBLE side effects: a developer reading the application code has no indication that inserting a row also modifies three other tables. This makes behaviour hard to reason about, debugging painful, and testing awkward — many teams prefer explicit application logic or database constraints instead.',
      hinglish:
        'Ek trigger wo code hai jo ek INSERT, UPDATE, ya DELETE ke response mein AUTOMATICALLY chalta hai — audit logging, complex constraints enforce karne, ya derived columns maintain karne ke liye use hota hai. Ye aksar discouraged hain kyunki ye INVISIBLE side effects banate hain: application code padhne wale ek developer ko koi indication nahi hota ki ek row insert karna teen aur tables bhi modify karta hai. Isse behaviour reason karna mushkil, debugging painful, aur testing awkward ho jaati hai — bahut teams uske bajaye explicit application logic ya database constraints prefer karti hain.',
    },
  },
  {
    question: 'What is referential integrity and what do ON DELETE options do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Referential integrity guarantees a foreign key always points at an existing row, preventing orphaned records. When the referenced row is deleted, the ON DELETE clause decides what happens: CASCADE deletes the dependent rows too (convenient but dangerous — one delete can silently remove thousands of rows), SET NULL blanks the reference (requires a nullable column), RESTRICT/NO ACTION blocks the delete entirely (safest default), and SET DEFAULT points it at a default value. Choosing CASCADE carelessly is a well-known source of accidental data loss.',
      hinglish:
        'Referential integrity guarantee karti hai ki ek foreign key hamesha ek existing row pe point kare, orphaned records rokte hue. Jab referenced row delete hoti hai, ON DELETE clause decide karta hai kya hoga: CASCADE dependent rows bhi delete karta hai (convenient par khatarnak — ek delete silently hazaron rows hata sakta hai), SET NULL reference khaali karta hai (ek nullable column chahiye), RESTRICT/NO ACTION delete ko poori tarah block karta hai (safest default), aur SET DEFAULT use ek default value pe point karta hai. CASCADE ko carelessly choose karna accidental data loss ka ek well-known source hai.',
    },
  },
  {
    question: 'What is a database transaction log and what is it used for?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The transaction log (WAL — write-ahead log) records every change BEFORE it is applied to the data files. This ordering is what makes durability and atomicity possible: after a crash, the database replays committed transactions from the log (redo) and reverses incomplete ones (undo). The same log also powers point-in-time RECOVERY and REPLICATION, since replicas simply apply the primary\'s log stream. It is why a committed transaction survives a power cut even though the data pages had not yet been written.',
      hinglish:
        'Transaction log (WAL — write-ahead log) har change ko data files pe apply hone se PEHLE record karta hai. Yahi ordering durability aur atomicity ko possible banati hai: ek crash ke baad, database log se committed transactions replay karta hai (redo) aur incomplete wale reverse karta hai (undo). Wahi log point-in-time RECOVERY aur REPLICATION bhi power karta hai, kyunki replicas simply primary ka log stream apply karte hain. Isiliye ek committed transaction ek power cut survive karta hai chahe data pages abhi likhe hi na gaye hon.',
    },
  },
  {
    question: 'What is connection pooling and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Opening a database connection is expensive — TCP handshake, authentication, session setup — often tens of milliseconds, which dominates a query taking one millisecond. A connection pool keeps a set of open connections and lends them to requests, returning them afterwards. It also CAPS concurrency: databases have a hard connection limit and degrade badly beyond it, so the pool protects the database from being overwhelmed by a traffic spike. Pool sizing matters — too small causes queuing, too large overwhelms the database.',
      hinglish:
        'Ek database connection kholna mehnga hai — TCP handshake, authentication, session setup — aksar das milliseconds, jo ek millisecond lene wali query pe dominate karta hai. Ek connection pool open connections ka ek set rakhta hai aur unhe requests ko udhaar deta hai, baad mein wapas leta hai. Ye concurrency CAP bhi karta hai: databases ki ek hard connection limit hoti hai aur uske aage wo buri tarah degrade hote hain, isliye pool database ko ek traffic spike se overwhelm hone se bachata hai. Pool sizing matter karti hai — bahut chhota queuing karta hai, bahut bada database overwhelm karta hai.',
    },
  },
  {
    question: 'What is eventual consistency?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Eventual consistency guarantees that if no new updates occur, all replicas will EVENTUALLY converge to the same value — but a read immediately after a write may return stale data. It is the tradeoff AP systems accept to stay available during partitions. It is perfectly acceptable for a social media like count or view counter, and unacceptable for a bank balance or inventory decrement. The practical difficulty is user experience: a user who writes and immediately reads their own change may not see it, which is why "read-your-own-writes" consistency is often layered on top.',
      hinglish:
        'Eventual consistency guarantee karti hai ki agar koi naye updates na hon, saare replicas EVENTUALLY usi value pe converge honge — par ek write ke turant baad ek read stale data return kar sakta hai. Ye wo tradeoff hai jo AP systems partitions ke dauraan available rehne ke liye accept karte hain. Ye ek social media like count ya view counter ke liye bilkul acceptable hai, aur ek bank balance ya inventory decrement ke liye unacceptable. Practical difficulty user experience hai: ek user jo likhta hai aur turant apna change padhta hai use wo na dikhe, isiliye "read-your-own-writes" consistency aksar upar layer ki jaati hai.',
    },
  },
  {
    question: 'How would you design a database schema for a new application?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Start from the DOMAIN, not the tables: identify entities, their attributes, and the relationships and cardinalities between them (one-to-many, many-to-many needing a junction table). Normalise to 3NF as the default. Choose primary keys (surrogate keys are usually safer than natural ones, which can change). Add foreign keys with deliberate ON DELETE behaviour. Then review ACCESS PATTERNS — the queries you will actually run — and add indexes accordingly, denormalising only where measurement justifies it. Finally plan for evolution, since schemas always change.',
      hinglish:
        'DOMAIN se shuru karo, tables se nahi: entities, unke attributes, aur unke beech relationships aur cardinalities identify karo (one-to-many, many-to-many jise ek junction table chahiye). Default ke roop mein 3NF tak normalise karo. Primary keys choose karo (surrogate keys usually natural wali se safer hain, jo badal sakti hain). Deliberate ON DELETE behaviour ke saath foreign keys add karo. Phir ACCESS PATTERNS review karo — wo queries jo tum actually chalaoge — aur uske hisaab se indexes add karo, denormalise sirf wahan jahan measurement justify kare. Aakhir mein evolution ke liye plan karo, kyunki schemas hamesha badalte hain.',
    },
  },
  {
    question: 'What is a self-join and when is it useful?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A self-join joins a table to ITSELF using different aliases, which is necessary whenever rows in one table relate to other rows in the same table. The classic case is a hierarchy: an employees table where manager_id references employee_id, so joining employees to employees lets you list each employee alongside their manager\'s name. It is also used to find pairs or duplicates within a table — for example, matching customers who share an address.',
      hinglish:
        'Ek self-join ek table ko different aliases use karke KHUD se join karta hai, jo tab zaroori hai jab ek table ki rows usi table ki doosri rows se relate karti hon. Classic case ek hierarchy hai: ek employees table jahan manager_id, employee_id ko reference karta hai, isliye employees ko employees se join karna tumhe har employee ko unke manager ke naam ke saath list karne deta hai. Ise ek table ke andar pairs ya duplicates dhundhne ke liye bhi use karte hain — for example, ek address share karne wale customers match karna.',
    },
  },
  {
    question: 'What is a data warehouse and how does it differ from a database?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An operational DATABASE serves the running application: current data, normalised, optimised for many small fast transactions. A DATA WAREHOUSE is built for analysis: it consolidates historical data from multiple source systems, is deliberately denormalised (star or snowflake schema), stores data over long time spans, and is optimised for large aggregate scans rather than single-row lookups. The separation exists so that heavy analytical queries never compete with production traffic for resources.',
      hinglish:
        'Ek operational DATABASE chal rahi application ko serve karta hai: current data, normalised, bahut chhote fast transactions ke liye optimised. Ek DATA WAREHOUSE analysis ke liye bana hai: ye multiple source systems se historical data consolidate karta hai, deliberately denormalised hai (star ya snowflake schema), lambe time spans ka data store karta hai, aur single-row lookups ke bajaye bade aggregate scans ke liye optimised hai. Ye separation isliye exist karta hai taaki heavy analytical queries kabhi production traffic se resources ke liye compete na karein.',
    },
  },
  {
    question: 'What backup strategies do databases use?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'FULL backups copy everything — simple to restore but slow and storage-heavy. INCREMENTAL backups copy only changes since the last backup of any kind — fastest to take, but restoring requires the full backup plus every increment in order. DIFFERENTIAL backups copy changes since the last FULL backup — larger than incremental but simpler to restore. Combined with the transaction log, they enable POINT-IN-TIME recovery. The essential discipline: a backup you have never test-restored should not be counted as a backup.',
      hinglish:
        'FULL backups sab kuch copy karte hain — restore karna simple par slow aur storage-heavy. INCREMENTAL backups sirf kisi bhi tarah ke last backup se hue changes copy karte hain — lene mein sabse fast, par restore ke liye full backup plus har increment order mein chahiye. DIFFERENTIAL backups last FULL backup se hue changes copy karte hain — incremental se bade par restore karna simpler. Transaction log ke saath combine hoke, ye POINT-IN-TIME recovery enable karte hain. Essential discipline: ek backup jise tumne kabhi test-restore nahi kiya use backup nahi maana jaana chahiye.',
    },
  },
  {
    question: 'What is database partitioning and how does it differ from sharding?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PARTITIONING splits a large table into smaller pieces WITHIN one database instance — by range (dates), list (region), or hash. Benefits: queries can skip irrelevant partitions entirely (partition pruning), and you can drop an old month\'s data instantly by dropping a partition rather than running a huge DELETE. SHARDING splits data ACROSS separate database servers. The key difference is scope: partitioning is a single-machine organisational technique, sharding is a distributed-systems technique with all the added complexity that implies.',
      hinglish:
        'PARTITIONING ek bade table ko EK database instance ke ANDAR chhote pieces mein split karta hai — range (dates), list (region), ya hash se. Benefits: queries irrelevant partitions poori tarah skip kar sakti hain (partition pruning), aur tum ek purane mahine ka data ek huge DELETE chalane ke bajaye ek partition drop karke instantly hata sakte ho. SHARDING data ko separate database servers ke ACROSS split karta hai. Key difference scope hai: partitioning ek single-machine organisational technique hai, sharding ek distributed-systems technique hai apni saari added complexity ke saath.',
    },
  },
  {
    question: 'How do you handle schema migrations safely in production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Make every migration BACKWARD COMPATIBLE and deploy in stages — the expand-contract pattern. To rename a column: add the new column, write to BOTH columns, backfill existing rows, switch reads to the new column, and only then drop the old one. Never make a breaking change in a single step, since old and new application code run simultaneously during a rolling deploy. Also: avoid long-running locks on large tables, always version migrations in source control, and test the rollback path, not just the forward one.',
      hinglish:
        'Har migration ko BACKWARD COMPATIBLE banao aur stages mein deploy karo — expand-contract pattern. Ek column rename karne ke liye: naya column add karo, DONO columns mein likho, existing rows backfill karo, reads ko naye column pe switch karo, aur uske baad hi purana drop karo. Ek single step mein kabhi breaking change mat karo, kyunki ek rolling deploy ke dauraan purana aur naya application code ek saath chalte hain. Aur: bade tables pe long-running locks avoid karo, migrations ko hamesha source control mein version karo, aur rollback path test karo, sirf forward wala nahi.',
    },
  },
  {
    question: 'What is BCNF and how does it differ from 3NF?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'BCNF (Boyce-Codd Normal Form) is a stricter version of 3NF: it requires that for EVERY functional dependency, the left side must be a super key. 3NF allows a rare exception where a non-key attribute determines part of a candidate key, which BCNF forbids. In practice the difference only appears in tables with multiple overlapping candidate keys, which is uncommon — most real schemas that reach 3NF are already in BCNF, so the distinction matters more in exams than in day-to-day design.',
      hinglish:
        'BCNF (Boyce-Codd Normal Form) 3NF ka ek stricter version hai: ye require karta hai ki HAR functional dependency ke liye, left side ek super key honi chahiye. 3NF ek rare exception allow karta hai jahan ek non-key attribute ek candidate key ka hissa determine karta hai, jise BCNF forbid karta hai. Practically difference sirf multiple overlapping candidate keys wale tables mein dikhta hai, jo uncommon hai — zyadatar real schemas jo 3NF tak pahunchte hain wo already BCNF mein hote hain, isliye ye distinction day-to-day design se zyada exams mein matter karta hai.',
    },
  },
  {
    question: 'What is a functional dependency?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A functional dependency X to Y means that knowing X uniquely determines Y — if two rows share the same X, they must have the same Y. For example, employee_id determines employee_name, since one ID always maps to one name. Functional dependencies are the formal foundation of normalisation: each normal form is defined in terms of which dependencies are permitted, and identifying them is how you discover that a table is storing two unrelated facts and should be split.',
      hinglish:
        'Ek functional dependency X se Y ka matlab hai ki X jaanna Y ko uniquely determine karta hai — agar do rows wahi X share karein, unka Y bhi wahi hona chahiye. For example, employee_id, employee_name determine karta hai, kyunki ek ID hamesha ek naam pe map karti hai. Functional dependencies normalisation ki formal foundation hain: har normal form is basis pe define hota hai ki kaunsi dependencies permitted hain, aur unhe identify karna hi wo tareeka hai jisse tum discover karte ho ki ek table do unrelated facts store kar raha hai aur split hona chahiye.',
    },
  },
  {
    question: 'What is an ER diagram and what are cardinalities?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An ER (Entity-Relationship) diagram models a database visually: ENTITIES (things like Customer, Order) become tables, ATTRIBUTES become columns, and RELATIONSHIPS become foreign keys. CARDINALITY specifies how many of one entity relate to another: ONE-TO-ONE (rare, often merged into one table), ONE-TO-MANY (the most common — a customer has many orders, implemented with a foreign key on the many side), and MANY-TO-MANY (requires a junction table, since neither side can hold the key alone).',
      hinglish:
        'Ek ER (Entity-Relationship) diagram ek database ko visually model karta hai: ENTITIES (Customer, Order jaisi cheezein) tables ban jaati hain, ATTRIBUTES columns, aur RELATIONSHIPS foreign keys. CARDINALITY specify karti hai ki ek entity ke kitne doosri se relate karte hain: ONE-TO-ONE (rare, aksar ek table mein merge), ONE-TO-MANY (sabse common — ek customer ke bahut orders, many side pe ek foreign key se implement), aur MANY-TO-MANY (ek junction table chahiye, kyunki koi bhi side akele key nahi rakh sakta).',
    },
  },
  {
    question: 'What is the difference between DDL, DML, DCL, and TCL?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'DDL (Data Definition Language) defines STRUCTURE: CREATE, ALTER, DROP, TRUNCATE — these are usually auto-committed. DML (Data Manipulation Language) works with DATA: SELECT, INSERT, UPDATE, DELETE. DCL (Data Control Language) manages PERMISSIONS: GRANT and REVOKE. TCL (Transaction Control Language) manages transaction boundaries: COMMIT, ROLLBACK, SAVEPOINT. The practically important distinction is that DDL usually cannot be rolled back in most databases, while DML inside a transaction can.',
      hinglish:
        'DDL (Data Definition Language) STRUCTURE define karti hai: CREATE, ALTER, DROP, TRUNCATE — ye usually auto-committed hote hain. DML (Data Manipulation Language) DATA ke saath kaam karti hai: SELECT, INSERT, UPDATE, DELETE. DCL (Data Control Language) PERMISSIONS manage karti hai: GRANT aur REVOKE. TCL (Transaction Control Language) transaction boundaries manage karti hai: COMMIT, ROLLBACK, SAVEPOINT. Practically important distinction ye hai ki DDL zyadatar databases mein usually rollback nahi ho sakti, jabki ek transaction ke andar DML ho sakti hai.',
    },
  },
  {
    question: 'What are the different types of JOINs?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'INNER JOIN returns only rows matching in both tables. LEFT (OUTER) JOIN returns all rows from the left table plus matches from the right, with NULLs where there is no match — the standard way to find "customers with no orders" by adding WHERE right.id IS NULL. RIGHT JOIN is the mirror image. FULL OUTER JOIN returns all rows from both sides. CROSS JOIN produces the Cartesian product of every combination — occasionally useful for generating grids, but usually an accidental disaster.',
      hinglish:
        'INNER JOIN sirf wo rows return karta hai jo dono tables mein match karti hain. LEFT (OUTER) JOIN left table ki saari rows plus right se matches return karta hai, jahan match nahi wahan NULLs ke saath — "bina orders wale customers" dhundhne ka standard tareeka WHERE right.id IS NULL add karke. RIGHT JOIN iska mirror image hai. FULL OUTER JOIN dono sides ki saari rows return karta hai. CROSS JOIN har combination ka Cartesian product produce karta hai — kabhi grids generate karne ke liye useful, par usually ek accidental disaster.',
    },
  },
  {
    question: 'What is the difference between WHERE and HAVING?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'WHERE filters individual ROWS BEFORE grouping and aggregation; HAVING filters GROUPS AFTER aggregation. This ordering is why you cannot use an aggregate function like COUNT(*) in WHERE — at that point the groups do not exist yet. To find customers with more than 5 orders you must use HAVING COUNT(*) > 5. For performance, filter as much as possible in WHERE, since it reduces the number of rows that ever reach the more expensive grouping step.',
      hinglish:
        'WHERE grouping aur aggregation se PEHLE individual ROWS filter karta hai; HAVING aggregation ke BAAD GROUPS filter karta hai. Yahi ordering wajah hai ki tum WHERE mein COUNT(*) jaisa ek aggregate function use nahi kar sakte — us point pe groups exist hi nahi karte. 5 se zyada orders wale customers dhundhne ke liye tumhe HAVING COUNT(*) > 5 use karna padega. Performance ke liye, jitna ho sake WHERE mein filter karo, kyunki ye un rows ki number kam karta hai jo kabhi zyada mehnge grouping step tak pahunchti hain.',
    },
  },
  {
    question: 'What is a database cursor and why is it usually discouraged?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A cursor lets you iterate over a result set ROW BY ROW, processing each individually. It is discouraged because databases are optimised for SET-based operations: a single UPDATE affecting a million rows is dramatically faster than a cursor looping a million times, each with its own overhead and often its own round trip. Cursors also hold locks and resources for the duration. They are justified only when the per-row logic genuinely cannot be expressed as a set operation, which is rarer than most developers assume.',
      hinglish:
        'Ek cursor tumhe ek result set pe ROW BY ROW iterate karne deta hai, har ek ko individually process karte hue. Ye discouraged hai kyunki databases SET-based operations ke liye optimised hain: ek million rows ko affect karta ek single UPDATE ek cursor ke million baar loop karne se dramatically faster hai, jisme har baar apna overhead aur aksar apna round trip hota hai. Cursors duration ke liye locks aur resources bhi pakde rehte hain. Ye sirf tab justified hain jab per-row logic genuinely ek set operation ke roop mein express na ho sake, jo zyadatar developers ke maanne se rarer hai.',
    },
  },
  {
    question: 'What is a materialized view and when would you use one?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A materialized view PHYSICALLY STORES the result of a query, unlike a regular view which re-runs it every time. This makes reads dramatically faster for expensive aggregations — a dashboard summing millions of rows becomes an instant lookup. The tradeoff is STALENESS and maintenance: the stored result must be refreshed (on a schedule or on demand), and it consumes storage. Use it when the underlying query is expensive, runs frequently, and the business can tolerate data being a few minutes old.',
      hinglish:
        'Ek materialized view ek query ka result PHYSICALLY STORE karta hai, ek regular view ke ulat jo use har baar dobara chalati hai. Ye mehngi aggregations ke liye reads ko dramatically faster banata hai — millions rows sum karta ek dashboard ek instant lookup ban jaata hai. Tradeoff STALENESS aur maintenance hai: stored result ko refresh karna padta hai (ek schedule pe ya on demand), aur ye storage leta hai. Ise tab use karo jab underlying query mehngi ho, frequently chale, aur business data ke kuch minute purana hone ko tolerate kar sake.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
