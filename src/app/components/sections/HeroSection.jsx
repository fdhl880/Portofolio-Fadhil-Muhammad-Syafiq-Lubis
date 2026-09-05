'use client';
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection({ isDark }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Interactive 3D micro-tilt for multi-layered portrait card
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const mouseSpringConfig = { stiffness: 240, damping: 20 };
  const smoothCardX = useSpring(cardX, mouseSpringConfig);
  const smoothCardY = useSpring(cardY, mouseSpringConfig);

  const rotateX = useTransform(smoothCardY, [-150, 150], [8, -8]);
  const rotateY = useTransform(smoothCardX, [-150, 150], [-8, 8]);
  const backLayerRotate = useTransform(smoothCardX, [-150, 150], [-5, -1]);
  const backLayerX = useTransform(smoothCardX, [-150, 150], [-14, 14]);
  const backLayerY = useTransform(smoothCardY, [-150, 150], [-10, 10]);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    cardX.set(x);
    cardY.set(y);
  };

  const handleCardMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  // Subtle canvas background spotlight following pointer
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    function resize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(rect.width * dpr);
      height = Math.round(rect.height * dpr);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    }

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    let mouseX = -1000;
    let mouseY = -1000;
    let targetX = -1000;
    let targetY = -1000;

    function onPointerMove(e) {
      const rect = container.getBoundingClientRect();
      targetX = (e.clientX - rect.left) * dpr;
      targetY = (e.clientY - rect.top) * dpr;
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let animId;
    function draw() {
      mouseX += (targetX - mouseX) * 0.12;
      mouseY += (targetY - mouseY) * 0.12;

      ctx.clearRect(0, 0, width, height);

      if (mouseX > -500 && mouseY > -500) {
        const radius = Math.max(width, height) * 0.35;
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, radius);

        if (isDark) {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
          grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          grad.addColorStop(0, 'rgba(0, 0, 0, 0.05)');
          grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.015)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      animId = requestAnimationFrame(draw);
    }
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
    };
  }, [isDark]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative min-h-screen flex flex-col justify-between items-center overflow-hidden select-none isolation-isolate transition-colors duration-500 ${
        isDark ? 'bg-[#0F0F11] text-white' : 'bg-[#EAEAEA] text-black'
      }`}
    >
      {/* 1) Interactive Canvas Background Spotlight */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2) Ambient Running Marquee Behind Center Photo */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden z-[1]">
        <div className="marquee-row mb-4 opacity-35">
          <div className="marquee-track animate-marquee-left">
            {[...Array(4)].map((_, i) => (
              <span
                key={`m1-${i}`}
                className={`text-[13vw] md:text-[11vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap mx-8`}
                style={{
                  WebkitTextStroke: isDark ? '1.5px rgba(255,255,255,0.12)' : '1.5px rgba(0,0,0,0.1)',
                  color: 'transparent',
                }}
              >
                FADHIL MUHAMMAD SYAFIQ LUBIS
              </span>
            ))}
          </div>
        </div>
        <div className="marquee-row opacity-25">
          <div className="marquee-track animate-marquee-right">
            {[...Array(4)].map((_, i) => (
              <span
                key={`m2-${i}`}
                className={`text-[13vw] md:text-[11vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap mx-8`}
                style={{
                  WebkitTextStroke: isDark ? '1.5px rgba(255,255,255,0.08)' : '1.5px rgba(0,0,0,0.07)',
                  color: 'transparent',
                }}
              >
                INNOVATOR • RESEARCHER • DEVELOPER
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3) Vignette Overlay */}
      <div
        className={`absolute inset-0 z-[2] pointer-events-none ${
          isDark
            ? 'bg-gradient-to-b from-[#0F0F11]/85 via-transparent to-[#0F0F11]'
            : 'bg-gradient-to-b from-[#EAEAEA]/85 via-transparent to-[#EAEAEA]'
        }`}
      />

      {/* 4) Main Content: Centered Editorial Cover */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10 pt-28 md:pt-36 pb-12 flex-1 flex flex-col items-center justify-center text-center"
      >
        {/* Top Status & Role Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
        >
          {['Innovator', 'Researcher', 'Developer'].map((tag) => (
            <span
              key={tag}
              className={`px-3.5 py-1 rounded-full text-[10px] md:text-[11px] font-mono uppercase tracking-widest border transition-all ${
                isDark
                  ? 'border-white/15 bg-white/[0.04] text-white/80'
                  : 'border-black/15 bg-black/[0.04] text-black/80'
              }`}
            >
              {tag}
            </span>
          ))}
          <span
            className={`px-3.5 py-1 rounded-full text-[10px] md:text-[11px] font-mono uppercase tracking-widest border flex items-center gap-1.5 ${
              isDark
                ? 'border-white/25 bg-white/[0.08] text-white'
                : 'border-black/25 bg-black/[0.08] text-black'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white' : 'bg-black'} animate-pulse`} />
            <span>Medan, Indonesia</span>
          </span>
        </motion.div>

        {/* Center Name Headline (PURE BLACK & WHITE ONLY) */}
        <motion.div style={{ y: textY }} className="mb-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5vw] font-black uppercase tracking-tighter leading-[0.9] text-center">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
                className={`block ${isDark ? 'text-white' : 'text-black'}`}
              >
                Fadhil Muhammad
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.38, ease: [0.215, 0.61, 0.355, 1] }}
                className={`block ${isDark ? 'text-white/80' : 'text-black/80'}`}
              >
                Syafiq Lubis
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* MULTI-LAYER PORTRAIT CARD (Layer di belakang foto) */}
        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-7 flex justify-center items-center cursor-pointer"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          {/* Layer 1 (Paling Belakang): Offset Dashed Blueprint Layer */}
          <motion.div
            style={{ x: backLayerX, y: backLayerY }}
            className={`absolute w-[240px] h-[320px] sm:w-[290px] sm:h-[390px] md:w-[340px] md:h-[450px] rounded-[2.5rem] border border-dashed pointer-events-none translate-x-4 translate-y-4 transition-colors duration-500 ${
              isDark ? 'border-white/20 bg-white/[0.01]' : 'border-black/20 bg-black/[0.01]'
            }`}
          />

          {/* Layer 2 (Tengah): Tilted Editorial Card dengan Border & Metadata */}
          <motion.div
            style={{ rotate: backLayerRotate, x: backLayerX, y: backLayerY }}
            className={`absolute w-[240px] h-[320px] sm:w-[290px] sm:h-[390px] md:w-[340px] md:h-[450px] rounded-[2.5rem] border p-5 flex flex-col justify-between pointer-events-none backdrop-blur-sm transition-all duration-500 ${
              isDark
                ? 'border-white/20 bg-[#141416]/90 text-white/50 shadow-2xl'
                : 'border-black/20 bg-[#E0E0E0]/90 text-black/50 shadow-xl'
            }`}
          >
            <div className="flex justify-between items-center text-[9px] md:text-[10px] font-mono tracking-widest uppercase">
              <span>01 // PORTRAIT</span>
              <span>EST. 2021</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center opacity-30">
              <span className="text-3xl font-light tracking-widest">FMSL</span>
              <span className="text-[8px] font-mono tracking-widest">SERIES // 01</span>
            </div>

            <div className="flex justify-between items-center text-[9px] md:text-[10px] font-mono tracking-widest uppercase border-t border-current/15 pt-2">
              <span>MEDAN &bull; ID</span>
              <span>GOLD MEDALIST</span>
            </div>
          </motion.div>

          {/* Layer 3 (Depan): Kartu Utama dengan Foto Transparan & 3D Tilt */}
          <motion.div
            style={{ rotateX, rotateY }}
            className={`relative w-[240px] h-[320px] sm:w-[290px] sm:h-[390px] md:w-[340px] md:h-[450px] rounded-[2.5rem] overflow-hidden border z-10 transition-shadow duration-500 ${
              isDark
                ? 'border-white/25 bg-gradient-to-b from-white/15 via-white/[0.03] to-black/90 shadow-[0_30px_70px_rgba(0,0,0,0.9)]'
                : 'border-black/25 bg-gradient-to-b from-black/5 via-black/[0.02] to-white/90 shadow-[0_30px_70px_rgba(0,0,0,0.15)]'
            }`}
          >
            <Image
              src="/images/hero-transparent.png"
              alt="Fadhil Muhammad Syafiq Lubis"
              fill
              className="object-cover object-bottom transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 290px, 340px"
              priority
            />
            {/* Subtle Gradient Shadow on Lower Body */}
            <div
              className={`absolute inset-x-0 bottom-0 h-24 pointer-events-none ${
                isDark
                  ? 'bg-gradient-to-t from-black/80 to-transparent'
                  : 'bg-gradient-to-t from-white/80 to-transparent'
              }`}
            />
          </motion.div>
        </motion.div>

        {/* Real Achievements / Recognition Pills (Only Fadhil's actual awards) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-xl"
        >
          <span
            className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider border font-medium ${
              isDark
                ? 'border-white/25 bg-white/10 text-white'
                : 'border-black/25 bg-black/10 text-black'
            }`}
          >
            Gold Medal &bull; I2ASPO 2025
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider border font-medium ${
              isDark
                ? 'border-white/15 bg-white/[0.04] text-white/80'
                : 'border-black/15 bg-black/[0.04] text-black/80'
            }`}
          >
            Silver Medal &bull; MTE 2025
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-wider border font-medium ${
              isDark
                ? 'border-white/15 bg-white/[0.04] text-white/80'
                : 'border-black/15 bg-black/[0.04] text-black/80'
            }`}
          >
            Silver Medal &bull; IPITEX 2024
          </span>
        </motion.div>

        {/* CTA Buttons in Pure Black & White */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Let's Talk Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className={`group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-transform hover:scale-105 ${
              isDark ? 'bg-white text-black' : 'bg-black text-white'
            }`}
          >
            <span>Let&apos;s Talk</span>
            <span
              className={`w-9 h-9 rounded-full grid place-items-center transition-transform group-hover:translate-x-1 ${
                isDark ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>

          {/* View Work Button */}
          <button
            onClick={() => scrollToSection('projects')}
            className={`inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium border transition-all hover:scale-105 ${
              isDark
                ? 'border-white/25 text-white hover:bg-white/10'
                : 'border-black/25 text-black hover:bg-black/5'
            }`}
          >
            View Work
          </button>
        </motion.div>
      </motion.div>

      {/* 5) Bottom Status Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.9 }}
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
