'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    id: '01',
    title: 'ResearchBuddy',
    category: 'WEB DEVELOPMENT & AI',
    description: 'An AI-powered academic assistant for researchers to instantly analyze PDFs, find citations, and summarize papers.',
    tech: ['Next.js', 'React', 'Gemini AI', 'Tailwind CSS'],
    link: '#',
  },
  {
    id: '02',
    title: 'NusaMark SAR',
    category: 'IOT & HARDWARE',
    description: 'An automatic floating location marker system to support Indonesian Search and Rescue teams in locating sunken ships quickly.',
    tech: ['Arduino', 'IoT', 'GPS', 'Sensors'],
    link: '#',
  },
  {
    id: '03',
    title: 'Harmoni',
    category: 'WEB DEVELOPMENT & DESIGN',
    description: 'A beautiful digital wedding invitation platform with custom themes, RSVP tracking, and smooth animations.',
    tech: ['React', 'Framer Motion', 'Tailwind CSS'],
    link: '#',
  },
];

export default function ProjectsSection({ isDark }) {
  return (
    <section
      id="projects"
      className={`py-32 px-6 md:px-10 overflow-hidden ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span
            className={`text-[10px] tracking-[0.5em] font-mono uppercase block ${
              isDark ? 'text-white/40' : 'text-black/40'
            }`}
          >
            My Capabilities
          </span>
        </motion.div>

        {/* Massive Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`text-5xl md:text-[6vw] font-black tracking-tighter leading-[0.9] mb-20 ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          What I Can Do
        </motion.h2>

        {/* Brutalist Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className={`p-10 rounded-[2rem] flex flex-col justify-between h-full min-h-[400px] ${
                isDark 
                  ? 'bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                  : 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
              }`}
            >
              {/* Header: Index & Category */}
              <div className="flex justify-between items-start mb-12">
                <span className={`text-4xl md:text-5xl font-light tracking-tighter ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  {project.id}
                </span>
                <span className={`text-[8px] font-mono tracking-widest max-w-[120px] text-right uppercase ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}>
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className={`text-2xl font-black tracking-tight mb-4 ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  {project.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-8 ${
                  isDark ? 'text-white/60' : 'text-black/60'
                }`}>
                  {project.description}
                </p>
              </div>

              {/* Tags Cloud */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map(tag => (
                  <span
                    key={tag}
                    className={`text-[9px] font-mono px-3 py-1.5 rounded bg-black/5 dark:bg-white/5 uppercase tracking-widest ${
                      isDark ? 'text-white/40' : 'text-black/40'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
