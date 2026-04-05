'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars, MeshTransmissionMaterial } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

// Distant Exoplanets
const planets = [
  { position: [-60, 20, -100], size: 10, color: '#00f0ff' },
  { position: [80, -30, -150], size: 25, color: '#8b5cf6' }
];

// Asteroid Field (InstancedMesh Data)
const asteroidCount = 300;
const asteroidData = Array.from({ length: asteroidCount }, () => ({
  pos: [
    (Math.random() - 0.5) * 150, 
    (Math.random() - 0.5) * 150, 
    (Math.random() - 1) * 250
  ],
  rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
  scale: Math.random() * 2 + 0.5,
  spinSpeed: (Math.random() - 0.5) * 0.05
}));

function SpaceScene({ scrollYProgress }) {
  const cameraRef = useRef();
  const asteroidRef = useRef();
  const [warpSpeed, setWarpSpeed] = useState(false);
  const dummy = useMemo(() => new THREE.Object3D(), []);

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
    cameraRef.current.fov = THREE.MathUtils.damp(cameraRef.current.fov, targetFov, 10, delta);
    if (warpSpeed) cameraRef.current.position.z -= 3;
    cameraRef.current.updateProjectionMatrix();

    // Rotate Asteroids
    if (asteroidRef.current) {
      asteroidData.forEach((ast, i) => {
        ast.rot[0] += ast.spinSpeed;
        ast.rot[1] += ast.spinSpeed;
        dummy.position.set(ast.pos[0], ast.pos[1], ast.pos[2]);
        dummy.rotation.set(ast.rot[0], ast.rot[1], ast.rot[2]);
        dummy.scale.set(ast.scale, ast.scale, ast.scale);
        dummy.updateMatrix();
        asteroidRef.current.setMatrixAt(i, dummy.matrix);
      });
      asteroidRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#020208', 30, 180]} />
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 0]} fov={70} />
      
      <ambientLight intensity={0.5} />
      
      {/* Exoplanets */}
      {planets.map((p, i) => (
        <mesh key={`planet-${i}`} position={p.position}>
          <icosahedronGeometry args={[p.size, 1]} />
          <meshBasicMaterial color={p.color} wireframe opacity={0.2} transparent />
        </mesh>
      ))}

      {/* Asteroid Field */}
      <instancedMesh ref={asteroidRef} args={[null, null, asteroidCount]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#1a1a2e" wireframe />
      </instancedMesh>
      
      <Stars radius={100} depth={200} count={2000} factor={6} saturation={1} fade speed={3} />
    </>
  );
}

export default function CinematicRoom() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#020208] pointer-events-none">
      <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false }}>
        <SpaceScene scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
