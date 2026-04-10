'use client';
import { motion } from 'framer-motion';
import WarpPortal from '../ui/WarpPortal';

export default function VisionSection() {
  return (
    <section id="vision" className="relative py-48 px-6 md:px-12 bg-black text-white overflow-hidden">
      {/* Background Effect */}
      <WarpPortal />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="flex flex-col gap-8"
        >
          <span className="text-white/20 text-[10px] tracking-[1em] uppercase font-sans">The Vision</span>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Building the <br />
            <span className="italic opacity-40">Next Dimension</span> <br />
            of Sustainable <span className="opacity-40 italic">Excellence.</span>
          </h2>
        </motion.div>

        <div className="h-px w-32 bg-white/10" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-white/40 font-sans text-sm md:text-lg leading-relaxed max-w-2xl text-balance"
        >
          We envision a future where precision engineering and quantitative strategy converge to solve the most pressing systemic challenges. Our mission is to leave a legacy of innovation that transcends borders and generations.
        </motion.p>

        {/* Signature Element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 group flex items-center gap-4 cursor-default"
        >
          <div className="w-12 h-px bg-white/10 group-hover:w-24 transition-all duration-700" />
          <span className="font-display text-2xl uppercase tracking-[0.2em] group-hover:tracking-[0.5em] transition-all duration-700">Fadhil Lubis</span>
          <div className="w-12 h-px bg-white/10 group-hover:w-24 transition-all duration-700" />
        </motion.div>
      </div>

      {/* Decorative Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
}
