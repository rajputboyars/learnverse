// Fine-tuning & Model Adaptation course — advanced.
// Covers: when to fine-tune, datasets, LoRA/QLoRA/PEFT, Hugging Face, evaluation.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Fine-tuning & Model Adaptation',
  slug: 'fine-tuning',
  description:
    'LLMs ko apne data pe adapt karo — kab fine-tune karna hai vs RAG vs prompting, datasets banana, LoRA/QLoRA aur PEFT se efficient training, Hugging Face Transformers, aur evaluation. Advanced AI engineering skill, English aur Hinglish mein.',
  icon: '🎯',
  tags: ['fine-tuning', 'lora', 'peft', 'hugging-face', 'llm'],
  difficulty: 'advanced',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 42,
};

const basics = [
  {
    title: 'Fine-tuning Fundamentals',
    level: 'advanced',
    description: 'Fine-tuning kya hai, kab karein, aur data kaise banayein.',
    concepts: [
      {
        title: 'What is Fine-tuning & When to Use It',
        difficulty: 'medium',
        tags: ['fine-tuning', 'rag', 'prompting', 'decision'],
        explanation: {
          english:
            '**Fine-tuning** takes a pre-trained model and trains it further on your own examples so it adapts to a specific task, style, or domain. You are updating the model\'s weights, not just its prompt.\n\nThere are three ways to customise an LLM, from cheapest to most involved:\n1. **Prompting / few-shot** — put instructions and examples in the prompt. Zero training. Try this first.\n2. **RAG** — inject *facts* from your data at query time. Best for changing knowledge.\n3. **Fine-tuning** — change the model\'s *behaviour, style, or format*. Best when prompting isn\'t consistent enough.\n\n**Fine-tune when:** you need a consistent tone/format, a specialised task (e.g. classify support tickets), reduced prompt length/cost, or a smaller model to match a bigger one on your task. **Don\'t fine-tune** just to add facts that change often — use RAG for that.',
          hinglish:
            '**Fine-tuning** ek pre-trained model ko leti hai aur use apne examples pe aur train karti hai taaki wo ek specific task, style, ya domain ke liye adapt ho jaye. Tum model ke weights update kar rahe ho, sirf prompt nahi.\n\nLLM customise karne ke teen tareeke hain, saste se lekar zyada involved tak:\n1. **Prompting / few-shot** — instructions aur examples prompt mein daalo. Zero training. Pehle ye try karo.\n2. **RAG** — query time pe apne data se *facts* inject karo. Changing knowledge ke liye best.\n3. **Fine-tuning** — model ka *behaviour, style, ya format* badlo. Tab best jab prompting consistent na ho.\n\n**Fine-tune tab karo:** jab consistent tone/format chahiye, specialised task (jaise support tickets classify karna), prompt length/cost kam karna, ya chhote model ko apne task pe bade model jaisa banana. **Fine-tune mat karo** sirf aise facts add karne ke liye jo aksar badalte hain — uske liye RAG use karo.',
        },
        dailyLifeExample:
          'Prompting waise hai jaise ek naye employee ko har baar instructions dena. RAG waise hai jaise use reference manual dena. Fine-tuning waise hai jaise use proper training dena taaki wo bina bataye tumhare company ke style mein kaam kare — ek baar mehnat, phir consistent.',
        codeExample:
          '# Decision guide (comment-only)\n# Need up-to-date/private FACTS?          -> RAG\n# Need a consistent STYLE / FORMAT?        -> Fine-tune\n# Just a one-off or simple task?           -> Prompting / few-shot\n#\n# Example JSONL row for instruction fine-tuning:\n# {"messages": [\n#   {"role": "system", "content": "You are a support agent for Acme."},\n#   {"role": "user", "content": "My order is late."},\n#   {"role": "assistant", "content": "I\'m sorry! Share your order id and I\'ll check right away."}\n# ]}',
        keyPoints: [
          'Fine-tuning updates model weights on your examples (not just the prompt)',
          'Order of effort: prompting → RAG → fine-tuning',
          'RAG is for facts/knowledge; fine-tuning is for behaviour/style/format',
          'Fine-tune for consistent tone, specialised tasks, or shorter prompts',
          'Avoid fine-tuning for frequently-changing facts — use RAG instead',
        ],
        quiz: [
          {
            question: 'You need the model to always reply in your brand\'s specific tone and JSON format. Best approach?',
            options: ['RAG', 'Fine-tuning', 'A bigger context window', 'Deleting the system prompt'],
            correctIndex: 1,
          },
          {
            question: 'You need answers grounded in documents that update daily. Best approach?',
            options: ['Fine-tuning every day', 'RAG', 'Prompting only', 'Training from scratch'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Preparing a Fine-tuning Dataset',
        difficulty: 'medium',
        tags: ['dataset', 'jsonl', 'data-quality', 'splits'],
        explanation: {
          english:
            'Fine-tuning quality is dominated by **data quality**, not quantity. A few hundred clean, consistent examples often beat thousands of noisy ones.\n\n**Format:** most instruction fine-tuning uses **JSONL** (one JSON object per line), commonly a chat format with system/user/assistant messages. Each example should show the *exact* behaviour you want.\n\n**Best practices:**\n- **Consistency** — same style, format, and labelling across examples\n- **Diversity** — cover the real range of inputs the model will see\n- **Clean labels** — the assistant answers must be correct and in the target style\n- **Splits** — hold out a validation/test set to measure real performance\n- **Balance** — avoid over-representing one category\n\nRemember: the model imitates your data. Garbage in, garbage out — so review examples carefully before training.',
          hinglish:
            'Fine-tuning ki quality **data quality** se decide hoti hai, quantity se nahi. Kuch sau clean, consistent examples aksar hazaron noisy examples se behtar hote hain.\n\n**Format:** zyadatar instruction fine-tuning **JSONL** use karti hai (ek line pe ek JSON object), aam taur pe chat format system/user/assistant messages ke saath. Har example wo *exact* behaviour dikhaye jo tum chahte ho.\n\n**Best practices:**\n- **Consistency** — sab examples mein same style, format, labelling\n- **Diversity** — real range of inputs cover karo jo model dekhega\n- **Clean labels** — assistant answers correct aur target style mein hone chahiye\n- **Splits** — ek validation/test set alag rakho real performance measure karne ke liye\n- **Balance** — ek category ko over-represent mat karo\n\nYaad rakho: model tumhare data ki nakal karta hai. Garbage in, garbage out — toh training se pehle examples dhyaan se review karo.',
        },
        dailyLifeExample:
          'Dataset banana waise hai jaise ek naye cook ko sikhana. Agar tum use 50 sahi recipes clearly dikhao, wo achha seekhega. Agar 5000 recipes do jinme aadhi galat hain, wo confuse ho jayega. Quality > quantity.',
        codeExample:
          '# A clean JSONL fine-tuning file (chat format)\n# train.jsonl (one JSON object per line):\n{"messages": [\n  {"role": "system", "content": "Classify the ticket as: billing, technical, or general."},\n  {"role": "user", "content": "I was charged twice this month."},\n  {"role": "assistant", "content": "billing"}\n]}\n{"messages": [\n  {"role": "system", "content": "Classify the ticket as: billing, technical, or general."},\n  {"role": "user", "content": "The app crashes on login."},\n  {"role": "assistant", "content": "technical"}\n]}',
        keyPoints: [
          'Data quality matters more than quantity for fine-tuning',
          'JSONL chat format (system/user/assistant) is the common standard',
          'Keep examples consistent in style, format, and labelling',
          'Cover diverse, realistic inputs; keep categories balanced',
          'Hold out a validation/test split to measure real performance',
        ],
        quiz: [
          {
            question: 'What matters most for a good fine-tuning dataset?',
            options: [
              'Having millions of examples regardless of quality',
              'Clean, consistent, correctly-labelled examples',
              'Using the largest possible model',
              'Only using the test set',
            ],
            correctIndex: 1,
          },
          {
            question: 'What format is commonly used for instruction fine-tuning data?',
            options: ['JSONL with chat messages', 'A single PDF', 'CSV of images', 'Raw binary'],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
];

const efficient = [
  {
    title: 'Efficient Fine-tuning & Tooling',
    level: 'advanced',
    description: 'LoRA/QLoRA/PEFT, Hugging Face aur evaluation.',
    concepts: [
      {
        title: 'LoRA, QLoRA & PEFT',
        difficulty: 'hard',
        tags: ['lora', 'qlora', 'peft', 'efficient'],
        explanation: {
          english:
            'Full fine-tuning updates *all* of a model\'s billions of weights — very expensive in GPU memory and time. **PEFT (Parameter-Efficient Fine-Tuning)** methods update only a tiny fraction of parameters and get nearly the same results.\n\n**LoRA (Low-Rank Adaptation)** freezes the original weights and injects small trainable "adapter" matrices into each layer. You train only these adapters — often <1% of the parameters — then merge or load them at inference. This makes fine-tuning cheap and lets you keep many task-specific adapters for one base model.\n\n**QLoRA** goes further: it loads the base model in 4-bit **quantised** form (much less memory) and trains LoRA adapters on top. This is what lets people fine-tune large models on a single consumer GPU.\n\nHugging Face\'s `peft` library implements all of these with a few lines of code.',
          hinglish:
            'Full fine-tuning model ke *saare* billions weights update karti hai — GPU memory aur time mein bahut mehnga. **PEFT (Parameter-Efficient Fine-Tuning)** methods sirf ek tiny fraction parameters update karte hain aur lagभग same results dete hain.\n\n**LoRA (Low-Rank Adaptation)** original weights ko freeze karti hai aur har layer mein chhote trainable "adapter" matrices inject karti hai. Tum sirf ye adapters train karte ho — aksar <1% parameters — phir inference pe merge ya load kar lete ho. Isse fine-tuning sasti ho jaati hai aur ek base model ke liye bahut saare task-specific adapters rakh sakte ho.\n\n**QLoRA** aur aage jaati hai: base model ko 4-bit **quantised** form mein load karti hai (bahut kam memory) aur uspe LoRA adapters train karti hai. Isi se log bade models ko ek single consumer GPU pe fine-tune kar paate hain.\n\nHugging Face ki `peft` library ye sab kuch lines mein implement karti hai.',
        },
        dailyLifeExample:
          'Full fine-tuning waise hai jaise poora ghar dobara banana. LoRA waise hai jaise sirf furniture badalna — dhaancha wahi, chhote changes se naya look. QLoRA waise hai jaise chhoti jagah (kam memory) mein bhi wo furniture change kar lena.',
        codeExample:
          '# LoRA fine-tuning setup with Hugging Face PEFT\n# pip install peft transformers\nfrom peft import LoraConfig, get_peft_model\nfrom transformers import AutoModelForCausalLM\n\nmodel = AutoModelForCausalLM.from_pretrained("base-llm")\n\nlora = LoraConfig(\n    r=8,                 # rank of the adapter (small)\n    lora_alpha=16,\n    target_modules=["q_proj", "v_proj"],\n    lora_dropout=0.05,\n)\nmodel = get_peft_model(model, lora)\nmodel.print_trainable_parameters()  # e.g. ~0.2% of all params trainable',
        keyPoints: [
          'Full fine-tuning updates all weights — memory- and time-expensive',
          'PEFT updates only a small fraction of parameters for similar results',
          'LoRA freezes base weights and trains tiny adapter matrices (<1% params)',
          'QLoRA loads the base model in 4-bit and trains LoRA on top (fits small GPUs)',
          'Hugging Face `peft` implements LoRA/QLoRA in a few lines',
        ],
        quiz: [
          {
            question: 'What does LoRA train instead of all the model weights?',
            options: [
              'Nothing — it retrains everything',
              'Small injected adapter matrices while freezing the base weights',
              'Only the tokenizer',
              'The dataset',
            ],
            correctIndex: 1,
          },
          {
            question: 'What makes QLoRA especially memory-efficient?',
            options: [
              'It uses no GPU',
              'It loads the base model in 4-bit quantised form',
              'It deletes half the layers',
              'It skips training',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Training with Hugging Face & Evaluating',
        difficulty: 'hard',
        tags: ['hugging-face', 'trainer', 'evaluation', 'overfitting'],
        explanation: {
          english:
            'The **Hugging Face** ecosystem is the standard toolkit for open-source fine-tuning: `transformers` (models), `datasets` (data), `peft` (LoRA/QLoRA), and `trl`/`Trainer` (training loops). You load a base model, attach adapters, point the trainer at your dataset, and it handles batching, optimisation, and checkpoints.\n\n**Evaluating** a fine-tuned model is where beginners slip. Don\'t judge only on the training data — check a **held-out test set**. Watch for **overfitting**: training loss keeps dropping while validation loss rises, meaning the model memorised instead of generalising.\n\nUse task-appropriate metrics: accuracy/F1 for classification, and for open-ended text, human review or an **LLM-as-judge** comparing outputs to references. Always sanity-check with real prompts before shipping.',
          hinglish:
            '**Hugging Face** ecosystem open-source fine-tuning ka standard toolkit hai: `transformers` (models), `datasets` (data), `peft` (LoRA/QLoRA), aur `trl`/`Trainer` (training loops). Tum base model load karte ho, adapters attach karte ho, trainer ko apne dataset pe point karte ho, aur wo batching, optimisation, aur checkpoints handle karta hai.\n\nFine-tuned model ko **evaluate** karna wahan hai jahan beginners phisalte hain. Sirf training data pe judge mat karo — ek **held-out test set** check karo. **Overfitting** dekho: training loss girta rahe par validation loss badhe, matlab model ne generalise karne ke bajaye ratta maar liya.\n\nTask ke hisaab se metrics use karo: classification ke liye accuracy/F1, aur open-ended text ke liye human review ya **LLM-as-judge** jo outputs ko references se compare kare. Ship karne se pehle hamesha real prompts pe sanity-check karo.',
        },
        dailyLifeExample:
          'Overfitting waise hai jaise student jo sirf pichle saal ke exact question-paper ratta maar leta hai — practice test (training) mein 100%, par naye questions (real world) aane pe fail. Isiliye alag test set pe check karna zaroori hai.',
        codeExample:
          '# Fine-tuning loop with Hugging Face Trainer (simplified)\nfrom transformers import Trainer, TrainingArguments\n\nargs = TrainingArguments(\n    output_dir="out",\n    per_device_train_batch_size=4,\n    num_train_epochs=3,\n    eval_strategy="epoch",     # evaluate each epoch\n    learning_rate=2e-4,\n)\ntrainer = Trainer(\n    model=model,               # LoRA-wrapped model\n    args=args,\n    train_dataset=train_ds,\n    eval_dataset=val_ds,       # held-out set catches overfitting\n)\ntrainer.train()',
        keyPoints: [
          'Hugging Face: transformers + datasets + peft + trl/Trainer cover the workflow',
          'The Trainer handles batching, optimisation, and checkpoints',
          'Evaluate on a held-out test set, not the training data',
          'Overfitting = training loss falls while validation loss rises',
          'Use accuracy/F1 for classification; human or LLM-as-judge for open text',
        ],
        quiz: [
          {
            question: 'What is a sign of overfitting during fine-tuning?',
            options: [
              'Both training and validation loss fall together',
              'Training loss falls but validation loss rises',
              'The GPU gets faster',
              'The dataset grows',
            ],
            correctIndex: 1,
          },
          {
            question: 'How should you properly evaluate a fine-tuned model?',
            options: [
              'On the same training data',
              'On a held-out test set with task-appropriate metrics',
              'By file size',
              'By number of parameters',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is LoRA and why is it popular for fine-tuning LLMs?',
            answer: {
              english:
                'LoRA (Low-Rank Adaptation) is a parameter-efficient fine-tuning method that freezes the pre-trained weights and trains small low-rank adapter matrices injected into the layers. It is popular because it drastically cuts memory and compute (training <1% of parameters), lets you keep multiple task-specific adapters for one base model, and achieves quality close to full fine-tuning.',
              hinglish:
                'LoRA (Low-Rank Adaptation) ek parameter-efficient fine-tuning method hai jo pre-trained weights ko freeze karke layers mein inject kiye chhote low-rank adapter matrices train karti hai. Ye popular hai kyunki memory aur compute drastically kam karti hai (<1% parameters train), ek base model ke liye multiple task-specific adapters rakhne deti hai, aur full fine-tuning ke close quality deti hai.',
            },
          },
        ],
      },
    ],
  },
];

export const curriculum = [
  ...basics,
  ...efficient,
];

export const generalInterviewQuestions = [
  {
    question: 'When would you fine-tune a model instead of using RAG or prompting?',
    difficulty: 'medium',
    frequency: 'very-common',
    answer: {
      english:
        'Fine-tune when you need consistent behaviour, tone, or output format, a specialised narrow task, shorter prompts (baking instructions into the model), or a small model to match a larger one on your task. Use prompting for simple cases and RAG when the requirement is up-to-date or private factual knowledge that changes frequently.',
      hinglish:
        'Fine-tune tab karo jab consistent behaviour, tone, ya output format chahiye, ek specialised narrow task, chhote prompts (instructions model mein bake karna), ya chhota model jo tumhare task pe bade model jaisa perform kare. Simple cases ke liye prompting use karo aur RAG jab requirement up-to-date ya private factual knowledge ho jo frequently badalti ho.',
    },
  },
  {
    question: 'What is the difference between full fine-tuning and PEFT/LoRA?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Full fine-tuning updates all model parameters, requiring large GPU memory and compute. PEFT methods like LoRA freeze the base weights and train only small adapter matrices (often under 1% of parameters), achieving comparable quality at a fraction of the cost, and allowing multiple swappable adapters per base model. QLoRA additionally quantises the base model to 4-bit to fit on smaller GPUs.',
      hinglish:
        'Full fine-tuning saare model parameters update karti hai, jise badi GPU memory aur compute chahiye. LoRA jaise PEFT methods base weights freeze karke sirf chhote adapter matrices (aksar 1% se kam parameters) train karte hain, comparable quality bahut kam cost pe dete hain, aur ek base model ke liye multiple swappable adapters allow karte hain. QLoRA additionally base model ko 4-bit mein quantise karti hai taaki chhote GPUs pe fit ho.',
    },
  },
];
