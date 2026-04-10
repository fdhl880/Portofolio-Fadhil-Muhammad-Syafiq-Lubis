'use client';
import { motion } from 'framer-motion';

const TECHNICAL_DATA = [
    { label: 'CALIBRE', value: 'INNOVATION_v2.5', detail: 'Advanced structural logic framework optimized for sustainable engineering solutions.' },
    { label: 'MASS', value: '400g PURE_DISTINCTION', detail: 'The weight of a 2025 I2ASPO Gold Standard achievement, processed globally.' },
    { label: 'COMPOSITION', value: '24K_METHODOLOGY', detail: 'Pure methodological rigor synthesized with high-fidelity technical execution.' },
    { label: 'RELEVANCE', value: 'GLOBAL_IMPACT', detail: 'High-tier strategic data analysis applied to national socioeconomic challenges.' }
];

export default function AtelierSpec() {
  return (
    <section className="relative py-48 bg-black border-t border-white/5 transform-gpu" id="specifications">
      <div className="container mx-auto px-6">
        {/* Header - Rolex Minimalist Style */}
        <div className="mb-24 flex flex-col items-center md:items-start">
            <span className="text-[10px] tracking-[1em] text-white/20 uppercase mb-4 block">Archive Intelligence</span>
            <h2 className="text-4xl md:text-8xl font-light text-white tracking-tighter leading-tight italic">
               TECHNICAL <br />SPECIFICATIONS<span className="text-white/20">.</span>
            </h2>
        </div>

        {/* Bento Spec Grid - Apple/Leica Inspired */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Hero Spec Card */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="md:col-span-8 bg-[#050505] border border-white/10 p-12 flex flex-col justify-between aspect-video md:aspect-auto h-[400px] group transition-colors hover:border-white/30"
            >
                <div className="flex justify-between items-start">
                   <div className="space-y-2">
                       <span className="text-[10px] tracking-[0.4em] text-white/20 uppercase">Subject Artifact</span>
                       <h3 className="text-3xl text-white font-light uppercase tracking-widest">2025 I2ASPO GOLD MEDAL</h3>
                   </div>
                   <div className="text-right">
                       <span className="text-4xl font-display text-white italic opacity-20">№ 001</span>
                   </div>
                </div>
                
                <div className="mt-12 opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="w-full h-px bg-gradient-to-r from-white/0 via-white/40 to-white/0 mb-12" />
                    <div className="flex justify-around items-center">
                        <div className="text-center">
                            <span className="text-xs text-white/20 block mb-2 uppercase tracking-widest">Purity</span>
                            <span className="text-xl text-white font-light">99.9% LOGIC</span>
                        </div>
                        <div className="w-px h-12 bg-white/5" />
                        <div className="text-center">
                            <span className="text-xs text-white/20 block mb-2 uppercase tracking-widest">Horizon</span>
                            <span className="text-xl text-white font-light">STRATEGIC</span>
                        </div>
                        <div className="w-px h-12 bg-white/5" />
                        <div className="text-center">
                            <span className="text-xs text-white/20 block mb-2 uppercase tracking-widest">Status</span>
                            <span className="text-xl text-white font-light">VERIFIED</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Side Callouts */}
            <div className="md:col-span-4 flex flex-col gap-6">
                {TECHNICAL_DATA.slice(0, 2).map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-1 bg-black border border-white/5 p-8 flex flex-col justify-center gap-4 hover:bg-white/[0.02] transition-colors"
                    >
                        <span className="text-[10px] tracking-widest text-white/20 uppercase">{item.label}</span>
                        <div className="space-y-4">
                            <p className="text-xl text-white font-light tracking-tighter italic">{item.value}</p>
                            <p className="text-[10px] text-white/40 leading-relaxed font-sans">{item.detail}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Row Specs */}
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TECHNICAL_DATA.slice(2).map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i + 2) * 0.1 }}
                        className="bg-black border border-white/5 p-8 flex flex-col gap-6 hover:border-white/20 transition-all group"
                    >
                         <div className="w-8 h-8 rounded-none border border-white/10 flex items-center justify-center text-[10px] text-white/20 group-hover:bg-white group-hover:text-black transition-all">
                            0{i + 3}
                         </div>
                         <div className="space-y-2">
                            <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase block">{item.label}</span>
                            <p className="text-lg text-white font-light tracking-tighter">{item.value}</p>
                         </div>
                    </motion.div>
                ))}
                
                {/* Brand Seal Placeholder */}
                <div className="border border-white/5 flex items-center justify-center p-8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]">
                    <div className="text-center font-display text-4xl text-white/5 select-none hover:text-white/10 transition-colors">
                        ATELIER <br /> <span className="text-xs tracking-[0.8em]">MMXXVI</span>
                    </div>
                </div>
            </div>

        </div>

        {/* Floating Detail - Rolex Style Overlay */}
        <div className="mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-12">
            <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase max-w-sm text-center md:text-left">
                All data visualized herein represents verified archaeological research and engineering milestones achieved by Fadhil Lubis.
            </p>
            <div className="flex items-center gap-12 text-white/10 font-bold italic tracking-tighter text-4xl select-none">
                <span>PRECISION</span>
                <span>/</span>
                <span>RIGOR</span>
            </div>
        </div>
      </div>
    </section>
  );
}
