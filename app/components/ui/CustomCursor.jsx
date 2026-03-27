'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // only show after first move to avoid top-left spawn

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Use event delegation to check for hovers
    const handleMouseOver = (e) => {
      // If we hover over a button, link, or elements explicitly using cursor-pointer
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Also hide the default cursor on the whole body
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto'; // restore on unmount
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Render a combination: solid dot + hollow trailing ring
  return (
    <>
      {/* Small Dot (no delay/spring) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] mix-blend-screen"
        style={{
          backgroundColor: '#00f0ff',
          x: mousePosition.x - 4, // center it (width/2)
          y: mousePosition.y - 4,
          boxShadow: '0 0 10px #00f0ff',
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
      
      {/* Hollow Ring (Spring dynamics) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#00f0ff] pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 16),
          y: mousePosition.y - (isHovering ? 20 : 16),
          width: isHovering ? 40 : 32,
          height: isHovering ? 40 : 32,
          backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 150,
          mass: 0.5,
        }}
        style={{
          boxShadow: '0 0 15px rgba(0,240,255,0.3)',
        }}
      />
    </>
  );
}
