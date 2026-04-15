'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppMode } from '@/app/context/AppModeContext';
import { getSectionMedia } from '@/app/data/SectionMediaDatabase';

/**
 * DYNAMIC BACKGROUND MANAGER — Apple / Awwwards Tier
 *
 * Full-screen fixed background engine.
 * Cross-fades between cinematic images and videos on section change.
 * Sits at z-0, behind all page content but above the HTML body.
 */
export default function DynamicBackgroundManager() {
  const { activeSection } = useAppMode();
  const [currentMedia, setCurrentMedia] = useState(() => getSectionMedia('LuxuryHero'));
  const videoRef = useRef(null);

  // Swap background when active section changes
  useEffect(() => {
    if (!activeSection) return;
    const newMedia = getSectionMedia(activeSection);
    setCurrentMedia(newMedia);
  }, [activeSection]);

  // Handle video playback
  useEffect(() => {
    if (currentMedia.type === 'video' && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentMedia]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={currentMedia.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2.0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute inset-0"
        >
          {/* === IMAGE === */}
          {currentMedia.type === 'image' && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
              style={{ backgroundImage: `url('${currentMedia.url}')` }}
            />
          )}

          {/* === VIDEO === */}
          {currentMedia.type === 'video' && (
            <video
              ref={videoRef}
              key={currentMedia.url}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-105"
              poster={currentMedia.fallbackUrl}
            >
              <source src={currentMedia.url} type="video/mp4" />
            </video>
          )}

          {/* DARK OVERLAY — tuned per-section for readability */}
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: currentMedia.overlayOpacity ?? 0.55 }}
          />

          {/* Cinematic gradient framing */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Permanent grain overlay */}
      <div className="absolute inset-0 noise-bg opacity-[0.04]" />
    </div>
  );
}
