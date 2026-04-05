'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, MeshDistortMaterial, Stars, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

function IrisShutter({ progress }) {
  const groupRef = useRef();
  const bladeCount = 8;
  
  // Create blade geometry
  const bladeShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(2, 0.5);
    shape.lineTo(1.5, 2);
    shape.lineTo(0, 1.5);
    shape.closePath();
    return shape;
  }, []);

  const bladeParams = useMemo(() => {
    return Array.from({ length: bladeCount }, (_, i) => ({
      rotation: (i / bladeCount) * Math.PI * 2,
    }));
  }, [bladeCount]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Normal progress is 0-100, normalize it
    const nProgress = progress / 100;
    
    // Shutter opens as progress increases
    // It stays closed until about 70%, then opens rapidly
    const openFactor = Math.max(0, (nProgress - 0.7) * 3.33);
    
    groupRef.current.children.forEach((child, i) => {
      const baseRot = (i / bladeCount) * Math.PI * 2;
      // Rotate and move outwards
      child.rotation.z = baseRot + openFactor * 0.5;
      const offset = 0.5 + openFactor * 2.5;
      child.position.x = Math.cos(baseRot) * offset;
      child.position.y = Math.sin(baseRot) * offset;
    });
    
    // Slight shake as it opens
    if (nProgress > 0.65 && nProgress < 0.75) {
      groupRef.current.position.x = (Math.random() - 0.5) * 0.05;
      groupRef.current.position.y = (Math.random() - 0.5) * 0.05;
    } else {
      groupRef.current.position.x = 0;
      groupRef.current.position.y = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {bladeParams.map((p, i) => (
        <mesh key={i} rotation={[0, 0, p.rotation]}>
          <shapeGeometry args={[bladeShape]} />
          <meshStandardMaterial 
            color="#111" 
            metalness={0.9} 
            roughness={0.1} 
            emissive="#00f0ff" 
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

function LightTunnel({ progress }) {
  const meshRef = useRef();
  const nProgress = progress / 100;

  useFrame((state) => {
    if (!meshRef.current) return;
    // Speed up as progress increases
    meshRef.current.rotation.z += 0.01 + nProgress * 0.05;
    // Scale up as we "zoom" through
    const scale = 1 + nProgress * 5;
    meshRef.current.scale.set(scale, scale, 1);
  });

  return (
    <group position={[0, 0, -5]}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <mesh ref={meshRef}>
        <cylinderGeometry args={[5, 5, 20, 32, 1, true]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial 
          color="#00f0ff" 
          transparent 
          opacity={0.1} 
          wireframe 
          emissive="#00f0ff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function SceneContent({ progress }) {
  const nProgress = progress / 100;
  
  useFrame((state) => {
    // Camera dive effect
    // As progress goes from 80% to 100%, camera dives deep into the tunnel
    if (nProgress > 0.8) {
      const diveFactor = (nProgress - 0.8) * 5; // 0 to 1
      state.camera.position.z = 5 - diveFactor * 15;
      state.camera.fov = 75 + diveFactor * 40;
      state.camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <IrisShutter progress={progress} />
      </Float>
      
      <LightTunnel progress={progress} />
      
      {/* Central Core Glow */}
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial 
          color="#00f0ff" 
          speed={5} 
          distort={0.6} 
          radius={1}
          emissive="#00f0ff"
          emissiveIntensity={2}
        />
      </mesh>
    </>
  );
}

export default function QuantumAperture({ progress }) {
  return (
    <div className="absolute inset-0 z-0 bg-[#050510]">
      <Canvas shadows dpr={[1, 2]}>
        <SceneContent progress={progress} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
