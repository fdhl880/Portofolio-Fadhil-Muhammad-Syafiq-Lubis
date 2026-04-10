'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import AtelierSigil from './AtelierSigil';

const navLinks = [
  { name: 'Heritage', target: 'exhibitions' },
  { name: 'The Collections', target: 'collections' },
  { name: 'The Archives', target: 'archives' },
  { name: 'Expertise', target: 'expertise' },
  { name: 'The Inquiry', target: 'contact' },
];

export default function BentoMenu({ isOpen, onClose }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (id) => {
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
          className="fixed inset-0 z-[1000] flex flex-col bg-black text-white p-6 md:p-12 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div className="flex items-center gap-6">
              <AtelierSigil className="w-10 h-10 text-white" />
              <div className="flex flex-col gap-1">
                <span className="font-display text-xl tracking-[0.2em]">ATELIER</span>
                <span className="text-[8px] tracking-[0.4em] uppercase text-white/20">Precision Archive</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="group flex items-center gap-4 text-[10px] tracking-[0.5em] uppercase text-white/40 hover:text-white transition-all"
            >
              Close
              <div className="w-8 h-px bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-700" />
            </button>
          </div>

          {/* Directory List */}
          <div className="flex-grow flex flex-col justify-center gap-6 md:gap-8 max-w-4xl mx-auto w-full py-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 1 }}
                onClick={() => handleNav(link.target)}
                className="group flex items-baseline gap-8 text-3xl md:text-5xl font-display uppercase tracking-widest text-white/20 hover:text-white transition-all duration-700 text-left"
              >
                <span className="text-lg md:text-2xl italic opacity-40">/0{i+1}</span>
                <span className="group-hover:italic group-hover:translate-x-8 transition-all duration-700">
                  {link.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Footer Info */}
          <div className="flex flex-col md:flex-row justify-between items-end mt-6 md:mt-8 gap-12 border-t border-white/5 pt-8">
            <div className="flex flex-col gap-1 order-2 md:order-1">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/20">Coordinate</span>
              <span className="font-sans text-xs text-white/40 italic">3.5952° N, 98.6722° E // Medan, Indonesia</span>
            </div>
            <div className="flex flex-col md:items-end gap-1 order-1 md:order-2">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/20">Current Time</span>
              <span className="font-display text-4xl tabular-nums opacity-60 italic">{time}</span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
