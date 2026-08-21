// MongoDB curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs, consumed by scripts/seed.mjs.

import { deepDives } from './mongodb-deep-dives.mjs';

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'MongoDB',
  slug: 'mongodb',
  description:
    'NoSQL document database — CRUD, data modeling, Mongoose aur aggregation. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🍃',
  tags: ['mongodb', 'database', 'nosql', 'mern'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 9,
};

const beginner = [
  {
    title: 'MongoDB Basics',
    level: 'beginner',
    description: 'NoSQL kya hai, documents aur collections.',
    concepts: [
      {
        title: 'What is MongoDB',
        difficulty: 'easy',
        tags: ['intro', 'nosql'],
        explanation: {
          english:
            'MongoDB is a NoSQL, document-oriented database. Instead of tables and rows, it stores flexible JSON-like documents (BSON) inside collections. There is no fixed schema, so documents in a collection can differ — great for evolving apps. It is the "M" in the MERN stack.',
          hinglish:
            'MongoDB ek NoSQL, document-oriented database hai. Tables aur rows ke bajaye, ye collections ke andar flexible JSON-jaisi documents (BSON) store karta hai. Koi fixed schema nahi, isliye ek collection ki documents alag-alag ho sakti hain — evolving apps ke liye badhiya. Ye MERN stack ka "M" hai.',
        },
        dailyLifeExample:
          'SQL ek strict Excel sheet jaisa hai jahan har row ke same columns hone chahiye. MongoDB ek folder of files jaisa hai jahan har file (document) thodi alag ho sakti hai — flexible.',
        codeExample:
          '// A MongoDB document (JSON-like)\n{\n  _id: ObjectId("..."),\n  name: "Abhishek",\n  skills: ["JS", "React"],\n  address: { city: "Delhi" }\n}',
        keyPoints: [
          'NoSQL, document-oriented database',
          'Stores JSON-like documents (BSON) in collections',
          'Flexible schema (documents can differ)',
          'The "M" in MERN',
        ],
        quiz: [
          {
            question: 'MongoDB stores data as…',
            options: ['Tables and rows', 'JSON-like documents', 'CSV files', 'Key-only pairs'],
            correctIndex: 1,
          },
          {
            question: 'MongoDB is which type of database?',
            options: ['Relational (SQL)', 'NoSQL (document)', 'Graph', 'Spreadsheet'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between SQL and NoSQL databases?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'SQL databases are relational: structured tables with a fixed schema, rows/columns, and powerful JOINs, strong on complex queries and transactions. NoSQL (like MongoDB) is non-relational: flexible documents with no fixed schema, easier horizontal scaling, and data often modelled to match access patterns (embedding instead of joins). Choose SQL for highly relational, consistent data; NoSQL for flexible, rapidly evolving, or large-scale data.',
              hinglish:
                'SQL databases relational hote hain: structured tables fixed schema ke saath, rows/columns, aur powerful JOINs, complex queries aur transactions mein strong. NoSQL (jaise MongoDB) non-relational: flexible documents bina fixed schema, aasaan horizontal scaling, aur data aksar access patterns ke hisaab se model hota hai (joins ki jagah embedding). Highly relational, consistent data ke liye SQL; flexible, tezi se badalne wale, ya large-scale data ke liye NoSQL.',
            },
          },
        ],
      },
      {
        title: 'Documents & Collections',
        difficulty: 'easy',
        tags: ['documents', 'collections'],
        explanation: {
          english:
            'A document is a single record (a set of field-value pairs), stored as BSON (binary JSON) which supports extra types like ObjectId and Date. A collection is a group of documents (like a table). A database holds collections. Every document gets a unique _id automatically.',
          hinglish:
            'Document ek single record hai (field-value pairs ka set), BSON (binary JSON) ke roop mein stored jo ObjectId aur Date jaise extra types support karta hai. Collection documents ka group hai (table jaisa). Database collections rakhta hai. Har document ko ek unique _id apne aap milti hai.',
        },
        dailyLifeExample:
          'Document ek visiting card (ek record), collection card-holder (saare cards), aur database almari (saare card-holders) jaisa hai. _id har card ka unique serial number.',
        codeExample:
          '// database "shop" > collection "users" > documents\n{ _id: ObjectId("a1"), name: "Abhi", age: 24 }\n{ _id: ObjectId("a2"), name: "Riya", city: "Pune" } // different fields, fine!',
        keyPoints: [
          'Document = one record (field-value pairs)',
          'Collection = group of documents (like a table)',
          'Database = group of collections',
          'Every document has a unique _id',
        ],
        quiz: [
          {
            question: 'A group of documents is called a…',
            options: ['table', 'collection', 'row', 'schema'],
            correctIndex: 1,
          },
          {
            question: 'Every MongoDB document automatically gets a…',
            options: ['name', 'unique _id', 'password', 'timestamp'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'CRUD Operations',
    level: 'beginner',
    description: 'Create, Read, Update, Delete.',
    concepts: [
      {
        title: 'Insert & Read (find)',
        difficulty: 'easy',
        tags: ['crud', 'query'],
        explanation: {
          english:
            'Add documents with insertOne / insertMany. Read with find() (returns many) or findOne() (returns one). Pass a query object to filter, e.g. find({ age: 24 }). An empty query {} matches everything. You can project fields and sort/limit results.',
          hinglish:
            'Documents add karo insertOne / insertMany se. Read karo find() (kai return karta hai) ya findOne() (ek). Filter ke liye query object do, jaise find({ age: 24 }). Khaali query {} sab match karta hai. Fields project aur results sort/limit kar sakte ho.',
        },
        dailyLifeExample:
          'find({ city: "Delhi" }) ek register mein "Delhi wale sab dikhao" jaisa hai. Khaali {} matlab "sabko dikhao".',
        codeExample:
          'db.users.insertOne({ name: "Abhi", age: 24 });\ndb.users.find({ age: 24 });          // all matching\ndb.users.findOne({ name: "Abhi" });  // first match\ndb.users.find().sort({ age: -1 }).limit(5);',
        keyPoints: [
          'insertOne / insertMany to create',
          'find() = many, findOne() = one',
          'Query object filters; {} matches all',
          'Chain sort(), limit(), projection',
        ],
        quiz: [
          {
            question: 'Which returns a single matching document?',
            options: ['find()', 'findOne()', 'insertOne()', 'all()'],
            correctIndex: 1,
          },
          {
            question: 'An empty query {} matches…',
            options: ['nothing', 'everything', 'only _id', 'an error'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Projections: Selecting Only the Fields You Need',
        difficulty: 'easy',
        tags: ['query', 'projection'],
        explanation: {
          english:
            'By default, find() returns EVERY field of matching documents. A projection (the second argument to find) lets you choose which fields to include or exclude, reducing network traffic and making results easier to work with. Use { field: 1 } to include only that field, or { field: 0 } to exclude it — you generally cannot mix 1s and 0s in the same projection (except for _id, which you can always exclude with _id: 0).',
          hinglish:
            'By default, find() matching documents ke SAARE fields return karta hai. Projection (find ka second argument) tumhe choose karne deta hai kaunse fields include ya exclude karne hain, jisse network traffic kam hota hai aur results ke saath kaam karna aasaan ho jaata hai. { field: 1 } se sirf wo field include karo, ya { field: 0 } se exclude karo — ek hi projection mein generally 1 aur 0 mix nahi kar sakte (except _id, jise hamesha _id: 0 se exclude kar sakte ho).',
        },
        dailyLifeExample:
          "Poore document ko fetch karna poori kitaab issue karwana hai. Projection librarian se bolna hai 'sirf chapter 3 aur 5 photocopy kar do' — baaki paperwork/network load bachta hai.",
        codeExample:
          '// return only name and age (plus _id, which is included by default)\ndb.users.find({}, { name: 1, age: 1 });\n\n// return everything EXCEPT the password field\ndb.users.find({}, { password: 0 });\n\n// exclude _id too\ndb.users.find({}, { name: 1, age: 1, _id: 0 });',
        keyPoints: [
          'The second argument to find() is the projection',
          '{ field: 1 } includes only that field (plus _id by default)',
          '{ field: 0 } excludes that field, includes everything else',
          "You generally can't mix 1s and 0s, except _id: 0 is always allowed",
          'Smaller responses = less network traffic and faster apps',
        ],
        quiz: [
          {
            question: 'What does db.users.find({}, { password: 0 }) do?',
            options: ['Returns only the password field', 'Returns every field except password', 'Deletes the password field', 'Returns nothing'],
            correctIndex: 1,
          },
          {
            question: 'Which field can you always exclude even in an inclusion (1) projection?',
            options: ['name', '_id', 'age', 'email'],
            correctIndex: 1,
          },
          {
            question: 'Why use projections instead of always fetching every field?',
            options: ['MongoDB requires it', 'It reduces network traffic and makes results simpler to work with', 'It makes writes faster', 'It has no real benefit'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Query Operators',
        difficulty: 'medium',
        tags: ['query', 'operators'],
        explanation: {
          english:
            'Operators make queries powerful. Comparison: $gt, $gte, $lt, $lte, $ne, $in, $nin. Logical: $and, $or, $not. They start with $ and go inside the query object, e.g. find({ age: { $gte: 18 } }). Combine them for precise filters.',
          hinglish:
            'Operators queries ko powerful banate hain. Comparison: $gt, $gte, $lt, $lte, $ne, $in, $nin. Logical: $and, $or, $not. Ye $ se shuru hote hain aur query object ke andar jaate hain, jaise find({ age: { $gte: 18 } }). Precise filters ke liye combine karo.',
        },
        dailyLifeExample:
          'Operators online shopping ke filters jaise hain — "price $lt 1000", "brand $in [Nike, Puma]". Inse exactly wahi cheezein milti hain jo chahiye.',
        codeExample:
          'db.users.find({ age: { $gte: 18, $lt: 30 } }); // 18-29\ndb.users.find({ city: { $in: ["Delhi", "Pune"] } });\ndb.users.find({ $or: [{ age: 24 }, { name: "Riya" }] });',
        keyPoints: [
          'Comparison: $gt/$gte/$lt/$lte/$ne/$in',
          'Logical: $and/$or/$not',
          'Operators start with $',
          'Combine for precise filtering',
        ],
        quiz: [
          {
            question: 'Which operator means "greater than or equal"?',
            options: ['$gt', '$gte', '$ge', '$min'],
            correctIndex: 1,
          },
          {
            question: '$in checks if a field value is…',
            options: ['greater than', 'in a given array of values', 'null', 'a string'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Update & Delete',
        difficulty: 'medium',
        tags: ['crud', 'update'],
        explanation: {
          english:
            'Update with updateOne / updateMany using update operators like $set (change fields), $inc (increment), $push (add to array). Delete with deleteOne / deleteMany. The first argument is the filter (which docs), the second is the change. Without $set, you would replace the whole document.',
          hinglish:
            'Update karo updateOne / updateMany se update operators jaise $set (fields change), $inc (increment), $push (array mein add) ke saath. Delete karo deleteOne / deleteMany se. Pehla argument filter hai (kaunse docs), doosra change. $set ke bina poora document replace ho jaata.',
        },
        dailyLifeExample:
          '$set ek form mein sirf ek field edit karna jaisa hai. $inc ek counter ko +1 karna. $push ek list mein naya item jodna.',
        codeExample:
          'db.users.updateOne({ name: "Abhi" }, { $set: { age: 25 } });\ndb.users.updateMany({}, { $inc: { loginCount: 1 } });\ndb.users.deleteOne({ name: "Riya" });',
        keyPoints: [
          'updateOne/updateMany + operators',
          '$set change, $inc increment, $push to array',
          'deleteOne/deleteMany',
          'Filter first, change second',
        ],
        quiz: [
          {
            question: 'Which operator changes specific fields?',
            options: ['$change', '$set', '$edit', '$update'],
            correctIndex: 1,
          },
          {
            question: 'Which adds an element to an array field?',
            options: ['$add', '$push', '$append', '$inc'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'More Update Operators: $pull, $addToSet & Upsert',
        difficulty: 'medium',
        tags: ['crud', 'update', 'operators'],
        explanation: {
          english:
            "Beyond $push, MongoDB has more array operators: $pull removes all array elements matching a condition, and $addToSet adds a value ONLY if it is not already present (prevents duplicates, unlike $push). Separately, the upsert option (short for 'update or insert') creates a new document if no document matches the filter, instead of doing nothing — handy for 'create if missing, otherwise update' logic in one call.",
          hinglish:
            "$push ke alawa, MongoDB mein aur array operators hain: $pull condition match karne wale saare array elements remove karta hai, aur $addToSet value tabhi add karta hai jab wo pehle se na ho (duplicates rokta hai, $push ke ulat). Alag se, upsert option ('update or insert' ka short) agar filter se koi document match na kare to naya document create kar deta hai, kuch na karne ke bajaye — 'agar na ho to banao, warna update karo' logic ek hi call mein karne ke liye handy.",
        },
        dailyLifeExample:
          "$pull ek to-do list se ek kaam cross karna hai. $addToSet ek guest list mein naam jodna hai — agar naam pehle se hai to dobara nahi jodta. Upsert ek 'agar record na ho to naya banao, warna update karo' waala smart form hai.",
        codeExample:
          "// $pull: remove all occurrences of 'urgent' from a tags array\ndb.tasks.updateOne({ _id: id }, { $pull: { tags: 'urgent' } });\n\n// $addToSet: add 'react' only if not already present (no duplicates)\ndb.users.updateOne({ _id: id }, { $addToSet: { skills: 'react' } });\n\n// upsert: create the document if it doesn't exist yet\ndb.counters.updateOne(\n  { name: 'pageViews' },\n  { $inc: { count: 1 } },\n  { upsert: true } // creates { name: 'pageViews', count: 1 } if missing\n);",
        keyPoints: [
          '$pull removes array elements matching a condition',
          '$addToSet adds a value only if not already present (no duplicates)',
          '$push (seen earlier) always adds, even if the value already exists',
          'upsert: true creates a new document if the filter matches nothing',
          'Upsert is great for "create or update" logic in a single call',
        ],
        quiz: [
          {
            question: 'What is the key difference between $push and $addToSet?',
            options: ['No difference', '$push always adds; $addToSet only adds if the value is not already present', '$addToSet is for numbers only', '$push removes items'],
            correctIndex: 1,
          },
          {
            question: 'What does { upsert: true } do if no document matches the filter?',
            options: ['Throws an error', 'Does nothing silently', 'Creates a new document instead of updating nothing', 'Deletes all documents'],
            correctIndex: 2,
          },
          {
            question: 'Which operator removes matching elements from an array field?',
            options: ['$push', '$pull', '$set', '$inc'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Data Modeling',
    level: 'intermediate',
    description: 'Embed vs reference, schema design, indexes.',
    concepts: [
      {
        title: 'Embedding vs Referencing',
        difficulty: 'hard',
        tags: ['modeling', 'design'],
        explanation: {
          english:
            'Two ways to model relationships. Embedding nests related data inside a document (fast reads, data loaded together) — good for data that is always accessed together and is bounded. Referencing stores an ObjectId pointing to another document (like a foreign key) — good for large, independently accessed, or shared data. The choice is driven by access patterns.',
          hinglish:
            'Relationships model karne ke do tarike. Embedding related data ko document ke andar nest karti hai (fast reads, data saath load hota hai) — un cheezon ke liye achha jo hamesha saath access hon aur bounded hon. Referencing ek ObjectId store karti hai jo doosre document ko point kare (foreign key jaisa) — bade, independently accessed, ya shared data ke liye achha. Choice access patterns se decide hoti hai.',
        },
        dailyLifeExample:
          'Embedding ek thali jaisa hai — sab kuch ek plate mein, ek saath. Referencing menu pe item ka code jaisa hai — alag se mangwana padta hai par flexible aur reusable.',
        codeExample:
          '// Embedding (loaded together)\n{ _id: 1, name: "Post", comments: [{ text: "Nice" }] }\n\n// Referencing (separate collections)\n{ _id: 1, name: "Post" }\n{ _id: 9, postId: 1, text: "Nice" } // points to post',
        keyPoints: [
          'Embed: nested, fast reads, accessed together',
          'Reference: ObjectId link, large/shared data',
          'Embed bounded data; reference unbounded',
          'Driven by how you read the data',
        ],
        quiz: [
          {
            question: 'Embedding is best when related data is…',
            options: ['huge and shared', 'always accessed together and bounded', 'never used', 'in another DB'],
            correctIndex: 1,
          },
          {
            question: 'Referencing stores a link using…',
            options: ['a string name', 'an ObjectId', 'a password', 'an index'],
            correctIndex: 1,
          },
          {
            question: "You're modeling a blog post with potentially thousands of comments. Why is embedding ALL comments directly inside the post document risky?",
            options: [
              'Comments cannot be embedded at all',
              "The document could approach or exceed MongoDB's 16MB per-document size limit as comments grow unbounded",
              'Embedding is always slower to read',
              'MongoDB does not allow arrays',
            ],
            correctIndex: 1,
            explanation: 'A small, bounded array (a few line items) is fine to embed. But an unbounded, ever-growing array (thousands of comments) risks hitting the 16MB document limit and slowing down every read/write of that document — reference comments in their own collection instead.',
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you decide between embedding and referencing in MongoDB?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Model around access patterns. Embed when the child data is owned by and always read with the parent, is bounded in size, and changes together (e.g. order line items). Reference when data is large or unbounded, shared across documents, or accessed independently (e.g. users, products). Watch document size limits (16MB) and avoid unbounded growing arrays. Sometimes you duplicate (denormalise) a few fields for read performance.',
              hinglish:
                'Access patterns ke around model karo. Embed tab jab child data parent ka ho aur hamesha uske saath padha jaaye, size mein bounded ho, aur saath change ho (jaise order line items). Reference tab jab data bada ya unbounded ho, documents mein shared ho, ya independently access ho (jaise users, products). Document size limit (16MB) ka dhyan rakho aur unbounded badhte arrays avoid karo. Kabhi-kabhi read performance ke liye kuch fields duplicate (denormalise) kar dete ho.',
            },
          },
        ],
      },
      {
        title: 'Indexes',
        difficulty: 'medium',
        tags: ['indexes', 'performance'],
        explanation: {
          english:
            'Indexes make queries fast by letting MongoDB find documents without scanning the whole collection. Create them on fields you filter/sort by often (createIndex). The _id field is indexed automatically. Indexes speed up reads but slightly slow down writes and use storage, so index purposefully.',
          hinglish:
            'Indexes queries ko fast banate hain — MongoDB poori collection scan kiye bina documents dhoond leta hai. Jin fields pe aksar filter/sort karte ho un pe banao (createIndex). _id field apne aap indexed hota hai. Indexes reads tez karte hain par writes thoda slow karte hain aur storage lete hain, isliye soch-samajh ke index karo.',
        },
        dailyLifeExample:
          'Index ek kitaab ke peeche ka index jaisa hai — poori kitaab padhe bina seedha sahi page pe pahunch jao. Bina index, har baar poori kitaab (collection) scan karni padti.',
        codeExample:
          'db.users.createIndex({ email: 1 });        // single field\ndb.users.createIndex({ city: 1, age: -1 });// compound\n// query on email is now fast (no full scan)',
        keyPoints: [
          'Avoid full collection scans',
          'Index fields you filter/sort by',
          '_id is auto-indexed',
          'Speeds reads; slight cost to writes/storage',
        ],
        quiz: [
          {
            question: 'What do indexes mainly improve?',
            options: ['Write speed', 'Query (read) speed', 'Storage size', 'Backup time'],
            correctIndex: 1,
          },
          {
            question: 'Without a useful index, a query may do a…',
            options: ['quick lookup', 'full collection scan', 'backup', 'cache hit'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Mongoose',
    level: 'intermediate',
    description: 'Node ke liye MongoDB ODM.',
    concepts: [
      {
        title: 'What is Mongoose',
        difficulty: 'medium',
        tags: ['mongoose', 'odm'],
        explanation: {
          english:
            'Mongoose is an ODM (Object Data Modeling) library for MongoDB in Node. It adds structure on top of MongoDB: you define a Schema (fields, types, validation, defaults), create a Model from it, and use clean methods (find, create, save). It handles casting, validation, and middleware (hooks).',
          hinglish:
            'Mongoose Node mein MongoDB ke liye ek ODM (Object Data Modeling) library hai. Ye MongoDB ke upar structure add karti hai: tum ek Schema define karte ho (fields, types, validation, defaults), usse Model banate ho, aur clean methods (find, create, save) use karte ho. Ye casting, validation, aur middleware (hooks) handle karti hai.',
        },
        dailyLifeExample:
          'Raw MongoDB ek khaali register jaisa hai jahan kuch bhi likh do. Mongoose ek printed form jaisa hai jisme fields aur rules pehle se hain — galtiyan kam hoti hain.',
        codeExample:
          'const mongoose = require("mongoose");\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  age: { type: Number, min: 0 },\n});\nconst User = mongoose.model("User", userSchema);',
        keyPoints: [
          'ODM for MongoDB in Node',
          'Schema -> Model -> documents',
          'Adds validation, casting, defaults',
          'Supports middleware/hooks',
        ],
        quiz: [
          {
            question: 'Mongoose is a/an…',
            options: ['Database', 'ODM library for MongoDB', 'CSS framework', 'Test runner'],
            correctIndex: 1,
          },
          {
            question: 'In Mongoose you first define a…',
            options: ['Table', 'Schema', 'Route', 'Cookie'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What does Mongoose add over the native MongoDB driver?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'The native driver talks to MongoDB directly with flexible, schemaless documents. Mongoose adds an application-level schema with type casting, validation, defaults, virtuals, query helpers, population (joining referenced docs), and middleware/hooks (pre/post save). It trades a little flexibility and overhead for structure, safety, and developer convenience — useful for most app backends.',
              hinglish:
                'Native driver MongoDB se seedha baat karta hai flexible, schemaless documents ke saath. Mongoose ek application-level schema add karta hai type casting, validation, defaults, virtuals, query helpers, population (referenced docs join karna), aur middleware/hooks (pre/post save) ke saath. Ye thodi flexibility aur overhead deke structure, safety, aur developer convenience deta hai — zyadatar app backends ke liye useful.',
            },
          },
        ],
      },
      {
        title: 'CRUD with Mongoose',
        difficulty: 'medium',
        tags: ['mongoose', 'crud'],
        explanation: {
          english:
            'With a Model you get async methods that return promises: Model.create() / new + save() to insert, Model.find() / findById() to read, findByIdAndUpdate() to update, and findByIdAndDelete() to delete. Use await and run validation automatically against your schema.',
          hinglish:
            'Model ke saath tumhe async methods milte hain jo promises return karte hain: Model.create() / new + save() insert ke liye, Model.find() / findById() read, findByIdAndUpdate() update, aur findByIdAndDelete() delete. await use karo aur schema ke against validation apne aap chalti hai.',
        },
        dailyLifeExample:
          'Mongoose methods ready buttons jaise hain — create, find, update, delete. Tumhe raw queries likhne ki zaroorat nahi, bas sahi button dabao.',
        codeExample:
          'await User.create({ name: "Abhi", age: 24 });\nconst users = await User.find({ age: { $gte: 18 } });\nconst one = await User.findById(id);\nawait User.findByIdAndUpdate(id, { age: 25 });\nawait User.findByIdAndDelete(id);',
        keyPoints: [
          'create / save to insert',
          'find / findById to read',
          'findByIdAndUpdate / findByIdAndDelete',
          'Promise-based; validates against schema',
        ],
        quiz: [
          {
            question: 'Which Mongoose method finds a document by its _id?',
            options: ['getById()', 'findById()', 'byId()', 'lookup()'],
            correctIndex: 1,
          },
          {
            question: 'Mongoose model methods are…',
            options: ['synchronous', 'promise-based (use await)', 'callbacks only', 'not available'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Mongoose Middleware (Hooks) & Virtuals',
        difficulty: 'medium',
        tags: ['mongoose', 'hooks', 'virtuals'],
        explanation: {
          english:
            "Mongoose middleware (hooks) let you run code automatically before or after an operation on a document — schema.pre('save', fn) runs before saving (perfect for hashing a password), and schema.post('save', fn) runs after. A virtual is a field that is computed on the fly and is NOT stored in the database — like a fullName built from firstName + lastName — keeping your stored data small while still exposing convenient derived values.",
          hinglish:
            "Mongoose middleware (hooks) ek document pe operation se pehle ya baad mein code apne aap chalane dete hain — schema.pre('save', fn) save hone se pehle chalta hai (password hash karne ke liye perfect), aur schema.post('save', fn) baad mein. Virtual ek field hai jo on-the-fly compute hota hai aur database mein STORE NAHI hota — jaise firstName + lastName se bana fullName — stored data chhota rakhte hue convenient derived values dete hain.",
        },
        dailyLifeExample:
          "pre('save') ek security check jaisa hai jo entry (save) hone se pehle hota hai — jaise password ko lock (hash) karna gate se andar jaane se pehle. Virtual ek calculator display jaisa hai — result dikhta hai par kahin store nahi hota, har baar fresh calculate hota hai.",
        codeExample:
          "const bcrypt = require('bcrypt');\nconst userSchema = new mongoose.Schema({\n  firstName: String,\n  lastName: String,\n  password: String,\n});\n\n// hook: hash the password automatically before saving\nuserSchema.pre('save', async function (next) {\n  if (this.isModified('password')) {\n    this.password = await bcrypt.hash(this.password, 10);\n  }\n  next();\n});\n\n// virtual: computed, never stored in the database\nuserSchema.virtual('fullName').get(function () {\n  return `${this.firstName} ${this.lastName}`;\n});\n\nconst user = new User({ firstName: 'Aman', lastName: 'Kumar', password: 'secret' });\nawait user.save(); // password is now hashed automatically\nconsole.log(user.fullName); // 'Aman Kumar' — never stored, always fresh",
        keyPoints: [
          "pre('save')/post('save') hooks run code automatically around an operation",
          'A very common use: hashing a password inside a pre-save hook',
          'A virtual is computed on read, never stored in the database',
          'Virtuals keep documents small while still exposing derived data',
          'Hooks exist for many operations: save, validate, remove, updateOne, and more',
        ],
        quiz: [
          {
            question: "Where is a Mongoose virtual field's value stored?",
            options: ['In the MongoDB document, like any other field', 'Nowhere — it is computed fresh every time it is accessed', 'In a separate collection', 'In a cache file'],
            correctIndex: 1,
          },
          {
            question: "What is a common real-world use of a pre('save') hook?",
            options: ['Deleting the database', 'Automatically hashing a password before it is saved', 'Making queries faster', 'Creating indexes'],
            correctIndex: 1,
          },
          {
            question: "When does a post('save') hook run?",
            options: ['Before the document is saved', 'After the document has been saved', 'Only on delete', 'Never automatically'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Aggregation & Relationships',
    level: 'advanced',
    description: 'Aggregation pipeline aur populate.',
    concepts: [
      {
        title: 'Aggregation Pipeline',
        difficulty: 'hard',
        tags: ['aggregation', 'analytics'],
        explanation: {
          english:
            'The aggregation pipeline processes documents through a series of stages, each transforming the data and passing it on. Common stages: $match (filter), $group (group + accumulate like sum/avg), $sort, $project (shape output), $limit. It is how you do analytics and complex reporting in MongoDB.',
          hinglish:
            'Aggregation pipeline documents ko stages ki ek series se process karti hai, har stage data transform karke aage deti hai. Common stages: $match (filter), $group (group + accumulate jaise sum/avg), $sort, $project (output shape), $limit. MongoDB mein analytics aur complex reporting aise hote hain.',
        },
        dailyLifeExample:
          'Aggregation pipeline ek factory assembly line jaisi hai — har station (stage) raw maal pe ek kaam karta hai (filter, group, sort) aur agle station ko deta hai, aakhir mein final product (report) nikalta hai.',
        codeExample:
          'db.orders.aggregate([\n  { $match: { status: "paid" } },\n  { $group: { _id: "$userId", total: { $sum: "$amount" } } },\n  { $sort: { total: -1 } },\n  { $limit: 5 },\n]);',
        keyPoints: [
          'Documents flow through ordered stages',
          '$match filter, $group accumulate, $sort, $project',
          'Each stage transforms & passes data on',
          'Used for analytics & reporting',
        ],
        quiz: [
          {
            question: 'Which stage groups documents and computes sums/averages?',
            options: ['$match', '$group', '$sort', '$limit'],
            correctIndex: 1,
          },
          {
            question: 'The aggregation pipeline processes data through…',
            options: ['a single step', 'ordered stages', 'random order', 'the client'],
            correctIndex: 1,
          },
          {
            question: 'In a pipeline with both $match and $group, why is it usually better to put $match FIRST?',
            options: [
              'Order does not matter to MongoDB',
              '$match early filters out documents immediately, so later stages (like $group) process far fewer documents — much better performance',
              '$group must always come first by rule',
              '$match only works at the very end of a pipeline',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Transactions: Multi-Document ACID Operations',
        difficulty: 'hard',
        tags: ['transactions', 'acid'],
        explanation: {
          english:
            'A single document write in MongoDB is always atomic — it either fully succeeds or fully fails. But some operations must change MULTIPLE documents together as one all-or-nothing unit — like transferring money: debit one account AND credit another, where a crash halfway would leave the data in an inconsistent state. Since MongoDB 4.0, multi-document transactions let you group several operations so they all commit together or all roll back together, exactly like transactions in a SQL database.',
          hinglish:
            'MongoDB mein ek single document write hamesha atomic hota hai — ya to poora succeed karta hai ya poora fail. Par kuch operations ko MULTIPLE documents ek saath, ek all-or-nothing unit ki tarah change karna hota hai — jaise paise transfer karna: ek account se debit AUR doosre mein credit, jaha beech mein crash hone se data inconsistent state mein reh jaata. MongoDB 4.0 se, multi-document transactions kai operations ko group karne dete hain taaki sab ek saath commit ho ya sab ek saath rollback ho, bilkul SQL database ki transactions ki tarah.',
        },
        dailyLifeExample:
          "Bank transfer socho: ₹500 tumhare account se katna aur dost ke account mein jodna do alag operations hain. Agar beech mein bijli chali jaaye aur sirf pehla ho, to paisa gayab ho jaata hai! Transaction ek promise hai — 'ya to dono ho, ya koi nahi' — bijli jaaye to bhi partial change nahi rehta.",
        codeExample:
          "const session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await Account.updateOne(\n    { _id: fromId }, { $inc: { balance: -500 } }, { session }\n  );\n  await Account.updateOne(\n    { _id: toId }, { $inc: { balance: 500 } }, { session }\n  );\n  await session.commitTransaction(); // both changes become permanent together\n} catch (err) {\n  await session.abortTransaction(); // BOTH changes are undone, as if neither happened\n  throw err;\n} finally {\n  session.endSession();\n}",
        keyPoints: [
          'A single-document write is always atomic in MongoDB, by default',
          'Transactions let MULTIPLE documents change together as one all-or-nothing unit',
          'commitTransaction() makes all the changes permanent together',
          'abortTransaction() rolls back ALL the changes, as if none happened',
          'Classic use case: money transfers, or any operation spanning 2+ documents that must stay consistent',
        ],
        quiz: [
          {
            question: 'Why would a money transfer between two accounts need a transaction instead of two separate updates?',
            options: ['It makes the app run faster', 'Without a transaction, a crash between the two updates could leave money debited from one account but never credited to the other', 'Transactions are required by MongoDB for any update', 'There is no real reason'],
            correctIndex: 1,
          },
          {
            question: 'What does abortTransaction() do?',
            options: ['Commits only the first change', 'Rolls back ALL changes made in that transaction, as if none happened', 'Deletes the database', 'Pauses the transaction for later'],
            correctIndex: 1,
          },
          {
            question: 'Is a single-document write already atomic in MongoDB without using transactions?',
            options: ['No, never', 'Yes — single-document writes are atomic by default; transactions are for MULTI-document consistency', 'Only with Mongoose', 'Only in MongoDB Atlas'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Relationships & populate',
        difficulty: 'hard',
        tags: ['mongoose', 'populate', 'relationships'],
        explanation: {
          english:
            'When you reference another document by ObjectId, Mongoose\'s populate() replaces that id with the actual document at query time — a join-like convenience. Define the field with ref: "Model", then .populate("field"). It is great for referenced relationships but adds extra queries, so use it where you truly need the related data.',
          hinglish:
            'Jab tum doosre document ko ObjectId se reference karte ho, Mongoose ka populate() query time pe us id ko asli document se replace kar deta hai — join jaisi convenience. Field ko ref: "Model" se define karo, phir .populate("field"). Referenced relationships ke liye badhiya par extra queries add karta hai, isliye wahin use karo jaha related data sach mein chahiye.',
        },
        dailyLifeExample:
          'populate() ek address-book reference ko asli person mein badalne jaisa hai — pehle sirf number (id) tha, populate ke baad poora contact card mil gaya.',
        codeExample:
          'const postSchema = new Schema({\n  title: String,\n  author: { type: Schema.Types.ObjectId, ref: "User" },\n});\nconst post = await Post.findById(id).populate("author");\n// post.author is now the full User document',
        keyPoints: [
          'populate() replaces an ObjectId with the real doc',
          'Define the field with ref: "Model"',
          'Join-like convenience for references',
          'Adds queries — use where needed',
        ],
        quiz: [
          {
            question: 'What does Mongoose populate() do?',
            options: ['Deletes references', 'Replaces an ObjectId with the referenced document', 'Creates indexes', 'Validates data'],
            correctIndex: 1,
          },
          {
            question: 'To populate a field you must define it with…',
            options: ['type: String', 'ref: "ModelName"', 'index: true', 'unique: true'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the maximum size of a MongoDB document and why does it matter?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A single BSON document is limited to 16MB. It matters for data modeling: heavily embedding or letting arrays grow unbounded can hit the limit and hurt performance. For large or growing related data, reference it in separate documents (or use GridFS for files larger than 16MB) instead of embedding.',
      hinglish:
        'Ek single BSON document 16MB tak limited hai. Ye data modeling ke liye matter karta hai: zyada embedding ya arrays ko unbounded badhne dena limit hit kar sakta hai aur performance kharab kar sakta hai. Bade ya badhte related data ke liye embed karne ke bajaye alag documents mein reference karo (ya 16MB se bade files ke liye GridFS).',
    },
    codeExample: {
      code: `// A single BSON document may not exceed 16 MB.
const doc = await Post.findById(id);
Buffer.byteLength(JSON.stringify(doc));   // must stay under ~16,777,216

// Why the limit exists: MongoDB loads a WHOLE document into
// memory to read or write it. Without a cap, one document
// could exhaust RAM and stall the server.

// It matters because it kills the "just embed everything"
// design. An unbounded array will eventually hit it:
{ _id: 1, title: 'Post', comments: [ /* 50,000 of these */ ] }
// → MongoServerError: Resulting document after update is larger
//   than 16777216

// The failure is worse than it sounds: the document keeps
// working until the day it does not, in production, on your
// most popular row.

// So: never embed an array that GROWS without a bound.
//   comments, events, logs, messages → separate collection
//   address, settings, a few tags    → embed safely

// If a single value is genuinely huge (video, large file),
// store it in object storage or GridFS and keep only a URL:
{ _id: 1, title: 'Post', videoUrl: 's3://bucket/clip.mp4' }`,
      output: `MongoServerError: object to insert too large`,
    },
  },
  {
    question: 'What does ACID mean and how does MongoDB handle transactions?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'ACID = Atomicity, Consistency, Isolation, Durability — guarantees for reliable transactions. Single-document operations in MongoDB are atomic by default. Since v4.0 MongoDB also supports multi-document ACID transactions (across documents/collections) on replica sets/sharded clusters, though they add overhead — so you still design to keep related data together where possible.',
      hinglish:
        'ACID = Atomicity, Consistency, Isolation, Durability — reliable transactions ke guarantees. MongoDB mein single-document operations by default atomic hote hain. v4.0 se MongoDB multi-document ACID transactions bhi support karta hai (documents/collections ke across) replica sets/sharded clusters pe, par ye overhead add karte hain — isliye jaha possible ho related data saath rakhne ka design karte ho.',
    },
    codeExample: {
      code: `// ACID = Atomicity, Consistency, Isolation, Durability.
//   Atomic     — all of it happens, or none of it
//   Consistent — valid state before and after
//   Isolated   — concurrent operations do not see each other's
//                half-finished work
//   Durable    — once committed, it survives a crash

// MongoDB is ACID at the SINGLE DOCUMENT level, always:
await Account.updateOne(
  { _id: a },
  { $inc: { balance: -100 }, $set: { updatedAt: new Date() } },
);
// Both changes apply together, or neither. No transaction needed.

// Across MULTIPLE documents you need an explicit transaction
// (MongoDB 4.0+, requires a replica set):
const session = await mongoose.startSession();
try {
  await session.withTransaction(async () => {
    await Account.updateOne({ _id: a }, { $inc: { balance: -100 } }, { session });
    await Account.updateOne({ _id: b }, { $inc: { balance:  100 } }, { session });
  });
} finally {
  await session.endSession();
}

// The design point: because a good document model keeps related
// data TOGETHER in one document, most MongoDB apps rarely need
// a multi-document transaction. Needing them constantly usually
// means the schema is modelled like a relational one.`,
      output: `committed`,
    },
  },
  {
    question: 'How do you connect MongoDB with Node.js?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Two options: (1) the official native `mongodb` driver — `const client = new MongoClient(uri); await client.connect();` — gives raw, low-level query access. (2) `mongoose`, an ODM built on top of the native driver — `mongoose.connect(uri)` — adding schemas, validation, and a more convenient query API. Most Node.js/Express apps use Mongoose for the structure and validation it provides; the connection string (`mongodb://` or `mongodb+srv://` for Atlas) and credentials are read from an environment variable, never hard-coded.',
      hinglish:
        'Do options: (1) official native `mongodb` driver — `const client = new MongoClient(uri); await client.connect();` — raw, low-level query access deta hai. (2) `mongoose`, ek ODM jo native driver ke upar built hai — `mongoose.connect(uri)` — schemas, validation, aur ek zyada convenient query API add karte hue. Zyadatar Node.js/Express apps Mongoose use karti hain us structure aur validation ke liye jo ye provide karta hai; connection string (`mongodb://` ya Atlas ke liye `mongodb+srv://`) aur credentials ek environment variable se padhe jaate hain, kabhi hard-code nahi.',
    },
    codeExample: {
      code: `// With Mongoose:
import mongoose from 'mongoose';
await mongoose.connect(process.env.MONGODB_URI);

// With the native driver:
import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db('learnverse');

// Connect ONCE at startup, not per request. The driver keeps a
// connection pool internally — reconnecting on every call is a
// classic performance bug.

// In serverless (Vercel, Lambda) cache it on globalThis so a
// warm invocation reuses the connection:
let cached = globalThis._mongoose;
if (!cached) cached = globalThis._mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  cached.promise ??= mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
  });
  return (cached.conn = await cached.promise);
}
// Without this, every cold-ish invocation opens new connections
// until Atlas rejects you with "connection limit exceeded".

// Never hardcode the URI — it contains credentials.
mongoose.connection.on('error', (e) => console.error('Mongo:', e));`,
      output: `connected to learnverse`,
    },
  },
  {
    question: 'What is Mongoose?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Mongoose is an ODM (Object-Data Modeling) library for MongoDB and Node.js. It sits on top of the native MongoDB driver and adds: SCHEMAS (defining the shape and types of your documents, even though MongoDB itself is schemaless), built-in and custom VALIDATION, MIDDLEWARE hooks (pre/post save, etc.), and a more convenient, chainable query API (`Model.find().sort().limit()`). It brings some of the structure and safety of a relational ORM to MongoDB\'s flexible document model.',
      hinglish:
        'Mongoose MongoDB aur Node.js ke liye ek ODM (Object-Data Modeling) library hai. Ye native MongoDB driver ke upar baithta hai aur add karta hai: SCHEMAS (tumhare documents ka shape aur types define karna, chahe MongoDB khud schemaless hai), built-in aur custom VALIDATION, MIDDLEWARE hooks (pre/post save, etc.), aur ek zyada convenient, chainable query API (`Model.find().sort().limit()`). Ye ek relational ORM ki kuch structure aur safety MongoDB ke flexible document model mein laata hai.',
    },
    codeExample: {
      code: `// An ODM (Object Data Modeling) library — a typed, structured
// layer over the native MongoDB driver.
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  age:   { type: Number, min: 13 },
  role:  { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

userSchema.pre('save', async function () {          // hooks
  if (this.isModified('password')) this.password = await hash(this.password);
});

userSchema.methods.isAdmin = function () {          // instance methods
  return this.role === 'admin';
};

export const User = mongoose.model('User', userSchema);

// What it adds on top of the driver:
//   • schemas and type casting ('25' → 25)
//   • validation before it reaches the database
//   • middleware / hooks (pre-save, post-find)
//   • virtuals, instance and static methods
//   • populate() for cross-collection references
//   • plain, readable query chaining

await User.create({ email: 'A@X.COM', age: '30' });  // cast + lowercased

// The cost: an abstraction layer, some overhead, and hydrated
// documents that are heavier than plain objects — which is why
// .lean() exists.`,
      output: `{ email: 'a@x.com', age: 30, role: 'user' }`,
    },
  },
  {
    question: 'What is the difference between the MongoDB Driver and Mongoose?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The native `mongodb` driver is a thin, low-level client that translates JS calls into MongoDB wire-protocol commands — maximum flexibility and performance, but no schema enforcement, so any shape of document can be inserted, and validation must be done manually. Mongoose wraps the driver with schemas, type casting, built-in validation, virtuals, and hooks — trading a little performance/flexibility for structure, safety, and developer convenience. Most application code prefers Mongoose; performance-critical or highly dynamic use cases sometimes drop to the raw driver.',
      hinglish:
        'Native `mongodb` driver ek thin, low-level client hai jo JS calls ko MongoDB wire-protocol commands mein translate karta hai — maximum flexibility aur performance, par koi schema enforcement nahi, isliye kisi bhi shape ka document insert ho sakta hai, aur validation manually karni padti hai. Mongoose driver ko schemas, type casting, built-in validation, virtuals, aur hooks se wrap karta hai — thodi performance/flexibility ke badle structure, safety, aur developer convenience dete hue. Zyadatar application code Mongoose prefer karta hai; performance-critical ya highly dynamic use cases kabhi-kabhi raw driver pe drop karte hain.',
    },
    codeExample: {
      code: `// DRIVER — the official low-level client. No schema, no
// validation, no casting. Whatever you send is what is stored.
await db.collection('users').insertOne({ emial: 'x', age: '30' });
// ✓ inserted — typo and string age included

// MONGOOSE — a schema layer on top of that driver.
await User.create({ emial: 'x', age: '30' });
// ✗ ValidationError: email is required
//   (and age would be cast to the number 30)

// Driver — faster, thinner, full access to every MongoDB
// feature the moment it ships. You write the discipline yourself.
// Mongoose — structure, validation, hooks, populate; slower,
// and lags slightly behind new MongoDB features.

// Choosing:
//   team project, evolving schema, want guardrails → Mongoose
//   maximum performance, serverless cold starts,
//   or you already validate with Zod                → driver
//   want types from the schema                      → driver + TS,
//                                                     or Prisma

// A common middle path: Mongoose for models and hooks, but
// .lean() on read paths to skip document hydration, and the
// raw collection when you need a driver-only feature:
await User.collection.bulkWrite(ops);`,
      output: `ValidationError: email: Path \`email\` is required.`,
    },
  },
  {
    question: 'What are schemas in Mongoose?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A Mongoose schema defines the STRUCTURE of documents within a collection — field names, their types (String, Number, Date, ObjectId, etc.), default values, validation rules (required, min/max, custom validators), and indexes: `new mongoose.Schema({ name: { type: String, required: true }, age: Number })`. Even though MongoDB itself has no enforced structure, a schema gives your application a predictable, validated shape to work with, catching data errors before they ever reach the database.',
      hinglish:
        'Ek Mongoose schema ek collection ke andar documents ki STRUCTURE define karta hai — field names, unke types (String, Number, Date, ObjectId, etc.), default values, validation rules (required, min/max, custom validators), aur indexes: `new mongoose.Schema({ name: { type: String, required: true }, age: Number })`. Chahe MongoDB khud ki koi enforced structure nahi hai, ek schema tumhari application ko ek predictable, validated shape deta hai kaam karne ke liye, data errors ko database tak pahunchne se pehle hi pakadte hue.',
    },
    codeExample: {
      code: `// A schema defines the SHAPE, types, defaults, validation and
// behaviour of documents in a collection.
const postSchema = new mongoose.Schema({
  title:  { type: String, required: [true, 'Title is required'], trim: true },
  slug:   { type: String, unique: true, index: true },
  body:   String,
  tags:   [String],                                 // array of strings
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // reference
  meta:   { views: { type: Number, default: 0 } },  // nested object
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  price:  { type: Number, min: 0, validate: v => Number.isFinite(v) },
}, {
  timestamps: true,          // adds createdAt / updatedAt
  versionKey: false,         // drops __v
});

// Important: MongoDB itself is schemaless. This schema is
// enforced by MONGOOSE, in your application — not by the
// database. Anything written by another client, or by
// User.collection.insertOne(), bypasses it entirely.

// Fields not in the schema are silently DROPPED by default:
await Post.create({ title: 'Hi', hacker: true });   // hacker not saved
// which is a useful safety property for req.body.

// For database-level enforcement, add a JSON Schema validator
// on the collection itself as well.`,
      output: `ValidationError: Title is required`,
    },
  },
  {
    question: 'What are models in Mongoose?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A Mongoose MODEL is a compiled constructor function built from a SCHEMA, and it is what you actually use to interact with a MongoDB collection: `const User = mongoose.model("User", userSchema);` then `User.find()`, `User.create()`, `new User({...}).save()`. If a schema is the blueprint, the model is the tool that uses that blueprint to create, read, update, and delete real documents in the corresponding collection (Mongoose automatically pluralises and lowercases the model name to derive the collection name, e.g. "User" → "users").',
      hinglish:
        'Ek Mongoose MODEL ek SCHEMA se banaya gaya compiled constructor function hai, aur ye wo hai jise tum actually MongoDB collection ke saath interact karne ke liye use karte ho: `const User = mongoose.model("User", userSchema);` phir `User.find()`, `User.create()`, `new User({...}).save()`. Agar schema blueprint hai, model wo tool hai jo us blueprint ko use karke corresponding collection mein real documents create, read, update, aur delete karta hai (Mongoose automatically model name ko pluralise aur lowercase karta hai collection name derive karne ke liye, jaise "User" → "users").',
    },
    codeExample: {
      code: `// A model is the compiled, usable class built FROM a schema.
// The schema is the blueprint; the model is what you call.
const User = mongoose.model('User', userSchema);

// Mongoose pluralises and lowercases the name to pick the
// collection: 'User' → the "users" collection.
mongoose.model('Person', s);            // → "people"
mongoose.model('User', s, 'accounts');  // → explicit override

// Statics live on the model:
await User.find({ role: 'admin' });
await User.findById(id);
await User.create({ email: 'a@b.com' });
await User.updateOne({ _id: id }, { $set: { role: 'admin' } });

// Instances are documents, with their own methods:
const user = await User.findById(id);
user.role = 'admin';
await user.save();                      // runs validation + hooks
user.isAdmin();                         // your custom method

// A gotcha in dev with hot reload — compiling the same model
// twice throws "Cannot overwrite model once compiled". Guard it:
export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
// This is essentially required in Next.js, where modules are
// re-evaluated on every save.`,
      output: `OverwriteModelError: Cannot overwrite \`User\` model once compiled.`,
    },
  },
  {
    question: 'What are indexes in MongoDB?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An index is a separate, sorted data structure (default: B-tree) that maps field values to document locations, letting MongoDB find matching documents WITHOUT scanning the entire collection (a "COLLSCAN"). Without an index on `email`, `db.users.find({ email: "x@y.com" })` checks every single document; with one, it can binary-search directly to the match. Indexes speed up reads dramatically but slow down writes slightly (every insert/update must also update the index) and use extra disk space — so index the fields you actually query/sort/filter by, not every field.',
      hinglish:
        'Ek index ek separate, sorted data structure hai (default: B-tree) jo field values ko document locations se map karta hai, MongoDB ko poori collection scan kiye BINA matching documents dhundhne deta hai ("COLLSCAN" ke bina). `email` pe index ke bina, `db.users.find({ email: "x@y.com" })` har single document check karta hai; index ke saath, ye directly binary-search se match tak pahunch sakta hai. Indexes reads ko dramatically speed up karte hain par writes ko thoda slow karte hain (har insert/update ko index bhi update karna padta hai) aur extra disk space use karte hain — isliye un fields ko index karo jinhe tum actually query/sort/filter karte ho, har field ko nahi.',
    },
    visual: 'mongo-index',
    codeExample: {
      code: `// An index is a sorted B-tree of one field's values pointing at
// documents — the book's index instead of reading every page.

// Without one, MongoDB does a COLLECTION SCAN:
db.users.find({ email: 'a@b.com' });      // examines 1,000,000 docs

db.users.createIndex({ email: 1 });       // 1 = ascending
// now the same query examines 1.

// Common kinds:
db.users.createIndex({ email: 1 }, { unique: true });     // + constraint
db.posts.createIndex({ authorId: 1, createdAt: -1 });     // compound
db.posts.createIndex({ title: 'text' });                  // text search
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });  // TTL

// Index anything you FILTER, SORT or JOIN on. An unindexed
// sort is especially bad — MongoDB errors above 32 MB of
// in-memory sorting.

// But indexes are not free:
//   • every insert and update must also update every index
//   • they consume RAM, and RAM is the real MongoDB budget
//   • unused indexes are pure cost

// So do not index everything. Check what is actually used:
db.users.aggregate([{ $indexStats: {} }]);
db.users.find({ email: 'a@b.com' }).explain('executionStats');
// want: IXSCAN, and docsExamined ≈ nReturned`,
      output: `COLLSCAN 1,000,000 docs → IXSCAN 1 doc`,
    },
  },
  {
    question: 'What is aggregation in MongoDB?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The Aggregation Framework processes documents through a PIPELINE of stages (`$match`, `$group`, `$sort`, `$project`, `$lookup`, etc.), where each stage transforms the output of the previous one — similar to Unix pipes. Example: `db.orders.aggregate([{ $match: { status: "completed" } }, { $group: { _id: "$customerId", total: { $sum: "$amount" } } }])` filters completed orders, then groups by customer to sum their total spend. It is MongoDB\'s answer to SQL\'s GROUP BY/JOIN-style analytical queries, and is far more powerful than simple `find()` queries for computing derived/summarised data.',
      hinglish:
        'Aggregation Framework documents ko stages ke ek PIPELINE se process karta hai (`$match`, `$group`, `$sort`, `$project`, `$lookup`, etc.), jahan har stage previous ka output transform karta hai — Unix pipes jaisa. Example: `db.orders.aggregate([{ $match: { status: "completed" } }, { $group: { _id: "$customerId", total: { $sum: "$amount" } } }])` completed orders filter karta hai, phir customer se group karke unka total spend sum karta hai. Ye MongoDB ka SQL ke GROUP BY/JOIN-style analytical queries ka jawab hai, aur simple `find()` queries se bahut zyada powerful hai derived/summarised data compute karne ke liye.',
    },
    visual: 'agg-pipeline',
    codeExample: {
      code: `// A pipeline: documents flow through stages, each transforming
// the stream. It is how you GROUP, JOIN and compute in the
// database instead of in Node.
const revenue = await Order.aggregate([
  { $match: { status: 'paid', createdAt: { $gte: startOfMonth } } },  // filter
  { $group: {                                                        // group
      _id: '$customerId',
      total: { $sum: '$amount' },
      orders: { $sum: 1 },
  }},
  { $match: { total: { $gt: 1000 } } },      // filter the GROUPED result
  { $sort: { total: -1 } },
  { $limit: 10 },
  { $lookup: {                                // join
      from: 'users', localField: '_id',
      foreignField: '_id', as: 'customer',
  }},
  { $project: { total: 1, orders: 1, name: { $first: '$customer.name' } } },
]);

// The rule that matters for performance: $match and $limit as
// EARLY as possible. A $match at the top can use an index and
// shrink the stream before the expensive stages ever run. The
// same $match at the bottom cannot.

// Doing this in JavaScript instead would mean pulling every
// order over the network and grouping by hand — far slower and
// memory-hungry.`,
      output: `[{ _id: 7, total: 8420, orders: 12, name: 'Ana' }]`,
    },
  },
  {
    question: 'What is populate() in Mongoose?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`populate()` replaces a referenced ObjectId field with the ACTUAL document it refers to, simulating a SQL-style JOIN in MongoDB\'s otherwise reference-based (non-joining) model: `Order.find().populate("userId")` replaces each order\'s `userId` field with the full user document instead of just the ID. Under the hood, Mongoose runs a SEPARATE query to fetch the referenced documents and stitches them into the result — convenient, but be mindful it adds extra round-trips compared to embedding data directly.',
      hinglish:
        '`populate()` ek referenced ObjectId field ko us ACTUAL document se replace karta hai jise wo refer karta hai, MongoDB ke otherwise reference-based (non-joining) model mein ek SQL-style JOIN simulate karte hue: `Order.find().populate("userId")` har order ke `userId` field ko sirf ID ke bajaye poore user document se replace karta hai. Under the hood, Mongoose referenced documents fetch karne ke liye ek SEPARATE query chalata hai aur unhe result mein stitch karta hai — convenient, par dhyan rakho ye data ko directly embed karne ke comparison mein extra round-trips add karta hai.',
    },
    codeExample: {
      code: `// It replaces stored ObjectIds with the actual documents —
// Mongoose's application-level "join".
const postSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },   // ref is required
});

const post = await Post.findById(id);
post.author;    // ObjectId("64f...")

const full = await Post.findById(id).populate('author');
full.author;    // { _id, name: 'Ana', email: 'a@b.com' }

// Select only what you need — otherwise you ship whole
// documents, password hashes included:
.populate('author', 'name avatar')

// Nested and multiple:
.populate({ path: 'comments', populate: { path: 'user', select: 'name' } })
.populate(['author', 'tags'])

// The catch: populate is NOT a database join. It runs a SECOND
// query. Populating two fields means three round trips, and
// populating inside a loop is an N+1 problem:
for (const p of posts) await p.populate('author');   // ✗ N queries
const posts = await Post.find().populate('author');  // ✓ 2 queries total

// For heavy read paths, $lookup in an aggregation does it in
// one server-side pass instead.`,
      output: `{ title: 'Hi', author: { name: 'Ana' } }`,
    },
  },
  {
    question: 'What is the difference between find() and findOne()?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`find(query)` returns a CURSOR over ALL documents matching the query — you get an array-like result (or must iterate the cursor), even if only one document matches, and an empty array if none match. `findOne(query)` returns a SINGLE document — the first match — or `null` if none match; it is more efficient when you only need one result, since MongoDB can stop searching as soon as it finds a match, rather than scanning for every possible match.',
      hinglish:
        '`find(query)` query se match hone wale SAARE documents pe ek CURSOR return karta hai — tumhe ek array-like result milta hai (ya cursor iterate karna padta hai), chahe sirf ek document match kare, aur empty array agar koi match na kare. `findOne(query)` ek SINGLE document return karta hai — pehla match — ya `null` agar koi match na kare; ye zyada efficient hai jab tumhe sirf ek result chahiye, kyunki MongoDB ek match milte hi search rok sakta hai, har possible match scan karne ke bajaye.',
    },
    codeExample: {
      code: `// find() returns a CURSOR over every match → an array.
const users = await User.find({ role: 'admin' });
users;          // [ {...}, {...} ]  — [] when nothing matches
users.length;   // safe

// findOne() returns the FIRST match → a single document, or null.
const user = await User.findOne({ email: 'a@b.com' });
user;           // { ... }  — null when nothing matches

// The practical difference is what "not found" looks like:
if (users.length === 0) …      // find
if (!user) return res.status(404).end();   // findOne — MUST null-check

// This is the bug it causes:
const u = await User.findOne({ email });
u.name;         // ✗ TypeError: Cannot read properties of null

// Use findOne when the filter identifies at most one document
// (an email, a slug); use find for lists. Do not do this:
const [u] = await User.find({ email }).limit(1);   // ✗ just use findOne

// Related, and clearer when you have the id:
await User.findById(id);              // findOne({ _id: id })

// Both are lazy in Mongoose until awaited — .sort(), .limit(),
// .select() chain onto the query first:
await User.find({ role: 'admin' }).sort({ createdAt: -1 }).limit(20).lean();`,
      output: `[] · null`,
    },
  },

  // ─── Data Modelling ───────────────────────────────────────────
  {
    question: 'When should you embed documents versus reference them?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'EMBED when the child data is always read with the parent, has a bounded size, and does not change independently — order line items inside an order. This gives a single-query read and atomic updates. REFERENCE when the data is large, shared across many parents, grows unboundedly, or is queried on its own — comments on a viral post, or a user referenced by thousands of orders. The deciding questions are: how is it accessed together, does it grow without limit, and would embedding duplicate data that must stay in sync?',
      hinglish:
        'EMBED tab karo jab child data hamesha parent ke saath padha jaaye, uska size bounded ho, aur wo independently na badle — ek order ke andar order line items. Ye ek single-query read aur atomic updates deta hai. REFERENCE tab karo jab data bada ho, bahut parents mein shared ho, unboundedly badhe, ya khud query ho — ek viral post pe comments, ya hazaron orders se referenced ek user. Deciding sawaal hain: ye saath kaise access hota hai, kya ye bina limit badhta hai, aur kya embed karna aisa data duplicate karega jise sync mein rehna hai?',
    },
    codeExample: {
      code: `// EMBED — store the data inside the parent document.
{ _id: 1, name: 'Ana',
  address: { city: 'Pune', zip: '411001' },      // one-to-one
  tags: ['js', 'node'] }                          // small, bounded

// REFERENCE — store an ObjectId pointing elsewhere.
{ _id: 1, title: 'Post', authorId: ObjectId('...') }

// The deciding questions:
//   1. Is it always read WITH the parent?        → embed
//   2. Does the array GROW without a bound?      → reference
//   3. Is it shared by many parents?             → reference
//   4. Is it updated independently and often?    → reference
//   5. Does it need to be queried on its own?    → reference

// Rule 2 is the one that bites. Comments on a post look
// embeddable until a viral post hits the 16 MB limit and every
// read pulls megabytes to render one page.

// So:
//   user → address        embed   (one, small, read together)
//   post → comments       reference (unbounded)
//   order → line items    embed   (bounded, never read alone)
//   post → author         reference (shared across many posts)

// A useful hybrid — reference, but duplicate the one or two
// fields you always display, to avoid the extra query:
{ title: 'Post', author: { _id: ObjectId('…'), name: 'Ana' } }
// The cost: you must update the copy when the name changes.`,
      output: `embed = one read · reference = no size limit`,
    },
  },
  {
    question: 'What is the 16MB document limit and how do you work around it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A single BSON document cannot exceed 16MB. It exists to prevent excessive memory use and pathological documents. In practice you rarely hit it with sensible modelling — hitting it is usually a signal that an embedded array is growing unboundedly, which is a design problem rather than a limit problem. Fixes: reference the growing collection instead of embedding it, use the bucket pattern to group items into fixed-size chunks, or use GridFS for genuinely large binary files.',
      hinglish:
        'Ek single BSON document 16MB se zyada nahi ho sakta. Ye excessive memory use aur pathological documents rokne ke liye hai. Practically tum sensible modelling ke saath ise rarely hit karte ho — ise hit karna usually ek signal hai ki ek embedded array unboundedly badh raha hai, jo ek limit problem ke bajaye ek design problem hai. Fixes: badhti collection ko embed karne ke bajaye reference karo, items ko fixed-size chunks mein group karne ke liye bucket pattern use karo, ya genuinely bade binary files ke liye GridFS.',
    },
    codeExample: {
      code: `// You almost never "work around" it — you fix the model.

// The symptom, always the same shape: an unbounded array.
{ _id: 1, sensorId: 'a', readings: [ /* one per second, forever */ ] }
// → BSONObjectTooLarge

// Fix 1 — move the array into its own collection (usually right)
{ _id: 1, sensorId: 'a' }                         // sensors
{ sensorId: 'a', at: ISODate(), value: 21.4 }     // readings

// Fix 2 — the BUCKET pattern, when documents are tiny and
// numerous. Group them into fixed-size buckets:
{ sensorId: 'a', hour: ISODate('2026-08-12T10:00Z'),
  count: 60, readings: [ { at, value }, … ] }     // 60 per doc
// 3,600 documents per hour become 60. Fewer index entries,
// far less overhead, and each document stays small.

// Fix 3 — for large BINARY data, do not store it in MongoDB at
// all. Use S3 and keep a URL. GridFS splits a file into 255 KB
// chunks if you must keep it in the database:
const bucket = new GridFSBucket(db);
fs.createReadStream('big.mp4').pipe(bucket.openUploadStream('big.mp4'));

// The real lesson: 16 MB is not a limit to route around, it is
// a signal that the document is doing too much. Even at 2 MB,
// every read and every update rewrites the whole thing.`,
      output: `BSONObjectTooLarge: object to insert too large`,
    },
  },
  {
    question: 'What is the aggregation pipeline and what are the key stages?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The aggregation pipeline processes documents through ordered STAGES, each transforming the output of the previous — like Unix pipes. Key stages: `$match` filters (put it FIRST so later stages process fewer documents and it can use an index), `$group` aggregates, `$project` reshapes fields, `$sort`, `$limit`, `$skip`, `$unwind` flattens arrays into separate documents, and `$lookup` performs a left outer join. Stage order matters enormously for performance, not just correctness.',
      hinglish:
        'Aggregation pipeline documents ko ordered STAGES se process karti hai, har ek pichhle ka output transform karte hue — Unix pipes ki tarah. Key stages: `$match` filter karta hai (ise PEHLE rakho taaki baad ke stages kam documents process karein aur ye ek index use kar sake), `$group` aggregate karta hai, `$project` fields reshape karta hai, `$sort`, `$limit`, `$skip`, `$unwind` arrays ko separate documents mein flatten karta hai, aur `$lookup` ek left outer join karta hai. Stage order performance ke liye enormously matter karta hai, sirf correctness ke liye nahi.',
    },
    visual: 'agg-pipeline',
    codeExample: {
      code: `// Stages run in order; each one's output feeds the next.
await Order.aggregate([
  { $match:   { status: 'paid' } },        // filter — put FIRST, uses indexes
  { $unwind:  '$items' },                  // one document per array element
  { $group:   { _id: '$items.sku',         // group and accumulate
                qty: { $sum: '$items.qty' },
                revenue: { $sum: { $multiply: ['$items.qty', '$items.price'] } } } },
  { $sort:    { revenue: -1 } },           // sort
  { $limit:   10 },                        // cut early
  { $lookup:  { from: 'products', localField: '_id',
                foreignField: 'sku', as: 'product' } },   // join
  { $project: { qty: 1, revenue: 1,        // reshape the output
                name: { $first: '$product.name' } } },
]);

// The stages worth knowing:
//   $match     filter        $group    aggregate
//   $project   reshape       $addFields add computed fields
//   $sort $limit $skip       $unwind   flatten an array
//   $lookup    join          $facet    several pipelines at once
//   $count     count         $out $merge  write results out

// Order is a performance decision, not a style one:
//   $match and $sort at the TOP can use indexes.
//   $limit early means later stages process fewer documents.
//   $unwind before $match multiplies the work.

// Each stage caps at 100 MB of RAM; for genuinely large sorts
// pass { allowDiskUse: true }.`,
      output: `[{ _id: 'SKU-9', qty: 412, revenue: 18540, name: 'Mug' }]`,
    },
  },
  {
    question: 'What is $lookup and what are its limitations?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`$lookup` performs a LEFT OUTER JOIN with another collection in the same database, producing an array of matched documents. Limitations that matter: it is significantly slower than a relational JOIN since MongoDB is not optimised for joins, the joined collection should be indexed on the join field or it degrades badly, and the result must still respect the 16MB document limit. If you find yourself needing `$lookup` everywhere, that is usually a signal the data model should embed more or that a relational database fits better.',
      hinglish:
        '`$lookup` usi database mein doosri collection ke saath ek LEFT OUTER JOIN karta hai, matched documents ka ek array produce karte hue. Matter karti limitations: ye ek relational JOIN se significantly slower hai kyunki MongoDB joins ke liye optimised nahi hai, joined collection join field pe indexed honi chahiye warna ye buri tarah degrade hoti hai, aur result ko abhi bhi 16MB document limit respect karni padti hai. Agar tum khud ko har jagah `$lookup` chahte paao, wo usually ek signal hai ki data model ko zyada embed karna chahiye ya ek relational database better fit hai.',
    },
    codeExample: {
      code: `// $lookup is MongoDB's server-side join.
await Order.aggregate([
  { $match: { status: 'paid' } },
  { $lookup: {
      from: 'users',              // ← COLLECTION name, not the model name
      localField: 'userId',
      foreignField: '_id',
      as: 'user',                 // always an ARRAY, even for one match
  }},
  { $unwind: '$user' },           // flatten it back to an object
]);

// With a sub-pipeline you can filter and project inside the join:
{ $lookup: {
    from: 'orders', let: { uid: '$_id' },
    pipeline: [
      { $match: { $expr: { $eq: ['$userId', '$$uid'] } } },
      { $project: { amount: 1 } },
    ],
    as: 'orders',
}}

// The limitations that matter:
//   • no index on foreignField → a full scan of the joined
//     collection PER document. This is the usual cause of a
//     "mysteriously slow" pipeline.
//   • the joined array counts toward the 16 MB result limit
//   • it does not work across shards for the joined collection
//     in older versions
//   • many chained $lookups is a sign the model should have
//     embedded that data instead

// Rule: index every foreignField, $match before the $lookup,
// and if you need three of them, reconsider the schema.`,
      output: `docsExamined: 1 (was 240,000 before the index)`,
    },
  },
  {
    question: 'What types of indexes does MongoDB support?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'SINGLE-FIELD is the basic case. COMPOUND covers multiple fields in a defined order and follows the prefix rule. MULTIKEY is created automatically on array fields, indexing each element. TEXT enables basic full-text search. GEOSPATIAL (2dsphere) supports location queries. HASHED is used for sharding. Special properties: UNIQUE enforces uniqueness, PARTIAL indexes only matching documents, SPARSE skips documents missing the field, and TTL automatically deletes documents after a set time.',
      hinglish:
        'SINGLE-FIELD basic case hai. COMPOUND ek defined order mein multiple fields cover karta hai aur prefix rule follow karta hai. MULTIKEY array fields pe automatically banta hai, har element index karte hue. TEXT basic full-text search enable karta hai. GEOSPATIAL (2dsphere) location queries support karta hai. HASHED sharding ke liye use hota hai. Special properties: UNIQUE uniqueness enforce karta hai, PARTIAL sirf matching documents index karta hai, SPARSE field missing wale documents skip karta hai, aur TTL ek set time ke baad documents automatically delete karta hai.',
    },
    visual: 'mongo-index',
    codeExample: {
      code: `// SINGLE FIELD
db.users.createIndex({ email: 1 });

// COMPOUND — order matters (see the prefix rule)
db.posts.createIndex({ authorId: 1, createdAt: -1 });

// MULTIKEY — automatic on an array field; one entry per element
db.posts.createIndex({ tags: 1 });        // find({ tags: 'node' })

// TEXT — word search across string fields (one per collection)
db.posts.createIndex({ title: 'text', body: 'text' });
db.posts.find({ $text: { $search: 'mongodb index' } });

// UNIQUE — an index plus a constraint
db.users.createIndex({ email: 1 }, { unique: true });

// PARTIAL — index only the documents you actually query
db.users.createIndex({ email: 1 },
  { partialFilterExpression: { active: true } });   // smaller, cheaper

// SPARSE — skip documents missing the field
db.users.createIndex({ phone: 1 }, { sparse: true });

// TTL — auto-delete after a time (see the TTL question)
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// GEOSPATIAL — location queries
db.places.createIndex({ location: '2dsphere' });

// HASHED — for sharding on a high-cardinality key
db.events.createIndex({ userId: 'hashed' });

// Partial indexes are the most underused: if 95% of your rows
// are archived and you never query them, indexing them is pure
// wasted RAM.`,
      output: `{ "createdCollectionAutomatically": false, "ok": 1 }`,
    },
  },
  {
    question: 'How does the compound index prefix rule work in MongoDB?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A compound index on `{a: 1, b: 1, c: 1}` can serve queries on `a`, on `a+b`, and on `a+b+c` — any LEFTMOST PREFIX — but not a query on `b` alone or `b+c`, because the index is sorted primarily by `a`. It can also support sorting, but only if the sort direction is consistent with the index (or exactly reversed). This is why field ORDER in a compound index is a design decision: put the most selective and most commonly filtered field first.',
      hinglish:
        '`{a: 1, b: 1, c: 1}` pe ek compound index `a` pe, `a+b` pe, aur `a+b+c` pe queries serve kar sakta hai — koi bhi LEFTMOST PREFIX — par akele `b` pe ya `b+c` pe nahi, kyunki index primarily `a` se sorted hai. Ye sorting bhi support kar sakta hai, par sirf tab jab sort direction index ke consistent ho (ya exactly reversed). Isiliye ek compound index mein field ORDER ek design decision hai: sabse selective aur sabse commonly filtered field pehle rakho.',
    },
    visual: 'mongo-index',
    codeExample: {
      code: `db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 });

// This ONE index also serves any left-to-right PREFIX of itself:
//   { userId }
//   { userId, status }
//   { userId, status, createdAt }

// ✓ uses the index
find({ userId: 7 })
find({ userId: 7, status: 'paid' })
find({ userId: 7, status: 'paid' }).sort({ createdAt: -1 })

// ✗ cannot use it — no userId, so there is no entry point
find({ status: 'paid' })
find({ createdAt: { $gte: d } })

// Think of a phone book sorted by (lastName, firstName). You
// can look up "Sharma", or "Sharma, Ana" — but you cannot find
// everyone named "Ana" without reading the whole book.

// So you do NOT need one index per query. Three separate
// indexes on userId, {userId,status} and {userId,status,createdAt}
// would be pure waste.

// Field ORDER, by the ESR rule:
//   Equality first, then Sort, then Range.
db.orders.createIndex({ status: 1, createdAt: -1, amount: 1 });
find({ status: 'paid', amount: { $gt: 100 } }).sort({ createdAt: -1 });
// A range field placed before a sort field breaks the sort's
// ability to use the index, and you get an in-memory SORT stage.

explain().executionStats;   // want IXSCAN, and no SORT stage`,
      output: `IXSCAN · totalKeysExamined 20 · no in-memory SORT`,
    },
  },
  {
    question: 'What is a TTL index and when is it useful?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A TTL index on a date field automatically deletes documents once that date is older than a configured number of seconds, with a background process running roughly every minute. It is ideal for sessions, one-time tokens, caches, and logs — anything with a natural expiry — because expiry becomes a schema property rather than a cron job you have to write and monitor. Note deletion is approximate rather than instant, so it is unsuitable when precise timing is a security requirement.',
      hinglish:
        'Ek date field pe ek TTL index documents ko automatically delete karta hai jab wo date ek configured seconds ki number se purani ho jaaye, ek background process roughly har minute chalta hua. Ye sessions, one-time tokens, caches, aur logs ke liye ideal hai — kisi bhi natural expiry wali cheez — kyunki expiry ek cron job ke bajaye ek schema property ban jaati hai jise tumhe likhna aur monitor karna pade. Note karo deletion instant ke bajaye approximate hai, isliye ye tab unsuitable hai jab precise timing ek security requirement ho.',
    },
    codeExample: {
      code: `// An index that makes MongoDB DELETE documents automatically
// once a date field is old enough.

// Form 1 — expire N seconds after the field's value:
db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });
// deletes each log 30 days after its createdAt

// Form 2 — the field IS the expiry time (more flexible):
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
await Session.create({ userId, expiresAt: new Date(Date.now() + 3600_000) });

// In Mongoose:
const schema = new Schema({
  token: String,
  createdAt: { type: Date, default: Date.now, expires: '15m' },
});

// Good for: sessions, refresh tokens, password-reset and OTP
// codes, rate-limit counters, caches, audit logs with a
// retention policy, temporary uploads.

// Things to know:
//   • a background task runs every ~60 SECONDS, so deletion is
//     approximate, not instant. Never rely on it for security —
//     still check expiresAt when you read the token.
//   • the field must be a Date (or an array of Dates). A number
//     or string is silently ignored and nothing ever expires.
//   • it does not work on a capped collection
//   • deletions are real writes and hit the oplog`,
      output: `deleted 1,204 expired sessions`,
    },
  },
  {
    question: 'How do you analyse and improve a slow MongoDB query?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Run `.explain("executionStats")` and read three things: the winning plan stage (COLLSCAN means no index was used, IXSCAN means one was), `totalDocsExamined` versus `nReturned` (a large gap means the query is reading far more than it returns), and execution time. Fixes: add an index matching the filter and sort, use projection to return only needed fields, ensure the sort can use the index rather than performing an in-memory sort, and check whether the aggregation pipeline places `$match` early enough.',
      hinglish:
        '`.explain("executionStats")` chalao aur teen cheezein padho: winning plan stage (COLLSCAN matlab koi index use nahi hua, IXSCAN matlab hua), `totalDocsExamined` versus `nReturned` (ek bada gap matlab query return karne se bahut zyada padh rahi hai), aur execution time. Fixes: filter aur sort se match karta ek index add karo, sirf zaroori fields return karne ke liye projection use karo, ensure karo ki sort ek in-memory sort karne ke bajaye index use kar sake, aur check karo ki aggregation pipeline `$match` ko kaafi jaldi rakhti hai ya nahi.',
    },
    codeExample: {
      code: `// 1. FIND it — turn on the profiler for slow operations.
db.setProfilingLevel(1, { slowms: 100 });
db.system.profile.find().sort({ ts: -1 }).limit(5);
// Atlas users: the Performance Advisor does this for you and
// even suggests the index.

// 2. EXPLAIN it.
db.orders.find({ userId: 7, status: 'paid' })
  .sort({ createdAt: -1 })
  .explain('executionStats');

// Read three numbers:
//   stage             COLLSCAN = no index used  ← the usual cause
//   totalDocsExamined vs nReturned — should be close
//   executionTimeMillis
// And look for a SORT stage: that means an in-memory sort,
// which fails outright above 32 MB.

// 3. FIX it, usually with the right index, in ESR order:
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 });

// Other common causes and fixes:
//   returning whole documents      → .select('name email')
//   Mongoose hydration overhead    → .lean()
//   deep skip() pagination         → cursor pagination
//   $regex without a ^ anchor      → cannot use an index
//   $match late in a pipeline      → move it first
//   N+1 populate in a loop         → one populate, or $lookup

// 4. Re-run explain and compare. Never "optimise" without the
//    before and after numbers.`,
      output: `COLLSCAN 240,000 docs 812ms → IXSCAN 20 docs 2ms`,
    },
  },
  {
    question: 'What is a replica set and how does failover work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A replica set is a group of mongod instances holding the same data: one PRIMARY accepting all writes, and secondaries replicating its oplog. If the primary becomes unreachable, the remaining members hold an ELECTION and a secondary is promoted, which is why an odd number of voting members matters — it prevents a tie and avoids split-brain. Applications connect to the set rather than a node, so the driver discovers the new primary automatically. Secondaries can also serve reads, at the cost of possible staleness.',
      hinglish:
        'Ek replica set mongod instances ka ek group hai jo wahi data rakhta hai: ek PRIMARY jo saare writes accept karta hai, aur secondaries jo uska oplog replicate karte hain. Agar primary unreachable ho jaaye, baaki members ek ELECTION karte hain aur ek secondary promote hota hai, isiliye voting members ki ek odd number matter karti hai — ye ek tie rokti hai aur split-brain avoid karti hai. Applications ek node ke bajaye set se connect karti hain, isliye driver naya primary automatically discover kar leta hai. Secondaries reads bhi serve kar sakte hain, possible staleness ke cost pe.',
    },
    visual: 'replica-set',
    codeExample: {
      code: `// A replica set is a group of mongod nodes holding the SAME
// data: one PRIMARY (all writes) and secondaries that replicate
// from it via the oplog.

//        ┌─ SECONDARY
// PRIMARY┤
//        └─ SECONDARY

// Failover, when the primary goes down:
//   1. Secondaries stop receiving heartbeats (~10s)
//   2. They hold an ELECTION and a majority picks a new primary
//   3. The new primary accepts writes (typically 10–12s total)
//   4. The old node rejoins as a secondary when it recovers

// This is why you need an ODD number of voting members — a
// majority must exist. Three nodes tolerate one failure; two
// nodes tolerate none.

// The driver handles it: it discovers the topology, retries
// once automatically, and finds the new primary. Your code just
// sees a brief pause.
const client = new MongoClient(uri, { retryWrites: true });

// Reads go to the primary by default. You may send them
// elsewhere, accepting staleness:
Order.find().read('secondaryPreferred');

// Replica sets also enable transactions and change streams —
// both require one. That is why Atlas gives you a three-node
// set even on the free tier.`,
      output: `PRIMARY stepped down → node-2 elected in 11s`,
    },
  },
  {
    question: 'What are read and write concerns in MongoDB?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'WRITE CONCERN specifies how many members must acknowledge a write before it is reported successful — `w: 1` is the primary only (fast, small data-loss window on failover), `w: "majority"` guarantees durability across a failover, and `j: true` additionally requires the journal to be flushed to disk. READ CONCERN specifies the consistency of reads — `local` may return data that could still be rolled back, while `majority` returns only data acknowledged by a majority. Together they let you tune the durability-versus-latency trade per operation.',
      hinglish:
        'WRITE CONCERN specify karta hai ki ek write successful report hone se pehle kitne members ko acknowledge karna hai — `w: 1` sirf primary hai (fast, failover pe chhota data-loss window), `w: "majority"` ek failover ke across durability guarantee karta hai, aur `j: true` additionally journal ko disk pe flush hone ke liye kehta hai. READ CONCERN reads ki consistency specify karta hai — `local` aisa data return kar sakta hai jo abhi bhi rollback ho sakta hai, jabki `majority` sirf ek majority se acknowledged data return karta hai. Saath mein ye tumhe per operation durability-versus-latency trade tune karne dete hain.',
    },
    visual: 'replica-set',
    codeExample: {
      code: `// WRITE CONCERN — how many nodes must acknowledge a write
// before it is reported as successful.
await Order.create([doc], { writeConcern: { w: 'majority', j: true } });

//   w: 1          the primary only (fast, can be lost in failover)
//   w: 'majority' most nodes (default in modern MongoDB) — survives
//                 a primary failure. This is what you want for money.
//   w: 0          fire and forget, no acknowledgement at all
//   j: true       also flushed to the on-disk journal
//   wtimeout      give up waiting after N ms

// READ CONCERN — how fresh and how durable the data you read is.
await Order.find().readConcern('majority');

//   'local'       whatever this node has (default) — may be rolled back
//   'majority'    only data acknowledged by a majority; never rolled back
//   'linearizable' strongest, slowest — reflects all prior writes
//   'snapshot'    a consistent point in time (used in transactions)

// The trade is always the same: durability and consistency
// versus latency.

// Sensible defaults:
//   payments, orders, anything you cannot lose
//     → w:'majority', j:true, readConcern 'majority'
//   analytics events, view counts, logs
//     → w:1, read from a secondary

// Reading with 'local' from a secondary can show you data that
// later disappears in a rollback — fine for a view count, not
// for a bank balance.`,
      output: `{ acknowledged: true, writeConcern: { w: 'majority', j: true } }`,
    },
  },
  {
    question: 'What is sharding and how do you choose a shard key?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Sharding partitions a collection across multiple servers to scale writes and storage beyond one machine. The shard key determines the distribution and is effectively PERMANENT, so it deserves real analysis. A good key has high cardinality, even write distribution, and matches your common query filters. Bad keys create HOTSPOTS — a monotonically increasing key like a timestamp sends every new write to one shard — or force SCATTER-GATHER queries that hit every shard because the key is absent from your filters.',
      hinglish:
        'Sharding ek collection ko multiple servers ke across partition karta hai taaki writes aur storage ek machine se aage scale karein. Shard key distribution determine karti hai aur effectively PERMANENT hai, isliye ise real analysis chahiye. Ek achhi key ki high cardinality hoti hai, even write distribution, aur ye tumhare common query filters se match karti hai. Buri keys HOTSPOTS banati hain — ek monotonically badhti key jaise ek timestamp har naya write ek shard pe bhejti hai — ya SCATTER-GATHER queries force karti hain jo har shard hit karti hain kyunki key tumhare filters mein nahi hoti.',
    },
    codeExample: {
      code: `// Sharding splits ONE collection across multiple machines
// horizontally — each shard holds a subset of the documents.
// Replication copies data; sharding divides it.

sh.shardCollection('app.orders', { userId: 'hashed' });

// The shard key decides which shard a document lands on, and it
// is the single most important decision — it is very hard to
// change later.

// A good shard key has:
//   1. HIGH CARDINALITY — many distinct values
//   2. EVEN WRITE DISTRIBUTION — no hot shard
//   3. IS IN YOUR COMMON QUERIES — otherwise every query is
//      "scatter-gather" and fans out to all shards

// ✗ createdAt or a monotonically increasing _id
//   Every new document has the highest value, so every write
//   goes to the SAME shard. You bought N machines and use one.
// ✗ status — only 3 values, so only 3 chunks
// ✓ { userId: 'hashed' } — even spread, and user-scoped
//   queries target one shard
// ✓ { tenantId: 1, createdAt: 1 } — compound, for multi-tenant

// Do not shard early. It adds config servers, routers,
// operational complexity and cross-shard query costs. Shard
// when a single replica set genuinely cannot hold the working
// set in RAM or absorb the write throughput — not before.`,
      output: `chunks: shard0 128 · shard1 131 · shard2 127`,
    },
  },
  {
    question: 'How do transactions work in MongoDB?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Single-document operations have always been ATOMIC, which handles most cases when the data model embeds related data. Since v4.0 MongoDB also supports multi-document ACID transactions across collections (and since 4.2 across shards), requiring a replica set. They carry real cost — additional locking, a 60-second default time limit, and reduced throughput — so the idiomatic guidance is to model data so that related fields live in one document, and reach for transactions only where atomicity genuinely spans documents.',
      hinglish:
        'Single-document operations hamesha ATOMIC rahe hain, jo zyadatar cases handle karta hai jab data model related data embed karta ho. v4.0 se MongoDB collections ke across multi-document ACID transactions bhi support karta hai (aur 4.2 se shards ke across), ek replica set chahte hue. Wo real cost rakhte hain — additional locking, ek 60-second default time limit, aur reduced throughput — isliye idiomatic guidance ye hai ki data ko aise model karo ki related fields ek document mein rahein, aur transactions sirf wahan uthao jahan atomicity genuinely documents ke across faili ho.',
    },
    codeExample: {
      code: `// Multi-document, all-or-nothing. Requires a replica set.
const session = await mongoose.startSession();

try {
  await session.withTransaction(async () => {
    const from = await Account.findOneAndUpdate(
      { _id: a, balance: { $gte: 100 } },        // guard in the filter
      { $inc: { balance: -100 } },
      { session, new: true },
    );
    if (!from) throw new Error('Insufficient funds');   // rolls back

    await Account.updateOne({ _id: b }, { $inc: { balance: 100 } }, { session });
    await Ledger.create([{ from: a, to: b, amount: 100 }], { session });
  });
} finally {
  await session.endSession();
}

// withTransaction is the right API: it commits on success,
// aborts on a throw, and RETRIES automatically on a transient
// error such as a write conflict.

// The rules:
//   • pass { session } to EVERY operation — one omission and
//     that write is outside the transaction and will not roll back
//   • Model.create needs an ARRAY when using a session
//   • default 60-second limit; keep them short
//   • no network calls or slow work inside — you are holding locks
//   • concurrent writes to the same document cause a
//     WriteConflict and a retry

// And remember: single-document updates are already atomic.
// Reach for a transaction only when two documents must change
// together.`,
      output: `Transaction committed · balances 900 / 1100`,
    },
  },
  {
    question: 'What is the difference between updateOne, updateMany, and replaceOne?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`updateOne` modifies the FIRST matching document using update operators such as `$set` or `$inc`. `updateMany` applies the same modification to EVERY match. `replaceOne` swaps the entire document with a new one, keeping only the `_id` — which is why accidentally passing a plain object instead of a `$set` operator to an update silently wipes every field you did not include. That mistake is one of the most common ways to lose data in MongoDB.',
      hinglish:
        '`updateOne` `$set` ya `$inc` jaise update operators se PEHLA matching document modify karta hai. `updateMany` wahi modification HAR match pe apply karta hai. `replaceOne` poore document ko ek naye se swap karta hai, sirf `_id` rakhte hue — isiliye ek update mein ek `$set` operator ke bajaye galti se ek plain object pass karna har us field ko silently mita deta hai jo tumne include nahi ki. Wo mistake MongoDB mein data khone ke sabse common tareekon mein se ek hai.',
    },
    codeExample: {
      code: `// updateOne — modifies the FIRST matching document only.
await User.updateOne({ role: 'user' }, { $set: { active: true } });
// { matchedCount: 1, modifiedCount: 1 }   even if 500 matched

// updateMany — modifies EVERY matching document.
await User.updateMany({ role: 'user' }, { $set: { active: true } });
// { matchedCount: 500, modifiedCount: 500 }

// replaceOne — swaps the whole document for a new one.
await User.replaceOne({ _id: id }, { name: 'Ana' });
// The result is { _id, name: 'Ana' } — email, role, createdAt
// and everything else are GONE. Only _id survives.

// That is the dangerous one, and the mistake shows up in
// updateOne too if you forget the operator:
await User.updateOne({ _id: id }, { name: 'Ana' });        // ✗ replaces!
await User.updateOne({ _id: id }, { $set: { name: 'Ana' } }); // ✓ patches

// (Mongoose is forgiving here and wraps it in $set; the raw
// driver is not. Never rely on that.)

// Return values differ too:
//   matchedCount  how many the filter found
//   modifiedCount how many actually CHANGED — writing the same
//                 value gives matched 1, modified 0
//   upsertedId    set only when an upsert inserted

// Want the document back? Use findOneAndUpdate(..., { new: true }).`,
      output: `{ matchedCount: 500, modifiedCount: 500 }`,
    },
  },
  {
    question: 'What is an upsert in MongoDB?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Passing `{ upsert: true }` to an update tells MongoDB to INSERT a new document if the filter matches nothing, and update otherwise. Its real value is atomicity: the naive alternative of "find, then insert or update" has a race condition where two concurrent requests both find nothing and both insert. `$setOnInsert` lets you set fields only in the insert case, such as a `createdAt` timestamp that should not change on subsequent updates.',
      hinglish:
        'Ek update mein `{ upsert: true }` pass karna MongoDB ko batata hai ki agar filter kuch match na kare to ek naya document INSERT karo, warna update karo. Iski asli value atomicity hai: "find, phir insert ya update" ka naive alternative ek race condition rakhta hai jahan do concurrent requests dono kuch nahi paate aur dono insert karte hain. `$setOnInsert` tumhe sirf insert case mein fields set karne deta hai, jaise ek `createdAt` timestamp jo baad ke updates pe nahi badalna chahiye.',
    },
    codeExample: {
      code: `// Update if it exists, insert if it does not — one atomic
// operation instead of a read-then-write race.
await Counter.updateOne(
  { page: '/home' },                    // filter
  { $inc: { views: 1 } },               // update
  { upsert: true },                     // ← create it if missing
);
// First call:  inserts { page: '/home', views: 1 }
// After that:  increments the existing document

// Fields from the FILTER are included in the new document, and
// $setOnInsert applies only on creation:
await User.updateOne(
  { email },
  { $set: { lastSeen: new Date() },
    $setOnInsert: { createdAt: new Date(), role: 'user' } },
  { upsert: true },
);

// The reason to use it: this is NOT equivalent —
const u = await User.findOne({ email });
if (u) await User.updateOne(…); else await User.create(…);   // ✗ race
// Two concurrent requests both see null and both insert.

// To make the race impossible even under load, add a unique
// index on the filter field:
db.users.createIndex({ email: 1 }, { unique: true });
// Without it, concurrent upserts can still create duplicates.

// Perfect for counters, sync jobs, "get or create", and
// idempotent webhook handlers.`,
      output: `{ upsertedCount: 1 } then { modifiedCount: 1 }`,
    },
  },
  {
    question: 'What is the difference between find() and aggregate()?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`find()` retrieves documents matching a filter, with basic projection, sort, skip, and limit — simple and fast for straightforward reads. `aggregate()` runs a multi-stage pipeline capable of grouping, joining, reshaping, computing derived fields, and unwinding arrays. Use `find()` for "give me these documents" and `aggregate()` for "compute something from these documents". Aggregation is more powerful but heavier, so reaching for it when a simple `find` suffices is unnecessary cost.',
      hinglish:
        '`find()` ek filter se match karte documents retrieve karta hai, basic projection, sort, skip, aur limit ke saath — straightforward reads ke liye simple aur fast. `aggregate()` ek multi-stage pipeline chalata hai jo grouping, joining, reshaping, derived fields compute karne, aur arrays unwind karne mein saksham hai. "Mujhe ye documents do" ke liye `find()` use karo aur "in documents se kuch compute karo" ke liye `aggregate()`. Aggregation zyada powerful par bhaari hai, isliye jab ek simple `find` kaafi ho tab ise uthana unnecessary cost hai.',
    },
    visual: 'agg-pipeline',
    codeExample: {
      code: `// find() — filter, project, sort, paginate. That is all.
await Order.find({ status: 'paid' })
  .select('amount userId')
  .sort({ createdAt: -1 })
  .limit(20);

// aggregate() — a pipeline that can also GROUP, JOIN, RESHAPE
// and COMPUTE:
await Order.aggregate([
  { $match: { status: 'paid' } },
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $lookup: { from: 'users', localField: '_id',
               foreignField: '_id', as: 'user' } },
  { $sort: { total: -1 } },
]);
// find() cannot express any of that.

// Use find when you want documents as they are stored — it is
// simpler, and slightly faster for the same work.
// Use aggregate when you need a computed RESULT: totals per
// group, joins, counts, buckets, computed fields, faceted
// search, or writing results to another collection.

// Two Mongoose-specific differences worth knowing:
//   • aggregate returns PLAIN objects, not Mongoose documents —
//     no virtuals, no methods, no schema casting on the way in.
//     You must cast ids yourself:
{ $match: { _id: new mongoose.Types.ObjectId(id) } }   // ✓
{ $match: { _id: id } }                                 // ✗ matches nothing
//   • populate() does not apply — use $lookup instead.`,
      output: `[{ _id: 7, total: 8420 }]`,
    },
  },
  {
    question: 'How does Mongoose middleware (hooks) work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Mongoose lets you run functions before (`pre`) or after (`post`) operations such as `save`, `validate`, `remove`, and query methods. Typical uses: hashing a password before save, populating derived fields, or cascading cleanup after delete. The critical gotcha is that DOCUMENT middleware like `pre("save")` does NOT run for query operations such as `updateOne` or `findOneAndUpdate` — so a password-hashing hook is silently bypassed by an update, which is a genuine security bug people ship regularly.',
      hinglish:
        'Mongoose tumhe `save`, `validate`, `remove`, aur query methods jaise operations se pehle (`pre`) ya baad (`post`) functions chalane deta hai. Typical uses: save se pehle ek password hash karna, derived fields populate karna, ya delete ke baad cascading cleanup. Critical gotcha ye hai ki `pre("save")` jaisa DOCUMENT middleware `updateOne` ya `findOneAndUpdate` jaise query operations ke liye NAHI chalta — isliye ek password-hashing hook ek update se silently bypass ho jaata hai, jo ek genuine security bug hai jo log regularly ship karte hain.',
    },
    codeExample: {
      code: `// Functions that run BEFORE or AFTER an operation.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);   // ✓ always hashed
  next();
});

userSchema.post('save', function (doc) {
  sendWelcomeEmail(doc.email);
});

// Two kinds, and this is the part people get wrong:

// DOCUMENT middleware — 'save', 'validate', 'remove'.
//   "this" is the DOCUMENT.
// QUERY middleware — 'find', 'findOne', 'findOneAndUpdate',
//   'updateOne'. "this" is the QUERY, not a document:
schema.pre('find', function () {
  this.where({ deleted: { $ne: true } });     // soft-delete filter
});

// Which means:
await User.findByIdAndUpdate(id, { password: 'plain' });
// ✗ the pre('save') hook does NOT run — the password is stored
//   in plain text. Use .save(), or add a pre('findOneAndUpdate')
//   hook too.

// Also: updateMany and the raw driver bypass hooks entirely.

// Good uses: hashing, slug generation, cascading deletes, audit
// logs, soft-delete filters, cache invalidation.
// Bad uses: slow network calls (they block the write) and
// business logic that becomes invisible action-at-a-distance.`,
      output: `password stored as $2b$12$…`,
    },
  },
  {
    question: 'What are Mongoose virtuals?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A virtual is a computed property that exists on the document but is NOT stored in MongoDB — a `fullName` derived from first and last name, or a `url` built from a slug. They keep derived data consistent without duplicating it in storage. Two things to remember: virtuals cannot be used in queries, since the database does not know they exist, and they are excluded from `toJSON()` output unless you explicitly enable `{ virtuals: true }`.',
      hinglish:
        'Ek virtual ek computed property hai jo document pe exist karti hai par MongoDB mein STORE nahi hoti — first aur last name se derive ek `fullName`, ya ek slug se bana ek `url`. Ye derived data ko storage mein duplicate kiye bina consistent rakhte hain. Do cheezein yaad rakho: virtuals queries mein use nahi ho sakte, kyunki database ko pata hi nahi ki wo exist karte hain, aur wo `toJSON()` output se excluded hote hain jab tak tum explicitly `{ virtuals: true }` enable na karo.',
    },
    codeExample: {
      code: `// A field that is COMPUTED on read and never stored in MongoDB.
userSchema.virtual('fullName').get(function () {
  return \`\${this.firstName} \${this.lastName}\`;
});

const u = await User.findById(id);
u.fullName;         // 'Ana Sharma' — not in the database

// Virtuals can have setters too:
userSchema.virtual('fullName').set(function (v) {
  [this.firstName, this.lastName] = v.split(' ');
});

// Two things to know:

// 1. Virtuals are NOT included in JSON by default:
JSON.stringify(u);       // no fullName
userSchema.set('toJSON',   { virtuals: true });
userSchema.set('toObject', { virtuals: true });

// 2. You cannot QUERY or sort on one — there is no field in the
//    database to index:
await User.find({ fullName: 'Ana Sharma' });    // ✗ matches nothing

// VIRTUAL POPULATE is the genuinely powerful use — a reverse
// relation with nothing stored on the parent:
userSchema.virtual('posts', {
  ref: 'Post', localField: '_id', foreignField: 'author',
});
await User.findById(id).populate('posts');
// The user document holds no array of post ids, so it can never
// outgrow 16 MB, and you still get the relation.

// Also good for: age from a birthdate, a computed URL, a
// discounted price, or hiding derived data from storage.`,
      output: `Ana Sharma`,
    },
  },
  {
    question: 'What is the difference between lean() and a normal Mongoose query?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'By default Mongoose hydrates results into full Mongoose Documents, which carry change tracking, validation, virtuals, and methods — useful, but meaningfully slower and heavier in memory. `.lean()` returns plain JavaScript objects instead, which is often several times faster for large result sets. Use it for read-only endpoints where you just serialise to JSON. Do NOT use it when you intend to call `.save()`, use virtuals, or rely on document methods, since none of those exist on a plain object.',
      hinglish:
        'Default se Mongoose results ko full Mongoose Documents mein hydrate karta hai, jo change tracking, validation, virtuals, aur methods rakhte hain — useful, par meaningfully slower aur memory mein bhaari. `.lean()` uske bajaye plain JavaScript objects return karta hai, jo bade result sets ke liye aksar kai guna faster hai. Ise read-only endpoints ke liye use karo jahan tum bas JSON mein serialise karte ho. Ise tab use MAT karo jab tum `.save()` call karna chahte ho, virtuals use karte ho, ya document methods pe rely karte ho, kyunki wo kuch bhi ek plain object pe exist nahi karta.',
    },
    codeExample: {
      code: `// Normal — Mongoose HYDRATES each result into a full document.
const users = await User.find();
users[0] instanceof mongoose.Document;   // true
users[0].save();                          // ✓ methods, virtuals, getters

// .lean() — returns plain JavaScript objects straight from the
// driver, skipping hydration.
const users = await User.find().lean();
users[0].save();      // ✗ TypeError: not a function

// What you lose: save(), validation, virtuals, getters/setters,
// custom instance methods, and change tracking.
// What you gain: typically 3–5x faster and far less memory,
// because building thousands of documents is not free.

// So the rule is simple: use lean() on READ-ONLY paths.
app.get('/posts', async (req, res) => {
  res.json(await Post.find().limit(50).lean());     // ✓ just serialising
});

// and skip it when you will modify and save:
const user = await User.findById(id);               // ✓ no lean
user.role = 'admin';
await user.save();

// populate() still works with lean():
await Post.find().populate('author', 'name').lean();

// If you rely on virtuals in the response, either drop lean()
// or use the mongoose-lean-virtuals plugin.

// For an API that mostly reads, adding .lean() to list
// endpoints is one of the cheapest wins available.`,
      output: `hydrate 5,000 docs: 84ms → lean: 19ms`,
    },
  },
  {
    question: 'How does populate() work and what are its performance implications?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`populate()` replaces stored ObjectIds with the referenced documents, simulating a join. Mechanically Mongoose issues a SEPARATE query per populated path and stitches the results in application memory — it is not a database join. So populating three paths on a list of results means multiple round trips, and deep or nested population multiplies that. Mitigate by selecting only needed fields, populating only what the response actually uses, or embedding the data if it is always read together.',
      hinglish:
        '`populate()` stored ObjectIds ko referenced documents se replace karta hai, ek join simulate karte hue. Mechanically Mongoose per populated path ek SEPARATE query karta hai aur results ko application memory mein jodta hai — ye ek database join nahi hai. Isliye results ki ek list pe teen paths populate karna matlab multiple round trips, aur deep ya nested population use multiply karta hai. Sirf zaroori fields select karke, sirf wo populate karke jo response actually use karta hai, ya data embed karke agar wo hamesha saath padha jaata hai, ise mitigate karo.',
    },
    codeExample: {
      code: `// Mechanically: Mongoose runs your query, collects the
// ObjectIds from the ref field, then runs a SECOND query with
// $in and stitches the results together in Node.
const posts = await Post.find().populate('author');
// query 1: db.posts.find({})
// query 2: db.users.find({ _id: { $in: [ …unique ids… ] } })

// So it is two round trips, not a join. That is fine — the ids
// are deduplicated, so 100 posts by 5 authors is still 2 queries.

// The real costs:
//   1. N+1 if you populate inside a loop:
for (const p of posts) await p.populate('author');   // ✗ 101 queries
//   2. Unindexed foreign fields — always index the ref field
db.posts.createIndex({ author: 1 });
//   3. Pulling entire documents when you need one field:
.populate('author', 'name avatar')                    // ✓ project
//   4. Nested populates multiply the round trips
//   5. You cannot FILTER or SORT the parent by a populated
//      field — the database never sees it:
.populate({ path: 'author', match: { active: true } })
// non-matching authors become null, but the POST is still
// returned. You must filter the nulls yourself.

// When any of that hurts, switch to $lookup — one server-side
// pass — or denormalise the one or two fields you always show:
{ title: 'Post', author: { _id, name: 'Ana' } }

// And add .lean() to read-only populated queries.`,
      output: `2 queries · 100 posts · 5 authors`,
    },
  },
  {
    question: 'What is an ObjectId and what does it contain?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An ObjectId is a 12-byte identifier: a 4-byte TIMESTAMP, a 5-byte random value per process, and a 3-byte incrementing counter. Because the timestamp comes first, ObjectIds are roughly sortable by creation time and you can extract the creation date without a separate field. They are generated CLIENT-side by the driver, so no round trip is needed to obtain an id. The downside is they are guessable and leak creation timing, so they are not ideal as public identifiers.',
      hinglish:
        'Ek ObjectId ek 12-byte identifier hai: ek 4-byte TIMESTAMP, per process ek 5-byte random value, aur ek 3-byte badhta counter. Kyunki timestamp pehle aata hai, ObjectIds creation time se roughly sortable hain aur tum ek separate field ke bina creation date extract kar sakte ho. Ye driver ke through CLIENT-side generate hote hain, isliye ek id paane ke liye koi round trip nahi chahiye. Downside ye hai ki wo guessable hain aur creation timing leak karte hain, isliye wo public identifiers ke roop mein ideal nahi hain.',
    },
    codeExample: {
      code: `// A 12-byte identifier, shown as 24 hex characters.
new ObjectId('64f8a1b2c3d4e5f6a7b8c9d0');

//   4 bytes  Unix timestamp in seconds
//   5 bytes  random value, per process
//   3 bytes  incrementing counter
// → globally unique without any coordination between servers.

// The timestamp is genuinely useful — it means _id encodes
// creation time:
id.getTimestamp();                    // 2023-09-06T…
Post.find().sort({ _id: -1 });        // newest first, no createdAt needed
Post.find({ _id: { $gt: ObjectId.createFromTime(cutoff) } });

// Practical points:
//   • it is an OBJECT, not a string — compare correctly:
a === b                    // ✗ false even for the same id
a.equals(b)                // ✓
a.toString() === b.toString()   // ✓
//   • strings from req.params must be cast in aggregations:
{ $match: { _id: new mongoose.Types.ObjectId(req.params.id) } }
//   (Mongoose casts automatically in find(), but never in
//   aggregate() — the silent "returns nothing" bug.)
//   • validate before casting, or a bad string throws:
mongoose.Types.ObjectId.isValid(id);
//   • it is NOT a secret. It is guessable and leaks creation
//     time and rough record volume — use a UUID or slug in
//     public URLs if that matters.`,
      output: `2023-09-06T14:22:10.000Z`,
    },
  },
  {
    question: 'How do you prevent NoSQL injection in MongoDB?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The attack works because MongoDB query operators are just JSON keys: passing `req.body` straight into `User.findOne()` lets an attacker send `{"password": {"$ne": null}}` and match any user, bypassing authentication entirely. Prevention: validate and whitelist input with a schema library so only expected types reach the query, cast values explicitly to strings, never spread raw request objects into a filter, and optionally use `express-mongo-sanitize` to strip keys beginning with `$`.',
      hinglish:
        'Attack isliye kaam karta hai kyunki MongoDB query operators bas JSON keys hain: `req.body` ko seedha `User.findOne()` mein daalna ek attacker ko `{"password": {"$ne": null}}` bhejne aur kisi bhi user ko match karne deta hai, authentication poori tarah bypass karte hue. Prevention: ek schema library se input validate aur whitelist karo taaki sirf expected types query tak pahunchein, values ko explicitly strings mein cast karo, raw request objects ko kabhi ek filter mein spread mat karo, aur optionally `$` se shuru hone wali keys strip karne ke liye `express-mongo-sanitize` use karo.',
    },
    codeExample: {
      code: `// The attack: a JSON body can smuggle OPERATORS where you
// expected a value.
// POST /login  { "email": "a@b.com", "password": { "$ne": null } }
await User.findOne({ email, password });
// → matches any password that is not null. Logged in.

// Or { "role": { "$ne": "nobody" } } to list every user, or
// $regex to brute-force a value one character at a time.

// Defence 1 — VALIDATE with a schema. This is the real fix,
// because it also catches everything else:
const body = z.object({
  email: z.string().email(),
  password: z.string().min(8),
}).parse(req.body);          // an object where a string is
                             // expected throws immediately

// Defence 2 — coerce types explicitly when you have no schema:
await User.findOne({ email: String(req.query.email) });

// Defence 3 — strip $ and dotted keys at the edge:
import mongoSanitize from 'express-mongo-sanitize';
app.use(mongoSanitize());

// Defence 4 — never pass a request object straight through:
await User.find(req.query);                        // ✗
await User.find({ role: String(req.query.role) }); // ✓

// Defence 5 — never build a query with $where or eval; both
// execute JavaScript on the server.

// Mongoose's schema casting helps (a string field rejects an
// object), but do not rely on it alone — mixed and untyped
// fields slip through, and the raw driver has no casting.`,
      output: `ZodError: Expected string, received object`,
    },
  },
  {
    question: 'What is the difference between MongoDB and a relational database?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'MongoDB stores flexible JSON-like DOCUMENTS with no enforced schema, favours embedding related data to avoid joins, and scales horizontally through sharding. Relational databases store rows in fixed-schema tables, normalise data and reassemble it with JOINs, and enforce integrity through foreign keys and constraints. The practical distinction is where structure is enforced: MongoDB pushes it into the application, which is flexible but means the database will happily store inconsistent shapes if nothing else checks.',
      hinglish:
        'MongoDB flexible JSON-jaise DOCUMENTS store karta hai bina enforced schema ke, joins avoid karne ke liye related data embed karna prefer karta hai, aur sharding se horizontally scale karta hai. Relational databases fixed-schema tables mein rows store karte hain, data normalise karke JOINs se wapas jodte hain, aur foreign keys aur constraints se integrity enforce karte hain. Practical distinction ye hai ki structure kahan enforce hota hai: MongoDB ise application mein dhakel deta hai, jo flexible hai par matlab database khushi se inconsistent shapes store karega agar aur kuch check na kare.',
    },
    codeExample: {
      code: `// STRUCTURE
// SQL — rows in fixed-column tables, joined by keys:
//   users(id, name)   orders(id, user_id, total)
//   SELECT * FROM users u JOIN orders o ON o.user_id = u.id;

// MongoDB — flexible documents, related data often together:
{ _id: 1, name: 'Ana',
  orders: [ { total: 500 }, { total: 320 } ] }    // one read

// SCHEMA
//   SQL      enforced by the database; ALTER TABLE to change
//   MongoDB  flexible; two documents may differ. Validation is
//            your job (Mongoose, or a JSON Schema validator)

// SCALING
//   SQL      mostly vertical; sharding is bolted on
//   MongoDB  horizontal sharding built in

// TRANSACTIONS
//   SQL      multi-table ACID, the core design
//   MongoDB  atomic per document; multi-document since 4.0,
//            but used far less often

// QUERIES
//   SQL      declarative, arbitrary joins are cheap and natural
//   MongoDB  aggregation pipeline; $lookup exists but joins
//            are not the model's strength

// The real difference is where you pay: SQL makes you decide the
// schema up front and rewards you with flexible queries.
// MongoDB lets you start fast and makes you decide the ACCESS
// PATTERNS up front — model for how you read, or it hurts later.`,
      output: `1 document read vs 1 join across 2 tables`,
    },
  },
  {
    question: 'When should you NOT use MongoDB?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Avoid it when the data is highly relational with many-to-many relationships that would require constant `$lookup`, since joins are its weakest area. Avoid it when you need complex multi-entity ACID transactions as a routine pattern rather than an exception. Avoid it for heavy analytical aggregation over columns, where a columnar warehouse is far better suited. And avoid choosing it purely because "schemas are annoying" — schema flexibility is a genuine trade, not a free win, and unenforced structure becomes a liability as a codebase grows.',
      hinglish:
        'Ise tab avoid karo jab data highly relational ho bahut many-to-many relationships ke saath jinhe constant `$lookup` chahiye, kyunki joins iska sabse weak area hai. Ise tab avoid karo jab tumhe complex multi-entity ACID transactions ek exception ke bajaye ek routine pattern ki tarah chahiye. Columns pe heavy analytical aggregation ke liye ise avoid karo, jahan ek columnar warehouse bahut better suited hai. Aur ise purely isliye chunne se bacho ki "schemas annoying hain" — schema flexibility ek genuine trade hai, ek free win nahi, aur unenforced structure ek codebase badhne pe ek liability ban jaata hai.',
    },
    codeExample: {
      code: `// 1. Heavily RELATIONAL data with many-way joins.
//    Reporting across users × orders × products × regions:
SELECT r.name, SUM(oi.qty * p.price)
FROM orders o JOIN order_items oi … JOIN products p … JOIN regions r …
GROUP BY r.name;
//    Trivial in SQL. In MongoDB it is four $lookups, slow and
//    hard to read.

// 2. Multi-entity TRANSACTIONS as the normal case — banking,
//    accounting, inventory with reservations. MongoDB supports
//    them, but if every write needs one, use Postgres.

// 3. Strict schema and data integrity requirements — foreign
//    keys, CHECK constraints, enforced types across every client.

// 4. Ad-hoc ANALYTICS and BI. Analysts know SQL; Metabase,
//    Looker and Tableau speak SQL first.

// 5. When the data really is tabular. A flat table of rows
//    gains nothing from documents.

// 6. Small projects where Postgres does everything anyway —
//    it has JSONB for the flexible parts:
CREATE TABLE events (id serial, payload jsonb);

// MongoDB fits well for: content and catalogs with varying
// shapes, event and log data, real-time feeds, caches,
// rapid prototyping, and anything sharded across many machines.

// "Which database" is really "what do my queries look like".`,
      output: `4 $lookups vs 1 SQL query`,
    },
  },
  {
    question: 'What is the oplog?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'The oplog (operations log) is a capped collection on the primary recording every write operation in an idempotent form. Secondaries tail it and replay those operations to stay in sync, which is the mechanism behind replication. Because it is CAPPED, it holds only a fixed window of history — if a secondary falls further behind than the oplog retains, it can no longer catch up incrementally and must be fully resynced. Change Streams are also built on top of the oplog.',
      hinglish:
        'Oplog (operations log) primary pe ek capped collection hai jo har write operation ko ek idempotent form mein record karta hai. Secondaries ise tail karte hain aur un operations ko replay karke sync mein rehte hain, jo replication ke peeche mechanism hai. Kyunki ye CAPPED hai, ye sirf history ka ek fixed window rakhta hai — agar ek secondary oplog ke rakhne se zyada peeche gir jaaye, wo ab incrementally catch up nahi kar sakta aur use fully resync karna padta hai. Change Streams bhi oplog ke upar bane hain.',
    },
    visual: 'replica-set',
    codeExample: {
      code: `// The OPERATIONS LOG — a capped collection on the primary
// recording every change to the data.
use local;
db.oplog.rs.find().sort({ $natural: -1 }).limit(1);
// { op: 'u', ns: 'app.users', o: { $set: { role: 'admin' } }, ts: … }
//   op: 'i' insert · 'u' update · 'd' delete

// Secondaries tail it continuously and replay each entry, which
// is exactly how replication works.

// Two properties matter:

// 1. It is IDEMPOTENT. Entries are rewritten so replaying them
//    twice is safe — an $inc becomes a $set of the final value.
//    That makes recovery and re-sync possible.

// 2. It is CAPPED — a fixed size, oldest entries overwritten.
//    If a secondary falls further behind than the oplog window,
//    it can no longer catch up and needs a FULL RESYNC:
rs.printReplicationInfo();     // → "oplog window: 26.4 hours"
//    Size it so the window comfortably exceeds your longest
//    maintenance or backup, typically 24–72 hours.

// It also powers point-in-time recovery, Change Streams (which
// are a supported API on top of it), and migration tools.

// Only replica set members have one. A standalone mongod does
// not — another reason Atlas always gives you a replica set.`,
      output: `oplog window: 26.4 hours`,
    },
  },
  {
    question: 'What are Change Streams?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Change Streams let an application SUBSCRIBE to real-time changes on a collection or database, receiving insert, update, delete, and replace events as they happen. They are built on the oplog and require a replica set. Their value is replacing polling: instead of repeatedly querying for new rows, you receive events, which is how you build live dashboards, cache invalidation, and notification pipelines. They are also resumable via a resume token, so a consumer that disconnects can continue rather than losing events.',
      hinglish:
        'Change Streams ek application ko ek collection ya database pe real-time changes SUBSCRIBE karne dete hain, insert, update, delete, aur replace events unke hote hi receive karte hue. Ye oplog pe bane hain aur ek replica set chahte hain. Inki value polling ko replace karna hai: naye rows ke liye baar-baar query karne ke bajaye, tum events receive karte ho, jisse tum live dashboards, cache invalidation, aur notification pipelines banate ho. Ye ek resume token se resumable bhi hain, isliye ek disconnect hua consumer events khone ke bajaye continue kar sakta hai.',
    },
    codeExample: {
      code: `// A real-time subscription to changes in a collection — built
// on the oplog, but with a safe, resumable API.
const stream = Order.watch([
  { $match: { operationType: { $in: ['insert', 'update'] } } },
]);

for await (const change of stream) {
  change.operationType;    // 'insert' | 'update' | 'delete' | 'replace'
  change.documentKey._id;
  change.updateDescription.updatedFields;
  io.emit('order:changed', change);        // push to connected clients
}

// To receive the whole document after an update:
Order.watch([], { fullDocument: 'updateLookup' });

// You can also watch a database or the entire deployment:
mongoose.connection.watch();

// The key feature is RESUMABILITY. Every event carries a
// resume token; store it and pick up exactly where you stopped
// after a restart or a network blip:
Order.watch([], { resumeAfter: savedToken });
// This is what makes it safe for production, unlike tailing
// the oplog yourself.

// Uses: live dashboards, cache invalidation, search index sync,
// notifications, audit trails, syncing to a data warehouse.

// Requires a replica set. And remember it is per-process — with
// several app instances each will receive every event, so
// deduplicate or run the watcher as a single worker.`,
      output: `insert 64f8… → pushed to 3 clients`,
    },
  },
  {
    question: 'What is GridFS and when do you need it?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'GridFS stores files larger than the 16MB document limit by splitting them into chunks across two collections, allowing streaming and partial reads. It is genuinely useful when you want files inside the database for transactional or operational simplicity. However, for most applications object storage such as S3 is the better choice — it is cheaper, serves files directly via CDN, and keeps large binaries out of your database backups, which otherwise become slow and expensive.',
      hinglish:
        'GridFS 16MB document limit se bade files ko do collections ke across chunks mein split karke store karta hai, streaming aur partial reads allow karte hue. Ye tab genuinely useful hai jab tum transactional ya operational simplicity ke liye files database ke andar chahte ho. Halaanki, zyadatar applications ke liye S3 jaisa object storage better choice hai — ye sasta hai, files ko directly CDN se serve karta hai, aur bade binaries ko tumhare database backups se bahar rakhta hai, jo warna slow aur mehnge ho jaate hain.',
    },
    codeExample: {
      code: `// A specification for storing files LARGER than 16 MB by
// splitting them into chunks across two collections:
//   fs.files   → metadata (filename, length, uploadDate)
//   fs.chunks  → 255 KB binary pieces

import { GridFSBucket } from 'mongodb';
const bucket = new GridFSBucket(db, { bucketName: 'videos' });

// Upload
fs.createReadStream('lecture.mp4')
  .pipe(bucket.openUploadStream('lecture.mp4', {
    metadata: { courseId, uploadedBy: userId },
  }));

// Download — streams, so memory stays flat
app.get('/video/:id', (req, res) => {
  bucket.openDownloadStream(new ObjectId(req.params.id)).pipe(res);
});

// It also lets you read a RANGE without loading the whole file:
bucket.openDownloadStream(id, { start: 0, end: 1_000_000 });

// When you actually need it:
//   • files exceed 16 MB
//   • you want files inside your existing backup and replication
//   • regulatory reasons to keep everything in one system
//   • no object storage available

// When you should NOT: almost every web app. S3, R2 or
// Cloudflare storage is cheaper, faster, CDN-backed and does
// not put file bytes in your database's RAM budget. Store a URL:
{ title: 'Lecture 1', videoUrl: 'https://cdn…/lecture.mp4' }`,
      output: `uploaded lecture.mp4 · 214 MB · 861 chunks`,
    },
  },
  {
    question: 'What is the bucket pattern in MongoDB?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'The bucket pattern groups many small related documents into a single document holding an array of items — for example one document per sensor per hour containing that hour\'s readings, rather than one document per reading. Benefits: dramatically fewer documents, smaller index sizes, and far faster reads for time-range queries since one fetch returns a whole period. It is the standard approach for time-series and IoT data, and directly addresses the unbounded-array problem by capping each bucket.',
      hinglish:
        'Bucket pattern bahut chhote related documents ko ek single document mein group karta hai jo items ka ek array rakhta hai — for example per sensor per hour ek document jisme us hour ki readings hon, per reading ek document ke bajaye. Benefits: dramatically kam documents, chhote index sizes, aur time-range queries ke liye bahut faster reads kyunki ek fetch poora period return karta hai. Ye time-series aur IoT data ke liye standard approach hai, aur har bucket ko cap karke unbounded-array problem ko directly address karta hai.',
    },
    codeExample: {
      code: `// Group many tiny documents into fewer, larger ones — the
// standard fix for time-series and high-volume data.

// ✗ One document per reading: 86,400 per sensor per day.
{ sensorId: 'a', at: ISODate('…10:00:01'), value: 21.4 }
{ sensorId: 'a', at: ISODate('…10:00:02'), value: 21.5 }
// Each carries an _id, index entries and BSON overhead —
// often more bytes of overhead than of data.

// ✓ One BUCKET per sensor per hour:
{
  sensorId: 'a',
  hour: ISODate('2026-08-12T10:00Z'),
  count: 3600,
  min: 20.9, max: 22.3, sum: 76_140,     // pre-computed
  readings: [ { s: 1, v: 21.4 }, { s: 2, v: 21.5 }, … ],
}

// Written with an upsert that also caps the bucket size:
await Bucket.updateOne(
  { sensorId, hour, count: { $lt: 3600 } },
  { $push: { readings: { s, v } },
    $inc: { count: 1, sum: v },
    $min: { min: v }, $max: { max: v } },
  { upsert: true },
);

// The wins: far fewer documents, dramatically smaller indexes,
// one read fetches a whole hour, and min/max/avg are already
// there. Typically a 5–10x reduction in storage.

// The cost: more complex writes, and updating a single old
// reading is awkward. Keep buckets bounded so they never
// approach 16 MB.

// MongoDB 5.0+ time-series collections do this automatically.`,
      output: `86,400 docs/day → 24 docs/day`,
    },
  },
  {
    question: 'How do you model a many-to-many relationship in MongoDB?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Two common approaches. Store an ARRAY OF REFERENCES on one or both sides — a student document holding `courseIds` — which is simple and works well when one side is bounded. Or use a separate JUNCTION collection like a relational database, which is right when the relationship itself has attributes (enrolment date, grade) or when both sides can grow large. Choose based on which side you query from and whether the arrays would grow without bound.',
      hinglish:
        'Do common approaches. Ek ya dono sides pe REFERENCES KA ARRAY store karo — ek student document jo `courseIds` rakhta ho — jo simple hai aur tab achha kaam karta hai jab ek side bounded ho. Ya ek relational database ki tarah ek separate JUNCTION collection use karo, jo tab sahi hai jab relationship khud ke attributes hon (enrolment date, grade) ya jab dono sides bade ho sakte hon. Is basis pe choose karo ki tum kis side se query karte ho aur kya arrays bina bound ke badhenge.',
    },
    codeExample: {
      code: `// Example: students ↔ courses.

// Option 1 — an array of ids on ONE side (usually best).
{ _id: 1, name: 'Ana', courseIds: [ObjectId('a'), ObjectId('b')] }
db.students.createIndex({ courseIds: 1 });      // multikey index

await Student.find({ courseIds: courseId });    // students in a course
await Student.findById(id).populate('courseIds');

// Put the array on the side with the SMALLER, bounded list. A
// student takes ~10 courses; a course may have 50,000 students,
// so do not put studentIds on the course.

// Option 2 — arrays on BOTH sides. Fast reads in either
// direction, but you must keep them in sync on every change,
// and both can grow unbounded. Rarely worth it.

// Option 3 — a JOIN COLLECTION, like SQL. Use it when the
// relationship itself has data, or either side is unbounded:
{ studentId: ObjectId('…'), courseId: ObjectId('…'),
  enrolledAt: ISODate(), grade: 'A', progress: 0.62 }
db.enrollments.createIndex({ studentId: 1, courseId: 1 }, { unique: true });
db.enrollments.createIndex({ courseId: 1 });    // the reverse lookup

// This is the safest default for anything at scale: no
// unbounded array, an obvious place for grade and progress, and
// both directions are indexed.

// The choosing rule, as always: is either side unbounded, and
// does the relationship carry its own fields?`,
      output: `enrollments: unique(studentId, courseId)`,
    },
  },
  {
    question: 'What is the difference between $set and $push?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`$set` assigns a value to a field, replacing whatever was there — using it on an array replaces the ENTIRE array. `$push` appends an element to an array without touching existing items, and supports modifiers such as `$each` for multiple values, `$slice` to cap the array length, and `$sort`. Related operators: `$addToSet` pushes only if the value is not already present, and `$pull` removes matching elements. Reaching for `$set` when you meant `$push` is a common way to silently destroy array data.',
      hinglish:
        '`$set` ek field ko ek value assign karta hai, jo bhi wahan tha use replace karte hue — ise ek array pe use karna POORA array replace kar deta hai. `$push` ek element ko ek array mein append karta hai bina existing items ko chhue, aur multiple values ke liye `$each`, array length cap karne ke liye `$slice`, aur `$sort` jaise modifiers support karta hai. Related operators: `$addToSet` sirf tab push karta hai jab value already present na ho, aur `$pull` matching elements hataata hai. `$push` ka matlab hote hue `$set` uthana array data silently destroy karne ka ek common tareeka hai.',
    },
    codeExample: {
      code: `// $set — assign a value to a field, replacing whatever is there.
await User.updateOne({ _id: id }, { $set: { name: 'Ana', role: 'admin' } });
// Creates the field if missing. Works on nested paths:
{ $set: { 'address.city': 'Pune' } }        // only that key changes

// $push — append an element to an ARRAY.
await Post.updateOne({ _id: id }, { $push: { tags: 'node' } });
// tags: ['js'] → ['js', 'node']

// The difference on an array field:
{ $set:  { tags: ['node'] } }     // REPLACES the whole array
{ $push: { tags: 'node' } }       // adds one element

// $push extras:
{ $push: { scores: { $each: [8, 9], $sort: -1, $slice: 10 } } }
// append several, sort, and keep only the top 10 — a neat way
// to maintain a bounded "recent items" array.

// Related operators worth knowing:
$addToSet   // push only if not already present (a set)
$pull       // remove elements matching a condition
$pop        // remove first (-1) or last (1)
$inc        // increment a number
$unset      // delete a field entirely

// All of these are ATOMIC on the server, which is why you use
// them rather than reading, mutating in Node and saving back —
// that pattern loses concurrent updates.`,
      output: `tags: ['js'] → ['js','node']`,
    },
  },
  {
    question: 'How do you implement pagination in MongoDB?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`skip()` with `limit()` is simplest but degrades badly on deep pages, because MongoDB must walk and discard every skipped document — page 10,000 scans a million records. CURSOR (range) pagination instead filters on the last seen sorted value, such as `{ _id: { $gt: lastId } }`, which uses the index directly and stays fast at any depth. It also avoids the duplicate-and-skip problem that occurs when documents are inserted between page requests, at the cost of no random page access.',
      hinglish:
        '`skip()` aur `limit()` sabse simple hai par deep pages pe buri tarah degrade hota hai, kyunki MongoDB ko har skipped document chal kar discard karna padta hai — page 10,000 das lakh records scan karta hai. CURSOR (range) pagination uske bajaye aakhri dekhi sorted value pe filter karta hai, jaise `{ _id: { $gt: lastId } }`, jo index directly use karta hai aur kisi bhi depth pe fast rehta hai. Ye us duplicate-and-skip problem ko bhi avoid karta hai jo page requests ke beech documents insert hone pe hoti hai, random page access na hone ke cost pe.',
    },
    codeExample: {
      code: `// SKIP / LIMIT — simple, and fine for the first few pages.
const page = 3, limit = 20;
const items = await Post.find({ status: 'published' })
  .sort({ createdAt: -1 })
  .skip((page - 1) * limit)
  .limit(limit)
  .lean();
const total = await Post.countDocuments({ status: 'published' });

// Two problems appear at scale:
//   1. skip(100000) makes the server walk and DISCARD 100,000
//      documents every time. It gets linearly slower.
//   2. a new document inserted between page loads shifts
//      everything, so the user sees an item twice or misses one.

// CURSOR (keyset) pagination — constant time at any depth:
const q = cursor ? { _id: { $lt: new ObjectId(cursor) } } : {};
const docs = await Post.find({ status: 'published', ...q })
  .sort({ _id: -1 })
  .limit(limit + 1)          // fetch one extra to detect "more"
  .lean();

const hasMore = docs.length > limit;
res.json({
  items: docs.slice(0, limit),
  nextCursor: hasMore ? docs[limit - 1]._id : null,
});

// The index must match the sort exactly:
db.posts.createIndex({ status: 1, _id: -1 });

// Trade-off: no jumping to page 47. Which is why infinite feeds
// use cursors and admin tables use skip/limit.`,
      output: `skip(100000) 940ms → cursor 3ms`,
    },
  },
  {
    question: 'What is the working set and why does it matter for MongoDB performance?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'The working set is the portion of data and indexes actively accessed by your queries. MongoDB performs well as long as the working set fits in RAM, because reads are served from memory. Once it exceeds available RAM, the engine must fetch pages from disk, and performance falls off sharply rather than gradually. This is why indexes should be kept lean, why unnecessary indexes are actively harmful, and why "add more RAM" is so often the effective fix for a suddenly slow MongoDB instance.',
      hinglish:
        'Working set data aur indexes ka wo hissa hai jise tumhari queries actively access karti hain. MongoDB tab tak achha perform karta hai jab tak working set RAM mein fit ho, kyunki reads memory se serve hoti hain. Available RAM se zyada hone pe, engine ko disk se pages laane padte hain, aur performance gradually ke bajaye sharply girti hai. Isiliye indexes lean rakhne chahiye, isiliye unnecessary indexes actively harmful hain, aur isiliye "zyada RAM add karo" ek achanak slow MongoDB instance ka itni baar effective fix hota hai.',
    },
    codeExample: {
      code: `// The working set = the data and INDEXES your application
// actually touches regularly — not the total database size.

// MongoDB (WiredTiger) caches this in RAM. Reads served from
// cache take microseconds; reads that hit disk take
// milliseconds. That is a 100x difference, and it is the single
// biggest factor in MongoDB performance.

db.serverStatus().wiredTiger.cache;
//   "bytes currently in the cache"
//   "pages read into cache"          ← climbing = cache misses
//   "tracked dirty bytes in the cache"

// The rule: your working set should FIT IN RAM. A 500 GB
// database is fine if only the last 30 days (say 8 GB) plus
// indexes are queried.

// Symptoms of a working set that no longer fits: latency that
// degrades gradually rather than suddenly, high disk read IOPS,
// and a cache-miss rate that keeps rising.

// What to do:
//   • add RAM — the most direct fix
//   • SHRINK the working set:
//       drop unused indexes (they compete for the same cache)
//       use partial indexes so archived rows are not indexed
//       project fewer fields
//       archive or TTL old data out
//       move cold data to a separate collection or cluster
//   • shard, so each machine holds a smaller slice

// Note that indexes count. A collection with nine indexes may
// use more cache for indexes than for documents.`,
      output: `pages read into cache: 4,812,003 (rising)`,
    },
  },
  {
    question: 'What are capped collections?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A capped collection has a fixed maximum size and behaves as a circular buffer: once full, the oldest documents are automatically overwritten by new ones. It preserves insertion order and offers very high write throughput. Restrictions: documents cannot be deleted individually, and updates must not increase document size. It suits logs and recent-event buffers where old data is genuinely disposable. The oplog itself is a capped collection, which is why replication lag beyond its window is unrecoverable.',
      hinglish:
        'Ek capped collection ka ek fixed maximum size hota hai aur ye ek circular buffer ki tarah behave karta hai: full hone pe, sabse purane documents automatically naye se overwrite ho jaate hain. Ye insertion order preserve karta hai aur bahut high write throughput deta hai. Restrictions: documents individually delete nahi ho sakte, aur updates ko document size nahi badhana chahiye. Ye logs aur recent-event buffers ko suit karta hai jahan purana data genuinely disposable hai. Oplog khud ek capped collection hai, isiliye uske window se aage replication lag unrecoverable hai.',
    },
    codeExample: {
      code: `// A fixed-size collection that behaves like a ring buffer:
// once full, the OLDEST documents are overwritten automatically.
db.createCollection('logs', {
  capped: true,
  size: 100_000_000,     // bytes — required
  max: 50_000,           // optional cap on document COUNT
});

// In Mongoose:
new Schema({ msg: String }, { capped: { size: 100_000_000 } });

// Properties:
//   • guaranteed INSERTION ORDER, so find() with no sort is
//     already chronological and needs no index
//   • very fast inserts (space is pre-allocated)
//   • storage can never exceed the size you set
//   • supports TAILABLE CURSORS — a cursor that stays open and
//     yields new documents as they arrive:
db.logs.find({}, { tailable: true, awaitData: true });

// Restrictions:
//   • cannot DELETE individual documents
//   • an update must not make a document LARGER
//   • cannot be sharded
//   • no TTL index

// The oplog itself is a capped collection.

// In practice they are niche now: for logs and events, a normal
// collection with a TTL index is more flexible, and Change
// Streams replaced tailable cursors for real-time feeds. Use a
// capped collection when a hard storage ceiling is the actual
// requirement.`,
      output: `insert #50,001 → oldest document dropped`,
    },
  },
  {
    question: 'How do you back up and restore a MongoDB database?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`mongodump`/`mongorestore` produce a logical BSON backup — portable and selective, but slow for very large datasets. Filesystem snapshots are far faster for large deployments but require a consistent snapshot of the data volume. Atlas and enterprise setups offer continuous backup with point-in-time restore built on the oplog. Whichever you use, the essential discipline is testing the RESTORE regularly: an untested backup is an assumption, not a backup, and restore failures are typically discovered at the worst possible moment.',
      hinglish:
        '`mongodump`/`mongorestore` ek logical BSON backup produce karte hain — portable aur selective, par bahut bade datasets ke liye slow. Filesystem snapshots bade deployments ke liye bahut faster hain par data volume ka ek consistent snapshot chahte hain. Atlas aur enterprise setups oplog pe bana point-in-time restore ke saath continuous backup dete hain. Jo bhi use karo, essential discipline RESTORE ko regularly test karna hai: ek untested backup ek assumption hai, ek backup nahi, aur restore failures typically sabse bure possible moment pe discover hote hain.',
    },
    codeExample: {
      code: `# mongodump / mongorestore — logical backup (BSON export)
mongodump --uri="mongodb://localhost:27017" --db=learnverse --out=./backup
mongodump --uri="$URI" --db=app --collection=orders --gzip --archive=orders.gz

mongorestore --uri="$URI" --db=learnverse ./backup/learnverse
mongorestore --uri="$URI" --gzip --archive=orders.gz --drop
#   --drop replaces existing collections; without it, data merges

# Restore to a DIFFERENT name (safest way to test a restore):
mongorestore --nsFrom='app.*' --nsTo='app_restore.*' --archive=b.gz --gzip

# mongoexport / mongoimport — JSON or CSV, for moving data
# between systems. NOT a backup: it loses BSON types.
mongoexport --uri="$URI" -d app -c users --type=csv -f name,email -o u.csv

# Filesystem / volume snapshots — fast for large deployments,
# but must be consistent. On a replica set, snapshot a secondary
# or use fsyncLock.

# Atlas — continuous backups with point-in-time restore, which
# is what you want in production: recovery to any second within
# the retention window, not just to the last nightly dump.

# The rules that matter more than the tool:
#   1. automate it — a manual backup is not a backup
#   2. store it OFF the database host, encrypted
#   3. TEST the restore on a schedule. An untested backup is a
#      guess, and restores fail for boring reasons.
#   4. know your RPO (data you can lose) and RTO (time to recover)`,
      output: `done dumping learnverse.orders (142,308 documents)`,
    },
  },
  {
    question: 'What is the difference between MongoDB Atlas and self-hosted MongoDB?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'ATLAS is the managed cloud service: it handles provisioning, patching, backups, monitoring, replica-set configuration, and scaling, and adds features such as Atlas Search and Vector Search. SELF-HOSTED gives full control over configuration, version, and placement, and can be cheaper at large scale or where data residency demands it — but you own upgrades, backups, failover testing, and on-call. For most teams Atlas is the correct default, since database operations are genuinely specialised work.',
      hinglish:
        'ATLAS managed cloud service hai: ye provisioning, patching, backups, monitoring, replica-set configuration, aur scaling handle karta hai, aur Atlas Search aur Vector Search jaise features add karta hai. SELF-HOSTED configuration, version, aur placement pe full control deta hai, aur bade scale pe ya jahan data residency demand kare wahan sasta ho sakta hai — par upgrades, backups, failover testing, aur on-call tumhare hain. Zyadatar teams ke liye Atlas correct default hai, kyunki database operations genuinely specialised kaam hai.',
    },
    codeExample: {
      code: `// ATLAS — MongoDB's managed cloud service.
//   provisioning, patching, backups, monitoring, scaling,
//   replica sets and failover are handled for you
//   plus: point-in-time restore, Performance Advisor, Atlas
//   Search, Charts, Data API, serverless tiers
//   a free M0 tier for learning and small projects
const uri = 'mongodb+srv://user:pass@cluster0.abcd.mongodb.net/app';
// mongodb+srv resolves the whole replica set via DNS

// SELF-HOSTED — mongod on your own servers or containers.
//   you run: replica set config, upgrades, security hardening,
//   backups, monitoring, disk growth, failover testing
//   cheaper per GB at scale, and full control over
//   configuration and data residency

// Choosing:
//   small team, no dedicated DBA        → Atlas
//   need to ship this month             → Atlas
//   strict data-residency or air-gapped → self-host
//   very large and cost-sensitive, with
//   ops staff who already run databases → self-host
//   local development                   → Docker, always

// The honest calculation: Atlas is more expensive per GB and
// much cheaper than a person's time. A production replica set
// with tested backups, monitoring and a rehearsed failover is
// real, ongoing work.

// Either way: never expose 27017 publicly, always require auth,
// and use an IP allowlist or private networking.`,
      output: `mongodb+srv://cluster0 · 3 nodes · M10`,
    },
  },
  {
    question: 'How do you enforce schema validation in MongoDB?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Two layers. In the APPLICATION, Mongoose schemas define types, required fields, defaults, and custom validators — convenient, but they only apply to writes that go through Mongoose. In the DATABASE, MongoDB supports JSON Schema validation rules attached to a collection, which apply to EVERY writer including scripts, other services, and manual shell operations. Relying only on the application layer means the first admin script or second service silently introduces malformed documents.',
      hinglish:
        'Do layers. APPLICATION mein, Mongoose schemas types, required fields, defaults, aur custom validators define karte hain — convenient, par wo sirf un writes pe apply hote hain jo Mongoose se guzarte hain. DATABASE mein, MongoDB ek collection se attached JSON Schema validation rules support karta hai, jo HAR writer pe apply hote hain including scripts, doosri services, aur manual shell operations. Sirf application layer pe rely karna matlab pehla admin script ya doosri service silently malformed documents le aati hai.',
    },
    codeExample: {
      code: `// Two levels, and you generally want both.

// 1. APPLICATION level — Mongoose (or Zod before it):
const userSchema = new Schema({
  email: { type: String, required: true, match: /^\\S+@\\S+$/ },
  age:   { type: Number, min: 13, max: 120 },
  role:  { type: String, enum: ['user', 'admin'] },
});
// Fast, expressive, good error messages — but bypassed by any
// other client, by mongosh, and by User.collection.insertOne().

// 2. DATABASE level — a JSON Schema validator on the collection.
// This one cannot be bypassed:
db.createCollection('users', {
  validator: { $jsonSchema: {
    bsonType: 'object',
    required: ['email', 'createdAt'],
    properties: {
      email: { bsonType: 'string', pattern: '^\\\\S+@\\\\S+$' },
      age:   { bsonType: 'int', minimum: 13 },
      role:  { enum: ['user', 'admin'] },
    },
  }},
  validationLevel: 'strict',     // or 'moderate' — existing bad
                                 // docs are only checked on update
  validationAction: 'error',     // or 'warn' — logs, still writes
});

// Adding it to an existing collection:
db.runCommand({ collMod: 'users', validator: { … } });

// Rolling it out safely: start with validationAction 'warn',
// watch the logs, fix the offending documents, then switch to
// 'error'.

// Unique constraints are separate — they come from an index:
db.users.createIndex({ email: 1 }, { unique: true });`,
      output: `MongoServerError: Document failed validation`,
    },
  },
  {
    question: 'What is connection pooling in the MongoDB driver?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The driver maintains a POOL of reusable TCP connections rather than opening one per query, since handshake and authentication are expensive. `maxPoolSize` (default 100) caps concurrent operations per instance — set too low, requests queue and latency rises; set too high, you exhaust the server\'s connection limit. The practical rule is to create ONE client for the entire application lifetime and reuse it, rather than connecting per request, which is a very common and very costly mistake in serverless code.',
      hinglish:
        'Driver per query ek connection kholne ke bajaye reusable TCP connections ka ek POOL maintain karta hai, kyunki handshake aur authentication mehnge hain. `maxPoolSize` (default 100) per instance concurrent operations cap karta hai — bahut kam set karo to requests queue hoti hain aur latency badhti hai; bahut zyada set karo to tum server ki connection limit khatam kar dete ho. Practical rule ye hai ki poori application lifetime ke liye EK client banao aur reuse karo, per request connect karne ke bajaye, jo serverless code mein ek bahut common aur bahut mehngi mistake hai.',
    },
    codeExample: {
      code: `// The driver keeps a POOL of open TCP connections and reuses
// them. Opening a connection means a TCP handshake, TLS and
// authentication — far too expensive to do per query.
const client = new MongoClient(uri, {
  maxPoolSize: 100,          // default 100
  minPoolSize: 5,            // keep some warm
  maxIdleTimeMS: 60_000,     // close idle connections
  waitQueueTimeoutMS: 5_000, // fail fast if the pool is exhausted
});

// This is why you connect ONCE at startup and share the client:
await mongoose.connect(uri);      // ✓ at boot
// not inside a request handler — that creates a new pool per
// request and exhausts the server's connection limit.

// Sizing it:
//   • more connections is not faster — each one costs memory on
//     the server, and past a point you just add contention
//   • total across ALL app instances must stay under the
//     cluster limit (Atlas M10 allows 1,500)
//     10 instances × maxPoolSize 100 = 1,000 — plan for it
//   • the default 100 is usually generous; 10–20 per instance
//     is plenty for most workloads

// Symptoms of a pool that is too small: requests waiting, then
// MongoServerSelectionError on timeout. Watch:
client.on('connectionCheckOutFailed', …);

// In SERVERLESS, cache the client on globalThis across warm
// invocations, and keep maxPoolSize small (1–10) — every
// concurrent function instance has its own pool.`,
      output: `pool: 5 idle · 12 in use · 0 waiting`,
    },
  },
  {
    question: 'How do you handle concurrent updates safely in MongoDB?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Prefer ATOMIC operators over read-modify-write: `$inc` on a counter is safe under concurrency, while reading a value, adding one in JavaScript, and saving it loses updates when two requests interleave. For conditional updates, put the expected state in the FILTER — `findOneAndUpdate({ _id, version: 3 }, { $set: {...}, $inc: { version: 1 } })` — which is optimistic locking: if another writer got there first, nothing matches and you can retry. Reserve real transactions for changes spanning multiple documents.',
      hinglish:
        'Read-modify-write ke bajaye ATOMIC operators prefer karo: ek counter pe `$inc` concurrency mein safe hai, jabki ek value padhna, JavaScript mein ek jodna, aur save karna do requests interleave hone pe updates kho deta hai. Conditional updates ke liye, expected state FILTER mein daalo — `findOneAndUpdate({ _id, version: 3 }, { $set: {...}, $inc: { version: 1 } })` — jo optimistic locking hai: agar doosra writer pehle pahunch gaya, kuch match nahi hoga aur tum retry kar sakte ho. Real transactions ko multiple documents pe faile changes ke liye reserve rakho.',
    },
    codeExample: {
      code: `// The unsafe pattern — read, modify in Node, write back:
const p = await Product.findById(id);
p.stock = p.stock - 1;              // ✗ two requests both read 10
await p.save();                     //   both write 9. One sale lost.

// Fix 1 — ATOMIC OPERATORS. The server does the arithmetic, so
// there is no gap between read and write:
await Product.updateOne({ _id: id }, { $inc: { stock: -1 } });   // ✓

// Fix 2 — a GUARD in the filter, so the update only applies if
// the precondition still holds:
const r = await Product.updateOne(
  { _id: id, stock: { $gte: 1 } },
  { $inc: { stock: -1 } },
);
if (r.modifiedCount === 0) throw new Error('Out of stock');
// This is atomic: MongoDB matches and updates in one step, so
// stock can never go negative.

// Fix 3 — OPTIMISTIC LOCKING with a version field. Mongoose
// does this for arrays via __v; you can do it explicitly:
const r = await Doc.updateOne(
  { _id: id, version: currentVersion },
  { $set: { body }, $inc: { version: 1 } },
);
if (r.matchedCount === 0) throw new Error('Modified by someone else');
// Best when a human edits a form over minutes.

// Fix 4 — findOneAndUpdate when you need the result back:
await Job.findOneAndUpdate(
  { status: 'queued' },
  { $set: { status: 'running' } },
  { sort: { createdAt: 1 }, new: true },       // atomic claim
);

// Fix 5 — a transaction, when two documents must change together.`,
      output: `modifiedCount: 0 → Out of stock`,
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];

// Attach the step-by-step walkthroughs, which live in their own file so this
// one stays navigable. Keys are matched on the exact question text; anything
// left over is a typo we want to hear about rather than silently lose.
const unmatched = new Set(Object.keys(deepDives));
for (const q of generalInterviewQuestions) {
  const sections = deepDives[q.question];
  if (!sections) continue;
  q.deepDive = sections;
  unmatched.delete(q.question);
}
if (unmatched.size > 0) {
  console.warn(`[mongodb] ${unmatched.size} deep-dive key(s) match no question:`);
  for (const key of unmatched) console.warn(`  ${key}`);
}
