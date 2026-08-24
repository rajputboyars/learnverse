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
  icon: 'html',
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
          {
            question: 'Why is using an HTML <table> for overall PAGE LAYOUT (not tabular data) considered bad practice today?',
            options: [
              'Tables are deprecated and no longer work',
              'It hurts accessibility, responsiveness, and SEO — CSS Grid/Flexbox are the modern layout tools',
              'Tables cannot have more than 2 columns',
              'Browsers block table-based layouts entirely',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Special Characters & Global Attributes',
    level: 'beginner',
    description: 'Entities aur har element pe kaam aane wale attributes.',
    concepts: [
      {
        title: 'HTML Entities: Escaping Special Characters',
        difficulty: 'easy',
        tags: ['entities', 'basics'],
        explanation: {
          english:
            'Some characters have special meaning in HTML (< and > start tags, & starts an entity), so you cannot type them directly in text — the browser would try to parse them as markup. HTML entities are special codes starting with & and ending with ; that represent these characters: &lt; for <, &gt; for >, &amp; for &, &quot; for a quote, and &copy; for ©. Without escaping, your page can literally break.',
          hinglish:
            'Kuch characters ka HTML mein special matlab hota hai (< aur > tag shuru karte hain, & entity shuru karta hai), isliye unhe text mein seedha type nahi kar sakte — browser unhe markup samajh ke parse karne ki koshish karega. HTML entities special codes hain jo & se shuru aur ; pe khatam hote hain aur in characters ko represent karte hain: &lt; for <, &gt; for >, &amp; for &, &quot; for quote, aur &copy; for ©. Bina escape kiye, tumhara page literally toot sakta hai.',
        },
        dailyLifeExample:
          "Entities ek code-word jaisi hain jo restricted cheez ko safely bolne ka tareeka deti hain — jaise exam mein 'less than' bolne ke bajaye seedha '<' likhoge to teacher (browser) confuse ho jaayega ki naya tag shuru ho raha hai.",
        codeExample:
          '<!-- WRONG: browser thinks < starts a new tag -->\n<p>5 < 10 is true</p>  ❌ can break rendering\n\n<!-- CORRECT: escaped -->\n<p>5 &lt; 10 is true</p>  ✅\n<p>Copyright &copy; 2026 Learnverse</p>\n<p>Terms &amp; Conditions</p>\n<p>She said &quot;Hello&quot;</p>',
        keyPoints: [
          'Entities start with & and end with ;',
          '&lt; = <, &gt; = >, &amp; = &, &quot; = "',
          'Needed whenever you display these characters as TEXT, not markup',
          '&nbsp; is a non-breaking space (prevents line wrap at that point)',
          'Skipping this can silently break your page layout',
        ],
        quiz: [
          {
            question: 'Which entity represents the < character?',
            options: ['&lt;', '&gt;', '&amp;', '&copy;'],
            correctIndex: 0,
          },
          {
            question: "Why can't you type < directly in the visible text of a page?",
            options: ['You can, no issue', 'The browser may interpret it as the start of a tag', 'It is too slow', 'It only works in HTML5'],
            correctIndex: 1,
          },
          {
            question: 'What does &amp; display?',
            options: ['<', '>', '&', '"'],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Global Attributes: id, class, style, title & data-*',
        difficulty: 'easy',
        tags: ['attributes', 'basics'],
        explanation: {
          english:
            'Global attributes work on almost EVERY HTML element, not just specific ones. id uniquely identifies one element (used once per page). class groups elements for shared CSS/JavaScript styling (reusable across many elements). style applies inline CSS directly (use sparingly). title shows a tooltip on hover. data-* attributes (like data-user-id) let you store custom data on an element for JavaScript to read later.',
          hinglish:
            'Global attributes almost HAR HTML element pe kaam karte hain, sirf specific waalo pe nahi. id ek element ko uniquely identify karta hai (page pe ek hi baar use hoti hai). class elements ko group karta hai shared CSS/JavaScript styling ke liye (kai elements pe reuse hoti hai). style seedha inline CSS apply karta hai (kam use karo). title hover pe tooltip dikhata hai. data-* attributes (jaise data-user-id) element pe custom data store karne dete hain jo JavaScript baad mein padh sake.',
        },
        dailyLifeExample:
          'id ek Aadhaar number jaisi hai — sirf ek insaan ka. class ek uniform jaisi hai — sabhi students jo ek hi class mein hain, wahi uniform pehente hain (many elements, same style). data-* ek chhupi hui ID-card jaisi hai jo dikhti nahi par system use padh sakta hai.',
        codeExample:
          '<div id="main-banner" class="card highlighted" title="Click to learn more" data-course-id="42">\n  Welcome!\n</div>\n\n<!-- JS can read this later -->\n<script>\n  const el = document.querySelector(\'#main-banner\');\n  el.dataset.courseId; // \'42\'\n</script>',
        keyPoints: [
          'id: unique per page, used for one specific element',
          'class: reusable across many elements, groups shared styling',
          'style: inline CSS (use only for quick one-off tweaks)',
          'title: shows a hover tooltip',
          'data-*: custom data readable via JS as element.dataset.name',
        ],
        quiz: [
          {
            question: 'How many elements on a page should share the same id?',
            options: ['As many as needed', 'Exactly one', 'Exactly two', 'Unlimited'],
            correctIndex: 1,
          },
          {
            question: 'Which attribute is meant to be reused across MANY elements for shared styling?',
            options: ['id', 'class', 'title', 'data-x'],
            correctIndex: 1,
          },
          {
            question: 'How do you read a data-course-id attribute in JavaScript?',
            options: ['element.data.courseId', 'element.dataset.courseId', 'element.attr("data-course-id")', 'element.getData()'],
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
          {
            question: "You built <input type='text' /> with no name attribute. What happens when the form submits?",
            options: [
              'It submits with a random generated name',
              "That field's value is NOT included in the submitted data at all",
              'The form refuses to submit',
              'Nothing changes, it works fine',
            ],
            correctIndex: 1,
            explanation: 'The name attribute is the KEY the server receives the value under. Without it, that field is silently skipped — a very common beginner bug where a field looks fine but never arrives at the server.',
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
  {
    title: 'Best Practices & Common Mistakes',
    level: 'intermediate',
    description: 'Nesting rules aur beginner mistakes jo har koi karta hai.',
    concepts: [
      {
        title: 'Nesting Rules & Common HTML Mistakes',
        difficulty: 'medium',
        tags: ['best-practices', 'validation'],
        explanation: {
          english:
            "HTML has rules about which elements can go inside which — break them and the browser silently 'fixes' your markup in unexpected ways. Common beginner mistakes: forgetting to close a tag, unescaped special characters, and mismatched/overlapping tags (<b><i>text</b></i> is invalid — tags must close in reverse order, like <b><i>text</i></b>). Always validate your HTML when something looks broken.",
          hinglish:
            "HTML mein rules hote hain ki kaunsa element kiske andar ja sakta hai — todo to browser tumhara markup chupke se apne hisaab se 'theek' kar deta hai, jo unexpected result deta hai. Common beginner mistakes: tag close karna bhool jaana, unescaped special characters, aur mismatched/overlapping tags (<b><i>text</b></i> invalid hai — tags reverse order mein close hone chahiye, jaise <b><i>text</i></b>). Jab kuch tuta hua lage to hamesha HTML validate karo.",
        },
        dailyLifeExample:
          'Tags ek tiffin ke dabbon jaise hain jo ek doosre ke andar rakhe jaate hain — bada dabba pehle, chhota andar, aur khulte bhi ulte order mein (chhota pehle, bada baad mein). Agar order galat hai to sab bikhar jaata hai.',
        codeExample:
          "<!-- WRONG: overlapping tags -->\n<b><i>bold and italic</b></i>  ❌\n\n<!-- CORRECT: properly nested -->\n<b><i>bold and italic</i></b>  ✅\n\n<!-- WRONG: forgot to close -->\n<p>Paragraph one\n<p>Paragraph two  ❌ browser auto-closes the first, but don't rely on it\n\n<!-- CORRECT -->\n<p>Paragraph one</p>\n<p>Paragraph two</p>",
        keyPoints: [
          'Tags must close in the reverse order they opened (proper nesting)',
          'Always close every tag explicitly — do not rely on browser auto-fixing',
          'A <p> cannot contain another <p> or a <div>',
          'Use the W3C HTML Validator when a page renders strangely',
          'Consistent indentation makes nesting mistakes easy to spot',
        ],
        quiz: [
          {
            question: 'Which of these is correctly nested?',
            options: ['<b><i>text</b></i>', '<b><i>text</i></b>', '<i><b>text</i></b>', 'None of these'],
            correctIndex: 1,
          },
          {
            question: 'What happens if you forget to close a <p> tag?',
            options: ['The page fails to load', 'Browsers often auto-correct it, but the behaviour can be inconsistent', 'Nothing, it is required to be open', 'CSS stops working entirely'],
            correctIndex: 1,
          },
          {
            question: 'Tags must close in…',
            options: ['Any order', 'The same order they opened', 'Reverse order of how they opened', 'Alphabetical order'],
            correctIndex: 2,
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

  // ─── Semantics, Forms & The Platform ────────────────────────
  {
    question: 'Why does semantic HTML matter beyond looking tidy?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Semantic elements describe MEANING, not appearance, and three consumers depend on that. Screen readers use landmarks to let users jump between regions and understand structure. Search engines use it to interpret content. And browsers give semantic elements built-in behaviour: a `<button>` is focusable, activates on Enter and Space, and announces its role, whereas a `<div onclick>` looks identical and is completely unusable without a mouse.',
      hinglish:
        'Semantic elements MATLAB batate hain, dikhaawa nahi, aur teen log us pe depend karte hain. Screen readers landmarks se users ko ilaakon ke beech koodne aur dhaancha samajhne dete hain. Search engines isse content samajhte hain. Aur browsers semantic elements ko built-in behaviour dete hain: ek `<button>` focus le sakta hai, Enter aur Space pe chalta hai, aur apni bhoomika batata hai, jabki ek `<div onclick>` bilkul waisa dikhta hai aur bina mouse ke poori tarah bekaar hai.',
    },
  },
  {
    question: 'What is the difference between article, section, div, and main?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`<article>` is self-contained content that would still make sense if extracted — a post, a comment, a product card. `<section>` is a thematic grouping and should have a heading; if it has no natural heading it probably should not be one. `<main>` marks the primary content and there must be exactly ONE per page, which lets screen readers skip navigation. `<div>` carries no meaning and exists purely as a styling hook.',
      hinglish:
        '`<article>` khud-poora content hai jo nikaal lene par bhi matlab rakhta — ek post, ek comment, ek product card. `<section>` ek vishay ka group hai aur uska ek heading hona chahiye; agar koi swabhavik heading nahi to wo shayad section nahi honi chahiye. `<main>` mukhya content batata hai aur per page theek EK hona chahiye, jisse screen readers navigation skip kar sakein. `<div>` koi matlab nahi rakhta aur sirf ek styling hook hai.',
    },
  },
  {
    question: 'How should headings be structured and why?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Headings form an OUTLINE and should descend without skipping — `<h1>` then `<h2>`, and an `<h3>` only under an `<h2>`. Screen-reader users navigate by pulling up a list of headings, so a skipped level or a heading chosen for its font size breaks that navigation entirely. Use one `<h1>` describing the page. Never pick a level for its appearance; pick the correct level and change the size with CSS.',
      hinglish:
        'Headings ek KHAAKA banati hain aur bina skip kiye utarni chahiye — `<h1>` phir `<h2>`, aur ek `<h3>` sirf ek `<h2>` ke neeche. Screen-reader users headings ki ek list nikaal kar navigate karte hain, isliye ek skip kiya level ya font size ke liye chuna gaya heading us navigation ko poori tarah tod deta hai. Page batata ek `<h1>` use karo. Ek level kabhi uske dikhaawe ke liye mat chuno; sahi level chuno aur size CSS se badlo.',
    },
  },
  {
    question: 'What is the difference between alt="" and a missing alt attribute?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An EMPTY `alt=""` explicitly marks the image as decorative, so screen readers skip it — correct for a background flourish or spacer. A MISSING `alt` leaves the screen reader no choice but to announce something, usually the filename, so the user hears "I M G underscore 4 7 2 dot p n g". They are completely different signals. When the image conveys information, describe that INFORMATION, not the picture literally.',
      hinglish:
        'Ek KHAALI `alt=""` image ko explicitly sajaawati batata hai, isliye screen readers use skip karte hain — ek background sajaawat ya spacer ke liye sahi. Ek GAYAB `alt` screen reader ko kuch bolne ke alawa koi choice nahi deta, usually filename, isliye user sunta hai "I M G underscore 4 7 2 dot p n g". Ye bilkul alag ishaare hain. Jab image jaankaari deti hai, us JAANKAARI ko batao, tasveer ko literally nahi.',
    },
  },
  {
    question: 'How do you make a form accessible?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Every input needs a real `<label>` linked by `for`/`id` — a placeholder is not a label, since it disappears when typing and usually fails contrast. Group related radios or checkboxes in a `<fieldset>` with a `<legend>`. Mark errors with `aria-invalid`, link the message with `aria-describedby`, and announce it in a live region. Use the correct `type` and `autocomplete` so mobile keyboards and password managers work properly.',
      hinglish:
        'Har input ko `for`/`id` se juda ek asli `<label>` chahiye — ek placeholder label nahi hai, kyunki wo type karte hi gayab ho jaata hai aur usually contrast mein fail hota hai. Related radios ya checkboxes ko ek `<legend>` wale `<fieldset>` mein group karo. Errors ko `aria-invalid` se mark karo, message ko `aria-describedby` se jodo, aur use ek live region mein bolo. Sahi `type` aur `autocomplete` use karo taaki mobile keyboards aur password managers theek chalein.',
    },
  },
  {
    question: 'What are the HTML5 input types and why do they matter?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'HTML5 added `email`, `url`, `tel`, `number`, `date`, `time`, `range`, `color`, and `search`. They matter for real user experience: mobile devices show the appropriate KEYBOARD — an `@` key for email, a numeric pad for tel — and browsers provide free native validation and pickers. The important caveat is that client-side validation is a convenience only; it is trivially bypassed, so the server must validate everything again.',
      hinglish:
        'HTML5 ne `email`, `url`, `tel`, `number`, `date`, `time`, `range`, `color`, aur `search` jode. Ye asli user anubhav ke liye matter karte hain: mobile devices sahi KEYBOARD dikhate hain — email ke liye ek `@` key, tel ke liye ek numeric pad — aur browsers muft native validation aur pickers dete hain. Zaroori caveat ye hai ki client-side validation sirf ek suvidha hai; ise bypass karna aasaan hai, isliye server ko sab kuch dobara jaanchna hi padega.',
    },
  },
  {
    question: 'What is the difference between GET and POST for a form?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'GET puts the data in the URL query string, so it is bookmarkable, shareable, cached, logged by servers and proxies, and length-limited — right for searches and filters, wrong for anything sensitive. POST puts the data in the request body, is not logged in URLs, and has no practical size limit — right for anything that changes state. The rule is that GET must be SAFE and idempotent: it should never create, modify, or delete.',
      hinglish:
        'GET data ko URL query string mein daalta hai, isliye ye bookmarkable, shareable, cached, servers aur proxies se logged, aur length-seemit hai — searches aur filters ke liye sahi, kisi sensitive cheez ke liye galat. POST data ko request body mein daalta hai, URLs mein log nahi hota, aur uski koi practical size seema nahi — kisi bhi state badalne wali cheez ke liye sahi. Niyam ye hai ki GET SURAKSHIT aur idempotent hona chahiye: use kabhi banana, badalna, ya mitana nahi chahiye.',
    },
  },
  {
    question: 'What are ARIA attributes and when should you use them?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'ARIA adds accessibility semantics HTML alone cannot express — `aria-expanded` on a custom dropdown, `aria-live` on a dynamically updating region, `aria-label` for an icon button with no visible text. The first rule of ARIA is: do not use ARIA if a native element will do, because native elements come with correct behaviour built in. Incorrect ARIA is actively WORSE than none, since it lies to assistive technology about what an element is.',
      hinglish:
        'ARIA aisi accessibility semantics jodta hai jo akela HTML nahi bata sakta — ek custom dropdown pe `aria-expanded`, ek badalte ilaake pe `aria-live`, bina dikhte text wale ek icon button ke liye `aria-label`. ARIA ka pehla niyam hai: ARIA mat use karo agar ek native element kaam kar dega, kyunki native elements ke saath sahi behaviour built-in aata hai. Galat ARIA na hone se actively BURA hai, kyunki wo assistive technology se jhooth bolta hai ki ek element kya hai.',
    },
  },
  {
    question: 'What is the difference between defer and async on a script tag?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Both download the script in parallel with HTML parsing. `async` executes it the MOMENT the download finishes, pausing the parser and running scripts in unpredictable order — right for independent scripts such as analytics. `defer` waits until parsing completes and runs deferred scripts in DOCUMENT ORDER — right for application code with dependencies. A plain `<script>` with neither blocks parsing entirely, which is why scripts were traditionally placed at the end of `<body>`.',
      hinglish:
        'Dono script ko HTML parsing ke saath parallel mein download karte hain. `async` use us PAL chalata hai jab download khatam ho, parser rok kar aur scripts ko anaapekshit kram mein chala kar — analytics jaise swatantra scripts ke liye sahi. `defer` parsing khatam hone tak rukta hai aur deferred scripts ko DOCUMENT KRAM mein chalata hai — dependencies wale application code ke liye sahi. Dono ke bina ek plain `<script>` parsing poori tarah rokta hai, isiliye scripts historically `<body>` ke end mein rakhi jaati thi.',
    },
  },
  {
    question: 'What is the DOM and how does it differ from the HTML you wrote?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'HTML is the text the server sends; the DOM is the live tree of objects the browser BUILDS from it and JavaScript manipulates. They diverge immediately: the browser repairs invalid markup, inserts implied elements such as `<tbody>`, and any script that adds or removes nodes changes the DOM without changing the HTML. That is why "view source" shows the original HTML while DevTools shows the current DOM, and why they often do not match.',
      hinglish:
        'HTML wo text hai jo server bhejta hai; DOM objects ka wo jeeta-jaagta ped hai jo browser usse BANATA hai aur JavaScript badalta hai. Wo turant alag ho jaate hain: browser kharab markup theek karta hai, `<tbody>` jaise chhupe elements daalta hai, aur koi bhi script jo nodes jodti ya hataati hai wo HTML badle bina DOM badalti hai. Isiliye "view source" asli HTML dikhata hai jabki DevTools abhi ka DOM, aur isiliye wo aksar match nahi karte.',
    },
  },
  {
    question: 'What is the critical rendering path?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'It is the sequence a browser follows to turn bytes into pixels: parse HTML into the DOM, parse CSS into the CSSOM, combine them into the render tree, compute layout, then paint. CSS is RENDER-BLOCKING because nothing can be painted correctly without it, and synchronous scripts are PARSER-BLOCKING. Optimising it means inlining critical CSS, deferring the rest and all scripts, and reducing how much must download before the first meaningful paint.',
      hinglish:
        'Ye wo kram hai jo browser bytes ko pixels banane ke liye follow karta hai: HTML ko DOM mein parse karo, CSS ko CSSOM mein, unhe render tree mein jodo, layout nikaalo, phir paint karo. CSS RENDER-BLOCKING hai kyunki uske bina kuch sahi paint nahi ho sakta, aur synchronous scripts PARSER-BLOCKING hain. Ise behtar karne ka matlab hai zaroori CSS inline karna, baaki aur saari scripts defer karna, aur pehle matlab wale paint se pehle jitna download hona hai wo kam karna.',
    },
  },
  {
    question: 'What causes Cumulative Layout Shift and how do you prevent it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CLS happens when content moves after it has already rendered, which is why people misclick. The usual causes: images and videos without dimensions, ads or embeds injected into the flow, web fonts swapping and changing text metrics, and content inserted above what the user is reading. Fixes: always set `width` and `height` or an `aspect-ratio`, reserve space for dynamic content, use `font-display: optional` or a well-matched fallback, and never insert content above the viewport.',
      hinglish:
        'CLS tab hota hai jab content render hone ke baad hilta hai, isiliye log galat jagah click karte hain. Aam wajahein: bina dimensions ke images aur videos, flow mein daale gaye ads ya embeds, web fonts ka badalna aur text ke naap badalna, aur user jo padh raha hai uske upar content daalna. Fixes: hamesha `width` aur `height` ya ek `aspect-ratio` set karo, badalte content ke liye jagah rakho, `font-display: optional` ya ek achhe se milta fallback use karo, aur viewport ke upar kabhi content mat daalo.',
    },
  },
  {
    question: 'How do you make images responsive and performant?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Use `srcset` with `sizes` so the browser picks an appropriate resolution rather than downloading a 4000px image for a phone. Use `<picture>` when you need ART DIRECTION — a different crop on mobile — or modern formats such as AVIF and WebP with a fallback. Add `loading="lazy"` for below-the-fold images, and always set `width` and `height` so the browser reserves space and avoids layout shift.',
      hinglish:
        '`srcset` ko `sizes` ke saath use karo taaki browser ek phone ke liye 4000px image download karne ke bajaye ek sahi resolution chune. `<picture>` tab use karo jab tumhe ART DIRECTION chahiye — mobile pe ek alag crop — ya ek fallback ke saath AVIF aur WebP jaise modern formats. Fold ke neeche ki images ke liye `loading="lazy"` jodo, aur hamesha `width` aur `height` set karo taaki browser jagah rakhe aur layout shift se bache.',
    },
  },
  {
    question: 'What is lazy loading and when should you not use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`loading="lazy"` defers loading an image or iframe until it approaches the viewport, saving bandwidth and speeding up initial load on long pages. The important exception is ABOVE-THE-FOLD content, especially your LCP hero image: lazy-loading it delays the very metric you are trying to improve, because the browser will not start the request until layout is known. Lazy-load what is below the fold, and eagerly load — or preload — what is above it.',
      hinglish:
        '`loading="lazy"` ek image ya iframe ko viewport ke paas aane tak laane se rokta hai, bandwidth bachate hue aur lambe pages pe pehla load tez karte hue. Zaroori exception FOLD KE UPAR ka content hai, khaas kar tumhari LCP hero image: use lazy-load karna theek us maap ko der karta hai jise tum behtar karna chahte ho, kyunki browser layout pata chalne tak request shuru nahi karega. Jo fold ke neeche hai use lazy-load karo, aur jo upar hai use jaldi load — ya preload — karo.',
    },
  },
  {
    question: 'What is the viewport meta tag and why is it required?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`<meta name="viewport" content="width=device-width, initial-scale=1">` tells mobile browsers to use the device width as the layout width. Without it, phones assume a desktop-sized viewport around 980px and shrink the whole page, so your media queries never trigger and text is unreadable. Responsive design does not function at all without it. Never add `user-scalable=no`, which blocks zoom and is a genuine accessibility failure.',
      hinglish:
        '`<meta name="viewport" content="width=device-width, initial-scale=1">` mobile browsers ko batata hai ki device ki chaudai ko layout chaudai maanein. Iske bina, phones lagbhag 980px ka ek desktop-jaisa viewport maan lete hain aur poora page sikod dete hain, isliye tumhari media queries kabhi chalti hi nahi aur text padha nahi jaata. Iske bina responsive design chalta hi nahi. `user-scalable=no` kabhi mat jodo, jo zoom rokta hai aur ek asli accessibility failure hai.',
    },
  },
  {
    question: 'What is the difference between localStorage, sessionStorage, and cookies?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'LOCALSTORAGE persists until explicitly cleared, holds around 5-10MB, and is never sent to the server. SESSIONSTORAGE is identical but cleared when the tab closes and is not shared between tabs. COOKIES are small — about 4KB — and sent with EVERY request to the domain, which is why they are used for sessions but also why they add overhead. For auth tokens an `httpOnly` cookie is safer than localStorage, which any XSS can read.',
      hinglish:
        'LOCALSTORAGE explicitly saaf hone tak rehta hai, lagbhag 5-10MB rakhta hai, aur kabhi server ko nahi bheja jaata. SESSIONSTORAGE waisa hi hai par tab band hone pe saaf ho jaata hai aur tabs ke beech share nahi hota. COOKIES chhote hain — lagbhag 4KB — aur domain ki HAR request ke saath jaate hain, isiliye wo sessions ke liye use hote hain par isiliye bojh bhi jodte hain. Auth tokens ke liye ek `httpOnly` cookie localStorage se surakshit hai, jise koi bhi XSS padh sakta hai.',
    },
  },
  {
    question: 'What is the difference between the dialog element and a custom modal?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The native `<dialog>` with `showModal()` gives you for free the things custom modals usually get wrong: a top-layer render above everything regardless of z-index, a `::backdrop` pseudo-element, focus TRAPPED inside, Escape to close, and focus returned to the trigger on close. A div-based modal must implement all of that by hand, and most implementations miss the focus trap, which makes the modal unusable by keyboard.',
      hinglish:
        '`showModal()` wala native `<dialog>` tumhe muft mein wo cheezein deta hai jo custom modals usually galat karte hain: z-index chahe kuch bhi ho sab ke upar ek top-layer render, ek `::backdrop` pseudo-element, andar FASA hua focus, band karne ke liye Escape, aur band hone pe trigger pe wapas focus. Ek div-based modal ko wo sab haath se banana padta hai, aur zyadatar focus trap chhod dete hain, jo modal ko keyboard se bekaar bana deta hai.',
    },
  },
  {
    question: 'What are data attributes and when should you use them?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Custom `data-*` attributes store arbitrary data on an element, readable via `element.dataset.userId`. They are valid HTML and the correct place for small pieces of state a script needs — a row\'s id, a component\'s configuration. Use them for data rather than styling hooks, where a class is clearer, and never store large objects or anything sensitive, since everything in the DOM is visible to the user and to any script on the page.',
      hinglish:
        'Custom `data-*` attributes ek element pe koi bhi data rakhte hain, jo `element.dataset.userId` se padha ja sakta hai. Ye valid HTML hain aur un chhoti state ke tukdon ke liye sahi jagah jo ek script ko chahiye — ek row ki id, ek component ki configuration. Inhe styling hooks ke bajaye data ke liye use karo, jahan ek class saaf hai, aur kabhi bade objects ya kuch sensitive mat rakho, kyunki DOM mein sab kuch user aur page ki har script ko dikhta hai.',
    },
  },
  {
    question: 'What does rel="noopener noreferrer" do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`noopener` prevents the newly opened page from accessing `window.opener`, which it could otherwise use to redirect your original tab to a phishing page — the "tabnabbing" attack. `noreferrer` additionally withholds the Referer header. Modern browsers apply `noopener` automatically for `target="_blank"`, but stating it explicitly remains good practice for older browsers, and `noreferrer` stays a deliberate privacy choice you must opt into.',
      hinglish:
        '`noopener` naye khule page ko `window.opener` access karne se rokta hai, jise wo warna tumhara asli tab ek phishing page pe bhejne ke liye use kar sakta tha — "tabnabbing" hamla. `noreferrer` upar se Referer header bhi rok leta hai. Modern browsers `target="_blank"` ke liye `noopener` apne aap lagate hain, par ise explicitly likhna purane browsers ke liye achhi practice rehti hai, aur `noreferrer` ek soch-samajh ki privacy choice rehta hai jise tumhe khud chunna padta hai.',
    },
  },
  {
    question: 'What is Content Security Policy?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CSP is a response header telling the browser which sources of script, style, image, and connection are allowed, so injected code simply does not execute. It is the strongest defence-in-depth against XSS. A strict policy forbids inline scripts and `eval`, using nonces or hashes for the inline code you genuinely need. It is a second layer, not a substitute for escaping output — and a policy full of `unsafe-inline` provides essentially no protection.',
      hinglish:
        'CSP ek response header hai jo browser ko batata hai ki script, style, image, aur connection ke kaunse source allowed hain, isliye daala gaya code chalta hi nahi. Ye XSS ke khilaaf sabse majboot doosri parat hai. Ek sakht policy inline scripts aur `eval` mana karti hai, jo inline code genuinely chahiye uske liye nonces ya hashes use karte hue. Ye ek doosri parat hai, output escape karne ka badal nahi — aur `unsafe-inline` se bhari ek policy asal mein koi bachaav nahi deti.',
    },
  },
  {
    question: 'How do you prevent XSS in HTML?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Escape all user-supplied content on output, and prefer `textContent` over `innerHTML` so markup is never interpreted. If you must render HTML, sanitise it with a maintained library such as DOMPurify rather than a hand-written regex, which always misses cases. Add a Content Security Policy as a second layer, set `httpOnly` on session cookies so a successful XSS cannot steal them, and validate on the server — client-side sanitisation alone protects nothing.',
      hinglish:
        'Output pe saara user ka diya content escape karo, aur `innerHTML` ke bajaye `textContent` prefer karo taaki markup kabhi samjha na jaaye. Agar HTML render karna hi hai, use DOMPurify jaisi ek maintained library se saaf karo, ek haath se likhe regex ke bajaye, jo hamesha cases chhod deta hai. Ek doosri parat ke roop mein ek Content Security Policy jodo, session cookies pe `httpOnly` set karo taaki ek safal XSS unhe chura na sake, aur server pe jaancho — akeli client-side safai kuch nahi bachati.',
    },
  },
  {
    question: 'What is the iframe sandbox attribute?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Adding `sandbox` removes almost every capability from the embedded document: no scripts, no forms, no popups, no top-level navigation, and a unique opaque origin. You then re-grant only what is needed via tokens such as `allow-scripts` and `allow-forms`. The critical caveat is that combining `allow-scripts` with `allow-same-origin` for a page from your own origin lets it REMOVE its own sandbox, which defeats the point entirely.',
      hinglish:
        '`sandbox` jodna andar ke document se lagbhag har kshamta hata deta hai: na scripts, na forms, na popups, na top-level navigation, aur ek anokha opaque origin. Phir tum `allow-scripts` aur `allow-forms` jaise tokens se sirf zaroori cheezein wapas dete ho. Zaroori caveat ye hai ki apne hi origin ke ek page ke liye `allow-scripts` ko `allow-same-origin` ke saath jodna use apna hi sandbox HATAANE deta hai, jo maksad hi poori tarah khatam kar deta hai.',
    },
  },
  {
    question: 'What is the purpose of the doctype declaration?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`<!DOCTYPE html>` tells the browser to use STANDARDS MODE rather than quirks mode, a legacy compatibility mode emulating 1990s browser bugs. Without it, box-sizing behaves differently, layout breaks in subtle ways, and CSS you tested carefully stops working. It is not an HTML tag and has no attributes — in HTML5 it is deliberately reduced to this one short line, versus the long DTD strings HTML4 required.',
      hinglish:
        '`<!DOCTYPE html>` browser ko batata hai ki quirks mode ke bajaye STANDARDS MODE use kare, quirks ek purana compatibility mode hai jo 1990s ke browser bugs ki nakal karta hai. Iske bina, box-sizing alag chalta hai, layout sookshm tareekon se tootta hai, aur jo CSS tumne dhyaan se jaanchi wo kaam karna band kar deti hai. Ye ek HTML tag nahi hai aur iske koi attributes nahi — HTML5 mein ise jaan boojh kar is ek chhoti line tak laaya gaya hai, HTML4 ki lambi DTD strings ke muqable.',
    },
  },
  {
    question: 'How does the browser handle invalid HTML?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'It never fails — the HTML5 spec defines exact recovery rules, so every browser produces the SAME DOM from the same broken markup. Unclosed tags are closed implicitly, misnested tags are reordered, elements in the wrong place are moved (stray content is hoisted out of a `<table>`), and required elements such as `<tbody>` are inserted. That consistency is a strength, but the resulting DOM may differ from what you intended, which is why validation still matters.',
      hinglish:
        'Ye kabhi fail nahi hota — HTML5 spec theek sudhaarne ke niyam batata hai, isliye har browser usi toote markup se WAHI DOM banata hai. Band na kiye tags chupke se band ho jaate hain, galat nested tags dobara jamte hain, galat jagah ke elements hilte hain (bhatka content ek `<table>` se bahar utha diya jaata hai), aur `<tbody>` jaise zaroori elements daale jaate hain. Wo ek jaisapan ek taakat hai, par banne wala DOM tumhare iraade se alag ho sakta hai, isiliye validation abhi bhi matter karta hai.',
    },
  },
  {
    question: 'What are meta tags used for in SEO and social sharing?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The `<title>` and `<meta name="description">` are what appear in search results, so they matter most. `<link rel="canonical">` tells search engines which URL is authoritative when the same content is reachable from several. OPEN GRAPH tags — `og:title`, `og:description`, `og:image` — control how a link renders when shared on social platforms, and Twitter cards do the same for X. Note `meta keywords` has been ignored by search engines for many years.',
      hinglish:
        '`<title>` aur `<meta name="description">` wahi hain jo search results mein dikhte hain, isliye wo sabse zyada matter karte hain. `<link rel="canonical">` search engines ko batata hai ki jab wahi content kai jagah se mile to kaunsa URL asli hai. OPEN GRAPH tags — `og:title`, `og:description`, `og:image` — batate hain ki social platforms pe share hone pe ek link kaisa dikhe, aur Twitter cards X ke liye wahi karte hain. Note karo `meta keywords` ko search engines kai saal se andekha karte hain.',
    },
  },
  {
    question: 'What is the difference between the load and DOMContentLoaded events?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`DOMContentLoaded` fires when the HTML is parsed and the DOM is built, without waiting for images, stylesheets, or iframes. `load` fires only after EVERY resource has finished. Most initialisation should use `DOMContentLoaded`, because waiting for a large image before attaching a click handler makes the page feel broken for seconds. Use `load` only when you genuinely need final image dimensions or all resources present.',
      hinglish:
        '`DOMContentLoaded` tab chalta hai jab HTML parse ho jaaye aur DOM ban jaaye, images, stylesheets, ya iframes ka intezaar kiye bina. `load` sirf tab chalta hai jab HAR resource khatam ho jaaye. Zyadatar shuruaat ko `DOMContentLoaded` use karna chahiye, kyunki ek click handler lagane se pehle ek badi image ka intezaar page ko kai second tak toota hua feel karata hai. `load` sirf tab use karo jab tumhe genuinely aakhri image dimensions ya saare resources chahiye.',
    },
  },
  {
    question: 'What is event delegation and why does it help?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Instead of attaching a listener to every child, attach ONE to a common ancestor and use `event.target` to identify which child was clicked, relying on bubbling. It uses far less memory with many items, and — crucially — it works for elements added to the DOM LATER, which individually attached listeners do not. Use `closest()` to handle clicks landing on a nested element such as an icon inside a button.',
      hinglish:
        'Har child pe ek listener lagane ke bajaye, ek saanjhe poorvaj pe EK lagao aur `event.target` se pehchano ki kaunsa child click hua, bubbling pe bharosa karte hue. Ye bahut items ke saath bahut kam memory leta hai aur — critically — un elements ke liye bhi chalta hai jo DOM mein BAAD mein jude, jo alag-alag lage listeners nahi karte. Ek button ke andar ek icon jaise nested element pe pade clicks sambhalne ke liye `closest()` use karo.',
    },
  },
  {
    question: 'What is the difference between event bubbling and capturing?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'An event travels down from the root to the target (CAPTURING), reaches the target, then travels back up (BUBBLING). Listeners default to the bubbling phase; passing `true` or `{capture: true}` puts you in the capturing phase, which fires first and is how you intercept an event before a child handles it. `stopPropagation` halts the journey, and using it liberally breaks event delegation elsewhere on the page, which is a common source of mysterious bugs.',
      hinglish:
        'Ek event root se target tak neeche jaata hai (CAPTURING), target pe pahunchta hai, phir wapas upar jaata hai (BUBBLING). Listeners default se bubbling charan mein hote hain; `true` ya `{capture: true}` dena tumhe capturing charan mein daalta hai, jo pehle chalta hai aur isse tum ek event ko ek child ke sambhaalne se pehle pakadte ho. `stopPropagation` safar rok deta hai, aur ise khoob use karna page mein kahin aur event delegation todta hai, jo rahasyamayi bugs ka ek aam karan hai.',
    },
  },
  {
    question: 'What is the difference between preload, prefetch, and preconnect?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PRELOAD fetches a resource needed for the CURRENT page at high priority — a font or hero image the parser would otherwise discover late. PREFETCH fetches at low priority something likely needed on the NEXT navigation. PRECONNECT performs the DNS, TCP, and TLS handshake to another origin early so the eventual request starts sooner. Overusing preload actively hurts, because it competes for bandwidth with what the page needs right now.',
      hinglish:
        'PRELOAD ABHI ke page ke liye zaroori ek resource ooonchi priority pe laata hai — ek font ya hero image jise parser warna der se dhoondhta. PREFETCH kam priority pe wo laata hai jo AGLE navigation pe shayad chahiye. PRECONNECT ek doosre origin se DNS, TCP, aur TLS handshake pehle kar leta hai taaki asli request jaldi shuru ho. Preload ka zyada istemaal actively nuksaan karta hai, kyunki wo us cheez se bandwidth ke liye ladta hai jo page ko abhi chahiye.',
    },
  },
  {
    question: 'What is the Shadow DOM?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Shadow DOM attaches a separate, encapsulated DOM tree to an element, so its markup and styles are ISOLATED — outside CSS does not leak in and inside styles do not leak out. It is the mechanism behind Web Components and behind native controls such as `<video>`, whose internal buttons you cannot select. That isolation is the point, but it also means theming requires deliberate hooks such as CSS custom properties or `::part`.',
      hinglish:
        'Shadow DOM ek element se ek alag, ghera hua DOM ped jodta hai, isliye uska markup aur styles ALAG hain — bahar ki CSS andar nahi risti aur andar ki styles bahar nahi. Yahi Web Components ke peeche mechanism hai aur `<video>` jaise native controls ke peeche, jinke andar ke buttons tum chun nahi sakte. Wo alagaav hi maksad hai, par iska matlab ye bhi hai ki theming ke liye soch-samajh ke hooks chahiye jaise CSS custom properties ya `::part`.',
    },
  },
  {
    question: 'What are Web Components?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Web Components are three native browser features used together: CUSTOM ELEMENTS to define your own tags with lifecycle callbacks, SHADOW DOM for style and markup encapsulation, and TEMPLATES for reusable markup. Their advantage is being framework-agnostic — the same component works in React, Vue, or plain HTML, which is why design systems use them. Their drawbacks are more verbose authoring, awkward form integration, and weaker server-side rendering support.',
      hinglish:
        'Web Components teen native browser features hain jo saath use hote hain: apne tags lifecycle callbacks ke saath banane ke liye CUSTOM ELEMENTS, style aur markup gherne ke liye SHADOW DOM, aur dobara istemaal layak markup ke liye TEMPLATES. Inka faayda framework-agnostic hona hai — wahi component React, Vue, ya plain HTML mein chalta hai, isiliye design systems inhe use karte hain. Inke nuksaan zyada lamba likhna, ajeeb form judaav, aur kamzor server-side rendering support hain.',
    },
  },
  {
    question: 'What is the difference between the template and slot elements?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '`<template>` holds markup that is PARSED but not rendered and whose scripts do not run, giving you a reusable fragment to clone in JavaScript. `<slot>` is a placeholder inside a Web Component\'s shadow DOM where the consumer\'s own content is projected. Together they are the native equivalent of a component with children: the template defines the structure, and slots define where caller-supplied content goes.',
      hinglish:
        '`<template>` aisa markup rakhta hai jo PARSE hota hai par render nahi hota aur jiski scripts nahi chalti, tumhe JavaScript mein clone karne ko ek dobara istemaal layak tukda dete hue. `<slot>` ek Web Component ke shadow DOM ke andar ek jagah hai jahan istemaal karne wale ka apna content dikhta hai. Saath mein wo children wale ek component ka native barabar hain: template dhaancha batata hai, aur slots batate hain ki bulaane wale ka diya content kahan jaaye.',
    },
  },
  {
    question: 'What is the Intersection Observer API?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'It asynchronously notifies you when an element enters or leaves the viewport, or intersects another element. It replaces the old pattern of listening to scroll and calling `getBoundingClientRect()`, which fired constantly and forced synchronous layout — a classic cause of janky scrolling. Because the browser computes intersections off the main thread, it is far cheaper. Use it for lazy loading, infinite scroll, scroll-triggered animation, and impression tracking.',
      hinglish:
        'Ye asynchronously batata hai jab ek element viewport mein aaye ya nikle, ya doosre element se kate. Ye scroll sunne aur `getBoundingClientRect()` bulaane ke purane tareeke ko badalta hai, jo lagatar chalta tha aur synchronous layout majboor karta tha — atakte scrolling ka ek classic karan. Kyunki browser ye hisaab mukhya thread se bahar karta hai, ye bahut sasta hai. Ise lazy loading, anant scroll, scroll pe chalti animation, aur dikhne ki ginti ke liye use karo.',
    },
  },
  {
    question: 'What is a Service Worker?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A Service Worker is a script acting as a programmable PROXY between the page and the network, able to intercept every request and answer from a cache. It is what makes offline support, background sync, and push notifications possible, and it is the foundation of a PWA. It runs even when no page is open, requires HTTPS, and has its own lifecycle of install, activate, and update — which is also the source of most "why am I seeing the old version" bugs.',
      hinglish:
        'Ek Service Worker ek script hai jo page aur network ke beech ek programmable PROXY ki tarah kaam karti hai, har request pakadne aur ek cache se jawab dene mein saksham. Isi se offline support, background sync, aur push notifications sambhav hote hain, aur yahi ek PWA ki neev hai. Ye tab bhi chalta hai jab koi page khula na ho, HTTPS maangta hai, aur uska apna install, activate, aur update ka jeevan chakra hai — jo "main purana version kyun dekh raha hoon" wale zyadatar bugs ka source bhi hai.',
    },
  },
  {
    question: 'What makes a Progressive Web App?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Three requirements: HTTPS, a web app MANIFEST declaring the name, icons, and display mode, and a Service Worker providing offline capability. That combination lets a site be installed to the home screen, launched without browser chrome, and function without a network. Beyond the checklist, a good PWA is fast on a slow connection and degrades gracefully — the point is a web app that behaves like a native one without an app store.',
      hinglish:
        'Teen zarooratein: HTTPS, naam, icons, aur display mode batata ek web app MANIFEST, aur offline kshamta deta ek Service Worker. Wo mel ek site ko home screen pe install hone, bina browser chrome ke chalne, aur bina network ke kaam karne deta hai. Checklist se aage, ek achha PWA ek dheeme connection pe tez hota hai aur theek se dhalta hai — baat ye hai ki ek web app jo bina app store ke ek native jaisa chale.',
    },
  },
  {
    question: 'What is the difference between HTML and XHTML?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'XHTML is HTML reformulated as strict XML: every tag must be closed, attributes must be quoted, tags are case-sensitive, and a single syntax error means the browser refuses to render the page at all. HTML5 instead defines exact, forgiving PARSING RULES for malformed markup, so browsers recover consistently rather than failing. XHTML\'s strictness proved impractical on the real web, and HTML5 is what everyone uses today.',
      hinglish:
        'XHTML sakht XML ke roop mein dobara likha HTML hai: har tag band hona chahiye, attributes quoted, tags case-sensitive, aur ek syntax galti ka matlab browser page render karne se bilkul mana kar deta hai. HTML5 uske bajaye kharab markup ke liye theek, kshamashil PARSING NIYAM batata hai, isliye browsers fail hone ke bajaye ek jaise sambhal jaate hain. XHTML ki sakhti asli web pe vyavaharik nahi nikli, aur aaj sab HTML5 hi use karte hain.',
    },
  },
  {
    question: 'What is the contenteditable attribute?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`contenteditable="true"` makes any element directly editable by the user, which is the foundation of rich-text editors. In practice it is notoriously inconsistent: each browser generates different markup for the same keystroke, paste brings in arbitrary HTML from elsewhere, and undo behaviour varies. That is why serious editors such as ProseMirror, Slate, and TipTap maintain their own document model and treat contenteditable purely as an input surface.',
      hinglish:
        '`contenteditable="true"` kisi bhi element ko user ke liye seedha badalne layak bana deta hai, jo rich-text editors ki neev hai. Practically ye badnaam roop se alag-alag chalta hai: har browser wahi keystroke ke liye alag markup banata hai, paste kahin aur se koi bhi HTML le aata hai, aur undo alag-alag chalta hai. Isiliye ProseMirror, Slate, aur TipTap jaise serious editors apna document model rakhte hain aur contenteditable ko sirf ek input satah maante hain.',
    },
  },
  {
    question: 'How do you test HTML for accessibility?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Automated tools such as axe, Lighthouse, and WAVE catch roughly 30-40% of issues — missing labels, contrast failures, invalid ARIA — so they are a starting point, not a pass. Manual checks catch the rest: navigate the entire page with only the KEYBOARD, confirm focus is always visible and never trapped, test with a screen reader, zoom to 200%, and check the heading outline makes sense. Accessibility is behavioural, and most of it cannot be measured statically.',
      hinglish:
        'axe, Lighthouse, aur WAVE jaise apne aap chalte tools lagbhag 30-40% samasyaein pakadte hain — gayab labels, contrast ki kami, galat ARIA — isliye wo ek shuruaat hain, ek pass nahi. Haath ki jaanch baaki pakadti hai: poore page ko sirf KEYBOARD se chalao, pakka karo ki focus hamesha dikhta hai aur kabhi fasta nahi, ek screen reader se jaancho, 200% zoom karo, aur dekho ki heading ka khaaka samajh aata hai. Accessibility vyavahaar hai, aur uska zyadatar hissa bina chalaye naapa nahi ja sakta.',
    },
  },
  {
    question: 'What is the difference between the tabindex values 0, -1, and positive?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`tabindex="0"` puts an element in the natural tab order at its DOM position, which is how you make a custom interactive element keyboard-reachable. `tabindex="-1"` makes it programmatically focusable via `.focus()` but skipped by tabbing — used for moving focus to a modal or an error message. POSITIVE values force an element ahead of everything else and are almost always a mistake, since they create an order that no longer matches the visual layout.',
      hinglish:
        '`tabindex="0"` ek element ko uski DOM jagah pe swabhavik tab kram mein daalta hai, jisse tum ek custom interactive element ko keyboard se pahunchne layak banate ho. `tabindex="-1"` use `.focus()` se focus layak banata hai par tab se skip karta hai — ek modal ya ek error message pe focus le jaane ke liye. DHANATMAK values ek element ko baaki sab se aage kar deti hain aur lagbhag hamesha galti hain, kyunki wo ek aisa kram banati hain jo dikhne wale layout se match nahi karta.',
    },
  },
  {
    question: 'What are the main HTML5 APIs beyond markup?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'HTML5 brought a large set of browser APIs: Web Storage, Canvas and WebGL for graphics, Geolocation, Web Workers for threading, WebSockets for bidirectional communication, the History API for client-side routing, Drag and Drop, the File API, IndexedDB for structured client storage, Notifications, and the Media APIs. Collectively they are what turned the browser from a document viewer into an application platform.',
      hinglish:
        'HTML5 browser APIs ka ek bada set laaya: Web Storage, graphics ke liye Canvas aur WebGL, Geolocation, threading ke liye Web Workers, dono taraf baat ke liye WebSockets, client-side routing ke liye History API, Drag and Drop, File API, dhaanche wale client storage ke liye IndexedDB, Notifications, aur Media APIs. Milkar inhone hi browser ko ek document dekhne wale se ek application platform bana diya.',
    },
  },
];

export const curriculum = [...beginner, ...intermediate];
