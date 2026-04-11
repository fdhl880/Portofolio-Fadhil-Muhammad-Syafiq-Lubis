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
    video: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-watch-mechanism-42711-large.mp4', // Rolex macro vibe
    color: '#E5E7EB' // Silver
  },
  {
    id: 'professor',
    title: 'THE_POLYMATH',
    subtitle: 'Academic Mastery (Dr. M. Eng Ir. ASEAN Eng)',
    narrative: 'Pushing the boundaries of human knowledge through rigorous research and global mentorship.',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-medical-laboratory-researcher-analyzing-samples-44026-large.mp4', // Data/Research vibe
    color: '#FFFFFF' // Pure White
  },
  {
    id: 'entrepreneur',
    title: 'THE_CAPTAIN',
    subtitle: 'Industrial Leadership',
    narrative: 'Building a successful ecosystem where innovation meets scale, sustainability, and global impact.',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-aerial-view-4592-large.mp4', // City/Business vibe
    color: '#D4AF37' // Subtle Gold/Silver
  }
];

import { useAppMode } from '../../context/AppModeContext';

export default function CinematicAspiration() {
  const { mode } = useAppMode();
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Only show in 3D Mode
  if (mode !== 'atelier') return null;

  useGSAP(() => {
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

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      
      {/* Background Video Layer - Global & Fixed during the scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={ASPIRATIONS[activeIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Dark Overlay for Typography Legibility */}
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-80" />
            
            <video
              src={ASPIRATIONS[activeIndex].video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter grayscale contrast-125"
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
                  "{aspiration.narrative}"
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
