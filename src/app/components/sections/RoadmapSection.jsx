'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const roadmapData = [
  {
    year: '2024',
    title: 'The Spark of Invention',
    event: 'IPITEx Thailand',
    desc: 'The beginning of our brand heritage. Represented scientific innovation on an international level.'
  },
  {
    year: '2024',
    title: 'Precision Expansion',
    event: 'MTEX Kuala Lumpur',
    desc: 'Broadening the engineering horizon. A milestone in regional technological development.'
  },
  {
    year: '2025',
    title: 'The Apex Achievement',
    event: 'I2ASPO Gold Standard',
    desc: 'Achieving the highest distinction in applied science, confirming the brand’s commitment to excellence.'
  },
  {
    year: 'Futurity',
    title: 'The Continuous Pursuit',
    event: 'Atelier Vision',
    desc: 'Merging quantitative strategy with advanced engineering to solve the challenges of the coming decade.'
  }
];

export default function RoadmapSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} id="roadmap" className="relative py-32 px-6 bg-black border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-32 gap-6">
        <span className="text-white/20 text-[10px] tracking-[0.8em] uppercase font-sans">Chronology</span>
        <h2 className="font-display text-5xl md:text-7xl">The Evolution of <br /><span className="italic opacity-40">Excellence.</span></h2>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Central Luxury Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5">
          <motion.div 
            style={{ scaleY: pathScale, transformOrigin: 'top' }}
            className="absolute inset-0 bg-white opacity-40"
          />
        </div>

        <div className="space-y-32">
          {roadmapData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: idx * 0.1 }}
              className={`relative flex items-center justify-between w-full flex-col md:flex-row ${
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="w-full md:w-[42%] flex flex-col gap-6">
                <div className={`flex items-baseline gap-4 ${idx % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                  <span className="font-display text-lg italic text-white/20">/{item.year}</span>
                  <h3 className="font-display text-2xl md:text-4xl uppercase tracking-widest">{item.title}</h3>
                </div>
                
                <p className={`text-white/40 text-sm leading-relaxed max-w-sm ${idx % 2 === 0 ? 'text-left' : 'md:text-right ml-auto'}`}>
                  {item.desc}
                </p>

                <div className={`flex items-center gap-4 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  <div className="w-12 h-px bg-white/10" />
                  <span className="text-[10px] tracking-widest uppercase text-white/30 font-sans">{item.event}</span>
                </div>
              </div>

              {/* Node Indicator */}
              <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white opacity-20 border-4 border-black" />
              
              {/* Ghost Placeholder for Spacing */}
              <div className="hidden md:block w-[42%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
