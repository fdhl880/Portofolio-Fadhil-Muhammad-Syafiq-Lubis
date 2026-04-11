'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useAppMode } from '../../context/AppModeContext';

// Placeholder for the 3D Canvas
const ShowcaseCanvas = dynamic(() => import('../three/ShowcaseCanvas'), { ssr: false });

export default function LuxuryHero() {
  const { mode } = useAppMode();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]" />
      
      {/* 3D Asset Stage (Only in Atelier Mode) */}
      {mode === 'atelier' && (
        <div className="absolute inset-0 z-0">
          <ShowcaseCanvas />
        </div>
      )}

      {/* 2D Background Decorative Element for Archive Mode */}
      {mode === 'archive' && (
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-display italic text-white/5 whitespace-nowrap select-none">
                ATELIER
            </div>
        </div>
      )}

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-white/50 text-[10px] tracking-[0.8em] uppercase mb-8 block font-sans">
            Atelier of Innovation
          </span>
          
          <h1 className="font-display mb-6">
            The Architecture of <br />
            <span className="opacity-40 italic">Precision.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/50 leading-relaxed text-balance">
            Crafting the future through rigorous engineering and uncompromising design excellence. 
            International gold medalist in scientific innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="h-24 w-px bg-gradient-to-b from-white/20 to-transparent" />
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/30 transform rotate-90 origin-left mt-12">
            Scroll to Explore
          </span>
        </motion.div>
      </div>

      {/* Decorative Floor Reflection */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black to-transparent z-[5]" />
    </section>
  );
}
