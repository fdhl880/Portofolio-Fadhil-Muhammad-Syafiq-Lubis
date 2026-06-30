'use client';
import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, geometry, speed = 1, scale = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * speed * 0.15;
    ref.current.rotation.y = t * speed * 0.1;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 80 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 18,
      y: (Math.random() - 0.5) * 14,
      z: (Math.random() - 0.5) * 12,
      speed: Math.random() * 0.4 + 0.1,
      offset: Math.random() * Math.PI * 2,
    })), [count]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      dummy.position.set(
        d.x + Math.sin(t * d.speed + d.offset) * 0.6,
        d.y + Math.cos(t * d.speed + d.offset) * 0.4,
        d.z
      );
      dummy.scale.setScalar(0.6 + Math.sin(t * d.speed) * 0.4);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.025, 4, 4]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} />
    </instancedMesh>
  );
}

function GlowRing({ radius, color, speed = 0.3 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.sin(t * speed) * 0.4;
    ref.current.rotation.y = t * speed * 0.5;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 8, 48]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

function LightBeams() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * 0.05;
  });
  return (
    <group ref={ref}>
      {[0, 1, 2].map(i => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
          <planeGeometry args={[0.03, 12]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.06} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.4, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.25 + 0.5, 0.03);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      frameloop="always"
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[8, 8, 8]} intensity={0.6} color="#00f0ff" />
      <pointLight position={[-8, -5, -6]} intensity={0.4} color="#8b5cf6" />

      <FloatingShape
        geometry={<icosahedronGeometry args={[1, 0]} />}
        position={[-3.5, 2, -3]}
        color="#00f0ff"
        speed={0.8}
        scale={0.9}
      />
      <FloatingShape
        geometry={<octahedronGeometry args={[0.7, 0]} />}
        position={[3.5, -0.5, -4]}
        color="#8b5cf6"
        speed={0.6}
        scale={0.8}
      />
      <FloatingShape
        geometry={<dodecahedronGeometry args={[0.5, 0]} />}
        position={[1.5, 2.8, -2]}
        color="#ffd700"
        speed={1.1}
        scale={0.7}
      />
      <FloatingShape
        geometry={<tetrahedronGeometry args={[0.6, 0]} />}
        position={[-2, -2.2, -2.5]}
        color="#ff6b9d"
        speed={0.9}
      />
      <FloatingShape
        geometry={<torusGeometry args={[0.4, 0.15, 6, 12]} />}
        position={[4, 1.8, -3.5]}
        color="#00f0ff"
        speed={0.7}
        scale={0.6}
      />

      <Particles count={80} />
      <GlowRing radius={2.8} color="#00f0ff" speed={0.25} />
      <GlowRing radius={3.8} color="#8b5cf6" speed={0.18} />
      <GlowRing radius={4.5} color="#ffd700" speed={0.12} />
      <LightBeams />
      <CameraRig />
    </Canvas>
  );
}
