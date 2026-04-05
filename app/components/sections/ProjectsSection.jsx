'use client';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useTransform as framerUseTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import GlitchText from '../ui/GlitchText';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const projects = [
  {
    title: 'IPITEx Thailand Gold Medalist',
    desc: 'Awarded the gold medal for groundbreaking scientific research and innovation at the International Expo in Thailand.',
    icon: '🥇',
    color: '#00f0ff',
    tags: ['International Research', 'Innovation', 'Science'],
  },
  {
    title: 'Advanced Engineering Prototypes',
    desc: 'Leading the development of complex technical solutions and engineering prototypes using robotics.',
    icon: '⚙️',
    color: '#8b5cf6',
    tags: ['Engineering', 'System Architecture', 'Tech'],
  },
  {
    title: 'Strategic Market & Neural Analysis',
    desc: 'Developing sophisticated market analysis models and trading strategies based on financial behavior.',
    icon: '📈',
    color: '#ffd700',
    tags: ['Finance', 'Data Model', 'Strategy'],
  },
  {
    title: 'Innovation & Start-up Incubation',
    desc: 'Founding and developing entrepreneurial concepts from ideation to business modeling.',
    icon: '💡',
    color: '#ff6b9d',
    tags: ['Entrepreneurship', 'Venture', 'Brand'],
  },
];

// 3D UI Assets
function DNAHelix({ color }) {
  const group = useRef();
  useFrame(({ clock }) => { group.current.rotation.y = clock.getElapsedTime() * 0.5; });
  return (
    <group ref={group}>
      {Array.from({ length: 24 }).map((_, i) => {
        const y = (i - 12) * 0.25;
        const angle = i * 0.6;
        const radius = 1.2;
        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;
        return (
          <group key={i}>
            <mesh position={[x1, y, z1]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>
            <mesh position={[x2, y, z2]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>
            <mesh position={[0, y, 0]} rotation={[0, -angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.02, 0.02, radius * 2]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function DataCube({ color }) {
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.x = clock.getElapsedTime() * 0.3;
    group.current.rotation.y = clock.getElapsedTime() * 0.4;
  });
  return (
    <group ref={group}>
      <mesh><boxGeometry args={[2.5, 2.5, 2.5]} /><meshBasicMaterial color={color} wireframe transparent opacity={0.2} /></mesh>
      <mesh rotation={[Math.PI/4, Math.PI/4, 0]}><boxGeometry args={[1.5, 1.5, 1.5]} /><meshBasicMaterial color={color} wireframe transparent opacity={0.6} /></mesh>
      <mesh><boxGeometry args={[0.8, 0.8, 0.8]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh>
    </group>
  );
}

function MarketMatrix({ color }) {
  const group = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;
    group.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
  });
  return (
    <group ref={group}>
      <mesh><octahedronGeometry args={[2, 1]} /><meshBasicMaterial color={color} wireframe transparent opacity={0.4} /></mesh>
      <mesh><octahedronGeometry args={[1.5, 0]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.8} /></mesh>
    </group>
  );
}

function NeuralKnot({ color }) {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
      <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={1.5} distort={0.6} speed={5} roughness={0} metalness={1} />
    </mesh>
  );
}

function HologramAsset({ type, color }) {
  return (
    <Float speed={4} rotationIntensity={2} floatIntensity={1.5}>
      {type === 'Science' && <DNAHelix color={color} />}
      {type === 'Technology' && <DataCube color={color} />}
      {type === 'Markets' && <MarketMatrix color={color} />}
      {type === 'Innovation' && <NeuralKnot color={color} />}
    </Float>
  );
}

// HORIZONTAL PROJECT CARD
function ProjectCard({ project, index, onClick, scrollProgress }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  
  const rotateX = useSpring(framerUseTransform(mouseY, [0, 1], [15, -15]), springConfig);
  const rotateY = useSpring(framerUseTransform(mouseX, [0, 1], [-15, 15]), springConfig);
  const glareX = useSpring(framerUseTransform(mouseX, [0, 1], [100, 0]), springConfig);
  const glareY = useSpring(framerUseTransform(mouseY, [0, 1], [100, 0]), springConfig);
  
  // Parallax: Each card moves at a slightly offset range
  const xOffset = useTransform(scrollProgress, [(index - 1) * 0.25, (index + 1) * 0.25], [100, -100]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mouseX.set(0.5); mouseY.set(0.5); }}
      onClick={() => onClick(project)}
      className="flex-shrink-0 w-[85vw] md:w-[50vw] h-[65vh] mx-4 md:mx-12 cursor-pointer perspective-1000 group relative z-30"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="glass rounded-3xl w-full h-full p-8 md:p-14 border border-white/5 relative overflow-hidden flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-color-dodge"
          style={{ background: `radial-gradient(circle at calc(100% - ${glareX}%) calc(100% - ${glareY}%), rgba(255,255,255,0.7) 0%, ${project.color}60 20%, transparent 60%)` }}
        />

        <motion.div style={{ x: xOffset, transform: 'translateZ(60px)' }} className="relative z-20 flex flex-col h-full pointer-events-none">
          <div>
            <div className="text-7xl md:text-9xl mb-8 drop-shadow-2xl">{project.icon}</div>
            <h3 className="font-display text-3xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-xl" style={{ color: hovered ? project.color : '#ffffff' }}>
               <GlitchText text={project.title} />
            </h3>
            <p className="text-white/60 text-sm md:text-xl max-w-md leading-relaxed mb-10 font-sans font-medium">
              {project.desc}
            </p>
          </div>
          
          <div className="mt-auto flex flex-wrap gap-4">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] md:text-xs px-5 py-2.5 rounded-full border border-white/10 font-bold uppercase tracking-widest bg-white/5 text-white/50 backdrop-blur-md">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Decorative Grid / Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/images/grid.svg')] bg-[length:40px_40px] mix-blend-overlay" />
        
        {/* Right Info Sidebar Decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-20 border-l border-white/5 flex flex-col items-center justify-center p-4">
           <div className="h-full w-px bg-white/10 relative">
              <motion.div animate={{ height: ['0%', '100%', '0%'] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-0 left-0 w-full bg-cyan-400" />
           </div>
           <span className="font-mono text-[8px] vertical-text text-white/20 tracking-[1em] mt-8 uppercase">Project_Node_{index}</span>
        </div>

      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section id="projects" ref={containerRef} className="relative h-[500vh] w-full bg-[#020208]">
      
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 z-0 bg-[url('/images/grid.svg')] opacity-[0.03] bg-[length:60px_60px]" />
        
        <div className="absolute top-[10vh] left-10 md:left-24 z-10">
           <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}>
              <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-white/90">
                <span className="text-gradient">PROJECTS</span> 
              </h2>
              <p className="font-mono text-xs md:text-sm tracking-[0.5em] text-cyan-400 opacity-60 mt-4 uppercase">
                 [ Swipe_To_Analyze_Data_Segments ]
              </p>
           </motion.div>
        </div>

        <motion.div style={{ x }} className="flex items-center px-[15vw] md:px-[25vw] h-full gap-8 md:gap-0">
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.title} project={project} index={i} 
              onClick={setSelectedProject} scrollProgress={scrollYProgress}
            />
          ))}

          <div className="flex-shrink-0 w-[40vw] flex flex-col items-center justify-center opacity-20">
             <div className="w-1 h-40 bg-gradient-to-b from-white/0 via-white/40 to-white/0 mb-10" />
             <h4 className="font-display text-4xl uppercase tracking-[1.5em] text-white">EOF</h4>
          </div>
        </motion.div>

        {/* Floating Navigation HUD Progress */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-12 z-50">
           <div className="flex justify-between font-mono text-[10px] text-white/40 mb-3 tracking-[0.4em] uppercase">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"/> Segment_Start</span>
              <span>Scanning_Buffer...</span>
              <span>End_Point</span>
           </div>
           <div className="w-full h-[2px] bg-white/5 relative">
              <motion.div 
                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_20px_#00f0ff]" 
              />
           </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto bg-dark/98 backdrop-blur-3xl p-4 md:p-12 overflow-y-auto"
          >
             <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('/images/grid.svg')] bg-[length:40px_40px] opacity-10" />
             <div className="absolute inset-0 pointer-events-none opacity-60">
               <Canvas camera={{ position: [0, 0, 8] }}>
                 <ambientLight intensity={0.5} />
                 <pointLight position={[10, 10, 10]} intensity={2} color={selectedProject.color} />
                 <HologramAsset type={selectedProject.tags[2]} color={selectedProject.color} />
               </Canvas>
             </div>

             <motion.div 
               initial={{ scale: 0.9, y: 50, rotateX: 20 }} animate={{ scale: 1, y: 0, rotateX: 0 }} exit={{ scale: 0.9, y: 50 }}
               className="relative z-10 w-full max-w-5xl glass rounded-3xl p-8 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10"
               style={{ boxShadow: `0 0 100px ${selectedProject.color}15` }}
             >
                <button onClick={() => setSelectedProject(null)} className="absolute top-10 right-10 text-white/40 hover:text-white uppercase font-mono text-xs border border-white/10 hover:border-white/30 px-6 py-2 rounded-full cursor-pointer transition-all">Exit_Session [ESC]</button>
                <div className="flex flex-col gap-8">
                  <div className="text-7xl md:text-8xl drop-shadow-2xl">{selectedProject.icon}</div>
                  <h3 className="text-4xl md:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight">
                    <GlitchText text={selectedProject.title} />
                  </h3>
                  <div className="h-px w-32 bg-cyan-400/50" />
                  <p className="text-lg md:text-2xl text-white/70 max-w-2xl font-sans leading-relaxed">{selectedProject.desc}</p>
                  <div className="flex flex-wrap gap-4 mt-6">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="border px-5 py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#00f0ff] border-[#00f0ff]/20 bg-[#00f0ff]/5 backdrop-blur-md">{tag}</span>
                    ))}
                  </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`.vertical-text { writing-mode: vertical-rl; }`}</style>
    </section>
  );
}
