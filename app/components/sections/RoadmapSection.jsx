'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useSound } from '../../context/SoundContext';
import GlitchText from '../ui/GlitchText';

const roadmapData = [
  {
    year: '2024',
    title: 'THE_SPARK',
    event: 'IPITEx Thailand (International Competition)',
    desc: 'First entry into the global scientific community. Won Silver Medal for research on sustainable tech.',
    color: '#c0c0c0',
    side: 'left'
  },
  {
    year: '2025',
    title: 'MALAYSIA_EXPANSION',
    event: 'MTEX Malaysia',
    desc: 'Expanded engineering research focus. Secured Silver Medal in international technology exhibition.',
    color: '#8b5cf6',
    side: 'right'
  },
  {
    year: '2025',
    title: 'GOLD_ACHIEVEMENT',
    event: 'I2ASPO (International Applied Science)',
    desc: 'Reached the peak of student innovation with a Gold Medal. Recognized for scientific excellence.',
    color: '#ffd700',
    side: 'left'
  },
  {
    year: 'FUTURE',
    title: 'NEXT_DIMENSION',
    event: 'Continuous Growth',
    desc: 'Integrating AI, Engineering, and Finance to solve systemic global challenges.',
    color: '#ff6b9d',
    side: 'right'
  }
];

function RoadmapNode({ item, index }) {
  const { playPip } = useSound();
  
  return (
    <div className={`relative flex items-center justify-center w-full min-h-[400px] py-20
      ${item.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}
    `}>
      {/* Node Content */}
      <motion.div 
        initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onViewportEnter={() => playPip(660 + index * 110, 0.1, 0.03)}
        className="w-full md:w-[45%] p-8 glass rounded-[2.5rem] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all"
        style={{ boxShadow: `0 0 50px ${item.color}10` }}
      >
        <div className="absolute top-0 right-0 p-6 opacity-5 font-black text-6xl tracking-tighter text-white">
          {item.year === 'FUTURE' ? '??' : item.year % 100}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-1 bg-current" style={{ backgroundColor: item.color }} />
             <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase" style={{ color: item.color }}>{item.year}{" // "}EPOCH</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-display uppercase tracking-widest">
            <GlitchText text={item.title} />
          </h3>
          <p className="text-cyan-400/80 text-xs font-mono font-bold uppercase mb-4 tracking-wider">{item.event}</p>
          <p className="text-muted leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
            {item.desc}
          </p>
        </div>
      </motion.div>

      {/* Center Circle Trigger */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-dark border-2 border-white/20 rounded-full z-20" />
    </div>
  );
}

export default function RoadmapSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} id="roadmap" className="relative py-32 px-6 bg-dark overflow-hidden">
      <div className="text-center mb-16 max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-[0.5em] mb-4 inline-block">SYSTEM_CHRONOLOGY</span>
          <h2 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-tighter">
            <GlitchText text="Innovation Roadmap" />
          </h2>
          <p className="text-muted mt-6 border-l-2 border-cyan-500/50 pl-6 mx-auto inline-block text-left relative">
            <span className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-400 to-violet-500 shadow-[0_0_10px_#00f0ff]" />
            The evolution of a scientific mindset, spanning international medals and future visions of technological impact.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative px-4 md:px-0">
        {/* The 3D Plasma Circuit Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-dark-3 rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] border border-white/5">
           <motion.div 
             style={{ scaleY: pathLength, transformOrigin: 'top', background: 'linear-gradient(to bottom, transparent, #00f0ff, #8b5cf6, #ff6b9d)' }}
             className="absolute inset-x-0 bottom-0 top-0 rounded-full shadow-[0_0_20px_#00f0ff,0_0_40px_#8b5cf6] z-10"
           />
           
           {/* Moving Plasma Energy Core */}
           <motion.div 
              style={{ top: useTransform(pathLength, [0, 1], ['0%', '100%']) }}
              className="absolute left-1/2 -translate-x-1/2 -mt-4 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center z-30"
           >
             <div className="absolute inset-0 bg-white blur-[10px] opacity-70" />
             <div className="absolute inset-[-10px] bg-cyan-400 blur-[20px] opacity-50" />
             <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff]" />
           </motion.div>
        </div>

        {/* Roadmap Items */}
        <div className="relative z-10">
          {roadmapData.map((item, i) => (
            <RoadmapNode key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Background Decorative Tech Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-500/5 blur-[120px] pointer-events-none" />
    </section>
  );
}
