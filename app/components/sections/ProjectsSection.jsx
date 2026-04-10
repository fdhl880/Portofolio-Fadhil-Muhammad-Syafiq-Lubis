'use client';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Precision Research',
    category: 'Scientific Excellence',
    description: 'International gold medal winning methodology in engineering and science.',
    year: '2025'
  },
  {
    id: 2,
    title: 'Neural Strategy',
    category: 'Quantitative Finance',
    description: 'Market analysis models and algorithmic trading strategies for the modern era.',
    year: '2024'
  },
  {
    id: 3,
    title: 'Atelier Hub',
    category: 'Advanced Engineering',
    description: 'A dedicated space for technical solutions and robotics development.',
    year: '2024'
  }
];

export default function ProjectsSection() {
  return (
    <section id="collections" className="py-32 px-6 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-white/20 text-[10px] tracking-[0.8em] uppercase font-sans">Portfolios</span>
            <h2 className="font-display text-6xl md:text-8xl leading-none">
              The <span className="italic opacity-40">Collections.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm md:text-lg leading-relaxed font-sans">
            A curated selection of innovations where precision meets purpose.
          </p>
        </div>

        {/* Collections List */}
        <div className="flex flex-col">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              className="group relative border-t border-white/10 py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 cursor-pointer hover:bg-white/[0.02] px-4 transition-colors duration-500"
            >
              <div className="flex flex-col gap-4">
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-sans">
                  {project.category}
                </span>
                <h3 className="font-display text-4xl md:text-5xl group-hover:italic group-hover:translate-x-4 transition-all duration-700">
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-col md:items-end gap-6 max-w-md">
                <p className="text-white/40 text-sm leading-relaxed md:text-right group-hover:text-white/70 transition-colors">
                  {project.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-sans text-white/20">{project.year}</span>
                  <div className="w-12 h-px bg-white/10 group-hover:w-24 group-hover:bg-white transition-all duration-700" />
                </div>
              </div>

              {/* Hover Image Reveal effect (Placeholder hint) */}
              <div className="absolute inset-0 bg-transparent pointer-events-none overflow-hidden z-[-1]">
                {/* Future implementation: Parallax image on hover */}
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>

        {/* Catalog CTA */}
        <div className="mt-24 flex justify-center">
           <button className="px-12 py-4 border border-white/10 text-white/50 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500">
             Explore Full Catalog
           </button>
        </div>
      </div>
    </section>
  );
}
