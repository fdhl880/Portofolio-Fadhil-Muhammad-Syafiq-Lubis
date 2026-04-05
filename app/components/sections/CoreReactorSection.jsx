'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Html, Stars, Cylinder, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// 3D Procedural Reactor Assembly
function ReactorAssembly({ scrollProgress }) {
  const coreRef = useRef();
  const leftShellRef = useRef();
  const rightShellRef = useRef();
  const topRingRef = useRef();
  const bottomRingRef = useRef();
  const shardsRef = useRef();

  const dummy = new THREE.Object3D();
  const shardCount = 20;

  useFrame((state, delta) => {
    const p = scrollProgress.get() || 0; // 0 to 1

    // Core pulsing logic
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (0.5 + p * 2);
      coreRef.current.rotation.x += delta * (0.2 + p);
      // Grow slightly when exposed
      const targetScale = 1 + p * 0.5;
      coreRef.current.scale.setScalar(THREE.MathUtils.lerp(coreRef.current.scale.x, targetScale, 0.1));
    }

    // Exploding Mechanics based on Scroll (p)
    if (leftShellRef.current) {
      leftShellRef.current.position.x = THREE.MathUtils.lerp(leftShellRef.current.position.x, -p * 15, 0.1);
      leftShellRef.current.rotation.z = THREE.MathUtils.lerp(leftShellRef.current.rotation.z, -p * Math.PI, 0.1);
    }
    if (rightShellRef.current) {
      rightShellRef.current.position.x = THREE.MathUtils.lerp(rightShellRef.current.position.x, p * 15, 0.1);
      rightShellRef.current.rotation.z = THREE.MathUtils.lerp(rightShellRef.current.rotation.z, p * Math.PI, 0.1);
    }
    if (topRingRef.current) {
      topRingRef.current.position.y = THREE.MathUtils.lerp(topRingRef.current.position.y, p * 10, 0.1);
      topRingRef.current.rotation.x = THREE.MathUtils.lerp(topRingRef.current.rotation.x, p * Math.PI / 2, 0.1);
    }
    if (bottomRingRef.current) {
      bottomRingRef.current.position.y = THREE.MathUtils.lerp(bottomRingRef.current.position.y, -p * 10, 0.1);
      bottomRingRef.current.rotation.x = THREE.MathUtils.lerp(bottomRingRef.current.rotation.x, -p * Math.PI / 2, 0.1);
    }

    // Explode debris/shards
    if (shardsRef.current) {
      for (let i = 0; i < shardCount; i++) {
        // We use Math.sin seeded by i to spread them out procedurally
        const angle = (i / shardCount) * Math.PI * 2;
        const radius = p * 25; // Expands outward
        const yOffset = Math.sin(i * 10) * p * 15;
        const zOffset = Math.cos(i * 5) * p * 15;

        dummy.position.set(
          Math.cos(angle) * (2 + radius),
          Math.sin(angle) * 2 + yOffset,
          Math.sin(i) * 2 + zOffset
        );
        dummy.rotation.set(
          state.clock.elapsedTime * (Math.sin(i)) + p * 5,
          state.clock.elapsedTime * (Math.cos(i)) + p * 5,
          0
        );
        dummy.scale.setScalar(Math.max(0, 1 - p * 0.5)); // Shrink as they fly away
        dummy.updateMatrix();
        shardsRef.current.setMatrixAt(i, dummy.matrix);
      }
      shardsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Central Quantum Brain Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <MeshDistortMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2}
          wireframe
          distort={0.4}
          speed={5}
        />
        <pointLight intensity={5} color="#00f0ff" distance={20} />
      </mesh>

      {/* Solid inner core to hide background */}
      <mesh scale={1.4}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#020208" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Left Outer Containment Shell */}
      <mesh ref={leftShellRef} position={[-0.5, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32, Math.PI, Math.PI]} />
        <meshPhysicalMaterial color="#1a1a24" roughness={0.4} metalness={0.8} clearcoat={1} wireframe={false} />
      </mesh>

      {/* Right Outer Containment Shell */}
      <mesh ref={rightShellRef} position={[0.5, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32, 0, Math.PI]} />
        <meshPhysicalMaterial color="#1a1a24" roughness={0.4} metalness={0.8} clearcoat={1} />
      </mesh>

      {/* Accelerator Rings */}
      <mesh ref={topRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.2, 16, 64]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
      </mesh>
      
      <mesh ref={bottomRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.1, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
      </mesh>

      {/* Exploding Micro-Shards */}
      <instancedMesh ref={shardsRef} args={[null, null, shardCount]}>
        <boxGeometry args={[0.2, 0.5, 0.1]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
      </instancedMesh>
    </group>
  );
}

export default function CoreReactorSection() {
  const sectionRef = useRef(null);
  
  // Create a heavy 300vh scrolling section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [0, 1, 0]);
  const coreTextOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const coreScale = useTransform(scrollYProgress, [0.8, 1], [0.8, 1]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full bg-[#020208] z-20">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
           <Canvas camera={{ position: [0, 0, 20] }}>
              <Stars radius={50} depth={50} count={2000} factor={4} fade />
           </Canvas>
        </div>

        {/* 3D Exploding Core Canvas */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <ReactorAssembly scrollProgress={scrollYProgress} />
          </Canvas>
        </div>

        {/* HTML Typography Overlay */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none">
           
           <motion.div 
             style={{ opacity: titleOpacity }}
             className="absolute top-1/4 text-center"
           >
              <h2 className="text-xl md:text-3xl font-mono text-cyan-500 tracking-[0.5em] uppercase glow-cyan">
                 Extracting The Core
              </h2>
              <p className="text-white/50 tracking-widest text-xs mt-4 uppercase">
                 Initiating Disassembly Protocol...
              </p>
           </motion.div>

           <motion.div 
             style={{ opacity: coreTextOpacity, scale: coreScale }}
             className="absolute bottom-1/4 text-center max-w-2xl px-4"
           >
              <h3 className="text-4xl md:text-6xl font-display font-bold text-white drop-shadow-[0_0_30px_#00f0ff] mb-6">
                 PURE INNOVATION
              </h3>
              <p className="text-white/80 font-sans leading-relaxed text-sm md:text-lg bg-black/40 p-6 rounded-2xl border border-[#00f0ff]/30 backdrop-blur-md">
                 Behind the complex engineering systems, financial models, and start-up mechanics lies a singular, unyielding core: 
                 <br/><strong className="text-cyan-400 mt-2 block">The restless drive to solve impossible problems.</strong>
              </p>
           </motion.div>
        </div>

        {/* Scroll Progress Indicator for this section specifically */}
        <div className="absolute left-8 h-1/2 w-1 bg-white/10 rounded-full top-1/2 -translate-y-1/2 overflow-hidden z-20">
           <motion.div 
             className="w-full bg-gradient-to-b from-cyan-400 to-violet-500 shadow-[0_0_10px_#00f0ff]" 
             style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }} 
           />
        </div>

      </div>
    </section>
  );
}
