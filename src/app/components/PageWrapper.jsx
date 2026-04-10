'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import LuxuryNavbar from './ui/LuxuryNavbar';
import LuxuryHero from './sections/LuxuryHero';
import GoldArchive from './sections/GoldArchive';
import HeritageSection from './sections/HeritageSection';
import PhilosophyUpgrade from './sections/PhilosophyUpgrade';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import BackToTop from './ui/BackToTop';
import ScrollProgress from './ui/ScrollProgress';
import CinematicRoom from './three/CinematicRoom';
import StudioGallery from './sections/StudioGallery';
import DigitalSignature from './ui/DigitalSignature';
import AmbientSound from './ui/AmbientSound';
import AtelierSpec from './sections/AtelierSpec';
import OriginSection from './sections/OriginSection';
import GiantsSection from './sections/GiantsSection';
import AtelierLens from './ui/AtelierLens';
import { useAppMode } from '../context/AppModeContext';

// Lazy-loaded museum sections
const AchievementsSection = dynamic(() => import('./sections/AchievementsSection'), { ssr: false });
const MuseumGallery = dynamic(() => import('./sections/TrophyGallery'), { ssr: false });
const Capabilities = dynamic(() => import('./sections/SkillsSection'), { ssr: false });
const Chronology = dynamic(() => import('./sections/RoadmapSection'), { ssr: false });
const Vision = dynamic(() => import('./sections/VisionSection'), { ssr: false });
const Discovery = dynamic(() => import('./sections/DiscoverySection'), { ssr: false });
const NeuralCoreBase = dynamic(() => import('./ui/NeuralCore'), { ssr: false });

export default function PageWrapper() {
  const { mode } = useAppMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black selection:bg-opacity-90">
      {/* Mode-Aware 3D Environment (Atelier Only) */}
      {mode === 'atelier' && (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <CinematicRoom />
        </div>
      )}

      {/* Luxury Interactivity (Atelier Only) */}
      {mode === 'atelier' && <AtelierLens />}
      
      {/* Scroll Progress stays for both as a functional tool */}
      <ScrollProgress />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative z-10"
      >
        <LuxuryNavbar />
        
        <main>
          <LuxuryHero />
          
          {/* Elite Prestige - The Gold Archive */}
          <GoldArchive />

          {/* New Technical Spec - The Atelier Precision */}
          <AtelierSpec />

          {/* New Personal Record - The Origin */}
          <OriginSection />

          {/* New Hall of Mentors - The Giants */}
          <GiantsSection />

          {/* Foundation - The Heritage Path */}
          <HeritageSection />

          {/* Core Values - Philosophy Upgrade */}
          <PhilosophyUpgrade />

          {/* Modern Exhibitions */}
          <section id="exhibitions" className="py-24 px-6 md:px-12 bg-black">
            <div className="max-w-7xl mx-auto">
                <AchievementsSection />
            </div>
          </section>

          {/* Studio Gallery - The Personal Journey */}
          <StudioGallery />

          {/* Collections - The Work */}
          <section id="collections" className="py-24 bg-[#050505] border-t border-white/5">
             <ProjectsSection />
          </section>

          {/* Archives - The Medals */}
          <MuseumGallery />

          {/* Capabilities - The Technical Base */}
          <Capabilities />

          {/* Discovery - The Detail */}
          <Discovery />

          {/* Chronology - The Evolution */}
          <Chronology />

          {/* Vision - The Future */}
          <Vision />

          <ContactSection />
        </main>

        <footer className="bg-black">
          <DigitalSignature />
          <div className="py-12 border-t border-white/5 text-center flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.5em] uppercase text-white/10">Fadhil Lubis Atelier</span>
              <span className="text-[9px] tracking-[0.3em] font-sans text-white/5 uppercase">Global Innovation Division © 2026</span>
            </div>
          </div>
        </footer>

        <BackToTop />
        
        {/* Central AI Nucleus - Only in Atelier for performance */}
        {mode === 'atelier' && <NeuralCoreBase />}
      </motion.div>

      {/* Luxury Vignette & Grain Overlay (Both modes for aesthetic consistency) */}
      <div className="fixed inset-0 pointer-events-none z-[1] shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
      <div className="fixed inset-0 pointer-events-none z-[2] opacity-[0.03] noise-bg" />
      
      <style jsx global>{`
        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
