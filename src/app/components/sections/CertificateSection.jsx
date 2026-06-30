'use client';
import { motion } from 'framer-motion';

const certificates = [
  {
    title: 'I2SPO 2025 — Gold Medal',
    issuer: 'International Science Project Olympiad',
    type: 'International',
  },
  {
    title: 'MTE 2025 — Silver Medal',
    issuer: 'Malaysia Technology Expo',
    type: 'International',
  },
  {
    title: 'IPITEX 2024 — Silver Medal',
    issuer: 'Thailand Inventors\' Day / International',
    type: 'International',
  },
  {
    title: 'Olimpiade Siswa Jenius — Gold Medal',
    issuer: 'National Science Olympiad',
    type: 'National',
  },
  {
    title: 'Olimpiade Prestasi Gemilang — Gold Medal',
    issuer: 'National Achievement Olympiad',
    type: 'National',
  },
  {
    title: 'Kompetisi Pelajar Berprestasi Indonesia — Gold Medal',
    issuer: 'Indonesian Outstanding Student Competition',
    type: 'National',
  },
  {
    title: 'Olimpiade Siswa Pintar — Gold Medal',
    issuer: 'Smart Student Olympiad',
    type: 'National',
  },
  {
    title: 'Best National Student Olympiad — Gold Medal',
    issuer: 'National Level',
    type: 'National',
  },
  {
    title: 'OSN (Olimpiade Sains Nasional) — 10th Place Regional',
    issuer: 'Kemendikdasmen / National Science Olympiad',
    type: 'National',
  },
  {
    title: 'OPSI (Olimpiade Penelitian Siswa Indonesia)',
    issuer: 'Student Research Olympiad by Kemendikdasmen',
    type: 'National',
  },
];

export default function CertificateSection() {
  return (
    <section id="certificates" className="bg-black py-40 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.5em] font-mono text-white/30 block mb-3">/ CERTIFICATES</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">
              VERIFIED<br />CERTIFICATES.
            </h2>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-white/40 max-w-xs md:text-right">
            ALL CERTIFICATES ARE OFFICIALLY REGISTERED AND CAN BE VERIFIED
          </div>
        </div>

        {/* Verification CTA */}
        <motion.a
          href="https://simt.kemendikdasmen.go.id/resume?id=yTxuz0hc"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between border border-white/20 p-6 md:p-8 mb-16 hover:border-white hover:bg-white/[0.02] transition-all group"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Official Verification</span>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform duration-500">
              Verify My Certificates on SIMT Kemendikdasmen →
            </span>
            <span className="text-xs text-white/40 font-mono">simt.kemendikdasmen.go.id</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase group-hover:text-white transition-colors duration-500">
              Open Portal
            </span>
            <svg className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </motion.a>

        {/* Certificates Table */}
        <div className="border border-white/10 bg-neutral-950/20">
          {/* Table Header */}
          <div className="grid grid-cols-12 p-4 border-b border-white/15 text-[9px] font-mono tracking-widest text-white/30 uppercase">
            <div className="col-span-6 md:col-span-5">Certificate / Award</div>
            <div className="col-span-4 md:col-span-5 hidden md:block">Issued By</div>
            <div className="col-span-6 md:col-span-2 text-right">Level</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5">
            {certificates.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="grid grid-cols-12 p-5 items-center hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-6 md:col-span-5">
                  <span className="text-sm font-semibold tracking-wide text-white">{cert.title}</span>
                </div>
                <div className="col-span-4 md:col-span-5 hidden md:block">
                  <span className="text-xs text-white/40">{cert.issuer}</span>
                </div>
                <div className="col-span-6 md:col-span-2 text-right">
                  <span className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 border ${
                    cert.type === 'International' 
                      ? 'border-white/25 text-white font-bold bg-white/5' 
                      : 'border-white/10 text-white/50'
                  }`}>
                    {cert.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
