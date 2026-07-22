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
