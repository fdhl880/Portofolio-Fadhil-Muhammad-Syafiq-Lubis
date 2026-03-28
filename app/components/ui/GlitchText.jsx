'use client';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';

export default function GlitchText({ text, className = '' }) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || isAnimating) return;
    setIsAnimating(true);
    
    let iteration = 0;
    const maxIterations = text.length;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration || char === ' ') return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text); // Final safety clamp
        setIsAnimating(false);
      }
      
      iteration += 1 / 3; // Slow down decryption (takes 3 ticks per actual character)
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text, isAnimating]);

  return (
    <span ref={containerRef} className={className}>
      {displayText || text.replace(/./g, '█')}
    </span>
  );
}
