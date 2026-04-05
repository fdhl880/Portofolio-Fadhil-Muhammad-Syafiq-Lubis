'use client';
import { motion } from 'framer-motion';

export default function HolographicFooter() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative py-12 px-6 overflow-hidden border-t border-white/5 bg-dark/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="font-mono text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase">FL_SYSTEM_Active</span>
          </div>
          <p className="text-muted/60 text-xs font-mono lowercase">
            &copy; {year} Fadhil Muhammad Syafiq Lubis // Port_v5.0.0
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-4 text-[10px] font-mono text-muted/40 uppercase tracking-widest">
            <span>Uptime: 99.9%</span>
            <span>Latency: 24ms</span>
            <span>Packet_Status: OK</span>
          </div>
          <div className="h-1 w-full max-w-[256px] bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
            />
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-violet-500/5 rounded-full blur-[100px]" />
    </footer>
  );
}
