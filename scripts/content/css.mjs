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
  icon: 'css',
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
      {
        title: 'Backgrounds & Gradients',
        difficulty: 'easy',
        tags: ['backgrounds', 'colors'],
        explanation: {
          english:
            'background-color fills a solid color. background-image adds an image or a gradient — linear-gradient() blends colors in a direction, radial-gradient() blends outward from a center point. background-size (cover/contain) controls how an image fits, and background-position places it. background-repeat controls tiling (default: repeats both ways).',
          hinglish:
            'background-color solid color fill karta hai. background-image image ya gradient add karta hai — linear-gradient() colors ko ek direction mein blend karta hai, radial-gradient() ek center point se bahar ki taraf blend karta hai. background-size (cover/contain) control karta hai image kaise fit ho, aur background-position use place karta hai. background-repeat tiling control karta hai (default: dono taraf repeat hota hai).',
        },
        dailyLifeExample:
          'background-image ek deewar pe wallpaper lagane jaisa hai. background-size: cover poori deewar ko dhak deta hai (kuch photo crop ho sakta hai), background: contain poora photo dikhata hai (deewar ka kuch hissa khali reh sakta hai). Gradient ek sunset ke rangon ke jaise dheere-dheere ek rang se doosre mein badalna hai.',
        codeExample:
          "body {\n  background-color: #f8fafc;\n  background-image: url('hero.jpg');\n  background-size: cover;      /* fill, may crop */\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n.banner {\n  background: linear-gradient(135deg, #4f46e5, #ec4899);\n}\n.spotlight {\n  background: radial-gradient(circle, white, #4f46e5);\n}",
        keyPoints: [
          'background-color: solid fill; background-image: picture or gradient',
          'linear-gradient(direction, color1, color2, ...) blends in a straight line',
          'radial-gradient() blends outward from a center point',
          'background-size: cover fills and may crop; contain fits fully, may leave gaps',
          'background-repeat / background-position fine-tune placement',
        ],
        quiz: [
          {
            question: 'What does background-size: cover do?',
            options: ['Shrinks the image to fit exactly with no cropping', 'Fills the whole area, cropping the image if needed', 'Repeats the image in a grid', 'Makes the background transparent'],
            correctIndex: 1,
          },
          {
            question: 'Which function creates a gradient that blends outward from a center point?',
            options: ['linear-gradient()', 'radial-gradient()', 'conic-gradient()', 'blend()'],
            correctIndex: 1,
          },
          {
            question: 'By default, does a background image repeat?',
            options: ['No, never', 'Yes, it tiles in both directions unless you set background-repeat: no-repeat', 'Only vertically', 'Only if you ask it to'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Borders, Border-Radius & Box-Shadow',
        difficulty: 'easy',
        tags: ['borders', 'effects'],
        explanation: {
          english:
            "border draws a line around an element's edge — set its width, style (solid/dashed/dotted), and color in one shorthand: border: 2px solid black. border-radius rounds the corners (50% makes a perfect circle on a square box). box-shadow adds a drop shadow: offset-x, offset-y, blur-radius, and color, giving depth without any image.",
          hinglish:
            'border ek element ke edge ke around line kheenchta hai — width, style (solid/dashed/dotted), aur color ek shorthand mein set karo: border: 2px solid black. border-radius corners ko round karta hai (50% ek square box ko perfect circle bana deta hai). box-shadow ek drop shadow add karta hai: offset-x, offset-y, blur-radius, aur color, bina kisi image ke depth deta hai.',
        },
        dailyLifeExample:
          'border ek photo frame jaisa hai. border-radius frame ke corners ko golai dena hai. box-shadow us frame ke peeche deewar pe padne wala saaya (shadow) hai jo lighting se depth ka feel deta hai.',
        codeExample:
          '.avatar {\n  width: 60px;\n  height: 60px;\n  border: 3px solid white;\n  border-radius: 50%;         /* perfect circle */\n  box-shadow: 0 4px 12px rgba(0,0,0,0.25); /* x, y, blur, color */\n}\n\n.card {\n  border-radius: 12px;        /* rounded corners */\n  box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n}',
        keyPoints: [
          'border shorthand: width style color (e.g. 2px solid black)',
          'border-radius rounds corners; 50% on a square = a circle',
          'box-shadow: offset-x offset-y blur-radius color',
          'box-shadow does not affect layout, unlike a real border',
          'Multiple box-shadows can be comma-separated for layered effects',
        ],
        quiz: [
          {
            question: 'What does border-radius: 50% do to a square element?',
            options: ['Nothing', 'Makes it a perfect circle', 'Doubles its size', 'Removes the border'],
            correctIndex: 1,
          },
          {
            question: 'In box-shadow: 0 4px 12px rgba(0,0,0,0.25), what does the 12px control?',
            options: ['Horizontal offset', 'Vertical offset', 'Blur radius', 'Border width'],
            correctIndex: 2,
          },
          {
            question: 'Which CSS shorthand property draws a line around an element in one line?',
            options: ['outline-style', 'border', 'edge', 'frame'],
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
          {
            question: 'You set grid-template-columns: repeat(3, 1fr) with 6 items, but never set grid-template-rows. What happens?',
            options: [
              'The layout breaks completely',
              'Grid automatically creates as many implicit rows as needed to fit all the items',
              'Only 3 items show, the rest are hidden',
              'An error is thrown',
            ],
            correctIndex: 1,
            explanation: 'Grid auto-generates implicit rows sized by their content unless you explicitly define grid-template-rows — for a simple item list you rarely need to specify rows at all.',
          },
        ],
      },
      {
        title: 'Overflow & Visibility vs display:none',
        difficulty: 'medium',
        tags: ['layout', 'overflow'],
        explanation: {
          english:
            'overflow controls what happens when content is bigger than its box: visible (default, spills out), hidden (clips extra content), scroll (always shows scrollbars), and auto (scrollbars only when needed). Separately, visibility: hidden hides an element but it STILL takes up space in the layout, unlike display: none which removes it from the layout completely — a very common point of confusion.',
          hinglish:
            'overflow control karta hai jab content apne box se bada ho to kya ho: visible (default, bahar chhalak jaata hai), hidden (extra content clip ho jaata hai), scroll (hamesha scrollbars dikhte hain), aur auto (scrollbars sirf zaroorat pe). Alag se, visibility: hidden element ko chhupa deta hai par wo layout mein jagah abhi bhi LETA hai, display: none ke ulat jo use layout se poori tarah hata deta hai — ye ek bahut common confusion point hai.',
        },
        dailyLifeExample:
          'overflow: hidden ek chhote gilaas mein zyada paani daalna jaisa hai — jo bahar chhalka wo bas dikhta nahi, gilaas mein utna hi rehta hai. visibility: hidden ek insaan ko invisibility cloak pehnana hai — wo abhi bhi kamre mein khada hai (jagah leta hai), bas dikh nahi raha. display: none matlab wo insaan kamra hi chhod ke chala gaya.',
        codeExample:
          '/* clips extra content, no scrollbar */\n.box1 { width: 200px; height: 100px; overflow: hidden; }\n\n/* scrollbar shows only if needed */\n.box2 { overflow: auto; }\n\n/* hidden but still occupies its space */\n.ghost { visibility: hidden; } /* leaves a gap */\n\n/* removed entirely, no gap left */\n.gone { display: none; }',
        keyPoints: [
          'overflow: visible (default), hidden (clips), scroll (always), auto (as needed)',
          'visibility: hidden HIDES the element but keeps its space in the layout',
          'display: none REMOVES the element from the layout entirely (no space kept)',
          'overflow-x / overflow-y control each axis separately',
          'visibility supports transition; display cannot be animated the same way',
        ],
        quiz: [
          {
            question: 'What is the key difference between visibility:hidden and display:none?',
            options: ['No difference, they are identical', 'visibility:hidden keeps the layout space; display:none removes it entirely', 'display:none is only for images', 'visibility:hidden deletes the element'],
            correctIndex: 1,
          },
          {
            question: 'Which overflow value shows a scrollbar only when content actually overflows?',
            options: ['visible', 'hidden', 'scroll', 'auto'],
            correctIndex: 3,
          },
          {
            question: 'What happens to content by default when it is bigger than its box (overflow: visible)?',
            options: ['It gets clipped', 'It spills outside the box', 'The box grows to a fixed max', 'The page crashes'],
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
          {
            question: '.child has z-index: 9999 but still appears BEHIND another element with z-index: 1. What is the most likely cause?',
            options: [
              'z-index only works up to 100',
              "The child's ancestor already created its own stacking context with a low z-index, trapping the child inside it",
              'CSS ignores z-index values above 1000',
              'z-index requires !important to work',
            ],
            correctIndex: 1,
            explanation: "A child's z-index is only compared against siblings WITHIN the same stacking context. If a parent creates a low-z-index stacking context (via position+z-index, opacity<1, transform, etc.), the child can never appear above content outside that parent — no matter how high its own z-index is.",
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

  // ─── Cascade, Layout & Modern CSS ───────────────────────────
  {
    question: 'How does CSS specificity actually work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Specificity is a three-part score: ID selectors, then class/attribute/pseudo-class selectors, then element/pseudo-element selectors. A higher category always beats a lower one regardless of count — a single ID outranks any number of classes. Inline styles rank above all selectors, and `!important` overrides everything except another `!important` later in the cascade. When specificity ties, SOURCE ORDER decides, which is why the last matching rule wins.',
      hinglish:
        'Specificity ek teen-hisse ka score hai: ID selectors, phir class/attribute/pseudo-class selectors, phir element/pseudo-element selectors. Ek upar ki shreni hamesha neeche wali ko haraati hai chahe ginti kuch bhi ho — ek akela ID kitne bhi classes se upar hai. Inline styles saare selectors se upar hain, aur `!important` sab kuch overrides karta hai siwaay cascade mein baad ke ek doosre `!important` ke. Specificity barabar hone pe, SOURCE KRAM tay karta hai, isiliye aakhri match karta rule jeetta hai.',
    },
  },
  {
    question: 'Why should you avoid !important?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'It breaks the cascade by winning regardless of specificity, so the only way to override it later is another `!important` — which escalates until the whole stylesheet is a fight. It makes debugging hard because the rule you would expect to apply silently loses, and it makes components unreusable since a consumer cannot restyle them. Legitimate uses are narrow: overriding third-party CSS you cannot edit, or utility classes deliberately designed to win.',
      hinglish:
        'Ye specificity chahe kuch bhi ho jeet kar cascade todta hai, isliye ise baad mein override karne ka ek hi tareeka ek aur `!important` hai — jo badhta jaata hai jab tak poora stylesheet ek ladaai na ban jaaye. Ye debugging mushkil banata hai kyunki jo rule lagna chahiye tha wo chupke se haar jaata hai, aur ye components ko dobara istemaal ke layak nahi rakhta kyunki ek consumer unhe dobara style nahi kar sakta. Sahi istemaal kam hain: aisi third-party CSS override karna jo tum edit nahi kar sakte, ya jaan boojh kar jeetne ke liye bane utility classes.',
    },
  },
  {
    question: 'What is the CSS box model and what does box-sizing change?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Every element is a box of content, padding, border, and margin. Under the default `content-box`, `width` sets only the CONTENT width, so padding and border are added on top — a 200px box with 20px padding actually occupies 240px, which is why layouts overflow unexpectedly. `border-box` makes `width` include padding and border, so the declared size is the real size. Setting `box-sizing: border-box` globally is near-universal practice for exactly this reason.',
      hinglish:
        'Har element content, padding, border, aur margin ka ek box hai. Default `content-box` mein, `width` sirf CONTENT ki chaudai set karta hai, isliye padding aur border upar se jud jaate hain — 20px padding wala ek 200px box actually 240px ghera leta hai, isiliye layouts anaapekshit roop se bahar nikal jaate hain. `border-box` `width` mein padding aur border shaamil kar deta hai, isliye batayi gayi size hi asli size hai. Theek isi wajah se `box-sizing: border-box` globally set karna lagbhag sarvbhaumik practice hai.',
    },
  },
  {
    question: 'What is margin collapsing?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Adjacent VERTICAL margins merge into one equal to the larger, rather than adding — two stacked elements with 20px and 30px margins end up 30px apart, not 50px. It also happens between a parent and its first or last child, so a child\'s margin can push the PARENT down, which is a genuinely confusing symptom. It only affects block layout in the normal flow: flex and grid containers do not collapse margins, which is one reason modern layout feels more predictable.',
      hinglish:
        'Saath lage KHADE margins jodne ke bajaye bade wale ke barabar ek mein mil jaate hain — 20px aur 30px margins wale do upar-neeche elements 30px door hote hain, 50px nahi. Ye ek parent aur uske pehle ya aakhri child ke beech bhi hota hai, isliye ek child ka margin PARENT ko neeche dhakel sakta hai, jo ek genuinely uljhaane wala lakshan hai. Ye sirf normal flow mein block layout ko affect karta hai: flex aur grid containers margins collapse nahi karte, jo ek wajah hai ki modern layout zyada anumaan lagane layak lagta hai.',
    },
  },
  {
    question: 'When should you use Flexbox versus Grid?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'FLEXBOX is one-dimensional — it lays items along a single row or column and is content-driven, so items size themselves and wrap naturally. Use it for navigation bars, toolbars, centring, and distributing space along one axis. GRID is two-dimensional, controlling rows and columns simultaneously with a layout defined by the container. Use it for page layouts, card galleries, and any design where alignment must hold in both directions. They compose freely — grid outside, flex inside.',
      hinglish:
        'FLEXBOX ek-aayaami hai — ye items ko ek row ya column mein lagata hai aur content-chaalit hai, isliye items khud size lete hain aur swabhavik roop se wrap hote hain. Ise navigation bars, toolbars, centring, aur ek axis pe jagah baantne ke liye use karo. GRID do-aayaami hai, rows aur columns ek saath control karta hai ek aise layout se jo container batata hai. Ise page layouts, card galleries, aur kisi bhi aise design ke liye use karo jahan dono dishaon mein alignment chahiye. Wo aasaani se judte hain — bahar grid, andar flex.',
    },
  },
  {
    question: 'What is the difference between position relative, absolute, fixed, and sticky?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'RELATIVE offsets an element from its normal position while KEEPING its space in the flow. ABSOLUTE removes it from flow and positions it against the nearest positioned ancestor — which is why you set `position: relative` on a parent to anchor it. FIXED positions against the viewport and does not scroll, though a transformed ancestor breaks that. STICKY behaves as relative until a scroll threshold, then acts fixed — and silently fails if any ancestor has `overflow: hidden`.',
      hinglish:
        'RELATIVE ek element ko uski normal jagah se khiskata hai jabki flow mein uski jagah BACHI rehti hai. ABSOLUTE use flow se hata deta hai aur sabse paas ke positioned poorvaj ke against rakhta hai — isiliye tum use tikaane ke liye ek parent pe `position: relative` set karte ho. FIXED viewport ke against rakhta hai aur scroll nahi karta, halaanki ek transformed poorvaj use todta hai. STICKY ek scroll seema tak relative ki tarah behave karta hai, phir fixed — aur kisi bhi poorvaj pe `overflow: hidden` hone pe chupke se fail ho jaata hai.',
    },
  },
  {
    question: 'How does z-index actually work?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`z-index` only applies to POSITIONED elements (or flex and grid children), and it operates within a STACKING CONTEXT. That is the part people miss: a new stacking context is created by `position` with a z-index, and also by `opacity` below 1, `transform`, `filter`, `will-change`, and others. Once inside a context, a child can never escape it — so a `z-index: 9999` element still sits behind a sibling whose parent has a higher context. Check ancestors, not the element.',
      hinglish:
        '`z-index` sirf POSITIONED elements (ya flex aur grid children) pe lagta hai, aur ye ek STACKING CONTEXT ke andar kaam karta hai. Yahi wo hissa hai jo log chhod dete hain: ek naya stacking context ek z-index wale `position` se banta hai, aur 1 se kam `opacity`, `transform`, `filter`, `will-change`, aur doosron se bhi. Ek context ke andar aane ke baad, ek child kabhi bahar nahi nikal sakta — isliye ek `z-index: 9999` element abhi bhi ek aise sibling ke peeche baithta hai jiske parent ka context ooncha hai. Element nahi, poorvaj dekho.',
    },
  },
  {
    question: 'What are CSS custom properties and how do they differ from preprocessor variables?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Custom properties (`--color: blue`) are RUNTIME values that live in the cascade: they inherit, can be changed by a media query or a class, and are readable and writable from JavaScript. Sass variables are compile-time and vanish from the output, so they cannot respond to anything at runtime. That difference is why theming — light and dark mode, or per-component overrides — is straightforward with custom properties and awkward with preprocessor variables.',
      hinglish:
        'Custom properties (`--color: blue`) RUNTIME values hain jo cascade mein rehti hain: wo inherit hoti hain, ek media query ya ek class se badal sakti hain, aur JavaScript se padhi aur likhi ja sakti hain. Sass variables compile-time hain aur output se gayab ho jaate hain, isliye wo runtime pe kisi cheez pe react nahi kar sakte. Wahi farak wajah hai ki theming — light aur dark mode, ya per-component override — custom properties se seedha hai aur preprocessor variables se ajeeb.',
    },
  },
  {
    question: 'What is the difference between em, rem, px, and viewport units?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`px` is absolute. `em` is relative to the PARENT font size, so nesting compounds it — three levels of `1.5em` gives 3.375x, which is the classic em trap. `rem` is relative to the ROOT font size, so it stays predictable and respects the user\'s browser font-size setting, which is why it is preferred for typography and spacing. `vw` and `vh` are relative to the viewport, useful for full-screen sections but risky for text, which can become unreadably small.',
      hinglish:
        '`px` absolute hai. `em` PARENT ke font size ke sapeksh hai, isliye nesting use guna karta hai — `1.5em` ke teen level 3.375x dete hain, jo classic em jaal hai. `rem` ROOT font size ke sapeksh hai, isliye ye anumaan lagane layak rehta hai aur user ki browser font-size setting maanta hai, isiliye typography aur spacing ke liye ise prefer kiya jaata hai. `vw` aur `vh` viewport ke sapeksh hain, full-screen sections ke liye useful par text ke liye khatarnak, jo padhne layak na rehne jitna chhota ho sakta hai.',
    },
  },
  {
    question: 'What are pseudo-classes and pseudo-elements?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A PSEUDO-CLASS (single colon) selects an element in a particular STATE — `:hover`, `:focus`, `:nth-child`, `:not`, `:checked`. A PSEUDO-ELEMENT (double colon) creates or styles a part of an element that is not in the DOM — `::before`, `::after`, `::placeholder`, `::selection`. Note `::before` and `::after` need a `content` property to appear at all, and they are inaccessible to screen readers for meaningful content, so never put real information there.',
      hinglish:
        'Ek PSEUDO-CLASS (ek colon) ek element ko ek khaas HAALAT mein chunta hai — `:hover`, `:focus`, `:nth-child`, `:not`, `:checked`. Ek PSEUDO-ELEMENT (do colon) ek element ka wo hissa banata ya style karta hai jo DOM mein nahi hai — `::before`, `::after`, `::placeholder`, `::selection`. Note karo `::before` aur `::after` ko dikhne ke liye ek `content` property chahiye, aur wo matlab wale content ke liye screen readers tak nahi pahunchte, isliye wahan kabhi asli jaankaari mat daalo.',
    },
  },
  {
    question: 'What are the newer CSS selectors like :has, :is, and :where?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`:has()` is the long-awaited PARENT selector — `.card:has(img)` styles a card that contains an image, something previously impossible without JavaScript. `:is()` groups selectors compactly and takes the specificity of its most specific argument. `:where()` does the same but has ZERO specificity, which makes it ideal for base styles a component should be able to override easily. All three are now broadly supported.',
      hinglish:
        '`:has()` bahut intezaar kiya gaya PARENT selector hai — `.card:has(img)` ek aise card ko style karta hai jisme ek image hai, jo pehle bina JavaScript ke asambhav tha. `:is()` selectors ko chhote roop mein jodta hai aur apne sabse khaas argument ki specificity leta hai. `:where()` wahi karta hai par uski specificity ZERO hai, jo ise un base styles ke liye ideal banata hai jinhe ek component aasaani se override kar sake. Teeno ab widely supported hain.',
    },
  },
  {
    question: 'What is a container query and how does it differ from a media query?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A MEDIA query responds to the VIEWPORT, so a component cannot know how much space it actually has — the same card looks wrong in a sidebar and in a full-width row. A CONTAINER query responds to the size of an ancestor container, so a component adapts to its own available space regardless of where it is placed. That makes components genuinely reusable, and it is the single biggest improvement to component-based CSS in years.',
      hinglish:
        'Ek MEDIA query VIEWPORT pe react karti hai, isliye ek component ko pata hi nahi hota ki uske paas actually kitni jagah hai — wahi card ek sidebar mein aur ek poori-chaudai row mein galat dikhta hai. Ek CONTAINER query ek poorvaj container ki size pe react karti hai, isliye ek component apni available jagah ke hisaab se dhalta hai chahe use kahin bhi rakha ho. Isse components genuinely dobara istemaal layak bante hain, aur ye saalon mein component-based CSS ka sabse bada sudhaar hai.',
    },
  },
  {
    question: 'How do you centre an element both horizontally and vertically?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The modern answer is flexbox — `display: flex; align-items: center; justify-content: center` — or grid, where `display: grid; place-items: center` does it in one line. For an absolutely positioned element, `top: 50%; left: 50%; transform: translate(-50%, -50%)` works because the transform percentage refers to the element\'s own size. The old techniques with negative margins or table-cell display are obsolete and should not appear in new code.',
      hinglish:
        'Modern jawab flexbox hai — `display: flex; align-items: center; justify-content: center` — ya grid, jahan `display: grid; place-items: center` ise ek line mein kar deta hai. Ek absolutely positioned element ke liye, `top: 50%; left: 50%; transform: translate(-50%, -50%)` chalta hai kyunki transform ka pratishat element ke apne size ko batata hai. Negative margins ya table-cell display wali purani techniques bekaar hain aur naye code mein nahi aani chahiye.',
    },
  },
  {
    question: 'What is the difference between display none, visibility hidden, and opacity 0?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`display: none` removes the element from the layout entirely — it takes no space and is invisible to screen readers. `visibility: hidden` hides it but KEEPS its space, and it is also removed from the accessibility tree. `opacity: 0` makes it invisible while keeping its space AND remaining interactive — it can still be clicked and focused, which is a real accessibility bug when used to hide something. Only opacity and visibility can be transitioned.',
      hinglish:
        '`display: none` element ko layout se poori tarah hata deta hai — ye koi jagah nahi leta aur screen readers ko nahi dikhta. `visibility: hidden` use chhupata hai par uski jagah BACHATA hai, aur ye bhi accessibility tree se hata diya jaata hai. `opacity: 0` use andekha banata hai jabki uski jagah bhi rehti hai AUR wo interactive bhi — us pe abhi bhi click aur focus ho sakta hai, jo kuch chhupane ke liye use karne pe ek asli accessibility bug hai. Sirf opacity aur visibility transition ho sakte hain.',
    },
  },
  {
    question: 'Which CSS properties are cheap to animate and why?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Only `transform` and `opacity` can be handled entirely by the COMPOSITOR, skipping layout and paint, so they run on the GPU at 60fps. Animating `width`, `height`, `top`, `left`, `margin`, or `padding` triggers LAYOUT, which forces the browser to recalculate positions for the whole page every frame and produces visible jank. So animate `transform: translateX()` rather than `left`, and `transform: scale()` rather than `width`. `will-change` can promote a layer, but overusing it costs memory.',
      hinglish:
        'Sirf `transform` aur `opacity` poori tarah COMPOSITOR sambhal sakta hai, layout aur paint chhod kar, isliye wo GPU pe 60fps pe chalte hain. `width`, `height`, `top`, `left`, `margin`, ya `padding` animate karna LAYOUT trigger karta hai, jo browser ko har frame poore page ki jagahein dobara nikaalne pe majboor karta hai aur dikhne wali atkan banata hai. Isliye `left` ke bajaye `transform: translateX()` animate karo, aur `width` ke bajaye `transform: scale()`. `will-change` ek layer bana sakta hai, par uska zyada istemaal memory cost karta hai.',
    },
  },
  {
    question: 'What is reflow and repaint?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'REFLOW (layout) recalculates the geometry of elements and is expensive because changing one element can affect its ancestors, siblings, and descendants. REPAINT redraws pixels without changing geometry — a colour change — and is cheaper. Composite is cheapest of all. Reading a layout property such as `offsetHeight` immediately after a write forces a SYNCHRONOUS reflow, and doing that inside a loop is layout thrashing, a classic cause of a frozen page.',
      hinglish:
        'REFLOW (layout) elements ki geometry dobara nikaalta hai aur mehnga hai kyunki ek element badalna uske poorvajon, bhaiyon, aur santaanon ko affect kar sakta hai. REPAINT geometry badle bina pixels dobara banata hai — ek rang ka badlaav — aur sasta hai. Composite sabse sasta hai. Ek write ke turant baad `offsetHeight` jaisi ek layout property padhna ek SYNCHRONOUS reflow majboor karta hai, aur ek loop ke andar aisa karna layout thrashing hai, ek jame hue page ka classic karan.',
    },
  },
  {
    question: 'What is the difference between CSS Grid template areas and line-based placement?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'TEMPLATE AREAS name regions and let you draw the layout visually in the CSS — `grid-template-areas: "header header" "sidebar main"` — which is extremely readable and makes rearranging at a breakpoint trivial. LINE-BASED placement positions items by grid line numbers or names, which is more precise and necessary for overlapping items or spans computed dynamically. Areas suit page-level layouts; line placement suits fine control within a component.',
      hinglish:
        'TEMPLATE AREAS ilaakon ko naam dete hain aur tumhe CSS mein layout drawing ki tarah likhne dete hain — `grid-template-areas: "header header" "sidebar main"` — jo bahut padhne layak hai aur ek breakpoint pe dobara jamana aasaan banata hai. LINE-BASED placement items ko grid line numbers ya naamon se rakhta hai, jo zyada sateek hai aur overlapping items ya dynamically compute hue spans ke liye zaroori. Areas page-level layouts ko suit karte hain; line placement ek component ke andar baareek control ko.',
    },
  },
  {
    question: 'What does minmax and auto-fit do in Grid?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`minmax(200px, 1fr)` sets a minimum and maximum track size, so a column never shrinks below 200px but grows to fill available space. Combined with `repeat(auto-fit, ...)` it produces a responsive grid with NO media queries at all — the browser fits as many columns as will fit and wraps automatically. `auto-fill` behaves the same but keeps empty tracks, so with few items `auto-fit` stretches them while `auto-fill` leaves gaps.',
      hinglish:
        '`minmax(200px, 1fr)` ek kam se kam aur zyada se zyada track size set karta hai, isliye ek column kabhi 200px se chhota nahi hota par available jagah bharne ko badhta hai. `repeat(auto-fit, ...)` ke saath ye BINA kisi media query ke ek responsive grid banata hai — browser jitne columns fit hon utne rakhta hai aur apne aap wrap karta hai. `auto-fill` waise hi behave karta hai par khaali tracks rakhta hai, isliye kam items pe `auto-fit` unhe khinchta hai jabki `auto-fill` khaali jagah chhodta hai.',
    },
  },
  {
    question: 'What is the difference between flex-grow, flex-shrink, and flex-basis?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`flex-basis` is the starting size before free space is distributed. `flex-grow` decides what proportion of EXTRA space an item takes. `flex-shrink` decides how much it gives up when space is short. The shorthand `flex: 1` means `1 1 0%`, which makes all items equal width regardless of content, whereas `flex: auto` is `1 1 auto` and sizes by content — that distinction explains most "why are my flex items uneven" confusion.',
      hinglish:
        '`flex-basis` khaali jagah bantne se pehle ki shuruaati size hai. `flex-grow` tay karta hai ki ek item EXTRA jagah ka kitna hissa le. `flex-shrink` tay karta hai ki jagah kam hone pe wo kitna chhodta hai. Shorthand `flex: 1` ka matlab `1 1 0%` hai, jo saare items ko content chahe kuch bhi ho barabar chaudai deta hai, jabki `flex: auto` `1 1 auto` hai aur content se size leta hai — wahi farak zyadatar "mere flex items barabar kyun nahi" wali uljhan samjhaata hai.',
    },
  },
  {
    question: 'How do you implement dark mode in CSS?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Define colours as custom properties on `:root`, then override them inside `@media (prefers-color-scheme: dark)` so the site follows the operating system. For a manual toggle, also override under a `[data-theme="dark"]` attribute on the root and let that win, storing the choice in localStorage. Apply the theme before first paint to avoid a flash of the wrong theme, and remember to check CONTRAST in both modes — dark mode often fails accessibility checks.',
      hinglish:
        'Colours ko `:root` pe custom properties ki tarah define karo, phir `@media (prefers-color-scheme: dark)` ke andar unhe override karo taaki site operating system follow kare. Ek manual toggle ke liye, root pe ek `[data-theme="dark"]` attribute ke neeche bhi override karo aur use jeetne do, choice localStorage mein rakhte hue. Theme ko pehle paint se pehle lagao taaki galat theme ki jhalak na dikhe, aur dono modes mein CONTRAST jaanchna yaad rakho — dark mode aksar accessibility checks mein fail hota hai.',
    },
  },
  {
    question: 'What is the difference between inline, block, and inline-block?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A BLOCK element starts on a new line, takes the full available width, and honours width, height, and vertical margins. An INLINE element flows within text, sizes to its content, and IGNORES width, height, and vertical margins — a frequent source of "why is my padding not working". `inline-block` combines them: it flows inline but accepts box dimensions. In modern layout flex and grid handle most of these cases more predictably.',
      hinglish:
        'Ek BLOCK element nayi line pe shuru hota hai, poori available chaudai leta hai, aur width, height, aur khade margins maanta hai. Ek INLINE element text ke andar behta hai, apne content ke hisaab se size leta hai, aur width, height, aur khade margins ANDEKHA karta hai — "mera padding kaam kyun nahi kar raha" ka ek aksar karan. `inline-block` dono jodta hai: ye inline behta hai par box dimensions leta hai. Modern layout mein flex aur grid inme se zyadatar cases zyada anumaan layak sambhalte hain.',
    },
  },
  {
    question: 'What is a stacking context and what creates one?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A stacking context is a self-contained group whose children are stacked entirely within it, so no descendant can be placed above or below an element outside the group regardless of z-index. It is created by the root element, by `position` with a z-index other than auto, and — the surprising ones — by `opacity` below 1, `transform`, `filter`, `will-change`, `isolation: isolate`, and `mix-blend-mode`. That is why adding a subtle transform can suddenly break a dropdown\'s layering.',
      hinglish:
        'Ek stacking context ek khud-poora group hai jiske children poori tarah usi ke andar upar-neeche lagte hain, isliye koi santaan z-index chahe kuch bhi ho group ke bahar ke ek element ke upar ya neeche nahi ja sakta. Ye root element se banta hai, auto ke alawa z-index wale `position` se, aur — chaunkane wale — 1 se kam `opacity`, `transform`, `filter`, `will-change`, `isolation: isolate`, aur `mix-blend-mode` se. Isiliye ek halka transform jodna achanak ek dropdown ki parat tod deta hai.',
    },
  },
  {
    question: 'What is the difference between CSS Modules, styled-components, and Tailwind?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'CSS MODULES scope plain CSS by generating unique class names at build time — zero runtime cost, familiar syntax. STYLED-COMPONENTS writes CSS in JavaScript with props-driven styling, which is expressive but adds runtime overhead and complicates server rendering. TAILWIND uses utility classes in the markup, giving very small output after purging and no naming decisions, at the cost of verbose HTML. All three solve the same core problem: CSS has no native scoping.',
      hinglish:
        'CSS MODULES plain CSS ko build time pe unique class naam banakar seemit karte hain — zero runtime cost, jaana-pehchana syntax. STYLED-COMPONENTS JavaScript mein CSS likhta hai props-chaalit styling ke saath, jo expressive hai par runtime bojh jodta hai aur server rendering uljhaata hai. TAILWIND markup mein utility classes use karta hai, purge ke baad bahut chhota output aur koi naam ke faisle nahi deta, verbose HTML ke cost pe. Teeno wahi mool samasya solve karte hain: CSS mein native scoping nahi hai.',
    },
  },
  {
    question: 'What is BEM and why do naming conventions matter in CSS?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'BEM names classes as `block__element--modifier`, making the relationship between markup and styles explicit. It matters because CSS is GLOBAL by default: without a convention, class names collide, specificity wars begin, and nobody can safely delete a rule because they cannot tell what uses it. BEM keeps specificity flat and predictable. Scoped solutions such as CSS Modules or Tailwind solve the same problem differently, which is why BEM is less common in component frameworks.',
      hinglish:
        'BEM classes ko `block__element--modifier` ki tarah naam deta hai, markup aur styles ka rishta saaf karte hue. Ye isliye matter karta hai kyunki CSS default se GLOBAL hai: ek convention ke bina, class naam takraate hain, specificity ki ladaai shuru hoti hai, aur koi surakshit roop se ek rule delete nahi kar sakta kyunki use pata hi nahi ki use kaun use karta hai. BEM specificity ko chapta aur anumaan layak rakhta hai. CSS Modules ya Tailwind jaise scoped solutions wahi samasya alag tarah solve karte hain, isiliye BEM component frameworks mein kam common hai.',
    },
  },
  {
    question: 'What is the cascade layer feature?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '`@layer` lets you define explicit priority ORDER between groups of styles, and layer order beats specificity entirely — a low-specificity rule in a later layer wins over a high-specificity rule in an earlier one. That solves the classic problem of a third-party library\'s specific selectors overriding your own, without resorting to `!important`. Declare the layer order once at the top and the whole cascade becomes intentional rather than accidental.',
      hinglish:
        '`@layer` tumhe styles ke groups ke beech explicit priority KRAM define karne deta hai, aur layer kram specificity ko poori tarah haraata hai — ek baad ki layer ka kam-specificity rule ek pehle ki layer ke ooncha-specificity rule se jeetta hai. Ye ek third-party library ke khaas selectors ke tumhare apne ko override karne wali classic samasya solve karta hai, bina `!important` pe jaaye. Layer kram upar ek baar declare karo aur poora cascade galti ke bajaye iraade se ban jaata hai.',
    },
  },
  {
    question: 'How do you make a layout responsive without media queries?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Several intrinsic techniques. `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` wraps automatically as space allows. `clamp(1rem, 2vw + 1rem, 2rem)` scales typography smoothly between bounds. `flex-wrap` with a `flex-basis` lets items reflow naturally. `min()`, `max()`, and `aspect-ratio` cover most remaining cases. These adapt to the actual available space rather than guessing at device widths, which is more robust across unusual screen sizes.',
      hinglish:
        'Kai swabhavik techniques. `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` jagah ke hisaab se apne aap wrap karta hai. `clamp(1rem, 2vw + 1rem, 2rem)` typography ko seemaon ke beech smoothly badalta hai. `flex-basis` ke saath `flex-wrap` items ko swabhavik roop se behne deta hai. `min()`, `max()`, aur `aspect-ratio` baaki zyadatar cases cover karte hain. Ye device chaudaai ka andaaza lagane ke bajaye asli available jagah ke hisaab se dhalte hain, jo ajeeb screen sizes ke across zyada majboot hai.',
    },
  },
  {
    question: 'What does clamp() do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`clamp(min, preferred, max)` returns the preferred value but never outside the bounds. Its main use is fluid typography — `font-size: clamp(1rem, 2.5vw, 2rem)` scales with the viewport but stays readable on a phone and does not become enormous on a wide monitor, replacing several media queries with one line. Always include a `rem` term in the preferred value, because a pure `vw` value ignores the user\'s browser zoom and font-size setting.',
      hinglish:
        '`clamp(min, preferred, max)` pasandeeda value lautaata hai par kabhi seemaon ke bahar nahi. Iska main use fluid typography hai — `font-size: clamp(1rem, 2.5vw, 2rem)` viewport ke saath badalta hai par ek phone pe padhne layak rehta hai aur ek chaude monitor pe bahut bada nahi hota, kai media queries ko ek line se badalte hue. Pasandeeda value mein hamesha ek `rem` hissa daalo, kyunki ek sheer `vw` value user ke browser zoom aur font-size setting ko andekha karti hai.',
    },
  },
  {
    question: 'How do you optimise CSS for performance?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CSS is render-blocking, so the goal is shipping less of it sooner. INLINE the critical above-the-fold CSS and load the rest asynchronously. Remove unused rules with a purge step — most frameworks ship far more than any page uses. Avoid deeply nested selectors and `@import`, which serialises requests. Animate only `transform` and `opacity`. Use `content-visibility: auto` for long pages so off-screen sections are not laid out until needed.',
      hinglish:
        'CSS render-blocking hai, isliye lakshya kam CSS jaldi bhejna hai. Zaroori above-the-fold CSS INLINE karo aur baaki asynchronously load karo. Ek purge step se bina use ke rules hatao — zyadatar frameworks kisi bhi page ke istemaal se bahut zyada bhejte hain. Gehre nested selectors aur `@import` se bacho, jo requests ko ek-ek karke chalata hai. Sirf `transform` aur `opacity` animate karo. Lambe pages ke liye `content-visibility: auto` use karo taaki screen ke bahar ke sections zaroorat tak layout na hon.',
    },
  },
  {
    question: 'What is critical CSS?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Critical CSS is the minimum needed to render what the user sees FIRST — the above-the-fold content. Inlining it in a `<style>` tag means the browser can paint immediately instead of waiting for a stylesheet round trip, which directly improves First Contentful Paint. The rest is loaded asynchronously. The costs are that inline CSS is not cached across pages and the extraction must be automated, or it silently drifts out of date as the design changes.',
      hinglish:
        'Critical CSS wo kam se kam CSS hai jo user ko PEHLE dikhne wali cheez render karne ko chahiye — above-the-fold content. Ise ek `<style>` tag mein inline karne ka matlab hai browser ek stylesheet round trip ka intezaar karne ke bajaye turant paint kar sakta hai, jo seedha First Contentful Paint behtar karta hai. Baaki asynchronously load hota hai. Costs ye hain ki inline CSS pages ke across cache nahi hoti aur nikaalna automate hona chahiye, warna design badalne pe wo chupke se purani ho jaati hai.',
    },
  },
  {
    question: 'What is the difference between transition and animation?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A TRANSITION interpolates between two states and requires a TRIGGER — a hover, a class change — so it is simple and ideal for interactive feedback. An ANIMATION uses `@keyframes` to define multiple steps, can run automatically on load, loop indefinitely, and be paused or reversed. Use transitions for state changes and animations for anything with several stages or that must run without user action. Both should respect `prefers-reduced-motion`.',
      hinglish:
        'Ek TRANSITION do haalaton ke beech badalti hai aur use ek TRIGGER chahiye — ek hover, ek class badlaav — isliye ye simple hai aur interactive feedback ke liye ideal. Ek ANIMATION `@keyframes` se kai kadam batati hai, load pe apne aap chal sakti hai, hamesha ghoom sakti hai, aur rok ya ulti ki ja sakti hai. State badlaav ke liye transitions aur kai charno wali ya bina user ke chalne wali kisi bhi cheez ke liye animations use karo. Dono ko `prefers-reduced-motion` maanna chahiye.',
    },
  },
  {
    question: 'What is prefers-reduced-motion and why does it matter?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'It is a media query reflecting an operating-system setting where the user has asked for less motion. It matters because animation is not merely a preference for some people — parallax, large movements, and autoplaying motion can trigger genuine nausea, dizziness, and migraine in users with vestibular disorders. Respect it by disabling or drastically shortening non-essential motion, keeping opacity fades which are generally safe. It is two lines of CSS and a real accessibility requirement.',
      hinglish:
        'Ye ek media query hai jo ek operating-system setting batati hai jahan user ne kam hilna-dulna maanga hai. Ye isliye matter karta hai kyunki kuch logon ke liye animation sirf pasand nahi hai — parallax, badi harkatein, aur apne aap chalti motion vestibular vikaar wale users mein sach mein ubkaai, chakkar, aur migraine la sakti hai. Ise gair-zaroori motion band ya bahut chhota karke maano, opacity fades rakhte hue jo aam taur pe surakshit hain. Ye do line ki CSS aur ek asli accessibility zaroorat hai.',
    },
  },
  {
    question: 'How do you handle CSS specificity conflicts in a large codebase?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Keep specificity FLAT — prefer single class selectors and avoid IDs and deep descendant chains, so overriding never requires escalation. Adopt a convention such as BEM or a scoped solution such as CSS Modules so names cannot collide. Use `@layer` to make priority explicit between third-party, base, component, and utility styles. Use `:where()` for zero-specificity defaults. The underlying discipline is that specificity should be a deliberate decision, not an accident of nesting.',
      hinglish:
        'Specificity CHAPTI rakho — single class selectors prefer karo aur IDs aur gehre descendant chains se bacho, taaki override karne ke liye kabhi badhaana na pade. BEM jaisa ek convention ya CSS Modules jaisa ek scoped solution apnaao taaki naam na takraayein. Third-party, base, component, aur utility styles ke beech priority saaf karne ke liye `@layer` use karo. Zero-specificity defaults ke liye `:where()` use karo. Mool anushasan ye hai ki specificity ek soch-samajh ka faisla hona chahiye, nesting ki ek durghatna nahi.',
    },
  },
  {
    question: 'What is the difference between relative and absolute units for accessibility?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Setting font sizes in `px` overrides the user\'s browser font-size preference, so someone who enlarged their default text still gets your small type — a genuine barrier for low-vision users. `rem` scales with that root preference, which is why it is the accessible choice for typography and spacing. Browser ZOOM scales both, so px is not entirely broken, but font-size preference is the setting people actually change. WCAG also requires text to remain usable at 200% zoom.',
      hinglish:
        'Font sizes `px` mein set karna user ki browser font-size pasand ko override karta hai, isliye jisne apna default text bada kiya use abhi bhi tumhara chhota type milta hai — kam-drishti users ke liye ek asli rukaawat. `rem` us root pasand ke saath badalta hai, isiliye ye typography aur spacing ke liye sulabh choice hai. Browser ZOOM dono badalta hai, isliye px poori tarah toota nahi, par font-size pasand hi wo setting hai jo log actually badalte hain. WCAG ye bhi chahta hai ki text 200% zoom pe kaam ka rahe.',
    },
  },
  {
    question: 'What is the difference between :focus and :focus-visible?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`:focus` matches whenever an element has focus, including after a mouse click, which is why designers historically removed focus rings and broke keyboard navigation. `:focus-visible` matches only when the browser judges a focus indicator to be USEFUL — typically keyboard navigation, not a click. That lets you show a clear ring for keyboard users and nothing for mouse users, which resolves the old tension between visual design and accessibility. Never remove focus styles without a replacement.',
      hinglish:
        '`:focus` tab match karta hai jab bhi ek element pe focus ho, ek mouse click ke baad bhi, isiliye designers historically focus rings hataate the aur keyboard navigation todte the. `:focus-visible` sirf tab match karta hai jab browser samjhe ki ek focus nishaan KAAM KA hai — typically keyboard navigation, ek click nahi. Isse tum keyboard users ke liye ek saaf ring aur mouse users ke liye kuch nahi dikha sakte ho, jo visual design aur accessibility ke beech purani khinchtaan sulhaa deta hai. Bina replacement ke focus styles kabhi mat hatao.',
    },
  },
  {
    question: 'What is the difference between overflow hidden, auto, and scroll?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`hidden` clips content with no scrollbar, so the overflow is unreachable — fine for decoration, an accessibility failure for real content. `auto` shows a scrollbar only when needed, which is the usual right choice. `scroll` always reserves scrollbar space, which prevents a layout shift when content grows but shows an empty track otherwise. Note `overflow: hidden` on an ancestor silently breaks `position: sticky` on a descendant, which is a very common confusing bug.',
      hinglish:
        '`hidden` content ko bina scrollbar ke kaat deta hai, isliye bahar ka hissa pahunch se bahar hai — sajaawat ke liye theek, asli content ke liye ek accessibility failure. `auto` ek scrollbar sirf zaroorat pe dikhata hai, jo usual sahi choice hai. `scroll` hamesha scrollbar ki jagah rakhta hai, jo content badhne pe ek layout shift rokta hai par warna ek khaali patti dikhata hai. Note karo ek poorvaj pe `overflow: hidden` ek santaan pe `position: sticky` ko chupke se todta hai, jo ek bahut common uljhaane wala bug hai.',
    },
  },
  {
    question: 'How does CSS inheritance work?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Some properties inherit from parent to child automatically — mostly text-related ones such as `color`, `font-family`, `font-size`, `line-height`, and `visibility`. Box-model properties such as `margin`, `padding`, `border`, and `background` do NOT. You can force it with the `inherit` keyword, reset with `initial`, or use `unset`, which means inherit for inheritable properties and initial otherwise. `all: revert` resets an element to the browser default, which is useful when isolating a component.',
      hinglish:
        'Kuch properties parent se child mein apne aap inherit hoti hain — zyadatar text se judi jaise `color`, `font-family`, `font-size`, `line-height`, aur `visibility`. Box-model properties jaise `margin`, `padding`, `border`, aur `background` NAHI hoti. Tum `inherit` keyword se majboor kar sakte ho, `initial` se reset, ya `unset` use kar sakte ho, jiska matlab inherit hone wali properties ke liye inherit aur baaki ke liye initial hai. `all: revert` ek element ko browser default pe reset karta hai, jo ek component alag karte waqt useful hai.',
    },
  },
  {
    question: 'What is the difference between a CSS reset and normalize?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'A RESET strips all default browser styling to zero, giving a blank slate but meaning you must restyle everything, including sensible defaults such as heading sizes and list markers. NORMALIZE instead makes defaults CONSISTENT across browsers while preserving useful ones. Modern practice is usually a small custom reset — `box-sizing: border-box`, removing default margins, `img { max-width: 100% }` — rather than a large library, since browser differences are far smaller than they once were.',
      hinglish:
        'Ek RESET saari default browser styling zero kar deta hai, ek khaali slate dete hue par matlab tumhe sab kuch dobara style karna padega, including heading sizes aur list markers jaise samajhdaar defaults. NORMALIZE uske bajaye defaults ko browsers ke across EK JAISA banata hai jabki kaam ke defaults bachata hai. Modern practice usually ek chhota custom reset hai — `box-sizing: border-box`, default margins hataana, `img { max-width: 100% }` — ek badi library ke bajaye, kyunki browser ke farak pehle se bahut kam hain.',
    },
  },
  {
    question: 'What is the aspect-ratio property?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`aspect-ratio: 16 / 9` makes an element size one dimension from the other, replacing the old padding-top percentage hack entirely. Its practical importance is preventing LAYOUT SHIFT: reserving the correct space for an image or video before it loads stops content jumping, which directly improves Cumulative Layout Shift. Combine it with `object-fit: cover` so an image fills the box without distortion when its natural ratio differs.',
      hinglish:
        '`aspect-ratio: 16 / 9` ek element ko ek aayaam se doosra size lene deta hai, purane padding-top pratishat jugaad ko poori tarah badalte hue. Iska vyavaharik mahatva LAYOUT SHIFT rokna hai: ek image ya video ke liye load hone se pehle sahi jagah rakhna content ko koodne se rokta hai, jo seedha Cumulative Layout Shift behtar karta hai. Ise `object-fit: cover` ke saath jodo taaki ek image apna asli anupaat alag hone pe bhi bina bigde box bhar de.',
    },
  },
  {
    question: 'What are logical properties in CSS?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Logical properties describe position relative to the WRITING DIRECTION rather than physical screen edges — `margin-inline-start` instead of `margin-left`, `padding-block` instead of top and bottom. In a right-to-left language such as Arabic or Urdu, `margin-left` stays on the physical left and breaks the layout, whereas `margin-inline-start` flips automatically. For any internationalised site they remove an entire category of RTL bugs, and they are well supported now.',
      hinglish:
        'Logical properties bhautik screen kinaaron ke bajaye LIKHNE KI DISHA ke sapeksh jagah batati hain — `margin-left` ke bajaye `margin-inline-start`, upar-neeche ke bajaye `padding-block`. Arabic ya Urdu jaisi daaye-se-baaye language mein, `margin-left` bhautik baaye pe rehta hai aur layout todta hai, jabki `margin-inline-start` apne aap palat jaata hai. Kisi bhi antarrashtriya site ke liye ye RTL bugs ki ek poori shreni hata dete hain, aur ab ye achhe se supported hain.',
    },
  },
  {
    question: 'How do you debug a CSS layout problem?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Open DevTools and inspect the COMPUTED styles rather than the ones you wrote — that shows what actually applied and, crucially, which rule overrode yours. Use the layout overlays for flex and grid to see the actual tracks and gaps. Temporarily add an outline to every element to reveal unexpected boxes. For a stubborn stacking or sticky bug, walk up the ANCESTOR chain checking for `overflow`, `transform`, and `opacity`, since those are usually the cause rather than the element itself.',
      hinglish:
        'DevTools kholo aur jo tumne likha uske bajaye COMPUTED styles dekho — wo dikhata hai ki actually kya laga aur, critically, kaunse rule ne tumhara override kiya. Asli tracks aur gaps dekhne ke liye flex aur grid ke layout overlays use karo. Anaapekshit boxes dikhane ke liye kuch der har element pe ek outline lagao. Ek zid ki stacking ya sticky bug ke liye, POORVAJ chain upar chalo aur `overflow`, `transform`, aur `opacity` dekho, kyunki karan usually element khud ke bajaye wo hi hote hain.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];
