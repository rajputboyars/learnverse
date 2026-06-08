import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { SITE_URL, SITE_NAME } from "@/lib/site";

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
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
