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

  // Parallax: giant text moves left on scroll
  const textX = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  // Image moves up slightly
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  // Fade out on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      {/* Giant Scrolling Outline Text */}
      <motion.div
        style={{ x: textX, opacity }}
        className="absolute inset-0 flex items-center pointer-events-none select-none whitespace-nowrap"
      >
        <h1
          className={`text-[20vw] md:text-[16vw] font-black uppercase leading-none tracking-tighter ${
            isDark ? 'hero-outline-dark' : 'hero-outline-light'
          }`}
          style={{
            WebkitTextStroke: isDark ? '2px rgba(255,255,255,0.08)' : '2px rgba(0,0,0,0.06)',
            color: 'transparent',
          }}
        >
          FADHIL MUHAMMAD SYAFIQ LUBIS&nbsp;&nbsp;FADHIL MUHAMMAD SYAFIQ LUBIS
        </h1>
      </motion.div>

      {/* Center Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {['Innovator', 'Researcher', 'Developer'].map((tag) => (
            <span
              key={tag}
              className={`px-4 py-1.5 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase border ${
                isDark
                  ? 'border-white/10 text-white/50'
                  : 'border-black/10 text-black/50'
              }`}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Portrait Cutout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: imageY }}
          className="relative w-64 h-80 md:w-80 md:h-[420px] mb-8"
        >
          <Image
            src="/images/hero-cutout.jpg"
            alt="Fadhil Muhammad Syafiq Lubis"
            fill
            className="object-cover object-top rounded-3xl"
            sizes="(max-width: 768px) 256px, 320px"
            priority
          />
          {/* Gradient overlay at bottom */}
          <div
            className={`absolute inset-0 rounded-3xl ${
              isDark
                ? 'bg-gradient-to-t from-[#0F0F11] via-transparent to-transparent'
                : 'bg-gradient-to-t from-[#EAEAEA] via-transparent to-transparent'
            }`}
          />
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className={`text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-4 ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          Fadhil Muhammad
          <br />
          Syafiq Lubis
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className={`text-sm md:text-base max-w-md leading-relaxed ${
            isDark ? 'text-white/50' : 'text-black/50'
          }`}
        >
          Building real solutions through science, technology, and creative engineering.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
      >
        <span
          className={`text-[9px] tracking-[0.4em] uppercase ${
            isDark ? 'text-white/20' : 'text-black/20'
          }`}
        >
          Scroll
        </span>
        <div
          className={`w-px h-10 relative overflow-hidden ${
            isDark ? 'bg-white/10' : 'bg-black/10'
          }`}
        >
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
