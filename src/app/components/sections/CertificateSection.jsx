'use client';
import { motion } from 'framer-motion';

const certificates = [
  { name: 'IPITEX 2024 Silver Medal', issuer: 'National Research Council of Thailand', year: '2024' },
  { name: 'I2ASPO 2025 Gold Medal', issuer: 'International Science Project Olympiad', year: '2025' },
  { name: 'MTE 2025 Silver Medal', issuer: 'Malaysia Technology Expo', year: '2025' },
  { name: 'SIMT Kemendikdasmen', issuer: 'Kementerian Pendidikan Dasar dan Menengah', year: '2024-2025' },
  { name: 'Olimpiade Siswa Jenius', issuer: 'National Olympiad', year: '2024' },
  { name: 'Olimpiade Prestasi Gemilang', issuer: 'National Olympiad', year: '2024' },
];

export default function CertificateSection({ isDark }) {
  return (
    <section
      id="certificates"
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
            / CERTIFICATES
          </span>
          <h2
            className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-none ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Verified
            <br />
            Credentials.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-all duration-300 ${
                isDark
                  ? 'border-white/5 bg-white/[0.02] hover:border-white/15'
                  : 'border-black/5 bg-black/[0.02] hover:border-black/15'
              }`}
            >
              <div>
                <h4
                  className={`text-sm font-bold tracking-wide mb-1 ${
                    isDark ? 'text-white/80' : 'text-black/80'
                  }`}
                >
                  {cert.name}
                </h4>
                <span
                  className={`text-[10px] font-mono tracking-widest ${
                    isDark ? 'text-white/30' : 'text-black/30'
                  }`}
                >
                  {cert.issuer}
                </span>
              </div>
              <span
                className={`text-[10px] font-mono tracking-widest shrink-0 ${
                  isDark ? 'text-white/20' : 'text-black/20'
                }`}
              >
                {cert.year}
              </span>
            </motion.div>
          ))}
        </div>

        {/* SIMT Verification Link */}
        <motion.a
          href="https://simt.kemendikdasmen.go.id/resume?id=yTxuz0hc23fPpqUgw90Aew&name=fadhil-muhammad-syafiq-lubis"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
            isDark
              ? 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
              : 'bg-black/5 text-black/60 border border-black/10 hover:bg-black/10 hover:text-black'
          }`}
        >
          Verify on SIMT Kemendikdasmen →
        </motion.a>
      </div>
    </section>
  );
}
