'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

const projects = [
  {
    title: 'Scientific Research and Innovation',
    desc: 'Conducting cutting-edge research in science, developing innovative solutions to real-world problems, and presenting findings at international competitions.',
    icon: '🔬',
    color: '#00f0ff',
    tags: ['Research', 'Innovation', 'Science'],
  },
  {
    title: 'Engineering and Technology Development',
    desc: 'Building technology prototypes and engineering solutions, leveraging modern tools and frameworks to create impactful projects.',
    icon: '⚙️',
    color: '#8b5cf6',
    tags: ['Engineering', 'Prototyping', 'Technology'],
  },
  {
    title: 'Financial Markets and Trading Analysis',
    desc: 'Analyzing financial markets, studying trading strategies, and developing insights into market behavior and economic trends.',
    icon: '📈',
    color: '#ffd700',
    tags: ['Finance', 'Analysis', 'Markets'],
  },
  {
    title: 'Entrepreneurship and Business Ideas',
    desc: 'Developing innovative business concepts, creating business models, and exploring entrepreneurial opportunities in emerging markets.',
    icon: '💡',
    color: '#ff6b9d',
    tags: ['Business', 'Startups', 'Innovation'],
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      className="group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <div
        className="glass rounded-2xl p-6 md:p-8 h-full transition-all duration-200 relative overflow-hidden"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          boxShadow: hovered ? `0 10px 40px ${project.color}15, 0 0 60px ${project.color}08` : 'none',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        />

        <div className="text-4xl mb-4">{project.icon}</div>
        <h3
          className="font-display text-xl font-bold mb-3 transition-colors"
          style={{ color: hovered ? project.color : '#ffffff' }}
        >
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border"
              style={{
                borderColor: `${project.color}30`,
                color: `${project.color}cc`,
                background: `${project.color}08`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Technical Reveal Overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-end p-6 bg-dark/40 backdrop-blur-[2px]"
            >
              <div className="absolute inset-0 border border-cyan-500/30 m-2 rounded-xl pointer-events-none" />
              {/* Scanning line */}
              <motion.div 
                animate={{ y: [0, 200, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="absolute top-0 left-2 right-2 h-px bg-cyan-400/30 blur-sm"
              />
              
              <div className="relative font-mono text-[8px] text-cyan-400/80 leading-tight space-y-1">
                <div>{"// OBJECT_ANALYSIS: COMPLETED"}</div>
                <div>{"// DATA_STREAM: ACTIVE"}</div>
                <div>{"// SECTOR_READ: 0x"}{index}{"F4A"}</div>
                <div className="text-[10px] text-white font-bold tracking-widest mt-2">
                  {"PERMISSION: GRANTED_ >"}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover glow overlay */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl z-10"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${project.color}10, transparent 60%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section id="projects" ref={containerRef} className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-neon/5 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-violet/5 blur-[120px] pointer-events-none" 
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Areas of focus spanning science, engineering, finance, and entrepreneurship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
