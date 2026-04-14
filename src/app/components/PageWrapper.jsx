'use client';
import { useState, useEffect, useRef } from 'react';
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
import AtelierSpec from './sections/AtelierSpec';
import OriginSection from './sections/OriginSection';
import GiantsSection from './sections/GiantsSection';
import AtelierPhilosophy from './sections/AtelierPhilosophy';
import ManifestoSection from './sections/ManifestoSection';
import AtelierLens from './ui/AtelierLens';
import { useAppMode } from '../context/AppModeContext';

const NeuralCore = dynamic(() => import('./ui/NeuralCore'), { ssr: false });
const CinematicAspiration = dynamic(() => import('./sections/CinematicAspiration'), { ssr: false });
const LiquidOverlay = dynamic(() => import('./ui/LiquidOverlay'), { ssr: false });

export default function PageWrapper() {
  const { mode } = useAppMode();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('Hero');
  const scrollRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('data-section') || 'Exploring');
          }
        });
      },
      { threshold: 0.6 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
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
        
        <main ref={scrollRef}>
          <div data-section="Welcome to the Atelier"><LuxuryHero /></div>
          
          <div data-section="Gold Archive Achievements"><GoldArchive /></div>

          <div data-section="Technical Specifications"><AtelierSpec /></div>

          <div data-section="The Origin Story"><OriginSection /></div>

          <div data-section="The Giants Hall"><GiantsSection /></div>

          <div data-section="Heritage and Path"><HeritageSection /></div>

          <div data-section="Atelier Philosophy"><AtelierPhilosophy /></div>

          <div data-section="Manifesto"><ManifestoSection /></div>

          <div data-section="Studio Gallery"><StudioGallery /></div>

          <div data-section="Future Aspirations"><CinematicAspiration /></div>

          <section id="collections" className="py-24 bg-[#050505] border-t border-white/5" data-section="Project Collections">
             <ProjectsSection />
          </section>

          <div data-section="Trophy Gallery"><MuseumGallery /></div>

          <div data-section="Expertise Laboratory"><ExpertiseLaboratory /></div>

          <div data-section="Scientific Discovery"><Discovery /></div>

          <div data-section="Evolution Roadmap"><Chronology /></div>

          <div data-section="Strategic Vision"><Vision /></div>

          <div data-section="Contact Entrance"><ContactSection /></div>
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
        
        {/* Central AI Nucleus - Now with Passive Assistance */}
        {mode === 'atelier' && <NeuralCore activeSection={activeSection} />}
        
        {/* Cinematic Transitions */}
        <LiquidOverlay />
      </motion.div>

      {/* Luxury Vignette & Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
      <div className="fixed inset-0 pointer-events-none z-[2] opacity-[0.03] noise-bg" />
      
      <style jsx global>{`
.archive-mode {
  --font-inter: 'Roboto', 'system-ui', sans-serif;
  --font-playfair: 'Georgia', serif;
  font-family: var(--font-inter);
}

.archive-mode body {
  background-color: #000;
  overflow-x: hidden;
}

.archive-mode * {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

.archive-mode canvas,
.archive-mode [class*="three"],
.archive-mode #neural-core {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

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
}

.noise-bg {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
      `}</style>
    </div>
  );
}
