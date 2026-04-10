'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import BentoMenu from './BentoMenu';
import AtelierSigil from './AtelierSigil';
import { useSound } from '../../context/SoundContext';

export default function LuxuryNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { playPip } = useSound();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { name: 'Heritage', href: '#exhibitions' },
    { name: 'Collection', href: '#collections' },
    { name: 'Archive', href: '#archives' },
    { name: 'Inquiry', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 px-6 md:px-12 ${
          isScrolled ? 'py-4 bg-black/80 backdrop-blur-3xl border-b border-white/5' : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Atelier Brand Identity */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-4 cursor-pointer"
          >
            <AtelierSigil className="w-8 h-8 text-white group-hover:text-[#D4AF37] transition-all duration-700" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-white text-xs tracking-[0.4em] uppercase">ATELIER_LUBIS</span>
              <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em]">PRECISION_v2.5</span>
            </div>
          </div>

          {/* Minimal Nav Items */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/50 hover:text-white transition-colors duration-500"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Menu Trigger */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col gap-1.5 cursor-pointer group"
          >
            <div className="w-8 h-px bg-white group-hover:w-4 transition-all duration-700" />
            <div className="w-8 h-px bg-white group-hover:w-12 transition-all duration-700" />
          </button>
        </div>
      </motion.nav>

      <BentoMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
