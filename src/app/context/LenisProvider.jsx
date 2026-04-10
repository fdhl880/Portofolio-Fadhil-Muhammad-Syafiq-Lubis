'use client';
import { ReactLenis } from 'lenis/react';
import { useAppMode } from './AppModeContext';

export default function LenisProvider({ children }) {
  const { mode } = useAppMode();

  // Only enable Lenis in 'atelier' mode for the premium feel.
  // 'archive' mode remains natively static for max performance.
  if (mode !== 'atelier') return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
