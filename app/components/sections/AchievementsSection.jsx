'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const international = [
  { medal: 'Gold', event: 'I2ASPO 2025', loc: 'International', color: '#ffd700', icon: '🥇', size: 'md:col-span-2' },
  { medal: 'Silver', event: 'IPITEx 2024', loc: 'Thailand', color: '#c0c0c0', icon: '🥈', size: 'md:col-span-1' },
  { medal: 'Silver', event: 'MTE 2025', loc: 'Malaysia', color: '#c0c0c0', icon: '🥈', size: 'md:col-span-1' },
];

const national = [
  'Olimpiade Siswa Jenius (Gold)',
  'Olimpiade Prestasi Gemilang (Gold)',
  'OPSI Participant (Research)',
  'Best National Student Olympiad',
  'Olimpiade Siswa Pintar (Gold)',
  'Kompetisi Pelajar Berprestasi',
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-24 md:py-48 w-full max-w-7xl mx-auto px-6 md:px-12">
      
      <div className="mb-16 md:mb-24">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-violet-400 block mb-6">Credential_Registry</span>
            <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-white">
               AWARDS<span className="text-violet-500 text-3xl">.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-xs text-sm md:text-lg leading-relaxed font-medium">
            Recognitions for excellence in scientific research and academic competitions.
          </p>
        </motion.div>
      </div>

      {/* Bento Grid: Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* International Highlights */}
        {international.map((item, i) => (
          <motion.div
            key={item.event}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`${item.size} group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-10 flex flex-col justify-between hover:bg-white/[0.04] transition-all`}
          >
            <div className="relative z-10">
              <div className="text-4xl mb-6 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-left">
                {item.icon}
              </div>
              <span className="text-[10px] font-mono text-violet-400 uppercase tracking-[0.3em] font-bold mb-2 block">
                {item.medal} Medal
              </span>
              <h3 className="font-display text-xl md:text-3xl font-bold text-white/90 leading-tight">
                {item.event}
              </h3>
            </div>
            
            <div className="mt-8 flex items-center justify-between">
               <span className="text-xs text-white/30 font-medium tracking-wider">📍 {item.loc}</span>
               <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/40">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
               </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: item.color }} />
          </motion.div>
        ))}

        {/* National Achievements List Bento */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="md:col-span-2 md:row-span-1 glass rounded-3xl p-8 md:p-10 border border-white/5 flex flex-col justify-between"
        >
          <div>
            <h4 className="font-display text-lg font-bold text-white/80 mb-6 flex items-center gap-4">
               National Honor_Roll
               <div className="h-px flex-grow bg-white/10" />
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
               {national.map((item, i) => (
                 <div key={i} className="flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors" />
                    <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors">{item}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>

        {/* Regional Spotlight Bento */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="md:col-span-2 glass rounded-3xl p-8 md:p-10 border border-white/5 flex items-center gap-8 group"
        >
           <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
              🏆
           </div>
           <div>
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.4em] mb-2 block">Regional_Special_Award</span>
              <h4 className="text-white font-display text-xl font-bold mb-1">National Science Olympiad (OSN)</h4>
              <p className="text-white/40 text-sm font-medium">10th Place &bull; Highest Academic Distinction</p>
           </div>
        </motion.div>

        {/* DATA-VIZ METRIC: Innovation Score */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="md:col-span-2 overflow-hidden border border-white/10 bg-gradient-to-br from-violet-600/10 to-cyan-500/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between group"
        >
           <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-violet-400 uppercase tracking-[0.4em]">Global_Innovation_Index</span>
              <div className="flex gap-1">
                 {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-violet-400/30 rounded-full animate-pulse" style={{ animationDelay: `${i*150}ms` }} />)}
              </div>
           </div>

           <div className="my-6">
              <div className="flex items-baseline gap-2">
                 <motion.span 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   className="font-display text-6xl md:text-8xl font-bold text-white tracking-tighter"
                 >
                   99.2
                 </motion.span>
                 <span className="text-2xl font-display font-medium text-violet-400/60">%</span>
              </div>
              <p className="text-white/30 text-xs md:text-sm font-medium uppercase tracking-widest mt-2">Precision Intelligence Rating</p>
           </div>

           {/* Animated Sparkline */}
           <div className="h-16 w-full relative mt-4">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                 <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M0,10 Q10,5 20,10 T40,10 T60,5 T80,15 T100,2"
                    fill="none"
                    stroke="url(#sparkline-gradient)"
                    strokeWidth="1"
                 />
                 <defs>
                    <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="1" y2="0">
                       <stop offset="0%" stopColor="#8b5cf6" />
                       <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                 </defs>
              </svg>
           </div>
        </motion.div>

      </div>
    </section>
  );
}

export const timeline = [
  {
    year: '2024',
    title: 'International Science Competition',
    desc: 'Represented Indonesia at IPITEx 2024 in Thailand, winning a Silver Medal for innovative research.',
    color: '#00f0ff',
  },
  {
    year: '2025',
    title: 'Malaysia Technology Expo',
    desc: 'Showcased innovation at MTE 2025, earning a Silver Medal in international competition.',
    color: '#8b5cf6',
  },
  {
    year: '2025',
    title: ' Gold Medal',
    desc: 'Achieved Gold Medal at I2ASPO 2025, demonstrating excellence in scientific innovation.',
    color: '#ffd700',
  },
  {
    year: 'Ongoing',
    title: 'Continuous Growth',
    desc: 'Expanding into engineering, finance, and entrepreneurship while pursuing academic excellence.',
    color: '#ff6b9d',
  },
];
