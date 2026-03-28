'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import { useSound } from '../../context/SoundContext';
import { usePerformance } from '../../context/PerformanceContext';

// Typing effect for system responses
function TypingEffect({ text, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 20);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span>{displayed}</span>;
}

function CoreModel({ isFast }) {
  const meshRef = useRef();
  const { isCinematic } = usePerformance();

  useFrame((state) => {
    if (isCinematic && meshRef.current) {
      const speed = isFast ? 1.2 : 0.4;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * (speed / 2);
    }
  });

  return (
    <Float speed={isFast ? 4 : 2} rotationIntensity={isFast ? 2 : 1} floatIntensity={isFast ? 2 : 1}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00f0ff"
          speed={isCinematic ? (isFast ? 6 : 3) : 0}
          distort={isFast ? 0.6 : 0.4}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          emissive="#00f0ff"
          emissiveIntensity={isFast ? 1 : 0.5}
        />
      </Sphere>
    </Float>
  );
}

export default function NeuralCore() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { role: 'sys', text: 'NEXUS_CORE_v3.0.4_ENCRYPTED' },
    { role: 'sys', text: 'USER_IDENTIFIED: VISITOR_1' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const { playPip, playSweep } = useSound();

  // Auto-greeting logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
        setTimeout(() => {
          setHistory(prev => [...prev, { role: 'sys', text: 'WELCOME_USER. SYSTEM_READY_FOR_INPUT. TYPE /HELP.' }]);
          playPip(880, 0.1);
        }, 1000);
      }
    }, 8000); // 8 seconds post-load (to account for intro)
    return () => clearTimeout(timer);
  }, [isOpen, playPip]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const toggleCore = () => {
    setIsOpen(!isOpen);
    playSweep(isOpen ? 800 : 200, isOpen ? 200 : 800, 0.3);
  };

  const executeCommand = (e) => {
    if (e.key === 'Enter' && input.trim() && !isTyping) {
      const cmd = input.toLowerCase().trim();
      setHistory(prev => [...prev, { role: 'user', text: input }]);
      setInput('');
      playPip(880, 0.05);

      setTimeout(() => {
        setIsTyping(true);
        let res = 'ERROR: CMD_NOT_FOUND. ATTEMPT_LOGGED.';
        
        if (cmd === '/help') res = 'AVAILABLE_CMDS: /bio, /achievements, /projects, /contact, /status, /clear';
        else if (cmd === '/bio') res = 'SUBJECT: FADHIL MUHAMMAD SYAFIQ LUBIS. PROFESSION: INNOVATOR / RESEARCHER. LOCATION: MEDAN, INDONESIA. CORE: APPLIED SCIENCE & ENGINEERING.';
        else if (cmd === '/achievements') res = 'DATA: 12 TOTAL MEDALS. HIGHLIGHTS: I2ASPO GOLD (2025), IPITEx SILVER (2024), MTE SILVER (2025).';
        else if (cmd === '/projects') res = 'SCANNING_PORTFOLIO... Found multiple high-impact projects in sustainable tech and scientific research. Scroll to PROJECT_LOG to inspect.';
        else if (cmd === '/contact') res = 'LINKING_COMMS... Email: syfqlubis@gmail.com | LinkedIn: /in/fadhilmslubis. Console awaits further commands.';
        else if (cmd === '/status') res = 'NEXUS_STATUS: OPTIMAL. UPTIME: 100%. PERFORMANCE_MODE: ACTIVE. ALL_SYSTEMS_NOMINAL.';
        else if (cmd === '/clear') {
          setHistory([{ role: 'sys', text: 'TERMINAL_RESET_COMPLETE' }]);
          setIsTyping(false);
          return;
        }

        setHistory(prev => [...prev, { role: 'sys', text: res, isNew: true }]);
        playPip(1200, 0.08);
      }, 400);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-4 pointer-events-none">
      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 h-[450px] glass rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl pointer-events-auto relative"
          >
            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-20 z-50" />
            
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Nexus_Console_v3_STABLE</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/20 hover:text-white transition-colors"
              >
                [X]
              </button>
            </div>
            
            <div 
              ref={scrollRef}
              className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-3 custom-scrollbar scroll-smooth relative z-10"
            >
              {history.map((msg, i) => (
                <div key={i} className={msg.role === 'sys' ? 'text-cyan-400/90' : 'text-white/90 font-bold'}>
                  <div className="flex gap-2">
                    <span className="shrink-0 opacity-40">{msg.role === 'sys' ? 'CORE:' : 'USER:'}</span>
                    <div className="break-words">
                      {msg.isNew ? (
                        <TypingEffect text={msg.text} onComplete={() => {
                          setIsTyping(false);
                          msg.isNew = false;
                        }} />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-cyan-400/40 animate-pulse flex gap-2">
                   <span className="opacity-40">CORE:</span>
                   <span>DECIPHERING...</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-black/20 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-cyan-500 font-bold">$</span>
                <input 
                  autoFocus
                  type="text"
                  placeholder={isTyping ? "WAITING..." : "EXECUTE_CMD..."}
                  disabled={isTyping}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={executeCommand}
                  className="w-full bg-transparent border-none text-[11px] font-mono text-white placeholder:text-white/10 focus:ring-0 p-0"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkle Core */}
      <button 
        onClick={toggleCore}
        className="relative w-24 h-24 group cursor-pointer focus:outline-none pointer-events-auto"
      >
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/40 transition-colors" />
        <div className="relative w-full h-full">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
            <CoreModel />
            <Environment preset="city" />
          </Canvas>
        </div>
        
        {/* Pulsing HUD Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 scale-125"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dotted border-cyan-500/20 scale-150"
        />
        
        <div className="absolute top-0 right-0 flex gap-1">
          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
          <div className="bg-cyan-500 text-black text-[7px] font-black px-1.5 py-0.5 rounded-sm uppercase">Nexus</div>
        </div>
      </button>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 240, 255, 0.2);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
