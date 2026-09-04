'use client';
import { motion } from 'framer-motion';

const articles = [
  {
    title: 'Siswa SMP Harapan 1 Raih Medali Perak di Bangkok IPITEX 2024',
    source: 'Waspada Online',
    url: 'https://www.waspada.id/pendidikan/siswa-smp-harapan-1-raih-medali-perak-di-bangkok-ipitex-2024/',
    year: '2024',
  },
  {
    title: 'Tiga Tim Riset Delegasi SMP Harapan 1 Medan Raih Medali Emas pada Kompetisi Internasional I2ASPO 2025',
    source: 'Waspada Online',
    url: 'https://www.waspada.id/pendidikan/tiga-tim-riset-delegasi-smpharapan-1-medan-raih-medaliemas-pada-kompetisiinternasional-i2aspo-2025/',
    year: '2025',
  },
];

export default function MediaCoverageSection({ isDark }) {
  return (
    <section
      id="media"
      className={`py-32 px-6 md:px-10 ${
        isDark ? 'bg-[#0F0F11]' : 'bg-[#EAEAEA]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span
            className={`text-[10px] tracking-[0.5em] font-mono block mb-3 ${
              isDark ? 'text-white/30' : 'text-black/30'
            }`}
          >
            / MEDIA
          </span>
          <h2
            className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-none ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Press
            <br />
            Coverage.
          </h2>
        </motion.div>

        <div className="space-y-4">
          {articles.map((article, i) => (
            <motion.a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`block p-6 md:p-8 rounded-2xl border group transition-all duration-300 cursor-pointer ${
                isDark
                  ? 'border-white/5 bg-white/[0.02] hover:border-white/20'
                  : 'border-black/5 bg-black/[0.02] hover:border-black/20'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h4
                    className={`text-lg md:text-xl font-bold tracking-tight mb-2 group-hover:translate-x-1 transition-transform duration-500 ${
                      isDark ? 'text-white/80' : 'text-black/80'
                    }`}
                  >
                    {article.title}
                  </h4>
                  <span
                    className={`text-[10px] font-mono tracking-widest uppercase ${
                      isDark ? 'text-white/30' : 'text-black/30'
                    }`}
                  >
                    {article.source} • {article.year}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform duration-500 ${
                    isDark ? 'text-white/20 group-hover:text-white/60' : 'text-black/20 group-hover:text-black/60'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
