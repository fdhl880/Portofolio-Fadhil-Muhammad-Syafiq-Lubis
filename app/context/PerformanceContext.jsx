'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext();

export function PerformanceProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isCinematic, setIsCinematic] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const mobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
        const lowPerf = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        setIsMobile(mobile || lowPerf);
        
        // Auto-optimize default mode
        const saved = localStorage.getItem('portfolio-cinematic-mode');
        if (saved !== null) {
           setIsCinematic(saved === 'true');
        } else {
           // Default to non-cinematic for mobile/low-end
           setIsCinematic(!(mobile || lowPerf));
        }
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const toggleMode = () => {
    setIsCinematic((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio-cinematic-mode', next.toString());
      return next;
    });
  };

  return (
    <PerformanceContext.Provider value={{ isCinematic, isMobile, toggleMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}
