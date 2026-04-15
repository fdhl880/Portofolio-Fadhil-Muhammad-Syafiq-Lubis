'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppMode } from '@/app/context/AppModeContext';
import { getSectionMedia } from '@/app/data/SectionMediaDatabase';

/**
 * DYNAMIC BACKGROUND MANAGER
 * 
 * An Apple-tier, fixed full-screen background engine.
 * 
 * As the user scrolls, this component cross-fades between
 * high-resolution cinematic images and videos per section.
 * 
 * The backgrounds are rendered below all page content (z-0)
 * and above the Three.js CinematicRoom (z-[0]).
 */
export default function DynamicBackgroundManager() {
  const { activeSection } = useAppMode();
  const [currentMedia, setCurrentMedia] = useState(getSectionMedia('LuxuryHero'));
  const [displayedMedia, setDisplayedMedia] = useState(getSectionMedia('LuxuryHero'));
  const videoRef = useRef(null);

  // Update media whenever the active section changes
  useEffect(() => {
    if (!activeSection) return;
    const newMedia = getSectionMedia(activeSection);
    // Only update if the media URL actually changes
    if (newMedia.url !== currentMedia.url) {
      setCurrentMedia(newMedia);
    }
  }, [activeSection, currentMedia.url]);

  // Manage video playback for video-type backgrounds
  useEffect(() => {
    if (currentMedia.type === 'video' && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {}); // suppress autoplay policy errors
    }
    setDisplayedMedia(currentMedia);
  }, [currentMedia]);

  return (
    <>
      {/* Layer 1: The dynamic full-screen background (behind everything) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMedia.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.8,
              ease: [0.25, 0.46, 0.45, 0.94], // Apple easing
            }}
            className="absolute inset-0"
          >
            {/* Image Background */}
            {currentMedia.type === 'image' && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${currentMedia.url}')`,
                }}
              />
            )}

            {/* Video Background */}
            {currentMedia.type === 'video' && (
              <video
                ref={videoRef}
                key={currentMedia.url}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster={currentMedia.fallbackUrl}
              >
                <source src={currentMedia.url} type="video/mp4" />
              </video>
            )}

            {/* Dark Overlay — ensures text readability */}
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: currentMedia.overlayOpacity ?? 0.82 }}
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Layer 2: Persistent noise/grain texture overlay for luxury feel */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.025] noise-bg" />
    </>
  );
}
