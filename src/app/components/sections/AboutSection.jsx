'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { label: 'International Medals', value: '3' },
  { label: 'National Awards', value: '6+' },
  { label: 'Web Projects', value: '4' },
  { label: 'Research Papers', value: '3' },
];

export default function AboutSection({ isDark }) {
  return (
    <section
      id="about"
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
          className="mb-20"
        >
          <span
            className={`text-[10px] tracking-[0.5em] font-mono block mb-3 ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            / ABOUT ME
          </span>
          <h2
            className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-none ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Who
            <br />
            Am I.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden group">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/formal-red.jpg"
                  alt="Fadhil Muhammad Syafiq Lubis"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? 'bg-gradient-to-t from-[#0F0F11] via-transparent to-transparent opacity-60'
                      : 'bg-gradient-to-t from-[#EAEAEA] via-transparent to-transparent opacity-60'
                  }`}
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span
                  className={`text-[9px] font-mono tracking-widest ${
                    isDark ? 'text-white/40' : 'text-white/60'
                  }`}
                >
                  MEDAN / IDN
                </span>
                <span
                  className={`text-[9px] font-mono tracking-widest ${
                    isDark ? 'text-white/40' : 'text-white/60'
                  }`}
                >
                  3.5952° N
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + Stats */}
          <div className="lg:col-span-7 flex flex-col gap-10 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-5"
            >
              <p
                className={`text-xl md:text-2xl leading-relaxed font-light ${
                  isDark ? 'text-white/80' : 'text-black/80'
                }`}
              >
                Hi, I&apos;m Fadhil Muhammad Syafiq Lubis — a student researcher, innovator, and developer from Medan, Indonesia.
              </p>
              <p
                className={`text-sm md:text-base leading-relaxed ${
                  isDark ? 'text-white/50' : 'text-black/50'
                }`}
              >
                I love solving real-world problems through science, technology, and creative thinking. I&apos;ve represented Indonesia at international innovation competitions in Thailand and Malaysia, winning gold and silver medals for projects focused on sustainability and social impact.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`p-5 rounded-2xl text-center border ${
                    isDark
                      ? 'border-white/5 bg-white/[0.02]'
                      : 'border-black/5 bg-black/[0.02]'
                  }`}
                >
                  <div
                    className={`text-3xl font-black mb-1 ${
                      isDark ? 'text-white' : 'text-black'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-[9px] font-mono tracking-widest uppercase ${
                      isDark ? 'text-white/30' : 'text-black/30'
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* What Drives Me */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`border-l-2 pl-6 py-2 ${
                isDark ? 'border-white/15' : 'border-black/15'
              }`}
            >
              <p
                className={`text-[10px] font-mono tracking-widest uppercase mb-2 ${
                  isDark ? 'text-white/30' : 'text-black/30'
                }`}
              >
                What Drives Me
              </p>
              <p
                className={`text-sm font-medium leading-relaxed mb-6 ${
                  isDark ? 'text-white/70' : 'text-black/70'
                }`}
              >
                I believe that the best solutions come from combining scientific research with real hands-on engineering. My goal is to create projects that have a genuine positive impact on people and the environment.
              </p>

              <a
                href="/docs/CV_Fadhil_Muhammad_Syafiq_Lubis_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                  isDark
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                <span>Download Resume</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
