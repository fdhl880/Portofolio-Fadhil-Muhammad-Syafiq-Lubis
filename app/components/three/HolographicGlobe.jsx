'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Marker({ lat, lon, label, onClick }) {
  // Convert lat/lon to 3D coordinates on a sphere of radius 2
  const pos = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const radius = 2.05; // slightly above surface
    return [
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    ];
  }, [lat, lon]);

  return (
    <group position={pos}>
      <mesh onClick={onClick}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
      </mesh>
      {/* Pulse ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.07, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function generateGlobePoints(count = 3000) {
  const p = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 2 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i3] = radius * Math.sin(phi) * Math.cos(theta);
      p[i3+1] = radius * Math.sin(phi) * Math.sin(theta);
      p[i3+2] = radius * Math.cos(phi);
  }
  return p;
}

export default function HolographicGlobe() {
  const globeRef = useRef();
  
  // Static points for the "stars" shell
  const points = useMemo(() => generateGlobePoints(3000), []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  const locations = [
    { lat: 3.5952, lon: 98.6722, label: 'MEDAN_HQ' },
    { lat: -7.7956, lon: 110.3695, label: 'I2ASPO_YOGYAKARTA' },
    { lat: 13.7563, lon: 100.5018, label: 'IPITEx_BANGKOK' },
    { lat: 3.1390, lon: 101.6869, label: 'MTE_KUALA_LUMPUR' }
  ];

  return (
    <group ref={globeRef}>
      {/* Main Globe Mesh */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial 
          color="#111" 
          wireframe 
          transparent 
          opacity={0.15} 
          emissive="#00f0ff" 
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Outer atmosphere glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.05} />
      </Sphere>

      {/* Points shell */}
      <Points positions={points}>
        <PointMaterial 
          transparent 
          color="#00f0ff" 
          size={0.015} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={0.3}
        />
      </Points>

      {/* Location Markers */}
      {locations.map((loc, idx) => (
        <Marker 
          key={idx} 
          lat={loc.lat} 
          lon={loc.lon} 
          label={loc.label} 
          onClick={() => {
            window.dispatchEvent(new CustomEvent('NEXUS_NOTIFY', { 
              detail: `OBJ_SCAN: ${loc.label}` 
            }));
          }}
        />
      ))}

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
    </group>
  );
}
