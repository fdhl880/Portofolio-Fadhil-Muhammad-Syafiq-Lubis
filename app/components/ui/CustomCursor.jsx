'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isPickable = target.closest('button, a, .bento-tile, [data-magnetic]');
      if (isPickable) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
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

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Magnetic Lens / Glass Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-white/20 flex items-center justify-center backdrop-blur-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 100 : 32,
          height: isHovering ? 100 : 32,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0)',
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }}
      >
        {/* Subtle Lens Distortion Ring */}
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 rounded-full border border-cyan-400/30 shadow-[inset_0_0_20px_rgba(0,240,255,0.1)]"
          />
        )}
      </motion.div>

      {/* Center Core Liquid Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-cyan-400 shadow-[0_0_15px_#00f0ff]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 4 : 8,
          height: isHovering ? 4 : 8,
          opacity: 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Aesthetic HUD Label (Minimal) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001] pl-6 pt-6"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '50%',
          translateY: '50%',
        }}
        animate={{
          opacity: isHovering ? 0.8 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
      >
        <div className="font-mono text-[8px] text-cyan-400 font-bold uppercase tracking-widest whitespace-nowrap bg-[#020208]/80 px-2 py-1 rounded-sm border border-white/5 backdrop-blur-md">
           TRG_LENS_LOCK // {isClicking ? 'EXECUTE' : 'SCANNING'}
        </div>
      </motion.div>
    </>
  );
}
