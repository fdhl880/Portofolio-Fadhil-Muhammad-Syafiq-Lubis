'use client';
import { motion } from 'framer-motion';

const international = [
  { event: 'I2SPO 2025', medal: 'GOLD MEDAL', loc: 'International', detail: 'Won a Gold Medal at the International Science Project Olympiad for a sustainable technology innovation project.' },
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

export default function AchievementsSection() {
  return (
    <section id="achievements" className="bg-black py-40 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.5em] font-mono text-white/30 block mb-3">/ ACHIEVEMENTS</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">
              AWARDS &<br />MEDALS.
            </h2>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-white/40 max-w-xs md:text-right">
            MEDALS AND AWARDS FROM INTERNATIONAL & NATIONAL COMPETITIONS
          </div>
        </div>

        {/* International Awards */}
        <div className="mb-24">
          <span className="text-[11px] font-mono tracking-[0.4em] text-white/30 block mb-8 uppercase">International Awards</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {international.map((item, index) => (
              <motion.div
                key={item.event}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="border border-white/10 p-8 flex flex-col justify-between min-h-[300px] hover:border-white/30 transition-all bg-neutral-950/45 group"
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-mono tracking-widest text-white/40">{item.loc}</span>
                    <span className="text-[9px] font-mono px-3 py-1 border border-white/10 group-hover:bg-white group-hover:text-black transition-colors duration-500 uppercase tracking-widest">
                      {item.medal}
                    </span>
                  </div>
                  <h3 className="text-3xl font-extrabold tracking-tight uppercase mb-4">
                    {item.event}
                  </h3>
                  <p className="text-[12px] text-white/40 leading-relaxed tracking-wider">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* National Awards Table */}
        <div>
          <span className="text-[11px] font-mono tracking-[0.4em] text-white/30 block mb-8 uppercase">National Awards</span>
          
          <div className="border border-white/10 bg-neutral-950/20">
            {/* Table Header */}
            <div className="grid grid-cols-12 p-4 border-b border-white/15 text-[9px] font-mono tracking-widest text-white/30 uppercase">
              <div className="col-span-8 md:col-span-9">Competition</div>
              <div className="col-span-4 md:col-span-3 text-right">Result</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/5">
              {national.map((item, idx) => (
                <div 
                  key={idx}
                  className="grid grid-cols-12 p-5 items-center hover:bg-white/[0.02] transition-colors"
                >
                  <div className="col-span-8 md:col-span-9">
                    <div className="text-sm font-semibold tracking-wide text-white">{item.event}</div>
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right">
                    <span className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 border ${
                      item.medal === 'GOLD MEDAL' 
                        ? 'border-white/20 text-white font-bold bg-white/5' 
                        : 'border-white/5 text-white/40'
                    }`}>
                      {item.medal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
