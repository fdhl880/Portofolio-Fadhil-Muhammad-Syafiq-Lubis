'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
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
import GlobeSection from './sections/GlobeSection';
import NeuralCore from './ui/NeuralCore';
import SoundToggle from './ui/SoundToggle';
import { PerformanceProvider } from '../context/PerformanceContext';
import CustomCursor from './ui/CustomCursor';
import PerformanceToggle from './ui/PerformanceToggle';
import HolographicFooter from './ui/HolographicFooter';
import { useSound } from '../context/SoundContext';

// Global Scanline Effect
function Scanline() {
  return (
    <motion.div 
      animate={{ y: ['-100%', '200%'] }}
      transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
      className="fixed inset-x-0 h-[30vh] bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none z-[100] opacity-30"
    />
  );
}

// Warp Speed & Audio Engine Tracker
function WarpEngine() {
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 200 });
  const { setEngineDrive } = useSound();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const v = smoothVelocity.get();
      // Update Audio Pitch based on scroll speed
      setEngineDrive(v); 

      // Clear canvas with trail effect for lightspeed blur
      ctx.fillStyle = 'rgba(5, 5, 16, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const speedFactor = v * 0.05;
      const stretchFactor = Math.abs(speedFactor) * 2;

      stars.forEach(s => {
        s.y -= speedFactor * s.z;
        
        // Wrap around screen
        if (s.y < -100) s.y = canvas.height + 50;
        if (s.y > canvas.height + 100) s.y = -50;

        ctx.fillStyle = `rgba(0, 240, 255, ${s.opacity})`;
        // Stretch star vertically based on scroll velocity
        ctx.fillRect(s.x, s.y, s.z, Math.max(s.z, stretchFactor));
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [smoothVelocity, setEngineDrive]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen" />;
}

// Sector Glitch Wipe Effect
function SectorWipe({ trigger }) {
  return (
    <div key={trigger} className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      <div className="absolute inset-y-0 w-20 bg-cyan-500/20 blur-xl animate-glitch-wipe shadow-[0_0_50px_rgba(0,240,255,0.4)]" />
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 animate-[pulse_1.2s_ease-out_forwards]" />
    </div>
  );
}

// Adaptive Sidebars HUD
function SidebarHUD() {
  const [activeLabel, setActiveLabel] = useState('SYSTEM_INIT');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'education', 'trophy', 'achievements', 'nexus-globe', 'roadmap', 'discovery', 'projects', 'vision', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 300) {
          setActiveLabel(`DATA_SCAN: ${id.toUpperCase()}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SectorWipe trigger={activeLabel} />
      {/* Left Sidebar */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-8 pointer-events-none">
        <div className="h-32 w-px bg-white/10 mx-auto" />
        <div className="text-[10px] font-mono text-white/20 vertical-text font-bold tracking-[0.5em] uppercase whitespace-nowrap">
          {activeLabel}
        </div>
        <div className="h-32 w-px bg-white/10 mx-auto" />
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-8 pointer-events-none">
        <div className="h-32 w-px bg-white/10 mx-auto" />
        <div className="text-[10px] font-mono text-white/20 vertical-text font-bold tracking-[0.5em] uppercase whitespace-nowrap">
          NEXUS_OS_v4.0.2 // STABLE
        </div>
        <div className="h-32 w-px bg-white/10 mx-auto" />
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </>
  );
}

// Global Notification HUD
function NotificationSystem() {
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    const handleNotif = (e) => {
      setNotif(e.detail);
      setTimeout(() => setNotif(null), 3000);
    };
    window.addEventListener('NEXUS_NOTIFY', handleNotif);
    return () => window.removeEventListener('NEXUS_NOTIFY', handleNotif);
  }, []);

  return (
    <AnimatePresence>
      {notif && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed top-8 left-8 z-[250] flex items-center gap-4 pointer-events-none"
        >
          <div className="w-1 h-8 bg-cyan-500 shadow-[0_0_10px_#00f0ff]" />
          <div className="glass px-4 py-2 border-l-0 rounded-r-xl">
             <div className="text-[9px] font-mono text-cyan-400 font-bold tracking-[0.2em] uppercase">System_Prompt</div>
             <div className="text-xs font-bold text-white uppercase tracking-wider">{notif}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PageWrapper() {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { playBootSequence } = useSound();
  const introFinished = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const isSmallScreen = window.innerWidth < 768;
      const isLowPerf = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      setIsMobile(isSmallScreen || isLowPerf);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleIntroComplete = useCallback(() => {
    if (introFinished.current) return;
    introFinished.current = true;
    setShowIntro(false);
    
    // Attempt audio boot sequence safely
    try {
      playBootSequence();
    } catch (e) {
      console.warn("Nexus Audio Engine: Boot Sequence Suppressed");
    }

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
  }, [playBootSequence]);

  useEffect(() => {
    if (showIntro) {
      // Primary Cinematic Timer
      const timer = setTimeout(handleIntroComplete, 4500);
      
      // Secondary FAIL-SAFE Timer: Force reveal after 6.5 seconds no matter what
      const failsafe = setTimeout(() => {
         if (!introFinished.current) {
            console.warn("Nexus Runtime: Intro hanging. Firing Force Reveal Protocol.");
            handleIntroComplete();
         }
      }, 6500);

      return () => {
        clearTimeout(timer);
        clearTimeout(failsafe);
      };
    }
  }, [showIntro, handleIntroComplete]);

  // Prevent Hydration Errors by delaying DOM assembly until client mounts
  if (!mounted) return null;

  return (
    <PerformanceProvider>
      <CustomCursor />
      
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <motion.div 
        animate={isShaking ? { 
          x: [0, -10, 10, -10, 10, 0],
          y: [0, 5, -5, 5, -5, 0]
        } : {}}
        transition={{ duration: 0.5 }}
        className="relative overflow-x-hidden min-h-screen" 
        style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.8s ease' }}
      >
        <WarpEngine />
        <Scanline />
        <SidebarHUD />
        <NotificationSystem />
        
        <ScrollProgress />
        <Navbar />
        <PerformanceToggle />
        <SoundToggle />
        <NeuralCore />
        
        <main className="relative z-10 overflow-x-hidden">
          <section id="hero"><HeroSection isMobile={isMobile} /></section>
          <section id="skills"><SkillsSection /></section>
          <section id="education"><EducationSection /></section>
          <section id="trophy"><TrophyGallery /></section>
          <section id="achievements"><AchievementsSection /></section>
          <section id="nexus-globe"><GlobeSection /></section>
          <section id="roadmap"><RoadmapSection /></section>
          <section id="discovery"><DiscoverySection /></section>
          <section id="projects"><ProjectsSection /></section>
          <section id="vision"><VisionSection /></section>
          <section id="contact"><ContactSection /></section>
        </main>
        <HolographicFooter />
        <BackToTop />

        <div className="fixed inset-0 pointer-events-none z-[5] shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
      </motion.div>
    </PerformanceProvider>
  );
}
