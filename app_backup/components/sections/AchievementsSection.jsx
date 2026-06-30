'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const international = [
  { medal: 'Silver', event: 'IPITEx 2024', loc: 'Thailand', color: '#c0c0c0' },
  { medal: 'Silver', event: 'Malaysia Technology Expo 2025', loc: 'Malaysia', color: '#c0c0c0' },
  { medal: 'Gold', event: 'I2SPO 2025', loc: 'International', color: '#ffd700' },
];

const national = [
  { medal: 'Gold', event: 'Olimpiade Siswa Jenius' },
  { medal: 'Gold', event: 'Olimpiade Prestasi Gemilang' },
  { medal: 'Participant', event: 'OPSI (Olimpiade Penelitian Siswa Indonesia)' },
  { medal: 'Gold', event: 'Kompetisi Pelajar Berprestasi Indonesia' },
  { medal: 'Gold', event: 'Olimpiade Siswa Pintar' },
  { medal: 'Gold', event: 'Best National Student Olympiad' },
];

function MedalCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
      style={{ perspective: '1000px' }}
    >
      <div
        className="glass rounded-2xl p-6 text-center transition-all duration-300 relative overflow-hidden"
        style={{
          transform: hovered ? 'rotateY(5deg) scale(1.03)' : 'rotateY(0) scale(1)',
          boxShadow: hovered ? `0 0 40px ${item.color}30, 0 0 80px ${item.color}10` : 'none',
        }}
      >
        {/* Rotating medal icon */}
        <motion.div
          animate={{ rotateY: hovered ? 360 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center relative"
          style={{
            background: `radial-gradient(circle, ${item.color}30, transparent)`,
            border: `2px solid ${item.color}40`,
          }}
        >
          <div className="text-3xl font-bold" style={{ color: item.color }}>
            {item.medal === 'Gold' ? '🥇' : item.medal === 'Silver' ? '🥈' : '🏅'}
          </div>
        </motion.div>

        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: item.color }}
        >
          {item.medal} Medal
        </span>
        <h3 className="font-display text-lg font-semibold mt-2 text-white">{item.event}</h3>
        {item.loc && <p className="text-muted text-sm mt-1">📍 {item.loc}</p>}

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
            opacity: hovered ? 1 : 0.3,
          }}
        />
      </div>
    </motion.div>
  );
}

function NationalPanel({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="holographic rounded-xl p-4 flex items-center gap-4 hover:bg-white/[0.04] transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gold/10 border border-gold/20 shrink-0">
        <span className="text-lg">{item.medal === 'Gold' ? '🥇' : item.medal === 'Participant' ? '🏅' : '🥈'}</span>
      </div>
      <div>
        <p className="font-semibold text-white/90 text-sm group-hover:text-white transition">{item.event}</p>
        <p className="text-xs text-muted">{item.medal} Medal</p>
      </div>
    </motion.div>
  );
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* International */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-muted">Awards and recognitions from international and national competitions.</p>
        </motion.div>

        {/* International medals - large rotating cards */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-xl font-semibold text-neon mb-6 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-neon/40" />
            International Achievements
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {international.map((item, i) => (
              <MedalCard key={item.event} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* National achievements - glowing wall panels */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-xl font-semibold text-violet mb-6 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-violet/40" />
            National Achievements
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {national.map((item, i) => (
              <NationalPanel key={item.event} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Regional - spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-xl font-semibold text-gold mb-6 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-gold/40" />
            Regional Achievement
          </motion.h3>
          <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
            {/* Spotlight effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="font-display text-2xl font-bold text-gold mb-2">10th Place</h4>
              <p className="text-white font-semibold">National Science Olympiad (OSN)</p>
              <p className="text-muted text-sm mt-1">Regional Level Achievement</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
