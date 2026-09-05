'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ isDark }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Hero Card Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselAnim, setCarouselAnim] = useState({ opacity: 1, y: 0 });

  const carouselItems = [
    { caption: 'Hardware & IoT', title: 'PyroFuel & Embedded Robotics.' },
    { caption: 'AI & Research', title: 'Research Buddy & Analysis.' },
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
    afterImg.onerror = () => {
      afterImg.src = 'https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68/hero/before.jpg';
    };
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
        isDark ? 'bg-[#0F0F11]' : 'bg-[#c9c9c9]'
      }`}
    >
      {/* 1) LiquidReveal Full-bleed Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero_user_neutral.jpg"
          alt="Fadhil Muhammad Syafiq Lubis"
          className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          onError={(e) => {
            e.currentTarget.src = 'https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68/hero/after.jpg';
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2) Vignette Overlay */}
      <div
        className={`absolute inset-0 z-[1] pointer-events-none ${
          isDark
            ? 'bg-gradient-to-b from-black/60 via-black/20 to-black/80'
            : 'bg-gradient-to-b from-white/40 via-transparent to-white/40'
        }`}
      />

      {/* 3) Giant Watermark */}
      <div
        className={`absolute inset-x-0 bottom-24 z-[1] text-center pointer-events-none select-none font-black leading-none text-[15vw] md:text-[13rem] tracking-tighter ${
          isDark ? 'text-white/[0.04]' : 'text-black/[0.04]'
        }`}
      >
        FADHIL
      </div>

      {/* 4) Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pt-32 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#b15f2c] animate-pulse" />
              <span className={isDark ? 'text-white/70' : 'text-black/70'}>
                INDEPENDENT INNOVATOR &amp; RESEARCHER
              </span>
            </motion.div>

            {/* Headline H1 with Line Stagger */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.92]">
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
                  className="block text-[#b15f2c]"
                >
                  quiet precision
                </motion.span>
              </span>
            </h1>

            {/* Rating / Accomplishments */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex items-center gap-3"
            >
              <div className="flex text-[#b15f2c] text-sm">
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

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              {/* Let's Talk Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className={`group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-transform hover:scale-105 ${
                  isDark ? 'bg-white text-black' : 'bg-[#0a0a0a] text-white'
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
          </div>

          {/* Right Column (span 5) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-6">
            {/* Lumora-style HeroCard Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`w-full max-w-sm rounded-[1.25rem] p-2 border backdrop-blur-md cursor-pointer transition-shadow hover:shadow-xl ${
                isDark
                  ? 'bg-white/[0.07] border-white/10 shadow-2xl'
                  : 'bg-white/80 border-black/10 shadow-md'
              }`}
              onClick={() => changeSlide(carouselIndex + 1, 1)}
            >
              <div className="flex gap-2">
                {/* Left Brand Tile */}
                <div className="w-24 h-24 rounded-[0.875rem] bg-[#0a0a0a] flex items-center justify-center text-[#cf8047] flex-shrink-0">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 48 48">
                    <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
                  </svg>
                </div>

                {/* Right Info Panel */}
                <div
                  className={`flex-1 rounded-[0.875rem] p-3 flex flex-col justify-between overflow-hidden ${
                    isDark ? 'bg-white/[0.04]' : 'bg-black/[0.03]'
                  }`}
                >
                  <div
                    style={{
                      opacity: carouselAnim.opacity,
                      transform: `translateY(${carouselAnim.y}px)`,
                      transition: 'all 0.25s ease'
                    }}
                    className="flex flex-col gap-1 min-h-[3rem]"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#cf8047]">
                      {carouselItems[carouselIndex].caption}
                    </span>
                    <span className={`text-xs font-semibold leading-snug ${isDark ? 'text-white' : 'text-black'}`}>
                      {carouselItems[carouselIndex].title}
                    </span>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      {carouselItems.map((_, idx) => (
                        <span
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === carouselIndex
                              ? 'w-4 bg-[#cf8047]'
                              : `w-1.5 ${isDark ? 'bg-white/20' : 'bg-black/20'}`
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(carouselIndex - 1, -1);
                        }}
                        className={`w-6 h-6 rounded-full grid place-items-center text-xs border transition-colors ${
                          isDark
                            ? 'bg-white/10 border-white/10 text-white/70 hover:text-white'
                            : 'bg-black/5 border-black/10 text-black/70 hover:text-black'
                        }`}
                        aria-label="Previous slide"
                      >
                        <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeSlide(carouselIndex + 1, 1);
                        }}
                        className={`w-6 h-6 rounded-full grid place-items-center text-xs border transition-colors ${
                          isDark
                            ? 'bg-white/10 border-white/10 text-white/70 hover:text-white'
                            : 'bg-black/5 border-black/10 text-black/70 hover:text-black'
                        }`}
                        aria-label="Next slide"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recognition & Partners Grid */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="w-full max-w-sm"
            >
              <div className={`text-[11px] font-mono tracking-widest uppercase mb-2.5 lg:text-right ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                Recognized &bull; Awarded by
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['I2ASPO', 'IPITEX', 'AISEEF', 'OSSEI', 'BRIN', 'KEMENDIKBUD'].map((name) => (
                  <span
                    key={name}
                    className={`inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-1.5 rounded-lg border transition-colors ${
                      isDark
                        ? 'border-white/5 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20'
                        : 'border-black/5 bg-black/[0.02] text-black/60 hover:text-black hover:border-black/20'
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#b15f2c]" />
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

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
        <div className="hidden sm:block">Medan &bull; Jakarta &bull; Worldwide</div>
        <div
          onClick={() => scrollToSection('about')}
          className="inline-flex items-center gap-1.5 cursor-pointer hover:text-[#b15f2c] transition-colors"
        >
          <span>Scroll to explore</span>
          <span className="animate-bounce">↓</span>
        </div>
      </motion.div>
    </section>
  );
}
