'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(0);

  const handleSkip = useCallback(() => {
    setPhase(3);
    onComplete();
  }, [onComplete]);

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

    // Create particles
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

    // Glowing lines
    const lines = [];
    for (let i = 0; i < 4; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 1 + 0.5,
        length: Math.random() * 200 + 100,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 16, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
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

      // Draw glowing lines
      for (const l of lines) {
        l.x += Math.cos(l.angle) * l.speed;
        l.y += Math.sin(l.angle) * l.speed;
        if (l.x < -200 || l.x > canvas.width + 200 || l.y < -200 || l.y > canvas.height + 200) {
          l.x = Math.random() * canvas.width;
          l.y = Math.random() * canvas.height;
          l.angle = Math.random() * Math.PI * 2;
        }

        const endX = l.x + Math.cos(l.angle) * l.length;
        const endY = l.y + Math.sin(l.angle) * l.length;
        const grad = ctx.createLinearGradient(l.x, l.y, endX, endY);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
        grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.3)');
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    // Phase timing
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3500);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#050510' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="relative z-10 text-center px-4">
            <AnimatePresence mode="wait">
              {phase === 1 && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-2">
                    Fadhil Muhammad Syafiq
                  </h1>
                </motion.div>
              )}
              {phase === 2 && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-4">
                    Fadhil Muhammad Syafiq
                  </h1>
                  <p className="text-lg md:text-2xl text-muted tracking-widest uppercase">
                    Medan, Indonesia
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-muted text-sm hover:text-white transition cursor-pointer z-20"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
