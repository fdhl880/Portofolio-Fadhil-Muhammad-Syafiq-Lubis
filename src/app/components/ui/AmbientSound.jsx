'use client';
import { useEffect } from 'react';
import { useSound } from '../../context/SoundContext';

/**
 * AmbientSound Component
 * 
 * Orchestrates secondary atmospheric sounds and ensures the 
 * base "Museum Hum" remains consistent with the luxury theme.
 */
export default function AmbientSound() {
  const { isAudioEnabled, playPip } = useSound();

  useEffect(() => {
    if (!isAudioEnabled) return;

    // Periodically play very subtle "high-frequency pips" or distant echoes
    // to simulate the acoustics of a high-end metal-and-glass atelier.
    const interval = setInterval(() => {
      const chance = Math.random();
      if (chance > 0.7) {
        // Very subtle, high-pitched "ping" representing precision sensors
        playPip(1200 + Math.random() * 400, 0.05, 0.01);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isAudioEnabled, playPip]);

  return null; // Purely functional component
}
