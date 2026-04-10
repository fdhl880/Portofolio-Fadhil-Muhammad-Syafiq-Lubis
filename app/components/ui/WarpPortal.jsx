'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarField({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = Math.random() * 50;
    }
    return p;
  }, [count]);

  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.z -= delta * 5;
      if (ref.current.position.z < -25) ref.current.position.z = 25;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        color="#ffffff" 
        transparent 
        opacity={0.1} 
        sizeAttenuation 
      />
    </points>
  );
}

export default function WarpPortal() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
        <StarField />
      </Canvas>
    </div>
  );
}
