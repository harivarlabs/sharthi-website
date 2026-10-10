import type { Metadata } from "next";
import { Mukta, Rasa } from "next/font/google";
import "./globals.css";

const rasa = Rasa({ subsets: ["gujarati", "latin"], weight: ["400", "500", "600"], variable: "--font-rasa", display: "swap" });
const mukta = Mukta({ subsets: ["devanagari", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-mukta", display: "swap" });

export const metadata: Metadata = {
  title: "Sharthi — One guide for a busy life",
  description:
    "Look back at your day in an evening conversation, see your life as a seven-spoke chariot wheel, and take one small step for tomorrow — with a verse from the Gita. In English, हिंदी and ગુજરાતી.",
  // Not public yet: no indexing, no following, no snippets or cached copies.
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rasa.variable} ${mukta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
