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
    const speed = text.length > 200 ? 5 : 15;
    const interval = setInterval(() => {
      index += text.length > 500 ? 3 : 1; 
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        setDisplayed(text); // Ensure full completion
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
        {/* Central Core */}
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
        
        {/* Wireframe Shell */}
        <Sphere ref={wireRef} args={[1.2, 32, 32]}>
          <meshPhongMaterial 
            color="#00f0ff" 
            wireframe 
            transparent 
            opacity={0.2} 
            emissive="#00f0ff"
            emissiveIntensity={0.2}
          />
        </Sphere>

        {/* Energy Ring */}
        <mesh ref={ringRef} rotation-x={Math.PI / 2}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6" 
            emissiveIntensity={2} 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function NeuralCore() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { role: 'sys', text: 'NEXUS_CORE_v4.0.1_ENCRYPTED' },
    { role: 'sys', text: 'USER_IDENTIFIED: VISITOR_SECURED' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const hasGreeted = useRef(false);
  const { playPip, playSweep } = useSound();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const toggleCore = () => {
    setIsOpen(!isOpen);
    playSweep(isOpen ? 800 : 200, isOpen ? 200 : 800, 0.3);
    
    if (!isOpen && !hasGreeted.current) {
      hasGreeted.current = true;
      setTimeout(() => {
        setHistory(prev => [...prev, { 
          role: 'sys', 
          text: 'GREETINGS VISITOR. I AM NEXUS, THE COGNITIVE INTERFACE OF THIS DOMAIN. HOW CAN I ASSIST? TYPE /HELP FOR SUB-ROUTINES.', 
          isNew: true 
        }]);
        playPip(1200, 0.1);
      }, 600);
    }
  };

  const executeCommand = async (e) => {
    if (e.key === 'Enter' && input.trim() && !isTyping) {
      const userText = input.trim();
      const cmd = userText.toLowerCase();
      setHistory(prev => [...prev, { role: 'user', text: userText }]);
      setInput('');
      playPip(880, 0.05);

      if (cmd === '/clear') {
        setHistory([{ role: 'sys', text: 'TERMINAL_RESET_COMPLETE' }]);
        return;
      }

      setIsTyping(true);

      setTimeout(async () => {
        let res = 'ERROR: CMD_NOT_FOUND. ATTEMPT_LOGGED.';
        
        if (cmd === '/help') res = 'AVAILABLE_CMDS: /bio, /achievements, /projects, /contact, /status, /analyze, /override, /clear. OR: Engage in natural linguistic exchange.';
        else if (cmd === '/status') res = 'NEXUS_STATUS: OPTIMAL. UPTIME: 100%. NEURAL_LOAD: 12%. ALL_SYSTEMS_NOMINAL.';
        else if (cmd === '/override') {
          res = 'WARNING: PROTOCOL BREACH INITIATED. OVERRIDING COLOR METRICS. EMERGENCY_MODE_ENABLED.';
          document.documentElement.classList.toggle('nexus-breach');
        }
        else if (cmd === '/bio') res = 'SUBJECT: FADHIL MUHAMMAD SYAFIQ LUBIS. STUDENT INNOVATOR. RESEARCHER. MEDALIST. SPECIALIZING IN SUSTAINABLE ENGINEERING AND FINANCIAL TECHNOLOGY.';
        else {
          try {
            // Map internal history to API format (sys -> model)
            const chatHistory = history
              .filter(h => h.role !== 'sys' || h.text !== 'NEXUS_CORE_v4.0.1_ENCRYPTED')
              .map(h => ({ 
                role: h.role === 'sys' ? 'model' : 'user', 
                text: h.text 
              }));

            const response = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: userText, history: chatHistory }),
            });
            const data = await response.json();
            res = data.text || 'NEXUS_SYSTEM_LINK_FAILURE';
          } catch (error) {
            console.error("Nexus AI Error:", error);
            res = 'NEXUS_CORE_TIMEOUT: RECONNECT_PROTOCOL_REQUIRED.';
          }
        }

        setHistory(prev => [...prev, { role: 'sys', text: res, isNew: true }]);
        playPip(1200, 0.08);
      }, 400);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[calc(100vw-4rem)] sm:w-80 h-[450px] glass rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl pointer-events-auto relative"
          >
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-20 z-50" />
            
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Nexus_Console_v4_CONNECTED</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/20 hover:text-white transition-colors p-1"
              >
                <div className="w-4 h-4 flex items-center justify-center border border-white/20 rounded-sm text-[8px]">X</div>
              </button>
            </div>
            
            <div 
              ref={scrollRef}
              className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-4 custom-scrollbar scroll-smooth relative z-10"
            >
              {history.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={msg.role === 'sys' ? 'text-cyan-400/90' : 'text-white/90 font-bold'}
                >
                  <div className="flex gap-2">
                    <span className="shrink-0 opacity-40">[{msg.role === 'sys' ? 'CORE' : 'USER'}]</span>
                    <div className="break-words leading-relaxed">
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
                </motion.div>
              ))}
              {isTyping && (
                <div className="text-cyan-400/40 animate-pulse flex gap-2">
                   <span className="opacity-40">[CORE]</span>
                   <span className="flex gap-1">
                     <span className="animate-bounce">.</span>
                     <span className="animate-bounce delay-75">.</span>
                     <span className="animate-bounce delay-150">.</span>
                   </span>
                </div>
              )}
            </div>

            <div className="p-4 bg-black/40 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-cyan-500 font-bold ml-1">❯</span>
                <input 
                  autoFocus
                  type="text"
                  placeholder={isTyping ? "PROCESSING..." : "INPUT_CMD..."}
                  disabled={isTyping}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={executeCommand}
                  className="w-full bg-transparent border-none text-base md:text-[11px] font-mono text-white placeholder:text-white/20 focus:ring-0 p-0"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={toggleCore}
        className="relative w-24 h-24 group cursor-pointer focus:outline-none pointer-events-auto"
      >
        <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl group-hover:bg-cyan-400/40 transition-colors duration-500" />
        <div className="relative w-full h-full opacity-90 group-hover:opacity-100 transition-opacity">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
            <CoreModel />
            <Environment preset="city" />
          </Canvas>
        </div>
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20 scale-[1.3]"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dotted border-violet-500/20 scale-[1.45]"
        />
        
        <div className="absolute top-0 right-0 flex items-center gap-2 glass px-2 py-0.5 rounded-full border-cyan-500/20">
          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#00f0ff]" />
          <span className="text-white text-[8px] font-black uppercase tracking-tighter">Nexus_01</span>
        </div>
      </button>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 240, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 240, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
