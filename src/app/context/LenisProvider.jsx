'use client';
import { ReactLenis } from 'lenis/react';
import { useAppMode } from './AppModeContext';

export default function LenisProvider({ children }) {
  const { mode } = useAppMode();

  // Only enable Lenis in 'atelier' mode for the premium feel.
  // 'archive' mode remains natively static for max performance.
  return (
    <ReactLenis root options={{ 
      lerp: 0.08, 
      duration: 1.2, 
      smoothWheel: true,
      wheelMultiplier: 1.1,
      infinite: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    }}>
      {children}
    </ReactLenis>
  );
}
