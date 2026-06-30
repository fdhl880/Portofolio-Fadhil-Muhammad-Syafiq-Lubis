'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Projects', href: '#projects' },
  { name: 'Research', href: '#research' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Media', href: '#media' },
  { name: 'Contact', href: '#contact' },
];

export default function LuxuryNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollTo = (href) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <>
      {/* Fixed Nav Bar */}
      <nav className={`fixed top-0 inset-x-0 z-[200] flex items-center justify-between px-6 md:px-10 transition-all duration-700 ${
        scrolled ? 'py-4 bg-black/90 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
      }`}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors duration-500">
            <svg viewBox="0 0 100 100" className="w-5 h-5">
              <path
                d="M 35 25 L 65 25 M 35 50 L 52 50 M 35 75 L 65 75 M 35 25 L 35 75 M 35 50 L 65 25"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinejoin="miter"
              />
            </svg>
          </div>
          <span className="text-[11px] tracking-[0.35em] uppercase font-medium text-white/70 group-hover:text-white transition-colors hidden md:block">
            Fadhil
          </span>
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-[210] w-10 h-10 flex flex-col items-center justify-center gap-[6px] cursor-pointer ${isOpen ? 'ham-open' : ''}`}
          aria-label="Toggle Menu"
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </nav>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[205] bg-black flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-impact-md text-white hover:text-white/50 transition-colors duration-300 cursor-pointer py-2"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    lineHeight: 1.1,
                  }}
                >
                  {link.name}
                </motion.button>
              ))}

              {/* Social Links in Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-8 mt-12"
              >
                {[
                  { name: 'Gmail', href: 'mailto:fadhilsyafiq90@gmail.com' },
                  { name: 'GitHub', href: 'https://github.com/fdhl880' },
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/fadhil-muhammad-syafiq-lubis-90a46a355' },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target={s.name !== 'Gmail' ? '_blank' : undefined}
                    rel={s.name !== 'Gmail' ? 'noopener noreferrer' : undefined}
                    className="text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors"
                  >
                    {s.name}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
