'use client';
import { motion } from 'framer-motion';

const archives = [
  {
    title: 'IYSA Distinction',
    award: 'Gold Achievement',
    year: '2025',
    detail: 'Recognized for pioneering scientific research on the international stage.'
  },
  {
    title: 'Thai Inventor Council',
    award: 'Silver Distinction',
    year: '2024',
    detail: 'Honored by the National Research Council of Thailand (NRCT).'
  },
  {
    title: 'Tech Expo Malaysia',
    award: 'Silver Distinction',
    year: '2025',
    detail: 'Excellence in industrial engineering and problem-solving methodologies.'
  }
];

export default function TrophyGallery() {
  return (
    <section id="archives" className="py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24 gap-6">
          <span className="text-white/20 text-[10px] tracking-[0.8em] uppercase font-sans">Archives</span>
          <h2 className="font-display text-5xl md:text-7xl">The Collection of <span className="italic opacity-40">Distinction.</span></h2>
          <div className="h-px w-24 bg-white/10" />
        </div>

        {/* Museum Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {archives.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.2 }}
              className="relative aspect-[3/4] bg-[#050505] border border-white/5 flex flex-col justify-between p-10 group overflow-hidden"
            >
              {/* Subtle Texture/Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-2">
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/20 font-sans">{item.year}</span>
                <h3 className="font-display text-2xl md:text-3xl leading-tight group-hover:tracking-wider transition-all duration-700">{item.title}</h3>
              </div>

              {/* Pedestal Shadow effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                 <div className="w-1/2 h-1/2 rounded-full bg-white blur-[100px]" />
              </div>

              <div className="relative z-10 flex flex-col gap-6">
                <p className="text-white/30 text-xs leading-relaxed max-w-[200px] group-hover:text-white/60 transition-colors">
                  {item.detail}
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="font-display italic text-white/50">{item.award}</span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                       <path d="M7 17l10-10M7 7h10v10"></path>
                     </svg>
                  </div>
                </div>
              </div>

              {/* Luxury Frame Glow */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Catalog Note */}
        <div className="mt-20 text-center">
           <p className="font-sans text-[10px] tracking-[0.6em] uppercase text-white/10 italic">
             Certified by the International Council of Innovators.
           </p>
        </div>
      </div>
    </section>
  );
}
