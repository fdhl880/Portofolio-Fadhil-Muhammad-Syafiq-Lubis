'use client';
import { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import { usePerformance } from '@/app/context/PerformanceContext';

// Asteroid generation data (static, created once)
const asteroidCount = 100; // Reduced from 150 for better baseline
const asteroidData = Array.from({ length: asteroidCount }, () => ({
  pos: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
  rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
  scale: Math.random() * 0.8 + 0.1,
  spinSpeed: Math.random() * 0.005,
}));

// Planet data (static)
const planets = [
  { position: [30, 15, -80], size: 6, color: '#1a1a2e' },
  { position: [-40, -20, -120], size: 10, color: '#0a0a1a' },
  { position: [60, -30, -160], size: 4, color: '#111128' },
];

function SpaceScene({ scrollYProgress }) {
  const cameraRef = useRef();
  const asteroidRef = useRef();
  const { performanceTier } = usePerformance();
  const [warpSpeed, setWarpSpeed] = useState(false);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Performance-based limits - Drastically reduced for lag mitigation
  const currentAsteroids = performanceTier === 'low' ? 20 : (performanceTier === 'medium' ? 45 : asteroidCount);

  // Listen for Warp Jump command from Navbar
  useEffect(() => {
    const triggerWarp = () => {
       setWarpSpeed(true);
       setTimeout(() => setWarpSpeed(false), 800);
    };
    
    window.addEventListener('WARP_JUMP', triggerWarp);
    return () => {
      window.removeEventListener('WARP_JUMP', triggerWarp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;
    
    const scroll = scrollYProgress.get() || 0;
    
    // Scrollytelling Space Flight
    const targetZ = -(scroll * 120);
    const targetRotZ = Math.sin(scroll * Math.PI) * 0.15;
    const targetRotY = Math.cos(scroll * Math.PI) * 0.1;

    cameraRef.current.position.z = THREE.MathUtils.damp(cameraRef.current.position.z, targetZ, 4, delta);
    cameraRef.current.rotation.z = THREE.MathUtils.damp(cameraRef.current.rotation.z, targetRotZ, 4, delta);
    cameraRef.current.rotation.y = THREE.MathUtils.damp(cameraRef.current.rotation.y, targetRotY, 4, delta);

    // Warp Jump stretch effect
    const targetFov = warpSpeed ? 140 : 70;
    if (Math.abs(cameraRef.current.fov - targetFov) > 0.1) {
      cameraRef.current.fov = THREE.MathUtils.damp(cameraRef.current.fov, targetFov, 10, delta);
      cameraRef.current.updateProjectionMatrix();
    }
    if (warpSpeed) cameraRef.current.position.z -= 3;

    // Rotate Asteroids
    if (asteroidRef.current) {
      for (let i = 0; i < currentAsteroids; i++) {
        const ast = asteroidData[i];
        ast.rot[0] += ast.spinSpeed;
        ast.rot[1] += ast.spinSpeed;
        
        // Use pre-allocated dummy to update matrix
        dummy.position.set(ast.pos[0], ast.pos[1], ast.pos[2]);
        dummy.rotation.set(ast.rot[0], ast.rot[1], ast.rot[2]);
        dummy.scale.set(ast.scale, ast.scale, ast.scale);
        dummy.updateMatrix();
        asteroidRef.current.setMatrixAt(i, dummy.matrix);
      }
      asteroidRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#020208', 30, 180]} />
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 0]} fov={70} />
      
      <ambientLight intensity={0.5} />
      
      {/* Exoplanets - Reduced complexity for low-tier devices */}
      {planets.map((p, i) => (
        <mesh key={`planet-${i}`} position={p.position}>
          <icosahedronGeometry args={[p.size, performanceTier === 'low' ? 0 : 1]} />
          <meshBasicMaterial color={p.color} wireframe opacity={0.2} transparent />
        </mesh>
      ))}

      {/* Asteroid Field */}
      <instancedMesh ref={asteroidRef} args={[null, null, currentAsteroids]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#1a1a2e" wireframe />
      </instancedMesh>
      
      <Stars 
        radius={100} 
        depth={200} 
        count={performanceTier === 'high' ? 2000 : (performanceTier === 'medium' ? 800 : 300)} 
        factor={6} 
        saturation={1} 
        fade 
        speed={performanceTier === 'low' ? 1 : 3} 
      />
    </>
  );
}

export default function CinematicRoom() {
  const { scrollYProgress } = useScroll();
  const { dpr, performanceTier, isCinematic } = usePerformance();

  // "Extreme Lightness" Bypass: Completely skip Three.js on low-tier mobile hardware
  if (performanceTier === 'low' || !isCinematic) {
    return (
      <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#020208] pointer-events-none">
         {/* Lightweight CSS Stars that look premium but cost 0.1% GPU */}
         <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_90%)]" />
         <div 
           className="absolute inset-0"
           style={{
             backgroundImage: 'radial-gradient(1.5px 1.5px at 25% 25%, white, transparent), radial-gradient(1.5px 1.5px at 50% 50%, white, transparent), radial-gradient(1.5px 1.5px at 75% 75%, white, transparent)',
             backgroundSize: '200px 200px',
             opacity: 0.2
           }}
         />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#020208] pointer-events-none">
      <Canvas dpr={dpr} gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: true }}>
        <SpaceScene scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
