'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // only show after first move to avoid top-left spawn

  useEffect(() => {
    // Check if device supports touch (likely no cursor needed)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const computedStyle = window.getComputedStyle(target);
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        computedStyle.cursor === 'pointer' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central Crosshair Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[10000] mix-blend-screen"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 450, mass: 0.1 }}
        style={{ boxShadow: '0 0 10px #00f0ff' }}
      />
      
      {/* HUD Telemetry (Coordinates) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x + 20,
          y: mousePosition.y - 20,
          opacity: isHovering ? 0.8 : 0.4,
        }}
      >
        <div className="text-[8px] font-mono text-cyan-400 font-bold tracking-tighter shadow-sm bg-black/20 backdrop-blur-sm px-1 rounded">
          {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)} 
          <span className="opacity-50 ml-1">{"// TRG_SCAN"}</span>
        </div>
      </motion.div>

      {/* Main Reticle Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-500/30 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - (isHovering ? 28 : 20),
          y: mousePosition.y - (isHovering ? 28 : 20),
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          rotate: isHovering ? [0, 90] : [0, 45],
          borderColor: isHovering ? '#ffd700' : '#00f0ff50',
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 150,
        }}
      >
        {/* Notch - Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-current opacity-40" />
        {/* Notch - Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-current opacity-40" />
      </motion.div>

      {/* Outer Rotating HUD Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-dashed border-cyan-500/20 pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - (isHovering ? 40 : 30),
          y: mousePosition.y - (isHovering ? 40 : 30),
          width: isHovering ? 80 : 60,
          height: isHovering ? 80 : 60,
          rotate: [0, 360],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 10, ease: 'linear' },
          type: 'spring',
          damping: 30,
          stiffness: 100,
        }}
      />
    </>
  );
}
