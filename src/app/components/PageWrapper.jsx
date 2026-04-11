'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import LuxuryNavbar from './ui/LuxuryNavbar';
import LuxuryHero from './sections/LuxuryHero';
import GoldArchive from './sections/GoldArchive';
import HeritageSection from './sections/HeritageSection';
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
import AtelierPhilosophy from './sections/AtelierPhilosophy';
import ManifestoSection from './sections/ManifestoSection';
import AtelierLens from './ui/AtelierLens';
import { useAppMode } from '../context/AppModeContext';

// Lazy-loaded museum sections
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`relative min-h-screen bg-black text-white selection:bg-white selection:text-black selection:bg-opacity-90 ${mode === 'archive' ? 'archive-mode' : ''}`}>
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

          {/* New Personal Philosophy - Luxury, Tegas, Rich */}
          <AtelierPhilosophy />

          {/* New Cinematic Manifesto */}
          <ManifestoSection />

          {/* Modern Exhibitions (Integrated) */}

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
/* Android Native Polish & Archive Mode Optimization */
.archive-mode {
  --font-inter: 'Roboto', 'system-ui', sans-serif;
  --font-playfair: 'Georgia', serif;
  font-family: var(--font-inter);
}

.archive-mode body {
  background-color: #000;
  overflow-x: hidden;
}

/* Force standard font rendering on Android for clarity */
.archive-mode * {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

/* Remove 3D Containers to save GPU in Archive Mode */
.archive-mode canvas,
.archive-mode [class*="three"],
.archive-mode #neural-core {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

/* Android-Specific Font Scale for Readability */
@media (max-width: 768px) {
  .archive-mode h2 {
    font-size: 2.5rem !important;
    letter-spacing: -0.02em !important;
  }
  
  .archive-mode .text-sm {
    font-size: 1rem !important;
  }
  
  .archive-mode .text-\[10px\] {
    font-size: 12px !important;
    letter-spacing: 0.2em !important;
  }

  /* Sticky Bottom Navigation for Mobile Archive */
  .archive-mobile-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255,255,255,0.05);
    z-index: 1000;
    padding: 12px 0;
    justify-content: space-around;
  }
}

.noise-bg {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
      `}</style>
    </div>
  );
}
