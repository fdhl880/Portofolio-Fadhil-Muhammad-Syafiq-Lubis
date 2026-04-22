'use client';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'PyroFuel',
    category: 'Logistics & Sustainability',
    description: 'A revolutionary waste-to-fuel logistics platform for sustainable energy management.',
    year: '2026',
    url: 'https://pyrofuelappharsa.vercel.app/'
  },
  {
    id: 2,
    title: 'Boneato',
    category: 'Health & Nutrition',
    description: 'Advanced AI-powered nutrition tracking and child health monitoring ecosystem.',
    year: '2026',
    url: 'https://boneato.vercel.app/'
  },
  {
    id: 3,
    title: 'NusaMatika',
    category: 'Educational Gaming',
    description: 'Interactive mathematics learning suite designed for high-engagement academic growth.',
    year: '2026',
    url: 'https://math-games-by-9-d.vercel.app/'
  }
];

export default function ProjectsSection() {
  return (
    <section id="collections" className="py-32 px-6 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-white/20 text-[10px] tracking-[0.8em] uppercase font-sans">Strategic Portfolios</span>
            <h2 className="font-display text-6xl md:text-8xl leading-none">
              The <span className="italic opacity-40">Nexus.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm md:text-lg leading-relaxed font-sans">
            A curated intersection of software engineering, sustainability, and educational innovation.
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
              className="group relative border-t border-white/10 py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-4 transition-all duration-500 hover:bg-white/[0.02]"
            >
              <div className="flex flex-col gap-4">
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-sans">
                  {project.category}
                </span>
                <h3 className="font-display text-4xl md:text-6xl group-hover:italic group-hover:translate-x-4 transition-all duration-700">
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-col md:items-end gap-8 max-w-md">
                <p className="text-white/40 text-sm leading-relaxed md:text-right group-hover:text-white/70 transition-colors">
                  {project.description}
                </p>
                <div className="flex items-center gap-6">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group/link"
                  >
                    <span className="text-[10px] font-sans text-white/40 tracking-[0.4em] uppercase group-hover/link:text-white transition-colors">
                      Visit Website
                    </span>
                    <div className="w-8 h-px bg-white/10 group-hover/link:w-16 group-hover/link:bg-white transition-all duration-500" />
                  </a>
                  <span className="text-[10px] font-sans text-white/20">{project.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>

        {/* Catalog CTA */}
        <div className="mt-24 flex justify-center">
           <button className="px-12 py-4 border border-white/10 text-white/30 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500">
             Request Technical Dossier
           </button>
        </div>
      </div>
    </section>
  );
}
