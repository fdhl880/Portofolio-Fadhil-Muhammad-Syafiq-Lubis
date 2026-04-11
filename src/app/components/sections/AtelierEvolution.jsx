'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const STAGES = [
  {
    year: '2023',
    title: 'THE_DRAFT_PHASE',
    description: 'The foundation of the creative logic. Early childhood prototypes and the first sparks of technical curiosity.',
    image: '/images/photo1.jpg'
  },
  {
    year: '2024',
    title: 'COGNITIVE_EXPANSION',
    description: 'Transitioning into advanced engineering and robotics. The development of systematic precision.',
    image: '/images/photo2.jpg'
  },
  {
    year: '2025',
    title: 'THE_ATELIER_ERA',
    description: 'The current state of global innovation. Absolute mastery of the intersection between art and AI.',
    image: '/images/photo3.jpg'
  }
];

export default function AtelierEvolution() {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Handle Pencil Sound Sync
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (audioRef.current && isAudioLoaded) {
        // Only play if moving and in range
        if (latest > 0.05 && latest < 0.95) {
          audioRef.current.playbackRate = 1.2;
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isAudioLoaded]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black selection:bg-[#D4AF37] selection:text-black">
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="https://www.soundjay.com/misc/sounds/pencil-writing-1.mp3" 
        loop 
        onCanPlayThrough={() => setIsAudioLoaded(true)}
      />

      {/* SVG Artistic Filter Definitions */}
      <svg className="hidden">
        <filter id="charcoal-sketch">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          <feConvolveMatrix kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" />
          <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0 
                                              0.33 0.33 0.33 0 0 
                                              0.33 0.33 0.33 0 0 
                                              0 0 0 1 0" />
        </filter>
      </svg>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Grid Metadata */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
           <div className="w-full h-full border-[0.5px] border-white/20 grid grid-cols-6 grid-rows-6">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/10" />
              ))}
           </div>
        </div>

        {/* Content Layer */}
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center gap-12">
            
            <div className="flex flex-col items-center text-center gap-4">
               <span className="text-white/60 text-[10px] tracking-[1.2em] uppercase font-sans">Project Evolution // Biological Time</span>
               <h2 className="text-5xl md:text-8xl font-display uppercase tracking-widest text-[#D4AF37]">The <span className="italic text-white underline">Sequence</span></h2>
            </div>

            <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center">
               {STAGES.map((stage, i) => {
                 const step = 1 / STAGES.length;
                 const start = i * step;
                 const mid = (i * step) + (step / 2);
                 const end = (i + 1) * step;
                 
                 // eslint-disable-next-line react-hooks/rules-of-hooks
                 const opacity = useTransform(scrollYProgress, [start, mid, end], [0, 1, 0]);
                 // eslint-disable-next-line react-hooks/rules-of-hooks
                 const scale = useTransform(scrollYProgress, [start, mid, end], [0.9, 1, 1.1]);
                 // eslint-disable-next-line react-hooks/rules-of-hooks
                 const maskProgress = useTransform(scrollYProgress, [start, mid], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

                 return (
                   <motion.div 
                     key={stage.year}
                     style={{ opacity, scale }}
                     className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-16"
                   >
                     {/* The Sketch Filtered Image with Radial Background Removal */}
                     <div className="relative w-72 h-96 md:w-[400px] md:h-[500px] group overflow-hidden">
                        
                        {/* Animated Drafting Mask - Simulated Drawing Reveal */}
                        <motion.div 
                          style={{ clipPath: maskProgress }}
                          className="w-full h-full relative"
                        >
                           {/* THE ARTY FILTER LAYER */}
                           <div className="w-full h-full relative grayscale contrast-[180%] brightness-[85%] transition-all duration-1000"
                                style={{ 
                                  filter: 'url(#charcoal-sketch)',
                                  maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
                                  WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
                                }}>
                              <Image 
                                 src={stage.image} 
                                 alt={`Year ${stage.year}`}
                                 fill
                                 className="object-cover"
                              />
                           </div>
                        </motion.div>

                        {/* Hand-Drawn Outlines Reveal (Decorative) */}
                        <div className="absolute inset-0 border border-white/5 opacity-40 pointer-events-none" />
                        
                        {/* Metadata Tag */}
                        <div className="absolute bottom-12 left-0 z-20 flex flex-col items-start gap-1">
                           <span className="text-[12px] font-mono text-[#D4AF37] tracking-[0.8em] bg-black px-2">{stage.year}</span>
                           <span className="text-[10px] font-mono text-white/60 tracking-widest bg-black px-2">{stage.title}</span>
                        </div>
                     </div>

                     {/* Text Description */}
                     <div className="max-w-md text-center md:text-left space-y-8">
                        <div className="space-y-4">
                           <motion.h3 
                            className="text-3xl md:text-5xl font-display italic text-white/90 leading-tight"
                           >
                             {stage.title.split('_').join(' ')}
                           </motion.h3>
                           <p className="text-xs md:text-sm text-white/60 leading-relaxed uppercase tracking-[0.2em] font-light">
                              {stage.description}
                           </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                           <div className="h-[1px] w-24 bg-[#D4AF37]" />
                           <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest">Archival Status: Optimized</span>
                        </div>
                     </div>
                   </motion.div>
                 );
               })}
            </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
           <span className="text-[8px] tracking-[0.5em] uppercase text-[#D4AF37]">Drafting in progress</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </div>
      </div>

    </section>
  );
}
