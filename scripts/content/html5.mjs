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
  icon: 'globe',
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
      {
        title: 'Responsive Images: srcset & <picture>',
        difficulty: 'medium',
        tags: ['images', 'responsive', 'html5'],
        explanation: {
          english:
            'Loading one giant image for every screen wastes mobile data and slows pages down. srcset on <img> lets the browser pick the best-sized image file for the current screen from a list of options. The <picture> element goes further — it lets you serve completely different image files (or formats like WebP) for different screen widths using multiple <source> tags, with <img> as the fallback.',
          hinglish:
            'Har screen ke liye ek hi bada image load karna mobile data waste karta hai aur page slow karta hai. <img> pe srcset browser ko options ki list se current screen ke liye best-size wali image file chunne deta hai. <picture> element aur aage jaata hai — ye alag screen widths ke liye bilkul alag image files (ya WebP jaise formats) dene deta hai multiple <source> tags se, aur <img> fallback ki tarah.',
        },
        dailyLifeExample:
          'srcset ek darzi (tailor) jaisa hai jo har size ke liye alag kapda kaatta hai — bade banda ke liye bada size, chhote ke liye chhota, koi waste nahi. <picture> ek restaurant menu jaisa hai jo mausam ke hisaab se alag dish serve karta hai (garmi mein cold drink, sardi mein garam chai).',
        codeExample:
          '<!-- srcset: browser picks best size -->\n<img\n  src="photo-800.jpg"\n  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"\n  sizes="(max-width: 600px) 400px, 800px"\n  alt="A mountain view" />\n\n<!-- picture: different files/formats per condition -->\n<picture>\n  <source srcset="photo.webp" type="image/webp" />\n  <source media="(max-width: 600px)" srcset="photo-mobile.jpg" />\n  <img src="photo.jpg" alt="A mountain view" />\n</picture>',
        keyPoints: [
          'srcset lets the browser choose the best-sized image automatically',
          'sizes tells the browser how big the image will actually display',
          '<picture> can serve entirely different files/formats per condition',
          '<img> inside <picture> is always the required fallback',
          'Saves mobile data and speeds up page load',
        ],
        quiz: [
          {
            question: 'What problem does srcset solve?',
            options: ['Broken image links', 'Loading unnecessarily large images on small screens', 'Missing alt text', 'Slow CSS'],
            correctIndex: 1,
          },
          {
            question: 'Inside a <picture> element, which tag is REQUIRED as a fallback?',
            options: ['<source>', '<img>', '<figcaption>', '<div>'],
            correctIndex: 1,
          },
          {
            question: 'What can <picture> do that plain srcset on <img> cannot?',
            options: ['Nothing, they are identical', 'Serve completely different image files/formats based on conditions', 'Load faster automatically', 'Add alt text automatically'],
            correctIndex: 1,
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
          {
            question: 'To animate on a canvas (e.g. a moving ball), what must you typically do each frame?',
            options: [
              'Nothing, it animates automatically',
              'Clear the canvas (or relevant area) and redraw, usually driven by requestAnimationFrame',
              'Reload the page',
              'Add more <canvas> tags',
            ],
            correctIndex: 1,
            explanation: 'Canvas has no built-in animation — you must clear (ctx.clearRect) and redraw shapes yourself on every frame, typically driven by requestAnimationFrame for smooth 60fps updates.',
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
          {
            question: 'Why is <div onclick="...">Click me</div> worse for accessibility than a real <button>?',
            options: [
              'There is no difference',
              'A div is not keyboard-focusable or announced as a button by screen readers by default — you would have to manually add tabindex, role and key handling',
              'Divs cannot have an onclick handler',
              'Buttons cannot be styled with CSS',
            ],
            correctIndex: 1,
            explanation: '<button> gives you keyboard focus, Enter/Space activation, and correct screen-reader announcement for free — a <div> gives you none of that unless you rebuild it all manually.',
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
  {
    title: 'Modern Browser APIs',
    level: 'advanced',
    description: 'Heavy background kaam aur SPA-style navigation — Web Workers, History API.',
    concepts: [
      {
        title: 'Web Workers: Background Threads',
        difficulty: 'hard',
        tags: ['api', 'performance', 'workers'],
        explanation: {
          english:
            "JavaScript normally runs on a single thread — a heavy calculation freezes the whole page (no clicks, no scrolling) until it finishes. A Web Worker runs a script on a SEPARATE background thread, so heavy work (image processing, large data crunching) does not block the UI. Workers cannot touch the DOM directly; they communicate with the main page by sending messages with postMessage().",
          hinglish:
            'JavaScript normally ek hi thread pe chalta hai — ek bhaari calculation poore page ko freeze kar deta hai (koi click, koi scroll nahi) jab tak khatam na ho. Ek Web Worker ek ALAG background thread pe script chalata hai, isliye bhaari kaam (image processing, bade data ka calculation) UI ko block nahi karta. Workers seedha DOM ko chhoo nahi sakte; wo main page se postMessage() se messages bhej ke baat karte hain.',
        },
        dailyLifeExample:
          'Web Worker ek dhaba mein alag kitchen helper jaisa hai jo bhaari kaam (aata gundhna) peeche karta hai jabki waiter (main thread) customers (UI clicks) ko turant serve karta rehta hai — koi bhi customer wait nahi karta.',
        codeExample:
          "// main.js\nconst worker = new Worker('heavy-task.js');\nworker.postMessage({ number: 45 });\nworker.onmessage = (e) => console.log('Result:', e.data);\n\n// heavy-task.js (runs on a separate thread)\nself.onmessage = (e) => {\n  const result = computeSomethingHeavy(e.data.number); // does not freeze the page\n  self.postMessage(result);\n};",
        keyPoints: [
          'Runs JS on a separate background thread — heavy work does not freeze the page',
          'Cannot access the DOM directly',
          'Communicates via postMessage() and the onmessage event',
          'Great for image/data processing, complex calculations',
          'Overkill for small/quick tasks — has its own startup cost',
        ],
        quiz: [
          {
            question: 'Why would you use a Web Worker?',
            options: ['To style elements', 'To run heavy JS without freezing the page UI', 'To fetch data faster', 'To add animations'],
            correctIndex: 1,
          },
          {
            question: 'Can a Web Worker directly change the DOM?',
            options: ['Yes, freely', 'No — it must send a message to the main thread which updates the DOM', 'Only for images', 'Only in Chrome'],
            correctIndex: 1,
          },
          {
            question: 'How does a Worker communicate with the main page?',
            options: ['Shared global variables', 'postMessage() and the message event', 'Direct function calls', 'It cannot communicate'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'History API & Client-Side Routing',
        difficulty: 'medium',
        tags: ['api', 'routing', 'spa'],
        explanation: {
          english:
            'The History API lets JavaScript change the URL shown in the address bar WITHOUT reloading the page. history.pushState() adds a new entry (changing the URL and letting the back button work); history.replaceState() swaps the current entry without adding a new one. The popstate event fires when the user clicks back/forward, letting your app react. This is exactly how frameworks like React/Next.js build fast, app-like navigation.',
          hinglish:
            'History API JavaScript ko address bar mein dikhne wala URL badalne deta hai page reload KIYE BINA. history.pushState() ek nayi entry add karta hai (URL badalta hai aur back button kaam karta hai); history.replaceState() current entry ko swap kar deta hai bina nayi entry add kiye. popstate event tab fire hota hai jab user back/forward click kare, taaki app react kar sake. Yahi tarika hai jisse React/Next.js jaise frameworks fast, app-jaisi navigation banate hain.',
        },
        dailyLifeExample:
          "History API ek TV remote ke channel-back button jaisa hai — channel badla (URL) bina naya TV (page reload) laaye. Har channel change TV ki 'history' mein record hota hai, taaki back button pichhle channel pe le jaa sake.",
        codeExample:
          "// change URL without a full page reload\nhistory.pushState({ page: 'about' }, '', '/about');\n\n// listen for back/forward button clicks\nwindow.addEventListener('popstate', (event) => {\n  console.log('User navigated to:', location.pathname, event.state);\n  renderPageFor(location.pathname); // app re-renders the right content\n});",
        keyPoints: [
          'pushState() changes the URL and adds a browser-history entry, no reload',
          'replaceState() changes the URL without adding a new history entry',
          'popstate fires on back/forward navigation — you must handle it yourself',
          'This is the foundation of Single Page Application (SPA) routing',
          'Frameworks like React Router / Next.js wrap this API for you',
        ],
        quiz: [
          {
            question: 'What does history.pushState() do?',
            options: ['Reloads the page with a new URL', 'Changes the URL and adds a history entry WITHOUT reloading', 'Deletes browser history', 'Only works in Chrome'],
            correctIndex: 1,
          },
          {
            question: 'When does the popstate event fire?',
            options: ['On every page load', 'When the user clicks the browser back/forward button', 'On every click anywhere', 'Never, it is deprecated'],
            correctIndex: 1,
          },
          {
            question: 'The History API is the foundation of…',
            options: ['CSS animations', 'Single Page Application (SPA) routing', 'Form validation', 'Web Workers'],
            correctIndex: 1,
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

  // ─── Semantics & Structure ──────────────────────────────────
  {
    question: 'What is semantic HTML and why does it matter?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Semantic HTML uses elements that describe MEANING rather than appearance — `<nav>`, `<article>`, `<header>`, `<button>` instead of a wall of `<div>`s. It matters for three concrete reasons: screen readers use it to let users jump between landmarks and understand structure, search engines use it to interpret content, and browsers give semantic elements built-in behaviour such as keyboard focus and click-on-Enter. A `<div onclick>` looks identical and is unusable without a mouse.',
      hinglish:
        'Semantic HTML aise elements use karta hai jo dikhawat ke bajaye MATLAB batayein — `<nav>`, `<article>`, `<header>`, `<button>` `<div>`s ki ek deewar ke bajaye. Ye teen thos wajahon se matter karta hai: screen readers ise users ko landmarks ke beech koodne aur structure samajhne dene ke liye use karte hain, search engines ise content samajhne ke liye, aur browsers semantic elements ko built-in behaviour dete hain jaise keyboard focus aur Enter pe click. Ek `<div onclick>` bilkul waisa hi dikhta hai aur bina mouse ke bekaar hai.',
    },
  },
  {
    question: 'What is the difference between article, section, and div?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`<article>` is self-contained content that would still make sense if extracted — a blog post, a comment, a product card. `<section>` is a thematic grouping within a document and should have a heading; if it has no natural heading, it probably should not be a section. `<div>` carries NO meaning and exists purely for styling or layout hooks. The test is whether removing the wrapper would lose meaning: if not, use `<div>`.',
      hinglish:
        '`<article>` self-contained content hai jo nikaal lene par bhi matlab rakhta — ek blog post, ek comment, ek product card. `<section>` ek document ke andar ek thematic grouping hai aur uska ek heading hona chahiye; agar uska koi natural heading nahi hai, wo shayad section nahi honi chahiye. `<div>` KOI matlab nahi rakhta aur sirf styling ya layout hooks ke liye hai. Test ye hai ki wrapper hataane se matlab khoyega ya nahi: agar nahi, to `<div>` use karo.',
    },
  },
  {
    question: 'How should headings be structured in a document?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Headings form an OUTLINE, so they should descend in order without skipping — an `<h1>` followed by `<h2>`s, and an `<h3>` only under an `<h2>`. Screen-reader users navigate by heading list, so a skipped level or a heading chosen for its font size breaks that navigation entirely. Use one `<h1>` describing the page. Never pick a heading level for its appearance; pick the correct level and change the size with CSS.',
      hinglish:
        'Headings ek OUTLINE banati hain, isliye unhe bina skip kiye order mein utarna chahiye — ek `<h1>` ke baad `<h2>`s, aur ek `<h3>` sirf ek `<h2>` ke neeche. Screen-reader users heading list se navigate karte hain, isliye ek skipped level ya font size ke liye chuna gaya heading us navigation ko poori tarah tod deta hai. Page batata ek `<h1>` use karo. Ek heading level kabhi uski dikhawat ke liye mat chuno; sahi level chuno aur size CSS se badlo.',
    },
  },
  {
    question: 'What are ARIA attributes and when should you use them?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'ARIA adds accessibility semantics that HTML alone cannot express — `aria-expanded` on a custom dropdown, `aria-live` on a region that updates dynamically, `aria-label` for an icon button with no visible text. The first rule of ARIA is: do not use ARIA if a native element will do, because native elements come with correct behaviour built in. Incorrect ARIA is actively worse than none, since it lies to assistive technology about what an element is.',
      hinglish:
        'ARIA aisi accessibility semantics jodta hai jo akela HTML nahi bata sakta — ek custom dropdown pe `aria-expanded`, dynamically update hote region pe `aria-live`, bina dikhne wale text wale ek icon button ke liye `aria-label`. ARIA ka pehla niyam hai: ARIA mat use karo agar ek native element kaam kar dega, kyunki native elements ke saath sahi behaviour built-in aata hai. Galat ARIA na hone se actively bura hai, kyunki wo assistive technology se jhooth bolta hai ki ek element kya hai.',
    },
  },
  {
    question: 'What is the difference between alt="" and a missing alt attribute?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'An EMPTY `alt=""` explicitly marks the image as decorative, so screen readers skip it entirely — correct for a background flourish or a spacer. A MISSING `alt` leaves the screen reader no choice but to announce something, usually the filename, so users hear "I M G underscore 4 7 2 dot p n g". They are completely different signals. And when the image conveys information, the alt text should describe that information, not the picture literally.',
      hinglish:
        'Ek KHAALI `alt=""` image ko explicitly decorative mark karta hai, isliye screen readers use poori tarah skip karte hain — ek background flourish ya ek spacer ke liye sahi. Ek GAYAB `alt` screen reader ko kuch bolne ke alawa koi choice nahi deta, usually filename, isliye users sunte hain "I M G underscore 4 7 2 dot p n g". Ye bilkul alag signals hain. Aur jab image jaankaari deti hai, alt text ko wo jaankaari batani chahiye, tasveer ko literally nahi.',
    },
  },
  {
    question: 'How do you make a form accessible?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Every input needs a real `<label>` associated by `for`/`id` — a placeholder is not a label, since it vanishes on typing and fails contrast. Group related radios or checkboxes in a `<fieldset>` with a `<legend>`. Mark errors with `aria-invalid` and link the message with `aria-describedby`, and announce them in a live region so a screen reader user hears them. Use the correct `type` and `autocomplete` so mobile keyboards and password managers work.',
      hinglish:
        'Har input ko `for`/`id` se juda ek asli `<label>` chahiye — ek placeholder label nahi hai, kyunki wo type karte hi gayab ho jaata hai aur contrast mein fail hota hai. Related radios ya checkboxes ko ek `<legend>` wale `<fieldset>` mein group karo. Errors ko `aria-invalid` se mark karo aur message ko `aria-describedby` se link karo, aur unhe ek live region mein announce karo taaki ek screen reader user sune. Sahi `type` aur `autocomplete` use karo taaki mobile keyboards aur password managers kaam karein.',
    },
  },
  {
    question: 'What are the HTML5 input types and why do they matter?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'HTML5 added `email`, `url`, `tel`, `number`, `date`, `time`, `range`, `color`, and `search`. They matter for real user experience: mobile devices show the appropriate KEYBOARD — an `@` key for email, a numeric pad for tel — and browsers provide free native validation and pickers. The important caveat is that client-side validation is a convenience only; it is trivially bypassed, so the server must validate everything again regardless.',
      hinglish:
        'HTML5 ne `email`, `url`, `tel`, `number`, `date`, `time`, `range`, `color`, aur `search` jode. Ye asli user experience ke liye matter karte hain: mobile devices sahi KEYBOARD dikhate hain — email ke liye ek `@` key, tel ke liye ek numeric pad — aur browsers muft native validation aur pickers dete hain. Zaroori caveat ye hai ki client-side validation sirf ek suvidha hai; ise bypass karna aasaan hai, isliye server ko sab kuch dobara validate karna hi hai.',
    },
  },
  {
    question: 'What is the difference between localStorage, sessionStorage, and cookies?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'LOCALSTORAGE persists until explicitly cleared, holds around 5-10MB, and is never sent to the server. SESSIONSTORAGE is identical but cleared when the tab closes and is not shared between tabs. COOKIES are small (about 4KB) and sent with EVERY request to the domain, which is why they are used for sessions but also why they add overhead. For auth tokens, an `httpOnly` cookie is safer than localStorage, which any XSS can read.',
      hinglish:
        'LOCALSTORAGE explicitly clear hone tak rehta hai, lagbhag 5-10MB rakhta hai, aur kabhi server ko nahi bheja jaata. SESSIONSTORAGE waisa hi hai par tab band hone pe clear ho jaata hai aur tabs ke beech share nahi hota. COOKIES chhote hain (lagbhag 4KB) aur domain ki HAR request ke saath bheje jaate hain, isiliye wo sessions ke liye use hote hain par isiliye overhead bhi jodte hain. Auth tokens ke liye, ek `httpOnly` cookie localStorage se surakshit hai, jise koi bhi XSS padh sakta hai.',
    },
  },
  {
    question: 'What is the difference between defer and async on a script tag?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Both download the script in parallel with HTML parsing. `async` executes it the MOMENT it finishes downloading, pausing the parser and running scripts in unpredictable order — right for independent scripts such as analytics. `defer` waits until parsing completes and runs deferred scripts in DOCUMENT ORDER — right for application code with dependencies. A plain `<script>` with neither blocks parsing entirely, which is why scripts were traditionally placed at the end of `<body>`.',
      hinglish:
        'Dono script ko HTML parsing ke saath parallel mein download karte hain. `async` use us PAL execute karta hai jab download khatam ho, parser rok kar aur scripts ko anpredictable order mein chala kar — analytics jaise independent scripts ke liye sahi. `defer` parsing khatam hone tak rukta hai aur deferred scripts ko DOCUMENT ORDER mein chalata hai — dependencies wale application code ke liye sahi. Dono ke bina ek plain `<script>` parsing poori tarah block karta hai, isiliye scripts traditionally `<body>` ke end mein rakhi jaati thi.',
    },
  },
  {
    question: 'What is the DOM and how does it relate to HTML?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'HTML is the text the server sends; the DOM is the live tree of objects the browser BUILDS from it and JavaScript manipulates. They diverge immediately: the browser fixes invalid markup, adds implied elements such as `<tbody>`, and any script that adds or removes nodes changes the DOM without changing the HTML. That is why "view source" shows the original HTML while DevTools shows the current DOM, and why they often do not match.',
      hinglish:
        'HTML wo text hai jo server bhejta hai; DOM objects ka wo live tree hai jo browser usse BANATA hai aur JavaScript manipulate karta hai. Wo turant alag ho jaate hain: browser invalid markup theek karta hai, `<tbody>` jaise implied elements jodta hai, aur koi bhi script jo nodes jodti ya hataati hai wo HTML badle bina DOM badalti hai. Isiliye "view source" original HTML dikhata hai jabki DevTools current DOM, aur isiliye wo aksar match nahi karte.',
    },
  },
  {
    question: 'What is the critical rendering path?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'It is the sequence a browser follows to turn bytes into pixels: parse HTML into the DOM, parse CSS into the CSSOM, combine them into the render tree, compute layout, then paint. CSS is RENDER-BLOCKING because nothing can be painted correctly without it, and synchronous scripts are PARSER-BLOCKING. Optimising it means inlining critical CSS, deferring non-critical CSS and all scripts, and reducing how much must be downloaded before the first meaningful paint.',
      hinglish:
        'Ye wo sequence hai jo browser bytes ko pixels banane ke liye follow karta hai: HTML ko DOM mein parse karo, CSS ko CSSOM mein, unhe render tree mein jodo, layout compute karo, phir paint karo. CSS RENDER-BLOCKING hai kyunki uske bina kuch sahi paint nahi ho sakta, aur synchronous scripts PARSER-BLOCKING hain. Ise optimise karne ka matlab hai critical CSS inline karna, non-critical CSS aur saari scripts defer karna, aur pehle meaningful paint se pehle jitna download karna hai wo kam karna.',
    },
  },
  {
    question: 'What is the difference between the load and DOMContentLoaded events?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`DOMContentLoaded` fires when the HTML is parsed and the DOM is built, without waiting for images, stylesheets, or iframes. `load` fires only after EVERY resource has finished. Most initialisation code should use `DOMContentLoaded`, because waiting for a large image to download before attaching a click handler makes the page feel broken for seconds. Use `load` only when you genuinely need final image dimensions or all resources present.',
      hinglish:
        '`DOMContentLoaded` tab fire hota hai jab HTML parse ho jaaye aur DOM ban jaaye, images, stylesheets, ya iframes ka intezaar kiye bina. `load` sirf tab fire hota hai jab HAR resource khatam ho jaaye. Zyadatar initialisation code ko `DOMContentLoaded` use karna chahiye, kyunki ek click handler lagane se pehle ek badi image download hone ka intezaar karna page ko kai second tak toota hua feel karata hai. `load` sirf tab use karo jab tumhe genuinely final image dimensions ya saare resources chahiye.',
    },
  },
  {
    question: 'How do you make images responsive and performant?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Use `srcset` with `sizes` so the browser picks an appropriate resolution for the device rather than downloading a 4000px image for a phone. Use `<picture>` when you need ART DIRECTION — a different crop on mobile — or modern formats such as AVIF and WebP with a fallback. Add `loading="lazy"` for below-the-fold images, and always set `width` and `height` so the browser reserves space and avoids layout shift.',
      hinglish:
        '`srcset` ko `sizes` ke saath use karo taaki browser ek phone ke liye 4000px image download karne ke bajaye device ke liye ek sahi resolution chune. `<picture>` tab use karo jab tumhe ART DIRECTION chahiye — mobile pe ek alag crop — ya ek fallback ke saath AVIF aur WebP jaise modern formats. Below-the-fold images ke liye `loading="lazy"` add karo, aur hamesha `width` aur `height` set karo taaki browser jagah reserve kare aur layout shift se bache.',
    },
  },
  {
    question: 'What causes Cumulative Layout Shift and how do you prevent it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CLS happens when content moves after it has already rendered, which is why people misclick. The usual causes: images and videos without dimensions, ads or embeds injected into the flow, web fonts swapping and changing text metrics, and content inserted above what the user is already reading. Fixes: always set width and height or an `aspect-ratio`, reserve space for dynamic content, use `font-display: optional` or a well-matched fallback, and never insert content above the viewport.',
      hinglish:
        'CLS tab hota hai jab content render hone ke baad hilta hai, isiliye log galat jagah click karte hain. Aam wajahein: bina dimensions ke images aur videos, flow mein daale gaye ads ya embeds, web fonts ka swap hona aur text metrics badalna, aur user jo padh raha hai uske upar content daalna. Fixes: hamesha width aur height ya ek `aspect-ratio` set karo, dynamic content ke liye jagah reserve karo, `font-display: optional` ya ek achhe se milta fallback use karo, aur viewport ke upar kabhi content mat daalo.',
    },
  },
  {
    question: 'What is the viewport meta tag and why is it required?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`<meta name="viewport" content="width=device-width, initial-scale=1">` tells mobile browsers to use the device width as the layout width. Without it, phones assume a desktop-sized viewport around 980px and shrink the whole page down, so your media queries never trigger and text is unreadable. It is a single line and responsive design does not function at all without it. Never add `user-scalable=no`, which blocks zoom and is an accessibility failure.',
      hinglish:
        '`<meta name="viewport" content="width=device-width, initial-scale=1">` mobile browsers ko batata hai ki device width ko layout width ki tarah use karein. Iske bina, phones lagbhag 980px ka ek desktop-size viewport maan lete hain aur poore page ko sikod dete hain, isliye tumhari media queries kabhi trigger nahi hoti aur text padhne layak nahi rehta. Ye ek single line hai aur iske bina responsive design chalta hi nahi. `user-scalable=no` kabhi mat jodo, jo zoom block karta hai aur ek accessibility failure hai.',
    },
  },
  {
    question: 'What is the difference between the dialog element and a custom modal?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The native `<dialog>` with `showModal()` gives you, for free, the things custom modals usually get wrong: a top-layer render above everything regardless of z-index, a `::backdrop` pseudo-element, focus TRAPPED inside, Escape to close, and focus returned to the trigger on close. A div-based modal must implement all of that by hand, and most implementations miss the focus trap, which makes the modal unusable by keyboard.',
      hinglish:
        '`showModal()` wala native `<dialog>` tumhe muft mein wo cheezein deta hai jo custom modals usually galat karte hain: z-index chahe kuch bhi ho sab ke upar ek top-layer render, ek `::backdrop` pseudo-element, andar FASA hua focus, band karne ke liye Escape, aur band hone pe trigger pe wapas focus. Ek div-based modal ko wo sab haath se banana padta hai, aur zyadatar implementations focus trap chhod dete hain, jo modal ko keyboard se bekaar bana deta hai.',
    },
  },
  {
    question: 'What are data attributes and when should you use them?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Custom `data-*` attributes store arbitrary data on an element, readable via `element.dataset.userId`. They are valid HTML and the correct place for small pieces of state a script needs — a row\'s id, a component\'s configuration. Use them for data, not for styling hooks where a class is clearer, and never store large objects or anything sensitive, since everything in the DOM is visible to the user and to any script on the page.',
      hinglish:
        'Custom `data-*` attributes ek element pe koi bhi data store karte hain, jo `element.dataset.userId` se padha ja sakta hai. Ye valid HTML hain aur un chhoti state ke tukdon ke liye sahi jagah jo ek script ko chahiye — ek row ki id, ek component ki configuration. Unhe data ke liye use karo, styling hooks ke liye nahi jahan ek class clearer hai, aur kabhi bade objects ya kuch sensitive store mat karo, kyunki DOM mein sab kuch user aur page ki har script ko dikhta hai.',
    },
  },
  {
    question: 'What is the Fetch API and how does it differ from XMLHttpRequest?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Fetch is the modern promise-based HTTP API, replacing the callback-heavy XHR. Two behaviours surprise people: it does NOT reject on HTTP error statuses — a 404 or 500 resolves normally, so you must check `response.ok` yourself — and it does not send cookies cross-origin unless you set `credentials`. It supports streaming and cancellation via `AbortController`, and unlike XHR it has no built-in upload progress event.',
      hinglish:
        'Fetch modern promise-based HTTP API hai, callback-bhare XHR ko replace karte hue. Do behaviours logon ko chaunkate hain: ye HTTP error statuses pe reject NAHI karta — ek 404 ya 500 normally resolve hota hai, isliye tumhe khud `response.ok` check karna padta hai — aur ye cross-origin cookies nahi bhejta jab tak tum `credentials` set na karo. Ye `AbortController` se streaming aur cancellation support karta hai, aur XHR ke ulat iske paas built-in upload progress event nahi hai.',
    },
  },
  {
    question: 'What are Web Workers and what can they not do?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A Web Worker runs JavaScript on a separate thread, so heavy computation — parsing a large file, image processing, cryptography — does not freeze the UI. Communication is by message passing, with data structured-cloned rather than shared, though `Transferable` objects avoid the copy. What they cannot do is touch the DOM, or access `window` and `document` at all. So a worker computes and posts results back; the main thread renders them.',
      hinglish:
        'Ek Web Worker JavaScript ko ek alag thread pe chalata hai, isliye bhaari computation — ek badi file parse karna, image processing, cryptography — UI ko freeze nahi karta. Communication message passing se hoti hai, data share hone ke bajaye structured-clone hota hai, halaanki `Transferable` objects copy se bachate hain. Jo wo nahi kar sakte wo hai DOM ko chhoona, ya `window` aur `document` ko bilkul access karna. Isliye ek worker compute karke results wapas post karta hai; main thread unhe render karta hai.',
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
        'Ek Service Worker ek script hai jo page aur network ke beech ek programmable PROXY ki tarah kaam karti hai, har request ko intercept karne aur ek cache se jawab dene mein saksham. Isi se offline support, background sync, aur push notifications possible hote hain, aur yahi ek PWA ki neev hai. Ye tab bhi chalta hai jab koi page khula na ho, HTTPS chahta hai, aur uska apna install, activate, aur update ka lifecycle hai — jo "main purana version kyun dekh raha hoon" wale zyadatar bugs ka source bhi hai.',
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
        'Teen requirements: HTTPS, naam, icons, aur display mode batata ek web app MANIFEST, aur offline capability deta ek Service Worker. Wo combination ek site ko home screen pe install hone, bina browser chrome ke launch hone, aur bina network ke chalne deta hai. Checklist se aage, ek achha PWA ek slow connection pe fast hota hai aur gracefully degrade karta hai — baat ye hai ki ek web app jo bina app store ke ek native jaisa behave kare.',
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
        'Ye asynchronously batata hai jab ek element viewport mein aaye ya nikle, ya doosre element se intersect kare. Ye scroll sunne aur `getBoundingClientRect()` call karne ke purane pattern ko replace karta hai, jo lagatar fire hota tha aur synchronous layout force karta tha — janky scrolling ka ek classic karan. Kyunki browser intersections main thread se bahar compute karta hai, ye bahut sasta hai. Ise lazy loading, infinite scroll, scroll-triggered animation, aur impression tracking ke liye use karo.',
    },
  },
  {
    question: 'What is the difference between the audio/video elements and Media Source Extensions?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '`<video src="...">` plays a single complete file, which is fine for short clips. MEDIA SOURCE EXTENSIONS let JavaScript feed media segments to the player programmatically, which is what enables ADAPTIVE STREAMING — switching quality mid-playback based on measured bandwidth, as HLS and DASH do. Every serious streaming service uses MSE, because a single file cannot adapt when a viewer\'s connection degrades halfway through.',
      hinglish:
        '`<video src="...">` ek single poori file chalata hai, jo chhote clips ke liye theek hai. MEDIA SOURCE EXTENSIONS JavaScript ko player ko media segments programmatically dene dete hain, jisse ADAPTIVE STREAMING enable hoti hai — maapi gayi bandwidth ke hisaab se playback ke beech quality badalna, jaise HLS aur DASH karte hain. Har serious streaming service MSE use karti hai, kyunki ek single file adapt nahi kar sakti jab ek viewer ka connection beech mein bigadta hai.',
    },
  },
  {
    question: 'What is Content Security Policy?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'CSP is a response header telling the browser which sources of script, style, image, and connection are allowed, so injected code simply does not execute. It is the strongest defence-in-depth against XSS. A strict policy forbids inline scripts and `eval`, using nonces or hashes for the inline code you genuinely need. Note it is a second layer, not a substitute for escaping output — and a policy full of `unsafe-inline` provides essentially no protection.',
      hinglish:
        'CSP ek response header hai jo browser ko batata hai ki script, style, image, aur connection ke kaunse sources allowed hain, isliye inject kiya code chalta hi nahi. Ye XSS ke khilaaf sabse strong defence-in-depth hai. Ek strict policy inline scripts aur `eval` mana karti hai, jo inline code genuinely chahiye uske liye nonces ya hashes use karte hue. Note karo ye ek doosri layer hai, output escape karne ka substitute nahi — aur `unsafe-inline` se bhari ek policy essentially koi protection nahi deti.',
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
        'Output pe saara user-supplied content escape karo, aur `innerHTML` ke bajaye `textContent` prefer karo taaki markup kabhi interpret na ho. Agar HTML render karna hi hai, use ek maintained library jaise DOMPurify se sanitise karo, ek haath se likhe regex ke bajaye, jo hamesha cases chhod deta hai. Ek doosri layer ke roop mein ek Content Security Policy jodo, session cookies pe `httpOnly` set karo taaki ek safal XSS unhe chura na sake, aur server pe validate karo — akeli client-side sanitisation kuch nahi bachati.',
    },
  },
  {
    question: 'What does the rel="noopener noreferrer" attribute do?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`noopener` prevents the newly opened page from accessing `window.opener`, which it could otherwise use to redirect your original tab to a phishing page — the "tabnabbing" attack. `noreferrer` additionally withholds the Referer header. Modern browsers apply `noopener` automatically for `target="_blank"`, but stating it explicitly is still good practice for older browsers, and `noreferrer` remains a deliberate privacy choice you must opt into.',
      hinglish:
        '`noopener` naye khule page ko `window.opener` access karne se rokta hai, jise wo warna tumhara original tab ek phishing page pe redirect karne ke liye use kar sakta tha — "tabnabbing" attack. `noreferrer` upar se Referer header bhi rok leta hai. Modern browsers `target="_blank"` ke liye `noopener` automatically lagate hain, par ise explicitly likhna purane browsers ke liye abhi bhi achhi practice hai, aur `noreferrer` ek deliberate privacy choice rehta hai jise tumhe khud chunna padta hai.',
    },
  },
  {
    question: 'What is the difference between an iframe and an embed or object?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`<iframe>` embeds a complete separate browsing context — another HTML document with its own scripts and origin — and is the modern choice for maps, videos, and third-party widgets. `<embed>` and `<object>` were designed for plugin content such as Flash and PDFs and are largely legacy. The important part of using an iframe is the security surface: apply `sandbox` to restrict what the embedded page may do, and `allow` to control feature permissions.',
      hinglish:
        '`<iframe>` ek poora alag browsing context embed karta hai — apni scripts aur origin wala ek doosra HTML document — aur maps, videos, aur third-party widgets ke liye modern choice hai. `<embed>` aur `<object>` Flash aur PDFs jaise plugin content ke liye bane the aur zyadatar legacy hain. Iframe use karne ka zaroori hissa security surface hai: embedded page kya kar sakta hai use seemit karne ke liye `sandbox` lagao, aur feature permissions control karne ke liye `allow`.',
    },
  },
  {
    question: 'What is the iframe sandbox attribute?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Adding `sandbox` removes almost every capability from the embedded document: no scripts, no forms, no popups, no top-level navigation, and a unique opaque origin. You then re-grant only what is needed via tokens such as `allow-scripts` and `allow-forms`. The critical caveat is that combining `allow-scripts` with `allow-same-origin` for a page from your own origin lets it remove its own sandbox, which defeats the point entirely.',
      hinglish:
        '`sandbox` jodna embedded document se almost har capability hata deta hai: na scripts, na forms, na popups, na top-level navigation, aur ek unique opaque origin. Phir tum `allow-scripts` aur `allow-forms` jaise tokens se sirf zaroori cheezein wapas dete ho. Critical caveat ye hai ki apne hi origin ke ek page ke liye `allow-scripts` ko `allow-same-origin` ke saath jodna use apna hi sandbox hataane deta hai, jo maksad hi poori tarah khatam kar deta hai.',
    },
  },
  {
    question: 'What is the difference between GET and POST in an HTML form?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'GET puts the form data in the URL query string, so it is bookmarkable, shareable, cached, and logged by servers and proxies — right for searches and filters, wrong for anything sensitive. POST puts data in the request BODY, is not cached or logged in URLs, and has no practical length limit — right for anything that changes state. The rule is that GET must be safe and idempotent: it should never create, modify, or delete.',
      hinglish:
        'GET form data ko URL query string mein daalta hai, isliye wo bookmarkable, shareable, cached, aur servers aur proxies se logged hai — searches aur filters ke liye sahi, kisi bhi sensitive cheez ke liye galat. POST data ko request BODY mein daalta hai, URLs mein cache ya log nahi hota, aur uski koi practical length limit nahi — kisi bhi state badalne wali cheez ke liye sahi. Rule ye hai ki GET safe aur idempotent hona chahiye: use kabhi banana, badalna, ya mitana nahi chahiye.',
    },
  },
  {
    question: 'What is the difference between a block-level and an inline element?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A BLOCK element starts on a new line, takes the full available width, and honours width, height, and vertical margins — `<div>`, `<p>`, `<section>`. An INLINE element flows within text, sizes to its content, and ignores width, height, and vertical margins — `<span>`, `<a>`, `<strong>`. `inline-block` gives the flow behaviour of inline with the box behaviour of block. Note this describes DEFAULT display, and CSS can change it for any element.',
      hinglish:
        'Ek BLOCK element ek nayi line pe shuru hota hai, poori available width leta hai, aur width, height, aur vertical margins maanta hai — `<div>`, `<p>`, `<section>`. Ek INLINE element text ke andar behta hai, apne content ke hisaab se size leta hai, aur width, height, aur vertical margins ignore karta hai — `<span>`, `<a>`, `<strong>`. `inline-block` inline ka flow behaviour block ke box behaviour ke saath deta hai. Note karo ye DEFAULT display batata hai, aur CSS ise kisi bhi element ke liye badal sakta hai.',
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
        '`<!DOCTYPE html>` browser ko batata hai ki quirks mode ke bajaye STANDARDS MODE use kare, quirks ek legacy compatibility mode hai jo 1990s ke browser bugs ki nakal karta hai. Iske bina, box-sizing alag behave karta hai, layout sookshm tareekon se tootta hai, aur jo CSS tumne dhyaan se test ki wo kaam karna band kar deti hai. Ye ek HTML tag nahi hai aur iske koi attributes nahi — HTML5 mein ise jaan boojh kar is ek chhoti line tak kam kiya gaya hai, HTML4 ki lambi DTD strings ke muqable.',
    },
  },
  {
    question: 'What are meta tags used for in SEO and social sharing?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'The `<title>` and `<meta name="description">` are what appear in search results, so they are the most important. `<link rel="canonical">` tells search engines which URL is authoritative when the same content is reachable from several. OPEN GRAPH tags — `og:title`, `og:description`, `og:image` — control how the link renders when shared on social platforms, and Twitter cards do the same for X. Note `meta keywords` has been ignored by search engines for many years.',
      hinglish:
        '`<title>` aur `<meta name="description">` wahi hain jo search results mein dikhte hain, isliye wo sabse zaroori hain. `<link rel="canonical">` search engines ko batata hai ki jab wahi content kai jagah se pahunchta ho to kaunsa URL authoritative hai. OPEN GRAPH tags — `og:title`, `og:description`, `og:image` — control karte hain ki social platforms pe share hone pe link kaise dikhe, aur Twitter cards X ke liye wahi karte hain. Note karo `meta keywords` ko search engines kai saal se ignore karte hain.',
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
        'XHTML strict XML ke roop mein dobara likha HTML hai: har tag band hona chahiye, attributes quoted, tags case-sensitive, aur ek single syntax error ka matlab browser page render karne se bilkul mana kar deta hai. HTML5 uske bajaye kharab markup ke liye exact, kshamashil PARSING RULES define karta hai, isliye browsers fail hone ke bajaye consistently sambhal jaate hain. XHTML ki sakhti asli web pe practical nahi nikli, aur aaj sab HTML5 hi use karte hain.',
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
        '`<template>` aisa markup rakhta hai jo PARSE hota hai par render nahi hota aur jiski scripts nahi chalti, tumhe JavaScript mein clone karne ke liye ek reusable fragment dete hue. `<slot>` ek Web Component ke shadow DOM ke andar ek placeholder hai jahan consumer ka apna content project hota hai. Saath mein wo children wale ek component ka native equivalent hain: template structure define karta hai, aur slots define karte hain ki caller ka diya content kahan jaaye.',
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
        'Shadow DOM ek element se ek alag, encapsulated DOM tree jodta hai, isliye uska markup aur styles ALAG-THALAG hain — bahar ki CSS andar leak nahi hoti aur andar ki styles bahar nahi. Yahi Web Components ke peeche mechanism hai aur `<video>` jaise native controls ke peeche, jinke andar ke buttons tum select nahi kar sakte. Wo isolation hi maksad hai, par iska matlab ye bhi hai ki theming ke liye deliberate hooks chahiye jaise CSS custom properties ya `::part`.',
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
        'Web Components teen native browser features hain jo saath use hote hain: apne tags lifecycle callbacks ke saath define karne ke liye CUSTOM ELEMENTS, style aur markup encapsulation ke liye SHADOW DOM, aur reusable markup ke liye TEMPLATES. Inka faayda framework-agnostic hona hai — wahi component React, Vue, ya plain HTML mein kaam karta hai, isiliye design systems inhe use karte hain. Inke nuksaan zyada verbose likhna, ajeeb form integration, aur kamzor server-side rendering support hain.',
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
        '`contenteditable="true"` kisi bhi element ko user ke liye seedha editable bana deta hai, jo rich-text editors ki neev hai. Practically ye badnaam roop se inconsistent hai: har browser wahi keystroke ke liye alag markup banata hai, paste kahin aur se koi bhi HTML le aata hai, aur undo behaviour alag-alag hota hai. Isiliye ProseMirror, Slate, aur TipTap jaise serious editors apna document model rakhte hain aur contenteditable ko sirf ek input surface maante hain.',
    },
  },
  {
    question: 'How does the browser handle invalid HTML?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'It never fails — the HTML5 spec defines exact recovery rules, so every browser produces the SAME DOM from the same broken markup. Unclosed tags are closed implicitly, misnested tags are reordered, elements in the wrong place are moved (stray content is hoisted out of `<table>`), and required elements such as `<tbody>` are inserted. This consistency is a strength, but the resulting DOM may differ from what you intended, which is why validation still matters.',
      hinglish:
        'Ye kabhi fail nahi hota — HTML5 spec exact recovery rules define karta hai, isliye har browser wahi toote markup se WAHI DOM banata hai. Band na kiye tags implicitly band ho jaate hain, galat nested tags reorder hote hain, galat jagah wale elements hilte hain (bhatka content `<table>` se bahar uthaya jaata hai), aur `<tbody>` jaise zaroori elements daale jaate hain. Ye consistency ek taakat hai, par banne wala DOM tumhare irade se alag ho sakta hai, isiliye validation abhi bhi matter karta hai.',
    },
  },
  {
    question: 'What is the difference between preload, prefetch, and preconnect?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'PRELOAD fetches a resource needed for the CURRENT page at high priority — a font or hero image the parser would otherwise discover late. PREFETCH fetches, at low priority, something likely needed on the NEXT navigation. PRECONNECT performs the DNS, TCP, and TLS handshake to another origin early so the eventual request starts sooner. Overusing preload actively hurts, because it competes for bandwidth with what the page needs right now.',
      hinglish:
        'PRELOAD CURRENT page ke liye zaroori ek resource high priority pe laata hai — ek font ya hero image jise parser warna der se dhoondhta. PREFETCH low priority pe wo laata hai jo AGLI navigation pe shayad chahiye. PRECONNECT ek doosre origin se DNS, TCP, aur TLS handshake pehle kar leta hai taaki asli request jaldi shuru ho. Preload ka zyada istemaal actively nuksaan karta hai, kyunki wo us cheez se bandwidth ke liye ladta hai jo page ko abhi chahiye.',
    },
  },
  {
    question: 'What is lazy loading and when should you not use it?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`loading="lazy"` defers loading an image or iframe until it approaches the viewport, saving bandwidth and speeding up initial load on long pages. The important exception is ABOVE-THE-FOLD content, especially your LCP hero image: lazy-loading it delays the very metric you are trying to improve, because the browser will not start the request until layout is known. Lazy-load what is below the fold, eagerly load — even preload — what is above it.',
      hinglish:
        '`loading="lazy"` ek image ya iframe ko viewport ke paas aane tak load karna taalta hai, bandwidth bachate hue aur lambe pages pe initial load tez karte hue. Zaroori exception ABOVE-THE-FOLD content hai, khaas kar tumhari LCP hero image: use lazy-load karna theek us metric ko der karta hai jise tum behtar karna chahte ho, kyunki browser layout pata chalne tak request shuru nahi karega. Jo fold ke neeche hai use lazy-load karo, jo upar hai use eagerly load — preload bhi — karo.',
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
        'HTML5 browser APIs ka ek bada set laaya: Web Storage, graphics ke liye Canvas aur WebGL, Geolocation, threading ke liye Web Workers, bidirectional communication ke liye WebSockets, client-side routing ke liye History API, Drag and Drop, File API, structured client storage ke liye IndexedDB, Notifications, aur Media APIs. Milkar inhone hi browser ko ek document viewer se ek application platform bana diya.',
    },
  },
  {
    question: 'What is IndexedDB and how does it differ from localStorage?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'IndexedDB is a transactional, indexed database in the browser storing structured objects, blobs, and files, typically with hundreds of megabytes of quota. localStorage stores only STRINGS, caps out around 5-10MB, and is SYNCHRONOUS — so a large read blocks the main thread and janks the page. IndexedDB is asynchronous and queryable by index. Its API is verbose enough that most people use a wrapper such as Dexie or idb.',
      hinglish:
        'IndexedDB browser mein ek transactional, indexed database hai jo structured objects, blobs, aur files store karta hai, typically sau-do sau megabyte quota ke saath. localStorage sirf STRINGS store karta hai, lagbhag 5-10MB pe ruk jaata hai, aur SYNCHRONOUS hai — isliye ek bada read main thread block karke page ko atkata hai. IndexedDB asynchronous hai aur index se queryable. Iska API itna verbose hai ki zyadatar log Dexie ya idb jaisa ek wrapper use karte hain.',
    },
  },
  {
    question: 'How do you test HTML for accessibility?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Automated tools such as axe, Lighthouse, and WAVE catch roughly 30-40% of issues — missing labels, contrast failures, invalid ARIA — so they are a starting point, not a pass. Manual checks catch the rest: navigate the entire page with only the KEYBOARD, confirm focus is always visible and never trapped, test with a screen reader, zoom to 200%, and check that the heading outline makes sense. Accessibility is a behavioural property, and most of it cannot be measured statically.',
      hinglish:
        'axe, Lighthouse, aur WAVE jaise automated tools lagbhag 30-40% issues pakadte hain — missing labels, contrast failures, invalid ARIA — isliye wo ek shuruaat hain, ek pass nahi. Manual checks baaki pakadte hain: poore page ko sirf KEYBOARD se navigate karo, confirm karo ki focus hamesha dikhta hai aur kabhi fasta nahi, ek screen reader se test karo, 200% zoom karo, aur check karo ki heading outline samajh aata hai. Accessibility ek behavioural property hai, aur uska zyadatar hissa statically nahi maapa ja sakta.',
    },
  },
];

export const curriculum = [...intermediate, ...advanced];
