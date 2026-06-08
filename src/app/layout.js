import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
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
