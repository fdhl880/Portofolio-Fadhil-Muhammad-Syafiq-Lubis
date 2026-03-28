'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';

const HolographicGlobe = dynamic(() => import('../three/HolographicGlobe'), {
  ssr: false
});

export default function GlobeSection() {
  return (
    <section id="nexus-globe" className="relative h-[80vh] md:h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 bg-dark/30 border-y border-white/5">
      {/* Background HUD Layers */}
      <div className="absolute inset-x-0 top-12 flex justify-between px-12 opacity-20 hidden md:flex">
        <div className="text-[10px] font-mono font-bold tracking-[0.5em] vertical-text">NEXUS_CORE_v6 // ESTABLISHED</div>
        <div className="text-[10px] font-mono font-bold tracking-[0.5em] vertical-text">GLOBAL_REACH // ACTIVE</div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
        {/* Left Side: Text Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 order-2 lg:order-1"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-cyan-500 shadow-[0_0_10px_#00f0ff]" />
            <h2 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-widest text-gradient">
              Global Impact
            </h2>
          </div>
          
          <p className="text-muted/80 text-lg leading-relaxed max-w-xl font-display">
            The Nexus Project traverses international boundaries, participating in premier global innovation arenas from **Yogyakarta to Bangkok**.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'LOCATIONS', value: '4_NODES' },
              { label: 'GLOBAL_RANK', value: 'TOP_ELITE' },
              { label: 'NETWORK', value: 'SINCE_2024' },
              { label: 'STATUS', value: 'CONNECTED_✓' }
            ].map((stat, i) => (
              <div key={i} className="glass p-4 border-l-2 border-cyan-500/50">
                <div className="text-[9px] font-mono text-cyan-400 font-bold tracking-widest uppercase truncate">{stat.label}</div>
                <div className="text-lg font-bold text-white uppercase mt-1">{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: 3D Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="h-[400px] md:h-[600px] w-full order-1 lg:order-2 cursor-grab active:cursor-grabbing"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <HolographicGlobe />
          </Canvas>
          
          {/* Instruction Hud */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none opacity-40">
             <div className="w-1 h-3 bg-white/30" />
             <div className="text-[9px] font-mono font-bold tracking-widest uppercase">Rotate to Inspect Node Connections</div>
             <div className="w-1 h-3 bg-white/30" />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
}
