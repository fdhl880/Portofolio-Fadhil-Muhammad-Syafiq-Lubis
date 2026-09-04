'use client';
import { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import DepthMapImage from '../three/DepthMapImage';
import Image from 'next/image';

export default function HeroSection({ isDark }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: giant text moves left on scroll
  const textX = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  // Image moves up slightly
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  // Fade out on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // 3D Tilt Effect State (Frame tilt)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { damping: 30, stiffness: 200 });
  
  // Dynamic glare effect based on mouse position
  const glareX = useTransform(mouseX, [0, 1], [-100, 100]);
  const glareY = useTransform(mouseY, [0, 1], [-100, 100]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      {/* Giant Scrolling Outline Text */}
      <motion.div
        style={{ x: textX, opacity }}
        className="absolute inset-0 flex items-center pointer-events-none select-none whitespace-nowrap"
      >
        <h1
          className={`text-[20vw] md:text-[16vw] font-black uppercase leading-none tracking-tighter ${
            isDark ? 'hero-outline-dark' : 'hero-outline-light'
          }`}
          style={{
            WebkitTextStroke: isDark ? '2px rgba(255,255,255,0.08)' : '2px rgba(0,0,0,0.06)',
            color: 'transparent',
          }}
        >
          FADHIL MUHAMMAD SYAFIQ LUBIS&nbsp;&nbsp;FADHIL MUHAMMAD SYAFIQ LUBIS
        </h1>
      </motion.div>

      {/* Center Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl"
      >
        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {['Innovator', 'Researcher', 'Developer'].map((tag) => (
            <span
              key={tag}
              className={`px-4 py-1.5 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase border ${
                isDark
                  ? 'border-white/10 text-white/50 bg-white/5'
                  : 'border-black/10 text-black/50 bg-black/5'
              }`}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* 3D Portrait Cutout with enhanced effect */}
        <div 
          className="perspective-[1200px] cursor-pointer mb-12"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              y: imageY,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d" 
            }}
            className={`relative w-[280px] h-[360px] md:w-[340px] md:h-[460px] rounded-[2rem] border ${
              isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white shadow-2xl'
            }`}
          >
            {/* Inner frame for the photo (WebGL Canvas) */}
            <motion.div 
              style={{ transform: "translateZ(80px)" }}
              className="absolute inset-4 rounded-[1.5rem] overflow-hidden bg-black"
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <Suspense fallback={null}>
                  <DepthMapImage 
                    imagePath="/images/formal-red.jpg" 
                    depthMapPath="/images/formal-red.jpg" /* Replace with actual depth map later */
                    intensity={0.15} 
                  />
                </Suspense>
              </Canvas>
              
              {/* Dynamic glare effect */}
              <motion.div
                className="absolute inset-0 z-20 opacity-40 mix-blend-overlay pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)',
                  x: glareX,
                  y: glareY,
                }}
              />
            </motion.div>
            
            {/* Foreground elements */}
            <div style={{ transform: "translateZ(120px)" }} className="absolute bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none">
              <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${isDark ? 'text-white' : 'text-white'}`}>
                FADHIL<br/>LUBIS
              </span>
              <span className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border ${isDark ? 'border-white/20 text-white bg-black/50 backdrop-blur-md' : 'border-black/20 text-black bg-white/50 backdrop-blur-md'}`}>
                2026
              </span>
            </div>
          </motion.div>
        </div>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className={`text-4xl md:text-6xl lg:text-[5vw] font-black uppercase tracking-tighter leading-none mb-6 ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          Fadhil Muhammad
          <br />
          Syafiq Lubis
        </motion.h2>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
      >
        <span
          className={`text-[9px] tracking-[0.4em] uppercase ${
            isDark ? 'text-white/20' : 'text-black/20'
          }`}
        >
          Scroll
        </span>
        <div
          className={`w-px h-10 relative overflow-hidden ${
            isDark ? 'bg-white/10' : 'bg-black/10'
          }`}
        >
          <motion.div
            className={`w-full h-4 ${isDark ? 'bg-white/40' : 'bg-black/40'}`}
            animate={{ y: ['-100%', '250%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
