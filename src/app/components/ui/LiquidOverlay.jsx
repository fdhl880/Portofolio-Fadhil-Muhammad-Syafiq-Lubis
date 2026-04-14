'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAppMode } from '../../context/AppModeContext';

export default function LiquidOverlay() {
  const { mode } = useAppMode();
  const [isVisible, setIsVisible] = useState(false);
  const [lastMode, setLastMode] = useState(mode);

  useEffect(() => {
    if (mode !== lastMode) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setLastMode(mode);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [mode, lastMode]);

  const curvePath = "M0 0 C 20 0, 80 0, 100 0 C 100 20, 100 80, 100 100 C 80 100, 20 100, 0 100 C 0 80, 0 20, 0 0 Z";
  const liquidPath = "M0 0 C 30 10, 70 10, 100 0 C 110 30, 110 70, 100 100 C 70 90, 30 90, 0 100 C -10 70, -10 30, 0 0 Z";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center bg-transparent"
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white">
            <motion.path
              initial={{ d: curvePath, scaleY: 0 }}
              animate={{ 
                d: liquidPath,
                scaleY: 1.5,
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
              }}
              exit={{ 
                d: curvePath,
                scaleY: 0,
                transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
              }}
            />
          </svg>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3 }}
            className="absolute text-black font-display text-4xl italic tracking-tighter"
          >
            {mode === 'atelier' ? 'ENTERING ATELIER' : 'EXITING TO ARCHIVE'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
