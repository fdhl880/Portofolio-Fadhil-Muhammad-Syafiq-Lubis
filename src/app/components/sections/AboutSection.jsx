'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { label: 'MEDALS', value: '3 International • 6 National' },
  { label: 'FOCUS', value: 'Research & Engineering' },
  { label: 'LOCATION', value: 'Medan, Indonesia' },
  { label: 'STATUS', value: 'Active Student Researcher' },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-black py-40 px-6 md:px-10 border-t border-white/5 relative overflow-hidden">
      {/* Background line */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Heading and Profile */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <span className="text-[10px] tracking-[0.5em] font-mono text-white/30 block mb-3">/ ABOUT ME</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">
                WHO<br />AM I.
              </h2>
            </div>

            {/* Profile Photo */}
            <div className="relative group border border-white/10 p-2 bg-neutral-950/45">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                <Image
                  src="/images/photo1.jpg"
                  alt="Fadhil Muhammad Syafiq Lubis"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out scale-105 group-hover:scale-100"
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="text-[8px] font-mono tracking-widest text-white/40">MEDAN / IDN</span>
                  <span className="text-[8px] font-mono tracking-widest text-white/40">3.5952° N, 98.6722° E</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="lg:col-span-7 flex flex-col gap-12 lg:pt-16">
            <div className="flex flex-col gap-6">
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light tracking-wide">
                Hi, I&apos;m Fadhil Muhammad Syafiq Lubis  a student researcher, innovator, and developer from Medan, Indonesia.
              </p>
              <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
                I love solving real-world problems through science, technology, and creative thinking. I&apos;ve represented Indonesia at international innovation competitions in Thailand and Malaysia, winning gold and silver medals for projects focused on sustainability and social impact.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="border border-white/15">
              <div className="bg-neutral-950 p-4 border-b border-white/15 flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-widest text-white/40">QUICK FACTS</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
              </div>
              <div className="divide-y divide-white/10">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.02] transition-colors">
                    <span className="text-[10px] font-mono tracking-widest text-white/30">{stat.label}</span>
                    <span className="text-sm font-semibold tracking-wider text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission */}
            <div className="border-l border-white/20 pl-6 py-2">
              <p className="text-xs font-mono tracking-widest text-white/40 uppercase mb-2">WHAT DRIVES ME</p>
              <p className="text-sm font-semibold text-white/80 leading-relaxed">
                I believe that the best solutions come from combining scientific research with real hands-on engineering. My goal is to create projects that have a genuine positive impact on people and the environment.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
