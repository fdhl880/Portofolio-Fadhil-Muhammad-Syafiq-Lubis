'use client';
import { motion } from 'framer-motion';

const details = [
  {
    title: 'The Golden Ratio',
    category: 'Design Philosophy',
    desc: 'Every element in our innovation process follows strict geometric harmony.'
  },
  {
    title: 'Precision Materials',
    category: 'Engineering Standard',
    desc: 'Using advanced CAD and structural modeling to ensure peak performance.'
  },
  {
    title: 'Digital Craft',
    category: 'Digital Atelier',
    desc: 'Where high-performance code meets the elegance of luxury aesthetics.'
  }
];

export default function DiscoverySection() {
  return (
    <section id="discovery" className="py-32 px-6 md:px-12 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left: Detail Grid */}
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-6">
              <span className="text-black/30 text-[10px] tracking-[0.8em] uppercase font-sans">The Standard</span>
              <h2 className="font-display text-5xl md:text-7xl">
                Mastery of <br />
                <span className="italic opacity-30">the Detail.</span>
              </h2>
            </div>
            
            <div className="space-y-12">
              {details.map((detail, idx) => (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  className="flex flex-col gap-3 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-xl opacity-20">/0{idx + 1}</span>
                    <h3 className="font-display text-2xl uppercase tracking-widest group-hover:tracking-[0.2em] transition-all duration-700">{detail.title}</h3>
                  </div>
                  <p className="text-black/50 text-sm max-w-sm leading-relaxed border-l border-black/5 pl-8 ml-4">
                    {detail.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Abstract Geometric Visual (Simulated via CSS/Minimalism) */}
          <div className="relative aspect-square flex items-center justify-center">
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
               className="w-full h-full border border-black/5 rounded-full flex items-center justify-center"
             >
                <div className="w-2/3 h-2/3 border border-black/10 rounded-full flex items-center justify-center">
                   <div className="w-1/2 h-1/2 border border-black/20 rounded-full" />
                </div>
             </motion.div>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl opacity-10 uppercase tracking-[1em] rotate-90">Precision</span>
             </div>
             
             {/* Floating Accent */}
             <motion.div
                animate={{ y: [-20, 20] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="absolute top-1/4 right-1/4 w-12 h-12 bg-black/5 blur-xl rounded-full"
             />
          </div>

        </div>
      </div>
    </section>
  );
}
