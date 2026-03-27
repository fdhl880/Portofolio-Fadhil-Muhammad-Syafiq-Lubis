'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const achievements = [
  {
    image: '/images/photo1.jpg',
    title: 'Global Excellence',
    category: 'Gold Medal',
    description: 'Achieving the highest honor at I2ASPO 2025, representing the vanguard of student innovation.',
    color: '#00f0ff',
  },
  {
    image: '/images/photo3.jpg',
    title: 'International Presence',
    category: 'The World Stage',
    description: 'Representing Indonesia at IPITEx Thailand, bridging the gap between national talent and global impact.',
    color: '#ffd700',
  },
  {
    image: '/images/photo2.jpg',
    title: 'Future Vision',
    category: 'Continuous Innovation',
    description: 'Developing sustainable engineering solutions and exploring the intersections of technology and finance.',
    color: '#8b5cf6',
  },
];

export default function DiscoverySection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % achievements.length);
  const prev = () => setIndex((prev) => (prev - 1 + achievements.length) % achievements.length);

  return (
    <section className="relative h-screen bg-dark overflow-hidden flex items-center justify-center py-20">
      {/* Background Parallax Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <motion.h2 
          animate={{ x: index * -50 }}
          className="text-[20vw] font-black tracking-tighter uppercase whitespace-nowrap"
        >
          {achievements[index].title}
        </motion.h2>
      </div>

      {/* Background Glow */}
      <motion.div 
        animate={{ backgroundColor: achievements[index].color }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] mx-auto rounded-full blur-[180px] opacity-[0.08]" 
      />

      <div className="container max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: Info */}
        <div className="order-2 lg:order-1 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span 
                className="text-xs font-bold uppercase tracking-[0.4em] inline-block mb-3"
                style={{ color: achievements[index].color }}
              >
                {achievements[index].category}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 font-display">
                {achievements[index].title}
              </h2>
              <p className="text-muted text-lg max-w-md leading-relaxed">
                {achievements[index].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex gap-4 pt-4">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Right: 3D Card Image */}
        <div className="relative order-1 lg:order-2 h-[400px] md:h-[500px] perspective-[1500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.4 }
              }}
              className="relative w-full h-full preserve-3d"
            >
              <div 
                className="absolute inset-0 rounded-[2rem] overflow-hidden glass border-2"
                style={{ borderColor: `${achievements[index].color}30` }}
              >
                <Image
                  src={achievements[index].image}
                  alt={achievements[index].title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                
                {/* Holographic Shimmer Effect */}
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[25deg]"
                />
              </div>

              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-4 -right-4 w-24 h-24 glass rounded-2xl flex items-center justify-center border border-white/10 z-20"
              >
                <div className="text-2xl">✨</div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
