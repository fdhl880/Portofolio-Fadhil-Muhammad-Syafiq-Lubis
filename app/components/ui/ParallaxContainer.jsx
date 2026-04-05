'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ParallaxContainer({ children, className = '', depth = 20 }) {
  const containerRef = useRef(null);
  
  // Spring animations for ultra-smooth tilting
  const xSpring = useSpring(0, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / (width / 2);
      const y = (e.clientY - top - height / 2) / (height / 2);
      
      // Calculate rotation limits based on depth
      xSpring.set(x * depth);
      ySpring.set(-(y * depth));
    };

    const handleMouseLeave = () => {
      xSpring.set(0);
      ySpring.set(0);
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [xSpring, ySpring, depth]);

  return (
    <div ref={containerRef} className="perspective-1000 w-full h-full">
      <motion.div
        style={{
          rotateY: xSpring,
          rotateX: ySpring,
          transformStyle: 'preserve-3d',
        }}
        className={`w-full h-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
