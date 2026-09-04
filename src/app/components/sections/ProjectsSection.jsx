'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    id: '01',
    title: 'Research Buddy Consultant',
    category: 'RESEARCH & EDUCATION',
    description: 'An affordable research consultant service and AI-powered assistant that helps students and researchers organize, analyze, and present their findings more effectively.',
    tech: ['Next.js', 'AI', 'Tailwind'],
    image: '/images/project-researchbuddy.jpg',
  },
  {
    id: '02',
    title: 'PyroFuel App',
    category: 'LOGISTICS & SUSTAINABILITY',
    description: 'A waste-to-fuel logistics platform for sustainable energy management. Track pickups, manage drop-offs, and learn about pyrolysis technology.',
    tech: ['React', 'Logistics', 'IoT'],
    link: 'https://pyrofuelappharsa.vercel.app/',
    image: '/images/project-pyrofuel.jpg',
  },
  {
    id: '03',
    title: 'Boneato',
    category: 'HEALTH & NUTRITION',
    description: 'AI-powered nutrition tracking and child health monitoring app. Scan food, chat with AI, and track daily nutritional intake.',
    tech: ['AI', 'Health', 'React'],
    link: 'https://boneato.vercel.app/',
    image: '/images/project-boneato.jpg',
  },
  {
    id: '04',
    title: 'NusaMatika',
    category: 'EDUCATIONAL GAMING',
    description: 'Interactive mathematics learning suite with multiplayer arena, solo challenges, and 3D physics-based games.',
    tech: ['Gaming', '3D', 'Education'],
    link: 'https://math-games-by-9-d.vercel.app/',
    image: '/images/project-nusamatika.jpg',
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className={`group flex flex-col h-full rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-transform duration-500 cursor-pointer ${
                isDark 
                  ? 'bg-white/5 border border-white/5 hover:border-white/20' 
                  : 'bg-white border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-black/20'
              }`}
            >
              {/* Image Header */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#1A1A1A]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content Box */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Header: Index & Category */}
                <div className="flex justify-between items-start mb-8">
                  <span className={`text-4xl font-light tracking-tighter ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {project.id}
                  </span>
                  <span className={`text-[9px] font-mono tracking-widest text-right uppercase mt-2 ${
                    isDark ? 'text-white/40' : 'text-black/40'
                  }`}>
                    {project.category}
                  </span>
                </div>

                {/* Details */}
                <div className="mb-8 flex-grow">
                  <h3 className={`text-3xl font-black tracking-tight mb-4 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
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
                      className={`text-[9px] font-mono px-3 py-1.5 rounded uppercase tracking-widest ${
                        isDark ? 'bg-black/50 text-white/50 group-hover:text-white/90' : 'bg-black/5 text-black/50 group-hover:text-black/90'
                      } transition-colors duration-300`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>

          ))}
        </div>
      </div>
    </section>
  );
}
