'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Medal({ position, color = '#ffffff', speed = 1 }) {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.5 * speed;
    group.current.position.y = position[1] + Math.sin(t * speed) * 0.12;
  });
  return (
    <group ref={group} position={position}>
      {/* Medal disc */}
      <mesh>
        <cylinderGeometry args={[0.45, 0.45, 0.06, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      {/* Medal rim */}
      <mesh>
        <torusGeometry args={[0.45, 0.035, 8, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Star on medal */}
      <mesh position={[0, 0, 0.04]}>
        <circleGeometry args={[0.15, 5]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

function Podium({ position, height, color = '#ffffff' }) {
  return (
    <Float speed={0.8} floatIntensity={0.2}>
      <mesh position={[position[0], position[1] - 0.5 + height / 2, position[2]]}>
        <cylinderGeometry args={[0.5, 0.65, height, 6]} />
        <meshStandardMaterial
          color="#050505"
          emissive={color}
          emissiveIntensity={0.04}
          metalness={0.9}
          roughness={0.1}
          flatShading={true}
        />
      </mesh>
      {/* Glowing top ring */}
      <mesh position={[position[0], position[1] - 0.5 + height, position[2]]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.01, 6, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}

function SpotlightBeam({ position, color = '#ffffff' }) {
  return (
    <mesh position={[position[0], position[1] + 3, position[2]]}>
      <coneGeometry args={[0.8, 4, 8, 1, true]} />
      <meshBasicMaterial color={color} transparent opacity={0.02} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function TrophyScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5.5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', minHeight: '350px' }}
    >
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 6, 2]} intensity={2.5} angle={0.5} penumbra={0.8} color="#ffffff" />
      <pointLight position={[-4, 3, 3]} intensity={0.5} color="#ffffff" />
      <pointLight position={[4, 3, 3]} intensity={0.5} color="#ffffff" />

      {/* Three podiums */}
      <Podium position={[-2, 0, 0]} height={1.2} color="#888888" />
      <Podium position={[0, 0, 0]} height={1.8} color="#ffffff" />
      <Podium position={[2, 0, 0]} height={0.9} color="#444444" />

      {/* Rotating medals */}
      <Medal position={[-2, 1.2, 0]} color="#aaaaaa" speed={0.8} />
      <Medal position={[0, 1.8, 0]} color="#ffffff" speed={1} />
      <Medal position={[2, 0.9, 0]} color="#555555" speed={0.6} />

      {/* Spotlight beams */}
      <SpotlightBeam position={[-2, 0, 0]} color="#888888" />
      <SpotlightBeam position={[0, 0, 0]} color="#ffffff" />
      <SpotlightBeam position={[2, 0, 0]} color="#444444" />
    </Canvas>
  );
}
