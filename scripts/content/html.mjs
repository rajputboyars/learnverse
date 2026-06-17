// HTML fundamentals curriculum — beginner → intermediate.
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
  title: 'HTML',
  slug: 'html',
  description:
    'Web ki neenv — HTML basics se forms tak. Har concept English + Hinglish mein, desi examples, code aur interview questions ke saath.',
  icon: '🧱',
  tags: ['html', 'frontend', 'web'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 2,
};

const beginner = [
  {
    title: 'HTML Basics',
    level: 'beginner',
    description: 'HTML kya hai, document ka structure, elements aur attributes.',
    concepts: [
      {
        title: 'What is HTML',
        difficulty: 'easy',
        tags: ['intro', 'basics'],
        explanation: {
          english:
            'HTML (HyperText Markup Language) is the standard language to build the structure of web pages. It is not a programming language — it uses tags to mark up content like headings, paragraphs, images, and links so the browser knows what each piece is.',
          hinglish:
            'HTML (HyperText Markup Language) web pages ka structure banane ki standard language hai. Ye programming language nahi hai — ye tags use karke content ko mark karti hai jaise headings, paragraphs, images, links, taaki browser samajh sake ki har cheez kya hai.',
        },
        dailyLifeExample:
          'HTML ek ghar ka dhaancha (skeleton) hai — deewarein, darwaze, khidkiyan. CSS paint aur sajawat hai, JavaScript bijli aur darwaza kholne wali machine. Bina HTML ke kuch khada hi nahi hota.',
        codeExample:
          '<h1>Welcome to Learnverse</h1>\n<p>This is a paragraph of text.</p>\n<a href="https://example.com">A link</a>\n<img src="logo.png" alt="Logo" />',
        keyPoints: [
          'HTML = structure of a web page',
          'It is a markup language, not programming',
          'Content is wrapped in tags',
          'Browsers render HTML into what you see',
        ],
        quiz: [
          {
            question: 'What does HTML stand for?',
            options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Machine Language'],
            correctIndex: 0,
          },
          {
            question: 'HTML is a…',
            options: ['Programming language', 'Markup language', 'Database', 'Styling language'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Is HTML a programming language? Why or why not?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'No. HTML is a markup language — it describes and structures content using tags but has no logic, variables, loops, or conditionals. Programming languages can compute and make decisions; HTML only defines what content is.',
              hinglish:
                'Nahi. HTML ek markup language hai — ye tags se content ko describe aur structure karti hai par isme logic, variables, loops, conditionals nahi hote. Programming languages calculation aur decisions kar sakti hain; HTML sirf batati hai ki content kya hai.',
            },
          },
        ],
      },
      {
        title: 'HTML Document Structure',
        difficulty: 'easy',
        tags: ['structure', 'boilerplate'],
        explanation: {
          english:
            'Every HTML page follows a standard skeleton: <!DOCTYPE html> declares HTML5, <html> wraps everything, <head> holds metadata (title, links, meta) the user does not see directly, and <body> holds the visible content.',
          hinglish:
            'Har HTML page ek standard skeleton follow karta hai: <!DOCTYPE html> HTML5 declare karta hai, <html> sab kuch wrap karta hai, <head> metadata rakhta hai (title, links, meta) jo seedha dikhta nahi, aur <body> dikhne wala content rakhta hai.',
        },
        dailyLifeExample:
          'Document structure ek chitthi (letter) jaisa hai: lifaafa upar address/info (head) rakhta hai, andar ka likha hua message (body) padhne wala dekhta hai.',
        codeExample:
          '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>',
        keyPoints: [
          '<!DOCTYPE html> = HTML5 declaration',
          '<head> = metadata (not visible content)',
          '<body> = visible content',
          'lang and charset help browsers & accessibility',
        ],
        quiz: [
          {
            question: 'Which part holds the visible content of the page?',
            options: ['<head>', '<body>', '<meta>', '<title>'],
            correctIndex: 1,
          },
          {
            question: 'What does <!DOCTYPE html> declare?',
            options: ['CSS version', 'HTML5 document', 'A comment', 'The title'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Elements, Tags & Attributes',
        difficulty: 'easy',
        tags: ['elements', 'attributes'],
        explanation: {
          english:
            'An element is a piece of content with an opening tag, content, and closing tag (<p>Hello</p>). Some elements are self-closing (<img />). Attributes go in the opening tag and give extra info (like href, src, class) as name="value" pairs.',
          hinglish:
            'Element ek content ka tukda hai jisme opening tag, content, aur closing tag hota hai (<p>Hello</p>). Kuch elements self-closing hote hain (<img />). Attributes opening tag mein aate hain aur extra info dete hain (jaise href, src, class) name="value" pairs ki tarah.',
        },
        dailyLifeExample:
          'Tag ek gift ka dabba hai, content andar ka gift, aur attributes dabbe pe lage stickers jo batate hain "fragile", "kiska hai" — extra jaankari.',
        codeExample:
          '<a href="https://learnverse.dev" target="_blank">Visit</a>\n<!-- a = tag, href/target = attributes, "Visit" = content -->\n\n<img src="cat.jpg" alt="A cat" width="200" />',
        keyPoints: [
          'Element = open tag + content + close tag',
          'Self-closing elements: img, br, hr, input',
          'Attributes add info: name="value"',
          'Common attributes: id, class, href, src, alt',
        ],
        quiz: [
          {
            question: 'Where do attributes go?',
            options: ['In the closing tag', 'In the opening tag', 'Outside the element', 'In the head only'],
            correctIndex: 1,
          },
          {
            question: 'Which is a self-closing element?',
            options: ['<p>', '<div>', '<img />', '<span>'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Headings & Paragraphs',
        difficulty: 'easy',
        tags: ['text', 'structure'],
        explanation: {
          english:
            'Headings <h1> to <h6> define a content hierarchy — <h1> is the most important (usually the page title), down to <h6>. Paragraphs <p> hold blocks of text. Using headings in order is important for SEO and accessibility.',
          hinglish:
            'Headings <h1> se <h6> tak content ki hierarchy banati hain — <h1> sabse important (aksar page ka title), <h6> tak. Paragraphs <p> text ke blocks rakhte hain. Headings ko order mein use karna SEO aur accessibility ke liye zaroori hai.',
        },
        dailyLifeExample:
          'Headings ek newspaper jaise hain: <h1> mukhya khabar ka bada title, <h2> section ke titles, <h3> chhoti khabrein. Reader ek nazar mein structure samajh leta hai.',
        codeExample:
          '<h1>Main Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>\n<p>This is a paragraph explaining the section.</p>',
        keyPoints: [
          '<h1>–<h6>: heading hierarchy',
          'One <h1> per page is best practice',
          'Do not skip levels for styling — use CSS instead',
          '<p> for blocks of text',
        ],
        quiz: [
          {
            question: 'Which heading is the most important?',
            options: ['<h6>', '<h1>', '<h3>', 'all equal'],
            correctIndex: 1,
          },
          {
            question: 'How many heading levels does HTML have?',
            options: ['3', '6', '10', 'unlimited'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Text & Formatting',
    level: 'beginner',
    description: 'Text ko style aur meaning dena — bold, italic, quotes.',
    concepts: [
      {
        title: 'Text Formatting Tags',
        difficulty: 'easy',
        tags: ['text', 'formatting'],
        explanation: {
          english:
            'HTML separates look from meaning. <strong> and <em> carry meaning (importance, emphasis) and are read by screen readers, while <b> and <i> only change appearance. Prefer the semantic ones (<strong>, <em>).',
          hinglish:
            'HTML look aur meaning ko alag karta hai. <strong> aur <em> meaning dete hain (importance, emphasis) aur screen readers inhe padhte hain, jabki <b> aur <i> sirf dikhawat badalte hain. Semantic wale (<strong>, <em>) prefer karo.',
        },
        dailyLifeExample:
          '<strong> guru ka "ye zaroori hai, dhyaan do" jaisa hai (matlab ke saath). <b> sirf marker se line kheenchna hai — dikhne mein bold, par koi extra meaning nahi.',
        codeExample:
          '<p>This is <strong>very important</strong> and this is <em>emphasised</em>.</p>\n<p>Just visual: <b>bold</b> and <i>italic</i>.</p>\n<p>H<sub>2</sub>O and E=mc<sup>2</sup></p>',
        keyPoints: [
          '<strong>/<em>: semantic (meaning + a11y)',
          '<b>/<i>: visual only',
          '<sub>/<sup>: subscript/superscript',
          '<mark> highlights text',
        ],
        quiz: [
          {
            question: 'Which tag carries semantic importance (read by screen readers)?',
            options: ['<b>', '<strong>', '<i>', '<big>'],
            correctIndex: 1,
          },
          {
            question: '<em> is used for…',
            options: ['Emphasis (meaning)', 'Just italic look', 'A link', 'A list'],
            correctIndex: 0,
          },
        ],
      },
      {
        title: 'Line Breaks, Rules & Comments',
        difficulty: 'easy',
        tags: ['text', 'comments'],
        explanation: {
          english:
            '<br> inserts a line break, <hr> draws a thematic horizontal rule, and comments <!-- ... --> are notes ignored by the browser. Comments help you and your team understand the code; they are not shown on the page.',
          hinglish:
            '<br> ek line break daalta hai, <hr> ek thematic horizontal line kheenchta hai, aur comments <!-- ... --> aise notes hain jinhe browser ignore karta hai. Comments tumhe aur team ko code samajhne mein madad karte hain; page pe dikhte nahi.',
        },
        dailyLifeExample:
          'Comment ek pencil note jaisa hai jo tum kitaab ke margin mein likhte ho — sirf tumhare liye, chhapa hua content nahi badalta.',
        codeExample:
          '<p>Line one<br />Line two</p>\n<hr />\n<!-- This is a comment, not shown on the page -->\n<p>After the rule.</p>',
        keyPoints: [
          '<br>: a single line break',
          '<hr>: thematic horizontal rule',
          '<!-- comment -->: ignored by browser',
          'Do not overuse <br> for spacing — use CSS',
        ],
        quiz: [
          {
            question: 'Which inserts a line break?',
            options: ['<hr>', '<br>', '<p>', '<lb>'],
            correctIndex: 1,
          },
          {
            question: 'Are HTML comments shown on the page?',
            options: ['Yes', 'No', 'Only headings', 'Only in head'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Links & Images',
    level: 'beginner',
    description: 'Pages ko jodna aur media dikhana.',
    concepts: [
      {
        title: 'Links (Anchor Tag)',
        difficulty: 'easy',
        tags: ['links', 'navigation'],
        explanation: {
          english:
            'The <a> (anchor) tag creates hyperlinks using the href attribute. It can link to other pages, sections on the same page (#id), email (mailto:), or phone (tel:). target="_blank" opens the link in a new tab.',
          hinglish:
            '<a> (anchor) tag href attribute se hyperlinks banata hai. Ye doosre pages, same page ke sections (#id), email (mailto:), ya phone (tel:) se link kar sakta hai. target="_blank" link ko naye tab mein kholta hai.',
        },
        dailyLifeExample:
          'Link ek darwaza jaisa hai jo ek kamre se doosre kamre (page) le jaata hai. href address hai ki darwaza kahan khulega.',
        codeExample:
          '<a href="about.html">About page</a>\n<a href="#contact">Jump to contact</a>\n<a href="mailto:hi@learnverse.dev">Email us</a>\n<a href="https://x.com" target="_blank" rel="noopener">New tab</a>',
        keyPoints: [
          '<a href="..."> creates a link',
          '#id links to a section on the page',
          'target="_blank" opens a new tab',
          'Add rel="noopener" with _blank for security',
        ],
        quiz: [
          {
            question: 'Which attribute holds the link destination?',
            options: ['src', 'href', 'link', 'url'],
            correctIndex: 1,
          },
          {
            question: 'How do you open a link in a new tab?',
            options: ['new="tab"', 'target="_blank"', 'open="new"', 'tab="new"'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Images',
        difficulty: 'easy',
        tags: ['images', 'media'],
        explanation: {
          english:
            'The <img> tag embeds an image. src points to the file, and alt gives alternative text shown if the image fails and read by screen readers — alt is essential for accessibility and SEO. width/height help reserve space and avoid layout shift.',
          hinglish:
            '<img> tag ek image embed karta hai. src file ko point karta hai, aur alt alternative text deta hai jo image fail hone par dikhta hai aur screen readers padhte hain — alt accessibility aur SEO ke liye zaroori hai. width/height space reserve karke layout shift rokte hain.',
        },
        dailyLifeExample:
          'alt text ek photo ke peeche likhe caption jaisa hai — agar koi photo na dekh paaye (blind user ya slow net), caption se samajh aata hai photo mein kya hai.',
        codeExample:
          '<img src="puppy.jpg" alt="A brown puppy playing" width="300" height="200" />\n<!-- alt is read aloud by screen readers -->',
        keyPoints: [
          'src = image path, alt = description',
          'alt is vital for accessibility & SEO',
          'Set width/height to prevent layout shift',
          '<img> is self-closing',
        ],
        quiz: [
          {
            question: 'Why is the alt attribute important?',
            options: ['It styles the image', 'Accessibility & SEO (describes the image)', 'It links the image', 'It is optional and useless'],
            correctIndex: 1,
          },
          {
            question: 'Which attribute sets the image source?',
            options: ['href', 'link', 'src', 'path'],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'Why should every <img> have an alt attribute?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'alt provides a text alternative shown when the image cannot load and read aloud by screen readers, making content accessible to visually impaired users. It also helps search engines understand the image, improving SEO. Decorative images can use an empty alt="".',
              hinglish:
                'alt ek text alternative deta hai jo image load na hone par dikhta hai aur screen readers padhte hain, jisse content visually impaired users ke liye accessible banta hai. Ye search engines ko bhi image samajhne mein madad karta hai (SEO). Decorative images ke liye khaali alt="" use kar sakte ho.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Lists & Tables',
    level: 'beginner',
    description: 'Data ko list aur table mein dikhana.',
    concepts: [
      {
        title: 'Lists (ul, ol, dl)',
        difficulty: 'easy',
        tags: ['lists'],
        explanation: {
          english:
            'HTML has three list types: <ul> unordered (bullets), <ol> ordered (numbers), and <dl> description lists (term + definition). List items go in <li> (or <dt>/<dd> for description lists). Lists can be nested.',
          hinglish:
            'HTML mein teen list types hain: <ul> unordered (bullets), <ol> ordered (numbers), aur <dl> description lists (term + definition). List items <li> mein aate hain (ya description lists ke liye <dt>/<dd>). Lists nested ho sakti hain.',
        },
        dailyLifeExample:
          '<ul> grocery list jaisa (order matter nahi karta), <ol> recipe ke steps jaisa (order zaroori hai), <dl> dictionary jaisa (shabd + matlab).',
        codeExample:
          '<ul>\n  <li>Milk</li>\n  <li>Bread</li>\n</ul>\n<ol>\n  <li>Boil water</li>\n  <li>Add tea</li>\n</ol>',
        keyPoints: [
          '<ul>: unordered (bullets)',
          '<ol>: ordered (numbers)',
          '<dl>: description (term/definition)',
          'Items use <li>; lists can nest',
        ],
        quiz: [
          {
            question: 'Which list shows numbered items?',
            options: ['<ul>', '<ol>', '<dl>', '<li>'],
            correctIndex: 1,
          },
          {
            question: 'List items are wrapped in…',
            options: ['<item>', '<li>', '<list>', '<p>'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Tables',
        difficulty: 'medium',
        tags: ['tables', 'data'],
        explanation: {
          english:
            'Tables display tabular data. <table> wraps it, <tr> is a row, <th> a header cell, and <td> a data cell. Use <thead>, <tbody>, and <tfoot> to structure it. Tables are for data, not for page layout (use CSS for layout).',
          hinglish:
            'Tables tabular data dikhate hain. <table> wrap karta hai, <tr> ek row, <th> header cell, aur <td> data cell. Structure ke liye <thead>, <tbody>, <tfoot> use karo. Tables data ke liye hain, page layout ke liye nahi (layout ke liye CSS).',
        },
        dailyLifeExample:
          'Table ek railway timetable jaisa hai — rows (trains) aur columns (time, platform). Har cell ek specific jaankari deta hai.',
        codeExample:
          '<table>\n  <thead>\n    <tr><th>Name</th><th>Age</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Abhi</td><td>24</td></tr>\n  </tbody>\n</table>',
        keyPoints: [
          '<table> > <tr> (row) > <td>/<th> (cells)',
          '<th> = header cell (bold, semantic)',
          'Group with <thead>/<tbody>/<tfoot>',
          'Use tables for data, not layout',
        ],
        quiz: [
          {
            question: 'Which tag defines a table row?',
            options: ['<td>', '<tr>', '<th>', '<row>'],
            correctIndex: 1,
          },
          {
            question: 'A header cell uses…',
            options: ['<td>', '<th>', '<thead>', '<header>'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'Forms',
    level: 'intermediate',
    description: 'User se input lena — forms, inputs, labels.',
    concepts: [
      {
        title: 'Forms Basics',
        difficulty: 'medium',
        tags: ['forms', 'input'],
        explanation: {
          english:
            'A <form> collects user input and sends it somewhere. The action attribute is the URL it submits to, and method is GET (data in URL) or POST (data in body). Inside, you place inputs, a submit button, etc.',
          hinglish:
            'Ek <form> user input collect karke kahin bhejta hai. action attribute wo URL hai jahan submit hota hai, aur method GET (data URL mein) ya POST (data body mein) hota hai. Andar inputs, submit button, etc. rakhte ho.',
        },
        dailyLifeExample:
          'Form ek bank application form jaisa hai — tum bharte ho, submit karte ho, aur wo process hone chala jaata hai. action = kis counter pe jaayega, method = kaise bheja jaayega.',
        codeExample:
          '<form action="/submit" method="POST">\n  <input type="text" name="username" />\n  <input type="password" name="pass" />\n  <button type="submit">Login</button>\n</form>',
        keyPoints: [
          '<form> collects and submits input',
          'action = where it goes, method = GET/POST',
          'GET puts data in the URL; POST in the body',
          'name attribute identifies each field',
        ],
        quiz: [
          {
            question: 'Which method sends form data in the URL?',
            options: ['POST', 'GET', 'PUT', 'SEND'],
            correctIndex: 1,
          },
          {
            question: 'The action attribute specifies…',
            options: ['The button text', 'Where the form submits', 'The font', 'The method'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Difference between GET and POST methods in a form?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'GET appends data to the URL as query strings — visible, bookmarkable, limited in length, and meant for safe/idempotent reads. POST sends data in the request body — not visible in the URL, no size limit, and meant for actions that change data (login, signup). Sensitive data should use POST (over HTTPS).',
              hinglish:
                'GET data ko URL mein query string ki tarah jodta hai — visible, bookmarkable, length limited, aur safe/idempotent reads ke liye. POST data ko request body mein bhejta hai — URL mein nahi dikhta, size limit nahi, aur data change karne wale actions (login, signup) ke liye. Sensitive data POST (HTTPS pe) se bhejo.',
            },
          },
        ],
      },
      {
        title: 'Input Types & Attributes',
        difficulty: 'medium',
        tags: ['forms', 'input'],
        explanation: {
          english:
            'The <input> element changes behaviour based on its type: text, email, password, number, checkbox, radio, date, file, and more. Useful attributes include placeholder, value, required, disabled, and readonly. Other controls are <textarea> and <select>.',
          hinglish:
            '<input> element apne type ke hisaab se behaviour badalta hai: text, email, password, number, checkbox, radio, date, file, aur bahut kuch. Kaam ke attributes: placeholder, value, required, disabled, readonly. Doosre controls <textarea> aur <select> hain.',
        },
        dailyLifeExample:
          'Input types ek form ke alag-alag khaane jaise hain — koi tick-box (checkbox), koi gol bubble (radio), koi calendar (date). Sahi khaana sahi data leta hai.',
        codeExample:
          '<input type="email" placeholder="you@mail.com" required />\n<input type="checkbox" id="tnc" />\n<input type="radio" name="gender" value="m" />\n<select>\n  <option>India</option>\n</select>',
        keyPoints: [
          'type controls input behaviour & validation',
          'placeholder = hint text, value = default',
          'required, disabled, readonly attributes',
          '<textarea> for multi-line, <select> for dropdowns',
        ],
        quiz: [
          {
            question: 'Which input type creates a single-choice circular button?',
            options: ['checkbox', 'radio', 'select', 'toggle'],
            correctIndex: 1,
          },
          {
            question: 'Which attribute shows hint text inside an input?',
            options: ['hint', 'placeholder', 'value', 'title'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Labels & Accessibility',
        difficulty: 'medium',
        tags: ['forms', 'accessibility'],
        explanation: {
          english:
            'A <label> describes a form control. Linking a label to an input (via for="id" or by wrapping it) makes clicking the label focus the input, and lets screen readers announce the field. Always label your inputs — it is core accessibility.',
          hinglish:
            'Ek <label> form control ko describe karta hai. Label ko input se jodna (for="id" se ya wrap karke) se label pe click karne par input focus ho jaata hai, aur screen readers field ko announce karte hain. Hamesha inputs ko label do — ye core accessibility hai.',
        },
        dailyLifeExample:
          'Label ek dabbe ke upar laga naam-sticker jaisa hai — bina label ke pata hi nahi chalega kis khaane mein kya bharna hai, khaaskar jo dekh na sake unke liye.',
        codeExample:
          '<label for="email">Email</label>\n<input id="email" type="email" />\n\n<!-- or wrapping -->\n<label>\n  Name <input type="text" />\n</label>',
        keyPoints: [
          '<label for="id"> links to <input id="id">',
          'Clicking the label focuses the input',
          'Screen readers announce the labelled field',
          'Always label inputs for accessibility',
        ],
        quiz: [
          {
            question: 'How do you link a label to an input?',
            options: ['label name="id"', 'for="id" matching input id', 'link="id"', 'They link automatically'],
            correctIndex: 1,
          },
          {
            question: 'Clicking a properly linked label will…',
            options: ['Do nothing', 'Focus the associated input', 'Submit the form', 'Delete the input'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Semantic HTML & Structure',
    level: 'intermediate',
    description: 'Meaningful structure — semantic tags, block vs inline.',
    concepts: [
      {
        title: 'Div, Span & Block vs Inline',
        difficulty: 'medium',
        tags: ['layout', 'elements'],
        explanation: {
          english:
            '<div> is a generic block container (takes full width, starts on a new line); <span> is a generic inline container (flows within text). Block elements stack vertically; inline elements sit side by side. Use div/span only when no semantic tag fits.',
          hinglish:
            '<div> ek generic block container hai (puri width leta hai, nayi line se shuru); <span> ek generic inline container hai (text ke andar behta hai). Block elements vertically stack hote hain; inline side by side. div/span tabhi use karo jab koi semantic tag fit na ho.',
        },
        dailyLifeExample:
          'Block element ek poori almari jaisa hai jo apni alag jagah leti hai. Inline element ek shabd ke beech highlighter jaisa hai jo line ke andar hi rehta hai.',
        codeExample:
          '<div>I am a block — full width, new line.</div>\n<p>Text with an <span style="color:red">inline</span> word.</p>',
        keyPoints: [
          '<div> = generic block, <span> = generic inline',
          'Block: full width, new line, stacks',
          'Inline: flows within text, side by side',
          'Prefer semantic tags over div/span when possible',
        ],
        quiz: [
          {
            question: 'Which is an inline element?',
            options: ['<div>', '<p>', '<span>', '<section>'],
            correctIndex: 2,
          },
          {
            question: 'A block element by default…',
            options: ['Sits inside a line', 'Takes full width & starts a new line', 'Is invisible', 'Cannot be styled'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Semantic Elements',
        difficulty: 'medium',
        tags: ['semantic', 'seo', 'accessibility'],
        explanation: {
          english:
            'Semantic elements describe their meaning: <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer>. They replace meaningless <div> soup, improving accessibility (screen readers navigate by them) and SEO (search engines understand structure).',
          hinglish:
            'Semantic elements apna matlab batate hain: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>. Ye bekaar <div> soup ki jagah lete hain, accessibility (screen readers inse navigate karte hain) aur SEO (search engines structure samajhte hain) behtar karte hain.',
        },
        dailyLifeExample:
          'Semantic tags ek ghar ke kamron ke naam jaise hain — kitchen, bedroom, hall. "Room1, Room2" (div) se behtar hai naam dena taaki sab samajh sakein kaunsa kamra kis kaam ka hai.',
        codeExample:
          '<header>Logo + nav</header>\n<nav>Menu links</nav>\n<main>\n  <article>A blog post</article>\n  <aside>Related links</aside>\n</main>\n<footer>Copyright</footer>',
        keyPoints: [
          'Semantic = meaningful structure tags',
          'Better accessibility & SEO than div soup',
          '<main> holds the primary content (one per page)',
          '<article> is self-contained; <section> groups content',
        ],
        quiz: [
          {
            question: 'Why use semantic elements over generic divs?',
            options: ['They look nicer', 'Better accessibility & SEO', 'They are required', 'They are faster to type'],
            correctIndex: 1,
          },
          {
            question: 'Which holds the primary page content?',
            options: ['<aside>', '<main>', '<footer>', '<nav>'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is semantic HTML and why does it matter?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'Semantic HTML uses tags that convey the meaning of content (header, nav, main, article, footer) instead of generic divs. It matters because it improves accessibility (assistive tech can navigate landmarks), SEO (search engines better understand the page), and maintainability (clearer, self-documenting markup).',
              hinglish:
                'Semantic HTML aise tags use karta hai jo content ka matlab batate hain (header, nav, main, article, footer), generic divs ki jagah. Ye matter karta hai kyunki accessibility behtar hoti hai (assistive tech landmarks se navigate karta hai), SEO behtar (search engines page achhe se samajhte hain), aur maintainability (saaf, self-documenting markup).',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Head, Meta & Linking',
    level: 'intermediate',
    description: 'Page ki info — meta tags, SEO, CSS/JS jodna.',
    concepts: [
      {
        title: 'Meta Tags & SEO Basics',
        difficulty: 'medium',
        tags: ['meta', 'seo'],
        explanation: {
          english:
            'Meta tags live in <head> and give information about the page. <meta charset>, the <title>, <meta name="description">, and <meta name="viewport"> are key. The description shows in search results, and viewport makes the page responsive on mobile.',
          hinglish:
            'Meta tags <head> mein hote hain aur page ke baare mein info dete hain. <meta charset>, <title>, <meta name="description">, aur <meta name="viewport"> important hain. Description search results mein dikhti hai, aur viewport page ko mobile pe responsive banata hai.',
        },
        dailyLifeExample:
          'Meta tags ek kitaab ke peeche likha summary aur barcode jaise hain — reader (Google) ko jaldi se bata dete hain kitaab kis baare mein hai, bina poori padhe.',
        codeExample:
          '<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n  <title>Learnverse — Learn in Hinglish</title>\n  <meta name="description" content="Programming concepts in Hinglish." />\n</head>',
        keyPoints: [
          'Meta tags describe the page (in <head>)',
          'description appears in search results',
          'viewport enables mobile responsiveness',
          'title is shown in the tab & search results',
        ],
        quiz: [
          {
            question: 'Which meta tag enables mobile responsiveness?',
            options: ['charset', 'viewport', 'description', 'keywords'],
            correctIndex: 1,
          },
          {
            question: 'Where do meta tags go?',
            options: ['<body>', '<head>', '<footer>', '<main>'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Linking CSS, JS & Favicon',
        difficulty: 'easy',
        tags: ['linking', 'assets'],
        explanation: {
          english:
            'Link a stylesheet with <link rel="stylesheet" href="style.css"> in the head. Add JavaScript with <script src="app.js"></script> — placing it at the end of body (or using defer) avoids blocking page render. A favicon is the small tab icon, linked with <link rel="icon">.',
          hinglish:
            'Stylesheet ko head mein <link rel="stylesheet" href="style.css"> se jodo. JavaScript <script src="app.js"></script> se — ise body ke end mein rakhna (ya defer use karna) page render ko block hone se bachata hai. Favicon tab ka chhota icon hai, <link rel="icon"> se jodte hain.',
        },
        dailyLifeExample:
          'CSS/JS linking ek ghar mein bijli aur paani ka connection lena jaisa hai — dhaancha (HTML) to ban gaya, ab usme services jodni hain. defer = "pehle ghar ready ho, phir bijli chalu karo".',
        codeExample:
          '<head>\n  <link rel="icon" href="favicon.ico" />\n  <link rel="stylesheet" href="style.css" />\n</head>\n<body>\n  <!-- content -->\n  <script src="app.js" defer></script>\n</body>',
        keyPoints: [
          'CSS: <link rel="stylesheet"> in head',
          'JS: <script src> — use defer or place at body end',
          'defer loads JS without blocking render',
          'Favicon via <link rel="icon">',
        ],
        quiz: [
          {
            question: 'How do you include an external CSS file?',
            options: ['<css>', '<style src>', '<link rel="stylesheet" href>', '<script>'],
            correctIndex: 2,
          },
          {
            question: 'What does defer on a script do?',
            options: ['Deletes it', 'Loads JS without blocking page render', 'Runs it first', 'Hides it'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between HTML elements and tags?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A tag is the markup token like <p> or </p>. An element is the complete unit — the opening tag, the content, and the closing tag together (<p>Hello</p>). Void elements like <img> have no closing tag or content.',
      hinglish:
        'Tag markup token hai jaise <p> ya </p>. Element poora unit hai — opening tag, content, aur closing tag ek saath (<p>Hello</p>). Void elements jaise <img> mein closing tag ya content nahi hota.',
    },
  },
  {
    question: 'What is the difference between id and class attributes?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'An id is unique — only one element per page should have a given id — and is used for a single target (anchor links, JS getElementById). A class can be reused on many elements and is used to apply shared styling or grouping. An element can have multiple classes but one id.',
      hinglish:
        'id unique hoti hai — ek page pe ek hi element ke paas wo id honi chahiye — aur single target ke liye (anchor links, JS getElementById). class kai elements pe reuse ho sakti hai aur shared styling ya grouping ke liye. Ek element ke paas kai classes par ek id ho sakti hai.',
    },
  },
  {
    question: 'What are void (self-closing) elements? Give examples.',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        'Void elements have no content and no closing tag — they cannot wrap anything. Examples: <img>, <br>, <hr>, <input>, <meta>, and <link>. In HTML5 the trailing slash (<br/>) is optional.',
      hinglish:
        'Void elements mein content aur closing tag nahi hota — ye kuch wrap nahi kar sakte. Examples: <img>, <br>, <hr>, <input>, <meta>, <link>. HTML5 mein trailing slash (<br/>) optional hai.',
    },
  },
  {
    question: 'What is <!DOCTYPE html> in HTML5?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '<!DOCTYPE html> is the document type declaration that must appear at the very top of an HTML file. It tells the browser to render the page in standards mode (instead of quirks mode). In HTML5, this is simplified to just <!DOCTYPE html> — older HTML versions required long complex DTD strings. Without it, browsers may render pages differently across versions.',
      hinglish:
        '<!DOCTYPE html> ek document type declaration hai jo HTML file ke bilkul upar honi chahiye. Ye browser ko page standards mode mein render karne ko kehta hai (quirks mode ki jagah). HTML5 mein ye simple hokar sirf <!DOCTYPE html> ho gaya hai — purane HTML versions mein lambi complex DTD strings chahiye thi. Iske bina, browsers alag-alag versions mein pages differently render kar sakte hain.',
    },
  },
  {
    question: 'What is the difference between div and span in HTML?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'div is a block-level element — it starts on a new line and takes the full width available. span is an inline element — it only takes the width of its content and does not force a new line. Use div to group and structure sections of a page; use span to style a portion of text or inline content without breaking the flow.',
      hinglish:
        'div ek block-level element hai — ye new line pe shuru hota hai aur available poori width leta hai. span ek inline element hai — sirf apne content ki width leta hai aur new line force nahi karta. Page ke sections group karne aur structure karne ke liye div use karo; text ke ek hisse ya inline content ko bina flow todne ke style karne ke liye span use karo.',
    },
  },
  {
    question: 'What are semantic and non-semantic tags in HTML?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Semantic tags have meaningful names that describe their content and role: <header>, <nav>, <main>, <article>, <section>, <footer>, <aside>. They improve accessibility, SEO, and code readability. Non-semantic tags like <div> and <span> say nothing about their content — they are generic containers. Always prefer semantic tags where the meaning fits.',
      hinglish:
        'Semantic tags ke meaningful names hote hain jo content aur role describe karte hain: <header>, <nav>, <main>, <article>, <section>, <footer>, <aside>. Ye accessibility, SEO, aur code readability improve karte hain. Non-semantic tags jaise <div> aur <span> content ke baare mein kuch nahi kehte — ye generic containers hain. Jahan meaning fit ho wahan hamesha semantic tags prefer karo.',
    },
  },
  {
    question: 'What is the difference between HTML and HTML5?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'HTML5 introduced: semantic elements (<header>, <article>, etc.), multimedia support (<audio>, <video> without plugins), form enhancements (date pickers, validation attributes, placeholder), Canvas and SVG for graphics, Web Storage (localStorage/sessionStorage), Web Workers, WebSockets, and Geolocation APIs. The doctype was simplified to <!DOCTYPE html>. HTML5 also deprecated or removed presentational tags like <font>, <center>, and <big>.',
      hinglish:
        'HTML5 ne introduce kiya: semantic elements (<header>, <article>, etc.), multimedia support (<audio>, <video> bina plugins ke), form enhancements (date pickers, validation attributes, placeholder), graphics ke liye Canvas aur SVG, Web Storage (localStorage/sessionStorage), Web Workers, WebSockets, aur Geolocation APIs. Doctype simplified hokar <!DOCTYPE html> ho gaya. HTML5 ne presentational tags jaise <font>, <center>, <big> deprecate ya remove bhi kar diye.',
    },
  },
  {
    question: 'What is the iframe tag in HTML5?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The <iframe> (inline frame) tag embeds another HTML page inside the current page. Common uses: embedding YouTube videos, Google Maps, third-party widgets, or PDF documents. Important attributes: src (URL), width, height, title (accessibility), sandbox (restricts what the embedded content can do), and allow (controls permissions like camera, fullscreen). Iframes can be a security risk (clickjacking) — use the sandbox attribute to restrict them.',
      hinglish:
        '<iframe> (inline frame) tag current page ke andar ek aur HTML page embed karta hai. Common uses: YouTube videos, Google Maps, third-party widgets, ya PDF documents embed karna. Important attributes: src (URL), width, height, title (accessibility), sandbox (embedded content kya kar sakta hai restrict karta hai), aur allow (camera, fullscreen jaisi permissions control karta hai). Iframes ek security risk ho sakte hain (clickjacking) — unhe restrict karne ke liye sandbox attribute use karo.',
    },
  },
  {
    question: 'What are formatting tags in HTML?',
    difficulty: 'easy',
    frequency: 'rare',
    answer: {
      english:
        'HTML formatting tags add text styling with semantic meaning: <b> (bold, no extra importance), <strong> (bold + important — screen readers emphasise), <i> (italic, no extra meaning), <em> (italic + emphasis), <u> (underline), <s> / <del> (strikethrough — deleted text), <ins> (inserted text), <sup> (superscript), <sub> (subscript), <mark> (highlight), <small> (fine print), <code> (inline code), <pre> (preformatted text). Prefer semantic tags over purely presentational ones.',
      hinglish:
        'HTML formatting tags text styling ko semantic meaning ke saath add karte hain: <b> (bold, extra importance nahi), <strong> (bold + important — screen readers emphasise karte hain), <i> (italic, extra meaning nahi), <em> (italic + emphasis), <u> (underline), <s> / <del> (strikethrough — deleted text), <ins> (inserted text), <sup> (superscript), <sub> (subscript), <mark> (highlight), <small> (fine print), <code> (inline code), <pre> (preformatted text). Purely presentational ones se zyada semantic tags prefer karo.',
    },
  },
  {
    question: 'What is the difference between <b> and <strong> in HTML?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Both render text in bold visually, but they have different semantic meanings. <b> is purely presentational — bold text with no added importance. <strong> indicates that the text is of strong importance — screen readers may change their tone and SEO tools treat it differently. Always use <strong> when you want to convey importance; use <b> only for stylistic reasons with no semantic weight.',
      hinglish:
        'Dono visually text bold render karte hain, par unke alag semantic meanings hain. <b> purely presentational hai — koi added importance nahi, sirf bold. <strong> indicate karta hai text strong importance ka hai — screen readers apna tone badal sakte hain aur SEO tools ise differently treat karte hain. Importance convey karne ke liye hamesha <strong> use karo; <b> sirf tab use karo jab sirf stylistic reason ho, koi semantic weight nahi.',
    },
  },
  {
    question: 'What is the viewport meta tag in HTML?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '<meta name="viewport" content="width=device-width, initial-scale=1"> controls how a page is displayed on mobile devices. Without it, mobile browsers render the page at a desktop width and zoom out — making text tiny. width=device-width tells the browser to match the screen width; initial-scale=1 sets the initial zoom to 100%. This is essential for responsive design.',
      hinglish:
        '<meta name="viewport" content="width=device-width, initial-scale=1"> mobile devices pe page kaise display hoga ye control karta hai. Iske bina, mobile browsers page ko desktop width pe render karte hain aur zoom out karte hain — text bahut chhota ho jata hai. width=device-width browser ko screen width match karne kehta hai; initial-scale=1 initial zoom 100% set karta hai. Ye responsive design ke liye zaroori hai.',
    },
  },
  {
    question: 'What is an attribute in HTML?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'An attribute provides additional information about an HTML element and is placed inside the opening tag as name="value" pairs. Examples: href in <a>, src in <img>, class, id, style, type, placeholder, disabled, required. Some attributes are boolean (just their presence is enough, e.g. disabled, required) — they do not need a value. Global attributes like class, id, style, and data-* work on any element.',
      hinglish:
        'Attribute ek HTML element ke baare mein additional information provide karta hai aur opening tag ke andar name="value" pairs ke roop mein rakha jaata hai. Examples: <a> mein href, <img> mein src, class, id, style, type, placeholder, disabled, required. Kuch attributes boolean hote hain (sirf unki presence kaafi hoti hai, jaise disabled, required) — unhe value nahi chahiye. Global attributes jaise class, id, style, aur data-* kisi bhi element pe kaam karte hain.',
    },
  },
  {
    question: 'What is the difference between block-level and inline elements in HTML?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Block-level elements start on a new line and expand to fill the full width of their container. They can contain other block and inline elements. Examples: <div>, <p>, <h1>–<h6>, <ul>, <ol>, <table>, <form>, <section>. Inline elements flow within text without forcing a new line — they only take the width of their content. Examples: <span>, <a>, <img>, <strong>, <em>, <input>. In CSS, display:block and display:inline override the default.',
      hinglish:
        'Block-level elements new line pe shuru hote hain aur container ki poori width fill karte hain. Ye dusre block aur inline elements contain kar sakte hain. Examples: <div>, <p>, <h1>–<h6>, <ul>, <ol>, <table>, <form>, <section>. Inline elements text ke andar flow karte hain bina new line force kiye — sirf apne content ki width lete hain. Examples: <span>, <a>, <img>, <strong>, <em>, <input>. CSS mein display:block aur display:inline default override karte hain.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate];
