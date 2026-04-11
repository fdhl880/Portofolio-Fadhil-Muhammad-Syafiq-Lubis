'use client';
import { motion } from 'framer-motion';
import { useAppMode } from '../../context/AppModeContext';
import AtelierSigil from './AtelierSigil';

export default function ModeSelection() {
  const { selectMode } = useAppMode();

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col md:flex-row overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* Absolute Logo - Anchored in Center (Desktop Only) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:block">
          <div className="p-8 bg-black border border-white/5 backdrop-blur-xl">
             <AtelierSigil className="w-16 h-16 text-white" />
          </div>
      </div>

      {/* Option A: THE ARCHIVE (Static/Lite) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ flex: 1.2 }}
        onClick={() => selectMode('archive')}
        className="relative flex-1 group cursor-pointer border-r border-white/5 transition-all duration-1000 ease-[0.16, 1, 0.3, 1]"
      >
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-700" />
        <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 text-center relative z-10">
            <span className="text-[10px] tracking-[1em] text-white/50 uppercase mb-4">Baseline Performance</span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest uppercase mb-8 md:mb-12">The Archive</h2>
            <div className="max-w-xs space-y-4 opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                <p className="text-[10px] text-white/60 leading-relaxed uppercase tracking-widest">
                   Optimized for stability. Built for high-speed accessibility on all hardware. No 3D processing. Zero playback latency.
                </p>
                <div className="pt-8">
                    <button className="px-8 py-3 bg-white text-black text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-[#D4AF37] transition-colors">
                        Select Static
                    </button>
                </div>
            </div>
        </div>
      </motion.div>

      {/* Option B: THE ATELIER (Immersive/3D) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ flex: 1.2 }}
        onClick={() => selectMode('atelier')}
        className="relative flex-1 group cursor-pointer transition-all duration-1000 ease-[0.16, 1, 0.3, 1]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 text-center relative z-10">
            <span className="text-[10px] tracking-[1em] text-[#D4AF37]/60 uppercase mb-4">Immersive Experience</span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest uppercase mb-8 md:mb-12">The Atelier</h2>
            <div className="max-w-xs space-y-4 opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                <p className="text-[10px] text-white/60 leading-relaxed uppercase tracking-widest">
                   Cinematic presentation. Features R3F 3D environments, ambient atmospheric soundscapes, and weighted smooth motion.
                </p>
                <div className="pt-8">
                    <button className="px-8 py-3 border border-white/20 text-white text-[10px] tracking-[0.4em] uppercase font-bold group-hover:border-white transition-colors">
                        Select Cinematic
                    </button>
                </div>
            </div>
        </div>
      </motion.div>

      {/* Bottom Legal/Version Info */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center opacity-20 hidden md:flex">
          <p className="text-[8px] tracking-[0.8em] text-white uppercase select-none">
             SYSTEM VERSION 2.50.1 // MEDAN ORIGIN // ARCHIVAL_TIER
          </p>
      </div>

    </div>
  );
}
