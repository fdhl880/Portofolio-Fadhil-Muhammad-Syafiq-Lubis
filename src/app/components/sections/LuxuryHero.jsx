'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('../three/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

export default function LuxuryHero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-1 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pointer-events-none">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-section-title mb-8"
        >
          Innovator &bull; Engineer &bull; Researcher
        </motion.div>

        {/* Giant Name */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-extrabold leading-[0.85] tracking-[-0.05em] uppercase select-none"
          style={{ fontSize: 'clamp(4rem, 18vw, 16rem)' }}
        >
          FADHIL
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-body-lg mt-6 max-w-lg"
        >
          Building real solutions through science, technology, and code.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-3 z-10 pointer-events-none"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/20">Scroll</span>
        <div className="w-px h-10 bg-white/10 relative overflow-hidden">
          <div className="w-full h-4 bg-white/40 scroll-indicator-anim" />
        </div>
      </motion.div>
    </section>
  );
}
