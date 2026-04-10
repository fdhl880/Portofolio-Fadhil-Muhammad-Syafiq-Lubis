'use client';
import { motion } from 'framer-motion';

export default function PhilosophySection() {
  const pillars = [
    {
      title: 'Purity of Vision',
      subtitle: 'Kemurnian Visi',
      description: 'Stripping away the noise to find the essence of engineering. Every line of code, every design choice, is executed with a master’s touch.'
    },
    {
      title: 'Absolute Precision',
      subtitle: 'Ketelitian Mutlak',
      description: 'Luxury is found in the details. We execute innovation with mathematical exactness and uncompromising quality standards.'
    },
    {
      title: 'The Legacy of Gold',
      subtitle: 'Warisan Emas',
      description: 'International gold medals are not just awards; they are the heritage of a brand committed to timeless greatness.'
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left: Manifesto */}
          <div className="flex flex-col gap-8">
            <span className="text-black/30 text-[10px] tracking-[0.6em] uppercase font-sans">Brand Philosophy</span>
            <h2 className="font-display text-5xl md:text-7xl leading-tight">
              A commitment <br />
              to the <span className="italic">extraordinary.</span>
            </h2>
            <div className="h-px w-24 bg-black/10" />
            <p className="text-black/70 max-w-md font-sans text-lg">
              We do not just build—we curate. Our philosophy is rooted in the belief that excellence is not an act, but a habit of precision.
            </p>
          </div>

          {/* Right: Pillars */}
          <div className="flex flex-col gap-12">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 1 }}
                className="group border-b border-black/5 pb-8"
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-display text-4xl opacity-10 group-hover:opacity-100 transition-opacity duration-700">0{idx + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-wider">{pillar.title}</h3>
                    <span className="text-[10px] tracking-widest text-black/40 uppercase font-sans">{pillar.subtitle}</span>
                  </div>
                </div>
                <p className="text-black/60 text-sm leading-relaxed max-w-sm">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
