// HTML5 curriculum — modern features (intermediate -> advanced).
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
  title: 'HTML5',
  slug: 'html5',
  description:
    'Modern HTML5 — semantic tags, audio/video, new forms, canvas, aur browser APIs. English + Hinglish, desi examples aur interview questions ke saath.',
  icon: '🌐',
  tags: ['html5', 'frontend', 'web', 'apis'],
  difficulty: 'intermediate',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 3,
};

const intermediate = [
  {
    title: 'HTML5 & Semantics',
    level: 'intermediate',
    description: 'HTML5 mein kya naya hai aur semantic structure.',
    concepts: [
      {
        title: 'What is New in HTML5',
        difficulty: 'medium',
        tags: ['html5', 'intro'],
        explanation: {
          english:
            'HTML5 is the modern version of HTML. It added semantic elements (header, nav, main, article), native audio/video (no Flash needed), new form input types and validation, graphics (canvas, SVG), and JavaScript APIs like localStorage and Geolocation. The doctype was also simplified to <!DOCTYPE html>.',
          hinglish:
            'HTML5 HTML ka modern version hai. Isme semantic elements aaye (header, nav, main, article), native audio/video (Flash ki zaroorat nahi), naye form input types aur validation, graphics (canvas, SVG), aur localStorage/Geolocation jaise JavaScript APIs. Doctype bhi simple ho gaya <!DOCTYPE html>.',
        },
        dailyLifeExample:
          'HTML5 ek purane phone ka naya smartphone version jaisa hai — call/SMS (basic HTML) to pehle bhi tha, par ab camera, GPS, apps (audio, video, APIs) sab built-in aa gaye, bina extra gadgets (Flash plugins) ke.',
        codeExample:
          '<!DOCTYPE html>  <!-- simplified in HTML5 -->\n<video controls src="clip.mp4"></video>\n<input type="email" required />\n<canvas id="art"></canvas>\n<!-- audio, video, canvas, new inputs: all native -->',
        keyPoints: [
          'Semantic elements (header, nav, main, article...)',
          'Native <audio> and <video> (no Flash)',
          'New input types + built-in validation',
          'APIs: localStorage, Geolocation, Canvas',
        ],
        quiz: [
          {
            question: 'Which is a key HTML5 addition?',
            options: ['Flash support', 'Native audio/video', 'Tables', 'The <font> tag'],
            correctIndex: 1,
          },
          {
            question: 'The HTML5 doctype is…',
            options: ['<!DOCTYPE html5>', '<!DOCTYPE html>', '<doctype>', 'A long DTD string'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What are the main features introduced in HTML5?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'HTML5 introduced semantic elements (header, nav, main, section, article, footer), native multimedia (<audio>, <video>), the <canvas> and inline SVG for graphics, many new form input types and validation attributes, and browser APIs such as Web Storage (localStorage/sessionStorage), Geolocation, drag-and-drop, and web workers. It also simplified the doctype.',
              hinglish:
                'HTML5 ne semantic elements diye (header, nav, main, section, article, footer), native multimedia (<audio>, <video>), graphics ke liye <canvas> aur inline SVG, bahut saare naye form input types aur validation attributes, aur browser APIs jaise Web Storage (localStorage/sessionStorage), Geolocation, drag-and-drop, web workers. Doctype bhi simple kiya.',
            },
          },
        ],
      },
      {
        title: 'Figure, Figcaption & Details',
        difficulty: 'medium',
        tags: ['semantic', 'html5'],
        explanation: {
          english:
            '<figure> groups self-contained media (an image, diagram, or code) with an optional caption via <figcaption>. <details> and <summary> create a native expandable/collapsible widget without any JavaScript — great for FAQs.',
          hinglish:
            '<figure> self-contained media (image, diagram, ya code) ko ek optional caption (<figcaption>) ke saath group karta hai. <details> aur <summary> bina kisi JavaScript ke ek native expand/collapse widget banate hain — FAQs ke liye badhiya.',
        },
        dailyLifeExample:
          '<figure>+<figcaption> ek museum mein rakhe artwork ke neeche lage naam-plate jaisa hai. <details> ek almari ka drawer jaisa hai — band rehta hai, click karo to khulta hai.',
        codeExample:
          '<figure>\n  <img src="chart.png" alt="Sales chart" />\n  <figcaption>Q1 sales growth</figcaption>\n</figure>\n\n<details>\n  <summary>What is HTML5?</summary>\n  <p>The modern version of HTML.</p>\n</details>',
        keyPoints: [
          '<figure> + <figcaption> for captioned media',
          '<details> + <summary> = native accordion',
          'No JavaScript needed for <details>',
          'Improves semantics and accessibility',
        ],
        quiz: [
          {
            question: 'Which pair creates a collapsible widget with no JS?',
            options: ['<figure>/<figcaption>', '<details>/<summary>', '<div>/<span>', '<ul>/<li>'],
            correctIndex: 1,
          },
          {
            question: '<figcaption> provides…',
            options: ['A link', 'A caption for a <figure>', 'A form label', 'A heading'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Multimedia',
    level: 'intermediate',
    description: 'Audio, video aur embeds — bina Flash ke.',
    concepts: [
      {
        title: 'Audio & Video',
        difficulty: 'medium',
        tags: ['media', 'audio', 'video'],
        explanation: {
          english:
            'The <audio> and <video> elements play media natively. Add the controls attribute for play/pause UI, and use multiple <source> tags so the browser picks a format it supports. Attributes like autoplay, loop, muted, and poster (for video) customise playback.',
          hinglish:
            '<audio> aur <video> elements media ko natively play karte hain. controls attribute se play/pause UI aata hai, aur kai <source> tags do taaki browser apna supported format chun le. autoplay, loop, muted, aur poster (video ke liye) jaise attributes playback customise karte hain.',
        },
        dailyLifeExample:
          'Pehle video dikhane ke liye Flash plugin (alag DVD player) lagana padta tha. Ab <video> built-in TV jaisa hai — file lagao aur chal padi, bina kisi extra device ke.',
        codeExample:
          '<video controls width="400" poster="thumb.jpg">\n  <source src="movie.mp4" type="video/mp4" />\n  <source src="movie.webm" type="video/webm" />\n  Your browser does not support video.\n</video>\n\n<audio controls src="song.mp3"></audio>',
        keyPoints: [
          '<audio>/<video> play media natively',
          'controls shows play/pause UI',
          'Use multiple <source> for format fallback',
          'autoplay, loop, muted, poster attributes',
        ],
        quiz: [
          {
            question: 'Which attribute shows play/pause buttons?',
            options: ['play', 'controls', 'buttons', 'ui'],
            correctIndex: 1,
          },
          {
            question: 'Why use multiple <source> tags?',
            options: ['To play faster', 'Format fallback across browsers', 'To loop', 'For captions'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Iframes & Embeds',
        difficulty: 'medium',
        tags: ['iframe', 'embed'],
        explanation: {
          english:
            'An <iframe> embeds another web page inside your page — commonly used for YouTube videos, Google Maps, or payment widgets. Because it loads third-party content, use the sandbox and loading="lazy" attributes for security and performance.',
          hinglish:
            'Ek <iframe> tumhare page ke andar doosra web page embed karta hai — aksar YouTube videos, Google Maps, ya payment widgets ke liye. Kyunki ye third-party content load karta hai, security aur performance ke liye sandbox aur loading="lazy" attributes use karo.',
        },
        dailyLifeExample:
          'iframe ek deewar pe lagi khidki jaisa hai jisme se doosra kamra (website) dikhta hai. Tum apne kamre mein ho par khidki se doosri jagah ka view milta hai.',
        codeExample:
          '<iframe\n  src="https://www.youtube.com/embed/VIDEO_ID"\n  width="560" height="315"\n  loading="lazy"\n  title="YouTube video"\n  allowfullscreen>\n</iframe>',
        keyPoints: [
          '<iframe> embeds another page',
          'Common for YouTube, Maps, widgets',
          'Use loading="lazy" for performance',
          'Use sandbox/title for security & a11y',
        ],
        quiz: [
          {
            question: 'What does an <iframe> do?',
            options: ['Creates a form', 'Embeds another web page', 'Plays audio', 'Adds an image'],
            correctIndex: 1,
          },
          {
            question: 'Which attribute defers iframe loading until needed?',
            options: ['defer', 'async', 'loading="lazy"', 'wait'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    title: 'HTML5 Forms',
    level: 'intermediate',
    description: 'Naye input types aur built-in validation.',
    concepts: [
      {
        title: 'New Input Types',
        difficulty: 'medium',
        tags: ['forms', 'html5'],
        explanation: {
          english:
            'HTML5 added input types like email, url, number, range, date, time, color, search, and tel. They give better mobile keyboards, native pickers (date/color), and built-in format checking — less custom JavaScript needed.',
          hinglish:
            'HTML5 ne email, url, number, range, date, time, color, search, tel jaise input types add kiye. Ye behtar mobile keyboards dete hain, native pickers (date/color), aur built-in format checking — kam custom JavaScript chahiye.',
        },
        dailyLifeExample:
          'Sahi input type dena mobile pe sahi keyboard laata hai — email type pe @ wala keyboard, number type pe sirf digits. Jaise sahi auzaar (tool) sahi kaam ke liye.',
        codeExample:
          '<input type="email" />   <!-- @ keyboard + format check -->\n<input type="date" />    <!-- native calendar -->\n<input type="range" min="0" max="100" />\n<input type="color" />   <!-- color picker -->\n<input type="number" min="1" max="10" />',
        keyPoints: [
          'email, url, number, range, date, color, tel...',
          'Better mobile keyboards per type',
          'Native pickers for date/color',
          'Built-in format validation',
        ],
        quiz: [
          {
            question: 'Which input type shows a native calendar?',
            options: ['type="text"', 'type="date"', 'type="calendar"', 'type="day"'],
            correctIndex: 1,
          },
          {
            question: 'A benefit of type="email" on mobile is…',
            options: ['Bigger font', 'An @-optimised keyboard + validation', 'A calendar', 'Nothing'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Form Validation Attributes',
        difficulty: 'medium',
        tags: ['forms', 'validation'],
        explanation: {
          english:
            'HTML5 validates forms before submit using attributes: required (must be filled), min/max (number/date range), minlength/maxlength, pattern (a regex the value must match), and type-based checks (email/url). The browser shows native error messages automatically.',
          hinglish:
            'HTML5 submit se pehle form validate karta hai in attributes se: required (bharna zaroori), min/max (number/date range), minlength/maxlength, pattern (ek regex jise value match kare), aur type-based checks (email/url). Browser native error messages apne aap dikhata hai.',
        },
        dailyLifeExample:
          'Validation ek security guard jaisa hai gate pe — galat ya adhura form (ID) hai to andar (submit) nahi jaane deta, aur batata hai kya galat hai.',
        codeExample:
          '<form>\n  <input type="text" required minlength="3" />\n  <input type="number" min="18" max="60" />\n  <input type="text" pattern="[0-9]{10}" title="10-digit phone" />\n  <button>Submit</button>\n</form>\n<!-- browser blocks submit if invalid -->',
        keyPoints: [
          'required, min/max, minlength/maxlength, pattern',
          'Browser shows native error messages',
          'Reduces the need for JS validation',
          'Still validate on the server too (never trust client)',
        ],
        quiz: [
          {
            question: 'Which attribute forces a field to be filled?',
            options: ['must', 'required', 'fill', 'notnull'],
            correctIndex: 1,
          },
          {
            question: 'pattern validates a value against…',
            options: ['A number range', 'A regular expression', 'A date', 'A color'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Can you rely only on HTML5 form validation?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'No. HTML5 validation improves UX by catching errors early in the browser, but it can be bypassed (disabled JS, dev tools, direct API calls). You must always validate and sanitise input on the server as the real security boundary. Treat client validation as convenience, server validation as protection.',
              hinglish:
                'Nahi. HTML5 validation UX behtar karta hai errors ko browser mein jaldi pakad ke, par ise bypass kiya ja sakta hai (JS disable, dev tools, direct API calls). Tumhe hamesha server pe input validate aur sanitise karna chahiye — wahi asli security boundary hai. Client validation convenience hai, server validation protection.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'HTML5 Graphics',
    level: 'advanced',
    description: 'Browser mein drawing — canvas aur SVG.',
    concepts: [
      {
        title: 'Canvas',
        difficulty: 'hard',
        tags: ['canvas', 'graphics'],
        explanation: {
          english:
            'The <canvas> element is a blank drawing surface you control with JavaScript (the 2D context). You draw shapes, text, and images pixel-by-pixel. Canvas is raster-based (pixels), so it is fast for games and dynamic visuals but does not scale crisply when zoomed.',
          hinglish:
            '<canvas> element ek khaali drawing surface hai jise tum JavaScript (2D context) se control karte ho. Tum shapes, text, images pixel-by-pixel banate ho. Canvas raster-based (pixels) hai, isliye games aur dynamic visuals ke liye fast hai par zoom karne pe crisp nahi rehta.',
        },
        dailyLifeExample:
          'Canvas ek khaali drawing board jaisa hai aur JavaScript tumhara haath/brush. Tum jo chaaho banao, par zoom karoge to pixels phailne lagenge (jaise photo zoom).',
        codeExample:
          '<canvas id="c" width="200" height="100"></canvas>\n<script>\n  const ctx = document.getElementById("c").getContext("2d");\n  ctx.fillStyle = "indigo";\n  ctx.fillRect(10, 10, 80, 50); // x, y, w, h\n</script>',
        keyPoints: [
          '<canvas> + JS 2D context to draw',
          'Pixel/raster based — great for games',
          'Does not scale crisply (zoom blurs)',
          'Everything is drawn via JavaScript',
        ],
        quiz: [
          {
            question: 'How do you draw on a canvas?',
            options: ['With CSS only', 'With JavaScript (2D context)', 'With HTML tags inside it', 'It draws itself'],
            correctIndex: 1,
          },
          {
            question: 'Canvas graphics are…',
            options: ['Vector (scale crisply)', 'Raster/pixel based', 'Text only', 'Always 3D'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'SVG',
        difficulty: 'medium',
        tags: ['svg', 'graphics'],
        explanation: {
          english:
            'SVG (Scalable Vector Graphics) describes images with XML shapes (rect, circle, path). Being vector-based, SVG scales to any size without losing sharpness, is stylable with CSS, and accessible. Use SVG for logos and icons; use canvas for fast pixel-heavy graphics.',
          hinglish:
            'SVG (Scalable Vector Graphics) images ko XML shapes (rect, circle, path) se describe karta hai. Vector-based hone se SVG kisi bhi size pe bina sharpness khoye scale hota hai, CSS se stylable hai, aur accessible. Logos aur icons ke liye SVG; fast pixel-heavy graphics ke liye canvas.',
        },
        dailyLifeExample:
          'SVG ek recipe (instructions) jaisa hai "gol banao, itna bada" — chahe chhota banao ya bada, hamesha perfect. Canvas ek photo jaisa hai jo zoom pe blur ho jaata hai.',
        codeExample:
          '<svg width="100" height="100">\n  <circle cx="50" cy="50" r="40" fill="indigo" />\n  <rect x="10" y="10" width="30" height="30" fill="gold" />\n</svg>\n<!-- scales to any size, stays crisp -->',
        keyPoints: [
          'SVG = vector graphics via XML shapes',
          'Scales infinitely without blur',
          'Stylable with CSS, accessible',
          'SVG for icons/logos; canvas for pixel-heavy',
        ],
        quiz: [
          {
            question: 'A key advantage of SVG over canvas?',
            options: ['Faster for games', 'Scales without losing quality', 'Uses less HTML', 'Pixel based'],
            correctIndex: 1,
          },
          {
            question: 'SVG describes graphics using…',
            options: ['Pixels', 'XML shapes (vectors)', 'JavaScript only', 'CSS only'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'When would you choose SVG vs Canvas?',
            difficulty: 'hard',
            frequency: 'rare',
            answer: {
              english:
                'Use SVG for scalable, interactive, accessible vector graphics like icons, logos, and charts with relatively few elements — each shape is a DOM node you can style and bind events to. Use Canvas for pixel-level rendering and performance-heavy scenes (games, particle effects, image processing) with thousands of objects, where DOM nodes would be too slow.',
              hinglish:
                'SVG use karo scalable, interactive, accessible vector graphics ke liye jaise icons, logos, aur kam elements wale charts — har shape ek DOM node hai jise style aur events bind kar sakte ho. Canvas use karo pixel-level rendering aur performance-heavy scenes ke liye (games, particle effects, image processing) jaha hazaaron objects hon, jaha DOM nodes bahut slow ho jaate.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'HTML5 APIs',
    level: 'advanced',
    description: 'Browser ki superpowers — storage, location, drag & drop.',
    concepts: [
      {
        title: 'Web Storage (localStorage & sessionStorage)',
        difficulty: 'medium',
        tags: ['api', 'storage'],
        explanation: {
          english:
            'Web Storage lets you save key-value data in the browser. localStorage persists until cleared (even after closing the tab); sessionStorage lasts only for the tab session. Both store strings, so use JSON.stringify/parse for objects. Unlike cookies, this data is not sent to the server.',
          hinglish:
            'Web Storage se tum browser mein key-value data save kar sakte ho. localStorage clear hone tak rehta hai (tab band karne ke baad bhi); sessionStorage sirf tab session tak. Dono strings store karte hain, isliye objects ke liye JSON.stringify/parse use karo. Cookies ke ulat, ye data server ko nahi jaata.',
        },
        dailyLifeExample:
          'localStorage ek almari jaisa hai jisme saamaan rakha rehta hai chahe ghar se bahar jaao (tab band). sessionStorage ek hotel room jaisa hai — checkout (tab band) pe saamaan hat jaata hai.',
        codeExample:
          'localStorage.setItem("theme", "dark");\nlocalStorage.getItem("theme"); // "dark"\nlocalStorage.removeItem("theme");\n\n// objects need JSON\nlocalStorage.setItem("user", JSON.stringify({ id: 1 }));\nJSON.parse(localStorage.getItem("user"));',
        keyPoints: [
          'localStorage persists; sessionStorage = per tab',
          'Stores strings only (use JSON for objects)',
          'Not sent to the server (unlike cookies)',
          '~5-10MB limit per origin',
        ],
        quiz: [
          {
            question: 'Which storage persists after the tab is closed?',
            options: ['sessionStorage', 'localStorage', 'both', 'neither'],
            correctIndex: 1,
          },
          {
            question: 'To store an object in localStorage you should…',
            options: ['Store it directly', 'Use JSON.stringify', 'Use a cookie', 'It is impossible'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Difference between localStorage, sessionStorage and cookies?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                'localStorage persists with no expiry (~5-10MB) and is not sent to the server. sessionStorage is the same but cleared when the tab closes. Cookies are smaller (~4KB), can have an expiry, and ARE sent to the server with every HTTP request — so they suit auth tokens/session ids, while Web Storage suits client-only data like preferences.',
              hinglish:
                'localStorage bina expiry ke rehta hai (~5-10MB) aur server ko nahi jaata. sessionStorage same hai par tab band hone par clear. Cookies chhote hote hain (~4KB), expiry ho sakti hai, aur har HTTP request ke saath server ko jaate hain — isliye auth tokens/session ids ke liye theek, jabki Web Storage client-only data (preferences) ke liye.',
            },
          },
        ],
      },
      {
        title: 'Geolocation API',
        difficulty: 'medium',
        tags: ['api', 'geolocation'],
        explanation: {
          english:
            'The Geolocation API gets the user\'s location (latitude/longitude) with their permission. navigator.geolocation.getCurrentPosition() takes success and error callbacks. The browser always asks the user to allow location access — it is never silent.',
          hinglish:
            'Geolocation API user ki location (latitude/longitude) leta hai unki permission se. navigator.geolocation.getCurrentPosition() success aur error callbacks leta hai. Browser hamesha user se location access ki permission maangta hai — kabhi chup-chaap nahi.',
        },
        dailyLifeExample:
          'Geolocation ek dukaan pe "aapka location share karein" pop-up jaisa hai — tabhi milta hai jab tum "Allow" dabao. Bina permission, app andha hai.',
        codeExample:
          'navigator.geolocation.getCurrentPosition(\n  (pos) => {\n    console.log(pos.coords.latitude, pos.coords.longitude);\n  },\n  (err) => console.log("Denied or error", err.message)\n);',
        keyPoints: [
          'Gets lat/long with user permission',
          'getCurrentPosition(success, error)',
          'Always prompts the user (privacy)',
          'watchPosition() tracks moving location',
        ],
        quiz: [
          {
            question: 'Can a site read your location silently?',
            options: ['Yes, always', 'No — it requires user permission', 'Only on mobile', 'Only with cookies'],
            correctIndex: 1,
          },
          {
            question: 'Which method gets the current location once?',
            options: ['getLocation()', 'getCurrentPosition()', 'findMe()', 'locate()'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Drag and Drop',
        difficulty: 'hard',
        tags: ['api', 'drag-drop'],
        explanation: {
          english:
            'The Drag and Drop API lets users drag elements and drop them elsewhere. Make an element draggable with draggable="true", then handle events: dragstart (store data), dragover (must preventDefault to allow a drop), and drop (read data and act). Used for file uploads, kanban boards, and reordering.',
          hinglish:
            'Drag and Drop API users ko elements drag karke kahin aur drop karne deta hai. Element ko draggable="true" se draggable banao, phir events handle karo: dragstart (data store), dragover (drop allow karne ke liye preventDefault zaroori), aur drop (data padho aur action lo). File uploads, kanban boards, reordering ke liye.',
        },
        dailyLifeExample:
          'Drag and drop ek table pe cards ko ek dher se doosre dher mein khiska ke rakhna jaisa hai — uthao, le jaao, chhodo. dragover ka preventDefault matlab "yahan rakhne ki ijazat hai".',
        codeExample:
          '<div draggable="true" id="item">Drag me</div>\n<div id="zone">Drop here</div>\n<script>\n  item.addEventListener("dragstart", e =>\n    e.dataTransfer.setData("text", e.target.id));\n  zone.addEventListener("dragover", e => e.preventDefault());\n  zone.addEventListener("drop", e => {\n    e.preventDefault();\n    const id = e.dataTransfer.getData("text");\n    zone.append(document.getElementById(id));\n  });\n</script>',
        keyPoints: [
          'draggable="true" makes an element draggable',
          'dragstart stores data via dataTransfer',
          'dragover needs preventDefault to allow drop',
          'drop reads the data and performs the action',
        ],
        quiz: [
          {
            question: 'Why call preventDefault on dragover?',
            options: ['To cancel the drag', 'To allow dropping on the target', 'To hide the element', 'No reason'],
            correctIndex: 1,
          },
          {
            question: 'Which attribute makes an element draggable?',
            options: ['drag="on"', 'draggable="true"', 'movable="yes"', 'can-drag'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Accessibility & Best Practices',
    level: 'advanced',
    description: 'Sabke liye usable web banana.',
    concepts: [
      {
        title: 'Accessibility & ARIA',
        difficulty: 'hard',
        tags: ['accessibility', 'aria'],
        explanation: {
          english:
            'Accessibility (a11y) means everyone, including people using screen readers or keyboards, can use your site. The first rule: use native semantic HTML (button, label, nav) — it is accessible by default. ARIA attributes (role, aria-label, aria-hidden) add meaning only when no native element fits. Also ensure keyboard navigation and good colour contrast.',
          hinglish:
            'Accessibility (a11y) ka matlab har koi — screen readers ya keyboard use karne wale bhi — tumhari site use kar sake. Pehla rule: native semantic HTML use karo (button, label, nav) — wo by default accessible hai. ARIA attributes (role, aria-label, aria-hidden) tabhi meaning add karo jab koi native element fit na ho. Keyboard navigation aur achha colour contrast bhi ensure karo.',
        },
        dailyLifeExample:
          'Accessibility ek building mein ramp aur lift jaisi hai — sirf seedhiyan (mouse users) kaafi nahi, har kisi ke liye raasta hona chahiye. ARIA wo extra signboards hain jab raasta clear na ho.',
        codeExample:
          '<!-- prefer native -->\n<button>Save</button>\n\n<!-- ARIA only when needed -->\n<div role="button" tabindex="0" aria-label="Close">×</div>\n<img src="x.png" alt="" aria-hidden="true" /> <!-- decorative -->',
        keyPoints: [
          'Native semantic HTML is accessible by default',
          'Use ARIA only when no native element fits',
          'Ensure keyboard navigation (tabindex, focus)',
          'Good colour contrast & alt text matter',
        ],
        quiz: [
          {
            question: 'The first rule of ARIA is…',
            options: ['Use ARIA everywhere', 'Prefer native HTML; use ARIA only when needed', 'Never use HTML', 'ARIA replaces semantics'],
            correctIndex: 1,
          },
          {
            question: 'aria-hidden="true" is used to…',
            options: ['Show an element', 'Hide an element from screen readers', 'Delete an element', 'Style an element'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you make a web page accessible?',
            difficulty: 'hard',
            frequency: 'common',
            answer: {
              english:
                'Start with semantic HTML (headings in order, button, label, nav, main) which gives accessibility for free. Provide alt text for images, ensure full keyboard operability and visible focus states, maintain sufficient colour contrast, associate labels with form fields, and use ARIA roles/attributes only to fill gaps native HTML cannot. Test with a screen reader and keyboard-only navigation.',
              hinglish:
                'Semantic HTML se shuru karo (headings order mein, button, label, nav, main) jo free mein accessibility deta hai. Images ke liye alt text do, poori keyboard operability aur visible focus ensure karo, achha colour contrast rakho, labels ko form fields se jodo, aur ARIA roles/attributes sirf wahan use karo jahan native HTML kaafi na ho. Screen reader aur keyboard-only navigation se test karo.',
            },
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between HTML and HTML5?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'HTML5 is the latest major version of HTML. Compared to older HTML, it adds semantic elements, native audio/video without plugins, new form input types and validation, graphics (canvas/SVG), and JavaScript APIs (localStorage, Geolocation, web workers). It also has a simplified doctype and better error handling.',
      hinglish:
        'HTML5 HTML ka latest major version hai. Purane HTML ke comparison mein ye semantic elements, bina plugin native audio/video, naye form input types aur validation, graphics (canvas/SVG), aur JavaScript APIs (localStorage, Geolocation, web workers) add karta hai. Doctype bhi simple aur error handling behtar hai.',
    },
  },
  {
    question: 'What is the difference between <canvas> and <svg>?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Canvas is raster (pixel) based and drawn with JavaScript — fast for games and heavy scenes but not resolution-independent and not part of the DOM. SVG is vector based using XML shapes — each element is a DOM node, scales crisply at any size, is stylable with CSS and accessible, but slower with very many elements.',
      hinglish:
        'Canvas raster (pixel) based hai aur JavaScript se draw hota hai — games aur heavy scenes ke liye fast par resolution-independent nahi aur DOM ka part nahi. SVG vector based hai XML shapes se — har element ek DOM node, kisi bhi size pe crisp scale, CSS se stylable aur accessible, par bahut zyada elements pe slow.',
    },
  },
];

export const curriculum = [...intermediate, ...advanced];
