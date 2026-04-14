'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * High-performance Video Background component optimized for 1080p cinematic playback.
 * Connects to Netlify Blobs or high-speed CDN to prevent frontend lag.
 */
export default function VideoBackground({ 
  src, 
  poster, 
  fallbackImage, 
  className = "", 
  overlayOpacity = 0.5,
  grayscale = true,
  brightness = 0.8,
  contrast = 1.1
}) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Cinematic slow-mo
    }
  }, [src]);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    console.error("CORE_VIDEO_ERROR:", e);
    setError(true);
  };

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden bg-black ${className}`}>
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20 animate-pulse" />
              <span className="text-[8px] tracking-[0.5em] text-white/30 uppercase animate-pulse">Loading_System_Visuals</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={handleLoadedData}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${grayscale ? 'grayscale' : ''}`}
        style={{ 
          opacity: isLoaded ? 1 : 0,
          filter: `brightness(${brightness}) contrast(${contrast})` 
        }}
      >
        <source src={src} type="video/mp4" />
        {/* Fallback if video fails */}
        {error && fallbackImage && (
          <Image 
            src={fallbackImage} 
            alt="Visual Fallback" 
            fill
            className="object-cover" 
          />
        )}
      </motion.video>

      {/* Luxury Vignette Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none bg-black" 
        style={{ opacity: overlayOpacity }} 
      />
      
      {/* Precision Grid Overlay (Optional/Aesthetic) */}
      <div className="absolute inset-0 z-[11] pointer-events-none opacity-[0.03] grid-bg" />

      <style jsx>{`
        .grid-bg {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}
