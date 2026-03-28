'use client';
import { motion } from 'framer-motion';
import { useSound } from '../../context/SoundContext';

export default function SoundToggle() {
  const { isAudioEnabled, toggleAudio } = useSound();

  return (
    <motion.button
      onClick={toggleAudio}
      className={`fixed top-24 right-4 md:right-32 z-[100] rounded-full px-4 py-2 text-[10px] font-bold font-display uppercase tracking-widest transition-all duration-300 cursor-pointer pointer-events-auto border backdrop-blur-md shadow-lg
        ${isAudioEnabled ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500/20 shadow-cyan-500/20' 
                       : 'bg-white/5 text-white/50 border-white/20 hover:bg-white/10 shadow-none'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5 items-end h-3">
          {[1,2,3].map(i => (
            <motion.div 
               key={i}
               animate={{ height: isAudioEnabled ? ['30%', '100%', '30%'] : '30%' }}
               transition={{ repeat: Infinity, duration: 0.5 + i*0.2 }}
               className="w-[2px] bg-current"
            />
          ))}
        </div>
        {isAudioEnabled ? 'AUDIO_ON' : 'AUDIO_OFF'}
      </div>
    </motion.button>
  );
}
