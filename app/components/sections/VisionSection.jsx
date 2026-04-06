'use client';
import { motion } from 'framer-motion';
import { useRef, useMemo } from 'react';

const visionLines = [
  'I believe in the power of knowledge',
  'to transform lives and shape the future.',
  '',
  'Through science, engineering, and innovation,',
  'I aim to create solutions that matter.',
  '',
  'From Medan to the world stage —',
  'the journey has only just begun.',
];

const leadershipQuotes = [
  { text: "Price is what you pay. Value is what you get.", author: "Warren Buffett" },
  { text: "Success is a lousy teacher. It seduces smart people into thinking they can't lose.", author: "Bill Gates" },
  { text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk" },
  { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" }
];

function Quoteshifter() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % leadershipQuotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[120px] flex flex-col items-center justify-center text-center mt-12 px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -10 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="font-display text-lg md:text-xl italic text-white/90 mb-4 leading-relaxed">
            "{leadershipQuotes[index].text}"
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-neon/30" />
            <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">
              {leadershipQuotes[index].author}
            </span>
            <div className="h-px w-8 bg-neon/30" />
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Indicator dots */}
      <div className="flex gap-2 mt-8">
        {leadershipQuotes.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-4 bg-neon' : 'w-1 bg-white/10'}`} 
          />
        ))}
      </div>
    </div>
  );
}

export default function VisionSection() {
  const containerRef = useRef(null);

  // Pre-compute particle positions to avoid hydration mismatch from Math.random() in render
  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: `${(i * 8.33 + 4.17) % 100}%`,
      top: `${((i * 17 + 11) * 7.3) % 100}%`,
      delay: `${i * 0.4}s`,
      duration: `${3 + (i % 3) * 0.8}s`,
    })), []
  );

  return (
    <section ref={containerRef} className="relative py-16 md:py-48 px-4 overflow-hidden">
      {/* Light rays background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '2px',
              height: '200%',
              background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? 'rgba(0,240,255,0.06)' : 'rgba(139,92,246,0.06)'}, transparent)`,
              transform: `rotate(${i * 36 + 10}deg) translateX(${(i - 2) * 80}px)`,
              transformOrigin: 'center center',
            }}
          />
        ))}
      </div>

      {/* Floating particles - deterministic positions */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-neon/20 animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">My Vision</span>
          </h2>
        </motion.div>

        <div className="space-y-1">
          {visionLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`font-display text-base sm:text-lg md:text-2xl leading-relaxed ${
                line === '' ? 'h-4' : i >= visionLines.length - 2 ? 'text-neon font-semibold' : 'text-white/80'
              }`}
              style={{ textAlign: 'center' }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <Quoteshifter />
      </div>
    </section>
  );
}
