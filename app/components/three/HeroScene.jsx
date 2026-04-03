'use client';
import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, geometry, speed = 1, scale = 1 }) {
  const ref = useRef();
  const velocity = useRef(new THREE.Vector3());
  const origin = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += delta * speed * 0.5;
    ref.current.rotation.y += delta * speed * 0.3;

    // Apply Velocity
    ref.current.position.addScaledVector(velocity.current, delta);
    
    // Tension (Spring back to origin)
    const tension = origin.clone().sub(ref.current.position).multiplyScalar(2.0);
    velocity.current.addScaledVector(tension, delta);
    
    // Friction
    velocity.current.multiplyScalar(0.92);
  });

  const handleSmash = (e) => {
    e.stopPropagation();
    // Simulate high-impact physics hit
    velocity.current.set(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40,
      -30 // Push it back into the screen
    );
  };

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh 
        ref={ref} 
        position={position} 
        scale={scale}
        onPointerEnter={handleSmash}
      >
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
  const data = useMemo(() => {
    // Moved random logic into a seeded-like structure to stabilize
    const random = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => ({
      x: (random(i * 123) - 0.5) * 18,
      y: (random(i * 456) - 0.5) * 14,
      z: (random(i * 789) - 0.5) * 12,
      speed: random(i * 111) * 0.4 + 0.1,
      offset: random(i * 222) * Math.PI * 2,
    }));
  }, [count]
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
  const { camera, size } = useThree();
  const isPortrait = size.height > size.width;
  
  useFrame((state) => {
    const { camera } = state;
    // Dynamic FOV based on aspect ratio
    const targetFov = isPortrait ? 85 : 55;
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);
    
    // Adjust Z distance for mobile
    const targetZ = isPortrait ? 10 : 7;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.updateProjectionMatrix();

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.4, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.25 + 0.5, 0.03);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 9], fov: 55 }}
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
