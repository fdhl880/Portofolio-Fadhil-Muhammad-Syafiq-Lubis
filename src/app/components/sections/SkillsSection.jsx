'use client';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Scientific Research', level: '95%', desc: 'Designing experiments, writing research papers, and presenting findings at competitions.' },
  { name: 'Engineering & Tech', level: '90%', desc: 'Building hardware prototypes and software applications from concept to finished product.' },
  { name: 'Financial Analysis', level: '88%', desc: 'Studying market trends, analyzing trading strategies, and understanding economic data.' },
  { name: 'Problem Solving', level: '92%', desc: 'Breaking down complex problems into clear, step-by-step solutions.' },
  { name: 'Critical Thinking', level: '90%', desc: 'Evaluating information carefully and making well-reasoned decisions.' },
  { name: 'Public Speaking', level: '94%', desc: 'Presenting research and ideas confidently to international juries and audiences.' },
  { name: 'Team Collaboration', level: '88%', desc: 'Working effectively with diverse teams under competition pressure.' },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-black py-40 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.5em] font-mono text-white/30 block mb-3">/ SKILLS</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">
              WHAT I<br />CAN DO.
            </h2>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-white/40 max-w-xs md:text-right">
            MY KEY SKILLS AND AREAS OF EXPERTISE
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="border border-white/10 p-8 flex flex-col justify-between min-h-[220px] bg-neutral-950/30 hover:border-white transition-all duration-300 group relative overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] font-mono text-white/30 tracking-widest">0{index + 1}</span>
                  <span className="text-sm font-mono text-white/60 font-bold">{skill.level}</span>
                </div>
                
                <h3 className="text-xl font-bold tracking-tight uppercase text-white mb-3 group-hover:text-white transition-colors">
                  {skill.name}
                </h3>
                
                <p className="text-xs text-white/40 leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-px bg-white/5 mt-8 relative overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-white/40 group-hover:bg-white transition-colors duration-500" 
                  style={{ width: skill.level }}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
