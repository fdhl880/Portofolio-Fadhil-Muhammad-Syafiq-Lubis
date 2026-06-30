'use client';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import LuxuryNavbar from './ui/LuxuryNavbar';
import LuxuryHero from './sections/LuxuryHero';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import AchievementsSection from './sections/AchievementsSection';
import ProjectsSection from './sections/ProjectsSection';
import ResearchSection from './sections/ResearchSection';
import SkillsSection from './sections/SkillsSection';
import EducationSection from './sections/EducationSection';
import TrophySection from './sections/TrophySection';
import CertificateSection from './sections/CertificateSection';
import MediaCoverageSection from './sections/MediaCoverageSection';
import PhilosophySection from './sections/PhilosophySection';
import ContactSection from './sections/ContactSection';

export default function PageWrapper() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Custom Cursor Position springs
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);

    // Dynamic hover listeners for custom cursor scaling
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.project-card') ||
        target.closest('.stat-card')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen text-white bg-black select-none overflow-x-hidden">
      {/* Custom Trailing Cursor (Hide on mobile touch devices) */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
          transition: 'scale 0.2s ease, background-color 0.2s ease, border-color 0.2s ease'
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <LuxuryNavbar />

        <main className="relative z-10">
          <LuxuryHero />
          <MarqueeSection />
          
          <AboutSection />
          <div className="section-divider" />
          
          <AchievementsSection />
          <div className="section-divider" />
          
          <ProjectsSection />
          <div className="section-divider" />

          <ResearchSection />
          <div className="section-divider" />
          
          <SkillsSection />
          <div className="section-divider" />
          
          <EducationSection />
          <div className="section-divider" />
          
          <TrophySection />
          <div className="section-divider" />

          <CertificateSection />
          <div className="section-divider" />
          
          <MediaCoverageSection />
          <div className="section-divider" />
          
          <PhilosophySection />
          <ContactSection />
        </main>

        {/* Footer */}
        <footer className="bg-black border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white/15 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-4 h-4">
                  <path
                    d="M 35 25 L 65 25 M 35 50 L 52 50 M 35 75 L 65 75 M 35 25 L 35 75 M 35 50 L 65 25"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                    strokeLinejoin="miter"
                    opacity="0.4"
                  />
                </svg>
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-mono">
                FADHIL &copy; {new Date().getFullYear()}
              </span>
            </div>

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
                  className="text-[10px] tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors duration-500 font-mono"
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
          className="fixed bottom-6 right-6 z-[100] w-10 h-10 border border-white/10 bg-black/80 backdrop-blur-sm flex items-center justify-center hover:border-white/30 transition-colors cursor-pointer"
          aria-label="Back to top"
        >
          <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
