'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, Points, PointMaterial, useTexture, Html } from '@react-three/drei';
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
      <mesh onClick={onClick} className="cursor-pointer">
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
      </mesh>
      {/* Pulse ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.08, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* 3D Floating Label */}
      <Html position={[0, 0.15, 0]} center onClick={onClick} style={{ pointerEvents: 'none' }}>
        <div className="bg-dark/80 backdrop-blur-md border border-cyan-500/50 px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] whitespace-nowrap">
          <div className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest">{label}</div>
        </div>
      </Html>
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

  // Load realistic Earth textures from reliable open-source CDC (three-globe examples)
  const [colorMap, bumpMap, specularMap] = useTexture([
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-topology.png',
    'https://unpkg.com/three-globe/example/img/earth-water.png'
  ]);
  
  // Static points for the "stars" shell
  const points = useMemo(() => generateGlobePoints(3000), []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0015; // Slowed down slightly for realism
    }
  });

  const locations = [
    { lat: 3.5952, lon: 98.6722, label: 'MEDAN HQ' },
    { lat: -7.7956, lon: 110.3695, label: 'I2ASPO YOGYAKARTA' },
    { lat: 13.7563, lon: 100.5018, label: 'IPITEx BANGKOK' },
    { lat: 3.1390, lon: 101.6869, label: 'MTE KUALA LUMPUR' }
  ];

  return (
    <group ref={globeRef}>
      {/* Main Realistic Globe Mesh */}
      <Sphere args={[2, 64, 64]}>
        <meshPhongMaterial
           map={colorMap}
           bumpMap={bumpMap}
           bumpScale={0.015}
           specularMap={specularMap}
           specular={new THREE.Color('grey')}
        />
      </Sphere>

      {/* Atmospheric Glow */}
      <Sphere args={[2.02, 64, 64]}>
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} side={THREE.BackSide} />
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
            window.dispatchEvent(new CustomEvent('FL_NOTIFY', { 
              detail: `OBJ_SCAN: ${loc.label}` 
            }));
          }}
        />
      ))}

      <ambientLight intensity={0.2} />
      {/* Strong directional light to simulate the Sun on the realistic Earth */}
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" shadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#00f0ff" />
    </group>
  );
}
