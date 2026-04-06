'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  { text: "Price is what you pay. Value is what you get.", author: "Warren Buffett" },
  { text: "Success is a lousy teacher. It seduces smart people into thinking they can't lose.", author: "Bill Gates" },
  { text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk" },
  { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" }
];

export default function VisionSection() {
  const containerRef = useRef(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Pre-compute particle positions to avoid hydration mismatch from Math.random() in render
  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: `${(i * 8.33 + 4.17) % 100}%`,
      top: `${((i * 17 + 11) * 7.3) % 100}%`,
      delay: `${i * 0.4}s`,
      duration: `${3 + (i % 3) * 0.8}s`,
    })), []
  );

  return (
    <section ref={containerRef} className="relative py-16 md:py-48 px-4 overflow-hidden">
      {/* Light rays background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '2px',
              height: '200%',
              background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? 'rgba(0,240,255,0.06)' : 'rgba(139,92,246,0.06)'}, transparent)`,
              transform: `rotate(${i * 36 + 10}deg) translateX(${(i - 2) * 80}px)`,
              transformOrigin: 'center center',
            }}
          />
        ))}
      </div>

      {/* Floating particles - deterministic positions */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-neon/20 animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">My Vision</span>
          </h2>
        </motion.div>
        <div className="relative pt-8 pb-12 w-full">
           <AnimatePresence mode="wait">
             <motion.div
               key={quoteIndex}
               initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
               animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
               exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
               transition={{ duration: 0.8, ease: "circOut" }}
               className="text-center space-y-8"
             >
                <p className="font-display text-xl md:text-4xl font-medium text-white/90 leading-tight md:leading-tight max-w-3xl mx-auto">
                  "{quotes[quoteIndex].text}"
                </p>
                <div className="flex items-center justify-center gap-4 text-cyan-400 pt-4">
                  <div className="w-12 h-px bg-cyan-400/50" />
                  <span className="font-mono text-[10px] md:text-sm uppercase tracking-[0.2em]">{quotes[quoteIndex].author}</span>
                  <div className="w-12 h-px bg-cyan-400/50" />
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
