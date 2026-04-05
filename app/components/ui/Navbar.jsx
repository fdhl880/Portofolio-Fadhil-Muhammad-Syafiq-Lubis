'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import BentoMenu from './BentoMenu';
import { useSound } from '../../context/SoundContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { playPip } = useSound();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenMenu = () => {
    try { playPip(880, 0.05, 0.03); } catch(e) {}
    setIsMenuOpen(true);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 px-6 md:px-12 py-6 ${
          isScrolled ? 'bg-[#020208]/80 backdrop-blur-3xl border-b border-white/5 py-4' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 p-1 bg-white/5 group-hover:border-cyan-400/50 transition-all">
              <Image src="/logo-initials.png" alt="Nexus" fill className="object-contain p-1" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white text-xs tracking-widest uppercase">Nexus_Grid</span>
              <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em]">Fadhil_Portfolio_V2</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenMenu}
              className="group flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <div className="grid grid-cols-2 gap-1 w-3 h-3">
                 <div className="w-1.5 h-1.5 bg-white/40 group-hover:bg-cyan-400 transition-colors" />
                 <div className="w-1.5 h-1.5 bg-white/40 group-hover:bg-cyan-400 transition-colors" />
                 <div className="w-1.5 h-1.5 bg-white/40 group-hover:bg-cyan-400 transition-colors" />
                 <div className="w-1.5 h-1.5 bg-white/40 group-hover:bg-cyan-400 transition-colors" />
              </div>
              <span className="font-mono text-[10px] text-white/60 tracking-[0.3em] uppercase font-bold">MENU</span>
            </motion.button>
          </div>
        </div>
      </nav>

      <BentoMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
