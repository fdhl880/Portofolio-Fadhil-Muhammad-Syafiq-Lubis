'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const photos = [
  { id: 1, src: '/images/photo1.jpg', title: 'The Visionary', subtitle: 'Atelier Portrait' },
  { id: 3, src: '/images/photo3.jpg', title: 'Presence', subtitle: 'Regional Stage' },
  { id: 4, src: '/images/photo4.jpg', title: 'Achievement', subtitle: 'Global Merit' },
  { id: 2, src: '/images/photo2.jpg', title: 'Future', subtitle: 'Atelier Research' },
];

function ParallaxImage({ photo, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -100 : 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <div ref={ref} className={`relative flex flex-col gap-6 w-full ${index % 2 !== 0 ? 'md:mt-32' : ''}`}>
      <motion.div 
        style={{ y, scale }}
        className="relative aspect-[4/5] bg-[#050505] overflow-hidden group border border-white/10"
      >
        <Image 
          src={photo.src} 
          alt={photo.title} 
          fill 
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-1000" />
        
        {/* Frame Highlight */}
        <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-1000" />
      </motion.div>
      
      <div className={`flex flex-col gap-2 ${index % 2 !== 0 ? 'md:items-end md:text-right' : ''}`}>
        <span className="text-white/20 text-[10px] tracking-[0.5em] uppercase font-sans">/{photo.subtitle}</span>
        <h3 className="font-display text-2xl uppercase tracking-widest">{photo.title}</h3>
      </div>
    </div>
  );
}

export default function StudioGallery() {
  return (
    <section id="gallery" className="py-32 px-6 md:px-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-32 gap-6">
          <span className="text-white/20 text-[10px] tracking-[0.8em] uppercase font-sans">Atelier</span>
          <h2 className="font-display text-5xl md:text-7xl">The Personal <span className="italic opacity-40">Journey.</span></h2>
          <div className="h-px w-24 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {photos.map((photo, i) => (
            <ParallaxImage key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        {/* Closing Note */}
        <div className="mt-48 text-center border-t border-white/5 pt-24">
          <p className="font-display text-2xl italic text-white/20 max-w-2xl mx-auto leading-relaxed">
            &quot;True luxury is not about being seen, but about being remembered for the precision of your vision.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
