'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const GOLD_MEDALS = [
  {
    id: 1,
    title: "Olimpiade Siswa Pintar",
    rank: "GOLD MEDAL",
    level: "National Level",
    year: "2024",
    field: "Mathematics / Logic",
    tagline: "Systematic Excellence"
  },
  {
    id: 2,
    title: "Olimpiade Siswa Jenius",
    rank: "GOLD MEDAL",
    level: "National Level",
    year: "2024",
    field: "Problem Solving",
    tagline: "Cognitive Precision"
  },
  {
    id: 3,
    title: "Olimpiade Prestasi Gemilang",
    rank: "GOLD MEDAL",
    level: "National Level",
    year: "2024",
    field: "Scientific Distiction",
    tagline: "Elite Performance"
  },
  {
    id: 4,
    title: "Best National Student Olympiad",
    rank: "GOLD MEDAL",
    level: "National Level",
    year: "2024",
    field: "Interdisciplinary",
    tagline: "Apex Accomplishment"
  },
  {
    id: 5,
    title: "Kompetisi Pelajar Berprestasi",
    rank: "GOLD MEDAL",
    level: "National Level",
    year: "2024",
    field: "Academic Brilliance",
    tagline: "Methodological Mastery"
  },
  {
    id: 6,
    title: "Kompetisi Siswa Nusantara",
    rank: "GOLD MEDAL",
    level: "National Level",
    year: "2024",
    field: "Holistic Achievement",
    tagline: "Cultural Synergy"
  }
];

export default function GoldArchive() {
  const containerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && scrollContentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = scrollContentRef.current.scrollWidth;
        setConstraints({
          left: -(contentWidth - containerWidth + 100), // extra padding for luxury bounce
          right: 0
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative pt-32 pb-64 bg-black overflow-hidden border-t border-white/5 transform-gpu" id="gold-archive" ref={containerRef}>
      <div className="container mx-auto px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-4 block">Archive 2024</span>
            <h2 className="text-4xl md:text-7xl font-light text-white tracking-tighter leading-none">
                THE GOLD <br />
                DISTINCTION<span className="text-white/20">.</span>
            </h2>
          </div>
          <div className="max-w-md text-right">
            <p className="text-white/50 text-sm leading-relaxed font-light">
              A curated collection of national accolades achieved through rigorous 
              methodological pursuit and systematic technical discipline. 
              Pure gold as the baseline of excellence.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing">
        {/* Interaction Guide */}
        <div className="absolute top-0 left-0 w-full flex justify-center z-30 pointer-events-none select-none">
            <motion.div 
               animate={{ y: [0, 5, 0], opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="flex flex-col items-center gap-2"
            >
                <span className="text-[8px] tracking-[1em] text-white/40 uppercase">Drag to Explore</span>
                <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>
        </div>

        <motion.div 
          ref={scrollContentRef}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.15}
          dragTransition={{ power: 0.2, timeConstant: 300 }}
          className="flex gap-12 px-12 md:px-24 absolute left-0 h-full items-center"
        >
          {GOLD_MEDALS.map((medal, index) => (
            <motion.div 
              key={medal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative w-[300px] md:w-[450px] aspect-[4/5] bg-[#0A0A0A] border border-white/10 p-8 md:p-12 flex flex-col justify-between overflow-hidden"
            >
                {/* Background Text Decor */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none transition-opacity group-hover:opacity-10">
                    <span className="text-9xl font-bold text-white leading-none tracking-tighter italic">
                       {index + 1}
                    </span>
                </div>

                <div className="relative z-20">
                    <div className="flex justify-between items-start mb-6 md:mb-10">
                        <span className="text-[10px] tracking-widest text-white/30 uppercase">{medal.level}</span>
                        <span className="text-[10px] tracking-widest text-[#E5E5E5] font-bold">2024</span>
                    </div>
                    <h3 className="text-2xl md:text-5xl font-light text-white tracking-tighter mb-4 md:mb-6 leading-tight pr-4">
                        {medal.title}
                    </h3>
                    <p className="text-sm text-white/40 italic font-serif max-w-[80%]">
                       "{medal.tagline}"
                    </p>
                </div>

                <div className="relative z-10 mt-auto pt-8 border-t border-white/5 flex flex-col gap-1">
                    <span className="text-xs tracking-widest text-white/60 font-medium uppercase text-[#D4AF37]">
                        {medal.rank}
                    </span>
                    <span className="text-[10px] tracking-widest text-white/30 uppercase">
                        {medal.field}
                    </span>
                </div>

                {/* Animated Inner Border on Hover */}
                <div className="absolute inset-0 border-[0.5px] border-white/0 group-hover:border-white/20 transition-all duration-500 scale-95 group-hover:scale-100 pointer-events-none" />
            </motion.div>
          ))}
          
          {/* Closing Card / Next Section Hint */}
          <div className="w-[300px] md:w-[450px] flex items-center justify-center border border-white/5 bg-white/[0.02] p-12">
            <div className="text-center group cursor-pointer">
                 <p className="text-[10px] tracking-[0.4em] text-white/20 uppercase mb-4">Discovery</p>
                 <h4 className="text-2xl font-light text-white/30 group-hover:text-white transition-colors">CONTINUE JOURNEY</h4>
                 <div className="mt-6 w-12 h-[1px] bg-white/10 group-hover:w-24 group-hover:bg-white transition-all mx-auto" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
