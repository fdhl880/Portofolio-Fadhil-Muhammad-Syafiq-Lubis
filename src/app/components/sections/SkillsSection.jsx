'use client';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Python', category: 'Language' },
  { name: 'Three.js', category: '3D/WebGL' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Supabase', category: 'Database' },
  { name: 'Git & GitHub', category: 'Tools' },
  { name: 'Vercel', category: 'Deployment' },
  { name: 'Arduino', category: 'Hardware' },
  { name: 'IoT', category: 'Hardware' },
  { name: 'Research & Writing', category: 'Academic' },
  { name: 'AI / Gemini API', category: 'AI' },
];

export default function SkillsSection({ isDark }) {
  return (
    <section
      id="skills"
      className={`py-32 px-6 md:px-10 ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span
            className={`text-[10px] tracking-[0.5em] font-mono block mb-3 ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            / SKILLS
          </span>
          <h2
            className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-none ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Tech
            <br />
            Stack.
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-5 py-3 rounded-full border cursor-default transition-all duration-300 ${
                isDark
                  ? 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
                  : 'border-black/10 bg-black/[0.03] hover:border-black/25 hover:bg-black/[0.06]'
              }`}
            >
              <span
                className={`text-sm font-semibold tracking-wide ${
                  isDark ? 'text-white/70' : 'text-black/70'
                }`}
              >
                {skill.name}
              </span>
              <span
                className={`text-[8px] font-mono tracking-widest uppercase ml-2 ${
                  isDark ? 'text-white/20' : 'text-black/20'
                }`}
              >
                {skill.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
