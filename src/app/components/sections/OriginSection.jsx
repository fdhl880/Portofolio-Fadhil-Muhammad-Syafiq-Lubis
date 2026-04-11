'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OriginSection() {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-32 transform-gpu" id="origin">
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/medan_origin.png" 
          alt="Medan, Indonesia" 
          fill
          className="object-cover opacity-40 grayscale"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto border border-white/10 bg-black/60 backdrop-blur-2xl p-12 md:p-24 relative">
          
          {/* Technical Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/40" />

          <div className="space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
               <div className="space-y-4">
                  <span className="text-[10px] tracking-[1em] text-white/50 uppercase font-bold">Foundation Baseline</span>
                  <h2 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none italic">
                     THE <br />ORIGIN<span className="text-white/20">.</span>
                  </h2>
               </div>
               <div className="text-right">
                  <p className="text-[12px] tracking-[0.6em] text-white/40 uppercase">Subject ID_09072011</p>
               </div>
            </div>

            {/* Technical Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                <div className="space-y-1">
                    <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase">Geographic Origin</span>
                    <p className="text-2xl text-white font-light tracking-tight italic">Medan, North Sumatra</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.3em]">3.5952° N, 98.6722° E</p>
                </div>
                
                <div className="space-y-1">
                    <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase">Temporal Epoch</span>
                    <p className="text-2xl text-white font-light tracking-tight italic">09 July 2011</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.3em]">Calculated Arrival Baseline</p>
                </div>

                <div className="md:col-span-2 mt-8">
                    <p className="text-sm text-white/50 font-light leading-relaxed max-w-2xl">
                       Built in the cultural foundation of North Sumatra, Fadhil Muhammad Syafiq Lubis represents a convergence 
                       of historical heritage and futuristic engineering potential. The year 2011 marked the initialization 
                       of a trajectory defined by obsessive precision and a relentless pursuit of technical excellence.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Side Decorative Metadata */}
      <div className="absolute right-12 bottom-12 hidden xl:block pointer-events-none opacity-20">
          <div className="flex items-center gap-12 text-[10px] tracking-[1em] text-white uppercase vertical-text">
             <span>ARCHIVAL RECORD</span>
             <div className="w-[1px] h-12 bg-white" />
             <span>01-FOUNDATION</span>
          </div>
      </div>
    </section>
  );
}
