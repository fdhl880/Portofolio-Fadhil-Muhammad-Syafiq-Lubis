'use client';
import { motion } from 'framer-motion';
import { usePerformance } from '../../context/PerformanceContext';
import { useState } from 'react';

export default function PerformanceToggle() {
  const { isCinematic, toggleMode } = usePerformance();
  const [isQuantum, setIsQuantum] = useState(false);

  const triggerQuantumShift = (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    
    // Create shockwave DOM element
    const circle = document.createElement('div');
    circle.className = 'quantum-shockwave';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    document.body.appendChild(circle);

    setTimeout(() => {
       const newState = !isQuantum;
       setIsQuantum(newState);
       if (newState) document.documentElement.classList.add('quantum-shift');
       else document.documentElement.classList.remove('quantum-shift');
       
       window.dispatchEvent(new CustomEvent('NEXUS_NOTIFY', { 
         detail: `THEME_OVERRIDE: ${newState ? 'QUANTUM_STATE' : 'STANDARD'}` 
       }));
    }, 400);

    setTimeout(() => circle.remove(), 1200);
  };

  return (
    <div className="fixed top-12 md:top-24 right-4 md:right-8 z-[200] flex flex-col gap-3">
      <motion.button
        onClick={() => {
          toggleMode();
          window.dispatchEvent(new CustomEvent('NEXUS_NOTIFY', { 
            detail: `PERF_MODE: ${!isCinematic ? 'CINEMATIC' : 'EFFICIENT'}` 
          }));
        }}
        className={`cyber-button px-6 py-3 flex items-center justify-between gap-2 w-48
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
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] whitespace-nowrap">
          {isCinematic ? 'Cinematic_On' : 'Efficient_On'}
        </span>
      </motion.button>

      <motion.button
        onClick={triggerQuantumShift}
        className={`cyber-button px-6 py-3 flex items-center justify-between gap-2 w-48
          ${isQuantum ? 'text-violet-400 border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] bg-white/5' 
                     : 'text-white/50 border-white/20'}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className={`w-2 h-2 rounded-full ${isQuantum ? 'bg-violet-500 shadow-[0_0_10px_#8b5cf6]' : 'bg-white/20'}`} />
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] whitespace-nowrap">
          {isQuantum ? 'Quantum_Actv' : 'Theme_Shift'}
        </span>
      </motion.button>
    </div>
  );
}
