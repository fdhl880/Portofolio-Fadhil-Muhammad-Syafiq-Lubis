'use client';
import { motion } from 'framer-motion';

const GIANTS = [
  { name: "Isaac Newton", quote: "If I have seen further, it is by standing on the shoulders of Giants.", role: "Physical Mathematics" },
  { name: "Albert Einstein", quote: "Imagination is more important than knowledge.", role: "Theoretical Physics" },
  { name: "Steve Jobs", quote: "Innovation distinguishes between a leader and a follower.", role: "Aesthetic Design" },
  { name: "Elon Musk", quote: "When something is important enough, you do it even if the odds are not in your favor.", role: "Applied Engineering" },
  { name: "Bill Gates", quote: "Success is a lousy teacher. It seduces smart people into thinking they can't lose.", role: "Strategic Logic" },
  { name: "Warren Buffett", quote: "Price is what you pay. Value is what you get.", role: "Value Architecture" }
];

export default function GiantsSection() {
  return (
    <section className="relative py-48 bg-black border-t border-white/5" id="giants">
      <div className="container mx-auto px-6">
        <div className="mb-32">
            <span className="text-[10px] tracking-[1em] text-white/20 uppercase mb-4 block">Influential Logic</span>
            <h2 className="text-4xl md:text-8xl font-light text-white tracking-tighter leading-tight italic">
               SHOULDERS OF <br />GIANTS<span className="text-white/20">.</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {GIANTS.map((giant, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative border-l border-white/10 p-12 hover:bg-white/[0.02] transition-colors"
                >
                    <div className="space-y-8">
                        <div className="space-y-2">
                           <span className="text-[9px] tracking-widest text-white/20 uppercase">{giant.role}</span>
                           <h3 className="text-3xl text-white font-light tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                              {giant.name}
                           </h3>
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                           <p className="text-xl text-white font-serif italic leading-relaxed">
                              "{giant.quote}"
                           </p>
                        </div>

                        {/* Hover Decoration */}
                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-20 transition-opacity">
                           <span className="text-4xl font-display italic">G{i+1}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Closing Detail */}
        <div className="mt-32 pt-24 border-t border-white/5 flex justify-between items-center opacity-30">
            <p className="text-[9px] tracking-[0.4em] uppercase">These minds forged the path of modern civilization.</p>
            <div className="w-24 h-[1px] bg-white/40" />
        </div>
      </div>
    </section>
  );
}
