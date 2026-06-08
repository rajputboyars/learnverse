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
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
