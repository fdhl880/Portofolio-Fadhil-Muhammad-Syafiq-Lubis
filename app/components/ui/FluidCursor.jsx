'use client';
import { useEffect, useRef } from 'react';

export default function FluidCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const pointers = [];
    const maxLife = 40;

    const rgbConfig = [
      '0, 240, 255', // Cyan
      '139, 92, 246' // Violet
    ];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      pointers.push({
        x: e.clientX,
        y: e.clientY,
        life: maxLife,
        color: rgbConfig[Math.floor(Math.random() * rgbConfig.length)]
      });
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', (e) => onMouseMove(e.touches[0]));

    const draw = () => {
      // Fade out slowly by drawing a semi-transparent black layer using multiply
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw the fluid trail
      ctx.globalCompositeOperation = 'screen';
      
      for (let i = 0; i < pointers.length; i++) {
        const p = pointers[i];
        
        ctx.beginPath();
        const rad = (p.life / maxLife) * 15;
        
        // Use radial gradient for glowing ink effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
        gradient.addColorStop(0, `rgba(${p.color}, ${p.life / maxLife})`);
        gradient.addColorStop(1, `rgba(${p.color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();

        p.life -= 1;
        if (p.life <= 0) {
          pointers.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(draw);
    };
    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
