'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const TrophyScene = dynamic(() => import('../three/TrophyScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export default function TrophySection({ isDark }) {
  return (
    <section
      id="trophy"
      className={`py-32 px-6 md:px-10 ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span
            className={`text-[10px] tracking-[0.5em] font-mono block mb-3 ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            / 3D SHOWCASE
          </span>
          <h2
            className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-none ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Interactive
            <br />
            Exhibit.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border ${
            isDark
              ? 'border-white/5 bg-black'
              : 'border-black/5 bg-neutral-900'
          }`}
        >
          <TrophyScene />
        </motion.div>

        <p
          className={`text-[10px] font-mono tracking-widest text-center mt-4 ${
            isDark ? 'text-white/20' : 'text-black/20'
          }`}
        >
          DRAG TO ROTATE • SCROLL TO ZOOM
        </p>
      </div>
    </section>
  );
}
