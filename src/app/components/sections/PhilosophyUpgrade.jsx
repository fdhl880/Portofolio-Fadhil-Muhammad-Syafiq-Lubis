'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PhilosophyUpgrade() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-black py-32 transform-gpu" id="philosophy">
      <div className="container mx-auto px-6 h-full">
        <div className="flex flex-col lg:flex-row h-full">
          
          {/* Left: Dynamic Text Column */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-24 order-2 lg:order-1">
            <motion.div style={{ y: textY }} className="max-w-lg">
              <span className="text-[10px] tracking-[1em] text-cyan-400/60 uppercase mb-8 block font-bold">Principles</span>
              <h2 className="text-6xl md:text-9xl font-light text-white tracking-tighter leading-none mb-16">
                 DEEP <br />
                 LOGIC<span className="text-white/20 italic font-serif">.</span>
              </h2>
              
              <div className="space-y-12">
                 <div className="space-y-4">
                    <h3 className="text-white text-xl font-light">The Synthesis of Precision</h3>
                    <p className="text-white/50 font-light leading-relaxed">
                       Complexity should never be an excuse for chaos. My philosophy rests on deconstructing enormous 
                       technical challenges into elegant, manageable systems. 
                    </p>
                 </div>
                 
                 <div className="space-y-4">
                    <h3 className="text-white text-xl font-light">Aesthetic Rigor</h3>
                    <p className="text-white/50 font-light leading-relaxed">
                       True engineering is beautiful. When logic is perfectly implemented, the resulting architecture 
                       possesses a natural, sophisticated aesthetic.
                    </p>
                 </div>

                 <div className="pt-8 border-t border-white/10 flex items-center gap-12">
                     <div className="text-center">
                        <span className="text-2xl text-white font-light block tracking-widest">0.01</span>
                        <span className="text-[8px] text-white/30 uppercase tracking-widest">Error Margin</span>
                     </div>
                     <div className="text-center">
                        <span className="text-2xl text-white font-light block tracking-widest">100%</span>
                        <span className="text-[8px] text-white/30 uppercase tracking-widest">Calculated Intent</span>
                     </div>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Asymmetrical visual depth */}
          <div className="w-full lg:w-1/2 relative h-[600px] lg:h-auto order-1 lg:order-2">
             <motion.div 
               style={{ y: imageY }}
               className="absolute top-0 right-0 w-[80%] lg:w-[120%] aspect-[3/4] bg-[#0A0A0A] border border-white/5 overflow-hidden"
             >
                {/* Internal Decorative Layers */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                <div className="absolute top-12 left-12">
                   <span className="text-8xl font-black text-white/[0.02] tracking-tighter italic">ATELIER</span>
                </div>
                
                {/* Minimalist Grid Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                
                <div className="absolute bottom-12 right-12 text-right">
                   <p className="text-[10px] tracking-widest text-[#D4AF37] mb-2 font-bold uppercase">System Status</p>
                   <p className="text-white text-lg font-light tracking-tighter italic">REDEFINING BASELINES</p>
                </div>
             </motion.div>
             
             {/* Secondary accent layer */}
             <motion.div
               animate={{ 
                 y: [0, -20, 0],
                 rotate: [0, -1, 0]
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/4 -left-12 w-48 h-64 bg-black border border-white/10 p-6 flex flex-col justify-end hidden lg:flex"
             >
                <div className="w-full h-[1px] bg-white/40 mb-4" />
                <p className="text-[8px] tracking-widest text-white/30 uppercase">Geometric Architecture</p>
             </motion.div>
          </div>

        </div>
      </div>
      
      {/* Scroll indicator for the section */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 py-8 pointer-events-none">
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-[10px] tracking-tighter text-white/20 uppercase vertical-text">SCROLL DEPTH</span>
      </div>
    </section>
  );
}
