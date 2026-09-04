'use client';
import { motion } from 'framer-motion';

const international = [
  { event: 'I2ASPO 2025', medal: 'GOLD MEDAL', loc: 'International', detail: 'Won a Gold Medal at the International Science Project Olympiad for a sustainable technology innovation project.' },
  { event: 'MTE 2025', medal: 'SILVER MEDAL', loc: 'Malaysia', detail: 'Earned a Silver Medal at Malaysia Technology Expo, presenting engineering and software solutions in Kuala Lumpur.' },
  { event: 'IPITEX 2024', medal: 'SILVER MEDAL', loc: 'Thailand', detail: 'Received a Silver Medal at Thailand Inventors\' Day, representing Indonesia with a scientific innovation project in Bangkok.' },
];

const national = [
  { event: 'Olimpiade Siswa Jenius', medal: 'GOLD MEDAL' },
  { event: 'Olimpiade Prestasi Gemilang', medal: 'GOLD MEDAL' },
  { event: 'Kompetisi Pelajar Berprestasi Indonesia', medal: 'GOLD MEDAL' },
  { event: 'Olimpiade Siswa Pintar', medal: 'GOLD MEDAL' },
  { event: 'Best National Student Olympiad', medal: 'GOLD MEDAL' },
  { event: 'OSN (Olimpiade Sains Nasional)', medal: '10TH PLACE (REGIONAL)' },
  { event: 'OPSI (Olimpiade Penelitian Siswa Indonesia)', medal: 'PARTICIPANT' },
];

export default function AchievementsSection({ isDark }) {
  return (
    <section
      id="achievements"
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
            / ACHIEVEMENTS
          </span>
          <h2
            className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-none ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Awards &
            <br />
            Medals.
          </h2>
        </motion.div>

        {/* International */}
        <div className="mb-16">
          <h3
            className={`text-[10px] font-mono tracking-[0.4em] uppercase mb-8 ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            International Competitions
          </h3>
          <div className="space-y-4">
            {international.map((item, i) => (
              <motion.div
                key={item.event}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`p-6 md:p-8 rounded-2xl border group transition-all duration-300 ${
                  isDark
                    ? 'border-white/5 bg-white/[0.02] hover:border-white/15'
                    : 'border-black/5 bg-black/[0.02] hover:border-black/15'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4
                      className={`text-xl md:text-2xl font-black tracking-tight uppercase mb-2 ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      {item.event}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed max-w-lg ${
                        isDark ? 'text-white/40' : 'text-black/40'
                      }`}
                    >
                      {item.detail}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[9px] font-bold tracking-[0.15em] ${
                        item.medal.includes('GOLD')
                          ? isDark
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                          : isDark
                            ? 'bg-neutral-500/10 text-neutral-300 border border-neutral-500/20'
                            : 'bg-neutral-500/10 text-neutral-600 border border-neutral-500/20'
                      }`}
                    >
                      {item.medal}
                    </span>
                    <span
                      className={`text-[9px] font-mono tracking-widest ${
                        isDark ? 'text-white/20' : 'text-black/20'
                      }`}
                    >
                      {item.loc}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* National */}
        <div>
          <h3
            className={`text-[10px] font-mono tracking-[0.4em] uppercase mb-8 ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            National Competitions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {national.map((item, i) => (
              <motion.div
                key={item.event}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`p-5 rounded-xl border flex items-center justify-between gap-4 ${
                  isDark
                    ? 'border-white/5 bg-white/[0.01]'
                    : 'border-black/5 bg-black/[0.01]'
                }`}
              >
                <span
                  className={`text-sm font-semibold tracking-wide ${
                    isDark ? 'text-white/70' : 'text-black/70'
                  }`}
                >
                  {item.event}
                </span>
                <span
                  className={`text-[8px] font-mono tracking-widest shrink-0 px-3 py-1 rounded-full ${
                    item.medal.includes('GOLD')
                      ? isDark
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-amber-500/10 text-amber-700'
                      : isDark
                        ? 'bg-white/5 text-white/30'
                        : 'bg-black/5 text-black/30'
                  }`}
                >
                  {item.medal}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
