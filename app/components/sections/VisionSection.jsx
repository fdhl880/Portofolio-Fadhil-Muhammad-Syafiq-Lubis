'use client';
import { motion } from 'framer-motion';
import { useRef, useMemo } from 'react';

const visionLines = [
  'I believe in the power of knowledge',
  'to transform lives and shape the future.',
  '',
  'Through science, engineering, and innovation,',
  'I aim to create solutions that matter.',
  '',
  'My vision is to bridge the gap',
  'between academic excellence and real-world impact.',
  '',
  'From Medan to the world stage —',
  'the journey has only just begun.',
];

export default function VisionSection() {
  const containerRef = useRef(null);

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
    <section ref={containerRef} className="relative py-32 md:py-48 px-4 overflow-hidden">
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

        <div className="space-y-1">
          {visionLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`font-display text-lg md:text-2xl leading-relaxed ${
                line === '' ? 'h-4' : i >= visionLines.length - 2 ? 'text-neon font-semibold' : 'text-white/80'
              }`}
              style={{ textAlign: 'center' }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
