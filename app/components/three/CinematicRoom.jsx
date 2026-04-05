'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, Grid, Environment, Stars, MeshDistortMaterial } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

function SceneContent({ scrollYProgress }) {
  const cameraRef = useRef();
  
  // Create cyber-architectural pillars
  const pillars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 15,
      z: -Math.random() * 100 - 10,
      scale: [Math.random() * 2 + 0.5, Math.random() * 15 + 5, Math.random() * 2 + 0.5],
      color: Math.random() > 0.8 ? '#00f0ff' : '#1a1a2e',
      glow: Math.random() > 0.85
    }));
  }, []);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;
    
    // Get scroll progress (0 to 1) from the browser
    const scroll = scrollYProgress.get() || 0;
    
    // Scrollytelling Camera Movement
    // The deeper we scroll, the deeper we fly into the Nexus structure
    const targetZ = 5 - (scroll * 100);
    
    // Smooth cinematic panning (looking left/right as we move)
    const targetRotY = Math.sin(scroll * Math.PI * 6) * 0.15;
    const targetRotX = Math.cos(scroll * Math.PI * 4) * 0.05;

    // Use dampening for a very smooth transition, overriding direct assignment
    cameraRef.current.position.z = THREE.MathUtils.damp(cameraRef.current.position.z, targetZ, 4, delta);
    cameraRef.current.rotation.y = THREE.MathUtils.damp(cameraRef.current.rotation.y, targetRotY, 4, delta);
    cameraRef.current.rotation.x = THREE.MathUtils.damp(cameraRef.current.rotation.x, targetRotX, 4, delta);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} fov={60} />
      
      {/* Lighting for Dramatic Atmosphere */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[0, 5, -50]} intensity={150} distance={100} color="#8b5cf6" />
      
      {/* Deep Space Background */}
      <Stars radius={150} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
      
      {/* The Nexus Grid Floor */}
      <Grid 
        position={[0, -8, -50]} 
        args={[200, 200]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#00f0ff" 
        sectionSize={5} 
        sectionThickness={1.5} 
        sectionColor="#8b5cf6" 
        fadeDistance={80} 
      />
      
      {/* The Nexus Grid Ceiling */}
      <Grid 
        position={[0, 8, -50]} 
        rotation={[Math.PI, 0, 0]}
        args={[200, 200]} 
        cellSize={1} 
        cellThickness={0.5} 
        cellColor="#00f0ff" 
        sectionSize={5} 
        sectionThickness={1} 
        sectionColor="#8b5cf6" 
        fadeDistance={50} 
      />

      {/* The Quantum Singularity Core (End of the tunnel) */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[0, 0, -100]}>
        <mesh>
          <icosahedronGeometry args={[4, 1]} />
          <meshStandardMaterial color="#00f0ff" wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[3, 64, 64]} />
          <MeshDistortMaterial color="#8b5cf6" speed={4} distort={0.6} emissive="#8b5cf6" emissiveIntensity={0.8} />
        </mesh>
        <pointLight intensity={200} distance={50} color="#00f0ff" />
      </Float>

      {/* Cyberpunk Architectural Data Pillars */}
      {pillars.map((props, i) => (
        <mesh key={i} position={[props.x, props.y, props.z]} scale={props.scale}>
          <boxGeometry />
          <meshStandardMaterial 
            color={props.color} 
            metalness={0.9} 
            roughness={0.1} 
            emissive={props.glow ? props.color : '#000'}
            emissiveIntensity={props.glow ? 1 : 0}
            transparent={!props.glow}
            opacity={props.glow ? 1 : 0.6}
            wireframe={Math.random() > 0.9}
          />
        </mesh>
      ))}
    </>
  );
}

export default function CinematicRoom() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#020208] pointer-events-none">
      <Canvas shadows dpr={[1, 2]}>
        <SceneContent scrollYProgress={scrollYProgress} />
        <Environment preset="night" />
      </Canvas>
      
      {/* Sci-Fi Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] mix-blend-overlay" />
    </div>
  );
}
