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

  // Render a combination: solid dot + hollow trailing ring
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] mix-blend-screen"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.1 }}
        style={{
          backgroundColor: isHovering ? '#ffd700' : '#00f0ff',
          boxShadow: isHovering ? '0 0 15px #ffd700' : '0 0 10px #00f0ff',
        }}
      />
      
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#00f0ff] pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          backgroundColor: isHovering ? 'rgba(255, 215, 0, 0.1)' : 'rgba(0, 240, 255, 0.05)',
          scale: isHovering ? 1.3 : 1,
          borderColor: isHovering ? '#ffd700' : '#00f0ff',
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 120,
          mass: 0.6,
        }}
        style={{
          boxShadow: isHovering 
            ? '0 0 25px rgba(255,215,0,0.4), inset 0 0 15px rgba(255,215,0,0.2)' 
            : '0 0 15px rgba(0,240,255,0.3)',
        }}
      />
    </>
  );
}
