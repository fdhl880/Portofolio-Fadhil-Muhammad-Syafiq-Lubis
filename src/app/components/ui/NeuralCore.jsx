'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import { useSound } from '../../context/SoundContext';
import { usePerformance } from '../../context/PerformanceContext';
import { useAppMode } from '../../context/AppModeContext';

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
        
        {/* Wireframe Shell */}
        <Sphere ref={wireRef} args={[1.2, 32, 32]}>
          <meshPhongMaterial 
            color="#ffffff" 
            wireframe 
            transparent 
            opacity={0.1} 
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </Sphere>

        {/* Energy Ring */}
        <mesh ref={ringRef} rotation-x={Math.PI / 2}>
          <torusGeometry args={[1.5, 0.01, 16, 100]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={1} 
            transparent 
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Static section brief map — defined outside component for stable reference
const SECTION_BRIEFS = {
  'intro': 'ATELIER GUIDE: Welcome to the Nexus. Initializing your VIP access to the Fadhil Lubis digital exhibition.',
  'LuxuryHero': 'ATELIER GUIDE: You are currently viewing the Main Pavilion. Notice the precision in engineering and aesthetic design.',
  'GoldArchive': 'ATELIER GUIDE: We have entered the Gold Archive. Here we showcase international accolades and top-tier scientific innovations.',
  'AtelierSpec': 'ATELIER GUIDE: Examining the Technical Blueprint. This section details the subject\'s structural approach to problem-solving.',
  'OriginSection': 'ATELIER GUIDE: The Heritage Log. Discovering the geographic and cultural roots that shaped this engineering mindset.',
  'GiantsSection': 'ATELIER GUIDE: The Hall of Giants. Acknowledging the mentors and visionary figures who laid the foundation for current success.',
  'HeritageSection': "ATELIER GUIDE: Time-lapse enabled. We are now reviewing pivotal milestones and industrial exposure over the years.",
  'AtelierPhilosophy': "ATELIER GUIDE: The Core Philosophy. This is the logic engine driving the subject's aesthetic and strategic decisions.",
  'ManifestoSection': "ATELIER GUIDE: The Manifesto. A projection of future impact on the global sustainable engineering ecosystem.",
  'StudioGallery': "ATELIER GUIDE: The Studio Gallery. A visual chronicle of physical milestones, public features, and key moments.",
  'CinematicAspiration': 'ATELIER GUIDE: Aspiration Matrix. Exploring the multi-dimensional facets: The Engineer, The Polymath, and The Captain.',
  'collections': 'ATELIER GUIDE: The Code Vault. Housing advanced fintech, smart systems, and high-performance algorithms.',
  'TrophyGallery': 'ATELIER GUIDE: Certification Wing. Visual proof of global technical standards and international excellence.',
  'ExpertiseLaboratory': 'ATELIER GUIDE: The Expertise Lab. Displaying architectural capability, full-stack proficiency, and active tech stacks.',
  'DiscoverySection': 'ATELIER GUIDE: Deep-Dive Module. Investigating the intersection of rigorous research and practical deployment.',
  'RoadmapSection': 'ATELIER GUIDE: The Chronology. Charting past developments and projecting the trajectory of future innovations.',
  'VisionSection': 'ATELIER GUIDE: Horizon Forecast. Predicting upcoming high-consequence contributions to the global digital landscape.',
  'ContactSection': 'ATELIER GUIDE: The Communications Node. Secure channels for elite collaboration and enterprise inquiries.'
};

export default function NeuralCore() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { role: 'sys', text: 'E_CORE_v4.2.0_SECURED' },
    { role: 'sys', text: 'USER_IDENTIFIED: VISITOR_AUTHENTICATED' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const hasGreeted = useRef(false);
  const { playPip, playSweep } = useSound();
  const { performanceTier } = usePerformance();
  const { activeSection } = useAppMode();

  // Track the previous section to trigger context alerts
  const lastSection = useRef(activeSection);

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
          text: `SYSTEM_READY. CURRENT_LOC: ${activeSection ? activeSection.toUpperCase() : 'UNKNOWN'}. CORE_INTERFACE_ACTIVE.`, 
          isNew: true 
        }]);
        playPip(1200, 0.1);
      }, 600);
    }
  };


  const [showBrief, setShowBrief] = useState(false);
  const [briefContent, setBriefContent] = useState('');

  // Auto-notification and Data Brief when section changes
  useEffect(() => {
    if (!activeSection || activeSection === lastSection.current) return;
    
    // De-duplication and Stability Check
    const brief = SECTION_BRIEFS[activeSection] || `LOC_UPDATE: ${activeSection.toUpperCase()}. DATA_SYNC_COMPLETE.`;
    
    // Logic encapsulated to prevent cascading render warnings
    const triggerUpdate = () => {
      setHistory(prev => [...prev, { 
        role: 'sys', 
        text: brief, 
        isNew: true 
      }]);
      
      setBriefContent(brief);
      setShowBrief(true);
      playPip(1600, 0.05);

      const timer = setTimeout(() => setShowBrief(false), 5000);
      lastSection.current = activeSection;
      return timer;
    };

    const timer = triggerUpdate();
    return () => clearTimeout(timer);
  }, [activeSection, playPip]);

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
        let res = 'ERROR: CORE_CMD_NOT_FOUND. ATTEMPT_LOGGED.';
        
        if (cmd === '/help') res = 'AVAILABLE_CMDS: /bio, /achievements, /projects, /contact, /status, /analyze, /override, /clear. OR: Engage in natural linguistic exchange.';
        else if (cmd === '/status') res = 'E_CORE_STATUS: SHARP. UPTIME: 100%. NEURAL_LOAD: 8%. ALL_SYSTEMS_OPTIMAL.';
        else if (cmd === '/override') {
          res = 'WARNING: PROTOCOL BREACH INITIATED. OVERRIDING CORE METRICS. EMERGENCY_MODE_ENABLED.';
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('core-breach');
          }
        }
        else if (cmd === '/bio') res = 'SUBJECT: FADHIL MUHAMMAD SYAFIQ LUBIS. INNOVATION ARCHITECT. RESEARCHER. MULTI-MEDALIST. SPECIALIZING IN SUSTAINABLE SYSTEMS AND GLOBAL FINTECH.';
        else {
          try {
            const chatHistory = history
              .filter(h => h.role !== 'sys' || h.text !== 'E_CORE_v4.2.0_SECURED')
              .map(h => ({ 
                role: h.role === 'sys' ? 'model' : 'user', 
                text: h.text 
              }));

            const response = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                message: userText, 
                history: chatHistory,
                context: activeSection || 'general' 
              }),
            });
            const data = await response.json();
            
            if (!response.ok) {
              res = data.error || 'E_SYSTEM_LINK_FAILURE: NEURAL_LINK_STABILITY_ERROR';
            } else {
              res = data.text || 'E_EMPTY_RESPONSE: CORE_STANDBY';
            }
          } catch (error) {
            console.error("CORE AI Error:", error);
            res = 'E_CORE_TIMEOUT: ATTEMPTING_RECONNECT... [ERROR: SYNC_LAYER_DISCONNECT]';
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
            className="w-[calc(100vw-4rem)] sm:w-80 h-[450px] bg-black border border-white/10 overflow-hidden flex flex-col shadow-2xl pointer-events-auto relative"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.02] to-transparent z-50" />
            
            <div className="bg-black border-b border-white/10 px-4 py-3 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-sans text-white/40 uppercase tracking-[0.4em] font-bold">Atelier_Intelligence_DISCOVERED</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/20 hover:text-white transition-colors p-1"
              >
                <div className="w-4 h-4 flex items-center justify-center border border-white/20 rounded-none text-[8px]">×</div>
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
                   className={msg.role === 'sys' ? 'text-white/40' : 'text-white font-medium'}
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

            <div className="p-4 bg-black border-t border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-white/60 font-bold ml-1">→</span>
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
              <div className="mt-2 text-[7px] font-mono text-white/10 uppercase tracking-widest text-center">
                Critical Note: AI Data Processing may produce inaccuracies.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBrief && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-28 right-0 w-64 p-3 bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl z-50 pointer-events-auto"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="text-[8px] font-mono text-white/40 uppercase tracking-[0.3em]">Technical_Brief</span>
                <span className="text-[7px] font-mono text-white/20">UPLINK_01</span>
              </div>
              <div className="text-[9px] font-mono text-white/80 leading-relaxed uppercase tracking-widest">
                <TypingEffect text={briefContent} />
              </div>
              <div className="flex justify-end pt-1">
                <div className="w-8 h-[1px] bg-white/10" />
              </div>
            </div>
            
            {/* Visual Pointer */}
            <div className="absolute -bottom-2 right-10 w-4 h-4 bg-black border-r border-b border-white/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={toggleCore}
        className="relative w-24 h-24 group cursor-pointer focus:outline-none pointer-events-auto audio-reactive-scale"
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
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-white/5 scale-[1.3]"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-white/5 scale-[1.45]"
        />
        
        <div className="absolute top-0 right-0 flex items-center gap-2 glass px-2 py-0.5 border border-white/10">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="text-white/40 text-[8px] font-sans uppercase tracking-[0.2em]">Intel_01</span>
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
