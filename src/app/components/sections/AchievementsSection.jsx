'use client';
import { motion } from 'framer-motion';

const achievements = [
  {
    title: "Gold Medal",
    issuer: "I2ASPO 2025",
    link: "#"
  },
  {
    title: "Silver Medal",
    issuer: "MTE 2025",
    link: "#"
  },
  {
    title: "Silver Medal",
    issuer: "IPITEX 2024",
    link: "#"
  }
];

export default function AchievementsSection({ isDark }) {
  return (
    <section
      id="achievements"
      className={`py-32 px-6 md:px-10 overflow-hidden ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header split layout */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-20">
          <div>
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
                Recognition
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`text-5xl md:text-[5vw] font-black tracking-tighter leading-[0.9] ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              Awards and
              <br />
              Achievements
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`md:max-w-sm text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'} md:mt-auto`}
          >
            A collection of academic and professional recognitions that reflect my dedication to excellence and continuous innovation.
          </motion.div>
        </div>

        {/* Content Split: Left (Gallery), Right (List of achievements) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left: Masonry-style gallery overlapping */}
          <div className="w-full lg:w-1/2 relative min-h-[400px]">
            <motion.div 
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 top-0 w-3/5 aspect-square rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <img src="/images/activity-gold-medal.png" alt="Gold Medal" className="w-full h-full object-cover" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 60, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute right-0 top-1/4 w-1/2 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl z-20"
            >
              <img src="/images/activity-ipitex.jpg" alt="IPITEX" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 80, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute left-1/4 top-1/2 w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl z-30"
            >
              <img src="/images/activity-fibobites.jpg" alt="FiBoBites" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* Right: List of Pill Cards */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-center mt-32 lg:mt-0">
            {achievements.map((item, i) => (
              <motion.a
                key={item.title + i}
                href={item.link}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-300 group ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10' 
                    : 'bg-white hover:bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDark ? 'text-white' : 'text-black'}>
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                  </div>
                  <span className={`font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                    {item.title}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-mono tracking-widest uppercase hidden sm:block ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    {item.issuer}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
