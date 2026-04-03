'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import GlitchText from '../ui/GlitchText';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Octahedron, MeshDistortMaterial, Html } from '@react-three/drei';

const projects = [
  {
    title: 'IPITEx Thailand Gold Medalist',
    desc: 'Awarded the gold medal for groundbreaking scientific research and innovation at the International Intellectual Property, Invention, Innovation and Technology Exposition (IPITEx) in Thailand.',
    icon: '🥇',
    color: '#00f0ff',
    tags: ['International Research', 'Innovation', 'Science'],
  },
  {
    title: 'Advanced Engineering Prototypes',
    desc: 'Leading the development of complex technical solutions and engineering prototypes, leveraging modern robotics and automated system frameworks for high-impact industrial applications.',
    icon: '⚙️',
    color: '#8b5cf6',
    tags: ['Engineering', 'System Architecture', 'Tech'],
  },
  {
    title: 'Strategic Market & Neural Analysis',
    desc: 'Developing sophisticated market analysis models and trading strategies based on data-driven research and financial behavior studies for modern economic ecosystems.',
    icon: '📈',
    color: '#ffd700',
    tags: ['Finance', 'Data Model', 'Strategy'],
  },
  {
    title: 'Innovation & Start-up Incubation',
    desc: 'Founding and developing entrepreneurial concepts from ideation to business modeling, focusing on emerging markets and creative problem-solving ventures.',
    icon: '💡',
    color: '#ff6b9d',
    tags: ['Entrepreneurship', 'Venture', 'Brand'],
  },
];

function DNAHelix({ color }) {
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.5;
  });
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
      <mesh>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI/4, Math.PI/4, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
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
      <mesh>
        <octahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} wireframe={false} transparent opacity={0.8} />
      </mesh>
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
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        distort={0.6}
        speed={5}
        wireframe={false}
        roughness={0}
        metalness={1}
      />
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

function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onClick={() => onClick(project)}
      className="group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <div
        className="glass rounded-2xl p-6 md:p-8 h-full transition-all duration-200 relative overflow-hidden"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          boxShadow: hovered ? `0 10px 40px ${project.color}15, 0 0 60px ${project.color}08` : 'none',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        />

        <div className="text-4xl mb-4">{project.icon}</div>
        <h3
          className="font-display text-xl font-bold mb-3 transition-colors"
          style={{ color: hovered ? project.color : '#ffffff' }}
        >
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border"
              style={{
                borderColor: `${project.color}30`,
                color: `${project.color}cc`,
                background: `${project.color}08`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Technical Reveal Overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-end p-6 bg-dark/40 backdrop-blur-[2px]"
            >
              <div className="absolute inset-0 border border-cyan-500/30 m-2 rounded-xl pointer-events-none" />
              {/* Scanning line */}
              <motion.div 
                animate={{ y: [0, 200, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="absolute top-0 left-2 right-2 h-px bg-cyan-400/30 blur-sm"
              />
              
              <div className="relative font-mono text-[8px] text-cyan-400/80 leading-tight space-y-1">
                <div>{"// OBJECT_ANALYSIS: COMPLETED"}</div>
                <div>{"// DATA_STREAM: ACTIVE"}</div>
                <div>{"// SECTOR_READ: 0x"}{index}{"F4A"}</div>
                <div className="text-[10px] text-white font-bold tracking-widest mt-2">
                  {"PERMISSION: GRANTED_ >"}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover glow overlay */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl z-10"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${project.color}10, transparent 60%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [selectedProject]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section id="projects" ref={containerRef} className="relative py-16 md:py-32 px-4 overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-neon/5 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-violet/5 blur-[120px] pointer-events-none" 
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">
               <GlitchText text="Projects & Ventures" />
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Areas of focus spanning science, engineering, finance, and entrepreneurship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard 
               key={project.title} 
               project={project} 
               index={i} 
               onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Holographic Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto bg-dark/95 backdrop-blur-xl p-4 md:p-12 overflow-y-auto"
          >
             <div className="absolute inset-0 pointer-events-none bg-[url('/images/grid.svg')] opacity-5 bg-[length:30px_30px]" />
             
             {/* 3D Asset Canvas */}
             <div className="absolute inset-0 pointer-events-none opacity-50">
               <Canvas camera={{ position: [0, 0, 8] }}>
                 <ambientLight intensity={0.5} />
                 <pointLight position={[10, 10, 10]} intensity={2} color={selectedProject.color} />
                 <HologramAsset type={selectedProject.tags[2]} color={selectedProject.color} />
               </Canvas>
             </div>

             <motion.div 
               initial={{ scale: 0.9, y: 50 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 50 }}
               className="relative z-10 w-full max-w-4xl glass rounded-3xl border border-white/10 p-6 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.8)] my-auto"
               style={{ boxShadow: `0 0 80px ${selectedProject.color}30` }}
             >
                <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] pointer-events-none" style={{ background: selectedProject.color }} />
                
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 text-white/50 hover:text-white pointer-events-auto"
                >
                  <span className="font-mono text-sm tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full hover:bg-white/10 transition-colors">Close</span>
                </button>

                <div className="flex flex-col gap-6 font-mono relative z-20">
                  <div className="text-4xl">{selectedProject.icon}</div>
                  <h3 className="text-2xl md:text-5xl font-display font-bold max-w-2xl" style={{ color: selectedProject.color }}>
                     <GlitchText text={selectedProject.title} />
                  </h3>
                  
                  <div className="bg-black/40 border-l border-white/20 p-6 rounded-r-xl max-w-xl">
                     <p className="text-lg text-white/90 leading-relaxed font-sans">
                       {selectedProject.desc}
                     </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="border px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase" style={{ borderColor: `${selectedProject.color}50`, color: selectedProject.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 text-[10px] text-white/30 tracking-widest">
                     {"// END_OF_FILE :: SYS_SCAN_COMPLETE"}
                  </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
