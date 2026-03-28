'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import { useSound } from '../../context/SoundContext';
import { usePerformance } from '../../context/PerformanceContext';

function CoreModel() {
  const meshRef = useRef();
  const { isCinematic } = usePerformance();

  useFrame((state) => {
    if (isCinematic && meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00f0ff"
          speed={isCinematic ? 3 : 0}
          distort={0.4}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          emissive="#00f0ff"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

export default function NeuralCore() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { role: 'sys', text: 'NEXUS_CORE_v2.0_READY' },
    { role: 'sys', text: 'USER_AUTH_SUCCESS' },
    { role: 'sys', text: 'Type /help for system commands' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const { playPip, playSweep } = useSound();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const toggleCore = () => {
    setIsOpen(!isOpen);
    playSweep(isOpen ? 800 : 200, isOpen ? 200 : 800, 0.3);
  };

  const executeCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.toLowerCase().trim();
      setHistory(prev => [...prev, { role: 'user', text: input }]);
      playPip(880, 0.05);

      setTimeout(() => {
        let res = 'ERROR: CMD_NOT_FOUND. Try /help';
        if (cmd === '/help') res = 'CMDS: /achievements, /skills, /status, /clear';
        else if (cmd === '/achievements') res = 'SCAN: 12 Medals detected (8 Gold, 4 Silver). Primary Field: Global Innovation.';
        else if (cmd === '/skills') res = 'CORE_PROFICIENCY: Science, Research, Engineering, Public Speaking.';
        else if (cmd === '/status') res = 'SYSTEM_OPTIMAL. Power: 100%. Innovation_Rate: MAX.';
        else if (cmd === '/clear') {
          setHistory([{ role: 'sys', text: 'TERMINAL_RESET' }]);
          setInput('');
          return;
        }

        setHistory(prev => [...prev, { role: 'sys', text: res }]);
        playPip(1200, 0.08);
      }, 400);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-4">
      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-72 h-96 glass rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex justify-between items-center">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Nexus_Console_v2</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>
            
            <div 
              ref={scrollRef}
              className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-2 custom-scrollbar scroll-smooth"
            >
              {history.map((msg, i) => (
                <div key={i} className={msg.role === 'sys' ? 'text-cyan-400/80' : 'text-white'}>
                  <span className="mr-2 opacity-50">{msg.role === 'sys' ? '>' : '$'}</span>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-3 bg-black/20 border-t border-white/10">
              <input 
                autoFocus
                type="text"
                placeholder="EXECUTE_CMD..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={executeCommand}
                className="w-full bg-transparent border-none text-[11px] font-mono text-white placeholder:text-white/20 focus:ring-0 p-0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkle Core */}
      <button 
        onClick={toggleCore}
        className="relative w-20 h-20 group cursor-pointer focus:outline-none"
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
        
        {/* Pulsing Ring */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute inset-0 rounded-full border border-cyan-500/30 -z-10"
        />
        
        <div className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_#00f0ff]">
          LIVE
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
