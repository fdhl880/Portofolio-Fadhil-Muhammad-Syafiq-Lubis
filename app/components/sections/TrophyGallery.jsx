'use client';
import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  PresentationControls, 
  Environment,
  ContactShadows,
  MeshPhysicalMaterial
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

function MedalArtifact({ color, isActive }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      {/* The Medal Artifact */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <meshPhysicalMaterial 
          color={color}
          metalness={1}
          roughness={0.05}
          reflectivity={1}
          iridescence={0.3}
          iridescenceIOR={1.5}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Pedestal Base */}
      <mesh position={[0, -2.5, 0]}>
        <boxGeometry args={[2, 4, 2]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

const archives = [
  {
    id: 'gold',
    title: 'IYSA Royal Distinction',
    award: 'Grand Gold Medal',
    year: '2025',
    color: '#FFD700',
    detail: 'Top honors at the International Indonesia Applied Science Project Olympiad.'
  },
  {
    id: 'silver-thai',
    title: 'Thai Inventors Honor',
    award: 'Silver Distinction',
    year: '2024',
    color: '#C0C0C0',
    detail: 'Recognized by the National Research Council of Thailand (NRCT).'
  },
  {
    id: 'silver-mal',
    title: 'MTE Excellence',
    award: 'Silver Achievement',
    year: '2025',
    color: '#C0C0C0',
    detail: 'Excellence in Malaysia Technology Expo industrial showcase.'
  }
];

export default function TrophyGallery() {
  const [activeId, setActiveId] = useState(archives[0].id);

  return (
    <section id="archives" className="py-32 px-6 md:px-12 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24 gap-6">
          <span className="text-white/20 text-[10px] tracking-[0.8em] uppercase font-sans">Archives</span>
          <h2 className="font-display text-5xl md:text-7xl">The Collection of <span className="italic opacity-40">Artifacts.</span></h2>
          <div className="h-px w-24 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* 3D Showcase */}
          <div className="relative aspect-square bg-[#050505] border border-white/5 rounded-none overflow-hidden cursor-grab active:cursor-grabbing">
             <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
                
                <PresentationControls
                  global
                  config={{ mass: 2, tension: 500 }}
                  snap={{ mass: 4, tension: 1500 }}
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 2, Math.PI / 2]}
                >
                  <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <MedalArtifact 
                      color={archives.find(a => a.id === activeId)?.color || '#ffffff'} 
                    />
                  </Float>
                </PresentationControls>

                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
                <Environment preset="studio" />
             </Canvas>
             
             {/* Info Overlay */}
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] tracking-widest text-white/30 font-sans uppercase">Display_Node</span>
                   <span className="font-display text-2xl uppercase tracking-tighter">ARTIFACT_{activeId.toUpperCase()}</span>
                </div>
                <div className="text-[9px] text-white/10 font-sans tracking-[0.5em] uppercase">Interactive_Exhibition</div>
             </div>
          </div>

          {/* Selector List */}
          <div className="flex flex-col gap-12">
            {archives.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`group flex flex-col gap-4 text-left p-8 border border-white/5 transition-all duration-700 ${
                  activeId === item.id ? 'bg-white/[0.03] border-white/20' : 'bg-transparent'
                }`}
              >
                <div className="flex justify-between items-baseline">
                   <span className="font-display text-4xl group-hover:italic transition-all duration-700">
                     {activeId === item.id && <span className="mr-4 text-sm not-italic opacity-40">/0{idx+1}</span>}
                     {item.title}
                   </span>
                   <span className="text-[10px] tracking-widest uppercase text-white/20">{item.year}</span>
                </div>
                <p className={`text-white/40 text-sm leading-relaxed max-w-sm transition-opacity duration-700 ${activeId === item.id ? 'opacity-100' : 'opacity-0'}`}>
                  {item.detail}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className={`w-8 h-px bg-white/10 group-hover:bg-white transition-all duration-700 ${activeId === item.id ? 'w-24 bg-white' : ''}`} />
                  <span className="text-[10px] tracking-widest uppercase font-sans text-white/50">{item.award}</span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
