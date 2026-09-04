'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingNavbar from './ui/FloatingNavbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import AchievementsSection from './sections/AchievementsSection';
import ProjectsSection from './sections/ProjectsSection';
import ResearchSection from './sections/ResearchSection';
import SkillsSection from './sections/SkillsSection';
import TrophySection from './sections/TrophySection';
import CertificateSection from './sections/CertificateSection';
import MediaCoverageSection from './sections/MediaCoverageSection';
import ActivityGallery from './sections/ActivityGallery';
import ContactSection from './sections/ContactSection';

export default function PageWrapper() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('portfolio-theme', next);
  };

  const isDark = theme === 'dark';

  if (!mounted) return null;

  return (
    <div
      className={`relative min-h-screen select-none overflow-x-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#0F0F11] text-white' : 'bg-[#EAEAEA] text-black'
      }`}
    >
      <FloatingNavbar theme={theme} toggleTheme={toggleTheme} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <main>
          <HeroSection isDark={isDark} />

          <AboutSection isDark={isDark} />

          <AchievementsSection isDark={isDark} />

          <ProjectsSection isDark={isDark} />

          <ResearchSection isDark={isDark} />

          <SkillsSection isDark={isDark} />

          <TrophySection isDark={isDark} />

          <CertificateSection isDark={isDark} />

          <MediaCoverageSection isDark={isDark} />

          <ActivityGallery isDark={isDark} />

          <ContactSection isDark={isDark} />
        </main>

        {/* Footer */}
        <footer
          className={`border-t ${
            isDark ? 'bg-[#0F0F11] border-white/5' : 'bg-[#EAEAEA] border-black/5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <span
              className={`text-[11px] tracking-[0.2em] uppercase font-mono ${
                isDark ? 'text-white/30' : 'text-black/30'
              }`}
            >
              Fadhil Muhammad Syafiq Lubis &copy; {new Date().getFullYear()}
            </span>

            <div className="flex gap-8">
              {[
                { name: 'Gmail', href: 'mailto:fadhilsyafiq90@gmail.com' },
                { name: 'GitHub', href: 'https://github.com/fdhl880' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/fadhil-muhammad-syafiq-lubis-90a46a355' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.name !== 'Gmail' ? '_blank' : undefined}
                  rel={s.name !== 'Gmail' ? 'noopener noreferrer' : undefined}
                  className={`text-[10px] tracking-[0.2em] uppercase font-mono transition-colors duration-300 ${
                    isDark
                      ? 'text-white/25 hover:text-white'
                      : 'text-black/25 hover:text-black'
                  }`}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </footer>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-6 right-6 z-[100] w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isDark
              ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30'
              : 'bg-black/5 backdrop-blur-md border border-black/10 hover:border-black/30'
          }`}
          aria-label="Back to top"
        >
          <svg
            className={`w-4 h-4 ${isDark ? 'text-white/40' : 'text-black/40'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
