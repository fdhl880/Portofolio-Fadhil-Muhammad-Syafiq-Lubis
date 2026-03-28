'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../context/SoundContext';

export default function WarpPortal() {
  const [isWarping, setIsWarping] = useState(false);
  const { playSweep } = useSound();

  useEffect(() => {
    const handleWarp = (e) => {
      const targetId = e.detail;
      setIsWarping(true);
      playSweep(200, 2500, 0.4);
      
      // Portal covers screen completely at 400ms. Warp the scroll safely.
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto' });
      }, 400);

      // Close Portal
      setTimeout(() => {
        setIsWarping(false);
      }, 800);
    };

    window.addEventListener('NEXUS_WARP_INIT', handleWarp);
    return () => window.removeEventListener('NEXUS_WARP_INIT', handleWarp);
  }, [playSweep]);

  return (
    <AnimatePresence>
      {isWarping && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center bg-white"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-white to-violet-500 opacity-80 mix-blend-screen" />
          
          <motion.div 
            animate={{ scale: [1, 5], opacity: [1, 0] }}
            transition={{ duration: 0.6 }}
            className="w-[40vw] h-[40vw] border-[40px] border-cyan-400 rounded-full blur-[50px]"
          />
          <motion.div 
            animate={{ scale: [1, 8], opacity: [1, 0] }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute w-[20vw] h-[20vw] bg-white rounded-full blur-[30px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
