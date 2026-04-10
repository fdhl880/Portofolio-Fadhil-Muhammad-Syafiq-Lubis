'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GIANTS = [
  { 
    name: "Isaac Newton", 
    quote: "If I have seen further, it is by standing on the shoulders of Giants.", 
    role: "Physical Mathematics",
    image: "/images/giants/newton.jpg"
  },
  { 
    name: "Albert Einstein", 
    quote: "Imagination is more important than knowledge.", 
    role: "Theoretical Physics",
    image: "/images/giants/einstein.jpg"
  },
  { 
    name: "Steve Jobs", 
    quote: "Innovation distinguishes between a leader and a follower.", 
    role: "Aesthetic Design",
    image: "/images/giants/jobs.jpg"
  },
  { 
    name: "Elon Musk", 
    quote: "When something is important enough, you do it even if the odds are not in your favor.", 
    role: "Applied Engineering",
    image: "/images/giants/musk.jpg"
  },
  { 
    name: "Bill Gates", 
    quote: "Success is a lousy teacher. It seduces smart people into thinking they can't lose.", 
    role: "Strategic Logic",
    image: "/images/giants/gates.jpg"
  },
  { 
    name: "Warren Buffett", 
    quote: "Price is what you pay. Value is what you get.", 
    role: "Value Architecture",
    image: "/images/giants/buffett.png"
  }
];

export default function GiantsSection() {
  return (
    <section className="relative py-48 bg-black border-t border-white/5 overflow-hidden" id="giants">
      <div className="container mx-auto px-6">
        <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
                <span className="text-[10px] tracking-[1em] text-white/20 uppercase mb-4 block">Influential Logic</span>
                <h2 className="text-4xl md:text-8xl font-light text-white tracking-tighter leading-tight italic">
                   SHOULDERS OF <br />GIANTS<span className="text-white/20">.</span>
                </h2>
            </div>
            <div className="max-w-xs opacity-20 hidden md:block">
                <p className="text-[9px] tracking-[0.4em] uppercase leading-relaxed">
                   Modern civilization is a stacked architecture. We build upon the methodologies of those who redefined the impossible.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-white/5 border border-white/5">
            {GIANTS.map((giant, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="group relative h-[600px] overflow-hidden bg-black"
                >
                    {/* Background Image / Portrait */}
                    <div className="absolute inset-0 grayscale contrast-125 brightness-50 group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-105 transition-all duration-1000 ease-out">
                         <Image 
                            src={giant.image} 
                            alt={giant.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                         />
                    </div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                    {/* Content */}
                    <div className="absolute inset-0 p-12 flex flex-col justify-end">
                        <div className="space-y-6">
                            <div className="space-y-1">
                               <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase group-hover:text-[#D4AF37] transition-colors">
                                  {giant.role}
                               </span>
                               <h3 className="text-4xl text-white font-light tracking-widest uppercase">
                                  {giant.name}
                               </h3>
                            </div>
                            
                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 max-w-xs">
                               <p className="text-sm text-white font-serif italic leading-relaxed opacity-80">
                                  &quot;{giant.quote}&quot;
                               </p>
                            </div>
                        </div>

                        {/* Top ID Number */}
                        <div className="absolute top-12 right-12 text-white/10 text-xs font-mono tracking-widest group-hover:text-white/30 transition-colors">
                           NO. {i + 1} {"//"} ARCHIVE_ENTITY
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Closing Detail */}
        <div className="mt-32 pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30">
            <p className="text-[9px] tracking-[0.4em] uppercase">Medan Origin // Archival Integration // Nexus v2.5</p>
            <div className="flex gap-12 items-center">
                <span className="text-[9px] tracking-[0.4em] uppercase">System Verified</span>
                <div className="w-24 h-[1px] bg-white/40" />
            </div>
        </div>
      </div>
    </section>
  );
}
