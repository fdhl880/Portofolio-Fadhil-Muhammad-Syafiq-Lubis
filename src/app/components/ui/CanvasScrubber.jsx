'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CanvasScrubber({ 
  sequencePath, 
  frameCount, 
  activeIndex, 
  currentIndex, 
  style 
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Preload Images
  useEffect(() => {
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
          renderFrame(1);
        }
      };
      
      imagesRef.current.push(img);
    }
  }, [sequencePath, frameCount]);

  const renderFrame = (index) => {
    if (!canvasRef.current || !imagesRef.current[index]) return;
    const ctx = canvasRef.current.getContext('2d');
    const img = imagesRef.current[index];
    
    // Maintain highly performant 16:9 aspect ratio or cover
    const canvas = canvasRef.current;
    
    // Standard drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Image cover calculation
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;  
    
    ctx.drawImage(img, 0, 0, img.width, img.height,
                  centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  // Render Loop
  useEffect(() => {
    if (!loaded) return;
    
    let targetFrame = activeIndex === currentIndex ? frameCount - 1 : 0;
    
    // Simulate scroll-triggered scrubbing via simple interpolation for this example
    // In a fully integrated version, this is tied to GSAP scroll trigger progress.
    let animationFrameId;
    
    const animate = () => {
      let diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.1) {
        let nextFrame = currentFrame + diff * 0.1;
        setCurrentFrame(nextFrame);
        renderFrame(Math.floor(nextFrame));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        renderFrame(Math.floor(targetFrame));
      }
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeIndex, currentIndex, loaded, currentFrame, frameCount]);

  return (
    <div className="absolute inset-0 w-full h-full" style={style}>
      <motion.canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-mono animate-pulse">
            Loading Asset System...
          </div>
        </div>
      )}
    </div>
  );
}
