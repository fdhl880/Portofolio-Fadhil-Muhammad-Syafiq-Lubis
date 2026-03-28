'use client';
import { useEffect, useRef } from 'react';
import { useSound } from '../../context/SoundContext';

export default function AudioVisualizer() {
  const canvasRef = useRef(null);
  const { getAudioData, isAudioEnabled } = useSound();

  useEffect(() => {
    if (!isAudioEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 100; // bottom 100px
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const data = getAudioData();
      
      if (data) {
        const barWidth = canvas.width / data.length;
        
        for (let i = 0; i < data.length; i++) {
          const rawHeight = data[i]; // 0 to 255
          const height = (rawHeight / 255) * canvas.height;
          
          const x = i * barWidth;
          const y = canvas.height - height;
          
          const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
          gradient.addColorStop(0, 'rgba(0, 240, 255, 0.1)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');
          
          ctx.fillStyle = gradient;
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#00f0ff';
          ctx.fillRect(x + 2, y, barWidth - 4, height);
          ctx.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [getAudioData, isAudioEnabled]);

  if (!isAudioEnabled) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 h-[100px] pointer-events-none z-[50] opacity-50 mix-blend-screen">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
