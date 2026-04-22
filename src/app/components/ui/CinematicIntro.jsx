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

  const words = "ATELIER FADHIL".split("");

  return (
    <AnimatePresence>
      {phase < 4 && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black font-sans">
          
          {/* Pixar-style Spotlight */}
          <motion.div 
            animate={{ 
              x: phase === 1 ? [-100, 100, -100] : 0,
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none"
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
                    duration: 1.2,
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
                  scale: 1.1,
                  filter: 'blur(20px)',
                  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
                }}
                className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg px-4"
              >
                {/* Jumping Pixar Logo */}
                <div className="relative mb-16 h-32 flex items-end justify-center">
                  <motion.div 
                    initial={{ opacity: 0, y: -200 }}
                    animate={{ 
                      opacity: 1, 
                      y: [0, -60, 0, -30, 0],
                      scaleY: [1, 0.8, 1.1, 0.9, 1], // Squash and stretch
                      scaleX: [1, 1.2, 0.9, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2.5, 
                      times: [0, 0.2, 0.4, 0.6, 0.8],
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="relative w-20 h-20 rounded-none overflow-hidden border border-white/10 p-4 bg-black/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)] z-20"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <motion.path 
                        d="M 35 25 L 65 25 M 35 50 L 52 50 M 35 75 L 65 75 M 35 25 L 35 75 M 35 50 L 65 25" 
                        fill="none" 
                        stroke="#FFFFFF" 
                        strokeWidth="3"
                        strokeLinejoin="miter"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Shadow */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 0.5, 1, 0.7, 1],
                      opacity: [0.2, 0.05, 0.2, 0.1, 0.2]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      times: [0, 0.2, 0.4, 0.6, 0.8],
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute bottom-0 w-12 h-2 bg-white/10 rounded-full blur-md"
                  />
                </div>

                {/* Letter-by-letter reveal */}
                <div className="flex gap-2 mb-12">
                  {words.map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + (i * 0.05) }}
                      className={`text-white text-xl md:text-2xl font-light tracking-widest ${letter === " " ? "w-4" : ""}`}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {/* Loading UI */}
                <div className="w-64 h-12 relative flex flex-col items-center">
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 2.5 }}
                      className="w-full"
                    >
                      <div className="w-full text-[8px] font-sans text-white/20 uppercase tracking-[1em] mb-3 text-center">
                        Initializing Nexus
                      </div>
                      <div className="w-full h-[1px] bg-white/[0.05] relative overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-white/40" 
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
