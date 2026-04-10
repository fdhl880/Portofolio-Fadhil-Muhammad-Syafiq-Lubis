'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Custom CountUp hook for buttery smooth number animation
function useCountUp(end, duration = 2, delay = 0, inView = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Delay before starting
      if (progress < delay * 1000) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const activeProgress = progress - (delay * 1000);
      const percentage = Math.min(activeProgress / (duration * 1000), 1);
      
      // Ease out expo
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, delay, inView]);

  return count;
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const value = useCountUp(stat.value, 2.5, index * 0.2, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="flex flex-col items-center justify-center text-center group"
    >
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-6xl md:text-8xl lg:text-[10rem] text-white tabular-nums tracking-tighter leading-none group-hover:text-cyan-400 transition-colors duration-700"
        >
          {value}{stat.suffix}
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
        className="mt-6 flex flex-col items-center"
      >
        <span className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-[0.3em] mb-2">{stat.label}</span>
        <span className="text-white/30 text-xs md:text-sm max-w-[200px] leading-relaxed">{stat.desc}</span>
      </motion.div>
    </motion.div>
  );
}

export default function MissionStats() {
  const stats = [
    { value: 3, suffix: '', label: 'Intl. Medals', desc: 'Gold & Silver at global innovation arenas.' },
    { value: 6, suffix: '+', label: 'National Awards', desc: 'Recognized for pioneering engineering solutions.' },
    { value: 99, suffix: '%', label: 'Innovation Spec', desc: 'Relentless focus on sustainable tech & finance.' }
  ];

  return (
    <section id="mission-stats" className="relative py-32 md:py-48 bg-[#020208] border-y border-white/5 overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] opacity-[0.03]" />
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20">
        
        <div className="mb-24 flex flex-col items-center text-center">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] text-cyan-400 uppercase tracking-[0.5em] mb-4"
            >
              System // By The Numbers
            </motion.span>
            <motion.h2 
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight"
            >
              MISSION STATS
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-10 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
