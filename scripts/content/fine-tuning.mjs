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
          {
            question: 'What exactly does fine-tuning change about a pre-trained model?',
            options: [
              'Nothing, it only changes the prompt sent to the model',
              "The model's internal weights, via further training on your examples",
              'The tokenizer vocabulary only',
              'The GPU it runs on',
            ],
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
          {
            question: 'Why is a held-out validation/test split important for a fine-tuning dataset?',
            options: [
              "It isn't important, training data alone is enough",
              'It measures how the model performs on examples it did not train on, catching overfitting',
              'It makes the file smaller',
              'It is only needed for RAG, not fine-tuning',
            ],
            correctIndex: 1,
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
            'Full fine-tuning model ke *saare* billions weights update karti hai — GPU memory aur time mein bahut mehnga. **PEFT (Parameter-Efficient Fine-Tuning)** methods sirf ek tiny fraction parameters update karte hain aur lagbhag same results dete hain.\n\n**LoRA (Low-Rank Adaptation)** original weights ko freeze karti hai aur har layer mein chhote trainable "adapter" matrices inject karti hai. Tum sirf ye adapters train karte ho — aksar <1% parameters — phir inference pe merge ya load kar lete ho. Isse fine-tuning sasti ho jaati hai aur ek base model ke liye bahut saare task-specific adapters rakh sakte ho.\n\n**QLoRA** aur aage jaati hai: base model ko 4-bit **quantised** form mein load karti hai (bahut kam memory) aur uspe LoRA adapters train karti hai. Isi se log bade models ko ek single consumer GPU pe fine-tune kar paate hain.\n\nHugging Face ki `peft` library ye sab kuch lines mein implement karti hai.',
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
          {
            question: 'Roughly what fraction of a model\'s parameters does LoRA typically train?',
            options: ['100%', 'Often under 1%', 'Exactly 50%', 'It trains zero parameters'],
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
          {
            question: 'Which Hugging Face library provides LoRA/QLoRA implementations?',
            options: ['datasets', 'peft', 'tokenizers', 'huggingface_hub'],
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
      {
        title: 'Catastrophic Forgetting & Small-Dataset Pitfalls',
        difficulty: 'hard',
        tags: ['catastrophic-forgetting', 'overfitting', 'learning-rate'],
        explanation: {
          english:
            "A major risk in fine-tuning is **catastrophic forgetting**: after training hard on a narrow task, the model can lose general abilities it had before — like a model fine-tuned only on medical Q&A suddenly writing worse code or losing casual conversation skill. This happens because gradient updates that improve the narrow task can overwrite weights that encoded unrelated knowledge.\n\nSmall fine-tuning datasets (a common real-world case — a few hundred examples) make this worse because a high learning rate or too many epochs can make the model memorise those exact examples instead of generalising. Mitigations: use a **low learning rate**, few epochs, PEFT/LoRA (which touches far fewer weights, naturally limiting forgetting), mix in some general-purpose examples alongside task-specific ones, and always monitor validation loss/general benchmarks, not just task metrics.",
          hinglish:
            "Fine-tuning ka ek bada risk hai **catastrophic forgetting**: ek narrow task pe hard train karne ke baad, model apni pehli general abilities kho sakta hai — jaise sirf medical Q&A pe fine-tune kiya gaya model achanak code kharab likhne lagta hai ya casual conversation skill kho deta hai. Ye isliye hota hai kyunki gradient updates jo narrow task improve karte hain wo unrelated knowledge encode karne wale weights ko overwrite kar sakte hain.\n\nChhote fine-tuning datasets (ek common real-world case — kuch sau examples) isko aur bura banate hain kyunki high learning rate ya bahut zyada epochs model ko un exact examples ko ratta maarne pe majboor kar sakte hain, generalise karne ke bajaye. Mitigations: **low learning rate** use karo, kam epochs, PEFT/LoRA (jo bahut kam weights touch karta hai, naturally forgetting limit karta hai), task-specific ke saath kuch general-purpose examples mix karo, aur hamesha validation loss/general benchmarks monitor karo, sirf task metrics nahi.",
        },
        dailyLifeExample:
          'Catastrophic forgetting waise hai jaise ek doctor jo ek naya rare disease padhne mein itna doob jaaye ki basic common-cold treatment bhool jaaye. Balance zaroori hai — naya seekhna, purana bhoolna nahi.',
        codeExample:
          '# Common mitigations against catastrophic forgetting\n# 1. Low learning rate (e.g. 1e-5 to 2e-4 with LoRA, not 1e-3)\n# 2. Few epochs (often 2-4 for small datasets, watch validation loss)\n# 3. Use LoRA/PEFT instead of full fine-tuning (fewer weights touched)\n# 4. Mix in a small % of general-purpose examples with your task data\n# 5. Evaluate on BOTH the target task AND a general benchmark before/after',
        keyPoints: [
          'Catastrophic forgetting: fine-tuning on a narrow task can degrade unrelated general abilities',
          'Small datasets + high learning rate/too many epochs increases the risk of memorisation over generalisation',
          'LoRA/PEFT naturally reduces forgetting by touching far fewer weights than full fine-tuning',
          'Mitigations: low learning rate, few epochs, mixing in general-purpose examples',
          'Always evaluate general capability, not just the target task, after fine-tuning',
        ],
        quiz: [
          {
            question: 'What is "catastrophic forgetting" in the context of fine-tuning?',
            options: [
              'The model forgets its own name',
              'The model loses previously-held general abilities after being fine-tuned hard on a narrow task',
              'The training data gets deleted',
              'The GPU runs out of memory',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which of these helps reduce catastrophic forgetting?',
            options: [
              'Using a very high learning rate',
              'Using LoRA/PEFT instead of full fine-tuning, since it touches far fewer weights',
              'Training for as many epochs as possible',
              'Using only task-specific data with no general examples',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why can a small fine-tuning dataset make forgetting/overfitting worse?',
            options: [
              'Small datasets always fail to load',
              'With few examples, a high learning rate or too many epochs can push the model to memorise those exact examples instead of generalising',
              'Small datasets require more GPUs',
              'It has no effect either way',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Alignment Fine-tuning: RLHF & DPO',
        difficulty: 'hard',
        tags: ['rlhf', 'dpo', 'alignment', 'preference-tuning'],
        explanation: {
          english:
            "Supervised fine-tuning (SFT) — the JSONL example approach covered earlier — teaches a model to imitate example answers. But how do you teach it to prefer *better* answers when there's no single correct one (e.g. which of two helpful responses is more helpful)? This is **alignment fine-tuning**, used after SFT to shape a model's behaviour using human preferences.\n\n**RLHF (Reinforcement Learning from Human Feedback)**: humans rank multiple model outputs for the same prompt; a separate **reward model** is trained to predict these preference scores; then the main model is fine-tuned with reinforcement learning to maximise the reward model's score. This is complex and was how the original ChatGPT-style models were aligned.\n\n**DPO (Direct Preference Optimization)** is a simpler, increasingly popular alternative: it skips training a separate reward model and reinforcement learning entirely, directly optimising the model on (prompt, preferred-answer, rejected-answer) triples using a clever loss function — achieving similar alignment results with much less complexity and compute.",
          hinglish:
            "Supervised fine-tuning (SFT) — pehle covered JSONL example approach — model ko example answers ki nakal karna sikhati hai. Par jab koi ek single correct answer na ho (jaise do helpful responses mein se kaunsa zyada helpful hai), tab model ko *better* answers prefer karna kaise sikhaoge? Ye hai **alignment fine-tuning**, jo SFT ke baad use hoti hai model ka behaviour human preferences se shape karne ke liye.\n\n**RLHF (Reinforcement Learning from Human Feedback)**: humans ek hi prompt ke multiple model outputs ko rank karte hain; ek alag **reward model** train hoti hai in preference scores predict karne ke liye; phir main model ko reinforcement learning se fine-tune kiya jaata hai taaki reward model ka score maximise ho. Ye complex hai aur original ChatGPT-style models isi se align hue the.\n\n**DPO (Direct Preference Optimization)** ek simpler, increasingly popular alternative hai: ye alag reward model train karna aur reinforcement learning dono skip kar deta hai, seedha (prompt, preferred-answer, rejected-answer) triples pe model ko ek clever loss function se optimise karta hai — kam complexity aur compute mein similar alignment results paata hai.",
        },
        dailyLifeExample:
          'SFT waise hai jaise student ko model answers dikhana copy karne ke liye. RLHF waise hai jaise ek judge panel rakhna jo har answer ko rank kare aur student ko un ranks ke hisaab se reward/train karna — complex par thorough. DPO waise hai jaise seedha "ye answer usse behtar hai" bata dena, bina judge panel banaye — simpler shortcut.',
        codeExample:
          '# DPO training data shape (conceptual)\n# Each row: one prompt, one preferred answer, one rejected answer\n{\n  "prompt": "Explain recursion simply.",\n  "chosen": "Recursion is when a function calls itself to solve smaller pieces of a problem...",\n  "rejected": "Recursion is a loop." // technically vague/incorrect, less helpful\n}\n\n# Using Hugging Face TRL\'s DPOTrainer (simplified)\n# from trl import DPOTrainer, DPOConfig\n# trainer = DPOTrainer(model=sft_model, args=DPOConfig(...), train_dataset=preference_ds)\n# trainer.train()',
        keyPoints: [
          'SFT teaches imitation of example answers; alignment fine-tuning teaches preference between answers',
          'RLHF: humans rank outputs -> train a reward model -> fine-tune with reinforcement learning to maximise reward',
          'DPO: directly optimises on (prompt, chosen, rejected) triples, skipping the separate reward model and RL loop',
          'DPO is simpler and cheaper than RLHF while achieving comparable alignment quality',
          'Alignment fine-tuning typically happens after SFT, not instead of it',
        ],
        quiz: [
          {
            question: 'What problem does alignment fine-tuning (RLHF/DPO) solve that plain SFT does not?',
            options: [
              'It makes training faster, nothing else',
              'It teaches the model to prefer better answers when there is no single correct answer, using human preference data',
              'It replaces the need for any training data',
              'It only works on images',
            ],
            correctIndex: 1,
          },
          {
            question: 'In RLHF, what is the role of the "reward model"?',
            options: [
              'It generates the final answers shown to users',
              'It is trained to predict human preference scores, and the main model is optimised to maximise its score',
              'It stores the training data',
              'It replaces the tokenizer',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the key simplification DPO offers compared to RLHF?',
            options: [
              'DPO uses more human labelers',
              'DPO skips training a separate reward model and the reinforcement learning loop, optimising directly on preference triples',
              'DPO does not require any preference data',
              'DPO only works on small models',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Deploying Fine-tuned Models: Merging & Serving Adapters',
        difficulty: 'medium',
        tags: ['deployment', 'inference', 'merging', 'serving'],
        explanation: {
          english:
            "Training a LoRA adapter is only half the job — you then need to serve it in production. You have two main options:\n\n1. **Load adapter + base model separately at inference** — keep the base model in memory once, and dynamically attach different LoRA adapters per request. This lets one deployed base model serve *many* fine-tuned behaviours (e.g. one adapter per customer), swapping adapters is fast and cheap.\n2. **Merge the adapter into the base weights** — combine the LoRA matrices back into the original weights to produce a single standalone model. This removes any adapter-swapping overhead and behaves like a normal model, but you lose the ability to easily swap tasks and must store a full copy per fine-tuned variant.\n\nChoose (1) when you need to serve many task variants efficiently from one base model (common in multi-tenant products); choose (2) when you're shipping one fixed fine-tuned model and want maximum inference simplicity/speed.",
          hinglish:
            "LoRA adapter train karna sirf aadha kaam hai — phir use production mein serve karna hota hai. Do main options hain:\n\n1. **Adapter + base model ko inference pe alag load karna** — base model ko ek baar memory mein rakho, aur har request pe alag-alag LoRA adapters dynamically attach karo. Isse ek deployed base model *bahut saare* fine-tuned behaviours serve kar sakta hai (jaise har customer ke liye ek adapter), adapters swap karna fast aur sasta hai.\n2. **Adapter ko base weights mein merge karna** — LoRA matrices ko original weights mein wapas combine karke ek single standalone model banao. Isse adapter-swapping ka overhead khatam ho jaata hai aur ye ek normal model jaisa behave karta hai, par task swap karna aasan nahi rehta aur har fine-tuned variant ke liye poori copy store karni padti hai.\n\n(1) tab choose karo jab tumhe ek base model se bahut saare task variants efficiently serve karne hain (multi-tenant products mein common); (2) tab choose karo jab tum ek fixed fine-tuned model ship kar rahe ho aur maximum inference simplicity/speed chahiye.",
        },
        dailyLifeExample:
          'Adapter ko alag rakhna waise hai jaise ek hi phone pe alag-alag SIM cards badalna — ek hardware, multiple identities. Merging waise hai jaise ek naya, permanently-configured phone banwa lena ek hi identity ke liye — simple par flexible nahi.',
        codeExample:
          '# Option 1: keep adapter separate (swap per request)\nfrom peft import PeftModel\nbase = AutoModelForCausalLM.from_pretrained("base-llm")\nmodel = PeftModel.from_pretrained(base, "customer-a-adapter")\n# swap: model = PeftModel.from_pretrained(base, "customer-b-adapter")\n\n# Option 2: merge adapter into base weights for standalone deployment\nmerged_model = model.merge_and_unload()\nmerged_model.save_pretrained("standalone-fine-tuned-model")\n# now deploy `standalone-fine-tuned-model` like any normal model',
        keyPoints: [
          'Serving a fine-tuned model needs either "adapter kept separate" or "adapter merged into base weights"',
          'Keeping adapters separate lets one base model serve many task variants efficiently (multi-tenant friendly)',
          'Merging produces a standalone model with no swap overhead, but loses easy task-switching',
          'merge_and_unload() in Hugging Face PEFT combines LoRA weights back into the base model',
          'Choose based on whether you need to serve many variants or ship one fixed fine-tuned model',
        ],
        quiz: [
          {
            question: 'What is the benefit of keeping a LoRA adapter separate from the base model at inference time?',
            options: [
              'It makes the model slower with no benefit',
              'One base model in memory can serve many different task-specific adapters, swapping them per request',
              'It is required by law',
              'It removes the need for a base model entirely',
            ],
            correctIndex: 1,
          },
          {
            question: 'What does merging a LoRA adapter into the base model produce?',
            options: [
              'Two separate models that must always be loaded together',
              'A single standalone model with the adapter weights combined in, with no swap overhead',
              'A smaller base model with no adapter',
              'A dataset',
            ],
            correctIndex: 1,
          },
          {
            question: 'When would you prefer keeping adapters separate rather than merging?',
            options: [
              'When you only ever need one fixed fine-tuned model forever',
              'When you need one base model to efficiently serve many different fine-tuned task variants (e.g. per customer)',
              'Never, merging is always better',
              'When you have no GPU',
            ],
            correctIndex: 1,
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
    frequency: 'common',
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

  // ─── When and Why to Fine-tune ───────────────────────────────────────────
  {
    question: 'What is fine-tuning?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Fine-tuning takes a model that has already been pre-trained on a huge general dataset and trains it FURTHER on your own smaller, task-specific examples — actually updating the model\'s weights. This is fundamentally different from prompting, which changes only the input text and leaves the model untouched. The pre-trained model already understands language, code, and reasoning; fine-tuning specialises that general capability toward your specific behaviour, style, or format.',
      hinglish:
        'Fine-tuning ek aisa model leti hai jo already ek huge general dataset pe pre-trained hai aur use tumhare khud ke chhote, task-specific examples pe AAGE train karti hai — actually model ke weights update karte hue. Ye prompting se fundamentally different hai, jo sirf input text badalta hai aur model ko untouched chhodta hai. Pre-trained model already language, code, aur reasoning samajhta hai; fine-tuning us general capability ko tumhare specific behaviour, style, ya format ki taraf specialise karti hai.',
    },
  },
  {
    question: 'When should you fine-tune instead of using prompting?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Fine-tune when prompting has genuinely hit a wall: you need HIGHLY consistent tone/format that prompts achieve only ~80% of the time, you have a narrow specialised task (classifying support tickets into your 12 internal categories), your prompt has grown so long that per-request cost/latency hurts, or you want a small cheap model to match a large expensive one on one specific task. Always exhaust prompting and few-shot examples FIRST — fine-tuning adds real cost, maintenance burden, and a training data pipeline.',
      hinglish:
        'Fine-tune tab karo jab prompting genuinely ek deewar se takra gayi ho: tumhe HIGHLY consistent tone/format chahiye jo prompts sirf ~80% baar achieve karte hain, tumhara ek narrow specialised task hai (support tickets ko tumhari 12 internal categories mein classify karna), tumhara prompt itna lamba ho gaya hai ki per-request cost/latency dukhati hai, ya tum chahte ho ek chhota sasta model ek bade mehnge model ko ek specific task pe match kare. PEHLE prompting aur few-shot examples exhaust karo — fine-tuning real cost, maintenance burden, aur ek training data pipeline add karti hai.',
    },
  },
  {
    question: 'What is the difference between fine-tuning and RAG?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'They solve orthogonal problems, and confusing them is the single most common mistake. RAG injects FACTS at query time by retrieving from your documents — use it for knowledge that changes (policies, product catalogues, current data), since updating means just re-indexing a document. Fine-tuning changes BEHAVIOUR — tone, output format, task-specific skill — which is baked into weights and requires retraining to change. Rule of thumb: RAG for what the model KNOWS, fine-tuning for how the model ACTS. Production systems often use both together.',
      hinglish:
        'Ye orthogonal problems solve karte hain, aur inhe confuse karna sabse common single mistake hai. RAG query time pe FACTS inject karta hai tumhare documents se retrieve karke — ise us knowledge ke liye use karo jo badalta hai (policies, product catalogues, current data), kyunki update karna matlab bas ek document re-index karna. Fine-tuning BEHAVIOUR badalti hai — tone, output format, task-specific skill — jo weights mein bake ho jaata hai aur badalne ke liye retraining chahiye. Rule of thumb: model KYA JAANTA hai uske liye RAG, model KAISE BEHAVE karta hai uske liye fine-tuning. Production systems aksar dono saath use karte hain.',
    },
  },
  {
    question: 'Why should you not fine-tune to add factual knowledge?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Three reasons. First, facts change — every update requires a full retraining cycle, whereas RAG needs only a re-index. Second, fine-tuning teaches PATTERNS, not a reliable lookup table: the model may confidently produce plausible-sounding but wrong variations of the facts it saw. Third, there is no citation trail, so you cannot verify where an answer came from. RAG gives you fresh, verifiable, source-attributed facts; fine-tuning gives you consistent behaviour. Use each for what it is good at.',
      hinglish:
        'Teen wajahein. Pehla, facts badalte hain — har update ke liye ek full retraining cycle chahiye, jabki RAG ko sirf ek re-index chahiye. Doosra, fine-tuning PATTERNS sikhati hai, ek reliable lookup table nahi: model confidently un facts ke plausible-sounding par galat variations produce kar sakta hai jo usne dekhe. Teesra, koi citation trail nahi hota, isliye tum verify nahi kar sakte ki ek answer kahan se aaya. RAG tumhe fresh, verifiable, source-attributed facts deta hai; fine-tuning consistent behaviour deti hai. Har ek ko uske strength ke liye use karo.',
    },
  },
  {
    question: 'What is the difference between pre-training and fine-tuning?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PRE-TRAINING builds a model from randomly initialised weights on an enormous general corpus (much of the internet), costing millions of dollars and thousands of GPU-months — it teaches general language, reasoning, and world knowledge. FINE-TUNING starts from those already-trained weights and continues training on a small task-specific dataset, costing dollars to hundreds of dollars and minutes to hours. Only a handful of organisations pre-train; almost everyone else fine-tunes or just prompts.',
      hinglish:
        'PRE-TRAINING ek model ko randomly initialised weights se ek enormous general corpus (internet ka zyadatar hissa) pe banati hai, millions of dollars aur hazaron GPU-months lagate hue — ye general language, reasoning, aur world knowledge sikhati hai. FINE-TUNING un already-trained weights se shuru hoti hai aur ek chhote task-specific dataset pe training continue karti hai, dollars se sau dollars aur minutes se ghante lagate hue. Sirf kuch organisations pre-train karte hain; almost baaki sab fine-tune karte hain ya bas prompt karte hain.',
    },
  },
  {
    question: 'What is instruction tuning?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Instruction tuning fine-tunes a base model on examples formatted as (instruction, response) pairs, teaching it to FOLLOW instructions rather than merely continue text. A raw pre-trained base model given "Write a poem about rain" might just continue with more instruction-like text, because it only learned to predict likely continuations. Instruction tuning is what turns a raw next-token predictor into a usable assistant, and is the first major step in producing models like ChatGPT or Claude.',
      hinglish:
        'Instruction tuning ek base model ko (instruction, response) pairs ke roop mein formatted examples pe fine-tune karti hai, use text ko merely continue karne ke bajaye instructions FOLLOW karna sikhati hai. Ek raw pre-trained base model ko "Write a poem about rain" dene pe wo bas zyada instruction-jaisa text continue kar sakta hai, kyunki usne sirf likely continuations predict karna seekha hai. Instruction tuning hi ek raw next-token predictor ko ek usable assistant mein badalti hai, aur ChatGPT ya Claude jaise models banane ka pehla major step hai.',
    },
  },
  {
    question: 'What is the JSONL format used for fine-tuning datasets?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'JSONL ("JSON Lines") stores one complete, self-contained JSON object per LINE, with no wrapping array and no commas between entries. It is the standard for fine-tuning because it streams efficiently — you can read and process one example at a time without loading a multi-gigabyte file into memory — and a single malformed line can be identified and skipped without invalidating the entire file. For chat fine-tuning, each line typically contains a `messages` array with system/user/assistant turns.',
      hinglish:
        'JSONL ("JSON Lines") per LINE ek complete, self-contained JSON object store karta hai, bina wrapping array aur bina entries ke beech commas ke. Ye fine-tuning ke liye standard hai kyunki ye efficiently stream hota hai — tum ek time mein ek example padh aur process kar sakte ho bina ek multi-gigabyte file memory mein load kiye — aur ek single malformed line identify aur skip ki ja sakti hai bina poori file invalidate kiye. Chat fine-tuning ke liye, har line mein typically ek `messages` array hota hai system/user/assistant turns ke saath.',
    },
  },
  {
    question: 'How many examples do you need to fine-tune a model?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Far fewer than people expect — quality dominates quantity. For a narrow, well-defined task (classification, consistent formatting, tone matching), 50-100 excellent examples often already show clear improvement, and 500-1000 is a strong dataset. For broader behavioural changes, low thousands. Ten thousand noisy, inconsistent examples will underperform 500 clean, consistent ones, because the model faithfully learns whatever inconsistency you feed it. Start small, measure, and add data only where evaluation shows a specific weakness.',
      hinglish:
        'Logon ki expectation se bahut kam — quality quantity pe dominate karti hai. Ek narrow, well-defined task (classification, consistent formatting, tone matching) ke liye, 50-100 excellent examples aksar already clear improvement dikhate hain, aur 500-1000 ek strong dataset hai. Broader behavioural changes ke liye, low thousands. Das hazaar noisy, inconsistent examples 500 clean, consistent wale se kharab perform karenge, kyunki model faithfully wahi inconsistency seekhta hai jo tum use khilate ho. Chhote se shuru karo, measure karo, aur data sirf wahan add karo jahan evaluation ek specific weakness dikhaye.',
    },
  },
  {
    question: 'What makes a good fine-tuning dataset?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Five properties. CONSISTENCY: identical formatting and style across all examples — the model learns your inconsistencies too. CORRECTNESS: every assistant response must be exactly what you want, since the model imitates it literally. DIVERSITY: cover the realistic range of inputs, including edge cases and awkward phrasings. BALANCE: avoid over-representing one category, or the model will over-predict it. A HELD-OUT SPLIT: keep validation/test data separate so you can measure real improvement rather than memorisation.',
      hinglish:
        'Paanch properties. CONSISTENCY: saare examples mein identical formatting aur style — model tumhari inconsistencies bhi seekhta hai. CORRECTNESS: har assistant response exactly wo hona chahiye jo tum chahte ho, kyunki model use literally imitate karta hai. DIVERSITY: inputs ki realistic range cover karo, edge cases aur awkward phrasings included. BALANCE: ek category ko over-represent karne se bacho, warna model use over-predict karega. Ek HELD-OUT SPLIT: validation/test data separate rakho taaki tum memorisation ke bajaye real improvement measure kar sako.',
    },
  },
  {
    question: 'What is catastrophic forgetting?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Catastrophic forgetting is when fine-tuning hard on a narrow task erases capabilities the model previously had — a model tuned exclusively on medical Q&A may start writing worse code or lose conversational ability. Mechanically, the gradient updates that improve the narrow task overwrite weights that encoded unrelated knowledge. Mitigations: a LOW learning rate, few epochs, PEFT/LoRA (which touches far fewer weights), mixing a small percentage of general-purpose examples into your dataset, and always evaluating general capability before and after — not just your target task.',
      hinglish:
        'Catastrophic forgetting tab hai jab ek narrow task pe hard fine-tuning wo capabilities mita deti hai jo model ke paas pehle thi — sirf medical Q&A pe tuned ek model kharab code likhna shuru kar sakta hai ya conversational ability kho sakta hai. Mechanically, wo gradient updates jo narrow task improve karte hain, un weights ko overwrite karte hain jinme unrelated knowledge encoded thi. Mitigations: ek LOW learning rate, kam epochs, PEFT/LoRA (jo bahut kam weights touch karta hai), apne dataset mein general-purpose examples ka ek chhota percentage mix karna, aur pehle aur baad mein general capability hamesha evaluate karna — sirf apna target task nahi.',
    },
  },

  // ─── PEFT: LoRA and friends ───────────────────────────────────────────
  {
    question: 'What is PEFT (Parameter-Efficient Fine-Tuning)?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PEFT is a family of methods that fine-tune a model by training only a tiny FRACTION of its parameters, freezing the rest. Full fine-tuning of a 7B model requires holding weights, gradients, and optimiser states for all 7 billion parameters — tens of gigabytes of GPU memory. PEFT methods (LoRA, prefix tuning, adapters, IA³) typically train under 1% of parameters while reaching quality close to full fine-tuning, which is what makes fine-tuning accessible on a single consumer GPU.',
      hinglish:
        'PEFT methods ka ek family hai jo ek model ko uske parameters ke sirf ek tiny FRACTION train karke fine-tune karta hai, baaki freeze karte hue. Ek 7B model ki full fine-tuning ke liye saare 7 billion parameters ke weights, gradients, aur optimiser states rakhne padte hain — das gigabytes GPU memory. PEFT methods (LoRA, prefix tuning, adapters, IA³) typically 1% se kam parameters train karte hain jabki full fine-tuning ke close quality tak pahunchte hain, jo fine-tuning ko ek single consumer GPU pe accessible banata hai.',
    },
  },
  {
    question: 'How does LoRA actually work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'LoRA (Low-Rank Adaptation) freezes the original weight matrix W and learns the UPDATE to it as the product of two small matrices: instead of training a full ΔW of size d x k, it trains A (d x r) and B (r x k) where r is a tiny rank like 8. Since r is far smaller than d and k, A and B together hold a fraction of the parameters. The insight is that the useful weight update during fine-tuning is empirically low-RANK — it does not need the full expressive space of ΔW.',
      hinglish:
        'LoRA (Low-Rank Adaptation) original weight matrix W ko freeze karta hai aur uske UPDATE ko do chhote matrices ke product ke roop mein seekhta hai: d x k size ka ek full ΔW train karne ke bajaye, ye A (d x r) aur B (r x k) train karta hai jahan r ek tiny rank hai jaise 8. Kyunki r, d aur k se bahut chhota hai, A aur B saath mein parameters ka ek fraction rakhte hain. Insight ye hai ki fine-tuning ke dauraan useful weight update empirically low-RANK hota hai — use ΔW ka full expressive space nahi chahiye.',
    },
  },
  {
    question: 'What is the rank (r) hyperparameter in LoRA and how do you choose it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The rank r sets the size of LoRA\'s adapter matrices and thus its capacity. Low r (4-8) means very few trainable parameters — fast, memory-light, and usually sufficient for style/tone/format tasks. Higher r (32-64+) gives more capacity for learning substantially new behaviour or complex domain knowledge, at more memory and higher overfitting risk on small datasets. Practical approach: start at r=8 or 16, and only increase if validation performance plateaus below what you need.',
      hinglish:
        'Rank r LoRA ke adapter matrices ka size aur isliye uski capacity set karta hai. Low r (4-8) matlab bahut kam trainable parameters — fast, memory-light, aur usually style/tone/format tasks ke liye kaafi. Higher r (32-64+) substantially naya behaviour ya complex domain knowledge seekhne ke liye zyada capacity deta hai, zyada memory aur chhote datasets pe higher overfitting risk ke cost pe. Practical approach: r=8 ya 16 se shuru karo, aur sirf tab badhao jab validation performance us level ke neeche plateau kare jo tumhe chahiye.',
    },
  },
  {
    question: 'What is lora_alpha and how does it relate to rank?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'lora_alpha is a scaling factor: LoRA\'s contribution is multiplied by alpha/r before being added to the frozen weights. Its purpose is to decouple the learning-rate-like magnitude of the adapter\'s effect from the rank, so that changing r does not force you to re-tune the learning rate. A very common convention is alpha = 2r (e.g. r=16, alpha=32), or alpha = r. Higher alpha relative to r means the adapter has a stronger influence on the final output.',
      hinglish:
        'lora_alpha ek scaling factor hai: LoRA ka contribution frozen weights mein add hone se pehle alpha/r se multiply hota hai. Iska purpose adapter ke effect ki learning-rate-jaisi magnitude ko rank se decouple karna hai, taaki r badalna tumhe learning rate re-tune karne pe majboor na kare. Ek bahut common convention hai alpha = 2r (jaise r=16, alpha=32), ya alpha = r. r ke relative higher alpha matlab adapter ka final output pe stronger influence hai.',
    },
  },
  {
    question: 'What are target_modules in LoRA configuration?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'target_modules specifies WHICH layers of the model get LoRA adapters attached. The common minimal choice is the attention query and value projections (`q_proj`, `v_proj`), which empirically captures most of the benefit at minimum cost. Targeting more modules — key/output projections and the MLP layers (`k_proj`, `o_proj`, `gate_proj`, `up_proj`, `down_proj`) — increases capacity and often quality, at the cost of more trainable parameters and memory. Targeting all linear layers is a reasonable default when memory allows.',
      hinglish:
        'target_modules specify karta hai ki model ki KAUNSI layers pe LoRA adapters attach hote hain. Common minimal choice attention query aur value projections (`q_proj`, `v_proj`) hai, jo empirically minimum cost pe zyadatar benefit capture karta hai. Zyada modules target karna — key/output projections aur MLP layers (`k_proj`, `o_proj`, `gate_proj`, `up_proj`, `down_proj`) — capacity aur aksar quality badhata hai, zyada trainable parameters aur memory ke cost pe. Jab memory allow kare tab saari linear layers target karna ek reasonable default hai.',
    },
  },
  {
    question: 'What is QLoRA and how is it different from LoRA?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'QLoRA = Quantised LoRA. It loads the frozen BASE model in 4-bit precision (instead of 16-bit), drastically cutting the memory needed just to hold the model, then trains normal LoRA adapters on top in higher precision. Since the base weights are frozen anyway, quantising them costs surprisingly little quality. The practical impact is dramatic: QLoRA is what allows fine-tuning a 65B-parameter model on a single 48GB GPU, which plain LoRA could not fit.',
      hinglish:
        'QLoRA = Quantised LoRA. Ye frozen BASE model ko 4-bit precision mein load karta hai (16-bit ke bajaye), sirf model rakhne ke liye chahiye memory drastically kam karte hue, phir uske upar higher precision mein normal LoRA adapters train karta hai. Kyunki base weights waise bhi frozen hain, unhe quantise karna surprisingly kam quality cost karta hai. Practical impact dramatic hai: QLoRA hi ek 65B-parameter model ko ek single 48GB GPU pe fine-tune karne deta hai, jo plain LoRA fit nahi kar sakta tha.',
    },
  },
  {
    question: 'What does it mean to merge a LoRA adapter, and when should you?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Merging mathematically folds the LoRA adapter\'s learned update back into the base weight matrix, producing a single standalone model with no adapter at inference. MERGE when you are shipping one fixed fine-tuned model and want the simplest, fastest inference path with zero adapter overhead. DO NOT merge when you want to serve many task-specific variants from one base model in memory — keeping adapters separate lets you hot-swap them per request, which is far more memory-efficient for multi-tenant serving.',
      hinglish:
        'Merging mathematically LoRA adapter ke learned update ko base weight matrix mein wapas fold karta hai, ek single standalone model produce karte hue jisme inference pe koi adapter nahi hota. MERGE karo jab tum ek fixed fine-tuned model ship kar rahe ho aur simplest, fastest inference path chahte ho zero adapter overhead ke saath. MERGE MAT karo jab tum ek base model se memory mein bahut saare task-specific variants serve karna chahte ho — adapters separate rakhna tumhe unhe per request hot-swap karne deta hai, jo multi-tenant serving ke liye bahut zyada memory-efficient hai.',
    },
  },
  {
    question: 'What are the main hyperparameters to tune when fine-tuning?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'In rough order of importance: LEARNING RATE (the single most impactful — too high destroys pre-trained knowledge, too low barely learns; typical LoRA range 1e-4 to 2e-4, full fine-tuning 1e-5 to 5e-5), NUMBER OF EPOCHS (usually 1-4; more risks memorisation), LoRA RANK and ALPHA, BATCH SIZE (larger is more stable, limited by memory — use gradient accumulation to simulate larger batches), and the WARMUP plus learning-rate SCHEDULE.',
      hinglish:
        'Roughly importance ke order mein: LEARNING RATE (sabse zyada impactful — bahut high pre-trained knowledge destroy karta hai, bahut low mushkil se seekhta hai; typical LoRA range 1e-4 se 2e-4, full fine-tuning 1e-5 se 5e-5), EPOCHS KI NUMBER (usually 1-4; zyada memorisation ka risk), LoRA RANK aur ALPHA, BATCH SIZE (bada zyada stable, memory se limited — bade batches simulate karne ke liye gradient accumulation use karo), aur WARMUP plus learning-rate SCHEDULE.',
    },
  },
  {
    question: 'How do you know if fine-tuning is overfitting?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The definitive signal is divergence between the two loss curves: TRAINING loss keeps falling while VALIDATION loss flattens and then rises. Behavioural symptoms: the model reproduces training examples almost verbatim, performs excellently on inputs resembling your data but poorly on slight variations, and may lose general ability. Fixes: fewer epochs (or early stopping on validation loss), a lower learning rate, more/more diverse data, lower LoRA rank, or adding dropout.',
      hinglish:
        'Definitive signal do loss curves ke beech divergence hai: TRAINING loss girta rehta hai jabki VALIDATION loss flatten hoke phir badhta hai. Behavioural symptoms: model training examples ko almost verbatim reproduce karta hai, tumhare data jaise inputs pe excellently perform karta hai par slight variations pe kharab, aur general ability kho sakta hai. Fixes: kam epochs (ya validation loss pe early stopping), ek lower learning rate, zyada/zyada diverse data, lower LoRA rank, ya dropout add karna.',
    },
  },
  {
    question: 'What is gradient accumulation and why is it useful for fine-tuning?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Gradient accumulation runs several forward/backward passes with a small batch, ACCUMULATING gradients without updating weights, then applies one update after N such steps. The effective batch size becomes (batch_size x N) while peak memory stays that of the small batch. This is essential when fine-tuning large models on limited GPU memory: you get the training stability of a batch size of 32 while only ever holding 4 examples in memory at once.',
      hinglish:
        'Gradient accumulation ek chhote batch ke saath kai forward/backward passes chalata hai, gradients ACCUMULATE karte hue bina weights update kiye, phir N aise steps ke baad ek update apply karta hai. Effective batch size (batch_size x N) ban jaata hai jabki peak memory chhote batch ki hi rehti hai. Ye limited GPU memory pe bade models fine-tune karte waqt essential hai: tumhe 32 batch size ki training stability milti hai jabki ek time pe sirf 4 examples memory mein hote hain.',
    },
  },

  // ─── Alignment ───────────────────────────────────────────
  {
    question: 'What is the difference between SFT, RLHF, and DPO?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'They are sequential stages of alignment. SFT (Supervised Fine-Tuning) teaches the model to IMITATE good example answers — but cannot express that one good answer is better than another. RLHF adds preference learning: humans rank multiple outputs, a separate reward model is trained to predict those rankings, then the main model is optimised via reinforcement learning to maximise reward — powerful but complex and unstable. DPO achieves similar alignment by optimising directly on (prompt, chosen, rejected) triples, skipping both the reward model and RL entirely.',
      hinglish:
        'Ye alignment ke sequential stages hain. SFT (Supervised Fine-Tuning) model ko achhe example answers IMITATE karna sikhati hai — par ye express nahi kar sakti ki ek achha answer doosre se better hai. RLHF preference learning add karta hai: humans multiple outputs rank karte hain, ek separate reward model un rankings ko predict karne ke liye train hota hai, phir main model reinforcement learning se reward maximise karne ke liye optimise hota hai — powerful par complex aur unstable. DPO similar alignment achieve karta hai directly (prompt, chosen, rejected) triples pe optimise karke, reward model aur RL dono poori tarah skip karte hue.',
    },
  },
  {
    question: 'Why is DPO often preferred over RLHF in practice?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'DPO removes two of RLHF\'s hardest components. It needs no separate REWARD MODEL (one less model to train, tune, and get wrong) and no REINFORCEMENT LEARNING loop (PPO is notoriously sensitive to hyperparameters and prone to instability or reward hacking). DPO reframes the same objective as a simple classification-style loss over preference pairs — far fewer moving parts, cheaper compute, and much easier to reproduce, while achieving comparable alignment quality on most tasks.',
      hinglish:
        'DPO RLHF ke do sabse mushkil components hata deta hai. Isse koi separate REWARD MODEL nahi chahiye (ek kam model train, tune, aur galat karne ke liye) aur koi REINFORCEMENT LEARNING loop nahi (PPO notoriously hyperparameters ke liye sensitive hai aur instability ya reward hacking ke liye prone). DPO usi objective ko preference pairs pe ek simple classification-jaise loss ke roop mein reframe karta hai — bahut kam moving parts, sasta compute, aur reproduce karna bahut easier, jabki zyadatar tasks pe comparable alignment quality achieve karte hue.',
    },
  },
  {
    question: 'What is a reward model in RLHF?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A reward model is a separate network trained to predict how much a human would PREFER a given response. It is trained on human comparison data (pairs where an annotator marked one response better), learning to output a scalar score. In RLHF it then acts as an automated stand-in for human judgement, scoring the main model\'s outputs during reinforcement learning so training can proceed at scale without a human rating every sample. Its weakness: the main model can learn to exploit flaws in the reward model — "reward hacking".',
      hinglish:
        'Ek reward model ek separate network hai jo predict karne ke liye trained hai ki ek human ek given response ko kitna PREFER karega. Ye human comparison data pe train hota hai (pairs jahan ek annotator ne ek response ko better mark kiya), ek scalar score output karna seekhte hue. RLHF mein ye phir human judgement ke ek automated stand-in ki tarah kaam karta hai, reinforcement learning ke dauraan main model ke outputs score karte hue taaki training scale pe chal sake bina har sample ko ek human rate kiye. Iski weakness: main model reward model ke flaws exploit karna seekh sakta hai — "reward hacking".',
    },
  },
  {
    question: 'What is reward hacking?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Reward hacking is when a model learns to maximise the reward SIGNAL rather than the intended behaviour, exploiting flaws in how reward is measured. Classic examples: if the reward model slightly favours longer answers, the model becomes needlessly verbose; if it favours confident phrasing, the model becomes overconfident even when wrong. It is the alignment version of Goodhart\'s Law — "when a measure becomes a target, it ceases to be a good measure". Mitigations include KL-divergence penalties keeping the model near its original behaviour, and continually refreshing preference data.',
      hinglish:
        'Reward hacking tab hai jab ek model intended behaviour ke bajaye reward SIGNAL maximise karna seekh leta hai, reward kaise measure hota hai uske flaws exploit karte hue. Classic examples: agar reward model thoda lambe answers ko favour kare, model needlessly verbose ban jaata hai; agar ye confident phrasing favour kare, model galat hone pe bhi overconfident ban jaata hai. Ye Goodhart\'s Law ka alignment version hai — "jab ek measure target ban jaata hai, wo ek achha measure nahi rehta". Mitigations mein KL-divergence penalties shamil hain jo model ko uske original behaviour ke paas rakhte hain, aur preference data continually refresh karna.',
    },
  },
  {
    question: 'What is preference data and how do you collect it?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Preference data consists of (prompt, chosen_response, rejected_response) triples — pairs where a human indicated which of two model outputs is better. Collection: generate 2+ responses per prompt (varying temperature or model), then have annotators pick the better one against explicit criteria (helpfulness, accuracy, tone, safety). Practical notes: pairwise comparison is far more reliable than asking for absolute 1-10 scores, and you must measure inter-annotator agreement — low agreement means your criteria are ambiguous, not that annotators are careless.',
      hinglish:
        'Preference data (prompt, chosen_response, rejected_response) triples se banta hai — pairs jahan ek human ne indicate kiya ki do model outputs mein se kaunsa better hai. Collection: per prompt 2+ responses generate karo (temperature ya model vary karke), phir annotators se explicit criteria (helpfulness, accuracy, tone, safety) ke against better wala pick karwao. Practical notes: pairwise comparison absolute 1-10 scores maangne se bahut zyada reliable hai, aur tumhe inter-annotator agreement measure karna padta hai — low agreement matlab tumhare criteria ambiguous hain, ye nahi ki annotators careless hain.',
    },
  },

  // ─── Evaluation & Production ───────────────────────────────────────────
  {
    question: 'How do you evaluate a fine-tuned model?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Layer several evaluations. (1) A HELD-OUT test set the model never saw, with task-appropriate metrics (accuracy/F1 for classification, exact-match or human review for generation). (2) Comparison against the BASE model and against a well-prompted base model — fine-tuning must beat the cheaper alternatives to be worth it. (3) A general-capability check to detect catastrophic forgetting. (4) LLM-as-judge or human review for open-ended output quality. (5) Real-world spot checks on actual production-style inputs before shipping.',
      hinglish:
        'Kai evaluations layer karo. (1) Ek HELD-OUT test set jo model ne kabhi nahi dekha, task-appropriate metrics ke saath (classification ke liye accuracy/F1, generation ke liye exact-match ya human review). (2) BASE model ke against aur ek well-prompted base model ke against comparison — fine-tuning ko sasti alternatives ko beat karna hi padega worth hone ke liye. (3) Catastrophic forgetting detect karne ke liye ek general-capability check. (4) Open-ended output quality ke liye LLM-as-judge ya human review. (5) Ship karne se pehle actual production-style inputs pe real-world spot checks.',
    },
  },
  {
    question: 'What baseline must a fine-tuned model beat to be worth deploying?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Not just "better than random" — it must beat the cheaper alternatives you would otherwise use: (1) the base model with a well-engineered prompt, (2) the base model with good few-shot examples, and (3) where relevant, a base model with RAG. Teams frequently fine-tune, see improvement over a NAIVE zero-shot prompt, and declare success — while a carefully written prompt would have matched it at zero training cost and zero maintenance burden. Always compare against your best non-fine-tuned effort.',
      hinglish:
        'Sirf "random se better" nahi — use un sasti alternatives ko beat karna hoga jo tum warna use karte: (1) base model ek well-engineered prompt ke saath, (2) base model achhe few-shot examples ke saath, aur (3) jahan relevant ho, base model RAG ke saath. Teams frequently fine-tune karti hain, ek NAIVE zero-shot prompt pe improvement dekhti hain, aur success declare kar deti hain — jabki ek carefully likha prompt use zero training cost aur zero maintenance burden pe match kar leta. Hamesha apne best non-fine-tuned effort ke against compare karo.',
    },
  },
  {
    question: 'What is LLM-as-a-judge evaluation and what are its limitations?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'LLM-as-a-judge uses a strong model to score or compare outputs against a rubric, making open-ended evaluation cheap and fast enough to run on every training iteration. Its limitations are real: judges show POSITION bias (favouring the first or second option), VERBOSITY bias (preferring longer answers), SELF-preference (favouring outputs from the same model family), and they inherit their own blind spots. Mitigations: randomise option order, use an explicit rubric, and periodically validate judge scores against human labels.',
      hinglish:
        'LLM-as-a-judge ek strong model use karke outputs ko ek rubric ke against score ya compare karta hai, open-ended evaluation ko sasta aur har training iteration pe chalane layak fast banate hue. Iski limitations real hain: judges POSITION bias dikhate hain (pehle ya doosre option ko favour karna), VERBOSITY bias (lambe answers prefer karna), SELF-preference (usi model family ke outputs favour karna), aur wo apne khud ke blind spots inherit karte hain. Mitigations: option order randomise karo, ek explicit rubric use karo, aur judge scores ko periodically human labels ke against validate karo.',
    },
  },
  {
    question: 'How do you deploy a fine-tuned model?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Two patterns. HOSTED: if you fine-tuned via a provider API (OpenAI, Anthropic, Bedrock), the model is served for you and you call it by its fine-tuned model ID — simplest, no infrastructure. SELF-HOSTED: serve the merged model or base+adapter using vLLM, TGI, or TorchServe in a container, usually on GPU instances. Self-hosting gives control, data privacy, and lower per-token cost at high volume, but you own scaling, monitoring, GPU capacity, and uptime.',
      hinglish:
        'Do patterns. HOSTED: agar tumne ek provider API (OpenAI, Anthropic, Bedrock) se fine-tune kiya, model tumhare liye serve hota hai aur tum use uske fine-tuned model ID se call karte ho — simplest, koi infrastructure nahi. SELF-HOSTED: merged model ya base+adapter ko vLLM, TGI, ya TorchServe se ek container mein serve karo, usually GPU instances pe. Self-hosting control, data privacy, aur high volume pe lower per-token cost deta hai, par scaling, monitoring, GPU capacity, aur uptime tumhare hain.',
    },
  },
  {
    question: 'How do you serve many fine-tuned variants efficiently?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Keep ONE copy of the base model in GPU memory and hot-swap lightweight LoRA adapters per request. Because an adapter is only a few megabytes while the base model is many gigabytes, this lets you serve dozens or hundreds of task- or customer-specific variants from a single GPU — where merging each into its own full model would need a separate multi-gigabyte copy for every variant. Serving frameworks like vLLM support multi-LoRA serving natively, making this the standard approach for multi-tenant fine-tuned products.',
      hinglish:
        'Base model ki EK copy GPU memory mein rakho aur per request lightweight LoRA adapters hot-swap karo. Kyunki ek adapter sirf kuch megabytes ka hai jabki base model kai gigabytes ka, isse tum ek single GPU se dozens ya sau task- ya customer-specific variants serve kar sakte ho — jahan har ek ko apne poore model mein merge karna har variant ke liye ek separate multi-gigabyte copy maangta. vLLM jaise serving frameworks multi-LoRA serving natively support karte hain, jo ise multi-tenant fine-tuned products ke liye standard approach banata hai.',
    },
  },
  {
    question: 'What is the difference between fine-tuning an open-source model and using a provider fine-tuning API?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'PROVIDER APIs (OpenAI, Anthropic, Bedrock) handle infrastructure, hyperparameters, and serving — you upload JSONL and receive a model ID. Fast and low-effort, but you get limited control, cannot inspect weights, are locked to that vendor, and your data leaves your environment. OPEN-SOURCE (Llama, Mistral, Qwen with PEFT) gives full control over hyperparameters and architecture, keeps data in your own environment, allows self-hosting, and is cheaper at high volume — but you own the GPUs, the training loop, and the operational burden.',
      hinglish:
        'PROVIDER APIs (OpenAI, Anthropic, Bedrock) infrastructure, hyperparameters, aur serving handle karte hain — tum JSONL upload karte ho aur ek model ID paate ho. Fast aur low-effort, par tumhe limited control milta hai, weights inspect nahi kar sakte, us vendor pe locked ho, aur tumhara data tumhare environment se bahar jaata hai. OPEN-SOURCE (Llama, Mistral, Qwen PEFT ke saath) hyperparameters aur architecture pe full control deta hai, data tumhare khud ke environment mein rakhta hai, self-hosting allow karta hai, aur high volume pe sasta hai — par GPUs, training loop, aur operational burden tumhare hain.',
    },
  },
  {
    question: 'What is a base model vs an instruct/chat model, and which should you fine-tune?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A BASE model is raw pre-trained — it only continues text and does not follow instructions. An INSTRUCT/CHAT model has already been instruction-tuned and aligned to converse and obey prompts. For most tasks, fine-tune the INSTRUCT variant: it already has instruction-following and safety behaviour you would otherwise have to teach from scratch. Fine-tune the BASE model only when you want to define behaviour entirely yourself and have enough data to instill instruction-following, or the chat model\'s existing style conflicts with your goal.',
      hinglish:
        'Ek BASE model raw pre-trained hai — ye sirf text continue karta hai aur instructions follow nahi karta. Ek INSTRUCT/CHAT model already instruction-tuned aur converse karne aur prompts obey karne ke liye aligned hai. Zyadatar tasks ke liye, INSTRUCT variant fine-tune karo: iske paas already instruction-following aur safety behaviour hai jo tumhe warna scratch se sikhana padta. BASE model sirf tab fine-tune karo jab tum behaviour poori tarah khud define karna chahte ho aur instruction-following instill karne ke liye kaafi data ho, ya chat model ka existing style tumhare goal se conflict kare.',
    },
  },
  {
    question: 'How much does fine-tuning cost?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Far less than people expect for LoRA/QLoRA. A 7B model on a few thousand examples typically costs a handful of dollars in GPU rental (a few hours on a single A100/consumer GPU). Provider fine-tuning APIs charge per training token — often tens of dollars for a modest dataset. Full fine-tuning of a large model, or RLHF with a reward model, escalates to thousands. The dominant ONGOING cost, however, is usually not training but INFERENCE plus the engineering time to maintain the data pipeline and re-evaluate after each retrain.',
      hinglish:
        'LoRA/QLoRA ke liye logon ki expectation se bahut kam. Ek 7B model kuch hazaar examples pe typically kuch dollars GPU rental mein lagta hai (ek single A100/consumer GPU pe kuch ghante). Provider fine-tuning APIs per training token charge karte hain — ek modest dataset ke liye aksar das dollars. Ek bade model ki full fine-tuning, ya reward model ke saath RLHF, hazaron tak escalate hota hai. Dominant ONGOING cost, halaanki, usually training nahi balki INFERENCE plus data pipeline maintain karne aur har retrain ke baad re-evaluate karne ka engineering time hota hai.',
    },
  },
  {
    question: 'When should you NOT fine-tune?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Do not fine-tune when: the goal is adding facts that change (use RAG), you have not seriously tried prompt engineering and few-shot examples yet, you have fewer than ~50 high-quality examples, you cannot define a clear evaluation to prove it helped, or the requirement will change frequently (each change means a retraining cycle). Also avoid it when a well-prompted smaller model already meets your quality bar — fine-tuning adds permanent maintenance cost that must be justified.',
      hinglish:
        'Fine-tune mat karo jab: goal aise facts add karna hai jo badalte hain (RAG use karo), tumne seriously prompt engineering aur few-shot examples try nahi kiye, tumhare paas ~50 se kam high-quality examples hain, tum ek clear evaluation define nahi kar sakte jo prove kare ki isne madad ki, ya requirement frequently badlegi (har change matlab ek retraining cycle). Ise tab bhi avoid karo jab ek well-prompted chhota model already tumhara quality bar meet karta ho — fine-tuning permanent maintenance cost add karti hai jise justify karna padta hai.',
    },
  },
  {
    question: 'What is domain adaptation vs task-specific fine-tuning?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'DOMAIN adaptation continues training on a large corpus of unlabelled domain text (legal contracts, medical notes, your codebase) so the model absorbs the vocabulary, style, and conventions of that field — this is continued PRE-training, not instruction tuning. TASK-SPECIFIC fine-tuning trains on labelled input-output pairs for one job (classify this ticket, summarise in this format). They compose: adapt to the domain first, then task-tune. For most applications, task-specific tuning alone is sufficient, since domain adaptation needs a large corpus to be worthwhile.',
      hinglish:
        'DOMAIN adaptation unlabelled domain text ke ek bade corpus pe training continue karti hai (legal contracts, medical notes, tumhara codebase) taaki model us field ki vocabulary, style, aur conventions absorb kare — ye continued PRE-training hai, instruction tuning nahi. TASK-SPECIFIC fine-tuning ek kaam ke liye labelled input-output pairs pe train karti hai (is ticket ko classify karo, is format mein summarise karo). Ye compose hote hain: pehle domain adapt karo, phir task-tune karo. Zyadatar applications ke liye, akele task-specific tuning kaafi hai, kyunki domain adaptation ko worthwhile hone ke liye ek bada corpus chahiye.',
    },
  },
  {
    question: 'What is the role of a system prompt in a fine-tuning dataset?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'The system prompt in your training examples sets the persona and rules the model learns to associate with the task. The critical rule is CONSISTENCY between training and inference: if you train with a specific system prompt, use the SAME one in production — a mismatch degrades quality, sometimes badly, because the model learned behaviour conditioned on that context. Some teams deliberately train with a short or empty system prompt so the fine-tuned behaviour becomes the default and does not depend on remembering the exact prompt later.',
      hinglish:
        'Tumhare training examples mein system prompt wo persona aur rules set karta hai jinhe model task ke saath associate karna seekhta hai. Critical rule training aur inference ke beech CONSISTENCY hai: agar tum ek specific system prompt ke saath train karte ho, production mein WAHI use karo — ek mismatch quality degrade karta hai, kabhi badly, kyunki model ne us context pe conditioned behaviour seekha hai. Kuch teams deliberately ek short ya empty system prompt ke saath train karti hain taaki fine-tuned behaviour default ban jaaye aur baad mein exact prompt yaad rakhne pe depend na kare.',
    },
  },
  {
    question: 'How do you handle imbalanced classes in a fine-tuning dataset?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'If 90% of your examples are one category, the model learns to over-predict it and may barely learn the rare classes. Options: OVERSAMPLE minority classes (duplicate or augment), UNDERSAMPLE the majority (throw away data — simple but wasteful), apply CLASS WEIGHTING in the loss so rare-class errors count more, or best of all, collect more genuine minority examples. Critically, evaluate with per-class precision/recall, never overall accuracy — a model predicting only the majority class can look 90% "accurate" while being useless.',
      hinglish:
        'Agar tumhare 90% examples ek category ke hain, model use over-predict karna seekh leta hai aur rare classes mushkil se seekh sakta hai. Options: minority classes ko OVERSAMPLE karo (duplicate ya augment), majority ko UNDERSAMPLE karo (data phenk do — simple par wasteful), loss mein CLASS WEIGHTING apply karo taaki rare-class errors zyada count hon, ya sabse behtar, zyada genuine minority examples collect karo. Critically, per-class precision/recall se evaluate karo, kabhi overall accuracy se nahi — sirf majority class predict karne wala model 90% "accurate" lag sakta hai jabki useless ho.',
    },
  },
  {
    question: 'What is data contamination in fine-tuning evaluation?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Contamination is when test examples leak into training, making evaluation scores meaninglessly optimistic. It happens more easily than expected: duplicate or near-duplicate examples split across train and test, splitting randomly when examples share an underlying entity (multiple tickets from one customer), or — subtly — the base model having already seen your public benchmark during pre-training. Guards: deduplicate before splitting, split by entity/group rather than row, and prefer a freshly written private test set over a public benchmark.',
      hinglish:
        'Contamination tab hai jab test examples training mein leak ho jaate hain, evaluation scores ko meaninglessly optimistic banate hue. Ye expectation se easier hota hai: duplicate ya near-duplicate examples train aur test mein split ho jaate hain, randomly split karna jab examples ek underlying entity share karte hain (ek customer se multiple tickets), ya — subtly — base model ne pre-training ke dauraan tumhara public benchmark already dekh liya ho. Guards: split karne se pehle deduplicate karo, row ke bajaye entity/group se split karo, aur ek public benchmark ke bajaye ek freshly likha private test set prefer karo.',
    },
  },
  {
    question: 'How often should you re-fine-tune a model?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Only when there is a REASON, not on a fixed calendar. Legitimate triggers: monitored quality dropping below your threshold, a meaningful volume of new labelled data (especially corrections of the model\'s past mistakes), a change in the desired behaviour or output format, or an upgraded base model worth migrating to. Retraining without a trigger burns cost and risks regression. Crucially, always re-evaluate against the SAME held-out golden set so improvements are genuinely comparable across versions.',
      hinglish:
        'Sirf tab jab ek WAJAH ho, ek fixed calendar pe nahi. Legitimate triggers: monitored quality tumhare threshold ke neeche girna, naye labelled data ka ek meaningful volume (especially model ki past mistakes ke corrections), desired behaviour ya output format mein ek change, ya ek upgraded base model jispe migrate karna worth ho. Bina trigger retrain karna cost jalata hai aur regression ka risk leta hai. Crucially, hamesha WAHI held-out golden set ke against re-evaluate karo taaki improvements versions ke across genuinely comparable hon.',
    },
  },
  {
    question: 'What is model distillation and how does it relate to fine-tuning?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Distillation trains a SMALL model to imitate a LARGE one. A very practical modern pattern: use a strong expensive model (GPT-4/Claude Opus class) to generate high-quality responses for your task, then FINE-TUNE a small cheap model on those outputs. You end up with a model approaching the large one\'s quality on your specific task at a fraction of the inference cost and latency. Caveat: check the provider\'s terms — many prohibit using their outputs to train competing models.',
      hinglish:
        'Distillation ek CHHOTE model ko ek BADE ki nakal karne ke liye train karti hai. Ek bahut practical modern pattern: ek strong expensive model (GPT-4/Claude Opus class) use karke apne task ke liye high-quality responses generate karo, phir un outputs pe ek chhota sasta model FINE-TUNE karo. Tumhe ek aisa model milta hai jo tumhare specific task pe bade wale ki quality ke paas pahunchta hai inference cost aur latency ke ek fraction pe. Caveat: provider ki terms check karo — bahut saare apne outputs se competing models train karne se prohibit karte hain.',
    },
  },
  {
    question: 'What is synthetic data generation for fine-tuning?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Synthetic data generation uses a strong LLM to CREATE training examples when you lack real labelled data — generating diverse inputs and their ideal responses. It is genuinely useful for bootstrapping and covering rare edge cases you have no real examples of. Risks are real: generated data inherits the generator\'s biases and errors, and tends to be less diverse than real data, so training only on it can produce a narrow model. Best practice: use synthetic data to augment real examples, and always human-review a sample for correctness.',
      hinglish:
        'Synthetic data generation ek strong LLM use karke training examples BANATA hai jab tumhare paas real labelled data na ho — diverse inputs aur unke ideal responses generate karte hue. Ye bootstrapping aur un rare edge cases cover karne ke liye genuinely useful hai jinke real examples tumhare paas nahi. Risks real hain: generated data generator ke biases aur errors inherit karta hai, aur real data se kam diverse hota hai, isliye sirf uspe train karna ek narrow model produce kar sakta hai. Best practice: real examples augment karne ke liye synthetic data use karo, aur hamesha correctness ke liye ek sample human-review karo.',
    },
  },
  {
    question: 'What GPU memory do you need to fine-tune a model?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Roughly: FULL fine-tuning needs about 16 bytes per parameter (weights + gradients + Adam optimiser states in fp16/32) — so a 7B model needs ~112GB, far beyond one consumer GPU. LoRA cuts this dramatically since gradients and optimiser states exist only for the tiny adapter: a 7B model fits in ~16GB. QLoRA loads the frozen base in 4-bit, bringing a 7B model to roughly 6-8GB — feasible on a single consumer card. This is precisely why PEFT made fine-tuning accessible outside large labs.',
      hinglish:
        'Roughly: FULL fine-tuning ko per parameter about 16 bytes chahiye (weights + gradients + Adam optimiser states fp16/32 mein) — isliye ek 7B model ko ~112GB chahiye, ek consumer GPU se bahut zyada. LoRA ise dramatically kam karta hai kyunki gradients aur optimiser states sirf tiny adapter ke liye hote hain: ek 7B model ~16GB mein fit ho jaata hai. QLoRA frozen base ko 4-bit mein load karta hai, ek 7B model ko roughly 6-8GB pe le aata hai — ek single consumer card pe feasible. Yahi exactly wajah hai ki PEFT ne fine-tuning ko bade labs ke bahar accessible banaya.',
    },
  },
  {
    question: 'What is prompt tuning / prefix tuning, and how does it differ from LoRA?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Prompt tuning and prefix tuning learn continuous "soft prompt" VECTORS prepended to the input, while leaving every model weight — including attention projections — completely frozen. They are even lighter than LoRA (only a handful of vectors to store) and trivially swappable per task. The tradeoff: because they only steer the model through its input rather than modifying its internal transformations, they generally have less capacity than LoRA and tend to underperform it on tasks needing substantial behavioural change.',
      hinglish:
        'Prompt tuning aur prefix tuning continuous "soft prompt" VECTORS seekhte hain jo input ke aage prepend hote hain, jabki har model weight — attention projections included — poori tarah frozen chhodte hain. Ye LoRA se bhi lighter hain (store karne ke liye sirf kuch vectors) aur per task trivially swappable. Tradeoff: kyunki wo model ko uske internal transformations modify karne ke bajaye sirf uske input ke through steer karte hain, unki capacity generally LoRA se kam hoti hai aur wo substantial behavioural change chahne wale tasks pe usse kharab perform karte hain.',
    },
  },
  {
    question: 'What is continued pre-training and when is it used?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Continued (or "further") pre-training keeps training a base model with the ORIGINAL next-token prediction objective on a large corpus of unlabelled domain text — no instruction/response pairs involved. It is used to inject deep domain fluency: legal, biomedical, financial language, or a large proprietary codebase, where the base model\'s vocabulary and conventions are genuinely inadequate. It needs a substantial corpus (typically hundreds of millions of tokens) to be worthwhile, and is normally followed by instruction tuning to restore assistant behaviour.',
      hinglish:
        'Continued (ya "further") pre-training ek base model ko ORIGINAL next-token prediction objective ke saath unlabelled domain text ke ek bade corpus pe train karti rehti hai — koi instruction/response pairs involved nahi. Ye deep domain fluency inject karne ke liye use hoti hai: legal, biomedical, financial language, ya ek bada proprietary codebase, jahan base model ki vocabulary aur conventions genuinely inadequate hain. Ise worthwhile hone ke liye ek substantial corpus chahiye (typically sau million tokens), aur iske baad normally assistant behaviour restore karne ke liye instruction tuning hoti hai.',
    },
  },
  {
    question: 'How do you debug a fine-tuning run that is not improving?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Work down a checklist. First prove the loop works: can the model OVERFIT a tiny batch of 10 examples? If not, the bug is in your code/data plumbing, not the hyperparameters. Then check: is the loss decreasing at all (if not, learning rate may be far too low or the data format wrong)? Is the data formatted exactly as the model\'s chat template expects (a common silent failure)? Are labels masked correctly so loss is computed only on the response, not the prompt? Is the learning rate too high (loss spiking/NaN)? Are you actually training the layers you think you are?',
      hinglish:
        'Ek checklist neeche kaam karo. Pehle prove karo ki loop kaam karta hai: kya model 10 examples ke ek tiny batch ko OVERFIT kar sakta hai? Agar nahi, bug tumhare code/data plumbing mein hai, hyperparameters mein nahi. Phir check karo: loss bilkul bhi ghat raha hai (agar nahi, learning rate bahut kam ho sakta hai ya data format galat)? Data exactly us tarah formatted hai jaise model ka chat template expect karta hai (ek common silent failure)? Labels correctly masked hain taaki loss sirf response pe compute ho, prompt pe nahi? Learning rate bahut high hai (loss spiking/NaN)? Tum actually wahi layers train kar rahe ho jo tum sochte ho?',
    },
  },
  {
    question: 'What is loss masking in instruction fine-tuning?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Loss masking excludes the PROMPT tokens from the loss calculation, so the model is trained to predict only the RESPONSE. Without it, the model spends capacity learning to generate the user\'s questions and system prompt — wasted effort at best, and actively harmful since it can make the model start producing prompt-like text at inference. Most fine-tuning libraries handle this automatically for chat formats, but getting it wrong in custom training code is a classic subtle bug that quietly degrades results.',
      hinglish:
        'Loss masking PROMPT tokens ko loss calculation se exclude karta hai, taaki model sirf RESPONSE predict karne ke liye train ho. Iske bina, model capacity user ke questions aur system prompt generate karna seekhne mein kharch karta hai — best case wasted effort, aur actively harmful kyunki ye model ko inference pe prompt-jaisa text produce karna shuru karwa sakta hai. Zyadatar fine-tuning libraries chat formats ke liye ise automatically handle karti hain, par custom training code mein ise galat karna ek classic subtle bug hai jo chupchaap results degrade karta hai.',
    },
  },
  {
    question: 'What is a chat template and why does it matter for fine-tuning?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A chat template is the exact token format a model expects for multi-turn conversation — the special tokens and structure marking system, user, and assistant turns (each model family uses a different one). It matters enormously because you must format training data with the SAME template the model was originally trained with, and use that identical template at inference. A mismatch is one of the most common causes of a fine-tune that trains without errors yet performs badly, because the model no longer recognises where turns begin and end.',
      hinglish:
        'Ek chat template wo exact token format hai jo ek model multi-turn conversation ke liye expect karta hai — wo special tokens aur structure jo system, user, aur assistant turns mark karte hain (har model family ek different use karta hai). Ye enormously matter karta hai kyunki tumhe training data ko usi TEMPLATE se format karna padta hai jisse model originally train hua tha, aur inference pe wahi identical template use karna padta hai. Ek mismatch un sabse common causes mein se ek hai jisse ek fine-tune bina errors train hoke bhi kharab perform karta hai, kyunki model ab pehchaanta nahi ki turns kahan shuru aur khatam hote hain.',
    },
  },
  {
    question: 'How do you protect sensitive data when fine-tuning?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Fine-tuned models can MEMORISE and later regurgitate training data, so treat your dataset as a disclosure risk. Practices: strip or pseudonymise PII before training; deduplicate, since repeated examples are memorised far more readily; prefer self-hosted or in-region training so data never leaves your boundary; check the provider\'s data-retention and training-use terms if using an API; test the finished model by probing for memorised secrets; and apply access controls to the model itself, since it now encodes your data.',
      hinglish:
        'Fine-tuned models training data MEMORISE karke baad mein ugal sakte hain, isliye apne dataset ko ek disclosure risk samjho. Practices: training se pehle PII strip ya pseudonymise karo; deduplicate karo, kyunki repeated examples bahut zyada aasani se memorise hote hain; self-hosted ya in-region training prefer karo taaki data tumhari boundary se bahar na jaaye; API use kar rahe ho to provider ki data-retention aur training-use terms check karo; finished model ko memorised secrets ke liye probe karke test karo; aur model pe khud access controls lagao, kyunki wo ab tumhara data encode karta hai.',
    },
  },
  {
    question: 'What is the difference between LoRA and full fine-tuning in terms of final quality?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'For most practical tasks — style, tone, format, classification, domain-specific response patterns — LoRA reaches quality close to or matching full fine-tuning at a tiny fraction of the compute. Full fine-tuning retains an edge when the task requires substantially reshaping the model\'s capabilities rather than steering existing ones, or when you have a very large high-quality dataset that can actually exploit all those parameters. Given the enormous cost difference, the sensible default is to start with LoRA and only consider full fine-tuning if evaluation shows LoRA plateauing below requirements.',
      hinglish:
        'Zyadatar practical tasks ke liye — style, tone, format, classification, domain-specific response patterns — LoRA compute ke ek tiny fraction pe full fine-tuning ke close ya usse match karti quality tak pahunch jaati hai. Full fine-tuning ka edge tab rehta hai jab task ko existing capabilities steer karne ke bajaye model ki capabilities substantially reshape karni ho, ya jab tumhare paas ek bahut bada high-quality dataset ho jo actually un saare parameters ko exploit kar sake. Enormous cost difference ko dekhte hue, sensible default hai LoRA se shuru karna aur full fine-tuning sirf tab consider karna jab evaluation dikhaye ki LoRA requirements ke neeche plateau kar rahi hai.',
    },
  },
];
