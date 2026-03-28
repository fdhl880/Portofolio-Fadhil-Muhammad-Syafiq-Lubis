'use client';
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const humOscRef = useRef(null);

  const initAudio = useCallback(() => {
    if (audioContextRef.current) return;
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
    
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.gain.value = 0.15; // master volume
    masterGainRef.current.connect(audioContextRef.current.destination);
    
    setIsAudioEnabled(true);
    startAmbientHum();
  }, []);

  const toggleAudio = () => {
    if (!audioContextRef.current) {
      initAudio();
    } else {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
        setIsAudioEnabled(true);
      } else {
        audioContextRef.current.suspend();
        setIsAudioEnabled(false);
      }
    }
  };

  const startAmbientHum = () => {
    if (!audioContextRef.current) return;
    
    // Low cinematic hum
    const hum = audioContextRef.current.createOscillator();
    const humGain = audioContextRef.current.createGain();
    const filter = audioContextRef.current.createBiquadFilter();
    
    hum.type = 'sawtooth';
    hum.frequency.setValueAtTime(40, audioContextRef.current.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
    
    humGain.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    humGain.gain.linearRampToValueAtTime(0.05, audioContextRef.current.currentTime + 2);
    
    hum.connect(filter);
    filter.connect(humGain);
    humGain.connect(masterGainRef.current);
    
    hum.start();
    humOscRef.current = { osc: hum, gain: humGain };
  };

  const playPip = (freq = 880, duration = 0.1, volume = 0.05) => {
    if (!isAudioEnabled || !audioContextRef.current) return;
    
    const osc = audioContextRef.current.createOscillator();
    const g = audioContextRef.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioContextRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq / 2, audioContextRef.current.currentTime + duration);
    
    g.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + duration);
    
    osc.connect(g);
    g.connect(masterGainRef.current);
    
    osc.start();
    osc.stop(audioContextRef.current.currentTime + duration);
  };

  const playSweep = (startFreq = 200, endFreq = 2000, duration = 0.5) => {
    if (!isAudioEnabled || !audioContextRef.current) return;
    
    const osc = audioContextRef.current.createOscillator();
    const g = audioContextRef.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, audioContextRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, audioContextRef.current.currentTime + duration);
    
    g.gain.setValueAtTime(0.03, audioContextRef.current.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + duration);
    
    osc.connect(g);
    g.connect(masterGainRef.current);
    
    osc.start();
    osc.stop(audioContextRef.current.currentTime + duration);
  };

  return (
    <SoundContext.Provider value={{ isAudioEnabled, toggleAudio, playPip, playSweep }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound must be used within a SoundProvider');
  return context;
}
