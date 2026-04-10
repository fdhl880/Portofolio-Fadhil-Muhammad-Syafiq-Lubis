'use client';
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const ambientStateRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  const startMuseumHum = () => {
    if (!audioContextRef.current) return;
    
    // Low Frequency Tone
    const osc1 = audioContextRef.current.createOscillator();
    const osc2 = audioContextRef.current.createOscillator();
    const filter = audioContextRef.current.createBiquadFilter();
    const gain = audioContextRef.current.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(45, audioContextRef.current.currentTime);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(45.5, audioContextRef.current.currentTime); // Slight detune for phasing
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(80, audioContextRef.current.currentTime);
    filter.Q.setValueAtTime(5, audioContextRef.current.currentTime);
    
    gain.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, audioContextRef.current.currentTime + 5);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current);
    
    osc1.start();
    osc2.start();

    // Atmosphere "Air" Noise
    const bufferSize = 2 * audioContextRef.current.sampleRate;
    const noiseBuffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const noise = audioContextRef.current.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const noiseFilter = audioContextRef.current.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(400, audioContextRef.current.currentTime);
    
    const noiseGain = audioContextRef.current.createGain();
    noiseGain.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.02, audioContextRef.current.currentTime + 8);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGainRef.current);
    noise.start();
    
    ambientStateRef.current = { osc1, osc2, noise, gain, noiseGain };
  };

  const initAudio = useCallback(() => {
    if (audioContextRef.current) return;
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
    
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.gain.value = 0.5;
    
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 64;
    dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    masterGainRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);
    
    setIsAudioEnabled(true);
    startMuseumHum();
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
    g.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + duration);
    osc.connect(g);
    g.connect(masterGainRef.current);
    osc.start();
    osc.stop(audioContextRef.current.currentTime + duration);
  };

  return (
    <SoundContext.Provider value={{ 
      isAudioEnabled, 
      toggleAudio, 
      playPip, 
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
