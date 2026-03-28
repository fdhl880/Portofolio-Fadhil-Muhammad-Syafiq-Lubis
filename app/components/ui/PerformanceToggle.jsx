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
      className={`fixed top-12 md:top-24 right-4 md:right-8 z-[150] cyber-button px-6 py-3 flex items-center gap-2
        ${isCinematic ? 'text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                   : 'text-rose-400 border-rose-500/50 shadow-[0_0_15px_rgba(255,107,157,0.2)]'}
      `}
      whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.05)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <div className={`w-2 h-2 rounded-full ${isCinematic ? 'bg-cyan-500 animate-pulse' : 'bg-rose-500'}`} />
      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
        {isCinematic ? 'Cinematic_Active' : 'Efficient_Mode'}
      </span>
    </motion.button>
  );
}
