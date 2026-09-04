'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Research', href: '#research' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function FloatingNavbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-2xl'
              : 'bg-white/80 backdrop-blur-xl border border-black/10 shadow-2xl'
            : isDark
              ? 'bg-neutral-900/40 backdrop-blur-md border border-white/5'
              : 'bg-white/40 backdrop-blur-md border border-black/5'
        }`}
      >
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-4 py-2 text-[11px] font-medium tracking-wider uppercase rounded-full transition-all duration-300 ${
                isDark
                  ? 'text-white/60 hover:text-white hover:bg-white/10'
                  : 'text-black/60 hover:text-black hover:bg-black/5'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-full transition-all duration-300 ${
            isDark
              ? 'text-white/60 hover:text-white hover:bg-white/10'
              : 'text-black/60 hover:text-black hover:bg-black/5'
          }`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Hire Me CTA */}
        <a
          href="#contact"
          className={`hidden md:block px-5 py-2 text-[10px] font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-300 ${
            isDark
              ? 'bg-white text-black hover:bg-neutral-200'
              : 'bg-black text-white hover:bg-neutral-800'
          }`}
        >
          Hire Me
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2.5 rounded-full transition-all ${
            isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-20 left-4 right-4 z-[998] rounded-2xl p-6 flex flex-col gap-2 ${
              isDark
                ? 'bg-neutral-900/95 backdrop-blur-xl border border-white/10'
                : 'bg-white/95 backdrop-blur-xl border border-black/10'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 text-sm font-medium tracking-wider uppercase rounded-xl transition-all ${
                  isDark
                    ? 'text-white/70 hover:text-white hover:bg-white/5'
                    : 'text-black/70 hover:text-black hover:bg-black/5'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className={`mt-2 px-4 py-3 text-sm font-bold tracking-wider uppercase rounded-xl text-center transition-all ${
                isDark
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
              }`}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
