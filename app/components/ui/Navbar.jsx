'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= 200) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    window.dispatchEvent(new CustomEvent('NEXUS_WARP_INIT', { detail: id }));
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? 'w-[95%] max-w-4xl' : 'w-[90%] max-w-3xl'
      }`}
    >
      <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between ${
        scrolled ? 'shadow-lg shadow-neon/10' : ''
      }`}>
        <button 
          onClick={() => scrollTo('hero')} 
          className="font-display font-bold text-lg text-gradient cursor-pointer"
          aria-label="Fadhil Muhammad Syafiq Lubis - Home"
        >
          FMSL
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              aria-label={`Go to ${link.label} section`}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                activeSection === link.id
                  ? 'text-neon bg-neon/10'
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1 cursor-pointer p-1"
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-white transition-transform ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`w-5 h-0.5 bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-white transition-transform ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Full-screen Mobile Dashboard */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-2xl flex flex-col p-10 md:hidden"
          >
            {/* Background HUD Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(0,240,255,0.05),rgba(0,0,0,0),rgba(0,240,255,0.05))] bg-[length:100%_8px,20px_100%]" />
              <motion.div 
                animate={{ y: ['0%', '100%'] }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                className="absolute top-0 left-0 w-full h-px bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              />
            </div>

            <div className="flex justify-between items-start relative z-10 w-full mb-16">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-[0.3em]">System_Dashboard</div>
                <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">NEXUS_OS_v3</div>
              </div>
              <button 
                onClick={() => setMobileOpen(false)}
                className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/20 text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(link.id)}
                  aria-label={`Navigate to ${link.label}`}
                  className={`text-left group flex items-center gap-6 ${
                    activeSection === link.id ? 'text-cyan-400' : 'text-white/40'
                  }`}
                >
                  <span className="text-xs font-mono opacity-30 mt-1">0{i+1}</span>
                  <span className="text-3xl md:text-4xl font-bold font-display uppercase tracking-widest group-hover:text-white transition-colors">{link.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4 relative z-10 pt-10 border-t border-white/10 uppercase font-mono">
               <div>
                  <div className="text-[9px] text-white/30 tracking-widest">Status</div>
                  <div className="text-xs text-green-400">OPTIMAL_READY</div>
               </div>
               <div className="text-right">
                  <div className="text-[9px] text-white/30 tracking-widest">Innovation_Rate</div>
                  <div className="text-xs text-white">MAX_LEVEL</div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
