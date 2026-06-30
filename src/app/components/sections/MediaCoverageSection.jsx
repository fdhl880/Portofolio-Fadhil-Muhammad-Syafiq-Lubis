'use client';
import { motion } from 'framer-motion';

const pressArticles = [
  {
    source: 'Waspada.id',
    title: 'Siswa SMP Harapan 1 Raih Medali Perak di Bangkok IPITEX 2024',
    url: 'https://www.waspada.id/pendidikan/siswa-smp-harapan-1-raih-medali-perak-di-bangkok-ipitex-2024/',
    date: '2024',
    category: 'International Achievement'
  },
  {
    source: 'Waspada.id',
    title: 'Tiga Tim Riset Delegasi SMP Harapan 1 Medan Raih Medali Emas pada Kompetisi Internasional I2ASPO 2025',
    url: 'https://www.waspada.id/pendidikan/tiga-tim-riset-delegasi-smpharapan-1-medan-raih-medaliemas-pada-kompetisiinternasional-i2aspo-2025/',
    date: '2025',
    category: 'International Achievement'
  }
];

export default function MediaCoverageSection() {
  return (
    <section id="media" className="bg-black py-40 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.5em] font-mono text-white/30 block mb-3">/ PRESS & MEDIA</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">
              MEDIA<br />COVERAGE.
            </h2>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-white/40 max-w-xs md:text-right">
            OFFICIAL NEWS AND PUBLICATIONS HIGHLIGHTING ACHIEVEMENTS
          </div>
        </div>

        {/* Articles List */}
        <div className="flex flex-col border-t border-white/10">
          {pressArticles.map((article, index) => (
            <motion.a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4 -mx-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                    {article.source}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                    {article.date}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                    {article.category}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-3xl font-bold tracking-tight text-white group-hover:text-white/70 transition-colors leading-snug">
                  {article.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 shrink-0 mt-4 md:mt-0">
                <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase group-hover:text-white transition-colors duration-500">
                  Read Article
                </span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                  <svg className="w-4 h-4 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
