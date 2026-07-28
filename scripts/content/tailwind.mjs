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
      {
        title: 'Typography Utilities',
        difficulty: 'easy',
        tags: ['typography', 'text'],
        explanation: {
          english:
            'Tailwind maps font styling to a consistent scale so text always looks harmonious. text-sm/base/lg/xl/2xl...9xl control font-size (with a matched line-height baked in). font-thin to font-black control weight (font-bold = 700). leading-* sets line-height separately when needed, tracking-* sets letter-spacing, and text-left/center/right/justify align text.',
          hinglish:
            'Tailwind font styling ko ek consistent scale pe map karta hai taaki text hamesha harmonious dikhe. text-sm/base/lg/xl/2xl...9xl font-size control karte hain (ek matched line-height ke saath built-in). font-thin se font-black tak weight control karte hain (font-bold = 700). leading-* zaroorat pe line-height alag se set karta hai, tracking-* letter-spacing, aur text-left/center/right/justify text align karta hai.',
        },
        dailyLifeExample:
          "Tailwind ka text scale ek clothing size chart jaisa hai (S, M, L, XL) — poori team same naming use karti hai, isliye 'text-lg' sabke liye same size hai, koi guesswork nahi.",
        codeExample:
          '<h1 class="text-4xl font-bold text-slate-900">Big Heading</h1>\n<p class="text-base leading-relaxed text-slate-600">\n  Body text with comfortable line spacing.\n</p>\n<p class="text-sm tracking-wide uppercase text-slate-400">Label</p>\n<p class="text-center">Centered text</p>',
        keyPoints: [
          'text-sm through text-9xl set font-size (with a sensible default line-height)',
          'font-thin to font-black set font-weight (font-bold = 700)',
          'leading-* overrides line-height, tracking-* sets letter-spacing',
          'text-left/center/right/justify controls alignment',
          'text-{color}-{shade} sets the text color (same scale as backgrounds)',
        ],
        quiz: [
          {
            question: 'Which class makes text bold in Tailwind?',
            options: ['text-bold', 'font-bold', 'bold', 'weight-700'],
            correctIndex: 1,
          },
          {
            question: 'What does leading-* control?',
            options: ['Font size', 'Letter spacing', 'Line height', 'Text color'],
            correctIndex: 2,
          },
          {
            question: 'Which class sets the text color to a medium slate shade?',
            options: ['color-slate-500', 'text-slate-500', 'font-slate-500', 'bg-slate-500'],
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
          {
            question: 'You write class="text-sm md:text-sm lg:text-lg". Is the md:text-sm necessary?',
            options: [
              'Yes, always required',
              'No — since nothing changes at md, you can omit it; the base text-sm already applies until overridden at lg',
              'It will break the build',
              'Tailwind requires every breakpoint to be listed',
            ],
            correctIndex: 1,
            explanation: 'Breakpoints only need to be specified where the value actually CHANGES — the base (unprefixed) class keeps applying until a larger, prefixed class overrides it.',
          },
        ],
      },
      {
        title: 'Position & Centering',
        difficulty: 'medium',
        tags: ['position', 'layout'],
        explanation: {
          english:
            'Tailwind maps CSS position values directly: static, relative, absolute, fixed, sticky. Combine absolute/fixed with inset-0 (all sides = 0) or top-*/right-*/bottom-*/left-* to place an element precisely — very common for modals, badges, and overlays. The single most common centering trick is mx-auto (auto left/right margin) on an element with a fixed or max-width, which horizontally centers it in its container.',
          hinglish:
            'Tailwind CSS position values ko seedha map karta hai: static, relative, absolute, fixed, sticky. absolute/fixed ko inset-0 (sab sides = 0) ya top-*/right-*/bottom-*/left-* ke saath combine karo element ko exactly place karne ke liye — modals, badges, overlays ke liye bahut common. Sabse common centering trick mx-auto hai (auto left/right margin) ek fixed ya max-width wale element pe, jo use apne container mein horizontally center kar deta hai.',
        },
        dailyLifeExample:
          'position: absolute + inset-0 ek poster ko poore notice-board pe bilkul fit karke chipkana hai. mx-auto ek photo ko frame ke exact beech mein rakhna hai — dono taraf equal jagah apne aap ban jaati hai.',
        codeExample:
          '<!-- badge pinned to top-right corner -->\n<div class="relative">\n  <img src="avatar.jpg" />\n  <span class="absolute top-0 right-0 bg-red-500 rounded-full w-3 h-3"></span>\n</div>\n\n<!-- full-screen overlay -->\n<div class="fixed inset-0 bg-black/50"></div>\n\n<!-- classic centered container -->\n<div class="max-w-4xl mx-auto px-4">\n  Centered content, 4xl max width\n</div>',
        keyPoints: [
          'position utilities: static, relative, absolute, fixed, sticky',
          'inset-0 = top/right/bottom/left all set to 0',
          'A positioned child needs a relative (or similar) parent to anchor to',
          'mx-auto centers a max-width/fixed-width element horizontally',
          'Common pattern: max-w-{size} mx-auto px-4 for a centered page container',
        ],
        quiz: [
          {
            question: 'What does inset-0 do?',
            options: ['Removes all margin', 'Sets top, right, bottom and left all to 0', 'Sets width to 0', 'Hides the element'],
            correctIndex: 1,
          },
          {
            question: 'Which class horizontally centers a max-width block element?',
            options: ['text-center', 'items-center', 'mx-auto', 'justify-center'],
            correctIndex: 2,
          },
          {
            question: 'For an absolutely positioned child to anchor correctly to its parent, the parent usually needs…',
            options: ['display: flex', 'position: relative (or similar)', 'overflow: hidden', 'No special setup needed'],
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
          {
            question: 'Which class correctly applies a hover background ONLY on medium screens and up?',
            options: ['hover:md:bg-indigo-700', 'md:hover:bg-indigo-700', 'md-hover:bg-indigo-700', 'hover-md:bg-indigo-700'],
            correctIndex: 1,
            explanation: 'Tailwind stacks variants in a fixed order: responsive prefix first, then state — md:hover:bg-indigo-700. Reversing the order does not work as expected.',
          },
        ],
      },
      {
        title: 'Transitions & Animations',
        difficulty: 'medium',
        tags: ['transitions', 'animations'],
        explanation: {
          english:
            'transition (or transition-colors/transition-transform) turns on smooth animation for property changes — pair it with duration-* (speed in ms) and ease-* (timing curve) plus a hover:/focus: state to animate an interaction. For continuous effects, Tailwind ships ready-made keyframe animations: animate-spin (loading spinners), animate-pulse (skeleton loaders), animate-bounce, and animate-ping.',
          hinglish:
            'transition (ya transition-colors/transition-transform) property changes ke liye smooth animation on karta hai — ise duration-* (speed ms mein) aur ease-* (timing curve) ke saath jodo plus ek hover:/focus: state se interaction animate karo. Continuous effects ke liye, Tailwind ready-made keyframe animations deta hai: animate-spin (loading spinners), animate-pulse (skeleton loaders), animate-bounce, aur animate-ping.',
        },
        dailyLifeExample:
          "transition ek automatic darwaze jaisa hai jo dheere se khulta hai. animate-spin ek chakra (pinwheel) jaisa hai jo hawa mein hamesha ghoomta rehta hai — loading spinner ke liye perfect. animate-pulse ek dil ki dhadkan jaisa hai — dheere dheere fade in-out, 'loading...' ka feel deta hai.",
        codeExample:
          '<!-- animate a hover interaction -->\n<button class="bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition duration-200 ease-in-out">\n  Smooth hover\n</button>\n\n<!-- loading spinner -->\n<div class="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>\n\n<!-- skeleton loading placeholder -->\n<div class="h-4 bg-slate-200 rounded animate-pulse"></div>',
        keyPoints: [
          'transition enables smooth animation of property changes on hover/focus/etc.',
          'duration-* controls speed (in ms); ease-* controls the timing curve',
          'animate-spin: spinning loader; animate-pulse: fading skeleton loader',
          'animate-bounce: bouncing motion; animate-ping: expanding ripple (notification dots)',
          'Combine transition with a state variant (hover:scale-105) for interactive effects',
        ],
        quiz: [
          {
            question: 'Which class is commonly used to build a skeleton loading placeholder?',
            options: ['animate-spin', 'animate-pulse', 'animate-bounce', 'transition'],
            correctIndex: 1,
          },
          {
            question: 'What does duration-* control in a transition?',
            options: ['The color', 'How long the animation takes', 'The direction', 'The font size'],
            correctIndex: 1,
          },
          {
            question: 'Which built-in animation is typically used for a loading spinner?',
            options: ['animate-bounce', 'animate-ping', 'animate-spin', 'animate-pulse'],
            correctIndex: 2,
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

  // ─── Core Concepts ───────────────────────────────────────────
  {
    question: 'What is Tailwind CSS and how does it differ from Bootstrap?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Tailwind is a UTILITY-FIRST framework: it ships low-level classes like `flex`, `pt-4`, `text-center` that you compose to build any design. Bootstrap is a COMPONENT framework shipping pre-built `.btn` and `.card` styles. The consequence is that Bootstrap gets you a conventional-looking site fastest, but customising away from its look means fighting its CSS, while Tailwind requires more classes upfront yet produces genuinely custom designs without ever leaving your markup or writing override CSS.',
      hinglish:
        'Tailwind ek UTILITY-FIRST framework hai: ye `flex`, `pt-4`, `text-center` jaisi low-level classes deta hai jinhe tum koi bhi design banane ke liye compose karte ho. Bootstrap ek COMPONENT framework hai jo pre-built `.btn` aur `.card` styles deta hai. Consequence ye hai ki Bootstrap tumhe ek conventional-dikhti site sabse jaldi deta hai, par uske look se hatt ke customise karna uski CSS se ladna hai, jabki Tailwind ko upfront zyada classes chahiye par ye genuinely custom designs produce karta hai bina kabhi markup chhode ya override CSS likhe.',
    },
  },
  {
    question: 'What does "utility-first" actually mean?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Utility-first means styling with many small single-purpose classes applied directly in markup, rather than writing semantic class names and a separate stylesheet. Instead of `.card` in CSS, you write `rounded-lg shadow-md p-6 bg-white`. The practical benefits: you never invent class names, you never wonder whether deleting CSS breaks another page, styles are colocated with the markup they affect, and the stylesheet stops growing indefinitely as the project ages.',
      hinglish:
        'Utility-first ka matlab hai bahut chhoti single-purpose classes se markup mein directly styling karna, semantic class names aur ek separate stylesheet likhne ke bajaye. CSS mein `.card` ke bajaye, tum `rounded-lg shadow-md p-6 bg-white` likhte ho. Practical benefits: tum kabhi class names invent nahi karte, tum kabhi nahi sochte ki CSS delete karna doosra page todega ya nahi, styles us markup ke saath colocated hain jise wo affect karte hain, aur project purana hone pe stylesheet indefinitely badhna band kar deti hai.',
    },
  },
  {
    question: 'What are the main criticisms of Tailwind and how do you respond?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The common criticisms are that markup becomes cluttered with long class strings, that it looks like inline styles, and that class names are unreadable. The responses: unlike inline styles, utilities respect a design SYSTEM (constrained spacing and colour scales) and support responsive and state variants that inline styles cannot express. Repetition is solved by extracting a component in your framework rather than a CSS class. The verbosity is real, and is the genuine trade for never writing or deleting bespoke CSS again.',
      hinglish:
        'Common criticisms ye hain ki markup lambi class strings se bhar jaata hai, ye inline styles jaisa lagta hai, aur class names unreadable hain. Responses: inline styles ke ulat, utilities ek design SYSTEM respect karti hain (constrained spacing aur colour scales) aur responsive aur state variants support karti hain jo inline styles express nahi kar sakte. Repetition ek CSS class ke bajaye apne framework mein ek component extract karke solve hoti hai. Verbosity real hai, aur ye wo genuine trade hai jisse tum kabhi dobara bespoke CSS nahi likhte ya delete karte.',
    },
  },
  {
    question: 'How does Tailwind\'s responsive design system work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Tailwind is MOBILE-FIRST: an unprefixed utility applies at every size, and a breakpoint prefix applies from that width UPWARD. So `w-full md:w-1/2 lg:w-1/3` means full width on phones, half from the medium breakpoint up, and a third from large up. The common beginner mistake is treating `md:` as "only on medium", which it is not — it is "medium and above". Default breakpoints are sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px.',
      hinglish:
        'Tailwind MOBILE-FIRST hai: ek unprefixed utility har size pe apply hoti hai, aur ek breakpoint prefix us width se UPAR apply hota hai. Isliye `w-full md:w-1/2 lg:w-1/3` matlab phones pe full width, medium breakpoint se upar aadha, aur large se upar ek tihai. Common beginner mistake `md:` ko "sirf medium pe" maanna hai, jo ye nahi hai — ye "medium aur upar" hai. Default breakpoints sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px hain.',
    },
  },
  {
    question: 'What are variants in Tailwind and which are most used?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Variants are prefixes applying a utility conditionally. State variants: `hover:`, `focus:`, `active:`, `disabled:`. Structural variants: `first:`, `last:`, `odd:`, `even:`. Contextual variants: `dark:` for dark mode and the breakpoint prefixes. Group variants (`group-hover:`) style a child when an ancestor is hovered, and `peer-*` styles a sibling based on another element\'s state — which is how you style a label from an input\'s checked state with no JavaScript. Variants stack: `md:dark:hover:bg-blue-600`.',
      hinglish:
        'Variants wo prefixes hain jo ek utility conditionally apply karte hain. State variants: `hover:`, `focus:`, `active:`, `disabled:`. Structural variants: `first:`, `last:`, `odd:`, `even:`. Contextual variants: dark mode ke liye `dark:` aur breakpoint prefixes. Group variants (`group-hover:`) ek child ko style karte hain jab ek ancestor hover ho, aur `peer-*` ek sibling ko doosre element ki state ke basis pe style karta hai — jisse tum ek input ki checked state se ek label style karte ho bina JavaScript ke. Variants stack hote hain: `md:dark:hover:bg-blue-600`.',
    },
  },
  {
    question: 'What is the difference between group-hover and peer?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Both style one element based on ANOTHER element\'s state, but differ in relationship. GROUP handles PARENT to child: mark an ancestor `group`, then a descendant uses `group-hover:text-blue-500` to react when the ancestor is hovered — ideal for a card where hovering anywhere changes the title colour. PEER handles SIBLING to sibling: mark an element `peer`, then a LATER sibling uses `peer-checked:` or `peer-invalid:` — which is how you show a validation message or style a label purely from CSS.',
      hinglish:
        'Dono ek element ko DOOSRE element ki state ke basis pe style karte hain, par relationship mein differ karte hain. GROUP PARENT se child handle karta hai: ek ancestor ko `group` mark karo, phir ek descendant `group-hover:text-blue-500` use karke react karta hai jab ancestor hover ho — ek card ke liye ideal jahan kahin bhi hover karna title ka colour badalta hai. PEER SIBLING se sibling handle karta hai: ek element ko `peer` mark karo, phir ek BAAD ka sibling `peer-checked:` ya `peer-invalid:` use karta hai — jisse tum ek validation message dikhate ho ya ek label purely CSS se style karte ho.',
    },
  },
  {
    question: 'How do you handle repeated utility combinations without duplication?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The idiomatic answer is to extract a COMPONENT in your framework — a React `<Button>` or a Vue component — so the utilities live in one place and props control variants. This is preferred because it also encapsulates behaviour and markup, not just styles. `@apply` in a CSS file is the escape hatch, but overusing it recreates exactly the bespoke CSS layer Tailwind exists to eliminate, so the Tailwind maintainers explicitly advise component extraction first.',
      hinglish:
        'Idiomatic jawab apne framework mein ek COMPONENT extract karna hai — ek React `<Button>` ya ek Vue component — taaki utilities ek jagah rahein aur props variants control karein. Ye isliye preferred hai kyunki ye sirf styles nahi, behaviour aur markup bhi encapsulate karta hai. Ek CSS file mein `@apply` escape hatch hai, par ise overuse karna exactly wo bespoke CSS layer wapas bana deta hai jise khatam karne ke liye Tailwind exist karta hai, isliye Tailwind maintainers explicitly pehle component extraction ki salah dete hain.',
    },
  },
  {
    question: 'What is @apply and when should you avoid it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`@apply` inlines Tailwind utilities into a custom CSS class: `.btn { @apply px-4 py-2 rounded bg-blue-500; }`. It is reasonable for a handful of genuinely global primitives, or when you must style markup you do not control (third-party HTML, rich-text output). Avoid it as a general habit: it moves styles back out of the markup, so you lose colocation, reintroduce naming decisions, and end up maintaining a stylesheet again — which is the exact problem Tailwind was adopted to solve.',
      hinglish:
        '`@apply` Tailwind utilities ko ek custom CSS class mein inline karta hai: `.btn { @apply px-4 py-2 rounded bg-blue-500; }`. Ye kuch genuinely global primitives ke liye reasonable hai, ya jab tumhe aisa markup style karna ho jo tumhare control mein nahi (third-party HTML, rich-text output). Ise ek general aadat ke roop mein avoid karo: ye styles ko markup se wapas bahar le jaata hai, isliye tum colocation kho dete ho, naming decisions wapas laate ho, aur phir se ek stylesheet maintain karne lagte ho — jo exactly wo problem hai jise solve karne ke liye Tailwind adopt kiya gaya tha.',
    },
  },
  {
    question: 'How does dark mode work in Tailwind?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Prefix any utility with `dark:` — `bg-white dark:bg-gray-900`. Two strategies: MEDIA strategy follows the operating system\'s `prefers-color-scheme` automatically, which is zero-config but gives users no in-app toggle. CLASS (or selector) strategy activates dark utilities when a `dark` class is present on a root element, which is what you need for a manual theme switcher, typically persisted to localStorage and applied before first paint to avoid a flash of the wrong theme.',
      hinglish:
        'Kisi bhi utility ko `dark:` se prefix karo — `bg-white dark:bg-gray-900`. Do strategies: MEDIA strategy automatically operating system ka `prefers-color-scheme` follow karti hai, jo zero-config hai par users ko koi in-app toggle nahi deti. CLASS (ya selector) strategy dark utilities ko tab activate karti hai jab ek root element pe ek `dark` class ho, jo tumhe ek manual theme switcher ke liye chahiye, typically localStorage mein persist hoke aur first paint se pehle apply hoke taaki galat theme ka flash na ho.',
    },
  },
  {
    question: 'What is the JIT engine and what did it change?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The Just-In-Time engine scans your source files and generates only the CSS for classes you actually use, on demand. Before JIT, Tailwind pre-generated a huge development stylesheet and relied on PurgeCSS to strip unused classes for production, which made development builds slow and heavy. JIT made builds fast, made development and production output consistent, and crucially enabled ARBITRARY VALUES like `w-[347px]`, since any class can now be generated on the fly rather than pre-enumerated.',
      hinglish:
        'Just-In-Time engine tumhari source files scan karta hai aur sirf un classes ki CSS generate karta hai jo tum actually use karte ho, on demand. JIT se pehle, Tailwind ek huge development stylesheet pre-generate karta tha aur production ke liye unused classes hataane ke liye PurgeCSS pe depend karta tha, jisse development builds slow aur bhaari the. JIT ne builds fast banaye, development aur production output consistent kiya, aur crucially `w-[347px]` jaisi ARBITRARY VALUES enable ki, kyunki ab koi bhi class pre-enumerate hone ke bajaye on the fly generate ho sakti hai.',
    },
  },
  {
    question: 'What are arbitrary values and when should you use them?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Arbitrary values escape the design system with square brackets: `top-[117px]`, `bg-[#1da1f2]`, `grid-cols-[1fr_500px_2fr]`. They are the right tool for genuine one-offs — a precise brand colour, a magic number matching a background image. They should stay rare, because their whole point is that they bypass the constrained scale that keeps a design consistent. If you find yourself using the same arbitrary value repeatedly, that is a signal it belongs in your theme configuration instead.',
      hinglish:
        'Arbitrary values square brackets se design system se bahar nikalti hain: `top-[117px]`, `bg-[#1da1f2]`, `grid-cols-[1fr_500px_2fr]`. Ye genuine one-offs ke liye sahi tool hain — ek precise brand colour, ek background image se match karta ek magic number. Inhe rare rehna chahiye, kyunki inka poora point ye hai ki wo us constrained scale ko bypass karti hain jo ek design ko consistent rakhta hai. Agar tum khud ko wahi arbitrary value baar-baar use karte paao, wo ek signal hai ki wo tumhare theme configuration mein belong karti hai.',
    },
  },
  {
    question: 'How do you customise the Tailwind theme?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'In v3 you edit `tailwind.config.js`: `theme.extend` ADDS to the defaults (the usual choice), while putting values directly under `theme` REPLACES that scale entirely — replacing `colors` wholesale removes every built-in colour, which is a classic accidental breakage. Tailwind v4 moves configuration into CSS itself via `@theme` and CSS custom properties, which makes design tokens available at runtime rather than only at build time.',
      hinglish:
        'v3 mein tum `tailwind.config.js` edit karte ho: `theme.extend` defaults mein ADD karta hai (usual choice), jabki values ko directly `theme` ke neeche rakhna us scale ko poori tarah REPLACE karta hai — `colors` ko wholesale replace karna har built-in colour hata deta hai, jo ek classic accidental breakage hai. Tailwind v4 configuration ko `@theme` aur CSS custom properties ke through CSS mein hi le jaata hai, jo design tokens ko sirf build time ke bajaye runtime pe available karta hai.',
    },
  },
  {
    question: 'Why do dynamically constructed class names break in Tailwind?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Tailwind scans source files as PLAIN TEXT looking for complete class names — it does not execute your code. So `` `text-${color}-500` `` produces nothing, because the literal string `text-red-500` never appears anywhere for the scanner to find. The fix is to write complete class names and select between them: a lookup object mapping `red` to the full string `text-red-500`, or explicit conditional branches. This is the single most common Tailwind bug, and it typically appears only in production.',
      hinglish:
        'Tailwind source files ko PLAIN TEXT ki tarah scan karta hai complete class names dhundhte hue — ye tumhara code execute nahi karta. Isliye `` `text-${color}-500` `` kuch produce nahi karta, kyunki literal string `text-red-500` kahin nahi aati jise scanner dhundh sake. Fix ye hai ki complete class names likho aur unke beech select karo: ek lookup object jo `red` ko poori string `text-red-500` se map kare, ya explicit conditional branches. Ye sabse common single Tailwind bug hai, aur ye typically sirf production mein dikhta hai.',
    },
  },
  {
    question: 'How does Tailwind keep the production bundle small?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Tailwind generates CSS only for the classes it finds in your configured content paths, so the output size scales with how many DISTINCT utilities your app uses, not with how many Tailwind offers — typically a few kilobytes gzipped even for large applications. This also means the CSS stops growing as the app grows, since new pages mostly reuse existing utilities. The critical requirement is correct `content` globs: miss a directory and those classes silently disappear in production.',
      hinglish:
        'Tailwind sirf un classes ke liye CSS generate karta hai jo use tumhare configured content paths mein milti hain, isliye output size is se scale karta hai ki tumhari app kitni DISTINCT utilities use karti hai, is se nahi ki Tailwind kitni offer karta hai — typically bade applications ke liye bhi kuch kilobytes gzipped. Iska matlab bhi hai ki app badhne pe CSS badhna band kar deti hai, kyunki naye pages zyadatar existing utilities reuse karte hain. Critical requirement sahi `content` globs hain: ek directory chhoot jaaye aur wo classes production mein silently gayab ho jaati hain.',
    },
  },
  {
    question: 'What is the space-* and divide-* family of utilities?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`space-x-4` and `space-y-4` add margin BETWEEN children without adding it before the first or after the last, which avoids the awkward "last-child margin" cleanup. `divide-y` adds borders between children in the same way. Both work by targeting `> * + *`, which has two consequences: they only affect direct children, and they can behave unexpectedly with `flex-wrap` or absolutely positioned children. On a flex or grid container, `gap-4` is usually the cleaner modern choice.',
      hinglish:
        '`space-x-4` aur `space-y-4` children ke BEECH margin add karte hain bina pehle se pehle ya aakhri ke baad add kiye, jo awkward "last-child margin" cleanup avoid karta hai. `divide-y` usi tarah children ke beech borders add karta hai. Dono `> * + *` target karke kaam karte hain, jiske do consequences hain: wo sirf direct children ko affect karte hain, aur `flex-wrap` ya absolutely positioned children ke saath unexpectedly behave kar sakte hain. Ek flex ya grid container pe, `gap-4` usually cleaner modern choice hai.',
    },
  },
  {
    question: 'How do you style form elements and validation states in Tailwind?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use state variants directly: `focus:ring-2`, `disabled:opacity-50`, `invalid:border-red-500`, `required:`, `checked:`. Combining `peer` with `peer-invalid:` lets an error message appear based purely on the input\'s native validity, with no JavaScript. For consistent base styling of inputs and selects across browsers, the official `@tailwindcss/forms` plugin resets them to a sensible starting point, which is far less painful than normalising browser defaults yourself.',
      hinglish:
        'State variants directly use karo: `focus:ring-2`, `disabled:opacity-50`, `invalid:border-red-500`, `required:`, `checked:`. `peer` ko `peer-invalid:` ke saath combine karna ek error message ko purely input ki native validity ke basis pe dikhne deta hai, bina JavaScript ke. Browsers ke across inputs aur selects ki consistent base styling ke liye, official `@tailwindcss/forms` plugin unhe ek sensible starting point pe reset karta hai, jo khud browser defaults normalise karne se bahut kam painful hai.',
    },
  },
  {
    question: 'What is Tailwind\'s spacing scale and why is it constrained?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Tailwind uses a numeric scale where each step is 0.25rem, so `p-1` is 4px, `p-4` is 16px, `p-8` is 32px. It is deliberately constrained because a limited set of choices is what produces VISUAL CONSISTENCY: designers and developers stop picking arbitrary values like 13px or 17px that make a UI feel subtly untidy. It is effectively a design system enforced by the tool, which is a large part of why Tailwind UIs look coherent even without a designer.',
      hinglish:
        'Tailwind ek numeric scale use karta hai jahan har step 0.25rem hai, isliye `p-1` 4px hai, `p-4` 16px, `p-8` 32px. Ye deliberately constrained hai kyunki choices ka ek limited set hi VISUAL CONSISTENCY produce karta hai: designers aur developers 13px ya 17px jaisi arbitrary values chunna band kar dete hain jo ek UI ko subtly untidy feel karati hain. Ye effectively tool se enforce kiya ek design system hai, jo ek badi wajah hai ki Tailwind UIs bina ek designer ke bhi coherent lagti hain.',
    },
  },
  {
    question: 'How do you build a responsive layout with Tailwind\'s flex and grid utilities?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'For one-dimensional layouts use flex: `flex flex-col md:flex-row gap-4` stacks on mobile and sits side by side from medium up. For two-dimensional layouts use grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` is the standard responsive card grid. Prefer `gap-*` over margins on children, since it spaces items without edge-case cleanup. `flex-1`, `shrink-0`, and `basis-*` control how items share leftover space.',
      hinglish:
        'One-dimensional layouts ke liye flex use karo: `flex flex-col md:flex-row gap-4` mobile pe stack karta hai aur medium se upar side by side baithta hai. Two-dimensional layouts ke liye grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` standard responsive card grid hai. Children pe margins ke bajaye `gap-*` prefer karo, kyunki ye items ko bina edge-case cleanup ke space karta hai. `flex-1`, `shrink-0`, aur `basis-*` control karte hain ki items bacha hua space kaise share karein.',
    },
  },
  {
    question: 'What is the ring utility and how does it differ from border and outline?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A ring is a box-shadow rendered OUTSIDE the element, so unlike a border it does not affect layout — adding `ring-2` on focus never shifts surrounding content, which is why it is the idiomatic focus indicator. Unlike the native `outline`, a ring follows border-radius correctly and supports offset and colour utilities. Use `ring` for focus states, `border` when the line is part of the visual design and you have accounted for its width in the layout.',
      hinglish:
        'Ek ring ek box-shadow hai jo element ke BAHAR render hoti hai, isliye ek border ke ulat ye layout affect nahi karti — focus pe `ring-2` add karna kabhi surrounding content shift nahi karta, isiliye ye idiomatic focus indicator hai. Native `outline` ke ulat, ek ring border-radius correctly follow karti hai aur offset aur colour utilities support karti hai. Focus states ke liye `ring` use karo, `border` tab jab line visual design ka hissa ho aur tumne layout mein uski width consider kar li ho.',
    },
  },
  {
    question: 'How do you handle accessibility when using Tailwind?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Tailwind styles appearance and does nothing for semantics, so accessibility remains entirely your responsibility: use real semantic elements rather than styled divs, keep visible FOCUS indicators (never remove them without a replacement — `focus-visible:ring-2` is the idiomatic pattern), verify colour CONTRAST since the default palette does not guarantee it for every combination, use `sr-only` for screen-reader-only text, and respect `motion-reduce:` for users who have requested reduced motion.',
      hinglish:
        'Tailwind appearance style karta hai aur semantics ke liye kuch nahi karta, isliye accessibility poori tarah tumhari zimmedari rehti hai: styled divs ke bajaye real semantic elements use karo, visible FOCUS indicators rakho (unhe kabhi bina replacement ke mat hatao — `focus-visible:ring-2` idiomatic pattern hai), colour CONTRAST verify karo kyunki default palette har combination ke liye ise guarantee nahi karta, screen-reader-only text ke liye `sr-only` use karo, aur un users ke liye `motion-reduce:` respect karo jinhone reduced motion request kiya hai.',
    },
  },
  {
    question: 'What are Tailwind plugins and which official ones exist?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Plugins extend Tailwind with new utilities, components, or variants via the plugin API. Official ones: `@tailwindcss/forms` for sensible cross-browser form-element defaults; `@tailwindcss/typography`, which provides the `prose` class to style rich HTML you do not control, such as Markdown or CMS output; `@tailwindcss/aspect-ratio` (largely superseded by native support); and `@tailwindcss/container-queries`. Writing a custom plugin is the right approach when you need a genuinely new utility family rather than a one-off class.',
      hinglish:
        'Plugins plugin API ke through Tailwind ko nayi utilities, components, ya variants se extend karte hain. Official wale: `@tailwindcss/forms` sensible cross-browser form-element defaults ke liye; `@tailwindcss/typography`, jo `prose` class deta hai us rich HTML ko style karne ke liye jo tumhare control mein nahi, jaise Markdown ya CMS output; `@tailwindcss/aspect-ratio` (largely native support se superseded); aur `@tailwindcss/container-queries`. Ek custom plugin likhna tab sahi approach hai jab tumhe ek one-off class ke bajaye ek genuinely nayi utility family chahiye.',
    },
  },
  {
    question: 'What is the prose class from the typography plugin?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Tailwind\'s preflight removes all default styling from headings, lists, and paragraphs, which is ideal for building UI but leaves rendered Markdown or CMS content completely unstyled. The `prose` class from `@tailwindcss/typography` applies sensible typographic defaults to that entire subtree in one go. It supports size and colour modifiers (`prose-lg`, `prose-invert` for dark mode) and per-element overrides. It is specifically the answer for content you did not author and cannot add classes to.',
      hinglish:
        'Tailwind ka preflight headings, lists, aur paragraphs se saari default styling hata deta hai, jo UI banane ke liye ideal hai par rendered Markdown ya CMS content ko poori tarah unstyled chhod deta hai. `@tailwindcss/typography` ki `prose` class ek hi baar mein us poore subtree pe sensible typographic defaults apply karti hai. Ye size aur colour modifiers (`prose-lg`, dark mode ke liye `prose-invert`) aur per-element overrides support karti hai. Ye specifically us content ka jawab hai jo tumne nahi likha aur jisme classes add nahi kar sakte.',
    },
  },
  {
    question: 'What is Tailwind\'s preflight?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Preflight is Tailwind\'s built-in base reset, built on modern-normalize. It removes default margins, unstyles headings and lists, makes images block-level and constrained, and sets `border-style: solid` so border-width utilities work as expected. The rationale is that it eliminates surprises from inconsistent browser defaults. The consequence to remember is that plain HTML looks completely unstyled by default — which is why third-party or Markdown content needs the `prose` class.',
      hinglish:
        'Preflight Tailwind ka built-in base reset hai, modern-normalize pe bana. Ye default margins hataata hai, headings aur lists ko unstyle karta hai, images ko block-level aur constrained banata hai, aur `border-style: solid` set karta hai taaki border-width utilities expected tarah kaam karein. Rationale ye hai ki ye inconsistent browser defaults se surprises khatam karta hai. Yaad rakhne wala consequence ye hai ki plain HTML default se poori tarah unstyled dikhta hai — isiliye third-party ya Markdown content ko `prose` class chahiye.',
    },
  },
  {
    question: 'How do you conditionally apply classes in a React component?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Use a small helper such as `clsx` or `classnames` to compose class strings from conditions, rather than string concatenation with template literals. Crucially, always write COMPLETE class names in each branch so Tailwind\'s scanner can find them. For component variants, `tailwind-merge` resolves conflicting utilities correctly (so a `className` prop can override a default padding), and `cva` (class-variance-authority) is the common pattern for typed variant APIs on design-system components.',
      hinglish:
        'Ek chhota helper jaise `clsx` ya `classnames` use karke conditions se class strings compose karo, template literals se string concatenation ke bajaye. Crucially, har branch mein hamesha COMPLETE class names likho taaki Tailwind ka scanner unhe dhundh sake. Component variants ke liye, `tailwind-merge` conflicting utilities correctly resolve karta hai (taaki ek `className` prop ek default padding override kar sake), aur `cva` (class-variance-authority) design-system components pe typed variant APIs ke liye common pattern hai.',
    },
  },
  {
    question: 'What changed in Tailwind CSS v4?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'v4 moves configuration from `tailwind.config.js` into CSS itself using `@theme` and native CSS custom properties, so design tokens are available at runtime. It replaces the PostCSS-plugin setup with a single `@import "tailwindcss"`, uses a new Rust-based engine that is dramatically faster, detects content sources automatically instead of requiring manual `content` globs, and adopts modern CSS features such as cascade layers and container queries natively. The overall direction is less JavaScript configuration and more standard CSS.',
      hinglish:
        'v4 configuration ko `tailwind.config.js` se CSS mein hi le jaata hai `@theme` aur native CSS custom properties use karke, isliye design tokens runtime pe available hain. Ye PostCSS-plugin setup ko ek single `@import "tailwindcss"` se replace karta hai, ek naya Rust-based engine use karta hai jo dramatically faster hai, manual `content` globs chahne ke bajaye content sources automatically detect karta hai, aur cascade layers aur container queries jaise modern CSS features natively apnaata hai. Overall direction kam JavaScript configuration aur zyada standard CSS hai.',
    },
  },
  {
    question: 'What are container queries and how does Tailwind support them?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Media queries respond to the VIEWPORT, but a reusable component often needs to respond to the width of ITS OWN CONTAINER — the same card should stack in a narrow sidebar and sit horizontally in a wide main area, regardless of screen size. Container queries solve this: mark an element `@container`, then use `@sm:`, `@md:` variants on descendants. It makes components genuinely self-contained, which media queries alone can never achieve since they know nothing about where a component is placed.',
      hinglish:
        'Media queries VIEWPORT pe respond karti hain, par ek reusable component ko aksar APNE KHUD KE CONTAINER ki width pe respond karna hota hai — wahi card ek narrow sidebar mein stack hona chahiye aur ek wide main area mein horizontally baithna chahiye, screen size chahe kuch bhi ho. Container queries ise solve karti hain: ek element ko `@container` mark karo, phir descendants pe `@sm:`, `@md:` variants use karo. Ye components ko genuinely self-contained banata hai, jo akeli media queries kabhi achieve nahi kar sakti kyunki unhe pata hi nahi ki ek component kahan rakha hai.',
    },
  },
  {
    question: 'How do you decide between Tailwind and CSS-in-JS or CSS Modules?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'TAILWIND excels when you want a consistent design system, fast iteration, and no growing stylesheet — its cost is verbose markup. CSS MODULES suit teams who prefer writing real CSS with local scoping and no runtime, and are a natural fit when you already have substantial CSS expertise or legacy styles. CSS-IN-JS offers truly dynamic runtime styling from props, at a runtime cost and with server-rendering complexity. There is no universally right answer; consistency within a codebase matters more than the specific choice.',
      hinglish:
        'TAILWIND tab excel karta hai jab tumhe ek consistent design system, fast iteration, aur badhti stylesheet nahi chahiye — iski cost verbose markup hai. CSS MODULES un teams ko suit karte hain jo local scoping aur bina runtime ke real CSS likhna prefer karti hain, aur tab natural fit hain jab tumhare paas already substantial CSS expertise ya legacy styles hon. CSS-IN-JS props se truly dynamic runtime styling deta hai, ek runtime cost aur server-rendering complexity ke saath. Koi universally sahi jawab nahi hai; ek codebase ke andar consistency specific choice se zyada matter karti hai.',
    },
  },
  {
    question: 'How do you center an element with Tailwind?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Horizontally for a block element with a set width: `mx-auto`. Both axes with flexbox: `flex items-center justify-center` on the parent. Both axes with grid: `grid place-items-center`, which is the most concise. For text: `text-center`. For a fixed overlay or modal: `fixed inset-0 flex items-center justify-center`. Remember `items-*` is the cross axis and `justify-*` the main axis, so they swap meaning when you add `flex-col`.',
      hinglish:
        'Ek set width wale block element ke liye horizontally: `mx-auto`. Flexbox se dono axes: parent pe `flex items-center justify-center`. Grid se dono axes: `grid place-items-center`, jo sabse concise hai. Text ke liye: `text-center`. Ek fixed overlay ya modal ke liye: `fixed inset-0 flex items-center justify-center`. Yaad rakho `items-*` cross axis hai aur `justify-*` main axis, isliye `flex-col` add karne pe unka matlab badal jaata hai.',
    },
  },
  {
    question: 'What is the difference between hidden, invisible, and opacity-0?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`hidden` sets `display: none` — the element is removed from layout entirely, takes no space, and is not announced by screen readers. `invisible` sets `visibility: hidden` — it still occupies its space but is not visible or interactive. `opacity-0` makes it fully transparent while remaining in layout AND still clickable, which is a classic accessibility bug if used to hide something. For transitions use `opacity-0` (it animates), for genuinely removing content use `hidden`.',
      hinglish:
        '`hidden` `display: none` set karta hai — element layout se poori tarah hat jaata hai, koi space nahi leta, aur screen readers use announce nahi karte. `invisible` `visibility: hidden` set karta hai — ye abhi bhi apna space leta hai par visible ya interactive nahi. `opacity-0` use fully transparent banata hai jabki layout mein rehta hai AUR abhi bhi clickable hai, jo ek classic accessibility bug hai agar kuch chhupane ke liye use ho. Transitions ke liye `opacity-0` use karo (ye animate hota hai), genuinely content hataane ke liye `hidden`.',
    },
  },
  {
    question: 'How do you handle hover states on touch devices?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Touch devices have no true hover, and many browsers emulate a "sticky" hover after a tap, leaving an element stuck in its hover state. Tailwind ships the `hover` variant configured to apply only where hover is genuinely supported (via `@media (hover: hover)`) in recent versions. The practical rule is never to put essential information or interaction behind hover alone — always provide a tap or focus path, since a keyboard or touch user must be able to reach the same functionality.',
      hinglish:
        'Touch devices mein koi true hover nahi hota, aur bahut browsers ek tap ke baad ek "sticky" hover emulate karte hain, element ko uski hover state mein atka chhod kar. Tailwind recent versions mein `hover` variant aise configured deta hai ki wo sirf wahan apply ho jahan hover genuinely supported hai (`@media (hover: hover)` se). Practical rule ye hai ki essential information ya interaction ko kabhi akele hover ke peeche mat rakho — hamesha ek tap ya focus path do, kyunki ek keyboard ya touch user ko wahi functionality tak pahunchna hi chahiye.',
    },
  },
  {
    question: 'What are transition and animation utilities in Tailwind?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`transition` (with variants like `transition-colors` or `transition-transform`) enables smooth interpolation, tuned with `duration-300`, `ease-in-out`, and `delay-*`. Transitioning specific properties rather than `transition-all` is meaningfully better for performance. Built-in animations: `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce` — `animate-pulse` is the standard skeleton loader. For accessibility, pair with `motion-reduce:transition-none` so users who requested reduced motion are respected.',
      hinglish:
        '`transition` (`transition-colors` ya `transition-transform` jaise variants ke saath) smooth interpolation enable karta hai, `duration-300`, `ease-in-out`, aur `delay-*` se tuned. `transition-all` ke bajaye specific properties transition karna performance ke liye meaningfully better hai. Built-in animations: `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce` — `animate-pulse` standard skeleton loader hai. Accessibility ke liye, `motion-reduce:transition-none` ke saath jodo taaki reduced motion request karne wale users ka respect ho.',
    },
  },
  {
    question: 'How do you extend Tailwind with custom colors?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'In v3, add them under `theme.extend.colors` in the config, ideally as a nested object with numeric shades (`brand: { 50: ..., 500: ..., 900: ... }`) so they behave exactly like built-in colours across every utility and variant. Using `extend` is important — defining `colors` directly under `theme` replaces the entire default palette. In v4 you define them as CSS custom properties inside `@theme`, which additionally makes them available at runtime.',
      hinglish:
        'v3 mein, unhe config mein `theme.extend.colors` ke neeche add karo, ideally numeric shades wale ek nested object ke roop mein (`brand: { 50: ..., 500: ..., 900: ... }`) taaki wo har utility aur variant ke across exactly built-in colours ki tarah behave karein. `extend` use karna important hai — `colors` ko directly `theme` ke neeche define karna poori default palette replace kar deta hai. v4 mein tum unhe `@theme` ke andar CSS custom properties ke roop mein define karte ho, jo unhe additionally runtime pe available karta hai.',
    },
  },
  {
    question: 'What is the aspect-ratio utility used for?',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        '`aspect-video` (16:9), `aspect-square`, or `aspect-[4/3]` lock an element\'s height to a ratio of its width. The main practical value is preventing CUMULATIVE LAYOUT SHIFT: the browser reserves the correct space before an image or embedded video loads, so content below does not jump. It is the modern replacement for the old padding-bottom percentage hack, and matters directly for Core Web Vitals scores.',
      hinglish:
        '`aspect-video` (16:9), `aspect-square`, ya `aspect-[4/3]` ek element ki height ko uski width ke ek ratio pe lock karte hain. Main practical value CUMULATIVE LAYOUT SHIFT rokna hai: browser ek image ya embedded video load hone se pehle correct space reserve karta hai, isliye neeche ka content uchhalta nahi. Ye purane padding-bottom percentage hack ka modern replacement hai, aur Core Web Vitals scores ke liye directly matter karta hai.',
    },
  },
  {
    question: 'How do you truncate or clamp text in Tailwind?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`truncate` limits text to a single line with an ellipsis (it combines overflow-hidden, text-ellipsis, and whitespace-nowrap). For multiple lines use `line-clamp-3`, which is now built into core rather than requiring a plugin. Both need the container to have a constrained width, which is the usual reason they appear not to work — inside a flex item you often also need `min-w-0`, since flex items default to a minimum size based on their content.',
      hinglish:
        '`truncate` text ko ek single line tak ek ellipsis ke saath limit karta hai (ye overflow-hidden, text-ellipsis, aur whitespace-nowrap combine karta hai). Multiple lines ke liye `line-clamp-3` use karo, jo ab ek plugin chahne ke bajaye core mein built-in hai. Dono ko container ki ek constrained width chahiye, jo usual wajah hai ki wo kaam na karte hue lagte hain — ek flex item ke andar tumhe aksar `min-w-0` bhi chahiye, kyunki flex items apne content ke basis pe ek minimum size default karte hain.',
    },
  },
  {
    question: 'What is the container class in Tailwind?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Tailwind\'s `container` behaves differently from Bootstrap\'s: it sets max-width to match the CURRENT breakpoint rather than a single fixed width, and it does NOT centre or pad by default. So you almost always write `container mx-auto px-4`. You can configure `center: true` and default padding in the theme to avoid repeating that. Many teams skip it entirely and use `max-w-7xl mx-auto px-4`, which is more explicit about the actual constraint.',
      hinglish:
        'Tailwind ka `container` Bootstrap se alag behave karta hai: ye max-width ko ek single fixed width ke bajaye CURRENT breakpoint se match karne ke liye set karta hai, aur ye default se centre ya pad NAHI karta. Isliye tum almost hamesha `container mx-auto px-4` likhte ho. Tum theme mein `center: true` aur default padding configure karke wo repeat karne se bach sakte ho. Bahut teams ise poori tarah skip karke `max-w-7xl mx-auto px-4` use karti hain, jo actual constraint ke baare mein zyada explicit hai.',
    },
  },
  {
    question: 'How do you build a sticky header with Tailwind?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`sticky top-0 z-50` on the header, plus a background colour — omitting the background is the classic bug, since content scrolls visibly underneath a transparent header. Sticky positioning also requires that no ancestor has `overflow: hidden` or `overflow: auto`, which silently breaks it and is the usual reason "sticky is not working". Add `backdrop-blur` for a frosted effect and `shadow-sm` to separate it from content below.',
      hinglish:
        'Header pe `sticky top-0 z-50`, plus ek background colour — background chhodna classic bug hai, kyunki ek transparent header ke neeche content visibly scroll karta hai. Sticky positioning ko ye bhi chahiye ki kisi ancestor pe `overflow: hidden` ya `overflow: auto` na ho, jo ise silently todta hai aur usual wajah hai "sticky kaam nahi kar raha". Ek frosted effect ke liye `backdrop-blur` aur neeche ke content se alag karne ke liye `shadow-sm` add karo.',
    },
  },
  {
    question: 'What is z-index handling like in Tailwind?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Tailwind provides a deliberately small scale — `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50` — which discourages the arbitrary `z-index: 99999` escalation that plagues large stylesheets. Arbitrary values are available when genuinely needed. The important thing to understand is STACKING CONTEXTS: a z-index only competes within its own context, and properties like `transform`, `opacity` below 1, and `filter` all create a new one — which is why a high z-index sometimes still appears behind something.',
      hinglish:
        'Tailwind ek deliberately chhota scale deta hai — `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50` — jo us arbitrary `z-index: 99999` escalation ko discourage karta hai jo bade stylesheets ko pareshan karta hai. Genuinely zaroorat pe arbitrary values available hain. Samajhne wali important cheez STACKING CONTEXTS hai: ek z-index sirf apne context ke andar compete karta hai, aur `transform`, 1 se kam `opacity`, aur `filter` jaisi properties sab ek naya banati hain — isiliye ek high z-index kabhi-kabhi phir bhi kisi cheez ke peeche dikhta hai.',
    },
  },
  {
    question: 'How do you handle images responsively with Tailwind?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Preflight already makes images `display: block` and `max-width: 100%`, so they never overflow their container. Add `w-full h-auto` for fluid scaling, or `object-cover` with a fixed height to fill a box while preserving aspect ratio and cropping the excess — `object-contain` fits the whole image instead, leaving empty space. Pair with `aspect-*` to reserve space before load and avoid layout shift, and `rounded-*` plus `overflow-hidden` on the wrapper for rounded corners.',
      hinglish:
        'Preflight already images ko `display: block` aur `max-width: 100%` banata hai, isliye wo kabhi apne container se bahar nahi jaati. Fluid scaling ke liye `w-full h-auto` add karo, ya ek fixed height ke saath `object-cover` ek box bharne ke liye jabki aspect ratio preserve karke extra crop karta hai — `object-contain` uske bajaye poori image fit karta hai, khaali space chhodte hue. Load se pehle space reserve karne aur layout shift avoid karne ke liye `aspect-*` ke saath jodo, aur rounded corners ke liye wrapper pe `rounded-*` plus `overflow-hidden`.',
    },
  },
  {
    question: 'What is the difference between w-full, w-screen, and w-auto?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`w-full` is `width: 100%` — full width of the PARENT container, which is what you want almost always. `w-screen` is `100vw` — the full VIEWPORT width regardless of the parent, which commonly causes horizontal scrollbars because `100vw` includes the scrollbar width itself. `w-auto` lets the element size to its content. The typical bug is reaching for `w-screen` intending "full width", when `w-full` on a properly structured parent is correct.',
      hinglish:
        '`w-full` `width: 100%` hai — PARENT container ki full width, jo almost hamesha wahi hai jo tum chahte ho. `w-screen` `100vw` hai — parent ki parwah kiye bina full VIEWPORT width, jo commonly horizontal scrollbars cause karta hai kyunki `100vw` mein scrollbar ki width bhi shamil hoti hai. `w-auto` element ko apne content ke hisaab se size karne deta hai. Typical bug "full width" ke iraade se `w-screen` uthana hai, jab ek properly structured parent pe `w-full` correct hai.',
    },
  },
  {
    question: 'How do you set up Tailwind in a project?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'In v3: install `tailwindcss postcss autoprefixer`, run `npx tailwindcss init -p` to generate config files, set the `content` globs to every file containing class names, and add the `@tailwind base/components/utilities` directives to your main CSS. In v4 this simplifies dramatically to installing the package and writing a single `@import "tailwindcss"`, with content detection automatic. Most frameworks (Next.js, Vite, Astro) also offer a first-party setup path.',
      hinglish:
        'v3 mein: `tailwindcss postcss autoprefixer` install karo, config files generate karne ke liye `npx tailwindcss init -p` chalao, `content` globs ko har us file pe set karo jisme class names hain, aur apni main CSS mein `@tailwind base/components/utilities` directives add karo. v4 mein ye dramatically simplify hokar package install karna aur ek single `@import "tailwindcss"` likhna reh jaata hai, content detection automatic hote hue. Zyadatar frameworks (Next.js, Vite, Astro) ek first-party setup path bhi dete hain.',
    },
  },
  {
    question: 'What is the content configuration and what breaks when it is wrong?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The `content` array tells Tailwind which files to scan for class names. If a path is missing, those classes are never generated — and the failure is silent and often only visible in production, since a dev server may have cached earlier output. Common mistakes: forgetting a components directory, omitting a file extension, or expecting classes inside `node_modules` to be picked up (they are excluded by default and must be added explicitly for a component library).',
      hinglish:
        '`content` array Tailwind ko batata hai ki class names ke liye kaunsi files scan karni hain. Agar ek path missing ho, wo classes kabhi generate hi nahi hoti — aur failure silent hai aur aksar sirf production mein dikhta hai, kyunki ek dev server ne pehle ka output cache kiya ho sakta hai. Common mistakes: ek components directory bhoolna, ek file extension chhodna, ya ye expect karna ki `node_modules` ke andar ki classes pick hongi (wo default se excluded hain aur ek component library ke liye explicitly add karni padti hain).',
    },
  },
  {
    question: 'How do you build a modal or dialog with Tailwind?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Structurally: a backdrop with `fixed inset-0 bg-black/50 z-40`, and the panel with `fixed inset-0 z-50 flex items-center justify-center p-4` wrapping a `bg-white rounded-lg max-w-md w-full` card. Tailwind handles appearance only — you must still add `overflow-hidden` on the body to stop background scroll, trap focus inside the dialog, close on Escape, and set the correct ARIA roles. Using the native `<dialog>` element or a headless library handles that behaviour for you.',
      hinglish:
        'Structurally: ek backdrop `fixed inset-0 bg-black/50 z-40` ke saath, aur panel `fixed inset-0 z-50 flex items-center justify-center p-4` ke saath ek `bg-white rounded-lg max-w-md w-full` card ko wrap karte hue. Tailwind sirf appearance handle karta hai — tumhe abhi bhi background scroll rokne ke liye body pe `overflow-hidden` add karna, dialog ke andar focus trap karna, Escape pe close karna, aur correct ARIA roles set karne padte hain. Native `<dialog>` element ya ek headless library wo behaviour tumhare liye handle kar deti hai.',
    },
  },
  {
    question: 'What are the data-* and aria-* variants?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'They style an element based on a data or ARIA attribute: `data-[state=open]:rotate-180` or `aria-expanded:bg-gray-100`. This matters because headless UI libraries (Radix, Headless UI) express component state through exactly these attributes, so you can style every state declaratively without any conditional class logic in JavaScript. Using `aria-*` variants also gently pushes you toward correct accessibility attributes, since the styling depends on them being present.',
      hinglish:
        'Ye ek element ko ek data ya ARIA attribute ke basis pe style karte hain: `data-[state=open]:rotate-180` ya `aria-expanded:bg-gray-100`. Ye isliye matter karta hai kyunki headless UI libraries (Radix, Headless UI) component state ko exactly in attributes se express karti hain, isliye tum har state ko declaratively style kar sakte ho bina JavaScript mein koi conditional class logic ke. `aria-*` variants use karna tumhe correct accessibility attributes ki taraf gently dhakelta bhi hai, kyunki styling unke maujood hone pe depend karti hai.',
    },
  },
  {
    question: 'How do you handle print styles in Tailwind?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'Use the `print:` variant, which maps to `@media print`. Typical usage: `print:hidden` on navigation, sidebars, and buttons; `print:block` to reveal content shown only on paper; `print:text-black print:bg-white` to avoid wasting ink on dark themes; and `print:break-after-page` to control pagination. It is easy to forget entirely, yet matters for invoices, reports, and tickets — anything a user is realistically going to print or save as PDF.',
      hinglish:
        '`print:` variant use karo, jo `@media print` pe map hota hai. Typical usage: navigation, sidebars, aur buttons pe `print:hidden`; sirf kaagaz pe dikhne wala content reveal karne ke liye `print:block`; dark themes pe ink waste na karne ke liye `print:text-black print:bg-white`; aur pagination control karne ke liye `print:break-after-page`. Ise poori tarah bhoolna easy hai, phir bhi ye invoices, reports, aur tickets ke liye matter karta hai — kuch bhi jise ek user realistically print ya PDF save karega.',
    },
  },
  {
    question: 'What are some common Tailwind performance considerations?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'The generated CSS is usually tiny, so most issues lie elsewhere. Keep `content` globs narrow, since overly broad patterns (scanning `node_modules`) slow builds significantly. Prefer transitioning specific properties over `transition-all`, and prefer animating `transform` and `opacity`, which the browser can composite on the GPU, over layout-triggering properties. Avoid huge numbers of arbitrary values, which each generate a unique rule. And note extremely long class strings add real HTML weight on content-heavy pages.',
      hinglish:
        'Generated CSS usually bahut chhoti hoti hai, isliye zyadatar issues kahin aur hote hain. `content` globs narrow rakho, kyunki overly broad patterns (`node_modules` scan karna) builds significantly slow karte hain. `transition-all` pe specific properties transition karna prefer karo, aur `transform` aur `opacity` animate karna prefer karo, jinhe browser GPU pe composite kar sakta hai, layout-triggering properties pe. Bahut saari arbitrary values avoid karo, jinme se har ek ek unique rule generate karti hai. Aur note karo ki extremely lambi class strings content-heavy pages pe real HTML weight add karti hain.',
    },
  },
  {
    question: 'How would you migrate an existing CSS codebase to Tailwind?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Migrate INCREMENTALLY rather than rewriting. Add Tailwind alongside the existing CSS, but disable `preflight` initially, since its aggressive reset will otherwise break every existing style at once. Use the `prefix` option if class names collide. Then convert component by component, starting with new work and the components you touch anyway, deleting the corresponding old CSS as each is migrated. Enable preflight only once the legacy stylesheet is small enough that the reset is safe.',
      hinglish:
        'Rewrite karne ke bajaye INCREMENTALLY migrate karo. Tailwind ko existing CSS ke saath add karo, par shuruaat mein `preflight` disable karo, kyunki uska aggressive reset warna har existing style ek saath tod dega. Agar class names collide karein to `prefix` option use karo. Phir component by component convert karo, naye kaam aur un components se shuru karke jinhe tum waise bhi touch kar rahe ho, har ek migrate hone pe corresponding purani CSS delete karte hue. Preflight tab enable karo jab legacy stylesheet itni chhoti ho jaaye ki reset safe ho.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
