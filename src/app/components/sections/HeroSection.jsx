'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection({ isDark }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      {/* Running Text (Marquee) Background */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden">
        {/* Row 1 - moves left */}
        <div className="marquee-row mb-4">
          <div className="marquee-track animate-marquee-left">
            {[...Array(4)].map((_, i) => (
              <span
                key={`r1-${i}`}
                className={`text-[12vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap mx-8`}
                style={{
                  WebkitTextStroke: isDark ? '2px rgba(255,255,255,0.06)' : '2px rgba(0,0,0,0.05)',
                  color: 'transparent',
                }}
              >
                FADHIL MUHAMMAD SYAFIQ LUBIS
              </span>
            ))}
          </div>
        </div>
        {/* Row 2 - moves right */}
        <div className="marquee-row">
          <div className="marquee-track animate-marquee-right">
            {[...Array(4)].map((_, i) => (
              <span
                key={`r2-${i}`}
                className={`text-[12vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap mx-8`}
                style={{
                  WebkitTextStroke: isDark ? '2px rgba(255,255,255,0.04)' : '2px rgba(0,0,0,0.03)',
                  color: 'transparent',
                }}
              >
                INNOVATOR • RESEARCHER • DEVELOPER
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl"
      >
        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {['Innovator', 'Researcher', 'Developer'].map((tag) => (
            <span
              key={tag}
              className={`px-4 py-1.5 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase border ${
                isDark
                  ? 'border-white/10 text-white/50 bg-white/5'
                  : 'border-black/10 text-black/50 bg-black/5'
              }`}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Portrait Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: imageY }}
          className={`relative w-[260px] h-[340px] md:w-[320px] md:h-[420px] rounded-[2rem] overflow-hidden border mb-12 ${
            isDark ? 'border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]' : 'border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
          }`}
        >
          <Image
            src="/images/hero-cutout.jpg"
            alt="Fadhil Muhammad Syafiq Lubis"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 260px, 320px"
            priority
          />
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className={`text-4xl md:text-6xl lg:text-[5vw] font-black uppercase tracking-tighter leading-none mb-6 ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          Fadhil Muhammad
          <br />
          Syafiq Lubis
        </motion.h2>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
      >
        <span className={`text-[9px] tracking-[0.4em] uppercase ${isDark ? 'text-white/20' : 'text-black/20'}`}>
          Scroll
        </span>
        <div className={`w-px h-10 relative overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
          <motion.div
            className={`w-full h-4 ${isDark ? 'bg-white/40' : 'bg-black/40'}`}
            animate={{ y: ['-100%', '250%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
