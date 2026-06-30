'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const timeline = [
  {
    year: '2025',
    title: 'I2SPO — GOLD MEDAL',
    desc: 'Won a Gold Medal at the International Science Project Olympiad for sustainable technology innovation.',
    badge: 'GOLD',
  },
  {
    year: '2025',
    title: 'MALAYSIA TECHNOLOGY EXPO',
    desc: 'Presented engineering and software innovations, earning a Silver Medal in Kuala Lumpur.',
    badge: 'SILVER',
  },
  {
    year: '2024',
    title: 'IPITEX THAILAND',
    desc: 'Earned a Silver Medal for a scientific innovation project at Thailand Inventors\' Day in Bangkok.',
    badge: 'SILVER',
  },
  {
    year: 'ONGOING',
    title: 'CONTINUOUS LEARNING',
    desc: 'Expanding skills in full-stack development, research methodology, and entrepreneurship.',
    badge: 'ACTIVE',
  },
];

export default function EducationSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-55%']);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        {/* Section Title */}
        <div className="absolute top-20 left-10 z-20 pointer-events-none">
          <span className="text-[10px] tracking-[0.5em] font-mono text-white/30 block mb-3">/ TIMELINE</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none text-white">
            MY JOURNEY.
          </h2>
        </div>

        <div className="absolute top-20 right-10 z-20 pointer-events-none font-mono text-[9px] text-white/30 tracking-widest text-right">
          SCROLL DOWN TO EXPLORE
        </div>

        {/* Horizontal Moving Strip */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 px-10 md:px-24 items-center w-max h-[60vh] mt-20"
        >
          
          {/* Opening Panel */}
          <div className="w-[300px] md:w-[450px] flex-shrink-0 flex flex-col justify-center pr-12">
            <span className="text-[120px] font-extrabold leading-[0.8] tracking-tighter text-white/10 uppercase select-none font-mono">
              TIME
            </span>
            <span className="text-[120px] font-extrabold leading-[0.8] tracking-tighter text-white/10 uppercase select-none font-mono">
              LINE
            </span>
          </div>

          {/* Photo Panel */}
          <div className="w-[320px] md:w-[400px] h-full flex-shrink-0 relative border border-white/10 p-2 bg-neutral-950/45">
            <div className="relative w-full h-full overflow-hidden bg-neutral-900">
              <Image
                src="/images/photo2.jpg"
                alt="Fadhil Muhammad Syafiq Lubis at MTE 2025"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out scale-105 hover:scale-100"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] font-mono tracking-widest text-white/80 uppercase">MTE 2025 // MALAYSIA</p>
                <p className="text-[8px] font-mono tracking-widest text-white/40 uppercase">Expo Presentation</p>
              </div>
            </div>
          </div>

          {/* Timeline Cards */}
          {timeline.map((item, index) => (
            <div
              key={index}
              className="w-[300px] md:w-[380px] h-full flex-shrink-0 border border-white/10 p-8 flex flex-col justify-between bg-neutral-950/20 hover:border-white transition-all group"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <span className="text-sm font-mono text-white/40 tracking-widest">0{index + 1}</span>
                  <span className="text-[9px] font-mono px-3 py-1 border border-white/15 text-white/60 tracking-widest uppercase">
                    {item.badge}
                  </span>
                </div>
                
                <span className="text-[10px] font-mono text-white/30 tracking-widest block mb-2">{item.year}</span>
                <h3 className="text-2xl font-bold tracking-tight text-white uppercase mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {item.title}
                </h3>
              </div>

              <p className="text-[12px] text-white/45 leading-relaxed tracking-wider">
                {item.desc}
              </p>
            </div>
          ))}

          {/* End Panel */}
          <div className="w-[300px] md:w-[400px] h-full flex-shrink-0 flex flex-col justify-center pl-12 border-l border-white/10">
            <span className="text-xs font-mono tracking-widest text-white/30 block mb-4">THE JOURNEY CONTINUES</span>
            <p className="text-xl font-semibold text-white/70 leading-relaxed">
              &quot;Every competition, every project, every late night of coding — it all adds up to who I&apos;m becoming.&quot;
            </p>
          </div>

        </motion.div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-16 left-10 right-10 h-px bg-white/10 z-20">
          <motion.div 
            style={{ scaleX: scrollYProgress }} 
            className="h-full bg-white origin-left"
          />
        </div>

      </div>
    </div>
  );
}
