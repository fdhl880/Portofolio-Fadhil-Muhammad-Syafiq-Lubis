import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';

const SectionMedia = dynamic(() => import('../ui/SectionMedia'), { ssr: false });

export default function ManifestoSection() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tracking
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const manifestoLines = [
    "PRECISION IS NOT A CHOICE.",
    "IT IS THE LANGUAGE OF THE ATELIER.",
    "EVERY PIXEL CALCULATED.",
    "EVERY MOTION INTENTIONAL.",
    "ARCHIVING THE FUTURE."
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-black flex flex-col items-center justify-center p-6 md:p-24 overflow-hidden cursor-none"
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cinematic Background (Atelier Mode Only) - Cosmic Setup */}
      <SectionMedia src="https://cdn.pixabay.com/video/2020/05/25/40149-425026920_large.mp4" type="video" opacity={0.3} />

      {/* Background Decorative Element */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-6xl flex flex-col gap-4 md:gap-8"
      >
        <span className="text-[10px] tracking-[1em] text-[#D4AF37] uppercase mb-4 opacity-40">The Manifesto</span>
        
        <div className="flex flex-col gap-2 md:gap-4 select-none">
          {manifestoLines.map((line, i) => (
            <motion.h2 
              key={i}
              className="text-3xl md:text-7xl lg:text-8xl font-display uppercase tracking-tighter leading-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.h2>
          ))}
        </div>
      </motion.div>

      {/* The Spotlight Overlay */}
      <motion.div 
        className="absolute inset-x-0 inset-y-0 z-20 pointer-events-none hidden md:block"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), transparent 0%, rgba(0,0,0,0.95) 100%)`,
        }}
      />

      {/* Dynamic CSS Variables for the Spotlight */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[100] mix-blend-difference"
        animate={{
          clipPath: `circle(${isHovered ? '150px' : '0px'} at ${mousePos.x}px ${mousePos.y}px)`
        }}
      >
         <div className="w-full h-full bg-white opacity-20 blur-xl" />
      </motion.div>

      <style jsx>{`
        section {
          --x: ${mousePos.x}px;
          --y: ${mousePos.y}px;
        }
      `}</style>
    </section>
  );
}
