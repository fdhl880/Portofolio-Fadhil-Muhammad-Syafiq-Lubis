'use client';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import VideoBackground from '../ui/VideoBackground';
import { getAssetUrl } from '../../utils/assetLoader';
import { useAppMode } from '../../context/AppModeContext';

gsap.registerPlugin(ScrollTrigger);

const ASPIRATIONS = [
  {
    id: 'engineer',
    title: 'THE_ENGINEER',
    subtitle: 'Professional Excellence (Ir.)',
    narrative: 'Architecting the systems of tomorrow with precision, integrity, and relentless innovation.',
    videoSrc: getAssetUrl('VIDEOS', 'ENGINEER', 'https://cdn.pixabay.com/vimeo/328941243/circuit-23114.mp4'),
    gradient: 'radial-gradient(ellipse at 30% 40%, rgba(0,120,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(100,180,255,0.08) 0%, transparent 40%)',
    color: '#E5E7EB'
  },
  {
    id: 'professor',
    title: 'THE_POLYMATH',
    subtitle: 'Academic Mastery (Dr. M. Eng Ir. ASEAN Eng)',
    narrative: 'Pushing the boundaries of human knowledge through rigorous research and global mentorship.',
    videoSrc: getAssetUrl('VIDEOS', 'PROFESSOR', 'https://cdn.pixabay.com/vimeo/644686414/abstract-92331.mp4'),
    gradient: 'radial-gradient(ellipse at 25% 25%, rgba(100,50,200,0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 75%, rgba(0,100,255,0.08) 0%, transparent 45%)',
    color: '#FFFFFF'
  },
  {
    id: 'entrepreneur',
    title: 'THE_CAPTAIN',
    subtitle: 'Industrial Leadership',
    narrative: 'Building a successful ecosystem where innovation meets scale, sustainability, and global impact.',
    videoSrc: getAssetUrl('VIDEOS', 'CAPTAIN', 'https://cdn.pixabay.com/vimeo/459039233/yacht-50854.mp4'),
    gradient: 'radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.08) 0%, transparent 40%)',
    color: '#D4AF37'
  }
];

export default function CinematicAspiration() {
  const { mode } = useAppMode();
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (mode !== 'atelier') return;
    const segments = gsap.utils.toArray('.aspiration-segment');
    
    segments.forEach((segment, index) => {
      ScrollTrigger.create({
        trigger: segment,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });
  }, { scope: containerRef });

  if (mode !== 'atelier') return null;

  return (
    <section ref={containerRef} className="relative w-full bg-black" id="aspiration-core" data-section="CinematicAspiration">
      
      {/* Background Layer - High Performance Video Switcher */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={ASPIRATIONS[activeIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <VideoBackground 
              src={ASPIRATIONS[activeIndex].videoSrc}
              overlayOpacity={0.4}
              grayscale={activeIndex !== 2}
              brightness={0.7}
              contrast={1.2}
            />
            
            {/* Context-aware dynamic gradient overlay */}
            <div
              className="w-full h-full absolute inset-0 z-20 pointer-events-none opacity-60 transition-all duration-1000"
              style={{
                backgroundImage: ASPIRATIONS[activeIndex].gradient,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Segments - Scrolling Layer */}
      <div className="relative z-30">
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
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-white/20" />
                  <span 
                    className="text-[10px] md:text-[11px] tracking-[2em] uppercase font-sans"
                    style={{ color: aspiration.color, opacity: 0.5 }}
                  >
                    IDENT_NODE_{index + 1}
                  </span>
                  <div className="w-12 h-[1px] bg-white/20" />
                </div>
                
                <h2 
                  className="text-6xl md:text-9xl font-playfair leading-none tracking-tighter mb-8"
                  style={{ color: aspiration.color }}
                >
                  {aspiration.title}
                </h2>

                <h3 className="text-[10px] md:text-sm font-sans uppercase tracking-[0.5em] text-white/60 mb-8 border border-white/10 px-6 py-2 backdrop-blur-md">
                  {aspiration.subtitle}
                </h3>

                <p className="max-w-xl text-xs md:text-sm text-white/40 leading-relaxed uppercase tracking-widest font-sans italic px-4">
                  &quot;{aspiration.narrative}&quot;
                </p>
              </motion.div>

            </div>
          </div>
        ))}
      </div>

      {/* Final Signature */}
      <div className="h-[50vh] flex items-center justify-center bg-black relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
        <div className="text-center">
          <span className="text-[10px] text-white/20 uppercase tracking-[1rem] block mb-4">Convergence_Complete</span>
          <div className="h-12 w-[1px] bg-white/10 mx-auto" />
        </div>
      </div>

    </section>
  );
}
