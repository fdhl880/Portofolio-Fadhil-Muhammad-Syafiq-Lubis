'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import GlitchText from '../ui/GlitchText';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const projects = [
  {
    id: 1,
    title: 'IPITEx Gold Medalist',
    desc: 'Scientific research and innovation at Thailand International Expo.',
    icon: '🥇',
    color: '#00f0ff',
    tags: ['Research', 'Science'],
    size: 'col-span-2 row-span-2', // Large highlight
  },
  {
    id: 2,
    title: 'Neural Strategy',
    desc: 'Market analysis models & trading strategies.',
    icon: '📈',
    color: '#8b5cf6',
    tags: ['Finance', 'AI'],
    size: 'col-span-2 row-span-1', // Wide
  },
  {
    id: 3,
    title: 'Engineering Hub',
    desc: 'Advanced technical solutions & robotics.',
    icon: '⚙️',
    color: '#ffd700',
    tags: ['Tech', 'Robots'],
    size: 'col-span-1 row-span-1', // Small
  },
  {
    id: 4,
    title: 'Venture Lab',
    desc: 'Start-up incubation & business modeling.',
    icon: '💡',
    color: '#ff6b9d',
    tags: ['Startup', 'Brand'],
    size: 'col-span-1 row-span-1', // Small
  },
];

function ProjectBentoCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`${project.size} relative group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a1a]/40 backdrop-blur-3xl p-8 flex flex-col justify-between shadow-2xl`}
    >
      {/* Subtle Background Glow */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: project.color }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110 origin-left">
          {project.icon}
        </div>
        <h3 className="font-display text-xl md:text-2xl font-bold mb-3 tracking-tight text-white/90 group-hover:text-white">
          {project.title}
        </h3>
        <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-xs font-medium">
          {project.desc}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-8">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-white/40 group-hover:text-white/70 transition-colors">
            {tag}
          </span>
        ))}
      </div>

      {/* Decorative Corner Arrow */}
      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 md:py-48 w-full max-w-7xl mx-auto px-6 md:px-12">
      
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-cyan-400 block mb-6">Execution_Archive</span>
          <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-white">
             PROJECTS<span className="text-cyan-400 text-3xl">.</span>
          </h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white/40 max-w-sm text-sm md:text-lg leading-relaxed font-medium"
        >
          Building scalable solutions where cutting-edge engineering meets strategic financial modeling.
        </motion.p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-6 h-full min-h-[700px]">
        {projects.map((project, i) => (
          <ProjectBentoCard key={project.id} project={project} index={i} />
        ))}
        
        {/* Placeholder Bento Tile for Stats/Cta */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-2 row-span-1 border border-white/5 bg-white/[0.02] rounded-3xl p-10 flex flex-col justify-center items-center text-center group"
        >
           <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] mb-4">Project_Metrics_2025</div>
           <div className="flex gap-12">
              <div className="flex flex-col">
                 <span className="text-4xl md:text-5xl font-display font-bold text-white mb-2">12+</span>
                 <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Deployments</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-4xl md:text-5xl font-display font-bold text-cyan-400 mb-2">99%</span>
                 <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Uptime</span>
              </div>
           </div>
        </motion.div>
      </div>

    </section>
  );
}
