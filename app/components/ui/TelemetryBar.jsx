'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TelemetryBar() {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [currentSection, setCurrentSection] = useState('HERO');
  const [sessionTime, setSessionTime] = useState('00:00');
  const startTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollDepth(depth);

      const sections = ['hero', 'skills', 'education', 'trophy', 'achievements', 'fl-globe', 'roadmap', 'discovery', 'projects', 'vision', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
          setCurrentSection(sections[i].replace('fl-', '').toUpperCase());
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      setSessionTime(`${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-0 left-0 right-0 z-[900] h-8 bg-[#020208]/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-6 font-mono text-[9px] text-white/30 uppercase tracking-[0.15em] select-none pointer-events-none"
    >
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          FL_CORE: ONLINE
        </span>
        <span className="hidden md:inline">
          SECTION: <span className="text-cyan-400/80">{currentSection}</span>
        </span>
      </div>

      <div className="flex items-center gap-6">
        <span className="hidden md:inline">
          SESSION: <span className="text-white/50 tabular-nums">{sessionTime}</span>
        </span>
        <span>
          SCROLL: <span className="text-cyan-400/80 tabular-nums">{scrollDepth}%</span>
        </span>
        <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden hidden md:block">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
            style={{ width: `${scrollDepth}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
