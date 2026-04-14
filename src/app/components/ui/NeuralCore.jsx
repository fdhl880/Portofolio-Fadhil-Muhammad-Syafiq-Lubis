'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import { usePerformance } from '../../context/PerformanceContext';

// Typing effect for system responses
function TypingEffect({ text, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let index = 0;
    const speed = 15;
    const interval = setInterval(() => {
      index += text.length > 500 ? 5 : 1; 
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        setDisplayed(text);
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span>{displayed}</span>;
}

function CoreModel() {
  const meshRef = useRef();
  const wireRef = useRef();
  const ringRef = useRef();
  const { isCinematic } = usePerformance();

  useFrame((state) => {
    if (isCinematic) {
      const time = state.clock.getElapsedTime();
      if (meshRef.current) {
        meshRef.current.rotation.y = time * 0.4;
        meshRef.current.rotation.z = time * 0.2;
      }
      if (wireRef.current) {
        wireRef.current.rotation.y = -time * 0.2;
        wireRef.current.rotation.x = time * 0.3;
      }
      if (ringRef.current) {
        ringRef.current.rotation.z = time * 0.5;
        ringRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group>
        <Sphere ref={meshRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#ffffff"
            speed={isCinematic ? 1 : 0}
            distort={0.2}
            radius={1}
            metalness={1}
            roughness={0.05}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </Sphere>
        <Sphere ref={wireRef} args={[1.2, 32, 32]}>
          <meshPhongMaterial color="#ffffff" wireframe transparent opacity={0.1} emissive="#ffffff" emissiveIntensity={0.1} />
        </Sphere>
        <mesh ref={ringRef} rotation-x={Math.PI / 2}>
          <torusGeometry args={[1.5, 0.01, 16, 100]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export default function NeuralCore({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { role: 'sys', text: 'NEURAL_CORE_v4.5_ACTIVE' },
    { role: 'sys', text: 'SYNC_STABLE: MONITORING_SECTIONS...' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoMessage, setAutoMessage] = useState(null);
  const scrollRef = useRef(null);
  const { performanceTier } = usePerformance();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  useEffect(() => {
    if (activeSection) {
      const msg = `CORE_INTEL: SCANNING ${activeSection.toUpperCase()}... OPTIMAL_RETRIEVAL_COMPLETE.`;
      setAutoMessage(msg);
      
      // Auto-log to history as well
      setHistory(prev => [...prev, { 
        role: 'sys', 
        text: `SCAN_IDENTIFIED: [${activeSection.toUpperCase()}]`, 
        isNew: true 
      }]);

      // Hide pop-up message after 6 seconds
      const timeout = setTimeout(() => setAutoMessage(null), 6000);
      return () => clearTimeout(timeout);
    }
  }, [activeSection]);

  const toggleCore = () => setIsOpen(!isOpen);

  const executeCommand = async (e) => {
    if (e.key === 'Enter' && input.trim() && !isTyping) {
      const userText = input.trim();
      const cmd = userText.toLowerCase();
      setHistory(prev => [...prev, { role: 'user', text: userText }]);
      setInput('');

      if (cmd === '/clear') {
        setHistory([{ role: 'sys', text: 'TERMINAL_RESET' }]);
        return;
      }

      setIsTyping(true);
      setTimeout(async () => {
        let res = 'ERROR: CMD_MISSING';
        if (cmd === '/help') res = 'CMDS: /bio, /achievements, /projects, /clear. Passive scan active.';
        else if (cmd === '/bio') res = 'SUBJECT: FADHIL LUBIS. INNOVATOR. RESEARCHER. MEDALIST.';
        else {
           // Normal AI Chat logic remains...
           res = "FL_CORE: Protocol in standby. Scroll to scan more sections.";
        }
        setHistory(prev => [...prev, { role: 'sys', text: res, isNew: true }]);
      }, 400);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-4 pointer-events-none">
      
      {/* PASSIVE LOG POPUP (AUTO-ASSISTANT) */}
      <AnimatePresence>
        {autoMessage && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="mb-4 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 pointer-events-auto"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">Neural_Analyzer</span>
              <span className="text-[11px] font-mono text-white/90 italic line-clamp-1">{autoMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[calc(100vw-4rem)] sm:w-80 h-[450px] bg-black border border-white/10 overflow-hidden flex flex-col shadow-2xl pointer-events-auto relative"
          >
            <div className="bg-black border-b border-white/10 px-4 py-3 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-sans text-white/40 uppercase tracking-[0.4em] font-bold">FL_Core_Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors p-1">
                <div className="w-4 h-4 flex items-center justify-center border border-white/20 text-[8px]">×</div>
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-4 custom-scrollbar scroll-smooth relative z-10">
              {history.map((msg, i) => (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} key={i} className={msg.role === 'sys' ? 'text-white/40 italic' : 'text-white font-medium'}>
                  <div className="flex gap-2">
                    <span className="shrink-0 opacity-40">[{msg.role === 'sys' ? 'CORE' : 'USER'}]</span>
                    <div className="break-words leading-relaxed">
                      {msg.isNew ? <TypingEffect text={msg.text} onComplete={() => { setIsTyping(false); msg.isNew = false; }} /> : msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="text-white/20 animate-pulse flex gap-2">
                   <span className="opacity-40">[CORE]</span>
                   <span>...</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-black border-t border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-white/60 font-bold ml-1">→</span>
                <input 
                  autoFocus type="text" placeholder="CMD..." disabled={isTyping} value={input}
                  onChange={e => setInput(e.target.value)} onKeyDown={executeCommand}
                  className="w-full bg-transparent border-none text-[11px] font-mono text-white focus:ring-0 p-0"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE ORB TRIGGER */}
      <button 
        onClick={toggleCore}
        className="relative w-24 h-24 group cursor-pointer focus:outline-none pointer-events-auto"
      >
        <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-1000" />
        <div className="relative w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000 flex items-center justify-center">
          {performanceTier === 'low' ? (
            <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center animate-pulse">
              <div className="w-10 h-10 rounded-full bg-white/10 blur-xl" />
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          ) : (
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
              <CoreModel />
              <Environment preset="studio" />
            </Canvas>
          )}
        </div>
        
        <div className="absolute top-0 right-0 flex items-center gap-2 glass px-2 py-0.5 border border-white/10">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="text-white/40 text-[8px] font-sans uppercase tracking-[0.2em]">Intel_Core</span>
        </div>
      </button>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}

