/*
 * Step-by-step walkthroughs for the MongoDB interview questions.
 *
 * Same shape and intent as the other deep-dive files: the short `answer` is
 * what you say out loud, and this walks the mechanism one step at a time.
 *
 * Keyed by the EXACT question text in `generalInterviewQuestions`. Unmatched
 * keys are reported at import time (see the bottom of mongodb.mjs).
 *
 * Each value is an ordered list of sections:
 *   heading { en, hi }  the step's title
 *   body    { en, hi }  what happens at this step, and why
 *   diagram             optional ASCII sketch, rendered as-is in monospace
 *   code                optional snippet
 *
 * The thread through the file: in MongoDB you design the schema around the
 * QUERIES, not around normal forms. Almost every modelling question is
 * really asking what you read together and how often it changes.
 */

export const deepDives = {
  /* ─── Documents, drivers and Mongoose ─────────────────────── */

  'What is the maximum size of a MongoDB document and why does it matter?': [
    {
      heading: { en: '16 megabytes, per document', hi: 'Har document 16 megabyte tak' },
      body: {
        en: 'The BSON limit is 16MB and it is not configurable. It exists to stop a single document consuming excessive memory and bandwidth, since MongoDB reads and writes a whole document at a time.',
        hi: 'BSON ki seema 16MB hai aur usse badla nahi ja sakta. Ye isliye hai ki ek document zyada memory aur bandwidth na khaa jaaye, kyunki MongoDB ek baar mein poora document padhta aur likhta hai.',
      },
    },
    {
      heading: { en: 'The real limit is much lower than 16MB', hi: 'Asli seema 16MB se bahut kam hai' },
      body: {
        en: 'This is the part that matters. Long before the hard limit, a growing document hurts: every read transfers the whole thing, every update rewrites it, and it evicts more useful data from the cache. A document in the hundreds of kilobytes is already a design problem.',
        hi: 'Yahi hissa maayne rakhta hai. Sakht seema se bahut pehle hi badhta hua document nuksaan karta hai: har read poora transfer karta hai, har update usse dobara likhta hai, aur wo cache se zyada kaam ka data hata deta hai. Kuch sau kilobyte ka document pehle hi design ki problem hai.',
      },
    },
    {
      heading: { en: 'Which is why unbounded arrays are the danger', hi: 'Isiliye bina seema wale arrays khatra hain' },
      body: {
        en: 'The limit is almost always hit by an array that grows forever — comments on a post, events on a user, readings from a sensor. It works for months and then a popular document fails to update, in production, with no warning.',
        hi: 'Seema lagbhag hamesha kisi aise array se paar hoti hai jo hamesha badhta hai — post ke comments, user ke events, sensor ki readings. Ye mahinon chalta hai aur phir koi popular document production mein update hona band kar deta hai, bina kisi chetavni ke.',
      },
      code: `{ _id: 1, title: 'Post', comments: [ …, …, … ] }
// fine at 50 comments, a problem at 5,000, fatal at 200,000`,
    },
    {
      heading: { en: 'Fix one: reference instead of embedding', hi: 'Ilaaj ek: embed nahi, reference karo' },
      body: {
        en: 'Move the growing side into its own collection with a reference back. The parent stays small and the children are paginated with a query, which is what you wanted anyway once there are thousands of them.',
        hi: 'Badhne wale hisse ko apne collection mein le jao aur wapas ek reference rakho. Parent chhota rehta hai aur children query se paginate hote hain, aur hazaaron hone pe tumhe wahi chahiye tha.',
      },
      code: `// comments collection
{ _id, postId, body, createdAt }
db.comments.find({ postId }).sort({ createdAt: -1 }).limit(20);`,
    },
    {
      heading: { en: 'Fix two: the bucket pattern', hi: 'Ilaaj do: bucket pattern' },
      body: {
        en: 'For time-series or append-only data, group many entries into one document with a cap — a hundred readings per bucket, or one bucket per hour. You get far fewer documents than one-per-event and no unbounded growth.',
        hi: 'Time-series ya sirf-jodne wale data ke liye kai entries ko ek document mein seema ke saath group karo — har bucket mein sau readings, ya har ghante ka ek bucket. Har event ka alag document banane se kahin kam documents milte hain aur bina seema ka badhna bhi nahi hota.',
      },
    },
    {
      heading: { en: 'Fix three: GridFS, for genuinely large binaries', hi: 'Ilaaj teen: sach mein bade binaries ke liye GridFS' },
      body: {
        en: 'GridFS splits a file into chunks across two collections so it can exceed 16MB. It is the right answer for a file you must keep in Mongo — but object storage such as S3 is usually the better answer, with only the key in the database.',
        hi: 'GridFS file ko do collections mein chunks mein baant deta hai taaki wo 16MB paar kar sake. Jo file Mongo mein hi rakhni ho uske liye ye sahi jawab hai — par aam taur pe S3 jaisa object storage behtar hai, aur database mein sirf key.',
      },
    },
    {
      heading: { en: 'The design rule to state', hi: 'Batane laayak design rule' },
      body: {
        en: '"Embed when the array is bounded and read with its parent. Reference when it grows without limit. The 16MB figure is the hard ceiling, but I design so a document never approaches it — an unbounded array is the real bug."',
        hi: '"Jab array seemit ho aur parent ke saath padha jaaye tab embed karo. Bina seema badhe toh reference. 16MB sakht chhat hai, par main aisa design karta hoon ki document uske paas bhi na pahunche — asli bug bina seema wala array hai."',
      },
    },
  ],

  'What does ACID mean and how does MongoDB handle transactions?': [
    {
      heading: { en: 'The four guarantees', hi: 'Chaar guarantees' },
      body: {
        en: 'Atomicity — all of it happens or none of it. Consistency — the data satisfies its rules before and after. Isolation — concurrent operations do not see each other half-done. Durability — once committed, it survives a crash.',
        hi: 'Atomicity — ya sab hoga ya kuch nahi. Consistency — data apne niyam pehle aur baad dono mein poore kare. Isolation — saath chalte operations ek doosre ko aadha-adhoora na dekhein. Durability — commit ho gaya toh crash ke baad bhi bacha rahega.',
      },
    },
    {
      heading: { en: 'A single document has always been atomic', hi: 'Ek document hamesha atomic raha hai' },
      body: {
        en: 'This is the point people miss. Any update to one document — however many fields and nested arrays it touches — is atomic. MongoDB was never non-ACID; the guarantee was just scoped to a document.',
        hi: 'Yahi baat log chook jaate hain. Ek document ka koi bhi update — chahe wo kitne bhi fields aur nested arrays chhue — atomic hai. MongoDB kabhi non-ACID tha hi nahi; guarantee bas ek document tak seemit thi.',
      },
      code: `db.accounts.updateOne(
  { _id: 1 },
  { $inc: { balance: -100 }, $push: { history: { … } } }
);      // ✓ atomic — both or neither`,
    },
    {
      heading: { en: 'Multi-document transactions since 4.0 and 4.2', hi: '4.0 aur 4.2 se multi-document transactions' },
      body: {
        en: 'Replica sets got them in 4.0 and sharded clusters in 4.2. They give full ACID across documents, collections and databases, with the same semantics you would expect from a relational database.',
        hi: 'Replica sets ko 4.0 mein aur sharded clusters ko 4.2 mein mile. Ye documents, collections aur databases ke paar poori ACID dete hain, wahi semantics ke saath jinki relational database se ummeed hoti hai.',
      },
      code: `const session = client.startSession();
await session.withTransaction(async () => {
  await accounts.updateOne({ _id: a }, { $inc: { bal: -100 } }, { session });
  await accounts.updateOne({ _id: b }, { $inc: { bal:  100 } }, { session });
});`,
    },
    {
      heading: { en: 'They require a replica set', hi: 'Inke liye replica set chahiye' },
      body: {
        en: 'A standalone mongod cannot run a transaction, because the mechanism is built on the oplog. This catches people locally — the code works on Atlas and fails on a plain local install until it is started as a single-node replica set.',
        hi: 'Akela mongod transaction nahi chala sakta, kyunki ye machinery oplog pe bani hai. Local pe log isme phasate hain — code Atlas pe chalta hai aur saade local install pe fail hota hai jab tak usse single-node replica set ki tarah shuru na karo.',
      },
    },
    {
      heading: { en: 'They cost more than you think', hi: 'Ye soch se zyada mehnge hain' },
      body: {
        en: 'A transaction holds locks and accumulates its changes in memory, and the default limit is 60 seconds. Under contention, writes conflict and one side gets a TransientTransactionError and must be retried — which the driver helper does for you.',
        hi: 'Transaction locks pakadta hai aur apne badlaav memory mein jama karta hai, aur default seema 60 second hai. Takraav mein writes bhidte hain aur ek taraf ko TransientTransactionError milta hai aur dobara koshish karni padti hai — jo driver ka helper tumhare liye karta hai.',
      },
    },
    {
      heading: { en: 'The best transaction is the one you avoid', hi: 'Sabse achha transaction wo hai jo tum karo hi na' },
      body: {
        en: 'Say this — it is the design answer rather than the API answer. If the data that changes together lives in one document, single-document atomicity covers it for free. Needing transactions everywhere usually means the schema was modelled relationally.',
        hi: 'Ye kaho — ye API ka nahi, design ka jawab hai. Jo data saath badalta hai wo ek document mein ho toh single-document atomicity usse muft mein cover kar leti hai. Har jagah transactions ki zaroorat matlab schema relational tareeke se banaya gaya hai.',
      },
    },
    {
      heading: { en: 'And durability depends on the write concern', hi: 'Aur durability write concern pe nirbhar hai' },
      body: {
        en: 'The D in ACID is a setting, not a constant. w:1 acknowledges from the primary alone, so an unreplicated write can be lost in a failover. w:majority is what actually gives you durability, and it is the default in modern drivers.',
        hi: 'ACID ka D ek setting hai, sthir cheez nahi. w:1 sirf primary se acknowledge leta hai, toh bina replicate hua write failover mein kho sakta hai. Asli durability w:majority deta hai, aur modern drivers mein wahi default hai.',
      },
    },
  ],

  'How do you connect MongoDB with Node.js?': [
    {
      heading: { en: 'Driver or Mongoose, connected once', hi: 'Driver ya Mongoose, ek baar juda hua' },
      body: {
        en: 'Both take a connection string and both maintain a pool internally. The important part is that you connect ONCE at startup and reuse the connection for the life of the process.',
        hi: 'Dono ek connection string lete hain aur dono andar pool rakhte hain. Zaroori baat ye hai ki tum shuruaat mein EK BAAR judo aur us connection ko process ke poore jeevan tak use karo.',
      },
      code: `const client = new MongoClient(env.MONGODB_URI);
await client.connect();
export const db = client.db();

// or
await mongoose.connect(env.MONGODB_URI);`,
    },
    {
      heading: { en: 'Never connect per request', hi: 'Har request pe mat judo' },
      body: {
        en: 'The single most common mistake. Each connect opens a new pool and a new set of TCP and TLS handshakes, and nothing closes them — so the app exhausts the server\'s connection limit within minutes under load.',
        hi: 'Sabse aam galti yahi hai. Har connect naya pool aur naye TCP aur TLS handshakes kholta hai, aur unhe koi band nahi karta — toh load mein app minton mein server ki connection seema khatam kar deta hai.',
      },
      code: `app.get('/users', async (req, res) => {
  const client = await MongoClient.connect(uri);   // ✗ never
});`,
    },
    {
      heading: { en: 'The driver already pools for you', hi: 'Driver pehle se pool rakhta hai' },
      body: {
        en: 'One MongoClient maintains a pool of sockets, defaulting to 100, and multiplexes concurrent operations across it. You do not need to manage connections at all — you need exactly one client, shared.',
        hi: 'Ek MongoClient sockets ka pool rakhta hai, default 100, aur saath chalte operations usme baant deta hai. Tumhe connections sambhalne ki zaroorat hi nahi — tumhe theek ek client chahiye, saanjha.',
      },
      code: `new MongoClient(uri, { maxPoolSize: 20, minPoolSize: 5 });`,
    },
    {
      heading: { en: 'Await the connection before listening', hi: 'Sunne se pehle connection ka intezaar karo' },
      body: {
        en: 'Otherwise the server starts accepting requests before the database is reachable, and the first few fail with a confusing buffering timeout. Connect, then listen — and fail fast at boot if the database is unreachable.',
        hi: 'Warna server database tak pahunchne se pehle hi requests lena shuru kar deta hai, aur pehli kuch uljhane wale buffering timeout se fail hoti hain. Judo, phir suno — aur database na mile toh boot pe hi fail ho jao.',
      },
      code: `await client.connect();
app.listen(port);      // ✓ order matters`,
    },
    {
      heading: { en: 'Handle the lifecycle', hi: 'Lifecycle sambhaalo' },
      body: {
        en: 'Listen for connection errors so a lost database is logged rather than silent, and close the client on SIGTERM so in-flight operations finish and the server sees a clean disconnect.',
        hi: 'Connection ke errors suno taaki database ka jaana chup-chaap na ho balki log ho, aur SIGTERM pe client band karo taaki chal rahe operations poore hon aur server ko saaf disconnect dikhe.',
      },
      code: `mongoose.connection.on('error', (e) => logger.error(e));
process.on('SIGTERM', () => client.close());`,
    },
    {
      heading: { en: 'And keep the URI in configuration', hi: 'Aur URI configuration mein rakho' },
      body: {
        en: 'It contains credentials, so it belongs in an environment variable validated at startup — never hardcoded and never committed. Include the database name and the replica set options in the string rather than as separate settings.',
        hi: 'Usme credentials hote hain, toh wo environment variable mein hona chahiye jo shuruaat mein validate ho — kabhi hardcode nahi aur kabhi commit nahi. Database ka naam aur replica set ke options alag settings ki jagah usi string mein rakho.',
      },
    },
  ],

  'What is Mongoose?': [
    {
      heading: { en: 'An ODM on top of the MongoDB driver', hi: 'MongoDB driver ke upar ek ODM' },
      body: {
        en: 'An Object Document Mapper. Mongoose adds schemas, validation, type casting, middleware and population to the driver. MongoDB itself is schemaless — Mongoose is where the schema lives, in your application.',
        hi: 'Object Document Mapper. Mongoose driver pe schemas, validation, type casting, middleware aur population jodta hai. MongoDB khud schemaless hai — schema Mongoose mein rehta hai, tumhare application mein.',
      },
      code: `const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, min: 13 },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);`,
    },
    {
      heading: { en: 'What it actually gives you', hi: 'Ye asal mein kya deta hai' },
      body: {
        en: 'Structure enforced at the application layer, validation before a write, automatic casting of a string id to an ObjectId, hooks that run before and after operations, virtuals, and populate for joining referenced documents.',
        hi: 'Application layer pe lagoo dhaancha, write se pehle validation, string id ko ObjectId mein apne aap badalna, operations ke pehle aur baad chalne wale hooks, virtuals, aur jude hue documents ko laane ke liye populate.',
      },
    },
    {
      heading: { en: 'The schema is not enforced by the database', hi: 'Schema database lagoo nahi karta' },
      body: {
        en: 'An important caveat. Mongoose validates in Node, so anything writing directly to the collection — the shell, another service, a migration script — can insert whatever it likes. For a database-level guarantee you need JSON Schema validation on the collection.',
        hi: 'Ek zaroori chetavni. Mongoose Node mein validate karta hai, toh jo bhi seedha collection mein likhe — shell, koi doosri service, koi migration script — wo kuch bhi daal sakta hai. Database star ki guarantee ke liye collection pe JSON Schema validation chahiye.',
      },
    },
    {
      heading: { en: 'It has a real cost', hi: 'Iski asli keemat hai' },
      body: {
        en: 'Every result is hydrated into a full Mongoose document with getters, setters and change tracking, which is measurably slower and heavier than a plain object. On a read-only query, lean skips all of that.',
        hi: 'Har nateeja ek poore Mongoose document mein badal diya jaata hai, getters, setters aur change tracking ke saath, jo saade object se naapne laayak dheema aur bhaari hai. Sirf-padhne wali query mein lean ye sab chhod deta hai.',
      },
      code: `await User.find();               // full documents
await User.find().lean();         // ✓ plain objects, much faster`,
    },
    {
      heading: { en: 'When to use it and when not to', hi: 'Isse kab use karein aur kab nahi' },
      body: {
        en: 'Use it when you want structure and validation in one place and the productivity of hooks and populate. Skip it for a data pipeline, an analytics job or anything performance-critical, where the raw driver is simpler and faster.',
        hi: 'Isse tab lo jab dhaancha aur validation ek jagah chahiye aur hooks aur populate ki suvidha. Data pipeline, analytics job ya performance wale kaam mein chhod do, jahan kachcha driver simple aur tez hai.',
      },
    },
    {
      heading: { en: 'And the alternatives', hi: 'Aur vikalp' },
      body: {
        en: 'Prisma for a typed schema-first workflow with generated types. Typegoose for TypeScript classes on top of Mongoose. Or the driver plus Zod, which gives you validation and inferred types without the document hydration cost.',
        hi: 'Typed schema-first kaam aur generated types ke liye Prisma. Mongoose ke upar TypeScript classes ke liye Typegoose. Ya driver aur Zod, jo bina document hydration ki keemat ke validation aur nikaale hue types dete hain.',
      },
    },
  ],

  'What is the difference between the MongoDB Driver and Mongoose?': [
    {
      heading: { en: 'One is the client, the other is a layer on it', hi: 'Ek client hai, doosra uske upar ki layer' },
      body: {
        en: 'The driver is the official client: it speaks the wire protocol, manages the connection pool and exposes the database commands. Mongoose is an ODM built on the driver that adds schemas, validation and middleware.',
        hi: 'Driver official client hai: wo wire protocol bolta hai, connection pool sambhaalta hai aur database ke commands deta hai. Mongoose driver pe bana ek ODM hai jo schemas, validation aur middleware jodta hai.',
      },
      diagram: `your code
   │
Mongoose         schemas, validation, hooks, populate, casting
   │
MongoDB driver   connection pool, wire protocol, commands
   │
mongod`,
    },
    {
      heading: { en: 'The driver is schemaless and thin', hi: 'Driver schemaless aur patla hai' },
      body: {
        en: 'It returns plain JavaScript objects and does nothing you did not ask for. That makes it fast and predictable, and it means every rule about your data has to live somewhere else in your code.',
        hi: 'Wo saade JavaScript objects deta hai aur wahi karta hai jo tum kaho. Isse wo tez aur andaaze laayak banta hai, aur iska matlab hai ki tumhare data ka har niyam code mein kahin aur rehna chahiye.',
      },
      code: `await db.collection('users').insertOne({ nmae: 'Asha' });
// ✓ inserted — the typo is now permanent data`,
    },
    {
      heading: { en: 'Mongoose adds structure and safety', hi: 'Mongoose dhaancha aur suraksha jodta hai' },
      body: {
        en: 'The same insert with a schema fails validation. You also get automatic casting of a string to an ObjectId or a Date, defaults, required fields, and hooks for cross-cutting behaviour such as hashing a password before save.',
        hi: 'Schema ke saath wahi insert validation mein fail ho jaata hai. Saath mein string ko ObjectId ya Date mein apne aap badalna, defaults, zaroori fields, aur save se pehle password hash karne jaise saanjhe kaam ke liye hooks milte hain.',
      },
      code: `userSchema.pre('save', async function () {
  if (this.isModified('password')) this.password = await hash(this.password);
});`,
    },
    {
      heading: { en: 'The performance difference is real', hi: 'Performance ka farq asli hai' },
      body: {
        en: 'Mongoose hydrates every result into a document with change tracking, which costs both CPU and memory. On a large read the driver, or Mongoose with lean, is significantly faster. This is the trade-off to name.',
        hi: 'Mongoose har nateeje ko change tracking wale document mein badal deta hai, jisme CPU aur memory dono lagti hai. Bade read mein driver, ya lean wala Mongoose, kaafi tez hai. Yahi sauda batana chahiye.',
      },
    },
    {
      heading: { en: 'The driver exposes everything; Mongoose sometimes lags', hi: 'Driver sab deta hai; Mongoose kabhi peeche rehta hai' },
      body: {
        en: 'A new aggregation stage or server feature is available in the driver immediately and may need a Mongoose release to be supported cleanly. You can always drop to the underlying collection when that happens.',
        hi: 'Koi naya aggregation stage ya server feature driver mein turant milta hai aur Mongoose mein theek se aane ke liye ek release lag sakta hai. Aisa ho toh tum hamesha andar wale collection pe utar sakte ho.',
      },
      code: `await User.collection.aggregate(pipeline).toArray();   // raw driver`,
    },
    {
      heading: { en: 'How to choose', hi: 'Kaise chunein' },
      body: {
        en: '"Mongoose for an application where I want one place that defines the shape and the rules, and where hooks and populate save real work. The driver for a script, a pipeline or a hot path, where I want plain objects and no hidden behaviour."',
        hi: '"Aise application ke liye Mongoose jahan main ek jagah shakl aur niyam batana chahoon, aur jahan hooks aur populate asli kaam bachate hon. Script, pipeline ya hot path ke liye driver, jahan saade objects chahiye aur koi chhupa behaviour nahi."',
      },
    },
  ],

  'What are schemas in Mongoose?': [
    {
      heading: { en: 'A declaration of shape and rules', hi: 'Shakl aur niyamon ka ek elaan' },
      body: {
        en: 'A schema defines the fields, their types, whether they are required, their defaults and their validation. It is the blueprint a model is built from, and it lives entirely in your application.',
        hi: 'Schema fields, unke types, zaroori hain ya nahi, unke defaults aur validation batata hai. Ye wo naksha hai jisse model banta hai, aur ye poori tarah tumhare application mein rehta hai.',
      },
      code: `const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  age: { type: Number, min: 13, max: 120 },
}, { timestamps: true });`,
    },
    {
      heading: { en: 'It does type casting as well as validation', hi: 'Ye validation ke saath type casting bhi karta hai' },
      body: {
        en: 'A field typed Number receives the string "30" from a form and stores 30. A string id becomes an ObjectId. That casting is quietly one of the most useful things Mongoose does, and it is why a query with a string id just works.',
        hi: 'Number type wale field ko form se "30" milti hai aur wo 30 store karta hai. String id ObjectId ban jaati hai. Ye casting chup-chaap Mongoose ki sabse kaam ki cheezon mein se ek hai, aur isiliye string id wali query bina kuch kiye chal jaati hai.',
      },
    },
    {
      heading: { en: 'unique is an index, not a validator', hi: 'unique ek index hai, validator nahi' },
      body: {
        en: 'The detail that catches everyone. It tells Mongoose to build a unique index; the enforcement happens in the database. So a duplicate produces a MongoServerError with code 11000 rather than a Mongoose validation error, and it needs different handling.',
        hi: 'Ye detail sabko pakadti hai. Ye Mongoose se unique index banwaata hai; lagoo database karta hai. Toh duplicate pe Mongoose ka validation error nahi, code 11000 wala MongoServerError aata hai, aur usse alag tarah sambhalna padta hai.',
      },
      code: `if (err.code === 11000) return res.status(409).json({ error: 'Email taken' });`,
    },
    {
      heading: { en: 'Custom and async validators', hi: 'Custom aur async validators' },
      body: {
        en: 'A validate function runs on save and can be asynchronous, which is how a uniqueness check against another collection is done. Note that it does not run on an update by default — that is the next section.',
        hi: 'validate function save pe chalta hai aur async ho sakta hai, aur kisi doosre collection ke against uniqueness aise hi jaanchi jaati hai. Dhyaan do ye default se update pe nahi chalta — agla hissa wahi hai.',
      },
      code: `email: {
  type: String,
  validate: { validator: (v) => /.+@.+/.test(v), message: 'Invalid email' },
}`,
    },
    {
      heading: { en: 'Validators do not run on update by default', hi: 'Validators default se update pe nahi chalte' },
      body: {
        en: 'This surprises people and silently lets bad data in. findOneAndUpdate and updateOne skip validation unless you pass runValidators — and even then, a validator that reads this cannot, because there is no document.',
        hi: 'Ye logon ko chaunkata hai aur chup-chaap kharaab data andar aane deta hai. findOneAndUpdate aur updateOne validation chhod dete hain jab tak runValidators na do — aur tab bhi, this padhne wala validator kaam nahi karta, kyunki koi document hai hi nahi.',
      },
      code: `await User.findByIdAndUpdate(id, data, { runValidators: true, new: true });`,
    },
    {
      heading: { en: 'Schemas carry more than fields', hi: 'Schemas fields se zyada rakhte hain' },
      body: {
        en: 'Indexes, virtuals, instance and static methods, hooks and options such as timestamps and strict all live on the schema. Defining an index there keeps it beside the field it applies to, which is how it stays in sync.',
        hi: 'Indexes, virtuals, instance aur static methods, hooks aur timestamps aur strict jaise options — sab schema pe rehte hain. Index wahin define karo toh wo us field ke saath rehta hai jispe lagta hai, aur isi se dono milte rehte hain.',
      },
      code: `userSchema.index({ email: 1 }, { unique: true });
userSchema.methods.fullName = function () { … };
userSchema.statics.findByEmail = function (e) { … };`,
    },
  ],

  'What are models in Mongoose?': [
    {
      heading: { en: 'A model is a compiled schema bound to a collection', hi: 'Model ek compiled schema hai jo collection se bandha hai' },
      body: {
        en: 'The schema is a blueprint; the model is the constructor you actually use. mongoose.model compiles the two together and gives you the query interface and the document class.',
        hi: 'Schema naksha hai; model wo constructor hai jise tum asal mein use karte ho. mongoose.model dono ko jod kar compile karta hai aur tumhe query interface aur document class deta hai.',
      },
      code: `const User = mongoose.model('User', userSchema);

await User.find({ role: 'admin' });      // static — a query
const u = new User({ name: 'Asha' });     // instance — a document
await u.save();`,
    },
    {
      heading: { en: 'The collection name is pluralised and lowercased', hi: 'Collection ka naam bahuvachan aur chhote akshar mein hota hai' },
      body: {
        en: 'A model named "User" maps to a collection called users, and "Person" to people. That inference surprises people who expected the exact name. Pass an explicit third argument when it matters.',
        hi: 'Model "User" ka naam users collection se judta hai, aur "Person" ka people se. Ye andaaza un logon ko chaunkata hai jo theek wahi naam maan rahe the. Zaroori ho toh teesra argument saaf de do.',
      },
      code: `mongoose.model('User', schema, 'app_users');   // ✓ explicit collection`,
    },
    {
      heading: { en: 'Statics versus methods', hi: 'Statics vs methods' },
      body: {
        en: 'A static is on the model and operates on the collection — a named query. A method is on a document instance and operates on that one record. Getting the two the right way round is a common small mistake.',
        hi: 'Static model pe hota hai aur collection pe chalta hai — ek naam wali query. Method document instance pe hota hai aur usi ek record pe chalta hai. Dono ko sahi jagah rakhna ek aam chhoti galti hai.',
      },
      code: `userSchema.statics.findActive = function () { return this.find({ active: true }); };
userSchema.methods.deactivate = function () { this.active = false; return this.save(); };`,
    },
    {
      heading: { en: 'Compiling the same model twice throws', hi: 'Ek hi model do baar compile karna error deta hai' },
      body: {
        en: 'OverwriteModelError. In development with hot reload, or in a serverless function that re-imports the module, the model is compiled again on the same connection. Guard by reusing the existing one.',
        hi: 'OverwriteModelError. Hot reload wale development mein, ya module dobara import karne wale serverless function mein, wahi model usi connection pe dobara compile ho jaata hai. Maujooda ko dobara use karke bacho.',
      },
      code: `export const User = mongoose.models.User || mongoose.model('User', schema);`,
    },
    {
      heading: { en: 'save runs the full document path', hi: 'save poora document raasta chalata hai' },
      body: {
        en: 'save triggers validation, pre and post hooks and change tracking, so it only writes the fields that actually changed. An update query bypasses all of that, which is faster and also why a hook you expected did not run.',
        hi: 'save validation, pre aur post hooks aur change tracking chalata hai, toh wo sirf wahi fields likhta hai jo sach mein badle. Update query ye sab chhod deti hai, jo tez hai aur isiliye wo hook nahi chala jiski tum ummeed kar rahe the.',
      },
      code: `doc.name = 'x'; await doc.save();      // ✓ hooks and validation
await User.updateOne({ _id }, { name: 'x' });   // ✗ skips both`,
    },
    {
      heading: { en: 'Define each model once, in its own module', hi: 'Har model ek baar, apne module mein' },
      body: {
        en: 'Models are global to the connection, so defining one inside a function or a request handler re-registers it. One file per model, imported everywhere, is the pattern that avoids every version of this problem.',
        hi: 'Models connection ke liye global hote hain, toh kisi function ya request handler ke andar define karna usse dobara register kar deta hai. Har model ki ek file, har jagah import — yahi pattern is problem ke har roop se bacha leta hai.',
      },
    },
  ],

  /* ─── Indexes, queries and the aggregation pipeline ───────── */

  'What are indexes in MongoDB?': [
    {
      heading: { en: 'A sorted structure that avoids scanning', hi: 'Ek kramwar dhaancha jo scan se bachaata hai' },
      body: {
        en: 'Without an index MongoDB reads every document in the collection to answer a query — a collection scan. An index is a B-tree of the indexed values pointing at documents, so a lookup is a tree descent instead.',
        hi: 'Index ke bina MongoDB query ka jawab dene ke liye collection ka har document padhta hai — ek collection scan. Index un values ka B-tree hai jo documents pe ishara karta hai, toh lookup ke liye bas tree mein neeche utarna padta hai.',
      },
      code: `db.users.createIndex({ email: 1 });      // 1 ascending, -1 descending`,
    },
    {
      heading: { en: 'The default index and what it covers', hi: 'Default index aur wo kya cover karta hai' },
      body: {
        en: 'Every collection has a unique index on _id, created automatically and impossible to drop. Everything else you create yourself, based on the queries you actually run.',
        hi: 'Har collection pe _id ka unique index hota hai, jo apne aap banta hai aur hataya nahi ja sakta. Baaki sab tum khud banate ho, un queries ke aadhaar pe jo tum sach mein chalate ho.',
      },
    },
    {
      heading: { en: 'They speed up reads and slow down writes', hi: 'Ye reads tez aur writes dheeme karte hain' },
      body: {
        en: 'The trade-off that decides how many you should have. Every insert, update and delete must maintain every index on the collection, and each index consumes RAM and disk. Ten indexes on a write-heavy collection is a real cost.',
        hi: 'Yahi sauda tay karta hai kitne index hone chahiye. Har insert, update aur delete ko collection ke har index ko sambhalna padta hai, aur har index RAM aur disk khata hai. Zyada write wale collection pe das index asli keemat hain.',
      },
    },
    {
      heading: { en: 'Indexes also serve sorts', hi: 'Indexes sorts bhi sambhaalte hain' },
      body: {
        en: 'Often forgotten. An in-memory sort of more than 32MB fails outright, so a sort on an unindexed field can break a query entirely rather than just slow it down. An index in the right order removes the sort stage.',
        hi: 'Ye aksar bhool jaate hain. 32MB se bade in-memory sort seedha fail ho jaate hain, toh bina index wale field pe sort query ko dheema nahi, poori tarah tod sakta hai. Sahi kram ka index sort stage hi hata deta hai.',
      },
      code: `db.posts.find({ authorId }).sort({ createdAt: -1 });
db.posts.createIndex({ authorId: 1, createdAt: -1 });      // ✓ no sort stage`,
    },
    {
      heading: { en: 'A covered query never touches a document', hi: 'Covered query document ko chhoti hi nahi' },
      body: {
        en: 'If every field the query needs — filter, sort and projection — is in the index, MongoDB answers from the index alone. That is the fastest possible query, and explain shows it as totalDocsExamined of zero.',
        hi: 'Agar query ki har zaroorat — filter, sort aur projection — index mein hai, toh MongoDB sirf index se jawab de deta hai. Ye sabse tez mumkin query hai, aur explain usse totalDocsExamined zero dikhata hai.',
      },
    },
    {
      heading: { en: 'Verify with explain, not by assumption', hi: 'Andaaze se nahi, explain se jaancho' },
      body: {
        en: 'explain tells you which index was chosen, how many documents were examined, and whether a sort or a collection scan happened. A ratio of documents examined to documents returned near one is the goal.',
        hi: 'explain bataata hai kaunsa index chuna gaya, kitne documents dekhe gaye, aur koi sort ya collection scan hua ya nahi. Dekhe gaye documents aur diye gaye documents ka anupaat ek ke paas hona hi lakshya hai.',
      },
      code: `db.users.find({ email }).explain('executionStats');
// look for: stage IXSCAN not COLLSCAN, totalDocsExamined ≈ nReturned`,
    },
    {
      heading: { en: 'And build them in the background in production', hi: 'Aur production mein background mein banao' },
      body: {
        en: 'Since 4.2 index builds no longer block all writes, but on a large collection a build is still expensive. Create indexes during a deploy or a maintenance window rather than discovering the need under load.',
        hi: '4.2 se index build saare writes nahi rokta, par bade collection pe build ab bhi mehnga hai. Indexes deploy ya maintenance ke waqt banao, load mein zaroorat pata chalne ki jagah.',
      },
    },
  ],

  'What is aggregation in MongoDB?': [
    {
      heading: { en: 'Multi-stage data processing in the database', hi: 'Database ke andar kai charanon wali data processing' },
      body: {
        en: 'Aggregation runs documents through a pipeline of stages, each transforming the stream and passing it on. It is how you group, join, reshape and compute — everything find cannot do.',
        hi: 'Aggregation documents ko stages ki pipeline se guzaarta hai, har stage dhaara ko badal kar aage bhejti hai. Group karna, jodna, shakl badalna aur ginna — jo find nahi kar sakta, wo sab isse hota hai.',
      },
      code: `db.orders.aggregate([
  { $match: { status: 'paid' } },
  { $group: { _id: '$customerId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 },
]);`,
    },
    {
      heading: { en: 'Why not do it in Node', hi: 'Node mein kyun na karein' },
      body: {
        en: 'Because you would have to fetch every matching document over the network first. Aggregating in the database moves the computation to the data, uses indexes, and returns only the result — usually orders of magnitude less data.',
        hi: 'Kyunki pehle har matching document network se laana padega. Database mein aggregate karna computation ko data ke paas le jaata hai, indexes use karta hai, aur sirf nateeja deta hai — aam taur pe kai guna kam data.',
      },
    },
    {
      heading: { en: 'Order of stages is a performance decision', hi: 'Stages ka kram performance ka faisla hai' },
      body: {
        en: 'This is the most valuable thing to say. $match and $limit first, so every later stage handles fewer documents — and a $match at the very start can use an index, which it cannot once the shape has changed.',
        hi: 'Kehne laayak sabse keemti baat yahi hai. $match aur $limit pehle, taaki baad ka har stage kam documents sambhaale. Aur bilkul shuru ka $match index use kar sakta hai, jo shakl badalne ke baad nahi kar sakta.',
      },
      code: `[{ $group: … }, { $match: … }]      // ✗ groups everything first
[{ $match: … }, { $group: … }]       // ✓ filters first, uses the index`,
    },
    {
      heading: { en: 'The memory limit per stage', hi: 'Har stage ki memory seema' },
      body: {
        en: 'A blocking stage such as $group or $sort is capped at 100MB. Beyond that the pipeline fails unless allowDiskUse is set, which spills to disk and is much slower. Hitting it usually means a $match is missing earlier.',
        hi: '$group ya $sort jaisa rokne wala stage 100MB tak seemit hai. Usse aage pipeline fail ho jaati hai jab tak allowDiskUse na do, jo disk pe girta hai aur kaafi dheema hai. Ye seema aana aam taur pe matlab pehle koi $match chhoot gaya.',
      },
    },
    {
      heading: { en: 'Aggregation replaced map-reduce', hi: 'Aggregation ne map-reduce ki jagah li' },
      body: {
        en: 'Worth mentioning. Map-reduce is deprecated: it runs JavaScript on the server, is far slower and cannot use indexes the same way. Any answer that reaches for it is dated.',
        hi: 'Zikr karne laayak. Map-reduce deprecated hai: wo server pe JavaScript chalata hai, kahin dheema hai aur indexes usi tarah use nahi kar sakta. Jo jawab usse uthaye wo purana hai.',
      },
    },
    {
      heading: { en: 'And explain works on a pipeline too', hi: 'Aur pipeline pe bhi explain chalta hai' },
      body: {
        en: 'The same tool applies. It shows which stage used an index, where a stage was pushed down into the query, and where a blocking stage forced everything into memory.',
        hi: 'Wahi auzaar yahan bhi chalta hai. Wo dikhata hai kis stage ne index use kiya, kahan koi stage query ke andar chala gaya, aur kahan kisi rokne wale stage ne sab kuch memory mein daal diya.',
      },
      code: `db.orders.aggregate(pipeline, { explain: true });`,
    },
  ],

  'What is populate() in Mongoose?': [
    {
      heading: { en: 'It replaces a reference with the document', hi: 'Ye reference ki jagah document rakh deta hai' },
      body: {
        en: 'A field holding an ObjectId reference becomes the full referenced document. It is Mongoose\'s convenience layer for reading across collections, and it looks like a join.',
        hi: 'Jis field mein ObjectId reference hai wo poora referenced document ban jaata hai. Ye collections ke paar padhne ke liye Mongoose ki suvidha hai, aur dikhne mein join jaisa lagta hai.',
      },
      code: `const post = await Post.findById(id).populate('author');
post.author.name;      // instead of just an ObjectId`,
    },
    {
      heading: { en: 'It is not a join — it is a second query', hi: 'Ye join nahi — ye doosri query hai' },
      body: {
        en: 'The crucial point. Mongoose fetches the parents, collects the referenced ids and issues a separate find with an $in. The database never joins anything; the work happens in the driver.',
        hi: 'Sabse zaroori baat. Mongoose parents laata hai, referenced ids jama karta hai aur $in ke saath ek alag find chalata hai. Database kuch join karta hi nahi; kaam driver mein hota hai.',
      },
      diagram: `Post.find().populate('author')

  1  db.posts.find({})
  2  db.users.find({ _id: { $in: [ …author ids… ] } })
  3  Mongoose stitches them together in Node`,
    },
    {
      heading: { en: 'Which is why nested populate is expensive', hi: 'Isiliye nested populate mehnga hai' },
      body: {
        en: 'Each level adds another round trip. Populating a post\'s author, then the author\'s organisation, then its owner is four queries — and on a list of posts the ids fan out quickly.',
        hi: 'Har level ek aur round trip jodta hai. Post ka author, phir author ki organisation, phir uska owner populate karna chaar queries hain — aur posts ki list pe ids tezi se fail jaati hain.',
      },
      code: `Post.find()
  .populate({ path: 'author', populate: { path: 'org' } });   // 3 queries`,
    },
    {
      heading: { en: 'Always select only the fields you need', hi: 'Hamesha sirf zaroori fields chuno' },
      body: {
        en: 'Without a projection, populate fetches the entire referenced document — including a password hash or a large array. Selecting a few fields cuts the payload and is the cheapest improvement available.',
        hi: 'Bina projection ke populate poora referenced document laata hai — password hash ya koi bada array samet. Kuch fields chunna payload kam karta hai aur sabse sasta sudhaar yahi hai.',
      },
      code: `.populate('author', 'name avatar')      // ✓ two fields, not the whole user`,
    },
    {
      heading: { en: 'Use lean when you are only reading', hi: 'Sirf padh rahe ho toh lean lo' },
      body: {
        en: 'populate hydrates every parent AND every child into full Mongoose documents. On a list that is a lot of object construction for data you are about to serialise to JSON anyway.',
        hi: 'populate har parent AUR har child ko poore Mongoose documents mein badal deta hai. List pe ye bahut saare objects banana hai, us data ke liye jise tum waise bhi JSON mein badalne wale ho.',
      },
      code: `await Post.find().populate('author', 'name').lean();      // ✓ much faster`,
    },
    {
      heading: { en: 'The alternative is $lookup', hi: 'Vikalp $lookup hai' },
      body: {
        en: 'An aggregation $lookup does the join inside the database in one round trip, which is faster for a large result set. It is more verbose and returns plain objects, so populate wins on ergonomics and $lookup on performance.',
        hi: 'Aggregation ka $lookup ek hi round trip mein database ke andar join karta hai, jo bade nateeje ke liye tez hai. Wo lamba hai aur saade objects deta hai, toh suvidha mein populate jeetta hai aur performance mein $lookup.',
      },
    },
    {
      heading: { en: 'Or design so you do not need it', hi: 'Ya aisa design karo ki zaroorat hi na ho' },
      body: {
        en: 'The strongest answer. If you always read the author name with the post, embed the name — duplicated and denormalised on purpose. Populate is a read-time fix for a schema modelled relationally.',
        hi: 'Sabse mazboot jawab. Agar tum post ke saath hamesha author ka naam padhte ho, toh naam embed kar do — jaan-boojh kar dohraaya aur denormalised. Populate us schema ka padhte-waqt ka ilaaj hai jo relational tareeke se banaya gaya.',
      },
    },
  ],

  'What is the difference between find() and findOne()?': [
    {
      heading: { en: 'A cursor versus a single document', hi: 'Cursor vs ek document' },
      body: {
        en: 'find returns a cursor over every matching document, which the driver turns into an array. findOne returns the first match as a document, or null if there is none. Different return types, so different handling.',
        hi: 'find har matching document pe ek cursor deta hai, jise driver array bana deta hai. findOne pehla match ek document ki tarah deta hai, ya kuch na mile toh null. Return types alag hain, toh sambhalna bhi alag.',
      },
      code: `const users = await User.find({ role: 'admin' });    // [] if none
const user  = await User.findOne({ email });          // null if none`,
    },
    {
      heading: { en: 'The empty result is the trap', hi: 'Khaali nateeja hi jaal hai' },
      body: {
        en: 'find returns an empty ARRAY, which is truthy. findOne returns null, which is falsy. Checking the result of find for truthiness always passes, so a "not found" branch written that way never runs.',
        hi: 'find khaali ARRAY deta hai, jo truthy hai. findOne null deta hai, jo falsy. find ke nateeje ko truthiness se jaancho toh wo hamesha paas hota hai, toh us tarah likhi "not found" wali branch kabhi chalti hi nahi.',
      },
      code: `if (!await User.find({ email })) {}       // ✗ never true — [] is truthy
if ((await User.find({ email })).length === 0) {}   // ✓
if (!await User.findOne({ email })) {}     // ✓`,
    },
    {
      heading: { en: 'findOne stops at the first match', hi: 'findOne pehle match pe ruk jaata hai' },
      body: {
        en: 'It is effectively find with a limit of one, so it stops scanning as soon as it has a document. Using find and taking index zero reads the whole result set first, which on an unindexed field is a real difference.',
        hi: 'Ye asal mein limit ek wala find hai, toh document milte hi scan rok deta hai. find karke index zero lena pehle poora nateeja padh leta hai, aur bina index wale field pe ye asli farq hai.',
      },
      code: `(await User.find({ email }))[0];      // ✗ reads everything
await User.findOne({ email });         // ✓ stops at one`,
    },
    {
      heading: { en: 'Neither guarantees an order without sort', hi: 'Bina sort ke koi order guarantee nahi karta' },
      body: {
        en: 'The "first" document findOne returns is whatever the storage engine finds first, which can change. If first means anything to you — newest, highest — you must sort explicitly.',
        hi: 'findOne jo "pehla" document deta hai wo wahi hai jo storage engine ko pehle mila, aur wo badal sakta hai. Agar pehla tumhare liye kuch matlab rakhta hai — sabse naya, sabse zyada — toh sort saaf likhna padega.',
      },
      code: `await Post.findOne({ authorId }).sort({ createdAt: -1 });   // ✓ newest`,
    },
    {
      heading: { en: 'find is lazy in the raw driver', hi: 'Kachche driver mein find lazy hai' },
      body: {
        en: 'A useful distinction. The driver returns a cursor and nothing is fetched until you iterate or call toArray. That is what lets you stream a large result set instead of loading it all into memory.',
        hi: 'Ek kaam ka farq. Driver ek cursor deta hai aur jab tak tum iterate ya toArray na karo tab tak kuch nahi aata. Isi se tum bada nateeja memory mein bhare bina stream kar sakte ho.',
      },
      code: `for await (const doc of db.users.find({})) { … }   // ✓ constant memory`,
    },
    {
      heading: { en: 'And always limit an unbounded find', hi: 'Aur bina seema wale find pe hamesha limit lagao' },
      body: {
        en: 'find with no filter and no limit will happily return a million documents and exhaust the heap. Paginate or limit every query that could grow — the collection is small today and will not be in a year.',
        hi: 'Bina filter aur bina limit ke find khushi se das lakh documents de dega aur heap khatam kar dega. Har us query pe pagination ya limit lagao jo badh sakti hai — collection aaj chhota hai, saal bhar mein nahi rahega.',
      },
    },
  ],

  'When should you embed documents versus reference them?': [
    {
      heading: { en: 'Model around the queries, not the entities', hi: 'Entities nahi, queries ke aas-paas model banao' },
      body: {
        en: 'This is the whole principle. In a relational database you normalise and join at read time. In MongoDB you decide what is read together and store it together, because there is no cheap join.',
        hi: 'Poora siddhant yahi hai. Relational database mein tum normalise karte ho aur padhte waqt join karte ho. MongoDB mein tum tay karte ho kya saath padha jaata hai aur usse saath rakhte ho, kyunki yahan sasta join hai hi nahi.',
      },
    },
    {
      heading: { en: 'Embed when it is read together and bounded', hi: 'Embed jab saath padha jaaye aur seemit ho' },
      body: {
        en: 'An address on a user, line items on an order, settings on an account. One read gets everything, updates are atomic, and there is no join. The condition is that the embedded data does not grow without limit.',
        hi: 'User ka address, order ke line items, account ki settings. Ek read mein sab mil jaata hai, updates atomic hote hain, aur koi join nahi. Shart ye hai ki embed kiya data bina seema na badhe.',
      },
      code: `{ _id, name, address: { line1, city, postcode } }      // ✓ one read`,
    },
    {
      heading: { en: 'Reference when it grows or is shared', hi: 'Reference jab badhe ya saanjha ho' },
      body: {
        en: 'Comments on a post, orders for a customer, anything many-to-many. Also reference when the same data is used by several parents, because embedding it means updating it in every copy.',
        hi: 'Post ke comments, customer ke orders, koi bhi many-to-many. Tab bhi reference karo jab wahi data kai parents use karte hon, kyunki embed karne ka matlab hai har copy mein usse badalna.',
      },
      code: `{ _id, postId, body }      // comments in their own collection`,
    },
    {
      heading: { en: 'The three questions that decide it', hi: 'Teen sawaal jo faisla karte hain' },
      body: {
        en: 'Do I read them together? Does the child grow without bound? Is the child shared by many parents or updated independently? Read together and bounded means embed; anything else leans towards reference.',
        hi: 'Kya main inhe saath padhta hoon? Kya bachcha bina seema badhta hai? Kya bachcha kai parents ka hai ya alag se badalta hai? Saath padha jaaye aur seemit ho toh embed; baaki sab reference ki taraf jhukte hain.',
      },
      diagram: `read together?   bounded?   shared?      →
    yes            yes        no        embed
    yes            no         no        reference (or bucket)
    no             —          —         reference
    —              —          yes       reference`,
    },
    {
      heading: { en: 'Duplication is allowed, and often right', hi: 'Dohraav allowed hai, aur aksar sahi' },
      body: {
        en: 'The extended reference pattern: store the id AND the one or two fields you always display. A comment keeps authorId plus the author\'s name and avatar, so rendering needs no second query.',
        hi: 'Extended reference pattern: id AUR wo ek-do fields rakho jo tum hamesha dikhate ho. Comment mein authorId ke saath author ka naam aur avatar rakho, toh render karne ke liye doosri query nahi chahiye.',
      },
      code: `{ _id, postId, body, author: { _id, name, avatar } }`,
    },
    {
      heading: { en: 'And accept the cost of that duplication', hi: 'Aur us dohraav ki keemat maano' },
      body: {
        en: 'When the author renames themselves you must update every copy. That is a background job, and it is usually the right trade — a rename is rare and reading a comment list is constant. Saying this explicitly is what shows you have made the decision before.',
        hi: 'Author apna naam badle toh har copy badalni padegi. Wo ek background job hai, aur aam taur pe ye sahi sauda hai — naam badalna kam hota hai aur comment list padhna lagataar. Ye saaf kehna dikhata hai ki tumne ye faisla pehle liya hai.',
      },
    },
  ],

  'What is the 16MB document limit and how do you work around it?': [
    {
      heading: { en: 'A hard BSON limit per document', hi: 'Har document pe sakht BSON seema' },
      body: {
        en: 'No document may exceed 16MB, and it cannot be raised. An update that would push a document past it fails outright — in production, on the busiest documents, which are exactly the ones that grew.',
        hi: 'Koi document 16MB se bada nahi ho sakta, aur ye badhaayi nahi ja sakti. Jo update usse aage le jaaye wo seedha fail ho jaata hai — production mein, un hi documents pe jo sabse vyast hain, aur wahi toh badhe the.',
      },
    },
    {
      heading: { en: 'Do not design close to the limit', hi: 'Seema ke paas design mat karo' },
      body: {
        en: 'Long before 16MB, a large document is slow: every read transfers all of it, every update rewrites it, and it pushes useful data out of the cache. Treat a few hundred kilobytes as the practical warning line.',
        hi: '16MB se bahut pehle hi bada document dheema hai: har read poora bhejta hai, har update usse dobara likhta hai, aur wo kaam ka data cache se bahar kar deta hai. Kuch sau kilobyte ko vyavharik chetavni ki rekha maano.',
      },
    },
    {
      heading: { en: 'Workaround one: reference the growing side', hi: 'Ilaaj ek: badhne wale hisse ko reference karo' },
      body: {
        en: 'The default answer. Move the unbounded array into its own collection with a reference back, and paginate it with a query. This is not a workaround so much as the correct model.',
        hi: 'Default jawab. Bina seema wale array ko apne collection mein le jao aur wapas ek reference rakho, aur usse query se paginate karo. Ye ilaaj se zyada sahi model hai.',
      },
      code: `db.comments.createIndex({ postId: 1, createdAt: -1 });
db.comments.find({ postId }).sort({ createdAt: -1 }).limit(20);`,
    },
    {
      heading: { en: 'Workaround two: the bucket pattern', hi: 'Ilaaj do: bucket pattern' },
      body: {
        en: 'Group entries into capped documents — a hundred readings per bucket, or one bucket per hour per device. You avoid a document per event, which would be millions, and avoid unbounded growth in one document.',
        hi: 'Entries ko seemit documents mein group karo — har bucket mein sau readings, ya har device ke har ghante ka ek bucket. Isse har event ka alag document banane se bacha jaata hai, jo laakhon hote, aur ek document ke bina seema badhne se bhi.',
      },
      code: `{ deviceId, hour: '2026-08-20T14', count: 100,
  readings: [ { t, v }, … ] }`,
    },
    {
      heading: { en: 'Workaround three: the outlier pattern', hi: 'Ilaaj teen: outlier pattern' },
      body: {
        en: 'Keep the common case embedded and spill only the rare large case. Most posts have twenty comments, so embed those; a viral post sets a flag and its overflow lives in another collection. You optimise for the ninety-nine per cent.',
        hi: 'Aam case embed rakho aur sirf durlabh bade case ko bahar bhejo. Zyadatar posts pe bees comments hote hain, toh unhe embed karo; viral post ek flag laga deti hai aur uska extra doosre collection mein rehta hai. Tum ninyaanve pratishat ke liye optimise karte ho.',
      },
      code: `{ _id, comments: [ …first 50… ], hasOverflow: true }`,
    },
    {
      heading: { en: 'Workaround four: GridFS, for binaries only', hi: 'Ilaaj chaar: sirf binaries ke liye GridFS' },
      body: {
        en: 'GridFS chunks a file across two collections so it can exceed 16MB. It is the right answer for a file that genuinely must live in Mongo — but object storage with only the key in the database is usually better.',
        hi: 'GridFS file ko do collections mein chunks mein baant deta hai taaki wo 16MB paar kare. Jo file sach mein Mongo mein hi rehni ho uske liye ye sahi hai — par object storage aur database mein sirf key, aam taur pe behtar hai.',
      },
    },
    {
      heading: { en: 'And catch it before it happens', hi: 'Aur isse hone se pehle pakdo' },
      body: {
        en: 'Add a $slice on the array so it cannot grow past a cap, or monitor document size and alert. Discovering the limit through a failed write in production is the outcome all of this is meant to avoid.',
        hi: 'Array pe $slice lagao taaki wo seema se aage na badhe, ya document ka size monitor karo aur alert lagao. Production mein fail hue write se seema ka pata chalna wahi nateeja hai jisse ye sab bachne ke liye hai.',
      },
      code: `{ $push: { comments: { $each: [c], $slice: -100 } } }   // ✓ capped`,
    },
  ],

  'What is the aggregation pipeline and what are the key stages?': [
    {
      heading: { en: 'A sequence of stages, each feeding the next', hi: 'Stages ka ek kram, har ek agle ko khilata hua' },
      body: {
        en: 'Documents flow through an array of stages. Each stage transforms the stream — filtering, grouping, reshaping — and passes its output to the next. Reading a pipeline top to bottom tells you exactly what happens.',
        hi: 'Documents stages ke array se guzarte hain. Har stage dhaara ko badalta hai — filter, group, shakl — aur apna output agle ko deta hai. Pipeline ko upar se neeche padho toh theek pata chal jaata hai kya ho raha hai.',
      },
    },
    {
      heading: { en: 'The stages you will actually use', hi: 'Jo stages tum sach mein use karoge' },
      body: {
        en: 'Six cover almost everything. Learn these and the rest are variations.',
        hi: 'Chhah lagbhag sab kuch cover kar lete hain. Ye seekh lo, baaki inhi ke roop hain.',
      },
      diagram: `$match     filter — like find, use it FIRST
$group     aggregate by a key: sum, avg, count, push
$sort      order the stream
$project   reshape: include, exclude, compute fields
$lookup    join another collection
$unwind    turn an array into one document per element`,
    },
    {
      heading: { en: '$match first, always', hi: '$match hamesha pehle' },
      body: {
        en: 'The single most important rule. A $match at the start of the pipeline can use an index and cuts the number of documents every later stage handles. The same $match after a $group can do neither.',
        hi: 'Sabse zaroori rule. Pipeline ke shuru mein $match index use kar sakta hai aur baad ke har stage ke documents kam kar deta hai. Wahi $match kisi $group ke baad dono nahi kar sakta.',
      },
      code: `[{ $match: { status: 'paid', createdAt: { $gte: start } } },
 { $group: { _id: '$customerId', total: { $sum: '$amount' } } }]`,
    },
    {
      heading: { en: '$group and its accumulators', hi: '$group aur uske accumulators' },
      body: {
        en: 'The _id field is what you group BY — set it to null to aggregate everything. The accumulators are $sum, $avg, $min, $max, $push and $addToSet. This is the stage that does the actual computation.',
        hi: '_id field wo hai jiske hisaab se group hota hai — sab kuch ek saath ginne ke liye usse null rakho. Accumulators hain $sum, $avg, $min, $max, $push aur $addToSet. Asli ginti isi stage mein hoti hai.',
      },
      code: `{ $group: { _id: null, count: { $sum: 1 }, avg: { $avg: '$amount' } } }`,
    },
    {
      heading: { en: '$unwind is the one that surprises people', hi: '$unwind hi logon ko chaunkata hai' },
      body: {
        en: 'It outputs one document per array element, so a document with five tags becomes five documents. That multiplies your stream, which is exactly what you want before grouping by tag and exactly what you do not want by accident.',
        hi: 'Wo har array element ka ek document deta hai, toh paanch tags wala document paanch documents ban jaata hai. Isse tumhari dhaara guna ho jaati hai, jo tag se group karne se pehle bilkul chahiye aur galti se ho jaaye toh bilkul nahi.',
      },
      code: `{ $unwind: '$tags' },
{ $group: { _id: '$tags', count: { $sum: 1 } } }      // tag frequency`,
    },
    {
      heading: { en: 'Blocking stages have a memory limit', hi: 'Rokne wale stages ki memory seema hai' },
      body: {
        en: '$group and $sort must see the whole stream, so they buffer, and they are capped at 100MB. Exceeding it fails the pipeline unless allowDiskUse is set — and hitting it usually means a $match is missing earlier.',
        hi: '$group aur $sort ko poori dhaara dekhni padti hai, toh wo buffer karte hain, aur 100MB pe seemit hain. Usse aage pipeline fail hoti hai jab tak allowDiskUse na do — aur ye aana aam taur pe matlab pehle koi $match chhoot gaya.',
      },
    },
    {
      heading: { en: 'And the newer stages worth knowing', hi: 'Aur naye stages jaanne laayak' },
      body: {
        en: '$facet runs several pipelines on the same input, which is how you get results and a total count in one round trip. $addFields adds computed fields without listing everything. $merge writes the result back into a collection.',
        hi: '$facet ek hi input pe kai pipelines chalata hai, aur aise hi tum ek round trip mein nateeje aur kul ginti dono paate ho. $addFields sab kuch likhe bina computed fields jodta hai. $merge nateeja wapas kisi collection mein likh deta hai.',
      },
      code: `{ $facet: {
    data: [{ $skip: 20 }, { $limit: 20 }],
    total: [{ $count: 'n' }],
} }`,
    },
  ],

  'What is $lookup and what are its limitations?': [
    {
      heading: { en: "MongoDB's left outer join", hi: 'MongoDB ka left outer join' },
      body: {
        en: '$lookup pulls matching documents from another collection into an array field on each input document. It is the only server-side join MongoDB has, and it works within one database.',
        hi: '$lookup doosre collection ke matching documents ko har input document pe ek array field mein le aata hai. MongoDB ka ye ek hi server-side join hai, aur ye ek database ke andar chalta hai.',
      },
      code: `{ $lookup: {
    from: 'users',
    localField: 'authorId',
    foreignField: '_id',
    as: 'author',
} }
// author is always an ARRAY, even for one match`,
    },
    {
      heading: { en: 'The result is always an array', hi: 'Nateeja hamesha array hota hai' },
      body: {
        en: 'Even a one-to-one relationship gives you a single-element array, and no match gives you an empty one. Follow it with $unwind, and set preserveNullAndEmptyArrays if you want a left join rather than an inner one.',
        hi: 'One-to-one rishta bhi ek element wala array deta hai, aur match na ho toh khaali. Uske baad $unwind lagao, aur inner ki jagah left join chahiye toh preserveNullAndEmptyArrays set karo.',
      },
      code: `{ $unwind: { path: '$author', preserveNullAndEmptyArrays: true } }`,
    },
    {
      heading: { en: 'Limitation one: it can be slow', hi: 'Seema ek: ye dheema ho sakta hai' },
      body: {
        en: 'For each input document MongoDB runs a lookup against the foreign collection. Without an index on foreignField that is a collection scan per document, which turns a fast pipeline into a very slow one.',
        hi: 'Har input document ke liye MongoDB foreign collection pe ek lookup chalata hai. foreignField pe index na ho toh har document pe ek collection scan hota hai, jo tez pipeline ko bahut dheema bana deta hai.',
      },
      code: `db.users.createIndex({ _id: 1 });      // ✓ always index the foreign field`,
    },
    {
      heading: { en: 'Limitation two: it does not work across shards', hi: 'Seema do: shards ke paar ye nahi chalta' },
      body: {
        en: 'Historically the foreign collection could not be sharded at all. Modern versions relaxed this, but a lookup across a sharded collection is still expensive because it must reach every shard. On a sharded cluster, design to avoid it.',
        hi: 'Pehle foreign collection sharded ho hi nahi sakta tha. Naye versions ne dheel di, par sharded collection pe lookup ab bhi mehnga hai kyunki usse har shard tak jaana padta hai. Sharded cluster pe aisa design karo ki iski zaroorat na pade.',
      },
    },
    {
      heading: { en: 'Limitation three: the 16MB result limit', hi: 'Seema teen: 16MB ka nateeja' },
      body: {
        en: 'The joined array lives inside the parent document, so a lookup that matches thousands of children can push a single result past 16MB and fail the pipeline. Filter the foreign side inside the lookup with a sub-pipeline.',
        hi: 'Joda gaya array parent document ke andar rehta hai, toh hazaaron children match karne wala lookup ek hi nateeje ko 16MB paar karwa kar pipeline fail kar sakta hai. Lookup ke andar sub-pipeline se foreign taraf ko chhaano.',
      },
      code: `{ $lookup: { from: 'comments', let: { p: '$_id' },
    pipeline: [
      { $match: { $expr: { $eq: ['$postId', '$$p'] } } },
      { $sort: { createdAt: -1 } }, { $limit: 5 },
    ],
    as: 'recentComments' } }`,
    },
    {
      heading: { en: '$lookup versus populate', hi: '$lookup vs populate' },
      body: {
        en: 'populate is two round trips stitched in Node; $lookup is one round trip done in the database. $lookup is generally faster for a large result and lets you filter, sort and limit the joined side. populate is easier to read.',
        hi: 'populate do round trips hain jo Node mein jodi jaati hain; $lookup ek round trip hai jo database mein hota hai. Bade nateeje ke liye $lookup aam taur pe tez hai aur jodi gayi taraf ko filter, sort aur limit karne deta hai. populate padhne mein aasaan hai.',
      },
    },
    {
      heading: { en: 'And the best join is no join', hi: 'Aur sabse achha join koi join na hona' },
      body: {
        en: 'If you always read the two together, embedding or an extended reference removes the lookup entirely. Reaching for $lookup on every query is a sign the schema was modelled relationally.',
        hi: 'Agar tum dono ko hamesha saath padhte ho, toh embed karna ya extended reference lookup ki zaroorat hi khatam kar deta hai. Har query pe $lookup uthana ishara hai ki schema relational tareeke se banaya gaya.',
      },
    },
  ],

  'What types of indexes does MongoDB support?': [
    {
      heading: { en: 'Group them by what they are for', hi: 'Inhe kaam ke hisaab se group karo' },
      body: {
        en: 'Single field, compound, multikey, text, geospatial, hashed and wildcard — plus the properties unique, partial, sparse and TTL that can apply to several of them. Grouping beats reciting.',
        hi: 'Single field, compound, multikey, text, geospatial, hashed aur wildcard — aur unique, partial, sparse aur TTL jaise gun jo inme se kai pe lag sakte hain. Group karna sunane se behtar hai.',
      },
      diagram: `TYPES                       PROPERTIES
single field                unique
compound (several fields)   partial   (only matching docs)
multikey (on an array)      sparse    (only docs with the field)
text (search)               TTL       (auto-expire)
2dsphere (geo)
hashed (sharding)
wildcard (unknown fields)`,
    },
    {
      heading: { en: 'Compound is the one that matters most', hi: 'Sabse zyada maayne compound rakhta hai' },
      body: {
        en: 'Most real query tuning is choosing the right compound index and the right field order. It serves a filter, a sort and a projection in one structure, and the prefix rule decides which queries it can serve.',
        hi: 'Asli query tuning ka zyadatar hissa sahi compound index aur sahi field order chunna hai. Wo ek hi dhaanche mein filter, sort aur projection sambhaalta hai, aur prefix rule tay karta hai wo kaunsi queries sambhaal sakta hai.',
      },
      code: `db.posts.createIndex({ authorId: 1, createdAt: -1 });`,
    },
    {
      heading: { en: 'Multikey happens automatically on an array', hi: 'Array pe multikey apne aap ban jaata hai' },
      body: {
        en: 'Index a field that holds an array and MongoDB creates one index entry per element. That is what makes a query on a tag work. The caveat is that a compound index may contain at most ONE array field.',
        hi: 'Jis field mein array hai usse index karo aur MongoDB har element ki ek entry banata hai. Isi se tag pe query chalti hai. Chetavni ye hai ki compound index mein zyada se zyada EK array field ho sakta hai.',
      },
      code: `db.posts.createIndex({ tags: 1 });      // multikey, automatically`,
    },
    {
      heading: { en: 'Partial and sparse are not the same', hi: 'Partial aur sparse ek nahi hain' },
      body: {
        en: 'Sparse skips documents where the field is missing. Partial indexes only documents matching a filter expression, which is strictly more general and is the one to prefer. A partial index on active users is much smaller than one on all users.',
        hi: 'Sparse un documents ko chhod deta hai jinme field nahi hai. Partial sirf un documents ko index karta hai jo kisi filter se match karein, jo sakht taur pe zyada aam hai aur yahi behtar hai. Active users ka partial index sab users ke index se kahin chhota hai.',
      },
      code: `db.users.createIndex({ email: 1 },
  { partialFilterExpression: { active: true } });`,
    },
    {
      heading: { en: 'Text search is limited', hi: 'Text search seemit hai' },
      body: {
        en: 'One text index per collection, basic stemming, no fuzzy matching and no relevance tuning. It is fine for a simple search box; for anything real, Atlas Search or Elasticsearch is the honest recommendation.',
        hi: 'Har collection pe ek text index, saada stemming, na fuzzy matching na relevance ki tuning. Simple search box ke liye theek hai; kisi asli kaam ke liye imaandaar salaah Atlas Search ya Elasticsearch hai.',
      },
    },
    {
      heading: { en: 'And the properties worth remembering', hi: 'Aur yaad rakhne laayak gun' },
      body: {
        en: 'unique enforces no duplicates. TTL deletes documents after a time. Wildcard indexes unknown field names, which is useful for a flexible attribute bag and expensive otherwise. Hashed exists mainly for shard key distribution.',
        hi: 'unique duplicates nahi hone deta. TTL kuch samay baad documents mita deta hai. Wildcard anjaan field naamon ko index karta hai, jo lachile attribute bag ke liye kaam ka hai aur baaki jagah mehnga. Hashed zyadatar shard key ke baantne ke liye hai.',
      },
    },
  ],

  'How does the compound index prefix rule work in MongoDB?': [
    {
      heading: { en: 'An index can serve any leading subset of its fields', hi: 'Index apne fields ke kisi bhi shuruaati hisse ko sambhaal sakta hai' },
      body: {
        en: 'An index on A, B, C can answer a query on A, on A and B, or on A, B and C. It cannot answer a query on B alone, or on B and C — because the tree is ordered by A first.',
        hi: 'A, B, C ka index A pe, A aur B pe, ya A, B aur C pe query ka jawab de sakta hai. Wo akele B pe, ya B aur C pe nahi de sakta — kyunki tree pehle A ke hisaab se kramwar hai.',
      },
      diagram: `index { a: 1, b: 1, c: 1 } serves

  { a }            ✓
  { a, b }         ✓
  { a, b, c }      ✓
  { b }            ✗
  { b, c }         ✗
  { a, c }         partial — uses a, then scans for c`,
    },
    {
      heading: { en: 'Why: think of a phone book', hi: 'Kyun: phone book socho' },
      body: {
        en: 'Sorted by surname then first name, you can find everyone called Sharma, and Sharma comma Asha. You cannot find everyone called Asha without reading the whole book — the second field is only ordered within a value of the first.',
        hi: 'Surname phir pehle naam se kramwar, toh tum har Sharma dhoondh sakte ho, aur Sharma comma Asha bhi. Har Asha ko poori kitaab padhe bina nahi dhoondh sakte — doosra field pehle ki kisi ek value ke andar hi kramwar hai.',
      },
    },
    {
      heading: { en: 'Which means one index can replace several', hi: 'Matlab ek index kai ki jagah le sakta hai' },
      body: {
        en: 'Because of the prefix rule, an index on A, B, C makes separate indexes on A and on A, B redundant. Dropping those saves write cost and memory, and finding these is one of the easiest real wins.',
        hi: 'Prefix rule ki wajah se A, B, C ka index, A ke aur A, B ke alag indexes bekaar kar deta hai. Unhe hataana write ki keemat aur memory bachaata hai, aur inhe dhoondhna sabse aasaan asli faaydon mein se ek hai.',
      },
    },
    {
      heading: { en: 'Equality, sort, range — in that order', hi: 'Equality, sort, range — isi kram mein' },
      body: {
        en: 'The rule for choosing field order. Equality matches first, then the sort field, then range filters. Putting a range before the sort field forces an in-memory sort, which is the most common index design mistake.',
        hi: 'Field ka kram chunne ka rule. Pehle equality wale, phir sort wala field, phir range filters. Range ko sort field se pehle rakhna in-memory sort karwa deta hai, aur index design ki sabse aam galti yahi hai.',
      },
      code: `db.orders.find({ status: 'paid', total: { $gt: 100 } })
         .sort({ createdAt: -1 });

createIndex({ status: 1, createdAt: -1, total: 1 });   // ✓ E, S, R`,
    },
    {
      heading: { en: 'Sort direction matters for a compound sort', hi: 'Compound sort ke liye disha maayne rakhti hai' },
      body: {
        en: 'An index can be walked forwards or backwards, so a single-field sort works either way. But a sort on two fields in mixed directions needs an index with matching directions — otherwise MongoDB sorts in memory.',
        hi: 'Index aage ya peeche dono taraf chala ja sakta hai, toh ek field ka sort dono tarah chalta hai. Par do fields pe mile-jule dishaon wale sort ke liye milti hui dishaon wala index chahiye — warna MongoDB memory mein sort karta hai.',
      },
      code: `.sort({ a: 1, b: -1 })      needs { a: 1, b: -1 } or { a: -1, b: 1 }`,
    },
    {
      heading: { en: 'Verify with explain', hi: 'explain se jaancho' },
      body: {
        en: 'Do not reason about it in your head. explain shows IXSCAN or COLLSCAN, which index was chosen, and whether a SORT stage appeared. A SORT stage in the plan means the index did not cover the ordering.',
        hi: 'Isse dimaag mein mat solve karo. explain IXSCAN ya COLLSCAN dikhata hai, kaunsa index chuna gaya, aur koi SORT stage aaya ya nahi. Plan mein SORT stage matlab index ne kram cover nahi kiya.',
      },
    },
  ],

  'What is a TTL index and when is it useful?': [
    {
      heading: { en: 'An index that deletes documents after a time', hi: 'Aisa index jo samay baad documents mita deta hai' },
      body: {
        en: 'Create a single-field index on a Date with expireAfterSeconds, and MongoDB removes each document once that many seconds have passed since the stored date. It is automatic cleanup with no cron job.',
        hi: 'Kisi Date field pe expireAfterSeconds ke saath single-field index banao, aur MongoDB har document ko us date se utne second beetne pe hata deta hai. Ye bina kisi cron job ke apne aap safai hai.',
      },
      code: `db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });`,
    },
    {
      heading: { en: 'A background thread does the deleting', hi: 'Ek background thread mitata hai' },
      body: {
        en: 'It runs roughly every sixty seconds, so expiry is approximate — a document can survive up to a minute past its time, and longer on a busy server. Never rely on it for anything where the exact moment matters.',
        hi: 'Wo lagbhag har saath second mein chalta hai, toh expiry andaazan hai — document apne samay se ek minute tak, aur vyast server pe usse zyada bhi bach sakta hai. Jahan theek pal maayne rakhta ho wahan ispe kabhi bharosa mat karo.',
      },
    },
    {
      heading: { en: 'Two forms, and the second is more useful', hi: 'Do roop, aur doosra zyada kaam ka' },
      body: {
        en: 'expireAfterSeconds with a number expires relative to the stored date. Setting it to zero expires AT the stored date, which lets each document carry its own expiry — the right shape for a token or a scheduled deletion.',
        hi: 'Number wala expireAfterSeconds store ki gayi date se utne samay baad hataata hai. Usse zero rakho toh document us date PE hata jaata hai, jisse har document apni expiry rakh sakta hai — token ya tay deletion ke liye yahi sahi shakl hai.',
      },
      code: `db.tokens.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
db.tokens.insertOne({ token, expiresAt: new Date(Date.now() + 9e5) });`,
    },
    {
      heading: { en: 'Where it fits', hi: 'Ye kahan fit hota hai' },
      body: {
        en: 'Sessions, password reset tokens, email verification codes, rate-limit counters, a cache collection, and logs or events with a retention policy. Anything where old rows are worthless and would otherwise grow forever.',
        hi: 'Sessions, password reset tokens, email verification codes, rate-limit counters, cache collection, aur retention policy wale logs ya events. Har wo cheez jahan purani rows bekaar hain aur warna hamesha badhti rehti.',
      },
    },
    {
      heading: { en: 'The constraints to know', hi: 'Jaanne laayak bandhan' },
      body: {
        en: 'The field must be a Date or an array of Dates — a number or a string is silently ignored and nothing is ever deleted. It must be a single-field index, not compound. And it does nothing on a secondary; only the primary deletes, and the change replicates.',
        hi: 'Field Date ya Dates ka array hona chahiye — number ya string chup-chaap ignore ho jaate hain aur kuch kabhi nahi mitta. Ye single-field index hona chahiye, compound nahi. Aur secondary pe ye kuch nahi karta; sirf primary mitata hai aur badlaav replicate hota hai.',
      },
    },
    {
      heading: { en: 'And deletion is not free', hi: 'Aur mitaana muft nahi hai' },
      body: {
        en: 'Expiring a million documents at once produces a million deletes, each written to the oplog and replicated. Stagger the expiry times rather than setting them all to the same instant, or the cleanup becomes a write storm.',
        hi: 'Das lakh documents ek saath expire hona das lakh deletes banata hai, har ek oplog mein likha aur replicate hota hua. Sabko ek hi pal pe set karne ki jagah expiry ke samay bikhero, warna safai ek write ka toofan ban jaati hai.',
      },
    },
  ],

  'How do you analyse and improve a slow MongoDB query?': [
    {
      heading: { en: 'Find it before you fix it', hi: 'Theek karne se pehle usse dhoondho' },
      body: {
        en: 'The profiler and the slow query log tell you which queries are actually slow, rather than which you suspect. Atlas surfaces this directly; self-hosted, enable profiling at a threshold.',
        hi: 'Profiler aur slow query log batate hain ki asal mein kaunsi queries dheemi hain, na ki jinpe tumhe shak hai. Atlas ye seedha dikhata hai; khud host karo toh kisi seema pe profiling chaalu karo.',
      },
      code: `db.setProfilingLevel(1, { slowms: 100 });
db.system.profile.find().sort({ ts: -1 }).limit(10);`,
    },
    {
      heading: { en: 'Then run explain with executionStats', hi: 'Phir executionStats ke saath explain chalao' },
      body: {
        en: 'This is the core tool. It tells you the winning plan, which index was used, how many documents were examined and how long each stage took. Everything after this is reading that output.',
        hi: 'Yahi mool auzaar hai. Wo batata hai jeetne wala plan, kaunsa index use hua, kitne documents dekhe gaye aur har stage mein kitna samay laga. Iske baad ka sab kuch usi output ko padhna hai.',
      },
      code: `db.orders.find({ status: 'paid' }).sort({ createdAt: -1 })
  .explain('executionStats');`,
    },
    {
      heading: { en: 'The three numbers that matter', hi: 'Teen aankde jo maayne rakhte hain' },
      body: {
        en: 'The stage: IXSCAN is good, COLLSCAN means no index was used. totalDocsExamined versus nReturned: a ratio near one is ideal, a thousand to one means the index is barely helping. And whether a SORT stage appears at all.',
        hi: 'Stage: IXSCAN achha hai, COLLSCAN matlab koi index use hi nahi hua. totalDocsExamined aur nReturned: anupaat ek ke paas ho toh sabse achha, hazaar-se-ek matlab index se bahut kam fayda ho raha hai. Aur SORT stage aaya bhi ya nahi.',
      },
      diagram: `COLLSCAN                  no index — add one
IXSCAN + SORT             the index does not cover the sort
docsExamined >> nReturned  the index is not selective enough
docsExamined == 0          ✓ a covered query, the best case`,
    },
    {
      heading: { en: 'A SORT stage is the common hidden cost', hi: 'Chhupi hui aam keemat SORT stage hai' },
      body: {
        en: 'It means MongoDB sorted in memory, which is capped at 32MB and fails outright beyond that. Adding the sort field to the index in the right position removes the stage entirely.',
        hi: 'Matlab MongoDB ne memory mein sort kiya, jo 32MB pe seemit hai aur usse aage seedha fail hota hai. Sort wale field ko index mein sahi jagah jodne se ye stage poori tarah hat jaata hai.',
      },
    },
    {
      heading: { en: 'Then fix the query, not just the index', hi: 'Phir sirf index nahi, query bhi theek karo' },
      body: {
        en: 'Project only the fields you need so less data crosses the network. Add a limit. Replace a regex that cannot use an index with a prefix-anchored one. And check whether you are fetching a thousand documents to display twenty.',
        hi: 'Sirf zaroori fields project karo taaki kam data network paar kare. Limit lagao. Aisa regex jo index use nahi kar sakta usse shuruaat pe bandhe hue se badlo. Aur dekho kahin tum bees dikhane ke liye hazaar documents toh nahi la rahe.',
      },
      code: `/asha/       // ✗ cannot use an index
/^asha/       // ✓ prefix — can`,
    },
    {
      heading: { en: 'Consider the working set', hi: 'Working set pe socho' },
      body: {
        en: 'If the indexes and hot data do not fit in RAM, every query hits disk and no amount of index tuning helps. Check the WiredTiger cache hit ratio — a sudden slowdown with no code change is often this.',
        hi: 'Agar indexes aur garam data RAM mein nahi samaate toh har query disk pe jaati hai aur index ki koi tuning kaam nahi aati. WiredTiger cache ka hit ratio dekho — bina code badle achanak dheemapan aksar yahi hota hai.',
      },
    },
    {
      heading: { en: 'And confirm the fix with the same tool', hi: 'Aur ilaaj usi auzaar se pakka karo' },
      body: {
        en: 'Re-run explain and compare the numbers. Adding an index that the planner does not choose is a common outcome, and only the plan tells you. Then check the write cost you just added is acceptable.',
        hi: 'explain dobara chalao aur aankde milao. Aisa index jodna jise planner chunta hi nahi, aam nateeja hai, aur ye sirf plan bataata hai. Phir dekho jo write ki keemat tumne abhi jodi wo theek hai ya nahi.',
      },
    },
  ],

  'What is a replica set and how does failover work?': [
    {
      heading: { en: 'Copies of the same data on several servers', hi: 'Wahi data kai servers pe' },
      body: {
        en: 'A replica set is a group of mongod instances holding the same data. One is the primary and takes every write; the others are secondaries that replicate from it. It provides redundancy and high availability.',
        hi: 'Replica set mongod instances ka ek samooh hai jinke paas wahi data hai. Ek primary hai aur har write leta hai; baaki secondaries hain jo usse replicate karte hain. Isse redundancy aur high availability milti hai.',
      },
      diagram: `        ┌── PRIMARY ──┐   all writes
        │             │
   SECONDARY     SECONDARY   replicate from the oplog`,
    },
    {
      heading: { en: 'Replication happens through the oplog', hi: 'Replication oplog se hoti hai' },
      body: {
        en: 'Every write on the primary is recorded in a capped collection called the oplog. Secondaries tail it and apply the same operations, which is why replication is asynchronous by default and secondaries can lag.',
        hi: 'Primary pe har write oplog naam ke capped collection mein likha jaata hai. Secondaries usse padhte aur wahi operations lagate hain, isliye replication default se asynchronous hai aur secondaries peeche reh sakte hain.',
      },
    },
    {
      heading: { en: 'Failover is an election', hi: 'Failover ek chunav hai' },
      body: {
        en: 'Members heartbeat every two seconds. If the primary is unreachable for the election timeout, the remaining members vote and one secondary becomes primary. It typically completes in ten to twelve seconds.',
        hi: 'Members har do second mein heartbeat bhejte hain. Primary election timeout tak na mile toh bache members vote karte hain aur ek secondary primary ban jaata hai. Ye aam taur pe das se baarah second mein poora hota hai.',
      },
    },
    {
      heading: { en: 'Which is why you need an odd number', hi: 'Isiliye vishham sankhya chahiye' },
      body: {
        en: 'An election needs a strict majority. With two members, losing one leaves one vote out of two, which is not a majority, so no primary is elected and the set becomes read-only. Three is the practical minimum.',
        hi: 'Chunav ke liye saaf bahumat chahiye. Do members mein ek khoya toh do mein se ek vote bachta hai, jo bahumat nahi hai, toh koi primary nahi banta aur set sirf-padhne wala ho jaata hai. Vyavharik nyoontam teen hai.',
      },
    },
    {
      heading: { en: 'The driver handles it for you', hi: 'Driver ye tumhare liye sambhaalta hai' },
      body: {
        en: 'Give the connection string all the members and the driver discovers the topology, notices the new primary and reconnects. With retryable writes enabled — the default — a write interrupted by a failover is retried once automatically.',
        hi: 'Connection string mein saare members do aur driver topology samajh leta hai, naya primary pehchaanta hai aur dobara judta hai. Retryable writes chaalu ho — jo default hai — toh failover se ruka write apne aap ek baar dobara chalta hai.',
      },
      code: `mongodb://a:27017,b:27017,c:27017/?replicaSet=rs0&retryWrites=true`,
    },
    {
      heading: { en: 'Reading from a secondary means reading stale data', hi: 'Secondary se padhna purana data padhna hai' },
      body: {
        en: 'Replication lag is usually milliseconds but can be seconds under load. secondaryPreferred spreads read load but you may not see your own write. Use it for analytics, not for read-after-write.',
        hi: 'Replication lag aam taur pe millisecond hota hai par load mein second bhi ho sakta hai. secondaryPreferred read ka bojh baantta hai par tumhe apna hi write na dikhe. Isse analytics ke liye lo, read-after-write ke liye nahi.',
      },
    },
    {
      heading: { en: 'And a replica set is not a backup', hi: 'Aur replica set backup nahi hai' },
      body: {
        en: 'Worth stating plainly. A DROP replicates in milliseconds. Replication protects against a server failing, not against a mistake or a bad deploy. You still need point-in-time backups.',
        hi: 'Ye saaf kehna chahiye. DROP milliseconds mein replicate ho jaata hai. Replication server ke fail hone se bachaata hai, kisi galti ya kharaab deploy se nahi. Point-in-time backups phir bhi chahiye.',
      },
    },
  ],

  'What are read and write concerns in MongoDB?': [
    {
      heading: { en: 'Two dials that trade durability against latency', hi: 'Do dial, jo durability aur latency ka sauda karte hain' },
      body: {
        en: 'Write concern is how many members must acknowledge a write before it is reported as successful. Read concern is how much of a guarantee you want about the data you read back.',
        hi: 'Write concern batata hai kitne members write ko maanein tab usse safal kaha jaaye. Read concern batata hai jo data tum padh rahe ho uspe kitni guarantee chahiye.',
      },
      diagram: `write concern              read concern
w: 1        primary only   local       whatever the node has
w: majority most members   majority    committed to a majority
j: true     on disk        linearizable  strongest, slowest
wtimeout    give up after`,
    },
    {
      heading: { en: 'w:1 can lose a write', hi: 'w:1 se write kho sakta hai' },
      body: {
        en: 'The primary acknowledges before replicating. If it fails before a secondary catches up, that write is rolled back when it rejoins — the client was told it succeeded and it did not. This is the case the setting exists for.',
        hi: 'Primary replicate karne se pehle maan leta hai. Wo kisi secondary ke saath aane se pehle gir jaaye toh wo write uske wapas judne pe rollback ho jaata hai — client ko safal bataya gaya tha aur hua nahi. Ye setting isi case ke liye hai.',
      },
    },
    {
      heading: { en: 'w:majority is the safe default', hi: 'w:majority safe default hai' },
      body: {
        en: 'A write acknowledged by a majority cannot be rolled back, because any new primary must contain it. It is the default in modern drivers, and the cost is one network round trip to a second member.',
        hi: 'Jis write ko bahumat ne maan liya wo rollback nahi ho sakta, kyunki koi bhi naya primary usse rakhega hi. Modern drivers mein yahi default hai, aur keemat ek doosre member tak ek network round trip hai.',
      },
      code: `{ writeConcern: { w: 'majority', wtimeout: 5000 } }`,
    },
    {
      heading: { en: 'j:true is about disk, not replication', hi: 'j:true disk ki baat hai, replication ki nahi' },
      body: {
        en: 'A detail people conflate. w counts members; j asks whether it reached the journal on disk. A write can be acknowledged by a majority and still be only in memory on each of them if j is false.',
        hi: 'Ek detail jise log mila dete hain. w members ginta hai; j poochta hai ki wo disk ke journal tak pahuncha ya nahi. j false ho toh bahumat ka maana hua write har ek pe sirf memory mein bhi ho sakta hai.',
      },
    },
    {
      heading: { en: 'Always set wtimeout with majority', hi: 'majority ke saath wtimeout hamesha do' },
      body: {
        en: 'If enough members are down, a majority write waits forever. wtimeout bounds it — but note that a timeout does not undo the write; it only stops waiting. The write may still commit later.',
        hi: 'Kaafi members neeche hon toh majority wala write hamesha intezaar karta hai. wtimeout usse seemit karta hai — par dhyaan do timeout write ko wapas nahi leta; wo sirf intezaar rokta hai. Write baad mein commit ho sakta hai.',
      },
    },
    {
      heading: { en: 'Read concern controls what you can see', hi: 'Read concern tay karta hai tumhe kya dikhega' },
      body: {
        en: 'local returns whatever the node has, including writes that could still be rolled back. majority returns only data acknowledged by a majority. linearizable is the strongest and the slowest, and applies only to reads of a single document on the primary.',
        hi: 'local wo deta hai jo node ke paas hai, un writes samet jo abhi rollback ho sakte hain. majority sirf wo data deta hai jise bahumat ne maana. linearizable sabse mazboot aur sabse dheema hai, aur sirf primary pe ek document ke read pe lagta hai.',
      },
    },
    {
      heading: { en: 'And read preference is a third, separate setting', hi: 'Aur read preference ek teesri, alag setting hai' },
      body: {
        en: 'Worth separating clearly. Read preference chooses WHICH member you read from; read concern chooses what guarantee that read carries. Reading from a secondary with majority concern is still stale — just consistently stale.',
        hi: 'Ise saaf alag karna chahiye. Read preference chunta hai tum KIS member se padhoge; read concern chunta hai us read pe kya guarantee hai. Secondary se majority concern ke saath padhna phir bhi purana hai — bas ek jaisa purana.',
      },
    },
  ],

  'What is sharding and how do you choose a shard key?': [
    {
      heading: { en: 'Horizontal partitioning across machines', hi: 'Machines ke paar horizontal baant' },
      body: {
        en: 'Sharding splits a collection across several replica sets, each holding a subset of the data. It is how you scale past what one machine can hold or write, and it is the only way to scale writes.',
        hi: 'Sharding ek collection ko kai replica sets mein baant deta hai, har ek data ka ek hissa rakhta hai. Ek machine jitna rakh ya likh sakti hai usse aage scale karne ka yahi tareeka hai, aur writes scale karne ka toh ek hi.',
      },
      diagram: `           mongos (router)
        ┌──────┼──────┐
     shard1  shard2  shard3      each a replica set
     a–h     i–p     q–z          ranges of the shard key`,
    },
    {
      heading: { en: 'The shard key decides everything', hi: 'Shard key hi sab tay karti hai' },
      body: {
        en: 'It determines which shard a document lives on, and therefore which shards a query must reach. Choosing it badly is the single most consequential mistake in a sharded deployment — and it is expensive to change.',
        hi: 'Wo tay karti hai document kis shard pe rahega, aur isliye kisi query ko kaunse shards tak jaana padega. Usse galat chunna sharded deployment ki sabse bhaari galti hai — aur usse badalna mehnga hai.',
      },
    },
    {
      heading: { en: 'Three properties a good key needs', hi: 'Achhi key ke teen gun' },
      body: {
        en: 'High cardinality, so there are enough distinct values to split. Even write distribution, so no one shard is hot. And presence in your common queries, so a read can target one shard instead of all of them.',
        hi: 'Zyada cardinality, taaki baantne ko kaafi alag values hon. Writes ka samaan baant, taaki koi ek shard garam na ho. Aur tumhari aam queries mein maujoodgi, taaki read sab ki jagah ek shard pe jaa sake.',
      },
    },
    {
      heading: { en: 'The classic bad key: a timestamp', hi: 'Classic kharaab key: timestamp' },
      body: {
        en: 'Monotonically increasing values all land on the same chunk, so every insert goes to one shard while the others idle. The same applies to an ObjectId, because it starts with a timestamp.',
        hi: 'Lagataar badhti values ek hi chunk pe girti hain, toh har insert ek shard pe jaata hai aur baaki khaali baithe rehte hain. ObjectId pe bhi yahi lagoo hai, kyunki wo timestamp se shuru hota hai.',
      },
      code: `{ createdAt: 1 }      // ✗ every write hits the last chunk
{ _id: 1 }             // ✗ ObjectId is time-ordered — same problem`,
    },
    {
      heading: { en: 'A compound key usually wins', hi: 'Compound key aam taur pe jeetti hai' },
      body: {
        en: 'Combining a high-cardinality field you filter on with something that spreads writes gives you both properties. Hashing distributes perfectly but destroys range queries, so it is a real trade rather than a default.',
        hi: 'Jis high-cardinality field pe tum filter karte ho usse kisi aisi cheez se milao jo writes baant de, toh dono gun mil jaate hain. Hashing bilkul samaan baantta hai par range queries khatam kar deta hai, toh ye default nahi, ek asli sauda hai.',
      },
      code: `{ customerId: 1, createdAt: 1 }      // ✓ targeted and distributed
{ userId: 'hashed' }                   // ✓ even, ✗ no range queries`,
    },
    {
      heading: { en: 'Targeted versus scatter-gather', hi: 'Targeted vs scatter-gather' },
      body: {
        en: 'A query that includes the shard key goes to one shard. A query that does not is broadcast to every shard and the results merged — which gets slower as you add shards, the opposite of what you wanted.',
        hi: 'Jis query mein shard key hai wo ek shard pe jaati hai. Jisme nahi hai wo har shard pe bheji jaati hai aur nateeje jode jaate hain — jo shards badhne pe dheemi hoti jaati hai, jo tumhari ummeed ke ulta hai.',
      },
    },
    {
      heading: { en: 'And do not shard until you must', hi: 'Aur jab tak zaroori na ho shard mat karo' },
      body: {
        en: 'Sharding adds routers, config servers, operational complexity and a key you cannot easily change. A well-indexed replica set on a large instance handles a very large workload. Say this — reaching for sharding early is the more common mistake.',
        hi: 'Sharding routers, config servers, operational jhanjhat aur aisi key jodta hai jise aasaani se badla nahi ja sakta. Bade instance pe achhe indexes wala replica set bahut bada kaam sambhaal leta hai. Ye kaho — jaldi sharding uthana zyada aam galti hai.',
      },
    },
  ],

  'How do transactions work in MongoDB?': [
    {
      heading: { en: 'A session, and all-or-nothing across documents', hi: 'Ek session, aur documents ke paar sab-ya-kuch-nahi' },
      body: {
        en: 'Start a session, perform the operations with it, and commit. Every operation inside either lands or none does. The driver helper also retries on a transient error, which is why you should use it rather than commit by hand.',
        hi: 'Ek session shuru karo, operations usi ke saath karo, aur commit. Andar ke saare operations ya to lagenge ya koi nahi. Driver ka helper transient error pe dobara koshish bhi karta hai, isliye khud commit karne ki jagah wahi use karo.',
      },
      code: `const session = client.startSession();
await session.withTransaction(async () => {
  await from.updateOne({ _id: a }, { $inc: { bal: -100 } }, { session });
  await to.updateOne({ _id: b }, { $inc: { bal: 100 } }, { session });
});
await session.endSession();`,
    },
    {
      heading: { en: 'Every operation must pass the session', hi: 'Har operation session le kar chale' },
      body: {
        en: 'The silent bug. An operation inside the callback that does not receive the session runs OUTSIDE the transaction — it commits immediately and is not rolled back. Nothing warns you.',
        hi: 'Chup-chaap wala bug. Callback ke andar jo operation session nahi leta wo transaction ke BAHAR chalta hai — wo turant commit ho jaata hai aur rollback nahi hota. Koi chetavni nahi milti.',
      },
      code: `await coll.updateOne(filter, update);              // ✗ outside
await coll.updateOne(filter, update, { session });  // ✓ inside`,
    },
    {
      heading: { en: 'They need a replica set', hi: 'Inhe replica set chahiye' },
      body: {
        en: 'The mechanism is built on the oplog, so a standalone mongod cannot run one. Locally this means starting even a single node as a replica set — code that works on Atlas failing locally is almost always this.',
        hi: 'Ye machinery oplog pe bani hai, toh akela mongod ise nahi chala sakta. Local pe iska matlab hai ek node ko bhi replica set ki tarah shuru karna — Atlas pe chalta aur local pe fail hota code lagbhag hamesha yahi hota hai.',
      },
    },
    {
      heading: { en: 'There is a time limit and a conflict model', hi: 'Ek samay seema aur takraav ka model hai' },
      body: {
        en: 'A transaction is capped at 60 seconds by default and holds its changes in memory. Two transactions writing the same document conflict, and one is aborted with a TransientTransactionError — which withTransaction retries for you.',
        hi: 'Transaction default se 60 second tak seemit hai aur apne badlaav memory mein rakhta hai. Ek hi document pe likhne wale do transactions takra jaate hain, aur ek TransientTransactionError ke saath ruk jaata hai — jise withTransaction tumhare liye dobara chalata hai.',
      },
    },
    {
      heading: { en: 'Keep them short and small', hi: 'Inhe chhota aur jaldi rakho' },
      body: {
        en: 'Never do network I/O, a slow external call or user interaction inside a transaction. The longer it is open the more it conflicts and the more memory it holds. Read what you need first, then open the transaction.',
        hi: 'Transaction ke andar kabhi network I/O, koi dheemi bahari call ya user se baat mat karo. Wo jitna lamba khula rahega utna takraayega aur utni memory pakdega. Jo chahiye pehle padh lo, phir transaction kholo.',
      },
    },
    {
      heading: { en: 'And the best transaction is the one you avoid', hi: 'Aur sabse achha transaction wo hai jo tum karo hi na' },
      body: {
        en: 'This is the answer that shows design sense. A single-document update is already atomic, so if the data that changes together lives in one document you need no transaction at all. Needing them everywhere means the schema was modelled relationally.',
        hi: 'Yahi jawab design ki samajh dikhata hai. Ek document ka update pehle se atomic hai, toh jo data saath badalta hai wo ek document mein ho toh transaction ki zaroorat hi nahi. Har jagah zaroorat matlab schema relational tareeke se bana hai.',
      },
    },
  ],

  /* ─── Writes, Mongoose internals and modelling ────────────── */

  'What is the difference between updateOne, updateMany, and replaceOne?': [
    {
      heading: { en: 'How many, and how much', hi: 'Kitne, aur kitna' },
      body: {
        en: 'updateOne modifies the first matching document. updateMany modifies every match. replaceOne swaps the entire document for a new one, keeping only the _id.',
        hi: 'updateOne pehla matching document badalta hai. updateMany har match ko. replaceOne poore document ki jagah naya rakh deta hai, sirf _id bacha kar.',
      },
      code: `db.users.updateOne({ role: 'admin' }, { $set: { active: true } });
db.users.updateMany({ role: 'admin' }, { $set: { active: true } });
db.users.replaceOne({ _id }, { name: 'Asha' });   // everything else is gone`,
    },
    {
      heading: { en: 'replaceOne deletes the fields you omit', hi: 'replaceOne un fields ko mita deta hai jo tum nahi dete' },
      body: {
        en: 'This is the dangerous one. Anything not in the replacement document disappears — including fields another part of the system added. It is the equivalent of PUT, and it is almost never what you meant.',
        hi: 'Khatarnak yahi hai. Jo bhi replacement document mein nahi hai wo gaayab ho jaata hai — un fields samet jo system ke kisi aur hisse ne jodi thi. Ye PUT jaisa hai, aur lagbhag kabhi tumhara matlab yahi nahi hota.',
      },
    },
    {
      heading: { en: 'An update needs an operator', hi: 'Update ko operator chahiye' },
      body: {
        en: 'Passing a plain object to updateOne without $set is an error in modern drivers, and in older ones it silently behaved as a replace. Always use an operator so the intent is explicit.',
        hi: 'updateOne ko bina $set ke saada object dena modern drivers mein error hai, aur puranon mein wo chup-chaap replace ki tarah chalta tha. Hamesha operator use karo taaki mansha saaf rahe.',
      },
      code: `updateOne(filter, { name: 'Asha' });          // ✗ no operator
updateOne(filter, { $set: { name: 'Asha' } });  // ✓`,
    },
    {
      heading: { en: 'Each single-document update is atomic', hi: 'Har ek document ka update atomic hai' },
      body: {
        en: 'updateMany is NOT atomic across documents — it applies to each one in turn, and another writer can see a partial result. If all-or-nothing across documents matters, you need a transaction.',
        hi: 'updateMany documents ke paar atomic NAHI hai — wo har ek pe baari-baari lagta hai, aur koi doosra likhne wala aadha nateeja dekh sakta hai. Documents ke paar sab-ya-kuch-nahi chahiye toh transaction chahiye.',
      },
    },
    {
      heading: { en: 'Read the result rather than assuming', hi: 'Maan lene ki jagah nateeja padho' },
      body: {
        en: 'matchedCount says how many the filter found; modifiedCount says how many actually changed. They differ when the update was a no-op, which is how you distinguish "not found" from "already had that value".',
        hi: 'matchedCount batata hai filter ne kitne dhoondhe; modifiedCount kitne sach mein badle. Jab update se kuch na badle tab dono alag hote hain, aur aise hi "nahi mila" aur "pehle se wahi value thi" mein farq karte ho.',
      },
      code: `const r = await coll.updateOne(filter, update);
if (r.matchedCount === 0) return res.sendStatus(404);`,
    },
  ],

  'What is an upsert in MongoDB?': [
    {
      heading: { en: 'Update if it exists, insert if it does not', hi: 'Ho toh update, na ho toh insert' },
      body: {
        en: 'Pass upsert true and the operation either modifies the matching document or creates one. It replaces a find-then-insert with a single atomic operation.',
        hi: 'upsert true do aur operation ya toh matching document badalta hai ya naya banata hai. Ye pehle-dhoondho-phir-insert ko ek atomic operation se badal deta hai.',
      },
      code: `db.counters.updateOne(
  { _id: 'visits' },
  { $inc: { count: 1 } },
  { upsert: true }
);`,
    },
    {
      heading: { en: 'The new document is built from filter plus update', hi: 'Naya document filter aur update se banta hai' },
      body: {
        en: 'On an insert, MongoDB takes the equality fields from the filter and applies the update operators on top. That is why the filter should identify the document, not just narrow it.',
        hi: 'Insert pe MongoDB filter ke equality wale fields leta hai aur upar se update operators lagata hai. Isiliye filter ko document pehchaanna chahiye, sirf chhota nahi karna.',
      },
      code: `updateOne({ userId: 1, day: '2026-08-20' },
          { $inc: { views: 1 } }, { upsert: true });
// creates { userId: 1, day: '2026-08-20', views: 1 }`,
    },
    {
      heading: { en: '$setOnInsert for create-only fields', hi: 'Sirf-create wale fields ke liye $setOnInsert' },
      body: {
        en: 'Fields that should be written when the document is created but never touched on an update — a createdAt, a default status. Without it you either overwrite on every update or cannot set it at all.',
        hi: 'Wo fields jo document banne pe likhi jaayein par update pe kabhi na chhui jaayein — createdAt, koi default status. Iske bina ya toh har update pe overwrite hoga ya set hi nahi kar paoge.',
      },
      code: `{ $inc: { views: 1 }, $setOnInsert: { createdAt: new Date() } }`,
    },
    {
      heading: { en: 'It is atomic, which is the point', hi: 'Ye atomic hai, aur yahi asli baat hai' },
      body: {
        en: 'A find-then-insert has a race: two concurrent requests both find nothing and both insert. An upsert is a single operation, so the database resolves the race. This is why it is the right tool for a counter or a cache entry.',
        hi: 'Pehle-dhoondho-phir-insert mein race hai: do saath aayi requests dono ko kuch nahi milta aur dono insert kar deti hain. Upsert ek hi operation hai, toh database race sulja deta hai. Isiliye counter ya cache entry ke liye yahi sahi auzaar hai.',
      },
    },
    {
      heading: { en: 'Two concurrent upserts can still collide', hi: 'Do saath ke upserts phir bhi takra sakte hain' },
      body: {
        en: 'The detail worth knowing. Without a unique index on the filter fields, two upserts can both insert and you get duplicates. With one, the loser gets a duplicate key error and should simply retry.',
        hi: 'Jaanne laayak detail. Filter wale fields pe unique index na ho toh dono upserts insert kar sakte hain aur duplicates ban jaate hain. Index ho toh haarne wale ko duplicate key error milta hai aur usse bas dobara koshish karni chahiye.',
      },
      code: `db.counters.createIndex({ userId: 1, day: 1 }, { unique: true });`,
    },
  ],

  'What is the difference between find() and aggregate()?': [
    {
      heading: { en: 'Retrieve versus transform', hi: 'Laana vs badalna' },
      body: {
        en: 'find selects documents and returns them, optionally projected and sorted. aggregate runs them through a pipeline that can group, join, reshape and compute. If you only need to filter and return, find is simpler and faster.',
        hi: 'find documents chunta hai aur deta hai, chaaho toh project aur sort karke. aggregate unhe ek pipeline se guzaarta hai jo group, join, shakl aur ginti kar sakti hai. Sirf filter karke lauta na ho toh find simple aur tez hai.',
      },
    },
    {
      heading: { en: 'What only aggregate can do', hi: 'Sirf aggregate kya kar sakta hai' },
      body: {
        en: 'Group and compute — sums, averages, counts per key. Join with $lookup. Reshape a document into a different shape. Unwind an array. Run several pipelines on the same input with $facet. None of that exists in find.',
        hi: 'Group aur ginti — har key pe sum, average, count. $lookup se jodna. Document ki shakl badalna. Array ko unwind karna. $facet se ek hi input pe kai pipelines. Inme se kuch bhi find mein nahi hai.',
      },
      code: `db.orders.aggregate([
  { $group: { _id: '$status', total: { $sum: '$amount' } } },
]);      // impossible with find`,
    },
    {
      heading: { en: 'find is a special case of aggregate', hi: 'find, aggregate ka ek khaas roop hai' },
      body: {
        en: 'Any find can be written as a pipeline of $match, $project, $sort and $limit. The reverse is not true. Saying this shows you understand the relationship rather than treating them as two unrelated APIs.',
        hi: 'Koi bhi find, $match, $project, $sort aur $limit ki pipeline mein likha ja sakta hai. Ulta sach nahi hai. Ye kehna dikhata hai ki tum rishta samajhte ho, dono ko alag-alag APIs nahi maan rahe.',
      },
    },
    {
      heading: { en: 'Both can use indexes, with a condition', hi: 'Dono indexes use kar sakte hain, ek shart pe' },
      body: {
        en: 'A $match at the START of a pipeline uses an index exactly like find. A $match after a $group or a $project cannot, because the documents no longer have their original shape. That is the whole reason stage order matters.',
        hi: 'Pipeline ke SHURU ka $match bilkul find ki tarah index use karta hai. $group ya $project ke baad ka $match nahi kar sakta, kyunki documents ki asli shakl badal chuki hoti hai. Stage ka kram isi wajah se maayne rakhta hai.',
      },
    },
    {
      heading: { en: 'And aggregate has memory limits find does not', hi: 'Aur aggregate pe wo memory seemayein hain jo find pe nahi' },
      body: {
        en: 'A blocking stage such as $group or $sort is capped at 100MB and fails beyond it unless allowDiskUse is set. find streams through a cursor with no such limit. That is a practical reason not to reach for aggregate by default.',
        hi: '$group ya $sort jaisa rokne wala stage 100MB pe seemit hai aur usse aage fail hota hai jab tak allowDiskUse na do. find cursor se stream karta hai, aisi koi seema nahi. Default se aggregate na uthane ki ek vyavharik wajah yahi hai.',
      },
    },
  ],

  'How does Mongoose middleware (hooks) work?': [
    {
      heading: { en: 'Functions that run around an operation', hi: 'Kisi operation ke aas-paas chalne wale functions' },
      body: {
        en: 'Register a pre or post hook on a schema for a given operation, and Mongoose runs it before or after. It is how cross-cutting behaviour — hashing a password, updating a timestamp, cascading a delete — lives beside the schema.',
        hi: 'Schema pe kisi operation ke liye pre ya post hook register karo, aur Mongoose usse pehle ya baad chalata hai. Saanjha behaviour — password hash karna, timestamp badalna, delete ko aage badhana — schema ke saath aise hi rehta hai.',
      },
      code: `userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});`,
    },
    {
      heading: { en: 'Document hooks and query hooks are different', hi: 'Document hooks aur query hooks alag hain' },
      body: {
        en: 'The single most important distinction. In a document hook such as save, this is the DOCUMENT. In a query hook such as findOneAndUpdate, this is the QUERY — there is no document, and reading this.password gives you nothing.',
        hi: 'Sabse zaroori farq yahi hai. save jaise document hook mein this DOCUMENT hai. findOneAndUpdate jaise query hook mein this QUERY hai — koi document hai hi nahi, aur this.password padhne se kuch nahi milta.',
      },
      code: `schema.pre('save', function () { this.password; });          // ✓ document
schema.pre('findOneAndUpdate', function () {
  this.getUpdate();      // ✓ the update object — there is no document
});`,
    },
    {
      heading: { en: 'Which is why an update skips your save hook', hi: 'Isiliye update tumhara save hook chhod deta hai' },
      body: {
        en: 'The bug people actually hit. findByIdAndUpdate does not trigger a save hook, so the password is stored in plain text. Either use save, or register a hook on the update operations as well.',
        hi: 'Log asal mein isi bug se takraate hain. findByIdAndUpdate save hook nahi chalata, toh password saade text mein chala jaata hai. Ya toh save use karo, ya update wale operations pe bhi hook lagao.',
      },
      code: `doc.password = pw; await doc.save();              // ✓ hook runs
await User.findByIdAndUpdate(id, { password: pw }); // ✗ it does not`,
    },
    {
      heading: { en: 'Async hooks and the next callback', hi: 'Async hooks aur next callback' },
      body: {
        en: 'A hook can return a promise or call next, but not usefully both. An async function that also takes next will hang or run twice. Pick the promise form — it is clearer and it composes with await.',
        hi: 'Hook promise de sakta hai ya next bula sakta hai, par dono theek se nahi. Aisa async function jo next bhi le, wo latak jaata hai ya do baar chalta hai. Promise wala roop chuno — wo saaf hai aur await ke saath judta hai.',
      },
    },
    {
      heading: { en: 'Post hooks run after, and cannot stop it', hi: 'Post hooks baad mein chalte hain, aur rok nahi sakte' },
      body: {
        en: 'A post hook receives the result and is the place for logging, cache invalidation or emitting an event. Throwing there does not undo the write — the operation already happened.',
        hi: 'Post hook nateeja paata hai aur logging, cache saaf karna ya koi event bhejne ki jagah hai. Wahan throw karne se write wapas nahi hota — operation ho chuka hota hai.',
      },
    },
    {
      heading: { en: 'And keep them small', hi: 'Aur inhe chhota rakho' },
      body: {
        en: 'A hook makes behaviour implicit — a reader of the calling code sees a save and cannot see the four things that happen around it. They are right for genuinely universal concerns and wrong as a place to hide business logic.',
        hi: 'Hook behaviour ko chhupa deta hai — bulane wale code ka padhne wala ek save dekhta hai aur uske aas-paas ki chaar cheezein nahi dekh paata. Ye sach mein har jagah lagne wali cheezon ke liye sahi hain aur business logic chhupane ki jagah ke roop mein galat.',
      },
    },
  ],

  'What are Mongoose virtuals?': [
    {
      heading: { en: 'Computed properties that are never stored', hi: 'Bani hui properties jo kabhi store nahi hotin' },
      body: {
        en: 'A virtual is a getter defined on the schema. It is computed from other fields when accessed and never written to the database, so it cannot drift out of sync with the data it derives from.',
        hi: 'Virtual schema pe define kiya gaya ek getter hai. Access karne pe wo doosre fields se banta hai aur kabhi database mein nahi likha jaata, toh wo apne source data se kabhi alag nahi ho sakta.',
      },
      code: `userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});
user.fullName;      // computed, not stored`,
    },
    {
      heading: { en: 'They do not appear in JSON by default', hi: 'Default se ye JSON mein nahi aate' },
      body: {
        en: 'The thing everyone hits. toJSON and toObject omit virtuals unless you opt in on the schema — so the field works in Node and vanishes in the API response.',
        hi: 'Sabko yahi milta hai. toJSON aur toObject virtuals chhod dete hain jab tak schema pe chaalu na karo — toh field Node mein chalti hai aur API response mein gaayab ho jaati hai.',
      },
      code: `new mongoose.Schema({ … }, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});`,
    },
    {
      heading: { en: 'You cannot query a virtual', hi: 'Virtual pe query nahi kar sakte' },
      body: {
        en: 'It does not exist in the database, so there is nothing to filter or index on. If you need to search by it, it has to be a real field kept up to date — usually in a pre-save hook.',
        hi: 'Wo database mein hai hi nahi, toh filter ya index karne ko kuch nahi. Usse dhoondhna ho toh usse asli field banana padega jise update rakha jaaye — aam taur pe pre-save hook mein.',
      },
      code: `await User.find({ fullName: 'Asha Rao' });      // ✗ always empty`,
    },
    {
      heading: { en: 'A setter virtual can split an input', hi: 'Setter virtual input ko baant sakta hai' },
      body: {
        en: 'Define a set alongside the get and assigning to the virtual writes to the underlying fields. It is a neat way to accept one shape at the boundary and store another.',
        hi: 'get ke saath set bhi define karo toh virtual mein assign karna andar ke fields mein likh deta hai. Boundary pe ek shakl lena aur doosri store karna, iska ye saaf tareeka hai.',
      },
      code: `.set(function (v) {
  [this.firstName, this.lastName] = v.split(' ');
});`,
    },
    {
      heading: { en: 'Virtual populate is the powerful case', hi: 'Virtual populate hi taakatwar case hai' },
      body: {
        en: 'A virtual can define a reverse relationship — a post\'s comments, where only the comment stores postId. You get populate without storing an array of ids on the parent, which avoids the unbounded array entirely.',
        hi: 'Virtual ulta rishta bata sakta hai — post ke comments, jahan sirf comment postId rakhta hai. Parent pe ids ka array rakhe bina populate mil jaata hai, jisse bina seema wala array poori tarah bach jaata hai.',
      },
      code: `postSchema.virtual('comments', {
  ref: 'Comment', localField: '_id', foreignField: 'postId',
});
await Post.findById(id).populate('comments');`,
    },
    {
      heading: { en: 'And lean drops them', hi: 'Aur lean inhe gira deta hai' },
      body: {
        en: 'lean returns a plain object with no Mongoose machinery, so virtuals are gone. That combination — a virtual the API needs and lean added for speed — is a genuinely confusing bug when the field silently disappears.',
        hi: 'lean saada object deta hai jisme Mongoose ki machinery nahi hoti, toh virtuals gaayab ho jaate hain. Jab API ko virtual chahiye aur speed ke liye lean joda gaya ho, toh field ka chup-chaap gaayab hona sach mein uljhane wala bug hai.',
      },
    },
  ],

  'What is the difference between lean() and a normal Mongoose query?': [
    {
      heading: { en: 'Plain objects versus hydrated documents', hi: 'Saade objects vs bane hue documents' },
      body: {
        en: 'A normal query returns Mongoose documents with getters, setters, change tracking and instance methods. lean returns the plain JavaScript objects the driver produced, with none of that.',
        hi: 'Aam query Mongoose ke documents deti hai jinme getters, setters, change tracking aur instance methods hote hain. lean wo saade JavaScript objects deta hai jo driver ne banaye, inme se kuch bhi nahi.',
      },
      code: `const docs = await User.find();            // Mongoose documents
const objs = await User.find().lean();      // plain objects`,
    },
    {
      heading: { en: 'The difference is measurable', hi: 'Farq naapne laayak hai' },
      body: {
        en: 'Hydration allocates a document, wires up getters and starts tracking changes for every result. On a list of a thousand, lean is commonly several times faster and uses far less memory.',
        hi: 'Hydration har nateeje ke liye ek document banata hai, getters jodta hai aur badlaav track karna shuru karta hai. Hazaar ki list pe lean aam taur pe kai guna tez hai aur bahut kam memory leta hai.',
      },
    },
    {
      heading: { en: 'What you lose', hi: 'Kya khota hai' },
      body: {
        en: 'save and other instance methods, virtuals, getters and setters, and default values applied on read. If your API relies on a virtual, adding lean makes the field silently disappear from the response.',
        hi: 'save aur baaki instance methods, virtuals, getters aur setters, aur padhne pe lagne wale default values. Agar tumhari API kisi virtual pe nirbhar hai, toh lean jodne se wo field chup-chaap response se gaayab ho jaati hai.',
      },
      code: `const u = await User.findById(id).lean();
await u.save();      // ✗ u.save is not a function`,
    },
    {
      heading: { en: 'Casting still happens on the way in', hi: 'Andar jaate waqt casting phir bhi hoti hai' },
      body: {
        en: 'A useful detail. lean affects the RESULT, not the query. A string id in the filter is still cast to an ObjectId, because that happens before the query is sent. Only the returned documents are plain.',
        hi: 'Ek kaam ki baat. lean NATEEJE pe asar karta hai, query pe nahi. Filter mein string id phir bhi ObjectId banti hai, kyunki wo query bhejne se pehle hota hai. Sirf laute hue documents saade hote hain.',
      },
    },
    {
      heading: { en: 'The rule', hi: 'Rule' },
      body: {
        en: 'Use lean for any read-only query whose result goes straight to JSON — a list endpoint, a report, a export. Skip it when you will modify and save the document, or when you rely on virtuals.',
        hi: 'Har us sirf-padhne wali query pe lean lo jiska nateeja seedha JSON mein jaata hai — list endpoint, report, export. Jab document badal kar save karna ho ya virtuals pe nirbhar ho tab chhod do.',
      },
      code: `router.get('/users', async (req, res) =>
  res.json(await User.find().select('name email').lean()));   // ✓`,
    },
  ],

  'How does populate() work and what are its performance implications?': [
    {
      heading: { en: 'It is a second query, stitched in Node', hi: 'Ye doosri query hai, Node mein jodi hui' },
      body: {
        en: 'Mongoose fetches the parents, collects the referenced ids, runs a separate find with an $in, and attaches the results. The database never joins — the work is a round trip plus assembly in your process.',
        hi: 'Mongoose parents laata hai, referenced ids jama karta hai, $in ke saath alag find chalata hai, aur nateeje jod deta hai. Database kuch join karta hi nahi — kaam ek round trip aur tumhare process mein jodna hai.',
      },
      diagram: `Post.find().populate('author')
  1  posts.find({})
  2  users.find({ _id: { $in: [...] } })
  3  stitch in Node`,
    },
    {
      heading: { en: 'It is not N+1, but it is not free either', hi: 'Ye N+1 nahi hai, par muft bhi nahi' },
      body: {
        en: 'A common misconception. Mongoose batches the ids into one $in, so populating a hundred posts is two queries, not a hundred and one. The cost is the extra round trip and the memory to hold both result sets.',
        hi: 'Ek aam galatfehmi. Mongoose ids ko ek $in mein jod deta hai, toh sau posts populate karna do queries hain, ek sau ek nahi. Keemat extra round trip aur dono nateeje rakhne ki memory hai.',
      },
    },
    {
      heading: { en: 'Nested populate multiplies the round trips', hi: 'Nested populate round trips guna kar deta hai' },
      body: {
        en: 'Each level is another query. Author, then the author\'s organisation, then its owner is four sequential round trips — and they are sequential, so the latency adds up rather than overlapping.',
        hi: 'Har level ek aur query hai. Author, phir author ki organisation, phir uska owner — chaar kramwar round trips, aur wo kramwar hain, toh latency judti jaati hai, overlap nahi hoti.',
      },
    },
    {
      heading: { en: 'Always project and index', hi: 'Hamesha project aur index karo' },
      body: {
        en: 'Without a projection you fetch every field of every referenced document. And the foreignField must be indexed — usually it is _id, which is, but a populate on a custom field without an index is a collection scan.',
        hi: 'Bina projection ke tum har referenced document ka har field laate ho. Aur foreignField pe index hona chahiye — aam taur pe wo _id hota hai, jo hai, par bina index wale custom field pe populate ek collection scan hai.',
      },
      code: `.populate('author', 'name avatar')      // ✓ two fields`,
    },
    {
      heading: { en: 'Combine it with lean', hi: 'Isse lean ke saath jodo' },
      body: {
        en: 'populate hydrates every parent and every child into full documents. On a list endpoint that is a large amount of object construction for data you are about to serialise. lean removes all of it.',
        hi: 'populate har parent aur har child ko poore documents mein badal deta hai. List endpoint pe ye us data ke liye bahut saare objects banana hai jise tum serialise karne hi wale ho. lean ye sab hata deta hai.',
      },
    },
    {
      heading: { en: 'And the alternatives', hi: 'Aur vikalp' },
      body: {
        en: 'A $lookup does the join in one round trip inside the database and lets you filter and limit the joined side. Or denormalise — store the author name on the post and remove the join entirely, which is the fastest option and the one MongoDB is designed for.',
        hi: '$lookup ek hi round trip mein database ke andar join karta hai aur jodi gayi taraf ko filter aur limit karne deta hai. Ya denormalise karo — post pe author ka naam rakh do aur join hi khatam kar do, jo sabse tez hai aur MongoDB isi ke liye bana hai.',
      },
    },
  ],

  'What is an ObjectId and what does it contain?': [
    {
      heading: { en: 'A 12-byte identifier, not a random number', hi: 'Ek 12-byte pehchaan, koi random number nahi' },
      body: {
        en: 'Every document gets an _id, and by default it is an ObjectId — twelve bytes shown as twenty-four hex characters. It is generated by the driver, on the client, before the insert is sent.',
        hi: 'Har document ko _id milti hai, aur default se wo ObjectId hoti hai — baarah bytes, chaubees hex characters mein dikhti hui. Wo driver banata hai, client pe, insert bhejne se pehle.',
      },
      code: `ObjectId('66c4e0f1a2b3c4d5e6f70819')`,
    },
    {
      heading: { en: 'What the twelve bytes hold', hi: 'Baarah bytes mein kya hai' },
      body: {
        en: 'Four bytes of Unix timestamp in seconds, five bytes of a per-process random value, and three bytes of an incrementing counter. That structure is what makes it unique without any coordination between clients.',
        hi: 'Chaar bytes ka Unix timestamp seconds mein, paanch bytes ka har process ka random value, aur teen bytes ka badhta counter. Yahi dhaancha usse clients ke beech bina kisi taal-mel ke unique banata hai.',
      },
      diagram: `| 4 bytes timestamp | 5 bytes random | 3 bytes counter |
   seconds since epoch   per process      incrementing`,
    },
    {
      heading: { en: 'Which means it is roughly time-ordered', hi: 'Matlab ye lagbhag samay ke kram mein hai' },
      body: {
        en: 'The timestamp comes first, so sorting by _id sorts approximately by creation time and you can extract the date. Approximately, because two documents in the same second are ordered by the counter, not the clock.',
        hi: 'Timestamp pehle hai, toh _id se sort karna lagbhag banne ke samay se sort karta hai aur tum date nikaal sakte ho. Lagbhag, kyunki ek hi second ke do documents counter se lagte hain, ghadi se nahi.',
      },
      code: `id.getTimestamp();      // a Date
db.posts.find().sort({ _id: -1 });   // newest first, no extra index`,
    },
    {
      heading: { en: 'The client generates it, which is useful', hi: 'Isse client banata hai, aur ye kaam ka hai' },
      body: {
        en: 'You know the id before the write completes, so you can return it immediately or reference it in a related document in the same batch. A relational auto-increment id cannot do that.',
        hi: 'Write poora hone se pehle hi tumhe id pata hoti hai, toh usse turant lauta sakte ho ya usi batch ke kisi jude document mein use kar sakte ho. Relational ki auto-increment id ye nahi kar sakti.',
      },
      code: `const _id = new ObjectId();
await posts.insertOne({ _id, title });
await events.insertOne({ postId: _id });      // ✓ no round trip between`,
    },
    {
      heading: { en: 'It is not a good shard key', hi: 'Ye achhi shard key nahi hai' },
      body: {
        en: 'Because it starts with a timestamp it increases monotonically, so every insert lands on the same chunk and one shard takes all the write load. This is the classic sharding mistake.',
        hi: 'Wo timestamp se shuru hoti hai isliye lagataar badhti hai, toh har insert ek hi chunk pe girta hai aur ek shard saara write bojh leta hai. Ye classic sharding wali galti hai.',
      },
    },
    {
      heading: { en: 'And it is not a secret', hi: 'Aur ye koi raaz nahi hai' },
      body: {
        en: 'The timestamp and counter are readable, so an id leaks roughly when a record was created and lets someone estimate volume by comparing two. For anything user-facing where that matters, use a UUID or a separate public identifier.',
        hi: 'Timestamp aur counter padhe ja sakte hain, toh id lagbhag bata deti hai record kab bana aur do ko milaa kar koi maatra ka andaaza laga sakta hai. Jahan ye maayne rakhta ho wahan UUID ya alag public pehchaan lo.',
      },
    },
  ],

  'How do you prevent NoSQL injection in MongoDB?': [
    {
      heading: { en: 'The attack is an operator where you expected a value', hi: 'Hamla wahan operator hai jahan tumne value maani thi' },
      body: {
        en: 'MongoDB queries are objects, so if a client can put an object where you expected a string, it can send a query operator. This is the NoSQL equivalent of SQL injection and it needs no quoting tricks.',
        hi: 'MongoDB ki queries objects hain, toh jahan tumne string maani thi wahan client object daal sake toh wo query operator bhej sakta hai. Ye SQL injection ka NoSQL roop hai aur isme quote wale jugaad ki zaroorat bhi nahi.',
      },
      code: `// POST { "email": { "$ne": null }, "password": { "$ne": null } }
await User.findOne({ email: req.body.email, password: req.body.password });
// ✗ matches the first user — a login bypass`,
    },
    {
      heading: { en: 'Fix one: validate the type', hi: 'Ilaaj ek: type jaancho' },
      body: {
        en: 'The root cause is accepting an object where a string belongs. A schema that requires a string rejects the payload before it reaches the query, which fixes the entire class rather than one instance.',
        hi: 'Jad wajah ye hai ki jahan string honi chahiye wahan object maan liya. Aisa schema jo string maange wo payload ko query tak pahunchne se pehle mana kar deta hai, jo ek case nahi poori shreni theek karta hai.',
      },
      code: `const Login = z.object({ email: z.string().email(), password: z.string() });
const { email, password } = Login.parse(req.body);      // ✓`,
    },
    {
      heading: { en: 'Fix two: cast explicitly', hi: 'Ilaaj do: saaf cast karo' },
      body: {
        en: 'If you cannot add validation, coercing to a string removes the operator. It is a patch rather than a design, but it is better than nothing on a legacy endpoint.',
        hi: 'Validation na jod sako toh string mein badalna operator hata deta hai. Ye design nahi patch hai, par purane endpoint pe kuch na hone se behtar hai.',
      },
      code: `await User.findOne({ email: String(req.body.email) });`,
    },
    {
      heading: { en: 'Mongoose helps, but only where there is a schema', hi: 'Mongoose madad karta hai, par sirf jahan schema ho' },
      body: {
        en: 'A field typed String rejects an object during casting, so the classic login bypass fails. But a query on a field not in the schema, or an operator injected into a nested path, still gets through — the schema is a partial defence.',
        hi: 'String type wala field casting mein object mana kar deta hai, toh classic login bypass fail ho jaata hai. Par jo field schema mein nahi hai uspe query, ya kisi nested path mein ghusaya operator, phir bhi nikal jaata hai — schema aadha bachaav hai.',
      },
    },
    {
      heading: { en: 'Never pass user input to $where or a JS expression', hi: '$where ya JS expression mein user ka input kabhi mat bhejo' },
      body: {
        en: '$where evaluates JavaScript on the server, so user input there is remote code execution, not just query manipulation. It is also slow and cannot use an index. There is essentially never a reason to use it.',
        hi: '$where server pe JavaScript chalata hai, toh wahan user ka input remote code execution hai, sirf query badalna nahi. Wo dheema bhi hai aur index bhi use nahi kar sakta. Usse use karne ki koi wajah lagbhag hai hi nahi.',
      },
    },
    {
      heading: { en: 'And sanitise as a defence in depth', hi: 'Aur ek aur parat ke roop mein sanitise karo' },
      body: {
        en: 'express-mongo-sanitize strips keys starting with a dollar sign or containing a dot. It is a useful safety net but not a substitute for typing your inputs — a value can still be wrong without containing an operator.',
        hi: 'express-mongo-sanitize wo keys hata deta hai jo dollar se shuru hon ya jinme dot ho. Ye kaam ka suraksha jaal hai par input ko type karne ka vikalp nahi — bina operator ke bhi value galat ho sakti hai.',
      },
    },
  ],

  'What is the difference between MongoDB and a relational database?': [
    {
      heading: { en: 'Documents versus tables', hi: 'Documents vs tables' },
      body: {
        en: 'MongoDB stores flexible BSON documents in collections; a relational database stores rows with a fixed column set in tables. A document can nest arrays and sub-documents, so related data lives together rather than being split across tables.',
        hi: 'MongoDB collections mein lachile BSON documents rakhta hai; relational database tables mein tay columns wali rows. Document arrays aur sub-documents nest kar sakta hai, toh juda hua data tables mein bantne ki jagah saath rehta hai.',
      },
    },
    {
      heading: { en: 'Schema on write versus schema on read', hi: 'Likhte waqt schema vs padhte waqt schema' },
      body: {
        en: 'A relational database enforces the schema and rejects a bad row. MongoDB accepts almost anything unless you add validation, so the structure is enforced by your application. That is flexibility and it is also a responsibility.',
        hi: 'Relational database schema lagoo karta hai aur galat row mana kar deta hai. MongoDB lagbhag kuch bhi le leta hai jab tak validation na jodo, toh dhaancha tumhara application lagoo karta hai. Ye lachak bhi hai aur zimmedaari bhi.',
      },
    },
    {
      heading: { en: 'Joins are the real design difference', hi: 'Asli design ka farq joins hai' },
      body: {
        en: 'SQL is built around joining normalised tables at read time. MongoDB has $lookup but it is not the primary tool — you model around the queries and store together what is read together. Trying to normalise in MongoDB is the most common mistake.',
        hi: 'SQL normalised tables ko padhte waqt jodne ke aas-paas bana hai. MongoDB mein $lookup hai par wo mukhya auzaar nahi — tum queries ke aas-paas model banate ho aur jo saath padha jaata hai wo saath rakhte ho. MongoDB mein normalise karne ki koshish sabse aam galti hai.',
      },
      diagram: `SQL       normalise, then JOIN at read time
MongoDB   decide what is read together, store it together`,
    },
    {
      heading: { en: 'Scaling differs in direction', hi: 'Scaling ki disha alag hai' },
      body: {
        en: 'Relational databases traditionally scale up, with read replicas for reads. MongoDB shards horizontally as a first-class feature, which is how it scales writes. Modern Postgres has options too, so this is a difference of emphasis rather than an absolute.',
        hi: 'Relational databases parampara se upar scale karte hain, reads ke liye read replicas ke saath. MongoDB pehle darje ke feature ki tarah horizontally shard karta hai, aur aise hi writes scale karta hai. Aaj ke Postgres mein bhi vikalp hain, toh ye poora farq nahi, zor ka farq hai.',
      },
    },
    {
      heading: { en: 'The ACID gap has largely closed', hi: 'ACID ka farq lagbhag mit chuka hai' },
      body: {
        en: 'Be accurate here. MongoDB has had atomic single-document writes forever and multi-document transactions since 4.0. "MongoDB is not ACID" is out of date — the honest statement is that transactions are available but the model discourages needing them.',
        hi: 'Yahan theek raho. MongoDB mein ek document ke atomic writes hamesha se hain aur 4.0 se multi-document transactions bhi. "MongoDB ACID nahi hai" purani baat hai — imaandaar baat ye hai ki transactions maujood hain par model unki zaroorat kam karta hai.',
      },
    },
    {
      heading: { en: 'And the choice is about the data, not fashion', hi: 'Aur chunav data ka hai, fashion ka nahi' },
      body: {
        en: 'Document-shaped data with a variable structure, read as a unit, suits MongoDB. Highly relational data with many-to-many joins, strict constraints and reporting suits SQL. Saying that plainly is a better answer than defending either.',
        hi: 'Badalte dhaanche wala document jaisa data, jo ek ikaai ki tarah padha jaaye, MongoDB ke liye theek hai. Bahut relational data jisme kai many-to-many joins, sakht constraints aur reporting ho, SQL ke liye. Ye saaf kehna kisi ek ka bachaav karne se behtar jawab hai.',
      },
    },
  ],

  'When should you NOT use MongoDB?': [
    {
      heading: { en: 'Highly relational data with many joins', hi: 'Bahut relational data, kai joins ke saath' },
      body: {
        en: 'If most queries join four or five entities in different combinations, you cannot embed your way out of it. $lookup exists but it is slower and more awkward than a SQL join, and the schema ends up normalised anyway.',
        hi: 'Agar zyadatar queries chaar-paanch entities ko alag-alag tareeke se jodti hain, toh embed karke bach nahi sakte. $lookup hai par wo SQL ke join se dheema aur bhadda hai, aur schema waise bhi normalised ho jaata hai.',
      },
    },
    {
      heading: { en: 'When you need strict, database-enforced constraints', hi: 'Jab sakht, database ke lagoo kiye constraints chahiye' },
      body: {
        en: 'Foreign keys, cascading deletes and check constraints do not exist. MongoDB has JSON Schema validation, but referential integrity is your application\'s job — and in a financial or regulated system that is a real risk.',
        hi: 'Foreign keys, cascading deletes aur check constraints hote hi nahi. MongoDB mein JSON Schema validation hai, par referential integrity tumhare application ka kaam hai — aur financial ya regulated system mein ye asli jokhim hai.',
      },
    },
    {
      heading: { en: 'Complex reporting and ad-hoc analytics', hi: 'Uljhi reporting aur ad-hoc analytics' },
      body: {
        en: 'The aggregation pipeline is capable but verbose, and analysts know SQL. If the primary consumer is a BI tool or a data team writing arbitrary queries, a relational database or a warehouse is the better fit.',
        hi: 'Aggregation pipeline kaabil hai par lambi hai, aur analysts SQL jaante hain. Agar mukhya upyogkarta koi BI tool ya data team hai jo manchaahi queries likhti hai, toh relational database ya warehouse behtar hai.',
      },
    },
    {
      heading: { en: 'When the data is genuinely tabular and fixed', hi: 'Jab data sach mein tabular aur tay ho' },
      body: {
        en: 'If every record has the same twelve columns and always will, the flexibility buys you nothing and you give up constraints, joins and mature tooling for it. Flexibility you do not need is a cost.',
        hi: 'Agar har record mein wahi baarah columns hain aur hamesha rahenge, toh lachak se kuch nahi milta aur uske badle constraints, joins aur pakka tooling chhod dete ho. Jo lachak chahiye hi nahi wo ek keemat hai.',
      },
    },
    {
      heading: { en: 'And when the team does not know it', hi: 'Aur jab team usse jaanti hi na ho' },
      body: {
        en: 'The most honest reason. MongoDB modelled like a relational database performs badly and is harder to fix than a normalised SQL schema. A team fluent in Postgres will ship a better system in Postgres, and that matters more than any benchmark.',
        hi: 'Sabse imaandaar wajah. Relational tareeke se banaya gaya MongoDB kharaab chalta hai aur usse theek karna normalised SQL schema se mushkil hai. Postgres mein maahir team Postgres mein behtar system banayegi, aur ye kisi bhi benchmark se zyada maayne rakhta hai.',
      },
    },
    {
      heading: { en: 'What it is genuinely good at', hi: 'Ye kis mein sach mein achha hai' },
      body: {
        en: 'Close with this so the answer is balanced. Document-shaped data with a varying structure, content and catalogues, event and log data, rapid iteration where the schema is still moving, and workloads that need horizontal write scaling.',
        hi: 'Isse khatam karo taaki jawab santulit rahe. Badalte dhaanche wala document jaisa data, content aur catalogues, event aur log data, tezi se badalta kaam jahan schema abhi jam nahi raha, aur wo kaam jinhe horizontal write scaling chahiye.',
      },
    },
  ],

  'What is the oplog?': [
    {
      heading: { en: 'A capped collection of every write', hi: 'Har write ka ek capped collection' },
      body: {
        en: 'The operations log lives in the local database and records every change made on the primary, in order, in an idempotent form. Secondaries tail it and replay it, which is how replication works.',
        hi: 'Operations log local database mein rehta hai aur primary pe hue har badlaav ko kram se, idempotent roop mein likhta hai. Secondaries usse padhte aur dohraate hain, aur replication aise hi chalta hai.',
      },
      code: `use local;
db.oplog.rs.find().sort({ $natural: -1 }).limit(5);`,
    },
    {
      heading: { en: 'Entries are idempotent, not literal', hi: 'Entries idempotent hain, shabdik nahi' },
      body: {
        en: 'An important detail. An $inc of one is recorded as a $set to the resulting value, so replaying an entry twice produces the same state. That is what makes replication safe to retry after an interruption.',
        hi: 'Ek zaroori baat. Ek ka $inc, nateeje wali value ke $set ki tarah likha jaata hai, toh entry do baar chalane pe wahi state banti hai. Isi se rukawat ke baad replication dobara chalana safe hai.',
      },
    },
    {
      heading: { en: 'It is capped, and the size is a time window', hi: 'Ye capped hai, aur size ek samay ki khidki hai' },
      body: {
        en: 'Old entries are overwritten. What matters is not the megabytes but how many hours of writes it holds — the oplog window. A secondary offline longer than that window cannot catch up and needs a full resync.',
        hi: 'Purani entries ke upar likha jaata hai. Megabytes nahi, ye maayne rakhta hai ki wo kitne ghanton ke writes rakhta hai — oplog window. Us window se zyada der offline raha secondary saath nahi pakad sakta aur usse poora resync chahiye.',
      },
      code: `rs.printReplicationInfo();      // shows the oplog window in hours`,
    },
    {
      heading: { en: 'It powers more than replication', hi: 'Isse replication se zyada chalta hai' },
      body: {
        en: 'Change streams are built on it. Point-in-time recovery replays it. Migration tools tail it to keep a target in sync. Any answer that mentions only replication is missing why it matters day to day.',
        hi: 'Change streams isi pe bane hain. Point-in-time recovery isse dohraata hai. Migration tools isse padh kar target ko synced rakhte hain. Jo jawab sirf replication ka zikr kare wo ye chhod deta hai ki ye roz kyun maayne rakhta hai.',
      },
    },
    {
      heading: { en: 'And a short oplog is an operational risk', hi: 'Aur chhota oplog operational jokhim hai' },
      body: {
        en: 'A burst of writes shrinks the window in hours. If a secondary is being resynced or a change stream consumer is down during that burst, it falls off the oplog and cannot resume. Monitor the window, not the size.',
        hi: 'Writes ki ek lehar window ko ghanton mein chhota kar deti hai. Us lehar ke dauraan koi secondary resync ho raha ho ya koi change stream consumer neeche ho, toh wo oplog se gir jaata hai aur aage nahi badh sakta. Size nahi, window monitor karo.',
      },
    },
  ],

  'What are Change Streams?': [
    {
      heading: { en: 'A real-time feed of changes', hi: 'Badlaav ki real-time dhaara' },
      body: {
        en: 'A change stream lets you subscribe to inserts, updates, replaces and deletes on a collection, a database or the whole deployment. It is built on the oplog and delivered through the normal driver connection.',
        hi: 'Change stream tumhe kisi collection, database ya poore deployment pe inserts, updates, replaces aur deletes subscribe karne deta hai. Ye oplog pe bana hai aur aam driver connection se aata hai.',
      },
      code: `const stream = db.collection('orders').watch([
  { $match: { operationType: 'insert' } },
]);
for await (const change of stream) notify(change.fullDocument);`,
    },
    {
      heading: { en: 'It replaces polling', hi: 'Ye polling ki jagah leta hai' },
      body: {
        en: 'The problem it solves. Without it you poll every few seconds, which is either too slow or wasteful, and you need a marker column to know what is new. A change stream pushes the change as it happens.',
        hi: 'Ye kaunsi problem hal karta hai. Iske bina tum har kuch second mein poll karte ho, jo ya toh dheema hai ya barbaadi, aur naya kya hai ye jaanne ko ek marker column chahiye. Change stream badlaav hote hi bhej deta hai.',
      },
    },
    {
      heading: { en: 'It is resumable, which is the important part', hi: 'Ye resume ho sakta hai, aur yahi zaroori hissa hai' },
      body: {
        en: 'Every event carries a resume token. Store the last one and after a crash or a deploy you resume exactly where you stopped, with no lost or duplicated events. Without storing it you lose everything that happened while you were down.',
        hi: 'Har event ke saath ek resume token aata hai. Aakhri wala rakh lo aur crash ya deploy ke baad tum theek wahin se aage badhte ho, bina kisi event ke khoye ya dohraaye. Usse na rakho toh jab tum neeche the tab ka sab kuch kho jaata hai.',
      },
      code: `db.collection('orders').watch([], { resumeAfter: savedToken });`,
    },
    {
      heading: { en: 'And the resume token expires with the oplog', hi: 'Aur resume token oplog ke saath expire hota hai' },
      body: {
        en: 'The caveat people miss. If your consumer is down longer than the oplog window, the token is no longer in the oplog and the resume fails. Monitor the window and alert on consumer lag.',
        hi: 'Wo chetavni jo log chook jaate hain. Tumhara consumer oplog window se zyada der neeche rahe toh token oplog mein nahi bachta aur resume fail ho jaata hai. Window monitor karo aur consumer ke peeche hone pe alert lagao.',
      },
    },
    {
      heading: { en: 'An update event does not include the document', hi: 'Update ke event mein document nahi hota' },
      body: {
        en: 'By default you get the changed fields, not the full document. Ask for fullDocument if you need it — and note it is looked up at the time of the event, so a later change may already be reflected.',
        hi: 'Default se tumhe badle hue fields milte hain, poora document nahi. Chahiye toh fullDocument maango — aur dhyaan do wo event ke waqt dekha jaata hai, toh baad ka koi badlaav pehle se dikh sakta hai.',
      },
      code: `.watch([], { fullDocument: 'updateLookup' });`,
    },
    {
      heading: { en: 'It requires a replica set, and one consumer', hi: 'Iske liye replica set chahiye, aur ek consumer' },
      body: {
        en: 'It is built on the oplog, so a standalone cannot do it. And a change stream is not a queue — every consumer sees every event, so two instances of your service both process the change. Elect a leader or push into a real queue.',
        hi: 'Ye oplog pe bana hai, toh standalone ye nahi kar sakta. Aur change stream queue nahi hai — har consumer har event dekhta hai, toh tumhari service ke do instances dono us badlaav ko process karenge. Ek leader chuno ya usse asli queue mein daalo.',
      },
    },
  ],

  /* ─── Patterns, operations and concurrency ────────────────── */

  'What is GridFS and when do you need it?': [
    {
      heading: { en: 'A convention for storing files larger than 16MB', hi: '16MB se badi files rakhne ka ek tareeka' },
      body: {
        en: 'GridFS splits a file into chunks of 255KB and stores them in two collections — fs.files for the metadata and fs.chunks for the data. The driver reassembles them, so you get a stream in and a stream out.',
        hi: 'GridFS file ko 255KB ke chunks mein baant kar do collections mein rakhta hai — metadata ke liye fs.files aur data ke liye fs.chunks. Driver unhe jod deta hai, toh tumhe andar aur bahar dono taraf stream milti hai.',
      },
      code: `const bucket = new GridFSBucket(db);
fs.createReadStream('big.mp4').pipe(bucket.openUploadStream('big.mp4'));
bucket.openDownloadStreamByName('big.mp4').pipe(res);`,
    },
    {
      heading: { en: 'It is a driver convention, not a server feature', hi: 'Ye driver ka riwaaj hai, server ka feature nahi' },
      body: {
        en: 'Worth knowing. The server has no idea about GridFS — it just sees two ordinary collections. All the chunking and reassembly happens in the driver, which is why you can inspect the chunks yourself.',
        hi: 'Ye jaanna kaam ka hai. Server ko GridFS ka pata hi nahi — usse bas do aam collections dikhte hain. Saara chunking aur jodna driver mein hota hai, isiliye tum chunks khud dekh sakte ho.',
      },
    },
    {
      heading: { en: 'What it genuinely gives you', hi: 'Ye sach mein kya deta hai' },
      body: {
        en: 'Range reads, so you can seek into the middle of a video without downloading it all. Metadata queryable alongside the file. And the file participates in your backups and replication automatically, with no second system to keep in sync.',
        hi: 'Range reads, toh tum poora download kiye bina video ke beech mein ja sakte ho. File ke saath queryable metadata. Aur file apne aap tumhare backups aur replication mein aa jaati hai, kisi doosre system ko synced rakhne ki zaroorat nahi.',
      },
    },
    {
      heading: { en: 'And why you usually should not use it', hi: 'Aur isse aam taur pe kyun nahi use karna chahiye' },
      body: {
        en: 'Object storage is cheaper, serves files over a CDN, and does not put your file bytes in the same working set as your query data. Storing a large file in Mongo evicts useful documents from the cache, which slows every query.',
        hi: 'Object storage sasta hai, files CDN se deta hai, aur tumhari file ke bytes ko query data ke usi working set mein nahi daalta. Badi file Mongo mein rakhna cache se kaam ke documents hata deta hai, jo har query dheemi kar deta hai.',
      },
    },
    {
      heading: { en: 'The rule to state', hi: 'Batane laayak rule' },
      body: {
        en: '"GridFS when a file must live in the database — a strict single-datastore requirement, or backups and access control that must be unified. Otherwise S3 or equivalent, with only the key and metadata in Mongo. That is the default I would reach for."',
        hi: '"GridFS tab jab file database mein hi honi chahiye — sakht ek-hi-datastore ki shart, ya backups aur access control ek jagah rakhne ki zaroorat. Warna S3 ya waisa kuch, aur Mongo mein sirf key aur metadata. Main default yahi uthaunga."',
      },
    },
  ],

  'What is the bucket pattern in MongoDB?': [
    {
      heading: { en: 'Group many small entries into one document', hi: 'Kai chhoti entries ko ek document mein group karo' },
      body: {
        en: 'Instead of one document per event, store a capped batch of events in a single document — a hundred sensor readings, or one bucket per device per hour. It sits between one-document-per-event and one-unbounded-array.',
        hi: 'Har event ka alag document banane ki jagah, kai events ek document mein seema ke saath rakho — sau sensor readings, ya har device ke har ghante ka ek bucket. Ye har-event-ka-document aur ek-bina-seema-array ke beech ka raasta hai.',
      },
      code: `{ deviceId: 'd1', hour: '2026-08-20T14',
  count: 100, sum: 2140,
  readings: [ { t: 0, v: 21 }, { t: 60, v: 22 }, … ] }`,
    },
    {
      heading: { en: 'The problem it solves at both ends', hi: 'Ye dono taraf ki problem hal karta hai' },
      body: {
        en: 'One document per reading gives you millions of documents, each with its own _id index entry and per-document overhead. One document per device gives you an array that grows past 16MB. Bucketing avoids both.',
        hi: 'Har reading ka ek document matlab laakhon documents, har ek ki apni _id index entry aur apna kharcha. Har device ka ek document matlab array jo 16MB paar kar jaata hai. Bucketing dono se bacha leta hai.',
      },
      diagram: `one per reading    1,000,000 docs, huge index
one per device     one doc, unbounded array → fails
one per hour       ~24,000 docs, each bounded   ✓`,
    },
    {
      heading: { en: 'Store the aggregates on the bucket', hi: 'Bucket pe hi aggregates rakho' },
      body: {
        en: 'The real win. Keep count, sum, min and max on the bucket document and update them as you push. A dashboard reads the precomputed values instead of aggregating a million readings on every request.',
        hi: 'Asli fayda yahi hai. count, sum, min aur max bucket document pe rakho aur push karte waqt unhe update karo. Dashboard har request pe das lakh readings jodne ki jagah pehle se bane hue aankde padh leta hai.',
      },
      code: `{ $push: { readings: r }, $inc: { count: 1, sum: r.v },
  $min: { min: r.v }, $max: { max: r.v } }`,
    },
    {
      heading: { en: 'Write with an upsert so the bucket appears on demand', hi: 'Upsert se likho taaki bucket zaroorat pe bane' },
      body: {
        en: 'Filter on the bucket key — device plus hour — with upsert true. The first reading of the hour creates the bucket and every later one appends. No separate creation step, and it is atomic.',
        hi: 'Bucket ki key pe filter karo — device aur hour — upsert true ke saath. Us ghante ki pehli reading bucket bana deti hai aur baaki jodti jaati hain. Alag se banane ka koi step nahi, aur ye atomic hai.',
      },
      code: `updateOne({ deviceId, hour }, { $push: … }, { upsert: true });`,
    },
    {
      heading: { en: 'Cap the array as well as the time', hi: 'Samay ke saath array bhi seemit karo' },
      body: {
        en: 'A time bucket alone is not a guarantee — a burst can put a hundred thousand readings in one hour. Use $slice to cap the array, or include a sequence number in the bucket key so a full bucket rolls over.',
        hi: 'Sirf samay ka bucket guarantee nahi hai — koi lehar ek ghante mein ek laakh readings daal sakti hai. Array seemit karne ko $slice lo, ya bucket ki key mein ek sequence number rakho taaki bhara bucket agle pe chala jaaye.',
      },
    },
    {
      heading: { en: 'Where it applies', hi: 'Ye kahan lagta hai' },
      body: {
        en: 'Time-series and IoT readings, per-user activity logs, analytics events, chat messages by conversation and hour. Anything append-only, read as a range, and high volume. Note MongoDB 5.0 added native time-series collections, which do this for you.',
        hi: 'Time-series aur IoT readings, har user ke activity logs, analytics events, conversation aur ghante ke hisaab se chat messages. Har wo cheez jo sirf judti hai, range mein padhi jaati hai, aur zyada maatra mein hai. Dhyaan do MongoDB 5.0 mein native time-series collections aaye, jo ye tumhare liye karte hain.',
      },
    },
  ],

  'How do you model a many-to-many relationship in MongoDB?': [
    {
      heading: { en: 'Three options, chosen by cardinality', hi: 'Teen vikalp, cardinality se chune hue' },
      body: {
        en: 'An array of references on one side, arrays on both sides, or a separate join collection. Which one is right depends entirely on how many items each side holds and how you query it.',
        hi: 'Ek taraf references ka array, dono taraf arrays, ya ek alag join collection. Kaunsa sahi hai ye poori tarah is baat pe hai ki har taraf kitne items hain aur tum query kaise karte ho.',
      },
      diagram: `few ↔ few        array on one side
few ↔ many       array on the "few" side only
many ↔ many      a separate join collection`,
    },
    {
      heading: { en: 'One-sided array is usually right', hi: 'Aam taur pe ek taraf ka array sahi hai' },
      body: {
        en: 'A post holds an array of tag ids. Tags do not hold post ids, because that array would be unbounded. Put the array on whichever side is bounded, and query the other direction with an index.',
        hi: 'Post tag ids ka array rakhta hai. Tags post ids nahi rakhte, kyunki wo array bina seema hoga. Array us taraf rakho jo seemit hai, aur doosri disha index se query karo.',
      },
      code: `{ _id, title, tagIds: [ ObjectId, ObjectId ] }
db.posts.createIndex({ tagIds: 1 });      // multikey — find posts by tag`,
    },
    {
      heading: { en: 'Two-sided arrays are a consistency trap', hi: 'Dono taraf arrays consistency ka jaal hain' },
      body: {
        en: 'Storing the relationship on both sides means every change is two writes that can diverge — and without a transaction they will, eventually. Only do it when reads in both directions are hot and you accept the maintenance.',
        hi: 'Rishta dono taraf rakhna matlab har badlaav do writes hai jo alag ho sakti hain — aur bina transaction ke kabhi na kabhi hongi. Ye tabhi karo jab dono dishaon ke reads garam hon aur tum ye rakh-rakhaav maano.',
      },
    },
    {
      heading: { en: 'A join collection when the link carries data', hi: 'Jab rishte pe khud data ho tab join collection' },
      body: {
        en: 'Enrolment in a course has a date, a grade, a status. That belongs on the relationship, not on either side, so it needs its own collection — the same reasoning as a join table with columns in SQL.',
        hi: 'Kisi course mein enrolment pe date, grade, status hote hain. Wo rishte pe hain, kisi ek taraf nahi, toh unka apna collection chahiye — SQL mein columns wale join table ka wahi tark.',
      },
      code: `{ _id, studentId, courseId, enrolledAt, grade }
createIndex({ studentId: 1, courseId: 1 }, { unique: true });
createIndex({ courseId: 1 });      // ✓ index both directions`,
    },
    {
      heading: { en: 'Index both directions of a join collection', hi: 'Join collection ki dono dishaayein index karo' },
      body: {
        en: 'The mistake people make. An index on studentId serves "courses for a student" and does nothing for "students in a course". You need both, and the compound one should be unique to prevent duplicate links.',
        hi: 'Log yahi galti karte hain. studentId ka index "student ke courses" sambhaalta hai aur "course ke students" ke liye kuch nahi karta. Dono chahiye, aur compound wala unique hona chahiye taaki dohre link na banein.',
      },
    },
    {
      heading: { en: 'And denormalise what you always display', hi: 'Aur jo hamesha dikhate ho usse denormalise karo' },
      body: {
        en: 'If a course list always shows the course title, store the title on the enrolment alongside the id. One read instead of two, at the cost of updating the copies when a title changes — which is rare.',
        hi: 'Agar course list mein hamesha course ka title dikhta hai, toh id ke saath title bhi enrolment pe rakh do. Do ki jagah ek read, aur keemat ye ki title badalne pe copies badalni padengi — jo kam hi hota hai.',
      },
    },
  ],

  'What is the difference between $set and $push?': [
    {
      heading: { en: 'One assigns a field, the other appends to an array', hi: 'Ek field set karta hai, doosra array mein jodta hai' },
      body: {
        en: '$set writes a value to a field, creating it if it does not exist and replacing it if it does. $push appends an element to an array field, creating the array if it is missing.',
        hi: '$set kisi field mein value likhta hai, na ho toh bana deta hai aur ho toh badal deta hai. $push array field mein ek element jodta hai, array na ho toh bana deta hai.',
      },
      code: `{ $set: { name: 'Asha' } }              // name = 'Asha'
{ $push: { tags: 'new' } }               // tags gets one more element`,
    },
    {
      heading: { en: '$set on an array replaces the whole thing', hi: 'Array pe $set poora badal deta hai' },
      body: {
        en: 'The mistake worth demonstrating. Using $set to add to an array overwrites every existing element with the new value, silently losing the rest.',
        hi: 'Dikhane laayak galti. Array mein jodne ke liye $set use karo toh har maujooda element nayi value se badal jaata hai, aur baaki chup-chaap kho jaata hai.',
      },
      code: `{ $set: { tags: ['new'] } }      // ✗ tags is now exactly ['new']
{ $push: { tags: 'new' } }        // ✓ appends`,
    },
    {
      heading: { en: '$push has modifiers that matter', hi: '$push ke modifiers maayne rakhte hain' },
      body: {
        en: '$each pushes several at once, $slice caps the array length, $sort orders it and $position inserts at an index. $slice with a negative number is how you keep the last N and prevent unbounded growth.',
        hi: '$each ek saath kai jodta hai, $slice array ki lambai seemit karta hai, $sort usse kramwar karta hai aur $position kisi index pe daalta hai. Negative number wala $slice aakhri N rakhta hai aur bina seema badhne se rokta hai.',
      },
      code: `{ $push: { recent: { $each: [item], $slice: -50, $sort: { at: -1 } } } }`,
    },
    {
      heading: { en: '$push versus $addToSet', hi: '$push vs $addToSet' },
      body: {
        en: 'The follow-up. $push always appends, so pushing the same value twice gives you a duplicate. $addToSet only adds if the value is not already present, which is what you want for a tag list or a set of ids.',
        hi: 'Follow-up. $push hamesha jodta hai, toh wahi value do baar push karo toh duplicate ban jaata hai. $addToSet tabhi jodta hai jab value pehle se na ho, aur tag list ya ids ke set ke liye yahi chahiye.',
      },
      code: `{ $addToSet: { tags: 'node' } }      // ✓ no duplicate`,
    },
    {
      heading: { en: 'Both are atomic, and you can combine them', hi: 'Dono atomic hain, aur inhe saath use kar sakte ho' },
      body: {
        en: 'A single update can $set one field and $push to another, and the whole operation is atomic on that document. That is why you rarely need a transaction for a change that touches one record.',
        hi: 'Ek hi update ek field pe $set aur doosre pe $push kar sakta hai, aur poora operation us document pe atomic hai. Isiliye ek record ko chhoone wale badlaav ke liye transaction shaayad hi chahiye hota hai.',
      },
      code: `{ $set: { updatedAt: new Date() }, $push: { history: entry } }`,
    },
    {
      heading: { en: 'And the related operators', hi: 'Aur jude hue operators' },
      body: {
        en: '$pull removes matching elements, $pop removes from either end, $inc changes a number, and $unset deletes a field entirely. Knowing $pull in particular avoids reading the array into Node just to filter it.',
        hi: '$pull matching elements hataata hai, $pop kisi bhi sire se hataata hai, $inc number badalta hai, aur $unset field poori tarah mita deta hai. Khaas kar $pull jaan lo toh array ko sirf filter karne ke liye Node mein laana nahi padta.',
      },
      code: `{ $pull: { tags: 'old' } }
{ $unset: { legacyField: '' } }`,
    },
  ],

  'How do you implement pagination in MongoDB?': [
    {
      heading: { en: 'Skip and limit is the obvious answer', hi: 'Saaf jawab skip aur limit hai' },
      body: {
        en: 'It is simple, it gives you page numbers, and it is fine for a small, stable collection. It is also the answer that shows you have not paginated a large collection.',
        hi: 'Ye simple hai, page numbers deta hai, aur chhote, sthir collection ke liye theek hai. Aur yahi jawab dikhata hai ki tumne bada collection paginate nahi kiya.',
      },
      code: `db.posts.find().sort({ createdAt: -1 })
  .skip((page - 1) * limit).limit(limit);`,
    },
    {
      heading: { en: 'Skip gets slower as the page number grows', hi: 'Page number badhne pe skip dheema hota jaata hai' },
      body: {
        en: 'The database still walks and discards every skipped document, so page 5000 reads a hundred thousand rows to return twenty. An index does not help — it still has to count through them.',
        hi: 'Database har chhode gaye document pe chal kar usse phenkta hai, toh page 5000 bees dene ke liye ek laakh rows padhta hai. Index se fayda nahi — usse phir bhi ginte hue jaana padta hai.',
      },
    },
    {
      heading: { en: 'And it is incorrect on changing data', hi: 'Aur badalte data pe ye galat hai' },
      body: {
        en: 'The bug people do not notice. If a document is inserted between page one and page two, everything shifts by one and the user sees the same item twice, or never sees one. On a feed sorted by newest, this happens constantly.',
        hi: 'Wo bug jo log dekh nahi paate. Page ek aur do ke beech koi document jud jaaye toh sab ek se khisak jaata hai aur user ek hi item do baar dekhta hai, ya ek kabhi nahi. Naye se purane wale feed pe ye lagataar hota hai.',
      },
      diagram: `page 1: [10 9 8]     ← a new item 11 arrives
page 2: [8 7 6]       ← 8 appears twice`,
    },
    {
      heading: { en: 'Cursor pagination fixes both', hi: 'Cursor pagination dono theek karta hai' },
      body: {
        en: 'Remember where the last page ended and filter from there. A range query on an indexed field is fast at any depth, and inserting a document does not shift the pages already served.',
        hi: 'Yaad rakho pichhla page kahan khatam hua aur wahin se filter karo. Index wale field pe range query har gehraai pe tez hai, aur naya document judne se pehle diye gaye pages khisakte nahi.',
      },
      code: `db.posts.find({ _id: { $lt: cursor } })
  .sort({ _id: -1 }).limit(limit + 1);

const hasMore = docs.length > limit;
res.json({ items: docs.slice(0, limit),
           nextCursor: hasMore ? docs[limit - 1]._id : null });`,
    },
    {
      heading: { en: 'Sort on something unique, or add a tiebreaker', hi: 'Unique cheez pe sort karo, ya tiebreaker jodo' },
      body: {
        en: 'Paginating on createdAt alone silently skips or repeats documents that share a timestamp. Use a compound cursor — the sort field plus _id — and a matching compound index.',
        hi: 'Sirf createdAt pe pagination un documents ko chup-chaap chhod ya dohra deta hai jinka timestamp same hai. Compound cursor lo — sort field aur _id — aur usse milta compound index.',
      },
      code: `{ $or: [ { createdAt: { $lt: c.at } },
          { createdAt: c.at, _id: { $lt: c.id } } ] }`,
    },
    {
      heading: { en: 'The total count is often the expensive part', hi: 'Aksar mehnga hissa kul ginti hoti hai' },
      body: {
        en: 'countDocuments scans to count, which on a large collection costs more than the page. Return hasMore instead, use estimatedDocumentCount for an approximate total, or fetch both in one round trip with $facet.',
        hi: 'countDocuments ginne ke liye scan karta hai, jo bade collection pe page se zyada mehnga hai. Uski jagah hasMore do, andaazan kul ke liye estimatedDocumentCount lo, ya $facet se ek hi round trip mein dono le aao.',
      },
      code: `{ $facet: { data: [{ $limit: 20 }], total: [{ $count: 'n' }] } }`,
    },
    {
      heading: { en: 'The rule', hi: 'Rule' },
      body: {
        en: '"Skip and limit for an admin table where page numbers matter and the collection is small. Cursor pagination for a feed, an infinite scroll or anything large — it is correct under concurrent writes and constant time at any depth."',
        hi: '"Admin table ke liye skip aur limit, jahan page numbers maayne rakhte hon aur collection chhota ho. Feed, infinite scroll ya kisi bade data ke liye cursor pagination — wo saath chalte writes mein bhi sahi hai aur har gehraai pe ek jaisa tez."',
      },
    },
  ],

  'What is the working set and why does it matter for MongoDB performance?': [
    {
      heading: { en: 'The data your queries actually touch', hi: 'Wo data jise tumhari queries sach mein chhooti hain' },
      body: {
        en: 'The working set is the indexes plus the documents accessed regularly — not the whole database. If it fits in RAM, MongoDB serves almost everything from the WiredTiger cache. If it does not, every query goes to disk.',
        hi: 'Working set matlab indexes aur wo documents jinhe niyamit access kiya jaata hai — poora database nahi. Wo RAM mein sama jaaye toh MongoDB lagbhag sab kuch WiredTiger cache se deta hai. Na samaaye toh har query disk pe jaati hai.',
      },
      diagram: `RAM  [ indexes + hot documents ]   ← the working set
disk [ everything else            ]

fits    → cache hits, microseconds
does not → page faults, milliseconds — 1000× slower`,
    },
    {
      heading: { en: 'It is the sharpest performance cliff there is', hi: 'Performance ki sabse tez dhalaan yahi hai' },
      body: {
        en: 'The behaviour is not gradual. While the working set fits, everything is fast. The moment it exceeds RAM, latency jumps by orders of magnitude — which is why a database that was fine for months degrades suddenly with no code change.',
        hi: 'Ye vyavhaar dhire-dhire nahi badalta. Jab tak working set samaata hai, sab tez hai. RAM paar hote hi latency kai guna badh jaati hai — isiliye mahinon theek chala database bina code badle achanak kharaab ho jaata hai.',
      },
    },
    {
      heading: { en: 'Indexes are usually the bigger half', hi: 'Aksar bada hissa indexes ka hota hai' },
      body: {
        en: 'An index must be in memory to be fast, and index size grows with the collection. Ten indexes on a large collection can exceed the document data itself, which is a concrete reason to drop unused ones.',
        hi: 'Index tez hone ke liye memory mein hona chahiye, aur uska size collection ke saath badhta hai. Bade collection pe das indexes khud documents ke data se zyada ho sakte hain, aur bekaar wale hataane ki thos wajah yahi hai.',
      },
      code: `db.collection.stats().indexSizes;      // per-index size in bytes`,
    },
    {
      heading: { en: 'Measure the cache hit ratio', hi: 'Cache hit ratio naapo' },
      body: {
        en: 'The number that tells you where you are. WiredTiger reports pages read into the cache versus pages requested. A rising read rate means the working set no longer fits, and it is the metric to alert on.',
        hi: 'Ye aankda batata hai tum kahan ho. WiredTiger cache mein padhi gayi pages aur maangi gayi pages batata hai. Badhta read rate matlab working set ab nahi samaata, aur alert isi metric pe lagana chahiye.',
      },
      code: `db.serverStatus().wiredTiger.cache;`,
    },
    {
      heading: { en: 'What to do when it stops fitting', hi: 'Jab samaana band ho jaaye tab kya karein' },
      body: {
        en: 'Add RAM, which is the direct answer. Drop unused indexes. Archive or TTL old data so the hot set shrinks. Project fewer fields so less is pulled in. And if none of that is enough, shard so each machine holds a smaller slice.',
        hi: 'RAM badhao, ye seedha jawab hai. Bekaar indexes hatao. Purana data archive ya TTL karo taaki garam hissa chhota ho. Kam fields project karo taaki kam data aaye. Aur itna bhi kaafi na ho toh shard karo taaki har machine chhota hissa rakhe.',
      },
    },
    {
      heading: { en: 'And it explains the modelling advice', hi: 'Aur isse modelling wali salaah samajh aati hai' },
      body: {
        en: 'This is why large documents hurt. Reading one 2MB document to use two fields pulls 2MB into the cache and evicts something useful. Keeping documents small is a working-set decision as much as a 16MB one.',
        hi: 'Isiliye bade documents nuksaan karte hain. Do fields ke liye 2MB ka document padhna cache mein 2MB laata hai aur kuch kaam ki cheez hata deta hai. Documents chhote rakhna 16MB jitna hi working-set ka faisla hai.',
      },
    },
  ],

  'What are capped collections?': [
    {
      heading: { en: 'A fixed-size collection that overwrites the oldest', hi: 'Tay size ka collection jo sabse purane pe likh deta hai' },
      body: {
        en: 'You declare a maximum size in bytes and optionally a maximum document count. Once full, each insert overwrites the oldest document. It is a circular buffer stored in the database.',
        hi: 'Tum bytes mein adhiktam size batate ho aur chaaho toh documents ki adhiktam ginti bhi. Bhar jaane ke baad har insert sabse purane document pe likh deta hai. Ye database mein rakha ek circular buffer hai.',
      },
      code: `db.createCollection('logs', { capped: true, size: 100_000_000, max: 50_000 });`,
    },
    {
      heading: { en: 'Insertion order is guaranteed', hi: 'Insertion order guarantee hai' },
      body: {
        en: 'Documents are stored in the order they were inserted and can be read back in that order with no index and no sort. That natural ordering is the property the oplog relies on.',
        hi: 'Documents usi kram mein rakhe jaate hain jisme daale gaye aur bina index aur bina sort usi kram mein padhe ja sakte hain. Oplog isi swabhavik kram pe nirbhar hai.',
      },
      code: `db.logs.find().sort({ $natural: -1 }).limit(10);   // newest, no index`,
    },
    {
      heading: { en: 'The restrictions', hi: 'Rok-tok' },
      body: {
        en: 'You cannot delete a single document, and you cannot grow one — an update that would make it larger fails. You also cannot shard a capped collection. Those constraints are what let it be fast and ordered.',
        hi: 'Tum ek document delete nahi kar sakte, aur usse bada nahi kar sakte — jo update usse bada kare wo fail ho jaata hai. Capped collection shard bhi nahi ho sakta. Yahi bandhan usse tez aur kramwar banate hain.',
      },
    },
    {
      heading: { en: 'Tailable cursors are the interesting feature', hi: 'Dilchasp feature tailable cursors hain' },
      body: {
        en: 'A tailable cursor stays open at the end of the collection and returns new documents as they are inserted, like tail -f. That is exactly how a secondary follows the oplog.',
        hi: 'Tailable cursor collection ke ant pe khula rehta hai aur naye documents aate hi deta hai, bilkul tail -f ki tarah. Secondary oplog ko isi tarah follow karta hai.',
      },
    },
    {
      heading: { en: 'Prefer a TTL index in application code', hi: 'Application code mein TTL index behtar hai' },
      body: {
        en: 'The honest recommendation. A TTL index expires by age rather than by size, allows deletes and updates, can be sharded, and is easier to reason about. Capped collections are mostly an internal mechanism now.',
        hi: 'Imaandaar salaah. TTL index size ki jagah umar se expire karta hai, deletes aur updates deta hai, shard ho sakta hai, aur samajhna aasaan hai. Capped collections ab zyadatar andar ka mechanism hain.',
      },
      code: `db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 604800 });`,
    },
    {
      heading: { en: 'Where you already rely on one', hi: 'Tum pehle se kahan ispe nirbhar ho' },
      body: {
        en: 'The oplog is a capped collection, and so is the profiler output. Knowing that connects this question to replication and to the oplog window, which is the more interesting territory.',
        hi: 'Oplog ek capped collection hai, aur profiler ka output bhi. Ye jaanna is sawaal ko replication aur oplog window se jodta hai, jo zyada dilchasp ilaaka hai.',
      },
    },
  ],

  'How do you back up and restore a MongoDB database?': [
    {
      heading: { en: 'Three levels, by size and downtime tolerance', hi: 'Teen star, size aur downtime ke hisaab se' },
      body: {
        en: 'mongodump and mongorestore for a small database. A filesystem or volume snapshot for a large one. And continuous backup with point-in-time recovery for anything where losing an hour is unacceptable.',
        hi: 'Chhote database ke liye mongodump aur mongorestore. Bade ke liye filesystem ya volume ka snapshot. Aur jahan ek ghanta khona bhi manzoor na ho wahan point-in-time recovery wala continuous backup.',
      },
      diagram: `mongodump      logical, portable, slow on large data
snapshot       physical, fast, must be consistent
oplog / PITR   continuous, restore to any second`,
    },
    {
      heading: { en: 'mongodump is logical and portable', hi: 'mongodump logical aur portable hai' },
      body: {
        en: 'It reads documents through the normal query path and writes BSON, so the output restores into a different version or a different topology. That flexibility is also why it is slow and puts load on the server.',
        hi: 'Wo documents ko aam query raaste se padhta hai aur BSON likhta hai, toh output kisi doosre version ya doosri topology mein restore ho jaata hai. Yahi lachak uske dheema hone aur server pe bojh daalne ki wajah bhi hai.',
      },
      code: `mongodump --uri="$URI" --archive=dump.gz --gzip
mongorestore --uri="$URI" --archive=dump.gz --gzip --drop`,
    },
    {
      heading: { en: 'A snapshot must be consistent', hi: 'Snapshot consistent hona chahiye' },
      body: {
        en: 'The detail that makes or breaks it. Copying the data files of a running server gives you a torn, unusable backup unless the snapshot is atomic across all volumes. Use a filesystem or cloud snapshot that guarantees that, or fsyncLock first.',
        hi: 'Yahi baat isse bana ya bigaad deti hai. Chal rahe server ki data files copy karna ek toota hua, bekaar backup deta hai jab tak snapshot saare volumes pe atomic na ho. Aisa filesystem ya cloud snapshot lo jo ye guarantee de, ya pehle fsyncLock karo.',
      },
    },
    {
      heading: { en: 'Point-in-time recovery uses the oplog', hi: 'Point-in-time recovery oplog use karta hai' },
      body: {
        en: 'Restore the last snapshot, then replay the oplog up to the moment before the mistake. This is the only approach that lets you recover from an accidental delete rather than a hardware failure.',
        hi: 'Aakhri snapshot restore karo, phir oplog ko galti se theek pehle tak dohrao. Sirf yahi tareeka hardware ki kharaabi nahi, galti se hue delete se bachne deta hai.',
      },
    },
    {
      heading: { en: 'Replication is not a backup', hi: 'Replication backup nahi hai' },
      body: {
        en: 'The most important sentence in the answer. A DROP replicates to every secondary in milliseconds. Replicas protect against a node failing; only a backup protects against a mistake or a bad deploy.',
        hi: 'Jawab ka sabse zaroori vaakya. DROP milliseconds mein har secondary tak pahunch jaata hai. Replicas node ke fail hone se bachaate hain; galti ya kharaab deploy se sirf backup bachaata hai.',
      },
    },
    {
      heading: { en: 'And an untested backup is not a backup', hi: 'Aur bina test kiya backup, backup nahi hai' },
      body: {
        en: 'Restore into a staging environment on a schedule and verify the data. Measure how long it takes, because your recovery time objective is a number you must actually know rather than assume.',
        hi: 'Tay samay pe staging mein restore karo aur data jaancho. Kitna samay lagta hai wo naapo, kyunki recovery time objective wo aankda hai jo tumhe sach mein pata hona chahiye, maan kar chalna nahi.',
      },
    },
  ],

  'What is the difference between MongoDB Atlas and self-hosted MongoDB?': [
    {
      heading: { en: 'Managed service versus running it yourself', hi: 'Managed service vs khud chalana' },
      body: {
        en: 'Atlas is MongoDB\'s hosted offering: provisioning, patching, backups, monitoring and scaling are handled for you. Self-hosted means you own all of that on your own machines or cloud instances.',
        hi: 'Atlas MongoDB ki apni hosted service hai: provisioning, patching, backups, monitoring aur scaling wo sambhaalte hain. Self-hosted matlab ye sab tum apni machines ya cloud instances pe khud karte ho.',
      },
    },
    {
      heading: { en: 'What Atlas actually removes', hi: 'Atlas asal mein kya hataata hai' },
      body: {
        en: 'Configuring a replica set, setting up automated backups with point-in-time recovery, applying security patches, provisioning monitoring and alerting, and doing a version upgrade without downtime. Each is a day of work and an ongoing responsibility.',
        hi: 'Replica set set karna, point-in-time recovery wale apne aap chalne wale backups lagana, security patches lagana, monitoring aur alerting khada karna, aur bina downtime version upgrade karna. Har ek din bhar ka kaam aur lagataar chalti zimmedaari hai.',
      },
    },
    {
      heading: { en: 'And what it adds', hi: 'Aur ye kya jodta hai' },
      body: {
        en: 'Atlas Search built on Lucene, which is far better than MongoDB text indexes. A performance advisor that suggests indexes from real query patterns. Serverless and auto-scaling tiers. And a query profiler that is genuinely good.',
        hi: 'Lucene pe bana Atlas Search, jo MongoDB ke text indexes se kahin behtar hai. Ek performance advisor jo asli query patterns se indexes sujhaata hai. Serverless aur auto-scaling tiers. Aur ek query profiler jo sach mein achha hai.',
      },
    },
    {
      heading: { en: 'The trade-offs to name', hi: 'Batane laayak sauday' },
      body: {
        en: 'Cost — at scale, self-hosting on your own instances is cheaper. Control — you cannot set every server parameter or install an arbitrary extension. And lock-in, though the data itself is portable with mongodump.',
        hi: 'Keemat — bade paimane pe apni instances pe khud host karna sasta hai. Control — tum har server parameter set nahi kar sakte ya koi bhi extension nahi laga sakte. Aur lock-in, waise data khud mongodump se portable hai.',
      },
    },
    {
      heading: { en: 'When self-hosting is right', hi: 'Khud host karna kab sahi hai' },
      body: {
        en: 'A regulatory requirement that the data stays on specific infrastructure. An existing platform team who already run databases. Or a scale where the managed premium is a large enough number to justify the headcount.',
        hi: 'Koi niyam jo kahe data khaas infrastructure pe hi rahe. Aisi platform team jo pehle se databases chalati ho. Ya itna bada paimana ki managed ka extra kharcha ek poore aadmi ki tankhwah se zyada ho.',
      },
    },
    {
      heading: { en: 'The judgement to state', hi: 'Batane laayak faisla' },
      body: {
        en: '"Atlas unless there is a specific reason not to. Running a replica set correctly — backups, monitoring, patching, failover testing — is real ongoing work, and for most teams that time is better spent on the product than on database operations."',
        hi: '"Atlas, jab tak koi khaas wajah na ho. Replica set theek se chalana — backups, monitoring, patching, failover testing — asli lagataar kaam hai, aur zyadatar teams ke liye wo samay database operations se zyada product pe lagna behtar hai."',
      },
    },
  ],

  'How do you enforce schema validation in MongoDB?': [
    {
      heading: { en: 'Two places, and they are not the same', hi: 'Do jagah, aur wo ek nahi hain' },
      body: {
        en: 'Application-level with Mongoose or Zod, and database-level with JSON Schema on the collection. The first is convenient; only the second cannot be bypassed.',
        hi: 'Application star pe Mongoose ya Zod se, aur database star pe collection pe JSON Schema se. Pehla suvidhajanak hai; sirf doosre ko bypass nahi kiya ja sakta.',
      },
    },
    {
      heading: { en: 'Why application validation is not enough', hi: 'Application ki validation kaafi kyun nahi' },
      body: {
        en: 'It only applies to writes that go through your code. The mongo shell, a migration script, another service or a background job all write directly to the collection and see no schema at all.',
        hi: 'Wo sirf un writes pe lagti hai jo tumhare code se guzarti hain. mongo shell, koi migration script, koi doosri service ya koi background job — sab seedha collection mein likhte hain aur unhe koi schema dikhta hi nahi.',
      },
    },
    {
      heading: { en: 'JSON Schema validation on the collection', hi: 'Collection pe JSON Schema validation' },
      body: {
        en: 'Declare required fields, types and constraints in the collection options and the server rejects a non-conforming write regardless of who sent it. This is the database-level guarantee.',
        hi: 'Collection ke options mein zaroori fields, types aur bandhan batao aur server niyam na maanne wali write mana kar deta hai, chahe kisne bheji ho. Ye database star ki guarantee hai.',
      },
      code: `db.createCollection('users', {
  validator: { $jsonSchema: {
    bsonType: 'object',
    required: ['email', 'createdAt'],
    properties: {
      email: { bsonType: 'string', pattern: '^.+@.+$' },
      age: { bsonType: 'int', minimum: 13 },
    },
  } },
  validationLevel: 'strict',
  validationAction: 'error',
});`,
    },
    {
      heading: { en: 'The two options that matter', hi: 'Do options jo maayne rakhte hain' },
      body: {
        en: 'validationLevel strict checks every write; moderate checks only documents that already conform, which is how you add validation to an existing collection without breaking legacy documents. validationAction warn logs instead of rejecting.',
        hi: 'validationLevel strict har write jaanchta hai; moderate sirf un documents ko jo pehle se niyam maante hain, aur aise hi tum purane documents tode bina maujooda collection pe validation jodte ho. validationAction warn mana karne ki jagah log karta hai.',
      },
    },
    {
      heading: { en: 'Roll it out in warn mode first', hi: 'Pehle warn mode mein lagao' },
      body: {
        en: 'The practical migration path. Add the validator with action warn, watch the logs to see what already violates it, fix the data, then switch to error. Going straight to strict on a live collection breaks writes you did not expect.',
        hi: 'Vyavharik raasta. Validator ko warn action ke saath jodo, logs dekho ki pehle se kya niyam tod raha hai, data theek karo, phir error pe jao. Live collection pe seedha strict karna un writes ko tod deta hai jinki tumne ummeed nahi ki thi.',
      },
    },
    {
      heading: { en: 'Use both layers', hi: 'Dono layers use karo' },
      body: {
        en: 'The application layer gives good error messages and catches problems before the round trip. The database layer is the guarantee nothing can bypass. They are complementary, and the right answer names both.',
        hi: 'Application layer achhe error messages deti hai aur round trip se pehle problem pakad leti hai. Database layer wo guarantee hai jise koi bypass nahi kar sakta. Ye ek doosre ke poorak hain, aur sahi jawab dono ka naam leta hai.',
      },
    },
  ],

  'What is connection pooling in the MongoDB driver?': [
    {
      heading: { en: 'A reusable set of open connections', hi: 'Khule connections ka ek dobara use hone wala samooh' },
      body: {
        en: 'Opening a connection means a TCP handshake, a TLS handshake and authentication — tens of milliseconds. The pool opens a set once and lends them out, so a query pays none of that cost.',
        hi: 'Connection kholna matlab TCP handshake, TLS handshake aur authentication — dus-bees millisecond. Pool ek baar kuch connections kholta hai aur udhaar deta hai, toh query ko ye keemat nahi chukani padti.',
      },
      diagram: `MongoClient
  └── pool  [ conn ][ conn ][ conn ]  … up to maxPoolSize
              borrowed and returned per operation`,
    },
    {
      heading: { en: 'The driver does this for you', hi: 'Driver ye tumhare liye karta hai' },
      body: {
        en: 'One MongoClient owns one pool, defaulting to a hundred connections. You never manage a connection yourself — you create the client once and share it. There is nothing to check out and nothing to release.',
        hi: 'Ek MongoClient ek pool rakhta hai, default sau connections. Tum kabhi khud koi connection nahi sambhaalte — tum client ek baar banate ho aur usse share karte ho. Na kuch lena hai na chhodna.',
      },
      code: `const client = new MongoClient(uri, { maxPoolSize: 20, minPoolSize: 5 });
await client.connect();
export const db = client.db();      // ✓ one client, shared everywhere`,
    },
    {
      heading: { en: 'Creating a client per request destroys it', hi: 'Har request pe client banana isse tod deta hai' },
      body: {
        en: 'The classic bug. Each new MongoClient opens its own pool, and nothing closes them, so the app exhausts the server\'s connection limit within minutes under load. Connect once at startup.',
        hi: 'Classic bug. Har naya MongoClient apna pool kholta hai, aur unhe koi band nahi karta, toh load mein app minton mein server ki connection seema khatam kar deta hai. Shuruaat mein ek baar judo.',
      },
    },
    {
      heading: { en: 'Sizing it is a real decision', hi: 'Iska size tay karna asli faisla hai' },
      body: {
        en: 'Too small and requests queue waiting for a connection, which shows up as latency with an idle database. Too large across many instances and you exhaust the server limit — ten instances at a hundred each is a thousand connections.',
        hi: 'Bahut chhota ho toh requests connection ke liye line mein lagti hain, jo khaali database ke saath latency ban kar dikhta hai. Kai instances pe bahut bada ho toh server ki seema khatam ho jaati hai — das instances, har ek sau ka, matlab hazaar connections.',
      },
    },
    {
      heading: { en: 'Watch the wait queue, not the pool size', hi: 'Pool size nahi, wait queue dekho' },
      body: {
        en: 'The metric that tells you the truth. If operations are waiting to check out a connection, the pool is too small or a query is holding one too long. The driver emits pool events you can log.',
        hi: 'Ye metric sach bataata hai. Agar operations connection lene ke liye intezaar kar rahe hain, toh pool chhota hai ya koi query usse zyada der pakde hue hai. Driver pool ke events deta hai jinhe tum log kar sakte ho.',
      },
      code: `client.on('connectionCheckOutFailed', (e) => logger.warn(e));`,
    },
    {
      heading: { en: 'And serverless breaks the model', hi: 'Aur serverless is model ko tod deta hai' },
      body: {
        en: 'A function instance that connects on every invocation opens a pool per instance and exhausts the limit fast. Cache the client outside the handler so it survives a warm start, or put a proxy in front.',
        hi: 'Jo function instance har invocation pe judta hai wo har instance ka pool kholta hai aur seema jaldi khatam kar deta hai. Client ko handler ke bahar cache karo taaki warm start pe bacha rahe, ya aage ek proxy lagao.',
      },
      code: `let cached;
export async function handler() {
  cached ??= await new MongoClient(uri).connect();   // ✓ survives warm starts
}`,
    },
  ],

  'How do you handle concurrent updates safely in MongoDB?': [
    {
      heading: { en: 'Start with atomic operators', hi: 'Atomic operators se shuru karo' },
      body: {
        en: 'A single-document update is atomic, so $inc, $push and $set applied by the database are already safe under concurrency. Most concurrency bugs come from doing the arithmetic in Node instead.',
        hi: 'Ek document ka update atomic hai, toh database ke lagaye $inc, $push aur $set pehle se concurrency mein safe hain. Zyadatar concurrency ke bugs isliye aate hain ki ginti Node mein ki jaati hai.',
      },
      code: `const d = await coll.findOne({ _id });
await coll.updateOne({ _id }, { $set: { count: d.count + 1 } });   // ✗ lost update

await coll.updateOne({ _id }, { $inc: { count: 1 } });              // ✓ atomic`,
    },
    {
      heading: { en: 'The read-modify-write race', hi: 'Padho-badlo-likho wali race' },
      body: {
        en: 'Two requests read the same value, both add one, both write the same result — one increment is silently lost. It is the classic lost update, and it happens whenever the new value is computed from a value you read.',
        hi: 'Do requests wahi value padhti hain, dono ek jodti hain, dono wahi nateeja likhti hain — ek increment chup-chaap kho jaata hai. Ye classic lost update hai, aur jab bhi nayi value padhi hui value se banti hai tab hota hai.',
      },
    },
    {
      heading: { en: 'Optimistic concurrency when you must compute', hi: 'Jab ginna hi pade toh optimistic concurrency' },
      body: {
        en: 'When the new value cannot be expressed as an operator, include the version you read in the filter. If someone else updated in between, matchedCount is zero and you retry with fresh data.',
        hi: 'Jab nayi value kisi operator se nahi ban sakti, toh jo version tumne padha wo filter mein daalo. Beech mein kisi aur ne update kiya toh matchedCount zero hota hai aur tum taaza data ke saath dobara koshish karte ho.',
      },
      code: `const r = await coll.updateOne(
  { _id, version: doc.version },
  { $set: { …changes }, $inc: { version: 1 } }
);
if (r.matchedCount === 0) throw new ConflictError();   // retry`,
    },
    {
      heading: { en: 'findOneAndUpdate reads and writes in one step', hi: 'findOneAndUpdate ek hi kadam mein padhta aur likhta hai' },
      body: {
        en: 'It applies the update and returns the document atomically, which removes the gap between reading and writing. With returnDocument after, you get the new state — the right tool for claiming a job from a queue.',
        hi: 'Wo update lagata hai aur document atomically deta hai, jisse padhne aur likhne ke beech ka gap khatam ho jaata hai. returnDocument after ke saath nayi state milti hai — queue se job uthane ka sahi auzaar yahi hai.',
      },
      code: `await jobs.findOneAndUpdate(
  { status: 'pending' },
  { $set: { status: 'running', workerId } },
  { returnDocument: 'after' }
);      // ✓ only one worker can claim it`,
    },
    {
      heading: { en: 'A unique index prevents duplicate creation', hi: 'Unique index dohra banna rokta hai' },
      body: {
        en: 'Check-then-insert has the same race as read-modify-write: two requests both find nothing and both insert. A unique index makes the database reject the second, and you catch error code 11000.',
        hi: 'Pehle-jaancho-phir-insert mein wahi race hai jo padho-badlo-likho mein: dono requests ko kuch nahi milta aur dono insert kar deti hain. Unique index database se doosri ko mana karwaata hai, aur tum error code 11000 pakad lete ho.',
      },
    },
    {
      heading: { en: 'Transactions for multi-document invariants', hi: 'Kai documents ke niyamon ke liye transactions' },
      body: {
        en: 'When two documents must change together — a transfer between accounts — a transaction gives you all-or-nothing. Note it can abort with a write conflict, so it must be retried, which withTransaction does.',
        hi: 'Jab do documents saath badalne hi chahiye — accounts ke beech transfer — tab transaction sab-ya-kuch-nahi deta hai. Dhyaan do wo write conflict pe ruk sakta hai, toh dobara chalana padta hai, jo withTransaction karta hai.',
      },
    },
    {
      heading: { en: 'And prefer design over locking', hi: 'Aur locking se behtar design hai' },
      body: {
        en: 'The strongest answer. If the data that changes together lives in one document, single-document atomicity covers it and there is nothing to coordinate. Reaching for transactions or a distributed lock is usually a sign the schema was modelled relationally.',
        hi: 'Sabse mazboot jawab. Jo data saath badalta hai wo ek document mein ho toh single-document atomicity usse cover kar leti hai aur taal-mel bithane ko kuch bachta hi nahi. Transactions ya distributed lock uthana aksar ishara hai ki schema relational tareeke se bana hai.',
      },
    },
  ],
};
