'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const STAGES = [
  {
    year: '2011',
    title: 'INITIALIZATION_SEQUENCE',
    description: 'The foundation of the creative logic. Early childhood prototypes and the first sparks of technical curiosity.',
    image: '/images/photo1.jpg' // User will replace this
  },
  {
    year: '2018',
    title: 'COGNITIVE_EXPANSION',
    description: 'Transitioning into advanced engineering and robotics. The development of systematic precision.',
    image: '/images/photo2.jpg' // User will replace this
  },
  {
    year: '2026',
    title: 'THE_ATELIER_PHASE',
    description: 'The current state of global innovation. Absolute mastery of the intersection between art and AI.',
    image: '/images/photo3.jpg' // User will replace this
  }
];

export default function AtelierEvolution() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black selection:bg-[#D4AF37] selection:text-black">
      
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
               <span className="text-white/50 text-[10px] tracking-[1.2em] uppercase font-sans">Project Evolution // Biological Time</span>
               <h2 className="text-5xl md:text-8xl font-display uppercase tracking-widest text-[#D4AF37]">The <span className="italic text-white underline">Sequence</span></h2>
            </div>

            <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
               {STAGES.map((stage, i) => {
                 // Calculate specialized scroll range for each stage image
                 const start = i * 0.33;
                 const mid = (i * 0.33) + 0.16;
                 const end = (i + 1) * 0.33;
                 
                 // Opacity and Scalling transforms
                 // eslint-disable-next-line react-hooks/rules-of-hooks
                 const opacity = useTransform(scrollYProgress, [start, mid, end], [0, 1, 0]);
                 // eslint-disable-next-line react-hooks/rules-of-hooks
                 const scale = useTransform(scrollYProgress, [start, mid, end], [0.8, 1, 1.2]);
                 // eslint-disable-next-line react-hooks/rules-of-hooks
                 const x = useTransform(scrollYProgress, [start, end], [50, -50]);

                 return (
                   <motion.div 
                     key={stage.year}
                     style={{ opacity, scale, x }}
                     className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-12"
                   >
                     {/* The Sketch Filtered Image */}
                     <div className="relative w-64 h-80 md:w-80 md:h-96 border border-white/10 p-2 bg-black group overflow-hidden">
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        
                        {/* THE SKETCH LAYER (CSS Filter Magic) */}
                        <div className="w-full h-full relative overflow-hidden grayscale contrast-[250%] brightness-[40%] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-1000">
                           <Image 
                              src={stage.image} 
                              alt={`Year ${stage.year}`}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                // Fallback if user hasn't uploaded images yet
                                e.target.style.display = 'none';
                              }}
                           />
                           {/* Fallback Placeholder (Stylized Silhouette) */}
                           <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center border-2 border-dashed border-white/5 text-white/5 text-[10px] uppercase text-center p-8">
                              [UPLOAD_SNAPSHOT_REQUIRED_{stage.year}]
                           </div>
                        </div>

                        {/* Metadata Tag */}
                        <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-1">
                           <span className="text-[10px] font-mono text-[#D4AF37] tracking-[0.5em]">{stage.year}</span>
                           <span className="text-[8px] font-mono text-white/40 tracking-widest">{stage.title}</span>
                        </div>
                     </div>

                     {/* Text Description */}
                     <div className="max-w-xs text-center md:text-left space-y-4">
                        <h3 className="text-xl md:text-3xl font-display italic text-white/80">{stage.title}</h3>
                        <p className="text-[10px] md:text-xs text-white/40 leading-relaxed uppercase tracking-widest">
                           {stage.description}
                        </p>
                        <div className="h-px w-12 bg-[#D4AF37] opacity-40 mx-auto md:mx-0 pt-4" />
                     </div>
                   </motion.div>
                 );
               })}
            </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
           <span className="text-[8px] tracking-[0.5em] uppercase">Scroll to Evolve</span>
           <div className="w-[1px] h-12 bg-white" />
        </div>
      </div>

    </section>
  );
}
