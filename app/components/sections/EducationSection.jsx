'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { timeline } from './AchievementsSection';

export default function EducationSection() {
  return (
    <section id="education" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-violet/5 blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-neon/5 blur-3xl" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Journey & Education</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A timeline of growth, learning, and international achievements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 items-start">
          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:pr-12 flex justify-center md:justify-end md:sticky md:top-32"
          >
            <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden glass glow-purple animate-float">
              <Image
                src="/images/photo2.jpg"
                alt="Fadhil at Malaysia Technology Expo 2025"
                fill
                sizes="(max-width: 768px) 224px, 256px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm font-semibold text-white">MTE 2025</p>
                <p className="text-xs text-muted">Malaysia Technology Expo</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline line (desktop) */}
          <div className="hidden md:flex flex-col items-center">
            <div className="w-px bg-gradient-to-b from-neon/40 via-violet/40 to-gold/40 h-full min-h-[500px]" />
          </div>

          {/* Timeline nodes */}
          <div className="md:pl-12 space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Node dot (desktop) */}
                <div
                  className="hidden md:block absolute -left-12 top-3 w-3 h-3 rounded-full -translate-x-1/2"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 12px ${item.color}60`,
                  }}
                />

                <div className="glass rounded-xl p-5 hover:bg-white/[0.04] transition-colors">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: item.color }}
                  >
                    {item.year}
                  </span>
                  <h3 className="font-display text-lg font-semibold mt-1 text-white">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
