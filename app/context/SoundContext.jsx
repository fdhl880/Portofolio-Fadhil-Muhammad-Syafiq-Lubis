'use client';
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const engineStateRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  const startAmbientHum = () => {
    if (!audioContextRef.current) return;
    
    const hum = audioContextRef.current.createOscillator();
    const humGain = audioContextRef.current.createGain();
    const filter = audioContextRef.current.createBiquadFilter();
    const pulseGain = audioContextRef.current.createGain();
    const pulseOsc = audioContextRef.current.createOscillator();
    
    hum.type = 'sawtooth';
    hum.frequency.setValueAtTime(40, audioContextRef.current.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, audioContextRef.current.currentTime);
    
    // Add pulsing life to the hum
    pulseOsc.frequency.setValueAtTime(0.5, audioContextRef.current.currentTime);
    pulseGain.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    
    humGain.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    humGain.gain.linearRampToValueAtTime(0.2, audioContextRef.current.currentTime + 3);
    
    pulseOsc.connect(pulseGain);
    pulseGain.connect(humGain.gain);
    
    hum.connect(filter);
    filter.connect(humGain);
    humGain.connect(masterGainRef.current);
    
    hum.start();
    pulseOsc.start();
    engineStateRef.current = { hum, filter, humGain };
  };

  const setEngineDrive = useCallback((velocity) => {
    if (!isAudioEnabled || !engineStateRef.current || !audioContextRef.current) return;
    const { hum, filter } = engineStateRef.current;
    const now = audioContextRef.current.currentTime;
    
    // Base frequency is 40Hz. High speed pushes it to 100Hz.
    const targetFreq = 40 + Math.min(Math.abs(velocity) * 0.05, 60);
    // Filter opens up at high speeds (base 150Hz -> 800Hz)
    const targetFilter = 150 + Math.min(Math.abs(velocity) * 0.5, 650);
    
    // Smoothly ramp to the target
    hum.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.5);
    filter.frequency.exponentialRampToValueAtTime(targetFilter, now + 0.5);
  }, [isAudioEnabled]);

  const initAudio = useCallback(() => {
    if (audioContextRef.current) return;
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
    
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.gain.value = 0.45; // Increased from 0.15
    
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 64; // 32 frequency bins
    dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    masterGainRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);
    
    setIsAudioEnabled(true);
    startAmbientHum();
  }, []);

  const getAudioData = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return null;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    return dataArrayRef.current;
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

  const playBootSequence = () => {
    if (!isAudioEnabled || !audioContextRef.current) return;
    
    const now = audioContextRef.current.currentTime;
    
    // Quick rising pulses
    [880, 1320, 1760, 2640].forEach((freq, i) => {
      const osc = audioContextRef.current.createOscillator();
      const g = audioContextRef.current.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      g.gain.setValueAtTime(0, now + i * 0.1);
      g.gain.linearRampToValueAtTime(0.05, now + i * 0.1 + 0.05);
      g.gain.linearRampToValueAtTime(0, now + i * 0.1 + 0.1);
      osc.connect(g);
      g.connect(masterGainRef.current);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.1);
    });

    // Final deep resonance
    const osc2 = audioContextRef.current.createOscillator();
    const g2 = audioContextRef.current.createGain();
    const f2 = audioContextRef.current.createBiquadFilter();
    
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(40, now + 0.4);
    osc2.frequency.exponentialRampToValueAtTime(80, now + 1.5);
    
    f2.type = 'lowpass';
    f2.frequency.setValueAtTime(100, now + 0.4);
    f2.frequency.exponentialRampToValueAtTime(1000, now + 1.5);
    
    g2.gain.setValueAtTime(0, now + 0.4);
    g2.gain.linearRampToValueAtTime(0.15, now + 0.5);
    g2.gain.linearRampToValueAtTime(0, now + 2.0);
    
    osc2.connect(f2);
    f2.connect(g2);
    g2.connect(masterGainRef.current);
    
    osc2.start(now + 0.4);
    osc2.stop(now + 2.0);
  };

  return (
    <SoundContext.Provider value={{ 
      isAudioEnabled, 
      toggleAudio, 
      playPip, 
      playSweep, 
      playBootSequence,
      setEngineDrive,
      getAudioData
    }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound must be used within a SoundProvider');
  return context;
}
