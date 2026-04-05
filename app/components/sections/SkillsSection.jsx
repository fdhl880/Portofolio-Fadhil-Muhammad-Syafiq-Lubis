'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSound } from '../../context/SoundContext';

const skillGroups = [
  {
    id: 1,
    category: 'Research & Science',
    skills: ['Hypothesis Testing', 'Data Analysis', 'Lab Protocol', 'Scientific Writing'],
    icon: '🔬',
    color: '#00f0ff',
    size: 'md:col-span-2 md:row-span-2',
    desc: 'Scientific inquiry and rigorous experimentation methods.'
  },
  {
    id: 2,
    category: 'Engineering',
    skills: ['Prototyping', 'CAD Design', 'Logic Flow', 'Tech Optimization'],
    icon: '⚙️',
    color: '#8b5cf6',
    size: 'md:col-span-2 md:row-span-1',
    desc: 'Building scalable technical solutions.'
  },
  {
    id: 3,
    category: 'Strategy & Finance',
    skills: ['Market Analysis', 'VC Modeling', 'Risk Assessment'],
    icon: '📊',
    color: '#ffd700',
    size: 'md:col-span-1 md:row-span-1',
    desc: 'Financial forecasting and market entry.'
  },
  {
    id: 4,
    category: 'Leadership',
    skills: ['Public Speaking', 'Team Management', 'Pivot Strategy'],
    icon: '🗣️',
    color: '#ff6b9d',
    size: 'md:col-span-1 md:row-span-1',
    desc: 'Visionary direction and communication.'
  },
];

const quotes = [
  { text: "The cosmos is within us. We are made of star-stuff. We are a way for the cosmos to know itself.", author: "Carl Sagan" },
  { text: "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.", author: "Stephen Hawking" },
  { text: "The people who are crazy enough to think they can change the world are the ones who do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.", author: "Albert Einstein" },
];

function SkillBentoCard({ group, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`${group.size} relative group overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-between hover:bg-white/[0.05] transition-all`}
    >
      {/* Dynamic Background Glow */}
      <div 
        className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity"
        style={{ backgroundColor: group.color }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
           <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110 origin-left">
              {group.icon}
           </div>
           <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">Lab_Module_{group.id}</div>
        </div>

        <div className="flex-grow">
           <h3 className="font-display text-xl md:text-2xl font-bold text-white/90 mb-4 tracking-tight">
             {group.category}
           </h3>
           <p className="text-white/40 text-[13px] md:text-sm font-medium mb-8 leading-relaxed max-w-[240px]">
             {group.desc}
           </p>

           <div className="flex flex-wrap gap-2">
             {group.skills.map(skill => (
               <span key={skill} className="text-[10px] md:text-[11px] font-mono text-white/30 border border-white/5 px-3 py-1.5 rounded-lg bg-black/20 group-hover:text-white/60 transition-colors">
                 {skill}
               </span>
             ))}
           </div>
        </div>
      </div>

      {/* Decorative Corner Arrow */}
      <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { playPip } = useSound();

  const nextQuote = () => {
    try { playPip(880, 0.1, 0.05); } catch(e) {}
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <section id="skills" className="relative py-24 md:py-48 w-full max-w-7xl mx-auto px-6 md:px-12">
      
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-cyan-400 block mb-6">Expertise_Inventory</span>
          <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-white">
             LABORATORY<span className="text-cyan-400 text-3xl">.</span>
          </h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white/40 max-w-sm text-sm md:text-lg leading-relaxed font-medium"
        >
          Deconstructing complex challenges into scientific breakthroughs and engineering feats.
        </motion.p>
      </div>

      {/* Bento Laboratory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
         {skillGroups.map((group, i) => (
           <SkillBentoCard key={group.id} group={group} index={i} />
         ))}

         {/* Interactive Quote Bento Card */}
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="md:col-span-2 border border-cyan-500/20 bg-cyan-500/5 rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden group min-h-[250px]"
         >
            <div className="absolute top-8 left-10 font-mono text-[9px] text-cyan-400 uppercase tracking-[0.4em]">Core_Philosophy</div>
            
            <AnimatePresence mode="wait">
              <motion.div
                 key={quoteIndex}
                 initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
                 whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                 exit={{ opacity: 0, filter: 'blur(10px)', y: -10 }}
                 transition={{ duration: 0.5 }}
                 className="relative z-10 pr-12"
              >
                 <div className="font-display text-xl md:text-2xl font-bold leading-tight italic text-cyan-100">
                    &quot;{quotes[quoteIndex].text}&quot;
                 </div>
                 <div className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400/60">
                    {`- ${quotes[quoteIndex].author} // Fadhil MS Lbs`}
                 </div>
              </motion.div>
            </AnimatePresence>

            {/* Mechanical Switch Trigger */}
            <button 
              onClick={nextQuote}
              className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/20 hover:rotate-180 transition-all duration-500 text-cyan-400 text-xs"
            >
              ↺
            </button>

            {/* Atmospheric Glow */}
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-cyan-500/10 blur-[80px] rounded-full" />
         </motion.div>
      </div>

    </section>
  );
}
