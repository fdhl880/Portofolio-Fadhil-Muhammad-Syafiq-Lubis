'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: Boot, 1: Loading, 2: Ready, 3: Shattering
  const [progress, setProgress] = useState(0);

  // Boot Sequence Loader
  useEffect(() => {
    let interval;
    const t0 = setTimeout(() => setPhase(1), 300); // show logo and bar
    const t1 = setTimeout(() => {
      let currentProgress = 0;
      interval = setInterval(() => {
        currentProgress += Math.random() * 15 + 5;
        if (currentProgress >= 100) {
          setProgress(100);
          clearInterval(interval);
          setPhase(2); // Ready to breach
        } else {
          setProgress(Math.floor(currentProgress));
        }
      }, 100);
    }, 1000);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleShatter = useCallback(() => {
    setPhase(3); // Trigger shatter physics animation
    
    // Wait for the glass pieces to fall before unmounting the intro completely
    setTimeout(() => {
      requestAnimationFrame(() => onComplete());
    }, 1600); // 1.6 seconds of falling
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto overflow-hidden bg-transparent">
          
          {/* Shatter Physics Glass Panes (4 Quadrants) */}
          <AnimatePresence>
            {phase < 3 && (
              <>
                <motion.div 
                  exit={{ x: -400, y: 1200, rotateZ: -60, opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeIn' }}
                  className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#020208] border-r border-b border-cyan-500/20 shadow-[inset_-10px_-10px_30px_rgba(0,240,255,0.05)] backdrop-blur-3xl" 
                />
                <motion.div 
                  exit={{ x: 500, y: 1400, rotateZ: 80, opacity: 0 }}
                  transition={{ duration: 1.4, ease: 'easeIn' }}
                  className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#020208] border-l border-b border-cyan-500/20 shadow-[inset_10px_-10px_30px_rgba(0,240,255,0.05)] backdrop-blur-3xl" 
                />
                <motion.div 
                  exit={{ x: -600, y: 1600, rotateZ: -90, opacity: 0 }}
                  transition={{ duration: 1.6, ease: 'easeIn' }}
                  className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#020208] border-r border-t border-cyan-500/20 shadow-[inset_-10px_10px_30px_rgba(0,240,255,0.05)] backdrop-blur-3xl" 
                />
                <motion.div 
                  exit={{ x: 700, y: 1500, rotateZ: 120, opacity: 0 }}
                  transition={{ duration: 1.3, ease: 'easeIn' }}
                  className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#020208] border-l border-t border-cyan-500/20 shadow-[inset_10px_10px_30px_rgba(0,240,255,0.05)] backdrop-blur-3xl" 
                />
              </>
            )}
          </AnimatePresence>

          {/* Central Logo & UI */}
          <AnimatePresence>
            {phase < 3 && (
              <motion.div 
                exit={{ scale: 3, opacity: 0, filter: 'blur(20px)' }}
                transition={{ duration: 0.6, ease: 'easeIn' }}
                className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-4"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 relative w-24 h-24 mx-auto md:w-32 md:h-32 rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.4)] border border-[#00f0ff]/30"
                >
                  <Image src="/icon.png" alt="Nexus Core Boot" fill priority className="object-cover" />
                </motion.div>

                <div className="w-full h-16 mt-4 relative flex flex-col items-center">
                  {phase === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                      <div className="w-full text-[10px] font-mono text-[#00f0ff] uppercase tracking-[0.4em] mb-3 text-center h-4">
                        SYSTEM_BOOT... [{progress}%]
                      </div>
                      <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_15px_#00f0ff]" 
                          animate={{ width: `${progress}%` }} 
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Breach Trigger Button */}
                  {phase === 2 && (
                    <motion.button
                      initial={{ scale: 0.8, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, textShadow: '0 0 15px #00f0ff', boxShadow: '0 0 40px rgba(0,240,255,0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShatter}
                      className="absolute m-auto px-8 py-3 border border-[#00f0ff]/80 text-[#00f0ff] font-display font-bold tracking-[0.4em] uppercase bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 backdrop-blur-md transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] rounded-sm"
                    >
                      [ CLICK TO BREACH ]
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </AnimatePresence>
  );
}
