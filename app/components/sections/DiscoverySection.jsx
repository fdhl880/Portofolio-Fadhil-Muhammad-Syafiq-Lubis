'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, Environment, Edges, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';

const achievements = [
  {
    id: 0,
    image: '/images/photo1.jpg',
    title: 'Global Excellence',
    category: 'Gold Medal',
    description: 'Highest honor at I2ASPO 2025, pioneering student innovation.',
    color: '#00f0ff',
    targetPos: [-3, 1.5, 1], // Exploded position
    basePos: [0, 0, 0]
  },
  {
    id: 1,
    image: '/images/photo3.jpg',
    title: 'Intl. Presence',
    category: 'The World Stage',
    description: 'Representing Indonesia at IPITEx Thailand for global impact.',
    color: '#ffd700',
    targetPos: [3, 1.5, 1],
    basePos: [0, 0, 0]
  },
  {
    id: 2,
    image: '/images/photo4.jpg',
    title: 'Official Recognition',
    category: 'Silver & Bronze',
    description: 'IPITEx Thailand Silver Prize & MTE Malaysia Bronze Award.',
    color: '#c0c0c0',
    targetPos: [-2, -2, 2],
    basePos: [0, 0, 0]
  },
  {
    id: 3,
    image: '/images/photo2.jpg',
    title: 'Future Vision',
    category: 'Continuous Innovation',
    description: 'Sustainable engineering solutions and financial technology.',
    color: '#8b5cf6',
    targetPos: [2, -2, 2],
    basePos: [0, 0, 0]
  },
];

function BlueprintPart({ data, exploded, activeId, setActiveId, isMobile }) {
  const ref = useRef();
  const htmlRef = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Scale target distance for mobile
    const multiplier = isMobile ? 0.6 : 1;
    const finalTarget = [
      data.targetPos[0] * multiplier,
      data.targetPos[1] * multiplier,
      data.targetPos[2] * multiplier
    ];

    const target = exploded ? new THREE.Vector3(...finalTarget) : new THREE.Vector3(...data.basePos);
    ref.current.position.lerp(target, delta * 3);
    
    // Slow rotation
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.y += delta * 0.3;

    // Pulse active node
    if (activeId === data.id) {
       const scaleTarget = exploded ? 1.2 : 1;
       ref.current.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), delta * 5);
    } else {
       ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 5);
    }
  });

  const isActive = activeId === data.id;

  return (
    <group ref={ref}>
      <mesh 
        onPointerOver={() => { document.body.style.cursor = 'pointer'; setActiveId(data.id); }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; if(isActive) setActiveId(null); }}
        onClick={(e) => { e.stopPropagation(); setActiveId(isActive ? null : data.id); }}
      >
        {/* Abstract Geometry based on ID */}
        {data.id === 0 && <boxGeometry args={[1, 1, 1]} />}
        {data.id === 1 && <icosahedronGeometry args={[0.8, 1]} />}
        {data.id === 2 && <cylinderGeometry args={[0.6, 0.6, 1.5, 16]} />}
        {data.id === 3 && <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />}
        
        <meshPhysicalMaterial 
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
          emissive={isActive ? data.color : '#000000'}
          emissiveIntensity={isActive ? 0.5 : 0}
        />
        <Edges color={data.color} threshold={15} scale={1.05} opacity={isActive ? 1 : 0.3} transparent />
      </mesh>

      {/* Holographic HTML Label */}
      <Html 
        ref={htmlRef} 
        position={[0, 0, 0]} 
        center 
        style={{
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: exploded ? (isActive ? 1 : 0.6) : 0,
          pointerEvents: exploded ? 'auto' : 'none',
          transform: `scale(${exploded ? (isActive ? 1 : 0.8) : 0})`
        }}
        zIndexRange={[100, 0]}
      >
        <div className={`relative ${isActive ? 'z-50' : 'z-0'} group`}>
          {/* Leader Line to center */}
          <div className="absolute top-1/2 right-full w-12 md:w-24 h-px bg-gradient-to-l from-white/50 to-transparent -translate-y-1/2 pointer-events-none" />
          
          <div 
            className="w-48 md:w-64 glass p-3 md:p-4 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 relative overflow-hidden"
            style={{ 
              boxShadow: isActive ? `0 0 30px ${data.color}40` : 'none',
              borderColor: isActive ? `${data.color}80` : 'rgba(255,255,255,0.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: data.color }} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">{data.category}</span>
            </div>
            
            {isActive && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 120, opacity: 1 }}
                className="relative w-full mb-3 rounded-lg overflow-hidden border border-white/10"
              >
                <Image src={data.image} alt={data.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020208] to-transparent" />
              </motion.div>
            )}

            <h3 className="font-display text-lg font-bold text-white leading-tight mb-1">{data.title}</h3>
            
            {isActive && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-white/60 leading-relaxed font-mono"
              >
                {data.description}
              </motion.p>
            )}
            
            {/* Corner Bracket Details */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
          </div>
        </div>
      </Html>
    </group>
  );
}

// Background Grid for alignment vibe
function MeasurementGrid() {
  return (
    <group position={[0, -3, -2]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[20, 20, '#00f0ff', '#ffffff']} material-opacity={0.1} material-transparent />
      <mesh>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#020208" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export default function DiscoverySection() {
  const [exploded, setExploded] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto trigger explosion when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setExploded(true), 500);
        } else {
          setExploded(false);
          setActiveId(null);
        }
      },
      { threshold: 0.4 }
    );
    const el = document.getElementById('discovery');
    if (el) observer.observe(el);
    return () => { if(el) observer.unobserve(el); };
  }, []);

  return (
    <section id="discovery" className="relative min-h-[120vh] bg-[#020208] overflow-hidden flex flex-col justify-center">
      
      {/* Dark vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020208_80%)]" />

      {/* Header Overlay */}
      <div className="absolute top-24 inset-x-0 z-20 flex flex-col items-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full border border-white/10 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400">Blueprint_Active</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
        >
          SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">BLUEPRINT</span>
        </motion.h2>
        <p className="text-white/40 font-mono text-sm max-w-lg mx-auto">
          {exploded ? "> INITIALIZING EXPLODED VIEW... EXPLORE COMPONENTS." : "> WAITING FOR VIEWPORT ENGAGEMENT..."}
        </p>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col gap-2 font-mono text-[10px] text-white/30 text-right">
        <span>[MOUSE_DRAG] = ROTATE_CAMERA</span>
        <span>[MOUSE_HOVER] = INSPECT_COMPONENT</span>
        <span>{exploded ? 'ENGAGED' : 'STANDBY'}</span>
      </div>

      {/* 3D Canvas Layout */}
      <div className="w-full h-[100vh]">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group rotation={[Math.PI / 8, -Math.PI / 4, 0]}>
              {/* Central Core (Remains static) */}
              <mesh>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} wireframe />
              </mesh>

              {achievements.map((item) => (
                <BlueprintPart 
                  key={item.id} 
                  data={item} 
                  exploded={exploded} 
                  activeId={activeId}
                  setActiveId={setActiveId}
                  isMobile={isMobile}
                />
              ))}
            </group>
          </Float>

          <MeasurementGrid />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            autoRotate={!activeId && !isMobile}
            autoRotateSpeed={0.5}
            enableDamping={true}
          />
        </Canvas>
      </div>
    </section>
  );
}
