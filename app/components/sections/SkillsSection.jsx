'use client';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const skills = [
  { name: 'Scientific Research', icon: '🔬', color: '#00f0ff' },
  { name: 'Problem Solving', icon: '🧩', color: '#8b5cf6' },
  { name: 'Critical Thinking', icon: '🧠', color: '#ffd700' },
  { name: 'Engineering & Technology', icon: '⚙️', color: '#ff6b9d' },
  { name: 'Financial & Market Analysis', icon: '📊', color: '#00f0ff' },
  { name: 'Public Speaking', icon: '🎤', color: '#8b5cf6' },
  { name: 'Teamwork & Collaboration', icon: '🤝', color: '#ffd700' },
];

function SkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
      className="group cursor-pointer"
      style={{ perspective: '800px' }}
    >
      <div
        className="glass rounded-2xl p-6 h-full transition-all duration-200 relative overflow-hidden"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovering ? 1.03 : 1})`,
          transformStyle: 'preserve-3d',
          boxShadow: hovering ? `0 0 30px ${skill.color}25, 0 0 60px ${skill.color}10` : 'none',
          borderColor: hovering ? `${skill.color}40` : 'rgba(255,255,255,0.08)',
        }}
      >
        {/* Shimmer effect */}
        {hovering && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${skill.color}30 50%, transparent 60%)`,
              animation: 'shimmer 1.5s ease-in-out infinite',
            }}
          />
        )}
        <div className="text-4xl mb-4" style={{ transform: 'translateZ(20px)' }}>{skill.icon}</div>
        <h3 className="font-display font-semibold text-lg text-white/90 group-hover:text-white transition"
          style={{ transform: 'translateZ(15px)' }}>
          {skill.name}
        </h3>
        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
            opacity: hovering ? 1 : 0,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Skills & Expertise</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A diverse set of abilities cultivated through competition, research, and hands-on innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
