'use client';
import { motion } from 'framer-motion';

export default function AuroraOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Cyan Aurora */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      {/* Violet Aurora */}
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [100, -100, 100],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[140px]"
      />

      {/* Golden Highlight (Sunlight Leak) */}
      <motion.div
        animate={{
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-[160px]"
      />
    </div>
  );
}
