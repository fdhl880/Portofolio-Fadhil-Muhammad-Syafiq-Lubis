'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    year: '2024',
    title: 'THE_GOLD_STANDARD',
    subtitle: 'IPITEx Thailand Excellence',
    description: 'A study in precision and architectural engineering. The project that redefined international standards for student innovators.',
    image: '/images/photo1.jpg',
    layout: 'left'
  },
  {
    year: '2025',
    title: 'PRECISION_LOGIC',
    subtitle: 'Robotics Engineering',
    description: 'Integrating algorithmic complexity with physical form. The evolution of autonomous systems designed for the next era.',
    image: '/images/photo2.jpg',
    layout: 'right'
  },
  {
    year: '2023',
    title: 'THE_MANIFESTO',
    subtitle: 'Scientific Research',
    description: 'Archiving years of intensive research into a single, cohesive narrative of discovery and impact.',
    image: '/images/photo3.jpg',
    layout: 'left'
  }
];

export default function LuxuryEditorial() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.editorial-panel');
    
    // Horizontal Scroll / Pinning Logic
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + sectionRef.current.offsetWidth * panels.length,
        onUpdate: (self) => {
          // Play subtle sound on segment transition
          if (Math.abs(self.velocity) > 100 && audioRef.current) {
            audioRef.current.volume = 0.1;
            audioRef.current.play().catch(() => {});
          }
        }
      }
    });

    // Parallax & Reveal for internal elements
    panels.forEach((panel, i) => {
      const img = panel.querySelector('.parallax-img');
      const text = panel.querySelector('.reveal-text');
      const heading = panel.querySelector('.variable-heading');

      gsap.fromTo(img, 
        { scale: 1.2, x: 50 },
        { 
          scale: 1, 
          x: -50,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.getById('main-scroll'), // if used, otherwise implicit
            start: "left right",
            end: "right left",
            scrub: true
          }
        }
      );

      // Variable Font Stretch Effect
      gsap.fromTo(heading,
        { fontVariationSettings: "'wdth' 50, 'wght' 300" },
        {
          fontVariationSettings: "'wdth' 100, 'wght' 700",
          scrollTrigger: {
            trigger: panel,
            start: "left center",
            end: "center left",
            scrub: true
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      
      {/* Subtle Audio for Page Flip */}
      <audio ref={audioRef} src="https://www.soundjay.com/misc/sounds/page-flip-02.mp3" />

      {/* Aesthetic Background Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      </div>

      <div ref={containerRef} className="flex h-full w-[300%]">
        {PROJECTS.map((project, i) => (
          <div 
            key={i} 
            className="editorial-panel relative w-full h-full flex items-center justify-center p-8 md:p-24"
          >
            {/* Background Archival Number */}
            <div className="absolute top-12 left-12 md:top-24 md:left-24 text-[12vw] font-display text-white/[0.03] pointer-events-none select-none italic">
               00{i + 1}
            </div>

            <div className={`container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 ${project.layout === 'right' ? 'md:direction-rtl' : ''}`}>
               
               {/* Image Column */}
               <div className={`col-span-1 md:col-span-7 overflow-hidden border border-white/5 p-4 bg-white/[0.02] backdrop-blur-sm ${project.layout === 'right' ? 'md:order-2' : ''}`}>
                  <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 group">
                    <div className="parallax-img absolute inset-[-10%] w-[120%] h-[120%]">
                       <Image 
                          src={project.image} 
                          alt={project.title}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
                       />
                    </div>
                  </div>
               </div>

               {/* Text Column */}
               <div className={`col-span-1 md:col-span-5 flex flex-col gap-8 ${project.layout === 'right' ? 'md:order-1 text-right items-end' : 'items-start text-left'}`}>
                  <div className="flex flex-col gap-2">
                     <span className="text-[10px] tracking-[1.2rem] text-[#D4AF37] uppercase font-sans">{project.year} // ARCHIVE</span>
                     <h2 className="variable-heading text-4xl md:text-7xl font-playfair uppercase text-white leading-[0.9] tracking-tighter">
                        {project.title.split('_').join(' ')}
                     </h2>
                  </div>

                  <div className="space-y-6 max-w-sm">
                     <p className="reveal-text text-sm md:text-base font-playfair italic text-white/50 tracking-wide">
                        {project.subtitle}
                     </p>
                     <p className="text-[10px] md:text-xs text-white/30 leading-relaxed uppercase tracking-widest font-sans">
                        {project.description}
                     </p>
                  </div>

                  <div className="flex items-center gap-6 group cursor-pointer pt-4">
                     <div className="h-[1px] w-12 bg-[#D4AF37] group-hover:w-24 transition-all duration-500" />
                     <span className="text-[9px] text-[#D4AF37] uppercase tracking-[0.5em] font-sans">View Full Case Study</span>
                  </div>
               </div>

            </div>
          </div>
        ))}
      </div>

      {/* Editorial Navigation Progress */}
      <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 z-20 flex flex-col items-end gap-4">
         <div className="h-24 w-[1px] bg-white/10 relative">
            <motion.div 
               style={{ scaleY: ScrollTrigger.getById('main-scroll')?.progress || 0 }}
               className="absolute top-0 w-full bg-[#D4AF37] origin-top" 
            />
         </div>
         <span className="text-[10px] font-mono text-white/20 vertical-writing tracking-widest">EXHIBITION_MODE</span>
      </div>

    </section>
  );
}

// Adding local styles for custom components if needed
