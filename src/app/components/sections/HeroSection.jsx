'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection({ isDark }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Hero Card Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselAnim, setCarouselAnim] = useState({ opacity: 1, y: 0 });

  const carouselItems = [
    { caption: 'Hardware & IoT', title: 'PyroFuel & Embedded Robotics.' },
    { caption: 'AI & Research', title: 'Research Buddy & Systems.' },
    { caption: 'Biotech Innovation', title: 'FiBoBites & Child Nutrition.' }
  ];

  const changeSlide = useCallback((newIdx, dir = 1) => {
    setCarouselAnim({ opacity: 0, y: dir * 14 });
    setTimeout(() => {
      setCarouselIndex((newIdx + carouselItems.length) % carouselItems.length);
      setCarouselAnim({ opacity: 1, y: 0 });
    }, 150);
  }, [carouselItems.length]);

  // LiquidReveal Canvas Setup
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const brushRadius = 143;
    const decay = 0.016;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let radius = brushRadius * dpr;
    let diameter = Math.ceil(radius * 2);

    const coverCanvas = document.createElement('canvas');
    const coverCtx = coverCanvas.getContext('2d');
    const brushCanvas = document.createElement('canvas');
    const brushCtx = brushCanvas.getContext('2d');

    let afterLoaded = false;
    const afterImg = new window.Image();
    afterImg.crossOrigin = 'anonymous';
    afterImg.src = '/images/hero_user_accent.jpg';
    afterImg.onload = () => {
      afterLoaded = true;
      renderCover();
    };

    function renderCover() {
      if (!afterLoaded || !width || !height || !coverCtx) return;
      coverCanvas.width = width;
      coverCanvas.height = height;

      const imgW = afterImg.naturalWidth || 1920;
      const imgH = afterImg.naturalHeight || 1080;
      const scale = Math.max(width / imgW, height / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (width - drawW) / 2;
      const drawY = (height - drawH) / 2;

      coverCtx.clearRect(0, 0, width, height);
      coverCtx.drawImage(afterImg, drawX, drawY, drawW, drawH);
    }

    function resizeCanvas() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(rect.width * dpr);
      height = Math.round(rect.height * dpr);

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      radius = brushRadius * dpr;
      diameter = Math.ceil(radius * 2);

      brushCanvas.width = diameter;
      brushCanvas.height = diameter;

      renderCover();
    }

    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(container);
    resizeCanvas();

    let points = [];
    let lastPoint = null;
    let idle = 0;
    let animId;

    function onPointerMove(e) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      const x = (clientX - rect.left) * dpr;
      const y = (clientY - rect.top) * dpr;

      if (x < -radius || y < -radius || x > width + radius || y > height + radius) {
        lastPoint = null;
        return;
      }

      if (!lastPoint) {
        points.push({ x, y });
      } else {
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        const dist = Math.hypot(dx, dy);
        const step = Math.max(radius * 0.3, 1);
        const n = Math.min(Math.ceil(dist / step), 60);

        for (let i = 1; i <= n; i++) {
          points.push({
            x: lastPoint.x + (dx * i) / n,
            y: lastPoint.y + (dy * i) / n,
          });
        }
      }
      lastPoint = { x, y };
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    function stamp(x, y) {
      if (!afterLoaded || !brushCtx || !ctx) return;
      const half = diameter / 2;
      const drawX = Math.round(x - half);
      const drawY = Math.round(y - half);

      brushCtx.clearRect(0, 0, diameter, diameter);

      brushCtx.globalCompositeOperation = 'source-over';
      const grad = brushCtx.createRadialGradient(half, half, 0, half, half, half);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.82)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      brushCtx.fillStyle = grad;
      brushCtx.fillRect(0, 0, diameter, diameter);

      brushCtx.globalCompositeOperation = 'source-in';
      brushCtx.drawImage(coverCanvas, drawX, drawY, diameter, diameter, 0, 0, diameter, diameter);

      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(brushCanvas, drawX, drawY);
    }

    function renderLoop() {
      const drawing = points.length > 0;
      if (drawing) {
        idle = 0;
      } else {
        idle++;
      }

      if (idle <= 120) {
        const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
        ctx.fillRect(0, 0, width, height);

        if (drawing) {
          for (let i = 0; i < points.length; i++) {
            stamp(points[i].x, points[i].y);
          }
          points = [];
        }

        if (idle >= 120) {
          ctx.clearRect(0, 0, width, height);
        }
      }

      animId = requestAnimationFrame(renderLoop);
    }

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative min-h-screen flex flex-col justify-between overflow-hidden select-none isolation-isolate rounded-b-[2rem] transition-colors duration-500 ${
        isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#f4f4f5] text-black'
      }`}
    >
      {/* 1) LiquidReveal Centered Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero_user_neutral.jpg"
          alt="Fadhil Muhammad Syafiq Lubis"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2) Monochrome Vignette Overlay */}
      <div
        className={`absolute inset-0 z-[1] pointer-events-none ${
          isDark
            ? 'bg-gradient-to-b from-black/70 via-black/40 to-black/90'
            : 'bg-gradient-to-b from-white/70 via-white/40 to-white/90'
        }`}
      />

      {/* 3) Giant Watermark (Pure Black & White) */}
      <div
        className={`absolute inset-x-0 bottom-20 z-[1] text-center pointer-events-none select-none font-black leading-none text-[16vw] md:text-[14rem] tracking-tighter ${
          isDark ? 'text-white/[0.04]' : 'text-black/[0.04]'
        }`}
      >
        FADHIL
      </div>

      {/* 4) Hero Content — Centered Editorial Layout */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 md:px-10 pt-28 pb-12 flex-1 flex flex-col items-center text-center justify-center">
        
        {/* Eyebrow in pure B&W */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] md:text-xs font-mono tracking-widest uppercase mb-6 ${
            isDark
              ? 'border-white/10 bg-white/5 text-white/70'
              : 'border-black/10 bg-black/5 text-black/70'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
          <span>INDEPENDENT INNOVATOR &bull; RESEARCHER &bull; DEVELOPER</span>
        </motion.div>

        {/* Main Headline (Pure Black & White) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-8">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
              className={`block ${isDark ? 'text-white' : 'text-black'}`}
            >
              Bold ideas,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.37, ease: [0.215, 0.61, 0.355, 1] }}
              className={`block ${isDark ? 'text-white' : 'text-black'}`}
            >
              shipped with
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.49, ease: [0.215, 0.61, 0.355, 1] }}
              className={`block ${isDark ? 'text-white/80' : 'text-black/80'}`}
            >
              quiet precision
            </motion.span>
          </span>
        </h1>

        {/* Centered Photo of Fadhil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-4 flex justify-center items-center"
        >
          <div
            className={`relative w-[230px] h-[300px] sm:w-[270px] sm:h-[350px] md:w-[310px] md:h-[400px] rounded-[2rem] overflow-hidden border transition-all duration-700 hover:scale-[1.02] ${
              isDark
                ? 'border-white/15 bg-gradient-to-b from-white/10 via-white/[0.02] to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                : 'border-black/15 bg-gradient-to-b from-black/5 via-black/[0.01] to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
            }`}
          >
            <Image
              src="/images/hero-transparent.png"
              alt="Fadhil Muhammad Syafiq Lubis"
              fill
              className="object-cover object-bottom"
              sizes="(max-width: 768px) 270px, 310px"
              priority
            />
          </div>
        </motion.div>

        {/* Rating & Accomplishments (Pure Black & White) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex items-center justify-center gap-3 my-4"
        >
          <div className={`flex text-sm ${isDark ? 'text-white' : 'text-black'}`}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
              </svg>
            ))}
          </div>
          <span className={`text-xs md:text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>
            International Gold Medalist &bull; 4+ Flagship Products
          </span>
        </motion.div>

        {/* CTA Buttons (Pure Black & White) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
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
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-black/20 text-black hover:bg-black/5'
            }`}
          >
            View Work
          </button>
        </motion.div>

        {/* Carousel & Badges in Pure B&W */}
        <div className="w-full max-w-2xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-center text-left">
          {/* Card Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`rounded-[1.25rem] p-3 border backdrop-blur-md cursor-pointer transition-shadow hover:shadow-lg ${
              isDark
                ? 'bg-white/[0.04] border-white/10'
                : 'bg-black/[0.03] border-black/10'
            }`}
            onClick={() => changeSlide(carouselIndex + 1, 1)}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                {carouselItems[carouselIndex].caption}
              </span>
              <div className="flex items-center gap-1">
                {carouselItems.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === carouselIndex
                        ? `w-4 ${isDark ? 'bg-white' : 'bg-black'}`
                        : `w-1.5 ${isDark ? 'bg-white/20' : 'bg-black/20'}`
                    }`}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                opacity: carouselAnim.opacity,
                transform: `translateY(${carouselAnim.y}px)`,
                transition: 'all 0.25s ease'
              }}
              className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-black'}`}
            >
              {carouselItems[carouselIndex].title}
            </div>
          </motion.div>

          {/* Recognition Grid */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-wrap justify-center md:justify-start gap-1.5"
          >
            {['I2ASPO', 'IPITEX', 'AISEEF', 'OSSEI', 'BRIN', 'KEMENDIKBUD'].map((name) => (
              <span
                key={name}
                className={`inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-1.5 rounded-lg border transition-colors ${
                  isDark
                    ? 'border-white/10 bg-white/[0.02] text-white/70 hover:text-white hover:border-white/30'
                    : 'border-black/10 bg-black/[0.02] text-black/70 hover:text-black hover:border-black/30'
                }`}
              >
                <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-white/60' : 'bg-black/60'}`} />
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 5) Bottom Status Bar (Pure Black & White) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.9 }}
        className={`relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-5 border-t flex items-center justify-between text-[11px] font-mono uppercase tracking-widest ${
          isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'
        }`}
      >
        <div>Innovating since 2021</div>
        <div className="hidden sm:block">Medan &bull; Jakarta &bull; Worldwide</div>
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
