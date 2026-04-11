'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const SectionMedia = dynamic(() => import('../ui/SectionMedia'), { ssr: false });

export default function HeritageSection() {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center py-32" id="heritage">
      {/* Cinematic Background (Atelier Mode Only) - Nature/Origin Aesthetic */}
      <SectionMedia theme="origin" opacity={0.15} />

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#050505] -z-10" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Visual Column */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="aspect-[3/4] bg-[#111] border border-white/5 relative group overflow-hidden"
          >
            {/* Placeholder for SMP Harapan 1 image / Heritage visual */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/[0.02]" />
            <div className="absolute inset-x-8 bottom-8">
                 <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-2">Foundation</p>
                 <h4 className="text-xl font-light text-white italic tracking-tighter">SMP Harapan 1</h4>
            </div>
            
            {/* Subtle Texture/Grain Overlay */}
            {/* Subtle Texture/Grain Overlay - Using CSS only to prevent external broken links */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-white/5 blend-overlay" />
          </motion.div>
          
          {/* Floating Detail */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -bottom-12 -left-12 p-8 bg-black border border-white/5 hidden lg:block"
          >
             <span className="text-4xl font-light text-white/10 italic block mb-2">01.</span>
             <p className="text-[10px] tracking-widest text-white/50 uppercase leading-relaxed">
                Roots in Northern <br />Sumatra, Excellence <br />without Borders.
             </p>
          </motion.div>
        </div>

        {/* Narrative Column */}
        <div className="lg:col-span-6 lg:col-start-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] tracking-[1em] text-white/40 uppercase mb-8 block">Origin & Legacy</span>
            <h2 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-[0.9] mb-12">
               A HERITAGE <br />
               OF INTELLECT<span className="text-white/20">.</span>
            </h2>
            
            <div className="flex flex-col gap-8 text-white/60 font-light leading-relaxed max-w-xl">
               <p className="text-lg text-white">
                  The journey began at SMP Harapan 1, a crucible of academic excellence where the fundamentals of 
                  rigor were first established.
               </p>
               <p>
                  It wasn&apos;t just about the competition; it was about the culture of precision. This heritage 
                  forms the foundation of every technical blueprint and every national achievement recorded today.
               </p>
            </div>

            <motion.div 
              className="mt-16 flex items-center gap-6 group cursor-pointer"
              whileHover={{ x: 10 }}
            >
                <div className="w-12 h-[1px] bg-white/40 group-hover:bg-cyan-400 group-hover:w-20 transition-all" />
                <span className="text-[10px] tracking-[0.5em] text-white/40 group-hover:text-white uppercase transition-colors">
                  View Evolution Path
                </span>
            </motion.div>
          </motion.div>
        </div>

      </div>
      
      {/* Decorative Text */}
      <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden xl:block pointer-events-none">
          <span className="text-[120px] 2xl:text-[150px] font-bold text-white/[0.02] whitespace-nowrap leading-none select-none italic">
             NORTHERN ROOTS
          </span>
      </div>
    </section>
  );
}
