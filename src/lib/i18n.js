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

    // Home — hero banner (dashboard layout)
    'home.hero.title': 'Concept seekho. Phir ',
    'home.hero.titleHl': 'interview question ka jawab do.',
    'home.hero.sub':
      'Daily-life analogies, chalne wala code, ek quiz, aur wahi sawaal jo interview mein poocha jaata hai — har concept, English ya Hinglish mein.',
    'home.hero.ctaPrimary': 'Free mein shuru karo',
    'home.hero.ctaSecondary': 'Courses dekho',
    'home.hero.readIn': 'Padho',
    'home.stats.concepts': 'concepts, dono zubaan mein',
    'home.stats.questions': 'interview questions',
    'home.stats.challenges': 'code challenges',
    'home.stats.free': 'Free',
    'home.stats.freeNote': 'koi paywall nahi',

    // Home — greeting + cockpit
    'home.greet.title': 'Wapas aa gaye — chalo, 10 minute.',
    'home.greet.sub': 'Aaj ka pick neeche hai. Streak zinda rakho.',
    'home.today.label': 'Aaj ka concept',
    'home.today.read': 'Padho + run karo',
    'home.today.quiz': 'Quiz do',
    'home.today.drill': 'Question drill karo',
    'home.streak.title': 'Tumhari streak',
    'home.streak.days': 'din',
    'home.streak.goal': 'Aaj ka goal',
    'home.streak.xp': 'XP',
    'home.continue.title': 'Jahan chhoda tha wahin se',
    'home.continue.all': 'Sab courses',
    'home.continue.empty': 'Abhi koi course shuru nahi kiya. Neeche se ek chuno.',
    'home.rank.title': 'Is hafte',
    'home.rank.resets': 'Monday ko reset',
    'home.rank.you': 'Tum',
    'home.rank.empty': 'Is hafte abhi tak koi XP nahi.',
    'home.quick.challenges': 'Challenges',
    'home.quick.revision': 'Revision',
    'home.quick.discussions': 'Discussions',
    'home.quick.resume': 'Resume',
    'home.quick.certificates': 'Certificates',

    // Home — explore + interview prep
    'home.explore.title': 'Kuch naya shuru karo',
    'home.explore.sub': 'Har course concept → quiz → interview question tak le jaata hai.',
    'home.explore.all': 'Sab',
    'home.explore.open': 'Course kholo',
    'home.prep.badge': 'Interview prep',
    'home.prep.title': 'Har concept ke doosri taraf ek sawaal khada hai',
    'home.prep.sub':
      'Answers English aur Hinglish dono mein, course aur level se filter karo, aur har sawaal apne concept se juda hua hai.',
    'home.prep.browse': 'Questions dekho',
    'home.prep.mock': 'Mock interview shuru karo',
    'home.prep.empty': 'Abhi koi interview question add nahi hua.',

    // Home — signed-out invite
    'home.join.title': 'Streak, XP aur progress save karne ke liye account banao',
    'home.join.sub': 'Free hai. Har concept jo padhoge woh yahin track hota rahega.',
    'home.join.cta': 'Free account banao',

    // Home — concept of the day
    'home.cotd.label': 'Concept of the Day',
    'home.cotd.go': 'Aaj seekho',

    // Home — features (4)
    'home.features': [
      { icon: '🇮🇳', title: 'English + Hinglish', desc: 'Har concept do languages mein — jaise dost samjha raha ho.' },
      { icon: 'lightbulb', title: 'Daily-life examples', desc: '"Closure samjho jaise dabbawala tiffin system." Desi analogies jo yaad rahti hain.' },
      { icon: 'briefcase', title: 'Concept → Interview bridge', desc: 'Har concept ke saath — ye interview mein kaise poochha jaata hai.' },
      { icon: 'brain', title: 'Quick quizzes + XP', desc: 'Padho, quiz do, XP lo, streak banao. Retention ke liye.' },
    ],

    // Home — toolkit showcase
    'home.showcase.title': 'Sirf padhna nahi — pura learning toolkit',
    'home.showcase.sub':
      'Har course ke andar interactive features — practice karo, code chalao, doubts poocho, aur progress track karo. Sab ek hi jagah.',
    'home.highlights': [
      { icon: 'brain', title: 'Practice Quiz', desc: 'Har course ka timed quiz — khud ko test karo, score + retry.', href: '/courses' },
      { icon: 'microphone', title: 'Mock Interview', desc: 'Course ke interview questions flip-card se practice karo.', href: '/courses' },
      { icon: 'comments', title: 'Discussion Board', desc: 'Har course pe doubts discuss karo, community se seekho.', href: '/courses' },
      { icon: 'code', title: 'Code Playground', desc: 'Concept page pe code browser mein hi run karo.', href: '/courses' },
      { icon: 'muscle', title: 'Code Challenges', desc: 'Coding challenges solve karke XP kamao.', href: '/challenges' },
      { icon: 'briefcase', title: 'Interview Questions', desc: 'EN + Hinglish answers, course aur level se filter.', href: '/interview-questions' },
      { icon: 'repeat', title: 'Spaced Revision', desc: 'Seekha hua flashcards se revise — yaad rakho.', href: '/revise' },
      { icon: 'fire', title: 'XP, Streaks & Leaderboard', desc: 'Gamified learning — top rank ke liye compete karo.', href: '/leaderboard' },
      { icon: 'medal', title: 'Badges & Certificates', desc: 'Achievements unlock karo, certificate LinkedIn pe share karo.', href: '/dashboard' },
      { icon: 'map', title: 'Roadmaps', desc: 'Structured learning paths — kya, kis order mein padhna hai.', href: '/roadmaps' },
    ],

    // Home — career toolkit
    'home.career.badge': 'Naukri-ready bano',
    'home.career.title': 'Seekho, prove karo, job pao',
    'home.career.sub':
      'Sirf concepts nahi — course complete karke certificate kamao aur apna professional resume yahin bana ke PDF download karo.',
    'home.resume.title': 'Resume Builder',
    'home.resume.desc':
      'Live preview ke saath professional resume banao — experience, projects, skills sab add karo. Skills seedhe apne completed courses se import karo, theme choose karo, aur ek click mein PDF download.',
    'home.resume.bullets': ['Live A4 preview, 3 colour themes', 'Courses se skills auto-import', 'Print → Save as PDF'],
    'home.resume.cta': 'Build your resume',
    'home.cert.title': 'Certificates',
    'home.cert.desc':
      'Koi bhi course 100% complete karo aur ek shareable Certificate of Completion pao — unique certificate ID ke saath. Download karo ya LinkedIn pe share karke apni learning dikhao.',
    'home.cert.bullets': ['Course complete pe auto-unlock', 'Unique verifiable certificate ID', 'Download / LinkedIn pe share'],
    'home.cert.cta': 'Earn a certificate',

    // Home — courses
    'home.courses.title': 'Popular courses',
    'home.courses.viewAll': 'View all',
    'home.courses.empty': 'No courses yet. Run the seed script to add starter content:',

    // Concept reader
    'reader.langNote': 'Language top bar se control hoti hai',
    'reader.dailyExample': 'Daily-life example',
    'reader.codeExample': 'Code example',
    'reader.keyPoints': 'Key points',
    'reader.interviewHeading': 'Interview mein aise poochha jaata hai',
    'reader.completed': 'Completed',
    'reader.markDone': 'Mark as done',
    'reader.saving': 'Saving...',
    'reader.loginToSave': 'progress save aur XP ke liye',
    'reader.loginToClaim': 'Login karo aur XP + streak claim karo!',

    // Dashboard
    'dash.greeting': 'Hi',
    'dash.sub': 'Aaj kuch naya seekha?',
    'dash.publicProfile': 'Public profile',
    'dash.keepLearning': 'Keep learning',
    'dash.buildResume': 'Build resume',
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

    // Home — hero banner (dashboard layout)
    'home.hero.title': 'Learn the concept. Then answer the ',
    'home.hero.titleHl': 'interview question.',
    'home.hero.sub':
      'Daily-life analogies, code you can run, a quiz, and the exact question it turns into — every concept, in English or Hinglish.',
    'home.hero.ctaPrimary': 'Start learning free',
    'home.hero.ctaSecondary': 'Browse courses',
    'home.hero.readIn': 'Read in',
    'home.stats.concepts': 'concepts, both languages',
    'home.stats.questions': 'interview questions',
    'home.stats.challenges': 'code challenges',
    'home.stats.free': 'Free',
    'home.stats.freeNote': 'no paywall, ever',

    // Home — greeting + cockpit
    'home.greet.title': 'Welcome back — ten minutes is enough.',
    'home.greet.sub': 'Today\u2019s pick is below. Keep the streak alive.',
    'home.today.label': 'Today\u2019s concept',
    'home.today.read': 'Read + run',
    'home.today.quiz': 'Take the quiz',
    'home.today.drill': 'Drill the question',
    'home.streak.title': 'Your streak',
    'home.streak.days': 'days',
    'home.streak.goal': 'Today\u2019s goal',
    'home.streak.xp': 'XP',
    'home.continue.title': 'Pick up where you left off',
    'home.continue.all': 'All courses',
    'home.continue.empty': 'No course started yet. Pick one below.',
    'home.rank.title': 'This week',
    'home.rank.resets': 'resets Monday',
    'home.rank.you': 'You',
    'home.rank.empty': 'No XP scored this week yet.',
    'home.quick.challenges': 'Challenges',
    'home.quick.revision': 'Revision',
    'home.quick.discussions': 'Discussions',
    'home.quick.resume': 'Resume',
    'home.quick.certificates': 'Certificates',

    // Home — explore + interview prep
    'home.explore.title': 'Start something new',
    'home.explore.sub': 'Every course runs concept \u2192 quiz \u2192 interview question, all the way through.',
    'home.explore.all': 'All',
    'home.explore.open': 'Open course',
    'home.prep.badge': 'Interview prep',
    'home.prep.title': 'Every concept has a question waiting on the other side',
    'home.prep.sub':
      'Answers in English and Hinglish, filtered by course and level, each one linked back to the concept it came from.',
    'home.prep.browse': 'Browse questions',
    'home.prep.mock': 'Start a mock interview',
    'home.prep.empty': 'No interview questions added yet.',

    // Home — signed-out invite
    'home.join.title': 'Create an account to keep your streak, XP and progress',
    'home.join.sub': 'It\u2019s free. Everything you read from here on gets tracked.',
    'home.join.cta': 'Create a free account',

    // Home — concept of the day
    'home.cotd.label': 'Concept of the Day',
    'home.cotd.go': 'Learn today',

    // Home — features (4)
    'home.features': [
      { icon: '🇮🇳', title: 'English + Hinglish', desc: 'Every concept in two languages — like a friend explaining it to you.' },
      { icon: 'lightbulb', title: 'Daily-life examples', desc: '"Think of a closure like the dabbawala tiffin system." Analogies that stick.' },
      { icon: 'briefcase', title: 'Concept → Interview bridge', desc: 'Every concept shows how it gets asked in interviews.' },
      { icon: 'brain', title: 'Quick quizzes + XP', desc: 'Read, take the quiz, earn XP, build a streak — for retention.' },
    ],

    // Home — toolkit showcase
    'home.showcase.title': 'Not just reading — a complete learning toolkit',
    'home.showcase.sub':
      'Interactive features inside every course — practice, run code, ask doubts, and track progress. All in one place.',
    'home.highlights': [
      { icon: 'brain', title: 'Practice Quiz', desc: 'A timed quiz for every course — test yourself, score and retry.', href: '/courses' },
      { icon: 'microphone', title: 'Mock Interview', desc: 'Practice a course’s interview questions with flip-cards.', href: '/courses' },
      { icon: 'comments', title: 'Discussion Board', desc: 'Discuss doubts on every course and learn from the community.', href: '/courses' },
      { icon: 'code', title: 'Code Playground', desc: 'Run code right in the browser on the concept page.', href: '/courses' },
      { icon: 'muscle', title: 'Code Challenges', desc: 'Solve coding challenges and earn XP.', href: '/challenges' },
      { icon: 'briefcase', title: 'Interview Questions', desc: 'EN + Hinglish answers, filter by course and level.', href: '/interview-questions' },
      { icon: 'repeat', title: 'Spaced Revision', desc: 'Revise what you learnt with flashcards — remember it.', href: '/revise' },
      { icon: 'fire', title: 'XP, Streaks & Leaderboard', desc: 'Gamified learning — compete for the top rank.', href: '/leaderboard' },
      { icon: 'medal', title: 'Badges & Certificates', desc: 'Unlock achievements, share your certificate on LinkedIn.', href: '/dashboard' },
      { icon: 'map', title: 'Roadmaps', desc: 'Structured learning paths — what to learn and in what order.', href: '/roadmaps' },
    ],

    // Home — career toolkit
    'home.career.badge': 'Get job-ready',
    'home.career.title': 'Learn it, prove it, get the job',
    'home.career.sub':
      'Not just concepts — complete a course to earn a certificate, and build your professional resume right here as a PDF.',
    'home.resume.title': 'Resume Builder',
    'home.resume.desc':
      'Build a professional resume with live preview — add experience, projects and skills. Import skills straight from your completed courses, pick a theme, and download a PDF in one click.',
    'home.resume.bullets': ['Live A4 preview, 3 colour themes', 'Auto-import skills from courses', 'Print → Save as PDF'],
    'home.resume.cta': 'Build your resume',
    'home.cert.title': 'Certificates',
    'home.cert.desc':
      'Complete any course 100% and get a shareable Certificate of Completion — with a unique certificate ID. Download it or share on LinkedIn to show your learning.',
    'home.cert.bullets': ['Auto-unlocks on course completion', 'Unique verifiable certificate ID', 'Download / share on LinkedIn'],
    'home.cert.cta': 'Earn a certificate',

    // Home — courses
    'home.courses.title': 'Popular courses',
    'home.courses.viewAll': 'View all',
    'home.courses.empty': 'No courses yet. Run the seed script to add starter content:',

    // Concept reader
    'reader.langNote': 'Language is controlled from the top bar',
    'reader.dailyExample': 'Daily-life example',
    'reader.codeExample': 'Code example',
    'reader.keyPoints': 'Key points',
    'reader.interviewHeading': 'How this is asked in interviews',
    'reader.completed': 'Completed',
    'reader.markDone': 'Mark as done',
    'reader.saving': 'Saving...',
    'reader.loginToSave': 'to save progress & earn XP',
    'reader.loginToClaim': 'Login to claim XP + streak!',

    // Dashboard
    'dash.greeting': 'Hi',
    'dash.sub': 'Learnt something new today?',
    'dash.publicProfile': 'Public profile',
    'dash.keepLearning': 'Keep learning',
    'dash.buildResume': 'Build resume',
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
