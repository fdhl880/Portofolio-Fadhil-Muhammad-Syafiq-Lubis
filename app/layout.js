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
  authors: [{ name: "Fadhil Muhammad Syafiq" }],
  creator: "Fadhil Muhammad Syafiq",
  publisher: "Fadhil Muhammad Syafiq",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Fadhil Muhammad Syafiq | Student Innovator",
    description: "Explore the portfolio of an award-winning student innovator from Medan, Indonesia.",
    url: "https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app",
    siteName: "Fadhil Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fadhil Muhammad Syafiq | Student Innovator",
    description: "Award-winning researcher and innovator from Indonesia.",
  },
  verification: {
    google: "RRNhDnUv9CP2uOt2K5vOuzymCxd9HKXFU_ZBrbRftq8",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo-initials.png',
    apple: '/logo-initials.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
