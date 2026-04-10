'use client';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, ContactShadows, Environment, AdaptiveDpr } from '@react-three/drei';
import { Suspense } from 'react';

function Scene() {
  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1000} color="#ffffff" castShadow />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial 
            color="#ffffff" 
            speed={1.5} 
            distort={0.2} 
            roughness={0} 
            metalness={1} 
          />
        </Sphere>
      </Float>

      <ContactShadows 
        position={[0, -1.8, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2.5} 
        far={4.5} 
      />
    </>
  );
}

export default function ShowcaseCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
          <AdaptiveDpr pixelated={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
