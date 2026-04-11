'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const NODES = [
  {
    id: '01',
    hex: '0x3F9A',
    label: 'CORE_ENGINEERING',
    description: 'Deconstructing theoretical concepts into high-fidelity technical systems. Precision-grade robotics and firmware development.',
    stack: ['C++', 'Python', 'ROS2', 'SolidWorks'],
    status: 'ACTIVE_LINK'
  },
  {
    id: '02',
    hex: '0x1A4C',
    label: 'INTELLIGENCE_LAYER',
    description: 'Architecting neural frameworks and context-aware AI systems. Focused on large language model integration and optimization.',
    stack: ['TensorFlow', 'PyTorch', 'Next.js', 'LLM_Ops'],
    status: 'OPTIMIZED'
  },
  {
    id: '03',
    hex: '0x9E2B',
    label: 'VISUAL_ARCHITECTURE',
    description: 'Immersive 3D environments and cinematic web-gl interfaces. High-end museum aesthetics with real-time interactivity.',
    stack: ['Three.js', 'R3F', 'GLSL', 'Framer'],
    status: 'PRIME_SYNC'
  },
  {
    id: '04',
    hex: '0x7D5E',
    label: 'STRATEGIC_LOGIC',
    description: 'Financial modeling and market analysis for scaling innovation. Bridging the gap between laboratory and venture ecosystem.',
    stack: ['Risk_Mgmt', 'Venture_Ops', 'Data_Sci', 'Market_Modeling'],
    status: 'STABLE'
  }
];

export default function ExpertiseLaboratory() {
  const [hoveredId, setHoveredId] = useState(null);

  // Function to simulate scanning sound
  const playScanSound = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      audio.volume = 0.05;
      audio.play();
    } catch (e) {
      console.log('Audio disabled');
    }
  };

  return (
    <section id="expertise" className="py-32 px-6 md:px-12 bg-black text-white border-t border-white/5 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Laboratory Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-white/50 text-[10px] tracking-[0.8em] uppercase font-sans">Laboratory Tier // 0.1</span>
            <h2 className="font-display text-5xl md:text-8xl leading-none uppercase">
              The <span className="italic text-[#D4AF37]">Expertise.</span>
            </h2>
          </div>
          <div className="flex flex-col items-end text-right gap-2">
            <p className="text-white/50 max-w-sm text-[10px] leading-relaxed font-sans uppercase tracking-[0.2em]">
              Scanning global expertise nodes... <br />
              System Status: High Fidelity
            </p>
            <div className="flex gap-2">
               <div className={`w-1 h-1 rounded-full ${hoveredId ? 'bg-[#D4AF37] animate-ping' : 'bg-white/10'}`} />
               <div className="w-1 h-1 rounded-full bg-white/10" />
               <div className="w-1 h-1 rounded-full bg-white/10" />
            </div>
          </div>
        </div>

        {/* Expertise Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5 border border-white/5">
          {NODES.map((node, idx) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => {
                setHoveredId(node.id);
                playScanSound();
              }}
              onMouseLeave={() => setHoveredId(null)}
              className="relative p-8 md:p-10 bg-black group cursor-crosshair overflow-hidden"
            >
              {/* Scanning Laser Animation */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37] z-20 pointer-events-none opacity-0 group-hover:opacity-100"
                animate={{ top: hoveredId === node.id ? ['0%', '100%', '0%'] : '0%' }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* Data Node Metadata */}
              <div className="flex justify-between items-start mb-12">
                <div className="flex flex-col items-start gap-1">
                   <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest">{node.id}</span>
                   <span className="text-[10px] font-mono text-white/20">{node.hex}</span>
                </div>
                <div className={`px-2 py-0.5 border text-[7px] font-mono tracking-widest uppercase transition-colors duration-500 
                  ${hoveredId === node.id ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-white/10 text-white/20'}`}>
                  {node.status}
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase group-hover:text-[#D4AF37] transition-colors">
                  {node.label}
                </h3>
                <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest h-[80px]">
                  {node.description}
                </p>
              </div>

              {/* Technical Stack Overlay */}
              <div className="mt-12 flex flex-wrap gap-x-4 gap-y-2 pt-12 border-t border-white/5 transition-all group-hover:border-white/20">
                {node.stack.map(s => (
                  <span key={s} className="text-[8px] tracking-widest uppercase text-white/20 group-hover:text-white/60 transition-colors">
                    {s}
                  </span>
                ))}
              </div>

              {/* Holographic Background Text */}
              <div className="absolute -bottom-4 -right-4 text-[60px] font-mono font-bold text-white/[0.02] pointer-events-none select-none italic tracking-tighter">
                 {node.id}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Footer Attribution */}
        <div className="mt-12 flex flex-col items-center opacity-10">
           <div className="w-16 h-[1px] bg-white mb-4" />
           <p className="text-[8px] tracking-[1em] uppercase">Laboratory Interface Tier v3.0 // Med_98_Sys</p>
        </div>

      </div>
    </section>
  );
}
