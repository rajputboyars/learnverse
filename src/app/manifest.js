export default function manifest() {
  return {
    name: 'Learnverse — Learn in Hinglish',
    short_name: 'Learnverse',
    description:
      'Programming concepts in English + Hinglish with daily-life examples, code, quizzes and interview questions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4f46e5',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
