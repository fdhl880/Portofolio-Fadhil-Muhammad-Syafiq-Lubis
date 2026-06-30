'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const TrophyScene = dynamic(() => import('../three/TrophyScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] flex items-center justify-center bg-neutral-950">
      <div className="w-8 h-8 border border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  ),
});

export default function TrophySection() {
  return (
    <section id="trophies" className="bg-black py-40 px-6 md:px-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.5em] font-mono text-white/30 block mb-3">/ GALLERY</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">
              ON THE<br />WORLD STAGE.
            </h2>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-white/40 max-w-xs md:text-right">
            REPRESENTING INDONESIA AT INTERNATIONAL COMPETITIONS
          </div>
        </div>

        {/* 3D Scene */}
        <div className="mb-24 border border-white/10 p-2 bg-neutral-950/20">
          <div className="relative h-[450px] bg-black overflow-hidden">
            <TrophyScene />
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="text-[8px] font-mono text-white/40 tracking-widest block uppercase">Interactive 3D Model: Scientific Core</span>
              <span className="text-[8px] font-mono text-white/20 tracking-widest block uppercase mt-1">Drag to rotate • Scroll to zoom</span>
            </div>
          </div>
        </div>

        {/* Info & Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
              I&apos;ve had the privilege of representing Indonesia on the global stage — from presenting research to international panels in Bangkok, Thailand (IPITEx) to showcasing innovations in Kuala Lumpur, Malaysia (MTE). Each experience has sharpened my presentation skills and deepened my passion for impactful research.
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-10">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-white/30 block mb-2">International</span>
                <span className="text-3xl font-extrabold tracking-tight text-white uppercase">3 Medals</span>
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-widest text-white/30 block mb-2">National</span>
                <span className="text-3xl font-extrabold tracking-tight text-white uppercase">6 Medals</span>
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-widest text-white/30 block mb-2">Regional</span>
                <span className="text-3xl font-extrabold tracking-tight text-white uppercase">Top 10</span>
              </div>
            </div>
          </div>

          {/* Right Column: Photo */}
          <div className="lg:col-span-5">
            <div className="relative group border border-white/10 p-2 bg-neutral-950/45">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                <Image
                  src="/images/photo3.jpg"
                  alt="Fadhil representing Indonesia at IPITEx Thailand"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out scale-105 group-hover:scale-100"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[10px] font-mono tracking-widest text-white/80 uppercase">IPITEX // Bangkok, Thailand</p>
                  <p className="text-[8px] font-mono tracking-widest text-white/40 uppercase">Representing Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
