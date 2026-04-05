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
  metadataBase: new URL("https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app/"),
  title: {
    default: "Fadhil Muhammad Syafiq Lubis | Award-Winning Student Innovator & Researcher",
    template: "%s | Fadhil Muhammad Syafiq Lubis",
  },
  description: "Official portfolio of Fadhil Muhammad Syafiq Lubis — an international gold medal winner in science and engineering competitions. Exploring innovations in Engineering, Finance, and Entrepreneurship.",
  keywords: [
    "Fadhil Muhammad Syafiq Lubis", 
    "Student Innovator", 
    "International Science Competition Winner", 
    "Research Portfolio", 
    "Engineering Student", 
    "Medan Indonesia", 
    "Science Olympiad Medalist"
  ],
  authors: [{ name: "Fadhil Muhammad Syafiq Lubis" }],
  creator: "Fadhil Muhammad Syafiq Lubis",
  publisher: "Fadhil Muhammad Syafiq Lubis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app/",
  },
  openGraph: {
    title: "Fadhil Muhammad Syafiq Lubis | Award-Winning Student Innovator",
    description: "Explore the cinematic portfolio of an international award-winning student innovator from Medan, Indonesia.",
    url: "/",
    siteName: "Fadhil Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/photo1.jpg",
        width: 1200,
        height: 630,
        alt: "Fadhil Muhammad Syafiq Lubis - Student Innovator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fadhil Muhammad Syafiq Lubis | Student Innovator",
    description: "International award-winning researcher and innovator from Indonesia.",
    images: ["/images/photo1.jpg"],
  },
  verification: {
    google: "RRNhDnUv9CP2uOt2K5vOuzymCxd9HKXFU_ZBrbRftq8",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo-initials.png" },
      { url: "/logo-initials.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/logo-initials.png",
  },
};

export const viewport = {
  themeColor: "#050510",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Fadhil Muhammad Syafiq Lubis",
    jobTitle: "Student Innovator & Researcher",
    url: "https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app",
    image: "https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app/images/photo1.jpg",
    sameAs: [
      // Add social links here if available
    ],
    description: "International gold medal winner in science and engineering competitions.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medan",
      addressRegion: "North Sumatra",
      addressCountry: "Indonesia"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
