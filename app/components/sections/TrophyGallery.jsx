'use client';
import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  Text, 
  MeshWobbleMaterial, 
  PresentationControls, 
  Environment,
  Html,
  MeshDistortMaterial,
  Torus
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformance } from '../../context/PerformanceContext';
import { useSound } from '../../context/SoundContext';

// Procedural Medal Component
function MedalModel({ color, ribbonColor, title, isActive }) {
  const groupRef = useRef();
  const { isCinematic } = usePerformance();

  useFrame((state) => {
    if (isCinematic && groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ribbon */}
      <mesh position={[0, 1.2, -0.1]}>
        <boxGeometry args={[0.4, 1.5, 0.05]} />
        <meshStandardMaterial color={ribbonColor} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Main Medal Body */}
      <group position={[0, 0, 0]}>
        {/* Outer Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.05, 16, 100]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
        </mesh>
        
        {/* Core Disk */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Dynamic Detail (Floating Particles or Glow) */}
        {isActive && (
           <mesh scale={1.2}>
             <torusGeometry args={[0.7, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]} />
             <MeshWobbleMaterial color={color} speed={5} factor={0.5} />
           </mesh>
        )}
      </group>
    </group>
  );
}

const trophyData = [
  {
    id: 'i2aspo',
    title: 'I2ASPO Gold Medal',
    event: 'International Indonesia Applied Science Project Olympiad',
    year: '2025',
    color: '#ffd700',
    ribbonColor: '#8b5cf6', // purple
    desc: 'Awarded for excellence in scientific innovation and research. The IYSA flagship competition.',
    stats: { innovation: '98%', complexity: '94%', impact: 'HIGH' }
  },
  {
    id: 'ipitex',
    title: 'IPITEx Silver Medal',
    event: 'Thailand Inventors\' Day (IPITEx)',
    year: '2024',
    color: '#c0c0c0',
    ribbonColor: '#fbbf24', // yellow
    desc: 'Top honor from the National Research Council of Thailand (NRCT) on the global stage.',
    stats: { innovation: '92%', complexity: '88%', impact: 'GLOBAL' }
  },
  {
    id: 'mte',
    title: 'MTE Silver Medal',
    event: 'Malaysia Technology Expo',
    year: '2025',
    color: '#c0c0c0', // silver
    ribbonColor: '#ffffff', // white
    desc: 'Showcasing engineering excellence and innovative problem-solving in Kuala Lumpur.',
    stats: { innovation: '85%', complexity: '92%', impact: 'REGIONAL' }
  }
];

export default function TrophyGallery() {
  const [activeId, setActiveId] = useState(null);
  const { isCinematic } = usePerformance();
  const { playPip } = useSound();

  const activeTrophy = trophyData.find(t => t.id === activeId);

  const handleSelect = (id) => {
    setActiveId(id === activeId ? null : id);
    playPip(id === activeId ? 440 : 880, 0.1);
  };

  return (
    <section className="relative py-32 px-6 min-h-screen bg-dark flex flex-col items-center">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="text-center mb-20 max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold font-display mb-6"
        >
          <span className="text-gradient">3D Virtual Trophy Gallery</span>
        </motion.h2>
        <p className="text-muted text-lg">
          Interactive digital twins of international honors. Select a medal to initiate a technical deep-dive.
        </p>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        {trophyData.map((trophy, i) => (
          <div key={trophy.id} className="relative h-[500px] group">
            <div 
              className={`absolute inset-0 rounded-[3rem] transition-all duration-700 pointer-events-none
                ${activeId === trophy.id ? 'bg-white/5 border-white/20 scale-105' : 'bg-transparent border-transparent'}
              `} 
            />
            
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color={trophy.color} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#white" />
              
              <PresentationControls
                global
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 1500 }}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 2, Math.PI / 2]}
              >
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <group onClick={() => handleSelect(trophy.id)} cursor="pointer">
                    <MedalModel 
                      color={trophy.color} 
                      ribbonColor={trophy.ribbonColor} 
                      isActive={activeId === trophy.id}
                    />
                  </group>
                </Float>
              </PresentationControls>
              <Environment preset="city" />
            </Canvas>

            {/* Medal Label */}
            <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
              <div className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase mb-1">Entry_No_{i+1}</div>
              <div className="text-xl font-bold text-white uppercase tracking-wider">{trophy.id.toUpperCase()}_UNIT</div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {activeId && activeTrophy && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 100 }}
            animate={{ opacity: 1, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : -window.innerHeight/2 + 250, x: 0 }}
            exit={{ opacity: 0, y: 100, x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 100 }}
            className="fixed bottom-0 md:top-1/2 right-0 md:right-12 w-full md:w-80 glass rounded-t-[3rem] md:rounded-3xl border-t md:border border-white/20 p-8 z-[200] shadow-2xl overflow-hidden max-h-[80vh] md:max-h-none overflow-y-auto"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full md:hidden" />
            
            <div className="absolute top-0 right-0 p-4">
              <button 
                onClick={() => setActiveId(null)}
                className="text-white/30 hover:text-white transition-colors p-2"
              >
                [ CLOSE ]
              </button>
            </div>

            <div className="relative z-10 space-y-6 pt-4 md:pt-0">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">{activeTrophy.year}{" // "}HONORS</span>
                <h3 className="text-2xl font-bold text-white mt-1 leading-tight">{activeTrophy.title}</h3>
                <p className="text-cyan-400/60 text-xs font-mono mt-1 font-bold">{activeTrophy.event}</p>
              </div>

              <div className="h-px bg-white/10" />

              <p className="text-muted text-sm leading-relaxed">
                {activeTrophy.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {Object.entries(activeTrophy.stats).map(([k, v]) => (
                  <div key={k} className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-[9px] font-mono text-white/30 uppercase">{k}</div>
                    <div className="text-sm font-bold text-white">{v}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                 <button className="w-full py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-[10px] font-mono text-white font-bold tracking-[0.2em] hover:bg-cyan-500/20 transition-all uppercase">
                   Download_Certification_PDF
                 </button>
              </div>
            </div>

            {/* Background Decorative Circuitry */}
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-500 fill-none stroke-current stroke-1">
                <path d="M0,50 L50,50 L50,100 M50,50 L100,0" />
                <circle cx="50" cy="50" r="5" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-20 text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">
        Interactive_Trophy_Vault{" // "}60FPS_SECURE_LINK
      </div>
    </section>
  );
}
