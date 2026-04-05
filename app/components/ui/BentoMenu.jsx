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

const deepQuotes = [
  { text: "The cosmos is within us. We are made of star-stuff. We are a way for the cosmos to know itself.", author: "Carl Sagan" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.", author: "Stephen Hawking" },
  { text: "I would rather die on Mars than just land on it.", author: "Elon Musk" },
  { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
  { text: "For once you have tasted flight, you will walk the earth with your eyes turned skywards.", author: "Leonardo da Vinci" },
  { text: "The universe is under no obligation to make sense to you.", author: "Neil deGrasse Tyson" },
];

export default function BentoMenu({ isOpen, onClose }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { playPip } = useSound();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    try { playPip(1760, 0.05, 0.03); } catch(e) {}
    setQuoteIndex((prev) => (prev + 1) % deepQuotes.length);
  };

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
            className="absolute top-10 right-10 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-2xl group"
          >
            <span className="group-hover:rotate-90 transition-transform duration-500">×</span>
          </button>

          <div className="w-full h-full max-w-7xl grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-3 gap-6 auto-rows-fr">
            
            {/* Primary Nav Bento (2x2) */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="md:col-span-2 md:row-span-2 border border-white/5 bg-white/[0.02] rounded-3xl p-8 md:p-12 flex flex-col justify-between"
            >
               <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-[0.6em] mb-12">Mission_Parameters // Registry</span>
               <div className="flex flex-col gap-6 md:gap-10">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleNav(link.target)}
                      className="group flex items-center gap-6 text-2xl md:text-5xl font-display font-bold text-white/50 hover:text-white transition-all text-left"
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
               className="md:col-span-2 md:row-span-1 border border-white/5 bg-white/[0.02] rounded-3xl p-8 flex flex-col justify-between hover:bg-white/[0.05] transition-all cursor-pointer group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 group-hover:text-cyan-400/30 transition-colors">EST_CONN_VER_2.1</div>
               <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">External_Links</span>
               <div className="flex gap-8 items-end flex-wrap">
                  <a href="#" className="font-display text-4xl md:text-6xl font-bold text-white/20 hover:text-white transition-all tracking-tighter">GH</a>
                  <a href="#" className="font-display text-4xl md:text-6xl font-bold text-white/20 hover:text-white transition-all tracking-tighter">LI</a>
                  <a href="#" className="font-display text-4xl md:text-6xl font-bold text-white/20 hover:text-white transition-all tracking-tighter">X</a>
               </div>
            </motion.div>

            {/* System Clock Bento (1x1) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4 }}
               className="md:col-span-1 md:row-span-1 border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-4"
            >
               <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">Universal_Time</span>
               <div className="text-4xl font-display font-bold text-white tabular-nums tracking-tighter">{time}</div>
               <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-cyan-400/40 rounded-full animate-bounce" style={{ animationDelay: `${i*100}ms` }} />)}
               </div>
            </motion.div>

            {/* Location / Meta (1x1) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5 }}
               className="md:col-span-1 md:row-span-1 border border-white/5 bg-white/[0.02] rounded-3xl p-8 flex flex-col justify-between group overflow-hidden"
            >
               <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">Orbital_Ping</span>
               <div className="relative">
                  <div className="text-white/80 font-bold text-sm mb-1 group-hover:text-cyan-400 transition-colors">MEDAN // IDN</div>
                  <div className="text-[9px] text-white/20 font-mono">LAT: 3.5952° N<br />LNG: 98.6722° E</div>
                  {/* Subtle Grid Accent */}
                  <div className="absolute -bottom-10 -right-10 w-20 h-20 border border-white/5 rotate-45 pointer-events-none" />
               </div>
            </motion.div>

            {/* Quote / Mission (2x1) */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="md:col-span-2 md:row-span-1 border border-white/10 bg-[#0A0A12] rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
            >
               <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-[80px] pointer-events-none" />
               
               <AnimatePresence mode="wait">
                 <motion.div 
                    key={quoteIndex}
                    initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(10px)', y: -10 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                 >
                    <div className="font-display text-2xl md:text-3xl font-bold leading-tight text-white/90">
                       &quot;{deepQuotes[quoteIndex].text}&quot;
                    </div>
                    <div className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400/60">
                       — {deepQuotes[quoteIndex].author} {"// ARCHIVE_"}{quoteIndex + 1}
                    </div>
                 </motion.div>
               </AnimatePresence>

               <div className="mt-8 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextQuote}
                    className="flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-cyan-400"
                  >
                     <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                     Initialize_Quantum_Quote
                  </motion.button>
               </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
