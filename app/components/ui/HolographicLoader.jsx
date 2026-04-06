'use client';
import { motion } from 'framer-motion';

export default function HolographicLoader({ text = "INITIALIZING_SYSTEM..." }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-cyan-500 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-2 border-b-2 border-violet-500 rounded-full opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_#fff]" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <motion.span 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[10px] font-mono text-cyan-400 font-bold tracking-[0.3em] uppercase"
        >
          {text}
        </motion.span>
        <div className="w-32 h-1 bg-white/5 mt-2 rounded-full overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
