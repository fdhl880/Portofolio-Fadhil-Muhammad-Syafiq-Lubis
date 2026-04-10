'use client';
import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useAppMode } from '../../context/AppModeContext';

export default function AtelierLens() {
  const { mode } = useAppMode();
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const lensX = useSpring(mouseX, springConfig);
  const lensY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (mode !== 'atelier') return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if we are hovering over interactive elements
      const target = e.target;
      const isInteractive = target.closest('a, button, .interactive-card, [id="specifications"]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mode, mouseX, mouseY]);

  if (mode !== 'atelier') return null;

  return (
    <motion.div 
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      style={{ 
        x: lensX, 
        y: lensY,
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      {/* Outer Circle */}
      <motion.div 
        animate={{ 
          scale: isHovering ? 4 : 1,
          opacity: isHovering ? 0.3 : 1
        }}
        className="absolute inset-0 border border-white rounded-full flex items-center justify-center"
      >
        {/* Inner Technical Dot */}
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>

      {/* Crosshair Elements - reveal on hover */}
      {isHovering && (
        <>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[1px] bg-white" 
            />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-12 bg-white" 
            />
            <div className="absolute -top-12 -left-12 text-[8px] text-white/40 tracking-widest uppercase font-mono">
               SYS_SCANNING_...
            </div>
            <div className="absolute top-14 -left-4 text-[6px] text-[#D4AF37] tracking-widest uppercase font-mono whitespace-nowrap">
               PRECISION_MODE: ACTIVE
            </div>
        </>
      )}
    </motion.div>
  );
}
