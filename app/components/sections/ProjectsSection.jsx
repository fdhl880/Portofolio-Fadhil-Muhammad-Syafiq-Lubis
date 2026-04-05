'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'IPITEx Gold Medalist',
    subtitle: 'INTERNATIONAL INNOVATION',
    desc: 'Scientific research and award-winning innovation presented at the Thailand International Expo. Recognized for pioneering sustainable technology in front of global delegates.',
    number: '01',
    color: 'from-cyan-500/20 to-transparent',
    borderColor: 'border-cyan-500/30',
    tags: ['Research', 'Global', 'Science'],
  },
  {
    id: 2,
    title: 'Neural Strategy',
    subtitle: 'AI FINANCIAL MODELING',
    desc: 'Advanced market analysis models and algorithmic trading strategies bridging the gap between machine learning and decentralized finance networks.',
    number: '02',
    color: 'from-violet-500/20 to-transparent',
    borderColor: 'border-violet-500/30',
    tags: ['Finance', 'AI', 'Quant'],
  },
  {
    id: 3,
    title: 'Engineering Hub',
    subtitle: 'HARDWARE & ROBOTICS',
    desc: 'Cutting-edge technical solutions and physical robotics infrastructure pushing the boundaries of mechanical design and automation efficiency.',
    number: '03',
    color: 'from-gold/20 to-transparent',
    borderColor: 'border-gold/30',
    tags: ['Hardware', 'Robotics', 'Systems'],
  },
  {
    id: 4,
    title: 'Venture Lab',
    subtitle: 'STARTUP INCUBATION',
    desc: 'Business modeling and startup incubation focusing on high-impact scalable technology solutions and disruptive brand identities.',
    number: '04',
    color: 'from-rose-500/20 to-transparent',
    borderColor: 'border-rose-500/30',
    tags: ['Startup', 'Business', 'Growth'],
  },
];

const HorizontalCard = ({ project }) => {
  return (
    <div className="w-[85vw] md:w-[60vw] h-[65vh] flex-shrink-0 flex items-center justify-center p-4">
      <motion.div 
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`w-full h-full relative rounded-3xl overflow-hidden glass border ${project.borderColor} group cursor-pointer`}
      >
        {/* Background Gradient & Image Placeholder */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 group-hover:opacity-100 transition-opacity duration-700`} />
        
        {/* Image / Textural Mask Effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs md:text-sm text-white/40 tracking-[0.3em] font-bold">
              {project.subtitle}
            </span>
            <span className="font-display text-4xl md:text-6xl text-white/10 font-bold tracking-tighter">
              {project.number}
            </span>
          </div>
          
          <div className="max-w-xl">
            <motion.h3 
              className="font-display text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[0.9]"
            >
              {project.title}
            </motion.h3>
            <p className="text-white/60 text-lg md:text-xl font-body leading-relaxed mb-8">
              {project.desc}
            </p>
            
            <div className="flex gap-3">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs uppercase tracking-widest font-mono backdrop-blur-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hover Reveal Arrow */}
        <div className="absolute bottom-16 right-16 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 bg-white/5 backdrop-blur-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProjectsSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Start tracking when the top of the container hits the top of the viewport
    // End when the bottom of the container hits the bottom of the viewport
  });

  // Transform scroll progress (0 to 1) to horizontal movement (0% to -X%)
  // We have 4 cards + padding, we want to scroll left so the last card aligns right
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[400vh] bg-[#050510]">
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        
        {/* Section Header Fixed inside Sticky Container */}
        <div className="absolute top-12 md:top-24 left-6 md:left-24 z-10">
          <span className="font-mono text-cyan-400 text-[10px] uppercase tracking-[0.4em] mb-2 pl-1 block">
             Selected Works // 2025
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white/90">
             INNOVATION GALLERY
          </h2>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-4 md:gap-16 px-6 md:px-24 w-max mt-20"
        >
          {projects.map((project) => (
            <HorizontalCard key={project.id} project={project} />
          ))}
          
          {/* End cap message */}
          <div className="w-[30vw] flex items-center justify-center">
            <p className="font-mono text-white/20 text-xs uppercase tracking-widest text-center whitespace-nowrap">
              End of Gallery<br/>Scroll Down To Continue
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
