'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: Boot, 1: Loading, 2: Ready, 3: Reveal
  const [progress, setProgress] = useState(0);

  // 4x4 Grid for Bento Reveal
  const tiles = Array.from({ length: 16 });

  useEffect(() => {
    let interval;
    const t0 = setTimeout(() => setPhase(1), 300);
    const t1 = setTimeout(() => {
      let currentProgress = 0;
      interval = setInterval(() => {
        currentProgress += Math.random() * 12 + 8;
        if (currentProgress >= 100) {
          setProgress(100);
          clearInterval(interval);
          setPhase(2);
        } else {
          setProgress(Math.floor(currentProgress));
        }
      }, 100);
    }, 800);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleReveal = useCallback(() => {
    setPhase(3);
    setTimeout(() => {
      onComplete();
    }, 1200);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-transparent">
          
          {/* Bento Reveal Tiles */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
            {tiles.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1 }}
                exit={{ 
                  scale: 0, 
                  opacity: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: (i % 4) * 0.1 + Math.floor(i / 4) * 0.1,
                    ease: [0.22, 1, 0.36, 1] 
                  }
                }}
                className={`bg-[#050510] border-[0.5px] border-white/5 ${phase === 3 ? 'pointer-events-none' : ''}`}
                style={{ display: phase === 3 ? 'block' : 'block' }}
              />
            ))}
          </div>

          {/* Central Logo & UI */}
          <AnimatePresence>
            {phase < 3 && (
              <motion.div 
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-4"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12 relative w-20 h-20 rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-4 bg-white/5 backdrop-blur-xl"
                >
                  <Image src="/icon.png" alt="Nexus Boot" fill priority className="object-contain p-4" />
                </motion.div>

                <div className="w-64 h-20 relative flex flex-col items-center">
                  {phase === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                      <div className="w-full text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] mb-4 text-center">
                        Initializing_System_{progress}%
                      </div>
                      <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-white/60" 
                          animate={{ width: `${progress}%` }} 
                        />
                      </div>
                    </motion.div>
                  )}

                  {phase === 2 && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReveal}
                      className="px-10 py-3 border border-white/20 text-white font-mono text-[10px] tracking-[0.4em] uppercase bg-white/5 backdrop-blur-md transition-all rounded-sm shadow-2xl"
                    >
                      ENTER_NEXUS
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
