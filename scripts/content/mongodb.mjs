// MongoDB curriculum — beginner -> intermediate -> advanced.
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
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
