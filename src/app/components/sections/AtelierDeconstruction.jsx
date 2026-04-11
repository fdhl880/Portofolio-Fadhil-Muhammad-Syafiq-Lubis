'use client';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Html, ContactShadows, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function DeconstructionCylinder({ progress }) {
  const group = useRef();
  
  // Custom materials for a luxury feel
  const outerMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#D4AF37', // Atelier Gold
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 2,
    clearcoat: 1,
  }), []);

  const innerMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.8,
  }), []);

  const wireframeMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#ffffff',
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  }), []);

  // Animate parts based on scroll progress
  useFrame((state) => {
    if (!group.current) return;
    
    // Rotate the whole core for an ambient feel
    group.current.rotation.y += 0.002;

    const children = group.current.children;
    children.forEach((child, i) => {
      // Logic for 'exploding' the cylinder layers
      // Outer layers move further out, inner layers stay more central
      const factor = (i + 1) * 2;
      const targetY = progress.value * factor;
      child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.1);
      
      // Rotate layers in different directions
      child.rotation.y += (i % 2 === 0 ? 0.005 : -0.005) * (1 + progress.value);
    });
  });

  return (
    <group ref={group}>
      {/* Layer 1: The Base Structural Ring */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 64]} />
        <primitive object={outerMaterial} />
      </mesh>

      {/* Layer 2: Logic Array (Middle) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.4, 64, 1, true]} />
        <primitive object={wireframeMaterial} />
        <Html position={[2.5, 0, 0]} distanceFactor={10}>
          <div className="bg-black/80 backdrop-blur-md border border-white/20 p-3 rounded-none whitespace-nowrap">
            <span className="text-[8px] text-[#D4AF37] uppercase tracking-[0.3em] block mb-1">Module // 01</span>
            <span className="text-[10px] text-white font-mono uppercase">Logic_Array_v4</span>
          </div>
        </Html>
      </mesh>

      {/* Layer 3: Power Core (Internal) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <primitive object={innerMaterial} />
        <pointLight intensity={5} color="#ffffff" distance={10} />
      </mesh>

      {/* Layer 4: Tactical Casing (Top/Bottom Plates) */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 0.1, 64]} />
        <primitive object={outerMaterial} />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 0.1, 64]} />
        <primitive object={outerMaterial} />
      </mesh>

      {/* Atmospheric Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(300).map(() => (Math.random() - 0.5) * 10)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.5} />
      </points>
    </group>
  );
}

export default function AtelierDeconstruction() {
  const container = useRef(null);
  const progress = useRef({ value: 0 });

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: container.current,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        progress.current.value = self.progress;
      }
    });
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative w-full h-[150vh] bg-[#050505] flex flex-col items-center py-24 overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#ffffff22_0%,_transparent_70%)]" />

        <div className="relative w-full h-3/4">
          <Canvas shadowSelection>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#D4AF37" />
            
            <Environment preset="city" />
            
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <DeconstructionCylinder progress={progress.current} />
            </Float>

            <ContactShadows 
              position={[0, -4, 0]} 
              opacity={0.4} 
              scale={20} 
              blur={2} 
              far={4.5} 
            />
          </Canvas>
        </div>

        {/* Floating Text Headers */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <h2 className="text-[10px] md:text-xs tracking-[1.5rem] md:tracking-[2.5rem] text-[#D4AF37] uppercase font-sans mb-4 ml-[1.5rem] md:ml-[2.5rem]">
            Core_Discovery
          </h2>
          <div className="h-24 w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto" />
        </div>

        <div className="absolute bottom-24 w-full px-8 md:px-24 flex justify-between items-end pointer-events-none z-10">
           <div className="max-w-xs">
              <span className="text-[8px] text-white/40 uppercase tracking-[0.5em] block mb-2 font-mono">Status // Operational</span>
              <p className="text-[10px] text-white/60 uppercase leading-relaxed font-sans tracking-widest">
                Revealing the architectural layers of robotic precision and neural logic.
              </p>
           </div>
           <div className="text-right">
              <span className="text-4xl md:text-6xl font-playfair text-white/5 opacity-20 block leading-none">CYLIN_V04</span>
           </div>
        </div>

      </div>
    </section>
  );
}
