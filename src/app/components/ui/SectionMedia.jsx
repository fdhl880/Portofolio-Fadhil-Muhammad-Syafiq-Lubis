'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppMode } from '../../context/AppModeContext';
import Image from 'next/image';

export default function SectionMedia({ src, type = 'video', opacity = 0.3, className = "" }) {
  const { mode } = useAppMode();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Disable on mobile for performance as requested
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only show in Atelier (3D) Mode and not on Mobile
  if (mode !== 'atelier' || isMobile) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? opacity : 0 }}
          transition={{ duration: 2 }}
          className="w-full h-full"
        >
          {type === 'video' ? (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setIsLoaded(true)}
              className="w-full h-full object-cover filter brightness-75 contrast-110"
            />
          ) : (
            <Image
              src={src}
              alt="Section Background"
              fill
              unoptimized
              onLoad={() => setIsLoaded(true)}
              className="object-cover"
            />
          )}

          {/* Luxury Editorial Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-40" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
