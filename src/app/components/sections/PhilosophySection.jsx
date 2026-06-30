'use client';
import { motion } from 'framer-motion';

export default function PhilosophySection() {
  return (
    <section className="bg-black py-40 px-6 md:px-10 border-y border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-white font-extrabold leading-[0.9] tracking-[-0.04em] uppercase"
          style={{ fontSize: 'clamp(2rem, 7vw, 6rem)' }}
        >
          I don&apos;t just learn things.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-white/20 font-extrabold leading-[0.9] tracking-[-0.04em] uppercase mt-4"
          style={{ fontSize: 'clamp(2rem, 7vw, 6rem)' }}
        >
          I build them.
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-body mt-12 max-w-md"
        >
          Every medal, every line of code, every experiment — they all share one purpose: 
          creating solutions that matter.
        </motion.p>
      </div>
    </section>
  );
}
