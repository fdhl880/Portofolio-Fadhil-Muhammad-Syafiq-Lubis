'use client';
import { motion } from 'framer-motion';
import { usePerformance } from '../../context/PerformanceContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, ContactShadows, Line, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';

const skills = [
  { name: 'Scientific Research', icon: '🔬', color: '#00f0ff', pos: [-4, 2, 0], speed: 1.5 },
  { name: 'Problem Solving', icon: '🧩', color: '#8b5cf6', pos: [4, 1.5, -1], speed: 2 },
  { name: 'Critical Thinking', icon: '🧠', color: '#ffd700', pos: [-2.5, -2.5, 1], speed: 1.2 },
  { name: 'Engineering & Tech', icon: '⚙️', color: '#ff6b9d', pos: [3, -2.5, 0], speed: 1.8 },
  { name: 'Financial Analysis', icon: '📊', color: '#00f0ff', pos: [0, 3.5, -2], speed: 1 },
  { name: 'Public Speaking', icon: '🎤', color: '#8b5cf6', pos: [0, -2, 2.5], speed: 2.5 },
];

function NetworkLines({ activeNode }) {
  return (
    <group>
      {skills.map((skill, i) => {
        const isFocus = activeNode === skill.name;
        return (
          <Line
            key={i}
            points={[[0, 0, 0], skill.pos]}
            color={isFocus ? '#ffffff' : skill.color}
            lineWidth={isFocus ? 4 : 1.5}
            transparent
            opacity={isFocus ? 0.8 : 0.2}
            dashed={!isFocus}
            dashScale={10}
            dashSize={2}
            dashOffset={0}
          />
        );
      })}
    </group>
  );
}

function CoreNode() {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });
  return (
    <Sphere ref={meshRef} args={[0.5, 32, 32]} position={[0,0,0]}>
      <MeshDistortMaterial
        color="#ffffff"
        emissive="#00f0ff"
        emissiveIntensity={1}
        distort={0.4}
        speed={4}
        transparent
        opacity={0.9}
      />
      <Html center className="pointer-events-none mt-10">
        <div className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-[0.3em] whitespace-nowrap">Core_Intel</div>
      </Html>
    </Sphere>
  );
}

function SkillNode({ skill, isActive, setActive }) {
  const meshRef = useRef();
  const { isCinematic } = usePerformance();

  useFrame((state, delta) => {
    if (isCinematic && meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * skill.speed * (isActive ? 3 : 1);
      meshRef.current.rotation.y += delta * 0.3 * skill.speed * (isActive ? 3 : 1);
    }
  });

  return (
    <Float 
      speed={isCinematic ? skill.speed : 0} 
      rotationIntensity={isCinematic ? (isActive ? 2 : 0.5) : 0} 
      floatIntensity={isCinematic ? (isActive ? 2 : 1) : 0}
    >
      <group position={skill.pos}>
        <mesh 
          ref={meshRef} 
          onPointerOver={() => setActive(skill.name)}
          onPointerOut={() => setActive(null)}
        >
          <icosahedronGeometry args={[0.5, 0]} />
          <meshPhysicalMaterial 
            color={isActive ? '#ffffff' : skill.color} 
            emissive={isActive ? '#ffffff' : skill.color} 
            emissiveIntensity={isActive ? 1 : 0.6} 
            roughness={0.1} 
            metalness={0.9}
            wireframe={true}
          />
        </mesh>
        
        <Html distanceFactor={8} zIndexRange={[100, 0]} transform>
          <div 
            className={`glass px-3 py-1.5 rounded-lg flex items-center gap-2 pointer-events-auto cursor-pointer transition-all duration-300 ${isActive ? 'scale-125' : 'hover:scale-110'}`} 
            style={{ 
              background: isActive ? `rgba(255, 255, 255, 0.1)` : 'rgba(5, 5, 20, 0.4)',
              boxShadow: `0 0 ${isActive ? 30 : 15}px ${skill.color}${isActive ? '80' : '30'}`, 
              border: `1px solid ${skill.color}${isActive ? 'a0' : '50'}`, 
              whiteSpace: 'nowrap',
              backdropFilter: isActive ? 'blur(12px)' : 'blur(8px)'
            }}
            onPointerEnter={() => setActive(skill.name)}
            onPointerLeave={() => setActive(null)}
          >
            <span className="text-xl" style={{ textShadow: `0 0 10px ${skill.color}` }}>{skill.icon}</span>
            <span className={`font-display font-semibold tracking-wide text-sm ${isActive ? 'text-white' : 'text-white/90'}`}>{skill.name}</span>
          </div>
        </Html>
      </group>
    </Float>
  );
}

export default function SkillsSection() {
  const { isCinematic } = usePerformance();
  const [activeNode, setActiveNode] = useState(null);

  return (
    <section id="skills" className="relative py-16 md:py-32 w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-0 w-full text-center z-10 pt-24 px-4 pointer-events-none">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">3D Skills Arena</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A dynamic network of abilities cultivated through innovation and competition.
            {!isCinematic && <span className="block mt-2 text-yellow-500/80 text-sm">⚡ 3D Animations paused for efficiency</span>}
          </p>
        </motion.div>
      </div>

      <div className="w-full h-[350px] md:h-[650px] relative mt-16 z-0">
        <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff6b9d" />
          
          <CoreNode />
          {isCinematic && <NetworkLines activeNode={activeNode} />}
          
          {skills.map((skill) => (
            <SkillNode 
               key={skill.name} 
               skill={skill} 
               isActive={activeNode === skill.name}
               setActive={setActiveNode}
            />
          ))}
          
          {isCinematic && (
            <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={30} blur={2.5} far={10} color="#00f0ff" />
          )}
        </Canvas>
      </div>
    </section>
  );
}
