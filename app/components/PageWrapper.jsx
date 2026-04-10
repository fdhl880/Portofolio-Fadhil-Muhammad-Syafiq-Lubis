'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import LuxuryNavbar from './ui/LuxuryNavbar';
import LuxuryHero from './sections/LuxuryHero';
import PhilosophySection from './sections/PhilosophySection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import BackToTop from './ui/BackToTop';

// Lazy-loaded museum sections
const AchievementsSection = dynamic(() => import('./sections/AchievementsSection'), { ssr: false });
const MuseumGallery = dynamic(() => import('./sections/TrophyGallery'), { ssr: false });

export default function PageWrapper() {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black selection:bg-opacity-90">
      <div className="noise-overlay" />
      
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center flex-col gap-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-white font-display text-4xl tracking-widest uppercase"
            >
              F_L
            </motion.div>
            <div className="h-px w-12 bg-white/20" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white/40 font-sans text-[10px] tracking-[0.4em] uppercase"
            >
              The Nexus of Precision
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        style={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10"
      >
        <LuxuryNavbar />
        
        <main>
          <LuxuryHero />
          
          <PhilosophySection />

          <section id="exhibitions" className="py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col mb-16">
                  <span className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-2">Heritage</span>
                  <h2 className="font-display">Selected Exhibitions</h2>
               </div>
               <AchievementsSection />
            </div>
          </section>

          <section id="collections" className="py-24 bg-[#050505]">
             <ProjectsSection />
          </section>

          <section id="archives" className="py-24">
             <MuseumGallery />
          </section>

          <ContactSection />
        </main>

        <footer className="py-12 border-t border-white/5 text-center">
          <div className="text-[10px] tracking-[0.5em] uppercase text-white/20 mb-4">Fadhil Lubis Atelier © 2026</div>
          <div className="font-display text-lg opacity-40">Precision in Every Concept.</div>
        </footer>

        <BackToTop />
      </motion.div>

      {/* Luxury Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[5] shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />
    </div>
  );
}
