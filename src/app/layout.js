import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { SITE_URL, SITE_NAME } from "@/lib/site";

// Set the theme before paint to avoid a flash of the wrong colour scheme.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Learnverse — Developers ke liye, Hinglish mein",
    template: "%s — Learnverse",
  },
  description:
    "Programming concepts in English + Hinglish, with daily-life examples, code, quizzes and interview questions. Made for Indian developers.",
  keywords: [
    "learn programming",
    "hinglish coding",
    "javascript",
    "interview questions",
    "mern",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Learnverse — Developers ke liye, Hinglish mein",
    description:
      "Programming concepts in English + Hinglish, with daily-life examples, code, quizzes and interview questions.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Learnverse — Developers ke liye, Hinglish mein",
    description:
      "Programming concepts in English + Hinglish, with daily-life examples, code, quizzes and interview questions.",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Learnverse", statusBarStyle: "default" },
};

export const viewport = {
  themeColor: "#4f46e5",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Providers>{children}</Providers>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
