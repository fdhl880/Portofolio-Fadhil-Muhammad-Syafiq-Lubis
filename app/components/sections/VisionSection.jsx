'use client';
import { motion } from 'framer-motion';
import WarpPortal from '../ui/WarpPortal';

export default function VisionSection() {
  const quote = "Building the Next Dimension of Sustainable Excellence.";
  const words = quote.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section id="vision" className="relative py-64 px-6 md:px-12 bg-black text-white overflow-hidden border-t border-white/5">
      {/* Background Effect */}
      <WarpPortal />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-16 relative z-10">
        <motion.div
           variants={container}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="flex flex-col gap-12"
        >
          <motion.span 
            variants={child}
            className="text-white/20 text-[10px] tracking-[1.5em] uppercase font-sans mb-4"
          >
            The Manifesto
          </motion.span>
          
          <h2 className="font-display text-5xl md:text-8xl leading-tight tracking-tighter flex flex-wrap justify-center gap-x-4">
             {words.map((word, index) => (
                <motion.span
                  variants={child}
                  key={index}
                  className={index % 2 !== 0 ? 'italic opacity-40' : ''}
                >
                  {word}
                </motion.span>
             ))}
          </h2>
        </motion.div>

        <div className="h-px w-48 bg-white/10" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1 }}
          className="text-white/30 font-sans text-sm md:text-xl leading-relaxed max-w-2xl text-balance tracking-wide"
        >
          Precision is not merely a metric—it is a philosophy of existence. We envision a future where engineering and strategy forge a legacy of absolute vision.
        </motion.p>

        {/* Signature Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1.5 }}
          className="mt-12 group flex items-center gap-6 cursor-default"
        >
          <div className="w-16 h-px bg-white/5 group-hover:w-32 group-hover:bg-white/20 transition-all duration-1000" />
          <span className="font-display text-3xl uppercase tracking-[0.3em] group-hover:tracking-[0.6em] transition-all duration-1000 opacity-60 italic">Fadhil Lubis</span>
          <div className="w-16 h-px bg-white/5 group-hover:w-32 group-hover:bg-white/20 transition-all duration-1000" />
        </motion.div>
      </div>

      {/* Decorative Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_80%)] pointer-events-none" />
    </section>
  );
}
