'use client';
import { useAppMode } from '../context/AppModeContext';
import ModeSelection from './ui/ModeSelection';
import dynamic from 'next/dynamic';

const AmbientSound = dynamic(() => import('./ui/AmbientSound'), { ssr: false });

export default function MainContent({ children }) {
  const { mode } = useAppMode();

  // If no mode is selected, show the gateway selection screen
  if (mode === null) {
    return <ModeSelection />;
  }

  return (
    <>
      {/* 3D Mode gets the Museum Background Hum */}
      {mode === 'atelier' && <AmbientSound lowMode={true} />}
      
      <main className={mode === 'archive' ? 'static-mode' : 'cinematic-mode'}>
        {children}
      </main>

      <style jsx global>{`
        .static-mode * {
          animation: none !important;
          transition: none !important;
          transform: none !important;
        }
        
        .cinematic-mode {
          /* Smooth entry for the whole app */
          animation: fadeIn 2s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
