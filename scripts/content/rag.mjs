// RAG & Vector Databases course — intermediate.
// Covers: embeddings, vector DBs, the RAG pipeline, chunking & retrieval, frameworks.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'RAG & Vector Databases',
  slug: 'rag',
  description:
    'Retrieval-Augmented Generation (RAG) se LLM ko apna data do — embeddings, vector databases (Pinecone, Chroma, pgvector), chunking, retrieval aur LangChain/LlamaIndex. Production AI chatbots aur Q&A apps banao, English aur Hinglish mein.',
  icon: '🔎',
  tags: ['rag', 'embeddings', 'vector-database', 'langchain', 'llm'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 41,
};

const foundations = [
  {
    title: 'RAG Foundations',
    level: 'intermediate',
    description: 'Embeddings, vector search aur RAG kyon zaroori hai.',
    concepts: [
      {
        title: 'Why RAG? Embeddings & Semantic Search',
        difficulty: 'medium',
        tags: ['rag', 'embeddings', 'semantic-search'],
        explanation: {
          english:
            'LLMs are powerful but have two limits: they only know what was in their training data (a fixed cutoff), and they can "hallucinate" facts. **RAG (Retrieval-Augmented Generation)** fixes both by fetching relevant information from *your* data and feeding it to the LLM as context before it answers.\n\nThe magic ingredient is **embeddings**. An embedding model turns text into a vector of numbers that captures *meaning*. Texts with similar meaning end up close together in this vector space — so "How do I reset my password?" and "I forgot my login" land near each other even though they share no words.\n\n**Semantic search** uses embeddings: embed the user\'s question, then find the stored chunks whose embeddings are closest (usually by cosine similarity). Those chunks become the context for the LLM.',
          hinglish:
            'LLMs powerful hain par do limits hain: wo sirf apne training data (fixed cutoff) tak jaante hain, aur facts "hallucinate" kar sakte hain. **RAG (Retrieval-Augmented Generation)** dono fix karta hai — *tumhare* data se relevant information laakar LLM ko answer se pehle context deta hai.\n\nJaadu ki cheez hai **embeddings**. Embedding model text ko numbers ke vector mein badalta hai jo *meaning* capture karta hai. Similar meaning wale texts is vector space mein paas aa jaate hain — toh "How do I reset my password?" aur "I forgot my login" ek doosre ke paas aate hain chahe koi word common na ho.\n\n**Semantic search** embeddings use karta hai: user ke question ko embed karo, phir wo stored chunks dhundo jinke embeddings sabse close hain (aksar cosine similarity se). Wo chunks LLM ke liye context ban jaate hain.',
        },
        dailyLifeExample:
          'RAG waise hai jaise open-book exam: student (LLM) sab yaad rakhne ke bajaye pehle relevant page (retrieval) dhundta hai, phir usse padhkar answer likhta hai. Isse answer sahi aur up-to-date hota hai — bina ratta maare.',
        codeExample:
          '# Semantic similarity via cosine similarity of embeddings\nimport numpy as np\n\ndef cosine(a, b):\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\n\n# Pretend these came from an embedding model\nq       = np.array([0.9, 0.1, 0.2])   # "I forgot my login"\ndoc_pwd = np.array([0.88, 0.15, 0.18]) # "reset your password"\ndoc_ship= np.array([0.1, 0.9, 0.4])   # "shipping policy"\n\nprint(round(cosine(q, doc_pwd), 3))   # high -> relevant\nprint(round(cosine(q, doc_ship), 3))  # low  -> not relevant',
        keyPoints: [
          'RAG feeds the LLM relevant info from your data before it answers',
          'It reduces hallucinations and adds fresh/private knowledge',
          'Embeddings turn text into vectors that capture meaning',
          'Similar meanings sit close together in vector space',
          'Semantic search finds nearest chunks (e.g. cosine similarity)',
        ],
        quiz: [
          {
            question: 'What problem does RAG primarily solve for LLMs?',
            options: [
              'It makes the model train faster',
              'It grounds answers in your data, reducing hallucination and stale knowledge',
              'It removes the need for prompts',
              'It compresses the model',
            ],
            correctIndex: 1,
          },
          {
            question: 'What do embeddings represent?',
            options: [
              'The exact spelling of words',
              'The meaning of text as a vector of numbers',
              'The file size',
              'The model weights',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Vector Databases',
        difficulty: 'medium',
        tags: ['vector-database', 'pinecone', 'chroma', 'pgvector', 'ann'],
        explanation: {
          english:
            'Once you have thousands or millions of embeddings, you need a **vector database** to store them and search them fast. Unlike a normal DB that matches exact values, a vector DB finds the *nearest* vectors to a query using **Approximate Nearest Neighbour (ANN)** algorithms (like HNSW) — extremely fast even at scale.\n\n**Popular options:**\n- **Chroma** — lightweight, great for local development and prototypes\n- **Pinecone** — managed cloud service, scales easily\n- **pgvector** — a PostgreSQL extension; keep vectors alongside your relational data\n- **FAISS** — a fast library (not a full DB) from Meta\n- **Weaviate / Qdrant / Milvus** — other production options\n\nA vector DB stores each chunk\'s embedding plus **metadata** (source, page, date). Metadata lets you filter (e.g. only 2024 docs) alongside semantic search.',
          hinglish:
            'Jab tumhare paas hazaron ya millions embeddings ho jaate hain, tumhe **vector database** chahiye unhe store aur fast search karne ke liye. Normal DB jo exact values match karta hai, uske ulat vector DB query ke *nearest* vectors dhundta hai **Approximate Nearest Neighbour (ANN)** algorithms (jaise HNSW) se — scale pe bhi bahut fast.\n\n**Popular options:**\n- **Chroma** — lightweight, local development aur prototypes ke liye badhiya\n- **Pinecone** — managed cloud service, easily scale karta hai\n- **pgvector** — PostgreSQL extension; vectors ko relational data ke saath rakho\n- **FAISS** — Meta ki fast library (poora DB nahi)\n- **Weaviate / Qdrant / Milvus** — doosre production options\n\nVector DB har chunk ka embedding plus **metadata** (source, page, date) store karta hai. Metadata se tum filter kar sakte ho (jaise sirf 2024 docs) semantic search ke saath.',
        },
        dailyLifeExample:
          'Vector DB waise hai jaise ek super-smart library jismein books meaning ke hisaab se arrange hain, spelling ke hisaab se nahi. Tum "AI ke saath paise kaise kamayein" poochho, aur wo turant sabse milte-julte pages nikaal deti hai — chahe unme wo exact words na ho.',
        codeExample:
          '# Store & query embeddings with Chroma (local, easy to start)\n# pip install chromadb\nimport chromadb\n\nclient = chromadb.Client()\ncol = client.create_collection("docs")\n\ncol.add(\n    ids=["1", "2"],\n    documents=["Reset your password from Settings.",\n               "Our shipping takes 3-5 days."],\n    metadatas=[{"topic": "account"}, {"topic": "orders"}],\n)\n\nres = col.query(query_texts=["I forgot my login"], n_results=1)\nprint(res["documents"])   # -> password reset doc',
        keyPoints: [
          'Vector DBs store embeddings and do fast nearest-neighbour search',
          'They use ANN algorithms (e.g. HNSW) to scale to millions of vectors',
          'Chroma (local), Pinecone (managed), pgvector (Postgres) are popular',
          'Store metadata with each vector to enable filtered search',
          'Choose based on scale, cost, and whether you want managed vs self-hosted',
        ],
        quiz: [
          {
            question: 'How does a vector database find results differently from a normal database?',
            options: [
              'It matches exact keywords only',
              'It finds the nearest vectors by similarity (approximate nearest neighbour)',
              'It sorts alphabetically',
              'It only stores numbers, not text',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which option lets you store vectors inside PostgreSQL?',
            options: ['Chroma', 'pgvector', 'FAISS', 'Redis lists'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const pipeline = [
  {
    title: 'Building a RAG Pipeline',
    level: 'intermediate',
    description: 'Chunking, retrieval, prompt assembly aur frameworks.',
    concepts: [
      {
        title: 'The RAG Pipeline: Chunk, Embed, Retrieve, Generate',
        difficulty: 'medium',
        tags: ['pipeline', 'chunking', 'retrieval', 'context'],
        explanation: {
          english:
            'A RAG system has two phases.\n\n**Indexing (offline):**\n1. **Load** your documents (PDFs, docs, web pages)\n2. **Chunk** them into small passages (e.g. 300–800 tokens with slight overlap) — because you retrieve and feed *chunks*, not whole files\n3. **Embed** each chunk and **store** it in a vector DB with metadata\n\n**Querying (at request time):**\n1. **Embed** the user\'s question\n2. **Retrieve** the top-k most similar chunks from the vector DB\n3. **Assemble** a prompt: system instructions + retrieved chunks + the question\n4. **Generate** — the LLM answers using the provided context (and can cite sources)\n\nGood **chunking** is the most underrated part: too big and retrieval is imprecise; too small and you lose context. Overlap avoids cutting ideas in half.',
          hinglish:
            'RAG system ke do phases hote hain.\n\n**Indexing (offline):**\n1. Apne documents **load** karo (PDFs, docs, web pages)\n2. Unhe chhote passages mein **chunk** karo (jaise 300–800 tokens thodi overlap ke saath) — kyunki tum *chunks* retrieve aur feed karte ho, poori files nahi\n3. Har chunk ko **embed** karke vector DB mein metadata ke saath **store** karo\n\n**Querying (request time pe):**\n1. User ke question ko **embed** karo\n2. Vector DB se top-k sabse similar chunks **retrieve** karo\n3. Ek prompt **assemble** karo: system instructions + retrieved chunks + question\n4. **Generate** — LLM diye gaye context se answer deta hai (aur sources cite kar sakta hai)\n\nAchha **chunking** sabse underrated part hai: bahut bada toh retrieval imprecise; bahut chhota toh context kho jaata hai. Overlap ideas ko beech se katne se bachata hai.',
        },
        dailyLifeExample:
          'Socho ek 500-page manual. Poora manual LLM ko dena impossible (context limit). Toh tum use topics mein baant lete ho (chunking), library mein rakh dete ho (vector DB), aur jab sawaal aaye toh sirf 3 relevant pages nikaal ke LLM ko dete ho. Fast, sasta, accurate.',
        codeExample:
          '# Minimal RAG flow (pseudocode-style, framework-agnostic)\nchunks = chunk_document(load_pdf("handbook.pdf"), size=500, overlap=50)\nvectors = [embed(c) for c in chunks]\ndb.add(vectors, chunks, metadata=[{"src": "handbook"}] * len(chunks))\n\ndef answer(question):\n    q_vec = embed(question)\n    top = db.search(q_vec, k=3)             # retrieve\n    context = "\\n\\n".join(top.documents)   # assemble\n    prompt = f"Use ONLY this context:\\n{context}\\n\\nQ: {question}"\n    return llm.generate(prompt)             # generate',
        keyPoints: [
          'Indexing: load → chunk → embed → store in vector DB',
          'Querying: embed question → retrieve top-k → assemble prompt → generate',
          'You retrieve and feed chunks, not entire documents',
          'Chunk size + overlap strongly affect answer quality',
          'The LLM answers using retrieved context and can cite sources',
        ],
        quiz: [
          {
            question: 'In the RAG querying phase, what happens right after embedding the question?',
            options: [
              'The model is retrained',
              'The top-k most similar chunks are retrieved from the vector DB',
              'The documents are deleted',
              'The answer is cached',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why do we chunk documents in RAG?',
            options: [
              'To make files larger',
              'So we can retrieve and feed small, relevant passages within the context limit',
              'To encrypt them',
              'Chunking is not needed',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you choose RAG over fine-tuning?',
            answer: {
              english:
                'Choose RAG when the knowledge changes frequently, is large, or is private/company-specific, and when you need source citations — RAG keeps facts in an external store you can update anytime without retraining. Fine-tuning is better for changing the model\'s style/format or teaching new skills/behaviour rather than injecting facts.',
              hinglish:
                'RAG tab choose karo jab knowledge frequently change hoti ho, badi ho, ya private/company-specific ho, aur jab source citations chahiye — RAG facts ko ek external store mein rakhta hai jise tum retrain kiye bina kabhi bhi update kar sakte ho. Fine-tuning behtar hai jab model ka style/format badalna ho ya naye skills/behaviour sikhaane ho, na ki facts inject karne ke liye.',
            },
          },
        ],
      },
      {
        title: 'RAG Frameworks: LangChain & LlamaIndex',
        difficulty: 'easy',
        tags: ['langchain', 'llamaindex', 'frameworks', 'tools'],
        explanation: {
          english:
            'You can build RAG from scratch, but frameworks handle the plumbing so you focus on your app.\n\n**LangChain** — a broad toolkit for LLM apps: document loaders, text splitters, vector store integrations, retrievers, chains, and agents. Great when you need flexibility and to combine many steps/tools.\n\n**LlamaIndex** — focused specifically on connecting LLMs to your data. It excels at ingestion, indexing, and advanced retrieval strategies (e.g. hierarchical or hybrid search) with less boilerplate.\n\nBoth support the same building blocks (loaders → splitters → embeddings → vector store → retriever → LLM). For a simple Q&A bot, either works. Pick LlamaIndex if data-indexing is your main need; pick LangChain if you also need agents/tools and complex orchestration.',
          hinglish:
            'RAG scratch se bana sakte ho, par frameworks plumbing handle kar lete hain taaki tum apni app pe focus karo.\n\n**LangChain** — LLM apps ke liye broad toolkit: document loaders, text splitters, vector store integrations, retrievers, chains, aur agents. Tab badhiya jab flexibility aur bahut saare steps/tools combine karne ho.\n\n**LlamaIndex** — specifically LLMs ko tumhare data se connect karne pe focused. Ingestion, indexing, aur advanced retrieval strategies (jaise hierarchical ya hybrid search) mein kam boilerplate ke saath excel karta hai.\n\nDono same building blocks support karte hain (loaders → splitters → embeddings → vector store → retriever → LLM). Simple Q&A bot ke liye koi bhi chalega. LlamaIndex chuno agar data-indexing main need hai; LangChain chuno agar agents/tools aur complex orchestration bhi chahiye.',
        },
        dailyLifeExample:
          'Framework use karna waise hai jaise ghar banane ke liye ready-made kit lena — neenv, deewarein, wiring ke standard parts mil jaate hain. Tum sirf design (apni app) pe dhyaan dete ho, har eent khud nahi banate.',
        codeExample:
          '# RAG in a few lines with LlamaIndex\n# pip install llama-index\nfrom llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\ndocs = SimpleDirectoryReader("./company_docs").load_data()\nindex = VectorStoreIndex.from_documents(docs)   # load+chunk+embed+store\n\nqe = index.as_query_engine()                    # retriever + LLM\nprint(qe.query("What is our refund policy?"))',
        keyPoints: [
          'Frameworks handle loaders, splitters, embeddings, retrieval, and orchestration',
          'LangChain: broad LLM toolkit, strong for agents/tools and complex chains',
          'LlamaIndex: focused on data ingestion, indexing, and advanced retrieval',
          'Both share the loaders → splitter → embed → vector store → retriever → LLM flow',
          'Pick based on whether your main need is data-indexing or general orchestration',
        ],
        quiz: [
          {
            question: 'Which framework is especially focused on connecting LLMs to your own data (ingestion + indexing)?',
            options: ['LlamaIndex', 'NumPy', 'Flask', 'Docker'],
            correctIndex: 0,
          },
          {
            question: 'What do RAG frameworks mainly save you from doing?',
            options: [
              'Writing any prompts',
              'Building the plumbing (loaders, splitters, retrievers, integrations) by hand',
              'Using an LLM at all',
              'Storing data',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Chunking Strategies: How to Split Documents',
        difficulty: 'hard',
        tags: ['chunking', 'preprocessing', 'strategy'],
        explanation: {
          english:
            "The basic RAG pipeline mentions 'chunk into 300-800 tokens with overlap', but WHICH way you split a document dramatically affects retrieval quality. Fixed-size chunking (split every N tokens/characters) is simplest and fast, but can slice a sentence — or even an idea — right in half. Recursive/structural chunking splits along natural boundaries first (paragraphs, then sentences, then words) only falling back to a hard cut when a section is still too big — this respects the document's actual structure. Semantic chunking goes further: it uses embeddings to detect where the TOPIC actually shifts, grouping sentences that are semantically related into one chunk, even if that means variable chunk sizes. There's no single 'best' strategy — it depends on your documents (tables and code need different handling than prose) and needs to be evaluated on YOUR retrieval quality.",
          hinglish:
            "Basic RAG pipeline 'overlap ke saath 300-800 tokens mein chunk karo' bolta hai, par tum document ko KAISE split karte ho retrieval quality ko dramatically affect karta hai. Fixed-size chunking (har N tokens/characters pe split) sabse simple aur fast hai, par ek sentence — ya ek idea — ko bilkul beech se kaat sakta hai. Recursive/structural chunking pehle natural boundaries (paragraphs, phir sentences, phir words) ke along split karta hai, sirf tab hard cut karta hai jab koi section abhi bhi bahut bada ho — ye document ki asli structure ka respect karta hai. Semantic chunking aur aage jaata hai: ye embeddings use karta hai ye detect karne ke liye ki TOPIC actually kaha shift hota hai, semantically related sentences ko ek chunk mein group karke, chahe iska matlab variable chunk sizes ho. Koi ek 'best' strategy nahi hai — ye tumhare documents pe depend karta hai (tables aur code ko prose se alag handling chahiye) aur TUMHARI retrieval quality pe evaluate karna padta hai.",
        },
        dailyLifeExample:
          "Fixed-size chunking ek kitaab ko har 50 pages pe kaat dena hai, chahe beech mein ek chapter kyun na kat jaaye. Recursive chunking chapters ke natural breaks pe kaatna hai — pehle chapters, phir zaroorat pade to paragraphs. Semantic chunking ek smart editor jaisa hai jo padh ke samajhta hai 'ye topic yahan khatam hota hai, naya topic yahan shuru' — chahe wo section chhota ho ya bada.",
        codeExample:
          "# Fixed-size: simple, fast, can cut ideas in half\ndef fixed_chunk(text, size=500, overlap=50):\n    chunks = []\n    for i in range(0, len(text), size - overlap):\n        chunks.append(text[i:i + size])\n    return chunks\n\n# Recursive/structural: respects paragraph/sentence boundaries first\n# (conceptual — libraries like LangChain's RecursiveCharacterTextSplitter do this)\n# 1. Try splitting on '\\n\\n' (paragraphs)\n# 2. If a piece is still too big, try '\\n' (lines)\n# 3. If still too big, try '. ' (sentences)\n# 4. Only as a last resort, hard-cut by character count\n\n# Semantic: group sentences by topic similarity using embeddings\n# 1. Embed each sentence\n# 2. Compare consecutive sentence embeddings\n# 3. Start a NEW chunk when similarity drops sharply (topic shift detected)\n# 4. Otherwise keep adding sentences to the current chunk",
        keyPoints: [
          'Fixed-size chunking: simplest and fastest, but can cut sentences/ideas in half',
          'Recursive/structural chunking: splits on paragraph -> sentence -> word boundaries, respecting document structure',
          'Semantic chunking: uses embeddings to detect actual topic shifts, producing variable-sized, topically-coherent chunks',
          'The right strategy depends on your document type (prose vs tables vs code)',
          'Always evaluate chunking strategy against YOUR actual retrieval quality, not just intuition',
        ],
        quiz: [
          {
            question: 'What is the main downside of simple fixed-size chunking?',
            options: ['It is too slow', 'It can slice a sentence or idea right in half, regardless of document structure', 'It cannot be used at all', 'It only works with images'],
            correctIndex: 1,
          },
          {
            question: 'What does semantic chunking use to decide where to split a document?',
            options: ['A fixed character count only', 'Embeddings, to detect where the topic actually shifts between sentences', 'Random splitting', 'File size'],
            correctIndex: 1,
          },
          {
            question: 'Is there a single "best" chunking strategy for all documents?',
            options: ['Yes, semantic chunking is always best', 'No — it depends on the document type and should be evaluated against your own retrieval quality', 'Yes, fixed-size is always best', 'Chunking strategy never matters'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Hybrid Search & Re-ranking',
        difficulty: 'hard',
        tags: ['hybrid-search', 'reranking', 'retrieval-quality'],
        explanation: {
          english:
            "Pure semantic (vector) search is great at understanding MEANING but can miss exact matches — searching for an error code like 'ERR_4042' might not retrieve a document containing that exact string, because the embedding focuses on general meaning, not exact tokens. Hybrid search combines semantic search with traditional keyword search (like BM25, the classic 'exact word matching with smart weighting' algorithm), then merges both result sets — catching both meaning-based AND exact matches. Re-ranking adds a second, more expensive but more accurate step: after retrieving, say, the top 20 candidates cheaply (via vector/hybrid search), a separate, more powerful re-ranking model re-scores just those 20 with deeper analysis and reorders them, so the final top-k passed to the LLM is higher quality than what fast retrieval alone could achieve.",
          hinglish:
            "Pure semantic (vector) search MEANING samajhne mein great hai par exact matches miss kar sakta hai — 'ERR_4042' jaise error code ko search karna shayad wo exact string wala document retrieve na kare, kyunki embedding general meaning pe focus karta hai, exact tokens pe nahi. Hybrid search semantic search ko traditional keyword search (jaise BM25, classic 'exact word matching with smart weighting' algorithm) ke saath combine karta hai, phir dono result sets ko merge karta hai — meaning-based AUR exact matches dono pakadte hue. Re-ranking ek doosra, zyada expensive par zyada accurate step add karta hai: retrieve karne ke baad, jaise top 20 candidates sasti tarah (vector/hybrid search se), ek alag, zyada powerful re-ranking model sirf un 20 ko deeper analysis se re-score karta hai aur reorder karta hai, isliye final top-k jo LLM ko diya jaata hai fast retrieval akele se behtar quality ka hota hai.",
        },
        dailyLifeExample:
          "Semantic search akela ek librarian jaisa hai jo sirf 'iska matlab kya hai' samajhta hai, exact spelling ko nazar-andaz karta hai. Hybrid search wahi librarian hai plus ek ctrl+F search jo exact words dhoondhta hai — dono milke poora coverage dete hain. Re-ranking ek senior expert jaisa hai jo top 20 shortlisted candidates ko ek final round mein dobara, zyada dhyan se, review karta hai — final selection improve karta hai.",
        codeExample:
          "# Hybrid search: combine vector (semantic) + keyword (BM25) results\nvector_results = vector_db.search(embed(query), k=20)      # meaning-based\nkeyword_results = bm25_index.search(query, k=20)           # exact-term-based\n\n# Merge and deduplicate (many strategies exist — e.g. reciprocal rank fusion)\ncombined = merge_and_dedupe(vector_results, keyword_results)\n\n# Re-ranking: cheap retrieval first, then an expensive precise re-score\ncandidates = combined[:20]                     # cheap, broad retrieval\nreranked = reranker_model.score(query, candidates)  # expensive, precise\ntop_k = reranked[:3]                           # only the best 3 go to the LLM prompt",
        keyPoints: [
          'Pure semantic search can miss exact matches (error codes, IDs, specific terms) because it focuses on meaning',
          'Hybrid search combines vector (semantic) search with keyword search (like BM25) for broader coverage',
          "Re-ranking retrieves a larger, cheap candidate set first, then uses a more accurate (but expensive) model to re-score just those",
          "This two-stage approach (cheap broad retrieval + expensive precise re-ranking) balances speed and quality",
          'Both techniques improve retrieval quality beyond what plain vector search alone can achieve',
        ],
        quiz: [
          {
            question: "Why might pure semantic (vector) search fail to find a document containing an exact error code like 'ERR_4042'?",
            options: ['Vector search cannot handle numbers at all', 'Embeddings capture general meaning, not exact token matches, so an unusual exact string might not surface as semantically similar', 'The document was not indexed', 'Error codes are always excluded from search'],
            correctIndex: 1,
          },
          {
            question: 'What does hybrid search combine?',
            options: ['Two different LLMs', 'Semantic (vector) search with traditional keyword search (like BM25)', 'Two vector databases', 'Image and text search only'],
            correctIndex: 1,
          },
          {
            question: 'In the re-ranking approach, why retrieve a larger candidate set cheaply first, THEN re-score just those with a more expensive model?',
            options: ['It has no real benefit', 'Running the expensive, accurate model on everything would be too slow/costly; narrowing down cheaply first then refining balances speed and quality', 'The expensive model cannot process more than 20 items ever', 'Cheap retrieval is always more accurate'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Evaluating RAG Systems',
        difficulty: 'hard',
        tags: ['evaluation', 'metrics', 'testing'],
        explanation: {
          english:
            "You cannot improve what you don't measure — RAG systems need evaluation on TWO separate stages, since a failure in either one breaks the final answer. Retrieval evaluation asks: 'did we fetch the right chunks?' — common metrics include Recall@k (of all truly relevant chunks, what fraction appeared in your top-k results?) and Precision@k (of the k chunks you retrieved, what fraction were actually relevant?). Generation evaluation asks: 'given good context, did the LLM answer well?' — key checks include faithfulness/groundedness (does the answer only use facts actually present in the retrieved context, with no hallucination?) and answer relevance (does it actually address the question?). Frameworks like RAGAS automate these checks using an LLM-as-judge, but building even a small hand-labeled test set of realistic questions with known-correct answers is the single most valuable thing you can do to catch regressions.",
          hinglish:
            "Jo measure nahi karte use improve nahi kar sakte — RAG systems ko DO alag stages pe evaluation chahiye, kyunki kisi bhi ek mein failure final answer ko tod deta hai. Retrieval evaluation poochta hai: 'kya humne sahi chunks fetch kiye?' — common metrics: Recall@k (saare truly relevant chunks mein se, kitna fraction tumhare top-k results mein aaya?) aur Precision@k (jo k chunks retrieve kiye, unme se kitna fraction actually relevant tha?). Generation evaluation poochta hai: 'achha context milne pe, kya LLM ne achha answer diya?' — key checks: faithfulness/groundedness (kya answer sirf retrieved context mein actually present facts use karta hai, koi hallucination nahi?) aur answer relevance (kya ye actually question address karta hai?). RAGAS jaise frameworks LLM-as-judge use karke ye checks automate karte hain, par realistic questions ka ek chhota, hand-labeled test set banana jispe known-correct answers hon, tumhare regressions pakadne ke liye sabse valuable cheez hai jo tum kar sakte ho.",
        },
        dailyLifeExample:
          "Retrieval evaluation ek library assistant ko test karna hai: 'kitni baar sahi kitaabein laate ho?' (Recall/Precision). Generation evaluation ek student ko test karna hai jise sahi kitaabein di gayi hain: 'kya wo unse sahi, honest answer likhta hai, ya khud se kuch bana leta hai (hallucination)?' Dono tests alag hain — ek achhi library ke saath ek galat student bhi galat answer de sakta hai.",
        codeExample:
          "# Retrieval metrics (conceptual)\ndef recall_at_k(retrieved_chunks, truly_relevant_chunks, k):\n    top_k = retrieved_chunks[:k]\n    hits = len(set(top_k) & set(truly_relevant_chunks))\n    return hits / len(truly_relevant_chunks)  # of all relevant, how many did we find?\n\ndef precision_at_k(retrieved_chunks, truly_relevant_chunks, k):\n    top_k = retrieved_chunks[:k]\n    hits = len(set(top_k) & set(truly_relevant_chunks))\n    return hits / k  # of what we retrieved, how much was relevant?\n\n# Generation evaluation (conceptual, using an LLM-as-judge)\n# faithfulness_score = judge_llm.check(\n#     'Does this answer ONLY use facts from the provided context?',\n#     context=retrieved_chunks, answer=generated_answer\n# )\n\n# The single most valuable thing: a small hand-labeled test set\ntest_set = [\n    {'question': 'What is the return policy?', 'expected_answer_contains': ['30 days', 'receipt']},\n    # ... 20-50 realistic questions with known-good answers ...\n]",
        keyPoints: [
          'RAG evaluation needs two separate stages: retrieval quality AND generation quality',
          'Recall@k: of all truly relevant chunks, what fraction did retrieval actually find in the top-k?',
          'Precision@k: of the chunks retrieved, what fraction were actually relevant?',
          'Faithfulness/groundedness: does the generated answer only use facts present in the retrieved context (no hallucination)?',
          'A small hand-labeled test set of realistic questions is the single most valuable tool for catching regressions',
        ],
        quiz: [
          {
            question: 'Why does RAG need evaluation at TWO separate stages (retrieval AND generation)?',
            options: ['One combined score is always sufficient', 'A failure in either stage breaks the final answer — good retrieval with bad generation (or vice versa) both produce a bad result, so you must diagnose which one failed', 'Only generation needs evaluation', 'Only retrieval needs evaluation'],
            correctIndex: 1,
          },
          {
            question: 'What does Recall@k measure?',
            options: ['How fast retrieval runs', 'Of all the truly relevant chunks that exist, what fraction appeared in your top-k retrieved results', 'The size of the vector database', 'How many tokens the LLM used'],
            correctIndex: 1,
          },
          {
            question: 'What does "faithfulness" or "groundedness" check in generation evaluation?',
            options: ['How fast the LLM responds', 'Whether the generated answer only uses facts actually present in the retrieved context, with no hallucination', 'How long the answer is', 'How many chunks were retrieved'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const curriculum = [
  ...foundations,
  ...pipeline,
];

export const generalInterviewQuestions = [
  {
    question: 'What is RAG and why is it useful?',
    difficulty: 'easy',
    frequency: 'very-common',
    answer: {
      english:
        'RAG (Retrieval-Augmented Generation) retrieves relevant information from an external knowledge source (usually a vector database) and provides it to an LLM as context before generating an answer. It is useful because it grounds responses in up-to-date, private, or domain-specific data, reduces hallucinations, and allows source citations — all without retraining the model.',
      hinglish:
        'RAG (Retrieval-Augmented Generation) ek external knowledge source (aksar vector database) se relevant information retrieve karta hai aur answer generate karne se pehle LLM ko context deta hai. Ye useful hai kyunki responses ko up-to-date, private, ya domain-specific data mein ground karta hai, hallucinations kam karta hai, aur source citations allow karta hai — bina model retrain kiye.',
    },
  },
  {
    question: 'What is an embedding?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'An embedding is a numeric vector representation of text (or images/audio) that captures semantic meaning. Items with similar meaning have vectors that are close together, which enables semantic search — finding relevant content by meaning rather than exact keywords.',
      hinglish:
        'Embedding text (ya images/audio) ka numeric vector representation hai jo semantic meaning capture karta hai. Similar meaning wale items ke vectors paas hote hain, jisse semantic search possible hoti hai — meaning ke hisaab se relevant content dhundhna, exact keywords ke bajaye.',
    },
  },
];
