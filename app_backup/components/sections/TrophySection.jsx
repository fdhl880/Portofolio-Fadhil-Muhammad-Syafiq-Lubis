'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const TrophyScene = dynamic(() => import('../three/TrophyScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  ),
});

export default function TrophySection({ isMobile }) {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255,215,0,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Trophy Room</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A showcase of international and national achievements earned through dedication and excellence.
          </p>
        </motion.div>

        {/* 3D Scene */}
        {!isMobile ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[350px] mb-12 rounded-2xl overflow-hidden glass"
          >
            <TrophyScene />
          </motion.div>
        ) : (
          <div className="flex justify-center gap-6 mb-12">
            {['🥈', '🥇', '🥉'].map((medal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-5xl animate-float"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {medal}
              </motion.div>
            ))}
          </div>
        )}

        {/* Center photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="relative w-72 h-48 md:w-96 md:h-64 rounded-2xl overflow-hidden glass glow-gold">
            <Image
              src="/images/photo3.jpg"
              alt="Fadhil representing Indonesia at IPITEx Thailand"
              fill
              sizes="(max-width: 768px) 288px, 384px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-sm font-semibold text-gold">International Achievement</p>
              <p className="text-xs text-muted">Representing Indonesia on the world stage</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
