'use client';
import { useAppMode } from '../context/AppModeContext';
import dynamic from 'next/dynamic';

const AmbientSound = dynamic(() => import('./ui/AmbientSound'), { ssr: false });
const CinematicIntro = dynamic(() => import('./ui/CinematicIntro'), { ssr: false });

export default function MainContent({ children }) {
  const { mode, selectMode } = useAppMode();

  // If no mode is selected, show the premium cinematic intro
  if (mode === null) {
    return <CinematicIntro onComplete={() => selectMode('atelier')} />;
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
