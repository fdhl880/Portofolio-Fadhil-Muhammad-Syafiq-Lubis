'use client';
import { motion } from 'framer-motion';

const webProjects = [
  {
    title: 'Research Buddy Consultant',
    category: 'Research & Education',
    description: 'An affordable research consultant service (research consultant murah) and AI-powered assistant that helps students and researchers organize, analyze, and present their findings more effectively.',
    year: '2026',
    url: 'https://researchbuddyweb.vercel.app',
  },
  {
    title: 'PyroFuel App',
    category: 'Logistics & Sustainability',
    description: 'A waste-to-fuel logistics platform for sustainable energy management. Track pickups, manage drop-offs, and learn about pyrolysis technology.',
    year: '2026',
    url: 'https://pyrofuelappharsa.vercel.app/',
  },
  {
    title: 'Boneato',
    category: 'Health & Nutrition',
    description: 'AI-powered nutrition tracking and child health monitoring app. Scan food, chat with AI, and track daily nutritional intake.',
    year: '2026',
    url: 'https://boneato.vercel.app/',
  },
  {
    title: 'NusaMatika',
    category: 'Educational Gaming',
    description: 'Interactive mathematics learning suite with multiplayer arena, solo challenges, and 3D physics-based games.',
    year: '2026',
    url: 'https://math-games-by-9-d.vercel.app/',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-black py-40 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.5em] font-mono text-white/30 block mb-3">/ PROJECTS</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">
              MY<br />PROJECTS.
            </h2>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-white/40 max-w-xs md:text-right">
            WEB APPLICATIONS I&apos;VE BUILT — CLICK TO VISIT LIVE DEMOS
          </div>
        </div>

        {/* Live Web Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {webProjects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="border border-white/15 p-8 min-h-[280px] flex flex-col justify-between hover:border-white transition-all bg-neutral-950/45 group cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                    {project.category}
                  </span>
                  <span className="text-[9px] font-mono text-white/30">{project.year}</span>
                </div>

                <h3 className="text-3xl font-extrabold tracking-tight uppercase mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {project.title}
                </h3>

                <p className="text-[12px] text-white/40 leading-relaxed tracking-wider">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <span className="text-[9px] font-mono tracking-widest uppercase text-white/30 group-hover:text-white transition-colors duration-500">
                  Visit Live App
                </span>
                <div className="w-6 h-px bg-white/20 group-hover:w-12 group-hover:bg-white transition-all duration-500" />
                <svg className="w-3 h-3 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
