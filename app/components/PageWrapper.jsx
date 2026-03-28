'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CinematicIntro from './ui/CinematicIntro';
import Navbar from './ui/Navbar';
import ScrollProgress from './ui/ScrollProgress';
import BackToTop from './ui/BackToTop';
import HeroSection from './sections/HeroSection';
import SkillsSection from './sections/SkillsSection';
import EducationSection from './sections/EducationSection';
import TrophyGallery from './sections/TrophyGallery';
import RoadmapSection from './sections/RoadmapSection';
import AchievementsSection from './sections/AchievementsSection';
import DiscoverySection from './sections/DiscoverySection';
import ProjectsSection from './sections/ProjectsSection';
import VisionSection from './sections/VisionSection';
import ContactSection from './sections/ContactSection';
import NeuralCore from './ui/NeuralCore';
import SoundToggle from './ui/SoundToggle';
import { PerformanceProvider } from '../context/PerformanceContext';
import CustomCursor from './ui/CustomCursor';
import PerformanceToggle from './ui/PerformanceToggle';

export default function PageWrapper() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Small screen or low performance device
      const isSmallScreen = window.innerWidth < 768;
      const isLowPerf = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      setIsMobile(isSmallScreen || isLowPerf);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-dismiss intro after animation completes
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 4500);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <PerformanceProvider>
      <CustomCursor />
      
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <div style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        <ScrollProgress />
        <Navbar />
        <PerformanceToggle />
        <SoundToggle />
        <NeuralCore />
        <main>
          <HeroSection isMobile={isMobile} />
          <SkillsSection />
          <EducationSection />
          <TrophyGallery />
          <AchievementsSection />
          <RoadmapSection />
          <DiscoverySection />
          <ProjectsSection />
          <VisionSection />
          <ContactSection />
        </main>
        <BackToTop />
      </div>
    </PerformanceProvider>
  );
}
