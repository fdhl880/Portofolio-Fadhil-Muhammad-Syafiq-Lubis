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

export default function ProjectsSection({ isDark }) {
  return (
    <section
      id="projects"
      className={`py-32 px-6 md:px-10 ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className={`text-[10px] tracking-[0.5em] font-mono block mb-3 ${
                isDark ? 'text-white/30' : 'text-black/30'
              }`}
            >
              / PROJECTS
            </span>
            <h2
              className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-none ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              My
              <br />
              Projects.
            </h2>
          </motion.div>
          <div
            className={`text-[10px] font-mono tracking-widest max-w-xs md:text-right ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            CLICK TO VISIT LIVE DEMOS
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {webProjects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`group p-8 rounded-2xl min-h-[260px] flex flex-col justify-between border transition-all duration-500 cursor-pointer ${
                isDark
                  ? 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  : 'border-black/5 bg-black/[0.02] hover:border-black/20 hover:bg-black/[0.04]'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span
                    className={`text-[9px] font-mono tracking-widest uppercase ${
                      isDark ? 'text-white/30' : 'text-black/30'
                    }`}
                  >
                    {project.category}
                  </span>
                  <span
                    className={`text-[9px] font-mono ${
                      isDark ? 'text-white/20' : 'text-black/20'
                    }`}
                  >
                    {project.year}
                  </span>
                </div>

                <h3
                  className={`text-2xl md:text-3xl font-black tracking-tight uppercase mb-4 group-hover:translate-x-2 transition-transform duration-500 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-xs leading-relaxed tracking-wider ${
                    isDark ? 'text-white/40' : 'text-black/40'
                  }`}
                >
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <span
                  className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-500 ${
                    isDark
                      ? 'text-white/25 group-hover:text-white'
                      : 'text-black/25 group-hover:text-black'
                  }`}
                >
                  Visit Live App
                </span>
                <div
                  className={`w-6 h-px group-hover:w-12 transition-all duration-500 ${
                    isDark
                      ? 'bg-white/15 group-hover:bg-white'
                      : 'bg-black/15 group-hover:bg-black'
                  }`}
                />
                <svg
                  className={`w-3 h-3 group-hover:translate-x-1 transition-all duration-500 ${
                    isDark
                      ? 'text-white/15 group-hover:text-white'
                      : 'text-black/15 group-hover:text-black'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
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
