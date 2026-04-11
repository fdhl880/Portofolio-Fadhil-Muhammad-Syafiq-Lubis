'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppMode } from '../../context/AppModeContext';

// Premium CSS animated backgrounds that mimic luxury brand aesthetics
// No external video dependencies = zero CORS issues, instant loading
const THEMES = {
  // Rolex-style: slow moving golden shimmer
  gold: `
    radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.08) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, rgba(180,140,20,0.1) 0%, transparent 45%)
  `,
  // Porsche-style: cool technical blue
  tech: `
    radial-gradient(ellipse at 30% 40%, rgba(0,120,255,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(100,180,255,0.06) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 20%, rgba(0,80,180,0.04) 0%, transparent 50%)
  `,
  // Nature/heritage: warm earth tones
  nature: `
    radial-gradient(ellipse at 40% 30%, rgba(34,80,50,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 70%, rgba(50,100,60,0.08) 0%, transparent 45%),
    radial-gradient(ellipse at 20% 80%, rgba(80,120,60,0.06) 0%, transparent 40%)
  `,
  // Cosmic/space: deep purple & blue
  cosmic: `
    radial-gradient(ellipse at 25% 25%, rgba(100,50,200,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 75% 75%, rgba(0,100,255,0.08) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 55%)
  `,
  // Silver/platinum: luxury neutral
  silver: `
    radial-gradient(ellipse at 30% 50%, rgba(200,200,210,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 30%, rgba(180,180,200,0.06) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 70%, rgba(160,160,180,0.05) 0%, transparent 45%)
  `,
};

export default function SectionMedia({ theme = 'silver', opacity = 0.3, className = "" }) {
  const { mode } = useAppMode();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only show in Atelier (3D) Mode and not on Mobile
  if (mode !== 'atelier' || isMobile) return null;

  const gradient = THEMES[theme] || THEMES.silver;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          {/* Animated gradient layer 1 - slow drift */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: gradient,
              backgroundSize: '200% 200%',
            }}
          />

          {/* Animated grain/noise texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Pulsating light spot */}
          <motion.div
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              top: '30%',
              left: '20%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Secondary drifting light */}
          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -60, 40, 0],
              opacity: [0.02, 0.06, 0.02],
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              bottom: '20%',
              right: '15%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Luxury Editorial Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-40" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
