'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: Boot, 1: Loading, 2: Ready, 3: Reveal
  const [progress, setProgress] = useState(0);

  // 4x4 Grid for Bento Reveal
  const tiles = Array.from({ length: 16 });

  const handleReveal = useCallback(() => {
    setPhase(3);
    setTimeout(() => {
      onComplete();
    }, 2000); // Slower, more elegant exit
  }, [onComplete]);

  useEffect(() => {
    let interval;
    const t0 = setTimeout(() => setPhase(1), 300);
    const t1 = setTimeout(() => {
      let currentProgress = 0;
      interval = setInterval(() => {
        // More subtle, rhythmic loading
        currentProgress += Math.random() * 8 + 4;
        if (currentProgress >= 100) {
          setProgress(100);
          clearInterval(interval);
          setPhase(2);
          // Automatic transition to phase 3 after a brief ready moment
          setTimeout(() => handleReveal(), 800);
        } else {
          setProgress(Math.floor(currentProgress));
        }
      }, 1200 / 10); // Controlled duration
    }, 800);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      if (interval) clearInterval(interval);
    };
  }, [handleReveal]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black">
          
          {/* Subtle Ambient Pulse Background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 1 ? 0.3 : 0 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
          />

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
                    duration: 1.2, // Slower, more cinematic
                    delay: (i % 4) * 0.15 + Math.floor(i / 4) * 0.15,
                    ease: [0.16, 1, 0.3, 1] 
                  }
                }}
                className="bg-black border-[0.5px] border-white/[0.03]"
              />
            ))}
          </div>

          {/* Central Logo & UI */}
          <AnimatePresence>
            {phase < 3 && (
              <motion.div 
                exit={{ 
                  opacity: 0, 
                  scale: 1.1, // Scale up on exit for "immersive zoom" feel
                  filter: 'blur(20px)',
                  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
                }}
                className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-4"
              >
                {/* Premium Logo Container with Inner Glow */}
                <motion.div 
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="mb-12 relative w-24 h-24 rounded-none overflow-hidden border border-white/10 p-4 bg-black/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                >
                  {/* Subtle Shimmer Effect */}
                  <motion.div 
                    animate={{ 
                      x: ['-100%', '200%'],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: 1 
                    }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12"
                  />
                  <Image src="/brand-logo.svg" alt="Atelier Boot" fill priority className="object-contain p-5" />
                </motion.div>

                <div className="w-64 h-12 relative flex flex-col items-center">
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 0.5 }}
                      className="w-full"
                    >
                      <div className="w-full text-[9px] font-sans text-white/30 uppercase tracking-[0.8em] mb-3 text-center">
                        Initializing Atelier
                      </div>
                      <div className="w-full h-[1px] bg-white/[0.03] relative overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-white/30" 
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          animate={{ width: `${progress}%` }} 
                        />
                      </div>
                    </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </AnimatePresence>
  );
}
