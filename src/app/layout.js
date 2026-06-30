import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppModeProvider } from "./context/AppModeContext";
import LenisProvider from "./context/LenisProvider";
import MainContent from "./components/MainContent";
import { SoundProvider } from "./context/SoundContext";
import { PerformanceProvider } from "./context/PerformanceContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app/"),
  title: {
    default: "Fadhil Muhammad Syafiq Lubis | Portfolio",
    template: "%s | Fadhil Muhammad Syafiq Lubis",
  },
  description: "Official portfolio of Fadhil Muhammad Syafiq Lubis. A showcase of international gold medal innovations, scientific research, web development, and sustainable engineering.",
  keywords: [
    "Fadhil Muhammad Syafiq Lubis",
    "Portfolio",
    "International Science Competition Winner",
    "Student Researcher",
    "Web Developer",
    "Innovator"
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
    title: "Fadhil Muhammad Syafiq Lubis | Portfolio",
    description: "Explore the innovations, research, and achievements of Fadhil Muhammad Syafiq Lubis.",
    url: "/",
    siteName: "Fadhil Muhammad Syafiq Lubis",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/photo1.jpg",
        width: 1200,
        height: 630,
        alt: "Fadhil Muhammad Syafiq Lubis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fadhil Muhammad Syafiq Lubis | Portfolio",
    description: "International award-winning researcher and innovator.",
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
    icon: "/icon.svg",
    apple: "/brand-logo.svg",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Fadhil Muhammad Syafiq Lubis",
    jobTitle: "Innovator & Researcher",
    url: "https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app",
    image: "https://portofolio-fadhil-muhammad-syafiq-lubis.vercel.app/images/photo1.jpg",
    description: "International gold medal winner in science and engineering competitions.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medan",
      addressRegion: "North Sumatra",
      addressCountry: "Indonesia"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-black-pure selection:bg-white selection:text-black">
        <PerformanceProvider>
          <SoundProvider>
            <AppModeProvider>
              <LenisProvider>
                <MainContent>
                  {children}
                </MainContent>
              </LenisProvider>
            </AppModeProvider>
          </SoundProvider>
        </PerformanceProvider>
      </body>
    </html>
  );
}
