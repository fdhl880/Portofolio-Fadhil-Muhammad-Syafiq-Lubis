'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext();

export function PerformanceProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isCinematic, setIsCinematic] = useState(false); // Default to false initially for safer hydration

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      const isMob = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(isMob);
      
      const saved = localStorage.getItem('portfolio-cinematic-mode');
      if (saved !== null) {
        setIsCinematic(saved === 'true');
      } else {
        // If it's a desktop, default to cinematic on. If mobile, default content is 2D.
        setIsCinematic(!isMob);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
