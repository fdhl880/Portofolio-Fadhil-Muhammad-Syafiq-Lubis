'use client';
import { motion } from 'framer-motion';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment, ContactShadows, OrbitControls } from '@react-three/drei';

function PlanetModel({ color, distort = 0, speed = 1, roughness = 0.2, metalness = 0.8, clearcoat = 1, isInternational = false }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5 * speed;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[isInternational ? 1.2 : 1, 64, 64]} />
        {distort > 0 ? (
          <MeshDistortMaterial
            color={color}
            speed={speed * 2}
            distort={distort}
            roughness={roughness}
            metalness={metalness}
            envMapIntensity={2}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            roughness={roughness}
            metalness={metalness}
            clearcoat={clearcoat}
            clearcoatRoughness={0.1}
            reflectivity={1}
            iridescence={0.5}
            envMapIntensity={1.5}
          />
        )}
      </mesh>
      
      {/* Planetary Ring for International Medals */}
      {isInternational && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1.8, 0.02, 16, 100]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.4} />
        </mesh>
      )}
    </Float>
  );
}

const international = [
  { medal: 'Gold', event: 'I2ASPO 2025', loc: 'International', color: '#ffd700', icon: '🥇', size: 'md:col-span-2', planetColor: '#FFD700', distort: 0.2 },
  { medal: 'Silver', event: 'IPITEx 2024', loc: 'Thailand', color: '#c0c0c0', icon: '🥈', size: 'md:col-span-1', planetColor: '#00f0ff', distort: 0 },
  { medal: 'Silver', event: 'MTE 2025', loc: 'Malaysia', color: '#c0c0c0', icon: '🥈', size: 'md:col-span-1', planetColor: '#8b5cf6', distort: 0 },
];

const national = [
  'Olimpiade Siswa Jenius (Gold)',
  'Olimpiade Prestasi Gemilang (Gold)',
  'OPSI Participant (Research)',
  'Best National Student Olympiad',
  'Olimpiade Siswa Pintar (Gold)',
  'Kompetisi Pelajar Berprestasi',
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-24 md:py-48 w-full max-w-7xl mx-auto px-6 md:px-12 overflow-hidden">
      
      <div className="mb-16 md:mb-24 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-cyan-400 block mb-6">MISSION_LOG // ORBITAL_CREDENTIALS</span>
            <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-white">
               AWARDS<span className="text-cyan-500 text-3xl">.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-xs text-sm md:text-lg leading-relaxed font-medium">
             Celestial milestones representing the highest trajectory of scientific innovation.
          </p>
        </motion.div>
      </div>

      {/* Bento Grid: Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        
        {/* International Highlights with 3D Planets */}
        {international.map((item, i) => (
          <motion.div
            key={item.event}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`${item.size} group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-8 md:p-10 flex flex-col justify-between hover:bg-white/[0.03] transition-all h-[400px] md:h-[450px]`}
          >
            {/* 3D Celestial Model */}
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
               <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color={item.planetColor} />
                    <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
                    <PlanetModel 
                      color={item.planetColor} 
                      isInternational={item.size.includes('col-span-2')} 
                      distort={item.distort}
                      speed={item.size.includes('col-span-2') ? 0.3 : 1}
                    />
                    <Environment preset="city" />
                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                  </Suspense>
               </Canvas>
            </div>

            <div className="relative z-10">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-bold mb-2 block">
                {item.medal} Medal // 0{i+1}
              </span>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight">
                {item.event}
              </h3>
            </div>
            
            <div className="mt-auto relative z-10 flex items-center justify-between">
               <div>
                  <p className="text-white/40 text-xs font-mono mb-1 uppercase tracking-widest">DEPLOYMENT_SITE</p>
                  <span className="text-sm text-white/80 font-bold tracking-wider">{item.loc}</span>
               </div>
               <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-white/10">
                  <span className="text-xl">{item.icon}</span>
               </div>
            </div>
          </motion.div>
        ))}

        {/* DATA-VIZ METRIC: Innovation Score */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="md:col-span-2 overflow-hidden border border-white/10 bg-[#020208] rounded-3xl p-8 md:p-10 flex flex-col justify-between group relative"
        >
           <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-[0.4em]">Global_Innovation_Index</span>
              <div className="flex gap-1">
                 {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: `${i*150}ms` }} />)}
              </div>
           </div>

           <div className="my-6 relative z-10">
              <div className="flex items-baseline gap-2">
                 <motion.span 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   className="font-display text-7xl md:text-9xl font-bold text-white tracking-tighter"
                 >
                   99.2
                 </motion.span>
                 <span className="text-3xl font-display font-medium text-cyan-400/60">%</span>
              </div>
              <p className="text-white/30 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mt-2">Precision Intelligence Rating // CORE_STABILITY</p>
           </div>

           {/* Animated Sparkline */}
           <div className="h-20 w-full relative mt-4 z-10">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                 <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M0,10 Q10,5 20,10 T40,10 T60,5 T80,15 T100,2"
                    fill="none"
                    stroke="url(#sparkline-gradient-final)"
                    strokeWidth="1.5"
                 />
                 <defs>
                    <linearGradient id="sparkline-gradient-final" x1="0" y1="0" x2="1" y2="0">
                       <stop offset="0%" stopColor="#06b6d4" />
                       <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                 </defs>
              </svg>
           </div>

           {/* Glow Background */}
           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        </motion.div>

        {/* National Honor Board Bento */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="md:col-span-2 glass rounded-3xl p-8 md:p-10 border border-white/5 flex flex-col justify-between relative overflow-hidden h-[300px]"
        >
           <div className="relative z-10">
              <h4 className="font-display text-lg font-bold text-white/80 mb-6 flex items-center gap-4">
                 Honor_Board // National
                 <div className="h-px flex-grow bg-white/10" />
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {national.map((item, i) => (
                   <div key={i} className="flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-all scale-100 group-hover:scale-125" />
                      <span className="text-xs text-white/40 group-hover:text-white/90 transition-colors font-medium tracking-wide uppercase">{item}</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="absolute top-0 right-[-10%] w-full h-full opacity-10 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5] }}>
                 <PlanetModel color="#8b5cf6" speed={0.2} roughness={0.5} metalness={0.2} />
              </Canvas>
           </div>
        </motion.div>

      </div>
      
      {/* Cosmetic Grid Lines (Aerospace style) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />
    </section>
  );
}

export const timeline = [
  {
    year: '2024',
    title: 'Orbit_Injection // IPITEx',
    desc: 'Represented Indonesia at IPITEx 2024 in Thailand, winning a Silver Medal for innovative research.',
    color: '#00f0ff',
  },
  {
    year: '2025',
    title: 'Trajectory_Adjustment // MTE',
    desc: 'Showcased innovation at MTE 2025, earning a Silver Medal in international competition.',
    color: '#8b5cf6',
  },
  {
    year: '2025',
    title: 'Apogee_Reached // I2ASPO',
    desc: 'Achieved Gold Medal at I2ASPO 2025, demonstrating excellence in scientific innovation.',
    color: '#ffd700',
  },
  {
    year: 'Expansion',
    title: 'Interstellar_Protocol',
    desc: 'Expanding into engineering, finance, and entrepreneurship while pursuing academic excellence.',
    color: '#00f0ff',
  },
];
