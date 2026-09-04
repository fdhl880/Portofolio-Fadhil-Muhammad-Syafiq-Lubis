'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection({ isDark }) {
  // 3D Tilt for the "Trait" card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 30, stiffness: 200 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="about"
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
            About Me
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
          Tech Innovator.
          <br />
          Applied Scientist.
        </motion.h2>

        {/* Content Split */}
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          
          {/* Left Column: Avatar & Bio */}
          <div className="flex-1 w-full">
            {/* Header: Avatar + Name + Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start gap-8 mb-12"
            >
              <div className="relative w-24 h-24 shrink-0 rounded-full overflow-hidden border border-black/10 dark:border-white/10">
                <Image
                  src="/images/formal-red.jpg"
                  alt="Fadhil M.S. Lubis"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <h3 className={`font-bold uppercase tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
                    FADHIL M. S. LUBIS
                  </h3>
                  {/* Verified Checkmark */}
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>

                {/* Stats Row */}
                <div className={`grid grid-cols-3 gap-8 text-[10px] font-mono tracking-widest uppercase ${
                  isDark ? 'text-white/60' : 'text-black/60'
                }`}>
                  <div>
                    <span className="block opacity-50 mb-1">Projects</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>10+</span>
                  </div>
                  <div>
                    <span className="block opacity-50 mb-1">Awards</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>5+</span>
                  </div>
                  <div>
                    <span className="block opacity-50 mb-1">Status</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>Innovating</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`space-y-6 text-sm leading-relaxed max-w-2xl ${
                isDark ? 'text-white/60' : 'text-black/60'
              }`}
            >
              <p>
                I&apos;m a student researcher and developer focused on transforming academic concepts into tangible, world-changing solutions. I enjoy tackling complex problems involving environmental sustainability, maritime technology, and food science.
              </p>
              <p>
                Throughout my journey, I&apos;ve gained hands-on experience building prototypes, developing IoT systems, and presenting at international stages like IPITEX Bangkok. My work has been recognized globally, giving me a unique perspective that bridges technical engineering and scientific research.
              </p>
              <p className="pt-4">
                Want to know more about my experience?{' '}
                <a
                  href="/docs/CV_Fadhil_Muhammad_Syafiq_Lubis_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-bold underline underline-offset-4 decoration-2 ${
                    isDark ? 'text-white hover:text-white/70' : 'text-black hover:text-black/70'
                  }`}
                >
                  Download my resume.
                </a>
              </p>
            </motion.div>
          </div>

          {/* Right Column: 3D Trait Card (Richard Miculob Style) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/3 flex justify-center lg:justify-end mt-12 lg:mt-0 perspective-[1000px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative">
              {/* Background Shadow Card */}
              <div 
                className={`absolute inset-0 rounded-3xl translate-x-4 translate-y-4 ${
                  isDark ? 'bg-white/5' : 'bg-black/5'
                }`} 
              />
              
              {/* Floating Card */}
              <motion.div
                style={{ 
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d" 
                }}
                className={`relative w-64 md:w-80 aspect-[4/3] rounded-3xl p-8 flex flex-col justify-between ${
                  isDark 
                    ? 'bg-[#18181b] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]' 
                    : 'bg-white border border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.05)]'
                }`}
              >
                <div style={{ transform: "translateZ(30px)" }}>
                  <span className={`text-[9px] font-mono tracking-[0.2em] uppercase ${
                    isDark ? 'text-white/40' : 'text-black/40'
                  }`}>
                    TRAIT
                  </span>
                </div>
                
                <h3 
                  style={{ transform: "translateZ(60px)" }}
                  className={`text-3xl font-black tracking-tight leading-none ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                >
                  Scientific
                  <br />
                  Explorer
                </h3>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
