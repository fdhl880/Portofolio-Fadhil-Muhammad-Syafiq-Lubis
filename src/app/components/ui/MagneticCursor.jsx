'use client';
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const dotSpringConfig = { damping: 28, stiffness: 1000, mass: 0.1 };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      
      // Detect if hovering over clickable elements
      const target = e.target;
      const isClickable = target.closest('button, a, [role="button"], .interactive-element');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Main Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/20 pointer-events-none z-[9999] hidden md:block"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isHovering ? 2 : 1,
          borderColor: isHovering ? 'rgba(212, 175, 55, 0.5)' : 'rgba(255, 255, 255, 0.2)',
          backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
        }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ x: dotX, y: dotY, translateX: '13px', translateY: '13px' }}
        animate={{
          backgroundColor: isHovering ? '#D4AF37' : '#FFFFFF',
        }}
      />
    </>
  );
}
