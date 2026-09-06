'use client';
import { useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';

// Dynamic import for R3F Canvas (no SSR)
const HeroScene = dynamic(
  () => import('../three/HeroScene'),
  { ssr: false }
);

export default function HeroSection({ isDark }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative min-h-screen flex flex-col justify-between items-center overflow-hidden select-none transition-colors duration-500 ${
        isDark ? 'bg-[#0F0F11] text-white' : 'bg-[#EAEAEA] text-black'
      }`}
    >
      {/* ═══ 3D WebGL Scene (Full-Screen Background) ═══ */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className={`w-full h-full flex items-center justify-center ${
            isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
          }`}>
            <div className={`w-8 h-8 border-2 rounded-full animate-spin ${
              isDark ? 'border-white/20 border-t-white' : 'border-black/20 border-t-black'
            }`} />
          </div>
        }>
          <HeroScene isDark={isDark} />
        </Suspense>
      </div>

      {/* ═══ Vignette Overlay for Text Readability ═══ */}
      <div
        className={`absolute inset-0 z-[1] pointer-events-none ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(15,15,17,0.7)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(234,234,234,0.7)_100%)]'
        }`}
      />

      {/* ═══ HTML Overlay Content ═══ */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10 pt-28 md:pt-36 pb-12 flex-1 flex flex-col items-center justify-center text-center pointer-events-none"
      >
        {/* Role Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6 pointer-events-auto"
        >
          {['Innovator', 'Researcher', 'Developer'].map((tag) => (
            <span
              key={tag}
              className={`px-3.5 py-1 rounded-full text-[10px] md:text-[11px] font-mono uppercase tracking-widest border backdrop-blur-md transition-all ${
                isDark
                  ? 'border-white/15 bg-white/[0.06] text-white/80'
                  : 'border-black/15 bg-white/[0.5] text-black/80'
              }`}
            >
              {tag}
            </span>
          ))}
          <span
            className={`px-3.5 py-1 rounded-full text-[10px] md:text-[11px] font-mono uppercase tracking-widest border flex items-center gap-1.5 backdrop-blur-md ${
              isDark
                ? 'border-white/25 bg-white/[0.1] text-white'
                : 'border-black/25 bg-white/[0.6] text-black'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white' : 'bg-black'} animate-pulse`} />
            <span>Medan, Indonesia</span>
          </span>
        </motion.div>

        {/* Name Headline */}
        <motion.div style={{ y: textY }} className="mb-5">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5vw] font-black uppercase tracking-tighter leading-[0.9] text-center">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                className={`block drop-shadow-lg ${isDark ? 'text-white' : 'text-black'}`}
              >
                Fadhil Muhammad
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1, delay: 0.55, ease: [0.215, 0.61, 0.355, 1] }}
                className={`block drop-shadow-lg ${isDark ? 'text-white/80' : 'text-black/80'}`}
              >
                Syafiq Lubis
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className={`text-sm md:text-base max-w-md mb-8 font-light tracking-wide ${
            isDark ? 'text-white/50' : 'text-black/50'
          }`}
        >
          Crafting innovation through research, design &amp; engineering
        </motion.p>

        {/* Achievement Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-xl pointer-events-auto"
        >
          <span
            className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider border font-medium backdrop-blur-md ${
              isDark
                ? 'border-white/25 bg-white/10 text-white'
                : 'border-black/25 bg-white/60 text-black'
            }`}
          >
            Gold Medal &bull; I2ASPO 2025
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider border font-medium backdrop-blur-md ${
              isDark
                ? 'border-white/15 bg-white/[0.06] text-white/80'
                : 'border-black/15 bg-white/40 text-black/80'
            }`}
          >
            Silver Medal &bull; MTE 2025
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider border font-medium backdrop-blur-md ${
              isDark
                ? 'border-white/15 bg-white/[0.06] text-white/80'
                : 'border-black/15 bg-white/40 text-black/80'
            }`}
          >
            Silver Medal &bull; IPITEX 2024
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className={`group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-all duration-300 hover:scale-105 backdrop-blur-md shadow-lg ${
              isDark
                ? 'bg-white/95 text-black hover:bg-white'
                : 'bg-black/95 text-white hover:bg-black'
            }`}
          >
            <span>Let&apos;s Talk</span>
            <span
              className={`w-9 h-9 rounded-full grid place-items-center transition-transform duration-300 group-hover:translate-x-1 ${
                isDark ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>

          <button
            onClick={() => scrollToSection('projects')}
            className={`inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium border transition-all duration-300 hover:scale-105 backdrop-blur-md ${
              isDark
                ? 'border-white/25 text-white hover:bg-white/10'
                : 'border-black/25 text-black hover:bg-black/5 bg-white/30'
            }`}
          >
            View Work
          </button>
        </motion.div>
      </motion.div>

      {/* ═══ Bottom Status Bar ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.1 }}
        className={`relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-5 border-t flex items-center justify-between text-[11px] font-mono uppercase tracking-widest ${
          isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'
        }`}
      >
        <div>Innovating since 2021</div>
        <div className="hidden sm:block">Quiet Precision &bull; Built to Scale</div>
        <div
          onClick={() => scrollToSection('about')}
          className={`inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
            isDark ? 'hover:text-white' : 'hover:text-black'
          }`}
        >
          <span>Scroll to explore</span>
          <span className="animate-bounce">↓</span>
        </div>
      </motion.div>
    </section>
  );
}
