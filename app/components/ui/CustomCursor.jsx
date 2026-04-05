'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ alt: 0, ang: 0 });

  const springConfig = { damping: 40, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Compute fake orbital data based on mouse
      setCoords({
        alt: Math.round(e.clientY * 1.5 + 200),
        ang: (e.clientX / window.innerWidth * 360).toFixed(1)
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('button, a, .bento-tile, [data-magnetic]')) {
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
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Aerospace Reticle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center p-4"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        {/* Main Crosshair */}
        <motion.div 
          animate={{ scale: isHovering ? 1.5 : 1, rotate: isHovering ? 90 : 0 }}
          className="relative w-8 h-8 flex items-center justify-center"
        >
          <div className="absolute w-px h-full bg-cyan-400/40" />
          <div className="absolute h-px w-full bg-cyan-400/40" />
          <div className="absolute w-2 h-2 rounded-full border border-cyan-400 shadow-[0_0_10px_#00f0ff]" />
        </motion.div>

        {/* Orbital HUD Ring */}
        <motion.div
          animate={{ 
            width: isHovering ? 80 : 60, 
            height: isHovering ? 80 : 60,
            opacity: isHovering ? 1 : 0.3,
            rotate: 360
          }}
          transition={{ rotate: { repeat: Infinity, duration: 15, ease: 'linear' } }}
          className="absolute border border-dashed border-cyan-400/20 rounded-full"
        />

        {/* Telemetry Data (Floating) */}
        <motion.div
          animate={{ x: 40, opacity: isHovering ? 1 : 0.4 }}
          className="absolute left-full pl-4 flex flex-col gap-1 whitespace-nowrap pointer-events-none"
        >
          <div className="font-mono text-[7px] text-cyan-400 font-bold uppercase tracking-widest bg-black/40 px-1">
             ALT: {coords.alt} KM
          </div>
          <div className="font-mono text-[7px] text-violet-400 font-bold uppercase tracking-widest bg-black/40 px-1">
             ANG: {coords.ang}°
          </div>
          <div className="font-mono text-[7px] text-white/20 uppercase tracking-tighter">
             TRG: {isHovering ? "LOCKED" : "SCANNING"}
          </div>
        </motion.div>
      </motion.div>

      {/* Target Box (When Hovering) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 120 : 0,
          height: isHovering ? 120 : 0,
          opacity: isHovering ? 0.2 : 0,
        }}
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
      </motion.div>
    </>
  );
}
