'use client';
import { motion } from 'framer-motion';
import { usePerformance } from '../../context/PerformanceContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';

const skills = [
  { name: 'Scientific Research', icon: '🔬', color: '#00f0ff', pos: [-3.5, 1.5, 0], speed: 1.5 },
  { name: 'Problem Solving', icon: '🧩', color: '#8b5cf6', pos: [3.5, 1, -1], speed: 2 },
  { name: 'Critical Thinking', icon: '🧠', color: '#ffd700', pos: [-2, -1.8, 1], speed: 1.2 },
  { name: 'Engineering & Tech', icon: '⚙️', color: '#ff6b9d', pos: [2.5, -2, 0], speed: 1.8 },
  { name: 'Financial Analysis', icon: '📊', color: '#00f0ff', pos: [0, 2.5, -2], speed: 1 },
  { name: 'Public Speaking', icon: '🎤', color: '#8b5cf6', pos: [0, -1, 2], speed: 2.5 },
];

function SkillNode({ skill }) {
  const meshRef = useRef();
  const { isCinematic } = usePerformance();

  useFrame((state, delta) => {
    if (isCinematic && meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * skill.speed;
      meshRef.current.rotation.y += delta * 0.3 * skill.speed;
    }
  });

  return (
    <Float 
      speed={isCinematic ? skill.speed : 0} 
      rotationIntensity={isCinematic ? 0.5 : 0} 
      floatIntensity={isCinematic ? 1 : 0}
    >
      <mesh ref={meshRef} position={skill.pos}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshPhysicalMaterial 
          color={skill.color} 
          emissive={skill.color} 
          emissiveIntensity={0.6} 
          roughness={0.1} 
          metalness={0.9}
          wireframe={true}
        />
        <Html distanceFactor={8} zIndexRange={[100, 0]} transform>
          <div 
            className="glass px-3 py-1.5 rounded-lg flex items-center gap-2 pointer-events-auto cursor-pointer hover:scale-110 transition-transform duration-300" 
            style={{ 
              background: 'rgba(5, 5, 20, 0.4)',
              boxShadow: `0 0 15px ${skill.color}30`, 
              border: `1px solid ${skill.color}50`, 
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)'
            }}
          >
            <span className="text-xl" style={{ textShadow: `0 0 10px ${skill.color}` }}>{skill.icon}</span>
            <span className="font-display font-semibold text-white/90 tracking-wide text-sm">{skill.name}</span>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

export default function SkillsSection() {
  const { isCinematic } = usePerformance();

  return (
    <section id="skills" className="relative py-24 md:py-32 w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
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

      <div className="w-full h-[650px] relative mt-16 z-0">
        <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff6b9d" />
          
          {skills.map((skill) => (
            <SkillNode key={skill.name} skill={skill} />
          ))}
          
          {isCinematic && (
            <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={25} blur={2.5} far={10} color="#00f0ff" />
          )}
        </Canvas>
      </div>
    </section>
  );
}
