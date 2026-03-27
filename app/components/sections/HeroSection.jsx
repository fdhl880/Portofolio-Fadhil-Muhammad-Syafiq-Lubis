'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const HeroScene = dynamic(() => import('../three/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-dark" />,
});

export default function HeroSection({ isMobile }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      {/* 3D Background */}
      <HeroScene />

      {/* Subtle overlay gradient for readability on mobile */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: isMobile 
            ? 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(5,5,16,0.4) 100%)' 
            : 'none'
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Photo card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateY: -15 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8 inline-block"
          style={{ perspective: '1000px' }}
        >
          <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto rounded-2xl overflow-hidden glass glow-cyan animate-float">
            <Image
              src="/images/photo1.jpg"
              alt="Fadhil Muhammad Syafiq - Gold Medal Winner"
              fill
              priority
              sizes="(max-width: 768px) 144px, 176px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          <span className="text-gradient">Fadhil Muhammad Syafiq</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-xl md:text-2xl text-muted mb-2 font-display"
        >
          Student Innovator
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-[10px] md:text-base text-muted/70 tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8"
        >
          Engineering • Finance • Entrepreneurship
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon/20 to-violet/20 border border-neon/30 text-neon font-semibold hover:from-neon/30 hover:to-violet/30 transition-all duration-300 cursor-pointer hover:scale-105"
          >
            View Portfolio
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-xl glass text-white font-semibold hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-105"
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-muted/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-neon/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
