'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('../three/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#020208]" />,
});

function LiquidImage({ src }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useMemo(() => new THREE.TextureLoader().load(src), [src]);

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.distort = THREE.MathUtils.lerp(meshRef.current.distort, hovered ? 0.4 : 0.2, 0.1);
        meshRef.current.speed = THREE.MathUtils.lerp(meshRef.current.speed, hovered ? 5 : 2, 0.1);
    }
  });

  return (
    <mesh 
       onPointerOver={() => setHovered(true)} 
       onPointerOut={() => setHovered(false)}
       scale={[4.5, 6, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshDistortMaterial
        ref={meshRef}
        map={texture}
        distort={0.2}
        speed={2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Since R3F need to be client-side and optimized, I'll use a simpler Framer Motion approach for the Liquid Ripple to ensure max performance without WebGL overhead if possible.
// Actually, let's use a pure CSS/Framer approach for the "Editorial Photo" to keep it crisp.

export default function HeroSection({ isMobile }) {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleWarp = (targetId) => {
    window.dispatchEvent(new Event('WARP_JUMP'));
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020208] pt-20"
    >
      <HeroScene />
      
      {/* Editorial Content Layer */}
      <div className="relative z-10 w-full max-w-[1440px] px-6 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center h-full">
        
        {/* Left Column: Bold Typography & Intro */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="overflow-hidden mb-4"
           >
              <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.8em] text-cyan-400">
                Official_Portfolio_2025 // Global_Innovator
              </span>
           </motion.div>

           <div className="relative mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-6xl md:text-[10rem] lg:text-[12rem] font-bold leading-[0.85] tracking-tighter text-white select-none whitespace-pre"
              >
                FADHIL<br />MS<br /><span className="text-transparent border-t border-white/10" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>LBS</span>
              </motion.h1>
              
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
                className="absolute -bottom-8 left-0 w-32 h-[2px] bg-cyan-400 origin-left"
              />
           </div>

           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1 }}
             className="text-white/40 max-w-md text-sm md:text-xl md:mt-12 font-medium leading-relaxed"
           >
             Bridging the gap between 
             <span className="text-white/90"> Advanced Engineering</span>, 
             <span className="text-white/90"> Strategic Finance</span>, and 
             <span className="text-white/90"> High-Impact Entrepreneurship</span>.
           </motion.p>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1.2 }}
             className="flex gap-6 mt-12"
           >
              <button 
                onClick={() => handleWarp('projects')}
                className="group relative px-8 py-4 bg-white text-black font-display font-bold text-xs uppercase tracking-widest overflow-hidden transition-all hover:pr-12"
              >
                <span className="relative z-10">View Archive</span>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                   →
                </div>
              </button>
              <button 
                onClick={() => handleWarp('contact')}
                className="px-8 py-4 border border-white/10 text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Collaborate
              </button>
           </motion.div>
        </div>

        {/* Right Column: Hero Photo (Editorial Style) */}
        <div className="md:col-span-5 relative flex justify-center md:justify-end">
           <motion.div
              style={{ y: y1, opacity }}
              className="relative w-[300px] h-[400px] md:w-[450px] md:h-[600px] group"
           >
              {/* Photo Frame */}
              <div className="absolute inset-0 border border-white/10 z-0 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-700" />
              
              <div className="relative z-10 w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                 <Image 
                   src="/images/photo1.jpg" 
                   alt="Fadhil MS Lbs" 
                   fill 
                   priority 
                   className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                 />
                 
                 {/* Liquid Ripple Overlay (Simulated via SVG Filter) */}
                 <svg className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <filter id="liquid">
                       <feTurbulence baseFrequency="0.015" numOctaves="3" seed="2" />
                       <feDisplacementMap in="SourceGraphic" scale="20" />
                    </filter>
                 </svg>
              </div>

              {/* Tag Label */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-cyan-500 text-black font-mono text-[9px] font-bold px-4 py-2 tracking-widest uppercase">
                 REF: NEXUS_IDENTITY_2025
              </div>
           </motion.div>
        </div>

      </div>

      {/* Decorative HUD Elements (Minimal) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 right-12 hidden md:block text-right"
      >
        <div className="font-mono text-[9px] text-white/20 whitespace-pre">
           LAT: 3.5952° N<br />
           LNG: 98.6722° E<br />
           LOC: MEDAN_ID
        </div>
      </motion.div>

    </section>
  );
}
