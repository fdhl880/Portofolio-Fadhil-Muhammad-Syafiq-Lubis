'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CURSOR_SIZE = 12;
const MAGNETIC_STRENGTH = 0.3;

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [magneticElement, setMagneticElement] = useState(null);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      
      let x = e.clientX;
      let y = e.clientY;

      // Magnetic Logic
      const magElement = document.elementFromPoint(x, y)?.closest('[data-magnetic]');
      if (magElement) {
        const rect = magElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        x = x + (centerX - x) * MAGNETIC_STRENGTH;
        y = y + (centerY - y) * MAGNETIC_STRENGTH;
        setMagneticElement(magElement);
      } else {
        setMagneticElement(null);
      }

      mouseX.set(x);
      mouseY.set(y);

      // Particle Creation
      if (Math.random() > 0.8) {
        setParticles(prev => [
          ...prev.slice(-15),
          { 
            id: Math.random(), 
            x: e.clientX, 
            y: e.clientY, 
            scale: Math.random() * 0.5 + 0.5,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
          }
        ]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isPickable = target.closest('button, a, .group, [data-magnetic]');
      setIsHovering(!!isPickable);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible, mouseX, mouseY]);

  // Particle Cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setParticles(prev => prev.filter(p => Math.random() > 0.1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Stardust particles */}
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0.8, scale: p.scale, x: p.x, y: p.y }}
              animate={{ 
                opacity: 0, 
                scale: 0, 
                x: p.x + p.vx * 20, 
                y: p.y + p.vy * 20 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Outer Ring */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-white/20 ${magneticElement ? 'border-white/40 border-2' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 64 : CURSOR_SIZE,
          height: isHovering ? 64 : CURSOR_SIZE,
          opacity: isClicking ? 0.3 : 1,
          scale: isClicking ? 1.2 : 1,
          backgroundColor: isHovering ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Center Core Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: 4,
          height: 4,
          opacity: isHovering ? 0.4 : 1,
        }}
      />
    </>
  );
}
