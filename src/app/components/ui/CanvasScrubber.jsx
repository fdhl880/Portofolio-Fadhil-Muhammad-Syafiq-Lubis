'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CanvasScrubber({ 
  sequencePath, 
  frameCount, 
  activeIndex, 
  currentIndex, 
  loop = false,
  style 
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef(0);
  const isNearViewport = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

  // Intersection Observer for Lazy Loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedLoading) {
          setHasStartedLoading(true);
        }
        isNearViewport.current = entry.isIntersecting;
      },
      { rootMargin: '400px' } // Start loading 400px before reaching the section
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStartedLoading]);

  // Preload Images (Only when near viewport)
  useEffect(() => {
    if (!hasStartedLoading) return;

    let loadedCount = 0;
    imagesRef.current = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, '0');
      img.src = `${sequencePath}/frame_${frameIndex}.webp`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
          renderFrame(0);
        }
      };
      
      imagesRef.current.push(img);
    }
  }, [sequencePath, frameCount, hasStartedLoading]);

  const renderFrame = (index) => {
    const safeIndex = Math.floor(index) % frameCount;
    if (!canvasRef.current || !imagesRef.current[safeIndex]) return;
    const ctx = canvasRef.current.getContext('2d', { alpha: false }); // Optimize for opaque content
    const img = imagesRef.current[safeIndex];
    
    const canvas = canvasRef.current;
    
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;  
    
    ctx.drawImage(img, 0, 0, img.width, img.height,
                  centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  // Ultra-Performant Render Loop (Direct Canvas Update)
  useEffect(() => {
    if (!loaded) return;
    
    let animationFrameId;

    const animate = () => {
      // Only process frames if we are actually near the viewport to save CPU/GPU
      if (isNearViewport.current) {
        if (loop) {
          frameRef.current = (frameRef.current + 0.25) % frameCount;
          renderFrame(frameRef.current);
        } else {
          let targetFrame = activeIndex === currentIndex ? frameCount - 1 : 0;
          let diff = targetFrame - frameRef.current;
          
          if (Math.abs(diff) > 0.05) {
            frameRef.current += diff * 0.15; // Smooth interpolation
            renderFrame(frameRef.current);
          } else {
            frameRef.current = targetFrame;
            renderFrame(targetFrame);
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeIndex, currentIndex, loaded, loop, frameCount]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full" style={style}>
      <motion.canvas
        ref={canvasRef}
        width={1280} // Optimized internal resolution
        height={720}
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-mono">
            {hasStartedLoading ? 'Loading Binary...' : 'Standby...'}
          </div>
        </div>
      )}
    </div>
  );
}
