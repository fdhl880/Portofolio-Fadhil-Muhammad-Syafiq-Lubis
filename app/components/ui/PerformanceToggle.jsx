'use client';
import { motion } from 'framer-motion';
import { usePerformance } from '../../context/PerformanceContext';

export default function PerformanceToggle() {
  const { isCinematic, toggleMode } = usePerformance();

  return (
    <motion.button
      onClick={() => {
        toggleMode();
        window.dispatchEvent(new CustomEvent('NEXUS_NOTIFY', { 
          detail: `PERF_MODE: ${!isCinematic ? 'CINEMATIC' : 'EFFICIENT'}` 
        }));
      }}
      className={`fixed top-12 md:top-24 right-4 md:right-8 z-[150] rounded-full px-4 py-2 text-[10px] font-bold font-display uppercase tracking-widest transition-all duration-300 cursor-pointer pointer-events-auto border backdrop-blur-md shadow-lg
        ${isCinematic ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/50 hover:bg-[#00f0ff]/20 shadow-[#00f0ff]/20' 
                   : 'bg-[#ff6b9d]/10 text-[#ff6b9d] border-[#ff6b9d]/50 hover:bg-[#ff6b9d]/20 shadow-[#ff6b9d]/20'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }} // spawn slightly after load to not distract
    >
      {isCinematic ? '🎬 Cinematic' : '⚡ Efficient'}
    </motion.button>
  );
}
