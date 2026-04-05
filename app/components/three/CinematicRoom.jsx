'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

function SpaceScene({ scrollYProgress }) {
  const cameraRef = useRef();

  useFrame((state, delta) => {
    if (!cameraRef.current) return;
    
    // Get scroll progress (0 to 1) from the browser
    const scroll = scrollYProgress.get() || 0;
    
    // Fly-through Space Mechanic:
    // Move forward deep into the starfield as the user scrolls down
    const targetZ = -(scroll * 100);
    
    // Subtle cinematic banking effect
    const targetRotZ = Math.sin(scroll * Math.PI) * 0.1;
    const targetRotY = Math.cos(scroll * Math.PI) * 0.05;

    cameraRef.current.position.z = THREE.MathUtils.damp(cameraRef.current.position.z, targetZ, 4, delta);
    cameraRef.current.rotation.z = THREE.MathUtils.damp(cameraRef.current.rotation.z, targetRotZ, 4, delta);
    cameraRef.current.rotation.y = THREE.MathUtils.damp(cameraRef.current.rotation.y, targetRotY, 4, delta);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 0]} fov={70} />
      
      {/* Ambient starlight */}
      <ambientLight intensity={0.5} />
      
      {/* 
        ULTRA LIGHTWEIGHT STARS: 
        Reduced count to 2000 for maximum 60fps performance on low-end devices.
        Spread over a massive depth (200) to allow long scroll flying.
      */}
      <Stars radius={100} depth={200} count={2000} factor={6} saturation={1} fade speed={2} />
    </>
  );
}

export default function CinematicRoom() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-[#020208] pointer-events-none">
      {/* 
        PERFORMANCE OPTIMIZATIONS:
        - dpr={[1, 1.5]} limits pixel crushing on 4k/Retina screens
        - antialias={false} disabled for raw speed (stars don't need it)
        - powerPreference informs browser to prioritize GPU
      */}
      <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false }}>
        <SpaceScene scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
