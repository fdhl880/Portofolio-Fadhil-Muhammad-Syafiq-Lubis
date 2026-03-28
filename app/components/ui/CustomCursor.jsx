'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { usePerformance } from '../../context/PerformanceContext';

function DroneModel({ isHovering }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime();
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={isHovering ? 4 : 2}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]}>
        <MeshDistortMaterial
          color={isHovering ? "#ffd700" : "#00f0ff"}
          emissive={isHovering ? "#ffd700" : "#00f0ff"}
          emissiveIntensity={isHovering ? 0.8 : 0.4}
          roughness={0.2}
          metalness={0.8}
          distort={isHovering ? 0.6 : 0.2}
          speed={isHovering ? 8 : 2}
        />
      </Sphere>
    </Float>
  );
}

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

  const { isCinematic } = usePerformance();

  if (!isVisible) return null;

  return (
    <>
      {/* 3D Sentinel Drone Container */}
      {isCinematic ? (
        <motion.div
           className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[10000]"
           animate={{
             x: mousePosition.x - 32,
             y: mousePosition.y - 32,
             scale: isHovering ? 1.5 : 1
           }}
           transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }}
        >
          <Canvas style={{ pointerEvents: 'none' }} camera={{ position: [0, 0, 2] }} gl={{ alpha: true }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[2, 2, 2]} intensity={2} color="#ffffff" />
            <DroneModel isHovering={isHovering} />
          </Canvas>
          {/* Laser targeting beam overlay when hovering */}
          {isHovering && (
             <motion.div 
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 100, opacity: 0.4 }}
               className="absolute top-1/2 left-1/2 -mt-1 -ml-[1px] w-[2px] bg-yellow-400 blur-[1px] shadow-[0_0_10px_#ffd700] origin-top"
               style={{ transform: 'rotate(25deg)' }}
             />
          )}
        </motion.div>
      ) : (
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
      )}
      
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
