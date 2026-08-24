// Central FontAwesome registry.
//
// Two ways to ask for an icon:
//   1. by semantic name  - <Icon name="fire" />
//   2. by legacy emoji   - <Icon name="\u{1F525}" />
//
// (2) exists because course icons live in MongoDB and roadmap icons live in
// src/data/roadmaps.js as emoji strings. Mapping them here means the UI renders
// pure FontAwesome without needing a data migration; anything unmapped falls
// back to rendering the original glyph.

import {
  faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faArrowUpRightFromSquare,
  faAward, faBell, faBolt, faBook, faBookOpen, faBookmark, faBrain, faBriefcase,
  faBug, faBullseye, faCalendarDays, faCheck, faCircleCheck, faCircleExclamation,
  faCircleQuestion, faCircleXmark, faClock, faCode, faComments, faCopy, faCrown,
  faCalculator, faDatabase, faDesktop, faDiagramProject, faDivide, faDownload, faEnvelope,
  faFaceDizzy, faFileLines, faFire, faFloppyDisk, faGaugeHigh, faGem,
  faGraduationCap, faHandsClapping, faHandPointUp, faHashtag, faLayerGroup,
  faLightbulb, faLink, faListCheck, faLocationDot, faLock, faMagnifyingGlass,
  faMedal, faMicrophone, faMoon, faPalette, faParachuteBox, faPersonRunning,
  faPlay, faPrint, faPuzzlePiece, faRepeat, faRobot, faRocket, faRotate,
  faSatelliteDish, faSeedling, faServer, faShareNodes, faShieldHalved, faSpa,
  faSun, faTag, faThumbsUp, faTrophy, faUnlockKeyhole, faUsers,
  faWandMagicSparkles, faXmark, faBars, faChevronDown, faChartLine,
  faChartColumn, faCircle, faCircleDot, faSquare, faScrewdriverWrench, faShip,
  faTrainSubway, faTriangleExclamation, faTowerBroadcast, faWind, faGlobe,
  faHeart, faStar, faThumbtack, faTable, faSitemap, faPhone, faCaretUp,
} from '@fortawesome/free-solid-svg-icons';

import {
  faDocker, faReact, faNodeJs, faPython, faJs, faHtml5, faCss3Alt, faGitAlt,
  faGithub, faLinkedin, faXTwitter, faWhatsapp, faAws, faEnvira, faJava,
} from '@fortawesome/free-brands-svg-icons';

// Semantic name -> FA definition. Keep the keys human-readable; these are what
// application code should use for new work.
export const ICONS = {
  'arrow-down': faArrowDown,
  'arrow-left': faArrowLeft,
  'arrow-right': faArrowRight,
  'arrow-up': faArrowUp,
  'external-link': faArrowUpRightFromSquare,
  award: faAward,
  bars: faBars,
  bell: faBell,
  bolt: faBolt,
  book: faBook,
  'book-open': faBookOpen,
  bookmark: faBookmark,
  brain: faBrain,
  briefcase: faBriefcase,
  bug: faBug,
  calculator: faCalculator,
  calendar: faCalendarDays,
  'caret-up': faCaretUp,
  chart: faChartColumn,
  'chart-line': faChartLine,
  check: faCheck,
  'check-circle': faCircleCheck,
  'chevron-down': faChevronDown,
  circle: faCircle,
  'circle-dot': faCircleDot,
  clock: faClock,
  code: faCode,
  comments: faComments,
  copy: faCopy,
  crown: faCrown,
  database: faDatabase,
  desktop: faDesktop,
  divide: faDivide,
  dizzy: faFaceDizzy,
  docker: faDocker,
  download: faDownload,
  envelope: faEnvelope,
  'error-circle': faCircleExclamation,
  file: faFileLines,
  fire: faFire,
  gem: faGem,
  globe: faGlobe,
  graduation: faGraduationCap,
  'hand-point-up': faHandPointUp,
  hashtag: faHashtag,
  heart: faHeart,
  javascript: faJs,
  layers: faLayerGroup,
  leaf: faEnvira,
  lightbulb: faLightbulb,
  link: faLink,
  'list-check': faListCheck,
  'location-dot': faLocationDot,
  lock: faLock,
  map: faSitemap,
  medal: faMedal,
  microphone: faMicrophone,
  moon: faMoon,
  muscle: faPersonRunning,
  node: faNodeJs,
  palette: faPalette,
  parachute: faParachuteBox,
  phone: faPhone,
  play: faPlay,
  print: faPrint,
  project: faDiagramProject,
  puzzle: faPuzzlePiece,
  python: faPython,
  question: faCircleQuestion,
  react: faReact,
  repeat: faRepeat,
  robot: faRobot,
  rocket: faRocket,
  rotate: faRotate,
  satellite: faSatelliteDish,
  save: faFloppyDisk,
  search: faMagnifyingGlass,
  seedling: faSeedling,
  server: faServer,
  share: faShareNodes,
  shield: faShieldHalved,
  ship: faShip,
  spa: faSpa,
  sparkles: faWandMagicSparkles,
  speed: faGaugeHigh,
  square: faSquare,
  star: faStar,
  sun: faSun,
  table: faTable,
  tag: faTag,
  target: faBullseye,
  'thumbs-up': faThumbsUp,
  thumbtack: faThumbtack,
  train: faTrainSubway,
  trophy: faTrophy,
  unlock: faUnlockKeyhole,
  users: faUsers,
  warning: faTriangleExclamation,
  wave: faHandsClapping,
  wind: faWind,
  wrench: faScrewdriverWrench,
  x: faXmark,
  'x-circle': faCircleXmark,
  // brands used by share buttons / course + roadmap cards
  aws: faAws,
  broadcast: faTowerBroadcast,
  css: faCss3Alt,
  git: faGitAlt,
  github: faGithub,
  html: faHtml5,
  java: faJava,
  linkedin: faLinkedin,
  twitter: faXTwitter,
  whatsapp: faWhatsapp,
};

// Legacy emoji -> semantic name. Variation selectors are stripped before lookup.
export const EMOJI_TO_ICON = {
  '\u{1F680}': 'rocket',
  '\u{1F9E0}': 'brain',
  '\u{1F525}': 'fire',
  '\u{1F331}': 'seedling',
  '✅': 'check-circle',
  '✓': 'check',
  '✔': 'check',
  '\u{1F4BC}': 'briefcase',
  '\u{1F4AC}': 'comments',
  '\u{1F3A4}': 'microphone',
  '\u{1FA94}': 'lightbulb',
  '\u{1F4D8}': 'book',
  '\u{1F3C6}': 'trophy',
  '\u{1F393}': 'graduation',
  '⚡': 'bolt',
  '\u{1F64C}': 'wave',
  '\u{1F44B}': 'wave',
  '\u{1F4DA}': 'book-open',
  '\u{1F4C4}': 'file',
  '\u{1F4D6}': 'book-open',
  '\u{1F433}': 'docker',
  '\u{1F3C5}': 'medal',
  '\u{1F389}': 'sparkles',
  '✨': 'sparkles',
  '\u{1F310}': 'globe',
  '❌': 'x-circle',
  '✗': 'x',
  '✕': 'x',
  '⚙': 'wrench',
  '\u{1F527}': 'wrench',
  '⏱': 'clock',
  '\u{1F5D3}': 'calendar',
  '\u{1F517}': 'link',
  '\u{1F516}': 'bookmark',
  '\u{1F514}': 'bell',
  '\u{1F512}': 'lock',
  '\u{1F510}': 'lock',
  '\u{1F501}': 'repeat',
  '\u{1F504}': 'rotate',
  '\u{1F4BB}': 'code',
  '\u{1F5A5}': 'desktop',
  '\u{1F4A1}': 'lightbulb',
  '\u{1F418}': 'database',
  '\u{1F5C4}': 'database',
  '\u{1F5C3}': 'database',
  '\u{1F3AF}': 'target',
  '⚛': 'react',
  '\u{1F916}': 'robot',
  '\u{1F7E2}': 'node',
  '\u{1F343}': 'leaf',
  '\u{1F33F}': 'leaf',
  '\u{1F5FA}': 'map',
  '\u{1F4CC}': 'thumbtack',
  '\u{1F4CA}': 'chart',
  '\u{1F4C8}': 'chart-line',
  '\u{1F4AA}': 'muscle',
  '\u{1F44D}': 'thumbs-up',
  '\u{1F40D}': 'python',
  '\u{1F3F7}': 'tag',
  '\u{1F3A8}': 'palette',
  '⬇': 'arrow-down',
  '↓': 'arrow-down',
  '↑': 'arrow-up',
  '←': 'arrow-left',
  '→': 'arrow-right',
  '↗': 'external-link',
  '▶': 'play',
  '▲': 'caret-up',
  '\u{1F9F1}': 'layers',
  '\u{1F9E9}': 'puzzle',
  '\u{1F9E1}': 'heart',
  '\u{1F947}': 'medal',
  '\u{1F948}': 'medal',
  '\u{1F949}': 'medal',
  '\u{1F7E8}': 'javascript',
  '\u{1F6A2}': 'ship',
  '\u{1F682}': 'train',
  '\u{1F635}': 'dizzy',
  '\u{1F5E3}': 'comments',
  '\u{1F5A8}': 'print',
  '\u{1F537}': 'square',
  '\u{1F522}': 'hashtag',
  '\u{1F50E}': 'search',
  '\u{1F4E1}': 'satellite',
  '\u{1F4CD}': 'location-dot',
  '\u{1F4BE}': 'save',
  '\u{1F4A8}': 'wind',
  '\u{1F48E}': 'gem',
  '\u{1F451}': 'crown',
  '\u{1F43C}': 'python',
  '\u{1F422}': 'python',
  '\u{1F3D7}': 'project',
  '\u{1F319}': 'moon',
  '➗': 'divide',
  '❓': 'question',
  '✉': 'envelope',
  '⚪': 'circle',
  '⚠': 'warning',
  '☰': 'bars',
  '☎': 'phone',
  '☕': 'java',
  '🐬': 'database',
  '🧮': 'calculator',
  '☀': 'sun',
  '⌥': 'hand-point-up',
};

// Strip emoji variation selectors / ZWJ so a glyph with or without them matches.
function normalize(key) {
  return String(key).replace(/[︎️‍]/g, '');
}

// Brand colours for technology icons, so a course reads as itself at a glance
// (JS yellow, Docker blue, Node green) instead of the generic theme indigo.
//
// `dark` is the official brand hex, which is tuned for dark surfaces and is
// what the brand guidelines specify. `light` is the same colour darkened just
// enough to stay legible on white — several brand palettes (JS yellow, React
// cyan, Next.js black) fail contrast on one background or the other, so each
// mark gets the variant that suits the active theme. Where a brand publishes
// its own on-light and on-dark values (React, Node, MongoDB), those are used
// verbatim rather than a mechanical darkening.
export const BRAND_COLORS = {
  // ── Languages & runtimes ──
  javascript: { light: '#B59A00', dark: '#F7DF1E' },  // JS yellow #F7DF1E
  node:       { light: '#3C873A', dark: '#5FA04E' },  // Node green #5FA04E
  python:     { light: '#2B5B84', dark: '#4B8BBE' },  // Python blue #3776AB
  java:       { light: '#C25A00', dark: '#F89820' },  // Java orange #E76F00
  html:       { light: '#D64B22', dark: '#E34F26' },  // HTML5 #E34F26
  css:        { light: '#1572B6', dark: '#519AB8' },  // CSS3 #1572B6
  square:     { light: '#2A69B0', dark: '#3178C6' },  // TypeScript #3178C6

  // ── Frameworks & libraries ──
  react:      { light: '#087EA4', dark: '#61DAFB' },  // React's own light/dark pair
  rotate:     { light: '#6A3FB0', dark: '#A084DC' },  // Redux purple #764ABC
  wind:       { light: '#0891B2', dark: '#38BDF8' },  // Tailwind cyan #06B6D4
  train:      { light: '#303030', dark: '#D4D4D4' },  // Express black
  'caret-up': { light: '#000000', dark: '#FFFFFF' },  // Next.js black / white

  // ── Data & infrastructure ──
  docker:     { light: '#1571BE', dark: '#2496ED' },  // Docker blue #2496ED
  ship:       { light: '#1571BE', dark: '#2496ED' },
  leaf:       { light: '#0E7C3A', dark: '#13AA52' },  // MongoDB green #13AA52
  database:   { light: '#2F5D82', dark: '#6A9FD4' },  // PostgreSQL #336791
  git:        { light: '#D93A1B', dark: '#F05032' },  // Git orange #F05032
  aws:        { light: '#D97800', dark: '#FF9900' },  // AWS orange #FF9900
  lock:       { light: '#B8860B', dark: '#E0A800' },  // JWT / auth gold

  // ── AI ──
  robot:      { light: '#0D8A6A', dark: '#10A37F' },  // OpenAI green #10A37F
  comments:   { light: '#0D8A6A', dark: '#10A37F' },  // ChatGPT
  heart:      { light: '#BF5A38', dark: '#D97757' },  // Anthropic clay #D97757
  sparkles:   { light: '#1A73E8', dark: '#8AB4F8' },  // Google Gemini blue

  // ── Social ──
  github:     { light: '#181717', dark: '#F0F6FC' },  // GitHub black / white
  twitter:    { light: '#000000', dark: '#FFFFFF' },  // X black / white
  linkedin:   { light: '#0A66C2', dark: '#4A9EE8' },  // LinkedIn blue #0A66C2
  whatsapp:   { light: '#128C7E', dark: '#25D366' },  // WhatsApp green #25D366

  // ── Generic subject icons (no owning brand, tuned for legibility) ──
  bolt:       { light: '#D18A00', dark: '#F5A623' },
  fire:       { light: '#EA580C', dark: '#FB923C' },
  brain:      { light: '#6D5CE0', dark: '#A79BF5' },
  palette:    { light: '#C93A76', dark: '#F472B6' },
  puzzle:     { light: '#2F855A', dark: '#4ADE80' },
  chart:      { light: '#2563EB', dark: '#60A5FA' },
  globe:      { light: '#D64B22', dark: '#E34F26' },
  search:     { light: '#4C51BF', dark: '#8B93F0' },
  hashtag:    { light: '#2B5B84', dark: '#6BA9DA' },
  calculator: { light: '#2B5B84', dark: '#6BA9DA' },
  layers:     { light: '#D64B22', dark: '#E34F26' },
  divide:     { light: '#7C3AED', dark: '#A78BFA' },
  target:     { light: '#DC2626', dark: '#F87171' },
  project:    { light: '#0284C7', dark: '#38BDF8' },
  rocket:     { light: '#4F46E5', dark: '#818CF8' },
  seedling:   { light: '#16A34A', dark: '#4ADE80' },
  trophy:     { light: '#D97706', dark: '#FBBF24' },
  desktop:    { light: '#475569', dark: '#94A3B8' },
  wrench:     { light: '#475569', dark: '#94A3B8' },
  code:       { light: '#475569', dark: '#94A3B8' },
};

/**
 * Brand colour pair for a semantic name or legacy emoji, or null when the icon
 * has none (those keep whatever colour the caller's className sets).
 */
export function brandColor(key) {
  if (!key) return null;
  const k = normalize(key);
  if (BRAND_COLORS[k]) return BRAND_COLORS[k];
  const mapped = EMOJI_TO_ICON[k];
  return mapped ? BRAND_COLORS[mapped] || null : null;
}

/** Resolve a semantic name or a legacy emoji to a FontAwesome icon definition. */
export function resolveIcon(key) {
  if (!key) return null;
  const k = normalize(key);
  if (ICONS[k]) return ICONS[k];
  const mapped = EMOJI_TO_ICON[k];
  return mapped ? ICONS[mapped] : null;
}
