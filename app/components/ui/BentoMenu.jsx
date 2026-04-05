'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSound } from '../../context/SoundContext';

const navLinks = [
  { name: 'Identity', target: 'hero', icon: '👤' },
  { name: 'Laboratory', target: 'skills', icon: '🧪' },
  { name: 'Credentials', target: 'achievements', icon: '🎖️' },
  { name: 'Archives', target: 'projects', icon: '📁' },
  { name: 'Connect', target: 'contact', icon: '✉️' },
];

export default function BentoMenu({ isOpen, onClose }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const { playPip } = useSound();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (id) => {
    try { playPip(1320, 0.05, 0.03); } catch(e) {}
    onClose();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#020208]/95 backdrop-blur-3xl overflow-hidden p-6 md:p-12"
        >
          {/* Close Trigger (Big X) */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-2xl"
          >
            ×
          </button>

          <div className="w-full h-full max-w-7xl grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-3 gap-6 auto-rows-fr">
            
            {/* Primary Nav Bento (2x2) */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="md:col-span-2 md:row-span-2 border border-white/5 bg-white/[0.02] rounded-3xl p-8 md:p-12 flex flex-col justify-between"
            >
               <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-[0.6em] mb-12">Main_Directory</span>
               <div className="flex flex-col gap-6 md:gap-10">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleNav(link.target)}
                      className="group flex items-center gap-6 text-2xl md:text-5xl font-display font-bold text-white/60 hover:text-white transition-all text-left"
                    >
                      <span className="text-xl md:text-2xl filter grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all">{link.icon}</span>
                      {link.name}
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all text-cyan-400">→</span>
                    </motion.button>
                  ))}
               </div>
            </motion.div>

            {/* Social Bento (2x1) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               className="md:col-span-2 md:row-span-1 border border-white/5 bg-white/[0.02] rounded-3xl p-8 flex flex-col justify-between hover:bg-white/[0.05] transition-all cursor-pointer group"
            >
               <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">External_Connections</span>
               <div className="flex gap-8">
                  <a href="#" className="font-display text-2xl font-bold text-white/40 hover:text-white transition-all underline underline-offset-8">GitHub</a>
                  <a href="#" className="font-display text-2xl font-bold text-white/40 hover:text-white transition-all underline underline-offset-8">LinkedIn</a>
                  <a href="#" className="font-display text-2xl font-bold text-white/40 hover:text-white transition-all underline underline-offset-8">X.com</a>
               </div>
               <div className="text-[10px] text-white/10 font-mono mt-4 opacity-0 group-hover:opacity-100 transition-opacity">REDIRECTING_TO_GLOBAL_NODES...</div>
            </motion.div>

            {/* System Clock Bento (1x1) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4 }}
               className="md:col-span-1 md:row-span-1 border border-white/5 bg-white/[0.02] rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-4"
            >
               <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">Sync_Status</span>
               <div className="text-4xl font-display font-bold text-cyan-500 tabular-nums animate-pulse">{time}</div>
               <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-mono">Precision_RTC_Active</div>
            </motion.div>

            {/* Location / Meta (1x1) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5 }}
               className="md:col-span-1 md:row-span-1 border border-white/5 bg-white/[0.02] rounded-3xl p-8 flex flex-col justify-between"
            >
               <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">Nexus_Ping</span>
               <div>
                  <div className="text-white/80 font-bold text-xs mb-1">Medan, Indonesia</div>
                  <div className="text-[9px] text-white/20 font-mono">LAT: 3.5952° N<br />LNG: 98.6722° E</div>
               </div>
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: [-100, 100] }} 
                    transition={{ repeat: Infinity, duration: 2 }} 
                    className="w-1/4 h-full bg-cyan-400" 
                  />
               </div>
            </motion.div>

            {/* Quote / Mission (2x1) */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="md:col-span-2 md:row-span-1 bg-cyan-500 rounded-3xl p-10 flex flex-col justify-center text-black"
            >
               <div className="font-display text-3xl font-bold leading-tight italic">
                  &quot;Excellence is not an act, but a habit.&quot;
               </div>
               <div className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em]">- Aristotle // Nexus_Core</div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
