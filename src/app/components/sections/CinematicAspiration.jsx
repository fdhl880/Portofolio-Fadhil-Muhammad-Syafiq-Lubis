'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ASPIRATIONS = [
  {
    id: 'engineer',
    title: 'THE_ENGINEER',
    subtitle: 'Professional Excellence (Ir.)',
    narrative: 'Architecting the systems of tomorrow with precision, integrity, and relentless innovation.',
    video: '/videos/precision.mp4',
    gradient: 'radial-gradient(ellipse at 30% 40%, rgba(0,120,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(100,180,255,0.08) 0%, transparent 40%)',
    color: '#E5E7EB' // Silver
  },
  {
    id: 'professor',
    title: 'THE_POLYMATH',
    subtitle: 'Academic Mastery (Dr. M. Eng Ir. ASEAN Eng)',
    narrative: 'Pushing the boundaries of human knowledge through rigorous research and global mentorship.',
    video: '/videos/data_flow.mp4',
    gradient: 'radial-gradient(ellipse at 25% 25%, rgba(100,50,200,0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 75%, rgba(0,100,255,0.08) 0%, transparent 45%)',
    color: '#FFFFFF' // Pure White
  },
  {
    id: 'entrepreneur',
    title: 'THE_CAPTAIN',
    subtitle: 'Industrial Leadership',
    narrative: 'Building a successful ecosystem where innovation meets scale, sustainability, and global impact.',
    video: '/videos/leadership.mp4',
    gradient: 'radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.08) 0%, transparent 40%)',
    color: '#D4AF37' // Subtle Gold
  }
];

import { useAppMode } from '../../context/AppModeContext';

export default function CinematicAspiration() {
  const { mode } = useAppMode();
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (mode !== 'atelier') return;
    const sections = gsap.utils.toArray('.aspiration-segment');
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });
  }, { scope: containerRef });

  // Only show in 3D Mode
  if (mode !== 'atelier') return null;

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      
      {/* Background Layer - Animated CSS Gradients */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={ASPIRATIONS[activeIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Native Video Layer for Aspiration */}
            <video
              src={ASPIRATIONS[activeIndex].video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover filter brightness-50 contrast-125 grayscale"
            />
            
            {/* Animated gradient background overlay */}
            <motion.div
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              className="w-full h-full relative z-10 mix-blend-overlay"
              style={{
                backgroundImage: ASPIRATIONS[activeIndex].gradient,
                backgroundSize: '200% 200%',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Segments - Scrolling Layer */}
      <div className="relative z-10">
        {ASPIRATIONS.map((aspiration, index) => (
          <div 
            key={aspiration.id} 
            className="aspiration-segment h-screen w-full flex items-center justify-center p-8 md:p-24"
          >
            <div className="max-w-4xl w-full flex flex-col items-center text-center">
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <span 
                  className="text-[10px] md:text-xs tracking-[1.5rem] md:tracking-[2.5rem] uppercase mb-8 ml-[1.5rem] md:ml-[2.5rem] font-sans"
                  style={{ color: aspiration.color, opacity: 0.5 }}
                >
                  Future_Identity
                </span>
                
                <h2 
                  className="text-5xl md:text-9xl font-playfair leading-none tracking-tighter mb-8"
                  style={{ color: aspiration.color }}
                >
                  {aspiration.title}
                </h2>

                <div className="h-[1px] w-24 bg-white/20 mb-8" />

                <h3 className="text-sm md:text-xl font-sans uppercase tracking-[0.3em] text-white/80 mb-6 px-4">
                  {aspiration.subtitle}
                </h3>

                <p className="max-w-xl text-xs md:text-sm text-white/40 leading-relaxed uppercase tracking-widest font-sans italic">
                  &quot;{aspiration.narrative}&quot;
                </p>
              </motion.div>

            </div>
          </div>
        ))}
      </div>

      {/* Final Call to Action or Signature */}
      <div className="h-[50vh] flex items-center justify-center bg-black relative z-10 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
         <div className="text-center">
            <span className="text-[10px] text-white/20 uppercase tracking-[1rem] block mb-4">Convergence_Complete</span>
            <div className="h-12 w-[1px] bg-white/10 mx-auto" />
         </div>
      </div>

    </section>
  );
}
