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
