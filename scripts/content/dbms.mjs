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
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
