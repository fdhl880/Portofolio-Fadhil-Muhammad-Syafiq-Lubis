'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppMode } from '../../context/AppModeContext';

// Map themes to its corresponding high-quality real photo
const PHOTO_MAP = {
  hero_intro: '/images/photo1.jpg',
  precision: '/images/assets/precision_engineering_photo_1776182806815.png',
  gold: '/images/assets/gold_medal_innovation_photo_1776183043150.png',
  origin: '/images/medan_origin.png',
  vision: '/images/assets/futuristic_vision_architecture_photo_1776183106469.png',
  material: '/images/photo2.jpg',
  tech: '/images/photo3.jpg',
  cosmic: '/images/assets/futuristic_vision_architecture_photo_1776183106469.png',
  silver: '/images/photo4.jpg',
  nature: '/images/photo1.jpg'
};

const THEMES = {
  gold: `
    radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.05) 0%, transparent 40%)
  `,
  tech: `
    radial-gradient(ellipse at 30% 40%, rgba(0,120,255,0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(100,180,255,0.04) 0%, transparent 40%)
  `,
  nature: `
    radial-gradient(ellipse at 40% 30%, rgba(34,80,50,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 70%, rgba(50,100,60,0.06) 0%, transparent 45%)
  `,
};

export default function SectionMedia({ theme = 'silver', className = '', opacity = 1 }) {
  const { mode } = useAppMode();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only show in Atelier (3D) Mode
  if (mode !== 'atelier') return null;

  const photoPath = PHOTO_MAP[theme] || PHOTO_MAP.silver;
  const gradient = THEMES[theme] || '';

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: opacity, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full relative"
        >
          {/* REAL PHOTO MEDIA (STABLE & LUXURY) */}
          <motion.img 
            src={photoPath} 
            alt={theme}
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ filter: 'brightness(0.6) contrast(1.1) grayscale(0.2)' }}
          />

          {/* Premium gradient overlay */}
          <div
            className="absolute inset-0 mix-blend-screen opacity-30"
            style={{ backgroundImage: gradient }}
          />

          {/* Vignette & Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_95%)] opacity-70" />
          
          {/* Animated light pulses */}
          <motion.div
            animate={{ opacity: [0.02, 0.05, 0.02] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 bg-white/5"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

