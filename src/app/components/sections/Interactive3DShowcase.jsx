'use client';
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

function HelmetModel({ skin, color }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const skinDetails = {
    chrome: { metalness: 0.95, roughness: 0.05, wireframe: false },
    carbon: { metalness: 0.5, roughness: 0.8, wireframe: false },
    titanium: { metalness: 0.8, roughness: 0.2, wireframe: true },
  };

  const matProps = skinDetails[skin] || skinDetails.chrome;

  return (
    <group ref={ref} position={[0, -0.2, 0]} scale={1.8}>
      {/* Outer Shell (Helmet Main Body) */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          metalness={matProps.metalness}
          roughness={matProps.roughness}
          wireframe={matProps.wireframe}
        />
      </mesh>

      {/* Visor (Shield) */}
      <mesh position={[0, 0.1, 0.45]} rotation={[0.1, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
        <meshStandardMaterial 
          color={skin === 'carbon' ? '#111111' : '#ffffff'}
          metalness={0.9}
          roughness={0.05}
          transparent={true}
          opacity={0.8}
          emissive={skin === 'carbon' ? '#000000' : '#ffffff'}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Visor Trim Line */}
      <mesh position={[0, 0.1, 0.46]} rotation={[0.1, 0, 0]}>
        <torusGeometry args={[0.55, 0.015, 8, 32, Math.PI]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Lower Chin Vent / Aerodynamic Wing */}
      <mesh position={[0, -0.4, 0.6]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.5, 0.2, 0.3]} />
        <meshStandardMaterial 
          color="#111111"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Ear pods */}
      <mesh position={[0.88, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[-0.88, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
}

export default function Interactive3DShowcase() {
  const [skin, setSkin] = useState('chrome');
  const [color, setColor] = useState('#ffffff');

  const skins = [
    { id: 'chrome', label: 'METALLIC CHROME' },
    { id: 'carbon', label: 'MATTE CARBON' },
    { id: 'titanium', label: 'TITANIUM WIREFRAME' },
  ];

  const colors = [
    { hex: '#ffffff', label: 'WHITE' },
    { hex: '#222222', label: 'DARK GREY' },
    { hex: '#888888', label: 'SILVER' },
  ];

  return (
    <section className="bg-black py-40 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.5em] font-mono text-white/30 block mb-3">/ 3D SHOWCASE</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">
              HELMET<br />GENERATOR.
            </h2>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-white/40 max-w-xs md:text-right">
            CLONING LANDONORRIS.COM INTERACTIVE 3D GEAR CUSTOMIZER
          </div>
        </div>

        {/* Customizer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border border-white/10 p-4 bg-neutral-950/20">
          
          {/* 3D Canvas viewport */}
          <div className="lg:col-span-8 h-[450px] bg-black relative border border-white/5">
            <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
              <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#ffffff" />
              <pointLight position={[0, -2, 2]} intensity={0.5} />
              
              <HelmetModel skin={skin} color={color} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
            </Canvas>

            {/* Viewport UI overlays */}
            <div className="absolute top-4 left-4 pointer-events-none font-mono text-[9px] text-white/40 tracking-widest">
              MODEL_ID: HELMET_GEN_V4 // DRAG TO ROTATE
            </div>
          </div>

          {/* Settings Control Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 bg-black border border-white/5">
            
            {/* Skin select */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-white/30 block mb-3">01 / SELECT MATERIAL</span>
                <div className="flex flex-col gap-2">
                  {skins.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSkin(s.id)}
                      className={`w-full text-left p-4 border text-[10px] font-mono tracking-widest uppercase transition-colors cursor-pointer ${
                        skin === s.id ? 'border-white bg-white text-black' : 'border-white/10 text-white/55 hover:border-white/30'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color select */}
              <div>
                <span className="text-[9px] font-mono tracking-widest text-white/30 block mb-3">02 / CHOOSE COLOR</span>
                <div className="flex gap-2">
                  {colors.map(c => (
                    <button
                      key={c.hex}
                      onClick={() => setColor(c.hex)}
                      className={`flex-1 p-3 border text-[9px] font-mono tracking-widest uppercase transition-colors cursor-pointer text-center ${
                        color === c.hex ? 'border-white text-white' : 'border-white/10 text-white/40 hover:border-white/20'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Spec readout */}
            <div className="border-t border-white/10 pt-6 mt-8 font-mono text-[9px] text-white/30 tracking-widest flex flex-col gap-2">
              <div className="flex justify-between">
                <span>SPEC WEIGHT</span>
                <span className="text-white">1250G (CARBON)</span>
              </div>
              <div className="flex justify-between">
                <span>VISOR LEVEL</span>
                <span className="text-white">FIA APPROVED</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
