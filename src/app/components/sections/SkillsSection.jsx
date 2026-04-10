'use client';
import { motion } from 'framer-motion';

const expertises = [
  {
    category: 'Research & Science',
    description: 'Deconstructing complex hypotheses through rigorous scientific inquiry and international-grade data analysis.',
    capabilities: ['Hypothesis Testing', 'Data Modeling', 'Scientific Writing']
  },
  {
    category: 'Advanced Engineering',
    description: 'Translating theoretical concepts into technical reality through high-fidelity prototyping and CAD design.',
    capabilities: ['Prototyping', 'Tech Optimization', 'Systems Design']
  },
  {
    category: 'Strategy & Capital',
    description: 'Analyzing market dynamics and financial risk to scale innovations from laboratory to commercial ecosystem.',
    capabilities: ['Market Analysis', 'Risk Assessment', 'Venture Strategy']
  }
];

export default function SkillsSection() {
  return (
    <section id="expertise" className="py-32 px-6 md:px-12 bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-white/20 text-[10px] tracking-[0.8em] uppercase font-sans">Capabilities</span>
            <h2 className="font-display text-6xl md:text-8xl leading-none">
              The <span className="italic opacity-40">Expertise.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm md:text-lg leading-relaxed font-sans">
            A diverse mastery spanning the intersection of theoretical science and applied engineering.
          </p>
        </div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {expertises.map((exp, idx) => (
            <motion.div
              key={exp.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.2 }}
              className="flex flex-col gap-8 p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group cursor-default"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                <div className="w-8 h-px bg-white/10 group-hover:w-16 group-hover:bg-white transition-all duration-700" />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-display text-2xl uppercase tracking-widest">{exp.category}</h3>
                <p className="text-white/40 text-sm leading-relaxed min-h-[80px]">
                  {exp.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-auto pt-8 border-t border-white/5">
                {exp.capabilities.map(cap => (
                  <span key={cap} className="text-[10px] tracking-widest uppercase text-white/20 font-sans group-hover:text-white/60 transition-colors">
                    {cap}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Manifesto Quote (Static & Elegant) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mt-32 text-center max-w-3xl mx-auto"
        >
          <div className="h-px w-24 bg-white/10 mx-auto mb-12" />
          <h3 className="font-display text-2xl md:text-4xl italic text-white/30 leading-relaxed mb-8">
            &quot;Risk comes from not knowing what you&apos;re doing. Precision is the antidote.&quot;
          </h3>
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/10">The Principle of Excellence</span>
        </motion.div>

      </div>
    </section>
  );
}
