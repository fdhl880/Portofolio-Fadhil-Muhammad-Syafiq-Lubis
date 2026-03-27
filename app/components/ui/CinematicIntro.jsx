'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CinematicIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleSkip = useCallback(() => {
    setPhase(3);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  // Background Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 16, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Boot Sequence
  useEffect(() => {
    let interval;
    const t0 = setTimeout(() => setPhase(1), 300); // show logo
    const t1 = setTimeout(() => {
      setPhase(2); // start progress bar
      let currentProgress = 0;
      interval = setInterval(() => {
        currentProgress += Math.random() * 15 + 5;
        if (currentProgress >= 100) {
          setProgress(100);
          clearInterval(interval);
          setTimeout(() => {
            setPhase(3); // fade out
            setTimeout(onComplete, 800); // callback
          }, 500);
        } else {
          setProgress(Math.floor(currentProgress));
        }
      }, 120);
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto"
          style={{ background: '#050510' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 z-0" />
          
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-4">
            <AnimatePresence mode="wait">
              {phase >= 1 && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="mb-8"
                >
                  <div className="relative w-24 h-24 mx-auto md:w-32 md:h-32 rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.4)] border border-[#00f0ff]/30">
                    <Image 
                      src="/icon.png" 
                      alt="Nexus Core Boot" 
                      fill 
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
                {phase >= 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="w-full text-xs font-display text-[#00f0ff] uppercase tracking-[0.3em] mb-2 text-center h-4">
                      {progress < 100 ? `SYSTEM_BOOT_SEQ... [${progress}%]` : 'SYSTEM_ONLINE'}
                    </div>
                    <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: 'tween', ease: 'linear', duration: 0.15 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="absolute bottom-10 text-[#00f0ff]/50 hover:text-[#00f0ff] text-xs uppercase tracking-widest transition-colors z-20"
          >
            [ Skip_Sequence ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
