'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import QuantumAperture from '../three/QuantumAperture';

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleSkip = useCallback(() => {
    setPhase(3);
    // Use an immediate callback for skips to guarantee execution
    requestAnimationFrame(() => onComplete());
  }, [onComplete]);

  // Boot Sequence
  useEffect(() => {
    let interval;
    const t0 = setTimeout(() => setPhase(1), 300); // show logo
    const t1 = setTimeout(() => {
      setPhase(2); // start progress bar
      let currentProgress = 0;
      interval = setInterval(() => {
        // Accelerate progress near the end for dramatic 3D effect
        const increment = currentProgress > 70 ? (Math.random() * 5 + 1) : (Math.random() * 10 + 2);
        currentProgress += increment;

        if (currentProgress >= 100) {
          setProgress(100);
          clearInterval(interval);
          
          // Wait for 3D "Dive" animation to complete (approx 1s)
          setTimeout(() => {
            setPhase(3); // fade out
            requestAnimationFrame(() => {
               setTimeout(onComplete, 500);
            });
          }, 1200);
        } else {
          setProgress(Math.floor(currentProgress));
        }
      }, 80);
    }, 1200);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      if (interval) clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: 'easeIn' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto overflow-hidden"
          style={{ background: '#050510' }}
        >
          {/* Phase 0-2: 3D Transition Scene */}
          <QuantumAperture progress={progress} />

          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-4">
            <AnimatePresence mode="wait">
              {phase >= 1 && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.5, z: -100 }}
                  animate={{ 
                    opacity: progress > 80 ? 0 : 1, 
                    scale: progress > 80 ? 3 : 1,
                    z: 0 
                  }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="mb-8"
                >
                  <div className="relative w-24 h-24 mx-auto md:w-32 md:h-32 rounded-full overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.6)] border border-[#00f0ff]/50 backdrop-blur-xl">
                    <Image 
                      src="/icon.png" 
                      alt="Nexus Core Boot" 
                      fill 
                      sizes="(max-width: 768px) 96px, 128px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cybernetic Progress Bar */}
            <div className="w-full h-8 mt-4 relative">
              <AnimatePresence>
                {phase >= 2 && progress <= 95 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="w-full text-[10px] font-mono text-[#00f0ff] uppercase tracking-[0.4em] mb-3 text-center h-4 drop-shadow-[0_0_8px_#00f0ff]">
                      {progress < 100 ? `SYNCHRONIZING_CORES... [${progress}%]` : 'SYSTEM_STABILIZED'}
                    </div>
                    <div className="w-[80%] h-[1px] bg-white/5 relative overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00f0ff] to-[#8b5cf6] shadow-[0_0_15px_#00f0ff]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* HUD Overlay Accents */}
          <div className="absolute inset-0 pointer-events-none border-[30px] border-[#00f0ff]/5 mix-blend-overlay" />
          <div className="absolute top-10 left-10 w-20 h-20 border-l border-t border-[#00f0ff]/20" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-[#00f0ff]/20" />

          <button
            onClick={handleSkip}
            aria-label="Skip cinematic introduction"
            className="absolute bottom-10 text-[#00f0ff]/30 hover:text-[#00f0ff] text-[9px] font-mono uppercase tracking-[0.5em] transition-all hover:tracking-[0.7em] z-20 bg-black/40 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm"
          >
            [ ABORT_SEQUENCE ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

