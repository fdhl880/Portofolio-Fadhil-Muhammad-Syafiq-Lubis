'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function LuxuryNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Heritage', href: '#exhibitions' },
    { name: 'Collection', href: '#collections' },
    { name: 'Archive', href: '#archives' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 px-6 md:px-12 ${
        isScrolled ? 'py-4 bg-black/80 backdrop-blur-3xl border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Monogram Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative font-display text-2xl tracking-tighter text-white group-hover:tracking-widest transition-all duration-700">
            FADHIL LUBIS
            <div className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-700" />
          </div>
        </Link>

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

        {/* Mobile Menu Trigger (Minimal) */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer group">
          <div className="w-6 h-px bg-white group-hover:w-4 transition-all" />
          <div className="w-6 h-px bg-white group-hover:w-8 transition-all" />
        </div>
      </div>
    </motion.nav>
  );
}
