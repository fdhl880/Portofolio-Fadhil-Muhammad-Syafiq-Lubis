import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fadhil Muhammad Syafiq | Student Innovator & Researcher",
  description: "Portfolio of Fadhil Muhammad Syafiq — a student innovator from Medan, Indonesia. International medal winner in science, engineering, and technology competitions.",
  keywords: ["Fadhil Muhammad Syafiq", "student innovator", "portfolio", "science olympiad", "engineering", "Indonesia"],
  openGraph: {
    title: "Fadhil Muhammad Syafiq | Student Innovator",
    description: "Explore the portfolio of an award-winning student innovator from Medan, Indonesia.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
