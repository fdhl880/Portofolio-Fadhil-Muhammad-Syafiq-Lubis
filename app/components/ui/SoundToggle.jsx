'use client';
import { motion } from 'framer-motion';
import { useSound } from '../../context/SoundContext';

export default function SoundToggle() {
  const { isAudioEnabled, toggleAudio } = useSound();

  return (
    <motion.button
      onClick={() => {
        toggleAudio();
        window.dispatchEvent(new CustomEvent('NEXUS_NOTIFY', { 
          detail: `AUDIO_COMMS: ${!isAudioEnabled ? 'ENABLED' : 'DISABLED'}` 
        }));
      }}
      className={`fixed top-24 md:top-24 right-4 md:right-56 z-[150] cyber-button px-6 py-3
        ${isAudioEnabled ? 'text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                       : 'text-white/30 border-white/10 opacity-50'}
      `}
      whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.05)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex gap-1 items-end h-3">
          {[1,2,3].map(i => (
            <motion.div 
               key={i}
               animate={{ height: isAudioEnabled ? ['30%', '100%', '30%'] : '30%' }}
               transition={{ repeat: Infinity, duration: 0.4 + i*0.1 }}
               className="w-[3px] bg-current"
            />
          ))}
        </div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
           {isAudioEnabled ? 'Audio_Stream' : 'Audio_Muted'}
        </span>
      </div>
    </motion.button>
  );
}
