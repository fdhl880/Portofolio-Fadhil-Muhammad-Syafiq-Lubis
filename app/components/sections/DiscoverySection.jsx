import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

// Terminal Decoding Component
function DecodingEvent({ text, trigger }) {
  const characters = 'ABCDEFGHIKLMNOPQRSTVXYZ0123456789@#%&*';
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(text.split('').map((char, i) => {
        if (i < iteration) return text[i];
        return characters[Math.floor(Math.random() * characters.length)];
      }).join(''));
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1/2;
    }, 30);
    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span>{display}</span>;
}

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
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const filtered = achievements.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const effectiveIndex = filtered.length > 0 ? (index % filtered.length) : 0;
  const current = filtered[effectiveIndex] || achievements[0];

  const next = () => {
    setIsScanning(true);
    setIndex((prev) => (prev + 1) % (filtered.length || 1));
    setTimeout(() => setIsScanning(false), 800);
  };
  
  const prev = () => {
    setIsScanning(true);
    setIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    setTimeout(() => setIsScanning(false), 800);
  };

  // 3D Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-300, 300], [15, -15]);
  const rotateY = useTransform(springX, [-300, 300], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative h-screen bg-dark overflow-hidden flex items-center justify-center py-20">
      {/* Background Parallax Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <motion.h2 
          animate={{ x: index * -50 }}
          className="text-[20vw] font-black tracking-tighter uppercase whitespace-nowrap"
        >
          {current.title}
        </motion.h2>
      </div>

      {/* Background Glow */}
      <motion.div 
        animate={{ backgroundColor: current.color }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] mx-auto rounded-full blur-[180px] opacity-[0.08]" 
      />

      <div className="container max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: Info */}
        <div className="order-2 lg:order-1 space-y-8">
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group max-w-sm"
          >
            <div className="absolute inset-0 bg-white/5 rounded-xl blur-lg group-focus-within:bg-cyan-500/10 transition-colors" />
            <input 
              type="text"
              placeholder="SYSTEM_SEARCH_FILES..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIndex(0);
              }}
              className="relative w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm font-mono tracking-wider focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/20"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/30 pointer-events-none">
              [ ACCESS_CORE ]
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.title + searchTerm}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px]" style={{ backgroundColor: current.color, opacity: 0.3 }} />
                <span 
                  className="text-xs font-bold uppercase tracking-[0.4em] inline-block"
                  style={{ color: current.color }}
                >
                  <DecodingEvent text={current.category} trigger={current.title} />
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display leading-tight text-white">
                <DecodingEvent text={current.title} trigger={current.title} />
              </h2>
              
              <p className="text-muted text-lg max-w-md leading-relaxed border-l-2 border-white/10 pl-6">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-6 pt-4 text-white">
            <div className="flex gap-3">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all group cursor-pointer hover:border-cyan-500/30"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all group cursor-pointer hover:border-cyan-500/30"
              >
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
            
            <div className="h-px w-24 bg-white/10" />
            
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
              Entry_{effectiveIndex + 1}_of_{filtered.length || achievements.length}
            </div>
          </div>
        </div>

        {/* Right: 3D Card Image */}
        <div 
          className="relative order-1 lg:order-2 h-[400px] md:h-[500px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '2000px' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title + searchTerm}
              initial={{ rotateY: 45, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: -45, opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-full h-full"
            >
              {/* Main Card */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden glass border-2 shadow-2xl transition-colors duration-500"
                style={{ borderColor: `${current.color}40`, boxShadow: `0 20px 50px -10px ${current.color}20` }}
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
                
                {/* Scanning Beam */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 z-20 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                />

                {/* Status Overlay */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                   <div className="space-y-1">
                      <div className="text-[10px] font-mono text-white/40 uppercase">Metadata_Status</div>
                      <div className="text-sm font-bold text-white uppercase tracking-widest">LIVE_CORE_ACTIVE</div>
                   </div>
                   <div className="text-[10px] font-mono text-white/40 text-right">
                      SCAN_RES: 100%<br/>
                      BUFF_SIZE: 1.2MB
                   </div>
                </div>
              </div>

              {/* Floating Initial Logo */}
              <motion.div 
                animate={{ 
                  y: [0, -15, 0],
                  rotateZ: [0, 5, 0]
                }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 w-24 h-24 glass rounded-3xl flex items-center justify-center border border-white/20 z-30 shadow-2xl overflow-hidden"
              >
                <Image 
                  src="/logo-initials.png"
                  alt="FMS Logo"
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
              </motion.div>

              {/* HUD Elements */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border-l-2 border-b-2 border-white/20 rounded-bl-3xl pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-20 h-20 border-r-2 border-t-2 border-white/20 rounded-tr-3xl pointer-events-none opacity-50" />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
