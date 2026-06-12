// Site-wide UI translations. Two languages:
//   'hi' = Hinglish (the site default — Bharat-first)
//   'en' = English
// DB content (concepts, interview answers) is already bilingual and is handled
// separately by the components that render it.

export const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'Hinglish', short: 'हिं' },
];

export const DEFAULT_LANG = 'en';

const DICT = {
  hi: {
    // Nav
    'nav.courses': 'Courses',
    'nav.challenges': 'Challenges',
    'nav.roadmaps': 'Roadmaps',
    'nav.interview': 'Interview',
    'nav.leaderboard': 'Leaderboard',
    'nav.revise': 'Revise',
    'nav.resume': 'Resume',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.signup': 'Sign up',
    'nav.logout': 'Logout',
    'nav.search': 'Search…',

    // Footer
    'footer.tagline':
      'Bharat ke developers ke liye — concepts in Hinglish, with desi examples, code aur interview prep. Seekho easy way mein.',
    'footer.built': 'Built with Next.js.',

    // Home — hero
    'home.badge': 'Bharat ke developers ke liye 🇮🇳',
    'home.title.prefix': 'Concepts seekho ',
    'home.title.highlight': 'easiest way',
    'home.title.suffix': ' mein',
    'home.subtitle':
      'Programming concepts in English + Hinglish, daily-life examples ke saath, code, quizzes aur interview questions. Boring docs nahi — engaging learning.',
    'home.cta.explore': 'Explore courses',
    'home.cta.interview': 'Interview questions',
    'home.langPick': 'Apni language choose karo:',

    // Home — concept of the day
    'home.cotd.label': '🎯 Concept of the Day',
    'home.cotd.go': 'Aaj seekho →',

    // Home — features (4)
    'home.features': [
      { icon: '🇮🇳', title: 'English + Hinglish', desc: 'Har concept do languages mein — jaise dost samjha raha ho.' },
      { icon: '🪔', title: 'Daily-life examples', desc: '"Closure samjho jaise dabbawala tiffin system." Desi analogies jo yaad rahti hain.' },
      { icon: '💼', title: 'Concept → Interview bridge', desc: 'Har concept ke saath — ye interview mein kaise poochha jaata hai.' },
      { icon: '🧠', title: 'Quick quizzes + XP', desc: 'Padho, quiz do, XP lo, streak banao. Retention ke liye.' },
    ],

    // Home — toolkit showcase
    'home.showcase.title': 'Sirf padhna nahi — pura learning toolkit 🚀',
    'home.showcase.sub':
      'Har course ke andar interactive features — practice karo, code chalao, doubts poocho, aur progress track karo. Sab ek hi jagah.',
    'home.highlights': [
      { icon: '🧠', title: 'Practice Quiz', desc: 'Har course ka timed quiz — khud ko test karo, score + retry.', href: '/courses' },
      { icon: '🎤', title: 'Mock Interview', desc: 'Course ke interview questions flip-card se practice karo.', href: '/courses' },
      { icon: '💬', title: 'Discussion Board', desc: 'Har course pe doubts discuss karo, community se seekho.', href: '/courses' },
      { icon: '💻', title: 'Code Playground', desc: 'Concept page pe code browser mein hi run karo.', href: '/courses' },
      { icon: '💪', title: 'Code Challenges', desc: 'Coding challenges solve karke XP kamao.', href: '/challenges' },
      { icon: '💼', title: 'Interview Questions', desc: 'EN + Hinglish answers, course aur level se filter.', href: '/interview-questions' },
      { icon: '🔁', title: 'Spaced Revision', desc: 'Seekha hua flashcards se revise — yaad rakho.', href: '/revise' },
      { icon: '🔥', title: 'XP, Streaks & Leaderboard', desc: 'Gamified learning — top rank ke liye compete karo.', href: '/leaderboard' },
      { icon: '🏅', title: 'Badges & Certificates', desc: 'Achievements unlock karo, certificate LinkedIn pe share karo.', href: '/dashboard' },
      { icon: '🗺️', title: 'Roadmaps', desc: 'Structured learning paths — kya, kis order mein padhna hai.', href: '/roadmaps' },
    ],

    // Home — career toolkit
    'home.career.badge': 'Naukri-ready bano 💼',
    'home.career.title': 'Seekho, prove karo, job pao',
    'home.career.sub':
      'Sirf concepts nahi — course complete karke certificate kamao aur apna professional resume yahin bana ke PDF download karo.',
    'home.resume.title': 'Resume Builder',
    'home.resume.desc':
      'Live preview ke saath professional resume banao — experience, projects, skills sab add karo. Skills seedhe apne completed courses se import karo, theme choose karo, aur ek click mein PDF download.',
    'home.resume.bullets': ['✓ Live A4 preview, 3 colour themes', '✓ Courses se skills auto-import', '✓ Print → Save as PDF'],
    'home.resume.cta': 'Build your resume →',
    'home.cert.title': 'Certificates',
    'home.cert.desc':
      'Koi bhi course 100% complete karo aur ek shareable Certificate of Completion pao — unique certificate ID ke saath. Download karo ya LinkedIn pe share karke apni learning dikhao.',
    'home.cert.bullets': ['✓ Course complete pe auto-unlock', '✓ Unique verifiable certificate ID', '✓ Download / LinkedIn pe share'],
    'home.cert.cta': 'Earn a certificate →',

    // Home — courses
    'home.courses.title': 'Popular courses',
    'home.courses.viewAll': 'View all →',
    'home.courses.empty': 'No courses yet. Run the seed script to add starter content:',

    // Concept reader
    'reader.langNote': 'Language top bar se control hoti hai',
    'reader.dailyExample': 'Daily-life example',
    'reader.codeExample': 'Code example',
    'reader.keyPoints': 'Key points',
    'reader.interviewHeading': '💼 Interview mein aise poochha jaata hai',
    'reader.completed': '✅ Completed',
    'reader.markDone': 'Mark as done',
    'reader.saving': 'Saving...',
    'reader.loginToSave': 'progress save aur XP ke liye',
    'reader.loginToClaim': 'Login karo aur XP + streak claim karo!',

    // Dashboard
    'dash.greeting': 'Hi',
    'dash.sub': 'Aaj kuch naya seekha?',
    'dash.publicProfile': '🔗 Public profile',
    'dash.keepLearning': 'Keep learning',
    'dash.buildResume': '📄 Build resume',
  },

  en: {
    // Nav
    'nav.courses': 'Courses',
    'nav.challenges': 'Challenges',
    'nav.roadmaps': 'Roadmaps',
    'nav.interview': 'Interview',
    'nav.leaderboard': 'Leaderboard',
    'nav.revise': 'Revise',
    'nav.resume': 'Resume',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.signup': 'Sign up',
    'nav.logout': 'Logout',
    'nav.search': 'Search…',

    // Footer
    'footer.tagline':
      'For developers in India — concepts in plain language, with everyday examples, code and interview prep. Learn the easy way.',
    'footer.built': 'Built with Next.js.',

    // Home — hero
    'home.badge': 'Made for developers in India 🇮🇳',
    'home.title.prefix': 'Learn concepts the ',
    'home.title.highlight': 'easiest way',
    'home.title.suffix': '',
    'home.subtitle':
      'Programming concepts in English and Hinglish, with daily-life examples, code, quizzes and interview questions. Not boring docs — engaging learning.',
    'home.cta.explore': 'Explore courses',
    'home.cta.interview': 'Interview questions',
    'home.langPick': 'Choose your language:',

    // Home — concept of the day
    'home.cotd.label': '🎯 Concept of the Day',
    'home.cotd.go': 'Learn today →',

    // Home — features (4)
    'home.features': [
      { icon: '🇮🇳', title: 'English + Hinglish', desc: 'Every concept in two languages — like a friend explaining it to you.' },
      { icon: '🪔', title: 'Daily-life examples', desc: '"Think of a closure like the dabbawala tiffin system." Analogies that stick.' },
      { icon: '💼', title: 'Concept → Interview bridge', desc: 'Every concept shows how it gets asked in interviews.' },
      { icon: '🧠', title: 'Quick quizzes + XP', desc: 'Read, take the quiz, earn XP, build a streak — for retention.' },
    ],

    // Home — toolkit showcase
    'home.showcase.title': 'Not just reading — a complete learning toolkit 🚀',
    'home.showcase.sub':
      'Interactive features inside every course — practice, run code, ask doubts, and track progress. All in one place.',
    'home.highlights': [
      { icon: '🧠', title: 'Practice Quiz', desc: 'A timed quiz for every course — test yourself, score and retry.', href: '/courses' },
      { icon: '🎤', title: 'Mock Interview', desc: 'Practice a course’s interview questions with flip-cards.', href: '/courses' },
      { icon: '💬', title: 'Discussion Board', desc: 'Discuss doubts on every course and learn from the community.', href: '/courses' },
      { icon: '💻', title: 'Code Playground', desc: 'Run code right in the browser on the concept page.', href: '/courses' },
      { icon: '💪', title: 'Code Challenges', desc: 'Solve coding challenges and earn XP.', href: '/challenges' },
      { icon: '💼', title: 'Interview Questions', desc: 'EN + Hinglish answers, filter by course and level.', href: '/interview-questions' },
      { icon: '🔁', title: 'Spaced Revision', desc: 'Revise what you learnt with flashcards — remember it.', href: '/revise' },
      { icon: '🔥', title: 'XP, Streaks & Leaderboard', desc: 'Gamified learning — compete for the top rank.', href: '/leaderboard' },
      { icon: '🏅', title: 'Badges & Certificates', desc: 'Unlock achievements, share your certificate on LinkedIn.', href: '/dashboard' },
      { icon: '🗺️', title: 'Roadmaps', desc: 'Structured learning paths — what to learn and in what order.', href: '/roadmaps' },
    ],

    // Home — career toolkit
    'home.career.badge': 'Get job-ready 💼',
    'home.career.title': 'Learn it, prove it, get the job',
    'home.career.sub':
      'Not just concepts — complete a course to earn a certificate, and build your professional resume right here as a PDF.',
    'home.resume.title': 'Resume Builder',
    'home.resume.desc':
      'Build a professional resume with live preview — add experience, projects and skills. Import skills straight from your completed courses, pick a theme, and download a PDF in one click.',
    'home.resume.bullets': ['✓ Live A4 preview, 3 colour themes', '✓ Auto-import skills from courses', '✓ Print → Save as PDF'],
    'home.resume.cta': 'Build your resume →',
    'home.cert.title': 'Certificates',
    'home.cert.desc':
      'Complete any course 100% and get a shareable Certificate of Completion — with a unique certificate ID. Download it or share on LinkedIn to show your learning.',
    'home.cert.bullets': ['✓ Auto-unlocks on course completion', '✓ Unique verifiable certificate ID', '✓ Download / share on LinkedIn'],
    'home.cert.cta': 'Earn a certificate →',

    // Home — courses
    'home.courses.title': 'Popular courses',
    'home.courses.viewAll': 'View all →',
    'home.courses.empty': 'No courses yet. Run the seed script to add starter content:',

    // Concept reader
    'reader.langNote': 'Language is controlled from the top bar',
    'reader.dailyExample': 'Daily-life example',
    'reader.codeExample': 'Code example',
    'reader.keyPoints': 'Key points',
    'reader.interviewHeading': '💼 How this is asked in interviews',
    'reader.completed': '✅ Completed',
    'reader.markDone': 'Mark as done',
    'reader.saving': 'Saving...',
    'reader.loginToSave': 'to save progress & earn XP',
    'reader.loginToClaim': 'Login to claim XP + streak!',

    // Dashboard
    'dash.greeting': 'Hi',
    'dash.sub': 'Learnt something new today?',
    'dash.publicProfile': '🔗 Public profile',
    'dash.keepLearning': 'Keep learning',
    'dash.buildResume': '📄 Build resume',
  },
};

export function translate(lang, key) {
  const l = DICT[lang] ? lang : DEFAULT_LANG;
  const val = DICT[l][key];
  if (val !== undefined) return val;
  // fall back to the default language, then the key itself
  const fallback = DICT[DEFAULT_LANG][key];
  return fallback !== undefined ? fallback : key;
}
