// Easy English Speaking course — beginner. Separate "english" category (not programming).
// Covers: the Golden Rule, modal verbs, verb patterns, prepositions, question tricks,
// sentence starters, professional phrases, and power collocations.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Easy English Speaking',
  slug: 'english-speaking',
  description:
    'Fluent English bolna seekho — bina grammar ki ratta-fatta ke. Golden Rule se sentence banana, modal verbs, verb patterns, question tricks, sentence starters, professional phrases aur daily-use collocations. Sab Hinglish explanation ke saath.',
  icon: 'comments',
  tags: ['english', 'speaking', 'grammar', 'communication', 'fluency'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  category: 'english',
  order: 50,
};

const sentenceBuilding = [
  {
    title: 'Sentence Building Basics',
    level: 'beginner',
    description: 'Golden Rule aur modal verbs — 80% English inhi se banti hai.',
    concepts: [
      {
        title: 'The Golden Rule: Subject + Helping Word + V1',
        difficulty: 'easy',
        tags: ['golden-rule', 'sentence-structure', 'basics'],
        explanation: {
          english:
            'Most English learners get stuck because they try to memorise hundreds of grammar rules. Here is the shortcut that covers roughly 80% of spoken English:\n\n**Subject + Helping Word + V1 (first form of verb)**\n\n- *I* **can** *speak* English.\n- *She* **should** *drink* more water.\n- *We* **will** *start* tomorrow.\n- *They* **must** *wear* helmets.\n\nThe helping word (can, will, should, must, may, might, would, could, shall) does the grammatical work — you never change the main verb. No "speaks", no "spoke", no "speaking" — just the simple first form (V1).\n\nAdd a **time expression** to sound natural: *today, tomorrow, yesterday, now, then, later, soon, always, never, every day*.\n\n- I will call you **tomorrow**.\n- She can meet us **later**.\n- They should practise **every day**.\n\nMaster this one pattern and you can build thousands of correct sentences immediately.',
          hinglish:
            'Zyadatar English learners isliye atak jaate hain kyunki wo sainkdon grammar rules ratne ki koshish karte hain. Ye shortcut lo jo bole jaane wali English ka lagbhag 80% cover karta hai:\n\n**Subject + Helping Word + V1 (verb ki first form)**\n\n- *I* **can** *speak* English. (Main English bol sakta hoon)\n- *She* **should** *drink* more water. (Use zyada paani peena chahiye)\n- *We* **will** *start* tomorrow. (Hum kal shuru karenge)\n- *They* **must** *wear* helmets. (Unhe helmet pehenna zaroori hai)\n\nHelping word (can, will, should, must, may, might, would, could, shall) saara grammatical kaam karta hai — main verb kabhi change nahi hota. Na "speaks", na "spoke", na "speaking" — sirf simple first form (V1).\n\nNatural sound karne ke liye **time expression** jodo: *today, tomorrow, yesterday, now, then, later, soon, always, never, every day*.\n\n- I will call you **tomorrow**. (Main tumhe kal call karunga)\n- She can meet us **later**. (Wo humse baad mein mil sakti hai)\n- They should practise **every day**. (Unhe roz practice karni chahiye)\n\nYe ek pattern master kar lo aur turant hazaron sahi sentences bana paoge.',
        },
        dailyLifeExample:
          'Jaise Maggi banane ka ek hi formula hai — paani + masala + noodles — waise hi English ka formula hai Subject + Helping Word + V1. Ingredients badalte raho (I/you/she + can/will/should + go/eat/speak), recipe wahi rehti hai. Ek formula, hazaar sentences.',
        codeExample:
          'FORMULA:  Subject + Helping Word + V1  (= 80% spoken English)\n\n  I     + can    + speak   ->  I can speak English.\n  She   + should + drink   ->  She should drink more water.\n  We    + will   + start   ->  We will start tomorrow.\n  They  + must   + wear    ->  They must wear helmets.\n  You   + may    + come    ->  You may come in.\n\nADD TIME:\n  I will call you tomorrow.\n  She can meet us later.\n  They should practise every day.\n\nCOMMON MISTAKE:\n  ❌ I can speaks English.   (V1 kabhi change nahi hota)\n  ✅ I can speak English.',
        keyPoints: [
          'Subject + Helping Word + V1 covers ~80% of spoken English',
          'Helping words: can, could, may, might, must, should, will, would, shall',
          'The main verb always stays in first form (V1) — never add -s/-ed/-ing',
          'Add time expressions (today, tomorrow, later, every day) to sound natural',
          'One pattern = thousands of correct sentences',
        ],
        quiz: [
          {
            question: 'Which sentence follows the Golden Rule correctly?',
            options: [
              'She can speaks English.',
              'She can speaking English.',
              'She can speak English.',
              'She can spoke English.',
            ],
            correctIndex: 2,
          },
          {
            question: 'In "They must wear helmets", which part is the helping word?',
            options: ['They', 'must', 'wear', 'helmets'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Modal Verbs: Can, Could, May, Should, Must',
        difficulty: 'easy',
        tags: ['modal-verbs', 'can', 'should', 'must'],
        explanation: {
          english:
            'Modal verbs are the most useful helping words. Each has a specific job:\n\n**Can — ability / possibility**\n- I *can* ride a bicycle.\n- I *can* do it.\n\n**Could — past ability / polite request**\n- *Could* you help me, please?\n- I *could* help you.\n\n**May — permission / possibility**\n- You *may* come in.\n- I *may* go.\n\n**Might — smaller possibility**\n- It *might* rain.\n\n**Should — advice / recommendation**\n- You *should* drink more water.\n- You *should* study.\n\n**Must — strong obligation / necessity**\n- You *must* wear a helmet.\n- I *must* try.\n\n**Would — polite offer / imagined situation**\n- I *would* like to go.\n\n**Will — future**\n- I *will* come.\n\n**Shall — suggestion (questions)**\n- *Shall* we start?\n\n**Ought to — moral advice**\n- You *ought to* help.\n\nTip: *Could*, *would*, and *may* make requests sound polite — use them with strangers, seniors, and at work.',
          hinglish:
            'Modal verbs sabse useful helping words hain. Har ek ka apna specific kaam hai:\n\n**Can — ability / possibility (kar sakna)**\n- I *can* ride a bicycle. (Main cycle chala sakta hoon)\n\n**Could — past ability / polite request (vinamrata se poochna)**\n- *Could* you help me, please? (Kya aap meri madad kar sakte hain?)\n\n**May — permission / possibility (ijaazat)**\n- You *may* come in. (Aap andar aa sakte hain)\n\n**Might — chhoti possibility (shayad)**\n- It *might* rain. (Shayad baarish ho)\n\n**Should — advice (chahiye)**\n- You *should* drink more water. (Tumhe zyada paani peena chahiye)\n\n**Must — strong obligation (zaroori)**\n- You *must* wear a helmet. (Helmet pehenna zaroori hai)\n\n**Would — polite offer / imagination**\n- I *would* like to go. (Main jaana chahunga)\n\n**Will — future (karunga/karenge)**\n- I *will* come. (Main aaunga)\n\n**Shall — suggestion (kya hum...?)**\n- *Shall* we start? (Kya hum shuru karein?)\n\n**Ought to — moral advice**\n- You *ought to* help. (Tumhe madad karni chahiye)\n\nTip: *Could*, *would*, aur *may* requests ko polite banate hain — strangers, seniors aur office mein inka use karo.',
        },
        dailyLifeExample:
          'Modal verbs waise hain jaise scooter ke gears — same engine (verb), alag power. "Can you help?" casual dost wala gear hai; "Could you help me, please?" office/boss wala polite gear. Situation dekh ke gear badlo, engine wahi rahega.',
        codeExample:
          'MODAL VERB CHEAT SHEET:\n\n  can      ability        I can do it.\n  could    polite ask     Could you help me, please?\n  may      permission     You may come in.\n  might    maybe          It might rain.\n  must     necessary      You must wear a helmet.\n  should   advice         You should study.\n  will     future         I will come.\n  would    polite wish    I would like to go.\n  shall    suggestion     Shall we start?\n  ought to moral duty     You ought to help.\n\nPOLITENESS LADDER (request):\n  Help me.                      (order — rude)\n  Can you help me?              (casual)\n  Could you help me, please?    (polite ✅ office-safe)',
        keyPoints: [
          'Can = ability; Could = polite request or past ability',
          'May = permission; Might = smaller possibility',
          'Should = advice; Must = strong obligation',
          'Will = future; Would = polite wish; Shall = suggestion',
          'Use could/would/may to sound polite in formal situations',
        ],
        quiz: [
          {
            question: 'Your friend looks tired. Which is the best advice sentence?',
            options: [
              'You must sleeping early.',
              'You should sleep early.',
              'You can slept early.',
              'You may sleeps early.',
            ],
            correctIndex: 1,
          },
          {
            question: 'Which modal makes a request most polite?',
            options: ['Can', 'Could', 'Must', 'Shall'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between "must" and "should"?',
            answer: {
              english:
                '"Must" expresses strong obligation or necessity — there is no real choice (You must wear a helmet). "Should" expresses advice or recommendation — it is a good idea but optional (You should drink more water).',
              hinglish:
                '"Must" strong obligation ya zaroorat dikhata hai — koi real choice nahi hai (You must wear a helmet — helmet pehenna zaroori hai). "Should" advice ya recommendation hai — achha idea hai par optional (You should drink more water — peena chahiye, par majboori nahi).',
            },
          },
        ],
      },
    ],
  },
];

const verbPatterns = [
  {
    title: 'Verb Patterns & Prepositions',
    level: 'beginner',
    description: 'Verb ke baad kya aayega — to + verb, verb + ing, aur prepositions.',
    concepts: [
      {
        title: 'Verb Patterns: To + Verb, Verb + ING, Verb + To + V1',
        difficulty: 'easy',
        tags: ['verb-patterns', 'gerund', 'infinitive'],
        explanation: {
          english:
            'After certain verbs, English follows fixed patterns. Learn the groups, not individual rules:\n\n**Group 1 — verb + to + V1** (want, need, like, love, hate, plan, hope, decide, agree, learn):\n- I *want to* learn. / I *need to* sleep. / I *plan to* win.\n- I *hope to* see you. / I *decide to* go. / I *learn to* play.\n\n**Group 2 — verb + ING** (keep, enjoy, finish, avoid, consider, mind, practice, suggest, imagine, delay):\n- *Keep going*. / I *enjoy reading*. / I *finished eating*.\n- *Avoid talking*. / *Consider buying*. / I *suggest waiting*.\n\n**Group 3 — verb + to + V1 (action verbs)** (start, begin, try, forget, remember, continue, offer, manage, fail):\n- *Start to* run. / *Begin to* study. / *Try to* understand.\n- Don\'t *forget to* call. / *Remember to* lock. / He *failed to* pass.\n\nShortcut: if the first verb is about **liking/wanting/planning** → use *to + V1*. If it is about **continuing/enjoying/avoiding** an activity → use *ING*.',
          hinglish:
            'Kuch verbs ke baad English fixed patterns follow karti hai. Rules nahi, groups yaad karo:\n\n**Group 1 — verb + to + V1** (want, need, like, love, hate, plan, hope, decide, agree, learn):\n- I *want to* learn. (Main seekhna chahta hoon)\n- I *need to* sleep. (Mujhe sona hai)\n- I *hope to* see you. (Umeed hai milenge)\n\n**Group 2 — verb + ING** (keep, enjoy, finish, avoid, consider, mind, practice, suggest, imagine, delay):\n- *Keep going*. (Chalte raho)\n- I *enjoy reading*. (Mujhe padhna pasand hai)\n- *Avoid talking*. (Baat karne se bacho)\n- I *suggest waiting*. (Mera sujhav hai intezaar karo)\n\n**Group 3 — verb + to + V1 (action verbs)** (start, begin, try, forget, remember, continue, offer, manage, fail):\n- *Try to* understand. (Samajhne ki koshish karo)\n- Don\'t *forget to* call. (Call karna mat bhoolna)\n- He *failed to* pass. (Wo pass nahi ho paya)\n\nShortcut: agar pehla verb **chahat/plan** ke baare mein hai → *to + V1* lagao. Agar **activity continue/enjoy/avoid** karne ke baare mein hai → *ING* lagao.',
        },
        dailyLifeExample:
          'Ye patterns waise hain jaise khana aur bartan ki jodi — chai cup mein aati hai, thali mein nahi. "Enjoy" ke saath hamesha ING aata hai (enjoy reading), "want" ke saath hamesha to+V1 (want to read). Jodi yaad karo, kabhi galti nahi hogi.',
        codeExample:
          'GROUP 1: verb + to + V1  (wanting/planning verbs)\n  want to learn | need to sleep | like to read | love to travel\n  hate to wait  | plan to win   | hope to see  | decide to go\n  agree to help | learn to play\n\nGROUP 2: verb + ING  (activity verbs)\n  keep going      | enjoy reading   | finish eating\n  avoid talking   | consider buying | mind your words\n  practice makes perfect | suggest waiting\n  imagine smiling | don\'t delay replying\n\nGROUP 3: verb + to + V1  (action verbs)\n  start to run | begin to study | try to understand\n  forget to call | remember to lock | continue to work\n  offer to help | manage to win | fail to pass\n\n  ❌ I enjoy to read.     ✅ I enjoy reading.\n  ❌ I want reading.      ✅ I want to read.',
        keyPoints: [
          'want/need/like/love/plan/hope/decide → to + V1 (I want to learn)',
          'keep/enjoy/finish/avoid/consider/suggest → verb + ING (I enjoy reading)',
          'start/try/forget/remember/manage/fail → to + V1 (Try to understand)',
          'Learn verbs in groups — the pattern comes automatically',
          'Common trap: "enjoy to read" is wrong; it is always "enjoy reading"',
        ],
        quiz: [
          {
            question: 'Choose the correct sentence:',
            options: [
              'I enjoy to read books.',
              'I enjoy reading books.',
              'I enjoy read books.',
              'I enjoy reads books.',
            ],
            correctIndex: 1,
          },
          {
            question: '"I want ____ English fluently." — fill the blank:',
            options: ['speaking', 'to speak', 'speak', 'spoke'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Prepositions & Time Expressions',
        difficulty: 'easy',
        tags: ['prepositions', 'time-expressions', 'at-in-on'],
        explanation: {
          english:
            'Prepositions are tiny words that glue sentences together. The 10 you need daily:\n\n- **at** — at school, at 5 o\'clock, at night\n- **in** — in the room, in Delhi, in 2026\n- **on** — on the table, on Monday, on time\n- **by** — by the river, by bus, by 5 pm (deadline)\n- **with** — with a pen, with my friend\n- **for** — for you, for two hours\n- **since** — since 2020, since morning (starting point)\n- **from** — from here, from Delhi to Mumbai\n- **of** — of my book, a cup of tea\n- **to** — to the shop, to me\n\n**Time expressions** make your speech sound complete: *today, tomorrow, yesterday, now, then, later, soon, always, never, every day*.\n\n- I go to the gym **every day**.\n- She has lived here **since 2020**.\n- We will meet **on Monday at 5 o\'clock**.\n\nQuick memory trick for time: **at** a clock time (at 5), **on** a day (on Monday), **in** a month/year (in July, in 2026).',
          hinglish:
            'Prepositions chhote words hain jo sentences ko jodte hain. Roz kaam aane wale 10:\n\n- **at** — at school (school mein/pe), at 5 o\'clock (5 baje)\n- **in** — in the room (kamre mein), in Delhi, in 2026\n- **on** — on the table (table par), on Monday (Monday ko)\n- **by** — by the river (nadi ke paas), by bus (bus se), by 5 pm (5 baje tak)\n- **with** — with a pen (pen se), with my friend (dost ke saath)\n- **for** — for you (tumhare liye), for two hours (do ghante ke liye)\n- **since** — since 2020 (2020 se), since morning (subah se)\n- **from** — from here (yahan se), from Delhi to Mumbai\n- **of** — of my book (meri kitaab ka), a cup of tea\n- **to** — to the shop (dukaan tak), to me (mujhe)\n\n**Time expressions** se speech complete lagti hai: *today, tomorrow, yesterday, now, then, later, soon, always, never, every day*.\n\n- I go to the gym **every day**. (Main roz gym jaata hoon)\n- She has lived here **since 2020**. (Wo 2020 se yahan rehti hai)\n\nTime ka memory trick: **at** clock time ke saath (at 5), **on** din ke saath (on Monday), **in** mahine/saal ke saath (in July, in 2026).',
        },
        dailyLifeExample:
          'Prepositions address batane jaise hain: "Main ghar PE hoon, Delhi MEIN, station KE PAAS." Ek galat preposition aur address galat pahunch jaata hai — "meet me AT Monday" sunte hi native speaker ko khatakta hai (sahi: ON Monday).',
        codeExample:
          'THE 10 DAILY PREPOSITIONS:\n  at    -> at school, at 5 o\'clock\n  in    -> in the room, in Delhi, in 2026\n  on    -> on the table, on Monday\n  by    -> by the river, by bus\n  with  -> with a pen, with my friend\n  for   -> for you, for two hours\n  since -> since 2020\n  from  -> from here\n  of    -> of my book\n  to    -> to the shop\n\nTIME TRICK (at / on / in):\n  at 5 o\'clock   (clock time)\n  on Monday      (day)\n  in July        (month)\n  in 2026        (year)\n\nTIME EXPRESSIONS:\n  today | tomorrow | yesterday | now | then\n  later | soon | always | never | every day',
        keyPoints: [
          '10 core prepositions cover daily speech: at, in, on, by, with, for, since, from, of, to',
          'Time rule: at + clock time, on + day, in + month/year',
          'since = starting point (since 2020); for = duration (for 2 hours)',
          'by = near, by = transport (by bus), by = deadline (by 5 pm)',
          'Add time expressions (every day, later, soon) to complete sentences',
        ],
        quiz: [
          {
            question: 'Choose the correct sentence:',
            options: [
              'The meeting is at Monday.',
              'The meeting is on Monday.',
              'The meeting is in Monday.',
              'The meeting is by Monday.',
            ],
            correctIndex: 1,
          },
          {
            question: '"She has worked here ____ 2020." — fill the blank:',
            options: ['for', 'from', 'since', 'at'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
];

const conversation = [
  {
    title: 'Questions & Conversation',
    level: 'beginner',
    description: 'Sawaal poochna aur baat shuru karna — fluent conversation ke tools.',
    concepts: [
      {
        title: 'Question Tricks & WH-Questions',
        difficulty: 'easy',
        tags: ['questions', 'wh-questions', 'conversation'],
        explanation: {
          english:
            'Most questions in English start with one of these ready-made openers — memorise them as blocks:\n\n**Yes/No question starters:**\n- *Do you...?* — Do you like tea?\n- *Does he/she...?* — Does she work here?\n- *Did you...?* — Did you eat? (past)\n- *Are you...?* / *Is she...?* — Are you ready?\n- *Can you...?* / *Could you...?* — Could you help?\n- *Will you...?* / *Would you...?* — Would you join us?\n- *Shall we...?* — Shall we start?\n\n**WH-question words** (for information):\n- *What...?* (kya) — What is this?\n- *Where...?* (kahaan) — Where do you live?\n- *When...?* (kab) — When will you come?\n- *Who...?* (kaun) — Who is he?\n- *Whom...?* (kisko) — Whom did you meet?\n- *Why...?* (kyun) — Why are you late?\n- *How...?* (kaise) — How does it work?\n- *Which...?* (kaunsa) — Which one is yours?\n- *Whose...?* (kiska) — Whose book is this?\n- *How much/many...?* (kitna) — How much does it cost?\n\nPattern: **WH-word + helping word + subject + V1** → "Where do you live?", "When will you come?"',
          hinglish:
            'English ke zyadatar questions in ready-made openers se shuru hote hain — inhe blocks ki tarah yaad karo:\n\n**Yes/No question starters:**\n- *Do you...?* — Do you like tea? (Kya tumhe chai pasand hai?)\n- *Does he/she...?* — Does she work here? (Kya wo yahan kaam karti hai?)\n- *Did you...?* — Did you eat? (Kya tumne khaya? — past)\n- *Are you...?* — Are you ready? (Kya tum ready ho?)\n- *Could you...?* — Could you help? (Kya aap madad karenge?)\n- *Shall we...?* — Shall we start? (Kya hum shuru karein?)\n\n**WH-question words** (jaankaari ke liye):\n- *What* (kya) — What is this?\n- *Where* (kahaan) — Where do you live?\n- *When* (kab) — When will you come?\n- *Who* (kaun) — Who is he?\n- *Whom* (kisko) — Whom did you meet?\n- *Why* (kyun) — Why are you late?\n- *How* (kaise) — How does it work?\n- *Which* (kaunsa) — Which one is yours?\n- *Whose* (kiska) — Whose book is this?\n- *How much/many* (kitna) — How much does it cost?\n\nPattern: **WH-word + helping word + subject + V1** → "Where do you live?", "When will you come?"',
        },
        dailyLifeExample:
          'Question starters waise hain jaise phone ke speed-dial buttons. Har baar number type karne ki zaroorat nahi — "Do you...", "Could you...", "Where do you..." dabao aur aage apni baat jodo. 10 starters yaad, unlimited questions ready.',
        codeExample:
          'YES/NO QUESTIONS:\n  Do you...?     Do you like tea?\n  Does he...?    Does he play cricket?\n  Did you...?    Did you finish?\n  Are you...?    Are you coming?\n  Is she...?     Is she your friend?\n  Can you...?    Can you swim?\n  Could you...?  Could you repeat that?\n  Will you...?   Will you join?\n  Would you...?  Would you like tea?\n  Shall we...?   Shall we begin?\n\nWH-QUESTIONS (WH + helping + subject + V1):\n  What  is this?          Where do you live?\n  When  will you come?    Who   is he?\n  Whom  did you meet?     Why   are you late?\n  How   does it work?     Which one is yours?\n  Whose book is this?     How much does it cost?',
        keyPoints: [
          '10 yes/no starters: Do/Does/Did/Are/Is/Can/Could/Will/Would/Shall',
          '10 WH-words: what, where, when, who, whom, why, how, which, whose, how much',
          'WH pattern: WH-word + helping word + subject + V1',
          'Did = past questions (Did you eat?), Do/Does = present',
          'Could/Would starters make questions polite',
        ],
        quiz: [
          {
            question: 'Which question is grammatically correct?',
            options: [
              'Where you live?',
              'Where do you live?',
              'Where you do live?',
              'Where lives you?',
            ],
            correctIndex: 1,
          },
          {
            question: 'To ask about price, which WH-starter fits best?',
            options: ['Whose...?', 'How much...?', 'Whom...?', 'Which...?'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Sentence Starters & Smart Connectors',
        difficulty: 'medium',
        tags: ['sentence-starters', 'connectors', 'fluency'],
        explanation: {
          english:
            'Fluent speakers do not think of full sentences — they launch with ready starters and connect ideas with fixed patterns.\n\n**Opinion starters:**\n- *I think that...* / *I believe that...* / *I feel that...*\n- *In my opinion...* / *As far as I know...*\n- *To be honest...* / *The reason is...*\n- *One important thing...* / *For example...* / *In conclusion...*\n\n**Smart connectors (patterns):**\n- *It is + adj + to V1* — It is easy to learn.\n- *Too + adj + to V1* — Too old to work.\n- *So + adj + that* — So big that I can\'t lift it.\n- *Not only... but also* — Not only smart but also kind.\n- *Either... or* — Either you go or I go.\n- *Neither... nor* — Neither he nor I knows.\n- *Both... and* — Both you and I are right.\n- *As... as* — He is as tall as me.\n- *The more... the more* — The more you study, the more you understand.\n\nAnd the classic: **Practice makes perfect.**\n\nUse a starter + a connector and you sound instantly structured: "To be honest, it is easy to learn English — the more you practise, the more you improve."',
          hinglish:
            'Fluent speakers poore sentences nahi sochte — wo ready starters se shuru karte hain aur ideas ko fixed patterns se jodte hain.\n\n**Opinion starters:**\n- *I think that...* (Mujhe lagta hai ki...)\n- *I believe that...* (Mera maanna hai ki...)\n- *In my opinion...* (Meri raay mein...)\n- *As far as I know...* (Jahan tak mujhe pata hai...)\n- *To be honest...* (Sach kahoon toh...)\n- *The reason is...* (Wajah ye hai...)\n- *For example...* (Jaise ki...)\n- *In conclusion...* (Ant mein...)\n\n**Smart connectors (patterns):**\n- *It is + adj + to V1* — It is easy to learn. (Seekhna aasaan hai)\n- *Too + adj + to V1* — Too old to work. (Kaam ke liye bahut boodha)\n- *So + adj + that* — So big that I can\'t lift it. (Itna bada ki utha nahi sakta)\n- *Not only... but also* — Not only smart but also kind. (Sirf smart nahi, kind bhi)\n- *Either... or* — Either you go or I go. (Ya tum jao ya main)\n- *Neither... nor* — Neither he nor I knows. (Na wo jaanta hai na main)\n- *Both... and* — Both you and I are right. (Tum aur main dono sahi hain)\n- *As... as* — He is as tall as me. (Wo mere jitna lamba hai)\n- *The more... the more* — The more you study, the more you understand. (Jitna padhoge, utna samjhoge)\n\nAur classic: **Practice makes perfect.** (Karat karat abhyas...)',
        },
        dailyLifeExample:
          'Sentence starters waise hain jaise cricket mein batsman ka stance — ball aane se pehle position ready. "To be honest..." bolte hi tumhara dimaag agla hissa sochne ka time paa leta hai, aur sunne wale ko structured speech sunai deti hai. Fillers ("umm", "aaa") ki jagah starters use karo.',
        codeExample:
          'OPINION STARTERS:\n  I think that...        I believe that...\n  In my opinion...       As far as I know...\n  To be honest...        The reason is...\n  I feel that...         One important thing...\n  For example...         In conclusion...\n\nSMART CONNECTORS:\n  It is easy to learn.               (It is + adj + to V1)\n  Too old to work.                   (Too + adj + to V1)\n  So big that I can\'t lift it.       (So + adj + that)\n  Not only smart but also kind.      (Not only...but also)\n  Either you go or I go.             (Either...or)\n  Neither he nor I knows.            (Neither...nor)\n  Both you and I are right.          (Both...and)\n  He is as tall as me.               (As...as)\n  The more you study,\n  the more you understand.           (The more...the more)\n\nCOMBINE THEM:\n  "To be honest, it is easy to learn English —\n   the more you practise, the more you improve."',
        keyPoints: [
          'Starters (I think that / In my opinion / To be honest) buy thinking time',
          'It is + adjective + to V1 → It is easy to learn',
          'Pairs: not only...but also, either...or, neither...nor, both...and',
          'As...as for comparison; the more...the more for cause-effect',
          'Replace fillers (umm/aaa) with starters to sound fluent',
        ],
        quiz: [
          {
            question: '"____ you go ____ I go." — choose the correct pair:',
            options: [
              'Neither / or',
              'Either / or',
              'Both / or',
              'Not only / or',
            ],
            correctIndex: 1,
          },
          {
            question: 'Complete the pattern: "The more you practise, ____"',
            options: [
              'the more you improve.',
              'more you improving.',
              'you improve more that.',
              'the improve you more.',
            ],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
];

const professional = [
  {
    title: 'Professional English',
    level: 'intermediate',
    description: 'Casual se professional — office, interview aur clients ke liye polished English.',
    concepts: [
      {
        title: 'Unprofessional vs Professional Phrases',
        difficulty: 'medium',
        tags: ['professional', 'workplace', 'polite-english'],
        explanation: {
          english:
            'The same question can sound blunt or polished. Upgrade these 20 everyday phrases for office, interviews, and clients:\n\n1. What is your name → **May I know your name?**\n2. Where do you live → **Which city are you based in?**\n3. What do you do → **What line of work are you in?**\n4. How old are you → **May I ask your age?**\n5. How are you → **How have you been lately?**\n6. Can you help me → **Could you assist me with this?**\n7. When will you come → **When should I expect you?**\n8. Why are you late → **What caused the delay?**\n9. Where are you going → **What\'s your destination?**\n10. What happened → **Could you explain what went wrong?**\n11. Can you repeat → **Could you say that again?**\n12. Do you understand → **Does that make sense to you?**\n13. What do you mean → **Could you clarify your point?**\n14. Can we meet → **Would you be available to meet?**\n15. What do you want → **How may I help you?**\n16. Where are you now → **What\'s your current location?**\n17. Can I call you → **Would it be okay if I call you?**\n18. Are you free → **Do you have a moment to talk?**\n19. What time is it → **Could you tell me the time?**\n20. Is this correct → **Can you confirm if this is right?**\n\nNotice the pattern: professional versions use **could/would/may** + softer wording. Blame becomes curiosity ("Why are you late" → "What caused the delay").',
          hinglish:
            'Same sawaal rude bhi lag sakta hai aur polished bhi. Office, interview aur clients ke liye ye 20 daily phrases upgrade karo:\n\n1. What is your name → **May I know your name?** (Aapka naam jaan sakta hoon?)\n2. Where do you live → **Which city are you based in?**\n3. What do you do → **What line of work are you in?**\n4. How old are you → **May I ask your age?**\n5. How are you → **How have you been lately?**\n6. Can you help me → **Could you assist me with this?**\n7. When will you come → **When should I expect you?**\n8. Why are you late → **What caused the delay?** (blame nahi, wajah poochho)\n9. Where are you going → **What\'s your destination?**\n10. What happened → **Could you explain what went wrong?**\n11. Can you repeat → **Could you say that again?**\n12. Do you understand → **Does that make sense to you?** (ye sabse important — "samjhe?" rude lagta hai!)\n13. What do you mean → **Could you clarify your point?**\n14. Can we meet → **Would you be available to meet?**\n15. What do you want → **How may I help you?**\n16. Where are you now → **What\'s your current location?**\n17. Can I call you → **Would it be okay if I call you?**\n18. Are you free → **Do you have a moment to talk?**\n19. What time is it → **Could you tell me the time?**\n20. Is this correct → **Can you confirm if this is right?**\n\nPattern dekho: professional versions mein **could/would/may** + naram shabd hote hain. Blame curiosity ban jaata hai ("Why are you late" → "What caused the delay").',
        },
        dailyLifeExample:
          'Ye waise hai jaise ghar ke kapde vs office ke kapde. Baat wahi hai ("madad chahiye"), par packaging alag: dost ko "help kar na" aur client ko "Could you assist me with this?" Dono sahi hain — jagah dekh ke pehno.',
        codeExample:
          'CASUAL            ->  PROFESSIONAL\n----------------------------------------------------------\nWhat is your name  ->  May I know your name?\nCan you help me    ->  Could you assist me with this?\nWhy are you late   ->  What caused the delay?\nCan you repeat     ->  Could you say that again?\nDo you understand  ->  Does that make sense to you?\nWhat do you mean   ->  Could you clarify your point?\nCan we meet        ->  Would you be available to meet?\nAre you free       ->  Do you have a moment to talk?\nIs this correct    ->  Can you confirm if this is right?\n\nTHE 3 UPGRADE RULES:\n  1. Start with Could / Would / May\n  2. Soften direct words (want -> help, late -> delay)\n  3. Ask about the situation, not the person\n     ("Why are YOU late" -> "What caused the DELAY")',
        keyPoints: [
          'Could/Would/May at the start instantly sounds professional',
          'Ask about situations, not persons: "What caused the delay?"',
          '"Does that make sense to you?" beats "Do you understand?"',
          '"Would you be available to meet?" beats "Can we meet?"',
          'Same meaning, softer packaging — essential for office and interviews',
        ],
        quiz: [
          {
            question: 'The professional way to ask "Why are you late?" is:',
            options: [
              'You are late again?',
              'What caused the delay?',
              'Why late?',
              'Late kyun ho?',
            ],
            correctIndex: 1,
          },
          {
            question: 'In a client call, which is the best replacement for "Do you understand?"',
            options: [
              'Understood?',
              'You get it?',
              'Does that make sense to you?',
              'Clear hai na?',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you politely ask a colleague to repeat something in a meeting?',
            answer: {
              english:
                'Use a could/would opener: "Could you say that again, please?" or "Sorry, could you repeat the last point?" — polite modals plus "please" keep it professional without sounding demanding.',
              hinglish:
                'Could/would opener use karo: "Could you say that again, please?" ya "Sorry, could you repeat the last point?" — polite modals aur "please" ise professional rakhte hain bina demanding lage.',
            },
          },
        ],
      },
      {
        title: 'Power Collocations: Have, Take, Do, Make, Go, Come, Get',
        difficulty: 'medium',
        tags: ['collocations', 'vocabulary', 'natural-english'],
        explanation: {
          english:
            'Natural English pairs specific verbs with specific nouns — these fixed pairs are **collocations**. Using the wrong verb ("do a mistake") instantly sounds non-native. Learn these by verb:\n\n**Have** — a drink, a bath, breakfast, a rest, lunch\n**Take** — a break, a look, an exam, a seat, a chance\n**Do** — your work, nothing, the dishes, your hair, yoga\n**Make** — a mess, a difference, an effort, money, the bed\n**Go** — home, shopping, crazy, abroad, bankrupt\n**Come** — close, to an end, early, first, last\n**Get** — ready, lost, started, a job, pregnant\n**Let me** — know, think, help you, go, see\n\nClassic confusions:\n- **make** money (not do money), **do** work (not make work)\n- **take** an exam (not give an exam — that\'s the examiner!)\n- **make** the bed, **do** the dishes\n- **Let me know** = tell me later (the most used office phrase in English)',
          hinglish:
            'Natural English mein specific verbs specific nouns ke saath judte hain — in fixed pairs ko **collocations** kehte hain. Galat verb ("do a mistake") turant non-native lagta hai. Verb ke hisaab se yaad karo:\n\n**Have** — a drink, a bath, breakfast, a rest, lunch\n**Take** — a break, a look, an exam, a seat, a chance\n**Do** — your work, nothing, the dishes, your hair, yoga\n**Make** — a mess, a difference, an effort, money, the bed\n**Go** — home, shopping, crazy, abroad, bankrupt\n**Come** — close, to an end, early, first, last\n**Get** — ready, lost, started, a job, pregnant\n**Let me** — know, think, help you, go, see\n\nClassic confusions:\n- **make** money (do money nahi), **do** work (make work nahi)\n- **take** an exam (give an exam examiner karta hai!)\n- **make** the bed (bistar theek karna), **do** the dishes (bartan dhona)\n- **Let me know** = baad mein bata dena (English ka sabse zyada use hone wala office phrase)',
        },
        dailyLifeExample:
          'Collocations waise hain jaise "chai-biscuit", "daal-chawal" — kuch cheezein bas saath mein hi aati hain. Koi "chawal-biscuit" nahi bolta; waise hi English mein "take a break" hota hai, "do a break" nahi. Jodi yaad karo, sochna nahi padega.',
        codeExample:
          'VERB + NOUN PAIRS (memorise as pairs):\n\n  HAVE:  a drink | a bath | breakfast | a rest | lunch\n  TAKE:  a break | a look | an exam | a seat | a chance\n  DO:    your work | nothing | the dishes | your hair | yoga\n  MAKE:  a mess | a difference | an effort | money | the bed\n  GO:    home | shopping | crazy | abroad | bankrupt\n  COME:  close | to an end | early | first | last\n  GET:   ready | lost | started | a job\n  LET ME: know | think | help you | go | see\n\nCLASSIC TRAPS:\n  ❌ do a mistake      ✅ make a mistake\n  ❌ do money          ✅ make money\n  ❌ make the dishes   ✅ do the dishes\n  ❌ give an exam      ✅ take an exam (student)\n\nOFFICE GOLD:\n  "Let me know." | "Take a seat." | "Let\'s get started."',
        keyPoints: [
          'Collocations = fixed verb+noun pairs (take a break, make money)',
          'make a mistake / make money — never "do"',
          'do the dishes / do your work — never "make"',
          'Students take exams; examiners give them',
          '"Let me know" and "Let\'s get started" are daily office essentials',
        ],
        quiz: [
          {
            question: 'Choose the correct collocation:',
            options: [
              'I did a mistake.',
              'I made a mistake.',
              'I took a mistake.',
              'I went a mistake.',
            ],
            correctIndex: 1,
          },
          {
            question: '"____ a break — you have worked for 6 hours." Fill the blank:',
            options: ['Do', 'Make', 'Take', 'Go'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
];

export const curriculum = [
  ...sentenceBuilding,
  ...verbPatterns,
  ...conversation,
  ...professional,
];

export const generalInterviewQuestions = [
  {
    question: 'How can I introduce myself professionally in an interview?',
    difficulty: 'easy',
    frequency: 'very-common',
    answer: {
      english:
        'Use a simple structure: greeting + name + current role/education + one strength + goal. Example: "Good morning! I\'m Abhishek, a final-year computer science student. I enjoy building web applications, and I\'m looking for a role where I can grow as a developer." Keep it 30–45 seconds, use starters like "To be honest..." and "One important thing about me is..." to sound structured.',
      hinglish:
        'Simple structure use karo: greeting + naam + current role/education + ek strength + goal. Example: "Good morning! I\'m Abhishek, a final-year computer science student. I enjoy building web applications, and I\'m looking for a role where I can grow as a developer." 30–45 seconds mein rakho, "To be honest..." aur "One important thing about me is..." jaise starters se structured sound karoge.',
    },
  },
  {
    question: 'What is the fastest way to improve spoken English?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Focus on patterns, not rules: (1) master Subject + Helping Word + V1 — it covers ~80% of speech; (2) learn verb patterns and collocations as fixed pairs; (3) use sentence starters to remove fillers; (4) speak daily — even 10 minutes of self-talk or reading aloud. The more you practise, the more you improve — practice makes perfect.',
      hinglish:
        'Rules nahi, patterns pe focus karo: (1) Subject + Helping Word + V1 master karo — ~80% speech cover hota hai; (2) verb patterns aur collocations ko fixed jodi ki tarah yaad karo; (3) fillers hataane ke liye sentence starters use karo; (4) roz bolo — 10 minute self-talk ya reading aloud bhi kaafi hai. The more you practise, the more you improve — practice makes perfect.',
    },
  },
];
