'use client';
import { motion } from 'framer-motion';
import AtelierSigil from '../ui/AtelierSigil';

export default function AtelierPhilosophy() {
  const principles = [
    {
      label: "LUXURY",
      value: "Exclusive Aesthetic",
      desc: "Minimalism is the ultimate sophistication. Every pixel is curated to reflect a premium, museum-grade environment where achievement meets high-fashion design."
    },
    {
      label: "BOLD",
      value: "Decisive Execution",
      desc: "Firmness in logic and sharp clarity in vision. The architectural precision of our methodologies ensures that every solution is bold, decisive, and absolute."
    },
    {
      label: "RICH",
      value: "Substantial Depth",
      desc: "Beyond the surface lies a wealth of international impact. We cultivate deep value through persistent innovation and a complex architecture of global achievements."
    }
  ];

  return (
    <section className="relative py-48 bg-black overflow-hidden" id="philosophy">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <AtelierSigil className="w-24 h-24 text-white" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[1em] text-white/40 uppercase mb-8"
          >
            Brand Ethos
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-7xl font-light text-white italic tracking-tighter max-w-4xl"
          >
            The intersection of <span className="text-white/20">Legacy</span> and <span className="text-white/20">Future Architecture.</span>
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          {principles.map((p, i) => (
            <motion.div 
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="mb-8 flex items-baseline gap-4">
                <span className="text-6xl md:text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-700 select-none uppercase">
                   {p.label}
                </span>
              </div>
              <h3 className="text-xl text-white tracking-[0.2em] uppercase mb-4 font-light">
                 {p.value}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed font-light font-sans max-w-xs">
                 {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* The Meaning of the Sigil */}
        <div className="mt-48 pt-32 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
                <div>
                   <h4 className="text-[10px] tracking-[0.4em] text-white/20 uppercase mb-6">Structural Meaning // The Sigil</h4>
                   <p className="text-2xl text-white font-serif italic opacity-80 leading-snug">
                     &quot;A monogram is a signature of precision. It is the consolidation of identity into absolute geometry.&quot;
                   </p>
                </div>
                
                <div className="space-y-8">
                    <div className="flex gap-6 items-start">
                        <span className="text-white/10 font-mono text-xs mt-1">01</span>
                        <div>
                            <p className="text-white uppercase tracking-widest text-xs mb-2">VERTICAL INTEGRITY</p>
                            <p className="text-white/40 text-[11px] leading-relaxed max-w-sm uppercase tracking-wider">The central axis represents unchanging foundation and steady growth toward international excellence.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start">
                        <span className="text-white/10 font-mono text-xs mt-1">02</span>
                        <div>
                            <p className="text-white uppercase tracking-widest text-xs mb-2">FACT-BASED INNOVATION</p>
                            <p className="text-white/40 text-[11px] leading-relaxed max-w-sm uppercase tracking-wider">The upper intersections (F) symbolize the precision of data and scientific methodologies in every achievement.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start">
                        <span className="text-white/10 font-mono text-xs mt-1">03</span>
                        <div>
                            <p className="text-white uppercase tracking-widest text-xs mb-2">LOGICAL LEGACY</p>
                            <p className="text-white/40 text-[11px] leading-relaxed max-w-sm uppercase tracking-wider">The base structure (L) honors the logic inherited from the Lubis heritage, anchoring the vision to history.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative aspect-square bg-[#050505] border border-white/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <AtelierSigil 
                  className="w-64 h-64 text-white/50" 
                  animateTrigger="whileInView"
                />
                <motion.div 
                  className="absolute inset-24 border border-white/5 rounded-full"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
            </div>
        </div>
      </div>
      {/* Symbolism of the Sigil */}
      <div className="mt-32 max-w-4xl mx-auto border-t border-white/5 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase">The Vertical Axis</span>
              <p className="text-sm text-white/60 font-sans leading-relaxed">
                Represents the unyielding foundation of **Legacy**. A direct lineage of discipline and standard that remains steadfast across time.
              </p>
           </div>
           <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase">Crossed Innovation</span>
              <p className="text-sm text-white/60 font-sans leading-relaxed">
                The horizontal 'F' and 'L' arms represent **Expansion**. The intersection of traditional heritage with cutting-edge future tech.
              </p>
           </div>
           <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase">Geometric Points</span>
              <p className="text-sm text-white/60 font-sans leading-relaxed">
                The accent squares denote **Precision**. Every calculation, every pixel, and every sound is orchestrated with absolute intent.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}
