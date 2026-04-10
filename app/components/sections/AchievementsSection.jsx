'use client';
import { motion } from 'framer-motion';

const exhibitions = [
  {
    event: 'I2ASPO 2025',
    award: 'Gold Medal',
    location: 'International Stage',
    description: 'A global showcase of scientific excellence and innovative methodology.',
    type: 'Scientific Innovation'
  },
  {
    event: 'IPITEx 2024',
    award: 'Silver Medal',
    location: 'Bangkok, Thailand',
    description: 'International Intellectual Property, Invention, Innovation and Technology Exposition.',
    type: 'Global Exposition'
  },
  {
    event: 'MTE 2025',
    award: 'Silver Medal',
    location: 'Kuala Lumpur, Malaysia',
    description: 'Malaysia Technology Expo – Recognizing excellence in tech and research.',
    type: 'Industrial Research'
  }
];

export default function AchievementsSection() {
  return (
    <div className="flex flex-col gap-12">
      {exhibitions.map((ex, idx) => (
        <motion.div
           key={ex.event}
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: idx * 0.2 }}
           className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/5 pb-12 group"
        >
          {/* Year/Index */}
          <div className="md:col-span-1">
             <span className="font-display text-lg opacity-20 group-hover:opacity-100 transition-opacity">
               /0{idx + 1}
             </span>
          </div>

          {/* Award Title */}
          <div className="md:col-span-4 flex flex-col gap-2">
             <h3 className="font-display text-3xl md:text-4xl">{ex.event}</h3>
             <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-sans">{ex.type}</span>
          </div>

          {/* Description */}
          <div className="md:col-span-5">
             <p className="text-white/40 text-sm leading-relaxed max-w-sm">
               {ex.description}
             </p>
          </div>

          {/* Status/Location */}
          <div className="md:col-span-2 flex flex-col md:items-end gap-1">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
                <span className="text-white/80 font-display italic text-lg">{ex.award}</span>
             </div>
             <span className="text-[9px] tracking-widest uppercase text-white/20 font-sans">{ex.location}</span>
          </div>

          {/* Minimal Hover Line */}
          <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-1000" />
        </motion.div>
      ))}

      {/* Distinction Note */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-12 py-8 px-8 border border-white/5 bg-white/[0.01] rounded-[40px] flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <div className="flex flex-col gap-1">
           <span className="text-[10px] tracking-[0.5em] uppercase text-white/20">Distinction</span>
           <p className="text-white/60 font-sans text-xs italic">Acknowledged by international boards for excellence in precision research.</p>
        </div>
        <div className="flex -space-x-4">
           {[1,2,3,4].map(i => (
             <div key={i} className="w-10 h-10 rounded-full border border-black bg-white/5 flex items-center justify-center text-[10px] opacity-40 backdrop-blur-md">
               荣誉
             </div>
           ))}
        </div>
      </motion.div>
    </div>
  );
}
