'use client';
import { useEffect } from 'react';
import { useSound } from '../../context/SoundContext';

export default function AudioReactor() {
  const { getAudioData, isAudioEnabled } = useSound();

  useEffect(() => {
    if (!isAudioEnabled) {
      document.documentElement.style.setProperty('--audio-intensity', '0');
      document.documentElement.style.setProperty('--audio-bass', '0');
      document.documentElement.style.setProperty('--audio-mid', '0');
      document.documentElement.style.setProperty('--audio-high', '0');
      return;
    }

    let animationFrameId;

    const renderLoop = () => {
      const data = getAudioData();
      if (data) {
        // Average overall intensity
        const total = data.reduce((acc, val) => acc + val, 0);
        const avg = total / data.length;
        const normalizedAvg = avg / 255;
        
        // Calculate frequency bands
        // data length is 32 (since fftSize is 64)
        const bassData = data.slice(0, 4); // lowest frequencies
        const midData = data.slice(4, 16);
        const highData = data.slice(16, 32);

        const bassAvg = bassData.length ? bassData.reduce((acc, val) => acc + val, 0) / bassData.length : 0;
        const midAvg = midData.length ? midData.reduce((acc, val) => acc + val, 0) / midData.length : 0;
        const highAvg = highData.length ? highData.reduce((acc, val) => acc + val, 0) / highData.length : 0;

        const normBass = bassAvg / 255;
        const normMid = midAvg / 255;
        const normHigh = highAvg / 255;

        // Apply smoothed CSS variables to the root element
        document.documentElement.style.setProperty('--audio-intensity', normalizedAvg.toFixed(3));
        document.documentElement.style.setProperty('--audio-bass', normBass.toFixed(3));
        document.documentElement.style.setProperty('--audio-mid', normMid.toFixed(3));
        document.documentElement.style.setProperty('--audio-high', normHigh.toFixed(3));
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAudioEnabled, getAudioData]);

  return null; // This component is invisible, handles logic only
}
