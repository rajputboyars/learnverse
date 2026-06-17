// CSS Core curriculum — beginner -> intermediate -> advanced.
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
  title: 'CSS',
  slug: 'css',
  description:
    'Web ko sundar banao — CSS basics se Flexbox, Grid, animations tak. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🎨',
  tags: ['css', 'frontend', 'web', 'styling'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 4,
};

const beginner = [
  {
    title: 'CSS Basics',
    level: 'beginner',
    description: 'CSS kya hai, syntax, aur page mein kaise jodte hain.',
    concepts: [
      {
        title: 'What is CSS',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'CSS (Cascading Style Sheets) is the language that styles HTML — colours, fonts, spacing, layout, and animations. HTML gives structure; CSS makes it look good. "Cascading" means styles can come from many sources and combine by a priority order.',
          hinglish:
            'CSS (Cascading Style Sheets) wo language hai jo HTML ko style karti hai — colours, fonts, spacing, layout, animations. HTML structure deta hai; CSS use sundar banata hai. "Cascading" ka matlab styles kai jagah se aa sakti hain aur ek priority order se combine hoti hain.',
        },
        dailyLifeExample:
          'HTML ghar ka dhaancha hai (deewar, darwaze). CSS paint, parde, furniture aur sajawat hai — ghar wahi rehta hai par dikhne mein zameen-aasmaan ka farq.',
        codeExample:
          'h1 {\n  color: indigo;\n  font-size: 32px;\n  text-align: center;\n}\n/* selector { property: value; } */',
        keyPoints: [
          'CSS styles HTML (look & feel)',
          'HTML = structure, CSS = presentation',
          'Cascading = styles combine by priority',
          'Rule = selector { property: value; }',
        ],
        quiz: [
          {
            question: 'What does CSS do?',
            options: ['Adds logic', 'Styles HTML', 'Stores data', 'Hosts the site'],
            correctIndex: 1,
          },
          {
            question: 'What does CSS stand for?',
            options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Styling Syntax'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'CSS Syntax & Selectors',
        difficulty: 'easy',
        tags: ['syntax', 'selectors'],
        explanation: {
          english:
            'A CSS rule has a selector (what to style) and a declaration block of property: value pairs. Basic selectors: element (p), class (.btn), id (#main), and the universal selector (*). Classes are the most reusable and most used.',
          hinglish:
            'Ek CSS rule mein selector hota hai (kya style karna hai) aur ek declaration block jisme property: value pairs hote hain. Basic selectors: element (p), class (.btn), id (#main), aur universal selector (*). Classes sabse reusable aur sabse zyada use hoti hain.',
        },
        dailyLifeExample:
          'Selector ek pata (address) jaisa hai — kis ghar (element) tak paint pahunchana hai. Class "saari neeli gaadiyan" jaisa group address hai, id "sirf ghar number 7" jaisa unique address.',
        codeExample:
          'p { color: gray; }          /* all <p> */\n.btn { padding: 10px; }     /* class="btn" */\n#main { width: 100%; }      /* id="main" */\n* { box-sizing: border-box; } /* everything */',
        keyPoints: [
          'Rule = selector + { property: value; }',
          'element (p), class (.x), id (#x), universal (*)',
          'Classes are reusable; ids are unique',
          'End each declaration with a semicolon',
        ],
        quiz: [
          {
            question: 'Which symbol selects a class?',
            options: ['#', '.', '*', '@'],
            correctIndex: 1,
          },
          {
            question: 'Which selector targets an id?',
            options: ['.id', '#id', 'id', '*id'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Ways to Add CSS',
        difficulty: 'easy',
        tags: ['basics'],
        explanation: {
          english:
            'There are three ways to apply CSS: inline (style="" on an element), internal (a <style> block in the head), and external (a separate .css file linked with <link>). External CSS is best — it keeps style separate and is cached and reusable across pages.',
          hinglish:
            'CSS lagane ke teen tareeke hain: inline (element pe style=""), internal (head mein <style> block), aur external (alag .css file jo <link> se jodi jaaye). External CSS best hai — style alag rehti hai, cache hoti hai aur kai pages pe reuse hoti hai.',
        },
        dailyLifeExample:
          'Inline = har deewar pe alag se paint karna (mehnat zyada). External = ek paint guide banake poore ghar pe apply — ek jagah change karo, sab badal jaaye.',
        codeExample:
          '<!-- inline -->\n<p style="color:red">Hi</p>\n\n<!-- internal -->\n<style> p { color: red; } </style>\n\n<!-- external (best) -->\n<link rel="stylesheet" href="style.css" />',
        keyPoints: [
          'inline, internal, external',
          'External (.css + <link>) is best practice',
          'External is cached & reusable',
          'Inline has highest priority but is hard to maintain',
        ],
        quiz: [
          {
            question: 'Which way of adding CSS is best for maintainability?',
            options: ['inline', 'internal', 'external', 'all equal'],
            correctIndex: 2,
          },
          {
            question: 'Inline CSS is written using which attribute?',
            options: ['css', 'style', 'class', 'design'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Colors & Units',
        difficulty: 'easy',
        tags: ['colors', 'units'],
        explanation: {
          english:
            'Colours can be named (red), hex (#ff0000), rgb/rgba (with transparency), or hsl. Units are absolute (px) or relative (%, em, rem, vw, vh). Relative units adapt to screen/font size and are key for responsive design.',
          hinglish:
            'Colours named ho sakte hain (red), hex (#ff0000), rgb/rgba (transparency ke saath), ya hsl. Units absolute (px) ya relative (%, em, rem, vw, vh) hoti hain. Relative units screen/font size ke hisaab se adjust hoti hain aur responsive design ke liye zaroori hain.',
        },
        dailyLifeExample:
          'px ek fixed ruler jaisa hai (hamesha utna hi). rem/em rubber band jaisa hai jo base size ke hisaab se stretch hota hai — isliye different screens pe achha dikhta hai.',
        codeExample:
          'color: #4f46e5;\nbackground: rgba(0, 0, 0, 0.5); /* 50% transparent */\nfont-size: 1.5rem;   /* relative to root */\nwidth: 80%;          /* of parent */\nheight: 100vh;       /* full viewport height */',
        keyPoints: [
          'Colors: name, hex, rgb/rgba, hsl',
          'rgba/hsla add transparency (alpha)',
          'px = absolute; %, em, rem, vw, vh = relative',
          'rem scales with the root font size',
        ],
        quiz: [
          {
            question: 'Which adds transparency to a color?',
            options: ['hex', 'rgba', 'named', 'px'],
            correctIndex: 1,
          },
          {
            question: '1rem is relative to…',
            options: ['the parent', 'the root font size', 'the screen width', 'pixels'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Box Model & Styling',
    level: 'beginner',
    description: 'Har element ek dabba — box model, text, backgrounds.',
    concepts: [
      {
        title: 'The Box Model',
        difficulty: 'medium',
        tags: ['box-model', 'layout'],
        explanation: {
          english:
            'Every element is a box with four layers: content, padding (space inside, around content), border, and margin (space outside, between elements). Total width = content + padding + border, unless you set box-sizing: border-box, which makes width include padding and border.',
          hinglish:
            'Har element ek dabba hai jiske chaar layers hain: content, padding (andar ki space, content ke aas-paas), border, aur margin (bahar ki space, elements ke beech). Total width = content + padding + border, jab tak box-sizing: border-box na lagao, jo width mein padding aur border ko shaamil kar leta hai.',
        },
        dailyLifeExample:
          'Box model ek gift parcel jaisa hai: content gift hai, padding andar ki bubble-wrap, border dabbe ki deewar, aur margin do parcels ke beech ki doori.',
        codeExample:
          '.box {\n  width: 200px;\n  padding: 20px;   /* inside */\n  border: 2px solid;\n  margin: 16px;    /* outside */\n  box-sizing: border-box; /* width includes padding+border */\n}',
        keyPoints: [
          'Layers: content → padding → border → margin',
          'padding = inside, margin = outside',
          'border-box makes width include padding & border',
          'margin collapses between vertical elements',
        ],
        quiz: [
          {
            question: 'Which is the space OUTSIDE the border?',
            options: ['padding', 'margin', 'content', 'border'],
            correctIndex: 1,
          },
          {
            question: 'box-sizing: border-box makes width include…',
            options: ['Only content', 'Content + padding + border', 'Margin too', 'Nothing'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the CSS box model.',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Every element is a rectangular box made of four layers from inside out: content, padding, border, and margin. By default width/height apply to the content only, so the rendered size is content + padding + border. Setting box-sizing: border-box makes width/height include padding and border, which makes layouts far more predictable.',
              hinglish:
                'Har element ek rectangular box hai jiske andar se bahar chaar layers hain: content, padding, border, margin. By default width/height sirf content pe lagti hai, isliye rendered size content + padding + border hota hai. box-sizing: border-box lagane se width/height padding aur border ko include kar leti hai, jisse layouts kaafi predictable ho jaate hain.',
            },
          },
        ],
      },
      {
        title: 'Typography',
        difficulty: 'easy',
        tags: ['text', 'fonts'],
        explanation: {
          english:
            'Typography properties control text: font-family (typeface), font-size, font-weight (boldness), line-height (spacing between lines), letter-spacing, text-align, and text-transform. Good typography hugely affects readability.',
          hinglish:
            'Typography properties text ko control karti hain: font-family (typeface), font-size, font-weight (motai), line-height (lines ke beech spacing), letter-spacing, text-align, aur text-transform. Achhi typography readability pe bahut farq daalti hai.',
        },
        dailyLifeExample:
          'Typography ek newspaper ke layout jaisa hai — sahi font aur spacing se padhna aasaan, ganda spacing se aankhein thak jaati hain.',
        codeExample:
          'p {\n  font-family: system-ui, sans-serif;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 1.6;\n  letter-spacing: 0.2px;\n  text-align: justify;\n}',
        keyPoints: [
          'font-family, font-size, font-weight',
          'line-height controls readability',
          'text-align, text-transform, letter-spacing',
          'Use a font stack for fallbacks',
        ],
        quiz: [
          {
            question: 'Which property controls the space between lines?',
            options: ['letter-spacing', 'line-height', 'font-size', 'margin'],
            correctIndex: 1,
          },
          {
            question: 'font-weight controls…',
            options: ['Size', 'Boldness', 'Color', 'Alignment'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Selectors & The Cascade',
    level: 'beginner',
    description: 'Advanced selectors, specificity aur inheritance.',
    concepts: [
      {
        title: 'Specificity & The Cascade',
        difficulty: 'medium',
        tags: ['specificity', 'cascade'],
        explanation: {
          english:
            'When multiple rules target the same element, the cascade decides the winner using specificity: inline (highest) > id > class/attribute/pseudo-class > element. If specificity ties, the later rule wins. !important overrides all but should be avoided.',
          hinglish:
            'Jab kai rules ek hi element pe lagein, cascade specificity se winner decide karta hai: inline (sabse zyada) > id > class/attribute/pseudo-class > element. Specificity barabar ho to baad wala rule jeet ta hai. !important sabko override karta hai par ise avoid karna chahiye.',
        },
        dailyLifeExample:
          'Specificity office hierarchy jaisi hai — CEO (inline/id) ka order manager (class) aur employee (element) se upar. Agar same level ke do log bolein, jo baad mein bola wo chalega.',
        codeExample:
          'p { color: black; }        /* specificity 0,0,1 */\n.text { color: blue; }     /* 0,1,0 — wins over p */\n#hero { color: green; }    /* 1,0,0 — wins over class */\n/* inline style="" beats all of these */',
        keyPoints: [
          'Order: inline > id > class > element',
          'Equal specificity → later rule wins',
          '!important overrides — avoid it',
          'Keep specificity low for maintainability',
        ],
        quiz: [
          {
            question: 'Which has the highest specificity?',
            options: ['element', 'class', 'id', 'inline style'],
            correctIndex: 3,
          },
          {
            question: 'If two rules have equal specificity, which wins?',
            options: ['The first', 'The later one', 'Neither', 'Random'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How does CSS specificity work?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Specificity ranks selectors to decide which rule applies. It is calculated as (inline, id, class/attribute/pseudo-class, element). Higher categories always beat lower ones, e.g. one id beats any number of classes. Ties are broken by source order (last wins). !important overrides normal specificity and should be a last resort.',
              hinglish:
                'Specificity selectors ko rank karti hai ki kaunsa rule lagega. Ye (inline, id, class/attribute/pseudo-class, element) ki tarah calculate hoti hai. Upar wali category hamesha neeche wali ko harati hai, jaise ek id kitni bhi classes se jeet jaati hai. Tie hone par source order (last wins). !important normal specificity ko override karta hai aur last resort hona chahiye.',
            },
          },
        ],
      },
      {
        title: 'Pseudo-classes & Pseudo-elements',
        difficulty: 'medium',
        tags: ['selectors', 'pseudo'],
        explanation: {
          english:
            'Pseudo-classes style an element in a particular state (:hover, :focus, :first-child, :nth-child). Pseudo-elements style a specific part or insert content (::before, ::after, ::first-line). They let you style interactions and decorations without extra HTML.',
          hinglish:
            'Pseudo-classes element ko ek particular state mein style karti hain (:hover, :focus, :first-child, :nth-child). Pseudo-elements ek specific part style karti hain ya content insert karti hain (::before, ::after, ::first-line). Inse interactions aur decorations bina extra HTML ke style hote hain.',
        },
        dailyLifeExample:
          ':hover ek darwaze ki bell jaisa hai — sirf jab tum chhuo (hover) tab react kare. ::before ek naam ke aage laga "Mr." prefix jaisa hai jo CSS khud jod deta hai.',
        codeExample:
          'a:hover { color: red; }          /* on mouse over */\ninput:focus { outline: 2px solid; }\nli:first-child { font-weight: bold; }\n.badge::before { content: "★ "; }   /* inserts content */',
        keyPoints: [
          'Pseudo-class = state (:hover, :focus, :nth-child)',
          'Pseudo-element = part/insert (::before, ::after)',
          'Single colon for classes, double for elements',
          'content is required for ::before/::after',
        ],
        quiz: [
          {
            question: 'Which targets an element on mouse over?',
            options: [':focus', ':hover', '::before', ':first-child'],
            correctIndex: 1,
          },
          {
            question: '::before and ::after require which property to show?',
            options: ['display', 'content', 'visibility', 'position'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Layout',
    level: 'intermediate',
    description: 'Elements ko arrange karna — display, position, Flexbox, Grid.',
    concepts: [
      {
        title: 'Display & Position',
        difficulty: 'medium',
        tags: ['layout', 'position'],
        explanation: {
          english:
            'display controls how an element renders: block, inline, inline-block, flex, grid, or none (hidden). position controls placement: static (default), relative (offset from itself), absolute (relative to nearest positioned ancestor), fixed (relative to viewport), and sticky (toggles between relative and fixed on scroll).',
          hinglish:
            'display control karta hai element kaise render hoga: block, inline, inline-block, flex, grid, ya none (hidden). position placement control karta hai: static (default), relative (apne se offset), absolute (nearest positioned ancestor se), fixed (viewport se), aur sticky (scroll pe relative aur fixed ke beech switch).',
        },
        dailyLifeExample:
          'position: fixed ek deewar pe tangi ghadi jaisa hai — page scroll karo, ghadi wahin lagi rehti hai. sticky wo header jaisa hai jo scroll karte hi upar chipak jaata hai.',
        codeExample:
          '.hidden { display: none; }\n.box { position: relative; top: 10px; }\n.modal { position: fixed; inset: 0; }\n.navbar { position: sticky; top: 0; }',
        keyPoints: [
          'display: block/inline/flex/grid/none',
          'position: static/relative/absolute/fixed/sticky',
          'absolute is relative to nearest positioned ancestor',
          'fixed sticks to the viewport; sticky to scroll',
        ],
        quiz: [
          {
            question: 'Which position keeps an element fixed to the viewport on scroll?',
            options: ['relative', 'absolute', 'fixed', 'static'],
            correctIndex: 2,
          },
          {
            question: 'display: none does what?',
            options: ['Hides + removes from layout', 'Makes transparent', 'Greys out', 'Nothing'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Flexbox',
        difficulty: 'medium',
        tags: ['flexbox', 'layout'],
        explanation: {
          english:
            'Flexbox is a 1-dimensional layout system (a row OR a column). Set display: flex on a container, then control children with justify-content (main axis), align-items (cross axis), gap, and flex-wrap. Perfect for navbars, cards, and centering.',
          hinglish:
            'Flexbox ek 1-dimensional layout system hai (ek row YA column). Container pe display: flex lagao, phir children ko justify-content (main axis), align-items (cross axis), gap, aur flex-wrap se control karo. Navbars, cards, aur centering ke liye perfect.',
        },
        dailyLifeExample:
          'Flexbox ek shelf jaisa hai jisme cheezein ek line mein lagti hain — tum decide karte ho beech mein rakhni hain, kinare, ya barabar gap ke saath.',
        codeExample:
          '.container {\n  display: flex;\n  justify-content: center; /* main axis */\n  align-items: center;     /* cross axis */\n  gap: 16px;\n  flex-wrap: wrap;\n}',
        keyPoints: [
          'One-dimensional: row or column',
          'justify-content = main axis alignment',
          'align-items = cross axis alignment',
          'gap and flex-wrap for spacing & wrapping',
        ],
        quiz: [
          {
            question: 'Flexbox is best described as…',
            options: ['2D layout', '1D layout (row or column)', 'A color system', 'An animation'],
            correctIndex: 1,
          },
          {
            question: 'Which centers items along the main axis?',
            options: ['align-items', 'justify-content', 'gap', 'order'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you use Flexbox vs Grid?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Use Flexbox for one-dimensional layouts — content laid out in a single row or column (navbars, button groups, centering). Use Grid for two-dimensional layouts where you control rows and columns together (page layouts, image galleries, dashboards). They also work well together: Grid for the overall page, Flexbox inside components.',
              hinglish:
                'Flexbox one-dimensional layouts ke liye — ek row ya column mein content (navbars, button groups, centering). Grid two-dimensional layouts ke liye jaha rows aur columns dono ek saath control karne hon (page layouts, image galleries, dashboards). Dono saath bhi achhe chalte hain: poore page ke liye Grid, components ke andar Flexbox.',
            },
          },
        ],
      },
      {
        title: 'CSS Grid',
        difficulty: 'hard',
        tags: ['grid', 'layout'],
        explanation: {
          english:
            'CSS Grid is a 2-dimensional layout system controlling rows and columns at once. Set display: grid, define tracks with grid-template-columns/rows (fr units, repeat(), minmax()), and use gap for spacing. Ideal for full page layouts and complex grids.',
          hinglish:
            'CSS Grid ek 2-dimensional layout system hai jo rows aur columns dono ek saath control karta hai. display: grid lagao, grid-template-columns/rows se tracks define karo (fr units, repeat(), minmax()), aur spacing ke liye gap. Full page layouts aur complex grids ke liye ideal.',
        },
        dailyLifeExample:
          'Grid ek chess board ya Excel sheet jaisa hai — rows aur columns dono. Tum kisi bhi cell mein cheez rakh sakte ho, exact position ke saath.',
        codeExample:
          '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr); /* 3 equal cols */\n  gap: 16px;\n}\n.featured { grid-column: span 2; } /* span 2 columns */',
        keyPoints: [
          'Two-dimensional: rows AND columns',
          'fr unit = fraction of free space',
          'repeat(), minmax(), auto-fit for responsive grids',
          'gap controls spacing between cells',
        ],
        quiz: [
          {
            question: 'CSS Grid is…',
            options: ['1D layout', '2D layout (rows & columns)', 'A font tool', 'A pseudo-class'],
            correctIndex: 1,
          },
          {
            question: 'What does the fr unit represent?',
            options: ['Fixed pixels', 'A fraction of free space', 'Font ratio', 'Frames'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Responsive Design',
    level: 'intermediate',
    description: 'Har screen pe achha dikhna — media queries, mobile-first.',
    concepts: [
      {
        title: 'Media Queries',
        difficulty: 'medium',
        tags: ['responsive', 'media-queries'],
        explanation: {
          english:
            'Media queries apply CSS only when conditions match — usually screen width. @media (min-width: 768px) { ... } applies styles from 768px up. They are the core of responsive design, letting one page adapt across phones, tablets, and desktops.',
          hinglish:
            'Media queries CSS tabhi apply karti hain jab conditions match karein — aksar screen width. @media (min-width: 768px) { ... } 768px se upar styles lagati hai. Ye responsive design ka core hain, ek hi page ko phones, tablets, desktops sab pe adapt karne dete hain.',
        },
        dailyLifeExample:
          'Media query ek smart AC jaisa hai jo temperature (screen size) ke hisaab se setting badal deta hai — garmi mein zyada cooling, sardi mein kam.',
        codeExample:
          '.card { width: 100%; }\n\n@media (min-width: 768px) {\n  .card { width: 50%; }   /* tablets+ */\n}\n@media (min-width: 1024px) {\n  .card { width: 33%; }   /* desktops */\n}',
        keyPoints: [
          'Apply CSS based on conditions (usually width)',
          'min-width = mobile-first, max-width = desktop-first',
          'Core of responsive design',
          'Common breakpoints: 640/768/1024/1280px',
        ],
        quiz: [
          {
            question: 'What do media queries respond to most commonly?',
            options: ['Mouse clicks', 'Screen/viewport width', 'Page load', 'Colors'],
            correctIndex: 1,
          },
          {
            question: '@media (min-width: 768px) applies styles…',
            options: ['Below 768px', 'At 768px and above', 'Only at exactly 768px', 'Never'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Mobile-First Approach',
        difficulty: 'medium',
        tags: ['responsive', 'best-practices'],
        explanation: {
          english:
            'Mobile-first means writing base styles for small screens, then adding min-width media queries to enhance for larger screens. It keeps CSS simpler, improves performance on phones (most users), and matches how most modern frameworks (including Tailwind) work.',
          hinglish:
            'Mobile-first ka matlab pehle chhoti screens ke liye base styles likhna, phir badi screens ke liye min-width media queries se enhance karna. Isse CSS simple rehti hai, phones pe performance behtar (jahan zyadatar users hain), aur ye modern frameworks (Tailwind samet) ke tarike se match karta hai.',
        },
        dailyLifeExample:
          'Mobile-first ek chhoti tiffin se shuru karke zaroorat pe dabbe jodne jaisa hai — base zaroorat pehle, extra baad mein. Ulta (bade se chhota) karna zyada mushkil hota hai.',
        codeExample:
          '/* base = mobile */\n.nav { flex-direction: column; }\n\n/* enhance for larger screens */\n@media (min-width: 768px) {\n  .nav { flex-direction: row; }\n}',
        keyPoints: [
          'Write base styles for mobile first',
          'Use min-width to scale up',
          'Better performance for phone users',
          'Matches Tailwind & modern frameworks',
        ],
        quiz: [
          {
            question: 'Mobile-first means base styles target…',
            options: ['Desktops', 'Small screens', 'Printers', 'Tablets only'],
            correctIndex: 1,
          },
          {
            question: 'Mobile-first uses which media query type to scale up?',
            options: ['max-width', 'min-width', 'orientation', 'hover'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Transitions & Animations',
    level: 'advanced',
    description: 'Movement aur life — transitions, transforms, keyframes.',
    concepts: [
      {
        title: 'Transitions & Transforms',
        difficulty: 'medium',
        tags: ['transitions', 'transforms'],
        explanation: {
          english:
            'transition smoothly animates a property change over time (e.g. on hover). transform moves, scales, rotates, or skews an element without affecting layout — translate(), scale(), rotate(). Together they create smooth, performant interactions.',
          hinglish:
            'transition kisi property ke change ko time ke saath smoothly animate karta hai (jaise hover pe). transform element ko move, scale, rotate, ya skew karta hai bina layout ko affect kiye — translate(), scale(), rotate(). Dono milke smooth, performant interactions banate hain.',
        },
        dailyLifeExample:
          'transition ek automatic darwaze jaisa hai jo dheere se khulta hai, jhatke se nahi. transform ek photo ko ghuma/zoom karne jaisa hai bina baaki page ko hilaye.',
        codeExample:
          '.btn {\n  transition: transform 0.2s ease, background 0.2s;\n}\n.btn:hover {\n  transform: scale(1.05) rotate(-2deg);\n  background: indigo;\n}',
        keyPoints: [
          'transition animates property changes smoothly',
          'transform: translate/scale/rotate/skew',
          'transform does not affect document layout',
          'transform & opacity are GPU-accelerated (smooth)',
        ],
        quiz: [
          {
            question: 'Which property smoothly animates a change over time?',
            options: ['transform', 'transition', 'position', 'display'],
            correctIndex: 1,
          },
          {
            question: 'Which transform makes an element bigger?',
            options: ['translate()', 'scale()', 'rotate()', 'skew()'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Keyframe Animations',
        difficulty: 'hard',
        tags: ['animations', 'keyframes'],
        explanation: {
          english:
            'For multi-step animations, define stages with @keyframes (from/to or percentages), then attach them with the animation property (name, duration, timing, iteration-count, direction). Unlike transitions, keyframe animations can loop and run automatically without a trigger.',
          hinglish:
            'Multi-step animations ke liye @keyframes se stages define karo (from/to ya percentages), phir animation property se attach karo (name, duration, timing, iteration-count, direction). Transitions ke ulat, keyframe animations loop kar sakti hain aur bina trigger ke apne aap chal sakti hain.',
        },
        dailyLifeExample:
          'Keyframes ek dance ki choreography jaisa hai — step 1, step 2, step 3 define karo, phir music (animation) pe wo apne aap repeat hota hai.',
        codeExample:
          '@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}\n.ball {\n  animation: bounce 1s ease-in-out infinite;\n}',
        keyPoints: [
          '@keyframes defines animation stages',
          'animation: name duration timing iteration',
          'Can loop (infinite) and auto-run',
          'Use percentages for multi-step animations',
        ],
        quiz: [
          {
            question: 'Which rule defines animation stages?',
            options: ['@media', '@keyframes', '@import', '@font-face'],
            correctIndex: 1,
          },
          {
            question: 'How do you make an animation loop forever?',
            options: ['loop: true', 'iteration-count / infinite', 'repeat: yes', 'It cannot'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Modern CSS',
    level: 'advanced',
    description: 'CSS variables aur stacking context.',
    concepts: [
      {
        title: 'CSS Variables (Custom Properties)',
        difficulty: 'medium',
        tags: ['variables', 'modern'],
        explanation: {
          english:
            'CSS custom properties (variables) store reusable values. Declare them with -- (often on :root) and use them with var(). They cascade and can be changed at runtime with JavaScript — perfect for theming (e.g. dark mode) without duplicating values.',
          hinglish:
            'CSS custom properties (variables) reusable values store karti hain. Inhe -- se declare karo (aksar :root pe) aur var() se use karo. Ye cascade hoti hain aur JavaScript se runtime pe badli ja sakti hain — theming (jaise dark mode) ke liye perfect bina values duplicate kiye.',
        },
        dailyLifeExample:
          'CSS variable ek master switch jaisa hai — ek jagah brand colour badlo, poori website pe apne aap badal jaaye, har file mein dhoondhne ki zaroorat nahi.',
        codeExample:
          ':root {\n  --brand: #4f46e5;\n  --space: 16px;\n}\n.btn {\n  background: var(--brand);\n  padding: var(--space);\n}',
        keyPoints: [
          'Declare with -- and read with var()',
          'Usually defined on :root for global use',
          'Cascade & inherit like normal properties',
          'Changeable at runtime via JS — great for theming',
        ],
        quiz: [
          {
            question: 'How do you read a CSS variable?',
            options: ['get(--x)', 'var(--x)', '$x', '@x'],
            correctIndex: 1,
          },
          {
            question: 'Where are global CSS variables usually defined?',
            options: ['body', ':root', 'head', '* '],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'z-index & Stacking Context',
        difficulty: 'hard',
        tags: ['z-index', 'layout'],
        explanation: {
          english:
            'z-index controls which positioned elements appear on top (higher = front), but it only works on positioned elements (not static). A stacking context is a self-contained layer — once an element creates one (via position+z-index, opacity, transform, etc.), its children z-index values are confined within it, which explains many "z-index not working" bugs.',
          hinglish:
            'z-index control karta hai kaunse positioned elements upar dikhein (zyada = aage), par ye sirf positioned elements pe chalta hai (static pe nahi). Stacking context ek self-contained layer hai — jab koi element ek banata hai (position+z-index, opacity, transform se), to uske children ke z-index usi ke andar confined ho jaate hain, jo "z-index kaam nahi kar raha" wale bugs samjhata hai.',
        },
        dailyLifeExample:
          'Stacking context buildings ke floors jaisa hai — ek building ka 10th floor doosri building ke 2nd floor se neeche ho sakta hai agar pehli building hi neeche hai. Andar ka z-index sirf apni building mein matter karta hai.',
        codeExample:
          '.modal { position: fixed; z-index: 100; }\n.tooltip { position: absolute; z-index: 50; }\n/* z-index needs a position other than static */',
        keyPoints: [
          'z-index orders positioned elements (higher = front)',
          'Only works with position != static',
          'Stacking contexts confine child z-index',
          'opacity/transform/filter can create a context',
        ],
        quiz: [
          {
            question: 'z-index works only on elements that are…',
            options: ['static', 'positioned (relative/absolute/fixed/sticky)', 'flex', 'hidden'],
            correctIndex: 1,
          },
          {
            question: 'A higher z-index means the element is…',
            options: ['Further back', 'In front', 'Hidden', 'Smaller'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between margin and padding?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Padding is the space inside an element, between its content and its border. Margin is the space outside the element, between its border and other elements. Padding affects the element\'s background area; margin does not and can collapse between vertical elements.',
      hinglish:
        'Padding element ke andar ki space hai, content aur border ke beech. Margin element ke bahar ki space hai, border aur doosre elements ke beech. Padding element ke background area ko affect karta hai; margin nahi karta aur vertical elements ke beech collapse ho sakta hai.',
    },
  },
  {
    question: 'What is the difference between relative, absolute, and fixed positioning?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'relative offsets an element from its normal position while keeping its space. absolute removes it from flow and positions it relative to the nearest positioned ancestor (or the page). fixed removes it from flow and positions it relative to the viewport, so it stays put on scroll. sticky toggles between relative and fixed based on scroll position.',
      hinglish:
        'relative element ko apni normal position se offset karta hai aur uski space rakhta hai. absolute use flow se hata kar nearest positioned ancestor (ya page) ke relative position karta hai. fixed use flow se hata kar viewport ke relative position karta hai, isliye scroll pe wahin rehta hai. sticky scroll position ke hisaab se relative aur fixed ke beech switch karta hai.',
    },
  },
  {
    question: 'What does box-sizing: border-box do?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'By default (content-box), width/height set only the content size, so padding and border are added on top, making the rendered box bigger than expected. border-box makes width/height include padding and border, so the element stays the size you set. It is a common global reset for predictable layouts.',
      hinglish:
        'Default (content-box) mein width/height sirf content size set karti hain, isliye padding aur border upar se jud jaate hain aur box expected se bada ho jaata hai. border-box width/height mein padding aur border include kar leta hai, isliye element utna hi rehta hai jitna set kiya. Ye predictable layouts ke liye ek common global reset hai.',
    },
  },
  {
    question: 'What is the difference between CSS and CSS3?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'CSS3 is the latest major revision of CSS, split into independent modules that can be updated separately. New features include: border-radius, box-shadow, text-shadow, gradients, transitions, animations (@keyframes), transforms (rotate, scale, skew), flexbox, grid, media queries, CSS variables (custom properties), and multi-column layout. Older CSS (1 and 2) had no transitions or animations; layout relied on floats and tables.',
      hinglish:
        'CSS3 CSS ka latest major revision hai, independent modules mein split kiya gaya jise alag-alag update kiya ja sakta hai. Nayi features: border-radius, box-shadow, text-shadow, gradients, transitions, animations (@keyframes), transforms (rotate, scale, skew), flexbox, grid, media queries, CSS variables (custom properties), aur multi-column layout. Purana CSS (1 aur 2) mein transitions ya animations nahi the; layout floats aur tables pe rely karta tha.',
    },
  },
  {
    question: 'What are CSS selectors? Name the different types.',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Selectors target elements to apply styles. Types: Universal (*), Type/element (div, p), Class (.btn), ID (#header), Attribute ([type="text"]), Pseudo-class (:hover, :nth-child, :focus), Pseudo-element (::before, ::after, ::placeholder), Descendant (div p), Child (div > p), Adjacent sibling (h1 + p), General sibling (h1 ~ p), and Group (h1, h2, h3). Specificity order: inline style > ID > class/attribute/pseudo-class > element.',
      hinglish:
        'Selectors elements ko style apply karne ke liye target karte hain. Types: Universal (*), Type/element (div, p), Class (.btn), ID (#header), Attribute ([type="text"]), Pseudo-class (:hover, :nth-child, :focus), Pseudo-element (::before, ::after, ::placeholder), Descendant (div p), Child (div > p), Adjacent sibling (h1 + p), General sibling (h1 ~ p), aur Group (h1, h2, h3). Specificity order: inline style > ID > class/attribute/pseudo-class > element.',
    },
  },
  {
    question: 'What is a media query in CSS?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A media query applies CSS rules only when certain conditions are true — typically the screen width. Syntax: @media (max-width: 768px) { ... }. Used to build responsive layouts that adapt to mobile, tablet, and desktop. You can also query orientation, resolution, hover capability, and more. Mobile-first: write base styles for mobile, then use min-width queries to enhance for larger screens.',
      hinglish:
        'Media query CSS rules sirf tab apply karta hai jab kuch conditions true hon — typically screen width. Syntax: @media (max-width: 768px) { ... }. Responsive layouts banane ke liye use hota hai jo mobile, tablet, aur desktop ke liye adapt karte hain. Orientation, resolution, hover capability, aur aur cheezein bhi query kar sakte ho. Mobile-first: mobile ke liye base styles likho, phir badi screens ke liye enhance karne ke liye min-width queries use karo.',
    },
  },
  {
    question: 'What is the Box Model in CSS?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The CSS Box Model describes every element as a rectangular box made of four layers (outside to inside): margin (space outside the border), border, padding (space between border and content), and content. Total rendered width (content-box) = content width + padding-left + padding-right + border-left + border-right. Setting box-sizing: border-box makes width include padding and border so the box stays the declared size.',
      hinglish:
        'CSS Box Model har element ko char layers (bahar se andar) se bani rectangular box ke roop mein describe karta hai: margin (border ke bahar space), border, padding (border aur content ke beech space), aur content. Total rendered width (content-box) = content width + padding-left + padding-right + border-left + border-right. box-sizing: border-box set karne se width mein padding aur border include ho jaata hai isliye box declared size par rehta hai.',
    },
  },
  {
    question: 'What is the difference between px, em, rem, and % units in CSS?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'px: absolute pixel unit — fixed size regardless of parent or browser settings. em: relative to the font-size of the parent element — compounds if nested. rem (root em): relative to the root <html> font-size (default 16px) — consistent, unaffected by nesting. %: relative to the parent element\'s corresponding property (width % is % of parent width). Best practice: use rem for font sizes (respects user browser settings), px for borders/shadows, % or fr for layout widths.',
      hinglish:
        'px: absolute pixel unit — parent ya browser settings se independent fixed size. em: parent element ke font-size ke relative — nested hone pe compound ho jaata hai. rem (root em): root <html> font-size ke relative (default 16px) — consistent, nesting se unaffected. %: parent element ke corresponding property ke relative (width % parent width ka % hai). Best practice: font sizes ke liye rem use karo (user browser settings respect karta hai), borders/shadows ke liye px, layout widths ke liye % ya fr.',
    },
  },
  {
    question: 'What is Flexbox in CSS and when should you use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Flexbox is a one-dimensional layout model (row or column). Set display: flex on a container; child items become flex items that you can align and distribute. Key properties: flex-direction (row/column), justify-content (main axis alignment), align-items (cross axis), flex-wrap, gap. Use flexbox for nav bars, centering, card rows, and any single-axis layout. Use CSS Grid for two-dimensional (rows and columns) layouts.',
      hinglish:
        'Flexbox ek one-dimensional layout model hai (row ya column). Container pe display: flex set karo; child items flex items ban jaate hain jinhe align aur distribute kar sakte ho. Key properties: flex-direction (row/column), justify-content (main axis alignment), align-items (cross axis), flex-wrap, gap. Flexbox nav bars, centering, card rows, aur kisi bhi single-axis layout ke liye use karo. Rows aur columns dono wale two-dimensional layouts ke liye CSS Grid use karo.',
    },
  },
  {
    question: 'What are pseudo-selectors (pseudo-classes and pseudo-elements) in CSS?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Pseudo-classes select elements based on state or position — they use a single colon: :hover, :focus, :active, :checked, :nth-child(n), :first-child, :last-child, :not(selector), :disabled. Pseudo-elements create virtual sub-parts of an element — they use double colons: ::before (insert content before), ::after (insert content after), ::placeholder, ::selection, ::first-line, ::first-letter. Pseudo-elements require content: "" to render (even if empty).',
      hinglish:
        'Pseudo-classes elements ko state ya position ke basis pe select karte hain — single colon use karte hain: :hover, :focus, :active, :checked, :nth-child(n), :first-child, :last-child, :not(selector), :disabled. Pseudo-elements element ke virtual sub-parts banate hain — double colons use karte hain: ::before (content se pehle insert karo), ::after (content ke baad insert karo), ::placeholder, ::selection, ::first-line, ::first-letter. Pseudo-elements ko render hone ke liye content: "" chahiye (chahe empty ho).',
    },
  },
  {
    question: 'How do you make a website responsive?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Key approaches: (1) Viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">. (2) Fluid layouts: use %, vw, fr instead of fixed px for widths. (3) Media queries: change layout/font sizes at breakpoints. (4) Flexbox/Grid: naturally flexible layouts. (5) Responsive images: max-width: 100%, srcset for different resolutions. (6) Mobile-first approach: design for small screens first, then enhance up with min-width queries. (7) Avoid fixed widths for containers.',
      hinglish:
        'Key approaches: (1) Viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">. (2) Fluid layouts: widths ke liye fixed px ki jagah %, vw, fr use karo. (3) Media queries: breakpoints pe layout/font sizes change karo. (4) Flexbox/Grid: naturally flexible layouts. (5) Responsive images: max-width: 100%, alag resolutions ke liye srcset. (6) Mobile-first approach: pehle small screens ke liye design karo, phir min-width queries se upar enhance karo. (7) Containers ke liye fixed widths avoid karo.',
    },
  },
  {
    question: 'What are common CSS breakpoints for responsive design?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Common breakpoints (mobile-first, using min-width): 640px (sm — large mobile), 768px (md — tablets), 1024px (lg — laptops/small desktops), 1280px (xl — large desktops), 1536px (2xl — wide screens). These match Tailwind CSS defaults. Always test on real devices rather than just specific pixel values — content-based breakpoints (where the layout breaks) are more robust than device-based ones.',
      hinglish:
        'Common breakpoints (mobile-first, min-width use karke): 640px (sm — large mobile), 768px (md — tablets), 1024px (lg — laptops/small desktops), 1280px (xl — large desktops), 1536px (2xl — wide screens). Ye Tailwind CSS defaults se match karte hain. Hamesha real devices pe test karo sirf specific pixel values ke bajaye — content-based breakpoints (jahan layout toot ta hai) device-based ones se zyada robust hote hain.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
