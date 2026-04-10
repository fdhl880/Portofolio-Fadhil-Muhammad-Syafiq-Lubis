'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const toggle = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-12 right-12 z-[150] group flex flex-col items-center gap-4 cursor-pointer"
          aria-label="Back to top"
        >
          <div className="relative w-12 h-12 border border-white/10 rounded-full flex items-center justify-center bg-black group-hover:border-white transition-all duration-700">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/40 group-hover:text-white transition-colors" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
               <polyline points="18 15 12 9 6 15"></polyline>
             </svg>
          </div>
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/20 group-hover:text-white transition-colors rotate-90 origin-center absolute -top-16 opacity-0 group-hover:opacity-100 duration-700">
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
