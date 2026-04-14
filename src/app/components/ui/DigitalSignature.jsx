'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DigitalSignature() {
  return (
    <div className="w-full relative py-32 bg-black flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

       <div className="relative z-10 flex flex-col items-center gap-16 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center gap-8"
          >
             <div className="relative w-16 h-16 overflow-hidden rounded-none border border-white/10 p-2 bg-black/40">
                <Image 
                   src="/brand-logo.svg" 
                   alt="Atelier Logo" 
                   fill 
                   className="object-contain p-2" 
                />
             </div>
             
             {/* Signature visual */}
             <div className="relative group">
                <h4 className="text-3xl md:text-6xl font-light text-white tracking-[0.2em] italic select-none">
                   Fadhil Muhammad Syafiq <span className="opacity-20 font-serif">Lubis</span>
                </h4>
                {/* Underline animation */}
                <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: "100%" }}
                   transition={{ delay: 0.5, duration: 2, ease: [0.22, 1, 0.36, 1] }}
                   className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mt-8"
                />
             </div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-x-16 gap-y-4 text-white/20 text-[10px] tracking-[0.4em] uppercase font-light">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 border border-white/10 rounded-full" />
                <span>Verified Achievement</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 border border-white/10 rounded-full" />
                <span>Atelier Grade: S++</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 border border-white/10 rounded-full" />
                <span>Data Integrity: 99.9%</span>
             </div>
          </div>
          
          <div className="mt-12 opacity-5">
             <p className="text-[8px] tracking-[0.2em] max-w-sm mx-auto leading-relaxed uppercase">
                This digital environment is a manifestation of the Atelier architectural vision. 
                Unauthorized replication of logic or aesthetics is prohibited by the Atelier.
             </p>
          </div>
       </div>
    </div>
  );
}
