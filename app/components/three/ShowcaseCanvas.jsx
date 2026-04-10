'use client';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, ContactShadows, Environment, AdaptiveDpr } from '@react-three/drei';
import { Suspense } from 'react';

function Scene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={2000} color="#ffffff" castShadow />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1.2, 16]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.02}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={1}
            attenuationColor="#ffffff"
            color="#ffffff"
            metalness={0}
            roughness={0}
          />
        </mesh>
      </Float>

      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.3} 
        scale={15} 
        blur={2.5} 
        far={5} 
      />
    </>
  );
}

export default function ShowcaseCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: true 
        }}
      >
        <Suspense fallback={null}>
          <Scene />
          <AdaptiveDpr pixelated={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
