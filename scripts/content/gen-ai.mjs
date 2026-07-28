// Generative AI curriculum — beginner -> intermediate -> advanced.
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
  title: 'Generative AI',
  slug: 'gen-ai',
  description:
    'LLMs se le kar prompting, RAG, embeddings, agents aur responsible AI tak — Generative AI samjho aur usse apps banao. English + Hinglish, desi examples aur code ke saath.',
  icon: '🤖',
  tags: ['gen-ai', 'llm', 'ai', 'prompting', 'rag'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 16,
};

const absoluteBasics = [
  {
    title: 'Your First Steps into AI',
    level: 'beginner',
    description: 'Bilkul zero se shuru — AI, ML, aur neural networks ko baby steps mein samjho, bina kisi prior knowledge ke.',
    concepts: [
      {
        title: 'What is Artificial Intelligence (AI)?',
        difficulty: 'easy',
        tags: ['ai', 'basics', 'first-step'],
        explanation: {
          english:
            "Let's start from absolute zero. **Artificial Intelligence (AI)** is the broadest term — it simply means making a computer do something that normally needs human intelligence: recognising a face in a photo, understanding spoken language, playing chess, or writing a sentence. AI is not one specific technology — it's a GOAL. Different techniques have been used to achieve this goal over the decades: simple hand-written rules in the 1960s ('if the light is red, stop'), then Machine Learning in the 1990s-2010s (computers learning patterns from data instead of being told exact rules), and now Generative AI (computers that can CREATE new things, not just recognise or sort them). Think of AI as the entire umbrella; everything else we'll learn in this course fits somewhere underneath it.",
          hinglish:
            "Chalo bilkul zero se shuru karte hain. **Artificial Intelligence (AI)** sabse broad term hai — iska matlab simply hai ek computer se aisa kaam karwana jiske liye normally human intelligence chahiye hoti hai: photo mein face pehchaanna, boli hui language samajhna, chess khelna, ya ek sentence likhna. AI koi ek specific technology nahi hai — ye ek GOAL hai. Is goal ko achieve karne ke liye dashकों mein alag-alag techniques use hui hain: 1960s mein simple hand-written rules ('agar light red hai, ruk jao'), phir 1990s-2010s mein Machine Learning (computers data se patterns seekhte hain, unhe exact rules bataye bina), aur ab Generative AI (computers jo NAYI cheezein bana sakte hain, sirf recognise ya sort nahi karte). AI ko poori umbrella samjho; is course mein hum jo bhi seekhenge wo iske neeche kahin fit hoga.",
        },
        dailyLifeExample:
          "AI waise hai jaise 'transportation' ek broad word hai — cycle, car, train, plane sab transportation ke tareeke hain, par sab alag hain. Waise hi, rule-based systems, Machine Learning, aur Generative AI sab AI ko achieve karne ke alag tareeke hain — sab ka goal same hai (smart behaviour), par kaam karne ka tareeka alag.",
        codeExample:
          "# No code yet — just building intuition! Here's the mental map we'll build in this course:\n#\n# ARTIFICIAL INTELLIGENCE (the big goal: 'make computers act smart')\n#   |\n#   +-- Rule-based systems (1960s-80s): humans write exact if-then rules\n#   |\n#   +-- Machine Learning (1990s-2010s): computer learns patterns from examples\n#         |\n#         +-- Deep Learning: ML using 'neural networks' (we'll cover this next)\n#               |\n#               +-- Generative AI (2020s): models that CREATE new text/images/audio\n#                     (this is what the rest of this course is about!)",
        keyPoints: [
          'AI is a GOAL (make computers act smart), not one single technology',
          'Different eras used different techniques to reach that goal: rules, then ML, then deep learning, then generative AI',
          'Generative AI is the newest, most advanced branch of the AI family tree',
          'Everything in this course builds on this one big idea, step by step',
        ],
        quiz: [
          {
            question: 'What is Artificial Intelligence best described as?',
            options: [
              'One specific software program',
              'A broad goal — making computers do things that normally need human intelligence',
              'Only robots that look like humans',
              'A programming language',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which came FIRST in the history of AI techniques?',
            options: ['Generative AI', 'Simple hand-written rules', 'Deep learning', 'Large Language Models'],
            correctIndex: 1,
          },
          {
            question: 'Where does Generative AI sit in the AI "family tree"?',
            options: [
              'It is completely unrelated to AI',
              'It is the oldest form of AI',
              'It is a modern, advanced branch that grew out of Machine Learning and Deep Learning',
              'It replaced the need for Machine Learning entirely',
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'What is Machine Learning? The Simplest Explanation',
        difficulty: 'easy',
        tags: ['ml', 'basics', 'first-step'],
        explanation: {
          english:
            "Here's the simplest possible way to understand Machine Learning (ML): instead of a programmer writing exact rules ('if X then Y'), you show the computer LOTS of examples, and it figures out the pattern itself. Say you want a program that tells cats from dogs in photos. The OLD way: a human tries to write rules like 'if it has pointy ears and whiskers, it's a cat' — but this breaks constantly (some dogs have pointy ears too!). The ML way: you show the computer 10,000 photos already labelled 'cat' or 'dog', and it automatically learns which visual patterns tend to mean 'cat' — without anyone writing that rule by hand. This shift — from 'human writes the rules' to 'computer learns the rules from examples' — is THE single most important idea in modern AI, and everything else in this course builds on it.",
          hinglish:
            "Machine Learning (ML) samajhne ka sabse simple tareeka: programmer exact rules likhne ke bajaye ('agar X toh Y'), tum computer ko BAHUT saare examples dikhate ho, aur wo khud pattern figure out kar leta hai. Socho tumhe ek program chahiye jo photos mein cats aur dogs bataye. PURANA tareeka: ek insaan rules likhne ki koshish karta hai jaise 'agar pointy ears aur whiskers hain, toh cat hai' — par ye baar-baar fail hota hai (kuch dogs ke bhi pointy ears hote hain!). ML tareeka: tum computer ko 10,000 photos dikhate ho jo already 'cat' ya 'dog' labelled hain, aur wo automatically seekh leta hai kaunse visual patterns 'cat' matlab hote hain — bina koi rule haath se likhe. Ye shift — 'insaan rules likhta hai' se 'computer examples se rules seekhta hai' — modern AI ka SABSE important idea hai, aur is course mein baaki sab kuch isi pe bana hai.",
        },
        dailyLifeExample:
          "ML waise hai jaise ek bachhe ko cooking sikhana bina recipe diye — bas use 100 alag-alag samosas khilao aur bolo 'ye achha hai' ya 'ye kharab hai'. Kuch time baad, bachcha khud samajh jaayega ki achha samosa banane mein kya common hai — bina kisi ne exact recipe (rule) bataye. Yahi ML karta hai, par data ke saath.",
        codeExample:
          "# OLD way: human writes exact rules (fragile, breaks easily)\ndef is_cat_old_way(image):\n    if image.has_pointy_ears and image.has_whiskers:\n        return True   # but many dogs also have pointy ears! this rule is bad.\n    return False\n\n# ML way: computer LEARNS the pattern from thousands of labelled examples\n# (conceptual — this is what libraries like scikit-learn/PyTorch do internally)\n# 1. Show the computer 10,000 photos, each labelled 'cat' or 'dog'\n# 2. The computer adjusts its internal 'pattern detector' bit by bit\n#    until it gets better and better at matching photos to labels\n# 3. Now show it a BRAND NEW photo it has never seen\n#    -> it applies the pattern it learned, and guesses 'cat' or 'dog'\n# No human ever wrote down the exact rule for 'what makes a cat a cat'!",
        keyPoints: [
          'Traditional programming: humans write exact rules by hand',
          'Machine Learning: the computer learns the rules itself from many labelled examples',
          'This shift (rules -> learning from data) is the foundational idea behind all modern AI',
          'ML models get better with more/better examples, just like people get better with more practice',
        ],
        quiz: [
          {
            question: 'What is the key difference between traditional programming and Machine Learning?',
            options: [
              'ML programs run faster',
              'In traditional programming, humans write exact rules; in ML, the computer learns the rules itself from examples',
              'ML does not need a computer',
              'There is no real difference',
            ],
            correctIndex: 1,
          },
          {
            question: 'In the cat-vs-dog example, what does the computer need to learn from ML?',
            options: [
              'A dictionary of animal names',
              'Patterns in labelled photos that tend to distinguish cats from dogs, without an explicit hand-written rule',
              'The exact biological definition of a cat',
              'Nothing, ML does not require any examples',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why did the old rule-based approach ("pointy ears + whiskers = cat") break down easily?',
            options: [
              'It was too slow to run',
              'Real-world examples have exceptions (like dogs with pointy ears) that simple hand-written rules cannot capture',
              'Computers cannot process images at all',
              'It required too much electricity',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'AI vs ML vs Generative AI: The Family Tree',
        difficulty: 'easy',
        tags: ['ai', 'ml', 'gen-ai', 'first-step'],
        explanation: {
          english:
            "Now that you know AI is a broad goal and ML is 'learning from examples', let's place Generative AI precisely in this family. Picture three nested circles: the BIGGEST circle is **AI** (any smart computer behaviour, however achieved). Inside it, a smaller circle is **Machine Learning** (the specific approach of learning patterns from data, rather than hand-written rules). Inside THAT, an even smaller circle is **Deep Learning** (ML using 'neural networks', loosely inspired by the brain — we'll baby-step into this next). And inside deep learning sits the newest, smallest circle: **Generative AI** — models that don't just recognise or classify things, they CREATE brand-new things: a chatbot writing a fresh sentence, an image model painting a picture that never existed before. Every generative AI tool (ChatGPT, Midjourney, GitHub Copilot) is Deep Learning, which is ML, which is AI — but not every AI is generative (a spam filter is AI and ML, but it only SORTS emails, it doesn't CREATE anything new).",
          hinglish:
            "Ab jab tumhe pata hai AI ek broad goal hai aur ML matlab 'examples se seekhna', chalo Generative AI ko is family mein exactly place karte hain. Teen nested circles imagine karo: sabse BADA circle hai **AI** (koi bhi smart computer behaviour, chahe kaise bhi achieve ho). Uske andar, ek chhota circle hai **Machine Learning** (data se patterns seekhne ka specific approach, hand-written rules ke bajaye). USKE andar, aur bhi chhota circle hai **Deep Learning** (ML jo 'neural networks' use karta hai, loosely brain se inspired — isme hum agla baby-step lenge). Aur deep learning ke andar baithta hai sabse naya, sabse chhota circle: **Generative AI** — models jo sirf cheezein recognise ya classify nahi karte, wo bilkul NAYI cheezein CREATE karte hain: ek chatbot jo fresh sentence likhta hai, ek image model jo aisi picture banata hai jo pehle kabhi exist nahi karti thi. Har generative AI tool (ChatGPT, Midjourney, GitHub Copilot) Deep Learning hai, jo ML hai, jo AI hai — par har AI generative nahi hoti (ek spam filter AI aur ML hai, par wo sirf emails ko SORT karta hai, kuch naya CREATE nahi karta).",
        },
        dailyLifeExample:
          "Ye waise hai jaise 'Food' ek badi category hai, uske andar 'Indian food' hai, uske andar 'North Indian food' hai, aur uske andar 'Biryani' hai. Biryani North Indian food hai, jo Indian food hai, jo Food hai — par har Food Biryani nahi hoti. Waise hi, har Generative AI, AI hoti hai, par har AI, Generative AI nahi hoti.",
        codeExample:
          "# The nested family tree, from biggest to smallest circle:\n#\n#  ┌─────────────────────────────────────────────────────┐\n#  │  AI  (any smart computer behaviour)                   │\n#  │  ┌───────────────────────────────────────────────┐   │\n#  │  │  Machine Learning  (learns from data)           │   │\n#  │  │  ┌─────────────────────────────────────────┐   │   │\n#  │  │  │  Deep Learning  (uses neural networks)    │   │   │\n#  │  │  │  ┌───────────────────────────────────┐   │   │   │\n#  │  │  │  │  Generative AI (CREATES new things) │   │   │   │\n#  │  │  │  │  e.g. ChatGPT, Midjourney, Copilot   │   │   │   │\n#  │  │  │  └───────────────────────────────────┘   │   │   │\n#  │  │  └─────────────────────────────────────────┘   │   │\n#  │  └───────────────────────────────────────────────┘   │\n#  └─────────────────────────────────────────────────────┘\n#\n# A spam filter: AI + ML, but NOT generative (it only sorts, doesn't create)\n# ChatGPT: AI + ML + Deep Learning + Generative (it creates new sentences)",
        keyPoints: [
          'AI is the biggest circle; Machine Learning is a specific approach inside it',
          'Deep Learning is ML that uses neural networks; Generative AI is the newest slice of deep learning',
          'Every Generative AI tool is AI, but not every AI tool is generative',
          'The key test for "generative": does it CREATE new content, or just sort/classify existing content?',
        ],
        quiz: [
          {
            question: 'Which statement correctly describes the relationship between these terms?',
            options: [
              'AI, ML, and Generative AI are all completely unrelated fields',
              'Generative AI is a specific, newer branch that sits inside Deep Learning, which sits inside Machine Learning, which sits inside AI',
              'Machine Learning is a branch of Generative AI',
              'AI is a branch of Generative AI',
            ],
            correctIndex: 1,
          },
          {
            question: 'A spam filter that sorts emails into "spam" or "not spam" using learned patterns is an example of:',
            options: [
              'Generative AI, because it makes decisions',
              'AI and Machine Learning, but NOT Generative AI, because it classifies rather than creates new content',
              'Neither AI nor ML',
              'Pure rule-based programming with no learning involved',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the key test for whether something counts as "Generative AI"?',
            options: [
              'Whether it runs on a powerful computer',
              'Whether it CREATES new content, rather than just recognising, sorting, or scoring existing content',
              'Whether it was made after the year 2020',
              'Whether it uses the internet',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'How Does a Computer "Guess" the Next Word? A Baby-Step Analogy',
        difficulty: 'easy',
        tags: ['prediction', 'llm-intuition', 'first-step'],
        explanation: {
          english:
            "Before we touch any real LLM concepts, let's build the single most important intuition in this entire course, using ZERO technical terms. Imagine this game: I say 'The sky is ___' and ask you to fill in the blank. You'd probably say 'blue' — not because you memorised that exact sentence somewhere, but because you've seen the words 'sky' and 'blue' appear together SO many times in your life that your brain has learned they go together. Now imagine you'd read millions of books, articles, and conversations — you'd get incredibly good at guessing the next word in ANY sentence, on ANY topic, because you've seen so many patterns of how words follow other words. That, in the simplest possible terms, is EXACTLY what a Large Language Model (like ChatGPT) does: it reads a staggering amount of text during training, learns which words tend to follow which other words in which contexts, and then — when you give it a prompt — it just keeps guessing the single most likely next word, over and over, one word at a time, until it has written a full response.",
          hinglish:
            "Kisi bhi real LLM concept ko touch karne se pehle, chalo is poore course ki sabse important intuition banate hain, ZERO technical terms ke saath. Ye game imagine karo: main bolta hoon 'The sky is ___' aur tumse blank fill karne ko kehta hoon. Tum probably bologe 'blue' — isliye nahi ki tumne exactly wo sentence kahin yaad kiya hai, balki isliye kyunki tumne 'sky' aur 'blue' words ko itni baar saath mein dekha hai apni zindagi mein ki tumhare brain ne seekh liya hai ki wo saath mein aate hain. Ab imagine karo tumne millions books, articles, aur conversations padhe hain — tum incredibly achhe ban jaoge kisi bhi sentence mein, kisi bhi topic pe, agla word guess karne mein, kyunki tumne itne saare patterns dekhe hain ki words kaise doosre words ke baad aate hain. Yahi, sabse simple terms mein, EXACTLY wo hai jo ek Large Language Model (jaise ChatGPT) karta hai: ye training ke dauraan bahut zyada text padhta hai, seekhta hai ki kaunse words kis context mein kaunse doosre words ke baad aate hain, aur phir — jab tum use ek prompt dete ho — ye bas sabse likely agla word guess karta rehta hai, baar-baar, ek waqt mein ek word, jab tak ye poora response likh na de.",
        },
        dailyLifeExample:
          "Ye tumhare phone ke keyboard ke 'next word suggestion' feature jaisa hai (jo tumhe type karte waqt 3 words suggest karta hai) — bas ChatGPT jaisa LLM ye kaam BAHUT zyada training data aur BAHUT zyada intelligence ke saath karta hai, isliye iske suggestions poore, coherent, meaningful paragraphs bante hain, sirf ek chhota next-word guess nahi.",
        codeExample:
          "# The core intuition, illustrated (this is NOT real code, just a mental model):\n\nprompt = \"The sky is\"\n\n# An LLM has learned, from massive training data, rough probabilities like:\nnext_word_probabilities = {\n    \"blue\":   0.62,   # most common continuation\n    \"clear\":  0.15,\n    \"dark\":   0.10,\n    \"purple\": 0.03,\n    # ... thousands more possible words, each with a tiny probability\n}\n\n# It picks (usually) the most likely word: \"blue\"\n# Then it repeats the ENTIRE process again with the new, longer text:\nprompt = \"The sky is blue\"\n# ...and predicts the next word after THAT, and so on, one word at a time,\n# until it decides the response is complete.",
        keyPoints: [
          'An LLM is fundamentally a very sophisticated "next word guesser"',
          'It learns which words tend to follow which other words by reading huge amounts of text during training',
          'It generates a response one word (technically, one "token") at a time',
          'This simple idea — repeated billions of times with a huge learned pattern-base — is what produces coherent, human-like text',
        ],
        quiz: [
          {
            question: 'In the simplest possible terms, what is a Large Language Model doing when it generates a response?',
            options: [
              'Looking up the exact answer in a database',
              'Repeatedly guessing the single most likely next word, based on patterns learned from huge amounts of text',
              'Randomly picking words with no pattern at all',
              'Copying a pre-written answer from the internet',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why can you usually guess that "The sky is ___" should be filled with "blue"?',
            options: [
              'You memorised this exact sentence somewhere',
              "You've seen the words 'sky' and 'blue' appear together so often that your brain learned the pattern",
              'It is a random guess',
              'There is no reason, it is coincidence',
            ],
            correctIndex: 1,
          },
          {
            question: 'How does an LLM produce a full response, according to this baby-step explanation?',
            options: [
              'It writes the entire response in one instant step',
              'It predicts and adds one word/token at a time, repeating the prediction process with the growing text each time',
              'It picks a random pre-written paragraph',
              'It asks a human to write the response',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'What is a Neural Network? (No Math, Just Intuition)',
        difficulty: 'medium',
        tags: ['neural-network', 'deep-learning', 'first-step'],
        explanation: {
          english:
            "You now know ML models 'learn patterns from data' — but HOW, physically, does a computer store a learned pattern? The answer, for most modern AI (including all of Generative AI), is a **neural network**. Don't worry, no maths here — just intuition. Picture a network loosely (very loosely) inspired by brain cells (neurons): it's made of layers of simple, connected 'nodes'. Each connection between nodes has a 'strength' number attached to it, called a **weight**. When information flows through the network, it passes through these weighted connections, layer by layer, and comes out the other end as an answer or prediction. Here's the key insight: at the start, all the weights are random garbage — the network knows nothing. TRAINING is the process of showing it thousands (or billions) of examples, checking how wrong its answer was each time, and very slightly adjusting all the weights to make it a tiny bit less wrong next time. Repeat this adjustment process billions of times, across billions of examples, and slowly the random garbage weights turn into a network that has genuinely 'learned' the patterns in the data — this is the actual physical mechanism behind everything an LLM or image generator does.",
          hinglish:
            "Ab tumhe pata hai ML models 'data se patterns seekhte hain' — par HOW, physically, ek computer ek seekha hua pattern store kaise karta hai? Jawab, zyadatar modern AI ke liye (Generative AI included), hai ek **neural network**. Chinta mat karo, yahan koi maths nahi — sirf intuition. Ek network imagine karo jo (bahut loosely) brain cells (neurons) se inspired hai: ye simple, connected 'nodes' ki layers se bana hota hai. Nodes ke beech har connection pe ek 'strength' number attached hota hai, jise **weight** kehte hain. Jab information network se guzarta hai, ye in weighted connections se, layer by layer, guzarta hai, aur doosre end pe ek answer ya prediction ban ke nikalta hai. Yahan key insight hai: shuruaat mein, sab weights random garbage hote hain — network ko kuch nahi pata. TRAINING wo process hai jisme use hazaron (ya billions) examples dikhaye jaate hain, har baar check kiya jaata hai ki uska answer kitna galat tha, aur sab weights ko bahut thoda adjust kiya jaata hai taaki agli baar wo thoda kam galat ho. Is adjustment process ko billions of times repeat karo, billions of examples ke across, aur dheere-dheere random garbage weights ek aise network mein badal jaate hain jisne genuinely data ke patterns 'seekh' liye hain — yahi actual physical mechanism hai jo LLM ya image generator jo bhi karta hai uske peeche hota hai.",
        },
        dailyLifeExample:
          "Neural network training waise hai jaise archery seekhna bina kisi coach ke, sirf trial-and-error se. Pehla teer bilkul random jagah lagta hai. Har baar tum dekhte ho target se kitna door lage, aur apna aim thoda adjust karte ho. 1000 teer maarne ke baad, tumhara aim (weights) itna refine ho chuka hai ki tum consistently bullseye ke paas lagate ho — bina kisi ne exact formula bataye, sirf repeated small adjustments se.",
        codeExample:
          "# Conceptual illustration of training (not real, runnable code)\n\n# Step 0: weights start completely random -> network knows nothing\nweights = random_garbage()\n\n# Training loop (repeated BILLIONS of times on massive datasets):\nfor example in training_data:\n    prediction = neural_network(example.input, weights)\n    error = how_wrong_was(prediction, example.correct_answer)\n    # Nudge every weight slightly in the direction that reduces error\n    weights = adjust_weights_slightly(weights, error)\n\n# After enough iterations, `weights` encode learned patterns from the data\n# This final set of weights IS the 'trained model' you download/use later.",
        keyPoints: [
          'A neural network is layers of simple connected nodes, linked by adjustable numbers called "weights"',
          'At the start, weights are random — the network has learned nothing yet',
          'Training = repeatedly showing examples, measuring error, and nudging weights to reduce that error',
          'After enough training examples and adjustments, the weights encode genuinely learned patterns',
          'This weight-adjustment process is the actual mechanism behind every modern generative AI model',
        ],
        quiz: [
          {
            question: 'What is a "weight" in a neural network?',
            options: [
              'The physical size of the computer running it',
              'An adjustable number attached to a connection between nodes, which the network tunes during training',
              'The number of users using the model',
              'The price of the AI service',
            ],
            correctIndex: 1,
          },
          {
            question: 'What do the weights look like at the very start, before any training?',
            options: [
              'Perfectly correct from the beginning',
              'Random, meaningless values — the network has not learned anything yet',
              'Copied from a human expert',
              'They do not exist until after training',
            ],
            correctIndex: 1,
          },
          {
            question: 'In simple terms, what does "training" a neural network actually do?',
            options: [
              'It deletes incorrect data',
              'It repeatedly checks how wrong the output was and slightly adjusts the weights to reduce that error, over and over',
              'It makes the computer\'s hardware physically faster',
              'It translates the model into a different programming language',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Why Do AI Models Need So Much Data and Computers?',
        difficulty: 'medium',
        tags: ['training', 'data', 'compute', 'first-step'],
        explanation: {
          english:
            "You've now seen the WHOLE baby-step picture: models learn by seeing examples and adjusting weights to reduce error. A natural question follows: why do you keep hearing that models like GPT-4 needed 'the entire internet' worth of text and thousands of expensive computer chips? Here's the intuition. Remember the archery analogy — one arrow barely improves your aim; you need THOUSANDS of shots to become consistently accurate. A neural network is the same, but at a MUCH bigger scale: modern LLMs have hundreds of billions of individual weights (numbers) to adjust, and each one needs to be nudged correctly, many times, across a huge variety of examples, before the whole system reliably 'gets it right'. More data means more chances to learn subtle patterns and fewer chances to memorise wrong shortcuts. More compute (many powerful chips called GPUs, running in parallel) means those billions of tiny weight-adjustments can happen fast enough to be practical — training a modern LLM on a single normal computer would take far, far longer than a human lifetime. This is exactly why building a top-tier model from scratch costs millions of dollars, and why most people instead use an ALREADY-trained model via an API rather than training their own.",
          hinglish:
            "Ab tumne POORI baby-step picture dekh li hai: models examples dekh kar aur error kam karne ke liye weights adjust karke seekhte hain. Ek natural question aata hai: tum kyun sunte rehte ho ki GPT-4 jaise models ko 'poore internet' jitna text aur hazaron mehnge computer chips chahiye the? Yahan intuition hai. Archery analogy yaad karo — ek teer se tumhara aim mushkil se improve hota hai; consistently accurate banne ke liye tumhe HAZARON shots chahiye. Ek neural network same hai, par MUCH bade scale pe: modern LLMs ke paas sau billion se zyada individual weights (numbers) hote hain jo adjust karne hote hain, aur har ek ko sahi tareeke se, kai baar, bahut saare alag-alag examples ke across nudge karna padta hai, tab jaake poora system reliably 'sahi' karta hai. Zyada data ka matlab hai subtle patterns seekhne ke zyada chances aur galat shortcuts memorise karne ke kam chances. Zyada compute (bahut saare powerful chips jise GPUs kehte hain, parallel mein chalte hue) ka matlab hai ki wo billions chhote weight-adjustments itni fast ho sakein ki practical rahe — ek modern LLM ko ek single normal computer pe train karna ek human lifetime se bhi bahut zyada time lega. Yahi exactly wajah hai ki top-tier model scratch se banane mein millions of dollars lagte hain, aur zyadatar log apna khud ka model train karne ke bajaye ek ALREADY-trained model ko API se use karte hain.",
        },
        dailyLifeExample:
          "Ye waise hai jaise ek bahut bada, bahut detailed jigsaw puzzle solve karna. Ek insaan akela ise years mein solve karega. Par agar tum 1000 logon ko ek saath alag-alag sections pe kaam karne do (parallel compute jaisa), poora puzzle days mein solve ho jaata hai. AI training bhi waisa hi hai — GPUs parallel mein bahut saare chhote calculations ek saath karte hain, jisse ek kaam jo years lega wo weeks mein ho jaata hai.",
        codeExample:
          "# A rough sense of scale (illustrative numbers, not exact):\n#\n# Small toy neural network:        ~1,000 weights\n#   -> could train on a laptop in minutes\n#\n# A modern production LLM (e.g. GPT-4 class):\n#   -> hundreds of BILLIONS of weights\n#   -> trained on a large fraction of the internet's text\n#   -> uses thousands of GPUs running for weeks/months, in parallel\n#   -> costs tens of millions of dollars in compute alone\n#\n# This huge gap in scale is exactly why:\n# - Only a handful of companies (OpenAI, Google, Anthropic, Meta) train these from scratch\n# - Everyone else (including you, building an app) calls their API instead\n#   of training a brand-new model from zero",
        keyPoints: [
          'More weights (a bigger model) need more examples to adjust correctly, just like more practice improves accuracy',
          'More/better data helps the model learn real patterns instead of memorising noise or shortcuts',
          'Training billions of weights requires massive parallel compute (many GPUs working together)',
          'This is why training a top model from scratch costs millions of dollars and is done by very few companies',
          'Most developers use an already-trained model via an API instead of training their own from zero',
        ],
        quiz: [
          {
            question: 'Why do modern AI models need such large amounts of training data?',
            options: [
              'Data makes the computer run faster',
              'More examples give the model more chances to learn genuine patterns rather than memorising incorrect shortcuts',
              'It has no real effect on the model\'s quality',
              'Data is only needed to make the file size bigger',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why is massive parallel compute (many GPUs) needed to train a large model?',
            options: [
              'GPUs are just cheaper than regular computers',
              'Adjusting billions of weights across huge datasets would take far longer than practical on a single normal computer, so many chips work in parallel to speed it up',
              'Parallel compute is only needed for playing video games',
              'It is not actually needed at all',
            ],
            correctIndex: 1,
          },
          {
            question: 'Why do most developers use an existing model via an API instead of training their own from scratch?',
            options: [
              'APIs are always technically superior in every way',
              'Training a top-tier model from scratch requires massive data and compute costing millions of dollars, which is impractical for most people/companies',
              'It is illegal to train your own model',
              'APIs are the only way any AI model can ever be used',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const beginner = [
  {
    title: 'Gen AI Foundations',
    level: 'beginner',
    description: 'Generative AI, LLMs, tokens aur embeddings.',
    concepts: [
      {
        title: 'What is Generative AI',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'Generative AI creates new content — text, images, code, audio — instead of just classifying or predicting from fixed labels. It learns patterns from huge datasets and then generates plausible new samples. Examples: ChatGPT/Claude (text), Midjourney/DALL-E (images), GitHub Copilot (code). It differs from "traditional" AI, which mainly recognises or scores existing data.',
          hinglish:
            'Generative AI naya content banata hai — text, images, code, audio — sirf fixed labels se classify ya predict karne ke bajaye. Ye huge datasets se patterns seekh kar plausible naye samples generate karta hai. Examples: ChatGPT/Claude (text), Midjourney/DALL-E (images), GitHub Copilot (code). Ye "traditional" AI se alag hai jo mainly existing data ko recognise ya score karta hai.',
        },
        dailyLifeExample:
          'Traditional AI ek examiner jaisa hai jo answer ko sahi/galat batata hai. Generative AI ek student jaisa hai jo khud naya answer likh deta hai — usne padhe hue patterns se.',
        codeExample:
          '// Conceptual: a generative model produces new text\n// input prompt  -> model -> generated continuation\n//\n// "Write a haiku about chai" ->\n//   "Steam curls from the cup, / cardamom and ginger dance, / monsoon afternoon."',
        keyPoints: [
          'Generates new content (text/image/code/audio)',
          'Learns patterns from large datasets',
          'Traditional AI classifies; Gen AI creates',
          'Examples: ChatGPT, Claude, DALL-E, Copilot',
        ],
        quiz: [
          {
            question: 'Generative AI primarily…',
            options: ['classifies existing data', 'creates new content', 'stores data', 'compresses files'],
            correctIndex: 1,
          },
          {
            question: 'Which is a generative AI tool?',
            options: ['A spam filter', 'ChatGPT', 'A barcode scanner', 'A calculator'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Image Generation: How Diffusion Models Work',
        difficulty: 'medium',
        tags: ['diffusion', 'image-generation', 'multimodal'],
        explanation: {
          english:
            "Tools like DALL-E, Midjourney, and Stable Diffusion don't work like LLMs (predicting the next word) — they use a completely different technique called diffusion. During TRAINING, the model learns to reverse a process of gradually adding random noise to real images until they become pure static — it learns, step by step, how to 'denoise' an image back to something recognizable. During GENERATION, you start with pure random noise and the model repeatedly removes a little noise at a time (guided by your text prompt, via a text encoder), gradually revealing a coherent image over many steps — going from static to a photo. This is why image generation involves a visible 'steps' or 'quality' setting: more denoising steps generally means a more refined result.",
          hinglish:
            "DALL-E, Midjourney, aur Stable Diffusion jaise tools LLMs ki tarah kaam nahi karte (agla word predict karna) — wo ek bilkul alag technique use karte hain jise diffusion kehte hain. TRAINING ke dauraan, model seekhta hai ek process ko reverse karna jo real images mein gradually random noise add karta hai jab tak wo pure static ban jaayein — ye step-by-step seekhta hai ki ek image ko wapas kuch recognizable mein kaise 'denoise' kare. GENERATION ke dauraan, tum pure random noise se shuru karte ho aur model baar-baar thoda-thoda noise hataata hai (tumhare text prompt se guide hote hue, ek text encoder ke zariye), gradually kai steps mein ek coherent image reveal karte hue — static se ek photo tak. Isliye image generation mein ek visible 'steps' ya 'quality' setting hoti hai: zyada denoising steps aksar zyada refined result deta hai.",
        },
        dailyLifeExample:
          "Diffusion model ek sculptor jaisa hai jo ek dhundhle, static-bhare marble block se shuru karta hai (random noise) aur dheere-dheere, chip-chip ke (denoising steps) ek clear statue reveal karta hai — text prompt guide karta hai ki final statue kaisi dikhni chahiye, har step us direction mein thoda aur clear hota jaata hai.",
        codeExample:
          "# Conceptual: how diffusion generation works (not literal API code)\n#\n# Training: learn to reverse noise addition\n# real_image -> add noise (step 1) -> more noise (step 2) -> ... -> pure static\n# model learns: given noisy_image at step N, predict slightly LESS noisy step N-1\n#\n# Generation (inference):\n# start = pure_random_noise\n# for step in range(num_steps, 0, -1):\n#     start = model.denoise_one_step(start, guided_by=text_prompt_embedding)\n# result = start  # now a coherent image, guided by the prompt\n#\n# via an API (conceptual):\n# image = client.images.generate(\n#     prompt='a watercolor painting of a monsoon evening in Mumbai',\n#     size='1024x1024',\n#     quality='hd',  # roughly maps to more/fewer denoising steps\n# )",
        keyPoints: [
          'Diffusion models are trained to reverse a noise-adding process, learning to "denoise" step by step',
          'Generation starts from pure random noise and repeatedly removes a little noise, guided by the text prompt',
          'This is fundamentally different from how LLMs generate text (next-token prediction)',
          'More denoising steps generally means higher quality/more refined output (with diminishing returns)',
          'A text encoder converts your prompt into a guidance signal used at every denoising step',
        ],
        quiz: [
          {
            question: 'What do diffusion models learn during training?',
            options: ['To predict the next word in a sentence', 'To reverse a process of gradually adding noise to images — i.e. how to denoise step by step', 'To classify images into categories', 'To compress images for storage'],
            correctIndex: 1,
          },
          {
            question: 'What does a diffusion model start from when GENERATING a new image?',
            options: ['A blank white canvas', 'Pure random noise', 'An existing photo it edits', 'The text prompt converted directly into pixels'],
            correctIndex: 1,
          },
          {
            question: 'Is image generation (diffusion) fundamentally the same technique as LLM text generation (next-token prediction)?',
            options: ['Yes, identical technique', 'No — diffusion iteratively denoises an image over many steps; LLMs predict one token at a time in sequence', 'They are exactly the same neural network', 'Diffusion only works on text'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'How Large Language Models (LLMs) Work',
        difficulty: 'medium',
        tags: ['llm', 'transformer'],
        explanation: {
          english:
            'An LLM is a neural network (usually a Transformer) trained to predict the next token given previous tokens. By learning this one objective over trillions of words, it picks up grammar, facts, reasoning patterns, and style. At inference it generates text token by token, each time sampling the next likely token. It has no database of facts — it encodes patterns in billions of weights, which is why it can be confidently wrong.',
          hinglish:
            'LLM ek neural network hai (aksar Transformer) jo previous tokens dekh kar next token predict karne ke liye train hota hai. Ye ek objective ko trillions of words pe seekh kar grammar, facts, reasoning patterns, aur style pakad leta hai. Inference pe ye text token-by-token generate karta hai, har baar next likely token sample karke. Iske paas facts ka database nahi — ye patterns ko billions of weights mein encode karta hai, isiliye ye confidently galat bhi ho sakta hai.',
        },
        dailyLifeExample:
          'LLM ek super-advanced autocomplete jaisa hai — jaise phone "Good" ke baad "morning" suggest karta hai, par poore paragraphs aur reasoning ke saath, kyunki usne bahut zyada padha hai.',
        codeExample:
          '// LLM = next-token predictor\n// "The capital of France is" -> [Paris: 0.92, Lyon: 0.01, ...]\n// It samples the next token, appends it, and repeats.\n//\n// Trained on next-token prediction, it learns language + patterns.',
        keyPoints: [
          'Transformer neural network',
          'Trained to predict the next token',
          'Generates text token by token',
          'Encodes patterns in weights — not a fact database',
        ],
        quiz: [
          {
            question: 'An LLM is fundamentally trained to…',
            options: ['store web pages', 'predict the next token', 'sort words', 'translate only'],
            correctIndex: 1,
          },
          {
            question: 'Most modern LLMs are based on which architecture?',
            options: ['CNN', 'Transformer', 'Decision tree', 'k-NN'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why do LLMs hallucinate (produce confident but false answers)?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'An LLM does not look up facts; it predicts the statistically likely next token from patterns in its training data. When the prompt enters territory that is rare, ambiguous, or absent from training, the model still produces a fluent, plausible-sounding continuation — which can be factually wrong. It optimises for plausibility, not truth. Mitigations: retrieval-augmented generation (grounding answers in real documents), tool use, lower temperature, and asking it to cite or say "I do not know".',
              hinglish:
                'LLM facts look up nahi karta; ye training data ke patterns se statistically likely next token predict karta hai. Jab prompt aisi jagah jaaye jo rare, ambiguous, ya training mein absent ho, model phir bhi ek fluent, plausible-sounding continuation banata hai — jo factually galat ho sakta hai. Ye plausibility ke liye optimise karta hai, truth ke liye nahi. Mitigations: retrieval-augmented generation (real documents pe ground karna), tool use, kam temperature, aur cite karne ya "mujhe nahi pata" kehne ko kehna.',
            },
          },
        ],
      },
      {
        title: 'Tokens & Context Window',
        difficulty: 'medium',
        tags: ['tokens', 'context-window'],
        explanation: {
          english:
            'LLMs do not read characters or words directly — they read tokens, sub-word chunks (roughly 4 characters or ~0.75 words in English). The context window is the maximum number of tokens the model can consider at once (prompt + response). Longer context lets the model "remember" more, but costs more and can dilute focus. Pricing is usually per token, so token count directly affects cost.',
          hinglish:
            'LLMs characters ya words seedha nahi padhte — ye tokens padhte hain, sub-word chunks (English mein roughly 4 characters ya ~0.75 words). Context window wo maximum tokens hai jo model ek saath consider kar sakta hai (prompt + response). Lamba context model ko zyada "yaad" rakhne deta hai, par zyada mehnga padta hai aur focus dilute kar sakta hai. Pricing aksar per token hoti hai, isliye token count seedha cost affect karta hai.',
        },
        dailyLifeExample:
          'Context window ek meeting ki memory jaisa hai — model sirf utna yaad rakh sakta hai jitna window mein aaye. Window bhar gayi to purani baatein "bhool" jaata hai.',
        codeExample:
          '// Rough rule: 1 token ~ 4 chars ~ 0.75 words (English)\n// "Learnverse is great" ~ 4-5 tokens\n//\n// Context window examples (vary by model):\n//   8K, 128K, or 1M tokens = prompt + response combined\n// Cost is usually charged per 1K/1M tokens.',
        keyPoints: [
          'Models read tokens (sub-word chunks)',
          '~4 chars / ~0.75 words per token (English)',
          'Context window = max tokens in + out',
          'Token count drives cost & memory',
        ],
        quiz: [
          {
            question: 'What is a token in an LLM?',
            options: ['A password', 'A sub-word chunk of text', 'A pixel', 'A database row'],
            correctIndex: 1,
          },
          {
            question: 'The context window limits…',
            options: ['internet speed', 'how many tokens the model considers at once', 'the screen size', 'the number of users'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Embeddings',
        difficulty: 'medium',
        tags: ['embeddings', 'vectors'],
        explanation: {
          english:
            'An embedding turns text (or images) into a vector of numbers that captures meaning, so that similar meanings produce nearby vectors. This lets computers measure semantic similarity using distance (e.g. cosine similarity). Embeddings power semantic search, recommendations, clustering, and the retrieval step in RAG — finding documents that mean the same thing even if they share no exact words.',
          hinglish:
            'Embedding text (ya images) ko numbers ke vector mein badal deta hai jo meaning capture karta hai, taaki similar meanings ke vectors paas-paas hon. Isse computers semantic similarity ko distance (jaise cosine similarity) se measure kar sakte hain. Embeddings semantic search, recommendations, clustering, aur RAG ka retrieval step chalate hain — wo documents dhoondhna jo same matlab rakhein chahe exact words na milein.',
        },
        dailyLifeExample:
          'Embeddings ek map pe sheheron ki location jaisa hai — milti-julti cheezein paas, alag cheezein door. "Dog" aur "puppy" paas, "dog" aur "rocket" door.',
        codeExample:
          '// Text -> embedding vector (e.g. 1536 numbers)\n// "king"  -> [0.21, -0.08, ...]\n// "queen" -> [0.19, -0.05, ...]  (close to "king")\n//\n// Similarity via cosine distance:\nfunction cosine(a, b) {\n  let dot = 0, na = 0, nb = 0;\n  for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }\n  return dot / (Math.sqrt(na) * Math.sqrt(nb));\n}',
        keyPoints: [
          'Text/images -> vectors capturing meaning',
          'Similar meaning => nearby vectors',
          'Compared via cosine similarity/distance',
          'Powers semantic search, recommendations, RAG',
        ],
        quiz: [
          {
            question: 'An embedding represents text as…',
            options: ['a single character', 'a vector of numbers capturing meaning', 'an image', 'a SQL row'],
            correctIndex: 1,
          },
          {
            question: 'Two texts with similar meaning have embeddings that are…',
            options: ['far apart', 'close together', 'identical bytes', 'unrelated'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Prompt Engineering',
    level: 'intermediate',
    description: 'LLMs se behtar output nikalna.',
    concepts: [
      {
        title: 'Prompting Basics',
        difficulty: 'easy',
        tags: ['prompting'],
        explanation: {
          english:
            'A prompt is your instruction to the model; its quality largely determines the output. Good prompts are specific about the task, the role/persona, the format, and constraints, and give examples or context when helpful. Many APIs separate a system prompt (sets behaviour/rules) from user messages (the actual request). Clear, structured prompts beat vague one-liners.',
          hinglish:
            'Prompt model ko di gayi tumhari instruction hai; iski quality zyadatar output decide karti hai. Achhe prompts task, role/persona, format, aur constraints ke baare mein specific hote hain, aur zaroorat ho to examples ya context dete hain. Bahut APIs ek system prompt (behaviour/rules set karta hai) ko user messages (asli request) se alag karti hain. Clear, structured prompts vague one-liners se behtar hain.',
        },
        dailyLifeExample:
          'Prompt ek employee ko diya kaam jaisa hai — "kuch acha banao" se confusion, par "200-word professional email likho jisme X, Y, Z ho" se exact result milta hai.',
        codeExample:
          '// Weak prompt\n"Summarize this."\n\n// Strong prompt\n"You are a technical writer. Summarize the text below in 3 bullet\npoints for a beginner, max 15 words each. Keep it neutral.\n\nText: <...>"',
        keyPoints: [
          'Be specific: task, role, format, constraints',
          'Give context/examples when useful',
          'System prompt sets behaviour; user message = request',
          'Structured prompts beat vague ones',
        ],
        quiz: [
          {
            question: 'What usually improves an LLM\'s output the most?',
            options: ['A longer model name', 'A clear, specific prompt', 'More emojis', 'Random words'],
            correctIndex: 1,
          },
          {
            question: 'A system prompt typically sets the…',
            options: ['internet speed', "model's behaviour and rules", 'screen theme', 'token price'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Prompt Patterns (Zero/Few-shot & Chain-of-Thought)',
        difficulty: 'medium',
        tags: ['prompting', 'patterns'],
        explanation: {
          english:
            'Zero-shot prompting asks the task with no examples; few-shot gives a few input-output examples so the model mimics the pattern (great for consistent formatting). Chain-of-thought asks the model to reason step by step before answering, which improves accuracy on math and logic. Other patterns: role prompting, output-format constraints (e.g. "respond in JSON"), and decomposition (break a big task into steps).',
          hinglish:
            'Zero-shot prompting task ko bina examples ke poochta hai; few-shot kuch input-output examples deta hai taaki model pattern copy kare (consistent formatting ke liye badhiya). Chain-of-thought model ko answer se pehle step-by-step reason karne ko kehta hai, jo math aur logic pe accuracy badhata hai. Doosre patterns: role prompting, output-format constraints (jaise "JSON mein jawab do"), aur decomposition (bade task ko steps mein todna).',
        },
        dailyLifeExample:
          'Few-shot ek naye worker ko 2-3 solved examples dikhane jaisa hai — wo pattern samajh ke baaki khud kar leta hai. Chain-of-thought "rough kaam dikhao" jaisa hai jo galtiyan kam karta hai.',
        codeExample:
          '// Few-shot: teach the format with examples\n"Classify sentiment.\nReview: \"Loved it!\"  -> positive\nReview: \"Terrible.\"  -> negative\nReview: \"It was okay\" ->"\n\n// Chain-of-thought\n"Solve step by step, then give the final answer:\nIf a shirt costs 800 after a 20% discount, the original price was..."',
        keyPoints: [
          'Zero-shot: no examples; few-shot: a few examples',
          'Few-shot drives consistent formatting',
          'Chain-of-thought: reason step by step (better logic)',
          'Constrain output format (e.g. JSON) when integrating',
        ],
        quiz: [
          {
            question: 'Few-shot prompting means you provide…',
            options: ['no examples', 'a few input-output examples', 'only a system prompt', 'a longer model'],
            correctIndex: 1,
          },
          {
            question: 'Chain-of-thought prompting mainly improves…',
            options: ['typing speed', 'reasoning/accuracy on logic & math', 'image quality', 'token price'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Temperature & Sampling Parameters',
        difficulty: 'medium',
        tags: ['sampling', 'parameters'],
        explanation: {
          english:
            'When generating, the model samples the next token from a probability distribution. Temperature controls randomness: low (0–0.3) is focused and deterministic (good for facts, code), high (0.8–1.2) is creative and varied (good for brainstorming). top_p (nucleus sampling) limits choices to the smallest set of tokens whose probabilities sum to p. max_tokens caps the response length. Tune these for the task.',
          hinglish:
            'Generate karte waqt model next token ko ek probability distribution se sample karta hai. Temperature randomness control karta hai: low (0–0.3) focused aur deterministic (facts, code ke liye), high (0.8–1.2) creative aur varied (brainstorming ke liye). top_p (nucleus sampling) choices ko un tokens ke smallest set tak limit karta hai jinki probabilities ka sum p ho. max_tokens response length cap karta hai. In sabko task ke hisaab se tune karo.',
        },
        dailyLifeExample:
          'Temperature ek cook ke masala-haath jaisa hai — low matlab hamesha same recipe (predictable), high matlab har baar thoda experiment (creative par kabhi-kabhi ajeeb).',
        codeExample:
          '// Typical API parameters\n{\n  "model": "...",\n  "temperature": 0.2,   // focused; raise for creativity\n  "top_p": 1.0,\n  "max_tokens": 500     // cap response length\n}\n// Facts/code -> low temp; brainstorming/copy -> higher temp',
        keyPoints: [
          'Temperature: low = focused, high = creative',
          'Use low temp for facts/code, high for ideas',
          'top_p (nucleus) limits the token choice set',
          'max_tokens caps response length & cost',
        ],
        quiz: [
          {
            question: 'For factual, deterministic answers you should use…',
            options: ['high temperature', 'low temperature', 'max_tokens = 1', 'top_p = 0'],
            correctIndex: 1,
          },
          {
            question: 'A high temperature makes output more…',
            options: ['predictable', 'random/creative', 'shorter', 'cheaper'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Building Gen AI Apps',
    level: 'intermediate',
    description: 'APIs, RAG, vector DBs aur tool calling.',
    concepts: [
      {
        title: 'Calling LLM APIs',
        difficulty: 'medium',
        tags: ['api', 'integration'],
        explanation: {
          english:
            'You build apps by calling an LLM provider\'s API (OpenAI, Anthropic, etc.) over HTTPS with your API key. You send a list of messages (system + user) plus parameters and receive generated text. Keep API keys server-side (never in client code), handle rate limits and errors, stream long responses for better UX, and use prompt caching to cut cost and latency on repeated context.',
          hinglish:
            'Tum apps banate ho ek LLM provider ki API (OpenAI, Anthropic, etc.) ko HTTPS pe apni API key ke saath call karke. Tum messages ki list (system + user) plus parameters bhejte ho aur generated text paate ho. API keys server-side rakho (kabhi client code mein nahi), rate limits aur errors handle karo, lambe responses stream karo better UX ke liye, aur repeated context pe cost/latency kam karne ke liye prompt caching use karo.',
        },
        dailyLifeExample:
          'LLM API ko call karna ek expert consultant ko phone karne jaisa hai — sawaal (messages) bhejo, jawab paao. Par phone number (API key) private rakho aur bill (tokens) pe dhyan do.',
        codeExample:
          '// Node example (pseudo): never expose the key client-side\nconst res = await fetch("https://api.provider.com/v1/messages", {\n  method: "POST",\n  headers: { "Authorization": `Bearer ${process.env.API_KEY}`,\n             "Content-Type": "application/json" },\n  body: JSON.stringify({\n    model: "...",\n    messages: [{ role: "user", content: "Explain closures simply" }],\n    temperature: 0.3,\n  }),\n});\nconst data = await res.json();',
        keyPoints: [
          'Send messages + params, receive generated text',
          'Keep API keys server-side only',
          'Handle rate limits, errors; stream for UX',
          'Use prompt caching to cut cost/latency',
        ],
        quiz: [
          {
            question: 'Where should your LLM API key live?',
            options: ['In client-side JS', 'Server-side (env var)', 'In the URL', 'In the prompt'],
            correctIndex: 1,
          },
          {
            question: 'Streaming responses mainly improves…',
            options: ['accuracy', 'user experience (perceived speed)', 'token price', 'security'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'RAG (Retrieval-Augmented Generation)',
        difficulty: 'hard',
        tags: ['rag', 'retrieval'],
        explanation: {
          english:
            'RAG grounds an LLM in your own data to reduce hallucinations and add up-to-date or private knowledge. Pipeline: (1) chunk your documents and create embeddings, store them in a vector database; (2) at query time, embed the question and retrieve the most similar chunks; (3) put those chunks into the prompt as context and ask the LLM to answer using them. This gives accurate, citable answers without retraining the model.',
          hinglish:
            'RAG ek LLM ko tumhare apne data pe ground karta hai taaki hallucinations kam hon aur up-to-date ya private knowledge add ho. Pipeline: (1) documents ko chunk karke embeddings banao, vector database mein store karo; (2) query time pe question ko embed karke sabse similar chunks retrieve karo; (3) un chunks ko prompt mein context ki tarah daal kar LLM se unhi se answer maango. Isse model retrain kiye bina accurate, citable answers milte hain.',
        },
        dailyLifeExample:
          'RAG open-book exam jaisa hai — student (LLM) sawaal ke liye relevant pages (retrieved chunks) khol kar uspe based jawab deta hai, yaaddaasht pe bharosa nahi karta.',
        codeExample:
          '// RAG flow (conceptual)\n// 1. Ingest:  docs -> chunks -> embeddings -> vector DB\n// 2. Query:   question -> embedding -> top-k similar chunks\n// 3. Augment: prompt = system + retrieved chunks + question\n// 4. Generate: LLM answers using ONLY the provided context\n//\n// Result: grounded, source-citable answers.',
        keyPoints: [
          'Grounds the LLM in your data',
          'Chunk + embed + store in a vector DB',
          'Retrieve similar chunks, add to the prompt',
          'Reduces hallucination; supports citations',
        ],
        quiz: [
          {
            question: 'What problem does RAG mainly address?',
            options: ['slow typing', 'hallucination / out-of-date knowledge', 'image quality', 'token pricing'],
            correctIndex: 1,
          },
          {
            question: 'In RAG, retrieved chunks are…',
            options: ['used to retrain the model', 'added to the prompt as context', 'deleted', 'ignored'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you use RAG vs fine-tuning?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Use RAG when you need the model to answer from a specific, changing, or private knowledge base (docs, policies, product data) and want citations — it is cheaper, updates instantly by changing the data, and reduces hallucination. Use fine-tuning when you need to change the model\'s style, format, or behaviour, or teach a narrow skill/structure that is hard to express in a prompt — it bakes patterns into weights but needs training data and re-training to update. Many production systems combine both: fine-tune for behaviour, RAG for knowledge.',
              hinglish:
                'RAG tab use karo jab model ko ek specific, badalti, ya private knowledge base (docs, policies, product data) se answer dena ho aur citations chahiye — ye sasta hai, data badal kar turant update hota hai, aur hallucination kam karta hai. Fine-tuning tab jab model ka style, format, ya behaviour badalna ho, ya ek narrow skill/structure sikhana ho jo prompt mein express karna mushkil hai — ye patterns ko weights mein bake karta hai par training data aur re-training chahiye update ke liye. Bahut production systems dono combine karte hain: behaviour ke liye fine-tune, knowledge ke liye RAG.',
            },
          },
        ],
      },
      {
        title: 'Vector Databases',
        difficulty: 'medium',
        tags: ['vector-db', 'embeddings', 'rag'],
        explanation: {
          english:
            'A vector database stores embeddings and finds the nearest vectors to a query embedding quickly using approximate nearest neighbour (ANN) search — far faster than comparing against every vector. It powers semantic search and the retrieval step of RAG. Popular options: Pinecone, Weaviate, Qdrant, Chroma, and pgvector (PostgreSQL extension). You store [vector, metadata] and query by similarity, often with metadata filters.',
          hinglish:
            'Vector database embeddings store karta hai aur ek query embedding ke nearest vectors ko jaldi dhoondhta hai approximate nearest neighbour (ANN) search se — har vector se compare karne se kaafi fast. Ye semantic search aur RAG ka retrieval step chalata hai. Popular options: Pinecone, Weaviate, Qdrant, Chroma, aur pgvector (PostgreSQL extension). Tum [vector, metadata] store karte ho aur similarity se query karte ho, aksar metadata filters ke saath.',
        },
        dailyLifeExample:
          'Vector DB ek smart librarian jaisa hai jo "is matlab wali" books turant nikaal deta hai, har shelf scan kiye bina — meaning ke hisaab se, exact title ke nahi.',
        codeExample:
          '// Vector DB usage (conceptual)\n// upsert: store { id, vector: [...], metadata: { source, page } }\n// query:  given a question embedding, return top-k nearest\n//\n// db.query({ vector: questionEmbedding, topK: 5,\n//            filter: { source: "handbook" } })',
        keyPoints: [
          'Stores embeddings; finds nearest vectors fast (ANN)',
          'Powers semantic search & RAG retrieval',
          'Options: Pinecone, Qdrant, Chroma, pgvector',
          'Store [vector, metadata]; filter + similarity query',
        ],
        quiz: [
          {
            question: 'A vector database is optimised for…',
            options: ['exact keyword match', 'nearest-vector (similarity) search', 'sorting numbers', 'storing images only'],
            correctIndex: 1,
          },
          {
            question: 'Which is a PostgreSQL extension for vectors?',
            options: ['pgvector', 'mongoose', 'redis', 'jquery'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Function / Tool Calling',
        difficulty: 'hard',
        tags: ['tools', 'function-calling', 'agents'],
        explanation: {
          english:
            'Tool (function) calling lets an LLM use external capabilities. You describe available tools (name, parameters as a schema); the model, instead of answering directly, returns a structured request to call a tool with arguments. Your code runs the tool (API call, DB query, calculation) and feeds the result back; the model then produces the final answer. This grounds the model in real data/actions and is the foundation of AI agents.',
          hinglish:
            'Tool (function) calling ek LLM ko external capabilities use karne deta hai. Tum available tools describe karte ho (name, parameters as a schema); model seedha answer dene ke bajaye ek structured request return karta hai ek tool ko arguments ke saath call karne ki. Tumhara code tool chalata hai (API call, DB query, calculation) aur result wapas feed karta hai; phir model final answer banata hai. Ye model ko real data/actions pe ground karta hai aur AI agents ki foundation hai.',
        },
        dailyLifeExample:
          'Tool calling ek manager jaisa hai jo khud sab nahi karta — wo bolta hai "weather API se Delhi ka temp lao", tum laate ho, phir wo final report banata hai.',
        codeExample:
          '// You expose a tool schema\n{ name: "get_weather", parameters: { city: "string" } }\n//\n// Model responds with a tool call instead of text:\n{ tool: "get_weather", arguments: { city: "Delhi" } }\n//\n// Your code runs it, returns 34C, and the model writes the reply.',
        keyPoints: [
          'Describe tools (name + parameter schema)',
          'Model returns a structured call, not a guess',
          'Your code runs the tool, returns the result',
          'Foundation of AI agents',
        ],
        quiz: [
          {
            question: 'In tool calling, the model returns…',
            options: ['the final answer always', 'a structured request to call a tool', 'an image', 'nothing'],
            correctIndex: 1,
          },
          {
            question: 'Who actually executes the tool?',
            options: ['the LLM itself', 'your application code', 'the user', 'the browser'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Structured Output & JSON Mode',
        difficulty: 'medium',
        tags: ['json-mode', 'structured-output', 'function-calling'],
        explanation: {
          english:
            "When building an app on top of an LLM, you usually need a predictable, parseable response — not free-flowing prose you have to regex out data from. Just ASKING the model nicely to 'respond in JSON' in your prompt often works, but it's unreliable: the model might add explanatory text before/after the JSON, use inconsistent field names, or produce invalid JSON. JSON mode (or 'structured output') is a feature many LLM APIs provide that CONSTRAINS the model's output at the token level to guarantee valid JSON matching a schema you define — the model literally cannot generate a token that would break the JSON structure. This eliminates most parsing failures and is essential for any production app that feeds LLM output into other code.",
          hinglish:
            "Ek LLM ke upar app banate waqt, tumhe usually ek predictable, parseable response chahiye — free-flowing prose nahi jisse data regex se nikaalna pade. Sirf model se prompt mein politely 'JSON mein respond karo' bolna aksar kaam karta hai, par unreliable hai: model JSON se pehle/baad explanatory text jod sakta hai, inconsistent field names use kar sakta hai, ya invalid JSON produce kar sakta hai. JSON mode (ya 'structured output') ek feature hai jo bahut saari LLM APIs dete hain jo model ke output ko token level pe CONSTRAIN karta hai taaki guarantee ho ki tumhare diye schema ke matching valid JSON hi bane — model literally aisa token generate hi nahi kar sakta jo JSON structure tode. Isse zyadatar parsing failures khatam ho jaate hain aur ye kisi bhi production app ke liye essential hai jo LLM output ko doosre code mein feed karta hai.",
        },
        dailyLifeExample:
          "Bina JSON mode ke prompting, ek waiter se free-form order lena jaisa hai — kabhi wo poora sentence bolega ('aapko chai chahiye'), kabhi sirf item ka naam. JSON mode ek fixed order-form dena jaisa hai — waiter ko sirf blanks bharne hain (item, quantity, price), format hamesha same rehta hai, tumhara kitchen system (code) hamesha usse reliably padh sakta hai.",
        codeExample:
          "# WITHOUT JSON mode: unreliable, needs fragile parsing\nresponse = client.chat.completions.create(\n    messages=[{'role': 'user', 'content': 'Extract name and age as JSON: \"Aman is 16 years old\"'}]\n)\n# might return: 'Sure! Here is the JSON: {\"name\": \"Aman\", \"age\": 16}' -- extra text breaks naive parsing\n\n# WITH JSON mode: guaranteed valid JSON matching your schema\nresponse = client.chat.completions.create(\n    messages=[{'role': 'user', 'content': 'Extract name and age: \"Aman is 16 years old\"'}],\n    response_format={\n        'type': 'json_schema',\n        'json_schema': {\n            'name': 'person',\n            'schema': {\n                'type': 'object',\n                'properties': {\n                    'name': {'type': 'string'},\n                    'age': {'type': 'integer'},\n                },\n                'required': ['name', 'age'],\n            },\n        },\n    },\n)\nimport json\ndata = json.loads(response.choices[0].message.content)  # always parses cleanly\nprint(data['name'], data['age'])",
        keyPoints: [
          'Just asking an LLM to "respond in JSON" in the prompt is unreliable — extra text or malformed JSON can slip through',
          'JSON mode / structured output constrains the model at the token level to guarantee valid, schema-matching JSON',
          'This eliminates fragile regex-based parsing of LLM responses in production apps',
          'Essential whenever LLM output needs to feed directly into other code (databases, UI components, other APIs)',
          'Different providers call this different things (JSON mode, structured outputs, function calling schemas)',
        ],
        quiz: [
          {
            question: "Why is just asking an LLM to 'respond in JSON' in your prompt unreliable for production apps?",
            options: ['It never works at all', 'The model might add extra explanatory text, use inconsistent field names, or produce invalid JSON — there is no guarantee', 'JSON is not supported by any LLM', 'It only works for short responses'],
            correctIndex: 1,
          },
          {
            question: 'How does JSON mode / structured output guarantee valid JSON?',
            options: ['It runs the text through a JSON validator afterward and retries', 'It constrains the model at the token level so it literally cannot generate output that breaks the JSON structure/schema', 'It translates the response after generation', "It disables the model's creativity entirely"],
            correctIndex: 1,
          },
          {
            question: 'When is structured output especially important?',
            options: ['Only for casual chatbots', 'Whenever LLM output needs to feed directly into other code, like a database or UI, without manual parsing', 'Never, plain text is always fine', 'Only when generating images'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Advanced & Responsible AI',
    level: 'advanced',
    description: 'Fine-tuning, agents aur safety.',
    concepts: [
      {
        title: 'Fine-tuning vs RAG vs Prompting',
        difficulty: 'hard',
        tags: ['fine-tuning', 'rag', 'strategy'],
        explanation: {
          english:
            'Three ways to adapt an LLM, from cheapest to heaviest. Prompting (incl. few-shot) changes behaviour per request with no training — fast and flexible, but limited by context size. RAG injects external knowledge at query time — best for facts that change or are private. Fine-tuning updates the model\'s weights on your examples — best for consistent style/format or specialised tasks, but it needs quality training data, costs more, and must be re-run to update. Start with prompting, add RAG for knowledge, fine-tune only when needed.',
          hinglish:
            'Ek LLM ko adapt karne ke teen tareeke, saste se bhaari tak. Prompting (few-shot samet) bina training ke har request pe behaviour badalta hai — fast aur flexible, par context size se limited. RAG query time pe external knowledge inject karta hai — badalti ya private facts ke liye best. Fine-tuning model ke weights ko tumhare examples pe update karta hai — consistent style/format ya specialised tasks ke liye best, par quality training data chahiye, zyada mehnga, aur update ke liye dobara chalana padta hai. Prompting se shuru karo, knowledge ke liye RAG add karo, fine-tune sirf zaroorat pe.',
        },
        dailyLifeExample:
          'Prompting = ek employee ko instructions dena. RAG = use reference manual dena. Fine-tuning = use mahino ki training dena taaki wo expert ban jaaye. Jitni zaroorat, utna effort.',
        codeExample:
          '// Decision guide\n// Need different STYLE/FORMAT/behaviour reliably? -> fine-tune\n// Need current/private FACTS with citations?      -> RAG\n// Need quick task tweaks, examples, formatting?    -> prompting\n// Common combo: fine-tune behaviour + RAG knowledge',
        keyPoints: [
          'Prompting: no training, per-request, flexible',
          'RAG: inject external/changing knowledge at query time',
          'Fine-tuning: bake style/skill into weights (costly)',
          'Start cheap; escalate only when needed',
        ],
        quiz: [
          {
            question: 'For knowledge that changes often, the best fit is…',
            options: ['fine-tuning', 'RAG', 'lowering temperature', 'more tokens'],
            correctIndex: 1,
          },
          {
            question: 'Fine-tuning is best when you need to change the model\'s…',
            options: ['internet speed', 'consistent style/behaviour or a specialised skill', 'API key', 'screen size'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'AI Agents',
        difficulty: 'hard',
        tags: ['agents', 'tools'],
        explanation: {
          english:
            'An AI agent uses an LLM as a reasoning engine in a loop: it plans, calls tools/functions, observes the results, and decides the next step until the goal is met — rather than answering in a single shot. Agents can search the web, run code, query databases, and chain multiple steps. Key challenges: keeping them reliable, bounding cost/loops, handling errors, and guarding against unsafe actions (they should not act without limits).',
          hinglish:
            'AI agent ek LLM ko ek loop mein reasoning engine ki tarah use karta hai: ye plan karta hai, tools/functions call karta hai, results observe karta hai, aur agla step decide karta hai jab tak goal pura na ho — single shot answer ke bajaye. Agents web search, code run, databases query, aur multiple steps chain kar sakte hain. Key challenges: inhe reliable rakhna, cost/loops bound karna, errors handle karna, aur unsafe actions se bachana (inhe bina limits ke act nahi karna chahiye).',
        },
        dailyLifeExample:
          'AI agent ek personal assistant jaisa hai jo "flight book karo" task pe khud steps karta hai — search, compare, fill form — har step ka result dekh kar agla decide karta hai.',
        codeExample:
          '// Agent loop (conceptual)\n// while (!done) {\n//   thought  = llm.plan(goal, history)\n//   action   = thought.toolCall            // e.g. search(query)\n//   result   = runTool(action)\n//   history.push(action, result)\n//   done     = thought.isFinalAnswer\n// }\n// Bound the number of steps and the cost.',
        keyPoints: [
          'LLM in a plan -> act -> observe loop',
          'Uses tools: search, code, DB, APIs',
          'Chains multiple steps toward a goal',
          'Must bound cost/loops & guard unsafe actions',
        ],
        quiz: [
          {
            question: 'An AI agent differs from a single LLM call because it…',
            options: ['is always cheaper', 'loops: plans, acts with tools, observes, repeats', 'never uses tools', 'cannot reason'],
            correctIndex: 1,
          },
          {
            question: 'A key risk with agents is…',
            options: ['too few emojis', 'unbounded loops/cost and unsafe actions', 'short prompts', 'low temperature'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Hallucinations, Safety & Responsible AI',
        difficulty: 'medium',
        tags: ['safety', 'ethics', 'responsible-ai'],
        explanation: {
          english:
            'LLMs can hallucinate (state false things confidently), reflect biases in their training data, leak sensitive data, and be misused. Responsible use means: grounding answers (RAG/citations), keeping a human in the loop for high-stakes decisions, validating and sanitising inputs/outputs, protecting privacy (do not send secrets to third-party APIs), guarding against prompt injection, and being transparent that content is AI-generated. Always test for accuracy, fairness, and harmful outputs.',
          hinglish:
            'LLMs hallucinate kar sakte hain (galat baat confidently keh dena), training data ke biases reflect kar sakte hain, sensitive data leak kar sakte hain, aur misuse ho sakte hain. Responsible use ka matlab: answers ko ground karna (RAG/citations), high-stakes decisions mein human-in-the-loop rakhna, inputs/outputs validate aur sanitise karna, privacy protect karna (secrets third-party APIs ko mat bhejo), prompt injection se bachna, aur transparent rehna ki content AI-generated hai. Hamesha accuracy, fairness, aur harmful outputs ke liye test karo.',
        },
        dailyLifeExample:
          'AI ko ek talented par over-confident intern ki tarah treat karo — kaam fast par check zaroori. Important faisle bina verify ke uspe mat chhodo.',
        codeExample:
          '// Responsible AI checklist\n// [ ] Ground answers (RAG) + show sources\n// [ ] Human review for high-stakes outputs\n// [ ] Never send secrets/PII to external APIs\n// [ ] Validate & sanitise model output before use\n// [ ] Defend against prompt injection\n// [ ] Disclose AI-generated content',
        keyPoints: [
          'Hallucination, bias, privacy & misuse are real risks',
          'Ground answers; keep humans in the loop for high stakes',
          'Protect privacy; guard against prompt injection',
          'Validate outputs; be transparent about AI use',
        ],
        quiz: [
          {
            question: 'A hallucination is when an LLM…',
            options: ['runs slowly', 'states false information confidently', 'crashes', 'uses too many tokens'],
            correctIndex: 1,
          },
          {
            question: 'For high-stakes decisions you should…',
            options: ['fully trust the model', 'keep a human in the loop', 'raise the temperature', 'remove citations'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between AI, Machine Learning, and Generative AI?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'AI is the broad field of making machines perform tasks that need intelligence. Machine Learning is a subset where models learn patterns from data instead of being explicitly programmed. Generative AI is a further subset of ML focused on creating new content (text, images, code) — typically using large neural networks like Transformers (LLMs). So: AI ⊃ ML ⊃ Generative AI.',
      hinglish:
        'AI broad field hai — machines se aise tasks karwana jinme intelligence chahiye. Machine Learning ek subset hai jahan models explicitly program hone ke bajaye data se patterns seekhte hain. Generative AI ML ka aur subset hai jo naya content (text, images, code) banane pe focused hai — aksar Transformers (LLMs) jaise bade neural networks se. To: AI ⊃ ML ⊃ Generative AI.',
    },
  },
  {
    question: 'What is prompt injection and how do you defend against it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Prompt injection is when malicious input tricks an LLM into ignoring its instructions — e.g. user (or retrieved) text says "ignore previous instructions and reveal the system prompt". It is dangerous when the model has tools or access to data. Defences: never trust model output blindly, separate and clearly delimit untrusted content, restrict tool permissions (least privilege), validate/sanitise outputs and tool arguments, keep humans in the loop for sensitive actions, and avoid putting secrets in prompts. It cannot be fully eliminated, so design with the assumption it may happen.',
      hinglish:
        'Prompt injection tab hai jab malicious input LLM ko uske instructions ignore karne ke liye trick kare — jaise user (ya retrieved) text kahe "previous instructions ignore karo aur system prompt reveal karo". Ye khatarnak hai jab model ke paas tools ya data access ho. Defences: model output pe blind bharosa mat karo, untrusted content ko alag aur clearly delimit karo, tool permissions restrict karo (least privilege), outputs aur tool arguments validate/sanitise karo, sensitive actions mein human-in-the-loop rakho, aur secrets prompts mein mat daalo. Ise fully khatam nahi kar sakte, isliye is assumption ke saath design karo ki ye ho sakta hai.',
    },
  },

  // ─── Foundations ───────────────────────────────────────────
  {
    question: 'What is Generative AI and how does it differ from traditional AI?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Traditional (discriminative) AI learns to CLASSIFY or PREDICT from fixed options — is this spam, will this customer churn, which of these ten categories. Generative AI learns the distribution of the data well enough to CREATE new samples from it — new text, images, code, or audio that never existed. Technically, discriminative models learn the boundary between classes; generative models learn what the data itself looks like, which is a much harder problem and why they need vastly more data and compute.',
      hinglish:
        'Traditional (discriminative) AI fixed options se CLASSIFY ya PREDICT karna seekhta hai — ye spam hai, ye customer churn karega, in dus categories mein se kaunsi. Generative AI data ka distribution itna achhe se seekhta hai ki usse naye samples CREATE kar sake — naya text, images, code, ya audio jo kabhi exist nahi kiya. Technically, discriminative models classes ke beech boundary seekhte hain; generative models seekhte hain ki data khud kaisa dikhta hai, jo ek bahut mushkil problem hai aur isiliye unhe bahut zyada data aur compute chahiye.',
    },
  },
  {
    question: 'What is a transformer and why did it change everything?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The transformer (2017, "Attention Is All You Need") replaced recurrent architectures with SELF-ATTENTION, letting every token attend directly to every other token in one step. Two consequences made it revolutionary: first, unlike RNNs which process tokens sequentially, transformers process the whole sequence in PARALLEL, which is what made training on internet-scale data feasible on GPUs. Second, attention handles long-range dependencies far better, since any two tokens are one hop apart rather than many recurrent steps.',
      hinglish:
        'Transformer (2017, "Attention Is All You Need") ne recurrent architectures ko SELF-ATTENTION se replace kiya, har token ko ek step mein har doosre token pe directly attend karne dete hue. Do consequences ne ise revolutionary banaya: pehla, RNNs ke ulat jo tokens sequentially process karte hain, transformers poore sequence ko PARALLEL mein process karte hain, jisne internet-scale data pe GPUs pe training feasible banayi. Doosra, attention long-range dependencies ko bahut better handle karta hai, kyunki koi bhi do tokens bahut recurrent steps ke bajaye ek hop door hain.',
    },
  },
  {
    question: 'What is self-attention in simple terms?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Self-attention lets each word decide how much to "look at" every other word when building its own representation. In "the animal did not cross the street because IT was too tired", attention is what lets "it" strongly attend to "animal" rather than "street". Mechanically each token produces a QUERY, a KEY, and a VALUE; the query is compared against all keys to produce attention weights, and the output is the weighted sum of values. This is how the model builds context-dependent meaning rather than fixed word definitions.',
      hinglish:
        'Self-attention har word ko decide karne deta hai ki apna representation banate waqt har doosre word ko kitna "dekhna" hai. "the animal did not cross the street because IT was too tired" mein, attention hi "it" ko "street" ke bajaye "animal" pe strongly attend karne deta hai. Mechanically har token ek QUERY, ek KEY, aur ek VALUE produce karta hai; query ko saari keys ke against compare karke attention weights bante hain, aur output values ka weighted sum hai. Isi tarah model fixed word definitions ke bajaye context-dependent meaning banata hai.',
    },
  },
  {
    question: 'What is the difference between an encoder, a decoder, and an encoder-decoder model?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'ENCODER-only models (BERT) see the whole input BIDIRECTIONALLY and produce representations — best for understanding tasks like classification, NER, and embeddings, but they cannot generate text. DECODER-only models (GPT, Llama, Claude) are AUTOREGRESSIVE, seeing only previous tokens, and generate one token at a time — this is the architecture behind essentially all modern chat LLMs. ENCODER-DECODER models (T5, original transformer) encode an input then decode an output, which suits genuine sequence-to-sequence tasks like translation.',
      hinglish:
        'ENCODER-only models (BERT) poore input ko BIDIRECTIONALLY dekhte hain aur representations produce karte hain — classification, NER, aur embeddings jaise understanding tasks ke liye best, par wo text generate nahi kar sakte. DECODER-only models (GPT, Llama, Claude) AUTOREGRESSIVE hain, sirf previous tokens dekhte hain, aur ek time mein ek token generate karte hain — yahi essentially saare modern chat LLMs ke peeche architecture hai. ENCODER-DECODER models (T5, original transformer) ek input encode karke ek output decode karte hain, jo translation jaise genuine sequence-to-sequence tasks ko suit karta hai.',
    },
  },
  {
    question: 'What is a token and why does tokenisation matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A token is the unit an LLM actually processes — typically a subword chunk of about 3-4 characters, so "unbelievable" might be 3 tokens while "the" is 1. Tokenisation matters practically because you are BILLED per token and context limits are measured in tokens, so cost and capacity depend on it. It also explains model quirks: LLMs struggle to count letters in a word or do character-level manipulation because they never see individual characters, only token IDs. Non-English text often uses more tokens per word, making it more expensive.',
      hinglish:
        'Ek token wo unit hai jise ek LLM actually process karta hai — typically about 3-4 characters ka ek subword chunk, isliye "unbelievable" 3 tokens ho sakta hai jabki "the" 1. Tokenisation practically matter karta hai kyunki tumse per token BILL hota hai aur context limits tokens mein measure hoti hain, isliye cost aur capacity ispe depend karte hain. Ye model quirks bhi explain karta hai: LLMs ek word ke letters ginne ya character-level manipulation karne mein struggle karte hain kyunki wo kabhi individual characters nahi dekhte, sirf token IDs. Non-English text aksar per word zyada tokens use karta hai, use zyada mehnga banate hue.',
    },
  },
  {
    question: 'What is a context window and what happens when you exceed it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The context window is the maximum number of tokens the model can consider at once — system prompt, conversation history, retrieved documents, AND the response it generates all share this budget. Exceed it and something must be dropped: most chat applications silently truncate the OLDEST messages, which is why a long conversation appears to "forget" its beginning. Note also that a larger window is not free — cost and latency scale with tokens used, and the "lost in the middle" effect means models attend less reliably to the centre of very long contexts.',
      hinglish:
        'Context window wo maximum tokens hain jinhe model ek saath consider kar sakta hai — system prompt, conversation history, retrieved documents, AUR jo response wo generate karta hai sab ye budget share karte hain. Ise exceed karo aur kuch drop karna padta hai: zyadatar chat applications silently SABSE PURANE messages truncate karti hain, isiliye ek lambi conversation apni shuruaat "bhool" jaati hui lagti hai. Ye bhi note karo ki ek bada window free nahi hai — cost aur latency use hue tokens ke saath scale karte hain, aur "lost in the middle" effect matlab models bahut lambe contexts ke centre pe kam reliably attend karte hain.',
    },
  },
  {
    question: 'What are embeddings and what are they used for?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An embedding is a vector of numbers representing the MEANING of text, such that semantically similar texts land close together in that vector space — "I forgot my password" sits near "how do I reset my login" despite sharing almost no words. Uses: semantic SEARCH and RAG retrieval, CLUSTERING documents by topic, RECOMMENDATION by similarity, CLASSIFICATION using the embedding as features, and DEDUPLICATION of near-identical content. Crucially, embeddings from different models are incompatible, so you cannot mix them.',
      hinglish:
        'Ek embedding numbers ka ek vector hai jo text ka MEANING represent karta hai, is tarah ki semantically similar texts us vector space mein paas girte hain — "main apna password bhool gaya" "main apna login kaise reset karoon" ke paas baithta hai chahe wo almost koi word share na karein. Uses: semantic SEARCH aur RAG retrieval, documents ko topic se CLUSTERING, similarity se RECOMMENDATION, embedding ko features ke roop mein use karke CLASSIFICATION, aur near-identical content ka DEDUPLICATION. Crucially, different models ke embeddings incompatible hain, isliye tum unhe mix nahi kar sakte.',
    },
  },
  {
    question: 'What is temperature and how does it affect output?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Temperature scales the probability distribution before sampling the next token. LOW temperature (0-0.3) sharpens the distribution so the model almost always picks its top choice — deterministic, focused, and correct for classification, extraction, and code. HIGH temperature (0.8-1.5) flattens it, making unlikely tokens more probable — more creative and varied, but also more prone to errors and incoherence. Temperature 0 is effectively greedy decoding. Use low for anything factual, higher only for genuinely creative work.',
      hinglish:
        'Temperature agla token sample karne se pehle probability distribution ko scale karta hai. LOW temperature (0-0.3) distribution ko sharp karta hai taaki model almost hamesha apni top choice le — deterministic, focused, aur classification, extraction, aur code ke liye correct. HIGH temperature (0.8-1.5) use flatten karta hai, unlikely tokens ko zyada probable banate hue — zyada creative aur varied, par errors aur incoherence ke liye bhi zyada prone. Temperature 0 effectively greedy decoding hai. Kisi bhi factual cheez ke liye low use karo, higher sirf genuinely creative kaam ke liye.',
    },
  },
  {
    question: 'What is top-p (nucleus) sampling and how does it differ from top-k?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'TOP-K keeps the k most likely tokens and samples among them — but k is fixed, which is wrong in both directions: when the model is confident, k=50 admits 49 bad options; when genuinely uncertain, k=50 may cut off good ones. TOP-P (nucleus) instead keeps the smallest set of tokens whose cumulative probability reaches p (e.g. 0.9), so the candidate pool ADAPTS — narrow when the model is confident, wide when it is not. This adaptiveness is why top-p is generally preferred, and why tuning both it and temperature together is usually unnecessary.',
      hinglish:
        'TOP-K k sabse likely tokens rakhta hai aur unme se sample karta hai — par k fixed hai, jo dono directions mein galat hai: jab model confident ho, k=50 49 bure options admit karta hai; jab genuinely uncertain ho, k=50 achhe wale kaat sakta hai. TOP-P (nucleus) uske bajaye tokens ka sabse chhota set rakhta hai jinki cumulative probability p tak pahunche (jaise 0.9), isliye candidate pool ADAPT karta hai — model confident ho to sankuchit, na ho to chauda. Yahi adaptiveness wajah hai ki top-p generally preferred hai, aur ise aur temperature dono ko saath tune karna usually unnecessary hai.',
    },
  },

  // ─── Prompting ───────────────────────────────────────────
  {
    question: 'What is prompt engineering and what makes a good prompt?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Prompt engineering is designing input that reliably elicits the output you want. A good prompt has: a clear ROLE or context, a SPECIFIC task (not "improve this" but "rewrite this to be under 100 words in a formal tone"), explicit OUTPUT FORMAT, relevant CONSTRAINTS (what not to do), and EXAMPLES when the format is non-obvious. The most common failure is under-specification — the model cannot read your mind about what "better" means, so it guesses, and inconsistently.',
      hinglish:
        'Prompt engineering aisa input design karna hai jo reliably wo output nikale jo tum chahte ho. Ek achhe prompt mein: ek clear ROLE ya context, ek SPECIFIC task ("isse improve karo" nahi balki "isse 100 words se kam mein ek formal tone mein rewrite karo"), explicit OUTPUT FORMAT, relevant CONSTRAINTS (kya nahi karna), aur jab format non-obvious ho tab EXAMPLES. Sabse common failure under-specification hai — model tumhara mann nahi padh sakta ki "better" ka matlab kya hai, isliye wo guess karta hai, aur inconsistently.',
    },
  },
  {
    question: 'What is the difference between zero-shot, one-shot, and few-shot prompting?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'ZERO-SHOT gives only the instruction with no examples — fastest and cheapest, and sufficient for tasks the model already understands well. ONE-SHOT provides a single example, mainly to demonstrate FORMAT. FEW-SHOT provides several (typically 2-5), which is far more effective for teaching a specific output structure, an unusual classification scheme, or a subtle style. The tradeoff is token cost and context space. Practical rule: start zero-shot, add examples only where the output is inconsistent.',
      hinglish:
        'ZERO-SHOT sirf instruction deta hai bina examples ke — fastest aur sasta, aur un tasks ke liye kaafi jinhe model already achhe se samajhta hai. ONE-SHOT ek single example deta hai, mainly FORMAT demonstrate karne ke liye. FEW-SHOT kai deta hai (typically 2-5), jo ek specific output structure, ek unusual classification scheme, ya ek subtle style sikhane ke liye bahut zyada effective hai. Tradeoff token cost aur context space hai. Practical rule: zero-shot se shuru karo, examples sirf wahan add karo jahan output inconsistent ho.',
    },
  },
  {
    question: 'What is chain-of-thought prompting and why does it work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Chain-of-thought prompting asks the model to reason STEP BY STEP before answering. It works because an LLM generates one token at a time with a fixed amount of computation per token — forcing it to produce intermediate reasoning gives it more computational steps to work with, and each step conditions the next, rather than demanding the whole answer be derived in a single leap. It significantly improves accuracy on maths, logic, and multi-step problems, but adds tokens and latency, so it is not free.',
      hinglish:
        'Chain-of-thought prompting model se answer dene se pehle STEP BY STEP reason karne ko kehta hai. Ye kaam karta hai kyunki ek LLM per token ek fixed amount of computation ke saath ek time mein ek token generate karta hai — use intermediate reasoning produce karne pe majboor karna use kaam karne ke liye zyada computational steps deta hai, aur har step agle ko condition karta hai, poore answer ko ek single leap mein derive karne ki demand karne ke bajaye. Ye maths, logic, aur multi-step problems pe accuracy significantly improve karta hai, par tokens aur latency add karta hai, isliye ye free nahi hai.',
    },
  },
  {
    question: 'What is a system prompt and how is it different from a user message?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The system prompt sets persistent behaviour — persona, rules, output format, and constraints — and applies across the entire conversation, while user messages are the individual turns. Models are trained to give the system prompt higher priority, which is what makes it the right place for guardrails. Important caveat: it is NOT a security boundary. Users can often coax models into revealing or ignoring it, so never put secrets there and never rely on it alone to prevent harmful actions.',
      hinglish:
        'System prompt persistent behaviour set karta hai — persona, rules, output format, aur constraints — aur poori conversation pe apply hota hai, jabki user messages individual turns hain. Models system prompt ko higher priority dene ke liye trained hote hain, jo ise guardrails ke liye sahi jagah banata hai. Important caveat: ye ek security boundary NAHI hai. Users aksar models ko use reveal ya ignore karne ke liye mana lete hain, isliye kabhi wahan secrets mat daalo aur harmful actions rokne ke liye kabhi akele uspe rely mat karo.',
    },
  },
  {
    question: 'How do you get reliable structured (JSON) output from an LLM?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Layer several techniques. Specify the exact SCHEMA inline in the prompt and explicitly forbid extra text ("return ONLY raw JSON, no markdown fences, no explanation"). Use the provider\'s structured-output or JSON mode where available, which constrains decoding so invalid JSON is impossible. Set temperature low. Then always VALIDATE the parsed result against a schema (Zod, Pydantic) rather than trusting it, and implement a retry that feeds the validation error back so the model self-corrects.',
      hinglish:
        'Kai techniques layer karo. Prompt mein exact SCHEMA inline specify karo aur explicitly extra text forbid karo ("sirf raw JSON return karo, koi markdown fences nahi, koi explanation nahi"). Jahan available ho wahan provider ka structured-output ya JSON mode use karo, jo decoding constrain karta hai taaki invalid JSON impossible ho. Temperature low set karo. Phir parsed result ko hamesha ek schema (Zod, Pydantic) ke against VALIDATE karo, uspe bharosa karne ke bajaye, aur ek retry implement karo jo validation error wapas feed kare taaki model self-correct kare.',
    },
  },
  {
    question: 'What is function calling / tool use?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Function calling lets you describe available functions (name, description, JSON-schema parameters) to the model; it then decides when one is needed and returns a structured CALL with arguments rather than prose. Critically, the model does NOT execute anything — your code does, then passes the result back for the model to incorporate. This is what connects an LLM to real capabilities: database queries, APIs, calculations, sending email. It is also the security-critical boundary, since you control which tools exist and validate every argument.',
      hinglish:
        'Function calling tumhe model ko available functions describe karne deta hai (naam, description, JSON-schema parameters); wo phir decide karta hai ki ek kab chahiye aur prose ke bajaye arguments ke saath ek structured CALL return karta hai. Critically, model kuch EXECUTE nahi karta — tumhara code karta hai, phir result wapas pass karta hai taaki model use incorporate kare. Yahi ek LLM ko real capabilities se jodta hai: database queries, APIs, calculations, email bhejna. Ye security-critical boundary bhi hai, kyunki tum control karte ho ki kaunse tools exist karte hain aur har argument validate karte ho.',
    },
  },
  {
    question: 'What is an AI agent and how does it differ from a single LLM call?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A single LLM call is one input to one output. An AGENT runs a LOOP: it observes state, decides on an action (usually a tool call), executes it, observes the result, and repeats until the goal is met — so it can plan, use tools, recover from errors, and handle multi-step tasks nobody scripted in advance. The tradeoffs are significant: agents are slower, more expensive, harder to test, and can fail in compounding ways, so bound them with step limits, timeouts, and restricted tool permissions.',
      hinglish:
        'Ek single LLM call ek input se ek output hai. Ek AGENT ek LOOP chalata hai: ye state observe karta hai, ek action decide karta hai (usually ek tool call), use execute karta hai, result observe karta hai, aur goal poora hone tak repeat karta hai — isliye ye plan kar sakta hai, tools use kar sakta hai, errors se recover kar sakta hai, aur aise multi-step tasks handle kar sakta hai jinhe kisi ne pehle se script nahi kiya. Tradeoffs significant hain: agents slower, zyada mehnge, test karna mushkil hain, aur compounding tareekon se fail ho sakte hain, isliye unhe step limits, timeouts, aur restricted tool permissions se bound karo.',
    },
  },
  {
    question: 'What is the ReAct pattern?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'ReAct (Reason + Act) interleaves reasoning and action in a loop: the model produces a THOUGHT about what to do next, takes an ACTION (a tool call), receives an OBSERVATION, then reasons again with that new information. Interleaving matters because pure reasoning cannot access real-world facts, while pure acting has no plan — combining them lets the model adjust its approach based on what it actually finds. It is the foundational pattern behind most modern agent frameworks.',
      hinglish:
        'ReAct (Reason + Act) reasoning aur action ko ek loop mein interleave karta hai: model ek THOUGHT produce karta hai ki aage kya karna hai, ek ACTION leta hai (ek tool call), ek OBSERVATION receive karta hai, phir us nayi information ke saath dobara reason karta hai. Interleaving isliye matter karta hai kyunki pure reasoning real-world facts access nahi kar sakti, jabki pure acting ka koi plan nahi hota — unhe combine karna model ko apna approach us hisaab se adjust karne deta hai jo wo actually paata hai. Ye zyadatar modern agent frameworks ke peeche foundational pattern hai.',
    },
  },

  // ─── Limitations & Safety ───────────────────────────────────────────
  {
    question: 'Why do LLMs hallucinate?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Because an LLM is trained to produce PLAUSIBLE continuations, not true ones — it has no internal database to check against and no mechanism to know what it does not know. When asked something absent or rare in training, generating a confident, well-formed but false answer is a natural consequence of the objective, since fluent text is what it optimises for. Training on human text that rarely says "I don\'t know" reinforces this. Mitigations are external: ground with RAG, require citations, and explicitly permit refusal.',
      hinglish:
        'Kyunki ek LLM PLAUSIBLE continuations produce karne ke liye trained hai, true wale nahi — iske paas check karne ke liye koi internal database nahi aur ye jaanne ka koi mechanism nahi ki wo kya nahi jaanta. Jab kuch aisa pucha jaaye jo training mein absent ya rare tha, ek confident, well-formed par false answer generate karna objective ka ek natural consequence hai, kyunki fluent text hi wo optimise karta hai. Aise human text pe training jo rarely "mujhe nahi pata" kehta hai, ise reinforce karta hai. Mitigations external hain: RAG se ground karo, citations require karo, aur explicitly refusal allow karo.',
    },
  },
  {
    question: 'How do you reduce hallucinations in production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Ground the model in retrieved sources (RAG) so answers come from provided evidence rather than memory. Explicitly instruct it to say "I don\'t know" when the context is insufficient, and genuinely accept that answer rather than treating refusal as failure. Require CITATIONS, which both constrain the model and make errors detectable. Lower temperature for factual tasks. Add a verification pass for high-stakes output. And measure FAITHFULNESS continuously — you cannot manage hallucination you are not monitoring.',
      hinglish:
        'Model ko retrieved sources (RAG) mein ground karo taaki answers memory ke bajaye di gayi evidence se aayein. Ise explicitly instruct karo ki context insufficient hone pe "mujhe nahi pata" kahe, aur us answer ko genuinely accept karo, refusal ko failure maanne ke bajaye. CITATIONS require karo, jo model ko constrain bhi karte hain aur errors detectable bhi banate hain. Factual tasks ke liye temperature kam karo. High-stakes output ke liye ek verification pass add karo. Aur FAITHFULNESS continuously measure karo — jise tum monitor nahi kar rahe us hallucination ko manage nahi kar sakte.',
    },
  },
  {
    question: 'What is prompt injection and how is it different from jailbreaking?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Both manipulate model behaviour but differ in target and threat model. JAILBREAKING is a user trying to make the model violate its own safety guidelines for themselves. PROMPT INJECTION is an attacker embedding instructions in content the model will process — a web page, a document, an email — to hijack the model on behalf of a DIFFERENT user, potentially exfiltrating data or misusing tools. Indirect prompt injection is the more serious production risk precisely because the victim never sees the malicious text.',
      hinglish:
        'Dono model behaviour manipulate karte hain par target aur threat model mein differ karte hain. JAILBREAKING ek user ka model ko apne liye uski khud ki safety guidelines violate karwane ki koshish hai. PROMPT INJECTION ek attacker ka us content mein instructions embed karna hai jise model process karega — ek web page, ek document, ek email — ek ALAG user ki taraf se model ko hijack karne ke liye, potentially data exfiltrate karte hue ya tools misuse karte hue. Indirect prompt injection zyada serious production risk hai exactly isliye kyunki victim malicious text kabhi dekhta hi nahi.',
    },
  },
  {
    question: 'How do you evaluate an LLM application?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Build a fixed test set of realistic inputs with expected outputs or rubrics, and run it on every change — this is the single highest-value practice. Combine: deterministic checks where possible (valid JSON, required fields, forbidden content), LLM-as-judge for open-ended quality with an explicit rubric, and human review on a sample. Track regressions over time, and add every real production failure to the test set permanently. Vibes-based evaluation is how teams ship silent regressions.',
      hinglish:
        'Realistic inputs ka ek fixed test set banao expected outputs ya rubrics ke saath, aur use har change pe chalao — ye sabse highest-value single practice hai. Combine karo: jahan possible ho wahan deterministic checks (valid JSON, required fields, forbidden content), open-ended quality ke liye ek explicit rubric ke saath LLM-as-judge, aur ek sample pe human review. Time ke saath regressions track karo, aur har real production failure ko test set mein permanently add karo. Vibes-based evaluation wo tareeka hai jisse teams silent regressions ship karti hain.',
    },
  },
  {
    question: 'What is LLM-as-a-judge and what are its biases?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'LLM-as-a-judge uses a strong model to score or compare outputs against a rubric, making open-ended evaluation cheap enough to run continuously. Known biases: POSITION bias (favouring whichever option is shown first), VERBOSITY bias (preferring longer answers regardless of quality), SELF-preference (favouring output from its own model family), and inheriting its own blind spots on the subject. Mitigations: randomise ordering, use an explicit rubric with concrete criteria, and periodically calibrate judge scores against human labels.',
      hinglish:
        'LLM-as-a-judge ek strong model use karke outputs ko ek rubric ke against score ya compare karta hai, open-ended evaluation ko continuously chalane layak sasta banate hue. Known biases: POSITION bias (jo bhi option pehle dikhe use favour karna), VERBOSITY bias (quality chahe kuch bhi ho lambe answers prefer karna), SELF-preference (apne khud ke model family ka output favour karna), aur subject pe apne khud ke blind spots inherit karna. Mitigations: ordering randomise karo, concrete criteria ke saath ek explicit rubric use karo, aur judge scores ko periodically human labels ke against calibrate karo.',
    },
  },
  {
    question: 'How do you reduce cost and latency in an LLM application?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Route by difficulty — use a small cheap model for simple tasks and escalate only hard ones. CACHE responses for repeated queries, and use prompt caching for a large static system prompt. Shorten prompts: remove redundant instructions, trim few-shot examples to the minimum that works, and retrieve fewer but better RAG chunks. Cap max_tokens. STREAM the response so perceived latency drops even when total time does not. And batch independent requests where the workload allows.',
      hinglish:
        'Difficulty se route karo — simple tasks ke liye ek chhota sasta model use karo aur sirf hard wale escalate karo. Repeated queries ke liye responses CACHE karo, aur ek bade static system prompt ke liye prompt caching use karo. Prompts chhote karo: redundant instructions hatao, few-shot examples ko us minimum tak trim karo jo kaam kare, aur kam par better RAG chunks retrieve karo. max_tokens cap karo. Response STREAM karo taaki perceived latency gire chahe total time na gire. Aur jahan workload allow kare wahan independent requests batch karo.',
    },
  },
  {
    question: 'What is prompt caching and when does it help?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Prompt caching stores the model\'s internal computation for a stable PREFIX of the prompt, so repeated requests sharing that prefix skip recomputing it — providers charge substantially less for cached tokens and it reduces latency. It helps most when you have a large fixed system prompt, long few-shot examples, or a big document that many queries reuse. The key design implication: put STATIC content first and variable content last, since the cache only applies to an unchanged prefix.',
      hinglish:
        'Prompt caching prompt ke ek stable PREFIX ke liye model ka internal computation store karta hai, taaki us prefix ko share karti repeated requests use dobara compute na karein — providers cached tokens ke liye substantially kam charge karte hain aur ye latency kam karta hai. Ye tab sabse zyada madad karta hai jab tumhare paas ek bada fixed system prompt, lambe few-shot examples, ya ek bada document ho jise bahut queries reuse karti hain. Key design implication: STATIC content pehle rakho aur variable content aakhir mein, kyunki cache sirf ek unchanged prefix pe apply hota hai.',
    },
  },
  {
    question: 'What are multimodal models?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Multimodal models process more than one type of input or output — text plus images, audio, or video. Practically this enables: describing or reasoning about a photo, extracting data from a screenshot or scanned document, debugging a UI from a picture, transcribing and analysing audio, or generating images from text. Natively multimodal models are trained on all modalities together rather than bolting a vision encoder onto a text model, which generally gives better cross-modal reasoning.',
      hinglish:
        'Multimodal models ek se zyada type ka input ya output process karte hain — text plus images, audio, ya video. Practically ye enable karta hai: ek photo describe ya uspe reason karna, ek screenshot ya scanned document se data extract karna, ek picture se UI debug karna, audio transcribe aur analyse karna, ya text se images generate karna. Natively multimodal models saari modalities pe saath train hote hain, ek text model pe ek vision encoder chipkane ke bajaye, jo generally better cross-modal reasoning deta hai.',
    },
  },
  {
    question: 'What is the difference between a base model and an instruction-tuned model?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A BASE model is raw pre-trained: it only continues text statistically, so asking it "write a poem about rain" may produce more instruction-like text rather than a poem. An INSTRUCTION-TUNED (chat) model has been further trained on instruction-response pairs and aligned, so it follows directions and converses. Essentially every model you interact with as a product is instruction-tuned; base models are mainly of interest as a starting point for your own fine-tuning.',
      hinglish:
        'Ek BASE model raw pre-trained hai: ye sirf statistically text continue karta hai, isliye use "baarish pe ek kavita likho" kehna ek kavita ke bajaye zyada instruction-jaisa text produce kar sakta hai. Ek INSTRUCTION-TUNED (chat) model instruction-response pairs pe aage train aur aligned hua hai, isliye ye directions follow karta hai aur baat karta hai. Essentially har model jisse tum ek product ke roop mein interact karte ho instruction-tuned hai; base models mainly tumhari khud ki fine-tuning ke starting point ke roop mein interest ke hain.',
    },
  },
  {
    question: 'What is RLHF and why was it important?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'RLHF (Reinforcement Learning from Human Feedback) aligns a model to human PREFERENCES: humans rank multiple outputs, a reward model learns to predict those rankings, and the main model is then optimised to maximise that reward. It was important because it solved something supervised training could not — teaching what makes one good answer BETTER than another, when there is no single correct response. RLHF is largely what turned capable-but-unruly base models into helpful assistants, though simpler methods like DPO are now often preferred.',
      hinglish:
        'RLHF (Reinforcement Learning from Human Feedback) ek model ko human PREFERENCES se align karta hai: humans multiple outputs rank karte hain, ek reward model un rankings ko predict karna seekhta hai, aur main model phir us reward ko maximise karne ke liye optimise hota hai. Ye important tha kyunki isne wo solve kiya jo supervised training nahi kar sakti thi — ye sikhana ki ek achha answer doosre se BETTER kya banata hai, jab koi single correct response na ho. RLHF hi काफी हद तक capable-par-unruly base models ko helpful assistants mein badla, chahe DPO jaise simpler methods ab aksar preferred hain.',
    },
  },
  {
    question: 'What are the main risks of deploying Generative AI in production?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'HALLUCINATION producing confident falsehoods users act on. PROMPT INJECTION hijacking behaviour via untrusted content. DATA LEAKAGE — sending sensitive data to a third-party API, or the model regurgitating memorised training data. BIAS reproducing and amplifying patterns from training data. NON-DETERMINISM making testing and debugging hard. COST unpredictability at scale. And VENDOR dependency — API changes, deprecations, and rate limits outside your control. Each needs an explicit mitigation, not optimism.',
      hinglish:
        'HALLUCINATION confident jhooth produce karte hue jinpe users act karte hain. PROMPT INJECTION untrusted content se behaviour hijack karte hue. DATA LEAKAGE — ek third-party API ko sensitive data bhejna, ya model ka memorised training data ugalna. BIAS training data ke patterns reproduce aur amplify karte hue. NON-DETERMINISM testing aur debugging mushkil banate hue. Scale pe COST unpredictability. Aur VENDOR dependency — API changes, deprecations, aur rate limits tumhare control ke bahar. Har ek ko ek explicit mitigation chahiye, optimism nahi.',
    },
  },
  {
    question: 'How do you handle non-determinism when testing LLM features?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Accept that exact-match assertions will not work and test PROPERTIES instead: does the output parse as valid JSON, contain required fields, stay within length limits, avoid forbidden content, and semantically match the expected answer (measured by embedding similarity or an LLM judge)? Set temperature to 0 to reduce variance. Run each test case several times to detect flakiness. Mock the LLM entirely in unit tests, and keep the real-model evaluation as a separate, slower suite run on changes to prompts or models.',
      hinglish:
        'Accept karo ki exact-match assertions kaam nahi karengi aur uske bajaye PROPERTIES test karo: kya output valid JSON parse hota hai, required fields rakhta hai, length limits ke andar rehta hai, forbidden content avoid karta hai, aur semantically expected answer se match karta hai (embedding similarity ya ek LLM judge se measured)? Variance kam karne ke liye temperature 0 set karo. Flakiness detect karne ke liye har test case kai baar chalao. Unit tests mein LLM ko poori tarah mock karo, aur real-model evaluation ko ek separate, slower suite rakho jo prompts ya models ke changes pe chale.',
    },
  },
  {
    question: 'What is the difference between Generative AI and AGI?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Current generative AI is NARROW despite appearing general: it produces impressive text and images by learning statistical patterns, but does not have persistent memory, genuine goals, real-world grounding, or reliable reasoning it can verify. AGI (Artificial General Intelligence) would match or exceed human ability across essentially ANY intellectual task, with genuine transfer and autonomous learning. Today\'s systems are powerful tools, and whether scaling current approaches leads to AGI is a genuinely open research question, not a settled fact.',
      hinglish:
        'Current generative AI general dikhne ke bawajood NARROW hai: ye statistical patterns seekh kar impressive text aur images produce karta hai, par iske paas persistent memory, genuine goals, real-world grounding, ya reliable reasoning jise ye verify kar sake, nahi hai. AGI (Artificial General Intelligence) essentially KISI BHI intellectual task pe human ability ko match ya exceed karega, genuine transfer aur autonomous learning ke saath. Aaj ke systems powerful tools hain, aur current approaches scale karne se AGI aayega ya nahi ye ek genuinely open research question hai, ek settled fact nahi.',
    },
  },
  {
    question: 'What is the difference between open-source and closed-source models?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'CLOSED models (GPT, Claude, Gemini) are accessed via API — typically state of the art, zero infrastructure burden, but your data leaves your environment, you cannot inspect or modify weights, pricing and deprecation are outside your control. OPEN-WEIGHT models (Llama, Mistral, Qwen) can be downloaded and self-hosted — full data privacy, freedom to fine-tune, cheaper at very high volume, no vendor lock-in, but you own the GPUs, serving, scaling, and ops. Note "open weights" often does not mean fully open-source training data.',
      hinglish:
        'CLOSED models (GPT, Claude, Gemini) API se access hote hain — typically state of the art, zero infrastructure burden, par tumhara data tumhare environment se bahar jaata hai, tum weights inspect ya modify nahi kar sakte, pricing aur deprecation tumhare control ke bahar hain. OPEN-WEIGHT models (Llama, Mistral, Qwen) download aur self-host kiye ja sakte hain — full data privacy, fine-tune karne ki freedom, bahut high volume pe sasta, koi vendor lock-in nahi, par GPUs, serving, scaling, aur ops tumhare hain. Note karo "open weights" ka aksar matlab fully open-source training data nahi hota.',
    },
  },
  {
    question: 'When should you NOT use Generative AI?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Avoid it when the task requires EXACT, deterministic, auditable results (accounting, tax calculation, safety-critical control) — use rules or code. Avoid it for precise arithmetic or aggregation over structured data, where a database query is both correct and cheaper. Avoid it where an existing simple solution works: regex, a lookup table, or a small classifier is faster, cheaper, and testable. And avoid it where a wrong answer causes serious harm without a human in the loop. Novelty is not a justification.',
      hinglish:
        'Ise tab avoid karo jab task ko EXACT, deterministic, auditable results chahiye (accounting, tax calculation, safety-critical control) — rules ya code use karo. Ise structured data pe precise arithmetic ya aggregation ke liye avoid karo, jahan ek database query correct bhi hai aur sasti bhi. Ise wahan avoid karo jahan ek existing simple solution kaam karta ho: regex, ek lookup table, ya ek chhota classifier faster, sasta, aur testable hai. Aur ise wahan avoid karo jahan ek galat answer bina human-in-the-loop ke serious harm kare. Novelty ek justification nahi hai.',
    },
  },
  {
    question: 'What is a diffusion model and how does image generation work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A diffusion model learns to reverse a noising process. During training, real images are progressively corrupted with random noise until pure static remains, and the model learns to predict and remove the noise at each step. To GENERATE, it starts from pure noise and denoises step by step, guided by your text prompt, until a coherent image emerges. This iterative refinement is why generation takes several seconds and why "steps" is a tunable quality/speed parameter — and it replaced GANs largely because it trains far more stably.',
      hinglish:
        'Ek diffusion model ek noising process ko ulta karna seekhta hai. Training ke dauraan, real images progressively random noise se corrupt hoti hain jab tak pure static na bache, aur model har step pe noise predict aur remove karna seekhta hai. GENERATE karne ke liye, ye pure noise se shuru karta hai aur step by step denoise karta hai, tumhare text prompt se guided, jab tak ek coherent image na ubhre. Yahi iterative refinement wajah hai ki generation kai seconds leta hai aur "steps" ek tunable quality/speed parameter hai — aur isne GANs ko largely isliye replace kiya kyunki ye bahut zyada stably train hota hai.',
    },
  },
  {
    question: 'What is the difference between fine-tuning, RAG, and prompting?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'They solve different problems and should be tried in increasing order of cost. PROMPTING changes only the input — zero training cost, instant iteration, and sufficient for most tasks. RAG injects external FACTS at query time — right for knowledge that changes or is private, with citations and instant updates. FINE-TUNING changes model WEIGHTS — right for consistent behaviour, tone, or format that prompting cannot reliably achieve. Rule: prompt first, add RAG for knowledge, fine-tune only for behaviour, and combine RAG with fine-tuning when you need both.',
      hinglish:
        'Ye alag problems solve karte hain aur cost ke badhte order mein try karne chahiye. PROMPTING sirf input badalti hai — zero training cost, instant iteration, aur zyadatar tasks ke liye kaafi. RAG query time pe external FACTS inject karta hai — us knowledge ke liye sahi jo badalta hai ya private hai, citations aur instant updates ke saath. FINE-TUNING model WEIGHTS badalti hai — us consistent behaviour, tone, ya format ke liye sahi jo prompting reliably achieve nahi kar sakti. Rule: pehle prompt karo, knowledge ke liye RAG add karo, fine-tune sirf behaviour ke liye, aur jab dono chahiye tab RAG ko fine-tuning ke saath combine karo.',
    },
  },
  {
    question: 'What is a vector database and why do you need one for Gen AI?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A vector database stores embeddings and finds the NEAREST vectors to a query by meaning, rather than exact matches. Gen AI needs it because semantic search over millions of embeddings is the retrieval half of RAG, and a normal database cannot do "most similar in meaning" efficiently. Vector DBs use approximate nearest-neighbour indexes (HNSW) to make this fast at scale, and store metadata alongside so you can combine semantic search with filters like date, tenant, or access level.',
      hinglish:
        'Ek vector database embeddings store karta hai aur ek query ke NEAREST vectors meaning se dhundhta hai, exact matches ke bajaye. Gen AI ko ye isliye chahiye kyunki millions embeddings pe semantic search RAG ka retrieval half hai, aur ek normal database "meaning mein sabse similar" efficiently nahi kar sakta. Vector DBs ise scale pe fast banane ke liye approximate nearest-neighbour indexes (HNSW) use karte hain, aur saath mein metadata store karte hain taaki tum semantic search ko date, tenant, ya access level jaise filters ke saath combine kar sako.',
    },
  },
  {
    question: 'What is streaming in LLM APIs and why use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Streaming returns tokens as they are generated rather than waiting for the complete response. It does not make generation faster in total, but it dramatically improves PERCEIVED latency — a user sees text appearing within a few hundred milliseconds instead of staring at a spinner for ten seconds. It also allows early cancellation, saving cost when the user stops reading. The tradeoffs: you cannot validate or post-process the full output before showing it, and error handling mid-stream is more complex.',
      hinglish:
        'Streaming tokens ko generate hote hi return karta hai, poore response ka wait karne ke bajaye. Ye total generation faster nahi banata, par ye PERCEIVED latency dramatically improve karta hai — user das seconds ek spinner ghoorne ke bajaye kuch sau milliseconds mein text aata dekhta hai. Ye early cancellation bhi allow karta hai, cost bachate hue jab user padhna band kar de. Tradeoffs: tum full output ko dikhane se pehle validate ya post-process nahi kar sakte, aur mid-stream error handling zyada complex hai.',
    },
  },
  {
    question: 'What are guardrails in an LLM application?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Guardrails are controls constraining what goes IN and what comes OUT. Input guardrails: filter prompt injection attempts, block off-topic or abusive requests, and strip PII before sending to a third-party API. Output guardrails: validate structure, check for policy violations or leaked secrets, verify claims against sources, and block unsafe tool calls. The essential principle is that the system prompt is NOT a guardrail — it is a suggestion to the model, whereas real guardrails are deterministic code running outside it.',
      hinglish:
        'Guardrails wo controls hain jo constrain karte hain ki kya ANDAR jaata hai aur kya BAHAR aata hai. Input guardrails: prompt injection attempts filter karo, off-topic ya abusive requests block karo, aur ek third-party API ko bhejne se pehle PII strip karo. Output guardrails: structure validate karo, policy violations ya leaked secrets check karo, sources ke against claims verify karo, aur unsafe tool calls block karo. Essential principle ye hai ki system prompt ek guardrail NAHI hai — ye model ko ek suggestion hai, jabki real guardrails uske bahar chalta deterministic code hain.',
    },
  },
  {
    question: 'What is the difference between an LLM and a chatbot?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'An LLM is the underlying MODEL — a stateless function that maps input tokens to output tokens with no memory between calls. A chatbot is a complete APPLICATION built around it: it maintains conversation history and re-sends it every turn (which is how "memory" appears), adds a system prompt, may include RAG, tools, guardrails, rate limiting, and a UI. Understanding that the API is stateless explains a great deal, including why long conversations get expensive and why the model "forgets" once history is truncated.',
      hinglish:
        'Ek LLM underlying MODEL hai — ek stateless function jo input tokens ko output tokens pe map karta hai, calls ke beech koi memory nahi. Ek chatbot uske around bana ek complete APPLICATION hai: ye conversation history maintain karta hai aur har turn use dobara bhejta hai (isi tarah "memory" dikhti hai), ek system prompt add karta hai, RAG, tools, guardrails, rate limiting, aur ek UI include kar sakta hai. Ye samajhna ki API stateless hai bahut kuch explain karta hai, including ye ki lambi conversations mehngi kyun hoti hain aur history truncate hone pe model kyun "bhool" jaata hai.',
    },
  },
  {
    question: 'How do you implement conversation memory in an LLM app?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Since the API is stateless, YOU must send the history every turn — and manage its growth. Strategies: a SLIDING WINDOW keeping the last N turns (simple but loses early context); SUMMARISATION compressing older turns into a running summary (preserves gist, costs an extra call); RETRIEVAL storing all history as embeddings and pulling back only relevant past turns; and EXTRACTED facts, where you persist structured user attributes separately from the transcript. Production systems usually combine a window with summarisation.',
      hinglish:
        'Kyunki API stateless hai, TUMHE har turn history bhejni padti hai — aur uski growth manage karni padti hai. Strategies: ek SLIDING WINDOW jo aakhri N turns rakhta hai (simple par early context kho deta hai); SUMMARISATION jo purane turns ko ek running summary mein compress karta hai (gist bachata hai, ek extra call ka cost); RETRIEVAL jo saari history embeddings ke roop mein store karke sirf relevant past turns wapas laata hai; aur EXTRACTED facts, jahan tum structured user attributes ko transcript se alag persist karte ho. Production systems usually ek window ko summarisation ke saath combine karte hain.',
    },
  },
  {
    question: 'What is a rate limit and how do you handle it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Providers cap requests per minute (RPM) and tokens per minute (TPM) per API key; exceeding either returns HTTP 429. Handle it with EXPONENTIAL BACKOFF plus jitter on retry (never a tight retry loop, which worsens the problem), a client-side queue or token-bucket limiter so you self-throttle before hitting the wall, and graceful degradation for users rather than a hard error. For sustained volume, request a limit increase, distribute across keys, or batch requests where the workload allows.',
      hinglish:
        'Providers per API key requests per minute (RPM) aur tokens per minute (TPM) cap karte hain; kisi ko bhi exceed karne pe HTTP 429 aata hai. Ise EXPONENTIAL BACKOFF plus retry pe jitter se handle karo (kabhi ek tight retry loop nahi, jo problem bigadta hai), ek client-side queue ya token-bucket limiter taaki tum deewar se takraane se pehle khud throttle karo, aur users ke liye ek hard error ke bajaye graceful degradation. Sustained volume ke liye, ek limit increase request karo, keys ke across distribute karo, ya jahan workload allow kare wahan requests batch karo.',
    },
  },
  {
    question: 'What is the difference between max_tokens and context window?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The CONTEXT WINDOW is the total budget for input plus output combined — the hard architectural limit of the model. max_tokens is a parameter you set capping only the OUTPUT length. They interact: if the context window is 128K and your prompt uses 120K, you cannot request 20K output. Setting max_tokens serves two practical purposes: it caps worst-case cost and latency, and it prevents runaway generation where a model rambles indefinitely.',
      hinglish:
        'CONTEXT WINDOW input plus output ke liye total budget hai — model ki hard architectural limit. max_tokens ek parameter hai jo tum set karte ho jo sirf OUTPUT length cap karta hai. Ye interact karte hain: agar context window 128K hai aur tumhara prompt 120K use karta hai, tum 20K output request nahi kar sakte. max_tokens set karna do practical purposes serve karta hai: ye worst-case cost aur latency cap karta hai, aur runaway generation rokta hai jahan ek model indefinitely bakta rehta hai.',
    },
  },
  {
    question: 'What is model distillation in Generative AI?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Distillation trains a SMALL model to imitate a LARGE one. The practical modern recipe: use an expensive frontier model to generate high-quality outputs for your specific task, then fine-tune a small cheap model on those pairs. The result approaches the large model\'s quality on that narrow task at a fraction of the inference cost and latency, which matters enormously at scale. Caveat: check the provider\'s terms of service, as many explicitly forbid using their outputs to train competing models.',
      hinglish:
        'Distillation ek CHHOTE model ko ek BADE ki nakal karne ke liye train karti hai. Practical modern recipe: ek expensive frontier model use karke apne specific task ke liye high-quality outputs generate karo, phir un pairs pe ek chhota sasta model fine-tune karo. Result us narrow task pe bade model ki quality ke paas pahunchta hai inference cost aur latency ke ek fraction pe, jo scale pe enormously matter karta hai. Caveat: provider ki terms of service check karo, kyunki bahut explicitly apne outputs se competing models train karne se mana karte hain.',
    },
  },
  {
    question: 'What is quantisation and why does it matter for running models?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Quantisation stores model weights at lower numeric precision — 8-bit or 4-bit integers instead of 16-bit floats — cutting memory roughly proportionally. It matters because memory is the binding constraint for self-hosting: a 7B model needs roughly 14GB at 16-bit but around 4GB at 4-bit, which is the difference between needing a data-centre GPU and running on a laptop. Quality loss is surprisingly small for moderate quantisation, though it becomes noticeable at very low bit widths, and inference can also be faster due to reduced memory bandwidth.',
      hinglish:
        'Quantisation model weights ko lower numeric precision pe store karta hai — 16-bit floats ke bajaye 8-bit ya 4-bit integers — memory roughly proportionally kam karte hue. Ye isliye matter karta hai kyunki self-hosting ke liye memory binding constraint hai: ek 7B model ko 16-bit pe roughly 14GB chahiye par 4-bit pe around 4GB, jo ek data-centre GPU chahiye hone aur ek laptop pe chalne ke beech ka farq hai. Moderate quantisation ke liye quality loss surprisingly kam hai, chahe bahut low bit widths pe noticeable ho jaata hai, aur reduced memory bandwidth ki wajah se inference faster bhi ho sakta hai.',
    },
  },
  {
    question: 'What is the difference between MCP and function calling?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'FUNCTION CALLING is a model capability: the model returns a structured request to invoke a function you defined in that specific API call. MCP (Model Context Protocol) is a STANDARD PROTOCOL for connecting models to external tools and data sources — instead of each application re-implementing integrations, an MCP server exposes tools once and any MCP-compatible client can use them. Roughly: function calling is how a model asks for a tool; MCP is a standardised way of making tools available across applications.',
      hinglish:
        'FUNCTION CALLING ek model capability hai: model ek structured request return karta hai us function ko invoke karne ke liye jo tumne us specific API call mein define kiya. MCP (Model Context Protocol) models ko external tools aur data sources se jodne ke liye ek STANDARD PROTOCOL hai — har application ke integrations dobara implement karne ke bajaye, ek MCP server tools ek baar expose karta hai aur koi bhi MCP-compatible client unhe use kar sakta hai. Roughly: function calling wo tareeka hai jisse ek model ek tool maangta hai; MCP applications ke across tools available karane ka ek standardised tareeka hai.',
    },
  },
  {
    question: 'What ethical concerns should you consider when deploying Generative AI?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'BIAS reproduced and amplified from training data, affecting some groups more than others. TRANSPARENCY — users should know they are talking to an AI, and AI-generated media should be identifiable. CONSENT and copyright around training data and generated output. PRIVACY, since prompts may contain personal data and models can memorise. MISINFORMATION at scale, including deepfakes. LABOUR displacement. And ACCOUNTABILITY — when an AI-assisted decision harms someone, there must be a human answerable for it, not a shrug at the model.',
      hinglish:
        'Training data se reproduce aur amplify hua BIAS, kuch groups ko doosron se zyada affect karta hua. TRANSPARENCY — users ko pata hona chahiye ki wo ek AI se baat kar rahe hain, aur AI-generated media identifiable hona chahiye. Training data aur generated output ke around CONSENT aur copyright. PRIVACY, kyunki prompts mein personal data ho sakta hai aur models memorise kar sakte hain. Scale pe MISINFORMATION, deepfakes included. LABOUR displacement. Aur ACCOUNTABILITY — jab ek AI-assisted decision kisi ko nuksan pahunchaye, uske liye ek human jawabdeh hona chahiye, model pe kandha uchakna nahi.',
    },
  },
  {
    question: 'How would you build a production Gen AI feature from scratch?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Start by defining the task precisely and building an EVALUATION SET before writing the feature — without it you cannot tell whether changes help. Then: prototype with prompting on a strong model to establish feasibility; add RAG if it needs private or current knowledge; add tools if it must take actions; add guardrails on input and output; measure quality, cost, and latency against the eval set; optimise by routing easy cases to a smaller model and caching; then ship behind a flag with monitoring, and log real failures back into the eval set.',
      hinglish:
        'Task ko precisely define karke aur feature likhne se PEHLE ek EVALUATION SET banake shuru karo — uske bina tum bata nahi sakte ki changes madad karte hain ya nahi. Phir: feasibility establish karne ke liye ek strong model pe prompting se prototype karo; agar use private ya current knowledge chahiye to RAG add karo; agar use actions leni hain to tools add karo; input aur output pe guardrails add karo; eval set ke against quality, cost, aur latency measure karo; easy cases ko ek chhote model pe route karke aur caching se optimise karo; phir monitoring ke saath ek flag ke peeche ship karo, aur real failures ko wapas eval set mein log karo.',
    },
  },
];

export const curriculum = [...absoluteBasics, ...beginner, ...intermediate, ...advanced];
