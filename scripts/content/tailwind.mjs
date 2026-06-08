// Tailwind CSS curriculum — beginner -> intermediate -> advanced.
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
  title: 'Tailwind CSS',
  slug: 'tailwind',
  description:
    'Utility-first CSS framework — fast UI banao bina CSS file ke. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '💨',
  tags: ['tailwind', 'css', 'frontend', 'framework'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 5,
};

const beginner = [
  {
    title: 'Tailwind Basics',
    level: 'beginner',
    description: 'Utility-first kya hai aur Tailwind kaise kaam karta hai.',
    concepts: [
      {
        title: 'What is Tailwind CSS',
        difficulty: 'easy',
        tags: ['intro', 'utility-first'],
        explanation: {
          english:
            'Tailwind is a utility-first CSS framework. Instead of writing custom CSS classes, you compose designs using small single-purpose utility classes directly in your HTML — like flex, p-4, text-center, bg-blue-500. You build any design fast without leaving your markup or inventing class names.',
          hinglish:
            'Tailwind ek utility-first CSS framework hai. Custom CSS classes likhne ke bajaye, tum HTML mein hi chhoti single-purpose utility classes se design banate ho — jaise flex, p-4, text-center, bg-blue-500. Markup chhode bina aur class names soche bina, koi bhi design fast bana lete ho.',
        },
        dailyLifeExample:
          'Tailwind ready-made Lego blocks jaisa hai — har block ek kaam karta hai (p-4 = padding, flex = row). Tum blocks jodke kuch bhi bana lete ho, naya block (custom CSS) banane ki zaroorat nahi.',
        codeExample:
          '<!-- traditional CSS needs a .card class + separate file -->\n<!-- Tailwind: utilities right in the markup -->\n<div class="flex items-center gap-4 p-4 bg-white rounded-xl shadow">\n  <img class="w-12 h-12 rounded-full" src="a.jpg" />\n  <p class="font-semibold text-slate-800">Abhishek</p>\n</div>',
        keyPoints: [
          'Utility-first: small single-purpose classes',
          'Style directly in HTML — no custom CSS files',
          'No inventing class names',
          'Fast, consistent UIs',
        ],
        quiz: [
          {
            question: 'Tailwind is a…',
            options: ['Component library', 'Utility-first CSS framework', 'JavaScript framework', 'A database'],
            correctIndex: 1,
          },
          {
            question: 'In Tailwind, where do you mostly write styles?',
            options: ['A .css file', 'Inline style attribute', 'Utility classes in HTML', 'A JSON file'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is utility-first CSS and what are its pros and cons?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Utility-first means building UI by composing many small single-purpose classes (p-4, flex, text-center) instead of writing semantic component classes with custom CSS. Pros: very fast development, consistent design tokens, no naming fatigue, small production CSS (unused classes are purged), no dead CSS. Cons: markup can look cluttered, a learning curve for class names, and repetition that you abstract with components or @apply.',
              hinglish:
                'Utility-first ka matlab UI ko bahut saari chhoti single-purpose classes (p-4, flex, text-center) jod ke banana, custom CSS wali semantic component classes likhne ke bajaye. Pros: bahut fast development, consistent design tokens, naming ki tension nahi, chhoti production CSS (unused classes purge ho jaati hain), dead CSS nahi. Cons: markup bhara-bhara dikhta hai, class names ka learning curve, aur repetition jise components ya @apply se abstract karte ho.',
            },
          },
        ],
      },
      {
        title: 'Setup & How It Works',
        difficulty: 'easy',
        tags: ['setup', 'config'],
        explanation: {
          english:
            'You install Tailwind (e.g. via npm or a framework like Next.js), include its directives in your CSS, and it scans your files for class names. Only the classes you actually use are generated into the final CSS — keeping the bundle tiny. A tailwind.config file lets you customise the design system.',
          hinglish:
            'Tailwind install karo (npm se ya Next.js jaise framework se), apni CSS mein iski directives include karo, aur ye tumhari files mein class names scan karta hai. Sirf wahi classes generate hoti hain jo tum actually use karte ho — bundle chhota rehta hai. tailwind.config file se design system customise hota hai.',
        },
        dailyLifeExample:
          'Tailwind ek smart tailor (darzi) jaisa hai jo sirf utne kapde ka use karta hai jitna tumhare design mein chahiye — koi waste nahi. Jo classes use nahi karte, wo final bill (CSS) mein aati hi nahi.',
        codeExample:
          '/* globals.css (Tailwind v4) */\n@import "tailwindcss";\n\n<!-- then just use classes -->\n<button class="px-4 py-2 bg-indigo-600 text-white rounded-lg">\n  Click me\n</button>',
        keyPoints: [
          'Install via npm / framework integration',
          'Add the Tailwind import/directives to your CSS',
          'It scans files & generates only used classes',
          'tailwind.config customises the design system',
        ],
        quiz: [
          {
            question: 'Why is Tailwind\'s production CSS small?',
            options: ['It compresses images', 'Only used classes are generated', 'It removes HTML', 'It uses no colors'],
            correctIndex: 1,
          },
          {
            question: 'What file customises Tailwind\'s design system?',
            options: ['package.json', 'tailwind.config', 'index.html', 'style.scss'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Spacing: Padding & Margin',
        difficulty: 'easy',
        tags: ['spacing', 'utilities'],
        explanation: {
          english:
            'Spacing utilities use a consistent scale. p-* is padding, m-* is margin; add a side: t/r/b/l (top/right/bottom/left) or x/y axis (e.g. px-4, my-2). The number maps to a spacing scale where 1 = 0.25rem (4px), so p-4 = 16px. Use gap-* for spacing between flex/grid children.',
          hinglish:
            'Spacing utilities ek consistent scale use karti hain. p-* padding hai, m-* margin; side jodo: t/r/b/l (top/right/bottom/left) ya x/y axis (jaise px-4, my-2). Number ek spacing scale pe map hota hai jaha 1 = 0.25rem (4px), to p-4 = 16px. flex/grid children ke beech spacing ke liye gap-* use karo.',
        },
        dailyLifeExample:
          'Spacing scale ek standard measuring tape jaisa hai jo poori team use karti hai — har koi p-4 likhe to same 16px milta hai, koi 15px koi 17px nahi. Consistency apne aap aati hai.',
        codeExample:
          '<div class="p-4">padding 16px all sides</div>\n<div class="px-6 py-2">x=24px, y=8px</div>\n<div class="mt-8 mb-2">margin top 32px, bottom 8px</div>\n<div class="flex gap-4">item spacing</div>',
        keyPoints: [
          'p-* padding, m-* margin',
          'Sides: t/r/b/l; axes: x/y',
          'Scale: 1 = 4px, so p-4 = 16px',
          'gap-* for spacing between children',
        ],
        quiz: [
          {
            question: 'What does p-4 mean?',
            options: ['4px padding', '16px padding', '4% padding', '4rem padding'],
            correctIndex: 1,
          },
          {
            question: 'Which class sets horizontal padding?',
            options: ['py-4', 'px-4', 'pt-4', 'pl-4'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Colors, Sizing & Borders',
        difficulty: 'easy',
        tags: ['colors', 'sizing', 'utilities'],
        explanation: {
          english:
            'Colours use a name + shade scale (50–950): bg-blue-500, text-slate-700, border-red-400. Sizing uses w-*/h-* (w-full, h-screen, w-1/2). Borders & radius: border, border-2, rounded, rounded-lg, rounded-full. These cover most visual styling needs.',
          hinglish:
            'Colours name + shade scale (50–950) use karte hain: bg-blue-500, text-slate-700, border-red-400. Sizing w-*/h-* se (w-full, h-screen, w-1/2). Borders & radius: border, border-2, rounded, rounded-lg, rounded-full. Ye zyadatar visual styling cover kar dete hain.',
        },
        dailyLifeExample:
          'Shade scale (100 se 900) ek paint ke shade-card jaisa hai — same colour ke alag tone, light se dark. blue-100 halka, blue-900 gehra.',
        codeExample:
          '<div class="bg-indigo-600 text-white">colored</div>\n<div class="w-1/2 h-32">half width</div>\n<div class="border-2 border-slate-200 rounded-xl">card</div>\n<img class="w-16 h-16 rounded-full" src="a.jpg" />',
        keyPoints: [
          'Colors: bg/text/border + name + shade (50–950)',
          'Sizing: w-*/h-* (full, screen, fractions)',
          'border, border-2 for width',
          'rounded, rounded-lg, rounded-full for radius',
        ],
        quiz: [
          {
            question: 'Which sets a background color?',
            options: ['color-blue', 'bg-blue-500', 'background-blue', 'fill-blue'],
            correctIndex: 1,
          },
          {
            question: 'rounded-full makes an element…',
            options: ['Square', 'A circle/pill', 'Bigger', 'Bordered'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Layout in Tailwind',
    level: 'intermediate',
    description: 'Flexbox aur Grid utilities ke saath.',
    concepts: [
      {
        title: 'Flexbox Utilities',
        difficulty: 'medium',
        tags: ['flexbox', 'layout'],
        explanation: {
          english:
            'Tailwind maps Flexbox to utilities: flex turns on flex, flex-col switches to a column, justify-* sets main-axis alignment (justify-center, justify-between), items-* sets cross-axis (items-center), and gap-* spaces children. This is the most common way to lay out components.',
          hinglish:
            'Tailwind Flexbox ko utilities mein map karta hai: flex flex on karta hai, flex-col column banata hai, justify-* main-axis alignment (justify-center, justify-between), items-* cross-axis (items-center), aur gap-* children ko space deta hai. Components layout karne ka sabse common tarika.',
        },
        dailyLifeExample:
          'Tailwind flex utilities ready-made shortcuts jaise hain — CSS mein 4 lines likhne ke bajaye class="flex items-center justify-between" ek hi line mein kaam ho gaya.',
        codeExample:
          '<nav class="flex items-center justify-between p-4">\n  <span>Logo</span>\n  <div class="flex gap-4">\n    <a>Home</a>\n    <a>About</a>\n  </div>\n</nav>',
        keyPoints: [
          'flex / flex-col turn on flex layout',
          'justify-* = main axis (center/between/around)',
          'items-* = cross axis (center/start/end)',
          'gap-* spaces flex children',
        ],
        quiz: [
          {
            question: 'Which centers items on the cross axis?',
            options: ['justify-center', 'items-center', 'gap-4', 'flex-col'],
            correctIndex: 1,
          },
          {
            question: 'flex-col changes the direction to…',
            options: ['Row', 'Column', 'Grid', 'Wrap'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Grid Utilities',
        difficulty: 'medium',
        tags: ['grid', 'layout'],
        explanation: {
          english:
            'For two-dimensional layouts, grid turns on Grid, grid-cols-* sets the number of columns (grid-cols-3), col-span-* makes an item span columns, and gap-* spaces cells. Combined with responsive prefixes it makes flexible card/gallery layouts trivial.',
          hinglish:
            'Two-dimensional layouts ke liye, grid Grid on karta hai, grid-cols-* columns ki sankhya set karta hai (grid-cols-3), col-span-* item ko columns span karata hai, aur gap-* cells ko space deta hai. Responsive prefixes ke saath card/gallery layouts banana bahut aasaan ho jaata hai.',
        },
        dailyLifeExample:
          'grid-cols-3 ek almari ke 3 khaane jaisa hai. col-span-2 matlab ek item do khaanon ki jagah le le. gap khaanon ke beech ki doori.',
        codeExample:
          '<div class="grid grid-cols-3 gap-4">\n  <div class="col-span-2">wide</div>\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</div>',
        keyPoints: [
          'grid + grid-cols-* defines columns',
          'col-span-* / row-span-* spans cells',
          'gap-* spaces grid cells',
          'Great for galleries, dashboards, cards',
        ],
        quiz: [
          {
            question: 'Which creates a 3-column grid?',
            options: ['grid-3', 'grid grid-cols-3', 'columns-3', 'flex-3'],
            correctIndex: 1,
          },
          {
            question: 'col-span-2 makes an item…',
            options: ['Half width', 'Span two columns', 'A new row', 'Hidden'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Responsive Design',
        difficulty: 'medium',
        tags: ['responsive', 'breakpoints'],
        explanation: {
          english:
            'Tailwind is mobile-first. Unprefixed classes apply everywhere; prefixed ones apply from a breakpoint up: sm (640px), md (768px), lg (1024px), xl (1280px). So grid-cols-1 md:grid-cols-3 means 1 column on mobile, 3 from medium screens. You compose responsiveness right in the class list.',
          hinglish:
            'Tailwind mobile-first hai. Bina prefix wali classes har jagah lagti hain; prefix wali ek breakpoint se upar: sm (640px), md (768px), lg (1024px), xl (1280px). To grid-cols-1 md:grid-cols-3 matlab mobile pe 1 column, medium screens se 3. Responsiveness class list mein hi compose karte ho.',
        },
        dailyLifeExample:
          'Responsive prefixes ek dress code jaisa hai jo jagah ke hisaab se badle — "normally casual (base), office mein formal (md:)". Screen badi hoti hai to rule badal jaata hai.',
        codeExample:
          '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\n  <!-- 1 col phone, 2 tablet, 3 desktop -->\n</div>\n<p class="text-base lg:text-xl">scales up on large</p>',
        keyPoints: [
          'Mobile-first: base applies everywhere',
          'Prefixes apply from a breakpoint UP',
          'sm/md/lg/xl = 640/768/1024/1280px',
          'Compose responsive rules in the class list',
        ],
        quiz: [
          {
            question: 'md:grid-cols-3 applies…',
            options: ['Only below 768px', 'From 768px and up', 'Only at 768px', 'Never'],
            correctIndex: 1,
          },
          {
            question: 'Tailwind\'s responsive model is…',
            options: ['Desktop-first', 'Mobile-first', 'Print-first', 'Random'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'States & Variants',
    level: 'intermediate',
    description: 'Hover, focus, aur dark mode.',
    concepts: [
      {
        title: 'State Variants (hover, focus, active)',
        difficulty: 'medium',
        tags: ['variants', 'states'],
        explanation: {
          english:
            'Apply styles on interaction by prefixing utilities with a state: hover:, focus:, active:, disabled:, and group-hover:. For example hover:bg-indigo-700 changes the background on mouse over. This replaces writing :hover rules in CSS.',
          hinglish:
            'Interaction pe styles lagane ke liye utilities ke aage state prefix lagao: hover:, focus:, active:, disabled:, aur group-hover:. Jaise hover:bg-indigo-700 mouse over pe background badal deta hai. Ye CSS mein :hover rules likhne ki jagah le leta hai.',
        },
        dailyLifeExample:
          'hover: variant ek touch-sensitive light jaisa hai — haath le jaao (hover) to jal uthe. Bina chhue normal, chhuo to react.',
        codeExample:
          '<button class="bg-indigo-600 hover:bg-indigo-700 focus:ring-2 active:scale-95 transition">\n  Hover & click me\n</button>\n\n<!-- group: parent hover affects child -->\n<div class="group">\n  <p class="group-hover:text-indigo-600">react to parent hover</p>\n</div>',
        keyPoints: [
          'Prefix utilities with a state: hover:, focus:, active:',
          'disabled:, first:, last:, odd:, even: also exist',
          'group-hover: react to a parent\'s hover',
          'Combine with transition for smoothness',
        ],
        quiz: [
          {
            question: 'How do you change background on hover?',
            options: ['bg-hover-700', 'hover:bg-indigo-700', 'onhover-bg', ':hover'],
            correctIndex: 1,
          },
          {
            question: 'group-hover: lets a child react to…',
            options: ['Its own hover', 'A parent (group) being hovered', 'A click', 'Focus only'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Dark Mode',
        difficulty: 'medium',
        tags: ['dark-mode', 'variants'],
        explanation: {
          english:
            'Tailwind supports dark mode with the dark: variant. Write your normal (light) classes, then add dark: versions for dark mode: bg-white dark:bg-slate-900. Depending on config, dark mode activates by the OS preference or by toggling a class on a parent (e.g. <html class="dark">).',
          hinglish:
            'Tailwind dark: variant se dark mode support karta hai. Apni normal (light) classes likho, phir dark mode ke liye dark: versions jodo: bg-white dark:bg-slate-900. Config ke hisaab se, dark mode OS preference se activate hota hai ya parent pe class toggle karke (jaise <html class="dark">).',
        },
        dailyLifeExample:
          'dark: variant ek phone ke day/night mode jaisa hai — same app, do looks. Din mein safed, raat mein kaala, ek toggle se switch.',
        codeExample:
          '<div class="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">\n  Adapts to dark mode\n</div>\n<!-- toggle by adding class="dark" to <html> -->',
        keyPoints: [
          'dark: variant for dark-mode styles',
          'Pair light + dark: classes together',
          'Activated by OS preference or a class toggle',
          'Keeps one markup for both themes',
        ],
        quiz: [
          {
            question: 'Which prefix applies a style in dark mode?',
            options: ['night:', 'dark:', 'theme-dark:', 'mode:'],
            correctIndex: 1,
          },
          {
            question: 'dark:bg-slate-900 sets the background…',
            options: ['Always', 'Only in dark mode', 'Only on hover', 'Never'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Customization',
    level: 'advanced',
    description: 'Theme extend karna, @apply, aur arbitrary values.',
    concepts: [
      {
        title: 'Customising the Theme',
        difficulty: 'medium',
        tags: ['config', 'theme'],
        explanation: {
          english:
            'Tailwind\'s design system (colours, spacing, fonts, breakpoints) is fully customisable. In v3 you extend theme in tailwind.config.js; in v4 you define design tokens with @theme in CSS. This lets you add brand colours and reuse them as normal utilities like bg-brand.',
          hinglish:
            'Tailwind ka design system (colours, spacing, fonts, breakpoints) poori tarah customisable hai. v3 mein tailwind.config.js ke theme ko extend karte ho; v4 mein CSS mein @theme se design tokens define karte ho. Isse brand colours add karke unhe normal utilities ki tarah reuse kar sakte ho jaise bg-brand.',
        },
        dailyLifeExample:
          'Theme customise karna ek restaurant ke menu mein apni special dish add karne jaisa hai — ek baar add karo, phir poori team usse order (use) kar sakti hai.',
        codeExample:
          '/* Tailwind v4 (in CSS) */\n@theme {\n  --color-brand: #4f46e5;\n  --font-display: "Poppins", sans-serif;\n}\n\n<!-- now use it as a normal utility -->\n<button class="bg-brand font-display">Branded</button>',
        keyPoints: [
          'Customise colors, spacing, fonts, breakpoints',
          'v3: extend theme in tailwind.config.js',
          'v4: define tokens via @theme in CSS',
          'Custom tokens become normal utilities',
        ],
        quiz: [
          {
            question: 'In Tailwind v4, design tokens are defined with…',
            options: ['tailwind.config.js only', '@theme in CSS', 'package.json', 'inline styles'],
            correctIndex: 1,
          },
          {
            question: 'After adding a brand color token, you use it like…',
            options: ['style="brand"', 'bg-brand', 'color:brand', '@brand'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: '@apply & Reusable Components',
        difficulty: 'medium',
        tags: ['apply', 'components'],
        explanation: {
          english:
            'When the same long class list repeats, you can extract it into a single CSS class using @apply, which inlines Tailwind utilities. Often, though, the better approach in React is a component (e.g. <Button>) that holds the classes. Use @apply sparingly — overusing it gives back the maintenance problems Tailwind solves.',
          hinglish:
            'Jab same lambi class list baar-baar repeat ho, to @apply se use ek single CSS class mein extract kar sakte ho, jo Tailwind utilities inline kar deta hai. Par React mein aksar better tarika ek component (jaise <Button>) hai jo classes rakhe. @apply kam use karo — zyada use karne se wahi maintenance problems wapas aa jaati hain jo Tailwind solve karta hai.',
        },
        dailyLifeExample:
          '@apply ek combo meal jaisa hai — baar-baar har item alag order karne ke bajaye ek naam (btn) de do. Par har cheez combo banana bhi galat — balance chahiye.',
        codeExample:
          '/* CSS */\n.btn {\n  @apply px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700;\n}\n\n<!-- HTML -->\n<button class="btn">Reusable</button>\n\n<!-- Or in React, a <Button> component holding the classes -->',
        keyPoints: [
          '@apply inlines utilities into a custom class',
          'Good for repeated patterns (e.g. .btn)',
          'In React, prefer a component over @apply',
          'Overusing @apply defeats utility-first benefits',
        ],
        quiz: [
          {
            question: 'What does @apply do?',
            options: ['Imports a file', 'Inlines Tailwind utilities into a CSS class', 'Deletes classes', 'Adds dark mode'],
            correctIndex: 1,
          },
          {
            question: 'In React, a better alternative to @apply is often…',
            options: ['Inline styles', 'A reusable component', 'More @apply', 'Global CSS'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When should you use @apply vs a component in Tailwind?',
            difficulty: 'hard',
            frequency: 'rare',
            answer: {
              english:
                'Use @apply for small, purely-presentational repeated patterns where you cannot create a component (e.g. styling markdown output or a design-system class like .btn). In component frameworks like React, prefer extracting a component (<Button>) that encapsulates the utility classes plus behaviour and props — it is more flexible and keeps a single source of truth. Avoid heavy @apply usage because it recreates the bloated, hard-to-trace stylesheets utility-first was meant to avoid.',
              hinglish:
                '@apply chhote, purely-presentational repeated patterns ke liye use karo jaha component nahi bana sakte (jaise markdown output styling ya .btn jaisi design-system class). React jaise component frameworks mein ek component (<Button>) extract karna better hai jo utility classes plus behaviour aur props encapsulate kare — wo zyada flexible hai aur single source of truth rakhta hai. Heavy @apply avoid karo kyunki wo wahi bloated, hard-to-trace stylesheets wapas la deta hai jinse bachne ke liye utility-first bana tha.',
            },
          },
        ],
      },
      {
        title: 'Arbitrary Values & JIT',
        difficulty: 'hard',
        tags: ['jit', 'arbitrary'],
        explanation: {
          english:
            'Tailwind\'s JIT (Just-In-Time) engine generates classes on demand as it sees them, so even one-off arbitrary values work using square brackets: w-[327px], bg-[#1da1f2], top-[13%]. Use arbitrary values for rare exact needs, but prefer the design-system scale for consistency.',
          hinglish:
            'Tailwind ka JIT (Just-In-Time) engine classes ko on demand generate karta hai jaise hi unhe dekhta hai, isliye one-off arbitrary values bhi square brackets se chalti hain: w-[327px], bg-[#1da1f2], top-[13%]. Arbitrary values rare exact needs ke liye use karo, par consistency ke liye design-system scale prefer karo.',
        },
        dailyLifeExample:
          'Arbitrary values custom tailoring jaise hain — ready-made size (p-4) fit na ho to exact maap (w-[327px]) de do. Par har cheez custom silwana mehnga/inconsistent — zaroorat pe hi.',
        codeExample:
          '<div class="w-[327px] bg-[#1da1f2] top-[13%]">\n  exact one-off values\n</div>\n<!-- JIT generates these on the fly; prefer scale when possible -->',
        keyPoints: [
          'JIT generates classes on demand (fast, tiny CSS)',
          'Arbitrary values use square brackets: w-[327px]',
          'Great for rare exact one-off values',
          'Prefer the standard scale for consistency',
        ],
        quiz: [
          {
            question: 'How do you set an exact one-off width in Tailwind?',
            options: ['w-327', 'w-[327px]', 'width-327', 'w=327'],
            correctIndex: 1,
          },
          {
            question: 'What does the JIT engine do?',
            options: ['Minifies images', 'Generates classes on demand', 'Adds dark mode', 'Runs JavaScript'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'Why choose Tailwind over writing plain CSS or using Bootstrap?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Tailwind gives low-level utilities, so you build custom designs without fighting prebuilt components (as you do with Bootstrap) and without context-switching to separate CSS files or naming things. It enforces a consistent design scale, purges unused styles for a tiny bundle, and avoids dead CSS. Bootstrap is faster for generic, component-heavy UIs; Tailwind wins when you want a unique design with full control.',
      hinglish:
        'Tailwind low-level utilities deta hai, isliye tum custom designs banate ho bina prebuilt components se ladne ke (jaise Bootstrap mein hota hai) aur bina alag CSS files ya naming ke context-switch ke. Ye consistent design scale enforce karta hai, unused styles purge karke bundle chhota rakhta hai, aur dead CSS avoid karta hai. Bootstrap generic, component-heavy UIs ke liye fast hai; Tailwind tab jeet ta hai jab unique design aur full control chahiye.',
    },
  },
  {
    question: 'How does Tailwind keep the production CSS file small?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Tailwind scans your source files for class names and, via its JIT engine, generates only the utilities you actually use. Unused classes are never produced, so the final CSS contains just what your app needs — often a few kilobytes gzipped — regardless of how many utilities Tailwind offers.',
      hinglish:
        'Tailwind tumhari source files mein class names scan karta hai aur apne JIT engine se sirf wahi utilities generate karta hai jo tum actually use karte ho. Unused classes banti hi nahi, isliye final CSS mein sirf utna hota hai jitna app ko chahiye — aksar kuch hi kilobytes gzipped — chahe Tailwind kitni bhi utilities offer kare.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
